/* ===================== APP SHELL + BOOT ===================== */
window.SAM3 = window.SAM3 || {};

/* ---------------- app shell, navigation, routing ---------------- */
(function (S) {
  const { el, icon, ring } = S.u; const V = S.views;
  const NAV = [
    { group: "Studieløp", items: [
      { route: "#/", match: "/", label: "Dashboard", ico: "home" },
      { route: "#/plan", match: "/plan", label: "Studieplan", ico: "calendar" },
      { route: "#/curriculum", match: "/curriculum", label: "Pensum", ico: "grid" },
    ]},
    { group: "Øving", items: [
      { route: "#/lyn", match: "/lyn", label: "Lynlæring", ico: "bolt", badge: () => (S.views.lyn && !S.views.lyn.dailyDone()) ? "⚡" : null },
      { route: "#/quiz", match: "/quiz", label: "Quiz", ico: "quiz" },
      { route: "#/flashcards", match: "/flashcards", label: "Flashcards", ico: "cards", badge: () => S.srs.stats().due || null },
      { route: "#/dybde", match: "/dybde", label: "Dybdetrening", ico: "layers", badge: () => (S.views.dybde && S.views.dybde.weakCount()) || null },
      { route: "#/oppgaver", match: "/oppgaver", label: "Oppgavebank", ico: "book" },
      { route: "#/exam", match: "/exam", label: "Eksamenstrening", ico: "exam" },
      { route: "#/review", match: "/review", label: "Repetisjon", ico: "repeat", badge: () => S.repetition.suggest(20).filter((s) => s.priority === "high").length || null },
    ]},
    { group: "Verktøy", items: [
      { route: "#/search", match: "/search", label: "Søk", ico: "search" },
      { route: "#/progress", match: "/progress", label: "Fremdrift", ico: "chart" },
    ]},
  ];
  const MOBILE = [
    { route: "#/", match: "/", label: "Hjem", ico: "home" },
    { route: "#/lyn", match: "/lyn", label: "Lyn", ico: "bolt" },
    { route: "#/plan", match: "/plan", label: "Plan", ico: "calendar" },
    { route: "#/quiz", match: "/quiz", label: "Quiz", ico: "quiz" },
    { route: "#/flashcards", match: "/flashcards", label: "Kort", ico: "cards" },
    { route: "#/dybde", match: "/dybde", label: "Dybde", ico: "layers" },
  ];

  let contentEl, currentView = () => V.dashboard.render();

  function brand() { return el(".brand", { onclick: () => S.router.navigate("#/"), style: { cursor: "pointer" } }, el(".logo", "S3"), el("div", el(".bt", "SAM3 Makro"), el(".bs", "Eksamenstrening"))); }
  function navButton(it) { const btn = el("button.nav-item", { dataset: { match: it.match }, onclick: () => S.router.navigate(it.route) }); btn.innerHTML = icon(it.ico) + `<span>${it.label}</span>`; if (it.badge) btn.appendChild(el(".badge", { dataset: { badge: it.match } })); return btn; }
  function buildSidebar() {
    const sb = el(".sidebar"); sb.appendChild(brand());
    NAV.forEach((g) => { sb.appendChild(el(".nav-section", g.group)); g.items.forEach((it) => sb.appendChild(navButton(it))); });
    const foot = el(".sidebar-foot"); foot.appendChild(el(".mini-ring", el("div", { id: "mini-ring" }), el(".mt", { id: "mini-mt" }))); sb.appendChild(foot); return sb;
  }
  function buildTopbar() { const tb = el(".topbar"); tb.appendChild(brand()); tb.appendChild(el(".spacer")); tb.appendChild(el("button.iconbtn", { onclick: () => S.router.navigate("#/search"), html: icon("search") })); return tb; }
  function buildMobileNav() { const nav = el(".mobile-nav"); MOBILE.forEach((it) => { const btn = el("button", { dataset: { match: it.match }, onclick: () => S.router.navigate(it.route) }); btn.innerHTML = icon(it.ico) + `<span>${it.label}</span>`; nav.appendChild(btn); }); return nav; }
  function buildShell() {
    const app = el(".app"); app.appendChild(buildSidebar());
    const main = el(".main"); main.appendChild(buildTopbar()); contentEl = el(".content"); main.appendChild(contentEl);
    app.appendChild(main); document.body.appendChild(app); document.body.appendChild(buildMobileNav());
  }
  function bestMatch(path) {
    if (path === "/") return "/";
    if (path.startsWith("/day")) return "/plan";
    if (path.startsWith("/chapter")) return "/curriculum";
    const all = NAV.flatMap((g) => g.items).map((i) => i.match);
    return all.find((m) => m !== "/" && path.startsWith(m)) || "/";
  }
  function updateNav() {
    const activeMatch = bestMatch(S.router.getCurrent().path);
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.match === activeMatch));
    document.querySelectorAll(".mobile-nav button").forEach((n) => n.classList.toggle("active", n.dataset.match === activeMatch));
    NAV.forEach((g) => g.items.forEach((it) => { if (!it.badge) return; const b = document.querySelector(`[data-badge="${it.match}"]`); if (b) { const v = it.badge(); b.textContent = v || ""; b.style.display = v ? "" : "none"; } }));
    const mr = document.getElementById("mini-ring"); if (mr) S.u.mount(mr, ring(S.metrics.readiness(), 46));
    const mt = document.getElementById("mini-mt"); if (mt) { const r = S.metrics.readPct(); mt.innerHTML = `<b>${S.metrics.readiness()}% klar</b><br>${r.read}/${r.total} kapitler`; }
  }
  function setView(thunk) { currentView = thunk; render(true); }
  function render(isNav) {
    const y = isNav ? 0 : window.scrollY; let node;
    try { node = currentView(); } catch (e) { console.error(e); node = el(".empty", el(".ei", "⚠️"), el("h3", "Noe gikk galt"), el("p.muted", String((e && e.message) || e))); }
    S.u.mount(contentEl, node); updateNav();
    if (isNav) window.scrollTo(0, 0); else window.scrollTo(0, y);
  }
  function refresh() { render(false); }
  function routes() {
    const R = S.router;
    R.on("/", () => setView(() => V.dashboard.render()));
    R.on("/plan", () => setView(() => V.planOverview.render()));
    R.on("/day/:n", (p) => setView(() => V.day.render(p.n)));
    R.on("/curriculum", () => setView(() => V.curriculum.render()));
    R.on("/chapter/:num", (p) => setView(() => V.chapter.render(p.num)));
    R.on("/quiz", () => setView(() => V.quiz.render()));
    R.on("/flashcards", () => setView(() => V.flashcards.render()));
    R.on("/dybde", () => setView(() => V.dybde.render()));
    R.on("/lyn", () => setView(() => V.lyn.render()));
    R.on("/oppgaver", (p, q) => setView(() => V.problems.render(q.doc || null)));
    R.on("/exam", () => setView(() => V.exam.render()));
    R.on("/review", () => setView(() => V.review.render()));
    R.on("/search", (p, q) => setView(() => V.search.render(q.q || "")));
    R.on("/progress", () => setView(() => V.progress.render()));
    R.setNotFound(() => setView(() => V.dashboard.render()));
  }
  function init() {
    buildShell(); routes();
    S.store.subscribe(S.u.debounce(updateNav, 150));
    S.router.start();
  }
  S.app = { init, refresh, navigate: (r) => S.router.navigate(r) };
})(window.SAM3);

