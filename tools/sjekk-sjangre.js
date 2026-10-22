#!/usr/bin/env node
/* Strukturkontroll for sjangertrening (EDU_DATA.sjangre).

   Motoren svikter stille på det meste: en answer utenfor rekkevidde gir en
   oppgave uten riktig svar, en duplisert id gjør at to steg deler fremdrift, og
   en traps-liste som ikke står parallelt med options viser feil forklaring på
   feil alternativ. Kontrollen fanger det, og sjekker skrivereglene.

   FEIL
   - id-er: sjangeren små bokstaver og bindestrek, stegene «<sjanger>-<n>» i rekkefølge, unike
   - mangler title, theory, q, solution eller check i et steg
   - ikke nøyaktig fire ulike alternativer, answer utenfor 0–3
   - traps uten fire plasser, ikke null på fasiten, eller tom på et galt alternativ
   - ulovlige eller ulukkede HTML-tagger, rå «<»
   - tankestrek (—), komma foran «and», alternativ omtalt med bokstav
   - fasitposisjon som ikke følger fag/<fag>/_sjangre/fasitplan.json
   - skjev fasitfordeling, eller fasiten oftest/aldri det lengste alternativet

   Bruk:  node tools/sjekk-sjangre.js fie402                          (alle fragmentene)
          node tools/sjekk-sjangre.js fag/fie402/_sjangre/01-tvilling.js  (ett eller flere)    */

const fs = require("fs");
const path = require("path");
const ROT = path.join(__dirname, "..");

const TOMME = new Set(["br", "hr", "img", "wbr"]);
const LOVLIGE = new Set(["p", "h4", "div", "span", "b", "i", "em", "strong", "sub", "sup", "ul", "ol", "li",
  "table", "thead", "tbody", "tr", "th", "td", "br", "code"]);
const INLINE = new Set(["b", "i", "em", "strong", "sub", "sup", "br", "span"]);
const KLASSER = new Set(["formula", "eq", "where", "worked", "wh", "callout", "tip", "warn", "mech", "h", "data", "n"]);

const ren = (s) => String(s || "").replace(/<\/?(sub|sup)>/g, "").replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
const ord = (s) => { const t = ren(s); return t ? t.split(" ").length : 0; };

function sjekkHtml(html, hvor, feil, advarsel, inline) {
  html = String(html || "");
  if (/<(?![a-zA-Z\/!])/.test(html)) feil.push(`${hvor}: rå «<» i teksten. Skriv &lt;`);
  const stabel = [];
  for (const m of html.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g)) {
    const navn = m[2].toLowerCase();
    if (!LOVLIGE.has(navn)) feil.push(`${hvor}: ulovlig tagg <${navn}>`);
    if (inline && !INLINE.has(navn)) feil.push(`${hvor}: bare b, i, sub, sup og br er lov her, fant <${navn}>`);
    if (m[1]) {
      const topp = stabel.pop();
      if (topp !== navn) { feil.push(`${hvor}: </${navn}> lukker ${topp ? "<" + topp + ">" : "ingenting"}`); if (topp) stabel.push(topp); }
      continue;
    }
    if (TOMME.has(navn) || m[4]) continue;
    stabel.push(navn);
    const k = /class="([^"]*)"/.exec(m[3] || "");
    if (k) k[1].split(/\s+/).filter(Boolean).forEach((c) => { if (!KLASSER.has(c)) advarsel.push(`${hvor}: ukjent klasse «${c}»`); });
  }
  if (stabel.length) feil.push(`${hvor}: aldri lukket: ${stabel.map((n) => "<" + n + ">").join(" ")}`);
}

/* Et talalternativ: et tall med enhet, valuta eller prosent, kort. */
const erTall = (o) => { const t = ren(o); return t.length <= 28 && /\d/.test(t) && !/[a-z]{4,}/i.test(t.replace(/\b(NOK|USD|EUR|mill|million|bn|per|share)\b/gi, "")); };

