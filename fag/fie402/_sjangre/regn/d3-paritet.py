#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-paritet (101 · Payoffs and put-call parity).

Hvert steg: eksempelet, oppgaven, fasiten, hvert feilsvar fra én navngitt feil og
kontrollen. Skriptet stopper med AssertionError hvis et feilsvar faller sammen med
fasiten eller en kontroll ikke går opp.

    python3 fag/fie402/_sjangre/regn/d3-paritet.py
"""
from math import sqrt, isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=4):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


# ---------------------------------------------------------------------
steg("d3-paritet-1 · Payoff and profit")
# Eksempel: call K = 40, premie 3
K, prem = 40, 3
for ST in (48, 41, 35):
    pay = max(ST - K, 0)
    vis(f"eks: S_T = {ST}: payoff", pay, 2); vis(f"eks: S_T = {ST}: profit", pay - prem, 2)
vis("eks: break-even", K + prem, 2)
# Oppgave: call K = 250, premie 18, S_T = 262
K, prem, ST = 250, 18, 262
pay = max(ST - K, 0)
fasit = pay - prem
vis("payoff", pay, 2); vis("FASIT profit", fasit, 2)
f_payoff = pay                 # ga payoff i stedet for profit
f_utlop = -prem                # lot opsjonen utløpe fordi profit er negativ
f_utsteder = prem - pay        # utstederens profit
vis("feil: payoff", f_payoff, 2); vis("feil: lot den utløpe", f_utlop, 2); vis("feil: utstederens profit", f_utsteder, 2)
ulike(fasit, f_payoff, f_utlop, f_utsteder, des=2)
vis("kontroll: break-even", K + prem, 2)
assert fasit + f_utsteder == 0

# ---------------------------------------------------------------------
steg("d3-paritet-2 · Hedging: the payoff of a combination")
# Eksempel: flyselskap kjøper call på drivstoff, K = 80, premie 5
K, prem = 80, 5
for ST in (95, 70):
    netto = ST - max(ST - K, 0) + prem
    vis(f"eks: drivstoff {ST}: netto kostnad", netto, 2)
vis("eks: tak K + premie", K + prem, 2)
# Oppgave: oljeprodusent kjøper put, K = 72, premie 3.50, olje 61
K, prem, ST = 72, 3.50, 61
fasit = ST + max(K - ST, 0) - prem
vis("FASIT per fat", fasit, 2)
f_call = ST + max(ST - K, 0) - prem      # flyselskapets sikring, en call
f_premie = ST + max(K - ST, 0)           # glemte premien
f_neg = ST + (ST - K) - prem             # negativ payoff på put
vis("feil: call", f_call, 2); vis("feil: glemte premien", f_premie, 2); vis("feil: negativ payoff", f_neg, 2)
ulike(fasit, f_call, f_premie, f_neg, des=2)
vis("kontroll: gulv K − premie", K - prem, 2)
vis("kontroll: olje 90 gir", 90 + max(K - 90, 0) - prem, 2)
assert isclose(fasit, K - prem)

# ---------------------------------------------------------------------
steg("d3-paritet-3 · Why parity holds (utsagn)")
K = 50
for ST in (35, 50, 65):
    a = ST + max(K - ST, 0)
    b = max(ST - K, 0) + K
    vis(f"eks: S_T = {ST}: aksje + put", a, 2); vis(f"eks: S_T = {ST}: call + obligasjon", b, 2)
    assert a == b == max(ST, K)
# Oppgave: S = 30, K = 30, r = 5 %, C = 3.10 (brukes i utregningen som illustrasjon)
S, K, r, C = 30, 30, 0.05, 3.10
PVK = K / (1 + r)
P = C - S + PVK
vis("PV(K)", PVK); vis("P fra paritet", P)

# ---------------------------------------------------------------------
steg("d3-paritet-4 · Call given, find the put")
# Eksempel: S = 60, K = 55, r = 5 %, C = 9.00
S, K, r, C = 60, 55, 0.05, 9.00
PVK = K / (1 + r)
vis("eks: PV(K)", PVK); vis("eks: P", C - S + PVK)
# Oppgave: S = 145, K = 150, r = 4 %, C = 11.20
S, K, r, C = 145, 150, 0.04, 11.20
PVK = K / (1 + r)
fasit = C - S + PVK
vis("PV(K)", PVK); vis("FASIT P", fasit)
f_K = C - S + K               # K i stedet for PV(K)
f_byttet = C + S - PVK        # byttet fortegn på S og PV(K)
f_indre = K - S               # put-ens indre verdi som pris
vis("feil: K", f_K); vis("feil: byttet fortegn", f_byttet); vis("feil: indre verdi", f_indre)
ulike(fasit, f_K, f_byttet, f_indre)
vis("kontroll: C − P", C - fasit); vis("kontroll: S − PV(K)", S - PVK)
assert isclose(C - fasit, S - PVK)
vis("kontroll: øvre grense PV(K)", PVK); vis("kontroll: nedre grense max(PV(K) − S, 0)", max(PVK - S, 0))
for navn, f in (("K", f_K), ("byttet", f_byttet), ("indre", f_indre)):
    vis(f"  C − P med feilsvaret {navn}", C - f)

# ---------------------------------------------------------------------
steg("d3-paritet-5 · Six months: the square root")
# Eksempel: 6 % årlig, seks måneder, K = 80, S = 78, C = 5.30
r, K, S, C = 0.06, 80, 78, 5.30
g = sqrt(1 + r)
vis("eks: sqrt(1.06)", g, 6); vis("eks: seksmånedersrente %", (g - 1) * 100); vis("eks: PV(K)", K / g)
vis("eks: P", C - S + K / g)
vis("eks: tre måneder 1.06^0.25", (1 + r) ** 0.25, 6)
vis("eks: lysbilde 17 sqrt(1.015)", sqrt(1.015), 6)
# Oppgave: S = 72, K = 75, seks måneder, 3 % årlig, C = 4.15
S, K, r, C = 72, 75, 0.03, 4.15
g = sqrt(1 + r)
PVK = K / g
fasit = C - S + PVK
vis("sqrt(1.03)", g, 6); vis("PV(K)", PVK); vis("FASIT P", fasit)
f_helar = C - S + K / (1 + r)          # hele årsrenten for seks måneder
f_halv = C - S + K / (1 + r / 2)       # delte årsrenten på to
f_K = C - S + K                        # K i stedet for PV(K)
vis("feil: hele året", f_helar); vis("feil: r/2", f_halv); vis("feil: K", f_K)
vis("  PV(K) hele året", K / (1 + r)); vis("  PV(K) r/2", K / (1 + r / 2))
ulike(fasit, f_helar, f_halv, f_K)
vis("kontroll: PV(K) × sqrt(1.03) × sqrt(1.03) = K × 1.03 / 1.03", PVK * g * g / (1 + r))
vis("kontroll: S − PV(K)", S - PVK); vis("kontroll: C − P", C - fasit)
vis("kontroll: grenser 0 ≤ P ≤ PV(K)", PVK)

# ---------------------------------------------------------------------
steg("d3-paritet-6 · Parity broken: the arbitrage (utsagn)")
# Eksempel: ettårig, S = 50, K = 52, r = 4 %, C = 4.00, P = 4.50
S, K, r, C, P = 50, 52, 0.04, 4.00, 4.50
PVK = K / (1 + r)
vis("eks: PV(K)", PVK); vis("eks: C + PV(K)", C + PVK); vis("eks: P + S", P + S)
vis("eks: gevinst i dag", (C + PVK) - (P + S))
# Oppgave: S = 96, K = 100, seks måneder, 4 % årlig, C = 6.10, P = 7.40
S, K, r, C, P = 96, 100, 0.04, 6.10, 7.40
g = sqrt(1 + r)
PVK = K / g
vis("sqrt(1.04)", g, 6); vis("PV(K)", PVK)
vis("C + PV(K) (fiduciary call)", C + PVK); vis("P + S (protective put)", P + S)
gap = (C + PVK) - (P + S)
vis("FASIT gevinst i dag", gap)
idag = -S - P + C + PVK
assert isclose(idag, gap)
for ST in (120, 80):
    slutt = ST + max(K - ST, 0) - max(ST - K, 0) - PVK * g
    vis(f"  S_T = {ST}: netto ved forfall", slutt)
    assert abs(slutt) < 1e-9
# Feil: hele årsrenten snur ulikheten
PV1 = K / (1 + r)
vis("feil: PV(K) med 1.04", PV1); vis("feil: C + PV(K) med 1.04", C + PV1)
assert C + PV1 < P + S < C + PVK
vis("feil: omvendt handel gir i dag", -gap)
vis("paritet krever P − C = PV(K) − S", PVK - S); vis("kursene gir P − C", P - C)
vis("kontroll: med r/2: C + PV(K)", C + K / (1 + r / 2))
