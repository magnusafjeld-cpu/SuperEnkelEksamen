#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-rho (103 · Risk-neutral pricing with ρ).

Hvert steg: eksempelet, oppgaven, fasiten, hvert feilsvar fra én navngitt feil og
kontrollen. Skriptet stopper med AssertionError hvis et feilsvar faller sammen med
fasiten eller en kontroll ikke går opp.

    python3 fag/fie402/_sjangre/regn/d3-rho.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=4):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def rho(S0, Su, Sd, r):
    return ((1 + r) * S0 - Sd) / (Su - Sd)


def rn(q, Xu, Xd, r):
    return (q * Xu + (1 - q) * Xd) / (1 + r)


# ---------------------------------------------------------------------
steg("d3-rho-1 · ρ")
# Eksempel: S0 = 40, Su = 50, Sd = 30, r = 5 %
q = rho(40, 50, 30, 0.05)
vis("eks: rho", q); vis("eks: reprising", rn(q, 50, 30, 0.05))
# Oppgave: S0 = 64, Su = 80, Sd = 52, r = 3 %
S0, Su, Sd, r = 64, 80, 52, 0.03
fasit = rho(S0, Su, Sd, r)
vis("(1 + r)S0", (1 + r) * S0); vis("FASIT rho", fasit, 6)
f_vekst = (S0 - Sd) / (Su - Sd)                  # glemte å vokse S0
f_byttet = 1 - fasit                             # ga ned-sannsynligheten
f_delt = (S0 / (1 + r) - Sd) / (Su - Sd)         # diskonterte S0 i stedet for å vokse den
vis("feil: glemte vekst", f_vekst); vis("feil: 1 − rho", f_byttet); vis("feil: delte", f_delt)
vis("  S0/(1 + r)", S0 / (1 + r))
ulike(fasit, f_vekst, f_byttet, f_delt)
vis("kontroll: reprising", rn(fasit, Su, Sd, r))
vis("  ledd opp", fasit * Su, 6); vis("  ledd ned", (1 - fasit) * Sd, 6)
for navn, f in (("glemte vekst", f_vekst), ("1 − rho", f_byttet), ("delte", f_delt)):
    vis(f"  reprising med {navn}", rn(f, Su, Sd, r))

# ---------------------------------------------------------------------
steg("d3-rho-2 · Price any claim")
# Eksempel: samme tre som steg 1-eksempelet, rho = 0.6
q, r = 0.6, 0.05
vis("eks: put K = 45", rn(q, 0, 15, r))
vis("eks: krav som betaler 10 / 4", rn(q, 10, 4, r))
vis("eks: obligasjon 1 / 1", rn(q, 1, 1, r))
# Oppgave: S0 = 75, Su = 95, Sd = 60, r = 4 %, put K = 80
S0, Su, Sd, r, K = 75, 95, 60, 0.04, 80
q = rho(S0, Su, Sd, r)
Pu, Pd = max(K - Su, 0), max(K - Sd, 0)
fasit = rn(q, Pu, Pd, r)
vis("rho", q, 6); vis("1 − rho", 1 - q, 6); vis("(1 − rho) × Pd", (1 - q) * Pd, 6); vis("FASIT P", fasit)
f_udisk = q * Pu + (1 - q) * Pd                 # glemte å diskontere
f_feilgren = (q * Pd + (1 - q) * Pu) / (1 + r)  # rho på ned-tilstanden
f_call = rn(q, max(Su - K, 0), max(Sd - K, 0), r)  # call-payoff
vis("feil: udiskontert", f_udisk); vis("feil: rho på ned", f_feilgren); vis("feil: call", f_call)
ulike(fasit, f_udisk, f_feilgren, f_call)
PVK = K / (1 + r)
vis("kontroll: PV(K)", PVK); vis("kontroll: C + PV(K)", f_call + PVK); vis("kontroll: P + S", fasit + S0)
assert isclose(f_call + PVK, fasit + S0)
Cw = rn(1 - q, max(Su - K, 0), max(Sd - K, 0), r)
vis("  med vektene byttet: C", Cw); vis("  C + PV(K)", Cw + PVK); vis("  P + S", f_feilgren + S0)

