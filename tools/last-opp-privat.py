#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Private fag: lag dem lokalt, last dem opp til den private Supabase-bøtta.

   Et privat fag ligger i fag/privat-<navn>/, som .gitignore holder utenfor det
   offentlige repoet. Mappen har en fag.json med de samme feltene som et fag i
   js/subjects.js, men med stier relative til mappen («data.js», «manual.html»).
   Appen (js/privat.js) viser faget bare for deg, når du er logget inn.

   Bruk:
     python3 tools/last-opp-privat.py ny privat-fie401 "FIE401 Financial Econometrics"
         lager mappen med fag.json, data.js og en liten manual.html å bygge videre på

     python3 tools/last-opp-privat.py opp privat-fie401 [privat-... ]
         laster opp filene fag.json viser til, og oppdaterer listen i bøtta

     python3 tools/last-opp-privat.py liste
         viser de private fagene som ligger i bøtta

     python3 tools/last-opp-privat.py fjern privat-fie401
         tar faget ut av listen og sletter filene i bøtta (den lokale mappen står)

   Innlogging: e-post og passord til kontoen din i appen. Passordet spørres om
   hver gang og lagres ikke. Skriptet bruker den offentlige anon-nøkkelen i
   js/config.js; tilgangsregelen i docs/supabase.sql gjør at du bare kan skrive i
   din egen mappe. service_role-nøkkelen trengs ikke, og skal aldri inn i repoet.

   Kjør docs/supabase.sql i Supabase først, så bøtta «privat» finnes.
   Bare standardbiblioteket.
