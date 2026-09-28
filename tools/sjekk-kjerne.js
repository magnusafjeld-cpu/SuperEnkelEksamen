#!/usr/bin/env node
/* Strukturkontroll for kjernepensum (EDU_DATA.kjerne).

   Kjernepensum er en kort gjennomgang av det som kommer på eksamen, én del om
   gangen, med raske sjekker og en minicase etter hver del. Denne kontrollen
   fanger det motoren svikter stille på: en answer utenfor rekkevidde, en
   duplisert id (to spørsmål deler lagringsnøkkel), en løsning som ikke lar seg
   dele i deloppgaver, og HTML som ikke er lukket, så resten av delen havner
   inne i en boks.

   Bruk:  node tools/sjekk-kjerne.js fie402                     (bygget fil, ellers fragmentene)
          node tools/sjekk-kjerne.js fag/fie402/_kjerne/kj3.js  (ett eller flere fragmenter)

   Fasitposisjonene er trukket på forhånd (fallgruve 7c). Ligger
   fag/<id>/_kjerne/fasitplan.json der, kontrolleres hver sjekk mot planen.     */

const fs = require("fs");
const path = require("path");
const ROT = path.join(__dirname, "..");

/* Leseflyt for en kort, tett tekst med formler. Motoren bruker samme tall når
   den regner ut minuttene, så de to må følge hverandre. */
const ORD_PER_MIN = 110;
const MIN_PER_SJEKK = 1;

function fagene() {
  const w = { EDU_SUBJECTS: null };
  global.window = w;
  const p = path.join(ROT, "js", "subjects.js");
  delete require.cache[require.resolve(p)];
  require(p);
  return w.EDU_SUBJECTS || [];
}

function kapitlerFor(fag) {
  const sub = fagene().find((s) => s.id === fag);
  for (const kand of ((sub && sub.manual) || {}).candidates || []) {
    const p = path.join(ROT, kand);
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, "utf8");
      return new Set([...html.matchAll(/<section id="k(\d+)"/g)].map((m) => +m[1]));
    }
  }
  return null;
}

function last(filer) {
  const w = { EDU_DATA: { kjerne: [] } };
  global.window = w;
  for (const f of filer) {
    const kode = fs.readFileSync(f, "utf8");
    try { new Function("window", kode)(w); }
    catch (e) { console.log(`FEIL  ${path.relative(ROT, f)}: lar seg ikke kjøre: ${e.message}`); process.exitCode = 1; }
  }
  return w.EDU_DATA.kjerne || [];
}

/* ---------- HTML ---------- */
const TOMME = new Set(["br", "hr", "img", "wbr"]);
const LOVLIGE = new Set(["p", "h3", "h4", "div", "span", "b", "i", "em", "strong", "sub", "sup", "ul", "ol", "li",
  "table", "thead", "tbody", "tr", "th", "td", "br", "figure", "figcaption", "code",
  "svg", "g", "line", "path", "text", "tspan", "circle", "rect", "polyline", "polygon", "ellipse", "defs", "marker", "title"]);
const INLINE = new Set(["b", "i", "em", "strong", "sub", "sup", "br", "code", "span"]);
const KLASSER = new Set(["lead-in", "formula", "eq", "where", "callout", "mech", "tip", "warn", "link", "mistake",
  "h", "husk", "worked", "wh", "data", "n"]);

function tagger(html) {
  const ut = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) ut.push({ slutt: !!m[1], navn: m[2].toLowerCase(), attr: m[3], selvlukk: !!m[4], pos: m.index });
  return ut;
}
const klasser = (attr) => { const m = /class="([^"]*)"/.exec(attr || ""); return m ? m[1].split(/\s+/).filter(Boolean) : []; };
/* Senket og hevet skrift hører til ordet: r<sub>E</sub> er ett ord, ikke to. */
const ren = (s) => String(s || "").replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<\/?(sub|sup)>/g, "").replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
const ord = (s) => { const t = ren(s); return t ? t.split(" ").length : 0; };

