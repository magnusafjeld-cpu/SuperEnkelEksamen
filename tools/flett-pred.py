"""Kontrollerer prediksjonseksamenene og fletter dem inn i sett.js.

Prediksjonseksamenene er hele prøveeksamener (kind: "mock") med fane: "pred", så de får
sin egen fane «Prediksjon» i Eksamenssett. Spesifikasjon: docs/fie402-prediksjon-spek.md.

Kildene ligger i fag/<fag>/_pred/:
    fane.json            { "id": "pred", "navn": "…", "intro": "…" }
    predN_regn.py        regner alle tall og skriver de to filene under (python3 -I)
    predN.json           hele settet: id, kind, fane, nr, label, minutes, points, format,
                         note, facts, exercises (n, title, points, topic, chapters, body,
                         merke, parts med label, points, body, solution, criteria)
    predN_svar.json      { "predN:<n>:<etikett>": {…} } etter docs/fie402-svar-spek.md

Bruk fra prosjektroten:
    python3 tools/flett-pred.py fie402                 kontroller alt, skriv ingenting
    python3 tools/flett-pred.py fie402 --blind DIR     skriv settene uten løsning og
                                                       kriterier til DIR
    python3 tools/flett-pred.py fie402 --skriv         flett inn i sett.js og skriv
                                                       _svar/predN.json
    … --sett pred1,pred2                               bare disse settene

I sett.js står blokken mellom merkene PREDIKSJON og PREDIKSJON SLUTT, rett før MÅ KUNNE
(tools/flett-mk.py skriver alt fra MÅ KUNNE og ut på nytt, så blokken må stå foran).
Kjør etterpå: python3 tools/bygg-svar.py fie402, node tools/sjekk-sett.js,
node tools/sjekk-svar.js fie402 <id …> og bump byggnummeret i index.html.
"""
import json, os, re, sys

args = sys.argv[1:]
fag = args[0]
rot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
mappe = os.path.join(rot, "fag", fag, "_pred")
fane = json.load(open(os.path.join(mappe, "fane.json"), encoding="utf-8"))
MIN_PER_POENG = 1.8
VALGT = set(args[args.index("--sett") + 1].split(",")) if "--sett" in args else None

feil, advarsler = [], []
sett, svar = {}, {}
for f in sorted(os.listdir(mappe)):
    m = re.fullmatch(r"(pred\d+)\.json", f)
    if not m or (VALGT and m.group(1) not in VALGT):
        continue
    sid = m.group(1)
    sett[sid] = json.load(open(os.path.join(mappe, f), encoding="utf-8"))
    sf = os.path.join(mappe, sid + "_svar.json")
    if os.path.exists(sf):
        for k, v in json.load(open(sf, encoding="utf-8")).items():
            if k in svar:
                feil.append(f"{sid}: svarnøkkel {k} finnes to ganger")
            svar[k] = v
    else:
        feil.append(f"{sid}: mangler {sid}_svar.json")

TEKST = ("title", "body", "solution", "merke")
def tekster(o):
    yield from (o.get(k, "") for k in TEKST)
    yield from o.get("criteria", [])
    for p in o.get("parts", []):
        yield from (p.get(k, "") for k in ("body", "solution"))
        yield from p.get("criteria", [])

def skriveregler(hvor, tekst):
    ren = re.sub(r"</?(sub|sup|b|i|em|strong)>", "", str(tekst))
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

for sid, s in sett.items():
    for k in ("id", "kind", "fane", "nr", "label", "minutes", "points", "format", "note", "facts", "exercises"):
        if k not in s:
            feil.append(f"{sid}: mangler {k}")
    if s.get("id") != sid:
        feil.append(f"{sid}: id er {s.get('id')}")
    if s.get("kind") != "mock" or s.get("fane") != fane["id"]:
        feil.append(f"{sid}: skal ha kind: mock og fane: {fane['id']}")
    if s.get("nr") != int(sid[4:]):
        feil.append(f"{sid}: nr skal være {sid[4:]}")
    exs = s.get("exercises", [])
    if [e.get("n") for e in exs] != list(range(1, len(exs) + 1)):
        feil.append(f"{sid}: oppgavene skal ha n = 1, 2, 3 …")
    tot = sum(e.get("points", 0) for e in exs)
    if tot != s.get("points"):
        feil.append(f"{sid}: oppgavene summerer til {tot}, settet sier {s.get('points')}")
    if s.get("points") and abs(s.get("minutes", 0) - s["points"] * MIN_PER_POENG) > 1:
        feil.append(f"{sid}: {s.get('minutes')} minutter, ventet {round(s['points'] * MIN_PER_POENG)}")
    for t in [s.get("note", ""), s.get("label", ""), *s.get("facts", [])]:
        skriveregler(sid, t)
    for e in exs:
        hvor = f"{sid} oppgave {e.get('n')}"
        for k in ("title", "points", "topic", "chapters", "body", "merke"):
            if k not in e:
                feil.append(f"{hvor}: mangler {k}")
        deler = e.get("parts", [])
        if deler:
            if sum(p["points"] for p in deler) != e["points"]:
                feil.append(f"{hvor}: delene summerer til {sum(p['points'] for p in deler)}, ikke {e['points']}")
            for p in deler:
                for k in ("label", "points", "body", "solution", "criteria"):
                    if k not in p:
                        feil.append(f"{hvor} {p.get('label')}: mangler {k}")
            nøkler = [f"{sid}:{e['n']}:{p['label']}" for p in deler if not p.get("options")]
        else:
            for k in ("solution", "criteria"):
                if k not in e:
                    feil.append(f"{hvor}: mangler {k}")
            nøkler = [f"{sid}:{e['n']}:"]
        for k in nøkler:
            if k not in svar:
                feil.append(f"{hvor}: mangler svar-data {k}")
        for t in tekster(e):
            skriveregler(hvor, t)
        if re.search(r"<[a-zA-Z/]", e.get("merke", "")):
            feil.append(f"{hvor}: merke inneholder markup")

