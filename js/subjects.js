/* ===================== FAGREGISTER =====================
   Ett objekt per fag. Motoren (js/bundle-*.js + js/boot.js) er fagnøytral og
   leser alt fagspesifikt herfra: navn, farger, hvilke moduler faget har, hvilke
   datafiler som skal lastes, og hvor pensum-HTML-en ligger.

   Legge til et nytt fag:
     1) kopier mappen fag/_mal til fag/<ditt-fag>/
     2) fyll fag/<ditt-fag>/data.js med plan, quiz, flashcards, osv.
     3) legg pensumfilen (samme HTML-format som SAM3_Eksamensmanual.html) i repoet
     4) legg til et objekt under — det er alt; velgeren plukker det opp automatisk

   Felt:
     id         nøkkel i URL (?fag=sam3) og i lagringsnøkler — endre aldri i ettertid
     name       fullt navn (velgeren)          short  kort navn (sidepanelet)
     tagline    undertekst i sidepanelet       logo   1-3 tegn i logoflisen
     blurb      én setning i velgeren
     accent*    fagets aksentfarger (settes som CSS-variabler ved oppstart)
     scripts    datafiler som lastes når faget velges, i rekkefølge
     manual     { candidates: [stier prøvd i tur], label, hint } — pensumkilden
     problems   { candidates: [...] } — oppgavebanken (valgfri; tom = modulen tom)
     modules    hvilke moduler faget har. null = alle. Dashboard er alltid med.
                gyldige: /plan /curriculum /lyn /quiz /flashcards /dybde
                         /oppgaver /exam /review /search /progress
   ======================================================= */
/* Plattformen selv — navnet over fagene. Brukes i velgeren, sidetittelen og
   ikonet. Fagene under har sine egne navn og farger. */
window.EDU_PLATFORM = {
  name: "Super Enkel Eksamen",
  short: "SEE",
  logo: "SEE",
  tagline: "Eksamenstrening som faktisk sitter",
  accent: "#2f6bff",
};