/* Engelsk (FIE402) og norsk (FIE432): «option B», «alternativ C», «svar D». */
const BOKSTAVREF = /\b([Oo]ption|[Aa]lternative|[Aa]nswer|[Cc]hoice|[Aa]lternativ(?:et)?|[Ss]var(?:et)?)\s*\(?[A-D]\)?(?![a-zA-ZæøåÆØÅ])|\([A-D]\)\s*(is|was|er|var)\b/;
function språk(tekst, hvor, feil) {
  const t = ren(tekst);
  if (/—/.test(t)) feil.push(`${hvor}: tankestrek (—)`);
  for (const m of t.matchAll(/[^\s,]+, and\b/g)) feil.push(`${hvor}: komma foran «and»: «${m[0]}»`);
  for (const m of t.matchAll(/[^\s,]+, og\b/g)) feil.push(`${hvor}: komma foran «og»: «${m[0]}»`);
}

function last(filer) {
  const w = { EDU_DATA: { sjangre: [] } };
  for (const f of filer) {
    try { new Function("window", fs.readFileSync(f, "utf8"))(w); }
    catch (e) { console.log(`FEIL  ${path.relative(ROT, f)}: lar seg ikke kjøre: ${e.message}`); process.exitCode = 1; }
  }
  return w.EDU_DATA.sjangre || [];
}

