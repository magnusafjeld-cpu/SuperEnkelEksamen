/* ===================== APP SHELL + BOOT =====================
   Fagnøytralt. Alt fagspesifikt — navn, farger, moduler, datafiler, pensumkilde —
   kommer fra manifestet i js/subjects.js via window.EDU_SUBJECT. */
window.EDU = window.EDU || {};

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

  /* Faget kan slå av moduler (manifest.modules). Dashboard er alltid med. */
  const sub = () => window.EDU_SUBJECT || {};
  function has(match) { const m = sub().modules; return match === "/" || !Array.isArray(m) || m.indexOf(match) > -1; }
  function nav() { return NAV.map((g) => ({ group: g.group, items: g.items.filter((i) => has(i.match)) })).filter((g) => g.items.length); }
  function mobileNav() { const m = MOBILE.filter((i) => has(i.match)); return m.length > 1 ? m : []; }

  let contentEl, currentView = () => V.dashboard.render();

  function brand() {
    const s = sub();
    return el(".brand", { onclick: () => S.router.navigate("#/"), style: { cursor: "pointer" } },
      el(".logo", s.logo || "?"),
      el("div", el(".bt", s.short || s.name || "Læring"), el(".bs", s.tagline || "Eksamenstrening")));
  }
  function navButton(it) { const btn = el("button.nav-item", { dataset: { match: it.match }, onclick: () => S.router.navigate(it.route) }); btn.innerHTML = icon(it.ico) + `<span>${it.label}</span>`; if (it.badge) btn.appendChild(el(".badge", { dataset: { badge: it.match } })); return btn; }
  function buildSidebar() {
    const sb = el(".sidebar"); sb.appendChild(brand());
    nav().forEach((g) => { sb.appendChild(el(".nav-section", g.group)); g.items.forEach((it) => sb.appendChild(navButton(it))); });
    const foot = el(".sidebar-foot");
    foot.appendChild(el(".mini-ring", el("div", { id: "mini-ring" }), el(".mt", { id: "mini-mt" })));
    foot.appendChild(el("div", { id: "account-slot" }));
    if ((window.EDU_SUBJECTS || []).length > 1) foot.appendChild(el("button.foot-link", { onclick: () => S.picker.show({ cancel: true }) }, "Bytt fag"));
    sb.appendChild(foot); return sb;
  }
  /* Konto-knappen ligger i topplinja, ikke bare i sidepanelet — på mobil er
     sidepanelet skjult, og da ville Konto og «Bytt fag» vært uten inngang. */
  function buildTopbar() {
    const tb = el(".topbar"); tb.appendChild(brand()); tb.appendChild(el(".spacer"));
    if (has("/search")) tb.appendChild(el("button.iconbtn", { onclick: () => S.router.navigate("#/search"), html: icon("search"), title: "Søk" }));
    tb.appendChild(el("button.iconbtn", { onclick: () => S.router.navigate("#/konto"), html: icon("user"), title: "Konto" }));
    return tb;
  }
  function buildMobileNav() { const bar = el(".mobile-nav"); mobileNav().forEach((it) => { const btn = el("button", { dataset: { match: it.match }, onclick: () => S.router.navigate(it.route) }); btn.innerHTML = icon(it.ico) + `<span>${it.label}</span>`; bar.appendChild(btn); }); return bar; }
  function buildShell() {
    const app = el(".app"); app.appendChild(buildSidebar());
    const main = el(".main"); main.appendChild(buildTopbar()); contentEl = el(".content"); main.appendChild(contentEl);
    app.appendChild(main); document.body.appendChild(app); document.body.appendChild(buildMobileNav());
  }
  function bestMatch(path) {
    if (path === "/") return "/";
    if (path.startsWith("/day")) return "/plan";
    if (path.startsWith("/chapter")) return "/curriculum";
    const all = nav().flatMap((g) => g.items).map((i) => i.match);
    return all.find((m) => m !== "/" && path.startsWith(m)) || "/";
  }
  function updateNav() {
    const activeMatch = bestMatch(S.router.getCurrent().path);
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.match === activeMatch));
    document.querySelectorAll(".mobile-nav button").forEach((n) => n.classList.toggle("active", n.dataset.match === activeMatch));
    nav().forEach((g) => g.items.forEach((it) => { if (!it.badge) return; const b = document.querySelector(`[data-badge="${it.match}"]`); if (b) { const v = it.badge(); b.textContent = v || ""; b.style.display = v ? "" : "none"; } }));
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
    const when = (match, path, fn) => { if (has(match)) R.on(path, fn); };
    R.on("/", () => setView(() => V.dashboard.render()));
    when("/plan", "/plan", () => setView(() => V.planOverview.render()));
    when("/plan", "/day/:n", (p) => setView(() => V.day.render(p.n)));
    when("/curriculum", "/curriculum", () => setView(() => V.curriculum.render()));
    when("/curriculum", "/chapter/:num", (p) => setView(() => V.chapter.render(p.num)));
    when("/quiz", "/quiz", () => setView(() => V.quiz.render()));
    when("/flashcards", "/flashcards", () => setView(() => V.flashcards.render()));
    when("/dybde", "/dybde", () => setView(() => V.dybde.render()));
    when("/lyn", "/lyn", () => setView(() => V.lyn.render()));
    when("/oppgaver", "/oppgaver", (p, q) => setView(() => V.problems.render(q.doc || null)));
    when("/exam", "/exam", () => setView(() => V.exam.render()));
    when("/review", "/review", () => setView(() => V.review.render()));
    when("/search", "/search", (p, q) => setView(() => V.search.render(q.q || "")));
    when("/progress", "/progress", () => setView(() => V.progress.render()));
    if (S.account) R.on("/konto", () => setView(() => S.account.render()));
    R.setNotFound(() => setView(() => V.dashboard.render()));
  }
  function init() {
    buildShell(); routes();
    S.store.subscribe(S.u.debounce(updateNav, 150));
    if (S.account) S.account.mountSidebar(document.getElementById("account-slot"));
    S.router.start();
  }
  S.hasModule = has;   // visningene bruker denne så de ikke lenker til moduler faget har av
  S.app = { init, refresh, navigate: (r) => S.router.navigate(r) };
})(window.EDU);

