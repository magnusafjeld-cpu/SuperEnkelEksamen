/* ===================== VIEWS ===================== */
window.EDU = window.EDU || {};
window.EDU.views = window.EDU.views || {};

/* ---------------- shared ---------------- */
(function (S) {
  const { el, icon } = S.u;
  function pageHead(eyebrow, title, sub, right) {
    const head = el(".page-head"); const top = el(".row"); const left = el("div");
    if (eyebrow) left.appendChild(el(".eyebrow", eyebrow));
    left.appendChild(el("h1", title));
    if (sub) left.appendChild(el("p.sub", sub));
    top.appendChild(left);
    if (right) { top.appendChild(el(".spacer")); top.appendChild(right); }
    head.appendChild(top); return head;
  }
  function sectionTitle(text, seeAll) { const t = el(".section-title", el("h3", text)); if (seeAll) t.appendChild(el(".see-all", { onclick: seeAll.fn }, seeAll.label + " →")); return t; }
  function stat(value, label, kicker) { const s = el(".stat", el(".v", String(value)), el(".l", label)); if (kicker) s.appendChild(el(".k.up", kicker)); return s; }
  function phaseColor(phase) { return (S.data.plan.phaseColors && S.data.plan.phaseColors[phase]) || "slate"; }
  /* Fag med plan.mode "modules" har ingen datoer — da heter en økt «modul», ikke «dag»,
     og verken ukedag eller dato skal vises. */
  const byModule = () => S.data.planMode() === "modules";
  function unitName(cap) { const w = byModule() ? "modul" : "dag"; return cap ? w[0].toUpperCase() + w.slice(1) : w; }
  function dayStamp(d) {
    if (byModule() || !d || !d.date) return "";
    return ` · ${d.weekday || ""} ${S.u.formatDate(d.date)}`.replace(/\s+/g, " ");
  }
  function copy(key, fallback) { return (((window.EDU_SUBJECT || {}).copy) || {})[key] || fallback; }
  function chapterMeta(ch) {
    const c = ch.counts; const bits = [];
    if (c.sections) bits.push(`${c.sections} seksjoner`);
    if (c.formulas) bits.push(`${c.formulas} formler`);
    if (c.figures) bits.push(`${c.figures} figur${c.figures > 1 ? "er" : ""}`);
    bits.push(`~${Math.max(4, Math.round(c.words / 180))} min`);
    return bits.join(" · ");
  }
  function go(route) { return () => S.router.navigate(route); }
  function understandingPicker(num) {
    const st = S.store.get().chapters[num] || {}; const wrap = el(".u-picker");
    const mk = (val, label) => el("button" + (st.understanding === val ? ".on." + (val === "understood" ? "understood" : "unsure") : ""), { onclick: (e) => { e.stopPropagation(); S.store.setUnderstanding(num, val); S.app.refresh(); } }, label);
    wrap.appendChild(mk("understood", "Forstått")); wrap.appendChild(mk("unsure", "Usikker")); return wrap;
  }
  function readCheck(num, onToggle) {
    const st = S.store.get().chapters[num] || {};
    const c = el(".check" + (st.read ? ".done" : ""), { title: st.read ? "Lest" : "Marker som lest", onclick: (e) => { e.stopPropagation(); S.store.setChapterRead(num, !st.read); if (onToggle) onToggle(); } });
    c.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17 19 7"/></svg>`;
    return c;
  }
  function empty(emoji, title, sub, action) { const e = el(".empty", el(".ei", emoji), el("h3", title), el("p.muted", sub)); if (action) e.appendChild(el("div", { style: { marginTop: "18px" } }, action)); return e; }
  S.views.shared = { pageHead, sectionTitle, stat, phaseColor, chapterMeta, go, understandingPicker, readCheck, empty, unitName, dayStamp, byModule, copy };
})(window.EDU);

/* ---------------- dashboard ---------------- */
(function (S) {
  const { el, icon, ring, bar, formatDate } = S.u; const sh = () => S.views.shared;
  function render() {
    const wrap = el(".fade-in");
    const day = S.data.day(S.data.activeDayIndex());
    const until = S.data.daysUntilStart(); const readiness = S.metrics.readiness();
    const r = S.metrics.readPct(), d = S.metrics.daysPct(), srs = S.srs.stats(), q = S.metrics.quizStats();
    wrap.appendChild(hero(day, until, readiness));
    wrap.appendChild(statRow(r, d, srs, q));
    const cols = el(".grid.cols-2", { style: { marginTop: "22px", alignItems: "start" } });
    cols.appendChild(todayCard(day)); cols.appendChild(sideColumn(day));
    wrap.appendChild(cols); return wrap;
  }
  function hero(day, until, readiness) {
    const h = el(".hero"); const left = el("div", { style: { position: "relative", zIndex: 1, flex: "1 1 320px" } });
    const greeting = until > 0
      ? `Studiestart om ${until} dag${until > 1 ? "er" : ""}`
      : `${sh().unitName(true)} ${day.day} av ${S.data.plan.totalDays}${sh().dayStamp(day)}`;
    left.appendChild(el(".eyebrow", greeting.toUpperCase()));
    left.appendChild(el("h2", day.title));
    left.appendChild(el("p", until > 0 ? `Planen starter ${formatDate(S.data.plan.startDate, { year: true })}. Bruk gjerne dag 1 som forhåndstitt allerede nå.` : day.tip));
    left.appendChild(el(".hero-cta", S.hasModule("/plan") && el("a.btn.primary", { href: `#/day/${day.day}` }, sh().byModule() ? "Start denne modulen →" : "Start dagens økt →"), S.hasModule("/lyn") && el("a.btn.ghost", { href: "#/lyn" }, (S.views.lyn && S.views.lyn.dailyDone()) ? "⚡ Lynøkt fullført" : "⚡ Lynøkt (4 min)"), S.hasModule("/quiz") && el("a.btn.ghost", { href: "#/quiz" }, "Ta en quiz")));
    const right = el("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" } });
    const rg = ring(readiness, 132, `${readiness}%`, "klar", "#ffffff"); rg.querySelector(".ring-bg").style.stroke = "rgba(255,255,255,.22)";
    right.appendChild(rg); right.appendChild(el(".tiny", { style: { color: "rgba(255,255,255,.8)" } }, "Eksamensberedskap"));
    h.appendChild(el(".row.wrap", { style: { alignItems: "center", gap: "30px" } }, left, right)); return h;
  }
  function statRow(r, d, srs, q) {
    const grid = el(".grid.cols-4", { style: { marginTop: "20px" } });
    const tile = (node) => el(".card", { style: { padding: "18px 20px" } }, node);
    grid.appendChild(tile(withBar(sh().stat(`${r.read}/${r.total}`, "Kapitler lest"), r.pct)));
    grid.appendChild(tile(withBar(sh().stat(`${d.done}/${d.total}`, sh().unitName(true) + "er fullført"), d.pct, true)));
    grid.appendChild(tile(sh().stat(srs.mastered, `Kort mestret · ${srs.due} forfaller`)));
    grid.appendChild(tile(sh().stat(q.accuracy != null ? q.accuracy + "%" : "—", `Quiz · ${q.answered} svart`)));
    return grid;
  }
  function withBar(statNode, pct, green) { const w = el("div", statNode); w.appendChild(el("div", { style: { marginTop: "12px" } }, bar(pct, { thin: true, green }))); return w; }
  function todayCard(day) {
    const card = el(".card.pad-lg");
    card.appendChild(el(".row", el("h3", { style: { fontSize: "18px" } }, sh().byModule() ? "Denne modulen" : "Dagens plan"), el(".spacer"), el(".chip." + sh().phaseColor(day.phase), el(".dot"), day.phase)));
    card.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "10px 0 16px" } }, el(".chip", icon("clock"), `~${day.estMinutes} min`), ...day.chapters.map((n) => { const c = S.data.chapter(n); return el(".chip", { onclick: sh().go(`#/chapter/${n}`), style: { cursor: "pointer" } }, `K${n} · ${(c ? c.title : "").slice(0, 26)}`); })));
    card.appendChild(el(".nav-section", { style: { paddingLeft: "0" } }, sh().byModule() ? "Mål for modulen" : "Dagens mål"));
    const st = S.store.get(); const dayDone = st.days[day.day] && st.days[day.day].completed;
    day.goals.forEach((g) => card.appendChild(el(".task-row" + (dayDone ? ".done" : ""), el("div", { style: { color: "var(--accent)", marginTop: "2px" }, html: icon("target") }), el("div", el(".tt", g)))));
    card.appendChild(el(".nav-section", { style: { paddingLeft: "0" } }, sh().byModule() ? "Viktigste konsepter" : "Dagens viktigste konsepter"));
    card.appendChild(el(".row.wrap", { style: { gap: "8px" } }, ...day.keyConcepts.map((c) => el(".concept-pill", { onclick: S.hasModule("/search") ? () => S.router.navigate(`#/search?q=${encodeURIComponent(c)}`) : null }, c))));
    card.appendChild(el(".row", { style: { marginTop: "20px" } }, el("a.btn.primary", { href: `#/day/${day.day}` }, sh().byModule() ? "Åpne modulen" : "Åpne dagen"), el("button.btn" + (dayDone ? ".green" : ""), { onclick: () => { S.store.setDayComplete(day.day, !dayDone); S.u.toast(dayDone ? (sh().unitName(true) + " gjenåpnet") : (sh().unitName(true) + " fullført! 🎉")); S.app.refresh(); } }, dayDone ? "✓ Fullført" : `Marker ${sh().unitName()}en som fullført`)));
    return card;
  }
  function sideColumn(day) {
    const col = el(".stack", { style: { gap: "18px" } });
    const repCard = el(".card");
    repCard.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Repetisjon i dag"), el(".spacer"), S.hasModule("/review") && el(".see-all", { onclick: sh().go("#/review") }, "Alle →")));
    S.repetition.suggest(3).forEach((s) => repCard.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${s.num}`) }, el(".priority-tag." + s.priority, { style: { marginTop: "1px" } }, s.priority === "high" ? "Høy" : s.priority === "med" ? "Med" : "Lav"), el("div", el(".tt", `K${s.num} · ${s.chapter.title}`), el(".td", s.reasons[0] || "Repetisjon")))));
    col.appendChild(repCard);
    const ms = S.metrics.nextMilestone();
    col.appendChild(el(".card", el(".row", el("div", { style: { width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-soft)", display: "grid", placeItems: "center", color: "var(--accent-ink)" }, html: icon("flag") }), el("div", el(".tiny.muted", "Neste milepæl"), el("div", { style: { fontWeight: 620, marginTop: "2px" } }, ms.label), el(".tiny.muted", { style: { marginTop: "2px" } }, `${sh().unitName(true)} ${ms.day}${sh().dayStamp(ms)}`)))));
    const upCard = el(".card"); upCard.appendChild(el("h3", { style: { fontSize: "16px", marginBottom: "10px" } }, "Kommende temaer"));
    const nextDays = S.data.days().filter((dd) => dd.day > day.day).slice(0, 3);
    if (!nextDays.length) upCard.appendChild(el(".tiny.muted", `Du er på siste ${sh().unitName()} — tid for mock-eksamen!`));
    nextDays.forEach((dd) => upCard.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/day/${dd.day}`) }, el(".day-num", { style: { width: "38px", height: "38px", borderRadius: "10px" } }, el(".n", { style: { fontSize: "15px" } }, dd.day)), el("div", el(".tt", dd.title), el(".td", dd.phase)))));
    col.appendChild(upCard); return col;
  }
  S.views.dashboard = { render };
})(window.EDU);

