#!/usr/bin/env node
/* Kontroll av forelesningsgjennomgangene (fag/<id>/_forelesninger/fN.js).

   Bruk:  node tools/sjekk-forelesninger.js fie459          alle fragmentene
          node tools/sjekk-forelesninger.js fie459 4 5 6    bare disse

   FEIL stopper (exit 1). ADVARSEL bør leses, men kan være i orden.
   Sjekker struktur, fasitbalanse (fallgruve 7c og 7y), feller som røper svaret
   (fallgruve 12), bokstavhenvisninger (alternativene stokkes) og skrivereglene:
   ingen tankestrek og ingen komma før «and»/«og» (tagger fjernes uten mellomrom,
   fallgruve 7å). */
const fs = require("fs"), path = require("path");
const [fag, ...nrArg] = process.argv.slice(2);
if (!fag) { console.error("Bruk: node tools/sjekk-forelesninger.js <fag> [nr ...]"); process.exit(2); }
const mappe = path.join(__dirname, "..", "fag", fag, "_forelesninger");
let filer = fs.readdirSync(mappe).filter((f) => /^f\d+\.js$/.test(f)).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
if (nrArg.length) filer = filer.filter((f) => nrArg.includes(String(parseInt(f.slice(1)))));

global.window = { EDU_DATA: { forelesninger: [] } };
const feil = [], adv = [];
const F = (h, m) => feil.push(`FEIL  ${h}: ${m}`);
const A = (h, m) => adv.push(`ADV   ${h}: ${m}`);
for (const f of filer) {
  const før = window.EDU_DATA.forelesninger.length;
  try { eval(fs.readFileSync(path.join(mappe, f), "utf8")); }
  catch (e) { F(f, "lar seg ikke kjøre: " + e.message); continue; }
  const ny = window.EDU_DATA.forelesninger.length - før;
  if (ny !== 1) F(f, `skal legge til nøyaktig én forelesning, la til ${ny}`);
  const l = window.EDU_DATA.forelesninger[window.EDU_DATA.forelesninger.length - 1];
  if (l && String(l.nr) !== String(parseInt(f.slice(1)))) F(f, `nr ${l.nr} stemmer ikke med filnavnet`);
}
const ALLE = window.EDU_DATA.forelesninger;

const ren = (h) => String(h == null ? "" : h).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const ord = (h) => ren(h).split(" ").filter(Boolean).length;
const TYPER = ["krok", "ide", "felle", "gjett", "sant", "sorter", "avdekk"];
const LESING = { krok: 1, ide: 1, felle: 1 };
const OPPG = { gjett: 1, sant: 1, sorter: 1 };
const ider = new Set();
let lengst = 0, kortest = 0, antGjett = 0;

function tekster(s) {
  const t = [s.tittel, s.tekst, s.husk, s.sporsmal, s.pastand, s.forklaring];
  (s.alternativer || []).forEach((x) => t.push(x));
  (s.feil || []).forEach((x) => t.push(x));
  (s.grupper || []).forEach((x) => t.push(x));
  (s.kort || []).forEach((k) => t.push(k.t));
  (s.rader || []).forEach((r) => { t.push(r.t); t.push(r.d); });
  return t.filter((x) => x != null);
}
function språk(h, tekst) {
  const r = ren(tekst);
  if (/[—–]/.test(r)) F(h, `tankestrek: «${r.slice(Math.max(0, r.search(/[—–]/) - 30), r.search(/[—–]/) + 20)}»`);
  const m = r.match(/.{0,30}, (and|og) .{0,15}/);
  if (m) F(h, `komma før and/og: «${m[0]}»`);
}

