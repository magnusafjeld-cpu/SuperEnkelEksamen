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
    copy: { searchTerms: ["Solow", "steady state", "Romer", "MPK", "badekarmodell", "Phillips", "IS-MP", "UIP", "trilemma", "kvantitetsteori", "produksjonsgap", "Okun"],
            lynFoot: "Alt innhold er hentet fra eksamensmanualen og oppgavebanken. Feil svar viser alltid forklaringen, det er der læringen skjer. Tips: legg siden til på Hjem-skjermen for app-følelse." },
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
    scripts: ["fag/fie402/data.js", "fag/fie402/lyn.js", "fag/fie402/dybde.js", "fag/fie402/sett.js", "fag/fie402/kapitteloppgaver.js"],
    manual: {
      candidates: ["FIE402_Manual.html", "fag/fie402/manual.html", "../FIE402_Manual.html"],
      label: "FIE402_Manual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
      /* Formelsamlingen ligger sist, ikke i k22 som i SAM3. */
      refSections: { formulas: "k29" },
    },
    /* Kapittel 0 er kurs- og eksamensintroduksjon, k29 er ren referanse —
       ingen av dem teller som pensum i fremdriften. */
    /* EKSAMENSVEKT PER KAPITTEL, 1–5.
       Utledet av frekvenstabellen i docs/fie402-kursplan.md, men vektet mot
       KURBATOV-settene (H2024 og H2025), siden han setter eksamen i 2026. Et
       tema som er 8 av 11 historisk, men fraværende hos Kurbatov, får derfor
       lavere vekt enn treffene alene skulle tilsi — og omvendt for et tema han
       har løftet fram.

       Vises som prikker i pensum, på kapittelsidene, i studieplanen og i
       kapitteloppgavene, løfter tunge kapitler i repetisjonsmotoren, og styrer
       hvor mange kapitteloppgaver hvert kapittel har fått. */
    examWeightsNote: "utledet av hvor ofte temaet har kommet i elleve sett siden 2015, vektet mot de to siste settene, siden samme sensor lager eksamen i år. Antall kapitteloppgaver følger vekten.",
    examWeights: {
      0:  [1, "Kursintroduksjon og eksamensformat. Setter vaner, testes ikke."],
      1:  [1, "Tidsverdi og NPV. Forutsetning for alt, men aldri en oppgave for seg."],
      2:  [3, "Fri kontantstrøm bygges i hver eneste verdsettingsoppgave. 2021 P3, 2022 P3, 2017V P4."],
      3:  [2, "CAPM er i hvert sett, men testes gjennom tvillingkjeden i k4, ikke alene."],
      4:  [5, "Unlever/relever med tvillingfirma: 11 av 11 sett. Kursets mest eksaminerte ferdighet."],
      5:  [2, "Kredittmargin og forventet avkastning på risikabel gjeld. 2021 MC7–9, V2024 P3. Setter opp k24."],
      6:  [5, "MM I og II med rekapitalisering: 11 av 11. H2024 E3 og H2025 E3, 18 poeng hver."],
      7:  [4, "Skatteskjoldet bærer hele APV-siden. 2022 P1, 2023 P1, 2021 MC3, 2015 P3."],
      8:  [2, "Konkurskostnader og trade-off: 3 av 11, og fraværende hos Kurbatov."],
      9:  [4, "Risikoskifting: 5 av 11, men H2024 E4 er nøyaktig dette, og V2024 P1 ga 52 poeng."],
      10: [3, "Debt overhang og reforhandling: 5 av 11. 2017V P3, 2017H P1 og P4, 2021 P2."],
      11: [2, "Teoriene satt sammen. Verbal syntese, sjelden en egen oppgave."],
      12: [3, "Myers-Majluf: 8 av 11 historisk, men FRAVÆRENDE i begge Kurbatov-settene. Fortsatt pensum."],
      13: [2, "Hakkeorden, signalisering og markedstiming. Samme klynge som k12, samme forbehold."],
      14: [2, "Emisjon, IPO og SEO: 4 av 11. V2024 hentet seks av ti flervalg herfra, men flervalg er avskaffet."],
      15: [3, "Utbytte mot tilbakekjøp i perfekt marked. Payout er 7 av 11, og H2025 E3 hadde utbytte inne."],
      16: [2, "Payout med friksjoner. Del av de samme 7 av 11, men den mindre eksaminerte halvdelen."],
      17: [5, "WACC-metoden: 11 av 11, og vanligvis den største enkeltoppgaven i settet."],
      18: [5, "APV-metoden: 11 av 11 sammen med WACC. Regelen for skjoldrenten kom i hvert flervalgssett."],
      19: [4, "FTE og gjeldsjustering. H2025 E4(f) er steget nesten alle bommer på."],
      20: [3, "Full verdsetting ende til ende. Formen på H2025 E4, men trenes best gjennom hele sett."],
      21: [3, "Opsjonsgrunnlag og put-call-paritet: 4 av 11, og forutsetning for k22 og k24."],
      22: [4, "Binomisk og risikonøytral verdsetting: 7 av 11. H2024 E6 bygger direkte på den."],
      23: [4, "Black-Scholes. Bare 2 av 11 numerisk, MEN H2025 E1 var nøyaktig dette verbalt, 12 poeng."],
      24: [3, "Gjeld og EK som opsjoner: 8 av 11 historisk, 90 poeng i 2015 P4, men fraværende hos Kurbatov."],
      25: [5, "Realopsjoner: fast post siden 2017, og 20 poeng i BEGGE Kurbatov-settene."],
      26: [5, "M&A: 8 av 11, og 20–32 poeng i begge Kurbatov-settene. H2025 E6 er implisitt dealsannsynlighet."],
      27: [5, "Eierstyring: garantert 12-poengs verbal oppgave i det nye formatet. H2024 E2, H2025 E2."],
      28: [3, "Eksamenshåndverk. Viktig, men trenes ved å kjøre ekte sett på tid, ikke med egne oppgaver."],
      29: [1, "Formelsamling. Referanse, ikke pensum å øve på."],
    },
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
      searchTerms: ["unlever", "APV", "WACC", "MM II", "tax shield", "risk shifting", "debt overhang",
                    "Myers-Majluf", "put-call parity", "risk-neutral", "real options", "exchange ratio"],
      planEyebrow: "Studieplan · 25 moduler",
      planIntro: "Modul 1–21 bygger faget fra bunnen: grunnlaget, kapitalstruktur, informasjon og utbytte, verdsetting med gjeld, opsjoner, og til slutt M&A og eierstyring. Modul 22–25 er ren eksamenstrening på ekte sett. Innleveringene HW1 og HW2 har egne milepæler underveis.",
      dybdeIntro: "Selvrettet trening i seks bolker som følger kursets deler. Velg bank, filtrer på nivå og tema, og skriv svaret på papir før du åpner fasiten — eksamen er penn og papir.",
    },
    modules: ["/plan", "/curriculum", "/lyn", "/quiz", "/kapitteloppgaver", "/flashcards", "/dybde", "/sett", "/review", "/search", "/progress", "/notebooklm"],
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
              "fag/case/flashcards.js", "fag/case/caser.js",
              /* EY-Parthenon-bolken bygges av tools/bygg-eyp-caser.py og lastes
                 etter caser.js, siden den pusher inn i samme EDU_DATA.cases. */
              "fag/case/caser-eyp.js", "fag/case/mock.js"],
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
    modules: ["/plan", "/curriculum", "/lyn", "/quiz", "/flashcards", "/dybde", "/caser", "/mock", "/historier", "/review", "/search", "/progress", "/notebooklm"],
  },
  {
    id: "fie432",
    /* EKSAMENSVEKT PER KAPITTEL, 1–5. Utledet av registeret over alle 227
       spørsmål i de ni settene (docs/fie432-research/01-eksamens-dna.md, oppsummert
       i docs/fie432-kursplan.md), men vektet mot FLERVALGSSETTENE H2022, H2024 og
       H2025, fordi 2026-eksamen også er flervalg. Et tema som var stort i de åpne
       settene før 2020 og har forsvunnet siden, veier derfor mindre enn treffene
       alene skulle tilsi. Samme bruk som i FIE402. */
    examWeightsNote: "utledet av alle 227 spørsmål i de ni settene siden 2016, vektet mot flervalgssettene H2022–H2025, siden eksamen i år også er flervalg. Antall kapitteloppgaver følger vekten.",
    /* Hvor mange kapitteloppgaver hver vekt skal ha. Flervalgsoppgavene er korte
       (3–7 minutter), så tallene er langt høyere enn FIE402s lange åpne
       oppgaver, der standarden i tools/sjekk-kapitteloppgaver.js gjelder. */
    kapoppgPerVekt: { 5: 20, 4: 15, 3: 10, 2: 8, 1: 6 },
    examWeights: {
      0:  [1, "Kursintroduksjon og eksamensformat. Testes ikke."],
      1:  [4, "Effektiv skattesats og gjennomsnittsskatt: 7 av 9 sett, 5,3 % av poengene."],
      2:  [2, "Avkastning etter skatt og tidsverdien av et fradrag: 2 av 9 sett, rundt 1 % av poengene. Verktøy for senere kapitler."],
      3:  [1, "Avkastning over tid og hvem som eier hva. Forelest, men ikke et eget tema i noen av de ni settene."],
      4:  [2, "Investeringscasene bruker reglene fra k5 og k7 på bolig og aksjer. Ikke et eget tema i settene, men regnerutinene går igjen."],
      5:  [5, "Aksjonærmodellen: oppjustering og eierskatt i 7 av 9 sett (7,7 %), skjerming i 5 av 9 (4,7 %). Skjerming alene var 20 % av H2022."],
      6:  [2, "Fritaksmetoden og exit-skatt: exit-skatt i 2 av 9 sett, 1,6 % av poengene. Resten av den internasjonale delen ligger i k13."],
      7:  [4, "Formuesskatt: gjeldsfordeling i 7 av 9 sett (7,6 %), verdsetting i 3 av 9. Med i både H2024 og H2025."],
      8:  [4, "Formuesskatt som avkastningsskatt: fraværende før H2021, men 17 % av poengene i H2025, og eget pensum i 2026-planen."],
      9:  [3, "Bedriftens tilpasning, gjeld mot egenkapital: bare 2 av 9 sett, men 10 % av H2025."],
      10: [2, "Progressivitet, flat skatt og rettferdighet: 2 av 9 sett, under 1,2 % av poengene."],
      11: [5, "Stykkskatt-incidens: 8 av 9 sett og 11,6 % av poengene, kursets mest testede enkelttema. 19 % av H2024."],
      12: [2, "Skatt, risiko og implisitte skatter: 2 av 9 sett, rundt 1 % av poengene."],
      13: [3, "Internasjonal skatt: 17–19 % av H2022 og H2024, men borte i H2025 og uten gjesteforeleser i 2026. Usikker."],
      14: [5, "Sparing og portefølje: Merton med humankapital i 5 av 9 sett, 14 % av både H2022 og H2025, pluss ln-nytte, tapsaversjon og kapitalmarkedslinjen."],
      15: [4, "Pensjon: to temaer i 6 av 9 sett hver, over 10 % av poengene samlet, men bare 4–6 % i de to siste settene."],
      16: [3, "Lån: boliglånsforskrift i 4 av 9 sett, annuitet og effektiv rente i 3 av 9. 9 % av H2022, borte siden."],
      17: [4, "Forsikring og forventet nytte: 4 av 9 sett, og stigende: 8 % av H2024 og 14 % av H2025."],
      18: [2, "Finansiell psykologi: atferdsfinans i 2 av 9 sett. Tapsaversjon testes ellers via k14."],
      19: [3, "Minuspoeng fra 2026: rutinen for når du svarer og når du står over gjelder hvert spørsmål. Trenes gjennom sett på tid."],
      20: [1, "Satser og formler. Referanse, ikke pensum å øve på."],
    },
    name: "FIE432 Personlig økonomi",
    short: "FIE432",
    tagline: "NHH · eksamenstrening",
    logo: "PØ",
    blurb: "Skattesystemet, aksjonær- og formuesbeskatningen, skatteteorien og husholdningens finansbeslutninger — med ni tidligere eksamener rettet automatisk.",
    accent: "#a8521c", accentInk: "#8a4116", accentSoft: "#fbf0e8", accentSoft2: "#f4dcc9",
    scripts: ["fag/fie432/data.js", "fag/fie432/quiz.js", "fag/fie432/dybde.js", "fag/fie432/sett.js", "fag/fie432/kapitteloppgaver.js"],
    manual: {
      candidates: ["FIE432_Manual.html", "fag/fie432/manual.html", "../FIE432_Manual.html"],
      label: "FIE432_Manual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
      /* Satser og formler ligger sist. Radene der blir automatisk til flashcards,
         og rekkefølgen er permanent — id-ene er posisjonsbaserte. */
      refSections: { formulas: "k20" },
    },
    /* k0 er kurs- og eksamensintroduksjon, k20 er ren referanse — ingen av dem
       teller som pensum i fremdriften. */
    coreChapters: { from: 1, to: 19 },
    /* Uten denne arver faget SAM3s makrodeler i stillhet. Deltitlene i manualen
       brukes IKKE til tilordning; det er utelukkende denne tabellen som gjelder. */
    parts: [
      { id: 0, tag: "Del 0", name: "Grunnlaget", chapters: [0, 1, 2] },
      { id: 1, tag: "Del I", name: "Aktiva og avkastning", chapters: [3, 4] },
      { id: 2, tag: "Del II", name: "Aksjonær- og formuesbeskatning", chapters: [5, 6, 7, 8] },
      { id: 3, tag: "Del III", name: "Skatteteori", chapters: [9, 10, 11, 12, 13] },
      { id: 4, tag: "Del IV", name: "Personlig finans", chapters: [14, 15, 16, 17, 18] },
      { id: 5, tag: "Del V", name: "Eksamenshåndverk", chapters: [19] },
      { id: 6, tag: "Referanse", name: "Satser og formler", chapters: [20] },
    ],
    dybdeBanks: [
      { key: "grunnlag", label: "Grunnlaget", sub: "Satser, progressivitet, effektiv skattesats og avkastning før og etter skatt (kapittel 1–4).",
        tip: "Ta denne først. Nesten hver eneste regneoppgave i faget hviler på at du vet hvilken sats som gjelder hvilken inntekt." },
      { key: "aksjonar", label: "Aksjonær og formue", sub: "Skjerming, oppjustering, fritaksmetoden, verdsettingsrabatter og gjeldsfordeling (kapittel 5–8).",
        tip: "Kursets tyngste del, og den mest eksaminerte. Sett opp tabellen på papir hver gang — skjermingskjeden og gjeldsfordelingen går galt i hodet." },
      { key: "skatteteori", label: "Skatteteori", sub: "Nøytralitet, progressivitet, insidens, risiko og internasjonal skatt (kapittel 9–13).",
        tip: "Insidens er i åtte av ni eksamenssett. Kan du utlede ∂p/∂t, ser du et feil fortegn på et blunk." },
      { key: "finans", label: "Personlig finans", sub: "Portefølje, Merton, pensjon, lån, forsikring og atferd (kapittel 14–18).",
        tip: "Halvparten av spørsmålene her er faktakunnskap om ordninger — folketrygd, IPS, BSU, utlånsforskriften. Den andre halvparten er tre formler." },
    ],
    copy: {
      searchTerms: ["skjerming", "oppjustering", "eierskatt", "formuesskatt", "gjeldsfordeling",
                    "insidens", "implisitt skatt", "fritaksmetoden", "exit-skatt", "Merton",
                    "delingstall", "forventet nytte"],
      planEyebrow: "Studieplan · 21 moduler",
      planIntro: "Modul 1–18 bygger faget fra bunnen: grunnlaget, aktiva og avkastning, aksjonær- og formuesbeskatningen, skatteteorien og personlig finans. Modul 19–21 er hele eksamenssett, det siste som generalprøve på tid med minuspoeng slått på. Vektingen følger hva som faktisk har kommet på eksamen.",
      dybdeIntro: "Selvrettet trening i fire bolker som følger kursets deler. Velg bank, filtrer på nivå, og regn ferdig på papir før du åpner fasiten — eksamen er flervalg, og et tall du ikke har regnet selv, gjenkjenner du ikke blant fire som ligner.",
      /* Hakeparentesene er FIE432s egen konvensjon, og en leser som bare får
         teksten har ingen mulighet til å gjette hva de betyr. */
      notebooklmNotasjon: [
        "[dagens regel] merker en sats som faktisk gjelder for inntektsåret 2026.",
        "[eksempeltall] merker et oppdiktet tall, eller et hentet fra en eksamensoppgave — altså ikke gjeldende rett.",
      ],
    },
    /* Faget har verken oppgavebank eller åpne eksamensoppgaver — det har tre
       flervalgssett, som kjøres i /sett. Flashcards er med fordi de 100 radene i
       formelsamlingen k20 blir til kort automatisk; quiz, dybde og lyn legges
       til når de dataene er skrevet. */
    modules: ["/plan", "/curriculum", "/quiz", "/kapitteloppgaver", "/flashcards", "/dybde", "/sett", "/review", "/search", "/progress", "/notebooklm"],
  },
  {
    id: "fie459",
    /* Bevisst kort fag: én kapittel per forelesning, skrevet for å gi en grei
       forståelse av temaene (docs/fie459-forfatterspek.md). Engelsk fagtekst som
       FIE402, fordi eksamen besvares på engelsk. Ingen examWeights: det finnes
       ingen tidligere eksamener å vekte etter, og syllabusen gir ingen vekter. */
    name: "FIE459 Sustainable Finance",
    short: "FIE459",
    tagline: "NHH · eksamenstrening",
    logo: "SF",
    blurb: "Etikk, eksternaliteter, eierstyring, rapportering og ESG-investering, kort og konsist, med quiz i eksamensformatet: flervalg og sant/usant.",
    /* Mosegrønn: gulgrønn, så den skilles fra FIE402s blågrønne smaragd i velgeren. */
    accent: "#5b7a19", accentInk: "#465f12", accentSoft: "#f2f6e6", accentSoft2: "#e0eac4",
    scripts: ["fag/fie459/data.js", "fag/fie459/quiz.js"],
    manual: {
      candidates: ["FIE459_Manual.html", "fag/fie459/manual.html", "../FIE459_Manual.html"],
      label: "FIE459_Manual.html",
      hint: "hele pensum lastes inn og lagres lokalt (du slipper å velge igjen)",
      /* Faget har ingen formelsamling. Tomt objekt, ikke utelatt: uten feltet
         arves SAM3s #k21–#k23, og FIE459 har ingen slike kapitler. */
      refSections: {},
    },
    /* k0 er kurs og eksamen og teller ikke som pensum i fremdriften. */
    coreChapters: { from: 1, to: 13 },
    /* Syllabusens tre deler. Deltitlene i manualen brukes ikke til tilordning. */
    parts: [
      { id: 0, tag: "Part 0", name: "The course", chapters: [0] },
      { id: 1, tag: "Part I", name: "Sustainable finance and business ethics", chapters: [1, 2, 3] },
      { id: 2, tag: "Part II", name: "Sustainability challenges to corporates", chapters: [4, 5, 6, 7] },
      { id: 3, tag: "Part III", name: "Investing and financing sustainability", chapters: [8, 9, 10, 11, 12, 13] },
    ],
    copy: {
      searchTerms: ["externality", "double materiality", "stakeholder", "CSRD", "EU taxonomy", "SFDR",
                    "ESG integration", "stewardship", "greenium", "integrated value", "SF 2.0"],
      planEyebrow: "Studieplan · 8 moduler",
      planIntro: "Modul 1–6 følger forelesningene: grunnlaget, etikk og eksternaliteter, selskapet og investering. Modul 7 er de foreløpige kapitlene om obligasjoner, bank, forsikring og myndighetene, og modul 8 er repetisjon i eksamensformatet. Faget er bevisst kort: målet er en grei forståelse av hvert tema.",
    },
    /* Ingen dybdetrening, lynlæring eller eksamenssett: det finnes ingen
       tidligere eksamener, og faget skal være kort. Eksamen er flervalg og
       sant/usant, og det er nøyaktig formatet quizen har. */
    modules: ["/plan", "/curriculum", "/quiz", "/flashcards", "/review", "/search", "/progress", "/notebooklm"],
  },
];

/* Oppslag + valgt fag. window.EDU_SUBJECT settes av js/picker.js ved oppstart. */
window.EDU_SUBJECT = null;
window.EDU_SUBJECT_BY_ID = function (id) { return (window.EDU_SUBJECTS || []).find((s) => s.id === id) || null; };
