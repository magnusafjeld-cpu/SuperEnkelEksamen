#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen fag/<id>/_kapoppg/kN.js til fag/<id>/kapitteloppgaver.js.

   Kapitlene skrives hver for seg fordi de skrives parallelt. Sammensettingen
   sorterer på kapittelnummer og legger på hodet som oppretter objektet — uten
   det ville hvert fragment måttet gjøre det selv, og det som skrives fem steder
   blir gjort ulikt fem steder.

   Bruk:  python3 tools/bygg-kapoppgaver.py fie432
"""
import sys, os, re, glob

HODE = """/* ================== {navn} · KAPITTELOPPGAVER ==================
   Oppgaver i fagets eget eksamensformat, ett sett per kapittel, å ta rett etter
   at kapitlet er lest.

   Flervalg (FIE432): options/answer/traps. `traps` står parallelt med `options`,
   én tekst per galt alternativ som sier hvilken feil det er laget av, null på
   fasiten. Åpne oppgaver (FIE402): open: true, solution og criteria — du skriver
   svaret, åpner løsningen og vurderer deg selv mot kriteriene, som i /sett.

   id-ene er lagringsnøkler for svarene. De må aldri endres.

   BYGGET FIL — ikke rediger her. Kapitlene ligger i _kapoppg/kN.js, og settes
   sammen med: python3 tools/bygg-kapoppgaver.py {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.chapterTasks = window.EDU_DATA.chapterTasks || {{}};

"""

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    fag = sys.argv[1]
    rot = os.path.join(os.path.dirname(__file__), "..")
    mappe = os.path.join(rot, "fag", fag, "_kapoppg")
    filer = sorted(glob.glob(os.path.join(mappe, "k*.js")),
                   key=lambda f: int(re.search(r"k(\d+)\.js$", f).group(1)))
    if not filer:
        print(f"fant ingen fragmenter i {mappe}"); sys.exit(1)

    navn = fag.upper()
    biter, antall = [], 0
    for f in filer:
        t = open(f, encoding="utf-8").read().strip()
        n = int(re.search(r"k(\d+)\.js$", f).group(1))
        oppg = len(re.findall(r'\n      id: "', t))
        antall += oppg
        print(f"  k{n:<3} {oppg:>2} oppgaver")
        biter.append(t)

    ut = HODE.format(navn=navn, fag=fag) + "\n\n".join(biter) + "\n"
    mål = os.path.join(rot, "fag", fag, "kapitteloppgaver.js")
    open(mål, "w", encoding="utf-8").write(ut)
    print(f"\n{mål}: {len(filer)} kapitler · {antall} oppgaver · {len(ut):,} tegn".replace(",", " "))

if __name__ == "__main__":
    main()
