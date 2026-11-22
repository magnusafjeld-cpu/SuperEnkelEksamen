# -*- coding: utf-8 -*-
"""
FIE402 oppgavekort, del 1 (blokk 1 og 2 hos Kurbatov): tvillingfirma og beta,
MM og rekapitalisering, skatt og trade-off, agentkostnader, asymmetrisk
informasjon og emisjon, utbytte og tilbakekjøp, WACC/APV/FTE og fri
kontantstrøm og diskontering.

Skriptet regner alle tall på nytt og bygger kortene, slik at tallene på
kortene kommer fra koden. Kjør fra repoet:

    python3 fag/fie402/_oppgavekort/del1_regn.py            # bygg og kontroller
    python3 fag/fie402/_oppgavekort/del1_regn.py --sett-inn # og sett inn i data.js

Uten flagg skrives del1_kort.json ved siden av skriptet. Med --sett-inn leses fag/fie402/data.js og skrives tilbake med en
gang: kortene settes inn rett etter det siste eksisterende kortet (fc460),
mellom kommentarene /* oppgavekort del 1 */ og /* slutt på oppgavekort del 1 */.
Finnes blokken fra før, byttes den ut.

Kilder: sett.js (h2024, h2025), problemsett.js (ps1, ps2), sjangre.js,
Home Assignment 1 og 2, FIE402_Manual.html k1 til k20,
docs/fie402-forelesninger-2026.md og Kurbatovs lysbilder (lecture 1 til 8).
Konvensjoner: uskattede vekter som standard, D(1 − τ) ved fast permanent gjeld,
skatteskjold med r_U ved konstant D/V og r_D ved fast gjeld, netto gjeld.
"""
import html.parser
from decimal import Decimal, ROUND_HALF_UP
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HER, "..", "..", ".."))
DATA = os.path.join(REPO, "fag", "fie402", "data.js")

KORT = []
TELLER = {}
KONTROLL = []

SLUG = {
    "tvillingfirma og beta": "tvilling",
    "MM og rekapitalisering": "mm",
    "skatt og trade-off": "skatt",
    "agentkostnader": "agent",
    "asymmetrisk informasjon og emisjon": "info",
    "utbytte og tilbakekjøp": "utbytte",
    "WACC, APV og FTE": "wacc",
    "fri kontantstrøm og diskontering": "fcf",
}
TV, MM, SK, AG, IN, UT, WA, FC = list(SLUG)

NB = " "  # tusenskille som ikke brekker linjen


# ---------------------------------------------------------------- formatering
def _rund(x, d):
    """Avrund halv opp ut fra tallets korteste desimalform, slik at 0.66875
    blir 0.6688 og ikke 0.6687 (binær flyttallsrest)."""
    return Decimal(repr(float(abs(x)))).quantize(Decimal(1).scaleb(-d), rounding=ROUND_HALF_UP)


def num(x, d=4):
    """Tall avrundet til d desimaler, uten etterfølgende nuller, tusenskille
    med hardt mellomrom og ekte minustegn."""
    s = f"{_rund(x, d):,.{d}f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    neg = x < 0 and float(s.replace(",", "")) != 0
    return ("−" if neg else "") + s.replace(",", NB)


def fx(x, d=2):
    """Fast antall desimaler (penger)."""
    s = f"{_rund(x, d):,.{d}f}"
    neg = x < 0 and float(s.replace(",", "")) != 0
    return ("−" if neg else "") + s.replace(",", NB)


def pct(x, d=4):
    return num(x * 100, d) + "%"


def r(i):
    return f"r<sub>{i}</sub>"


def be(i):
    return f"β<sub>{i}</sub>"


rE, rD, rU, rf, rw = r("E"), r("D"), r("U"), r("f"), r("wacc")
bE, bD, bU = be("E"), be("D"), be("U")
VL, VU = "V<sup>L</sup>", "V<sup>U</sup>"
tc = "τ<sub>c</sub>"


def A(n, rate):
    """Annuitetsfaktor, første betaling om ett år."""
    return (1 - (1 + rate) ** -n) / rate


def sjekk(navn, verdi, fasit, tol=1e-6):
    ok = abs(verdi - fasit) <= tol
    KONTROLL.append((navn, verdi, fasit, ok))
    if not ok:
        raise SystemExit(f"KONTROLL FEILET: {navn}: {verdi} mot {fasit}")


def kort(deck, ch, front, svar, steg, felle, kilde, modell=None, kontroll=None):
    TELLER[deck] = TELLER.get(deck, 0) + 1
    kid = f"ok-{SLUG[deck]}-{TELLER[deck]:02d}"
    deler = [f"<b>{svar}</b>"]
    if modell:
        deler.append("Model answer: " + modell)
    for i, s in enumerate(steg, 1):
        deler.append(f"{i}. {s}")
    if kontroll:
        deler.append("Check: " + kontroll)
    deler.append("Trap: " + felle)
    deler.append(f"({kilde})")
    KORT.append({"id": kid, "ch": ch, "deck": deck, "front": front, "back": "<br>".join(deler)})


# =====================================================================
# 1. TVILLINGFIRMA OG BETA (k3, k4)
# =====================================================================
# T1 CAPM, H2025 E4b
rf_, rm_, bE_ = 0.06, 0.11, 2.4
mrp = rm_ - rf_
rE_ = rf_ + bE_ * mrp
sjekk("H2025 E4b r_E", rE_, 0.18)
kort(TV, 3,
     f"Cost of equity from the CAPM. (Risk-free rate {pct(rf_)}, expected market return {pct(rm_)}, equity beta {num(bE_)})",
     f"{rE} = {pct(rf_)} + {num(bE_)} × ({pct(rm_)} − {pct(rf_)}) = {pct(rE_)}",
     [f"Market risk premium = {pct(rm_)} − {pct(rf_)} = {pct(mrp)}. The paper gives the market return, not the premium.",
      f"{rE} = {pct(rf_)} + {num(bE_)} × {pct(mrp)} = {pct(rE_)}."],
     f"{pct(rf_ + bE_ * rm_)} (the market return used as the premium). {pct(bE_ * rm_)} (beta times the market return, {rf} left out).",
     "H2025 E4b, manual 3.4")

# T2 gjeldsbeta, H2025 E4a
rDd = 0.10
bD_ = (rDd - rf_) / mrp
dv, ev = 0.2, 0.8
bU_ok = ev * bE_ + dv * bD_
bU_0 = ev * bE_
sjekk("H2025 E4a beta_D", bD_, 0.8)
kort(TV, 4,
     f"Debt beta when the debt is risky. (Cost of debt {pct(rDd)}, risk-free rate {pct(rf_)}, expected market return {pct(rm_)})",
     f"{bD} = ({pct(rDd)} − {pct(rf_)})/{pct(mrp)} = {num(bD_)}",
     [f"Run the CAPM backwards on the debt: {rD} = {rf} + {bD}(E[R<sub>m</sub>] − {rf}).",
      f"{num(rDd)} = {num(rf_)} + {bD} × {num(mrp)}, so {bD} = {num(rDd - rf_)}/{num(mrp)} = {num(bD_)}."],
     f"{bD} = 0 because debt feels safe. With D/E = 0.25 and {bE} = {num(bE_)} that gives {bU} = {num(bU_0)} instead of {num(bU_ok)} "
     f"and {rU} = {pct(rf_ + bU_0 * mrp)} instead of {pct(rf_ + bU_ok * mrp)}: too low a rate, so the firm is overvalued.",
     "H2025 E4a, manual 4.5")

# T3 vekter fra D/E
de = 0.25
dv3 = de / (1 + de)
ev3 = 1 / (1 + de)
bE3 = 1.5
kort(TV, 4,
     f"A firm keeps a debt-to-equity ratio of {pct(de)}. What are D/V and E/V? Which ratio goes into MM II?",
     f"D/V = {num(de)}/{num(1 + de)} = {num(dv3)} and E/V = {num(ev3)}",
     [f"D/V = (D/E)/(1 + D/E) = {num(dv3)}. E/V = 1/{num(1 + de)} = {num(ev3)}.",
      f"D/V and E/V weight the betas: {bU} = {num(ev3)}{bE} + {num(dv3)}{bD}. D/E itself goes into MM II: {rE} = {rU} + (D/E)({rU} − {rD}).",
      "Use market values: E = shares × price. Book equity never enters."],
     f"{num(de)} read as D/V. With {bE} = {num(bE3)} and {bD} = 0 that gives {bU} = {num((1 - de) * bE3)} instead of {num(ev3 * bE3)} (H2024 E5).",
     "H2024 E5a, H2025 E4c, manual 4.2")

# T4 avgiring med risikofri gjeld, H2024 E5a
rf4, rm4, bE4, de4, tau4 = 0.05, 0.11, 1.5, 0.25, 0.40
ev4 = 1 / (1 + de4)
bU4 = ev4 * bE4
rU4 = rf4 + bU4 * (rm4 - rf4)
sjekk("H2024 E5a r_U", rU4, 0.122)
hamada = bE4 / (1 + (1 - tau4) * de4)
egen = 0.7 * bE4
kort(TV, 4,
     f"Unlevered cost of capital from a twin. (Twin: D/E = {pct(de4)}, debt beta 0, equity beta {num(bE4)}. Risk-free {pct(rf4)}, market return {pct(rm4)}, tax {pct(tau4)}. Your firm keeps D/V = 30%)",
     f"{bU} = {num(ev4)} × {num(bE4)} = {num(bU4)}, so {rU} = {pct(rf4)} + {num(bU4)} × {pct(rm4 - rf4)} = {pct(rU4)}",
     [f"Weights: D/V = {num(de4)}/{num(1 + de4)} = {num(1 - ev4)}, E/V = {num(ev4)}.",
      f"Unlever without taxes (course default): {bU} = {num(ev4)} × {num(bE4)} + {num(1 - ev4)} × 0 = {num(bU4)}.",
      f"CAPM: {pct(rf4)} + {num(bU4)} × {pct(rm4 - rf4)} = {pct(rU4)}. Same business, same asset risk, so this is also your firm's {rU}."],
     f"{pct(rf4 + hamada * (rm4 - rf4))} (Hamada with taxes: {num(bE4)}/(1 + 0.6 × 0.25) = {num(hamada)}). "
     f"{pct(rf4 + egen * (rm4 - rf4))} (unlevered with your own 30% instead of the twin's leverage). The tax rate plays no part here.",
     "H2024 E5a, manual 4.3")

# T5 risikabel gjeld, H2025 E4c
rU5 = rf_ + bU_ok * mrp
sjekk("H2025 E4c r_U", rU5, 0.164)
sjekk("H2025 E4c pre-tax WACC", ev * rE_ + dv * rDd, rU5)
wacc5 = ev * rE_ + dv * rDd * 0.6
sjekk("tilfeldig likhet 15.6", wacc5, rf_ + bU_0 * mrp)
kort(TV, 4,
     f"Unlevered cost of capital when the debt is risky. (D/E = 25%, equity beta {num(bE_)}, debt beta {num(bD_)}, cost of debt {pct(rDd)}, risk-free {pct(rf_)}, market return {pct(rm_)}, tax {pct(tau4)})",
     f"{bU} = {num(bU_ok)} and {rU} = {pct(rU5)}",
     [f"{bU} = {num(ev)} × {num(bE_)} + {num(dv)} × {num(bD_)} = {num(ev * bE_)} + {num(dv * bD_)} = {num(bU_ok)}.",
      f"{rU} = {pct(rf_)} + {num(bU_ok)} × {pct(mrp)} = {pct(rU5)}.",
      f"Second route, pre-tax WACC: {num(ev)} × {pct(rE_)} + {num(dv)} × {pct(rDd)} = {pct(ev * rE_)} + {pct(dv * rDd)} = {pct(rU5)}. Same answer, because the CAPM is linear."],
     f"{pct(wacc5)}, which two different errors produce here: the debt beta dropped ({bU} = {num(bU_0)}) or the tax put into {rU} (that is the after-tax WACC). {rU} has no taxes in it.",
     "H2025 E4c, manual 4.5")

# T6 r_U som førskatt-WACC, H2024 E3a
N6, P6, D6, rE6, rD6 = 15, 90, 250, 0.09, 0.03
E6 = N6 * P6
V6 = E6 + D6
rU6 = E6 / V6 * rE6 + D6 / V6 * rD6
sjekk("H2024 E3a r_U", rU6, 0.080625)
sjekk("H2024 E3a MM II", rU6 + D6 / E6 * (rU6 - rD6), rE6)
kort(TV, 4,
     f"Unlevered cost of capital from market data. ({N6} million shares at {P6}, risk-free debt of {D6}, cost of equity {pct(rE6)}, cost of debt {pct(rD6)}, perfect markets)",
     f"{rU} = {num(E6 / V6, 5)} × {pct(rE6)} + {num(D6 / V6, 5)} × {pct(rD6)} = {pct(rU6)}",
     [f"E = {N6} × {P6} = {num(E6)}, D = {D6}, V = {num(V6)}.",
      f"Pre-tax WACC = {rU}: {num(E6 / V6 * rE6, 7)} + {num(D6 / V6 * rD6, 7)} = {num(rU6, 6)}."],
     f"{pct(rE6)} ({rE} is not {rU} once there is debt). {pct(0.84 * rE6 + 0.16 * rD6)} (weights rounded to 0.84 and 0.16). Perfect markets, so no (1 − τ) anywhere.",
     "H2024 E3a, manual 4.1",
     kontroll=f"MM II: {pct(rU6)} + ({D6}/{num(E6)})({pct(rU6)} − {pct(rD6)}) = {pct(rE6)} ✓")

# T7 MM II, H2024 E5b
dv7, rD7 = 0.30, 0.06
de7 = dv7 / (1 - dv7)
rE7 = rU4 + de7 * (rU4 - rD7)
sjekk("H2024 E5b r_E", rE7, 0.148571, 1e-6)
kort(TV, 4,
     f"Relever to your own leverage. (Unlevered cost of capital {pct(rU4)}, your firm keeps D/V = {pct(dv7)}, cost of debt {pct(rD7)}, tax {pct(tau4)})",
     f"{rE} = {pct(rU4)} + (3/7)({pct(rU4)} − {pct(rD7)}) = {pct(rE7)}",
     [f"D/E = {num(dv7)}/{num(1 - dv7)} = {num(de7)}.",
      f"MM II: {pct(rU4)} + {num(de7)} × {pct(rU4 - rD7)} = {pct(rU4)} + {pct(de7 * (rU4 - rD7))} = {pct(rE7)}."],
     f"{pct(rU4 + dv7 * (rU4 - rD7))} (D/V put into MM II). {pct(rU4 + de7 * 0.6 * (rU4 - rD7))} (the (1 − τ) version, which belongs to fixed permanent debt; this firm keeps D/V constant).",
     "H2024 E5b, manual 4.4",
     kontroll=f"{num(1 - dv7)} × {pct(rE7)} + {num(dv7)} × {pct(rD7)} = {pct((1 - dv7) * rE7 + dv7 * rD7)} = {rU} ✓ (an identity: it catches slips only)")

# T8 Yerba, PS1 E1
bU8, r8, rf8, q8 = 1.2, 0.125, 0.05, 0.40
de8 = q8 / (1 - q8)
bE8 = bU8 * (1 + de8)
mrp8 = (r8 - rf8) / bU8
rE8 = rf8 + bE8 * mrp8
sjekk("PS1 E1 beta", bE8, 2.0)
sjekk("PS1 E1 r_E", rE8, 0.175)
kort(TV, 4,
     f"Equity beta and expected return after a debt-financed buyback. (All-equity firm, beta {num(bU8)}, expected return {pct(r8)}. It issues risk-free debt at {pct(rf8)} and buys back {pct(q8)} of its shares. Perfect markets)",
     f"{bE} = {num(bU8)} × (1 + {num(q8)}/{num(1 - q8)}) = {num(bE8)} and {rE} = {pct(rE8)}",
     [f"Buying back {pct(q8)} of the shares with debt makes D/V = {num(q8)}, so D/E = 2/3.",
      f"Today's beta is {bU} (no debt). With {bD} = 0: {bE} = {bU}(1 + D/E) = {num(bE8)}.",
      f"Premium = ({pct(r8)} − {pct(rf8)})/{num(bU8)} = {pct(mrp8)}, so {rE} = {pct(rf8)} + {num(bE8)} × {pct(mrp8)} = {pct(rE8)}."],
     f"{num(bU8 * (1 + q8))} ({num(q8)} used as D/E). {num(bU8)} (the assets did not change, but the equity now carries their risk on a smaller base).",
     "PS1 E1a–b, manual 4.4",
     kontroll=f"{pct(r8)} + (2/3)({pct(r8)} − {pct(rf8)}) = {pct(r8 + de8 * (r8 - rf8))} ✓")

# T9 HA1 E1
rf9, rm9, bE9 = 0.05, 0.07, 1.5
dv9a = 0.25  # D/E = 1/3
bU9 = (1 - dv9a) * bE9
rU9 = rf9 + bU9 * (rm9 - rf9)
de9b = 0.2 / 0.8
bE9b = bU9 * (1 + de9b)
rE9b = rf9 + bE9b * (rm9 - rf9)
rE9a = rf9 + bE9 * (rm9 - rf9)
wacc9 = 0.8 * rE9b + 0.2 * rf9
sjekk("HA1 E1 r_U", rU9, 0.0725)
sjekk("HA1 E1 beta_E", bE9b, 1.40625)
sjekk("HA1 E1 r_E", rE9b, 0.078125)
sjekk("HA1 E1 WACC", wacc9, rU9)
kort(TV, 4,
     f"A firm deleverages from D/E = 1/3 to D/V = 1/5. New equity beta and cost of equity? (Risk-free debt, equity beta today {num(bE9)}, risk-free {pct(rf9)}, market return {pct(rm9)}, no taxes)",
     f"{bE} = {num(bE9b, 5)} and {rE} = {pct(rE9b)}, down from {num(bE9)} and {pct(rE9a)}",
     [f"Unlever: D/V = 1/4, so {bU} = {num(1 - dv9a)} × {num(bE9)} = {num(bU9)} and {rU} = {pct(rf9)} + {num(bU9)} × {pct(rm9 - rf9)} = {pct(rU9)}.",
      f"Relever: D/V = 1/5 means D/E = 1/4, so {bE} = {num(bU9)} × {num(1 + de9b)} = {num(bE9b, 5)}.",
      f"{rE} = {pct(rf9)} + {num(bE9b, 5)} × {pct(rm9 - rf9)} = {pct(rE9b)}. WACC = 0.8 × {pct(rE9b)} + 0.2 × {pct(rf9)} = {pct(wacc9)} before and after: the assets did not change."],
     f"{num(bU9 * 1.2)} and {pct(rf9 + bU9 * 1.2 * (rm9 - rf9))} (1/5 used as D/E). Saying the lower {rE} destroys value: it is lower because the equity is safer. The price does not move.",
     "Home assignment 1 E1a–d, manual 4.4")

# T10 netto gjeld, PS2 E7
N10, P10, D10, C10, Cop10, bE10, rf10, mrp10 = 12, 100, 400, 150, 50, 1.25, 0.04, 0.06
E10 = N10 * P10
ex10 = C10 - Cop10
nd10 = D10 - ex10
bU10 = E10 / (E10 + nd10) * bE10
sjekk("PS2 E7 beta_A", bU10, 1.0)
kort(TV, 4,
     f"Unlever a twin that holds excess cash. ({N10} million shares at {P10}, debt {D10} with beta 0, cash {C10} of which {Cop10} is needed in operations, equity beta {num(bE10)}, risk-free {pct(rf10)}, market risk premium {pct(mrp10)})",
     f"{bU} = ({num(E10)}/{num(E10 + nd10)}) × {num(bE10)} = {num(bU10)}, {rU} = {pct(rf10 + bU10 * mrp10)}",
     [f"Only excess cash is netted: {C10} − {Cop10} = {ex10}. Net debt = {D10} − {ex10} = {nd10}.",
      f"E = {N10} × {P10} = {num(E10)}, so V = {num(E10)} + {nd10} = {num(E10 + nd10)}.",
      f"{bU} = {num(E10 / (E10 + nd10))} × {num(bE10)} + {num(nd10 / (E10 + nd10))} × 0 = {num(bU10)}. {rU} = {pct(rf10)} + {num(bU10)} × {pct(mrp10)} = {pct(rf10 + bU10 * mrp10)}."],
     f"{num(E10 / (E10 + D10) * bE10)} (cash ignored, D = {D10}). {num(E10 / (E10 + D10 - C10) * bE10)} (all {C10} netted, D = {D10 - C10}). Operating cash is an asset the business needs.",
     "PS2 E7, lecture 7 slide 19, manual 4.3")

# T11 kontanter i et rent egenkapitalfirma, Gorgon
E11, C11, bE11 = 960, 425, 1.2
bU11 = bE11 * E11 / (E11 - C11)
kort(TV, 4,
     f"Asset beta of an all-equity firm with excess cash. (Market equity {E11}, excess cash {C11} with beta 0, equity beta {num(bE11)})",
     f"{bU} = {num(bE11)} × {E11}/{E11 - C11} = {num(bU11)}",
     [f"Equity = operations + cash, so {num(bE11)} = ({E11 - C11}/{E11}){bU} + ({C11}/{E11}) × 0.",
      f"{bU} = {num(bE11)} × {E11}/{E11 - C11} = {num(bU11)}. Excess cash is negative net debt."],
     f"{num(bE11)} (cash left in, which dilutes the beta of the business). {num(bE11 * (E11 - C11) / E11)} (the weight applied the wrong way round).",
     "PS2 E8, manual 4.3")

# T12 flere tvillinger, PS2 E8
rf12, mrp12, ya12, E12, D12, bE12 = 0.05, 0.06, 0.065, 300, 150, 1.65
bD12 = (ya12 - rf12) / mrp12
bA1 = E12 / (E12 + D12) * bE12 + D12 / (E12 + D12) * bD12
bAvg = (bA1 + bU11) / 2
rU12 = rf12 + bAvg * mrp12
sjekk("PS2 E8 r_U", rU12, 0.150098, 1e-6)
bA1_0 = E12 / (E12 + D12) * bE12
kort(TV, 4,
     f"Two twins: average their asset betas. (Twin 1: equity {E12}, debt {D12}, equity beta {num(bE12)}, debt yield {pct(ya12)}. Twin 2: asset beta {num(bU11)}. Risk-free {pct(rf12)}, market risk premium {pct(mrp12)})",
     f"{bU} = ({num(bA1)} + {num(bU11)})/2 = {num(bAvg)}, so {rU} = {pct(rU12)}",
     [f"Twin 1's debt beta from its yield: ({pct(ya12)} − {pct(rf12)})/{pct(mrp12)} = {num(bD12)} (the yield taken as the expected return, as the course solution does).",
      f"Twin 1: ({E12}/{E12 + D12}) × {num(bE12)} + ({D12}/{E12 + D12}) × {num(bD12)} = {num(E12 / (E12 + D12) * bE12)} + {num(D12 / (E12 + D12) * bD12)} = {num(bA1)}.",
      f"Average the asset betas, then the CAPM: {pct(rf12)} + {num(bAvg)} × {pct(mrp12)} = {pct(rU12)}."],
     f"{pct(rf12 + (bA1_0 + bU11) / 2 * mrp12)} (debt beta set to 0). {pct(rf12 + bA1 * mrp12)} (one twin only). Average asset betas, never equity betas.",
     "PS2 E8, lecture 8, manual 4.3")