"""
import getpass, json, mimetypes, os, re, sys, time, urllib.error, urllib.parse, urllib.request

ROT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
BØTTE = "privat"
INDEKS = os.path.join(ROT, "fag", "privat-indeks.json")
ID = re.compile(r"^privat-[a-z0-9]+(-[a-z0-9]+)*$")
TYPER = {".js": "application/javascript; charset=utf-8", ".html": "text/html; charset=utf-8",
         ".json": "application/json; charset=utf-8", ".css": "text/css; charset=utf-8"}


def stopp(melding):
    sys.exit("Feil: " + melding)


def konfig():
    tekst = open(os.path.join(ROT, "js", "config.js"), encoding="utf-8").read()
    url = re.search(r'supabaseUrl:\s*"([^"]+)"', tekst)
    nøkkel = re.search(r'supabaseAnonKey:\s*"([^"]+)"', tekst)
    if not url or not nøkkel:
        stopp("fant ikke supabaseUrl og supabaseAnonKey i js/config.js")
    return url.group(1).rstrip("/"), nøkkel.group(1)


def mappe(fid):
    if not ID.match(fid):
        stopp(f"«{fid}»: et privat fag må hete privat-<navn> (små bokstaver, tall og bindestrek). "
              "Bare da holder .gitignore det utenfor repoet.")
    return os.path.join(ROT, "fag", fid)


def les_manifest(fid):
    sti = os.path.join(mappe(fid), "fag.json")
    if not os.path.exists(sti):
        stopp(f"fant ikke {os.path.relpath(sti, ROT)}. Lag faget med «ny» først.")
    f = json.load(open(sti, encoding="utf-8"))
    if f.get("id") != fid:
        stopp(f"id i fag.json er «{f.get('id')}», men mappen heter {fid}")
    return f


def stier(f):
    ut = list(f.get("scripts") or [])
    for liste in (f.get("lazy") or {}).values():
        ut += liste
    for k in ("manual", "problems"):
        ut += ((f.get(k) or {}).get("candidates") or [])
    for p in ut:
        if p.startswith("/") or ".." in p.split("/"):
            stopp(f"stien «{p}» skal være relativ til fagets mappe")
    return list(dict.fromkeys(ut))


def oppdater_indeks(legg_til=(), fjern=()):
    ids = []
    if os.path.exists(INDEKS):
        try:
            ids = json.load(open(INDEKS, encoding="utf-8"))
        except ValueError:
            ids = []
    ids = [i for i in ids if i not in fjern]
    ids += [i for i in legg_til if i not in ids]
    json.dump(sorted(ids), open(INDEKS, "w", encoding="utf-8"), ensure_ascii=False, indent=2)


# ---------------------------------------------------------------- Supabase
class Sky:
    def __init__(self):
        self.url, self.anon = konfig()
        epost = os.environ.get("SEE_EPOST") or input("E-post: ").strip()
        passord = getpass.getpass("Passord (vises ikke): ")
        svar = self.kall("POST", "/auth/v1/token?grant_type=password",
                         json.dumps({"email": epost, "password": passord}).encode(),
                         {"Content-Type": "application/json"}, token=False)
        self.token = svar["access_token"]
        self.uid = svar["user"]["id"]

    def kall(self, metode, sti, data=None, hoder=None, token=True, rå=False):
        h = {"apikey": self.anon}
        if token:
            h["Authorization"] = "Bearer " + self.token
        h.update(hoder or {})
        req = urllib.request.Request(self.url + sti, data=data, method=metode, headers=h)
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                kropp = r.read()
        except urllib.error.HTTPError as e:
            tekst = e.read().decode("utf-8", "replace")
            if e.code in (400, 404) and rå:
                return None
            if "Invalid login" in tekst:
                stopp("feil e-post eller passord")
            if "Bucket not found" in tekst:
                stopp("bøtta «privat» finnes ikke. Kjør docs/supabase.sql i Supabase → SQL Editor først.")
            stopp(f"{metode} {sti.split('?')[0]} ga {e.code}: {tekst[:300]}")
        if rå:
            return kropp
        return json.loads(kropp) if kropp else None

    def last_ned(self, sti):
        return self.kall("GET", f"/storage/v1/object/authenticated/{BØTTE}/{urllib.parse.quote(sti)}", rå=True)

    def last_opp(self, sti, data, type_):
        self.kall("POST", f"/storage/v1/object/{BØTTE}/{urllib.parse.quote(sti)}", data,
                  {"Content-Type": type_, "x-upsert": "true", "Cache-Control": "max-age=60"})

    def slett(self, stier_):
        if stier_:
            self.kall("DELETE", f"/storage/v1/object/{BØTTE}", json.dumps({"prefixes": stier_}).encode(),
                      {"Content-Type": "application/json"})

    def liste(self):
        kropp = self.last_ned(f"{self.uid}/fag.json")
        if not kropp:
            return []
        try:
            return json.loads(kropp.decode("utf-8"))
        except ValueError:
            stopp("fag.json i bøtta kan ikke leses")

    def lagre_liste(self, fag):
        self.last_opp(f"{self.uid}/fag.json", json.dumps(fag, ensure_ascii=False, indent=1).encode("utf-8"),
                      TYPER[".json"])


# ---------------------------------------------------------------- kommandoer
def ny(fid, navn):
    m = mappe(fid)
    if os.path.exists(m):
        stopp(f"{os.path.relpath(m, ROT)} finnes alt")
    os.makedirs(m)
    data = open(os.path.join(ROT, "fag", "_mal", "data.js"), encoding="utf-8").read()
    idag = time.strftime("%Y-%m-%d")
    ukedag = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][time.localtime().tm_wday]
    data = (data.replace('startDate: "2026-01-06"', f'startDate: "{idag}"').replace('date: "2026-01-06"', f'date: "{idag}"')
            .replace('weekday: "Tirsdag"', f'weekday: "{ukedag}"'))
    open(os.path.join(m, "data.js"), "w", encoding="utf-8").write(data)
    kort = fid[len("privat-"):].upper()
    manifest = {
        "id": fid, "name": navn, "short": kort[:10], "tagline": "Privat fag",
        "logo": kort[:2], "blurb": "Bare synlig for deg.",
        "accent": "#6b5bd6", "accentInk": "#5444b8", "accentSoft": "#efedfb", "accentSoft2": "#dfdaf6",
        "scripts": ["data.js"],
        "manual": {"candidates": ["manual.html"], "label": "manual.html",
                   "hint": "pensum lastes inn og lagres lokalt", "refSections": {}},
        "modules": ["/plan", "/curriculum", "/quiz", "/flashcards", "/review", "/search", "/notebooklm"],
        # Uten parts og copy arver faget SAM3s deltitler og plantekst (fallgruve 3).
        "parts": [{"id": 0, "tag": "Del 0", "name": "Om faget", "chapters": [0]},
                  {"id": 1, "tag": "Del I", "name": "Pensum", "chapters": list(range(1, 40))}],
        "copy": {"planEyebrow": "Studieplan", "planIntro": "Gå gjennom kapitlene i rekkefølge og repeter det du er usikker på."},
    }
    json.dump(manifest, open(os.path.join(m, "fag.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(os.path.join(m, "manual.html"), "w", encoding="utf-8").write(f"""<!doctype html>
