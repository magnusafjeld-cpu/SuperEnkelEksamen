#!/usr/bin/env node
/* Strukturkontroll for eksamenssettene (EDU_DATA.sets).

   Modulen js/bundle-sett.js feiler ikke på et sett som mangler noe — den tegner
   bare en oppgave uten tekst, et flervalg som ikke kan rettes, eller et
   poengregnskap som ikke går opp. Dette skriptet ser etter nøyaktig det.

   Bruk:  node tools/sjekk-sett.js fag/fie402/sett.js [fag/fie432/sett.js …]
          node tools/sjekk-sett.js                     # alle fag/<id>/sett.js

   Flervalg (lagt til september 2026): en oppgave eller deloppgave med `options`
   og `answer` rettes automatisk. `answer` er en indeks, eller en liste når
   fasiten godtar flere. Kontrollen sjekker at indeksene finnes, at poengene
   summerer, og at et flervalg ikke også har `criteria` (som bare gir mening for
   selvvurderte oppgaver).                                                      */

const fs = require("fs");
const path = require("path");

const filer = process.argv.slice(2);
if (!filer.length) {
  const fag = path.join(__dirname, "..", "fag");
  for (const d of fs.readdirSync(fag)) {
    const f = path.join(fag, d, "sett.js");
    if (fs.existsSync(f)) filer.push(f);
  }
}
if (!filer.length) { console.log("fant ingen sett.js"); process.exit(0); }

/* Kapittelnumrene hentes fra manualen når den finnes, så vi kan si fra om en
   oppgave peker på et kapittel som ikke er skrevet. */
function kapitlerFor(settfil) {
  const id = path.basename(path.dirname(settfil));
  const reg = fs.readFileSync(path.join(__dirname, "..", "js", "subjects.js"), "utf8");
  const i = reg.indexOf(`id: "${id}"`);
  if (i < 0) return null;
  const m = reg.slice(i, i + 2500).match(/candidates:\s*\[\s*"([^"]+)"/);
  if (!m) return null;
  const man = path.join(__dirname, "..", m[1]);
  if (!fs.existsSync(man)) return null;
  const html = fs.readFileSync(man, "utf8");
  return new Set([...html.matchAll(/<section id="k(\d+)"/g)].map((x) => +x[1]));
}

let feilTotalt = 0;