# T13 etter-skatt-WACC, H2024 E5c
rw13 = (1 - dv7) * rE7 + dv7 * rD7 * (1 - tau4)
sjekk("H2024 E5c WACC", rw13, 0.1148)
sjekk("H2024 E5c shortcut", rU4 - dv7 * tau4 * rD7, rw13)
kort(TV, 4,
     f"After-tax WACC. (D/V = {pct(dv7)}, cost of equity {pct(rE7)}, cost of debt {pct(rD7)}, tax {pct(tau4)}, unlevered cost {pct(rU4)})",
     f"{rw} = {num(1 - dv7)} × {pct(rE7)} + {num(dv7)} × {pct(rD7)} × {num(1 - tau4)} = {pct(rw13)}",
     [f"Equity part {num((1 - dv7) * rE7)}. Debt part after tax: {num(dv7)} × {num(rD7 * (1 - tau4))} = {num(dv7 * rD7 * (1 - tau4))}.",
      f"Shortcut: {rU} − (D/V){tc}{rD} = {pct(rU4)} − {num(dv7)} × {num(tau4)} × {pct(rD7)} = {pct(rw13)} ✓ (valid with constant D/V)."],
     f"{pct((1 - dv7) * rE7 + dv7 * rD7)} (tax left out: that is the pre-tax WACC, {rU}). {pct(rU4 * (1 - tau4))} (the (1 − τ) applied to the whole WACC).",
     "H2024 E5c, manual 4.6")

# T14 D(1 − τ)-vekter ved fast gjeld
VU14, rU14, D14, rD14, t14 = 1300, 0.09, 400, 0.04, 0.22
VL14 = VU14 + t14 * D14
E14 = VL14 - D14
rE14 = rU14 + D14 / E14 * (1 - t14) * (rU14 - rD14)
Dn14 = D14 * (1 - t14)
rU14b = (E14 * rE14 + Dn14 * rD14) / (E14 + Dn14)
sjekk("D(1-tau) r_U", rU14b, rU14)
plain14 = (E14 * rE14 + D14 * rD14) / (E14 + D14)
kort(TV, 4,
     f"Unlever a twin whose debt is fixed and permanent. (Equity {num(E14)}, permanent debt {D14} at {pct(rD14)}, cost of equity {pct(rE14)}, tax {pct(t14)})",
     f"{rU} = ({num(E14)} × {pct(rE14)} + {num(Dn14)} × {pct(rD14)})/{num(E14 + Dn14)} = {pct(rU14b)}",
     [f"Fixed permanent debt: the tax shield is as safe as the debt, so weight the debt net of it: D(1 − τ) = {D14} × {num(1 - t14)} = {num(Dn14)}.",
      f"{rU} = ({num(E14 * rE14, 2)} + {num(Dn14 * rD14, 2)})/{num(E14 + Dn14)} = {pct(rU14b)}. Same weights for betas.",
      f"Equivalent: {rE} = {rU} + (D/E)(1 − τ)({rU} − {rD}) = {pct(rU14)} + {num(D14 / E14)} × {num(1 - t14)} × {pct(rU14 - rD14)} = {pct(rE14)} ✓",
      "Not on the exam as a calculation: Kurbatov calls this weighting not mandatory. His WACC questions assume a constant D/E and use only the formula sheet. Know why the weights change."],
     f"{pct(plain14)} (plain weights E/V and D/V: the pre-tax WACC, which equals {rU} only under constant D/V). Use D(1 − τ) only when the question says the debt is fixed.",
     "Lecture 8 slide 18, manual 7.4")

# T15 beta fra kovarians
cov15, sm15, si15 = 0.018, 0.15, 0.40
b15 = cov15 / sm15 ** 2
corr15 = cov15 / (sm15 * si15)
sjekk("beta cov", b15, 0.8)
kort(TV, 3,
     f"Beta from data. (Covariance of the stock with the market {num(cov15)}, market standard deviation {pct(sm15)}, stock standard deviation {pct(si15)})",
     f"β = Cov/Var(R<sub>m</sub>) = {num(cov15)}/{num(sm15)}² = {num(b15)}",
     [f"Var(R<sub>m</sub>) = {num(sm15 ** 2)}. β = {num(cov15)}/{num(sm15 ** 2)} = {num(b15)}.",
      f"Equivalently β = Corr × σ<sub>i</sub>/σ<sub>m</sub> = {num(corr15)} × {num(si15)}/{num(sm15)} = {num(b15)}.",
      f"The stock's own {pct(si15)} volatility is mostly diversifiable and earns no premium."],
     f"{num(cov15 / sm15)} (divided by σ<sub>m</sub>, not the variance). {num(corr15)} (the correlation; lecture 1 slide 24 prints Corr/Var, a typo for Cov/Var). {num(si15 / sm15)} (σ<sub>i</sub>/σ<sub>m</sub>).",
     "Lecture 1, manual 3.3")

# T16 negativ beta
rf16, mrp16, b16, s16 = 0.03, 0.05, -0.2, 0.45
r16 = rf16 + b16 * mrp16
kort(TV, 3,
     f"A gold miner has volatility {pct(s16)} and beta {num(b16)}. What return do investors require? Why so low? (Risk-free {pct(rf16)}, market risk premium {pct(mrp16)})",
     f"r = {pct(rf16)} + ({num(b16)}) × {pct(mrp16)} = {pct(r16)}, below the risk-free rate",
     ["Only systematic risk is priced. The 45% volatility is almost all diversifiable.",
      f"A negative beta means the stock pays off when the market falls. It hedges the rest of the portfolio, so investors accept less than {rf}."],
     f"{pct(rf16 - b16 * mrp16)} (sign of beta dropped). Using volatility instead of beta, or claiming every risky stock must earn more than {rf}.",
     "Lecture 14 wrap-up, manual 3.2")

# =====================================================================
# 2. MM OG REKAPITALISERING (k6)
# =====================================================================
Dn2, Dold2 = 400, 250
pay2 = Dn2 - Dold2
kort(MM, 6,
     f"A firm in perfect markets announces it will borrow {Dn2}, repay its {Dold2} of debt and pay out the rest as a dividend. What happens to the share price on the announcement? ({N6} million shares at {P6})",
     f"Nothing: the price stays at {P6}",
     [f"Perfect markets: no taxes, no distress or agency costs. MM I says V = {num(V6)} before and after.",
      "The announcement only changes how the same cash flows are split between debt and equity, so there is nothing new to price."],
     f"{num((E6 + pay2) / N6)} (the payout added to the price) or {num((V6 - Dn2) / N6)} (the ex-dividend drop moved to the announcement date). With taxes and permanent debt the price would jump at once by {tc} × {pay2}/{N6}.",
     "H2024 E3b, manual 6.4")

dps2 = pay2 / N6
Pex2 = (V6 - Dn2) / N6
sjekk("H2024 E3c P", Pex2, 80)
kort(MM, 6,
     f"The firm borrows {Dn2}, repays {Dold2} of old debt and pays out the rest as a dividend. Share price after? Are the shareholders better off? ({N6} million shares at {P6}, firm value {num(V6)}, perfect markets)",
     f"DPS = {pay2}/{N6} = {num(dps2)}, P<sub>ex</sub> = ({num(V6)} − {Dn2})/{N6} = {num(Pex2)}. Wealth {num(Pex2)} + {num(dps2)} = {num(Pex2 + dps2)}: no change",
     [f"{Dn2} − {Dold2} = {pay2} is paid out, {num(dps2)} per share.",
      f"V stays {num(V6)} (MM I) and D is now {Dn2}, so E = {num(V6 - Dn2)} on the same {N6} million shares."],
     f"{num(P6)} (a dividend retires no shares, but the cash leaves the firm). {num((V6 - Dn2 - pay2) / N6)} (the dividend subtracted twice: {num(V6)} − {Dn2} − {pay2}).",
     "H2024 E3c, manual 15.5",
     kontroll=f"{N6} × {num(Pex2)} + {pay2} = {num(N6 * Pex2 + pay2)} = old equity ✓")

rDn3 = 0.045
rE3n = rU6 + Dn2 / (V6 - Dn2) * (rU6 - rDn3)
sjekk("H2024 E3d r_E", rE3n, 0.0925)
sjekk("H2024 E3d check", 0.75 * rE3n + 0.25 * rDn3, rU6)
kort(MM, 6,
     f"After the recap the debt is riskier and costs {pct(rDn3)} instead of {pct(rD6)}. New cost of equity? (Unlevered cost {pct(rU6)}, D = {Dn2}, E = {num(V6 - Dn2)}, perfect markets)",
     f"{rE} = {pct(rU6)} + ({Dn2}/{num(V6 - Dn2)})({pct(rU6)} − {pct(rDn3)}) = {pct(rE3n)}",
     [f"{rU} is unchanged: same assets.",
      f"D/E = 1/3, so {rE} = {pct(rU6)} + {pct((rU6 - rDn3) / 3)} = {pct(rE3n)}."],
     f"{pct(rU6 + (rU6 - rD6) / 3)} (old {rD} = {pct(rD6)} kept). {pct(rU6 + 0.25 * (rU6 - rDn3))} (D/V used). Riskier debt takes some risk off the equity, so {rE} rises less.",
     "H2024 E3d, manual 6.3",
     kontroll=f"0.75 × {pct(rE3n)} + 0.25 × {pct(rDn3)} = {pct(rU6)} ✓")

n4 = pay2 / P6
sjekk("H2024 E3e price", (V6 - Dn2) / (N6 - n4), 90)
kort(MM, 6,
     f"Same recap, but the {pay2} buys back shares instead of paying a dividend. Share price and number of shares bought? ({N6} million shares at {P6}, perfect markets)",
     f"P stays {P6}. n = {pay2}/{P6} = {num(n4)} million shares",
     ["A buyback at the market price is a fair swap: cash out, shares of equal value in.",
      f"Shares left: {N6} − {num(n4)} = {num(N6 - n4)} million.",
      f"The seller gets {P6} in cash, the holder keeps a {P6} share: the same as {num(Pex2)} + {num(dps2)} under the dividend."],
     f"{num(pay2 / Pex2)} million (bought at the ex-dividend price {num(Pex2)}). Then {num(V6 - Dn2)}/{num(N6 - pay2 / Pex2)} = {num((V6 - Dn2) / (N6 - pay2 / Pex2), 2)}, a second price for the same share.",
     "H2024 E3e, manual 6.4",
     kontroll=f"E = {num(V6)} − {Dn2} = {num(V6 - Dn2)}; {num(V6 - Dn2)}/{num(N6 - n4)} = {num((V6 - Dn2) / (N6 - n4))} ✓")

# H2025 E3
FCF5, D5, E5, rf5, N5 = 20, 100, 200, 0.05, 1
V5 = D5 + E5
rU5m = FCF5 / V5
rE5m = (rU5m - D5 / V5 * rf5) / (E5 / V5)
sjekk("H2025 E3a r_E", rE5m, 0.075)
div5 = (FCF5 - rf5 * D5) / N5
kort(MM, 6,
     f"Cost of equity and share price from a perpetuity. (FCF {FCF5} a year forever, all paid out. Risk-free debt {D5} at {pct(rf5)}, equity worth {E5}, {N5} million shares, no taxes)",
     f"{rE} = {pct(rE5m)}, P = {num(E5 / N5)}",
     [f"V = {D5} + {E5} = {V5}, so {rU} = FCF/V = {FCF5}/{V5} = {pct(rU5m)} (no taxes: pre-tax WACC = {rU}).",
      f"{pct(rU5m)} = (2/3){rE} + (1/3) × {pct(rf5)}, so {rE} = {pct(rE5m)}.",
      f"P = {E5}/{N5} = {num(E5 / N5)}."],
     f"{pct(rU5m)} reported as {rE}. {pct(FCF5 / E5)} ({FCF5}/{E5}: the whole FCF credited to equity, interest forgotten).",
     "H2025 E3a, manual 6.3",
     kontroll=f"dividend {FCF5} − {num(rf5 * D5)} = {num(div5)}; {num(div5)}/{num(rE5m)} = {num(div5 / rE5m)} ✓")

P1_5 = div5 / rE5m
sjekk("H2025 E3b P1", P1_5, 200)
kort(MM, 15,
     f"Dividend per share at the end of year 1 and the share price right after it. (FCF {FCF5} forever, risk-free debt {D5} at {pct(rf5)}, {N5} million shares, cost of equity {pct(rE5m)})",
     f"Div<sub>1</sub> = {num(div5)}, P<sub>1</sub> = {num(P1_5)} ({num(P1_5 + div5)} just before)",
     [f"Interest first: {pct(rf5)} × {D5} = {num(rf5 * D5)}. Equity gets {FCF5} − {num(rf5 * D5)} = {num(div5)}, {num(div5)} per share.",
      f"After the payout the share is again a claim on {num(div5)} forever: {num(div5)}/{num(rE5m)} = {num(P1_5)}."],
     f"{num(FCF5 / N5)} per share (interest forgotten). {num(P1_5 - div5)} (the dividend subtracted from {num(P1_5)} instead of from the cum price {num(P1_5 + div5)}).",
     "H2025 E3b, manual 15.2",
     kontroll=f"({num(div5)} + {num(P1_5)})/{num(1 + rE5m)} = {num((div5 + P1_5) / (1 + rE5m))} = P<sub>0</sub> ✓")

Dt7 = 0.5 * V5
iss7 = Dt7 - D5
n7 = iss7 / (E5 / N5)
sjekk("H2025 E3c price", (V5 - Dt7) / (N5 - n7), 200)
kort(MM, 6,
     f"The board recapitalises to D/V = 0.5 by issuing debt and buying back shares. Debt issued, price on announcement and shares bought? (V = {V5}, debt {D5}, {N5} million shares at {num(E5 / N5)}, no taxes)",
     f"Issue {num(iss7)}, the price stays {num(E5 / N5)}, buy back {num(n7)} million shares",
     [f"Target D = 0.5 × {V5} = {num(Dt7)}. It has {D5}, so it issues {num(iss7)}.",
      f"No taxes or frictions: V stays {V5}, so P stays {num(E5 / N5)}.",
      f"n = {num(iss7)}/{num(E5 / N5)} = {num(n7)} million."],
     f"{num(Dt7)} of new debt (the target read as the issue: D/V would be {num(D5 + Dt7)}/{V5}). Expecting a price rise on the announcement: only taxes would create one.",
     "H2025 E3c, manual 6.4",
     kontroll=f"({V5} − {num(Dt7)})/{num(N5 - n7)} = {num((V5 - Dt7) / (N5 - n7))} ✓")

int8 = rf5 * Dt7
div8 = (FCF5 - int8) / (N5 - n7)
rE8m = rU5m + Dt7 / (V5 - Dt7) * (rU5m - rf5)
sjekk("H2025 E3d r_E", rE8m, 1 / 12)
sjekk("H2025 E3d price", div8 / rE8m, 200)
kort(MM, 6,
     f"After the recap to D/V = 0.5, what is the new dividend per share and the new cost of equity? (FCF {FCF5} forever, debt {num(Dt7)} at {pct(rf5)}, {num(N5 - n7)} million shares, unlevered cost {pct(rU5m)})",
     f"Div = {num(FCF5 - int8)}/{num(N5 - n7)} = {num(div8)}, {rE} = {pct(rE8m)}",
     [f"Interest: {pct(rf5)} × {num(Dt7)} = {num(int8)}. Equity gets {FCF5} − {num(int8)} = {num(FCF5 - int8)} on {num(N5 - n7)} million shares.",
      f"MM II with D/E = 1: {pct(rU5m)} + 1 × ({pct(rU5m)} − {pct(rf5)}) = {pct(rE8m)}."],
     f"{num(FCF5 - int8)} (old share count kept). {pct(rU5m + 0.5 * (rU5m - rf5))} (D/V = 0.5 put into MM II, which happens to return the old {rE}).",
     "H2025 E3d, manual 6.3",
     kontroll=f"{num(div8)}/{num(rE8m, 6)} = {num(div8 / rE8m)}, the unchanged price ✓")

kort(MM, 6,
     "Compare three shareholders: one in the original firm, one who sold in the buyback and one who kept the share. Comment. (H2025 E3e: FCF 20 forever, recap from D/V = 1/3 to 1/2, perfect markets)",
     f"All three hold {num(E5 / N5)} today. Leverage moved risk, not value",
     [f"Original: {num(div5)} forever at {pct(rE5m)} = {num(div5 / rE5m)}. Sold: {num(E5 / N5)} in cash. Kept: {num(div8)} forever at {pct(rE8m)} = {num(div8 / rE8m)}.",
      f"Model comment: MM I holds, so the recap only re-slices the same {FCF5} of cash flow. The holder gets an {pct(div8 / div5 - 1, 1)} larger dividend but bears the business risk on a smaller equity base, so {rE} rises just enough to keep the price at {num(E5 / N5)}. The seller got fair value, so nobody gains at anyone's expense. An investor who wants the old risk back can hold some of the firm's debt alongside the share (homemade leverage)."],
     "Saying the holder wins because the dividend rose, or the seller wins because he got cash.",
     "H2025 E3e, manual 6.2",
     kontroll=f"{num(n7)} × {num(E5 / N5)} + {num(N5 - n7)} × {num(E5 / N5)} = {num(E5)} = old equity ✓")

# Mercer PS1 E3
N10m, P10m, D10m, rD10m, rE10m, Dn10m, rDn10m = 10, 75, 100, 0.0425, 0.085, 350, 0.05
V10m = N10m * P10m + D10m
Pm = (V10m - Dn10m) / N10m
rU10m = (N10m * P10m * rE10m + D10m * rD10m) / V10m
rE10n = rU10m + Dn10m / (V10m - Dn10m) * (rU10m - rDn10m)
sjekk("PS1 E3 P", Pm, 50)
sjekk("PS1 E3 r_U", rU10m, 0.08)
sjekk("PS1 E3 r_E", rE10n, 0.101)
kort(MM, 6,
     f"Debt-financed special dividend: share price after the transaction and new cost of equity? ({N10m} million shares at {P10m}, risk-free debt {D10m} at {pct(rD10m)}, cost of equity {pct(rE10m)}. The firm borrows {Dn10m} at {pct(rDn10m)}, repays the {D10m} and pays {Dn10m - D10m} as a dividend)",
     f"P = ({V10m} − {Dn10m})/{N10m} = {num(Pm)}, {rE} = {pct(rE10n)}",
     [f"V = {N10m} × {P10m} + {D10m} = {V10m}, unchanged by MM I. New E = {V10m} − {Dn10m} = {V10m - Dn10m}, {num(Pm)} per share.",
      f"{rU} = ({N10m * P10m}/{V10m}) × {pct(rE10m)} + ({D10m}/{V10m}) × {pct(rD10m)} = {pct(rU10m)}.",
      f"{rE} = {pct(rU10m)} + ({Dn10m}/{V10m - Dn10m})({pct(rU10m)} − {pct(rDn10m)}) = {pct(rE10n)}."],
     f"{num(P10m - Dn10m / N10m)} (all {Dn10m} deducted per share, though {D10m} of it only replaced old debt). {pct(rU10m + Dn10m / (V10m - Dn10m) * (rU10m - rD10m))} (old {pct(rD10m)} kept as {rD}).",
     "PS1 E3, manual 6.5",
     kontroll=f"{num(Pm)} + {num((Dn10m - D10m) / N10m)} dividend = {num(Pm + (Dn10m - D10m) / N10m)} ✓")

# XYZ PS1 E4b
X11, rE11, N11, D11, rD11 = 3000, 0.20, 1000, 7500, 0.10
V11 = X11 / rE11
P11 = V11 / N11
n11 = D11 / P11
rE11n = rE11 + D11 / (V11 - D11) * (rE11 - rD11)
sjekk("PS1 E4 r_E", rE11n, 0.30)
sjekk("PS1 E4 E", (X11 - rD11 * D11) / rE11n, 7500)
kort(MM, 6,
     f"An all-equity firm expects earnings of {num(X11)} a year forever, cost of equity {pct(rE11)}, {num(N11)} shares. It borrows {num(D11)} at {pct(rD11)} and buys back shares. Price, shares bought and new cost of equity? (No taxes, perfect markets)",
     f"P = {num(P11)}, n = {num(n11)}, {rE} = {pct(rE11n)}",
     [f"V = {num(X11)}/{num(rE11)} = {num(V11)}, P = {num(P11)}. MM: the announcement leaves it there.",
      f"n = {num(D11)}/{num(P11)} = {num(n11)} shares. D/E = {num(D11)}/{num(V11 - D11)} = 1.",
      f"{rE} = {pct(rE11)} + 1 × ({pct(rE11)} − {pct(rD11)}) = {pct(rE11n)}."],
     f"{pct(rE11 + 0.5 * (rE11 - rD11))} (D/V = 0.5 put into MM II). Thinking shareholders gain because EPS rises from {num(X11 / N11)} to {num((X11 - rD11 * D11) / (N11 - n11))}: the higher return only pays for the higher risk.",
     "PS1 E4b, manual 6.5",
     kontroll=f"({num(X11)} − {num(rD11 * D11)})/{num(rE11n)} = {num((X11 - rD11 * D11) / rE11n)} = E ✓")

# Arbitrasje PS1 E2
X12, K12, r12, EB12 = 110, 40, 0.10, 54
EA12 = X12 / (1 + r12)
EBf = (X12 - K12 * (1 + r12)) / (1 + r12)
lend = EA12 - EB12
prof = (X12 - K12 * (1 + r12)) + lend * (1 + r12) - X12
sjekk("PS1 E2 profit", prof, 6.6)
kort(MM, 6,
     f"Firms A and B both pay {X12} next year. A is all-equity and worth {num(EA12)}. B has debt of {K12} at {pct(r12)} (repays {num(K12 * (1 + r12))}). B's equity trades at {EB12}. Find the arbitrage. (Everyone borrows and lends at {pct(r12)})",
     f"Short A, buy B's equity, lend {num(lend)}: a sure {num(prof)} next year ({num(prof / (1 + r12))} today)",
     [f"Today: +{num(EA12)} − {EB12} − {num(lend)} = 0.",
      f"Next year: {num(X12 - K12 * (1 + r12))} from B's equity + {num(lend)} × {num(1 + r12)} = {num(lend * (1 + r12))} from the loan − {X12} owed on A = {num(prof)}.",
      f"Arbitrage pushes {r('B').replace('r<sub>', 'E<sub>')} to {num(X12 - K12 * (1 + r12))}/{num(1 + r12)} = {num(EBf)}, so V<sub>A</sub> = V<sub>B</sub> = {num(EA12)}: MM I."],
     f"Buying A and shorting B (the wrong direction loses {num(prof)}). Comparing {EB12} with {num(EA12)} directly: B's equity sits behind {K12} of debt.",
     "PS1 E2, manual 6.2")

