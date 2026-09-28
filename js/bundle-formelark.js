/* ================ FORMELARKET — ett trykk unna, på alle sider ================
   Fag som får utdelt et formelark på eksamen (FIE402), får en rund knapp nederst
   til høyre. Den åpner et lite vindu med arket, nøyaktig slik det deles ut, og
   under det en kort liste over det som ikke står der. Arket skal være like
   tilgjengelig når du regner en kapitteloppgave eller et eksamenssett som på
   eksamen, og du skal slippe å lete det fram i pensum.

   Knappen og vinduet henger på <body>, utenfor .content, så de overlever at
   visningen tegnes på nytt. Vinduet lukkes med krysset, med Esc, med et nytt
   trykk på knappen, eller ved å klikke utenfor.

   Data: EDU_DATA.formelark = { tittel, kilde, html, ikkePaaArket }
   Fag uten formelark får ingen knapp.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  let knapp = null, vindu = null, åpen = false;

  const data = () => (window.EDU_DATA || {}).formelark || null;

  function sett(v) {
    åpen = v;
    vindu.hidden = !v;
    knapp.setAttribute("aria-expanded", String(v));
    knapp.classList.toggle("aktiv", v);
    if (v) vindu.querySelector(".fa-lukk").focus({ preventScroll: true });
  }
  const åpne = () => { if (vindu) sett(true); };
  const lukk = () => { if (vindu && åpen) sett(false); };

  function bygg(d) {
    const v = el(".fa-vindu", { role: "dialog", "aria-label": "Formelarket" });
    v.hidden = true;
    v.appendChild(el(".fa-topp",
      el("div", el(".fa-tittel", d.tittel || "Formelarket"), d.kilde ? el(".fa-kilde", d.kilde) : null),
      el("button.fa-lukk", { type: "button", "aria-label": "Lukk formelarket", onclick: lukk }, "×")));
    const kropp = el(".fa-kropp");
    kropp.appendChild(el(".fa-ark", frag(d.html || "")));
    if (d.ikkePaaArket) {
      kropp.appendChild(el(".fa-ikke-tittel", "Står ikke på arket, må kunnes"));
      kropp.appendChild(el(".fa-ikke", frag(d.ikkePaaArket)));
    }
    v.appendChild(kropp);
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
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") lukk(); });
    /* Klikk utenfor lukker, men et klikk inne i vinduet (for eksempel for å
       markere en formel) skal ikke gjøre det. */
    document.addEventListener("click", (e) => { if (åpen && !vindu.contains(e.target) && !knapp.contains(e.target)) lukk(); });
  }

  S.formelark = { mount, åpne, lukk };
})(window.EDU);
