/* ===================== CLAUDE: chat og vurdering med egen API-nøkkel =====================
   Hver bruker limer inn sin egen Anthropic API-nøkkel. Den lagres bare i denne
   nettleseren (localStorage["edu.claude.v1"]), utenfor fremdriften, så kontosynken
   tar den aldri med til Supabase. Nettleseren snakker direkte med api.anthropic.com,
   og forbruket går på brukerens egen konto. Uten nøkkel faller knappene tilbake
   til «kopier prompten», som før.

   Risiko: en nøkkel i nettleseren kan leses av all kode som kjører på siden. Siden
   laster ingen skript utenfra, så det er bare vår egen kode. Derfor anbefaler vi
   en egen nøkkel med lav utgiftsgrense. Det står ved feltet.

   To innganger:
   - Chatpanelet: knappen nederst til høyre på alle sider. Hver melding får med
     teksten på siden du står på, så Claude vet hvilken oppgave du mener.
   - S.claude.vurdering({...}): en boks som strømmer en vurdering av svaret ditt
     mot fasiten, med «Spør videre i chatten» etterpå.

   API-et: Messages API med strømming (SSE), adaptiv tenking og automatisk
   prompt-caching. Samtalen er bare-legg-til: systemprompten fryses ved start, og
   ny sidekontekst kommer i den nye brukermeldingen, aldri ved å endre en gammel.
   Da treffer cachen og tenkeblokkene som sendes tilbake er gyldige.
   ========================================================================================= */
