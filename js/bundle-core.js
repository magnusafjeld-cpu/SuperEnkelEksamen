/* ===================== CORE: parser, utils, store, srs, search, repetition, metrics, router ===================== */
window.EDU = window.EDU || {};

/* ---------------- utils ---------------- */
(function (S) {
  function el(spec, attrs, ...children) {
    let tag = "div", id = null; const classes = [];
    spec.split(/(?=[.#])/).forEach((part, i) => {
      if (i === 0 && !/[.#]/.test(part)) tag = part || "div";
      else if (part[0] === ".") classes.push(part.slice(1));
      else if (part[0] === "#") id = part.slice(1);
    });
    const node = document.createElement(tag);
    if (id) node.id = id;
    if (classes.length) node.className = classes.join(" ");
    /* Et tall som eneste barn ble tolket som attributt-objekt og forsvant i
       stillhet — el(".cnum", 3) ga en tom sirkel. Tall må derfor med her. */
    /* Tallet 0 er falsy, så `attrs &&` slapp det aldri gjennom til tall-grenen —
       og det havnet i attributt-slissen der `if (attrs)` også er falsy og kastet
       det. el(".cnum", 0) ga derfor tom sirkel på kapittel 0 i alle tre fagene,
       selv etter at tall ellers var fikset. Test typen først, ikke sannheten. */
    const erBarn = (v) => v != null && (v.nodeType || Array.isArray(v) || typeof v === "string" || typeof v === "number");
    if (erBarn(attrs)) { children.unshift(attrs); attrs = null; }
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === "class") node.className += " " + v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else if (k === "dataset") Object.assign(node.dataset, v);
        else node.setAttribute(k, v);
      }
    }
    appendChildren(node, children);
    return node;
  }
  function appendChildren(node, children) {
    children.flat().forEach((c) => {
      if (c == null || c === false) return;
      if (typeof c === "string" && c.slice(0, 4) === "<svg") {
        const span = document.createElement("span"); span.className = "ico-wrap"; span.innerHTML = c; node.appendChild(span); return;
      }
      node.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
    });
  }
  function frag(html) { const t = document.createElement("template"); t.innerHTML = html; return t.content.cloneNode(true); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }
  function mount(node, ...children) { clear(node); appendChildren(node, children); return node; }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }
  function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
  function parseISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
  function daysBetween(aISO, bISO) { return Math.round((parseISO(bISO) - parseISO(aISO)) / 86400000); }
  const MONTHS = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
  function formatDate(iso, opts) { const d = parseISO(iso); const s = `${d.getDate()}. ${MONTHS[d.getMonth()]}`; return opts && opts.year ? `${s} ${d.getFullYear()}` : s; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function nowTs() { return Date.now(); }
  function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; }
  let toastTimer;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = el(".toast"); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function ring(percent, size, label, sublabel, color) {
    size = size || 120; const stroke = size < 70 ? 6 : 9; const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r; const off = c * (1 - clamp(percent, 0, 100) / 100);
    const wrap = el(".ring", { style: { width: size + "px", height: size + "px" } });
    wrap.innerHTML =
      `<svg width="${size}" height="${size}"><circle class="ring-bg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"></circle><circle class="ring-fg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${off}" ${color ? `style="stroke:${color}"` : ""}></circle></svg><div class="ring-label">${label != null ? `<div class="v">${label}</div>` : ""}${sublabel ? `<div class="l">${sublabel}</div>` : ""}</div>`;
    return wrap;
  }
  function bar(percent, opts) {
    opts = opts || {};
    const b = el("div.bar" + (opts.green ? ".green" : "") + (opts.thin ? ".thin" : ""));
    b.appendChild(el("span", { style: { width: clamp(percent, 0, 100) + "%" } }));
    return b;
  }
  const ICONS = {
    home: 'M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9',
    user: 'M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5M4.5 20.5a7.5 7.5 0 0 1 15 0',
    calendar: 'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 9h16M8 3v4M16 3v4',
    book: 'M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM18 16H7a2 2 0 0 0-2 2',
    cards: 'M4 8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM18 7l2 .7a2 2 0 0 1 1.2 2.5l-2 6',
    quiz: 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7M12 17h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
    exam: 'M12 3 3 7l9 4 9-4zM3 7v6m6 1.5 3 1.3 3-1.3M7 10v5c0 1.1 2.2 2.5 5 2.5s5-1.4 5-2.5v-5',
    layers: 'M4 7.5h16M4 12h16M4 16.5h10',
    repeat: 'M4 9a8 8 0 0 1 14-3l2 2M20 4v4h-4M20 15a8 8 0 0 1-14 3l-2-2M4 20v-4h4',
    search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3',
    chart: 'M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-8',
    grid: 'M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v6H4zM13 14h7v6h-7z',
    check: 'M5 12.5 10 17 19 7', arrow: 'M9 6l6 6-6 6',
    bolt: 'M13 2 4.5 13.5h5L8 22l8.5-11.5h-5z',
    target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
    flag: 'M5 21V4M5 4h12l-2 4 2 4H5',
  };
  function icon(name, cls) { const p = ICONS[name] || ICONS.home; return `<svg class="ico ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"></path></svg>`; }

  /* ---------- diktering ----------
     Hele kurset insisterer på at du skal si svaret høyt. Da er det rart å tvinge
     deg til å skrive det. Denne bruker nettleserens egen taleoppkjenning, som
     finnes i Chrome, Edge og Safari fra 14.1 — og returnerer null der den ikke
     gjør det, så knappen forsvinner i stedet for å ligge død.

     To ting å vite: lyden går til nettleserleverandørens servere (Google i
     Chrome, Apple i Safari), og norsk diktering setter ikke tegnsetting. Det
     første står i teksten under knappen; det andre spiller liten rolle når du
     skriver stikkord, som er det du skal.

     På iPhone finnes dessuten mikrofonen på selve tastaturet, som virker i alle
     felt uten at appen gjør noe. Denne knappen er bare raskere. */
  function diktering(ta, onEndring, språk) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;

    let r = null, aktiv = false, stoppetAvBruker = false;
    const knapp = el("button.btn.sm", { type: "button", title: "Diktér svaret i stedet for å skrive det" }, "🎙 Diktér");
    const live = el(".tiny.muted", { style: { minHeight: "1.2em", fontStyle: "italic" } });

    const settTilstand = (på) => {
      aktiv = på;
      knapp.textContent = på ? "⏹ Stopp diktering" : "🎙 Diktér";
      knapp.className = "btn sm" + (på ? " primary" : "");
      if (!på) live.textContent = "";
    };

    function leggTil(tekst) {
      const t = tekst.trim();
      if (!t) return;
      const skille = ta.value && !/\s$/.test(ta.value) ? " " : "";
      ta.value = ta.value + skille + t;
      ta.scrollTop = ta.scrollHeight;
      if (onEndring) onEndring(ta.value);
    }

    function start() {
      r = new SR();
      r.lang = språk || "nb-NO";
      r.continuous = true;
      r.interimResults = true;
      r.onresult = (e) => {
        let foreløpig = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) leggTil(res[0].transcript); else foreløpig += res[0].transcript;
        }
        live.textContent = foreløpig ? "… " + foreløpig : "";
      };
      r.onerror = (e) => {
        stoppetAvBruker = true;
        settTilstand(false);
        const m = { "not-allowed": "Mikrofonen er ikke tillatt. Gi tilgang i nettleserens innstillinger.",
                    "service-not-allowed": "Nettleseren tillater ikke taleoppkjenning her.",
                    "audio-capture": "Fant ingen mikrofon.",
                    "no-speech": "Hørte ingenting — prøv igjen." }[e.error];
        if (m) toast(m);
      };
      /* Chrome stopper av seg selv etter en pause. Start på nytt så lenge
         brukeren ikke har trykket stopp, ellers avbrytes du midt i en setning. */
      r.onend = () => { if (aktiv && !stoppetAvBruker) { try { r.start(); } catch (e) { settTilstand(false); } } };
      try { r.start(); settTilstand(true); } catch (e) { settTilstand(false); }
    }

    knapp.addEventListener("click", () => {
      if (aktiv) { stoppetAvBruker = true; settTilstand(false); if (r) try { r.stop(); } catch (e) {} return; }
      stoppetAvBruker = false; start();
    });

    /* Stopp om feltet forsvinner fra skjermen — ellers ligger mikrofonen åpen. */
    const vakt = setInterval(() => {
      if (!document.body.contains(ta)) { clearInterval(vakt); if (r) try { r.abort(); } catch (e) {} }
    }, 2000);

    const rad = el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginTop: "8px" } },
      knapp, el(".tiny.muted", "Lyden går til nettleserleverandøren. Diktering setter ikke tegnsetting — skriv stikkord."));
    return el("div", rad, live);
  }

  S.u = { el, frag, clear, mount, escapeHtml, todayISO, parseISO, daysBetween, formatDate, clamp, nowTs, debounce, toast, ring, bar, icon, ICONS, diktering };
})(window.EDU);

