#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen en pensumfil (manual.html) av kapittelfragmenter.

   Hvert kapittel er en egen fil, <mappe>/kN.html, med én <section id="kN">.
   Fragmentene settes sammen i tallrekkefølge (k0, k1, …, k10) med et enkelt
   hode. Appen leser bare seksjonene, så hodet er bare for å kunne åpne fila i
   en nettleser.

       python3 tools/bygg-manual.py fag/privat-sjakk/_fragmenter fag/privat-sjakk/manual.html "Sjakk"

   Generell versjon av fie459-bygg-manual.py, uten deltitler.
"""
import pathlib, re, sys


def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    mappe, ut = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    tittel = sys.argv[3] if len(sys.argv) > 3 else "Pensum"
    filer = sorted(mappe.glob("k*.html"), key=lambda f: int(re.sub(r"\D", "", f.stem) or 0))
    if not filer:
        sys.exit(f"fant ingen k*.html i {mappe}")
    deler = []
    for f in filer:
        t = f.read_text(encoding="utf-8").strip()
        if not re.match(rf'<section id="{f.stem}"', t):
            sys.exit(f"{f.name}: skal starte med <section id=\"{f.stem}\">")
        deler.append(t)
    ut.write_text(f"""<!DOCTYPE html>
<html lang="no">
<head><meta charset="UTF-8"><title>{tittel}</title></head>
<body>
{chr(10).join(deler)}
</body>
</html>
""", encoding="utf-8")
    print(f"{ut}: {len(filer)} kapitler")


if __name__ == "__main__":
    main()
