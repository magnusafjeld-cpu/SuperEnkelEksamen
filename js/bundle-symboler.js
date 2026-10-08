/* ============== SYMBOLENE — hold over et symbol i en formel ==============
   I formellinjene (.formula .eq) får hvert symbol faget har forklart, en svak
   prikket understrek. Musepeker over viser hva det står for; på telefon gjør et
   trykk det samme, og et nytt trykk skjuler det. Teksten i delen er urørt: det
   er motoren som finner symbolene når delen tegnes.

   Et symbol er en bokstavgruppe i teksten, med hevet og senket skrift rett
   etter: r<sub>U</sub> er «r_U», V<sup>L</sup><sub>t</sub> er «V^L_t». Hevet
   skrift tas bare med når den er bokstaver (V<sup>L</sup>), ikke en eksponent
   som σ<sup>2</sup>. Oppslaget prøver den fulle formen først, så uten senket,
   så uten hevet, så grunnformen. Da forklarer «V^L» også V^L_0 og V^L_t−1.

   Samme bokstav betyr ulike ting i ulike deler (C er en kjøpsopsjon i én del
   og en kontantstrøm i en annen), så delens egne betydninger slås opp før de
   felles. «E[» er E rett foran en hakeparentes: forventningen, ikke egenkapitalen.

   Data: EDU_DATA.symboler = { alle: { nøkkel: tekst }, deler: { <del-id>: { nøkkel: tekst } } }
   Ukjente bokstavgrupper, som vanlige ord, får stå i fred.
   tools/sjekk-symboler.js leser formlene på samme måte og melder det som mangler.
   ======================================================================== */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  const data = () => (window.EDU_DATA || {}).symboler || null;
  const TOK = /[A-Za-z]+(?:['’][a-z]+)?[*′]?|[Ͱ-Ͽ][*′]?/g;

  /* ---------- oppslag ---------- */
  function kandidater(grunn, hevet, senket, neste) {
    const ut = [];
    if (neste === "[") ut.push(grunn + "[");
    if (hevet && senket) ut.push(`${grunn}^${hevet}_${senket}`);
    if (senket) ut.push(`${grunn}_${senket}`);
    if (hevet) ut.push(`${grunn}^${hevet}`);
    ut.push(grunn);
    return ut;
  }
  function slåOpp(d, delId, grunn, hevet, senket, neste) {
    const egne = (d.deler || {})[delId] || {}, alle = d.alle || {};
    for (const k of kandidater(grunn, hevet, senket, neste)) {
      if (Object.prototype.hasOwnProperty.call(egne, k)) return egne[k];
      if (Object.prototype.hasOwnProperty.call(alle, k)) return alle[k];
    }
    return null;
  }

  /* ---------- merking ---------- */
  /* Senket og hevet skrift som følger rett etter tekstnoden: høyst én av hver,
     i hvilken som helst rekkefølge. */
  function hale(tn) {
    let hevet = "", senket = "";
    const noder = [];
    for (let n = tn.nextSibling; n && n.nodeType === 1 && noder.length < 2; n = n.nextSibling) {
      const t = n.textContent.trim();
      if (n.tagName === "SUB" && !senket) senket = t;
      else if (n.tagName === "SUP" && !hevet && /^[A-Za-z*]+$/.test(t)) hevet = t;
      else break;
      noder.push(n);
    }
    return { hevet, senket, noder };
  }

  function merkTekst(tn, d, delId) {
    const tekst = tn.nodeValue;
    const treff = [];
    TOK.lastIndex = 0;
    for (let m; (m = TOK.exec(tekst));) {
      const slutt = m.index + m[0].length;
      const h = slutt === tekst.length ? hale(tn) : { hevet: "", senket: "", noder: [] };
      const forkl = slåOpp(d, delId, m[0], h.hevet, h.senket, tekst[slutt]);
      if (forkl) treff.push({ fra: m.index, til: slutt, forkl, noder: h.noder });
    }
    if (!treff.length) return;
    const ny = document.createDocumentFragment();
    let pos = 0;
    treff.forEach((t) => {
      if (t.fra > pos) ny.appendChild(document.createTextNode(tekst.slice(pos, t.fra)));
      const s = el("span.sym", tekst.slice(t.fra, t.til));
      t.noder.forEach((n) => s.appendChild(n));
      forklaringer.set(s, t.forkl);
      ny.appendChild(s);
      pos = t.til;
    });
    if (pos < tekst.length) ny.appendChild(document.createTextNode(tekst.slice(pos)));
    tn.replaceWith(ny);
  }

  function gå(node, d, delId) {
    /* Fast liste: merkingen flytter senket og hevet skrift inn i symbolet. */
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) merkTekst(n, d, delId);
      else if (n.nodeType === 1 && n.tagName !== "SUB" && n.tagName !== "SUP" && !n.classList.contains("sym")) gå(n, d, delId);
    });
  }

  function merk(rot, delId) {
    const d = data();
    if (!d || !rot) return;
    rot.querySelectorAll(".formula .eq").forEach((eq) => gå(eq, d, delId));
    if (rot.querySelector(".sym")) kobleTil();
  }

  /* ---------- tipset ---------- */
  const forklaringer = new WeakMap();
  let tips = null, aktiv = null, festet = false, skjulTimer = 0, koblet = false;

  function plasser(s) {
    const r = s.getBoundingClientRect();
    const bredde = document.documentElement.clientWidth, høyde = window.innerHeight, marg = 8;
    const w = tips.offsetWidth, h = tips.offsetHeight;
    const x = Math.max(marg, Math.min(r.left + r.width / 2 - w / 2, bredde - w - marg));
    let y = r.bottom + 6;
    if (y + h > høyde - marg) y = Math.max(marg, r.top - 6 - h);
    tips.style.left = x + "px";
    tips.style.top = y + "px";
  }

  function vis(s) {
    clearTimeout(skjulTimer);
    if (aktiv === s && !tips.hidden) return;
    if (aktiv) aktiv.classList.remove("aktiv");
    aktiv = s;
    festet = false;
    tips.replaceChildren(el("b.sym-navn", frag(s.innerHTML)), " ", frag(forklaringer.get(s) || ""));
    tips.hidden = false;
    s.classList.add("aktiv");
    plasser(s);
  }

  function skjul() {
    clearTimeout(skjulTimer);
    festet = false;
    if (tips) tips.hidden = true;
    if (aktiv) aktiv.classList.remove("aktiv");
    aktiv = null;
  }

  /* Hover bare med mus: på iOS ville en hover-effekt sluke det første trykket. */
  function kobleTil() {
    if (koblet) return;
    koblet = true;
    tips = el(".sym-tips", { role: "tooltip" });
    tips.hidden = true;
    document.body.appendChild(tips);
    const sym = (e) => (e.target.closest ? e.target.closest(".sym") : null);
    document.addEventListener("pointerover", (e) => {
      if (e.pointerType !== "mouse") return;
      const s = sym(e);
      if (s && forklaringer.has(s)) vis(s);
      else if (e.target.closest && e.target.closest(".sym-tips")) clearTimeout(skjulTimer);
    });
    document.addEventListener("pointerout", (e) => {
      if (e.pointerType !== "mouse" || festet || !aktiv) return;
      const til = e.relatedTarget;
      if (til && til.closest && (til.closest(".sym") === aktiv || til.closest(".sym-tips"))) return;
      clearTimeout(skjulTimer);
      skjulTimer = setTimeout(skjul, 150);
    });
    document.addEventListener("click", (e) => {
      const s = sym(e);
      if (s && forklaringer.has(s)) {
        if (festet && aktiv === s) { skjul(); return; }
        vis(s);
        festet = true;
        return;
      }
      if (!(e.target.closest && e.target.closest(".sym-tips"))) skjul();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && tips && !tips.hidden) skjul(); });
    /* Et fast plassert tips blir hengende igjen når siden under det flytter seg. */
    window.addEventListener("scroll", skjul, { passive: true, capture: true });
    window.addEventListener("resize", skjul);
    window.addEventListener("hashchange", skjul);
  }

  S.symboler = { merk };
})(window.EDU);
