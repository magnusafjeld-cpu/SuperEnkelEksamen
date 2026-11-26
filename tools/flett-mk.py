"""Setter sammen «Må kunne» (Eksamenstrening) og fletter det inn i sett.js.

Oppgavetypene, tiers og teksten øverst står i fag/<fag>/_mk/typer.json:
    { "intro": "…", "tiers": [{ "nr", "navn", "tekst" }],
      "typer": [{ "id", "tier", "navn", "hvorfor", "signaler": [{ "hvor", "sitat" }],
                  "skribent" }] }
Hver type får tre oppgaver, én per sett: mk-<typeId>-1, -2 og -3. Skribentene skriver
    fag/<fag>/_mk/<skribent>_regn.py   regner alt og skriver de to filene under
    fag/<fag>/_mk/<skribent>.json      { "mk-<typeId>-<nr>": oppgave, … }
    fag/<fag>/_mk/<skribent>_svar.json { "mk-<typeId>-<nr>:1:<etikett>": {…}, … }
En oppgave er som i deleksamenene (n = 1, title, points, topic, chapters, body, parts …).

Bruk fra prosjektroten:
    python3 tools/flett-mk.py fie402               kontroller alt, skriv ingenting
    python3 tools/flett-mk.py fie402 --blind DIR   skriv oppgavene uten løsning og
                                                   kriterier til DIR (én fil per type)
    python3 tools/flett-mk.py fie402 --skriv       flett inn i sett.js og skriv
                                                   _svar/mk-*.json
    … --tier 1                                     bare tier 1 (eller 1 og 2 med --tier 2),
                                                   så en tier kan legges ut før den neste er
                                                   kontrollert

I sett.js står alt mellom merkene MÅ KUNNE og MÅ KUNNE SLUTT sist i filen, og blokken
skrives på nytt hver gang. Typer uten ferdige oppgaver tas ikke med, så tier 1 kan
leveres før tier 2 og 3. Kjør tools/sjekk-sett.js og tools/sjekk-svar.js etter --skriv.
"""
import json, os, re, sys

args = sys.argv[1:]
fag = args[0]
rot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
mappe = os.path.join(rot, "fag", fag, "_mk")
meta = json.load(open(os.path.join(mappe, "typer.json"), encoding="utf-8"))
MIN_PER_POENG = 1.8
MAKS_TIER = int(args[args.index("--tier") + 1]) if "--tier" in args else 99

feil = []
oppg = {}
svar = {}
for f in sorted(os.listdir(mappe)):
    if not f.endswith(".json") or f == "typer.json" or f.endswith("_svar.json"):
        continue
    navn = f[:-5]
    data = json.load(open(os.path.join(mappe, f), encoding="utf-8"))
    for sid, ex in data.items():
        if sid in oppg:
            feil.append(f"{f}: {sid} finnes to ganger")
        ex["_fra"] = navn
        oppg[sid] = ex
    sf = os.path.join(mappe, navn + "_svar.json")
    if os.path.exists(sf):
        for k, v in json.load(open(sf, encoding="utf-8")).items():
            if k in svar:
                feil.append(f"{navn}: svarnøkkel {k} finnes to ganger")
            svar[k] = v
    else:
        feil.append(f"{navn}: mangler {navn}_svar.json")

TEKST = ("title", "body", "solution", "merke")
def tekster(ex):
    yield from (ex.get(k, "") for k in TEKST)
    yield from ex.get("criteria", [])
    for p in ex.get("parts", []):
        yield from (p.get(k, "") for k in ("body", "solution"))
        yield from p.get("criteria", [])

def sjekk(sid, ex):
    hvor = f"{sid} ({ex['_fra']})"
    for k in ("title", "points", "topic", "chapters", "body", "merke"):
        if k not in ex:
            feil.append(f"{hvor}: mangler {k}")
    if ex.get("n") != 1:
        feil.append(f"{hvor}: n skal være 1")
    deler = ex.get("parts", [])
    if deler:
        if sum(p["points"] for p in deler) != ex["points"]:
            feil.append(f"{hvor}: delene summerer til {sum(p['points'] for p in deler)}, ikke {ex['points']}")
        nøkler = [f"{sid}:1:{p['label']}" for p in deler if not p.get("options")]
    else:
        nøkler = [f"{sid}:1:"]
    for k in nøkler:
        if k not in svar:
            feil.append(f"{hvor}: mangler svar-data {k}")
    for t in tekster(ex):
        ren = re.sub(r"</?(sub|sup|b|i)>", "", str(t))
        if "—" in ren:
            feil.append(f"{hvor}: tankestrek: …{ren[max(0, ren.index('—') - 40):ren.index('—') + 20]}…")
        m = re.search(r",\s+and\b", ren)
        if m:
            feil.append(f"{hvor}: komma før and: …{ren[max(0, m.start() - 50):m.end() + 10]}…")
        m = re.search(r",\s+og\b", ren)
        if m:
            feil.append(f"{hvor}: komma før og: …{ren[max(0, m.start() - 50):m.end() + 10]}…")
        if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", ren):
            feil.append(f"{hvor}: pronomen om Kurbatov")