# EPS-feilslutning Yerba PS1 E1c-d
eps13, pe13, q13, rf13 = 1.50, 14, 0.40, 0.05
P13 = eps13 * pe13
int13 = rf13 * q13 * P13
eps13n = (eps13 - int13) / (1 - q13)
sjekk("PS1 E1c EPS", eps13n, 1.80)
kort(MM, 6,
     f"EPS and P/E after a recap. (EPS {fx(eps13)}, P/E {pe13}. The firm borrows risk-free at {pct(rf13)} and buys back {pct(q13)} of its shares. Perfect markets)",
     f"EPS = {fx(eps13n)} (up from {fx(eps13)}), P/E = {num(P13)}/{fx(eps13n)} = {fx(P13 / eps13n)} (down from {pe13})",
     [f"P = {pe13} × {fx(eps13)} = {num(P13)}. Debt per original share {num(q13)} × {num(P13)} = {fx(q13 * P13)}, interest {fx(int13)}.",
      f"Earnings {fx(eps13)} − {fx(int13)} = {fx(eps13 - int13)} shared by {num(1 - q13)} shares: EPS = {fx(eps13n)}.",
      f"The price stays {num(P13)} (MM). P/E falls because each krone of earnings is now riskier."],
     f"Claiming value rose with EPS. {fx(eps13 / (1 - q13))} ({fx(eps13)}/{num(1 - q13)}, interest forgotten).",
     "PS1 E1c–d, tutorial session 1, manual 6.6")

# Break-even EBIT, lecture 2
EBIT14, N14, P14, Dl14, rD14b = 10, 10, 7.5, 15, 0.08
n14 = Dl14 / P14
i14 = rD14b * Dl14
eps14 = (EBIT14 - i14) / (N14 - n14)
be14 = i14 * N14 / (N14 - (N14 - n14))  # EBIT/N = (EBIT - i)/(N - n)
sjekk("lecture 2 EPS", eps14, 1.1)
sjekk("lecture 2 break-even", be14, 6)
kort(MM, 6,
     f"EPS break-even. (EBIT {EBIT14} million, {N14} million shares at {fx(P14)}. The firm borrows {Dl14} million at {pct(rD14b)} and buys back {num(n14)} million shares. No taxes)",
     f"EPS rises from {fx(EBIT14 / N14)} to {fx(eps14)}. Break-even EBIT = {num(be14)} million",
     [f"Interest {pct(rD14b)} × {Dl14} = {num(i14)}, so EPS = ({EBIT14} − {num(i14)})/{num(N14 - n14)} = {fx(eps14)}.",
      f"Break-even: EBIT/{N14} = (EBIT − {num(i14)})/{num(N14 - n14)} gives {num(N14 - n14)} EBIT = {N14} EBIT − {num(i14 * N14)}, so EBIT = {num(be14)}.",
      f"Above {num(be14)} the levered EPS is higher, below it lower: leverage amplifies the swings. That is extra risk, not extra value."],
     f"{num(i14)} (break-even set where EBIT just covers the interest). Concluding the recap creates value because EPS went up.",
     "Lecture 2 slide 24, manual 6.6")

# Bankkapital, lecture 2 slide 25
e15a, e15b, rE15, rD15 = 0.03, 0.06, 0.25, 0.05
rU15 = e15a * rE15 + (1 - e15a) * rD15
rE15n = rU15 + (1 - e15b) / e15b * (rU15 - rD15)
bank15 = e15b * rE15 + (1 - e15b) * rD15
sjekk("bank r_E", rE15n, 0.15)
kort(MM, 6,
     f"A bank funds itself with {pct(e15a)} equity at {pct(rE15)} and debt at {pct(rD15)}. The regulator requires {pct(e15b)} equity. The bankers say the funding cost rises to {pct(bank15)}. Right? (Perfect markets, cost of debt unchanged)",
     f"No. {rE} falls to {pct(rE15n)} and the funding cost stays {pct(rU15)}",
     [f"{rU} = {num(e15a)} × {pct(rE15)} + {num(1 - e15a)} × {pct(rD15)} = {pct(rU15)}.",
      f"New D/E = 94/6, so {rE} = {pct(rU15)} + (94/6)({pct(rU15)} − {pct(rD15)}) = {pct(rE15n)}.",
      "A thicker equity cushion makes each krone of equity safer."],
     f"{pct(bank15)} ({rE} held at {pct(rE15)}: the bankers' argument). In reality the cost can rise through lost tax shields and implicit guarantees, not through MM.",
     "Lecture 2 slide 25, manual 6.6",
     kontroll=f"{num(e15b)} × {pct(rE15n)} + {num(1 - e15b)} × {pct(rD15)} = {pct(e15b * rE15n + (1 - e15b) * rD15)} ✓")

# Gründer beholder NPV
I16, H16, L16, r16, rf16b = 800, 1400, 900, 0.15, 0.05
V16 = (0.5 * H16 + 0.5 * L16) / (1 + r16)
owe16 = I16 * (1 + rf16b)
assert owe16 <= L16
lev16 = 0.5 * (H16 - owe16) + 0.5 * (L16 - owe16)
sjekk("founder", V16 - I16, 200)
kort(MM, 6,
     f"A founder with no money has a project that costs {I16} today and pays {num(H16)} or {L16} next year with equal probability. Investors require {pct(r16)} on the project. She can borrow at a risk-free {pct(rf16b)} or sell shares. What is her stake worth? (Perfect markets)",
     f"{num(V16 - I16)} either way: the project's NPV",
     [f"V = (0.5 × {num(H16)} + 0.5 × {L16})/{num(1 + r16)} = {num(0.5 * H16 + 0.5 * L16)}/{num(1 + r16)} = {num(V16)}. NPV = {num(V16 - I16)}.",
      f"Debt: she owes {num(owe16)} next year, safe even in the bad state. Her claim is worth {num(V16)} − {I16} = {num(V16 - I16)}.",
      f"Equity: she sells {I16}/{num(V16)} = {pct(I16 / V16)} and keeps {pct(1 - I16 / V16)} × {num(V16)} = {num((1 - I16 / V16) * V16)}."],
     f"{num(lev16 / (1 + r16), 2)} (her levered payoff of {num(lev16)} discounted at the project's {pct(r16)}). Her claim sits behind the debt and is riskier than the project.",
     "Lecture 2, manual 6.2")

kort(MM, 6,
     "A colleague says: the expected return on equity fell after the firm cut its debt, so the recap must have reduced shareholder value. Correct? (Home assignment 1 E1e)",
     "No. The required return fell because the equity became safer. The price did not move",
     [],
     f"Treating {rE} as a measure of value created. The same logic would say more debt always creates value.",
     "Home assignment 1 E1e, manual 6.6",
     modell=(f"Under MM I firm value depends only on the assets, so a recap in perfect markets leaves the share price unchanged. "
             f"{rE} is a required return, the compensation for bearing risk, not a gain the shareholder owns. "
             f"Less debt means less financial risk per share, so {bE} and {rE} fall together (in the assignment from {num(bE9)} and {pct(rE9a)} to {num(bE9b, 5)} and {pct(rE9b)}) "
             f"while the WACC stays at {rU} = {pct(rU9)}. A lower expected return at lower risk leaves the investor exactly as well off."))

V19, N19, Pn19, n19 = 1000, 10, 100, 5
kort(MM, 6,
     f"A firm worth {num(V19)} has {N19} shares at {Pn19}. It issues {n19} new shares at {Pn19} and invests the cash in a zero-NPV project. Are the old shareholders diluted?",
     f"No. The price stays at {num(V19 + n19 * Pn19)}/{N19 + n19} = {num((V19 + n19 * Pn19) / (N19 + n19))}",
     [f"The issue brings in {n19 * Pn19} of cash, so V = {num(V19)} + {n19 * Pn19} = {num(V19 + n19 * Pn19)} on {N19 + n19} shares.",
      "The old owners' share of the firm falls from 100% to 2/3, but it is a slice of a bigger firm and worth the same.",
      "Only a sale below fair value, or a negative-NPV use of the cash, hurts the old holders."],
     f"{fx(V19 / (N19 + n19))} ({num(V19)}/{N19 + n19}: the cash raised left out). The same mistake as the EPS fallacy.",
     "Lecture 2 slide 26, manual 6.6")

# =====================================================================
# 3. SKATT OG TRADE-OFF (k7, k8)
# =====================================================================
D1s, r1s, t1s = 500, 0.05, 0.22
ts1 = t1s * r1s * D1s
kort(SK, 7,
     f"Present value of the tax shield on a one-year loan. (Borrows {D1s} at {pct(r1s)} for one year, tax {pct(t1s)})",
     f"PV(TS) = {num(t1s)} × {pct(r1s)} × {D1s}/{num(1 + r1s)} = {num(ts1 / (1 + r1s))}",
     [f"One deduction: interest {num(r1s * D1s)}, worth {num(t1s)} × {num(r1s * D1s)} = {num(ts1)} at date 1.",
      f"A fixed amount, as safe as the debt: discount at {rD}. {num(ts1)}/{num(1 + r1s)} = {num(ts1 / (1 + r1s))}."],
     f"{num(t1s * D1s)} ({tc}D, the permanent-debt formula). {num(ts1)} (not discounted).",
     "Manual 7.3")

X2s, t2s, rU2s, N2s, D2s = 3000, 0.40, 0.20, 1000, 7500
VU2s = X2s * (1 - t2s) / rU2s
VL2s = VU2s + t2s * D2s
P2s = VL2s / N2s
n2s = D2s / P2s
sjekk("PS1 E4d V^L", VL2s, 12000)
sjekk("PS1 E4d n", n2s, 625)
kort(SK, 7,
     f"Permanent debt and who captures the tax shield. (Earnings {num(X2s)} a year forever, tax {pct(t2s)}, unlevered cost of capital {pct(rU2s)}, {num(N2s)} shares. The firm adds {num(D2s)} of permanent debt and buys back shares)",
     f"{VL} = {num(VU2s)} + {num(t2s)} × {num(D2s)} = {num(VL2s)}. The price jumps from {num(VU2s / N2s)} to {num(P2s)} on the announcement",
     [f"{VU} = {num(X2s)} × {num(1 - t2s)}/{num(rU2s)} = {num(VU2s)}, P = {num(VU2s / N2s)}.",
      f"Permanent debt: PV(TS) = {tc}D = {num(t2s * D2s)}. The price jumps at once to {num(VL2s)}/{num(N2s)} = {num(P2s)}.",
      f"The buyback runs at {num(P2s)}: n = {num(D2s)}/{num(P2s)} = {num(n2s)}.",
      "The whole gain goes to those who own the shares when the plan is announced, sellers and holders alike. New lenders get zero NPV."],
     f"{fx(D2s / (VU2s / N2s))} shares (bought at the old {num(VU2s / N2s)}).",
     "PS1 E4c–d, manual 7.4",
     kontroll=f"({num(VL2s)} − {num(D2s)})/{num(N2s - n2s)} = {num((VL2s - D2s) / (N2s - n2s))} ✓")

D3s, rD3s, rU3s, t3s = 200, 0.06, 0.10, 0.25
ts3 = t3s * rD3s * D3s
kort(SK, 7,
     f"The same {D3s} of debt under three policies: permanent, rebalanced to a constant D/E, repaid after one year. PV of the tax shield? (The debt is expected to stay at {D3s}, no growth. Cost of debt {pct(rD3s)}, unlevered cost {pct(rU3s)}, tax {pct(t3s)})",
     f"{num(ts3 / rD3s)} (permanent), {num(ts3 / rU3s)} (rebalanced), {num(ts3 / (1 + rD3s))} (one year)",
     [f"Annual shield: {num(t3s)} × {pct(rD3s)} × {D3s} = {num(ts3)}.",
      f"Permanent: as safe as the debt, {num(ts3)}/{num(rD3s)} = {num(ts3 / rD3s)} = {tc}D.",
      f"Rebalanced: future debt moves with firm value, so the shield has asset risk: {num(ts3)}/{num(rU3s)} = {num(ts3 / rU3s)}.",
      f"One year: {num(ts3)}/{num(1 + rD3s)} = {num(ts3 / (1 + rD3s))}."],
     f"{tc}D = {num(t3s * D3s)} for a firm that keeps a target ratio. Read the debt sentence: \"maintains D/E\" means {rU}, \"permanent\" means {rD}.",
     "Manual 7.3, APV rule in manual 18.2")

ip4, n4s, P4s, rf4s, t4s = 100, 10, 2000, 0.05, 0.35
a4 = A(n4s, rf4s)
pv4 = t4s * ip4 * a4
pvint4 = P4s - P4s / (1 + rf4s) ** n4s
sjekk("lecture 3 PV(TS)", pv4, 270.26, 0.005)
sjekk("lecture 3 check", t4s * pvint4, pv4, 1e-9)
kort(SK, 7,
     f"Tax shield on an interest-only loan. (Interest {ip4} a year for {n4s} years, principal {num(P4s)} repaid in year {n4s}, risk-free {pct(rf4s)}, tax {pct(t4s)})",
     f"PV(TS) = {num(t4s * ip4)} × A({n4s} years, {pct(rf4s)}) = {num(t4s * ip4)} × {num(a4)} = {fx(pv4)}",
     [f"Shield {num(t4s)} × {ip4} = {num(t4s * ip4)} a year for {n4s} years.",
      f"A fixed schedule of risk-free payments: discount at {pct(rf4s)}. Annuity factor (1/{num(rf4s)})(1 − 1/{num(1 + rf4s)}<sup>{n4s}</sup>) = {num(a4)}.",
      "The principal repayment is not deductible and creates no shield."],
     f"{num(t4s * P4s)} ({tc}D, as if the debt were permanent). {num(t4s * ip4 * n4s)} ({n4s} × {num(t4s * ip4)}, not discounted).",
     "Lecture 3 slide 12, manual 7.3",
     kontroll=f"the interest is worth {num(P4s)} − {num(P4s)}/{num(1 + rf4s)}<sup>{n4s}</sup> = {fx(pvint4)}; {num(t4s)} × {fx(pvint4)} = {fx(t4s * pvint4)} ✓")

FCF5s = rU14 * VU14
eqcf5 = FCF5s - (1 - t14) * rD14 * D14
fs5 = rU14 + D14 / E14 * (rU14 - rD14)
sjekk("r_E permanent via cash flows", eqcf5 / E14, rE14)
kort(SK, 7,
     f"Cost of equity with permanent debt. (Unlevered value {num(VU14)}, unlevered cost {pct(rU14)}, permanent debt {D14} at {pct(rD14)}, tax {pct(t14)}, all cash flow paid out)",
     f"{rE} = {pct(rU14)} + ({D14}/{num(E14)})(1 − {num(t14)})({pct(rU14)} − {pct(rD14)}) = {pct(rE14)}",
     [f"{VL} = {num(VU14)} + {num(t14)} × {D14} = {num(VL14)}, so E = {num(E14)}.",
      "Fixed debt: the safe shield lowers the equity's risk, hence the (1 − τ) factor.",
      "Not on the exam as a calculation: Kurbatov calls the (1 − τ) version not mandatory. Know the direction: a safe shield makes the equity less risky."],
     f"{pct(fs5)} (the formula-sheet MM II, which assumes constant D/V).",
     "Manual 7.4, lecture 8 slide 18",
     kontroll=f"FCF = {num(rU14)} × {num(VU14)} = {num(FCF5s)}. Equity gets {num(FCF5s)} − {num(1 - t14)} × {num(rD14 * D14)} = {num(eqcf5)}; {num(eqcf5)}/{num(E14)} = {pct(eqcf5 / E14)} ✓ (this route needs no formula)")

tc6, te6, ti6, D6s = 0.22, 0.30, 0.35, 150
ts6 = 1 - (1 - tc6) * (1 - te6) / (1 - ti6)
sjekk("tau*", ts6, 0.16)
kort(SK, 8,
     f"Effective tax advantage of debt with personal taxes. (Corporate tax {pct(tc6)}, personal tax on equity income {pct(te6)}, on interest {pct(ti6)}. Permanent debt {D6s})",
     f"τ* = 1 − ({num(1 - tc6)} × {num(1 - te6)})/{num(1 - ti6)} = {pct(ts6)}, so PV(TS) = {num(ts6)} × {D6s} = {num(ts6 * D6s)}",
     [f"A krone of profit paid as interest reaches the investor as {num(1 - ti6)}. Paid through equity it is {num(1 - tc6)} × {num(1 - te6)} = {num((1 - tc6) * (1 - te6))}.",
      f"τ* = 1 − {num((1 - tc6) * (1 - te6))}/{num(1 - ti6)} = {num(ts6)}. It replaces {tc} everywhere."],
     f"{num(tc6 * D6s)} (corporate rate only, {num(tc6)} × {D6s}). Multiplying τ* by {tc}. Personal taxes on interest shrink the advantage of debt.",
     "Manual 8.3")

VU7, ts7 = 500, 0.16
sched7 = {100: 3.5, 150: 9.0, 200: 18.5}
vl7 = {d: VU7 + ts7 * d - c for d, c in sched7.items()}
best7 = max(vl7, key=vl7.get)
vlc7 = {d: VU7 + 0.22 * d - c for d, c in sched7.items()}
bestc7 = max(vlc7, key=vlc7.get)
sjekk("trade-off D*", best7, 150)
kort(SK, 8,
     f"Optimal debt from a schedule. (Unlevered value {VU7}, effective tax advantage {pct(ts7)}, permanent debt. PV of distress costs: {num(sched7[100])} at D = 100, {num(sched7[150])} at 150, {num(sched7[200])} at 200)",
     f"D* = {best7}, {VL} = {VU7} + {num(ts7 * 150)} − {num(sched7[150])} = {num(vl7[150])}",
     [f"{VL} = {VU} + τ*D − PV(FD): {num(vl7[100])}, {num(vl7[150])} and {num(vl7[200])}.",
      f"Marginal rule: 100 → 150 adds {num(ts7 * 50)} of shield against {num(sched7[150] - sched7[100])} of distress cost, so take it. 150 → 200 adds {num(ts7 * 50)} against {num(sched7[200] - sched7[150])}, so stop."],
     f"Using {tc} = 22% instead of τ*: the optimum moves to {bestc7}. Subtracting transfers to creditors as if they were distress costs: only deadweight loss counts.",
     "Manual 8.4")

# Gladstone PS1 E5
st8 = [150, 135, 95, 80]
rf8s, K8, bc8, N8s = 0.05, 100, 0.25, 10
VU8 = sum(st8) / 4 / (1 + rf8s)
debt8 = [K8 if v >= K8 else (1 - bc8) * v for v in st8]
eq8 = [max(v - K8, 0) for v in st8]
D8s = sum(debt8) / 4 / (1 + rf8s)
E8s = sum(eq8) / 4 / (1 + rf8s)
VL8 = D8s + E8s
lost8 = sum(bc8 * v for v in st8 if v < K8) / 4 / (1 + rf8s)
sjekk("Gladstone PV(BC)", VU8 - VL8, lost8, 1e-9)
sjekk("Gladstone D", D8s, 78.869, 0.001)
kort(SK, 8,
     f"Value of debt, equity and the distress cost. (Firm worth {', '.join(map(str, st8[:-1]))} or {st8[-1]} next year, equally likely, diversifiable risk. Risk-free {pct(rf8s)}. Debt with face {K8}; default destroys {pct(bc8)} of the assets)",
     f"D = {fx(D8s)}, E = {fx(E8s)}, {VL} = {fx(VL8)}, PV(distress) = {fx(VU8 - VL8)}",
     [f"{VU} = ({' + '.join(map(str, st8))})/4/{num(1 + rf8s)} = {fx(VU8)}.",
      f"Debt gets {', '.join(num(x) for x in debt8)}: D = {num(sum(debt8) / 4)}/{num(1 + rf8s)} = {fx(D8s)}. Equity gets {', '.join(num(x) for x in eq8)}: E = {num(sum(eq8) / 4)}/{num(1 + rf8s)} = {fx(E8s)}.",
      f"{VU} − {VL} = {fx(VU8 - VL8)}, exactly the expected deadweight loss: 0.25 × ({num(bc8 * 95)} + {num(bc8 * 80)})/{num(1 + rf8s)} = {fx(lost8)}.",
      f"YTM = {K8}/{fx(D8s)} − 1 = {pct(K8 / D8s - 1, 2)}, but the expected return is {rf} = {pct(rf8s)} (the risk is diversifiable)."],
     f"Debt priced at {K8}/{num(1 + rf8s)} = {fx(K8 / (1 + rf8s))} (default ignored). Counting the creditors' whole shortfall as the cost: only the {pct(bc8)} that vanishes is.",
     "PS1 E5a–d, tutorial session 1, manual 8.2")

P9a = VU8 / N8s
P9b = VL8 / N8s
n9s = D8s / P9b
sjekk("Gladstone price", E8s / (N8s - n9s), P9b, 1e-9)
kort(SK, 8,
     f"Share price before and after a debt-financed buyback when default is costly. (Gladstone: unlevered value {fx(VU8)}; with the debt D = {fx(D8s)} and E = {fx(E8s)}; {N8s} million shares)",
     f"{fx(P9a)} without debt, {fx(P9b)} with it. The buyback takes {fx(n9s)} million shares",
     [f"No debt: {fx(VU8)}/{N8s} = {fx(P9a)}.",
      f"With debt the firm is worth {fx(VL8)}. The buyback runs at the price that holds after it: {fx(VL8)}/{N8s} = {fx(P9b)}.",
      f"n = {fx(D8s)}/{fx(P9b)} = {fx(n9s)} million.",
      f"Why lower: lenders pay only the fair {fx(D8s)}, so the shareholders bear the {fx(VU8 - VL8)} of expected distress costs the moment the debt is issued."],
     f"{fx(P9a)} kept (distress costs ignored). {fx(E8s / N8s)} (equity after the buyback divided by the old {N8s} million shares).",
     "PS1 E5e–f, manual 8.2",
     kontroll=f"{fx(E8s)}/({N8s} − {fx(n9s)}) = {fx(E8s / (N8s - n9s))} ✓")

