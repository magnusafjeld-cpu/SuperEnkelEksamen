/* ===================== MOCK-INTERVJUER — se ekte caser, med stopp-punkter =====================
   Å se noen andre løse en case er nyttig helt til det blir passivt. Derfor legger
   modulen inn stopp-punkter: på gitte tidspunkt skal du pause, gjøre trinnet selv,
   og først deretter høre hva kandidaten gjorde. Ett klikk spoler til punktet.

   Videoene ligger i EDU_DATA.mocks og spilles fra youtube-nocookie.com, som ikke
   setter sporingsinformasjonskapsler før du faktisk starter avspillingen.

   Tilstand i state.exams under "mock:<id>": { sett, notat }. */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon } = S.u;
  const sh = () => S.views.shared;
  const MOCKS = () => window.EDU_DATA.mocks || [];

  let åpen = null;
  let startSek = 0;                 // hvilket stopp-punkt spilleren står på
  let filtre = { type: "alle", casetype: "alle", firma: "alle" };

  const key = (id) => "mock:" + id;
  const st = (id) => S.store.get().exams[key(id)] || {};
  const byId = (id) => MOCKS().find((m) => m.id === id) || null;
  const settSett = (id, v) => S.store.setExam(key(id), { sett: v, ts: S.u.nowTs() });
  const settNotat = (id, t) => S.store.setExam(key(id), { notat: String(t || "").slice(0, 4000) });

  const mmss = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

  /* ================= biblioteket ================= */
  function renderListe() {
    const wrap = el(".fade-in");
    const alle = MOCKS();
    const sett = alle.filter((m) => st(m.id).sett).length;

    wrap.appendChild(sh().pageHead("Mock-intervjuer", `${alle.length} videoer${sett ? ` · ${sett} sett` : ""}`,
      "Ekte caseintervjuer, filmet. Se dem aktivt: der det er lagt inn stopp-punkter, pauser du og gjør trinnet selv før du hører fortsettelsen. En video du bare har sett, har du ikke trent på."));

    if (!alle.length) { wrap.appendChild(sh().empty("🎬", "Ingen videoer ennå", "Faget har ikke lagt inn noe i EDU_DATA.mocks.")); return wrap; }

    wrap.appendChild(filterrad(alle));
    const vist = alle.filter(passerer);
    if (!vist.length) { wrap.appendChild(sh().empty("🔍", "Ingen videoer med disse filtrene", "Løsne på et av dem.")); return wrap; }

    const liste = el(".stack", { style: { gap: "12px" } });
    vist.forEach((m) => liste.appendChild(mockKort(m)));
    wrap.appendChild(liste);
    return wrap;
  }

  const passerer = (m) =>
    (filtre.type === "alle" || m.type === filtre.type) &&
    (filtre.casetype === "alle" || m.casetype === filtre.casetype) &&
    (filtre.firma === "alle" || m.firma === filtre.firma);

  function filterrad(alle) {
    const box = el(".card", { style: { marginBottom: "18px" } });
    [["type", "Innhold"], ["casetype", "Casetype"], ["firma", "Firma"]].forEach(([nøkkel, navn]) => {
      const verdier = [...new Set(alle.map((m) => m[nøkkel]).filter(Boolean))].sort();
      if (verdier.length < 2) return;
      const rad = el(".row.wrap", { style: { gap: "6px", alignItems: "center", marginBottom: "8px" } },
        el(".tiny.muted", { style: { minWidth: "70px" } }, navn));
      ["alle", ...verdier].forEach((v) => rad.appendChild(el("button.chip" + (filtre[nøkkel] === v ? ".accent" : ".slate"),
        { style: { cursor: "pointer" }, onclick: () => { filtre[nøkkel] = v; S.app.refresh(); } }, v === "alle" ? "Alle" : v)));
      box.appendChild(rad);
    });
    return box.children.length ? box : el("div");
  }

  function mockKort(m) {
    const s = st(m.id);
    const kort = el(".card.pad-lg", { style: { cursor: "pointer" }, onclick: () => { åpen = m.id; startSek = 0; S.app.refresh(); } });
    kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "17px", lineHeight: 1.35 } }, m.tittel),
      el(".spacer"),
      s.sett ? el(".chip.green", el(".dot"), "Sett") : null));
    kort.appendChild(el(".row.wrap", { style: { gap: "6px", margin: "8px 0 0" } },
      m.kanal ? el(".chip.slate", { style: { fontSize: "11px" } }, m.kanal) : null,
      m.type ? el(".chip.indigo", m.type) : null,
      m.casetype ? el(".chip.teal", m.casetype) : null,
      m.firma && m.firma !== "generisk" ? el(".chip.amber", m.firma) : null,
      m.minutter ? el(".chip", icon("clock"), `${m.minutter} min`) : null,
      (m.stopp || []).length ? el(".chip.accent", `${m.stopp.length} stopp-punkt`) : null,
      m.harLøsning ? el(".chip.green", "med fasit") : null));
    if (m.hvorfor) kort.appendChild(el("p.tiny.muted", { style: { margin: "10px 0 0" } }, m.hvorfor));
    return kort;
  }

  /* ================= én video ================= */
  function renderVideo(m) {
    const wrap = el(".fade-in");
    const s = st(m.id);

    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginBottom: "14px" } },
      el("button.btn.ghost.sm", { onclick: () => { åpen = null; S.app.refresh(); } }, "← Alle videoer"),
      el(".spacer"),
      el("button.btn.sm" + (s.sett ? ".primary" : ""), { onclick: () => { settSett(m.id, !s.sett); S.app.refresh(); } },
        s.sett ? "✓ Sett" : "Marker som sett")));

    const kort = el(".card.pad-lg");
    kort.appendChild(el("h3", { style: { fontSize: "19px", lineHeight: 1.35, marginBottom: "8px" } }, m.tittel));
    kort.appendChild(el(".row.wrap", { style: { gap: "6px", marginBottom: "14px" } },
      m.kanal ? el(".chip.slate", m.kanal) : null,
      m.casetype ? el(".chip.teal", m.casetype) : null,
      m.stil ? el(".chip.indigo", m.stil) : null,
      m.nivå ? el(".chip.amber", m.nivå) : null));

    /* 16:9 uten aspect-ratio-avhengighet, så den også står riktig i eldre Safari. */
    const ramme = el("div", { style: { position: "relative", width: "100%", paddingBottom: "56.25%", height: 0, borderRadius: "var(--r-md)", overflow: "hidden", background: "#000" } });
    ramme.appendChild(el("iframe", {
      src: `https://www.youtube-nocookie.com/embed/${m.id}?rel=0&modestbranding=1${startSek ? "&start=" + startSek + "&autoplay=1" : ""}`,
      title: m.tittel,
      allow: "accelerometer; encrypted-media; picture-in-picture; fullscreen",
      allowfullscreen: "",
      referrerpolicy: "strict-origin-when-cross-origin",
      style: { position: "absolute", inset: "0", width: "100%", height: "100%", border: "0" },
    }));
    kort.appendChild(ramme);

    if (m.hvorfor) kort.appendChild(el(".explain", { style: { marginTop: "14px" } }, el("b", "Se etter: "), m.hvorfor));
    kort.appendChild(stoppPunkter(m));
    kort.appendChild(notatfelt(m, s));
    wrap.appendChild(kort);

    kort.appendChild(el("p.tiny.muted", { style: { marginTop: "16px" } },
      "Videoen spilles fra YouTube. Er den fjernet eller gjort privat siden den ble lagt inn, blir ruten svart — si fra, så bytter vi den ut."));
    return wrap;
  }

  function stoppPunkter(m) {
    const boks = el("div", { style: { marginTop: "16px" } });
    if (!(m.stopp || []).length) {
      boks.appendChild(el("p.tiny.muted",
        "Denne videoen har ingen stopp-punkter. Pause likevel når prompten er lest, og strukturer casen selv før du hører fortsettelsen."));
      return boks;
    }
    boks.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Stopp-punkter — pause og gjør trinnet selv"));
    m.stopp.forEach((p) => {
      boks.appendChild(el(".task-row", { style: { cursor: "pointer" }, onclick: () => { startSek = p.sek; S.app.refresh(); } },
        el(".chip.accent", { style: { fontVariantNumeric: "tabular-nums" } }, mmss(p.sek)),
        el(".tt", { style: { marginLeft: "10px" } }, p.be)));
    });
    return boks;
  }

  function notatfelt(m, s) {
    const boks = el("div", { style: { marginTop: "18px" } });
    boks.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Hva tok du med deg?"));
    const ta = el("textarea.input", {
      rows: 4,
      placeholder: "Én formulering, ett grep, én feil å unngå. Notater du faktisk leser igjen er korte.",
      style: { width: "100%", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical" },
      onblur: (e) => settNotat(m.id, e.target.value),
    });
    ta.value = s.notat || "";
    boks.appendChild(ta);
    return boks;
  }

  function render() {
    const m = åpen ? byId(åpen) : null;
    if (!m) { åpen = null; return renderListe(); }
    return renderVideo(m);
  }

  S.views.mock = { render, uSettCount: () => MOCKS().filter((m) => !st(m.id).sett).length };
})(window.EDU);
