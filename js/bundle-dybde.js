/* ===================== DYBDETRENING — tre selvrettede spørsmålsbanker =====================
   "Kort sikt" (kortsiktsmodellen/AS-AD/IS-MP/åpen økonomi), "Lang sikt"
   (produksjonsmodellen/Solow/Romer/vekst/arbeidsmarked/langsiktig inflasjon, hver
   med nivå 1-4) og "Eksamensoppgaver" (38 faktiske eksamensoppgaver 2023-2025 med
   sensorveiledning, der nivå er eksamenssemester). Filtrerbar på nivå og tema, med
   "kunne/må øve"-vurdering som lagres lokalt per bank og mater navigasjonens
   "må øve"-teller. */
window.EDU = window.EDU || {};
(function (S) {
  const { el, icon, escapeHtml } = S.u;
  const sh = () => S.views.shared;
  const D = () => window.EDU_DATA.dybde || {};   // faget trenger ikke ha dybdebanker

  const BANKS = [
    { key: "kort", label: "Kort sikt", sub: "Kortsiktsmodellen: produksjonsgap, IS-MP-PC, AS-AD og åpen økonomi (Oppgave 3).",
      tip: "Nivå 1–2 er oppvarming; nivå 3–4 er der eksamenspoengene ligger." },
    { key: "lang", label: "Lang sikt", sub: "Produksjonsmodellen, Solow, Romer, vekstregnskap, arbeidsmarked og langsiktig inflasjon (Oppgave 1–2).",
      tip: "Nivå 1–2 er oppvarming; nivå 3–4 er der eksamenspoengene ligger." },
    { key: "eksamen", label: "Eksamensoppgaver", sub: "38 faktiske eksamensoppgaver 2023–2025, med svar bygget på de offisielle sensorveiledningene.",
      tip: "Hvert nivå her er ett eksamenssett (f.eks. «Vår 2023»), ikke en vanskelighetsgrad. Skriv hele svaret ditt skriftlig før du sjekker fasiten — dette er nærmest ekte eksamen." },
  ];

  /* ---------- lokal tilstand (nullstilles ved navigering, ikke persistert) ---------- */
  let activeBank = "kort";
  function levelKeysFor(bankKey) { return Object.keys((D()[bankKey] || {}).lvl || {}).map(Number).sort((a, b) => a - b); }
  /* bygges ved første bruk — fagets datafil lastes etter denne modulen */
  const filterState = {};
  function fs() {
    return filterState[activeBank] || (filterState[activeBank] =
      { fLevels: new Set(levelKeysFor(activeBank)), fTopic: "alle", viewMode: null, order: null, shuffled: false });
  }
  function bank() { return D()[activeBank] || { cats: [], lvl: {}, items: [] }; }
  function items() { return bank().items || []; }
  function ensureOrder() { const s = fs(); if (!s.order) s.order = items().map((q) => q.id); return s.order; }

  /* ---------- vurderinger (lagres per bank for å unngå id-kollisjon) ---------- */
  function marksFor(bankKey) {
    const st = S.store.get();
    if (!st.dybde || !st.dybde.banks) st.dybde = { banks: { kort: { marks: {} }, lang: { marks: {} }, eksamen: { marks: {} } } };
    if (!st.dybde.banks[bankKey]) st.dybde.banks[bankKey] = { marks: {} };
    return st.dybde.banks[bankKey].marks;
  }
  function marks() { return marksFor(activeBank); }
  function markOf(id) { return marks()[id] || null; }
  function setMark(id, val) {
    const m = marks();
    m[id] = m[id] === val ? null : val;
    S.store.emit();
  }
  function counts() {
    const m = marks(); const all = items();
    let ok = 0, no = 0;
    all.forEach((q) => { const v = m[q.id]; if (v === "ok") ok++; else if (v === "no") no++; });
    return { ok, no, unseen: all.length - ok - no, total: all.length };
  }

  function visible() {
    const s = fs(); const m = marks(); const byId = {}; items().forEach((q) => (byId[q.id] = q));
    return ensureOrder().map((id) => byId[id]).filter((q) => {
      if (!q) return false;
      if (!s.fLevels.has(q.n)) return false;
      if (s.fTopic !== "alle" && q.k !== s.fTopic) return false;
      const v = m[q.id];
      if (s.viewMode === "again" && v !== "no") return false;
      if (s.viewMode === "unseen" && v != null) return false;
      return true;
    });
  }

  /* ---------- rendering ---------- */
  function render() {
    const wrap = el(".fade-in");
    const totalItems = BANKS.reduce((a, b) => a + ((D()[b.key] && D()[b.key].items) || []).length, 0);
    wrap.appendChild(sh().pageHead("Dybdetrening", `${totalItems} spørsmål, tre bolker`,
      "Selvrettet trening i tre bolker: kort sikt (Oppgave 3), lang sikt (Oppgave 1–2) og faktiske eksamensoppgaver med sensorveiledning. Velg bank, filtrer på nivå og tema, og formuler svaret i hodet (eller skriftlig) før du åpner fasiten."));

    wrap.appendChild(bankSwitcher());

    const curBank = BANKS.find((b) => b.key === activeBank) || {};
    wrap.appendChild(el(".card", { style: { marginBottom: "18px", background: "var(--amber-soft)", border: "1px solid #f2dcb6" } },
      el("p", { style: { margin: 0, fontSize: "14.5px", lineHeight: 1.55 } },
        el("b", "Slik bruker du den: "),
        "Les spørsmålet, si svaret høyt eller skriv det ned, før du åpner fasiten. Gjenkjenning er ikke det samme som å kunne. Marker deretter «Kunne den» eller «Må øve», og bruk filteret «Kun må øve» for en rask ny runde. " + (curBank.tip || ""))));

    wrap.appendChild(filterPanel());
    const statsPanel = el(".card", { style: { marginBottom: "18px" } });
    wrap.appendChild(statsPanel);

    const list = el("div");
    wrap.appendChild(list);
    paintList(list, statsPanel);
    return wrap;
  }

  function bankSwitcher() {
    const panel = el(".card", { style: { marginBottom: "18px" } });
    panel.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Velg bank"));
    const seg = el(".seg", { style: { flexWrap: "wrap" } });
    BANKS.forEach((b) => {
      const n = ((D()[b.key] && D()[b.key].items) || []).length;
      seg.appendChild(el("button" + (activeBank === b.key ? ".on" : ""), { onclick: () => {
        if (activeBank !== b.key) { activeBank = b.key; S.app.refresh(); }
      } }, `${b.label} · ${n}`));
    });
    panel.appendChild(seg);
    const cur = BANKS.find((b) => b.key === activeBank);
    panel.appendChild(el("p.tiny.muted", { style: { marginTop: "10px", marginBottom: 0 } }, cur ? cur.sub : ""));
    return panel;
  }

  function filterPanel() {
    const s = fs();
    const panel = el(".card", { style: { marginBottom: "18px" } });
    panel.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Nivå"));
    const lvlRow = el(".row.wrap", { style: { gap: "8px", marginBottom: "16px" } });
    levelKeysFor(activeBank).forEach((n) => {
      const on = s.fLevels.has(n);
      const label = ((bank().lvl || {})[n] || [])[0] || ("Nivå " + n);
      lvlRow.appendChild(el(".chip" + (on ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => {
        if (s.fLevels.has(n)) { if (s.fLevels.size > 1) s.fLevels.delete(n); } else s.fLevels.add(n);
        S.app.refresh();
      } }, label));
    });
    panel.appendChild(lvlRow);

    panel.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Tema"));
    const topicRow = el(".row.wrap", { style: { gap: "8px", marginBottom: "16px" } });
    topicRow.appendChild(el(".chip" + (s.fTopic === "alle" ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => { s.fTopic = "alle"; S.app.refresh(); } }, "Alle tema"));
    (bank().cats || []).forEach((c) => {
      topicRow.appendChild(el(".chip" + (s.fTopic === c ? ".accent" : ""), { style: { cursor: "pointer" }, onclick: () => { s.fTopic = c; S.app.refresh(); } }, c));
    });
    panel.appendChild(topicRow);

    panel.appendChild(el(".nav-section", { style: { paddingLeft: 0 } }, "Visning"));
    const seg = el(".seg", { style: { flexWrap: "wrap" } });
    [[null, "Alle spørsmål"], ["again", "Kun «må øve»"], ["unseen", "Kun ikke vurdert"]].forEach(([v, label]) => {
      seg.appendChild(el("button" + (s.viewMode === v ? ".on" : ""), { onclick: () => { s.viewMode = v; S.app.refresh(); } }, label));
    });
    const actions = el(".row.wrap", { style: { gap: "8px", marginTop: "10px" } },
      el("button.btn.sm", { onclick: () => { s.order = shuffleArr(items().map((q) => q.id)); s.shuffled = true; S.app.refresh(); } }, "Bland rekkefølge"),
      el("button.btn.sm", { onclick: () => { document.querySelectorAll("details.dyb-q[open]").forEach((d) => d.removeAttribute("open")); } }, "Lukk alle svar"),
      el("button.btn.sm.ghost", { onclick: () => {
        const bankLabel = (BANKS.find((b) => b.key === activeBank) || {}).label || activeBank;
        if (confirm(`Nullstille alle vurderinger («kunne»/«må øve») for banken «${bankLabel}»? Kan ikke angres.`)) {
          const st = S.store.get(); if (!st.dybde || !st.dybde.banks) st.dybde = { banks: {} };
          st.dybde.banks[activeBank] = { marks: {} }; S.store.emit();
          s.fLevels = new Set(levelKeysFor(activeBank)); s.fTopic = "alle"; s.viewMode = null; s.order = null; s.shuffled = false;
          S.app.refresh();
        }
      } }, "Nullstill denne banken"));
    panel.appendChild(el("div", { style: { marginTop: "8px" } }, seg));
    panel.appendChild(actions);
    return panel;
  }

  function paintStats(statsPanel, vis) {
    const c = counts();
    S.u.mount(statsPanel,
      el(".row.wrap", { style: { gap: "26px", alignItems: "center" } },
        el("div", el(".tiny.muted", "Viser"), el("div", { style: { fontWeight: 700, fontSize: "18px" } }, String(vis.length))),
        el("div", el(".tiny", { style: { color: "#1d7a47" } }, "Kunne"), el("div", { style: { fontWeight: 700, fontSize: "18px", color: "#1d7a47" } }, String(c.ok))),
        el("div", el(".tiny", { style: { color: "#b8324b" } }, "Må øve"), el("div", { style: { fontWeight: 700, fontSize: "18px", color: "#b8324b" } }, String(c.no))),
        el("div", el(".tiny.muted", "Ikke vurdert"), el("div", { style: { fontWeight: 700, fontSize: "18px" } }, String(c.unseen)))),
      dualBar(c));
  }
  function dualBar(c) {
    const b = el(".bar", { style: { marginTop: "12px", display: "flex" } });
    const okPct = c.total ? (c.ok / c.total) * 100 : 0;
    const noPct = c.total ? (c.no / c.total) * 100 : 0;
    b.appendChild(el("span", { style: { display: "block", height: "100%", width: okPct + "%", background: "var(--green)" } }));
    b.appendChild(el("span", { style: { display: "block", height: "100%", width: noPct + "%", background: "var(--rose)" } }));
    return b;
  }

  function paintList(listEl, statsPanel) {
    const vis = visible();
    paintStats(statsPanel, vis);
    S.u.clear(listEl);
    if (!vis.length) { listEl.appendChild(sh().empty("🔍", "Ingen spørsmål matcher filteret", "Prøv «Alle spørsmål», eller velg et annet nivå/tema.")); return; }
    const grouped = !fs().shuffled; // kun gruppert på nivå når rekkefølgen ikke er stokket
    let lastLvl = null;
    vis.forEach((q, idx) => {
      if (grouped && q.n !== lastLvl) {
        lastLvl = q.n;
        const info = (bank().lvl || {})[q.n] || [`Nivå ${q.n}`, ""];
        listEl.appendChild(el(".part-head", { style: { marginTop: idx ? "26px" : "0" } },
          el(".ptag", info[0]), el(".pname", info[1])));
      }
      listEl.appendChild(questionCard(q, idx + 1, statsPanel));
    });
  }

  function questionCard(q, displayNum, statsPanel) {
    const mark = markOf(q.id);
    const det = el("details.dyb-q" + (mark === "ok" ? ".done" : mark === "no" ? ".again" : ""));
    const sum = document.createElement("summary");
    sum.className = "dyb-qh";
    sum.appendChild(el(".dyb-num", String(displayNum)));
    const lvlLabel = ((bank().lvl || {})[q.n] || [])[0] || ("Nivå " + q.n);
    const qt = el(".dyb-qt", el(".dyb-qtext", q.s),
      el(".dyb-tags", el(".tag", q.k), el(".tag", lvlLabel)));
    sum.appendChild(qt);
    det.appendChild(sum);

    const ansWrap = el(".dyb-ans");
    const ansBody = el(".dyb-ansin"); ansBody.innerHTML = q.f;
    ansWrap.appendChild(ansBody);

    const self = el(".dyb-self", el("span", "Hvordan gikk det?"));
    const okBtn = el("button.dyb-sb.g" + (mark === "ok" ? ".on" : ""), { onclick: (e) => { e.stopPropagation(); afterMark(q.id, "ok", det, okBtn, noBtn, statsPanel); } }, "Kunne den");
    const noBtn = el("button.dyb-sb.r" + (mark === "no" ? ".on" : ""), { onclick: (e) => { e.stopPropagation(); afterMark(q.id, "no", det, okBtn, noBtn, statsPanel); } }, "Må øve");
    self.appendChild(okBtn); self.appendChild(noBtn);
    ansWrap.appendChild(self);
    det.appendChild(ansWrap);
    return det;
  }

  function afterMark(id, val, det, okBtn, noBtn, statsPanel) {
    setMark(id, val);
    const cur = markOf(id);
    det.classList.remove("done", "again");
    if (cur === "ok") det.classList.add("done"); else if (cur === "no") det.classList.add("again");
    okBtn.classList.toggle("on", cur === "ok");
    noBtn.classList.toggle("on", cur === "no");
    paintStats(statsPanel, visible());
  }

  function shuffleArr(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function weakCount() {
    const st = S.store.get();
    const banks = (st.dybde && st.dybde.banks) || {};
    let n = 0;
    Object.keys(banks).forEach((k) => { const m = (banks[k] && banks[k].marks) || {}; n += Object.values(m).filter((v) => v === "no").length; });
    return n;
  }

  S.views.dybde = { render, weakCount };
})(window.EDU);
