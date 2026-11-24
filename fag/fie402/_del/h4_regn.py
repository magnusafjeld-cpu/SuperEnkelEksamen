"""Skribent H4: «Hintet i forelesning» (FIE402), hint3-1 oppgave 1-2 og hint3-2 oppgave 1-4.

Kjør fra hvor som helst:  python3 -I fag/fie402/_del/h4_regn.py

Oppdraget står i docs/fie402-hint-spek.md. Hver oppgave bygger på et eksempel Kurbatov pekte ut
i forelesning høsten 2026, med egen historie og egne tall:

- hint3-1 n1 (10 p): opsjonsintuisjon uten Black-Scholes-regning (σ, løpetid, amerikansk mot
  europeisk call, eiere av et belånt firma liker risiko). Forelesning 18 (1:20, 57:45, 58:05),
  12 (1:23:41), 13 (1:16:22).
- hint3-1 n2 (10 p): to typer overvåking av ledelsen, ny vignett (nærstående-avtaler).
  Forelesning 17 (1:55-2:26, 24:08-29:13).
- hint3-2 n1 (10 p): fusjonsgrunner uten synergier, tre grunner, minst én ineffektiv.
  Forelesning 16 (7:04-15:21), 18 (1:10:05).
- hint3-2 n2 (10 p): eieren velger tre ting i kontrakt og overvåking, med ulempen ved hver.
  Forelesning 17 (1:16:55-1:22:27).
- hint3-2 n3 (20 p): vente eller investere, første kontantstrøm i t = 0, sannsynlighet X.
  Forelesning 14 (16:58-30:40). Kurbatov sa at indifferens-X «bør ligge under 0,5». Det holder
  bare hvis NPV nå holdes fast; når begge NPV-ene avhenger av X, gir algebraen noe annet. Fasiten
  følger algebraen. Vri: et verbalt ledd om at inntekten i den gode tilstanden ikke påvirker X.
- hint3-2 n4 (20 p): senior og junior gjeld fra noterte calls (Google-eksemplet, PS3 E6) med
  egne tall: 360 mill. aksjer, NOK 215, 27 måneder, gjeld 54 = 36 + 18 mrd.
  Forelesning 13 (48:57-1:16:02), 18 (1:04:27).

Skriptet regner hvert tall, asserter sjekkene og skriver h4.json og h4_svar.json i samme mappe.
Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som lekker i oppgaveteksten),
skrives ingenting. Black-Scholes brukes bare internt til å lage konsistente kurser og til
fortegnet i n4 e); studenten regner ingen Black-Scholes.
"""
import json
import os
import re
import sys
from math import erf, exp, log, sqrt

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "h4.json")
UT_SVAR = os.path.join(HER, "h4_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def pc(x, d=2):
    return f(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:26} {v}")


def Nn(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def bs_call(S, K, T, r_aar, s):
    """Black-Scholes med årlig rente omregnet til kontinuerlig. Bare intern kontroll."""
    rc = log(1 + r_aar)
    d1 = (log(S / K) + (rc + s * s / 2) * T) / (s * sqrt(T))
    return S * Nn(d1) - K * exp(-rc * T) * Nn(d1 - s * sqrt(T))


def tab(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = "".join("<tr>" + "".join(f'<td class="n">{c}</td>' if i else f"<td>{c}</td>" for i, c in enumerate(rad))
                + "</tr>" for rad in rader)
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


# ======================================================================
#  hint3-2 n3: Kjelsnes Parkering, kjøpe nå eller vente (første inntekt i t = 0)
# ======================================================================
I3 = 40.0                      # NOK mill., prisen nå og om ett år
P0 = 2.5                       # årets netto inntekt, mottas straks (t = 0) ved kjøp nå
PU, PD = 3.2, 1.7              # fra t = 1 og for alltid: med og uten sykehus
p3, r3 = 0.60, 0.05
EP = p3 * PU + (1 - p3) * PD
assert near(EP, 2.6)
# a) NPV nå: t = 0-inntekten pluss evigrente fra t = 1
NPV_naa = -I3 + P0 + EP / r3
assert near(NPV_naa, 14.5)
NPV_naa_felle = -I3 + EP / r3                 # glemmer inntekten i t = 0
NPV_naa_felle2 = -I3 + P0 / r3                # bruker dagens inntekt for alltid (ignorerer sykehuset)
assert abs(NPV_naa_felle - NPV_naa) > 1 and abs(NPV_naa_felle2 - NPV_naa) > 1
# b) vente: kjøp ved t = 1, inntekt fra t = 1 (første betaling straks ved kjøpet)
V1_u = -I3 + PU + PU / r3                     # 27.2
V1_d = -I3 + PD + PD / r3                     # −4.3
assert near(V1_u, 27.2) and near(V1_d, -4.3)
assert V1_u > 0 > V1_d                        # kjøper bare med sykehus
W = V1_u / (1 + r3)                           # verdien ved t = 0 av den gode grenen, per sannsynlighet
NPV_vent = p3 * max(V1_u, 0) / (1 + r3) + (1 - p3) * max(V1_d, 0) / (1 + r3)
assert near(NPV_vent, p3 * W)
NPV_vent_felle = (p3 * V1_u + (1 - p3) * V1_d) / (1 + r3)   # sammenligner ikke med 0
assert NPV_vent_felle < NPV_naa < NPV_vent    # fellen snur beslutningen
# c) beslutning og verdien av opsjonen
OPT3 = NPV_vent - max(NPV_naa, 0)
assert OPT3 > 0
# d) X som gir likegyldighet. NPV_naa(X) = a + bX, NPV_vent(X) = W·X
a_naa = -I3 + P0 + PD / r3                    # −3.5: NPV nå i den dårlige tilstanden
b_naa = (PU - PD) / r3                        # 30
assert near(a_naa, -3.5) and near(b_naa, 30)
Xs = -a_naa / (b_naa - W)
assert 0 < Xs < 1 and Xs > p3                 # likegyldig over 60 %, i tråd med c)
assert near(a_naa + b_naa * Xs, W * Xs, 1e-9)
assert near(a_naa + b_naa * p3, NPV_naa) and near(W * p3, NPV_vent)   # samme tall som a) og b)
X_felle = NPV_naa / W                         # NPV nå holdt fast på 14.5 (Kurbatovs hurtigregel)
assert X_felle < p3 < Xs and abs(X_felle - Xs) > 0.2
X_felle_t0 = (I3 - PD / r3) / (b_naa - W)     # glemmer t = 0-inntekten: X over 1
assert X_felle_t0 > 1
# e) andre rute: hva man taper og vinner ved å vente
U_tap = P0 - (I3 - I3 / (1 + r3))             # god tilstand: mister t = 0-inntekten, sparer renten
D_vinn = -a_naa                               # dårlig tilstand: slipper tapet på 3.5
assert near(Xs, D_vinn / (D_vinn + U_tap), 1e-12)
assert near((-I3 + P0 + PU / r3) - W, U_tap, 1e-12)   # forskjellen i god tilstand
# vri: høyere inntekt med sykehus endrer ikke X
PU2 = 4.0
W2 = (-I3 + PU2 + PU2 / r3) / (1 + r3)
Xs2 = -a_naa / ((PU2 - PD) / r3 - W2)
assert near(Xs2, Xs, 1e-12)
NPV_ved_Xs = W * Xs
# forelesningseksemplet (14, 16:58-30:40): I 1600, pris 200 nå, 300 eller 100, r 10 %, første enhet i t = 0
L_I, L_P0, L_PU, L_PD, L_r = 1600.0, 200.0, 300.0, 100.0, 0.10
L_naa50 = -L_I + L_P0 + (0.5 * L_PU + 0.5 * L_PD) / L_r
L_W = (-L_I + L_PU + L_PU / L_r) / (1 + L_r)
assert near(L_naa50, 600) and near(0.5 * L_W, 772.7272727, 1e-6)
L_X_snarvei = L_naa50 / L_W                               # NPV nå holdt fast: under 0,5
L_a, L_b = -L_I + L_P0 + L_PD / L_r, (L_PU - L_PD) / L_r  # −400 + 2000X
L_X = -L_a / (L_b - L_W)
assert L_X_snarvei < 0.5 < L_X and near(L_X, 0.88, 1e-9) and near(L_X_snarvei, 0.38823529, 1e-6)
vis("hint3-2 n3", EP=EP, NPV_naa=NPV_naa, felle_t0=NPV_naa_felle, felle_fast=NPV_naa_felle2, V1_u=V1_u,
    V1_d=V1_d, W=W, NPV_vent=NPV_vent, vent_felle=NPV_vent_felle, OPT=OPT3, Xs=Xs, X_felle=X_felle,
    X_felle_t0=X_felle_t0, U_tap=U_tap, D_vinn=D_vinn, Xs2=Xs2, NPV_ved_Xs=NPV_ved_Xs)

# ======================================================================
#  hint3-2 n4: Lysneset Fiber, senior og junior gjeld fra noterte calls
# ======================================================================
N4 = 0.36                      # milliarder aksjer (360 mill.)
S4 = 215.0                     # NOK per aksje
rf4 = 0.035                    # årlig rente, årlig rentes rente
mnd4 = 27
T4 = mnd4 / 12                 # 2.25 år
F4, FS4, FJ4 = 54.0, 36.0, 18.0              # NOK mrd.
SIG4 = 0.40                    # bare til å lage kursene
V4 = N4 * S4
kT, kS, kJ = F4 / N4, FS4 / N4, FJ4 / N4
assert near(V4, 77.4) and near(kT, 150) and near(kS, 100) and near(kJ, 50)
STRIKES = [50, 100, 150, 200]
HALV = {50: 0.40, 100: 0.20, 150: 0.20, 200: 0.15}
MID = {k: round(bs_call(S4, k, T4, rf4, SIG4), 2) for k in STRIKES}
KURS = {k: (round(MID[k] - HALV[k], 2), round(MID[k] + HALV[k], 2)) for k in STRIKES}
Cm = {k: (b + a) / 2 for k, (b, a) in KURS.items()}
for k in STRIKES:
    assert near(Cm[k], MID[k], 1e-9)
PVk = lambda K: K / (1 + rf4) ** T4
for a_, b_ in zip(STRIKES, STRIKES[1:]):
    assert Cm[a_] > Cm[b_]                                 # synker i strike
    assert Cm[a_] - Cm[b_] < b_ - a_                       # helning under 1
for a_, b_, c_ in zip(STRIKES, STRIKES[1:], STRIKES[2:]):
    assert (Cm[a_] - Cm[b_]) / (b_ - a_) > (Cm[b_] - Cm[c_]) / (c_ - b_)   # konveks
for k in STRIKES:
    assert Cm[k] > S4 - PVk(k)                             # nedre grense for call
# a) én obligasjon
E4 = N4 * Cm[kT]
D4 = V4 - E4
# b) rente og spread
y4 = (F4 / D4) ** (1 / T4) - 1
spr4 = y4 - rf4
y4_ikke = F4 / D4 - 1                                      # ikke annualisert
y4_lin = (F4 / D4 - 1) / T4                                # lineært
y4_feileks = (F4 / D4) ** T4 - 1                           # 12/27 snudd
PUT4 = PVk(F4) - D4                                        # implisitt put (mrd.)
assert PUT4 > 0 and D4 < PVk(F4)                           # ekte sjekk: gjelden er ikke risikofri
assert rf4 < y4
# c) senior og junior
CS4 = N4 * Cm[kS]
DS4 = V4 - CS4
DJ4 = CS4 - E4
assert near(DJ4, V4 - DS4 - E4) and near(DS4 + DJ4, D4)   # identiteter
assert DS4 < PVk(FS4) and DJ4 < PVk(FJ4)                   # ekte sjekk per lag
DJ4_felle = V4 - N4 * Cm[kJ]                               # junior priset som eneste gjeld (call 50)
DS4_felle = PVk(FS4)                                       # senior antatt risikofri
E4_felleS = N4 * Cm[kS]                                    # egenkapital med senior-strike
assert abs(DJ4_felle - DJ4) > 1
# d) renter
yS4 = (FS4 / DS4) ** (1 / T4) - 1
yJ4 = (FJ4 / DJ4) ** (1 / T4) - 1
assert rf4 < yS4 < y4 < yJ4
yJ4_lin = (FJ4 / DJ4 - 1) / T4
yJ4_ikke = FJ4 / DJ4 - 1
yJ4_felle = (FJ4 / DJ4_felle) ** (1 / T4) - 1
# fellene havner utenfor 1 % toleranse
for felle, riktig in ((y4_lin, y4), (y4_ikke, y4), (y4_feileks, y4), (yJ4_lin, yJ4), (yJ4_ikke, yJ4),
                      (yJ4_felle, yJ4), (DJ4_felle, DJ4), (DS4_felle, DS4), (E4_felleS, E4)):
    assert abs(felle - riktig) > 0.01 * abs(riktig)
# e) tidsverdi fra kursene = putprisen fra put-call-paritet; størst nær pengene
TV100 = Cm[kS] - (S4 - PVk(kS))
TV150 = Cm[kT] - (S4 - PVk(kT))
assert 0 < TV100 < TV150
assert abs(TV100 - 2.97) < 0.005 and abs(TV150 - 13.74) < 0.005
assert near(N4 * TV150, PUT4, 1e-9)                       # samme put som i b)
# e) fortegn ved høyere volatilitet (samme V): intern Black-Scholes
SIG_H = 0.50
cS_h, cT_h = bs_call(S4, kS, T4, rf4, SIG_H), bs_call(S4, kT, T4, rf4, SIG_H)
cS_l, cT_l = bs_call(S4, kS, T4, rf4, SIG4), bs_call(S4, kT, T4, rf4, SIG4)
DS_h, DJ_h, E_h = V4 - N4 * cS_h, N4 * (cS_h - cT_h), N4 * cT_h
DS_l, DJ_l, E_l = V4 - N4 * cS_l, N4 * (cS_l - cT_l), N4 * cT_l
assert DS_h < DS_l and DJ_h < DJ_l and E_h > E_l          # senior ned, junior ned her, egenkapital opp
assert near(DS_h + DJ_h + E_h, V4, 1e-9)
assert S4 > kT                                            # eiendelene ligger over hele junior-intervallet
vis("hint3-2 n4", V=V4, Cm=Cm, KURS=KURS, E=E4, D=D4, y=y4, spread=spr4, y_ikke=y4_ikke, y_lin=y4_lin,
    y_feileks=y4_feileks, PVF=PVk(F4), PUT=PUT4, CS=CS4, DS=DS4, DJ=DJ4, PVFS=PVk(FS4), PVFJ=PVk(FJ4),
    DJ_felle=DJ4_felle, yS=yS4, yJ=yJ4, yJ_lin=yJ4_lin, yJ_felle=yJ4_felle,
    sig50=(DS_h, DJ_h, E_h), sig40=(DS_l, DJ_l, E_l))


# ======================================================================
#                              TEKSTENE
# ======================================================================

# ---------------------------------------------------------------- hint3-1 n1
ex_31_1 = {
    "n": 1, "title": "Options", "points": 10, "topic": "Options", "chapters": [21, 23, 24],
    "merke": "Forelesning 18 (Wrap-up), 1:20: «Intuition can be there. I can ask you what happens to the option price if…»",
    "body": (
        "<p>Hestvika Batteri ASA, a listed battery maker, has a large bank loan. Marit, an engineer there, "
        "receives European calls on Hestvika shares as part of her pay. Her father owns Hestvika shares and "
        "considers buying European puts on them as insurance. Hestvika pays no dividends before the options "
        "expire. Answer without calculations, 1-3 sentences per question.</p>"
        "<p>a) A coming decision on battery subsidies makes Hestvika's share more volatile, while today's price "
        "is unchanged. What happens to the value of the calls and of the puts? (3 points)</p>"
        "<p>b) Hestvika offers to extend the calls' life from two to four years. Is that worth something to "
        "Marit? Would a longer life also raise the value of the European puts? (2 points)</p>"
        "<p>c) Is an American call with the same strike and expiry worth more, less or the same as Marit's "
        "European call? (2 points)</p>"
        "<p>d) The managers, acting for the shareholders, consider a very risky expansion with a negative NPV. "
        "Why may the shareholders still want it? Who pays for it? (3 points)</p>"
    ),
    "solution": (
        "<p><b>a) Both the calls and the puts gain value.</b> An option's payoff is one-sided: the call pays "
        "max(S<sub>T</sub> − K, 0) and the put max(K − S<sub>T</sub>, 0), so the holder never loses more than the "
        "premium. A wider spread of the share price therefore adds payoff in the tail where the option pays "
        "without adding anything in the other tail.</p>"
        "<p><b>b) Yes for the calls; usually yes but not necessarily for the European puts.</b> A longer life gives "
        "the share more time to move far above the strike with the loss still capped at zero; Marit also pays the "
        "strike later. For a European put more time adds dispersion, but the strike is received later and its "
        "present value falls, so a put deep in the money can lose value.</p>"
        "<p><b>c) The same, never less.</b> The American call gives every right of the European call plus "
        "early exercise, so it is worth at least as much. Since Hestvika pays no dividends, exercising a call early "
        "only gives up time value and pays the strike sooner, so it is never optimal and the extra right is worth "
        "nothing.</p>"
        "<p><b>d) Equity is a call on the firm's assets, so the shareholders gain from risk; the bank pays.</b> "
        "With limited liability the shareholders hold a call with a strike equal to the face value of the loan; "
        "a riskier project raises its value even with a negative NPV because much of the extra downside falls "
        "on the bank. The loan is a risk-free debt plus a written put that gains with risk, so it loses value: a "
        "wealth transfer from the creditors that can exceed the NPV lost (risk shifting).</p>"
        "<p><b>Also accepted.</b> In a): naming vega; the edge case σ = 0, where an out-of-the-money option is "
        "worthless. In b): for an American put a longer life can never hurt. In c): Kurbatov's rule of thumb that "
        "an option with more rights is priced higher (recording 12, 12:41) holds as «at least as much»; with "
        "dividends the American call can be worth strictly more. In d): «gambling for resurrection» when the firm "
        "is close to default; total value falls by the negative NPV, so the shareholders' gain is smaller than "
        "the bank's loss. Only the direction is asked: no Black-Scholes calculation is expected (recording 18, "
        "1:20 and 58:09 to 58:26).</p>"
    ),
    "criteria": [
        "a) 3 points: 1 for the calls rising, 1 for the puts rising and 1 for the reason: the payoff is one-sided, "
        "so more dispersion adds upside without adding downside for the holder. «The put falls because the call "
        "rises» is the classic error and earns 0 for the put.",
        "b) 2 points: 1 for the calls (more time for the share to move, the strike paid later) and 1 for the put. "
        "«Usually yes, but not necessarily, because the strike is received later and its present value falls» "
        "earns the full point; «yes, more time means more uncertainty» without the caveat earns 0.5. Only the "
        "direction is expected (recording 18, 58:26).",
        "c) 2 points for «the same» with the reason (no dividends, so early exercise of a call is never optimal) "
        "or for «at least as much» with the reason that the American call contains every right of the European "
        "call plus early exercise. «More» without that caveat earns 1 of 2: it is Kurbatov's rule of thumb "
        "(recording 12, 12:41) but overstates the case without dividends. «Less» earns 0.",
        "d) 3 points: 1 for equity as a call on the firm's assets with the face value of the debt as strike "
        "(limited liability), 1 for why more risk raises that call even with a negative NPV and 1 for who pays: "
        "the creditors, through a wealth transfer as the debt (risk-free debt plus a written put) loses value.",
        "1-3 sentences per question. No calculation is required and a purely verbal answer scores full marks. "
        "Naming vega, risk shifting or gambling for resurrection is accepted, but the mechanism earns the points.",
    ],
}

# ---------------------------------------------------------------- hint3-1 n2
ex_31_2 = {
    "n": 2, "title": "Governance", "points": 10, "topic": "Corporate governance", "chapters": [27],
    "merke": ("Forelesning 17 (Governance), 29:13: «this was one of the exam questions a couple years ago … "
              "if a similar question could arise during the exam»"),
    "body": (
        "<p>Brackenridge Freight Inc. is a US-listed freight company with dispersed ownership and a large bank "
        "loan. A newspaper reports that for four years Brackenridge has bought trucking services from a firm "
        "owned by the CEO's brother at prices about 20% above the market. The annual report mentions these "
        "contracts in a single sentence.</p>"
        "<p>Select and describe two different types of monitoring that could have uncovered or stopped this. "
        "For each, explain who monitors, which tools they use and why they have the incentive or the power to "
        "act. (2-3 sentences per type; each type is worth 5 points.)</p>"
    ),
    "solution": (
        "<p>Two types, 5 points each: who monitors, with which tools and why that monitor has the incentive or "
        "the power, applied to the contracts with the CEO's brother. Two strong choices:</p>"
        "<p><b>1. The board, through its independent directors and the audit committee.</b> The independent "
        "directors are elected by the shareholders to monitor the CEO, have no ties to the CEO and carry legal and "
        "reputational liability. Through the audit committee they can require advance approval of every contract "
        "with a party related to the CEO, have the external auditor compare the prices with the market and, as a "
        "last step, dismiss the CEO. Such a review would have caught a 20% overpayment long before a newspaper "
        "did.</p>"
        "<p><b>2. The bank as lender.</b> Every dollar overpaid to the brother's firm is cash that no longer "
        "services the loan, so the bank has a direct incentive to watch. Its tools are the loan covenants: "
        "regular financial reports, limits on payments outside normal business, the right to demand information "
        "and the threat of calling the loan or refusing to roll it over. A bank that sees margins falling while "
        "trucking costs rise can demand an explanation before the problem grows.</p>"
        "<p><b>Other types that score equally.</b> Institutional investors and activists: with dispersed "
        "ownership a small holder free-rides, so the monitor is a fund with a stake large enough to make the "
        "effort pay; its tools are engagement, votes against the directors, shareholder proposals and a proxy "
        "fight. Employees and internal audit, who can report to the audit committee, go around the CEO or, as a "
        "last resort, go to the media. The government and regulators, through disclosure rules for transactions "
        "with related parties, investigations, fines and the courts. The market for corporate control: a firm "
        "that overpays its suppliers is worth less than it could be, so a bidder can buy it and replace the CEO. "
        "The press, which uncovered the contracts in this case.</p>"
    ),
    "criteria": [
        "Two types, 5 points each: about 1 for WHO monitors, 2 for the TOOLS and how they are used, 1 for WHY that "
        "monitor has the incentive or the power and 1 for applying it to the contracts with the CEO's brother.",
        "Two distinct types. Two versions of the same monitor, such as «the board» and «the audit committee», "
        "count as one: the second earns 0. The external auditor counts as a type of its own only with its own "
        "tools (the audit opinion, testing the contracts against market prices).",
        "Accepted types (recording 17, 24:08 to 29:07): institutional shareholders and activists, the board and "
        "its independent directors, lenders, employees (internal monitoring), the authorities and the market for "
        "corporate control; also external auditors and the press.",
        "Shareholders as monitors must deal with free riding: with dispersed ownership a small holder gains too "
        "little to monitor, so the monitor is an institution or an activist with a larger stake. «The "
        "shareholders vote» without this earns at most 3 of 5.",
        "Tools must be explained, not listed: three tool names without what they do earn at most half of the "
        "tool points. 2-3 sentences per type; length is not rewarded.",
    ],
}

# ---------------------------------------------------------------- hint3-2 n1
ex_32_1 = {
    "n": 1, "title": "M&A", "points": 10, "topic": "Mergers and acquisitions", "chapters": [26],
    "merke": ("Forelesning 18 (Wrap-up), 1:10:05: «one of the exam questions a couple of years ago was, explain "
              "the reasons for M&A without mentioning the word synergies»"),
    "body": (
        "<p>Frøystad Dagligvare ASA, a listed grocery chain with large cash holdings and flat sales, makes a cash "
        "bid for Ulvenes Sport ASA, a listed chain of sporting-goods stores. Ulvenes's share price has fallen 40% "
        "in two years under a CEO known for weak cost control. Frøystad's CEO, whose bonus depends on revenue "
        "growth, calls the deal «the first step towards a Nordic retail empire».</p>"
        "<p>Give three reasons why Frøystad may want to buy Ulvenes. Reasons must be other than «synergies», "
        "meaning gains from running the two firms' operations together, such as cost savings, economies of scale "
        "or joint purchasing. At least one of them must be a reason that does not create value for Frøystad's shareholders. Explain "
        "the mechanism behind each reason in 1-2 sentences; «value creation» alone does not count. (3 points per "
        "reason; 1 point for saying which of your reasons is inefficient and who bears its cost.)</p>"
    ),
    "solution": (
        "<p>Three reasons, 1-2 sentences each, plus a label on the inefficient one. The question defines synergies "
        "as gains from running the operations together, so each reason must rest on management, information, "
        "access, pricing power or agency.</p>"
        "<p><b>1. Replacing weak management (a disciplinary takeover).</b> Ulvenes's share price reflects a CEO "
        "with weak cost control, so Frøystad can buy at that price, install a better team and keep the "
        "difference. The gain comes from running the same stores better, not from combining them with "
        "Frøystad's.</p>"
        "<p><b>2. Buying an undervalued target.</b> If Frøystad's managers have better information about the "
        "retail market than the average investor, they may see that the market has overreacted to the 40% fall "
        "and prices Ulvenes below its true value. Buying at that price, even with a premium, transfers value from "
        "Ulvenes's selling shareholders to Frøystad's.</p>"
        "<p><b>3. Empire building (inefficient).</b> Frøystad's CEO earns a bonus on revenue growth and gains "
        "prestige from running a larger group, so buying Ulvenes pays the CEO even if it destroys value. The large "
        "cash holdings make this easy: free cash flow with no good projects is spent on an acquisition instead "
        "of being paid out. (Empire building and the free cash flow behind it are one reason here.)</p>"
        "<p><b>Which reason is inefficient and who pays.</b> Reason 3 creates no value. If the premium is not "
        "earned back, value moves from Frøystad's shareholders to Ulvenes's shareholders, who receive the premium "
        "in cash, so Frøystad's shareholders bear the cost.</p>"
        "<p><b>Other defensible answers.</b> Access to scarce resources such as Ulvenes's store sites in shopping "
        "centres, which would take years to obtain otherwise; access to a brand, customers or skilled staff; "
        "market power, if explained as pricing power towards customers or suppliers (grocery and sports stores "
        "compete little, so it is weak here). Inefficient: diversification, which Frøystad's shareholders can do themselves at no cost while "
        "it lowers the risk to the managers' own jobs; hubris and the winner's curse; buying to lift earnings "
        "per share or other short-run targets (recording 16, 14:45); managerial ambition as in the Twitter "
        "example (recording 16, 15:21).</p>"
        "<p><b>Not accepted.</b> Synergies under another name, such as cost savings from merging two head "
        "offices, economies of scale or joint purchasing: the question defines them as synergies, although "
        "Kurbatov lists economies of scale as a motive of its own in the lecture (recording 16, 3:50 and 11:09). «Value creation» without a mechanism: "
        "Kurbatov says this «wouldn't be really accepted during the exam» (recording 16, 11:39). Tax losses as a "
        "motive: they are erased on a change of owner (recording 17, 1:14:01).</p>"
    ),
    "criteria": [
        "Exactly three reasons, 1-2 sentences each, 3 points each: 1 for naming the reason and 2 for the mechanism. "
        "A name alone («empire building», «undervaluation») earns at most 1 of 3.",
        "At least one reason must be inefficient: it does not create value for Frøystad's shareholders. The extra "
        "point goes to saying which one and who bears the cost: Frøystad's shareholders, as the premium passes to "
        "Ulvenes's shareholders.",
        "Accepted: a disciplinary takeover, undervaluation, access to scarce resources, a brand or a market, market "
        "power as pricing power towards customers or suppliers, know-how; inefficient: empire building or "
        "managerial ambition (with the free cash flow behind it), diversification, hubris and the winner's curse, "
        "EPS manipulation.",
        "Not accepted: anything the question defines as a synergy (cost savings from merging departments, "
        "economies of scale, joint purchasing); «value creation» without a mechanism; tax losses, which are erased "
        "on a change of owner.",
        "Counting: empire building, managerial ambition and spending free cash flow on the deal are one reason. "
        "Undervaluation needs its own argument about mispricing (why the market is wrong or why Frøystad knows "
        "better); «the price has fallen 40%, so it is cheap» earns at most 1 of 3.",
        "Using the case (the 40% fall, the weak CEO, the revenue bonus, the cash) is what earns the mechanism "
        "points.",
    ],
}

# ---------------------------------------------------------------- hint3-2 n2
ex_32_2 = {
    "n": 2, "title": "Governance", "points": 10, "topic": "Corporate governance", "chapters": [27],
    "merke": "Forelesning 17 (Governance), 1:18:44: «this could be very easily an exam question»",
    "body": (
        "<p>You own 30% of Wrenfield Hotels Inc., a US-listed hotel chain whose other shares are widely held. The "
        "CEO's contract expires this year and you sit on the board that will design the new one. Under the old "
        "contract the CEO earned a bonus on revenue growth: the chain opened twelve new hotels, half of them "
        "loss-making, while maintenance of the older hotels was cut to keep reported profits up.</p>"
        "<p>Select three things you would put in the new contract or in the way the board monitors the CEO. For "
        "each, explain in about three sentences how it makes the CEO act in the shareholders' interest and what "
        "its main drawback is (3 points each). Finally, explain in one or two sentences why you would not simply "
        "choose the strictest monitoring possible (1 point).</p>"
    ),
    "solution": (
        "<p>The old contract rewarded size, so the new one should reward value. Three measures, each with how it "
        "aligns the CEO and its main drawback:</p>"
        "<p><b>1. Pay for return on capital and long-run share value, not for revenue.</b> Replace the revenue "
        "bonus with a bonus on return on invested capital above the cost of capital, paid mostly in restricted "
        "shares that vest over three to five years. A new hotel then pays the CEO only if it earns more than it "
        "costs. Long vesting makes cutting maintenance costly to the CEO's own wealth. Drawback: a return "
        "target can be gamed by refusing good projects. Long vesting also loads the CEO with risk outside the "
        "CEO's control, so the pay must be higher.</p>"
        "<p><b>2. Board approval and a follow-up review of every new hotel.</b> New hotels above a set size need "
        "board approval on a written NPV analysis. The audit committee then compares each hotel's results with "
        "the plan after two years. This stops expansion for its own sake and makes the CEO's forecasts "
        "accountable. Drawback: it slows decisions. The board also knows less about each market than the CEO, so "
        "it can reject good projects or drift into micromanagement.</p>"
        "<p><b>3. Transparency on maintenance.</b> Require a yearly report of maintenance spending and an "
        "independent inspection of each hotel, with a clawback of bonuses paid on profits that later prove to come "
        "from cut maintenance. Hidden cuts then show up before they hurt the brand. Drawback: inspections cost "
        "money. New metrics also invite new gaming, such as spending on what the inspector checks rather than on "
        "what guests value.</p>"
        "<p><b>Why not the strictest monitoring.</b> Monitor too harshly and the CEO does only the bare minimum "
        "and avoids every risk, good projects included; monitor too little and the CEO abuses the position. The "
        "goal is the zone between the two (recording 17, 1:17:37). Monitoring also costs time and money; "
        "beyond some point the cost exceeds what it saves.</p>"
        "<p><b>Other measures that score.</b> In the contract: a requirement that the CEO holds shares; capped "
        "severance pay, so that the CEO dares to close loss-making hotels; options. In the board's monitoring: "
        "using your 30% to nominate independent directors; a board of about 7 to 11 directors with the CEO not "
        "as chair; staged funding of new hotels. Each needs its own drawback.</p>"
        "<p><b>Outside the question.</b> A dividend or repurchase policy, more debt and communication with the "
        "other shareholders can discipline the CEO, but they are neither part of the contract nor of the way the "
        "board monitors the CEO.</p>"
    ),
    "criteria": [
        "Three measures, about three sentences each, 3 points each: 2 for how it makes the CEO act in the "
        "shareholders' interest (applied to Wrenfield) and 1 for a real drawback. A measure without a drawback "
        "earns at most 2 of 3.",
        "The last point: why not the strictest monitoring. Too harsh and the CEO does the bare minimum and avoids "
        "valuable risks; too loose and the CEO abuses the position (recording 17, 1:17:37). «Monitoring is costly "
        "and beyond some point the cost exceeds the benefit» also earns the point.",
        "Use the situation: the old revenue bonus rewarded size and led to cut maintenance. A new bonus on revenue "
        "or on this year's profit without a guard against cut maintenance earns at most 1 of 3.",
        "Accepted measures (recording 17): in the contract, pay design (restricted shares, options, "
        "return-on-capital targets, clawbacks, share ownership) and golden parachute or severance; in the board's "
        "monitoring, an independent board and its committees, board approval of large investments, transparency "
        "and reporting, nominating directors with the 30% stake. Payout or debt policy and communication with "
        "shareholders lie outside «the contract or the way the board monitors the CEO» and earn 0.",
        "Counting: restricted shares and options are one measure (equity pay); a return target and long vesting "
        "count as one measure unless each gets its own mechanism and drawback.",
        "Board size: an argument with both sides is accepted (too small lacks capacity, too large invites "
        "free riding). Kurbatov names 7 to 11 as a sweet spot but says there is no strict answer and that some "
        "boards work well with 15 (recording 17, 34:20 to 34:58). «A smaller board works better» alone is not "
        "accepted.",
    ],
}

# ---------------------------------------------------------------- hint3-2 n3
ex_32_3 = {
    "n": 3, "title": "Real options", "points": 20, "topic": "Real options, option to wait", "chapters": [25],
    "merke": ("Forelesning 14 (Options III), 29:46: «an exam question would be … this would be a very nice exam "
              "question»"),
    "body": (
        "<p>Kjelsnes Parkering AS can buy an existing parking garage in Steinkjer for NOK 40 million. Its spaces "
        "are rented out on yearly permits paid at the start of each year. If Kjelsnes buys today, it receives "
        "this year's net income of NOK 2.5 million immediately (at t = 0) and then one payment at the start of "
        "every following year (t = 1, 2, 3, …), forever.</p>"
        "<p>From t = 1 on, the net income depends on whether a new hospital is built next to the garage, which "
        "the health authority will decide in exactly one year: NOK 3.2 million a year with the hospital and NOK "
        "1.7 million without, in both cases forever. The probability of the hospital is 60%. The decision is "
        "unrelated to the stock market, so discount all cash flows at the risk-free rate of 5%. Use 4 decimal "
        "places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What is the NPV of buying the garage today?</p>",
         "solution": (
             "<p>The timeline: −40 + 2.5 at t = 0, then 3.2 (60%) or 1.7 (40%) a year from t = 1 on, forever. The "
             "first payment falls at t = 0 and is not discounted; the rest is a perpetuity whose first payment "
             "comes at t = 1, worth C/r today.</p>"
             f"<p>Expected income from t = 1: 0.6 × 3.2 + 0.4 × 1.7 = {f(EP)}<br>"
             f"PV at t = 0 of the income from t = 1: {f(EP)}/0.05 = {f(EP / r3)}<br>"
             f"NPV = −40 + 2.5 + {f(EP / r3)} = <b>{f(NPV_naa)} million NOK</b></p>"
             f"<p>The static NPV is positive. Forgetting the income at t = 0 gives {f(NPV_naa_felle)}.</p>"),
         "criteria": [
             "Includes the NOK 2.5 million received at t = 0, undiscounted. Leaving it out gives 12.0, the trap "
             "Kurbatov warns about (recording 14, 17:06).",
             f"Expected income from t = 1 of {f(EP)} and a perpetuity from t = 1 worth {f(EP / r3)} at t = 0.",
             f"NPV = −40 + 2.5 + {f(EP / r3)} = {f(NPV_naa)} million NOK.",
             "Note, no points of its own since the case states it: discounting real probabilities at the risk-free "
             "rate is right here because the risk is unrelated to the market.",
         ]},
        {"label": "b", "points": 5,
         "body": (
             "<p>The seller also offers Kjelsnes the right to buy in exactly one year for the same NOK 40 million "
             "and keeps the income until then. If Kjelsnes waits, it pays at t = 1 and receives income from t = 1 on. "
             "What is the NPV at t = 1 of buying in each case? What is the NPV of waiting, seen from t = 0?</p>"),
         "solution": (
             "<p>Value each case at t = 1, when the decision is known. The first income again comes at once, so "
             "the value at t = 1 is −40 + C + C/0.05.</p>"
             + tab(["Case at t = 1", "Calculation", "NPV at t = 1", "Decision"],
                   [["Hospital", "−40 + 3.2 + 3.2/0.05", f"<b>{f(V1_u)}</b>", "buy"],
                    ["No hospital", "−40 + 1.7 + 1.7/0.05", f"<b>{f(V1_d)}</b>", "do not buy: 0"]])
             + "<p>Without the hospital Kjelsnes simply does not buy, so that case is worth 0, not "
             f"{f(V1_d)}. Discount the expectation one year at 5%:</p>"
             f"<p>NPV of waiting = [0.6 × {f(V1_u)} + 0.4 × 0]/1.05 = {f(p3 * V1_u)}/1.05 = "
             f"<b>{f(NPV_vent)} million NOK</b></p>"
             f"<p>Keeping the negative case, [0.6 × {f(V1_u)} + 0.4 × ({f(V1_d)})]/1.05 = {f(NPV_vent_felle)}, "
             "is the trap: it treats waiting as a commitment to buy whatever happens.</p>"),
         "criteria": [
             f"Values each case at t = 1 with the first income at t = 1: {f(V1_u)} with the hospital and {f(V1_d)} "
             "without.",
             "Compares the bad case with 0: Kjelsnes does not buy without the hospital. Using the negative value "
             f"({f(NPV_vent_felle)} in total) is the classic error and loses 2 points.",
             f"Discounts the expectation one year: 0.6 × {f(V1_u)}/1.05 = {f(NPV_vent)} million NOK.",
             "Shows the calculation for both cases, not only the result.",
         ]},
        {"label": "c", "points": 3,
         "body": ("<p>Should Kjelsnes buy today or wait? How much is the option to wait worth, compared with buying "
                  "today?</p>"),
         "solution": (
             f"<p>Waiting is worth {f(NPV_vent)} against {f(NPV_naa)} for buying today, so <b>Kjelsnes should "
             "wait</b>, although buying today has a positive NPV.</p>"
             f"<p>Value of the option to wait = {f(NPV_vent)} − {f(NPV_naa)} = <b>{f(OPT3)} million NOK</b>. It is "
             "measured against the best alternative today, which is buying, since that NPV is positive.</p>"
             "<p>Waiting avoids locking in the garage if the hospital is not built; the price is this year's "
             "income, net of the interest saved by paying a year later.</p>"),
         "criteria": [
             f"Decision (1.5 points): wait, because {f(NPV_vent)} exceeds {f(NPV_naa)}. A positive static NPV is "
             "not enough to buy now.",
             f"Option value (1.5 points): {f(NPV_vent)} − {f(NPV_naa)} = {f(OPT3)} million NOK, measured against "
             "buying today.",
             f"Reporting the whole {f(NPV_vent)} as the value of the option earns at most half of the option-value "
             "points: the question asks for the gain over buying today. No reason is required here; (e) asks for it.",
         ]},
        {"label": "d", "points": 6,
         "body": (
             "<p>Suppose instead that the probability of the hospital is X. Write the NPV of buying today and the NPV "
             "of waiting as functions of X. Which X makes Kjelsnes indifferent between the two?</p>"),
         "solution": (
             "<p><b>Step 1. Buying today depends on X too.</b> The expected income from t = 1 is "
             "3.2X + 1.7(1 − X) = 1.7 + 1.5X:</p>"
             f"<p>NPV<sub>now</sub>(X) = −40 + 2.5 + (1.7 + 1.5X)/0.05 = <b>{f(a_naa)} + {f(b_naa)}X</b></p>"
             "<p><b>Step 2. Waiting.</b> Kjelsnes buys only with the hospital:</p>"
             f"<p>NPV<sub>wait</sub>(X) = X × {f(V1_u)}/1.05 = <b>{f(W)}X</b></p>"
             "<p><b>Step 3. Set them equal.</b></p>"
             f"<p>{f(a_naa)} + {f(b_naa)}X = {f(W)}X ⇒ X = {f(-a_naa)}/({f(b_naa)} − {f(W)}) = "
             f"{f(-a_naa)}/{f(b_naa - W)} = <b>{f(Xs)}</b></p>"
             f"<p>Below X = {f(Xs)} waiting is better; above it Kjelsnes should buy today. At X = 0.6 the two "
             f"functions give {f(a_naa + b_naa * p3)} and {f(W * p3)}, the numbers in (a) and (b), so the answer "
             f"agrees with (c): 0.6 lies below {f(Xs)} and waiting wins.</p>"
             "<p><b>Why X is above 0.6.</b> A higher X raises the NPV of buying today faster "
             f"({f(b_naa)} per unit of X) than the NPV of waiting ({f(W)} per unit). Raising X moves probability from "
             "the case without the hospital, where buying today locks in a loss and waiting gives 0, to the case "
             "with it. Buying today gains more from that shift, so the indifference point lies above 0.6.</p>"
             f"<p><b>The shortcut and the lecture.</b> Holding the NPV of buying today fixed at {f(NPV_naa)} and "
             f"solving {f(NPV_naa)} = {f(W)}X gives X = {f(X_felle)}, below 0.6. In the lecture example (recording "
             f"14, 29:46 to 30:20) the same shortcut, with the value of investing now held at {f(L_naa50, 0)}, gives "
             f"{f(L_naa50, 0)}/{f(L_W, 2)} = {f(L_X_snarvei)}: that is why the answer there was expected to lie below "
             f"0.5. With both NPVs as functions of X, the lecture example gives {f(L_a, 0)} + {f(L_b, 0)}X = "
             f"{f(L_W, 2)}X, so X = {f(L_X, 2)}; this case gives {f(Xs)}. The shortcut forgets that X also changes the "
             "expected income if you buy today. It only holds when the value of investing now does not depend on "
             "X.</p>"),
         "criteria": [
             f"NPV of buying today as a function of X: {f(a_naa)} + {f(b_naa)}X, with the income at t = 0 included.",
             f"NPV of waiting as a function of X: {f(W)}X, with the bad case set to 0.",
             f"Solves {f(a_naa)} + {f(b_naa)}X = {f(W)}X: X = {f(Xs)}. States that waiting is better below it and "
             "buying today above it.",
             f"Holding the NPV of buying today fixed at {f(NPV_naa)} gives {f(X_felle)}: wrong, since both NPVs "
             f"depend on X (the same shortcut gives an X below 0.5 in the lecture example). Leaving out the income at t = 0 gives X = {f(X_felle_t0)}, above 1, which should be "
             "caught.",
             "Bonus: checks that the functions return the values from (a) and (b) at X = 0.6.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Explain intuitively what Kjelsnes gains and what it gives up by waiting. Would the X in (d) change "
             "if the income with the hospital were NOK 4.0 million a year instead of 3.2 million? No new calculation "
             "is needed.</p>"),
         "solution": (
             "<p><b>What waiting gains.</b> Without the hospital, buying today locks Kjelsnes into a project worth "
             f"−40 + 2.5 + 1.7/0.05 = {f(a_naa)}; by waiting it walks away with 0. Waiting removes the downside, "
             f"which is worth {f(D_vinn)} in that case.</p>"
             "<p><b>What waiting costs.</b> With the hospital Kjelsnes buys under both strategies, so the only "
             "difference is the first year: by waiting it loses this year's NOK 2.5 million but pays the NOK 40 "
             f"million a year later, which saves 40 − 40/1.05 = {f(I3 - I3 / (1 + r3))}. The net cost is "
             f"{f(U_tap)}.</p>"
             f"<p>Indifference means X × {f(U_tap)} = (1 − X) × {f(D_vinn)}, which gives X = {f(D_vinn)}/"
             f"({f(D_vinn)} + {f(U_tap)}) = {f(Xs)}, the same as (d).</p>"
             "<p><b>A higher income with the hospital does not change X.</b> That income is received from t = 1 on "
             "under both strategies, so it raises both NPVs by the same amount and cancels. X depends only on this "
             "year's income, the saving from paying later and the loss avoided without the hospital.</p>"),
         "criteria": [
             "1 point: waiting avoids buying a project with a negative NPV if the hospital is not built (the option "
             "is never exercised in the bad case).",
             "1 point: the cost of waiting is this year's income of NOK 2.5 million, partly offset by paying the "
             "price a year later.",
             "1 point: X does not change, because the income with the hospital is received under both strategies "
             "from t = 1 on. «X falls because the project becomes more attractive» earns 0 for this point.",
             f"Numbers are a bonus: the loss avoided of {f(D_vinn)}, the net cost of {f(U_tap)} and "
             f"X = {f(D_vinn)}/({f(D_vinn)} + {f(U_tap)}).",
         ]},
    ],
}

# ---------------------------------------------------------------- hint3-2 n4
rader_kurs = [[f"{k}", f(KURS[k][0], 2), f(KURS[k][1], 2)] for k in STRIKES]
ex_32_4 = {
    "n": 4, "title": "Corporate securities as options", "points": 20, "topic": "Debt and equity as options",
    "chapters": [24],
    "merke": "Forelesning 13 (Options II), 1:16:02: «So this actually could be in the exam, by the way»",
    "body": (
        "<p>Lysneset Fiber ASA has 360 million shares trading at NOK 215 and no debt. Markets are perfect and "
        "there are no taxes. Lysneset considers issuing zero-coupon debt due in 27 months and paying the proceeds "
        "out to its shareholders at once, which leaves the value of the firm's assets unchanged. The risk-free "
        "rate is 3.5% a year (annual compounding).</p>"
        "<p>European calls on Lysneset shares that expire in exactly 27 months are quoted below (NOK per share). "
        "Because Lysneset has no debt today, you can treat them as calls on the firm's assets per share. Use the "
        "midpoint of bid and ask. Give values in NOK billion with 3 decimals and yields in % with 2 decimals.</p>"
        + tab(["Strike (NOK)", "Call bid", "Call ask"], rader_kurs)),
    "parts": [
        {"label": "a", "points": 4,
         "body": ("<p>Lysneset issues a single bond with face value NOK 54 billion. Which strike per share corresponds "
                  "to this debt? What are the equity and the debt worth?</p>"),
         "solution": (
             "<p><b>Step 1. Firm value and strike.</b> Without debt the shares are the whole firm: V = 360 million × "
             f"NOK 215 = NOK {f(V4, 1)} billion. After the issue the equity is a call on the assets with the face "
             f"value of the debt as strike. Per share: 54 billion/360 million = <b>NOK {f(kT, 0)}</b>. A share is "
             "1/360 million of the assets, so one call on the share with strike 150 is 1/360 million of that call "
             "on the firm.</p>"
             f"<p><b>Step 2. Equity.</b> Midpoint of the 150 call: ({f(KURS[150][0], 2)} + {f(KURS[150][1], 2)})/2 = "
             f"{f(Cm[150], 2)}. E = 0.36 billion × {f(Cm[150], 2)} = <b>NOK {f(E4, 3)} billion</b> ({f(E4)}).</p>"
             f"<p><b>Step 3. Debt.</b> D = V − E = {f(V4, 1)} − {f(E4)} = <b>NOK {f(D4, 3)} billion</b> "
             f"({f(D4)}).</p>"),
         "criteria": [
             "Strike per share = 54 billion/360 million = NOK 150, not 54 billion.",
             f"Uses the midpoint of the 150 call ({f(Cm[150], 2)}) and multiplies by 360 million shares: "
             f"E = NOK {f(E4, 3)} billion.",
             f"D = V − E = {f(V4, 1)} − {f(E4, 3)} = NOK {f(D4, 3)} billion.",
             "Bonus, no points of its own since the case states it: with no debt today a share is 1/360 million of "
             "the assets, which is why the share call can be used.",
         ]},
        {"label": "b", "points": 3,
         "body": "<p>What annual yield does the bond offer? What is its spread over the risk-free rate?</p>",
         "solution": (
             f"<p>T = 27/12 = {f(T4, 2)} years.</p>"
             f"<p>y = (54/{f(D4)})<sup>1/2.25</sup> − 1 = {f(F4 / D4)}<sup>1/2.25</sup> − 1 = <b>{pc(y4)}</b> a "
             f"year<br>Spread = {pc(y4)} − 3.50% = <b>{pc(spr4)}</b></p>"
             f"<p><b>Check.</b> The debt must be worth less than risk-free debt with the same face value: "
             f"PV(54) = 54/1.035<sup>2.25</sup> = {f(PVk(F4))} &gt; {f(D4)} ✓. The gap of NOK {f(PUT4, 3)} billion "
             "is the value of the put the creditors have written (see e). A yield below r<sub>f</sub> would reveal "
             "an error.</p>"
             f"<p><b>The traps.</b> Not annualising: 54/{f(D4)} − 1 = {pc(y4_ikke)} over 27 months. Scaling it "
             f"linearly, {pc(y4_ikke)}/2.25 = {pc(y4_lin)}, overstates the yield because returns compound. The "
             f"exponent turned the wrong way, 2.25 instead of 1/2.25, gives {pc(y4_feileks)}.</p>"),
         "criteria": [
             "Uses T = 27/12 = 2.25 years and the exponent 1/2.25 (12/27).",
             f"y = (54/{f(D4, 3)})^(1/2.25) − 1 = {pc(y4)}.",
             f"Spread = {pc(y4)} − 3.50% = {pc(spr4)}.",
             f"Not annualised ({pc(y4_ikke)}) or annualised linearly ({pc(y4_lin)}) loses the yield point.",
         ]},
        {"label": "c", "points": 6,
         "body": (
             "<p>Suppose instead that the debt is split into a senior bond with face value NOK 36 billion and a "
             "junior bond with face value NOK 18 billion, both due in 27 months. What are the senior debt, the "
             "junior debt and the equity worth?</p>"),
         "solution": (
             "<p><b>Step 1. Senior debt.</b> Pretend only the senior bond exists. Its strike per share is "
             f"36 billion/360 million = NOK {f(kS, 0)}. Everything above it, the junior debt and the equity together, "
             f"is a call with strike 100: midpoint ({f(KURS[100][0], 2)} + {f(KURS[100][1], 2)})/2 = "
             f"{f(Cm[100], 2)}, so 0.36 × {f(Cm[100], 2)} = {f(CS4)}.</p>"
             f"<p>D<sub>S</sub> = {f(V4, 1)} − {f(CS4)} = <b>NOK {f(DS4, 3)} billion</b> ({f(DS4)})</p>"
             "<p><b>Step 2. Equity.</b> The shareholders are paid after both bonds, so the strike is the total face "
             f"value, NOK {f(kT, 0)} per share as in (a): E = <b>NOK {f(E4, 3)} billion</b>, unchanged.</p>"
             "<p><b>Step 3. Junior debt.</b> The slice between the two strikes:</p>"
             f"<p>D<sub>J</sub> = 0.36 × ({f(Cm[100], 2)} − {f(Cm[150], 2)}) = {f(CS4)} − {f(E4)} = "
             f"<b>NOK {f(DJ4, 3)} billion</b> ({f(DJ4)}), the same as V − D<sub>S</sub> − E.</p>"
             + tab(["Claim", "Strike per share", "Value (NOK billion)"],
                   [["Senior debt", "V minus call at 100", f(DS4, 3)],
                    ["Junior debt", "call at 100 minus call at 150", f(DJ4, 3)],
                    ["Equity", "call at 150", f(E4, 3)],
                    ["Sum", "", f(DS4 + DJ4 + E4, 3)]])
             + f"<p><b>Check.</b> D<sub>S</sub> + D<sub>J</sub> = {f(DS4)} + {f(DJ4)} = {f(DS4 + DJ4)}, the debt in "
             "(a). That is an identity: the equity is the same call in both cases, so the total debt cannot change. "
             f"A check that can fail: each layer is worth less than risk-free debt, PV(36) = {f(PVk(FS4), 3)} &gt; "
             f"{f(DS4, 3)} and PV(18) = {f(PVk(FJ4), 3)} &gt; {f(DJ4, 3)} ✓.</p>"
             "<p><b>The trap.</b> Pricing the junior bond with the 50 call as if it were the only debt gives "
             f"{f(V4, 1)} − 0.36 × {f(Cm[50], 2)} = {f(DJ4_felle, 3)}, almost risk-free. It ignores that the senior "
             "bond is paid first.</p>"),
         "criteria": [
             f"Senior: strike 100 per share, D_S = V − 0.36 × {f(Cm[100], 2)} = {f(DS4, 3)} billion.",
             f"Equity: strike 150 per share (total face value), E = {f(E4, 3)} billion, unchanged from (a).",
             f"Junior: 0.36 × ({f(Cm[100], 2)} − {f(Cm[150], 2)}) = {f(DJ4, 3)} billion, or V − D_S − E.",
             f"Classic errors: junior priced with the 50 call ({f(DJ4_felle, 3)}), equity priced with strike 100 or "
             "50, or forgetting to multiply by the number of shares.",
             "Bonus: D_S + D_J equals the debt in (a); each layer is worth less than its risk-free PV.",
         ]},
        {"label": "d", "points": 3,
         "body": ("<p>What annual yields do the senior and the junior bond offer? Explain briefly how they compare with "
                  "the yield in (b).</p>"),
         "solution": (
             f"<p>y<sub>S</sub> = (36/{f(DS4)})<sup>1/2.25</sup> − 1 = <b>{pc(yS4)}</b><br>"
             f"y<sub>J</sub> = (18/{f(DJ4)})<sup>1/2.25</sup> − 1 = <b>{pc(yJ4)}</b></p>"
             f"<p>r<sub>f</sub> 3.50% &lt; y<sub>S</sub> {pc(yS4)} &lt; y {pc(y4)} &lt; y<sub>J</sub> {pc(yJ4)}. "
             "The senior bond is paid first and loses only if the assets end below NOK 36 billion, so it is the "
             "safest layer. The junior bond takes the losses right after the shareholders and is wiped out below "
             "NOK 36 billion, so it needs the highest yield. The single bond in (b) is a mix of the two layers, so "
             "its yield lies between them.</p>"),
         "criteria": [
             f"y_S = (36/{f(DS4, 3)})^(1/2.25) − 1 = {pc(yS4)}.",
             f"y_J = (18/{f(DJ4, 3)})^(1/2.25) − 1 = {pc(yJ4)}. Linear annualising gives {pc(yJ4_lin)} and loses "
             "the point.",
             "Ordering with the reason: the senior bond is paid first and the junior bond absorbs losses right after "
             "the shareholders; the single bond lies between the two.",
         ]},
        {"label": "e", "points": 4,
         "body": (
             "<p>Explain why the debt in (a) can be seen as a risk-free debt plus a written put on the firm's "
             "assets. Suppose the volatility of the firm's assets rises while the value of the firm's assets stays at "
             "NOK 77.4 billion (NOK 215 per share). What happens to the value of the senior debt? Can you say the "
             "same about the junior debt with certainty? What determines the sign? (No calculation needed.)</p>"),
         "solution": (
             "<p><b>Risk-free debt plus a written put.</b> At maturity the creditors receive min(V<sub>T</sub>, F) = "
             "F − max(F − V<sub>T</sub>, 0): the face value for sure, minus the payoff of a put on the assets with "
             "strike F. Limited liability gives the shareholders that put: if the assets are worth less than F, "
             "they hand them to the creditors and walk away, which is the same as selling the assets to the "
             "creditors for F. So the creditors hold a risk-free bond and have written a put to the shareholders: "
             f"D = PV(F) − Put. In (a) the put is worth {f(PVk(F4))} − {f(D4)} = NOK {f(PUT4, 3)} billion.</p>"
             "<p><b>Senior debt: it falls.</b> The senior debt is PV(36) minus a put with strike NOK 36 billion "
             "(100 per share). A put gains value with volatility, so the senior debt <b>loses value</b>.</p>"
             "<p><b>Junior debt: not with certainty.</b> The junior debt is a call with strike 100 per share minus a "
             "call with strike 150 per share (36 and 54 billion for the firm). Both calls gain value with volatility, "
             "so the sign depends on which gains more. That depends on where the assets lie relative to the two "
             "strikes. Below the junior range the junior bond would behave like equity and gain. Here the assets are "
             "worth NOK 215 per share, above the whole range from 100 to 150, so the junior bond behaves like risky "
             "debt and <b>most likely loses value</b>.</p>"
             "<p><b>Why, from the quotes.</b> Volatility acts on an option's time value (its price minus "
             "S − PV(K)), which is largest close to the money. At strike 100 the time value is "
             f"{f(Cm[100], 2)} − (215 − {f(PVk(kS))}) = {f(TV100, 2)} per share; at strike 150 it is {f(Cm[150], 2)} − "
             f"(215 − {f(PVk(kT))}) = {f(TV150, 2)}. By put-call parity these are the prices of the puts with the "
             f"same strikes (0.36 × {f(TV150, 2)} = {f(PUT4, 3)}, the put above). The call the junior holders are "
             "short (150) carries far more time value than the call they are long (100), so it gains more when "
             "volatility rises. The equity, a call at 150, gains: with V fixed, what the creditors lose the "
             "shareholders gain, a wealth transfer.</p>"
             "<p><b>The numbers behind it (not required).</b> The sign for the junior debt is certain only within a "
             f"model. Under the lognormal model behind the quotes (Black-Scholes at about {f(100 * SIG4, 0)}% "
             f"volatility, for reference only), a volatility of {f(100 * SIG_H, 0)}% moves the senior debt from "
             f"{f(DS_l, 2)} to {f(DS_h, 2)}, the junior debt from {f(DJ_l, 2)} to {f(DJ_h, 2)} and the equity from "
             f"{f(E_l, 2)} to {f(E_h, 2)} NOK billion.</p>"
             "<p><b>Grading the junior part.</b> «It depends on where the assets are» with the call-spread reason "
             "earns half of the junior point; the full point also settles the sign here. Kurbatov's wording for the "
             "first part is «a risk-free debt plus a written put on assets» (recording 18, 1:03:55); D = PV(F) − P "
             "says the same.</p>"),
         "criteria": [
             "2 points for the put: the creditors' payoff is min(V, F) = F − max(F − V, 0), a risk-free bond minus a "
             "put on the assets with strike F, which the creditors have written to the shareholders through "
             "limited liability.",
             "1 point for the senior debt: it falls, because the put it has written gains value with volatility.",
             "1 point for the junior debt: not with certainty, since it is a long call at 100 and a short call at 150 "
             "per share and both gain; the sign depends on where the assets lie. Full point for «it depends on where "
             "the assets are; here they lie above the junior range, so the junior debt behaves like debt and falls» "
             "with that reason. «It depends» with the call-spread reason but no sign for this case earns 0.5, as "
             "does «it falls, like debt» without saying why the sign is not certain.",
             f"Bonus: the time-value argument from the quotes ({f(TV100, 2)} per share at strike 100 against "
             f"{f(TV150, 2)} at 150, the put prices from put-call parity). No Black-Scholes calculation is expected; "
             "saying that the equity gains and the total stays at V is also a bonus.",
         ]},
    ],
}

SETT = {
    "hint3-1": [ex_31_1, ex_31_2],
    "hint3-2": [ex_32_1, ex_32_2, ex_32_3, ex_32_4],
}


# ======================================================================
#                              SVAR-DATA
# ======================================================================
def t(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


SVAR = {
    "hint3-1:1:": {"type": "tekst"},
    "hint3-1:2:": {"type": "tekst"},
    "hint3-2:1:": {"type": "tekst"},
    "hint3-2:2:": {"type": "tekst"},
    # n3
    "hint3-2:3:a": {"type": "tall", "tall": [t("NPV of buying today", NPV_naa, "NOK m")],
                    "merknad": f"Uten inntekten i t = 0 blir NPV {NPV_naa_felle:.4f}; det avvises."},
    "hint3-2:3:b": {"type": "tall", "tall": [
        t("NPV at t = 1, hospital", V1_u, "NOK m"),
        t("NPV at t = 1, no hospital", V1_d, "NOK m"),
        t("NPV of waiting (t = 0)", NPV_vent, "NOK m")],
        "merknad": f"Med den negative grenen beholdt blir NPV av å vente {NPV_vent_felle:.4f}; det avvises."},
    "hint3-2:3:c": {"type": "blandet", "tall": [t("Value of the option to wait", OPT3, "NOK m")],
                    "tallPoeng": 1.5, "tekstLedd": "Should Kjelsnes buy today or wait?"},
    "hint3-2:3:d": {"type": "blandet", "tall": [t("X (indifference)", Xs, "")], "tallPoeng": 3,
                    "tekstLedd": "Write the NPV of buying today and the NPV of waiting as functions of X.",
                    "merknad": (f"Kurbatovs hurtigregel (NPV nå holdt fast på {NPV_naa:.1f}) gir {X_felle:.4f} og "
                                f"avvises; begge NPV-ene avhenger av X. Uten inntekten i t = 0 blir X {X_felle_t0:.4f}.")},
    "hint3-2:3:e": {"type": "tekst"},
    # n4
    "hint3-2:4:a": {"type": "tall", "tall": [
        t("Strike per share", kT, "NOK"),
        t("Equity", E4, "NOK bn", alt=[E4 * 1000]),
        t("Debt", D4, "NOK bn", alt=[D4 * 1000])],
        "merknad": ("Strike 150 står i kurstabellen i oppgaveteksten; det er meningen, studenten skal finne raden. "
                    "alt er de samme verdiene i NOK millioner.")},
    "hint3-2:4:b": {"type": "tall", "tall": [
        t("Annual yield", 100 * y4, "%"), t("Spread over r<sub>f</sub>", 100 * spr4, "%")],
        "merknad": f"Ikke annualisert ({100 * y4_ikke:.2f} %) og lineært ({100 * y4_lin:.2f} %) avvises."},
    "hint3-2:4:c": {"type": "tall", "tall": [
        t("Senior debt", DS4, "NOK bn", alt=[DS4 * 1000]),
        t("Junior debt", DJ4, "NOK bn", alt=[DJ4 * 1000]),
        t("Equity", E4, "NOK bn", alt=[E4 * 1000])],
        "merknad": f"Junior priset med call 50 gir {DJ4_felle:.3f}; det avvises."},
    "hint3-2:4:d": {"type": "blandet", "tall": [
        t("Senior yield", 100 * yS4, "%"), t("Junior yield", 100 * yJ4, "%")],
        "tallPoeng": 2, "tekstLedd": "Explain briefly how they compare with the yield in (b)."},
    "hint3-2:4:e": {"type": "tekst"},
}
LEKK_OK = {("hint3-2:4:a", "Strike per share")}


# ======================================================================
#                              KONTROLL
# ======================================================================
feil = []


def ren(h):
    s = re.sub(r"<[^>]*>", " ", str(h)).replace("&minus;", "−").replace("&nbsp;", " ")
    s = s.replace("&gt;", ">").replace("&lt;", "<")
    return re.sub(r"&[a-z]+;", " ", s)


def tall_i(tekst):
    s = ren(tekst).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", s):
        x = float(m.group(0).replace(",", ""))
        ut += [x, abs(x)]
    return ut


def innenfor(n, v, d):
    return abs(n - v) <= max(d.get("abs", 0), d.get("tol", 0.01) * abs(v), 1e-9)


def alle(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from alle(v)
    elif isinstance(o, list):
        for v in o:
            yield from alle(v)


for sid, liste in SETT.items():
    for ex in liste:
        hvor = f"{sid} oppgave {ex['n']}"
        for k in ("n", "title", "points", "topic", "chapters", "body", "merke"):
            if k not in ex:
                feil.append(f"{hvor}: mangler {k}")
        if not ex["merke"].startswith("Forelesning "):
            feil.append(f"{hvor}: merket har feil form")
        deler = ex.get("parts")
        if deler:
            if ex["points"] != 20 or sum(p["points"] for p in deler) != 20:
                feil.append(f"{hvor}: poengene summerer ikke til 20")
            if deler[0]["points"] > 4:
                feil.append(f"{hvor}: del a er tung")
            nøkler = [(f"{sid}:{ex['n']}:{p['label']}", p) for p in deler]
        else:
            if ex["points"] != 10:
                feil.append(f"{hvor}: teorioppgaven har ikke 10 poeng")
            if not 3 <= len(ex["criteria"]) <= 7:
                feil.append(f"{hvor}: {len(ex['criteria'])} kriterier")
            nøkler = [(f"{sid}:{ex['n']}:", ex)]
        for k, p in nøkler:
            if deler and not 3 <= len(p["criteria"]) <= 7:
                feil.append(f"{k}: {len(p['criteria'])} kriterier")
            for c in p["criteria"]:
                if re.search(r"<[a-zA-Z/!]|&[a-z#0-9]+;", c):
                    feil.append(f"{k}: markup i kriterium")
            if k not in SVAR:
                feil.append(f"mangler svar-data {k}")
                continue
            d = SVAR[k]
            if d["type"] == "blandet" and not 0 < d["tallPoeng"] < p["points"]:
                feil.append(f"{k}: tallPoeng")
            nums = tall_i(" ".join([p["solution"], " ".join(p["criteria"])]))
            for tt in d.get("tall", []):
                kand = [tt["verdi"]] + tt.get("alt", [])
                ok = any(innenfor(n, v, tt) or (tt["enhet"] == "%" and innenfor(n * 100, v, tt))
                         for v in kand for n in nums)
                if not ok and not tt.get("regnet"):
                    feil.append(f"{k}: {tt['navn']} = {tt['verdi']} står ikke i løsningen")
                if abs(tt["verdi"]) < 1e-6 and "abs" not in tt:
                    feil.append(f"{k}: verdien er 0 uten abs")
for k in SVAR:
    sid, n, lab = k.split(":")
    if sid not in SETT or not any(str(e["n"]) == n for e in SETT[sid]):
        feil.append(f"svar-data uten oppgave: {k}")

# lekkasje: svarene skal ikke stå i oppgaveteksten til samme oppgave
for sid, liste in SETT.items():
    for ex in liste:
        tekst = ren(ex["body"]) + " " + " ".join(ren(p["body"]) for p in ex.get("parts", []))
        tall_tekst = tall_i(tekst)
        for p in ex.get("parts", []):
            k = f"{sid}:{ex['n']}:{p['label']}"
            for tt in SVAR[k].get("tall", []):
                v = tt["verdi"]
                if (k, tt["navn"]) in LEKK_OK:
                    continue
                if abs(v) > 1e-6 and any(abs(n - v) <= 1e-4 * abs(v) for n in tall_tekst):
                    feil.append(f"{k}: svaret {v} står i oppgaveteksten")

for s in list(alle(SETT)) + list(alle(SVAR)):
    r = re.sub(r"</?(sub|sup|b|i)>", "", s)
    if "—" in r or "&mdash;" in r:
        feil.append(f"tankestrek: {r[:60]}")
    m = re.search(r",\s+and\b", r)
    if m:
        feil.append(f"komma før and: {r[max(0, m.start() - 50):m.end() + 10]}")
    m = re.search(r",\s+og\b", r)
    if m:
        feil.append(f"komma før og: {r[max(0, m.start() - 50):m.end() + 10]}")
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"pronomen om Kurbatov: {r[:80]}")
    if s.count("<p>") != s.count("</p>") or s.count("<b>") != s.count("</b>") or s.count("<tr>") != s.count("</tr>"):
        feil.append(f"ubalanserte tagger: {s[:60]}")
    if re.search(r"\b(nan|inf)\b", s):
        feil.append(f"nan/inf: {s[:60]}")
    if "–" in s:
        feil.append(f"tankestrek (en dash): {s[:60]}")
for sid, liste in SETT.items():
    for s in alle(liste):
        for m in re.finditer(r"(?:^|[\s(=])-\d", ren(s)):
            feil.append(f"{sid}: bindestrek som minus: …{ren(s)[max(0, m.start() - 30):m.end() + 10]}…")

# lengde: rundt 11 ord oppgavetekst per poeng
print("\nOrd i oppgaveteksten:")
for sid, liste in SETT.items():
    for ex in liste:
        ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex.get("parts", []))).split())
        print(f"   {sid} n{ex['n']}: {ord_} ord ({ord_ / ex['points']:.1f} per poeng)")
        lo, hi = (80, 200) if ex["points"] == 10 else (150, 340)
        if not lo <= ord_ <= hi:
            feil.append(f"{sid} oppgave {ex['n']}: {ord_} ord")

if feil:
    print("\nFEIL, ingenting ble skrevet:")
    for x in feil:
        print("  ", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=1)
with open(UT_SVAR, "w", encoding="utf-8") as fh:
    json.dump(SVAR, fh, ensure_ascii=False, indent=1)
print(f"\nSkrev {UT} og {UT_SVAR}: {sum(len(v) for v in SETT.values())} oppgaver, {len(SVAR)} svar-oppføringer.")
