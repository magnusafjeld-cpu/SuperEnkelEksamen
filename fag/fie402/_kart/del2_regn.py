#!/usr/bin/env python3
"""FIE402 kartlegging del 2: regner ut hvert tall i del2.js og sjekker fila.

Hvert ledd har en liste med forventede tallstrenger, én per alternativ i samme
rekkefølge som i del2.js, og en fasitindeks. Riktig svar og hvert feilsvar
regnes fra sin egen (feil) formel. Til slutt lastes del2.js med node og
tallene, fasiten, rekkefølgen og strukturen sjekkes.

Kjør:  python3 fag/fie402/_kart/del2_regn.py
"""
import json
import math
import os
import re
import subprocess
from collections import Counter

HER = os.path.dirname(os.path.abspath(__file__))


def m2(x):  # penger, to desimaler
    return f"{x:,.2f}".replace(",", " ") if abs(x) >= 10000 else f"{x:.2f}"


def p2(x):  # rente i prosent, to desimaler
    return f"{100 * x:.2f}%"


def d4(x):
    return f"{x:.4f}"


def neg(s):  # minus som U+2212
    return s.replace("-", "−")


def close(a, b, tol=1e-9):
    assert abs(a - b) < tol, (a, b)


EXP = {}       # "1a" -> dict(opts=[...], ans=i, sortert=[floats] eller None)


def ledd(key, opts, ans, sortert=None):
    EXP[key] = dict(opts=opts, ans=ans, sortert=sortert)


# ---------------------------------------------------------------------------
# Case 1 · MM recap (no taxes)
N0, P0, D0, rf, rU = 50.0, 32.0, 400.0, 0.04, 0.08
E0 = N0 * P0                      # 1600
V = E0 + D0                       # 2000
FCF = rU * V                      # 160
close(FCF, 160)
dv = 0.45
D1 = dv * V                       # 900
Dnew = D1 - D0                    # 500
E1 = V - D1                       # 1100
close(D1, 900); close(Dnew, 500); close(E1, 1100)

# 1a: equity after the repurchase
rE_old = rU + (D0 / E0) * (rU - rf)           # 0.09
eq_cf1 = FCF - rf * D1                        # 124
a_ok = E1
a_oldrE = eq_cf1 / rE_old                     # 1377.78
a_rU = eq_cf1 / rU                            # 1550
a_addval = (V + Dnew) - D1                    # 1600
close(rE_old, 0.09)
v = [a_ok, a_oldrE, a_rU, a_addval]
ledd("1a", [m2(x) for x in v], 0, v)

# 1b: rE etter en HYPOTETISK rekapitalisering (D = E = 1000), så 1a ikke lekker
rE_new = rU + (D1 / E1) * (rU - rf)           # 0.112727 (bare i løsningen til 1a)
rUb, rDb, Db0, Eb0, Db, Eb = 0.09, 0.05, 200.0, 1300.0, 600.0, 900.0   # eget firma
close(Db0 + Eb0, Db + Eb)
b_ok = rUb + (Db / Eb) * (rUb - rDb)          # 0.116667
b_oldDE = rUb + (Db0 / Eb0) * (rUb - rDb)     # 0.0962
b_DV = rUb + (Db / (Db + Eb)) * (rUb - rDb)   # 0.106
b_norD = rUb + (Db / Eb) * rUb                # 0.15, glemte å trekke fra r_D
v = [b_oldDE, b_DV, b_ok, b_norD]
ledd("1b", [p2(x) for x in v], 2, v)

# 1c: price at announcement and after execution
n_rep = Dnew / P0                             # 15.625
N1 = N0 - n_rep                               # 34.375
c_ok = (P0, E1 / N1)                          # 32, 32
c_oldN = (P0, E1 / N0)                        # 32, 22
c_addval = ((E0 + Dnew) / N0,) * 2            # 42, 42
c_oldE = (P0, E0 / N1)                        # 32, 46.55
close(E1 / N1, 32.0)
v = [c_oldN, c_ok, c_addval, c_oldE]
def endring(a, b):
    ann = "Unchanged at announcement" if a == P0 else f"Rises by {m2(a - P0)} at announcement"
    if a != P0:
        return f"{ann}; stays there at execution"
    if b == a:
        return f"{ann}; unchanged at execution"
    return f"{ann}; {'rises' if b > a else 'falls'} by {m2(abs(b - a))} at execution"


