#!/usr/bin/env node
/* Kontroll av svar-dataene for retting i eksamenssettene (docs/fie402-svar-spek.md).

   Bruk:  node tools/sjekk-svar.js fie402                alle settene
          node tools/sjekk-svar.js fie402 prove9 prove10  bare disse

   Leser fag/<fag>/_svar/*.json (kilden), ikke den bygde svar.js.
   FEIL stopper (exit 1). ADVARSEL bør leses.
   Sjekker at hver deloppgave som ikke er flervalg har én oppføring, at typen og
   feltene er gyldige, og at hvert tall finnes i løsningsteksten innenfor toleransen
   (ellers må det være merket regnet: true med en merknad).
   Problem sets (problemsett.js, id som ps1) sjekkes på samme måte. De har ingen poeng
   i oppgavene, så poengene kommer fra oppføringen (`poeng`, ellers regelen i
   psPoeng). Tekstdelene bør ha `kriterier`. */
const fs = require("fs"), path = require("path");
const [fag, ...ider] = process.argv.slice(2);
if (!fag) { console.error("Bruk: node tools/sjekk-svar.js <fag> [settId …]"); process.exit(2); }
const ROT = path.join(__dirname, "..", "fag", fag);
global.window = { EDU_DATA: {} };
eval(fs.readFileSync(path.join(ROT, "sett.js"), "utf8"));
const psFil = path.join(ROT, "problemsett.js");
if (fs.existsSync(psFil)) eval(fs.readFileSync(psFil, "utf8"));
/* Problem sets i samme form som settene: delspørsmålet er en deloppgave og fasiten løsningen. */
const psSett = (window.EDU_DATA.problemsett || []).map((ps) => ({ id: ps.id, ps: true,
  exercises: (ps.oppgaver || []).map((o) => ({ n: o.nr, body: o.intro || "",
    parts: (o.deler || []).map((d) => ({ label: d.l, body: (d.ctx || "") + " " + (d.q || ""), solution: d.fasit || "" })) })) }));
/* Poengene til et delspørsmål i et problem set (samme regel som i bundle-problemsett.js). */
const psPoeng = (d) => (typeof d.poeng === "number" ? d.poeng
  : d.type === "tall" ? (d.tall || []).length : d.type === "blandet" ? (d.tallPoeng || 0) + 2 : 2);
const alleSett = (window.EDU_DATA.sets || []).filter((s) => !s.lån && s.kind !== "kartlegging").concat(psSett);
const sett = ider.length ? alleSett.filter((s) => ider.includes(s.id)) : alleSett;
ider.forEach((id) => { if (!alleSett.some((s) => s.id === id)) console.log(`ADVARSEL ${id}: ikke et eget sett (lånt, kartlegging eller finnes ikke)`); });

const feil = [], adv = [];
const F = (h, m) => feil.push(`FEIL     ${h}: ${m}`);
const A = (h, m) => adv.push(`ADVARSEL ${h}: ${m}`);

const mappe = path.join(ROT, "_svar");
const data = {};
const filAv = {};
if (fs.existsSync(mappe)) for (const f of fs.readdirSync(mappe).filter((f) => f.endsWith(".json"))) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(mappe, f), "utf8")); } catch (e) { F(f, "ugyldig JSON: " + e.message); continue; }
  for (const [k, v] of Object.entries(j)) {
    if (data[k]) F(k, `står i både ${filAv[k]} og ${f}`);
    data[k] = v; filAv[k] = f;
    if (!k.startsWith(f.replace(/\.json$/, "") + ":")) F(k, `ligger i ${f}, men nøkkelen hører til et annet sett`);
  }
}

const ren = (h) => String(h == null ? "" : h).replace(/<[^>]*>/g, " ").replace(/&minus;/g, "−").replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, " ");
/* Alle tall i en tekst: tusenskiller med komma eller mellomrom, minus som − eller -. */
function tallI(tekst) {
  const t = ren(tekst).replace(/[−–]/g, "-");
  const ut = [];
  for (const m of t.matchAll(/-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+/g)) {
    const s = m[0].replace(/[, ](?=\d{3}\b)/g, "");
    const n = parseFloat(s); if (Number.isFinite(n)) ut.push(n, Math.abs(n));
  }
  return ut;
}
const innenfor = (n, v, t) => Math.abs(n - v) <= Math.max(t.abs || 0, (t.tol == null ? 0.01 : t.tol) * Math.abs(v), 1e-9);

