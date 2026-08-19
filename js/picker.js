/* ===================== FAG-VELGER =====================
   Avgjør hvilket fag som skal kjøres, tegner velgeren når intet er valgt, og
   fargelegger skallet etter fagets aksentfarge. Fagbytte går alltid via en full
   sidelasting (?fag=<id>) — da slipper vi å rive ned parsede pensumdata,
   SRS-bunken og indeksene som motoren cacher i minnet. */
window.EDU = window.EDU || {};

(function (S) {
  const CHOICE_KEY = "edu.subject";
  const all = () => window.EDU_SUBJECTS || [];
  const P = () => window.EDU_PLATFORM || { name: "Eksamenstrening", logo: "?", accent: "#2f6bff" };
  /* Byggnummeret står i script-taggen i index.html (js/picker.js?v=N). Vi leser
     det derfra og henger det på fagdataene også, slik at ett tall busts hele
     bufferen. GitHub Pages setter max-age=600 på filene, så uten dette kjører
     telefonen gammel kode i opptil ti minutter etter en push. */
  const BUILD = (() => { try { return new URL(document.currentScript.src).searchParams.get("v") || ""; } catch (e) { return ""; } })();
  const versioned = (src) => (BUILD && src.indexOf("?") < 0 ? src + "?v=" + BUILD : src);

  function stored() { try { return localStorage.getItem(CHOICE_KEY); } catch (e) { return null; } }
  function remember(id) { try { localStorage.setItem(CHOICE_KEY, id); } catch (e) {} }
  function fromUrl() { try { return new URLSearchParams(location.search).get("fag"); } catch (e) { return null; } }

  /* Valgt fag, eller null hvis brukeren ennå ikke har valgt. */
  function resolve() {
    return window.EDU_SUBJECT_BY_ID(fromUrl()) || window.EDU_SUBJECT_BY_ID(stored()) || null;
  }

  /* Bytt fag: husk valget og last siden på nytt med faget i URL-en. */
  function choose(id) {
    remember(id);
    const url = location.pathname + "?fag=" + encodeURIComponent(id);
    if (fromUrl() === id) location.reload(); else location.replace(url);
  }

  /* Aksentfarger, tittel og ikon følger faget. */
  function applyTheme(sub) {
    const r = document.documentElement.style;
    if (sub.accent) r.setProperty("--accent", sub.accent);
    if (sub.accentInk) r.setProperty("--accent-ink", sub.accentInk);
    if (sub.accentSoft) r.setProperty("--accent-soft", sub.accentSoft);
    if (sub.accentSoft2) r.setProperty("--accent-soft-2", sub.accentSoft2);
    if (sub.accent) r.setProperty("--shadow-accent", "0 8px 24px " + hexA(sub.accent, 0.22));
    document.title = sub.name + " · " + P().name;
    setFavicon(sub.logo, sub.accent);
  }
  /* Velgeren har ingen fag ennå, så da er det plattformen som eier tittel og ikon. */
  function applyPlatformTheme() { document.title = P().name; setFavicon(P().logo, P().accent); }
  function setFavicon(logo, accent) {
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute("content", "#f5f5f7");
    const fav = document.querySelector('link[rel="icon"]');
    const size = !logo ? 52 : logo.length > 2 ? 30 : logo.length > 1 ? 38 : 52;
    if (fav) fav.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='${accent || "#2f6bff"}'/><text x='50' y='${size > 40 ? 68 : 62}' font-size='${size}' font-family='Arial' font-weight='bold' fill='white' text-anchor='middle'>${logo || "?"}</text></svg>`));
  }
  function hexA(hex, a) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? `rgba(${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)},${a})` : `rgba(47,107,255,${a})`;
  }

  /* Laster fagets datafiler i rekkefølge (de skriver til window.EDU_DATA). */
  function loadScripts(list) {
    return (list || []).reduce((chain, src) => chain.then(() => new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = versioned(src); s.async = false;
      s.onload = res;
      s.onerror = () => rej(new Error("Fant ikke datafilen " + src));
      document.head.appendChild(s);
    })), Promise.resolve());
  }

  /* ---------------- velger-UI ---------------- */
  function card(sub) {
    const b = document.createElement("button");
    b.className = "subject-card";
    b.style.setProperty("--sc", sub.accent || "#2f6bff");
    b.innerHTML =
      `<div class="sc-logo">${esc(sub.logo || "?")}</div>` +
      `<div class="sc-text"><div class="sc-name">${esc(sub.name)}</div>` +
      `<div class="sc-blurb">${esc(sub.blurb || sub.tagline || "")}</div></div>` +
      `<svg class="sc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
    b.onclick = () => choose(sub.id);
    return b;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* Tegner velgeren i splash-kortet. Kalles ved oppstart uten valgt fag, og fra
     «Alle fag» i sidepanelet. */
  function show(opts) {
    opts = opts || {};
    const splash = ensureSplash();
    const card_ = splash.querySelector(".splash-card");
    card_.innerHTML = "";
    card_.classList.add("wide");

    applyPlatformTheme();
    const head = document.createElement("div");
    head.innerHTML =
      `<div class="picker-brand"><div class="pb-logo">${esc(P().logo || "?")}</div>` +
      `<div><div class="pb-name">${esc(P().name)}</div>` +
      `<div class="pb-tag">${esc(P().tagline || "")}</div></div></div>` +
      `<h2 class="picker-title">Hvilket fag skal du trene på?</h2>` +
      `<p class="picker-sub">Hvert fag har sin egen plan, sine egne oppgaver og sin egen fremdrift.</p>`;
    card_.appendChild(head);

    const list = document.createElement("div");
    list.className = "subject-list";
    all().forEach((s) => list.appendChild(card(s)));
    card_.appendChild(list);

    if (!all().length) {
      list.innerHTML = `<p class="muted">Ingen fag er registrert. Legg til et objekt i <code>js/subjects.js</code>.</p>`;
    }

    const foot = document.createElement("div");
    foot.className = "picker-foot";
    if (opts.cancel) {
      const back = document.createElement("button");
      back.className = "btn ghost"; back.textContent = "Avbryt";
      back.onclick = () => { card_.classList.remove("wide"); splash.remove(); if (window.EDU_SUBJECT) applyTheme(window.EDU_SUBJECT); };
      foot.appendChild(back);
    }
    card_.appendChild(foot);
    if (S.account && S.account.mountPickerSlot) S.account.mountPickerSlot(foot);
  }

  function ensureSplash() {
    let sp = document.getElementById("splash");
    if (!sp) {
      sp = document.createElement("div"); sp.id = "splash";
      sp.innerHTML = '<div class="splash-card"></div>';
      document.body.appendChild(sp);
    }
    return sp;
  }

  S.picker = { resolve, choose, show, applyTheme, applyPlatformTheme, loadScripts, ensureSplash };
})(window.EDU);
