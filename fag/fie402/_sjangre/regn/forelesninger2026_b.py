#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i de nye stegene fra forelesningene 2026 (stigene 04, 05, 07, 08).

Hvert steg har eksempelet (kursets egne tall der det passer), oppgaven med nye tall,
fasiten, hvert feilsvar fra én navngitt feil og kontrollen. Skriptet stopper med
AssertionError hvis et feilsvar faller sammen med fasiten eller kontrollen ikke går opp.

    python3 fag/fie402/_sjangre/regn/forelesninger2026_b.py
"""
from math import isclose


def vis(navn, verdi, des=4):
    print(f"  {navn:<58} " + f"{verdi:,.{des}f}".replace(",", " "))


def steg(tittel):
    print("\n" + tittel)


def ulike(fasit, *feil, des=2):
    r = [round(fasit, des)] + [round(f, des) for f in feil]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def A(r, T):
    """Annuitetsfaktor, første betaling om én periode."""
    return (1 - (1 + r) ** -T) / r


# =====================================================================
# 04 REALOPSJON
# =====================================================================
steg("Kilde: lecture_11 s. 16, butikken (månedsrente og nedleggelse)")
rm = 1.07 ** (1 / 12) - 1
vis("månedsrente 7 % (eksakt)", rm, 6)
rmk = 0.00565
vis("NPV uten exit (lysbildet, 0.565 %)", 2000 / rmk - 400000, 0)
vis("god", 6000 / rmk - 400000, 0)
vis("dårlig", -2000 * A(rmk, 24) - 400000, 0)
npv_exit = 0.5 * (6000 / rmk - 400000) + 0.5 * (-2000 * A(rmk, 24) - 400000)
vis("med exit (lysbildet 108588)", npv_exit, 0)
vis("med eksakt månedsrente", 0.5 * (6000 / rm - 400000) + 0.5 * (-2000 * A(rm, 24) - 400000), 0)

steg("realopsjon-15 · Monthly rate, monthly perpetuity and annuity")
# Eksempel: Kurbatovs 7 % og 2 000 i måneden
vis("eks: r_m 7 %", rm * 100, 4)
vis("eks: 2000 evig per mnd", 2000 / rm, 0)
vis("eks: 2000 i 24 mnd", 2000 * A(rm, 24), 0)
vis("eks: A(24, r_m)", A(rm, 24), 4)
# Oppgave: årlig 9 %, 3 000 i måneden i 36 måneder
r_aar, C, n = 0.09, 3000, 36
rm9 = 1.09 ** (1 / 12) - 1
fas = C * A(rm9, n)
vis("r_m 9 %", rm9 * 100, 6); vis("A(36, r_m)", A(rm9, n), 6)
vis("FASIT PV", fas, 2)
f1 = C * A(r_aar / 12, n)           # r/12
f2 = C * 12 * A(r_aar, 3)           # årlig annuitet på 36 000, betalt ved årsslutt
f3 = C / rm9                        # evigrente
vis("feil: r/12", f1, 2); vis("feil: årlige beløp", f2, 2); vis("feil: evigrente", f3, 2)
ulike(fas, f1, f2, f3)
# kontroll: (1 + r_m)^12 = 1.09; PV mellom årlig-ved-årsslutt og udiskontert sum
assert isclose((1 + rm9) ** 12, 1.09)
assert f2 < fas < C * n
vis("kontroll: udiskontert sum", C * n, 2)

steg("realopsjon-16 · Indifference probability (PS3 E9(c))")
# Eksempel: PS3 E9, I = 250, r = 10 %, rettssak p, halvparten forbud, 100 eller 50
I, r = 250, 0.10
now = 50 / r - I
for p in (0.1, 0.3):
    wait = (p / 2 * (100 / r - I) + (1 - p) * (50 / r - I)) / (1 + r)
    vis(f"eks: vent, p = {p}", wait, 4)
pstar = r * (50 / r - I) / (I / 2)
vis("eks: NPV nå", now, 2); vis("eks: p*", pstar, 4)
# Oppgave: I = 400, r = 5 %, kjennelse med p; gunstig 25 % (CF 440), forbud 75 % (CF 0); ingen kjennelse 110
I, r, q, H, M = 400, 0.05, 0.25, 440, 110
assert isclose(q * H, M)  # forventet CF uavhengig av p
now = M / r - I
fav = H / r - I
nor = M / r - I
vis("NPV nå", now, 2); vis("NPV1 gunstig", fav, 2); vis("NPV1 ingen kjennelse", nor, 2)
# (p q fav + (1 − p) nor)/(1 + r) = now
p_fas = ((1 + r) * now - nor) / (q * fav - nor)
vis("FASIT p*", p_fas, 4)
wait = lambda p: (p * q * fav + (1 - p) * nor) / (1 + r)
assert isclose(wait(p_fas), now)
f1 = ((1 + r) ** 2 * now - nor) / (q * fav - nor)        # diskonterte ventingen to ganger
f2 = (now - nor) / (q * fav - nor)                       # glemte å diskontere ventingen
f3 = r * now / I                                          # regnet besparelsen I i hver kjennelse
vis("feil: diskontert to ganger", f1); vis("feil: ikke diskontert", f2); vis("feil: hver kjennelse et forbud", f3)
ulike(p_fas, f1, f2, f3, des=4)
vis("kontroll: vent p = 0.20", wait(0.20), 4); vis("kontroll: vent p = 0.40", wait(0.40), 4)
vis("kontroll: sparing p(1−q)I", p_fas * (1 - q) * I, 2); vis("kontroll: tapt år r·NPV", r * now, 2)
vis("kontroll: q·fav", q * fav, 2)

steg("realopsjon-17 · Staged financing")
# Eksempel: forelesning 11 s. 12, tavle s. 3
vis("eks: alt på én gang", -100 + 0.1 * 800, 2)
vis("eks: trinnvis", 0.1 * 700 + 0.4 * (-100) + 0.5 * (-10), 2)
vis("eks: tilbakerulling", -10 + 0.5 * (-90 + 0.2 * 800), 2)
# Oppgave: 60 i alt, IPO 360, samlet 15 %; trinn 1 koster 12 (30 %), trinn 2 koster 48 (50 %)
I1, I2, pv, p1, p2 = 12, 48, 360, 0.30, 0.50
once = -(I1 + I2) + p1 * p2 * pv
node = -I2 + p2 * pv
fas = -I1 + p1 * max(node, 0)
vis("alt på én gang", once, 2); vis("node etter trinn 1", node, 2); vis("FASIT trinnvis", fas, 2)
f1 = once                                          # betalte trinn 2 uansett
f2 = p1 * p2 * (pv - I1 - I2) + (1 - p1) * (-I1)   # glemte grenen der trinn 1 lykkes og trinn 2 feiler
f3 = -I1 + p1 * (-I2 + p1 * p2 * pv)               # samlet sannsynlighet i noden
vis("feil: alt på én gang", f1, 2); vis("feil: glemt gren", f2, 2); vis("feil: samlet p i noden", f3, 2)
ulike(fas, f1, f2, f3)
tre = p1 * p2 * (pv - I1 - I2) + p1 * (1 - p2) * (-I1 - I2) + (1 - p1) * (-I1)
assert isclose(tre, fas)
vis("kontroll: tre utfall", tre, 2); vis("kontroll: sparing (1−p1)·I2", (1 - p1) * I2, 2)
assert isclose(fas - once, (1 - p1) * I2)

steg("realopsjon-18 · Exam level: abandonment with monthly cash flows (D12)")
# Oppgave: oppsett 700, drift 25/mnd, inntekt 16 eller 40 (50/50), 6 % årlig, exit etter 24 mnd
I, cost, lo, hi, r_aar, n = 700, 25, 16, 40, 0.06, 24
rm6 = 1.06 ** (1 / 12) - 1
good = (hi - cost) / rm6 - I
bad_forever = (lo - cost) / rm6 - I
bad_exit = (lo - cost) * A(rm6, n) - I
without = 0.5 * good + 0.5 * bad_forever
withx = 0.5 * good + 0.5 * bad_exit
vis("r_m 6 %", rm6 * 100, 6); vis("1/r_m", 1 / rm6, 4); vis("A(24, r_m)", A(rm6, n), 6)
vis("NPV god", good, 2); vis("NPV dårlig uten exit", bad_forever, 2); vis("NPV dårlig med exit", bad_exit, 2)
vis("E[NPV] uten exit", without, 2); vis("E[NPV] med exit", withx, 2)
fas = max(0, withx) - max(0, without)
vis("FASIT opsjonsverdi", fas, 2)
f1 = withx - without                       # sammenlignet med den negative verdien
rm_s = r_aar / 12
withx_s = 0.5 * ((hi - cost) / rm_s - I) + 0.5 * ((lo - cost) * A(rm_s, n) - I)
f2 = withx_s                               # r/12 som månedsrente
withx_a = 0.5 * ((hi - cost) * 12 / r_aar - I) + 0.5 * ((lo - cost) * 12 * A(r_aar, 2) - I)
f3 = withx_a                               # årlige beløp og årsrente
vis("feil: mot negativ verdi", f1, 2); vis("feil: r/12", f2, 2); vis("feil: årlig", f3, 2)
ulike(fas, f1, f2, f3)
tail = 0.5 * (cost - lo) / rm6 / (1 + rm6) ** n
vis("kontroll: halen etter 24 mnd", tail, 2)
assert isclose(withx - without, tail)
assert without < 0 < withx

steg("realopsjon-8 (rettet) · eksempelet og oppgaven")
vis("eks uten exit", 0.5 * (15 - 5) / 0.10 - 120, 2)
vis("eks med exit", 0.5 * (150 - 120) + 0.5 * (-120 - 5 / 1.1), 2)
vis("oppg med exit", 0.5 * 300 + 0.5 * (-200 - 20 * A(0.10, 2)), 4)
vis("oppg halen", 0.5 * (20 / 0.10) / 1.1 ** 2, 4)

# =====================================================================
# 05 MA
# =====================================================================
steg("Kilde: lecture_12 s. 21, Vodafone/Mannesmann")
PV0, PM0, PV1, PM1, ER, rf, T = 4.19, 145.35, 4.96, 234, 53.7, 0.055, 0.25
short = ER * PV1
up = short * (1 + rf) ** T
down = up + PM0 - ER * PV0
p = (PM1 * (1 + rf) ** T - down) / (up - down)
vis("short-proveny 53.7 × 4.96", short, 3); vis("ved fullføring", up, 3)
vis("53.7 × 4.19 (lysbildet sier 225.03)", ER * PV0, 3)
vis("ved brudd (lysbildet 190.261)", down, 3); vis("p", p, 4)
down_slide = up + PM0 - 225.03
vis("p med lysbildets 225.03", (PM1 * (1 + rf) ** T - down_slide) / (up - down_slide), 4)
# synergiene markedet priser inn
NV, NM, X = 31.105, 0.5179, 27.811
PVc = ((1 + rf) ** T * PV1 - (1 - p) * PV0) / p
Sm = (NV + X) * PVc - NV * PV0 - NM * PM0
vis("Vodafone ved fullføring", PVc, 4); vis("S implisitt (mrd)", Sm, 2)
vis("53.7·N_M (nye aksjer, mrd)", ER * NM, 3)

steg("ma-15 · Cash payment: NPV_A = S − (P − T)")
# Eksempel: forelesning 12 s. 15
T_, P_, S_ = 400, 500, 150
vis("eks NPV_A", S_ - (P_ - T_), 2); vis("eks NPV_T", P_ - T_, 2)
# Oppgave: 20 mill. aksjer à 24 før bud, kontant 29, S = 140, nå 28
N, Pt0, offer, S, Pt1 = 20, 24, 29, 140, 28
T_ = N * Pt0; P_ = N * offer
fas = S - (P_ - T_)
f1 = P_ - T_                         # målselskapets NPV
f2 = S - (P_ - N * Pt1)              # T fra kursen etter kunngjøring
f3 = S + (P_ - T_)                   # fortegn på premien
vis("T", T_, 2); vis("P", P_, 2); vis("FASIT NPV_A", fas, 2)
vis("feil: NPV_T", f1, 2); vis("feil: T etter kunngjøring", f2, 2); vis("feil: fortegn", f3, 2)
ulike(fas, f1, f2, f3)
assert isclose(fas + f1, S)
vis("kontroll: (A+T+S) − P − A", (T_ + S) - P_, 2)

steg("ma-16 · Deal probability when completion is T ≠ 1 year away")
# Oppgave: 9 måneder; 1 målaksje mot 2.5 kjøperaksjer; før: A 40, B 80; etter: A 38, B 88; rf 4 %
k, m, PA0, PB0, PA1, PB1, rf, T = 1, 2.5, 40, 80, 38, 88, 0.04, 0.75
g = (1 + rf) ** T
cost = k * PB1
dep = m * PA1
up = dep * g
down = up + k * PB0 - m * PA0
ce = cost * g
fas = (ce - down) / (up - down)
vis("vekstfaktor 1.04^0.75", g, 6); vis("innskudd", dep, 2); vis("fullført", up, 4); vis("brudd", down, 4)
vis("sikkerhetsekvivalent", ce, 4); vis("FASIT p", fas, 4)
def pfor(gg):
    u = dep * gg; d = u + k * PB0 - m * PA0
    return (cost * gg - d) / (u - d)
f1 = pfor(1 + rf)                     # helt år
f2 = pfor(1.0)                        # ingen rente
f3 = (cost - down) / (up - down)      # forventet utbetaling satt lik kostnaden, ikke vokst
vis("feil: helt år", f1); vis("feil: ingen rente", f2); vis("feil: kostnad ikke vokst", f3)
f4 = pfor(1 + rf * T)                 # enkel rente 3 %
vis("(enkel rente 3 %, ikke brukt)", f4)
ulike(fas, f1, f2, f3, des=4)
spre0 = m * PA0 - k * PB0; spre1 = m * PA1 - k * PB1
vis("spread før", spre0, 2); vis("spread etter", spre1, 2)
assert isclose(1 - fas, g * spre1 / spre0)
vis("kontroll: 1 − p = g·spread1/spread0", g * spre1 / spre0)
# eksempel: Mannesmann (over)

steg("ma-17 · Bidding depends on alternatives")
# Eksempel: forelesning 12 s. 26
vis("eks A", 190 - 90, 0); vis("eks B", 170 - 70, 0); vis("eks C", 160 - 55, 0)
# Oppgave: Nordbank, Vestbank, Sørbank byr på Østbank (frittstående 50)
#            alene  N vinner  V vinner  S vinner
tab = {"N": (120, 210, 95, 105), "V": (90, 80, 185, 80), "S": (75, 65, 70, 160)}
alene, wN, wV, wS = tab["N"]
fas = wN - wS                 # N mot Sørbank (som vinner hvis N trekker seg)
f1 = wN - alene               # gevinst mot frittstående verdi
f2 = wN - wV                  # feil rival
f3 = 50                       # målets frittstående verdi
vis("FASIT N mot S", fas, 0); vis("feil: mot alene", f1, 0); vis("feil: mot V", f2, 0)
ulike(fas, f1, f2, f3)
vis("V mot S", tab["V"][2] - tab["V"][3], 0); vis("S mot N", tab["S"][3] - tab["S"][1], 0)
vis("S mot V", tab["S"][3] - tab["S"][2], 0); vis("V mot N", tab["V"][2] - tab["V"][1], 0)

steg("ma-18 · Exam level: Mannesmann-style probability and implied synergies")
# Oppgave: Fjellkraft (A) byr på Elvekraft (B): 1 B-aksje mot 6 A-aksjer, fullføres om 6 mnd
NA, NB, m, PA0, PB0, PA1, PB1, rf, T = 400, 50, 6, 20, 96, 19, 108, 0.05, 0.5
g = (1 + rf) ** T
dep = m * PA1; up = dep * g; down = up + PB0 - m * PA0
p = (PB1 * g - down) / (up - down)
PAc = (g * PA1 - (1 - p) * PA0) / p
x = m * NB
Sfas = (NA + x) * PAc - NA * PA0 - NB * PB0
vis("g", g, 6); vis("fullført", up, 4); vis("brudd", down, 4); vis("p", p, 4)
vis("A ved fullføring", PAc, 4); vis("B ved fullføring", m * PAc, 4); vis("nye aksjer", x, 2)
vis("FASIT S", Sfas, 2)
vis("V ved fullføring", (NA + x) * PAc, 2); vis("A + T ved brudd", NA * PA0 + NB * PB0, 2)
naive = NA * (PA1 - PA0) + NB * (PB1 - PB0)
vis("feil: kursendring (naiv)", naive, 2)
PAc_g1 = ((1 + rf) * PA1 - (1 - p) * PA0) / p
# feil: helt år i hele kjeden
g1 = 1 + rf
up1 = dep * g1; down1 = up1 + PB0 - m * PA0; p1 = (PB1 * g1 - down1) / (up1 - down1)
PAc1 = (g1 * PA1 - (1 - p1) * PA0) / p1
S1 = (NA + x) * PAc1 - NA * PA0 - NB * PB0
vis("feil: helt år, p", p1); vis("feil: helt år, S", S1, 2)
S2 = NA * PAc + NB * PB0 * 0 + NB * m * PAc - NA * PA0 - NB * PB0  # = Sfas (kontroll)
S3 = NA * PAc - NA * PA0 - NB * PB0 + 0  # glemte de nye aksjene
vis("feil: glemte nye aksjer", S3, 2)
S4 = (NA + x) * PA1 - NA * PA0 - NB * PB0   # brukte kursen etter kunngjøring som fullføringskurs
vis("feil: P_A1 som fullføringskurs", S4, 2)
ulike(Sfas, naive, S1, S3)
# kontroll: B-prisen gjenskapes; NPV_A og NPV_T summerer til S
assert isclose((p * m * PAc + (1 - p) * PB0) / g, PB1)
NPVA = NA * (PAc - PA0); NPVT = NB * (m * PAc - PB0)
vis("NPV_A ved fullføring", NPVA, 2); vis("NPV_T ved fullføring", NPVT, 2)
assert isclose(NPVA + NPVT, Sfas)
vis("kontroll: forventet, diskontert S", (p * Sfas) / g, 2)

# =====================================================================
# 07 OPSJONER
# =====================================================================
steg("opsjoner-15 · Price the easier of call and put first, then parity")
# Eksempel: ett trinn, S0 50, 60/40, 4 %, K = 45: put lettest? call betaler 15/0, put 0/5 — like lette.
# Eksempel: to trinn, S0 100, u 1.1, d 0.9, rf 3 %, K = 95
S0, u, d, rf, K = 100, 1.1, 0.9, 0.03, 95
rho = (1 + rf - d) / (u - d)
uu, ud, dd = S0 * u * u, S0 * u * d, S0 * d * d
Pdd = max(K - dd, 0)
Pe = (1 - rho) ** 2 * Pdd / (1 + rf) ** 2
Ce = Pe + S0 - K / (1 + rf) ** 2
Cd = (rho ** 2 * max(uu - K, 0) + 2 * rho * (1 - rho) * max(ud - K, 0)) / (1 + rf) ** 2
vis("eks rho", rho); vis("eks noder", uu, 2); vis("", ud, 2); vis("", dd, 2)
vis("eks put", Pe); vis("eks call via paritet", Ce); vis("eks call direkte", Cd)
# Oppgave: S0 100, u 1.2, d 0.8, rf 5 %, K = 90, to år
S0, u, d, rf, K = 100, 1.2, 0.8, 0.05, 90
rho = (1 + rf - d) / (u - d)
uu, ud, dd = S0 * u * u, S0 * u * d, S0 * d * d
P = (1 - rho) ** 2 * max(K - dd, 0) / (1 + rf) ** 2
fas = P + S0 - K / (1 + rf) ** 2
direkte = (rho ** 2 * max(uu - K, 0) + 2 * rho * (1 - rho) * max(ud - K, 0)) / (1 + rf) ** 2
vis("rho", rho); vis("noder", uu, 2); vis("", ud, 2); vis("", dd, 2)
vis("put", P); vis("PV(K)", K / (1 + rf) ** 2); vis("FASIT call", fas); vis("direkte", direkte)
assert isclose(fas, direkte)
f1 = P + S0 - K / (1 + rf)                   # PV(K) for ett år
f2 = rho ** 2 * max(K - dd, 0) / (1 + rf) ** 2 + S0 - K / (1 + rf) ** 2   # put med rho^2
f3 = P + S0 - K                              # K i stedet for PV(K)
vis("feil: ett års diskontering", f1); vis("feil: rho^2 på put", f2); vis("  put da", rho ** 2 * max(K - dd, 0) / (1 + rf) ** 2)
vis("feil: K udiskontert", f3)
ulike(fas, f1, f2, f3, des=4)

steg("opsjoner-16 · rho from 100/120/60 and a CDS priced with rho")
S0, Su, Sd, rf = 100, 120, 60, 0.05
rho = ((1 + rf) * S0 - Sd) / (Su - Sd)
vis("eks rho (Kurbatov)", rho)
# eksempel CDS: obligasjon pålydende 80 på eiendelene (V = S): misligholder i ned (60), tap 20
vis("eks CDS tap 20", (1 - rho) * 20 / (1 + rf))
# Oppgave: eiendeler 250 → 330 eller 170, rf 4 %, gjeld pålydende 200; CDS betaler tapet
V0, Vu, Vd, rf, F = 250, 330, 170, 0.04, 200
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
loss = max(F - Vd, 0)
fas = (1 - rho) * loss / (1 + rf)
f1 = rho * loss / (1 + rf)                 # rho på misligholdsstaten
f2 = (1 - 0.7) * loss / (1 + rf)           # reell sannsynlighet for mislighold 0.3 (opp 0.7)
f3 = (1 - rho) * loss                      # ikke diskontert
vis("rho", rho); vis("tap", loss, 2); vis("FASIT CDS", fas)
vis("feil: rho i ned", f1); vis("feil: reell 0.3", f2); vis("feil: udiskontert", f3)
ulike(fas, f1, f2, f3, des=4)
D = (rho * F + (1 - rho) * Vd) / (1 + rf)
vis("kontroll: D", D); vis("kontroll: PV(F) − D", F / (1 + rf) - D)
assert isclose(F / (1 + rf) - D, fas)
E = rho * (Vu - F) / (1 + rf)
vis("kontroll: E", E); assert isclose(D + E, V0)
EV = 0.7 * Vu + 0.3 * Vd
vis("kontroll: E[V1] med reell 0.7", EV, 2); vis("forventet avkastning %", (EV / V0 - 1) * 100, 2)
assert rho < 0.7

steg("opsjoner-17/18 · intuisjon (ingen regning). Kilde: PS3 E3 utbytte")
vis("PS3 E3: utbytte 1 → call 8.50 → 7.89", 7.89 - 8.50, 2)

# =====================================================================
# 08 KREDITT
# =====================================================================
steg("Kilde: lecture_10 s. 15 og PS3 E6 (Google)")
E = 86.05 * 320 / 1000
D = 135 - E
vis("E (mrd)", E, 3); vis("D", D, 3); vis("y", ((128 / D) ** (12 / 18) - 1) * 100, 2)
Es = 149.15 * 320 / 1000
Ds = 135 - Es
vis("senior D (V=135)", Ds, 3); vis("senior y", ((96 / Ds) ** (12 / 18) - 1) * 100, 2)
Dj = 135 - 27.54 - 87.27
vis("junior D (lysbildet 20.19)", Dj, 3)
vis("junior y fra 20.19 (lysbildet 34.94 %)", ((32 / 20.19) ** (12 / 18) - 1) * 100, 2)
vis("junior y, løsningsforslaget 20.16 (36.1 %)", ((32 / 20.16) ** (12 / 18) - 1) * 100, 2)
vis("senior y, løsningsforslaget 87.4 (6.46 %)", ((96 / 87.4) ** (12 / 18) - 1) * 100, 2)

steg("kreditt-15 · Debt and its yield from a quoted call")
# Oppgave: 250 mill. aksjer, V = 60 mrd, nullkupong 40 mrd om 15 mnd → strike 160; call bid 91.60 ask 92.40
N, V, F, T, bid, ask = 0.25, 60.0, 40.0, 15 / 12, 91.60, 92.40
strike = F / N
mid = (bid + ask) / 2
E = N * mid
D = V - E
fas = (F / D) ** (1 / T) - 1
f1 = F / D - 1                                 # ikke annualisert
f2 = (F / D) ** T - 1                          # eksponent snudd
f3 = (F / (V - N * ask)) ** (1 / T) - 1        # brukte ask
vis("strike per aksje", strike, 2); vis("mid", mid, 2); vis("E", E, 3); vis("D", D, 3)
vis("FASIT y %", fas * 100); vis("feil: ikke annualisert", f1 * 100); vis("feil: eksponent T", f2 * 100)
vis("feil: ask", f3 * 100)
ulike(fas * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
vis("kontroll: D·(1+y)^T", D * (1 + fas) ** T, 4)
assert isclose(D * (1 + fas) ** T, F)
# Eksempel: Google
vis("eks: Google y %", ((128 / (135 - 27.536)) ** (12 / 18) - 1) * 100)

steg("kreditt-16 · Senior and junior debt from two calls")
Fs, Fj = 30.0, 10.0
Ks = Fs / N; Kall = (Fs + Fj) / N
Cs_mid = 128.00; Call_mid = 92.00
Ds = V - N * Cs_mid
Eq = N * Call_mid
Dj = V - Ds - Eq
fas = (Fj / Dj) ** (1 / T) - 1
ys = (Fs / Ds) ** (1 / T) - 1
vis("strike senior", Ks, 2); vis("strike total", Kall, 2)
vis("D senior", Ds, 3); vis("E", Eq, 3); vis("D junior", Dj, 3)
vis("y senior %", ys * 100); vis("FASIT y junior %", fas * 100)
Dtot = V - Eq
f1 = ((Fs + Fj) / Dtot) ** (1 / T) - 1          # snittrente på all gjeld
f2 = (Fj / (Dtot - Fs)) ** (1 / T) - 1           # trakk senior pålydende fra total gjeldsverdi
f3 = Fj / Dj - 1                                 # ikke annualisert
vis("feil: samlet gjeld", f1 * 100); vis("feil: senior til pålydende, D_J", Dtot - Fs, 3)
vis("feil: senior til pålydende y", f2 * 100); vis("feil: ikke annualisert", f3 * 100)
ulike(fas * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
assert isclose(Dj, N * (Cs_mid - Call_mid))
assert ys < f1 < fas

steg("kreditt-17 · Coinsurance: the merged firm borrows cheaper (lecture_12 s. 28)")
# Eksempel: Kurbatov
A_, B_ = (80, 20), (10, 40); FA, FB = 30, 15
dA = sum(min(v, FA) for v in A_) / 2; dB = sum(min(v, FB) for v in B_) / 2
eA = sum(max(v - FA, 0) for v in A_) / 2; eB = sum(max(v - FB, 0) for v in B_) / 2
AB = [a + b for a, b in zip(A_, B_)]
dAB = sum(min(v, FA + FB) for v in AB) / 2; eAB = sum(max(v - FA - FB, 0) for v in AB) / 2
vis("eks D før", dA + dB, 2); vis("eks E før", eA + eB, 2); vis("eks D etter", dAB, 2); vis("eks E etter", eAB, 2)
vis("eks y A", (FA / dA - 1) * 100, 2); vis("eks y B", (FB / dB - 1) * 100, 2)
# Oppgave: rf = 0, risikonøytral, like sannsynlige. A 90/30 owes 40, B 20/60 owes 30
A_, B_ = (90, 20), (10, 60); FA, FB = 50, 40
dA = sum(min(v, FA) for v in A_) / 2; dB = sum(min(v, FB) for v in B_) / 2
AB = [a + b for a, b in zip(A_, B_)]
dAB = sum(min(v, FA + FB) for v in AB) / 2
yA, yB, yAB = FA / dA - 1, FB / dB - 1, (FA + FB) / dAB - 1
vis("D_A", dA, 2); vis("D_B", dB, 2); vis("y_A %", yA * 100); vis("y_B %", yB * 100)
vis("D_AB", dAB, 2); vis("FASIT y_AB %", yAB * 100)
f1 = (yA + yB) / 2                                   # snitt av de frittstående rentene
f2 = (FA + FB) / (dA + dB) - 1                       # samlet rente uten sammenslåing
AV = sum(AB) / 2
f3 = 0.0                                             # snittet V først: min(E[V], F) = F → risikofri
vis("feil: snitt", f1 * 100); vis("feil: frittstående samlet", f2 * 100); vis("feil: snitt V først", f3 * 100)
vis("E[V]", AV, 2)
ulike(yAB * 100, f1 * 100, f2 * 100, f3 * 100, des=4)
eA = sum(max(v - FA, 0) for v in A_) / 2; eB = sum(max(v - FB, 0) for v in B_) / 2
eAB = sum(max(v - FA - FB, 0) for v in AB) / 2
vis("E før", eA + eB, 2); vis("E etter", eAB, 2)
assert isclose((dAB - dA - dB) + (eAB - eA - eB), 0)

# =====================================================================
# Eksempler i intuisjonsstegene
# =====================================================================
steg("ma-19 · eksempel: utsette oppkjøpet ett år")
now = 0.5 * 100 + 0.5 * 20 - 50
wait = 0.5 * (100 - 50) / 1.10
vis("nå", now, 2); vis("vent", wait, 2); vis("vent, rival 60 %", 0.4 * wait, 2)
assert wait > now > 0.4 * wait
vis("vent, rival 60 % og L = −5", (0.4 * 25 - 0.6 * 5) / 1.10, 2)

steg("opsjoner-17 · eksempel: amerikansk mot europeisk")
vis("call: gulv S − PV(K)", 100 - 84 / 1.05, 2); vis("call: innløst", 100 - 84, 2)
vis("put: innløst nå", 50 - 2, 2); vis("put: europeisk maks PV(K)", 50 / 1.05, 2)

steg("opsjoner-18 · eksempel: utbytte (PS3 E3)")
vis("put før", 8.50 - 60 + 60 / 1.05); vis("put etter", 7.89 - 59 + 60 / 1.05)
vis("endring", (7.89 - 59) - (8.50 - 60), 2)

steg("kreditt-19 · Equity beta from the tree: Delta times V/E (erstatter kreditt-9)")
# Eksempel: treet fra kreditt-6
V0, Vu, Vd, rf, F, bU = 100, 125, 85, 0.05, 95, 1.0
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd); E = rho * (Vu - F) / (1 + rf); Dl = (Vu - F) / (Vu - Vd)
vis("eks rho", rho); vis("eks E", E); vis("eks Delta", Dl); vis("eks beta_E", Dl * V0 / E * bU)
# Oppgave
V0, Vu, Vd, rf, F, bU = 500, 700, 350, 0.04, 400, 1.1
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
Eu, Ed = max(Vu - F, 0), max(Vd - F, 0)
E = (rho * Eu + (1 - rho) * Ed) / (1 + rf)
D = V0 - E
Dl = (Eu - Ed) / (Vu - Vd)
fas = Dl * V0 / E * bU
f1 = V0 / E * bU                 # glemte Delta
f2 = rho * V0 / E * bU           # rho som delta
f3 = Dl * V0 / D * bU            # V/D i stedet for V/E
vis("rho", rho, 6); vis("E", E); vis("D", D); vis("Delta", Dl, 6); vis("V/E", V0 / E, 6)
vis("FASIT beta_E", fas); vis("feil: uten Delta", f1); vis("feil: rho", f2); vis("feil: V/D", f3)
ulike(fas, f1, f2, f3, des=4)
bD = (1 - Dl) * V0 / D * bU
vis("kontroll: beta_D", bD); vis("kontroll: vektet", E / V0 * fas + D / V0 * bD)
assert fas < f1
