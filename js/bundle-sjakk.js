/* ===================== VARIANTER — sjakkrepertoar på brettet =====================
   Treneren for et åpningsrepertoar (/linjer). Du spiller trekkene selv; motstanderens
   trekk spilles for deg. Et feil trekk gir et nytt forsøk, så et hint, så svaret.
   Linjer du kan, kommer sjeldnere tilbake; linjer du bommer på, kommer tilbake i morgen
   (Leitner-bokser, intervallene i INTERVALL).

   Tre moduser:
     Lær      gå gjennom en ny linje trekk for trekk med kommentarene, og spill den
              så selv én gang.
     Øv       linjene som er forfalt, eller alle i én gruppe. Ett forsøk per linje.
     Utforsk  repertoaret som et tre: klikk deg gjennom trekkene og se kommentarene.

   Reglene er js/sjakk-kjerne.js (window.SJAKK), de samme som tools/sjekk-sjakk.js
   sjekker repertoaret med.

   Data: EDU_DATA.repertoar = { grupper: [{ id, navn, farge, kort, kapittel,
           rekkefolge, intro }], linjer: [{ id, gruppe, navn, nivaa, kapittel,
           trekk, kommentar: { "4.cxd5": "…" }, plan }] }
   Lagring: state.exams["sj:<linje-id>"] = { boks, neste, n, feil, t }

   Diagrammer i pensum: <div class="sjakk-diagram" data-trekk="1.d4 d5" data-tekst="…"
   data-farge="b"> tegnes som et brett når siden vises, uansett modul.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const C = () => window.SJAKK;
  const { el } = S.u;
  const sh = () => S.views.shared;

  const DAG = 86400000;
  const INTERVALL = [0, 1, 3, 7, 16, 35].map((d) => d * DAG);
  const MOTSTANDER_MS = 450;
  /* Brikkene som tekst. Variantvelgeren ︎ hindrer at iOS tegner bonden som emoji. */
  const GLYF = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };

  /* ---------- data ---------- */
  const R = () => (window.EDU_DATA || {}).repertoar || null;
  const grupper = () => ((R() || {}).grupper || []).slice().sort((a, b) => (a.rekkefolge || 99) - (b.rekkefolge || 99));
  const gruppe = (id) => grupper().find((g) => g.id === id) || null;
  const finnes = () => !!(R() && (R().linjer || []).length);
  const spilt = new Map();
  function linjen(l) {
    if (!spilt.has(l.id)) {
      let steg = [];
      try { steg = C().spill(l.trekk).steg; } catch (e) { console.warn("sjakk:", l.id, e.message); }
      spilt.set(l.id, steg);
    }
    return spilt.get(l.id);
  }
  /* Linjene i læringsrekkefølge: nivå, så gruppe, så rekkefølgen i fila. */
  function linjer(gid) {
    const rek = new Map(grupper().map((g, i) => [g.id, i]));
    return ((R() || {}).linjer || []).map((l, i) => ({ l, i }))
      .filter(({ l }) => !gid || l.gruppe === gid)
      .sort((a, b) => (a.l.nivaa || 2) - (b.l.nivaa || 2) || (rek.get(a.l.gruppe) || 0) - (rek.get(b.l.gruppe) || 0) || a.i - b.i)
      .map(({ l }) => l);
  }
  const linjeMedId = (id) => ((R() || {}).linjer || []).find((l) => l.id === id) || null;

  /* ---------- fremdrift ---------- */
  const logg = (id) => S.store.get().exams["sj:" + id] || null;
  const lært = (id) => { const g = logg(id); return !!(g && g.boks >= 1); };
  const forfalt = (id) => { const g = logg(id); return !!(g && g.boks >= 1 && (g.neste || 0) <= Date.now()); };
  function registrer(id, feil, ny) {
    const g = logg(id) || { boks: 0, n: 0, feil: 0 };
    const boks = feil ? 1 : ny ? 1 : Math.min((g.boks || 0) + 1, INTERVALL.length - 1);
    /* Med feil: boks 1, tilbake i morgen. I økten kommer den i tillegg én gang til. */
    S.store.setExam("sj:" + id, { boks, neste: Date.now() + (feil ? DAG : INTERVALL[boks]), n: (g.n || 0) + 1,
      feil: (g.feil || 0) + (feil ? 1 : 0), t: Date.now() });
  }
  function status(gid) {
    const ls = linjer(gid);
    return { totalt: ls.length, lært: ls.filter((l) => lært(l.id)).length, forfalt: ls.filter((l) => forfalt(l.id)).length };
  }
  const nesteNye = (gid) => linjer(gid).find((l) => !lært(l.id)) || null;
  const neste = (id) => { const g = logg(id); return g && g.neste ? g.neste : null; };

  /* ---------- brettet ---------- */
  /* Tegner en stilling. Er interaktiv satt, kan brukeren flytte brikkene til den
     fargen som er i trekket, og onTrekk får trekket når det er lovlig. */
  function brett(p, opt) {
    opt = opt || {};
    const fra = opt.farge === "b" ? "b" : "w";
    const nett = el(".sj-brett" + (opt.liten ? ".liten" : ""), { role: "grid", "aria-label": "Sjakkbrett" });
    const lovlige = opt.interaktiv ? C().trekk(p) : [];
    const mål = opt.valgt != null ? lovlige.filter((m) => m.fra === opt.valgt).map((m) => m.til) : [];
    for (let rr = 0; rr < 8; rr++) {
      for (let ff = 0; ff < 8; ff++) {
        const r = fra === "w" ? 7 - rr : rr, f = fra === "w" ? ff : 7 - ff;
        const sq = r * 8 + f;
        const lys = (r + f) % 2 === 1;
        let kls = ".sj-felt" + (lys ? ".lys" : ".mork");
        if (opt.siste && (opt.siste.fra === sq || opt.siste.til === sq)) kls += ".siste";
        if (opt.valgt === sq) kls += ".valgt";
        if (mål.includes(sq)) kls += p.b[sq] ? ".slagmal" : ".mal";
        if (opt.hint && opt.hint.fra === sq) kls += ".hint";
        if (opt.feil && (opt.feil.fra === sq || opt.feil.til === sq)) kls += ".feil";
        const x = p.b[sq];
        const felt = el(kls, { dataset: { sq: String(sq) } });
        if (x) felt.appendChild(el("span.sj-brikke" + (x === x.toUpperCase() ? ".hvit" : ".svart"), GLYF[x.toLowerCase()] + "︎"));
        if (ff === 0) felt.appendChild(el("span.sj-koord.rad", String(r + 1)));
        if (rr === 7) felt.appendChild(el("span.sj-koord.fil", "abcdefgh"[f]));
        if (opt.interaktiv) felt.addEventListener("click", () => opt.onFelt && opt.onFelt(sq, lovlige));
        nett.appendChild(felt);
      }
    }
    return nett;
  }

  /* Klikk-logikken: velg en brikke, så et felt. */
  function klikk(p, sq, lovlige, valgt, egen) {
    const x = p.b[sq];
    if (valgt != null) {
      const ms = lovlige.filter((m) => m.fra === valgt && m.til === sq);
      if (ms.length) return { trekk: ms.find((m) => !m.forfr || m.forfr === "Q") || ms[0] };
    }
    if (x && C().farge(x) === p.tur && p.tur === egen) return { valgt: sq === valgt ? null : sq };
    return { valgt: null };
  }

  /* ---------- diagrammer i pensum ---------- */
  function tegnDiagram(d) {
    if (d.dataset.tegnet) return;
    d.dataset.tegnet = "1";
    try {
      const { steg, slutt } = C().spill(d.dataset.trekk || "");
      const siste = steg[steg.length - 1];
      d.innerHTML = "";
      d.appendChild(brett(slutt, { farge: d.dataset.farge, liten: true, siste: siste && siste.m }));
      const trekk = steg.map((s, i) => (s.tur === "w" ? s.nr + "." : i === 0 ? s.nr + "..." : "") + s.san).join(" ");
      d.appendChild(el(".sj-diagram-tekst", d.dataset.tekst ? el("b", d.dataset.tekst) : null,
        d.dataset.tekst && trekk ? el("br") : null, trekk ? el("span.sj-trekktekst", trekk) : null));
    } catch (e) {
      d.textContent = "Diagrammet kunne ikke tegnes: " + e.message;
    }
  }
  function tegnAlleDiagrammer(rot) {
    if (!C()) return;
    (rot || document).querySelectorAll(".sjakk-diagram:not([data-tegnet])").forEach(tegnDiagram);
  }
  if (typeof MutationObserver !== "undefined") {
    new MutationObserver(() => tegnAlleDiagrammer()).observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ---------- økten ---------- */
  /* I minnet, ikke lagret: hvor du er. Fremdriften lagres per linje. */
  let økt = null;
  let tidtaker = null;
  const stopp = () => { if (tidtaker) { clearTimeout(tidtaker); tidtaker = null; } };
  let boks = null;            // elementet visningen tegnes i; byttes ved hver render
  const tegn = () => { if (boks && økt) S.u.mount(boks, visØkt()); };

  function startLær(id) {
    stopp();
    const l = linjeMedId(id);
    if (!l) return;
    økt = { modus: "lær", kø: [id], i: 0, pos: 0, ny: true };
    S.app.refresh(); window.scrollTo({ top: 0 });
  }
  function startØv(ider, tittel) {
    stopp();
    if (!ider.length) { S.u.toast("Ingen linjer å øve på"); return; }
    økt = { modus: "øv", kø: ider.slice(), i: 0, tittel, resultat: [] };
    startLinje();
    S.app.refresh(); window.scrollTo({ top: 0 });
  }
  function startUtforsk(gid) {
    stopp();
    økt = { modus: "utforsk", gruppe: gid, sti: [] };
    S.app.refresh(); window.scrollTo({ top: 0 });
  }
  function avslutt() { stopp(); økt = null; S.app.refresh(); window.scrollTo({ top: 0 }); }

  /* Øv: en linje fra start. Motstanderens trekk spilles automatisk. */
  function startLinje() {
    const l = linjeMedId(økt.kø[økt.i]);
    const g = gruppe(l.gruppe);
    Object.assign(økt, { linje: l, farge: g ? g.farge : "w", steg: linjen(l), pos: 0, valgt: null,
      forsøk: 0, feilHer: 0, feilTotalt: 0, melding: null, hint: null, feilFelt: null, ferdig: false, kommentar: null });
    motstander();
  }
  function stillingNå() { return økt.pos === 0 ? C().fraFEN(C().START) : økt.steg[økt.pos - 1].etter; }
  function kommentarTil(s) { return s ? (økt.linje.kommentar || {})[C().merke(s)] || null : null; }
  function motstander() {
    stopp();
    const s = økt.steg[økt.pos];
    if (!s) return ferdigLinje();
    if (s.tur === økt.farge) return;
    tidtaker = setTimeout(() => {
      tidtaker = null;
      økt.kommentar = kommentarTil(s) ? { merke: C().merke(s), tekst: kommentarTil(s), deres: true } : økt.kommentar;
      økt.pos++;
      tegn();
      motstander();
    }, økt.pos === 0 ? 250 : MOTSTANDER_MS);
  }
  function prøv(m) {
    const s = økt.steg[økt.pos];
    if (!s || økt.ferdig) return;
    const p = stillingNå();
    if (m.fra === s.m.fra && m.til === s.m.til && (m.forfr || null) === (s.m.forfr || null)) {
      if (økt.forsøk > 0) økt.feilTotalt++;
      økt.forsøk = 0; økt.hint = null; økt.feilFelt = null; økt.valgt = null;
      økt.melding = null;
      økt.kommentar = kommentarTil(s) ? { merke: C().merke(s), tekst: kommentarTil(s) } : null;
      økt.pos++;
      tegn();
      motstander();
      return;
    }
    økt.forsøk++;
    økt.valgt = null;
    økt.feilFelt = { fra: m.fra, til: m.til };
    const san = C().tilSAN(p, m);
    if (økt.forsøk === 1) økt.melding = { type: "feil", tekst: `${san} er ikke repertoartrekket ditt her. Prøv igjen.` };
    else if (økt.forsøk === 2) { økt.hint = { fra: s.m.fra }; økt.melding = { type: "feil", tekst: "Hint: det er den markerte brikken som skal flyttes." }; }
    else return visSvar();
    tegn();
  }
  /* Tredje bom, eller «Vis svaret»: trekket spilles for deg og teller som feil. */
  function visSvar() {
    const s = økt.steg[økt.pos];
    if (!s || økt.ferdig) return;
    økt.melding = { type: "svar", tekst: `Repertoartrekket er ${s.san}. Det er spilt for deg.` };
    økt.feilTotalt++;
    økt.forsøk = 0; økt.hint = null; økt.valgt = null;
    økt.kommentar = kommentarTil(s) ? { merke: C().merke(s), tekst: kommentarTil(s) } : null;
    økt.pos++;
    tegn();
    tidtaker = setTimeout(() => { tidtaker = null; if (økt) { økt.feilFelt = null; tegn(); motstander(); } }, 700);
  }
  function ferdigLinje() {
    if (økt.ferdig) return;
    økt.ferdig = true;
    registrer(økt.linje.id, økt.feilTotalt > 0, økt.ny);
    if (økt.resultat) økt.resultat.push({ id: økt.linje.id, feil: økt.feilTotalt });
    /* En linje med feil kommer én gang til på slutten av økten. */
    if (økt.feilTotalt > 0 && økt.modus === "øv" && økt.kø.filter((x) => x === økt.linje.id).length < 2) økt.kø.push(økt.linje.id);
    tegn();
  }
  function nesteLinje() {
    if (økt.i + 1 < økt.kø.length) { økt.i++; økt.ny = false; startLinje(); tegn(); }
    else { økt.modus = "oppsummering"; tegn(); }
  }

  /* ---------- visningene ---------- */
  function render() {
    if (!C()) return sh().empty("⚠️", "Sjakkreglene mangler", "js/sjakk-kjerne.js er ikke lastet.");
    if (!finnes()) return sh().empty("♞", "Ingen varianter ennå", "Faget har ikke lagt inn EDU_DATA.repertoar.");
    if (økt) { boks = el("div"); boks.appendChild(visØkt()); return boks; }
    boks = null;
    return oversikt();
  }

  function oversikt() {
    const wrap = el(".fade-in");  // bare her: øktvisningene tegnes på nytt ved hvert trekk
    const st = status();
    wrap.appendChild(sh().pageHead("Varianter", `${st.lært} av ${st.totalt} linjer lært`,
      "Spill repertoaret ditt på brettet. Motstanderens trekk spilles for deg. Bommer du, får du et nytt forsøk, så et hint og til slutt svaret. Linjer du kan, kommer sjeldnere tilbake."));

    const forfalte = linjer().filter((l) => forfalt(l.id));
    const ny = nesteNye();
    const topp = el(".card.pad-lg", { style: { marginBottom: "18px" } },
      el(".row.wrap", { style: { gap: "12px", alignItems: "center" } },
        el("div", { style: { flex: "1 1 240px" } },
          el("div", { style: { fontWeight: 650, fontSize: "17px" } },
            forfalte.length ? `${forfalte.length} linjer skal repeteres` : st.lært ? "Ingenting å repetere akkurat nå" : "Start med første linje"),
          el(".tiny.muted", ny ? `Neste nye: ${ny.navn}` : "Du har lært alle linjene.")),
        forfalte.length ? el("button.btn.primary", { onclick: () => startØv(forfalte.map((l) => l.id), "Repetisjon") }, `Repeter ${forfalte.length} →`) : null,
        ny ? el("button.btn" + (forfalte.length ? "" : ".primary"), { onclick: () => startLær(ny.id) }, "Lær en ny linje") : null));
    wrap.appendChild(topp);

    const rad = el(".sj-grupper");
    for (const g of grupper()) {
      const s = status(g.id);
      const nyG = nesteNye(g.id);
      const kort = el(".card.sj-gruppe",
        el(".row", { style: { gap: "8px", alignItems: "baseline" } },
          el("h3", { style: { margin: 0, fontSize: "16px" } }, g.navn),
          el(".spacer"),
          el(".chip" + (g.farge === "w" ? ".slate" : ""), g.farge === "w" ? "Hvit" : "Svart")),
        g.kort ? el(".tiny.muted.sj-trekktekst", { style: { margin: "4px 0 0" } }, g.kort) : null,
        g.intro ? el("p.tiny", { style: { margin: "8px 0 0", color: "var(--ink-2)" } }, g.intro) : null,
        el("div", { style: { margin: "10px 0 6px" } }, S.u.bar(s.totalt ? 100 * s.lært / s.totalt : 0, { thin: true, green: s.lært === s.totalt })),
        el(".tiny.muted", `${s.lært} av ${s.totalt} lært${s.forfalt ? ` · ${s.forfalt} skal repeteres` : ""}`),
        el(".row.wrap", { style: { gap: "6px", marginTop: "10px" } },
          nyG ? el("button.btn.sm.primary", { onclick: () => startLær(nyG.id) }, "Lær neste") : null,
          s.lært ? el("button.btn.sm", { onclick: () => startØv(linjer(g.id).filter((l) => lært(l.id)).map((l) => l.id), g.navn) }, "Øv på alle") : null,
          el("button.btn.sm.ghost", { onclick: () => startUtforsk(g.id) }, "Utforsk"),
          g.kapittel != null ? el("a.btn.sm.ghost", { href: "#/chapter/" + g.kapittel }, "Les kapitlet") : null));
      rad.appendChild(kort);
    }
    wrap.appendChild(rad);

    /* Alle linjene, med status. */
    const d = el("details.card.sj-alle", { style: { marginTop: "18px" } });
    d.appendChild(el("summary", { style: { cursor: "pointer", fontWeight: 600 } }, "Alle linjene"));
    for (const g of grupper()) {
      d.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "12px" } }, g.navn));
      for (const l of linjer(g.id)) {
        const gl = logg(l.id);
        const merke = !gl ? "–" : forfalt(l.id) ? "↻" : "✓";
        d.appendChild(el(".row.sj-linjerad", { style: { gap: "8px", alignItems: "center" } },
          el("span.sj-merke", { title: !gl ? "Ikke lært" : forfalt(l.id) ? "Skal repeteres" : `Neste repetisjon ${new Date(neste(l.id)).toLocaleDateString("nb-NO")}` }, merke),
          el("span", { style: { flex: 1, minWidth: 0 } }, l.navn, el("span.tiny.muted", ` · nivå ${l.nivaa || 2}`)),
          el("button.btn.ghost.sm", { onclick: () => startLær(l.id) }, gl ? "Se igjen" : "Lær"),
          gl ? el("button.btn.ghost.sm", { onclick: () => startØv([l.id], l.navn) }, "Øv") : null));
      }
    }
    wrap.appendChild(d);
    return wrap;
  }

  function hode(tittel, under) {
    return el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginBottom: "12px" } },
      el("button.btn.ghost.sm", { onclick: avslutt }, "← Varianter"),
      el("div", { style: { flex: "1 1 200px", minWidth: 0 } },
        el("div", { style: { fontWeight: 650 } }, tittel), under ? el(".tiny.muted", under) : null));
  }

  function visØkt() {
    if (økt.modus === "lær") return visLær();
    if (økt.modus === "utforsk") return visUtforsk();
    if (økt.modus === "oppsummering") return visOppsummering();
    return visØv();
  }

  /* Lær: trekk for trekk, med kommentaren til hvert trekk. */
  function visLær() {
    const l = linjeMedId(økt.kø[0]);
    const g = gruppe(l.gruppe);
    const steg = linjen(l);
    const p = økt.pos ? steg[økt.pos - 1].etter : C().fraFEN(C().START);
    const s = økt.pos ? steg[økt.pos - 1] : null;
    const wrap = el("div");
    wrap.appendChild(hode(l.navn, `${g ? g.navn : ""} · ${g && g.farge === "b" ? "du er svart" : "du er hvit"} · nivå ${l.nivaa || 2}`));
    const kort = el(".card.pad-lg.sj-økt");
    kort.appendChild(brett(p, { farge: g && g.farge, siste: s && s.m }));
    const k = s ? (l.kommentar || {})[C().merke(s)] : null;
    kort.appendChild(el(".sj-panel",
      el(".sj-trekktekst.sj-linjetekst", ...steg.map((x, i) => el("span" + (i === økt.pos - 1 ? ".her" : i < økt.pos ? ".spilt" : ""),
        { onclick: () => { økt.pos = i + 1; tegn(); } }, (x.tur === "w" ? x.nr + "." : i === 0 ? x.nr + "..." : "") + x.san + " "))),
      k ? el(".sj-kommentar", el("b", C().merke(s) + " "), k) : el(".sj-kommentar.tom", økt.pos ? "Ingen kommentar til dette trekket." : "Trykk «Neste trekk» for å begynne."),
      økt.pos === steg.length && l.plan ? el(".sj-plan", el("b", "Planen videre: "), l.plan) : null,
      el(".row.wrap", { style: { gap: "8px", marginTop: "12px" } },
        el("button.btn.ghost.sm", { disabled: økt.pos === 0, onclick: () => { økt.pos = Math.max(0, økt.pos - 1); tegn(); } }, "← Forrige"),
        økt.pos < steg.length
          ? el("button.btn.primary.sm", { onclick: () => { økt.pos++; tegn(); } }, "Neste trekk →")
          : el("button.btn.primary.sm", { onclick: () => { const ny = !lært(l.id); stopp(); økt = { modus: "øv", kø: [l.id], i: 0, tittel: l.navn, resultat: [], ny }; startLinje(); tegn(); } }, "Spill den selv →"),
        el("span.tiny.muted", "Piltastene blar også."))));
    wrap.appendChild(kort);
    return wrap;
  }

  function visØv() {
    const l = økt.linje;
    const g = gruppe(l.gruppe);
    const p = stillingNå();
    const s = økt.pos ? økt.steg[økt.pos - 1] : null;
    const din = !økt.ferdig && økt.steg[økt.pos] && økt.steg[økt.pos].tur === økt.farge;
    const wrap = el("div");
    wrap.appendChild(hode(økt.tittel || "Øv", `Linje ${økt.i + 1} av ${økt.kø.length} · ${g ? g.navn : ""} · ${økt.farge === "b" ? "du er svart" : "du er hvit"}`));
    const kort = el(".card.pad-lg.sj-økt");
    kort.appendChild(brett(p, { farge: økt.farge, siste: s && s.m, interaktiv: din, valgt: økt.valgt, hint: økt.hint, feil: økt.feilFelt,
      onFelt: (sq, lovlige) => {
        const r = klikk(p, sq, lovlige, økt.valgt, økt.farge);
        if (r.trekk) prøv(r.trekk); else { økt.valgt = r.valgt; økt.feilFelt = null; tegn(); }
      } }));
    const panel = el(".sj-panel");
    panel.appendChild(el(".sj-status", økt.ferdig ? (økt.feilTotalt ? `Linjen er ferdig · ${økt.feilTotalt} feil` : "Feilfritt ✓")
      : din ? "Ditt trekk" : "Motstanderen tenker …"));
    if (økt.melding) panel.appendChild(el(".sj-melding." + økt.melding.type, økt.melding.tekst));
    if (økt.kommentar) panel.appendChild(el(".sj-kommentar", el("b", økt.kommentar.merke + " "), økt.kommentar.tekst));
    if (økt.ferdig) {
      panel.appendChild(el(".sj-plan", el("b", l.navn + ". "), l.plan || ""));
      panel.appendChild(el(".tiny.muted", { style: { marginTop: "6px" } },
        økt.feilTotalt ? "Den kommer tilbake i morgen, og én gang til på slutten av økten."
          : `Neste repetisjon om ${Math.round(INTERVALL[(logg(l.id) || {}).boks || 1] / DAG)} dager.`));
      panel.appendChild(el(".row.wrap", { style: { gap: "8px", marginTop: "12px" } },
        el("button.btn.primary", { onclick: nesteLinje }, økt.i + 1 < økt.kø.length ? "Neste linje →" : "Ferdig →"),
        el("button.btn.ghost.sm", { onclick: () => startLær(l.id) }, "Se linjen med kommentarer")));
    } else if (din && økt.forsøk >= 1) {
      panel.appendChild(el("button.btn.ghost.sm", { style: { marginTop: "10px" }, onclick: visSvar }, "Vis svaret"));
    }
    kort.appendChild(panel);
    wrap.appendChild(kort);
    return wrap;
  }

  function visOppsummering() {
    const r = økt.resultat || [];
    const unike = [...new Set(r.map((x) => x.id))];
    const feilfrie = unike.filter((id) => !r.find((x) => x.id === id && x.feil));
    const wrap = el("div");
    wrap.appendChild(hode(økt.tittel || "Økten er ferdig", null));
    wrap.appendChild(el(".card.pad-lg",
      el("div", { style: { fontSize: "20px", fontWeight: 680 } }, `${feilfrie.length} av ${unike.length} linjer uten feil`),
      el("p.tiny.muted", "Linjene med feil kommer tilbake i morgen. De feilfrie flyttes ett steg lenger ut."),
      el(".row.wrap", { style: { gap: "10px", marginTop: "14px" } },
        el("button.btn.primary", { onclick: avslutt }, "Tilbake til variantene"))));
    return wrap;
  }

  /* Utforsk: treet av alle linjene i gruppen. */
  function visUtforsk() {
    const g = gruppe(økt.gruppe);
    const ls = linjer(økt.gruppe);
    const sti = økt.sti;
    let p = C().fraFEN(C().START), siste = null;
    for (const san of sti) { const m = C().fraSAN(p, san); siste = m; p = C().gjør(p, m); }
    const nøkkel = C().tilFEN(p, true);
    /* Fortsettelsene: trekkene linjene spiller fra denne stillingen, med kommentar. */
    const videre = new Map();
    for (const l of ls) {
      const steg = linjen(l);
      steg.forEach((s) => {
        if (C().tilFEN(s.før, true) !== nøkkel) return;
        const v = videre.get(s.san) || { san: s.san, merke: C().merke(s), linjer: [], kommentar: null };
        v.linjer.push(l);
        v.kommentar = v.kommentar || (l.kommentar || {})[C().merke(s)] || null;
        videre.set(s.san, v);
      });
    }
    let komm = null;
    if (sti.length) {
      for (const l of ls) {
        const steg = linjen(l);
        const i = steg.findIndex((s, k) => k === sti.length - 1 && steg.slice(0, k + 1).map((x) => x.san).join(" ") === sti.join(" "));
        if (i >= 0 && (l.kommentar || {})[C().merke(steg[i])]) { komm = { merke: C().merke(steg[i]), tekst: l.kommentar[C().merke(steg[i])] }; break; }
      }
    }
    const wrap = el("div");
    wrap.appendChild(hode("Utforsk: " + (g ? g.navn : ""), "Klikk et trekk for å gå videre. Alle linjene i gruppen er med."));
    const kort = el(".card.pad-lg.sj-økt");
    kort.appendChild(brett(p, { farge: g && g.farge, siste }));
    const panel = el(".sj-panel");
    panel.appendChild(el(".sj-trekktekst.sj-linjetekst", sti.length ? sti.map((san, i) => (i % 2 === 0 ? (i / 2 + 1) + "." : "") + san).join(" ") : "Startstillingen"));
    if (komm) panel.appendChild(el(".sj-kommentar", el("b", komm.merke + " "), komm.tekst));
    const valg = el(".sj-valg");
    if (!videre.size) {
      const ender = ls.filter((l) => linjen(l).map((s) => s.san).join(" ") === sti.join(" "));
      panel.appendChild(el("p.tiny.muted", "Her slutter linjen."));
      ender.forEach((l) => l.plan && panel.appendChild(el(".sj-plan", el("b", l.navn + ". "), l.plan)));
    }
    for (const v of videre.values()) {
      valg.appendChild(el("button.btn.sm" + (v.linjer.length > 1 ? "" : ".ghost"), { title: v.linjer.map((l) => l.navn).join("\n"),
        onclick: () => { økt.sti = sti.concat(v.san); tegn(); } }, v.merke, el("span.tiny.muted", ` · ${v.linjer.length}`)));
    }
    panel.appendChild(valg);
    panel.appendChild(el(".row.wrap", { style: { gap: "8px", marginTop: "12px" } },
      el("button.btn.ghost.sm", { disabled: !sti.length, onclick: () => { økt.sti = sti.slice(0, -1); tegn(); } }, "← Tilbake"),
      el("button.btn.ghost.sm", { disabled: !sti.length, onclick: () => { økt.sti = []; tegn(); } }, "Til start")));
    kort.appendChild(panel);
    wrap.appendChild(kort);
    return wrap;
  }

  /* Piltastene blar i Lær og Utforsk. */
  document.addEventListener("keydown", (e) => {
    if (!økt || !/^#\/linjer/.test(location.hash || "")) return;
    const m = e.target;
    if (m && (m.tagName === "INPUT" || m.tagName === "TEXTAREA")) return;
    if (økt.modus === "lær") {
      const n = linjen(linjeMedId(økt.kø[0])).length;
      if (e.key === "ArrowRight" && økt.pos < n) { økt.pos++; tegn(); e.preventDefault(); }
      if (e.key === "ArrowLeft" && økt.pos > 0) { økt.pos--; tegn(); e.preventDefault(); }
    }
    if (økt.modus === "utforsk" && e.key === "ArrowLeft" && økt.sti.length) { økt.sti = økt.sti.slice(0, -1); tegn(); e.preventDefault(); }
    if (økt.modus === "øv" && økt.ferdig && e.key === "Enter") { nesteLinje(); e.preventDefault(); }
  });
  /* Forlater du modulen midt i en linje, stopper motstanderen. */
  window.addEventListener("hashchange", () => { if (!/^#\/linjer/.test(location.hash || "")) { stopp(); økt = null; } });

  /* Kortet på dashbordet. */
  function dashbordkort() {
    if (!finnes() || !S.hasModule("/linjer")) return null;
    const st = status();
    const kort = el(".card");
    kort.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Varianter"), el(".spacer"),
      el(".see-all", { onclick: sh().go("#/linjer") }, "Åpne →")));
    kort.appendChild(el("p.tiny.muted", { style: { margin: "6px 0 12px" } },
      st.forfalt ? `${st.forfalt} linjer skal repeteres i dag. ${st.lært} av ${st.totalt} lært.`
        : `${st.lært} av ${st.totalt} linjer lært.`));
    kort.appendChild(el("a.btn.primary.sm", { href: "#/linjer" }, st.forfalt ? "Repeter" : "Lær en ny linje"));
    return kort;
  }
  const antallForfalt = () => (finnes() ? status().forfalt : 0);

  S.views.sjakk = { render, finnes, dashbordkort, antallForfalt, tegnAlleDiagrammer };
})(window.EDU);
