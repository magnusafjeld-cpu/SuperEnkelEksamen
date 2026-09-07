#!/usr/bin/env node
/* Strukturkontroll for quiz og dybdetrening.

   Begge modulene svikter stille. En quiz med feil `ch` havner utenfor
   kapittelfiltrene, en `explanation` med markup viser taggene som tekst, og et
   dybdespørsmål med `n` utenfor bankens nivåer forsvinner fra visningen mens
   knappen fortsatt teller det med. Denne kontrollen ser etter nøyaktig det.

   Bruk:  node tools/sjekk-drill.js fie432
          node tools/sjekk-drill.js            # alle fag i js/subjects.js

   To feller er dokumentert i hjernen og sjekkes særskilt:

   7c  Fasitposisjon. Da FIE402s drill ble skrevet av parallelle agenter, endte
       161 av 246 riktige svar på indeks 1. Leseren lærer da posisjonen, ikke
       faget. Fordelingen rapporteres alltid, og skjevhet over terskelen er feil.

   7g  I dybdebankene er `n` NIVÅET (1–4), ikke et løpenummer. Bruker man det
       som løpenummer, filtrerer visningen bort alt over 4 — mens knappen viser
       riktig antall, siden den teller items.length direkte.                    */

const fs = require("fs");
const path = require("path");

const ROT = path.join(__dirname, "..");

/* ---------- fagregisteret ---------- */
function fagene() {
  const w = { EDU_SUBJECTS: null };
  global.window = w;
  delete require.cache[require.resolve(path.join(ROT, "js", "subjects.js"))];
  require(path.join(ROT, "js", "subjects.js"));
  return w.EDU_SUBJECTS || [];
}

/* ---------- kapitlene i manualen ---------- */
function kapitlerFor(sub) {
  for (const kand of ((sub.manual || {}).candidates || [])) {
    const p = path.join(ROT, kand);
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, "utf8");
      return new Set([...html.matchAll(/<section id="k(\d+)"/g)].map((m) => +m[1]));
    }
  }
  return null;
}

/* ---------- fagets data ---------- */
function dataFor(sub) {
  const w = { EDU_DATA: {}, EDU_SUBJECT: sub };
  global.window = w;
  for (const s of sub.scripts || []) {
    const p = path.join(ROT, s);
    if (!fs.existsSync(p)) continue;
    delete require.cache[require.resolve(p)];
    require(p);
  }
  return w.EDU_DATA;
}

const HTML = /<\/?[a-zA-Z][^>]*>/;
const norm = (s) => String(s || "").replace(/\s+/g, " ").trim().toLowerCase();
/* Alternativer sammenlignes med store og små bokstaver intakt: i «(R − r)/R» mot
   «(R − r)/r» er nettopp bokstavstørrelsen forskjellen mellom før og etter skatt.
   Senkes de, ser de to ut som duplikater. */
const normAlt = (s) => String(s || "").replace(/\s+/g, " ").trim();

