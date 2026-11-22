#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-replikering (102 · The replicating portfolio).

Hvert steg: eksempelet, oppgaven, fasiten, hvert feilsvar fra én navngitt feil og
kontrollen. Skriptet stopper med AssertionError hvis et feilsvar faller sammen med
fasiten eller en kontroll ikke går opp.

    python3 fag/fie402/_sjangre/regn/d3-replikering.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=4):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def repl(S0, Su, Sd, Cu, Cd, r):
    """Δ, B og pris for en ettperiodes binomisk replikering."""
    D = (Cu - Cd) / (Su - Sd)
    B = (Cd - Sd * D) / (1 + r)
    return D, B, S0 * D + B


def rho(S0, Su, Sd, r):
    return ((1 + r) * S0 - Sd) / (Su - Sd)


# ---------------------------------------------------------------------
steg("d3-replikering-1 · Same payoff, same price (utsagn)")
# Eksempel: S0 = 20, Su = 26, Sd = 16, r = 4 %, call K = 20
S0, Su, Sd, r, K = 20, 26, 16, 0.04, 20
D, B, C = repl(S0, Su, Sd, max(Su - K, 0), max(Sd - K, 0), r)
vis("eks: Δ", D); vis("eks: B", B); vis("eks: tilbakebetaling", -B * (1 + r)); vis("eks: pris", C)
vis("eks: opp", D * Su + B * (1 + r)); vis("eks: ned", D * Sd + B * (1 + r))
# Oppgave: S0 = 50, Su = 65, Sd = 40, r = 5 %, call K = 50, porteføljen 0.6 aksjer og lån 22.8571
S0, Su, Sd, r, K = 50, 65, 40, 0.05, 50
D, B, C = repl(S0, Su, Sd, max(Su - K, 0), max(Sd - K, 0), r)
vis("Δ", D); vis("B (lån)", B); vis("tilbakebetaling", -B * (1 + r))
vis("opp", D * Su + B * (1 + r)); vis("ned", D * Sd + B * (1 + r))
vis("porteføljens kostnad = callens verdi", C)
marked = 8.00
vis("FASIT gevinst ved å skrive call og kjøpe kopien", marked - C)
assert isclose(D, 0.6) and isclose(-B * (1 + r), 24)

# ---------------------------------------------------------------------
steg("d3-replikering-2 · Δ")
# Eksempel: S0 = 30, Su = 36, Sd = 24, call K = 30
S0, Su, Sd, K = 30, 36, 24, 30
vis("eks: Δ", (max(Su - K, 0) - max(Sd - K, 0)) / (Su - Sd))
# Oppgave: S0 = 120, Su = 150, Sd = 96, call K = 110
S0, Su, Sd, K = 120, 150, 96, 110
Cu, Cd = max(Su - K, 0), max(Sd - K, 0)
fasit = (Cu - Cd) / (Su - Sd)
vis("Cu", Cu, 2); vis("Cd", Cd, 2); vis("FASIT Δ", fasit, 6)
f_niva = Cu / Su            # forhold mellom nivåer
f_S0 = Cu / S0              # delt på dagens kurs
f_snudd = (Su - Sd) / (Cu - Cd)  # snudd brøk
vis("feil: Cu/Su", f_niva); vis("feil: Cu/S0", f_S0); vis("feil: snudd", f_snudd)
ulike(fasit, f_niva, f_S0, f_snudd)
vis("kontroll: Δ × Su", fasit * Su); vis("kontroll: Δ × Sd", fasit * Sd)
vis("kontroll: svingning", fasit * Su - fasit * Sd)
for navn, f in (("Cu/Su", f_niva), ("Cu/S0", f_S0)):
    vis(f"  svingning med {navn}", f * (Su - Sd))

