#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen fag/<id>/_kjerne/kjN.js til fag/<id>/kjerne.js.

   Delene skrives hver for seg fordi de skrives parallelt. Sammensettingen
   sorterer på delnummer og legger på hodet som oppretter lista, så ingen av
   fragmentene trenger å gjøre det selv.

   Bruk:  python3 tools/bygg-kjerne.py fie402
"""
import sys, os, re, glob

HODE = """/* ===================== {navn} · KJERNEPENSUM =====================
   Det viktigste i faget på én kveld: en kort gjennomgang av det som kommer på
   eksamen, organisert etter eksamensblokkene og ikke etter kapitlene. Hver del
   har raske sjekker (flervalg med forklaring) og en kort minicase i
   eksamensformat. Teksten er en nedkorting av manualen, ikke nytt stoff.

   id-ene (kjN, kjN-sM, kjN-m1) er lagringsnøkler. De må aldri endres; en del
   eller et spørsmål som skrives om, får ny id (fallgruve 7s).

   BYGGET FIL — ikke rediger her. Delene ligger i _kjerne/kjN.js, og settes
   sammen med: python3 tools/bygg-kjerne.py {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.kjerne = [];

"""

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    fag = sys.argv[1]
    rot = os.path.join(os.path.dirname(__file__), "..")
    mappe = os.path.join(rot, "fag", fag, "_kjerne")
    filer = sorted(glob.glob(os.path.join(mappe, "kj*.js")),
                   key=lambda f: int(re.search(r"kj(\d+)\.js$", f).group(1)))
    if not filer:
        print(f"fant ingen fragmenter i {mappe}"); sys.exit(1)

    biter = []
    for f in filer:
        t = open(f, encoding="utf-8").read().strip()
        n = int(re.search(r"kj(\d+)\.js$", f).group(1))
        sjekker = len(re.findall(r'id: "kj\d+-s\d+"', t))
        print(f"  kj{n:<3} {sjekker} sjekker")
        biter.append(t)

    ut = HODE.format(navn=fag.upper(), fag=fag) + "\n\n".join(biter) + "\n"
    mål = os.path.join(rot, "fag", fag, "kjerne.js")
    open(mål, "w", encoding="utf-8").write(ut)
    print(f"\n{mål}: {len(filer)} deler · {len(ut):,} tegn".replace(",", " "))

if __name__ == "__main__":
    main()
