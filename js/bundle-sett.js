/* ===================== EKSAMENSSETT — hele sett, to moduser =====================
   Faget leverer ferdige eksamenssett i EDU_DATA.sets. Modulen kjører dem på to
   måter, og forskjellen er pedagogisk, ikke kosmetisk:

     Øvingsmodus    én oppgave om gangen. Fasiten er låst til du selv sier at du
                    har skrevet svaret. Å lese en løsning man ikke har forsøkt på
                    gir gjenkjennelse, ikke kunnskap. Fasiten kan åpnes for én
                    deloppgave om gangen, så du kan sjekke a) før du går løs på b).
     Eksamensmodus  hele settet samtidig, med nedtelling. Ingen fasit er nåbar
                    noe sted før du leverer. Det er tidspresset som er poenget.

   Flervalg. En oppgave eller deloppgave med `options` og `answer` rettes
   automatisk: riktig gir poengene, galt gir poengene × wrongFactor, ubesvart 0.
   Faktoren er 0 der feil svar ikke straffes, og −1/3 i formatet med minuspoeng
   (3 for rett, −1 for feil, fire alternativer — forventet verdi av å gjette
   blindt er null). `answer` er en indeks, eller en liste når fasiten godtar
   flere. Åpne oppgaver vurderes fortsatt selv, så et sett kan blande begge.

   Prøveeksamener. Et sett med kind: "mock" er laget for faget, ikke gitt av
   kurset. Lista viser dem i en egen del, så de aldri blandes med de ekte
   eksamenene. Ellers kjøres de nøyaktig likt.

   Et sett kan ha `badge` (for eksempel «Vanskeligere»), som vises som en brikke
   ved navnet i lista.

   Svake temaer. Et sett med kind: "svak" øver bare på temaer du har svart feil på
   eller merket som usikre. Slike sett kommer fra en privat utvidelse, ikke fra
   faget, så fanen «Svake temaer» vises bare for den som har dem. Ellers kjøres de
   som prøveeksamenene.

   Per forelesning. Et sett med kind: "forelesning" øver på én forelesning og har
   `nr` for rekkefølgen. Fanen «Per forelesning» viser dem sortert, med en linje
   øverst om hvor mange som er gjort. Til sammen dekker de hvert punkt i
   sjekklisten (ledd.dekker). Ellers kjøres de som prøveeksamenene.

   Per del. Et sett med kind: "del" øver på én del av pensum og har `del` (1, 2, 3 …)
   og `art` (for eksempel "forventet" eller "vri"). Fanen «Per del» viser én del om
   gangen, med settene gruppert etter art. Navnene på delene og artene og teksten
   øverst kommer fra EDU_DATA.perDel. Ellers kjøres de som prøveeksamenene.

   Egne faner for en art (24. november 2026). En art som står i EDU_DATA.perDel.faner
   ({ art, navn, intro }) får sin egen fane i stedet for å vises under «Per del».
   Fanen viser én del om gangen som «Per del», men uten overskrift per art.

   Kortsvar (26. november 2026). EDU_DATA.perDel.kortsvar ({ del, navn, tekst }) gir
   «Per del» et eget valg før Del 1, 2, 3 med settene som har den del-verdien (for
   FIE402 "kort"): de korte drøftingsoppgavene, lånt fra kildesettene. En oppgave et
   kortsvarsett låner, tas ut av de andre deleksamenene (utenKortsvar), så den bare
   står ett sted. Oppgavene som blir igjen, beholder n (lagringsnøkkelen, så lagret
   fremdrift ikke flytter seg), men vises med løpenummer (visN). Poeng, minutter og
   antall oppgaver regnes om.

   Lånte oppgaver. Et sett med `lån` (en liste med { sett, n, merke }) har ingen egne
   oppgaver, men låner dem fra andre sett. Motoren slår dem opp når lista leses, og
   gjenbruker oppslaget, så setById gir samme objekt hver gang. Oppgavene nummereres
   1, 2, 3 … i det nye settet, siden n er lagringsnøkkelen. Hver får `kilde`
   (settet og oppgaven den kom fra) og `merke`, som vises ved oppgaven. En rettelse i
   kildesettet gjelder dermed også her, mens fremdriften lagres per sett.

   Må kunne (26. november 2026). Et sett med kind: "must" er én oppgave i
   Eksamenstrening, fanen «Må kunne» (bundle-trening.js), ikke et eksamenssett. Lista
   her viser dem aldri. Eksamenstrening åpner dem med åpne(settId, { tilbake }), og
   knappen øverst går da tilbake dit i stedet for til lista. Metadataene (tiers og
   oppgavetyper) står i EDU_DATA.mustKunne.

   Kartlegging. Et sett med kind: "kartlegging" er en diagnose, ikke en eksamen.
   Det får en egen fane, kjøres alltid med hele settet synlig, uten nedtelling
   (klokka viser brukt tid) og uten minuspoeng. Hvert ledd har en «Vet ikke»-knapp
   (valg −1), et tema fra EDU_DATA.kartlegging.temaer og en diag-tekst per galt
   alternativ. Etter levering samler rapporten leddene per tema: hva som sitter,
   hva som må øves, hvilke feil du gjorde, og lenker til der du øver på det.

   Usikker. Hver deloppgave (eller oppgave uten deler) kan merkes som usikker, i
   begge moduser, så du finner tilbake til den selv om svaret ble riktig. Flervalg du
   har svart feil på, kommer med automatisk. Lista øverst samler begge, og en feil står
   som «feil» også når den er merket usikker. Øvingsmodus kan vise bare dem.

   Kopier det jeg ikke kunne (25. november 2026). Én knapp kopierer en beskrivelse av
   alt du ikke fikk full uttelling på eller merket som usikkert: oppgaven, svaret ditt,
   fasiten, feilen og Claudes retting. Bare beskrivelsen, ingen bestilling, så den kan
   brukes til hva som helst. Se «det du ikke kunne» nederst i filen.

   Fremdrift lagres i state.exams under nøklene "<settId>-run" (økta),
   "<settId>-e<n>" (selvvurdering per oppgave og `åpne` med deloppgavene du har åpnet
   fasiten for i øving), "<settId>-u<n>[-<del>]" (usikker-merket)
   og "<settId>-f<n>[-<del>]" (feil fra et rettet svar som siden er slettet),
   og synkes dermed som alt annet. */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon, frag } = S.u;
  const sh = () => S.views.shared;
  /* Lånte sett slås opp når lista leses, aldri når filen lastes: fagdata lastes
     etter motoren. WeakMap-en gjør at samme sett gir samme objekt hver gang. */
  const lånt = new WeakMap();
  function slåOppLån(set, alle) {
    if (lånt.has(set)) return lånt.get(set);
    const oppgaver = [];
    set.lån.forEach((ref) => {
      const kilde = alle.find((s) => s.id === ref.sett && !s.lån);
      const ex = kilde && (kilde.exercises || []).find((e) => e.n === ref.n);
      if (!ex) { console.warn(`[sett] ${set.id}: fant ikke ${ref.sett} oppgave ${ref.n}`); return; }
      oppgaver.push(Object.assign({}, ex, { n: oppgaver.length + 1, kilde: `${kilde.label} · oppgave ${ex.n}`, merke: ref.merke || "", kildeId: kilde.id, kildeN: ex.n }));
    });
    const løst = Object.assign({}, set, { exercises: oppgaver, note: set.note || hentetFra(oppgaver), _lagetNote: !set.note });
    lånt.set(set, løst);
    return løst;
  }
  const hentetFra = (oppgaver) => {
    const k = oppgaver.map((e) => e.kilde).filter(Boolean);
    return k.length ? "Hentet fra " + (k.length > 1 ? k.slice(0, -1).join(", ") + " og " + k[k.length - 1] : k[0]) + "." : "";
  };
  const perDel = () => window.EDU_DATA.perDel || {};
  const KORT = () => (perDel().kortsvar || {}).del;
  /* Oppgavene kortsvarsettene låner, som "<settId>:<n>" i kildesettet. */
  function kortsvarRefs(alle) {
    const k = KORT(), ut = new Set();
    if (k == null) return ut;
    alle.forEach((s) => { if (s.kind === "del" && s.del === k) (s.lån || []).forEach((r) => ut.add(r.sett + ":" + r.n)); });
    return ut;
  }
  /* En deleksamen uten oppgavene som står under Kortsvar. Samme objekt hver gang. */
  const utenKort = new WeakMap();
  function utenKortsvar(set, refs) {
    if (utenKort.has(set)) return utenKort.get(set);
    const alle = set.exercises || [];
    const igjen = alle.filter((ex) => !refs.has(`${ex.kildeId || set.id}:${ex.kildeN || ex.n}`));
    let løst = set;
    if (igjen.length && igjen.length < alle.length) {
      const poeng = igjen.reduce((a, ex) => a + (ex.points || 0), 0);
      const exercises = igjen.map((ex, i) => (ex.n === i + 1 ? ex : Object.assign({}, ex, { visN: i + 1 })));
      løst = Object.assign({}, set, { exercises, points: poeng,
        minutes: Math.max(5, Math.round(((set.minutes || 0) * poeng) / (set.points || poeng) / 5) * 5),
        format: igjen.length === 1 ? "1 oppgave" : `${igjen.length} oppgaver`,
        note: set._lagetNote ? hentetFra(exercises) : set.note });
    }
    utenKort.set(set, løst);
    return løst;
  }
  const SETS = () => {
    const alle = window.EDU_DATA.sets || [];
    const løst = alle.map((s) => (s.lån ? slåOppLån(s, alle) : s));
    const refs = kortsvarRefs(alle), k = KORT();
    return refs.size ? løst.map((s) => (s.kind === "del" && s.del !== k ? utenKortsvar(s, refs) : s)) : løst;
  };
  /* Nummeret som vises. n er lagringsnøkkelen og kan ha hull etter utenKortsvar. */
  const nrAv = (ex) => ex.visN || ex.n;

  /* ---------- lokal tilstand (ikke persistert: hvor du er, ikke hva du har gjort) ---------- */
  let openSet = null;      // settId, eller null for listevisningen
  let mode = "practice";   // "practice" | "exam"
  let cursor = 0;          // hvilken oppgave som vises i øvingsmodus
  let ticker = null;       // intervallet som teller ned
  let del = "eksamen";     // "eksamen" | "prove" | "pd" | "pd:<art>" | "svak" | "fl" | "kart": hvilken del av lista som vises
  let valgtDel = null;     // hvilken pensumdel fanen «Per del» viser
  let bareUsikre = false;  // øvingsmodus viser bare oppgaver som er usikre eller feil
  let tilbake = null;      // { tekst, hash } når settet ble åpnet fra en annen side (Må kunne)
  /* Fasitpaneler du selv har lukket (true) eller åpnet (false), som
     "<settId>|<n>|<del>". Uten et eget valg avgjør svaret: riktig gir lukket fasit,
     alt annet åpen. Bare i minnet: valget overlever at visningen tegnes på nytt,
     men ikke at siden lastes på nytt. */
  const fasitValg = new Map();
  const fasitNøkkel = (setId, n, hva) => setId + "|" + n + "|" + hva;
  /* Ny retting av en del: svaret avgjør igjen, også for den samlede kommentaren. */
  function glemFasitValg(setId, n, e) {
    fasitValg.delete(fasitNøkkel(setId, n, e === "" ? "hel" : e));
    fasitValg.delete(fasitNøkkel(setId, n, "kommentar"));
  }

  const erKart = (set) => !!set && set.kind === "kartlegging";
  const VET_IKKE = -1;     // valget «Vet ikke» i kartleggingen

  function stopTicker() { if (ticker) { clearInterval(ticker); ticker = null; } }
  const setById = (id) => SETS().find((s) => s.id === id) || null;

  /* ---------- persistert tilstand ---------- */
  const runKey = (setId) => setId + "-run";
  const exKey = (setId, n) => setId + "-e" + n;
  const readKey = (k) => S.store.get().exams[k] || {};
  const run = (setId) => readKey(runKey(setId));
  const exState = (setId, n) => readKey(exKey(setId, n));

  /* En eksamensøkt starter blank. Valg, avsløringer og poeng fra øvingsmodus
     ville ellers blitt med inn i resultatet — og et flervalg du alt har sett
     fasiten på, er ikke en eksamen. */
  function startRun(setId, m, wrongFactor) {
    const st = S.store.get(); const set = setById(setId);
    if (set) noterFeil(set);
    ((set && set.exercises) || []).forEach((ex) => delete st.exams[exKey(setId, ex.n)]);
    S.store.setExam(runKey(setId), { mode: m, startedAt: S.u.nowTs(), submittedAt: null, wrongFactor: wrongFactor });
  }
  function submitRun(setId) {
    S.store.setExam(runKey(setId), { submittedAt: S.u.nowTs() });
    const set = setById(setId); if (set) noterFeil(set);
  }
  function resetRun(setId) {
    const st = S.store.get(); const set = setById(setId);
    if (set) noterFeil(set);
    delete st.exams[runKey(setId)];
    ((set && set.exercises) || []).forEach((ex) => delete st.exams[exKey(setId, ex.n)]);
    S.store.emit();
  }
  const isSubmitted = (setId) => !!run(setId).submittedAt;
  /* Poeng vises med norsk komma og ekte minustegn — «−0,67», ikke «-0.67». */
  const pts = (n) => (typeof n === "number" ? n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }).replace("-", "−") : String(n));

  /* Fasit er synlig når settet er levert, eller når du selv har åpnet den i
     øvingsmodus. Har du levert, forblir den åpen også om du bytter til øving —
     å låse den igjen etterpå ville bare vært irriterende. */
  function solutionOpen(setId, n) {
    if (isSubmitted(setId)) return true;
    return mode === "exam" ? false : !!exState(setId, n).revealed;
  }
  function reveal(setId, n) {
    S.store.setExam(exKey(setId, n), { revealed: true });
    const set = setById(setId); if (set) noterFeil(set, n);
  }
  /* Fasiten for én deloppgave i øving (fra 21. november 2026). De åpnede delene
     lagres som { "<etikett>": 1 } i `åpne`. Når alle delene er åpnet, regnes hele
     oppgaven som åpnet, så poengsummen og «Prøv på nytt» kommer som før. */
  const åpneDeler = (setId, n) => exState(setId, n).åpne || {};
  function delOpen(setId, n, etikett) {
    if (solutionOpen(setId, n)) return true;
    return mode !== "exam" && !!åpneDeler(setId, n)[etikett];
  }
  function revealDel(set, ex, etikett) {
    const åpne = Object.assign({}, åpneDeler(set.id, ex.n), { [etikett]: 1 });
    S.store.setExam(exKey(set.id, ex.n), { åpne });
    if ((ex.parts || []).every((p) => åpne[p.label])) { reveal(set.id, ex.n); mcLagreScore(set, ex); }
    else noterFeil(set, ex.n);
  }
  const harÅpneDeler = (setId, n) => Object.values(åpneDeler(setId, n)).some(Boolean);
  function setScore(setId, n, score) { S.store.setExam(exKey(setId, n), { score: score, scoredAt: S.u.nowTs(), scoreKilde: "selv" }); }
  /* «Prøv på nytt» i øving: lukker fasiten og fjerner svar og poeng for én
     oppgave. Skriver tomme verdier i stedet for å slette nøkkelen, ellers ville
     synken hentet det gamle svaret tilbake fra den andre enheten. */
  function prøvIgjen(setId, n) {
    const set = setById(setId); if (set) noterFeil(set, n);
    S.store.setExam(exKey(setId, n), { revealed: false, åpne: null, valg: null, score: null, scoredAt: null, scoreKilde: null, inn: null, rett: null });
    /* Nytt forsøk: svaret avgjør igjen om fasiten står åpen. */
    const pre = fasitNøkkel(setId, n, "");
    fasitValg.forEach((_, k) => { if (k.startsWith(pre)) fasitValg.delete(k); });
  }

  /* ---------- usikker ---------- */
  /* Deloppgaver du vil tilbake til, også når svaret ble riktig. Merket settes
     per deloppgave, eller på oppgaven når den ikke har deler (etikett ""). Egen
     nøkkel, så merket overlever eksamensstart og nullstilling. Å fjerne merket
     skriver u: 0, av samme grunn som over. */
  const usKey = (setId, n, etikett) => setId + "-u" + n + (etikett ? "-" + etikett : "");
  const erUsikker = (setId, n, etikett) => readKey(usKey(setId, n, etikett)).u === 1;
  /* Etikettene som er merket i en oppgave. "" er hele oppgaven: oppgaver uten
     deler, og merker satt på hele oppgaven før merket ble flyttet til deloppgavene. */
  const merkedeDeler = (setId, ex) => ["", ...(ex.parts || []).map((p) => p.label)].filter((e) => erUsikker(setId, ex.n, e));
  const harUsikker = (setId, ex) => merkedeDeler(setId, ex).length > 0;

  /* ---------- feil ---------- */
  /* Ledd du har svart feil på. Når oppgaven er rettet, leses feilen av det
     lagrede svaret. Før svarene slettes (ny eksamensøkt, nullstilling, «Prøv på
     nytt») og når et svar rettes, skrives resultatet ned under en egen nøkkel.
     Slik blir feilen stående i oversikten til et senere, rettet svar er riktig. */
  const feilKey = (setId, n, etikett) => setId + "-f" + n + (etikett ? "-" + etikett : "");
  /* Et ledd er rettet når settet er levert, hele oppgaven er åpnet, eller fasiten
     for akkurat den deloppgaven er åpnet i øving. */
  const rettet = (setId, n, nøkkel) => isSubmitted(setId) || !!exState(setId, n).revealed || (!!nøkkel && !!åpneDeler(setId, n)[nøkkel]);
  /* true = feil nå, false = riktig nå, null = ikke rettet eller ikke besvart. */
  function feilNå(set, ex, ledd) {
    if (!rettet(set.id, ex.n, ledd.nøkkel)) return null;
    const i = (exState(set.id, ex.n).valg || {})[ledd.nøkkel];
    if (i == null || i === VET_IKKE) return null;
    return !riktig(ledd, i);
  }
  function erFeil(set, ex, ledd) {
    const nå = feilNå(set, ex, ledd);
    return nå !== null ? nå : readKey(feilKey(set.id, ex.n, ledd.nøkkel)).f === 1;
  }
  function noterFeil(set, kunN) {
    (set.exercises || []).forEach((ex) => {
      if (kunN != null && ex.n !== kunN) return;
      mcLedd(ex).forEach((ledd) => {
        const nå = feilNå(set, ex, ledd);
        if (nå === null) return;
        const k = feilKey(set.id, ex.n, ledd.nøkkel);
        if ((readKey(k).f === 1) !== nå) S.store.setExam(k, { f: nå ? 1 : 0, t: S.u.nowTs() });
      });
    });
  }
  const feilDeler = (set, ex) => mcLedd(ex).filter((ledd) => erFeil(set, ex, ledd)).map((ledd) => ledd.nøkkel);
  /* Usikre og feil samlet per deloppgave, i oppgavens rekkefølge. */
  function merkede(set) {
    return (set.exercises || []).flatMap((ex) => {
      const us = merkedeDeler(set.id, ex), fe = feilDeler(set, ex);
      return ["", ...(ex.parts || []).map((p) => p.label)].filter((e) => us.includes(e) || fe.includes(e))
        .map((etikett) => ({ ex, etikett, usikker: us.includes(etikett), feil: fe.includes(etikett) }));
    });
  }
  const harMerke = (set, ex) => harUsikker(set.id, ex) || feilDeler(set, ex).length > 0;
  function merkUsikker(setId, n, etikett, på) {
    S.store.setExam(usKey(setId, n, etikett), { u: på ? 1 : 0, t: S.u.nowTs() });
    S.u.toast(på ? "Merket som usikker. Du finner den øverst under Eksamenssett" : "Usikker-merket er fjernet");
  }
  function usikkerKnapp(set, ex, etikett, tekst) {
    const på = erUsikker(set.id, ex.n, etikett);
    return el("button.chip.tr-merk" + (på ? ".på" : ""), { type: "button", "aria-pressed": String(på),
      title: på ? "Fjern merket" : "Merk deloppgaven så du finner tilbake til den, også om svaret ble riktig",
      onclick: () => { merkUsikker(set.id, ex.n, etikett, !på); S.app.refresh(); } }, (på ? "⚑ " : "⚐ ") + (tekst || "Usikker"));
  }
  /* Deloppgavens hode: etikett, usikker-knapp og poeng. */
  function delHode(set, ex, part) {
    return el(".row", { style: { gap: "8px", alignItems: "center" } }, el(".part-label", part.label + ")"), el(".spacer"),
      usikkerKnapp(set, ex, part.label),
      part.points ? el(".tiny.muted", `${part.points} p`) : null);
  }
  /* Åpner en oppgave direkte i øvingsmodus. */
  function åpneOppgave(set, ex) {
    openSet = set.id; mode = "practice"; bareUsikre = true;
    cursor = Math.max(0, (set.exercises || []).indexOf(ex));
    S.app.refresh();
  }

  /* ---------- flervalg ---------- */
  /* Valgene lagres per oppgave som { "<deletikett>": indeks }; en oppgave uten
     deloppgaver bruker nøkkelen "". Å velge det valgte på nytt fjerner svaret —
     med minuspoeng er «blankt» en ekte strategi, ikke en glipp. */
  function velg(setId, n, nøkkel, i) {
    const st = exState(setId, n); const valg = Object.assign({}, st.valg || {});
    if (valg[nøkkel] === i) delete valg[nøkkel]; else valg[nøkkel] = i;
    S.store.setExam(exKey(setId, n), { valg: valg });
  }
  /* Alle flervalgsleddene i en oppgave, i rekkefølge. */
  function mcLedd(ex) {
    const ut = [];
    if (ex.options) ut.push({ nøkkel: "", options: ex.options, answer: ex.answer, points: ex.points || 0, tema: ex.tema, diag: ex.diag });
    (ex.parts || []).forEach((p) => { if (p.options) ut.push({ nøkkel: p.label, options: p.options, answer: p.answer, points: p.points || 0, tema: p.tema, diag: p.diag }); });
    return ut;
  }
  const erMC = (ex) => mcLedd(ex).length > 0;
  const settHarMC = (set) => (set.exercises || []).some(erMC);
  const riktig = (ledd, i) => Array.isArray(ledd.answer) ? ledd.answer.includes(i) : ledd.answer === i;

  /* Faktoren for feil svar: øktas valg, ellers settets, ellers 0. */
  function wrongFactor(set) {
    const r = run(set.id);
    if (typeof r.wrongFactor === "number") return r.wrongFactor;
    return (set.mc && typeof set.mc.wrongFactor === "number") ? set.mc.wrongFactor : 0;
  }
  /* Retter én oppgaves flervalgsledd. Returnerer poeng og tellinger. */
  function mcRett(set, ex, wf) {
    const st = exState(set.id, ex.n); const valg = st.valg || {};
    const r = { got: 0, of: 0, rett: 0, galt: 0, blank: 0, vet: 0 };
    mcLedd(ex).forEach((ledd) => {
      r.of += ledd.points;
      const i = valg[ledd.nøkkel];
      if (i == null) r.blank++;
      else if (i === VET_IKKE) r.vet++;
      else if (riktig(ledd, i)) { r.rett++; r.got += ledd.points; }
      else { r.galt++; r.got += ledd.points * wf; }
    });
    r.got = Math.round(r.got * 100) / 100;
    return r;
  }
  /* Skriver den automatiske poengsummen inn som oppgavens score, så resten av
     modulen (sum, ring, kort) ikke trenger å vite om flervalg. */
  function mcLagreScore(set, ex) {
    if (!erMC(ex)) return;
    setScore(set.id, ex.n, mcRett(set, ex, wrongFactor(set)).got);
  }
  function mcRettAlle(set) { (set.exercises || []).forEach((ex) => mcLagreScore(set, ex)); }

  function scoreSum(set) {
    let got = 0, of = 0, scored = 0;
    (set.exercises || []).forEach((ex) => {
      of += ex.points || 0;
      const s = exState(set.id, ex.n);
      if (typeof s.score === "number") { got += s.score; scored++; }
    });
    return { got: Math.round(got * 100) / 100, of, scored, total: (set.exercises || []).length };
  }

  /* ---------- tid ---------- */
  function remainingMs(set) {
    const r = run(set.id);
    if (!r.startedAt) return (set.minutes || 180) * 60000;
    const end = r.startedAt + (set.minutes || 180) * 60000;
    return end - (r.submittedAt || S.u.nowTs());
  }
  function fmtClock(ms) {
    const over = ms < 0; const t = Math.floor(Math.abs(ms) / 1000);
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    const pad = (x) => String(x).padStart(2, "0");
    return (over ? "+" : "") + (h ? h + ":" : "") + pad(m) + ":" + pad(s);
  }

  /* ================= listevisning ================= */
  function renderList() {
    const wrap = el(".fade-in");
    const alle = SETS();
    const prøver = alle.filter((x) => x.kind === "mock");
    const svake = alle.filter((x) => x.kind === "svak");
    const kart = alle.filter(erKart);
    const fl = alle.filter((x) => x.kind === "forelesning").sort((a, b) => (a.nr || 0) - (b.nr || 0));
    /* Arter med egen fane (perDel.faner) tas ut av «Per del» og får hver sin fane. */
    const egneFaner = (perDel().faner || []).map((f) => ({ f, id: "pd:" + f.art, sett: alle.filter((x) => x.kind === "del" && x.art === f.art) })).filter((g) => g.sett.length);
    const deler = alle.filter((x) => x.kind === "del" && !egneFaner.some((g) => g.f.art === x.art));
    const egenFane = egneFaner.find((g) => g.id === del);
    const ekte = alle.filter((x) => x.kind !== "mock" && x.kind !== "svak" && x.kind !== "forelesning" && x.kind !== "del" && x.kind !== "must" && !erKart(x));
    if ((del === "prove" && !prøver.length) || (del === "pd" && !deler.length) || (del.startsWith("pd:") && !egenFane) || (del === "svak" && !svake.length) || (del === "fl" && !fl.length) || (del === "kart" && !kart.length)) del = "eksamen";
    const prøveDel = del === "prove", svakDel = del === "svak", flDel = del === "fl";
    const sets = prøveDel ? prøver : svakDel ? svake : flDel ? fl : ekte;
    const faner = () => {
      const seg = el(".seg", { style: { marginBottom: "16px" } });
      [["eksamen", `Tidligere eksamener (${ekte.length})`], prøver.length ? ["prove", `Prøveeksamener (${prøver.length})`] : null,
       deler.length ? ["pd", `Per del (${deler.length})`] : null,
       ...egneFaner.map((g) => [g.id, `${g.f.navn} (${g.sett.length})`]),
       fl.length ? ["fl", `Per forelesning (${fl.length})`] : null,
       svake.length ? ["svak", `Svake temaer (${svake.length})`] : null,
       kart.length ? ["kart", "Kartlegging"] : null].filter(Boolean).forEach(([d, label]) =>
        seg.appendChild(el("button" + (del === d ? ".on" : ""), { onclick: () => { if (del !== d) { del = d; S.app.refresh(); } } }, label)));
      return seg;
    };
    if (del === "kart") {
      wrap.appendChild(sh().pageHead("Eksamenssett", "Kartlegging",
        "Tre deler som til sammen dekker pensum. Svar så godt du kan, velg «Vet ikke» heller enn å gjette og merk ledd du er usikker på. Rapporten etterpå viser hva som sitter og hva du må jobbe med."));
      wrap.appendChild(faner());
      kartListe(wrap, kart);
      return wrap;
    }
    if (del === "pd") {
      wrap.appendChild(sh().pageHead("Eksamenssett", `Per del · ${deler.length} sett`,
        perDel().intro || "Sett med oppgaver fra bare én del av pensum."));
      wrap.appendChild(faner());
      perDelListe(wrap, deler);
      return wrap;
    }
    if (egenFane) {
      wrap.appendChild(sh().pageHead("Eksamenssett", `${egenFane.f.navn} · ${egenFane.sett.length} sett`,
        egenFane.f.intro || perDel().intro || ""));
      wrap.appendChild(faner());
      perDelListe(wrap, egenFane.sett, true);
      return wrap;
    }
    /* Ikke alle settene er eksamener: FIE432 har også flervalgstesten til
       kursgodkjenning. Undertittelen teller derfor sett. */
    wrap.appendChild(sh().pageHead("Eksamenssett", sets.length === 1 ? "1 sett" : `${sets.length} sett`,
      flDel
        ? "Ett sett per forelesning, i samme rekkefølge som kurset. Til sammen dekker de hvert punkt i sjekklisten, så når alle er gjort, er du testet på hele pensum. Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen."
        : svakDel
        ? "Nye oppgaver bare på temaene du har svart feil på eller merket som usikre. Kjør dem på tid med minuspoeng, og les fasiten på hvert feil svar etterpå."
        : prøveDel
        ? "Prøveeksamener laget i formatet du møter, bygd på det de tidligere eksamenene faktisk spør om. De er ikke gitt av kurset. Kjør dem på tid med minuspoeng, og les fasiten på hvert feil svar etterpå."
        : "Hele sett, slik de ble gitt. Kjør dem som øving med fasit underveis, eller som ekte eksamen på tid der fasiten først åpner seg når du leverer."));

    if (prøver.length || deler.length || egneFaner.length || svake.length || fl.length || kart.length) wrap.appendChild(faner());

    if (!sets.length) { wrap.appendChild(sh().empty("📄", "Ingen eksamenssett ennå", "Faget har ikke lagt inn sett i EDU_DATA.sets.")); return wrap; }

    const us = usikreKort(sets);
    if (us) wrap.appendChild(us);
    if (flDel) wrap.appendChild(flFremdrift(fl));

    const list = el(".stack", { style: { gap: "14px" } });
    sets.forEach((set) => list.appendChild(setCard(set)));
    wrap.appendChild(list);
    return wrap;
  }

  /* Et sett er gjort når det er levert eller hver oppgave er rettet i øving. */
  function erGjort(set) {
    const sum = scoreSum(set);
    return isSubmitted(set.id) || (!!sum.total && sum.scored === sum.total);
  }

  /* Kapittellista som rekker: [1, 2, 3, 17, 18] blir «k1–k3 og k17–k18». */
  function kapRekke(ks) {
    const s = [...ks].sort((a, b) => a - b), ut = [];
    for (let i = 0; i < s.length;) {
      let j = i; while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++;
      ut.push(i === j ? `k${s[i]}` : `k${s[i]}–k${s[j]}`); i = j + 1;
    }
    return ut.length > 1 ? ut.slice(0, -1).join(", ") + " og " + ut[ut.length - 1] : (ut[0] || "");
  }

  /* Fanen «Per del»: én del om gangen, settene gruppert etter art i den
     rekkefølgen EDU_DATA.perDel.arter gir. Sett uten kjent art kommer sist.
     utenArt: en arts egen fane, der overskriften per art bare gjentar fanen. */
  function perDelListe(wrap, sets, utenArt) {
    const cfg = perDel(), kort = cfg.kortsvar || {}, K = kort.del;
    /* Kortsvar først, så delene i nummerrekkefølge. */
    const nr = [...new Set(sets.map((s) => s.del))].sort((a, b) => (a === K ? -1 : b === K ? 1 : a - b));
    const navn = (n) => (n === K ? kort.navn || "Kortsvar" : `Del ${n}`);
    if (!nr.includes(valgtDel)) valgtDel = nr[0];
    if (nr.length > 1) {
      const seg = el(".seg", { style: { marginBottom: "14px" } });
      nr.forEach((n) => seg.appendChild(el("button" + (n === valgtDel ? ".on" : ""),
        { onclick: () => { if (valgtDel !== n) { valgtDel = n; S.app.refresh(); } } }, navn(n))));
      wrap.appendChild(seg);
    }
    const info = valgtDel === K ? {} : (cfg.deler || []).find((d) => d.del === valgtDel) || {};
    const iDel = sets.filter((s) => s.del === valgtDel);
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", margin: "4px 0 12px" } },
      el("h3", { style: { fontSize: "19px" } }, navn(valgtDel) + (info.navn ? " · " + info.navn : "")),
      info.kapitler ? el(".chip.slate", kapRekke(info.kapitler)) : null,
      el(".spacer"),
      el(".tiny.muted", `${iDel.filter(erGjort).length} av ${iDel.length} sett gjort`)));
    if (valgtDel === K && kort.tekst) wrap.appendChild(el("p.tiny.muted", { style: { margin: "-4px 0 12px", lineHeight: 1.55 } }, kort.tekst));
    const us = usikreKort(iDel);
    if (us) wrap.appendChild(us);
    const arter = cfg.arter || [];
    const grupper = arter.map((a) => ({ a, sett: iDel.filter((s) => s.art === a.id) }));
    grupper.push({ a: null, sett: iDel.filter((s) => !arter.some((a) => a.id === s.art)) });
    grupper.filter((g) => g.sett.length).forEach(({ a, sett }) => {
      if (a && !utenArt) {
        wrap.appendChild(el("h4", { style: { margin: "20px 0 4px" } },
          `${a.navn} · ${sett.filter(erGjort).length} av ${sett.length} gjort`));
        if (a.tekst) wrap.appendChild(el("p.tiny.muted", { style: { margin: "0 0 10px" } }, a.tekst));
      }
      const list = el(".stack", { style: { gap: "14px" } });
      sett.forEach((s) => list.appendChild(setCard(s)));
      wrap.appendChild(list);
    });
  }

  /* Hvor langt du er kommet gjennom forelesningssettene. */
  function flFremdrift(fl) {
    let ledd = 0, rettet = 0, got = 0, of = 0, gjort = 0;
    fl.forEach((set) => {
      const sum = scoreSum(set);
      (set.exercises || []).forEach((ex) => {
        const n = ex.parts && ex.parts.length ? ex.parts.length : 1;
        ledd += n;
        if (typeof exState(set.id, ex.n).score === "number") { rettet += n; got += exState(set.id, ex.n).score; of += ex.points || 0; }
      });
      if (isSubmitted(set.id) || (sum.total && sum.scored === sum.total)) gjort++;
    });
    const pst = ledd ? Math.round((rettet / ledd) * 100) : 0;
    const card = el(".card", { style: { marginBottom: "16px" } });
    card.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h4", `${gjort} av ${fl.length} forelesninger gjort`),
      el(".spacer"),
      el(".tiny.muted", `${rettet} av ${ledd} ledd rettet` + (of ? ` · ${pts(got)} av ${of} poeng` : ""))));
    card.appendChild(el(".bar", { style: { margin: "10px 0 0" } }, el("span", { style: { width: pst + "%" } })));
    return card;
  }

  /* Usikre og feil oppgaver samlet for settene i fanen du står i (fra 6. november
     2026, før gjaldt det alle fanene). Ett klikk åpner oppgaven i øvingsmodus. */
  function usikreKort(alle) {
    const rader = alle.map((set) => ({ set, merker: merkede(set) })).filter((r) => r.merker.length);
    if (!rader.length) return null;
    const antall = rader.reduce((n, r) => n + r.merker.length, 0);
    const card = el(".card", { style: { marginBottom: "16px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } });
    card.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginBottom: "6px" } },
      el("h4", `⚑ Usikre og feil (${antall})`), el(".spacer"),
      kopierKnapp(alle, { tekst: "Kopier alt jeg ikke kunne" })));
    card.appendChild(el("p.tiny.muted", { style: { margin: "0 0 10px" } },
      "Deloppgaver du har svart feil på eller merket som usikre. Gjør dem på nytt til du kan begrunne svaret. En feil forsvinner når du svarer riktig, et usikker-merke når du fjerner det."));
    rader.forEach(({ set, merker }) => card.appendChild(el(".row.wrap", { style: { gap: "6px", alignItems: "center", marginTop: "6px" } },
      el(".tiny", { style: { fontWeight: 620, minWidth: "120px" } }, set.label),
      ...merker.map(({ ex, etikett, usikker, feil }) => el(feil ? "button.chip.rose.sett-nav" : "button.chip.amber.sett-nav", {
        type: "button", title: (feil && usikker ? "Feil svar, og merket som usikker" : feil ? "Feil svar" : "Merket som usikker") + (ex.title ? " · " + ex.title : ""),
        onclick: () => åpneOppgave(set, ex) }, (usikker ? "⚑ " : "") + nrAv(ex) + etikett + (feil ? " · feil" : ""))))));
    return card;
  }

  function setCard(set) {
    const sum = scoreSum(set);
    const r = run(set.id);
    const done = !!r.submittedAt;
    /* Rettet hver oppgave i øving etter at en eksamensøkt ble startet: da er
       settet gjort, selv om økten aldri ble levert (som i casetreningen). */
    const gjort = !done && erGjort(set);
    const started = !!r.startedAt && !done && !gjort;
    const m = merkede(set);
    const nFeil = m.filter((x) => x.feil).length, nUs = m.filter((x) => x.usikker).length;

    const card = el(".card.pad-lg");
    card.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "19px" } }, set.label),
      set.badge ? el(".chip.rose", set.badge) : null,
      el(".spacer"),
      nFeil ? el(".chip.rose", `${nFeil} feil`) : null,
      nUs ? el(".chip.amber", `⚑ ${nUs} usikre`) : null,
      done ? el(".chip.green", el(".dot"), "Levert") : gjort ? el(".chip.green", el(".dot"), "Gjort") : started ? el(".chip.amber", el(".dot"), "Påbegynt") : null));

    card.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "8px 0 12px" } },
      el(".chip", icon("clock"), `${set.minutes} min`),
      el(".chip", `${set.points} poeng`),
      set.format ? el(".chip.slate", set.format) : null));

    if (set.note) card.appendChild(el("p.tiny.muted", { style: { margin: "0 0 12px" } }, frag(set.note)));

    const topics = [...new Set((set.exercises || []).map((e) => e.topic).filter(Boolean))];
    if (topics.length) card.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "14px" } },
      ...topics.map((t) => el(".chip.slate", { style: { fontSize: "11px" } }, t))));

    if (sum.scored) card.appendChild(el(".explain", { style: { marginBottom: "14px" } },
      el("b", `${pts(sum.got)} av ${sum.of} poeng`), ` · ${settHarMC(set) ? "rettet" : "selvvurdert"} på ${sum.scored} av ${sum.total} oppgaver`));

    card.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn.primary", { onclick: () => { openSet = set.id; mode = "practice"; cursor = 0; S.app.refresh(); } }, "Øvingsmodus"),
      el("button.btn", { onclick: () => { openSet = set.id; mode = "exam"; S.app.refresh(); } }, "⏱ Eksamensmodus"),
      kopierKnapp([set]),
      (done || started || anyTouched(set)) ? el("button.btn.ghost.sm", { onclick: () => {
        if (confirm(`Nullstille «${set.label}» — leveringen, svarene og alle vurderinger? Usikker-merkene og feilene i oversikten beholdes. Kan ikke angres.`)) { resetRun(set.id); S.app.refresh(); }
      } }, "Nullstill settet") : null));
    return card;
  }

  /* ================= felles deler ================= */
  function topBar(set) {
    const bar = el(".row.wrap", { style: { gap: "10px", marginBottom: "16px", alignItems: "center" } });
    if (erKart(set)) {
      bar.appendChild(el("button.btn.ghost.sm", { onclick: () => { openSet = null; del = "kart"; stopTicker(); S.app.refresh(); } }, "← Kartlegging"));
      bar.appendChild(el(".spacer"));
      bar.appendChild(el("h3", { style: { fontSize: "16px" } }, set.label));
      return bar;
    }
    if (tilbake) {
      const t = tilbake;
      bar.appendChild(el("button.btn.ghost.sm", { onclick: () => { openSet = null; tilbake = null; stopTicker(); location.hash = t.hash; window.scrollTo({ top: 0 }); } }, t.tekst));
    } else bar.appendChild(el("button.btn.ghost.sm", { onclick: () => { openSet = null; stopTicker(); S.app.refresh(); } }, "← Alle sett"));
    const seg = el(".seg");
    [["practice", "Øving"], ["exam", "⏱ Eksamen"]].forEach(([m, label]) => {
      seg.appendChild(el("button" + (mode === m ? ".on" : ""), { onclick: () => {
        if (mode === m) return;
        if (m === "exam" && !isSubmitted(set.id) && anyRevealed(set)) {
          if (!confirm("Du har allerede åpnet fasit på minst én oppgave i dette settet. Eksamensmodus gir da ikke et ekte bilde. Bytte likevel?")) return;
        }
        mode = m; stopTicker(); S.app.refresh();
      } }, label));
    });
    bar.appendChild(seg);
    bar.appendChild(el(".spacer"));
    bar.appendChild(el("h3", { style: { fontSize: "16px" } }, set.label));
    return bar;
  }
  function anyRevealed(set) { return (set.exercises || []).some((ex) => exState(set.id, ex.n).revealed || harÅpneDeler(set.id, ex.n)); }
  function anyTouched(set) { return (set.exercises || []).some((ex) => { const s = exState(set.id, ex.n); return s.revealed || harÅpneDeler(set.id, ex.n) || s.valg || typeof s.score === "number"; }); }

  /* Oppgaveteksten er forfattet HTML og skal rendres, ikke escapes. Brede tabeller
     får sin egen rulling, ellers skyver de hele siden sidelengs på mobil (fallgruve 7i). */
  function body(html) { const d = el(".prose"); if (html) d.appendChild(frag(html)); S.u.rullTabeller(d); return d; }

  /* Alternativene tegnes som quizens knapper. Før fasiten er åpen kan du velge
     og velge om; etterpå låses de og fargelegges. Alternativtekst er forfattet
     HTML (formler med sub/sup), så den rendres. */
  function mcValg(set, ex, ledd, åpen, interaktiv) {
    const st = exState(set.id, ex.n); const valgt = (st.valg || {})[ledd.nøkkel];
    const boks = el("div", { style: { marginTop: "10px" } });
    ledd.options.forEach((o, i) => {
      let cls = "button.opt";
      if (åpen) cls += riktig(ledd, i) ? ".correct" : (i === valgt ? ".wrong" : ".dim");
      else if (i === valgt) cls += ".sel";
      const btn = el(cls, { disabled: åpen || !interaktiv,
        onclick: () => { if (åpen || !interaktiv) return; velg(set.id, ex.n, ledd.nøkkel, i); S.app.refresh(); } },
        el(".key", String.fromCharCode(65 + i)), el("span", frag(String(o))));
      boks.appendChild(btn);
    });
    /* Kartleggingen: «Vet ikke» er et ærlig svar. Et gjettet riktig svar skjuler
       hullet rapporten skal finne. */
    if (erKart(set)) {
      const på = valgt === VET_IKKE;
      boks.appendChild(el("button.opt" + (på ? ".sel" : åpen ? ".dim" : ""), { disabled: åpen || !interaktiv,
        onclick: () => { if (åpen || !interaktiv) return; velg(set.id, ex.n, ledd.nøkkel, VET_IKKE); S.app.refresh(); } },
        el(".key", "?"), el("span", "Vet ikke")));
    }
    if (åpen) {
      const vet = valgt === VET_IKKE;
      const traff = valgt != null && !vet && riktig(ledd, valgt);
      const wf = wrongFactor(set);
      const p = valgt == null || vet ? 0 : traff ? ledd.points : Math.round(ledd.points * wf * 100) / 100;
      boks.appendChild(el(".tiny", { style: { marginTop: "4px", fontWeight: 620, color: valgt == null || vet ? "var(--ink-3)" : traff ? "var(--green)" : "var(--rose)" } },
        valgt == null ? "Ubesvart · 0 poeng" : vet ? "Vet ikke · 0 poeng" : traff ? `Riktig · ${pts(p)} poeng` : `Feil · ${pts(p)} poeng`));
      /* Feilen bak alternativet du valgte, når faget har skrevet den. */
      const diag = !traff && valgt != null && valgt >= 0 && ledd.diag ? ledd.diag[valgt] : null;
      if (diag) boks.appendChild(el(".tiny", { style: { marginTop: "6px", padding: "8px 10px", borderRadius: "8px", background: "var(--rose-soft)", lineHeight: 1.5 } },
        el("b", "Feilen: "), diag));
    } else if (!interaktiv) {
      boks.appendChild(el(".tiny.muted", { style: { marginTop: "4px" } }, "Alternativene låses opp når eksamen er startet."));
    }
    return boks;
  }
  /* Det ene flervalgsleddet som hører til en oppgave/deloppgave, eller null. */
  const leddFor = (ex, nøkkel) => mcLedd(ex).find((l) => l.nøkkel === nøkkel) || null;

  function pointsBadge(p) {
    return el(".chip.indigo", { style: { fontWeight: 620 } }, `${p} poeng`);
  }

  function exerciseHead(set, ex) {
    return el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "18px" } }, `Oppgave ${nrAv(ex)}${ex.title ? " · " + ex.title : ""}`),
      ex.kilde ? el(".chip.slate", { style: { fontSize: "11px" }, title: "Oppgaven er lånt herfra" }, ex.kilde) : null,
      ex.merke ? el(".chip", { style: { fontSize: "11px" } }, ex.merke) : null,
      el(".spacer"),
      !(ex.parts || []).length ? usikkerKnapp(set, ex, "")
        : erUsikker(set.id, ex.n, "") ? usikkerKnapp(set, ex, "", "Hele oppgaven") : null,
      pointsBadge(ex.points || 0));
  }

  /* Fasitpanel: grønn kant, tydelig adskilt fra oppgaveteksten. Med en nøkkel
     kan panelet skjules (fra 25. november 2026): trykk på overskriften, så står
     bare den igjen. `lukketSomStandard` er true når svaret er riktig, så fasiten
     bare står åpen der du bommet. Ditt eget valg går foran. Fasiten regnes
     fortsatt som åpnet, så poeng og retting endres ikke. Byttes i DOM-en uten
     ny tegning, så siden ikke hopper. */
  function solutionPanel(title, html, criteria, nøkkel, lukketSomStandard) {
    const lukket = !!nøkkel && (fasitValg.has(nøkkel) ? fasitValg.get(nøkkel) : !!lukketSomStandard);
    const box = el(".sol-panel" + (lukket ? ".lukket" : ""));
    if (nøkkel) {
      const knapp = el("button.sol-skjul", { type: "button", "aria-expanded": String(!lukket) }, lukket ? "Vis fasit" : "Skjul fasit");
      box.appendChild(el(".sol-h.kan-skjules", { onclick: () => {
        const nå = box.classList.toggle("lukket");
        fasitValg.set(nøkkel, nå);
        knapp.textContent = nå ? "Vis fasit" : "Skjul fasit";
        knapp.setAttribute("aria-expanded", String(!nå));
      } }, icon("check"), el("span", title), el(".spacer"), knapp));
    } else box.appendChild(el(".sol-h", icon("check"), el("span", title)));
    if (html) box.appendChild(body(html));
    if (criteria && criteria.length) {
      box.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Dette må være med"));
      const ul = el("ul.sol-crit");
      criteria.forEach((c) => ul.appendChild(el("li", c)));
      box.appendChild(ul);
    }
    return box;
  }
  /* Fasiten starter lukket når delen er rettet automatisk (flervalg eller innført
     svar) og er helt riktig. Feil, delvis riktig, ubesvart, ikke rettet ennå og
     merket usikker gir åpen fasit. Selvvurdering teller ikke: der trenger du
     fasiten for å sette poeng. */
  function riktigDel(set, ex, part) { const st = leddStatus(set, ex, part); return !!st.art && st.hva === "riktig" && !st.usikker; }
  const alleRiktige = (set, ex) => delerAv(ex).every((p) => riktigDel(set, ex, p));
  function scoreRow(set, ex) {
    const cur = exState(set.id, ex.n).score;
    const rs = rettingPå(set) ? rettStatus(set, ex) : null;
    const status = rs && rs.aktive ? el(".tiny", { style: { marginTop: "14px" } },
      rs.komplett ? el("span", el("b", `Rettet: ${pts(rs.sum)} av ${pts(rs.of)} poeng. `),
        exState(set.id, ex.n).scoreKilde === "selv" ? "Du har overstyrt poengsummen." : "Trykk et tall under for å overstyre.")
        : `Rettet så langt: ${pts(rs.sum)} poeng i ${rs.ferdige} av ${rs.alle} deloppgaver. Poengsummen settes når alle er rettet, eller av deg.`) : null;
    const rowEl = el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: status ? "6px" : "14px" } },
      el(".tiny.muted", "Din poengsum:"));
    const max = ex.points || 0;
    const steps = [0, Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), max];
    [...new Set(steps)].sort((a, b) => a - b).forEach((v) => {
      rowEl.appendChild(el("button.btn.sm" + (cur === v ? ".primary" : ""), {
        onclick: () => { setScore(set.id, ex.n, v); S.app.refresh(); },
      }, String(v)));
    });
    rowEl.appendChild(el(".tiny.muted", typeof cur === "number" && !steps.includes(cur) ? `${pts(cur)} av ${max}` : `av ${max}`));
    return status ? el("div", status, rowEl) : rowEl;
  }

  /* ================= øvingsmodus ================= */
  /* ================= retting med egen API-nøkkel ================= */
  /* Med en Anthropic-nøkkel (lagt inn under Konto) fører du inn svarene og får dem
     rettet. Svar-dataene (EDU_DATA.svar, bygget av tools/bygg-svar.py, se
     docs/fie402-svar-spek.md) gir hver deloppgave en type:
       tall     én boks per tall oppgaven spør etter, rettes automatisk (gratis)
       bokstav  flervalg skrevet som tekst i de gamle settene, rettes automatisk
       tekst    tekstfelt, rettes av Claude Opus 5.5 mot løsning og kriterier
       blandet  tallbokser og et tekstfelt: tallene automatisk, teksten med Opus
     Uten nøkkel, uten svar-data, i kartleggingen og i oppgaver med ekte flervalg er
     alt som før: fasitknapp og selvvurdering. Oppgavene endres aldri.

     I øving retter «Rett a)» delen og åpner fasiten. Feltene står åpne etterpå
     (fra 25. november 2026): endrer du svaret, kommer «Rett a) på nytt». Den første
     rettingen lagres i `første` og blir med i «Kopier det jeg ikke kunne», fordi
     et svar du retter etter å ha sett fasiten, ikke viser at du kunne det. Er
     teksten uendret, beholdes Claudes retting av den. I eksamensmodus fører du inn
     mens klokka går, og ingenting rettes før du leverer: da rettes tallene med en
     gang, og én knapp retter tekstsvarene. Er et tall feil og et tidligere tall i
     samme oppgave også feil, kan Sonnet 5.5 sjekke om det er en følgefeil (Kurbatov
     gir full uttelling for følgefeil).

     Lagres i "<settId>-e<n>": `inn` { etikett: { t: [tekst per tallboks], x: tekst,
     b: bokstav } } og `rett` { etikett: { tall: [true/false per tall], tp: poeng for
     tallene, cm: maks for teksten, cp: Claudes poeng (null = venter), tb: Claudes
     tilbakemelding, følge: godkjent som følgefeil, ft: følgefeilsvaret, svar: { t,
     x, b } slik svaret var da det ble rettet, første: den første rettingen når
     delen er rettet på nytt, endret/xEndret: merker for rettinger uten `svar` } }.
     Er alle delene i en oppgave rettet, settes oppgavens poeng til summen
     (scoreKilde: "retting"); knappene i poengraden overstyrer som før. */
  const OPUS = "claude-opus-5-5", SONNET = "claude-sonnet-5-5";
  const harNøkkel = () => !!(S.claude && S.claude.harNøkkel && S.claude.harNøkkel());
  function svarData(set, ex, etikett) {
    const d = (window.EDU_DATA.svar || {})[`${ex.kildeId || set.id}:${ex.kildeN || ex.n}:${etikett || ""}`];
    return d && d.type && d.type !== "ingen" ? d : null;
  }
  function retting(set, ex, etikett) {
    if (!harNøkkel() || erKart(set) || erMC(ex)) return null;
    return svarData(set, ex, etikett);
  }
  /* Deloppgavene, eller hele oppgaven som én del når den ikke har deloppgaver. */
  const helDel = new WeakMap();
  function delerAv(ex) {
    if (ex.parts && ex.parts.length) return ex.parts;
    if (!helDel.has(ex)) helDel.set(ex, [{ label: "", points: ex.points, body: "", solution: ex.solution, criteria: ex.criteria, _hel: true }]);
    return helDel.get(ex);
  }
  const rettingPå = (set) => harNøkkel() && !erKart(set) && (set.exercises || []).some((ex) => delerAv(ex).some((p) => retting(set, ex, p.label)));
  const innFor = (set, ex, e) => ((exState(set.id, ex.n).inn || {})[e]) || {};
  const rettFor = (set, ex, e) => ((exState(set.id, ex.n).rett || {})[e]) || null;
  function lagreInn(set, ex, e, patch) {
    const inn = Object.assign({}, exState(set.id, ex.n).inn || {});
    inn[e] = Object.assign({}, inn[e] || {}, patch);
    S.store.setExam(exKey(set.id, ex.n), { inn });
  }
  function lagreRett(set, ex, e, patch) {
    const rett = Object.assign({}, exState(set.id, ex.n).rett || {});
    rett[e] = Object.assign({}, rett[e] || {}, patch);
    S.store.setExam(exKey(set.id, ex.n), { rett });
    glemFasitValg(set.id, ex.n, e);
  }
  const delPoeng = (ex, part) => part.points || (part._hel ? ex.points : 0) || 0;
  const tallMaks = (d, maks) => (d.type === "blandet" ? d.tallPoeng : d.type === "tekst" ? 0 : maks);
  const harTekst = (d) => d.type === "tekst" || d.type === "blandet";
  const vurderingsId = (set, ex, e) => `rett:${set.id}:${ex.n}:${e}`;

  /* Har du endret et rettet svar? Rettingen lagrer svaret slik det var (`svar`).
     Rettinger fra før 25. november 2026 har det ikke. Der merker første
     tastetrykk svaret som endret (`endret`, og `xEndret` for teksten). */
  const samme = (a, b) => String(a == null ? "" : a).trim() === String(b == null ? "" : b).trim();
  const svarNå = (inn) => ({ svar: { t: (inn.t || []).slice(), x: inn.x || "", b: inn.b || "" }, endret: null, xEndret: null });
  const feltEndret = (r, inn, i) => (r.svar ? !samme((inn.t || [])[i], (r.svar.t || [])[i]) : !!r.endret);
  const bokstavEndret = (r, inn) => (r.svar ? !samme(inn.b, r.svar.b) : !!r.endret);
  const tekstEndret = (r, inn) => (r.svar ? !samme(inn.x, r.svar.x) : !!r.xEndret);
  function endretSiden(set, ex, e) {
    const r = rettFor(set, ex, e); if (!r) return false;
    if (!r.svar) return !!r.endret;
    const inn = innFor(set, ex, e), n = Math.max((inn.t || []).length, (r.svar.t || []).length);
    for (let i = 0; i < n; i++) if (feltEndret(r, inn, i)) return true;
    return tekstEndret(r, inn) || bokstavEndret(r, inn);
  }
  /* Hvilke felt som er endret, som én streng. Endrer den seg mens du skriver,
     tegnes delen på nytt, så merkene og «Rett på nytt» følger svaret. */
  function endringsSig(set, ex, e, d) {
    const r = rettFor(set, ex, e); if (!r) return "";
    const inn = innFor(set, ex, e);
    return [endretSiden(set, ex, e), bokstavEndret(r, inn), ...(d.tall || []).map((_, i) => feltEndret(r, inn, i))].join(",");
  }
  /* Ga en retting mindre enn full uttelling? En godkjent følgefeil teller som riktig. */
  const feilIRetting = (f, maks) => !!f && ((((f.tall || []).some((x) => x === false)) && !f.følge)
    || (f.cp != null && (f.tp || 0) + (f.cp || 0) < maks - 1e-9));

  /* Et tall slik du skriver det: komma eller punktum som desimaltegn, mellomrom som
     tusenskille, − eller - som minus, % til slutt eller en brøk (2/3). «1,234» kan bety begge deler,
     så begge tolkningene prøves. */
  function tolkTall(s) {
    const t = String(s == null ? "" : s).trim().replace(/[−–]/g, "-").replace(/\s+/g, "").replace(/%$/, "");
    const ut = [];
    const legg = (x) => { const n = Number(x); if (x !== "" && x !== "-" && Number.isFinite(n)) ut.push(n); };
    if (!t) return ut;
    /* En brøk, som «−2/3» for en delta. */
    const brøk = t.match(/^(-?\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)$/);
    if (brøk) { const b = Number(brøk[2].replace(",", ".")); if (b) ut.push(Number(brøk[1].replace(",", ".")) / b); return ut; }
    if (t.includes(",") && t.includes(".")) legg(t.replace(/,/g, ""));
    else if (t.includes(",")) { legg(t.replace(",", ".")); if (/^-?\d{1,3}(,\d{3})+$/.test(t)) legg(t.replace(/,/g, "")); }
    else legg(t);
    return ut;
  }
  /* Riktig innenfor toleransen (standard 1 %). Prosent godtas også som desimaltall
     (0,0925 for 9,25 %), og en sannsynlighet også i prosent (58,84 for 0,5884). */
  function tallRiktig(inp, t) {
    const grense = (v) => Math.max(t.abs || 0, (t.tol == null ? 0.01 : t.tol) * Math.abs(v), 1e-9);
    const mål = [t.verdi].concat(t.alt || []);
    return tolkTall(inp).some((n) => mål.some((v) => {
      const ok = (x) => Math.abs(x - v) <= grense(v);
      if (ok(n)) return true;
      if (t.enhet === "%" && ok(n * 100)) return true;
      if (!t.enhet && v !== 0 && Math.abs(v) < 1 && ok(n / 100)) return true;
      return false;
    }));
  }
  const visTall = (v, enhet) => v.toLocaleString("nb-NO", { maximumFractionDigits: 4 }).replace("-", "−") + (enhet ? (enhet === "%" ? " %" : " " + enhet) : "");

  /* Retter tallene og bokstaven i en del. Tekstdelen venter på Claude (cp: null),
     men et tomt tekstfelt gir 0 uten å spørre. */
  function rettAutomatisk(set, ex, part) {
    const d = retting(set, ex, part.label); if (!d) return;
    const e = part.label, inn = innFor(set, ex, e), maks = delPoeng(ex, part);
    const x = String(inn.x || "").trim();
    if (d.type === "bokstav") {
      const ok = String(inn.b || "").trim().toUpperCase() === d.svar;
      lagreRett(set, ex, e, { tall: [ok], tp: ok ? maks : 0, cm: 0, cp: 0, følge: false, ft: null, tb: null, ...svarNå(inn) });
      return;
    }
    const tm = tallMaks(d, maks), per = d.tall && d.tall.length ? tm / d.tall.length : 0;
    const ok = (d.tall || []).map((t, i) => tallRiktig((inn.t || [])[i], t));
    const tp = Math.round(ok.filter(Boolean).length * per * 100) / 100;
    const cm = harTekst(d) ? maks - tm : 0;
    lagreRett(set, ex, e, { tall: ok, tp, cm, cp: cm ? (x ? null : 0) : 0, følge: false, ft: null, tb: null, ...svarNå(inn) });
  }

  /* Status for oppgaven: summen av det som er rettet, og om alt er rettet. */
  function rettStatus(set, ex) {
    const deler = delerAv(ex);
    let sum = 0, of = 0, ferdige = 0, aktive = 0;
    deler.forEach((p) => {
      of += delPoeng(ex, p);
      if (!retting(set, ex, p.label)) return;
      aktive++;
      const r = rettFor(set, ex, p.label);
      if (r && r.cp != null) { ferdige++; sum += (r.tp || 0) + (r.cp || 0); }
    });
    return { sum: Math.round(sum * 100) / 100, of, ferdige, aktive, alle: deler.length, komplett: aktive === deler.length && ferdige === deler.length };
  }
  function oppdaterSum(set, ex) {
    const s = rettStatus(set, ex);
    if (s.komplett) S.store.setExam(exKey(set.id, ex.n), { score: s.sum, scoredAt: S.u.nowTs(), scoreKilde: "retting" });
  }

  /* Tegner siden på nytt uten å ta markøren fra feltet du skriver i. */
  function oppfrisk() {
    const a = document.activeElement;
    const k = a && a.getAttribute ? a.getAttribute("data-svar") : null;
    const sel = k && typeof a.selectionStart === "number" ? [a.selectionStart, a.selectionEnd] : null;
    S.app.refresh();
    if (!k) return;
    const n = [...document.querySelectorAll("[data-svar]")].find((x) => x.getAttribute("data-svar") === k);
    if (n) { n.focus(); if (sel) { try { n.setSelectionRange(sel[0], sel[1]); } catch (e) {} } }
  }

  /* Kjører vurderinger én om gangen, så Opus ikke får mange kall samtidig. */
  let kø = Promise.resolve(), køIgjen = 0;
  function køVurdering(id) {
    køIgjen++;
    kø = kø.then(() => S.claude.kjørVurdering(id)).catch(() => {}).then(() => { køIgjen--; oppfrisk(); });
    return kø;
  }

  /* Feltene du fører inn svaret i. Låst etter levering. I øving står de åpne også
     etter retting, og ✓, ✗ og fasiten vises bare ved felt du ikke har endret siden. */
  function svarFelt(set, ex, part, d, låst) {
    const e = part.label, inn = innFor(set, ex, e), r = rettFor(set, ex, e);
    const boks = el(".svar-felt");
    const nøkkel = (i) => `${set.id}:${ex.n}:${e}:${i}`;
    const vis = (endret) => !!r && (låst || !endret);
    const merke = (ok, endret) => (vis(endret) ? el(ok ? "span.svar-ok" : "span.svar-feil", ok ? "✓" : "✗") : null);
    const sig = r && !låst ? endringsSig(set, ex, e, d) : null;
    const etter = (tekst) => { if (sig != null) etterInn(set, ex, e, d, sig, tekst); };
    if (d.type === "bokstav") {
      const inp = el("input.svar-inn.svar-bokstav", { type: "text", maxlength: 1, autocomplete: "off", "data-svar": nøkkel("b"),
        "aria-label": "Svaret ditt (bokstav)", oninput: (ev) => { ev.target.value = ev.target.value.toUpperCase(); lagreInn(set, ex, e, { b: ev.target.value }); etter(false); } });
      inp.value = inn.b || ""; if (låst) inp.readOnly = true;
      const bEndret = !!r && bokstavEndret(r, inn);
      boks.appendChild(el(".svar-rad", el("span.svar-navn", "Svaret ditt"), inp,
        merke(r && r.tall && r.tall[0], bEndret), vis(bEndret) && !(r.tall && r.tall[0]) ? el("span.tiny.muted", `Fasit: ${d.svar}`) : null));
      return boks;
    }
    (d.tall || []).forEach((t, i) => {
      const inp = el("input.svar-inn", { type: "text", inputmode: "decimal", autocomplete: "off", "data-svar": nøkkel(i),
        "aria-label": "Svaret ditt", oninput: (ev) => { const ts = (innFor(set, ex, e).t || []).slice(); ts[i] = ev.target.value; lagreInn(set, ex, e, { t: ts }); etter(false); } });
      inp.value = (inn.t || [])[i] || ""; if (låst) inp.readOnly = true;
      const ok = r && r.tall ? r.tall[i] : null;
      const endret = !!r && feltEndret(r, inn, i);
      boks.appendChild(el(".svar-rad",
        el("span.svar-navn", frag(t.navn)),
        inp,
        t.enhet ? el("span.svar-enhet", t.enhet) : null,
        merke(ok, endret),
        vis(endret) && !ok ? el("span.tiny.muted", `Fasit: ${visTall(t.verdi, t.enhet)}`) : null));
    });
    if (harTekst(d)) {
      const ta = el("textarea.svar-tekst", { rows: d.type === "tekst" ? 7 : 3, maxlength: 6000, "data-svar": nøkkel("x"),
        placeholder: låst ? "" : "Write your answer in English, as on the exam.",
        oninput: (ev) => { lagreInn(set, ex, e, { x: ev.target.value }); etter(true); } });
      ta.value = inn.x || ""; if (låst) ta.readOnly = true;
      boks.appendChild(el(".svar-tekst-hode.tiny.muted", d.type === "blandet" ? (d.tekstLedd || "Kommentar") : "Svaret ditt"));
      boks.appendChild(ta);
    }
    return boks;
  }

  /* Det Claude får når en tekstdel skal rettes. */
  function rettePrompt(set, ex, part, d) {
    const ren = S.claude.ren;
    const e = part.label, inn = innFor(set, ex, e), r = rettFor(set, ex, e) || {};
    const maks = delPoeng(ex, part), cm = harTekst(d) ? maks - tallMaks(d, maks) : maks;
    const tidligere = delerAv(ex).slice(0, Math.max(0, delerAv(ex).indexOf(part))).map((p) => {
      const dd = svarData(set, ex, p.label), ii = innFor(set, ex, p.label);
      const tall = dd && dd.tall ? dd.tall.map((t, i) => `${ren(t.navn)} = ${(ii.t || [])[i] || "(tomt)"}${t.enhet ? " " + t.enhet : ""}`).join("; ") : "";
      return tall || ii.x ? `- ${p.label}) ${tall}${ii.x ? (tall ? " · " : "") + "tekst: " + String(ii.x).slice(0, 400) : ""}` : "";
    }).filter(Boolean).join("\n");
    const tallLinjer = d.type === "blandet" ? d.tall.map((t, i) => `- ${ren(t.navn)}: skrev ${(inn.t || [])[i] || "(tomt)"}${t.enhet ? " " + t.enhet : ""}, fasit ${visTall(t.verdi, t.enhet)} (${r.tall && r.tall[i] ? "riktig" : "feil"})`).join("\n") : "";
    const krit = (part.criteria || []).map((c, i) => `${i + 1}. ${ren(c)}`).join("\n");
    return `Du er sensor på FIE402 Corporate Finance ved NHH (eksamen satt av Andrey Kurbatov). Jeg øver til eksamen og vil ha en streng, rettferdig og konkret vurdering, ikke oppmuntring.

## Oppgaven: ${set.label}, oppgave ${nrAv(ex)}${ex.title ? " (" + ex.title + ")" : ""}
${ren(ex.body || "")}
${part._hel ? "" : `\n## Deloppgave ${e}) (${maks} poeng)\n${ren(part.body || "")}\n`}${tidligere ? `\n## Mine svar på tidligere deloppgaver\n${tidligere}\n` : ""}${tallLinjer ? `\n## Tallene i denne deloppgaven (allerede rettet automatisk, ${tallMaks(d, maks)} poeng)\n${tallLinjer}\n` : ""}
## Svaret mitt${d.type === "blandet" ? ` på tekstdelen (${cm} poeng)` : ` (${cm} poeng)`}${d.tekstLedd ? ": " + d.tekstLedd : ""}
${String(inn.x || "").trim() ? '"""\n' + String(inn.x).trim() + '\n"""' : "(tomt)"}

## Løsningen
${ren(part.solution || (part._hel ? ex.solution : "") || "") || "(ingen løsning)"}
${krit ? "\n## Kriteriene sensor ser etter\n" + krit + "\n" : ""}
## Slik retter du
- Gi poeng bare for tekstdelen, av ${cm}${d.type === "blandet" ? ". Tallene er rettet, så ikke trekk for dem igjen" : ""}. Bruk halve poeng.
- Vurder bare det som står i svaret. Det som er underforstått, teller ikke. Se bort fra stavefeil og grammatikk.
- Kriteriene setter nivået for full pott (uten kriterier gjør løsningen det). Får svaret med innholdet i et kriterium, er det oppfylt, også når svaret er kort eller bruker andre ord. Du sjekker innhold, ikke ordlyd.
- Ikke trekk for detaljer som bare står i løsningen eller i kriterier merket «Optional». Ta dem heller med i toppsvaret.
- Før du kaller en formulering feil, sjekk om den stemmer økonomisk, gjerne med tallene. Er den riktig, men upresis, trekker du høyst et halvt poeng for den.
- Kurbatovs sensorer belønner mekanismen, ikke merkelappen: «value creation» eller «it signals» uten hvorfor gir lite. Nøkkelfraser teller når de brukes riktig, for eksempel «wealth transfer» og «the firm forgoes positive-NPV projects».
- Følgefeil gir ikke trekk: bygger svaret riktig videre på mine egne tidligere tall, er det riktig.
- Eksamen besvares på engelsk. Skriver jeg på norsk, retter du innholdet som vanlig og minner meg på det i én setning.
- Ikke gjenta løsningen. Jeg har den foran meg.

## Svar kort, på norsk, i denne formen
Kort er viktigere enn fullstendig: høyst 15 ord per linje utenom toppsvaret. Ikke si det samme to ganger.
1. **Poeng:** «x av ${cm}» og én kort setning om hvorfor.
2. **Kriteriene:** én linje per kriterium med ✓, delvis eller ✗. Ved ✓ holder et kort sitat. Ellers sier du bare hva som manglet.
3. **Toppsvar:** én til to setninger på engelsk, slik jeg burde skrevet dem.

Avslutt med en egen linje nøyaktig slik: POENG: x av ${cm}`;
  }
  function lesPoeng(tekst, maks) {
    const m = [...String(tekst || "").matchAll(/POENG:\s*([0-9]+(?:[.,][0-9]+)?)\s*av\s*([0-9]+(?:[.,][0-9]+)?)/gi)].pop();
    if (!m) return null;
    const x = parseFloat(m[1].replace(",", "."));
    return Number.isFinite(x) ? Math.max(0, Math.min(maks, Math.round(x * 2) / 2)) : null;
  }

  /* Følgefeil: er et tall feil, og et tidligere tall i samme oppgave også feil, kan
     tallet være riktig regnet på ditt eget grunnlag. Sonnet 5.5 sjekker det. */
  function kanFølgefeil(set, ex, part) {
    const r = rettFor(set, ex, part.label);
    if (!r || !r.tall || r.følge || r.ft || r.tall.every(Boolean)) return false;
    const deler = delerAv(ex), i = deler.indexOf(part);
    return deler.slice(0, i).some((p) => { const q = rettFor(set, ex, p.label); return q && q.tall && q.tall.some((x) => x === false); });
  }
  function følgePrompt(set, ex, part, d) {
    const ren = S.claude.ren;
    const linjer = (p) => {
      const dd = svarData(set, ex, p.label), ii = innFor(set, ex, p.label);
      return dd && dd.tall ? dd.tall.map((t, i) => `  ${ren(t.navn)}: studenten ${(ii.t || [])[i] || "(tomt)"}, fasit ${visTall(t.verdi, t.enhet)}`).join("\n") : "  (ingen tall)";
    };
    const deler = delerAv(ex), i = deler.indexOf(part);
    return `En student har regnet en eksamensoppgave i FIE402 Corporate Finance. Sjekk om et feil tall er en følgefeil: riktig metode brukt på studentens egne, feile tall fra tidligere deloppgaver.

## Oppgaven
${ren(ex.body || "")}

## Tidligere deloppgaver
${deler.slice(0, i).map((p) => `${p.label}) ${ren(p.body || "")}\n${linjer(p)}`).join("\n\n")}

## Deloppgaven som sjekkes: ${part.label})
${ren(part.body || "")}
${linjer(part)}

## Løsningen for ${part.label})
${ren(part.solution || "")}

Regn ${part.label}) på nytt med studentens egne tall fra de tidligere deloppgavene og samme metode som løsningen. Gir det studentens tall innenfor avrunding (rundt 1 %), er det en følgefeil. Ukjent metode eller andre feil i ${part.label}) er ikke følgefeil.
Svar på norsk med to til tre setninger, med tallet du fikk. Avslutt med en egen linje: FØLGEFEIL: JA eller FØLGEFEIL: NEI`;
  }
  const følgeKjører = new Set();
  async function sjekkFølgefeil(set, ex, part) {
    const d = retting(set, ex, part.label), id = vurderingsId(set, ex, part.label);
    if (!d || følgeKjører.has(id)) return;
    følgeKjører.add(id); oppfrisk();
    try {
      const r = await S.claude.strøm({ system: "Du er en nøyaktig sensor i bedriftsfinans. Regn sjekken i hodet og svar kort.",
        messages: [{ role: "user", content: følgePrompt(set, ex, part, d) }], modell: SONNET, effort: "medium", maxTokens: 8000 });
      const tekst = r.content.filter((b) => b.type === "text").map((b) => b.text || "").join("").trim();
      const ja = /FØLGEFEIL:\s*JA/i.test(tekst);
      const ft = tekst.replace(/\n?\s*FØLGEFEIL:\s*(JA|NEI)\s*$/i, "").trim() || (ja ? "Godkjent som følgefeil." : "Ikke en følgefeil.");
      if (ja) lagreRett(set, ex, part.label, { følge: true, tp: tallMaks(d, delPoeng(ex, part)), ft });
      else lagreRett(set, ex, part.label, { følge: false, ft });
      oppdaterSum(set, ex);
    } catch (e) {
      S.u.toast((e && e.message) || "Følgefeilsjekken feilet. Prøv igjen.");
    } finally { følgeKjører.delete(id); oppfrisk(); }
  }

  /* Resultatet for en rettet del: poengene, følgefeilsjekken og Claudes vurdering. */
  function rettVisning(set, ex, part, d) {
    const e = part.label, r = rettFor(set, ex, e);
    if (!r) return null;
    const wrap = el(".svar-resultat");
    const maks = delPoeng(ex, part), tm = d.type === "bokstav" ? maks : tallMaks(d, maks);
    const biter = [];
    if (d.type !== "tekst") biter.push(`${d.type === "bokstav" ? "Svaret" : "Tallene"}: ${pts(r.tp || 0)} av ${pts(tm)}${r.følge ? " (følgefeil godkjent)" : ""}`);
    if (harTekst(d)) biter.push(r.cp == null ? `Teksten: venter på Claude (${pts(r.cm)} p)` : `Teksten: ${pts(r.cp)} av ${pts(r.cm)}`);
    const ferdig = r.cp != null;
    wrap.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      el(ferdig ? ".chip.green" : ".chip.amber", ferdig ? `${pts((r.tp || 0) + (r.cp || 0))} av ${pts(maks)} p` : "Delvis rettet"),
      el("span.tiny.muted", biter.join(" · "))));
    if (kanFølgefeil(set, ex, part)) {
      const kjører = følgeKjører.has(vurderingsId(set, ex, e));
      wrap.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "8px" } },
        el("button.btn.sm" + (kjører ? "" : ".ghost"), { type: "button", disabled: kjører, onclick: () => sjekkFølgefeil(set, ex, part) }, kjører ? "Sjekker …" : "Sjekk følgefeil"),
        el("span.tiny.muted", "Et tidligere tall i oppgaven er feil. Sonnet 5.5 sjekker om dette er riktig regnet på ditt eget grunnlag (rundt 2 cent).")));
    }
    if (r.ft) wrap.appendChild(el("p.tiny", { style: { margin: "8px 0 0" } }, el("b", r.følge ? "Følgefeil godkjent. " : "Ikke følgefeil. "), r.ft));
    if (harTekst(d) && String(innFor(set, ex, e).x || "").trim()) {
      wrap.appendChild(el("div", { style: { marginTop: "10px" } }, S.claude.vurdering({
        id: vurderingsId(set, ex, e), modell: OPUS, effort: "high", lagret: r.tb || null,
        prompt: () => rettePrompt(set, ex, part, d),
        knapp: r.cp == null ? "Rett teksten med Claude" : "Rett teksten på nytt",
        forklaring: `Claude Opus 5.5 retter teksten mot løsningen og kriteriene, ${pts(r.cm)} poeng. Rundt 4–8 cent.`,
        onFerdig: (tekst) => {
          const p = lesPoeng(tekst, r.cm);
          if (p == null) S.u.toast("Fant ikke poengsummen i vurderingen. Sett poeng selv i poengraden.");
          lagreRett(set, ex, e, { cp: p, tb: tekst });
          oppdaterSum(set, ex);
        },
      })));
    }
    return wrap;
  }

  /* «Rett a)»: retter det som kan rettes automatisk, åpner fasiten og sender
     teksten til Claude. */
  function rettDel(set, ex, part) {
    const d = retting(set, ex, part.label); if (!d) return;
    const inn = innFor(set, ex, part.label);
    const tomt = !(inn.t || []).some((x) => String(x || "").trim()) && !String(inn.x || "").trim() && !String(inn.b || "").trim();
    const navn = part._hel ? "oppgaven" : `${part.label})`;
    if (tomt && !confirm(`Du har ikke ført inn noe svar på ${navn}. Det gir 0 poeng. Rette og vise løsningen likevel?`)) return;
    rettAutomatisk(set, ex, part);
    if (part._hel) reveal(set.id, ex.n); else revealDel(set, ex, part.label);
    oppdaterSum(set, ex);
    oppfrisk();
    const r = rettFor(set, ex, part.label);
    if (r && r.cp == null) køVurdering(vurderingsId(set, ex, part.label));
  }
  /* Etter hvert tastetrykk i et rettet svar i øving. Tegner delen på nytt bare når
     et felt går fra likt til endret eller tilbake, ikke for hvert tegn. */
  function etterInn(set, ex, e, d, sig, tekst) {
    const r = rettFor(set, ex, e); if (!r) return;
    if (!r.svar && (!r.endret || (tekst && !r.xEndret))) lagreRett(set, ex, e, tekst ? { endret: 1, xEndret: 1 } : { endret: 1 });
    if (endringsSig(set, ex, e, d) !== sig) oppfrisk();
  }
  /* «Rett a) på nytt»: retter et endret svar en gang til. Den første rettingen
     lagres i `første` (bare første gang), så rapporten fortsatt viser hva du svarte
     før du så fasiten. Er teksten uendret, beholdes Claudes retting av den. */
  function rettPåNytt(set, ex, part) {
    const e = part.label, d = retting(set, ex, e), r = rettFor(set, ex, e);
    if (!d || !r) return;
    const behold = harTekst(d) && r.cp != null && !tekstEndret(r, innFor(set, ex, e));
    const første = r.første || { svar: r.svar || null, tall: r.tall || null, tp: r.tp || 0, cp: r.cp == null ? null : r.cp, følge: !!r.følge };
    rettAutomatisk(set, ex, part);
    lagreRett(set, ex, e, behold ? { første, cp: r.cp, tb: r.tb } : { første });
    oppdaterSum(set, ex);
    oppfrisk();
    const ny = rettFor(set, ex, e);
    if (ny && ny.cp == null) køVurdering(vurderingsId(set, ex, e));
  }
  function påNyttRad(set, ex, part) {
    const e = part.label, d = retting(set, ex, e), r = rettFor(set, ex, e), inn = innFor(set, ex, e);
    const nyTekst = d && harTekst(d) && tekstEndret(r, inn) && String(inn.x || "").trim();
    const blirMed = feilIRetting(r.første || r, delPoeng(ex, part));
    return el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "10px" } },
      el("button.btn.sm.primary", { type: "button", onclick: () => rettPåNytt(set, ex, part) }, part._hel ? "Rett svaret på nytt" : `Rett ${e}) på nytt`),
      el("span.tiny.muted", { style: { flex: "1 1 220px", lineHeight: 1.5 } },
        "Du har endret svaret. Resultatet under gjelder det forrige."
        + (nyTekst ? " Claude retter teksten på nytt." : "")
        + (blirMed ? " Det første svaret blir likevel med i «Kopier det jeg ikke kunne»." : "")));
  }
  /* «Rett alle deloppgavene» / «Rett resten»: alle delene som ikke er rettet. */
  function rettResten(set, ex) {
    const igjen = delerAv(ex).filter((p) => retting(set, ex, p.label) && !rettFor(set, ex, p.label));
    const tomme = igjen.filter((p) => { const i = innFor(set, ex, p.label); return !(i.t || []).some((x) => String(x || "").trim()) && !String(i.x || "").trim() && !String(i.b || "").trim(); });
    if (tomme.length && !confirm(`${tomme.map((p) => p.label + ")").join(", ")} ${tomme.length === 1 ? "er tom" : "er tomme"} og gir 0 poeng. Rette og vise løsningen likevel?`)) return;
    const ids = [];
    igjen.forEach((p) => { rettAutomatisk(set, ex, p); const r = rettFor(set, ex, p.label); if (r && r.cp == null) ids.push(vurderingsId(set, ex, p.label)); });
    reveal(set.id, ex.n); mcLagreScore(set, ex);
    oppdaterSum(set, ex);
    oppfrisk();
    ids.forEach(køVurdering);
  }
  /* Etter levering: tallene i hele settet rettes med en gang. */
  function rettSettAutomatisk(set) {
    (set.exercises || []).forEach((ex) => {
      let noe = false;
      delerAv(ex).forEach((p) => { if (retting(set, ex, p.label)) { rettAutomatisk(set, ex, p); noe = true; } });
      if (noe) oppdaterSum(set, ex);
    });
  }
  /* Tekstdeler som venter på Claude i et levert sett. */
  const ventendeTekst = (set) => (set.exercises || []).flatMap((ex) => delerAv(ex)
    .filter((p) => { const d = retting(set, ex, p.label), r = rettFor(set, ex, p.label); return d && harTekst(d) && r && r.cp == null; })
    .map((p) => vurderingsId(set, ex, p.label)));
  function rettingKort(set, levert) {
    if (!rettingPå(set)) return null;
    const kort = el(".card", { style: { marginBottom: "16px", background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" } });
    if (!levert) {
      kort.appendChild(el("p.tiny", { style: { margin: 0, lineHeight: 1.55 } }, el("b", "Retting er på. "),
        mode === "exam" ? "Regn på papir og før inn sluttsvarene (små tall med fire desimaler) og tekstsvarene her. Ingenting rettes før du leverer: da rettes tallene automatisk, og tekstsvarene kan du sende til Claude Opus 5.5."
          : "Før inn svaret og trykk «Rett». Tall rettes automatisk og gratis, små tall med fire desimaler som på eksamen. Tekst rettes av Claude Opus 5.5, rundt 4–8 cent per svar."));
      return kort;
    }
    const ids = ventendeTekst(set);
    if (!ids.length && !køIgjen) return null;
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center" } },
      el("p.tiny", { style: { margin: 0, flex: "1 1 260px", lineHeight: 1.55 } }, el("b", "Tallene er rettet. "),
        køIgjen ? `Claude retter tekstsvarene (${køIgjen} igjen) …` : `${ids.length} tekstsvar venter. Claude Opus 5.5 retter dem ett om gangen, rundt ${(ids.length * 0.04).toFixed(2).replace(".", ",")}–${(ids.length * 0.08).toFixed(2).replace(".", ",")} dollar til sammen.`),
      køIgjen ? null : el("button.btn.primary", { type: "button", onclick: () => ids.forEach(køVurdering) }, "Rett tekstsvarene med Claude")));
    return kort;
  }

  function renderPractice(set) {
    stopTicker();
    const wrap = el(".fade-in");
    wrap.appendChild(topBar(set));

    const exs = set.exercises || [];
    if (!exs.length) { wrap.appendChild(sh().empty("📄", "Tomt sett", "Ingen oppgaver lagt inn.")); return wrap; }
    if (cursor >= exs.length) cursor = 0;
    const rk = rettingKort(set, false);
    if (rk) wrap.appendChild(rk);

    /* Med «Bare usikre og feil» viser navigasjonen og Forrige/Neste bare de merkede.
       Oppgaven du står på, vises uansett, så den ikke forsvinner idet du fjerner merket. */
    const nUs = exs.filter((ex) => harMerke(set, ex)).length;   // oppgaver, ikke merker
    if (!nUs) bareUsikre = false;
    const synlige = exs.map((ex, i) => i).filter((i) => !bareUsikre || i === cursor || harMerke(set, exs[i]));

    if (nUs) {
      const seg = el(".seg", { style: { marginBottom: "10px" } });
      [[false, `Alle (${exs.length})`], [true, `⚑ Bare usikre og feil (${nUs})`]].forEach(([b, label]) =>
        seg.appendChild(el("button" + (bareUsikre === b ? ".on" : ""), { onclick: () => {
          if (bareUsikre === b) return;
          bareUsikre = b;
          if (b && !harMerke(set, exs[cursor])) cursor = exs.findIndex((ex) => harMerke(set, ex));
          S.app.refresh();
        } }, label)));
      wrap.appendChild(seg);
    }

    const nav = el(".row.wrap", { style: { gap: "6px", marginBottom: "16px" } });
    synlige.forEach((i) => {
      const ex = exs[i];
      const revealed = !!exState(set.id, ex.n).revealed;
      const us = harMerke(set, ex);
      const cls = i === cursor ? "button.chip.sett-nav.on" : us ? "button.chip.amber.sett-nav" : revealed ? "button.chip.green.sett-nav" : "button.chip.sett-nav";
      nav.appendChild(el(cls, { title: us ? "Usikker eller feil" : "", onclick: () => { cursor = i; S.app.refresh(); } },
        `${nrAv(ex)}`, us ? el("span", { style: { marginLeft: "4px" } }, "⚑") : revealed && i !== cursor ? el("span", { style: { marginLeft: "4px" } }, "✓") : null));
    });
    wrap.appendChild(nav);

    const ex = exs[cursor];
    const card = el(".card.pad-lg");
    card.appendChild(exerciseHead(set, ex));
    if (ex.topic) card.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "12px" } }, el(".chip.slate", ex.topic)));
    card.appendChild(body(ex.body));

    const open = solutionOpen(set.id, ex.n);
    const mc = erMC(ex);
    /* Oppgave uten deloppgaver: feltene under teksten, resultatet når den er rettet. */
    const hel = !(ex.parts || []).length ? delerAv(ex)[0] : null;
    const dHel = hel ? retting(set, ex, "") : null;
    /* Feltene låses bare når settet er levert. Ellers kan du endre og rette på nytt. */
    const levert = isSubmitted(set.id);
    if (dHel) {
      const rH = rettFor(set, ex, "");
      card.appendChild(svarFelt(set, ex, hel, dHel, !!rH && levert));
      if (rH && !levert && endretSiden(set, ex, "")) card.appendChild(påNyttRad(set, ex, hel));
      if (rH) card.appendChild(rettVisning(set, ex, hel, dHel));
    }
    const hoved = leddFor(ex, "");
    if (hoved) card.appendChild(mcValg(set, ex, hoved, open, true));

    /* Hver deloppgave har sin egen fasitknapp, så du kan sjekke a) før du
       regner b). Et flervalgsledd rettes idet fasiten for delen åpnes. */
    (ex.parts || []).forEach((part) => {
      const pc = el(".sett-part");
      pc.appendChild(delHode(set, ex, part));
      pc.appendChild(body(part.body));
      const ledd = leddFor(ex, part.label);
      const delÅpen = delOpen(set.id, ex.n, part.label);
      if (ledd) pc.appendChild(mcValg(set, ex, ledd, delÅpen, true));
      const d = retting(set, ex, part.label);
      const rettet = d ? rettFor(set, ex, part.label) : null;
      if (d) {
        pc.appendChild(svarFelt(set, ex, part, d, !!rettet && levert));
        if (rettet) {
          if (!levert && endretSiden(set, ex, part.label)) pc.appendChild(påNyttRad(set, ex, part));
          pc.appendChild(rettVisning(set, ex, part, d));
        } else pc.appendChild(el(".row", { style: { marginTop: "10px" } },
          el("button.btn.sm", { onclick: () => rettDel(set, ex, part) }, `Rett ${part.label})`)));
      }
      if (delÅpen) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria, fasitNøkkel(set.id, ex.n, part.label), riktigDel(set, ex, part)));
      else if (!d) pc.appendChild(el(".row", { style: { marginTop: "10px" } },
        el("button.btn.ghost.sm", { onclick: () => {
          const ubesvartDel = ledd && (exState(set.id, ex.n).valg || {})[ledd.nøkkel] == null;
          if (ubesvartDel && !confirm(`Du har ikke svart på ${part.label}). Ubesvart gir 0 poeng. Vise løsningen likevel?`)) return;
          revealDel(set, ex, part.label); S.app.refresh();
        } }, ledd ? `Rett ${part.label})` : `Vis fasit for ${part.label})`)));
      card.appendChild(pc);
    });

    if (!open) {
      const noenÅpne = (ex.parts || []).some((p) => delOpen(set.id, ex.n, p.label));
      const ubesvart = mc && mcLedd(ex).some((l) => (exState(set.id, ex.n).valg || {})[l.nøkkel] == null);
      card.appendChild(el(".card", { style: { marginTop: "18px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          el("b", mc ? "Velg svaret ditt først. " : "Skriv svaret først. "),
          mc ? (set.practiceNote || "Regn på papir og velg alternativet før du åpner fasiten. Et alternativ du velger etter å ha sett løsningen, har du ikke lært noe av.")
             : (set.practiceNote || "Eksamen er penn og papir, så gjør det på papir her også — hele utregningen, ikke bare svaret. Å lese en løsning du ikke har forsøkt på gir gjenkjennelse, ikke kunnskap.")),
        el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
          dHel ? el("button.btn.primary", { onclick: () => rettDel(set, ex, hel) }, "Rett svaret")
          : delerAv(ex).some((p) => retting(set, ex, p.label)) ? el("button.btn.primary", { onclick: () => rettResten(set, ex) },
            noenÅpne ? "Rett resten" : "Rett alle deloppgavene")
          : el("button.btn.primary", { onclick: () => {
            if (ubesvart && !confirm("Du har ikke svart på alle leddene. Ubesvart gir 0 poeng. Vise løsningen likevel?")) return;
            reveal(set.id, ex.n); mcLagreScore(set, ex); S.app.refresh();
          } }, !(ex.parts || []).length ? (mc ? "Rett svaret mitt" : "Jeg har skrevet svaret — vis løsningen")
            : noenÅpne ? (mc ? "Rett resten" : "Vis fasit for resten")
            : (mc ? "Rett alle leddene" : "Jeg har skrevet svarene, vis hele løsningen")),
          /* Har du åpnet noen av delene, kan du lukke dem igjen og regne på nytt. */
          noenÅpne && !isSubmitted(set.id) ? el("button.btn.ghost.sm", { onclick: () => { prøvIgjen(set.id, ex.n); S.app.refresh(); } }, "↺ Prøv på nytt") : null)));
    } else {
      if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria, fasitNøkkel(set.id, ex.n, "hel"), alleRiktige(set, ex)));
      else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null, fasitNøkkel(set.id, ex.n, "kommentar"), alleRiktige(set, ex)));
      if (mc) {
        const r = mcRett(set, ex, wrongFactor(set));
        card.appendChild(el(".explain", { style: { marginTop: "14px" } },
          el("b", `${pts(r.got)} av ${r.of} poeng`), ` · ${r.rett} riktig, ${r.galt} feil, ${r.blank} ubesvart` + (wrongFactor(set) ? " · minuspoeng for feil" : "")));
      } else card.appendChild(scoreRow(set, ex));
      /* Etter levering står fasiten åpen for hele settet, så å prøve på nytt
         ville bare endret eksamensresultatet. Da må settet nullstilles. */
      if (!isSubmitted(set.id)) card.appendChild(el(".row", { style: { marginTop: "14px" } },
        el("button.btn.ghost.sm", { onclick: () => { prøvIgjen(set.id, ex.n); S.app.refresh(); } }, "↺ Prøv på nytt")));
    }

    wrap.appendChild(card);

    const her = synlige.indexOf(cursor);
    const forrige = her > 0 ? synlige[her - 1] : null;
    const neste = her >= 0 && her < synlige.length - 1 ? synlige[her + 1] : null;
    const move = el(".row", { style: { gap: "8px", marginTop: "18px" } },
      forrige != null ? el("button.btn.ghost.sm", { onclick: () => { cursor = forrige; S.app.refresh(); } }, bareUsikre ? "← Forrige usikre" : "← Forrige oppgave") : null,
      el(".spacer"),
      neste != null ? el("button.btn.sm", { onclick: () => { cursor = neste; S.app.refresh(); } }, bareUsikre ? "Neste usikre →" : "Neste oppgave →") : null);
    wrap.appendChild(move);

    /* Det du ikke kunne, samlet for hele settet, så snart noe er rettet feil eller merket. */
    const kopi = kopierRad([set]);
    if (kopi) wrap.appendChild(el(".card", { style: { marginTop: "18px" } },
      el("p.tiny", { style: { margin: "0 0 10px", fontWeight: 620 } }, erGjort(set) ? "Ferdig med settet" : "Det du ikke kunne så langt i settet"),
      kopi));

    if (ex.chapters && ex.chapters.length && S.hasModule("/curriculum")) {
      wrap.appendChild(el(".card", { style: { marginTop: "18px" } },
        el(".tiny.muted", { style: { marginBottom: "8px" } }, "Kapitler denne oppgaven bygger på"),
        el(".row.wrap", { style: { gap: "6px" } }, ...ex.chapters.map((n) => {
          const c = S.data.chapter(n);
          return el(".chip", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${n}`) }, `K${n}${c ? " · " + c.title.slice(0, 28) : ""}`);
        }))));
    }
    return wrap;
  }

  /* ================= eksamensmodus ================= */
  function renderExam(set) {
    stopTicker();
    const wrap = el(".fade-in");
    wrap.appendChild(topBar(set));

    const r = run(set.id);
    if (!r.startedAt) { wrap.appendChild(erKart(set) ? kartStart(set) : startCard(set)); return wrap; }

    const submitted = !!r.submittedAt;
    wrap.appendChild(clockBar(set, submitted));
    const rk = rettingKort(set, submitted);
    if (rk) wrap.appendChild(rk);

    if (submitted) wrap.appendChild(erKart(set) ? kartRapport([set], true) : resultCard(set));

    const harMC = settHarMC(set);
    (set.exercises || []).forEach((ex) => {
      const card = el(".card.pad-lg", { id: "oppg-" + ex.n, style: { marginBottom: "18px" } });
      card.appendChild(exerciseHead(set, ex));
      card.appendChild(body(ex.body));
      const hoved = leddFor(ex, "");
      if (hoved) card.appendChild(mcValg(set, ex, hoved, submitted, !submitted));
      const hel = !(ex.parts || []).length ? delerAv(ex)[0] : null;
      const dHel = hel ? retting(set, ex, "") : null;
      if (dHel) {
        card.appendChild(svarFelt(set, ex, hel, dHel, submitted));
        if (submitted) { const rv = rettVisning(set, ex, hel, dHel); if (rv) card.appendChild(rv); }
      }
      (ex.parts || []).forEach((part) => {
        const pc = el(".sett-part");
        pc.appendChild(delHode(set, ex, part));
        pc.appendChild(body(part.body));
        const ledd = leddFor(ex, part.label);
        if (ledd) pc.appendChild(mcValg(set, ex, ledd, submitted, !submitted));
        const d = retting(set, ex, part.label);
        if (d) {
          pc.appendChild(svarFelt(set, ex, part, d, submitted));
          if (submitted) { const rv = rettVisning(set, ex, part, d); if (rv) pc.appendChild(rv); }
        }
        if (submitted) pc.appendChild(solutionPanel(`Løsning ${part.label})`, part.solution, part.criteria, fasitNøkkel(set.id, ex.n, part.label), riktigDel(set, ex, part)));
        card.appendChild(pc);
      });
      if (submitted) {
        if (!(ex.parts || []).length) card.appendChild(solutionPanel("Løsning", ex.solution, ex.criteria, fasitNøkkel(set.id, ex.n, "hel"), alleRiktige(set, ex)));
        else if (ex.solution) card.appendChild(solutionPanel("Samlet kommentar", ex.solution, null, fasitNøkkel(set.id, ex.n, "kommentar"), alleRiktige(set, ex)));
        if (erMC(ex)) {
          const r = mcRett(set, ex, wrongFactor(set));
          card.appendChild(el(".explain", { style: { marginTop: "14px" } },
            el("b", `${pts(r.got)} av ${r.of} poeng`), ` · ${r.rett} riktig, ${r.galt} feil, ` + (r.vet ? `${r.vet} vet ikke, ` : "") + `${r.blank} ubesvart`));
        } else card.appendChild(scoreRow(set, ex));
      }
      wrap.appendChild(card);
    });

    if (!submitted) {
      const blanke = harMC ? (set.exercises || []).reduce((n, ex) => n + mcRett(set, ex, 0).blank, 0) : 0;
      wrap.appendChild(el(".card.pad-lg", { style: { textAlign: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" } },
        el("p", { style: { margin: "0 0 14px", fontSize: "15px", lineHeight: 1.55 } },
          el("b", "Ferdig? "), erKart(set) ? "Når du leverer, rettes alt og du får en rapport over hva som sitter og hva du må øve på. Løsningene åpnes samtidig."
            : harMC ? "Når du leverer, rettes flervalgene automatisk og alle løsningene åpnes." : "Når du leverer, åpnes alle løsningene samtidig, og du poengsetter deg selv oppgave for oppgave."),
        blanke ? el("p.tiny.muted", { style: { margin: "0 0 12px" } }, `${blanke} ${blanke === 1 ? "ledd står" : "ledd står"} ubesvart` + (wrongFactor(set) ? " — det gir 0, som er bedre enn et feil svar hvis du er i tvil" : "")) : null,
        el("button.btn.primary.lg", { onclick: () => {
          if (confirm("Levere besvarelsen? Løsningene åpnes, og du kan ikke lukke dem igjen uten å nullstille settet.")) { submitRun(set.id); mcRettAlle(set); rettSettAutomatisk(set); stopTicker(); S.app.refresh(); }
        } }, "Lever besvarelsen")));
    }
    return wrap;
  }

  /* Faktalinjene er fagets egne (set.facts). Standardlisten er skrevet for en
     skriftlig eksamen med formelark, og passer ikke et fag med digital flervalg —
     derfor kan settet overstyre den. */
  const STANDARD_FAKTA = [
    "Penn og papir. Kalkulator og tospråklig ordbok er tillatt; ingenting annet.",
    "Formelarket får du utlevert på eksamen — ha det tilgjengelig, men ikke annet.",
    "Skriv på engelsk, som på ekte eksamen.",
  ];
  function startCard(set) {
    const card = el(".card.pad-lg");
    card.appendChild(el("h3", { style: { fontSize: "20px", marginBottom: "10px" } }, "Eksamensmodus"));
    card.appendChild(el("p", { style: { fontSize: "15px", lineHeight: 1.6, color: "var(--ink-2)" } },
      `Hele settet vises samtidig med nedtelling fra ${set.minutes} minutter. Ingen fasit er tilgjengelig noe sted før du leverer.`));
    const facts = el("ul", { style: { fontSize: "14.5px", lineHeight: 1.7, color: "var(--ink-2)", paddingLeft: "20px" } });
    [
      `${set.points} poeng på ${set.minutes} minutter — det er ${(set.minutes / set.points).toFixed(1).replace(".", ",")} minutter per poeng.`,
      ...(set.facts || STANDARD_FAKTA),
      "Nedtellingen overlever at du lukker fanen, så en uhellsvangert oppfriskning ødelegger ingenting.",
    ].forEach((t) => facts.appendChild(el("li", frag(t))));
    card.appendChild(facts);

    /* Minuspoeng velges per økt, så et eldre sett uten straff kan kjøres slik
       eksamen faktisk blir. Forvalget følger settet. */
    let wf = (set.mc && typeof set.mc.wrongFactor === "number") ? set.mc.wrongFactor : 0;
    if (settHarMC(set)) {
      const boks = el("label.check" + (wf ? ".done" : ""), { style: { display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "14px", cursor: "pointer" } });
      const cb = el("input", { type: "checkbox" }); cb.checked = !!wf;
      cb.addEventListener("change", () => { wf = cb.checked ? -1 / 3 : 0; boks.classList.toggle("done", cb.checked); });
      boks.appendChild(cb);
      boks.appendChild(el("div",
        el("div", { style: { fontWeight: 620 } }, "Minuspoeng for feil svar"),
        el(".tiny.muted", "Som på eksamen høsten 2026: feil svar trekker en tredel av oppgavens poeng, ubesvart gir null. Forventet verdi av å gjette blindt blant fire er da null — og positiv først når du har utelukket ett alternativ.")));
      card.appendChild(boks);
    }

    card.appendChild(el(".row", { style: { marginTop: "16px", gap: "8px" } },
      el("button.btn.primary.lg", { onclick: () => { startRun(set.id, "exam", wf); S.app.refresh(); } }, "Start eksamen"),
      el("button.btn.ghost", { onclick: () => { mode = "practice"; cursor = 0; S.app.refresh(); } }, "Heller øvingsmodus")));
    return card;
  }

  function clockBar(set, submitted) {
    const bar = el(".exam-clock" + (submitted ? ".done" : ""));
    /* Etter levering viser klokka brukt tid. Fryst nedtelling ble lest som brukt tid.
       Kartleggingen har ingen nedtelling: klokka viser brukt tid hele veien. */
    const kart = erKart(set);
    const brukt = () => { const r = run(set.id); return (r.submittedAt || S.u.nowTs()) - r.startedAt; };
    const ms = kart ? brukt() : submitted ? (set.minutes || 180) * 60000 - remainingMs(set) : remainingMs(set);
    const time = el(".ec-t", fmtClock(ms));
    bar.appendChild(el(".ec-l", submitted ? "Levert · brukt tid" : kart ? "Brukt tid" : "Tid igjen"));
    bar.appendChild(time);
    bar.appendChild(el(".spacer"));
    bar.appendChild(el(".tiny", { style: { opacity: .85 } }, kart ? `${set.points} ledd · rundt ${set.minutes} min` : `${set.points} poeng · ${(set.exercises || []).length} oppgaver`));
    if (!submitted) {
      ticker = setInterval(() => {
        if (!document.body.contains(time)) return stopTicker();
        if (kart) { time.textContent = fmtClock(brukt()); return; }
        const ms = remainingMs(set);
        time.textContent = fmtClock(ms);
        bar.classList.toggle("over", ms < 0);
      }, 1000);
    }
    return bar;
  }

  function resultCard(set) {
    const sum = scoreSum(set);
    const harMC = settHarMC(set);
    const bareMC = harMC && (set.exercises || []).every(erMC);
    const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    const medRetting = rettingPå(set);
    card.appendChild(el("h3", { style: { fontSize: "18px", marginBottom: "6px" } }, bareMC || medRetting ? "Resultat" : "Selvvurdering"));
    card.appendChild(el("p.tiny.muted", { style: { marginTop: 0 } },
      medRetting ? "Tallene du førte inn er rettet automatisk, og tekstsvarene retter Claude når du ber om det. En oppgave får poeng når alle delene er rettet. Det som ikke kan rettes, vurderer du selv mot fasitens kriterier."
      : bareMC ? "Flervalgene er rettet automatisk. Gå gjennom hver oppgave og les fasiten der du bommet — det er der læringen ligger."
      : harMC ? "Flervalgene er rettet automatisk. De åpne oppgavene poengsetter du selv mot fasitens kriterier. Vær streng — sensor er det."
      : "Gå gjennom oppgave for oppgave og gi deg selv poeng mot fasitens kriterier. Vær streng — sensor er det."));
    const pct = sum.of ? Math.max(0, Math.round((sum.got / sum.of) * 100)) : 0;
    const info = el("div",
      el("div", { style: { fontSize: "22px", fontWeight: 680 } }, `${pts(sum.got)} / ${sum.of} poeng`),
      el(".tiny.muted", bareMC ? `${sum.total} oppgaver rettet` : `${sum.scored} av ${sum.total} oppgaver vurdert`));
    if (harMC) {
      const wf = wrongFactor(set);
      const tell = (set.exercises || []).reduce((a, ex) => { const r = mcRett(set, ex, wf); a.rett += r.rett; a.galt += r.galt; a.blank += r.blank; return a; }, { rett: 0, galt: 0, blank: 0 });
      info.appendChild(el(".tiny.muted", { style: { marginTop: "4px" } }, `${tell.rett} riktig · ${tell.galt} feil · ${tell.blank} ubesvart` + (wf ? " · med minuspoeng" : " · uten minuspoeng")));
      /* Det samme settet under den andre regelen — så du ser hva gjettingen koster. */
      const annenWf = wf ? 0 : -1 / 3;
      const annen = (set.exercises || []).reduce((s, ex) => s + (erMC(ex) ? mcRett(set, ex, annenWf).got : (exState(set.id, ex.n).score || 0)), 0);
      info.appendChild(el(".tiny.muted", { style: { marginTop: "2px" } }, `${wf ? "Uten" : "Med"} minuspoeng ville det vært ${pts(Math.round(annen * 100) / 100)} poeng.`));
    } else if (!medRetting) {
      info.appendChild(el("p.tiny.muted", { style: { marginTop: "8px", maxWidth: "420px" } },
        "Poengsummen er din egen vurdering, ikke en karakter. Den er verdt noe bare hvis du trekker fra der utregningen manglet eller mekanismen ikke ble navngitt."));
    }
    card.appendChild(el(".row.wrap", { style: { gap: "18px", alignItems: "center", marginTop: "10px" } },
      S.u.ring(pct, 92, `${pct}%`, "av maks"), info));
    const kopi = kopierRad([set]);
    if (kopi) card.appendChild(el("div", { style: { marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--line)" } }, kopi));
    return card;
  }

  /* ================= kartlegging ================= */
  const kartTemaer = () => ((window.EDU_DATA.kartlegging || {}).temaer) || [];
  const delNr = (set) => set.del || 0;
  const antallLedd = (set) => (set.exercises || []).reduce((n, ex) => n + mcLedd(ex).length, 0);
  const antallBesvart = (set) => (set.exercises || []).reduce((n, ex) => {
    const valg = exState(set.id, ex.n).valg || {};
    return n + mcLedd(ex).filter((l) => valg[l.nøkkel] != null).length;
  }, 0);

  function kartListe(wrap, kart) {
    const deler = kart.slice().sort((a, b) => delNr(a) - delNr(b));
    const rapport = kartRapport(deler, false);
    if (rapport) wrap.appendChild(rapport);
    const list = el(".stack", { style: { gap: "14px" } });
    deler.forEach((set) => list.appendChild(kartKort(set)));
    wrap.appendChild(list);
  }

  function kartKort(set) {
    const r = run(set.id);
    const done = !!r.submittedAt, started = !!r.startedAt && !done;
    const n = antallLedd(set);
    const card = el(".card.pad-lg");
    card.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "19px" } }, set.label),
      el(".spacer"),
      done ? el(".chip.green", el(".dot"), "Levert") : started ? el(".chip.amber", el(".dot"), "Påbegynt") : null));
    card.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "8px 0 12px" } },
      el(".chip", icon("clock"), `rundt ${set.minutes} min`),
      el(".chip", `${n} ledd`),
      el(".chip.slate", "uten nedtelling")));
    const ids = [...new Set((set.exercises || []).flatMap((ex) => mcLedd(ex).map((l) => l.tema)).filter(Boolean))];
    const navn = ids.map((id) => (kartTemaer().find((t) => t.id === id) || {}).navn || id);
    if (navn.length) card.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "14px" } },
      ...navn.map((t) => el(".chip.slate", { style: { fontSize: "11px" } }, t))));
    if (started) card.appendChild(el(".explain", { style: { marginBottom: "14px" } }, el("b", `${antallBesvart(set)} av ${n} besvart`), " · fortsett der du slapp"));
    if (done) {
      const t = (set.exercises || []).reduce((a, ex) => { const x = mcRett(set, ex, 0); a.rett += x.rett; a.vet += x.vet; return a; }, { rett: 0, vet: 0 });
      card.appendChild(el(".explain", { style: { marginBottom: "14px" } }, el("b", `${t.rett} av ${n} riktige`), t.vet ? ` · ${t.vet} vet ikke` : ""));
    }
    card.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn" + (done ? "" : ".primary"), { onclick: () => { openSet = set.id; mode = "exam"; S.app.refresh(); } },
        done ? "Se svar og fasit" : started ? "Fortsett" : `Start del ${delNr(set)}`),
      (done || started) ? el("button.btn.ghost.sm", { onclick: () => {
        if (confirm(`Nullstille «${set.label}»? Svarene og rapporten for denne delen slettes. Kan ikke angres.`)) { resetRun(set.id); S.app.refresh(); }
      } }, "Nullstill delen") : null));
    return card;
  }

  function kartStart(set) {
    const card = el(".card.pad-lg");
    card.appendChild(el("h3", { style: { fontSize: "20px", marginBottom: "10px" } }, set.label));
    card.appendChild(el("p", { style: { fontSize: "15px", lineHeight: 1.6, color: "var(--ink-2)" } },
      `${antallLedd(set)} flervalgsledd. Ingen nedtelling: sett av rundt ${set.minutes} minutter, gjerne i én økt. Klokka viser hvor lenge du har brukt.`));
    const facts = el("ul", { style: { fontSize: "14.5px", lineHeight: 1.7, color: "var(--ink-2)", paddingLeft: "20px" } });
    [
      "Svar så godt du kan på alle leddene. Målet er et ærlig bilde av hva du kan, ikke en høy poengsum.",
      "Velg «Vet ikke» når du ikke vet. Et gjettet riktig svar skjuler hullet rapporten skal finne.",
      "Merk ⚐ Usikker på ledd der du valgte mellom to. Et riktig svar du var usikker på, teller halvt i rapporten.",
      "Regn på papir. Ingen minuspoeng. Fasit og rapport åpnes når du leverer.",
      ...(set.facts || []),
      "Du kan lukke fanen og komme tilbake. Svarene er lagret.",
    ].forEach((t) => facts.appendChild(el("li", frag(t))));
    card.appendChild(facts);
    card.appendChild(el(".row", { style: { marginTop: "16px", gap: "8px" } },
      el("button.btn.primary.lg", { onclick: () => { startRun(set.id, "exam", 0); S.app.refresh(); } }, `Start del ${delNr(set)}`),
      el("button.btn.ghost", { onclick: () => { openSet = null; del = "kart"; S.app.refresh(); } }, "Tilbake")));
    return card;
  }

  /* Leddene i leverte deler, samlet per tema. Sikkert riktig teller 1, riktig
     men merket usikker 0,5, feil, «Vet ikke» og ubesvart 0. */
  function kartAnalyse(sets) {
    const per = {};
    const levert = sets.filter((s) => isSubmitted(s.id));
    levert.forEach((set) => (set.exercises || []).forEach((ex) => {
      const valg = exState(set.id, ex.n).valg || {};
      mcLedd(ex).forEach((l) => {
        if (!l.tema) return;
        const t = per[l.tema] || (per[l.tema] = { n: 0, rett: 0, usikker: 0, feil: 0, vet: 0, blank: 0, feilene: [], hvor: [] });
        const i = valg[l.nøkkel];
        const sted = { set, ex, etikett: nrAv(ex) + l.nøkkel };
        t.n++;
        if (i == null) { t.blank++; t.hvor.push(Object.assign(sted, { hva: "ubesvart" })); }
        else if (i === VET_IKKE) { t.vet++; t.hvor.push(Object.assign(sted, { hva: "vet ikke" })); }
        else if (riktig(l, i)) {
          if (erUsikker(set.id, ex.n, l.nøkkel)) { t.usikker++; t.hvor.push(Object.assign(sted, { hva: "usikker" })); } else t.rett++;
        } else {
          t.feil++; t.hvor.push(Object.assign(sted, { hva: "feil" }));
          if (l.diag && l.diag[i]) t.feilene.push(l.diag[i]);
        }
      });
    }));
    Object.values(per).forEach((t) => { t.m = t.n ? (t.rett + 0.5 * t.usikker) / t.n : 0; });
    return { per, levert };
  }
  const kartKat = (m) => (m >= 0.85 ? "sitter" : m >= 0.5 ? "ustø" : "øv");

  /* Rapporten. enDel: bare temaene i den ene delen, vist over fasiten. Ellers
     den samlede, øverst i fanen, med det som ikke er kartlagt ennå. */
  function kartRapport(sets, enDel) {
    const { per, levert } = kartAnalyse(sets);
    if (!levert.length) return null;
    const temaer = kartTemaer();
    const sum = Object.values(per).reduce((a, t) => { ["n", "rett", "usikker", "feil", "vet", "blank"].forEach((k) => (a[k] += t[k])); return a; },
      { n: 0, rett: 0, usikker: 0, feil: 0, vet: 0, blank: 0 });
    const pct = sum.n ? Math.round((sum.rett + 0.5 * sum.usikker) / sum.n * 100) : 0;

    const card = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    card.appendChild(el("h3", { style: { fontSize: "19px", marginBottom: "6px" } }, enDel ? "Rapport for denne delen" : "Samlet rapport"));
    const mangler = sets.filter((s) => !isSubmitted(s.id)).sort((a, b) => delNr(a) - delNr(b));
    card.appendChild(el("p.tiny.muted", { style: { marginTop: 0 } },
      enDel ? "Bare temaene i denne delen. Den samlede rapporten under Kartlegging slår sammen alle delene du har levert."
        : `${levert.length} av ${sets.length} deler levert.` + (mangler.length ? ` Del ${mangler.map(delNr).join(" og ")} gjenstår, så rapporten dekker ikke hele pensum ennå.` : " Rapporten dekker hele pensum.")));
    const deler = [`Sikkert riktig: ${sum.rett} av ${sum.n}`];
    if (sum.usikker) deler.push(`Riktig, men usikker: ${sum.usikker}`);
    if (sum.feil) deler.push(`Feil: ${sum.feil}`);
    if (sum.vet) deler.push(`Vet ikke: ${sum.vet}`);
    if (sum.blank) deler.push(`Ubesvart: ${sum.blank}`);
    card.appendChild(el(".row.wrap", { style: { gap: "18px", alignItems: "center", margin: "10px 0 6px" } },
      S.u.ring(pct, 92, `${pct}%`, "mestring"),
      el("div", el("div", { style: { fontSize: "15px", fontWeight: 620, lineHeight: 1.6 } }, deler.join(" · ")),
        el(".tiny.muted", { style: { maxWidth: "460px", marginTop: "4px" } }, "Mestring: sikkert riktig teller 1, riktig men usikker teller halvt, feil og «Vet ikke» teller 0. Et tema sitter fra 85 %."))));

    const vurdert = temaer.filter((t) => per[t.id]).map((t) => ({ t, d: per[t.id], k: kartKat(per[t.id].m), prio: (t.vekt || 1) * (1 - per[t.id].m) }));
    const jobb = vurdert.filter((x) => x.k !== "sitter").sort((a, b) => b.prio - a.prio || a.d.m - b.d.m);
    if (jobb.length) {
      card.appendChild(el("h4", { style: { margin: "18px 0 2px" } }, "Jobb med dette, viktigst først"));
      card.appendChild(el("p.tiny.muted", { style: { margin: "0 0 4px" } }, "Rekkefølgen er hvor mye temaet teller på eksamen ganger hvor mye som mangler."));
      jobb.forEach((x) => card.appendChild(kartTemaRad(x)));
    } else {
      card.appendChild(el(".explain", { style: { marginTop: "14px" } }, el("b", "Alt sitter. "), "Ingen av temaene i " + (enDel ? "denne delen" : "de leverte delene") + " er under 85 %."));
    }
    const sitter = vurdert.filter((x) => x.k === "sitter");
    if (sitter.length) {
      card.appendChild(el("h4", { style: { margin: "18px 0 8px" } }, "Dette sitter"));
      card.appendChild(el(".row.wrap", { style: { gap: "6px" } },
        ...sitter.map((x) => el(".chip.green", `${x.t.navn} · ${x.d.rett + x.d.usikker}/${x.d.n}`))));
    }
    if (!enDel) {
      const ikke = temaer.filter((t) => !per[t.id]);
      if (ikke.length) card.appendChild(el("p.tiny.muted", { style: { margin: "16px 0 0" } },
        el("b", "Ikke kartlagt ennå: "), ikke.map((t) => t.navn).join(", ") + "."));
    }
    const kopi = kopierRad(levert);
    if (kopi) card.appendChild(el("div", { style: { marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--line)" } }, kopi));
    return card;
  }

  function kartTemaRad({ t, d, k }) {
    const box = el("div", { style: { borderTop: "1px solid var(--line)", padding: "12px 0 10px" } });
    box.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      el("b", { style: { fontSize: "15px" } }, t.navn),
      el(k === "øv" ? ".chip.rose" : ".chip.amber", k === "øv" ? "Må øves" : "Ustø"),
      el(".spacer"),
      el(".tiny.muted", `${d.rett + d.usikker} av ${d.n} riktige` + (d.usikker ? `, ${d.usikker} av dem usikre` : ""))));
    box.appendChild(el("div", { style: { maxWidth: "320px", margin: "6px 0 8px" } }, S.u.bar(d.m * 100)));
    const feilene = [...new Set(d.feilene)];
    if (feilene.length) {
      const ul = el("ul", { style: { margin: "0 0 8px", paddingLeft: "20px", fontSize: "14px", lineHeight: 1.55 } });
      feilene.forEach((f) => ul.appendChild(el("li", f)));
      box.appendChild(ul);
    }
    /* Leddene som trakk ned, klikkbare: åpner delen med fasiten ved leddet. */
    if (d.hvor.length) box.appendChild(el(".row.wrap", { style: { gap: "6px", alignItems: "center", marginBottom: "8px" } },
      el(".tiny.muted", "Leddene:"),
      ...d.hvor.map((h) => el("button.chip.sett-nav", { type: "button", onclick: () => {
        openSet = h.set.id; mode = "exam"; S.app.refresh();
        /* «instant»: siden har scroll-behavior: smooth, og en myk rulling ble avbrutt. */
        setTimeout(() => { const n = document.getElementById("oppg-" + h.ex.n);
          if (n) window.scrollTo({ top: n.getBoundingClientRect().top + window.scrollY - 16, behavior: "instant" }); }, 30);
      } }, `Del ${delNr(h.set)} · ${h.etikett} ${h.hva}`))));
    if ((t.øv || []).length) box.appendChild(el(".row.wrap", { style: { gap: "6px" } },
      ...t.øv.map(([tekst, rute]) => el("button.btn.sm", { onclick: sh().go(rute) }, tekst))));
    return box;
  }

  /* ================= det du ikke kunne, som tekst ================= */
  /* «Kopier det jeg ikke kunne» (fra 25. november 2026). Samler deloppgavene du ikke
     fikk full uttelling på (feil, delvis riktig, «Vet ikke», ubesvart) og dem du har
     merket som usikre, med oppgaveteksten, svaret ditt, fasiten, feilen og Claudes
     retting. Teksten er bare en beskrivelse, uten bestilling til noen (Magnus ville
     det slik 25. november 2026, så den kan brukes til flere ting). Bare ledd som er
     rettet eller merket kommer med. Knappen står i
     resultatet etter levering, nederst i øvingsmodus, på settkortet, i «Usikre og
     feil» og i kartleggingsrapporten. Retting som er gjort med nøkkel, leses også
     uten nøkkel, så rapporten er den samme på alle enheter. */
  /* Hevet og senket skrift skrives som ^ og _, ellers blir (1,03/1,08)<sup>15</sup>
     til «…15» og r<sub>E</sub> til «rE». */
  const renTekst = (html) => {
    const h = String(html || "").replace(/<sup[^>]*>/gi, "^").replace(/<sub[^>]*>/gi, "_").replace(/<\/su[pb]>/gi, "");
    return S.claude && S.claude.ren ? S.claude.ren(h) : h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  };
  const kutt = (s, n) => { s = String(s || "").trim(); return s.length > n ? s.slice(0, n).trimEnd() + " …" : s; };
  const tilStede = (x) => !!String(x == null ? "" : x).trim();
  const dato = (ts) => new Date(ts).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });

  /* Status for én deloppgave (eller hele oppgaven, etikett ""). hva: "riktig", "feil",
     "delvis", "vet ikke", "ubesvart", "selv" (selvvurdert under full uttelling) eller
     null (ikke rettet). art: "mc", "rett" (ført inn og rettet) eller null. */
  function leddStatus(set, ex, part) {
    const e = part.label;
    const s = { part, etikett: e, maks: delPoeng(ex, part), poeng: null, hva: null, art: null,
      usikker: erUsikker(set.id, ex.n, e) || (!!e && erUsikker(set.id, ex.n, "")) };
    const ledd = leddFor(ex, e);
    if (ledd) {
      s.art = "mc"; s.ledd = ledd; s.maks = ledd.points;
      if (!rettet(set.id, ex.n, e)) {
        if (readKey(feilKey(set.id, ex.n, e)).f === 1) { s.hva = "feil"; s.gammel = true; }
        return s;
      }
      const i = (exState(set.id, ex.n).valg || {})[e]; s.valg = i;
      if (i == null) { s.hva = "ubesvart"; s.poeng = 0; }
      else if (i === VET_IKKE) { s.hva = "vet ikke"; s.poeng = 0; }
      else if (riktig(ledd, i)) { s.hva = "riktig"; s.poeng = ledd.points; }
      else { s.hva = "feil"; s.poeng = Math.round(ledd.points * wrongFactor(set) * 100) / 100; }
      return s;
    }
    const d = !erKart(set) && !erMC(ex) ? svarData(set, ex, e) : null;
    const r = d ? rettFor(set, ex, e) : null;
    if (!r) return s;
    s.art = "rett"; s.d = d; s.r = r; s.inn = innFor(set, ex, e);
    /* Rettet på nytt etter fasiten: det første svaret avgjør om delen er med. */
    s.førsteFeil = !!r.første && feilIRetting(r.første, s.maks);
    s.venter = harTekst(d) && r.cp == null;
    s.poeng = Math.round(((r.tp || 0) + (r.cp || 0)) * 100) / 100;
    const tallFeil = (r.tall || []).some((x) => x === false) && !r.følge;
    /* Venter teksten på Claude og tallene er riktige, vet vi ikke ennå. */
    if (s.venter && !tallFeil) return s;
    s.hva = s.poeng >= s.maks - 1e-9 ? "riktig" : s.poeng <= 0 ? "feil" : "delvis";
    return s;
  }
  /* En oppgave uten flervalg og uten innførte svar er selvvurdert som helhet. Da vet
     vi ikke hvilke deler som trakk ned, så alle delene kommer med. */
  function oppgStatus(set, ex) {
    const deler = delerAv(ex).map((p) => leddStatus(set, ex, p));
    let selv = null;
    if (!deler.some((s) => s.art)) {
      const sc = exState(set.id, ex.n).score;
      if (typeof sc === "number") {
        selv = { poeng: sc, maks: ex.points || 0 };
        const full = sc >= (ex.points || 0) - 1e-9;
        deler.forEach((s) => { s.hva = full ? "riktig" : "selv"; });
      }
    }
    return { ex, deler, selv };
  }
  const trengerRepetisjon = (s) => s.usikker || s.førsteFeil || (!!s.hva && s.hva !== "riktig");
  function rapportFor(set) {
    const oppg = (set.exercises || []).map((ex) => oppgStatus(set, ex));
    return { oppg, med: oppg.flatMap((o) => o.deler.filter(trengerRepetisjon)) };
  }

  function statusTekst(s) {
    const p = s.poeng != null && s.maks ? ` · ${pts(s.poeng)} av ${pts(s.maks)} p` : "";
    const us = s.usikker ? " · merket usikker" : "";
    if (s.hva === "riktig") return s.førsteFeil ? "Riktig etter ny retting, men feil før jeg så fasiten" + p + us : "Riktig, men merket usikker" + p;
    if (!s.hva) return (s.førsteFeil ? "Rettet på nytt etter fasiten" : "Merket usikker") + (s.venter ? ", tekstsvaret er ikke rettet ennå" : ", ikke rettet ennå");
    const navn = { feil: "Feil", delvis: "Delvis riktig", "vet ikke": "Vet ikke", ubesvart: "Ubesvart", selv: "Ikke full uttelling (selvvurdert)" }[s.hva];
    return navn + p + (s.førsteFeil ? " · også etter ny retting" : "") + us;
  }
  function leddLinjer(s) {
    const ut = [];
    if (s.art === "mc") {
      const l = s.ledd, opt = (i) => `${String.fromCharCode(65 + i)}) ${renTekst(String(l.options[i]))}`;
      ut.push("Alternativene:", ...l.options.map((o, i) => "- " + opt(i)));
      if (s.gammel) ut.push("Svaret mitt: feil sist jeg svarte. Selve svaret er slettet siden.");
      else ut.push("Svaret mitt: " + (s.valg == null ? "ubesvart" : s.valg === VET_IKKE ? "«Vet ikke»" : opt(s.valg)));
      ut.push("Riktig svar: " + (Array.isArray(l.answer) ? l.answer : [l.answer]).map(opt).join(" eller "));
      if (s.valg != null && s.valg >= 0 && !riktig(l, s.valg) && l.diag && l.diag[s.valg]) ut.push("Feilen: " + renTekst(l.diag[s.valg]));
    } else if (s.art === "rett") {
      const { d, r, inn } = s, f = r.første;
      /* Rettet på nytt: først svaret før fasiten, så det nye. */
      if (f) {
        const fp = f.cp != null || !harTekst(d) ? ` (${pts((f.tp || 0) + (f.cp || 0))} av ${pts(s.maks)} p)` : "";
        ut.push(`Første svar, før jeg så fasiten${fp}:`);
        if (!f.svar) ut.push("- Selve svaret ble ikke lagret.");
        else if (d.type === "bokstav") ut.push(`- ${tilStede(f.svar.b) ? f.svar.b : "(tomt)"} ${f.tall && f.tall[0] ? "✓" : "✗"}`);
        else {
          (d.tall || []).forEach((t, i) => {
            const v = (f.svar.t || [])[i];
            ut.push(`- ${renTekst(t.navn)}: ${tilStede(v) ? String(v).trim() : "(tomt)"} ${f.tall && f.tall[i] ? "✓" : "✗"}`);
          });
          if (harTekst(d) && !samme(f.svar.x, inn.x)) ut.push(tilStede(f.svar.x) ? '- Tekstsvaret:\n"""\n' + kutt(f.svar.x, 1500) + '\n"""' : "- Tekstsvaret: (tomt)");
        }
      }
      if (d.type === "bokstav") ut.push(`${f ? "Svaret etter ny retting" : "Svaret mitt"}: ${tilStede(inn.b) ? inn.b : "(tomt)"} · fasit ${d.svar}`);
      else if ((d.tall || []).length) {
        ut.push(f ? "Tallene etter ny retting:" : "Tallene mine:");
        d.tall.forEach((t, i) => {
          const mitt = (inn.t || [])[i];
          ut.push(`- ${renTekst(t.navn)}: ${tilStede(mitt) ? String(mitt).trim() : "(tomt)"} · fasit ${visTall(t.verdi, t.enhet)} ${r.tall && r.tall[i] ? "✓" : "✗"}`);
        });
      }
      if (r.ft) ut.push((r.følge ? "Følgefeil godkjent: " : "Ikke følgefeil: ") + r.ft);
      if (harTekst(d)) {
        ut.push("Tekstsvaret mitt" + (d.tekstLedd ? ` (${d.tekstLedd})` : "") + ":");
        ut.push(tilStede(inn.x) ? '"""\n' + kutt(inn.x, 3000) + '\n"""' : "(tomt)");
        if (r.tb) ut.push("Claudes retting av tekstsvaret:", kutt(r.tb, 2500));
        else if (s.venter) ut.push("Tekstsvaret er ikke rettet ennå.");
      }
    }
    if (tilStede(s.part.solution)) ut.push("Løsning:", kutt(renTekst(s.part.solution), 4000));
    if ((s.part.criteria || []).length) ut.push("Dette må være med:", ...s.part.criteria.map((k) => "- " + renTekst(k)));
    return ut;
  }
  function oppgTekst(o, med) {
    const ex = o.ex;
    const ut = [`## Oppgave ${nrAv(ex)}${ex.title ? " · " + ex.title : ""}${ex.points ? ` (${pts(ex.points)} p)` : ""}`];
    const info = [ex.topic ? "Tema: " + ex.topic : null, ex.kilde ? "Hentet fra " + ex.kilde : null, ex.merke || null].filter(Boolean);
    if (info.length) ut.push(info.join(" · "));
    if (o.selv && o.selv.poeng < o.selv.maks - 1e-9) ut.push(`Selvvurdert til ${pts(o.selv.poeng)} av ${pts(o.selv.maks)} p. Hvilke deler som trakk ned, er ikke registrert.`);
    if (tilStede(ex.body)) ut.push("", renTekst(ex.body));
    med.forEach((s) => {
      ut.push("", `### ${s.etikett ? nrAv(ex) + s.etikett + ")" : "Hele oppgaven"} · ${statusTekst(s)}`);
      if (s.etikett && tilStede(s.part.body)) ut.push(renTekst(s.part.body));
      ut.push(...leddLinjer(s));
    });
    if ((ex.parts || []).length && tilStede(ex.solution)) ut.push("", "Samlet kommentar til oppgaven:", kutt(renTekst(ex.solution), 2500));
    return ut;
  }
  /* kunPåbegynte: «Ikke rettet ennå» tar bare med oppgaver der noe er rettet eller
     merket (problem sets er lange og du tar én oppgave om gangen). */
  function settTekst(set, rap, kunPåbegynte) {
    const sum = scoreSum(set);
    const info = [`Sett-id: ${set.id}`, isSubmitted(set.id) ? `levert i eksamensmodus ${dato(run(set.id).submittedAt)}` : "øvingsmodus"];
    if (sum.scored) info.push(`${pts(sum.got)} av ${pts(sum.of)} poeng på ${sum.scored} av ${sum.total} oppgaver`);
    if (settHarMC(set) && wrongFactor(set)) info.push("med minuspoeng for feil svar");
    const ut = [`# ${set.label}`, info.join(" · ")];
    const NAVN = { feil: "feil", delvis: "delvis riktig", "vet ikke": "«Vet ikke»", ubesvart: "ubesvart", selv: "selvvurdert under full uttelling", første: "riktig først etter fasiten", usikker: "usikker uten feil" };
    const tell = {};
    rap.med.forEach((s) => { const k = s.hva && s.hva !== "riktig" ? s.hva : s.førsteFeil ? "første" : "usikker"; tell[k] = (tell[k] || 0) + 1; });
    ut.push("Med her: " + Object.entries(tell).map(([k, n]) => `${NAVN[k]} ${n}`).join(", "));
    const alle = rap.oppg.flatMap((o) => o.deler.map((s) => ({ s, navn: nrAv(o.ex) + s.etikett })));
    const ok = alle.filter((x) => x.s.hva === "riktig" && !x.s.usikker && !x.s.førsteFeil).map((x) => x.navn);
    const påbegynt = (ex) => rap.oppg.some((o) => o.ex === ex && o.deler.some((s) => s.hva || s.usikker));
    const ikke = rap.oppg.flatMap((o) => (kunPåbegynte && !påbegynt(o.ex) ? [] : o.deler.map((s) => ({ s, navn: nrAv(o.ex) + s.etikett }))))
      .filter((x) => !x.s.hva && !x.s.usikker).map((x) => x.navn);
    if (ok.length) ut.push("Riktig og sikker (ikke med): " + ok.join(", "));
    if (ikke.length) ut.push("Ikke rettet ennå: " + ikke.join(", "));
    rap.oppg.forEach((o) => { const med = o.deler.filter(trengerRepetisjon); if (med.length) ut.push("", ...oppgTekst(o, med)); });
    return ut;
  }
  function rapportTekst(sets, opts) {
    opts = opts || {};
    const sub = window.EDU_SUBJECT || {};
    const med = sets.map((set) => ({ set, rap: rapportFor(set) })).filter((x) => x.rap.med.length);
    /* Bare beskrivelsen, ingen bestilling: teksten skal kunne brukes til hva som helst. */
    const ut = [
      `Det jeg ikke kunne i ${sub.name || "faget"}`,
      "",
      "Deloppgavene jeg ikke fikk full uttelling på (feil, delvis riktig, «Vet ikke» eller ubesvart), dem jeg merket som usikre og dem jeg først fikk riktig etter å ha sett fasiten. For hver står oppgaven, svaret mitt, fasiten og hva som gikk galt.",
      "",
      `Fra ${opts.kilde || "Eksamenssett"} i appen, ${dato(S.u.nowTs())}. Fag-id: ${sub.id || "ukjent"}. ${med.length === 1 ? "Ett sett" : med.length + " sett"}.`,
    ];
    med.forEach(({ set, rap }) => ut.push("", ...settTekst(set, rap, opts.kunPåbegynte)));
    return ut.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  /* Knappen. null når det ikke er noe å kopiere. */
  function kopierKnapp(sets, opts) {
    opts = opts || {};
    const n = sets.reduce((a, set) => a + rapportFor(set).med.length, 0);
    if (!n) return null;
    return el("button.btn.sm" + (opts.primary ? ".primary" : ".ghost"), { type: "button",
      title: "Kopierer feil, delvis riktige og usikre deloppgaver med svaret ditt, fasiten og feilen",
      onclick: async () => {
        const ok = await S.u.tilUtklipp(rapportTekst(sets, opts));
        S.u.toast(ok ? `Kopiert: ${n} ${n === 1 ? "deloppgave" : "deloppgaver"}` : "Fikk ikke kopiert. Prøv igjen, eller i en annen nettleser.");
      } }, `${opts.tekst || "Kopier det jeg ikke kunne"} (${n})`);
  }
  /* Knappen med forklaring, til resultatet, øvingsmodus og kartleggingsrapporten. */
  function kopierRad(sets, opts) {
    const knapp = kopierKnapp(sets, Object.assign({ primary: true }, opts || {}));
    if (!knapp) return null;
    const venter = sets.reduce((n, set) => n + ventendeTekst(set).length, 0);
    return el(".row.wrap", { style: { gap: "10px", alignItems: "center" } }, knapp,
      el("span.tiny.muted", { style: { flex: "1 1 260px", lineHeight: 1.5 } },
        "Kopierer det du svarte feil eller delvis feil på, det du merket som usikkert og det du rettet etter å ha sett fasiten. Hver del kommer med oppgaven, svaret ditt, fasiten og hva som gikk galt."
        + (venter ? ` ${venter} tekstsvar er ikke rettet ennå. Rett dem først, så kommer feilene der med.` : "")));
  }

  /* ================= inngang ================= */
  function render() {
    stopTicker();
    const set = openSet ? setById(openSet) : null;
    if (!set) { openSet = null; tilbake = null; return renderList(); }
    return erKart(set) || mode === "exam" ? renderExam(set) : renderPractice(set);
  }

  /* Merke i navigasjonen: sett som er påbegynt, men verken levert eller gjort i øving. */
  function activeCount() {
    return SETS().filter((s) => { const r = run(s.id); return s.kind !== "must" && r.startedAt && !r.submittedAt && !erGjort(s); }).length;
  }

  /* alle(): settene med lånte oppgaver slått opp, for andre som leser settene
     (planleggeren). EDU_DATA.sets alene viser lånte sett uten oppgaver. */
  /* Rettingen for andre moduler (Problem sets, fra 25. november 2026). Modulen bygger
     et sett av sine egne oppgaver i samme form som her ({ id, label, exercises: [{ n,
     title, body, points, parts: [{ label, body, solution, criteria, points }] }] }) og
     får de samme feltene, knappene, Claude-rettingen og «Kopier det jeg ikke kunne».
     Svar-dataene slås opp i EDU_DATA.svar under "<id>:<n>:<del>". Lagringen er den
     samme som her ("<id>-e<n>", "<id>-u<n>-<del>"). Id-en må derfor ikke krasje med et
     eksamenssett. */
  const rettingKit = {
    harNøkkel,
    påslått: (set, ex, part) => retting(set, ex, part.label),
    resultat: (set, ex, part) => rettFor(set, ex, part.label),
    endretSiden: (set, ex, part) => endretSiden(set, ex, part.label),
    riktig: riktigDel,
    svarFelt, rettVisning, rettDel, påNyttRad,
    usikkerKnapp: (set, ex, part) => usikkerKnapp(set, ex, part.label),
    kopierRad,
  };

  /* For Eksamenstrening («Må kunne»): åpne et sett herfra med en egen tilbakeknapp,
     og status per sett til kortene der. */
  function åpne(setId, opts) {
    opts = opts || {};
    openSet = setId; mode = opts.mode || "practice"; cursor = 0; bareUsikre = false;
    tilbake = opts.tilbake || null;
    if (location.hash.replace(/^#/, "").split("?")[0] === "/sett") S.app.refresh(); else location.hash = "#/sett";
    window.scrollTo({ top: 0 });
  }
  function status(setId) {
    const set = setById(setId);
    if (!set) return null;
    const sum = scoreSum(set), r = run(set.id), m = merkede(set);
    return { levert: !!r.submittedAt, gjort: erGjort(set), påbegynt: !!r.startedAt || anyTouched(set),
      got: sum.got, of: sum.of, scored: sum.scored, total: sum.total,
      feil: m.filter((x) => x.feil).length, usikre: m.filter((x) => x.usikker).length };
  }
  function nullstill(setId) { resetRun(setId); }

  S.views.sett = { render, activeCount, alle: SETS, retting: rettingKit, åpne, status, nullstill };
})(window.EDU);