ledd("1c", [endring(a, b) for a, b in v], 1, [b for _, b in v])

# 1d: eget firma (Hovden), så prisen 32.00 i 1c ikke lekker
Vh, Dh0, Nh, Ph, dvh = 3000.0, 600.0, 40.0, 60.0, 0.40
Eh0 = Vh - Dh0                                # 2400
close(Eh0 / Nh, Ph)
d_ok = (dvh * Vh - Dh0) / Ph                  # 10
d_DE = (dvh / (1 + dvh) * Vh - Dh0) / Ph      # 4.2857, D/E forvekslet med D/V
d_E0 = (dvh * Eh0 - Dh0) / Ph                 # 6.00, 40% av egenkapitalen
d_total = dvh * Vh / Ph                       # 20
v = [d_DE, d_E0, d_ok, d_total]
ledd("1d", [d4(x) + " million" for x in v], 2, v)

# 1e: tredje firma med egne tall
rUe, rDe, Pe, Ne0, De0, De1 = 0.10, 0.05, 35.0, 16.0, 112.0, 252.0
Ve = Ne0 * Pe + De0                           # 480
FCFe = rUe * Ve                               # 48
ne = (De1 - De0) / Pe                         # 4
Ne1 = Ne0 - ne                                # 12
Ee1 = Ve - De1                                # 300
rEe0 = rUe + De0 / (Ne0 * Pe) * (rUe - rDe)   # 0.11
rEe1 = rUe + De1 / Ee1 * (rUe - rDe)          # 0.13
dps_before = (FCFe - rDe * De0) / Ne0         # 2.75
dps_after = (FCFe - rDe * De1) / Ne1          # 3.25
close(dps_before / rEe0, Pe); close(dps_after / rEe1, Pe)
hold_oldN = Ee1 / Ne0                         # 18.75
hold_rU = dps_after / rUe                     # 32.50
rise = dps_after / dps_before - 1             # 18.18%
ledd("1e", [m2(hold_oldN), f"{100 * rise:.2f}%", m2(hold_rU), f"{dps_after:.2f}/{rEe1:.2f} = {m2(Pe)}"], 3)
print(f"  1e: V {Ve} FCF {FCFe} n {ne} E1 {Ee1} rE {rEe0:.4f}->{rEe1:.4f} DPS {dps_before:.4f}->{dps_after:.4f}")

# ---------------------------------------------------------------------------
# Case 2 · taxes, permanent debt
VU, N2, tc, rD2, D2, rU2 = 1500.0, 60.0, 0.22, 0.05, 400.0, 0.10
P20 = VU / N2                                 # 25
TS = tc * rD2 * D2                            # 4.40
v = [TS / (1 + rD2), TS, (1 - tc) * rD2 * D2, rD2 * D2]   # 88.00 fjernet: ga 2b
ledd("2a", [m2(x) for x in v], 1, v)

VL = VU + tc * D2                             # 1588
v = [VU + TS / (1 + rD2), VU + TS / rU2, VL, VU + D2]
ledd("2b", [m2(x) for x in v], 2, v)

PVTS = 120.0                                  # hypotetisk, så 2b (88) ikke lekker
P21 = (VU + PVTS) / N2                        # 27.00
c_sub = (VU + PVTS - D2) / N2                 # 19.80
n_stale = D2 / P20                            # 16
c_post = P20 + PVTS / (N2 - n_stale)          # 27.73
v = [c_sub, P20, P21, c_post]
ledd("2c", [m2(x) for x in v], 2, v)
n_new = D2 / P21                              # 14.8148 (til løsningsteksten)
E_after = VU + PVTS - D2                      # 1220
close(E_after / (N2 - n_new), P21, 1e-9)

D2d = 250.0                                   # eget lån, så 2a (4.40) ikke lekker
TSd = tc * rD2 * D2d                          # 2.75
pv1 = TSd / (1 + rD2)                         # 2.6190
v = [TSd / (1 + rU2), pv1, TSd, tc * D2d]
ledd("2d", [m2(x) for x in v], 1, v)