D10s, H10s, L10s, fs10 = 30, 80, 15, 0.5
d_no = 0.5 * D10s + 0.5 * L10s
d_fs = 0.5 * D10s + 0.5 * L10s * fs10
e10s = 0.5 * (H10s - D10s)
dw10 = 0.5 * L10s * (1 - fs10)
sjekk("fire sale", d_no - d_fs, dw10, 1e-9)
kort(SK, 8,
     f"Fire sale. (Debt {D10s}. Assets worth {H10s} in the good state and {L10s} in the bad, equally likely. In default the assets sell for half their value. No discounting.) Who loses? How much?",
     f"Expected deadweight loss 0.5 × {num(L10s * fs10)} = {num(dw10)}, borne by the shareholders when the debt is sold",
     [f"Bad state: creditors get {num(L10s * fs10)} instead of {L10s}. The other {num(L10s * (1 - fs10))} reaches nobody.",
      f"Debt is worth 0.5 × {D10s} + 0.5 × {num(L10s * fs10)} = {num(d_fs)} instead of {num(d_no)}. Equity is 0.5 × {H10s - D10s} = {num(e10s)} either way.",
      f"Ex post the creditors lose. Ex ante they pay only {num(d_fs)} for the bond, so the owners raise {num(dw10)} less: {VL} = {num(d_fs + e10s)} against {num(d_no + e10s)}."],
     f"Treating the lost {num(L10s * (1 - fs10))} as a transfer: it is destroyed. Saying the shareholders do not care because they get 0 in the bad state.",
     "Lecture 4, lecture 14 wrap-up, manual 8.1")

dl11, ds11, p11 = 0.035, 0.225, 0.0085
kort(SK, 8,
     "Direct bankruptcy costs are 3–4% of value for large firms. Why can they not explain why firms borrow so little? (Verbal)",
     f"Weighted by a default probability of about {pct(p11, 2)} a year they cost about {pct(dl11 * p11, 2)} of value a year",
     [f"{num(dl11)} × {num(p11)} = {num(dl11 * p11)} for a large firm. Small firms: 20–25% × {pct(p11, 2)} ≈ {pct(ds11 * p11, 1)}.",
      "The costs that matter are indirect: customers and suppliers walk, staff leave, assets are fire-sold, projects are shelved, mostly before any court is involved.",
      "Distress strikes in recessions, so its PV is discounted at a low rate and weighs more than the probability suggests.",
      "Add the agency costs of debt and personal taxes on interest."],
     "Calling the 3–4% the expected cost: it is conditional on bankruptcy.",
     "Lecture 4 slide 8, manual 8.1")

kort(SK, 8,
     "Why is no firm 100% debt financed if interest is tax deductible? (Verbal, 4–6 sentences)",
     "Because each extra krone of debt adds less tax shield than expected costs of distress and agency",
     [],
     "Listing only bankruptcy fees. Forgetting that the cost is borne ex ante by the shareholders, not by the creditors.",
     "Lecture 4, manual 8.4",
     modell=(f"{VL} = {VU} + PV(TS) − PV(distress costs) − PV(agency costs). The shield grows in proportion to D, but the probability of distress grows faster "
             "and the expected direct and indirect costs grow with it. Creditors foresee these costs and the incentive problems of a levered firm "
             f"and pay less for the debt, so the shareholders bear them up front. Personal taxes on interest shrink the advantage from {tc} to τ*. "
             "The optimum is where the marginal shield equals the marginal expected cost."))

kort(SK, 7,
     "A firm has large tax-loss carryforwards and expects to pay no tax for several years. Is its debt worth τD to it? (Verbal)",
     "No. Its marginal tax rate is near zero, so an extra interest deduction saves little now",
     ["The shield is worth the tax actually saved on the last krone of interest, not the statutory rate.",
      "Loss carryforwards, depreciation and other deductions already shelter the profit, so interest only defers the use of the losses.",
      "Use a lower effective rate. Expect such firms to borrow less."],
     f"Plugging the statutory 22% into {tc}D.",
     "Lecture 3, manual 7.1")

D14s, r14s, t14s, inst = 300, 0.05, 0.25, 100
bal = [D14s - inst * k for k in range(3)]
ints = [r14s * b_ for b_ in bal]
tss = [t14s * i_ for i_ in ints]
pv14s = sum(ts_ / (1 + r14s) ** (k + 1) for k, ts_ in enumerate(tss))
wrong14 = t14s * r14s * D14s * A(3, r14s)
sjekk("instalment PV(TS)", pv14s, 6.9188, 0.0001)
kort(SK, 18,
     f"Tax shield on a loan repaid in instalments. (Borrows {D14s} at {pct(r14s)}, repays {inst} at the end of each of years 1–3. Tax {pct(t14s)})",
     f"PV(TS) = {num(tss[0])}/{num(1 + r14s)} + {num(tss[1])}/{num(1 + r14s)}² + {num(tss[2])}/{num(1 + r14s)}³ = {num(pv14s)}",
     [f"Interest on the balance outstanding during each year: {', '.join(num(x) for x in ints)}.",
      f"Shields: {', '.join(num(x) for x in tss)}. The schedule is known, so discount at {rD}."],
     f"{num(wrong14)} (interest on the full {D14s} every year). {num(t14s * D14s)} ({tc}D). {rU} applies only when the debt follows the firm's value.",
     "Manual 18.4")

kort(SK, 8,
     "Which firm should carry more debt: a software firm whose value is its staff and customers, or a shipping firm with vessels that trade in a liquid second-hand market? (Verbal)",
     "The shipping firm",
     ["Its assets can be sold near full value in distress, so the fire-sale discount and the indirect costs are small.",
      "The software firm loses customers, staff and growth options the moment default looks likely: high indirect costs.",
      "Same tax shield per krone of debt, very different PV(distress), so the trade-off optimum is higher for the shipping firm."],
     "Arguing from volatility alone. Redeployable assets lower the loss given distress, which is what the trade-off weighs.",
     "Lecture 4, manual 8.1")

# =====================================================================
# 4. AGENTKOSTNADER (k9, k10, k11)
# =====================================================================
proj = {"A": [(1.0, 50)], "B": [(0.5, 80), (0.5, 16)], "C": [(0.2, 150), (0.8, 0)]}


def ev_(p):
    return sum(q * x for q, x in p)


def eq_(p, d):
    return sum(q * max(x - d, 0) for q, x in p)


def dv_(p, d):
    return sum(q * min(x, d) for q, x in p)


vals = {k: ev_(v) for k, v in proj.items()}
kort(AG, 9,
     "Which project does the manager choose with no debt? (A: 50 for sure. B: 80 or 16, 50/50. C: 150 with probability 20%, else 0)",
     f"A, worth {num(vals['A'])} (B {num(vals['B'])}, C {num(vals['C'])})",
     ["No debt: the shareholders own everything, so the manager maximises expected value.",
      f"A = {num(vals['A'])}. B = 0.5 × 80 + 0.5 × 16 = {num(vals['B'])}. C = 0.2 × 150 = {num(vals['C'])}.",
      "A is first best and also the safest."],
     "Picking C for its 150 upside. With no debt there is nobody to shift risk onto.",
     "H2024 E4a, manual 9.2")

d2a = 25
eqs = {k: eq_(v, d2a) for k, v in proj.items()}
dbs = {k: dv_(v, d2a) for k, v in proj.items()}
sjekk("H2024 E4b E_B", eqs["B"], 27.5)
kort(AG, 9,
     "Same three projects, but the firm now owes 25. Which project? What is the agency cost? (A: 50 for sure. B: 80 or 16, 50/50. C: 150 with probability 20%, else 0)",
     f"B (equity {num(eqs['B'])} against {num(eqs['A'])} for A and {num(eqs['C'])} for C). Agency cost {num(vals['A'])} − {num(vals['B'])} = {num(vals['A'] - vals['B'])}",
     [f"Equity = E[max(CF − 25, 0)]: A {num(eqs['A'])}, B 0.5 × 55 = {num(eqs['B'])}, C 0.2 × 125 = {num(eqs['C'])}.",
      f"Debt under B: 0.5 × 25 + 0.5 × 16 = {num(dbs['B'])}, down {num(dbs['A'] - dbs['B'])} from A.",
      "Name it: risk shifting (asset substitution). Equity is a call on the firm with strike 25."],
     f"Calling the {num(dbs['A'] - dbs['B'])} the agency cost: most of it is a transfer. Creditors price it in, so ex ante the shareholders bear the {num(vals['A'] - vals['B'])}.",
     "H2024 E4b, manual 9.4",
     kontroll=f"equity +{num(eqs['B'] - eqs['A'])}, debt −{num(dbs['A'] - dbs['B'])}, firm −{num(vals['A'] - vals['B'])} ✓")

dstar = (40 - 30) / (0.5 - 0.2)
sjekk("H2024 E4c D*", 0.5 * (80 - dstar), 0.2 * (150 - dstar))
wrong_root = (48 - 30) / (1 - 0.2)
kort(AG, 9,
     "At which face value of debt is the manager indifferent between B and C? What happens above it? (B: 80 or 16, 50/50. C: 150 with probability 20%, else 0)",
     f"D = 100/3 = {num(dstar)}. Above it the manager switches to C",
     [f"For 16 &lt; D ≤ 80: E<sub>B</sub> = 0.5(80 − D) and E<sub>C</sub> = 0.2(150 − D).",
      f"40 − 0.5D = 30 − 0.2D gives D = {num(dstar)}, inside (16, 80] ✓ Both are worth {num(0.5 * (80 - dstar))}.",
      f"E<sub>B</sub> falls 0.5 per unit of debt, E<sub>C</sub> only 0.2, so more debt favours C. The agency cost jumps from {num(vals['A'] - vals['B'])} to {num(vals['A'] - vals['C'])}."],
     f"{num(wrong_root)} (the root of the D ≤ 16 branch, which lies outside that region). Always check that the root sits where the formulas hold.",
     "H2024 E4c, manual 9.3")

hedged = {"A": [(1.0, 50)], "B": [(0.5, 70), (0.5, 26)], "C": [(0.2, 140), (0.8, 2.5)]}
eqh = {k: eq_(v, d2a) for k, v in hedged.items()}
dbh = {k: dv_(v, d2a) for k, v in hedged.items()}
besth = max(eqh, key=eqh.get)
sjekk("H2024 E4d best", eqh[besth], 25)
kort(AG, 9,
     "The firm owes 25 and would pick B (80 or 16). A partner offers a zero-NPV hedge that turns B into 70 or 26 and C (150 or 0) into 140 or 2.5. Will the shareholders accept?",
     f"No. With the hedge the best they can get is {num(eqh[besth])} (A) against {num(eqs['B'])} without it",
     [f"Hedged B: 0.5(70 − 25) + 0.5(26 − 25) = {num(eqh['B'])}. Hedged C: 0.2(140 − 25) = {num(eqh['C'])}. A: {num(eqh['A'])}.",
      "The hedge makes the debt safe, which kills the option value that B gave the shareholders."],
     "Accepting because the hedge has zero NPV and raises firm value. A deal with the creditors (a lower face value in return for the hedge) could split the 2.",
     "H2024 E4d, manual 9.4",
     kontroll=f"shareholders −{num(eqs['B'] - eqh['A'])}, creditors +{num(dbh['A'] - dbs['B'])}, firm +{num(vals['A'] - vals['B'])} ✓ The creditors capture more than the whole efficiency gain")

zy = {"A": [(1.0, 75)], "B": [(0.5, 140), (0.5, 0)], "C": [(0.1, 300), (0.9, 40)]}
zv = {k: ev_(v) for k, v in zy.items()}
z40 = {k: eq_(v, 40) for k, v in zy.items()}
z110 = {k: eq_(v, 110) for k, v in zy.items()}
c40 = max(z40, key=z40.get)
c110 = max(z110, key=z110.get)
sjekk("Zymase 40", zv["A"] - zv[c40], 5)
sjekk("Zymase 110", zv["A"] - zv[c110], 9)
kort(AG, 9,
     "Expected agency cost of debt with face value 40 and with face value 110. (A: 75 for sure. B: 140 or 0, 50/50. C: 300 with probability 10%, 40 with 90%)",
     f"{num(zv['A'] - zv[c40])} at D = 40 ({c40} chosen) and {num(zv['A'] - zv[c110])} at D = 110 ({c110} chosen)",
     [f"Firm values: A {num(zv['A'])}, B {num(zv['B'])}, C {num(zv['C'])}.",
      f"D = 40: equity A {num(z40['A'])}, B {num(z40['B'])}, C {num(z40['C'])}, so {c40}. Cost {num(zv['A'])} − {num(zv[c40])} = {num(zv['A'] - zv[c40])}.",
      f"D = 110: equity A {num(z110['A'])}, B {num(z110['B'])}, C {num(z110['C'])}, so {c110}. Cost {num(zv['A'])} − {num(zv[c110])} = {num(zv['A'] - zv[c110])}."],
     "Measuring the cost as the creditors' loss. The agency cost is value destroyed: first best minus what is chosen.",
     "PS1 E7, manual 9.4")

# HA1 E2
I6a, lo6, hi6 = 50, 30, 80
F6 = (I6a - 0.5 * lo6) / 0.5
assert lo6 < F6 <= hi6
sjekk("HA1 E2a F", F6, 70)
kort(AG, 9,
     f"A project costs {I6a}, financed fully by a risk-neutral lender. It pays {lo6} or {hi6} with equal probability. No discounting. What promised repayment F lets the lender break even?",
     f"F = {num(F6)}",
     [f"F must exceed {lo6}, or the lender gets at most {lo6} &lt; {I6a}. So the bad state pays {lo6} and the good state F.",
      f"0.5 × {lo6} + 0.5F = {I6a} gives F = {num(F6)}. In the bad state min({num(F6)}, {lo6}) = {lo6} ✓",
      f"Shareholders get 0.5 × ({hi6} − {num(F6)}) = {num(0.5 * (hi6 - F6))} = the project's NPV."],
     f"F = {I6a} (default ignored: the lender would get only 0.5 × {lo6} + 0.5 × {I6a} = {num(0.5 * lo6 + 0.5 * I6a)}).",
     "Home assignment 1 E2a, manual 9.2")

lo7, hi7 = 10, 90
sh_b, cr_b, fv_b = 0.5 * (hi6 - F6), 0.5 * lo6 + 0.5 * F6, 0.5 * (lo6 + hi6)
sh_a, cr_a, fv_a = 0.5 * (hi7 - F6), 0.5 * lo7 + 0.5 * F6, 0.5 * (lo7 + hi7)
Fnew = (I6a - 0.5 * lo7) / 0.5
kort(AG, 9,
     f"After financing (F = {num(F6)}), management finds a costless change that turns the payoffs from {lo6}/{hi6} into {lo7}/{hi7}. Will it adopt it? Who gains? (Equal probabilities, no discounting)",
     f"Yes. Shareholders {num(sh_b)} → {num(sh_a)}, creditor {num(cr_b)} → {num(cr_a)}, firm {num(fv_b)} → {num(fv_a)}",
     [f"Equity after: 0.5 × ({hi7} − {num(F6)}) = {num(sh_a)}. Creditor: 0.5 × {lo7} + 0.5 × {num(F6)} = {num(cr_a)}.",
      f"The change destroys {num(fv_b - fv_a)} of value but takes {num(cr_b - cr_a)} from the creditor, so the shareholders gain {num(sh_a - sh_b)}.",
      "Name it: risk shifting (asset substitution). Limited liability caps the downside at 0."],
     f"Rejecting it because firm value falls. Ex ante a lender who foresees it demands F = {num(Fnew)} and the shareholders end with {num(0.5 * (hi7 - Fnew))}.",
     "Home assignment 1 E2b, manual 9.1")

hi8, lo8 = 75, 25
x_cr = (lo6 - lo8) / (F6 - lo8)
x_fv = (lo6 - lo8) / (hi8 - lo8)
sjekk("HA1 E2c", x_cr, 1 / 9)
sjekk("HA1 E2d", x_fv, 0.1)
kort(AG, 10,
     f"Bad state: the firm is worth {lo6} and owes {num(F6)}. The creditor can liquidate for {lo6} now or extend one period: the firm is then worth {hi8} with probability X, else {lo8}. When do the shareholders and when does the creditor prefer extension?",
     f"Shareholders: for every X &gt; 0. Creditor: only for X ≥ 1/9 = {num(x_cr)}",
     [f"Liquidation: creditor {lo6}, shareholders 0.",
      f"Extension: shareholders X × ({hi8} − {num(F6)}) = {num(hi8 - F6)}X. Creditor {num(F6)}X + {lo8}(1 − X) = {lo8} + {num(F6 - lo8)}X.",
      f"The creditor is indifferent at {lo8} + {num(F6 - lo8)}X = {lo6}, so X = 1/9."],
     f"Paying the creditor {num(F6)} in both states. Forgetting that shareholders with nothing to lose always want to gamble on.",
     "Home assignment 1 E2c, manual 10.2")

kort(AG, 10,
     f"Same case: when does extension raise total firm value? Where do private incentives go wrong? (Liquidate for {lo6}, or continue: {hi8} with probability X, {lo8} otherwise. Debt {num(F6)})",
     f"Efficient for X ≥ {num(x_fv)}. Two wedges: 0 &lt; X &lt; {num(x_fv)} and {num(x_fv)} &lt; X &lt; {num(x_cr)}",
     [f"Firm value if extended: {hi8}X + {lo8}(1 − X) = {lo8} + {hi8 - lo8}X ≥ {lo6} gives X ≥ {num(x_fv)}.",
      f"For 0 &lt; X &lt; {num(x_fv)} the shareholders want a value-destroying continuation (gambling for resurrection).",
      f"For {num(x_fv)} &lt; X &lt; 1/9 the creditor liquidates a firm worth more alive, because part of the extra value goes to the shareholders."],
     f"Comparing with {num(F6)} instead of {lo6}: the alternative is the liquidation value. Raising F to {hi8} in a renegotiation moves the creditor's threshold to {num(x_fv)}.",
     "Home assignment 1 E2d, manual 10.3")

owe9, safe9, gh9, gl9 = 1000, 900, 1300, 300
e9 = 0.5 * (gh9 - owe9)
d9 = 0.5 * owe9 + 0.5 * gl9
v9 = 0.5 * (gh9 + gl9)
sjekk("gamble", e9 + (d9 - safe9), v9 - safe9)
kort(AG, 9,
     f"Gambling for resurrection. (The firm owes {num(owe9)}K at year-end. Its assets are worth {safe9}K for sure. A costless strategy makes them {num(gh9)}K or {gl9}K with equal probability. No discounting.) Who gains and who loses?",
     f"Shareholders +{num(e9)}, creditors −{num(safe9 - d9)}, firm −{num(safe9 - v9)}: management gambles",
     [f"Safe: D = {safe9}, E = 0. The firm is shut down.",
      f"Gamble: E = 0.5 × ({num(gh9)} − {num(owe9)}) = {num(e9)}. D = 0.5 × {num(owe9)} + 0.5 × {gl9} = {num(d9)}. V = {num(v9)}.",
      "The manager wins too: the firm survives with probability 0.5."],
     "Saying the shareholders would never take a negative-NPV gamble. With nothing to lose they own only the upside.",
     "Lecture 4 slides 16–17, lecture 14 wrap-up, manual 9.1",
     kontroll=f"+{num(e9)} − {num(safe9 - d9)} = −{num(safe9 - v9)} = the expected value destroyed ✓")

# MXK PS1 E6
H11, L11, F11, I11, add11 = 150, 50, 100, 24, 30
D0 = 0.5 * min(H11, F11) + 0.5 * min(L11, F11)
E0 = 0.5 * max(H11 - F11, 0) + 0.5 * max(L11 - F11, 0)
D1 = 0.5 * min(H11 + add11, F11) + 0.5 * min(L11 + add11, F11)
E1 = 0.5 * max(H11 + add11 - F11, 0) + 0.5 * max(L11 + add11 - F11, 0)
x11 = I11 / E1
own11 = (1 - x11) * E1
sjekk("MXK x", x11, 0.6)
sjekk("MXK sum", (D1 - D0) + (own11 - E0), add11 - I11)
kort(AG, 10,
     f"Debt overhang. (Cash flow {H11} or {L11} next year, 50/50. Debt with face {F11}. A project costs {I11} and adds {add11} in both states. The owner must fund it by selling new shares. Risk neutral, no discounting)",
     f"The owner refuses: he keeps {num(1 - x11)} × {num(E1)} = {num(own11)} against {num(E0)} without the project",
     [f"NPV = {add11} − {I11} = {add11 - I11}. With the project the cash flow is {H11 + add11} or {L11 + add11}, so the debt still defaults in the bad state.",
      f"Equity after: 0.5 × ({H11 + add11} − {F11}) = {num(E1)}. New investors need x = {I11}/{num(E1)} = {pct(x11)}.",
      f"Who gets the NPV: the debt rises from {num(D0)} to 0.5 × {F11} + 0.5 × {L11 + add11} = {num(D1)} (+{num(D1 - D0)}), the owner falls from {num(E0)} to {num(own11)} (−{num(E0 - own11)})."],
     f"Treating the debt as safe after the project ({L11 + add11} &lt; {F11}, it is not), which hands the creditors +{num(F11 - D0)}. Pricing the new shares on the whole firm's value instead of the equity's.",
     "PS1 E6b, lecture 4, manual 10.1",
     kontroll=f"+{num(D1 - D0)} − {num(E0 - own11)} = {num(add11 - I11)} = NPV ✓")

F12 = 80
D1r = 0.5 * min(H11 + add11, F12) + 0.5 * min(L11 + add11, F12)
E1r = 0.5 * max(H11 + add11 - F12, 0) + 0.5 * max(L11 + add11 - F12, 0)
x12 = I11 / E1r
own12 = (1 - x12) * E1r
sjekk("MXK reneg", (D1r - D0) + (own12 - E0), add11 - I11)
kort(AG, 10,
     f"Renegotiation. The owner offers the creditors a new face value of {F12} instead of {F11}. Does he now invest? Do they accept? (Cash flow {H11} or {L11} next year, 50/50. Project costs {I11} and adds {add11} in both states, funded with new shares)",
     f"Yes and yes: owner {num(own12)} &gt; {num(E0)}, creditors {num(D1r)} &gt; {num(D0)}",
     [f"Face {F12}: the cash flow {H11 + add11} or {L11 + add11} covers it, so the debt is safe and worth {num(D1r)}.",
      f"Equity after: 0.5 × ({H11 + add11} − {F12}) = {num(E1r)}. x = {I11}/{num(E1r)} = {pct(x12)}, so the owner keeps {num(1 - x12)} × {num(E1r)} = {num(own12)}."],
     f"Comparing the creditors' {num(D1r)} with the old face value {F11}. Their alternative is the old debt, worth {num(D0)} without the project.",
     "PS1 E6c, practice session 1, manual 10.3",
     kontroll=f"creditors +{num(D1r - D0)}, owner +{num(own12 - E0)}, sum {num(add11 - I11)} = NPV ✓")

