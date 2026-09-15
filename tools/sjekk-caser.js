#!/usr/bin/env node
/* Strukturkontroll for casebiblioteket.

   Casene svikter stille. Et trinn med ukjent `art` får ingen ledetekst, et
   regne-trinn uten `svar` kan ikke rettes, og en `fasit` med rå < spiser resten
   av avsnittet. Ingenting av det gir feilmelding — det ser bare litt tomt ut.

   Bruk:  node tools/sjekk-caser.js                 # alle casefiler for faget
          node tools/sjekk-caser.js fag/case/caser-eyp.js
*/
const fs = require("fs");
const path = require("path");
const ROT = path.join(__dirname, "..");

const ARTER = new Set(["oppklaring", "struktur", "exhibit", "regne", "ide", "syntese"]);
const HTML_TAGG = /<\/?[a-zA-Z][^>]*>/;

function last(filer) {
  const w = { EDU_DATA: { cases: [] } };
  global.window = w;
  for (const f of filer) {
    const p = path.isAbsolute(f) ? f : path.join(ROT, f);
    if (!fs.existsSync(p)) { console.error("fant ikke " + f); process.exit(2); }
    delete require.cache[require.resolve(p)];
    require(p);
  }
  return w.EDU_DATA;
}

function sjekk(D) {
  const feil = [], advarsel = [], notat = [];
  const ids = new Set();
  const caser = D.cases || [];

  for (const c of caser) {
    const hvor = `case ${c.id || "(uten id)"}`;
    if (!c.id) feil.push("en case mangler id — id-en er lagringsnøkkel for fremdrift");
    else if (ids.has(c.id)) feil.push(`${hvor}: duplisert id`);
    ids.add(c.id);

    ["label", "type", "nivå", "prompt"].forEach((f) => { if (!c[f]) feil.push(`${hvor}: mangler ${f}`); });
    if (typeof c.minutter !== "number") feil.push(`${hvor}: minutter må være et tall`);
    if (!Array.isArray(c.ch)) advarsel.push(`${hvor}: ch bør være en liste (tom er greit)`);

    const trinn = c.trinn || [];
    if (!trinn.length) { feil.push(`${hvor}: ingen trinn`); continue; }

    let harRegne = false, harSyntese = false;
    trinn.forEach((t, i) => {
      const th = `${hvor} trinn ${i + 1}`;
      if (!ARTER.has(t.art)) feil.push(`${th}: ukjent art «${t.art}» — visningen får ingen ledetekst`);
      if (t.art === "regne") {
        harRegne = true;
        if (t.svar == null) feil.push(`${th}: regne-trinn uten svar kan ikke rettes`);
        if (!t.enhet) advarsel.push(`${th}: regne-trinn uten enhet — tallsjekken blir strengere enn nødvendig`);
        if (t.toleranse != null && (t.toleranse < 0 || t.toleranse > 0.25))
          feil.push(`${th}: toleranse ${t.toleranse} er utenfor 0–0,25`);
      }
      if (t.art === "syntese") harSyntese = true;
      if (t.art === "ide" && !(t.liste || []).length)
        advarsel.push(`${th}: ide-trinn uten liste får selvvurdering i stedet for avkryssing`);
      if (!t.sp) feil.push(`${th}: mangler spørsmål (sp)`);
      if (!t.fasit) feil.push(`${th}: mangler fasit`);
      if (typeof t.sek !== "number") advarsel.push(`${th}: mangler sek — trinnet får ingen klokke`);
      /* krav er det som skiller et sterkt svar fra et middels. Uten det er
         fasiten bare et svar, og casen mister halve poenget. */
      if (!(t.krav || []).length) advarsel.push(`${th}: ingen krav-punkter`);
      (t.krav || []).forEach((k, n) => { if (HTML_TAGG.test(k)) feil.push(`${th}: krav ${n + 1} inneholder markup — feltet escapes`); });
      if (t.felle && HTML_TAGG.test(t.felle)) feil.push(`${th}: felle inneholder markup — feltet escapes`);
    });
    if (!harRegne) advarsel.push(`${hvor}: ingen regne-trinn`);
    if (!harSyntese) advarsel.push(`${hvor}: ingen syntese-trinn — casen ender uten anbefaling`);

    /* I enkeltmodus spilles ikke trinnene hver for seg, og trinnklokkene brukes
       ikke — hele casen måles mot `minutter`. Da er det meningsløst å summere dem. */
    if (c.format !== "ett-spørsmål") {
      const sum = trinn.reduce((a, t) => a + (t.sek || 0), 0);
      if (c.minutter && sum > c.minutter * 60 * 1.15)
        advarsel.push(`${hvor}: trinnene summerer til ${Math.round(sum / 60)} min, men casen er satt til ${c.minutter}`);
    }
  }

  /* Kategoriene må ha en introtekst, ellers står bolken naken i biblioteket. */
  const kategorier = [...new Set(caser.map((c) => c.kategori).filter(Boolean))];
  const intro = D.caseKategorier || {};
  kategorier.forEach((k) => { if (!intro[k]) advarsel.push(`kategorien «${k}» mangler tekst i caseKategorier`); });

  notat.push(`  ${caser.length} caser · ${kategorier.length ? kategorier.join(" · ") : "ingen kategori"}`);
  const pertype = {};
  caser.forEach((c) => { pertype[c.type] = (pertype[c.type] || 0) + 1; });
  notat.push("  typer: " + Object.entries(pertype).map(([k, v]) => `${k} ${v}`).join(" · "));
  const pernivå = {};
  caser.forEach((c) => { pernivå[c.nivå] = (pernivå[c.nivå] || 0) + 1; });
  notat.push("  nivå: " + Object.entries(pernivå).map(([k, v]) => `${k} ${v}`).join(" · "));
  notat.push(`  trinn i alt: ${caser.reduce((a, c) => a + (c.trinn || []).length, 0)}`);

  return { feil, advarsel, notat };
}

const arg = process.argv.slice(2);
const filer = arg.length ? arg : ["fag/case/caser.js", "fag/case/caser-eyp.js"].filter((f) => fs.existsSync(path.join(ROT, f)));
const { feil, advarsel, notat } = sjekk(last(filer));
console.log("=".repeat(72));
console.log(filer.join(" + "));
notat.forEach((n) => console.log(n));
if (advarsel.length) {
  console.log(`\n  ${advarsel.length} advarsler:`);
  advarsel.slice(0, 25).forEach((a) => console.log("    ~ " + a));
  if (advarsel.length > 25) console.log(`    … og ${advarsel.length - 25} til`);
}
if (feil.length) {
  console.log(`\n  ${feil.length} feil:`);
  feil.slice(0, 30).forEach((f) => console.log("    ✗ " + f));
  process.exit(1);
}
console.log("\n  Ingen feil.");