# ---------------------------------------------------------------------
steg("d3-rho-3 · Why p > ρ (utsagn)")
# Eksempel: S0 = 40, Su = 50, Sd = 30, r = 5 %, p = 0.75
q = rho(40, 50, 30, 0.05)
ES = 0.75 * 50 + 0.25 * 30
vis("eks: rho", q); vis("eks: E[S1]", ES); vis("eks: forventet avkastning %", (ES / 40 - 1) * 100)
vis("eks: E[S1]/(1 + r_f)", ES / 1.05)
# Oppgave: S0 = 100, Su = 125, Sd = 85, r = 4 %, p = 0.70
S0, Su, Sd, r, p = 100, 125, 85, 0.04, 0.70
q = rho(S0, Su, Sd, r)
ES = p * Su + (1 - p) * Sd
vis("FASIT rho", q); vis("E[S1]", ES); vis("forventet avkastning %", (ES / S0 - 1) * 100)
vis("E[S1]/(1 + r_f)", ES / (1 + r))
vis("p-vektet / 1.13 (riktig risikojustert)", ES / (ES / S0))

# ---------------------------------------------------------------------
steg("d3-rho-4 · A low S0 means pessimism (utsagn)")
# Eksempel: Kurbatovs drill S0 = 100, 120/60, r = 5 % (rho = 0.75) og S0 = 90
for S0 in (100, 90):
    vis(f"eks: S0 = {S0}: rho", rho(S0, 120, 60, 0.05))
# Oppgave: Su = 150, Sd = 90, r = 5 %, S0 fra 120 til 100
Su, Sd, r, K = 150, 90, 0.05, 110
for S0 in (120, 100):
    q = rho(S0, Su, Sd, r)
    vis(f"S0 = {S0}: (1 + r)S0", (1 + r) * S0); vis(f"S0 = {S0}: rho", q)
    vis(f"S0 = {S0}: call K = 110", rn(q, max(Su - K, 0), max(Sd - K, 0), r))
    vis(f"S0 = {S0}: put K = 110", rn(q, max(K - Su, 0), max(K - Sd, 0), r))
vis("grense: S0 = Sd/(1 + r) gir rho = 0", Sd / (1 + r))
assert isclose(rho(120, Su, Sd, r), 0.6) and isclose(rho(100, Su, Sd, r), 0.25)

# ---------------------------------------------------------------------
steg("d3-rho-5 · p first, then ρ (PS3 E2 og E4)")
# Eksempel: Su = 120, Sd = 70, p = 0.6, beta = 1.0, r_f = 5 %, E[Rm] = 11 %, call K = 100
Su, Sd, p, b, rf, Rm, K = 120, 70, 0.6, 1.0, 0.05, 0.11, 100
rE = rf + b * (Rm - rf)
ES = p * Su + (1 - p) * Sd
S0 = ES / (1 + rE)
q = rho(S0, Su, Sd, rf)
vis("eks: r_E %", rE * 100); vis("eks: E[S1]", ES); vis("eks: S0", S0); vis("eks: (1 + rf)S0", (1 + rf) * S0)
vis("eks: rho", q, 6); vis("eks: call", rn(q, max(Su - K, 0), 0, rf))
# Oppgave: Su = 140, Sd = 80, p = 0.55, beta = 1.2, r_f = 4 %, E[Rm] = 9 %, call K = 100
Su, Sd, p, b, rf, Rm, K = 140, 80, 0.55, 1.2, 0.04, 0.09, 100
rE = rf + b * (Rm - rf)
ES = p * Su + (1 - p) * Sd
S0 = ES / (1 + rE)
q = rho(S0, Su, Sd, rf)
Cu = max(Su - K, 0)
fasit = rn(q, Cu, 0, rf)
vis("r_E %", rE * 100); vis("E[S1]", ES); vis("S0", S0, 6); vis("(1 + rf)S0", (1 + rf) * S0, 6)
vis("rho", q, 6); vis("rho × Cu", q * Cu, 6); vis("FASIT C", fasit)
f_prf = p * Cu / (1 + rf)                  # reell p med r_f
f_prE = p * Cu / (1 + rE)                  # reell p med aksjens r_E
rE_feil = rf + b * Rm                      # markedsavkastning i stedet for premie
S0_feil = ES / (1 + rE_feil)
q_feil = rho(S0_feil, Su, Sd, rf)
f_capm = rn(q_feil, Cu, 0, rf)
vis("feil: p med r_f", f_prf); vis("feil: p med r_E", f_prE)
vis("feil: r_E med markedsavkastning %", rE_feil * 100); vis("feil: S0", S0_feil); vis("feil: rho", q_feil, 6)
vis("feil: CAPM", f_capm)
ulike(fasit, f_prf, f_prE, f_capm)
# S0 diskontert med r_f gir rho = p
S0_rf = ES / (1 + rf)
vis("S0 diskontert med r_f", S0_rf); vis("rho da", rho(S0_rf, Su, Sd, rf), 6)
assert isclose(rho(S0_rf, Su, Sd, rf), p)
# Kontroller
vis("kontroll: rho < p", q); vis("kontroll: reprising av S0", rn(q, Su, Sd, rf))
D = Cu / (Su - Sd)
B = -Sd * D / (1 + rf)
vis("kontroll: Δ", D, 6); vis("kontroll: B", B, 6); vis("kontroll: S0Δ", S0 * D, 6); vis("kontroll: S0Δ + B", S0 * D + B)
EC = p * Cu
vis("callens forventede avkastning %", (EC / fasit - 1) * 100)
vis("r_f + (S0Δ/C)(r_E − r_f) %", (rf + (S0 * D / fasit) * (rE - rf)) * 100)
vis("S0Δ/C", S0 * D / fasit)

