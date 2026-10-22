#!/usr/bin/env node
/* Kontroll av symbolforklaringene.

   Leser tekstene på samme måte som js/bundle-symboler.js gjør i nettleseren, og
   slår hvert symbol opp i fag/<fag>/symboler.js med de egne betydningene først.
   Tre kilder, hver med sin del-id:
   - kjernepensum (fag/<fag>/kjerne.js): bare formellinjene (.formula .eq). Del-id kjN.
   - sjangertreningen (fag/<fag>/sjangre.js): hele teksten i hvert steg. I
     formellinjer merkes alt, i løpende tekst bare det som sikkert er et symbol
     (senket eller hevet skrift, gresk bokstav, forkortelse med store bokstaver, E[,
     eller en enkelt bokstav i et regnestykke). Del-id sg-<sjanger>.
   - formelarket (fag/<fag>/formelark.js): formeldelen av hver rad. Del-id formelark.

   FEIL      et symbol som verken er forklart eller står i `ikke`
   ADVARSEL  en forklaring som ingen tekst bruker

   Bruk:  node tools/sjekk-symboler.js fie402
          node tools/sjekk-symboler.js fie402 --liste        # hva hvert symbol viser
          node tools/sjekk-symboler.js fie402 --bare sg-ma   # én del
          node tools/sjekk-symboler.js fie402 --ekstra utkast.json   # med et utkast flettet inn
*/
const fs = require("fs");
const path = require("path");

const arg = process.argv.slice(2);
const fag = arg[0];
const liste = arg.includes("--liste");
const bare = arg.includes("--bare") ? arg[arg.indexOf("--bare") + 1] : null;
if (!fag) { console.error("Bruk: node tools/sjekk-symboler.js <fag>"); process.exit(2); }
const rot = path.join(__dirname, "..");
global.window = { EDU_DATA: {} };
const last = (f) => { const p = path.join(rot, "fag", fag, f); if (fs.existsSync(p)) { eval(fs.readFileSync(p, "utf8")); return true; } return false; };
if (!last("symboler.js")) { console.error("fant ikke symboler.js"); process.exit(2); }
last("kjerne.js"); last("sjangre.js"); last("formelark.js");
const D = window.EDU_DATA.symboler;
/* --ekstra fil.json: { deler: { <id>: {…} }, ikke: [...] } flettes inn før kontrollen,
   så flere kan teste utkast parallelt uten å skrive i symboler.js samtidig. */
if (arg.includes("--ekstra")) {
  for (const f of arg[arg.indexOf("--ekstra") + 1].split(",")) {
    const x = JSON.parse(fs.readFileSync(path.resolve(f), "utf8"));
    D.deler = D.deler || {};
    for (const [id, egne] of Object.entries(x.deler || {})) D.deler[id] = Object.assign({}, D.deler[id], egne);
    D.ikke = (D.ikke || []).concat(x.ikke || []);
  }
}

