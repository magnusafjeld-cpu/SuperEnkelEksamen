#!/usr/bin/env node
/* Kontroll av symbolforklaringene i kjernepensum.

   Leser formellinjene (.formula .eq) i fag/<fag>/kjerne.js på samme måte som
   js/bundle-symboler.js gjør i nettleseren, og slår hvert symbol opp i
   fag/<fag>/symboler.js med delens egne betydninger først.

   FEIL      en bokstavgruppe i en formel som verken er forklart eller står i `ikke`
   ADVARSEL  en forklaring som ingen formel bruker

   Bruk:  node tools/sjekk-symboler.js fie402
          node tools/sjekk-symboler.js fie402 --liste   # alle symboler og hva de viser
*/
const fs = require("fs");
const path = require("path");

const fag = process.argv[2];
const liste = process.argv.includes("--liste");
if (!fag) { console.error("Bruk: node tools/sjekk-symboler.js <fag>"); process.exit(2); }
const rot = path.join(__dirname, "..");
global.window = { EDU_DATA: {} };
for (const f of ["kjerne.js", "symboler.js"]) {
  const p = path.join(rot, "fag", fag, f);
  if (!fs.existsSync(p)) { console.error(`fant ikke ${p}`); process.exit(2); }
  eval(fs.readFileSync(p, "utf8"));
}
const D = window.EDU_DATA.symboler;
const DELER = window.EDU_DATA.kjerne || [];

/* Samme regler som motoren: bokstavgruppe, så høyst én senket og én hevet
   rett etter, der hevet bare teller når den er bokstaver. */
/* Samme bokstavklasse som motoren: æ, ø og å hører til ordet. */
const TOK = /[A-Za-zÆØÅæøåÄÖÜäöüÉé\u0300-\u036F]+(?:['’][a-zæøå]+)?[*′]?|[\u0370-\u03FF][\u0300-\u036F]*[*′]?/g;
const tekst = (s) => s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ");
function noder(html) {
  const ut = [];
  const re = /<(sub|sup)>([\s\S]*?)<\/\1>|<[^>]+>|[^<]+/g;
  for (let m; (m = re.exec(html));) {
    if (m[1]) ut.push({ t: m[1].toUpperCase(), v: tekst(m[2].replace(/<[^>]+>/g, "")).trim() });
    else if (m[0][0] === "<") ut.push({ t: "TAGG" });
    else ut.push({ t: "TEKST", v: tekst(m[0]) });
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

const ikke = new Set(D.ikke || []);
const brukt = new Set();
const feil = [], advarsel = [], rader = new Map();

for (const d of DELER) {
  const egne = (D.deler || {})[d.id] || {};
  for (const m of String(d.html || "").matchAll(/<div class="eq">([\s\S]*?)<\/div>/g)) {
    const ns = noder(m[1]);
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
        const vist = t[0] + (hevet ? "^" + hevet : "") + (senket ? "_" + senket : "");
        let treff = null;
        for (const k of kandidater(t[0], hevet, senket, n.v[slutt])) {
          if (har(egne, k)) { treff = { k, kilde: d.id, tekst: egne[k] }; brukt.add(d.id + ":" + k); break; }
          if (har(D.alle, k)) { treff = { k, kilde: "alle", tekst: D.alle[k] }; brukt.add("alle:" + k); break; }
        }
        if (!treff && !ikke.has(t[0])) feil.push(`${d.id}: «${vist}» har ingen forklaring (legg den i alle, i deler.${d.id} eller i ikke)`);
        if (treff) rader.set(`${d.id} ${vist}`, `${treff.kilde}:${treff.k}  ${treff.tekst}`);
      }
    });
  }
}
for (const [k] of Object.entries(D.alle || {})) if (!brukt.has("alle:" + k)) advarsel.push(`alle.${k} brukes ikke i noen formel`);
for (const [id, egne] of Object.entries(D.deler || {}))
  for (const k of Object.keys(egne)) if (!brukt.has(id + ":" + k)) advarsel.push(`deler.${id}.${k} brukes ikke i noen formel i ${id}`);

if (liste) for (const [k, v] of rader) console.log(`${k.padEnd(18)} ${v}`);
const unike = new Set([...rader.keys()].map((k) => k.split(" ")[1]));
console.log(`  ${DELER.length} deler · ${rader.size} symbolforekomster per del · ${unike.size} ulike symboler forklart`);
advarsel.forEach((a) => console.log("ADVARSEL " + a));
feil.forEach((f) => console.log("FEIL " + f));
console.log(feil.length ? `\n${feil.length} feil.` : "\nIngen feil.");
process.exit(feil.length ? 1 : 0);
