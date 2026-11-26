"""Skribent W3: «Må kunne» (FIE402), type `vente`: realopsjon, investere nå eller vente.

Kjør fra hvor som helst:  python3 -I fag/fie402/_mk/w3_regn.py

Oppdraget står i docs/fie402-mk-spek.md (raden `vente`). Tre hele oppgaver på 20 poeng:

- mk-vente-1: forelesningsformen (forelesning 14, 17:06 til 30:40). Olivengård i Portugal, EUR.
  Produksjonen starter nå (første salg i t = 0), pris i dag, høy eller lav pris fra t = 1 for
  alltid, reelle sannsynligheter (35 %), r_f fordi risikoen ikke er systematisk. NPV nå, NPV i
  hver tilstand ved å vente (lav mot 0), NPV av å vente og opsjonsverdien, indifferent X (begge
  sidene avhenger av X; konvensjonen står i teksten), hale: hva en høyere rente gjør med X.
- mk-vente-2: H2025 E5-formen. Kantine på Forus, NOK. Inntekt minus driftskostnad, evigrente fra
  år 1, 50/50. NPV nå er positiv og gir åpning i begge tilstander, så å vente er dårligere.
  Konstruksjonsledd: spredningen X (samme forventning) som gir indifferens, med sjekk av at den
  dårlige tilstanden faktisk blir ulønnsom. Hale: en konkurrent som kan komme først (14, 31:31).
- mk-vente-3: H2024 E6-formen med tillegget fra forelesning 14 (1:05:41 til 1:16:09). Datasenter
  leid ut til et amerikansk forbundsorgan, USD. Leien er risikofri og slutter i år 15 uansett når
  senteret bygges (16 mot 17-fella), rentetre, ρ fra en omsatt statsannuitet, opsjonsverdi.
  Hale: «what if σ is very low?» (14, 46:34), bare intuisjon.

Skriptet regner alle tall, asserter sjekkene og skriver w3.json og w3_svar.json i samme mappe.
Brytes en skriveregel, mangler et svar-tall i løsningen eller lekker et svar i oppgaveteksten,
skrives ingenting.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "w3.json")
UT_SVAR = os.path.join(HER, "w3_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def A(n, r):
    """Annuitetsfaktor: n betalinger, den første om ett år."""
    return (1 - (1 + r) ** -n) / r


def ulik(svar, *feller, tol=0.01):
    """En felle må ligge minst to ganger toleransen fra svaret (docs/fie402-ov-spek.md § 6b.1)."""
    for fe in feller:
        assert abs(fe - svar) > 2 * tol * max(abs(svar), 1e-9), (svar, fe)


# ================================================================== mk-vente-1
# Olivengård. Produksjon fra i dag: 1 200 tonn selges i t = 0 til dagens pris, deretter
# 1 200 tonn ved slutten av hvert år til prisen fra t = 1 (høy eller lav) for alltid.
I1 = 52.0            # EUR mill., betales med en gang
Q = 1200             # tonn per år
P0, PU, PD = 4500, 7750, 2750   # EUR per tonn
p1 = 0.35            # sannsynligheten for høy pris
r1 = 0.08
c0, cu, cd = Q * P0 / 1e6, Q * PU / 1e6, Q * PD / 1e6
Ec = p1 * cu + (1 - p1) * cd
assert abs(Ec - c0) < 1e-12          # forventet pris fra t = 1 er lik dagens pris
pv_perp = Ec / r1
now1 = -I1 + c0 + pv_perp
now1_felle_t0 = -I1 + pv_perp        # glemmer salget i t = 0
gu1 = -I1 + cu + cu / r1             # NPV i t = 1, høy pris
gd1 = -I1 + cd + cd / r1             # NPV i t = 1, lav pris
gu1_0 = gu1 / (1 + r1)
assert now1 > 0 and gu1 > 0 and gd1 < 0
wait1 = p1 * max(gu1, 0) / (1 + r1) + (1 - p1) * max(gd1, 0) / (1 + r1)
wait1_felle_neg = (p1 * gu1 + (1 - p1) * gd1) / (1 + r1)
assert abs(wait1_felle_neg - now1 / (1 + r1)) < 1e-9   # forpliktet venting = prosjektet ett år senere
opt1 = wait1 - max(now1, 0)
assert wait1 > now1 and opt1 > 0
# andre utregning av gode tilstand sett fra t = 0
assert abs(gu1_0 - (-I1 / (1 + r1) + cu / r1)) < 1e-9
# d) indifferent X: NPV_nå(X) = a + bX, NPV_vent(X) = gu1_0 X
a_now = -I1 + c0 + cd / r1
b_now = (cu - cd) / r1
X1 = a_now * -1 / (b_now - gu1_0)
assert 0 < X1 < 1 and X1 > p1
assert abs((a_now + b_now * p1) - now1) < 1e-9 and abs(gu1_0 * p1 - wait1) < 1e-9
G1 = c0 - (I1 - I1 / (1 + r1))       # kostnaden ved å vente i høy tilstand
L1 = -a_now                          # tapet som unngås i lav tilstand
assert abs(L1 / (G1 + L1) - X1) < 1e-12
X1_felle_fast = now1 / gu1_0         # NPV nå holdt fast
ulik(X1, X1_felle_fast)
ulik(now1, now1_felle_t0)
ulik(wait1, wait1_felle_neg)
# e) høyere rente (10 %): X øker
r1h = 0.10
G1h = c0 - (I1 - I1 / (1 + r1h))
L1h = I1 - c0 - cd / r1h
X1h = L1h / (G1h + L1h)
assert G1h < G1 and L1h > L1 and X1h > X1 and X1h < 1
assert (-I1 + c0 + Ec / r1h) > 0     # NPV nå er fortsatt positiv ved 10 %
# reserveverdi for c) og d): NPV i t = 1 ved høy pris for den som ikke fikk til b)
RES1 = 70.0
ulik(gu1, RES1)
wait1_res = p1 * RES1 / (1 + r1)
opt1_res = wait1_res - now1
X1_res = -a_now / (b_now - RES1 / (1 + r1))
assert 0 < X1_res < 1 and opt1_res > 0
ulik(wait1, wait1_res)
ulik(opt1, opt1_res)
ulik(X1, X1_res, X1_felle_fast)

# ================================================================== mk-vente-2
# Kantine på Forus. Evigrente fra ett år etter åpning, 50/50, ingen exit.
I2, K2 = 6.0, 1.5            # NOK mill.
RH, RL = 2.3, 1.9            # inntekt per år
r2 = 0.06
Rbar = 0.5 * (RH + RL)
m2 = Rbar - K2               # forventet netto kontantstrøm
nh, nl = RH - K2, RL - K2
pv2 = m2 / r2
now2 = pv2 - I2
gh2 = nh / r2 - I2           # NPV i t = 1
gl2 = nl / r2 - I2
assert now2 > 0 and gh2 > 0 and gl2 > 0    # åpner i begge tilstander
wait2 = 0.5 * (max(gh2, 0) + max(gl2, 0)) / (1 + r2)
assert abs(wait2 - now2 / (1 + r2)) < 1e-12 and wait2 < now2
diff2 = now2 - wait2
tapt_cf = m2 / (1 + r2)
spart = I2 - I2 / (1 + r2)
assert abs(tapt_cf - spart - diff2) < 1e-12
# d) spredning X: (Rbar ± X). Lav tilstand ulønnsom når m2 − X < r2·I2, dvs. X > grense.
grense2 = m2 - r2 * I2
assert abs(grense2 - r2 * now2) < 1e-12
s0 = RH - Rbar
assert s0 < grense2                # utgangspunktet: begge tilstander lønnsomme
X2 = r2 * (I2 + 2 * (1 + r2) * now2) - m2
assert abs(X2 - r2 * (1 + 2 * r2) * now2) < 1e-12
assert X2 > grense2 > s0
gh2X = (m2 + X2) / r2 - I2
gl2X = (m2 - X2) / r2 - I2
assert gl2X < 0 and abs(0.5 * gh2X / (1 + r2) - now2) < 1e-12
rhs2 = now2 * 2 * (1 + r2)
X2_felle_udiskontert = r2 * (I2 + 2 * now2) - m2   # glemmer å diskontere fra t = 1
assert abs(X2_felle_udiskontert - grense2) < 1e-12
ulik(X2, X2_felle_udiskontert)

# ================================================================== mk-vente-3
# Datasenter. Leie L per år i år 1..T hvis bygget nå, år 2..T hvis bygget i t = 1.
I3, L3, T3 = 51.0, 5.0, 15
y3 = 0.06                    # flat rente i dag, også fra år 0 til år 1
ru3, rd3 = 0.035, 0.075      # renten fra år 1 for alle løpetider
A15 = A(T3, y3)
pv3 = L3 * A15
now3 = pv3 - I3
A14u, A14d, A14y = A(T3 - 1, ru3), A(T3 - 1, rd3), A(T3 - 1, y3)
pvu1, pvd1 = L3 * A14u, L3 * A14d
gu3, gd3 = pvu1 - I3, pvd1 - I3
gu3_0, gd3_0 = gu3 / (1 + y3), gd3 / (1 + y3)
assert now3 < 0 and gu3 > 0 and gd3 < 0
# tvillingen: statsobligasjon som betaler 100 i år 1..15
S0 = 100 * A15
Su = 100 + 100 * A14u
Sd = 100 + 100 * A14d
ce = (1 + y3) * S0
rho = (ce - Sd) / (Su - Sd)
assert 0.2 < rho < 0.5
rho_ut = (rho * Su + (1 - rho) * Sd) / (1 + y3)
assert abs(rho_ut - S0) < 1e-9
# samme ρ med strømmen opsjonen leverer (år 2..15), priset i dag med flat 6 %
S0b = pv3 - L3 / (1 + y3)
rho_b = ((1 + y3) * S0b - pvd1) / (pvu1 - pvd1)
assert abs(rho_b - rho) < 1e-12
# feller
rho_felle_uten100 = (ce - 100 * A14d) / (100 * A14u - 100 * A14d)
rho_felle_blandet = ((1 + y3) * pv3 - pvd1) / (pvu1 - pvd1)
assert abs(rho_felle_uten100 - rho_felle_blandet) < 1e-12
rho_felle_uten_rf = (S0 - Sd) / (Su - Sd)
ulik(rho, rho_felle_uten100, rho_felle_uten_rf)
gu3_felle15 = L3 * A(T3, ru3) - I3                    # 15 betalinger etter å vente
ulik(gu3, gu3_felle15)
ulik(gu3_0, gu3 / (1 + ru3))                          # første år med 3,5 % i stedet for 6 %
ulik(gd3_0, gd3 / (1 + rd3), tol=0.005)   # svar-dataene bruker tol 0,5 % her
C3 = rho * max(gu3, 0) / (1 + y3) + (1 - rho) * max(gd3, 0) / (1 + y3)
assert abs(C3 - rho * gu3_0) < 1e-12 and C3 > 0 > now3
RHO_RESERVE = 0.40                    # oppgis i d) for den som ikke fikk til c)
RES3 = 4.0                            # oppgis i d) for den som ikke fikk til b): NPV i t = 1 ved 3,5 %
ulik(rho, RHO_RESERVE)
ulik(gu3, RES3)
C3_reserve = RHO_RESERVE * gu3_0
C3_alt = [C3_reserve, rho * RES3 / (1 + y3), RHO_RESERVE * RES3 / (1 + y3)]
ulik(C3, *C3_alt)
C3_felle_neg = C3 - now3              # målt mot den negative NPV-en i stedet for 0
# replikasjon med tvillingen som kontroll av regningen
delta = (max(gu3, 0) - max(gd3, 0)) / (Su - Sd)
B = (max(gd3, 0) - Sd * delta) / (1 + y3)
assert abs(S0 * delta + B - C3) < 1e-9
pv14y = L3 * A14y
assert pv14y < I3          # lav σ: strømmen om ett år verdt omtrent dagens nivå, under kostnaden

# ================================================================== tekst
def P(*avsnitt):
    return "".join(f"<p>{a}</p>" for a in avsnitt)


def tabell(hode, rader):
    h = "<tr>" + "".join(f"<th>{x}</th>" for x in hode) + "</tr>"
    r = ""
    for rad in rader:
        r += "<tr>" + "".join(
            f'<td class="n">{x}</td>' if i > 0 else f"<td>{x}</td>" for i, x in enumerate(rad)) + "</tr>"
    return f'<table class="data">{h}{r}</table>'


E = "EUR million"
N = "NOK million"
U = "USD million"

# ------------------------------------------------------------------ oppgave 1
ex1 = {
    "n": 1,
    "title": "Real options",
    "points": 20,
    "topic": "Real options, option to wait",
    "chapters": [25],
    "merke": "Samme form som det første venteeksemplet i forelesning 14 (17:06 til 30:40)",
    "body": P(
        "Lusoliva SA can buy an olive estate in the Alentejo, Portugal, for EUR 52 million, paid at "
        "once. It yields 1,200 tonnes of olive oil a year forever, starting now: this year's oil is "
        "already pressed, so Lusoliva sells 1,200 tonnes immediately (at t = 0) and then 1,200 tonnes "
        "at the end of every year (t = 1, 2, 3, …).",
        "Olive oil sells at EUR 4,500 per tonne today. At t = 1 the price becomes EUR 7,750 "
        "(probability 35%) or EUR 2,750 (probability 65%) per tonne and stays there forever. Oil sold "
        "at t = 0 fetches today's price, all later oil the price from t = 1. Prices are net of all "
        "costs. The price risk is unrelated to the stock market, so discount at the risk-free rate of "
        "8%. Use 4 decimal places."),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P("What is the NPV of buying the estate today?"),
            "solution": P(
                f"<b>Step 1. The timeline.</b> At t = 0 Lusoliva pays 52 and sells this year's oil at "
                f"once: 1,200 × 4,500 = EUR {f(c0, 1)} million, not discounted. From t = 1 it sells "
                f"1,200 tonnes a year forever at the price from t = 1, which is 7,750 or 2,750 "
                f"(EUR {f(cu, 1)} million or EUR {f(cd, 1)} million a year).",
                f"Expected cash flow from t = 1: 0.35 × {f(cu, 1)} + 0.65 × {f(cd, 1)} = "
                f"{f(p1 * cu)} + {f((1 - p1) * cd)} = <b>{f(Ec)}</b> {E} a year",
                f"<b>Step 2. Value it.</b> The stream from t = 1 is a perpetuity whose first payment comes "
                f"in one year, worth C/r today: {f(Ec)}/0.08 = <b>{f(pv_perp)}</b>.",
                f"NPV<sub>now</sub> = −52 + {f(c0, 1)} + {f(pv_perp)} = <b>{f(now1)} {E}</b>",
                f"The static NPV is positive. Leaving out the oil sold at t = 0 gives −52 + {f(pv_perp)} = "
                f"{f(now1_felle_t0)}: the first unit comes now, not in a year (recording 14, 19:47). Here "
                f"the expected price from t = 1 equals today's price, so valuing all oil at EUR 4,500 gives "
                f"the same {f(now1)}."),
            "criteria": [
                f"Includes the EUR {f(c0, 1)} million sold at t = 0, undiscounted, because production starts now. "
                f"Leaving it out gives {f(now1_felle_t0)}, the year-zero trap from the lecture (recording 14, 19:47).",
                f"Expected cash flow from t = 1 of {f(Ec)} a year, valued as a perpetuity from t = 1: "
                f"{f(Ec)}/0.08 = {f(pv_perp)}.",
                f"NPV = −52 + {f(c0, 1)} + {f(pv_perp)} = {f(now1)} {E}.",
                "Shows the timeline or the calculation, not only the result.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P(
                "The owner also offers Lusoliva the right to buy in exactly one year for the same EUR 52 "
                "million; the owner keeps the oil until then. If Lusoliva waits, it pays at t = 1 and sells its "
                "first 1,200 tonnes at once (at t = 1). What is the NPV at t = 1 of buying in each state? "
                "Would Lusoliva buy in each state?"),
            "solution": P(
                "Value each state at t = 1, when the price is known. The first oil is again sold at once, "
                "so the value at t = 1 is −52 + C + C/0.08, with C = 1,200 × price.")
            + tabell(["State at t = 1", "C", "Calculation", "NPV at t = 1", "Decision"], [
                ["High, EUR 7,750", f(cu, 1), f"−52 + {f(cu, 1)} + {f(cu, 1)}/0.08 = −52 + {f(cu, 1)} + {f(cu / r1)}",
                 f"<b>{f(gu1)}</b>", "buy"],
                ["Low, EUR 2,750", f(cd, 1), f"−52 + {f(cd, 1)} + {f(cd, 1)}/0.08 = −52 + {f(cd, 1)} + {f(cd / r1)}",
                 f"<b>{f(gd1)}</b>", "do not buy: 0"],
            ])
            + P(
                f"At the low price Lusoliva would pay 52 for oil worth {f(cd + cd / r1)}, so it walks away: "
                f"that state is worth <b>0</b>, not {f(gd1)}. At the high price it buys.",
                f"Seen from t = 0 the high state is worth {f(gu1)}/1.08 = {f(gu1_0)}. The same number follows "
                f"from −52/1.08 + {f(cu, 1)}/0.08 = {f(-I1 / (1 + r1))} + {f(cu / r1)} = {f(gu1_0)}: both the "
                "outlay and the first sale move one year, so the oil from t = 1 is a perpetuity starting in one "
                "year (recording 14, 21:50)."),
            "criteria": [
                f"Values each state at t = 1 with the first oil sold at t = 1: {f(gu1)} at the high price and "
                f"{f(gd1)} at the low price.",
                "Moves both the outlay and the first sale one year. Keeping the first sale or the outlay at t = 0 is wrong.",
                f"Compares the low state with 0: Lusoliva does not buy at the low price, so that state is worth 0, "
                f"not {f(gd1)}.",
                "States the decision in each state: buy at EUR 7,750, do not buy at EUR 2,750.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": P(
                "What is the NPV of waiting, seen from t = 0? Should Lusoliva buy today or wait? How much is "
                "the option to wait worth compared with buying today? (If you could not solve (b), use an NPV "
                "at t = 1 of EUR 70 million at the high price.)"),
            "solution": P(
                "<b>Step 1. NPV of waiting.</b> Lusoliva buys only at the high price. Discount the "
                "expectation one year at 8%:",
                f"NPV<sub>wait</sub> = [0.35 × {f(gu1)} + 0.65 × 0]/1.08 = {f(p1 * gu1)}/1.08 = "
                f"<b>{f(wait1)} {E}</b>",
                f"<b>Step 2. Decision.</b> {f(wait1)} &gt; {f(now1)}, so <b>Lusoliva should wait</b>, although "
                "buying today has a positive NPV. Buying today and waiting exclude each other, so the right "
                "comparison is between the two, not with 0.",
                "<b>Step 3. Value of the option to wait</b>, measured against the best alternative today, which "
                "is buying (positive NPV):",
                f"{f(wait1)} − {f(now1)} = <b>{f(opt1)} {E}</b>",
                f"Keeping the low state at {f(gd1)} gives [0.35 × {f(gu1)} + 0.65 × ({f(gd1)})]/1.08 = "
                f"{f(wait1_felle_neg)}: that treats waiting as a promise to buy whatever happens. It is simply "
                f"{f(now1)}/1.08, the project of (a) one year later, so it can never beat buying today.",
                f"With the fallback of 70 from (b): NPV<sub>wait</sub> = 0.35 × 70/1.08 = {f(wait1_res)} and the "
                f"option value is {f(wait1_res)} − {f(now1)} = {f(opt1_res)}. The decision is the same."),
            "criteria": [
                f"NPV of waiting = 0.35 × {f(gu1)}/1.08 = {f(wait1)} {E}, with the low state set to 0.",
                f"Decision: wait, because {f(wait1)} is more than {f(now1)}. A positive NPV today is not enough "
                "to buy today when waiting is worth more.",
                f"Option value = {f(wait1)} − {f(now1)} = {f(opt1)} {E}, measured against buying today. "
                f"Reporting {f(wait1)} as the option value earns at most half of these points.",
                f"Keeping the negative low state ({f(wait1_felle_neg)}) is the classic error.",
                f"With the fallback of 70 from (b): {f(wait1_res)} and {f(opt1_res)}, full marks.",
            ],
        },
        {
            "label": "d", "points": 5,
            "body": P(
                "Suppose instead that the probability of the high price is X, with today's price and the "
                "two prices at t = 1 unchanged. For which X is Lusoliva indifferent between buying today "
                "and waiting? (If you could not solve (b), use an NPV at t = 1 of EUR 70 million at the "
                "high price.)"),
            "solution": P(
                f"<b>Step 1. Buying today depends on X too.</b> The expected cash flow from t = 1 is "
                f"{f(cu, 1)}X + {f(cd, 1)}(1 − X) = {f(cd, 1)} + {f(cu - cd, 1)}X, so",
                f"NPV<sub>now</sub>(X) = −52 + {f(c0, 1)} + ({f(cd, 1)} + {f(cu - cd, 1)}X)/0.08 = "
                f"{f(-I1 + c0, 1)} + {f(cd / r1)} + {f(b_now)}X = <b>{f(a_now)} + {f(b_now)}X</b>",
                "<b>Step 2. Waiting.</b> Lusoliva buys only at the high price:",
                f"NPV<sub>wait</sub>(X) = X × {f(gu1)}/1.08 = <b>{f(gu1_0)}X</b>",
                "<b>Step 3. Set them equal.</b>",
                f"{f(a_now)} + {f(b_now)}X = {f(gu1_0)}X ⇒ X = {f(-a_now)}/({f(b_now)} − {f(gu1_0)}) = "
                f"{f(-a_now)}/{f(b_now - gu1_0)} = <b>{f(X1)}</b>",
                f"Below X = {f(X1)} Lusoliva should wait; above it, buy today. Check: at X = 0.35 the two "
                f"functions give {f(a_now)} + {f(b_now * p1)} = {f(now1)} and {f(gu1_0 * p1)}, the numbers "
                "from (a) and (c).",
                f"<b>The same answer from what waiting gains and costs.</b> At the low price, buying today "
                f"locks in −52 + {f(c0, 1)} + {f(cd, 1)}/0.08 = {f(a_now)}, which waiting avoids. At the high "
                f"price Lusoliva buys under both plans, so waiting only costs this year's oil, {f(c0, 1)}, less "
                f"the saving from paying a year later, 52 − 52/1.08 = {f(I1 - I1 / (1 + r1))}: net {f(G1)}. "
                f"Indifference: X × {f(G1)} = (1 − X) × {f(L1)}, so X = {f(L1)}/{f(G1 + L1)} = {f(X1)}.",
                f"<b>The shortcut to avoid.</b> Holding the NPV of buying today at {f(now1)} and solving "
                f"{f(now1)} = {f(gu1_0)}X gives {f(X1_felle_fast)}. That forgets that X also changes the "
                "expected price if Lusoliva buys today. It even lies below 0.35, where waiting was already "
                "better.",
                "<b>The lecture remark.</b> In the lecture example Kurbatov expected X to lie "
                "\"somewhere lower than 0.5\" (recording 14, 30:06). That holds only if the NPV of investing now "
                "stays fixed, as it would if buying today locked in today's price forever. This text rules that "
                "out: all oil after t = 0 sells at the price from t = 1, so the NPV of buying today moves with X.",
                f"With the fallback of 70 from (b): NPV<sub>wait</sub>(X) = X × 70/1.08 = {f(RES1 / (1 + r1))}X and "
                f"X = {f(-a_now)}/({f(b_now)} − {f(RES1 / (1 + r1))}) = {f(X1_res)}."),
            "criteria": [
                f"NPV of buying today as a function of X: {f(a_now)} + {f(b_now)}X, with the oil sold at t = 0 included.",
                f"NPV of waiting as a function of X: {f(gu1_0)}X, with the low state set to 0. These points are "
                "given even if the student then holds the NPV of buying today fixed.",
                f"Solves {f(a_now)} + {f(b_now)}X = {f(gu1_0)}X: X = {f(X1)}.",
                f"Holding the NPV of buying today fixed at {f(now1)} gives {f(X1_felle_fast)}: wrong here, because "
                "the text says that all oil after t = 0 sells at the price from t = 1, so both NPVs depend on X. "
                "The lecture remark that X lies below 0.5 (recording 14, 30:06) assumed a fixed NPV now. Partial "
                "credit: such an answer keeps the points for a correct NPV of waiting as a function of X (about "
                "2 of 5), but not for X.",
                f"With the fallback of 70 from (b): {f(RES1 / (1 + r1))}X and X = {f(X1_res)}, full marks.",
                "Bonus: states that waiting is better below X and buying today above it.",
                "Bonus: checks that the two functions return the values from (a) and (c) at X = 0.35.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "Without calculation: would X in (d) be higher or lower if the risk-free rate were 10% "
                "instead of 8%, all prices unchanged? Explain briefly."),
            "solution": P(
                "<b>X would be higher.</b> Waiting trades a cost in the high state against a gain in the low "
                "state. A higher rate moves both in favour of waiting:",
                "<b>The cost of waiting falls.</b> At the high price Lusoliva buys either way, so waiting costs "
                "this year's oil less the saving from paying a year later. A higher rate makes that saving "
                f"larger: 52 − 52/1.10 = {f(I1 - I1 / (1 + r1h))} instead of {f(I1 - I1 / (1 + r1))}.",
                "<b>The gain from waiting rises.</b> At the low price the perpetuity is worth less at 10%, so "
                f"buying today locks in a larger loss: {f(-L1h)} instead of {f(-L1)}.",
                f"Both effects make waiting more attractive, so buying today needs a higher probability of the "
                f"high price to catch up. (Bonus: X = {f(L1h)}/({f(G1h)} + {f(L1h)}) = {f(X1h)}.)",
                "The short standard version is also accepted: a higher rate lowers the present value of the "
                "investment cost paid at t = 1, so the option to wait is worth more and X rises."),
            "criteria": [
                "1 point: the answer, X is higher.",
                "1 point: names the cost of waiting (this year's oil, net of the saving from paying a year later) "
                "and explains that a higher rate makes the saving larger.",
                "1 point: names the gain from waiting (avoiding the loss in the low state) and explains that a "
                "higher rate makes that loss larger, because the low-price perpetuity is worth less.",
                "Also accepted for the answer and the cost point: the standard argument that a higher r lowers the "
                "present value of the investment cost paid at t = 1, so the option to wait is worth more.",
                "An answer that only says future cash flows are worth less gets at most 1 point: it must say which "
                "side of the comparison moves. No calculation is required.",
            ],
        },
    ],
}

svar1 = {
    "mk-vente-1:1:a": {"type": "tall", "tall": [
        {"navn": "NPV of buying today", "verdi": now1, "enhet": "EUR m"}],
        "merknad": f"Uten salget i t = 0 blir NPV {f(now1_felle_t0)}; det avvises."},
    "mk-vente-1:1:b": {"type": "blandet", "tall": [
        {"navn": "NPV at t = 1, high price", "verdi": gu1, "enhet": "EUR m"},
        {"navn": "NPV at t = 1, low price", "verdi": gd1, "enhet": "EUR m"}],
        "tallPoeng": 4, "tekstLedd": "Would Lusoliva buy in each state?"},
    "mk-vente-1:1:c": {"type": "blandet", "tall": [
        {"navn": "NPV of waiting (t = 0)", "verdi": wait1, "enhet": "EUR m", "alt": [wait1_res]},
        {"navn": "Value of the option to wait", "verdi": opt1, "enhet": "EUR m", "alt": [opt1_res]}],
        "tallPoeng": 3, "tekstLedd": "Should Lusoliva buy today or wait?",
        "merknad": f"alt er svarene med reserveverdien 70 fra b). Med den negative lave tilstanden beholdt blir NPV "
                   f"av å vente {f(wait1_felle_neg)}; det avvises."},
    "mk-vente-1:1:d": {"type": "tall", "tall": [
        {"navn": "X", "verdi": 100 * X1, "enhet": "%", "alt": [100 * X1_res]}],
        "merknad": f"Sannsynlighet i prosent ({f(100 * X1, 2)} %; {f(X1)} godtas også). alt {f(100 * X1_res, 2)} % er "
                   f"svaret med reserveverdien 70 fra b). NPV nå holdt fast på {f(now1)} gir {f(X1_felle_fast)} og "
                   "avvises; begge NPV-ene avhenger av X."},
    "mk-vente-1:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ oppgave 2
ex2 = {
    "n": 1,
    "title": "Real Options",
    "points": 20,
    "topic": "Real options, option to wait",
    "chapters": [25],
    "merke": "Samme form som H2025 E5 (butikken)",
    "body": P(
        "You are considering opening a staff canteen at a new business park at Forus, outside Stavanger. "
        "Fitting it out costs NOK 6 million, paid at opening. Running it costs NOK 1.5 million a year. "
        "Revenue will be NOK 2.3 million or NOK 1.9 million a year forever with equal probability, "
        "depending on how many firms move into the park. You learn which at the end of Year 1, whether or "
        "not you have opened. Cash flows arrive at the end of each year, the first one year after opening. "
        "Once open, the canteen must run forever. Demand is unrelated to the stock market, so discount at "
        "the risk-free rate of 6%. Use 4 decimal places."),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": P("What is the NPV of opening the canteen now? Will you open it?"),
            "solution": P("<b>Step 1. Net the running cost off the revenue, state by state.</b>")
            + tabell(["State", "Probability", "Revenue", "Cost", "Net cash flow per year"], [
                ["Many firms", "0.5", f(RH, 1), f(K2, 1), f(nh, 1)],
                ["Few firms", "0.5", f(RL, 1), f(K2, 1), f(nl, 1)],
            ])
            + P(
                f"Expected net cash flow = 0.5 × {f(nh, 1)} + 0.5 × {f(nl, 1)} = <b>{f(m2, 1)} {N} a year</b>, "
                "forever from Year 1.",
                f"<b>Step 2. Value it.</b> Opening now commits you whatever the state, so you discount the "
                f"expected flow: PV = {f(m2, 1)}/0.06 = {f(pv2)}; NPV<sub>now</sub> = {f(pv2)} − 6 = "
                f"<b>{f(now2)} {N}</b>.",
                "<b>Yes, you would open it:</b> the NPV is positive, so opening beats doing nothing. Whether it "
                "also beats waiting is the question in (b) and (c)."),
            "criteria": [
                f"Nets the NOK 1.5 million running cost against the revenue: {f(nh, 1)} and {f(nl, 1)} a year.",
                f"Expected net cash flow {f(m2, 1)}, valued as a perpetuity from Year 1 at 6%: {f(pv2)}.",
                f"NPV = {f(pv2)} − 6 = {f(now2)} {N}.",
                "Answers the question asked: yes, open, since the NPV is positive.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": P(
                "Instead, you can wait one year, learn the state and then decide. The cost is still NOK 6 "
                "million, paid at t = 1. The first cash flow then arrives at t = 2. What is the NPV of "
                "opening at t = 1 in each state, measured at t = 1? In which states would you open?"),
            "solution": P(
                "Seen from t = 1 the project is the one in (a) with the state known. The first cash flow comes "
                "one year after opening, so each state is a perpetuity valued at t = 1:")
            + tabell(["State", "Net cash flow", "NPV at t = 1", "Decision"], [
                ["Many firms", f(nh, 1), f"{f(nh, 1)}/0.06 − 6 = {f(nh / r2)} − 6 = <b>{f(gh2)}</b>", "open"],
                ["Few firms", f(nl, 1), f"{f(nl, 1)}/0.06 − 6 = {f(nl / r2)} − 6 = <b>{f(gl2)}</b>", "open"],
            ])
            + P(
                f"<b>You open in both states.</b> Even with few firms, a net cash flow of {f(nl, 1)} a year is "
                "worth more than the NOK 6 million it costs, so there is no state you would want to avoid."),
            "criteria": [
                f"Values each state at t = 1 as a perpetuity starting one year after opening: {f(nh / r2)} and {f(nl / r2)}.",
                f"NPV at t = 1: {f(gh2)} with many firms and {f(gl2)} with few firms.",
                "Concludes that you open in both states, because the few-firms state is still profitable.",
                "Compares each state with 0 before deciding; here neither is negative.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": P(
                "What is the NPV of waiting, seen from today? Do you open now or wait? Compare with (a) and "
                "explain briefly."),
            "solution": P(
                "<b>Step 1. NPV of waiting.</b> You open in both states, so",
                f"NPV<sub>wait</sub> = [0.5 × {f(gh2)} + 0.5 × {f(gl2)}]/1.06 = {f(0.5 * (gh2 + gl2))}/1.06 = "
                f"<b>{f(wait2)} {N}</b>",
                f"<b>Step 2. Decision.</b> {f(wait2)} &lt; {f(now2)}: <b>open now</b>. Opening now is better by "
                f"{f(diff2)}.",
                "<b>Why.</b> Waiting has value only if what you learn lets you avoid a bad state. Here you open "
                "in both states anyway, so waiting just delays the same project by a year: NPV<sub>wait</sub> = "
                f"NPV<sub>now</sub>/1.06. You give up the Year-1 cash flow, worth {f(m2, 1)}/1.06 = {f(tapt_cf)} "
                f"today. You gain only from paying the NOK 6 million a year later, 6 − 6/1.06 = {f(spart)}. "
                f"Net: {f(tapt_cf)} − {f(spart)} = {f(diff2)}. ✓"),
            "criteria": [
                f"NPV of waiting = [0.5 × {f(gh2)} + 0.5 × {f(gl2)}]/1.06 = {f(wait2)} {N}.",
                f"Decision: open now, because {f(now2)} is more than {f(wait2)}.",
                "Explains why: you open in both states, so waiting avoids nothing and only delays the project; "
                "the minimal accepted cost of waiting is the lost Year-1 cash flow.",
                f"Bonus, not required for full marks: the decomposition into the lost Year-1 cash flow "
                f"({f(tapt_cf)}) less the saving from paying later ({f(spart)}), net {f(diff2)}.",
            ],
        },
        {
            "label": "d", "points": 6,
            "body": P(
                "Your analyst says the two revenues are not NOK 2.3 million and NOK 1.9 million but NOK "
                "(2.1 + X) million and NOK (2.1 − X) million, still 2.1 in expectation. Find X for which you "
                "are indifferent between opening now and waiting one year."),
            "solution": P(
                f"<b>Step 1. Opening now does not depend on X.</b> The expected net cash flow stays at "
                f"{f(m2, 1)}, so NPV<sub>now</sub> = {f(now2)} for every X.",
                f"<b>Step 2. When can waiting compete?</b> The net cash flows are {f(m2, 1)} + X and "
                f"{f(m2, 1)} − X. As long as the few-firms state is profitable, you open in both states and "
                f"waiting is worth {f(now2)}/1.06 = {f(wait2)}, always below {f(now2)}, as in (c). The few-firms "
                f"state stops being profitable when ({f(m2, 1)} − X)/0.06 &lt; 6, that is {f(m2, 1)} − X &lt; "
                f"{f(r2 * I2, 2)}, or X &gt; {f(grense2, 2)}. So the indifference point lies above "
                f"X = {f(grense2, 2)}, where you open only with many firms:",
                f"NPV<sub>wait</sub>(X) = 0.5 × [({f(m2, 1)} + X)/0.06 − 6]/1.06",
                "<b>Step 3. Set it equal to NPV<sub>now</sub>.</b>",
                f"0.5 × [({f(m2, 1)} + X)/0.06 − 6]/1.06 = {f(now2)}<br>"
                f"({f(m2, 1)} + X)/0.06 − 6 = {f(now2)} × 2 × 1.06 = {f(rhs2)}<br>"
                f"({f(m2, 1)} + X)/0.06 = {f(rhs2 + I2)} ⇒ {f(m2, 1)} + X = {f(m2 + X2)}<br>"
                f"X = <b>{f(X2)} {N}</b> (NOK {f(X2 * 1e6, 0)})",
                f"<b>Step 4. Check the assumption.</b> {f(X2)} &gt; {f(grense2, 2)}, so with few firms the net "
                f"cash flow is {f(m2, 1)} − {f(X2)} = {f(m2 - X2)}, worth {f(m2 - X2)}/0.06 − 6 = "
                f"{f((m2 - X2) / r2)} − 6 = {f(gl2X)} at t = 1: negative, so you really do skip that state. With "
                f"many firms: {f(m2 + X2)}/0.06 − 6 = {f(gh2X)}, so 0.5 × {f(gh2X)}/1.06 = {f(now2)} = "
                "NPV<sub>now</sub>. ✓",
                f"For X above {f(X2)} waiting is better; below it, open now. The spread in (b) and (c) was "
                f"{f(s0, 1)}, below {f(X2)}, which agrees with opening now. Forgetting to discount the t = 1 value "
                f"back to today gives X = {f(X2_felle_udiskontert, 2)}, the point where the few-firms state just "
                "breaks even: wrong, because at that spread waiting is still worse."),
            "criteria": [
                f"Recognises that NPV_now = {f(now2)} does not depend on X: the expected revenue is unchanged and "
                "opening now commits you in both states.",
                f"Writes the net cash flows as {f(m2, 1)} + X and {f(m2, 1)} − X (revenue less the 1.5 running "
                "cost), not 2.1 ± X.",
                f"Sets up waiting with the few-firms state at 0: 0.5 × [({f(m2, 1)} + X)/0.06 − 6]/1.06.",
                f"Solves: X = {f(X2)} {N} (NOK {f(X2 * 1e6, 0)}).",
                f"Bonus, not required (Kurbatov's 2025 key marks the matching check as not required): checks that "
                f"the few-firms state is unprofitable at this X (X above {f(grense2, 2)}), so skipping it is optimal.",
                f"Forgetting to discount by 1.06 gives {f(X2_felle_udiskontert, 2)}, which is wrong.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "A catering chain is also eyeing the park. If you open now, it stays away. If you wait, it may "
                "open first, so your revenue in both states would be lower if you open at t = 1. Without "
                "calculation: how does this affect the value of waiting and X from (d)? Explain briefly."),
            "solution": P(
                "<b>Waiting is worth less.</b> If you wait, you may have to open at t = 1 next to a competitor, so "
                "every state in which you would open yields less. The upside you wait for shrinks.",
                f"<b>X rises.</b> NPV<sub>wait</sub> falls for every X, while NPV<sub>now</sub> stays at "
                f"{f(now2)} because opening now keeps the chain away. The revenue spread must therefore be wider "
                f"than {f(X2)} before waiting catches up.",
                "The threat of entry is a cost of waiting on top of the lost Year-1 cash flow. The lecture makes "
                "the same point: while you wait, other firms may move in and take market share (recording 14, "
                "31:31). Also accepted: the threat can make it right to open now even when the spread is wide, "
                "to keep the rival out."),
            "criteria": [
                "1 point: waiting becomes less valuable, because opening at t = 1 pays less when a rival may have entered.",
                f"1 point: NPV_now is unchanged (opening now keeps the chain away), so X must be higher than "
                f"{f(X2)} for waiting to catch up.",
                "1 point: names the mechanism: competition is an extra cost of waiting on top of the lost Year-1 "
                "cash flow.",
                "No calculation is required; a numerical illustration is a bonus.",
            ],
        },
    ],
}

svar2 = {
    "mk-vente-2:1:a": {"type": "blandet", "tall": [
        {"navn": "NPV of opening now", "verdi": now2, "enhet": "NOK m"}],
        "tallPoeng": 1.5, "tekstLedd": "Will you open it?"},
    "mk-vente-2:1:b": {"type": "blandet", "tall": [
        {"navn": "NPV at t = 1, many firms", "verdi": gh2, "enhet": "NOK m"},
        {"navn": "NPV at t = 1, few firms", "verdi": gl2, "enhet": "NOK m"}],
        "tallPoeng": 3, "tekstLedd": "In which states would you open?"},
    "mk-vente-2:1:c": {"type": "blandet", "tall": [
        {"navn": "NPV of waiting (t = 0)", "verdi": wait2, "enhet": "NOK m"}],
        "tallPoeng": 2, "tekstLedd": "Do you open now or wait? Compare with (a) and explain briefly."},
    "mk-vente-2:1:d": {"type": "tall", "tall": [
        {"navn": "X (indifference)", "verdi": X2, "enhet": "NOK m",
         "alt": [X2 * 1e6]}],
        "merknad": f"X kan oppgis i NOK mill. ({f(X2)}) eller i NOK ({f(X2 * 1e6, 0)}). Uten diskontering fra "
                   f"t = 1 blir X {f(X2_felle_udiskontert, 2)}; det avvises."},
    "mk-vente-2:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ oppgave 3
ex3 = {
    "n": 1,
    "title": "Risk-neutral valuation",
    "points": 20,
    "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 23, 25],
    "merke": "Samme form som H2024 E6 og legemiddeleksemplet i forelesning 14 (1:05:41)",
    "body": P(
        "Sandhill Data LLC can build a secure data centre for a US federal agency for USD 51 million, paid "
        "when it is built. The agency leases it for USD 5 million a year, paid at the end of each year, the "
        "first payment one year after completion. The agency moves to its own campus at the end of Year 15, "
        "so the lease ends with the Year-15 payment whenever the centre is built; the centre is worthless "
        "after that. The agency is as safe as the US Treasury, so the payments are risk-free; only the "
        "interest rate is uncertain. Today the risk-free rate is 6% for all maturities. Use 4 decimal "
        "places."),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P("What is the NPV if Sandhill builds the centre now?"),
            "solution": P(
                "Building now gives 15 lease payments, Years 1 to 15: a 15-year annuity at 6%.",
                f"A(15, 6%) = [1 − 1.06<sup>−15</sup>]/0.06 = [1 − {f(1.06 ** -15)}]/0.06 = <b>{f(A15)}</b>",
                f"PV = 5 × {f(A15)} = <b>{f(pv3)}</b>; NPV<sub>now</sub> = {f(pv3)} − 51 = <b>{f(now3)} {U}</b>",
                "The static NPV is negative, so building now does not pay on its own."),
            "criteria": [
                "Recognises a 15-year annuity, not a perpetuity: the lease ends in Year 15.",
                f"A(15, 6%) = {f(A15)} and PV = {f(pv3)}.",
                f"NPV = {f(pv3)} − 51 = {f(now3)} {U}.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P(
                "Instead, Sandhill can wait one year and decide then. From Year 1 on, the risk-free rate will be "
                "either 3.5% or 7.5% for all maturities (the rate from Year 0 to Year 1 stays at 6%). If "
                "Sandhill builds at t = 1, it pays USD 51 million then and the lease payments start one year "
                "later. What is the NPV of building at t = 1 in each case, at t = 1 and from today's "
                "perspective (t = 0)?"),
            "solution": P(
                "<b>Step 1. Count the payments.</b> The lease still ends in Year 15. Built at t = 1, the centre "
                "receives payments in Years 2 to 15: <b>14 payments</b>, not 15. Value them at t = 1 with that "
                "case's rate, then bring the NPV back to t = 0 at 6%, the rate from Year 0 to Year 1.")
            + tabell(["Rate from Year 1", "A(14, r)", "PV at t = 1", "NPV at t = 1", "NPV at t = 0"], [
                ["3.5%", f(A14u), f(pvu1), f"<b>{f(gu3)}</b>", f"<b>{f(gu3_0)}</b>"],
                ["7.5%", f(A14d), f(pvd1), f"<b>{f(gd3)}</b>", f"<b>{f(gd3_0)}</b>"],
            ])
            + P(
                f"With 3.5%: NPV<sub>1</sub> = 5 × {f(A14u)} − 51 = {f(gu3)} and NPV<sub>0</sub> = {f(gu3)}/1.06 = {f(gu3_0)}. "
                f"With 7.5%: NPV<sub>1</sub> = 5 × {f(A14d)} − 51 = {f(gd3)} and NPV<sub>0</sub> = {f(gd3)}/1.06 = {f(gd3_0)}.",
                "A low rate is the good case for this project: the same fixed payments are worth more. Keeping "
                f"15 payments after waiting (Years 2 to 16) ignores the fixed end of the lease and gives "
                f"{f(gu3_felle15)} in the good case; the drug-development example in the lecture uses 16 rather "
                "than 17 years for the same reason (recording 14, 1:08:14). Discounting the first year at 3.5% "
                "or 7.5% instead of 6% is the other trap."),
            "criteria": [
                "Uses 14 payments (Years 2 to 15) after waiting, because the lease ends in Year 15 whatever happens.",
                f"Annuity factors A(14, 3.5%) = {f(A14u)} and A(14, 7.5%) = {f(A14d)}; PV at t = 1 of "
                f"{f(pvu1)} and {f(pvd1)}.",
                f"NPV at t = 1: {f(gu3)} and {f(gd3)}.",
                f"Discounts both to t = 0 at 6%, the rate from Year 0 to Year 1: {f(gu3_0)} and {f(gd3_0)}. "
                "Using 3.5% or 7.5% for that first year is the trap.",
                "Bonus: identifies the 3.5% case as the good one, because a lower rate raises the value of fixed "
                "payments.",
            ],
        },
        {
            "label": "c", "points": 6,
            "body": P(
                "Nobody knows the probabilities of the two rates. A Treasury bond pays USD 100 at the end of each "
                "year from Year 1 to Year 15 and nothing else; today it is priced at the 6% rate. What is the "
                "risk-neutral probability of the 3.5% rate? Briefly explain why you do not need the true "
                "probabilities."),
            "solution": P(
                "<b>Step 1. Price the bond today and in each case at t = 1.</b> At t = 1 the holder receives the "
                "Year-1 payment of 100 and keeps 14 more payments, valued at the new rate:")
            + tabell(["", "Calculation", "Value"], [
                ["S<sub>0</sub>, today at 6%", f"100 × A(15, 6%) = 100 × {f(A15, 6)}", f(S0)],
                ["S<sub>u</sub>, t = 1 if r = 3.5%", f"100 + 100 × A(14, 3.5%) = 100 + {f(100 * A14u)}", f(Su)],
                ["S<sub>d</sub>, t = 1 if r = 7.5%", f"100 + 100 × A(14, 7.5%) = 100 + {f(100 * A14d)}", f(Sd)],
            ])
            + P(
                "The 100 paid at t = 1 belongs in S<sub>u</sub> and S<sub>d</sub>: the holder receives it then, "
                "like a dividend on a share.",
                "<b>Step 2. The formula-sheet expression</b> with the one-year rate of 6%:",
                f"ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = "
                f"[1.06 × {f(S0)} − {f(Sd)}]/({f(Su)} − {f(Sd)}) = ({f(ce)} − {f(Sd)})/{f(Su - Sd)} = "
                f"{f(ce - Sd)}/{f(Su - Sd)} = <b>{f(rho)}</b>",
                f"and 1 − ρ = {f(1 - rho)}.",
                f"<b>Step 3. Check.</b> The bond must earn 6% under ρ: [{f(rho, 6)} × {f(Su)} + {f(1 - rho, 6)} × "
                f"{f(Sd)}]/1.06 = ({f(rho * Su)} + {f((1 - rho) * Sd)})/1.06 = {f(ce)}/1.06 = {f(rho_ut)} = "
                "S<sub>0</sub>. ✓ This only confirms the arithmetic, since ρ is built to make it hold.",
                f"<b>Second route.</b> Price the stream the option delivers, the lease in Years 2 to 15. Today it "
                f"is worth the lease started now less its sure Year-1 payment, {f(pv3)} − 5/1.06 = {f(S0b)}; at "
                f"t = 1 it is worth {f(pvu1)} or {f(pvd1)} from (b). Then ({f((1 + y3) * S0b)} − {f(pvd1)})/"
                f"({f(pvu1)} − {f(pvd1)}) = {f(rho_b)}. ✓ The two twins differ only by a sure payment and the "
                "scale, so they must agree; a mismatch would reveal a slip in (b).",
                f"<b>Traps.</b> Leaving the 100 out of S<sub>u</sub> and S<sub>d</sub> gives {f(rho_felle_uten100)}. "
                f"So does pairing the lease started now ({f(pv3)}) with the values from (b). Using S<sub>0</sub> "
                f"instead of (1 + r<sub>f</sub>)S<sub>0</sub> gives {f(rho_felle_uten_rf)}. Both lie between 0 and "
                "1, so only the rule catches them.",
                "<b>Why the true probabilities are not needed.</b> The payoff of the decision at t = 1 can be "
                "replicated with the traded bond and risk-free borrowing or lending, so its value today follows "
                "from the bond's price, whatever investors believe and however risk averse they are. ρ is the "
                "probability that makes the bond earn the risk-free rate; it is not a forecast."),
            "criteria": [
                f"Prices the bond today at 6%: S_0 = 100 × A(15, 6%) = {f(S0)}.",
                f"Includes the Year-1 payment in the t = 1 values: S_u = 100 + 100 × A(14, 3.5%) = {f(Su)} and "
                f"S_d = 100 + 100 × A(14, 7.5%) = {f(Sd)}. Leaving it out, or pairing {f(pv3)} with the values "
                f"from (b), gives {f(rho_felle_uten100)}.",
                f"Uses ρ = [(1 + r_f)S_0 − S_d]/(S_u − S_d) with r_f = 6%, the rate from Year 0 to Year 1. "
                f"Forgetting (1 + r_f) gives {f(rho_felle_uten_rf)}.",
                f"ρ = {f(rho)} for the 3.5% rate and 1 − ρ = {f(1 - rho)}.",
                "Explains why the true probabilities are not needed: the payoff can be replicated with the traded "
                "bond and the risk-free asset, so no beliefs or risk preferences enter; ρ is not a forecast.",
                "Bonus: verifies that ρ reprices the bond, [ρ S_u + (1 − ρ) S_d]/1.06 = S_0. It confirms the "
                "arithmetic only.",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": P(
                "What is the value today of the option to wait? Sandhill is not forced to build at t = 1. Do you "
                "build now or wait? Briefly comment. (If you could not solve (b), use an NPV at t = 1 of USD 4 "
                "million at 3.5%. If you could not solve (c), use ρ = 0.40.)"),
            "solution": P(
                f"<b>Step 1. Payoffs at t = 1.</b> Sandhill builds only if the rate falls to 3.5%: "
                f"C<sub>u</sub> = max({f(gu3)}, 0) = {f(gu3)} and C<sub>d</sub> = max({f(gd3)}, 0) = 0.",
                f"<b>Step 2. Value with ρ.</b> C<sub>0</sub> = ρ × NPV<sub>0,u</sub> + (1 − ρ) × 0 = "
                f"{f(rho, 6)} × {f(gu3_0, 6)} = <b>{f(C3)} {U}</b>, or equivalently {f(rho, 6)} × {f(gu3, 6)}/1.06.",
                f"<b>Step 3. Decision: wait.</b> Waiting is worth {f(C3)}, building now {f(now3)}. Since building "
                f"now does not pay, the whole {f(C3)} is the value of the option to wait. Measuring it against the "
                f"negative NPV, {f(C3)} − ({f(now3)}) = {f(C3_felle_neg)}, uses the wrong baseline: the alternative "
                "to waiting is not building, worth 0.",
                "<b>Comment.</b> The right to build is a call on the lease stream with a strike of USD 51 million. "
                "It has value although the static NPV is negative, because Sandhill builds only if rates fall and "
                "walks away otherwise.",
                f"Optional replication check with the bond: Δ = {f(gu3)}/{f(Su - Sd)} = {f(delta, 6)} bonds, "
                f"B = −{f(Sd, 4)} × {f(delta, 6)}/1.06 = {f(B)}; then S<sub>0</sub>Δ + B = {f(S0 * delta)} − "
                f"{f(-B)} = {f(C3)} ✓. It shares ρ with the first route, so it catches arithmetic slips only.",
                f"With the fallbacks: ρ = 0.40 gives 0.40 × {f(gu3_0)} = {f(C3_alt[0])}, an NPV of 4 gives "
                f"{f(rho)} × 4/1.06 = {f(C3_alt[1])}, both give 0.40 × 4/1.06 = {f(C3_alt[2])}. The decision is "
                "the same."),
            "criteria": [
                f"Applies max(NPV, 0) at t = 1: {f(gu3)} if the rate is 3.5% and 0 if it is 7.5%, because "
                "Sandhill is not forced to build.",
                f"Values it with ρ from (c): {f(rho)} × {f(gu3_0)} = {f(C3)} {U}, or {f(rho)} × {f(gu3)}/1.06. "
                f"With the fallbacks: {f(C3_alt[0])} (ρ = 0.40), {f(C3_alt[1])} (NPV 4) or {f(C3_alt[2])} (both), "
                "full marks.",
                f"Decision: wait. Waiting is worth {f(C3)}, building now {f(now3)}. Measuring the option against "
                f"the negative NPV, {f(C3)} − ({f(now3)}) = {f(C3_felle_neg)}, is wrong: the baseline is 0.",
                "Comment: a call on the lease stream, valuable because Sandhill builds only in the good case, "
                "although the static NPV is negative.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "A colleague suggests Black-Scholes instead, with σ the volatility of the value of the lease "
                "stream. Without calculation: what would you expect for the value of waiting and for your "
                "decision if σ were very low? And if it were very high?"),
            "solution": P(
                f"<b>Very low σ.</b> In a year the lease stream would be worth close to what its 14 payments are "
                f"worth at today's 6%, 5 × A(14, 6%) = {f(pv14y)}, below the USD 51 million cost. The project "
                "would then be unprofitable in practically every outcome, so the right to wait is worth almost "
                "nothing and you take the same decision as today: do not build now. The lecture makes this point: "
                "with a very low σ, \"we would still take the same exact decision\" (recording 14, 47:10).",
                "<b>Very high σ.</b> There is a large chance that the stream ends up worth well above USD 51 "
                "million, while the downside stays at 0 because Sandhill can walk away. The right to wait is worth "
                "more. Waiting is even more clearly the right choice.",
                "The general rule: more uncertainty makes the option to wait more valuable, because the upside "
                "grows while the downside stays capped at 0."),
            "criteria": [
                "1 point: low σ, the value of the stream stays near today's level, below the cost, so the option "
                "is worth close to 0 and the decision is the same as today (do not build now).",
                "1 point: high σ, more upside with the downside capped at 0, so the option to wait is worth more "
                "and waiting is more attractive.",
                "1 point: names the mechanism: an option gains from uncertainty because its payoff is asymmetric.",
                f"Today's level means the 14 payments from Year 2, worth {f(pv14y)} at 6%. Using {f(pv3)} (the "
                "lease started now, which includes the Year-1 payment lost by waiting) is a slip, although the "
                "conclusion is the same.",
                "No Black-Scholes calculation is required or expected.",
            ],
        },
    ],
}

svar3 = {
    "mk-vente-3:1:a": {"type": "tall", "tall": [
        {"navn": "NPV of building now", "verdi": now3, "enhet": "USD m"}]},
    "mk-vente-3:1:b": {"type": "tall", "tall": [
        {"navn": "NPV at t = 1, 3.5%", "verdi": gu3, "enhet": "USD m"},
        {"navn": "NPV at t = 1, 7.5%", "verdi": gd3, "enhet": "USD m"},
        {"navn": "NPV at t = 0, 3.5%", "verdi": gu3_0, "enhet": "USD m"},
        {"navn": "NPV at t = 0, 7.5%", "verdi": gd3_0, "enhet": "USD m", "tol": 0.005}],
        "merknad": f"Med 15 betalinger etter å vente blir NPV ved 3,5 % {f(gu3_felle15)}; det avvises."},
    "mk-vente-3:1:c": {"type": "blandet", "tall": [
        {"navn": "ρ (3.5% rate)", "verdi": 100 * rho, "enhet": "%"}],
        "tallPoeng": 4, "tekstLedd": "Briefly explain why you do not need the true probabilities.",
        "merknad": f"Sannsynlighet i prosent ({f(100 * rho, 2)} %; {f(rho)} godtas også). Uten år 1-betalingen i "
                   f"S_u og S_d blir ρ {f(rho_felle_uten100)}; uten (1 + r_f) {f(rho_felle_uten_rf)}."},
    "mk-vente-3:1:d": {"type": "blandet", "tall": [
        {"navn": "Value of the option to wait", "verdi": C3, "enhet": "USD m", "alt": C3_alt}],
        "tallPoeng": 1.5, "tekstLedd": "Do you build now or wait? Briefly comment.",
        "merknad": f"alt er svarene med reserveverdiene som oppgaven gir: ρ = 0.40 ({f(C3_alt[0])}), NPV 4 "
                   f"({f(C3_alt[1])}) og begge ({f(C3_alt[2])}). Målt mot den negative NPV-en blir det "
                   f"{f(C3_felle_neg)}; det avvises."},
    "mk-vente-3:1:e": {"type": "tekst"},
}


# ################################################################## TIER 2
# ================================================================== mk-binomisk-1
# Forelesning 12 (47:01 til 1:23:00): replikasjon av en call, så ρ, så put fra paritet.
S1b, Su1b, Sd1b, rf1b, K1b = 48.0, 66.0, 36.0, 0.04, 52.0
ce1b = (1 + rf1b) * S1b
assert Sd1b < ce1b < Su1b
Cu1b, Cd1b = max(Su1b - K1b, 0), max(Sd1b - K1b, 0)
Pu1b, Pd1b = max(K1b - Su1b, 0), max(K1b - Sd1b, 0)
N1b = (Cu1b - Cd1b) / (Su1b - Sd1b)
X1b = (Cd1b - N1b * Sd1b) / (1 + rf1b)          # risikofri posisjon (negativ = lån)
C1b = N1b * S1b + X1b
assert abs(N1b * Su1b + (1 + rf1b) * X1b - Cu1b) < 1e-12 and abs(N1b * Sd1b + (1 + rf1b) * X1b - Cd1b) < 1e-12
rho1b = (ce1b - Sd1b) / (Su1b - Sd1b)
C1b_rho = (rho1b * Cu1b + (1 - rho1b) * Cd1b) / (1 + rf1b)
assert abs(C1b_rho - C1b) < 1e-12 and X1b < 0 and 0 < N1b < 1
assert abs((rho1b * Su1b + (1 - rho1b) * Sd1b) / (1 + rf1b) - S1b) < 1e-12
pvK1b = K1b / (1 + rf1b)
P1b = C1b - S1b + pvK1b
assert abs(P1b - (rho1b * Pu1b + (1 - rho1b) * Pd1b) / (1 + rf1b)) < 1e-12
RES_C1b = 6.00
P1b_res = RES_C1b - S1b + pvK1b
ulik(C1b, RES_C1b)
ulik(P1b, P1b_res)
TILBUD1b = 6.90                                  # forhandleren kjøper call til denne prisen
gevinst1b = TILBUD1b - C1b
assert gevinst1b > 0
opp1b = N1b * Su1b - (1 + rf1b) * -X1b - Cu1b    # kontantstrøm i t = 1, opp
ned1b = N1b * Sd1b - (1 + rf1b) * -X1b - Cd1b
assert abs(opp1b) < 1e-12 and abs(ned1b) < 1e-12
rho1b_felle_uten_rf = (S1b - Sd1b) / (Su1b - Sd1b)
ulik(rho1b, rho1b_felle_uten_rf)

# ================================================================== mk-binomisk-2
# Home Assignment 2, oppgave 2: ρ, call og put, arbitrasje fra paritet med feil kurser.
S2b, Su2b, Sd2b, rf2b, K2b = 140.0, 175.0, 112.0, 0.05, 150.0
ce2b = (1 + rf2b) * S2b
assert Sd2b < ce2b < Su2b
rho2b = (ce2b - Sd2b) / (Su2b - Sd2b)
Cu2b, Pd2b = Su2b - K2b, K2b - Sd2b
C2b = rho2b * Cu2b / (1 + rf2b)
pvK2b = K2b / (1 + rf2b)
P2b = C2b - S2b + pvK2b
assert abs(P2b - (1 - rho2b) * Pd2b / (1 + rf2b)) < 1e-12
RHO_RES2b = 0.50
C2b_res = RHO_RES2b * Cu2b / (1 + rf2b)
P2b_res = C2b_res - S2b + pvK2b
ulik(rho2b, RHO_RES2b)
ulik(C2b, C2b_res)
ulik(P2b, P2b_res)
QC2b, QP2b = 12.20, 17.30                        # meglerens kurser
venstre2b = QC2b + pvK2b
hoyre2b = QP2b + S2b
arb2b = hoyre2b - venstre2b
assert arb2b > 0.5 and QC2b < C2b and QP2b > P2b
ulik(C2b, QC2b)
ulik(P2b, QP2b)
# kontantstrøm i t = 1 for: kjøp call, lån ut PV(K), selg put, short aksjen
for ST in (Su2b, Sd2b):
    assert abs(max(ST - K2b, 0) + K2b - max(K2b - ST, 0) - ST) < 1e-12
Kstar2b = ce2b
Cs2b = rho2b * (Su2b - Kstar2b) / (1 + rf2b)
Ps2b = (1 - rho2b) * (Kstar2b - Sd2b) / (1 + rf2b)
assert abs(Cs2b - Ps2b) < 1e-12 and Sd2b < Kstar2b < Su2b
# e) større spredning, samme S0 og r_f
Su2e, Sd2e = 190.0, 98.0
rho2e = (ce2b - Sd2e) / (Su2e - Sd2e)
C2e = rho2e * (Su2e - K2b) / (1 + rf2b)
P2e = C2e - S2b + pvK2b
assert C2e > C2b and P2e > P2b and abs((C2e - P2e) - (C2b - P2b)) < 1e-12

# ================================================================== mk-binomisk-3
# Seks måneder: vekstfaktor √(1 + r_f). Put ved replikasjon, call fra paritet, produkt aksje + put.
S3b, Su3b, Sd3b, rf3b, K3b = 74.0, 86.0, 63.0, 0.04, 78.0
g3b = (1 + rf3b) ** 0.5
ce3b = g3b * S3b
assert Sd3b < ce3b < Su3b
rho3b = (ce3b - Sd3b) / (Su3b - Sd3b)
rho3b_felle_helt_aar = ((1 + rf3b) * S3b - Sd3b) / (Su3b - Sd3b)
rho3b_halv_rente = ((1 + rf3b / 2) * S3b - Sd3b) / (Su3b - Sd3b)
ulik(rho3b, rho3b_felle_helt_aar)
assert abs(rho3b_halv_rente - rho3b) < 0.002     # annen konvensjon, nesten likt; teksten sier årlig rente
Pu3b, Pd3b = max(K3b - Su3b, 0), max(K3b - Sd3b, 0)
D3b = (Pu3b - Pd3b) / (Su3b - Sd3b)              # aksjer (negativ = short)
B3b = (Pu3b - D3b * Su3b) / g3b
P3b = D3b * S3b + B3b
assert abs(D3b * Sd3b + g3b * B3b - Pd3b) < 1e-12 and D3b < 0 < B3b
assert abs(P3b - (1 - rho3b) * Pd3b / g3b) < 1e-12
pvK3b = K3b / g3b
C3b = P3b + S3b - pvK3b
assert abs(C3b - rho3b * (Su3b - K3b) / g3b) < 1e-12
C3b_felle = P3b + S3b - K3b / (1 + rf3b)
ulik(C3b, C3b_felle)
RES_P3b = 6.50
C3b_res = RES_P3b + S3b - pvK3b
ulik(P3b, RES_P3b)
ulik(C3b, C3b_res)
PRIS3b = 81.60
prod3b = S3b + P3b
assert abs(prod3b - (C3b + pvK3b)) < 1e-12
assert abs(prod3b - (rho3b * Su3b + (1 - rho3b) * K3b) / g3b) < 1e-12
prod3b_res = S3b + RES_P3b
assert PRIS3b > prod3b and PRIS3b > prod3b_res
# prod3b_res ligger nær svaret (S0 + P); begge godtas som alt
straks3b = K3b - S3b                             # verdien av å innløse en amerikansk put i dag
assert straks3b < P3b                            # i dette ett-trinnstreet lønner det seg ikke i dag

# ================================================================== senior og junior: hjelpere
from math import erf, exp, log, sqrt


def _N(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def _bs_call(S, K, T, r, s):
    """Black-Scholes brukes bare internt til å lage konsistente kurser. Studenten regner ingen BS."""
    rc = log(1 + r)
    d1 = (log(S / K) + (rc + 0.5 * s * s) * T) / (s * sqrt(T))
    return S * _N(d1) - K * exp(-rc * T) * _N(d1 - s * sqrt(T))


def kurser(S, T, r, s, strikes, halv, med_put=False):
    """Midtkurs avrundet til 2 desimaler; bid/ask = midt ∓ halv spredning. Put fra paritet."""
    ut = []
    for K, h in zip(strikes, halv):
        c = round(_bs_call(S, K, T, r, s), 2)
        rad = {"K": K, "mid": c, "bid": round(c - h, 2), "ask": round(c + h, 2)}
        if med_put:
            p = round(c - S + K / (1 + r) ** T, 2)
            hp = min(h, int(p * 100 * 0.15) / 100)      # smal spredning på billige puter
            rad.update(pmid=p, pbid=round(p - hp, 2), pask=round(p + hp, 2))
            assert rad["pbid"] > 0 or p < 0.05
        assert rad["bid"] > 0
        ut.append(rad)
    return ut


def kurs(tab, K, felt="mid"):
    return next(x[felt] for x in tab if x["K"] == K)


def yld(F, D, T):
    return (F / D) ** (1 / T) - 1


def pk(x, d=2):
    """Prosent med d desimaler."""
    return f(100 * x, d) + "%"

# ================================================================== mk-senior-junior-1
# Google-formen (forelesning 13, 57:39 til 1:16:02): ett lån, så delt i senior og junior.
n1s, S1s, T1s, rf1s, sig1s = 250e6, 64.0, 2, 0.025, 0.40
V1s = n1s * S1s / 1e9                                   # USD mrd.
F1s, FS1s, FJ1s = 10.0, 6.0, 4.0
tab1s = kurser(S1s, T1s, rf1s, sig1s, [16, 24, 32, 40, 48], [0.35, 0.40, 0.45, 0.50, 0.55])
k1s = F1s * 1e9 / n1s
kS1s = FS1s * 1e9 / n1s
kJ1s = FJ1s * 1e9 / n1s
assert k1s == 40 and kS1s == 24 and kJ1s == 16
c40_1s, c24_1s, c16_1s = kurs(tab1s, 40), kurs(tab1s, 24), kurs(tab1s, 16)
E1s = n1s * c40_1s / 1e9
D1s = V1s - E1s
y1s = yld(F1s, D1s, T1s)
spr1s = y1s - rf1s
RES_E1s = 7.5
D1s_res = V1s - RES_E1s
y1s_res = yld(F1s, D1s_res, T1s)
ulik(E1s, RES_E1s)
ulik(y1s, y1s_res)
CS1s = n1s * c24_1s / 1e9
DS1s = V1s - CS1s
DJ1s = CS1s - E1s
assert abs(DS1s + DJ1s + E1s - V1s) < 1e-12
DJ1s_felle = n1s * c16_1s / 1e9                         # junior priset som én call C(F_J)
ulik(DJ1s, DJ1s_felle)
yS1s, yJ1s = yld(FS1s, DS1s, T1s), yld(FJ1s, DJ1s, T1s)
assert rf1s < yS1s < y1s < yJ1s
RES_DS1s, RES_DJ1s = 5.5, 3.0
yS1s_res, yJ1s_res = yld(FS1s, RES_DS1s, T1s), yld(FJ1s, RES_DJ1s, T1s)
ulik(yS1s, yS1s_res)
ulik(yJ1s, yJ1s_res)
y1s_felle_T = F1s / D1s - 1                             # glemmer å annualisere
ulik(y1s, y1s_felle_T)

# ================================================================== mk-senior-junior-2
# To lag fra start, provenyet betales ut som utbytte: utbytte per aksje og kurs etterpå (MM).
n2s, S2s, T2s, rf2s, sig2s = 180e6, 95.0, 3, 0.04, 0.35
V2s = n2s * S2s / 1e9
FS2s, FJ2s = 7.2, 3.6
tab2s = kurser(S2s, T2s, rf2s, sig2s, [30, 40, 50, 60, 70], [0.40, 0.45, 0.50, 0.55, 0.60])
kS2s = FS2s * 1e9 / n2s
kT2s = (FS2s + FJ2s) * 1e9 / n2s
assert kS2s == 40 and kT2s == 60
c40_2s, c60_2s = kurs(tab2s, 40), kurs(tab2s, 60)
E2s = n2s * c60_2s / 1e9
CS2s = n2s * c40_2s / 1e9
DS2s = V2s - CS2s
DJ2s = CS2s - E2s
assert abs(DS2s + DJ2s + E2s - V2s) < 1e-12
utb2s = (DS2s + DJ2s) * 1e9 / n2s
kurs2s = E2s * 1e9 / n2s
assert abs(utb2s + kurs2s - S2s) < 1e-9 and abs(kurs2s - c60_2s) < 1e-9
RES_DS2s, RES_DJ2s = 6.0, 2.4
utb2s_res = (RES_DS2s + RES_DJ2s) * 1e9 / n2s
kurs2s_res = (V2s - RES_DS2s - RES_DJ2s) * 1e9 / n2s
ulik(utb2s, utb2s_res)
ulik(kurs2s, kurs2s_res)
yS2s, yJ2s = yld(FS2s, DS2s, T2s), yld(FJ2s, DJ2s, T2s)
assert rf2s < yS2s < yJ2s
yS2s_res, yJ2s_res = yld(FS2s, RES_DS2s, T2s), yld(FJ2s, RES_DJ2s, T2s)
ulik(yS2s, yS2s_res)
ulik(yJ2s, yJ2s_res)
y2s_samlet = yld(FS2s + FJ2s, DS2s + DJ2s, T2s)          # ett lån på 10,8 mrd. (hale)
assert yS2s < y2s_samlet < yJ2s

# ================================================================== mk-senior-junior-3
# 30 måneder (T = 2,5), senior også som risikofri gjeld minus en put, hale om volatilitet.
n3s, S3s, T3s, rf3s, sig3s = 120e6, 150.0, 2.5, 0.03, 0.30
V3s = n3s * S3s / 1e9
FS3s, FJ3s = 9.0, 3.0
tab3s = kurser(S3s, T3s, rf3s, sig3s, [25, 50, 75, 100, 125], [0.30, 0.35, 0.40, 0.45, 0.50], med_put=True)
kS3s = FS3s * 1e9 / n3s
kT3s = (FS3s + FJ3s) * 1e9 / n3s
assert kS3s == 75 and kT3s == 100
c75_3s, c100_3s, c25_3s = kurs(tab3s, 75), kurs(tab3s, 100), kurs(tab3s, 25)
p75_3s = kurs(tab3s, 75, "pmid")
E3s = n3s * c100_3s / 1e9
CS3s = n3s * c75_3s / 1e9
DS3s = V3s - CS3s
DJ3s = CS3s - E3s
assert abs(DS3s + DJ3s + E3s - V3s) < 1e-12
DJ3s_felle = n3s * c25_3s / 1e9
ulik(DJ3s, DJ3s_felle)
yS3s, yJ3s = yld(FS3s, DS3s, T3s), yld(FJ3s, DJ3s, T3s)
assert rf3s < yS3s < yJ3s
yS3s_felle = yld(FS3s, DS3s, 3)                         # T = 3 i stedet for 2,5
yJ3s_felle = yld(FJ3s, DJ3s, 3)
ulik(yJ3s, yJ3s_felle)
RES_DS3s, RES_DJ3s = 8.0, 2.2
yS3s_res, yJ3s_res = yld(FS3s, RES_DS3s, T3s), yld(FJ3s, RES_DJ3s, T3s)
ulik(yS3s, yS3s_res)
ulik(yJ3s, yJ3s_res)
pv3s = FS3s / (1 + rf3s) ** T3s
DS3s_put = pv3s - n3s * p75_3s / 1e9
assert abs(DS3s_put - DS3s) < 0.001                     # likt opp til avrunding av kursene
# hale: høyere volatilitet med V uendret (internt med BS): EK opp, senior ned, junior ned her
sig3h = 0.40
c75h, c100h = _bs_call(S3s, 75, T3s, rf3s, sig3h), _bs_call(S3s, 100, T3s, rf3s, sig3h)
c75l, c100l = _bs_call(S3s, 75, T3s, rf3s, sig3s), _bs_call(S3s, 100, T3s, rf3s, sig3s)
assert c100h > c100l and c75h > c75l                   # EK opp, senior (V − C75) ned
assert (c75h - c100h) < (c75l - c100l)                  # junior ned med disse tallene


def kurstabell(tab, valuta, med_put=False):
    hode = ["Strike (" + valuta + ")", "Call bid", "Call ask"] + (["Put bid", "Put ask"] if med_put else [])
    rader = []
    for x in tab:
        rad = [f(x["K"], 0), f(x["bid"], 2), f(x["ask"], 2)]
        if med_put:
            rad += [f(x["pbid"], 2), f(x["pask"], 2)] if x["pmid"] >= 0.05 else ["–", "–"]
        rader.append(rad)
    return tabell(hode, rader)

# ------------------------------------------------------------------ binomisk 1
bin1 = {
    "n": 1,
    "title": "Options",
    "points": 20,
    "topic": "Options, binomial model and put-call parity",
    "chapters": [21, 22],
    "merke": "Samme form som binomeksemplet i forelesning 12 (47:01 til 1:23:00)",
    "body": P(
        "Corvallis Robotics Inc. shares trade at USD 48 today. In one year the share price will be either "
        "USD 66 or USD 36. The one-year risk-free rate is 4%; you can borrow and lend at this rate. Corvallis "
        "pays no dividends. Consider European options on one Corvallis share that expire in one year and have "
        "a strike price of USD 52. Use 4 decimal places."),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": P(
                "What do the call and the put pay in each state? Check that (1 + r<sub>f</sub>)S<sub>0</sub> "
                "lies between the two possible share prices and explain briefly why it must."),
            "solution": P(
                f"Call: C<sub>u</sub> = max(66 − 52, 0) = <b>{f(Cu1b, 0)}</b> and C<sub>d</sub> = max(36 − 52, 0) "
                f"= <b>0</b>. Put: P<sub>u</sub> = max(52 − 66, 0) = <b>0</b> and P<sub>d</sub> = max(52 − 36, 0) "
                f"= <b>{f(Pd1b, 0)}</b>.",
                f"(1 + r<sub>f</sub>)S<sub>0</sub> = 1.04 × 48 = <b>{f(ce1b, 2)}</b>, which lies between 36 and 66. "
                "It must: if it were above 66, selling the share and investing at the risk-free rate would beat "
                "holding the share in both states; if it were below 36, borrowing to buy the share would always "
                "win. Either would be an arbitrage (recording 12, 1:01:40)."),
            "criteria": [
                f"Payoffs: call {f(Cu1b, 0)} and 0, put 0 and {f(Pd1b, 0)}.",
                f"(1 + r_f)S_0 = {f(ce1b, 2)}, between 36 and 66.",
                "Reason: otherwise the share or the risk-free asset would dominate in both states, which is an arbitrage.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P(
                "Construct a portfolio of N shares and a risk-free position X (borrowing or lending) that "
                "replicates the call. Show that it pays the same as the call in both states. What is the call "
                "worth today?"),
            "solution": P(
                "<b>Step 1. Two equations.</b> The portfolio must pay what the call pays in each state:",
                f"Up: 66N + 1.04X = {f(Cu1b, 0)}<br>Down: 36N + 1.04X = 0",
                f"<b>Step 2. Solve.</b> Subtracting: 30N = {f(Cu1b, 0)}, so N = {f(Cu1b, 0)}/30 = "
                f"<b>{f(N1b)}</b> shares. Then 1.04X = −36 × {f(N1b, 6)} = {f(-Sd1b * N1b)}, so "
                f"X = <b>{f(X1b)}</b>: you <b>borrow</b> USD {f(-X1b)}.",
                f"<b>Step 3. Check.</b> Up: {f(N1b, 6)} × 66 − {f(-(1 + rf1b) * X1b)} = {f(N1b * Su1b)} − "
                f"{f(-(1 + rf1b) * X1b)} = {f(Cu1b)}. Down: {f(N1b * Sd1b)} − {f(-(1 + rf1b) * X1b)} = 0. ✓",
                f"<b>Step 4. Price.</b> The call must cost what the portfolio costs:<br>C<sub>0</sub> = "
                f"{f(N1b, 6)} × 48 − {f(-X1b)} = {f(N1b * S1b)} − {f(-X1b)} = <b>USD {f(C1b)}</b>",
                "As the lecture notes, replicating a call always means borrowing and holding less than one share "
                "(recording 12, 1:10:42)."),
            "criteria": [
                "Sets up the two replication equations, one per state, with the risk-free position growing at 4%.",
                f"N = {f(N1b)} shares.",
                f"X = {f(X1b)}: borrow USD {f(-X1b)}. Writing the borrowing as lending loses these points.",
                "Shows that the portfolio pays 14 and 0, as the question asks.",
                f"C_0 = {f(N1b)} × 48 − {f(-X1b)} = {f(C1b)}.",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": P("Find the risk-neutral probability ρ of the up state and use it to price the call. Compare with (b)."),
            "solution": P(
                f"ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = "
                f"({f(ce1b, 2)} − 36)/(66 − 36) = {f(ce1b - Sd1b, 2)}/30 = <b>{f(rho1b)}</b>",
                f"C<sub>0</sub> = [ρ × {f(Cu1b, 0)} + (1 − ρ) × 0]/1.04 = {f(rho1b * Cu1b)}/1.04 = "
                f"<b>{f(C1b_rho)}</b>, the same as in (b). ✓",
                f"Check that ρ prices the share: [{f(rho1b, 3)} × 66 + {f(1 - rho1b, 3)} × 36]/1.04 = "
                f"({f(rho1b * Su1b)} + {f((1 - rho1b) * Sd1b)})/1.04 = {f(ce1b, 2)}/1.04 = 48. ✓ Forgetting "
                f"(1 + r<sub>f</sub>) gives ρ = {f(rho1b_felle_uten_rf)}, which is wrong."),
            "criteria": [
                f"ρ = ({f(ce1b, 2)} − 36)/30 = {f(rho1b)}.",
                f"C_0 = {f(rho1b)} × 14/1.04 = {f(C1b_rho)}, equal to (b).",
                f"Uses (1 + r_f)S_0, not S_0 (which gives {f(rho1b_felle_uten_rf)}).",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": P("Use put-call parity to find the price of the put. (If you could not find the call price, use USD 6.00.)"),
            "solution": P(
                "Put-call parity: C + PV(K) = P + S<sub>0</sub>, so",
                f"P = C − S<sub>0</sub> + K/(1 + r<sub>f</sub>) = {f(C1b)} − 48 + 52/1.04 = {f(C1b)} − 48 + "
                f"{f(pvK1b)} = <b>USD {f(P1b)}</b>",
                f"Check with ρ: (1 − {f(rho1b, 3)}) × {f(Pd1b, 0)}/1.04 = {f((1 - rho1b) * Pd1b)}/1.04 = {f(P1b)}. ✓",
                f"With the fallback call price of 6.00: P = 6.00 − 48 + {f(pvK1b)} = {f(P1b_res)}."),
            "criteria": [
                "States put-call parity, C + PV(K) = P + S_0. Discounts K one year at 4%.",
                f"P = {f(C1b)} − 48 + {f(pvK1b)} = {f(P1b)}. With the fallback 6.00: {f(P1b_res)}, full marks.",
                "Bonus: checks the put with ρ.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": P(
                "A dealer offers to buy Corvallis calls (strike USD 52, one year) from you at USD 6.90 each. "
                "Describe a strategy that gives a riskless profit. Show its cash flows today and in each state "
                "in one year."),
            "solution": P(
                f"The call is worth {f(C1b)}, so the dealer overpays. <b>Sell</b> one call to the dealer and "
                f"<b>buy the replicating portfolio</b> from (b): buy {f(N1b)} shares and borrow {f(-X1b)}.")
            + tabell(["Position", "Today", "Up (S = 66)", "Down (S = 36)"], [
                ["Sell one call", f(TILBUD1b, 2), f(-Cu1b), "0"],
                [f"Buy {f(N1b)} shares", f(-N1b * S1b), f(N1b * Su1b), f(N1b * Sd1b)],
                [f"Borrow {f(-X1b)}", f(-X1b), f((1 + rf1b) * X1b), f((1 + rf1b) * X1b)],
                ["<b>Total</b>", f"<b>{f(gevinst1b)}</b>", "0", "0"],
            ])
            + P(
                f"You pocket <b>USD {f(gevinst1b)}</b> per call today and owe nothing later: the portfolio covers "
                "the call in both states. Buying from the dealer would be the wrong side, since the dealer's "
                "price is above the value."),
            "criteria": [
                f"Sees that 6.90 is above the call's value of {f(C1b)}, so the call should be sold.",
                f"Hedges the sold call with the replicating portfolio: buy {f(N1b)} shares and borrow {f(-X1b)}.",
                f"Cash flows: +{f(gevinst1b)} today and 0 in both states. Shows the table or the equivalent sums.",
                "A strategy with risk left in one of the states does not count as an arbitrage.",
            ],
        },
        {
            "label": "f", "points": 3,
            "body": P(
                "An analyst says that the share rises with probability 80%, so the call must be worth more than "
                "you found. Do you agree? Explain briefly."),
            "solution": P(
                "<b>No.</b> The portfolio in (b) pays exactly what the call pays in both states, whatever the "
                f"probabilities are, so the call must cost what the portfolio costs, {f(C1b)}. The lecture stresses "
                "that the replication does not use the probabilities at all (recording 12, 1:08:02).",
                "The real probabilities and investors' attitude to risk are already in the share price of 48. "
                f"A higher chance of the up state would show up as a higher S<sub>0</sub>, not as a higher call "
                f"price for a given S<sub>0</sub>. ρ = {f(rho1b)} is not a forecast. If the call sold for more, "
                "the strategy in (e) would make money."),
            "criteria": [
                "1 point: no, the call value does not depend on the real probabilities.",
                "1 point: because the call can be replicated with the share and the risk-free asset, its price "
                "follows from their prices.",
                "1 point: the real probabilities are already reflected in S_0; ρ is not a forecast.",
            ],
        },
    ],
}

sv_bin1 = {
    "mk-binomisk-1:1:a": {"type": "blandet", "tall": [
        {"navn": "Call payoff, up", "verdi": Cu1b, "enhet": "USD"},
        {"navn": "Put payoff, down", "verdi": Pd1b, "enhet": "USD"}],
        "tallPoeng": 1, "tekstLedd": "Check that (1 + r_f)S_0 lies between the two prices and explain why it must.",
        "merknad": "De to nullutbetalingene er ikke med som tall."},
    "mk-binomisk-1:1:b": {"type": "tall", "tall": [
        {"navn": "N (shares)", "verdi": N1b, "enhet": ""},
        {"navn": "X (lending +, borrowing −)", "verdi": X1b, "enhet": "USD"},
        {"navn": "Call price", "verdi": C1b, "enhet": "USD"}]},
    "mk-binomisk-1:1:c": {"type": "tall", "tall": [
        {"navn": "ρ", "verdi": 100 * rho1b, "enhet": "%"},
        {"navn": "Call price", "verdi": C1b_rho, "enhet": "USD"}],
        "merknad": f"Sannsynlighet i prosent ({f(100 * rho1b, 2)} %; {f(rho1b)} godtas også)."},
    "mk-binomisk-1:1:d": {"type": "tall", "tall": [
        {"navn": "Put price", "verdi": P1b, "enhet": "USD", "alt": [P1b_res]}],
        "merknad": f"alt {f(P1b_res)} er svaret med reserveverdien 6.00 for call."},
    "mk-binomisk-1:1:e": {"type": "blandet", "tall": [
        {"navn": "Cash flow today", "verdi": gevinst1b, "enhet": "USD"}],
        "tallPoeng": 1.5, "tekstLedd": "Describe the strategy and its cash flows in each state."},
    "mk-binomisk-1:1:f": {"type": "tekst"},
}

# ------------------------------------------------------------------ binomisk 2
bin2 = {
    "n": 1,
    "title": "Risk-neutral option valuation",
    "points": 20,
    "topic": "Options, risk-neutral probabilities and put-call parity",
    "chapters": [21, 22],
    "merke": "Samme form som Home Assignment 2, oppgave 2",
    "body": P(
        "Hellefoss Papir ASA trades at NOK 140 per share. In one year the share price will be either NOK 175 or "
        "NOK 112. The one-year risk-free rate is 5%. This uncertainty is the only factor affecting the share "
        "price, so the observed prices are fair. Hellefoss pays no dividends. Consider one-year European call "
        "and put options on one Hellefoss share, both with a strike price of NOK 150. Use 4 decimal places."),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P("Find the market-implied (risk-neutral) probabilities of the high and the low state."),
            "solution": P(
                f"ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = "
                f"(1.05 × 140 − 112)/(175 − 112) = ({f(ce2b, 0)} − 112)/63 = 35/63 = <b>{f(rho2b)}</b>",
                f"1 − ρ = <b>{f(1 - rho2b)}</b> for the low state.",
                f"Check: [{f(rho2b, 6)} × 175 + {f(1 - rho2b, 6)} × 112]/1.05 = ({f(rho2b * Su2b)} + "
                f"{f((1 - rho2b) * Sd2b)})/1.05 = {f(ce2b)}/1.05 = 140. ✓"),
            "criteria": [
                f"ρ = (147 − 112)/63 = {f(rho2b)} for the high state.",
                f"1 − ρ = {f(1 - rho2b)} for the low state.",
                "Uses (1 + r_f)S_0, the certainty equivalent, not S_0.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P(
                "Calculate the prices of the call and the put. (If you could not solve (a), use a probability of "
                "0.50 for the high state.)"),
            "solution": P(
                f"Payoffs: the call pays {f(Cu2b, 0)} in the high state and 0 in the low; the put pays 0 and "
                f"{f(Pd2b, 0)}. Kurbatov's advice is to price first whichever option is easier and get the other "
                "from parity (recording 18, 57:02). Here both pay in only one state, so either order works and the "
                "second route is the check.",
                f"Call: C = [{f(rho2b)} × {f(Cu2b, 0)} + {f(1 - rho2b)} × 0]/1.05 = {f(rho2b * Cu2b)}/1.05 = "
                f"<b>NOK {f(C2b)}</b>",
                f"Put from parity: P = C − S<sub>0</sub> + K/(1 + r<sub>f</sub>) = {f(C2b)} − 140 + 150/1.05 = "
                f"{f(C2b)} − 140 + {f(pvK2b)} = <b>NOK {f(P2b)}</b>",
                f"Check with ρ: {f(1 - rho2b)} × {f(Pd2b, 0)}/1.05 = {f((1 - rho2b) * Pd2b)}/1.05 = {f(P2b)}. ✓",
                f"With the fallback ρ = 0.50: C = 0.50 × 25/1.05 = {f(C2b_res)} and P = {f(C2b_res)} − 140 + "
                f"{f(pvK2b)} = {f(P2b_res)}."),
            "criteria": [
                f"Payoffs {f(Cu2b, 0)} for the call in the high state and {f(Pd2b, 0)} for the put in the low state.",
                f"C = {f(rho2b)} × 25/1.05 = {f(C2b)}.",
                f"P = {f(P2b)}, by parity or directly with 1 − ρ.",
                "Discounts with the risk-free rate, not with the share's expected return.",
                f"With the fallback ρ = 0.50: {f(C2b_res)} and {f(P2b_res)}, full marks.",
                "Bonus: prices the second option both ways as a check.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": P(
                "A broker quotes the call at NOK 12.20 and the put at NOK 17.30; you can buy or sell at these "
                "prices. You can also trade the share and borrow or lend at 5%. Is there an arbitrage? If so, "
                "describe it and show its cash flows today and in each state in one year."),
            "solution": P(
                "<b>Step 1. Test put-call parity with the quotes.</b>",
                f"C + PV(K) = 12.20 + {f(pvK2b)} = {f(venstre2b)}<br>P + S<sub>0</sub> = 17.30 + 140 = "
                f"{f(hoyre2b)}",
                f"The two portfolios pay the same in every state, but the call side is {f(arb2b)} cheaper. "
                f"<b>Yes, there is an arbitrage.</b> Compared with (b), the call is quoted below its value "
                f"({f(C2b)}) and the put above its value ({f(P2b)}).",
                "<b>Step 2. Buy the cheap side, sell the expensive side.</b> Buy the call and lend PV(K); sell the "
                "put and sell the share short.")
            + tabell(["Position", "Today", "High (S = 175)", "Low (S = 112)"], [
                ["Buy the call", "−12.20", f(Su2b - K2b, 0), "0"],
                ["Lend PV(150)", f(-pvK2b), "150", "150"],
                ["Sell the put", "17.30", "0", f(-(K2b - Sd2b), 0)],
                ["Short one share", "140.00", "−175", "−112"],
                ["<b>Total</b>", f"<b>{f(arb2b)}</b>", "0", "0"],
            ])
            + P(
                f"You receive <b>NOK {f(arb2b)}</b> today and nothing is owed later. Parity uses only the quoted "
                "prices, so the arbitrage does not depend on ρ."),
            "criteria": [
                f"Compares C + PV(K) = {f(venstre2b)} with P + S_0 = {f(hoyre2b)} and concludes that there is an "
                "arbitrage.",
                "Buys the cheap side (call and lending) and sells the expensive side (put and short share).",
                f"Cash flows: +{f(arb2b)} today and 0 in both states.",
                "Also accepted: buying the call and hedging it with the replicating portfolio (short shares and "
                "lending), if the cash flows are shown.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": P("For which strike price would a one-year call and a one-year put on Hellefoss cost the same? Explain."),
            "solution": P(
                "Put-call parity gives C − P = S<sub>0</sub> − K/(1 + r<sub>f</sub>). The two prices are equal "
                "when the right-hand side is zero:",
                f"K = S<sub>0</sub>(1 + r<sub>f</sub>) = 140 × 1.05 = <b>NOK {f(Kstar2b, 0)}</b>",
                f"Check with ρ: the call pays 175 − 147 = 28 and the put 147 − 112 = 35, so C = {f(rho2b)} × 28/1.05 "
                f"= {f(Cs2b)} and P = {f(1 - rho2b)} × 35/1.05 = {f(Ps2b)}. ✓",
                "<b>Why.</b> At this strike the share's expected price under ρ, 147, equals the strike, so the "
                "risk-neutral expected payoff of the call equals that of the put. A call and a put with the same "
                "strike cost the same exactly when the strike is the price of the share compounded at the "
                "risk-free rate."),
            "criteria": [
                "Uses put-call parity: C − P = S_0 − PV(K).",
                f"K = 140 × 1.05 = {f(Kstar2b, 0)}.",
                "Explains: the strike equals the share price compounded at the risk-free rate, the expected price "
                "under ρ, so the two options have the same risk-neutral expected payoff.",
                "Bonus: checks with ρ that both options cost 14.8148.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "Suppose the share could instead end at NOK 190 or NOK 98, with today's price and the risk-free "
                "rate unchanged. Without calculation: what happens to the prices of the call and the put with "
                "strike NOK 150? Explain briefly."),
            "solution": P(
                "<b>Both rise.</b> The share still earns the risk-free rate under ρ, so its expected price under ρ "
                "stays at 147, but the outcomes are further apart. The call now pays more in the high state "
                "(40 instead of 25) and the put more in the low state (52 instead of 38), while neither can pay "
                "less than 0. Options gain from uncertainty because their payoff is asymmetric (recording 13, "
                "1:16:52).",
                f"By parity, C − P = S<sub>0</sub> − PV(K) is unchanged, so both rise by the same amount. (Bonus: "
                f"C = {f(C2e)} and P = {f(P2e)}.)"),
            "criteria": [
                "1 point: both prices rise.",
                "1 point: more spread between the outcomes raises the payoff in the state where each option pays, "
                "while the payoff cannot fall below 0.",
                "1 point: parity, C − P = S_0 − PV(K), does not change, so both rise by the same amount; or an "
                "equivalent volatility argument.",
            ],
        },
    ],
}

sv_bin2 = {
    "mk-binomisk-2:1:a": {"type": "tall", "tall": [
        {"navn": "ρ, high state", "verdi": 100 * rho2b, "enhet": "%"},
        {"navn": "1 − ρ, low state", "verdi": 100 * (1 - rho2b), "enhet": "%"}],
        "merknad": "Sannsynligheter i prosent; desimaltall godtas også."},
    "mk-binomisk-2:1:b": {"type": "tall", "tall": [
        {"navn": "Call price", "verdi": C2b, "enhet": "NOK", "alt": [C2b_res]},
        {"navn": "Put price", "verdi": P2b, "enhet": "NOK", "alt": [P2b_res]}],
        "merknad": f"alt er svarene med reserveverdien ρ = 0.50 ({f(C2b_res)} og {f(P2b_res)})."},
    "mk-binomisk-2:1:c": {"type": "blandet", "tall": [
        {"navn": "Cash flow today", "verdi": arb2b, "enhet": "NOK"}],
        "tallPoeng": 2, "tekstLedd": "Is there an arbitrage? Describe it and its cash flows."},
    "mk-binomisk-2:1:d": {"type": "blandet", "tall": [
        {"navn": "Strike", "verdi": Kstar2b, "enhet": "NOK"}],
        "tallPoeng": 2.5, "tekstLedd": "Explain."},
    "mk-binomisk-2:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ binomisk 3
bin3 = {
    "n": 1,
    "title": "Options",
    "points": 20,
    "topic": "Options, binomial model over six months",
    "chapters": [21, 22],
    "merke": "Samme form som seksmånederseksemplet i forelesning 12 (1:20:47)",
    "body": P(
        "Vandermeer Chemie NV shares trade at EUR 74. In six months the share price will be either EUR 86 or "
        "EUR 63. The risk-free rate is 4% a year (annual compounding). Vandermeer pays no dividends. Consider a "
        "European put and a European call on one Vandermeer share, both expiring in six months with a strike "
        "price of EUR 78. Use 4 decimal places."),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P("What is the risk-free growth factor for six months? Find the risk-neutral probability of the up state."),
            "solution": P(
                f"Half a year at 4% a year: 1.04<sup>0.5</sup> = √1.04 = <b>{f(g3b, 6)}</b> (recording 12, 1:21:03).",
                f"ρ = ({f(g3b, 6)} × 74 − 63)/(86 − 63) = ({f(ce3b)} − 63)/23 = {f(ce3b - Sd3b)}/23 = "
                f"<b>{f(rho3b)}</b>",
                f"Using the full-year factor 1.04 gives {f(rho3b_felle_helt_aar)}, which is wrong. Halving the rate "
                f"(1.02) is a different compounding convention; the text says annual compounding, although here it "
                f"gives almost the same ρ ({f(rho3b_halv_rente)})."),
            "criteria": [
                f"Six-month factor √1.04 = {f(g3b, 6)}.",
                f"ρ = ({f(ce3b)} − 63)/23 = {f(rho3b)}.",
                f"Using 1.04 for six months gives {f(rho3b_felle_helt_aar)}: wrong.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P(
                "Construct a portfolio of Δ shares and a risk-free position B that replicates the put. What is the "
                "put worth today? Check your answer with ρ."),
            "solution": P(
                f"Payoffs: P<sub>u</sub> = max(78 − 86, 0) = 0 and P<sub>d</sub> = max(78 − 63, 0) = {f(Pd3b, 0)}.",
                "<b>Step 1. Two equations.</b> Up: 86Δ + 1.019804B = 0. Down: 63Δ + 1.019804B = 15.",
                f"<b>Step 2. Solve.</b> Subtracting: 23Δ = −15, so Δ = <b>{f(D3b)}</b>: sell {f(-D3b)} shares short. "
                f"Then B = {f(-D3b, 6)} × 86/{f(g3b, 6)} = {f(-D3b * Su3b)}/{f(g3b, 6)} = <b>{f(B3b)}</b>: lend "
                f"EUR {f(B3b)}.",
                f"<b>Step 3. Check.</b> Up: −{f(-D3b * Su3b)} + {f(g3b * B3b)} = 0. Down: −{f(-D3b * Sd3b)} + "
                f"{f(g3b * B3b)} = {f(Pd3b)}. ✓",
                f"<b>Step 4. Price.</b> P<sub>0</sub> = {f(D3b, 6)} × 74 + {f(B3b)} = {f(D3b * S3b)} + {f(B3b)} = "
                f"<b>EUR {f(P3b)}</b>",
                f"Check with ρ: (1 − {f(rho3b, 6)}) × 15/{f(g3b, 6)} = {f((1 - rho3b) * Pd3b)}/{f(g3b, 6)} = "
                f"{f(P3b)}. ✓ A put is replicated by selling shares short and lending, the mirror image of a call."),
            "criteria": [
                "Sets up the two equations with the six-month factor on the risk-free position.",
                f"Δ = {f(D3b)} (a short position) and B = {f(B3b)} (lending).",
                "Shows that the portfolio pays 0 and 15.",
                f"P_0 = {f(P3b)}, confirmed with ρ.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": P(
                "Use put-call parity to price the call. Check your answer with ρ. (If you could not solve (b), use "
                "a put price of EUR 6.50.)"),
            "solution": P(
                f"PV(K) = 78/{f(g3b, 6)} = {f(pvK3b)}, discounted for six months.",
                f"C = P + S<sub>0</sub> − PV(K) = {f(P3b)} + 74 − {f(pvK3b)} = <b>EUR {f(C3b)}</b>",
                f"Check with ρ: the call pays 8 in the up state, so C = {f(rho3b, 6)} × 8/{f(g3b, 6)} = {f(C3b)}. ✓",
                f"Discounting K with 1.04 instead gives {f(C3b_felle)}: wrong for a six-month option. With the "
                f"fallback put of 6.50: C = 6.50 + 74 − {f(pvK3b)} = {f(C3b_res)}."),
            "criteria": [
                f"PV(K) with the six-month factor: {f(pvK3b)}.",
                f"C = {f(P3b)} + 74 − {f(pvK3b)} = {f(C3b)}. With the fallback put: {f(C3b_res)}, full marks.",
                f"Checks with ρ: {f(rho3b)} × 8/{f(g3b)} = {f(C3b)}.",
                f"Discounting with 1.04 gives {f(C3b_felle)}: wrong.",
            ],
        },
        {
            "label": "d", "points": 5,
            "body": P(
                "A bank sells a six-month product on Vandermeer shares. At maturity it pays the higher of the share "
                "price and EUR 78. The bank charges EUR 81.60. What is the product worth? Would you buy it, or could "
                "you build the same payoff more cheaply yourself? How? (If you could not solve (b), use EUR 6.50 "
                "for the put.)"),
            "solution": P(
                "<b>Step 1. Recognise the payoff.</b> max(S<sub>T</sub>, 78) = S<sub>T</sub> + max(78 − "
                "S<sub>T</sub>, 0): one share plus one put with strike 78, the share-plus-put line from the "
                "lecture (recording 12, 36:16).",
                f"<b>Step 2. Value it.</b> 74 + {f(P3b)} = <b>EUR {f(prod3b)}</b>. By parity the same payoff is one "
                f"call plus lending PV(78): {f(C3b)} + {f(pvK3b)} = {f(prod3b)}. ✓ Directly with ρ: the product "
                f"pays 86 or 78, so [{f(rho3b, 6)} × 86 + {f(1 - rho3b, 6)} × 78]/{f(g3b, 6)} = {f(prod3b)}. ✓",
                f"<b>Step 3. Decision.</b> The bank charges 81.60, {f(PRIS3b - prod3b)} more than the product is "
                "worth. <b>Do not buy it</b>; build it yourself by buying one share and one put with strike 78, or "
                f"one call and a six-month deposit of {f(pvK3b)}. With the fallback put: 74 + 6.50 = "
                f"{f(prod3b_res)}, still below 81.60."),
            "criteria": [
                "Recognises the payoff as one share plus one put with strike 78 (or one call plus a risk-free deposit of PV(78)).",
                f"Value 74 + {f(P3b)} = {f(prod3b)}. With the fallback put: {f(prod3b_res)}, full marks.",
                f"Concludes that the product is overpriced by {f(PRIS3b - prod3b)}, so you should not buy it.",
                "Says how to build it yourself: share plus put, or call plus lending.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "Suppose the put were American instead, so it could be exercised at any time before it expires. "
                "Without calculation: would you expect its price to be higher or lower than the price of the "
                "European put? Explain briefly."),
            "solution": P(
                "<b>Not lower; in general higher.</b> An American put gives every right the European put gives, plus "
                "the right to exercise early. Extra rights cannot have a negative value, so the American put is "
                "worth at least as much (recording 12, 12:41; recording 18, 58:18).",
                "Early exercise of a put can pay when it is deep in the money: you receive the strike now and can "
                "earn interest on it instead of waiting.",
                f"Bonus: in this one-step tree, exercising today pays 78 − 74 = {f(straks3b, 0)}, less than the "
                f"European value {f(P3b)}, so it would not be exercised today and the two would be worth the same "
                "here. For a call on a share without dividends, early exercise never pays, so an American call "
                "would be worth the same as the European one."),
            "criteria": [
                "1 point: the American put is worth at least as much (higher or equal), never less.",
                "1 point: it contains all the rights of the European put plus early exercise.",
                "1 point: says when early exercise can pay (a deep in-the-money put: getting the strike early earns "
                "interest).",
                "Bonus: notes that exercising today pays only 4 here, so in this tree the two are worth the same.",
            ],
        },
    ],
}

sv_bin3 = {
    "mk-binomisk-3:1:a": {"type": "tall", "tall": [
        {"navn": "Six-month growth factor", "verdi": g3b, "enhet": "", "tol": 0.0005},
        {"navn": "ρ", "verdi": 100 * rho3b, "enhet": "%"}],
        "merknad": f"ρ i prosent ({f(100 * rho3b, 2)} %; {f(rho3b)} godtas også). Med 1.02 blir ρ "
                   f"{f(rho3b_halv_rente)}, innenfor toleransen; med 1.04 {f(rho3b_felle_helt_aar)}, avvist."},
    "mk-binomisk-3:1:b": {"type": "tall", "tall": [
        {"navn": "Δ (shares, short −)", "verdi": D3b, "enhet": ""},
        {"navn": "B (lending +, borrowing −)", "verdi": B3b, "enhet": "EUR"},
        {"navn": "Put price", "verdi": P3b, "enhet": "EUR"}]},
    "mk-binomisk-3:1:c": {"type": "tall", "tall": [
        {"navn": "Call price", "verdi": C3b, "enhet": "EUR", "alt": [C3b_res]}],
        "merknad": f"alt {f(C3b_res)} er svaret med reserveverdien 6.50 for put. Diskontert med 1.04: "
                   f"{f(C3b_felle)}, avvist."},
    "mk-binomisk-3:1:d": {"type": "blandet", "tall": [
        {"navn": "Value of the product", "verdi": prod3b, "enhet": "EUR", "alt": [prod3b_res]}],
        "tallPoeng": 2, "tekstLedd": "Would you buy it? How could you build the same payoff yourself?",
        "merknad": f"alt {f(prod3b_res)} er svaret med reserveverdien 6.50 for put."},
    "mk-binomisk-3:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ senior-junior 1
UB = "USD billion"
sj1 = {
    "n": 1,
    "title": "Corporate securities as options",
    "points": 20,
    "topic": "Debt and equity as options, senior and junior debt",
    "chapters": [21, 24],
    "merke": "Samme form som Google-eksemplet i forelesning 13 (57:39 til 1:16:02)",
    "body": P(
        "Quillback Genomics Inc. has 250 million shares trading at USD 64 and no debt. Markets are perfect and "
        "there are no taxes. Quillback considers issuing zero-coupon debt due in exactly 2 years and paying the "
        "proceeds out to its shareholders at once, which leaves the value of its assets unchanged. The risk-free "
        "rate is 2.5% a year (annual compounding).",
        "European calls on Quillback shares that expire in exactly 2 years are quoted below (USD per share). "
        "Because Quillback has no debt today, you can treat them as calls on the firm's assets per share. Use "
        "the midpoint of bid and ask. Give values in USD billion with 4 decimals and yields in % with 2 decimals.")
    + kurstabell(tab1s, "USD"),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P(
                "Quillback issues a single bond with face value USD 10 billion. Which strike per share corresponds "
                "to this debt? What is the equity worth after the issue?"),
            "solution": P(
                f"Firm value V = 250 million × 64 = USD {f(V1s, 1)} billion. The equity is a call on the assets with "
                f"strike equal to the face value of the debt: per share, 10 billion/250 million = <b>USD "
                f"{f(k1s, 0)}</b>.",
                f"Call with strike 40: midpoint of {f(kurs(tab1s, 40, 'bid'), 2)} and {f(kurs(tab1s, 40, 'ask'), 2)} "
                f"= {f(c40_1s, 2)}.",
                f"E = 250 million × {f(c40_1s, 2)} = <b>USD {f(E1s)} billion</b>"),
            "criteria": [
                f"Strike per share = face value/number of shares = {f(k1s, 0)}.",
                f"Midpoint {f(c40_1s, 2)} for the call with strike 40.",
                f"Multiplies by 250 million: E = {f(E1s)} {UB}. Forgetting to multiply by the number of shares is "
                "the classic slip (recording 13, 1:13:30).",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": P(
                "What is the debt worth? What annual yield does the bond offer? What is its spread over the "
                "risk-free rate? (If you could not solve (a), use an equity value of USD 7.5 billion.)"),
            "solution": P(
                f"D = V − E = {f(V1s, 1)} − {f(E1s)} = <b>USD {f(D1s)} billion</b>",
                f"The bond pays 10 in 2 years, so (1 + y)<sup>2</sup> = 10/{f(D1s)} = {f(F1s / D1s)} and "
                f"y = {f(F1s / D1s)}<sup>1/2</sup> − 1 = <b>{pk(y1s)}</b>.",
                f"Spread = {pk(y1s)} − 2.50% = <b>{f(100 * spr1s, 2)} percentage points</b>.",
                f"Forgetting to annualise gives {pk(y1s_felle_T)} over two years, not a yearly rate. With the "
                f"fallback E = 7.5: D = 8.5, y = {pk(y1s_res)} and the spread is {f(100 * (y1s_res - rf1s), 2)} "
                "percentage points."),
            "criteria": [
                f"D = {f(V1s, 1)} − {f(E1s)} = {f(D1s)} {UB}.",
                f"Annual yield (10/{f(D1s)})^(1/2) − 1 = {pk(y1s)}. With the fallback: {pk(y1s_res)}, full marks.",
                f"Spread {f(100 * spr1s, 2)} percentage points over 2.5%.",
                f"Reporting the two-year return {pk(y1s_felle_T)} as the yield is wrong.",
            ],
        },
        {
            "label": "c", "points": 6,
            "body": P(
                "Suppose instead that the debt is split into a senior bond with face value USD 6 billion and a "
                "junior bond with face value USD 4 billion, both zero-coupon and due in 2 years. What are the "
                "senior debt, the junior debt and the equity worth?"),
            "solution": P(
                f"<b>Step 1. Equity.</b> The shareholders are paid only after both bonds, so the strike is the total "
                f"face value, 10 billion, or USD 40 per share as before: E = <b>USD {f(E1s)} billion</b>.",
                f"<b>Step 2. Senior debt.</b> Everything above the senior face value is a call with strike 6 "
                f"billion/250 million = USD {f(kS1s, 0)} per share: midpoint {f(c24_1s, 2)}, so C(F<sub>S</sub>) = "
                f"250 million × {f(c24_1s, 2)} = {f(CS1s)}. The senior creditors get the rest:<br>"
                f"D<sub>S</sub> = V − C(F<sub>S</sub>) = {f(V1s, 1)} − {f(CS1s)} = <b>USD {f(DS1s)} billion</b>",
                f"<b>Step 3. Junior debt</b> is the slice between the two strikes:<br>D<sub>J</sub> = "
                f"C(F<sub>S</sub>) − C(F<sub>S</sub> + F<sub>J</sub>) = {f(CS1s)} − {f(E1s)} = <b>USD {f(DJ1s)} "
                "billion</b> (recording 13, 50:56).",
                f"Pricing the junior bond as a single call with strike 16 gives {f(DJ1s_felle)}, more than its face "
                "value: wrong, since the junior creditors are paid only after the senior ones."),
            "criteria": [
                f"Equity is still the call with strike 40 (total face value): {f(E1s)}.",
                f"Senior strike {f(kS1s, 0)} per share; D_S = {f(V1s, 1)} − {f(CS1s)} = {f(DS1s)}.",
                f"Junior debt as the difference between two calls: {f(CS1s)} − {f(E1s)} = {f(DJ1s)}.",
                f"Pricing junior as one call with strike 16 ({f(DJ1s_felle)}) is the classic error.",
                "Multiplies every per-share call by 250 million.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": P(
                "What annual yields do the senior and the junior bonds offer? Check that the three claims add up to "
                "the firm value. (If you could not solve (c), use USD 5.5 billion for the senior and USD 3.0 billion "
                "for the junior debt.)"),
            "solution": P(
                f"Senior: (6/{f(DS1s)})<sup>1/2</sup> − 1 = <b>{pk(yS1s)}</b>",
                f"Junior: (4/{f(DJ1s)})<sup>1/2</sup> − 1 = <b>{pk(yJ1s)}</b>",
                f"Sum: {f(DS1s)} + {f(DJ1s)} + {f(E1s)} = {f(DS1s + DJ1s + E1s)} = V. ✓ This holds by construction, "
                "since the three claims are cut from the same firm with the same calls; it catches arithmetic slips "
                "such as a missing multiplication by the number of shares.",
                f"With the fallback values: senior {pk(yS1s_res)} and junior {pk(yJ1s_res)}."),
            "criteria": [
                f"Senior yield {pk(yS1s)}.",
                f"Junior yield {pk(yJ1s)}. With the fallback values: {pk(yS1s_res)} and {pk(yJ1s_res)}, full marks.",
                f"Sum of the three claims = {f(V1s, 1)}, labelled as an identity that catches slips.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "Explain briefly why the junior yield is higher than the yield on the single bond in (b), which in "
                "turn is higher than the senior yield. Is the junior yield the return junior creditors should "
                "expect?"),
            "solution": P(
                f"<b>Ordering.</b> The senior creditors are paid first and lose only if the assets end below USD 6 "
                f"billion, so their bond is the safest ({pk(yS1s)}). The single bond is the senior and junior "
                f"slices together, so its risk and yield ({pk(y1s)}) lie in between. The junior creditors take the "
                f"first losses after the shareholders and are wiped out below 6 billion, so they demand the most "
                f"({pk(yJ1s)}).",
                "<b>Not the expected return.</b> The yield is the promised return if the bond is paid in full. The "
                "expected return is lower, because with some probability the junior bond pays less than its face "
                "value."),
            "criteria": [
                "1 point: seniority: senior is paid first and is the safest, junior takes the first losses after equity.",
                "1 point: the single bond combines the two slices, so its yield lies between them.",
                "1 point: the yield is the promised return if paid in full, above the expected return.",
            ],
        },
    ],
}

sv_sj1 = {
    "mk-senior-junior-1:1:a": {"type": "tall", "tall": [
        {"navn": "Strike per share", "verdi": k1s, "enhet": "USD"},
        {"navn": "Equity value", "verdi": E1s, "enhet": "USD bn"}]},
    "mk-senior-junior-1:1:b": {"type": "tall", "tall": [
        {"navn": "Debt value", "verdi": D1s, "enhet": "USD bn", "alt": [V1s - RES_E1s]},
        {"navn": "Annual yield", "verdi": 100 * y1s, "enhet": "%", "alt": [100 * y1s_res]},
        {"navn": "Spread", "verdi": 100 * spr1s, "enhet": "%", "alt": [100 * (y1s_res - rf1s)]}],
        "merknad": "alt er svarene med reserveverdien E = 7.5. Spredningen er i prosentpoeng."},
    "mk-senior-junior-1:1:c": {"type": "tall", "tall": [
        {"navn": "Senior debt", "verdi": DS1s, "enhet": "USD bn"},
        {"navn": "Junior debt", "verdi": DJ1s, "enhet": "USD bn"},
        {"navn": "Equity", "verdi": E1s, "enhet": "USD bn"}],
        "merknad": f"Junior som én call med strike 16 gir {f(DJ1s_felle)}; det avvises."},
    "mk-senior-junior-1:1:d": {"type": "tall", "tall": [
        {"navn": "Senior yield", "verdi": 100 * yS1s, "enhet": "%", "alt": [100 * yS1s_res]},
        {"navn": "Junior yield", "verdi": 100 * yJ1s, "enhet": "%", "alt": [100 * yJ1s_res]}],
        "merknad": "alt er svarene med reserveverdiene 5.5 og 3.0."},
    "mk-senior-junior-1:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ senior-junior 2
UN = "NOK billion"
sj2 = {
    "n": 1,
    "title": "Corporate securities as options",
    "points": 20,
    "topic": "Debt and equity as options, senior and junior debt",
    "chapters": [21, 24],
    "merke": "Samme form som Google-eksemplet i forelesning 13, med to lån fra start",
    "body": P(
        "Brattheim Kraft ASA has 180 million shares trading at NOK 95 and no debt. Markets are perfect and there "
        "are no taxes. Brattheim plans to issue two zero-coupon bonds due in exactly 3 years: a senior bond with "
        "face value NOK 7.2 billion and a junior bond with face value NOK 3.6 billion. It will pay all the "
        "proceeds out to its shareholders at once as a special dividend, so the value of its assets is "
        "unchanged. The risk-free rate is 4% a year (annual compounding).",
        "European calls on Brattheim shares that expire in exactly 3 years are quoted below (NOK per share). "
        "Because Brattheim has no debt today, you can treat them as calls on its assets per share. Use the "
        "midpoint of bid and ask. Use 4 decimal places.")
    + kurstabell(tab2s, "NOK"),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P(
                "Which strike per share belongs to the senior bond and which to the total debt? What is the equity "
                "worth after the issue?"),
            "solution": P(
                f"Senior: 7.2 billion/180 million = <b>NOK {f(kS2s, 0)}</b> per share. Total debt: 10.8 billion/180 "
                f"million = <b>NOK {f(kT2s, 0)}</b> per share.",
                f"The equity is a call on the assets with strike equal to the total face value: midpoint of "
                f"{f(kurs(tab2s, 60, 'bid'), 2)} and {f(kurs(tab2s, 60, 'ask'), 2)} = {f(c60_2s, 2)}, so "
                f"E = 180 million × {f(c60_2s, 2)} = <b>NOK {f(E2s)} billion</b>."),
            "criteria": [
                f"Strikes per share: {f(kS2s, 0)} for the senior bond and {f(kT2s, 0)} for the total debt.",
                f"Equity = call with strike 60 (both bonds rank ahead of the shareholders): {f(E2s)} {UN}.",
                "Using strike 40 or 20 for the equity is wrong.",
            ],
        },
        {
            "label": "b", "points": 6,
            "body": P("What are the senior and the junior debt worth?"),
            "solution": P(
                f"Firm value V = 180 million × 95 = NOK {f(V2s, 1)} billion.",
                f"<b>Senior.</b> Everything above the senior face value is the call with strike 40: midpoint "
                f"{f(c40_2s, 2)}, so C(F<sub>S</sub>) = 180 million × {f(c40_2s, 2)} = {f(CS2s)}. "
                f"D<sub>S</sub> = V − C(F<sub>S</sub>) = {f(V2s, 1)} − {f(CS2s)} = <b>NOK {f(DS2s)} billion</b>",
                f"<b>Junior.</b> D<sub>J</sub> = C(F<sub>S</sub>) − C(F<sub>S</sub> + F<sub>J</sub>) = {f(CS2s)} − "
                f"{f(E2s)} = <b>NOK {f(DJ2s)} billion</b>",
                f"Check: {f(DS2s)} + {f(DJ2s)} + {f(E2s)} = {f(V2s, 1)} = V. ✓ This holds by construction and "
                "catches arithmetic slips."),
            "criteria": [
                f"V = {f(V2s, 1)} {UN}.",
                f"Senior = V − 180 million × {f(c40_2s, 2)} = {f(DS2s)}.",
                f"Junior = C(40) − C(60) in totals: {f(CS2s)} − {f(E2s)} = {f(DJ2s)}.",
                "Pricing the junior bond as one call, or as V minus a call, is wrong: it is the slice between two calls.",
                "Bonus: checks that the three claims add up to V.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": P(
                "What special dividend per share do the shareholders receive? What is the share price right after "
                "the payout? Are the shareholders better or worse off? (If you could not solve (b), use NOK 6.0 "
                "billion for the senior and NOK 2.4 billion for the junior debt.)"),
            "solution": P(
                f"The proceeds are the market value of the two bonds: {f(DS2s)} + {f(DJ2s)} = {f(DS2s + DJ2s)} "
                f"billion, or {f(DS2s + DJ2s)} billion/180 million = <b>NOK {f(utb2s, 2)} per share</b>.",
                f"After the payout each share is a claim on the equity: {f(E2s)} billion/180 million = <b>NOK "
                f"{f(kurs2s, 2)}</b>, the call price with strike 60.",
                f"A shareholder had 95 and now has {f(utb2s, 2)} + {f(kurs2s, 2)} = {f(utb2s + kurs2s, 2)}: "
                "<b>neither better nor worse off</b>. In a perfect market the payout only moves value from the "
                "shares into cash; the firm value is unchanged (MM).",
                f"With the fallback values: dividend {f(utb2s_res, 2)} and share price {f(kurs2s_res, 2)}, which "
                "again sum to 95."),
            "criteria": [
                f"Dividend = (D_S + D_J)/180 million = {f(utb2s, 2)} per share.",
                f"Share price after the payout = E/180 million = {f(kurs2s, 2)}.",
                f"Shareholders are neither better nor worse off: {f(utb2s, 2)} + {f(kurs2s, 2)} = 95.",
                f"With the fallback values: {f(utb2s_res, 2)} and {f(kurs2s_res, 2)}, full marks.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": P(
                "What annual yields do the senior and the junior bonds offer? What are their spreads over the "
                "risk-free rate? (If you could not solve (b), use NOK 6.0 billion for the senior and NOK 2.4 "
                "billion for the junior debt.)"),
            "solution": P(
                f"Senior: (7.2/{f(DS2s)})<sup>1/3</sup> − 1 = <b>{pk(yS2s)}</b>, spread {f(100 * (yS2s - rf2s), 2)} "
                "percentage points.",
                f"Junior: (3.6/{f(DJ2s)})<sup>1/3</sup> − 1 = <b>{pk(yJ2s)}</b>, spread {f(100 * (yJ2s - rf2s), 2)} "
                "percentage points.",
                f"With the fallback values: {pk(yS2s_res)} and {pk(yJ2s_res)}."),
            "criteria": [
                f"Senior yield {pk(yS2s)} and junior yield {pk(yJ2s)}, annualised with the power 1/3.",
                f"Spreads {f(100 * (yS2s - rf2s), 2)} and {f(100 * (yJ2s - rf2s), 2)} percentage points.",
                f"With the fallback values: {pk(yS2s_res)} and {pk(yJ2s_res)}, full marks.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": P(
                "A board member suggests issuing all NOK 10.8 billion as one bond instead of two. Without "
                "calculation: would the shareholders be better or worse off? Would the creditors as a group pay more "
                "or less for their bonds? Explain."),
            "solution": P(
                "<b>No change for either group.</b> The equity is the call with strike equal to the total face value, "
                "60 per share, whether the debt is one bond or two, so the shareholders get the same. The creditors "
                f"as a group hold V − E = {f(DS2s + DJ2s)} billion either way; splitting the debt only divides "
                "their claim into a safer and a riskier slice. This is MM in option language: the face value can be "
                "cut in any way without changing the total (recording 13, 45:25).",
                f"Bonus: one bond would be worth {f(DS2s + DJ2s)} with a yield of {pk(y2s_samlet)}, between the "
                "senior and the junior yields."),
            "criteria": [
                "1 point: the shareholders are equally well off, because the equity is the same call (strike = total face value).",
                "1 point: the creditors as a group pay the same, V − E; the split only divides their claim.",
                "1 point: names the mechanism: the total value does not depend on how the claims are cut (MM, perfect markets).",
            ],
        },
    ],
}

sv_sj2 = {
    "mk-senior-junior-2:1:a": {"type": "tall", "tall": [
        {"navn": "Senior strike per share", "verdi": kS2s, "enhet": "NOK"},
        {"navn": "Total-debt strike per share", "verdi": kT2s, "enhet": "NOK"},
        {"navn": "Equity value", "verdi": E2s, "enhet": "NOK bn"}]},
    "mk-senior-junior-2:1:b": {"type": "tall", "tall": [
        {"navn": "Senior debt", "verdi": DS2s, "enhet": "NOK bn"},
        {"navn": "Junior debt", "verdi": DJ2s, "enhet": "NOK bn"}]},
    "mk-senior-junior-2:1:c": {"type": "blandet", "tall": [
        {"navn": "Dividend per share", "verdi": utb2s, "enhet": "NOK", "alt": [utb2s_res]},
        {"navn": "Share price after the payout", "verdi": kurs2s, "enhet": "NOK", "alt": [kurs2s_res]}],
        "tallPoeng": 2.5, "tekstLedd": "Are the shareholders better or worse off?",
        "merknad": "alt er svarene med reserveverdiene 6.0 og 2.4."},
    "mk-senior-junior-2:1:d": {"type": "tall", "tall": [
        {"navn": "Senior yield", "verdi": 100 * yS2s, "enhet": "%", "alt": [100 * yS2s_res]},
        {"navn": "Junior yield", "verdi": 100 * yJ2s, "enhet": "%", "alt": [100 * yJ2s_res]},
        {"navn": "Senior spread", "verdi": 100 * (yS2s - rf2s), "enhet": "%", "alt": [100 * (yS2s_res - rf2s)]},
        {"navn": "Junior spread", "verdi": 100 * (yJ2s - rf2s), "enhet": "%", "alt": [100 * (yJ2s_res - rf2s)]}],
        "merknad": "alt er svarene med reserveverdiene 6.0 og 2.4. Spredningene er i prosentpoeng."},
    "mk-senior-junior-2:1:e": {"type": "tekst"},
}

# ------------------------------------------------------------------ senior-junior 3
UE = "EUR billion"
sj3 = {
    "n": 1,
    "title": "Corporate securities as options",
    "points": 20,
    "topic": "Debt and equity as options, senior and junior debt",
    "chapters": [21, 23, 24],
    "merke": "Samme form som Google-eksemplet i forelesning 13 og PS3 E6",
    "body": P(
        "Rheinberg Logistik AG has 120 million shares trading at EUR 150 and no debt. Markets are perfect and "
        "there are no taxes. Rheinberg plans to issue a senior zero-coupon bond with face value EUR 9 billion and "
        "a junior zero-coupon bond with face value EUR 3 billion, both due in exactly 30 months. The proceeds are "
        "paid out to the shareholders at once, so the value of the assets is unchanged. The risk-free rate is 3% "
        "a year (annual compounding).",
        "European options on Rheinberg shares that expire in exactly 30 months are quoted below (EUR per share). "
        "Because Rheinberg has no debt today, you can treat them as options on its assets per share. Use the "
        "midpoint of bid and ask. Give values in EUR billion with 4 decimals and yields in % with 2 decimals.")
    + kurstabell(tab3s, "EUR", med_put=True),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": P(
                "Which strike per share belongs to the senior bond and which to the total debt? What is the equity "
                "worth?"),
            "solution": P(
                f"Senior: 9 billion/120 million = <b>EUR {f(kS3s, 0)}</b> per share. Total debt: 12 billion/120 "
                f"million = <b>EUR {f(kT3s, 0)}</b> per share.",
                f"Equity = call with strike 100: midpoint {f(c100_3s, 2)}, so E = 120 million × {f(c100_3s, 2)} = "
                f"<b>EUR {f(E3s)} billion</b>."),
            "criteria": [
                f"Strikes {f(kS3s, 0)} and {f(kT3s, 0)} per share.",
                f"E = 120 million × {f(c100_3s, 2)} = {f(E3s)} {UE}.",
                "Using the junior face value per share (25) as a strike for any claim is wrong.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": P("Using the calls, what are the senior and the junior debt worth?"),
            "solution": P(
                f"V = 120 million × 150 = EUR {f(V3s, 1)} billion.",
                f"Senior: C(F<sub>S</sub>) = 120 million × {f(c75_3s, 2)} = {f(CS3s)}, so D<sub>S</sub> = "
                f"{f(V3s, 1)} − {f(CS3s)} = <b>EUR {f(DS3s)} billion</b>.",
                f"Junior: D<sub>J</sub> = C(F<sub>S</sub>) − C(F<sub>S</sub> + F<sub>J</sub>) = {f(CS3s)} − {f(E3s)} = "
                f"<b>EUR {f(DJ3s)} billion</b>.",
                f"Check: {f(DS3s)} + {f(DJ3s)} + {f(E3s)} = {f(V3s, 1)}. ✓ (an identity that catches slips). The "
                f"call with strike 25 would give {f(DJ3s_felle)} for the junior bond, far above its face value of "
                "3: wrong."),
            "criteria": [
                f"Senior = {f(V3s, 1)} − 120 million × {f(c75_3s, 2)} = {f(DS3s)}.",
                f"Junior = C(75) − C(100) in totals = {f(DJ3s)}.",
                "Multiplies the per-share prices by 120 million and keeps billions and millions apart.",
                f"Junior priced as the call with strike 25 ({f(DJ3s_felle)}) is the classic error.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": P(
                "What annual yields do the two bonds offer? (If you could not solve (b), use EUR 8.0 billion for the "
                "senior and EUR 2.2 billion for the junior debt.)"),
            "solution": P(
                "30 months is T = 2.5 years, so the yield solves (1 + y)<sup>2.5</sup> = F/D:",
                f"Senior: (9/{f(DS3s)})<sup>1/2.5</sup> − 1 = <b>{pk(yS3s)}</b>",
                f"Junior: (3/{f(DJ3s)})<sup>1/2.5</sup> − 1 = <b>{pk(yJ3s)}</b>",
                f"Using T = 3 gives {pk(yS3s_felle)} and {pk(yJ3s_felle)}: wrong. With the fallback values: "
                f"{pk(yS3s_res)} and {pk(yJ3s_res)}."),
            "criteria": [
                "Converts 30 months to T = 2.5 years and annualises with the power 1/2.5.",
                f"Senior {pk(yS3s)}, junior {pk(yJ3s)}. With the fallback values: {pk(yS3s_res)} and {pk(yJ3s_res)}, full marks.",
                f"Using T = 3 ({pk(yJ3s_felle)} for junior) or a 30-month return is wrong.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": P(
                "Value the senior debt a second way, as risk-free debt plus a written put on the firm's assets. Do "
                "the two values agree?"),
            "solution": P(
                "Senior creditors receive min(V<sub>T</sub>, F<sub>S</sub>) = F<sub>S</sub> − max(F<sub>S</sub> − "
                "V<sub>T</sub>, 0): the face value for sure, less a put on the assets with strike F<sub>S</sub> that "
                "they have written. So D<sub>S</sub> = PV(F<sub>S</sub>) − P(F<sub>S</sub>).",
                f"PV(F<sub>S</sub>) = 9/1.03<sup>2.5</sup> = {f(pv3s)}. Put with strike 75: midpoint "
                f"{f(p75_3s, 2)}, so P(F<sub>S</sub>) = 120 million × {f(p75_3s, 2)} = {f(n3s * p75_3s / 1e9)}.",
                f"D<sub>S</sub> = {f(pv3s)} − {f(n3s * p75_3s / 1e9)} = <b>EUR {f(DS3s_put)} billion</b>",
                f"<b>Yes</b>, the same as {f(DS3s)} from (b) up to the rounding of the quoted prices. This is "
                "put-call parity: V − C(F<sub>S</sub>) = PV(F<sub>S</sub>) − P(F<sub>S</sub>)."),
            "criteria": [
                "Writes the senior payoff as the face value less a written put: D_S = PV(F_S) − P(F_S). Calling it "
                "risk-free debt minus a written put has the sign wrong.",
                f"PV(9) = {f(pv3s)} with T = 2.5.",
                f"Put total 120 million × {f(p75_3s, 2)} = {f(n3s * p75_3s / 1e9)}; D_S = {f(DS3s_put)}.",
                "Agrees with (b) up to rounding, because of put-call parity.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": P(
                "Rheinberg's managers consider a strategy that makes the firm's assets riskier while their value "
                "today stays at EUR 18 billion. Using the option view, explain what this does to the equity, the "
                "senior debt and the junior debt. No calculation is needed."),
            "solution": P(
                "<b>Equity rises.</b> It is a call on the assets. A call gains from volatility: the upside grows, "
                "the downside stays at 0 (recording 13, 1:17:39).",
                "<b>Senior debt falls.</b> It is risk-free debt plus a written put. The put the creditors have "
                "written becomes more valuable when risk rises.",
                "<b>Junior debt: not certain in general.</b> It is long the call with strike 75 and short the call "
                "with strike 100; both calls gain. Here the assets are worth 150 per share, well above the total "
                "face value of 100, so the junior bond behaves mostly like debt and will most likely lose. Since V "
                "is unchanged, what the shareholders gain the creditors lose: a wealth transfer, the risk-shifting "
                "incentive from the lecture (recording 13, 1:18:24)."),
            "criteria": [
                "1 point: equity rises, because it is a call on the assets.",
                "1 point: senior debt falls, because it contains a written put.",
                "1 point: junior debt is a call spread (long C(75), short C(100)), so the sign is not certain in "
                "general; here, with V well above 100 per share, it most likely falls.",
                "1 point: names the wealth transfer from creditors to shareholders with V unchanged.",
                "No Black-Scholes calculation is required.",
            ],
        },
    ],
}

sv_sj3 = {
    "mk-senior-junior-3:1:a": {"type": "tall", "tall": [
        {"navn": "Senior strike per share", "verdi": kS3s, "enhet": "EUR"},
        {"navn": "Total-debt strike per share", "verdi": kT3s, "enhet": "EUR"},
        {"navn": "Equity value", "verdi": E3s, "enhet": "EUR bn"}]},
    "mk-senior-junior-3:1:b": {"type": "tall", "tall": [
        {"navn": "Senior debt", "verdi": DS3s, "enhet": "EUR bn"},
        {"navn": "Junior debt", "verdi": DJ3s, "enhet": "EUR bn"}],
        "merknad": f"Junior som én call med strike 25 gir {f(DJ3s_felle)}; det avvises."},
    "mk-senior-junior-3:1:c": {"type": "tall", "tall": [
        {"navn": "Senior yield", "verdi": 100 * yS3s, "enhet": "%", "alt": [100 * yS3s_res]},
        {"navn": "Junior yield", "verdi": 100 * yJ3s, "enhet": "%", "alt": [100 * yJ3s_res]}],
        "merknad": "alt er svarene med reserveverdiene 8.0 og 2.2."},
    "mk-senior-junior-3:1:d": {"type": "blandet", "tall": [
        {"navn": "Senior debt (second way)", "verdi": DS3s_put, "enhet": "EUR bn"}],
        "tallPoeng": 2.5, "tekstLedd": "Do the two values agree?"},
    "mk-senior-junior-3:1:e": {"type": "tekst"},
}


# ================================================================== kontroll
oppg = {"mk-vente-1": ex1, "mk-vente-2": ex2, "mk-vente-3": ex3,
        "mk-binomisk-1": bin1, "mk-binomisk-2": bin2, "mk-binomisk-3": bin3,
        "mk-senior-junior-1": sj1, "mk-senior-junior-2": sj2, "mk-senior-junior-3": sj3}
svar = {**svar1, **svar2, **svar3, **sv_bin1, **sv_bin2, **sv_bin3, **sv_sj1, **sv_sj2, **sv_sj3}
# strikes per aksje står i kurstabellen med vilje; de er ikke lekkasje
LEKK_UNNTAK = {("mk-senior-junior-1:1:a", "Strike per share"),
               ("mk-senior-junior-2:1:a", "Senior strike per share"),
               ("mk-senior-junior-2:1:a", "Total-debt strike per share"),
               ("mk-senior-junior-3:1:a", "Senior strike per share"),
               ("mk-senior-junior-3:1:a", "Total-debt strike per share")}


def tekster(ex):
    for k in ("title", "body", "merke"):
        yield ex.get(k, "")
    for p in ex["parts"]:
        yield p["body"]
        yield p["solution"]
        yield from p["criteria"]


def ren(h):
    t = re.sub(r"<[^>]*>", " ", str(h)).replace("&minus;", "−").replace("&nbsp;", " ")
    return re.sub(r"&[a-z]+;", " ", t)


def tall_i(tekst):
    t = re.sub(r"[−–]", "-", ren(tekst))
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", m.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


feil = []
for sid, ex in oppg.items():
    assert ex["n"] == 1 and sum(p["points"] for p in ex["parts"]) == ex["points"] == 20, sid
    assert len(ex["parts"]) in range(4, 8), sid
    for t in tekster(ex):
        r = re.sub(r"</?(sub|sup|b|i)>", "", str(t))
        if "—" in r:
            feil.append(f"{sid}: tankestrek i «{r[:60]}»")
        m = re.search(r",\s+(and|og)\b", r)
        if m:
            feil.append(f"{sid}: komma før and/og i «…{r[max(0, m.start() - 60):m.end() + 10]}»")
        if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
            feil.append(f"{sid}: pronomen om Kurbatov")
        if re.search(r"(?:^|[\s(=\[])-(?=\d)", ren(t)):
            feil.append(f"{sid}: bindestrek som minus i «{ren(t)[:60]}»")
    for c in (c for p in ex["parts"] for c in p["criteria"]):
        if "<" in c or ">" in c:
            feil.append(f"{sid}: HTML i kriterium «{c[:50]}»")
    # alle svar-tall står i løsningen eller kriteriene, innenfor toleransen
    for p in ex["parts"]:
        k = f"{sid}:1:{p['label']}"
        assert k in svar, k
        d = svar[k]
        if d["type"] == "tekst":
            continue
        kilde = tall_i(p["solution"] + " " + " ".join(p["criteria"]))
        for tt in d["tall"]:
            kand = [tt["verdi"], *tt.get("alt", [])]
            tol = tt.get("tol", 0.01)
            def inn(n, v, ab=tt.get("abs", 0)):
                return abs(n - v) <= max(ab, tol * abs(v), 1e-9)
            pros = tt["enhet"] == "%"
            if not any(inn(n, v) or (pros and (inn(n * 100, v) or inn(n, v / 100, tt.get("abs", 0) / 100)))
                       for v in kand for n in kilde):
                feil.append(f"{k}: {tt['verdi']} står ikke i løsningen")
        if d["type"] == "blandet":
            assert 0 < d["tallPoeng"] < p["points"], k
    # ingen svar lekker i oppgaveteksten (felles tekst og alle deloppgavetekster)
    tekst_opp = " ".join([ex["body"]] + [p["body"] for p in ex["parts"]])
    for fr in ("4 decimal places", "with 4 decimals", "with 2 decimals"):
        tekst_opp = tekst_opp.replace(fr, "")
    i_tekst = tall_i(tekst_opp)
    for p in ex["parts"]:
        d = svar[f"{sid}:1:{p['label']}"]
        for tt in d.get("tall", []):
            if (f"{sid}:1:{p['label']}", tt["navn"]) in LEKK_UNNTAK:
                continue
            v = tt["verdi"] / (100 if tt["enhet"] == "%" else 1)
            if abs(v) > 0.05 and any(abs(n - v) <= 0.005 * abs(v) for n in i_tekst):
                feil.append(f"{sid}:{p['label']}: svaret {v} står i oppgaveteksten")

if feil:
    for x in feil:
        print("FEIL", x)
    raise SystemExit(f"{len(feil)} feil, skriver ingenting")

json.dump(oppg, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(svar, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def ord_i(ex):
    return len(ren(" ".join([ex["body"]] + [p["body"] for p in ex["parts"]])).split())


print("mk-vente-1: NPV nå", f(now1), "· t=1 høy/lav", f(gu1), f(gd1), "· vente", f(wait1), "· opsjon", f(opt1),
      "· X", f(X1), "(felle", f(X1_felle_fast) + ") · X ved 10 %", f(X1h), "·", ord_i(ex1), "ord")
print("mk-vente-2: NPV nå", f(now2), "· t=1", f(gh2), f(gl2), "· vente", f(wait2), "· X", f(X2),
      "(grense", f(grense2) + ") ·", ord_i(ex2), "ord")
print("mk-vente-3: NPV nå", f(now3), "· t=1", f(gu3), f(gd3), "· t=0", f(gu3_0), f(gd3_0), "· ρ", f(rho),
      "(feller", f(rho_felle_uten100), f(rho_felle_uten_rf) + ") · opsjon", f(C3), "·", ord_i(ex3), "ord")
print("skrev", os.path.basename(UT), "og", os.path.basename(UT_SVAR))
