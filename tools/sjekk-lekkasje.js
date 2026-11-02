#!/usr/bin/env node
/* Lekkasjekontroll for kartleggingen. Kartleggingen viser hele delen samtidig,
   så et ledd må ikke oppgi svaret på et annet ledd, verken i casetekst,
   spørsmål eller alternativer. Skriptet tar hvert riktig tallsvar og leter
   etter det samme tallet andre steder i delen.

   Bruk:  node tools/sjekk-lekkasje.js fag/fie402/_kart/del1.js [del2.js …] */
const path = require("path");
const ren = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
const tall = (t) => (ren(t).match(/\d[\d,]*\.?\d*/g) || []).map((x) => x.replace(/,/g, "")).filter((x) => x.replace(/\D/g, "").length >= 3);
let funn = 0;
for (const fil of process.argv.slice(2)) {
  global.window = {};
  require(path.resolve(fil));
  for (const set of Object.values(window.EDU_KART || {})) {
    const steder = [];   // [hvor, tekst]
    for (const ex of set.exercises) {
      steder.push([`${ex.n} (case)`, ex.body]);
      for (const p of ex.parts || []) {
        steder.push([`${ex.n}${p.label} (spørsmål)`, p.body]);
        p.options.forEach((o, i) => { if (i !== p.answer) steder.push([`${ex.n}${p.label} (alternativ ${"ABCD"[i]})`, o]); });
      }
    }
    for (const ex of set.exercises) for (const p of ex.parts || []) {
      const svar = tall(p.options[p.answer]);
      for (const x of svar) for (const [hvor, t] of steder) {
        if (hvor.startsWith(`${ex.n}${p.label} `)) continue;
        if (tall(t).includes(x)) { funn++; console.log(`${set.id} ${ex.n}${p.label}: svaret ${x} står i ${hvor}`); }
      }
    }
  }
}
console.log(funn ? `\n${funn} mulige lekkasjer` : "Ingen lekkasjer funnet.");
