/* ===================== PRIVATE FAG — bare for den som eier dem =====================
   Alt i repoet og på GitHub Pages kan leses av alle. Private fag ligger derfor
   ikke der, men i en privat bøtte i Supabase Storage («privat»). Tilgangsregelen
   (docs/supabase.sql) slipper bare inn den innloggede brukeren, og bare i brukerens
   egen mappe:

     privat/<bruker-id>/fag.json           listen over fagene, samme form som
                                           et fag i js/subjects.js
     privat/<bruker-id>/<fag-id>/<fil>     fagets filer

   Stiene i fag.json er relative til fagets mappe («data.js», «manual.html»).
   Her gjøres de om til signerte adresser som varer i seks timer, og fagene legges
   inn i EDU_SUBJECTS med privat: true. Resten av appen ser dem som vanlige fag.

   Fagene skrives lokalt i fag/privat-<navn>/, som .gitignore holder utenfor
   repoet, og lastes opp med tools/last-opp-privat.py. På localhost leses de i
   tillegg rett fra mappen (fag/privat-indeks.json), så du kan se et fag før du
   laster det opp.

   Kalles fra boot.js før faget velges, og igjen når du logger inn.

   Utvidelser. En oppføring med "type": "utvidelse" er ikke et fag, men en
   modul som legger seg inn i alle fag (for eksempel en planlegger). Den vises
   ikke i fagvelgeren. Skriptene lastes av boot.js før appen tegnes, og
   registrerer seg selv med S.utvidelser.registrer (boot.js).
   ============================================================================ */
