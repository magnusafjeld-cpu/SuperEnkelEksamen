# -*- coding: utf-8 -*-
"""
Setter oppgavekortene fra del2_kort.json inn i window.EDU_DATA.flashcards i
fag/fie402/data.js, bakerst i arrayen (etter de eksisterende kortene og etter
del 1 hvis den er der), under kommentaren /* oppgavekort del 2 */.

Leser og skriver data.js i samme operasjon, fordi en annen agent kan skrive i
samme fil. Kjøres den på nytt, byttes del 2-blokken ut i stedet for å dobles.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HER, "..", "data.js")
MERKE = "/* oppgavekort del 2 */"

kort = json.load(open(os.path.join(HER, "del2_kort.json"), encoding="utf-8"))
blokk = ",\n".join(
    "\n".join("  " + linje for linje in json.dumps(k, ensure_ascii=False, indent=2).split("\n"))
    for k in kort
)

with open(DATA, encoding="utf-8") as fh:
    s = fh.read()

start = s.index("window.EDU_DATA.flashcards = [")
slutt = s.index("\n];", start)          # slutten på flashcards-arrayen
inni = s[start:slutt]

# Fjern en tidligere del 2-blokk (fram til neste oppgavekort-merke eller arrayslutt).
if MERKE in inni:
    a = start + inni.index(MERKE)
    neste = re.search(r"/\* oppgavekort del \d+ \*/", s[a + len(MERKE):slutt])
    b = a + len(MERKE) + neste.start() if neste else slutt
    s = s[:a] + s[b:]
    slutt = s.index("\n];", start)

# Ingen id-kollisjon med kort som allerede står der.
eksisterende = set(re.findall(r'"id":\s*"([^"]+)"', s[start:slutt]))
kollisjon = eksisterende & {k["id"] for k in kort}
if kollisjon:
    raise SystemExit(f"id-kollisjon: {sorted(kollisjon)[:5]}")

for_ = s[:slutt].rstrip()
if not for_.endswith(","):
    for_ += ","
s = for_ + "\n  " + MERKE + "\n" + blokk + s[slutt:]

with open(DATA, "w", encoding="utf-8") as fh:
    fh.write(s)
print(f"{len(kort)} kort satt inn i {os.path.normpath(DATA)}")