# ---------------------------------------------------------------------------
# Case 3 · distress costs and trade-off
Hi, Lo, rho3, rf3, K3, loss = 300.0, 120.0, 0.5, 0.05, 150.0, 0.20
VU3 = (rho3 * Hi + (1 - rho3) * Lo) / (1 + rf3)          # 200
burn = loss * Lo                                         # 24
cred_bad = Lo - burn                                     # 96
D3 = (rho3 * K3 + (1 - rho3) * cred_bad) / (1 + rf3)     # 117.1429
E3 = rho3 * (Hi - K3) / (1 + rf3)                        # 71.4286
VL3 = D3 + E3
pvfd = (1 - rho3) * burn / (1 + rf3)                     # 11.4286
close(VU3 - VL3, pvfd)
a_undisc = (1 - rho3) * burn                             # 12.00
a_short = (1 - rho3) * (K3 - cred_bad) / (1 + rf3)       # 25.71
v = [0.0, pvfd, a_undisc, a_short]
ledd("3a", [m2(x) for x in v], 1, v)

VU3b, tc3, te, ti = 800.0, 0.22, 0.25, 0.35
tstar = 1 - (1 - tc3) * (1 - te) / (1 - ti)              # 0.10
close(tstar, 0.10)
Ds = [0, 100, 200, 300, 400, 500]
FD = [0, 4, 12, 26, 46, 72]


def optimum(tax):
    """Marginalregel: øk gjelden så lenge ekstra skatteskjold > ekstra PV(FD)."""
    k = 0
    while k + 1 < len(Ds) and tax * (Ds[k + 1] - Ds[k]) > FD[k + 1] - FD[k]:
        k += 1
    return Ds[k], VU3b + tax * Ds[k] - FD[k]


d_ok, v_ok = optimum(tstar)                              # 200, 808
d_tc, v_tc = optimum(tc3)                                # 400, 842
# nivåfeil: største D der tau*·D fortsatt er større enn PV(FD)
k_lvl = max(i for i in range(len(Ds)) if tstar * Ds[i] >= FD[i] and i > 0)
d_lvl, v_lvl = Ds[k_lvl], VU3b + tstar * Ds[k_lvl] - FD[k_lvl]   # 300, 804
d_nofd, v_nofd = Ds[-1], VU3b + tstar * Ds[-1]           # 500, 850
assert (d_ok, d_lvl, d_tc, d_nofd) == (200, 300, 400, 500)
VLs = [VU3b + tstar * d - f for d, f in zip(Ds, FD)]
assert max(VLs) == v_ok
v = [(d_ok, v_ok), (d_lvl, v_lvl), (d_tc, v_tc), (d_nofd, v_nofd)]
ledd("3b", [f"D* = {d}, V<sup>L</sup> = {m2(x)}" for d, x in v], 0, [d for d, _ in v])
ledd("3c", [None, None, None, None], 3)

# ---------------------------------------------------------------------------
# Case 4 · risk shifting
pb, rf4, K4 = 0.6, 0.05, 100.0
S = (150.0, 110.0); R = (190.0, 40.0)


def ev(x, p=pb):
    return p * x[0] + (1 - p) * x[1]


def eq(x, K, p=pb):
    return ev((max(x[0] - K, 0), max(x[1] - K, 0)), p)


def de(x, K, p=pb):
    return ev((min(x[0], K), min(x[1], K)), p)


VS, VR = ev(S) / (1 + rf4), ev(R) / (1 + rf4)
ES, ER = eq(S, K4) / (1 + rf4), eq(R, K4) / (1 + rf4)
DS, DR = de(S, K4) / (1 + rf4), de(R, K4) / (1 + rf4)
close(DS + ES, VS); close(DR + ER, VR)
a_nolim = ev((R[0] - K4, R[1] - K4)) / (1 + rf4)         # 28.57
a_swap = eq(R, K4, 1 - pb) / (1 + rf4)                   # 34.29
a_half = eq(R, K4, 0.5) / (1 + rf4)                      # 42.86
v = [a_nolim, a_swap, a_half, ER]
ledd("4a", [m2(x) for x in v], 3, v)
# 4b: hypotetisk K = 90, så 4a (51.43) og 4c (V_S − V_R) ikke lekker
Kb = 90.0
ESb, ERb = eq(S, Kb) / (1 + rf4), eq(R, Kb) / (1 + rf4)  # 41.90, 57.14
assert ERb > ESb
ledd("4b", ["firm value", "creditors would lose", "residual claimants", f"({m2(ERb)} against {m2(ESb)})"], 3)
ag = VS - VR                                             # 3.81
v = [ag, ev(S) - ev(R), ER - ES, DS - DR]
ledd("4c", [m2(x) for x in v], 0, v)