d13, a13, i13, g13 = 1000, 900, 100, 0.5
v13 = a13 + i13 * (1 + g13)
e13 = max(v13 - d13, 0)
kort(AG, 10,
     f"A firm owes {num(d13)}K at year-end and its assets will be worth {a13}K. A project costs {i13}K today and returns a risk-free {pct(g13)}. The firm has no cash and must raise the {i13}K as new equity. Will it invest? (No discounting)",
     f"No. The equity after the project is worth only {num(e13)}K, so new investors will not pay {i13}K",
     [f"With the project the firm is worth {a13} + {num(i13 * (1 + g13))} = {num(v13)}K and the equity {num(v13)} − {num(d13)} = {num(e13)}K.",
      f"NPV = {num(i13 * (1 + g13))} − {i13} = {num(i13 * g13)}K, but the creditors gain {num(d13 - a13)}K (from {a13} to {num(d13)}).",
      f"The shareholders, old and new together, put in {i13}K and hold equity worth {num(e13)}K: a loss of {num(i13 - e13)}K."],
     f"Approving the project because NPV &gt; 0. Ask who wins and who loses: the creditors capture more than the whole NPV.",
     "Lecture 4 slide 11, manual 10.1",
     kontroll=f"creditors +{num(d13 - a13)}, equity {num(e13)} − {i13} = −{num(i13 - e13)}, sum {num(i13 * g13)} = NPV ✓")

nic = (150, 50)
par = (130, 70)
nic_s = (140, 40)
par_s = (120, 60)
K14 = 100
Dtot = 0.5 * min(nic[0] + par[0], K14) + 0.5 * min(nic[1] + par[1], K14)
Etot = 0.5 * (nic[0] + par[0] - K14) + 0.5 * (nic[1] + par[1] - K14)
Dn = 0.5 * min(nic_s[0], K14) + 0.5 * min(nic_s[1], K14)
En = 0.5 * max(nic_s[0] - K14, 0) + 0.5 * max(nic_s[1] - K14, 0)
Ep = 0.5 * par_s[0] + 0.5 * par_s[1]
Dp = 0.5 * min(par_s[0], K14) + 0.5 * min(par_s[1], K14)
Ep2 = 0.5 * max(par_s[0] - K14, 0) + 0.5 * max(par_s[1] - K14, 0) + 0.5 * nic_s[0] + 0.5 * nic_s[1]
sjekk("Hillton", (En + Ep - Etot) + (Dn - Dtot), (sum(nic_s) + sum(par_s)) / 2 - (sum(nic) + sum(par)) / 2)
kort(AG, 9,
     f"A spin-off that leaves the debt behind. (Division N pays {nic[0]} or {nic[1]}, division P {par[0]} or {par[1]}, boom or bust 50/50. Debt {K14} backed by both. After a spin-off, lost synergies leave N at {nic_s[0]}/{nic_s[1]} and P at {par_s[0]}/{par_s[1]}. Which division should carry the debt?)",
     f"Put the debt on N: shareholders +{num(En + Ep - Etot)}, creditors −{num(Dtot - Dn)}, firm −{num(Dtot + Etot - Dn - En - Ep)}",
     [f"Today: cash flow {nic[0] + par[0]} or {nic[1] + par[1]}, D = {num(Dtot)} (safe), E = {num(Etot)}.",
      f"Debt on N ({nic_s[0]}/{nic_s[1]}): D = 0.5 × {K14} + 0.5 × {nic_s[1]} = {num(Dn)}. Equity {num(En)} + {num(Ep)} = {num(En + Ep)}.",
      f"Debt on P ({par_s[0]}/{par_s[1]}): D = {num(Dp)}, E = {num(Ep2)}. Load the debt on the riskier division."],
     "Concluding the spin-off is bad for the shareholders because firm value falls. Covenants that ban it are good for the owners ex ante: they make the debt cheaper.",
     "PS1 E8a–c, lecture 4, manual 9.4",
     kontroll=f"+{num(En + Ep - Etot)} − {num(Dtot - Dn)} = −{num(Dtot + Etot - Dn - En - Ep)}, the lost synergies ✓")

kort(AG, 10,
     "Are debt covenants that ban asset sales and spin-offs good or bad for shareholders? (Verbal)",
     "Bad ex post, good ex ante",
     [],
     "Answering only ex post. Seniority, collateral and convertible debt are other ways to commit.",
     "PS1 E8d, manual 10.4",
     modell=("Once the debt is in place a covenant blocks moves like a spin-off that would transfer value from the creditors to the shareholders, so ex post it costs the owners that gain. "
             "But creditors anticipate risk shifting and charge for it when the debt is issued, so without covenants the shareholders bear the expected loss anyway, including the value destroyed. "
             "A covenant lets the firm commit not to destroy value, which buys cheaper debt: Kurbatov's necessary evil. "
             "The cost is lost flexibility, since a covenant can also block a good project."))

kort(AG, 11,
     "How can debt raise firm value apart from the tax shield? (Verbal, agency benefits of debt)",
     "It disciplines managers who would otherwise waste free cash flow",
     ["Free cash flow (Jensen): a mature firm with cash and few good projects tempts managers to build empires. Interest payments commit the cash to leave the firm. Missing one is far more serious than skipping a dividend.",
      "Ownership: debt lets management hold a larger share of a smaller equity base, so its incentives move closer to the owners'.",
      "Pressure: the threat of default forces cost cuts and restructuring that a comfortable manager would postpone.",
      "Too much debt brings back risk shifting and overhang, so the benefit is from moderate debt in mature, cash-rich firms (the LBO argument)."],
     "Listing only the tax shield. Saying debt always disciplines: highly levered firms gamble.",
     "Lecture 4 slides 22–23, manual 11.1")

F17, safe17, hi17 = 50, 60, 100
E17 = 0.5 * (hi17 - F17)
D17 = 0.5 * F17
sjekk("debt buyback", (safe17 - F17) - E17 + (F17 - D17), safe17 - 0.5 * hi17)
kort(AG, 10,
     f"Buying back risky debt. (Face value {F17}. With the debt in place management picks a risky strategy: {hi17} or 0, 50/50. Without debt it would pick a safe {safe17}. The bonds trade at {num(D17)}. The shareholders offer to buy all the debt with their own cash. No discounting)",
     f"They lose: the creditors sell only at {F17}, so the shareholders pay {F17} for a gain of {safe17 - F17}",
     [f"Today: E = 0.5 × ({hi17} − {F17}) = {num(E17)}, D = {num(D17)}, V = {num(E17 + D17)}.",
      f"Once the debt is gone the firm goes safe: V = {safe17}, a gain of {num(safe17 - E17 - D17)} for the firm.",
      f"Creditors know it: after the buyback a bond is worth {F17}, so nobody tenders below {F17}.",
      f"Shareholders end with {safe17} − {F17} = {safe17 - F17} against {num(E17)} now. Creditors gain {num(F17 - D17)}."],
     f"Pricing the buyback at {num(D17)}. Believing the shareholders gain from making the debt safer: as in H2024 E4d, cutting risk transfers value to the creditors, here more than the whole efficiency gain.",
     "H2024 E4d, manual 9.4",
     kontroll=f"−{num(E17 - (safe17 - F17))} + {num(F17 - D17)} = {num(safe17 - E17 - D17)} = efficiency gain ✓")

# =====================================================================
# 5. ASYMMETRISK INFORMASJON OG EMISJON (k12, k13, k14)
# =====================================================================
lo1, hi1, I1, X1 = 50, 150, 25, 30
EV1 = 0.5 * (lo1 + hi1)
a_pool = I1 / (EV1 + X1)
keep_lo = (1 - a_pool) * (lo1 + X1)
keep_hi = (1 - a_pool) * (hi1 + X1)
sjekk("HA1 E3 alpha", a_pool, 25 / 130)
kort(IN, 12,
     f"Pooling test. (Assets in place worth {lo1} or {hi1}, equally likely to investors. A project costs {I1} and pays a sure {X1}. Only new equity, no discounting.) What fraction must be sold? Who issues?",
     f"α = {I1}/({num(EV1)} + {X1}) = {pct(a_pool)}. The low type issues, the high type does not: pooling fails",
     [f"Pooled value after the project: 0.5 × {lo1} + 0.5 × {hi1} + {X1} = {num(EV1 + X1)}. That is E[V] + I + NPV.",
      f"Low keeps (1 − α) × {lo1 + X1} = {num(keep_lo)} &gt; {lo1}: issues. High keeps (1 − α) × {hi1 + X1} = {num(keep_hi)} &lt; {hi1}: walks away.",
      "Check 5: the price assumed that both types issue, but only the low type does, so the beliefs are not rational."],
     f"α = {I1}/{num(EV1 + X1 - I1)} = {pct(I1 / (EV1 + X1 - I1))} (the cash raised dropped from the denominator). Stopping after α without the rationality check.",
     "Home assignment 1 E3a–b, manual 12.2")

a_sep = I1 / (lo1 + X1)
keep_lo2 = (1 - a_sep) * (lo1 + X1)
mimic = (1 - a_sep) * (hi1 + X1)
sjekk("HA1 E3c", keep_lo2, 55)
kort(IN, 12,
     f"Investors believe only the low type issues. (Assets {lo1} or {hi1}, project costs {I1} and pays a sure {X1}, equity only, no discounting.) Fraction sold and the decisions? Is the outcome efficient?",
     f"α = {I1}/{lo1 + X1} = {pct(a_sep)}. Low issues ({num(keep_lo2)} &gt; {lo1}), high does not ({num(mimic)} &lt; {hi1}): a separating equilibrium",
     [f"Low type: the issue is fairly priced, so its owners keep exactly V + NPV = {num(keep_lo2)}.",
      f"High type on those terms: {num(1 - a_sep)} × {hi1 + X1} = {num(mimic)}. It stays out, so the beliefs are confirmed (check 5) ✓",
      f"Inefficient: the high type's project with NPV {X1 - I1} is never taken, an expected loss of 0.5 × {X1 - I1} = {num(0.5 * (X1 - I1))}. Underinvestment from adverse selection."],
     "Calling separating efficient. Pooling only moves value between the types, separating destroys NPV.",
     "Home assignment 1 E3c–d, manual 12.3")

cert = (hi1 + X1 - I1) - hi1
kort(IN, 13,
     f"The high type can buy a perfectly credible certificate for K, paid by its old shareholders. What is the most it will pay? (Assets {hi1}, project costs {I1} and pays a sure {X1}, equity only)",
     f"K = {num(cert)}, the project's NPV",
     [f"Certified, the issue is fairly priced: α = {I1}/{hi1 + X1} and the old owners keep {hi1 + X1} − {I1} = {hi1 + X1 - I1}.",
      f"Without it the high type does not issue and keeps {hi1}.",
      f"Pay K as long as {hi1 + X1 - I1} − K ≥ {hi1}, so K ≤ {num(cert)}."],
     f"{num(hi1 + X1 - I1 - keep_hi)} (compared with the pooling payoff {num(keep_hi)}, which the high type would never accept).",
     "Home assignment 1 E3e, PS1 E11c, manual 13.5")

X4i = 60
a4i = I1 / (EV1 + X4i)
kh4 = (1 - a4i) * (hi1 + X4i)
kl4 = (1 - a4i) * (lo1 + X4i)
tr4 = a4i * (hi1 - EV1)
sjekk("pooling investors break even", a4i * (0.5 * (hi1 + X4i) + 0.5 * (lo1 + X4i)), I1)
kort(IN, 12,
     f"Assets in place worth {lo1} or {hi1}, equally likely to investors. A project costs {I1} and pays a sure {X4i}. Only new equity, no discounting. Do both types issue?",
     f"Yes: pooling with α = {I1}/{num(EV1 + X4i)} = {pct(a4i, 3)}",
     [f"High keeps {num(1 - a4i, 5)} × {hi1 + X4i} = {fx(kh4)} &gt; {hi1}. Low keeps {num(1 - a4i, 5)} × {lo1 + X4i} = {fx(kl4)} &gt; {lo1}.",
      "Both issue, as investors assumed: the beliefs are rational (check 5) ✓",
      f"The high type's dilution α({hi1} − {num(EV1)}) = {fx(tr4)} is below the NPV of {X4i - I1}, so it still invests. The {fx(tr4)} moves from the high to the low type and no NPV is lost."],
     "Concluding that pooling is inefficient. It only transfers value. The new investors break even on average.",
     "Variant of PS1 E11, where I = 35 and the equilibrium separates; manual 12.3")

V5i, I5i, N5i = 100000, 10000, 1000
a5i = I5i / V5i
n5i = a5i * N5i / (1 - a5i)
P5i = V5i / (N5i + n5i)
sjekk("Rothko price", P5i, 90)
kort(IN, 12,
     f"From the fraction α to the number of new shares. (The market values the firm at {num(V5i)} after an issue that raises {num(I5i)}. {num(N5i)} shares outstanding)",
     f"N = {num(a5i)} × {num(N5i)}/{num(1 - a5i)} = {fx(n5i)} new shares at {num(P5i)}",
     [f"α = {num(I5i)}/{num(V5i)} = {pct(a5i)}.",
      f"N/({num(N5i)} + N) = {num(a5i)}, so N = {fx(n5i)}.",
      f"Price = {num(V5i)}/{fx(N5i + n5i)} = {num(P5i)}. The old holders keep {num(V5i - I5i)}."],
     f"{num(a5i * N5i)} shares (α × N<sub>old</sub>, which gives the new holders only {pct(a5i * N5i / (N5i + a5i * N5i), 2)}).",
     "PS2 E1c, manual 12.2",
     kontroll=f"{fx(n5i)} × {num(P5i)} = {num(n5i * P5i)} ✓")

kort(IN, 12,
     f"A firm is worth {num(V5i)} (good) or 0 (bad), equally likely, so its {num(N5i)} shares trade at 50. Investors believe that only a good firm raises {num(I5i)} for an exhibition, so an issuer is worth {num(V5i)} after the issue. Is that belief rational? (Risk neutral, no discounting)",
     "No. The bad type would issue too, so the belief is not an equilibrium",
     [f"Under the belief an issuer is valued at {num(V5i)} after the issue and sells {fx(n5i)} shares at {num(P5i)}.",
      f"A bad firm that imitates sees its price jump from 50 to {num(P5i)} on the announcement. The new investors pay {num(I5i)} for shares in a firm that is really worth 0 and lose when the truth comes out.",
      "Both types issue, which contradicts \"only the good type issues\": check 5 fails."],
     f"Stopping at the price of {num(P5i)}. Always ask whether every type acts as the belief assumes.",
     "PS2 E1d–e, manual 12.3")

N7i, Pm7, Ph7, Pl7, R7, dc7 = 100, 13.5, 14.5, 12.5, 500, 20
n7i = R7 / Pm7
lo_eq = (Pl7 * N7i + R7) / (N7i + n7i)
hi_eq = (Ph7 * N7i + R7) / (N7i + n7i)
kort(IN, 13,
     f"Debt or equity? ({N7i} million shares trading at {fx(Pm7)}; true value {fx(Ph7)} or {fx(Pl7)}; the managers know which. The firm must raise {R7}. Borrowing costs a net {dc7} in distress costs over tax benefits)",
     f"The overvalued firm ({fx(Pl7)}) issues equity, the undervalued ({fx(Ph7)}) borrows. The price moves to {fx(Pl7)} or {fx(Ph7)}",
     [f"Equity: {R7}/{fx(Pm7)} = {fx(n7i)} million new shares. True {fx(Pl7)}: ({num(Pl7 * N7i)} + {R7})/{fx(N7i + n7i)} = {fx(lo_eq)}, a gain of {fx(lo_eq - Pl7)} per share. True {fx(Ph7)}: {fx(hi_eq)}, a loss of {fx(Ph7 - hi_eq)}.",
      f"Debt costs {dc7}/{N7i} = {fx(dc7 / N7i)} per share for either type.",
      f"So the choice reveals the type: equity means {fx(Pl7)}, debt means {fx(Ph7)}."],
     "Ignoring that investors read the choice. Without distress costs every firm issues debt: the pecking order.",
     "PS1 E9, manual 13.2")

before8 = 0.5 * hi1 + 0.5 * (lo1 + X1 - I1)
after8 = lo1 + X1 - I1
kort(IN, 13,
     f"Price reaction to an equity issue in a separating equilibrium. (Assets {lo1} or {hi1}, equally likely. Only the low type issues {I1} for a sure {X1}. No discounting.) Value of the old shares before and after the announcement?",
     f"From {num(before8)} to {num(after8)}: a fall of {pct(1 - after8 / before8, 2)}",
     [f"Before the news the market weighs both types: the high stays out ({hi1}), the low issues ({lo1} + NPV {X1 - I1} = {after8}). 0.5 × {hi1} + 0.5 × {after8} = {num(before8)}.",
      f"An issue reveals the low type. The old shares are then worth E[V | issue] + NPV = {after8}.",
      f"({after8} − {num(before8)})/{num(before8)} = −{pct(1 - after8 / before8, 2)}. The fall is information, not dilution."],
     f"Comparing with {num(EV1)} (the NPV left out), or valuing the old shares at {lo1 + X1} (the cash raised counted as theirs).",
     "Manual 13.4, home assignment 1 E3")

kort(IN, 13,
     "Your firm announces an SEO and its share price falls 12%. What are the potential reasons? What would have been better? (About five sentences)",
     "Adverse selection: investors read the issue as a sign that the shares are overpriced",
     [],
     "Blaming dilution or the issue costs (in the US about 5.3% to the underwriter plus 1.7% other expenses): neither explains a 12% fall. The recording asks for the reasons in about five sentences and a better alternative, so give both.",
     "Lecture 14 wrap-up, lecture 6 slide 13, manual 13.4 and 14.5",
     modell=("Managers know more than investors and prefer to issue equity when they think the shares are overvalued, so the market marks the price down when an issue is announced (Myers-Majluf). "
             "Choosing equity also signals that cheaper funds, internal cash and debt capacity, are exhausted, perhaps because cash flows will be weak. "
             "Investors may also fear that managers with too much free cash will spend it on poor projects. "
             "Better: follow the pecking order and use retained earnings or debt, or a rights issue, where the old owners buy the new shares and no value leaks to outsiders. "
             "A reputable underwriter or another credible signal can also shrink the discount."))

kort(IN, 13,
     "Why do firms prefer internal funds, then debt, then equity? (The pecking order)",
     "Debt is less sensitive to the manager's private information, so an undervalued firm gives away less by issuing it",
     ["Internal cash carries no information cost. Safe debt is worth the same whatever the manager knows, so nothing is transferred.",
      "Risky debt is mispriced only in the default states, equity in every state: in the manual's Havbruk case the good firm gives away 30 by issuing debt against 48.53 by issuing equity.",
      "Evidence: SEO announcements meet about −3%, straight debt about 0."],
     "Calling the pecking order a theory of target leverage. It only ranks sources by information cost and says nothing about taxes or distress.",
     "Lecture 4, manual 13.1–13.2")

old11, new11, Po11, spr11, Pc11 = 10, 5, 20, 0.07, 50
gross11 = new11 * Po11
net11 = gross11 * (1 - spr11)
mv11 = (old11 + new11) * Pc11
fair11 = (mv11 - net11) / old11
cost11 = (fair11 - Pc11) * old11
sjekk("IPO cost", cost11, gross11 * spr11 + new11 * (Pc11 - Po11))
kort(IN, 14,
     f"Total cost of an IPO to the old owners. ({old11} million old shares. {new11} million new shares sold at {Po11} with a {pct(spr11)} spread. The first-day close of {Pc11} is fair value)",
     f"{num(cost11)} million: {num(gross11 * spr11)} in spread plus {num(new11 * (Pc11 - Po11))} of underpricing",
     [f"Net proceeds: {new11} × {Po11} × {num(1 - spr11)} = {num(net11)}.",
      f"Post-IPO value {old11 + new11} × {Pc11} = {num(mv11)}. A fair issue would have left the old shares worth ({num(mv11)} − {num(net11)})/{old11} = {fx(fair11)}.",
      f"Cost = ({fx(fair11)} − {Pc11}) × {old11} = {num(cost11)}."],
     f"{num(gross11 * spr11)} (the bank's fee only). Underpricing is never invoiced, but the old owners pay it in shares.",
     "PS2 E2, manual 14.2",
     kontroll=f"{num(spr11)} × {num(gross11)} + {new11} × ({Pc11} − {Po11}) = {num(cost11)} ✓")

g12, b12, ag12, ab12, P12a = 120, 80, 10, 50, 100
ret100 = (ag12 * (g12 - P12a) + ab12 * (b12 - P12a)) / ((ag12 + ab12) * P12a)
Pbe = (ag12 * g12 + ab12 * b12) / (ag12 + ab12)
avg_ret = 0.5 * (g12 / Pbe - 1) + 0.5 * (b12 / Pbe - 1)
sjekk("winner's curse return", ret100, -2 / 15)
kort(IN, 14,
     f"Winner's curse. (IPO shares turn out to be worth {g12} or {b12}, equally likely. You bid for 100 shares in each IPO and receive {ag12} when the IPO is good, {ab12} when it is bad.) Your return at a price of {P12a}? The price at which you break even?",
     f"{pct(ret100, 2)} at {P12a}. Break-even at {fx(Pbe)}, which shows up as about {pct(avg_ret, 0)} average underpricing",
     [f"At {P12a}: profit {ag12} × {g12 - P12a} − {ab12} × {P12a - b12} = {num(ag12 * (g12 - P12a) + ab12 * (b12 - P12a))} on {num((ag12 + ab12) * P12a)} invested: {pct(ret100, 2)}.",
      f"Break-even: {ag12}({g12} − P) + {ab12}({b12} − P) = 0, so {ag12 + ab12}P = {num(ag12 * g12 + ab12 * b12)} and P = {fx(Pbe)}.",
      f"First-day returns: +{pct(g12 / Pbe - 1, 2)} (good) and {pct(b12 / Pbe - 1, 2)} (bad), an average of {pct(avg_ret, 2)}."],
     f"{P12a} (the average value, which ignores that you get more of the bad issues). Calling the {pct(avg_ret, 0)} a profit: it compensates for adverse allocation.",
     "Lecture 6 slides 24–27, manual 14.3")

kort(IN, 14,
     "Give four explanations of IPO underpricing. (Kurbatov's grouping)",
     "Asymmetric information, investment bank conflicts, control, behavioural",
     ["Asymmetric information: the winner's curse keeps uninformed investors in only if issues are cheap; book building pays informed investors for revealing what they know.",
      "Investment bank conflicts: a cheap issue is easy to sell and a favour to the bank's repeat clients.",
      "Control: excess demand lets the issuer choose a dispersed owner base that will not interfere.",
      "Behavioural: over-optimistic investors bid the first-day price above value."],
     "Listing the four names without explaining them. As in the key to H2024 E2, what counts is at least two groups explained in enough detail. Litigation risk is a fifth.",
     "Lecture 6 slide 21, manual 14.3")

