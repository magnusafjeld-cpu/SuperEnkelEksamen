"""Fletter fag/<fag>/_prove/proveN.json inn i fag/<fag>/sett.js.

Prøveeksamenene står sist i sett.js, etter kommentaren PRØVEEKSAMENER, som
JSON-objekter skilt med «,\n». Et sett som finnes fra før byttes ut, nye legges
til, og alle sorteres på id. Kjøres fra prosjektroten:
    cd fag/fie432/_prove && python3 -I prove4_regn.py   # skriver prove4.json
    python3 -I tools/flett-prove.py . fie432 prove4   # fletter inn og sorterer
    rm fag/fie432/_prove/prove4.json                  # sett.js er kilden for appen

Finnes ikke kommentaren PRØVEEKSAMENER ennå, legges den til før «];».
"""
import json, os, sys

rot = sys.argv[1]
fag = sys.argv[2]
ider = sys.argv[3:]
p = os.path.join(rot, "fag", fag, "sett.js")
s = open(p).read()
merke = "/* ===================== PRØVEEKSAMENER"
if merke not in s:
    assert s.rstrip().endswith("];")
    forran = s.rstrip()[:-2].rstrip()
    if not forran.endswith(","):
        forran += ","  # det siste ekte settet trenger komma foran prøvesettene
    s = forran + "\n" + merke + " =====================\n   Laget for appen, ikke gitt av kurset. Spesifikasjon: docs/" + fag + "-proveeksamen-spek.md.\n   Kilden er fag/" + fag + "/_prove/proveN_regn.py; flettes inn med tools/flett-prove.py.\n   ============================================================ */\n];\n"
i = s.index(merke)
j = s.index("*/\n", i) + 3
hode, kommentar, hale = s[:i], s[i:j], s[j:]
assert hale.rstrip().endswith("];")
kropp = hale.rstrip()[:-2].rstrip()
# Del opp de eksisterende prøvesettene.
dek = json.JSONDecoder()
sett, pos = [], 0
while pos < len(kropp):
    while pos < len(kropp) and kropp[pos] in " \n,":
        pos += 1
    if pos >= len(kropp):
        break
    o, pos = dek.raw_decode(kropp, pos)
    sett.append(o)
finnes = {o["id"]: o for o in sett}
for id_ in ider:
    ny = json.load(open(os.path.join(rot, "fag", fag, "_prove", id_ + ".json")))
    assert ny["id"] == id_ and ny.get("kind") == "mock"
    print(("bytter ut " if id_ in finnes else "legger til ") + id_)
    finnes[id_] = ny
ut = [finnes[k] for k in sorted(finnes, key=lambda x: int(x[5:]))]
s = hode + kommentar + "".join(json.dumps(o, ensure_ascii=False, indent=2) + ",\n" for o in ut) + "];\n"
open(p, "w").write(s)
print("prøvesett nå:", [o["id"] for o in ut])
