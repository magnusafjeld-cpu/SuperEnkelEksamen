/* ===================== CASEINTERVJU · FAGDATA =====================
   Innholdet er på norsk, men fagtermene står på engelsk der de faktisk heter
   det — issue tree, MECE, candidate-led. Du må kunne si dem i rommet.

   Pensumteksten står IKKE her. Den parses fra Case_Manual.html.
   Studieplanen er modulbasert (plan.mode = "modules"): «i dag» er første
   ufullførte modul, ikke en dato.
   ================================================================== */
window.EDU_DATA = window.EDU_DATA || {};

window.EDU_DATA.plan = {
  mode: "modules",
  totalDays: 12,
  startDate: "2026-08-30",
  phaseColors: { "Grunnlaget": "slate", "Struktur": "indigo", "Tall": "amber", "Fit": "rose", "Framføring": "teal", "Generalprøve": "green" },
  /* Modulene er navngitt etter det du GJØR, og hver av dem har en arbeidsliste
     med lenke rett inn i øvelsen. Rekkefølgen følger hva som feller folk:
     strukturering og hoderegning først, historiene før første søknadsfrist,
     lesing underveis i små doser. Se docs/case-kursplan.md. */
  days: [
    { day: 1, phase: "Grunnlaget", title: "Kjør din første case, og se hva som faktisk måles",
      chapters: [0, 1], estMinutes: 75,
      tasks: [
        { t: "Kjør kinocasen fra prompt til anbefaling", sub: "Casetrening · 30 min · ha penn og papir klart", rute: "#/caser" },
        { t: "Ta en runde hoderegning", sub: "Lynlæring · 12 kort mot klokka", rute: "#/lyn" },
        { t: "Quiz deg på de to første kapitlene", sub: "Quiz · sjekk at det sitter", rute: "#/quiz" },
      ],
      goals: [
        "Kjøre en hel case fra prompt til anbefaling, med papir ved siden av",
        "Gjøre rede for de fire tingene som vurderes: struktur, regning, dømmekraft og kommunikasjon",
        "Skille interviewer-led fra candidate-led, og si hvordan oppførselen din endres",
      ],
      keyConcepts: ["MECE", "Issue tree", "Candidate-led", "Profitt-tre", "Topp-ned"],
      tip: "Snakk høyt mens du løser casen, også når du sitter alene. Det føles rart, og det er nettopp derfor det må øves — i rommet er tenkningen din bare verdt noe hvis noen kan høre den." },

    { day: 2, phase: "Struktur", title: "Åtte struktureringsprompter på rad",
      chapters: [3], estMinutes: 60,
      tasks: [
        { t: "Kjør «Strukturer!» tre ganger", sub: "Lynlæring · 90 sekunder per prompt, ni prompter totalt", rute: "#/lyn" },
        { t: "Dybdetrening: struktur, nivå 1 og 2", sub: "Dybdetrening · definisjoner og anvendelse", rute: "#/dybde" },
      ],
      goals: [
        "Bryte ned ni ulike problemer på 90 sekunder hver",
        "Bygge hver struktur fra en identitet eller en verdikjede, ikke fra en temaliste",
        "Avslutte hver eneste med en hypotese du kan si hva som ville avkreftet",
      ],
      keyConcepts: ["Driver tree", "Identitet", "Verdikjede", "MECE", "Segmentering"],
      tip: "Kvantitet slår dybde her. Ni ulike prompter gjør mer for deg enn én prompt gjort perfekt — det er gjenkjennelsen av nye problemer du trener, ikke løsningen av et gammelt." },

    { day: 3, phase: "Struktur", title: "Hypotesen — og hva som skiller A fra C",
      chapters: [4], estMinutes: 60,
      tasks: [
        { t: "Kjør «Strukturer!» tre ganger til", sub: "Lynlæring · si hypotesen høyt hver gang", rute: "#/lyn" },
        { t: "Dybdetrening: struktur, nivå 3 og 4", sub: "Dybdetrening · bygg hele trær fra bunnen", rute: "#/dybde" },
      ],
      goals: [
        "Formulere en hypotese som kan vise seg gal, og si hvilket tall som ville avkreftet den",
        "Kjenne igjen forskjellen på et A-svar og et C-svar på samme prompt",
        "Holde struktureringen innenfor fire til fem minutter",
      ],
      keyConcepts: ["Falsifiserbar hypotese", "Datauttrekk", "Tidsbudsjett", "Skreddersøm"],
      tip: "Les 4.3 to ganger. C-svaret der er ikke en stråmann — det er et plausibelt flinkt svar, og det er nettopp derfor det er nyttig å se hva som mangler i det." },

    { day: 4, phase: "Struktur", title: "Casetypene, og en case om markedsinngang",
      chapters: [5], estMinutes: 65,
      tasks: [
        { t: "Kjør ladecasen: skal Nordlys til Sverige?", sub: "Casetrening · 35 min · markedsinngang, candidate-led", rute: "#/caser" },
        { t: "Dybdetrening: casetyper", sub: "Dybdetrening · filtrer på temaet Casetyper", rute: "#/dybde" },
      ],
      goals: [
        "Si kjernespørsmålet i hver av de sju casetypene på én setning",
        "Kjøre en markedsinngangscase og huske det tredje spørsmålet: er det verdt det mot alternativene?",
        "Definere etterspørselen riktig — ikke hele markedet, men den delen som faktisk er kunde",
      ],
      keyConcepts: ["Markedsinngang", "Inngangsform", "Enhetsøkonomi", "Nullpunkt"],
      tip: "Legg merke til hvordan ladecasen straffer å bruke elbilandelen som markedsstørrelse. Kunden er bilisten uten hjemmelading — bruker du hele bilparken, får du et marked som er flere ganger for stort." },

    { day: 5, phase: "Tall", title: "Hoderegning, og å finne feilen",
      chapters: [6], estMinutes: 55,
      tasks: [
        { t: "Kjør «Finn feilen»", sub: "Lynlæring · seks utregninger, og noen er helt riktige", rute: "#/lyn" },
        { t: "Kjør hoderegning to ganger", sub: "Lynlæring · prosentankere og tierpotenser", rute: "#/lyn" },
        { t: "Dybdetrening: tall, nivå 1 og 2", sub: "Dybdetrening · teknikkene, ett regnestykke hver", rute: "#/dybde" },
      ],
      goals: [
        "Bruke prosentankere fra 10 og 1 prosent i stedet for å regne rått",
        "Finne feilen i en utregning under tidspress — også når det ikke er noen",
        "Si framgangsmåten høyt før tallet, og oppgi enhet hver gang",
      ],
      keyConcepts: ["Prosentpoeng", "Kompenserende avrunding", "72-regelen", "Brøktabellen", "Tierpotens"],
      tip: "De sju rundene uten feil er de viktigste. Uten dem lærer du bare å lete til du finner noe — og det er nøyaktig den vanen som får deg til å «rette» et riktig tall i rommet." },

    { day: 6, phase: "Tall", title: "Estimering, og tallene du skal kunne utenat",
      chapters: [7, 15], estMinutes: 70,
      tasks: [
        { t: "Kjør «Bygg estimatet» to ganger", sub: "Lynlæring · fire kjeder med sanity-sjekk", rute: "#/lyn" },
        { t: "Kjør varmepumpecasen", sub: "Casetrening · 25 min · ren estimering", rute: "#/caser" },
        { t: "Gå gjennom flashcardene fra tallarket", sub: "Flashcards · dekket «formel» · 44 kort", rute: "#/flashcards" },
      ],
      goals: [
        "Bygge et markedsestimat leddvis, med enhet på hvert ledd",
        "Kunne de norske ankerne utenat: 5,6 millioner, 2,65 millioner husholdninger, 230 milliarder i dagligvare",
        "Avslutte hvert estimat med en sanity-sjekk mot noe du kjenner",
      ],
      keyConcepts: ["Topp-ned", "Bunn-opp", "Installert base", "Sanity-sjekk", "Per capita"],
      tip: "Ett anker er verdt mer enn de andre til sammen: én krone per nordmann per dag er omtrent to milliarder i året. Har du det, kan du prise nesten et hvilket som helst forbrukermarked på ti sekunder." },

    { day: 7, phase: "Tall", title: "Figurlesing — og fellene som ikke forsvinner med erfaring",
      chapters: [8], estMinutes: 50,
      tasks: [
        { t: "Kjør «Les grafen» to ganger", sub: "Lynlæring · tolv figurer, de fleste med en felle", rute: "#/lyn" },
        { t: "Dybdetrening: figurlesing", sub: "Dybdetrening · filtrer på temaet Figurlesing", rute: "#/dybde" },
      ],
      goals: [
        "Lese tittel, akser og enhet høyt før du sier noe om formen",
        "Fange en avkuttet y-akse hver gang, mekanisk",
        "Si observasjon, implikasjon og neste steg — i den rekkefølgen",
      ],
      keyConcepts: ["Aksekutt", "Indeksert serie", "Prosent av prosent", "Miks bak flat total"],
      tip: "Aksekutt-fella er den ene i hele kurset du ikke kan tenke deg ut av. Forskningen viser at effekten består etter opplæring, og at grafkompetanse ikke beskytter. Derfor drilles den mekanisk: les startverdien høyt, hver gang." },

    { day: 8, phase: "Fit", title: "Skriv de fire første historiene dine",
      chapters: [11], estMinutes: 80, milestone: "Halve porteføljen",
      tasks: [
        { t: "Skriv fire historier med alle sju feltene", sub: "Historier · ta deg tid på «hvem var uenig, og hvorfor»", rute: "#/historier" },
        { t: "Merk hver historie med høyst to dimensjoner", sub: "Historier · se hullene i matrisen", rute: "#/historier" },
      ],
      goals: [
        "Skrive fire historier der alle sju feltene er fylt ut",
        "Sette tall på utfallet i minst tre av dem",
        "Se hvilke dimensjoner som fortsatt er tomme i dekningsmatrisen",
      ],
      keyConcepts: ["Leadership", "Connection", "Drive", "Growth", "Så derfor"],
      tip: "Begynn med den historien du allerede forteller når noen spør hva du har fått til. Den er nesten alltid godt nok råstoff — den mangler bare tall, en motpart og en «så derfor»." },

    { day: 9, phase: "Framføring", title: "Å snakke mens du tenker, og å lande anbefalingen",
      chapters: [9, 10], estMinutes: 85,
      tasks: [
        { t: "Kjør bakericasen", sub: "Casetrening · 40 min · M&A, interviewer-led", rute: "#/caser" },
        { t: "Se ett mock-intervju med stopp-punkter", sub: "Mock · pause og gjør trinnet selv før du hører fortsettelsen", rute: "#/mock" },
        { t: "Dybdetrening: framføring og fit", sub: "Dybdetrening · ti av spørsmålene ber om en formulering", rute: "#/dybde" },
      ],
      goals: [
        "Bruke skiltingsfraser som gjør resonnementet mulig å følge",
        "Håndtere å bli motsagt: skille ny informasjon fra press-testing",
        "Levere anbefaling, grunner, risiko og neste steg på under ett minutt",
      ],
      keyConcepts: ["Signposting", "RRRN", "Syntese mot oppsummering", "Én anerkjennelse"],
      tip: "Sett telefonen på opptak når du gjør syntesen. Å høre seg selv er ubehagelig og lærerikt — særlig de tre sekundene du bruker på «eh» før hver setning." },

    { day: 10, phase: "Fit", title: "Fire historier til, sondetesten, og «why this firm»",
      chapters: [12], estMinutes: 75, milestone: "Porteføljen ferdig",
      tasks: [
        { t: "Skriv fire historier til", sub: "Historier · fyll hullene matrisen viste", rute: "#/historier" },
        { t: "Kjør sondetesten på alle historiene", sub: "Historier · svar høyt, terskelen er åtte av tolv", rute: "#/historier" },
        { t: "Skriv «why consulting» og «why firm» som egne historier", sub: "Historier · og bruk byttetesten på dem", rute: "#/historier" },
      ],
      goals: [
        "Ha minst to historier per dimensjon og minst fire ulike kontekster",
        "Vite hvilke historier som er hovedhistorier og hvilke som er reserver",
        "Ha et «why firm»-svar som ikke fungerer på et annet hus",
      ],
      keyConcepts: ["Sondetest", "Dekningsmatrise", "Byttetesten", "Navngitt samtale"],
      tip: "Byttetesten er brutal og tar ti sekunder: fungerer «Why BCG» ordrett som «Why McKinsey», har du ikke svart på spørsmålet. Da mangler du en navngitt samtale med noen som jobber der." },

    { day: 11, phase: "Grunnlaget", title: "Husene, prosessene og de digitale testene",
      chapters: [2, 13], estMinutes: 60,
      tasks: [
        { t: "Se to mock-intervjuer, ett av hver stilart", sub: "Mock · filtrer på interviewer-led og candidate-led", rute: "#/mock" },
        { t: "Kjør «Finn feilen» og hoderegning", sub: "Lynlæring · de digitale testene er hastighetstester", rute: "#/lyn" },
        { t: "Quiz deg på husene og testene", sub: "Quiz · sjekk at du husker hvem som tester hva", rute: "#/quiz" },
      ],
      goals: [
        "Vite hvilken caseform hvert hus bruker, og endre oppførsel deretter",
        "Kjenne forskjellen på Solve, BCGs logikktest og en numerisk resonnementstest",
        "Vite hvilke frister som gjelder, og ha søkt på dem",
      ],
      keyConcepts: ["Interviewer-led", "Candidate-led", "Solve", "Redrock", "Logisk resonnement"],
      tip: "Distraktorene i numeriske tester er bygget av de vanligste feilene. Det betyr at når du bommer på en, har du sannsynligvis gjort nøyaktig den feilen testen var laget for å fange — noter hvilken." },

    { day: 12, phase: "Generalprøve", title: "Tre caser på rad, uten pause",
      chapters: [14], estMinutes: 120, milestone: "Generalprøve",
      tasks: [
        { t: "Kjør prisingscasen", sub: "Casetrening · 30 min · verdien må lande i samme lomme som betaler", rute: "#/caser" },
        { t: "Kjør vekstcasen", sub: "Casetrening · 30 min · omsetningen er flat, kundene vokste", rute: "#/caser" },
        { t: "Kjør slakterikasen", sub: "Casetrening · 40 min · flaskehals, avansert", rute: "#/caser" },
        { t: "Se på treningsraden i fremdriften", sub: "Fremdrift · hvilke trinn er gjentatt svake?", rute: "#/progress" },
      ],
      goals: [
        "Kjøre tre caser etter hverandre uten pause, slik en intervjudag faktisk er",
        "Score deg selv strengt — distinkt betyr distinkt",
        "Finne det ene trinnet som gjentatt er svakest, og trene bare det etterpå",
      ],
      keyConcepts: ["Flaskehals", "Mikseffekt", "Betalingsvillighet", "Selvvurdering"],
      tip: "Ikke se på fasiten mellom casene. Hele poenget med å ta dem på rad er at du kjenner hvordan konsentrasjonen faller — og det er den følelsen du skal ha møtt før du møter den hos McKinsey." },
  ],
};

