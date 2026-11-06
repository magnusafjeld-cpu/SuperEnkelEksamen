"""Felles verktøy for eksamenssettene per forelesning i FIE432 (laget 6. november 2026).

Hvert sett har sitt eget regneskript, <id>_regn.py, som importerer denne fila:

    import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from felles import *

    S = Sett("fl-f4")
    a = S.ledd("a", "<p>Spørsmålet</p>",
               riktig=(f"Kr {kr(x)}", [kr(x)]),          # (tekst, [tall som skal stå i teksten])
               gale=[(f"Kr {kr(y)}", [kr(y)]), ...],      # tre gale, hver en navngitt feil
               solution=sol(...),
               dekker=["f4-skjerming-01", "f4-skjerming-02"])
    S.oppgave("Kari og skjermingen", "Skjerming", [5], "<p>Felles tekst</p>", [a, b])
    ...
    S.skriv(label=..., note=..., facts=[...], practiceNote=...)

Et alternativ kan også være en ren streng (begrepsledd). Da sjekkes ikke tallene i det.
Riktig svar settes inn på plassen fasitplan.json sier. skriv() lager <id>.json ved siden
av skriptet og stopper med feilliste hvis noe er galt: struktur, fasitplan, tallene i
alternativene, skriveregler, lekkasje og dekningen av sjekklisten (hvert punkt i
sjekklisten for forelesningen skal stå i minst ett ledds «dekker»).
"""
import json
import os
import re
import subprocess
import sys
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
ROT = os.path.abspath(os.path.join(HER, "..", "..", ".."))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))

# Hvilke sjekklistepunkter hvert sett skal dekke (prefiks på seksjons-id), og rekkefølgen i fanen.
SETT_INFO = {
    "fl-f1": (1, "f1-"), "fl-f2": (2, "f2-"), "fl-f3": (3, "f3-"), "fl-f4": (4, "f4-"),
    "fl-f5": (5, "f5-"), "fl-f6": (6, "f6-"), "fl-f7": (7, "f7-"), "fl-f8": (8, "f8-"),
    "fl-f9": (9, "f9-"), "fl-f10": (10, "f10-"), "fl-f11": (11, "f11-"),
    "fl-aksje": (12, "aksje-"), "fl-pensjon": (13, "pensjon-"), "fl-kvadsheim": (14, "kvadsheim-"),
    "fl-laan": (15, "laan-"), "fl-psyk": (16, "psyk-"),
}


def sjekkliste():
    """Den åpne sjekklisten i appen: liste av seksjoner med punkter."""
    s = open(os.path.join(ROT, "fag", "fie432", "sjekkliste.js"), encoding="utf8").read()
    return json.loads(s.split("window.EDU_DATA.sjekkliste = ", 1)[1].rstrip().rstrip(";"))


def punkter(prefiks):
    return [(sek, p) for sek in sjekkliste() if sek["id"].startswith(prefiks) for p in sek["punkter"]]


# ---------- tall ----------
def rund(x, d=0):
    """Avrunding halvt opp (ikke bankers avrunding)."""
    q = Decimal(1).scaleb(-d)
    return Decimal(repr(round(x, 10))).quantize(q, rounding=ROUND_HALF_UP)


def kr(x, d=0):
    """Norsk tallformat: mellomrom som tusenskille, desimalkomma, minus «−»."""
    v = rund(x, d)
    neg = v < 0
    s = f"{abs(v):,.{d}f}".replace(",", " ").replace(".", ",")
    return ("−" if neg else "") + s


def pst(x, d=2):
    """x er en andel (0,05 = 5 %)."""
    return kr(100 * x, d) + " %"


def lik(a, b, tol=1e-6):
    return abs(a - b) < tol


