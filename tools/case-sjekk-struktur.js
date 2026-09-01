/* Validerer struktureringsbanken. Kjør: node tools/case-sjekk-struktur.js [ekstra-filer…]
   Sjekker det appen faktisk er avhengig av — særlig at rotnoden blir brukbar og
   at grenene har «Etikett: forklaring»-formen treet tegnes av. */
const fs = require("fs");
const TYPER = ["Lønnsomhet", "Markedsinngang", "M&A", "Prising", "Vekst", "Operations", "Estimering", "Offentlig"];

global.window = {};
const filer = ["fag/case/lyn-struktur.js", ...process.argv.slice(2)];
filer.forEach((f) => eval(fs.readFileSync(f, "utf8")));

const D = window.EDU_DATA;
const alle = [...(D.lyn.struktur || []), ...Object.keys(D).filter((k) => /^_str/.test(k)).flatMap((k) => D[k])];

const delGren = (g) => /^([^:—]{6,52})(?::|\s—\s)\s*([\s\S]+)$/.test(g);
const rotAv = (p) => {
  const s = String(p || "").trim().split(/(?<=[.!?])\s+/).filter(Boolean);
  if (!s.length) return "";
  const siste = s[s.length - 1];
  return (siste.length < 25 && s.length > 1) ? s[s.length - 2] + " " + siste : siste;
};

let feil = [], advarsel = [], grener = 0, medForm = 0;
const sett = new Set();

alle.forEach((x, i) => {
  const id = `#${i} «${String(x.prompt || "").slice(0, 42)}…»`;
  if (!x.prompt || x.prompt.length < 90) feil.push(`${id}: prompt for kort`);
  if (!TYPER.includes(x.type)) feil.push(`${id}: ukjent type «${x.type}»`);
  if (!x.grener || x.grener.length < 5 || x.grener.length > 8) feil.push(`${id}: ${(x.grener || []).length} grener`);
  if (!x.hypotese || x.hypotese.length < 60) feil.push(`${id}: tynn hypotese`);
  if (!x.felle || x.felle.length < 40) feil.push(`${id}: tynn felle`);
  if (![90, 120].includes(x.sek)) feil.push(`${id}: sek=${x.sek}`);

  const tekst = [x.prompt, x.hypotese, x.felle, ...(x.grener || [])].join(" ");
  if (/<[a-zA-Z\/]/.test(tekst) || /&[a-z]+;/.test(tekst)) feil.push(`${id}: HTML i teksten`);

  const rot = rotAv(x.prompt);
  if (rot.length < 30) advarsel.push(`${id}: rotnoden blir «${rot}» — for kort til å stå alene`);
  if (rot.length > 110) advarsel.push(`${id}: rotnoden blir ${rot.length} tegn — for lang for en node`);

  (x.grener || []).forEach((g) => { grener++; if (delGren(g)) medForm++; });

  const n = String(x.prompt).slice(0, 60).toLowerCase();
  if (sett.has(n)) feil.push(`${id}: duplikat prompt`);
  sett.add(n);
});

const perType = alle.reduce((a, x) => ((a[x.type] = (a[x.type] || 0) + 1), a), {});
console.log(`prompter: ${alle.length}`);
console.log("fordeling: " + TYPER.map((t) => `${t} ${perType[t] || 0}`).join(" · "));
console.log(`grener: ${grener} · med «Etikett: forklaring»: ${medForm} (${Math.round(medForm / grener * 100)} %)`);
console.log(`\nfeil: ${feil.length || "ingen"}`);
feil.slice(0, 12).forEach((f) => console.log("  ⚠ " + f));
console.log(`advarsler: ${advarsel.length || "ingen"}`);
advarsel.slice(0, 8).forEach((f) => console.log("  · " + f));
process.exit(feil.length ? 1 : 0);