def kstar(p):
    # 40 < K <= 110: S betaler i begge tilstander, R misligholder i bust
    # E_S = ev(S) - K, E_R = p(190 - K)  =>  K = (ev(S) - p*190)/(1 - p)
    return (ev(S, p) - p * R[0]) / (1 - p)


K_ok = kstar(pb)                                         # 50
K_half = kstar(0.5)                                      # 70
close(K_ok, 50); close(K_half, 70)
assert R[1] < K_ok <= S[1] and R[1] < K_half <= S[1]
close(eq(S, K_ok), eq(R, K_ok))
v = [R[1], K_ok, K_half, S[1]]
ledd("4d", [f"{x:.2f}" for x in v], 1, v)

# ---------------------------------------------------------------------------
# Case 5 · debt overhang
K5, bad, good, pg, rf5, I5, add = 120.0, 60.0, 200.0, 0.6, 0.04, 30.0, 40.0


def claims(K, cfb, cfg):
    d = ((1 - pg) * min(cfb, K) + pg * min(cfg, K)) / (1 + rf5)
    e = ((1 - pg) * max(cfb - K, 0) + pg * max(cfg - K, 0)) / (1 + rf5)
    return d, e


D50, E50 = claims(K5, bad, good)                         # 92.3077, 46.1538
D51, E51 = claims(K5, bad + add, good + add)             # 107.6923, 69.2308
NPV5 = add / (1 + rf5) - I5                              # 8.4615
gS = E51 - E50 - I5                                      # -6.9231
gC = D51 - D50                                           # 15.3846
close(gS + gC, NPV5)
und_S = (E51 - E50) * (1 + rf5) - I5                     # -6.00
v = [gS, und_S, NPV5, E51 - E50]
ledd("5a", [neg(m2(x)) if x < 0 else m2(x) for x in v], 0, v)
half = 0.5 * add / (1 + rf5)                             # 19.23, like sannsynligheter
allpv = add / (1 + rf5)                                  # 38.46, hele PV til kreditorene
v = [gC, (D51 - D50) * (1 + rf5), half, allpv]
ledd("5b", [m2(x) for x in v], 0, v)

# 5c: intervall for K1
floor_ok = D50 * (1 + rf5)                               # 96 (trygg gjeld: K1 <= 100)
assert floor_ok <= bad + add
# aksjonærenes tak: K1 >= 100 => E = pg(240-K1)/(1+rf) - I >= E50
ceil_ok = (good + add) - (E50 * (1 + rf5) + I5 * (1 + rf5)) / pg   # 108
close(ceil_ok, 108)
ceil_noI = min((good + add) - (E50 * (1 + rf5)) / pg, K5)          # 160 -> 120
floor_mv = D50                                                     # 92.31
floor_int = (floor_ok - (1 - pg) * (bad + add)) / pg               # 93.33
v = [(floor_mv, ceil_ok), (floor_int, ceil_ok), (floor_ok, ceil_ok), (floor_ok, ceil_noI)]
ledd("5c", [f"{m2(a)} to {m2(b)}" for a, b in v], 2, [a + b / 1000 for a, b in v])

# 5d: K1 = 104
K1 = 104.0
Dk, Ek = claims(K1, bad + add, good + add)
cg, sg = Dk - D50, Ek - E50 - I5                         # 6.1538, 2.3077
close(cg + sg, NPV5)
und = (cg * (1 + rf5), (Ek - E50) * (1 + rf5) - I5)      # 6.40, 3.60
bench = (Dk - D51, Ek - E51)                             # −9.23, 9.23: feil referanse
Dh = (0.5 * min(bad + add, K1) + 0.5 * K1) / (1 + rf5)
Eh = 0.5 * (good + add - K1) / (1 + rf5)
half5 = (Dh - D50, Eh - E50 - I5)                        # 5.77, −10.77
v = [bench, half5, (cg, sg), und]
fmt = lambda x: neg(m2(x)) if x < 0 else m2(x)
ledd("5d", [f"creditors {fmt(a)}, shareholders {fmt(b)}" for a, b in v], 2,
     [a + b / 1000 for a, b in v])
# ingen tall i riktig par skal gå igjen i et feilpar (skjæringspunkt-triks)
riktig = {m2(abs(cg)), m2(abs(sg))}
assert all(not ({m2(abs(a)), m2(abs(b))} & riktig) for a, b in [bench, half5, und])

