"""Fletter fag/fie432/_prove/proveN.json inn i fag/fie432/sett.js.

Prøveeksamenene står sist i sett.js, etter kommentaren PRØVEEKSAMENER, som
JSON-objekter skilt med «,\n». Et sett som finnes fra før byttes ut, nye legges
til, og alle sorteres på id. Kjøres fra prosjektroten:
    cd fag/fie432/_prove && python3 -I prove4_regn.py   # skriver prove4.json
    python3 -I tools/fie432-flett-prove.py . prove4   # fletter inn og sorterer
    rm fag/fie432/_prove/prove4.json                  # sett.js er kilden for appen
"""
import json, os, sys

rot = sys.argv[1]
ider = sys.argv[2:]
p = os.path.join(rot, "fag/fie432/sett.js")
s = open(p).read()
merke = "/* ===================== PRØVEEKSAMENER"
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
    ny = json.load(open(os.path.join(rot, "fag/fie432/_prove", id_ + ".json")))
    assert ny["id"] == id_ and ny.get("kind") == "mock"
    print(("bytter ut " if id_ in finnes else "legger til ") + id_)
    finnes[id_] = ny
ut = [finnes[k] for k in sorted(finnes, key=lambda x: int(x[5:]))]
s = hode + kommentar + "".join(json.dumps(o, ensure_ascii=False, indent=2) + ",\n" for o in ut) + "];\n"
open(p, "w").write(s)
print("prøvesett nå:", [o["id"] for o in ut])