window.EDU = window.EDU || {};
(function (S) {
  const BØTTE = "privat";
  const HAR = "edu.privat.har";          // husker at det finnes private fag, så velgeren kan be deg logge inn
  const LEVETID = 6 * 3600;              // sekunder en signert adresse varer
  let lastet = null;            // selve jobben
  const utvidelser = new Map();  // id -> { id, scripts } for oppføringer med type "utvidelse"
  const utvLastet = new Set();   // skriptene som allerede er lastet
  /* Hva som skjedde sist, så velgeren og Konto kan si det. */
  const status = { tilstand: "av", melding: "", antall: 0, bruker: "" };

  const lokal = () => /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  function harLagretØkt() {
    try { return Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k)); } catch (e) { return false; }
  }
  function merk(n) { try { if (n) localStorage.setItem(HAR, "1"); } catch (e) {} }
  const harHatt = () => { try { return localStorage.getItem(HAR) === "1"; } catch (e) { return false; } };

  /* Alle filstiene et fag viser til, relative til fagets mappe. */
  function stier(fag) {
    const ut = [].concat(fag.scripts || []);
    Object.values(fag.lazy || {}).forEach((l) => ut.push(...l));
    if (fag.manual) ut.push(...(fag.manual.candidates || []));
    if (fag.problems) ut.push(...(fag.problems.candidates || []));
    return [...new Set(ut)];
  }

  /* Legger faget inn i fagregisteret med stiene byttet ut. Et privat fag kan
     aldri overta id-en til et offentlig. */
  function registrer(fag, adresse) {
    if (!fag || !fag.id || !/^privat-[a-z0-9-]+$/.test(fag.id)) return false;
    const m = (l) => (l || []).map(adresse).filter(Boolean);
    if (fag.type === "utvidelse") {
      /* Signerte adresser har allerede en spørrestreng. Lokale stier får
         versjonen på, så en endring vises uten at byggnummeret må opp. */
      const v = fag.versjon ? "?u=" + encodeURIComponent(fag.versjon) : "";
      utvidelser.set(fag.id, { id: fag.id, scripts: m(fag.scripts).map((u) => (u.indexOf("?") < 0 ? u + v : u)) });
      return true;
    }
    const s = Object.assign({}, fag, {
      privat: true,
      scripts: m(fag.scripts),
      lazy: fag.lazy ? Object.fromEntries(Object.entries(fag.lazy).map(([k, v]) => [k, m(v)])) : undefined,
      manual: fag.manual ? Object.assign({}, fag.manual, { candidates: m(fag.manual.candidates) }) : undefined,
      problems: fag.problems ? Object.assign({}, fag.problems, { candidates: m(fag.problems.candidates) }) : undefined,
    });
    const liste = window.EDU_SUBJECTS || (window.EDU_SUBJECTS = []);
    const i = liste.findIndex((x) => x.id === s.id);
    if (i >= 0 && !liste[i].privat) return false;
    if (i >= 0) liste[i] = s; else liste.push(s);
    return true;
  }

  /* Fra Supabase: listen og signerte adresser til alle filene. */
  async function fraSky() {
    if (!S.account || !S.account.klient || !S.account.configured()) { status.grunn = "Innloggingen er ikke satt opp."; return 0; }
    const k = await S.account.klient();
    if (!k) { status.grunn = "Innloggingen er ikke satt opp."; return 0; }
    const { data } = await k.auth.getSession();
    const økt = data && data.session;
    if (!økt) { status.grunn = "Du er ikke logget inn."; return 0; }
    const uid = økt.user.id;
    status.bruker = uid.slice(0, 8);
    const lager = k.storage.from(BØTTE);
    const { data: blob, error } = await lager.download(`${uid}/fag.json`);
    if (error || !blob) {
      /* Ingen fag.json betyr bare at du ikke har lastet opp noe. Alt annet er en feil. */
      const m = String((error && (error.message || error.error)) || "");
      if (/not.?found|404|object not found/i.test(m) || (error && (error.status === 404 || error.statusCode === "404"))) {
        /* Supabase svarer «finnes ikke» også når tilgangsregelen nekter. */
        status.grunn = `Fant ingen private fag for denne kontoen (bruker-id ${uid.slice(0, 8)}…). Er de lastet opp med samme e-post som du er logget inn med?`;
        return 0;
      }
      throw new Error("fikk ikke hentet listen over private fag" + (m ? ": " + m : ""));
    }
    let fag = [];
    try { fag = JSON.parse(await blob.text()); } catch (e) { console.warn("privat: fag.json kunne ikke leses", e); return 0; }
    if (!Array.isArray(fag)) return 0;
    const alle = fag.flatMap((f) => stier(f).map((p) => `${uid}/${f.id}/${p}`));
    const adr = new Map();
    if (alle.length) {
      const { data: sign, error: e2 } = await lager.createSignedUrls(alle, LEVETID);
      if (e2) throw new Error("fikk ikke signert adressene: " + (e2.message || e2));
      (sign || []).forEach((x) => { if (x && x.signedUrl && x.path) adr.set(x.path, x.signedUrl); });
    }
    let n = 0;
    fag.forEach((f) => { if (registrer(f, (p) => adr.get(`${uid}/${f.id}/${p}`))) n++; });
    return n;
  }

  /* På localhost: rett fra fag/<id>/, så du ser endringer før opplasting. */
  async function fraMappe() {
    if (!lokal()) return 0;
    let ids = [];
    try { const r = await fetch("fag/privat-indeks.json", { cache: "no-store" }); if (!r.ok) return 0; ids = await r.json(); } catch (e) { return 0; }
    let n = 0;
    for (const id of ids) {
      try {
        const r = await fetch(`fag/${id}/fag.json`, { cache: "no-store" });
        if (!r.ok) continue;
        const f = await r.json();
        if (f.id !== id) continue;
        /* Lokalt bustes cachen med tiden, så endringer vises med en gang. */
        f.versjon = "lokal-" + Date.now();
        if (registrer(f, (p) => `fag/${id}/${p}`)) n++;
      } catch (e) {}
    }
    return n;
  }

  /* Laster de private fagene. Løftet blir ferdig når alt er hentet, uansett hvor
     lang tid det tar; oppstarten bruker vent() i stedet, som gir opp etter noen
     sekunder. Fag som kommer etter det, legges likevel inn, og velgeren tegnes på
     nytt når den er åpen. */
  function last({ tvungen } = {}) {
    if (lastet && !tvungen) return lastet;
    if (!tvungen && !lokal() && !harLagretØkt()) { status.tilstand = "av"; return (lastet = Promise.resolve(0)); }
    status.tilstand = "laster"; status.melding = ""; status.grunn = "";
    /* Et tidsavbrudd, så hentingen aldri blir stående og «hente» i det uendelige. */
    const medFrist = (p, ms, hva) => Promise.race([p, new Promise((_, nei) => setTimeout(() => nei(new Error(hva)), ms))]);
    lastet = (async () => {
      let n = 0, feil = "";
      try { n += await medFrist(fraSky(), 20000, "Tidsavbrudd: fikk ikke svar fra Supabase på 20 sekunder. Last siden på nytt."); }
      catch (e) { feil = (e && e.message) || String(e); console.warn("privat:", e); }
      try { n += await fraMappe(); } catch (e) {}
      merk(n);
      Object.assign(status, { tilstand: feil ? "feil" : "ok", melding: feil, antall: antall() });
      return n;
    })();
    return lastet;
  }
  /* Laster skriptene til utvidelsene som er funnet så langt. Trygg å kalle flere
     ganger: et skript lastes bare én gang. */
  async function lastUtvidelser() {
    const nye = [...utvidelser.values()].flatMap((u) => u.scripts).filter((u) => !utvLastet.has(u));
    nye.forEach((u) => utvLastet.add(u));
    if (nye.length && S.picker) { try { await S.picker.loadScripts(nye); } catch (e) { console.warn("privat: en utvidelse kunne ikke lastes", e); } }
    return utvidelser.size;
  }
  function vent(ms) { return Promise.race([last(), new Promise((res) => setTimeout(() => res(0), ms || 8000))]); }

  const antall = () => (window.EDU_SUBJECTS || []).filter((s) => s.privat).length;

  S.privat = { last, vent, antall, harHatt, lastUtvidelser, status: () => Object.assign({}, status) };
})(window.EDU);