/* Samme bokstavklasse og regler som motoren. */
const TOK = /[A-Za-zÆØÅæøåÄÖÜäöüÉé̀-ͯ]+(?:['’][a-zæøå]+)?[*′]?|[Ͱ-Ͽ][̀-ͯ]*[*′]?/g;
const REGNETEGN = /[=×\/+\-−()·≤≥<>^]/;
const GRESK = /^[Ͱ-Ͽ]/;
const tekst = (s) => s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ");

/* HTML til en flat liste av tekst, sub og sup, med om teksten står i en formel. */
function noder(html, formelHele) {
  const ut = [];
  const stabel = [];
  const re = /<(sub|sup)>([\s\S]*?)<\/\1>|<(\/?)([a-zA-Z0-9]+)([^>]*)>|[^<]+/g;
  for (let m; (m = re.exec(html));) {
    if (m[1]) { ut.push({ t: m[1].toUpperCase(), v: tekst(m[2].replace(/<[^>]+>/g, "")).trim() }); continue; }
    if (m[4]) {
      const navn = m[4].toLowerCase();
      if (/^(br|hr|img|wbr)$/.test(navn) || /\/$/.test(m[5])) { ut.push({ t: "TAGG" }); continue; }
      if (m[3]) stabel.pop();
      else {
        const k = (/class="([^"]*)"/.exec(m[5]) || [])[1] || "";
        stabel.push({ formel: /\b(eq|calc|fa-formel)\b/.test(k), hopp: /\b(fa-navn|fa-info-tekst)\b/.test(k) || /^(a|button)$/.test(navn) });
      }
      ut.push({ t: "TAGG" });
      continue;
    }
    if (stabel.some((s) => s.hopp)) continue;
    ut.push({ t: "TEKST", v: tekst(m[0]), formel: formelHele || stabel.some((s) => s.formel) });
  }
  return ut;
}
function kandidater(grunn, hevet, senket, neste) {
  const ut = [];
  if (neste === "[" || neste === "(") ut.push(grunn + neste);
  if (hevet && senket) ut.push(`${grunn}^${hevet}_${senket}`);
  if (senket) ut.push(`${grunn}_${senket}`);
  if (hevet) ut.push(`${grunn}^${hevet}`);
  ut.push(grunn);
  return ut;
}
const har = (o, k) => Object.prototype.hasOwnProperty.call(o || {}, k);
function sikkert(tok, hevet, senket, v, fra, til) {
  /* «P/E» er pris over inntjening: verken aksjekursen eller egenkapitalen alene. */
  if ((tok === "P" && v.slice(til, til + 2) === "/E") || (tok === "E" && v.slice(fra - 2, fra) === "P/")) return false;
  if (hevet || senket || GRESK.test(tok)) return true;
  if (v[til] === "[") return true;
  if (tok.length >= 2) return tok === tok.toUpperCase() && /^[A-Z]+$/.test(tok);
  /* «k7», «E4» og «P1» er henvisninger til kapitler og oppgaver, ikke symboler. */
  if (/^[A-Za-z]$/.test(tok) && /\d/.test(v[til] || "")) return false;
  /* «3a)» og «6b)» er deloppgaver: en bokstav rett etter et siffer. */
  if (/^[a-i]$/.test(tok) && /\d/.test(v[fra - 1] || "")) return false;
  /* «delspørsmål c)» og «oppgave d)»: bokstav etter et ord og rett foran «)». «(b + d)» er fortsatt et symbol. */
  if (/^[a-i]$/.test(tok) && v[til] === ")" && /[A-Za-zæøåÆØÅ] $/.test(v.slice(Math.max(0, fra - 2), fra))) return false;
  /* «(d)» er en deloppgave, ikke gjeldsandelen d. */
  if (/^[a-i]$/.test(tok) && v[fra - 1] === "(" && v[til] === ")") return false;
  let før = fra - 1; while (før >= 0 && v[før] === " ") før--;
  let etter = til; while (etter < v.length && v[etter] === " ") etter++;
  return REGNETEGN.test(v[før] || "") || REGNETEGN.test(v[etter] || "");
}

const ikke = new Set(D.ikke || []);
const brukt = new Set();
const feil = new Map(), advarsel = [], rader = new Map();
let forekomster = 0;

function sjekk(html, delId, formelHele, hvor) {
  if (bare && delId !== bare) return;
  const egne = (D.deler || {})[delId] || {};
  const ns = noder(String(html || ""), formelHele);
  ns.forEach((n, i) => {
    if (n.t !== "TEKST") return;
    TOK.lastIndex = 0;
    for (let t; (t = TOK.exec(n.v));) {
      const slutt = t.index + t[0].length;
      let hevet = "", senket = "";
      if (slutt === n.v.length) {
        for (let j = i + 1; j < ns.length && j <= i + 2; j++) {
          const x = ns[j];
          if (x.t === "SUB" && !senket) senket = x.v;
          else if (x.t === "SUP" && !hevet && /^[A-Za-z*]+$/.test(x.v)) hevet = x.v;
          else break;
        }
      }
      if (!n.formel && !sikkert(t[0], hevet, senket, n.v, t.index, slutt)) continue;
      const vist = t[0] + (hevet ? "^" + hevet : "") + (senket ? "_" + senket : "");
      let treff = null;
      for (const k of kandidater(t[0], hevet, senket, n.v[slutt])) {
        if (har(egne, k)) { treff = { k, kilde: delId, tekst: egne[k] }; brukt.add(delId + ":" + k); break; }
        if (har(D.alle, k)) { treff = { k, kilde: "alle", tekst: D.alle[k] }; brukt.add("alle:" + k); break; }
      }
      /* Vanlige ord i en formel («Payoff», «old») får stå i fred i motoren, så
         de meldes ikke. Det som ser ut som et symbol, skal ha en forklaring. */
      const symbolaktig = t[0].length === 1 || GRESK.test(t[0]) || hevet || senket || /^[A-Z]{2,}$/.test(t[0]);
      if (!treff && !ikke.has(t[0]) && (symbolaktig || delId.startsWith("kj"))) {
        const nøkkel = `${delId}: «${vist}»`;
        if (!feil.has(nøkkel)) feil.set(nøkkel, hvor);
      }
      if (treff) { forekomster++; rader.set(`${delId} ${vist}`, `${treff.kilde}:${treff.k}  ${treff.tekst}`); }
    }
  });
}

/* Kjernepensum: bare formellinjene, som før. */
for (const d of window.EDU_DATA.kjerne || [])
  for (const m of String(d.html || "").matchAll(/<div class="eq">([\s\S]*?)<\/div>/g)) sjekk(m[1], d.id, true, d.id);
/* Sjangertreningen: hele teksten i hvert steg. Alternativene står i knapper og merkes ikke. */
for (const g of window.EDU_DATA.sjangre || [])
  for (const s of g.steps || []) {
    for (const f of ["theory", "example", "q", "solution", "check"]) sjekk(s[f], "sg-" + g.id, false, `${s.id}.${f}`);
    (s.traps || []).forEach((t, k) => { if (t) sjekk(t, "sg-" + g.id, false, `${s.id}.traps[${k}]`); });
  }
/* Formelarket: formeldelen av hver rad, uten navnet og den skjulte forklaringen. */
const ark = (window.EDU_DATA.formelark || {}).html || "";
for (const m of ark.matchAll(/<div class="fa-rad">([\s\S]*?)(?=<div class="fa-rad">|<div class="fa-overskrift">|$)/g)) {
  const rad = m[1].replace(/<div class="fa-info-tekst">[\s\S]*$/, "").replace(/<span class="fa-navn">[\s\S]*?<\/span>/g, "");
  sjekk(rad, "formelark", true, "formelarket");
}
/* Lista under arket («Står ikke på arket») er løpende tekst med formler i. */
sjekk((window.EDU_DATA.formelark || {}).ikkePaaArket || "", "formelark-liste", false, "formelarket, står ikke på arket");

if (!bare) {
  for (const k of Object.keys(D.alle || {})) if (!brukt.has("alle:" + k)) advarsel.push(`alle.${k} brukes ikke`);
  for (const [id, egne] of Object.entries(D.deler || {}))
    for (const k of Object.keys(egne)) if (!brukt.has(id + ":" + k)) advarsel.push(`deler.${id}.${k} brukes ikke i ${id}`);
}

if (liste) for (const [k, v] of [...rader].sort()) console.log(`${k.padEnd(24)} ${v}`);
const unike = new Set([...rader.keys()].map((k) => k.split(" ")[1]));
console.log(`  ${forekomster} symbolforekomster · ${unike.size} ulike symboler forklart`);
advarsel.forEach((a) => console.log("ADVARSEL " + a));
for (const [k, hvor] of feil) console.log(`FEIL ${k} har ingen forklaring (først i ${hvor}; legg den i alle, i deler.${k.split(":")[0]} eller i ikke)`);
console.log(feil.size ? `\n${feil.size} feil.` : "\nIngen feil.");
process.exit(feil.size ? 1 : 0);
