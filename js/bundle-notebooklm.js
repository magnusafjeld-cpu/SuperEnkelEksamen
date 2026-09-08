/* ================== NOTEBOOKLM — pensum som ren tekst ==================
   Gjør kapitlene i manualen om til ren tekst, ETT KAPITTEL OM GANGEN, klart til
   å limes inn i NotebookLM eller noe annet som bare leser tekst.

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
  const { el, icon } = S.u;
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
        let typ = "MERK";
        for (const k of kl) if (CALLOUT[k]) { typ = CALLOUT[k]; break; }
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

  function innledning(del, c, antall) {
    const s = sub();
    const sted = [del.tag, del.name].filter(Boolean).join(" — ");
    const linjer = [
      (s.name || "Pensum").toUpperCase(), "",
      "KAPITTEL " + c.num + " · " + (c.title || "").toUpperCase(), "",
      (sted ? sted + ". " : "") + `Ett kapittel av ${antall} i læreboka.`,
      "Henvisninger til andre kapitler peker på tekst som ikke er med her.", "",
      "Slik leses notasjonen:",
      "- Tall skrives på norsk: mellomrom som tusenskille og komma som desimaltegn.",
      "  «1 467 200» er én million; «37,84 %» er trettisyv komma åtti fire prosent.",
      "- Minustegnet er «−», gangetegnet «×».",
      "- «_» betyr senket skrift og «^» hevet skrift: A_(m,n) er A med fotskrift m,n.",
    ];
    /* Fagets egne notasjonskonvensjoner hører hjemme i manifestet, ikke i motoren. */
    (sh().copy("notebooklmNotasjon", []) || []).forEach((l) => linjer.push("- " + l));
    linjer.push(
      "- FORMEL / GJENNOMREGNET EKSEMPEL / MEKANISME / ADVARSEL / VANLIG FEIL / TIPS /",
      "  KOBLING er blokktyper fra originalen, beholdt som etiketter.",
      "- FIGUR-linjene beskriver en figur som ikke kan gjengis som tekst.", "",
      "=".repeat(78), "");
    return linjer;
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
      const kapitler = del.chapters.filter((c) => kjerneFilter(c.num)).map((c) => {
        const tekst = innledning(del, c, alle.length).concat(kapittelTekst(c))
          .join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
        return { kap: c, tekst, ord: tekst.split(/\s+/).filter(Boolean).length,
                 eks: (tekst.match(/GJENNOMREGNET EKSEMPEL/g) || []).length,
                 form: (tekst.match(/FORMEL:/g) || []).length };
      });
      return kapitler.length ? { del, kapitler } : null;
    }).filter(Boolean);
    return bufret;
  }

  /* ---------- kopiering ---------- */
  async function tilUtklipp(tekst) {
    try { await navigator.clipboard.writeText(tekst); return true; } catch (e) {}
    /* Utklippstavle-API-et kan være avslått i en innebygd ramme eller uten https. */
    const felt = el("textarea", { readonly: "", style: { position: "fixed", top: 0, left: 0, opacity: 0 } });
    felt.value = tekst; document.body.appendChild(felt); felt.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    felt.remove(); return ok;
  }

  function merk(pre) {
    const r = document.createRange(); r.selectNodeContents(pre);
    const v = window.getSelection(); v.removeAllRanges(); v.addRange(r);
    pre.scrollIntoView({ block: "center" });
  }

  /* Entall når det er én. «1 formler» er den slags som får resten til å se
     slurvete ut — samme grunn som i chapterMeta. */
  const tellord = (n, ental, flertall) => `${n} ${n === 1 ? ental : flertall}`;

  function rad(k) {
    const r = el(".nlm-rad");
    const venstre = el(".nlm-radtekst",
      el(".nlm-radnavn", k.kap.fullTitle),
      el(".nlm-radtall", [
        k.ord.toLocaleString("nb-NO") + " ord",
        k.eks ? tellord(k.eks, "gjennomregnet eksempel", "gjennomregnede eksempler") : null,
        k.form ? tellord(k.form, "formel", "formler") : null,
      ].filter(Boolean).join(" · ")));

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
    const ord = b.kapitler.reduce((a, x) => a + x.ord, 0);
    k.appendChild(el(".eyebrow", [b.del.tag, tellord(b.kapitler.length, "kapittel", "kapitler"),
      ord.toLocaleString("nb-NO") + " ord"].filter(Boolean).join(" · ")));
    k.appendChild(el("h3.nlm-tittel", b.del.name || "Del"));
    const liste = el(".nlm-liste");
    b.kapitler.forEach((x) => liste.appendChild(rad(x)));
    k.appendChild(liste);
    return k;
  }

  function render() {
    const wrap = el(".fade-in");
    const bs = bolker();
    if (!bs.length) { wrap.appendChild(sh().empty("📄", "Ingen kapitler ennå", "Manualen er ikke lastet, eller den har ingen kapitler innenfor coreChapters.")); return wrap; }
    const antKap = bs.reduce((a, b) => a + b.kapitler.length, 0);
    const sumOrd = bs.reduce((a, b) => a + b.kapitler.reduce((x, k) => x + k.ord, 0), 0);
    wrap.appendChild(sh().pageHead("Verktøy", "NotebookLM",
      `${antKap} kapitler · ${sumOrd.toLocaleString("nb-NO")} ord`, null));
    wrap.appendChild(el("p.sub.nlm-intro", sh().copy("notebooklmIntro",
      "Pensum som ren tekst, ett kapittel om gangen. Trykk «Kopier» og lim inn som "
      + "kilde i NotebookLM, en språkmodell eller et notat. Hvert kapittel er en hel "
      + "kilde for seg, med leseveiledningen øverst. Teksten lages av manualen som er "
      + "lastet nå, så den er alltid i takt med kapitlene du leser.")));
    const rutenett = el(".nlm-rutenett");
    bs.forEach((b) => rutenett.appendChild(delkort(b)));
    wrap.appendChild(rutenett);
    return wrap;
  }

  S.views.notebooklm = { render };
})(window.EDU);
