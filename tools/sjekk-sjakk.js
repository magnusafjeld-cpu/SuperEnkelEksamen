#!/usr/bin/env node
/* Kontroll av et sjakkrepertoar (EDU_DATA.repertoar) og diagrammene i pensum.

   Bruker de samme reglene som appen (js/sjakk-kjerne.js), så det som går
   gjennom her, kan spilles på brettet.

   FEIL
   - et ulovlig trekk eller et trekk som ikke kan leses, med linje og stilling
   - ukjent gruppe, id brukt to ganger, id som ikke er små bokstaver, tall og bindestrek
   - en kommentar til et trekk som ikke finnes i linjen («7...c6» uten 7...c6)
   - to linjer med samme farge som svarer forskjellig i samme stilling. Treneren
     ville da godkjent bare det ene, og du lærer to svar på ett spørsmål.
   - tankestrek (—) og komma foran «og» i tekstene
   - et diagram i pensum (data-trekk) med ulovlige trekk

   ADVARSEL
   - en linje som slutter på motstanderens trekk (siste trekk du øver på er da hans)
   - en linje som er en ren forkortelse av en annen i samme gruppe
   - en linje uten kommentarer eller uten plan

   Bruk:  node tools/sjekk-sjakk.js privat-sjakk           # fag/privat-sjakk/repertoar*.js, manual.html og _fragmenter/
          node tools/sjekk-sjakk.js --fil sti/repertoar.js [--manual sti/manual.html]
          node tools/sjekk-sjakk.js --perft                 # tester reglene
*/
const fs = require("fs");
const path = require("path");
const C = require(path.join(__dirname, "..", "js", "sjakk-kjerne.js"));

const args = process.argv.slice(2);
if (args.includes("--perft")) {
  const tilfeller = [
    [C.START, [20, 400, 8902, 197281]],
    ["r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1", [48, 2039, 97862]],
    ["8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1", [14, 191, 2812, 43238]],
    ["r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1", [6, 264, 9467]],
    ["rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8", [44, 1486, 62379]],
  ];
  let ok = true;
  for (const [fen, forventet] of tilfeller) {
    const fikk = forventet.map((_, i) => C.perft(C.fraFEN(fen), i + 1));
    const likt = fikk.every((x, i) => x === forventet[i]);
    ok = ok && likt;
    console.log(`${likt ? "ok  " : "FEIL"} ${fikk.join(" ")}  ${fen}`);
  }
  process.exit(ok ? 0 : 1);
}

const rot = path.join(__dirname, "..");
const fag = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--fil" && args[args.indexOf(a) - 1] !== "--manual");
const fagMappe = fag ? path.join(rot, "fag", fag) : null;
/* Repertoaret kan være delt i flere filer (repertoar-*.js), én per del, så flere
   kan skrive samtidig. Alle leses, i navnerekkefølge. */
const filer = args.includes("--fil") ? [path.resolve(args[args.indexOf("--fil") + 1])]
  : fagMappe && fs.existsSync(fagMappe) ? fs.readdirSync(fagMappe).filter((f) => /^repertoar.*\.js$/.test(f)).sort().map((f) => path.join(fagMappe, f)) : [];
if (!filer.length) { console.error("fant ingen repertoar*.js"); process.exit(2); }
const manualFiler = [];
if (args.includes("--manual")) manualFiler.push(path.resolve(args[args.indexOf("--manual") + 1]));
else if (fagMappe) {
  const frag = path.join(fagMappe, "_fragmenter");
  if (fs.existsSync(frag)) fs.readdirSync(frag).filter((f) => f.endsWith(".html")).sort().forEach((f) => manualFiler.push(path.join(frag, f)));
  else if (fs.existsSync(path.join(fagMappe, "manual.html"))) manualFiler.push(path.join(fagMappe, "manual.html"));
}

global.window = { EDU_DATA: {} };
for (const f of filer) {
  try { eval(fs.readFileSync(f, "utf8")); } catch (e) { console.error(`${path.basename(f)}: ${e.message}`); process.exit(1); }
}
const R = window.EDU_DATA.repertoar;
const feil = [], advarsel = [];
if (!R || !Array.isArray(R.linjer) || !Array.isArray(R.grupper)) { console.error("fila setter ikke EDU_DATA.repertoar = { grupper, linjer }"); process.exit(1); }

const språk = (t, hvor) => {
  t = String(t || "").replace(/<[^>]+>/g, "");
  if (/—/.test(t)) feil.push(`${hvor}: tankestrek (—)`);
  for (const og of t.matchAll(/[^\s,]+, og\b/g)) feil.push(`${hvor}: komma foran «og»: «${og[0]}»`);
};

