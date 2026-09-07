#!/usr/bin/env python3
"""
Setter estMinutes i FIE402s studieplan etter hva kapitlene faktisk inneholder.

Estimatene i planen ble satt før manualen var skrevet, og traff derfor ikke:
én modul hadde 8 400 ord på 160 minutter, en annen 1 400 ord på 230. Dette
skriptet leser den ferdige manualen og regner estimatet av innholdet i stedet.

    python3 tools/fie402-rekalibrer-plan.py           # vis forslaget
    python3 tools/fie402-rekalibrer-plan.py --skriv   # skriv det inn i data.js

Modellen, med tall som er lette å justere:
  lesing            60 ord i minuttet. Tett teknisk stoff med formler, lest for
                    å forstå og ikke for å skumme.
  gjennomregnet     15 minutter hver. Forutsetter at du gjør den på papir først
  eksempel          og deretter sammenligner, som er den eneste måten som virker.
  drill             30 minutter fast per modul: quiz, flashcards og dybdetrening
                    på stoffet du nettopp leste.
Modulene uten kapitler (ren eksamenstrening) beholder sine egne tall, siden de
er styrt av eksamenstiden og ikke av lesemengde.
"""
import json, pathlib, re, subprocess, sys

ORD_PER_MIN = 60
MIN_PER_EKSEMPEL = 15
DRILL_MIN = 30

ROOT = pathlib.Path(__file__).resolve().parent.parent
FAG = next((a for a in sys.argv[1:] if not a.startswith("--")), None)
if not FAG:
    sys.exit("bruk: python3 tools/rekalibrer-plan.py <fag-id> [--skriv]")

DATA = ROOT / "fag" / FAG / "data.js"
if not DATA.exists():
    sys.exit(f"fant ikke {DATA}")


def finn_manual(fag):
    """Leser manual.candidates for faget ut av js/subjects.js."""
    reg = (ROOT / "js" / "subjects.js").read_text()
    i = reg.find(f'id: "{fag}"')
    if i < 0:
        sys.exit(f"faget «{fag}» står ikke i js/subjects.js")
    m = re.search(r"candidates:\s*\[(.*?)\]", reg[i:i + 2500], re.S)
    if not m:
        sys.exit(f"fant ingen manual.candidates for «{fag}»")
    for kand in re.findall(r'"([^"]+)"', m.group(1)):
        p = ROOT / kand
        if p.exists():
            return p
    sys.exit(f"ingen av manualkandidatene for «{fag}» finnes på disk")


MANUAL = finn_manual(FAG)


def kapitler():
    s = MANUAL.read_text()
    ut = {}
    for m in re.finditer(r'<section[^>]+id="k(\d+)"(.*?)</section>', s, re.S):
        kropp = re.sub(r"<svg.*?</svg>", "", m.group(2), flags=re.S)
        ut[int(m.group(1))] = {
            "ord": len(re.sub(r"<[^>]+>", " ", kropp).split()),
            "eksempler": kropp.count('class="worked"'),
        }
    return ut


def plan():
    js = 'global.window={};eval(require("fs").readFileSync(%r,"utf8"));console.log(JSON.stringify(window.EDU_DATA.plan.days))' % str(DATA)
    return json.loads(subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout)


def estimat(dag, ch):
    ord_ = sum(ch.get(c, {}).get("ord", 0) for c in dag["chapters"])
    eks = sum(ch.get(c, {}).get("eksempler", 0) for c in dag["chapters"])
    if not ord_:
        return dag["estMinutes"]          # ren eksamenstrening — styrt av klokka
    rå = ord_ / ORD_PER_MIN + eks * MIN_PER_EKSEMPEL + DRILL_MIN
    return int(round(rå / 5) * 5)


def main():
    print(f"Fag: {FAG} · manual: {MANUAL.name}\n")
    ch = kapitler()
    dager = plan()
    mangler = sorted({c for d in dager for c in d["chapters"] if c not in ch})
    if mangler:
        print("⚠ disse kapitlene finnes ikke i manualen ennå:", mangler)
        print("  modulene deres beholder sine gamle estimater.\n")

    endringer, gammel, ny = [], 0, 0
    for d in dager:
        e = estimat(d, ch)
        gammel += d["estMinutes"]; ny += e
        if e != d["estMinutes"]:
            endringer.append((d["day"], d["estMinutes"], e, d["title"]))
        d["_nytt"] = e

    print(f"{'Mod':>3} {'før':>5} {'etter':>6}   tittel")
    for dag, f, e, t in endringer:
        print(f"{dag:>3} {f:>5} {e:>6}   {t[:56]}")
    print(f"\nSum: {gammel} min ({gammel/60:.0f} t) → {ny} min ({ny/60:.0f} t)")

    if "--skriv" not in sys.argv:
        print(f"\n(kjør med --skriv for å oppdatere {DATA.relative_to(ROOT)})")
        return 0

    src = DATA.read_text()
    for d in dager:
        if d["_nytt"] == d["estMinutes"]:
            continue
        # bytt estMinutes kun innenfor riktig modul: dagsnummeret står rett foran
        mønster = re.compile(r'(\{\s*day:\s*%d\b.*?estMinutes:\s*)(\d+)' % d["day"], re.S)
        src, n = mønster.subn(lambda m: m.group(1) + str(d["_nytt"]), src, count=1)
        if n != 1:
            sys.exit(f"fant ikke estMinutes for modul {d['day']} — avbryter uten å skrive")
    DATA.write_text(src)
    print(f"\n→ oppdaterte {len(endringer)} moduler i {DATA}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
