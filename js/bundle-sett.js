/* ===================== EKSAMENSSETT — hele sett, to moduser =====================
   Faget leverer ferdige eksamenssett i EDU_DATA.sets. Modulen kjører dem på to
   måter, og forskjellen er pedagogisk, ikke kosmetisk:

     Øvingsmodus    én oppgave om gangen. Fasiten er låst til du selv sier at du
                    har skrevet svaret. Å lese en løsning man ikke har forsøkt på
                    gir gjenkjennelse, ikke kunnskap.
     Eksamensmodus  hele settet samtidig, med nedtelling. Ingen fasit er nåbar
                    noe sted før du leverer. Det er tidspresset som er poenget.

   Flervalg. En oppgave eller deloppgave med `options` og `answer` rettes
   automatisk: riktig gir poengene, galt gir poengene × wrongFactor, ubesvart 0.
   Faktoren er 0 der feil svar ikke straffes, og −1/3 i formatet med minuspoeng
   (3 for rett, −1 for feil, fire alternativer — forventet verdi av å gjette
   blindt er null). `answer` er en indeks, eller en liste når fasiten godtar
   flere. Åpne oppgaver vurderes fortsatt selv, så et sett kan blande begge.

   Fremdrift lagres i state.exams under nøklene "<settId>-run" (økta) og
   "<settId>-e<n>" (selvvurdering per oppgave), og synkes dermed som alt annet. */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon, frag } = S.u;
  const sh = () => S.views.shared;
  const SETS = () => window.EDU_DATA.sets || [];

  /* ---------- lokal tilstand (ikke persistert: hvor du er, ikke hva du har gjort) ---------- */
  let openSet = null;      // settId, eller null for listevisningen
  let mode = "practice";   // "practice" | "exam"
  let cursor = 0;          // hvilken oppgave som vises i øvingsmodus
  let ticker = null;       // intervallet som teller ned

  function stopTicker() { if (ticker) { clearInterval(ticker); ticker = null; } }
  const setById = (id) => SETS().find((s) => s.id === id) || null;

  /* ---------- persistert tilstand ---------- */
  const runKey = (setId) => setId + "-run";
  const exKey = (setId, n) => setId + "-e" + n;
  const readKey = (k) => S.store.get().exams[k] || {};
  const run = (setId) => readKey(runKey(setId));
  const exState = (setId, n) => readKey(exKey(setId, n));

  /* En eksamensøkt starter blank. Valg, avsløringer og poeng fra øvingsmodus
     ville ellers blitt med inn i resultatet — og et flervalg du alt har sett
     fasiten på, er ikke en eksamen. */
  function startRun(setId, m, wrongFactor) {
    const st = S.store.get(); const set = setById(setId);
    ((set && set.exercises) || []).forEach((ex) => delete st.exams[exKey(setId, ex.n)]);
    S.store.setExam(runKey(setId), { mode: m, startedAt: S.u.nowTs(), submittedAt: null, wrongFactor: wrongFactor });
  }
  function submitRun(setId) { S.store.setExam(runKey(setId), { submittedAt: S.u.nowTs() }); }
  function resetRun(setId) {
    const st = S.store.get(); const set = setById(setId);
    delete st.exams[runKey(setId)];
    ((set && set.exercises) || []).forEach((ex) => delete st.exams[exKey(setId, ex.n)]);
    S.store.emit();
  }
  const isSubmitted = (setId) => !!run(setId).submittedAt;
  /* Poeng vises med norsk komma og ekte minustegn — «−0,67», ikke «-0.67». */
  const pts = (n) => (typeof n === "number" ? n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }).replace("-", "−") : String(n));

  /* Fasit er synlig når settet er levert, eller når du selv har åpnet den i
     øvingsmodus. Har du levert, forblir den åpen også om du bytter til øving —
     å låse den igjen etterpå ville bare vært irriterende. */
  function solutionOpen(setId, n) {
    if (isSubmitted(setId)) return true;
    return mode === "exam" ? false : !!exState(setId, n).revealed;
  }
  function reveal(setId, n) { S.store.setExam(exKey(setId, n), { revealed: true }); }
  function setScore(setId, n, score) { S.store.setExam(exKey(setId, n), { score: score, scoredAt: S.u.nowTs() }); }

  /* ---------- flervalg ---------- */
  /* Valgene lagres per oppgave som { "<deletikett>": indeks }; en oppgave uten
     deloppgaver bruker nøkkelen "". Å velge det valgte på nytt fjerner svaret —
     med minuspoeng er «blankt» en ekte strategi, ikke en glipp. */
  function velg(setId, n, nøkkel, i) {
    const st = exState(setId, n); const valg = Object.assign({}, st.valg || {});
    if (valg[nøkkel] === i) delete valg[nøkkel]; else valg[nøkkel] = i;
    S.store.setExam(exKey(setId, n), { valg: valg });
  }
  /* Alle flervalgsleddene i en oppgave, i rekkefølge. */
  function mcLedd(ex) {
    const ut = [];
    if (ex.options) ut.push({ nøkkel: "", options: ex.options, answer: ex.answer, points: ex.points || 0 });
    (ex.parts || []).forEach((p) => { if (p.options) ut.push({ nøkkel: p.label, options: p.options, answer: p.answer, points: p.points || 0 }); });
    return ut;
  }
  const erMC = (ex) => mcLedd(ex).length > 0;
  const settHarMC = (set) => (set.exercises || []).some(erMC);
  const riktig = (ledd, i) => Array.isArray(ledd.answer) ? ledd.answer.includes(i) : ledd.answer === i;

  /* Faktoren for feil svar: øktas valg, ellers settets, ellers 0. */
  function wrongFactor(set) {
    const r = run(set.id);
    if (typeof r.wrongFactor === "number") return r.wrongFactor;
    return (set.mc && typeof set.mc.wrongFactor === "number") ? set.mc.wrongFactor : 0;
  }
  /* Retter én oppgaves flervalgsledd. Returnerer poeng og tellinger. */
  function mcRett(set, ex, wf) {
    const st = exState(set.id, ex.n); const valg = st.valg || {};
    const r = { got: 0, of: 0, rett: 0, galt: 0, blank: 0 };
    mcLedd(ex).forEach((ledd) => {
      r.of += ledd.points;
      const i = valg[ledd.nøkkel];
      if (i == null) r.blank++;
      else if (riktig(ledd, i)) { r.rett++; r.got += ledd.points; }
      else { r.galt++; r.got += ledd.points * wf; }
    });
    r.got = Math.round(r.got * 100) / 100;
    return r;
  }
  /* Skriver den automatiske poengsummen inn som oppgavens score, så resten av
     modulen (sum, ring, kort) ikke trenger å vite om flervalg. */
  function mcLagreScore(set, ex) {
    if (!erMC(ex)) return;
    setScore(set.id, ex.n, mcRett(set, ex, wrongFactor(set)).got);
  }
  function mcRettAlle(set) { (set.exercises || []).forEach((ex) => mcLagreScore(set, ex)); }

  function scoreSum(set) {
    let got = 0, of = 0, scored = 0;
    (set.exercises || []).forEach((ex) => {
      of += ex.points || 0;
      const s = exState(set.id, ex.n);
      if (typeof s.score === "number") { got += s.score; scored++; }
    });
    return { got: Math.round(got * 100) / 100, of, scored, total: (set.exercises || []).length };
  }

  /* ---------- tid ---------- */
  function remainingMs(set) {
    const r = run(set.id);
    if (!r.startedAt) return (set.minutes || 180) * 60000;
    const end = r.startedAt + (set.minutes || 180) * 60000;
    return end - (r.submittedAt || S.u.nowTs());
  }
  function fmtClock(ms) {
    const over = ms < 0; const t = Math.floor(Math.abs(ms) / 1000);
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    const pad = (x) => String(x).padStart(2, "0");
    return (over ? "+" : "") + (h ? h + ":" : "") + pad(m) + ":" + pad(s);
  }

  /* ================= listevisning ================= */
  function renderList() {
    const wrap = el(".fade-in");
    const sets = SETS();
    wrap.appendChild(sh().pageHead("Eksamenssett", `${sets.length} tidligere eksamener`,
      "Hele sett, slik de ble gitt. Kjør dem som øving med fasit underveis, eller som ekte eksamen på tid der fasiten først åpner seg når du leverer."));

    if (!sets.length) { wrap.appendChild(sh().empty("📄", "Ingen eksamenssett ennå", "Faget har ikke lagt inn sett i EDU_DATA.sets.")); return wrap; }

    const list = el(".stack", { style: { gap: "14px" } });
    sets.forEach((set) => list.appendChild(setCard(set)));
    wrap.appendChild(list);
    return wrap;
  }

  function setCard(set) {
    const sum = scoreSum(set);
    const r = run(set.id);
    const done = !!r.submittedAt;
    const started = !!r.startedAt && !done;

    const card = el(".card.pad-lg");
    card.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "19px" } }, set.label),
      el(".spacer"),
      done ? el(".chip.green", el(".dot"), "Levert") : started ? el(".chip.amber", el(".dot"), "Påbegynt") : null));

    card.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "8px 0 12px" } },
      el(".chip", icon("clock"), `${set.minutes} min`),
      el(".chip", `${set.points} poeng`),
      set.format ? el(".chip.slate", set.format) : null));

    if (set.note) card.appendChild(el("p.tiny.muted", { style: { margin: "0 0 12px" } }, set.note));

    const topics = [...new Set((set.exercises || []).map((e) => e.topic).filter(Boolean))];
    if (topics.length) card.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "14px" } },
      ...topics.map((t) => el(".chip.slate", { style: { fontSize: "11px" } }, t))));

    if (sum.scored) card.appendChild(el(".explain", { style: { marginBottom: "14px" } },
      el("b", `${pts(sum.got)} av ${sum.of} poeng`), ` · ${settHarMC(set) ? "rettet" : "selvvurdert"} på ${sum.scored} av ${sum.total} oppgaver`));

    card.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn.primary", { onclick: () => { openSet = set.id; mode = "practice"; cursor = 0; S.app.refresh(); } }, "Øvingsmodus"),
      el("button.btn", { onclick: () => { openSet = set.id; mode = "exam"; S.app.refresh(); } }, "⏱ Eksamensmodus"),
      (done || started || anyTouched(set)) ? el("button.btn.ghost.sm", { onclick: () => {
        if (confirm(`Nullstille «${set.label}» — leveringen, svarene og alle vurderinger? Kan ikke angres.`)) { resetRun(set.id); S.app.refresh(); }
      } }, "Nullstill settet") : null));
    return card;
  }

  /* ================= felles deler ================= */
  function topBar(set) {
    const bar = el(".row.wrap", { style: { gap: "10px", marginBottom: "16px", alignItems: "center" } });
    bar.appendChild(el("button.btn.ghost.sm", { onclick: () => { openSet = null; stopTicker(); S.app.refresh(); } }, "← Alle sett"));
    const seg = el(".seg");
    [["practice", "Øving"], ["exam", "⏱ Eksamen"]].forEach(([m, label]) => {
      seg.appendChild(el("button" + (mode === m ? ".on" : ""), { onclick: () => {
        if (mode === m) return;
        if (m === "exam" && !isSubmitted(set.id) && anyRevealed(set)) {
          if (!confirm("Du har allerede åpnet fasit på minst én oppgave i dette settet. Eksamensmodus gir da ikke et ekte bilde. Bytte likevel?")) return;
        }
        mode = m; stopTicker(); S.app.refresh();
      } }, label));
    });
    bar.appendChild(seg);
    bar.appendChild(el(".spacer"));
    bar.appendChild(el("h3", { style: { fontSize: "16px" } }, set.label));
    return bar;
  }
  function anyRevealed(set) { return (set.exercises || []).some((ex) => exState(set.id, ex.n).revealed); }
  function anyTouched(set) { return (set.exercises || []).some((ex) => { const s = exState(set.id, ex.n); return s.revealed || s.valg || typeof s.score === "number"; }); }

  /* Oppgaveteksten er forfattet HTML — den skal rendres, ikke escapes. */
  function body(html) { const d = el(".prose"); if (html) d.appendChild(frag(html)); return d; }

  /* Alternativene tegnes som quizens knapper. Før fasiten er åpen kan du velge
     og velge om; etterpå låses de og fargelegges. Alternativtekst er forfattet
     HTML (formler med sub/sup), så den rendres. */
  function mcValg(set, ex, ledd, åpen, interaktiv) {
    const st = exState(set.id, ex.n); const valgt = (st.valg || {})[ledd.nøkkel];
    const boks = el("div", { style: { marginTop: "10px" } });
    ledd.options.forEach((o, i) => {
      let cls = "button.opt";
      if (åpen) cls += riktig(ledd, i) ? ".correct" : (i === valgt ? ".wrong" : ".dim");
      else if (i === valgt) cls += ".sel";
      const btn = el(cls, { disabled: åpen || !interaktiv,
        onclick: () => { if (åpen || !interaktiv) return; velg(set.id, ex.n, ledd.nøkkel, i); S.app.refresh(); } },
        el(".key", String.fromCharCode(65 + i)), el("span", frag(String(o))));
      boks.appendChild(btn);
    });
    if (åpen) {
      const traff = valgt != null && riktig(ledd, valgt);
      const wf = wrongFactor(set);
      const p = valgt == null ? 0 : traff ? ledd.points : Math.round(ledd.points * wf * 100) / 100;
      boks.appendChild(el(".tiny", { style: { marginTop: "4px", fontWeight: 620, color: valgt == null ? "var(--ink-3)" : traff ? "var(--green)" : "var(--rose)" } },
        valgt == null ? "Ubesvart · 0 poeng" : traff ? `Riktig · ${pts(p)} poeng` : `Feil · ${pts(p)} poeng`));
    } else if (!interaktiv) {
      boks.appendChild(el(".tiny.muted", { style: { marginTop: "4px" } }, "Alternativene låses opp når eksamen er startet."));
    }
    return boks;
  }
  /* Det ene flervalgsleddet som hører til en oppgave/deloppgave, eller null. */
  const leddFor = (ex, nøkkel) => mcLedd(ex).find((l) => l.nøkkel === nøkkel) || null;

  function pointsBadge(p) {
    return el(".chip.indigo", { style: { fontWeight: 620 } }, `${p} poeng`);
  }

  function exerciseHead(ex) {
    return el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "18px" } }, `Oppgave ${ex.n}${ex.title ? " · " + ex.title : ""}`),
      el(".spacer"), pointsBadge(ex.points || 0));
  }

  /* Fasitpanel — grønn kant, tydelig adskilt fra oppgaveteksten. */
  function solutionPanel(title, html, criteria) {
    const box = el(".sol-panel");
    box.appendChild(el(".sol-h", icon("check"), el("span", title)));
    if (html) box.appendChild(body(html));
    if (criteria && criteria.length) {
      box.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Dette må være med"));
      const ul = el("ul.sol-crit");
      criteria.forEach((c) => ul.appendChild(el("li", c)));
      box.appendChild(ul);
    }
    return box;
  }
  function scoreRow(set, ex) {
    const cur = exState(set.id, ex.n).score;
    const rowEl = el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "14px" } },
      el(".tiny.muted", "Din poengsum:"));
    const max = ex.points || 0;
    const steps = [0, Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), max];
    [...new Set(steps)].sort((a, b) => a - b).forEach((v) => {
      rowEl.appendChild(el("button.btn.sm" + (cur === v ? ".primary" : ""), {
        onclick: () => { setScore(set.id, ex.n, v); S.app.refresh(); },
      }, String(v)));
    });
    rowEl.appendChild(el(".tiny.muted", `av ${max}`));
    return rowEl;
  }

  /* ================= øvingsmodus ================= */
  function renderPractice(set) {
    stopTicker();
    const wrap = el(".fade-in");
    wrap.appendChild(topBar(set));

    const exs = set.exercises || [];
    if (!exs.length) { wrap.appendChild(sh().empty("📄", "Tomt sett", "Ingen oppgaver lagt inn.")); return wrap; }
    if (cursor >= exs.length) cursor = 0;

    const nav = el(".row.wrap", { style: { gap: "6px", marginBottom: "16px" } });
    exs.forEach((ex, i) => {
      const revealed = !!exState(set.id, ex.n).revealed;
      const cls = i === cursor ? "button.chip.sett-nav.on" : revealed ? "button.chip.green.sett-nav" : "button.chip.sett-nav";
      nav.appendChild(el(cls, { onclick: () => { cursor = i; S.app.refresh(); } },
        `${ex.n}`, revealed && i !== cursor ? el("span", { style: { marginLeft: "4px" } }, "✓") : null));
    });
    wrap.appendChild(nav);

    const ex = exs[cursor];
    const card = el(".card.pad-lg");
    card.appendChild(exerciseHead(ex));
    if (ex.topic) card.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "12px" } }, el(".chip.slate", ex.topic)));
    card.appendChild(body(ex.body));

    const open = solutionOpen(set.id, ex.n);
    const mc = erMC(ex);
    const hoved = leddFor(ex, "");
    if (hoved) card.appendChild(mcValg(set, ex, hoved, open, true));

    (ex.parts || []).forEach((part) => {
      const pc = el(".sett-part");
      pc.appendChild(el(".row", el(".part-label", part.label + ")"), el(".spacer"),
        part.points ? el(".tiny.muted", `${part.points} p`) : null));
      pc.appendChild(body(part.body));
      const ledd = leddFor(ex, part.label);
      if (ledd) pc.appendChild(mcValg(set, ex, ledd, open, true));
      if (open) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria));
      card.appendChild(pc);
    });

    if (!open) {
      const ubesvart = mc && mcLedd(ex).some((l) => (exState(set.id, ex.n).valg || {})[l.nøkkel] == null);
      card.appendChild(el(".card", { style: { marginTop: "18px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          el("b", mc ? "Velg svaret ditt først. " : "Skriv svaret først. "),
          mc ? (set.practiceNote || "Regn på papir og velg alternativet før du åpner fasiten. Et alternativ du velger etter å ha sett løsningen, har du ikke lært noe av.")
             : (set.practiceNote || "Eksamen er penn og papir, så gjør det på papir her også — hele utregningen, ikke bare svaret. Å lese en løsning du ikke har forsøkt på gir gjenkjennelse, ikke kunnskap.")),
        el("button.btn.primary", { onclick: () => {
          if (ubesvart && !confirm("Du har ikke svart på alle leddene. Ubesvart gir 0 poeng. Vise løsningen likevel?")) return;
          reveal(set.id, ex.n); mcLagreScore(set, ex); S.app.refresh();
        } }, mc ? "Rett svaret mitt" : "Jeg har skrevet svaret — vis løsningen")));
    } else {
      if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria));
      else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null));
      if (mc) {
        const r = mcRett(set, ex, wrongFactor(set));
        card.appendChild(el(".explain", { style: { marginTop: "14px" } },
          el("b", `${pts(r.got)} av ${r.of} poeng`), ` · ${r.rett} riktig, ${r.galt} feil, ${r.blank} ubesvart` + (wrongFactor(set) ? " · minuspoeng for feil" : "")));
      } else card.appendChild(scoreRow(set, ex));
    }

    wrap.appendChild(card);

    const move = el(".row", { style: { gap: "8px", marginTop: "18px" } },
      cursor > 0 ? el("button.btn.ghost.sm", { onclick: () => { cursor--; S.app.refresh(); } }, "← Forrige oppgave") : null,
      el(".spacer"),
      cursor < exs.length - 1 ? el("button.btn.sm", { onclick: () => { cursor++; S.app.refresh(); } }, "Neste oppgave →") : null);
    wrap.appendChild(move);

    if (ex.chapters && ex.chapters.length && S.hasModule("/curriculum")) {
      wrap.appendChild(el(".card", { style: { marginTop: "18px" } },
        el(".tiny.muted", { style: { marginBottom: "8px" } }, "Kapitler denne oppgaven bygger på"),
        el(".row.wrap", { style: { gap: "6px" } }, ...ex.chapters.map((n) => {
          const c = S.data.chapter(n);
          return el(".chip", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${n}`) }, `K${n}${c ? " · " + c.title.slice(0, 28) : ""}`);
        }))));
    }
    return wrap;
  }

  /* ================= eksamensmodus ================= */
  function renderExam(set) {
    stopTicker();
    const wrap = el(".fade-in");
    wrap.appendChild(topBar(set));

    const r = run(set.id);
    if (!r.startedAt) { wrap.appendChild(startCard(set)); return wrap; }

    const submitted = !!r.submittedAt;
    wrap.appendChild(clockBar(set, submitted));

    if (submitted) wrap.appendChild(resultCard(set));

    const harMC = settHarMC(set);
    (set.exercises || []).forEach((ex) => {
      const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
      card.appendChild(exerciseHead(ex));
      card.appendChild(body(ex.body));
      const hoved = leddFor(ex, "");
      if (hoved) card.appendChild(mcValg(set, ex, hoved, submitted, !submitted));
      (ex.parts || []).forEach((part) => {
        const pc = el(".sett-part");
        pc.appendChild(el(".row", el(".part-label", part.label + ")"), el(".spacer"),
          part.points ? el(".tiny.muted", `${part.points} p`) : null));
        pc.appendChild(body(part.body));
        const ledd = leddFor(ex, part.label);
        if (ledd) pc.appendChild(mcValg(set, ex, ledd, submitted, !submitted));
        if (submitted) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria));
        card.appendChild(pc);
      });
      if (submitted) {
        if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria));
        else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null));
        if (erMC(ex)) {
          const r = mcRett(set, ex, wrongFactor(set));
          card.appendChild(el(".explain", { style: { marginTop: "14px" } },
            el("b", `${pts(r.got)} av ${r.of} poeng`), ` · ${r.rett} riktig, ${r.galt} feil, ${r.blank} ubesvart`));
        } else card.appendChild(scoreRow(set, ex));
      }
      wrap.appendChild(card);
    });

    if (!submitted) {
      const blanke = harMC ? (set.exercises || []).reduce((n, ex) => n + mcRett(set, ex, 0).blank, 0) : 0;
      wrap.appendChild(el(".card.pad-lg", { style: { textAlign: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" } },
        el("p", { style: { margin: "0 0 14px", fontSize: "15px", lineHeight: 1.55 } },
          el("b", "Ferdig? "), harMC ? "Når du leverer, rettes flervalgene automatisk og alle løsningene åpnes." : "Når du leverer, åpnes alle løsningene samtidig, og du poengsetter deg selv oppgave for oppgave."),
        blanke ? el("p.tiny.muted", { style: { margin: "0 0 12px" } }, `${blanke} ${blanke === 1 ? "ledd står" : "ledd står"} ubesvart` + (wrongFactor(set) ? " — det gir 0, som er bedre enn et feil svar hvis du er i tvil" : "")) : null,
        el("button.btn.primary.lg", { onclick: () => {
          if (confirm("Levere besvarelsen? Løsningene åpnes, og du kan ikke lukke dem igjen uten å nullstille settet.")) { submitRun(set.id); mcRettAlle(set); stopTicker(); S.app.refresh(); }
        } }, "Lever besvarelsen")));
    }
    return wrap;
  }

  /* Faktalinjene er fagets egne (set.facts). Standardlisten er skrevet for en
     skriftlig eksamen med formelark, og passer ikke et fag med digital flervalg —
     derfor kan settet overstyre den. */
  const STANDARD_FAKTA = [
    "Penn og papir. Kalkulator og tospråklig ordbok er tillatt; ingenting annet.",
    "Formelarket får du utlevert på eksamen — ha det tilgjengelig, men ikke annet.",
    "Skriv på engelsk, som på ekte eksamen.",
  ];
  function startCard(set) {
    const card = el(".card.pad-lg");
    card.appendChild(el("h3", { style: { fontSize: "20px", marginBottom: "10px" } }, "Eksamensmodus"));
    card.appendChild(el("p", { style: { fontSize: "15px", lineHeight: 1.6, color: "var(--ink-2)" } },
      `Hele settet vises samtidig med nedtelling fra ${set.minutes} minutter. Ingen fasit er tilgjengelig noe sted før du leverer.`));
    const facts = el("ul", { style: { fontSize: "14.5px", lineHeight: 1.7, color: "var(--ink-2)", paddingLeft: "20px" } });
    [
      `${set.points} poeng på ${set.minutes} minutter — det er ${(set.minutes / set.points).toFixed(1).replace(".", ",")} minutter per poeng.`,
      ...(set.facts || STANDARD_FAKTA),
      "Nedtellingen overlever at du lukker fanen, så en uhellsvangert oppfriskning ødelegger ingenting.",
    ].forEach((t) => facts.appendChild(el("li", t)));
    card.appendChild(facts);

    /* Minuspoeng velges per økt, så et eldre sett uten straff kan kjøres slik
       eksamen faktisk blir. Forvalget følger settet. */
    let wf = (set.mc && typeof set.mc.wrongFactor === "number") ? set.mc.wrongFactor : 0;
    if (settHarMC(set)) {
      const boks = el("label.check" + (wf ? ".done" : ""), { style: { display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "14px", cursor: "pointer" } });
      const cb = el("input", { type: "checkbox" }); cb.checked = !!wf;
      cb.addEventListener("change", () => { wf = cb.checked ? -1 / 3 : 0; boks.classList.toggle("done", cb.checked); });
      boks.appendChild(cb);
      boks.appendChild(el("div",
        el("div", { style: { fontWeight: 620 } }, "Minuspoeng for feil svar"),
        el(".tiny.muted", "Som på eksamen høsten 2026: feil svar trekker en tredel av oppgavens poeng, ubesvart gir null. Forventet verdi av å gjette blindt blant fire er da null — og positiv først når du har utelukket ett alternativ.")));
      card.appendChild(boks);
    }

    card.appendChild(el(".row", { style: { marginTop: "16px", gap: "8px" } },
      el("button.btn.primary.lg", { onclick: () => { startRun(set.id, "exam", wf); S.app.refresh(); } }, "Start eksamen"),
      el("button.btn.ghost", { onclick: () => { mode = "practice"; cursor = 0; S.app.refresh(); } }, "Heller øvingsmodus")));
    return card;
  }

  function clockBar(set, submitted) {
    const bar = el(".exam-clock" + (submitted ? ".done" : ""));
    const time = el(".ec-t", fmtClock(remainingMs(set)));
    bar.appendChild(el(".ec-l", submitted ? "Levert" : "Tid igjen"));
    bar.appendChild(time);
    bar.appendChild(el(".spacer"));
    bar.appendChild(el(".tiny", { style: { opacity: .85 } }, `${set.points} poeng · ${(set.exercises || []).length} oppgaver`));
    if (!submitted) {
      ticker = setInterval(() => {
        if (!document.body.contains(time)) return stopTicker();
        const ms = remainingMs(set);
        time.textContent = fmtClock(ms);
        bar.classList.toggle("over", ms < 0);
      }, 1000);
    }
    return bar;
  }

  function resultCard(set) {
    const sum = scoreSum(set);
    const harMC = settHarMC(set);
    const bareMC = harMC && (set.exercises || []).every(erMC);
    const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    card.appendChild(el("h3", { style: { fontSize: "18px", marginBottom: "6px" } }, bareMC ? "Resultat" : "Selvvurdering"));
    card.appendChild(el("p.tiny.muted", { style: { marginTop: 0 } },
      bareMC ? "Flervalgene er rettet automatisk. Gå gjennom hver oppgave og les fasiten der du bommet — det er der læringen ligger."
      : harMC ? "Flervalgene er rettet automatisk. De åpne oppgavene poengsetter du selv mot fasitens kriterier. Vær streng — sensor er det."
      : "Gå gjennom oppgave for oppgave og gi deg selv poeng mot fasitens kriterier. Vær streng — sensor er det."));
    const pct = sum.of ? Math.max(0, Math.round((sum.got / sum.of) * 100)) : 0;
    const info = el("div",
      el("div", { style: { fontSize: "22px", fontWeight: 680 } }, `${pts(sum.got)} / ${sum.of} poeng`),
      el(".tiny.muted", bareMC ? `${sum.total} oppgaver rettet` : `${sum.scored} av ${sum.total} oppgaver vurdert`));
    if (harMC) {
      const wf = wrongFactor(set);
      const tell = (set.exercises || []).reduce((a, ex) => { const r = mcRett(set, ex, wf); a.rett += r.rett; a.galt += r.galt; a.blank += r.blank; return a; }, { rett: 0, galt: 0, blank: 0 });
      info.appendChild(el(".tiny.muted", { style: { marginTop: "4px" } }, `${tell.rett} riktig · ${tell.galt} feil · ${tell.blank} ubesvart` + (wf ? " · med minuspoeng" : " · uten minuspoeng")));
      /* Det samme settet under den andre regelen — så du ser hva gjettingen koster. */
      const annenWf = wf ? 0 : -1 / 3;
      const annen = (set.exercises || []).reduce((s, ex) => s + (erMC(ex) ? mcRett(set, ex, annenWf).got : (exState(set.id, ex.n).score || 0)), 0);
      info.appendChild(el(".tiny.muted", { style: { marginTop: "2px" } }, `${wf ? "Uten" : "Med"} minuspoeng ville det vært ${pts(Math.round(annen * 100) / 100)} poeng.`));
    } else {
      info.appendChild(el("p.tiny.muted", { style: { marginTop: "8px", maxWidth: "420px" } },
        "Poengsummen er din egen vurdering, ikke en karakter. Den er verdt noe bare hvis du trekker fra der utregningen manglet eller mekanismen ikke ble navngitt."));
    }
    card.appendChild(el(".row.wrap", { style: { gap: "18px", alignItems: "center", marginTop: "10px" } },
      S.u.ring(pct, 92, `${pct}%`, "av maks"), info));
    return card;
  }

  /* ================= inngang ================= */
  function render() {
    stopTicker();
    const set = openSet ? setById(openSet) : null;
    if (!set) { openSet = null; return renderList(); }
    return mode === "exam" ? renderExam(set) : renderPractice(set);
  }

  /* Merke i navigasjonen: sett som er påbegynt, men ikke levert. */
  function activeCount() {
    return SETS().filter((s) => { const r = run(s.id); return r.startedAt && !r.submittedAt; }).length;
  }

  S.views.sett = { render, activeCount };
})(window.EDU);