const grupper = new Map();
for (const g of R.grupper) {
  if (!g.id || grupper.has(g.id)) feil.push(`gruppe ${g.id}: mangler id eller er brukt to ganger`);
  if (!["w", "b"].includes(g.farge)) feil.push(`gruppe ${g.id}: farge må være "w" eller "b"`);
  grupper.set(g.id, g);
  språk(g.navn, `gruppe ${g.id}.navn`); språk(g.intro, `gruppe ${g.id}.intro`);
}

const ider = new Set();
const svar = new Map();          // farge + stilling → { san, id }
const perGruppe = new Map();
const stillinger = new Set();
let lengst = 0;
const ferdige = [];
for (const l of R.linjer) {
  const hvor = `linje ${l.id || "(uten id)"}`;
  if (!l.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(l.id)) feil.push(`${hvor}: id skal være små bokstaver, tall og bindestrek`);
  if (ider.has(l.id)) feil.push(`${hvor}: id brukt to ganger`);
  ider.add(l.id);
  const g = grupper.get(l.gruppe);
  if (!g) { feil.push(`${hvor}: ukjent gruppe «${l.gruppe}»`); continue; }
  språk(l.navn, hvor + ".navn"); språk(l.plan, hvor + ".plan");
  let spilt;
  try { spilt = C.spill(l.trekk); } catch (e) { feil.push(`${hvor}: ${e.message}`); continue; }
  const merker = spilt.steg.map(C.merke);
  for (const [k, v] of Object.entries(l.kommentar || {})) {
    if (!merker.includes(k)) feil.push(`${hvor}: kommentar til «${k}», som ikke er et trekk i linjen (trekkene: ${merker.slice(0, 6).join(" ")} …)`);
    språk(v, `${hvor}.kommentar[${k}]`);
  }
  if (!Object.keys(l.kommentar || {}).length) advarsel.push(`${hvor}: ingen kommentarer`);
  if (!String(l.plan || "").trim()) advarsel.push(`${hvor}: mangler plan (hva du gjør når linjen slutter)`);
  const siste = spilt.steg[spilt.steg.length - 1];
  if (siste && siste.tur !== g.farge) advarsel.push(`${hvor}: slutter på motstanderens trekk (${C.merke(siste)})`);
  spilt.steg.forEach((s) => {
    const nøkkel = C.tilFEN(s.før, true);
    stillinger.add(nøkkel);
    if (s.tur !== g.farge) return;
    const k = g.farge + " " + nøkkel;
    const før = svar.get(k);
    if (før && før.san !== s.san) feil.push(`${hvor}: spiller ${C.merke(s)}, men ${før.id} spiller ${før.san} i samme stilling. Velg ett svar`);
    else if (!før) svar.set(k, { san: s.san, id: l.id });
  });
  lengst = Math.max(lengst, spilt.steg.length);
  perGruppe.set(l.gruppe, (perGruppe.get(l.gruppe) || 0) + 1);
  ferdige.push({ l, san: spilt.steg.map((s) => s.san).join(" ") });
}
for (const a of ferdige) for (const b of ferdige) {
  if (a !== b && a.l.gruppe === b.l.gruppe && b.san.startsWith(a.san + " ")) advarsel.push(`linje ${a.l.id}: er bare starten av ${b.l.id}`);
}

/* Diagrammene i pensum. */
let diagrammer = 0;
for (const manualFil of manualFiler) {
  const html = fs.readFileSync(manualFil, "utf8");
  for (const m of html.matchAll(/data-trekk="([^"]*)"/g)) {
    diagrammer++;
    try { C.spill(m[1]); } catch (e) { feil.push(`diagram i ${path.basename(manualFil)} («${m[1].slice(0, 40)}…»): ${e.message}`); }
  }
  språk(html.replace(/<script[\s\S]*?<\/script>/g, ""), path.basename(manualFil));
}

console.log(`  ${R.linjer.length} linjer · ${grupper.size} grupper · ${stillinger.size} stillinger · lengste ${Math.ceil(lengst / 2)} trekk · ${diagrammer} diagrammer`);
for (const [id, g] of grupper) console.log(`    ${id.padEnd(14)} ${g.farge === "w" ? "hvit " : "svart"} ${String(perGruppe.get(id) || 0).padStart(4)} linjer  ${g.navn}`);
const vis = (liste, merke) => { liste.slice(0, 80).forEach((x) => console.log(`${merke} ${x}`)); if (liste.length > 80) console.log(`${merke} … og ${liste.length - 80} til`); };
vis(advarsel, "ADVARSEL");
vis(feil, "FEIL");
console.log(feil.length ? `\n${feil.length} feil.` : "\nIngen feil.");
process.exit(feil.length ? 1 : 0);