gyldige = {f"{sid}:{e['n']}:{p['label']}" for sid, s in sett.items() for e in s.get("exercises", []) for p in e.get("parts", [])}
gyldige |= {f"{sid}:{e['n']}:" for sid, s in sett.items() for e in s.get("exercises", []) if not e.get("parts")}
for k in svar:
    if k not in gyldige:
        feil.append(f"svar-data uten oppgave: {k}")

for f in feil:
    print("FEIL", f)
for a in advarsler:
    print("ADVARSEL", a)
print(f"{len(sett)} sett ({', '.join(sett)}), {len(svar)} svar-oppføringer, {len(feil)} feil")

if "--blind" in args:
    d = args[args.index("--blind") + 1]
    os.makedirs(d, exist_ok=True)
    for sid, s in sett.items():
        b = json.loads(json.dumps(s))
        for e in b["exercises"]:
            for k in ("solution", "criteria"):
                e.pop(k, None)
            for p in e.get("parts", []):
                for k in ("solution", "criteria"):
                    p.pop(k, None)
        json.dump(b, open(os.path.join(d, sid + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("blinde sett skrevet til", d)

if "--skriv" in args:
    if feil:
        sys.exit("skriver ikke: rett feilene først")
    if VALGT:
        # Bare de valgte flettes på nytt; sett som står i sett.js fra før og ikke er valgt, beholdes.
        alle = {}
        for f in sorted(os.listdir(mappe)):
            m = re.fullmatch(r"(pred\d+)\.json", f)
            if m:
                alle[m.group(1)] = json.load(open(os.path.join(mappe, f), encoding="utf-8"))
        p0 = os.path.join(rot, "fag", fag, "sett.js")
        gammel = open(p0, encoding="utf-8").read()
        for sid, s in alle.items():
            if sid not in sett and f'"id": "{sid}"' in gammel:
                sett[sid] = s
    ut = [sett[k] for k in sorted(sett, key=lambda x: int(x[4:]))]
    p = os.path.join(rot, "fag", fag, "sett.js")
    s = open(p, encoding="utf-8").read()
    START = "/* ===================== PREDIKSJON ("
    SLUTT = "/* ===================== PREDIKSJON SLUTT ===================== */"
    if START in s:
        i = s.index(START)
        j = s.index(SLUTT, i) + len(SLUTT)
        s = s[:i].rstrip() + "\n" + s[j:].lstrip("\n")
    mk = "/* ===================== MÅ KUNNE"
    blokk = ("/* ===================== PREDIKSJON (28. november 2026) =====================\n"
             "   Eksamenssett › Prediksjon: hele prøveeksamener bygd på det som mest sannsynlig kommer\n"
             "   (kind: \"mock\", fane: \"pred\"). Fra prediksjon 3 tar hvert sett med en oppgave som\n"
             "   ligner det studenten bommet på i et tidligere sett. Kilden er fag/" + fag + "/_pred/,\n"
             "   flettet inn med tools/flett-pred.py. Spesifikasjon: docs/" + fag + "-prediksjon-spek.md.\n"
             "   ============================================================ */\n"
             "window.EDU_DATA.mockFaner = Object.assign(window.EDU_DATA.mockFaner || {}, "
             + json.dumps({fane["id"]: {"navn": fane["navn"], "intro": fane["intro"]}}, ensure_ascii=False) + ");\n"
             "window.EDU_DATA.sets.push(\n"
             + ",\n".join(json.dumps(x, ensure_ascii=False, indent=2) for x in ut)
             + "\n);\n" + SLUTT + "\n")
    if mk in s:
        i = s.index(mk)
        s = s[:i].rstrip() + "\n" + blokk + s[i:]
    else:
        s = s.rstrip() + "\n" + blokk
    open(p, "w", encoding="utf-8").write(s)
    sm = os.path.join(rot, "fag", fag, "_svar")
    ider = {x["id"] for x in ut}
    for f in os.listdir(sm):
        if re.fullmatch(r"pred\d+\.json", f) and f[:-5] not in ider:
            os.remove(os.path.join(sm, f))
    for sid in sett:
        if VALGT is None or sid in VALGT:
            egne = {k: v for k, v in svar.items() if k.split(":")[0] == sid}
            json.dump(egne, open(os.path.join(sm, sid + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("flettet inn:", [x["id"] for x in ut])