function sjekkHtml(html, hvor, feil, advarsel, { inline = false } = {}) {
  if (/<(?![a-zA-Z\/!])/.test(html)) feil.push(`${hvor}: rå «<» i teksten. Skriv &lt;`);
  const stabel = [];
  for (const t of tagger(html)) {
    if (!LOVLIGE.has(t.navn)) feil.push(`${hvor}: ulovlig tagg <${t.navn}>`);
    if (inline && !INLINE.has(t.navn)) feil.push(`${hvor}: bare enkle tagger (b, i, sub, sup) er lov her, fant <${t.navn}>`);
    if (t.slutt) {
      const topp = stabel.pop();
      if (!topp || topp !== t.navn) { feil.push(`${hvor}: </${t.navn}> lukker ${topp ? "<" + topp + ">" : "ingenting"}`); if (topp) stabel.push(topp); }
      continue;
    }
    if (TOMME.has(t.navn) || t.selvlukk) continue;
    stabel.push(t.navn);
    const inneISvg = stabel.includes("svg") && t.navn !== "svg";
    if (!inneISvg) for (const k of klasser(t.attr)) if (!KLASSER.has(k)) advarsel.push(`${hvor}: ukjent klasse «${k}» på <${t.navn}>`);
  }
  if (stabel.length) feil.push(`${hvor}: ${stabel.length} tagg(er) er aldri lukket: ${stabel.map((n) => "<" + n + ">").join(" ")}`);
}

/* Bokser som mangler overskriften sin, vises uten tittel og ser ødelagte ut. */
function sjekkBokser(html, hvor, feil) {
  for (const m of html.matchAll(/<div class="callout([^"]*)">\s*(<span class="h">)?/g)) {
    const typer = m[1].trim().split(/\s+/).filter(Boolean);
    if (!typer.some((t) => ["mech", "tip", "warn", "link", "mistake"].includes(t))) feil.push(`${hvor}: callout uten type`);
    if (!m[2]) feil.push(`${hvor}: callout «${typer.join(" ")}» må starte med <span class="h">`);
  }
  for (const m of html.matchAll(/<div class="worked">\s*(<span class="wh">)?/g)) if (!m[1]) feil.push(`${hvor}: .worked må starte med <span class="wh">`);
  for (const m of html.matchAll(/<div class="formula">([\s\S]*?)<\/div>\s*<\/div>/g))
    if (!/class="(eq|where)"/.test(m[1])) feil.push(`${hvor}: .formula uten .eq og .where`);
}

/* Samme regel som delOpp() i js/bundle-kapitteloppgaver.js: en ny deloppgave
   starter ved et avsnitt som åpner med fet «(a)», «(b)» … i rekkefølge. */
function deler(html) {
  const bokstaver = [...String(html || "").matchAll(/<p><b>\s*\(([a-i])\)/g)].map((m) => m[1]);
  let neste = "a"; const ut = [];
  for (const b of bokstaver) if (b === neste) { ut.push(b); neste = String.fromCharCode(b.charCodeAt(0) + 1); }
  return ut;
}

const HENVISNING = /\b(as above|see above|previous (question|task|exercise|case)|the case above|same firm as|som over|forrige oppgave)\b/i;
const BOKSTAVREF = /\b(option|alternative|answer|choice)\s*\(?[A-D]\)?(?![a-zA-Z])|\([A-D]\)\s*(is|was)\b/;