kort(IN, 14,
     "Why do IPO shares often do poorly in the years after listing? (Verbal)",
     "Optimists set the price while pessimists cannot yet sell short",
     ["Right after listing the most optimistic investors buy. Short selling is hard or impossible, so the pessimists' views are not in the price.",
      "The price therefore sits above fundamental value.",
      "As negative information spreads and short selling begins, the price falls back towards fundamental value. Issues from hot markets show it most."],
     "Confusing this with first-day underpricing: the two coexist.",
     "Lecture 6 slide 30, manual 14.4")

N15, P15, ratio15, Ps15 = 40, 50, 4, 40
new15 = N15 / ratio15
terp = (N15 * P15 + new15 * Ps15) / (N15 + new15)
right15 = P15 - terp
sjekk("TERP right", right15, (terp - Ps15) / ratio15)
kort(IN, 14,
     f"Rights issue. ({N15} million shares at {P15}. A 1-for-{ratio15} rights issue at {Ps15}.) Ex-rights price and the value of one right?",
     f"TERP = {num(N15 * P15 + new15 * Ps15)}/{num(N15 + new15)} = {num(terp)}, one right = {P15} − {num(terp)} = {num(right15)}",
     [f"New shares {num(new15)} million at {Ps15} raise {num(new15 * Ps15)}.",
      f"TERP = ({N15} × {P15} + {num(new15)} × {Ps15})/{num(N15 + new15)} = {num(terp)}.",
      f"{ratio15} rights plus {Ps15} buy a share worth {num(terp)}, so each right is worth {num(terp - Ps15)}/{ratio15} = {num(right15)}.",
      "A holder who subscribes or sells the rights keeps his wealth; only one who lets them lapse loses."],
     f"Calling the {pct(1 - Ps15 / P15, 0)} subscription discount a {pct(1 - Ps15 / P15, 0)} loss. Using {P15} instead of {num(terp)} in later steps.",
     "Manual 14.5")

# =====================================================================
# 6. UTBYTTE OG TILBAKEKJØP (k15, k16)
# =====================================================================
N1u, cash1u, rU1u, FCF1u = 10, 20, 0.12, 48
cum1u = cash1u / N1u + FCF1u / N1u / rU1u
ex1u = FCF1u / N1u / rU1u
n1u = cash1u / cum1u
dps1u = FCF1u / (N1u - n1u)
sjekk("Genron b", dps1u / rU1u, cum1u)
kort(UT, 15,
     f"Pay {cash1u} of excess cash as a dividend or buy back shares? ({N1u} million shares, no debt, cost of capital {pct(rU1u)}, future FCF {FCF1u} a year forever. Perfect markets)",
     f"Dividend: {fx(cash1u / N1u)} now and a {fx(ex1u)} share. Buyback: a {fx(cum1u)} share. Same wealth",
     [f"Cum price: {fx(cash1u / N1u)} + {fx(FCF1u / N1u)}/{num(rU1u)} = {fx(cum1u)}. Ex-dividend: {fx(ex1u)}.",
      f"Buyback at {fx(cum1u)}: {cash1u}/{fx(cum1u)} = {num(n1u)} million shares, leaving {num(N1u - n1u)} million.",
      f"Future DPS = {FCF1u}/{num(N1u - n1u)} = {fx(dps1u)}, so P = {fx(dps1u)}/{num(rU1u)} = {fx(dps1u / rU1u)}."],
     f"Buying back at {fx(ex1u)} (the ex price). Thinking the buyback raises the price: the holders just do not get the {fx(cash1u / N1u)} in cash.",
     "PS1 E13a–b, manual 15.3")

tot2u = FCF1u
need2u = tot2u - cash1u
new2u = need2u / cum1u
dps2u = tot2u / (N1u + new2u)
sjekk("Genron c", dps2u + dps2u / rU1u, cum1u)
kort(UT, 15,
     f"The firm wants to pay out {FCF1u} million now, not just its {cash1u} of cash. It issues shares at {fx(cum1u)} for the rest. The new shares also get the dividend. DPS and price? ({N1u} million shares, FCF {FCF1u} a year forever, {pct(rU1u)})",
     f"DPS = {FCF1u}/{num(N1u + new2u)} = {fx(dps2u)} now and every year, price {fx(cum1u)}",
     [f"It needs {FCF1u} − {cash1u} = {need2u}, so it issues {need2u}/{fx(cum1u)} = {num(new2u)} million shares.",
      f"{num(N1u + new2u)} million shares share {FCF1u} now and {FCF1u} a year later: {fx(dps2u)} each.",
      f"P<sub>cum</sub> = {fx(dps2u)} + {fx(dps2u)}/{num(rU1u)} = {fx(dps2u + dps2u / rU1u)} ✓ More now, less later, same value."],
     f"{fx(FCF1u / N1u)} now (the new shares forgotten). In Nilpoj (PS1 E12) the new shares do not get the dividend, which changes the arithmetic but not the conclusion.",
     "PS1 E13c, manual 15.4")

sh3u, cf3u, r3u, div3u = 100000, 1.0, 0.10, 1.5
raise3u = div3u - cf3u
P1_3u = (cf3u - raise3u * r3u) / r3u * 1e6 / sh3u
P0_3u = (div3u * 1e6 / sh3u + P1_3u) / (1 + r3u)
sjekk("lecture 5 P0", P0_3u, 100)
kort(UT, 15,
     f"Next year an all-equity firm pays a dividend of {num(div3u)} million instead of {num(cf3u)} million, raising the extra {num(raise3u)} million with new shares. Price next year after the dividend? Price today? ({num(sh3u)} shares, earns {num(cf3u)} million a year forever, {pct(r3u)})",
     f"P<sub>1</sub> = {num(P1_3u)}, P<sub>0</sub> = ({num(div3u * 1e6 / sh3u)} + {num(P1_3u)})/{num(1 + r3u)} = {num(P0_3u)}: unchanged",
     [f"To raise {num(raise3u)} million the new shares must be promised {num(raise3u * r3u)} million a year forever.",
      f"Old holders keep {num(cf3u - raise3u * r3u)} million a year: {num((cf3u - raise3u * r3u) / r3u)} million on {num(sh3u)} shares, so P<sub>1</sub> = {num(P1_3u)}.",
      f"Today: ({num(div3u * 1e6 / sh3u)} + {num(P1_3u)})/{num(1 + r3u)} = {num(P0_3u)}, the same as with the normal dividend of {num(cf3u * 1e6 / sh3u)}. A zero-NPV policy change."],
     f"P<sub>1</sub> = {num(cf3u / r3u * 1e6 / sh3u)} (dilution ignored), which gives P<sub>0</sub> = {fx((div3u * 1e6 / sh3u + cf3u / r3u * 1e6 / sh3u) / (1 + r3u))}.",
     "Lecture 5 slides 9–12, manual 15.4")

N4u, g4u, r4u, d4u = 1.0, 0.05, 0.10, 4.0
V1_4u = 1.0 * (1 + g4u) / (r4u - g4u)
raise4u = d4u - 1.0
P1_4u = (V1_4u - raise4u) / N4u
n4u = raise4u / P1_4u
frac4u = N4u / (N4u + n4u)
pv4u = (d4u + frac4u * V1_4u) / (1 + r4u)
sjekk("Nilpoj P1", P1_4u, 18)
sjekk("Nilpoj PV", pv4u, 20)
kort(UT, 15,
     f"The firm pays {num(d4u)} million in year 1 instead of 1 million, raising {num(raise4u)} million with new shares sold right after the dividend. Price at year 1 and shares issued? Are the old owners better off? ({num(N4u)} million shares, FCF 1 million in year 1 growing {pct(g4u)}, r = {pct(r4u)})",
     f"P<sub>1</sub> = {num(P1_4u)}, n = {num(n4u * 1e6, 0)} shares, value to the old owners still {num(pv4u)} million",
     [f"Value of the later dividends at year 1: {num(1 + g4u)}/({num(r4u)} − {num(g4u)}) = {num(V1_4u)} million.",
      f"New shares raise {num(raise4u)}: 1 million × P<sub>1</sub> + {num(raise4u)} = {num(V1_4u)}, so P<sub>1</sub> = {num(P1_4u)} and n = {num(raise4u)}/{num(P1_4u)} = {num(n4u)} million.",
      f"The old owners keep 6/7 of the later dividends. PV = ({num(d4u)} + 6/7 × {num(V1_4u)})/{num(1 + r4u)} = {num(d4u + frac4u * V1_4u)}/{num(1 + r4u)} = {num(pv4u)} ✓"],
     f"P<sub>1</sub> = {num(V1_4u)} (the new shares ignored). The extra dividend now is paid for by diluting the later ones.",
     "PS1 E12, manual 15.4")

EV5u, C5u, N5u, up5u, dn5u = 400, 100, 10, 600, 200
P5u = (EV5u + C5u) / N5u
n5u = C5u / P5u
b_up, b_dn = up5u / (N5u - n5u), dn5u / (N5u - n5u)
a_up, a_dn = (up5u + C5u) / N5u, (dn5u + C5u) / N5u
kort(UT, 16,
     f"Buy back shares before or after the news? (Enterprise value {EV5u}, excess cash {C5u}, {N5u} million shares, no debt. The news will move the enterprise value to {up5u} or {dn5u})",
     f"Good news expected: buy before ({num(b_up)} &gt; {num(a_up)}). Bad news: after ({num(a_dn)} &gt; {num(b_dn)})",
     [f"Now: P = ({EV5u} + {C5u})/{N5u} = {num(P5u)}, so the buyback takes {num(n5u)} million shares.",
      f"Before the news: {up5u}/{num(N5u - n5u)} = {num(b_up)} or {dn5u}/{num(N5u - n5u)} = {num(b_dn)}.",
      f"After: ({up5u} + {C5u})/{N5u} = {num(a_up)} or ({dn5u} + {C5u})/{N5u} = {num(a_dn)}.",
      "Managers buy when the stock is cheap, so a buyback announcement is read as good news and the price rises."],
     "Saying the timing does not matter: MM assumes symmetric information. Those who sell before good news lose to those who hold.",
     "PS1 E10, lecture 5 slide 24, manual 16.4")

Pc6u, D6u, td6, tg6 = 60, 4, 0.30, 0.20
drop6 = D6u * (1 - td6) / (1 - tg6)
tde6 = (td6 - tg6) / (1 - tg6)
kort(UT, 16,
     f"Ex-dividend drop with personal taxes. (Cum price {Pc6u}, dividend {D6u}. The marginal investor pays {pct(td6)} on dividends and {pct(tg6)} on capital gains)",
     f"Drop = {D6u} × (1 − {num(td6)})/(1 − {num(tg6)}) = {fx(drop6)}, so P<sub>ex</sub> = {fx(Pc6u - drop6)}",
     [f"The investor compares what he keeps: a krone of dividend is worth {num(1 - td6)}, a krone of price {num(1 - tg6)}.",
      f"Effective dividend tax: τ*<sub>d</sub> = ({num(td6)} − {num(tg6)})/(1 − {num(tg6)}) = {pct(tde6)}.",
      f"{fx(D6u - drop6)} per share leaks to the tax authority because the payment is labelled a dividend."],
     f"{fx(Pc6u - D6u)} (the full drop, which assumes equal tax rates). {fx(D6u * (1 - td6))} (only the dividend after tax used as the drop).",
     "Manual 16.1")

N7u, P7u, B7u, R7u, td7, tg7 = 20, 30, 20, 100, 0.30, 0.20
n7u = R7u / P7u
tax_div = td7 * R7u
tax_bb = tg7 * (P7u - B7u) * n7u
kort(UT, 16,
     f"Tax paid now on a payout of {R7u} as a dividend or as a buyback. ({N7u} million shares at {P7u}, holders bought at {B7u}, dividend tax {pct(td7)}, capital gains tax {pct(tg7)})",
     f"Dividend {fx(tax_div)}, buyback {fx(tax_bb)} now",
     [f"Dividend: {num(td7)} × {R7u} = {fx(tax_div)}, paid by every holder at once.",
      f"Buyback: {R7u}/{P7u} = {num(n7u)} million shares, a gain of {P7u - B7u} each, so {num(tg7)} × {fx(n7u * (P7u - B7u))} = {fx(tax_bb)}.",
      "Three advantages: a lower rate, only the gain is taxed and holders who keep their shares defer."],
     f"{fx(tg7 * R7u)} ({num(tg7)} on the whole {R7u}). The deferred tax still counts, discounted: the manual's full saving is 15.89, not {fx(tax_div - tax_bb)}.",
     "Manual 16.2")

kort(UT, 16,
     "Who prefers dividends and who prefers buybacks? (Clienteles)",
     "Individuals: buybacks. Corporations: dividends. Institutions: indifferent",
     ["Individuals usually pay more tax on dividends than on gains, which they can also defer: they prefer buybacks.",
      "Corporate holders can often deduct most of the dividends they receive but pay tax on gains: they prefer dividends.",
      "Tax-exempt institutions such as pension funds pay neither: indifferent.",
      "Firms attract the clientele that fits their payout, so changing policy mostly reshuffles the owners."],
     "Saying every investor prefers buybacks. In Norway personal dividends and gains carry the same effective 37.84%, so the rate advantage disappears.",
     "Lecture 5 slide 18, manual 16.3")

kort(UT, 16,
     "A mature firm generates more cash than it needs. Name four ways to use the free cash flow and say which you would choose. (Verbal)",
     "Reinvest, hold cash, pay a dividend, buy back shares. My choice without positive-NPV projects: buy back shares",
     [],
     "Saying reinvesting is always best because it means growth. Growth with negative NPV destroys value.",
     "Lecture 14 wrap-up, manual 16.5–16.7",
     modell=("(1) Reinvest: right only if NPV is positive. Without good projects it becomes empire building, the agency problem of free cash flow. "
             "(2) Hold cash: a buffer against distress and a way to avoid costly equity issues later, but idle cash invites waste. "
             "(3) Dividend: commits the firm, since dividends are sticky (General Motors) and cuts are punished. "
             "(4) Buyback: flexible, tax efficient for individuals and a signal that the shares are cheap. "
             "Under MM the choice is irrelevant, so taxes, signals and agency costs decide it. I would buy back shares with one-off excess cash and raise the dividend only if the extra cash flow will last. The firm keeps only the cash the business needs."))

N10u, ops10, cash10 = 20, 900, 60
P10u = (ops10 + cash10) / N10u
n10u = cash10 / P10u
sjekk("stop dividend", ops10 / (N10u - n10u), P10u)
kort(UT, 16,
     f"A firm stops its usual dividend of {num(cash10 / N10u)} per share and spends the {cash10} on a buyback instead. Price effect under MM? In practice? ({N10u} million shares, operations worth {ops10}, excess cash {cash10})",
     f"Under MM the price stays at {num(P10u)}. In practice two opposite signals",
     [f"Price with the cash inside: ({ops10} + {cash10})/{N10u} = {num(P10u)}. Buyback: {cash10}/{num(P10u)} = {num(n10u)} million shares. After: {ops10}/{num(N10u - n10u)} = {num(ops10 / (N10u - n10u))}.",
      f"A holder who wanted cash sells 1/16 ({pct(n10u / N10u)}) of his shares: a homemade dividend.",
      "In practice cutting a sticky dividend can read as bad news about future cash flow, while a buyback can read as a sign that the shares are cheap."],
     f"{num(ops10 / N10u)} (treated like an ex-dividend drop). Saying the holders lose the {num(cash10 / N10u)}: they can sell shares for it.",
     "Lecture 14 wrap-up, manual 15.3 and 16.4")

kort(UT, 16,
     "Why do firms smooth dividends? Why does the price fall sharply when a dividend is cut? (Verbal)",
     "Because a dividend is a commitment the market reads as a signal",
     ["Managers raise dividends only when they expect to sustain them, so dividends follow long-run earnings rather than this year's (Lintner).",
      "A cut therefore says that management no longer believes the old level is sustainable: bad news about future cash flows, so the price falls by more than the cash saved.",
      "A buyback carries no such commitment, which is why firms use it for one-off cash."],
     "Explaining the fall by the lost cash. Under MM the cash stays in the firm, so the fall is information.",
     "Lecture 5, lecture 14 wrap-up, manual 16.4")

C12u, r12u, tc12, ti12 = 100, 0.04, 0.22, 0.35
in12 = C12u * r12u * (1 - tc12)
out12 = C12u * r12u * (1 - ti12)
kort(UT, 16,
     f"Should a firm keep {C12u} of cash invested at {pct(r12u)} for a year or pay it out for the shareholders to invest? (Corporate tax {pct(tc12)}, personal tax on interest {pct(ti12)})",
     f"Retain, on taxes alone: {fx(in12 - out12)} more inside the firm",
     [f"Inside: the interest is taxed at {pct(tc12)}, so {C12u} × {pct(r12u)} × {num(1 - tc12)} = {fx(in12)}.",
      f"Paid out: the investor keeps {C12u} × {pct(r12u)} × {num(1 - ti12)} = {fx(out12)}. The dividend tax is paid on both routes, so it cancels.",
      f"Retain when {tc} &lt; τ<sub>i</sub>, pay out when {tc} &gt; τ<sub>i</sub>."],
     f"Stopping at taxes. Idle cash invites empire building, which usually outweighs {fx(in12 - out12)}.",
     "Lecture 5, manual 16.2")

sh13, P13u, dps13 = 1000, 42, 2
sell13 = sh13 * dps13 / P13u
kort(UT, 15,
     f"You own {num(sh13)} shares at {P13u} and want {dps13} per share in cash, but the firm buys back shares instead of paying a dividend. What do you do? (Perfect markets)",
     f"Sell {num(sh13 * dps13)}/{P13u} = {fx(sell13)} shares",
     [f"You keep {fx(sh13 - sell13)} shares × {P13u} = {num((sh13 - sell13) * P13u)} plus {num(sh13 * dps13)} in cash: {num(sh13 * P13u)}.",
      f"With a dividend you would hold {num(sh13)} × {P13u - dps13} + {num(sh13 * dps13)} = {num(sh13 * (P13u - dps13) + sh13 * dps13)}. The same.",
      "The reverse also works: reinvest a dividend you do not want. Payout policy is irrelevant when investors can undo it."],
     f"Selling {num(sh13 * dps13 / (P13u - dps13))} shares at {P13u - dps13} (the ex-dividend price, which never exists under a buyback).",
     "Manual 15.3")

earn14, cash14, rc14, N14u, P14u = 100, 200, 0.05, 50, 20
eps_b = earn14 / N14u
n14u = cash14 / P14u
eps_a = (earn14 - rc14 * cash14) / (N14u - n14u)
Pa14 = (P14u * N14u - cash14) / (N14u - n14u)
sjekk("EPS buyback price", Pa14, P14u)
kort(UT, 16,
     f"A CEO uses idle cash to buy back shares just before his bonus date. Does EPS rise? Does value rise? (Earnings {earn14}, of which {num(rc14 * cash14)} is {pct(rc14)} interest on {cash14} of cash. {N14u} shares at {P14u}. No taxes)",
     f"EPS rises from {fx(eps_b)} to {fx(eps_a)}. The price stays at {num(Pa14)}",
     [f"The cash earned {pct(rc14)}, while the shares carry an earnings yield of {fx(eps_b)}/{P14u} = {pct(eps_b / P14u)}. Swapping cash for shares lifts EPS mechanically.",
      f"Earnings {earn14} − {num(rc14 * cash14)} = {num(earn14 - rc14 * cash14)} on {N14u} − {num(n14u)} = {num(N14u - n14u)} shares: {fx(eps_a)}. Value: ({num(P14u * N14u)} − {cash14})/{num(N14u - n14u)} = {num(Pa14)}.",
      f"P/E falls from {fx(P14u / eps_b)} to {fx(Pa14 / eps_a)}: the remaining earnings are riskier.",
      "Governance point: EPS targets in pay make managers short-termist."],
     "Calling the EPS gain value creation.",
     "Lecture 13, lecture 14 wrap-up, manual 6.6")

kort(UT, 16,
     "How do firms buy back shares? Name the methods. (Verbal)",
     "Open market, tender offer (fixed price or Dutch auction), targeted repurchase",
     ["Open market: gradual and cheap, the usual route.",
      "Fixed-price tender: an offer at a premium for a stated number of shares. Dutch auction: holders state the lowest price they will accept. The firm pays the lowest price that fills its order.",
      "Targeted repurchase (greenmail): a block bought from one holder, often at a premium.",
      "Selling put options commits the firm to buy if the price falls."],
     "Forgetting that a tender at a premium moves value from the holders who keep their shares to those who tender, unless everyone tenders in proportion.",
     "Lecture 5, manual 16.6")

P16u, d16u, eps16u, P16n = 40, 2, 5, 42
kort(UT, 15,
     f"Dividend yield, payout ratio and total return. (Share price {P16u}, expected dividend {d16u}, EPS {eps16u}, expected price next year {P16n})",
     f"Yield {pct(d16u / P16u)}, payout ratio {pct(d16u / eps16u)}, total return {pct((d16u + P16n - P16u) / P16u)}",
     [f"Dividend yield = {d16u}/{P16u} = {pct(d16u / P16u)}.",
      f"Payout ratio = {d16u}/{eps16u} = {pct(d16u / eps16u)}.",
      f"Total return = ({d16u} + {P16n} − {P16u})/{P16u} = {pct((d16u + P16n - P16u) / P16u)}: dividend yield plus capital gain."],
     "Treating a high yield as a high return. Under MM a bigger dividend just means a smaller capital gain.",
     "Lecture 5, manual 15.1")

# =====================================================================
# 7. WACC, APV OG FTE (k17 til k20)
# =====================================================================
FCFw = 40
VLw = FCFw / rw13
VUw = FCFw / rU4
Dw = dv7 * VLw
TSw = tau4 * rD7 * Dw
PVTSw = TSw / rU4
sjekk("H2024 E5 WACC=APV", VUw + PVTSw, VLw, 1e-9)
kort(WA, 17,
     f"Levered value by the WACC method. (FCF {FCFw} a year forever from next year, after-tax WACC {pct(rw13)})",
     f"{VL} = {FCFw}/{num(rw13)} = {num(VLw)}",
     ["Level perpetuity, first flow next year: FCF/r<sub>wacc</sub>.",
      "The tax shield is inside the rate. Do not add it again."],
     f"{num(VLw + PVTSw)} (the APV tax shield, {num(TSw)}/{num(rU4)} = {num(PVTSw)}, added on top: double counting). Interest deducted from the FCF: the debt counted twice.",
     "H2024 E5d, manual 17.3")

