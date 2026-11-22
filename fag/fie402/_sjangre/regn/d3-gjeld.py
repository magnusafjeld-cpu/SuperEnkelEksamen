#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-gjeld (gjeld og egenkapital som opsjoner).

Hvert steg: eksempelet, oppgaven, fasiten, hvert feilsvar og kontrollen.

    python3 fag/fie402/_sjangre/regn/d3-gjeld.py
"""


def vis(navn, v, des=4):
    print(f"  {navn:<60} {v:.{des}f}")


def ulike(*x, des=4):
    r = [round(v, des) for v in x]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def tre(V0, Vu, Vd, rf, F):
    rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
    E = (rho * max(Vu - F, 0) + (1 - rho) * max(Vd - F, 0)) / (1 + rf)
    D = (rho * min(Vu, F) + (1 - rho) * min(Vd, F)) / (1 + rf)
    P = (rho * max(F - Vu, 0) + (1 - rho) * max(F - Vd, 0)) / (1 + rf)
    return rho, E, D, P


# ---------------------------------------------------------------- steg 1
print("\nd3-gjeld-1 · Equity is a call, debt is risk-free debt plus a written put")
# Eksempel: F = 100, V_T = 150 eller 60
for VT in (150, 60):
    vis(f"eks: V_T = {VT}: E", max(VT - 100, 0)); vis("   D", min(VT, 100)); vis("   put", max(100 - VT, 0))
    assert min(VT, 100) == 100 - max(100 - VT, 0)
# Oppgave (utsagn): ingen tall. Kontroll med F = 80, V_T = 50: 80 − 30 = 50
vis("kontroll: F − put ved V_T = 50", 80 - max(80 - 50, 0))
vis("kontroll: F + put (feil fortegn)", 80 + max(80 - 50, 0))

# ---------------------------------------------------------------- steg 2
print("\nd3-gjeld-2 · Valuing E and D in a one-period tree")
rho, E, D, P = tre(100, 120, 80, 0.04, 90)
vis("eks: rho", rho); vis("eks: E", E); vis("eks: D", D); vis("eks: put", P); vis("eks: PV(F)", 90 / 1.04)
vis("eks: PV(F) − put", 90 / 1.04 - P); vis("eks: E + D", E + D)
# Oppgave: V0 = 400, Vu = 520, Vd = 320, rf = 4 %, F = 360, analytikere sier p(opp) = 0.7
V0, Vu, Vd, rf, F, p = 400, 520, 320, 0.04, 360, 0.7
rho, E, D, P = tre(V0, Vu, Vd, rf, F)
vis("opp: rho", rho); vis("FASIT E", E); vis("opp: D", D); vis("opp: put", P)
vis("opp: PV(F)", F / (1 + rf)); vis("opp: PV(F) − put", F / (1 + rf) - P); vis("opp: E + D", E + D)
f_reell = p * (Vu - F) / (1 + rf)                 # reell sannsynlighet
f_uten_ansvar = V0 - F / (1 + rf)                 # E[V] − F: egenkapitalen betaler underskuddet
f_udisk = rho * (Vu - F)                          # glemte å diskontere
vis("feil: reell p", f_reell); vis("feil: V − PV(F)", f_uten_ansvar); vis("feil: udiskontert", f_udisk)
ulike(E, f_reell, f_uten_ansvar, f_udisk)
vis("kontroll: E − (V − PV(F)) = put", E - f_uten_ansvar)
vis("kontroll: avkastning E under rho", rho * (Vu - F) / E)
vis("kontroll: rente y = F/D − 1 (%)", (F / D - 1) * 100)

# ---------------------------------------------------------------- steg 3
print("\nd3-gjeld-3 · Why shareholders like risk: the wealth transfer")
# Eksempel: V0 = 100, Vu = 120, Vd = 80, rf = 4 %, F = 90 (samme som steg 2); risikabel 140 / 50
rho0 = ((1.04) * 100 - 80) / 40
Vu2, Vd2 = 140, None
Vd2 = (104 - rho0 * Vu2) / (1 - rho0)
vis("eks: rho", rho0); vis("eks: ny Vd", Vd2)
_, E1, D1, _ = tre(100, 120, 80, 0.04, 90)
_, E2, D2, _ = tre(100, Vu2, Vd2, 0.04, 90)
vis("eks: E før", E1); vis("eks: E etter", E2); vis("eks: dE", E2 - E1)
vis("eks: D før", D1); vis("eks: D etter", D2); vis("eks: dD", D2 - D1)
# Oppgave: V0 = 400, Vu = 520, Vd = 320 → Vu = 572, Vd = 272, samme rho = 0.48, F = 360
rho, E1, D1, _ = tre(400, 520, 320, 0.04, 360)
Vu2, Vd2 = 572, 272
assert abs((rho * Vu2 + (1 - rho) * Vd2) / 1.04 - 400) < 1e-9
_, E2, D2, P2 = tre(400, Vu2, Vd2, 0.04, 360)
dE, dD = E2 - E1, D2 - D1
vis("opp: E før", E1); vis("opp: E etter", E2); vis("FASIT dE", dE)
vis("opp: D før", D1); vis("opp: D etter", D2); vis("FASIT dD", dD)
f_udisk = rho * (Vu2 - 360) - rho * (520 - 360)
vis("feil: udiskontert dE", f_udisk)
ulike(dE, f_udisk, 0.0)
vis("kontroll: dE + dD", dE + dD)
vis("kontroll: put før", 360 / 1.04 - D1); vis("kontroll: put etter", 360 / 1.04 - D2)
vis("kontroll: y før (%)", (360 / D1 - 1) * 100); vis("kontroll: y etter (%)", (360 / D2 - 1) * 100)

# ---------------------------------------------------------------- steg 4
print("\nd3-gjeld-4 · Senior and junior debt from two calls")
# Eksempel (egne tall): 100 mill. aksjer til 80 (V = 8 mrd.), senior 3 mrd., junior 2 mrd., ett år, r_f 2 %
N_, V = 0.1, 8.0
assert 50.80 > 80 - 30 / 1.02 and 33.30 > 80 - 50 / 1.02
cS = (50.80 + 51.20) / 2; cT = (33.30 + 33.70) / 2
DS = V - N_ * cS; E = N_ * cT; DJ = V - DS - E
vis("eks: C(30) mid", cS); vis("eks: C(50) mid", cT); vis("eks: D_S", DS); vis("eks: E", E); vis("eks: D_J", DJ)
vis("eks: y_J (%)", (2 / DJ - 1) * 100); vis("eks: y_S (%)", (3 / DS - 1) * 100); vis("eks: y alt (%)", (5 / (DS + DJ) - 1) * 100)
# Oppgave: 500 mill. aksjer til 90 (V = 45 mrd.), ingen gjeld; senior 20 mrd., junior 10 mrd.; 30 mnd; rf 3 %
N_, kurs, rf, T = 0.5, 90, 0.03, 30 / 12
V = N_ * kurs
FS, FJ = 20, 10
kS, kT = FS / N_, (FS + FJ) / N_
bidS, askS = 53.95, 54.35       # strike 40
bidT, askT = 37.60, 38.00       # strike 60
# Grenser: C ≥ S − PV(K)
vis("grense: S − PV(40)", kurs - kS / (1 + rf) ** T); vis("grense: S − PV(60)", kurs - kT / (1 + rf) ** T)
assert bidS > kurs - kS / (1 + rf) ** T and bidT > kurs - kT / (1 + rf) ** T
cS = (bidS + askS) / 2; cT = (bidT + askT) / 2
DS = V - N_ * cS; E = N_ * cT; DJ = V - DS - E
yJ = (FJ / DJ) ** (1 / T) - 1
yS = (FS / DS) ** (1 / T) - 1
yAll = ((FS + FJ) / (DS + DJ)) ** (1 / T) - 1
vis("opp: strike senior", kS); vis("opp: strike total", kT)
vis("opp: mid C(40)", cS); vis("opp: mid C(60)", cT)
vis("opp: D_S", DS); vis("opp: E", E); vis("opp: D_J", DJ); vis("opp: N(C40 − C60)", N_ * (cS - cT))
vis("FASIT y_J (%)", yJ * 100); vis("opp: y_S (%)", yS * 100); vis("opp: y alt (%)", yAll * 100)
vis("opp: PV(F_S)", FS / (1 + rf) ** T); vis("opp: PV(F_J)", FJ / (1 + rf) ** T)
assert DS < FS / (1 + rf) ** T and DJ < FJ / (1 + rf) ** T
f_ikke_aarlig = FJ / DJ - 1
f_snudd = (FJ / DJ) ** T - 1
DJ_ask = N_ * (askS - askT)   # brukte ask på begge
f_ask = (FJ / DJ_ask) ** (1 / T) - 1
DJ_bidask = N_ * (bidS - askT)   # bid på den ene, ask på den andre
f_bidask = (FJ / DJ_bidask) ** (1 / T) - 1
vis("feil: ikke årlig (%)", f_ikke_aarlig * 100); vis("feil: eksponent snudd (%)", f_snudd * 100)
vis("feil: alt sammen (%)", yAll * 100); vis("feil: ask (D_J)", DJ_ask); vis("feil: ask (%)", f_ask * 100)
vis("feil: bid/ask (D_J)", DJ_bidask); vis("feil: bid/ask (%)", f_bidask * 100)
DJ_rf = V - FS / (1 + rf) ** T - E   # behandlet seniorgjelden som risikofri
f_rf = (FJ / DJ_rf) ** (1 / T) - 1
vis("feil: senior risikofri (D_J)", DJ_rf); vis("feil: senior risikofri (%)", f_rf * 100)
ulike(yJ * 100, f_ikke_aarlig * 100, yAll * 100, f_rf * 100)
vis("kontroll: D_J vokst", DJ * (1 + yJ) ** T)

# ---------------------------------------------------------------- steg 5
print("\nd3-gjeld-5 · Coinsurance: who gains when two levered firms merge")
# Eksempel: A 30/12 skylder 18, B 10/26 skylder 14 (r_f = 0, like stater, risikonøytrale)
def fra(VA, FA):
    return [min(v, FA) for v in VA], [max(v - FA, 0) for v in VA]
def snitt(x):
    return sum(x) / len(x)
A, B = (30, 12), (10, 26)
dA, eA = fra(A, 18); dB, eB = fra(B, 14)
M = [a + b for a, b in zip(A, B)]
dM, eM = fra(M, 32)
vis("eks: D_A", snitt(dA)); vis("eks: E_A", snitt(eA)); vis("eks: D_B", snitt(dB)); vis("eks: E_B", snitt(eB))
vis("eks: D_M", snitt(dM)); vis("eks: E_M", snitt(eM))
vis("eks: kreditorgevinst", snitt(dM) - snitt(dA) - snitt(dB)); vis("eks: aksjonærtap", snitt(eM) - snitt(eA) - snitt(eB))
# Oppgave: A 40/10 skylder 24, B 8/26 skylder 16
A, B = (40, 10), (8, 26)
dA, eA = fra(A, 24); dB, eB = fra(B, 16)
M = [a + b for a, b in zip(A, B)]
dM, eM = fra(M, 40)
gev = snitt(dM) - snitt(dA) - snitt(dB)
tap = snitt(eM) - snitt(eA) - snitt(eB)
vis("opp: D_A", snitt(dA)); vis("opp: E_A", snitt(eA)); vis("opp: D_B", snitt(dB)); vis("opp: E_B", snitt(eB))
vis("opp: sammenslått", M[0]); vis("   ", M[1]); vis("opp: D_M", snitt(dM)); vis("opp: E_M", snitt(eM))
vis("FASIT kreditorgevinst", gev); vis("opp: aksjonærendring", tap)
f_snitt_forst = min(snitt(M), 40) - snitt(dA) - snitt(dB)   # snittet først, så min
vis("feil: snitt først", f_snitt_forst)
ulike(gev, tap, 0.0, f_snitt_forst, des=2)
vis("kontroll: gevinst + endring", gev + tap)
vis("kontroll: puts før", snitt([max(24 - v, 0) for v in A]) + snitt([max(16 - v, 0) for v in B]))
vis("kontroll: put etter", snitt([max(40 - v, 0) for v in M]))

# ---------------------------------------------------------------- steg 6
print("\nd3-gjeld-6 · Exam level: coinsurance, four groups (V2024 P4)")
# Eksempel: A 50/8 skylder 18, B 10/28 skylder 12 (fusjonert risikofri)
A, B = (50, 8), (10, 28)
dA, eA = fra(A, 18); dB, eB = fra(B, 12)
M = [a + b for a, b in zip(A, B)]
dM, eM = fra(M, 30)
vis("eks: D_A", snitt(dA)); vis("eks: E_A", snitt(eA)); vis("eks: D_B", snitt(dB)); vis("eks: E_B", snitt(eB))
vis("eks: M", M[0]); vis("   ", M[1]); vis("eks: D_M", snitt(dM)); vis("eks: E_M", snitt(eM))
andA = snitt(eA) / (snitt(eA) + snitt(eB))
vis("eks: andel A", andA); vis("eks: E_A etter", andA * snitt(eM)); vis("eks: E_B etter", (1 - andA) * snitt(eM))
vis("eks: endring kred A", 18 - snitt(dA)); vis("eks: endring kred B", 12 - snitt(dB))
vis("eks: endring aksj A", andA * snitt(eM) - snitt(eA)); vis("eks: endring aksj B", (1 - andA) * snitt(eM) - snitt(eB))
# Oppgave: A 52/10 skylder 22, B 10/40 skylder 16
A, B = (52, 10), (10, 40)
FA, FB = 22, 16
dA, eA = fra(A, FA); dB, eB = fra(B, FB)
M = [a + b for a, b in zip(A, B)]
dM, eM = fra(M, FA + FB)
DA, EA, DB, EB = snitt(dA), snitt(eA), snitt(dB), snitt(eB)
vis("opp: V_A", snitt(A)); vis("opp: D_A", DA); vis("opp: E_A", EA)
vis("opp: V_B", snitt(B)); vis("opp: D_B", DB); vis("opp: E_B", EB)
vis("opp: M", M[0]); vis("   ", M[1]); vis("opp: D_M", snitt(dM)); vis("opp: E_M", snitt(eM))
assert min(M) >= FA + FB   # gjelden blir risikofri
andA = EA / (EA + EB)
EA2, EB2 = andA * snitt(eM), (1 - andA) * snitt(eM)
endr = {"kred A": FA - DA, "kred B": FB - DB, "aksj A": EA2 - EA, "aksj B": EB2 - EB}
for n, v in endr.items():
    vis("FASIT " + n, v)
vis("kontroll: sum", sum(endr.values()))
# Feil: lik deling av egenkapitalen 50 : 50
vis("feil: aksj A ved 50:50", snitt(eM) / 2 - EA); vis("feil: aksj B ved 50:50", snitt(eM) / 2 - EB)
vis("feil: sum ved 50:50", FA - DA + FB - DB + snitt(eM) - EA - EB)
vis("kontroll: andel A", andA); vis("kontroll: E_A etter", EA2); vis("kontroll: E_B etter", EB2)
vis("kontroll: egenkapital før", EA + EB); vis("kontroll: egenkapital etter", snitt(eM))
vis("kontroll: V før", snitt(A) + snitt(B)); vis("kontroll: V etter", snitt(M))
