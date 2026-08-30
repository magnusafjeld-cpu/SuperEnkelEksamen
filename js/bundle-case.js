/* ===================== CASETRENING — én case, trinn for trinn =====================
   Et caseintervju er en samtale, ikke et oppgavesett. Derfor kan det ikke kjøres
   som eksamenssettene: rekkefølgen er poenget, og hvert trinn må være låst til du
   selv har forsøkt. Leser du intervjuerens struktur før du har skrevet din egen,
   har du ikke trent på noe som helst — du har lest en fasit.

   Modulen kjører derfor casen som en sekvens av trinn. Hvert trinn har en art som
   bestemmer hvordan det spilles:

     oppklaring   hvilke spørsmål ville du stilt før du begynner?
     struktur     skriv din egen nedbrytning før intervjuerens vises
     exhibit      les figuren og si hva den betyr
     regne        regn på papir, skriv tallet — det sjekkes automatisk
     ide          idémyldring mot klokka, deretter kryss av hva du fikk med
     syntese      anbefalingen, topp-ned, på tid

   Fremdrift lagres i state.exams under "case:<id>:run" og "case:<id>:t<n>".
   Den bøtta er generisk og synkes allerede, så modulen trenger ingen migrering. */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon, frag } = S.u;
  const sh = () => S.views.shared;
  const CASES = () => window.EDU_DATA.cases || [];

  /* Skalaen er konsulentbransjens egen, ikke poeng. «Bestått» og «distinkt» er
     to forskjellige ting, og det er nettopp det skillet treningen handler om. */
  const SKALA = ["Bom", "Delvis", "Solid", "Distinkt"];
  const MAKS_SVAR = 2000;   // svarene ligger i fremdriften som synkes — hold dem korte

  /* ---------- lokal tilstand (hvor du er, ikke hva du har gjort) ---------- */
  let åpen = null;          // caseId, eller null for biblioteket
  let steg = 0;
  let ticker = null;
  let stegStart = 0;        // når inneværende trinn ble åpnet — bare en treningsklokke
  let filtre = { type: "alle", nivå: "alle", firma: "alle" };

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
    trinnene(c || {}).forEach((_, i) => delete st.exams[stegKey(id, i)]);
    S.store.emit();
  }
  /* Lagring skjer ved blur og ved avdekking, aldri per tastetrykk: en refresh
     midt i skrivingen ville tatt både markøren og halve setningen. */
  function lagreSvar(id, i, tekst) { S.store.setExam(stegKey(id, i), { svar: String(tekst || "").slice(0, MAKS_SVAR) }); }
  function avdekk(id, i) { S.store.setExam(stegKey(id, i), { vist: true }); }
  function settScore(id, i, s) { S.store.setExam(stegKey(id, i), { score: s }); }
  function settTikk(id, i, liste) { S.store.setExam(stegKey(id, i), { tikk: liste }); }

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
  const SUFFIKS = [[/mrd|milliard/i, 1e9], [/mill|million/i, 1e6], [/\btusen\b/i, 1e3]];
  const ENHETSKALA = [[/milliard/i, 1e9], [/million/i, 1e6], [/tusen/i, 1e3]];

  function skala(tekst, tabell) {
    for (const [re, mult] of tabell) if (re.test(String(tekst || ""))) return mult;
    return null;
  }
  function parseTall(s) {
    const t = String(s == null ? "" : s).replace(/[\s ]/g, "").replace(/%/g, "").replace(",", ".");
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
    wrap.appendChild(sh().pageHead("Casetrening", `${alle.length} caser`,
      "Hver case spilles trinn for trinn, slik den ville gått i rommet. Du skriver ditt eget svar før intervjuerens vises — det er hele poenget. Ta notater på papir, og si resonnementet høyt mens du jobber."));

    if (!alle.length) { wrap.appendChild(sh().empty("🧩", "Ingen caser ennå", "Faget har ikke lagt inn noe i EDU_DATA.cases.")); return wrap; }

    wrap.appendChild(filterrad(alle));
    const vist = alle.filter(passerer);
    if (!vist.length) { wrap.appendChild(sh().empty("🔍", "Ingen caser med disse filtrene", "Løsne på et av dem.")); return wrap; }

    const liste = el(".stack", { style: { gap: "14px" } });
    vist.forEach((c) => liste.appendChild(caseKort(c)));
    wrap.appendChild(liste);
    return wrap;
  }

  const passerer = (c) =>
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
    const antall = trinnene(c).length;
    const gjort = trinnene(c).filter((_, i) => erVist(c.id, i)).length;
    const ferdig = !!r.submittedAt || (antall && gjort === antall);

    const kort = el(".card.pad-lg");
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "19px" } }, c.label),
      el(".spacer"),
      ferdig ? el(".chip.green", el(".dot"), "Kjørt") : r.startedAt ? el(".chip.amber", el(".dot"), `${gjort}/${antall}`) : null));

    kort.appendChild(el(".row.wrap", { style: { gap: "8px", margin: "8px 0 12px" } },
      c.minutter ? el(".chip", icon("clock"), `${c.minutter} min`) : null,
      c.type ? el(".chip.indigo", c.type) : null,
      c.nivå ? el(".chip.slate", c.nivå) : null,
      c.firma ? el(".chip.teal", c.firma) : null,
      c.stil ? el(".chip.slate", { style: { fontSize: "11px" } }, c.stil) : null));

    if (c.blurb) kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } }, c.blurb));

    if (gjort) {
      const snitt = snittScore(c);
      kort.appendChild(el(".explain", { style: { marginBottom: "14px" } },
        el("b", snitt == null ? "Påbegynt" : `Din vurdering: ${snitt.toFixed(1).replace(".", ",")} av 3`),
        snitt == null ? "" : ` — ${SKALA[Math.round(snitt)]} i snitt over ${gjort} trinn.`));
    }

    kort.appendChild(el(".row.wrap", { style: { gap: "8px" } },
      el("button.btn.primary", { onclick: () => { åpen = c.id; steg = førsteUgjorte(c); stegStart = S.u.nowTs(); if (!kjør(c.id).startedAt) start(c.id); S.app.refresh(); } },
        r.startedAt ? "Fortsett casen" : "Start casen"),
      r.startedAt ? el("button.btn.ghost.sm", { onclick: () => { if (confirm("Nullstille denne casen? Alle svarene dine slettes.")) { nullstill(c.id); S.app.refresh(); } } }, "Nullstill") : null));
    return kort;
  }

  function førsteUgjorte(c) {
    const i = trinnene(c).findIndex((_, n) => !erVist(c.id, n));
    return i === -1 ? 0 : i;
  }
  function snittScore(c) {
    const s = trinnene(c).map((_, i) => stegSt(c.id, i).score).filter((x) => typeof x === "number");
    return s.length ? s.reduce((a, b) => a + b, 0) / s.length : null;
  }

  /* ================= selve casen ================= */
  function renderCase(c) {
    stopp();
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
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "20px" } }, c.label),
      el(".spacer"),
      c.type ? el(".chip.indigo", c.type) : null));
    if (c.prompt) kort.appendChild(el(".prose", { style: { fontSize: "15.5px" } }, frag(c.prompt)));
    return kort;
  }

  function trinnRad(c, liste) {
    const rad = el(".row.wrap", { style: { gap: "6px", marginBottom: "16px" } });
    liste.forEach((t, i) => {
      const vist = erVist(c.id, i);
      const cls = i === steg ? "button.chip.sett-nav.on" : vist ? "button.chip.green.sett-nav" : "button.chip.sett-nav";
      rad.appendChild(el(cls, { onclick: () => { steg = i; stegStart = S.u.nowTs(); S.app.refresh(); } },
        ARTNAVN[t.art] ? ARTNAVN[t.art].kort : String(i + 1)));
    });
    return rad;
  }

  const ARTNAVN = {
    oppklaring: { kort: "Spørsmål", full: "Oppklarende spørsmål", ledd: "Hva ville du spurt om før du begynner?" },
    struktur: { kort: "Struktur", full: "Struktur", ledd: "Bryt problemet ned. Skriv nedbrytningen din før du ser intervjuerens." },
    exhibit: { kort: "Figur", full: "Figurtolkning", ledd: "Hva ser du, og hva betyr det for casen?" },
    regne: { kort: "Regning", full: "Regnestykke", ledd: "Regn på papir. Skriv svaret her, så sjekkes det." },
    ide: { kort: "Idéer", full: "Idémyldring", ledd: "List så mange du klarer. Kvantitet først, så sorterer du." },
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
      t.sek ? stegKlokke(t) : null));

    kort.appendChild(el("p.tiny.muted", { style: { margin: "0 0 14px" } }, t.ledd || navn.ledd));
    if (t.sp) kort.appendChild(el(".prose", { style: { fontSize: "15.5px" } }, frag(t.sp)));
    if (t.figur) kort.appendChild(el(".card.flat", { style: { margin: "14px 0", overflowX: "auto" } }, el(".prose", frag(t.figur))));

    kort.appendChild(t.art === "regne" ? regnefelt(c, t, i, vist, st) : skrivefelt(c, t, i, vist, st));

    if (vist) {
      kort.appendChild(fasitPanel(t));
      if (t.art === "ide" && (t.liste || []).length) kort.appendChild(idéAvkryssing(c, t, i, st));
      else kort.appendChild(scoreRad(c, i, st));
    }
    return kort;
  }

  /* Klokka teller oppover mot måltiden og blir rød når du går over. Den stopper
     ingenting — den er der for å bygge tidsfølelse, som er halve ferdigheten. */
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
    return ta;
  }

  function skrivefelt(c, t, i, vist, st) {
    const boks = el("div", { style: { marginTop: "14px" } });
    const plass = t.art === "ide" ? "Én idé per linje…" : t.art === "struktur"
      ? "Skriv nedbrytningen. Gjerne som punkter med undernivåer — og si hypotesen din til slutt."
      : "Skriv svaret ditt her…";
    const ta = tekstfelt(c, i, st, plass, t.art === "struktur" ? 10 : 6);
    boks.appendChild(ta);

    if (!vist) {
      boks.appendChild(el(".card", { style: { marginTop: "14px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
        el("p", { style: { margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.55 } },
          el("b", "Skriv ferdig først. "),
          "Fasiten under er skrevet av noen som allerede kunne svaret. Leser du den før du har forsøkt, føles den opplagt — og du lærer ingenting."),
        el("button.btn.primary", {
          onclick: () => {
            if (!ta.value.trim() && !confirm("Du har ikke skrevet noe. Vil du se fasiten likevel?")) return;
            lagreSvar(c.id, i, ta.value); avdekk(c.id, i); S.app.refresh();
          },
        }, "Jeg har svart — vis fasiten")));
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

    const dom = el("div", { style: { marginTop: "10px" } });
    function vurder(lagre) {
      const ok = riktigTall(t, inn.value);
      S.u.mount(dom, ok == null
        ? el(".tiny.muted", "Skriv et tall — «1,2 mrd», «450 mill» og «12 %» forstås også.")
        : el(".chip" + (ok ? ".green" : ".rose"), ok ? "✓ Riktig" : "✗ Ikke riktig ennå"));
      if (lagre) lagreSvar(c.id, i, inn.value);
      return ok;
    }
    inn.addEventListener("blur", () => vurder(true));

    boks.appendChild(el(".row.wrap", { style: { gap: "8px", alignItems: "center" } },
      inn, t.enhet ? el(".tiny.muted", t.enhet) : null,
      el("button.btn.sm", { onclick: () => vurder(true) }, "Sjekk")));
    boks.appendChild(dom);
    if (st.svar) vurder(false);

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

  function fasitPanel(t) {
    const boks = el(".sol-panel");
    boks.appendChild(el(".sol-h", icon("check"), el("span", t.art === "regne" ? "Utregning" : "Slik ser et sterkt svar ut")));
    if (t.art === "regne" && t.svar != null) {
      boks.appendChild(el("p", { style: { margin: "0 0 10px", fontSize: "17px", fontWeight: 650 } },
        `Svar: ${norsk(t.svar)}${t.enhet ? " " + t.enhet : ""}`));
    }
    if (t.fasit) boks.appendChild(el(".prose", frag(t.fasit)));
    if ((t.krav || []).length) {
      boks.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Dette skiller et sterkt svar fra et middels"));
      const ul = el("ul.sol-crit");
      t.krav.forEach((k) => ul.appendChild(el("li", k)));
      boks.appendChild(ul);
    }
    if (t.felle) boks.appendChild(el(".explain", { style: { marginTop: "12px" } }, el("b", "Vanlig felle: "), t.felle));
    return boks;
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
      boks.appendChild(el("button.check" + (på ? ".done" : ""), {
        style: { display: "block", width: "100%", textAlign: "left", marginBottom: "6px", cursor: "pointer" },
        onclick: () => {
          på ? tikk.delete(n) : tikk.add(n);
          settTikk(c.id, i, [...tikk]);
          settScore(c.id, i, Math.min(3, Math.round((tikk.size / t.liste.length) * 3)));
          S.app.refresh();
        },
      }, (på ? "✓ " : "○ ") + idé));
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
      steg > 0 ? el("button.btn.ghost.sm", { onclick: () => { steg--; stegStart = S.u.nowTs(); S.app.refresh(); } }, "← Forrige trinn") : null,
      el(".spacer"),
      steg < liste.length - 1
        ? el("button.btn.sm" + (erVist(c.id, steg) ? ".primary" : ""), { onclick: () => { steg++; stegStart = S.u.nowTs(); S.app.refresh(); } }, "Neste trinn →")
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
    if (c.bakgrunn) {
      kort.appendChild(el(".nav-section", { style: { paddingLeft: 0, marginTop: "16px" } }, "Om denne casen"));
      kort.appendChild(el(".prose", { style: { fontSize: "14.5px" } }, frag(c.bakgrunn)));
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

  S.views.caser = { render, activeCount };
})(window.EDU);
