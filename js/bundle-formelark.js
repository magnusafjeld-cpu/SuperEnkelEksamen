/* ================ FORMELARKET — ett trykk unna, på alle sider ================
   Fag som får utdelt et formelark på eksamen (FIE402), får en rund knapp nederst
   til høyre. Den åpner et lite vindu med arket, nøyaktig slik det deles ut, og
   under det en kort liste over det som ikke står der. Arket skal være like
   tilgjengelig når du regner en kapitteloppgave eller et eksamenssett som på
   eksamen, og du skal slippe å lete det fram i pensum.

   Knappen og vinduet henger på <body>, utenfor .content, så de overlever at
   visningen tegnes på nytt. Vinduet lukkes med krysset, med Esc, med et nytt
   trykk på knappen, eller ved å klikke utenfor.

   Har en rad i arket en skjult .fa-info-tekst, får raden en (i) helt til høyre.
   Musepeker over eller tastaturfokus viser teksten; et trykk fester den, og et
   nytt trykk skjuler den. Trykk er det eneste som virker på telefon, derfor
   reagerer hover bare på mus: på iOS ville en hover-effekt ellers sluke det
   første trykket.

   Data: EDU_DATA.formelark = { tittel, kilde, html, ikkePaaArket }
   Fag uten formelark får ingen knapp.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  let knapp = null, vindu = null, åpen = false;
  /* Ett felles tips-element for alle (i)-ene. */
  let tips = null, aktivInfo = null, festet = false, skjulTimer = 0;
  const tekster = new WeakMap();

  const data = () => (window.EDU_DATA || {}).formelark || null;

  function sett(v) {
    åpen = v;
    vindu.hidden = !v;
    knapp.setAttribute("aria-expanded", String(v));
    knapp.classList.toggle("aktiv", v);
    if (v) vindu.querySelector(".fa-lukk").focus({ preventScroll: true });
    else skjulTips();
  }
  const åpne = () => { if (vindu) sett(true); };
  const lukk = () => { if (vindu && åpen) sett(false); };

  /* ---- (i): hva formelen er og når den brukes ---- */
  function plasser(info) {
    const r = info.getBoundingClientRect();
    const bredde = document.documentElement.clientWidth, høyde = window.innerHeight, marg = 8;
    const w = tips.offsetWidth, h = tips.offsetHeight;
    /* Høyrekanten flukter med (i)-en; under den hvis det er plass, ellers over. */
    const x = Math.max(marg, Math.min(r.right - w, bredde - w - marg));
    let y = r.bottom + 6;
    if (y + h > høyde - marg) y = Math.max(marg, r.top - 6 - h);
    tips.style.left = x + "px";
    tips.style.top = y + "px";
  }

  function vis(info) {
    clearTimeout(skjulTimer);
    if (aktivInfo === info && !tips.hidden) return;
    if (aktivInfo) { aktivInfo.removeAttribute("aria-describedby"); aktivInfo.classList.remove("aktiv"); }
    aktivInfo = info;
    festet = false;
    tips.replaceChildren(frag(tekster.get(info)));
    tips.hidden = false;
    info.setAttribute("aria-describedby", "fa-tips");
    info.classList.add("aktiv");
    plasser(info);
  }

  function skjulTips() {
    clearTimeout(skjulTimer);
    festet = false;
    if (tips) tips.hidden = true;
    if (aktivInfo) { aktivInfo.removeAttribute("aria-describedby"); aktivInfo.classList.remove("aktiv"); }
    aktivInfo = null;
  }

  /* Litt slakk, så musa rekker over fra (i)-en til tipset uten at det forsvinner. */
  function skjulSnart(e) {
    if (e.pointerType !== "mouse" || festet) return;
    clearTimeout(skjulTimer);
    skjulTimer = setTimeout(skjulTips, 150);
  }

  function leggTilInfo(ark) {
    ark.querySelectorAll(".fa-rad").forEach((rad) => {
      const tekst = rad.querySelector(".fa-info-tekst");
      if (!tekst) return;
      tekst.remove();
      const formel = el(".fa-formel");
      while (rad.firstChild) formel.appendChild(rad.firstChild);
      const info = el("button.fa-info", { type: "button", "aria-label": "Hva formelen er og når den brukes" }, "i");
      tekster.set(info, tekst.innerHTML);
      info.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") vis(info); });
      info.addEventListener("pointerleave", skjulSnart);
      info.addEventListener("focus", () => vis(info));
      info.addEventListener("blur", () => { if (aktivInfo === info) skjulTips(); });
      info.addEventListener("click", () => {
        if (festet && aktivInfo === info) { skjulTips(); return; }
        vis(info);
        festet = true;
      });
      rad.classList.add("med-info");
      rad.appendChild(formel);
      rad.appendChild(info);
    });
  }

  function bygg(d) {
    const v = el(".fa-vindu", { role: "dialog", "aria-label": "Formelarket" });
    v.hidden = true;
    v.appendChild(el(".fa-topp",
      el("div", el(".fa-tittel", d.tittel || "Formelarket"), d.kilde ? el(".fa-kilde", d.kilde) : null),
      el("button.fa-lukk", { type: "button", "aria-label": "Lukk formelarket", onclick: lukk }, "×")));
    const kropp = el(".fa-kropp");
    const ark = el(".fa-ark", frag(d.html || ""));
    leggTilInfo(ark);
    kropp.appendChild(ark);
    if (d.ikkePaaArket) {
      kropp.appendChild(el(".fa-ikke-tittel", "Står ikke på arket, må kunnes"));
      kropp.appendChild(el(".fa-ikke", frag(d.ikkePaaArket)));
    }
    v.appendChild(kropp);
    /* Tipset ligger inne i vinduet, så et klikk på det teller som «inne» og ikke
       lukker arket. position:fixed slipper det likevel ut av overflow:hidden. */
    tips = el(".fa-tips", { id: "fa-tips", role: "tooltip" });
    tips.hidden = true;
    tips.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") clearTimeout(skjulTimer); });
    tips.addEventListener("pointerleave", skjulSnart);
    v.appendChild(tips);
    /* Et fast plassert tips blir hengende igjen når innholdet under det flytter seg. */
    kropp.addEventListener("scroll", skjulTips, { passive: true });
    v.addEventListener("click", (e) => { if (!e.target.closest(".fa-info, .fa-tips")) skjulTips(); });
    return v;
  }

  function mount(rot) {
    const d = data();
    if (!d || knapp) return;
    vindu = bygg(d);
    knapp = el("button.fa-knapp", { type: "button", "aria-label": "Åpne formelarket", "aria-expanded": "false", title: "Formelarket",
      onclick: (e) => { e.stopPropagation(); sett(!åpen); } });
    knapp.appendChild(el("span.fa-ikon", "ƒ"));
    knapp.appendChild(el("span.fa-knapptekst", "Formelark"));
    rot.appendChild(vindu);
    rot.appendChild(knapp);
    document.body.classList.add("har-formelark");
    /* Esc tar først tipset, så vinduet. */
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (tips && !tips.hidden) skjulTips(); else lukk();
    });
    /* Klikk utenfor lukker, men et klikk inne i vinduet (for eksempel for å
       markere en formel) skal ikke gjøre det. */
    document.addEventListener("click", (e) => { if (åpen && !vindu.contains(e.target) && !knapp.contains(e.target)) lukk(); });
    window.addEventListener("resize", skjulTips);
  }

  S.formelark = { mount, åpne, lukk };
})(window.EDU);
