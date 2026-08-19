/* ===================== KONTO + SKY-SYNK =====================
   Valgfritt lag over lageret. Uten utfylt js/config.js oppfører appen seg
   nøyaktig som før — all fremdrift lokalt. Med konfig og innlogget bruker
   speiles fremdriften til Supabase, én rad per (bruker, fag).

   Synkmodellen: lokal localStorage er alltid sannheten mens du jobber, og
   skyen er kopien. Ved innlasting (og når du kommer tilbake til fanen) slås
   lokal og fjern stat sammen med mergeState() før noe skrives tilbake. Derfor
   kan to enheter jobbe uavhengig uten at den ene overskriver den andre.
   ============================================================ */
window.EDU = window.EDU || {};

(function (S) {
  const SDK_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const TABLE = "progress";
  const PULL_MIN_MS = 20000;          // ikke hent på nytt oftere enn dette

  let client = null, session = null, recovery = false;
  let status = "off", statusMsg = "", lastPull = 0;
  const listeners = new Set();

  const cfg = () => { const c = window.EDU_CONFIG || {}; return c.supabaseUrl && c.supabaseAnonKey ? c : null; };
  const el = (...a) => S.u.el(...a);

  function setStatus(s, msg) { status = s; statusMsg = msg || ""; listeners.forEach((fn) => fn()); }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

  /* ---------------- oppstart ---------------- */
  function loadSdk() {
    if (window.supabase) return Promise.resolve();
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = SDK_URL; s.async = true;
      s.onload = res; s.onerror = () => rej(new Error("Fikk ikke lastet Supabase-biblioteket"));
      document.head.appendChild(s);
    });
  }

  async function start() {
    if (!cfg()) { setStatus("off"); return; }
    try { await loadSdk(); } catch (e) { setStatus("error", e.message); return; }

    client = window.supabase.createClient(cfg().supabaseUrl, cfg().supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" },
    });

    client.auth.onAuthStateChange((event, s) => {
      session = s || null;
      if (event === "PASSWORD_RECOVERY") {
        recovery = true;
        setTimeout(() => { if (S.app) S.app.navigate("#/konto"); }, 0);   // etter at ruteren finnes
      }
      if (event === "SIGNED_IN") pull();
      if (event === "SIGNED_OUT") setStatus("local");
      listeners.forEach((fn) => fn());
    });

    const { data } = await client.auth.getSession();
    session = (data && data.session) || null;

    if (session) await pull(); else setStatus("local");

    S.store.subscribe(S.u.debounce(() => { if (session) push(); }, 1500));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { if (session) push(); }
      else if (session && Date.now() - lastPull > PULL_MIN_MS) pull();
    });
  }

  /* ---------------- synk ---------------- */
  async function pull() {
    if (!client || !session) return;
    lastPull = Date.now();
    setStatus("pulling");
    const { data, error } = await client.from(TABLE)
      .select("state").eq("user_id", session.user.id).eq("subject_id", S.store.subjectId()).maybeSingle();
    if (error) { setStatus("error", human(error)); return; }
    if (data && data.state && Object.keys(data.state).length) {
      S.store.adopt(mergeState(S.store.get(), data.state));
      if (S.app) S.app.refresh();
    }
    await push();
  }

  async function push() {
    if (!client || !session) return;
    setStatus("saving");
    const { error } = await client.from(TABLE).upsert(
      { user_id: session.user.id, subject_id: S.store.subjectId(), state: S.store.get() },
      { onConflict: "user_id,subject_id" });
    if (error) setStatus("error", human(error)); else setStatus("synced");
  }

  /* ---------------- sammenslåing ----------------
     Regelen: fremdrift skal aldri forsvinne fordi to enheter var i utakt.
     Har begge sider en verdi for samme nøkkel, vinner den nyeste — per element
     der elementet har eget tidsstempel, ellers etter statens savedAt. Tellere
     som bare går oppover (xp, forsøk, repetisjoner) tar vi maks av. */
  function mergeState(a, b) {
    const bNewer = (b.savedAt || 0) > (a.savedAt || 0);
    const newest = bNewer ? b : a, oldest = bNewer ? a : b;
    const out = JSON.parse(JSON.stringify(newest));

    out.savedAt = Math.max(a.savedAt || 0, b.savedAt || 0);
    out.startedAt = [a.startedAt, b.startedAt].filter(Boolean).sort()[0] || out.startedAt;

    // enkle oppslag der nyeste stat avgjør, men nøkler bare den andre har beholdes
    ["sections", "active", "settings"].forEach((k) => { out[k] = fill(newest[k], oldest[k]); });

    // kapitler: hvert kapittel har lastSeen, så de kan sammenlignes hver for seg
    out.chapters = byKey(a.chapters, b.chapters, (x, y) => {
      const nx = (x.lastSeen || "") >= (y.lastSeen || "") ? x : y;
      return Object.assign({}, y, x, { read: !!(x.read || y.read), understanding: nx.understanding, lastSeen: max(x.lastSeen, y.lastSeen) });
    });

    // dager: fullført er fullført; behold den tidligste fullføringsdatoen
    out.days = byKey(a.days, b.days, (x, y) => ({
      completed: !!(x.completed || y.completed),
      completedAt: [x.completedAt, y.completedAt].filter(Boolean).sort()[0] || null,
    }));

    // flashcards: kortet med nyeste vurdering vinner hele SRS-tilstanden
    out.cards = byKey(a.cards, b.cards, (x, y) => {
      const win = (x.lastTs || 0) >= (y.lastTs || 0) ? x : y;
      return Object.assign({}, win, { reviews: Math.max(x.reviews || 0, y.reviews || 0), lapses: Math.max(x.lapses || 0, y.lapses || 0) });
    });

    out.quiz = out.quiz || { answered: {}, sessions: [] };
    out.quiz.answered = byKey((a.quiz || {}).answered, (b.quiz || {}).answered, (x, y) => {
      const win = (x.lastTs || 0) >= (y.lastTs || 0) ? x : y;
      return { correct: win.correct, attempts: Math.max(x.attempts || 0, y.attempts || 0), lastTs: Math.max(x.lastTs || 0, y.lastTs || 0) };
    });
    out.quiz.sessions = dedupeBy([...((a.quiz || {}).sessions || []), ...((b.quiz || {}).sessions || [])], "ts")
      .sort((x, y) => (y.ts || 0) - (x.ts || 0)).slice(0, 300);

    out.exams = byKey(a.exams, b.exams, (x, y) => Object.assign({}, bNewer ? x : y, bNewer ? y : x));

    const al = a.lyn || {}, bl = b.lyn || {};
    out.lyn = {
      xp: Math.max(al.xp || 0, bl.xp || 0),
      plays: Math.max(al.plays || 0, bl.plays || 0),
      days: Object.assign({}, al.days, bl.days),                                   // spilte dager er en union
      best: byKey(al.best, bl.best, (x, y) => (typeof x === "number" ? Math.max(x, y) : (bNewer ? y : x))),
    };

    // dybdetrening: "kan / må øve" per spørsmål, uten tidsstempel — nyeste stat avgjør
    const ab = ((a.dybde || {}).banks) || {}, bb = ((b.dybde || {}).banks) || {};
    const banks = {};
    new Set([...Object.keys(ab), ...Object.keys(bb)]).forEach((k) => {
      banks[k] = { marks: fill((bNewer ? bb : ab)[k] && (bNewer ? bb : ab)[k].marks, (bNewer ? ab : bb)[k] && (bNewer ? ab : bb)[k].marks) };
    });
    out.dybde = { banks };
    return out;
  }
  const max = (x, y) => ((x || "") >= (y || "") ? x : y) || x || y;
  function fill(primary, fallback) { return Object.assign({}, fallback || {}, primary || {}); }
  function byKey(x, y, combine) {
    x = x || {}; y = y || {};
    const out = {};
    new Set([...Object.keys(x), ...Object.keys(y)]).forEach((k) => {
      out[k] = (k in x && k in y) ? combine(x[k] || {}, y[k] || {}) : (k in x ? x[k] : y[k]);
    });
    return out;
  }
  function dedupeBy(list, key) { const seen = new Set(); return list.filter((it) => { const v = it && it[key]; if (v == null || seen.has(v)) return v == null; seen.add(v); return true; }); }

  /* ---------------- feilmeldinger ---------------- */
  function human(err) {
    const m = String((err && err.message) || err || "");
    if (/invalid login credentials/i.test(m)) return "Feil e-post eller passord.";
    if (/user already registered|already been registered/i.test(m)) return "Det finnes allerede en konto med denne e-posten. Prøv å logge inn.";
    if (/password should be at least (\d+)/i.test(m)) return "Passordet må ha minst " + m.match(/at least (\d+)/i)[1] + " tegn.";
    if (/email not confirmed/i.test(m)) return "E-posten er ikke bekreftet ennå. Sjekk innboksen, eller skru av «Confirm email» i Supabase.";
    if (/rate limit|too many requests/i.test(m)) return "For mange forsøk på kort tid. Vent litt og prøv igjen.";
    if (/relation .*progress.* does not exist/i.test(m)) return "Tabellen «progress» finnes ikke ennå — kjør docs/supabase.sql i Supabase.";
    if (/failed to fetch|networkerror/i.test(m)) return "Fikk ikke kontakt med Supabase. Fremdriften lagres lokalt så lenge.";
    return m || "Ukjent feil.";
  }

  /* ---------------- statuslinje i sidepanelet ---------------- */
  const LABEL = {
    off: ["Kun lokalt", "Fremdriften ligger i denne nettleseren"],
    local: ["Ikke innlogget", "Logg inn for synk mellom enheter"],
    pulling: ["Henter…", ""],
    saving: ["Lagrer…", ""],
    synced: ["Synkronisert", ""],
    error: ["Synk stoppet", ""],
  };
  function mountSidebar(slot) {
    if (!slot) return;
    const draw = () => {
      const [t, sub] = LABEL[status] || LABEL.local;
      const email = session && session.user && session.user.email;
      S.u.mount(slot, el("button.acct" + (status === "error" ? ".bad" : status === "synced" ? ".ok" : ""), {
        onclick: () => S.app.navigate("#/konto"),
        title: statusMsg || sub || "",
      }, el(".acct-dot"), el("div", el(".acct-t", email || t), el(".acct-s", email ? (LABEL[status] || [])[0] || "" : sub || ""))));
    };
    draw(); onChange(draw);
  }
  /* Liten innloggingsstatus nederst i fag-velgeren. */
  function mountPickerSlot(foot) {
    if (!foot || !cfg()) return;
    const email = session && session.user && session.user.email;
    foot.appendChild(el(".tiny.muted", email ? "Innlogget som " + email : "Ikke innlogget — fremdriften lagres lokalt"));
  }

  /* ---------------- #/konto ---------------- */
  function field(label, attrs) {
    const input = el("input.input", attrs);
    return { row: el(".field", el("label.field-l", label), input), input };
  }
  function msgBox() { return el(".acct-msg", { style: { display: "none" } }); }
  function say(box, text, kind) { box.textContent = text; box.className = "acct-msg " + (kind || ""); box.style.display = text ? "" : "none"; }

  function render() {
    const wrap = el(".page");
    wrap.appendChild(el(".page-head", el("h1", "Konto"), el("p.muted", "Logg inn for å ta med fremdriften mellom telefon og PC.")));

    if (!cfg()) wrap.appendChild(setupCard());
    else if (recovery) wrap.appendChild(newPasswordCard());
    else if (session) wrap.appendChild(signedInCard());
    else wrap.appendChild(signInCard());

    /* Også her, ikke bare i sidepanelet — sidepanelet finnes ikke på mobil. */
    wrap.appendChild(el(".card", { style: { marginTop: "20px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" } },
      el("div", { style: { flex: "1 1 220px" } },
        el("div", { style: { fontWeight: 560 } }, "Fag: " + ((window.EDU_SUBJECT || {}).name || "")),
        el(".tiny.muted", "Hvert fag har sin egen fremdrift og synkes for seg.")),
      el("button.btn.ghost", { onclick: () => S.picker.show({ cancel: true }) }, "Alle fag")));
    return wrap;
  }

  function setupCard() {
    return el(".card",
      el("h3", "Synk er ikke satt opp ennå"),
      el("p.muted", "Appen virker helt fint uten — fremdriften lagres da i denne nettleseren alene. For å slå på kontoer og synk:"),
      el("ol.acct-steps",
        el("li", "Kjør SQL-en i ", el("code", "docs/supabase.sql"), " i Supabase → SQL Editor."),
        el("li", "Kopier Project URL og anon-nøkkelen fra Project Settings → API."),
        el("li", "Lim dem inn i ", el("code", "js/config.js"), " og last siden på nytt.")),
      el("p.tiny.muted", "Full oppskrift ligger i docs/supabase-oppsett.md."));
  }

  function signedInCard() {
    const box = msgBox();
    const [t] = LABEL[status] || LABEL.local;
    const card = el(".card",
      el(".acct-head", el(".acct-avatar", (session.user.email || "?")[0].toUpperCase()),
        el("div", el("div", { style: { fontWeight: 600 } }, session.user.email),
          el(".tiny.muted", t + (statusMsg ? " · " + statusMsg : "")))),
      el("p.tiny.muted", "Fremdriften i «" + ((window.EDU_SUBJECT || {}).name || S.store.subjectId()) + "» speiles til Supabase. Hvert fag synkes for seg."),
      box,
      el(".acct-actions",
        el("button.btn.primary", { onclick: async (e) => { e.target.disabled = true; say(box, "Synkroniserer…"); await pull(); e.target.disabled = false; say(box, status === "error" ? statusMsg : "Synkronisert.", status === "error" ? "bad" : "ok"); } }, "Synkroniser nå"),
        el("button.btn.ghost", { onclick: async () => { await client.auth.signOut(); session = null; setStatus("local"); S.u.toast("Logget ut"); S.app.refresh(); } }, "Logg ut")));
    return card;
  }

  function signInCard() {
    const box = msgBox();
    const email = field("E-post", { type: "email", autocomplete: "email", placeholder: "deg@eksempel.no", required: "required" });
    const pw = field("Passord", { type: "password", autocomplete: "current-password", placeholder: "Minst 6 tegn", required: "required" });
    let mode = "in";

    const title = el("h3", "Logg inn");
    const submit = el("button.btn.primary.lg", { type: "submit" }, "Logg inn");
    const toggle = el("button.linkbtn", { type: "button" }, "Har du ikke konto? Opprett en");
    const forgot = el("button.linkbtn", { type: "button" }, "Glemt passord?");

    toggle.onclick = () => {
      mode = mode === "in" ? "up" : "in";
      title.textContent = submit.textContent = mode === "in" ? "Logg inn" : "Opprett konto";
      toggle.textContent = mode === "in" ? "Har du ikke konto? Opprett en" : "Har du konto? Logg inn";
      forgot.style.display = mode === "in" ? "" : "none";
      pw.input.setAttribute("autocomplete", mode === "in" ? "current-password" : "new-password");
      say(box, "");
    };
    forgot.onclick = async () => {
      if (!email.input.value) { say(box, "Skriv e-posten din først, så sender jeg en lenke dit.", "bad"); return; }
      say(box, "Sender…");
      const { error } = await client.auth.resetPasswordForEmail(email.input.value.trim(), { redirectTo: location.origin + location.pathname });
      say(box, error ? human(error) : "Sjekk innboksen — lenken tar deg tilbake hit for å velge nytt passord.", error ? "bad" : "ok");
    };

    const form = el("form.acct-form", { onsubmit: async (ev) => {
      ev.preventDefault();
      submit.disabled = true; say(box, mode === "in" ? "Logger inn…" : "Oppretter konto…");
      const creds = { email: email.input.value.trim(), password: pw.input.value };
      const r = mode === "in" ? await client.auth.signInWithPassword(creds)
        : await client.auth.signUp({ ...creds, options: { emailRedirectTo: location.origin + location.pathname } });
      submit.disabled = false;
      if (r.error) { say(box, human(r.error), "bad"); return; }
      if (mode === "up" && r.data.user && !r.data.session) { say(box, "Konto opprettet. Bekreft e-posten via lenken vi sendte, så kan du logge inn.", "ok"); return; }
      session = r.data.session; say(box, "");
      S.u.toast(mode === "in" ? "Logget inn" : "Konto opprettet");
      await pull(); S.app.refresh();
    } },
      email.row, pw.row, box, submit,
      el(".acct-links", toggle, forgot));

    return el(".card", title, form,
      el("p.tiny.muted", { style: { marginTop: "14px" } },
        "Fremdriften du allerede har i denne nettleseren blir slått sammen med det som ligger på kontoen — ingenting overskrives."));
  }

  function newPasswordCard() {
    const box = msgBox();
    const pw = field("Nytt passord", { type: "password", autocomplete: "new-password", placeholder: "Minst 6 tegn", required: "required" });
    const form = el("form.acct-form", { onsubmit: async (ev) => {
      ev.preventDefault(); say(box, "Lagrer…");
      const { error } = await client.auth.updateUser({ password: pw.input.value });
      if (error) { say(box, human(error), "bad"); return; }
      recovery = false; S.u.toast("Passordet er endret"); await pull(); S.app.refresh();
    } }, pw.row, box, el("button.btn.primary.lg", { type: "submit" }, "Lagre nytt passord"));
    return el(".card", el("h3", "Velg nytt passord"), form);
  }

  S.account = { start, render, mountSidebar, mountPickerSlot, pull, push, onChange, mergeState, configured: () => !!cfg(), status: () => status };
})(window.EDU);
