#!/usr/bin/env node
/* Strukturkontroll for casebiblioteket.

   Motoren feiler aldri høylytt på en case som mangler et felt — den tegner bare
   et trinn uten spørsmål, eller et regnetrinn som ikke kan sjekkes. Denne
   kontrollen fanger det før casen legges ut.

   Bruk:  node tools/case-sjekk-caser.js [fil.js …]
   Uten argumenter sjekkes fag/case/caser.js.                                   */

const fs = require("fs");
const path = require("path");

const ARTER = ["oppklaring", "struktur", "exhibit", "regne", "ide", "syntese"];
const TYPER = ["Lønnsomhet", "Markedsinngang", "M&A", "Prising", "Vekst",
  "Operations", "Estimering", "Offentlig", "Kostnadskutt", "Turnaround",
  "Ny lansering", "PE-vurdering", "Konkurrentrespons"];
const NIVÅ = ["Intro", "Middels", "Avansert"];
const STIL = ["candidate-led", "interviewer-led"];

const filer = process.argv.slice(2);
if (!filer.length) filer.push(path.join(__dirname, "..", "fag", "case", "caser.js"));

global.window = { EDU_DATA: {} };
for (const f of filer) require(path.resolve(f));

/* Samle alt som ble lagt på EDU_DATA — caser.js bruker `cases`, mellomlagrings-
   filene sine egne nøkler. Alle arrays med `trinn` regnes som caser. */
const caser = [];
for (const [nøkkel, verdi] of Object.entries(window.EDU_DATA)) {
  if (Array.isArray(verdi) && verdi.every((c) => c && c.trinn)) {
    verdi.forEach((c) => caser.push({ kilde: nøkkel, c }));
  }
}

const feil = [];
const advarsel = [];
const sett = new Map();
const HTML = /<[a-zA-Z/!]/;

const si = (liste, id, melding) => liste.push(`${id}: ${melding}`);

for (const { kilde, c } of caser) {
  const id = c.id || "(uten id)";
  if (sett.has(c.id)) si(feil, id, `duplisert id — også i ${sett.get(c.id)}`);
  sett.set(c.id, kilde);

  for (const felt of ["id", "label", "type", "nivå", "stil", "blurb", "prompt", "bakgrunn"]) {
    if (!c[felt]) si(feil, id, `mangler ${felt}`);
  }
  if (c.type && !TYPER.includes(c.type)) si(feil, id, `ukjent type «${c.type}»`);
  if (c.nivå && !NIVÅ.includes(c.nivå)) si(feil, id, `ukjent nivå «${c.nivå}»`);
  if (c.stil && !STIL.includes(c.stil)) si(feil, id, `ukjent stil «${c.stil}»`);
  if (typeof c.minutter !== "number") si(feil, id, "minutter må være et tall");
  if (!Array.isArray(c.ch)) si(feil, id, "ch må være en liste");
  if (c.blurb && HTML.test(c.blurb)) si(feil, id, "blurb inneholder markup — feltet escapes");
  if (c.kategori && c.kategori !== "Market sizing") si(advarsel, id, `uventet kategori «${c.kategori}»`);
  if (c.kategori === "Market sizing" && c.type !== "Estimering") si(advarsel, id, "market sizing uten type Estimering");

  /* Intervjucasene følger den faste seksdelte rekkefølgen. Market sizing er en
     annen sjanger — der er tre regnetrinn på rad selve poenget — så der kreves
     bare at arten finnes, at casen åpner med oppklaring og ender i syntese. */
  const t = c.trinn || [];
  const rekke = t.map((x) => x.art).join(" → ");
  const ukjent = t.map((x) => x.art).filter((a) => !ARTER.includes(a));
  if (ukjent.length) si(feil, id, `ukjent trinnart «${ukjent[0]}»`);
  else if (!c.kategori) {
    if (rekke !== ARTER.join(" → ")) si(feil, id, `trinnrekkefølge er «${rekke}»`);
  } else if (t.length < 5 || t[0].art !== "oppklaring" || t[t.length - 1].art !== "syntese") {
    si(feil, id, `trinnrekkefølge er «${rekke}»`);
  }

  t.forEach((x, i) => {
    const merke = `${id} trinn ${i + 1} (${x.art})`;
    if (!x.sp) si(feil, merke, "mangler sp");
    if (!x.fasit) si(feil, merke, "mangler fasit");
    if (!Array.isArray(x.krav) || x.krav.length < 4) si(feil, merke, "krav må ha minst 4 punkter");
    (x.krav || []).forEach((k, n) => { if (HTML.test(k)) si(feil, merke, `krav ${n + 1} inneholder markup`); });
    if (!x.felle) si(feil, merke, "mangler felle");
    if (x.felle && HTML.test(x.felle)) si(feil, merke, "felle inneholder markup");
    if (x.kort && x.kort.length > 13) si(feil, merke, `kort er ${x.kort.length} tegn`);
    if (x.sek != null && (typeof x.sek !== "number" || x.sek < 20)) si(feil, merke, "sek er urimelig");

    if (x.art === "exhibit") {
      if (!x.figur) si(feil, merke, "exhibit uten figur");
      else if (!/<table class="data"/.test(x.figur)) si(advarsel, merke, "figur uten table.data");
    }
    if (x.art === "regne") {
      if (typeof x.svar !== "number" || !isFinite(x.svar)) si(feil, merke, "svar må være et tall");
      if (!x.enhet) si(feil, merke, "regnetrinn uten enhet");
      /* Et estimat skal godkjennes på størrelsesorden, et regnestykke i en
         intervjucase på tallet. Derfor to takhøyder. */
      const tak = c.kategori === "Market sizing" ? 0.3 : 0.05;
      if (x.toleranse != null && (x.toleranse <= 0 || x.toleranse > tak)) si(feil, merke, `toleranse ${x.toleranse} er over taket på ${tak}`);
    }
    if (x.art === "ide") {
      const n = (x.liste || []).length;
      if (n < 10) si(feil, merke, `idélisten har ${n} punkter, minst 10 kreves`);
      (x.liste || []).forEach((l, k) => { if (HTML.test(l)) si(feil, merke, `idé ${k + 1} inneholder markup`); });
    }
  });
}

/* ---------- rapport ---------- */
const intervju = caser.filter((x) => !x.c.kategori).length;
console.log(`${caser.length} caser lastet — ${intervju} intervjucaser, ${caser.length - intervju} market sizing`);

const fordeling = (velg) => {
  const m = new Map();
  caser.forEach((x) => m.set(velg(x.c), (m.get(velg(x.c)) || 0) + 1));
  return [...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(" · ");
};
console.log("Type:  " + fordeling((c) => c.type));
console.log("Nivå:  " + fordeling((c) => c.nivå));
console.log("Stil:  " + fordeling((c) => c.stil));

if (advarsel.length) {
  console.log(`\n${advarsel.length} advarsler:`);
  advarsel.forEach((a) => console.log("  ~ " + a));
}
if (feil.length) {
  console.log(`\n${feil.length} feil:`);
  feil.forEach((f) => console.log("  ✗ " + f));
  process.exit(1);
}
console.log("\nIngen feil.");
