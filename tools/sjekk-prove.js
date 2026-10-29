#!/usr/bin/env node
/* Lekkasjekontroll for prøveeksamenene (sett med kind: "mock").

   Strukturen sjekkes av tools/sjekk-sett.js. Dette skriptet ser etter det som
   lar en student finne svaret uten fagkunnskap, og som minuspoengene straffer
   hardest:
   - fasitposisjonene skal følge fag/<fag>/_prove/fasitplan.json når den finnes
   - riktig alternativ skal ikke være det lengste oftere enn tilfeldig (≈ 25 %)
   - riktig tall skal ikke være det midterste eller det største systematisk
   - ingen ledd skal være kopiert fra et ekte sett (over 80 % felles ord)
   - skrivereglene: ingen tankestrek, ingen komma foran «og»

   Bruk:  node tools/sjekk-prove.js fie432                                     */
const fs = require("fs");
const path = require("path");

const fag = process.argv[2];
if (!fag) { console.error("Bruk: node tools/sjekk-prove.js <fag>"); process.exit(2); }
const rot = path.join(__dirname, "..");
global.window = { EDU_DATA: {} };
eval(fs.readFileSync(path.join(rot, "fag", fag, "sett.js"), "utf8"));
const sets = window.EDU_DATA.sets || [];
const prøver = sets.filter((s) => s.kind === "mock");
const ekte = sets.filter((s) => s.kind !== "mock");
const planFil = path.join(rot, "fag", fag, "_prove", "fasitplan.json");
const plan = fs.existsSync(planFil) ? JSON.parse(fs.readFileSync(planFil, "utf8")) : {};

const strip = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
const tall = (s) => { const m = strip(s).replace(/\s(?=\d{3}\b)/g, "").replace(/−/g, "-").match(/-?\d+(?:,\d+)?/); return m ? parseFloat(m[0].replace(",", ".")) : null; };
const ledd = (s) => s.exercises.flatMap((e) => (e.parts && e.parts.length ? e.parts : [e]).map((p) => ({ e, p })));
const ord = (e, p) => new Set(strip((e.body || "") + " " + (p === e ? "" : p.body)).toLowerCase().split(" "));
const ekteOrd = ekte.flatMap((s) => ledd(s).map(({ e, p }) => ord(e, p)));

let feil = 0;
if (!prøver.length) console.log("Ingen prøveeksamener i " + fag);
prøver.forEach((s, k) => {
  const L = ledd(s);
  const svar = L.map(({ p }) => p.answer);
  const pl = plan["p" + (k + 1)];
  const avvik = pl ? svar.map((a, i) => (a !== pl[i] ? i + 1 : null)).filter(Boolean) : [];
  let lengst = 0, tekst = 0, maks = 0, min = 0, midt = 0, tallLedd = 0;
  const funn = [];
  L.forEach(({ e, p }, i) => {
    const o = p.options || [];
    if (o.length !== 4) funn.push(`ledd ${i + 1}: ${o.length} alternativer, ikke fire`);
    const t = o.map(tall);
    if (t.every((x) => x !== null) && o.every((x) => strip(x).length < 40)) {
      tallLedd++;
      const sort = [...t].sort((a, b) => a - b), v = t[p.answer];
      if (v === sort[3]) maks++; else if (v === sort[0]) min++; else midt++;
    } else {
      tekst++;
      const len = o.map((x) => strip(x).length);
      if (len[p.answer] === Math.max(...len) && len.filter((x) => x === len[p.answer]).length === 1) lengst++;
    }
    const a = ord(e, p);
    for (const b of ekteOrd) {
      const felles = [...a].filter((w) => b.has(w)).length;
      if (a.size > 15 && felles / a.size > 0.8) { funn.push(`ledd ${i + 1}: ${Math.round(felles / a.size * 100)} % felles ord med et ekte spørsmål (sjekk at det ikke er kopiert)`); break; }
    }
  });
  const raw = JSON.stringify(s);
  const tankestrek = (raw.match(/—/g) || []).length, kommaOg = (raw.match(/, og /g) || []).length;
  if (avvik.length || tankestrek || kommaOg) feil++;
  console.log(`\n${s.id} · ${s.label}: ${L.length} ledd, ${s.points} poeng`);
  console.log(`  fasit A–D: ${[0, 1, 2, 3].map((x) => svar.filter((y) => y === x).length).join("/")}` + (pl ? ` · avvik fra fasitplanen: ${avvik.length ? avvik.join(", ") : "ingen"}` : " · ingen fasitplan"));
  console.log(`  tekstledd ${tekst}: riktig er lengst i ${lengst} (${Math.round(lengst / Math.max(tekst, 1) * 100)} %, tilfeldig ≈ 25 %)`);
  console.log(`  tallledd ${tallLedd}: riktig er størst ${maks}, minst ${min}, i midten ${midt} (tilfeldig ≈ 25/25/50 %)`);
  if (tankestrek || kommaOg) console.log(`  FEIL tankestrek: ${tankestrek} · komma foran «og»: ${kommaOg}`);
  funn.forEach((x) => console.log("  ~ " + x));
});
console.log(feil ? `\n${feil} sett med feil.` : "\nIngen feil.");
process.exit(feil ? 1 : 0);
