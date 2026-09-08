/* ================ KAPITTELOPPGAVER — eksamensformat, ett kapittel ================
   Et lite sett flervalgsoppgaver å ta rett etter at et kapittel er lest, i samme
   format som eksamen: fire alternativer, ett riktig, og minuspoeng for feil.

   Hvorfor dette ikke er quizen om igjen: quizen trekker fra hele pensum og
   sjekker om du husker. Dette sjekker om du kan REGNE, på ett kapittel, mens det
   fortsatt er ferskt — flertrinns oppgaver med tall, der de tre gale
   alternativene er laget av hver sin konkrete feil. Fasiten sier hvilken.

   Minuspoengene er poenget. Under den gamle regelen var det gratis å svare på
   alt; fra 2026 koster et feil svar. Å la et alternativ stå blankt er derfor en
   ekte strategi, og settet må trene den. Derfor kan et valgt alternativ velges
   bort igjen, og resultatet teller ubesvarte for seg.

   Data: EDU_DATA.chapterTasks = { <kapittelnr>: { minutes, wrongFactor, tasks: [] } }
   Oppgavenes id-er er lagringsnøkler. De må aldri endres.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, icon, frag } = S.u;
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
  const erLevert = (num) => !!økt(num).levertAt;

  function velg(num, id, i) {
    if (erLevert(num)) return;
    const valg = Object.assign({}, valgene(num));
    /* Å velge det valgte på nytt fjerner svaret. Med minuspoeng er «blankt» en
       ekte strategi, ikke en glipp. */
    if (valg[id] === i) delete valg[id]; else valg[id] = i;
    S.store.setExam(nøkkel(num), { valg: valg });
  }
  function lever(num) { S.store.setExam(nøkkel(num), { levertAt: S.u.nowTs() }); }
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
      if (v == null) { blank++; return; }
      if (v === t.answer) { rett++; poeng += p; } else { galt++; poeng += p * wf; }
    });
    return { rett, galt, blank, poeng: Math.round(poeng * 100) / 100, maks, antall: (b.tasks || []).length };
  }
  const besvart = (num) => Object.keys(valgene(num)).length;

  /* ---------- én oppgave ---------- */
  function alternativer(num, t, åpent) {
    const valgt = valgene(num)[t.id];
    const boks = el("div", { style: { marginTop: "12px" } });
    (t.options || []).forEach((o, i) => {
      let cls = "button.opt";
      if (åpent) cls += (i === t.answer) ? ".correct" : (i === valgt ? ".wrong" : ".dim");
      else if (i === valgt) cls += ".sel";
      boks.appendChild(el(cls, { disabled: åpent,
        onclick: () => { if (åpent) return; velg(num, t.id, i); S.app.refresh(); } },
        el(".key", String.fromCharCode(65 + i)), el("span", frag(String(o)))));
    });
    if (åpent) {
      const p = t.points || 3;
      const fikk = valgt == null ? 0 : (valgt === t.answer ? p : Math.round(p * wfFor(forKap(num)) * 100) / 100);
      const farge = valgt == null ? "var(--ink-3)" : (valgt === t.answer ? "var(--green)" : "var(--rose)");
      boks.appendChild(el(".tiny", { style: { marginTop: "6px", fontWeight: 620, color: farge } },
        valgt == null ? "Ubesvart · 0 poeng" : (valgt === t.answer ? `Riktig · ${pts(fikk)} poeng` : `Feil · ${pts(fikk)} poeng`)));
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

  function oppgave(num, t, i, åpent) {
    const kort = el(".card.pad-lg", { style: { marginBottom: "14px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "17px" } }, "Oppgave " + (i + 1)),
      t.topic ? el(".chip.slate", { style: { fontSize: "11px" } }, t.topic) : null,
      el(".spacer"),
      el(".chip.indigo", { style: { fontWeight: 620 } }, (t.points || 3) + " poeng")));
    kort.appendChild(el(".prose", frag(t.body || "")));
    kort.appendChild(alternativer(num, t, åpent));
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
    const åpent = erLevert(num);
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
        "Svar når du kan utelukke minst ett alternativ; la stå blankt ellers. Trykk på et valgt alternativ igjen for å fjerne svaret.")));

    (b.tasks || []).forEach((t, i) => wrap.appendChild(oppgave(num, t, i, åpent)));

    if (!åpent) {
      const n = besvart(num);
      wrap.appendChild(el(".card.pad-lg", { style: { textAlign: "center" } },
        el("p.tiny.muted", { style: { marginTop: 0 } }, `${n} av ${r.antall} besvart${n < r.antall ? " — ubesvarte gir 0, ikke minus" : ""}`),
        el("button.btn.primary.lg", { onclick: () => {
          if (n === 0) { S.u.toast("Svar på minst én oppgave først."); return; }
          lever(num); S.app.refresh(); window.scrollTo({ top: 0 });
        } }, "Lever og rett")));
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
      `${r.rett} riktige · ${r.galt} gale · ${r.blank} ubesvarte`));
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
    const levert = erLevert(num), påbegynt = !levert && besvart(num) > 0;
    const rd = el(".kap-rad");
    rd.appendChild(el(".kap-radtekst",
      el(".kap-radnavn", kap ? kap.fullTitle : "Kapittel " + num),
      el(".kap-radtall", `${r.antall} oppgaver · ${r.maks} poeng`
        + (levert ? ` · ${pts(r.poeng)} poeng oppnådd` : påbegynt ? ` · ${besvart(num)} besvart` : ""))));
    rd.appendChild(el(".kap-radhoyre",
      levert ? el(".chip.green", el(".dot"), "Levert") : påbegynt ? el(".chip.amber", el(".dot"), "Påbegynt") : null,
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
      const r = resultat(c.num); antOpp += r.antall; antPoeng += r.maks; if (erLevert(c.num)) levert++;
    }));
    wrap.appendChild(sh().pageHead("Øving", "Kapitteloppgaver",
      `${antOpp} oppgaver over ${antKap} kapitler · ${antPoeng} poeng · ${levert} kapitler levert`));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "62ch", margin: "0 0 22px" } },
      "Ta settet rett etter at du har lest kapitlet, mens stoffet er ferskt. Samme format som eksamen: "
      + "fire alternativer, ett riktig, og minuspoeng for feil. Fasiten sier hvilken feil hvert gale alternativ er laget av."));

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
    const r = resultat(num), levert = erLevert(num), påbegynt = !levert && besvart(num) > 0;
    const kort = el(".card.pad-lg", { style: { marginTop: "30px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "18px" } }, "Kapitteloppgaver"),
      el(".spacer"),
      levert ? el(".chip.green", el(".dot"), `${pts(r.poeng)} av ${r.maks}`) : påbegynt ? el(".chip.amber", el(".dot"), "Påbegynt") : null));
    kort.appendChild(el("p.tiny.muted", { style: { margin: "8px 0 14px" } },
      `${r.antall} oppgaver i eksamensformat · ${r.maks} poeng · minuspoeng for feil. Ta dem nå, mens kapitlet er ferskt.`));
    kort.appendChild(el("a.btn.primary", { href: "#/kapitteloppgaver/" + num },
      levert ? "Se fasiten" : påbegynt ? "Fortsett settet" : "Start settet"));
    return kort;
  }

  S.views.kapitteloppgaver = { render: renderList, renderKap, kapittelkort, harOppgaver };
})(window.EDU);