window.EDU_DATA.quizzes = [
  { id: "q1", ch: 1, oppg: 1, type: "mcq",
    q: "Hva er den farligste feilen i en candidate-led case?",
    options: [
      "Å vente på at intervjueren gir deg neste spørsmål",
      "Å stille for mange oppklarende spørsmål",
      "Å regne feil på et enkelt regnestykke",
      "Å bruke for lang tid på struktureringen",
    ],
    answer: 0,
    explanation: "I en candidate-led case er det du som skal drive den fremover. Sitter du og venter, leser intervjueren det som at du ikke vet hvor du vil. Det motsatte gjelder hos interviewer-led hus, der det å vandre av gårde i egen retning er den farlige feilen — derfor er det verdt å avklare hvilken type det er.",
  },
  { id: "q2", ch: 1, oppg: 1, type: "mcq",
    q: "Hvorfor er et profitt-tre et tryggere utgangspunkt enn en temaliste?",
    options: [
      "Fordi det er raskere å tegne",
      "Fordi det bygger på en identitet og derfor er MECE av seg selv",
      "Fordi intervjuerne forventer å se det",
      "Fordi det gjør regningen enklere",
    ],
    answer: 1,
    explanation: "Resultat = inntekter − kostnader er en identitet: grenene kan ikke overlappe, og de kan ikke etterlate hull. En temaliste som «marked, konkurrenter, kunder, kostnader» har ingen slik garanti, og der oppstår hullene.",
  },
  { id: "q3", ch: 0, oppg: 1, type: "mcq",
    q: "Hva er begrunnelsen for at fasiten er låst til du har skrevet ditt eget svar?",
    options: [
      "For å måle hvor lang tid du bruker",
      "Fordi en løsning du ikke har forsøkt på gir gjenkjennelse, ikke kunnskap",
      "For å hindre juks",
      "Fordi fasitene er lange",
    ],
    answer: 1,
    explanation: "En løsning føles opplagt i det man leser den. Den følelsen er gjenkjennelse, og den forsvinner i rommet. Det eneste som skiller trening fra lesing, er at forsøket kommer først.",
  },
  { id: "q4", ch: 1, oppg: 1, type: "short",
    q: "Nevn de fire tingene som vurderes i et caseintervju, og si i én linje hva hver av dem egentlig spør om.",
    model: [
      "Struktur — klarer du å dele et ukjent problem i biter som verken overlapper eller etterlater hull, og er bitene dette problemets biter?",
      "Kvantitativt håndverk — regner du riktig og raskt nok, og sier du framgangsmåten høyt så noen kan følge deg?",
      "Dømmekraft — ser du hva tallet betyr, skiller du symptom fra årsak, og vet du når du har nok til å konkludere?",
      "Kommunikasjon — kommer svaret først, tåler du å bli motsagt, og ville du sluppet inn til en klient i morgen?",
    ],
  },
];

