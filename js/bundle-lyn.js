/* ===================== LYNLÆRING — mobil-først minispill =====================
   Kort, variert eksamenstrening (2-5 min): lynquiz, sant/usant, formel-lyn,
   par-sprint, skift eller glid, mekanisme-kjeder og dagens bit. XP, nivåer og
   streak. Alt innhold kommer fra eksamensmanualen og oppgavepoolene. */
window.EDU = window.EDU || {};
window.EDU_DATA = window.EDU_DATA || {};

(function (S) {
  const { el, icon } = S.u;
  const sh = () => S.views.shared;
  const D = () => window.EDU_DATA.lyn || { tf: [], shift: [], chains: [] };

  /* ---------- fremdriftsport ----------
     Uten dette serverer lynøkta spørsmål fra hele pensum fra dag én, så du kan
     få M&A i modul 3. Fag som setter lynFollowsProgress i manifestet får i
     stedet bare kapitler de har nådd: alt i modulene til og med den du står i,
     pluss alt du selv har huket av som lest. Låser du opp for lite til at et
     spill har nok innhold, faller spillet ut av rutenettet i stedet for å fylle
     opp med stoff du ikke har sett. */
  const følgerFremdrift = () => !!(window.EDU_SUBJECT || {}).lynFollowsProgress;
  function åpneKapitler() {
    if (!følgerFremdrift()) return null;                       // null = ingen port
    const åpne = new Set();
    const st = S.store.get();
    Object.keys(st.chapters || {}).forEach((n) => { if (st.chapters[n] && st.chapters[n].read) åpne.add(+n); });
    const nå = S.data.activeDayIndex();
    (S.data.days() || []).forEach((d) => { if (d.day <= nå) (d.chapters || []).forEach((c) => åpne.add(c)); });
    return åpne;
  }
  /* Elementer uten kapittelmerking slipper gjennom — de hører ikke til noe sted. */
  function port(liste, hentCh) {
    const åpne = åpneKapitler();
    if (!åpne) return liste || [];
    return (liste || []).filter((it) => {
      const ch = hentCh(it);
      if (ch == null) return true;
      return Array.isArray(ch) ? (ch.length === 0 || ch.some((c) => åpne.has(c))) : åpne.has(ch);
    });
  }
  const bank = (navn) => port(D()[navn] || [], (it) => (it.ch == null ? null : it.ch));
  const mcqPool = () => port((S.data.raw.quizzes || []).filter((q) => q.type === "mcq"), (q) => q.ch);
  const symbolPool = () => port(S.data.glossary.symbols || [], (e) => e.chapters);
  const okonomPool = () => port(S.data.glossary.economists || [], (e) => e.chapters);
  const kapittelPool = () => port(S.data.chapters(), (c) => c.num);
  /* Formeltabellene bærer ingen kapittelmerking selv; manifestet sier hvor de
     hører hjemme, i samme rekkefølge som de står i manualen. Uten kartet slipper
     alle gjennom, som før. */
  function formelTabeller() {
    const kart = (window.EDU_SUBJECT || {}).formulaTableChapters;
    const tabeller = S.data.reference.formulaTables || [];
    if (!kart) return tabeller;
    return port(tabeller.map((t, i) => Object.assign({ _ch: kart[i] || null }, t)), (t) => t._ch);
  }

  /* ---------- persistent lyn-state (xp, streak, spill) ---------- */
  function L() { const st = S.store.get(); if (!st.lyn) st.lyn = { xp: 0, days: {}, plays: 0, best: {} }; return st.lyn; }
  function save() { S.store.emit(); }
  function addXp(n) { L().xp += Math.round(n); save(); }
  function dailyDone() { return !!L().days[S.u.todayISO()]; }
  function markDaily() { L().days[S.u.todayISO()] = true; save(); }
  function streak() {
    const days = L().days; let n = 0;
    for (let i = 0; i < 400; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (days[iso]) n++; else if (i > 0) break;
    }
    return n;
  }
  /* Nivånavnene er fagets, ikke motorens. Standarden er SAM3s akademiske stige,
     som ga «Sensor» og «Nobelkandidat» også til et kurs om jobbintervjuer. */
  const DEFAULT_LEVELS = [[0, "Fersking"], [120, "Student"], [320, "Gruppelærer"], [650, "Seminarleder"], [1100, "Foreleser"], [1700, "Sensor"], [2600, "Nobelkandidat"]];
  const LEVELS_FOR = () => { const m = (window.EDU_SUBJECT || {}).lynLevels; return (Array.isArray(m) && m.length) ? m : DEFAULT_LEVELS; };
  function levelInfo() {
    const xp = L().xp; let i = 0;
    while (i < LEVELS_FOR().length - 1 && xp >= LEVELS_FOR()[i + 1][0]) i++;
    return { idx: i, name: LEVELS_FOR()[i][1], xp, prev: LEVELS_FOR()[i][0], next: i < LEVELS_FOR().length - 1 ? LEVELS_FOR()[i + 1][0] : null };
  }

  /* ---------- utils ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  let tick = null;
  function clearTick() { if (tick) { clearInterval(tick); tick = null; } }
  function progBar(total, at) { const p = el(".lyn-prog"); for (let j = 0; j < total; j++) p.appendChild(el("span" + (j < at ? ".done" : j === at ? ".cur" : ""))); return p; }

  /* ---------- spillregister ---------- */
  const GAMES = {
    blitz: { name: "Lynquiz", emoji: "⚡", desc: "8 spørsmål mot klokka", ready: () => mcqPool().length >= 8, run: runBlitz },
    tf: { name: "Sant eller usant", emoji: "🎯", desc: "Avslør eksamensmytene", ready: () => bank("tf").length >= 10, run: runTF },
    formel: { name: "Formel-lyn", emoji: "🧮", desc: "Finn riktig formel", ready: () => flatFormulas().length >= 12, run: runFormel },
    par: { name: "Par-sprint", emoji: "🃏", desc: "Match symboler og begreper", ready: () => symbolPool().length >= 6, run: runPar },
    skift: { name: "Skift eller glid?", emoji: "📈", desc: "Kurveskift vs. bevegelse langs", ready: () => bank("shift").length >= 10, run: runSkift },
    kjede: { name: "Kjede", emoji: "🔗", desc: "Bygg mekanismen steg for steg", ready: () => bank("chains").length >= 3, run: runKjede },
    hode: { name: "Hoderegning", emoji: "🔢", desc: "Eksamensmatte uten kalkulator", ready: () => bank("hode").length >= 8, run: runHode },
    updown: { name: "Opp eller ned?", emoji: "↕️", desc: "Hvilken vei går størrelsen?", ready: () => bank("updown").length >= 10, run: runUpDown },
    forklar: { name: "Forklar!", emoji: "🎙️", desc: "45 sekunder per mekanisme", ready: () => forklarPool().length >= 3, run: runForklar },
    oddone: { name: "En skiller seg ut", emoji: "🕵️", desc: "Finn inntrengeren", ready: () => formelTabeller().filter((t) => t.rows.length >= 3).length >= 2, run: runOddOne },
    memory: { name: "Memory", emoji: "🧠", desc: "Finn skjulte par", ready: () => symbolPool().length >= 6, run: runMemory },
    okonom: { name: "Hvem er økonomen?", emoji: "🧑‍🏫", desc: "Koble navn til bidrag", ready: () => okonomPool().length >= 6, run: runOkonom },
    bit: { name: "Dagens bit", emoji: "☕", desc: "To innsikter og én sjekk", ready: () => kapittelPool().length > 0, run: runBit },
    struktur: { name: "Strukturer!", emoji: "🌳", desc: "90 sekunder per prompt", ready: () => bank("struktur").length >= 3, run: runStruktur },
    feil: { name: "Finn feilen", emoji: "🔍", desc: "Hvor går utregningen galt?", ready: () => bank("feil").length >= 6, run: runFinnFeilen },
    graf: { name: "Les grafen", emoji: "📊", desc: "Exhibit-tolkning på tid", ready: () => bank("graf").length >= 6, run: runGraf },
    estimat: { name: "Bygg estimatet", emoji: "📐", desc: "Markedsstørrelse steg for steg", ready: () => bank("estimat").length >= 2, run: runEstimat },
  };
  /* Hvilke spill faget i det hele tatt har. Uten dette fikk Caseintervju både
     «Skift eller glid?» (kurveskift mot bevegelse langs kurven — ren makro) og
     fem fliser som aldri kunne åpne seg, fordi faget ikke har formelsamling,
     symbolliste eller økonomer. Utelates feltet, gjelder alle spill som før. */
  function spillKeys() {
    const m = (window.EDU_SUBJECT || {}).lynGames;
    const alle = Object.keys(GAMES);
    return (Array.isArray(m) && m.length) ? alle.filter((k) => m.indexOf(k) > -1) : alle;
  }
  /* Navn og undertekst kan overstyres per fag, så et spill kan gjenbrukes med
     en merkelapp som gir mening i faget. */
  function spillInfo(k) {
    const o = ((window.EDU_SUBJECT || {}).lynLabels || {})[k] || {};
    return Object.assign({}, GAMES[k], o);
  }
  function availableGames() { return spillKeys().filter((k) => { try { return GAMES[k].ready(); } catch (e) { return false; } }); }

  /* ---------- økt-tilstand ---------- */
  let sess = null; // {plan:[keys], idx, daily, xp, summaries:[], stage}
  function startSession(plan, daily) { clearTick(); sess = { plan, idx: 0, daily, xp: 0, summaries: [], stage: "game" }; S.app.refresh(); window.scrollTo(0, 0); }
  function endSession() { clearTick(); sess = null; S.app.refresh(); }
  function gameDone(xp, summary) {
    sess.xp += xp; sess.summaries.push(summary); sess.idx++;
    if (sess.idx >= sess.plan.length) {
      sess.stage = "done"; addXp(sess.xp);
      if (sess.daily && !dailyDone()) { markDaily(); addXp(25); sess.bonus = 25; }
      L().plays = (L().plays || 0) + 1; save();
    }
    S.app.refresh(); window.scrollTo(0, 0);
  }
  function dailyPlan() {
    const avail = availableGames();
    const picks = shuffle(avail).slice(0, 3);
    return picks.length ? picks : ["blitz"];
  }

  /* ---------- felles MCQ-runner (lynquiz, skift, formel) ---------- */
  function mcqRunner(cfg, done) {
    const box = el(".lyn-game");
    let i = 0, correct = 0, combo = 0, xp = 0;
    function step() {
      clearTick(); S.u.clear(box);
      if (i >= cfg.rounds.length) { done(xp, `${cfg.title}: ${correct}/${cfg.rounds.length} riktige`); return; }
      const r = cfg.rounds[i];
      box.appendChild(progBar(cfg.rounds.length, i));
      let barSpan = null;
      /* Tiden er per runde når oppgaven sier det. Ett fast tall for hele banken
         ga 25 sekunder både til «hva er 1/8 i prosent» og til et nullpunkt med
         tre ledd — og casene selv gir 90 til 120 sekunder på det siste. */
      const sek = r.sek || cfg.secs;
      if (sek) { const bar = el(".lyn-timer", el("span")); barSpan = bar.firstChild; box.appendChild(bar); }
      if (r.kicker) box.appendChild(el(".tiny.muted", { style: { marginBottom: "4px" } }, r.kicker));
      /* Figuren er rå HTML — exhibit-spillene trenger tabeller og SVG. Alt annet
         i lynmodulen escapes, så dette er det ene bevisste unntaket. */
      if (r.figur) box.appendChild(el(".card.flat", { style: { margin: "0 0 12px", overflowX: "auto" } }, el(".prose", S.u.frag(r.figur))));
      box.appendChild(el(".lyn-q", r.q));
      if (combo >= 2) box.appendChild(el(".lyn-combo", "🔥 " + combo + " på rad"));
      const opts = []; let answered = false;
      const explain = el(".explain", { style: { display: "none" } });
      function finish(pick) {
        if (answered) return; answered = true; clearTick();
        opts.forEach((b, j) => { if (j === r.answer) b.classList.add("correct"); else if (j === pick) b.classList.add("wrong"); else b.classList.add("dim"); b.disabled = true; });
        const ok = pick === r.answer;
        if (ok) { correct++; combo++; xp += cfg.xpPer + Math.min(combo - 1, 4) * 2; } else combo = 0;
        if (cfg.record && r.id) cfg.record(r.id, ok);
        explain.innerHTML = `<b>${ok ? "Riktig!" : (pick < 0 ? "Tiden ute. " : "Feil. ")}</b>${S.u.escapeHtml(r.why || "")}`;
        explain.style.display = "block";
        box.appendChild(el(".center", { style: { marginTop: "14px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= cfg.rounds.length ? "Se resultat" : "Neste")));
      }
      r.options.forEach((o, j) => {
        const b = el("button.opt" + (cfg.mono ? ".mono" : ""), el(".key", String.fromCharCode(65 + j)), el("span", o));
        b.addEventListener("click", () => finish(j));
        opts.push(b); box.appendChild(b);
      });
      box.appendChild(explain);
      if (sek) {
        const t0 = Date.now();
        tick = setInterval(() => {
          if (!box.isConnected) { clearTick(); return; }
          const left = 1 - (Date.now() - t0) / (sek * 1000);
          if (left <= 0) finish(-1); else barSpan.style.width = (left * 100) + "%";
        }, 100);
      }
    }
    step(); return box;
  }

  function runBlitz(done) {
    const rounds = shuffle(mcqPool()).slice(0, 8)
      .map((q) => ({ q: q.q, options: q.options, answer: q.answer, why: q.explanation, id: q.id, kicker: "K" + q.ch }));
    return mcqRunner({ rounds, secs: 18, xpPer: 10, title: "Lynquiz", record: (id, ok) => S.store.recordAnswer(id, ok) }, done);
  }
  function runSkift(done) {
    const rounds = shuffle(bank("shift")).slice(0, 10).map((it) => ({ q: it.q, options: it.options, answer: it.answer, why: it.why, kicker: "K" + it.ch }));
    return mcqRunner({ rounds, xpPer: 12, title: "Skift eller glid" }, done);
  }
  /* Ikke bufret: hvilke tabeller som er åpne endrer seg med fremdriften. */
  function flatFormulas() {
    const ut = [];
    formelTabeller().forEach((t) => t.rows.forEach((r) => { if (r.formula && r.formula.length > 2) ut.push(r); }));
    return ut;
  }
  function runFormel(done) {
    const all = flatFormulas();
    const rounds = shuffle(all).slice(0, 8).map((row) => {
      const distract = shuffle(all.filter((x) => x.formula !== row.formula)).slice(0, 3).map((x) => x.formula);
      const options = shuffle([row.formula, ...distract]);
      return { q: "Hvilken formel hører til: " + row.term + "?", options, answer: options.indexOf(row.formula), why: row.point || "" };
    });
    return mcqRunner({ rounds, xpPer: 10, title: "Formel-lyn", mono: true }, done);
  }

  /* ---------- sant eller usant ---------- */
  function runTF(done) {
    const items = shuffle(bank("tf")).slice(0, 10);
    const box = el(".lyn-game");
    let i = 0, correct = 0, xp = 0;
    function step() {
      S.u.clear(box);
      if (i >= items.length) { done(xp, `Sant/usant: ${correct}/${items.length} riktige`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".tiny.muted", "K" + it.ch));
      box.appendChild(el(".lyn-statement", it.s));
      const fb = el("div");
      function answer(val) {
        const ok = val === it.answer;
        if (ok) { correct++; xp += 8; }
        S.u.clear(fb);
        fb.appendChild(el(".explain", { style: { borderColor: ok ? "var(--green)" : "var(--rose)" } },
          el("b", ok ? "Riktig! " : "Feil. "), `Påstanden er ${it.answer ? "SANN" : "USANN"}. ${it.why}`));
        fb.appendChild(el(".center", { style: { marginTop: "12px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= items.length ? "Se resultat" : "Neste")));
        row.querySelectorAll("button").forEach((b) => (b.disabled = true));
      }
      const row = el(".lyn-big",
        el("button.lyn-sant", { onclick: () => answer(true) }, "SANT"),
        el("button.lyn-usant", { onclick: () => answer(false) }, "USANT"));
      box.appendChild(row);
      box.appendChild(fb);
    }
    step(); return box;
  }

  /* ---------- par-sprint (matching) ---------- */
  function runPar(done) {
    const useEco = Math.random() < 0.3 && okonomPool().length >= 6;
    const short = (s) => { const t = s.split(/[.;]/)[0]; return t.length > 58 ? t.slice(0, 55) + "…" : t; };
    const pairs = useEco
      ? shuffle(okonomPool()).slice(0, 6).map((e, ix) => ({ k: ix, a: e.name.split(" ").slice(-1)[0], b: short(e.note) }))
      : shuffle(symbolPool()).slice(0, 6).map((e, ix) => ({ k: ix, a: e.sym, b: short(e.name) }));
    const tiles = shuffle(pairs.flatMap((p) => [{ k: p.k, t: p.a }, { k: p.k, t: p.b }]));
    const box = el(".lyn-game");
    box.appendChild(el(".lyn-q", useEco ? "Match økonom og bidrag" : "Match symbol og betydning"));
    const timeEl = el(".tiny.muted.center", "0 s");
    box.appendChild(timeEl);
    const grid = el(".par-grid");
    let sel = null, matched = 0, locked = false;
    const t0 = Date.now();
    tick = setInterval(() => { if (!box.isConnected) { clearTick(); return; } timeEl.textContent = Math.round((Date.now() - t0) / 1000) + " s"; }, 500);
    tiles.forEach((tile) => {
      const b = el("button.par-tile", tile.t);
      b.addEventListener("click", () => {
        if (locked || b.classList.contains("matched") || b === (sel && sel.btn)) return;
        if (!sel) { sel = { btn: b, k: tile.k }; b.classList.add("sel"); return; }
        if (sel.k === tile.k) {
          b.classList.add("matched"); sel.btn.classList.remove("sel"); sel.btn.classList.add("matched"); sel = null; matched++;
          if (matched === pairs.length) {
            clearTick();
            const secs = Math.round((Date.now() - t0) / 1000);
            const xp = secs <= 40 ? 60 : secs <= 75 ? 45 : 32;
            setTimeout(() => done(xp, `Par-sprint: 6/6 på ${secs} s`), 500);
          }
        } else {
          locked = true; b.classList.add("bad"); sel.btn.classList.add("bad");
          const prev = sel; sel = null;
          setTimeout(() => { b.classList.remove("bad"); prev.btn.classList.remove("bad", "sel"); locked = false; }, 480);
        }
      });
      grid.appendChild(b);
    });
    box.appendChild(grid);
    return box;
  }

  /* ---------- kjede (rekkefølge) ---------- */
  function runKjede(done) {
    const chains = shuffle(bank("chains")).slice(0, 2);
    const box = el(".lyn-game");
    let ci = 0, xp = 0;
    function step() {
      S.u.clear(box);
      if (ci >= chains.length) { done(xp, `Kjede: ${chains.length} mekanismer bygget`); return; }
      const ch = chains[ci];
      box.appendChild(progBar(chains.length, ci));
      box.appendChild(el(".lyn-q", ch.title));
      box.appendChild(el("p.tiny.muted", { style: { marginTop: "-6px" } }, "Trykk stegene i riktig rekkefølge:"));
      const built = el(".chain-built");
      box.appendChild(built);
      const pool = el(".chain-pool");
      let next = 0, mistakes = 0;
      shuffle(ch.steps.map((s, ix) => ({ s, ix }))).forEach((item) => {
        const b = el("button.chain-step", item.s);
        b.addEventListener("click", () => {
          if (item.ix === next) {
            next++;
            built.appendChild(el(".chain-done", el("span.cnum2", String(next)), el("span", item.s)));
            b.remove();
            if (next === ch.steps.length) {
              const gained = Math.max(10, 30 - 6 * mistakes); xp += gained;
              box.appendChild(el(".explain", { style: { marginTop: "12px" } }, el("b", "Kjede komplett! +" + gained + " XP. "), ch.why || ""));
              box.appendChild(el(".center", { style: { marginTop: "12px" } },
                el("button.btn.primary", { onclick: () => { ci++; step(); } }, ci + 1 >= chains.length ? "Se resultat" : "Neste kjede")));
            }
          } else {
            mistakes++;
            b.classList.add("shake");
            setTimeout(() => b.classList.remove("shake"), 350);
          }
        });
        pool.appendChild(b);
      });
      box.appendChild(pool);
    }
    step(); return box;
  }

  /* ---------- dagens bit (mikro-lesing + sjekk) ---------- */
  function runBit(done) {
    const mechs = [];
    kapittelPool().forEach((c) => (c.mechanisms || []).forEach((m) => { if (m.heading) mechs.push({ ch: c.num, heading: m.heading, html: m.html }); }));
    const picks = shuffle(mechs).slice(0, 2);
    const check = bank("tf").length ? shuffle(bank("tf"))[0] : null;
    const box = el(".lyn-game");
    let i = 0, xp = 15;
    function step() {
      S.u.clear(box);
      if (i < picks.length) {
        const m = picks[i];
        box.appendChild(progBar(picks.length + (check ? 1 : 0), i));
        box.appendChild(el(".chip.accent", { style: { marginBottom: "10px" } }, "⚙️ Mekanisme · K" + m.ch));
        box.appendChild(el("h3", { style: { fontSize: "18px", margin: "4px 0 10px" } }, m.heading));
        const body = el(".lyn-bit.prose"); body.innerHTML = m.html; box.appendChild(body);
        box.appendChild(el(".center", { style: { marginTop: "16px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 < picks.length ? "Neste bit" : (check ? "Rask sjekk →" : "Ferdig"))));
      } else if (check && i === picks.length) {
        box.appendChild(progBar(picks.length + 1, i));
        box.appendChild(el(".tiny.muted", "Rask sjekk"));
        box.appendChild(el(".lyn-statement", check.s));
        const fb = el("div");
        const row = el(".lyn-big",
          el("button.lyn-sant", { onclick: () => ans(true) }, "SANT"),
          el("button.lyn-usant", { onclick: () => ans(false) }, "USANT"));
        function ans(v) {
          const ok = v === check.answer; if (ok) xp += 8;
          row.querySelectorAll("button").forEach((b) => (b.disabled = true));
          fb.appendChild(el(".explain", el("b", ok ? "Riktig! " : "Feil. "), check.why));
          fb.appendChild(el(".center", { style: { marginTop: "12px" } }, el("button.btn.primary", { onclick: () => done(xp, "Dagens bit: 2 innsikter lest") }, "Se resultat")));
        }
        box.appendChild(row); box.appendChild(fb);
      } else {
        done(xp, "Dagens bit: 2 innsikter lest");
      }
    }
    step(); return box;
  }

  /* ---------- opp eller ned (komparativ statikk) ---------- */
  function runUpDown(done) {
    const items = shuffle(bank("updown")).slice(0, 10);
    const box = el(".lyn-game");
    let i = 0, correct = 0, xp = 0;
    function step() {
      S.u.clear(box);
      if (i >= items.length) { done(xp, `Opp eller ned: ${correct}/${items.length} riktige`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".tiny.muted", "K" + it.ch));
      box.appendChild(el(".lyn-statement", it.q));
      const fb = el("div");
      const row = el(".lyn-big",
        el("button.lyn-opp", { onclick: () => answer("opp") }, "⬆ OPP"),
        el("button.lyn-ned", { onclick: () => answer("ned") }, "⬇ NED"));
      function answer(v) {
        const ok = v === it.dir;
        if (ok) { correct++; xp += 8; }
        row.querySelectorAll("button").forEach((b) => (b.disabled = true));
        fb.appendChild(el(".explain", { style: { borderColor: ok ? "var(--green)" : "var(--rose)" } },
          el("b", ok ? "Riktig! " : "Feil. "), `Svar: ${it.dir.toUpperCase()}. ${it.why}`));
        fb.appendChild(el(".center", { style: { marginTop: "12px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= items.length ? "Se resultat" : "Neste")));
      }
      box.appendChild(row); box.appendChild(fb);
    }
    step(); return box;
  }

  /* ---------- hoderegning ---------- */
  /* Innholdet er fagets, ikke motorens: EDU_DATA.lyn.hode. To former godtas —
     { q, options, answer, why } ferdig satt, eller { q, correct, distractors, why }
     der motoren bygger og blander alternativene ved hver kjøring. */
  function hodePool() {
    return bank("hode").map((it) => {
      if (Array.isArray(it.options)) return it;
      const opts = shuffle([it.correct, ...(it.distractors || [])]);
      return { q: it.q, options: opts, answer: opts.indexOf(it.correct), why: it.why, ch: it.ch, sek: it.sek };
    }).filter((it) => Array.isArray(it.options) && it.options.length >= 2 && it.answer >= 0);
  }
  function runHode(done) {
    const rounds = shuffle(hodePool()).slice(0, 8);
    /* 30 s er standarden for et ettrinnsspørsmål. Oppgaver med flere ledd setter
       sin egen tid, kalibrert mot hva casene faktisk gir. */
    return mcqRunner({ rounds, secs: 30, xpPer: 12, title: "Hoderegning" }, done);
  }

  /* ---------- forklar! (mekanisme mot fasit, selvrettet) ---------- */
  function forklarPool() {
    const AL = window.EDU_DATA.activeLearning || {};
    const out = [];
    Object.keys(AL).forEach((ch) => AL[ch].forEach((p) => { const sol = p.solution || p.hint; if (sol) out.push({ ch: +ch, q: p.q, sol }); }));
    return port(out, (it) => it.ch);
  }
  function runForklar(done) {
    const items = shuffle(forklarPool()).slice(0, 3);
    const box = el(".lyn-game");
    let i = 0, xp = 0;
    function step() {
      clearTick(); S.u.clear(box);
      if (i >= items.length) { done(xp, `Forklar: ${items.length} mekanismer gjennomgått`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".tiny.muted", "K" + it.ch + " · Forklar i hodet (eller høyt) før du sjekker"));
      box.appendChild(el(".lyn-statement", it.q));
      const bar = el(".lyn-timer", el("span")); box.appendChild(bar);
      const fasit = el(".explain", { style: { display: "none" } });
      fasit.innerHTML = "<b>Fasit: </b>" + S.u.escapeHtml(it.sol);
      const rate = el(".fc-rate", { style: { display: "none", marginTop: "12px" } });
      const mk = (cls, label, pts) => el("button." + cls, { onclick: () => { xp += pts; i++; step(); } }, label);
      rate.appendChild(mk("again", "Bommet", 0)); rate.appendChild(mk("hard", "Delvis (+8)", 8)); rate.appendChild(mk("good", "Traff (+15)", 15));
      const reveal = el("button.btn.primary", { onclick: show }, "Vis fasit");
      function show() { clearTick(); bar.style.display = "none"; reveal.style.display = "none"; fasit.style.display = "block"; rate.style.display = "flex"; }
      box.appendChild(el(".center", reveal));
      box.appendChild(fasit); box.appendChild(rate);
      const t0 = Date.now(); const span = bar.firstChild; const secs = 45;
      tick = setInterval(() => { if (!box.isConnected) { clearTick(); return; } const left = 1 - (Date.now() - t0) / (secs * 1000); if (left <= 0) show(); else span.style.width = (left * 100) + "%"; }, 120);
    }
    step(); return box;
  }

  /* ---------- en skiller seg ut (generert fra formelsamlingen) ---------- */
  function runOddOne(done) {
    const tables = formelTabeller().filter((t) => t.rows.length >= 3);
    const rounds = [];
    let guard = 0;
    while (rounds.length < 8 && guard++ < 40 && tables.length >= 2) {
      const pick = shuffle(tables); const A = pick[0], B = pick[1];
      const own = shuffle(A.rows).slice(0, 3).map((r) => r.term);
      const intr = shuffle(B.rows).map((r) => r.term).find((t) => !own.includes(t));
      if (!intr) continue;
      const options = shuffle([...own, intr]);
      rounds.push({ q: `Hvilken hører IKKE til temaet «${A.title}»?`, options, answer: options.indexOf(intr), why: `«${intr}» hører til «${B.title}».` });
    }
    return mcqRunner({ rounds, xpPer: 10, title: "En skiller seg ut" }, done);
  }

  /* ---------- memory (skjulte par) ---------- */
  function runMemory(done) {
    const short = (s) => { const t = s.split(/[.;(]/)[0].trim(); return t.length > 40 ? t.slice(0, 37) + "…" : t; };
    const pairs = shuffle(symbolPool()).slice(0, 6).map((e, ix) => ({ k: ix, a: e.sym, b: short(e.name) }));
    const tiles = shuffle(pairs.flatMap((p) => [{ k: p.k, t: p.a }, { k: p.k, t: p.b }]));
    const box = el(".lyn-game");
    box.appendChild(el(".lyn-q", "Memory: finn parene (symbol ↔ betydning)"));
    const movesEl = el(".tiny.muted.center", "0 trekk"); box.appendChild(movesEl);
    const grid = el(".par-grid");
    let first = null, moves = 0, matched = 0, locked = false;
    tiles.forEach((tile) => {
      const b = el("button.par-tile.hidden-face", "?");
      b.addEventListener("click", () => {
        if (locked || b.classList.contains("matched") || (first && b === first.btn)) return;
        b.classList.remove("hidden-face"); b.textContent = tile.t;
        if (!first) { first = { btn: b, k: tile.k }; return; }
        moves++; movesEl.textContent = moves + " trekk";
        if (first.k === tile.k) {
          b.classList.add("matched"); first.btn.classList.add("matched"); first = null; matched++;
          if (matched === pairs.length) {
            const xp = moves <= 9 ? 60 : moves <= 13 ? 45 : 30;
            setTimeout(() => done(xp, `Memory: 6 par på ${moves} trekk`), 500);
          }
        } else {
          locked = true; const prev = first; first = null;
          setTimeout(() => { [b, prev.btn].forEach((x) => { x.classList.add("hidden-face"); x.textContent = "?"; }); locked = false; }, 750);
        }
      });
      grid.appendChild(b);
    });
    box.appendChild(grid);
    return box;
  }

  /* ---------- hvem er økonomen? ---------- */
  function runOkonom(done) {
    const eco = okonomPool();
    const rounds = shuffle(eco).slice(0, 8).map((e) => {
      const others = shuffle(eco.filter((x) => x.name !== e.name)).slice(0, 3).map((x) => x.name);
      const options = shuffle([e.name, ...others]);
      return { q: "Hvem forbindes med: " + e.note, options, answer: options.indexOf(e.name), why: e.name + ". " + e.note };
    });
    return mcqRunner({ rounds, xpPer: 8, title: "Hvem er økonomen" }, done);
  }


  /* ---------- strukturer på 90 sekunder (selvrettet) ----------
     Den viktigste ferdigheten i hele faget, og den som tåler mest mengde:
     mange forskjellige prompter slår én prompt gjort grundig. Formen er
     bevisst den samme som Forklar! — skriv i hodet eller på papir, avslør,
     vurder deg selv. Fasiten er en modellstruktur, ikke ett riktig svar. */
  function runStruktur(done) {
    const items = shuffle(bank("struktur")).slice(0, 3);
    const box = el(".lyn-game");
    let i = 0, xp = 0;

    /* Drillen ba om produksjon uten å ha vist ett eneste eksempel. Har du aldri
       sett en god struktur, er de første nitti sekundene bortkastet — du kan
       ikke lage det du ikke har sett. Faget kan derfor levere ett gjennomgått
       eksempel som vises først, og som kan hoppes over med ett trykk. */
    function visEksempel(fortsett) {
      const e = (window.EDU_DATA.lyn || {}).strukturIntro;
      if (!e) return fortsett();
      S.u.clear(box);
      box.appendChild(el(".tiny.muted", "Slik ser en god nedbrytning ut — les den før du prøver selv"));
      box.appendChild(el(".lyn-statement", e.prompt));
      const ul = el("ul", { style: { margin: "10px 0 0", paddingLeft: "20px", lineHeight: 1.6 } });
      (e.grener || []).forEach((g) => ul.appendChild(el("li", g)));
      box.appendChild(el(".explain", el("b", "Grenene:"), ul,
        e.hypotese ? el("p", { style: { margin: "10px 0 0" } }, el("b", "Hypotesen: "), e.hypotese) : null,
        e.poeng ? el("p", { style: { margin: "8px 0 0", color: "var(--ink-3)" } }, el("b", "Legg merke til: "), e.poeng) : null));
      box.appendChild(el(".center", { style: { marginTop: "14px" } },
        el("button.btn.primary", { onclick: fortsett }, "Jeg har lest den — start")));
    }

    function step() {
      clearTick(); S.u.clear(box);
      if (i >= items.length) { done(xp, `Struktur: ${items.length} prompter`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".tiny.muted", "Bryt ned problemet. Skriv på papir — og avslutt med hypotesen din."));
      box.appendChild(el(".lyn-statement", it.prompt));
      const bar = el(".lyn-timer", el("span")); box.appendChild(bar);

      const fasit = el(".explain", { style: { display: "none" } });
      const grener = el("ul", { style: { margin: "8px 0 0", paddingLeft: "20px", lineHeight: 1.6 } });
      (it.grener || []).forEach((g) => grener.appendChild(el("li", g)));
      fasit.appendChild(el("b", "En modellstruktur:"));
      fasit.appendChild(grener);
      if (it.hypotese) fasit.appendChild(el("p", { style: { margin: "10px 0 0" } }, el("b", "Hypotesen: "), it.hypotese));
      if (it.felle) fasit.appendChild(el("p", { style: { margin: "8px 0 0", color: "var(--ink-3)" } }, el("b", "Felle: "), it.felle));

      const rate = el(".fc-rate", { style: { display: "none", marginTop: "12px" } });
      const mk = (cls, label, pts) => el("button." + cls, { onclick: () => { xp += pts; i++; step(); } }, label);
      rate.appendChild(mk("again", "Bommet", 0));
      rate.appendChild(mk("hard", "Delvis (+10)", 10));
      rate.appendChild(mk("good", "Traff (+18)", 18));

      const reveal = el("button.btn.primary", { onclick: show }, "Vis modellstrukturen");
      function show() { clearTick(); bar.style.display = "none"; reveal.style.display = "none"; fasit.style.display = "block"; rate.style.display = "flex"; }
      box.appendChild(el(".center", reveal));
      box.appendChild(fasit); box.appendChild(rate);

      const t0 = Date.now(); const span = bar.firstChild; const secs = it.sek || 90;
      tick = setInterval(() => {
        if (!box.isConnected) { clearTick(); return; }
        const left = 1 - (Date.now() - t0) / (secs * 1000);
        if (left <= 0) show(); else span.style.width = (left * 100) + "%";
      }, 120);
    }
    visEksempel(step); return box;
  }

  /* ---------- finn feilen ----------
     Trener den vanligste tapsposten i caseregning: å regne videre på et tall
     som allerede er galt. Noen runder har ingen feil i det hele tatt — uten
     dem lærer man bare å lete til man finner noe. */
  function runFinnFeilen(done) {
    const items = shuffle(bank("feil")).slice(0, 6);
    const box = el(".lyn-game");
    let i = 0, riktige = 0, xp = 0;
    function step() {
      clearTick(); S.u.clear(box);
      if (i >= items.length) { done(xp, `Finn feilen: ${riktige}/${items.length} riktige`); return; }
      const it = items[i];
      box.appendChild(progBar(items.length, i));
      box.appendChild(el(".lyn-q", it.oppg));
      box.appendChild(el(".tiny.muted", { style: { marginBottom: "8px" } }, "Klikk linjen der det går galt — eller si at alt stemmer."));

      const fasitIdx = it.feil == null ? -1 : it.feil;
      let svart = false;
      const rader = [];
      const explain = el(".explain", { style: { display: "none" } });

      function avgjør(valgt) {
        if (svart) return; svart = true; clearTick();
        rader.forEach((b, j) => {
          if (j === fasitIdx) b.classList.add("correct");
          else if (j === valgt) b.classList.add("wrong");
          else b.classList.add("dim");
          b.disabled = true;
        });
        ingen.disabled = true;
        /* Er fasiten «ingen feil», skal det valget lyse grønt uansett hva som ble
           klikket — ellers får du vite at alt stemmer, uten å se hvor svaret lå. */
        if (fasitIdx === -1) ingen.classList.add("correct");
        else if (valgt === -1) ingen.classList.add("wrong");
        else ingen.classList.add("dim");
        const ok = valgt === fasitIdx;
        if (ok) { riktige++; xp += 14; }
        explain.innerHTML = "<b>" + (ok ? "Riktig! " : "Feil. ") + "</b>"
          + (fasitIdx === -1 ? "Utregningen er korrekt hele veien. " : "Feilen er i linje " + (fasitIdx + 1) + ". ")
          + S.u.escapeHtml(it.why || "");
        explain.style.display = "block";
        box.appendChild(el(".center", { style: { marginTop: "14px" } },
          el("button.btn.primary", { onclick: () => { i++; step(); } }, i + 1 >= items.length ? "Se resultat" : "Neste")));
      }

      it.linjer.forEach((linje, j) => {
        const b = el("button.opt.mono", el(".key", String(j + 1)), el("span", linje));
        b.addEventListener("click", () => avgjør(j));
        rader.push(b); box.appendChild(b);
      });
      const ingen = el("button.opt", el(".key", "✓"), el("span", "Alt stemmer — ingen feil her"));
      ingen.addEventListener("click", () => avgjør(-1));
      box.appendChild(ingen);
      box.appendChild(explain);
    }
    step(); return box;
  }

  /* ---------- les grafen ----------
     Exhibit-tolkning er en egen ferdighet, og aksekutt-fellen forsvinner
     ikke med erfaring. Derfor drilles den mekanisk i stedet for å forklares. */
  function runGraf(done) {
    const rounds = shuffle(bank("graf")).slice(0, 6)
      .map((it) => ({ q: it.q, figur: it.figur, options: it.options, answer: it.answer, why: it.why }));
    return mcqRunner({ rounds, xpPer: 13, title: "Les grafen" }, done);
  }

  /* ---------- bygg estimatet ----------
     Markedsstørrelse steg for steg, med sanity-sjekken som obligatorisk siste
     trinn. Den er nettopp det kandidater hopper over. */
  function runEstimat(done) {
    const items = shuffle(bank("estimat")).slice(0, 2);
    const rounds = [];
    items.forEach((it) => {
      (it.steg || []).forEach((s, n) => rounds.push({
        kicker: it.oppg + "  ·  steg " + (n + 1) + " av " + (it.steg.length + 1),
        q: s.sp, options: s.options, answer: s.answer, why: s.why,
      }));
      if (it.sanity) rounds.push({
        kicker: it.oppg + "  ·  sanity-sjekk",
        q: it.sanity.sp, options: it.sanity.options, answer: it.sanity.answer, why: it.sanity.why,
      });
    });
    return mcqRunner({ rounds, xpPer: 12, title: "Bygg estimatet" }, done);
  }

  /* ---------- visninger ---------- */
  function render() {
    if (sess) return sess.stage === "done" ? resultView() : gameView();
    return hub();
  }

  function hub() {
    clearTick();
    const wrap = el(".fade-in.lyn-wrap");
    const lv = levelInfo(); const st = streak(); const doneToday = dailyDone();

    // hero
    const hero = el(".lyn-hero");
    hero.appendChild(el(".row", { style: { position: "relative", zIndex: 1 } },
      el("div", { style: { flex: 1 } },
        el(".eyebrow", { style: { color: "rgba(255,255,255,.85)" } }, "LYNLÆRING"),
        el("h2", { style: { color: "#fff", fontSize: "24px", margin: "6px 0 2px" } }, "Eksamenstrening i lommeformat"),
        el("p", { style: { color: "rgba(255,255,255,.85)", margin: 0, fontSize: "14px" } }, "2-5 minutter. Perfekt på bussen.")),
      el(".lyn-streak", el(".fl", "🔥"), el(".n", String(st)), el(".l", "dager"))));
    wrap.appendChild(hero);

    // level card
    const lvCard = el(".card", { style: { marginTop: "14px" } });
    const span = lv.next ? lv.next - lv.prev : 1;
    const into = lv.next ? lv.xp - lv.prev : 1;
    lvCard.appendChild(el(".row",
      el("div", el(".tiny.muted", "Nivå " + (lv.idx + 1)), el("div", { style: { fontWeight: 700, fontSize: "17px" } }, lv.name)),
      el(".spacer"),
      el("div", { style: { textAlign: "right" } }, el(".tiny.muted", "XP"), el("div", { style: { fontWeight: 700, fontSize: "17px" } }, String(lv.xp)))));
    lvCard.appendChild(el("div", { style: { marginTop: "10px" } }, S.u.bar(lv.next ? Math.round((into / span) * 100) : 100, { thin: true })));
    if (lv.next) lvCard.appendChild(el(".tiny.muted", { style: { marginTop: "5px" } }, (lv.next - lv.xp) + " XP til " + LEVELS_FOR()[lv.idx + 1][1]));
    wrap.appendChild(lvCard);

    // daily CTA
    const cta = el(".card.lyn-cta" + (doneToday ? ".done" : ""), { onclick: () => startSession(dailyPlan(), true) });
    cta.appendChild(el(".row",
      el(".lyn-cta-emoji", doneToday ? "✅" : "⚡"),
      el("div", { style: { flex: 1 } },
        el("div", { style: { fontWeight: 700, fontSize: "16.5px" } }, doneToday ? "Dagens økt fullført!" : "Dagens lynøkt"),
        el(".tiny", { style: { color: doneToday ? "var(--ink-3)" : "rgba(255,255,255,.85)" } }, doneToday ? "Ta en ekstra runde for mer XP" : "3 spill · ~4 min · +25 bonus-XP")),
      el("div", { style: { fontSize: "20px", opacity: .7 }, html: icon("arrow") })));
    wrap.appendChild(cta);

    // game tiles
    wrap.appendChild(el(".section-title", el("h3", "Velg spill")));
    const grid = el(".lyn-grid");
    const portÅpen = åpneKapitler();
    spillKeys().forEach((k) => {
      const g = spillInfo(k); const ok = GAMES[k].ready();
      /* Skiller «faget har ikke dette innholdet» fra «du har ikke kommet dit ennå». */
      const låstAvFremdrift = !ok && portÅpen;
      const tile = el("button.lyn-tile", { disabled: !ok, onclick: () => ok && startSession([k], false) },
        el(".em", g.emoji), el(".nm", g.name),
        el(".ds", ok ? g.desc : låstAvFremdrift ? "Åpnes når du har lest mer" : "Kommer snart"));
      grid.appendChild(tile);
    });
    wrap.appendChild(grid);

    /* Fortell hvor mye som er låst opp, ellers ser et halvtomt rutenett ut som en feil. */
    if (portÅpen) {
      const kap = kapittelPool().length, alle = S.data.chapters().length;
      const klare = availableGames().length;
      wrap.appendChild(el(".card", { style: { marginTop: "16px", background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" } },
        el("p", { style: { margin: 0, fontSize: "14px", lineHeight: 1.55 } },
          el("b", `Lynøkta følger fremdriften din. `),
          `Den henter bare fra de ${kap} av ${alle} kapitlene du har nådd, så du slipper spørsmål om stoff du ikke har lest. `,
          klare < spillKeys().length
            ? `${spillKeys().length - klare} spill åpner seg etter hvert som du kommer lenger.`
            : `Alle ${klare} spillene er åpne.`)));
    }

    wrap.appendChild(el("p.tiny.muted.center", { style: { marginTop: "18px", lineHeight: 1.5 } },
      sh().copy("lynFoot", "Alt innhold er hentet fra pensummanualen. Feil svar viser alltid forklaringen, det er der læringen skjer. Tips: legg siden til på Hjem-skjermen for app-følelse.")));
    return wrap;
  }

  function gameView() {
    const wrap = el(".fade-in.lyn-wrap");
    const key = sess.plan[sess.idx]; const g = spillInfo(key);
    wrap.appendChild(el(".row", { style: { marginBottom: "10px" } },
      el("button.iconbtn", { onclick: () => { if (confirm("Avslutte økten?")) endSession(); }, title: "Avslutt" }, "✕"),
      el("div", { style: { fontWeight: 700, fontSize: "16px" } }, g.emoji + " " + g.name),
      el(".spacer"),
      el(".chip.accent", sess.plan.length > 1 ? `Spill ${sess.idx + 1} av ${sess.plan.length}` : "+" + sess.xp + " XP")));
    const card = el(".card", { style: { padding: "20px 18px" } });
    card.appendChild(g.run(gameDone));
    wrap.appendChild(card);
    return wrap;
  }

  function resultView() {
    const wrap = el(".fade-in.lyn-wrap");
    const st = streak();
    const card = el(".card.pad-lg.center");
    card.appendChild(el("div", { style: { fontSize: "44px" } }, sess.daily ? "🏁" : "⚡"));
    card.appendChild(el(".lyn-xp-big", "+" + (sess.xp + (sess.bonus || 0)) + " XP"));
    if (sess.bonus) card.appendChild(el(".chip.green", { style: { margin: "6px 0" } }, "+" + sess.bonus + " bonus for dagens økt"));
    if (sess.daily) card.appendChild(el("div", { style: { margin: "10px 0", fontWeight: 620 } }, "🔥 Streak: " + st + " dag" + (st === 1 ? "" : "er")));
    const sum = el("div", { style: { margin: "16px 0", textAlign: "left" } });
    sess.summaries.forEach((s) => sum.appendChild(el(".task-row", el("div", "•"), el("div", el(".tt", s)))));
    card.appendChild(sum);
    const lv = levelInfo();
    card.appendChild(el(".tiny.muted", "Nivå: " + lv.name + " · " + lv.xp + " XP totalt"));
    card.appendChild(el(".row", { style: { justifyContent: "center", gap: "10px", marginTop: "18px", flexWrap: "wrap" } },
      el("button.btn.primary", { onclick: () => startSession(dailyPlan(), !dailyDone()) }, "Ny økt"),
      el("button.btn", { onclick: endSession }, "Til Lyn-hjem")));
    wrap.appendChild(card);
    return wrap;
  }

  S.views.lyn = { render, dailyDone, streak };
})(window.EDU);
