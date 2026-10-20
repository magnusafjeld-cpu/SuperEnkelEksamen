/* ================ PROBLEM SETS — øvingssettene fra kurset ================
   Settene kurset deler ut underveis, med en hintstige på hvert delspørsmål.
   Ikke eksamenssimulering (det er /sett) og ikke kapitteloppgaver: her er
   poenget å komme seg gjennom en oppgave du står fast i uten å se fasiten for
   tidlig.

   Hvert delspørsmål har fire hint som blir gradvis mer konkrete. Ett trykk
   viser neste trinn, så du tar bare så mye hjelp du trenger. Fasiten ligger bak
   en egen knapp. Hvor langt du kom i stigen, og om du åpnet fasiten, huskes.

   Sidene: #/problemsett (alle settene), #/problemsett/<id> (oppgavene i ett
   sett, med filter på stjernene) og #/problemsett/<id>/<nr> (én oppgave).

   Lagring per oppgave, så to enheter ikke overskriver hverandres oppgaver:
   exams["ps:<settId>:<nr>"] = { ferdig, hint: { a: 2 }, fasit: { a: 1 }, t }

   Data: EDU_DATA.problemsett = [{ id, nr, tittel, tema, trinn, nivaer,
         oppgaver: [{ nr, niva, tema, tittel, intro, deler: [{ l, ctx, q, hint: [4], fasit }] }] }]
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const { el, frag, tellord } = S.u;
  const sh = () => S.views.shared;
  const prosa = (html) => { const n = el(".prose", frag(html)); S.u.rullTabeller(n); return n; };

  const ALLE = () => window.EDU_DATA.problemsett || [];
  const finn = (id) => ALLE().find((p) => p.id === id) || null;
  const TRINN = ["Retning", "Verktøy", "Oppsett", "Oppskrift"];
  const NIVÅ = { 1: ["*", "Tutorial"], 2: ["**", "Forelesning"], 3: ["***", "Egen trening"] };
  const trinn = (ps) => ps.trinn || TRINN;
  const nivåer = (ps) => ps.nivaer || NIVÅ;

  /* ---------- lagring ---------- */
  const nøkkel = (ps, nr) => `ps:${ps.id}:${nr}`;
  const st = (ps, nr) => S.store.get().exams[nøkkel(ps, nr)] || {};
  const lagre = (ps, nr, patch) => S.store.setExam(nøkkel(ps, nr), Object.assign({}, patch, { t: Date.now() }));
  const erFerdig = (ps, o) => !!st(ps, o.nr).ferdig;
  const påbegynt = (ps, o) => {
    const s = st(ps, o.nr);
    return Object.values(s.hint || {}).some((n) => n > 0) || Object.keys(s.fasit || {}).length > 0;
  };
  const antallFerdig = (ps) => (ps.oppgaver || []).filter((o) => erFerdig(ps, o)).length;

  /* Filteret på stjernene gjelder til du bytter det, også når du blar mellom
     oppgavene, så «neste» blir neste oppgave av samme slag. */
  let filter = "alle";
  const synlige = (ps) => (ps.oppgaver || []).filter((o) => filter === "alle" || String(o.niva) === filter);

  const nivåmerke = (ps, o) => {
    const n = nivåer(ps)[o.niva];
    return n ? el("span.ps-niva.n" + o.niva, n[0] + " " + n[1]) : null;
  };
  const framdrift = (ps) => {
    const n = (ps.oppgaver || []).length, f = antallFerdig(ps);
    const b = S.u.bar(n ? f / n * 100 : 0, { green: f === n && n > 0 });
    return el(".ps-framdrift", b, el("span.tiny.muted", `${f} av ${n} ferdig`));
  };
  const stige = (ps) => el(".ps-stige", trinn(ps).map((t, i) => el("span", el("b", String(i + 1)), " " + t)));

  /* ---------- én oppgave ---------- */
  function ferdigKnapp(ps, o) {
    const k = el("button.ps-ferdig", { type: "button" }, el("span.ok"), el("span.tx"));
    const oppdater = () => {
      const på = erFerdig(ps, o);
      k.setAttribute("aria-pressed", String(på));
      k.querySelector(".tx").textContent = på ? "Ferdig" : "Marker som ferdig";
    };
    k.onclick = () => { lagre(ps, o.nr, { ferdig: !erFerdig(ps, o) }); oppdater(); };
    oppdater();
    return k;
  }

  function del(ps, o, d) {
    const T = trinn(ps), hint = d.hint || [];
    const boks = el(".ps-del");
    if (d.ctx) boks.appendChild(el(".ps-ctx", prosa(d.ctx)));
    boks.appendChild(el(".ps-q", el("span.ps-l", d.l + ")"), prosa(d.q)));

    const liste = el(".ps-hintene", { "aria-live": "polite" });
    const hintene = hint.map((h, i) => {
      const n = el(".ps-hint.t" + (i + 1), el(".ps-trinn", `Hint ${i + 1} · ${T[i] || ""}`), prosa(h));
      liste.appendChild(n);
      return n;
    });
    boks.appendChild(liste);

    const prikker = el("span.ps-prikker", hint.map(() => el("i")));
    const tekst = el("span");
    const knapp = el("button.ps-hintknapp", { type: "button" }, prikker, tekst);
    const skjul = el("button.ps-skjul", { type: "button" }, "Skjul hint");
    const nivå = () => Math.min((st(ps, o.nr).hint || {})[d.l] || 0, hint.length);
    const vis = () => {
      const n = nivå();
      hintene.forEach((h, i) => { h.hidden = i >= n; });
      prikker.querySelectorAll("i").forEach((x, i) => x.classList.toggle("på", i < n));
      knapp.disabled = n >= hint.length;
      tekst.textContent = n >= hint.length ? "Alle hint vist" : `Hint ${n + 1} · ${T[n] || ""}`;
      skjul.hidden = n === 0;
    };
    const settNivå = (n) => lagre(ps, o.nr, { hint: Object.assign({}, st(ps, o.nr).hint, { [d.l]: n }) });
    knapp.onclick = () => { settNivå(Math.min(nivå() + 1, hint.length)); vis(); };
    skjul.onclick = () => { settNivå(0); vis(); };
    if (hint.length) boks.appendChild(el(".ps-handling", knapp, skjul));
    vis();

    const fasit = el("details.ps-fasit", el("summary", "Vis fasit"), el(".ps-fasitkropp", prosa(d.fasit || "")));
    fasit.addEventListener("toggle", () => {
      if (fasit.open && !(st(ps, o.nr).fasit || {})[d.l]) lagre(ps, o.nr, { fasit: Object.assign({}, st(ps, o.nr).fasit, { [d.l]: 1 }) });
    });
    boks.appendChild(fasit);
    return boks;
  }

  function renderOppgave(ps, nrStr) {
    const wrap = el("div");
    const alle = ps.oppgaver || [];
    const o = alle.find((x) => String(x.nr) === String(nrStr)) || alle[0];
    if (!o) return wrap;
    /* Bla innenfor filteret, men faller oppgaven utenfor det (direkte lenke),
       blas det i hele settet. */
    const filtrert = filter !== "alle" && synlige(ps).indexOf(o) > -1;
    const rekke = filtrert ? synlige(ps) : alle;
    const i = rekke.indexOf(o);

    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px", alignItems: "center" } },
      el("a.btn.ghost.sm", { href: "#/problemsett/" + ps.id }, "← Alle oppgaver i settet"),
      el(".spacer"),
      el("span.tiny.muted", `${ps.tittel} · oppgave ${i + 1} av ${rekke.length}` + (filtrert ? ` (${nivåer(ps)[filter][1].toLowerCase()})` : ""))));

    const kort = el(".card.ps-oppg", { style: { marginBottom: "14px" } });
    kort.appendChild(el(".ps-hode",
      el(".ps-hodetekst",
        el(".ps-kicker", nivåmerke(ps, o), o.tema ? el("span", o.tema) : null),
        el("h3", `Exercise ${o.nr}. ${o.tittel}`)),
      ferdigKnapp(ps, o)));
    if (o.intro) kort.appendChild(el(".ps-intro", prosa(o.intro)));
    (o.deler || []).forEach((d) => kort.appendChild(del(ps, o, d)));
    wrap.appendChild(kort);

    const forrige = i > 0 ? el("a.btn.ghost", { href: `#/problemsett/${ps.id}/${rekke[i - 1].nr}` }, "← Forrige oppgave") : null;
    const neste = i < rekke.length - 1
      ? el("a.btn.primary", { href: `#/problemsett/${ps.id}/${rekke[i + 1].nr}` }, "Neste oppgave →")
      : el("a.btn.primary", { href: "#/problemsett/" + ps.id }, "Tilbake til oversikten");
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginTop: "4px" } }, forrige, el(".spacer"), neste));
    return wrap;
  }

  /* ---------- ett sett ---------- */
  function filterknapper(ps) {
    const alle = ps.oppgaver || [];
    const valg = [["alle", "Alle", alle.length]].concat(Object.entries(nivåer(ps))
      .map(([k, n]) => [k, n[0] + " " + n[1], alle.filter((o) => String(o.niva) === k).length])
      .filter((x) => x[2] > 0));
    return el(".ps-filter", { role: "group", "aria-label": "Filtrer oppgavene" }, valg.map(([k, navn, n]) =>
      el("button.ps-filterknapp", { type: "button", "aria-pressed": String(filter === k),
        onclick: () => { filter = k; S.app.refresh(); } }, navn + " ", el("span.muted", String(n)))));
  }

  function renderSett(ps) {
    const wrap = el(".fade-in");
    const alle = ps.oppgaver || [];
    const deler = alle.reduce((a, o) => a + (o.deler || []).length, 0);
    if (!nivåer(ps)[filter]) filter = "alle";
    wrap.appendChild(el(".row.wrap", { style: { gap: "10px", marginBottom: "16px" } },
      el("a.btn.ghost.sm", { href: "#/problemsett" }, "← Alle problem sets")));
    wrap.appendChild(sh().pageHead(ps.tittel, ps.tema,
      `${tellord(alle.length, "oppgave", "oppgaver")} · ${deler} delspørsmål · fire hint per delspørsmål`));

    const intro = el(".card", { style: { marginBottom: "18px" } });
    intro.appendChild(el("p.tiny", { style: { margin: "0 0 10px" } },
      "Prøv selv først. Står du fast, tar du ett hint om gangen: de går fra retning til en oppskrift uten tall, så du ser fasiten bare når du har regnet ferdig."));
    intro.appendChild(stige(ps));
    wrap.appendChild(intro);

    wrap.appendChild(el(".row.wrap", { style: { gap: "12px", alignItems: "center", marginBottom: "12px" } },
      filterknapper(ps), el(".spacer"), framdrift(ps)));

    const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    const liste = el(".kap-liste");
    synlige(ps).forEach((o) => {
      const ferdig = erFerdig(ps, o), igang = !ferdig && påbegynt(ps, o);
      const href = `#/problemsett/${ps.id}/${o.nr}`;
      liste.appendChild(el(".kap-rad",
        el("a.kap-radtekst", { href: href, style: { color: "inherit", textDecoration: "none" } },
          el(".kap-radnavn", `${o.nr}. ${o.tittel}`),
          el(".kap-radtall", el(".row", { style: { gap: "8px", alignItems: "center" } }, nivåmerke(ps, o),
            `${o.tema ? o.tema + " · " : ""}${tellord((o.deler || []).length, "delspørsmål", "delspørsmål")}`))),
        el(".kap-radhoyre",
          ferdig ? el(".chip.green", el(".dot"), "Ferdig") : igang ? el(".chip.amber", el(".dot"), "Påbegynt") : null,
          el("a.btn.sm" + (ferdig ? ".ghost" : ".primary"), { href: href }, ferdig ? "Se igjen" : igang ? "Fortsett" : "Løs"))));
    });
    kort.appendChild(liste);
    wrap.appendChild(kort);

    const forklaring = Object.values(nivåer(ps)).map((n) => n[0] + " " + n[1].toLowerCase()).join(", ");
    wrap.appendChild(el("p.tiny.muted", "Stjernene er fra settet: " + forklaring + "."));
    return wrap;
  }

  /* ---------- alle settene ---------- */
  function renderListe() {
    const wrap = el(".fade-in");
    const alle = ALLE();
    if (!alle.length) {
      wrap.appendChild(sh().empty("📝", "Ingen problem sets ennå", "Faget har ikke lagt inn EDU_DATA.problemsett."));
      return wrap;
    }
    wrap.appendChild(sh().pageHead("Øving", "Problem sets",
      `${tellord(alle.length, "sett", "sett")} fra kurset, med fire hint per delspørsmål og fasit`));
    const kort = el(".card.pad-lg", { style: { marginBottom: "18px" } });
    const liste = el(".kap-liste");
    alle.forEach((ps) => {
      const n = (ps.oppgaver || []).length, f = antallFerdig(ps);
      const igang = f > 0 || (ps.oppgaver || []).some((o) => påbegynt(ps, o));
      liste.appendChild(el(".kap-rad",
        el("a.kap-radtekst", { href: "#/problemsett/" + ps.id, style: { color: "inherit", textDecoration: "none" } },
          el(".kap-radnavn", ps.tittel + (ps.tema ? " · " + ps.tema : "")),
          el(".kap-radtall", `${tellord(n, "oppgave", "oppgaver")}` + (igang ? ` · ${f} ferdig` : ""))),
        el(".kap-radhoyre",
          f === n && n ? el(".chip.green", el(".dot"), "Ferdig") : igang ? el(".chip.amber", el(".dot"), "Påbegynt") : null,
          el("a.btn.sm" + (f === n && n ? ".ghost" : ".primary"), { href: "#/problemsett/" + ps.id },
            f === n && n ? "Se igjen" : igang ? "Fortsett" : "Start"))));
    });
    kort.appendChild(liste);
    wrap.appendChild(kort);
    return wrap;
  }

  function render(id, nr) {
    if (id === undefined) return renderListe();
    const ps = finn(id);
    if (!ps) return renderListe();
    return nr === undefined ? renderSett(ps) : renderOppgave(ps, nr);
  }

  S.views.problemsett = { render, finnes: () => ALLE().length > 0 };
})(window.EDU);
