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
   «E(» og «U(» er det samme med vanlig parentes, for fag som skriver E(r) og U(W).
   En kombinerende strek eller hatt hører til bokstaven: t̄ er ett symbol.

   Data: EDU_DATA.symboler = { alle: { nøkkel: tekst }, deler: { <del-id>: { nøkkel: tekst } } }
   Ukjente bokstavgrupper, som vanlige ord, får stå i fred.

   To måter å merke på (22. oktober 2026, for sjangertreningen og formelarket):
   - formellinjer (.formula .eq, .fa-formel): hvert kjent symbol merkes.
   - løpende tekst (merk(rot, id, { overalt: true })): bare det som sikkert er et
     symbol. Det er et tegn med senket eller hevet skrift (r<sub>E</sub>), en gresk
     bokstav, en forkortelse med store bokstaver (WACC, NPV, TS) eller E foran en
     hakeparentes. En enkelt bokstav uten hale merkes bare når den står i et
     regnestykke, med =, ×, /, +, −, parentes eller ulikhetstegn rett ved siden av.
     Ellers ville «A firm» og «I» fått forklaringer.
   Knapper og lenker merkes aldri: et trykk på et symbol i et svaralternativ
   ville ellers også valgt alternativet.
   tools/sjekk-symboler.js leser formlene på samme måte og melder det som mangler.
   ======================================================================== */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  const data = () => (window.EDU_DATA || {}).symboler || null;
  /* Bokstavgrupper med æ, ø og å er hele ord: uten dem ble «lån» til «l» + «n»,
     og «n» kunne fått forklaringen til antall terminer. */
  const TOK = /[A-Za-zÆØÅæøåÄÖÜäöüÉé\u0300-\u036F]+(?:['’][a-zæøå]+)?[*′]?|[\u0370-\u03FF][\u0300-\u036F]*[*′]?/g;

  /* ---------- oppslag ---------- */
  function kandidater(grunn, hevet, senket, neste) {
    const ut = [];
    if (neste === "[" || neste === "(") ut.push(grunn + neste);
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

  /* Er treffet sikkert et symbol i løpende tekst? */
  const REGNETEGN = /[=×\/+\-−()·≤≥<>^]/;
  const GRESK = /^[\u0370-\u03FF]/;
  function sikkert(tok, h, tekst, fra, til) {
    /* «P/E» er pris over inntjening: verken aksjekursen eller egenkapitalen alene. */
    if ((tok === "P" && tekst.slice(til, til + 2) === "/E") || (tok === "E" && tekst.slice(fra - 2, fra) === "P/")) return false;
    if (h.hevet || h.senket || GRESK.test(tok)) return true;
    if (tekst[til] === "[") return true;
    if (tok.length >= 2) return tok === tok.toUpperCase() && /^[A-Z]+$/.test(tok);
    /* «k7», «E4» og «P1» er henvisninger til kapitler og oppgaver, ikke symboler. */
    if (/^[A-Za-z]$/.test(tok) && /\d/.test(tekst[til] || "")) return false;
    /* «3a)» og «6b)» er deloppgaver: en bokstav rett etter et siffer. */
    if (/^[a-i]$/.test(tok) && /\d/.test(tekst[fra - 1] || "")) return false;
    /* «delspørsmål c)» og «oppgave d)»: bokstav etter et ord og rett foran «)». «(b + d)» er fortsatt et symbol. */
    if (/^[a-i]$/.test(tok) && tekst[til] === ")" && /[A-Za-zæøåÆØÅ] $/.test(tekst.slice(Math.max(0, fra - 2), fra))) return false;
    /* «(d)» er en deloppgave, ikke gjeldsandelen d. */
    if (/^[a-i]$/.test(tok) && tekst[fra - 1] === "(" && tekst[til] === ")") return false;
    let før = fra - 1; while (før >= 0 && tekst[før] === " ") før--;
    let etter = til; while (etter < tekst.length && tekst[etter] === " ") etter++;
    return REGNETEGN.test(tekst[før] || "") || REGNETEGN.test(tekst[etter] || "");
  }

  function merkTekst(tn, d, delId, formel) {
    const tekst = tn.nodeValue;
    const treff = [];
    TOK.lastIndex = 0;
    for (let m; (m = TOK.exec(tekst));) {
      const slutt = m.index + m[0].length;
      const h = slutt === tekst.length ? hale(tn) : { hevet: "", senket: "", noder: [] };
      const forkl = slåOpp(d, delId, m[0], h.hevet, h.senket, tekst[slutt]);
      if (forkl && (formel || sikkert(m[0], h, tekst, m.index, slutt))) treff.push({ fra: m.index, til: slutt, forkl, noder: h.noder });
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

  const FORMEL = (n) => n.classList.contains("eq") || n.classList.contains("fa-formel") || n.classList.contains("calc");
  const HOPP = /^(SUB|SUP|BUTTON|A|INPUT|TEXTAREA|SELECT|SVG|SCRIPT|STYLE)$/;
  function gå(node, d, delId, formel) {
    /* Fast liste: merkingen flytter senket og hevet skrift inn i symbolet. */
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) merkTekst(n, d, delId, formel);
      else if (n.nodeType === 1 && !HOPP.test(n.tagName.toUpperCase()) && !n.classList.contains("sym")
        && !n.classList.contains("fa-navn") && !n.classList.contains("fa-info-tekst")) gå(n, d, delId, formel || FORMEL(n));
    });
  }

  /* valg.overalt: merk hele rot, ikke bare formellinjene. */
  function merk(rot, delId, valg) {
    const d = data();
    if (!d || !rot) return;
    if (valg && valg.overalt) gå(rot, d, delId, FORMEL(rot));
    else rot.querySelectorAll(".formula .eq, .fa-formel").forEach((eq) => gå(eq, d, delId, true));
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
