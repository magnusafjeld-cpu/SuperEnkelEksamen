#!/usr/bin/env node
/* Kontroll av eksamenstreningen (EDU_DATA.trening) i fag/<fag>/trening.js.

   Byggeren (tools/bygg-trening.py) har alt sjekket at hvert spørsmål har fire
   alternativer, nøyaktig ett riktig og ingen like. Denne kontrollen ser på det
   byggeren ikke ser:

   FEIL
   - struktur: unik id, kjent tema, answer 0–3, traps med null nøyaktig på fasiten
   - HTML: lovlige tagger, alle lukket, ingen script eller lenker ut
   - tankestrek (—) og komma foran «og», som Magnus' skriveregler forbyr
   - «alternativ B», «svar C», «(A)» i fasittekstene: rekkefølgen stokkes ved
     bygging, så en bokstav i teksten peker på feil alternativ
   - «oppgaven over», «forrige oppgave»: spørsmålene trekkes tilfeldig (fallgruve 7v)
   - samme spørsmålstekst to ganger

   - et spørsmål uten hjelp, eller en hjelp som røper svaret: et tall fra
     alternativene, et stort tall eller et desimaltall fra spørsmålet, eller
     teksten i det riktige alternativet. Kursets faste satser (22 %, 1,72 …) er lov.

   ADVARSEL
   - et tema med færre spørsmål enn målet i temaer.py
   - fasiten samlet på én posisjon, i hele banken eller i én familie
   - fasiten som lengste tekstalternativ i over 40 % av begrepsspørsmålene (fallgruve 7y)
   - en kort fasit som er lengre enn 90 ord, eller en full gjennomgang under 60 ord

   Bruk:  node tools/sjekk-trening.js fie432
          node tools/sjekk-trening.js fie432 --fil fag/fie432/_trening/_utkast-aksjonar.js
*/
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const fag = args[0];
if (!fag) { console.error("Bruk: node tools/sjekk-trening.js <fag> [--fil <sti>]"); process.exit(2); }
const rot = path.join(__dirname, "..");
const fil = args.includes("--fil") ? path.resolve(args[args.indexOf("--fil") + 1]) : path.join(rot, "fag", fag, "trening.js");
if (!fs.existsSync(fil)) { console.error(`fant ikke ${fil}`); process.exit(2); }
global.window = { EDU_DATA: {} };
eval(fs.readFileSync(fil, "utf8"));
const T = window.EDU_DATA.trening;
if (!T) { console.error("fila setter ikke EDU_DATA.trening"); process.exit(2); }

const feil = [], advarsel = [];
const temaer = new Map((T.temaer || []).map((t) => [t.id, t]));
const ALLE = T.sporsmal || [];

/* ---------- tekst ---------- */
const ren = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
const ord = (s) => { const t = ren(s); return t ? t.split(" ").length : 0; };

const LOVLIGE = new Set(["p", "b", "i", "em", "strong", "sub", "sup", "br", "ul", "ol", "li", "table", "thead", "tbody",
  "tr", "th", "td", "span", "div", "code"]);
const TOMME = new Set(["br"]);
const KLASSER = new Set(["data", "n", "formula", "eq", "where", "callout", "mech", "tip", "warn", "h", "worked", "wh"]);
function sjekkHtml(html, hvor) {
  if (/<(?![a-zA-Z\/!])/.test(html)) feil.push(`${hvor}: rå «<» i teksten. Skriv &lt;`);
  const stabel = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  for (let m; (m = re.exec(html));) {
    const navn = m[2].toLowerCase();
    if (!LOVLIGE.has(navn)) { feil.push(`${hvor}: ulovlig tagg <${navn}>`); continue; }
    if (m[1]) {
      const topp = stabel.pop();
      if (topp !== navn) { feil.push(`${hvor}: </${navn}> lukker ${topp ? "<" + topp + ">" : "ingenting"}`); if (topp) stabel.push(topp); }
      continue;
    }
    if (TOMME.has(navn) || m[4]) continue;
    stabel.push(navn);
    const k = /class="([^"]*)"/.exec(m[3] || "");
    if (k) for (const c of k[1].split(/\s+/).filter(Boolean)) if (!KLASSER.has(c)) advarsel.push(`${hvor}: ukjent klasse «${c}»`);
    if (/\son[a-z]+=|href=|src=/i.test(m[3] || "")) feil.push(`${hvor}: attributtet i <${navn}> er ikke lov`);
  }
  if (stabel.length) feil.push(`${hvor}: aldri lukket: ${stabel.map((n) => "<" + n + ">").join(" ")}`);
}

const BOKSTAV = /\b(alternativ(?:et)?|svar(?:et)?|svaralternativ(?:et)?)\s+[A-D]\b|\(\s*[A-D]\s*\)|\b[A-D]\s+er\s+(?:riktig|feil)\b/;
const HENVISNING = /\b(oppgaven over|forrige oppgave|forrige spørsmål|spørsmålet over|samme person som|samme selskap som)\b/i;
/* Til språksjekken fjernes inline-taggene uten mellomrom: «r<sub>e</sub>, og»
   ble ellers «r e , og», og kommaet foran «og» slapp gjennom. */
