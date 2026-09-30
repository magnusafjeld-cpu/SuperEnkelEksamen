#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setter sammen PwC-casene fra fragmenter til én fagdatafil.

   Hver case skrives som sin egen fil i fag/case/_pwc/, fordi de skrives
   parallelt av hver sin forfatter. Kontrakten er docs/case-pwc-spek.md.

   Bruk:  python3 tools/bygg-pwc-caser.py
          python3 tools/bygg-pwc-caser.py 01-a.js 03-b.js   # bare disse, for testing
          node tools/sjekk-caser.js fag/case/caser-pwc.js
"""
import io, os, re, sys

ROT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
KILDE = os.path.join(ROT, "fag", "case", "_pwc")
MÅL = os.path.join(ROT, "fag", "case", "caser-pwc.js")

HODE = '''/* ============== CASETRENING · PWC CONSULTING (OSLO) ==============
   Caser i formen PwC selv beskriver: et skriftlig casemateriale med «viktige
   forhold», kort lesetid, og så spørsmål fra en engasjementsleder i fast
   rekkefølge. 30–45 minutter, intervjuerledet. PwC Norges eget råd er «Les
   informasjonen du mottar svært nøye», og hvert materiale har én detalj som
   bare den som leser nøye, får med seg.

   Gjennomføringen er en del av svaret: hver case har et drøftingstrinn om
   risiko, veikart eller KI, slik PwCs egne eksempelcaser har.

   Kravene i hvert trinn er merket med ett av PwCs fem vurderingskriterier, og
   case-spilleren summerer treffene per kriterium etter casen. Navnene under er
   innhold, ikke motor.

   Casene har ingen egen kategori. De ligger blant intervjucasene og finnes via
   Stilart-filteret, som filtrerer på `firma`. Kilder: docs/case-research/10.

   BYGGET FIL — ikke rediger. Kilden er fag/case/_pwc/, bygget med
   tools/bygg-pwc-caser.py.
   ============================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.cases = window.EDU_DATA.cases || [];

/* PwCs egne fem kriterier, fra PwCs case-guide: structured thinking, comfort
   with ambiguity, communication skills, business intuition and basic numeracy,
   curiosity and coachability. */
window.EDU_DATA.caseKriterier = Object.assign(window.EDU_DATA.caseKriterier || {}, {
  struktur: "Strukturert tenkning",
  uklarhet: "Håndterer uklarhet",
  kommunikasjon: "Kommunikasjon",
  tall: "Forretningsforståelse og tall",
  nysgjerrighet: "Nysgjerrighet og mottakelighet",
});

window.EDU_DATA.cases.push(
'''

def main():
    if not os.path.isdir(KILDE):
        sys.exit("fant ikke " + KILDE)
    valgt = [os.path.basename(a) for a in sys.argv[1:]]
    filer = sorted(f for f in os.listdir(KILDE) if f.endswith(".js") and (not valgt or f in valgt))
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

    print(f"{'fil':<34} {'id':<32} trinn")
    for f, cid, t in rapport:
        print(f"  {f:<32} {cid:<32} {t}")
    ord_ = len(ut.split())
    print(f"\n{MÅL}: {len(rapport)} caser · {ord_} ord · {len(ut)} tegn")

if __name__ == "__main__":
    main()