# ---------------------------------------------------------------------------
# Case 6 · Myers-Majluf
VH, VLo, q, I6, NPV6 = 300.0, 120.0, 0.45, 80.0, 20.0
EV = q * VH + (1 - q) * VLo                              # 201
alpha = I6 / (EV + I6 + NPV6)                            # 0.2658
a_swapq = I6 / ((1 - q) * VH + q * VLo + I6 + NPV6)      # 0.2508
a_noNPV = I6 / (EV + I6)                                 # 0.2847
a_noI = I6 / (EV + NPV6)                                 # 0.3620
v = [a_swapq, alpha, a_noNPV, a_noI]
ledd("6a", [d4(x) for x in v], 1, v)

payH = (1 - alpha) * (VH + I6 + NPV6)                    # 293.69
dilH = alpha * (VH - EV)                                 # 26.31
close(VH + NPV6 - dilH, payH)
pay_belief = (1 - alpha) * (EV + I6 + NPV6)              # 221.00
assert payH < VH
# 6b: hypotetisk q = 0.60, så 6a (0.2658) ikke lekker; her utsteder høy type
qb = 0.60
EVb = qb * VH + (1 - qb) * VLo                           # 228
ab = I6 / (EVb + I6 + NPV6)                              # 0.2439
payHb = (1 - ab) * (VH + I6 + NPV6)                      # 302.44
dilHb = ab * (VH - EVb)                                  # 17.56
close(VH + NPV6 - dilHb, payHb)
assert payHb > VH
ab_noI = I6 / (EVb + NPV6)                               # 0.3226
payHb_noI = (1 - ab_noI) * (VH + I6 + NPV6)              # 270.97
ledd("6b", [f"{d4(1 - ab)} × 400 = {m2(payHb)}", None, f"{m2(payHb)} is below", f"{d4(ab_noI)}"], 0)
print(f"  6b: alpha {ab:.6f} dil {dilHb:.4f} noI {ab_noI:.6f} {payHb_noI:.4f}")

a_sep = I6 / (VLo + I6 + NPV6)                           # 0.3636
low_sep = (1 - a_sep) * (VLo + I6 + NPV6)                # 140
high_sep = (1 - a_sep) * (VH + I6 + NPV6)                # 254.55
a_sep_noI = I6 / (VLo + NPV6)                            # 0.5714
close(low_sep, VLo + NPV6)
assert low_sep > VLo and high_sep < VH
low_noI = (1 - a_sep_noI) * (VLo + I6 + NPV6)            # 94.29
assert low_noI < VLo
ledd("6c", [None, None, f"{d4(a_sep_noI)}: the low type would keep {d4(1 - a_sep_noI)} × 220 = {m2(low_noI)}", d4(a_sep)], 3)
# 6d: eget tilfelle q = 0.30, NPV = 25 (separering), så 6c ikke lekker
qd, NPVd = 0.30, 25.0
EVd = qd * VH + (1 - qd) * VLo                           # 174
assert I6 / (EVd + I6 + NPVd) * (VH - EVd) > NPVd        # høy type utsteder ikke
asd = I6 / (VLo + I6 + NPVd)
assert (1 - asd) * (VLo + I6 + NPVd) > VLo and (1 - asd) * (VH + I6 + NPVd) < VH
loss6 = qd * NPVd                                        # 7.50
ledd("6d", [None, m2(NPVd), None, m2(loss6)], 3)
# pooling-sjekk (til løsningsteksten): hvis begge utsteder, taper H og L vinner
lossH = alpha * (VH - EV); gainL = alpha * (EV - VLo)
close(q * lossH, (1 - q) * gainL)

# ---------------------------------------------------------------------------
# Case 7 · IPO
Nn, Poff, spr, oth, Pcl = 8.0, 45.0, 0.07, 6.0, 54.0
gross = Nn * Poff                                        # 360
net = gross * (1 - spr) - oth                            # 328.80
mlot = Nn * (Pcl - Poff)                                 # 72
v = [net - mlot, net, gross * (1 - spr), gross - oth]
ledd("7a", [m2(x) for x in v], 1, v)
cost_tot = Nn * Pcl - net                                # 103.20
close(cost_tot, gross * spr + oth + mlot)

