#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner tallene i den korte stigen d3-eierverktoy (114 · The owner's toolkit: pay, voice and defences).

Steg 4 er tallsteget: giftpillen med 15% utløser og to nye aksjer per aksje til alle
andre enn raideren. Fasit, hvert feilsvar fra én navngitt feil og kontrollen.
Steg 1 og 5 har tall i eksemplene.

    python3 fag/fie402/_sjangre/regn/d3-eierverktoy.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=2):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def andel(s, n):
    """Raiderens andel etter at alle andre får n nye aksjer per aksje."""
    return s / (s + (1 - s) * (1 + n))


steg("d3-eierverktoy-1 · eksempel: tilbakekjøp av 4% for å nå EPS-målet")
eps = 2.90
vis("EPS etter", eps / 0.96)

steg("d3-eierverktoy-4 · eksempel: Kurbatovs tall (10%, én ny aksje)")
k = andel(0.10, 1)
vis("raiderens andel (%)", k * 100, 2)
assert isclose(k, 0.1 / 1.9)

steg("d3-eierverktoy-4 · oppgave: 15% utløser, to nye aksjer per aksje")
s, n = 0.15, 2
fasit = andel(s, n)
andre_ny = 85 * n
vis("andre: nye aksjer per 100", andre_ny, 0)
vis("andre: totalt per 100", 85 + andre_ny, 0)
vis("totalt per 100", 15 + 85 + andre_ny, 0)
vis("fasit (%)", fasit * 100, 2)
f_en = andel(s, 1)                      # brukte én ny aksje som i forelesningen
f_alle = 15 / (100 * (1 + n))           # tredoblet alle aksjer, også raiderens
f_ingen = s                             # raideren deltar også, ingen utvanning
vis("feil: én ny aksje per aksje (%)", f_en * 100, 2)
vis("feil: alle aksjer tredoblet (%)", f_alle * 100, 2)
vis("feil: raideren får også (%)", f_ingen * 100, 2)
ulike(fasit * 100, f_en * 100, f_alle * 100, f_ingen * 100)
vis("kontroll: andel av tidligere krav (%)", fasit / s * 100, 2)
vis("kontroll: tap ved gratis nye aksjer (%)", (1 - fasit / s) * 100, 2)
vis("kontroll: 5.5556% × 270", fasit * 270, 2)
assert isclose(fasit * 270, 15)

steg("d3-eierverktoy-5 · eksempel: to aksjeklasser")
gründer_stemmer = 10 * 10
publikum = 90 * 1
vis("grunnleggerens stemmeandel (%)", gründer_stemmer / (gründer_stemmer + publikum) * 100, 2)
print("\nAlle kontroller gikk opp.")
