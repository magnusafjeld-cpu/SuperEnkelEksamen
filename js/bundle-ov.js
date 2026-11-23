/* ===================== ØV UTEN STOPP: repetisjon med nye tall =====================
   Én oppgave om gangen, uten oppsett. Hver deloppgave er et kort i en repetisjon
   med økende intervaller, som Anki. Når et kort kommer tilbake, får du en ny
   variant med nye tall, så det er metoden som må sitte, ikke svaret.

   Planleggeren er FSRS-5 (samme modell som Anki bruker i dag) med standardvektene
   og 90 % ønsket hukommelse. Hvert kort har stabilitet S (dager til hukommelsen er
   90 %) og vanskelighet D (1–10). Vurderingen etter svaret styrer neste intervall:

     Misforståelse  (G = 1)  en lignende oppgave med nye tall med en gang, så igjen
                             om ti minutter, så i morgen. Kortet læres på nytt.
     Slurvefeil     (G = 2)  ingen nullstilling, men kortet kommer én gang til i
                             samme økt (om ti minutter)
     Usikker        (G = 2)  riktig, men kortet kommer raskere tilbake
     Greit          (G = 3)  riktig
     Lett           (G = 4)  riktig og lett, lengre intervall

   Ingen intervaller går forbi eksamensdagen (EDU_DATA.ov.eksamen): alt kommer
   minst én gang til før eksamen. Dagen skifter klokka fire om natta, som i Anki.

   Rekkefølgen på neste oppgave:
     1. «lik oppgave»: kortet du nettopp misforsto, med en ny variant
     2. kort under læring som har forfalt (minst to andre oppgaver imellom)
     3. repetisjoner som har forfalt, de du mest sannsynlig har glemt først,
        med en ny oppgave hver fjerde gang så lenge det finnes nye
     4. nye kort, vektet med eksamensvekten og hvor svak du er i temaet
     5. tomt: ekstra øving, de kortene du mest sannsynlig har glemt
   Aldri samme oppgave to ganger på rad og helst ikke samme tema tre ganger.

   Kildene (lastes først når modulen åpnes, manifest.lazy["/ov"]):
     EDU_DATA.ov        eksamensoppgaver i varianter (tools/bygg-ov.py). Hver
                        deloppgave er et kort «<oppgave-id>:<etikett>». Vises
                        alene med casen og `gitt` over, eller av og til som hel
                        oppgave med alle deloppgavene.
     EDU_DATA.trening   eksamenstreningens familier, ett kort per familie
                        «tr:<familie>». Regnespørsmål skrives som tall
                        («regn selv»), begrepsspørsmål er flervalg. Typene
                        fakta og formel er under eksamensnivå og tas ikke med.

   Retting: tall automatisk mot toleransen, og et tall som treffer en felle viser
   fella. Tekst med Claude (egen API-nøkkel, S.claude.vurdering) mot modellsvaret
   og kriteriene, eller du vurderer deg selv mot fasiten.

   Lagring (state.exams, én nøkkel per kort så sky-synken slår sammen enheter):
     "ov:<kort-id>"   { st, s, d, due, last, reps, lapses, step, straks, straksN,
                        n, r, vs, sist, t, dueN, rk }  st 0 ny, 1 lærer,
                        2 repetisjon, 3 lærer på nytt. n forsøk, r riktige, vs
                        nylige varianter. dueN: telleren kortet senest kommer
                        tilbake på. rk: riktige på rad.
     "ovteller"       { n }  alle svar du har gitt, klokka for dueN
     "ov:okt"         oppgaven på skjermen: kort, variant, svar og retting
     "ov:valg"        { fokus, hel, modell }
     "ovdag:<dato>"   { n, r, nye }  dagens tall
     "tr:<id>"        eksamenstreningens logg oppdateres også når du svarer på
                      et spørsmål derfra, så «Bare de jeg bommet på» stemmer.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag } = S.u;
  const sh = () => S.views.shared;
  const prosa = (html) => { const n = el(".prose", frag(String(html || ""))); S.u.rullTabeller(n); return n; };

  const OV = () => (window.EDU_DATA || {}).ov || null;
  const TR = () => (window.EDU_DATA || {}).trening || null;
  const exams = () => S.store.get().exams;

  const MIN = 60000, TIME = 3600000, DAG = 86400000;
  const IKKE_TRENING = new Set(["fakta", "formel"]);
  const OPUS = "claude-opus-5-5", SONNET = "claude-sonnet-5-5";

  /* ================= lasting ================= */
  let lasting = null, lastefeil = null;
  const lazyListe = () => (((window.EDU_SUBJECT || {}).lazy) || {})["/ov"] || [];
  const lastet = (f) => !!document.querySelector(`script[src^="${f}"]`);
  function sikreData() {
    if ((OV() && TR()) || lasting || !S.picker) return;
    const liste = lazyListe().filter((f) => !lastet(f));
    if (!liste.length) return;
    lasting = S.picker.loadScripts(liste)
      .then(() => { lasting = null; kortMemo = null; S.app.refresh(); })
      .catch((e) => { lasting = null; lastefeil = e; S.app.refresh(); });
  }
  const finnes = () => lazyListe().length > 0 || !!OV();

  /* ================= FSRS-5 ================= */
  const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192,
    1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const DECAY = -0.5, FACTOR = 19 / 81, MÅL_R = 0.9;
  const klemD = (d) => Math.min(10, Math.max(1, d));
  const huskes = (dager, s) => Math.pow(1 + FACTOR * Math.max(0, dager) / Math.max(s, 0.01), DECAY);
  const intervall = (s) => (s / FACTOR) * (Math.pow(MÅL_R, 1 / DECAY) - 1);
  const D0 = (g) => klemD(W[4] - Math.exp(W[5] * (g - 1)) + 1);
  function nyD(d, g) {
    const d1 = d + (-W[6] * (g - 3)) * (10 - d) / 9;
    return klemD(W[7] * D0(4) + (1 - W[7]) * d1);
  }
  function sHusket(d, s, r, g) {
    const hard = g === 2 ? W[15] : 1, lett = g === 4 ? W[16] : 1;
    return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.exp((1 - r) * W[10]) - 1) * hard * lett);
  }
  const sGlemt = (d, s, r) => Math.min(s, W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp((1 - r) * W[14]));
  const sKort = (s, g) => s * Math.exp(W[17] * (g - 3 + W[18]));

  /* Studiedagen skifter klokka fire om natta. */
  function dagStart(ms) { const d = new Date(ms - 4 * TIME); d.setHours(0, 0, 0, 0); return d.getTime() + 4 * TIME; }
  const dagNr = (ms) => Math.round(dagStart(ms) / DAG);
  function dagISO(ms) { const d = new Date(dagStart(ms)); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
  function eksamenMs() { const e = (OV() || {}).eksamen; const t = e ? Date.parse(e + "T09:00:00") : NaN; return Number.isFinite(t) ? t : null; }
  /* Hele dager fram til neste repetisjon. Før eksamen er pausen høyst en tredjedel
     av dagene som er igjen, så hvert kort rekker å komme tilbake minst tre ganger,
     og den går aldri forbi dagen før eksamen. */
  function forfall(nå, dager, eksamen) {
    let d = Math.max(1, Math.round(dager));
    if (d >= 4) d += Math.round((Math.random() - 0.5) * 0.1 * d);
    if (eksamen && nå < eksamen) {
      const igjen = Math.round((dagStart(eksamen) - dagStart(nå)) / DAG);
      d = Math.min(d, Math.max(1, Math.ceil((igjen - 1) / 3)), Math.max(1, igjen - 1));
    }
    return dagStart(nå) + d * DAG;
  }

  /* Kort imellom: et kort kommer tilbake etter så mange andre svar, eller når
     dagene er gått, det som kommer først. Tallet dobles for hver riktig på rad
     (høyst fire doblinger), så det du kan, glir ut i takt med hvor mye du øver. */
  const KORT_ETTER = { 2: 8, 3: 20, 4: 40 };
  const kortEtter = (g, rk) => KORT_ETTER[g] * Math.pow(2, Math.min(rk || 0, 4));
  const forfalt = (s, nå, t) => !!s && !!s.st && (s.due <= nå || (s.st === 2 && s.dueN != null && s.dueN <= t));

  /* Ny tilstand for et kort etter vurdering g. Ren funksjon, så knappene kan vise
     neste intervall før du velger. slurv: feil som ikke er en misforståelse. */
  function planlegg(k, g, nå, opt) {
    const { slurv = false, eksamen = null, riktig = g > 1 && !slurv, teller = null } = opt || {};
    const k2 = Object.assign({}, k);
    delete k2.dueN;
    k2.rk = g === 1 ? 0 : slurv ? (k.rk || 0) : (k.rk || 0) + 1;
    const tilRep = () => { k2.due = forfall(nå, intervall(k2.s), eksamen); if (teller != null) k2.dueN = teller + kortEtter(g, k.rk); };
    k2.reps = (k.reps || 0) + 1; k2.t = nå; k2.sist = slurv ? 0 : g;
    k2.n = (k.n || 0) + 1; k2.r = (k.r || 0) + (riktig ? 1 : 0);
    const nyDag = !k.last || dagNr(nå) !== dagNr(k.last);
    const straksIgjen = () => { k2.straksN = (k.straksN || 0) + 1; const om = k2.straksN > 2 ? 10 * MIN : 0; k2.straks = om === 0; k2.due = nå + om; };
    const ferdig = () => { k2.straksN = 0; k2.straks = false; };
    if (!k.st) {
      k2.d = D0(g); k2.s = W[g - 1];
      if (g === 1) { k2.st = 1; k2.step = 0; straksIgjen(); }
      else if (slurv) { ferdig(); k2.st = 1; k2.step = 1; k2.due = nå + 10 * MIN; }
      else { ferdig(); k2.st = 2; k2.step = 0; tilRep(); }
    } else if (k.st === 1 || k.st === 3) {
      const s0 = k.s || W[2], d0 = k.d || D0(3);
      k2.s = nyDag && k.last ? (g === 1 ? sGlemt(d0, s0, huskes((nå - k.last) / DAG, s0)) : sHusket(d0, s0, huskes((nå - k.last) / DAG, s0), g)) : sKort(s0, g);
      k2.s = Math.max(0.05, k2.s);
      k2.d = nyD(d0, g);
      if (g === 1) { k2.step = 0; straksIgjen(); }
      else if (slurv || (k.step === 0 && g < 4)) { ferdig(); k2.step = 1; k2.due = nå + 10 * MIN; }
      else { ferdig(); k2.st = 2; k2.step = 0; tilRep(); }
    } else {
      const r = huskes(k.last ? (nå - k.last) / DAG : 0, k.s || 1);
      k2.d = nyD(k.d || D0(3), g);
      if (g === 1) {
        k2.lapses = (k.lapses || 0) + 1;
        k2.s = Math.max(0.05, sGlemt(k.d || D0(3), k.s || 1, r));
        k2.st = 3; k2.step = 0; straksIgjen();
      } else {
        k2.s = nyDag ? sHusket(k.d || D0(3), k.s || 1, r, g) : sKort(k.s || 1, g);
        ferdig();
        if (slurv) { k2.st = 3; k2.step = 1; k2.due = nå + 10 * MIN; }
        else tilRep();
      }
    }
    k2.last = nå;
    return k2;
  }
  function intervallTekst(due, nå) {
    const m = Math.max(0, due - nå);
    if (m < 2 * MIN) return "nå";
    if (m < 50 * MIN) return Math.round(m / MIN) + " min";
    const d = Math.round((dagStart(due) - dagStart(nå)) / DAG);
    if (d <= 0) return Math.round(m / TIME) + " t";
    return d === 1 ? "i morgen" : d + " d";
  }

  /* ================= kortene ================= */
  let kortMemo = null, memoFra = null;
  function alleKort() {
    const ov = OV(), tr = TR();
    if (kortMemo && memoFra && memoFra[0] === ov && memoFra[1] === tr) return kortMemo;
    const temaer = (ov && ov.temaer) || [];
    const delFor = (id) => (temaer.find((t) => t.id === id) || {}).del || 0;
    const vektFor = (id) => (temaer.find((t) => t.id === id) || {}).vekt || 3;
    const ut = [];
    ((ov && ov.oppgaver) || []).forEach((o) => o.deler.forEach((d, i) => ut.push({
      id: o.id + ":" + d.l, kilde: "ov", o, i, l: d.l, type: d.type, poeng: d.poeng,
      tema: o.tema, fam: o.id, del: delFor(o.tema), vekt: vektFor(o.tema), n: o.varianter.length,
    })));
    if (tr) {
      const fam = new Map();
      (tr.sporsmal || []).forEach((q) => {
        if (IKKE_TRENING.has(q.type)) return;
        const f = q.fam || q.id;
        if (!fam.has(f)) fam.set(f, []);
        fam.get(f).push(q);
      });
      fam.forEach((sp, f) => ut.push({
        id: "tr:" + f, kilde: "tr", sp, type: sp[0].tall ? "regn" : "valg", poeng: 1,
        tema: sp[0].tema, fam: "tr:" + f, del: delFor(sp[0].tema), vekt: vektFor(sp[0].tema), n: sp.length,
      }));
    }
    kortMemo = ut; memoFra = [ov, tr];
    return ut;
  }
  const kortById = (id) => alleKort().find((k) => k.id === id) || null;

  /* Tilstanden til et kort. Et spørsmål fra eksamenstreningen du har svart på før,
     starter som repetisjon: bommet du sist, har det forfalt med en gang. */
  function tilstand(k) {
    const s = exams()["ov:" + k.id];
    if (s && s.st) return s;
    if (k.kilde === "tr") {
      const logger = k.sp.map((q) => exams()["tr:" + q.id]).filter((l) => l && l.n);
      if (logger.length) {
        const sist = logger.reduce((a, b) => ((b.t || 0) > (a.t || 0) ? b : a));
        const n = logger.reduce((a, l) => a + (l.n || 0), 0), r = logger.reduce((a, l) => a + (l.r || 0), 0);
        if (sist.s === 1) { const s0 = r / n >= 0.75 ? 4 : 2; return { st: 2, s: s0, d: 5, due: dagStart(sist.t || 0) + s0 * DAG, last: sist.t || 0, reps: n, lapses: n - r, n, r, frø: true }; }
        return { st: 2, s: 0.5, d: 7, due: sist.t || 0, last: sist.t || 0, reps: n, lapses: n - r, n, r, frø: true };
      }
    }
    return s || { st: 0 };
  }

  /* ================= valg og økt ================= */
  const valg = () => Object.assign({ fokus: 0, hel: "av", modell: OPUS }, exams()["ov:valg"] || {});
  const settValg = (patch) => S.store.setExam("ov:valg", patch);
  /* Fokus er 0 (hele pensum) eller en liste med deler, for eksempel [1, 2].
     Eldre lagring hadde ett tall, og det leses som en liste med én del. */
  const fokusDeler = () => { const f = valg().fokus; return Array.isArray(f) ? f : (f ? [f] : []); };
  const iFokus = () => { const d = fokusDeler(); return (k) => !d.length || d.includes(k.del); };
  const økt = () => exams()["ov:okt"] || null;
  function lagreØkt(o) { exams()["ov:okt"] = o; S.store.emit(); }
  const teller = () => (exams()["ovteller"] || {}).n || 0;
  const dagLogg = (ms) => exams()["ovdag:" + dagISO(ms)] || { n: 0, r: 0, nye: 0 };

  /* Svakhet per tema: andelen feil, med en forsiktig start (1 av 2) når du ikke
     har svart på noe ennå. Teller både øvingen her og eksamenstreningen. */
  function svakheter() {
    const ut = {}, leggTil = (tema, n, r) => { const x = ut[tema] || (ut[tema] = { n: 0, r: 0 }); x.n += n; x.r += r; };
    alleKort().forEach((k) => { const s = exams()["ov:" + k.id]; if (s && s.n) leggTil(k.tema, s.n, s.r || 0); });
    const tr = TR();
    if (tr) (tr.sporsmal || []).forEach((q) => { const l = exams()["tr:" + q.id]; if (l && l.n) leggTil(q.tema, l.n, l.r || 0); });
    const f = {};
    Object.keys(ut).forEach((t) => { f[t] = (ut[t].n - ut[t].r + 1) / (ut[t].n + 2); });
    return (tema) => (f[tema] != null ? f[tema] : 0.5);
  }

  function velgNeste(nå, o) {
    const alle = alleKort().filter(iFokus());
    const hist = (o && o.hist) || [];
    const hoppet = (o && o.hoppet) || {};
    const sisteFam = hist.slice(-2).map((h) => h.fam);
    const sisteTema = hist.slice(-2).map((h) => h.tema);
    const tilst = new Map(alle.map((k) => [k.id, tilstand(k)]));
    const borte = (k) => hoppet[k.id] && nå - hoppet[k.id] < 20 * MIN;
    const avstand = (k) => { const i = hist.map((h) => h.id).lastIndexOf(k.id); return i < 0 ? 99 : hist.length - 1 - i; };

    /* 1. lik oppgave */
    const straks = alle.find((k) => { const s = tilst.get(k.id); return s.straks && s.due <= nå && !borte(k); });
    if (straks) return { k: straks, grunn: "lik" };
    if (o && o.likTema) {
      const nyeNå = nyeKort(alle, tilst);
      const lik = alle.filter((k) => k.tema === o.likTema && !sisteFam.includes(k.fam) && !borte(k) && k.n > 1
        && (tilst.get(k.id).st ? tilst.get(k.id).due <= nå + DAG : nyeNå.includes(k)));
      if (lik.length) return { k: lik[Math.floor(Math.random() * Math.min(lik.length, 6))], grunn: "lik" };
    }

    /* 2. læring */
    const lær = alle.filter((k) => { const s = tilst.get(k.id); return (s.st === 1 || s.st === 3) && s.due <= nå && !borte(k) && avstand(k) >= 2; })
      .sort((a, b) => tilst.get(a.id).due - tilst.get(b.id).due);
    if (lær.length) return { k: lær.find((k) => !sisteFam.includes(k.fam)) || lær[0], grunn: "lær" };

    /* 3. repetisjoner og 4. nye */
    const r = (k) => { const s = tilst.get(k.id); return huskes(s.last ? (nå - s.last) / DAG : 0, s.s || 1); };
    const variert = (liste) => liste.filter((k) => !sisteFam.includes(k.fam) && !(sisteTema.length === 2 && sisteTema.every((t) => t === k.tema)));
    /* Forfalt på dato først, med den du mest sannsynlig har glemt øverst. Så de som
       har forfalt fordi nok andre kort er gått, eldst først. */
    const t = teller();
    const påDato = alle.filter((k) => { const s = tilst.get(k.id); return s.st === 2 && s.due <= nå && !borte(k); }).sort((a, b) => r(a) - r(b));
    const påTeller = alle.filter((k) => { const s = tilst.get(k.id); return s.st === 2 && s.due > nå && forfalt(s, nå, t) && !borte(k); })
      .sort((a, b) => tilst.get(a.id).dueN - tilst.get(b.id).dueN);
    const rep = påDato.concat(påTeller);
    const nye = nyeKort(alle, tilst).filter((k) => !borte(k));
    const dag = dagLogg(nå);
    /* Hvert fjerde kort er nytt. Er det bare kort som venter på telleren, annethvert,
       så nytt stoff ikke blir liggende. */
    const tidForNy = nye.length && (!rep.length || (påDato.length ? (dag.n % 4) === 3 : (dag.n % 2) === 1));
    if (rep.length && !tidForNy) { const v = variert(rep); return { k: (v.length ? v : rep)[0], grunn: "rep" }; }
    if (nye.length) return { k: vektetNy(variert(nye).length ? variert(nye) : nye), grunn: "ny" };

    /* 5. ekstra */
    const læring = alle.filter((k) => { const s = tilst.get(k.id); return (s.st === 1 || s.st === 3) && !borte(k); })
      .sort((a, b) => tilst.get(a.id).due - tilst.get(b.id).due);
    const senere = alle.filter((k) => tilst.get(k.id).st === 2 && !borte(k)).sort((a, b) => r(a) - r(b));
    const kand = variert(læring.concat(senere));
    const k = kand[0] || læring[0] || senere[0] || alle.find((x) => !borte(x)) || alle[0];
    return k ? { k, grunn: "ekstra" } : null;
  }
  /* Nye kort: en eksamensoppgave starter i (a). Senere deloppgaver blir nye når
     de tidligere i samme oppgave er sett. */
  function nyeKort(alle, tilst) {
    const sett = new Set(alle.filter((k) => tilst.get(k.id).st).map((k) => k.id));
    return alle.filter((k) => {
      if (tilst.get(k.id).st) return false;
      if (k.kilde !== "ov" || k.i === 0) return true;
      return k.o.deler.slice(0, k.i).every((d) => sett.has(k.o.id + ":" + d.l));
    });
  }
  function vektetNy(liste) {
    const svak = svakheter();
    const vekt = (k) => k.vekt * (0.4 + svak(k.tema)) * (k.kilde === "ov" ? (k.i === 0 ? 1.6 : 1.3) : k.type === "regn" ? 0.8 : 0.55);
    const v = liste.map((k) => [k, vekt(k)]).sort((a, b) => b[1] - a[1]).slice(0, 40);
    const sum = v.reduce((a, x) => a + x[1], 0);
    let x = Math.random() * sum;
    for (const [k, w] of v) { x -= w; if (x <= 0) return k; }
    return v[0][0];
  }

  /* Varianten du får: ikke en av de siste du har sett av dette kortet. For
     eksamenstreningen også helst en du aldri har svart på der. */
  function velgVariant(k) {
    const s = exams()["ov:" + k.id] || {};
    const nylig = new Set((s.vs || []).slice(-Math.max(1, k.n - 1)));
    let kand = [...Array(k.n).keys()].filter((i) => !nylig.has(i));
    if (k.kilde === "tr") { const usett = kand.filter((i) => !(exams()["tr:" + k.sp[i].id] || {}).n); if (usett.length) kand = usett; }
    if (!kand.length) kand = [...Array(k.n).keys()];
    return kand[Math.floor(Math.random() * kand.length)];
  }

  function nyOppgave(nå) {
    const gml = økt();
    const valgt = velgNeste(nå, gml);
    if (!valgt) return null;
    const k = valgt.k;
    const v = velgVariant(k);
    let kort = [k.id], hel = false;
    /* Hel oppgave: av og til når en ny eksamensoppgave starter, eller ofte. */
    const modus = valg().hel;
    if (k.kilde === "ov" && k.i === 0 && valgt.grunn === "ny" && k.o.deler.length >= 3 && modus !== "aldri") {
      const sjanse = modus === "ofte" ? 0.7 : 0.3;
      if (Math.random() < sjanse) { hel = true; kort = k.o.deler.map((d) => k.o.id + ":" + d.l); }
    }
    const o = { id: nå, kort, fam: k.fam, v, hel, grunn: valgt.grunn, svar: {}, rett: {}, vurdert: {}, start: nå, likTema: null,
      hist: ((gml && gml.hist) || []).slice(-8), hoppet: (gml && gml.hoppet) || {} };
    lagreØkt(o);
    return o;
  }
  /* Hele oppgaven med samme variant, fra deloppgaven du står på. */
  function taHele(o) {
    const k = kortById(o.kort[0]);
    if (!k || k.kilde !== "ov") return;
    lagreØkt(Object.assign({}, o, { hel: true, kort: k.o.deler.map((d) => k.o.id + ":" + d.l) }));
    S.app.refresh();
  }
  function hoppOver(o) {
    const nå = Date.now(), hoppet = Object.assign({}, o.hoppet || {});
    o.kort.forEach((id) => {
      if (o.vurdert[id]) return;
      hoppet[id] = nå;
      const s = exams()["ov:" + id];
      if (s && s.straks) S.store.setExam("ov:" + id, { straks: false, due: nå + 10 * MIN });
    });
    lagreØkt(Object.assign({}, o, { hoppet, hist: histMed(o) }));
    nyOppgave(nå);
    S.app.refresh(); tilToppen();
  }
  /* Ny oppgave: til toppen etter at siden er tegnet (refresh gjenoppretter rullingen). */
  function tilToppen() { requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" })); }
  function histMed(o) {
    const k = kortById(o.kort[0]);
    return ((o.hist || []).concat(o.kort.map((id) => ({ id, fam: o.fam, tema: k ? k.tema : "" })))).slice(-8);
  }

  /* ================= tall ================= */
  const språk = () => (TR() || {}).sprak || "en";
  function tolk(rå, enhet) {
    const T = S.views.trening;
    if (T && T.tolkTall) return T.tolkTall(rå, enhet, språk());
    const n = Number(String(rå || "").replace(/[\s ]/g, "").replace(/[−–]/g, "-").replace(",", ".").replace(/%$/, ""));
    return Number.isFinite(n) ? [n] : null;
  }
  function innenfor(x, t, v) {
    if (v == null) v = t.verdi;
    const tol = t.tol || {};
    const rel = tol.rel != null ? tol.rel : tol.abs != null ? 0 : 0.002;
    return Math.abs(x - v) <= Math.max(tol.abs || 0, rel * Math.abs(v)) * (1 + 1e-9) + 1e-12;
  }
  /* Riktig, en felle eller feil. Sannsynligheter og forholdstall godtas også i prosent. */
  function vurderTall(rå, t, feller, i) {
    const kand = tolk(rå, t.enhet);
    if (!kand) return null;
    const alle = kand.concat(!t.enhet && Math.abs(t.verdi) < 1 ? kand.map((x) => x / 100) : []);
    const mål = [t.verdi].concat(t.alt || []);
    if (alle.some((x) => mål.some((v) => innenfor(x, t, v)))) return { ok: true };
    const f = (feller || []).find((f) => f.i === i && alle.some((x) => innenfor(x, t, f.verdi)));
    return { ok: false, felle: f ? f.tekst : null };
  }
  function visTall(v, enhet) {
    const a = Math.abs(v);
    let s = a.toFixed(a >= 1000 ? 2 : 4);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    const [h, d] = s.split(".");
    const g = h.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (v < 0 ? "−" : "") + g + (d ? "." + d : "") + (enhet ? (enhet === "%" ? "%" : " " + enhet) : "");
  }

  /* ================= innholdet i et kort ================= */
  /* Det som vises for et kort i en gitt variant: én felles form for begge kildene. */
  function innhold(k, v) {
    if (k.kilde === "ov") {
      const vr = k.o.varianter[Math.min(v, k.o.varianter.length - 1)];
      return { case: vr.case, del: vr.deler[k.i], tittel: k.o.tittel };
    }
    const q = k.sp[Math.min(v, k.sp.length - 1)];
    return { q, tittel: null };
  }

  /* ================= retting ================= */
  const tom = (x) => !String(x == null ? "" : x).trim();
  function rettTall(o, k, d) {
    const inn = (o.svar[k.id] || {}).t || [];
    const res = d.svar.map((t, i) => vurderTall(inn[i], t, d.feller, i) || { ok: false, tom: tom(inn[i]) });
    return res;
  }
  function brøk(o, k, d) {
    const r = o.rett[k.id] || {};
    if (k.kilde === "tr") return r.ok ? 1 : 0;
    if (d.type === "tall") return (r.tall || []).filter((x) => x.ok).length / d.svar.length;
    const tp = d.type === "blandet" ? d.tallPoeng : 0;
    const tallDel = d.type === "blandet" ? tp * (r.tall || []).filter((x) => x.ok).length / d.svar.length : 0;
    if (r.cp == null) return null;
    return (tallDel + r.cp) / d.poeng;
  }
  /* Forslaget til vurdering ut fra rettingen. Et tall som traff en felle, er en
     kjent misforståelse. Et galt tall som ikke traff noen felle, er oftest slurv. */
  const RIKTIG = 0.85;
  function forslag(o, k, d) {
    const r = o.rett[k.id] || {};
    if (r.selv) return null;
    const f = k.kilde === "tr" ? (r.ok ? 1 : 0) : brøk(o, k, d);
    if (f == null) return null;
    if (f >= RIKTIG) return r.hjelp ? "usikker" : "greit";
    if (r.gaOpp) return "misforstått";
    if (r.ft === "SLURV") return "slurv";
    if (r.ft === "MISFORSTÅELSE") return "misforstått";
    const felle = k.kilde === "tr" ? r.valg >= 0 : (r.tall || []).some((x) => !x.ok && x.felle);
    if (felle) return "misforstått";
    if (f >= 0.5) return "usikker";
    if (k.kilde === "tr" ? r.tall != null : (r.tall || []).some((x) => !x.ok && !x.tom)) return "slurv";
    return "misforstått";
  }

  function lagreSvar(o, id, patch) {
    const svar = Object.assign({}, o.svar, { [id]: Object.assign({}, o.svar[id] || {}, patch) });
    Object.assign(o, { svar });
    exams()["ov:okt"] = o; S.store.persist ? S.store.persist() : S.store.emit();
  }
  function lagreRett(o, id, patch) {
    const ny = Object.assign({}, økt() || o);
    ny.rett = Object.assign({}, ny.rett, { [id]: Object.assign({}, ny.rett[id] || {}, patch) });
    lagreØkt(ny);
    return ny;
  }

  /* Sjekk-knappen for et ov-kort. Tall rettes med en gang, tekst sendes til Claude. */
  function sjekk(o, k, d) {
    const inn = o.svar[k.id] || {};
    const harTall = d.type === "tall" || d.type === "blandet";
    const harTekst = d.type === "tekst" || d.type === "blandet";
    if (harTall) {
      const feil = d.svar.map((t, i) => (!tom((inn.t || [])[i]) && !tolk((inn.t || [])[i], t.enhet)) ? t : null).filter(Boolean);
      if (feil.length) { S.u.toast("Fant ikke et tall i feltet. Skriv for eksempel 1 234.5, 0.25 eller −12."); return; }
    }
    const blankt = (!harTall || !(inn.t || []).some((x) => !tom(x))) && (!harTekst || tom(inn.x));
    if (blankt && !confirm("Du har ikke skrevet noe svar. Vise fasiten likevel? Det teller som feil.")) return;
    const patch = { tid: Date.now() };
    if (harTall) patch.tall = rettTall(o, k, d);
    if (harTekst) {
      if (tom(inn.x)) { patch.cp = 0; patch.tb = null; }
      else if (!S.claude || !S.claude.harNøkkel()) patch.selv = true;
      else patch.venter = true;
    }
    const ny = lagreRett(o, k.id, patch);
    S.app.refresh();
    if (patch.venter) setTimeout(() => S.claude.kjørVurdering(vurderingsId(ny, k)), 30);
  }
  const vurderingsId = (o, k) => `ov:${o.id}:${k.id}`;

  /* Det Claude får når en tekstdel rettes. */
  function rettePrompt(o, k, d, c) {
    const ren = S.claude.ren;
    const inn = o.svar[k.id] || {}, r = o.rett[k.id] || {};
    const tp = d.type === "blandet" ? d.tallPoeng : 0, cm = d.poeng - tp;
    const tallLinjer = d.type === "blandet" ? d.svar.map((t, i) => `- ${ren(t.navn)}: skrev ${(inn.t || [])[i] || "(tomt)"}${t.enhet ? " " + t.enhet : ""}, fasit ${visTall(t.verdi, t.enhet)} (${(r.tall || [])[i] && r.tall[i].ok ? "riktig" : "feil"})`).join("\n") : "";
    const krit = (d.kriterier || []).map((x, i) => `${i + 1}. ${ren(x)}`).join("\n");
    return `Du er sensor på FIE402 Corporate Finance ved NHH (eksamen satt av Andrey Kurbatov). Jeg øver til eksamen med repetisjon og vil ha en streng og konkret vurdering, ikke oppmuntring.

## Casen: ${k.o.tittel}
${ren(c.case)}
${!o.hel && d.gitt ? "\n## Gitt fra tidligere deloppgaver\n" + ren(d.gitt) + "\n" : ""}
## Deloppgave ${d.l}) (${d.poeng} poeng)
${ren(d.q)}${d.setninger ? "\n" + ren(d.setninger) : ""}
${tallLinjer ? `\n## Tallene (allerede rettet automatisk, ${tp} poeng)\n${tallLinjer}\n` : ""}
## Svaret mitt${d.type === "blandet" ? ` på tekstdelen (${cm} poeng): ${ren(d.tekstLedd || "")}` : ` (${cm} poeng)`}
"""
${String(inn.x || "").trim()}
"""

## Modellsvaret
${ren(d.kort)}

## Løsningen
${ren(d.losning)}

## Kriteriene sensor ser etter
${krit}

## Slik retter du
- Gi poeng bare for tekstdelen, av ${cm}${d.type === "blandet" ? ". Tallene er rettet, så ikke trekk for dem igjen" : ""}. Bruk halve poeng.
- Vurder bare det som står i svaret. Det som er underforstått, teller ikke. Se bort fra stavefeil og grammatikk.
- Kurbatovs sensorer belønner mekanismen, ikke merkelappen: et begrep uten hvorfor gir lite.
- Eksamen besvares på engelsk. Skriver jeg på norsk, retter du innholdet som vanlig og minner meg på det i én setning.
- Ikke gjenta løsningen. Jeg har den foran meg.
- Si også hva slags feil det største avviket er: SLURV (jeg kan mekanismen, men glemte et ledd, regnet feil eller skrev upresist), MISFORSTÅELSE (jeg forstår ikke mekanismen eller bruker feil begrep) eller INGEN (svaret er i hovedsak riktig).

## Svar kort, på norsk, i denne formen
1. **Poeng:** «x av ${cm}» og én setning om hvorfor.
2. **Kriterium for kriterium:** ✓ eller ✗, med et kort sitat fra svaret eller hva som manglet.
3. **Det som kostet mest:** konkret, og om det var slurv eller en misforståelse.
4. **Slik ville et toppsvar startet:** én til to linjer på engelsk.

Avslutt med to egne linjer nøyaktig slik:
POENG: x av ${cm}
FEILTYPE: INGEN, SLURV eller MISFORSTÅELSE`;
  }
  function lesPoeng(tekst, maks) {
    const m = [...String(tekst || "").matchAll(/POENG:\s*([0-9]+(?:[.,][0-9]+)?)\s*av\s*([0-9]+(?:[.,][0-9]+)?)/gi)].pop();
    if (!m) return null;
    const x = parseFloat(m[1].replace(",", "."));
    return Number.isFinite(x) ? Math.max(0, Math.min(maks, Math.round(x * 2) / 2)) : null;
  }
  function lesFeiltype(tekst) {
    const m = [...String(tekst || "").matchAll(/FEILTYPE:\s*(INGEN|SLURV|MISFORST[ÅA]ELSE)/gi)].pop();
    if (!m) return null;
    const x = m[1].toUpperCase();
    return x.startsWith("MIS") ? "MISFORSTÅELSE" : x;
  }

  /* ================= vurdering ================= */
  const KNAPPER = {
    misforstått: { g: 1, navn: "Misforståelse", hint: "Lik oppgave med en gang", kls: "rose" },
    slurv: { g: 2, slurv: true, navn: "Slurvefeil", hint: "Én gang til i økta", kls: "amber" },
    usikker: { g: 2, navn: "Usikker", hint: "Raskere tilbake", kls: "amber" },
    greit: { g: 3, navn: "Greit", hint: "", kls: "green" },
    lett: { g: 4, navn: "Lett", hint: "", kls: "green" },
  };
  function vurder(o, k, valgt, riktigSvar) {
    const nå = Date.now();
    const før = tilstand(k);
    const b = KNAPPER[valgt];
    const t = teller() + 1;
    S.store.setExam("ovteller", { n: t });
    const ny = planlegg(før.frø ? Object.assign({}, før, { frø: undefined }) : før, b.g, nå, { slurv: !!b.slurv, eksamen: eksamenMs(), riktig: riktigSvar, teller: t });
    ny.vs = ((før.vs || []).concat([o.v])).slice(-12);
    delete ny.frø;
    /* Bare én variant: samme spørsmål med en gang lærer ingenting. Kortet kommer om
       ti minutter, og neste oppgave blir en lignende fra samme tema. */
    const likTema = b.g === 1 && k.n < 2 ? k.tema : null;
    if (likTema) { ny.straks = false; ny.due = nå + 10 * MIN; }
    S.store.setExam("ov:" + k.id, ny);
    const dag = dagLogg(nå);
    S.store.setExam("ovdag:" + dagISO(nå), { n: (dag.n || 0) + 1, r: (dag.r || 0) + (riktigSvar ? 1 : 0), nye: (dag.nye || 0) + (før.st ? 0 : 1) });
    if (k.kilde === "tr") {
      const q = k.sp[Math.min(o.v, k.sp.length - 1)];
      const g = exams()["tr:" + q.id] || { n: 0, r: 0 };
      S.store.setExam("tr:" + q.id, { n: (g.n || 0) + 1, r: (g.r || 0) + (riktigSvar ? 1 : 0), s: riktigSvar ? 1 : 0, t: nå, h: 0 });
    }
    const cur = økt() || o;
    const vurdert = Object.assign({}, cur.vurdert, { [k.id]: valgt });
    const alle = cur.kort.every((id) => vurdert[id]);
    lagreØkt(Object.assign({}, cur, { vurdert, hist: alle ? histMed(cur) : cur.hist, likTema: likTema || cur.likTema || null }));
    if (alle) nyOppgave(Date.now());
    S.app.refresh();
    if (alle) tilToppen();
  }

  /* Knappene etter rettingen, med intervallet hver av dem gir. */
  function vurderingsRad(o, k, d) {
    const r = o.rett[k.id] || {};
    const nå = Date.now(), før = tilstand(k), eks = eksamenMs();
    const f = k.kilde === "tr" ? (r.ok ? 1 : 0) : brøk(o, k, d);
    const selv = !!r.selv;
    const ok = f != null && f >= RIKTIG;
    let knapper;
    if (selv) knapper = ["misforstått", "slurv", "usikker", "greit", "lett"];
    else if (ok) knapper = ["usikker", "greit", "lett"];
    else knapper = ["misforstått", "slurv"].concat(f != null && f >= 0.5 ? ["usikker"] : []);
    const fsNavn = forslag(o, k, d);
    const rad = el(".ov-vurder");
    rad.appendChild(el(".ov-vurder-hode", selv ? "Sammenlign med fasiten og vurder deg selv" : ok ? "Hvor godt satt den?" : f != null && f >= 0.5 ? "Delvis riktig. Hva manglet?" : "Hva slags feil var det?"));
    const knapperad = el(".ov-vurder-knapper");
    knapper.forEach((navn, i) => {
      const b = KNAPPER[navn];
      const riktig = b.g >= 2 && !b.slurv;
      const t = teller() + 1;
      const neste = planlegg(før, b.g, nå, { slurv: !!b.slurv, eksamen: eks, riktig, teller: t });
      const tekst = b.g === 1 ? (k.n > 1 ? "nye tall nå" : "lignende nå")
        : neste.dueN != null ? `${neste.dueN - t} kort · ${intervallTekst(neste.due, nå)}` : intervallTekst(neste.due, nå);
      knapperad.appendChild(el(`button.ov-vk.${b.kls}` + (fsNavn === navn ? ".forslag" : ""), { type: "button", "data-ov-vurder": navn,
        onclick: () => vurder(o, k, navn, riktig) },
        el("span.ov-vk-tast", String(i + 1)), el("span.ov-vk-navn", b.navn), el("span.ov-vk-int", tekst)));
    });
    rad.appendChild(knapperad);
    if (!selv && !ok) rad.appendChild(el("p.tiny.muted", { style: { margin: "6px 0 0" } },
      r.ft === "SLURV" ? "Claude mener det var slurv. Du bestemmer." : r.ft === "MISFORSTÅELSE" ? "Claude mener det var en misforståelse. Du bestemmer." :
        "Slurvefeil: du kan metoden, men regnet eller leste feil. Misforståelse: du visste ikke hvordan, eller brukte feil regel."));
    return rad;
  }

  /* ================= visning av ett kort ================= */
  let visFull = {};
  function kortVisning(o, k, medCase) {
    const c = innhold(k, o.v);
    const boks = el(".ov-del");
    const r = o.rett[k.id];
    const vurdert = o.vurdert[k.id];
    if (k.kilde === "tr") return trVisning(o, k, c.q, boks);
    const d = c.del;
    if (medCase) boks.appendChild(el(".ov-case", prosa(c.case)));
    if (!o.hel && d.gitt) boks.appendChild(el(".ov-gitt", el("span.ov-gitt-hode", "Gitt"), prosa(d.gitt)));
    boks.appendChild(el(".ov-q", el(".row", { style: { gap: "8px", alignItems: "baseline" } },
      el("span.part-label", d.l + ")"), el("span.tiny.muted", `${d.poeng} p`)), prosa(d.q),
      d.setninger ? el("p.tiny.muted", { style: { margin: "4px 0 0" } }, frag(d.setninger)) : null));
    boks.appendChild(svarFelt(o, k, d, !!r));
    if (!r) {
      const harTekst = d.type !== "tall";
      boks.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginTop: "10px" } },
        el("button.btn.primary", { type: "button", "data-ov-sjekk": k.id, onclick: () => sjekk(økt() || o, k, d) },
          harTekst && S.claude && S.claude.harNøkkel() ? (d.type === "blandet" ? "Rett tallene og teksten" : "Rett med Claude") : harTekst ? "Vis fasiten" : "Sjekk"),
        el("button.btn.ghost.sm", { type: "button", onclick: () => { if (confirm("Vise fasiten uten å svare? Det teller som feil.")) { lagreRett(økt() || o, k.id, { tid: Date.now(), tall: d.svar ? d.svar.map(() => ({ ok: false, tom: true })) : undefined, cp: d.type === "tall" ? undefined : 0, gaOpp: true }); S.app.refresh(); } } }, "Jeg står fast"),
        harTekst && !(S.claude && S.claude.harNøkkel()) ? el("span.tiny.muted", "Legg inn API-nøkkel under Spør Claude for å få teksten rettet.") : null));
      return boks;
    }
    boks.appendChild(resultat(o, k, d, r));
    if (!vurdert && klarForVurdering(o, k, d)) boks.appendChild(vurderingsRad(o, k, d));
    if (vurdert) boks.appendChild(el("p.tiny.muted", { style: { margin: "10px 0 0" } }, `Vurdert: ${KNAPPER[vurdert].navn}.`));
    return boks;
  }
  const klarForVurdering = (o, k, d) => { const r = o.rett[k.id] || {}; return k.kilde === "tr" ? true : r.selv || r.gaOpp || brøk(o, k, d) != null; };

  function svarFelt(o, k, d, låst) {
    const inn = o.svar[k.id] || {}, r = o.rett[k.id] || {};
    const boks = el(".svar-felt");
    (d.svar || []).forEach((t, i) => {
      const inp = el("input.svar-inn", { type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "data-svar": k.id + ":" + i,
        "aria-label": "Svaret ditt", placeholder: låst ? "" : "Ditt tall",
        oninput: (ev) => { const cur = økt() || o; const ts = (((cur.svar[k.id] || {}).t) || []).slice(); ts[i] = ev.target.value; lagreSvar(cur, k.id, { t: ts }); },
        onkeydown: (ev) => { if (ev.key === "Enter") { ev.preventDefault(); const neste = document.querySelector(`[data-svar="${k.id}:${i + 1}"]`); if (neste) neste.focus(); else if (d.type === "tall") sjekk(økt() || o, k, d); } } });
      inp.value = (inn.t || [])[i] || ""; if (låst) inp.readOnly = true;
      const res = (r.tall || [])[i];
      boks.appendChild(el(".svar-rad",
        el("span.svar-navn", frag(t.navn)), inp, t.enhet ? el("span.svar-enhet", t.enhet) : null,
        res ? el(res.ok ? "span.svar-ok" : "span.svar-feil", res.ok ? "✓" : "✗") : null,
        res && !res.ok ? el("span.tiny.muted", `Fasit: ${visTall(t.verdi, t.enhet)}`) : null));
    });
    if (d.type === "tekst" || d.type === "blandet") {
      if (d.type === "blandet") boks.appendChild(el(".svar-tekst-hode.tiny.muted", frag(d.tekstLedd || "Kommentar")));
      const ta = el("textarea.svar-tekst", { rows: d.type === "tekst" ? 6 : 3, maxlength: 5000, "data-svar": k.id + ":x",
        placeholder: låst ? "" : "Write your answer in English, as on the exam.",
        oninput: (ev) => lagreSvar(økt() || o, k.id, { x: ev.target.value }) });
      ta.value = inn.x || ""; if (låst) ta.readOnly = true;
      boks.appendChild(ta);
    }
    if (!låst && (d.svar || []).length) boks.appendChild(el("p.tiny.muted", { style: { margin: "0" } },
      "Punktum eller komma som desimaltegn. Prosent kan skrives som 9.25 eller 0.0925." + (d.svar.length > 1 ? " Enter går til neste felt." : " Enter sjekker.")));
    return boks;
  }

  function resultat(o, k, d, r) {
    const boks = el(".tr-fasit");
    const f = brøk(o, k, d);
    const ventTekst = r.venter && r.cp == null;
    const status = r.gaOpp ? ["Ikke besvart", "galt"] : ventTekst ? ["Tallene er rettet. Claude retter teksten …", "blank"] : r.selv ? ["Sammenlign med fasiten", "blank"]
      : f >= RIKTIG ? ["Riktig", "rett"] : f >= 0.5 ? ["Delvis riktig", "delvis"] : ["Ikke riktig", "galt"];
    const poengTekst = f != null && !r.selv && !r.gaOpp ? ` · ${(Math.round(f * d.poeng * 2) / 2).toString().replace(".", ",")} av ${d.poeng} p` : "";
    boks.appendChild(el(".tr-resultat." + status[1], status[0] + poengTekst));
    (r.tall || []).forEach((x, i) => {
      if (x.ok || !x.felle) return;
      boks.appendChild(el(".ov-felle", el("b", `Tallet ditt for ${S.claude ? S.claude.ren(d.svar[i].navn) : ""}: `), frag(x.felle)));
    });
    if (d.type !== "tall" && !tom(((o.svar[k.id] || {}).x)) && S.claude && S.claude.harNøkkel() && !r.selv) {
      boks.appendChild(el("div", { style: { marginTop: "10px" } }, S.claude.vurdering({
        id: vurderingsId(o, k), modell: valg().modell, effort: "medium", lagret: r.tb || null,
        prompt: () => rettePrompt(økt() || o, k, d, innhold(k, o.v)),
        knapp: "Rett teksten med Claude",
        forklaring: `${valg().modell === SONNET ? "Sonnet 5.5" : "Opus 5.5"} retter teksten mot modellsvaret og kriteriene. Rundt ${valg().modell === SONNET ? "1–3" : "3–6"} cent.`,
        onFerdig: (tekst) => {
          const maks = d.poeng - (d.type === "blandet" ? d.tallPoeng : 0);
          const p = lesPoeng(tekst, maks);
          if (p == null) { S.u.toast("Fant ikke poengsummen. Vurder deg selv."); lagreRett(økt() || o, k.id, { selv: true, venter: false, tb: tekst }); }
          else lagreRett(økt() || o, k.id, { cp: p, ft: lesFeiltype(tekst), venter: false, tb: tekst });
          S.app.refresh();
        },
      })));
      if (r.venter && r.cp == null) boks.appendChild(el("button.btn.ghost.sm", { type: "button", style: { marginTop: "8px" },
        onclick: () => { lagreRett(økt() || o, k.id, { selv: true, venter: false }); S.app.refresh(); } }, "Vurder selv uten å vente"));
    }
    boks.appendChild(el(".explain", el("div.tiny.muted", { style: { marginBottom: "4px" } }, d.type === "tall" ? "Fasit" : "Modellsvar"), prosa(d.kort)));
    if (d.kriterier && (r.selv || r.gaOpp)) {
      const ul = el("ul.ov-krit");
      d.kriterier.forEach((x) => ul.appendChild(el("li", frag(x))));
      boks.appendChild(el("div", el(".tr-fellehode", "Det sensor gir poeng for"), ul));
    }
    const åpen = visFull[k.id] != null ? visFull[k.id] : (f != null && f < RIKTIG) || r.gaOpp;
    const full = el(".tr-full", { hidden: !åpen }, prosa(d.losning), lesMer(k));
    const knapp = el("button.btn.sm" + (åpen ? ".ghost" : ""), { type: "button", "data-ov-full": k.id,
      onclick: () => { visFull[k.id] = full.hidden; full.hidden = !full.hidden; knapp.textContent = full.hidden ? "Vis hele løsningen" : "Skjul løsningen"; } },
      åpen ? "Skjul løsningen" : "Vis hele løsningen");
    boks.appendChild(el(".row", { style: { marginTop: "12px" } }, knapp));
    boks.appendChild(full);
    return boks;
  }
  function lesMer(k) {
    const rad = el(".row.wrap.tr-lesmer");
    const ov = OV() || {}, t = (ov.temaer || []).find((x) => x.id === k.tema);
    const sj = k.kilde === "ov" ? k.o.sjanger : null;
    if (!sj && !(t && t.kjerne)) return rad;
    rad.appendChild(el("span.tiny.muted", "Les mer:"));
    if (sj && S.hasModule("/sjangre")) {
      const g = ((window.EDU_DATA || {}).sjangre || []).find((x) => x.id === sj);
      if (g) rad.appendChild(el("a.chip", { href: "#/sjangre/" + sj, style: { textDecoration: "none" } }, "Sjangertrening · " + kutt(g.title, 36)));
    }
    if (t && t.kjerne && S.hasModule("/kjerne")) {
      const num = parseInt(String(t.kjerne).replace(/\D/g, ""), 10);
      rad.appendChild(el("a.chip", { href: "#/kjerne/" + num, style: { textDecoration: "none" } }, "Kjernepensum " + num));
    }
    return rad;
  }
  const kutt = (s, n) => (String(s).length > n ? String(s).slice(0, n - 1) + "…" : String(s));

  /* Et spørsmål fra eksamenstreningen: tallet først når det finnes, ellers flervalg. */
  function trVisning(o, k, q, boks) {
    const inn = o.svar[k.id] || {}, r = o.rett[k.id];
    boks.appendChild(el(".tr-stem", prosa(q.q)));
    const tallModus = q.tall && !inn.alt && !(r && r.valg != null);
    if (!r && tallModus) {
      const t = q.tall;
      const inp = el("input.input.tr-tall-inn", { type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "data-svar": k.id + ":0",
        placeholder: "Ditt tall", oninput: (ev) => lagreSvar(økt() || o, k.id, { t: [ev.target.value] }),
        onkeydown: (ev) => { if (ev.key === "Enter") { ev.preventDefault(); trTall(økt() || o, k, q, ev.target.value); } } });
      inp.value = (inn.t || [])[0] || "";
      boks.appendChild(el(".tr-tall", el(".tr-tall-hode", "Regn selv"),
        el(".tr-tall-rad", inp, t.enhet ? el("span.tr-tall-enhet", t.enhet) : null,
          el("button.btn.primary.sm", { type: "button", "data-ov-sjekk": k.id, onclick: () => trTall(økt() || o, k, q, inp.value) }, "Sjekk")),
        el("p.tiny.muted", { style: { margin: "8px 0 0" } }, "Punktum eller komma som desimaltegn." + (t.enhet === "%" ? " Brøken godtas også." : ""))));
      boks.appendChild(el(".row.wrap", { style: { gap: "10px", marginTop: "6px" } },
        el("button.btn.ghost.sm", { type: "button", title: "Teller som hjelp: riktig svar gir Usikker som forslag", onclick: () => { lagreSvar(økt() || o, k.id, { alt: true }); S.app.refresh(); } }, "Vis alternativene"),
        el("button.btn.ghost.sm", { type: "button", onclick: () => { lagreRett(økt() || o, k.id, { ok: false, valg: -1, gaOpp: true }); S.app.refresh(); } }, "Jeg står fast")));
      return boks;
    }
    const alt = el("div", { style: { marginTop: "6px" } });
    q.options.forEach((tekst, i) => {
      let kls = "button.opt";
      if (r) kls += i === q.answer ? ".correct" : i === r.valg ? ".wrong" : ".dim";
      alt.appendChild(el(kls, { disabled: !!r, "data-ov-valg": i, onclick: () => { if (!r) { lagreRett(økt() || o, k.id, { ok: i === q.answer, valg: i, hjelp: !!inn.alt }); S.app.refresh(); } } },
        el(".key", String.fromCharCode(65 + i)), el("span", frag(String(tekst)))));
    });
    boks.appendChild(alt);
    if (!r) return boks;
    const fasit = el(".tr-fasit");
    fasit.appendChild(el(".tr-resultat." + (r.ok ? "rett" : "galt"), r.gaOpp ? "Ikke besvart" : r.ok ? "Riktig" : "Ikke riktig"));
    if (r.tall != null) fasit.appendChild(el("p.tr-tallsvar" + (r.ok ? ".rett" : ""), r.ok ? `Tallet ditt er innenfor det godtatte avviket. Eksakt verdi: ${visTall(q.tall.verdi, q.tall.enhet)}.`
      : `Tallet ditt, ${r.tall}, er ikke riktig. Riktig verdi: ${visTall(q.tall.verdi, q.tall.enhet)}.`));
    if (!r.ok && r.valg >= 0 && q.traps && q.traps[r.valg]) fasit.appendChild(el(".ov-felle", el("b", r.tall != null ? "Tallet ditt traff en felle: " : "Ditt valg: "), frag(q.traps[r.valg])));
    fasit.appendChild(el(".explain", prosa(q.kort)));
    const åpen = visFull[k.id] != null ? visFull[k.id] : !r.ok;
    const full = el(".tr-full", { hidden: !åpen }, prosa(q.full), lesMer(k));
    const knapp = el("button.btn.sm" + (åpen ? ".ghost" : ""), { type: "button", "data-ov-full": k.id,
      onclick: () => { visFull[k.id] = full.hidden; full.hidden = !full.hidden; knapp.textContent = full.hidden ? "Vis hele løsningen" : "Skjul løsningen"; } },
      åpen ? "Skjul løsningen" : "Vis hele løsningen");
    fasit.appendChild(el(".row", { style: { marginTop: "12px" } }, knapp));
    fasit.appendChild(full);
    boks.appendChild(fasit);
    if (!o.vurdert[k.id]) boks.appendChild(vurderingsRad(o, k, null));
    return boks;
  }
  function trTall(o, k, q, rå) {
    if (tom(rå)) return;
    const kand = tolk(rå, q.tall.enhet);
    if (!kand) { S.u.toast("Fant ikke et tall. Skriv for eksempel 1 234.5, 0.25 eller −12."); return; }
    const t = q.tall;
    if (kand.some((x) => innenfor(x, t))) { lagreRett(o, k.id, { ok: true, valg: q.answer, tall: String(rå).trim() }); S.app.refresh(); return; }
    let treff = -1;
    (t.alt || []).forEach((v, j) => { if (j !== q.answer && typeof v === "number" && kand.some((x) => innenfor(x, t, v))) treff = j; });
    lagreRett(o, k.id, { ok: false, valg: treff, tall: String(rå).trim() });
    S.app.refresh();
  }

  /* ================= siden ================= */
  const GRUNN = { lik: ["Lik oppgave", "rose"], lær: ["Lærer", "amber"], rep: ["Repetisjon", "slate"], ny: ["Ny", "green"], ekstra: ["Ekstra øving", "slate"] };

  function statistikk(nå) {
    const alle = alleKort().filter(iFokus());
    let nå_ = 0, lærer = 0, nye = 0, imorgen = 0, sikre = 0;
    const morgen = dagStart(nå) + DAG, t = teller();
    alle.forEach((k) => {
      const s = tilstand(k);
      if (!s.st) { nye++; return; }
      if (s.st === 1 || s.st === 3) lærer++;
      if (forfalt(s, nå, t)) nå_++;
      else if (s.due <= morgen + DAG - 1) imorgen++;
      if (s.st === 2 && (s.s || 0) >= 7) sikre++;
    });
    return { forfalt: nå_, lærer, nye, imorgen, sikre, totalt: alle.length };
  }

  function hode(nå) {
    const st = statistikk(nå), dag = dagLogg(nå), v = valg(), ov = OV() || {};
    const eks = eksamenMs();
    const dager = eks && nå < eks ? Math.round((dagStart(eks) - dagStart(nå)) / DAG) : null;
    const kort = el(".card.ov-hode");
    kort.appendChild(el(".ov-tall",
      tallBoks(dag.n || 0, "i dag", dag.n ? `${Math.round(100 * (dag.r || 0) / dag.n)} % riktig` : ""),
      tallBoks(st.forfalt, "til repetisjon nå", st.lærer ? `${st.lærer} under læring` : ""),
      tallBoks(st.nye, "nye igjen", `av ${st.totalt} kort`),
      tallBoks(st.sikre, "sitter godt", "7+ dager"),
      dager != null ? tallBoks(dager, dager === 1 ? "dag til eksamen" : "dager til eksamen", st.imorgen ? `${st.imorgen} i morgen` : "") : null));
    const deler = [{ del: 0, kort: "Alle" }].concat((ov.deler || []).map((d) => ({ del: d.del, kort: d.kort, navn: d.navn })));
    /* «Alle» nullstiller. En del slår seg av og på, så du kan øve på for eksempel
       del 1 og 2 sammen. Velger du alle delene, er det det samme som «Alle». */
    const valgt = fokusDeler(), antallDeler = (ov.deler || []).length;
    const på = (d) => (d.del ? valgt.includes(d.del) : !valgt.length);
    const veksle = (d) => {
      if (!d.del) return 0;
      const ny = valgt.includes(d.del) ? valgt.filter((x) => x !== d.del) : valgt.concat(d.del).sort();
      return !ny.length || ny.length >= antallDeler ? 0 : ny;
    };
    const chips = el(".row.wrap.ov-fokus", el("span.tiny.muted", "Fokus:"),
      ...deler.map((d) => el("button.chip" + (på(d) ? ".på" : ""), { type: "button", title: d.navn || "Hele pensum", "aria-pressed": String(på(d)),
        onclick: () => { settValg({ fokus: veksle(d) }); const o = økt(); if (o && !Object.keys(o.vurdert || {}).length && !Object.keys(o.rett || {}).length) nyOppgave(Date.now()); S.app.refresh(); } }, d.kort)),
      el("span.tiny.muted", valgt.length ? "Trykk flere deler for å øve på dem sammen." : ""));
    const inst = el("details.ov-innstillinger", el("summary.tiny", "Innstillinger og slik virker det"),
      el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "10px" } }, el("span.tiny.muted", "Hele oppgaver:"),
        ...[["av", "Av og til"], ["ofte", "Ofte"], ["aldri", "Aldri"]].map(([id, navn]) => el("button.chip" + (v.hel === id ? ".på" : ""), { type: "button", onclick: () => { settValg({ hel: id }); S.app.refresh(); } }, navn))),
      el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "8px" } }, el("span.tiny.muted", "Claude retter med:"),
        ...[[OPUS, "Opus 5.5 (best)"], [SONNET, "Sonnet 5.5 (raskere, billigere)"]].map(([id, navn]) => el("button.chip" + (v.modell === id ? ".på" : ""), { type: "button", onclick: () => { settValg({ modell: id }); S.app.refresh(); } }, navn))),
      el(".prose.tiny", { style: { marginTop: "10px" } }, frag(`<p>Hver deloppgave er et kort. Etter svaret vurderer du hvor godt det satt, og det bestemmer når kortet kommer tilbake: <b>Misforståelse</b> gir en lignende oppgave med nye tall med en gang, så igjen om ti minutter og i morgen. <b>Slurvefeil</b> gir én gang til i økta. <b>Usikker</b>, <b>Greit</b> og <b>Lett</b> gir stadig lengre pauser. Et kort kommer tilbake etter et antall andre kort eller et antall dager, det som kommer først. Knappene viser begge, for eksempel «40 kort · 5 d». Antall kort dobles for hver gang du har det riktig på rad. Dagene regnes av FSRS, den samme planleggeren som Anki bruker. Før eksamen er pausen høyst en tredjedel av dagene som er igjen.</p><p>Neste oppgave er først det du holder på å lære, så repetisjoner som har forfalt, så nye oppgaver fra temaene der du har flest feil, vektet med hvor mye temaet teller på eksamen. Hver gang et kort kommer tilbake, får du nye tall. Tastatur: Enter sjekker, 1–5 vurderer.</p>`)));
    kort.appendChild(chips);
    kort.appendChild(inst);
    return kort;
  }
  const tallBoks = (n, l, under) => el(".ov-tallboks", el(".v", String(n)), el(".l", l), under ? el(".u", under) : null);

  /* Bare en ny oppgave toner inn. Siden tegnes på nytt ved hver sjekk og vurdering,
     og da ville hele siden glidd inn igjen hver gang. */
  let sistTegnet = null;
  function render() {
    const wrap = el(".ov");
    wrap.appendChild(sh().pageHead("Øving", "Øv uten stopp", "Oppgave etter oppgave i eksamensformat. Appen husker hva du kan og velger det som er best å øve på nå."));
    if (!OV() || !TR()) {
      sikreData();
      wrap.appendChild(el(".card", lastefeil ? el("p", "Fikk ikke lastet oppgavene: " + lastefeil.message) : el("p.muted", "Laster oppgavene …")));
      return wrap;
    }
    const nå = Date.now();
    wrap.appendChild(hode(nå));
    let o = økt();
    if (!o || !o.kort || !o.kort.every((id) => kortById(id))) o = nyOppgave(nå);
    if (!o) { wrap.appendChild(el(".card", el("p", "Ingen oppgaver med dette fokuset."))); return wrap; }
    const k0 = kortById(o.kort[0]);
    const tema = ((OV().temaer || []).find((t) => t.id === k0.tema)) || {};
    const g = GRUNN[o.grunn] || GRUNN.ny;
    const kortEl = el(".card.pad-lg.ov-kort" + (sistTegnet !== o.id ? ".fade-in" : ""));
    sistTegnet = o.id;
    const tittel = k0.kilde === "ov" ? k0.o.tittel : null;
    kortEl.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginBottom: "10px" } },
      el(".chip." + g[1], g[0]), el(".chip.slate", tema.kort || k0.tema),
      tittel ? el("span.ov-tittel", tittel) : el("span.tiny.muted", "Fra eksamenstreningen"),
      el(".spacer"),
      k0.kilde === "ov" && k0.o.kilde ? el("span.tiny.muted", "Som " + k0.o.kilde) : null));
    o.kort.forEach((id, i) => {
      const k = kortById(id);
      if (o.hel && i > 0) kortEl.appendChild(el("hr.ov-skille"));
      kortEl.appendChild(kortVisning(o, k, i === 0));
    });
    const alleVurdert = o.kort.every((id) => o.vurdert[id]);
    kortEl.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginTop: "18px" } },
      el("button.btn.ghost.sm", { type: "button", title: "Kommer tilbake senere", onclick: () => hoppOver(økt() || o) }, "Hopp over"),
      !o.hel && k0.kilde === "ov" && k0.o.deler.length > 1 && !o.rett[k0.id] ? el("button.btn.ghost.sm", { type: "button", title: "Alle deloppgavene i samme variant, som på eksamen", onclick: () => taHele(økt() || o) }, "Ta hele oppgaven") : null,
      el(".spacer"),
      alleVurdert ? el("button.btn.primary", { type: "button", onclick: () => { nyOppgave(Date.now()); S.app.refresh(); tilToppen(); } }, "Neste →") : null));
    wrap.appendChild(kortEl);
    if (k0.kilde === "ov" && k0.o.sjanger && S.symboler && S.symboler.merk) {
      try { S.symboler.merk(kortEl, "sg-" + k0.o.sjanger, { overalt: true }); } catch (e) { /* symbolene er pynt */ }
    }
    wrap.appendChild(el("p.tiny.muted", { style: { marginTop: "10px" } }, "Tastatur: Enter sjekker svaret. Etter rettingen velger 1–5 vurderingen, og Enter tar forslaget."));
    return wrap;
  }

  /* Tastatur: Enter og 1–5 når du ikke skriver i et felt. */
  document.addEventListener("keydown", (e) => {
    if (!/^#\/ov\b/.test(location.hash) || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target, skriver = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (skriver) return;
    const rad = document.querySelector(".ov-vurder");
    const knapper = rad ? [...rad.querySelectorAll("[data-ov-vurder]")] : [];
    if (/^[1-5]$/.test(e.key) && knapper.length) {
      const b = knapper[Number(e.key) - 1];
      if (b) { e.preventDefault(); b.click(); }
      return;
    }
    if (e.key === "Enter") {
      const fs = rad ? rad.querySelector("button.ov-vk.forslag") : null;
      if (fs) { e.preventDefault(); fs.click(); return; }
      const sj = document.querySelector("[data-ov-sjekk]");
      if (sj) { e.preventDefault(); sj.click(); }
    }
  });

  /* Kort som har forfalt, til merket i menyen. Trenger ikke dataene: tilstanden
     ligger i lagringen. */
  function antallForfalt() {
    const nå = Date.now(), ex = exams(), t = (ex["ovteller"] || {}).n || 0;
    let n = 0;
    for (const key in ex) {
      if (key.charCodeAt(0) !== 111 || !key.startsWith("ov:") || key === "ov:okt" || key === "ov:valg") continue;
      const s = ex[key];
      if (forfalt(s, nå, t)) n++;
    }
    return n;
  }

  /* Kortet øverst i dashbordets sidekolonne. Trenger ikke dataene. */
  function dashbordkort() {
    if (!finnes() || !S.hasModule("/ov")) return null;
    const n = antallForfalt(), dag = dagLogg(Date.now());
    const kort = el(".card");
    kort.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Øv uten stopp"), el(".spacer"),
      el(".see-all", { onclick: sh().go("#/ov") }, "Åpne →")));
    kort.appendChild(el("p.tiny.muted", { style: { margin: "6px 0 12px" } },
      (n ? `${n} ${n === 1 ? "oppgave" : "oppgaver"} til repetisjon nå. ` : "")
      + (dag.n ? `I dag: ${dag.n} oppgaver, ${Math.round(100 * (dag.r || 0) / dag.n)} % riktig.` : "Oppgave etter oppgave i eksamensformat, med repetisjon som Anki.")));
    kort.appendChild(el("a.btn.primary.sm", { href: "#/ov" }, dag.n ? "Fortsett" : "Start"));
    return kort;
  }

  S.views.ov = { render, finnes, antallForfalt, dashbordkort, _test: { planlegg, huskes, intervall, forfall, dagStart, D0, W, kortEtter, forfalt } };
})(window.EDU);
