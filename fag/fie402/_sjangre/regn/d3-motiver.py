#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner tallene i den korte stigen d3-motiver (110 · Why firms merge and who gains).

Stigen er verbal; tallene står i eksemplene (EPS-bootstrapping, kontanter mot aksjer,
budkonkurranse og overtakelsestrusselen) og i kontrollene.

    python3 fag/fie402/_sjangre/regn/d3-motiver.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


steg("d3-motiver-2 · eksempel: EPS opp, ingen rikere")
EA, NA, PA = 60, 30, 50
A = NA * PA
ET, T = 40, 400
x = T / PA
eps_for = EA / NA
eps_etter = (EA + ET) / (NA + x)
p_etter = (A + T) / (NA + x)
vis("A", A, 2)
vis("EPS før", eps_for)
vis("P/E før", PA / eps_for, 2)
vis("P/E mål", T / ET, 2)
vis("x nye aksjer", x, 2)
vis("EPS etter", eps_etter)
vis("økning i EPS (%)", (eps_etter / eps_for - 1) * 100, 2)
vis("pris etter", p_etter, 2)
vis("P/E etter", p_etter / eps_etter, 2)
assert isclose(p_etter, 50.0)
assert isclose(p_etter / eps_etter, 19.0)

steg("d3-motiver-3 · eksempel: to budgivere")
T3, S3 = 400, 100
vis("høyeste bud per budgiver", T3 + S3, 0)

steg("d3-motiver-4 · eksempel: kontanter mot aksjer når synergiene uteblir")
A4, T4, S4, P4 = 800, 200, 100, 250
y = P4 / (A4 + T4 + S4)
vis("y", y, 6)
vis("forventet NPV_A kontant", S4 - (P4 - T4), 2)
vis("forventet NPV_A aksjer", (1 - y) * (A4 + T4 + S4) - A4, 2)
assert isclose(S4 - (P4 - T4), (1 - y) * (A4 + T4 + S4) - A4)
# S = 0
npva_kontant = 0 - (P4 - T4)
npva_aksje = (1 - y) * (A4 + T4) - A4
npvt_aksje = y * (A4 + T4) - T4
vis("S = 0: NPV_A kontant", npva_kontant, 2)
vis("S = 0: (1 − y)(A + T)", (1 - y) * (A4 + T4), 2)
vis("S = 0: NPV_A aksjer", npva_aksje, 2)
vis("S = 0: NPV_T aksjer", npvt_aksje, 2)
vis("målets andel av bortfallet", 50 - npvt_aksje, 2)
vis("y × 100", y * 100, 2)
assert isclose(50 - npvt_aksje, y * 100)
assert isclose(npva_aksje + npvt_aksje, 0, abs_tol=1e-9)

steg("d3-motiver-5 · eksempel: overtakelsestrusselen")
V0, V1, P5 = 1000, 1300, 1150
vis("budgiverens gevinst", V1 - P5, 0)
vis("målets eiere", P5 - V0, 0)

steg("d3-motiver-6 · kontroll: poeng")
vis("poeng med boks 3 feil", 3 * 3, 0)
print("\nAlle kontroller gikk opp.")