# ---------------------------------------------------------------------
steg("d3-replikering-3 · B and the price")
# Eksempel: S0 = 30, Su = 36, Sd = 24, r = 4 %, call K = 30
S0, Su, Sd, r, K = 30, 36, 24, 0.04, 30
D, B, C = repl(S0, Su, Sd, max(Su - K, 0), max(Sd - K, 0), r)
vis("eks: Δ", D); vis("eks: B", B); vis("eks: SΔ", S0 * D); vis("eks: C", C)
vis("eks: opp", D * Su + B * (1 + r)); vis("eks: ned", D * Sd + B * (1 + r))
C_eks = C
# Oppgave: samme tre som steg 2, r = 4 %
S0, Su, Sd, r, K = 120, 150, 96, 0.04, 110
Cu, Cd = max(Su - K, 0), max(Sd - K, 0)
D, B, C = repl(S0, Su, Sd, Cu, Cd, r)
vis("Δ", D, 6); vis("Sd × Δ", Sd * D, 6); vis("B", B, 6); vis("S0 × Δ", S0 * D, 6); vis("FASIT C", C)
fasit = C
f_udisk = S0 * D - Sd * D                 # glemte å diskontere lånet
f_fortegn = S0 * D + Sd * D / (1 + r)     # la til lånet
f_gang = S0 * D - Sd * D * (1 + r)        # ganget med 1.04 i stedet for å dele
vis("feil: udiskontert", f_udisk); vis("feil: fortegn", f_fortegn); vis("feil: ganget", f_gang)
ulike(fasit, f_udisk, f_fortegn, f_gang)
vis("kontroll: opp", D * Su + B * (1 + r)); vis("kontroll: ned", D * Sd + B * (1 + r))
vis("kontroll: nedre grense S − PV(K)", S0 - K / (1 + r))
vis("kontroll: rho", rho(S0, Su, Sd, r), 6); vis("kontroll: rho-pris", rho(S0, Su, Sd, r) * Cu / (1 + r))

# ---------------------------------------------------------------------
steg("d3-replikering-4 · Replicating a put")
# Eksempel: S0 = 30, Su = 36, Sd = 24, r = 4 %, put K = 30
S0, Su, Sd, r, K = 30, 36, 24, 0.04, 30
D, B, P = repl(S0, Su, Sd, max(K - Su, 0), max(K - Sd, 0), r)
vis("eks: Δ", D); vis("eks: B", B); vis("eks: P", P)
vis("eks: opp", D * Su + B * (1 + r)); vis("eks: ned", D * Sd + B * (1 + r))
vis("eks: paritet C + PV(K)", C_eks + K / (1 + r)); vis("eks: P + S", P + S0)
# Oppgave: S0 = 45, Su = 54, Sd = 36, r = 3 %, put K = 48
S0, Su, Sd, r, K = 45, 54, 36, 0.03, 48
Pu, Pd = max(K - Su, 0), max(K - Sd, 0)
D, B, P = repl(S0, Su, Sd, Pu, Pd, r)
vis("Pu", Pu, 2); vis("Pd", Pd, 2); vis("Δ", D, 6); vis("Sd × Δ", Sd * D, 6); vis("B", B, 6)
vis("S0 × Δ", S0 * D, 6); vis("FASIT P", P)
fasit = P
# Feil: positiv Δ (kjøpte aksjer)
Dp = -D
Bp = (Pd - Sd * Dp) / (1 + r)
f_pos = S0 * Dp + Bp
# Feil: glemte å diskontere
f_udisk = S0 * D + (Pd - Sd * D)
# Feil: call-payoffs av vane
Dc, Bc, Cc = repl(S0, Su, Sd, max(Su - K, 0), max(Sd - K, 0), r)
f_call = Cc
vis("feil: positiv Δ: B", Bp); vis("feil: positiv Δ", f_pos); vis("feil: udiskontert", f_udisk)
vis("feil: call i stedet: Δ", Dc); vis("feil: call i stedet: B", Bc); vis("feil: call", f_call)
ulike(fasit, f_pos, f_udisk, f_call)
vis("kontroll: opp", D * Su + B * (1 + r)); vis("kontroll: ned", D * Sd + B * (1 + r))
vis("kontroll: positiv Δ opp", Dp * Su + Bp * (1 + r))
PVK = K / (1 + r)
vis("kontroll: PV(K)", PVK); vis("kontroll: C + PV(K)", f_call + PVK); vis("kontroll: P + S", fasit + S0)
assert isclose(f_call + PVK, fasit + S0)
vis("kontroll: rho", rho(S0, Su, Sd, r), 6); vis("kontroll: (1 − rho) Pd/(1 + r)", (1 - rho(S0, Su, Sd, r)) * Pd / (1 + r))

# ---------------------------------------------------------------------
steg("d3-replikering-5 · Why the real probability never appears (utsagn)")
# Eksempel: S0 = 30, Su = 36, Sd = 24, r = 4 %, call K = 30, p = 0.9 og 0.2
S0, Su, Sd, r, K = 30, 36, 24, 0.04, 30
for p in (0.9, 0.2):
    vis(f"eks: p = {p}: p × Cu/(1 + r) (feil)", p * 6 / (1 + r))
