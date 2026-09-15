#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen EY-Parthenon-casene fra fragmenter til én fagdatafil.

   Hver case skrives som sin egen fil i fag/case/_eyp/, fordi de skrives
   parallelt av hver sin forfatter. Én stor fil ville gitt kollisjoner.

   Bruk:  python3 tools/bygg-eyp-caser.py
"""
import io, os, re, sys

ROT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
KILDE = os.path.join(ROT, "fag", "case", "_eyp")
MÅL = os.path.join(ROT, "fag", "case", "caser-eyp.js")

HODE = '''/* ============== CASETRENING · EY-PARTHENON (S&E) ==============
   Caser rettet mot EY-Parthenons Strategy and Execution-praksis i Oslo.

   Formen følger EY-Parthenons egen kandidatpakke, der begge øvingscasene er
   PE-investeringsvurderinger bygget likt: estimer markedet, finn vekstdriverne,
   les et eksibit, vei muligheter mot risiko, og gi en anbefaling med pris eller
   betingelse i seg.

   Kravene i hvert trinn er skrevet mot EYs egne fire vurderingskriterier:
   problemløsning, tallforståelse, kreativitet og kommunikasjon — der det siste
   uttrykkelig omfatter å svare konstruktivt på motstand og ny informasjon.

   Settingene er norske og hentet fra EY-Parthenon Oslos egen kvartalsrapport
   Transaction Trends. Se docs/case-research/06–09.

   Casene har ingen egen kategori. De ligger blant de vanlige intervjucasene og
   finnes via Stilart-filteret, som filtrerer på `firma`.

   BYGGET FIL — ikke rediger. Kilden er fag/case/_eyp/, bygget med
   tools/bygg-eyp-caser.py.
   ============================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.cases = window.EDU_DATA.cases || [];

window.EDU_DATA.cases.push(
'''

def main():
    if not os.path.isdir(KILDE):
        sys.exit("fant ikke " + KILDE)
    filer = sorted(f for f in os.listdir(KILDE) if f.endswith(".js"))
    if not filer:
        sys.exit("ingen fragmenter i " + KILDE)

    biter, rapport = [], []
    for f in filer:
        tekst = io.open(os.path.join(KILDE, f), encoding="utf-8").read().strip()
        # Fragmentet er ett objektliteral. Kommentarer over det beholdes.
        cid = (re.search(r'id:\s*"([^"]+)"', tekst) or ["", "?"])[1]
        trinn = len(re.findall(r'art:\s*"', tekst))
        if tekst.endswith(","): tekst = tekst[:-1]
        biter.append(tekst)
        rapport.append((f, cid, trinn))

    ut = HODE + ",\n".join(biter) + "\n);\n"
    io.open(MÅL, "w", encoding="utf-8").write(ut)

    print(f"{'fil':<26} {'id':<30} trinn")
    for f, cid, t in rapport:
        print(f"  {f:<24} {cid:<30} {t}")
    ord_ = len(ut.split())
    print(f"\n{MÅL}: {len(rapport)} caser · {ord_} ord · {len(ut)} tegn")

if __name__ == "__main__":
    main()