function sjekkFag(sub) {
  const feil = [], advarsel = [], notat = [];
  const si = (l, hvor, m) => l.push(`${hvor}: ${m}`);
  const D = dataFor(sub);
  const kap = kapitlerFor(sub);
  const kjerne = sub.coreChapters;

  /* ================= QUIZ ================= */
  const quiz = D.quizzes || [];
  if (quiz.length) {
    const ids = new Set();
    const tekster = new Map();
    const perKap = new Map();
    const posisjon = [];

    for (const q of quiz) {
      const hvor = `quiz ${q.id || "(uten id)"}`;
      if (!q.id) si(feil, "quiz", "et spørsmål mangler id — id-en er lagringsnøkkel for fremdrift");
      else if (ids.has(q.id)) si(feil, hvor, "duplisert id");
      ids.add(q.id);

      if (typeof q.ch !== "number") si(feil, hvor, "mangler ch");
      else {
        perKap.set(q.ch, (perKap.get(q.ch) || 0) + 1);
        if (kap && !kap.has(q.ch)) si(feil, hvor, `ch ${q.ch} finnes ikke i manualen`);
      }
      if (q.oppg == null) si(advarsel, hvor, "mangler oppg");
      if (!q.q) si(feil, hvor, "mangler spørsmålstekst");
      else {
        if (HTML.test(q.q)) si(feil, hvor, "spørsmålsteksten inneholder markup — feltet escapes");
        const n = norm(q.q);
        if (tekster.has(n)) si(feil, hvor, `samme spørsmål som ${tekster.get(n)}`);
        else tekster.set(n, q.id);
      }

      if (q.type === "mcq") {
        const o = q.options || [];
        if (o.length < 3) si(feil, hvor, `bare ${o.length} alternativer`);
        o.forEach((t, i) => {
          if (!String(t || "").trim()) si(feil, hvor, `alternativ ${i + 1} er tomt`);
          if (HTML.test(t)) si(feil, hvor, `alternativ ${i + 1} inneholder markup`);
        });
        if (new Set(o.map(normAlt)).size !== o.length) si(feil, hvor, "to like alternativer");
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= o.length)
          si(feil, hvor, `answer ${q.answer} er utenfor 0…${o.length - 1}`);
        else posisjon.push(q.answer);
        if (!q.explanation) si(feil, hvor, "mangler explanation");
        else if (HTML.test(q.explanation)) si(feil, hvor, "explanation inneholder markup — feltet escapes");
      } else if (q.type === "short") {
        /* runScreen krasjer uten model. */
        if (!Array.isArray(q.model) || !q.model.length)
          si(feil, hvor, "type «short» krever model:[…] — visningen krasjer uten");
        else (q.model || []).forEach((m, i) => {
          if (HTML.test(m)) si(feil, hvor, `model ${i + 1} inneholder markup`);
        });
      } else si(feil, hvor, `ukjent type «${q.type}»`);
    }

    /* Fallgruve 7c — fasitposisjon. */
    const n = posisjon.length;
    if (n >= 20) {
      const maks = Math.max(...posisjon) + 1;
      const tell = Array.from({ length: maks }, (_, i) => posisjon.filter((p) => p === i).length);
      const forventet = n / maks;
      const verst = Math.max(...tell.map((t) => Math.abs(t - forventet))) / forventet;
      const linje = `fasitposisjon ${tell.join(" / ")} av ${n} (jevnt ville vært ${forventet.toFixed(0)} hver)`;
      if (verst > 0.35) si(feil, "quiz", `${linje} — skjevt nok til at posisjonen kan læres i stedet for faget`);
      else if (verst > 0.2) si(advarsel, "quiz", linje);
      else notat.push(`  ${linje}`);
    }

    if (kjerne && kap) {
      const tynne = [];
      for (let c = kjerne.from; c <= kjerne.to; c++) {
        if (!kap.has(c)) continue;
        const a = perKap.get(c) || 0;
        if (a === 0) si(feil, "quiz", `kapittel k${c} har ingen spørsmål`);
        else if (a < 3) tynne.push(`k${c} (${a})`);
      }
      if (tynne.length) si(advarsel, "quiz", `under tre spørsmål: ${tynne.join(", ")}`);
    }
    notat.push(`  quiz: ${quiz.length} spørsmål · ${quiz.filter((q) => q.type === "mcq").length} flervalg`
      + ` / ${quiz.filter((q) => q.type === "short").length} kortsvar · ${perKap.size} kapitler dekket`);
  }

  /* ================= DYBDETRENING ================= */
  const dybde = D.dybde || {};
  const banker = sub.dybdeBanks || [];
  if (Object.keys(dybde).length || banker.length) {
    const erklært = new Set(banker.map((b) => b.key));
    for (const b of erklært) if (!dybde[b]) si(feil, "dybde", `manifestet erklærer banken «${b}», men den har ingen data — knappen blir tom`);
    /* Uten dybdeBanks i manifestet bruker motoren sine egne SAM3-defaulter, og da
       er det riktig at bankene ikke står i manifestet. Bare et fag som HAR erklært
       banker kan ha en bank som faller utenfor. */
    if (banker.length)
      for (const b of Object.keys(dybde)) if (!erklært.has(b)) si(advarsel, "dybde", `banken «${b}» finnes i dataene, men ikke i manifestets dybdeBanks — den vises ikke`);

    for (const [nøkkel, bank] of Object.entries(dybde)) {
      const nivåer = new Set(Object.keys(bank.lvl || {}).map(Number));
      const cats = new Set(bank.cats || []);
      if (!nivåer.size) si(feil, `dybde/${nøkkel}`, "mangler lvl");
      if (!cats.size) si(feil, `dybde/${nøkkel}`, "mangler cats");

      const ids = new Set();
      const perNivå = new Map(), perCat = new Map();
      for (const q of bank.items || []) {
        const hvor = `dybde/${nøkkel} id ${q.id}`;
        if (q.id == null) si(feil, `dybde/${nøkkel}`, "et spørsmål mangler id");
        else if (ids.has(q.id)) si(feil, hvor, "duplisert id innenfor banken");
        ids.add(q.id);

        /* Fallgruve 7g: n er nivået, ikke et løpenummer. */
        if (!nivåer.has(q.n))
          si(feil, hvor, `n = ${q.n} finnes ikke i bankens lvl (${[...nivåer].join(",")}) — spørsmålet filtreres bort, men telles på knappen`);
        else perNivå.set(q.n, (perNivå.get(q.n) || 0) + 1);

        if (!cats.has(q.k)) si(feil, hvor, `k «${q.k}» finnes ikke i bankens cats`);
        else perCat.set(q.k, (perCat.get(q.k) || 0) + 1);

        if (!q.s) si(feil, hvor, "mangler spørsmål (s)");
        else if (HTML.test(q.s)) si(feil, hvor, "s inneholder markup — feltet escapes");
        if (!q.f) si(feil, hvor, "mangler fasit (f)");
      }
      const tommeCats = [...cats].filter((c) => !perCat.has(c));
      if (tommeCats.length) si(advarsel, `dybde/${nøkkel}`, `kategorier uten spørsmål: ${tommeCats.join(", ")}`);
      const tommeNivå = [...nivåer].filter((n) => !perNivå.has(n));
      if (tommeNivå.length) si(advarsel, `dybde/${nøkkel}`, `nivåer uten spørsmål: ${tommeNivå.join(", ")}`);
      notat.push(`  dybde/${nøkkel}: ${(bank.items || []).length} spørsmål · nivå `
        + [...nivåer].sort().map((n) => `${n}:${perNivå.get(n) || 0}`).join(" ") + ` · ${perCat.size}/${cats.size} kategorier`);
    }
  }

  return { feil, advarsel, notat };
}

/* ---------- rapport ---------- */
const valgt = process.argv.slice(2);
let feilTotalt = 0;
for (const sub of fagene()) {
  if (valgt.length && !valgt.includes(sub.id)) continue;
  const { feil, advarsel, notat } = sjekkFag(sub);
  if (!notat.length && !feil.length) continue;
  console.log(`\n${"=".repeat(72)}\n${sub.id} — ${sub.name}`);
  notat.forEach((n) => console.log(n));
  if (advarsel.length) {
    console.log(`\n  ${advarsel.length} advarsler:`);
    advarsel.slice(0, 20).forEach((a) => console.log("    ~ " + a));
    if (advarsel.length > 20) console.log(`    … og ${advarsel.length - 20} til`);
  }
  if (feil.length) {
    console.log(`\n  ${feil.length} feil:`);
    feil.slice(0, 25).forEach((f) => console.log("    ✗ " + f));
    if (feil.length > 25) console.log(`    … og ${feil.length - 25} til`);
    feilTotalt += feil.length;
  } else console.log("\n  Ingen feil.");
}
process.exit(feilTotalt ? 1 : 0);