pG, vG, vB, aG, aB = 0.4, 60.0, 40.0, 200.0, 1000.0
P_ok = (pG * aG * vG + (1 - pG) * aB * vB) / (pG * aG + (1 - pG) * aB)   # 42.35
P_noprob = (aG * vG + aB * vB) / (aG + aB)                              # 43.33
P_uncond = pG * vG + (1 - pG) * vB                                      # 48.00
P_rev = (pG * aB * vG + (1 - pG) * aG * vB) / (pG * aB + (1 - pG) * aG)  # 55.38
close(pG * aG * (vG - P_ok) + (1 - pG) * aB * (vB - P_ok), 0, 1e-7)
v = [P_ok, P_noprob, P_uncond, P_rev]
ledd("7b", [m2(x) for x in v], 0, v)
up_avg = pG * (vG - P_ok) / P_ok + (1 - pG) * (vB - P_ok) / P_ok        # målt underprising

# ---------------------------------------------------------------------------
# Case 8 · payout
Pc, Dv, td, tg = 80.0, 6.0, 0.25, 0.15
drop = Dv * (1 - td) / (1 - tg)                          # 5.2941
tdstar = (td - tg) / (1 - tg)                            # 0.1176
v = [Pc - Dv, Pc - Dv * (1 - (td - tg)), Pc - drop, Pc - Dv * (1 - td)]
ledd("8a", [m2(x) for x in v], 2, v)

N8, P8, cash8, sh = 20.0, 50.0, 200.0, 2000
dps8 = cash8 / N8                                        # 10
pex8 = P8 - dps8                                         # 40
n8 = cash8 / P8                                          # 4
w_div = sh * pex8 + sh * dps8                            # 100 000
w_rep = sh * (N8 * P8 - cash8) / (N8 - n8)               # 100 000
close(w_div, w_rep)
w_nocash = sh * pex8                                     # 80 000
w_nodrop = sh * P8 + sh * dps8                           # 120 000
w_noout = sh * (N8 * P8) / (N8 - n8)                     # 125 000
v = [w_nocash, w_div, w_nodrop, w_noout]
ledd("8b", [f"{x:,.0f}" for x in v], 1, v)
ledd("8c", [None, None, None, None], 3)

# ---------------------------------------------------------------------------
# Utskrift
print("Nøkkeltall")
print(f"  1: rE_old {rE_old:.6f}  rE_new {rE_new:.6f}  n {n_rep}  N1 {N1}  DPS {dps_before:.4f} -> {dps_after:.4f} ({100*rise:.2f}%)")
print(f"  2: TS {TS:.4f}  VL {VL:.2f}  P1 {P21:.6f}  n {n_new:.4f}  pv1 {pv1:.6f}")
print(f"  3: VU {VU3:.4f}  D {D3:.4f}  E {E3:.4f}  PV(FD) {pvfd:.4f}  tau* {tstar:.4f}  VLs {VLs}")
print(f"  4: VS {VS:.4f} VR {VR:.4f} ES {ES:.4f} ER {ER:.4f} DS {DS:.4f} DR {DR:.4f}")
print(f"  5: D0 {D50:.4f} E0 {E50:.4f} D1 {D51:.4f} E1 {E51:.4f} NPV {NPV5:.4f} gS {gS:.4f} gC {gC:.4f} K104: {cg:.4f} {sg:.4f}")
print(f"  6: EV {EV} alpha {alpha:.6f} payH {payH:.4f} dil {dilH:.4f} a_sep {a_sep:.6f} high_sep {high_sep:.4f} lossH {lossH:.4f} gainL {gainL:.4f}")
print(f"  7: net {net:.2f} mlot {mlot:.2f} cost {cost_tot:.2f} P_ok {P_ok:.4f} avg underpricing {100*up_avg:.2f}%")
print(f"  8: drop {drop:.4f} tdstar {tdstar:.4f}")
for k, e in EXP.items():
    print(f"  {k}: {e['opts']}  fasit {'ABCD'[e['ans']]}")

# ---------------------------------------------------------------------------
# Sjekk mot del2.js
js = os.path.join(HER, "del2.js")
if not os.path.exists(js):
    print("\ndel2.js finnes ikke ennå, hopper over sjekken")
    raise SystemExit(0)
node = "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.EDU_KART.del2))"
data = json.loads(subprocess.check_output(["node", "-e", node, js]))

tema_forventet = {"mm": 5, "skatt": 4, "tradeoff": 3, "risikoskift": 4, "overheng": 4,
                  "myers": 4, "emisjon": 2, "utbytte": 3}
