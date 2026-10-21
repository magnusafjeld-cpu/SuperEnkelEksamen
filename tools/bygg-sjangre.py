#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen fag/<id>/_sjangre/*.js til fag/<id>/sjangre.js.

   Hver sjanger skrives i sin egen fil, fordi de skrives parallelt. Filene
   sorteres på num, og hodet som oppretter lista legges på, så ingen av
   fragmentene trenger å gjøre det selv.

       python3 tools/bygg-sjangre.py fie402
"""
import glob, os, re, sys

HODE = """/* ===================== {navn} · SJANGERTRENING =====================
   Én stige per oppgavesjanger: korte steg fra null til eksamensnivå, hvert med
   teori, et lite eksempel og én flervalgsoppgave med utregning, kontroll og
   feilene bak de gale alternativene. Motoren: js/bundle-sjangre.js.

   id-ene (sjangerens og stegenes) er lagringsnøkler. De må aldri endres; et
   steg som skrives om til en annen oppgave, får ny id.

   BYGGET FIL, ikke rediger her. Sjangrene ligger i _sjangre/*.js, og settes
   sammen med: python3 tools/bygg-sjangre.py {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.sjangre = [];
"""


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    fag = sys.argv[1]
    rot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    filer = glob.glob(os.path.join(rot, "fag", fag, "_sjangre", "*.js"))
    if not filer:
        sys.exit(f"fant ingen fragmenter i fag/{fag}/_sjangre")
    biter = []
    for f in filer:
        t = open(f, encoding="utf-8").read().strip()
        m = re.search(r"\bnum:\s*(\d+)", t)
        if not m:
            sys.exit(f"{os.path.basename(f)}: mangler num")
        biter.append((int(m.group(1)), os.path.basename(f), t))
    biter.sort()
    steg_re = re.compile(r'^\s*id: "[a-z0-9-]+-\d+"', re.M)
    for num, navn, t in biter:
        print(f"  {num:>2}  {navn:<28} {len(steg_re.findall(t))} steg")
    ut = os.path.join(rot, "fag", fag, "sjangre.js")
    with open(ut, "w", encoding="utf-8") as fil:
        fil.write(HODE.format(navn=fag.upper(), fag=fag) + "\n\n".join(t for _, _, t in biter) + "\n")
    print(f"{os.path.relpath(ut, rot)}: {len(biter)} sjangre")


if __name__ == "__main__":
    main()