# ---------- løsningstekster ----------
def sol(regel, steg=None, gale=None, kontroll=None, strategi=None, kilde=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    if steg:
        s += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(f"{k + 1}. {x}" for k, x in enumerate(steg)) + "</p>"
    if gale:
        s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(f"<b>{a}</b> = {b}" for a, b in gale) + "</p>"
    if kontroll:
        s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    if kilde:
        s += f"<p><b>Kilde.</b> {kilde}</p>"
    return s


def begrep(regel, svar, gale, strategi=None, kilde=None):
    """Løsning for begrepsledd: begrunnelse, riktig svar, hvorfor de andre er gale."""
    s = f"<p><b>Regelen.</b> {regel} <b>{svar}</b></p>"
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(f"<b>{a}</b> = {b}" for a, b in gale) + "</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    if kilde:
        s += f"<p><b>Kilde.</b> {kilde}</p>"
    return s


TALL = re.compile(r"−?\d{1,3}(?:[  ]\d{3})+(?:,\d+)?|−?\d+(?:,\d+)?")   # «1 250 000», «2026», «3,6»
TILLATT = {"p", "b", "i", "br", "sub", "sup", "ul", "ol", "li", "table", "tr", "th", "td", "thead", "tbody", "em", "strong", "span"}


def strip(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = re.sub(r"&[a-z]+;", " ", s)
    return re.sub(r"\s+", " ", s).strip()


class Sett:
    def __init__(self, sid):
        assert sid in SETT_INFO, sid
        self.id = sid
        self.nr, self.prefiks = SETT_INFO[sid]
        self.plan = PLAN[sid]
        self.ex = []
        self.leddliste = []   # (oppgave-n, del-dict, tall per alternativ)
        self.n = 0

    def ledd(self, label, body, riktig, gale, solution, dekker):
        i = self.n
        self.n += 1
        plass = self.plan[i]
        assert len(gale) == 3, f"ledd {i + 1}: trenger tre gale alternativer"
        alt = list(gale)
        alt.insert(plass, riktig)
        tekst = [a[0] if isinstance(a, tuple) else a for a in alt]
        tall = [a[1] if isinstance(a, tuple) else None for a in alt]
        p = {"label": label, "points": 3, "body": body, "options": tekst, "answer": plass,
             "solution": solution, "dekker": list(dekker)}
        self.leddliste.append((i + 1, p, tall))
        return p

    def oppgave(self, title, topic, chapters, body, parts):
        n = len(self.ex) + 1
        if len(parts) == 1 and parts[0]["label"] == "":
            p = parts[0]
            e = {"n": n, "title": title, "points": 3, "topic": topic, "chapters": chapters,
                 "body": body + p["body"], "options": p["options"], "answer": p["answer"],
                 "solution": p["solution"], "dekker": p["dekker"]}
        else:
            e = {"n": n, "title": title, "points": 3 * len(parts), "topic": topic,
                 "chapters": chapters, "body": body, "parts": parts}
        self.ex.append(e)
        return e

    def skriv(self, label, note, facts, practiceNote, minutter=None):
        antall = self.n
        sett = {
            "id": self.id, "kind": "forelesning", "nr": self.nr, "label": label,
            "minutes": minutter or max(20, 5 * round(antall * 4 / 5)),
            "points": 3 * antall,
            "format": f"{antall} flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
            "note": note, "facts": facts, "practiceNote": practiceNote,
            "mc": {"wrongFactor": -1 / 3},
            "exercises": self.ex,
        }
        ut = os.path.join(HER, self.id + ".json")
        with open(ut, "w", encoding="utf8") as f:
            json.dump(sett, f, ensure_ascii=False, indent=1)
        feil = kontroller(sett, self.leddliste, self.prefiks)
        if feil:
            print("\nFEIL:")
            for x in feil:
                print("  " + x)
            raise SystemExit(1)
        print(f"\nIngen feil. Skrev {os.path.relpath(ut, ROT)}")


def alle_ledd(sett):
    for e in sett["exercises"]:
        for p in (e["parts"] if e.get("parts") else [e]):
            yield e, p


def kontroller(sett, leddliste, prefiks):
    feil = []
    raw = json.dumps(sett, ensure_ascii=False)
    L = list(alle_ledd(sett))
    svar = [p["answer"] for _, p in L]
    plan = PLAN[sett["id"]][:len(L)]
    if svar != plan:
        feil.append("avvik fra fasitplanen i ledd " + str([i + 1 for i, (a, b) in enumerate(zip(svar, plan)) if a != b]))
    for e, p in L:
        sted = f"oppgave {e['n']}{p.get('label', '')}"
        o = p["options"]
        if len(o) != 4 or len(set(strip(x) for x in o)) != 4:
            feil.append(f"{sted}: ikke fire ulike alternativer")
        if not p.get("solution"):
            feil.append(f"{sted}: mangler løsning")
        if not p.get("dekker"):
            feil.append(f"{sted}: tom «dekker»")
        if "<b>Kilde.</b>" not in p.get("solution", ""):
            feil.append(f"{sted}: løsningen mangler kilde (sol(..., kilde=\"F4 lb 23\"))")

    # skriveregler
    tekster = []

    def samle(x):
        if isinstance(x, str):
            tekster.append(x)
        elif isinstance(x, list):
            for y in x:
                samle(y)
        elif isinstance(x, dict):
            for k, y in x.items():
                if k not in ("dekker", "id", "kind"):
                    samle(y)
    samle(sett)
    for t in tekster:
        r = strip(t)
        if "—" in r:
            feil.append("tankestrek (—): …" + r[max(0, r.find("—") - 30):r.find("—") + 20])
        if re.search(r"\s–\s", r):
            feil.append("tankestrek med mellomrom: …" + re.search(r".{0,30}\s–\s.{0,20}", r).group(0))
        m = re.search(r".{0,30},\s+og\b.{0,15}", r)
        if m:
            feil.append("komma foran «og»: …" + m.group(0))
        m = re.search(r".{0,20}(?<![\w)])-\s?\d.{0,10}", r)
        if m:
            feil.append("bindestrek som minus: …" + m.group(0))
        if re.search(r"\\[a-zA-Z]+\{|\$[^$\d]*\\", t):
            feil.append("LaTeX: " + t[:60])
        for tag in re.findall(r"</?([a-zA-Z0-9]+)", t):
            if tag.lower() not in TILLATT:
                feil.append(f"ukjent tagg <{tag}>")

    # tallene i alternativene er de skriptet har regnet, og ingen andre
    for nr, p, tall in leddliste:
        for i, (o, forv) in enumerate(zip(p["options"], tall)):
            if forv is None:
                continue
            forv = [t.replace(" %", "") for t in forv]
            finnes = TALL.findall(strip(o))
            for t in forv:
                if re.search(r"\d", t) and t not in finnes:
                    feil.append(f"ledd {nr} alt {i}: tallet {t} står ikke i «{o}»")
            ekstra = [t for t in finnes if t not in forv]
            if ekstra:
                feil.append(f"ledd {nr} alt {i}: tall som ikke er regnet: {ekstra} i «{o}»")

    # lekkasje
    tekstledd = lengst = 0
    pos = {"størst": 0, "minst": 0, "midten": 0}
    ordsum = 0.0
    tallledd = 0
    for e, p in L:
        o = [strip(x) for x in p["options"]]
        deler = len(e["parts"]) if e.get("parts") else 1
        ordsum += len(strip(e.get("body", "")).split()) / deler + (len(strip(p["body"]).split()) if p is not e else 0)
        if all(re.search(r"\d", x) and len(x) < 40 for x in o):
            tallledd += 1
            try:
                v = [float(re.search(r"-?\d+(?:\.\d+)?", re.sub(r"(?<=\d)[  ](?=\d{3}\b)", "", x).replace("−", "-").replace(",", ".")).group(0)) for x in o]
                s_ = sorted(v)
                k = v[p["answer"]]
                pos["størst" if k == s_[3] else "minst" if k == s_[0] else "midten"] += 1
            except Exception:
                pass
        else:
            tekstledd += 1
            ln = [len(x) for x in o]
            if ln[p["answer"]] == max(ln) and ln.count(max(ln)) == 1:
                lengst += 1
    n = len(L)
    print(f"   {len(sett['exercises'])} oppgaver, {n} ledd, {sett['points']} poeng, {sett['minutes']} minutter")
    print(f"   fasit A–D: {'/'.join(str(svar.count(k)) for k in range(4))}")
    print(f"   ord per ledd: {ordsum / max(n, 1):.1f} (mål 25–50)")
    print(f"   ledd med tallsvar: {tallledd} ({tallledd / max(n, 1) * 100:.0f} %)")
    if tekstledd:
        print(f"   tekstledd {tekstledd}: riktig er lengst i {lengst} ({lengst / tekstledd * 100:.0f} %, tilfeldig ≈ 25 %)")
        if tekstledd >= 6 and lengst / tekstledd > 0.30:
            feil.append(f"riktig alternativ er det lengste i {lengst} av {tekstledd} tekstledd (maks 30 %)")
    if tallledd:
        print(f"   tallledd: riktig er størst {pos['størst']}, minst {pos['minst']}, i midten {pos['midten']}")
        if tallledd >= 6 and max(pos["størst"], pos["minst"]) / tallledd > 0.45:
            feil.append("riktig tallsvar er for ofte det største eller minste")

    # dekning av sjekklisten
    mål = {p["id"]: (sek, p) for sek, p in punkter(prefiks)}
    alle_ider = {p["id"] for sek in sjekkliste() for p in sek["punkter"]}
    dekket = {}
    for e, p in L:
        for d in p.get("dekker", []):
            if d not in alle_ider:
                feil.append(f"oppgave {e['n']}{p.get('label', '')}: ukjent sjekklistepunkt {d}")
            dekket.setdefault(d, []).append(f"{e['n']}{p.get('label', '')}")
    mangler = [i for i in mål if i not in dekket]
    print(f"   dekning: {len(mål) - len(mangler)} av {len(mål)} sjekklistepunkter")
    for i in mangler:
        feil.append(f"ikke dekket: {i} · {mål[i][1]['kan']}")
    utenfor = sorted(d for d in dekket if d not in mål and d in alle_ider)
    if utenfor:
        print(f"   dekker også punkter fra andre forelesninger: {', '.join(utenfor)}")

    # strukturkontrollen i motoren
    tmp = os.path.join(HER, f".sjekk-{sett['id']}.js")
    with open(tmp, "w", encoding="utf8") as f:
        f.write("window.EDU_DATA={};window.EDU_DATA.sets=[" + raw + "];")
    try:
        r = subprocess.run(["node", os.path.join(ROT, "tools", "sjekk-sett.js"), tmp], capture_output=True, text=True, cwd=ROT)
        utskrift = (r.stdout + r.stderr).strip()
        if r.returncode != 0:
            feil.append("tools/sjekk-sett.js: " + utskrift[-800:])
    finally:
        os.remove(tmp)
    return feil


if __name__ == "__main__":
    # python3 -I felles.py fl-f4   lister sjekklistepunktene settet skal dekke
    for sid in sys.argv[1:]:
        nr, pre = SETT_INFO[sid]
        print(f"== {sid}")
        for sek, p in punkter(pre):
            print(f"{p['id']:32s} {p['nivaa']:7s} {p['kan']}")
