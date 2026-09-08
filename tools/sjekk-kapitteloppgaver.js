#!/usr/bin/env node
/* Strukturkontroll for kapitteloppgaver (EDU_DATA.chapterTasks).

   Modulen svikter stille på nøyaktig de samme måtene som drillen: en answer
   utenfor rekkevidde gir en oppgave uten riktig svar, en traps-liste i utakt med
   options peker på feil alternativ, og en duplisert id lar to oppgaver dele
   lagringsnøkkel slik at svaret på den ene overskriver den andre.

   Bruk:  node tools/sjekk-kapitteloppgaver.js fie432

   Fallgruve 7c gjelder her mer enn noe annet sted: dette ER eksamensformatet.
   Samler fasiten seg på ett alternativ, lærer leseren posisjonen i stedet for
   faget — og det er den eneste ferdigheten som ikke overføres til eksamen.   */

const fs = require("fs");
const path = require("path");
const ROT = path.join(__dirname, "..");

function fagene() {
  const w = { EDU_SUBJECTS: null };
  global.window = w;
  delete require.cache[require.resolve(path.join(ROT, "js", "subjects.js"))];
  require(path.join(ROT, "js", "subjects.js"));
  return w.EDU_SUBJECTS || [];
}

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

const norm = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
/* Alternativer sammenlignes med bokstavstørrelsen intakt: i «(R − r)/R» mot
   «(R − r)/r» er nettopp den forskjellen mellom før og etter skatt. */
const normAlt = (s) => String(s || "").replace(/\s+/g, " ").trim();