function main() {
  const arg = process.argv.slice(2);
  if (!arg.length) { console.log("Bruk: node tools/sjekk-sjangre.js <fag> | <fragment.js> …"); process.exit(1); }
  let filer, fag;
  if (arg[0].endsWith(".js")) {
    filer = arg.map((a) => path.resolve(a));
    const m = /fag\/([^/]+)\//.exec(filer[0]); fag = m ? m[1] : null;
  } else {
    fag = arg[0];
    const mappe = path.join(ROT, "fag", fag, "_sjangre");
    filer = fs.readdirSync(mappe).filter((f) => f.endsWith(".js")).sort().map((f) => path.join(mappe, f));
  }
  const planFil = fag ? path.join(ROT, "fag", fag, "_sjangre", "fasitplan.json") : null;
  const plan = planFil && fs.existsSync(planFil) ? JSON.parse(fs.readFileSync(planFil, "utf8")) : null;
  const alle = last(filer);
  const feil = [], advarsel = [], rader = [];
  const ider = new Set();
  const pos = [0, 0, 0, 0];
  let lengst = 0, antall = 0, tekststeg = 0;

  alle.forEach((g, gi) => {
    const hvor = g && g.id ? g.id : `sjanger ${gi}`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.id || "")) feil.push(`${hvor}: id må være små bokstaver, tall og bindestrek`);
    if (ider.has(g.id)) feil.push(`${hvor}: id brukt før`); ider.add(g.id);
    if (!Number.isInteger(g.num)) feil.push(`${hvor}: num må være et heltall`);
    for (const f of ["title", "summary", "intro"]) if (!String(g[f] || "").trim()) feil.push(`${hvor}: mangler ${f}`);
    if (!Array.isArray(g.chapters) || !g.chapters.length) feil.push(`${hvor}: chapters må være en ikke-tom liste`);
    sjekkHtml(g.intro, hvor + ".intro", feil, advarsel, false);
    språk([g.title, g.summary, g.intro, g.exam].join(" "), hvor, feil);
    const steg = g.steps || [];
    /* Så få steg som trengs (typisk 8–12), ikke et fast tall. Bare ytterpunktene varsles. */
    if (steg.length < 5 || steg.length > 16) advarsel.push(`${hvor}: ${steg.length} steg; er stigen for tynn eller for lang?`);
    const gpos = [0, 0, 0, 0];
    let gOrd = 0;
    steg.forEach((s, i) => {
      const h = `${s.id || hvor + "[" + i + "]"}`;
      if (s.id !== `${g.id}-${i + 1}`) feil.push(`${h}: id skal være ${g.id}-${i + 1}`);
      if (ider.has(s.id)) feil.push(`${h}: id brukt før`); ider.add(s.id);
      for (const f of ["title", "theory", "q", "solution", "check"]) if (!String(s[f] || "").trim()) feil.push(`${h}: mangler ${f}`);
      for (const f of ["theory", "example", "q", "solution", "check"]) { sjekkHtml(s[f], `${h}.${f}`, feil, advarsel, false); språk(s[f], `${h}.${f}`, feil); }
      språk(s.title, h + ".title", feil);
      if (!Array.isArray(s.options) || s.options.length !== 4) feil.push(`${h}: må ha nøyaktig fire alternativer`);
      else {
        if (new Set(s.options.map(ren)).size !== 4) feil.push(`${h}: to alternativer er like`);
        s.options.forEach((o, k) => { sjekkHtml(o, `${h}.options[${k}]`, feil, advarsel, true); språk(o, `${h}.options[${k}]`, feil); });
      }
      if (!Number.isInteger(s.answer) || s.answer < 0 || s.answer > 3) feil.push(`${h}: answer må være 0–3`);
      else {
        pos[s.answer]++; gpos[s.answer]++; antall++;
        /* Lengdesjekken gjelder bare utsagnsalternativer. Tallalternativer har
           samme format, og lengden følger av størrelsen; å telle dem presset
           forfatterne til å holde fasiten kort, så «det ensifrede er riktig»
           ble en ny avsløring. Bare et alternativ som er strengt lengst teller. */
        if (Array.isArray(s.options) && s.options.length === 4 && !s.options.every(erTall)) {
          tekststeg++;
          const l = s.options.map((o) => ren(o).length);
          if (l[s.answer] > Math.max(...l.filter((_, k) => k !== s.answer))) lengst++;
        }
        const p = plan && plan[g.id];
        if (p && p[i] !== undefined && p[i] !== s.answer) feil.push(`${h}: fasiten står på ${"ABCD"[s.answer]}, planen sier ${"ABCD"[p[i]]}`);
      }
      if (!Array.isArray(s.traps) || s.traps.length !== 4) feil.push(`${h}: traps må ha fire plasser, parallelt med options`);
      else s.traps.forEach((t, k) => {
        if (k === s.answer && t !== null) feil.push(`${h}: traps[${k}] skal være null, det er fasiten`);
        if (k !== s.answer && !String(t || "").trim()) feil.push(`${h}: traps[${k}] mangler; hvert galt alternativ skal si hvilken feil det er laget av`);
        if (k !== s.answer && t) { sjekkHtml(t, `${h}.traps[${k}]`, feil, advarsel, true); språk(t, `${h}.traps[${k}]`, feil); }
      });
      for (const f of ["solution", "check", "theory", "example"]) if (BOKSTAVREF.test(ren(s[f]))) feil.push(`${h}.${f}: viser til et alternativ med bokstav; vis til innholdet`);
      gOrd += ord(s.theory) + ord(s.example) + ord(s.q);
    });
    rader.push(`  ${String(g.num).padStart(2)} ${String(g.id).padEnd(12)} ${String(steg.length).padStart(2)} steg · fasit ${gpos.join("/")} · ~${Math.round(gOrd / 110 + steg.length * 3)} min  ${g.title}`);
  });

  if (antall >= 12) {
    const maks = Math.max(...pos) / antall;
    if (maks > 0.35) feil.push(`fasitposisjonene er skjeve: ${pos.join("/")} (fallgruve 7c)`);
  }
  if (tekststeg >= 12) {
    const andel = lengst / tekststeg;
    if (andel > 0.4) feil.push(`fasiten er det lengste alternativet i ${lengst} av ${tekststeg} utsagnssteg (${Math.round(andel * 100)} %); hold det under 40 % (fallgruve 7y)`);
    else if (andel < 0.1) feil.push(`fasiten er det lengste alternativet i bare ${lengst} av ${tekststeg} utsagnssteg; sikt mot rundt 25 % (fallgruve 7y)`);
  }
  console.log(rader.join("\n"));
  console.log(`\n  ${alle.length} sjangre · ${antall} steg · fasit ${pos.join("/")} · fasiten lengst i ${lengst} av ${tekststeg} utsagnssteg`);
  advarsel.forEach((a) => console.log("ADVARSEL  " + a));
  feil.forEach((f) => console.log("FEIL  " + f));
  if (!feil.length) console.log("\nIngen feil.");
  else process.exitCode = 1;
}

main();
