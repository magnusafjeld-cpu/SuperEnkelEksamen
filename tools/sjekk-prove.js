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
   - kalibrering mot skoleeksamenene: ord per ledd og andel ledd med tallsvar,
     sammenlignet med snittet for skoleeksamenene (kind udefinert, id h2023–h2025)
     og kursgodkjenningen mc2026. Hjemmeeksamenen H2022 er lengre og tyngre.

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
const mål = (s) => {
  let n = 0, ordSum = 0, tallLedd = 0;
  for (const e of s.exercises) {
    const L = e.parts && e.parts.length ? e.parts : [e];
    const felles = strip(e.body).split(" ").length;
    for (const p of L) {
      n++;
      ordSum += p === e ? felles : felles / L.length + strip(p.body).split(" ").length;
      if ((p.options || []).every((o) => /\d/.test(strip(o)) && strip(o).length < 40)) tallLedd++;
    }
  }
  return { ord: ordSum / n, tall: tallLedd / n };
};
const ledd = (s) => s.exercises.flatMap((e) => (e.parts && e.parts.length ? e.parts : [e]).map((p) => ({ e, p })));
const ord = (e, p) => new Set(strip((e.body || "") + " " + (p === e ? "" : p.body)).toLowerCase().split(" "));
const ekteOrd = ekte.flatMap((s) => ledd(s).map(({ e, p }) => ord(e, p)));

let feil = 0;
const ref = ["h2023", "h2024", "h2025"].map((id) => sets.find((s) => s.id === id)).filter(Boolean).map(mål);
const refOrd = ref.reduce((a, m) => a + m.ord, 0) / Math.max(ref.length, 1);
const refTall = ref.reduce((a, m) => a + m.tall, 0) / Math.max(ref.length, 1);
const mc = sets.find((s) => s.id === "mc2026");
if (ref.length) console.log(`Skoleeksamenene (snitt H2023–H2025): ${Math.round(refOrd)} ord per ledd, ${Math.round(refTall * 100)} % tallsvar` + (mc ? ` · kursgodkjenningen 2026: ${Math.round(mål(mc).ord)} ord, ${Math.round(mål(mc).tall * 100)} % tallsvar` : ""));
if (!prøver.length) console.log("Ingen prøveeksamener i " + fag);
prøver.forEach((s, k) => {
  const L = ledd(s);
  const svar = L.map(({ p }) => p.answer);
  const pl = plan["p" + String(s.id).replace(/\D/g, "")];  // prove5 → p5, uavhengig av rekkefølgen
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
  const m = mål(s);
  const tung = ref.length && (m.ord > refOrd * 1.2 || m.tall > refTall + 0.15);
  console.log(`  kalibrering: ${Math.round(m.ord)} ord per ledd, ${Math.round(m.tall * 100)} % tallsvar` + (tung ? "  ~ tyngre enn skoleeksamenene" : ""));
  console.log(`  tallledd ${tallLedd}: riktig er størst ${maks}, minst ${min}, i midten ${midt} (tilfeldig ≈ 25/25/50 %)`);
  if (tankestrek || kommaOg) console.log(`  FEIL tankestrek: ${tankestrek} · komma foran «og»: ${kommaOg}`);
  funn.forEach((x) => console.log("  ~ " + x));
});
console.log(feil ? `\n${feil} sett med feil.` : "\nIngen feil.");
process.exit(feil ? 1 : 0);
