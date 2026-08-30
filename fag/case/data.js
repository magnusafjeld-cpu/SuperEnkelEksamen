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
  totalDays: 2,
  startDate: "2026-08-30",
  phaseColors: { "Grunnlaget": "slate", "Struktur": "indigo", "Tall": "amber", "Casetypene": "teal", "Framføring og fit": "rose" },
  days: [
    { day: 1, phase: "Grunnlaget", title: "Slik brukes kurset, og hva intervjuet faktisk måler",
      chapters: [0, 1], estMinutes: 55,
      goals: [
        "Gjøre rede for de fire tingene som vurderes: struktur, kvantitativt håndverk, dømmekraft og kommunikasjon",
        "Skille interviewer-led fra candidate-led, og si hvordan oppførselen din skal endres mellom dem",
        "Forklare hvorfor ferdige rammeverk er blitt et negativt signal, og hva som har erstattet dem",
        "Bygge en struktur fra en identitet i stedet for fra en huskeliste",
      ],
      keyConcepts: ["MECE", "Issue tree", "Interviewer-led", "Candidate-led", "Hypotesedrevet", "Topp-ned"],
    },
    { day: 2, phase: "Tall", title: "Første hele case, og hoderegningen som bærer den",
      chapters: [], estMinutes: 60,
      goals: [
        "Kjøre en hel lønnsomhetscase fra prompt til anbefaling, på tid",
        "Regne prosentpoeng mot riktig grunnlag, uten å miste en tierpotens",
        "Si framgangsmåten høyt før tallet, og oppgi enhet hver gang",
      ],
      keyConcepts: ["Profitt-tre", "Prosentpoeng", "Dekningsbidrag", "Nullpunkt", "Sanity-sjekk"],
    },
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