kort(WA, 18,
     f"APV with the debt taken from the WACC value. (FCF {FCFw} forever, unlevered cost {pct(rU4)}, constant D/V of {pct(dv7)}, cost of debt {pct(rD7)}, tax {pct(tau4)}, WACC value {num(VLw)})",
     f"{VL} = {num(VUw)} + {num(PVTSw)} = {num(VUw + PVTSw)} ✓",
     [f"{VU} = {FCFw}/{num(rU4)} = {num(VUw)}.",
      f"D = {num(dv7)} × {num(VLw)} = {num(Dw)}. TS = {num(tau4)} × {pct(rD7)} × {num(Dw)} = {num(TSw)} a year.",
      f"Constant D/V, so the shield has asset risk: PV(TS) = {num(TSw)}/{num(rU4)} = {num(PVTSw)}."],
     f"{num(TSw / rD7)} (the shield discounted at {rD}, which equals {tc}D): {VL} = {num(VUw + TSw / rD7)} breaks WACC = APV.",
     "H2024 E5e, manual 18.2")

cf2 = [40, 50]
VL2w = cf2[0] / (1 + wacc5) + cf2[1] / (1 + wacc5) ** 2
VU2w = cf2[0] / (1 + rU5) + cf2[1] / (1 + rU5) ** 2
VE2w = cf2[0] / (1 + rE_) + cf2[1] / (1 + rE_) ** 2
sjekk("H2025 E4e", VL2w, 72.0178, 0.00005)
kort(WA, 17,
     f"WACC value over two years. (FCF {cf2[0]} in year 1 and {cf2[1]} in year 2, then nothing. After-tax WACC {pct(wacc5)})",
     f"{VL}<sub>0</sub> = {num(cf2[0] / (1 + wacc5))} + {num(cf2[1] / (1 + wacc5) ** 2)} = {num(VL2w)}",
     [f"{cf2[0]}/{num(1 + wacc5)} = {num(cf2[0] / (1 + wacc5))}.",
      f"{cf2[1]}/{num(1 + wacc5)}² = {cf2[1]}/{num((1 + wacc5) ** 2, 6)} = {num(cf2[1] / (1 + wacc5) ** 2)}."],
     f"{num(VU2w)} (discounted at {rU} = {pct(rU5)}: that is {VU}). {num(VE2w)} (at {rE} = {pct(rE_)}). The paper asks for four decimals.",
     "H2025 E4e, manual 17.4")

d4w = 0.2
D0w = d4w * VL2w
VL1w = cf2[1] / (1 + wacc5)
D1w = d4w * VL1w
kort(WA, 19,
     f"Debt adjustment at the end of year 1. (Constant D/E of 25%. FCF {cf2[0]} in year 1 and {cf2[1]} in year 2, then nothing. After-tax WACC {pct(wacc5)}, levered value today {num(VL2w)})",
     f"Repay {num(D0w, 6)} − {num(D1w, 6)} = {fx(D0w - D1w, 4)} at the end of year 1",
     [f"d = D/V = 0.25/1.25 = {num(d4w)}. D<sub>0</sub> = {num(d4w)} × {num(VL2w)} = {num(D0w)}.",
      f"{VL}<sub>1</sub> after the year-1 flow is paid: {cf2[1]}/{num(1 + wacc5)} = {num(VL1w)}. D<sub>1</sub> = {num(d4w)} × {num(VL1w)} = {num(D1w)}.",
      "The firm runs down, so it repays debt to keep the ratio."],
     f"0 (debt held at D<sub>0</sub>). Rounding: {num(D0w)} − {num(D1w)} gives {fx(round(D0w, 4) - round(D1w, 4), 4)}, the key's figure; unrounded it is {fx(D0w - D1w, 4)}. {num(0.25 * VL2w - 0.25 * VL1w)} (0.25 used as D/V). {num(d4w * (cf2[0] + VL1w) - D0w)} of new borrowing (the year-1 flow left inside {VL}<sub>1</sub>).",
     "H2025 E4f, manual 19.4")

ts1w = tau4 * rDd * D0w
ts2w = tau4 * rDd * D1w
pvts2 = ts1w / (1 + rU5) + ts2w / (1 + rU5) ** 2
pvts2_rd = ts1w / (1 + rDd) + ts2w / (1 + rDd) ** 2
sjekk("H2025 E4 APV", VU2w + pvts2, VL2w, 1e-9)
kort(WA, 18,
     f"APV over two years. (FCF {cf2[0]} and {cf2[1]}, unlevered cost {pct(rU5)}, cost of debt {pct(rDd)}, tax {pct(tau4)}. Debt {num(D0w)} at date 0 and {num(D1w)} at date 1, constant D/E)",
     f"{VL} = {num(VU2w, 6)} + {num(pvts2, 6)} = {num(VU2w + pvts2, 6)} ✓ (the WACC value, {num(VL2w)})",
     [f"{VU} = {cf2[0]}/{num(1 + rU5)} + {cf2[1]}/{num(1 + rU5)}² = {num(cf2[0] / (1 + rU5))} + {num(cf2[1] / (1 + rU5) ** 2)} = {num(VU2w)}.",
      f"TS<sub>t</sub> = {tc}{rD}D<sub>t−1</sub>: {num(tau4 * rDd)} × {num(D0w)} = {fx(ts1w, 4)} and {num(tau4 * rDd)} × {num(D1w)} = {fx(ts2w, 4)}.",
      f"Constant D/E, so discount at {rU}: {fx(ts1w / (1 + rU5), 4)} + {fx(ts2w / (1 + rU5) ** 2, 4)} = {fx(pvts2, 4)}."],
     f"Shields discounted at {rD}: {num(pvts2_rd)}, so {VL} = {num(VU2w + pvts2_rd)} ≠ {num(VL2w)}. Shields computed from D<sub>t</sub> instead of D<sub>t−1</sub>. Rounded parts, {fx(VU2w, 4)} + {fx(pvts2, 4)} = {fx(round(VU2w, 4) + round(pvts2, 4), 4)}, miss by 0.0001: carry more decimals before you add.",
     "H2025 E4g–i, manual 20.5")

rE6w, E6w, EV6w, rD6w, t6w = 0.10, 10.8, 14.4, 0.061, 0.35
cf6 = [50, 100, 70]
D6w = EV6w - E6w
d6w = D6w / EV6w
rw6 = E6w / EV6w * rE6w + d6w * rD6w * (1 - t6w)
V6w = [0.0] * 4
for t in range(2, -1, -1):
    V6w[t] = (cf6[t] + V6w[t + 1]) / (1 + rw6)
Dc6 = [d6w * v for v in V6w[:3]]
sjekk("Alcatel NPV", V6w[0] - 100, 85.86, 0.005)
kort(WA, 17,
     f"Project value at the firm's WACC and its debt capacity. (Cost of equity {pct(rE6w)}, market cap {num(E6w)} bn, enterprise value {num(EV6w)} bn, cost of debt {pct(rD6w)}, tax {pct(t6w)}. Project: −100 now, then {', '.join(map(str, cf6[:-1]))} and {cf6[-1]})",
     f"{rw} = {pct(rw6)}, V<sub>0</sub> = {fx(V6w[0])}, NPV = {fx(V6w[0] - 100)}. Debt capacity {', '.join(fx(x) for x in Dc6)}",
     [f"Net debt D = {num(EV6w)} − {num(E6w)} = {num(D6w)}, so d = {num(d6w)}.",
      f"{rw} = {num(E6w / EV6w)} × {pct(rE6w)} + {num(d6w)} × {pct(rD6w)} × {num(1 - t6w)} = {pct(rw6)}.",
      f"Roll back: V<sub>2</sub> = {cf6[2]}/{num(1 + rw6)} = {fx(V6w[2])}, V<sub>1</sub> = ({cf6[1]} + {fx(V6w[2])})/{num(1 + rw6)} = {fx(V6w[1])}, V<sub>0</sub> = ({cf6[0]} + {fx(V6w[1])})/{num(1 + rw6)} = {fx(V6w[0])}.",
      f"D<sub>t</sub> = {num(d6w)} × V<sub>t</sub>."],
     f"Debt capacity from the NPV ({num(d6w)} × {fx(V6w[0] - 100)} = {fx(d6w * (V6w[0] - 100))}) or from the year's FCF. It is d times the value of the remaining flows.",
     "PS2 E3, lecture 7 slide 21, manual 17.4")

rU7w = E6w / EV6w * rE6w + d6w * rD6w
VU7 = [cf6[t] / (1 + rU7w) ** (t + 1) for t in range(3)]
ts7 = [t6w * rD6w * Dc6[t] for t in range(3)]
pv7 = sum(ts7[t] / (1 + rU7w) ** (t + 1) for t in range(3))
sjekk("Alcatel APV", sum(VU7) + pv7, V6w[0], 1e-9)
ts7r = [round(x, 2) for x in ts7]
pv7r = sum(ts7r[t] / (1 + rU7w) ** (t + 1) for t in range(3))
kort(WA, 18,
     f"APV of the same project. (Cost of equity {pct(rE6w)}, cost of debt {pct(rD6w)}, D/V {num(d6w)}, tax {pct(t6w)}. FCF {', '.join(map(str, cf6[:-1]))} and {cf6[-1]}. Debt capacity {', '.join(num(x, 3) for x in Dc6)})",
     f"{rU} = {pct(rU7w)}, {VU} = {num(sum(VU7), 3)}, PV(TS) = {num(pv7, 3)}, APV = {num(sum(VU7) + pv7, 3)} ✓",
     [f"{rU} = {num(E6w / EV6w)} × {pct(rE6w)} + {num(d6w)} × {pct(rD6w)} = {pct(rU7w)}.",
      f"{VU} = {' + '.join(num(x, 3) for x in VU7)} = {num(sum(VU7), 3)}.",
      f"TS = {num(t6w)} × {pct(rD6w)} × D<sub>t−1</sub>: {', '.join(num(x) for x in ts7)}, discounted at {rU}: {num(pv7, 3)}."],
     f"{num(pv7r, 3)} if the shields are rounded to two decimals before discounting, as the course solution does (it reports 1.85). Keep four decimals until the end.",
     "PS2 E4, manual 18.2")

V8, E8, rE8w, rf8w, rm8w, t8w, bD8w = 50, 35, 0.25, 0.03, 0.07, 0.40, 0.5
cf8 = [5, 5, 4, 4]
D8w = V8 - E8
d8w = D8w / V8
rD8w = rf8w + bD8w * (rm8w - rf8w)
rw8 = E8 / V8 * rE8w + d8w * rD8w * (1 - t8w)
V8w = [0.0] * 5
for t in range(3, -1, -1):
    V8w[t] = (cf8[t] + V8w[t + 1]) / (1 + rw8)
Dc8 = [d8w * v for v in V8w[:4]]
sjekk("HA2 V0", V8w[0], 12.2350, 0.00005)
rw8_wrong = E8 / V8 * rE8w + d8w * rf8w * (1 - t8w)
kort(WA, 17,
     f"WACC, project value and debt capacity. (Firm value {V8}, market cap {E8}, cost of equity {pct(rE8w)}, risk-free {pct(rf8w)}, market return {pct(rm8w)}, debt beta {num(bD8w)}, tax {pct(t8w)}, constant D/E. Project: −11 now, 5 in years 1–2, 4 in years 3–4)",
     f"{rw} = {pct(rw8)}, V<sub>0</sub> = {fx(V8w[0], 4)}, NPV = {fx(V8w[0] - 11, 4)}",
     [f"{rD} = {pct(rf8w)} + {num(bD8w)} × {pct(rm8w - rf8w)} = {pct(rD8w)}. D = {V8} − {E8} = {D8w}, so D/V = {num(d8w)}.",
      f"{rw} = {num(E8 / V8)} × {pct(rE8w)} + {num(d8w)} × {pct(rD8w)} × {num(1 - t8w)} = {pct(E8 / V8 * rE8w)} + {pct(d8w * rD8w * (1 - t8w))} = {pct(rw8)}.",
      f"Roll back at {pct(rw8)}: V<sub>3</sub> = {num(V8w[3])}, V<sub>2</sub> = {num(V8w[2])}, V<sub>1</sub> = {num(V8w[1])}, V<sub>0</sub> = {fx(V8w[0], 4)}.",
      f"Debt capacity D<sub>t</sub> = {num(d8w)}V<sub>t</sub>: {', '.join(num(x) for x in Dc8)}."],
     f"{pct(rw8_wrong)} ({rD} = {rf}, the debt beta ignored). Reporting {fx(V8w[0], 4)} when the question asks for the project's NPV.",
     "Home assignment 2 E1a–b, manual 17.4")

rU9w = E8 / V8 * rE8w + d8w * rD8w
VU9 = sum(cf8[t] / (1 + rU9w) ** (t + 1) for t in range(4))
ts9 = [t8w * rD8w * Dc8[t] for t in range(4)]
pv9 = sum(ts9[t] / (1 + rU9w) ** (t + 1) for t in range(4))
pv9rd = sum(ts9[t] / (1 + rD8w) ** (t + 1) for t in range(4))
sjekk("HA2 APV", VU9 + pv9, V8w[0], 1e-9)
kort(WA, 18,
     f"APV of the same project. (Cost of equity {pct(rE8w)}, cost of debt {pct(rD8w)}, D/V {num(d8w)}, tax {pct(t8w)}. FCF 5, 5, 4, 4. Debt capacity {', '.join(num(x) for x in Dc8)})",
     f"{VU} = {num(VU9)}, PV(TS) = {num(pv9)}, {VL} = {fx(VU9 + pv9, 4)} ✓",
     [f"{rU} = {num(E8 / V8)} × {pct(rE8w)} + {num(d8w)} × {pct(rD8w)} = {pct(rU9w)}.",
      f"{VU} = 5/{num(1 + rU9w)} + 5/{num(1 + rU9w)}² + 4/{num(1 + rU9w)}³ + 4/{num(1 + rU9w)}<sup>4</sup> = {num(VU9)}.",
      f"TS<sub>t</sub> = {num(t8w)} × {pct(rD8w)} × D<sub>t−1</sub>: {', '.join(num(x) for x in ts9)}, discounted at {pct(rU9w)}: {num(pv9)}."],
     f"Discounting the shields at {rD} ({num(pv9rd)}): the debt is rebalanced, so {rU}. The unlevered NPV is {num(VU9 - 11)}; the financing adds {num(pv9)}.",
     "Home assignment 2 E1c, manual 18.2")

d10w, I10w, V10w, cash10w = 0.5, 28, 61.25, 20
cap10 = d10w * V10w
nd10w = cap10 - cash10w
out10 = cash10w + nd10w - I10w
gain10 = (V10w - cap10) + out10
sjekk("lecture 7 gain", gain10, V10w - I10w)
kort(WA, 17,
     f"How is a new project funded at a constant D/V? Who gets the NPV? (Target D/V {num(d10w)}. The project costs {I10w} and is worth {num(V10w)} at the WACC. The firm uses its {cash10w} of excess cash and borrows the rest of the debt capacity)",
     f"New debt {num(nd10w)}, payout {num(out10)}, shareholders gain {num(gain10)} = NPV",
     [f"Debt capacity = {num(d10w)} × {num(V10w)} = {num(cap10)}. Using {cash10w} of cash raises net debt by {cash10w}, so borrow {num(nd10w)}.",
      f"Cash in: {cash10w} + {num(nd10w)} = {num(cap10)}. After the cost of {I10w}, {num(out10)} is paid out.",
      f"Equity rises by {num(V10w)} − {num(cap10)} = {num(V10w - cap10)}, plus the {num(out10)} payout: {num(gain10)} = {num(V10w)} − {I10w} ✓"],
     f"Borrowing the full {num(cap10)} and spending the cash too (net debt then overshoots the target). Capacity from the NPV instead of the value: {num(d10w)} × {num(V10w - I10w)}.",
     "Lecture 7 slides 19–22, manual 17.4")

FCF11, g11, rU11, t11, k11, rD11w = 2.5, 0.04, 0.10, 0.40, 0.20, 0.05
VU11 = FCF11 / (rU11 - g11)
VL11 = (1 + t11 * k11) * VU11
D11w = k11 * FCF11 / rD11w
d11 = D11w / VL11
rw11 = rU11 - d11 * t11 * rD11w
sjekk("Tybo WACC", FCF11 / (rw11 - g11), VL11, 1e-9)
kort(WA, 18,
     f"Levered value when interest is kept at {pct(k11)} of FCF. (FCF {num(FCF11)} next year growing {pct(g11)}, unlevered cost {pct(rU11)}, tax {pct(t11)}, cost of debt {pct(rD11w)})",
     f"{VL} = (1 + {num(t11)} × {num(k11)}) × {num(VU11)} = {num(VL11)}",
     [f"{VU} = {num(FCF11)}/({num(rU11)} − {num(g11)}) = {num(VU11)}.",
      f"Interest = k × FCF, so the shield is τk × FCF with the FCF's risk: PV(TS) = τk{VU} = {num(t11 * k11 * VU11)}.",
      f"Debt today: interest {num(k11)} × {num(FCF11)} = {num(k11 * FCF11)} at {pct(rD11w)}, so D = {num(D11w)}. d = {num(D11w)}/{num(VL11)} = {num(d11)}, {rw} = {pct(rU11)} − {num(d11)} × {num(t11)} × {pct(rD11w)} = {pct(rw11)}."],
     f"{num(VU11 + t11 * D11w)} ({tc}D, the permanent-debt rule). Confusing interest = k × FCF with debt = k × FCF (manual 18.5).",
     "PS2 E5, lecture 8 slide 17, manual 18.5",
     kontroll=f"{num(FCF11)}/({num(rw11, 6)} − {num(g11)}) = {num(FCF11 / (rw11 - g11))} ✓")

FCF12, rU12w, D12w, t12w = 2, 0.11, 12, 0.25
VU12 = FCF12 / rU12w
VL12 = VU12 + t12w * D12w
d12 = D12w / VL12
rw12 = rU12w * (1 - t12w * d12)
sjekk("Stable WACC", FCF12 / rw12, VL12, 1e-9)
kort(WA, 18,
     f"Project value with permanent debt by APV, checked with the WACC. (FCF {FCF12} a year forever, no growth, unlevered cost {pct(rU12w)}, permanent debt {D12w}, tax {pct(t12w)})",
     f"{VL} = {num(VU12)} + {num(t12w)} × {D12w} = {num(VL12)}",
     [f"{VU} = {FCF12}/{num(rU12w)} = {num(VU12)}. Permanent debt: PV(TS) = {tc}D = {num(t12w * D12w)}.",
      f"No growth, so D/V = {D12w}/{num(VL12)} = {num(d12)} stays constant and the WACC method works: {rw} = {rU}(1 − {tc}D/V) = {pct(rU12w)} × (1 − {num(t12w)} × {num(d12)}) = {pct(rw12)}.",
      "The WACC check is intuition only: Kurbatov calls the WACC for permanent debt not mandatory. On the exam, value permanent debt by APV."],
     f"{rw} = {rU} − d{tc}{rD}, the constant-ratio formula, which assumes the shield has asset risk. With growth the ratio drifts and only APV works.",
     "PS2 E9, practice session 2, manual 18.3",
     kontroll=f"{FCF12}/{num(rw12, 6)} = {num(FCF12 / rw12)} ✓")

EBIT13, g13w, t13w, D13w, rf13w, rm13w, bA13 = 2000, 0.03, 0.40, 5000, 0.05, 0.11, 1.11
FCF13 = EBIT13 * (1 - t13w)
rU13 = rf13w + bA13 * (rm13w - rf13w)
VU13 = FCF13 / (rU13 - g13w)
int13w = rf13w * D13w
TS13 = t13w * int13w
PV13 = TS13 / (rU13 - g13w)
VL13 = VU13 + PV13
E13w = VL13 - D13w
sjekk("AMC V^L", VL13, 15011.55, 0.01)
kort(WA, 18,
     f"APV when the debt grows with the firm. (EBIT {num(EBIT13)} next year growing {pct(g13w)}, no net investment, tax {pct(t13w)}. Risk-free debt {num(D13w)} at {pct(rf13w)}, kept at a constant ratio. Asset beta {num(bA13)}, risk-free {pct(rf13w)}, market return {pct(rm13w)})",
     f"{VL} = {num(VU13, 0)} + {num(PV13, 0)} = {num(VL13, 0)}, E = {num(E13w, 0)}",
     [f"FCF = {num(EBIT13)} × {num(1 - t13w)} = {num(FCF13)}. {rU} = {pct(rf13w)} + {num(bA13)} × {pct(rm13w - rf13w)} = {pct(rU13)}. {VU} = {num(FCF13)}/({num(rU13)} − {num(g13w)}) = {fx(VU13)}.",
      f"Interest {pct(rf13w)} × {num(D13w)} = {num(int13w)}, shield {num(TS13)}, growing {pct(g13w)} with the debt. It carries asset risk: {num(TS13)}/{num(rU13 - g13w)} = {fx(PV13)}.",
      f"E = {fx(VL13)} − {num(D13w)} = {fx(E13w)}."],
     f"{num(t13w * D13w)} ({tc}D, the permanent rule). Discounting the shield at {rD}: {num(TS13)}/({num(rf13w)} − {num(g13w)}) = {num(TS13 / (rf13w - g13w))}.",
     "PS2 E6a–d, manual 18.2")

rE14w = rU13 + D13w / E13w * (rU13 - rf13w)
nb14 = g13w * D13w
FCFE14 = FCF13 - (1 - t13w) * int13w + nb14
E14w = FCFE14 / (rE14w - g13w)
sjekk("AMC FTE", E14w, E13w, 1e-6)
kort(WA, 19,
     f"Flow to equity. (FCF {num(FCF13)} next year growing {pct(g13w)}. Interest {num(int13w)} on debt of {num(D13w)} that grows {pct(g13w)} a year. Tax {pct(t13w)}. {VL.replace('<sup>L</sup>', '^L')} {num(VL13, 0)}, E {num(E13w, 0)}, cost of debt {pct(rf13w)}, unlevered cost {pct(rU13)})".replace("V^L", "Levered value"),
     f"FCFE = {num(FCF13)} − {num(1 - t13w)} × {num(int13w)} + {num(nb14)} = {num(FCFE14)}, E = {num(FCFE14)}/({pct(rE14w, 3)} − {pct(g13w)}) = {num(E14w, 0)} ✓",
     [f"{rE} = {pct(rU13)} + ({num(D13w)}/{num(E13w, 0)})({pct(rU13)} − {pct(rf13w)}) = {pct(rE14w, 3)}.",
      f"FCFE = FCF − (1 − {tc}) × interest + net borrowing, with net borrowing {pct(g13w)} × {num(D13w)} = {num(nb14)}.",
      "Discount at r<sub>E</sub> with 3% growth: the APV equity value again."],
     f"Net borrowing left out: {num(FCFE14 - nb14)}/{num(rE14w - g13w, 5)} = {num((FCFE14 - nb14) / (rE14w - g13w), 0)}. Interest deducted without its tax saving: {num(FCF13 - int13w + nb14)}/{num(rE14w - g13w, 5)} = {num((FCF13 - int13w + nb14) / (rE14w - g13w), 0)}.",
     "PS2 E6f–h, manual 19.2")