window.EDU_SUBJECTS = [
  {
    id: "sam3",
    name: "SAM3 Makroøkonomi",
    short: "SAM3 Makro",
    tagline: "Eksamenstrening",
    logo: "S3",
    blurb: "Hele makropensumet som studieplan, quiz, flashcards, dybdetrening og eksamensoppgaver.",
    accent: "#2f6bff", accentInk: "#1b4fd6", accentSoft: "#eaf0ff", accentSoft2: "#dbe6ff",
    scripts: ["fag/sam3/data.js", "fag/sam3/lyn.js", "fag/sam3/dybde.js"],
    manual: {
      candidates: ["SAM3_Eksamensmanual.html", "fag/sam3/manual.html", "../SAM3_Eksamensmanual.html"],
      label: "SAM3_Eksamensmanual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
    },
    problems: {
      candidates: ["SAM3_Alle_oppgaver_med_fasit.html", "fag/sam3/oppgaver.html", "../SAM3_Alle_oppgaver_med_fasit.html"],
    },
    /* SAM3 har både manual og oppgavebank, så fotnoten under lynøkta sier begge. */
    /* De fire casespesifikke spillene finnes ikke i dette faget, og ville stått
       som «Kommer snart» for alltid. */
    lynGames: ["blitz", "tf", "formel", "par", "skift", "kjede", "hode", "updown",
               "forklar", "oddone", "memory", "okonom", "bit"],
    /* Var hardkodet i motoren og gjaldt alle fag. Nå SAM3s eget. */
    repetition: { boost: { from: 13, to: 19, vekt: 6, why: "Oppgave 3 (kort sikt) — historisk størst rom for å hente poeng" } },
    copy: { lynFoot: "Alt innhold er hentet fra eksamensmanualen og oppgavebanken. Feil svar viser alltid forklaringen, det er der læringen skjer. Tips: legg siden til på Hjem-skjermen for app-følelse." },
    modules: null,
  },
  {
    id: "fie402",
    name: "FIE402 Corporate Finance",
    short: "FIE402",
    tagline: "NHH · exam prep",
    logo: "CF",
    blurb: "Hele mastermanualen på engelsk: kapitalstruktur, verdsetting med gjeld, opsjoner, M&A og eierstyring — med seks tidligere eksamenssett.",
    accent: "#12805c", accentInk: "#0b6448", accentSoft: "#e3f4ee", accentSoft2: "#cfeade",
    scripts: ["fag/fie402/data.js", "fag/fie402/lyn.js", "fag/fie402/dybde.js", "fag/fie402/sett.js"],
    manual: {
      candidates: ["FIE402_Manual.html", "fag/fie402/manual.html", "../FIE402_Manual.html"],
      label: "FIE402_Manual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
      /* Formelsamlingen ligger sist, ikke i k22 som i SAM3. */
      refSections: { formulas: "k29" },
    },
    /* Kapittel 0 er kurs- og eksamensintroduksjon, k29 er ren referanse —
       ingen av dem teller som pensum i fremdriften. */
    coreChapters: { from: 1, to: 28 },
    parts: [
      { id: 0, tag: "Part 0", name: "Foundations", chapters: [0, 1, 2, 3, 4, 5] },
      { id: 1, tag: "Part I", name: "Capital structure", chapters: [6, 7, 8, 9, 10, 11] },
      { id: 2, tag: "Part II", name: "Information and issuance", chapters: [12, 13, 14] },
      { id: 3, tag: "Part III", name: "Payout policy", chapters: [15, 16] },
      { id: 4, tag: "Part IV", name: "Valuation with leverage", chapters: [17, 18, 19, 20] },
      { id: 5, tag: "Part V", name: "Options", chapters: [21, 22, 23, 24, 25] },
      { id: 6, tag: "Part VI", name: "Transactions and governance", chapters: [26, 27] },
      { id: 7, tag: "Part VII", name: "Exam craft", chapters: [28] },
      { id: 8, tag: "Reference", name: "Formula reference", chapters: [29] },
    ],
    /* De fire casespesifikke spillene finnes ikke i dette faget, og ville stått
       som «Kommer snart» for alltid. */
    lynGames: ["blitz", "tf", "formel", "par", "skift", "kjede", "hode", "updown",
               "forklar", "oddone", "memory", "okonom", "bit"],
    /* Lynøkta henter bare fra kapitler du har nådd — se js/bundle-lyn.js.
       Uten dette ville minispillene servert M&A-spørsmål i modul 3. */
    lynFollowsProgress: true,
    /* Formeltabellene i k29 har ingen kapittelmerking i seg selv, så porten
       trenger å få vite hvor de hører hjemme. Rekkefølgen følger dokumentet og
       er den samme som flashcard-id-ene bygger på — endres den, må begge deler
       følge med. */
    formulaTableChapters: [
      [1, 2],                       // 29.1 Time value and cash flow
      [3, 4],                       // 29.2 Risk and cost of capital
      [6, 7, 8],                    // 29.3 Capital structure and the tax shield
      [9, 10, 11, 12, 13],          // 29.4 Agency and information
      [17, 18, 19, 20],             // 29.5 Valuation with leverage
      [21, 22, 23],                 // 29.6 Options
      [5, 24],                      // 29.7 Credit risk
      [25],                         // 29.8 Real options
      [26],                         // 29.9 Mergers and acquisitions
    ],
    dybdeBanks: [
      { key: "foundations", label: "Foundations", sub: "Fri kontantstrøm, CAPM, kapitalkostnad, unlever/relever og kredittrisiko (kapittel 1–5).",
        tip: "Nivå 1–2 er definisjoner; nivå 3–4 er regnetrening. Unlever/relever-rutinen er den mest eksaminerte ferdigheten i hele faget — ta den til du ikke nøler." },
      { key: "capital", label: "Capital structure", sub: "MM I og II, skatteskjold, konkurskostnader, risikoskifting og debt overhang (kapittel 6–11).",
        tip: "Regn tilstand for tilstand. Sensor belønner at du navngir mekanismen, ikke bare at tallet stemmer." },
      { key: "information", label: "Information & payout", sub: "Myers-Majluf, pecking order, emisjoner, utbytte og tilbakekjøp (kapittel 12–16).",
        tip: "Myers-Majluf-malen går igjen nesten ordrett i fem eksamenssett. Husk å sjekke om investorenes tro er rasjonell — å regne ut α holder ikke." },
      { key: "valuation", label: "Valuation with leverage", sub: "WACC-metoden, APV, FTE, gjeldspolitikk og gjeldsjustering (kapittel 17–20).",
        tip: "Avslutt alltid med konsistenssjekken: WACC-verdien og APV-verdien skal være like." },
      { key: "options", label: "Options", sub: "Put-call-paritet, binomisk modell, Black-Scholes, gjeld og EK som opsjoner, realopsjoner (kapittel 21–25).",
        tip: "Realopsjoner er fast 20-poengspost i det nye formatet. Tren spesielt på verdien av informasjon og på exit-opsjoner." },
      { key: "transactions", label: "M&A & governance", sub: "Oppkjøpsmotiver, aksjebytte, premie, implisitt dealsannsynlighet og eierstyring (kapittel 26–27).",
        tip: "Eierstyring er garantert egen oppgave. Ha minst åtte tiltak du kan forklare på tre setninger hver." },
    ],
    copy: {
      planEyebrow: "Studieplan · 25 moduler",
      planIntro: "Modul 1–21 bygger faget fra bunnen: grunnlaget, kapitalstruktur, informasjon og utbytte, verdsetting med gjeld, opsjoner, og til slutt M&A og eierstyring. Modul 22–25 er ren eksamenstrening på ekte sett. Innleveringene HW1 og HW2 har egne milepæler underveis.",
      dybdeIntro: "Selvrettet trening i seks bolker som følger kursets deler. Velg bank, filtrer på nivå og tema, og skriv svaret på papir før du åpner fasiten — eksamen er penn og papir.",
    },
    modules: ["/plan", "/curriculum", "/lyn", "/quiz", "/flashcards", "/dybde", "/sett", "/review", "/search", "/progress"],
  },
  {
    id: "case",
    name: "Caseintervju",
    short: "Caseintervju",
    tagline: "Konsulentrekruttering",
    logo: "CI",
    blurb: "Hele caseintervjuet som kurs: struktur, hoderegning, figurlesing og fit — med ekte caser spilt trinn for trinn og mock-intervjuer på video.",
    accent: "#5b3fd6", accentInk: "#4630ab", accentSoft: "#efebff", accentSoft2: "#ded5ff",
    scripts: ["fag/case/data.js", "fag/case/lyn.js", "fag/case/lyn-feil.js", "fag/case/lyn-graf.js", "fag/case/lyn-struktur.js",
              "fag/case/lyn-estimat.js", "fag/case/dybde.js", "fag/case/dybde-struktur.js", "fag/case/dybde-tall.js",
              "fag/case/dybde-grunnlag.js",
              "fag/case/quiz.js",
              "fag/case/flashcards.js", "fag/case/caser.js", "fag/case/mock.js"],
    manual: {
      candidates: ["Case_Manual.html", "fag/case/manual.html", "../Case_Manual.html"],
      label: "Case_Manual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
      /* Tallarket ligger sist, ikke i k22 som i SAM3. De 44 radene der blir
         automatisk til flashcards, og rekkefølgen er permanent — id-ene er
         posisjonsbaserte, så en omstokking forskyver hele SRS-historikken. */
      refSections: { formulas: "k15" },
    },
    /* k15 er ren referanse og teller ikke som pensum i fremdriften. */
    coreChapters: { from: 0, to: 14 },
    /* Uten denne arver faget SAM3s makrodeler i stillhet — k6 ville havnet under
       «Oppgave 2: Vekst på lang sikt». Deltitlene i manualen brukes IKKE til
       tilordning; det er utelukkende denne tabellen som gjelder. */
    parts: [
      { id: 0, tag: "Del 0", name: "Grunnlaget", chapters: [0, 1, 2] },
      { id: 1, tag: "Del I", name: "Struktur", chapters: [3, 4, 5] },
      { id: 2, tag: "Del II", name: "Tall", chapters: [6, 7, 8] },
      { id: 3, tag: "Del III", name: "Framføring", chapters: [9, 10] },
      { id: 4, tag: "Del IV", name: "Fit", chapters: [11, 12] },
      { id: 5, tag: "Del V", name: "Håndverk", chapters: [13, 14] },
      { id: 6, tag: "Referanse", name: "Tall og formler", chapters: [15] },
    ],
    /* Uten denne arver faget SAM3s tre hardkodede banker («Kort sikt», «Lang
       sikt», «Eksamensoppgaver») og viser tre tomme knapper. */
    /* Bare spillene faget faktisk har. Uten denne fikk Caseintervju «Skift eller
       glid?» — kurveskift mot bevegelse langs kurven, som er ren makroøkonomi —
       pluss fire fliser som aldri kunne åpne seg, siden faget verken har
       symbolliste, økonomer eller aktiv læring. */
    lynGames: ["blitz", "tf", "skift", "kjede", "hode", "updown", "bit",
               "struktur", "feil", "graf", "estimat", "formel", "oddone"],
    /* «Skift eller glid?» beskriver et makrofenomen. Innholdet i banken er ekte
       casematte — volumeffekt, priskutt, 72-regelen, nullpunkt — så den beholdes
       under en merkelapp som stemmer. */
    lynLabels: {
      skift: { name: "Regn eller avgjør", emoji: "🔢", desc: "Tall og dømmekraft på tid" },
      formel: { name: "Match formelen", emoji: "🧮", desc: "Fra tallarket i kapittel 15" },
      oddone: { name: "En skiller seg ut", emoji: "🕵️", desc: "Hvilken hører ikke hjemme?" },
    },
    /* Standardstigen ender på «Sensor» og «Nobelkandidat», som passer et
       universitetsfag og ikke et jobbintervju. */
    lynLevels: [[0, "Fersking"], [120, "Søker"], [320, "Kandidat"], [650, "Til andre runde"],
                [1100, "Analyst"], [1700, "Consultant"], [2600, "Partnerklar"]],
    dybdeBanks: [
      { key: "grunnlag", label: "Grunnlaget", sub: "Hva som måles, interviewer-led mot candidate-led, og husene (kapittel 0–2).",
        tip: "Kortest av bankene, og den du bør ta først. Vet du ikke hva som vurderes, trener du i blinde." },
      { key: "struktur", label: "Struktur", sub: "Nedbrytning, MECE, hypoteser og de sju casetypene (kapittel 3–5).",
        tip: "Nivå 1–2 er definisjoner og anvendelse. Nivå 3–4 er hele strukturer bygget fra bunnen — gjør dem på papir og si dem høyt, ellers trener du på noe annet enn det som måles." },
      { key: "tall", label: "Tall", sub: "Hoderegning, estimering og figurlesing (kapittel 6–8 og tallarket).",
        tip: "Skriv utregningen ferdig før du åpner fasiten, og si framgangsmåten høyt. Et riktig svar du ikke kan forklare, gir ingen uttelling i rommet." },
      { key: "framforing", label: "Framføring og fit", sub: "Kommunikasjon, syntese og historiene (kapittel 9–12 og 14).",
        tip: "Ti av spørsmålene ber om en formulering, ikke en forklaring. Si dem faktisk høyt — det er den delen som føles rarest å øve på alene, og som betyr mest." },
    ],
    copy: {
      planEyebrow: "Studieplan · 11 moduler",
      planIntro: "Modulene er navngitt etter det du gjør, ikke etter hva du leser. Rekkefølgen følger hva som faktisk feller folk: strukturering og hoderegning først, historieporteføljen før første søknadsfrist, og lesing underveis i små doser.",
      dybdeIntro: "Selvrettet trening i tre bolker. Velg bank, filtrer på nivå, og skriv eller si svaret ferdig før du åpner fasiten. Fasitene sier hva som skiller et sterkt svar fra et middels — det er det skillet som avgjør om du går videre.",
      lynFoot: "Alt innhold er hentet fra manualen og fra kartleggingen av hvordan husene faktisk rekrutterer. Feil svar viser alltid forklaringen, det er der læringen skjer. Tips: legg siden til på Hjem-skjermen for app-følelse.",
    },
    /* Casetrening har ingen eksamen og ingen oppgavebank — den har caser. */
    modules: ["/plan", "/curriculum", "/lyn", "/quiz", "/flashcards", "/dybde", "/caser", "/mock", "/historier", "/review", "/search", "/progress"],
  },
];

/* Oppslag + valgt fag. window.EDU_SUBJECT settes av js/picker.js ved oppstart. */
window.EDU_SUBJECT = null;
window.EDU_SUBJECT_BY_ID = function (id) { return (window.EDU_SUBJECTS || []).find((s) => s.id === id) || null; };
