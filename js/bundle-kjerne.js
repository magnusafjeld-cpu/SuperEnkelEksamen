/* ================ KJERNEPENSUM — det viktigste på én kveld ================
   En kort lesevei gjennom det eksamen faktisk spør om, ved siden av den fulle
   manualen. To bruksområder: før du prøver deg på eksamensoppgaver selv, og når
   det er kort tid igjen og du vil lese det viktigste én gang.

   Delene følger eksamensblokkene, ikke kapitlene. Hver del har tekst, noen raske
   sjekker (flervalg med forklaring, fasit med en gang) og en minicase i
   eksamensformat. Minicasen er en åpen oppgave og bruker samme visning som de
   åpne kapitteloppgavene: skriv svaret, åpne løsningen del for del, vurder deg
   selv mot kriteriene.

   Hovedpunktene: hver del slutter med én «Must know»-boks
   (<div class="callout tip husk">). /kjerne/husk samler alle på én side, som et
   timinutters ark til siste dag.

   Data:    EDU_DATA.kjerne = [{ id, num, title, chapters, html, checks, case }]
   case er enten åpen (open: true, body, solution, criteria, points) eller
   flervalg (body og ledd: [{ id, q, options, answer, points, solution, traps }]),
   etter fagets eksamensform.
   Lagring: state.exams["kjerne-<id>"] = { lest, sjekk: { <sjekk-id>: indeks },
            valg: { <case-id>: { svar, score } } eller { <ledd-id>: indeks | −1 } }
   valg-feltet er det kapitteloppgavene skriver til. id-ene er lagringsnøkler
   og må aldri endres.
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, icon, frag, tellord } = S.u;
  const sh = () => S.views.shared;
  const prosa = (html) => { const n = el(".prose", frag(html)); S.u.rullTabeller(n); return n; };

  const DELER = () => window.EDU_DATA.kjerne || [];
  const finn = (num) => DELER().find((d) => d.num === num) || null;

  /* ---------- tid ---------- */
  /* Samme tall som tools/sjekk-kjerne.js, så kontrollen og appen sier det samme.
     110 ord i minuttet er lesing av en tett tekst med formler, ikke skumlesing. */
  const ORD_PER_MIN = 110, MIN_PER_SJEKK = 1;
  const ordCache = new Map();
  function ord(d) {
    if (!ordCache.has(d.id)) {
      /* r<sub>E</sub> er ett ord, ikke to; ellers blåser formlene opp tiden. */
      const t = String(d.html || "").replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<\/?(sub|sup)>/g, "").replace(/<[^>]+>/g, " ")
        .replace(/&[a-z]+;|&#\d+;/g, " ").replace(/\s+/g, " ").trim();
      ordCache.set(d.id, t ? t.split(" ").length : 0);
    }
    return ordCache.get(d.id);
  }
  const minutter = (d) => Math.round(ord(d) / ORD_PER_MIN + (d.checks || []).length * MIN_PER_SJEKK + (d.case ? d.case.minutes || 0 : 0));
  const lesMin = (d) => Math.max(1, Math.round(ord(d) / ORD_PER_MIN));
  /* Over en time rundes det til fem minutter: «4 t 21 min» later som en
     presisjon estimatet ikke har. */
  function tid(min) {
    if (min >= 60) min = Math.round(min / 5) * 5;
    const t = Math.floor(min / 60), m = min % 60;
    return t ? `${t} t${m ? " " + m + " min" : ""}` : `${m} min`;
  }

  /* ---------- lagring ---------- */
  const nøkkel = (d) => "kjerne-" + d.id;
  const økt = (d) => S.store.get().exams[nøkkel(d)] || {};
  const sjekkSvar = (d) => økt(d).sjekk || {};
  const caseSt = (d) => (d.case && (økt(d).valg || {})[d.case.id]) || null;
  function settLest(d, v) { S.store.setExam(nøkkel(d), { lest: !!v }); }
  function svarSjekk(d, id, i) {
    const s = Object.assign({}, sjekkSvar(d));
    if (id in s) return;                       // et svar låses; «Ta sjekkene på nytt» nullstiller
    s[id] = i;
    S.store.setExam(nøkkel(d), { sjekk: s });
  }
  function nullstillSjekker(d) { S.store.setExam(nøkkel(d), { sjekk: {} }); }

  /* Minicasen har to former, etter fagets eksamen. ÅPEN (FIE402, penn og papir):
     skriv svaret, åpne løsningen del for del, vurder deg selv. FLERVALG (FIE432,
     flervalg med minuspoeng): en felles oppgavetekst og 2–3 ledd med fire
     alternativer, +3 for rett, −1 for feil og 0 for «stå over». Leddene lagres i
     samme valg-objekt som den åpne oppgaven, under sine egne id-er. */
  const erFlervalg = (c) => !!(c && Array.isArray(c.ledd));
  const caseMaks = (c) => !c ? 0 : erFlervalg(c) ? c.ledd.reduce((a, l) => a + (l.points || 3), 0) : (c.points || 0);
  const fmt = (n) => n.toLocaleString("nb-NO", { maximumFractionDigits: 2 }).replace("-", "−");
  function flervalgResultat(d) {
    const c = d.case, valg = økt(d).valg || {}, kv = S.views.kapitteloppgaver || {};
    const blank = typeof kv.BLANK === "number" ? kv.BLANK : -1;
    const wf = typeof kv.STD_WF === "number" ? kv.STD_WF : -1 / 3;
    const r = { besvart: 0, poeng: 0, rett: 0, galt: 0, stått: 0, antall: c.ledd.length };
    c.ledd.forEach((l) => {
      if (!(l.id in valg)) return;
      r.besvart++;
      const v = valg[l.id], p = l.points || 3;
      if (v === blank) r.stått++;
      else if (v === l.answer) { r.rett++; r.poeng += p; }
      else { r.galt++; r.poeng += p * wf; }
    });
    r.poeng = Math.round(r.poeng * 100) / 100;
    return r;
  }
  function nullstillMinicase(d) {
    const valg = Object.assign({}, økt(d).valg || {});
    d.case.ledd.forEach((l) => { delete valg[l.id]; });
    S.store.setExam(nøkkel(d), { valg: valg });
  }

  /* Status for én del. «Ferdig» krever alle tre: lest, sjekkene besvart og
     minicasen vurdert. En del uten minicase (kurs og eksamen) er ferdig når den
     er lest og sjekkene er tatt. Svar på sjekker som ikke finnes lenger, telles
     ikke (fallgruve 7s). */
  function status(d) {
    const s = sjekkSvar(d), sjekker = d.checks || [];
    const besvart = sjekker.filter((q) => q.id in s);
    const riktig = besvart.filter((q) => s[q.id] === q.answer).length;
    let caseVurdert = true, caseScore = null, caseÅpnet = false;
    if (erFlervalg(d.case)) {
      const r = flervalgResultat(d);
      caseÅpnet = r.besvart > 0; caseVurdert = r.besvart === r.antall;
      if (caseVurdert) caseScore = r.poeng;
    } else if (d.case) {
      const c = caseSt(d);
      caseÅpnet = !!c; caseVurdert = !!(c && typeof c.score === "number");
      if (caseVurdert) caseScore = c.score;
    }
    const lest = !!økt(d).lest;
    return {
      lest, besvart: besvart.length, riktig, antall: sjekker.length,
      caseÅpnet, caseScore,
      ferdig: lest && besvart.length === sjekker.length && caseVurdert,
      påbegynt: lest || besvart.length > 0 || caseÅpnet,
    };
  }

  /* Kort ned ved en ordgrense: «Agency costs of debt: risk…», ikke «risk shifti…». */
  function kutt(t, n) {
    if (t.length <= n) return t;
    const bit = t.slice(0, n - 1), i = bit.lastIndexOf(" ");
    return (i > n / 2 ? bit.slice(0, i) : bit).replace(/[\s,:;·–-]+$/, "") + "…";
  }

  /* ---------- henvisninger ---------- */
  /* Teksten viser til manualen med «k17» og til andre deler med «kj4». Leseren
     har ofte ikke vært i manualen ennå, så koden alene sier ingenting: lenken får
     tittelen med seg. Bare tekstnoder røres, aldri inne i SVG eller lenker. */
  function merkHenvisninger(rot, denne) {
    const hopp = { SVG: 1, CODE: 1, PRE: 1, A: 1 };
    const walker = document.createTreeWalker(rot, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        for (let p = n.parentNode; p && p !== rot; p = p.parentNode)
          if (hopp[(p.tagName || "").toUpperCase()] || p.namespaceURI === "http://www.w3.org/2000/svg") return NodeFilter.FILTER_REJECT;
        return /\bkj?\d{1,2}\b/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const treff = []; let n;
    while ((n = walker.nextNode())) treff.push(n);
    const manual = S.hasModule("/curriculum");
    treff.forEach((node) => {
      const biter = node.nodeValue.split(/\b(kj?\d{1,2})\b/);
      if (biter.length < 2) return;
      const f = document.createDocumentFragment();
      biter.forEach((bit, i) => {
        const m = i % 2 === 1 ? /^(kj?)(\d{1,2})$/.exec(bit) : null;
        let mål = null, tittel = null;
        if (m && m[1] === "kj") { const d = finn(+m[2]); if (d && d.num !== denne) { mål = "#/kjerne/" + d.num; tittel = d.title; } }
        else if (m && manual) { const k = S.data.chapter(+m[2]); if (k) { mål = "#/chapter/" + k.num; tittel = k.title; } }
        if (!mål) { f.appendChild(document.createTextNode(bit)); return; }
        const kort = kutt(tittel, 34);
        f.appendChild(el("a.kapref.chipref", { href: mål, title: tittel },
          el("span.kr-kode", bit), el("span.kr-tittel", kort)));
      });
      node.parentNode.replaceChild(f, node);
    });
  }

  /* ---------- sjekkene ---------- */
  function sjekkKort(d, q, i) {
    const s = sjekkSvar(d), svart = q.id in s, valgt = s[q.id];
    const kort = el(".card", { style: { marginBottom: "12px" } });
    kort.appendChild(el(".row", { style: { gap: "8px", alignItems: "center" } },
      el(".chip.amber", "Sjekk " + (i + 1)),
      svart ? el(".tiny", { style: { fontWeight: 620, color: valgt === q.answer ? "var(--green)" : "var(--rose)" } }, valgt === q.answer ? "Riktig" : "Ikke helt") : null));
    kort.appendChild(el("p", { style: { fontWeight: 560, fontSize: "16px", margin: "10px 0 14px" } }, frag(String(q.q))));
    (q.options || []).forEach((o, j) => {
      let cls = "button.opt";
      if (svart) cls += j === q.answer ? ".correct" : (j === valgt ? ".wrong" : ".dim");
      kort.appendChild(el(cls, { disabled: svart, onclick: () => { svarSjekk(d, q.id, j); S.app.refresh(); } },
        el(".key", String.fromCharCode(65 + j)), el("span", frag(String(o)))));
    });
    if (svart) kort.appendChild(el(".explain", frag(String(q.explanation || ""))));
    return kort;
  }
  function sjekkeDel(d) {
    const sjekker = d.checks || [];
    if (!sjekker.length) return null;
    const st = status(d);
    const sek = el("div", { style: { marginTop: "34px" } });
    sek.appendChild(el(".section-title", el("h3", "Sjekk deg selv"), el(".spacer"),
      st.besvart === st.antall ? el(".chip" + (st.riktig === st.antall ? ".green" : ".amber"), `${st.riktig} av ${st.antall} riktig`) : el(".chip.accent", tellord(st.antall, "spørsmål", "spørsmål"))));
    sek.appendChild(el("p.muted", { style: { marginTop: "-6px", marginBottom: "16px", fontSize: "14.5px" } },
      "Svar før du ser tilbake i teksten. Fasiten og forklaringen kommer med en gang."));
    sjekker.forEach((q, i) => sek.appendChild(sjekkKort(d, q, i)));
    if (st.besvart === st.antall) sek.appendChild(el(".row", { style: { justifyContent: "flex-end" } },
      el("button.btn.ghost.sm", { onclick: () => { nullstillSjekker(d); S.app.refresh(); } }, "Ta sjekkene på nytt")));
    return sek;
  }

  /* ---------- minicasen ---------- */
  function minicase(d) {
    const c = d.case;
    if (!c) return null;
    const sek = el("div", { style: { marginTop: "34px" } });
    sek.appendChild(el(".section-title", el("h3", "Minicase"), el(".spacer"),
      el(".chip.indigo", { style: { fontWeight: 620 } }, `${caseMaks(c)} poeng · ~${c.minutes} min`)));
    sek.appendChild(el("p.muted", { style: { marginTop: "-6px", marginBottom: "16px", fontSize: "14.5px" } },
      erFlervalg(c)
        ? "Samme format som eksamen: fire alternativer, +3 for rett, −1 for feil og 0 for blankt. Svar når du kan utelukke minst ett alternativ, og stå over ellers. Fasiten kommer med en gang, med hvilken feil hvert galt alternativ er laget av."
        : "Samme format som eksamen, bare kortere. Regn på papir, skriv svaret, og åpne løsningen del for del."));
    const kort = el(".card.pad-lg");
    if (c.topic) kort.appendChild(el(".row", { style: { marginBottom: "10px" } }, el(".chip.slate", { style: { fontSize: "11px" } }, c.topic)));
    kort.appendChild(prosa(c.body || ""));
    const kv = S.views.kapitteloppgaver;
    if (erFlervalg(c)) {
      /* Flervalget fra kapitteloppgavene: samme låsing, «stå over», minuspoeng
         og feller. Leddene deler oppgaveteksten over, som på eksamen. */
      c.ledd.forEach((l, i) => {
        const ledd = el("div", { style: { marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--hairline)" } });
        ledd.appendChild(el(".row", { style: { gap: "10px", alignItems: "baseline" } },
          el("b", `(${String.fromCharCode(97 + i)})`), el(".spacer"),
          el(".chip.indigo", { style: { fontSize: "11px" } }, `${l.points || 3} poeng`)));
        ledd.appendChild(prosa(l.q || ""));
        if (kv && kv.flervalg) ledd.appendChild(kv.flervalg(nøkkel(d), l));
        kort.appendChild(ledd);
      });
      const r = flervalgResultat(d);
      if (r.besvart === r.antall) kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "center", marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--hairline)" } },
        el("b", `${fmt(r.poeng)} av ${caseMaks(c)} poeng`),
        el("span.tiny.muted", [tellord(r.rett, "rett", "rett"), tellord(r.galt, "feil", "feil"), tellord(r.stått, "stått over", "stått over")].join(" · ")),
        el(".spacer"),
        el("button.btn.ghost.sm", { onclick: () => { nullstillMinicase(d); S.app.refresh(); } }, "Ta minicasen på nytt")));
    } else if (kv && kv.åpenOppgave) {
      /* Den åpne oppgaven fra kapitteloppgavene: samme skrivefelt, samme
         del-for-del-løsning, samme selvvurdering. Lagres under kjerne-<id>. */
      kort.appendChild(kv.åpenOppgave(nøkkel(d), c));
    }
    sek.appendChild(kort);
    return sek;
  }

  /* ---------- én del ---------- */
  function renderDel(numStr) {
    const num = parseInt(numStr, 10);
    const d = finn(num);
    if (!d) return sh().empty("📭", "Fant ikke delen", "Gå tilbake til oversikten over kjernepensum.",
      el("a.btn.primary", { href: "#/kjerne" }, "Til kjernepensum"));
    const alle = DELER(), i = alle.indexOf(d), st = status(d);
    const wrap = el(".fade-in");
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px", alignItems: "center" } },
      el("a.btn.ghost.sm", { href: "#/kjerne" }, "← Alle deler"),
      el(".spacer"),
      el("span.tiny.muted", `Del ${i + 1} av ${alle.length}`)));
    const deler = [`~${lesMin(d)} min lesing`];
    if ((d.checks || []).length) deler.push(tellord(d.checks.length, "sjekk", "sjekker"));
    if (d.case) deler.push(`minicase ${caseMaks(d.case)} poeng`);
    wrap.appendChild(sh().pageHead(`Kjernepensum · del ${d.num}`, d.title, deler.join(" · ")));

    /* Hvor stoffet står i full lengde. Kjernepensum er en nedkorting, og den som
       vil gå dypere skal slippe å lete. */
    if ((d.chapters || []).length && S.hasModule("/curriculum")) {
      const rad = el(".row.wrap", { style: { gap: "8px", margin: "-4px 0 20px", alignItems: "center" } }, el("span.tiny.muted", "I manualen:"));
      d.chapters.forEach((n) => { const k = S.data.chapter(n); if (k) rad.appendChild(el("a.chip", { href: "#/chapter/" + n, style: { textDecoration: "none" } }, `K${n} · ${kutt(k.title, 30)}`)); });
      wrap.appendChild(rad);
    }

    /* Én spalte: tekst, sjekker og minicase i samme bredde, så kortene ikke
       strekker seg langt forbi teksten de hører til. */
    const spalte = el(".kj-spalte");
    const tekst = prosa(d.html || "");
    merkHenvisninger(tekst, d.num);
    spalte.appendChild(tekst);
    const sj = sjekkeDel(d); if (sj) spalte.appendChild(sj);
    const mc = minicase(d); if (mc) spalte.appendChild(mc);
    wrap.appendChild(spalte);

    const bunn = el(".card.kj-spalte", { style: { marginTop: "30px", textAlign: "center" } });
    bunn.appendChild(el("button.btn" + (st.lest ? ".green" : ".primary"), { style: { marginBottom: "16px" },
      onclick: () => { settLest(d, !st.lest); S.u.toast(st.lest ? "Markert som ulest" : "Markert som lest ✓"); S.app.refresh(); } },
      st.lest ? "✓ Lest — klikk for å angre" : "Marker delen som lest"));
    const forrige = alle[i - 1], neste = alle[i + 1];
    bunn.appendChild(el(".row", { style: { justifyContent: "space-between", gap: "10px" } },
      forrige ? el("a.btn.ghost", { href: "#/kjerne/" + forrige.num }, "← " + kutt(forrige.title, 26)) : el("span"),
      neste ? el("a.btn" + (st.lest ? ".primary" : ".ghost"), { href: "#/kjerne/" + neste.num }, kutt(neste.title, 26) + " →")
            : el("a.btn.ghost", { href: "#/kjerne" }, "Til oversikten")));
    wrap.appendChild(bunn);
    return wrap;
  }

  /* ---------- hovedpunktene ---------- */
  /* Ti minutter før eksamen: bare «Must know»-boksene, i rekkefølge, hver med
     lenke til delen den kommer fra. */
  function renderHusk() {
    const wrap = el(".fade-in");
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px" } },
      el("a.btn.ghost.sm", { href: "#/kjerne" }, "← Alle deler")));
    const bokser = DELER().map((d) => {
      const m = /<div class="callout tip husk">[\s\S]*?<\/div>/.exec(d.html || "");
      return m ? { d, html: m[0] } : null;
    }).filter(Boolean);
    const ordTotalt = bokser.reduce((a, b) => a + b.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);
    wrap.appendChild(sh().pageHead("Kjernepensum", "Hovedpunktene",
      `${tellord(bokser.length, "del", "deler")} · ~${Math.max(1, Math.round(ordTotalt / ORD_PER_MIN))} min`));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "62ch", margin: "0 0 22px" } },
      "Hver del av kjernepensum slutter med de få tingene du må kunne. Her står de samlet, til siste gjennomlesing. "
      + "Står det noe du ikke kjenner igjen, gå til delen og les den."));
    bokser.forEach(({ d, html }) => {
      const kort = el(".card.pad-lg", { style: { marginBottom: "14px" } });
      kort.appendChild(el(".row.wrap", { style: { gap: "10px", alignItems: "baseline" } },
        el("h3", { style: { fontSize: "17px" } }, `${d.num} · ${d.title}`), el(".spacer"),
        el("a.btn.ghost.sm", { href: "#/kjerne/" + d.num }, "Les delen")));
      const p = prosa(html);
      merkHenvisninger(p, d.num);
      kort.appendChild(p);
      wrap.appendChild(kort);
    });
    return wrap;
  }

  /* ---------- oversikten ---------- */
  function rad(d) {
    const st = status(d);
    const biter = [`~${minutter(d)} min`];
    if (st.antall) biter.push(st.besvart ? `sjekker ${st.riktig}/${st.antall}` : tellord(st.antall, "sjekk", "sjekker"));
    if (d.case) biter.push(st.caseScore != null ? `minicase ${fmt(st.caseScore)}/${caseMaks(d.case)}` : `minicase ${caseMaks(d.case)} p`);
    /* Den tyngste eksamensvekten blant kapitlene delen dekker. */
    const tyngst = (d.chapters || []).reduce((a, n) => { const v = S.u.vektFor(n); return v && (!a || v[0] > a.v) ? { n, v: v[0] } : a; }, null);
    return el(".kap-rad",
      el("a.kap-radtekst", { href: "#/kjerne/" + d.num, style: { color: "inherit", textDecoration: "none" } },
        el(".row", { style: { gap: "10px", alignItems: "center" } },
          el(".kap-radnavn", `${d.num} · ${d.title}`), tyngst ? S.u.vektmerke(tyngst.n) : null),
        el(".kap-radtall", biter.join(" · "))),
      el(".kap-radhoyre",
        st.ferdig ? el(".chip.green", el(".dot"), "Ferdig") : st.påbegynt ? el(".chip.amber", el(".dot"), st.lest ? "Lest" : "Påbegynt") : null,
        el("a.btn.sm" + (st.ferdig ? ".ghost" : ".primary"), { href: "#/kjerne/" + d.num },
          st.ferdig ? "Se igjen" : st.påbegynt ? "Fortsett" : "Les")));
  }
  function renderList() {
    const alle = DELER();
    const wrap = el(".fade-in");
    if (!alle.length) { wrap.appendChild(sh().empty("📘", "Ingen kjernepensum ennå", "Faget har ikke lagt inn EDU_DATA.kjerne.")); return wrap; }
    const sum = alle.reduce((a, d) => a + minutter(d), 0);
    const lesing = alle.reduce((a, d) => a + ord(d), 0) / ORD_PER_MIN;
    const ferdige = alle.filter((d) => status(d).ferdig).length;
    wrap.appendChild(sh().pageHead("Studieløp", "Kjernepensum",
      `${tellord(alle.length, "del", "deler")} · ~${tid(sum)} med oppgavene, ~${tid(Math.round(lesing))} bare lesing · ${ferdige} av ${alle.length} ferdig`));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "62ch", margin: "0 0 18px" } },
      sh().copy("kjerneIntro", "Det viktigste i faget, kort nok til én kveld. Les delene i rekkefølge, svar på sjekkene etter hver del, "
        + "og løs minicasen før du går videre. Da kan du grunnlaget godt nok til å prøve deg på eksamensoppgaver selv.")));
    const andel = alle.length ? ferdige / alle.length : 0;
    const linje = S.u.bar(andel * 100, { green: andel === 1 });
    linje.style.margin = "0 0 18px";
    wrap.appendChild(linje);

    wrap.appendChild(el(".card", { style: { marginBottom: "18px" } },
      el(".row.wrap", { style: { gap: "12px", alignItems: "center" } },
        el("div", { style: { flex: "1 1 260px" } },
          el("b", "Kort tid igjen? "),
          el("span.tiny.muted", "Hovedpunktene fra alle delene står samlet på én side. Les den dagen før, og slå opp delen der noe er ukjent.")),
        el("a.btn.sm", { href: "#/kjerne/husk" }, "Bare hovedpunktene"))));

    const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    const liste = el(".kap-liste");
    alle.forEach((d) => liste.appendChild(rad(d)));
    kort.appendChild(liste);
    wrap.appendChild(kort);
    return wrap;
  }

  /* ---------- kortet på dashbordet ---------- */
  /* Mobilnavigasjonen har ikke plass til flere knapper, så dashbordet er
     inngangen der. Kortet peker på neste del som ikke er ferdig. */
  function dashbordkort() {
    const alle = DELER();
    if (!alle.length || !S.hasModule("/kjerne")) return null;
    const ferdige = alle.filter((d) => status(d).ferdig).length;
    const neste = alle.find((d) => !status(d).ferdig);
    const kort = el(".card");
    kort.appendChild(el(".row", el("h3", { style: { fontSize: "16px" } }, "Kjernepensum"), el(".spacer"),
      el(".see-all", { onclick: sh().go("#/kjerne") }, "Alle deler →")));
    const lesing = Math.round(alle.reduce((a, d) => a + ord(d), 0) / ORD_PER_MIN);
    kort.appendChild(el("p.tiny.muted", { style: { margin: "6px 0 10px" } },
      `Det viktigste i faget: ~${tid(lesing)} lesing, ~${tid(alle.reduce((a, d) => a + minutter(d), 0))} med oppgavene · ${ferdige} av ${alle.length} deler ferdig`));
    const linje = S.u.bar(alle.length ? ferdige / alle.length * 100 : 0, { thin: true, green: ferdige === alle.length });
    linje.style.marginBottom = "12px";
    kort.appendChild(linje);
    kort.appendChild(neste
      ? el("a.btn.primary.sm", { href: "#/kjerne/" + neste.num }, `${status(neste).påbegynt ? "Fortsett" : "Les"}: ${kutt(neste.title, 30)}`)
      : el("a.btn.sm", { href: "#/kjerne/husk" }, "Les hovedpunktene"));
    return kort;
  }

  S.views.kjerne = { render: renderList, renderDel, renderHusk, dashbordkort };
})(window.EDU);