tema = Counter()
pos = Counter()
antall = 0
assert data["id"] == "kart2" and data["kind"] == "kartlegging" and data["del"] == 2
for ex in data["exercises"]:
    assert ex["points"] == len(ex["parts"]), ex["n"]
    for p in ex["parts"]:
        key = f"{ex['n']}{p['label']}"
        e = EXP[key]
        antall += 1
        tema[p["tema"]] += 1
        pos["ABCD"[p["answer"]]] += 1
        assert p["points"] == 1, key
        assert len(p["options"]) == 4 and len(p["diag"]) == 4, key
        assert p["answer"] == e["ans"], (key, p["answer"], e["ans"])
        for i, (opt, s) in enumerate(zip(p["options"], e["opts"])):
            if s is not None:
                assert s in opt, f"{key} alternativ {'ABCD'[i]}: fant ikke «{s}» i «{opt}»"
        for i, d in enumerate(p["diag"]):
            if i == p["answer"]:
                assert d is None, key
            else:
                assert d and "—" not in d and ", og " not in d, (key, d)
                assert len(d.split()) < 20, (key, len(d.split()), d)
        if e["sortert"] is not None:
            assert e["sortert"] == sorted(e["sortert"]), f"{key} er ikke i stigende rekkefølge"
        for felt in [p["body"], p["solution"], *p["options"]]:
            assert "—" not in felt, (key, "tankestrek")
            assert ", and " not in felt, (key, "komma før and", felt[:80])
            rest = re.sub(r"</?(p|b|i|sub|sup|table|tr|th|td|br)( class='[a-z]+')?>", "", felt)
            assert "<" not in rest and ">" not in rest, (key, "rå < eller >")
    for felt in [ex["body"]]:
        rest = re.sub(r"</?(p|b|i|sub|sup|table|tr|th|td|br)( class='[a-z]+')?>", "", felt)
        assert "<" not in rest and ">" not in rest and "—" not in felt, ex["n"]
assert antall == data["points"] == 29, antall
assert dict(tema) == tema_forventet, dict(tema)
for k in "ABCD":
    assert 0.20 <= pos[k] / antall <= 0.30, (k, pos[k])
print(f"\nOK: {antall} ledd, tema {dict(tema)}, fasitposisjon {dict(sorted(pos.items()))}")

# Lekkasjesjekk: hele delen vises samtidig, så tall i et riktig alternativ skal
# ikke stå noe annet sted (samme regel som tools/sjekk-lekkasje.js). Tillatt:
# inndata som tilfeldigvis er like, listet med begrunnelse.
TILLATT = {
    "3b": {"200"},                      # D* = 200; 200 er også gjeld/kontanter i andre caser
    "4d": {"50.00"},                    # K* = 50; 50.00 er aksjekursen i case 8
    "6b": {"300", "400"},               # V_H = 300 og V_H + I + NPV = 400 er inndata
    "6c": {"120", "300", "300."},       # V_L og V_H er inndata ("300." er punktum i setningen)
    "8b": {"2000", "40.00", "800", "50.00"},  # inndata og mellomregning i 8b selv
}


def ren(h):
    return re.sub(r"&[a-z]+;", " ", re.sub(r"<[^>]+>", " ", h or ""))


def tall(t):
    ut = [x.replace(",", "") for x in re.findall(r"\d[\d,]*\.?\d*", ren(t))]
    return [x for x in ut if len(re.sub(r"\D", "", x)) >= 3]


steder = []
for ex in data["exercises"]:
    steder.append((f"{ex['n']} ", ex["body"]))
    for p in ex["parts"]:
        steder.append((f"{ex['n']}{p['label']} ", p["body"]))
        steder += [(f"{ex['n']}{p['label']} ", o) for i, o in enumerate(p["options"]) if i != p["answer"]]
lekk = []
for ex in data["exercises"]:
    for p in ex["parts"]:
        key = f"{ex['n']}{p['label']}"
        for x in tall(p["options"][p["answer"]]):
            if x in TILLATT.get(key, set()):
                continue
            for hvor, t in steder:
                if not hvor.startswith(key + " ") and x in tall(t):
                    lekk.append(f"{key}: {x} står i {hvor.strip()}")
assert not lekk, lekk
print("Lekkasjesjekk OK (tillatte inndata-treff: "
      + ", ".join(f"{k} {sorted(v)}" for k, v in TILLATT.items()) + ")")