# ---------------------------------------------------------------------
steg("d3-rho-6 · ρ from a traded security with a payout")
# Eksempel: sertifikat 50 i dag; ved t = 1 utbetaling 5 (høy) eller 2 (lav), deretter 60 eller 40; r = 5 %
S0, r = 50, 0.05
Xu, Xd = 5 + 60, 2 + 40
q = rho(S0, Xu, Xd, r)
vis("eks: Xu", Xu, 2); vis("eks: Xd", Xd, 2); vis("eks: (1 + r)S0", (1 + r) * S0); vis("eks: rho", q, 6)
vis("eks: uten utbetaling (feil)", rho(S0, 60, 40, r), 6)
vis("eks: krav 10 i lav", rn(q, 0, 10, r))
# Oppgave: fond 230; utbetaling 24 (høy) / 12 (lav); etterpå 260 / 190; r = 4 %; kontrakt 40 i lav
S0, r = 230, 0.04
Xu, Xd = 24 + 260, 12 + 190
q = rho(S0, Xu, Xd, r)
fasit = rn(q, 0, 40, r)
vis("(1 + r)S0", (1 + r) * S0); vis("Xu", Xu, 2); vis("Xd", Xd, 2); vis("teller", (1 + r) * S0 - Xd)
vis("nevner", Xu - Xd, 2); vis("rho", q, 6); vis("1 − rho", 1 - q, 6); vis("(1 − rho) × 40", (1 - q) * 40, 6)
vis("FASIT kontrakt", fasit)
q_uten = rho(S0, 260, 190, r)
f_uten = rn(q_uten, 0, 40, r)                       # glemte utbetalingen
f_gren = rn(q, 40, 0, r)                            # rho på lav-tilstanden
q_vekst = (S0 - Xd) / (Xu - Xd)
f_vekst = rn(q_vekst, 0, 40, r)                     # glemte å vokse S0
vis("feil: rho uten utbetaling", q_uten, 6); vis("feil: uten utbetaling", f_uten)
vis("feil: rho på lav", f_gren); vis("feil: rho uten vekst", q_vekst, 6); vis("feil: uten vekst", f_vekst)
ulike(fasit, f_uten, f_gren, f_vekst)
vis("kontroll: reprising med full verdi", rn(q, Xu, Xd, r))
vis("  ledd opp", q * Xu, 6); vis("  ledd ned", (1 - q) * Xd, 6)
vis("kontroll: rho uten utbetaling repriser til", rn(q_uten, Xu, Xd, r))
vis("  ledd opp", q_uten * Xu, 6); vis("  ledd ned", (1 - q_uten) * Xd, 6)
vis("kontroll: høy-kontrakt + lav-kontrakt", f_gren + fasit); vis("kontroll: 40/1.04", 40 / (1 + r))
