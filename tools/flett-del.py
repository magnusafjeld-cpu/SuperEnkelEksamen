"""Setter sammen deleksamenene med egne oppgaver og fletter dem inn i sett.js.

Skribentene skriver hver sin del (docs/fie402-deleksamen-spek.md):
    fag/<fag>/_del/<skribent>_regn.py   regner alt og skriver de to filene under
    fag/<fag>/_del/<skribent>.json      { "<settId>": [oppgave, …], … }
    fag/<fag>/_del/<skribent>_svar.json { "<settId>:<n>:<etikett>": {…}, … }
Hodene til settene (id, del, art, label, poeng, minutter) står i
fag/<fag>/_del/sett.json. Ett sett kan ha oppgaver fra flere skribenter.

Bruk fra prosjektroten:
    python3 tools/flett-del.py fie402               kontroller alt, skriv ingenting
    python3 tools/flett-del.py fie402 --blind DIR   skriv settene uten løsning,
                                                    kriterier og svar til DIR
    python3 tools/flett-del.py fie402 --skriv       flett inn i sett.js og skriv
                                                    _svar/<settId>.json

I sett.js står settene i EDU_DATA.sets.push(…) etter EDU_DATA.perDel, etter
merket EGNE OPPGAVER. Alt mellom merket og «);» skrives på nytt hver gang, så
skriptet kan kjøres igjen. Kontrollen her er grov (poeng, nøkler, språk);
kjør tools/sjekk-sett.js og tools/sjekk-svar.js etter --skriv.
"""
import json, os, re, sys

args = sys.argv[1:]
fag = args[0]
rot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
mappe = os.path.join(rot, "fag", fag, "_del")
hoder = json.load(open(os.path.join(mappe, "sett.json"), encoding="utf-8"))

feil = []
oppg = {h["id"]: [] for h in hoder}
svar = {}
for f in sorted(os.listdir(mappe)):
    if not f.endswith(".json") or f == "sett.json" or f.endswith("_svar.json"):
        continue
    navn = f[:-5]
    data = json.load(open(os.path.join(mappe, f), encoding="utf-8"))
    for sid, liste in data.items():
        if sid not in oppg:
            feil.append(f"{f}: ukjent sett {sid}")
            continue
        for ex in liste:
            ex["_fra"] = navn
            oppg[sid].append(ex)
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

ut = []
for h in hoder:
    sid = h["id"]
    liste = sorted(oppg[sid], key=lambda e: e["n"])
    if not liste:
        feil.append(f"{sid}: ingen oppgaver ennå")
        continue
    if [e["n"] for e in liste] != list(range(1, len(liste) + 1)):
        feil.append(f"{sid}: oppgavene er ikke nummerert 1, 2, 3 …: {[e['n'] for e in liste]}")
    sum_p = 0
    for ex in liste:
        hvor = f"{sid} oppgave {ex['n']} ({ex['_fra']})"
        sum_p += ex.get("points", 0)
        for k in ("title", "points", "topic", "chapters", "body", "merke"):
            if k not in ex:
                feil.append(f"{hvor}: mangler {k}")
        deler = ex.get("parts", [])
        if deler:
            if sum(p["points"] for p in deler) != ex["points"]:
                feil.append(f"{hvor}: delene summerer til {sum(p['points'] for p in deler)}, ikke {ex['points']}")
            nøkler = [f"{sid}:{ex['n']}:{p['label']}" for p in deler if not p.get("options")]
        else:
            nøkler = [f"{sid}:{ex['n']}:"]
        for k in nøkler:
            if k not in svar:
                feil.append(f"{hvor}: mangler svar-data {k}")
        for t in tekster(ex):
            ren = re.sub(r"</?(sub|sup|b|i)>", "", str(t))
            if "—" in ren:
                feil.append(f"{hvor}: tankestrek: …{ren[max(0, ren.index('—') - 40):ren.index('—') + 20]}…")
            if re.search(r",\s+and\b", ren):
                m = re.search(r",\s+and\b", ren)
                feil.append(f"{hvor}: komma før and: …{ren[max(0, m.start() - 50):m.end() + 10]}…")
            if re.search(r",\s+og\b", ren):
                feil.append(f"{hvor}: komma før og: {ren[:80]}")
            if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", ren):
                feil.append(f"{hvor}: pronomen om Kurbatov")
    if sum_p != h["points"]:
        feil.append(f"{sid}: oppgavene summerer til {sum_p}, hodet sier {h['points']}")
    sett = dict(h)
    sett["exercises"] = [{k: v for k, v in e.items() if k != "_fra"} for e in liste]
    ut.append(sett)

ider = {s["id"] for s in ut}
for k in svar:
    if k.split(":")[0] not in ider:
        feil.append(f"svar-data for ukjent sett: {k}")

for f in feil:
    print("FEIL", f)
print(f"{len(ut)} sett, {sum(len(s['exercises']) for s in ut)} oppgaver, {len(svar)} svar-oppføringer, {len(feil)} feil")

if "--blind" in args:
    d = args[args.index("--blind") + 1]
    os.makedirs(d, exist_ok=True)
    for s in ut:
        b = json.loads(json.dumps(s))
        for ex in b["exercises"]:
            for k in ("solution", "criteria"):
                ex.pop(k, None)
            for p in ex.get("parts", []):
                for k in ("solution", "criteria"):
                    p.pop(k, None)
        json.dump(b, open(os.path.join(d, s["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("blinde sett skrevet til", d)

if "--skriv" in args:
    if feil:
        sys.exit("skriver ikke: rett feilene først")
    p = os.path.join(rot, "fag", fag, "sett.js")
    s = open(p, encoding="utf-8").read()
    merke = "/* ===================== EGNE OPPGAVER"
    start = s.index("window.EDU_DATA.sets.push(", s.index("window.EDU_DATA.perDel"))
    slutt = s.index("\n);", start)
    blokk = s[start:slutt]
    if merke in blokk:
        blokk = blokk[:blokk.index(merke)].rstrip() + "\n"
    else:
        blokk = blokk.rstrip() + "\n"
    ny = (blokk + "  " + merke + " (23. november 2026) =====================\n"
          "     Deleksamener med egne oppgaver, ikke lånt. Kilden er fag/" + fag + "/_del/, bygd med\n"
          "     tools/flett-del.py. Alt herfra til «);» skrives på nytt av skriptet.\n"
          "     ============================================================ */\n"
          + "".join(json.dumps(x, ensure_ascii=False, indent=2) + ",\n" for x in ut))
    s = s[:start] + ny.rstrip("\n") + s[slutt:]
    open(p, "w", encoding="utf-8").write(s)
    sm = os.path.join(rot, "fag", fag, "_svar")
    for x in ut:
        egne = {k: v for k, v in svar.items() if k.startswith(x["id"] + ":")}
        json.dump(egne, open(os.path.join(sm, x["id"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("flettet inn:", [x["id"] for x in ut])