window.EDU_DATA.flashcards = [
  { id: "fc1", ch: 1, deck: "begrep", front: "MECE",
    back: "<b>Mutually Exclusive, Collectively Exhaustive.</b><br>Grenene i strukturen skal ikke overlappe, og til sammen skal de dekke hele problemet.<br><br>Den andre halvdelen er den vanskelige, for den krever at du vet hva du <i>ikke</i> har tenkt på. Praktisk test: «hvis alle grenene mine var uendret, kunne resultatet likevel ha falt?» Er svaret ja, mangler du en gren." },
  { id: "fc2", ch: 1, deck: "begrep", front: "Interviewer-led mot candidate-led",
    back: "<b>Interviewer-led</b> (typisk McKinsey): de fører deg fra spørsmål til spørsmål. Din jobb er å svare skarpt på akkurat det som spørres om. Farligste feil: å vandre av gårde.<br><br><b>Candidate-led</b> (typisk Bain, BCG, Arkwright): du sier hva du vil se på og hvorfor. Farligste feil: å vente på neste spørsmål.<br><br>Det er legitimt å spørre hvilken det er." },
  { id: "fc3", ch: 1, deck: "begrep", front: "Hvorfor ferdige rammeverk er blitt et negativt signal",
    back: "Husene har brukt tjue år på å lære seg å se 3C, 4P og Porter. Å legge et ferdig rammeverk over en case viser at du behandler et konkret problem som en kategori.<br><br><b>Det som har erstattet dem:</b> bygg fra en identitet eller en verdikjede som gjelder akkurat denne klienten, og si hvilken gren du tror svaret ligger i." },
  { id: "fc4", ch: 0, deck: "begrep", front: "Prioriteringen når du har få uker",
    back: "<b>1. Hoderegning</b> hver dag i korte økter — den eneste ferdigheten som blir målbart bedre av ren mengde, og hard å redde i rommet.<br><b>2. Strukturering</b> på mange <i>ulike</i> prompter; bredde slår dybde.<br><b>3. Hele caser</b> på tid, gjerne to i uka.<br><b>4. Fit-historiene</b> skrevet ned — én kveld som redder et helt intervju." },
];