const TYPER = ["tall", "tekst", "blandet", "bokstav", "ingen"];
const brukt = new Set();
const telling = { tall: 0, tekst: 0, blandet: 0, bokstav: 0, ingen: 0, flervalg: 0 };
for (const s of sett) {
  for (const ex of s.exercises || []) {
    const deler = ex.parts && ex.parts.length ? ex.parts : [Object.assign({}, ex, { label: "" })];
    for (const p of deler) {
      const k = `${s.id}:${ex.n}:${p.label || ""}`;
      if (p.options) { telling.flervalg++; if (data[k]) F(k, "flervalgsledd skal ikke ha oppføring"); brukt.add(k); continue; }
      const d = data[k]; brukt.add(k);
      if (!d) { F(k, "mangler oppføring"); continue; }
      if (!TYPER.includes(d.type)) { F(k, `ukjent type «${d.type}»`); continue; }
      telling[d.type]++;
      const poeng = s.ps ? psPoeng(d) : (p.points || ex.points || 0);
      if (s.ps) {
        if (d.type === "bokstav") F(k, "bokstav finnes ikke i problem sets");
        if (d.poeng != null && !(typeof d.poeng === "number" && d.poeng >= 1 && d.poeng <= 8)) F(k, `poeng må være et tall fra 1 til 8 (er ${d.poeng})`);
        if (d.kriterier != null && !(Array.isArray(d.kriterier) && d.kriterier.every((x) => typeof x === "string" && x.trim()))) F(k, "kriterier må være en liste med tekster");
        if ((d.type === "tekst" || d.type === "blandet") && !(d.kriterier || []).length) A(k, "tekstdelen har ingen kriterier; Claude retter da bare mot fasiten");
      } else if (d.poeng != null || d.kriterier != null) F(k, "poeng og kriterier hører bare til problem sets");
      const kilde = [p.solution, p.criteria && p.criteria.join(" "), p === ex ? "" : ex.solution].join(" ");
      if (d.type === "tekst") {
        if (d.tall) F(k, "tekst skal ikke ha tall");
        continue;
      }
      if (d.type === "ingen") {
        if (!d.merknad) F(k, "ingen krever en merknad med grunnen");
        continue;
      }
      if (d.type === "bokstav") {
        if (!/^[A-F]$/.test(d.svar || "")) { F(k, `svar må være én bokstav A–F (er «${d.svar}»)`); continue; }
        const l = ren(p.solution || ex.solution || "");
        const m = l.match(/(?:answer|correct)[^A-Za-z]{0,12}(?:is\s+)?\(?([A-F])\b/i);
        if (!m) A(k, "fant ikke «Answer: X» i løsningen; sjekk bokstaven for hånd");
        else if (m[1].toUpperCase() !== d.svar) F(k, `løsningen sier ${m[1]}, oppføringen ${d.svar}`);
        if (!/\b[Aa]\s*\.?\)|\b[Aa]\.\s|\([Aa]\)/.test(ren(p.body || ex.body || ""))) A(k, "finner ikke alternativene i oppgaveteksten");
        continue;
      }
      if (!Array.isArray(d.tall) || !d.tall.length) { F(k, "tall mangler"); continue; }
      if (d.tall.length > 5) A(k, `${d.tall.length} tall; er alle spurt etter?`);
      if (d.type === "blandet") {
        if (typeof d.tallPoeng !== "number" || !(d.tallPoeng > 0 && d.tallPoeng < poeng)) F(k, `tallPoeng må være mellom 0 og ${poeng} (er ${d.tallPoeng})`);
      } else if (d.tallPoeng != null) F(k, "tallPoeng hører bare til blandet");
      const nums = tallI(kilde);
      d.tall.forEach((t, i) => {
        const h = `${k} tall ${i + 1} (${t.navn || "?"})`;
        if (!t.navn) F(h, "mangler navn");
        if (typeof t.verdi !== "number" || !Number.isFinite(t.verdi)) { F(h, "verdi er ikke et tall"); return; }
        if (typeof t.enhet !== "string") F(h, "enhet mangler (bruk \"\" for rene tall)");
        if (Math.abs(t.verdi) < 1e-6 && !t.abs) F(h, "verdien er 0: oppgi abs-toleranse");
        if (t.tol != null && !(t.tol > 0 && t.tol <= 0.05)) A(h, `tol ${t.tol} er uvanlig`);
        const kandidater = [t.verdi, ...(t.alt || [])];
        const funnet = kandidater.some((v) => nums.some((n) => innenfor(n, v, t) || (t.enhet === "%" && (innenfor(n * 100, v, t) || innenfor(n, v / 100, Object.assign({}, t, { abs: (t.abs || 0) / 100 }))))));
        if (!funnet) {
          if (t.regnet) { if (!d.merknad && !t.merknad) F(h, "regnet: true krever en merknad"); else A(h, `${t.verdi} står ikke i løsningen (regnet: ${(t.merknad || d.merknad || "").slice(0, 80)})`); }
          else F(h, `${t.verdi} finnes ikke i løsningsteksten innenfor toleransen. Rett verdien, eller sett regnet: true med merknad`);
        }
      });
    }
  }
}
for (const k of Object.keys(data)) {
  const id = k.split(":")[0];
  if ((!ider.length || ider.includes(id)) && !brukt.has(k)) F(k, "oppføringen svarer ikke til noen deloppgave");
}
adv.forEach((x) => console.log(x));
feil.forEach((x) => console.log(x));
console.log(`\n${sett.length} sett · tall ${telling.tall} · tekst ${telling.tekst} · blandet ${telling.blandet} · bokstav ${telling.bokstav} · ingen ${telling.ingen} · flervalg ${telling.flervalg} · ${feil.length} feil, ${adv.length} advarsler.`);
process.exit(feil.length ? 1 : 0);
