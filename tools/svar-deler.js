#!/usr/bin/env node
/* Skriver ut deloppgavene i ett eller flere eksamenssett med fasit og kriterier,
   som ren tekst, til den som lager svar-dataene (docs/fie402-svar-spek.md).
   Virker også for problem sets (id fra problemsett.js, for eksempel ps1).

   Bruk:  node tools/svar-deler.js fie402 prove9 [prove10 …]
          node tools/svar-deler.js fie402 ps1

   Nøkkelen foran hver deloppgave er den som skal stå i fag/<fag>/_svar/<sett>.json.
   Flervalgsledd (options) er merket og skal ikke ha oppføring. */
const fs = require("fs"), path = require("path");
const [fag, ...ider] = process.argv.slice(2);
if (!fag || !ider.length) { console.error("Bruk: node tools/svar-deler.js <fag> <settId> [settId …]"); process.exit(2); }
global.window = { EDU_DATA: {} };
eval(fs.readFileSync(path.join(__dirname, "..", "fag", fag, "sett.js"), "utf8"));
const psFil = path.join(__dirname, "..", "fag", fag, "problemsett.js");
if (fs.existsSync(psFil)) eval(fs.readFileSync(psFil, "utf8"));
const sets = window.EDU_DATA.sets || [];
const problemsett = window.EDU_DATA.problemsett || [];
const ren = (h) => String(h == null ? "" : h)
  .replace(/<sup>(.*?)<\/sup>/g, "^$1").replace(/<sub>(.*?)<\/sub>/g, "_$1")
  .replace(/<br\s*\/?>/g, "\n").replace(/<\/(p|li|tr|h\d)>/g, "\n").replace(/<[^>]*>/g, "")
  .replace(/&minus;/g, "−").replace(/&times;/g, "×").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&[a-z]+;/g, " ").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();

for (const id of ider) {
  const ps = problemsett.find((x) => x.id === id);
  if (ps) { skrivProblemsett(ps); continue; }
  const s = sets.find((x) => x.id === id);
  if (!s) { console.log(`\n### ${id}: FINNES IKKE`); continue; }
  if (s.lån) { console.log(`\n### ${id}: lånte oppgaver, ingen egne oppføringer`); continue; }
  console.log(`\n${"#".repeat(70)}\n### ${s.id} · ${s.label} · ${s.points} poeng\n${"#".repeat(70)}`);
  for (const ex of s.exercises || []) {
    console.log(`\n=== Oppgave ${ex.n}: ${ex.title || ""} (${ex.points} p)\n${ren(ex.body)}`);
    const deler = ex.parts && ex.parts.length ? ex.parts : [Object.assign({}, ex, { label: "" })];
    if (!(ex.parts && ex.parts.length) && ex.options) { console.log(`\n--- ${s.id}:${ex.n}: FLERVALG, ingen oppføring`); continue; }
    for (const p of deler) {
      const nøkkel = `${s.id}:${ex.n}:${p.label || ""}`;
      if (p.options) { console.log(`\n--- ${nøkkel}  FLERVALG, ingen oppføring`); continue; }
      console.log(`\n--- ${nøkkel}  (${p.points || ex.points} p)`);
      if (p !== ex && p.body) console.log(`SPØRSMÅL: ${ren(p.body)}`);
      console.log(`LØSNING: ${ren(p.solution || (p === ex ? ex.solution : "")) || "(ingen)"}`);
      const k = p.criteria || (p === ex ? ex.criteria : null);
      if (k && k.length) console.log("KRITERIER:\n" + k.map((c) => "  - " + ren(c)).join("\n"));
    }
    if (ex.parts && ex.parts.length && ex.solution) console.log(`\nSAMLET KOMMENTAR: ${ren(ex.solution)}`);
  }
}

/* Et problem set: oppgavene har intro og delspørsmål med kontekst, spørsmål og
   fasit (på norsk), men verken poeng eller kriterier. */
function skrivProblemsett(ps) {
  console.log(`\n${"#".repeat(70)}\n### ${ps.id} · ${ps.tittel} · ${ps.tema || ""} (problem set)\n${"#".repeat(70)}`);
  for (const o of ps.oppgaver || []) {
    console.log(`\n=== Oppgave ${o.nr}: ${o.tittel || ""}\n${ren(o.intro)}`);
    for (const d of o.deler || []) {
      console.log(`\n--- ${ps.id}:${o.nr}:${d.l}`);
      if (d.ctx) console.log(`KONTEKST: ${ren(d.ctx)}`);
      console.log(`SPØRSMÅL: ${ren(d.q)}`);
      console.log(`FASIT: ${ren(d.fasit) || "(ingen)"}`);
    }
  }
}