window.EDU_DATA.activeLearning = {};
window.EDU_DATA.exams = { format: { duration: "", tasks: 0, weights: [], keyInsight: "" }, tasks: [] };
window.EDU_DATA.glossary = {
  economists: [],
  symbols: [
    { sym: "MECE", name: "Mutually exclusive, collectively exhaustive — grener som verken overlapper eller etterlater hull", chapters: [1] },
    { sym: "Issue tree", name: "Nedbrytningen av problemet i grener som kan undersøkes hver for seg", chapters: [1] },
    { sym: "Prompt", name: "Åpningen av casen: klienten, situasjonen og spørsmålet", chapters: [1] },
    { sym: "Exhibit", name: "Figuren eller tabellen intervjueren gir deg midtveis", chapters: [1] },
  ],
};

/* ===================== HISTORIEPORTEFØLJEN =====================
   Dimensjonene er McKinseys, med navnene de fikk sommeren 2025. De gamle står
   i beskrivelsen, fordi alt skriftlig materiale der ute fortsatt bruker dem.
   BCG og Bain spør etter det samme, bare uten navn på dimensjonene — så
   matrisen er nyttig uansett hvem du søker.

   Sondene er den rekonstruerte tolvpunktslisten ex-MBB-coacher opererer med.
   Den er ikke publisert av firmaet; se docs/case-research/05-fit-og-framforing.md
   for kildeklassifiseringen. Terskelen på 8 av 12 kommer fra samme sted.
   =============================================================== */