/* ---------------- parse-manual ---------------- */
(function (S) {
  /* Delinndelingen er fagspesifikk. Manifestet (subjects.js -> parts) eier den;
     uten manifest brukes SAM3s opprinnelige tabell, så eksisterende fag er uendret.
     Merk: partId/partTag lagres i den bufrede pensumparsingen — endrer du parts i
     manifestet, må «Last innhold på nytt» kjøres for at det skal slå gjennom. */
  const DEFAULT_PARTS = [
    { id: 0, tag: "Del 0", name: "Rammeverk", chapters: [0, 1] },
    { id: 1, tag: "Del I", name: "Oppgave 1: Nasjonalregnskap og måling", chapters: [2, 3, 4, 5] },
    { id: 2, tag: "Del II", name: "Oppgave 2: Vekst på lang sikt", chapters: [6, 7, 8, 9, 10, 11, 12] },
    { id: 3, tag: "Del III", name: "Oppgave 3: Den kortsiktige modellen", chapters: [13, 14, 15, 16, 17, 18, 19] },
    { id: 4, tag: "Del IV", name: "Anvendelse og repetisjon", chapters: [20, 21, 22, 23] },
  ];
  function partsTable() {
    const m = (window.EDU_SUBJECT || {}).parts;
    return (Array.isArray(m) && m.length) ? m : DEFAULT_PARTS;
  }
  const partFor = (n) => { const t = partsTable(); return t.find((p) => p.chapters.includes(n)) || t[t.length - 1]; };
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const txt = (el) => (el ? norm(el.textContent) : "");
  function calloutOf(el) {
    const h = el.querySelector(".h"); const heading = h ? norm(h.textContent) : "";
    const clone = el.cloneNode(true); const hc = clone.querySelector(".h"); if (hc) hc.remove();
    return { heading, text: norm(clone.textContent), html: clone.innerHTML.trim() };
  }
  function formulaOf(el) {
    const eqs = [...el.querySelectorAll(".eq")]; const where = el.querySelector(".where");
    return { eq: eqs.map((d) => d.innerHTML.trim()), eqText: eqs.map((d) => norm(d.textContent)), where: txt(where), whereHtml: where ? where.innerHTML.trim() : "" };
  }
  function splitSections(container) {
    const sections = []; let cur = null;
    [...container.childNodes].forEach((node) => {
      if (node.nodeType === 1 && node.tagName === "H3") {
        const title = norm(node.textContent); const m = title.match(/^(\d+\.\d+)\s+(.*)$/);
        cur = { id: m ? m[1] : "", title: m ? m[2] : title, _nodes: [node] }; sections.push(cur);
      } else if (cur) cur._nodes.push(node);
    });
    /* Bare id, tittel og litt tekst lagres. Seksjonens egen HTML var en full kopi
       av kapittelteksten og ble aldri lest; teksten brukes kun av søkeindeksen,
       som klipper på 600 tegn. Dette holder den bufrede parsingen liten nok til
       at den får plass i localStorage ved siden av de andre fagene. */
    return sections.map((s) => {
      const wrap = document.createElement("div"); s._nodes.forEach((n) => wrap.appendChild(n.cloneNode(true)));
      return { id: s.id, title: s.title, text: norm(wrap.textContent).slice(0, 800) };
    });
  }
  function parseChapter(sec) {
    const num = parseInt(sec.id.slice(1), 10); const part = partFor(num);
    const clone = sec.cloneNode(true);
    clone.querySelectorAll("a.backtotop, h2.part, hr.sec").forEach((n) => n.remove());
    const chapEl = clone.querySelector("h2.chap");
    const fullTitle = chapEl ? norm(chapEl.textContent) : "Kapittel " + num;
    const title = fullTitle.replace(/^(?:Kapittel\s+)?\d+\s*[·.]\s*/, "").trim();
    const body = document.createElement("div");
    let n = chapEl ? chapEl.nextSibling : clone.firstChild;
    while (n) { body.appendChild(n.cloneNode(true)); n = n.nextSibling; }
    const leadEl = body.querySelector("p.lead, p.lead-in"); const leadIn = txt(leadEl);
    const sections = splitSections(body);
    const formulas = [...body.querySelectorAll(".formula")].map(formulaOf).filter((f) => f.eq.length || f.where);
    const tips = [...body.querySelectorAll(".callout.tip")].map(calloutOf);
    const mistakes = [...body.querySelectorAll(".callout.mistake")].map(calloutOf);
    const mechanisms = [...body.querySelectorAll(".callout.mech")].map(calloutOf);
    const links = [...body.querySelectorAll(".callout.link")].map(calloutOf);
    const warnings = [...body.querySelectorAll(".callout.warn")].map(calloutOf);
    const fullText = norm(body.textContent);
    const counts = { figures: body.querySelectorAll("figure").length, worked: body.querySelectorAll(".worked").length, tables: body.querySelectorAll("table").length, formulas: formulas.length, sections: sections.length, words: fullText.split(" ").filter(Boolean).length };
    /* Ordtellingen tas av hele teksten, men bare starten lagres: søkeindeksen
       leser uansett kun de første 1200 tegnene (se search.build). */
    const searchText = fullText.slice(0, 1400);
    return { id: sec.id, num, partId: part.id, partTag: part.tag, partName: part.name, title, fullTitle, leadIn, html: body.innerHTML, sections, formulas, tips, mistakes, mechanisms, links, warnings, counts, searchText };
  }
  function tableRows(table) { return [...table.querySelectorAll("tr")].map((tr) => [...tr.querySelectorAll("th,td")].map((c) => norm(c.textContent))); }
  /* Hvilke seksjoner som er referansekapitler er fagspesifikt. Manifestet kan
     overstyre via manual.refSections; defaultene er SAM3s k21/k22/k23. */
  /* Erklærer faget refSections i det hele tatt, gjelder bare det som står der.
     Ellers arvet FIE402 SAM3s #k21 og #k23 for rollene det ikke satte — og siden
     det ER ekte kapitler hos FIE402, ble examPatterns fylt med opsjonsutbetalinger
     og coverage med binomiske tall. Feilen var usynlig fordi ingen leser dem. */
  function refSection(doc, role, fallbackId) {
    const cfg = ((window.EDU_SUBJECT || {}).manual || {}).refSections;
    const id = cfg ? cfg[role] : fallbackId;
    return id ? doc.querySelector("#" + id) : null;
  }
  function parseReference(doc) {
    const ref = { formulaTables: [], examPatterns: [], coverage: [], checklists: [] };
    const k22 = refSection(doc, "formulas", "k22");
    if (k22) k22.querySelectorAll("h3").forEach((h3) => {
      if (!/^\d+\.\d+/.test(norm(h3.textContent))) return;
      let el = h3.nextElementSibling; while (el && el.tagName !== "TABLE") el = el.nextElementSibling;
      if (!el || !el.classList.contains("data")) return;
      const rows = tableRows(el); const header = rows[0] || [];
      const out = rows.slice(1).filter((r) => r.length >= 3).map((r) => ({ term: r[0], formula: r[1], point: r[2] }));
      ref.formulaTables.push({ title: norm(h3.textContent).replace(/^\d+\.\d+\s*/, ""), header, rows: out });
    });
    const k21 = refSection(doc, "patterns", "k21");
    if (k21) { const t = k21.querySelector("table.data"); if (t) tableRows(t).slice(1).filter((r) => r.length >= 4).forEach((r) => ref.examPatterns.push({ exam: r[0], task1: r[1], task2: r[2], task3: r[3] })); }
    const k23 = refSection(doc, "coverage", "k23");
    if (k23) {
      const t = k23.querySelector("table.data"); if (t) tableRows(t).slice(1).filter((r) => r.length >= 3).forEach((r) => ref.coverage.push({ lecture: r[0], topic: r[1], chapters: r[2] }));
      k23.querySelectorAll(".callout.tip").forEach((c) => ref.checklists.push(calloutOf(c)));
    }
    return ref;
  }
  S.parseManual = function (htmlText) {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const chapters = [...doc.querySelectorAll("section[id]")].filter((s) => /^k\d+$/.test(s.id)).map(parseChapter).sort((a, b) => a.num - b.num);
    return { curriculum: chapters, reference: parseReference(doc) };
  };
})(window.EDU);