typer_ut, sett_ut, brukt = [], [], set()
utenfor = set()
for t in meta["typer"]:
    ider = [f"mk-{t['id']}-{i}" for i in (1, 2, 3)]
    if t["tier"] > MAKS_TIER:
        utenfor.update(ider)
        continue
    finnes = [i for i in ider if i in oppg]
    if not finnes:
        continue
    if len(finnes) < 3:
        feil.append(f"{t['id']}: har bare {len(finnes)} av 3 oppgaver")
    for nr, sid in enumerate(ider, 1):
        if sid not in oppg:
            continue
        ex = oppg[sid]
        brukt.add(sid)
        sjekk(sid, ex)
        p = ex.get("points", 0)
        sett_ut.append({
            "id": sid, "kind": "must", "label": f"{t['navn']} · oppgave {nr}",
            "mk": {"type": t["id"], "tier": t["tier"], "nr": nr},
            "points": p, "minutes": max(5, round(p * MIN_PER_POENG)),
            "format": "1 oppgave",
            "exercises": [{k: v for k, v in ex.items() if k != "_fra"}],
        })
    typer_ut.append({k: t[k] for k in ("id", "tier", "navn", "hvorfor", "signaler") if k in t} | {"sett": finnes})

for sid in oppg:
    if sid not in brukt and sid not in utenfor:
        feil.append(f"{sid}: hører ikke til noen type i typer.json")
ider = {s["id"] for s in sett_ut}
for k in svar:
    if k.split(":")[0] not in ider and k.split(":")[0] not in utenfor:
        feil.append(f"svar-data for ukjent sett: {k}")

for f in feil:
    print("FEIL", f)
print(f"{len(typer_ut)} typer, {len(sett_ut)} oppgaver, {len(svar)} svar-oppføringer, {len(feil)} feil")

if "--blind" in args:
    d = args[args.index("--blind") + 1]
    os.makedirs(d, exist_ok=True)
    for t in typer_ut:
        ut = []
        for sid in t["sett"]:
            s = next(x for x in sett_ut if x["id"] == sid)
            b = json.loads(json.dumps(s))
            for ex in b["exercises"]:
                for k in ("solution", "criteria"):
                    ex.pop(k, None)
                for p in ex.get("parts", []):
                    for k in ("solution", "criteria"):
                        p.pop(k, None)
            ut.append(b)
        json.dump(ut, open(os.path.join(d, t["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("blinde oppgaver skrevet til", d)

if "--skriv" in args:
    if feil:
        sys.exit("skriver ikke: rett feilene først")
    p = os.path.join(rot, "fag", fag, "sett.js")
    s = open(p, encoding="utf-8").read()
    START = "/* ===================== MÅ KUNNE"
    SLUTT = "/* ===================== MÅ KUNNE SLUTT ===================== */"
    if START in s:
        s = s[:s.index(START)].rstrip() + "\n"
    mk = {"intro": meta.get("intro", ""), "tiers": meta["tiers"], "typer": typer_ut}
    blokk = ("\n" + START + " (26. november 2026) =====================\n"
             "   Eksamenstrening › Må kunne: oppgavetypene Kurbatov har hintet til, i tiers, med\n"
             "   tre hele oppgaver per type (kind: \"must\", ett sett per oppgave). Kilden er\n"
             "   fag/" + fag + "/_mk/, bygd med tools/flett-mk.py. Alt herfra skrives på nytt av skriptet.\n"
             "   ============================================================ */\n"
             "window.EDU_DATA.mustKunne = " + json.dumps(mk, ensure_ascii=False, indent=2) + ";\n"
             "window.EDU_DATA.sets.push(\n"
             + ",\n".join(json.dumps(x, ensure_ascii=False, indent=2) for x in sett_ut)
             + "\n);\n" + SLUTT + "\n")
    open(p, "w", encoding="utf-8").write(s + blokk)
    sm = os.path.join(rot, "fag", fag, "_svar")
    for f in os.listdir(sm):
        if f.startswith("mk-") and f[:-5] not in ider:
            os.remove(os.path.join(sm, f))
    for x in sett_ut:
        egne = {k: v for k, v in svar.items() if k.split(":")[0] == x["id"]}
        json.dump(egne, open(os.path.join(sm, x["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("flettet inn:", len(sett_ut), "oppgaver i", len(typer_ut), "typer")
