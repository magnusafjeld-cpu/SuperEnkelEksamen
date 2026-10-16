/* ================ EKSAMENSTRENING — mange spørsmål i eksamensformat ================
   En stor bank med flervalgsspørsmål i samme form og vanskelighet som eksamen:
   fire alternativer, ett riktig, 3 poeng for rett, −1 for feil og 0 for å stå
   over. Du velger ett eller flere temaer og antall spørsmål, og spørsmålene
   trekkes tilfeldig fra utvalget.

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

   Data: EDU_DATA.trening = { temaer: [{ id, navn, kort, vekt, kap, kjerne }], sporsmal: [
           { id, tema, fam?, type, q, options[4], answer, traps[4], kort, full,
             hint?: [tema, regel], hjelp }] }
   Bygget av tools/bygg-trening.py. Fila er stor, så faget kan laste den først
   når modulen åpnes: manifest.lazy = { "/trening": ["fag/<fag>/trening.js"] }.

   Lagring (state.exams):
     "tr:<id>"       { n, r, s, t, h }  forsøk, riktige, siste (1 rett, 0 feil, −1 stod over),
                     tid, og h = trinnene av hjelpen som var åpne sist (0–3)
     "trening:okt"   { ids, svar: { id: indeks | −1 }, hjelp: { id: trinn }, temaer, modus,
                       igjen, forsok: { id: [gale valg] }, losst: { id: true }, gitt: { id: true },
                       start, slutt }
                     svar er alltid første svar. forsok, losst og gitt gjelder bare «Prøv igjen».
     "trening:valg"  { temaer, antall, modus, feil }  det du valgte sist
     "trm:<id>"      { m: 1 | 0, t }  merket «Øv mer på denne». Egen nøkkel, så et merket
                     spørsmål ikke teller som sett. Å fjerne merket skriver m: 0 i stedet
                     for å slette, ellers ville synken hentet det tilbake fra den andre enheten.
   Én nøkkel per spørsmål, så sky-synken slår sammen to enheter per spørsmål.
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

  const RETT = 3, FEIL = -1;
  const BLANK = -1;
  const ANTALL = [10, 20, 30, 50];
  const MODI = [["nye", "Nye først"], ["feil", "Bare de jeg bommet på"], ["merket", "Bare merkede"], ["tilfeldig", "Helt tilfeldig"]];
  const FEILVALG = [["fasit", "Vis fasiten"], ["igjen", "Prøv igjen først"]];

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
  const valg = () => Object.assign({ temaer: [], antall: 20, modus: "nye", feil: "fasit" }, exams()["trening:valg"] || {});
  function settValg(patch) { S.store.setExam("trening:valg", patch); }
  function lagreØkt(o) { exams()["trening:okt"] = o; S.store.emit(); }
  function forkastØkt() { delete exams()["trening:okt"]; S.store.emit(); }

  /* Et svar låses, som på eksamen. Det siste svaret kan likevel angres, for et
     bomtrykk på telefonen skal ikke telle; da settes også loggen tilbake. */
  /* Hjelpen i trinn: tema, regel og fremgangsmåten. Eldre økter lagret true,
     som var hele fremgangsmåten. */
  const hjelpeTrinn = (sp) => [...(sp.hint || []), sp.hjelp].filter(Boolean);
  function hjelpNivå(o, id) { const v = ((o && o.hjelp) || {})[id]; return v === true ? 3 : v || 0; }

  function registrer(sp, i) {
    const o = økt();
    if (!o || o.svar[sp.id] != null) return;
    const før = logg(sp.id);
    const svar = Object.assign({}, o.svar, { [sp.id]: i });
    lagreØkt(Object.assign({}, o, { svar, angre: { id: sp.id, logg: før ? Object.assign({}, før) : null } }));
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
    lagreØkt(Object.assign({}, o, { svar, angre: null, forsok: uten(o.forsok), losst: uten(o.losst), gitt: uten(o.gitt) }));
  }

  const poengFor = (sp, v) => v == null || v === BLANK ? 0 : v === sp.answer ? RETT : FEIL;
  const fmt = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n);

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

  function start(temaIds, antall, modus, faste) {
    let ids;
    if (faste) ids = stokk(faste);
    else {
      const f = fordel(temaIds, antall, modus);
      ids = stokk(Object.entries(f).flatMap(([id, n]) => velgFraTema(id, n, modus).map((sp) => sp.id)));
    }
    if (!ids.length) { S.u.toast("Ingen spørsmål i dette utvalget"); return; }
    lagreØkt({ ids, svar: {}, temaer: temaIds, modus, igjen: valg().feil === "igjen", start: S.u.nowTs(), slutt: null, pos: 0 });
    S.app.refresh(); window.scrollTo({ top: 0 });
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
    let antall = v.antall, modus = v.modus, feilvalg = v.feil;

    const totalt = ALLE().length;
    const sett = ALLE().filter((s) => logg(s.id)).length;
    wrap.appendChild(sh().pageHead("Eksamenstrening", `${totalt} spørsmål i eksamensformat`,
      "Velg temaer og antall. Spørsmålene trekkes tilfeldig. Du får fasiten med en gang: først kort, så en full gjennomgang hvis du vil. 3 poeng for rett, −1 for feil og 0 for å stå over, som på eksamen."));

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

    const kort = el(".card.pad-lg");
    const oppdater = () => { settValg({ temaer, antall, modus, feil: feilvalg }); tegn(); };

    const temaBoks = el("div");
    const antallBoks = el("div");
    const modusBoks = el("div");
    const feilBoks = el("div");
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
          feilvalg === "igjen" ? "Du får vite hvorfor akkurat det alternativet frister, men ikke hva som er riktig. Så prøver du på nytt. Poengene teller første svar."
            : "Fasiten og forklaringen kommer med en gang."));

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
    kort.appendChild(el(".row.wrap", { style: { gap: "28px", marginTop: "8px" } }, antallBoks, modusBoks, feilBoks));
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

  function runde() {
    const o = økt();
    const { liste, pos, sp } = aktivtSpørsmål(o);
    if (!sp) { forkastØkt(); return oppsett(); }
    const wrap = el(".fade-in");
    const svar = o.svar[sp.id];
    const åpen = erÅpen(o, sp);
    const igjen = prøverIgjen(o, sp);
    const prøvd = igjen ? [svar].concat((o.forsok || {})[sp.id] || []) : [];
    const poeng = liste.reduce((a, s) => a + poengFor(s, o.svar[s.id]), 0);
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
      el(".chip" + (poeng > 0 ? ".green" : poeng < 0 ? ".rose" : ""), `${fmt(poeng)} poeng`)));

    kortEl.appendChild(el(".tr-stem", prosa(sp.q)));

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

    /* «Prøv igjen»: fella for det siste gale valget, uten fasiten. */
    if (igjen) {
      const sist = prøvd[prøvd.length - 1];
      kortEl.appendChild(el(".tr-igjen",
        el(".tr-igjen-hode", prøvd.length === 1 ? `Ikke riktig · ${fmt(FEIL)} poeng` : `Ikke riktig denne gangen heller · forsøk ${prøvd.length}`),
        sp.traps && sp.traps[sist] ? prosa(String(sp.traps[sist])) : null,
        el("p.tiny.muted", { style: { margin: "6px 0 0" } }, "Prøv et annet alternativ. Poengene teller første svar.")));
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
      kortEl.appendChild(el(".row.wrap", { style: { marginTop: "6px", gap: "10px", alignItems: "center" } },
        el("button.btn.ghost.sm", { onclick: () => { registrer(sp, BLANK); S.app.refresh(); } }, "Stå over"),
        hjelpKnapp,
        el("span.tiny.muted", "0 poeng, men ingen minus. Riktig valg når du ikke kan utelukke minst ett alternativ.")));
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
    wrap.appendChild(el("p.tiny.muted.tr-taster", "Tastatur: A–D svarer, H gir et trinn hjelp, S står over, M merker for øving, F åpner gjennomgangen, V gir en ny variant, Enter går videre."));
    return wrap;
  }

  function fasit(sp, svar) {
    const p = poengFor(sp, svar);
    const boks = el(".tr-fasit");
    const blank = svar === BLANK;
    const o = økt();
    const forsøk = 1 + (((o && o.forsok) || {})[sp.id] || []).length;
    const løst = !!((o && o.losst) || {})[sp.id];
    boks.appendChild(el(".row", { style: { alignItems: "center", gap: "10px" } },
      el(".tr-resultat" + (blank ? ".blank" : p > 0 ? ".rett" : ".galt"),
        blank ? "Stod over · 0 poeng" : p > 0 ? `Riktig · +${RETT} poeng`
          : løst ? `Feil første gang · −${Math.abs(FEIL)} poeng · riktig på forsøk ${forsøk + 1}`
            : `Feil · −${Math.abs(FEIL)} poeng`),
      el(".spacer"),
      o && o.angre && o.angre.id === sp.id
        ? el("button.btn.ghost.sm", { title: "For bomtrykk. Har du lest fasiten, måler et nytt forsøk ingenting.", onclick: () => { angre(sp); S.app.refresh(); } }, "Angre svaret")
        : null));
    boks.appendChild(el(".explain", prosa(sp.kort)));

    const full = el(".tr-full", { hidden: !visFull });
    full.appendChild(prosa(sp.full));
    const feller = (sp.traps || []).map((t, i) => t ? { i, t } : null).filter(Boolean);
    if (feller.length) {
      full.appendChild(el(".tr-fellehode", "Hva de gale alternativene er laget av"));
      const ul = el("ul.tr-feller");
      const dine = new Set([svar].concat(((o && o.forsok) || {})[sp.id] || []));
      feller.forEach((f) => ul.appendChild(el("li" + (dine.has(f.i) ? ".ditt" : ""),
        el("b", String.fromCharCode(65 + f.i) + (f.i === svar ? " (ditt svar): " : dine.has(f.i) ? " (prøvd): " : ": ")), frag(String(f.t)))));
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
    const poeng = rett * RETT + galt * FEIL;
    const maks = besvart * RETT;
    const pct = maks ? Math.max(0, Math.round(100 * poeng / maks)) : 0;

    wrap.appendChild(sh().pageHead("Eksamenstrening", "Runden er ferdig",
      ubesvart ? `Du avsluttet med ${ubesvart} ubesvarte. De er holdt utenfor poengene.` : null));
    const kort = el(".card.pad-lg");
    kort.appendChild(el(".row.wrap", { style: { gap: "22px", alignItems: "center" } },
      S.u.ring(pct, 120, `${poeng}`, `av ${maks}`),
      el("div",
        el("div", { style: { fontSize: "20px", fontWeight: 680 } }, `${rett} riktige · ${galt} feil · ${blank} stod over`),
        el("p.tiny.muted", { style: { margin: "6px 0 0", maxWidth: "440px" } },
          `Med +3/−1/0 ble det ${poeng} av ${maks} poeng (${pct} %). Uten minuspoeng hadde det vært ${rett * RETT}.`
          + ` Riktig på første forsøk uten hjelp: ${førsteGang} av ${besvart}.`
          + (senere ? ` ${senere} fikk du riktig på et senere forsøk.` : "")
          + (medHjelp ? ` ${medHjelp} av de riktige var med hjelp. De kommer tilbake under «Nye først».` : "")
          + (galt && blank === 0 ? " Du stod aldri over. Svar bare når du kan utelukke minst ett alternativ." : "")))));

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
      el("button.btn.primary", { onclick: () => start(o.temaer, liste.length, o.modus) }, "Ny runde"),
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
        v != null && v !== BLANK && v !== s.answer ? el("span", { style: { color: "var(--rose)" } }, " · ditt svar: ", frag(String(s.options[v]))) : null));
      innhold.appendChild(el(".explain", prosa(s.kort)));
      innhold.appendChild(el("div", { style: { marginTop: "8px" } }, merkKnapp(s)));
      innhold.appendChild(el("button.btn.ghost.sm", { style: { marginTop: "8px" }, onclick: () => { const ny = Object.assign({}, o, { slutt: null, pos: i }); visFull = true; lagreØkt(ny); S.app.refresh(); window.scrollTo({ top: 0 }); } }, "Åpne med full gjennomgang"));
      d.appendChild(innhold);
      listeEl.appendChild(d);
    });
    wrap.appendChild(listeEl);
    return wrap;
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
      if (!åpen && i > -1 && i < sp.options.length) { e.preventDefault(); velg(sp, i); S.app.refresh(); return; }
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
  function render() {
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

  S.views.trening = { render, finnes, dashbordkort };
})(window.EDU);