/* ---------------- plan overview + day ---------------- */
(function (S) {
  const { el, icon, formatDate, bar } = S.u; const sh = () => S.views.shared;
  function renderOverview() {
    const wrap = el(".fade-in"); const active = S.data.activeDayIndex();
    const total = S.data.plan.totalDays;
    wrap.appendChild(sh().pageHead(
      sh().copy("planEyebrow", sh().byModule() ? `Studieplan · ${total} moduler` : "3-ukers studieplan"),
      sh().byModule() ? "Hele løpet, modul for modul" : "Hele løpet, dag for dag",
      sh().copy("planIntro", "Uke 1–2: pensum (rammeverk → måling → vekst → kort sikt → repetisjon). Uke 3: ren oppgavetrening med tidligere eksamener og fasit, sortert fra tema-fokus til hele sett på tid og generalprøve.")));
    const phases = [...new Set(S.data.days().map((d) => d.phase))];
    wrap.appendChild(el(".row.wrap", { style: { gap: "8px", marginBottom: "18px" } }, ...phases.map((p) => el(".chip." + sh().phaseColor(p), el(".dot"), p))));
    const list = el(".grid", { style: { gap: "12px" } });
    S.data.days().forEach((d) => {
      const st = S.store.get().days[d.day] || {};
      const card = el(".card.day-card" + (st.completed ? ".is-done" : (d.day === active ? ".is-today" : "")), { onclick: sh().go(`#/day/${d.day}`) });
      card.appendChild(el(".phase-band", { style: { background: `var(--phase-${sh().phaseColor(d.phase)})` } }));
      card.appendChild(el(".day-num", el(".n", st.completed ? "✓" : d.day), el(".d", sh().byModule() ? "" : (d.weekday || "").slice(0, 3))));
      const mid = el("div", { style: { flex: "1" } }, el(".dtitle", d.title), el(".dmeta", el(".chip." + sh().phaseColor(d.phase), { style: { fontSize: "11px" } }, d.phase), el("span", `~${d.estMinutes} min`), el("span", "·"), el("span", d.chapters.length ? d.chapters.map((n) => "K" + n).join(", ") : ((d.problems && d.problems.length) ? d.problems.length + " oppgavesett" : "Oppgavetrening")), (d.pastExam || (d.problems && d.problems.length)) ? el(".chip.amber", { style: { fontSize: "11px" } }, "Oppgaver") : null));
      card.appendChild(mid);
      card.appendChild(el("div", { style: { color: "var(--ink-4)" }, html: icon("arrow") }));
      list.appendChild(card);
    });
    wrap.appendChild(list); return wrap;
  }
  function renderDay(n) {
    n = parseInt(n, 10); const d = S.data.day(n);
    if (!d) return sh().empty("🤔", "Fant ikke dagen", "Velg en dag fra planen.");
    const wrap = el(".fade-in"); const st = S.store.get().days[n] || {};
    const total = S.data.plan.totalDays;
    const right = el(".row", { style: { gap: "8px" } }, n > 1 ? el("a.btn.ghost.sm", { href: `#/day/${n - 1}` }, "← Forrige") : null, n < total ? el("a.btn.ghost.sm", { href: `#/day/${n + 1}` }, "Neste →") : null);
    wrap.appendChild(sh().pageHead(`${sh().unitName(true)} ${n} av ${total}${sh().dayStamp(d)}`, d.title, null, right));
    wrap.appendChild(el(".row.wrap", { style: { gap: "8px", marginBottom: "20px" } }, el(".chip." + sh().phaseColor(d.phase), el(".dot"), d.phase), el(".chip", icon("clock"), `Estimert studietid: ~${d.estMinutes} min`), d.examFocus ? el(".chip.indigo", "Fokus: " + d.examFocus) : null, el(".chip.green", "🏁 " + d.milestone)));
    const cols = el(".grid.cols-2", { style: { alignItems: "start" } });
    const left = el(".stack", { style: { gap: "18px" } });
    const goalCard = el(".card.pad-lg"); goalCard.appendChild(el("h3", { style: { fontSize: "17px", marginBottom: "4px" } }, sh().byModule() ? "Mål for modulen" : "Dagens mål"));
    d.goals.forEach((g) => goalCard.appendChild(el(".task-row", el("div", { style: { color: "var(--accent)", marginTop: "2px" }, html: icon("target") }), el("div", el(".tt", g)))));
    left.appendChild(goalCard);
    if (d.chapters && d.chapters.length) {
      const studyCard = el(".card"); studyCard.appendChild(el("h3", { style: { fontSize: "16px", marginBottom: "12px" } }, "Les og forstå"));
      d.chapters.forEach((num) => { const c = S.data.chapter(num); const cst = S.store.get().chapters[num] || {}; studyCard.appendChild(el(".chap-row", { onclick: sh().go(`#/chapter/${num}`) }, el(".cnum" + (cst.read ? ".read" : ""), cst.read ? "✓" : num), el("div", el(".ctitle", c ? c.title : "K" + num), el(".cmeta", c ? sh().chapterMeta(c) : "")), el("div", { html: icon("arrow"), style: { color: "var(--ink-4)" } }))); });
      left.appendChild(studyCard);
    }
    if (d.problems && d.problems.length && S.hasModule("/oppgaver")) {
      const pc = el(".card"); pc.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Oppgaver i dag"), el(".spacer"), el(".see-all", { onclick: sh().go("#/oppgaver") }, "Oppgavebank →")));
      d.problems.forEach((pid) => { const p = S.data.problemById(pid); const title = p ? p.title : pid; pc.appendChild(el(".chap-row", { onclick: sh().go(`#/oppgaver?doc=${pid}`) }, el(".cnum", { html: icon("book") }), el("div", el(".ctitle", title), el(".cmeta", p ? (p.type + (p.hasFasit ? " · med fasit" : " · uten fasit")) : "Åpne i oppgavebanken")), el("div", { html: icon("arrow"), style: { color: "var(--ink-4)" } }))); });
      left.appendChild(pc);
    }
    cols.appendChild(left);
    const col = el(".stack", { style: { gap: "18px" } });
    col.appendChild(el(".card", el(".row", el("div", { style: { fontSize: "20px" } }, "💡"), el("h3", { style: { fontSize: "15px" } }, sh().byModule() ? "Tips" : "Dagens tips")), el("p.muted", { style: { margin: "8px 0 0", fontSize: "14.5px", lineHeight: 1.55 } }, d.tip)));
    const kcCard = el(".card"); kcCard.appendChild(el("h3", { style: { fontSize: "15px", marginBottom: "10px" } }, "Viktigste konsepter"));
    kcCard.appendChild(el(".row.wrap", { style: { gap: "8px" } }, ...d.keyConcepts.map((k) => el(".concept-pill", { onclick: S.hasModule("/search") ? () => S.router.navigate(`#/search?q=${encodeURIComponent(k)}`) : null }, k))));
    col.appendChild(kcCard);
    if (d.review && d.review.length) { const rc = el(".card"); rc.appendChild(el("h3", { style: { fontSize: "15px", marginBottom: "10px" } }, "Repeter fra før (spaced)")); d.review.forEach((num) => { const c = S.data.chapter(num); rc.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${num}`) }, el(".chip.slate", "K" + num), el("div", el(".tt", c ? c.title : "K" + num)))); }); col.appendChild(rc); }
    if (d.pastExam) col.appendChild(el(".card", { style: { borderColor: "var(--amber-soft)", background: "var(--amber-soft)" } }, el(".row", el("div", { style: { fontSize: "20px" } }, "📝"), el("h3", { style: { fontSize: "15px", color: "#9a630f" } }, "Eksamenstrening i dag")), el("p", { style: { margin: "8px 0 12px", fontSize: "14.5px" } }, `${d.pastExam.exam} ${d.pastExam.task}: ${d.pastExam.topic}`), el("a.btn.sm", { href: "#/exam" }, "Åpne eksamenstrening →")));
    if (d.pdfs && d.pdfs.length) {
      const pdfCard = el(".card");
      pdfCard.appendChild(el("h3", { style: { fontSize: "15px", marginBottom: "6px" } }, "Sett å åpne lokalt (PDF)"));
      pdfCard.appendChild(el("p.tiny.muted", { style: { marginTop: 0, marginBottom: "8px" } }, "Ligger i prosjektmappen (Eksamenprediksjon / Downloads):"));
      d.pdfs.forEach((f) => pdfCard.appendChild(el(".task-row", el(".chip.amber", "PDF"), el("div", el(".tt", { style: { fontSize: "13.5px" } }, f)))));
      col.appendChild(pdfCard);
    }
    cols.appendChild(col); wrap.appendChild(cols);
    wrap.appendChild(el(".card", { style: { marginTop: "20px", textAlign: "center", background: st.completed ? "var(--green-soft)" : "#fff" } }, el("p", { style: { margin: "0 0 12px", fontWeight: 560 } }, st.completed ? `✓ Du har fullført denne ${sh().unitName()}en — godt jobbet!` : "Ferdig med økta?"), el("button.btn" + (st.completed ? "" : ".primary"), { onclick: () => { S.store.setDayComplete(n, !st.completed); S.u.toast(st.completed ? (sh().unitName(true) + " gjenåpnet") : (sh().unitName(true) + " fullført! 🎉")); S.app.refresh(); } }, st.completed ? "Angre fullføring" : `Marker ${sh().unitName()} ${n} som fullført`)));
    return wrap;
  }
  S.views.planOverview = { render: renderOverview }; S.views.day = { render: renderDay };
})(window.EDU);

/* ---------------- curriculum ---------------- */
(function (S) {
  const { el, bar } = S.u; const sh = () => S.views.shared; let filter = "alle";
  function render() {
    const wrap = el(".fade-in"); const r = S.metrics.readPct(); const u = S.metrics.understoodCount();
    wrap.appendChild(sh().pageHead("Pensumoversikt", "Hele pensum på ett sted", "Marker hvert kapittel som lest, forstått eller usikker. Statusen mater repetisjonsmotoren."));
    const summary = el(".card", { style: { marginBottom: "20px" } });
    summary.appendChild(el(".row.wrap", { style: { gap: "30px" } }, sh().stat(`${r.read}/${r.total}`, "Kapitler lest"), sh().stat(u.understood, "Forstått"), sh().stat(u.unsure, "Usikker"), sh().stat(r.total - r.read, "Gjenstår å lese")));
    summary.appendChild(el("div", { style: { marginTop: "16px" } }, bar(r.pct, { green: true }))); wrap.appendChild(summary);
    const seg = el(".seg", { style: { marginBottom: "20px" } });
    [["alle", "Alle"], ["lest", "Lest"], ["usikker", "Usikker"], ["gjenstaar", "Gjenstår"]].forEach(([k, label]) => seg.appendChild(el("button" + (filter === k ? ".on" : ""), { onclick: () => { filter = k; S.app.refresh(); } }, label)));
    wrap.appendChild(seg);
    let shown = 0;
    S.data.parts().forEach((p) => {
      const chapters = p.chapters.filter(passFilter); if (!chapters.length) return; shown += chapters.length;
      const group = el(".part-group");
      group.appendChild(el(".part-head", el(".ptag", p.tag), el(".pname", p.name), el(".pcount", `${chapters.length} kapittel${chapters.length > 1 ? "er" : ""}`)));
      const card = el(".card", { style: { padding: "6px 0" } }); chapters.forEach((c) => card.appendChild(chapRow(c)));
      group.appendChild(card); wrap.appendChild(group);
    });
    if (!shown) wrap.appendChild(sh().empty("✨", "Ingenting her", "Ingen kapitler matcher filteret.")); return wrap;
  }
  function passFilter(c) { const st = S.store.get().chapters[c.num] || {}; if (filter === "lest") return st.read; if (filter === "usikker") return st.understanding === "unsure"; if (filter === "gjenstaar") return !st.read; return true; }
  function chapRow(c) {
    const st = S.store.get().chapters[c.num] || {}; const row = el(".chap-row" + (st.read ? ".read" : ""));
    row.appendChild(el(".cnum", { onclick: sh().go(`#/chapter/${c.num}`), style: { cursor: "pointer" } }, st.read ? "✓" : c.num));
    row.appendChild(el("div", { onclick: sh().go(`#/chapter/${c.num}`), style: { cursor: "pointer" } }, el(".ctitle", c.title), el(".cmeta", sh().chapterMeta(c))));
    row.appendChild(el(".status-dots", el(".sdot" + (st.read ? ".read" : ""), { title: "Lest" }), el(".sdot" + (st.understanding === "understood" ? ".understood" : (st.understanding === "unsure" ? ".unsure" : "")), { title: "Forståelse" })));
    row.appendChild(el(".row", { style: { gap: "8px" } }, sh().readCheck(c.num, () => S.app.refresh()), sh().understandingPicker(c.num)));
    return row;
  }
  S.views.curriculum = { render };
})(window.EDU);

/* ---------------- chapter article ---------------- */
(function (S) {
  const { el, frag, icon } = S.u; const sh = () => S.views.shared;
  function render(num) {
    num = parseInt(num, 10); const c = S.data.chapter(num);
    if (!c) return sh().empty("📭", "Fant ikke kapitlet", "Velg et tema fra pensumoversikten.");
    S.store.touchChapter(num);
    const wrap = el(".fade-in");
    const right = el(".row", { style: { gap: "8px" } }, sh().readCheck(num, () => S.app.refresh()), sh().understandingPicker(num));
    wrap.appendChild(sh().pageHead(`${c.partTag} · Kapittel ${num}`, c.title, null, right));
    wrap.appendChild(el(".row.wrap", { style: { gap: "8px", marginBottom: "18px" } }, el(".chip." + sh().phaseColor(phaseForChapter(num)), c.partName), el(".chip", sh().chapterMeta(c)), el(".chip", { onclick: sh().go("#/flashcards"), style: { cursor: "pointer" } }, "🎴 Øv på formler"), el(".chip", { onclick: sh().go("#/quiz"), style: { cursor: "pointer" } }, "❓ Quiz dette temaet")));
    const layout = el(".article-wrap"); const article = el("div"); const prose = el(".prose");
    prose.appendChild(frag(c.html));
    const heads = [...prose.querySelectorAll("h3")]; heads.forEach((h, i) => { h.id = `s-${num}-${i}`; });
    article.appendChild(prose);
    article.appendChild(activeLearning(num, c));
    article.appendChild(recap(c));
    article.appendChild(prevNext(num));
    layout.appendChild(article);
    const toc = el(".article-toc");
    if (heads.length) {
      toc.appendChild(el(".tlabel", "På denne siden"));
      heads.forEach((h) => { const link = el("a", { href: "#", onclick: (e) => { e.preventDefault(); h.scrollIntoView({ behavior: "smooth", block: "start" }); } }, h.textContent); link.dataset.target = h.id; toc.appendChild(link); });
      setupScrollSpy(toc, heads);
    }
    layout.appendChild(toc); wrap.appendChild(layout); return wrap;
  }
  function phaseForChapter(num) { const day = S.data.days().find((d) => d.chapters.includes(num)); return day ? day.phase : "Grunnlag"; }
  function activeLearning(num, c) {
    const prompts = S.data.activeFor(num); const mcqs = S.data.quizzesForChapter(num);
    const sec = el("div", { style: { marginTop: "36px" } });
    if (!prompts.length && !mcqs.length) return sec;
    sec.appendChild(el(".section-title", el("h3", "Aktiv læring"), el(".spacer"), el(".chip.accent", "Test deg selv")));
    sec.appendChild(el("p.muted", { style: { marginTop: "-6px", marginBottom: "16px", fontSize: "14.5px" } }, "Ikke bare les — gjenhent. Svar i hodet eller på papir før du sjekker."));
    const typeLabel = { control: "Kontrollspørsmål", reflect: "Refleksjon", explain: "Forklar med egne ord", calc: "Regneoppgave" };
    const typeColor = { control: "accent", reflect: "indigo", explain: "teal", calc: "green" };
    prompts.forEach((p) => {
      const card = el(".card", { style: { marginBottom: "12px" } });
      card.appendChild(el(".row", el(".chip." + (typeColor[p.type] || "slate"), typeLabel[p.type] || "Oppgave")));
      card.appendChild(el("p", { style: { fontWeight: 540, fontSize: "16px", margin: "10px 0 6px" } }, p.q));
      const ans = p.solution || p.hint;
      if (ans) {
        const sol = el(".explain", { style: { display: "none", marginTop: "10px" } });
        sol.appendChild(frag("<b>Løsningsforslag: </b>" + S.u.escapeHtml(ans)));
        const btn = el("button.btn.ghost.sm", { onclick: () => { const show = sol.style.display === "none"; sol.style.display = show ? "block" : "none"; btn.textContent = show ? "Skjul løsningsforslag" : "Vis løsningsforslag"; } }, "Vis løsningsforslag");
        card.appendChild(el("div", btn)); card.appendChild(sol);
      }
      sec.appendChild(card);
    });
    mcqs.filter((q) => q.type === "mcq").forEach((q) => sec.appendChild(mcqBlock(q)));
    return sec;
  }
  function mcqBlock(q) {
    const card = el(".card", { style: { marginBottom: "12px" } });
    card.appendChild(el(".row", el(".chip.amber", "Flervalg")));
    card.appendChild(el("p", { style: { fontWeight: 560, fontSize: "16px", margin: "10px 0 14px" } }, q.q));
    let answered = false; const opts = []; const explain = el(".explain", { style: { display: "none" } });
    q.options.forEach((o, i) => {
      const btn = el("button.opt", el(".key", String.fromCharCode(65 + i)), el("span", o));
      btn.addEventListener("click", () => { if (answered) return; answered = true; opts.forEach((b, j) => { if (j === q.answer) b.classList.add("correct"); else if (j === i) b.classList.add("wrong"); else b.classList.add("dim"); b.disabled = true; }); explain.innerHTML = `<b>${i === q.answer ? "Riktig! " : "Ikke helt. "}</b>${S.u.escapeHtml(q.explanation)}`; explain.style.display = "block"; S.store.recordAnswer(q.id, i === q.answer); });
      opts.push(btn); card.appendChild(btn);
    });
    card.appendChild(explain); return card;
  }
  function recap(c) {
    if (!c.formulas.length && !c.tips.length) return el("div");
    const sec = el("div", { style: { marginTop: "30px" } }); sec.appendChild(el(".section-title", el("h3", "Hurtigoppsummering")));
    const grid = el(".grid.cols-2", { style: { alignItems: "start" } });
    if (c.formulas.length) { const fcard = el(".card"); fcard.appendChild(el("h4", { style: { marginBottom: "10px", color: "var(--accent-ink)" } }, "Nøkkelformler")); c.formulas.slice(0, 6).forEach((f) => { if (f.eq && f.eq.length) fcard.appendChild(el("div", { style: { padding: "6px 0", borderBottom: "1px solid var(--hairline)", fontFamily: "var(--font-serif)", fontSize: "15px" }, html: f.eq[0] })); }); grid.appendChild(fcard); }
    if (c.tips.length || c.mistakes.length) { const tcard = el(".card"); if (c.tips[0]) { tcard.appendChild(el("h4", { style: { marginBottom: "6px", color: "#1d7a47" } }, "📘 Eksamenstips")); tcard.appendChild(el("p.muted", { style: { fontSize: "14px", marginTop: 0 } }, c.tips[0].text.slice(0, 240) + (c.tips[0].text.length > 240 ? "…" : ""))); } if (c.mistakes[0]) { tcard.appendChild(el("h4", { style: { marginBottom: "6px", color: "#9a630f", marginTop: "14px" } }, "⚠️ Vanlig feil")); tcard.appendChild(el("p.muted", { style: { fontSize: "14px", marginTop: 0 } }, c.mistakes[0].text.slice(0, 240) + (c.mistakes[0].text.length > 240 ? "…" : ""))); } grid.appendChild(tcard); }
    sec.appendChild(grid); return sec;
  }
  function prevNext(num) {
    const prev = S.data.chapter(num - 1), next = S.data.chapter(num + 1); const st = S.store.get().chapters[num] || {};
    const box = el(".card", { style: { marginTop: "30px", textAlign: "center" } });
    box.appendChild(el("button.btn" + (st.read ? ".green" : ".primary"), { style: { marginBottom: "16px" }, onclick: () => { S.store.setChapterRead(num, !st.read); S.u.toast(st.read ? "Markert som ulest" : "Markert som lest ✓"); S.app.refresh(); } }, st.read ? "✓ Lest — klikk for å angre" : "Marker kapittel som lest"));
    box.appendChild(el(".row", { style: { justifyContent: "space-between" } }, prev ? el("a.btn.ghost", { href: `#/chapter/${num - 1}` }, "← " + prev.title.slice(0, 24)) : el("span"), next ? el("a.btn.ghost", { href: `#/chapter/${num + 1}` }, next.title.slice(0, 24) + " →") : el("span")));
    return box;
  }
  function setupScrollSpy(toc, heads) {
    const links = [...toc.querySelectorAll("a")];
    const obs = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.dataset.target === en.target.id)); }), { rootMargin: "-10% 0px -75% 0px" });
    heads.forEach((h) => obs.observe(h));
  }
  S.views.chapter = { render };
})(window.EDU);