V15w = 400
g15 = rw13 - FCFw / V15w
kort(WA, 17,
     f"Implied growth from a market value. (Next year's FCF {FCFw}, after-tax WACC {pct(rw13)}, unlevered cost {pct(rU4)}, the market values the firm at {V15w})",
     f"g = {rw} − FCF<sub>1</sub>/V = {pct(rw13)} − {pct(FCFw / V15w)} = {pct(g15)}",
     [f"V = FCF<sub>1</sub>/({rw} − g), so g = {rw} − FCF<sub>1</sub>/V.",
      f"{FCFw}/{V15w} = {pct(FCFw / V15w)}, so g = {pct(g15)}."],
     f"{pct(rU4 - FCFw / V15w)} (using {rU} = {pct(rU4)} on a levered value). Using today's FCF where the formula needs next year's.",
     "Manual 17.5")

kort(WA, 19,
     f"Which rate goes with which method? Why is the WACC below the unlevered cost? (D/V {num(dv)}, cost of equity {pct(rE_)}, cost of debt {pct(rDd)}, tax {pct(tau4)})",
     f"FCF at {rw} (WACC), FCF at {rU} plus PV(TS) (APV), FCFE at {rE} (FTE)",
     [f"{rU} = {num(ev)} × {pct(rE_)} + {num(dv)} × {pct(rDd)} = {pct(rU5)}. {rw} = {num(ev)} × {pct(rE_)} + {num(dv)} × {pct(rDd)} × {num(1 - tau4)} = {pct(wacc5)}.",
      f"The gap is (D/V){tc}{rD} = {num(dv)} × {num(tau4)} × {pct(rDd)} = {pct(dv * tau4 * rDd)}: the tax shield, built into the rate as a lower after-tax cost of debt. Without taxes {rw} = {rU}.",
      f"Given {rw}, expect the WACC method; given {rU}, expect APV."],
     f"Deducting interest from the FCF and then using {rw}: the debt is counted twice. Saying cheap debt lowers the WACC: without taxes {rE} rises to offset it.",
     "Lecture 14 wrap-up, H2025 E4, manual 19.6")

VL17, D17w, C17w, N17w = 348.43, 104.53, 20, 10
P17 = (VL17 + C17w - D17w) / N17w
kort(WA, 20,
     f"From the levered value to a price per share. (Levered value of the operations {fx(VL17)}, debt {fx(D17w)}, excess cash {C17w}, {N17w} million shares)",
     f"P = ({fx(VL17)} + {C17w} − {fx(D17w)})/{N17w} = {fx(P17)}",
     ["The DCF value covers the operations only. Add excess cash, subtract debt.",
      f"E = {fx(VL17 + C17w - D17w)} on {N17w} million shares."],
     f"{fx((VL17 - D17w) / N17w)} (cash forgotten). {fx((VL17 + C17w) / N17w)} (debt not deducted). Netting the cash twice: once in net debt and again here.",
     "Manual 20.6")

int18 = rD7 * Dw
FCFE18 = FCFw - (1 - tau4) * int18
E18 = FCFE18 / rE7
sjekk("H2024 FTE", E18, VLw - Dw, 1e-6)
kort(WA, 19,
     f"Equity value by flow to equity on a perpetuity. (FCF {FCFw} forever, no growth. Debt {num(Dw)} at {pct(rD7)}, held at {pct(dv7)} of value. Tax {pct(tau4)}, cost of equity {pct(rE7, 6)})",
     f"E = ({FCFw} − {num(1 - tau4)} × {num(int18)})/{num(rE7, 8)} = {num(E18)} = {VL} − D ✓",
     [f"Interest {pct(rD7)} × {num(Dw)} = {num(int18)}, after tax {num((1 - tau4) * int18)}.",
      f"No growth, so no net borrowing: FCFE = {num(FCFE18)}.",
      f"{num(FCFE18)}/{num(rE7, 8)} = {num(E18)}, matching {num(VLw)} − {num(Dw)}. With {rE} rounded to {pct(rE7)} you get {num(FCFE18 / round(rE7, 6))}: keep the unrounded rate."],
     f"{FCFw}/{num(rE7, 8)} = {num(FCFw / rE7, 2)} (FCF instead of FCFE). The match is a fixed point once {rE} came from MM II: it catches slips, not a wrong rate.",
     "H2024 E5, manual 19.2")

# =====================================================================
# 8. FRI KONTANTSTRØM OG DISKONTERING (k1, k2)
# =====================================================================
rev1, opx1, dep1, cap1, tax1f, nwc0, nwc1 = 110, 60, 10, 15, 0.50, 50, 40
ebit1 = rev1 - opx1 - dep1
fcf1 = ebit1 * (1 - tax1f) + dep1 - cap1 - (nwc1 - nwc0)
sjekk("GAP FCF1", fcf1, 25)
kort(FC, 2,
     f"Free cash flow from EBIT. (Revenue {rev1}, operating costs {opx1}, depreciation {dep1}, capex {cap1}, tax {pct(tax1f)}. Net working capital falls from {nwc0} to {nwc1})",
     f"FCF = {ebit1} × {num(1 - tax1f)} + {dep1} − {cap1} + {nwc0 - nwc1} = {num(fcf1)}",
     [f"EBIT = {rev1} − {opx1} − {dep1} = {ebit1}. EBIT(1 − τ) = {num(ebit1 * (1 - tax1f))}.",
      f"Add back depreciation {dep1}, subtract capex {cap1}.",
      f"ΔNWC = {nwc1} − {nwc0} = −{nwc0 - nwc1}, so − ΔNWC adds {nwc0 - nwc1}: freed working capital is cash in."],
     f"{num(fcf1 - 2 * (nwc0 - nwc1))} (sign of ΔNWC flipped). {num(fcf1 - (nwc0 - nwc1))} (ΔNWC forgotten, \"one of the biggest fallacies\"). Interest never enters.",
     "PS2 E7, lecture 14 wrap-up, manual 2.4")

f1, f2, g2f, r2f = 25, 13.75, 0.05, 0.10
TV2 = f2 * (1 + g2f) / (r2f - g2f)
VU2f = f1 / (1 + r2f) + (f2 + TV2) / (1 + r2f) ** 2
TVw = f2 / (r2f - g2f)
sjekk("GAP V^U", VU2f, 272.7273, 0.0001)
kort(FC, 2,
     f"Value with a terminal value. (FCF {num(f1)} in year 1 and {num(f2)} in year 2, then growing {pct(g2f)} a year forever. Unlevered cost {pct(r2f)})",
     f"{VU} = {num(f1)}/{num(1 + r2f)} + ({num(f2)} + {num(TV2)})/{num(1 + r2f)}² = {fx(VU2f)}",
     [f"The terminal value at year 2 uses year 3's flow: {num(f2)} × {num(1 + g2f)}/({num(r2f)} − {num(g2f)}) = {num(TV2)}.",
      f"Discount it with year 2's flow: {num(f2 + TV2)}/{num((1 + r2f) ** 2)} = {fx((f2 + TV2) / (1 + r2f) ** 2)}. Plus {num(f1)}/{num(1 + r2f)} = {fx(f1 / (1 + r2f))}."],
     f"TV = {num(TVw)} (the growth step skipped), which gives {fx(f1 / (1 + r2f) + (f2 + TVw) / (1 + r2f) ** 2)}. Discounting the TV three years: it sits at year 2.",
     "PS2 E7, manual 2.5")

ebitda3, dep3, t3f = 90, 30, 0.25
fcf3 = ebitda3 * (1 - t3f) + t3f * dep3
sjekk("EBITDA form", fcf3, (ebitda3 - dep3) * (1 - t3f) + dep3)
kort(FC, 2,
     f"FCF from EBITDA. (EBITDA {ebitda3}, depreciation {dep3}, tax {pct(t3f)}, no capex, no change in working capital)",
     f"FCF = {ebitda3} × {num(1 - t3f)} + {num(t3f)} × {dep3} = {num(fcf3)}",
     ["Depreciation is not cash, but it is tax deductible: its value is the tax it saves, τ × Dep.",
      f"Check via EBIT: ({ebitda3} − {dep3}) × {num(1 - t3f)} + {dep3} = {num(fcf3)} ✓"],
     f"{num(ebitda3 * (1 - t3f))} (the depreciation tax shield lost). {num(ebitda3 * (1 - t3f) + dep3)} (depreciation added back to EBITDA). Amortisation is grouped with depreciation.",
     "Lecture 14 wrap-up, manual 2.2")

s4 = [200, 300, 0]
nwc4 = [0.10 * s for s in s4]
flows4 = [-nwc4[0], -(nwc4[1] - nwc4[0]), -(nwc4[2] - nwc4[1])]
sjekk("NWC sum", sum(flows4), 0)
kort(FC, 2,
     f"Working capital over a project's life. (NWC must be 10% of next year's sales. Sales: {s4[0]} in year 1, {s4[1]} in year 2, nothing after year 2.) Cash flow from NWC each year?",
     f"{num(flows4[0])} at year 0, {num(flows4[1])} at year 1, +{num(flows4[2])} at year 2",
     [f"Levels: {num(nwc4[0])} (for year-1 sales), {num(nwc4[1])} (for year 2), then 0.",
      f"Only the change hits FCF: −ΔNWC = {', '.join(num(x) for x in flows4)}.",
      "Everything invested comes back at the end, but late, so it still costs time value."],
     "Subtracting the level each year. Forgetting the release at the end.",
     "Lecture 14 wrap-up, manual 2.4")

rev5, cogs5, dep5, t5f = 412, 309, 20.6, 0.40
ppe0, ppe1 = 200, 206
nw0 = 50 + 60 + 40 - 40
nw1 = 51.5 + 61.8 + 41.2 - 41.2
ebit5 = rev5 - cogs5 - dep5
capx5 = ppe1 - ppe0 + dep5
fcf5f = ebit5 * (1 - t5f) + dep5 - capx5 - (nw1 - nw0)
sjekk("Zola FCF", fcf5f, 40.14, 1e-9)
kort(FC, 2,
     f"FCF from pro forma statements. (Revenue {rev5}, COGS {cogs5}, depreciation {num(dep5)}, tax {pct(t5f)}. PPE {ppe0} → {ppe1}. Operating cash 50 → 51.5, inventory 60 → 61.8, receivables 40 → 41.2, payables 40 → 41.2)",
     f"FCF = {num(ebit5 * (1 - t5f))} + {num(dep5)} − {num(capx5)} − {num(nw1 - nw0)} = {num(fcf5f)}",
     [f"EBIT = {rev5} − {cogs5} − {num(dep5)} = {num(ebit5)}, after tax {num(ebit5 * (1 - t5f))}.",
      f"Capex = ΔPPE + depreciation = {ppe1 - ppe0} + {num(dep5)} = {num(capx5)}.",
      f"NWC = operating cash + inventory + receivables − payables: {num(nw0)} → {num(nw1)}, ΔNWC = {num(nw1 - nw0)}. Interest-bearing debt is financing, not working capital.",
      "The course spreadsheet (PS2-E8.xlsx) also puts the short-term interest-bearing debt into NWC and gets 40.59. That debt is then counted twice, because it is subtracted again as part of D. The app's PS2 E8 solution keeps 40.14."],
     f"Capex = {ppe1 - ppe0} (the net change only): FCF {num(fcf5f + dep5)}.",
     "PS2 E8, manual 2.2")

kort(FC, 2,
     "A student values a firm by discounting FCF after interest at the WACC. What goes wrong? (Verbal)",
     "The debt is counted twice: once in the cash flow and once in the rate",
     ["FCF is the cash the assets generate for all investors, computed as if the firm had no debt: EBIT(1 − τ), never net income.",
      f"The financing enters in one place only: the after-tax cost of debt in {rw}, or PV(TS) in APV.",
      f"To deduct interest, switch method: FCFE = FCF − (1 − τ) × interest + net borrowing, discounted at {rE}."],
     "Using net income as the cash flow: it is after interest.",
     "Lecture 14 wrap-up, manual 2.3")

kort(FC, 2,
     "Which items enter a project's FCF? (A market study already paid: 5. The new product takes 3 a year of margin from an old one. It uses a warehouse that could be rented out for 2 a year. Interest on the project loan: 4 a year)",
     "Include the lost margin (−3) and the forgone rent (−2). Exclude the study and the interest",
     ["Sunk cost: the 5 is spent whatever you decide.",
      "Cannibalisation: the old product's lost margin is an incremental effect of this project.",
      "Opportunity cost: the rent you give up is a real cost even though no cash changes hands.",
      "Interest is financing: it belongs in the discount rate, not in FCF."],
     "Including the study because it was done for this project. Apply the tax rate to the margin and the rent if the question gives one.",
     "Lecture 14 wrap-up, manual 2.1")

r8f, amt8 = 0.08, 1000
pv8 = amt8 / (1 + r8f) ** 1.5
kort(FC, 1,
     f"Discount {num(amt8)} received in 18 months. (Effective annual rate {pct(r8f)})",
     f"PV = {num(amt8)}/{num(1 + r8f)}<sup>1.5</sup> = {fx(pv8)}",
     [f"{num(1 + r8f)}<sup>1.5</sup> = {num(1 + r8f)} × √{num(1 + r8f)} = {num((1 + r8f) ** 1.5, 6)}.",
      f"For half a year alone: √{num(1 + r8f)} − 1 = {pct((1 + r8f) ** 0.5 - 1, 3)}, not {pct(r8f / 2)}."],
     f"{fx(amt8 / (1 + 1.5 * r8f))} ({num(amt8)}/{num(1 + 1.5 * r8f)}: simple interest). {fx(amt8 / (1 + r8f) ** 2)} (rounded up to two years).",
     "Lecture 14 wrap-up, lecture 10 slide 15, manual 1.1")

ra9, pm9, n9f = 0.07, 2000, 24
rm9f = (1 + ra9) ** (1 / 12) - 1
a9 = A(n9f, rm9f)
pv9f = pm9 * a9
pvwrong9 = pm9 * A(n9f, ra9 / 12)
sjekk("monthly annuity", (1 + rm9f) ** 24, (1 + ra9) ** 2, 1e-12)
kort(FC, 1,
     f"Monthly rate and a monthly annuity. (Effective annual rate {pct(ra9)}. A lease pays {num(pm9)} a month for {n9f} months, first payment in one month)",
     f"r<sub>m</sub> = {num(1 + ra9)}<sup>1/12</sup> − 1 = {pct(rm9f)}, PV = {num(pm9)} × {num(a9)} = {fx(pv9f)}",
     [f"Convert the rate to the period of the cash flow: {num(1 + ra9)}<sup>1/12</sup> − 1 = {pct(rm9f)}.",
      f"A({n9f}, {pct(rm9f)}) = (1 − 1/{num(1 + ra9)}²)/{num(rm9f, 6)} = {num(a9)}, so PV = {fx(pv9f)}."],
     f"{pct(ra9 / 12)} ({pct(ra9)}/12, a nominal rate): PV {fx(pvwrong9)}. Treating it as two annual payments of {num(12 * pm9)}.",
     "Lecture 11 slide 16, manual 1.4")

c10f, r10f = 10, 0.08
pv10_1 = c10f / r10f
kort(FC, 1,
     f"A perpetuity of {c10f} a year starts in year 2. What is it worth today? (Discount rate {pct(r10f)})",
     f"PV<sub>0</sub> = ({c10f}/{num(r10f)})/{num(1 + r10f)} = {fx(pv10_1 / (1 + r10f))}",
     [f"The perpetuity formula values the flows one period before the first one: at year 1, {num(pv10_1)}.",
      f"Bring it to year 0: {num(pv10_1)}/{num(1 + r10f)} = {fx(pv10_1 / (1 + r10f))}.",
      "Compare it with the alternative available now, for example renting out the asset in the meantime."],
     f"{num(pv10_1)} (not discounted). {fx(pv10_1 / (1 + r10f) ** 2)} (discounted two years).",
     "Lecture 14 wrap-up, manual 1.2")

V11f, F11f, g11f = 20, 1, 0.05
r11f = F11f / V11f + g11f
kort(FC, 1,
     f"Implied cost of equity from a growing perpetuity. (Equity worth {V11f} million, FCF {F11f} million next year growing {pct(g11f)} a year forever, all paid out)",
     f"r = FCF<sub>1</sub>/V + g = {pct(F11f / V11f)} + {pct(g11f)} = {pct(r11f)}",
     ["V = FCF<sub>1</sub>/(r − g), solved for r.",
      "Next year's cash flow over today's value is the yield; growth is the rest."],
     f"{pct(F11f * (1 + g11f) / V11f + g11f)} (next year's flow grown once more). {pct(F11f / V11f)} (growth forgotten).",
     "PS1 E12a, manual 1.3")

c12f, n12f, r12f = 5, 4, 0.10
a12f = A(n12f, r12f)
kort(FC, 1,
     f"Value of a fixed-life cash flow. ({c12f} a year for {n12f} years, first payment in one year, discount rate {pct(r12f)})",
     f"PV = {c12f} × (1/{num(r12f)})(1 − 1/{num(1 + r12f)}<sup>{n12f}</sup>) = {fx(c12f * a12f)}",
     [f"Annuity factor {num(a12f)}.",
      f"Check: a perpetuity of {c12f} is worth {num(c12f / r12f)} today; the part from year {n12f + 1} on is worth {num(c12f / r12f)}/{num(1 + r12f)}<sup>{n12f}</sup> = {fx(c12f / r12f / (1 + r12f) ** n12f)}; the difference is {fx(c12f / r12f - c12f / r12f / (1 + r12f) ** n12f)} ✓"],
     f"{c12f * n12f} (not discounted). {num(c12f / r12f)} (a perpetuity).",
     "Manual 1.4")

kort(FC, 1,
     f"The question says: evaluate the project. The project costs 11 today and its cash flows are worth {fx(V8w[0], 4)} at the WACC. The firm is worth {V8} without it. What do you report?",
     f"The project's NPV: {fx(V8w[0], 4)} − 11 = {fx(V8w[0] - 11, 4)}",
     ["PV is the value of the future cash flows. NPV subtracts the investment.",
      f"\"Evaluate the project\" asks for the project's NPV, not the firm's value with the project ({fx(V8 + V8w[0] - 11, 4)})."],
     f"Reporting {fx(V8w[0], 4)} (the PV) or the firm's value. Kurbatov deducts heavily for answering about the wrong object.",
     "Lecture 14 wrap-up, home assignment 2, manual 1.5")

ca, xa, cb, xb, r14f = 100, 130, 1000, 1200, 0.10
npa = xa / (1 + r14f) - ca
npb = xb / (1 + r14f) - cb
kort(FC, 1,
     f"Two mutually exclusive projects. A costs {ca} and pays {xa} in one year. B costs {num(cb)} and pays {num(xb)} in one year. Discount rate {pct(r14f)}. Which one?",
     f"B: NPV {fx(npb)} against {fx(npa)}, although A's IRR is higher ({pct(xa / ca - 1)} against {pct(xb / cb - 1)})",
     [f"NPV A = {xa}/{num(1 + r14f)} − {ca} = {fx(npa)}. NPV B = {num(xb)}/{num(1 + r14f)} − {num(cb)} = {fx(npb)}.",
      "IRR measures return per krone, not kroner of value created. With exclusive projects, rank by NPV."],
     "Choosing A for its higher IRR. IRR also fails with non-standard cash flows and ignores scale.",
     "Manual 1.6")


# =====================================================================
# KONTROLLER
# =====================================================================
class Tagger(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.feil = []

    def handle_starttag(self, tag, attrs):
        if tag != "br":
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            self.feil.append(tag)
        else:
            self.stack.pop()


BRUDD = []


def kontroller(kort_):
    ids = [k["id"] for k in kort_]
    assert len(ids) == len(set(ids)), "dupliserte id-er"
    for k in kort_:
        assert re.fullmatch(r"ok-[a-z]+-\d\d", k["id"]), k["id"]
        assert k["deck"] in SLUG, k["deck"]
        assert isinstance(k["ch"], int) and 0 <= k["ch"] <= 29, k
        f, b_ = k["front"], k["back"]
        assert not re.search(r"[<>&]", f), ("HTML i front", k["id"], f)
        for tekst in (f, b_):
            assert "—" not in tekst, ("tankestrek", k["id"])
            assert " – " not in tekst, ("spaced en dash", k["id"])
            if re.search(r",\s*and\b", tekst):
                BRUDD.append((k["id"], re.findall(r".{0,50},\s*and\b.{0,20}", tekst)))
            assert "nan" not in tekst.lower().split(), k["id"]
        assert b_.startswith("<b>") and "Trap: " in b_, k["id"]
        t = Tagger()
        t.feed(b_)
        assert not t.stack and not t.feil, ("ubalanserte tagger", k["id"], t.stack, t.feil)
        assert "<sub>" not in f
    assert not BRUDD, "komma foran and:\n" + "\n".join(map(str, BRUDD))
    return True


kontroller(KORT)

if __name__ == "__main__":
    ut = os.path.join(HER, "del1_kort.json")
    with open(ut, "w", encoding="utf-8") as fh:
        json.dump(KORT, fh, ensure_ascii=False, indent=1)
    teller = {}
    for k in KORT:
        teller[k["deck"]] = teller.get(k["deck"], 0) + 1
    for d in SLUG:
        print(f"{teller.get(d, 0):3d}  {d}")
    print(f"{len(KORT):3d}  totalt, {len(KONTROLL)} kontroller bestått")

    if "--sett-inn" in sys.argv:
        START = "/* oppgavekort del 1 */"
        SLUTT = "/* slutt på oppgavekort del 1 */"
        with open(DATA, encoding="utf-8") as fh:
            src = fh.read()
        if START in src:
            a = src.index(",\n  " + START)
            b2 = src.index(SLUTT, a) + len(SLUTT)
            src = src[:a] + src[b2:]
        m = re.search(r'\n  \{\n    "id": "fc460",.*?\n  \}', src, re.S)
        assert m, "fant ikke fc460"
        blokk = ",\n".join("\n".join("  " + linje for linje in json.dumps(k, ensure_ascii=False, indent=2).split("\n")) for k in KORT)
        innsatt = ",\n  " + START + "\n" + blokk + "\n  " + SLUTT
        src = src[:m.end()] + innsatt + src[m.end():]
        with open(DATA, "w", encoding="utf-8") as fh:
            fh.write(src)
        print("satt inn i", DATA)
