/* ===================== SJEKKLISTE =====================
   /sjekkliste: alt som kan komme på eksamen, punkt for punkt, for å finne
   hullene når du allerede får nesten alt riktig. Hvert punkt er én ferdighet
   («Regne ut …») med et kort svar, og «Mer» gir forklaring, talleksempel,
   felle, kilde og hvilke eksamener punktet er testet i. Du merker ✓ (kan) eller
   ? (usikker). Testmodus skjuler svaret til du har svart selv, «Tilfeldig
   punkt» hopper til et du ikke har merket, og «Usikre punkter» gir en liste du
   kan lime inn hos Claude.

   Data (fagets, lastes først når modulen åpnes: manifest.lazy["/sjekkliste"]):
     EDU_DATA.sjekkliste        [{ id, forelesning, tittel, eksamensvekt 1–5,
                                   viktigst: [html], kildenotat?, punkter: [{ id,
                                   nivaa: kjerne|viktig|detalj, kan, kort (html),
                                   mer (html), kilder: [], eksamen: [] }] }]
     EDU_DATA.sjekklisteTillegg  ekstra seksjoner fra en privat utvidelse
     EDU_DATA.sjekklisteInfo     { eksamen: "ÅÅÅÅ-MM-DD", intro }
   Seksjonene vises i den rekkefølgen dataene har dem, gruppert på forelesning.

   Lagring: state.exams["skl:<punkt-id>"] = { v: "kan"|"usikker"|"", t }, og
   visningsvalgene i state.exams["skl:valg"]. exams flettes per nøkkel ved synk,
   så telefon og PC kan merke hver sine punkter. Å fjerne et merke lagres som
   tomt merke, så det også synkes.
   ============================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el } = S.u;
  const NIV = { kjerne: "Kjerne", viktig: "Viktig", detalj: "Detalj" };
  const D = () => window.EDU_DATA || {};
  const data = () => (D().sjekkliste || []).concat(D().sjekklisteTillegg || []);

  /* ---------- lasting ---------- */
  let lasting = null, lastefeil = null;
  function lazyListe() { return (((window.EDU_SUBJECT || {}).lazy) || {})["/sjekkliste"] || []; }
  function sikreData() {
    if ((D().sjekkliste || []).length || lasting) return;
    const liste = lazyListe();
    if (!liste.length || !S.picker) return;
    lasting = S.picker.loadScripts(liste)
      .then(() => { lasting = null; S.app.refresh(); })
      .catch((e) => { lasting = null; lastefeil = e; S.app.refresh(); });
  }
  const finnes = () => data().length > 0 || lazyListe().length > 0;

  /* ---------- lagring ---------- */
  const ex = () => S.store.get().exams;
  const status = (id) => (ex()["skl:" + id] || {}).v || "";
  const valg = () => Object.assign({ test: false, lukket: {} }, ex()["skl:valg"] || {});
  function settValg(patch) { S.store.setExam("skl:valg", patch); }

  /* ---------- visningen ---------- */
  /* Filtrene overlever at visningen tegnes på nytt, men ikke en ny økt. */
  const F = { sok: "", status: "alle", niv: new Set(["kjerne", "viktig", "detalj"]), eks: false, åpne: false };
  let rader = [], seks = [], ref = {};

  function render() {
    if (!(D().sjekkliste || []).length) {
      sikreData();
      if (lastefeil) return el(".empty", el(".ei", "⚠️"), el("h3", "Fant ikke sjekklisten"), el("p.muted", String(lastefeil.message || lastefeil)));
      if (lazyListe().length) return el(".fade-in", el(".card.pad-lg", { style: { textAlign: "center" } },
        el(".spinner", { style: { margin: "10px auto 14px" } }), el("p.muted", "Laster sjekklisten …")));
      return el(".empty", el(".ei", "📭"), el("h3", "Ingen sjekkliste ennå"), el("p.muted", "Faget har ikke lagt inn EDU_DATA.sjekkliste."));
    }
    rader = []; seks = []; ref = {};
    const info = D().sjekklisteInfo || {};
    const sub = window.EDU_SUBJECT || {};
    const n = data().reduce((a, s) => a + s.punkter.length, 0);
    let frist = "";
    if (info.eksamen) {
      const dager = S.u.daysBetween(S.u.todayISO(), info.eksamen);
      if (dager > 0) frist = ` ${dager} ${dager === 1 ? "dag" : "dager"} til eksamen.`;
    }
    const rot = el("div.skl.fade-in");
    rot.appendChild(el(".page-head",
      el(".eyebrow", `${sub.short || sub.name || ""} · Sjekkliste`),
      el("h1", "Kan du alt som kan komme?"),
      el("p.sub", `${n} punkter i ${data().length} temaer.${frist} ` + (info.intro || ""))));

    ref.bk = el("span.k"); ref.bu = el("span.u"); ref.tall = el(".skl-sum");
    rot.appendChild(el(".card", el(".skl-bar", ref.bk, ref.bu), ref.tall));

    /* Oversikt per forelesning: trykk for å hoppe dit. */
    rot.appendChild(el(".section-title", el("h3", "Forelesningene")));
    const ov = el(".skl-oversikt");
    ref.fl = forelesninger().map((f) => {
      const t = el(".t"), k = el("span.k"), u = el("span.u");
      ov.appendChild(el("button.skl-fl", { onclick: () => hopp(f.seksjoner[0].id) }, el(".n", f.navn), el(".skl-bar.tynn", k, u), t));
      return { f, t, k, u };
    });
    rot.appendChild(ov);

    rot.appendChild(verktøy());
    const liste = el("div");
    let forrige = null;
    ref.titler = [];
    data().forEach((s) => {
      if (s.forelesning !== forrige) { const t = el(".skl-fltittel", s.forelesning); ref.titler.push(t); liste.appendChild(t); forrige = s.forelesning; }
      liste.appendChild(seksjon(s));
    });
    rot.appendChild(liste);
    ref.tom = el(".skl-tom.skl-skjult", "Ingen punkter passer filteret.");
    rot.appendChild(ref.tom);
    rot.appendChild(dialog());
    oppdater(true);
    return rot;
  }

  function forelesninger() {
    const ut = []; let f = null;
    data().forEach((s) => { if (!f || f.navn !== s.forelesning) { f = { navn: s.forelesning, seksjoner: [] }; ut.push(f); } f.seksjoner.push(s); });
    return ut;
  }
  function lukk(id, på) {
    const l = Object.assign({}, valg().lukket);
    if (på) l[id] = 1; else delete l[id];
    settValg({ lukket: l });
  }
  function hopp(id) {
    const x = seks.find((s) => s.s.id === id); if (!x) return;
    if (x.node.classList.contains("lukket")) { x.node.classList.remove("lukket"); lukk(id, false); }
    x.node.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function verktøy() {
    const v = el(".skl-verktoy");
    const inp = el("input", { type: "search", placeholder: "Søk (f.eks. skjerming, t*, annuitet)", value: F.sok });
    inp.addEventListener("input", () => { F.sok = inp.value.trim().toLowerCase(); oppdater(); });
    v.appendChild(el(".searchbox", inp));
    const seg = (alt, aktiv, klikk) => {
      const s = el(".seg");
      alt.forEach(([verdi, navn]) => s.appendChild(el("button" + (aktiv(verdi) ? ".on" : ""), {
        onclick: () => { klikk(verdi); [...s.children].forEach((b, i) => b.classList.toggle("on", aktiv(alt[i][0]))); oppdater(); },
      }, navn)));
      return s;
    };
    v.appendChild(seg([["alle", "Alle"], ["", "Ikke sjekket"], ["usikker", "Usikker"], ["kan", "Kan"]], (x) => F.status === x, (x) => { F.status = x; }));
    v.appendChild(seg([["kjerne", "Kjerne"], ["viktig", "Viktig"], ["detalj", "Detalj"]], (x) => F.niv.has(x), (x) => { if (!F.niv.has(x)) F.niv.add(x); else if (F.niv.size > 1) F.niv.delete(x); }));
    const bryter = (navn, tittel, på, klikk) => {
      const b = el("button.btn.sm" + (på() ? ".on" : ""), { title: tittel }, navn);
      b.addEventListener("click", () => { klikk(); b.classList.toggle("on", på()); oppdater(); });
      return b;
    };
    v.appendChild(bryter("Testet på eksamen", "Bare punkter som har vært testet på eksamen", () => F.eks, () => { F.eks = !F.eks; }));
    v.appendChild(bryter("Testmodus", "Skjul svaret til du har svart selv", () => valg().test, () => settValg({ test: !valg().test })));
    v.appendChild(el("button.btn.sm", { title: "Hopp til et punkt du ikke har merket", onclick: tilfeldig }, "Tilfeldig punkt"));
    const åpne = el("button.btn.sm", { onclick: () => {
      F.åpne = !F.åpne;
      rader.forEach((r) => visMer(r, F.åpne));
      if (F.åpne) seks.forEach((x) => x.node.classList.remove("lukket"));
      åpne.textContent = F.åpne ? "Lukk alle detaljer" : "Åpne alle detaljer";
    } }, F.åpne ? "Lukk alle detaljer" : "Åpne alle detaljer");
    v.appendChild(åpne);
    v.appendChild(el("button.btn.sm", { onclick: visUsikre }, "Usikre punkter"));
    v.appendChild(el("button.btn.sm.ghost", { onclick: nullstill }, "Nullstill"));
    return v;
  }

  function seksjon(s) {
    const sek = el(".card.skl-sek" + (valg().lukket[s.id] ? ".lukket" : ""));
    const vekt = el(".skl-vekt", { title: `Eksamensvekt ${s.eksamensvekt} av 5` });
    for (let i = 1; i <= 5; i++) vekt.appendChild(el("i" + (i <= s.eksamensvekt ? ".p" : "")));
    const x = { s, node: sek, tall: el(".skl-stall"), bk: el("span.k"), bu: el("span.u"), rader: [] };
    sek.appendChild(el(".skl-hode", { onclick: () => { sek.classList.toggle("lukket"); lukk(s.id, sek.classList.contains("lukket")); } },
      el(".skl-pil", "▼"), el("h3", s.tittel), vekt, x.tall));
    sek.appendChild(el(".skl-bar.tynn", x.bk, x.bu));
    const kropp = el(".skl-kropp");
    if (s.kildenotat) kropp.appendChild(el(".skl-notat", s.kildenotat));
    if ((s.viktigst || []).length) kropp.appendChild(el(".skl-viktigst", el("b", "Det viktigste"), el("ul", s.viktigst.map((t) => el("li", { html: t })))));
    s.punkter.forEach((p) => { const r = punkt(p, x); x.rader.push(r); kropp.appendChild(r.node); });
    sek.appendChild(kropp);
    seks.push(x);
    return sek;
  }

  function punkt(p, x) {
    const r = { p, x, sok: [p.kan, p.kort, p.mer, (p.kilder || []).join(" "), (p.eksamen || []).join(" "), x.s.tittel, x.s.forelesning].join(" ").replace(/<[^>]+>/g, " ").toLowerCase() };
    r.kanK = el("button.kan", { title: "Jeg kan dette", onclick: () => sett(r, "kan") }, "✓");
    r.usK = el("button.usikker", { title: "Usikker", onclick: () => sett(r, "usikker") }, "?");
    r.svar = el(".skl-svar", { html: p.kort });
    r.vis = el("button.skl-vis", { onclick: () => { r.svar.classList.remove("skl-skjult"); r.vis.classList.add("skl-skjult"); } }, "Vis svar");
    r.mer = el(".skl-mer.skl-skjult");
    const harMer = !!(p.mer || (p.kilder || []).length);
    r.merK = harMer ? el("button.skl-mer-k", { onclick: () => visMer(r, r.mer.classList.contains("skl-skjult")) }, "Mer ▸") : null;
    r.node = el(".skl-p",
      el(".skl-knapper", r.kanK, r.usK),
      el("div",
        el(".skl-l1", el("span.skl-niv." + p.nivaa, NIV[p.nivaa] || p.nivaa), el("span.skl-kan", p.kan)),
        r.svar, r.vis,
        el(".skl-meta", r.merK, (p.eksamen || []).map((e) => el("span.chip.indigo", e))),
        r.mer));
    rader.push(r);
    return r;
  }
  /* Detaljene tegnes først når de åpnes: hundrevis av punkter med full HTML er tungt. */
  function visMer(r, på) {
    if (!r.merK) return;
    if (på && !r.mer.childNodes.length) {
      r.mer.innerHTML = r.p.mer || "";
      if ((r.p.kilder || []).length) r.mer.appendChild(el(".skl-kilder", "Kilder: " + r.p.kilder.join(" · ")));
    }
    r.mer.classList.toggle("skl-skjult", !på);
    r.merK.textContent = på ? "Mindre ▾" : "Mer ▸";
  }
  function sett(r, v) {
    S.store.setExam("skl:" + r.p.id, { v: status(r.p.id) === v ? "" : v, t: Date.now() });
    oppdater();
  }
  function nullstill() {
    if (!confirm("Fjerne alle avkrysninger i sjekklisten?")) return;
    const t = Date.now();
    rader.forEach((r) => { if (status(r.p.id)) ex()["skl:" + r.p.id] = { v: "", t }; });
    S.store.emit();
    oppdater();
  }

  /* render() kaller med ny = true før visningen er montert. Ellers hoppes det
     over når visningen er byttet ut, så en gammel referanse ikke tegnes. */
  function oppdater(ny) {
    if (!ref.tall || (!ny && !document.body.contains(ref.tall))) return;
    const test = valg().test;
    let k = 0, u = 0, synlige = 0, kj = 0, kjK = 0;
    seks.forEach((x) => {
      let sk = 0, su = 0, sv = 0;
      x.rader.forEach((r) => {
        const st = status(r.p.id);
        if (st === "kan") { k++; sk++; } else if (st === "usikker") { u++; su++; }
        if (r.p.nivaa === "kjerne") { kj++; if (st === "kan") kjK++; }
        r.kanK.classList.toggle("on", st === "kan"); r.usK.classList.toggle("on", st === "usikker");
        r.node.classList.toggle("st-kan", st === "kan");
        const synlig = F.niv.has(r.p.nivaa) && (F.status === "alle" || F.status === st)
          && (!F.sok || r.sok.includes(F.sok)) && (!F.eks || (r.p.eksamen || []).length > 0);
        r.node.classList.toggle("skl-skjult", !synlig);
        if (synlig) { sv++; synlige++; }
        const skjul = test && st !== "kan";
        r.svar.classList.toggle("skl-skjult", skjul);
        r.vis.classList.toggle("skl-skjult", !skjul);
      });
      const n = x.rader.length;
      x.tall.textContent = `${sk}/${n} kan` + (su ? ` · ${su} usikre` : "");
      x.bk.style.width = (100 * sk / n) + "%"; x.bu.style.width = (100 * su / n) + "%";
      x.node.classList.toggle("skl-skjult", sv === 0);
      x.k = sk; x.u = su;
    });
    ref.titler.forEach((t) => {
      let n = t.nextElementSibling, vis = false;
      while (n && !n.classList.contains("skl-fltittel")) { if (!n.classList.contains("skl-skjult")) vis = true; n = n.nextElementSibling; }
      t.classList.toggle("skl-skjult", !vis);
    });
    ref.fl.forEach(({ f, t, k: bk, u: bu }) => {
      const xs = seks.filter((x) => f.seksjoner.indexOf(x.s) > -1);
      const n = xs.reduce((a, x) => a + x.rader.length, 0);
      const fk = xs.reduce((a, x) => a + x.k, 0), fu = xs.reduce((a, x) => a + x.u, 0);
      t.textContent = `${fk}/${n} kan` + (fu ? ` · ${fu} usikre` : "");
      bk.style.width = (100 * fk / n) + "%"; bu.style.width = (100 * fu / n) + "%";
    });
    const tot = rader.length;
    ref.bk.style.width = (100 * k / tot) + "%"; ref.bu.style.width = (100 * u / tot) + "%";
    S.u.mount(ref.tall,
      el("span", el("i.skl-prikk", { style: { background: "var(--green)" } }), "Kan: ", el("b", String(k))),
      el("span", el("i.skl-prikk", { style: { background: "var(--amber)" } }), "Usikker: ", el("b", String(u))),
      el("span", el("i.skl-prikk", { style: { background: "var(--hairline-strong)" } }), "Ikke sjekket: ", el("b", String(tot - k - u))),
      el("span", "Kjernepunkter du kan: ", el("b", `${kjK} av ${kj}`)));
    ref.tom.classList.toggle("skl-skjult", synlige > 0);
  }

  function tilfeldig() {
    const kand = rader.filter((r) => !status(r.p.id) && !r.node.classList.contains("skl-skjult"));
    if (!kand.length) { S.u.toast("Ingen umerkede punkter i dette filteret."); return; }
    const r = kand[Math.floor(Math.random() * kand.length)];
    r.x.node.classList.remove("lukket");
    r.node.scrollIntoView({ behavior: "smooth", block: "center" });
    r.node.classList.remove("blink"); void r.node.offsetWidth; r.node.classList.add("blink");
  }

  function dialog() {
    ref.felt = el("textarea", { readonly: "" });
    ref.dialog = el("dialog.skl-dialog",
      el("h3", "Punkter du har merket usikker"),
      el("p.muted.tiny", "Lim listen inn hos Claude, så kan du få oppgaver på akkurat disse."),
      ref.felt,
      el(".skl-dknapper",
        el("button.btn.sm.primary", { onclick: async () => { const ok = await S.u.tilUtklipp(ref.felt.value); S.u.toast(ok ? "Kopiert" : "Marker teksten og kopier selv"); } }, "Kopier"),
        el("button.btn.sm", { onclick: () => ref.dialog.close() }, "Lukk")));
    return ref.dialog;
  }
  function visUsikre() {
    const us = rader.filter((r) => status(r.p.id) === "usikker");
    const sub = window.EDU_SUBJECT || {};
    ref.felt.value = us.length
      ? `${sub.short || sub.name || ""}: punkter jeg er usikker på (${us.length})\n\n` + us.map((r) => `- [${r.x.s.tittel}] ${r.p.kan}`).join("\n")
      : "Du har ikke merket noen punkter som usikre ennå.";
    ref.dialog.showModal();
  }

  S.views = S.views || {};
  S.views.sjekkliste = { render, finnes };
})(window.EDU);