window.EDU_DATA.historier = {
  intro: "Fit-delen kan ikke leses inn. Den krever seks til ti historier som er skrevet ned, som dekker alle dimensjonene, og som tåler å bli boret i. Det er en kveldsjobb, og den redder et helt intervju hvis den er gjort.",
  sondeIntro: "Svar høyt på hver enkelt, uten å skrive noe. Kryss av bare der du faktisk hadde et svar du ville sagt til en partner — ikke der du tror du kunne funnet på noe.",
  regler: { minPerDim: 2, maksPerHistorie: 2, minKontekster: 4, sondeTerskel: 8 },
  dimensjoner: [
    { id: "leadership", navn: "Leadership", kort: "Leader",
      beskrivelse: "Het Inclusive Leadership. Du fikk mennesker til å trekke sammen — særlig noen som ikke rapporterte til deg og ikke måtte høre på deg." },
    { id: "connection", navn: "Connection", kort: "Connect",
      beskrivelse: "Het Personal Impact. Du overbeviste noen som var uenig, og du forsto hvorfor de var uenige. Dette er en menneske-test, ikke en problemløsningstest — det er her flest svar blir for tynne." },
    { id: "drive", navn: "Drive", kort: "Drive",
      beskrivelse: "Het Entrepreneurial Drive. Du satte i gang noe selv, uten at noen ba deg, og drev det gjennom motstand." },
    { id: "growth", navn: "Growth", kort: "Growth",
      beskrivelse: "Het Courageous Change. Du tok en risiko, gjorde en feil eller endret kurs — og kan si nøyaktig hva du lærte. Historier uten refleksjon er særlig dødelige her." },
  ],
  sonder: [
    "Hva var den hardeste beslutningen, og hvorfor var den hard?",
    "Hvilke alternativer vurderte du, og hvorfor forkastet du dem?",
    "Hva gjorde du som andre ikke gjorde? Skill ditt bidrag fra gruppens.",
    "Hvem motsatte seg, og hvorfor mente de det de mente?",
    "Hva sa du nøyaktig til den personen? Gjengi replikken.",
    "Hvordan reagerte de, og hva skjedde umiddelbart etterpå?",
    "Hvordan justerte du da forutsetningene endret seg underveis?",
    "Hvilken tilbakemelding fikk du etterpå, fra hvem?",
    "Hva ville du gjort annerledes i dag?",
    "Hva skjedde nedstrøms — hvilke ringvirkninger fikk det?",
    "Hvordan ville den andre personen beskrevet din rolle?",
    "Hvilke avveininger godtok du bevisst, og hva kostet de?",
  ],
};