function main() {
  const arg = process.argv.slice(2);
  if (!arg.length) { console.log("Bruk: node tools/sjekk-kjerne.js <fag> | <fragment.js> …"); process.exit(1); }
  let filer, fag;
  if (arg[0].endsWith(".js")) {
    filer = arg.map((a) => path.resolve(a));
    const m = /fag\/([^/]+)\//.exec(filer[0]); fag = m ? m[1] : null;
  } else {
    fag = arg[0];
    const bygget = path.join(ROT, "fag", fag, "kjerne.js");
    const mappe = path.join(ROT, "fag", fag, "_kjerne");
    filer = fs.existsSync(bygget) ? [bygget]
      : fs.readdirSync(mappe).filter((f) => /^kj\d+\.js$/.test(f)).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2))).map((f) => path.join(mappe, f));
  }
  const deleneAlle = last(filer);
  const kap = fag ? kapitlerFor(fag) : null;
  const planFil = fag ? path.join(ROT, "fag", fag, "_kjerne", "fasitplan.json") : null;
  const plan = planFil && fs.existsSync(planFil) ? JSON.parse(fs.readFileSync(planFil, "utf8")) : null;

  const feil = [], advarsel = [];
  const ider = new Set();
  const nyId = (id, hvor) => { if (ider.has(id)) feil.push(`${hvor}: id «${id}» er brukt før`); ider.add(id); };
  const pos = [0, 0, 0, 0];
  const notat = [];
  let lengst = 0;
  let sumOrd = 0, sumMin = 0, sumSjekk = 0, sumPoeng = 0;
  const rader = [];

  deleneAlle.forEach((d, i) => {
    const hvor = d && d.id ? d.id : `del ${i}`;
    if (!d || typeof d !== "object") { feil.push(`${hvor}: ikke et objekt`); return; }
    if (!/^kj\d+$/.test(d.id || "")) feil.push(`${hvor}: id må være kjN`);
    if (d.num !== +String(d.id).slice(2)) feil.push(`${hvor}: num (${d.num}) stemmer ikke med id`);
    nyId(d.id, hvor);
    if (!d.title) feil.push(`${hvor}: mangler title`);
    if (!Array.isArray(d.chapters) || !d.chapters.length) feil.push(`${hvor}: chapters må være en ikke-tom liste`);
    else if (kap) d.chapters.forEach((c) => { if (!kap.has(c)) feil.push(`${hvor}: kapittel ${c} finnes ikke i manualen`); });

    const html = String(d.html || "");
    if (!html.trim()) feil.push(`${hvor}: html er tom`);
    sjekkHtml(html, hvor + ".html", feil, advarsel);
    sjekkBokser(html, hvor + ".html", feil);
    if (/<h[12][ >]/.test(html)) feil.push(`${hvor}: h1/h2 hører ikke hjemme i en del; bruk <h3>`);
    const husk = (html.match(/class="callout tip husk"/g) || []).length;
    if (d.num > 0 && husk !== 1) feil.push(`${hvor}: må ha nøyaktig én «Must know»-boks (<div class="callout tip husk">), fant ${husk}`);
    if (kap) for (const m of html.matchAll(/\bk(\d{1,2})\b/g)) if (!kap.has(+m[1])) feil.push(`${hvor}: henvisning til k${m[1]}, som ikke finnes`);
    for (const m of html.matchAll(/\bkj(\d{1,2})\b/g)) if (!deleneAlle.some((x) => x && x.num === +m[1])) advarsel.push(`${hvor}: henvisning til kj${m[1]}, som ikke finnes (ennå)`);
    const tankestrek = (ren(html).match(/ — /g) || []).length;
    if (tankestrek > 2) advarsel.push(`${hvor}: ${tankestrek} tankestreker som bindeledd; spek §1 ber om komma, kolon eller ny setning`);
    const w = ord(html);

    const sjekker = d.checks || [];
    sjekker.forEach((q, j) => {
      const h = `${hvor}.checks[${j}]`;
      if (q.id !== `${d.id}-s${j + 1}`) feil.push(`${h}: id skal være ${d.id}-s${j + 1}, er «${q.id}»`);
      nyId(q.id, h);
      if (!q.q) feil.push(`${h}: mangler q`);
      if (!Array.isArray(q.options) || q.options.length !== 4) feil.push(`${h}: må ha nøyaktig fire alternativer`);
      else {
        if (new Set(q.options.map((o) => ren(o))).size !== 4) feil.push(`${h}: to alternativer er like`);
        q.options.forEach((o, k) => sjekkHtml(String(o), `${h}.options[${k}]`, feil, advarsel, { inline: true }));
      }
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) feil.push(`${h}: answer må være 0–3`);
      else {
        pos[q.answer]++;
        if (Array.isArray(q.options) && q.options.length === 4) {
          const l = q.options.map((o) => ren(o).length);
          const andre = Math.max(...l.filter((_, k) => k !== q.answer));
          if (l[q.answer] >= andre) lengst++;
          if (l[q.answer] > 1.3 * andre) advarsel.push(`${h}: fasiten er ${(l[q.answer] / andre).toFixed(2)} ganger så lang som det lengste gale alternativet`);
        }
      }
      if (!q.explanation) feil.push(`${h}: mangler explanation`);
      sjekkHtml(String(q.q || ""), h + ".q", feil, advarsel, { inline: true });
      sjekkHtml(String(q.explanation || ""), h + ".explanation", feil, advarsel, { inline: true });
      if (BOKSTAVREF.test(ren(q.explanation))) feil.push(`${h}: forklaringen viser til et alternativ med bokstav; vis til innholdet (fallgruve 7c)`);
      if (plan && plan[d.id] && plan[d.id][j] !== undefined && plan[d.id][j] !== q.answer)
        feil.push(`${h}: fasiten står på ${"ABCD"[q.answer]}, planen sier ${"ABCD"[plan[d.id][j]]}`);
    });
    if (plan && plan[d.id] && plan[d.id].length !== sjekker.length) feil.push(`${hvor}: planen har ${plan[d.id].length} sjekker, delen har ${sjekker.length}`);

    const c = d.case;
    let caseMin = 0;
    if (c) {
      const h = `${hvor}.case`;
      if (c.id !== `${d.id}-m1`) feil.push(`${h}: id skal være ${d.id}-m1`);
      nyId(c.id, h);
      if (c.open !== true) feil.push(`${h}: open må være true`);
      if (!Number.isInteger(c.points) || c.points < 3 || c.points > 10) feil.push(`${h}: points må være et heltall 3–10`);
      if (!Number.isInteger(c.minutes) || c.minutes < 3 || c.minutes > 15) feil.push(`${h}: minutes må være et heltall 3–15`);
      caseMin = c.minutes || 0;
      sumPoeng += c.points || 0;
      if (!c.topic) feil.push(`${h}: mangler topic`);
      sjekkHtml(String(c.body || ""), h + ".body", feil, advarsel);
      sjekkHtml(String(c.solution || ""), h + ".solution", feil, advarsel);
      const spm = [...String(c.body || "").matchAll(/\(([a-i])\)/g)].map((m) => m[1]).filter((b, k, a) => a.indexOf(b) === k);
      const løs = deler(c.solution);
      if (løs.length < 2) feil.push(`${h}: løsningen må ha minst to deloppgaver som åpner med <p><b>(a) …`);
      if (spm.join("") !== løs.join("")) feil.push(`${h}: deloppgavene i teksten (${spm.join(",") || "ingen"}) og i løsningen (${løs.join(",") || "ingen"}) stemmer ikke`);
      if (!Array.isArray(c.criteria) || c.criteria.length < 2) feil.push(`${h}: trenger minst to criteria`);
      else c.criteria.forEach((k, n) => { if (/<[a-zA-Z\/]/.test(k)) feil.push(`${h}.criteria[${n}]: kriteriene vises som ren tekst, ingen tagger`); });
      if (HENVISNING.test(ren(c.body))) feil.push(`${h}: viser til en annen oppgave; minicasen vises alene (fallgruve 7v)`);
    } else if (d.num > 0) feil.push(`${hvor}: mangler minicase`);

    const min = Math.round(w / ORD_PER_MIN + sjekker.length * MIN_PER_SJEKK + caseMin);
    sumOrd += w; sumMin += min; sumSjekk += sjekker.length;
    rader.push(`  ${String(d.id).padEnd(5)} ${String(w).padStart(5)} ord · ${sjekker.length} sjekker · minicase ${c ? c.points + " p/" + c.minutes + " min" : "–"} · ~${min} min  ${d.title || ""}`);
  });

  if (sumSjekk >= 12) {
    const maks = Math.max(...pos) / sumSjekk;
    if (maks > 0.35) feil.push(`fasitposisjonene er skjeve: ${pos.join("/")} (fallgruve 7c)`);
    /* Samme felle på en annen akse: er fasiten oftest det lengste alternativet,
       lærer leseren å velge det lengste. Tilfeldig er 25 %. */
    const andel = lengst / sumSjekk;
    if (andel > 0.4) feil.push(`fasiten er det lengste alternativet i ${lengst} av ${sumSjekk} sjekker (${Math.round(andel * 100)} %); hold det under 40 % (fallgruve 7c)`);
    else notat.push(`fasiten er det lengste alternativet i ${lengst} av ${sumSjekk} sjekker (${Math.round(andel * 100)} %)`);
  }

  console.log(rader.join("\n"));
  console.log(`\n  ${deleneAlle.length} deler · ${sumOrd} ord · ${sumSjekk} sjekker (fasit ${pos.join("/")}) · ${sumPoeng} minicasepoeng · ~${Math.floor(sumMin / 60)} t ${sumMin % 60} min`);
  notat.forEach((n) => console.log("  " + n));
  advarsel.forEach((a) => console.log("ADVARSEL  " + a));
  feil.forEach((f) => console.log("FEIL  " + f));
  if (!feil.length) console.log("\nIngen feil.");
  else process.exitCode = 1;
}

main();