window.EDU = window.EDU || {};
(function (S) {
  const { el } = S.u;

  const API = "https://api.anthropic.com/v1/messages";
  const NØKKEL = "edu.claude.v1";
  const KONSOLL = "https://platform.claude.com/settings/keys";

  /* Pris per million tokens, fra platform.claude.com/docs/en/about-claude/pricing
     (oktober 2026). Bare til anslaget som vises i panelet. */
  const MODELLER = {
    "claude-sonnet-5-5": { navn: "Sonnet 5.5", hint: "anbefalt", inn: 2, ut: 10, skriv: 2.5, les: 0.1, reserve: true },
    "claude-opus-5-5": { navn: "Opus 5.5", hint: "best, dobbel pris", inn: 4, ut: 20, skriv: 5, les: 0.2, reserve: true },
    "claude-haiku-5-5": { navn: "Haiku 5.5", hint: "billigst, svakere", inn: 0.1, ut: 0.5, skriv: 0.125, les: 0.01, reserve: false },
  };
  const STANDARD = "claude-sonnet-5-5";

  /* ================= lagring ================= */
  function les() { try { return JSON.parse(localStorage.getItem(NØKKEL)) || {}; } catch (e) { return {}; } }
  function skriv(o) { try { localStorage.setItem(NØKKEL, JSON.stringify(o)); } catch (e) {} }
  const nøkkel = () => (les().nokkel || "").trim();
  const harNøkkel = () => /^sk-ant-/.test(nøkkel());
  const modell = () => (MODELLER[les().modell] ? les().modell : STANDARD);
  function settNøkkel(k) { const o = les(); o.nokkel = String(k || "").trim(); skriv(o); }
  function settModell(m) { const o = les(); o.modell = m; skriv(o); }
  function glem() { const o = les(); delete o.nokkel; skriv(o); }

  /* Forbruket i dollar, per måned, bare som anslag i denne nettleseren. */
  function måned() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); }
  function brukt() { const o = les(); return o.mnd === måned() ? o.brukt || 0 : 0; }
  function leggTilBruk(usd) { const o = les(); if (o.mnd !== måned()) { o.mnd = måned(); o.brukt = 0; } o.brukt = (o.brukt || 0) + usd; skriv(o); }
  function pris(usage, id) {
    const p = MODELLER[id] || MODELLER[STANDARD];
    const u = usage || {};
    return ((u.input_tokens || 0) * p.inn + (u.cache_creation_input_tokens || 0) * p.skriv
      + (u.cache_read_input_tokens || 0) * p.les + (u.output_tokens || 0) * p.ut) / 1e6;
  }
  const dollar = (x) => "$" + (x < 0.01 ? x.toFixed(3) : x.toFixed(2)).replace(".", ",");

  /* ================= API-kallet ================= */
  /* Feilmeldingene på norsk, med det brukeren kan gjøre med dem. */
  function feiltekst(status, melding) {
    const m = String(melding || "");
    if (status === 401) return "Nøkkelen ble avvist. Sjekk at du limte inn hele nøkkelen, eller lag en ny i Console.";
    if (status === 403) return "Nøkkelen har ikke tilgang til denne modellen. " + m;
    if (status === 429) return "For mange forespørsler på kort tid. Vent et halvt minutt og prøv igjen.";
    if (status === 529 || status === 503) return "Claude er overbelastet akkurat nå. Prøv igjen om litt.";
    if (/credit balance/i.test(m)) return "Kontoen har ikke mer kreditt. Fyll på under Billing i Console.";
    if (status >= 500) return "Feil hos Anthropic (" + status + "). Prøv igjen om litt.";
    return m || "Ukjent feil (" + status + ").";
  }

  /* Strømmer ett svar. Bygger innholdsblokkene slik API-et sender dem, så de kan
     sendes tilbake uendret i neste tur (tenkeblokkene har en signatur som må
     følge med). Returnerer { content, stop, usage, modell }. */
  async function strøm({ system, messages, maxTokens, effort, onTekst, onTenker, signal }) {
    const id = modell();
    const body = {
      model: id,
      max_tokens: maxTokens || 16000,
      stream: true,
      system,
      messages,
      thinking: { type: "adaptive" },
      output_config: { effort: effort || "medium" },
      /* Automatisk caching: prefikset (system + tidligere turer) leses fra cache
         i neste melding, til en tiendedel av prisen eller mindre. */
      cache_control: { type: "ephemeral" },
    };
    const hoder = {
      "content-type": "application/json",
      "x-api-key": nøkkel(),
      "anthropic-version": "2023-06-01",
      /* Kreves for kall rett fra nettleseren (CORS). Navnet advarer mot å legge
         en felles nøkkel i en nettside; her er det brukerens egen. */
      "anthropic-dangerous-direct-browser-access": "true",
    };
    /* Avslår sikkerhetsfilteret, prøver API-et en annen modell selv. Haiku har
       ingen slik reserve. */
    if (MODELLER[id].reserve) { body.fallbacks = "default"; hoder["anthropic-beta"] = "server-side-fallback-2026-07-01"; }

    let svar;
    try { svar = await fetch(API, { method: "POST", headers: hoder, body: JSON.stringify(body), signal }); }
    catch (e) {
      if (e && e.name === "AbortError") throw e;
      throw new Error("Fikk ikke kontakt med Claude. Sjekk nettet og prøv igjen.");
    }
    if (!svar.ok) {
      let m = "";
      try { const j = await svar.json(); m = (j.error && j.error.message) || ""; } catch (e) {}
      const f = new Error(feiltekst(svar.status, m));
      f.status = svar.status; f.rå = m;
      throw f;
    }

    const blokker = [];
    const usage = {};
    let stop = null, brukt_modell = id;
    const leser = svar.body.getReader();
    const dek = new TextDecoder();
    let buf = "";
    const behandle = (ev) => {
      if (ev.type === "message_start") {
        Object.assign(usage, ev.message.usage || {});
        brukt_modell = ev.message.model || id;
      } else if (ev.type === "content_block_start") {
        blokker[ev.index] = JSON.parse(JSON.stringify(ev.content_block));
        if (ev.content_block.type === "thinking" && onTenker) onTenker();
      } else if (ev.type === "content_block_delta") {
        const b = blokker[ev.index], d = ev.delta;
        if (!b) return;
        if (d.type === "text_delta") { b.text = (b.text || "") + d.text; if (onTekst) onTekst(tekstAv(blokker)); }
        else if (d.type === "thinking_delta") b.thinking = (b.thinking || "") + d.thinking;
        else if (d.type === "signature_delta") b.signature = (b.signature || "") + d.signature;
      } else if (ev.type === "message_delta") {
        if (ev.delta && ev.delta.stop_reason) stop = ev.delta.stop_reason;
        if (ev.usage) Object.assign(usage, ev.usage);
      } else if (ev.type === "error") {
        const f = new Error(feiltekst(0, ev.error && ev.error.message));
        if (ev.error && ev.error.type === "overloaded_error") f.message = feiltekst(529);
        throw f;
      }
    };
    for (;;) {
      const { value, done } = await leser.read();
      if (done) break;
      buf += dek.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n\n")) >= 0) {
        const bit = buf.slice(0, i); buf = buf.slice(i + 2);
        const data = bit.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("");
        if (!data) continue;
        let ev; try { ev = JSON.parse(data); } catch (e) { continue; }
        behandle(ev);
      }
    }
    leggTilBruk(pris(usage, brukt_modell));
    return { content: blokker.filter(Boolean), stop, usage, modell: brukt_modell };
  }

  const tekstAv = (blokker) => blokker.filter((b) => b && b.type === "text").map((b) => b.text || "").join("");

  /* Det som sendes tilbake i neste tur. Etter en reserve midt i svaret skal
     tenkeblokkene før reserveblokken ut; tekst blir stående. */
  function tilHistorikk(content) {
    const sist = content.map((b) => b.type).lastIndexOf("fallback");
    return content.filter((b, i) => b.type !== "fallback" &&
      (i > sist || b.type === "text") && (b.type !== "text" || (b.text || "").trim()));
  }
  const utenTenking = (msgs) => msgs.map((m) => (m.role !== "assistant" || typeof m.content === "string") ? m
    : { role: m.role, content: m.content.filter((b) => b.type !== "thinking" && b.type !== "redacted_thinking") });

  /* Ett forsøk til uten tenkeblokker hvis API-et avviser signaturene, for
     eksempel etter at modellen er byttet midt i samtalen. */
  async function strømMedRetry(opts) {
    try { return await strøm(opts); }
    catch (e) {
      if (e.status === 400 && /signature|thinking/i.test(e.rå || "")) return strøm(Object.assign({}, opts, { messages: utenTenking(opts.messages) }));
      throw e;
    }
  }

  /* ================= markdown ================= */
  /* Liten og streng: alt escapes først, så legges et fåtall mønstre på. Claude
     svarer i markdown. Vi trenger avsnitt, lister, fet, kursiv, kode,
     overskrifter og enkle tabeller. */
  const PUNKT = /^\s*([-*•]|\d+[.)])\s+/;
  /* En tabellrad starter og slutter med |. Den siste linjen under en tabell
     kan mangle sluttstreken mens svaret strømmer inn. */
  const HEL_RAD = /^\s*\|.*\|\s*$/;
  const tabellrad = (linjer, i) => HEL_RAD.test(linjer[i]) ||
    (i === linjer.length - 1 && i > 0 && /^\s*\|/.test(linjer[i]) && HEL_RAD.test(linjer[i - 1]));
  function md(tekst) {
    const esc = S.u.escapeHtml;
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, "$1<i>$2</i>");
    const linjer = String(tekst || "").replace(/\r/g, "").split("\n");
    const ut = [];
    let i = 0;
    while (i < linjer.length) {
      const l = linjer[i];
      if (/^```/.test(l)) {
        const kode = []; i++;
        while (i < linjer.length && !/^```/.test(linjer[i])) kode.push(linjer[i++]);
        i++; ut.push("<pre><code>" + esc(kode.join("\n")) + "</code></pre>"); continue;
      }
      const h = /^(#{1,4})\s+(.*)$/.exec(l);
      if (h) { ut.push("<h4>" + inline(h[2]) + "</h4>"); i++; continue; }
      if (tabellrad(linjer, i)) {
        const rader = [];
        while (i < linjer.length && tabellrad(linjer, i)) rader.push(linjer[i++]);
        const celler = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        const kropp = rader.filter((r) => !/^\s*\|[\s:|-]+\|\s*$/.test(r));
        ut.push('<div class="tabell-scroll"><table class="data">' + kropp.map((r, n) =>
          "<tr>" + celler(r).map((c) => (n === 0 && rader.length > 1 ? "<th>" : "<td>") + inline(c) + (n === 0 && rader.length > 1 ? "</th>" : "</td>")).join("") + "</tr>").join("") + "</table></div>");
        continue;
      }
      if (PUNKT.test(l)) {
        /* Én liste per type. Innrykkede punkter under et punkt blir en
           underliste, som Claude ofte skriver under nummererte punkter. */
        const innrykk = (x) => /^\s*/.exec(x)[0].length;
        const nummer = /^\s*\d+[.)]\s/.test(l);
        const bunn = innrykk(l);
        const pkt = [];
        while (i < linjer.length && PUNKT.test(linjer[i])) {
          const x = linjer[i];
          const under = innrykk(x) > bunn;
          if (!under && /^\s*\d+[.)]\s/.test(x) !== nummer) break;
          const tekst = inline(x.replace(PUNKT, ""));
          if (under && pkt.length) pkt[pkt.length - 1].under.push(tekst);
          else pkt.push({ tekst, under: [] });
          i++;
        }
        ut.push((nummer ? "<ol>" : "<ul>") + pkt.map((p) => "<li>" + p.tekst +
          (p.under.length ? "<ul>" + p.under.map((u) => "<li>" + u + "</li>").join("") + "</ul>" : "") + "</li>").join("") + (nummer ? "</ol>" : "</ul>"));
        continue;
      }
      if (!l.trim()) { i++; continue; }
      /* Første linje tas alltid med. Uten det gikk tegneren i evig løkke på en
         linje som så ut som starten på en blokk uten å være det («|ρ| ≤ 1»,
         eller en tabellrad som ennå strømmer inn), og hele siden frøs. */
      const avsnitt = [linjer[i++]];
      while (i < linjer.length && linjer[i].trim() && !/^(```|#{1,4}\s|\s*([-*•]|\d+[.)])\s+)/.test(linjer[i]) && !tabellrad(linjer, i)) avsnitt.push(linjer[i++]);
      ut.push("<p>" + avsnitt.map(inline).join("<br>") + "</p>");
    }
    return ut.join("");
  }

  /* Fagdataene er HTML. Claude leser ren tekst bedre. Tabellene må bevares
     som rader, ellers flyter tallene i ett. */
  function ren(html) {
    if (!html) return "";
    const d = document.createElement("div");
    d.innerHTML = String(html);
    /* Kildens innrykk og linjeskift er formatering, ikke innhold. */
    const gå = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
    for (let n = gå.nextNode(); n; n = gå.nextNode()) n.nodeValue = n.nodeValue.replace(/\s+/g, " ");
    d.querySelectorAll("table").forEach((tab) => {
      tab.textContent = [...tab.querySelectorAll("tr")]
        .map((tr) => "| " + [...tr.children].map((c) => c.textContent.trim()).join(" | ") + " |").join("\n");
    });
    d.querySelectorAll("br").forEach((n) => n.replaceWith("\n"));
    d.querySelectorAll("li").forEach((li) => { li.prepend("- "); li.append("\n"); });
    d.querySelectorAll("p, h1, h2, h3, h4, table, ul, ol, div").forEach((n) => { n.prepend("\n"); n.append("\n\n"); });
    return d.textContent.replace(/[ \t]*\n[ \t]*/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  /* ================= siden du står på ================= */
  /* Teksten slik den vises, med det du har skrevet i feltene. innerText tar
     bare med det som synes, så lukkede paneler og skjult fasit blir borte. */
  function sidetekst() {
    const rot = document.querySelector(".content");
    if (!rot) return "";
    const kopi = rot.cloneNode(true);
    const ekte = rot.querySelectorAll("textarea, input[type=text], input[type=number], input:not([type])");
    const falsk = kopi.querySelectorAll("textarea, input[type=text], input[type=number], input:not([type])");
    falsk.forEach((f, n) => {
      const v = ekte[n] && ekte[n].value && ekte[n].value.trim();
      f.replaceWith(document.createTextNode(v ? `\n[Det jeg har skrevet i feltet: «${v}»]\n` : ""));
    });
    /* Knappene blir stående: svaralternativene er knapper. Fargene som viser
       hva du valgte og hva som var riktig, blir til tekst. Alle flervalgene
       i appen bruker de samme klassene. */
    kopi.querySelectorAll("svg, script, style").forEach((n) => n.remove());
    kopi.querySelectorAll(".opt").forEach((o) => {
      const merke = o.classList.contains("wrong") ? " [mitt svar, feil]" : o.classList.contains("correct") ? " [riktig svar]"
        : o.classList.contains("sel") ? " [valgt]" : "";
      if (merke) o.append(merke);
    });
    /* innerText trenger et element i dokumentet for å vite hva som synes. */
    kopi.style.cssText = "position:fixed;left:-99999px;top:0;width:900px;";
    document.body.appendChild(kopi);
    let t = kopi.innerText || "";
    kopi.remove();
    /* Åpne vinduer over siden (hurtiginnføring, formelark) hører også til. */
    document.querySelectorAll(".tr-modal-bak, .fa-vindu:not([hidden])").forEach((m) => { t += "\n\n[Åpent vindu]\n" + (m.innerText || ""); });
    t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    /* Rundt 8 000 tokens. Lengre sider kuttes med en merknad. */
    const MAKS = 30000;
    return t.length > MAKS ? t.slice(0, MAKS) + "\n\n[Siden er lengre enn dette og er kuttet her.]" : t;
  }

  /* Sidens overskrift, ellers menypunktet som er aktivt. */
  const sidetittel = () => ((document.querySelector(".content h1") || document.querySelector(".nav-item.active span") || {}).textContent || "").trim();
  function kontekst() {
    const sub = window.EDU_SUBJECT || {};
    const hash = decodeURIComponent(location.hash || "#/");
    const tittel = sidetittel();
    return { sti: hash, tittel, fag: sub.name || "", tekst: sidetekst() };
  }

  /* ================= systemprompten ================= */
  function systemprompt() {
    const sub = window.EDU_SUBJECT || {};
    return `Du er studieassistenten i «Super Enkel Eksamen», en øveapp for emner ved NHH. Studenten øver nå til ${sub.name || "et emne"}${sub.code ? " (" + sub.code + ")" : ""}.

Hver melding fra studenten kan ha med en <side>-blokk: teksten på siden studenten står på i appen, med det studenten har skrevet i feltene. Bruk den til å forstå hva «denne oppgaven», «B» eller «formelen her» viser til. Står det <side samme="ja"/>, er studenten på samme side som i forrige melding.

Slik svarer du:
- På norsk, kort og direkte. Svar på det studenten spør om først, så forklaringen. Bruk lister og små tabeller når det gjør det klarere.
- Bruk tallene, satsene og reglene i pensum og på siden framfor det du husker selv. Skatteregler endres hvert år. Appen bruker reglene emnet pensumfører. Ser noe på siden ut til å være feil, si det tydelig og forklar hvorfor.
- Skriv formler som vanlig tekst med Unicode (σ², r_f, Σ, ×, ≈), aldri LaTeX.
- Er fasiten ikke synlig på siden ennå, har studenten trolig ikke svart. Gi da et hint eller framgangsmåten først. Gi svaret bare hvis studenten ber om det.
- Når studenten har svart feil, finn den konkrete feilen i resonnementet, ikke bare hva som er riktig.
- Skriveregler: ingen tankestrek (den lange streken) og ikke komma foran «og».`;
  }

  /* ================= chatpanelet ================= */
  const chat = {
    meldinger: [],      // det som sendes til API-et
    vist: [],           // { rolle, tekst, kontekst?, kostnad? } til visning
    sisteSide: null,    // sti + tekst i forrige melding, for «samme side»
    system: null,       // frosset ved første melding
    kjører: null,       // AbortController mens et svar strømmer
    kostnad: 0,
  };
  let knapp = null, panel = null, åpen = false;
  const SNAKKEBOBLE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM8 10h8M8 13.5h5"/></svg>';

  function nyttVindu() {
    if (chat.kjører) chat.kjører.abort();
    chat.meldinger = []; chat.vist = []; chat.sisteSide = null; chat.system = null; chat.kostnad = 0; chat.effort = null;
  }

  function mount(body) {
    if (knapp) return;
    knapp = el("button.cl-knapp", { type: "button", title: "Spør Claude om det du ser på", "aria-expanded": "false",
      onclick: () => (åpen ? lukk() : åpne()) },
      el("span.cl-merke", { html: SNAKKEBOBLE }), el("span.cl-knapptekst", "Spør Claude"));
    panel = el(".cl-panel", { hidden: "", role: "dialog", "aria-label": "Spør Claude" });
    body.appendChild(knapp);
    body.appendChild(panel);
    body.classList.add("har-claude");
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && åpen) lukk(); });
  }

  function åpne() {
    if (!panel) return;
    if (S.formelark && S.formelark.lukk) S.formelark.lukk();
    åpen = true; panel.hidden = false;
    knapp.setAttribute("aria-expanded", "true"); knapp.classList.add("aktiv");
    document.body.classList.add("cl-åpen");
    tegn();
    const felt = panel.querySelector("textarea");
    if (felt && window.matchMedia("(hover:hover)").matches) felt.focus({ preventScroll: true });
  }
  function lukk() {
    if (!panel) return;
    åpen = false; panel.hidden = true;
    knapp.setAttribute("aria-expanded", "false"); knapp.classList.remove("aktiv");
    document.body.classList.remove("cl-åpen");
  }

  function hode() {
    return el(".cl-hode",
      el("div", { style: { flex: "1", minWidth: 0 } },
        el(".cl-tittel", "Spør Claude"),
        el(".cl-under", harNøkkel() ? MODELLER[modell()].navn + " · ser siden du står på" : "Med din egen API-nøkkel")),
      harNøkkel() && chat.vist.length ? el("button.btn.ghost.sm", { type: "button", title: "Start en ny samtale",
        onclick: () => { nyttVindu(); tegn(); } }, "Ny samtale") : null,
      el("button.cl-lukk", { type: "button", title: "Lukk (Esc)", "aria-label": "Lukk", onclick: lukk }, "×"));
  }

  function tegn() {
    if (!panel || !åpen) return;
    /* Det du holder på å skrive, overlever at panelet tegnes på nytt. */
    const gammelt = panel.querySelector(".cl-felt");
    const utkast = gammelt ? gammelt.value : "";
    const fokus = gammelt && document.activeElement === gammelt;
    S.u.mount(panel, hode(), harNøkkel() ? samtale() : oppsett({ iPanel: true }));
    const nytt = panel.querySelector(".cl-felt");
    if (nytt && utkast) nytt.value = utkast;
    if (nytt && fokus) nytt.focus({ preventScroll: true });
    const liste = panel.querySelector(".cl-liste");
    if (liste) liste.scrollTop = liste.scrollHeight;
  }

  function samtale() {
    const liste = el(".cl-liste");
    if (!chat.vist.length) {
      liste.appendChild(el(".cl-tom",
        el("p", "Spør om det du ser på. Claude får med teksten på siden og det du har skrevet, så du kan skrive «hvorfor er ikke B riktig?» eller «forklar formelen øverst»."),
        el(".cl-forslag", ["Forklar dette enklere", "Gi meg et hint", "Hvor gjorde jeg feil?", "Lag et lignende spørsmål"].map((f) =>
          el("button.chip", { type: "button", onclick: () => send(f) }, f)))));
    }
    chat.vist.forEach((m) => liste.appendChild(boble(m)));

    const felt = el("textarea.cl-felt", { rows: 2, placeholder: "Skriv et spørsmål …", maxlength: 6000,
      onkeydown: (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(felt.value); } } });
    const sendKnapp = chat.kjører
      ? el("button.btn.sm.ghost", { type: "button", onclick: () => chat.kjører && chat.kjører.abort() }, "Stopp")
      : el("button.btn.sm.primary", { type: "button", onclick: () => send(felt.value) }, "Send");
    const fot = el(".cl-fot",
      el(".cl-skriv", felt, sendKnapp),
      el(".cl-info",
        el("span", "Ser: " + (sidetittel() || location.hash || "forsiden")),
        el(".spacer"),
        el("span", { title: "Anslag ut fra API-prisene. Kontoen din i Console er fasiten." },
          (chat.kostnad ? "Samtalen " + dollar(chat.kostnad) + " · " : "") + "måneden " + dollar(brukt()))));
    return el(".cl-kropp", liste, fot);
  }

  function boble(m) {
    if (m.rolle === "bruker") return el(".cl-m.bruker", el(".cl-boble", m.tekst),
      m.side ? el(".cl-side", "fra " + m.side) : null);
    const b = el(".cl-m.claude");
    const innhold = el(".cl-boble.prose");
    if (m.feil) innhold.appendChild(el("p.cl-feil", m.feil));
    else if (!m.tekst && m.venter) innhold.appendChild(el("p.cl-tenker", m.tenker ? "Tenker …" : "…"));
    else innhold.innerHTML = md(m.tekst);
    b.appendChild(innhold);
    if (m.kostnad != null && !m.venter) b.appendChild(el(".cl-side", dollar(m.kostnad)));
    m.node = innhold;
    return b;
  }

  async function send(tekst) {
    tekst = String(tekst || "").trim();
    if (!tekst || chat.kjører || !harNøkkel()) return;
    const felt = panel && panel.querySelector(".cl-felt");
    if (felt) felt.value = "";
    if (!chat.system) chat.system = systemprompt();
    const k = kontekst();
    const sideNøkkel = k.sti + "\n" + k.tekst;
    const samme = chat.sisteSide === sideNøkkel;
    chat.sisteSide = sideNøkkel;
    const sideblokk = samme ? '<side samme="ja"/>'
      : `<side sti="${k.sti}"${k.tittel ? ` tittel="${k.tittel.replace(/"/g, "'")}"` : ""}>\n${k.tekst}\n</side>`;
    chat.meldinger.push({ role: "user", content: sideblokk + "\n\n" + tekst });
    chat.vist.push({ rolle: "bruker", tekst, side: samme ? null : (k.tittel || k.sti) });
    const svar = { rolle: "claude", tekst: "", venter: true };
    chat.vist.push(svar);
    /* En samtale som startet som vurdering, beholder innsatsen den hadde, så
       cachen fortsatt treffer. */
    await kjør(svar, { effort: chat.effort || "medium" });
  }

  /* Strømmer svaret inn i boblen. Brukes både av chatten og når en vurdering
     flyttes over til chatten. */
  async function kjør(svar, { effort }) {
    chat.kjører = new AbortController();
    tegn();
    try {
      const r = await strømMedRetry({
        system: chat.system, messages: chat.meldinger, effort, signal: chat.kjører.signal,
        onTenker: () => { svar.tenker = true; if (svar.node && !svar.tekst) svar.node.innerHTML = '<p class="cl-tenker">Tenker …</p>'; },
        onTekst: (t) => { svar.tekst = t; if (svar.node) { svar.node.innerHTML = md(t); rullNed(); } },
      });
      svar.venter = false;
      svar.kostnad = pris(r.usage, r.modell);
      chat.kostnad += svar.kostnad;
      if (r.stop === "refusal") svar.feil = "Claude avslo å svare på dette. Prøv å formulere spørsmålet annerledes.";
      else if (r.stop === "max_tokens") svar.tekst += "\n\n*(Svaret ble for langt og er kuttet.)*";
      const innhold = tilHistorikk(r.content);
      /* En tom tur kan ikke sendes tilbake. Da fjernes brukermeldingen også, så
         samtalen fortsatt veksler mellom bruker og assistent. */
      if (r.stop === "refusal" || !innhold.length) chat.meldinger.pop();
      else chat.meldinger.push({ role: "assistant", content: innhold });
    } catch (e) {
      svar.venter = false;
      if (e && e.name === "AbortError") {
        /* Stoppet: det som kom, blir stående som svar. */
        if (svar.tekst) chat.meldinger.push({ role: "assistant", content: [{ type: "text", text: svar.tekst }] });
        else { chat.meldinger.pop(); svar.feil = "Stoppet."; }
      } else {
        chat.meldinger.pop();
        svar.feil = (e && e.message) || String(e);
      }
    }
    chat.kjører = null;
    tegn();
  }
  function rullNed() {
    const liste = panel && panel.querySelector(".cl-liste");
    if (liste && liste.scrollHeight - liste.scrollTop - liste.clientHeight < 140) liste.scrollTop = liste.scrollHeight;
  }

  /* Overtar en vurdering som første tur i chatten, så du kan svare på
     oppfølgingsspørsmålet eller spørre videre. */
  function fortsettIChat(prompt, content, effort) {
    nyttVindu();
    chat.system = systemprompt();
    /* Første chatmelding etter vurderingen får med siden, så Claude ser alt
       du ser, også det vurderingen ikke tok med. */
    chat.meldinger = [{ role: "user", content: prompt }, { role: "assistant", content: tilHistorikk(content) }];
    chat.vist = [{ rolle: "bruker", tekst: "Vurder svaret mitt." }, { rolle: "claude", tekst: tekstAv(content) }];
    chat.effort = effort || "high";
    åpne();
  }

  /* ================= oppsett ================= */
  function oppsett({ iPanel } = {}) {
    const boks = el(iPanel ? ".cl-oppsett" : "div");
    const felt = el("input.input", { type: "password", autocomplete: "off", spellcheck: "false",
      placeholder: "sk-ant-api03-…", style: { width: "100%", fontFamily: "var(--mono, monospace)" } });
    felt.value = nøkkel();
    const status = el("p.tiny", { style: { margin: "8px 0 0", minHeight: "1.5em" } });
    const velg = el("select.input", { style: { width: "100%" } },
      Object.keys(MODELLER).map((id) => {
        const o = el("option", { value: id }, `${MODELLER[id].navn} (${MODELLER[id].hint}) · $${MODELLER[id].inn} / $${MODELLER[id].ut} per mill. tokens`);
        if (id === modell()) o.selected = true;
        return o;
      }));
    velg.addEventListener("change", () => { settModell(velg.value); nyttVindu(); S.u.toast("Modell: " + MODELLER[velg.value].navn); });

    async function lagre() {
      const v = felt.value.trim();
      if (!/^sk-ant-/.test(v)) { status.textContent = "Det ser ikke ut som en API-nøkkel. Den starter med sk-ant-."; status.style.color = "var(--rose, #c0392b)"; return; }
      settNøkkel(v);
      status.textContent = "Sjekker nøkkelen …"; status.style.color = "";
      const ok = await test();
      status.textContent = ok === true ? "Nøkkelen virker. Den er lagret i denne nettleseren." : ok;
      status.style.color = ok === true ? "var(--green, #1f8a4c)" : "var(--rose, #c0392b)";
      if (ok === true) { S.u.toast("Claude er klar"); if (iPanel) setTimeout(tegn, 700); else S.app.refresh(); }
    }

    boks.appendChild(el("p", { style: { margin: "0 0 10px" } },
      "Lim inn din egen API-nøkkel fra Anthropic. Da kan Claude vurdere svarene dine mot fasiten og svare på spørsmål om siden du står på. Forbruket går på din egen konto."));
    boks.appendChild(el("ol.tiny", { style: { margin: "0 0 12px", paddingLeft: "18px", lineHeight: 1.6 } },
      el("li", "Lag en konto og fyll på kreditt i ", el("a", { href: "https://platform.claude.com", target: "_blank", rel: "noopener" }, "Claude Console"), ". Et Pro- eller Max-abonnement dekker ikke API-bruk."),
      el("li", "Lag en egen nøkkel til dette under ", el("a", { href: KONSOLL, target: "_blank", rel: "noopener" }, "API keys"), ". Sett en lav månedlig utgiftsgrense under Limits."),
      el("li", "Lim den inn her. Den lagres bare i denne nettleseren og sendes bare til Anthropic.")));
    boks.appendChild(felt);
    boks.appendChild(el(".row.wrap", { style: { gap: "8px", marginTop: "10px", alignItems: "center" } },
      el("button.btn.sm.primary", { type: "button", onclick: lagre }, harNøkkel() ? "Lagre og test" : "Lagre"),
      harNøkkel() ? el("button.btn.sm.ghost", { type: "button", onclick: () => {
        glem(); nyttVindu(); S.u.toast("Nøkkelen er fjernet fra denne nettleseren");
        if (iPanel) tegn(); else S.app.refresh();
      } }, "Fjern nøkkelen") : null));
    boks.appendChild(status);
    boks.appendChild(el("p.tiny.muted", { style: { margin: "12px 0 6px" } }, "Modell"));
    boks.appendChild(velg);
    boks.appendChild(el("p.tiny.muted", { style: { margin: "12px 0 0", lineHeight: 1.55 } },
      "Omtrent pris med Sonnet 5.5: en vurdering av et svar 2–3 cent, en chatmelding rundt 1 cent. ",
      "Nøkkelen kan leses av kode som kjører på denne siden. Siden laster ingen skript utenfra, men bruk likevel en egen nøkkel med lav grense. Fjern den på maskiner du deler med andre."));
    return boks;
  }

  /* Gratis sjekk: modelloppslaget koster ingen tokens. */
  async function test() {
    try {
      const r = await fetch("https://api.anthropic.com/v1/models/" + modell(), { headers: {
        "x-api-key": nøkkel(), "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" } });
      if (r.ok) return true;
      let m = ""; try { const j = await r.json(); m = (j.error && j.error.message) || ""; } catch (e) {}
      return feiltekst(r.status, m);
    } catch (e) { return "Fikk ikke kontakt med Anthropic. Sjekk nettet."; }
  }

  /* Kortet på Konto-siden. */
  function innstillingskort() {
    return el(".card", { style: { marginTop: "20px" } },
      el("h3", { style: { margin: "0 0 4px" } }, "Claude"),
      el(".tiny.muted", { style: { marginBottom: "12px" } }, harNøkkel()
        ? `Nøkkel lagret i denne nettleseren · ${MODELLER[modell()].navn} · brukt denne måneden ca. ${dollar(brukt())}`
        : "Ingen nøkkel. Knappene kopierer en ferdig melding du kan lime inn i Claude i stedet."),
      oppsett());
  }

  /* ================= vurdering av et svar ================= */
  /* Boks med knapp. Med nøkkel strømmes vurderingen rett inn; uten nøkkel
     kopieres prompten og «Åpne Claude» åpner claude.ai.
     opts: { id, prompt: () => string, knapp, forklaring, forklaringUten, effort }

     Visningene tegnes helt på nytt når du trykker noe (poeng, avkrysning), så
     vurderingen lagres per id i minnet. Den nye boksen tar over der den gamle
     slapp, også midt i en strøm. */
  const vurderinger = new Map();

  function vurdering(opts) {
    const id = opts.id || Math.random().toString(36).slice(2);
    const v = vurderinger.get(id) || { tilstand: null, ctrl: null, boks: null };
    vurderinger.set(id, v);
    v.boks = el(".cl-vurdering");
    v.opts = opts;

    function tegnBoks() {
      const { tilstand, ctrl, boks } = v;
      const rad = el(".row.wrap", { style: { gap: "8px", alignItems: "center" } });
      if (harNøkkel()) {
        if (ctrl) rad.appendChild(el("button.btn.sm.ghost", { type: "button", onclick: () => v.ctrl && v.ctrl.abort() }, "Stopp"));
        else rad.appendChild(el("button.btn.sm.primary", { type: "button", onclick: start }, tilstand ? "Vurder på nytt" : opts.knapp));
        if (tilstand && tilstand.content && !ctrl) rad.appendChild(el("button.btn.sm.ghost", { type: "button",
          onclick: () => fortsettIChat(tilstand.prompt, tilstand.content, opts.effort) }, "Svar eller spør videre i chatten"));
        rad.appendChild(el(".spacer"));
        if (tilstand && tilstand.kostnad != null) rad.appendChild(el("span.tiny.muted", dollar(tilstand.kostnad)));
      } else {
        rad.appendChild(el("button.btn.sm.primary", { type: "button", onclick: async () => {
          const ok = await S.u.tilUtklipp(opts.prompt());
          S.u.toast(ok ? "Kopiert. Lim det inn i Claude" : "Fikk ikke kopiert. Prøv igjen, eller i en annen nettleser.");
        } }, opts.knapp + " (kopier)"));
        rad.appendChild(el("a.btn.sm.ghost", { href: "https://claude.ai/new", target: "_blank", rel: "noopener" }, "Åpne Claude ↗"));
        rad.appendChild(el("button.btn.sm.ghost", { type: "button", title: "Legg inn din egen API-nøkkel", onclick: åpne }, "Svar her i appen"));
      }
      const deler = [rad];
      if (!tilstand) deler.push(el("p.tiny.muted", { style: { margin: "6px 0 0" } },
        harNøkkel() ? opts.forklaring : opts.forklaringUten || opts.forklaring));
      else {
        const kropp = el(".cl-vurdering-tekst.prose");
        if (tilstand.feil) kropp.appendChild(el("p.cl-feil", tilstand.feil));
        else if (!tilstand.tekst) kropp.appendChild(el("p.cl-tenker", tilstand.tenker ? "Leser svaret ditt og tenker …" : "Sender …"));
        else kropp.innerHTML = md(tilstand.tekst);
        tilstand.node = kropp;
        deler.push(kropp);
      }
      S.u.mount(boks, ...deler);
    }
    v.tegn = tegnBoks;

    async function start() {
      const prompt = v.opts.prompt();
      const tilstand = { prompt, tekst: "" };
      v.tilstand = tilstand;
      v.ctrl = new AbortController();
      v.tegn();
      try {
        const r = await strømMedRetry({
          system: systemprompt(), messages: [{ role: "user", content: prompt }],
          effort: v.opts.effort || "high", signal: v.ctrl.signal,
          onTenker: () => { tilstand.tenker = true; if (tilstand.node && !tilstand.tekst) tilstand.node.innerHTML = '<p class="cl-tenker">Leser svaret ditt og tenker …</p>'; },
          onTekst: (t) => { tilstand.tekst = t; if (tilstand.node) tilstand.node.innerHTML = md(t); },
        });
        tilstand.kostnad = pris(r.usage, r.modell);
        if (r.stop === "refusal") tilstand.feil = "Claude avslo å vurdere dette.";
        else tilstand.content = r.content;
      } catch (e) {
        if (!(e && e.name === "AbortError")) tilstand.feil = (e && e.message) || String(e);
        else if (!tilstand.tekst) v.tilstand = null;
      }
      v.ctrl = null;
      v.tegn();
    }

    tegnBoks();
    return v.boks;
  }

  S.claude = { mount, åpne, lukk, vurdering, innstillingskort, harNøkkel, ren, md, strøm };
})(window.EDU);