# Oppgave: S0 = 80, Su = 104, Sd = 68, r = 5 %, call K = 84; analytiker A p = 0.8, B p = 0.5
S0, Su, Sd, r, K = 80, 104, 68, 0.05, 84
Cu, Cd = max(Su - K, 0), max(Sd - K, 0)
D, B, C = repl(S0, Su, Sd, Cu, Cd, r)
vis("Δ", D, 6); vis("B", B, 6); vis("S0Δ", S0 * D, 6); vis("FASIT C (begge)", C)
for p in (0.8, 0.5):
    ES = p * Su + (1 - p) * Sd
    EC = p * Cu
    vis(f"p = {p}: E[S1]", ES); vis(f"p = {p}: forventet aksjeavkastning %", (ES / S0 - 1) * 100)
    vis(f"p = {p}: E[C1]", EC); vis(f"p = {p}: p × Cu/(1 + r) (feil)", EC / (1 + r))
    vis(f"p = {p}: callens egen forventede avkastning %", (EC / C - 1) * 100)
    rC = r + (S0 * D / C) * (ES / S0 - 1 - r)
    vis(f"p = {p}: r_f + (S0Δ/C)(r_S − r_f) %", rC * 100)
    assert isclose(rC, EC / C - 1)
vis("kontroll: rho", rho(S0, Su, Sd, r), 6)

# ---------------------------------------------------------------------
steg("d3-replikering-6 · Exam level: replicate the firm's debt")
# Eksempel: V0 = 200, Vu = 250, Vd = 150, r = 4 %, F = 170
V0, Vu, Vd, r, F = 200, 250, 150, 0.04, 170
Dd, Bd, D = repl(V0, Vu, Vd, min(Vu, F), min(Vd, F), r)
De, Be, E = repl(V0, Vu, Vd, max(Vu - F, 0), max(Vd - F, 0), r)
vis("eks: Δ_D", Dd); vis("eks: B_D", Bd); vis("eks: D", D)
vis("eks: Δ_E", De); vis("eks: B_E", Be); vis("eks: E", E); vis("eks: E + D", E + D)
# Oppgave: V0 = 400, Vu = 520, Vd = 300, r = 5 %, F = 360, analytikere p = 0.6
V0, Vu, Vd, r, F, p = 400, 520, 300, 0.05, 360, 0.6
Du_, Dd_ = min(Vu, F), min(Vd, F)
Dd, Bd, D = repl(V0, Vu, Vd, Du_, Dd_, r)
vis("gjeld opp", Du_, 2); vis("gjeld ned", Dd_, 2)
vis("Δ_D", Dd, 6); vis("Vd × Δ_D", Vd * Dd, 6); vis("Vd − Vd × Δ_D", Vd - Vd * Dd, 6); vis("B_D", Bd, 6)
vis("V0 × Δ_D", V0 * Dd, 6); vis("FASIT D", D)
fasit = D
f_PV = F / (1 + r)                                  # ignorerer mislighold
Dz, Bz, f_null = repl(V0, Vu, Vd, F, 0, r)          # kreditorene får null ved mislighold
f_p = (p * Du_ + (1 - p) * Dd_) / (1 + r)           # reell sannsynlighet med r_f
vis("feil: PV(F)", f_PV); vis("feil: null ved mislighold: Δ", Dz, 6); vis("feil: null: B", Bz, 6)
vis("feil: null ved mislighold", f_null); vis("feil: p med r_f", f_p)
ulike(fasit, f_PV, f_null, f_p)
vis("kontroll: opp", Dd * Vu + Bd * (1 + r)); vis("kontroll: ned", Dd * Vd + Bd * (1 + r))
De, Be, E = repl(V0, Vu, Vd, max(Vu - F, 0), max(Vd - F, 0), r)
vis("kontroll: Δ_E", De, 6); vis("kontroll: B_E", Be, 6); vis("kontroll: E", E); vis("kontroll: E + D", E + D)
assert isclose(E + D, V0)
for navn, f in (("PV(F)", f_PV), ("null", f_null), ("p", f_p)):
    vis(f"  E + feilsvar {navn}", E + f)
q = rho(V0, Vu, Vd, r)
vis("kontroll: rho", q, 6); vis("kontroll: rho-pris", (q * Du_ + (1 - q) * Dd_) / (1 + r))
put = (1 - q) * (F - Vd) / (1 + r)
vis("kontroll: put direkte", put); vis("kontroll: PV(F) − D", f_PV - D)
assert isclose(put, f_PV - D)
vis("kontroll: lovet rente %", (F / D - 1) * 100)