<html lang="no"><head><meta charset="utf-8"><title>{navn}</title></head><body>
<section id="k0"><h2 class="chap">0 · Om faget</h2>
<h3>0.1 Hva faget handler om</h3>
<p>Skriv kapitlene som seksjoner med id k1, k2 og så videre. Se SuperEnkelEksamenHjerne/10 Arkitektur/Pensumparseren.md.</p>
</section>
<section id="k1"><h2 class="chap">1 · Første kapittel</h2>
<h3>1.1 Første seksjon</h3>
<p>Innhold kommer.</p>
</section>
</body></html>
""")
    oppdater_indeks(legg_til=[fid])
    print(f"Laget {os.path.relpath(m, ROT)}/ med fag.json, data.js og manual.html.")
    print("Se det lokalt med python3 tools/serve.py, og last det opp med:")
    print(f"  python3 tools/last-opp-privat.py opp {fid}")


def opp(ids):
    manifester = [(fid, les_manifest(fid)) for fid in ids]
    for fid, f in manifester:
        for p in stier(f):
            if not os.path.exists(os.path.join(mappe(fid), p)):
                stopp(f"{fid}: fag.json viser til {p}, som ikke finnes")
    sky = Sky()
    liste = sky.liste()
    for fid, f in manifester:
        filer = ["fag.json"] + stier(f)
        for p in filer:
            data = open(os.path.join(mappe(fid), p), "rb").read()
            type_ = TYPER.get(os.path.splitext(p)[1].lower()) or mimetypes.guess_type(p)[0] or "application/octet-stream"
            sky.last_opp(f"{sky.uid}/{fid}/{p}", data, type_)
            print(f"  {fid}/{p}  ({len(data) // 1024} kB)")
        f = dict(f, versjon=time.strftime("%Y%m%d%H%M%S"))
        liste = [x for x in liste if x.get("id") != fid] + [f]
        print(f"Lastet opp {fid}: {len(filer)} filer.")
    sky.lagre_liste(liste)
    oppdater_indeks(legg_til=ids)
    print(f"Listen i bøtta har nå {len(liste)} private fag. Last appen på nytt og velg «Alle fag».")


def vis():
    sky = Sky()
    liste = sky.liste()
    if not liste:
        print("Ingen private fag i bøtta.")
    for f in liste:
        print(f"  {f.get('id'):24} {f.get('name', '')}  (versjon {f.get('versjon', '?')})")


def fjern(fid):
    mappe(fid)
    sky = Sky()
    liste = sky.liste()
    gammel = next((x for x in liste if x.get("id") == fid), None)
    if not gammel:
        stopp(f"{fid} ligger ikke i bøtta")
    sky.slett([f"{sky.uid}/{fid}/{p}" for p in ["fag.json"] + stier(gammel)])
    sky.lagre_liste([x for x in liste if x.get("id") != fid])
    print(f"Fjernet {fid} fra bøtta. Den lokale mappen fag/{fid}/ står.")


def main():
    a = sys.argv[1:]
    if not a or a[0] not in ("ny", "opp", "liste", "fjern"):
        print(__doc__); sys.exit(1)
    if a[0] == "ny":
        if len(a) < 3:
            stopp('bruk: ny privat-<navn> "Fullt navn"')
        ny(a[1], a[2])
    elif a[0] == "opp":
        if len(a) < 2:
            stopp("bruk: opp privat-<navn> [privat-<navn> …]")
        opp(a[1:])
    elif a[0] == "liste":
        vis()
    else:
        if len(a) < 2:
            stopp("bruk: fjern privat-<navn>")
        fjern(a[1])


if __name__ == "__main__":
    main()
