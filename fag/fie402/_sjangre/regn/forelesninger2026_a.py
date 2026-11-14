#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i de nye stegene fra forelesningene 2026 (stigene 01, 02, 03, 06, 09).

Hvert steg har eksempelet (kursets egne tall der det passer), oppgaven med nye tall,
fasiten, hvert feilsvar fra én navngitt feil og kontrollen. Skriptet stopper med
AssertionError hvis et feilsvar faller sammen med fasiten eller kontrollen ikke går opp.

    python3 fag/fie402/_sjangre/regn/forelesninger2026_a.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} {verdi:.{des}f}")


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=2):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def annuitet(r, T):
    return (1 - (1 + r) ** -T) / r


# =====================================================================
# 01 TVILLING
# =====================================================================
steg("tvilling-15 · Net debt in the weights")
# Eksempel: PS2 E7 (H&M), s2.pdf s. 3
E, D, cash, ops = 100 * 12, 400, 150, 50
Dn = D - (cash - ops)
bU = E / (E + Dn) * 1.25
vis("eks: D netto", Dn, 2); vis("eks: beta_U", bU); vis("eks: r_U %", (0.04 + bU * 0.06) * 100)
# Forelesning 7 lysbilde 19: D = 320 − 20 = 300, E = 300, rwacc = 0.068
vis("eks: lecture 7 rwacc", 0.5 * 0.10 + 0.5 * 0.6 * 0.06)
# Oppgave
N, P, D, cash, ops, bE, rf, prem = 15, 80, 500, 200, 50, 1.24, 0.03, 0.06
E = N * P
exc = cash - ops
Dn = D - exc
bU = E / (E + Dn) * bE
rU = rf + bU * prem
vis("E", E, 2); vis("excess cash", exc, 2); vis("net debt", Dn, 2); vis("V", E + Dn, 2)
vis("beta_U (fasit)", bU, 6); vis("r_U FASIT %", rU * 100)
f1 = rf + E / (E + D) * bE * prem               # ignorerte kontantene
f2 = rf + E / (E + D - cash) * bE * prem        # trakk fra all kontant, også driftskontanten
f3 = rf + E / (E + D + exc) * bE * prem         # la overskuddskassen til gjelden
vis("feil: ingen kontantjustering", f1 * 100); vis("  beta", E / (E + D) * bE, 6)
vis("feil: all kontant trukket fra", f2 * 100); vis("  beta", E / (E + D - cash) * bE, 6)
vis("feil: kassen lagt til gjelden", f3 * 100); vis("  beta", E / (E + D + exc) * bE, 6)
ulike(rU * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
# kontroll: relever med netto gjeld gir beta_E tilbake
assert isclose(bU * (1 + Dn / E), bE)
vis("kontroll: beta_U(1 + Dnet/E)", bU * (1 + Dn / E), 6)

steg("tvilling-16 · Several twins")
# Eksempel: forelesning 8 lysbilde 12
r1 = 0.6 * 0.12 + 0.4 * 0.06
r2 = 0.75 * 0.107 + 0.25 * 0.055
vis("eks: comp 1 r_U %", r1 * 100); vis("eks: comp 2 r_U %", r2 * 100)
vis("eks: snitt %", (r1 + r2) / 2 * 100); vis("eks: 2/3-1/3 %", (2 / 3 * r1 + 1 / 3 * r2) * 100)
# Oppgave: A nær (avstand 2), B fjern (avstand 6), vekter ~ 1/avstand
rA = 0.8 * 0.10 + 0.2 * 0.045          # D/E = 0.25 -> D/V = 0.20
rB = 0.7 * 0.115 + 0.3 * 0.05
wA = (1 / 2) / (1 / 2 + 1 / 6); wB = 1 - wA
fas = wA * rA + wB * rB
vis("r_U A %", rA * 100); vis("r_U B %", rB * 100); vis("wA", wA); vis("wB", wB)
vis("FASIT %", fas * 100)
f1 = (rA + rB) / 2                       # like vekter
f2 = wB * rA + wA * rB                   # vekter etter avstand, ikke 1/avstand
rA_feil = 0.75 * 0.10 + 0.25 * 0.045     # D/E brukt som D/V for A
f3 = wA * rA_feil + wB * rB
vis("feil: like vekter", f1 * 100); vis("feil: vekter snudd", f2 * 100)
vis("feil: D/E som D/V for A, rA", rA_feil * 100); vis("feil: D/E som D/V", f3 * 100)
f4 = wA * 0.10 + wB * 0.115             # snitt av r_E (erstatter f3 i oppgaven etter kontrollen)
vis("feil: snitt av r_E", f4 * 100)
ulike(fas * 100, f1 * 100, f2 * 100, f3 * 100, f4 * 100, des=4)
# kontroll: snittet ligger mellom de to, nærmest A
assert rA < fas < rB and fas - rA < rB - fas
# beta-ruten: rf 3 %, premie 6 %
bA = (rA - 0.03) / 0.06; bB = (rB - 0.03) / 0.06
vis("kontroll: beta_U A", bA, 6); vis("kontroll: beta_U B", bB, 6)
vis("kontroll: vektet beta", wA * bA + wB * bB, 6); vis("kontroll: r_U via beta %", (0.03 + (wA * bA + wB * bB) * 0.06) * 100)

# =====================================================================
# 02 MM
# =====================================================================
steg("mm-15 · The founder's stake")
# Eksempel: forelesning 2 s. 3–11
EV = 0.5 * 3.15 + 0.5 * 1.05
V = EV / 1.2
vis("eks: E[CF]", EV); vis("eks: V", V); vis("eks: NPV", V - 1)
vis("eks: andel investorer (1.2/2.1)", 1.2 / 2.1); vis("eks: gründer 3/7 V", 3 / 7 * V)
vis("eks: gründer gjeld E = V − D", V - 1); vis("eks: forventet til gründer", 0.5 * (3.15 - 1.05))
vis("eks: implisitt r_E", 1.05 / 0.75 - 1)
# Oppgave
I, hi, lo, rU, rf = 2.0, 4.4, 2.2, 0.10, 0.04
EV = 0.5 * hi + 0.5 * lo
V = EV / (1 + rU)
NPV = V - I
face = I * (1 + rf)
assert lo >= face  # gjelden er risikofri
fas = V - I
eksp = EV - face
vis("E[CF]", EV); vis("V", V); vis("NPV", NPV); vis("face", face); vis("forventet til gründer", eksp)
vis("FASIT (E = V − D)", fas)
f1 = eksp / (1 + rU)        # diskonterte gründerens strøm med r_U
f2 = eksp                   # glemte å diskontere
f3 = V - face               # trakk pålydende (dato 1) fra dagens verdi (tatt ut etter kontrollen)
f4 = eksp / (1 + rf)        # diskonterte gründerens strøm med r_f
vis("feil: r_f på gründerens strøm", f4)
vis("feil: r_U på gründerens strøm", f1); vis("feil: udiskontert", f2); vis("feil: V − pålydende", f3)
ulike(fas, f1, f2, f3, des=4)
alpha = I * (1 + rU) / EV
vis("kontroll: alpha ved EK", alpha); vis("kontroll: gründer (1 − alpha)V", (1 - alpha) * V)
vis("kontroll: implisitt r_E", eksp / fas - 1)
rE = rU + (I / fas) * (rU - rf)
vis("kontroll: MM II r_E", rE)
assert isclose((1 - alpha) * V, fas) and isclose(rE, eksp / fas - 1)

steg("mm-16 · A dividend financed with new shares")
# Eksempel: forelesning 5 s. 9–12
V1, X, N = 10.0, 0.5, 0.1  # mill.
P1 = (V1 - X) / N
vis("eks: P1", P1, 2); vis("eks: P0", (P1 + 15) / 1.1, 2); vis("eks: nye aksjer (tusen)", X / P1 * 1000, 2)
# Oppgave
FCF, r, N = 6.0, 0.12, 2.0
V = FCF / r
P0 = V / N
div = 10.0
X = div - FCF
P1 = (V - X) / N
n = X / P1
DPS = div / N
vis("V", V, 2); vis("P0", P0, 2); vis("X ekstra", X, 2); vis("P1 FASIT", P1, 4); vis("n nye (mill.)", n, 6)
vis("DPS", DPS, 2)
f1 = V / N                                   # nye aksjer tar ingen del av framtiden
f2 = P0 - DPS                                # trakk hele det nye utbyttet fra 25
# nye aksjonærer får også utbyttet: emisjon før utbyttet til cum-kurs
Pcum = P0 + FCF / N
n2 = X / Pcum
DPS2 = div / (N + n2)
f3 = Pcum - DPS2
vis("feil: V/N", f1); vis("feil: 25 − 5", f2); vis("feil: nye får utbyttet, ex-kurs", f3); vis("  n2", n2, 6); vis("  DPS2", DPS2, 6)
ulike(P1, f1, f2, f3, des=2)
vis("kontroll: P0 = (DPS + P1)/(1+r)", (DPS + P1) / (1 + r), 4)
andel = N / (N + n)
vis("kontroll: gamle andel", andel, 6); vis("kontroll: framtidig DPS gamle", FCF * andel / N, 6)
vis("kontroll: P0 via strøm", (DPS + FCF * andel / N / r) / (1 + r), 4)
assert isclose((DPS + P1) / (1 + r), P0)

steg("mm-19 · Bank capital requirements")
rU_eks = 0.03 * 0.25 + 0.97 * 0.05
vis("eks: r_U", rU_eks); vis("eks: bankers' claim", 0.06 * 0.25 + 0.94 * 0.05)
vis("eks: ny r_E", rU_eks + (0.94 / 0.06) * (rU_eks - 0.05))
EV0, rE0, rD, EV1 = 0.04, 0.20, 0.045, 0.08
rU = EV0 * rE0 + (1 - EV0) * rD
rE1 = rU + ((1 - EV1) / EV1) * (rU - rD)
vis("r_U", rU * 100); vis("r_E FASIT %", rE1 * 100)
f1 = rE0                                  # r_E uendret
f2 = rU + (1 - EV1) * (rU - rD)           # D/V i MM II
f3 = rE0 / 2                              # halverte r_E når EK dobles
vis("feil: uendret", f1 * 100); vis("feil: D/V i MM II", f2 * 100); vis("feil: halvert", f3 * 100)
vis("bankers' funding cost", (EV1 * rE0 + (1 - EV1) * rD) * 100)
ulike(rE1 * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
vis("kontroll: ny pre-tax WACC %", (EV1 * rE1 + (1 - EV1) * rD) * 100)
assert isclose(EV1 * rE1 + (1 - EV1) * rD, rU)
vis("kontroll: premie før %", (rE0 - rU) * 100); vis("kontroll: premie etter %", (rE1 - rU) * 100)

steg("mm-17 · The EPS fallacy")
# Eksempel: forelesning 2 s. 24
vis("eks: EPS etter", (10 - 0.08 * 15) / 8); vis("eks: break-even EBIT", 1.2 * 10 / 2)
# Yerba (tutorial E1): 1.5, 14, 40 %, 5 %
p = 1.5 * 14; vis("yerba: P", p); vis("yerba: EPS ny", (1.5 - 0.05 * 0.4 * p) / 0.6); vis("yerba: P/E ny", p / ((1.5 - 0.05 * 0.4 * p) / 0.6))
# Oppgave
N, P, earn, andel, rD = 50, 30, 120, 0.30, 0.04
E = N * P
D = andel * E
n = D / P
int_ = rD * D
eps0 = earn / N
eps1 = (earn - int_) / (N - n)
pe1 = P / eps1
vis("D", D, 2); vis("n", n, 2); vis("renter", int_, 2); vis("EPS0", eps0); vis("EPS1", eps1, 6); vis("P/E FASIT", pe1)
f1 = P / (earn / (N - n))       # glemte rentene
f2 = P / ((earn - int_) / N)    # glemte at aksjene blir færre
f3 = P / eps0                   # P/E uendret
vis("feil: glemte renter", f1); vis("feil: glemte tilbakekjøpet", f2); vis("feil: P/E uendret", f3)
ulike(pe1, f1, f2, f3, des=4)
be = int_ * N / n  # EBIT/N = (EBIT − int)/(N − n)
vis("kontroll: break-even inntjening (mill.)", be, 2); vis("kontroll: break-even EPS", be / N, 4)
vis("kontroll: E/N etter", (N * P - D) / (N - n), 2)
assert isclose((N * P - D) / (N - n), P)

steg("mm-18 · Distress costs and fire sales: the buyback price")
# Eksempel: wrap-up-forelesningen (D6): gjeld 30, eiendeler 80/15, konkurs gir halvparten; like sannsynlige (antatt)
Du = 0.5 * 30 + 0.5 * 15; Df = 0.5 * 30 + 0.5 * 7.5; Ew = 0.5 * 50
vis("eks: D uten brannsalg", Du, 2); vis("eks: D med brannsalg", Df, 2); vis("eks: E", Ew, 2)
vis("eks: VU", 0.5 * 80 + 0.5 * 15, 2); vis("eks: VL", Df + Ew, 2); vis("eks: kostnad", 0.5 * 7.5, 2)
# Eksempel: tutorial E5
vals = [150, 135, 95, 80]
VU = sum(vals) / 4 / 1.05
Dg = sum(min(v, 100) if v >= 100 else 0.75 * v for v in vals) / 4 / 1.05
Eg = sum(max(v - 100, 0) for v in vals) / 4 / 1.05
vis("eks: VU", VU); vis("eks: D", Dg); vis("eks: E", Eg); vis("eks: VL", Dg + Eg); vis("eks: PV(kost)", VU - Dg - Eg)
vis("eks: P uten", VU / 10); vis("eks: P etter", (Dg + Eg) / 10); vis("eks: n", Dg / ((Dg + Eg) / 10))
vis("eks: YTM", 100 / Dg - 1); vis("eks: E[r_D]", sum(min(v, 100) if v >= 100 else 0.75 * v for v in vals) / 4 / Dg - 1)
# Oppgave
vals, rf, K, kost, N = [200, 140, 80, 60], 0.04, 90, 0.20, 10
VU = sum(vals) / 4 / (1 + rf)
dpay = [K if v >= K else (1 - kost) * v for v in vals]
epay = [max(v - K, 0) for v in vals]
Dv = sum(dpay) / 4 / (1 + rf)
Ev = sum(epay) / 4 / (1 + rf)
VL = Dv + Ev
fas = VL / N
n = Dv / fas
vis("VU", VU); vis("debt payoffs", sum(dpay), 2); vis("D", Dv); vis("E", Ev); vis("VL", VL)
vis("PV(kost)", VU - VL); vis("PV(kost) direkte", sum(v - d - e for v, d, e in zip(vals, dpay, epay)) / 4 / (1 + rf))
vis("P FASIT", fas); vis("n", n); vis("P = E/(N − n)", Ev / (N - n))
vis("YTM", K / Dv - 1); vis("E[r_D]", sum(dpay) / 4 / Dv - 1)
f1 = VU / N                       # ignorerte konkurskostnadene
f2 = Ev / N                       # glemte tilbakekjøpet
f3 = (Ev + K / (1 + rf)) / N      # priset gjelden som risikofri
vis("feil: VU/N", f1); vis("feil: E/N", f2); vis("feil: risikofri gjeld", f3)
ulike(fas, f1, f2, f3, des=2)
assert isclose(Ev / (N - n), fas)
vis("kontroll: fall per aksje", f1 - fas); vis("kontroll: PV(kost)/N", (VU - VL) / N)
vis("kontroll: gjenværende aksjer", N - n); vis("kontroll: E[betaling]/D − 1", sum(dpay) / 4 / Dv - 1)

# =====================================================================
# 03 WACC-APV
# =====================================================================
steg("wacc-apv-15 · Tax shield on an interest-only loan")
vis("eks: A(10; 5 %)", annuitet(0.05, 10), 6); vis("eks: PV hovedstol", 2000 / 1.05 ** 10, 2)
vis("eks: DFB", 35 * annuitet(0.05, 10), 2); vis("eks: DFB sjekk", 0.35 * (2000 - 2000 / 1.05 ** 10), 2)
D, rD, T, tau, rU = 600, 0.06, 8, 0.22, 0.10
TS = tau * rD * D
A = annuitet(rD, T)
fas = TS * A
vis("TS per år", TS); vis("annuitetsfaktor", A, 6); vis("PV(TS) FASIT", fas)
f1 = tau * D                 # evig snarvei
f2 = TS * T                  # udiskontert
f3 = TS * annuitet(rU, T)    # diskontert med r_U (tatt ut etter kontrollen)
f4 = TS * A * (1 + rD)       # annuitet forfallsdag
vis("feil: annuitet forfallsdag", f4)
vis("feil: tau D", f1); vis("feil: udiskontert", f2); vis("feil: r_U", f3); vis("  A(10 %)", annuitet(rU, T), 6)
ulike(fas, f1, f2, f3, des=2)
pv_hoved = D / (1 + rD) ** T
vis("kontroll: PV hovedstol", pv_hoved); vis("kontroll: tau(D − PV hovedstol)", tau * (D - pv_hoved))
assert isclose(tau * (D - pv_hoved), fas)

steg("wacc-apv-16 · Permanent debt: APV and the WACC check")
VU = 2 / 0.11; VL = VU + 0.25 * 12
vis("eks: VU", VU); vis("eks: VL", VL); vis("eks: rwacc %", 0.11 * (1 - 0.25 * 12 / VL) * 100); vis("eks: FCF/VL %", 2 / VL * 100)
FCF, rU, D, tau, rD = 9.0, 0.12, 40.0, 0.22, 0.05
VU = FCF / rU
VL = VU + tau * D
fas = rU * (1 - tau * D / VL)
vis("VU", VU); vis("PV(TS)", tau * D); vis("VL", VL); vis("rwacc FASIT %", fas * 100); vis("FCF/VL %", FCF / VL * 100)
f1 = rU - D / VL * tau * rD               # konstant-D/V-formelen
f2 = rU * (1 - tau * D / VU)              # D/V^U i stedet for D/V^L
VL3 = VU + tau * rD * D / rU              # skjoldet diskontert med r_U
f3 = FCF / VL3
vis("feil: rU − (D/V) tau rD", f1 * 100); vis("feil: D/VU", f2 * 100); vis("feil: VL med skjold til rU", VL3); vis("feil: rwacc da", f3 * 100)
ulike(fas * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
E = VL - D
rE = (FCF - rD * (1 - tau) * D) / E
wacc = E / VL * rE + D / VL * rD * (1 - tau)
vis("kontroll: E", E); vis("kontroll: r_E %", rE * 100); vis("kontroll: lærebok-WACC %", wacc * 100)
vis("  E/V rE", E / VL * rE * 100, 6); vis("  D/V rD(1−tau)", D / VL * rD * (1 - tau) * 100, 6)
assert isclose(wacc, fas)
vis("kontroll: FCF/rwacc", FCF / fas)
vis("kontroll: verdi med snarveien", FCF / f1)

steg("wacc-apv-17 · Unlevering with D(1 − tau) weights under fixed debt")
E, D, tau, rE, rD = 360, 300, 0.20, 0.12, 0.05
vis("eks: r_U %", (E * rE + D * (1 - tau) * rD) / (E + D * (1 - tau)) * 100)
vis("eks: standard %", (E * rE + D * rD) / (E + D) * 100)
E, D, tau, rE, rD = 600, 400, 0.25, 0.11, 0.04
fas = (E * rE + D * (1 - tau) * rD) / (E + D * (1 - tau))
vis("D(1−tau)", D * (1 - tau), 2); vis("teller", E * rE + D * (1 - tau) * rD); vis("r_U FASIT %", fas * 100)
f1 = (E * rE + D * rD) / (E + D)                 # kursets standardvekter
f2 = (E * rE + D * (1 - tau) * rD) / (E + D)     # etter-skatt-WACC
f3 = (E * rE + D * (1 - tau) * rD * (1 - tau)) / (E + D * (1 - tau))   # skattefaktoren på både vekt og rente
vis("feil: standard", f1 * 100); vis("feil: etter-skatt WACC", f2 * 100); vis("feil: skatt to ganger", f3 * 100)
ulike(fas * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
FCF = E * rE + D * rD * (1 - tau)
VU = E + D - tau * D
vis("kontroll: FCF", FCF); vis("kontroll: VU", VU); vis("kontroll: FCF/VU %", FCF / VU * 100)
assert isclose(FCF / VU, fas)
# MM II med skatt: r_E = r_U + (D/E)(1 − tau)(r_U − r_D)
vis("kontroll: MM II m/skatt %", (fas + D / E * (1 - tau) * (fas - rD)) * 100)
assert isclose(fas + D / E * (1 - tau) * (fas - rD), rE)

steg("wacc-apv-18 · Constant interest coverage")
VU = 2.5 / 0.06; VL = VU * (1 + 0.4 * 0.2)
vis("eks: VU", VU); vis("eks: VL", VL); vis("eks: D", 0.2 * 2.5 / 0.05); vis("eks: d", 10 / VL)
vis("eks: rwacc %", (0.10 - 10 / VL * 0.4 * 0.05) * 100)
FCF, g, rU, tau, k, rD = 6.0, 0.02, 0.095, 0.22, 0.25, 0.05
VU = FCF / (rU - g)
fas = VU * (1 + tau * k)
vis("VU", VU); vis("PV(TS)", tau * k * VU); vis("VL FASIT", fas)
f1 = VU + tau * k * FCF / (rD - g)        # skjoldet diskontert med r_D
f2 = FCF / rU * (1 + tau * k)             # glemte veksten
Dg = k * FCF / rD
f3 = VU + tau * Dg                        # permanent-snarveien tau D
f4 = VU * (1 + k)                         # glemte skattesatsen
vis("feil: uten tau", f4)
vis("feil: skjold til rD", f1); vis("feil: ingen vekst", f2); vis("feil: tau D (D)", Dg); vis("feil: tau D", f3)
ulike(fas, f1, f2, f3, des=2)
d = Dg / fas
wacc = rU - d * tau * rD
vis("kontroll: D", Dg); vis("kontroll: d", d, 6); vis("kontroll: rwacc", wacc, 6); vis("kontroll: VL via WACC", FCF / (wacc - g))
assert isclose(FCF / (wacc - g), fas)

steg("wacc-apv-19 · Debt capacity and financing the project")
d, PV, I, cashb = 0.5, 61.25, 28, 20
vis("eks: kapasitet", d * PV); vis("eks: ny gjeld", d * PV - cashb); vis("eks: utbetalt", d * PV - I)
vis("eks: EK opp", (1 - d) * PV); vis("eks: sum", (1 - d) * PV + d * PV - I)
d, PV, I, cashb = 0.40, 120, 40, 15
cap = d * PV
ny = cap - cashb
fas = cap - I
NPV = PV - I
vis("kapasitet", cap, 2); vis("ny gjeld", ny, 2); vis("utbetaling FASIT", fas, 2); vis("NPV", NPV, 2)
f1 = cap + cashb - I        # lånte hele kapasiteten og brukte også kassen
f2 = d * NPV - I            # kapasitet regnet på NPV
f3 = ny                     # oppga den nye gjelden
vis("feil: lån + kasse", f1, 2); vis("feil: d × NPV", f2, 2); vis("feil: ny gjeld", f3, 2)
ulike(fas, f1, f2, f3, des=2)
vis("kontroll: EK opp (1 − d)PV", (1 - d) * PV, 2); vis("kontroll: gevinst", (1 - d) * PV + fas, 2)
assert isclose((1 - d) * PV + fas, NPV)

steg("wacc-apv-20 · Flow to equity")
fcfe = (2000 - 250) * 0.6 + 150
vis("eks: FCFE", fcfe, 2); vis("eks: E", fcfe / (0.15 - 0.03), 2)
EBIT, tau, g, D0, rD, rE = 500, 0.25, 0.02, 1500, 0.04, 0.11
FCF = EBIT * (1 - tau)
IP = rD * D0
NB = g * D0
fcfe = FCF - (1 - tau) * IP + NB
fas = fcfe / (rE - g)
vis("FCF", FCF, 2); vis("renter", IP, 2); vis("netto lån", NB, 2); vis("FCFE", fcfe, 2); vis("E FASIT", fas, 2)
f1 = (fcfe - NB) / (rE - g)             # glemte netto låneopptak
f2 = (FCF - IP + NB) / (rE - g)         # trakk full rente, uten skattefradrag
f3 = FCF / (rE - g)                     # FCF i stedet for FCFE
vis("feil: uten netto lån", f1, 2); vis("feil: rente før skatt", f2, 2); vis("feil: FCF med r_E", f3, 2)
ulike(fas, f1, f2, f3, des=2)
VL = fas + D0
wacc = fas / VL * rE + D0 / VL * rD * (1 - tau)
vis("kontroll: VL", VL, 2); vis("kontroll: rwacc", wacc, 6); vis("kontroll: FCF/(rwacc − g)", FCF / (wacc - g), 2)
vis("  E/V rE", fas / VL * rE, 6); vis("  D/V rD(1−tau)", D0 / VL * rD * (1 - tau), 6)
assert isclose(FCF / (wacc - g), VL)
# kontrollen feiler hvis netto lån glemmes
Vf = f1 + D0
wf = f1 / Vf * rE + D0 / Vf * rD * (1 - tau)
vis("kontroll feiler: VL ved glemt NB", Vf, 2); vis("kontroll feiler: rwacc", wf, 6); vis("kontroll feiler: FCF/(rwacc − g)", FCF / (wf - g), 2)
# APV: r_U fra vektene
rUi = (fas * rE + D0 * rD) / VL
vis("APV: r_U", rUi, 6); vis("APV: VU", FCF / (rUi - g), 2); vis("APV: PV(TS)", tau * IP / (rUi - g), 2)
assert isclose(FCF / (rUi - g) + tau * IP / (rUi - g), VL)

steg("mm-20 · Stop the dividend and buy back")
# Eksempel: PS1 E13 (Genron): 20 mill. kontanter, 10 mill. aksjer, 4.80 i evig utbytte, 12 %
cum = 2 + 4.80 / 0.12
vis("eks: cum", cum, 2); vis("eks: tilbakekjøpte (mill.)", 20 / cum, 4); vis("eks: DPS etter", 48 / (10 - 20 / cum), 4)
vis("eks: pris etter", 48 / (10 - 20 / cum) / 0.12, 2)
N, ops, cash = 10, 500, 40
Pcum = (ops + cash) / N
n = cash / Pcum
fas = ops / (N - n)
vis("cum-kurs", Pcum, 2); vis("n (mill.)", n, 6); vis("pris etter FASIT", fas, 2)
vis("feil: ex-kurs", ops / N, 2); vis("feil: kassen blir igjen", (ops + cash) / (N - n), 2)
nf = cash / (ops / N); vis("feil: kjøpt til 50, n", nf, 4); vis("feil: kjøpt til 50, pris", ops / (N - nf), 2); vis("  gevinst", (ops + cash) / (N - n) - Pcum, 2)
vis("kontroll: utbytte-ruten", ops / N + cash / N, 2)
assert isclose(fas, Pcum)

steg("wacc-apv-21 · Three methods, three rates")
d, rE, rD, tau = 0.40, 0.13, 0.05, 0.25
rU = (1 - d) * rE + d * rD
wacc = (1 - d) * rE + d * rD * (1 - tau)
vis("r_U %", rU * 100); vis("r_wacc FASIT %", wacc * 100); vis("gap", (rU - wacc) * 100); vis("d tau rD", d * tau * rD * 100)
assert isclose(rU - wacc, d * tau * rD)
vis("feil: skatt på hele WACC %", rU * (1 - tau) * 100)

steg("wacc-apv-22 · Working capital comes back at the end")
# Eksempel
vis("eks: FCF år 0", -60 - 10, 2)
vis("eks: FCF år 1", (50 - 30) * 0.75 + 30 - 5, 2)
vis("eks: FCF år 2", (50 - 30) * 0.75 + 30 + 15, 2)
EBITDA, dep, capex, tau, nwc_for, nwc_etter, renter = 90, 30, 0, 0.25, 24, 0, 8
dnwc = nwc_etter - nwc_for
fas = (EBITDA - dep) * (1 - tau) + dep - capex - dnwc
vis("EBIT", EBITDA - dep, 2); vis("NOPAT", (EBITDA - dep) * (1 - tau), 2); vis("ΔNWC", dnwc, 2); vis("FCF FASIT", fas, 2)
f1 = (EBITDA - dep) * (1 - tau) + dep - capex          # glemte frigjøringen
f2 = (EBITDA - dep) * (1 - tau) + dep - capex + dnwc   # fortegnsfeil: trakk frigjøringen fra
f3 = (EBITDA - dep - renter) * (1 - tau) + dep - capex - dnwc   # trakk renter fra
vis("feil: uten frigjøring", f1, 2); vis("feil: fortegn", f2, 2); vis("feil: renter trukket fra", f3, 2)
ulike(fas, f1, f2, f3, des=2)
alt = EBITDA * (1 - tau) + tau * dep - capex - dnwc
vis("kontroll: EBITDA(1 − tau) + tau Dep − ΔNWC", alt, 2)
assert isclose(alt, fas)

# =====================================================================
# 06 AGENT
# =====================================================================
steg("agent-15 · Gambling for resurrection")
vis("eks: D etter", 0.5 * 1000 + 0.5 * 300, 0); vis("eks: E etter", 0.5 * 300, 0)
A, K, hi, lo = 600, 750, 1000, 150
D0, E0 = min(A, K), max(A - K, 0)
D1 = 0.5 * min(hi, K) + 0.5 * min(lo, K)
E1 = 0.5 * max(hi - K, 0) + 0.5 * max(lo - K, 0)
V1 = 0.5 * hi + 0.5 * lo
fas = D0 - D1
vis("D før", D0, 2); vis("D etter", D1, 2); vis("E etter", E1, 2); vis("V etter", V1, 2)
vis("kreditortap FASIT", fas, 2)
f1 = A - V1          # verdien som forsvinner
f2 = E1 - E0         # aksjonærenes gevinst
f3 = K - D1          # målt mot pålydende
vis("feil: tapt verdi", f1, 2); vis("feil: EK gevinst", f2, 2); vis("feil: mot pålydende", f3, 2)
ulike(fas, f1, f2, f3, des=2)
assert isclose(-fas + (E1 - E0), V1 - A)

steg("agent-16 · Overhang when new shareholders fund the project")
x = 24 / (0.5 * (180 - 100)); vis("eks: x", x); vis("eks: eier", (1 - x) * 40)
x2 = 24 / (0.5 * (180 - 80)); vis("eks: x ved 80", x2); vis("eks: eier ved 80", (1 - x2) * 50)
hi, lo, K, I, add = 200, 60, 120, 30, 40
E0 = 0.5 * max(hi - K, 0) + 0.5 * max(lo - K, 0)
D0 = 0.5 * min(hi, K) + 0.5 * min(lo, K)
E1 = 0.5 * max(hi + add - K, 0) + 0.5 * max(lo + add - K, 0)
D1 = 0.5 * min(hi + add, K) + 0.5 * min(lo + add, K)
x = I / E1
eier = (1 - x) * E1
vis("E0", E0, 2); vis("D0", D0, 2); vis("E1", E1, 2); vis("D1", D1, 2); vis("NPV", add - I, 2)
vis("x FASIT", x); vis("eier", eier, 2)
V1 = 0.5 * (hi + add) + 0.5 * (lo + add)
xf1 = I / V1; vis("feil: x på firmaverdien", xf1, 6); vis("  eier", (1 - xf1) * E1, 4)
xf2 = I / (hi + add - K); vis("feil: x på boom-EK (tatt ut)", xf2, 6); vis("  eier", (1 - xf2) * E1, 4)
xf3 = I / (E0 + I); vis("feil: x på E0 + I", xf3, 6); vis("  eier", (1 - xf3) * E1, 4)
assert isclose(eier, E1 - I)
vis("kontroll: kreditorer +", D1 - D0, 2); vis("kontroll: eier", eier - E0, 2); vis("kontroll: sum", D1 - D0 + eier - E0, 2)
assert isclose(D1 - D0 + eier - E0, add - I)

steg("agent-17 · Spin-off that moves the debt")
# Eksempel: PS1 E8 (Hillton)
vis("eks: D på Nicole", 0.5 * 100 + 0.5 * 40, 0); vis("eks: E", 0.5 * 40 + 0.5 * 120 + 0.5 * 60, 0)
X, Y, K, s = (160, 40), (120, 80), 120, 10
comb = (X[0] + Y[0], X[1] + Y[1])
E0 = 0.5 * max(comb[0] - K, 0) + 0.5 * max(comb[1] - K, 0)
D0 = 0.5 * min(comb[0], K) + 0.5 * min(comb[1], K)
Xs = (X[0] - s, X[1] - s); Ys = (Y[0] - s, Y[1] - s)
def deling(m, u):
    d = 0.5 * min(m[0], K) + 0.5 * min(m[1], K)
    e = 0.5 * max(m[0] - K, 0) + 0.5 * max(m[1] - K, 0) + 0.5 * u[0] + 0.5 * u[1]
    return d, e
DX, EX = deling(Xs, Ys)
DY, EY = deling(Ys, Xs)
vis("før: D", D0, 2); vis("før: E", E0, 2)
vis("gjeld på X: D", DX, 2); vis("gjeld på X: E", EX, 2); vis("gjeld på Y: D", DY, 2); vis("gjeld på Y: E", EY, 2)
fas = EX - E0
vis("EK-gevinst FASIT", fas, 2)
f1 = -(4 * s / 2)                     # synergitapet som aksjonærenes tap
f2 = EY - E0                          # gjelden på feil divisjon
f3 = D0 - DX                          # kreditortapet som aksjonærgevinst
vis("feil: synergitap", f1, 2); vis("feil: gjeld på Y", f2, 2); vis("feil: kreditortapet", f3, 2)
ulike(fas, f1, f2, f3, des=2)
dV = (DX + EX) - (D0 + E0)
vis("kontroll: endring V", dV, 2); vis("kontroll: sum", (DX - D0) + fas, 2)
assert isclose((DX - D0) + fas, dV)

# =====================================================================
# 09 MYERS
# =====================================================================
steg("myers-15 · From alpha to the number of new shares")
a = 10 / 50; vis("eks: alpha", a); vis("eks: n", a * 1000 / (1 - a), 2); vis("eks: pris", 50000 / 1250, 2)
a2 = 10 / 100; vis("eks: C alpha", a2); vis("eks: C n", a2 * 1000 / (1 - a2), 2); vis("eks: C pris", 100000 / 1111, 2)
V, I, NPV, N = 380, 60, 20, 40
alpha = I / (V + I + NPV)
n = alpha * N / (1 - alpha)
vis("alpha", alpha, 6); vis("n FASIT", n); vis("pris før", (V + NPV) / N); vis("pris etter", (V + I + NPV) / (N + n))
f1 = alpha * N                         # alpha ganget med gamle aksjer
f2 = I / (V / N)                       # priset aksjene uten NPV
af = I / (V + NPV)
f3 = af * N / (1 - af)                 # kontantene utenfor nevneren
vis("feil: alpha N", f1); vis("feil: I/(V/N)", f2); vis("feil: alpha uten I", af, 6); vis("feil: n da", f3)
ulike(n, f1, f2, f3, des=4)
assert isclose(n / (N + n), alpha) and isclose(n * (V + NPV) / N, I)

steg("myers-16 · IPO arithmetic")
vis("eks: proveny", 5 * 20 * 0.93, 2); vis("eks: V", 15 * 50, 2); vis("eks: fair", (750 - 93) / 10, 2); vis("eks: kost", ((750 - 93) / 10 - 50) * 10, 2)
N, n, Pipo, s, P1 = 20, 8, 15, 0.07, 24
pro = n * Pipo * (1 - s)
V = (N + n) * P1
fair = (V - pro) / N
fas = (fair - P1) * N
vis("proveny", pro, 2); vis("V", V, 2); vis("fair", fair, 2); vis("kost FASIT", fas, 2)
f1 = n * (P1 - Pipo)            # bare underprisingen
f2 = (fair - Pipo) * N          # IPO-pris i stedet for første dags kurs
f3 = s * n * Pipo               # bare spreaden
vis("feil: underprising", f1, 2); vis("feil: IPO-pris", f2, 2); vis("feil: spread", f3, 2)
ulike(fas, f1, f2, f3, des=2)
vis("kontroll: underprising + spread", f1 + f3, 2)
assert isclose(f1 + f3, fas)
nf = pro / fair
vis("kontroll: aksjer ved fair pris", nf, 4); vis("kontroll: V/(N + nf)", V / (N + nf), 4)

steg("myers-17 · The winner's curse")
r100 = (10 * 20 + 50 * (-20)) / (10 * 100 + 50 * 100)
vis("eks: avkastning ved 100", r100); vis("eks: break-even", (10 * 120 + 50 * 80) / 60, 2)
X = (10 * 120 + 50 * 80) / 60
vis("eks: snitt dag 1", 0.5 * (120 / X - 1) + 0.5 * (80 / X - 1)); vis("eks: god", 120 / X - 1); vis("eks: dårlig", 80 / X - 1)
hi, lo, sg, sb = 125, 75, 25, 50
fas = (sg * hi + sb * lo) / (sg + sb)
vis("break-even FASIT", fas, 4)
r_at100 = (sg * (hi - 100) + sb * (lo - 100)) / ((sg + sb) * 100)
vis("avkastning ved 100", r_at100, 6)
f1 = 0.5 * hi + 0.5 * lo                      # ignorerte rasjoneringen
f2 = (sb * hi + sg * lo) / (sg + sb)          # rasjoneringen snudd
f3 = lo                                       # bare dårlige emisjoner
vis("feil: forventning", f1, 2); vis("feil: snudd", f2, 4); vis("feil: lav verdi", f3, 2)
ulike(fas, f1, f2, f3, des=2)
snitt = 0.5 * (hi / fas - 1) + 0.5 * (lo / fas - 1)
vis("kontroll: gevinst gode", sg * (hi - fas), 4); vis("kontroll: tap dårlige", sb * (lo - fas), 4)
vis("kontroll: uinformert", sg * (hi - fas) + sb * (lo - fas), 6); vis("kontroll: snitt dag 1", snitt, 6)
vis("kontroll: god dag 1", hi / fas - 1, 6); vis("kontroll: dårlig dag 1", lo / fas - 1, 6)
assert isclose(sg * (hi - fas) + sb * (lo - fas), 0, abs_tol=1e-9)
print("\nAlle kontroller gikk opp.")
