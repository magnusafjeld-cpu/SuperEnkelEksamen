/* ===================== <FAG> · FAGDATA (MAL) =====================
   Kopier denne mappen til fag/<ditt-fag>/ og fyll ut. Alt er valgfritt bortsett
   fra "plan" — slår du av en modul i js/subjects.js (feltet "modules"), trenger
   du ikke fylle ut dataene den bruker.

   Selve pensumteksten skrives IKKE her. Den parses fra fagets HTML-manual, som
   må følge samme struktur som SAM3_Eksamensmanual.html: ett <section id="kN">
   per kapittel, med <h2 class="chap">N · Tittel</h2>, <h3>N.M Tittel</h3> som
   direkte barn, og boksene .callout.mech / .tip / .mistake / .link / .warn.
   ================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

/* ---------- studieplan (brukes av Dashboard, Studieplan og Repetisjon) ----------
   startDate styrer hvilken dag appen mener det er i dag. chapters peker på
   kapittelnumrene i pensum-manualen. */
window.EDU_DATA.plan = {
  /* mode: "dates" (default) følger kalenderen fra startDate. "modules" er for
     selvpasede fag: «i dag» er første ufullførte modul, og dato/ukedag droppes. */
  mode: "dates",
  startDate: "2026-01-06", totalDays: 14,
  examNote: "4 timer · skriftlig skoleeksamen",
  days: [
    { day: 1, date: "2026-01-06", weekday: "Tirsdag", phase: "Grunnlag",
      title: "Kort tittel på dagen", chapters: [0, 1], estMinutes: 150,
      goals: ["Hva du skal kunne etter dagen", "Ett mål til"],
      keyConcepts: ["Sentralt begrep", "Enda ett"],
      review: [],                 // kapitler som repeteres denne dagen
      examFocus: null,            // f.eks. "Oppgave 1"
      pastExam: null,             // { exam, task, topic } — ren visning, ingen kobling
      milestone: "Del 1 fullført",
      tip: "Én konkret oppfordring for dagen." },
  ],
};

/* ---------- quiz ----------
   type: "mcq" (options + answer = indeks) eller "num" (answer = tall).
   ch = kapittelnummer, oppg = hvilken eksamensoppgave spørsmålet hører til. */
window.EDU_DATA.quizzes = [
  // { id:"q1", ch:1, oppg:0, type:"mcq", q:"Spørsmålet?",
  //   options:["Alternativ A","Alternativ B"], answer:1, explanation:"Hvorfor B er riktig." },
  // { id:"q2", ch:1, oppg:0, type:"short", q:"Forklar kort …", model:["Punkt 1","Punkt 2"] },
  //   type "short" KREVER model:[…] — visningen krasjer uten.
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

/* ---------- tidligere eksamener (modulen /exam) ----------
   format-feltene duration, tasks, weights og keyInsight leses uten guard — er
   modulen på, må de finnes. */
window.EDU_DATA.exams = {
  format: { duration: "4 timer", tasks: 3, weights: [], keyInsight: "" },
  tasks: [
    // { id:"v25-1", exam:"V25", task:"Oppgave 1", topic:"…", desc:"…",
    //   chapters:[2,3], oppg:1, recommendDay:3,
    //   modelAnswer:{ ch:21, label:"…" }, reviewIfWrong:[2,3], tests:["…"] },
  ],
};

/* ---------- eksamenssett (modulen /sett) ----------
   Hele sett som kan kjøres i øvingsmodus eller på tid. Legges normalt i en egen
   fil, fag/<fag>/sett.js. Utelates feltet, skjules modulen. */
// window.EDU_DATA.sets = [
//   { id:"h2025", label:"Høsten 2025", date:"2025-12-08", minutes:180, points:100,
//     format:"6 oppgaver", note:"…",
//     exercises:[{ n:1, title:"…", points:12, topic:"…", chapters:[23],
//       body:"<p>Oppgaveteksten som HTML.</p>",
//       parts:[{ label:"a", points:4, body:"<p>…</p>", solution:"<p>…</p>", criteria:["…"] }] }] },
// ];

/* ---------- ordliste (Søk) ---------- */
window.EDU_DATA.glossary = {
  economists: [],   // { name, note, chapters:[..] }
  symbols: [],      // { sym, name, note }
};

/* ---------- lynlæring (minispill) ----------
   Slå av modulen "/lyn" i js/subjects.js hvis du ikke fyller ut dette. */
window.EDU_DATA.lyn = {
  tf: [],       // { s:"Påstand", answer:true, why:"Begrunnelse", ch:1 }  — min. 10
  shift: [],    // { q:"Spørsmål", options:[...], answer:0, why:"...", ch:1 } — min. 10
  chains: [],   // { title:"Mekanisme", steps:["Steg 1","Steg 2"], why:"…", ch:1 } — min. 3
  updown: [],   // { q:"Hva skjer med X?", dir:"opp"|"ned", why:"...", ch:1 } — min. 10
  hode: [],     // { q:"…", correct:"5 %", distractors:["…","…","…"], why:"…" } — min. 8
                //   (eller ferdig satt: { q, options:[…], answer:idx, why })
};

/* ---------- dybdetrening (selvrettede spørsmålsbanker) ----------
   Én bank per nøkkel. Nøklene og etikettene deres settes i js/subjects.js
   (feltet dybdeBanks) — uten det får faget SAM3s banker.
   cats = temafilter, lvl = nivåene, items = spørsmålene
   ({ n:nivå, k:tema, s:spørsmål (escapes), f:fasit (RÅ HTML), id:unik heltall }).
   Slå av modulen "/dybde" i js/subjects.js hvis du ikke fyller ut dette. */
window.EDU_DATA.dybde = {
  // kort: { cats:["Tema A"], lvl:{ "1":["Nivå 1","Grunnbegreper"] },
  //         items:[{ n:1, k:"Tema A", s:"Spørsmål?", f:"Fasit med <b>HTML</b>.", id:0 }] },
};
