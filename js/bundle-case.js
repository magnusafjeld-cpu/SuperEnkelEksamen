/* ===================== CASETRENING — én case, trinn for trinn =====================
   Et caseintervju er en samtale, ikke et oppgavesett. Derfor kan det ikke kjøres
   som eksamenssettene: rekkefølgen er poenget, og hvert trinn må være låst til du
   selv har forsøkt. Leser du intervjuerens struktur før du har skrevet din egen,
   har du ikke trent på noe som helst — du har lest en fasit.

   Modulen kjører derfor casen som en sekvens av trinn. Hvert trinn har en art som
   bestemmer hvordan det spilles:

     forberedelse lesetid før intervjuet: les materialet og noter
     oppklaring   hvilke spørsmål ville du stilt før du begynner?
     struktur     skriv din egen nedbrytning før intervjuerens vises
     exhibit      les figuren og si hva den betyr
     regne        regn på papir, skriv tallet — det sjekkes automatisk
     ide          idémyldring mot klokka, deretter kryss av hva du fikk med
     drøfting     et kvalitativt spørsmål: risiko, gjennomføring, alternativer
     syntese      anbefalingen, topp-ned, på tid

   Vurderingen er streng: etter hvert trinn krysser du av kravene svaret ditt
   faktisk oppfylte, og nivået regnes ut av det. Se strengVurdering().

   Fremdrift lagres i state.exams under "case:<id>:run" og "case:<id>:t<n>".
   Den bøtta er generisk og synkes allerede, så modulen trenger ingen migrering. */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon, frag } = S.u;
  const sh = () => S.views.shared;
  const CASES = () => window.EDU_DATA.cases || [];
  /* Tabeller i fasit og materiale er bredere enn en telefon. Uten innpakning drar
     de hele siden sidelengs (fallgruve 7i); rullTabeller gir hver sin egen rulling. */
  const prosa = (html, stil) => { const n = el(".prose", stil ? { style: stil } : {}, frag(html)); S.u.rullTabeller(n); return n; };

  /* Skalaen er konsulentbransjens egen, ikke poeng. «Bestått» og «distinkt» er
     to forskjellige ting, og det er nettopp det skillet treningen handler om. */
  const SKALA = ["Bom", "Delvis", "Solid", "Distinkt"];
  const MAKS_SVAR = 2000;   // svarene ligger i fremdriften som synkes — hold dem korte

  /* ---------- lokal tilstand (hvor du er, ikke hva du har gjort) ---------- */
  let åpen = null;          // caseId, eller null for biblioteket
  let steg = 0;
  let ticker = null;
  let stegStart = 0;        // når inneværende trinn ble åpnet — bare en treningsklokke
  let filtre = { kategori: "alle", type: "alle", nivå: "alle", firma: "alle" };

  function stopp() { if (ticker) { clearInterval(ticker); ticker = null; } }
  const caseById = (id) => CASES().find((c) => c.id === id) || null;
  const trinnene = (c) => c.trinn || [];

  /* ---------- persistert tilstand ---------- */
  const kjørKey = (id) => "case:" + id + ":run";
  const stegKey = (id, i) => "case:" + id + ":t" + i;
  const les = (k) => S.store.get().exams[k] || {};
  const kjør = (id) => les(kjørKey(id));
  const stegSt = (id, i) => les(stegKey(id, i));

  function start(id) { S.store.setExam(kjørKey(id), { startedAt: S.u.nowTs(), submittedAt: null }); }
  function fullfør(id) { S.store.setExam(kjørKey(id), { submittedAt: S.u.nowTs() }); }
  function nullstill(id) {
    const st = S.store.get(), c = caseById(id);
    delete st.exams[kjørKey(id)];
    delete st.exams[enkeltKey(id)];
    trinnene(c || {}).forEach((_, i) => delete st.exams[stegKey(id, i)]);
    S.store.emit();
  }

  /* ---------- enkeltmodus ----------
     Market sizing er ikke en case på linje med de andre. Det er en liten,
     kandidatledet komponent, typisk noen minutter i et førstegangsintervju: du
     får ett spørsmål, stiller et par avklaringer, og snakker deg gjennom
     regnestykket selv mens intervjueren hører på.

     Derfor spilles den ikke trinn for trinn. Deler man den i seks trinn, deler
     man samtidig ut strukturen — og strukturen er nettopp det som vurderes.
     Derfor: spørsmålet, tenketid, og hele gjennomgangen når du selv sier fra.

     Egen lagringsnøkkel, ikke trinn 0, så en case som alt er kjørt trinnvis ikke
     ser ut som avdekket i enkeltmodus. */
  const erEnkelt = (c) => !!c && c.format === "ett-spørsmål";
  const enkeltKey = (id) => "case:" + id + ":enkelt";
  const enkeltSt = (id) => les(enkeltKey(id));
  function avdekkEnkelt(id) {
    const brukt = stegStart ? S.u.nowTs() - stegStart : null;
    S.store.setExam(enkeltKey(id), brukt == null ? { vist: true } : { vist: true, brukt: brukt });
  }
  /* Lagring skjer ved blur og ved avdekking, aldri per tastetrykk: en refresh
     midt i skrivingen ville tatt både markøren og halve setningen. */
  function lagreSvar(id, i, tekst) { S.store.setExam(stegKey(id, i), { svar: String(tekst || "").slice(0, MAKS_SVAR) }); }
  /* Tiden fryses i det fasiten åpnes. Uten dette telte klokka videre mens du
     leste løsningen, og et trinn du brukte halvannet minutt på, endte rødt på
     «+05:23» fordi fasiten er lang. Det er lesetid, ikke tenketid. */
  function avdekk(id, i) {
    const brukt = stegStart ? S.u.nowTs() - stegStart : null;
    S.store.setExam(stegKey(id, i), brukt == null ? { vist: true } : { vist: true, brukt: brukt });
  }
  function settScore(id, i, s) { S.store.setExam(stegKey(id, i), { score: s }); }
  function settTikk(id, i, liste) { S.store.setExam(stegKey(id, i), { tikk: liste }); }
  /* Kravene er tekst, eller { k, t } når casen vurderes mot et sett kriterier.
     Kriterienavnene er innhold og ligger i EDU_DATA.caseKriterier. */
  const kravTekst = (k) => (typeof k === "string" ? k : (k && k.t) || "");
  const kravKrit = (k) => (k && typeof k === "object" ? k.k || null : null);
  const kritNavn = (k) => ((window.EDU_DATA || {}).caseKriterier || {})[k] || k;

  const erVist = (id, i) => !!stegSt(id, i).vist;
  const erFerdig = (c) => trinnene(c).every((_, i) => erVist(c.id, i));

  /* ---------- tall ---------- */
  /* Casesvar skrives som man sier dem: «1,2 mrd», «450 mill», «12 %», «1 200 000».
     Fasiten er oppgitt i trinnets egen enhet, så «78» og «78 mill» er samme svar
     når enheten er millioner. Derfor sammenlignes alt i grunnenheter:

       med suffiks   tallet betyr det suffikset sier     «78 mill»   → 78 000 000
       uten suffiks  tallet betyr det enheten sier       «78»        → 78 000 000
       alltid også   tallet tatt bokstavelig             «78000000»  → 78 000 000

     Da godtas svaret uansett hvordan det skrives, mens «78 mrd» fortsatt avvises. */
  const SUFFIKS = [[/mrd|milliard/i, 1e9], [/mill|million/i, 1e6], [/\btusen\b|\d\s*k\b/i, 1e3]];
  const ENHETSKALA = [[/milliard/i, 1e9], [/million/i, 1e6], [/tusen/i, 1e3]];

  function skala(tekst, tabell) {
    for (const [re, mult] of tabell) if (re.test(String(tekst || ""))) return mult;
    return null;
  }
  /* Appen skriver selv negative tall med ekte minustegn (−, U+2212), så det er
     det tegnet brukeren kopierer og som telefontastaturet setter inn. Uten
     normaliseringen her leses «−18» som 18, og et riktig svar blir underkjent. */
  /* Og slik skrives det også: «minus 30», «40.000» med punktum som tusenskille,
     og hele regnestykket «120 000 − 80 000 = 40 000», der svaret står sist. */
  function parseTall(s) {
    let t = String(s == null ? "" : s);
    if (t.includes("=")) t = t.slice(t.lastIndexOf("=") + 1);
    t = t.replace(/[\s ]/g, "").replace(/%/g, "")
      .replace(/[\u2212\u2013]/g, "-").replace(/minus/i, "-")
      .replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1").replace(",", ".");
    const m = t.match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  function riktigTall(t, rå) {
    const n = parseTall(rå);
    if (n == null || t.svar == null) return null;
    const enhet = skala(t.enhet, ENHETSKALA) || 1;
    const suff = skala(rå, SUFFIKS);
    const kandidater = suff ? [n * suff, n] : [n * enhet, n];
    const mål = t.svar * enhet;
    const tol = t.toleranse == null ? 0.02 : t.toleranse;   // 2 % slingringsmonn som standard
    return kandidater.some((k) => Math.abs(k - mål) <= Math.abs(mål) * tol + 1e-9);
  }
  const norsk = (n) => (typeof n === "number" ? n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }) : n);

  /* ---------- klokke ---------- */
  function mmss(ms) {
    const over = ms < 0, t = Math.floor(Math.abs(ms) / 1000);
    return (over ? "+" : "") + String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  }

  /* ================= biblioteket ================= */
  function renderListe() {
    const wrap = el(".fade-in");
    const alle = CASES();
    /* Casetreningens egen fremdrift. Den sto før bare på Fremdrift-siden. */
    const st = stats();
    const fremdrift = st.kjørt ? ` · ${st.kjørt} kjørt` + (st.snitt == null ? "" : ` · snitt ${st.snitt.toFixed(1).replace(".", ",")} av 3`) : "";
    wrap.appendChild(sh().pageHead("Casetrening", `${alle.length} caser${fremdrift}`,
      "Hver case spilles trinn for trinn, slik den ville gått i rommet. Du skriver ditt eget svar før intervjuerens vises — det er hele poenget. Ta notater på papir, og si resonnementet høyt mens du jobber."));

    if (!alle.length) { wrap.appendChild(sh().empty("🧩", "Ingen caser ennå", "Faget har ikke lagt inn noe i EDU_DATA.cases.")); return wrap; }

    /* To hoveddeler når faget bruker dem: vanlige intervjucaser og market sizing.
       De to er ulike øvelser — den ene diagnostiserer et problem, den andre
       bygger et tall av forutsetninger — og bør derfor ikke ligge i samme haug. */
    const bolker = [...new Set(alle.map((c) => c.kategori || "Intervjucaser"))];
    const flerBolk = bolker.length > 1;
    if (flerBolk) {
      const rad = el(".seg", { style: { flexWrap: "wrap", marginBottom: "14px" } });
      [["alle", "Alle"], ...bolker.map((b) => [b, b])].forEach(([k, navn]) =>
        rad.appendChild(el("button" + (filtre.kategori === k ? ".on" : ""),
          { onclick: () => { filtre.kategori = k; S.app.refresh(); } },
          navn + (k === "alle" ? "" : " · " + alle.filter((c) => (c.kategori || "Intervjucaser") === k).length))));
      wrap.appendChild(rad);
    }

    wrap.appendChild(filterrad(alle));
    const vist = alle.filter(passerer);
    if (!vist.length) { wrap.appendChild(sh().empty("🔍", "Ingen caser med disse filtrene", "Løsne på et av dem.")); return wrap; }

    /* Grupper under overskrifter når begge bolkene vises samtidig. */
    if (flerBolk && filtre.kategori === "alle") {
      bolker.forEach((b) => {
        const i = vist.filter((c) => (c.kategori || "Intervjucaser") === b);
        if (!i.length) return;
        wrap.appendChild(sh().sectionTitle(`${b} · ${i.length} ${i.length === 1 ? "case" : "caser"}`));
        /* Introen til hver bolk er innhold, ikke motor. Den lå hardkodet på
           «Market sizing», og en tredje bolk ville dermed stått uten. */
        const intro = (window.EDU_DATA.caseKategorier || {})[b];
        if (intro) wrap.appendChild(el("p.tiny.muted", { style: { margin: "-6px 0 12px" } }, intro));
        const liste = el(".stack", { style: { gap: "14px", marginBottom: "26px" } });
        i.forEach((c) => liste.appendChild(caseKort(c)));
        wrap.appendChild(liste);
      });
      return wrap;
    }

    const liste = el(".stack", { style: { gap: "14px" } });
    vist.forEach((c) => liste.appendChild(caseKort(c)));
    wrap.appendChild(liste);
    return wrap;
  }

  const passerer = (c) =>
    (filtre.kategori === "alle" || (c.kategori || "Intervjucaser") === filtre.kategori) &&
    (filtre.type === "alle" || c.type === filtre.type) &&
    (filtre.nivå === "alle" || c.nivå === filtre.nivå) &&
    (filtre.firma === "alle" || c.firma === filtre.firma);

  function filterrad(alle) {
    const box = el(".card", { style: { marginBottom: "18px" } });
    const grupper = [
      ["type", "Casetype", [...new Set(alle.map((c) => c.type).filter(Boolean))]],
      ["nivå", "Nivå", [...new Set(alle.map((c) => c.nivå).filter(Boolean))]],
      ["firma", "Stilart", [...new Set(alle.map((c) => c.firma).filter(Boolean))]],
    ];
    grupper.forEach(([nøkkel, navn, verdier]) => {
      if (verdier.length < 2) return;
      const rad = el(".row.wrap", { style: { gap: "6px", alignItems: "center", marginBottom: "8px" } },
        el(".tiny.muted", { style: { minWidth: "68px" } }, navn));
      ["alle", ...verdier].forEach((v) => {
        rad.appendChild(el("button.chip" + (filtre[nøkkel] === v ? ".accent" : ".slate"),
          { style: { cursor: "pointer" }, onclick: () => { filtre[nøkkel] = v; S.app.refresh(); } },
          v === "alle" ? "Alle" : v));
      });
      box.appendChild(rad);
    });
    return box.children.length ? box : el("div");
  }

  function caseKort(c) {
    const r = kjør(c.id);
    const enkelt = erEnkelt(c);
    const antall = enkelt ? 1 : trinnene(c).length;
    const gjort = enkelt ? (enkeltSt(c.id).vist ? 1 : 0)
                         : trinnene(c).filter((_, i) => erVist(c.id, i)).length;
    const ferdig = enkelt ? gjort === 1 : (!!r.submittedAt || (antall && gjort === antall));

    const kort = el(".card.pad-lg");
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "19px" } }, c.label),
      el(".spacer"),
      ferdig ? el(".chip.green", el(".dot"), "Kjørt")
             : r.startedAt ? el(".chip.amber", el(".dot"), enkelt ? "Påbegynt" : `${gjort}/${antall}`) : null));

    kort.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "8px 0 12px" } },
      c.minutter ? el(".chip", icon("clock"), `${c.minutter} min`) : null,
      c.type ? el(".chip.indigo", c.type) : null,
      c.nivå ? el(".chip.slate", c.nivå) : null,
      c.firma ? el(".chip.teal", c.firma) : null,
      c.stil ? el(".chip.slate", { style: { fontSize: "11px" } }, c.stil) : null,
      enkelt ? el(".chip.slate", { style: { fontSize: "11px" } }, "ett spørsmål") : null));

    if (c.blurb) kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } }, c.blurb));

    if (gjort) {
      const snitt = snittScore(c);
      kort.appendChild(el(".explain", { style: { marginBottom: "14px" } },
        el("b", snitt == null ? "Påbegynt" : `Din vurdering: ${snitt.toFixed(1).replace(".", ",")} av 3`),
        snitt == null ? "" : (enkelt ? ` — ${SKALA[Math.round(snitt)]}.`
                                     : ` — ${SKALA[Math.round(snitt)]} i snitt over ${gjort} trinn.`)));
    }

    kort.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn.primary", { onclick: () => { åpen = c.id; steg = førsteUgjorte(c); stegStart = S.u.nowTs(); if (!kjør(c.id).startedAt) start(c.id); S.app.refresh(); window.scrollTo({ top: 0 }); } },
        r.startedAt ? "Fortsett casen" : "Start casen"),
      r.startedAt ? el("button.btn.ghost.sm", { onclick: () => { if (confirm("Nullstille denne casen? Alle svarene dine slettes.")) { nullstill(c.id); S.app.refresh(); } } }, "Nullstill") : null));
    return kort;
  }

  function førsteUgjorte(c) {
    const i = trinnene(c).findIndex((_, n) => !erVist(c.id, n));
    return i === -1 ? 0 : i;
  }
  function snittScore(c) {
    /* I enkeltmodus finnes bare én vurdering, og den er hele casens. */
    if (erEnkelt(c)) { const v = enkeltSt(c.id).score; return typeof v === "number" ? v : null; }
    const s = trinnene(c).map((_, i) => stegSt(c.id, i).score).filter((x) => typeof x === "number");
    return s.length ? s.reduce((a, b) => a + b, 0) / s.length : null;
  }

  /* ================= selve casen ================= */
  function renderCase(c) {
    stopp();
    if (erEnkelt(c)) return renderEnkelt(c);
    const wrap = el(".fade-in");
    const liste = trinnene(c);
    if (steg >= liste.length) steg = Math.max(0, liste.length - 1);

    wrap.appendChild(toppRad(c));
    wrap.appendChild(promptKort(c));
    if (!liste.length) { wrap.appendChild(sh().empty("🧩", "Casen har ingen trinn", "")); return wrap; }

    wrap.appendChild(trinnRad(c, liste));
    wrap.appendChild(trinnKort(c, liste[steg], steg));
    wrap.appendChild(bunnRad(c, liste));
    if (erFerdig(c)) wrap.appendChild(oppsummering(c));
    return wrap;
  }

  /* ---------- enkeltmodus: ett spørsmål, så hele fasiten ---------- */
  function renderEnkelt(c) {
    const wrap = el(".fade-in");
    const st = enkeltSt(c.id);
    const vist = !!st.vist;
    if (!vist && !stegStart) stegStart = S.u.nowTs();

    wrap.appendChild(toppRad(c));
    wrap.appendChild(promptKort(c));

    const arbeid = el(".card.pad-lg", { style: { marginBottom: "16px" } });
    arbeid.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "17px" } }, vist ? "Det du kom fram til" : "Din tur"),
      el(".spacer"),
      c.minutter ? (vist ? bruktKlokke({ sek: c.minutter * 60 }, st) : stegKlokke({ sek: c.minutter * 60 })) : null));
    arbeid.appendChild(el("p.tiny.muted", { style: { margin: "0 0 12px" } },
      vist ? "Sammenlign med gjennomgangen under. Det som teller er oppsettet og forutsetningene, ikke at tallet stemmer."
           : "Du driver dette selv. Still avklaringene du trenger først, si oppsettet høyt før du regner, "
             + "rund av åpent, og sanity-sjekk svaret til slutt. Snakk hele veien — det er resonnementet "
             + "intervjueren vurderer, ikke tallet. Noter gjerne tallet ditt her."));

    const felt = el("textarea.dyb-ansin", { rows: vist ? 3 : 4, maxlength: MAKS_SVAR,
      placeholder: "Tallet ditt og de viktigste forutsetningene (valgfritt)",
      onblur: (e) => S.store.setExam(enkeltKey(c.id), { svar: String(e.target.value || "").slice(0, MAKS_SVAR) }) });
    felt.value = st.svar || "";
    arbeid.appendChild(felt);

    if (!vist) {
      arbeid.appendChild(el(".row", { style: { marginTop: "14px" } },
        el("button.btn.primary.lg", { onclick: () => {
          const v = felt.value;
          S.store.setExam(enkeltKey(c.id), { svar: String(v || "").slice(0, MAKS_SVAR) });
          avdekkEnkelt(c.id); stopp(); S.app.refresh(); window.scrollTo({ top: 0 });
        } }, "Jeg er klar — vis fasiten")));
    }
    wrap.appendChild(arbeid);

    if (vist) {
      wrap.appendChild(gjennomgang(c));
      wrap.appendChild(enkeltScore(c, st));
      wrap.appendChild(oppsummering(c));
    }
    return wrap;
  }

  /* Hele løsningen som én gjennomgang. Trinnene finnes fortsatt i dataene og
     brukes som avsnitt, så innholdet er det samme; det er bare oppdelingen i
     seks klikk som er borte. */
  function gjennomgang(c) {
    const boks = el("div");
    trinnene(c).forEach((t, i) => {
      const kort = el(".card.pad-lg", { style: { marginBottom: "14px" } });
      const navn = ARTNAVN[t.art] || { full: "Trinn" };
      kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
        el(".chip.accent", String(i + 1)),
        el("h3", { style: { fontSize: "17px" } }, t.tittel || navn.full)));
      if (t.sp) kort.appendChild(el(".prose.tiny", { style: { marginBottom: "10px", color: "var(--ink-3)" } }, frag(t.sp)));
      if (t.figur) kort.appendChild(el(".card.flat", { style: { margin: "0 0 12px", overflowX: "auto" } }, el(".prose", frag(t.figur))));
      kort.appendChild(fasitPanel(t));
      boks.appendChild(kort);
    });
    return boks;
  }

  function enkeltScore(c, st) {
    const kort = el(".card.pad-lg", { style: { marginBottom: "16px" } });
    kort.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      el(".tiny.muted", "Hvor godt traff oppsettet ditt?"),
      ...SKALA.map((navn, v) => el("button.btn.sm" + (st.score === v ? ".primary" : ""), {
        onclick: () => { S.store.setExam(enkeltKey(c.id), { score: v }); S.app.refresh(); } }, navn))));
    kort.appendChild(el(".row", { style: { gap: "8px", marginTop: "14px" } },
      el("button.btn.ghost.sm", { onclick: () => {
        const s2 = S.store.get(); delete s2.exams[enkeltKey(c.id)]; S.store.emit();
        stegStart = S.u.nowTs(); S.app.refresh(); window.scrollTo({ top: 0 });
      } }, "Ta casen på nytt")));
    return kort;
  }

  function toppRad(c) {
    return el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginBottom: "14px" } },
      el("button.btn.ghost.sm", { onclick: () => { åpen = null; stopp(); S.app.refresh(); } }, "← Alle caser"),
      el(".spacer"),
      c.firma ? el(".chip.teal", c.firma) : null,
      c.stil ? el(".chip.slate", c.stil) : null);
  }

  /* Prompten står oppe hele veien. I rommet får du den én gang og må huske den,
     men her trener vi på resonnementet — ikke på hukommelse. */
  function promptKort(c) {
    const kort = el(".card.pad-lg", { style: { marginBottom: "16px" } });
    /* Med lesetid først er prompten et utdelt ark, ikke noe intervjueren sier. */
    if ((trinnene(c)[0] || {}).art === "forberedelse")
      kort.appendChild(el(".eyebrow", { style: { marginBottom: "4px" } }, "Casematerialet"));
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "20px" } }, c.label),
      el(".spacer"),
      c.type ? el(".chip.indigo", c.type) : null));
    if (c.prompt) kort.appendChild(prosa(c.prompt, { fontSize: "15.5px" }));
    return kort;
  }

  /* Et trinnbytte tegner siden på nytt med samme rulleposisjon. Knappen for
     neste trinn står nederst, så uten dette landet du midt i det nye trinnet,
     under spørsmålet. Rull heller til trinnraden, rett over spørsmålet. */
  function gåTil(i) {
    steg = i; stegStart = S.u.nowTs(); S.app.refresh();
    const rad = document.querySelector(".case-trinnrad");
    if (rad) window.scrollTo({ top: Math.max(0, rad.getBoundingClientRect().top + window.scrollY - 80) });
  }

  function trinnRad(c, liste) {
    const rad = el(".row.wrap.case-trinnrad", { style: { gap: "6px", marginBottom: "16px" } });
    liste.forEach((t, i) => {
      const vist = erVist(c.id, i);
      const cls = i === steg ? "button.chip.sett-nav.on" : vist ? "button.chip.green.sett-nav" : "button.chip.sett-nav";
      /* Trinnet kan gi sin egen korttittel. Uten den sto det «Regning» tre ganger
         på rad i casene som møtes fra to sider, og raden sa ingenting om hvor du var.
         Men raden vises fra første skjerm, og «Payback» eller «Feilkildene» røper
         hva intervjueren skal spørre om. Derfor vises den egne tittelen først når
         du er kommet til trinnet; før det står bare arten. */
      const standard = ARTNAVN[t.art] ? ARTNAVN[t.art].kort : String(i + 1);
      rad.appendChild(el(cls, { onclick: () => { gåTil(i); } },
        (vist || i === steg) && t.kort ? t.kort : standard));
    });
    return rad;
  }

  const ARTNAVN = {
    /* Lesetiden før intervjuet. PwC gir casen som skriftlig materiale og ber deg
       lese det «svært nøye»; notatene du gjør nå, er de du har i rommet. */
    forberedelse: { kort: "Lesetid", full: "Lesetid før intervjuet", ledd: "Les materialet nøye og noter før intervjueren begynner. Tiden på klokka er det du har." },
    oppklaring: { kort: "Spørsmål", full: "Oppklarende spørsmål", ledd: "Hva ville du spurt om før du begynner?" },
    struktur: { kort: "Struktur", full: "Struktur", ledd: "Bryt problemet ned. Skriv nedbrytningen din før du ser intervjuerens." },
    exhibit: { kort: "Figur", full: "Figurtolkning", ledd: "Hva ser du, og hva betyr det for casen?" },
    regne: { kort: "Regning", full: "Regnestykke", ledd: "Regn på papir. Skriv svaret her, så sjekkes det." },
    ide: { kort: "Idéer", full: "Idémyldring", ledd: "List så mange du klarer. Kvantitet først, så sorterer du." },
    drøfting: { kort: "Drøfting", full: "Drøfting", ledd: "Poenget først, så to eller tre begrunnelser. Vær konkret på hva det betyr for akkurat denne klienten." },
    syntese: { kort: "Anbefaling", full: "Syntese og anbefaling", ledd: "Svaret først, så de tre grunnene. Som til en klient som har ett minutt." },
  };

  function trinnKort(c, t, i) {
    const kort = el(".card.pad-lg");
    const navn = ARTNAVN[t.art] || { full: "Trinn", ledd: "" };
    const vist = erVist(c.id, i);
    const st = stegSt(c.id, i);

    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "4px" } },
      el(".chip.accent", `Trinn ${i + 1}`),
      el("h3", { style: { fontSize: "18px" } }, t.tittel || navn.full),
      el(".spacer"),
      t.sek ? (vist ? bruktKlokke(t, st) : stegKlokke(t)) : null));

    kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } }, t.ledd || navn.ledd));
    if (t.sp) kort.appendChild(prosa(t.sp, { fontSize: "15.5px" }));
    if (t.figur) kort.appendChild(el(".card.flat", { style: { margin: "14px 0", overflowX: "auto" } }, el(".prose", frag(t.figur))));

    kort.appendChild(t.art === "regne" ? regnefelt(c, t, i, vist, st) : skrivefelt(c, t, i, vist, st));

    if (vist) {
      /* Idémyldringen har sin egen avkrysning mot idélisten. Alle andre trinn
         med krav får den strenge sjekklisten, og da vises kravene der i stedet
         for som en liste i fasiten. */
      const idé = t.art === "ide" && (t.liste || []).length;
      const sjekkliste = !idé && (t.krav || []).length > 0;
      kort.appendChild(fasitPanel(t, !sjekkliste));
      /* Før avkrysningen: Claude svarer med hvilke krav som ble oppfylt, og
         dem krysser du av rett under. */
      kort.appendChild(claudeRad(() => trinnPrompt(c, i), "Vurder med Claude",
        "Kopierer casen, svaret ditt, fasiten og kravene som én melding. Lim den inn i Claude, så sier den hvilke krav du oppfylte og stiller et oppfølgingsspørsmål."));
      if (idé) kort.appendChild(idéAvkryssing(c, t, i, st));
      else if (sjekkliste) kort.appendChild(strengVurdering(c, t, i, st));
      else kort.appendChild(scoreRad(c, i, st));
    }
    return kort;
  }

  /* Klokka teller oppover mot måltiden og blir rød når du går over. Den stopper
     ingenting — den er der for å bygge tidsfølelse, som er halve ferdigheten. */
  /* Frosset klokke: hva du faktisk brukte før du åpnet fasiten. Mer nyttig enn
     bare å stoppe den, fordi tallet er det du skal sammenligne med måltiden. */
  function bruktKlokke(t, st) {
    if (st.brukt == null) return el(".chip.slate", { style: { fontVariantNumeric: "tabular-nums" } }, `mål ${mmss(t.sek * 1000)}`);
    const over = st.brukt - t.sek * 1000;
    const farge = over <= 0 ? "green" : over < t.sek * 500 ? "amber" : "rose";
    return el(".chip." + farge, { style: { fontVariantNumeric: "tabular-nums" },
      title: `Måltid ${mmss(t.sek * 1000)}` },
      `brukte ${mmss(st.brukt)}` + (over > 0 ? ` · ${Math.round(over / 1000)} s over` : ""));
  }

  function stegKlokke(t) {
    const boks = el(".chip.slate", { style: { fontVariantNumeric: "tabular-nums" } }, mmss(t.sek * 1000));
    ticker = setInterval(() => {
      if (!document.body.contains(boks)) return stopp();
      const igjen = t.sek * 1000 - (S.u.nowTs() - stegStart);
      boks.textContent = mmss(igjen);
      boks.className = "chip " + (igjen < 0 ? "rose" : igjen < t.sek * 300 ? "amber" : "slate");
    }, 1000);
    return boks;
  }

  function tekstfelt(c, i, st, plassholder, rader) {
    const ta = el("textarea.input", {
      rows: rader || 7,
      placeholder: plassholder,
      style: { width: "100%", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" },
      onblur: (e) => lagreSvar(c.id, i, e.target.value),
    });
    ta.value = st.svar || "";
    /* Kurset ber deg si svaret høyt. Da skal du kunne gjøre nettopp det.
       Hjelperen returnerer null i nettlesere uten taleoppkjenning. */
    const mik = S.u.diktering(ta, (tekst) => lagreSvar(c.id, i, tekst));
    return mik ? el("div", ta, mik) : ta;
  }

  function skrivefelt(c, t, i, vist, st) {
    const boks = el("div", { style: { marginTop: "14px" } });
    const plass = t.art === "ide" ? "Én idé per linje… eller si dem høyt med mikrofonen" : t.art === "struktur"
      ? "Skriv nedbrytningen — eller si den høyt med mikrofonen. Gjerne punkter med undernivåer, og hypotesen til slutt."
      : t.art === "forberedelse"
        ? "Notatene dine: målet med klientens egne ord, tallene som betyr mest, det som mangler, og en foreløpig hypotese."
        : "Skriv svaret ditt her — eller si det høyt med mikrofonen…";
    const felt = tekstfelt(c, i, st, plass, t.art === "struktur" || t.art === "forberedelse" ? 10 : 6);
    const ta = felt.tagName === "TEXTAREA" ? felt : felt.querySelector("textarea");
    boks.appendChild(felt);

    if (!vist) {
      const lesetid = t.art === "forberedelse";
      boks.appendChild(el(".card", { style: { marginTop: "14px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          lesetid ? el("b", "Hold deg til tiden. ") : el("b", "Skriv ferdig først. "),
          lesetid
            ? "Når lesetiden er ute, begynner intervjueren på første spørsmål, ferdig eller ikke. Notatene dine er det du har å gå på resten av casen."
            : "Fasiten under er skrevet av noen som allerede kunne svaret. Leser du den før du har forsøkt, føles den opplagt — og du lærer ingenting."),
        el("button.btn.primary", {
          onclick: () => {
            if (!ta.value.trim() && !confirm(lesetid ? "Du har ikke notert noe. Vil du starte intervjuet likevel?" : "Du har ikke skrevet noe. Vil du se fasiten likevel?")) return;
            lagreSvar(c.id, i, ta.value); avdekk(c.id, i); S.app.refresh();
          },
        }, lesetid ? "Tiden er ute — start intervjuet" : "Jeg har svart — vis fasiten")));
    }
    return boks;
  }

  function regnefelt(c, t, i, vist, st) {
    const boks = el("div", { style: { marginTop: "14px" } });
    const inn = el("input.input", {
      type: "text",
      placeholder: t.enhet ? `Svar i ${t.enhet}…` : "Svaret ditt…",
      style: { maxWidth: "260px", fontVariantNumeric: "tabular-nums" },
    });
    inn.value = st.svar || "";

    /* Tallet sjekkes først når utregningen åpnes, og da er det låst. Med en
       sjekk-knapp før det kunne du prøve deg fram til riktig tall, og fella i
       trinnet bet aldri. I rommet får du ikke vite om tallet stemmer før du har
       sagt det. */
    const dom = el("div", { style: { marginTop: "10px" } });
    if (vist) {
      inn.readOnly = true;
      const ok = riktigTall(t, inn.value);
      S.u.mount(dom, ok == null
        ? el(".chip.rose", "✗ Ingen tall å sjekke")
        : el(".chip" + (ok ? ".green" : ".rose"), ok ? "✓ Riktig" : "✗ Ikke riktig"));
    } else {
      inn.addEventListener("blur", () => lagreSvar(c.id, i, inn.value));
      dom.appendChild(el(".tiny.muted", "Tallet sjekkes når du åpner utregningen. «1,2 mrd», «450 mill», «12 %» og «minus 30» forstås."));
    }

    boks.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      inn, t.enhet ? el(".tiny.muted", t.enhet) : null));
    boks.appendChild(dom);

    if (!vist) {
      boks.appendChild(el(".card", { style: { marginTop: "14px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          el("b", "Regn det ut for hånd. "),
          "I rommet har du ikke kalkulator, bare penn og en intervjuer som hører på at du sier framgangsmåten høyt. Tren på det her også."),
        el("button.btn.primary", { onclick: () => { lagreSvar(c.id, i, inn.value); avdekk(c.id, i); S.app.refresh(); } },
          "Vis utregningen")));
    }
    return boks;
  }

  /* visKrav: kravene som lesbar liste. Av når trinnet har den strenge
     sjekklisten, som viser dem selv — og som også viser fella. */
  function fasitPanel(t, visKrav) {
    const boks = el(".sol-panel");
    const tittel = t.art === "regne" ? "Utregning" : t.art === "forberedelse" ? "Slik ser gode notater ut etter lesetiden" : "Slik ser et sterkt svar ut";
    boks.appendChild(el(".sol-h", icon("check"), el("span", tittel)));
    if (t.art === "regne" && t.svar != null) {
      boks.appendChild(el("p", { style: { margin: "0 0 10px", fontSize: "17px", fontWeight: 650 } },
        `Svar: ${norsk(t.svar)}${t.enhet ? " " + t.enhet : ""}`));
    }
    if (t.fasit) boks.appendChild(prosa(t.fasit));
    if (visKrav !== false && (t.krav || []).length) {
      boks.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Dette skiller et sterkt svar fra et middels"));
      const ul = el("ul.sol-crit");
      t.krav.forEach((k) => ul.appendChild(el("li", kravTekst(k))));
      boks.appendChild(ul);
    }
    if (t.felle && visKrav !== false) boks.appendChild(el(".explain", { style: { marginTop: "12px" } }, el("b", "Vanlig felle: "), t.felle));
    return boks;
  }

  /* ---------- streng vurdering ----------
     Å velge «Solid» etter magefølelse er for snilt. Her krysser du av hvert krav
     svaret ditt faktisk oppfylte, og nivået regnes ut:

       alle krav, ingen felle            Distinkt
       minst tre firedeler               Solid
       minst 40 prosent                  Delvis
       under det                         Bom

     To ting setter Delvis som tak uansett hvor mange krav du fikk: at du gikk i
     fella, og at tallet på et regnetrinn er feil. Det er det intervjueren
     noterer først. */
  const NIVÅFARGE = ["rose", "amber", "indigo", "green"];

  function strengScore(c, t, st) {
    const n = (t.krav || []).length;
    if (!n) return null;
    const tikk = (st.kravTikk || []).filter((x) => x < n);
    const andel = tikk.length / n;
    let s = andel >= 1 ? 3 : andel >= 0.75 ? 2 : andel >= 0.4 ? 1 : 0;
    const tak = [];
    if (st.fellen === true && s > 1) { s = 1; tak.push("Du gikk i fella, og da er Delvis taket."); }
    if (t.art === "regne" && t.svar != null && riktigTall(t, st.svar) !== true && s > 1) {
      s = 1; tak.push("Tallet ditt er feil eller mangler, og da er Delvis taket uansett hvor god framgangsmåten var.");
    }
    return { s, antall: tikk.length, n, tak };
  }
  const erStrengVurdert = (st) => Array.isArray(st.kravTikk) || typeof st.fellen === "boolean";

  function strengVurdering(c, t, i, st) {
    const boks = el(".card", { style: { marginTop: "16px" } });
    const tikk = new Set(st.kravTikk || []);
    const lagre = (endring) => {
      const ny = Object.assign({}, st, endring);
      if (!Array.isArray(ny.kravTikk)) ny.kravTikk = [...tikk];
      const r = strengScore(c, t, ny);
      S.store.setExam(stegKey(c.id, i), { kravTikk: ny.kravTikk, fellen: ny.fellen, score: r ? r.s : null });
      S.app.refresh();
    };

    boks.appendChild(el("h3", { style: { fontSize: "16px", marginBottom: "4px" } }, "Streng vurdering"));
    boks.appendChild(el("p.tiny.muted", { style: { margin: "0 0 12px" } },
      "Kryss av bare det svaret ditt faktisk inneholdt: det du skrev, eller sa høyt. «Jeg tenkte på det» teller ikke."));

    t.krav.forEach((k, n) => {
      const på = tikk.has(n);
      const krit = kravKrit(k);
      boks.appendChild(sjekkRad(på, kravTekst(k), krit ? kritNavn(krit) : null,
        () => { på ? tikk.delete(n) : tikk.add(n); lagre({ kravTikk: [...tikk].sort((a, b) => a - b) }); }));
    });

    if (t.felle) {
      boks.appendChild(el(".explain", { style: { marginTop: "12px" } }, el("b", "Vanlig felle: "), t.felle));
      boks.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "10px" } },
        el(".tiny.muted", "Gikk du i den?"),
        el("button.btn.sm" + (st.fellen === false ? ".primary" : ""), { onclick: () => lagre({ fellen: false }) }, "Nei"),
        el("button.btn.sm" + (st.fellen === true ? ".primary" : ""), { onclick: () => lagre({ fellen: true }) }, "Ja, der gikk jeg")));
    }

    const res = el("div", { style: { marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--hairline)" } });
    if (!erStrengVurdert(st)) {
      res.appendChild(el(".tiny.muted", typeof st.score === "number"
        ? `Tidligere egenvurdering: ${SKALA[st.score]}. Kryss av over for en streng vurdering.`
        : "Ikke vurdert ennå. Kryss av kravene, og svar på om du gikk i fella."));
    } else {
      const r = strengScore(c, t, st);
      res.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center" } },
        el(".chip." + NIVÅFARGE[r.s], { style: { fontWeight: 650 } }, SKALA[r.s]),
        el(".tiny", `${r.antall} av ${r.n} krav`)));
      r.tak.forEach((x) => res.appendChild(el("p.tiny", { style: { margin: "8px 0 0", color: "#b8324b" } }, x)));
      const mangler = t.krav.filter((_, n) => !tikk.has(n));
      if (mangler.length) {
        res.appendChild(el(".tiny.muted", { style: { margin: "12px 0 6px" } }, "Dette manglet i svaret ditt:"));
        const ul = el("ul.sol-crit");
        mangler.forEach((k) => ul.appendChild(el("li", kravTekst(k))));
        res.appendChild(ul);
      }
      /* Tiden er ikke med i nivået, fordi det tar lengre tid å skrive enn å si
         et svar. Men den står her, fordi den er det intervjueren merker. */
      if (st.brukt != null && t.sek && st.brukt > t.sek * 1250) {
        res.appendChild(el("p.tiny", { style: { margin: "10px 0 0" } },
          `Du brukte ${mmss(st.brukt)} mot ${mmss(t.sek * 1000)}. I rommet blir du avbrutt før du er ferdig, eller får dårligere tid på resten av casen.`));
      }
    }
    boks.appendChild(res);
    boks.appendChild(el("p.tiny.muted", { style: { margin: "12px 0 0" } },
      "Distinkt krever alle kravene og ingen felle. Solid krever minst tre firedeler, Delvis minst 40 prosent. Går du i fella, eller har feil tall, er Delvis taket."));
    return boks;
  }

  /* Én rad i en avkrysningsliste. Hele raden er knappen; sirkelen viser status.
     .check er den lille runde boksen fra studieplanen, og strukket til full
     bredde ble den en grønn ellipse. */
  function sjekkRad(på, tekst, merke, onclick) {
    return el("button.sjekk-rad" + (på ? ".på" : ""), { type: "button", "aria-pressed": String(på), onclick },
      el("span.sjekk-o", på ? "✓" : ""),
      el("span.sjekk-t", tekst, merke ? el("span.sjekk-krit", merke) : null));
  }

  /* Idémyldring vurderes ikke på skjønn, men på treff: kryss av hva du faktisk
     hadde. Det gir et ærligere tall enn en selvvurdering på tre nivåer. */
  function idéAvkryssing(c, t, i, st) {
    const tikk = new Set(st.tikk || []);
    const boks = el("div", { style: { marginTop: "16px" } });
    boks.appendChild(el(".tiny.muted", { style: { marginBottom: "8px" } }, "Kryss av det du faktisk hadde med:"));
    const teller = el(".chip.accent", `${tikk.size} av ${t.liste.length}`);
    t.liste.forEach((idé, n) => {
      const på = tikk.has(n);
      boks.appendChild(sjekkRad(på, idé, null, () => {
        på ? tikk.delete(n) : tikk.add(n);
        settTikk(c.id, i, [...tikk]);
        settScore(c.id, i, Math.min(3, Math.round((tikk.size / t.liste.length) * 3)));
        S.app.refresh();
      }));
    });
    boks.appendChild(el(".row", { style: { marginTop: "10px", alignItems: "center", gap: "8px" } },
      el(".tiny.muted", "Treff:"), teller));
    return boks;
  }

  function scoreRad(c, i, st) {
    const rad = el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "16px" } },
      el(".tiny.muted", "Hvor godt traff du?"));
    SKALA.forEach((navn, v) => {
      rad.appendChild(el("button.btn.sm" + (st.score === v ? ".primary" : ""), {
        onclick: () => { settScore(c.id, i, v); S.app.refresh(); },
      }, navn));
    });
    return rad;
  }

  function bunnRad(c, liste) {
    return el(".row", { style: { gap: "8px", marginTop: "18px" } },
      steg > 0 ? el("button.btn.ghost.sm", { onclick: () => gåTil(steg - 1) }, "← Forrige trinn") : null,
      el(".spacer"),
      steg < liste.length - 1
        ? el("button.btn.sm" + (erVist(c.id, steg) ? ".primary" : ""), { onclick: () => gåTil(steg + 1) }, "Neste trinn →")
        : erVist(c.id, steg) && !kjør(c.id).submittedAt
          ? el("button.btn.primary", { onclick: () => { fullfør(c.id); S.app.refresh(); } }, "Avslutt casen")
          : null);
  }

  function oppsummering(c) {
    const snitt = snittScore(c);
    const kort = el(".card.pad-lg", { style: { marginTop: "18px" } });
    kort.appendChild(el("h3", { style: { fontSize: "18px", marginBottom: "6px" } }, "Casen er kjørt"));
    const pct = snitt == null ? 0 : Math.round((snitt / 3) * 100);
    kort.appendChild(el(".row.wrap", { style: { gap: "18px", alignItems: "center", marginTop: "10px" } },
      S.u.ring(pct, 92, snitt == null ? "–" : snitt.toFixed(1).replace(".", ","), "av 3"),
      el("div",
        el("div", { style: { fontSize: "20px", fontWeight: 680 } }, snitt == null ? "Ikke vurdert" : SKALA[Math.round(snitt)]),
        el("p.tiny.muted", { style: { marginTop: "8px", maxWidth: "440px" } },
          "Vurderingen er din egen. Den er bare verdt noe hvis du trekker fra der strukturen ikke var skreddersydd, der du regnet uten å si framgangsmåten, eller der anbefalingen manglet et «så derfor»."))));
    if (!erEnkelt(c)) kort.appendChild(tilbakemelding(c));
    kort.appendChild(claudeRad(() => helPrompt(c), "Hele casen til Claude",
      "Kopierer alle svarene dine med fasit og krav. Claude gir en samlet dom: ville du gått videre, og hva som kostet mest."));
    if (c.bakgrunn) {
      kort.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "16px" } }, "Om denne casen"));
      kort.appendChild(prosa(c.bakgrunn, { fontSize: "14.5px" }));
    }
    if ((c.ch || []).length && S.hasModule("/curriculum")) {
      kort.appendChild(el(".tiny.muted", { style: { margin: "14px 0 8px" } }, "Kapitler denne casen bygger på"));
      kort.appendChild(el(".row.wrap", { style: { gap: "6px" } }, ...c.ch.map((n) => {
        const k = S.data.chapter(n);
        return el(".chip", { style: { cursor: "pointer" }, onclick: sh().go(`#/chapter/${n}`) }, `K${n}${k ? " · " + k.title.slice(0, 26) : ""}`);
      })));
    }
    return kort;
  }

  /* Tilbakemeldingen på hele casen, bygget av sjekklistene: nivå per trinn, treff
     per kriterium når kravene er merket med et, og de tre tingene som kostet mest.
     Tallene er dine egne avkrysninger, så de er strenge bare hvis du var det. */
  function tilbakemelding(c) {
    const boks = el("div", { style: { marginTop: "18px" } });
    const liste = trinnene(c);
    const data = liste.map((t, i) => ({ t, i, st: stegSt(c.id, i) }));

    boks.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Trinn for trinn"));
    boks.appendChild(el(".row.wrap", { style: { gap: "6px" } }, ...data.map(({ t, i, st }) => {
      const navn = t.kort || (ARTNAVN[t.art] ? ARTNAVN[t.art].kort : "Trinn");
      const s = typeof st.score === "number" ? st.score : null;
      return el(".chip" + (s == null ? ".slate" : "." + NIVÅFARGE[s]), { style: { cursor: "pointer" },
        onclick: () => gåTil(i) },
        `${i + 1} ${navn} · ${s == null ? "ikke vurdert" : SKALA[s]}`);
    })));

    const vurdert = data.filter(({ t, st }) => (t.krav || []).length && erStrengVurdert(st) && !(t.art === "ide" && (t.liste || []).length));
    if (!vurdert.length) {
      boks.appendChild(el("p.tiny.muted", { style: { margin: "10px 0 0" } },
        "Kryss av kravene i hvert trinn for å få en streng tilbakemelding på hele casen."));
      return boks;
    }

    /* Treff per kriterium, der kravene er merket med ett. */
    const krit = new Map();
    vurdert.forEach(({ t, st }) => t.krav.forEach((k, n) => {
      const nøkkel = kravKrit(k);
      if (!nøkkel) return;
      const r = krit.get(nøkkel) || { tatt: 0, alle: 0 };
      r.alle++; if ((st.kravTikk || []).includes(n)) r.tatt++;
      krit.set(nøkkel, r);
    }));
    if (krit.size) {
      const rader = [...krit].map(([k, r]) => ({ k, ...r, pct: Math.round((r.tatt / r.alle) * 100) }));
      const svakest = rader.reduce((a, b) => (b.pct < a.pct ? b : a));
      boks.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "16px" } }, "Etter kriterium"));
      rader.forEach((r) => {
        boks.appendChild(el(".row", { style: { gap: "8px", alignItems: "baseline", marginTop: "8px" } },
          el(".tiny", { style: { fontWeight: 560 } }, kritNavn(r.k)),
          r === svakest && r.pct < 100 ? el(".chip.rose", { style: { fontSize: "11px" } }, "svakest") : null,
          el(".spacer"),
          el(".tiny.muted", `${r.tatt} av ${r.alle}`)));
        boks.appendChild(el("div", { style: { marginTop: "4px" } }, S.u.bar(r.pct, { thin: true, green: r.pct === 100 })));
      });
    }

    /* De tre dyreste manglene: fra de svakeste trinnene først. */
    const mangler = [];
    [...vurdert].sort((a, b) => (a.st.score || 0) - (b.st.score || 0) || a.i - b.i).forEach(({ t, i, st }) => {
      t.krav.forEach((k, n) => { if (!(st.kravTikk || []).includes(n)) mangler.push({ i, tekst: kravTekst(k) }); });
    });
    if (mangler.length) {
      boks.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "16px" } }, "Fiks dette før neste case"));
      const ol = el("ol", { style: { margin: "0", paddingLeft: "20px" } });
      mangler.slice(0, 3).forEach((m) => ol.appendChild(el("li", { style: { margin: "4px 0", fontSize: "14.5px" } },
        el("span.tiny.muted", `Trinn ${m.i + 1}: `), m.tekst)));
      boks.appendChild(ol);
    }

    const feller = vurdert.filter(({ st }) => st.fellen === true).map(({ i }) => i + 1);
    const feilTall = vurdert.filter(({ t, st }) => t.art === "regne" && riktigTall(t, st.svar) !== true).map(({ i }) => i + 1);
    const brukt = data.reduce((a, { st }) => a + (st.brukt || 0), 0);
    const mål = data.reduce((a, { t, st }) => a + (st.brukt != null && t.sek ? t.sek * 1000 : 0), 0);
    const notater = [];
    if (feller.length) notater.push(`Du gikk i fella på trinn ${feller.join(" og ")}.`);
    if (feilTall.length) notater.push(`Feil eller manglende tall på trinn ${feilTall.join(" og ")}.`);
    if (mål && brukt > mål * 1.1) notater.push(`Du brukte ${mmss(brukt)} mot ${mmss(mål)} på trinnene du tok tiden på.`);
    notater.forEach((x) => boks.appendChild(el("p.tiny", { style: { margin: "10px 0 0" } }, x)));
    return boks;
  }

  /* ================= vurdering med Claude =================
     Avkrysningen over er bare så streng som du er. Her settes casen, svaret,
     fasiten og kravene sammen til én ferdig melding som du limer inn i Claude,
     og da er det abonnementet ditt som betaler. Appen kaller ingen API og har
     ingen nøkkel: en nøkkel i en statisk side kan leses av alle. */
  const CLAUDE_URL = "https://claude.ai/new";

  /* Fagdataene er HTML. Claude leser ren tekst bedre, og tabellene må bevares
     som rader, ellers flyter tallene i ett. */
  function ren(html) {
    if (!html) return "";
    const d = document.createElement("div");
    d.innerHTML = String(html);
    /* Kildens innrykk og linjeskift er formatering, ikke innhold. */
    const gå = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
    for (let n = gå.nextNode(); n; n = gå.nextNode()) n.nodeValue = n.nodeValue.replace(/\s+/g, " ");
    d.querySelectorAll("table").forEach((tab) => {
      tab.textContent = [...tab.querySelectorAll("tr")]
        .map((tr) => "| " + [...tr.children].map((c) => c.textContent.trim()).join(" | ") + " |").join("\n");
    });
    d.querySelectorAll("br").forEach((n) => n.replaceWith("\n"));
    d.querySelectorAll("li").forEach((li) => { li.prepend("- "); li.append("\n"); });
    d.querySelectorAll("p, h1, h2, h3, h4, table, ul, ol, div").forEach((n) => { n.prepend("\n"); n.append("\n\n"); });
    return d.textContent.replace(/[ \t]*\n[ \t]*/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  const artNavn = (t) => (ARTNAVN[t.art] || { full: "Trinn" }).full;
  const trinnNavn = (t, i) => `Trinn ${i + 1} · ${t.tittel || artNavn(t)}`;
  const sitat = (s) => (String(s || "").trim() ? '"""\n' + String(s).trim() + '\n"""' : "(tomt — jeg skrev ingenting)");

  function rolle(c) {
    /* «Generisk» er bibliotekets merkelapp for caser uten et bestemt firma. */
    const firma = c.firma && c.firma !== "Generisk" ? c.firma : null;
    return `Du er intervjueren i et caseintervju${firma ? " hos " + firma : " i et konsulentselskap"}. Jeg øver, og jeg vil ha en streng og konkret vurdering, ikke oppmuntring. Vær like streng som en intervjuer som skal velge ut én av ti.`;
  }

  function materiale(c) {
    return `## Casen: ${c.label}\n${ren(c.prompt)}`;
  }

  function spørsmålTekst(t) {
    const d = [];
    if (t.sp) d.push(ren(t.sp));
    if (t.figur) d.push("Figur/tabell:\n" + ren(t.figur));
    return d.join("\n\n") || "(ingen egen tekst — se trinnets art)";
  }

  function kravListe(t) {
    return (t.krav || []).map((k, n) => {
      const krit = kravKrit(k);
      return `${n + 1}. ${krit ? "[" + kritNavn(krit) + "] " : ""}${kravTekst(k)}`;
    }).join("\n");
  }

  /* Intervjuerens ark for ett trinn: fasit, krav, fella og idélisten. */
  function ark(t) {
    const d = [];
    if (t.art === "regne" && t.svar != null) d.push(`Riktig svar: ${norsk(t.svar)}${t.enhet ? " " + t.enhet : ""}`);
    if (t.fasit) d.push("Fasit:\n" + ren(t.fasit));
    if ((t.krav || []).length) d.push("Krav:\n" + kravListe(t));
    if ((t.liste || []).length) d.push("Idélisten:\n" + t.liste.map((x) => "- " + ren(x)).join("\n"));
    if (t.felle) d.push("Vanlig felle: " + ren(t.felle));
    return d.join("\n\n");
  }

  const NIVÅREGEL = "Nivået er Bom, Delvis, Solid eller Distinkt. Distinkt krever alle kravene og ingen felle. Solid krever minst tre firedeler av kravene, Delvis minst 40 prosent, under det er det Bom. Gikk jeg i fella, eller er tallet feil på et regnetrinn, er Delvis taket.";

  function trinnPrompt(c, i) {
    const liste = trinnene(c), t = liste[i], st = stegSt(c.id, i);
    const d = [rolle(c), materiale(c)];

    /* Det kandidaten allerede har fått: spørsmålene og figurene før dette
       trinnet, men ikke fasitene deres. */
    if (i > 0) d.push("## Det intervjuet har vært innom før dette trinnet\n" +
      liste.slice(0, i).map((f, n) => `### ${trinnNavn(f, n)}\n${spørsmålTekst(f)}`).join("\n\n"));

    let hode = `## Trinnet som skal vurderes: ${trinnNavn(t, i)}\n${spørsmålTekst(t)}`;
    if (t.sek) hode += `\n\nMåltid: ${mmss(t.sek * 1000)}.` + (st.brukt >= 5000 ? ` Jeg brukte ${mmss(st.brukt)}.` : "");
    d.push(hode);

    let svar = "## Svaret mitt\n" + sitat(st.svar);
    if (t.art === "regne" && t.svar != null) {
      const ok = riktigTall(t, st.svar);
      svar += `\n\nAppen leste tallet mitt som ${ok == null ? "manglende" : ok ? "riktig" : "feil"}. Framgangsmåten sa jeg høyt og står ikke her; vurder tallet og det svaret viser.`;
    }
    d.push(svar);

    d.push("## Intervjuerens ark (bruk det, men vær ikke snillere enn det)\n" + (ark(t) || "(ingen fasit til dette trinnet)"));

    const harKrav = (t.krav || []).length > 0;
    d.push(`## Slik vurderer du
- Vurder bare det som faktisk står i svaret. Det som er underforstått, eller som jeg sikkert tenkte, teller ikke.
- Svaret kan være diktert, så se bort fra stavefeil og tegnsetting.
- ${harKrav ? "Gå gjennom kravene ett for ett: oppfylt eller ikke, med et kort sitat fra svaret som bevis. Halvveis er ikke oppfylt." : "Sammenlign med fasiten og si hva som mangler."}
- ${NIVÅREGEL}
- Ikke gjenta fasiten. Jeg har lest den.

## Svar kort, på norsk, i denne formen
1. **Nivå:** én linje${harKrav ? " med nivået og hvor mange krav av hvor mange" : ""}.
${harKrav ? "2. **Krav for krav:** ✓ eller ✗, og sitatet eller hva som manglet.\n" : ""}${harKrav ? "3" : "2"}. **Det viktigste å endre:** én ting, konkret, som ville løftet svaret ett nivå.
${harKrav ? "4" : "3"}. **Slik kunne det lydt:** de to første setningene av mitt svar, skrevet om slik en sterk kandidat ville sagt dem.
${harKrav ? "5" : "4"}. **Oppfølgingen:** spørsmålet intervjueren ville stilt nå. Jeg svarer i neste melding, og da vurderer du det like strengt.${harKrav ? "\n6. Siste linje, nøyaktig slik: «Kryss av: 1, 3, 4» med numrene på kravene jeg oppfylte, eller «Kryss av: ingen»." : ""}`);
    return d.join("\n\n");
  }

  /* Hele casen på én gang, for sluttvurderingen etter siste trinn. */
  function helPrompt(c) {
    const liste = trinnene(c);
    const d = [rolle(c), materiale(c)];
    if (erEnkelt(c)) {
      d.push("## Svaret mitt\n" + sitat(enkeltSt(c.id).svar));
      d.push("## Intervjuerens ark\n" + liste.map((t, i) => `### ${trinnNavn(t, i)}\n${ark(t)}`).join("\n\n"));
    } else {
      d.push("## Trinnene, med mine svar og intervjuerens ark\n" + liste.map((t, i) => {
        const st = stegSt(c.id, i);
        return `### ${trinnNavn(t, i)}\n${spørsmålTekst(t)}\n\nMitt svar:\n${sitat(st.svar)}\n\n${ark(t)}`;
      }).join("\n\n---\n\n"));
    }
    /* Kriteriene bare når casen selv er merket med dem, ellers hører de til
       et annet firma. */
    const nøkler = [...new Set(liste.flatMap((t) => (t.krav || []).map(kravKrit).filter(Boolean)))];
    const krit = nøkler.length ? nøkler.map(kritNavn).join(", ") : "struktur, tall, kommunikasjon og forretningsforståelse";
    const enkelt = erEnkelt(c);
    d.push(`## Slik vurderer du
- Vurder bare det som faktisk står i ${enkelt ? "svaret" : "svarene"}. Det som er underforstått, teller ikke. ${enkelt ? "Svaret" : "Svarene"} kan være diktert, så se bort fra stavefeil.
- ${enkelt ? "I en estimeringscase er det oppsettet og forutsetningene som vurderes, ikke at tallet treffer fasiten. Har jeg bare skrevet et tall uten oppsett, er det det du vurderer, og da er Delvis taket." : NIVÅREGEL}
- Se etter mønstre, ikke bare enkeltfeil.

## Svar kort, på norsk, i denne formen
1. **Dommen:** ville du sendt meg videre til neste runde? Ja, nei eller på vippen, og hvorfor i to setninger.
${enkelt
  ? "2. **Oppsettet:** hva som holdt og hva som manglet i nedbrytningen og forutsetningene, sammenlignet med intervjuerens ark.\n3. **Tallet:** er det innenfor et rimelig spenn, og hvilken forutsetning flyttet det mest?"
  : "2. **Trinn for trinn:** nivået på hvert trinn, én linje hver.\n3. **Etter kriterium:** " + krit + ". Sterk, middels eller svak, med ett bevis fra svarene for hvert."}
4. **De tre tingene som kostet mest**, i rekkefølge, og hva jeg skal gjøre annerledes i neste case.
5. **Slik kunne det lydt:** ${enkelt ? "oppsettet slik en sterk kandidat ville sagt det høyt, på 30 sekunder." : "sluttanbefalingen slik en sterk kandidat ville sagt den, på 30 sekunder."}`);
    return d.join("\n\n");
  }

  function claudeRad(lagTekst, knappTekst, forklaring) {
    return el(".row.wrap", { style: { gap: "8px", alignItems: "center", marginTop: "16px" } },
      el("button.btn.sm.primary", { type: "button", onclick: async () => {
        const ok = await S.u.tilUtklipp(lagTekst());
        S.u.toast(ok ? "Kopiert — lim det inn i Claude" : "Fikk ikke kopiert. Prøv igjen, eller i en annen nettleser.");
      } }, knappTekst),
      el("a.btn.sm.ghost", { href: CLAUDE_URL, target: "_blank", rel: "noopener" }, "Åpne Claude ↗"),
      el("p.tiny.muted", { style: { margin: "4px 0 0", flexBasis: "100%" } }, forklaring));
  }

  /* ================= inngang ================= */
  function render() {
    stopp();
    const c = åpen ? caseById(åpen) : null;
    if (!c) { åpen = null; return renderListe(); }
    if (!stegStart) stegStart = S.u.nowTs();
    return renderCase(c);
  }

  /* Merke i navigasjonen: caser som er påbegynt, men ikke ferdigkjørt. */
  function activeCount() {
    return CASES().filter((c) => { const r = kjør(c.id); return r.startedAt && !r.submittedAt && !erFerdig(c); }).length;
  }

  /* Fremdriftsvisningen spør etter dette — casetrening er arbeid som skal telles. */
  function stats() {
    const alle = CASES();
    const kjørt = alle.filter((c) => erFerdig(c));
    const snitt = kjørt.map((c) => snittScore(c)).filter((x) => x != null);
    return {
      kjørt: kjørt.length, totalt: alle.length,
      snitt: snitt.length ? snitt.reduce((a, b) => a + b, 0) / snitt.length : null,
      skala: SKALA,
    };
  }

  S.views.caser = { render, activeCount, stats };
})(window.EDU);