/* ---------------- parse-problems (oppgavebank med fasit) ---------------- */
(function (S) {
  const norm = (s) => (s || "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  const cfgProblems = () => ((window.EDU_SUBJECT || {}).problems) || {};
  const DEFAULT_TYPE_RULES = [["grpov", "Gruppeøving"], ["innlev", "Innlevering"], ["sv", "Sensorveiledning"]];
  function typeOf(id) {
    const rules = cfgProblems().typeRules || DEFAULT_TYPE_RULES;
    for (const [prefix, label] of rules) if (id.startsWith(prefix)) return label;
    return cfgProblems().typeFallback || "Eksamen";
  }
  const DEFAULT_TOPIC_RULES = [
    ["Oppgave 1 · Måling", /nasjonalregnskap|\bbnp\b|real (?:vs|og)|laspeyres|paasche|deflator|sparing|driftsbalanse|produksjonsgap|tre måter|tre måtane/i],
    ["Oppgave 2 · Vekst", /solow|romer|\bvekst\b|\btfp\b|produksjonsfunksjon|teknologi|konvergens|\bideer\b|patent|bærekraft|fattigdom|nåverdi|fisher|gylden sparerate/i],
    ["Oppgave 2 · Arbeid/inflasjon", /arbeidsmarked|ledighet|badekar|\bokun|sysselsetting|permittering|hyperinflasjon|seignorage|humankapital/i],
    ["Oppgave 3 · Kort sikt", /\bis-?mp|as-?ad|phillips|pengepolitikk|taylor|\brente|inflasjonsmål|konjunktur|finansielt sjokk|stabiliser|norges bank/i],
    ["Åpen økonomi", /\bnok\b|valuta|\buip\b|trilemma|\bppp\b|krone|åpen økonomi|twin deficit/i],
  ];
  /* Temareglene er fagspesifikke. Manifestet kan gi egne som [etikett, regex-kilde];
     en tom liste slår temamerkingen av helt i stedet for å merke alt «Blandet». */
  function topicRules() {
    const m = cfgProblems().topicRules;
    if (!Array.isArray(m)) return DEFAULT_TOPIC_RULES;
    return m.map(([tag, rx]) => [tag, rx instanceof RegExp ? rx : new RegExp(rx, "i")]);
  }
  function tagTopics(text) {
    const rules = topicRules();
    if (!rules.length) return [];
    const t = text || ""; const tags = [];
    rules.forEach(([tag, rx]) => { if (rx.test(t)) tags.push(tag); });
    return tags.length ? tags : ["Blandet"];
  }
  S.parseProblems = function (htmlText) {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const out = [];
    doc.querySelectorAll("section.doc[id]").forEach((sec) => {
      const id = sec.id;
      const titleEl = sec.querySelector("h2.title");
      const subjEl = sec.querySelector(".subj");
      const noteEl = sec.querySelector(".note");
      const q = sec.querySelector(".qa .q .verbatim");
      const a = sec.querySelector(".qa .a .verbatim");
      const title = titleEl ? titleEl.textContent.trim() : id;
      const subj = subjEl ? subjEl.textContent.replace(/^\s*Tema:\s*/i, "").trim() : "";
      out.push({
        id, type: typeOf(id), title, subj,
        note: noteEl ? noteEl.textContent.trim() : "",
        qText: q ? norm(q.textContent) : "",
        aText: a ? norm(a.textContent) : "",
        hasFasit: !!(a && a.textContent.trim().length),
        topics: tagTopics(subj + " " + title),
      });
    });
    return out;
  };
})(window.EDU);

/* ---------------- store ----------------
   Fremdriften lagres per fag under "edu.<fagId>.progress.v1". Lageret åpnes av
   boot når faget er valgt; open() migrerer den gamle ufagede SAM3-nøkkelen første
   gang. state.savedAt er tidsstempelet sky-synken bruker til å avgjøre hvem som
   er nyest. */
(function (S) {
  const D = window.EDU_DATA;
  const LEGACY_KEY = "sam3.progress.v1";   // fra tiden før fag-velgeren
  let subjectId = "sam3", KEY = "edu.sam3.progress.v1";
  const defaults = () => ({ version: 1, startedAt: S.u.todayISO(), savedAt: 0, chapters: {}, days: {}, sections: {}, quiz: { answered: {}, sessions: [] }, cards: {}, active: {}, exams: {}, settings: {}, lyn: { xp: 0, days: {}, plays: 0, best: {} }, dybde: { banks: {} } });
  function migrate(state) {
    // eldre versjon lagret dybdetrening-vurderinger flatt (state.dybde.marks); flytt inn i "kort"-banken
    if (state.dybde && state.dybde.marks && !state.dybde.banks) {
      state.dybde = { banks: { kort: { marks: state.dybde.marks }, lang: { marks: {} } } };
    }
    if (!state.dybde || !state.dybde.banks) state.dybde = { banks: {} };   // bankene opprettes når de tas i bruk
    if (!state.savedAt) state.savedAt = 0;
    return state;
  }
  function readKey(k) { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
  function load() {
    let raw = readKey(KEY);
    if (!raw && subjectId === "sam3") raw = readKey(LEGACY_KEY);   // arv fra før-fag-versjonen
    return raw ? migrate(Object.assign(defaults(), raw)) : defaults();
  }
  let state = load(); const subs = new Set();
  function open(id) { subjectId = id; KEY = "edu." + id + ".progress.v1"; state = load(); }
  const persist = S.u.debounce(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }, 120);
  function emit() { state.savedAt = S.u.nowTs(); subs.forEach((fn) => fn(state)); persist(); }
  function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
  function get() { return state; }
  /* Brukes av sky-synken når fjernversjonen har vunnet: bytt hele staten uten å
     stemple nytt savedAt (ellers ville hver innlasting sett ut som en endring). */
  function adopt(next) { state = migrate(Object.assign(defaults(), next)); subs.forEach((fn) => fn(state)); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function touchChapter(num) { const c = state.chapters[num] || (state.chapters[num] = {}); c.lastSeen = S.u.todayISO(); emit(); }
  function setChapterRead(num, read) { const c = state.chapters[num] || (state.chapters[num] = {}); c.read = read; c.lastSeen = S.u.todayISO(); emit(); }
  function setUnderstanding(num, val) { const c = state.chapters[num] || (state.chapters[num] = {}); c.understanding = (c.understanding === val) ? null : val; c.lastSeen = S.u.todayISO(); emit(); }
  function setSectionRead(key, read) { state.sections[key] = read; emit(); }
  function setDayComplete(day, done) { state.days[day] = { completed: done, completedAt: done ? S.u.todayISO() : null }; emit(); }
  function recordAnswer(qid, correct) { const a = state.quiz.answered[qid] || (state.quiz.answered[qid] = { correct: false, attempts: 0 }); a.attempts++; a.correct = correct; a.lastTs = S.u.nowTs(); emit(); }
  function recordQuizSession(sess) { state.quiz.sessions.unshift(Object.assign({ ts: S.u.nowTs() }, sess)); emit(); }
  function setExam(taskId, patch) { state.exams[taskId] = Object.assign(state.exams[taskId] || {}, patch); emit(); }
  function setActiveDone(key, done) { state.active[key] = done; emit(); }
  function resetAll() { state = defaults(); emit(); }
  function card(id) { return state.cards[id]; }
  function setCard(id, obj) { state.cards[id] = obj; emit(); }
  S.store = { get, open, adopt, subscribe, emit, persist, touchChapter, setChapterRead, setUnderstanding, setSectionRead, setDayComplete, recordAnswer, recordQuizSession, setExam, setActiveDone, resetAll, card, setCard, subjectId: () => subjectId };

  // data facade — curriculum/reference filled at runtime via bootData
  let byNum = null;
  function ensureIndex() { if (!byNum) { byNum = {}; (D.curriculum || []).forEach((c) => (byNum[c.num] = c)); } return byNum; }
  S.bootData = function (curriculum, reference) { D.curriculum = curriculum; D.reference = reference; byNum = null; ensureIndex(); };
  S.bootProblems = function (problems) { D.problems = problems; };
  function chapter(num) { return ensureIndex()[num]; }
  function chapters() { return D.curriculum || []; }
  function parts() {
    const map = new Map();
    (D.curriculum || []).forEach((c) => { if (!map.has(c.partId)) map.set(c.partId, { id: c.partId, tag: c.partTag, name: c.partName, chapters: [] }); map.get(c.partId).chapters.push(c); });
    return [...map.values()].sort((a, b) => a.id - b.id);
  }
  function day(n) { return D.plan.days.find((d) => d.day === n); }
  function days() { return D.plan.days; }
  function quizzesForChapter(num) { return (D.quizzes || []).filter((q) => q.ch === num); }
  function activeFor(num) { return (D.activeLearning || {})[num] || []; }
  /* To plantyper. "dates" (default) er SAM3s: dagen følger kalenderen fra startDate.
     "modules" er for selvpasede fag uten datoer — «i dag» er første ufullførte modul,
     så planen aldri går ut på dato eller står fast på siste dag. */
  function planMode() { return (D.plan && D.plan.mode) || "dates"; }
  function activeDayIndex() {
    const list = (D.plan && D.plan.days) || [];
    if (planMode() === "modules") {
      const st = S.store.get();
      const next = list.find((d) => !(st.days[d.day] && st.days[d.day].completed));
      return next ? next.day : (list.length ? list[list.length - 1].day : 1);
    }
    const diff = S.u.daysBetween(D.plan.startDate, S.u.todayISO()); if (diff < 0) return 1;
    return S.u.clamp(diff + 1, 1, D.plan.totalDays);
  }
  function daysUntilStart() { return planMode() === "modules" ? 0 : S.u.daysBetween(S.u.todayISO(), D.plan.startDate); }
  function problems() { return D.problems || []; }
  function problemById(id) { return (D.problems || []).find((p) => p.id === id); }
  // getters hele veien: fagets datafil lastes dynamisk *etter* denne modulen,
  // så ingenting her kan snapshotte D.plan/D.exams/D.glossary ved definisjon.
  S.data = { raw: D, chapter, chapters, parts, day, days, quizzesForChapter, activeFor, activeDayIndex, daysUntilStart, planMode, problems, problemById, get reference() { return D.reference; }, get plan() { return D.plan; }, get exams() { return D.exams; }, get glossary() { return D.glossary || { economists: [], symbols: [] }; } };
})(window.EDU);

/* ---------------- srs ---------------- */
(function (S) {
  const INTERVALS = [0, 1, 3, 7, 16, 35]; const MAXBOX = INTERVALS.length - 1;
  let _deck = null;
  function deck() {
    if (_deck) return _deck;
    const cards = [];
    (S.data.raw.flashcards || []).forEach((c) => cards.push({ id: c.id, ch: c.ch, deck: c.deck, front: c.front, back: c.back, kind: "konsept" }));
    (S.data.reference.formulaTables || []).forEach((tbl, ti) => tbl.rows.forEach((row, ri) =>
      cards.push({ id: `fmla-${ti}-${ri}`, ch: null, deck: "formel", front: `Formel: ${row.term}`, back: `<b>${S.u.escapeHtml(row.formula)}</b><br><span style="opacity:.8">${S.u.escapeHtml(row.point)}</span>`, topic: tbl.title, kind: "formel" })));
    _deck = cards; return cards;
  }
  function isDue(id) { const st = S.store.card(id); if (!st) return true; return S.u.daysBetween(st.due, S.u.todayISO()) >= 0; }
  function dueCards(filterDeck) { return deck().filter((c) => (!filterDeck || filterDeck === "alle" || c.deck === filterDeck) && isDue(c.id)); }
  function stateOf(id) { const st = S.store.card(id); if (st) return st; return { box: 0, due: S.u.todayISO(), reviews: 0, lapses: 0, isNew: true }; }
  function rate(id, grade) {
    const cur = S.store.card(id) || { box: 0, reviews: 0, lapses: 0 };
    let box = cur.box || 0; let lapses = cur.lapses || 0;
    if (grade === "again") { box = 0; lapses++; }
    else if (grade === "hard") box = Math.max(0, box);
    else if (grade === "good") box = Math.min(MAXBOX, box + 1);
    else if (grade === "easy") box = Math.min(MAXBOX, box + 2);
    let interval = INTERVALS[box];
    if (grade === "hard") interval = Math.max(1, Math.round(INTERVALS[box] / 2)) || 1;
    if (grade === "again") interval = 0;
    const due = new Date(S.u.parseISO(S.u.todayISO()).getTime() + interval * 86400000);
    const dueISO = `${due.getFullYear()}-${String(due.getMonth() + 1).padStart(2, "0")}-${String(due.getDate()).padStart(2, "0")}`;
    S.store.setCard(id, { box, due: dueISO, reviews: (cur.reviews || 0) + 1, lapses, lastTs: S.u.nowTs() });
  }
  function stats() {
    const all = deck(); let mastered = 0, learning = 0, fresh = 0, due = 0;
    all.forEach((c) => { const st = S.store.card(c.id); if (!st) { fresh++; due++; return; } if (st.box >= 4) mastered++; else learning++; if (isDue(c.id)) due++; });
    return { total: all.length, mastered, learning, fresh, due, masteredPct: all.length ? Math.round((mastered / all.length) * 100) : 0 };
  }
  S.srs = { deck, dueCards, rate, isDue, stateOf, stats, INTERVALS, MAXBOX };
})(window.EDU);

/* ---------------- search ---------------- */
(function (S) {
  let index = null;
  const norm = (s) => (s || "").toLowerCase();
  function build() {
    if (index) return index; index = [];
    const add = (e) => { e.hay = norm((e.title || "") + " " + (e.snippet || "") + " " + (e.extra || "")); index.push(e); };
    S.data.chapters().forEach((c) => {
      add({ type: "Kapittel", typed: "kap", title: c.title, snippet: c.leadIn, extra: c.searchText.slice(0, 1200), route: `#/chapter/${c.num}`, weight: 3, ch: c.num });
      c.sections.forEach((sec) => add({ type: "Seksjon", typed: "sec", title: sec.title, snippet: (sec.text || "").slice(0, 180), extra: sec.text.slice(0, 600), route: `#/chapter/${c.num}`, weight: 1.5, ch: c.num }));
      (c.html.match(/<figcaption>([\s\S]*?)<\/figcaption>/g) || []).forEach((f) => { const cap = f.replace(/<[^>]+>/g, ""); add({ type: "Figur", typed: "fig", title: cap.split("—")[0].trim() || "Figur", snippet: cap, route: `#/chapter/${c.num}`, weight: 1.4, ch: c.num }); });
    });
    (S.data.reference.formulaTables || []).forEach((tbl) => tbl.rows.forEach((r) => add({ type: "Formel", typed: "formel", title: r.term, snippet: r.formula, extra: r.point, route: "#/flashcards", weight: 2.2 })));
    (S.data.raw.flashcards || []).forEach((c) => add({ type: "Begrep", typed: "begrep", title: c.front, snippet: c.back, route: c.ch ? `#/chapter/${c.ch}` : "#/flashcards", weight: 2, ch: c.ch }));
    (S.data.glossary.economists || []).forEach((e) => add({ type: "Økonom", typed: "okonom", title: e.name, snippet: e.note, route: e.chapters && e.chapters[0] ? `#/chapter/${e.chapters[0]}` : "#/curriculum", weight: 2 }));
    (S.data.glossary.symbols || []).forEach((e) => add({ type: "Variabel", typed: "var", title: e.sym, snippet: e.name, extra: e.name, route: e.chapters && e.chapters[0] ? `#/chapter/${e.chapters[0]}` : "#/curriculum", weight: 1.8 }));
    return index;
  }
  function search(query, typeFilter) {
    const idx = build(); const q = norm(query).trim(); if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean); const results = [];
    idx.forEach((e) => {
      if (typeFilter && typeFilter !== "alle" && e.typed !== typeFilter) return;
      let sc = 0; const titleN = norm(e.title);
      tokens.forEach((t) => { if (titleN === t) sc += 14 * e.weight; else if (titleN.startsWith(t)) sc += 9 * e.weight; else if (titleN.includes(t)) sc += 6 * e.weight; if (e.hay.includes(t)) sc += 1.4 * e.weight; });
      if (tokens.every((t) => e.hay.includes(t)) && sc === 0) sc = 0.8 * e.weight;
      if (sc > 0) results.push({ e, sc });
    });
    results.sort((a, b) => b.sc - a.sc);
    return results.slice(0, 40).map((r) => r.e);
  }
  function typeColor(typed) { return ({ kap: "accent", sec: "slate", formel: "indigo", begrep: "teal", okonom: "amber", var: "green", fig: "rose" })[typed] || "slate"; }
  S.search = { search, build, typeColor };
})(window.EDU);

/* ---------------- repetition ---------------- */
(function (S) {
  let _freq = null;
  function examFrequency() { if (_freq) return _freq; _freq = {}; ((S.data.exams || {}).tasks || []).forEach((t) => (t.chapters || []).forEach((ch) => { _freq[ch] = (_freq[ch] || 0) + 1; })); return _freq; }
  function quizAccuracy(num) {
    const qs = S.data.quizzesForChapter(num); const ans = S.store.get().quiz.answered; let answered = 0, correct = 0;
    qs.forEach((q) => { const a = ans[q.id]; if (a) { answered++; if (a.correct) correct++; } });
    return { answered, correct, ratio: answered ? correct / answered : null };
  }
  function score(num) {
    const st = S.store.get(); const ch = st.chapters[num] || {}; const freq = examFrequency()[num] || 0; const reasons = []; let s = 0;
    if (ch.understanding === "unsure") { s += 55; reasons.push("Markert som usikker"); }
    if (ch.read && ch.lastSeen) { const d = S.u.daysBetween(ch.lastSeen, S.u.todayISO()); if (d >= 2) { s += Math.min(d * 4, 32); reasons.push(`Ikke sett på ${d} dager`); } }
    else if (!ch.read) { s += 8; reasons.push("Ikke lest ennå"); }
    if (freq >= 2) { s += freq * 9; reasons.push(`Sentralt eksamenstema (i ${freq} tidligere oppgaver)`); } else if (freq === 1) s += 6;
    const acc = quizAccuracy(num);
    if (acc.answered >= 1 && acc.ratio != null && acc.ratio < 0.7) { s += Math.round((1 - acc.ratio) * 30); reasons.push(`Svak quizscore (${acc.correct}/${acc.answered})`); }
    /* Var hardkodet til SAM3s kapittel 13–19 og gjaldt ubetinget i alle fag.
       Nå fagets eget: manifest.repetition.boost = { from, to, why }. */
    const b = ((window.EDU_SUBJECT || {}).repetition || {}).boost;
    if (b && b.why && b.from != null && b.to != null && num >= b.from && num <= b.to) { s += (b.vekt || 6); reasons.push(b.why); }
    return { num, score: s, reasons };
  }
  /* Hvilke kapitler som er "pensum" er fagspesifikt. To knapper fordi SAM3 har hatt
     ulikt spenn for repetisjon (1-22) og fremdrift (1-23) siden starten; å slå dem
     sammen ville flyttet hans prosenter. Nye fag setter bare coreChapters. */
  function reviewRange() {
    const s = window.EDU_SUBJECT || {};
    return s.reviewChapters || s.coreChapters || { from: 1, to: 22 };
  }
  function suggest(limit) {
    const r = reviewRange();
    const list = S.data.chapters().filter((c) => c.num >= r.from && c.num <= r.to).map((c) => Object.assign(score(c.num), { chapter: c })).sort((a, b) => b.score - a.score);
    const ranked = list.map((r) => Object.assign(r, { priority: r.score >= 55 ? "high" : r.score >= 28 ? "med" : "low" }));
    return limit ? ranked.slice(0, limit) : ranked;
  }
  S.repetition = { suggest, score, examFrequency, quizAccuracy };
})(window.EDU);

/* ---------------- metrics ---------------- */
(function (S) {
  function coreRange() { return (window.EDU_SUBJECT || {}).coreChapters || { from: 1, to: 23 }; }
  function coreChapters() { const r = coreRange(); return S.data.chapters().filter((c) => c.num >= r.from && c.num <= r.to); }
  function readPct() { const core = coreChapters(); const st = S.store.get(); const read = core.filter((c) => st.chapters[c.num] && st.chapters[c.num].read).length; return { read, total: core.length || 1, pct: Math.round((read / (core.length || 1)) * 100) }; }
  function understoodCount() { const st = S.store.get(); let understood = 0, unsure = 0; coreChapters().forEach((c) => { const v = st.chapters[c.num] && st.chapters[c.num].understanding; if (v === "understood") understood++; else if (v === "unsure") unsure++; }); return { understood, unsure }; }
  /* Mangler totalDays, ble hele beredskapsringen «NaN % klar» — på hver eneste
     side, siden sidepanelet viser den samme verdien. Del aldri på noe et fag kan
     glemme å sette. */
  function daysPct() {
    const st = S.store.get(); const done = Object.values(st.days).filter((d) => d && d.completed).length;
    const total = (S.data.plan && S.data.plan.totalDays) || (S.data.plan && (S.data.plan.days || []).length) || 0;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  function quizStats() { const ans = S.store.get().quiz.answered; const ids = Object.keys(ans); const correct = ids.filter((k) => ans[k].correct).length; const acc = ids.length ? Math.round((correct / ids.length) * 100) : null; return { answered: ids.length, correct, accuracy: acc, total: (S.data.raw.quizzes || []).length }; }
  function readiness() {
    // Coverage-based: every component measures how much is DONE, not a rate.
    // (A single correct quiz answer must not move the needle much.)
    const r = readPct(), d = daysPct(), c = S.srs.stats(), q = quizStats();
    const quizCoverage = q.total ? Math.round((q.correct / q.total) * 100) : 0;
    const parts = [
      { v: r.pct, w: 0.45 },
      { v: d.pct, w: 0.25 },
      { v: c.masteredPct, w: 0.18 },
      { v: quizCoverage, w: 0.12 },
    ];
    const wsum = parts.reduce((a, p) => a + p.w, 0);
    return Math.round(parts.reduce((a, p) => a + p.v * p.w, 0) / wsum);
  }
  function nextMilestone() { const st = S.store.get(); const ds = S.data.days(); for (const day of ds) { if (!(st.days[day.day] && st.days[day.day].completed)) return { day: day.day, label: day.milestone, date: day.date }; } const last = ds[ds.length - 1]; return { day: last.day, label: last.milestone, date: last.date }; }
  function streak() {
    const st = S.store.get(); const dates = new Set();
    Object.values(st.days).forEach((d) => d && d.completedAt && dates.add(d.completedAt));
    Object.values(st.chapters).forEach((c) => c && c.lastSeen && dates.add(c.lastSeen));
    let n = 0;
    for (let i = 0; i < 30; i++) { const d = new Date(Date.now() - i * 86400000); const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; if (dates.has(iso)) n++; else if (i > 0) break; }
    return n;
  }
  S.metrics = { coreChapters, readPct, understoodCount, daysPct, quizStats, readiness, nextMilestone, streak };
})(window.EDU);

/* ---------------- router ---------------- */
(function (S) {
  const routes = []; let notFound = null; let current = { path: "/", params: {}, query: {} };
  function on(pattern, handler) { const keys = []; const rx = new RegExp("^" + pattern.replace(/:[^/]+/g, (m) => { keys.push(m.slice(1)); return "([^/]+)"; }) + "$"); routes.push({ rx, keys, handler, pattern }); }
  function setNotFound(fn) { notFound = fn; }
  function parse() {
    let hash = location.hash.replace(/^#/, "") || "/"; if (hash[0] !== "/") hash = "/" + hash;
    const [path, qs] = hash.split("?"); const query = {};
    if (qs) qs.split("&").forEach((kv) => { const [k, v] = kv.split("="); query[decodeURIComponent(k)] = decodeURIComponent(v || ""); });
    return { path: path.replace(/\/+$/, "") || "/", query };
  }
  function resolve() {
    const { path, query } = parse();
    for (const r of routes) { const m = path.match(r.rx); if (m) { const params = {}; r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1]))); current = { path, params, query, pattern: r.pattern }; r.handler(params, query, current); return; } }
    if (notFound) notFound(path);
  }
  function navigate(to) { if (location.hash.replace(/^#/, "") === to) resolve(); else location.hash = to; }
  function start() { window.addEventListener("hashchange", resolve); resolve(); }
  function getCurrent() { return current; }
  S.router = { on, setNotFound, navigate, start, getCurrent, parse };
})(window.EDU);
