/* ===================== <FAG> · FAGDATA (MAL) =====================
   Kopier denne mappen til fag/<ditt-fag>/ og fyll ut. Alt er valgfritt bortsett
   fra "plan" — slår du av en modul i js/subjects.js (feltet "modules"), trenger
   du ikke fylle ut dataene den bruker.

   Selve pensumteksten skrives IKKE her. Den parses fra fagets HTML-manual, som
   må følge samme struktur som SAM3_Eksamensmanual.html: kapitler i
   <div class="chap" id="k0">, med <h2>-overskrifter og boksene mekanisme /
   eksamenstips / vanlig feil / sammenheng.
   ================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

/* ---------- studieplan (brukes av Dashboard, Studieplan og Repetisjon) ----------
   startDate styrer hvilken dag appen mener det er i dag. chapters peker på
   kapittelnumrene i pensum-manualen. */
window.EDU_DATA.plan = {
  startDate: "2026-01-06", totalDays: 14,
  examNote: "4 timer · skriftlig skoleeksamen",
  days: [
    { day: 1, date: "2026-01-06", weekday: "Tirsdag", phase: "Grunnlag",
      title: "Kort tittel på dagen", chapters: [0, 1], estMinutes: 150,
      goals: ["Hva du skal kunne etter dagen", "Ett mål til"],
      keyConcepts: ["Sentralt begrep", "Enda ett"],
      review: [],                 // kapitler som repeteres denne dagen
      examFocus: null,            // f.eks. "Oppgave 1"
      pastExam: null,             // nøkkel inn i EDU_DATA.exams
      milestone: "Del 1 fullført",
      tip: "Én konkret oppfordring for dagen." },
  ],
};

/* ---------- quiz ----------
   type: "mcq" (options + answer = indeks) eller "num" (answer = tall).
   ch = kapittelnummer, oppg = hvilken eksamensoppgave spørsmålet hører til. */
window.EDU_DATA.quizzes = [
  // { id:"q1", ch:1, oppg:0, type:"mcq", q:"Spørsmålet?",
  //   options:["Alternativ A","Alternativ B"], answer:1, why:"Hvorfor B er riktig." },
];

/* ---------- flashcards (spaced repetition) ----------
   deck grupperer kortene, f.eks. "begrep", "formel", "modell". */
window.EDU_DATA.flashcards = [
  // { id:"f1", ch:1, deck:"begrep", front:"Begrepet", back:"Forklaringen." },
];

/* ---------- aktiv læring: oppgaver som dukker opp etter hvert kapittel ----------
   Nøkkelen er kapittelnummeret. type: "control" | "calc" | "reflect" | "explain". */
window.EDU_DATA.activeLearning = {
  // 1: [{ type:"control", q:"Kontrollspørsmål?", solution:"Fasit." }],
};

/* ---------- tidligere eksamener ---------- */
window.EDU_DATA.exams = {
  format: { duration: "4 timer", tasks: 3, note: "", weights: [] },
  // sets: [{ id:"V25", label:"Vår 2025", tasks:[...] }],
};

/* ---------- ordliste (Søk) ---------- */
window.EDU_DATA.glossary = {
  economists: [],   // { name, note, chapters:[..] }
  symbols: [],      // { sym, name, note }
};

/* ---------- lynlæring (minispill) ----------
   Slå av modulen "/lyn" i js/subjects.js hvis du ikke fyller ut dette. */
window.EDU_DATA.lyn = {
  tf: [],       // { s:"Påstand", answer:true, why:"Begrunnelse" }
  shift: [],    // { q:"Spørsmål", options:[...], answer:0, why:"..." }
  chains: [],   // { title:"Mekanisme", steps:["Steg 1","Steg 2"] }
  updown: [],   // { q:"Hva skjer med X?", dir:"opp"|"ned", why:"..." }
};

/* ---------- dybdetrening (selvrettede spørsmålsbanker) ----------
   Én bank per nøkkel. cats = temafilter, lvl = nivåene, items = spørsmålene
   ({ n:nivå, k:tema, s:spørsmål, f:fasit (HTML), id:unik }).
   Slå av modulen "/dybde" i js/subjects.js hvis du ikke fyller ut dette. */
window.EDU_DATA.dybde = {
  // kort: { cats:["Tema A"], lvl:{ "1":["Nivå 1","Grunnbegreper"] },
  //         items:[{ n:1, k:"Tema A", s:"Spørsmål?", f:"Fasit med <b>HTML</b>.", id:0 }] },
};
