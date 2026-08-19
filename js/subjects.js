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
    modules: null,
  },
];

/* Oppslag + valgt fag. window.EDU_SUBJECT settes av js/picker.js ved oppstart. */
window.EDU_SUBJECT = null;
window.EDU_SUBJECT_BY_ID = function (id) { return (window.EDU_SUBJECTS || []).find((s) => s.id === id) || null; };
