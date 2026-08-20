/* ===================== EKSAMENSSETT — hele sett, to moduser =====================
   Faget leverer ferdige eksamenssett i EDU_DATA.sets. Modulen kjører dem på to
   måter, og forskjellen er pedagogisk, ikke kosmetisk:

     Øvingsmodus    én oppgave om gangen. Fasiten er låst til du selv sier at du
                    har skrevet svaret. Å lese en løsning man ikke har forsøkt på
                    gir gjenkjennelse, ikke kunnskap.
     Eksamensmodus  hele settet samtidig, med nedtelling. Ingen fasit er nåbar
                    noe sted før du leverer. Det er tidspresset som er poenget.

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

  function startRun(setId, m) {
    S.store.setExam(runKey(setId), { mode: m, startedAt: S.u.nowTs(), submittedAt: null });
  }
  function submitRun(setId) { S.store.setExam(runKey(setId), { submittedAt: S.u.nowTs() }); }
  function resetRun(setId) {
    const st = S.store.get(); const set = setById(setId);
    delete st.exams[runKey(setId)];
    ((set && set.exercises) || []).forEach((ex) => delete st.exams[exKey(setId, ex.n)]);
    S.store.emit();
  }
  const isSubmitted = (setId) => !!run(setId).submittedAt;

  /* Fasit er synlig når settet er levert, eller når du selv har åpnet den i
     øvingsmodus. Har du levert, forblir den åpen også om du bytter til øving —
     å låse den igjen etterpå ville bare vært irriterende. */
  function solutionOpen(setId, n) {
    if (isSubmitted(setId)) return true;
    return mode === "exam" ? false : !!exState(setId, n).revealed;
  }
  function reveal(setId, n) { S.store.setExam(exKey(setId, n), { revealed: true }); }
  function setScore(setId, n, score) { S.store.setExam(exKey(setId, n), { score: score, scoredAt: S.u.nowTs() }); }

  function scoreSum(set) {
    let got = 0, of = 0, scored = 0;
    (set.exercises || []).forEach((ex) => {
      of += ex.points || 0;
      const s = exState(set.id, ex.n);
      if (typeof s.score === "number") { got += s.score; scored++; }
    });
    return { got, of, scored, total: (set.exercises || []).length };
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
      el("b", `${sum.got} av ${sum.of} poeng`), ` · selvvurdert på ${sum.scored} av ${sum.total} oppgaver`));

    card.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn.primary", { onclick: () => { openSet = set.id; mode = "practice"; cursor = 0; S.app.refresh(); } }, "Øvingsmodus"),
      el("button.btn", { onclick: () => { openSet = set.id; mode = "exam"; S.app.refresh(); } }, "⏱ Eksamensmodus"),
      done ? el("button.btn.ghost.sm", { onclick: () => {
        if (confirm(`Nullstille «${set.label}» — både leveringen og alle selvvurderinger? Kan ikke angres.`)) { resetRun(set.id); S.app.refresh(); }
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

  /* Oppgaveteksten er forfattet HTML — den skal rendres, ikke escapes. */
  function body(html) { const d = el(".prose"); if (html) d.appendChild(frag(html)); return d; }

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

    (ex.parts || []).forEach((part) => {
      const pc = el(".sett-part");
      pc.appendChild(el(".row", el(".part-label", part.label + ")"), el(".spacer"),
        part.points ? el(".tiny.muted", `${part.points} p`) : null));
      pc.appendChild(body(part.body));
      if (open) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria));
      card.appendChild(pc);
    });

    if (!open) {
      card.appendChild(el(".card", { style: { marginTop: "18px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          el("b", "Skriv svaret først. "),
          "Eksamen er penn og papir, så gjør det på papir her også — hele utregningen, ikke bare svaret. Å lese en løsning du ikke har forsøkt på gir gjenkjennelse, ikke kunnskap."),
        el("button.btn.primary", { onclick: () => { reveal(set.id, ex.n); S.app.refresh(); } }, "Jeg har skrevet svaret — vis løsningen")));
    } else {
      if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria));
      else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null));
      card.appendChild(scoreRow(set, ex));
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

    (set.exercises || []).forEach((ex) => {
      const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
      card.appendChild(exerciseHead(ex));
      card.appendChild(body(ex.body));
      (ex.parts || []).forEach((part) => {
        const pc = el(".sett-part");
        pc.appendChild(el(".row", el(".part-label", part.label + ")"), el(".spacer"),
          part.points ? el(".tiny.muted", `${part.points} p`) : null));
        pc.appendChild(body(part.body));
        if (submitted) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria));
        card.appendChild(pc);
      });
      if (submitted) {
        if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria));
        else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null));
        card.appendChild(scoreRow(set, ex));
      }
      wrap.appendChild(card);
    });

    if (!submitted) {
      wrap.appendChild(el(".card.pad-lg", { style: { textAlign: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" } },
        el("p", { style: { margin: "0 0 14px", fontSize: "15px", lineHeight: 1.55 } },
          el("b", "Ferdig? "), "Når du leverer, åpnes alle løsningene samtidig, og du poengsetter deg selv oppgave for oppgave."),
        el("button.btn.primary.lg", { onclick: () => {
          if (confirm("Levere besvarelsen? Løsningene åpnes, og du kan ikke lukke dem igjen uten å nullstille settet.")) { submitRun(set.id); stopTicker(); S.app.refresh(); }
        } }, "Lever besvarelsen")));
    }
    return wrap;
  }

  function startCard(set) {
    const card = el(".card.pad-lg");
    card.appendChild(el("h3", { style: { fontSize: "20px", marginBottom: "10px" } }, "Eksamensmodus"));
    card.appendChild(el("p", { style: { fontSize: "15px", lineHeight: 1.6, color: "var(--ink-2)" } },
      `Hele settet vises samtidig med nedtelling fra ${set.minutes} minutter. Ingen fasit er tilgjengelig noe sted før du leverer.`));
    const facts = el("ul", { style: { fontSize: "14.5px", lineHeight: 1.7, color: "var(--ink-2)", paddingLeft: "20px" } });
    [
      `${set.points} poeng på ${set.minutes} minutter — det er ${(set.minutes / set.points).toFixed(1).replace(".", ",")} minutter per poeng.`,
      "Penn og papir. Kalkulator og tospråklig ordbok er tillatt; ingenting annet.",
      "Formelarket får du utlevert på eksamen — ha det tilgjengelig, men ikke annet.",
      "Skriv på engelsk, som på ekte eksamen.",
      "Nedtellingen overlever at du lukker fanen, så en uhellsvangert oppfriskning ødelegger ingenting.",
    ].forEach((t) => facts.appendChild(el("li", t)));
    card.appendChild(facts);
    card.appendChild(el(".row", { style: { marginTop: "16px", gap: "8px" } },
      el("button.btn.primary.lg", { onclick: () => { startRun(set.id, "exam"); S.app.refresh(); } }, "Start eksamen"),
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
    const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    card.appendChild(el("h3", { style: { fontSize: "18px", marginBottom: "6px" } }, "Selvvurdering"));
    card.appendChild(el("p.tiny.muted", { style: { marginTop: 0 } },
      "Gå gjennom oppgave for oppgave og gi deg selv poeng mot fasitens kriterier. Vær streng — sensor er det."));
    const pct = sum.of ? Math.round((sum.got / sum.of) * 100) : 0;
    card.appendChild(el(".row.wrap", { style: { gap: "18px", alignItems: "center", marginTop: "10px" } },
      S.u.ring(pct, 92, `${pct}%`, "av maks"),
      el("div",
        el("div", { style: { fontSize: "22px", fontWeight: 680 } }, `${sum.got} / ${sum.of} poeng`),
        el(".tiny.muted", `${sum.scored} av ${sum.total} oppgaver vurdert`),
        el("p.tiny.muted", { style: { marginTop: "8px", maxWidth: "420px" } },
          "Poengsummen er din egen vurdering, ikke en karakter. Den er verdt noe bare hvis du trekker fra der utregningen manglet eller mekanismen ikke ble navngitt."))));
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