function sjekk(sub) {
  const feil = [], advarsel = [], notat = [];
  const si = (l, hvor, m) => l.push(`${hvor}: ${m}`);
  const D = dataFor(sub);
  const bank = D.chapterTasks || {};
  const kap = kapitlerFor(sub);
  const kjerne = sub.coreChapters;
  if (!Object.keys(bank).length) return null;

  const ider = new Set();
  const tekster = new Map();
  const posisjon = [];
  let sumOppg = 0, sumPoeng = 0;

  for (const nøkkel of Object.keys(bank).sort((a, b) => a - b)) {
    const num = Number(nøkkel);
    const b = bank[nøkkel];
    const hvorK = `k${num}`;
    if (!Number.isInteger(num)) { si(feil, hvorK, "kapittelnøkkelen er ikke et tall"); continue; }
    if (kap && !kap.has(num)) si(feil, hvorK, `kapittel ${num} finnes ikke i manualen`);
    if (kjerne && (num < kjerne.from || num > kjerne.to))
      si(advarsel, hvorK, `ligger utenfor coreChapters (${kjerne.from}–${kjerne.to})`);

    const tasks = b.tasks || [];
    if (!tasks.length) { si(feil, hvorK, "ingen oppgaver"); continue; }
    if (tasks.length < 4) si(advarsel, hvorK, `bare ${tasks.length} oppgaver — et sett bør være minst 4`);
    if (b.wrongFactor != null && (typeof b.wrongFactor !== "number" || b.wrongFactor > 0))
      si(feil, hvorK, `wrongFactor ${b.wrongFactor} må være et tall ≤ 0`);

    tasks.forEach((t, i) => {
      const hvor = `${hvorK} oppgave ${i + 1}${t.id ? " (" + t.id + ")" : ""}`;
      if (!t.id) si(feil, hvor, "mangler id — id-en er lagringsnøkkel for svaret");
      else if (ider.has(t.id)) si(feil, hvor, `duplisert id «${t.id}»`);
      ider.add(t.id);

      if (!t.body || !norm(t.body)) si(feil, hvor, "mangler oppgavetekst");
      else {
        const n = norm(t.body);
        if (tekster.has(n)) si(feil, hvor, `samme oppgavetekst som ${tekster.get(n)}`);
        else tekster.set(n, t.id);
        if (n.length < 40) si(advarsel, hvor, "oppgaveteksten er svært kort for en eksamensoppgave");
      }

      const o = t.options || [];
      /* Eksamen har fire alternativer. Et sett med tre trener feil sannsynlighet:
         blindt gjett er da +0,33 forventet i stedet for 0, og hele
         gjettestrategien kapittel 19 lærer bort, blir feil. */
      if (o.length !== 4) si(feil, hvor, `${o.length} alternativer — eksamen har fire`);
      o.forEach((x, j) => { if (!normAlt(x)) si(feil, hvor, `alternativ ${j + 1} er tomt`); });
      if (new Set(o.map(normAlt)).size !== o.length) si(feil, hvor, "to like alternativer");

      if (!Number.isInteger(t.answer) || t.answer < 0 || t.answer >= o.length)
        si(feil, hvor, `answer ${t.answer} er utenfor 0…${o.length - 1}`);
      else posisjon.push(t.answer);

      if (t.points != null && (typeof t.points !== "number" || t.points <= 0))
        si(feil, hvor, `points ${t.points} må være et positivt tall`);

      if (!t.solution || !norm(t.solution)) si(feil, hvor, "mangler solution");
      else if (norm(t.solution).length < 80) si(advarsel, hvor, "solution er kort — den skal vise hele regnestykket");

      /* traps står parallelt med options. Er den i utakt, peker forklaringen på
         feil bokstav, og leseren lærer at riktig svar er en felle. */
      if (t.traps) {
        if (!Array.isArray(t.traps) || t.traps.length !== o.length)
          si(feil, hvor, `traps har ${(t.traps || []).length} elementer, options har ${o.length}`);
        else {
          if (t.traps[t.answer]) si(feil, hvor, `traps[${t.answer}] er fasitalternativet, men har fellenotat`);
          const tomme = t.traps.map((x, j) => (j !== t.answer && !norm(x)) ? String.fromCharCode(65 + j) : null).filter(Boolean);
          if (tomme.length) si(advarsel, hvor, `mangler fellenotat for ${tomme.join(", ")}`);
        }
      } else si(advarsel, hvor, "ingen traps — halve poenget med flervalg er å se hvilken feil hvert gale alternativ er");

      sumPoeng += t.points || 3;
    });
    sumOppg += tasks.length;
    notat.push(`  k${num}: ${tasks.length} oppgaver · ${tasks.reduce((a, t) => a + (t.points || 3), 0)} poeng`);
  }

  /* Fallgruve 7c — fasitposisjon. */
  const n = posisjon.length;
  if (n >= 20) {
    const tell = [0, 1, 2, 3].map((i) => posisjon.filter((p) => p === i).length);
    const forventet = n / 4;
    const verst = Math.max(...tell.map((t) => Math.abs(t - forventet))) / forventet;
    const linje = `fasitposisjon ${tell.join(" / ")} av ${n} (jevnt ville vært ${forventet.toFixed(0)} hver)`;
    if (verst > 0.35) si(feil, "settene", `${linje} — skjevt nok til at posisjonen kan læres i stedet for faget`);
    else if (verst > 0.2) si(advarsel, "settene", linje);
    else notat.unshift(`  ${linje}`);
  }
  notat.unshift(`  ${sumOppg} oppgaver over ${Object.keys(bank).length} kapitler · ${sumPoeng} poeng`);
  return { feil, advarsel, notat };
}

const valgt = process.argv.slice(2);
let feilTotalt = 0;
for (const sub of fagene()) {
  if (valgt.length && !valgt.includes(sub.id)) continue;
  const r = sjekk(sub);
  if (!r) continue;
  console.log(`\n${"=".repeat(72)}\n${sub.id} — ${sub.name}`);
  r.notat.forEach((x) => console.log(x));
  if (r.advarsel.length) {
    console.log(`\n  ${r.advarsel.length} advarsler:`);
    r.advarsel.slice(0, 20).forEach((a) => console.log("    ~ " + a));
    if (r.advarsel.length > 20) console.log(`    … og ${r.advarsel.length - 20} til`);
  }
  if (r.feil.length) {
    console.log(`\n  ${r.feil.length} feil:`);
    r.feil.slice(0, 25).forEach((f) => console.log("    ✗ " + f));
    if (r.feil.length > 25) console.log(`    … og ${r.feil.length - 25} til`);
    feilTotalt += r.feil.length;
  } else console.log("\n  Ingen feil.");
}
process.exit(feilTotalt ? 1 : 0);