for (const fil of filer) {
  console.log(`\n${"=".repeat(72)}\n${path.relative(path.join(__dirname, ".."), fil)}`);
  const w = { EDU_DATA: {} };
  global.window = w;
  delete require.cache[require.resolve(path.resolve(fil))];
  require(path.resolve(fil));
  const sets = w.EDU_DATA.sets || [];
  if (!sets.length) { console.log("  ingen sett i filen"); continue; }

  const kap = kapitlerFor(fil);
  const feil = [], advarsel = [];
  const si = (l, hvor, m) => l.push(`${hvor}: ${m}`);
  const HTML = /<[a-zA-Z/!]/;
  const idSett = new Set();

  for (const s of sets) {
    const sid = s.id || "(uten id)";
    if (!s.id) si(feil, sid, "mangler id — id-en er lagringsnøkkel for selvvurdering");
    if (idSett.has(s.id)) si(feil, sid, "duplisert sett-id");
    idSett.add(s.id);
    for (const f of ["label", "minutes", "points"]) if (s[f] == null) si(feil, sid, `mangler ${f}`);
    if (typeof s.minutes !== "number" || s.minutes < 30) si(feil, sid, "minutes er urimelig");
    if (typeof s.points !== "number" || s.points <= 0) si(feil, sid, "points er urimelig");
    if (s.facts && !Array.isArray(s.facts)) si(feil, sid, "facts må være en liste");
    if (s.mc && typeof s.mc.wrongFactor === "number" && (s.mc.wrongFactor > 0 || s.mc.wrongFactor < -1))
      si(feil, sid, `mc.wrongFactor ${s.mc.wrongFactor} er utenfor [-1, 0]`);

    const øv = s.exercises || [];
    if (!øv.length) { si(feil, sid, "settet har ingen oppgaver"); continue; }

    let sumPoeng = 0, antallMC = 0, antallÅpne = 0;
    const nSett = new Set();
    for (const ex of øv) {
      const hvor = `${sid} oppgave ${ex.n}`;
      if (ex.n == null) si(feil, sid, "en oppgave mangler n — n er lagringsnøkkel");
      if (nSett.has(ex.n)) si(feil, hvor, "duplisert oppgavenummer");
      nSett.add(ex.n);
      if (!ex.body) si(feil, hvor, "mangler body");
      if (typeof ex.points !== "number") si(feil, hvor, "mangler points");
      sumPoeng += ex.points || 0;
      if (ex.chapters && !Array.isArray(ex.chapters)) si(feil, hvor, "chapters må være en liste");
      (ex.chapters || []).forEach((n) => {
        if (kap && !kap.has(n)) si(advarsel, hvor, `peker på kapittel k${n}, som ikke finnes i manualen`);
      });

      /* Et ledd er enten flervalg (options + answer) eller selvvurdert. */
      const ledd = [];
      if (ex.options) ledd.push({ merke: hvor, o: ex, poeng: ex.points || 0 });
      (ex.parts || []).forEach((p) => {
        const pm = `${hvor}${p.label || "?"}`;
        if (!p.body) si(feil, pm, "deloppgave uten body");
        if (typeof p.points !== "number") si(advarsel, pm, "deloppgave uten points");
        if (p.options) ledd.push({ merke: pm, o: p, poeng: p.points || 0 });
        else if (!p.solution) si(feil, pm, "selvvurdert deloppgave uten solution");
      });

      if (ledd.length) {
        antallMC++;
        /* Deloppgavenes poeng må summere til oppgavens, ellers viser
           resultatlinjen «x av y» der y ikke er oppgavens poengsum. */
        if ((ex.parts || []).length) {
          const sumDeler = (ex.parts || []).reduce((a, p) => a + (p.points || 0), 0);
          if (Math.abs(sumDeler - (ex.points || 0)) > 1e-9)
            si(feil, hvor, `deloppgavene summerer til ${sumDeler}, oppgaven sier ${ex.points}`);
        }
      } else antallÅpne++;

      for (const { merke, o, poeng } of ledd) {
        if (!Array.isArray(o.options) || o.options.length < 2)
          si(feil, merke, "options må ha minst to alternativer");
        const n = (o.options || []).length;
        const svar = Array.isArray(o.answer) ? o.answer : [o.answer];
        if (o.answer == null) si(feil, merke, "flervalg uten answer");
        else if (svar.some((i) => !Number.isInteger(i) || i < 0 || i >= n))
          si(feil, merke, `answer ${JSON.stringify(o.answer)} er utenfor 0…${n - 1}`);
        else if (new Set(svar).size !== svar.length) si(feil, merke, "answer har duplikater");
        else if (svar.length === n) si(feil, merke, "alle alternativene er markert riktige");
        if (svar.length > 1) si(advarsel, merke, `${svar.length} godtatte svar — sjekk at fasiten faktisk sier det`);
        if (!o.solution) si(feil, merke, "flervalg uten solution — da lærer man ingenting av å bomme");
        if (o.criteria && o.criteria.length)
          si(advarsel, merke, "flervalg med criteria — kriterielisten vises bare for selvvurderte oppgaver");
        if (poeng <= 0) si(advarsel, merke, "flervalgsledd uten poeng");
        (o.options || []).forEach((t, i) => {
          if (t == null || String(t).trim() === "") si(feil, merke, `alternativ ${i + 1} er tomt`);
        });
      }

      if (!ledd.length && !(ex.parts || []).length && !ex.solution)
        si(feil, hvor, "selvvurdert oppgave uten solution");
      (ex.criteria || []).forEach((c, i) => {
        if (HTML.test(c)) si(feil, hvor, `criteria ${i + 1} inneholder markup — feltet escapes`);
      });
      (ex.parts || []).forEach((p) => (p.criteria || []).forEach((c, i) => {
        if (HTML.test(c)) si(feil, `${hvor}${p.label}`, `criteria ${i + 1} inneholder markup`);
      }));
    }

    if (Math.abs(sumPoeng - s.points) > 1e-9)
      si(feil, sid, `oppgavene summerer til ${sumPoeng} poeng, settet sier ${s.points}`);
    const per = s.minutes / s.points;
    if (per < 0.5 || per > 20) si(advarsel, sid, `${per.toFixed(1)} min per poeng — sjekk minutes og points`);
    console.log(`  ${(sid + "            ").slice(0, 12)} ${øv.length} oppgaver · ${sumPoeng} poeng · ${s.minutes} min`
      + ` · ${antallMC} flervalg / ${antallÅpne} selvvurdert`
      + (s.mc && s.mc.wrongFactor ? ` · minuspoeng ${s.mc.wrongFactor.toFixed(2)}` : ""));
  }

  if (advarsel.length) {
    console.log(`\n  ${advarsel.length} advarsler:`);
    advarsel.slice(0, 25).forEach((a) => console.log("    ~ " + a));
    if (advarsel.length > 25) console.log(`    … og ${advarsel.length - 25} til`);
  }
  if (feil.length) {
    console.log(`\n  ${feil.length} feil:`);
    feil.slice(0, 25).forEach((f) => console.log("    ✗ " + f));
    if (feil.length > 25) console.log(`    … og ${feil.length - 25} til`);
    feilTotalt += feil.length;
  } else console.log("\n  Ingen feil.");
}

process.exit(feilTotalt ? 1 : 0);
