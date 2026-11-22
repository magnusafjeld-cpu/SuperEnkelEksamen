/* ================ SJANGERTRENING — én oppgavetype fra null til eksamen ================
   Eksamensoppgavene i et fag faller i noen få sjangre (tvillingfirmaet,
   rekapitaliseringen, realopsjonen …). Her har hver sjanger sin egen stige: en
   rekke korte steg som starter som om du ikke kan noe, og slutter med en
   oppgave på eksamensnivå. Magnus ba om det 22. oktober 2026, etter et opplegg
   han likte i FIE432.

   Hvert steg har samme form:
     1. kort teori om ett nytt begrep
     2. et lite talleksempel med pene tall
     3. én flervalgsoppgave med fire alternativer på akkurat det begrepet
   Etter svaret kommer riktig eller galt, utregningen steg for steg, en kontroll
   av svaret og hvilken typisk feil hvert galt alternativ er laget av.

   Ingen minuspoeng og ingen «stå over»: dette er læring, ikke eksamenssimulering.
   Et galt svar kan prøves på nytt, men det første svaret huskes, så stigen kan
   skille «riktig på første forsøk» fra «riktig etter hvert».

   Sidene: #/sjangre (alle sjangrene), #/sjangre/<id> (stigen i én sjanger) og
   #/sjangre/<id>/<n> (steg n). Tastatur på et steg: A–D eller 1–4 svarer,
   N eller → går til neste steg, P eller ← til forrige.

   Lagring per steg, så to enheter ikke overskriver hverandres steg i synken:
   exams["sg:<steg-id>"] = { v: indeks | null, forste: indeks, t }

   Data: EDU_DATA.sjangre = [{ id, num, title, summary, chapters, exam, intro,
         seksjon?, emne?, symboler?,
         steps: [{ id, title, theory, example, q, options, answer, solution, check, traps }] }]
   Bygget fra fag/<fag>/_sjangre/*.js med tools/bygg-sjangre.py og kontrollert
   med tools/sjekk-sjangre.js. id-ene er lagringsnøkler og må aldri endres.

   Seksjoner (22. november 2026): en sjanger med seksjon: "<id>" står ikke i
   hovedlista, men i en egen seksjon under den, beskrevet i
   EDU_DATA.sjangerSeksjoner = [{ id, tittel, tekst }]. Der står de korte
   stigene, gruppert etter emne. symboler: "<sjanger>" lar en kort stige låne
   symbolbetydningene til en lang («sg-ma» for S som synergier).
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag, tellord } = S.u;
  const sh = () => S.views.shared;
  const prosa = (html) => { const n = el(".prose", frag(html)); S.u.rullTabeller(n); return n; };

  const ALLE = () => window.EDU_DATA.sjangre || [];
  const finn = (id) => ALLE().find((g) => g.id === id) || null;
  const SEKSJONER = () => window.EDU_DATA.sjangerSeksjoner || [];
  const seksjonAv = (g) => (g.seksjon && SEKSJONER().find((x) => x.id === g.seksjon)) || null;
  const BOKSTAV = "ABCD";

  /* ---------- lagring ---------- */
  const nøkkel = (s) => "sg:" + s.id;
  const st = (s) => S.store.get().exams[nøkkel(s)] || {};
  const svart = (s) => typeof st(s).v === "number";
  const riktig = (s) => st(s).v === s.answer;
  const førsteRiktig = (s) => st(s).forste === s.answer;
  function svar(s, i) {
    if (svart(s)) return;
    const før = st(s);
    S.store.setExam(nøkkel(s), { v: i, forste: typeof før.forste === "number" ? før.forste : i, t: Date.now() });
  }
  /* Nytt forsøk: svaret tømmes, men det første svaret står, så «riktig på
     første forsøk» ikke kan pyntes i ettertid. null og ikke delete, så synken
     ser at svaret er tatt bort. */
  const prøvIgjen = (s) => S.store.setExam(nøkkel(s), { v: null, t: Date.now() });

  const antallRiktig = (g) => (g.steps || []).filter(riktig).length;
  const nesteSteg = (g) => { const i = (g.steps || []).findIndex((s) => !riktig(s)); return i < 0 ? null : i; };
  const påbegynt = (g) => (g.steps || []).some((s) => typeof st(s).forste === "number");

  function statusChip(s) {
    if (riktig(s)) return el(".chip.green", el(".dot"), førsteRiktig(s) ? "Riktig" : "Riktig etter nytt forsøk");
    if (svart(s)) return el(".chip.rose", el(".dot"), "Galt");
    if (typeof st(s).forste === "number") return el(".chip.amber", el(".dot"), "Prøv igjen");
    return null;
  }

  /* ---------- ett steg ---------- */
  let aktivt = null;   // { g, i } for tastaturet; null når et steg ikke vises

  function oppgaven(g, s) {
    const kort = el(".card.pad-lg.sg-oppgave");
    kort.appendChild(el(".row", { style: { gap: "10px", alignItems: "center", marginBottom: "10px" } },
      el("h3", { style: { fontSize: "17px", margin: 0 } }, "Oppgave"), el(".spacer"), statusChip(s)));
    kort.appendChild(prosa(s.q || ""));
    const ferdig = svart(s), valgt = st(s).v;
    const alt = el("div", { style: { marginTop: "12px" } });
    (s.options || []).forEach((o, i) => {
      let cls = "button.opt";
      if (ferdig) cls += i === s.answer ? ".correct" : (i === valgt ? ".wrong" : ".dim");
      alt.appendChild(el(cls, { disabled: ferdig, onclick: () => { svar(s, i); S.app.refresh(); } },
        el(".key", BOKSTAV[i]), el("span", frag(String(o)))));
    });
    kort.appendChild(alt);
    if (!ferdig) {
      kort.appendChild(el("p.tiny.muted", { style: { margin: "10px 0 0" } },
        "Regn på papir før du velger. Tastene A–D svarer."));
      return kort;
    }
    const rett = valgt === s.answer;
    const fasit = el(".explain.sg-fasit", { style: { marginTop: "14px" } });
    fasit.appendChild(el(".sg-dom" + (rett ? ".rett" : ".galt"),
      rett ? "Riktig." : `Galt. Riktig svar er ${BOKSTAV[s.answer]}.`));
    if (!rett && s.traps && s.traps[valgt]) fasit.appendChild(el("p.sg-dinfeil", el("b", "Det du valgte: "), frag(String(s.traps[valgt]))));
    fasit.appendChild(el(".sg-hode", "Utregningen"));
    fasit.appendChild(prosa(s.solution || ""));
    if (s.check) {
      fasit.appendChild(el(".sg-hode", "Kontroll"));
      fasit.appendChild(prosa(s.check));
    }
    const feller = (s.traps || []).map((t, i) => t ? { i, t } : null).filter(Boolean);
    if (feller.length) {
      fasit.appendChild(el(".sg-hode", "Hva de gale alternativene er laget av"));
      fasit.appendChild(el("ul.sg-feller", feller.map((f) =>
        el("li" + (f.i === valgt ? ".valgt" : ""), el("b", BOKSTAV[f.i] + ": "), frag(String(f.t))))));
    }
    kort.appendChild(fasit);
    return kort;
  }

  function prikker(g, aktivIndeks) {
    return el(".sg-prikker", (g.steps || []).map((s, i) =>
      el("a.sg-prikk" + (riktig(s) ? ".rett" : svart(s) ? ".galt" : "") + (i === aktivIndeks ? ".her" : ""),
        { href: `#/sjangre/${g.id}/${i + 1}`, title: `Steg ${i + 1}: ${s.title}`, "aria-label": `Steg ${i + 1}: ${s.title}` }, String(i + 1))));
  }

  function renderSteg(g, nStr) {
    const steg = g.steps || [];
    const i = Math.min(Math.max(parseInt(nStr, 10) || 1, 1), steg.length) - 1;
    const s = steg[i];
    const wrap = el("div");
    if (!s) return wrap;
    aktivt = { g, i };

    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "12px", alignItems: "center" } },
      el("a.btn.ghost.sm", { href: "#/sjangre/" + g.id }, "← " + g.title),
      el(".spacer"),
      el("span.tiny.muted", `Steg ${i + 1} av ${steg.length}`)));
    wrap.appendChild(prikker(g, i));
    wrap.appendChild(el("h2.sg-tittel", s.title));

    wrap.appendChild(el(".card.pad-lg", { style: { marginBottom: "14px" } },
      el(".eyebrow", "Teori"), prosa(s.theory || "")));
    /* Eksempelet er en .worked-boks med egen overskrift, så den står uten kort rundt. */
    if (s.example) wrap.appendChild(el(".sg-eksempel", prosa(s.example)));
    wrap.appendChild(oppgaven(g, s));
    /* Hold over et symbol for å se hva det er, i teori, eksempel, oppgave og
       fasit. Sjangerens egne betydninger («sg-<id>» i symbolordlisten) går foran
       de felles: S er aksjekursen i opsjoner, men synergiene i fusjoner. */
    if (S.symboler) S.symboler.merk(wrap, "sg-" + (g.symboler || g.id), { overalt: true });

    const forrige = i > 0 ? el("a.btn.ghost", { href: `#/sjangre/${g.id}/${i}` }, "← Forrige steg") : null;
    const igjen = svart(s) && !riktig(s)
      ? el("button.btn", { onclick: () => { prøvIgjen(s); S.app.refresh(); } }, "Prøv igjen") : null;
    const neste = i < steg.length - 1
      ? el("a.btn" + (svart(s) ? ".primary" : ".ghost"), { href: `#/sjangre/${g.id}/${i + 2}` }, "Neste steg →")
      : el("a.btn" + (svart(s) ? ".primary" : ".ghost"), { href: "#/sjangre/" + g.id }, "Tilbake til stigen");
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginTop: "14px" } }, forrige, el(".spacer"), igjen, neste));
    return wrap;
  }

  /* Tastaturet virker bare mens et steg vises, og aldri mens man skriver
     (Claude-chatten har et tekstfelt). */
  document.addEventListener("keydown", (e) => {
    if (!aktivt || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!/^#\/sjangre\/[^/]+\/\d+/.test(location.hash)) { aktivt = null; return; }
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const { g, i } = aktivt, s = g.steps[i];
    const k = e.key.toUpperCase();
    const valg = "ABCD".indexOf(k) > -1 ? "ABCD".indexOf(k) : "1234".indexOf(k);
    if (valg > -1 && valg < (s.options || []).length && !svart(s)) { e.preventDefault(); svar(s, valg); S.app.refresh(); return; }
    if ((k === "N" || e.key === "ArrowRight") && i < g.steps.length - 1) { e.preventDefault(); location.hash = `#/sjangre/${g.id}/${i + 2}`; return; }
    if ((k === "P" || e.key === "ArrowLeft") && i > 0) { e.preventDefault(); location.hash = `#/sjangre/${g.id}/${i}`; }
  });

  /* ---------- stigen i én sjanger ---------- */
  function renderSjanger(g) {
    aktivt = null;
    const steg = g.steps || [];
    const wrap = el(".fade-in");
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px" } },
      el("a.btn.ghost.sm", { href: "#/sjangre" }, "← Alle sjangre")));
    const sek = seksjonAv(g);
    wrap.appendChild(sh().pageHead(sek ? "Sjangertrening · " + sek.tittel : "Sjangertrening", g.title, g.summary || ""));

    const r = antallRiktig(g), neste = nesteSteg(g);
    const topp = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    if (g.intro) topp.appendChild(prosa(g.intro));
    const meta = [];
    if (g.exam) meta.push(el("span", el("b", "På eksamen: "), g.exam));
    if ((g.chapters || []).length) meta.push(el("span", el("b", "Pensum: "),
      ...g.chapters.map((c, k) => { const kap = S.data.chapter(c); return [k ? ", " : "", el("a", { href: "#/chapter/" + c }, kap ? `k${c} ${kap.title}` : "k" + c)]; }).flat()));
    if (meta.length) topp.appendChild(el(".sg-meta", meta));
    topp.appendChild(el(".row.wrap", { style: { gap: "12px", alignItems: "center", marginTop: "14px" } },
      el(".sg-framdrift", S.u.bar(steg.length ? r / steg.length * 100 : 0, { green: r === steg.length }),
        el("span.tiny.muted", `${r} av ${steg.length} steg riktig`)),
      el(".spacer"),
      neste === null
        ? el("a.btn.ghost", { href: `#/sjangre/${g.id}/1` }, "Gå gjennom på nytt")
        : el("a.btn.primary", { href: `#/sjangre/${g.id}/${neste + 1}` }, påbegynt(g) ? `Fortsett med steg ${neste + 1}` : "Start på steg 1")));
    wrap.appendChild(topp);

    const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    kort.appendChild(el(".eyebrow", "Stigen"));
    const liste = el(".kap-liste", { style: { marginTop: "10px" } });
    steg.forEach((s, i) => {
      const href = `#/sjangre/${g.id}/${i + 1}`;
      liste.appendChild(el(".kap-rad",
        el("a.kap-radtekst", { href, style: { color: "inherit", textDecoration: "none" } },
          el(".kap-radnavn", `${i + 1}. ${s.title}`)),
        el(".kap-radhoyre", statusChip(s),
          el("a.btn.sm" + (i === neste ? ".primary" : ".ghost"), { href }, riktig(s) ? "Se igjen" : svart(s) ? "Prøv igjen" : "Åpne"))));
    });
    kort.appendChild(liste);
    wrap.appendChild(kort);
    return wrap;
  }

  /* ---------- alle sjangrene ---------- */
  function rad(g, nr) {
    const n = (g.steps || []).length, r = antallRiktig(g), neste = nesteSteg(g), igang = påbegynt(g);
    const href = "#/sjangre/" + g.id;
    return el(".kap-rad",
      el("a.kap-radtekst", { href, style: { color: "inherit", textDecoration: "none" } },
        el(".kap-radnavn", `${nr}. ${g.title}`),
        el(".kap-radtall", [g.summary, g.exam].filter(Boolean).join(" · ")),
        igang ? el(".sg-framdrift", { style: { marginTop: "6px", maxWidth: "260px" } },
          S.u.bar(n ? r / n * 100 : 0, { green: r === n, thin: true }), el("span.tiny.muted", `${r} av ${n}`)) : null),
      el(".kap-radhoyre",
        r === n && n ? el(".chip.green", el(".dot"), "Mestret") : null,
        el("a.btn.sm" + (r === n && n ? ".ghost" : ".primary"),
          { href: neste === null ? href : `${href}/${neste + 1}` },
          r === n && n ? "Se stigen" : igang ? "Fortsett" : "Start")));
  }

  function renderListe() {
    aktivt = null;
    const wrap = el(".fade-in");
    const alle = ALLE();
    if (!alle.length) {
      wrap.appendChild(sh().empty("🪜", "Ingen sjangre ennå", "Faget har ikke lagt inn EDU_DATA.sjangre."));
      return wrap;
    }
    const hoved = alle.filter((g) => !seksjonAv(g));
    const korte = alle.length - hoved.length;
    const antSteg = alle.reduce((a, g) => a + (g.steps || []).length, 0);
    wrap.appendChild(sh().pageHead("Øving", "Sjangertrening",
      [tellord(hoved.length, "sjanger", "sjangre"), korte ? tellord(korte, "kort stige", "korte stiger") : null,
        `${antSteg} steg · fra null til eksamensnivå`].filter(Boolean).join(" · ")));
    wrap.appendChild(el("p.sub", { style: { maxWidth: "64ch", margin: "0 0 22px" } },
      "Hver sjanger er én type eksamensoppgave, lært som en stige. Hvert steg tar ett nytt begrep: kort teori, "
      + "et lite eksempel med pene tall og én flervalgsoppgave. Etter svaret får du utregningen, en kontroll "
      + "og hvilken feil hvert galt alternativ er laget av. Første steg forutsetter ingenting; siste steg er "
      + "en oppgave på eksamensnivå. Sjangrene står etter hvor ofte de kommer på eksamen."));

    const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    kort.appendChild(el(".kap-liste", hoved.map((g) => rad(g, g.num))));
    wrap.appendChild(kort);

    /* Seksjonene under hovedlista, med emneoverskrifter når emnet skifter. */
    SEKSJONER().forEach((sek) => {
      const egne = alle.filter((g) => g.seksjon === sek.id);
      if (!egne.length) return;
      wrap.appendChild(el("h2.sg-seksjon", { id: "seksjon-" + sek.id }, sek.tittel));
      if (sek.tekst) wrap.appendChild(el("p.sub", { style: { maxWidth: "64ch", margin: "0 0 14px" } }, sek.tekst));
      const sk = el(".card.pad-lg", { style: { marginBottom: "18px" } });
      let emne = null, liste = null;
      egne.forEach((g, i) => {
        if (!liste || (g.emne && g.emne !== emne)) {
          emne = g.emne || null;
          if (emne) sk.appendChild(el(".sg-emne", emne));
          liste = el(".kap-liste");
          sk.appendChild(liste);
        }
        liste.appendChild(rad(g, i + 1));
      });
      wrap.appendChild(sk);
    });
    return wrap;
  }

  function render(id, n) {
    if (id === undefined) return renderListe();
    const g = finn(id);
    if (!g) return renderListe();
    return n === undefined ? renderSjanger(g) : renderSteg(g, n);
  }

  S.views.sjangre = { render, finnes: () => ALLE().length > 0 };
})(window.EDU);
