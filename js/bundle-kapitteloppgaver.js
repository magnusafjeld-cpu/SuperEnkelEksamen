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

  function svar(num, id, i) {
    if (erÅpen(num, id)) return;              // et låst svar kan ikke endres
    const valg = Object.assign({}, valgene(num));
    valg[id] = i;
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  function nullstill(num) { const st = S.store.get(); delete st.exams[nøkkel(num)]; S.store.emit(); }

  /* ---------- retting ---------- */
  const pts = (n) => n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }).replace("-", "−");

  function resultat(num) {
    const b = forKap(num);
    if (!b) return null;
    const valg = valgene(num), wf = wfFor(b);
    let rett = 0, galt = 0, blank = 0, poeng = 0, maks = 0;
    (b.tasks || []).forEach((t) => {
      const p = t.points || 3;
      maks += p;
      const v = valg[t.id];
      if (v == null || v === BLANK) { if (v === BLANK) blank++; return; }
      if (v === t.answer) { rett++; poeng += p; } else { galt++; poeng += p * wf; }
    });
    return { rett, galt, blank, poeng: Math.round(poeng * 100) / 100, maks, antall: (b.tasks || []).length };
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
      boks.appendChild(el(".tiny", { style: { marginTop: "6px", fontWeight: 620, color: farge } },
        blank ? "Stod over · 0 poeng" : (valgt === t.answer ? `Riktig · ${pts(fikk)} poeng` : `Feil · ${pts(fikk)} poeng`)));
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

  function oppgave(num, t, i) {
    const åpent = erÅpen(num, t.id);
    const kort = el(".card.pad-lg", { style: { marginBottom: "14px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "17px" } }, "Oppgave " + (i + 1)),
      t.topic ? el(".chip.slate", { style: { fontSize: "11px" } }, t.topic) : null,
      el(".spacer"),
      el(".chip.indigo", { style: { fontWeight: 620 } }, (t.points || 3) + " poeng")));
    kort.appendChild(el(".prose", frag(t.body || "")));
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
      `${r.antall} oppgaver · ${r.maks} poeng · ${b.minutes || Math.max(10, r.antall * 3)} minutter`));

    const wf = wfFor(b);
    wrap.appendChild(el(".card", { style: { marginBottom: "18px" } },
      el("p.tiny", { style: { margin: 0 } },
        el("b", "Eksamensregelen: "),
        `rett svar gir full poengsum, feil svar ${pts(wf)} × poengsummen, ubesvart 0. `,
        "Svar når du kan utelukke minst ett alternativ; stå over ellers. ",
        el("b", "Fasiten kommer med en gang"),
        ", så svaret låses når du har valgt.")));

    (b.tasks || []).forEach((t, i) => wrap.appendChild(oppgave(num, t, i)));

    if (!ferdig(num)) {
      const n = besvart(num);
      wrap.appendChild(el(".card", { style: { textAlign: "center" } },
        el("p.tiny.muted", { style: { margin: 0 } },
          n === 0 ? "Velg et alternativ, så åpner fasiten seg med en gang."
                  : `${n} av ${r.antall} besvart · ${pts(r.poeng)} poeng så langt`)));
    } else {
      wrap.appendChild(resultatkort(num, r, b));
    }
    return wrap;
  }

  function resultatkort(num, r, b) {
    const kort = el(".card.pad-lg", { style: { textAlign: "center" } });
    const andel = r.maks ? Math.max(0, r.poeng) / r.maks : 0;
    kort.appendChild(el("h3", { style: { fontSize: "26px", marginBottom: "6px" } }, `${pts(r.poeng)} av ${r.maks} poeng`));
    kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } },
      [tellord(r.rett, "riktig", "riktige"), tellord(r.galt, "galt", "gale"),
       tellord(r.blank, "ubesvart", "ubesvarte")].join(" · ")));
    /* Uten minuspoeng ville samme besvarelse gitt dette. Forskjellen er hele
       grunnen til at gjettestrategien må trenes. */
    const utenMinus = (b.tasks || []).reduce((a, t) => a + (valgene(num)[t.id] === t.answer ? (t.points || 3) : 0), 0);
    if (utenMinus !== r.poeng) kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } },
      `Uten minuspoeng ville det samme gitt ${utenMinus} poeng. Differansen er ${pts(r.poeng - utenMinus)}.`));
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
      el(".kap-radnavn", kap ? kap.fullTitle : "Kapittel " + num),
      el(".kap-radtall", `${r.antall} oppgaver · ${r.maks} poeng`
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
      `${antOpp} oppgaver over ${tellord(antKap, "kapittel", "kapitler")} · ${antPoeng} poeng · ${tellord(levert, "kapittel", "kapitler")} ferdig`));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "62ch", margin: "0 0 22px" } },
      "Ta settet rett etter at du har lest kapitlet, mens stoffet er ferskt. Samme format som eksamen: "
      + "fire alternativer, ett riktig, og minuspoeng for feil. Fasiten kommer med en gang, og sier hvilken "
      + "feil hvert gale alternativ er laget av. Vil du ha eksamensforhold med fasit først til slutt, ligger det i Eksamenssett."));

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
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "18px" } }, "Kapitteloppgaver"),
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