for (const l of ALLE) {
  const H = `F${l.nr}`;
  ["nr", "tittel", "minutter", "krok"].forEach((k) => { if (l[k] == null || l[k] === "") F(H, `mangler ${k}`); });
  if (l.kapittel == null) A(H, "mangler kapittel (ingen «Les kapitlet»-knapp)");
  [l.tittel, l.krok].forEach((t) => språk(H, t));
  const steg = l.steg || [];
  if (steg.length < 14 || steg.length > 26) A(H, `${steg.length} steg (mål 16–22)`);
  if (!steg.length || steg[0].type !== "krok") F(H, "første steg skal være en krok");
  const kunne = l.kunne || [];
  if (kunne.length < 4 || kunne.length > 8) F(H, `kunne har ${kunne.length} punkter (4–8)`);
  kunne.forEach((k) => språk(H + " kunne", k));
  let lesRad = 0, oppg = 0, sant = 0, sanne = 0, totOrd = 0;
  steg.forEach((s, k) => {
    const h = `${H} steg ${k + 1} (${s.id || "uten id"})`;
    if (!s.id) F(h, "mangler id");
    else if (ider.has(s.id)) F(h, "id brukt før");
    else ider.add(s.id);
    if (s.id && !new RegExp(`^f${l.nr}-[a-z0-9-]+$`).test(s.id)) F(h, `id skal ha formen f${l.nr}-…`);
    if (TYPER.indexOf(s.type) < 0) { F(h, `ukjent type «${s.type}»`); return; }
    tekster(s).forEach((t) => språk(h, t));
    /* Lesetiden teller det studenten faktisk ser: alt unntatt feil-tekstene,
       der bare én (den for alternativet du valgte) vises, og bare ved galt svar. */
    const sett = tekster(Object.assign({}, s, { feil: null }));
    const fl = (s.feil || []).filter(Boolean);
    totOrd += sett.reduce((a, t) => a + ord(t), 0) + (fl.length ? fl.reduce((a, t) => a + ord(t), 0) / fl.length / 2 : 0);
    lesRad = LESING[s.type] ? lesRad + 1 : 0;
    if (lesRad === 3) A(h, "tre lesesteg på rad uten noe å gjøre");
    if (OPPG[s.type] || s.type === "avdekk") oppg++;
    if (LESING[s.type]) {
      if (!s.tittel) F(h, "mangler tittel");
      if (!s.tekst) F(h, "mangler tekst");
      if (ord(s.tekst) > 110) A(h, `${ord(s.tekst)} ord i teksten (maks rundt 90)`);
    }
    if (s.type === "gjett") {
      const alt = s.alternativer || [];
      if (alt.length < 3 || alt.length > 4) F(h, `${alt.length} alternativer (3–4)`);
      if (!Number.isInteger(s.svar) || s.svar < 0 || s.svar >= alt.length) F(h, "svar er ikke en gyldig indeks");
      if (!s.sporsmal) F(h, "mangler sporsmal");
      if (!s.forklaring) F(h, "mangler forklaring");
      if (new Set(alt.map(ren)).size !== alt.length) F(h, "to like alternativer");
      alt.forEach((a) => { if (/\b(all|none|both) of the (above|these)\b/i.test(ren(a))) F(h, `«${ren(a)}»: alternativene stokkes, ingen «all/none of the above»`); });
      if (s.feil) {
        if (s.feil.length !== alt.length) F(h, "feil må stå parallelt med alternativene");
        else if (s.feil[s.svar] != null) F(h, "feil skal være null på fasiten");
        const fasit = ren(alt[s.svar] || "").toLowerCase();
        s.feil.forEach((x, i) => { if (x && fasit.length > 14 && ren(x).toLowerCase().includes(fasit)) F(h, `fella for alternativ ${i + 1} siterer fasiten`); });
      } else A(h, "ingen feil-tekster (én setning per galt alternativ anbefales)");
      [s.forklaring].concat(s.feil || []).forEach((x) => {
        const r = ren(x);
        if (/\b(option|alternative|answer|choice|svar)\s+[A-D1-4]\b/i.test(r) || /\b(first|second|third|fourth|last) (option|answer|alternative)\b/i.test(r)) F(h, `viser til en plass: «${r.slice(0, 80)}» (alternativene stokkes)`);
      });
      if (alt.length && Number.isInteger(s.svar)) {
        antGjett++;
        const len = alt.map((a) => ren(a).length), f = len[s.svar];
        const andre = len.filter((_, i) => i !== s.svar);
        if (f > Math.max(...andre)) lengst++;
        if (f < Math.min(...andre)) kortest++;
        if (f > 1.3 * Math.max(...andre) && f - Math.max(...andre) > 12) A(h, `fasiten er ${f} tegn, lengste gale ${Math.max(...andre)}`);
      }
    }
    if (s.type === "sant") {
      sant++;
      if (typeof s.svar !== "boolean") F(h, "svar skal være true eller false");
      if (s.svar === true) sanne++;
      if (!s.pastand) F(h, "mangler pastand");
      if (!s.forklaring) F(h, "mangler forklaring");
      if (/^\s*(true or false)/i.test(ren(s.pastand))) A(h, "påstanden trenger ikke «True or false?», knappene sier det");
    }
    if (s.type === "sorter") {
      const g = s.grupper || [], kort = s.kort || [];
      if (g.length < 2 || g.length > 3) F(h, `${g.length} grupper (2–3)`);
      if (kort.length < 4 || kort.length > 8) F(h, `${kort.length} kort (4–8)`);
      kort.forEach((c, i) => { if (!Number.isInteger(c.g) || c.g < 0 || c.g >= g.length) F(h, `kort ${i + 1} har ugyldig gruppe`); });
      g.forEach((_, gi) => { if (!kort.some((c) => c.g === gi)) F(h, `gruppen «${g[gi]}» får ingen kort`); });
      if (!s.forklaring) F(h, "mangler forklaring");
      if (!s.tittel) F(h, "mangler tittel");
    }
    if (s.type === "avdekk") {
      const r = s.rader || [];
      if (r.length < 3 || r.length > 7) F(h, `${r.length} rader (3–7)`);
      r.forEach((x, i) => { if (!x.t || !x.d) F(h, `rad ${i + 1} mangler t eller d`); });
      if (!s.tittel) F(h, "mangler tittel");
    }
  });
  if (oppg < 8) A(H, `bare ${oppg} steg med noe å gjøre (mål minst 9)`);
  if (sant && (sanne / sant < 0.3 || sanne / sant > 0.7)) A(H, `${sanne} av ${sant} sant/usant er sanne (sikt mot halvparten)`);
  /* 170 ord i minuttet for engelsk fagtekst, og 20 sekunder å tenke per oppgave. */
  totOrd = Math.round(totOrd);
  const min = Math.round(totOrd / 170 + oppg * 0.33);
  if (Math.abs((l.minutter || 0) - min) > 2) A(H, `minutter er ${l.minutter}, anslaget er ${min}`);
  console.log(`F${l.nr}  ${steg.length} steg, ${oppg} med noe å gjøre, ${totOrd} ord, rundt ${min} min (oppgitt ${l.minutter}). Sant/usant: ${sanne} sanne av ${sant}.`);
}
if (antGjett >= 8) {
  const a = lengst / antGjett;
  const linje = `fasiten er lengst i ${lengst} av ${antGjett} gjett (${Math.round(100 * a)} %), kortest i ${kortest}`;
  if (a > 0.4) F("Alle", linje + ". Mål rundt én av fire (fallgruve 7y).");
  else if (a < 0.1) F("Alle", linje + ". For lite: da lærer leseren å stryke det lengste.");
  else console.log("Fasitlengde: " + linje + ".");
}
adv.forEach((x) => console.log(x));
feil.forEach((x) => console.log(x));
console.log(`\n${ALLE.length} forelesninger, ${feil.length} feil, ${adv.length} advarsler.`);
process.exit(feil.length ? 1 : 0);