const renSpråk = (s) => String(s || "").replace(/<\/?(sub|sup|b|i|em|strong|span|code)\b[^>]*>/g, "")
  .replace(/<[^>]+>/g, " ").replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
function sjekkSpråk(tekst, hvor, { fasit = false } = {}) {
  const t = renSpråk(tekst);
  if (/—/.test(t)) feil.push(`${hvor}: tankestrek (—). Bruk komma, kolon eller ny setning`);
  const ogKomma = t.match(/[^\s,]+, og\b/g);
  if (ogKomma) feil.push(`${hvor}: komma foran «og»: «${ogKomma[0]}»`);
  if (fasit && BOKSTAV.test(t)) feil.push(`${hvor}: viser til et alternativ med bokstav («${t.match(BOKSTAV)[0]}»). Rekkefølgen stokkes`);
  if (HENVISNING.test(t)) feil.push(`${hvor}: viser til et annet spørsmål («${t.match(HENVISNING)[0]}»). Spørsmålene trekkes tilfeldig`);
}

/* Kursets faste satser og konstanter. De er regler, ikke svar, og kan stå i en
   hjelp selv om de også står i spørsmålet. */
const FASTE = new Set(["22", "1,72", "37,84", "51,52", "47,4", "18,1", "7,1", "12", "0,66", "3", "1,0", "1,1",
  "1,6", "1,44", "25", "70", "80", "75", "14", "20", "100", "90", "5", "7", "2", "10", "60", "30", "2,5", "29,6", "7,6",
  "0", "1", "50", "0,5", "40", "62", "67", "183", "270", "36", "4", "6", "8", "9", "15", "27", "33", "3,0"]);