/* ---------------- quiz ---------------- */
(function (S) {
  const { el, ring } = S.u; const sh = () => S.views.shared; let session = null;
  function render() { if (session && !session.done) return runScreen(); if (session && session.done) return resultScreen(); return setupScreen(); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function pool(mode) {
    const all = S.data.raw.quizzes;
    if (mode === "1" || mode === "2" || mode === "3") return all.filter((q) => q.oppg === parseInt(mode, 10));
    if (mode === "svak") { const weakCh = S.repetition.suggest(8).filter((s) => s.score >= 28).map((s) => s.num); const subset = all.filter((q) => weakCh.includes(q.ch)); return subset.length >= 4 ? subset : all; }
    return all;
  }
  function start(mode, len) { let qs = shuffle(pool(mode)); if (len !== "all") qs = qs.slice(0, parseInt(len, 10)); session = { mode, questions: qs, idx: 0, results: [], done: false }; S.app.refresh(); }
  function setupScreen() {
    const wrap = el(".fade-in");
    wrap.appendChild(sh().pageHead("Quiz", "Test deg på tvers av pensum", "Spørsmål trekkes fra hele pensum og blander gamle og nye temaer. Du får forklaring på hvert svar."));
    const last = S.store.get().quiz.sessions[0];
    if (last) wrap.appendChild(el(".card", { style: { marginBottom: "18px", background: "var(--accent-soft)", borderColor: "var(--accent-soft-2)" } }, el(".row", el("div", { style: { fontSize: "22px" } }, "📊"), el("div", el("div", { style: { fontWeight: 600 } }, `Forrige quiz: ${last.score}/${last.total} riktige`), el(".tiny.muted", `${Math.round((last.score / last.total) * 100)}% · ${last.mode}`)))));
    const card = el(".card.pad-lg"); card.appendChild(el("h3", { style: { marginBottom: "4px" } }, "Velg modus"));
    card.appendChild(el("p.muted", { style: { marginTop: 0, fontSize: "14.5px" } }, "Blandet anbefales for eksamenstrening."));
    let mode = "mix", len = "10";
    const modeSeg = el(".seg", { style: { flexWrap: "wrap", marginTop: "12px" } });
    [["mix", "Blandet"], ["1", "Oppgave 1"], ["2", "Oppgave 2"], ["3", "Oppgave 3"], ["svak", "Svake temaer"]].forEach(([k, l]) => modeSeg.appendChild(el("button" + (mode === k ? ".on" : ""), { onclick: (e) => { mode = k; [...modeSeg.children].forEach((c) => c.classList.remove("on")); e.target.classList.add("on"); } }, l)));
    card.appendChild(el("div", { style: { marginTop: "8px" } }, modeSeg));
    card.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Antall spørsmål"));
    const lenSeg = el(".seg");
    [["5", "5"], ["10", "10"], ["all", "Alle"]].forEach(([k, l]) => lenSeg.appendChild(el("button" + (len === k ? ".on" : ""), { onclick: (e) => { len = k; [...lenSeg.children].forEach((c) => c.classList.remove("on")); e.target.classList.add("on"); } }, l)));
    card.appendChild(lenSeg);
    card.appendChild(el("div", { style: { marginTop: "22px" } }, el("button.btn.primary.lg", { onclick: () => start(mode, len) }, "Start quiz →")));
    wrap.appendChild(card); return wrap;
  }
  function runScreen() {
    const wrap = el(".fade-in"); const q = session.questions[session.idx]; const card = el(".card.pad-lg.quiz-card");
    const prog = el(".q-progress"); session.questions.forEach((_, i) => prog.appendChild(el("span" + (i < session.idx ? ".done" : i === session.idx ? ".cur" : "")))); card.appendChild(prog);
    card.appendChild(el(".row", el(".tiny.muted", `Spørsmål ${session.idx + 1} av ${session.questions.length}`), el(".spacer"), el(".chip.slate", "K" + q.ch + (q.oppg ? " · Oppgave " + q.oppg : ""))));
    card.appendChild(el(".q-stem", q.q));
    card.appendChild(q.type === "mcq" ? mcqBody(q) : shortBody(q));
    wrap.appendChild(card); return wrap;
  }
  function next(correct, q) {
    session.results.push({ q, correct }); session.idx++;
    if (session.idx >= session.questions.length) { session.done = true; const score = session.results.filter((r) => r.correct).length; S.store.recordQuizSession({ score, total: session.results.length, mode: labelMode(session.mode) }); }
    S.app.refresh();
  }
  function mcqBody(q) {
    const box = el("div"); const opts = []; const explain = el(".explain", { style: { display: "none" } });
    const nextBtn = el("button.btn.primary", { style: { display: "none", marginTop: "16px" } }, session.idx + 1 >= session.questions.length ? "Se resultat →" : "Neste →");
    let answered = false;
    q.options.forEach((o, i) => {
      const btn = el("button.opt", el(".key", String.fromCharCode(65 + i)), el("span", o));
      btn.addEventListener("click", () => { if (answered) return; answered = true; const correct = i === q.answer; opts.forEach((b, j) => { if (j === q.answer) b.classList.add("correct"); else if (j === i) b.classList.add("wrong"); else b.classList.add("dim"); b.disabled = true; }); explain.innerHTML = `<b>${correct ? "Riktig! " : "Feil. "}</b>${S.u.escapeHtml(q.explanation)}`; explain.style.display = "block"; nextBtn.style.display = "inline-flex"; S.store.recordAnswer(q.id, correct); nextBtn.onclick = () => next(correct, q); });
      opts.push(btn); box.appendChild(btn);
    });
    box.appendChild(explain); box.appendChild(nextBtn); return box;
  }
  function shortBody(q) {
    const box = el("div");
    box.appendChild(el("textarea", { placeholder: "Skriv svaret ditt her (selvretting)…", rows: 4, style: { width: "100%", borderRadius: "14px", border: "1.5px solid var(--hairline-strong)", padding: "14px", fontSize: "15px", resize: "vertical" } }));
    const model = el(".explain", { style: { display: "none" } });
    model.innerHTML = "<b>Modellsvar — sentrale poeng:</b><ul style='margin:8px 0 0;padding-left:18px'>" + q.model.map((m) => `<li>${S.u.escapeHtml(m)}</li>`).join("") + "</ul>";
    const rate = el(".fc-rate", { style: { display: "none", marginTop: "14px" } });
    const revealBtn = el("button.btn", { onclick: () => { model.style.display = "block"; rate.style.display = "flex"; revealBtn.style.display = "none"; }, style: { marginTop: "14px" } }, "Vis modellsvar");
    const mk = (cls, label, correct) => el("button." + cls, { onclick: () => { S.store.recordAnswer(q.id, correct); next(correct, q); } }, label);
    rate.appendChild(mk("again", "Bommet", false)); rate.appendChild(mk("good", "Traff poengene", true));
    box.appendChild(revealBtn); box.appendChild(model); box.appendChild(rate); return box;
  }
  function resultScreen() {
    const wrap = el(".fade-in"); const score = session.results.filter((r) => r.correct).length; const total = session.results.length; const pct = Math.round((score / total) * 100);
    wrap.appendChild(sh().pageHead("Quiz fullført", pct >= 80 ? "Sterkt jobbet! 🎉" : pct >= 50 ? "God innsats 👍" : "Verdt en repetisjon 💪"));
    const card = el(".card.pad-lg");
    card.appendChild(el(".score-ring-wrap", ring(pct, 150, `${score}/${total}`, "riktige"), el(".muted", `${pct}% treffsikkerhet · modus: ${labelMode(session.mode)}`)));
    const wrong = session.results.filter((r) => !r.correct);
    if (wrong.length) { const chs = [...new Set(wrong.map((r) => r.q.ch))]; card.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Anbefalt repetisjon")); const rl = el("div"); chs.forEach((ch) => { const c = S.data.chapter(ch); if (c) rl.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${ch}`) }, el(".chip.amber", "K" + ch), el("div", el(".tt", c.title)))); }); card.appendChild(rl); }
    card.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Gjennomgang"));
    session.results.forEach((r) => card.appendChild(el(".task-row", el("div", { style: { color: r.correct ? "var(--green)" : "var(--rose)", fontWeight: 700, marginTop: "1px" } }, r.correct ? "✓" : "✕"), el("div", el(".tt", r.q.q), el(".td", r.q.explanation || (r.q.model && r.q.model[0]) || "")))));
    card.appendChild(el(".row", { style: { marginTop: "20px", gap: "10px" } }, el("button.btn.primary", { onclick: () => { session = null; S.app.refresh(); } }, "Ny quiz"), el("a.btn", { href: "#/" }, "Til dashboard")));
    wrap.appendChild(card); return wrap;
  }
  function labelMode(m) { return ({ mix: "Blandet", "1": "Oppgave 1", "2": "Oppgave 2", "3": "Oppgave 3", svak: "Svake temaer" })[m] || m; }
  S.views.quiz = { render };
})(window.EDU);

/* ---------------- flashcards ---------------- */
(function (S) {
  const { el, frag, ring } = S.u; const sh = () => S.views.shared; let fc = null; let deckFilter = "alle";
  function render() { if (fc && fc.idx < fc.queue.length) return cardScreen(); if (fc && fc.idx >= fc.queue.length) return doneScreen(); return setupScreen(); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function startDue() { const due = shuffle(S.srs.dueCards(deckFilter)); if (!due.length) { S.u.toast("Ingen kort forfaller — øv alle i stedet"); return startAll(); } fc = { queue: due, idx: 0, flipped: false, reviewed: 0 }; S.app.refresh(); }
  function startAll() { const all = shuffle(S.srs.deck().filter((c) => deckFilter === "alle" || c.deck === deckFilter)); fc = { queue: all, idx: 0, flipped: false, reviewed: 0 }; S.app.refresh(); }
  function setupScreen() {
    const wrap = el(".fade-in"); const stats = S.srs.stats();
    wrap.appendChild(sh().pageHead("Flashcards", "Definisjoner, formler og økonomisk intuisjon", "Spaced repetition: kort du synes er vanskelige kommer oftere tilbake, kort du mestrer kommer sjeldnere."));
    const grid = el(".grid.cols-4", { style: { marginBottom: "20px" } });
    grid.appendChild(el(".card", sh().stat(stats.total, "Kort totalt"))); grid.appendChild(el(".card", sh().stat(stats.due, "Forfaller nå"))); grid.appendChild(el(".card", sh().stat(stats.mastered, "Mestret"))); grid.appendChild(el(".card", sh().stat(stats.fresh, "Ikke startet")));
    wrap.appendChild(grid);
    const card = el(".card.pad-lg"); card.appendChild(el("h3", { style: { marginBottom: "12px" } }, "Velg kortstokk"));
    const seg = el(".seg", { style: { flexWrap: "wrap" } });
    [["alle", "Alle"], ["formel", "Formler"], ["begrep", "Begreper"], ["mekanisme", "Mekanismer"], ["intuisjon", "Intuisjon"]].forEach(([k, l]) => seg.appendChild(el("button" + (deckFilter === k ? ".on" : ""), { onclick: (e) => { deckFilter = k; [...seg.children].forEach((c) => c.classList.remove("on")); e.target.classList.add("on"); } }, l)));
    card.appendChild(seg);
    card.appendChild(el(".row", { style: { marginTop: "22px", gap: "10px" } }, el("button.btn.primary.lg", { onclick: startDue }, `Repeter forfalte (${S.srs.dueCards(deckFilter).length})`), el("button.btn.lg", { onclick: startAll }, "Øv alle")));
    wrap.appendChild(card); return wrap;
  }
  function cardScreen() {
    const wrap = el(".fade-in"); const c = fc.queue[fc.idx];
    wrap.appendChild(el(".row", { style: { maxWidth: "600px", margin: "0 auto 16px" } }, el(".tiny.muted", `Kort ${fc.idx + 1} av ${fc.queue.length}`), el(".spacer"), el(".chip.slate", c.kind === "formel" ? (c.topic || "Formel") : (c.ch ? "Kapittel " + c.ch : c.deck))));
    const stage = el(".fc-stage");
    const flip = el(".flashcard" + (fc.flipped ? ".flipped" : ""), { onclick: () => { fc.flipped = !fc.flipped; S.app.refresh(); } });
    const front = el(".fc-face.fc-front", el(".fc-kicker", deckLabel(c.deck)), el(".fc-text", c.front), el(".fc-hint", "Trykk for å snu"));
    const back = el(".fc-face.fc-back", el(".fc-kicker", "Svar")); const bt = el(".fc-text"); bt.appendChild(frag(c.back)); back.appendChild(bt);
    flip.appendChild(front); flip.appendChild(back); stage.appendChild(flip); wrap.appendChild(stage);
    if (fc.flipped) {
      const rate = el(".fc-rate", { style: { maxWidth: "600px", margin: "22px auto 0" } });
      const mk = (cls, label, grade) => el("button." + cls, { onclick: () => grade_(c, grade) }, label);
      rate.appendChild(mk("again", "På nytt", "again")); rate.appendChild(mk("hard", "Vanskelig", "hard")); rate.appendChild(mk("good", "Bra", "good")); rate.appendChild(mk("easy", "Lett", "easy"));
      wrap.appendChild(rate);
    } else { wrap.appendChild(el(".center", { style: { marginTop: "22px" } }, el("button.btn.primary", { onclick: () => { fc.flipped = true; S.app.refresh(); } }, "Vis svar"))); }
    return wrap;
  }
  function grade_(c, grade) { S.srs.rate(c.id, grade); fc.reviewed++; fc.idx++; fc.flipped = false; S.app.refresh(); }
  function doneScreen() {
    const wrap = el(".fade-in"); wrap.appendChild(sh().pageHead("Økt fullført", "Bra repetert! 🎴")); const stats = S.srs.stats(); const reviewed = fc.reviewed;
    const card = el(".card.pad-lg");
    card.appendChild(el(".score-ring-wrap", ring(stats.masteredPct, 140, reviewed, "kort repetert"), el(".muted", `${stats.mastered} av ${stats.total} kort mestret · ${stats.due} forfaller fortsatt`)));
    card.appendChild(el(".row", { style: { justifyContent: "center", gap: "10px", marginTop: "10px" } }, el("button.btn.primary", { onclick: () => { fc = null; S.app.refresh(); } }, "Tilbake"), S.srs.dueCards(deckFilter).length ? el("button.btn", { onclick: startDue }, "Fortsett med forfalte") : null));
    wrap.appendChild(card); fc = null; return wrap;
  }
  function deckLabel(d) { return ({ formel: "Formel", begrep: "Begrep", mekanisme: "Mekanisme", intuisjon: "Intuisjon" })[d] || "Kort"; }
  S.views.flashcards = { render };
})(window.EDU);

/* ---------------- exam ---------------- */
(function (S) {
  const { el, icon, frag } = S.u; const sh = () => S.views.shared; let filter = "alle";
  function render() {
    const wrap = el(".fade-in"); const ex = S.data.exams;
    wrap.appendChild(sh().pageHead("Eksamenstrening", "Tidligere eksamener, koblet til pensum", "Hver tidligere oppgave er koblet til kapitlene den tester, et modellsvar der det finnes, og hva du bør repetere hvis du står fast."));
    const fmt = el(".card", { style: { marginBottom: "20px" } });
    fmt.appendChild(el(".row.wrap", { style: { gap: "10px" } }, el(".chip.accent", icon("clock"), ex.format.duration), el(".chip.accent", `${ex.format.tasks} oppgaver`), ...ex.format.weights.map((w) => el(".chip", w)), el(".chip.rose", "Ingen kalkulator")));
    const note = el("div", { style: { marginTop: "14px", background: "var(--amber-soft)", border: "1px solid #f2dcb6", borderRadius: "14px", padding: "13px 16px", fontSize: "14.5px", lineHeight: 1.55 } });
    note.appendChild(frag("<b>⚠️ Kritisk innsikt:</b> " + ex.format.keyInsight)); fmt.appendChild(note); wrap.appendChild(fmt);
    const dayIdx = S.data.activeDayIndex();
    const rec = ex.tasks.filter((t) => Math.abs(t.recommendDay - dayIdx) <= 1);
    if (rec.length) { wrap.appendChild(sh().sectionTitle("Anbefalt i dag (dag " + dayIdx + ")")); const g = el(".grid.cols-2", { style: { marginBottom: "10px" } }); rec.slice(0, 2).forEach((t) => g.appendChild(taskCard(t, true))); wrap.appendChild(g); }
    wrap.appendChild(sh().sectionTitle("Hva har kommet (mønster)")); wrap.appendChild(historyCard());
    wrap.appendChild(sh().sectionTitle("Alle tidligere oppgaver"));
    const seg = el(".seg", { style: { marginBottom: "16px" } });
    [["alle", "Alle"], ["1", "Oppgave 1"], ["2", "Oppgave 2"], ["3", "Oppgave 3"]].forEach(([k, l]) => seg.appendChild(el("button" + (filter === k ? ".on" : ""), { onclick: () => { filter = k; S.app.refresh(); } }, l)));
    wrap.appendChild(seg);
    const grid = el(".grid.cols-2"); ex.tasks.filter((t) => filter === "alle" || t.oppg === parseInt(filter, 10)).forEach((t) => grid.appendChild(taskCard(t))); wrap.appendChild(grid);
    return wrap;
  }
  function historyCard() {
    const card = el(".card", { style: { overflowX: "auto" } }); const t = el("table.data", { style: { margin: 0, border: "none" } }); const pats = S.data.reference.examPatterns;
    t.innerHTML = "<tr><th>Eksamen</th><th>Oppgave 1</th><th>Oppgave 2</th><th>Oppgave 3</th></tr>" + pats.map((p) => `<tr><td><b>${p.exam}</b></td><td>${S.u.escapeHtml(p.task1)}</td><td>${S.u.escapeHtml(p.task2)}</td><td>${S.u.escapeHtml(p.task3)}</td></tr>`).join("");
    card.appendChild(t); return card;
  }
  function taskCard(t, highlight) {
    const exState = S.store.get().exams[t.id] || {};
    const card = el(".card", { style: highlight ? { borderColor: "var(--accent-soft-2)", background: "var(--accent-soft)" } : {} });
    card.appendChild(el(".row", el(".chip.indigo", t.exam + " · " + t.task), el(".spacer"), exState.attempted ? el(".chip.green", "✓ Øvd") : null));
    card.appendChild(el("h4", { style: { fontSize: "17px", margin: "10px 0 4px" } }, t.topic));
    card.appendChild(el("p.muted", { style: { fontSize: "14px", marginTop: 0, lineHeight: 1.5 } }, t.desc));
    card.appendChild(el(".tiny.muted", { style: { marginTop: "8px", fontWeight: 600 } }, "Tester:"));
    card.appendChild(el(".row.wrap", { style: { gap: "6px", marginTop: "6px" } }, ...t.tests.map((x) => el(".chip", { style: { fontSize: "11.5px" } }, x))));
    card.appendChild(el(".tiny.muted", { style: { marginTop: "12px", fontWeight: 600 } }, "Kapitler:"));
    card.appendChild(el(".row.wrap", { style: { gap: "6px", marginTop: "6px" } }, ...t.chapters.map((n) => el(".chip.slate", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${n}`) }, "K" + n))));
    const foot = el(".row", { style: { marginTop: "16px", gap: "8px", flexWrap: "wrap" } });
    if (t.modelAnswer) foot.appendChild(el("a.btn.sm", { href: `#/chapter/${t.modelAnswer.ch}` }, "📄 Modellsvar"));
    foot.appendChild(el("button.btn.sm" + (exState.attempted ? ".ghost" : ".primary"), { onclick: () => { S.store.setExam(t.id, { attempted: !exState.attempted }); S.u.toast(exState.attempted ? "Fjernet" : "Markert som øvd ✓"); S.app.refresh(); } }, exState.attempted ? "Angre" : "Marker som øvd"));
    card.appendChild(foot);
    if (t.reviewIfWrong && t.reviewIfWrong.length) card.appendChild(el(".tiny.muted", { style: { marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--hairline)" } }, "Sliter du? Repeter: " + t.reviewIfWrong.map((n) => "K" + n).join(", ")));
    return card;
  }
  S.views.exam = { render };
})(window.EDU);

/* ---------------- review engine ---------------- */
(function (S) {
  const { el, icon } = S.u; const sh = () => S.views.shared;
  function render() {
    const wrap = el(".fade-in");
    wrap.appendChild(sh().pageHead("Repetisjonsmotor", "Hva du bør repetere — og hvorfor", "Motoren prioriterer temaer du har markert som usikre, ikke har sett på lenge, som er sentrale på eksamen, eller der quizscoren er svak."));
    const sugg = S.repetition.suggest(12); const high = sugg.filter((s) => s.priority === "high");
    wrap.appendChild(el(".card", { style: { marginBottom: "20px", background: "var(--accent-soft)", borderColor: "var(--accent-soft-2)" } }, el(".row.wrap", { style: { gap: "12px" } }, el("div", { style: { flex: "1 1 240px" } }, el("div", { style: { fontWeight: 620, fontSize: "16px" } }, high.length ? `${high.length} tema${high.length > 1 ? "er" : ""} trenger oppmerksomhet` : "Du er à jour 🎯"), el(".tiny.muted", { style: { marginTop: "2px" } }, "Start en målrettet økt på de svakeste temaene.")), el("button.btn.primary", { onclick: () => S.router.navigate("#/quiz") }, "Quiz svake temaer"), el("button.btn", { onclick: () => S.router.navigate("#/flashcards") }, "Repeter kort"))));
    ["high", "med", "low"].forEach((pri) => {
      const items = sugg.filter((s) => s.priority === pri); if (!items.length) return;
      wrap.appendChild(sh().sectionTitle(pri === "high" ? "Høy prioritet" : pri === "med" ? "Middels prioritet" : "Lav prioritet — vedlikehold"));
      const card = el(".card", { style: { padding: "6px 0" } }); items.forEach((s) => card.appendChild(reviewRow(s))); wrap.appendChild(card);
    });
    wrap.appendChild(el(".card", { style: { marginTop: "24px" } }, el("h4", { style: { marginBottom: "10px" } }, "Slik prioriterer motoren"), el("ul", { style: { margin: 0, paddingLeft: "18px", color: "var(--ink-3)", fontSize: "14.5px", lineHeight: 1.6 }, html: "<li>Temaer markert <b>usikker</b> løftes høyest.</li><li>Temaer du <b>ikke har sett på lenge</b> stiger gradvis.</li><li><b>Sentrale eksamenstemaer</b> (ofte testet i tidligere eksamener) vektes opp.</li><li><b>Svak quizscore</b> på et tema øker prioriteten.</li><li><b>Oppgave 3</b> (kort sikt) vektes ekstra — historisk størst rom for å hente poeng.</li>" })));
    return wrap;
  }
  function reviewRow(s) {
    const c = s.chapter; const row = el(".review-item", { style: { borderBottom: "1px solid var(--hairline)", cursor: "pointer" }, onclick: sh().go(`#/chapter/${s.num}`) });
    row.appendChild(el(".priority-tag." + s.priority, s.priority === "high" ? "Høy" : s.priority === "med" ? "Med" : "Lav"));
    row.appendChild(el("div", el(".tt", { style: { fontWeight: 580 } }, `K${s.num} · ${c.title}`), el(".reason-list", s.reasons.length ? s.reasons.join(" · ") : "Vedlikeholdsrepetisjon")));
    row.appendChild(el("div", { html: icon("arrow"), style: { color: "var(--ink-4)" } })); return row;
  }
  S.views.review = { render };
})(window.EDU);

/* ---------------- search ---------------- */
(function (S) {
  const { el, icon, escapeHtml } = S.u; const sh = () => S.views.shared; let typeFilter = "alle";
  function render(query) {
    const wrap = el(".fade-in");
    wrap.appendChild(sh().pageHead("Søk", "Finn begreper, modeller, formler, økonomer og variabler", "Søk på tvers av hele pensum."));
    const box = el(".searchbox", { style: { marginBottom: "16px" } }); box.innerHTML = icon("search");
    const input = el("input", { type: "text", placeholder: "Søk … (f.eks. Solow, steady state, MPK, badekar, Romer, π)", value: query || "" });
    box.appendChild(input); box.appendChild(el("button.iconbtn", { onclick: () => { input.value = ""; doSearch(""); input.focus(); }, title: "Tøm" }, "✕")); wrap.appendChild(box);
    const filt = el(".row.wrap", { style: { gap: "7px", marginBottom: "20px" } });
    [["alle", "Alle"], ["kap", "Kapitler"], ["sec", "Seksjoner"], ["formel", "Formler"], ["begrep", "Begreper"], ["okonom", "Økonomer"], ["var", "Variabler"], ["fig", "Figurer"]].forEach(([k, l]) => filt.appendChild(el(".chip" + (typeFilter === k ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => { typeFilter = k; doSearch(input.value); } }, l)));
    wrap.appendChild(filt);
    const results = el(".card", { style: { padding: "8px" } }); wrap.appendChild(results);
    function doSearch(q) {
      S.u.clear(results);
      if (!q || !q.trim()) { results.appendChild(suggestions(input)); return; }
      const hits = S.search.search(q, typeFilter);
      if (!hits.length) { results.appendChild(sh().empty("🔍", "Ingen treff", `Fant ingenting for «${q}». Prøv et annet søkeord.`)); return; }
      results.appendChild(el(".tiny.muted", { style: { padding: "8px 12px" } }, `${hits.length} treff`));
      hits.forEach((h) => results.appendChild(resultRow(h, q)));
    }
    input.addEventListener("input", S.u.debounce((e) => doSearch(e.target.value), 120));
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { const f = results.querySelector(".sresult"); if (f) f.click(); } });
    doSearch(query || ""); setTimeout(() => input.focus(), 30); return wrap;
  }
  function resultRow(h, q) {
    const color = S.search.typeColor(h.typed); const row = el(".sresult", { onclick: () => S.router.navigate(h.route) });
    row.appendChild(el(".stype.chip." + color, h.type));
    const body = el("div", { style: { minWidth: 0 } }); body.appendChild(el(".stitle", { html: highlight(h.title, q) }));
    if (h.snippet) body.appendChild(el(".ssnip", { html: highlight(h.snippet.slice(0, 160) + (h.snippet.length > 160 ? "…" : ""), q) }));
    row.appendChild(body); return row;
  }
  function highlight(text, q) { let out = escapeHtml(text); q.trim().split(/\s+/).filter(Boolean).forEach((t) => { const rx = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"); out = out.replace(rx, "<mark>$1</mark>"); }); return out; }
  function suggestions(input) {
    const box = el("div", { style: { padding: "10px 12px" } }); box.appendChild(el(".tiny.muted", { style: { marginBottom: "10px" } }, "Populære søk"));
    const terms = ["Solow", "steady state", "Romer", "MPK", "badekarmodell", "Phillips", "IS-MP", "UIP", "trilemma", "kvantitetsteori", "produksjonsgap", "Okun"];
    box.appendChild(el(".row.wrap", { style: { gap: "8px" } }, ...terms.map((t) => el(".concept-pill", { onclick: () => { input.value = t; input.dispatchEvent(new Event("input")); } }, t)))); return box;
  }
  S.views.search = { render };
})(window.EDU);

/* ---------------- progress ---------------- */
(function (S) {
  const { el, ring, bar } = S.u; const sh = () => S.views.shared;
  function render() {
    const wrap = el(".fade-in"); const readiness = S.metrics.readiness();
    const r = S.metrics.readPct(), d = S.metrics.daysPct(), srs = S.srs.stats(), q = S.metrics.quizStats(); const u = S.metrics.understoodCount();
    wrap.appendChild(sh().pageHead("Fremdrift", "Hele bildet av hvor du står"));
    const overview = el(".card.pad-lg", { style: { marginBottom: "20px" } });
    const ov = el(".row.wrap", { style: { gap: "34px", alignItems: "center" } });
    ov.appendChild(el("div", ring(readiness, 140, readiness + "%", "klar"), el(".center.tiny.muted", { style: { marginTop: "8px" } }, "Eksamensberedskap")));
    const bars = el("div", { style: { flex: "1 1 320px", minWidth: "260px" } });
    bars.appendChild(barRow("Kapitler lest", `${r.read}/${r.total}`, r.pct, false));
    bars.appendChild(barRow("Dager fullført", `${d.done}/${d.total}`, d.pct, true));
    bars.appendChild(barRow("Flashcards mestret", `${srs.mastered}/${srs.total}`, srs.masteredPct, false));
    bars.appendChild(barRow("Quiz-treffsikkerhet", q.accuracy != null ? q.accuracy + "%" : "ingen ennå", q.accuracy || 0, true));
    ov.appendChild(bars); overview.appendChild(ov); wrap.appendChild(overview);
    const grid = el(".grid.cols-4", { style: { marginBottom: "24px" } });
    grid.appendChild(el(".card", sh().stat(S.metrics.streak(), "Dagers streak 🔥"))); grid.appendChild(el(".card", sh().stat(u.understood, "Forstått"))); grid.appendChild(el(".card", sh().stat(u.unsure, "Usikker"))); grid.appendChild(el(".card", sh().stat(q.answered, "Quizspørsmål svart")));
    wrap.appendChild(grid);
    wrap.appendChild(sh().sectionTitle("Fremdrift per del"));
    const partCard = el(".card");
    S.data.parts().forEach((p) => { const read = p.chapters.filter((c) => { const st = S.store.get().chapters[c.num]; return st && st.read; }).length; const pct = Math.round((read / p.chapters.length) * 100); partCard.appendChild(el("div", { style: { padding: "10px 0", borderBottom: "1px solid var(--hairline)" } }, el(".row", el("div", { style: { fontWeight: 560, fontSize: "14.5px" } }, p.tag + " — " + p.name), el(".spacer"), el(".tiny.muted", `${read}/${p.chapters.length}`)), el("div", { style: { marginTop: "8px" } }, bar(pct, { thin: true, green: pct === 100 })))); });
    wrap.appendChild(partCard);
    const cols = el(".grid.cols-2", { style: { marginTop: "24px", alignItems: "start" } });
    const weak = el(".card"); weak.appendChild(el("h3", { style: { fontSize: "16px", marginBottom: "10px" } }, "Svakeste temaer"));
    const weakItems = S.repetition.suggest(5).filter((s) => s.score >= 20);
    if (!weakItems.length) weak.appendChild(el(".tiny.muted", "Ingen svake temaer registrert ennå — fortsett å lese og ta quizer."));
    weakItems.forEach((s) => weak.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${s.num}`) }, el(".priority-tag." + s.priority, s.priority === "high" ? "Høy" : s.priority === "med" ? "Med" : "Lav"), el("div", el(".tt", `K${s.num} · ${s.chapter.title}`), el(".td", s.reasons[0] || "")))));
    cols.appendChild(weak);
    const remain = el(".card"); remain.appendChild(el("h3", { style: { fontSize: "16px", marginBottom: "10px" } }, "Gjenstår å lese"));
    const left = S.metrics.coreChapters().filter((c) => { const st = S.store.get().chapters[c.num]; return !(st && st.read); });
    if (!left.length) remain.appendChild(el(".tiny.muted", "🎉 Alt er lest! Nå er det repetisjon som gjelder."));
    left.slice(0, 8).forEach((c) => remain.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${c.num}`) }, el(".chip.slate", "K" + c.num), el("div", el(".tt", c.title)))));
    if (left.length > 8) remain.appendChild(el(".tiny.muted", { style: { padding: "8px 4px" } }, `+ ${left.length - 8} til`));
    cols.appendChild(remain); wrap.appendChild(cols);
    const sessions = S.store.get().quiz.sessions;
    if (sessions.length) { wrap.appendChild(sh().sectionTitle("Quiz-historikk")); const hist = el(".card", { style: { padding: "6px 0" } }); sessions.slice(0, 8).forEach((s) => { const pct = Math.round((s.score / s.total) * 100); hist.appendChild(el(".task-row", el(".chip." + (pct >= 80 ? "green" : pct >= 50 ? "amber" : "rose"), pct + "%"), el("div", el(".tt", `${s.score}/${s.total} riktige`), el(".td", s.mode)))); }); wrap.appendChild(hist); }
    wrap.appendChild(el(".card", { style: { marginTop: "30px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" } }, el("div", { style: { flex: "1 1 240px" } }, el("div", { style: { fontWeight: 560 } }, "Nullstill fremdrift"), el(".tiny.muted", "Sletter lesestatus, quiz, flashcards og dagsfullføring — for dette faget.")), el("button.btn.ghost", { onclick: () => { if (confirm("Nullstille all fremdrift i dette faget? Kan ikke angres.")) { S.store.resetAll(); if (S.account) S.account.push(); S.u.toast("Fremdrift nullstilt"); S.app.refresh(); } } }, "Nullstill fremdrift"), el("button.btn.ghost", { onclick: () => { S.clearContentCache(); S.u.toast("Bufret innhold tømt, laster på nytt…"); setTimeout(() => location.reload(), 600); } }, "Last innhold på nytt")));
    return wrap;
  }
  function barRow(label, val, pct, green) { return el("div", { style: { marginBottom: "14px" } }, el(".row", el(".tiny", { style: { fontWeight: 560 } }, label), el(".spacer"), el(".tiny.muted", val)), el("div", { style: { marginTop: "6px" } }, bar(pct, { thin: true, green }))); }
  S.views.progress = { render };
})(window.EDU);

/* ---------------- oppgavebank ---------------- */
(function (S) {
  const { el, icon } = S.u; const sh = () => S.views.shared;
  let typeFilter = "alle", topicFilter = "alle";
  const TYPE_LABEL = { "alle": "Alle", "Gruppeøving": "Gruppeøvinger", "Innlevering": "Innleveringer", "Eksamen": "Eksamener", "Sensorveiledning": "Sensorveiledninger" };
  const yearKey = (p) => { const m = (p.title.match(/(\d{4})/) || [])[1]; const v = /vår|v\b/i.test(p.title) ? 0 : 5; return (m ? +m : 0) * 10 + v; };
  const typeOrder = { "Gruppeøving": 0, "Innlevering": 1, "Eksamen": 2, "Sensorveiledning": 3 };

  function render(openDocId) {
    const wrap = el(".fade-in");
    const probs = S.data.problems();
    wrap.appendChild(sh().pageHead("Oppgavebank", "Alle oppgaver med fasit",
      "Gruppeøvinger, innleveringer og tidligere eksamener 2020–2025 med løsningsforslag. Brukt aktivt i uke 3."));
    if (!probs.length) {
      wrap.appendChild(sh().empty("📚", "Ingen oppgaver lastet ennå",
        "Kjør den lokale serveren (python3 tools/serve.py) eller åpne nettversjonen, så lastes oppgavefilen automatisk."));
      return wrap;
    }
    const withFasit = probs.filter((p) => p.hasFasit).length;
    wrap.appendChild(el(".card", { style: { marginBottom: "18px" } }, el(".row.wrap", { style: { gap: "30px" } },
      sh().stat(probs.length, "Oppgavesett"), sh().stat(withFasit, "Med fasit"),
      sh().stat(probs.filter((p) => p.type === "Eksamen").length, "Tidligere eksamener"))));

    const seg = el(".seg", { style: { marginBottom: "12px", flexWrap: "wrap" } });
    ["alle", "Gruppeøving", "Innlevering", "Eksamen"].forEach((t) =>
      seg.appendChild(el("button" + (typeFilter === t ? ".on" : ""), { onclick: () => { typeFilter = t; S.app.refresh(); } }, TYPE_LABEL[t])));
    wrap.appendChild(seg);

    const allTopics = [...new Set(probs.flatMap((p) => p.topics))].sort();
    const tf = el(".row.wrap", { style: { gap: "7px", marginBottom: "18px" } });
    tf.appendChild(el(".chip" + (topicFilter === "alle" ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => { topicFilter = "alle"; S.app.refresh(); } }, "Alle temaer"));
    allTopics.forEach((t) => tf.appendChild(el(".chip" + (topicFilter === t ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => { topicFilter = t; S.app.refresh(); } }, t)));
    wrap.appendChild(tf);

    const list = probs
      .filter((p) => (typeFilter === "alle" || p.type === typeFilter) && (topicFilter === "alle" || p.topics.includes(topicFilter)))
      .sort((a, b) => (typeOrder[a.type] - typeOrder[b.type]) || (yearKey(a) - yearKey(b)));

    if (!list.length) { wrap.appendChild(sh().empty("🔍", "Ingen treff", "Ingen oppgaver matcher filteret.")); return wrap; }
    list.forEach((p) => wrap.appendChild(card(p, openDocId === p.id)));

    if (openDocId) setTimeout(() => { const d = document.getElementById("doc-" + openDocId); if (d) d.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
    return wrap;
  }

  function verbatimBox(text) { return el("div.verbatim-box", text || "(tom)"); }

  function card(p, open) {
    const det = el("details.card", { id: "doc-" + p.id, style: { padding: "0", marginBottom: "12px" } });
    if (open) det.setAttribute("open", "");
    const sum = document.createElement("summary");
    sum.className = "prob-summary";
    sum.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      el(".chip." + typeColor(p.type), p.type),
      el("span", { style: { fontWeight: 620, fontSize: "15.5px" } }, p.title),
      el(".spacer"),
      p.hasFasit ? el(".chip.green", "✓ Fasit") : el(".chip.amber", "Uten fasit")));
    det.appendChild(sum);

    const inner = el("div", { style: { padding: "0 22px 20px" } });
    if (p.subj) inner.appendChild(el("p.muted", { style: { fontSize: "13.5px", marginTop: "2px" } }, "Tema: " + p.subj));
    inner.appendChild(el(".row.wrap", { style: { gap: "6px", margin: "6px 0 12px" } }, ...p.topics.map((t) => el(".chip.slate", { style: { fontSize: "11px" } }, t))));
    if (p.note) inner.appendChild(el("p.tiny.muted", { style: { fontStyle: "italic", marginBottom: "10px" } }, p.note));

    inner.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Oppgavetekst"));
    inner.appendChild(verbatimBox(p.qText));

    if (p.hasFasit) {
      const fbox = verbatimBox(p.aText); fbox.style.display = "none"; fbox.style.borderLeft = "3px solid var(--green)";
      const btn = el("button.btn.sm.primary", { style: { marginTop: "12px" }, onclick: () => { const show = fbox.style.display === "none"; fbox.style.display = show ? "block" : "none"; btn.textContent = show ? "Skjul fasit" : "Vis fasit / løsningsforslag"; } }, "Vis fasit / løsningsforslag");
      inner.appendChild(btn); inner.appendChild(fbox);
    } else {
      inner.appendChild(el("p.tiny.muted", { style: { marginTop: "10px" } }, "Det finnes ikke et eget løsningsforslag for dette settet i kildematerialet — bruk det som ekstra øving og sammenlign med nærliggende sett."));
    }
    det.appendChild(inner);
    return det;
  }
  function typeColor(t) { return ({ "Gruppeøving": "teal", "Innlevering": "indigo", "Eksamen": "accent", "Sensorveiledning": "amber" })[t] || "slate"; }

  S.views.problems = { render };
})(window.EDU);
