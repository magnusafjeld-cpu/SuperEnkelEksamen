/* ===================== HISTORIEPORTEFØLJEN — dine egne, ikke fagets =====================
   Fit-delen av et intervju kan ikke leses inn. Den krever at du har seks til ti
   historier klare, at de dekker alle dimensjonene huset spør etter, og at hver
   av dem tåler å bli boret i. Det er en kveldsjobb — og den redder et helt
   intervju hvis den er gjort, og velter det hvis den ikke er.

   Modulen er derfor et verktøy og ikke en visning: du skriver inn dine egne
   historier, merker hvilke dimensjoner de dekker, og får matrisen som viser
   hullene. Dimensjonene, sondene og reglene kommer fra faget
   (EDU_DATA.historier), så motoren vet ingenting om konsulentbransjen.

   Alt lagres i state.exams under "hist:<id>", som synkes som all annen fremdrift.
   ======================================================================================= */
window.EDU = window.EDU || {};

(function (S) {
  const { el, icon } = S.u;
  const sh = () => S.views.shared;
  const KONF = () => window.EDU_DATA.historier || {};
  const DIMS = () => KONF().dimensjoner || [];
  const SONDER = () => KONF().sonder || [];

  let redigerer = null;    // historie-id under redigering, eller "ny"
  let sonderer = null;     // historie-id som sondetestes

  /* ---------- lagring ---------- */
  const PRE = "hist:";
  const alle = () => {
    const ex = S.store.get().exams;
    return Object.keys(ex).filter((k) => k.indexOf(PRE) === 0)
      .map((k) => Object.assign({ id: k.slice(PRE.length) }, ex[k]))
      .filter((h) => !h.slettet)
      .sort((a, b) => (a.laget || 0) - (b.laget || 0));
  };
  const hent = (id) => alle().find((h) => h.id === id) || null;
  const lagre = (id, patch) => S.store.setExam(PRE + id, patch);
  const nyId = () => "h" + S.u.nowTs().toString(36);

  const FELT = [
    { k: "tittel", navn: "Kort navn", rader: 1, hint: "Slik du selv husker den. «Da gruppa sprakk to uker før innlevering.»" },
    { k: "kontekst", navn: "Situasjonen", rader: 3, hint: "Hvor, når, hvem — på tre setninger. Ikke mer." },
    { k: "innsats", navn: "Hva sto på spill", rader: 2, hint: "Uten dette blir historien liten. Hva ville skjedd hvis ingen gjorde noe?" },
    { k: "handling", navn: "Hva DU gjorde", rader: 4, hint: "Ikke «vi». Hva sa du, til hvem, og hvorfor akkurat det?" },
    { k: "motstand", navn: "Hvem var uenig, og hvorfor", rader: 3, hint: "Den delen som skiller en sterk historie fra en flat. Forsto du hvorfor de mente det?" },
    { k: "resultat", navn: "Utfallet, med tall", rader: 2, hint: "Sett teller på alt som kan telles. «Fra 4 til 11 medlemmer», ikke «det gikk bedre»." },
    { k: "sowhat", navn: "Så derfor …", rader: 2, hint: "Én setning: hva historien sier om deg som de bør bry seg om." },
  ];

  /* ================= oversikt ================= */
  function renderListe() {
    const wrap = el(".fade-in");
    const h = alle();
    wrap.appendChild(sh().pageHead("Historieporteføljen", `${h.length} historier`,
      KONF().intro || "Skriv historiene dine én gang, merk hva de dekker, og se hullene. En historie du ikke har skrevet ned, finnes ikke når du sitter i rommet."));

    wrap.appendChild(matrise(h));

    wrap.appendChild(el(".section-title", el("h3", "Historiene dine"),
      el("button.btn.primary.sm", { onclick: () => { redigerer = "ny"; S.app.refresh(); } }, "+ Ny historie")));

    if (!h.length) {
      wrap.appendChild(sh().empty("📓", "Ingen historier ennå",
        "Begynn med den du allerede forteller når noen spør hva du har fått til. Den er nesten alltid god nok som råstoff."));
      return wrap;
    }
    const liste = el(".stack", { style: { gap: "12px" } });
    h.forEach((x) => liste.appendChild(kort(x)));
    wrap.appendChild(liste);
    return wrap;
  }

  /* Matrisen er hele poenget med verktøyet: den viser hullene, ikke arbeidet. */
  function matrise(h) {
    const dims = DIMS();
    if (!dims.length) return el("div");
    const R = KONF().regler || { minPerDim: 2, maksPerHistorie: 2, minKontekster: 4 };
    const kort = el(".card.pad-lg", { style: { marginBottom: "20px" } });
    kort.appendChild(el("h3", { style: { fontSize: "17px", marginBottom: "12px" } }, "Dekning"));

    const tabell = el("table.data", { style: { width: "100%", fontSize: "13.5px" } });
    const hodeRad = el("tr", el("th", "Historie"));
    dims.forEach((d) => hodeRad.appendChild(el("th", { style: { textAlign: "center", fontSize: "11.5px" }, title: d.beskrivelse || "" }, d.kort || d.navn)));
    tabell.appendChild(hodeRad);

    h.forEach((x) => {
      const rad = el("tr", el("td", { style: { maxWidth: "180px" } }, x.tittel || "(uten navn)"));
      dims.forEach((d) => {
        const på = (x.dims || []).indexOf(d.id) > -1;
        rad.appendChild(el("td", { style: { textAlign: "center", color: på ? "var(--green)" : "var(--ink-4)" } }, på ? "●" : "·"));
      });
      tabell.appendChild(rad);
    });

    const sumRad = el("tr", el("td", el("b", "Antall")));
    const tellinger = dims.map((d) => h.filter((x) => (x.dims || []).indexOf(d.id) > -1).length);
    tellinger.forEach((n) => sumRad.appendChild(el("td", { style: { textAlign: "center" } },
      el("b", { style: { color: n >= R.minPerDim ? "var(--green)" : n > 0 ? "var(--amber)" : "var(--rose)" } }, String(n)))));
    tabell.appendChild(sumRad);
    kort.appendChild(tabell);

    /* Reglene sier hva som mangler, i klartekst. En matrise uten dom er bare et rutenett. */
    const kontekster = new Set(h.map((x) => (x.kontekst || "").trim().slice(0, 24)).filter(Boolean)).size;
    const tynne = dims.filter((d, i) => tellinger[i] < R.minPerDim);
    const overbrukte = h.filter((x) => (x.dims || []).length > R.maksPerHistorie);
    const dommer = [];
    if (tynne.length) dommer.push({ ok: false, t: `${tynne.length} dimensjon${tynne.length === 1 ? "" : "er"} har under ${R.minPerDim} historier: ${tynne.map((d) => d.kort || d.navn).join(", ")}.` });
    else dommer.push({ ok: true, t: `Alle dimensjonene har minst ${R.minPerDim} historier.` });
    if (overbrukte.length) dommer.push({ ok: false, t: `${overbrukte.length} historie${overbrukte.length === 1 ? "" : "r"} er merket med mer enn ${R.maksPerHistorie} dimensjoner. Gjenbruk av samme historie merkes fort.` });
    if (kontekster < R.minKontekster) dommer.push({ ok: false, t: `Bare ${kontekster} ulike kontekster. Sikt på minst ${R.minKontekster} — verv, jobb, studier, utveksling.` });
    else dommer.push({ ok: true, t: `${kontekster} ulike kontekster.` });

    const ul = el("div", { style: { marginTop: "14px" } });
    dommer.forEach((d) => ul.appendChild(el(".task-row",
      el("div", { style: { color: d.ok ? "var(--green)" : "var(--amber)", fontWeight: 700 } }, d.ok ? "✓" : "!"),
      el("div", el(".tt", { style: { marginLeft: "10px" } }, d.t)))));
    kort.appendChild(ul);
    return kort;
  }

  function kort(x) {
    const dims = DIMS().filter((d) => (x.dims || []).indexOf(d.id) > -1);
    const utfylt = FELT.filter((f) => (x[f.k] || "").trim()).length;
    const bestått = (x.sonder || []).length;
    const k = el(".card.pad-lg");
    k.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
      el("h3", { style: { fontSize: "17px" } }, x.tittel || "(uten navn)"),
      el(".spacer"),
      el(".chip" + (utfylt === FELT.length ? ".green" : ".amber"), `${utfylt}/${FELT.length} felt`),
      bestått ? el(".chip.accent", `${bestått}/${SONDER().length} sonder`) : null));
    if (dims.length) k.appendChild(el(".row.wrap", { style: { gap: "6px", marginTop: "8px" } },
      ...dims.map((d) => el(".chip.teal", { style: { fontSize: "11px" } }, d.kort || d.navn))));
    if (x.sowhat) k.appendChild(el("p.tiny.muted", { style: { margin: "10px 0 0", fontStyle: "italic" } }, "„" + x.sowhat + "“"));
    k.appendChild(el(".row.wrap", { style: { gap: "8px", marginTop: "14px" } },
      el("button.btn.sm", { onclick: () => { redigerer = x.id; S.app.refresh(); } }, "Rediger"),
      el("button.btn.ghost.sm", { onclick: () => { sonderer = x.id; S.app.refresh(); } }, "Sondetest"),
      el(".spacer"),
      el("button.btn.ghost.sm", {
        onclick: () => { if (confirm("Slette «" + (x.tittel || "uten navn") + "»?")) { lagre(x.id, { slettet: true }); S.app.refresh(); } },
      }, "Slett")));
    return k;
  }

  /* ================= redigering ================= */
  function renderRediger() {
    const ny = redigerer === "ny";
    const id = ny ? nyId() : redigerer;
    const x = ny ? { id, laget: S.u.nowTs() } : hent(redigerer);
    if (!x) { redigerer = null; return renderListe(); }

    const wrap = el(".fade-in");
    wrap.appendChild(el(".row", { style: { marginBottom: "14px" } },
      el("button.btn.ghost.sm", { onclick: () => { redigerer = null; S.app.refresh(); } }, "← Alle historier")));

    const kort = el(".card.pad-lg");
    kort.appendChild(el("h3", { style: { fontSize: "19px", marginBottom: "4px" } }, ny ? "Ny historie" : "Rediger historie"));
    kort.appendChild(el("p.tiny.muted", { style: { marginTop: 0, marginBottom: "18px" } },
      "Skriv stikkord, ikke prosa. Historien skal fortelles, ikke leses opp."));

    const felter = {};
    FELT.forEach((f) => {
      kort.appendChild(el(".field-l", f.navn));
      const t = el("textarea.input", {
        rows: f.rader, placeholder: f.hint,
        style: { width: "100%", fontFamily: "inherit", lineHeight: 1.55, resize: "vertical", marginBottom: "14px" },
        onblur: (e) => lagre(id, Object.assign({ laget: x.laget || S.u.nowTs() }, { [f.k]: e.target.value.slice(0, 1500) })),
      });
      t.value = x[f.k] || "";
      felter[f.k] = t;
      kort.appendChild(t);
    });

    kort.appendChild(el(".field-l", "Hvilke dimensjoner dekker den?"));
    kort.appendChild(el("p.tiny.muted", { style: { marginTop: 0, marginBottom: "10px" } },
      `Vær streng. Merker du alt, dekker den ingenting — og gjenbruk av samme historie på tvers av dimensjoner merkes fort.`));
    const valgt = new Set(x.dims || []);
    const rad = el(".row.wrap", { style: { gap: "6px", marginBottom: "18px" } });
    DIMS().forEach((d) => {
      const på = valgt.has(d.id);
      rad.appendChild(el("button.chip" + (på ? ".accent" : ".slate"), {
        style: { cursor: "pointer" }, title: d.beskrivelse || "",
        onclick: () => {
          på ? valgt.delete(d.id) : valgt.add(d.id);
          FELT.forEach((f) => lagre(id, { [f.k]: felter[f.k].value.slice(0, 1500) }));
          lagre(id, { dims: [...valgt], laget: x.laget || S.u.nowTs() });
          S.app.refresh();
        },
      }, d.navn));
    });
    kort.appendChild(rad);

    kort.appendChild(el("button.btn.primary", {
      onclick: () => {
        FELT.forEach((f) => lagre(id, { [f.k]: felter[f.k].value.slice(0, 1500) }));
        lagre(id, { dims: [...valgt], laget: x.laget || S.u.nowTs() });
        redigerer = null; S.app.refresh();
      },
    }, "Lagre og lukk"));
    wrap.appendChild(kort);
    return wrap;
  }

  /* ================= sondetest ================= */
  /* En historie som ikke tåler å bli boret i, er en reservehistorie. Testen er
     å lese sonden, svare høyt, og være ærlig om du faktisk hadde et svar. */
  function renderSonder() {
    const x = hent(sonderer);
    if (!x) { sonderer = null; return renderListe(); }
    const sonder = SONDER();
    const klart = new Set(x.sonder || []);

    const wrap = el(".fade-in");
    wrap.appendChild(el(".row", { style: { marginBottom: "14px" } },
      el("button.btn.ghost.sm", { onclick: () => { sonderer = null; S.app.refresh(); } }, "← Alle historier")));

    const kort = el(".card.pad-lg");
    kort.appendChild(el("h3", { style: { fontSize: "19px", marginBottom: "4px" } }, "Sondetest · " + (x.tittel || "uten navn")));
    kort.appendChild(el("p.tiny.muted", { style: { marginTop: 0 } },
      KONF().sondeIntro || "Svar høyt på hver enkelt, uten å skrive. Kryss av bare der du faktisk hadde et svar du ville sagt til en partner."));

    const terskel = (KONF().regler || {}).sondeTerskel || Math.ceil(sonder.length * 0.67);
    const teller = el(".chip" + (klart.size >= terskel ? ".green" : ".amber"),
      { style: { margin: "12px 0 16px" } }, `${klart.size} av ${sonder.length} · terskel ${terskel}`);
    kort.appendChild(teller);

    sonder.forEach((sp, n) => {
      const på = klart.has(n);
      kort.appendChild(el("button.check" + (på ? ".done" : ""), {
        style: { display: "block", width: "100%", textAlign: "left", marginBottom: "6px", cursor: "pointer" },
        onclick: () => { på ? klart.delete(n) : klart.add(n); lagre(x.id, { sonder: [...klart] }); S.app.refresh(); },
      }, (på ? "✓ " : "○ ") + sp));
    });

    kort.appendChild(el(".explain", { style: { marginTop: "16px" } },
      klart.size >= terskel
        ? el("span", el("b", "Denne holder. "), "Den tåler å bli boret i, og kan brukes som hovedhistorie.")
        : el("span", el("b", "Denne er en reservehistorie. "), `Den svarer på ${klart.size} av ${sonder.length} sonder. Under terskelen på ${terskel} vil et dybdeintervju finne bunnen før tiden er ute — velg en annen, eller grav fram detaljene som mangler.`)));
    wrap.appendChild(kort);
    return wrap;
  }

  function render() {
    if (sonderer) return renderSonder();
    if (redigerer) return renderRediger();
    return renderListe();
  }

  /* Merke i navigasjonen: dimensjoner som ennå ikke har nok historier. */
  function hullCount() {
    const h = alle(), R = KONF().regler || { minPerDim: 2 };
    return DIMS().filter((d) => h.filter((x) => (x.dims || []).indexOf(d.id) > -1).length < R.minPerDim).length;
  }

  S.views.historier = { render, hullCount };
})(window.EDU);
