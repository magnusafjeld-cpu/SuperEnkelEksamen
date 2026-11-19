#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen fag/<id>/_forelesninger/fN.js til fag/<id>/forelesninger.js.

   Forelesningene skrives hver for seg fordi de skrives parallelt. Hvert
   fragment er ett kall: window.EDU_DATA.forelesninger.push({ nr: N, ... });
   Sammensettingen sorterer på nummer og legger på hodet som oppretter lista.

   Bruk:  python3 tools/bygg-forelesninger.py fie459
"""
import sys, os, re, glob

HODE = """/* ================== {fag} · FORELESNINGER ==================
   Én interaktiv gjennomgang per forelesning (js/bundle-forelesninger.js).
   Steg-id-ene er lagringsnøkler for svarene. De må aldri endres; et steg som
   skrives om med ny mening, får ny id.

   BYGGET FIL — ikke rediger her. Forelesningene ligger i _forelesninger/fN.js,
   og settes sammen med: python3 tools/bygg-forelesninger.py {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.forelesninger = [];
"""

def main():
    if len(sys.argv) < 2:
        sys.exit("Bruk: python3 tools/bygg-forelesninger.py <fag>")
    fag = sys.argv[1]
    rot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "fag", fag)
    filer = glob.glob(os.path.join(rot, "_forelesninger", "f*.js"))
    nr = lambda p: int(re.search(r"f(\d+)\.js$", p).group(1))
    filer.sort(key=nr)
    if not filer:
        sys.exit("Fant ingen fragmenter i _forelesninger/")
    ut = [HODE.format(fag=fag.upper())]
    for p in filer:
        ut.append("\n/* ---------- " + os.path.basename(p) + " ---------- */\n")
        ut.append(open(p, encoding="utf-8").read().strip() + "\n")
    mål = os.path.join(rot, "forelesninger.js")
    open(mål, "w", encoding="utf-8").write("".join(ut))
    print(f"Skrev {os.path.relpath(mål)} med {len(filer)} forelesninger: " + ", ".join(str(nr(p)) for p in filer))

if __name__ == "__main__":
    main()