/* ---------- per spørsmål ---------- */
const ider = new Set(), qTekst = new Map();
const pos = [0, 0, 0, 0];
const perFam = new Map(), perTema = new Map();
let tekstSp = 0, lengst = 0;
for (const s of ALLE) {
  const hvor = s.id || "(uten id)";
  if (!s.id) feil.push("et spørsmål mangler id");
  else if (ider.has(s.id)) feil.push(`${hvor}: id brukt to ganger`);
  ider.add(s.id);
  if (!temaer.has(s.tema)) feil.push(`${hvor}: ukjent tema «${s.tema}»`);
  perTema.set(s.tema, (perTema.get(s.tema) || 0) + 1);
  if (!Array.isArray(s.options) || s.options.length !== 4) { feil.push(`${hvor}: må ha fire alternativer`); continue; }
  if (!(Number.isInteger(s.answer) && s.answer >= 0 && s.answer < 4)) { feil.push(`${hvor}: answer utenfor 0–3`); continue; }
  if (!Array.isArray(s.traps) || s.traps.length !== 4) feil.push(`${hvor}: traps må ha fire plasser`);
  else s.traps.forEach((t, i) => {
    if (i === s.answer && t != null) feil.push(`${hvor}: traps[${i}] skal være null, det er fasiten`);
    if (i !== s.answer && !String(t || "").trim()) feil.push(`${hvor}: traps[${i}] mangler forklaring av det gale alternativet`);
  });
  pos[s.answer]++;
  if (s.fam) { const f = perFam.get(s.fam) || [0, 0, 0, 0]; f[s.answer]++; perFam.set(s.fam, f); }

  sjekkHtml(s.q || "", hvor + ".q");
  sjekkHtml(s.kort || "", hvor + ".kort");
  sjekkHtml(s.full || "", hvor + ".full");
  s.options.forEach((o, i) => sjekkHtml(String(o), `${hvor}.options[${i}]`));
  (s.traps || []).forEach((t, i) => t && sjekkHtml(String(t), `${hvor}.traps[${i}]`));

  sjekkSpråk(s.q, hvor + ".q");
  sjekkSpråk(s.kort, hvor + ".kort", { fasit: true });
  sjekkSpråk(s.full, hvor + ".full", { fasit: true });
  s.options.forEach((o, i) => sjekkSpråk(o, `${hvor}.options[${i}]`));
  (s.traps || []).forEach((t, i) => t && sjekkSpråk(t, `${hvor}.traps[${i}]`, { fasit: true }));

  /* Hjelpen: fremgangsmåten uten spørsmålets tall og uten svaret. */
  if (!String(s.hjelp || "").trim()) feil.push(`${hvor}: mangler hjelp`);
  else {
    sjekkHtml(s.hjelp, hvor + ".hjelp");
    sjekkSpråk(s.hjelp, hvor + ".hjelp", { fasit: true });
    const h = " " + renSpråk(s.hjelp).replace(/\u00a0/g, " ") + " ";
    const tallI = (t) => (renSpråk(t).replace(/\u00a0/g, " ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []);
    const fritt = (t) => FASTE.has(t);
    const finnes = (t) => new RegExp("(^|[^\\d,])" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\d,])").test(h);
    const fraAlt = new Set(s.options.flatMap(tallI).filter((t) => !fritt(t) && t.replace(/\D/g, "").length >= 2));
    const fraQ = new Set(tallI(s.q).filter((t) => !fritt(t) && (t.replace(/\D/g, "").length >= 4 || t.includes(","))));
    const lekk = [...new Set([...fraAlt, ...fraQ])].filter(finnes);
    if (lekk.length) feil.push(`${hvor}.hjelp: inneholder tall fra spørsmålet eller alternativene (${lekk.slice(0, 4).join(", ")})`);
    const riktig = ren(s.options[s.answer]).toLowerCase();
    if (riktig.length >= 18 && ren(s.hjelp).toLowerCase().includes(riktig)) feil.push(`${hvor}.hjelp: gjengir det riktige alternativet`);
  }

  if (ord(s.kort) > 90) advarsel.push(`${hvor}: kort fasit er ${ord(s.kort)} ord. Den skal være kort`);
  if (ord(s.full) < 60) advarsel.push(`${hvor}: full gjennomgang er bare ${ord(s.full)} ord`);

  const nq = ren(s.q).toLowerCase();
  if (qTekst.has(nq)) feil.push(`${hvor}: samme spørsmålstekst som ${qTekst.get(nq)}`);
  qTekst.set(nq, s.id);

  /* Fallgruve 7y: fasiten skal ikke være det lengste alternativet i hvert
     begrepsspørsmål. Tall teller ikke; der er lengden tilfeldig. */
  const erTall = s.options.every((o) => /^[\s\d.,−\-+%krmill ()/:=]+$/i.test(ren(o)));
  if (!erTall) {
    tekstSp++;
    const l = s.options.map((o) => ren(o).length);
    if (l[s.answer] === Math.max(...l) && l.filter((x) => x === l[s.answer]).length === 1) lengst++;
  }
}

/* ---------- hurtiginnføringen per tema ---------- */
for (const [id, t] of temaer) {
  const i = t.intro;
  if (!i) { advarsel.push(`tema ${id}: mangler hurtiginnføring (intro)`); continue; }
  if (!(i.tester || []).length) feil.push(`tema ${id}: intro.tester er tom`);
  if (!(i.formler || []).length) feil.push(`tema ${id}: intro.formler er tom`);
  const tekster = [...(i.tester || []).map((x, n) => [x, `tester[${n}]`]),
    ...(i.formler || []).flatMap(([f, h], n) => [[f, `formler[${n}]`], [h || "", `formler[${n}].forklaring`]]),
    ...(i.feller || []).map((x, n) => [x, `feller[${n}]`])];
  tekster.forEach(([x, hvor]) => { sjekkHtml(String(x), `tema ${id}.intro.${hvor}`); sjekkSpråk(String(x), `tema ${id}.intro.${hvor}`, { fasit: true }); });
}

/* ---------- banken ---------- */
for (const [id, t] of temaer) {
  const n = perTema.get(id) || 0;
  if (t.mal && n < t.mal) advarsel.push(`tema ${id}: ${n} spørsmål, målet er ${t.mal}`);
}
const n = ALLE.length || 1;
if (Math.max(...pos) / n > 0.32 && n >= 40) advarsel.push(`fasitposisjonene er skjeve: ${pos.join("/")}`);
for (const [fam, f] of perFam) {
  const sum = f.reduce((a, b) => a + b, 0);
  if (sum >= 4 && Math.max(...f) / sum > 0.6) advarsel.push(`familie ${fam}: fasiten står på samme plass i ${Math.max(...f)} av ${sum} varianter (${f.join("/")})`);
}
if (tekstSp >= 10 && lengst / tekstSp > 0.4) advarsel.push(`fasiten er det lengste alternativet i ${lengst} av ${tekstSp} tekstspørsmål (${Math.round(100 * lengst / tekstSp)} %). Fallgruve 7y`);

console.log(`  ${ALLE.length} spørsmål · ${temaer.size} temaer · ${perFam.size} familier · fasit A–D ${pos.join("/")}`);
console.log(`  fasiten er lengst i ${lengst} av ${tekstSp} tekstspørsmål`);
for (const [id, t] of temaer) console.log(`    ${id.padEnd(17)} ${String(perTema.get(id) || 0).padStart(4)} / ${t.mal || "–"}`);
const vis = (liste, merke, maks) => {
  liste.slice(0, maks).forEach((x) => console.log(`${merke} ${x}`));
  if (liste.length > maks) console.log(`${merke} … og ${liste.length - maks} til`);
};
vis(advarsel, "ADVARSEL", 60);
vis(feil, "FEIL", 200);
console.log(feil.length ? `\n${feil.length} feil.` : "\nIngen feil.");
process.exit(feil.length ? 1 : 0);
