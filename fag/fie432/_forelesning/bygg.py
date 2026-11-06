"""Setter sammen eksamenssettene per forelesning til fag/fie432/forelesningssett.js.

    python3 -I fag/fie432/_forelesning/bygg.py          # kjører alle <id>_regn.py, så fletter
    python3 -I fag/fie432/_forelesning/bygg.py --flett  # bare fletter de ferdige <id>.json
    ... --delvis   tar med bare settene som er ferdige og hopper over dekningskravet

Stopper hvis et sett mangler eller hvis et sjekklistepunkt ikke er dekket av noe ledd.
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import HER, ROT, SETT_INFO, sjekkliste, alle_ledd

UT = os.path.join(ROT, "fag", "fie432", "forelesningssett.js")
HODE = """/* ===================== FIE432 · EKSAMENSSETT PER FORELESNING =====================
   Ett flervalgssett per forelesning (kind: "forelesning"), vist i Eksamenssett under
   fanen «Per forelesning». Til sammen dekker settene hvert punkt i sjekklisten
   (fag/fie432/sjekkliste.js): hvert ledd har «dekker» med punktenes id-er.
   Satser og regler står i oppgaveteksten, slik kurset oppgir dem på eksamen.
   Kilden er fag/fie432/_forelesning/<id>_regn.py. Bygget av bygg.py. Ikke rediger for hånd.
   id-ene er lagringsnøkler og endres aldri. */
"""

DELVIS = "--delvis" in sys.argv
if "--flett" not in sys.argv:
    for sid in SETT_INFO:
        if DELVIS and not os.path.exists(os.path.join(HER, sid + "_regn.py")):
            continue
        r = subprocess.run([sys.executable, "-I", os.path.join(HER, sid + "_regn.py")], capture_output=True, text=True, cwd=ROT)
        if r.returncode:
            print(r.stdout[-1500:], r.stderr[-1500:])
            raise SystemExit(f"{sid}_regn.py feilet")

sett, mangler = [], []
for sid in SETT_INFO:
    f = os.path.join(HER, sid + ".json")
    if os.path.exists(f):
        sett.append(json.load(open(f, encoding="utf8")))
    else:
        mangler.append(sid)
if mangler and DELVIS:
    print("Ikke med ennå: " + ", ".join(mangler))
elif mangler:
    raise SystemExit("Mangler: " + ", ".join(mangler))

dekket = {d for s in sett for _, p in alle_ledd(s) for d in p.get("dekker", [])}
alle = [p for sek in sjekkliste() for p in sek["punkter"]]
udekket = [p["id"] for p in alle if p["id"] not in dekket]
if udekket and not DELVIS:
    raise SystemExit(f"{len(udekket)} sjekklistepunkter er ikke dekket: {', '.join(udekket[:20])}")

kropp = ",\n".join(json.dumps(s, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") for s in sett)
with open(UT, "w", encoding="utf8") as f:
    f.write(HODE + "(function () {\n  const D = (window.EDU_DATA = window.EDU_DATA || {});\n  D.sets = D.sets || [];\n  const nye = [\n"
            + kropp + "\n  ];\n  nye.forEach((s) => { if (!D.sets.some((x) => x.id === s.id)) D.sets.push(s); });\n})();\n")
n = sum(1 for s in sett for _ in alle_ledd(s))
print(f"{len(sett)} sett, {n} ledd, {len(dekket & {p['id'] for p in alle})} av {len(alle)} sjekklistepunkter dekket -> {os.path.relpath(UT, ROT)} ({os.path.getsize(UT) // 1024} kB)")
