/* ================ KAPITTELOPPGAVER — eksamensformat, ett kapittel ================
   Et lite sett flervalgsoppgaver å ta rett etter at et kapittel er lest, i samme
   format som eksamen: fire alternativer, ett riktig, og minuspoeng for feil.

   Hvorfor dette ikke er quizen om igjen: quizen trekker fra hele pensum og
   sjekker om du husker. Dette sjekker om du kan REGNE, på ett kapittel, mens det
   fortsatt er ferskt — flertrinns oppgaver med tall, der de tre gale
   alternativene er laget av hver sin konkrete feil. Fasiten sier hvilken.

   Fasiten kommer MED EN GANG, oppgave for oppgave. Dette er ikke en
   eksamenssimulering — den ligger i /sett, med nedtelling og fasit som først
   åpner seg ved levering. Her er poenget å lære mens regnestykket ennå er i
   hodet: har du regnet feil, skal du få vite det før du går videre til neste
   oppgave, ikke seks oppgaver senere.

   Minuspoengene trenes likevel. Under den gamle regelen var det gratis å svare
   på alt; fra 2026 koster et feil svar. Å la stå blankt er derfor en ekte
   strategi, og hver oppgave har en egen «stå over»-knapp som fører den som
   ubesvart. Et valgt alternativ låses, for et svar du kan ombestemme deg om
   etter å ha sett fasiten, måler ingenting.

   To oppgavetyper, fordi fagene eksamineres ulikt. Flervalg (options/answer/
   traps) for FIE432, der eksamen er flervalg med minuspoeng. ÅPNE oppgaver
   (open: true, solution, criteria) for FIE402, der eksamen er seks åpne
   oppgaver med poeng per deloppgave: du skriver svaret, åpner løsningen, og
   vurderer deg selv mot kriteriene — samme rutine som øvingsmodus i /sett.

   Data: EDU_DATA.chapterTasks = { <kapittelnr>: { minutes, wrongFactor, tasks: [] } }
   Oppgavenes id-er er lagringsnøkler. De må aldri endres.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, icon, frag, tellord } = S.u;
  const sh = () => S.views.shared;

  const ALLE = () => window.EDU_DATA.chapterTasks || {};
  const forKap = (num) => ALLE()[num] || null;
  const harOppgaver = (num) => { const b = forKap(num); return !!(b && (b.tasks || []).length); };

  /* Eksamen høsten 2026: 3 poeng for rett, −1 for feil, 0 for blankt.
     Faget kan overstyre per kapittel; −1/3 av poengsummen er standarden. */
  const STD_WF = -1 / 3;
  const wfFor = (b) => (b && typeof b.wrongFactor === "number") ? b.wrongFactor : STD_WF;

  /* ---------- lagring ---------- */
  /* Hele kapittelsettet er én økt: ett oppslag med alle valgene. id-ene inni er
     oppgavenes egne, så en omstokking av rekkefølgen ikke flytter svarene. */
  const nøkkel = (num) => "kapoppg-" + num;
  const økt = (num) => S.store.get().exams[nøkkel(num)] || {};
  const valgene = (num) => økt(num).valg || {};
  /* BLANK er «stå over», og må skilles fra «ikke svart ennå». Uten det kan ikke
     en bevisst blank besvarelse skille seg fra en oppgave leseren bare ikke har
     kommet til. */
  const BLANK = -1;
  /* Eldre lagret tilstand har levertAt fra da hele settet ble levert samlet.
     Den regnes som at alt er avslørt, så gamle besvarelser fortsatt viser fasit. */
  const erÅpen = (num, id) => (id in valgene(num)) || !!økt(num).levertAt;
  const erOpen = (t) => !!t.open;
  /* Eksamensvekt 1–5 fra manifestet: [score, begrunnelse]. Uten tabellen vises
     ingenting, så fag som ikke har vektet kapitlene sine er upåvirket. */
  const vektFor = (num) => ((window.EDU_SUBJECT || {}).examWeights || {})[num] || null;
  function vektmerke(num) {
    const v = vektFor(num);
    if (!v) return null;
    const [score, hvorfor] = v;
    const boks = el(".kap-vekt", { title: `Eksamensvekt ${score} av 5. ${hvorfor}` });
    for (let i = 1; i <= 5; i++) boks.appendChild(el("i" + (i <= score ? ".p\u00e5" : "")));
    return boks;
  }
  /* Et sett er «åpent» når alle oppgavene er det. Da gjelder ikke minuspoeng-
     regelen, og all tekst om den skjules. */
  const settErOpen = (b) => !!b && (b.tasks || []).length > 0 && (b.tasks || []).every(erOpen);
  /* Åpen oppgave lagrer { svar, score } under samme nøkkel som flervalg lagrer
     indeksen. score er null til leseren har vurdert seg selv. */
  const openSt = (num, id) => { const v = valgene(num)[id]; return (v && typeof v === "object") ? v : null; };
  function lagreSvar(num, id, tekst) {
    const valg = Object.assign({}, valgene(num));
    const cur = openSt(num, id) || {};
    if (!(id in valg)) return;                // svaret lagres bare når løsningen er åpnet
    valg[id] = Object.assign({}, cur, { svar: String(tekst || "").slice(0, 4000) });
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  function visLøsning(num, id, tekst) {
    if (erÅpen(num, id)) return;
    const valg = Object.assign({}, valgene(num));
    valg[id] = { svar: String(tekst || "").slice(0, 4000), score: null };
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  function settScore(num, id, v) {
    const valg = Object.assign({}, valgene(num));
    valg[id] = Object.assign({}, openSt(num, id) || { svar: "" }, { score: v });
    S.store.setExam(nøkkel(num), { valg: valg });
  }

  function svar(num, id, i) {
    if (erÅpen(num, id)) return;              // et låst svar kan ikke endres
    const valg = Object.assign({}, valgene(num));
    valg[id] = i;
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  /* Angre ÉN oppgave. Den finnes for bomklikk, ikke for å prøve seg fram: har
     du sett fasiten, måler et nytt forsøk ingenting. Men et alternativ truffet
     ved et uhell skal ikke låse oppgaven for godt. */
  function angre(num, id) {
    const valg = Object.assign({}, valgene(num));
    delete valg[id];
    const st = S.store.get();
    /* Gammel tilstand avslører alt via levertAt. Angrer du på én oppgave der,
       må flagget bort, ellers står den avslørt uansett hva valg sier. */
    if (st.exams[nøkkel(num)]) delete st.exams[nøkkel(num)].levertAt;
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  function nullstill(num) { const st = S.store.get(); delete st.exams[nøkkel(num)]; S.store.emit(); }

  /* ---------- retting ---------- */
  const pts = (n) => n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }).replace("-", "−");

  function resultat(num) {
    const b = forKap(num);
    if (!b) return null;
    const valg = valgene(num), wf = wfFor(b);
    let rett = 0, galt = 0, blank = 0, poeng = 0, maks = 0, vurdert = 0, uvurdert = 0;
    (b.tasks || []).forEach((t) => {
      const p = t.points || 3;
      maks += p;
      const v = valg[t.id];
      if (erOpen(t)) {
        /* Åpen: poengene er leserens egen vurdering. Åpnet men uvurdert teller
           som 0 så langt, og rapporteres for seg. */
        if (v == null) return;
        if (typeof v.score === "number") { vurdert++; poeng += v.score; } else uvurdert++;
        return;
      }
      if (v == null || v === BLANK) { if (v === BLANK) blank++; return; }
      if (v === t.answer) { rett++; poeng += p; } else { galt++; poeng += p * wf; }
    });
    return { rett, galt, blank, vurdert, uvurdert, poeng: Math.round(poeng * 100) / 100, maks, antall: (b.tasks || []).length };
  }
  const besvart = (num) => Object.keys(valgene(num)).length;
  const ferdig = (num) => { const b = forKap(num); return !!b && (b.tasks || []).every((t) => erÅpen(num, t.id)); }

  /* ---------- én oppgave ---------- */
  function alternativer(num, t) {
    const åpent = erÅpen(num, t.id);
    const valgt = valgene(num)[t.id];
    const boks = el("div", { style: { marginTop: "12px" } });
    (t.options || []).forEach((o, i) => {
      let cls = "button.opt";
      if (åpent) cls += (i === t.answer) ? ".correct" : (i === valgt ? ".wrong" : ".dim");
      boks.appendChild(el(cls, { disabled: åpent,
        onclick: () => { if (åpent) return; svar(num, t.id, i); S.app.refresh(); } },
        el(".key", String.fromCharCode(65 + i)), el("span", frag(String(o)))));
    });
    if (åpent) {
      const p = t.points || 3;
      const blank = valgt == null || valgt === BLANK;
      const fikk = blank ? 0 : (valgt === t.answer ? p : Math.round(p * wfFor(forKap(num)) * 100) / 100);
      const farge = blank ? "var(--ink-3)" : (valgt === t.answer ? "var(--green)" : "var(--rose)");
      boks.appendChild(el(".row", { style: { marginTop: "8px", gap: "10px", alignItems: "center" } },
        el(".tiny", { style: { fontWeight: 620, color: farge } },
          blank ? "Stod over · 0 poeng" : (valgt === t.answer ? `Riktig · ${pts(fikk)} poeng` : `Feil · ${pts(fikk)} poeng`)),
        el(".spacer"),
        el("button.btn.ghost.sm", { title: "Nullstiller bare denne oppgaven",
          onclick: () => { angre(num, t.id); S.app.refresh(); } }, "Angre svaret")));
    } else {
      /* «Stå over» er ikke en snarvei forbi oppgaven, det er svaret på eksamen
         når du ikke kan utelukke noe. Den skal derfor være like tilgjengelig som
         alternativene, og den avslører fasiten på samme måte. */
      boks.appendChild(el(".row", { style: { marginTop: "10px", gap: "10px", alignItems: "center" } },
        el("button.btn.ghost.sm", { onclick: () => { svar(num, t.id, BLANK); S.app.refresh(); } }, "Stå over"),
        el("span.tiny.muted", "0 poeng, men ingen minus. Riktig valg når du ikke kan utelukke minst ett alternativ.")));
    }
    return boks;
  }

  function fasit(t) {
    const p = el(".explain", { style: { marginTop: "14px" } });
    if (t.solution) p.appendChild(el(".prose", frag(t.solution)));
    /* traps står parallelt med options: én tekst per galt alternativ, null på
       fasiten. Det er halve ferdigheten flervalg krever — å se hvilken feil
       hvert gale alternativ er laget av. */
    const feller = (t.traps || []).map((tekst, i) => tekst ? { i: i, tekst: tekst } : null).filter(Boolean);
    if (feller.length) {
      p.appendChild(el(".tiny", { style: { fontWeight: 620, margin: "12px 0 6px", letterSpacing: ".03em", textTransform: "uppercase", color: "var(--ink-3)" } },
        "Hva de gale alternativene er laget av"));
      const ul = el("ul", { style: { margin: 0, paddingLeft: "18px" } });
      feller.forEach((f) => ul.appendChild(el("li.tiny", { style: { marginBottom: "4px" } },
        el("b", String.fromCharCode(65 + f.i) + ": "), frag(f.tekst))));
      p.appendChild(ul);
    }
    return p;
  }

  /* Åpen oppgave, FIE402-formatet. Du skriver svaret først, så åpnes løsningen
     og kriterielisten, og du gir deg selv poeng i fire trinn av maks — samme
     skala som øvingsmodus i /sett. Skrivefeltet lagres ved blur, aldri per
     tastetrykk: en refresh midt i setningen ville tatt markøren. */
  function åpenOppgave(num, t) {
    const åpent = erÅpen(num, t.id);
    const st = openSt(num, t.id) || {};
    const p = t.points || 6;
    const boks = el("div", { style: { marginTop: "12px" } });

    const felt = el("textarea.dyb-ansin", { rows: åpent ? 4 : 7, maxlength: 4000,
      placeholder: åpent ? "" : "Skriv svaret ditt her — metode, utregning, mekanisme, kontroll. Som på arket.",
      onblur: (e) => { if (åpent) lagreSvar(num, t.id, e.target.value); } });
    felt.value = st.svar || "";
    boks.appendChild(el("p.tiny.muted", { style: { margin: "0 0 6px" } },
      åpent ? "Det du skrev:" : (t.hint || "Vis utregningen og navngi mekanismen. Uten utregning, ingen poeng.")));
    boks.appendChild(felt);

    if (!åpent) {
      boks.appendChild(el(".row", { style: { marginTop: "12px", gap: "10px", alignItems: "center" } },
        el("button.btn.primary", { onclick: () => { visLøsning(num, t.id, felt.value); S.app.refresh(); } }, "Vis løsningen"),
        el("span.tiny.muted", "Løsningen låses opp, og svaret ditt blir stående ved siden av.")));
      return boks;
    }

    /* Løsning + kriterier, i samme form som eksamenssettene. */
    const sol = el(".sol-panel", { style: { marginTop: "14px" } });
    sol.appendChild(el(".sol-h", icon("check"), el("span", "Løsning")));
    if (t.solution) sol.appendChild(el(".prose", frag(t.solution)));
    if ((t.criteria || []).length) {
      sol.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Dette må være med"));
      const ul = el("ul.sol-crit");
      t.criteria.forEach((c) => ul.appendChild(el("li", c)));
      sol.appendChild(ul);
    }
    boks.appendChild(sol);

    /* Selvvurdering i fire trinn av maks. Kriteriene over er det du måler mot. */
    const cur = st.score;
    const rad = el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "14px" } },
      el(".tiny.muted", "Poengene du gir deg selv:"));
    const trinn = [...new Set([0, Math.round(p * 0.25), Math.round(p * 0.5), Math.round(p * 0.75), p])].sort((a, b) => a - b);
    trinn.forEach((v) => rad.appendChild(el("button.btn.sm" + (cur === v ? ".primary" : ""), {
      onclick: () => { settScore(num, t.id, v); S.app.refresh(); } }, String(v))));
    rad.appendChild(el(".tiny.muted", `av ${p}`));
    rad.appendChild(el(".spacer"));
    rad.appendChild(el("button.btn.ghost.sm", { title: "Nullstiller bare denne oppgaven",
      onclick: () => { angre(num, t.id); S.app.refresh(); } }, "Angre"));
    boks.appendChild(rad);
    if (typeof cur !== "number") boks.appendChild(el("p.tiny.muted", { style: { margin: "8px 0 0" } },
      "Vurder ærlig mot kriteriene. Trekk der du regnet uten å si metoden, der mekanismen ikke ble navngitt, og der kontrollen mangler."));
    return boks;
  }

  function oppgave(num, t, i) {
    const åpent = erÅpen(num, t.id);
    const kort = el(".card.pad-lg", { style: { marginBottom: "14px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "17px" } }, "Oppgave " + (i + 1)),
      t.topic ? el(".chip.slate", { style: { fontSize: "11px" } }, t.topic) : null,
      el(".spacer"),
      el(".chip.indigo", { style: { fontWeight: 620 } }, (t.points || 3) + " poeng")));
    kort.appendChild(el(".prose", frag(t.body || "")));
    if (erOpen(t)) { kort.appendChild(åpenOppgave(num, t)); return kort; }
    kort.appendChild(alternativer(num, t));
    if (åpent) kort.appendChild(fasit(t));
    return kort;
  }

  /* ---------- ett kapittels sett ---------- */
  function renderKap(numStr) {
    const num = parseInt(numStr, 10);
    const b = forKap(num), kap = S.data.chapter(num);
    const wrap = el(".fade-in");
    if (!b || !(b.tasks || []).length) {
      wrap.appendChild(sh().empty("📝", "Ingen oppgaver for dette kapitlet", "Faget har ikke lagt inn kapitteloppgaver for kapittel " + num + "."));
      return wrap;
    }
    const r = resultat(num);

    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px", alignItems: "center" } },
      el("a.btn.ghost.sm", { href: "#/kapitteloppgaver" }, "← Alle kapitler"),
      kap ? el("a.btn.ghost.sm", { href: "#/chapter/" + num }, "Les kapitlet") : null));

    wrap.appendChild(sh().pageHead("Kapitteloppgaver",
      kap ? kap.fullTitle : "Kapittel " + num,
      `${tellord(r.antall, "oppgave", "oppgaver")} · ${r.maks} poeng · ${b.minutes || Math.max(10, r.antall * 3)} minutter`));

    const åpentSett = settErOpen(b);
    if (åpentSett) {
      wrap.appendChild(el(".card", { style: { marginBottom: "18px" } },
        el("p.tiny", { style: { margin: 0 } },
          el("b", "Eksamensformatet: "),
          "åpne oppgaver med poeng per deloppgave, som på eksamen. Skriv svaret ferdig på papir eller i feltet ",
          el("b", "før"), " du åpner løsningen — å lese en løsning du ikke har prøvd på gir gjenkjennelse, ikke kunnskap. ",
          "Vurder deg så mot kriteriene. Sensor gir poeng for metode, vist utregning, navngitt mekanisme og kontrollen til slutt.")));
    } else {
      const wf = wfFor(b);
      wrap.appendChild(el(".card", { style: { marginBottom: "18px" } },
        el("p.tiny", { style: { margin: 0 } },
          el("b", "Eksamensregelen: "),
          `rett svar gir full poengsum, feil svar ${pts(wf)} × poengsummen, ubesvart 0. `,
          "Svar når du kan utelukke minst ett alternativ; stå over ellers. ",
          el("b", "Fasiten kommer med en gang"),
          ", så svaret låses når du har valgt.")));
    }

    (b.tasks || []).forEach((t, i) => wrap.appendChild(oppgave(num, t, i)));

    if (!ferdig(num)) {
      const n = besvart(num);
      wrap.appendChild(el(".card", { style: { textAlign: "center" } },
        el("p.tiny.muted", { style: { margin: 0 } },
          n === 0 ? (åpentSett ? "Skriv svaret på første oppgave, og åpne løsningen når du er ferdig."
                                : "Velg et alternativ, så åpner fasiten seg med en gang.")
                  : `${n} av ${r.antall} ${åpentSett ? "åpnet" : "besvart"} · ${pts(r.poeng)} poeng så langt`
                    + (åpentSett && r.uvurdert ? ` · ${tellord(r.uvurdert, "uvurdert", "uvurderte")}` : ""))));
    } else {
      wrap.appendChild(resultatkort(num, r, b));
    }
    return wrap;
  }

  function resultatkort(num, r, b) {
    const kort = el(".card.pad-lg", { style: { textAlign: "center" } });
    const andel = r.maks ? Math.max(0, r.poeng) / r.maks : 0;
    kort.appendChild(el("h3", { style: { fontSize: "26px", marginBottom: "6px" } }, `${pts(r.poeng)} av ${r.maks} poeng`));
    if (settErOpen(b)) {
      kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } },
        `${tellord(r.vurdert, "oppgave vurdert", "oppgaver vurdert")}`
        + (r.uvurdert ? ` · ${tellord(r.uvurdert, "uvurdert", "uvurderte")}` : "")
        + ` · ${r.maks ? Math.round(Math.max(0, r.poeng) / r.maks * 100) : 0} % av maks`));
      kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" } },
        "Vurderingen er din egen. Den er bare verdt noe hvis du trakk der metoden ikke ble sagt, der mekanismen ikke ble navngitt, og der kontrollen manglet."));
    } else {
      kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } },
        [tellord(r.rett, "riktig", "riktige"), tellord(r.galt, "galt", "gale"),
         tellord(r.blank, "ubesvart", "ubesvarte")].join(" · ")));
      /* Uten minuspoeng ville samme besvarelse gitt dette. Forskjellen er hele
         grunnen til at gjettestrategien må trenes. */
      const utenMinus = (b.tasks || []).reduce((a, t) => a + (valgene(num)[t.id] === t.answer ? (t.points || 3) : 0), 0);
      if (utenMinus !== r.poeng) kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } },
        `Uten minuspoeng ville det samme gitt ${utenMinus} poeng. Differansen er ${pts(r.poeng - utenMinus)}.`));
    }
    /* S.u.bar tegner den; den bruker <span>, ikke <i>, og klamper selv. */
    const linje = S.u.bar(andel * 100, { green: andel >= 0.6 });
    linje.style.marginBottom = "16px";
    kort.appendChild(linje);
    kort.appendChild(el(".row", { style: { justifyContent: "center", gap: "10px" } },
      el("button.btn", { onclick: () => { if (confirm("Nullstille svarene på dette kapitlet?")) { nullstill(num); S.app.refresh(); window.scrollTo({ top: 0 }); } } }, "Ta settet på nytt"),
      el("a.btn.ghost", { href: "#/kapitteloppgaver" }, "Alle kapitler")));
    return kort;
  }

  /* ---------- listen over kapitler ---------- */
  function rad(num) {
    const b = forKap(num), kap = S.data.chapter(num), r = resultat(num);
    const levert = ferdig(num), påbegynt = !levert && besvart(num) > 0;
    const rd = el(".kap-rad");
    rd.appendChild(el(".kap-radtekst",
      el(".row", { style: { gap: "10px", alignItems: "center" } },
        el(".kap-radnavn", kap ? kap.fullTitle : "Kapittel " + num), vektmerke(num)),
      el(".kap-radtall", `${tellord(r.antall, "oppgave", "oppgaver")} · ${r.maks} poeng`
        + (levert ? ` · ${pts(r.poeng)} poeng oppnådd` : påbegynt ? ` · ${besvart(num)} av ${r.antall} besvart · ${pts(r.poeng)} så langt` : ""))));
    rd.appendChild(el(".kap-radhoyre",
      levert ? el(".chip.green", el(".dot"), "Ferdig") : påbegynt ? el(".chip.amber", el(".dot"), "Påbegynt") : null,
      el("a.btn" + (levert ? ".ghost.sm" : ".primary.sm"), { href: "#/kapitteloppgaver/" + num },
        levert ? "Se fasit" : påbegynt ? "Fortsett" : "Start")));
    return rd;
  }

  function renderList() {
    const wrap = el(".fade-in");
    const deler = S.data.parts().map((d) => ({ del: d, kap: d.chapters.filter((c) => harOppgaver(c.num)) }))
      .filter((x) => x.kap.length);
    if (!deler.length) {
      wrap.appendChild(sh().empty("📝", "Ingen kapitteloppgaver ennå", "Faget har ikke lagt inn EDU_DATA.chapterTasks."));
      return wrap;
    }
    const antKap = deler.reduce((a, x) => a + x.kap.length, 0);
    let antOpp = 0, antPoeng = 0, levert = 0;
    deler.forEach((x) => x.kap.forEach((c) => {
      const r = resultat(c.num); antOpp += r.antall; antPoeng += r.maks; if (ferdig(c.num)) levert++;
    }));
    wrap.appendChild(sh().pageHead("Øving", "Kapitteloppgaver",
      `${tellord(antOpp, "oppgave", "oppgaver")} over ${tellord(antKap, "kapittel", "kapitler")} · ${antPoeng} poeng · ${tellord(levert, "kapittel", "kapitler")} ferdig`));
    /* Fagene har ulikt eksamensformat, og introen må si hva DETTE faget møter.
       FIE432 er flervalg med minuspoeng, FIE402 er åpne oppgaver med penn og
       papir. Én felles tekst ville vært feil for det ene av dem. */
    const heltÅpent = deler.every((x) => x.kap.every((c) => settErOpen(forKap(c.num))));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "62ch", margin: "0 0 22px" } },
      heltÅpent
        ? "Ta settet rett etter at du har lest kapitlet, mens stoffet er ferskt. Samme format som eksamen: "
          + "åpne oppgaver med penn og papir, poeng per deloppgave. Skriv svaret ditt, og hent løsningen når "
          + "du er ferdig — den kommer med sensorkriteriene, så du ser hva som faktisk gir poeng. "
          + "Vil du ha eksamensforhold, seks oppgaver på tre timer, ligger det i Eksamenssett."
        : "Ta settet rett etter at du har lest kapitlet, mens stoffet er ferskt. Samme format som eksamen: "
          + "fire alternativer, ett riktig, og minuspoeng for feil. Fasiten kommer med en gang, og sier hvilken "
          + "feil hvert gale alternativ er laget av. Vil du ha eksamensforhold med fasit først til slutt, ligger det i Eksamenssett."));
    /* Vektene er det eneste stedet i appen som sier hvor tiden faktisk er verdt
       å bruke. Uten forklaringen ser prikkene ut som pynt. */
    if (Object.keys(((window.EDU_SUBJECT || {}).examWeights || {})).length) wrap.appendChild(el("p.tiny.muted", { style: { maxWidth: "62ch", margin: "-14px 0 22px" } },
      el("b", "Prikkene er eksamensvekt"), " fra 1 til 5, utledet av hvor ofte temaet faktisk har kommet, vektet mot de to siste settene siden samme sensor lager eksamen i år. Hold musepekeren over for begrunnelsen. Antall oppgaver per kapittel følger vekten."));

    deler.forEach((x) => {
      const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
      kort.appendChild(el(".eyebrow", [x.del.tag, x.del.name].filter(Boolean).join(" · ")));
      const liste = el(".kap-liste", { style: { marginTop: "10px" } });
      x.kap.forEach((c) => liste.appendChild(rad(c.num)));
      kort.appendChild(liste);
      wrap.appendChild(kort);
    });
    return wrap;
  }

  /* ---------- kortet nederst i et kapittel ---------- */
  /* Oppgavene skal tas RETT etter kapitlet. Da må de ligge der kapitlet slutter,
     ikke bare i en meny brukeren må huske å oppsøke. */
  function kapittelkort(num) {
    if (!harOppgaver(num)) return null;
    const r = resultat(num), levert = ferdig(num), påbegynt = !levert && besvart(num) > 0;
    const kort = el(".card.pad-lg", { style: { marginTop: "30px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center" } },
      el("h3", { style: { fontSize: "18px" } }, "Kapitteloppgaver"),
      vektmerke(num),
      el(".spacer"),
      levert ? el(".chip.green", el(".dot"), `${pts(r.poeng)} av ${r.maks}`) : påbegynt ? el(".chip.amber", el(".dot"), "Påbegynt") : null));
    kort.appendChild(el("p.tiny.muted", { style: { margin: "8px 0 14px" } },
      `${r.antall} oppgaver i eksamensformat · ${r.maks} poeng · minuspoeng for feil, og fasit med en gang. Ta dem nå, mens kapitlet er ferskt.`));
    kort.appendChild(el("a.btn.primary", { href: "#/kapitteloppgaver/" + num },
      levert ? "Se fasiten" : påbegynt ? "Fortsett settet" : "Start settet"));
    return kort;
  }

  S.views.kapitteloppgaver = { render: renderList, renderKap, kapittelkort, harOppgaver };
})(window.EDU);