/* ---------------- manual loader (cache -> fetch -> file picker) ---------------- */
(function (S) {
  const MAN_CACHE = "sam3.manual.v1", PROB_CACHE = "sam3.problems.v1";
  function setSplash(html) { const b = document.getElementById("splash-body"); if (b) b.innerHTML = html; }
  function hideSplash() { const s = document.getElementById("splash"); if (s) s.remove(); }
  function lsGet(key) { try { const c = localStorage.getItem(key); return c ? JSON.parse(c) : null; } catch (e) { return null; } }
  function lsSet(key, d) { try { localStorage.setItem(key, JSON.stringify(d)); } catch (e) {} }
  function cacheGet() { const d = lsGet(MAN_CACHE); return (d && d.curriculum && d.curriculum.length) ? d : null; }
  function cacheSet(d) { lsSet(MAN_CACHE, d); }
  async function loadProblems() {
    const cached = lsGet(PROB_CACHE);
    if (cached && cached.length) { S.bootProblems(cached); return; }
    const cands = ["SAM3_Alle_oppgaver_med_fasit.html", "Alle_oppgaver.html", "../SAM3_Alle_oppgaver_med_fasit.html"];
    for (const url of cands) {
      try { const r = await fetch(url, { cache: "no-store" }); if (r && r.ok) { const t = await r.text(); if (t.indexOf('class="doc"') > -1) { const parsed = S.parseProblems(t); if (parsed.length) { S.bootProblems(parsed); lsSet(PROB_CACHE, parsed); return; } } } } catch (e) {}
    }
    S.bootProblems([]);
  }
  function looksLikeManual(t) { return t && (t.indexOf('id="k0"') > -1 || t.indexOf('class="chap"') > -1); }
  async function tryFetch() {
    const cands = ["SAM3_Eksamensmanual.html", "manual.html", "assets/manual.html", "../SAM3_Eksamensmanual.html"];
    for (const url of cands) {
      try { const r = await fetch(url, { cache: "no-store" }); if (r && r.ok) { const t = await r.text(); if (looksLikeManual(t)) { const d = S.parseManual(t); if (d.curriculum.length) return d; } } } catch (e) {}
    }
    return null;
  }
  async function finish(d) { S.bootData(d.curriculum, d.reference); await loadProblems(); hideSplash(); S.app.init(); }
  function readFile(file) {
    setSplash('<div class="spinner"></div><p class="muted">Leser og parser manualen…</p>');
    const fr = new FileReader();
    fr.onload = () => { try { const d = S.parseManual(fr.result); if (!d.curriculum.length) throw new Error("tom"); cacheSet(d); finish(d); } catch (e) { setSplash('<p class="muted">Klarte ikke å lese filen. Er det riktig manual-HTML?</p>'); setTimeout(showPicker, 1400); } };
    fr.onerror = () => { setSplash('<p class="muted">Kunne ikke lese filen.</p>'); setTimeout(showPicker, 1200); };
    fr.readAsText(file, "utf-8");
  }
  function showPicker() {
    setSplash('<p class="muted" style="margin-bottom:6px">Fant ikke manualen automatisk.</p>'
      + '<p class="tiny muted" style="margin:0 0 4px">Velg <b>SAM3_Eksamensmanual.html</b> — hele pensum lastes inn og lagres lokalt (du slipper å velge igjen).</p>'
      + '<div class="drop" id="drop"><input type="file" id="mfile" accept=".html,text/html" style="display:none">'
      + '<button class="btn primary lg" id="pickbtn">Velg manualfil…</button>'
      + '<p class="tiny muted" style="margin-top:12px">…eller dra filen hit</p></div>'
      + '<p class="tiny muted" style="margin-top:14px">Tips: kjør <code>python3 tools/serve.py</code> og åpne <code>http://127.0.0.1:4178/app.html</code> for å slippe dette steget.</p>');
    const input = document.getElementById("mfile"); const drop = document.getElementById("drop"); const btn = document.getElementById("pickbtn");
    btn.onclick = () => input.click();
    input.onchange = () => { if (input.files[0]) readFile(input.files[0]); };
    ["dragover", "dragenter"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); const f = e.dataTransfer.files[0]; if (f) readFile(f); });
  }
  async function boot() {
    const cached = cacheGet(); if (cached) { try { finish(cached); return; } catch (e) {} }
    let fetched = null; try { fetched = await tryFetch(); } catch (e) {}
    if (fetched) { cacheSet(fetched); finish(fetched); return; }
    showPicker();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window.SAM3);
