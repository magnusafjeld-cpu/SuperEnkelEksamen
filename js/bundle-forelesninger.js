/* ================ FORELESNINGER — det du må kunne, én forelesning om gangen ================
   /forelesninger: en kort, interaktiv gjennomgang per forelesning, for den som
   får lite ut av å se opptaket. Hver forelesning er en rekke små steg som vises
   ett om gangen, med fremdriftslinje øverst. Lesesteg (krok, idé, felle) veksles
   med oppgaver du må svare på før du får forklaringen (gjett, sant/usant,
   sortering, avdekking). Til slutt kommer «Dette må du kunne» og poengsummen.

   Sidene: #/forelesninger (alle, gruppert på fagets deler) og
   #/forelesninger/<nr> (én forelesning).

   Data (fagets, lastes først når modulen åpnes: manifest.lazy["/forelesninger"]):
     EDU_DATA.forelesninger = [{ nr, tittel, kapittel?, minutter, krok,
       steg: [
         { id, type: "krok",   tittel, tekst }
         { id, type: "ide",    tittel, tekst, husk? }
         { id, type: "felle",  tittel, tekst }
         { id, type: "gjett",  sporsmal, alternativer: [3–4], svar, forklaring, feil?: [parallell, null på fasiten] }
         { id, type: "sant",   pastand, svar: true|false, forklaring }
         { id, type: "sorter", tittel, tekst?, grupper: [2–3], kort: [{ t, g }], forklaring }
         { id, type: "avdekk", tittel, tekst?, rader: [{ t, d }] }
       ],
       kunne: [html] }]
   Tekstene er HTML. Alternativene i «gjett» stokkes fast per steg-id, så
   forklaringene må vise til innholdet, aldri til en bokstav eller plass.

   Lagring per forelesning, så to enheter ikke overskriver hverandre:
   exams["fl:<nr>"] = { steg, svar: { <steg-id>: { v, ok } }, ferdig, beste: { r, n }, t }
   «ok» er første forsøk. Et nytt forsøk nullstiller svar og steg, men beholder
   «ferdig» og beste resultat.
   ========================================================================================== */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  const D = () => window.EDU_DATA || {};
  const ALLE = () => (D().forelesninger || []).slice().sort((a, b) => a.nr - b.nr);
  const finn = (nr) => ALLE().find((f) => String(f.nr) === String(nr)) || null;
  const SPØRRE = { gjett: 1, sant: 1, sorter: 1 };
  const erOppgave = (s) => !!SPØRRE[s.type];
  const prosa = (html, cls) => { const n = el(".prose" + (cls || ""), frag(html || "")); S.u.rullTabeller(n); return n; };

  /* ---------- lasting ---------- */
  let lasting = null, lastefeil = null;
  function lazyListe() { return (((window.EDU_SUBJECT || {}).lazy) || {})["/forelesninger"] || []; }
  function sikreData() {
    if ((D().forelesninger || []).length || lasting) return;
    const liste = lazyListe();
    if (!liste.length || !S.picker) return;
    lasting = S.picker.loadScripts(liste)
      .then(() => { lasting = null; S.app.refresh(); })
      .catch((e) => { lasting = null; lastefeil = e; S.app.refresh(); });
  }
  const finnes = () => (D().forelesninger || []).length > 0 || lazyListe().length > 0;

  /* ---------- lagring ---------- */
  const nøkkel = (f) => "fl:" + f.nr;
  const st = (f) => S.store.get().exams[nøkkel(f)] || {};
  const lagre = (f, patch) => S.store.setExam(nøkkel(f), Object.assign({}, patch, { t: Date.now() }));
  function lagreSvar(f, id, v, ok) {
    const svar = Object.assign({}, st(f).svar || {});
    if (svar[id]) return;                       // første forsøk teller
    svar[id] = { v, ok: !!ok };
    lagre(f, { svar });
  }
  const oppgaver = (f) => (f.steg || []).filter(erOppgave);
  function resultat(f) {
    const svar = st(f).svar || {};
    const o = oppgaver(f);
    return { r: o.filter((s) => svar[s.id] && svar[s.id].ok).length, n: o.length, besvart: o.filter((s) => svar[s.id]).length };
  }

  /* ---------- fast stokking per steg-id ---------- */
  function frø(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function stokk(n, id) {
    const r = Array.from({ length: n }, (_, i) => i);
    let x = frø(id) || 1;
    for (let i = n - 1; i > 0; i--) { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; const j = (x >>> 0) % (i + 1); [r[i], r[j]] = [r[j], r[i]]; }
    return r;
  }

  /* ---------- listen ---------- */
  function statusChip(f) {
    const s = st(f), r = resultat(f);
    if (s.ferdig) {
      const b = s.beste || r;
      return el("span.chip.green", "✓ Ferdig" + (b.n ? ` · ${b.r} av ${b.n}` : ""));
    }
    if ((s.steg || 0) > 0 || r.besvart) return el("span.chip.amber", `Steg ${Math.min((s.steg || 0) + 1, f.steg.length)} av ${f.steg.length}`);
    return el("span.chip", "Ikke startet");
  }
  function rad(f) {
    const s = st(f);
    const knapp = s.ferdig ? "Ta på nytt" : ((s.steg || 0) > 0 ? "Fortsett" : "Start");
    return el("button.fl-rad" + (s.ferdig ? ".ferdig" : ""), { onclick: () => S.router.navigate("#/forelesninger/" + f.nr) },
      el(".fl-nr", String(f.nr)),
      el(".fl-radtekst",
        el(".fl-radtittel", f.tittel),
        f.krok ? el(".fl-radkrok", f.krok) : null,
        el(".fl-radmeta", statusChip(f), el("span.tiny.muted", `${f.minutter || "?"} min · ${oppgaver(f).length} oppgaver`))),
      el("span.btn.sm" + (s.ferdig ? ".ghost" : ".primary"), knapp));
  }
  function renderListe() {
    const sub = window.EDU_SUBJECT || {};
    const alle = ALLE();
    const ferdige = alle.filter((f) => st(f).ferdig).length;
    const min = alle.reduce((a, f) => a + (f.minutter || 0), 0);
    const rot = el("div.fl.fade-in");
    rot.appendChild(el(".page-head",
      el(".eyebrow", `${sub.short || sub.name || ""} · Forelesninger`),
      el("h1", "Det du må kunne, forelesning for forelesning"),
      el("p.sub", `${alle.length} korte gjennomganger, rundt ${Math.round(min / 5) * 5} minutter til sammen. Hver tar deg gjennom ideene som betyr noe for eksamen, steg for steg. Du gjetter før du får svaret, sorterer begreper og avslutter med en liste over det du må kunne. Fagteksten er på engelsk, som eksamen.`)));
    const neste = alle.find((f) => !st(f).ferdig);
    rot.appendChild(el(".card.fl-topp",
      el(".row.wrap", { style: { justifyContent: "space-between" } },
        el("div", el("b", `${ferdige} av ${alle.length} ferdige`), el(".tiny.muted", neste ? `Neste: ${neste.nr}. ${neste.tittel}` : "Alle er gjennomgått. Ta dem på nytt rett før eksamen.")),
        neste ? el("button.btn.primary", { onclick: () => S.router.navigate("#/forelesninger/" + neste.nr) }, st(neste).steg ? "Fortsett" : "Start neste") : null),
      el(".bar.green", { style: { marginTop: "12px" } }, el("span", { style: { width: (alle.length ? 100 * ferdige / alle.length : 0) + "%" } }))));
    const deler = (sub.parts || []).filter((p) => (p.chapters || []).some((k) => alle.some((f) => f.kapittel === k)));
    const brukt = new Set();
    deler.forEach((p) => {
      const fs = alle.filter((f) => p.chapters.indexOf(f.kapittel) > -1);
      if (!fs.length) return;
      fs.forEach((f) => brukt.add(f.nr));
      rot.appendChild(el(".fl-del", el(".fl-deltag", p.tag || ""), el("h3", p.name || "")));
      rot.appendChild(el(".fl-liste", fs.map(rad)));
    });
    const rest = alle.filter((f) => !brukt.has(f.nr));
    if (rest.length) {
      if (brukt.size) rot.appendChild(el(".fl-del", el("h3", "Andre")));
      rot.appendChild(el(".fl-liste", rest.map(rad)));
    }
    return rot;
  }

  /* ---------- stegene ---------- */
  const TYPENAVN = { krok: "Start her", ide: "Idé", felle: "Vanlig feil", gjett: "Gjett først", sant: "Sant eller usant", sorter: "Sorter", avdekk: "Avdekk" };

  function forklaring(html, ok) {
    return el(".fl-forkl" + (ok === true ? ".ok" : ok === false ? ".galt" : ""),
      ok == null ? null : el(".fl-dom", ok ? "Riktig" : "Ikke helt"), prosa(html));
  }

  function stegGjett(f, s, ferdig) {
    const svar = (st(f).svar || {})[s.id];
    const rekke = stokk(s.alternativer.length, s.id);
    const boks = el(".fl-alt");
    const ut = el("div");
    function vis(valgt) {
      boks.querySelectorAll("button").forEach((b) => {
        const i = Number(b.dataset.i);
        b.disabled = true;
        b.classList.toggle("riktig", i === s.svar);
        b.classList.toggle("galt", i === valgt && i !== s.svar);
        b.classList.toggle("valgt", i === valgt);
      });
      const felle = valgt !== s.svar && s.feil && s.feil[valgt] ? el(".fl-fellelinje", el("b", "Det du valgte: "), frag(s.feil[valgt])) : null;
      S.u.mount(ut, felle, forklaring(s.forklaring, valgt === s.svar));
    }
    rekke.forEach((i) => boks.appendChild(el("button.fl-valg", { dataset: { i: String(i) }, onclick: () => {
      lagreSvar(f, s.id, i, i === s.svar); vis(i); ferdig();
    } }, frag(s.alternativer[i]))));
    if (svar) { vis(svar.v); }
    return [prosa(s.sporsmal, ".fl-spm"), boks, ut];
  }

  function stegSant(f, s, ferdig) {
    const svar = (st(f).svar || {})[s.id];
    const ut = el("div");
    const knapper = [true, false].map((v) => el("button.fl-valg.fl-tf", { onclick: () => { lagreSvar(f, s.id, v, v === s.svar); vis(v); ferdig(); } }, v ? "Sant" : "Usant"));
    function vis(valgt) {
      knapper.forEach((b, k) => {
        const v = k === 0;
        b.disabled = true;
        b.classList.toggle("riktig", v === s.svar);
        b.classList.toggle("galt", v === valgt && v !== s.svar);
        b.classList.toggle("valgt", v === valgt);
      });
      S.u.mount(ut, forklaring(s.forklaring, valgt === s.svar));
    }
    if (svar) vis(svar.v);
    return [prosa(s.pastand, ".fl-spm.fl-pastand"), el(".fl-alt.fl-tf2", knapper), ut];
  }

  function stegSorter(f, s, ferdig) {
    const svar = (st(f).svar || {})[s.id];
    const rekke = stokk(s.kort.length, s.id);
    const valg = {};                          // kortindeks → gruppeindeks
    const ut = el("div");
    const sjekk = el("button.btn.primary", { disabled: true, onclick: () => {
      const v = s.kort.map((_, i) => valg[i]);
      const ok = s.kort.every((k, i) => valg[i] === k.g);
      lagreSvar(f, s.id, v, ok); låst(v); ferdig();
    } }, "Sjekk");
    const rader = rekke.map((i) => {
      const k = s.kort[i];
      const grp = el(".fl-grp", s.grupper.map((g, gi) => el("button.fl-gknapp", { dataset: { g: String(gi) }, onclick: (e) => {
        valg[i] = gi;
        e.currentTarget.parentNode.querySelectorAll("button").forEach((b) => b.classList.toggle("valgt", Number(b.dataset.g) === gi));
        sjekk.disabled = Object.keys(valg).length < s.kort.length;
      } }, g)));
      return el(".fl-kort", { dataset: { i: String(i) } }, el(".fl-korttekst", frag(k.t)), grp);
    });
    function låst(v) {
      rader.forEach((r) => {
        const i = Number(r.dataset.i), k = s.kort[i];
        r.classList.add(v[i] === k.g ? "riktig" : "galt");
        r.querySelectorAll("button").forEach((b) => {
          const gi = Number(b.dataset.g);
          b.disabled = true;
          b.classList.toggle("valgt", gi === v[i]);
          b.classList.toggle("fasit", gi === k.g);
        });
      });
      sjekk.remove();
      const antall = s.kort.filter((k, i) => v[i] === k.g).length;
      S.u.mount(ut, el(".tiny.muted", { style: { margin: "4px 0 8px" } }, `${antall} av ${s.kort.length} på riktig plass. Riktig gruppe er markert med ramme.`),
        forklaring(s.forklaring, antall === s.kort.length));
    }
    if (svar) låst(svar.v);
    return [s.tekst ? prosa(s.tekst, ".fl-spm") : null, el(".fl-sorter", rader), el(".fl-sjekkrad", svar ? null : sjekk), ut];
  }

  function stegAvdekk(f, s, ferdig, minne) {
    const vist = minne[s.id] != null ? minne[s.id] : 0;
    const liste = el(".fl-avdekk");
    const knapp = el("button.btn.primary", { onclick: () => { minne[s.id] = (minne[s.id] || 0) + 1; tegn(true); } });
    function tegn(ny) {
      const n = minne[s.id] || 0;
      S.u.mount(liste, s.rader.map((r, i) => el(".fl-avrad" + (i < n ? ".vist" : "") + (ny && i === n - 1 ? ".ny" : ""),
        el(".fl-avt", frag(r.t)), i < n ? el(".fl-avd", frag(r.d)) : el(".fl-avd.skjult", "Trykk for å avdekke"))));
      knapp.textContent = n === 0 ? "Vis første" : "Vis neste";
      knapp.style.display = n >= s.rader.length ? "none" : "";
      if (n >= s.rader.length) ferdig();
    }
    minne[s.id] = vist;
    liste.addEventListener("click", () => { if ((minne[s.id] || 0) < s.rader.length) { minne[s.id] = (minne[s.id] || 0) + 1; tegn(true); } });
    tegn(false);
    return [s.tekst ? prosa(s.tekst, ".fl-spm") : null, liste, el(".fl-sjekkrad", knapp)];
  }

  /* ---------- én forelesning ---------- */
  let tastLytter = null;
  function renderForelesning(nr) {
    const f = finn(nr);
    if (!f) return el(".empty", el(".ei", "🔎"), el("h3", "Fant ikke forelesningen"), el("button.btn", { onclick: () => S.router.navigate("#/forelesninger") }, "Til oversikten"));
    const n = f.steg.length;
    let i = Math.min(st(f).steg || 0, n);      // n = sluttskjermen
    const minne = {};                          // avdekk-telling i denne visningen
    const rot = el("div.fl.fl-les.fade-in");
    const segs = el(".fl-segs");
    const kort = el(".fl-steg");
    const forrige = el("button.btn.ghost", { onclick: () => gå(i - 1) }, "← Forrige");
    const neste = el("button.btn.primary.lg", { onclick: () => gå(i + 1) }, "Neste");
    const teller = el("span.tiny.muted");

    rot.appendChild(el(".fl-hode",
      el("button.fl-tilbake", { onclick: () => S.router.navigate("#/forelesninger") }, "← Alle forelesninger"),
      el(".eyebrow", `Forelesning ${f.nr} · ${f.minutter || "?"} min`),
      el("h1", f.tittel)));
    rot.appendChild(segs);
    rot.appendChild(kort);
    rot.appendChild(el(".fl-nav", forrige, teller, neste));

    function besvart(s) { return !!((st(f).svar || {})[s.id]); }
    function tegnSegs() {
      const svar = st(f).svar || {};
      S.u.mount(segs, f.steg.map((s, k) => {
        const a = svar[s.id];
        const cls = (k < i ? ".gjort" : "") + (k === i ? ".nå" : "") + (a ? (a.ok ? ".ok" : ".galt") : "") + (erOppgave(s) ? ".oppg" : "");
        return el("button.fl-seg" + cls, { title: TYPENAVN[s.type] || s.type, "aria-label": `Steg ${k + 1}`, onclick: () => gå(k) });
      }), el("button.fl-seg.mål" + (i >= n ? ".nå" : ""), { title: "Dette må du kunne", "aria-label": "Oppsummering", onclick: () => gå(n) }));
    }
    function oppdaterNav() {
      const s = f.steg[i];
      forrige.disabled = i === 0;
      if (i >= n) { neste.style.display = "none"; teller.textContent = "Oppsummering"; return; }
      neste.style.display = "";
      teller.textContent = `${i + 1} av ${n}`;
      const venter = s && (erOppgave(s) || s.type === "avdekk") && !(erOppgave(s) ? besvart(s) : (minne[s.id] || 0) >= s.rader.length);
      neste.textContent = i === n - 1 ? (venter ? "Hopp over" : "Til oppsummeringen") : (venter ? "Hopp over" : "Neste");
      neste.classList.toggle("ghost", !!venter);
      neste.classList.toggle("primary", !venter);
    }
    function tegnSteg(animer) {
      tegnSegs();
      let innhold;
      if (i >= n) innhold = slutt();
      else {
        const s = f.steg[i];
        const ferdig = () => { tegnSegs(); oppdaterNav(); };
        let kropp;
        if (s.type === "gjett") kropp = stegGjett(f, s, ferdig);
        else if (s.type === "sant") kropp = stegSant(f, s, ferdig);
        else if (s.type === "sorter") kropp = stegSorter(f, s, ferdig);
        else if (s.type === "avdekk") kropp = stegAvdekk(f, s, ferdig, minne);
        else kropp = [prosa(s.tekst), s.husk ? el(".fl-husk", el("b", "Husk: "), frag(s.husk)) : null];
        innhold = el(".fl-kortet.t-" + s.type,
          el(".fl-type", TYPENAVN[s.type] || ""),
          s.tittel && s.type !== "gjett" && s.type !== "sant" ? el("h2", frag(s.tittel)) : null,
          kropp);
      }
      S.u.mount(kort, innhold);
      if (animer) { innhold.classList.add("inn"); }
      oppdaterNav();
    }
    function gå(k) {
      k = Math.max(0, Math.min(n, k));
      if (k === i) return;
      i = k;
      const patch = { steg: i };
      if (i >= n && !st(f).ferdig) {
        const r = resultat(f);
        patch.ferdig = true; patch.beste = { r: r.r, n: r.n };
      } else if (i >= n) {
        const r = resultat(f), b = st(f).beste || { r: 0 };
        if (r.r > b.r) patch.beste = { r: r.r, n: r.n };
      }
      lagre(f, patch);
      tegnSteg(true);
      const topp = rot.getBoundingClientRect().top + window.scrollY - 12;
      if (window.scrollY > topp) window.scrollTo({ top: topp, behavior: "smooth" });
    }
    function slutt() {
      const r = resultat(f);
      const alle = ALLE();
      const idx = alle.findIndex((x) => x.nr === f.nr);
      const nesteF = alle[idx + 1];
      const andel = r.n ? r.r / r.n : 1;
      const dom = andel >= 0.85 ? "Sterkt. Dette sitter." : andel >= 0.6 ? "Godt på vei. Se over de du bommet på." : "Ta den gjerne en gang til om et par dager.";
      const knapper = el(".fl-sluttknapper",
        nesteF ? el("button.btn.primary", { onclick: () => S.router.navigate("#/forelesninger/" + nesteF.nr) }, `Neste: ${nesteF.nr}. ${nesteF.tittel}`) : null,
        el("button.btn.ghost", { onclick: () => { lagre(f, { steg: 0, svar: {} }); i = -1; gå(0); } }, "Ta den på nytt"),
        f.kapittel != null && S.hasModule("/curriculum") ? el("button.btn.ghost", { onclick: () => S.router.navigate("#/chapter/" + f.kapittel) }, "Les kapitlet") : null,
        S.hasModule("/quiz") ? el("button.btn.ghost", { onclick: () => S.router.navigate("#/quiz") }, "Quiz") : null);
      const bom = oppgaver(f).filter((s) => { const a = (st(f).svar || {})[s.id]; return a && !a.ok; });
      return el(".fl-kortet.fl-slutt",
        el(".fl-type", "Oppsummering"),
        el(".fl-score", el(".fl-tall", `${r.r}`, el("span", ` av ${r.n}`)), el("div", el("b", "riktige på første forsøk"), el(".tiny.muted", dom))),
        el("h2", "Dette må du kunne"),
        el("ul.fl-kunne", (f.kunne || []).map((k) => el("li", frag(k)))),
        bom.length ? el(".fl-bom", el("b", "Gå tilbake til: "), bom.map((s) => el("button.chip", { onclick: () => gå(f.steg.indexOf(s)) }, `steg ${f.steg.indexOf(s) + 1}`))) : null,
        knapper);
    }
    /* Piltastene blar. Lytteren fjerner seg selv når visningen er byttet ut. */
    if (tastLytter) document.removeEventListener("keydown", tastLytter);
    tastLytter = (e) => {
      if (!rot.isConnected) { document.removeEventListener("keydown", tastLytter); tastLytter = null; return; }
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); gå(i + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); gå(i - 1); }
    };
    document.addEventListener("keydown", tastLytter);
    tegnSteg(false);
    return rot;
  }

  function render(nr) {
    if (!(D().forelesninger || []).length) {
      sikreData();
      if (lastefeil) return el(".empty", el(".ei", "⚠️"), el("h3", "Fant ikke forelesningene"), el("p.muted", String(lastefeil.message || lastefeil)));
      if (lazyListe().length) return el(".fade-in", el(".card.pad-lg", { style: { textAlign: "center" } },
        el(".spinner", { style: { margin: "10px auto 14px" } }), el("p.muted", "Laster forelesningene …")));
      return el(".empty", el(".ei", "📭"), el("h3", "Ingen forelesninger ennå"), el("p.muted", "Faget har ikke lagt inn EDU_DATA.forelesninger."));
    }
    return nr == null ? renderListe() : renderForelesning(nr);
  }

  S.views = S.views || {};
  S.views.forelesninger = { render, finnes };
})(window.EDU);
