/* ================ EKSAMENSTRENING — mange spørsmål i eksamensformat ================
   En stor bank med flervalgsspørsmål i samme form og vanskelighet som eksamen:
   fire alternativer og ett riktig. Poengregelen er fagets (standard 3 poeng for
   rett, −1 for feil og 0 for å stå over). Du velger ett eller flere temaer og
   antall spørsmål. Spørsmålene trekkes tilfeldig fra utvalget.

   Poengregelen er fagets: EDU_DATA.trening.poeng = { rett, feil, blank }. Uten
   minuspoeng (feil 0) er det ingen minustekster og ingen råd om å stå over;
   «Stå over» heter «Vis fasiten». Resultatet er antall riktige og prosent.

   «Regn selv først»: et fag med åpen eksamen kan gi spørsmålene et tallsvar
   (tall). Med valget på skriver du tallet du har regnet, før alternativene
   vises. Tallet sjekkes mot verdien med fagets toleranse og teller som første
   svar: riktig, et galt alternativ (når tallet treffer en felle) eller feil.
   Så kommer alternativene og fasiten som før. Spørsmål uten tall er uendret.

   Hvorfor dette ikke er kapitteloppgavene om igjen: de er et lite, fast sett per
   kapittel, ment rett etter lesingen. Her er banken stor, mange regnespørsmål
   finnes i flere varianter med nye tall, og du kan blande temaer slik eksamen
   gjør. Varianter av samme regnestykke er en familie (`fam`), og én runde tar
   bare én fra hver familie så lenge utvalget rekker.

   Fasiten kommer med en gang: først den korte, så en knapp for den fulle
   gjennomgangen og hvilken feil hvert galt alternativ er laget av. Velger du
   «Prøv igjen først», viser et galt svar bare fella for det alternativet, og
   du prøver på nytt. Poengene og loggen teller fortsatt bare første svar.

   Hjelpen åpnes i tre trinn, som i øvingsguiden til MC-testen: temaet, regelen
   og fremgangsmåten. Etter et svar kan du ta en ny variant av samme
   regnestykke med en gang.

   Data: EDU_DATA.trening = { poeng?: { rett, feil, blank }, sprak?: "no" | "en",
           regnSelv?: true, temaer: [{ id, navn, kort, vekt, kap, kjerne, intro }], sporsmal: [
           { id, tema, fam?, type, q, options[4], answer, traps[4], kort, full,
             hint?: [tema, regel], hjelp,
             tall?: { verdi, tol: { rel?, abs? }, enhet?, alt?: [4 verdier] } }] }
     poeng     standard { rett: 3, feil: −1, blank: 0 }
     sprak     fagets tallformat, bare for tolkningen og visningen av tall. UI er norsk.
     regnSelv  «Regn selv først» er på som standard
     tall      verdi i enheten ved feltet (12.5 med enhet «%»); avviket godtas når det er
               innenfor rel × |verdi| eller abs (standard rel 0,001); alt er verdien bak
               hvert alternativ, så et tall som treffer en felle, regnes som det valget
   Bygget av tools/bygg-trening.py. Fila er stor, så faget kan laste den først
   når modulen åpnes: manifest.lazy = { "/trening": ["fag/<fag>/trening.js"] }.

   Korte sjekker (fra 22. november 2026): sjekker = { tittel, tekst, liste: [{ id,
   navn, kort, tekst, ids }] } gir et kort øverst i oppsettet med én knapp per sjekk.
   En sjekk er et fast utvalg i fast rekkefølge, uten trekning. Hver id står for
   familien sin: ved start tas den varianten du har sett minst (samme regel som
   «Nye først»), så regnespørsmålene får nye tall neste gang. Runden husker sjekken
   (okt.sjekk) og «Ta sjekken på nytt» på resultatsiden starter den igjen.

   Lagring (state.exams):
     "tr:<id>"       { n, r, s, t, h }  forsøk, riktige, siste (1 rett, 0 feil, −1 stod over),
                     tid, og h = trinnene av hjelpen som var åpne sist (0–3)
     "trening:okt"   { ids, svar: { id: indeks | −1 | −2 }, hjelp: { id: trinn }, temaer, modus,
                       igjen, regn, forsok: { id: [gale valg] }, losst: { id: true }, gitt: { id: true },
                       tall: { id: { x, tekst } }, vistAlt: { id: true }, start, slutt }
                     svar er alltid første svar; −1 er stått over, −2 et tall som ikke traff
                     noe alternativ. forsok, losst og gitt gjelder bare «Prøv igjen». tall er
                     tallet du skrev med «Regn selv først», vistAlt spørsmål der du valgte å se
                     alternativene i stedet.
     "trening:valg"  { temaer, antall, modus, feil, regn? }  det du valgte sist
     "trm:<id>"      { m: 1 | 0, t }  merket «Øv mer på denne». Egen nøkkel, så et merket
                     spørsmål ikke teller som sett. Å fjerne merket skriver m: 0 i stedet
                     for å slette, ellers ville synken hentet det tilbake fra den andre enheten.
   Én nøkkel per spørsmål, så sky-synken slår sammen to enheter per spørsmål.

   Må kunne (26. november 2026). Har faget EDU_DATA.mustKunne, får siden to faner:
   «Må kunne» og spørsmålsbanken over. Må kunne er oppgavetypene Kurbatov har hintet
   til, sortert i tiers (1 = må kunnes perfekt). Hver type har tre hele
   eksamensoppgaver. De er eksamenssett med kind: "must" i EDU_DATA.sets og åpnes i
   Eksamenssett-motoren (S.views.sett.åpne) med en knapp tilbake hit. Fremdriften er
   derfor settenes egen ("<settId>-e<n>", "<settId>-run").
     EDU_DATA.mustKunne = { intro, tiers: [{ nr, navn, tekst }],
       typer: [{ id, tier, navn, hvorfor, signaler: [{ hvor, sitat }], sett: [settId × 3] }] }
     "trening:mk"    { fane: "mk" | "bank", tier }  valgt fane og tier
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag, icon } = S.u;
  const sh = () => S.views.shared;
  const prosa = (html) => { const n = el(".prose", frag(html)); S.u.rullTabeller(n); return n; };

  const T = () => (window.EDU_DATA || {}).trening || null;
  const TEMAER = () => (T() || {}).temaer || [];
  const ALLE = () => (T() || {}).sporsmal || [];
  const temaFor = (id) => TEMAER().find((t) => t.id === id) || null;

  /* Poengregelen leses fra fagdataene hver gang, aldri på toppnivå: dataene
     lastes etter motoren (fallgruve 2). */
  const STD_POENG = { rett: 3, feil: -1, blank: 0 };
  const poengregel = () => Object.assign({}, STD_POENG, (T() || {}).poeng || {});
  const harMinus = () => poengregel().feil < 0;
  const BLANK = -1;
  /* Et tall fra «Regn selv først» som ikke traff noe alternativ. Teller som feil. */
  const FEILTALL = -2;
  const ANTALL = [10, 20, 30, 50];
  const MODI = [["nye", "Nye først"], ["feil", "Bare de jeg bommet på"], ["merket", "Bare merkede"], ["tilfeldig", "Helt tilfeldig"]];
  const FEILVALG = [["fasit", "Vis fasiten"], ["igjen", "Prøv igjen først"]];
  const SVARFORM = [["valg", "Velg blant fire"], ["regn", "Regn selv først"]];

  /* ---------- lasting ---------- */
  let lasting = null, lastefeil = null;
  function lazyListe() { return (((window.EDU_SUBJECT || {}).lazy) || {})["/trening"] || []; }
  function sikreData() {
    if (T() || lasting) return;
    const liste = lazyListe();
    if (!liste.length || !S.picker) return;
    lasting = S.picker.loadScripts(liste)
      .then(() => { lasting = null; S.app.refresh(); })
      .catch((e) => { lasting = null; lastefeil = e; S.app.refresh(); });
  }

  /* ---------- lagring ---------- */
  const exams = () => S.store.get().exams;
  const logg = (id) => exams()["tr:" + id] || null;
  const økt = () => exams()["trening:okt"] || null;
  const valg = () => Object.assign({ temaer: [], antall: 20, modus: "nye", feil: "fasit", regn: !!(T() || {}).regnSelv }, exams()["trening:valg"] || {});
  function settValg(patch) { S.store.setExam("trening:valg", patch); }
  function lagreØkt(o) { exams()["trening:okt"] = o; S.store.emit(); }
  function forkastØkt() { delete exams()["trening:okt"]; S.store.emit(); }

  /* Et svar låses, som på eksamen. Det siste svaret kan likevel angres, for et
     bomtrykk på telefonen skal ikke telle; da settes også loggen tilbake. */
  /* Hjelpen i trinn: tema, regel og fremgangsmåten. Eldre økter lagret true,
     som var hele fremgangsmåten. */
  const hjelpeTrinn = (sp) => [...(sp.hint || []), sp.hjelp].filter(Boolean);
  function hjelpNivå(o, id) { const v = ((o && o.hjelp) || {})[id]; return v === true ? 3 : v || 0; }

  /* ekstra: felter som lagres i økten i samme slag, som tallet fra «Regn selv først». */
  function registrer(sp, i, ekstra) {
    const o = økt();
    if (!o || o.svar[sp.id] != null) return;
    const før = logg(sp.id);
    const svar = Object.assign({}, o.svar, { [sp.id]: i });
    lagreØkt(Object.assign({}, o, ekstra || {}, { svar, angre: { id: sp.id, logg: før ? Object.assign({}, før) : null } }));
    const g = før || { n: 0, r: 0 };
    const s = i === BLANK ? -1 : i === sp.answer ? 1 : 0;
    const h = Math.min(hjelpNivå(o, sp.id), hjelpeTrinn(sp).length);
    S.store.setExam("tr:" + sp.id, { n: g.n + 1, r: g.r + (s === 1 ? 1 : 0), s, t: S.u.nowTs(), h });
  }
  function angre(sp) {
    const o = økt();
    if (!o || !o.angre || o.angre.id !== sp.id) return;
    const svar = Object.assign({}, o.svar); delete svar[sp.id];
    const uten = (m) => { const k = Object.assign({}, m || {}); delete k[sp.id]; return k; };
    if (o.angre.logg) exams()["tr:" + sp.id] = o.angre.logg; else delete exams()["tr:" + sp.id];
    visFull = false;
    /* Et angret tall står i feltet igjen, så en skrivefeil kan rettes. */
    const tt = (o.tall || {})[sp.id];
    if (tt) utkast = { id: sp.id, tekst: tt.tekst, feil: "" };
    lagreØkt(Object.assign({}, o, { svar, angre: null, forsok: uten(o.forsok), losst: uten(o.losst), gitt: uten(o.gitt), tall: uten(o.tall) }));
  }

  const poengFor = (sp, v) => { const P = poengregel(); return v == null ? 0 : v === BLANK ? P.blank : v === sp.answer ? P.rett : P.feil; };
  const fmt = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n);

  /* ---------- «Regn selv først» ----------
     Spørsmålet har tall = { verdi, tol, enhet, alt }. Du skriver tallet før du
     ser alternativene. Det første svaret teller, tall eller valg. */
  const STD_REL = 0.001;
  const språk = () => (T() || {}).sprak || "no";
  const harTall = () => ALLE().some((s) => s.tall);
  const venterTall = (o, sp) => !!(o && o.regn && sp.tall && o.svar[sp.id] == null && !(o.vistAlt || {})[sp.id]);
  const tallFor = (o, sp) => ((o && o.tall) || {})[sp.id] || null;

  /* Tolker tallet slik en student skriver det. Mellomrom er tusenskille. Både
     punktum og komma kan være desimaltegn. −, – og «minus» er minustegn.
     Valutategn og enhet foran og bak hoppes over. Står det et regnestykke,
     gjelder tallet etter siste «=». Returnerer de mulige verdiene: to når «1,250»
     kan bety både 1,25 og 1250 (fagets språk avgjør hvilken som kommer først),
     ellers én. null når teksten ikke er et tall.
     Med enheten % er også brøken et svar: 0.125 er 12,5 %. Skriver du % når
     enheten er en annen, deles tallet på 100. */
  function tolkTall(rå, enhet, sprak) {
    let s = String(rå == null ? "" : rå).trim();
    if (s.includes("=")) s = s.slice(s.lastIndexOf("=") + 1);
    s = s.replace(/[\s\u00a0\u202f\u2009]/g, "").replace(/[\u2212\u2013\u2012]/g, "-").replace(/^minus/i, "-");
    if (/[()]/.test(s)) return null;
    let pst = false;
    if (/%$/.test(s)) { pst = true; s = s.slice(0, -1); }
    let neg = false;
    s = s.replace(/^\+/, "");
    if (s[0] === "-") { neg = true; s = s.slice(1); }
    s = s.replace(/^[^\d.,-]+/, "");
    if (s[0] === "-") { neg = !neg; s = s.slice(1); }
    s = s.replace(/[^\d]+$/, "");
    if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return null;
    const punkt = (s.match(/\./g) || []).length, komma = (s.match(/,/g) || []).length;
    const grupper = (d) => d[0].length >= 1 && d[0].length <= 3 && d.slice(1).every((x) => x.length === 3);
    let kand;
    if (punkt && komma) {
      const des = s.lastIndexOf(".") > s.lastIndexOf(",") ? "." : ",";
      const tus = des === "." ? "," : ".";
      const k = s.lastIndexOf(des);
      const hel = s.slice(0, k), rest = s.slice(k + 1);
      if (hel.includes(des) || !grupper(hel.split(tus))) return null;
      kand = [Number(hel.split(tus).join("") + "." + rest)];
    } else if (punkt + komma > 1) {
      const deler = s.split(punkt ? "." : ",");
      if (!grupper(deler)) return null;
      kand = [Number(deler.join(""))];
    } else if (punkt + komma === 1) {
      const [a, b] = s.split(punkt ? "." : ",");
      const somDes = Number((a || "0") + "." + b);
      if (komma && b.length === 3 && a.length >= 1 && a.length <= 3 && Number(a) > 0) {
        const somTus = Number(a + b);
        kand = (sprak || språk()) === "en" ? [somTus, somDes] : [somDes, somTus];
      } else kand = [somDes];
    } else kand = [Number(s)];
    kand = kand.filter((x) => Number.isFinite(x)).map((x) => (neg ? -x : x));
    if (!kand.length) return null;
    if (enhet === "%") { if (!pst) kand = kand.concat(kand.map((x) => x * 100)); }
    else if (pst) kand = kand.map((x) => x / 100).concat(kand);
    return kand;
  }
  /* Innenfor toleransen: |x − v| ≤ maks(abs, rel × |v|). Uten tol gjelder 0,1 %. */
  function innenfor(x, t, v) {
    if (v == null) v = t.verdi;
    const tol = t.tol || {};
    const rel = tol.rel != null ? tol.rel : tol.abs != null ? 0 : STD_REL;
    const grense = Math.max(tol.abs || 0, rel * Math.abs(v));
    return Math.abs(x - v) <= grense * (1 + 1e-9) + 1e-12;
  }
  /* Hva tallet ditt er: riktig, et galt alternativ (når det treffer en felle)
     eller ingen av dem. */
  function vurderTall(sp, kand) {
    const t = sp.tall;
    const treff = kand.find((x) => innenfor(x, t));
    if (treff != null) return { i: sp.answer, x: treff };
    let best = null;
    (t.alt || []).forEach((v, j) => {
      if (j === sp.answer || typeof v !== "number") return;
      kand.forEach((x) => { if (innenfor(x, t, v) && (!best || Math.abs(x - v) < best.d)) best = { i: j, x, d: Math.abs(x - v) }; });
    });
    return best ? { i: best.i, x: best.x } : { i: FEILTALL, x: kand[0] };
  }
  function svarMedTall(sp, rå) {
    const kand = tolkTall(rå, sp.tall.enhet);
    if (!kand) return false;
    const { i, x } = vurderTall(sp, kand);
    const o = økt();
    registrer(sp, i, { tall: Object.assign({}, o && o.tall, { [sp.id]: { x, tekst: String(rå).trim() } }) });
    return true;
  }
  function visAlternativer(sp) {
    const o = økt();
    if (o) lagreØkt(Object.assign({}, o, { vistAlt: Object.assign({}, o.vistAlt, { [sp.id]: true }) }));
  }
  /* Et tall i fagets format, til fasiten og toleransen: «1 234.5678» (en) eller «1 234,5678». */
  function visTall(x) {
    let s = String(+Number(x).toPrecision(7));
    if (/e/.test(s)) return s;
    const neg = s[0] === "-";
    if (neg) s = s.slice(1);
    const [hel, des] = s.split(".");
    return (neg ? "−" : "") + hel.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + (des ? (språk() === "en" ? "." : ",") + des : "");
  }
  /* Tallet med enheten bak, men ikke to ganger når du skrev den selv («12.5%»). */
  const medEnhet = (tekst, t) => !t.enhet || String(tekst).toLowerCase().includes(t.enhet.toLowerCase()) ? tekst
    : t.enhet === "%" ? tekst + (språk() === "en" ? "%" : "\u00a0%") : tekst + " " + t.enhet;
  function tolTekst(t) {
    const tol = t.tol || {};
    const rel = tol.rel != null ? tol.rel : tol.abs != null ? null : STD_REL;
    const deler = [];
    if (rel != null) deler.push(`${String(+(rel * 100).toPrecision(6)).replace(".", ",")} % av riktig verdi`);
    if (tol.abs != null) deler.push(`±${visTall(tol.abs)}${t.enhet === "%" ? " prosentpoeng" : t.enhet ? " " + t.enhet : ""}`);
    return `Godtatt avvik: ${deler.join(" eller ")}.`;
  }

  /* ---------- trekningen ---------- */
  function stokk(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  /* Prioritet i «Nye først»: aldri sett, så bommet eller stått over sist, så
     resten. Lavest først. */
  /* Riktig med hjelp teller som ikke mestret ennå. */
  function prio(sp) { const g = logg(sp.id); return !g ? 0 : (g.s !== 1 || g.h) ? 1 : 2; }
  /* Ett trinn til av hjelpen. Riktig svar etter hjelp teller som ikke mestret. */
  function merHjelp(sp) {
    const o = økt();
    const n = hjelpNivå(o, sp.id);
    if (!o || n >= hjelpeTrinn(sp).length) return;
    lagreØkt(Object.assign({}, o, { hjelp: Object.assign({}, o.hjelp, { [sp.id]: n + 1 }) }));
  }

  /* «Prøv igjen»: et galt første svar låser ikke spørsmålet. Du prøver til du
     treffer eller gir opp, men det er første svar som teller. */
  const prøverIgjen = (o, sp) => {
    const v = o.svar[sp.id];
    return !!o.igjen && v != null && v !== BLANK && v !== sp.answer && !(o.losst || {})[sp.id] && !(o.gitt || {})[sp.id];
  };
  const erÅpen = (o, sp) => o.svar[sp.id] != null && !prøverIgjen(o, sp);
  function velg(sp, i) {
    const o = økt();
    if (!o) return;
    if (o.svar[sp.id] == null) { registrer(sp, i); return; }
    if (!prøverIgjen(o, sp)) return;
    const prøvd = ((o.forsok || {})[sp.id] || []);
    if (i === o.svar[sp.id] || prøvd.includes(i)) return;
    if (i === sp.answer) lagreØkt(Object.assign({}, o, { losst: Object.assign({}, o.losst, { [sp.id]: true }) }));
    else lagreØkt(Object.assign({}, o, { forsok: Object.assign({}, o.forsok, { [sp.id]: prøvd.concat(i) }) }));
  }
  function giOpp(sp) {
    const o = økt();
    if (o) lagreØkt(Object.assign({}, o, { gitt: Object.assign({}, o.gitt, { [sp.id]: true }) }));
  }

  /* En ny variant av samme regnestykke, rett etter den du står på. Varianter du
     ikke har sett kommer først. */
  function nyVariant(o, sp) {
    if (!sp.fam) return null;
    const i = new Set(o.ids);
    const k = ALLE().filter((s) => s.fam === sp.fam && !i.has(s.id));
    return k.length ? stokk(k).sort((a, b) => prio(a) - prio(b))[0] : null;
  }
  function taVariant(o, pos, v) {
    const ids = o.ids.slice(); ids.splice(pos + 1, 0, v.id);
    visFull = false;
    lagreØkt(Object.assign({}, o, { ids, pos: pos + 1 }));
    S.app.refresh(); window.scrollTo({ top: 0 });
  }

  /* «Øv mer på denne»: spørsmål du vil finne tilbake til. */
  const erMerket = (id) => ((exams()["trm:" + id] || {}).m === 1);
  function merk(sp, på) {
    S.store.setExam("trm:" + sp.id, { m: på ? 1 : 0, t: S.u.nowTs() });
    S.u.toast(på ? "Merket. Du finner det under «Bare merkede»" : "Merket er fjernet");
  }
  const merkede = () => ALLE().filter((sp) => erMerket(sp.id));
  function merkKnapp(sp) {
    const på = erMerket(sp.id);
    return el("button.chip.tr-merk" + (på ? ".på" : ""), { type: "button", "aria-pressed": String(på),
      title: på ? "Fjern merket (M)" : "Merk spørsmålet så du finner tilbake til det (M)",
      onclick: () => { merk(sp, !på); S.app.refresh(); } }, på ? "★ Øv mer" : "☆ Øv mer");
  }

  function utvalg(temaIds, modus) {
    const valgte = new Set(temaIds);
    return ALLE().filter((sp) => valgte.has(sp.tema)
      && (modus !== "feil" || ((logg(sp.id) || {}).s != null && (logg(sp.id).s !== 1 || logg(sp.id).h)))
      && (modus !== "merket" || erMerket(sp.id)));
  }

  /* Fordeler antallet på temaene etter eksamensvekt. Hvert valgt tema får
     først ett spørsmål når antallet rekker; resten gis ett og ett til temaet som
     ligger lengst under sin andel av vekten, blant temaene som har flere igjen.
     Da blir to temaer med vekt 5 og 3 delt omtrent 5:3, og et tema med få
     spørsmål gir fra seg resten til de andre. */
  function fordel(temaIds, antall, modus) {
    const pool = {};
    temaIds.forEach((id) => { pool[id] = utvalg([id], modus).length; });
    const aktive = temaIds.filter((id) => pool[id] > 0);
    const ut = {}; aktive.forEach((id) => { ut[id] = 0; });
    let igjen = Math.min(antall, aktive.reduce((a, id) => a + pool[id], 0));
    if (igjen >= aktive.length) aktive.forEach((id) => { ut[id] = 1; igjen--; });
    const vekt = (id) => (temaFor(id) || {}).vekt || 1;
    while (igjen > 0) {
      const åpne = aktive.filter((id) => ut[id] < pool[id]);
      if (!åpne.length) break;
      const sumV = åpne.reduce((a, id) => a + vekt(id), 0);
      const mål = åpne.reduce((a, id) => a + ut[id], 0) + igjen;
      let best = åpne[0], under = -Infinity;
      åpne.forEach((id) => { const u = mål * vekt(id) / sumV - ut[id]; if (u > under) { under = u; best = id; } });
      ut[best]++; igjen--;
    }
    return ut;
  }

  /* Innen et tema: én fra hver familie før noen familie får to, og innen
     familien den med lavest prioritet. */
  function velgFraTema(id, n, modus) {
    const kandidater = utvalg([id], modus);
    const fam = new Map();
    stokk(kandidater).forEach((sp) => { const k = sp.fam || sp.id; if (!fam.has(k)) fam.set(k, []); fam.get(k).push(sp); });
    const grupper = [...fam.values()].map((g) => modus === "nye" ? g.sort((a, b) => prio(a) - prio(b)) : g);
    const valgt = [];
    for (let runde = 0; valgt.length < n; runde++) {
      const denne = grupper.filter((g) => g.length > runde).map((g) => g[runde]);
      if (!denne.length) break;
      const ordnet = modus === "nye" ? stokk(denne).sort((a, b) => prio(a) - prio(b)) : stokk(denne);
      for (const sp of ordnet) { if (valgt.length >= n) break; valgt.push(sp); }
    }
    return valgt;
  }

  /* ekstra.ordnet: de faste spørsmålene tas i rekkefølgen de står (sjekkene).
     ekstra.sjekk: sjekken runden kom fra, så resultatsiden kan starte den igjen. */
  function start(temaIds, antall, modus, faste, ekstra) {
    const ex = ekstra || {};
    let ids;
    if (faste) ids = ex.ordnet ? faste.slice() : stokk(faste);
    else {
      const f = fordel(temaIds, antall, modus);
      ids = stokk(Object.entries(f).flatMap(([id, n]) => velgFraTema(id, n, modus).map((sp) => sp.id)));
    }
    if (!ids.length) { S.u.toast("Ingen spørsmål i dette utvalget"); return; }
    utkast = { id: null, tekst: "", feil: "" };
    lagreØkt(Object.assign({ ids, svar: {}, temaer: temaIds, modus, igjen: valg().feil === "igjen", start: S.u.nowTs(), slutt: null, pos: 0 },
      harTall() ? { regn: !!valg().regn } : {}, ex.sjekk ? { sjekk: ex.sjekk } : {}));
    S.app.refresh(); window.scrollTo({ top: 0 });
  }

  /* ---------- korte sjekker ---------- */
  const SJEKKER = () => ((T() || {}).sjekker || {});
  const sjekkFor = (id) => (SJEKKER().liste || []).find((s) => s.id === id) || null;
  const familien = (id) => { const sp = ALLE().find((s) => s.id === id); const f = sp ? (sp.fam || sp.id) : id; return ALLE().filter((s) => (s.fam || s.id) === f); };
  /* Varianten av familien du har sett minst: aldri sett, så bommet, så riktig. */
  function variant(id) {
    const fam = familien(id);
    if (!fam.length) return null;
    const best = Math.min(...fam.map(prio));
    return stokk(fam.filter((s) => prio(s) === best))[0];
  }
  function startSjekk(s) {
    const valgt = s.ids.map(variant).filter(Boolean);
    start([...new Set(valgt.map((sp) => sp.tema))], valgt.length, "sjekk", valgt.map((sp) => sp.id), { ordnet: true, sjekk: s.id });
  }
  /* Siste svar i hver familie: riktige, besvarte og antall familier. */
  function sjekkStatus(s) {
    let rett = 0, gjort = 0;
    s.ids.forEach((id) => {
      const siste = familien(id).map((sp) => logg(sp.id)).filter(Boolean).sort((a, b) => (b.t || 0) - (a.t || 0))[0];
      if (siste) { gjort++; if (siste.s === 1) rett++; }
    });
    return { rett, gjort, antall: s.ids.length };
  }
  function sjekkKort() {
    const cfg = SJEKKER();
    if (!(cfg.liste || []).length) return null;
    const kort = el(".card", { style: { marginBottom: "18px" } });
    kort.appendChild(el("h3", { style: { margin: "0 0 4px", fontSize: "16px" } }, cfg.tittel || "Korte sjekker"));
    if (cfg.tekst) kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 10px" } }, cfg.tekst));
    cfg.liste.forEach((s) => {
      const st = sjekkStatus(s);
      const status = !st.gjort ? `${st.antall} spørsmål`
        : st.gjort === st.antall ? `Sist: ${st.rett} av ${st.antall} riktig` : `${st.gjort} av ${st.antall} besvart`;
      kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--hairline)" } },
        el("div", { style: { flex: "1 1 220px", minWidth: 0 } },
          el("div", { style: { fontWeight: 620 } }, s.navn + (s.kort ? " · " + s.kort : "")),
          s.tekst ? el(".tiny.muted", s.tekst) : null),
        el(".tiny.muted", status),
        el("button.btn.primary.sm", { onclick: () => startSjekk(s) }, "Start")));
    });
    return kort;
  }

  /* ---------- oppsett ---------- */
  function temaStatus(id) {
    const sp = ALLE().filter((s) => s.tema === id);
    let sett = 0, rett = 0;
    sp.forEach((s) => { const g = logg(s.id); if (g) { sett++; if (g.s === 1) rett++; } });
    return { antall: sp.length, sett, rett };
  }

  function oppsett() {
    const wrap = el(".fade-in");
    const v = valg();
    const gyldige = new Set(TEMAER().map((t) => t.id));
    let temaer = v.temaer.filter((id) => gyldige.has(id));
    if (!temaer.length) temaer = TEMAER().map((t) => t.id);
    let antall = v.antall, modus = v.modus, feilvalg = v.feil, regn = !!v.regn;
    const medTall = harTall();
    const P = poengregel();

    const totalt = ALLE().length;
    const sett = ALLE().filter((s) => logg(s.id)).length;
    wrap.appendChild(sh().pageHead("Eksamenstrening", `${totalt} spørsmål i eksamensformat`,
      "Velg temaer og antall. Spørsmålene trekkes tilfeldig. Du får fasiten med en gang: først kort, så en full gjennomgang hvis du vil. "
        + (harMinus() ? `${P.rett} poeng for rett, ${fmt(P.feil)} for feil og ${P.blank} for å stå over, som på eksamen.`
          : "Feil svar gir ikke minuspoeng, så resultatet er hvor mange du fikk riktig.")));

    const fr = faner("bank");
    if (fr) wrap.appendChild(fr);

    const o = økt();
    if (o && !o.slutt && o.ids.length) {
      const besvart = o.ids.filter((id) => o.svar[id] != null).length;
      wrap.appendChild(el(".card", { style: { marginBottom: "18px", background: "var(--accent-soft)", borderColor: "var(--accent-soft-2)" } },
        el(".row.wrap", { style: { gap: "12px", alignItems: "center" } },
          el("div", el("div", { style: { fontWeight: 620 } }, "Du har en påbegynt runde"),
            el(".tiny.muted", `${besvart} av ${o.ids.length} besvart`)),
          el(".spacer"),
          el("button.btn.ghost.sm", { onclick: () => { forkastØkt(); S.app.refresh(); } }, "Forkast"),
          el("button.btn.primary.sm", { onclick: () => { S.app.refresh(); } }, "Fortsett →"))));
    }

    const sk = sjekkKort();
    if (sk) wrap.appendChild(sk);

    const kort = el(".card.pad-lg");
    /* regn lagres bare i fag som har tallsvar, så FIE432s valg ser ut som før. */
    const oppdater = () => { settValg(Object.assign({ temaer, antall, modus, feil: feilvalg }, medTall ? { regn } : {})); tegn(); };

    const temaBoks = el("div");
    const antallBoks = el("div");
    const modusBoks = el("div");
    const feilBoks = el("div");
    const svarBoks = el("div");
    const plan = el("div", { style: { marginTop: "18px" } });
    const startKnapp = el("button.btn.primary.lg", { onclick: () => start(temaer, antall, modus) }, "Start →");

    function tegn() {
      S.u.mount(temaBoks,
        el(".row.wrap", { style: { gap: "8px", alignItems: "baseline", marginBottom: "10px" } },
          el("h3", { style: { margin: 0 } }, "Temaer"),
          el(".spacer"),
          el("button.btn.ghost.sm", { onclick: () => { temaer = TEMAER().map((t) => t.id); oppdater(); } }, "Alle"),
          el("button.btn.ghost.sm", { onclick: () => { temaer = []; oppdater(); } }, "Ingen")),
        el(".tr-temaer", ...TEMAER().map((t) => {
          const på = temaer.includes(t.id);
          const st = temaStatus(t.id);
          const vekt = el(".kap-vekt", { title: `Eksamensvekt ${t.vekt} av 5` });
          for (let i = 1; i <= 5; i++) vekt.appendChild(el("i" + (i <= t.vekt ? ".på" : "")));
          /* Valgknappen og innføringsknappen er søsken, ikke nøstet: en knapp i en
             knapp er ugyldig HTML, og trykket ville valgt temaet i samme slag. */
          return el(".tr-tema-boks",
            el("button.tr-tema" + (på ? ".på" : ""), { type: "button", "aria-pressed": String(på),
              onclick: () => { temaer = på ? temaer.filter((x) => x !== t.id) : temaer.concat(t.id); oppdater(); } },
              el(".tr-tema-topp", el("span.tr-tema-navn", el("span.lang", t.navn), el("span.kort", t.kort || t.navn)), vekt),
              el(".tr-tema-bunn", st.sett ? `${st.sett} av ${st.antall} sett · ${Math.round(100 * st.rett / st.sett)} % riktig` : `${st.antall} spørsmål`)),
            t.intro ? el("button.tr-intro-knapp", { type: "button", title: "Hva temaet tester og formlene du må kunne",
              onclick: () => visIntro(t) }, el("span.lang", "Hurtiginnføring"), el("span.kort", "Innføring")) : null);
        })));

      const seg = el(".seg");
      ANTALL.forEach((n) => seg.appendChild(el("button" + (antall === n ? ".on" : ""), { onclick: () => { antall = n; oppdater(); } }, String(n))));
      S.u.mount(antallBoks, el(".nav-section", { style: { paddingLeft: 0 } }, "Antall spørsmål"), seg);

      const mseg = el(".seg", { style: { flexWrap: "wrap" } });
      MODI.forEach(([k, l]) => mseg.appendChild(el("button" + (modus === k ? ".on" : ""), { onclick: () => { modus = k; oppdater(); } }, l)));
      S.u.mount(modusBoks, el(".nav-section", { style: { paddingLeft: 0 } }, "Utvalg"), mseg,
        el("p.tiny.muted", { style: { margin: "8px 0 0" } },
          modus === "nye" ? "Spørsmål du ikke har sett kommer først, så de du bommet på. Fra hver familie av like regnestykker kommer bare ett om gangen."
            : modus === "feil" ? "Bare spørsmål du svarte feil på eller stod over sist du hadde dem."
              : modus === "merket" ? "Bare spørsmål du har merket med «Øv mer». Merk et spørsmål med stjernen øverst på kortet eller tasten M."
              : "Rent tilfeldig fra temaene, uansett hva du har svart før."));

      const fseg = el(".seg", { style: { flexWrap: "wrap" } });
      FEILVALG.forEach(([k, l]) => fseg.appendChild(el("button" + (feilvalg === k ? ".on" : ""), { onclick: () => { feilvalg = k; oppdater(); } }, l)));
      S.u.mount(feilBoks, el(".nav-section", { style: { paddingLeft: 0 } }, "Ved feil svar"), fseg,
        el("p.tiny.muted", { style: { margin: "8px 0 0" } },
          feilvalg === "igjen" ? "Du får vite hvorfor akkurat det alternativet frister, men ikke hva som er riktig. Så prøver du på nytt. "
            + (harMinus() ? "Poengene teller første svar." : "Resultatet teller første svar.")
            : "Fasiten og forklaringen kommer med en gang."));

      /* Bare i fag der spørsmålene har tallsvar. */
      if (medTall) {
        const sseg = el(".seg", { style: { flexWrap: "wrap" } });
        SVARFORM.forEach(([k, l]) => sseg.appendChild(el("button" + ((k === "regn") === regn ? ".on" : ""), { onclick: () => { regn = k === "regn"; oppdater(); } }, l)));
        const iUtvalg = ALLE().filter((s) => temaer.includes(s.tema));
        const nTall = iUtvalg.filter((s) => s.tall).length;
        S.u.mount(svarBoks, el(".nav-section", { style: { paddingLeft: 0 } }, "Svarform"), sseg,
          el("p.tiny.muted", { style: { margin: "8px 0 0", maxWidth: "380px" } },
            regn ? `Har spørsmålet ett tall som svar, skriver du først tallet du har regnet, som på en åpen eksamen. Tallet er svaret ditt. Så kommer alternativene og fasiten. ${nTall} av ${iUtvalg.length} spørsmål i utvalget har tallsvar.`
              : "Du ser de fire alternativene med en gang."));
      }

      const f = temaer.length ? fordel(temaer, antall, modus) : {};
      const sum = Object.values(f).reduce((a, b) => a + b, 0);
      const deler = Object.entries(f).filter(([, n]) => n > 0).map(([id, n]) => `${(temaFor(id) || {}).kort || id} ${n}`);
      S.u.mount(plan,
        el("p", { style: { margin: "0 0 14px", fontSize: "14.5px" } },
          !temaer.length ? "Velg minst ett tema."
            : !sum ? (modus === "feil" ? "Du har ikke bommet på noe i disse temaene ennå."
              : modus === "merket" ? "Du har ikke merket noe i disse temaene ennå." : "Ingen spørsmål i dette utvalget.")
              : el("span", el("b", `${sum} spørsmål`), sum < antall ? ` (alt som finnes i utvalget)` : "", deler.length > 1 ? `: ${deler.join(" · ")}` : "")),
        startKnapp);
      startKnapp.disabled = !sum;
    }
    tegn();
    kort.appendChild(temaBoks);
    kort.appendChild(el(".row.wrap", { style: { gap: "28px", marginTop: "8px" } }, antallBoks, modusBoks, feilBoks, medTall ? svarBoks : null));
    kort.appendChild(plan);
    wrap.appendChild(kort);

    const m = merkede();
    if (m.length) wrap.appendChild(merketKort(m));

    if (sett) wrap.appendChild(el("p.tiny.muted", { style: { marginTop: "14px" } },
      `Du har sett ${sett} av ${totalt} spørsmål. Fordelingen på temaene følger eksamensvekten, prikkene ved hvert tema.`));
    return wrap;
  }

  /* Spørsmålene du har merket, samlet: start en runde med alle, eller åpne og
     fjern dem ett og ett. */
  function merketKort(m) {
    const kort = el(".card", { style: { marginTop: "18px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center" } },
      el("div", el("h3", { style: { margin: 0, fontSize: "16px" } }, `★ Merket for øving (${m.length})`),
        el(".tiny.muted", "Spørsmålene du har merket med «Øv mer». Merket står til du fjerner det.")),
      el(".spacer"),
      el("button.btn.primary.sm", { onclick: () => start(TEMAER().map((t) => t.id), m.length, "merket", m.map((s) => s.id)) },
        `Øv på alle ${m.length}`)));
    const liste = el("details.tr-merket", { style: { marginTop: "10px" } });
    liste.appendChild(el("summary.tiny", "Vis listen"));
    m.forEach((s) => {
      const g = logg(s.id);
      const merke = !g ? "–" : g.s === 1 ? "✓" : g.s === -1 ? "○" : "✕";
      liste.appendChild(el(".row", { style: { gap: "8px", alignItems: "center", padding: "7px 0", borderTop: "1px solid var(--hairline)" } },
        el("span.tr-gj-merke", { title: "Sist: ✓ riktig, ✕ feil, ○ stod over, – ikke besvart" }, merke),
        el("span.tiny", { style: { flex: 1, minWidth: 0 } }, `${(temaFor(s.tema) || {}).kort || ""}: ${stripp(spørsmålet(s.q))}`),
        el("button.btn.ghost.sm", { onclick: () => start([s.tema], 1, "merket", [s.id]) }, "Åpne"),
        el("button.btn.ghost.sm", { title: "Fjern merket", onclick: () => { merk(s, false); S.app.refresh(); } }, "Fjern")));
    });
    kort.appendChild(liste);
    return kort;
  }

  /* ---------- én runde ---------- */
  let visFull = false;     // om den fulle gjennomgangen er åpen for spørsmålet du står på
  /* Det du har skrevet i tallfeltet, så det overlever at visningen tegnes på
     nytt (hjelp, merking, synk). Lagres ikke: det er ikke et svar ennå. */
  let utkast = { id: null, tekst: "", feil: "" };
  let fokusertFor = null;  // feltet får fokus én gang per spørsmål, ikke ved hver omtegning

  function aktivtSpørsmål(o) {
    const per = new Map(ALLE().map((s) => [s.id, s]));
    const liste = o.ids.map((id) => per.get(id)).filter(Boolean);
    let pos = Math.min(o.pos || 0, liste.length - 1);
    return { liste, pos, sp: liste[pos] };
  }

  function gåTil(o, pos) { visFull = false; lagreØkt(Object.assign({}, o, { pos })); S.app.refresh(); window.scrollTo({ top: 0 }); }
  function neste(o, liste, pos) {
    if (pos + 1 < liste.length) gåTil(o, pos + 1);
    else { lagreØkt(Object.assign({}, o, { slutt: S.u.nowTs() })); S.app.refresh(); window.scrollTo({ top: 0 }); }
  }

  /* Feltet for «Regn selv først». Telefonens tallbord har ofte ikke minustegn,
     så ± skifter fortegn. */
  function tallfelt(sp) {
    const t = sp.tall;
    if (utkast.id !== sp.id) utkast = { id: sp.id, tekst: "", feil: "" };
    const feilEl = el("p.tr-tall-feil", { role: "alert" }, utkast.feil || "");
    const inn = el("input.input.tr-tall-inn", { type: "text", inputmode: "decimal", autocomplete: "off", autocorrect: "off",
      autocapitalize: "off", spellcheck: "false", enterkeyhint: "done", "aria-label": "Tallet du har regnet", placeholder: "Ditt tall" });
    inn.value = utkast.tekst;
    inn.addEventListener("input", () => {
      utkast.tekst = inn.value;
      if (utkast.feil) { utkast.feil = ""; feilEl.textContent = ""; }
    });
    const sjekk = () => {
      if (!inn.value.trim()) { inn.focus(); return; }
      if (!svarMedTall(sp, inn.value)) {
        utkast.feil = `Fant ikke et tall. Skriv for eksempel ${språk() === "en" ? "1 234.5" : "1 234,5"}, 0,25 eller −12.`;
        feilEl.textContent = utkast.feil;
        return;
      }
      utkast = { id: null, tekst: "", feil: "" };
      S.app.refresh();
    };
    inn.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); sjekk(); } });
    const fortegn = el("button.btn.ghost.sm.tr-tall-fortegn", { type: "button", title: "Skift fortegn", "aria-label": "Skift fortegn",
      onclick: () => {
        const v = inn.value.trim();
        inn.value = /^[-−–]/.test(v) ? v.replace(/^[-−–]\s*/, "") : "−" + v;
        utkast.tekst = inn.value;
        inn.focus();
      } }, "±");
    if (fokusertFor !== sp.id) {
      fokusertFor = sp.id;
      /* Bare med mus: på telefonen ville tastaturet dekket spørsmålet du skal lese. */
      if (window.matchMedia && window.matchMedia("(pointer: fine)").matches)
        requestAnimationFrame(() => { if (inn.isConnected) inn.focus({ preventScroll: true }); });
    }
    return el(".tr-tall",
      el(".tr-tall-hode", "Regn selv først"),
      el(".tr-tall-rad", fortegn, inn, t.enhet ? el("span.tr-tall-enhet", t.enhet) : null,
        el("button.btn.primary.sm", { type: "button", onclick: sjekk }, "Sjekk")),
      el("p.tiny.muted", { style: { margin: "8px 0 0" } },
        `Punktum eller komma som desimaltegn, mellomrom som tusenskille. ${tolTekst(t)}`
        + (t.enhet === "%" ? " Brøken godtas også." : "")),
      feilEl);
  }

  function runde() {
    const o = økt();
    const { liste, pos, sp } = aktivtSpørsmål(o);
    if (!sp) { forkastØkt(); return oppsett(); }
    const wrap = el(".fade-in");
    const svar = o.svar[sp.id];
    const åpen = erÅpen(o, sp);
    const igjen = prøverIgjen(o, sp);
    const tallModus = venterTall(o, sp);
    const minus = harMinus();
    const P = poengregel();
    const prøvd = igjen ? [svar].concat((o.forsok || {})[sp.id] || []) : [];
    const poeng = liste.reduce((a, s) => a + poengFor(s, o.svar[s.id]), 0);
    const besvart = liste.filter((s) => o.svar[s.id] != null).length;
    const riktige = liste.filter((s) => o.svar[s.id] === s.answer).length;
    const tema = temaFor(sp.tema);

    const kortEl = el(".card.pad-lg.quiz-card");
    const prog = el(".q-progress");
    liste.forEach((s, i) => {
      const v = o.svar[s.id];
      const kls = v == null ? (i === pos ? ".cur" : "") : v === BLANK ? ".blank" : v === s.answer ? ".rett" : ".galt";
      prog.appendChild(el("span" + kls + (i === pos ? ".her" : ""), { title: `Spørsmål ${i + 1}`, onclick: () => gåTil(o, i) }));
    });
    kortEl.appendChild(prog);
    kortEl.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginBottom: "6px" } },
      el(".tiny.muted", `Spørsmål ${pos + 1} av ${liste.length}`),
      el(".spacer"),
      tema ? (tema.intro
        ? el("button.chip.slate.tr-temachip", { type: "button", title: "Hurtiginnføring i temaet", onclick: () => visIntro(tema, { iRunde: true }) }, tema.kort || tema.navn, el("span.tr-i", "i"))
        : el(".chip.slate", tema.kort || tema.navn)) : null,
      merkKnapp(sp),
      minus
        ? el(".chip" + (poeng > 0 ? ".green" : poeng < 0 ? ".rose" : ""), `${fmt(poeng)} poeng`)
        : el(".chip" + (riktige > 0 ? ".green" : ""), `${riktige} av ${besvart} riktige`)));

    kortEl.appendChild(el(".tr-stem", prosa(sp.q)));

    if (tallModus) kortEl.appendChild(tallfelt(sp));
    else {
      const alt = el("div", { style: { marginTop: "6px" } });
      sp.options.forEach((tekst, i) => {
        let kls = "button.opt";
        if (åpen) kls += i === sp.answer ? ".correct" : i === svar ? ".wrong" : ".dim";
        else if (prøvd.includes(i)) kls += ".wrong";
        const låst = åpen || prøvd.includes(i);
        alt.appendChild(el(kls, { disabled: låst, onclick: () => { if (!låst) { velg(sp, i); S.app.refresh(); } } },
          el(".key", String.fromCharCode(65 + i)), el("span", frag(String(tekst)))));
      });
      kortEl.appendChild(alt);
    }

    /* «Prøv igjen»: fella for det siste gale valget, uten fasiten. Var første
       svar et tall, sier boksen hva tallet traff. */
    if (igjen) {
      const sist = prøvd[prøvd.length - 1];
      const tt = tallFor(o, sp);
      kortEl.appendChild(el(".tr-igjen",
        el(".tr-igjen-hode", prøvd.length === 1 ? (minus ? `Ikke riktig · ${fmt(P.feil)} poeng` : "Ikke riktig") : `Ikke riktig denne gangen heller · forsøk ${prøvd.length}`),
        tt && prøvd.length === 1
          ? el("p", { style: { margin: "0 0 4px", fontSize: "14.5px" } }, sist === FEILTALL
            ? `Tallet ditt, ${medEnhet(tt.tekst, sp.tall)}, stemmer ikke med noe av alternativene. Velg det du nå tror er riktig.`
            : `Tallet ditt, ${medEnhet(tt.tekst, sp.tall)}, er det samme som et galt alternativ, merket rødt:`)
          : null,
        sp.traps && sp.traps[sist] ? prosa(String(sp.traps[sist])) : null,
        el("p.tiny.muted", { style: { margin: "6px 0 0" } }, minus ? "Prøv et annet alternativ. Poengene teller første svar." : "Prøv et annet alternativ. Resultatet teller første svar.")));
    }

    /* Hjelpen i trinn, uten tallene, så du regner selv. Trinnene du har åpnet,
       står resten av runden. */
    const trinn = hjelpeTrinn(sp);
    const nivå = Math.min(hjelpNivå(o, sp.id), trinn.length);
    const navn = trinn.length === 3 ? ["1 · Temaet", "2 · Regelen", "3 · Slik løser du den"] : ["Slik løser du den"];
    if (nivå) {
      const boks = el(".tr-hjelp");
      trinn.slice(0, nivå).forEach((t, k) => {
        boks.appendChild(el(".tr-hjelp-hode" + (k ? ".neste" : ""), navn[k] || ""));
        boks.appendChild(prosa(t));
      });
      kortEl.appendChild(boks);
    }
    const hjelpKnapp = !åpen && nivå < trinn.length
      ? el("button.btn.ghost.sm", { title: "Ett trinn om gangen: temaet, regelen, fremgangsmåten. Spørsmålet regnes som ikke mestret ennå.",
        onclick: () => { merHjelp(sp); S.app.refresh(); } },
        !nivå ? "Hjelp" : trinn.length === 3 ? `Mer hjelp (${nivå + 1} av 3)` : "Hjelp")
      : null;

    if (igjen) {
      kortEl.appendChild(el(".row.wrap", { style: { marginTop: "6px", gap: "10px", alignItems: "center" } },
        hjelpKnapp,
        el("button.btn.ghost.sm", { onclick: () => { giOpp(sp); S.app.refresh(); } }, "Vis fasiten")));
    } else if (!åpen) {
      /* Uten minuspoeng er det ingen grunn til å stå over: knappen viser fasiten
         og teller som ikke besvart. */
      kortEl.appendChild(el(".row.wrap", { style: { marginTop: "6px", gap: "10px", alignItems: "center" } },
        el("button.btn.ghost.sm", { title: minus ? null : "Teller som ikke besvart", onclick: () => { registrer(sp, BLANK); S.app.refresh(); } }, minus ? "Stå over" : "Vis fasiten"),
        hjelpKnapp,
        tallModus ? el("button.btn.ghost.sm", { title: "Velg blant alternativene i stedet for å skrive tallet",
          onclick: () => { visAlternativer(sp); S.app.refresh(); } }, "Vis alternativene") : null,
        minus && !tallModus ? el("span.tiny.muted", "0 poeng, men ingen minus. Riktig valg når du ikke kan utelukke minst ett alternativ.") : null));
    } else {
      kortEl.appendChild(fasit(sp, svar));
    }

    const variant = åpen ? nyVariant(o, sp) : null;
    kortEl.appendChild(el(".row.wrap", { style: { marginTop: "20px", gap: "10px", alignItems: "center" } },
      pos > 0 ? el("button.btn.ghost.sm", { onclick: () => gåTil(o, pos - 1) }, "← Forrige") : null,
      el(".spacer"),
      el("button.btn.ghost.sm", { onclick: () => { lagreØkt(Object.assign({}, o, { slutt: S.u.nowTs() })); S.app.refresh(); } }, "Avslutt"),
      åpen && variant ? el("button.btn.ghost.sm", { title: "Samme regnestykke med nye tall, rett etter dette (V)", onclick: () => taVariant(o, pos, variant) }, "Ny variant") : null,
      åpen ? el("button.btn.primary", { onclick: () => neste(o, liste, pos) }, pos + 1 < liste.length ? "Neste →" : "Se resultatet →") : null));
    wrap.appendChild(kortEl);
    const s = minus ? "S står over" : "S viser fasiten";
    wrap.appendChild(el("p.tiny.muted.tr-taster", tallModus
      ? `Tastatur: skriv tallet og trykk Enter. Utenfor feltet gir H et trinn hjelp, ${s} og M merker for øving.`
      : `Tastatur: A–D svarer, H gir et trinn hjelp, ${s}, M merker for øving, F åpner gjennomgangen, V gir en ny variant, Enter går videre.`));
    return wrap;
  }

  function fasit(sp, svar) {
    const P = poengregel();
    const minus = harMinus();
    const boks = el(".tr-fasit");
    const blank = svar === BLANK;
    const rett = svar === sp.answer;
    const o = økt();
    const forsøk = 1 + (((o && o.forsok) || {})[sp.id] || []).length;
    const løst = !!((o && o.losst) || {})[sp.id];
    const tekst = minus
      ? (blank ? `Stod over · ${P.blank} poeng` : rett ? `Riktig · +${P.rett} poeng`
        : løst ? `Feil første gang · −${Math.abs(P.feil)} poeng · riktig på forsøk ${forsøk + 1}`
          : `Feil · −${Math.abs(P.feil)} poeng`)
      : (blank ? "Uten svar" : rett ? "Riktig" : løst ? `Feil første gang · riktig på forsøk ${forsøk + 1}` : "Feil");
    boks.appendChild(el(".row", { style: { alignItems: "center", gap: "10px" } },
      el(".tr-resultat" + (blank ? ".blank" : rett ? ".rett" : ".galt"), tekst),
      el(".spacer"),
      o && o.angre && o.angre.id === sp.id
        ? el("button.btn.ghost.sm", { title: "For bomtrykk. Har du lest fasiten, måler et nytt forsøk ingenting.", onclick: () => { angre(sp); S.app.refresh(); } }, "Angre svaret")
        : null));
    /* Tallet du skrev med «Regn selv først», mot den eksakte verdien. */
    const tt = tallFor(o, sp);
    if (tt && sp.tall) {
      const din = medEnhet(tt.tekst, sp.tall), fasitTall = medEnhet(visTall(sp.tall.verdi), sp.tall);
      boks.appendChild(el("p.tr-tallsvar" + (rett ? ".rett" : ""),
        rett ? `Tallet ditt, ${din}, er innenfor det godtatte avviket. Eksakt verdi: ${fasitTall}.`
          : svar === FEILTALL ? `Tallet ditt, ${din}, stemmer ikke med noe av alternativene. Riktig verdi: ${fasitTall}.`
            : `Tallet ditt, ${din}, er det samme som et galt alternativ, merket rødt. Riktig verdi: ${fasitTall}.`));
    }
    boks.appendChild(el(".explain", prosa(sp.kort)));

    const full = el(".tr-full", { hidden: !visFull });
    full.appendChild(prosa(sp.full));
    const feller = (sp.traps || []).map((t, i) => t ? { i, t } : null).filter(Boolean);
    if (feller.length) {
      full.appendChild(el(".tr-fellehode", "Hva de gale alternativene er laget av"));
      const ul = el("ul.tr-feller");
      const dine = new Set([svar].concat(((o && o.forsok) || {})[sp.id] || []));
      feller.forEach((f) => ul.appendChild(el("li" + (dine.has(f.i) ? ".ditt" : ""),
        el("b", String.fromCharCode(65 + f.i) + (f.i === svar ? (tt ? " (ditt tall): " : " (ditt svar): ") : dine.has(f.i) ? " (prøvd): " : ": ")), frag(String(f.t)))));
      full.appendChild(ul);
    }
    full.appendChild(lesMer(sp));
    const knapp = el("button.btn.sm" + (visFull ? ".ghost" : ""), { "aria-expanded": String(visFull),
      onclick: () => { visFull = !visFull; full.hidden = !visFull; knapp.textContent = visFull ? "Skjul gjennomgangen" : "Vis full gjennomgang"; knapp.classList.toggle("ghost", visFull); knapp.setAttribute("aria-expanded", String(visFull)); } },
      visFull ? "Skjul gjennomgangen" : "Vis full gjennomgang");
    boks.appendChild(el(".row", { style: { marginTop: "12px" } }, knapp));
    boks.appendChild(full);
    return boks;
  }

  /* Hvor stoffet står: kjernepensumdelen og manualkapitlene temaet hører til. */
  function lesMer(sp) { return lesMerTema(temaFor(sp.tema), true); }
  function lesMerTema(t, medIntro) {
    const rad = el(".row.wrap.tr-lesmer");
    if (!t) return rad;
    rad.appendChild(el("span.tiny.muted", "Les mer:"));
    if (medIntro && t.intro) rad.appendChild(el("button.chip", { type: "button", onclick: () => visIntro(t, { iRunde: true }) }, "Hurtiginnføring"));
    if (t.kjerne && S.hasModule("/kjerne")) {
      const num = parseInt(String(t.kjerne).replace(/\D/g, ""), 10);
      const del = ((window.EDU_DATA || {}).kjerne || []).find((d) => d.id === t.kjerne);
      rad.appendChild(el("a.chip", { href: "#/kjerne/" + num, style: { textDecoration: "none" } },
        `Kjernepensum ${num}${del ? " · " + kutt(del.title, 34) : ""}`));
    }
    if (S.hasModule("/curriculum")) (t.kap || []).forEach((n) => {
      const k = S.data.chapter(n);
      if (k) rad.appendChild(el("a.chip", { href: "#/chapter/" + n, style: { textDecoration: "none" } }, `K${n} · ${kutt(k.title, 30)}`));
    });
    return rad;
  }

  /* ---------- hurtiginnføring ----------
     Hva temaet tester, formlene du må kunne og de vanligste fellene, i et lite
     vindu over siden. Innholdet er tema.intro fra fagdataene. Formlene settes som
     .formula .eq, så symbolforklaringen fra kjernepensum virker også her. */
  let modal = null;
  function lukkIntro() {
    if (!modal) return;
    modal.remove(); modal = null;
    document.body.classList.remove("tr-modal-åpen");
  }
  function visIntro(t, { iRunde = false } = {}) {
    lukkIntro();
    const i = t.intro || {};
    const vekt = el(".kap-vekt", { title: `Eksamensvekt ${t.vekt} av 5` });
    for (let n = 1; n <= 5; n++) vekt.appendChild(el("i" + (n <= t.vekt ? ".på" : "")));
    const kort = el(".tr-modal", { role: "dialog", "aria-modal": "true", "aria-label": "Hurtiginnføring: " + t.navn });
    const lukk = el("button.tr-modal-lukk", { type: "button", "aria-label": "Lukk", onclick: lukkIntro }, "×");
    kort.appendChild(el(".tr-modal-topp",
      el("div", el(".eyebrow", "Hurtiginnføring"), el("h3", t.navn), vekt), lukk));

    const kropp = el(".tr-modal-kropp.prose");
    if ((i.tester || []).length) {
      kropp.appendChild(el("h4", "Hva temaet tester"));
      kropp.appendChild(el("ul", ...i.tester.map((x) => el("li", frag(String(x))))));
    }
    if ((i.formler || []).length) {
      kropp.appendChild(el("h4", i.formeltittel || "Formlene du må kunne"));
      i.formler.forEach(([uttrykk, hva]) => kropp.appendChild(i.formeltittel
        ? el(".tr-begrep", el("b", frag(String(uttrykk))), el("span", frag(String(hva || ""))))
        : el(".formula", el(".eq", frag(String(uttrykk))), hva ? el(".where", frag(String(hva))) : null)));
    }
    if ((i.feller || []).length) {
      kropp.appendChild(el("h4", "Typiske feller"));
      kropp.appendChild(el("ul", ...i.feller.map((x) => el("li", frag(String(x))))));
    }
    if (S.symboler) S.symboler.merk(kropp, t.kjerne);
    kropp.appendChild(lesMerTema(t, false));
    kort.appendChild(kropp);

    const bunn = el(".tr-modal-bunn");
    bunn.appendChild(el(".row", { style: { gap: "8px" } },
      el(".spacer"),
      el("button.btn.ghost.sm", { type: "button", onclick: lukkIntro }, "Lukk"),
      iRunde ? null : el("button.btn.primary.sm", { type: "button", onclick: () => {
        const v = valg();
        settValg({ temaer: [t.id] });
        lukkIntro();
        start([t.id], v.antall, v.modus);
      } }, "Øv på dette temaet →")));
    kort.appendChild(bunn);

    modal = el(".tr-modal-bak", { onclick: (e) => { if (e.target === modal) lukkIntro(); } }, kort);
    document.body.appendChild(modal);
    document.body.classList.add("tr-modal-åpen");
    lukk.focus({ preventScroll: true });
  }

  /* ---------- resultat ---------- */
  function resultat() {
    const o = økt();
    const { liste } = aktivtSpørsmål(o);
    const wrap = el(".fade-in");
    let rett = 0, galt = 0, blank = 0, ubesvart = 0;
    liste.forEach((s) => { const v = o.svar[s.id]; if (v == null) ubesvart++; else if (v === BLANK) blank++; else if (v === s.answer) rett++; else galt++; });
    const besvart = liste.length - ubesvart;
    const medHjelp = liste.filter((s) => hjelpNivå(o, s.id) && o.svar[s.id] === s.answer).length;
    const førsteGang = rett - medHjelp;
    const senere = liste.filter((s) => (o.losst || {})[s.id]).length;
    const P = poengregel();
    const minus = harMinus();
    const poeng = rett * P.rett + galt * P.feil + blank * P.blank;
    const maks = besvart * P.rett;
    /* Uten minuspoeng er resultatet andelen riktige av de besvarte. */
    const pct = minus ? (maks ? Math.max(0, Math.round(100 * poeng / maks)) : 0) : (besvart ? Math.round(100 * rett / besvart) : 0);
    /* Hvor mange du svarte med et tall du regnet selv. Hvor mange av dem var riktige? */
    const medTall = liste.filter((s) => tallFor(o, s) && o.svar[s.id] != null);
    const tallRett = medTall.filter((s) => o.svar[s.id] === s.answer).length;
    const tallLinje = medTall.length ? ` Med tall du regnet selv: ${tallRett} av ${medTall.length} riktige.` : "";

    wrap.appendChild(sh().pageHead("Eksamenstrening", "Runden er ferdig",
      ubesvart ? `Du avsluttet med ${ubesvart} ubesvarte. De er holdt utenfor ${minus ? "poengene" : "resultatet"}.` : null));
    const kort = el(".card.pad-lg");
    kort.appendChild(el(".row.wrap", { style: { gap: "22px", alignItems: "center" } },
      minus ? S.u.ring(pct, 120, `${poeng}`, `av ${maks}`) : S.u.ring(pct, 120, `${rett}`, `av ${besvart}`),
      el("div",
        el("div", { style: { fontSize: "20px", fontWeight: 680 } }, minus
          ? `${rett} riktige · ${galt} feil · ${blank} stod over`
          : `${rett} riktige · ${galt} feil` + (blank ? ` · ${blank} uten svar` : "")),
        el("p.tiny.muted", { style: { margin: "6px 0 0", maxWidth: "440px" } },
          (minus
            ? `Med +${P.rett}/${fmt(P.feil)}/${P.blank} ble det ${poeng} av ${maks} poeng (${pct} %). Uten minuspoeng hadde det vært ${rett * P.rett}.`
            : `${rett} av ${besvart} riktige (${pct} %).`)
          + ` Riktig på første forsøk uten hjelp: ${førsteGang} av ${besvart}.`
          + tallLinje
          + (senere ? ` ${senere} fikk du riktig på et senere forsøk.` : "")
          + (medHjelp ? ` ${medHjelp} av de riktige var med hjelp. De kommer tilbake under «Nye først».` : "")
          + (minus && galt && blank === 0 ? " Du stod aldri over. Svar bare når du kan utelukke minst ett alternativ." : "")))));

    /* Per tema, når runden spenner over flere. */
    const per = new Map();
    liste.forEach((s) => { const v = o.svar[s.id]; if (v == null) return; const r = per.get(s.tema) || { rett: 0, n: 0 }; r.n++; if (v === s.answer) r.rett++; per.set(s.tema, r); });
    if (per.size > 1) {
      kort.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "18px" } }, "Per tema"));
      [...per].sort((a, b) => a[1].rett / a[1].n - b[1].rett / b[1].n).forEach(([id, r]) => {
        const t = temaFor(id);
        kort.appendChild(el(".row", { style: { gap: "8px", alignItems: "baseline", marginTop: "8px" } },
          el(".tiny", { style: { fontWeight: 560 } }, t ? t.navn : id), el(".spacer"), el(".tiny.muted", `${r.rett} av ${r.n}`)));
        kort.appendChild(el("div", { style: { marginTop: "4px" } }, S.u.bar(100 * r.rett / r.n, { thin: true, green: r.rett === r.n })));
      });
    }

    const bom = liste.filter((s) => { const v = o.svar[s.id]; return v != null && v !== s.answer; });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", marginTop: "22px" } },
      o.sjekk && sjekkFor(o.sjekk) ? el("button.btn.primary", { onclick: () => startSjekk(sjekkFor(o.sjekk)) }, "Ta sjekken på nytt")
        : el("button.btn.primary", { onclick: () => start(o.temaer, liste.length, o.modus) }, "Ny runde"),
      bom.length ? el("button.btn", { onclick: () => start(o.temaer, bom.length, o.modus, bom.map((s) => s.id)) }, `Øv på de ${bom.length} du ikke fikk riktig`) : null,
      liste.some((s) => erMerket(s.id)) ? el("button.btn", { onclick: () => { const ids = liste.filter((s) => erMerket(s.id)).map((s) => s.id); start(o.temaer, ids.length, "merket", ids); } },
        `Øv på de ${liste.filter((s) => erMerket(s.id)).length} du merket`) : null,
      el("button.btn.ghost", { onclick: () => { forkastØkt(); S.app.refresh(); } }, "Endre utvalg")));
    wrap.appendChild(kort);

    /* Gjennomgang: hvert spørsmål med svaret ditt og den korte fasiten. */
    wrap.appendChild(el("div", { style: { marginTop: "24px" } }, sh().sectionTitle("Gjennomgang")));
    const listeEl = el(".card", { style: { padding: "4px 16px" } });
    liste.forEach((s, i) => {
      const v = o.svar[s.id];
      const merke = v == null ? ["–", "var(--ink-4)"] : v === BLANK ? ["○", "var(--ink-3)"] : v === s.answer ? ["✓", "var(--green)"] : ["✕", "var(--rose)"];
      const d = el("details.tr-gj");
      d.appendChild(el("summary", el("span.tr-gj-merke", { style: { color: merke[1] } }, merke[0]),
        el("span.tr-gj-tekst", `${i + 1}. ${(temaFor(s.tema) || {}).kort || ""}: ${stripp(spørsmålet(s.q))}`),
        erMerket(s.id) ? el("span.tr-gj-stjerne", { title: "Merket for øving" }, "★") : null));
      const innhold = el("div", { style: { padding: "4px 0 12px 26px" } });
      innhold.appendChild(prosa(s.q));
      innhold.appendChild(el("p.tiny", { style: { margin: "6px 0" } },
        el("b", "Riktig: "), frag(String(s.options[s.answer])),
        v != null && v !== BLANK && v !== s.answer ? el("span", { style: { color: "var(--rose)" } }, " · ditt svar: ", ...dittSvar(o, s, v)) : null));
      innhold.appendChild(el(".explain", prosa(s.kort)));
      innhold.appendChild(el("div", { style: { marginTop: "8px" } }, merkKnapp(s)));
      innhold.appendChild(el("button.btn.ghost.sm", { style: { marginTop: "8px" }, onclick: () => { const ny = Object.assign({}, o, { slutt: null, pos: i }); visFull = true; lagreØkt(ny); S.app.refresh(); window.scrollTo({ top: 0 }); } }, "Åpne med full gjennomgang"));
      d.appendChild(innhold);
      listeEl.appendChild(d);
    });
    wrap.appendChild(listeEl);
    return wrap;
  }
  /* Det gale svaret ditt i gjennomgangen: alternativet, tallet du skrev, eller begge. */
  function dittSvar(o, s, v) {
    const tt = tallFor(o, s);
    if (!tt || !s.tall) return [frag(String(s.options[v]))];
    const din = medEnhet(tt.tekst, s.tall);
    return v === FEILTALL ? [`tallet ${din}`] : [frag(String(s.options[v])), ` (du skrev ${din})`];
  }
  /* Kutter ved et ordskille, ikke midt i et ord. */
  const kutt = (t, n) => { t = String(t || ""); if (t.length <= n) return t; const k = t.slice(0, n).replace(/[\s,:;·]+\S*$/, ""); return (k || t.slice(0, n)) + " …"; };
  /* Selve spørsmålet står som regel i siste avsnitt; det sier mer i en liste
     enn innledningen, som er lik for alle variantene i en familie. */
  const spørsmålet = (html) => { const p = String(html || "").match(/<p>(?:(?!<p>)[\s\S])*<\/p>\s*$/); return p ? p[0] : html; };
  const stripp = (html) => { const t = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); return t.length > 110 ? t.slice(0, 107) + "…" : t; };

  /* ---------- tastatur ---------- */
  let tasterKoblet = false;
  function kobleTaster() {
    if (tasterKoblet) return;
    tasterKoblet = true;
    window.addEventListener("hashchange", lukkIntro);
    document.addEventListener("keydown", (e) => {
      /* Mens innføringen er åpen, skal A–D ikke svare på spørsmålet bak den. */
      if (modal) { if (e.key === "Escape") { e.preventDefault(); lukkIntro(); } return; }
      if (!/^#\/trening/.test(location.hash || "")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const mål = e.target;
      if (mål && (mål.tagName === "INPUT" || mål.tagName === "TEXTAREA" || mål.isContentEditable)) return;
      const o = økt();
      if (!o || o.slutt) return;
      const { liste, pos, sp } = aktivtSpørsmål(o);
      if (!sp) return;
      const k = e.key.toLowerCase();
      const åpen = erÅpen(o, sp);
      const i = "abcd".indexOf(k) > -1 ? "abcd".indexOf(k) : "1234".indexOf(k);
      /* Med «Regn selv først» er alternativene skjult til tallet er sjekket. Et
         siffer utenfor feltet flytter fokus dit, så tegnet havner i feltet. */
      if (!åpen && venterTall(o, sp) && /^[\d.,\-−]$/.test(e.key)) { const f = document.querySelector(".tr-tall-inn"); if (f) f.focus(); return; }
      if (!åpen && i > -1 && i < sp.options.length) { if (venterTall(o, sp)) return; e.preventDefault(); velg(sp, i); S.app.refresh(); return; }
      if (!åpen && k === "s" && o.svar[sp.id] == null) { e.preventDefault(); registrer(sp, BLANK); S.app.refresh(); return; }
      if (!åpen && k === "h") { e.preventDefault(); merHjelp(sp); S.app.refresh(); return; }
      if (k === "m") { e.preventDefault(); merk(sp, !erMerket(sp.id)); S.app.refresh(); return; }
      if (åpen && k === "v") { const v = nyVariant(o, sp); if (v) { e.preventDefault(); taVariant(o, pos, v); } return; }
      if (åpen && k === "f") { e.preventDefault(); visFull = !visFull; S.app.refresh(); return; }
      if (åpen && (k === "enter" || k === "arrowright")) { e.preventDefault(); neste(o, liste, pos); return; }
      if (k === "arrowleft" && pos > 0) { e.preventDefault(); gåTil(o, pos - 1); }
    });
  }

  /* ---------- inngang ---------- */
  /* ================= Må kunne ================= */
  const MK = () => (window.EDU_DATA || {}).mustKunne || null;
  const mkValg = () => Object.assign({ fane: "mk", tier: 0 }, exams()["trening:mk"] || {});
  function settMk(patch) { S.store.setExam("trening:mk", patch); S.app.refresh(); window.scrollTo({ top: 0 }); }
  const mkTyper = (tier) => ((MK() || {}).typer || []).filter((t) => !tier || t.tier === tier);
  const settStatus = (id) => (S.views.sett && S.views.sett.status ? S.views.sett.status(id) : null);
  const mkPoeng = (x) => String(Math.round(x * 10) / 10).replace(".", ",");
  /* Typen er gjort når alle tre oppgavene er gjort (rettet eller levert). */
  const typeGjort = (t) => (t.sett || []).filter((id) => (settStatus(id) || {}).gjort).length;
  /* Tiers med minst én type (tier 2 og 3 kan komme senere enn tier 1). */
  const mkTiers = () => ((MK() || {}).tiers || []).filter((ti) => mkTyper(ti.nr).length);
  /* Tieren du står i: den du valgte, ellers den første som ikke er ferdig. */
  function aktivTier() {
    const tiers = mkTiers();
    const v = mkValg().tier;
    if (v && tiers.some((t) => t.nr === v)) return v;
    const uferdig = tiers.find((ti) => mkTyper(ti.nr).some((t) => typeGjort(t) < (t.sett || []).length));
    return (uferdig || tiers[0] || {}).nr || 1;
  }
  function åpneMk(id, mode) {
    S.views.sett.åpne(id, { mode, tilbake: { tekst: "← Må kunne", hash: "#/trening" } });
  }

  function faner(aktiv) {
    if (!MK()) return null;
    const seg = el(".seg", { style: { marginBottom: "16px", flexWrap: "wrap" } });
    const n = mkTyper().length;
    [["mk", `Må kunne (${n} typer)`], ["bank", "Spørsmålsbank"]].forEach(([f, l]) =>
      seg.appendChild(el("button" + (aktiv === f ? ".on" : ""), { onclick: () => { if (aktiv !== f) settMk({ fane: f }); } }, l)));
    return el("div", seg);
  }

  function mkOppgaveRad(t, id, i) {
    const set = (S.views.sett.alle() || []).find((x) => x.id === id);
    if (!set) return null;
    const st = settStatus(id) || {};
    const ex = (set.exercises || [])[0] || {};
    const chip = st.levert ? el(".chip.green", el(".dot"), `Levert · ${mkPoeng(st.got)} av ${st.of}`)
      : st.gjort ? el(".chip.green", el(".dot"), `Gjort · ${mkPoeng(st.got)} av ${st.of}`)
        : st.påbegynt ? el(".chip.amber", el(".dot"), st.scored ? `Påbegynt · ${mkPoeng(st.got)} p så langt` : "Påbegynt")
          : el(".chip.slate", "Ikke startet");
    return el(".mk-oppg",
      el(".mk-oppg-topp",
        el("div", el("div.mk-oppg-navn", `Oppgave ${i + 1}`), ex.title ? el(".tiny.muted", ex.title) : null),
        el(".spacer"),
        st.feil ? el(".chip.rose", `${st.feil} feil`) : null,
        st.usikre ? el(".chip.amber", `⚑ ${st.usikre}`) : null,
        chip),
      el(".row.wrap", { style: { gap: "8px", marginTop: "10px", alignItems: "center" } },
        el(".chip", icon("clock"), `${set.minutes} min`), el(".chip", `${set.points} poeng`),
        el(".spacer"),
        el("button.btn.primary.sm", { onclick: () => åpneMk(id, "practice") }, st.påbegynt && !st.gjort ? "Fortsett" : "Øving"),
        el("button.btn.sm", { onclick: () => åpneMk(id, "exam") }, "⏱ På tid"),
        (st.påbegynt || st.levert) ? el("button.btn.ghost.sm", { onclick: () => {
          if (confirm(`Nullstille ${t.navn}, oppgave ${i + 1}? Svarene, rettingen og leveringen slettes. Kan ikke angres.`)) { S.views.sett.nullstill(id); S.app.refresh(); }
        } }, "Nullstill") : null));
  }

  function mkTypeKort(t, nr) {
    const gjort = typeGjort(t), n = (t.sett || []).length;
    const kort = el(".card.pad-lg.mk-type");
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("span.mk-nr", String(nr)),
      el("h3", { style: { fontSize: "18px", margin: 0, flex: "1 1 220px" } }, t.navn),
      el(gjort === n ? ".chip.green" : gjort ? ".chip.amber" : ".chip.slate", `${gjort} av ${n} gjort`)));
    if (t.hvorfor) kort.appendChild(el("p", { style: { margin: "10px 0 0", fontSize: "14.5px", lineHeight: 1.55 } }, frag(t.hvorfor)));
    if ((t.signaler || []).length) {
      const d = el("details.mk-signaler");
      d.appendChild(el("summary", `Hva Kurbatov sa (${t.signaler.length})`));
      d.appendChild(el("ul", ...t.signaler.map((g) => el("li", g.sitat ? el("i", `«${g.sitat}»`) : null, g.sitat ? " " : null, el("span.muted", g.hvor)))));
      kort.appendChild(d);
    }
    const liste = el(".mk-oppgaver");
    (t.sett || []).forEach((id, i) => { const r = mkOppgaveRad(t, id, i); if (r) liste.appendChild(r); });
    kort.appendChild(liste);
    return kort;
  }

  function renderMk() {
    const mk = MK();
    const wrap = el(".fade-in");
    const tiers = mkTiers();
    const tier = aktivTier();
    const ti = tiers.find((x) => x.nr === tier) || {};
    const typer = mkTyper(tier);
    const alle = mkTyper();
    const oppgTotalt = alle.reduce((a, t) => a + (t.sett || []).length, 0);
    const oppgGjort = alle.reduce((a, t) => a + typeGjort(t), 0);
    wrap.appendChild(sh().pageHead("Eksamenstrening", `Må kunne · ${alle.length} oppgavetyper · ${oppgTotalt} oppgaver`, mk.intro || ""));
    wrap.appendChild(faner("mk"));

    /* Én tier om gangen. Hver knapp viser hvor mye som er gjort. */
    const seg = el(".seg.mk-tiers", { style: { flexWrap: "wrap", marginBottom: "10px" } });
    tiers.forEach((x) => {
      const ts = mkTyper(x.nr);
      const n = ts.reduce((a, t) => a + (t.sett || []).length, 0), g = ts.reduce((a, t) => a + typeGjort(t), 0);
      seg.appendChild(el("button" + (x.nr === tier ? ".on" : ""), { onclick: () => { if (x.nr !== tier) settMk({ tier: x.nr }); } },
        `${x.navn} · ${g}/${n}`));
    });
    wrap.appendChild(el("div", el(".nav-section", { style: { paddingLeft: 0 } }, "Velg tier"), seg));
    if (ti.tekst) wrap.appendChild(el("p.tiny.muted", { style: { margin: "0 0 16px", maxWidth: "640px", lineHeight: 1.55 } }, frag(ti.tekst)));

    /* Neste oppgave i tieren: første som ikke er gjort, i rekkefølgen typene står. */
    let neste = null;
    for (const t of typer) {
      const i = (t.sett || []).findIndex((id) => !(settStatus(id) || {}).gjort);
      if (i >= 0) { neste = { t, id: t.sett[i], i }; break; }
    }
    if (neste) wrap.appendChild(el(".card", { style: { marginBottom: "16px", background: "var(--accent-soft)", borderColor: "var(--accent-soft-2)" } },
      el(".row.wrap", { style: { gap: "12px", alignItems: "center" } },
        el("div", el(".tiny.muted", "Neste i " + (ti.navn || "tieren")), el("div", { style: { fontWeight: 640 } }, `${neste.t.navn} · oppgave ${neste.i + 1}`)),
        el(".spacer"),
        el("button.btn.primary.sm", { onclick: () => åpneMk(neste.id, "practice") }, "Start →"))));
    else if (typer.length) wrap.appendChild(el(".card", { style: { marginBottom: "16px", background: "var(--green-soft, #e3f4ee)" } },
      el("div", { style: { fontWeight: 640 } }, `Alle oppgavene i ${ti.navn || "tieren"} er gjort.`),
      el(".tiny.muted", { style: { marginTop: "4px" } }, "Ta dem på tid, eller gå videre til neste tier.")));

    const liste = el(".stack", { style: { gap: "14px" } });
    typer.forEach((t, i) => liste.appendChild(mkTypeKort(t, i + 1)));
    wrap.appendChild(liste);
    wrap.appendChild(el("p.tiny.muted", { style: { marginTop: "16px", lineHeight: 1.55 } },
      `${oppgGjort} av ${oppgTotalt} oppgaver gjort. En oppgave er gjort når hver del er rettet i øving eller du har levert den på tid. Oppgavene åpnes i samme visning som Eksamenssett, med retting og fasit, og knappen øverst tar deg tilbake hit.`));
    return wrap;
  }

  function render() {
    if (MK() && S.views.sett && mkValg().fane === "mk") return renderMk();
    if (!T()) {
      sikreData();
      if (lastefeil) return sh().empty("⚠️", "Fant ikke spørsmålene", String(lastefeil.message || lastefeil));
      if (lazyListe().length) return el(".fade-in", el(".card.pad-lg", { style: { textAlign: "center" } },
        el(".spinner", { style: { margin: "10px auto 14px" } }), el("p.muted", "Laster spørsmålsbanken …")));
      return sh().empty("📭", "Ingen eksamenstrening ennå", "Faget har ikke lagt inn EDU_DATA.trening.");
    }
    kobleTaster();
    const o = økt();
    if (o && o.ids && o.ids.length && !o.slutt) return runde();
    if (o && o.ids && o.ids.length && o.slutt) return resultat();
    return oppsett();
  }

  /* Brukes av boot.js for å vise modulen før dataene er lastet. */
  const finnes = () => !!T() || lazyListe().length > 0;

  /* Inngangen på dashbordet. Banken er kanskje ikke lastet ennå, så kortet
     teller bare det som står i lagringen. */
  function dashbordkort() {
    if (!finnes() || !S.hasModule("/trening")) return null;
    const ex = exams();
    const sett = Object.keys(ex).filter((k) => k.indexOf("tr:") === 0).length;
    const o = økt();
    const igang = o && o.ids && o.ids.length && !o.slutt;
    const kort = el(".card");
    kort.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Eksamenstrening"), el(".spacer"),
      el(".see-all", { onclick: sh().go("#/trening") }, "Åpne →")));
    const merket = Object.keys(ex).filter((k) => k.indexOf("trm:") === 0 && ex[k].m === 1).length;
    kort.appendChild(el("p.tiny.muted", { style: { margin: "6px 0 12px" } },
      (merket ? `${merket} merket for øving. ` : "")
      + (igang ? `Du har en runde i gang: ${o.ids.filter((id) => o.svar[id] != null).length} av ${o.ids.length} besvart.`
        : sett ? `Spørsmål i eksamensformat, med fasit med en gang. Du har svart på ${sett} så langt.`
          : "Spørsmål i eksamensformat, med fasit med en gang. Velg temaer og antall.")));
    kort.appendChild(el("a.btn.primary.sm", { href: "#/trening" }, igang ? "Fortsett runden" : "Start en runde"));
    return kort;
  }

  /* tolkTall brukes også av Øv uten stopp (js/bundle-ov.js), med fagets språk som tredje argument. */
  S.views.trening = { render, finnes, dashbordkort, tolkTall };
})(window.EDU);
