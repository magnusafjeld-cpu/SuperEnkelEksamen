/* ================== NOTEBOOKLM — pensum som ren tekst ==================
   Gjør kapitlene i manualen om til ren tekst, ETT KAPITTEL OM GANGEN, klart til
   å limes inn i NotebookLM eller noe annet som bare leser tekst. Fag med
   kjernepensum får det som et eget kort øverst: hele kjernepensum som én kilde,
   eller del for del, med sjekker og minicase med fasit.

   Hvorfor dette ligger i motoren og ikke som en ferdig fil: teksten genereres av
   manualen som er lastet NÅ. Rettes en regnefeil i et kapittel, følger eksporten
   med av seg selv. En ferdigbygget tekstfil ville vært utdatert fra første
   retting, og ingen ville oppdaget det.

   Konverteringen er en oversettelse, ikke en stripping av tagger:
     .formula   -> FORMEL: ligningen, så «der: …»
     .worked    -> GJENNOMREGNET EKSEMPEL med tittel
     .callout   -> typet blokk, så klassen ikke går tapt når fargen forsvinner
     table.data -> pipe-tabell
     figure     -> figurteksten pluss svg-ens aria-label, den eneste beskrivelsen
                   av kurven som overlever uten bildet
     b, i       -> droppes. Manualen utheder hvert svartall i hvert regneeksempel;
                   som markdown blir det tusen stjernepar støy.
     sub, sup   -> _ og ^, så A_(m,n) og x^2 fortsatt kan leses

   Delene grupperer bare visningen. Kapitler utenfor coreChapters holdes
   utenfor — for FIE432 er det kursintroduksjonen i k0 og referansekapitlet k20,
   som ingen har bruk for som kilde.                                            */