/* ---------------- innholdslaster: fag -> datafiler -> pensum -> oppgaver ---------------- */
(function (S) {
  let SUB = null;
  const manKey = () => "edu." + SUB.id + ".manual.v1";
  const probKey = () => "edu." + SUB.id + ".problems.v1";
  /* nøklene het "sam3.*" før fag-velgeren; les dem én gang så ingenting må parses på nytt */
  const legacy = (k) => (SUB && SUB.id === "sam3" ? { man: "sam3.manual.v1", prob: "sam3.problems.v1" }[k] : null);

  function setSplash(html) { const sp = S.picker.ensureSplash(); const c = sp.querySelector(".splash-card"); c.classList.remove("wide"); c.innerHTML = html; }
  function status(html) {
    const s = SUB || {};
    setSplash(`<div class="splash-logo">${s.logo || "?"}</div><h2 style="font-size:22px;font-weight:700;">${s.name || "Læring"}</h2><div id="splash-body">${html}</div>`);
  }
  function hideSplash() { const s = document.getElementById("splash"); if (s) s.remove(); }
  function lsGet(key) { try { const c = localStorage.getItem(key); return c ? JSON.parse(c) : null; } catch (e) { return null; } }
  function lsSet(key, d) { try { localStorage.setItem(key, JSON.stringify(d)); } catch (e) {} }
  function cached(key, legacyKey) { const d = lsGet(key); if (d) return d; const old = legacyKey ? lsGet(legacyKey) : null; if (old) { lsSet(key, old); return old; } return null; }

  async function loadProblems() {
    const c = cached(probKey(), legacy("prob"));
    if (c && c.length) { S.bootProblems(c); return; }
    for (const url of (SUB.problems && SUB.problems.candidates) || []) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (r && r.ok) { const t = await r.text(); if (t.indexOf('class="doc"') > -1) { const parsed = S.parseProblems(t); if (parsed.length) { S.bootProblems(parsed); lsSet(probKey(), parsed); return; } } }
      } catch (e) {}
    }
    S.bootProblems([]);
  }
  function looksLikeManual(t) { return t && (t.indexOf('id="k0"') > -1 || t.indexOf('class="chap"') > -1); }
  async function tryFetch() {
    for (const url of (SUB.manual && SUB.manual.candidates) || []) {
      try { const r = await fetch(url, { cache: "no-store" }); if (r && r.ok) { const t = await r.text(); if (looksLikeManual(t)) { const d = S.parseManual(t); if (d.curriculum.length) return d; } } } catch (e) {}
    }
    return null;
  }
  async function finish(d) {
    S.bootData(d.curriculum, d.reference);
    await loadProblems();
    if (S.account) { try { await S.account.start(); } catch (e) { console.warn("kontosynk utilgjengelig:", e); } }
    hideSplash(); S.app.init();
  }
  function readFile(file) {
    status('<div class="spinner"></div><p class="muted">Leser og parser pensum…</p>');
    const fr = new FileReader();
    fr.onload = () => { try { const d = S.parseManual(fr.result); if (!d.curriculum.length) throw new Error("tom"); lsSet(manKey(), d); finish(d); } catch (e) { status('<p class="muted">Klarte ikke å lese filen. Er det riktig pensum-HTML?</p>'); setTimeout(showFilePicker, 1400); } };
    fr.onerror = () => { status('<p class="muted">Kunne ikke lese filen.</p>'); setTimeout(showFilePicker, 1200); };
    fr.readAsText(file, "utf-8");
  }
  function showFilePicker() {
    const label = (SUB.manual && SUB.manual.label) || "pensumfilen";
    const hint = (SUB.manual && SUB.manual.hint) || "innholdet lastes inn og lagres lokalt";
    status('<p class="muted" style="margin-bottom:6px">Fant ikke pensum automatisk.</p>'
      + `<p class="tiny muted" style="margin:0 0 4px">Velg <b>${label}</b> — ${hint}.</p>`
      + '<div class="drop" id="drop"><input type="file" id="mfile" accept=".html,text/html" style="display:none">'
      + '<button class="btn primary lg" id="pickbtn">Velg pensumfil…</button>'
      + '<p class="tiny muted" style="margin-top:12px">…eller dra filen hit</p></div>'
      + '<p class="tiny muted" style="margin-top:14px">Tips: kjør <code>python3 tools/serve.py</code> for å slippe dette steget.</p>');
    const input = document.getElementById("mfile"); const drop = document.getElementById("drop"); const btn = document.getElementById("pickbtn");
    btn.onclick = () => input.click();
    input.onchange = () => { if (input.files[0]) readFile(input.files[0]); };
    ["dragover", "dragenter"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("over"); const f = e.dataTransfer.files[0]; if (f) readFile(f); });
  }

  /* Tømmer bufret pensum/oppgaver for gjeldende fag (knappen på Fremdrift). */
  S.clearContentCache = function () {
    [manKey(), probKey(), legacy("man"), legacy("prob")].forEach((k) => { if (k) { try { localStorage.removeItem(k); } catch (e) {} } });
  };

  async function boot() {
    const sub = S.picker.resolve();
    if (!sub) { S.picker.show(); return; }        // ingen fag valgt ennå — vis velgeren
    SUB = sub; window.EDU_SUBJECT = sub;
    S.picker.applyTheme(sub);
    S.store.open(sub.id);

    status('<div class="spinner"></div><p class="muted">Laster faginnhold…</p>');
    try { await S.picker.loadScripts(sub.scripts); }
    catch (e) { status(`<p class="muted">${e.message}</p><p class="tiny muted">Sjekk stiene i <code>js/subjects.js</code>.</p>`); return; }

    const c = cached(manKey(), legacy("man"));
    if (c && c.curriculum && c.curriculum.length) { try { await finish(c); return; } catch (e) { console.error(e); } }
    let fetched = null; try { fetched = await tryFetch(); } catch (e) {}
    if (fetched) { lsSet(manKey(), fetched); await finish(fetched); return; }
    showFilePicker();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window.EDU);