window.EDU = window.EDU || {};
(function (S) {
  const { el, icon, tellord, vektmerke } = S.u;
  const sh = () => S.views.shared;

  const CALLOUT = { mech: "MEKANISME", warn: "ADVARSEL", tip: "TIPS", link: "KOBLING", mistake: "VANLIG FEIL", info: "MERK" };
  const rydd = (s) => String(s == null ? "" : s).replace(/[ \t ]+/g, " ").trim();
  const sub = () => window.EDU_SUBJECT || {};

  /* ---------- inline: b og i forsvinner, sub og sup blir lesbare ---------- */
  function inline(node) {
    if (node.nodeType === 3) return node.nodeValue.replace(/ /g, " ");
    if (node.nodeType !== 1) return "";
    const tag = node.tagName.toLowerCase();
    if (tag === "svg" || tag === "script" || tag === "style") return "";
    if (tag === "a" && node.classList.contains("backtotop")) return "";
    const inner = [...node.childNodes].map(inline).join("");
    if (tag === "sub") return "_" + inner;
    if (tag === "sup") return "^" + inner;
    if (tag === "br") return " ";
    return inner;
  }

  function tabell(t) {
    const rader = [...t.querySelectorAll("tr")].map((tr) => {
      const celler = [...tr.children].filter((c) => /^(td|th)$/i.test(c.tagName));
      return { celler: celler.map((c) => rydd(inline(c)) || " "),
               hode: celler.some((c) => c.tagName.toLowerCase() === "th") };
    }).filter((r) => r.celler.length);
    if (!rader.length) return [];
    const bredde = Math.max(...rader.map((r) => r.celler.length));
    const ut = []; let skiltSatt = false;
    rader.forEach((r) => {
      const c = r.celler.concat(Array(bredde - r.celler.length).fill(" "));
      ut.push("| " + c.join(" | ") + " |");
      if (r.hode && !skiltSatt) { ut.push("|" + "---|".repeat(bredde)); skiltSatt = true; }
    });
    if (!skiltSatt) {   /* tabell uten th — lag et tomt hode, ellers er den ikke en tabell */
      ut.unshift("|" + "---|".repeat(bredde));
      ut.unshift("| " + Array(bredde).fill(" ").join(" | ") + " |");
    }
    return ut;
  }

  function figur(f) {
    const kap = f.querySelector("figcaption");
    const svg = f.querySelector("svg");
    const beskrivelse = svg ? rydd(svg.getAttribute("aria-label") || "") : "";
    const ut = [kap ? "FIGUR: " + rydd(inline(kap)) : "FIGUR"];
    if (beskrivelse) ut.push("Figuren viser: " + beskrivelse);
    return ut;
  }

  function blokk(node, ut) {
    if (node.nodeType === 3) { const t = rydd(node.nodeValue); if (t) ut.push(t, ""); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === "svg" || tag === "script" || tag === "style") return;
    if (tag === "a" && node.classList.contains("backtotop")) return;
    const kl = node.classList;

    if (tag === "h3") { ut.push("", "### " + rydd(inline(node)), ""); return; }
    if (tag === "h2") { ut.push("", "## " + rydd(inline(node)), ""); return; }
    if (tag === "table") { ut.push(...tabell(node), ""); return; }
    if (tag === "figure") { ut.push(...figur(node), ""); return; }
    if (tag === "ul" || tag === "ol") {
      [...node.children].filter((c) => c.tagName.toLowerCase() === "li")
        .forEach((li, i) => ut.push((tag === "ol" ? (i + 1) + "." : "-") + " " + rydd(inline(li))));
      ut.push(""); return;
    }
    if (tag === "div" && kl.contains("formula")) {
      [...node.children].forEach((c) => {
        if (c.classList.contains("eq")) ut.push("FORMEL:  " + rydd(inline(c)));
        if (c.classList.contains("where")) ut.push("   der:  " + rydd(inline(c)));
      });
      ut.push(""); return;
    }
    if (tag === "div" && (kl.contains("worked") || kl.contains("callout"))) {
      const erWorked = kl.contains("worked");
      const hodeEl = node.querySelector(erWorked ? ":scope > .wh" : ":scope > .h");
      let hode = hodeEl ? rydd(inline(hodeEl)) : "";
      if (erWorked) {
        hode = hode.replace(/^Gjennomregnet:\s*/, "");
        ut.push("GJENNOMREGNET EKSEMPEL" + (hode ? " — " + hode : ""));
      } else {
        /* «Må kunne»-boksen i kjernepensum er også .tip, men betyr noe annet. */
        let typ = kl.contains("husk") ? "MÅ KUNNE" : "MERK";
        if (!kl.contains("husk")) for (const k of kl) if (CALLOUT[k]) { typ = CALLOUT[k]; break; }
        ut.push(typ + (hode ? " — " + hode : ""));
      }
      /* Løs tekst rett i boksen samles til ett avsnitt; blokkbarn rendres som ellers. */
      let løs = "";
      const tøm = () => { if (rydd(løs)) ut.push(rydd(løs)); løs = ""; };
      [...node.childNodes].forEach((c) => {
        if (c === hodeEl) return;
        if (c.nodeType === 3) { løs += c.nodeValue; return; }
        if (c.nodeType !== 1) return;
        const ct = c.tagName.toLowerCase();
        const erBlokk = ct === "p" || ct === "table" || ct === "figure" || ct === "ul" || ct === "ol"
          || (ct === "div" && (c.classList.contains("formula") || c.classList.contains("callout")));
        if (erBlokk) { tøm(); blokk(c, ut); } else løs += inline(c);
      });
      tøm(); ut.push(""); return;
    }
    if (tag === "p" || tag === "div") { const t = rydd(inline(node)); if (t) ut.push(t, ""); return; }
    [...node.childNodes].forEach((c) => blokk(c, ut));
  }

  /* ---------- kapittel og del ---------- */
  function kapittelTekst(c) {
    const rot = document.createElement("div");
    rot.innerHTML = c.html;
    const ut = ["", "## " + c.fullTitle, ""];
    [...rot.childNodes].forEach((n) => blokk(n, ut));
    return ut;
  }

  function kjerneFilter(num) {
    const k = sub().coreChapters;
    return !k || typeof k.from !== "number" ? true : (num >= k.from && num <= k.to);
  }

  /* Leseveiledningen er lik for kapitlene og kjernepensum. Tallformatet følger
     faget: de engelske fagene har punktum som desimaltegn, og der ville «komma
     som desimaltegn» lært leseren å lese 21.25 feil. */
  function notasjon() {
    const tall = sh().copy("notebooklmTall", null) || [
      "Tall skrives på norsk: mellomrom som tusenskille og komma som desimaltegn.\n  «1 467 200» er én million; «37,84 %» er trettisyv komma åtti fire prosent.",
    ];
    const linjer = ["Slik leses notasjonen:"];
    tall.forEach((l) => linjer.push("- " + l));
    linjer.push(
      "- Minustegnet er «−», gangetegnet «×».",
      "- «_» betyr senket skrift og «^» hevet skrift: A_(m,n) er A med fotskrift m,n.");
    /* Fagets egne notasjonskonvensjoner hører hjemme i manifestet, ikke i motoren. */
    (sh().copy("notebooklmNotasjon", []) || []).forEach((l) => linjer.push("- " + l));
    linjer.push(
      "- FORMEL / GJENNOMREGNET EKSEMPEL / MEKANISME / ADVARSEL / VANLIG FEIL / TIPS /",
      "  MÅ KUNNE / KOBLING er blokktyper fra originalen, beholdt som etiketter.",
      "- FIGUR-linjene beskriver en figur som ikke kan gjengis som tekst.", "",
      "=".repeat(78), "");
    return linjer;
  }

  function innledning(del, c, antall) {
    const s = sub();
    const sted = [del.tag, del.name].filter(Boolean).join(" — ");
    return [
      (s.name || "Pensum").toUpperCase(), "",
      "KAPITTEL " + c.num + " · " + (c.title || "").toUpperCase(), "",
      (sted ? sted + ". " : "") + `Ett kapittel av ${antall} i læreboka.`,
      "Henvisninger til andre kapitler peker på tekst som ikke er med her.", "",
    ].concat(notasjon());
  }

  /* ---------- kjernepensum ---------- */
  /* Kjernepensum er det viktigste på én kveld, og som kilde er det nettopp det
     man vil gi NotebookLM når tiden er kort. Hver del blir tekst, sjekker og
     minicase, med fasit og løsning: en kilde som svarer på spørsmål, skal kunne
     forklare hvorfor et alternativ er feil. Hele kjernepensum er ~27 000 ord med
     sjekker og løsninger, og går fint som én kilde; delene kan også kopieres
     hver for seg. */
  const KJERNE = () => (S.hasModule("/kjerne") && (window.EDU_DATA || {}).kjerne) || [];
  const BOKSTAV = "ABCDEFGH";

  function blokker(html) {
    const rot = document.createElement("div");
    rot.innerHTML = html || "";
    const ut = [];
    [...rot.childNodes].forEach((n) => blokk(n, ut));
    return ut;
  }
  function linje(html) {
    const rot = document.createElement("div");
    rot.innerHTML = html || "";
    return rydd(inline(rot));
  }

  /* «k17» og «kj4» er lenker i appen. I ren tekst får de tittelen med seg, ellers
     peker de på noe leseren ikke kan slå opp. */
  function utvidHenvisninger(tekst) {
    return tekst.replace(/\b(kj?)(\d{1,2})\b/g, (m, p, n) => {
      if (p === "kj") {
        const d = KJERNE().find((x) => x.num === +n);
        return d ? `${m} (kjernepensum del ${d.num}: ${d.title})` : m;
      }
      const k = S.hasModule("/curriculum") && S.data.chapter(+n);
      return k ? `${m} (kapittel ${k.num}: ${k.title})` : m;
    });
  }

  function alternativer(opts, riktig, ut) {
    (opts || []).forEach((o, i) => ut.push(`   ${BOKSTAV[i]}) ${linje(o)}`));
    if (riktig != null && opts && opts[riktig] != null) ut.push(`   FASIT: ${BOKSTAV[riktig]}) ${linje(opts[riktig])}`);
  }

  function delInnhold(d) {
    const ut = ["", "## Del " + d.num + " · " + d.title, ""].concat(blokker(d.html));
    if ((d.checks || []).length) {
      ut.push("", "### Sjekk deg selv", "");
      d.checks.forEach((c, i) => {
        ut.push(`${i + 1}. ${linje(c.q)}`);
        alternativer(c.options, c.answer, ut);
        if (c.explanation) ut.push("   Forklaring: " + linje(c.explanation));
        ut.push("");
      });
    }
    const m = d.case;
    if (m) {
      const poeng = m.points || (m.ledd || []).reduce((a, l) => a + (l.points || 0), 0);
      const om = [poeng ? poeng + " poeng" : null, m.minutes ? "ca. " + m.minutes + " min" : null].filter(Boolean).join(", ");
      ut.push("", "### Minicase" + (m.topic ? ": " + m.topic : "") + (om ? " (" + om + ")" : ""), "");
      ut.push(...blokker(m.body));
      if (m.ledd) {
        m.ledd.forEach((l, i) => {
          ut.push(`(${"abcdefgh"[i]}) ${linje(l.q)}` + (l.points ? ` [${l.points} poeng]` : ""));
          alternativer(l.options, l.answer, ut);
          ut.push("", "LØSNING (" + "abcdefgh"[i] + ")", ...blokker(l.solution));
          const feller = (l.traps || []).map((t, j) => t ? `- ${BOKSTAV[j]}) ${linje(t)}` : null).filter(Boolean);
          if (feller.length) ut.push("Slik er de gale alternativene laget:", ...feller, "");
        });
      } else {
        if (m.solution) ut.push("LØSNING", ...blokker(m.solution));
        if ((m.criteria || []).length) ut.push("SENSORKRITERIER", ...m.criteria.map((k) => "- " + linje(k)), "");
      }
    }
    return utvidHenvisninger(ut.join("\n")).split("\n");
  }

  function kjerneInnledning(d, antall) {
    const s = sub();
    const kapitler = d ? (d.chapters || []).map((n) => S.data.chapter(n)).filter(Boolean) : [];
    return [
      (s.name || "Pensum").toUpperCase() + " — KJERNEPENSUM", "",
      d ? `DEL ${d.num} · ${d.title.toUpperCase()}` : `ALLE ${antall} DELER`, "",
      `Kjernepensum er det viktigste i faget på én kveld: ${antall} korte deler bygd rundt det eksamen spør om, ikke rundt kapitlene.`
        + (d ? ` Dette er én av delene.` : ""),
      kapitler.length ? "Delen bygger på: " + kapitler.map((k) => `kapittel ${k.num} (${k.title})`).join(", ") + "." : null,
      "Henvisninger i parentes til kapitler peker på hele pensum, som ikke er med her.",
      "Etter teksten i hver del kommer sjekkspørsmål og en minicase i eksamensformatet, med fasit og løsning.", "",
    ].filter((l) => l !== null).concat(notasjon());
  }

  function kjerneTekst(deler, d) {
    const kropp = (d ? [d] : deler).flatMap(delInnhold);
    return kjerneInnledning(d, deler.length).concat(kropp).join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  /* Tyngste eksamensvekt blant kapitlene delen dekker, som i kjernepensumlista. */
  const tyngst = (d) => (d.chapters || []).reduce((a, n) => { const v = S.u.vektFor(n); return v && (!a || v[0] > a.v) ? { n, v: v[0] } : a; }, null);

  function kjerneBolk() {
    const deler = KJERNE();
    if (!deler.length) return null;
    const ordI = (t) => t.split(/\s+/).filter(Boolean).length;
    const rader = deler.map((d) => {
      const tekst = kjerneTekst(deler, d);
      const t = tyngst(d);
      return { navn: `${d.num} · ${d.title}`, tekst, ord: ordI(tekst), vekt: t ? t.n : null,
               tall: [tellord((d.checks || []).length, "sjekk", "sjekker"), d.case ? "minicase" : null] };
    });
    const hele = kjerneTekst(deler, null);
    const sjekker = deler.reduce((a, d) => a + (d.checks || []).length, 0);
    rader.unshift({ navn: "Hele kjernepensum", tekst: hele, ord: ordI(hele), vekt: null, hel: true,
                    tall: [tellord(deler.length, "del", "deler"), tellord(sjekker, "sjekk", "sjekker"),
                           tellord(deler.filter((d) => d.case).length, "minicase", "minicaser")] });
    return {
      eyebrow: ["Kjernepensum", tellord(deler.length, "del", "deler")].join(" · "),
      tittel: "Det viktigste på én kveld",
      note: "Hele kjernepensum går fint som én kilde. Delene kan også kopieres hver for seg. Sjekkene og minicasene er med, med fasit og løsning.",
      rader,
    };
  }

  /* Teksten bygges én gang per økt. Hele FIE432 er ~82 000 ord, og å parse det
     på nytt for hvert klikk er unødvendig — men å bygge det på forhånd er
     nødvendig, for radene viser ordtellingen før du trykker på noe.

     Enheten er KAPITLET, ikke delen. Et kapittel er 2 000–5 000 ord og handler om
     én ting; en hel del er opptil 20 000 og handler om fem. Skal teksten brukes
     som kilde et sted som svarer på spørsmål, er det kapitlet som gir presise
     treff — og det er kapitlet du selv tenker i når du leter. */
  let bufret = null;
  function bolker() {
    if (bufret) return bufret;
    const alle = S.data.parts().flatMap((d) => d.chapters.filter((c) => kjerneFilter(c.num)));
    bufret = S.data.parts().map((del) => {
      const rader = del.chapters.filter((c) => kjerneFilter(c.num)).map((c) => {
        const tekst = innledning(del, c, alle.length).concat(kapittelTekst(c))
          .join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
        const eks = (tekst.match(/GJENNOMREGNET EKSEMPEL/g) || []).length;
        const form = (tekst.match(/FORMEL:/g) || []).length;
        return { navn: c.fullTitle, tekst, ord: tekst.split(/\s+/).filter(Boolean).length, vekt: c.num,
                 tall: [eks ? tellord(eks, "gjennomregnet eksempel", "gjennomregnede eksempler") : null,
                        form ? tellord(form, "formel", "formler") : null] };
      });
      if (!rader.length) return null;
      const ord = rader.reduce((a, x) => a + x.ord, 0);
      return { eyebrow: [del.tag, tellord(rader.length, "kapittel", "kapitler"), ord.toLocaleString("nb-NO") + " ord"].filter(Boolean).join(" · "),
               tittel: del.name || "Del", rader };
    }).filter(Boolean);
    return bufret;
  }
  let bufretKjerne;
  const kjerneKort = () => (bufretKjerne === undefined ? (bufretKjerne = kjerneBolk()) : bufretKjerne);

  /* ---------- kopiering ---------- */
  const tilUtklipp = (tekst) => S.u.tilUtklipp(tekst);

  function merk(pre) {
    const r = document.createRange(); r.selectNodeContents(pre);
    const v = window.getSelection(); v.removeAllRanges(); v.addRange(r);
    pre.scrollIntoView({ block: "center" });
  }

  function rad(k) {
    const r = el(".nlm-rad" + (k.hel ? ".nlm-hel" : ""));
    /* Eksamensvekten ved navnet, som i pensum og kapitteloppgavene: den sier
       hvilke kapitler som er verdt å legge inn som kilde først. */
    const venstre = el(".nlm-radtekst",
      el(".row", { style: { gap: "10px", alignItems: "center" } },
        el(".nlm-radnavn", k.navn), k.vekt != null ? vektmerke(k.vekt) : null),
      el(".nlm-radtall", [k.ord.toLocaleString("nb-NO") + " ord"].concat(k.tall || []).filter(Boolean).join(" · ")));

    const pre = el("pre.nlm-full", { hidden: true });
    const kopi = el("button.btn.primary.sm", "Kopier");
    const vis = el("button.btn.ghost.sm", "Vis");

    let tilbake = null;
    kopi.onclick = async () => {
      clearTimeout(tilbake);
      const ok = await tilUtklipp(k.tekst);
      kopi.textContent = ok ? "Kopiert ✓" : "Merket — ⌘C";
      if (!ok) { if (pre.hidden) vis.onclick(); merk(pre); }
      tilbake = setTimeout(() => { kopi.textContent = "Kopier"; }, ok ? 2400 : 9000);
    };
    vis.onclick = () => {
      if (!pre.textContent) pre.textContent = k.tekst;
      pre.hidden = !pre.hidden;
      vis.textContent = pre.hidden ? "Vis" : "Skjul";
    };

    r.appendChild(el(".nlm-radtopp", venstre, el(".nlm-radknapper", kopi, vis)));
    r.appendChild(pre);
    return r;
  }

  function delkort(b) {
    const k = el(".card.pad-lg.nlm-kort");
    k.appendChild(el(".eyebrow", b.eyebrow));
    k.appendChild(el("h3.nlm-tittel", b.tittel));
    if (b.note) k.appendChild(el("p.tiny.muted.nlm-note", b.note));
    const liste = el(".nlm-liste");
    b.rader.forEach((x) => liste.appendChild(rad(x)));
    k.appendChild(liste);
    return k;
  }

  function render() {
    const wrap = el(".fade-in");
    const bs = bolker();
    if (!bs.length) { wrap.appendChild(sh().empty("📄", "Ingen kapitler ennå", "Manualen er ikke lastet, eller den har ingen kapitler innenfor coreChapters.")); return wrap; }
    const kj = kjerneKort();
    const antKap = bs.reduce((a, b) => a + b.rader.length, 0);
    const sumOrd = bs.reduce((a, b) => a + b.rader.reduce((x, k) => x + k.ord, 0), 0);
    wrap.appendChild(sh().pageHead("Verktøy", "NotebookLM",
      `${antKap} kapitler · ${sumOrd.toLocaleString("nb-NO")} ord` + (kj ? ` · kjernepensum ${kj.rader[0].ord.toLocaleString("nb-NO")} ord` : ""), null));
    wrap.appendChild(el("p.sub.nlm-intro", sh().copy("notebooklmIntro",
      "Pensum som ren tekst, ett kapittel om gangen. Trykk «Kopier» og lim inn som "
      + "kilde i NotebookLM, en språkmodell eller et notat. Hvert kapittel er en hel "
      + "kilde for seg, med leseveiledningen øverst. Teksten lages av manualen som er "
      + "lastet nå, så den er alltid i takt med kapitlene du leser.")));
    if (Object.keys(sub().examWeights || {}).length) wrap.appendChild(el("p.tiny.muted", { style: { maxWidth: "62ch", margin: "-14px 0 22px" } },
      el("b", "Prikkene er eksamensvekt"), " fra 1 til 5, " + (sub().examWeightsNote || "utledet av hvor ofte temaet har kommet på eksamen.")
      + " Hold musepekeren over for begrunnelsen."));
    const rutenett = el(".nlm-rutenett");
    /* Kjernepensum først: det er kilden du vil ha når tiden er kort. */
    if (kj) rutenett.appendChild(delkort(kj));
    bs.forEach((b) => rutenett.appendChild(delkort(b)));
    wrap.appendChild(rutenett);
    return wrap;
  }

  S.views.notebooklm = { render };
})(window.EDU);
