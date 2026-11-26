"""Skribent W4: «Må kunne», typene deal og governance (FIE402, tier 1).

Kjør fra hvor som helst:  python3 -I fag/fie402/_mk/w4_regn.py

Oppdraget står i docs/fie402-mk-spek.md. Seks oppgaver:

- mk-deal-1 (20 p): Mannesmann-formen fra forelesning 16 (54:58 til 1:22:12). Rykter, formelt
  bud med et stort bytteforhold (36 A per T), kurser før ryktene og i dag, verdien av budet og
  premien, endringen i markedsverdiene (hvem tjener), long T og short A med egne penger, verdier
  ved suksess og fiasko, p med (1 + r_f)^0.25 og en hale om arbitrasje og diversifisering.
- mk-deal-2 (20 p): H2025 E6-formen. Overraskende bud, T = 1, A faller og B stiger, p med hint
  (10 p), motiv (ikke synergier) og avstemning blant A-aksjonærene.
- mk-deal-3 (20 p): Variantene Kurbatov varslet: selvfinansiert posisjon (16, 1:14:18) med
  T = 0,5, kontroll mot den klassiske posisjonen med egne penger og halen «What if we can delay
  this M&A by one year?» (18, 5:29), verbalt.
- mk-governance-1 (10 p): eierens verktøykasse (17, 1:18:44): gründer som børsnoterer, tre ting i
  kontrakten eller overvåkingen (a) og to aksjeklasser for og mot (b).
- mk-governance-2 (10 p): lønn, KPI-er og kortsiktighet (17, 35:23 til 40:44; 18, 1:13:38): en
  lønnspakke med EPS-bonus, ESG-bonus og fallskjerm vurderes element for element.
- mk-governance-3 (10 p): forsvarstiltak og forskansning (17, 20:28 og 1:08:04 til 1:16:23): samme
  giftpille i to ulike selskaper, mekanismen, hvem den tjener og kursreaksjonen.

Skriptet regner hvert tall, asserter sjekkene og skriver w4.json og w4_svar.json i samme mappe.
Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som står i oppgaveteksten),
skrives ingenting.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "w4.json")
UT_SVAR = os.path.join(HER, "w4_svar.json")


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


def rel(a, b):
    return abs(a - b) / abs(b)


def tab(hode, rader):
    h = "<tr>" + "".join(f"<th>{x}</th>" for x in hode) + "</tr>"
    r = "".join("<tr>" + "".join(f"<td>{c}</td>" if i == 0 else f"<td class=\"n\">{c}</td>"
                                 for i, c in enumerate(rad)) + "</tr>" for rad in rader)
    return f"<table class=\"data\">{h}{r}</table>"


def t(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


OPPG = {}
SVAR = {}

# ======================================================================
# mk-deal-1 · Mannesmann-formen (forelesning 16)
# ======================================================================
ER1 = 36                       # nye A-aksjer per T-aksje
NA1, NT1 = 7_200, 150          # millioner aksjer
PA0_1, PT0_1 = 2.75, 84.00     # før ryktene
PA1_1, PT1_1 = 2.95, 101.20    # i dag, etter det formelle budet
rf1, T1 = 0.04, 0.25

tilbud1 = ER1 * PA1_1
premie1 = tilbud1 / PT0_1 - 1
spread1 = tilbud1 - PT1_1
nye1 = ER1 * NT1
andel1 = nye1 / (NA1 + nye1)
dVA1 = NA1 * (PA1_1 - PA0_1)
dVT1 = NT1 * (PT1_1 - PT0_1)
fak1 = (1 + rf1) ** T1
suk1 = tilbud1 * fak1
tap1 = ER1 * PA0_1 - PT0_1
fia1 = suk1 - tap1
ce1 = PT1_1 * fak1
p1 = (ce1 - fia1) / (suk1 - fia1)

assert near(tilbud1, 106.20) and near(spread1, 5.00) and near(tap1, 15.00)
assert near(nye1, 5_400) and near(dVA1, 1_440) and near(dVT1, 2_580)
assert dVA1 > 0 and dVT1 > dVA1                     # begge stiger, T tar mest
assert PT0_1 < PT1_1 < tilbud1                       # T mellom fiasko og budet
assert 0.5 < p1 < 0.9
assert near(p1 * suk1 + (1 - p1) * fia1, ce1, 1e-9)  # sjekken i løsningen
assert near(PT1_1, (p1 * suk1 + (1 - p1) * fia1) / fak1, 1e-9)
# fellene
p1_aar = (PT1_1 * 1.04 - (tilbud1 * 1.04 - tap1)) / tap1           # helt år
p1_udisk = (PT1_1 - fia1) / tap1                                   # 101.20 i stedet for CE
p1_enkel = (PT1_1 * (1 + rf1 * T1) - (tilbud1 * (1 + rf1 * T1) - tap1)) / tap1
assert rel(p1_aar, p1) > 0.01 and rel(p1_udisk, p1) > 0.05        # avvises med tol 0.005
assert rel(p1_enkel, p1) < 0.001                                   # godtas som tilnærming
andel1_felle = nye1 / NA1
assert rel(andel1_felle, andel1) > 0.5
# hva prisene sier om A ved gjennomføring (for halen og konsistensen i b)
As1 = (PA1_1 * fak1 - (1 - p1) * PA0_1) / p1
assert As1 > PA0_1                                   # markedet ser A tjene på avtalen
gevinst1 = suk1 - ce1
taap1 = ce1 - fia1
fall1 = fia1 / PT1_1 - 1
assert near(gevinst1 * p1, taap1 * (1 - p1), 1e-9)   # forventet merverdi null

d1_body = (
    "<p>In September rumours spread that the French drug maker Marveaux Pharma SA (A) would bid for the "
    "German biotech firm Lindgau Biotech AG (T). Today A has made a formal offer: if the deal goes through, "
    f"each T share will be exchanged for {ER1} new A shares. The deal will be completed or fail in exactly "
    f"three months. A has {f(NA1, 0)} million shares outstanding and T has {NT1} million.</p>"
    f"<p>Before the rumours the share prices were P<sub>A,0</sub> = €{f(PA0_1, 2)} and P<sub>T,0</sub> = "
    f"€{f(PT0_1, 2)}. Today they are P<sub>A,1</sub> = €{f(PA1_1, 2)} and P<sub>T,1</sub> = €{f(PT1_1, 2)}. "
    "The risk-free rate is 4% a year, compounded annually. Short selling is allowed. If the deal fails, assume "
    "that both prices return to their levels before the rumours. Use 4 decimal places.</p>"
)

d1_a = {
    "label": "a", "points": 3,
    "body": ("<p>What is A's offer worth per T share at today's prices? What premium over T's price before the "
             "rumours is that, in percent? What fraction of the combined company would T's shareholders own?</p>"),
    "solution": (
        f"<p><b>Offer value.</b> One T share becomes {ER1} A shares: {ER1} × €{f(PA1_1, 2)} = "
        f"<b>€{f(tilbud1, 2)}</b> per T share at today's prices.</p>"
        f"<p><b>Premium.</b> {f(tilbud1, 2)}/{f(PT0_1, 2)} − 1 = <b>{pc(premie1)}</b> over T's price before the "
        f"rumours. T trades at €{f(PT1_1, 2)}, €{f(spread1, 2)} below the offer: the market is not sure that the "
        "deal will go through.</p>"
        f"<p><b>Ownership.</b> A issues {ER1} × {NT1} million = {f(nye1, 0)} million new shares. T's shareholders "
        f"would own {f(nye1, 0)}/({f(NA1, 0)} + {f(nye1, 0)}) = {f(nye1, 0)}/{f(NA1 + nye1, 0)} = "
        f"<b>{pc(andel1)}</b> of the combined company and A's old shareholders {pc(1 - andel1)}. The large "
        "exchange ratio only reflects that an A share is cheap: A has many more shares than T.</p>"
    ),
    "criteria": [
        f"Offer value {ER1} × {f(PA1_1, 2)} = €{f(tilbud1, 2)} per T share at today's A price; "
        f"{ER1} × {f(PA0_1, 2)} = {f(ER1 * PA0_1, 2)} is the offer at the old prices.",
        f"Premium {f(tilbud1, 2)}/{f(PT0_1, 2)} − 1 = {pc(premie1)} over the price before the rumours.",
        f"Fraction for T's shareholders: {f(nye1, 0)} million new shares out of {f(NA1 + nye1, 0)} million, "
        f"so {pc(andel1)}. Dividing by A's old {f(NA1, 0)} million shares only gives {pc(andel1_felle, 0)}, which is wrong.",
        "Part a is the easy part: 1 point for each number.",
    ],
}
SVAR["mk-deal-1:1:a"] = {"type": "tall", "tall": [
    t("Offer value per T share", tilbud1, "€ per share"),
    t("Premium over T's price before the rumours", premie1 * 100, "%"),
    t("Fraction owned by T's shareholders", andel1 * 100, "%"),
]}

d1_b = {
    "label": "b", "points": 3,
    "body": ("<p>By how much did the market values of A and T change from before the rumours to today? What do "
             "the changes suggest about the deal's total gains and who captures them?</p>"),
    "solution": (
        "<p><b>Changes in market value</b> (€ million).</p>"
        + tab(["Firm", "Calculation", "Change"], [
            ["A", f"{f(NA1, 0)} × ({f(PA1_1, 2)} − {f(PA0_1, 2)})", f"<b>+{f(dVA1, 0)}</b>"],
            ["T", f"{NT1} × ({f(PT1_1, 2)} − {f(PT0_1, 2)})", f"<b>+{f(dVT1, 0)}</b>"],
            ["Together", "", f"+{f(dVA1 + dVT1, 0)}"],
        ])
        + "<p><b>Reading.</b> Both values rose although the deal may still fail, so the market expects the "
        "combination to add value in total. T's shareholders capture the larger part through the premium A "
        "offers, but A's shareholders gain too: the market does not think A is overpaying.</p>"
        "<p><b>Caveat.</b> The changes are weighted by the chance that the deal goes through. Part of them may "
        "also come from other news during the rumour period: firms do not exist in a vacuum, as the lecture warns "
        "about prices taken too early (recording 16, 54:33).</p>"
    ),
    "criteria": [
        f"Change for A: {f(NA1, 0)} million × 0.20 = €{f(dVA1, 0)} million; for T: {NT1} million × "
        f"{f(PT1_1 - PT0_1, 2)} = €{f(dVT1, 0)} million (1 point each).",
        f"Reading (1 point): the combined value rose by €{f(dVA1 + dVT1, 0)} million, so the market expects "
        "total gains; T's shareholders get most of them, but A's shareholders gain too, so A is not seen as "
        "overpaying.",
        "Bonus, not required: the changes are weighted by the chance of completion and may include other news "
        "from the rumour period.",
    ],
}
SVAR["mk-deal-1:1:b"] = {
    "type": "blandet",
    "tall": [t("Change in A's market value", dVA1, "€ m"), t("Change in T's market value", dVT1, "€ m")],
    "tallPoeng": 2,
    "tekstLedd": "What do the changes suggest about the deal's total gains and who captures them?",
}

d1_c = {
    "label": "c", "points": 5,
    "body": (f"<p>Today you buy one T share, short-sell the {ER1} A shares it would be exchanged for and invest "
             "the short-sale proceeds at the risk-free rate. What is the position worth in three months if the "
             "deal goes through? If it fails?</p>"),
    "solution": (
        "<p><b>Step 1. The position today.</b></p>"
        + tab(["Leg", "Action", "Cash flow today (€)"], [
            ["Long target", f"Buy 1 T share at {f(PT1_1, 2)}", f"−{f(PT1_1, 2)}"],
            ["Short acquirer", f"Short-sell {ER1} A shares at {f(PA1_1, 2)}", f"+{f(tilbud1, 2)}"],
            ["Risk-free", f"Invest the {f(tilbud1, 2)} for three months", f"−{f(tilbud1, 2)}"],
            ["<b>Net outlay</b>", "", f"<b>−{f(PT1_1, 2)}</b>"],
        ])
        + f"<p><b>Step 2. Three months of interest.</b> T = 3/12 = 0.25 years, so the factor is "
        f"1.04<sup>0.25</sup> = {f(fak1, 6)}. The deposit grows to {f(tilbud1, 2)} × {f(fak1, 6)} = "
        f"{f(suk1)}.</p>"
        f"<p><b>Step 3. The deal goes through.</b> The T share is converted into {ER1} A shares, which you hand "
        f"back to close the short. Only the deposit is left: <b>€{f(suk1)}</b>.</p>"
        f"<p><b>Step 4. The deal fails.</b> Both prices return to their levels before the rumours. You sell the "
        f"T share at {f(PT0_1, 2)} and buy back {ER1} A shares at {f(PA0_1, 2)}, which costs "
        f"{f(ER1 * PA0_1, 2)}: {f(suk1)} + {f(PT0_1, 2)} − {f(ER1 * PA0_1, 2)} = <b>€{f(fia1)}</b>.</p>"
        f"<p><b>Check.</b> The two payoffs differ by {f(ER1 * PA0_1, 2)} − {f(PT0_1, 2)} = {f(tap1, 2)}, what "
        "you lose on the shares if the deal fails. The position cost you "
        f"€{f(PT1_1, 2)} out of your own pocket.</p>"
    ),
    "criteria": [
        f"Long 1 T and short {ER1} A (the exchange ratio), with the {f(tilbud1, 2)} from the short sale "
        f"invested at the risk-free rate; the cost out of pocket is {f(PT1_1, 2)}.",
        f"Three months is T = 0.25: 1.04^0.25 = {f(fak1, 6)}, not 1.04.",
        f"Success: {f(tilbud1, 2)} × {f(fak1, 6)} = €{f(suk1)}, since the converted T share closes the short.",
        f"Failure: {f(suk1)} + {f(PT0_1, 2)} − {ER1} × {f(PA0_1, 2)} = €{f(fia1)}, at the prices before the rumours.",
        "Other consistent constructions are accepted, for example several T shares with the matching number "
        "of A shares.",
    ],
}
SVAR["mk-deal-1:1:c"] = {"type": "tall", "tall": [
    t("Value if the deal goes through", suk1, "€", tol=0.005),
    t("Value if the deal fails", fia1, "€", tol=0.005),
], "merknad": (f"Helt år (1.04) gir {f(tilbud1 * 1.04)} og {f(tilbud1 * 1.04 - tap1)}, utenfor 0,5 %. "
               "Enkel rente havner innenfor og godtas som tilnærming.")}
assert rel(tilbud1 * 1.04, suk1) > 0.005 and rel(tilbud1 * 1.04 - tap1, fia1) > 0.005

RES1_s, RES1_f = 108.00, 93.00             # reserveverdier i (d)
p1_res = (ce1 - RES1_f) / (RES1_s - RES1_f)
assert not near(RES1_s, suk1, 0.5) and not near(RES1_f, fia1, 0.5)
assert rel(p1_res, p1) > 0.05 and rel(p1_aar, p1) > 0.01
p1_ingen = (PT1_1 - (tilbud1 - tap1)) / tap1                       # ingen rente i det hele tatt
assert rel(p1_ingen, p1) > 0.002 and rel(p1_enkel, p1) < 0.002     # tol 0.002 skiller dem

d1_d = {
    "label": "d", "points": 5,
    "body": (f"<p>What probability of completion do today's prices imply? (If you could not solve (c), use "
             f"€{f(RES1_s, 2)} for success and €{f(RES1_f, 2)} for failure.)</p>"),
    "solution": (
        f"<p><b>Step 1. The certainty equivalent of the cost.</b> The position cost {f(PT1_1, 2)} today. If the "
        "market prices it fairly, its expected payoff in three months equals that cost grown at the risk-free "
        f"rate: {f(PT1_1, 2)} × {f(fak1, 6)} = {f(ce1)}. Do not plug in {f(PT1_1, 2)} itself.</p>"
        f"<p><b>Step 2. Solve.</b> {f(ce1)} = p × {f(suk1)} + (1 − p) × {f(fia1)}<br>"
        f"p = ({f(ce1)} − {f(fia1)})/({f(suk1)} − {f(fia1)}) = {f(ce1 - fia1)}/{f(suk1 - fia1)} = "
        f"<b>{f(p1)} ({pc(p1)})</b></p>"
        f"<p>The same equation in present values: {f(PT1_1, 2)} = [p × {f(suk1)} + (1 − p) × {f(fia1)}]/"
        "1.04<sup>0.25</sup>.</p>"
        f"<p><b>Check.</b> {f(p1, 6)} × {f(suk1)} + {f(1 - p1, 6)} × {f(fia1)} = {f(ce1)} ✓. T at "
        f"{f(PT1_1, 2)} lies between its failure price {f(PT0_1, 2)} and the offer value {f(tilbud1, 2)}.</p>"
        f"<p><b>With the values given in the question.</b> p = ({f(ce1)} − {f(RES1_f, 2)})/({f(RES1_s, 2)} − "
        f"{f(RES1_f, 2)}) = {f(p1_res)} ({pc(p1_res)}), full marks if the method is right.</p>"
        f"<p><b>The traps.</b> Using {f(PT1_1, 2)} instead of the certainty equivalent gives {f(p1_udisk)}. "
        f"Ignoring the interest altogether gives {f(p1_ingen)}. A full year (1.04) in both (c) and (d) gives "
        f"{f(p1_aar)}: wrong, but it is the same error as in (c) and is penalised only there. Simple interest, "
        f"1 + 0.04 × 0.25, gives {f(p1_enkel)}: close enough, but the course uses "
        "(1 + r<sub>f</sub>)<sup>T</sup>.</p>"
    ),
    "criteria": [
        f"Certainty equivalent {f(PT1_1, 2)} × 1.04^0.25 = {f(ce1)}. Plugging in {f(PT1_1, 2)} gives "
        f"{f(p1_udisk)} and loses most of the points.",
        f"Equation {f(ce1)} = p × {f(suk1)} + (1 − p) × {f(fia1)}, so p = {f(ce1 - fia1)}/{f(suk1 - fia1, 2)} "
        f"= {f(p1)} ({pc(p1)}).",
        f"Follow-through: with the values given in the question, p = {f(p1_res)}. A student who used 1.04 instead of "
        f"1.04^0.25 in (c) and here gets {f(p1_aar)} and loses the points for the factor only once, in (c).",
        "Reasonable rounding is fine; show the equation.",
    ],
}
SVAR["mk-deal-1:1:d"] = {"type": "tall", "tall": [
    t("Probability of completion", p1 * 100, "%", tol=0.002, alt=[p1_res * 100, p1_aar * 100]),
], "merknad": (f"Toleranse 0,2 %: ingen rente ({f(p1_ingen)}) og {f(PT1_1, 2)} i stedet for "
               f"sikkerhetsekvivalenten ({f(p1_udisk)}) avvises; enkel rente ({f(p1_enkel)}) godtas. alt: "
               f"reserveverdiene i oppgaveteksten gir {f(p1_res)} og helt år i både (c) og (d) gir {f(p1_aar)} "
               "(følgefeil, straffet i (c)).")}

d1_e = {
    "label": "e", "points": 4,
    "body": ("<p>Is the position in (c) an arbitrage? Would you advise a private investor to put most of her "
             "savings into it? How can a professional merger-arbitrage fund make such trades pay? (3–4 sentences)</p>"),
    "solution": (
        f"<p><b>Model answer.</b> No, it is not an arbitrage: compared with the risk-free alternative "
        f"({f(ce1)}), you gain {f(gevinst1, 2)} if the deal goes through but lose {f(taap1, 2)} if it fails. At "
        "the market's probability the expected payoff is exactly the cost grown at the risk-free rate. For a "
        "private investor with one deal this is an all-or-nothing bet: a failure costs "
        f"{pc(-fall1)} in three months (from {f(PT1_1, 2)} to {f(fia1, 2)}), so most of her savings would ride on "
        "one event. A fund earns more than the risk-free rate only if the true chance of completion is higher than "
        "the implied one, that is if the spread carries a premium for bearing deal risk, or if it picks deals "
        "better than the market; spreading its capital over many largely independent deals then makes that "
        "excess return reliable instead of a gamble.</p>"
        "<p><b>Also accepted.</b> The calculation rests on the strong assumption that prices return to their levels "
        "before the rumours; if they would not, the true risk differs from the model's. The lecture makes the same "
        "point: a small investor «would lose quite a bit of money» if the deal fails, while big funds spread their "
        "bets over many deals (recording 16, 1:22:46). Evidence on merger arbitrage (Mitchell and Pulvino, 2001) "
        "shows losses concentrated in sharp market declines, when many deals fail together, so the risk is not "
        "fully diversifiable.</p>"
    ),
    "criteria": [
        f"Not an arbitrage (1 point): the position loses if the deal fails ({f(fia1)} against a certainty "
        f"equivalent of {f(ce1)}); at the market's p its expected payoff equals the cost grown at the "
        "risk-free rate.",
        f"Private investor (1 point): one deal is a concentrated all-or-nothing bet; a failure costs about "
        f"{pc(-fall1, 1)} in three months.",
        "Fund (1 point): it beats the risk-free rate only if the true probability is above the implied one (the "
        "spread carries a risk premium) or if it picks deals well. Diversification alone does not create a return: "
        "a diversified set of fairly priced bets still earns only the risk-free rate.",
        "Fourth point: diversification over many independent deals makes the fund's return reliable, or naming the "
        "strong assumption that prices return to their levels before the rumours. Bonus: failures cluster in "
        "market crashes, so the risk is not fully diversifiable.",
    ],
}
SVAR["mk-deal-1:1:e"] = {"type": "tekst"}

OPPG["mk-deal-1"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Samme form som Mannesmann-eksemplet i forelesning 16 (54:58 til 1:22:12)",
    "body": d1_body, "parts": [d1_a, d1_b, d1_c, d1_d, d1_e],
}

# ======================================================================
# mk-deal-2 · H2025 E6-formen
# ======================================================================
nB2, nA2 = 5, 2                # 5 B-aksjer byttes mot 2 A-aksjer
ER2 = nA2 / nB2
PA0_2, PB0_2 = 72.00, 25.00
PA1_2, PB1_2 = 68.50, 26.50
rf2 = 0.04

tilbud2 = ER2 * PA1_2
premie2 = tilbud2 / PB0_2 - 1
tilbud2_gml = ER2 * PA0_2
premie2_gml = tilbud2_gml / PB0_2 - 1
kost2 = nB2 * PB1_2
short2 = nA2 * PA1_2
suk2 = short2 * (1 + rf2)
fia2 = suk2 - nA2 * PA0_2 + nB2 * PB0_2
ce2 = kost2 * (1 + rf2)
p2 = (ce2 - fia2) / (suk2 - fia2)
dA2 = PA1_2 / PA0_2 - 1
dB2 = PB1_2 / PB0_2 - 1

assert near(tilbud2, 27.40) and near(kost2, 132.50) and near(short2, 137.00)
assert near(suk2, 142.48) and near(fia2, 123.48) and near(ce2, 137.80)
assert near(p2 * suk2 + (1 - p2) * fia2, ce2, 1e-9)
assert dA2 < 0 < dB2 and PB0_2 < PB1_2 < tilbud2
p2_udisk = (kost2 - fia2) / (suk2 - fia2)                              # 132.50 i stedet for CE
p2_ingen = (kost2 - (short2 - nA2 * PA0_2 + nB2 * PB0_2)) / (nA2 * PA0_2 - nB2 * PB0_2)   # ingen rente
assert rel(p2_udisk, p2) > 0.05 and rel(p2_ingen, p2) > 0.01
As2 = (PA1_2 * (1 + rf2) - (1 - p2) * PA0_2) / p2
assert As2 < PA0_2                                   # markedet ser A tape på avtalen

d2_body = (
    "<p>Ostrander Media Inc. (A), a US film and television group, recently announced its intention to acquire "
    "the video-game developer Hartsell Games Inc. (B). The news came suddenly and there was no anticipation "
    "effect. The deal is expected to be completed or to fail in exactly 1 year from now. If the deal goes "
    f"through, every {nB2} shares of B will be exchanged for {nA2} shares of A. If the deal fails, prices will "
    "return to their original levels.</p>"
    f"<p>Share prices before the announcement were P<sub>A,0</sub> = ${f(PA0_2, 2)} and P<sub>B,0</sub> = "
    f"${f(PB0_2, 2)}. Immediately after the announcement the market incorporated the new information: "
    f"P<sub>A,1</sub> = ${f(PA1_2, 2)} and P<sub>B,1</sub> = ${f(PB1_2, 2)}. The one-year risk-free rate is "
    "r<sub>f</sub> = 4%.</p>"
)

d2_a = {
    "label": "a", "points": 2,
    "body": ("<p>What is A's offer worth per B share at the prices immediately after the announcement? What "
             "premium over B's price before the announcement is that, in percent?</p>"),
    "solution": (
        f"<p>Every {nB2} B shares become {nA2} A shares, so one B share becomes {nA2}/{nB2} = {f(ER2, 1)} A shares.</p>"
        f"<p>Offer value = {f(ER2, 1)} × ${f(PA1_2, 2)} = <b>${f(tilbud2, 2)}</b> per B share. Premium = "
        f"{f(tilbud2, 2)}/{f(PB0_2, 2)} − 1 = <b>{pc(premie2)}</b>.</p>"
        f"<p>B trades at ${f(PB1_2, 2)}, below the offer, because the deal may fail. Since A pays in shares, A's "
        f"fall from {f(PA0_2, 2)} to {f(PA1_2, 2)} has cut the offer from {f(ER2, 1)} × {f(PA0_2, 2)} = "
        f"${f(tilbud2_gml, 2)} (a {pc(premie2_gml)} premium) to ${f(tilbud2, 2)}.</p>"
    ),
    "criteria": [
        f"Exchange ratio per B share {nA2}/{nB2} = {f(ER2, 1)} A shares ({nB2}/{nA2} = 2.5 is the ratio turned upside down).",
        f"Offer value {f(ER2, 1)} × {f(PA1_2, 2)} = ${f(tilbud2, 2)} at the prices after the announcement and a "
        f"premium of {pc(premie2)} over ${f(PB0_2, 2)} (1 point each).",
        f"Using A's old price ({f(tilbud2_gml, 2)} and {pc(premie2_gml)}) gives the offer at the old prices, "
        "not at the prices after the announcement.",
    ],
}
SVAR["mk-deal-2:1:a"] = {"type": "tall", "tall": [
    t("Offer value per B share", tilbud2, "$ per share"),
    t("Premium over B's price before the announcement", premie2 * 100, "%"),
]}

d2_b = {
    "label": "b", "points": 10,
    "body": ("<p>Based on the market prices, calculate the probability of the deal being successfully completed "
             "as perceived by the market. (Hint: use a long-short strategy and invest the proceeds from the short "
             "sale at the risk-free rate.)</p>"),
    "solution": (
        "<p><b>Step 1. Build the position at the prices after the announcement.</b> The exchange ratio tells you "
        f"how to pair the legs: {nB2} B shares against {nA2} A shares.</p>"
        + tab(["Leg", "Action", "Cash flow today ($)"], [
            ["Long target", f"Buy {nB2} B shares at {f(PB1_2, 2)}", f"−{f(kost2, 2)}"],
            ["Short acquirer", f"Short-sell {nA2} A shares at {f(PA1_2, 2)}", f"+{f(short2, 2)}"],
            ["Risk-free", f"Invest the {f(short2, 2)} at 4%", f"−{f(short2, 2)}"],
            ["<b>Net outlay</b>", "", f"<b>−{f(kost2, 2)}</b>"],
        ])
        + f"<p><b>Step 2. The deal goes through.</b> The {nB2} B shares are converted into {nA2} A shares, which "
        f"close the short. Only the deposit is left: {f(short2, 2)} × 1.04 = <b>{f(suk2, 2)}</b>.</p>"
        f"<p><b>Step 3. The deal fails.</b> Prices return to 72.00 and 25.00. You buy back {nA2} A shares for "
        f"{f(nA2 * PA0_2, 2)} and sell {nB2} B shares for {f(nB2 * PB0_2, 2)}: {f(suk2, 2)} − "
        f"{f(nA2 * PA0_2, 2)} + {f(nB2 * PB0_2, 2)} = <b>{f(fia2, 2)}</b>.</p>"
        f"<p><b>Step 4. The certainty equivalent.</b> The strategy cost {f(kost2, 2)} today, so its expected "
        f"payoff in one year must equal {f(kost2, 2)} × 1.04 = <b>{f(ce2, 2)}</b>. Do not plug in "
        f"{f(kost2, 2)}.</p>"
        f"<p><b>Step 5. Solve.</b> {f(ce2, 2)} = p × {f(suk2, 2)} + (1 − p) × {f(fia2, 2)}<br>"
        f"p = ({f(ce2, 2)} − {f(fia2, 2)})/({f(suk2, 2)} − {f(fia2, 2)}) = {f(ce2 - fia2, 2)}/{f(suk2 - fia2, 2)} "
        f"= <b>{f(p2)} ({pc(p2)})</b></p>"
        f"<p><b>Check.</b> {f(p2, 6)} × {f(suk2, 2)} + {f(1 - p2, 6)} × {f(fia2, 2)} = {f(ce2, 2)} ✓. B at "
        f"{f(PB1_2, 2)} lies between its failure price {f(PB0_2, 2)} and the offer value {f(tilbud2, 2)}.</p>"
        f"<p><b>The traps.</b> Plugging in {f(kost2, 2)} instead of {f(ce2, 2)} gives {f(p2_udisk)}. Ignoring the "
        f"interest altogether (no deposit growth and no certainty equivalent) gives {f(p2_ingen)}.</p>"
    ),
    "criteria": [
        f"Long {nB2} B and short {nA2} A, because the exchange ratio is {nB2} for {nA2}; the short-sale proceeds "
        f"of {f(short2, 2)} are invested at the risk-free rate. Other consistent constructions are accepted "
        "(for example 1 B against 0.4 A).",
        f"Success payoff {f(short2, 2)} × 1.04 = {f(suk2, 2)}: the converted B shares close the short.",
        f"Failure payoff {f(suk2, 2)} − {f(nA2 * PA0_2, 2)} + {f(nB2 * PB0_2, 2)} = {f(fia2, 2)}, at the prices "
        "before the announcement.",
        f"Certainty equivalent {f(kost2, 2)} × 1.04 = {f(ce2, 2)}. Plugging in {f(kost2, 2)} gives "
        f"{f(p2_udisk)}, the error Kurbatov's key calls out.",
        f"p = {f(ce2 - fia2, 2)}/{f(suk2 - fia2, 2)} = {f(p2)}. Reasonable approximations are fine.",
        "This part is worth 10 of the 20 points, so show the whole construction: the position, both payoffs, "
        "the certainty equivalent and the equation.",
    ],
}
SVAR["mk-deal-2:1:b"] = {"type": "tall", "tall": [
    t("Probability of completion", p2 * 100, "%", tol=0.005),
], "merknad": (f"Stram toleranse (0,5 %): {f(kost2, 2)} i stedet for sikkerhetsekvivalenten gir {f(p2_udisk)} og "
               f"ingen rente i det hele tatt gir {f(p2_ingen)}; begge avvises.")}

d2_c = {
    "label": "c", "points": 4,
    "body": ("<p>Based on the market's reaction to the announcement, what could be the reason for this deal? "
             "(There can be several answers: choose one reason (not synergies!) and explain it briefly in "
             "2–3 sentences.)</p>"),
    "solution": (
        f"<p><b>Read the reaction first.</b> A fell from {f(PA0_2, 2)} to {f(PA1_2, 2)} ({pc(dA2)}) and B rose from "
        f"{f(PB0_2, 2)} to {f(PB1_2, 2)} (+{pc(dB2)}). The market sees the deal as bad for A's shareholders and "
        "good for B's: value moves from A to B.</p>"
        "<p><b>Model answer (empire building).</b> Ostrander's CEO may want to turn a film and television group "
        "into a larger entertainment group and buy a game developer for size and prestige rather than for value, "
        "so A pays more for B than B is worth to A. B's shareholders collect the premium and B may gain access to "
        "A's distribution and marketing, which is why B rises while A falls. This is an agency problem between "
        "A's managers and A's shareholders.</p>"
        "<p><b>Also accepted.</b> Any reason other than synergies that fits A down and B up, as Kurbatov's H2025 "
        "key puts it: «Plenty of possible reasons». For example managerial hubris or overconfidence and the "
        "winner's curse; diversification that A's shareholders could get more cheaply by buying game shares "
        "themselves; paying with A shares the managers think are overvalued, which the market reads as bad news "
        "about A; coinsurance, where the merger makes A's debt safer at the expense of A's shareholders; B's "
        "managers being weak, so that B gains from any new owner. Not accepted: synergies, «value creation» "
        "without a mechanism, or tax losses, which are erased on a change of owner.</p>"
    ),
    "criteria": [
        "Uses the reaction as evidence: A down and B up, so the market sees the deal as inefficient for A and "
        "B's shareholders extract the benefits.",
        "One reason other than synergies, explained in 2–3 sentences, that fits A down and B up. Any such reason "
        "is accepted (the H2025 key: «Plenty of possible reasons»): empire building, hubris or overconfidence, "
        "the winner's curse, unnecessary diversification, paying with overvalued A shares, coinsurance, or B "
        "gaining access to a larger firm's resources.",
        "Not accepted: synergies, «value creation» alone or tax losses.",
        "Keep it to 2–3 sentences; length is not rewarded.",
    ],
}
SVAR["mk-deal-2:1:c"] = {"type": "tekst"}

d2_d = {
    "label": "d", "points": 4,
    "body": ("<p>You are a shareholder of A. A's largest shareholders force a vote on whether A should proceed "
             "with the deal. Based on the reason you chose in (c), how would you vote? How will the market react "
             "to the result if most other shareholders vote like you? Briefly explain.</p>"),
    "solution": (
        "<p><b>Minimal accepted answer.</b> With the reason in (c) the deal moves value from A's shareholders to "
        "B's, so as a shareholder of A I vote against. If most others vote the same way, the deal is blocked and "
        f"prices return towards their levels before the announcement: A up towards ${f(PA0_2, 2)} and B down "
        f"towards ${f(PB0_2, 2)}.</p>"
        "<p><b>For full marks.</b> The reversion may be incomplete. An entrenched management may try to go ahead "
        "anyway, so a small chance of completion survives. The bid may also have revealed that B is worth more "
        f"than the market thought, or attract another bidder, so B can stay above ${f(PB0_2, 2)}.</p>"
        "<p><b>Consistency.</b> The vote must follow from the reason in (c). If you argued there that A's fall was "
        "a temporary overreaction, a vote in favour with the matching market reaction is also defensible.</p>"
    ),
    "criteria": [
        "Votes against and gives the reason: the deal is inefficient for A's shareholders, who you are.",
        f"Answers the second question too: prices revert towards their original levels (A up towards "
        f"{f(PA0_2, 2)}, B down towards {f(PB0_2, 2)}). This is the minimal accepted answer.",
        "The vote must be consistent with the reason in (c).",
        "Bonus: an entrenched manager may proceed anyway, so prices do not fully revert; the bid may have "
        "revealed that B was undervalued, so B stays above its old price.",
    ],
}
SVAR["mk-deal-2:1:d"] = {"type": "tekst"}

OPPG["mk-deal-2"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Samme form som H2025 E6",
    "body": d2_body, "parts": [d2_a, d2_b, d2_c, d2_d],
}

# ======================================================================
# mk-deal-3 · selvfinansiert posisjon og utsettelse
# ======================================================================
nT3, nA3 = 2, 5                # 2 T-aksjer byttes mot 5 A-aksjer
ER3 = nA3 / nT3                # 2.5
PA0_3, PT0_3 = 13.80, 30.00
PA1_3, PT1_3 = 14.60, 35.10
rf3, T3 = 0.045, 0.5
T3_ny = T3 + 1

tilbud3 = ER3 * PA1_3
spread3 = tilbud3 - PT1_3
spread3_pc = spread3 / PT1_3
fak3 = (1 + rf3) ** T3
dep3 = spread3
suk3 = dep3 * fak3
tap3 = ER3 * PA0_3 - PT0_3
fia3 = suk3 - tap3
p3 = -fia3 / (suk3 - fia3)
# kollegaen med egne penger
suk3k = tilbud3 * fak3
fia3k = suk3k - tap3
ce3k = PT1_3 * fak3
p3k = (ce3k - fia3k) / (suk3k - fia3k)
# utsettelse med uendrede kurser
fak3_ny = (1 + rf3) ** T3_ny
suk3_ny = dep3 * fak3_ny
fia3_ny = suk3_ny - tap3
p3_ny = -fia3_ny / (suk3_ny - fia3_ny)
spread3_ny = (1 - p3) * tap3 / fak3_ny       # samme p, nytt spread

assert near(tilbud3, 36.50) and near(spread3, 1.40) and near(tap3, 4.50)
assert fia3 < 0 < suk3 and near(suk3 - fia3, tap3)
assert near(p3 * suk3 + (1 - p3) * fia3, 0, 1e-12)            # selvfinansiert: forventet 0
assert near(p3k, p3, 1e-12)                                     # samme svar med egne penger
assert near(p3k * suk3k + (1 - p3k) * fia3k, ce3k, 1e-9)
assert p3_ny < p3                                               # utsettelse: lavere p ved samme kurser
assert spread3_ny < spread3                                     # samme p: spreadet krymper litt
assert near(ce3k - PT1_3 * fak3, 0) and near(suk3k - suk3, PT1_3 * fak3, 1e-9)  # kollega = din + innskudd
p3_aar = 1 - spread3 * (1 + rf3) / tap3
p3_ingen = 1 - spread3 / tap3
p3_enkel = 1 - spread3 * (1 + rf3 * T3) / tap3
assert rel(p3_aar, p3) > 0.008 and rel(p3_ingen, p3) > 0.008 and rel(p3_enkel, p3) < 0.001
As3 = (PA1_3 * fak3 - (1 - p3) * PA0_3) / p3
assert As3 > PA0_3

RES3_s, RES3_f = 1.50, -3.00              # reserveverdier i (c)
p3_res = -RES3_f / (RES3_s - RES3_f)
assert rel(p3_res, p3) > 0.02 and not near(RES3_s, suk3, 0.05)
p3k_udisk = (PT1_3 - fia3k) / tap3
assert rel(p3k_udisk, p3k) > 0.05

d3_body = (
    "<p>Carrowmore Insurance plc (A) has made a surprise offer for Ellisford Assurance plc (T): if the deal goes "
    f"through, every {nT3} T shares will be exchanged for {nA3} A shares. The deal will be completed or fail in "
    "exactly six months; if it fails, both prices return to their pre-announcement levels.</p>"
    f"<p>Before the announcement P<sub>A,0</sub> = £{f(PA0_3, 2)} and P<sub>T,0</sub> = £{f(PT0_3, 2)}; just "
    f"after it P<sub>A,1</sub> = £{f(PA1_3, 2)} and P<sub>T,1</sub> = £{f(PT1_3, 2)}. The risk-free rate is "
    "4.5% a year, compounded annually. Short selling is allowed and fractions of shares are fine. Use 4 decimal "
    "places.</p>"
)

d3_a = {
    "label": "a", "points": 3,
    "body": ("<p>What is the offer worth per T share at today's prices? What is the spread to T's price, in £ "
             "and in percent of T's price?</p>"),
    "solution": (
        f"<p>One T share becomes {nA3}/{nT3} = {f(ER3, 1)} A shares.</p>"
        f"<p>Offer value = {f(ER3, 1)} × £{f(PA1_3, 2)} = <b>£{f(tilbud3, 2)}</b> per T share.<br>"
        f"Spread = {f(tilbud3, 2)} − {f(PT1_3, 2)} = <b>£{f(spread3, 2)}</b>, or {f(spread3, 2)}/{f(PT1_3, 2)} = "
        f"<b>{pc(spread3_pc)}</b> of T's price.</p>"
        "<p>The spread is what a buyer of T earns over six months if the deal goes through, before interest. It "
        "is the market's compensation for the risk that the deal fails.</p>"
    ),
    "criteria": [
        f"Exchange ratio {nA3}/{nT3} = {f(ER3, 1)} A shares per T share; {nT3}/{nA3} is the ratio turned upside down.",
        f"Offer value {f(ER3, 1)} × {f(PA1_3, 2)} = £{f(tilbud3, 2)} at today's A price.",
        f"Spread £{f(spread3, 2)} and {pc(spread3_pc)} of T's price, as the question asks (in percent of the "
        f"offer it would be {pc(spread3 / tilbud3)}).",
    ],
}
SVAR["mk-deal-3:1:a"] = {"type": "tall", "tall": [
    t("Offer value per T share", tilbud3, "£ per share"),
    t("Spread in £", spread3, "£"),
    t("Spread in percent of T's price", spread3_pc * 100, "%"),
]}

d3_b = {
    "label": "b", "points": 6,
    "body": ("<p>You trade without money of your own: for each T share you buy, short-sell the A shares it "
             "converts into, pay for T with the proceeds and invest the rest at the risk-free rate. How much do "
             "you invest? What is the position worth in six months if the deal goes through? If it fails?</p>"),
    "solution": (
        "<p><b>Step 1. The position today.</b></p>"
        + tab(["Leg", "Action", "Cash flow today (£)"], [
            ["Short acquirer", f"Short-sell {f(ER3, 1)} A shares at {f(PA1_3, 2)}", f"+{f(tilbud3, 2)}"],
            ["Long target", f"Buy 1 T share at {f(PT1_3, 2)}", f"−{f(PT1_3, 2)}"],
            ["Risk-free", "Invest what is left", f"<b>−{f(dep3, 2)}</b>"],
            ["<b>Net cash flow</b>", "", "<b>0</b>"],
        ])
        + f"<p>You invest <b>£{f(dep3, 2)}</b> per T share, which is the spread from (a). Nothing comes out of your "
        "own pocket.</p>"
        f"<p><b>Step 2. Six months of interest.</b> T = 0.5: 1.045<sup>0.5</sup> = {f(fak3, 6)}. The deposit grows "
        f"to {f(dep3, 2)} × {f(fak3, 6)} = {f(suk3)}.</p>"
        f"<p><b>Step 3. The deal goes through.</b> The T share becomes {f(ER3, 1)} A shares, which close the short. "
        f"Only the deposit is left: <b>£{f(suk3)}</b>.</p>"
        f"<p><b>Step 4. The deal fails.</b> You sell the T share at {f(PT0_3, 2)} and buy back {f(ER3, 1)} A shares at "
        f"{f(PA0_3, 2)}, which costs {f(ER3 * PA0_3, 2)}: {f(suk3)} + {f(PT0_3, 2)} − {f(ER3 * PA0_3, 2)} = "
        f"<b>{f(fia3)}</b>, a loss of £{f(-fia3)}. You owe more on the short than the T share and the deposit "
        "are worth.</p>"
        f"<p><b>Check.</b> The two payoffs differ by {f(ER3 * PA0_3, 2)} − {f(PT0_3, 2)} = {f(tap3, 2)}, the loss "
        "on the shares if the deal fails. A position that costs nothing must be able to lose money, or it would be "
        "an arbitrage.</p>"
    ),
    "criteria": [
        f"Short {f(ER3, 1)} A for each T, T paid with the proceeds: {f(tilbud3, 2)} − {f(PT1_3, 2)} = "
        f"£{f(dep3, 2)} invested at the risk-free rate and a net cash flow of 0 today.",
        f"Six months is T = 0.5: 1.045^0.5 = {f(fak3, 6)}, not 1.045.",
        f"Success: {f(dep3, 2)} × {f(fak3, 6)} = £{f(suk3)}, since the converted T share closes the short.",
        f"Failure: {f(suk3)} + {f(PT0_3, 2)} − {f(ER3, 1)} × {f(PA0_3, 2)} = {f(fia3)} (£), a loss, at the "
        "prices before the announcement.",
        "2 points for each number; the construction must be shown.",
    ],
}
SVAR["mk-deal-3:1:b"] = {"type": "tall", "tall": [
    t("Amount invested at the risk-free rate", dep3, "£"),
    t("Value if the deal goes through", suk3, "£", tol=0.005),
    t("Value if the deal fails (negative if a loss)", fia3, "£", tol=0.005),
], "merknad": (f"Helt år (1.045) gir {f(dep3 * 1.045)} og {f(dep3 * 1.045 - tap3)}; uten rente {f(dep3)} og "
               f"{f(dep3 - tap3)}. Alle avvises med 0,5 %. Enkel rente godtas. Feltnavnet sier at et tap "
               "føres med minus.")}
assert rel(dep3 * 1.045, suk3) > 0.005 and rel(dep3 * 1.045 - tap3, fia3) > 0.005
assert rel(dep3, suk3) > 0.005 and rel(dep3 - tap3, fia3) > 0.005

d3_c = {
    "label": "c", "points": 4,
    "body": (f"<p>What probability of completion do today's prices imply? (If you could not solve (b), use "
             f"£{f(RES3_s, 2)} for success and −£{f(-RES3_f, 2)} for failure.)</p>"),
    "solution": (
        "<p><b>Step 1. What the price must satisfy.</b> The position costs nothing today. If the market prices it "
        "fairly, its expected payoff in six months must therefore be zero: the certainty equivalent of a cost of "
        "0 is 0.</p>"
        f"<p><b>Step 2. Solve.</b> 0 = p × {f(suk3)} + (1 − p) × ({f(fia3)})<br>"
        f"p = {f(-fia3)}/({f(suk3)} + {f(-fia3)}) = {f(-fia3)}/{f(suk3 - fia3)} = <b>{f(p3)} ({pc(p3)})</b></p>"
        f"<p><b>Check.</b> {f(p3, 6)} × {f(suk3, 6)} − {f(1 - p3, 6)} × {f(-fia3, 6)} = "
        f"{f(p3 * suk3 + (1 - p3) * fia3, 4)} ✓.</p>"
        f"<p><b>With the values given in the question.</b> p = {f(-RES3_f, 2)}/({f(RES3_s, 2)} + {f(-RES3_f, 2)}) "
        f"= {f(p3_res)} ({pc(p3_res)}), full marks if the method is right.</p>"
        f"<p><b>The traps.</b> No interest at all gives {f(p3_ingen)}. A full year of interest (1.045) gives "
        f"{f(p3_aar)}: wrong, but it is the error already penalised in (b). Simple interest, 1 + 0.045 × 0.5, gives "
        f"{f(p3_enkel)}, close enough.</p>"
    ),
    "criteria": [
        "The position costs 0 today, so its expected payoff must be 0 (no certainty equivalent to compute).",
        f"0 = p × {f(suk3)} − (1 − p) × {f(-fia3)}, so p = {f(-fia3)}/{f(suk3 - fia3)} = {f(p3)} ({pc(p3)}).",
        f"Follow-through: with the values given in the question, p = {f(p3_res)}. A student who used 1.045 for six "
        f"months in (b) gets {f(p3_aar)} here and loses the points for the factor only once, in (b).",
        "Reasonable rounding is fine; show the equation.",
    ],
}
SVAR["mk-deal-3:1:c"] = {"type": "tall", "tall": [
    t("Probability of completion", p3 * 100, "%", tol=0.005, alt=[p3_res * 100, p3_aar * 100]),
], "merknad": (f"Toleranse 0,5 %: ingen rente ({f(p3_ingen)}) avvises, enkel rente ({f(p3_enkel)}) godtas. alt: "
               f"reserveverdiene gir {f(p3_res)}, helt år fra (b) gir {f(p3_aar)} (følgefeil, straffet i (b)).")}

d3_d = {
    "label": "d", "points": 3,
    "body": ("<p>A colleague instead pays for one T share with her own money, short-sells the same A shares and "
             "invests all the proceeds at the risk-free rate. What probability does her position imply? "
             "Compare with (c) in one sentence.</p>"),
    "solution": (
        f"<p><b>Her payoffs.</b> She deposits {f(tilbud3, 2)}, which grows to {f(tilbud3, 2)} × {f(fak3, 6)} = "
        f"{f(suk3k)} (success). If the deal fails: {f(suk3k)} + {f(PT0_3, 2)} − {f(ER3 * PA0_3, 2)} = "
        f"{f(fia3k)}.</p>"
        f"<p><b>Her certainty equivalent.</b> She paid {f(PT1_3, 2)}: {f(PT1_3, 2)} × {f(fak3, 6)} = {f(ce3k)}.</p>"
        f"<p>p = ({f(ce3k)} − {f(fia3k)})/({f(suk3k)} − {f(fia3k)}) = {f(ce3k - fia3k)}/{f(suk3k - fia3k)} = "
        f"<b>{f(p3k)}</b></p>"
        f"<p><b>Comparison.</b> The same probability as in (c). Her position is yours plus a risk-free deposit of "
        f"£{f(PT1_3, 2)}, which pays {f(ce3k)} whether or not the deal goes through, so it adds nothing about the "
        "deal. Both ways are equally correct, as the lecture says about this variant (recording 16, 1:21:33).</p>"
    ),
    "criteria": [
        f"Her payoffs {f(suk3k)} and {f(fia3k)}, certainty equivalent {f(ce3k)} and p = {f(p3k)} (2 points).",
        f"Explanation (1 point): her position is yours plus a risk-free deposit of {f(PT1_3, 2)} that pays the "
        "same in both states, so the implied probability cannot change.",
        f"Leaving out the certainty equivalent (plugging in {f(PT1_3, 2)}) gives {f(p3k_udisk)}, which is wrong. "
        f"Using 1.045 again gives {f(p3_aar)}: the same factor error as in (b), penalised only there.",
    ],
}
SVAR["mk-deal-3:1:d"] = {
    "type": "blandet",
    "tall": [t("Probability of completion, colleague's position", p3k * 100, "%", tol=0.005, alt=[p3_aar * 100])],
    "tallPoeng": 2,
    "tekstLedd": "Compare with (c) in one sentence.",
    "merknad": f"alt {f(p3_aar)}: samme faktorfeil (1.045) som i (b), straffet bare der.",
}

d3_e = {
    "label": "e", "points": 4,
    "body": ("<p>Just after you trade, the regulator says it needs one more year: the deal will be decided 18 months "
             "from today. How would you treat this? If prices did not move, "
             "would the implied probability be higher or lower than in (c)? Why? Why would prices "
             "probably move anyway? (3–4 sentences, no calculation needed.)</p>"),
    "solution": (
        f"<p><b>Model answer.</b> The position and the payoffs on failure stay the same, but the deposit now grows "
        f"for 1.5 years instead of 0.5, so I use 1.045<sup>1.5</sup> = {f(fak3_ny, 6)} in place of "
        f"1.045<sup>0.5</sup>. With unchanged prices the implied probability is lower: the spread earns interest "
        "for longer, so the same spread can pay for a larger expected loss, while the loss on failure "
        f"({f(tap3, 2)}) is fixed. The prices would probably move anyway, because a delay is news: more can go wrong "
        "over 18 months (the regulator may block the deal, a rival may bid, A's shareholders or financing may turn), "
        "so the market is likely to lower p and T's price would fall relative to the offer.</p>"
        f"<p><b>The numbers, not required.</b> Unchanged prices: success {f(dep3, 2)} × {f(fak3_ny, 6)} = "
        f"{f(suk3_ny)}, failure {f(suk3_ny)} − {f(tap3, 2)} = −{f(-fia3_ny)}, so p = {f(-fia3_ny)}/{f(tap3)} = "
        f"{f(p3_ny)}, down from {f(p3)}. With p unchanged the spread would instead narrow slightly, to "
        f"(1 − {f(p3)}) × {f(tap3, 2)}/{f(fak3_ny, 6)} = {f(spread3_ny)}: in a share offer both legs are "
        "discounted, so time value alone does not widen the spread. It widens if the market lowers p.</p>"
        "<p><b>Bonus.</b> The assumption that prices return to their levels before the announcement is weaker after "
        "18 months, since both firms keep operating and news arrives.</p>"
        "<p>The lecturer raised this tail in the wrap-up (recording 18, 5:29): «What if we can delay this M&amp;A "
        "by one year? How would you treat it?», with an intuition-based answer in mind.</p>"
    ),
    "criteria": [
        "Treatment (1 point): same position and failure prices, but the money grows for 1.5 years: "
        f"1.045^1.5 = {f(fak3_ny, 6)} instead of 1.045^0.5.",
        f"Direction (1 point): with unchanged prices p is lower (about {f(p3_ny)}). Saying that p rises because "
        "there is more time to complete the deal is wrong.",
        "Reason (1 point): the spread earns interest for longer, so it covers a larger expected loss, while the "
        "loss on failure is fixed.",
        "Why prices move (1 point): the delay is news and more can go wrong, so the market is likely to lower p "
        "and T's price falls relative to the offer. Bonus: the reversion to the old prices is less credible after "
        "18 months.",
    ],
}
SVAR["mk-deal-3:1:e"] = {"type": "tekst"}

OPPG["mk-deal-3"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Mannesmann-formen med variantene Kurbatov nevnte i forelesning 16 (1:14:18) og i wrap-up (5:29)",
    "body": d3_body, "parts": [d3_a, d3_b, d3_c, d3_d, d3_e],
}

# ======================================================================
# mk-governance-1 · eierens verktøykasse (forelesning 17, 1:18:44)
# ======================================================================
eie1 = 0.35
stemmer1 = eie1 * 10 / (eie1 * 10 + (1 - eie1))
assert 0.84 < stemmer1 < 0.85

g1_body = (
    "<p>You founded and own all of Vantrell Health Software, which makes booking systems for hospitals. Next year "
    "Vantrell will list on a US exchange: you will keep 35% of the shares and the rest will be widely held. You "
    "will hand the CEO job to an outsider and stay on the board.</p>"
)
g1_a = {
    "label": "a", "points": 6,
    "body": ("<p>Select three things you would put in the new CEO's contract or in the way the company monitors "
             "the CEO. Elaborate each in about three sentences: how it makes the CEO act in the shareholders' "
             "interest and its main drawback (2 points each). Leave share classes out; they come in (b).</p>"),
    "solution": (
        "<p>Three things, each with how it works and its drawback. As a 35% owner you capture 35% of any gain from "
        "monitoring, so free riding is not your problem.</p>"
        "<p><b>1. An independent board.</b> Most of the 7 to 11 directors have no ties to the CEO, the chair is "
        "not the CEO and independent committees handle audit, pay and nominations. Such directors can question "
        "the CEO, set the pay and fire the CEO without being the CEO's friends; the lecture calls this «one of the "
        "first check marks» (recording 17, 1:19:39). Drawback: outsiders know less than the CEO and depend on the "
        "CEO's own information, so they can miss problems or block good projects.</p>"
        "<p><b>2. Long-term equity pay with a clawback.</b> Much of the pay comes as restricted shares that vest "
        "over four to five years, with bonuses that can be taken back if results are restated. The CEO's wealth "
        "then rises and falls with the long-run share value, like yours. Drawback: the share price also moves with "
        "the market and luck, so the CEO bears risk outside the CEO's control and must be paid more for it.</p>"
        "<p><b>3. Your own monitoring, written into the bylaws.</b> Proxy access lets large shareholders put "
        "director candidates on the company's ballot; an annual investor meeting lets you and the institutions "
        "question the CEO. The CEO knows that the owners can replace directors, while the institutions get a "
        "reason to vote. Drawback: monitoring that is too tight makes the CEO passive, doing only the safest "
        "things (recording 17, 1:17:10).</p>"
        "<p><b>Other things that score.</b> Options, with their own drawback (they reward excessive risk); a bonus "
        "on targets with clauses against gaming (EPS raised by a share buyback does not count); a golden parachute "
        "if Vantrell needs the CEO to take R&amp;D risk; transparency and regular reporting; limits on perks such "
        "as private use of a company jet; the CEO on the board but never as chair. «Make the shareholders vote» "
        "earns the points only with a how: investor meetings, communication, proxy access or the institutions, "
        "since small owners cannot be forced (recording 17, 1:20:22 to 1:21:51).</p>"
    ),
    "criteria": [
        "Three distinct things, about three sentences each, 2 points each: 1 for how it makes the CEO act in the "
        "shareholders' interest and 1 for a real drawback. A thing without a drawback earns at most 1 of 2.",
        "As in Kurbatov's H2025 key for the same kind of question: «Any reasonable action with explanation should "
        "be accepted». Examples (recording 17): an independent board and its committees, the CEO not as chair, "
        "restricted shares, options, clawbacks, bonuses with clauses against EPS gaming, a golden parachute for "
        "R&D risk, transparency and reporting, limits on perks, proxy access in the bylaws, special meetings, "
        "investor meetings with the owners.",
        "Counting: two versions of the same tool with the same drawback count once. Restricted shares and options "
        "count as two things if the drawbacks given differ (for example market luck against excessive risk-taking). "
        "Share classes earn nothing here, since (b) asks for them.",
        "«Make the shareholders vote» counts only with a concrete how; without one it earns at most 1 of 2.",
        "Board size: an argument with both sides is accepted (about 7 to 11 directors). «A smaller board works "
        "better» alone is not accepted.",
    ],
}
SVAR["mk-governance-1:1:a"] = {"type": "tekst"}

g1_b = {
    "label": "b", "points": 4,
    "body": ("<p>Your bank suggests two share classes: you keep B shares with ten votes each and the new investors "
             "buy A shares with one vote each. Give one argument for and one against this structure, seen from "
             "the new outside shareholders (2–3 sentences each, 2 points each).</p>"),
    "solution": (
        f"<p><b>For.</b> The structure lets you sell 65% of the cash flows and still control the firm (about "
        f"{pc(stemmer1, 0)} of the votes), so the long-term plan is protected against short-term pressure and "
        "hostile bids. The lecture gives the Ford family as the example: it raised a lot of capital and kept "
        "control with a small share of the equity. The lecture calls dual-class shares «not a completely "
        "stupid measure» (recording 17, 1:19:49).</p>"
        f"<p><b>Against.</b> Votes are separated from cash-flow rights: you carry 35% of the cost of a bad decision "
        f"but hold about {pc(stemmer1, 0)} of the votes. The outside shareholders cannot replace the board, win a "
        "proxy fight or sell to a hostile bidder, so a poor CEO you back or your private benefits cannot be "
        "stopped: the firm is entrenched.</p>"
        "<p><b>Also accepted.</b> For: investors buy knowing the terms, so the price they pay already reflects "
        "them; the structure protects the people and culture a software firm depends on. Against: the A shares "
        "are likely to trade at a discount; the control lasts after the founder's skill or interest fades, unless "
        "the B shares convert to one vote after some years (a sunset).</p>"
    ),
    "criteria": [
        "For (2 points): control and the long-term plan are protected from short-term pressure and hostile bids "
        "while the firm raises capital. Noting that investors buy knowing the terms is optional.",
        "Against (2 points): votes are separated from cash-flow rights, so the founder bears only part of the cost "
        "of bad decisions and the outside owners cannot use their vote, proxy fights or the takeover market: "
        "entrenchment.",
        "Seen from the outside shareholders, as the question asks. «It is good for the founder» alone earns at "
        "most 1 of 2.",
        "Bonus: a sunset clause, or noting that the votes are about 84% for 35% of the equity.",
    ],
}
SVAR["mk-governance-1:1:b"] = {"type": "tekst"}

OPPG["mk-governance-1"] = {
    "n": 1, "title": "Governance", "points": 10, "topic": "Corporate governance", "chapters": [27],
    "merke": "Samme form som eierspørsmålet i forelesning 17 (1:18:44): «select three things and elaborate»",
    "body": g1_body, "parts": [g1_a, g1_b],
}

# ======================================================================
# mk-governance-2 · lønn, KPI-er og kortsiktighet
# ======================================================================
g2_body = (
    "<p>Aldwyn Aero Engines Inc., a US-listed maker of aircraft engines with dispersed ownership, is developing an "
    "engine that will burn 20% less fuel. The programme will take eight years and may fail. The board proposes "
    "this pay package for a new CEO:</p>"
    "<ol><li>an annual cash bonus of up to 100% of salary if earnings per share (EPS) grow by at least 8% in the "
    "year;</li><li>an annual bonus of up to 50% of salary tied to the company's score from an independent ESG "
    "rating agency;</li><li>a golden parachute: three years' pay if the CEO is fired.</li></ol>"
    "<p>For each element, explain in 2–3 sentences what it encourages the CEO to do and how it can backfire or be "
    "abused (3 points each). Then say in one sentence which element you would change first as a long-term "
    "shareholder and how (1 point).</p>"
)
g2_sol = (
    "<p><b>1. EPS bonus.</b> It pushes the CEO to raise earnings every year, which is simple to measure and tied "
    "to profits. But it invites short-termism: the CEO can lift EPS mechanically with a share buyback that cuts "
    "the number of shares, even an inefficient one, or cut spending on the eight-year engine programme to raise "
    "this year's earnings. The lecture warns that a CEO will «do everything in their power to achieve this bonus "
    "and nothing else» (recording 18, 1:13:49).</p>"
    "<p><b>2. ESG bonus.</b> It rewards real changes the rating agency can see and here points the same way as "
    "the business, since an engine that burns less fuel is both greener and cheaper for airlines to run. It "
    "backfires because ratings are noisy and can be raised by reporting and box-ticking. Pay for a score that is "
    "not tied to value can also make the CEO spend shareholders' money on what the agency checks.</p>"
    "<p><b>3. Golden parachute.</b> It protects the CEO if a risky but valuable programme fails, so the CEO does "
    "not avoid the R&amp;D risk the engine needs; the lecture recommends it for exactly this kind of firm "
    "(recording 17, 16:18). It backfires because it rewards failure: the CEO is paid even after poor effort or "
    "reckless bets. Three years' pay also makes it costly for the board to fire the CEO or for a bidder to take "
    "over, which protects a weak CEO.</p>"
    "<p><b>Change first.</b> The EPS bonus, since it is the easiest to abuse and works against an eight-year "
    "programme: measure performance over several years, exclude the effect of buybacks and pay the bonus in "
    "restricted shares. Any other choice with a reason is accepted.</p>"
    "<p><b>Also accepted.</b> For 1: managing accruals or delaying maintenance. For 2: an ESG score is much harder "
    "to game than EPS, since raising a governance score means actually improving governance (recording 17, "
    "38:23); a score built for other stakeholders can conflict with shareholder value, so whose interest is the "
    "CEO serving? For 3: a parachute only on a takeover, or one capped or tied to the programme's milestones, "
    "limits the abuse.</p>"
)
g2_crit = [
    "3 points per element: 1 for what it encourages and 2 for how it backfires or is abused, with the mechanism. "
    "A label alone («short-termism», «moral hazard») earns at most 1 of the 2.",
    "EPS: a share buyback raises EPS mechanically by cutting the number of shares; cutting R&D or maintenance "
    "lifts this year's earnings at the cost of the engine programme.",
    "ESG: rewards real change and here fits the fuel goal; it backfires through noisy ratings, box-ticking or "
    "spending at the shareholders' expense. Saying it is harder to game than EPS is optional.",
    "Golden parachute: encourages the risk the programme needs; backfires by rewarding failure or low effort and "
    "by making it costly to fire the CEO or to take the firm over.",
    "The last point: one element to change first, with how. The EPS bonus with a multi-year target, no credit "
    "for buybacks or pay in restricted shares is the natural answer, but any reasoned choice earns the point.",
]
SVAR["mk-governance-2:1:"] = {"type": "tekst"}

OPPG["mk-governance-2"] = {
    "n": 1, "title": "Governance", "points": 10, "topic": "Corporate governance", "chapters": [27],
    "merke": "Samme form som kontraktsspørsmålet i forelesning 17 (35:23): hvordan lønnen styrer CEO-en",
    "body": g2_body, "solution": g2_sol, "criteria": g2_crit,
}

# ======================================================================
# mk-governance-3 · forsvarstiltak og forskansning
# ======================================================================
terskel3 = 0.15
etter3 = terskel3 / (1 + (1 - terskel3))
assert near(etter3, 0.15 / 1.85) and 0.08 < etter3 < 0.082

g3_body = (
    "<p>Two US-listed firms adopt the same poison pill: if anyone buys over 15% without board approval, all other "
    "shareholders get one new share per share.</p>"
    "<ul><li><b>Orrin Fusion</b> is in year six of a nine-year plan to build a fusion plant. Its losses are as "
    "planned and reported quarterly; most owners are long-term pension funds. After a hedge fund pushing for quick "
    "payouts began buying, 78% of votes approved the board's pill.</li>"
    "<li><b>Mallory Home Goods</b> has lagged its peers for five years. Its CEO chairs a board with five executives "
    "among nine directors. The board adopted the pill overnight without a vote, two days after a private equity "
    "firm disclosed a 9% stake.</li></ul>"
)
g3_a = {
    "label": "a", "points": 2,
    "body": "<p>How does the pill stop a hostile bidder? (2–3 sentences)</p>",
    "solution": (
        "<p>Once a bidder crosses 15%, every other shareholder gets one new share per share, so the number of shares "
        f"nearly doubles while the bidder's stake does not: 15% becomes 15/(100 + 85) = {pc(etter3, 1)}. Much "
        "of the money it paid for its shares is lost to the other owners. Buying control on the market becomes "
        "far too expensive, so the bidder has to negotiate with the board, which can withdraw the pill; in effect "
        "the board gets a veto over any takeover.</p>"
    ),
    "criteria": [
        f"Mechanism (1 point): crossing 15% triggers new shares for everyone except the bidder, which dilutes the "
        f"bidder's stake (to about {pc(etter3, 0)}) and its value.",
        "Consequence (1 point): a takeover without the board's consent becomes too costly, so the bidder must "
        "negotiate with the board, which can remove the pill.",
        "Kurbatov's words fit: the pill forces the bidder «to the table of negotiations» (recording 17, 30:13).",
    ],
}
SVAR["mk-governance-3:1:a"] = {"type": "tekst"}

g3_b = {
    "label": "b", "points": 6,
    "body": ("<p>For each firm, is the pill more likely to protect shareholder value or to entrench the managers? "
             "(2–3 sentences and 3 points per firm)</p>"),
    "solution": (
        "<p><b>Orrin: more likely to protect the shareholders' value.</b> The losses are planned and reported, so "
        "they do not signal poor management; a bidder could buy in year six before the plant earns anything and cut "
        "the programme or the research team just before it pays off. The owners themselves approved the pill, the "
        "firm is transparent and the owners are stable and long-term, which is when the lecture says entrenchment "
        "can be positive: it preserves the vision and the human capital (recording 17, 1:08:35 to 1:10:54). The "
        "cost is weaker outside monitoring, so the board and the owners must watch the CEO more closely.</p>"
        "<p><b>Mallory: more likely to entrench the managers.</b> Five years of lagging peers suggests poor "
        "management, which is exactly what a takeover would discipline by putting in a better team. The board is "
        "captive (the CEO chairs it and a majority are insiders) and it adopted the pill overnight without asking "
        "the owners, two days after a bidder appeared, so the pill mainly protects the managers' jobs and private "
        "benefits. The other shareholders lose the takeover premium and the threat that keeps the managers in "
        "line.</p>"
    ),
    "criteria": [
        "3 points per firm: 1 for the right verdict and 2 for the reasons drawn from the case.",
        "Orrin: protects value; planned and reported losses, a vote by the owners, stable long-term owners and a "
        "long programme that a bidder could cut (positive entrenchment). Naming the cost, weaker external "
        "monitoring, is a bonus.",
        "Mallory: entrenches; long underperformance means the takeover threat is the discipline needed, the board "
        "is captive (CEO as chair, insiders) and the pill came overnight without a vote right after the stake was "
        "disclosed.",
        "An answer that calls both pills bad, or both good, earns at most 3 of 6: the question tests that the same "
        "defence can serve different interests.",
    ],
}
SVAR["mk-governance-3:1:b"] = {"type": "tekst"}

g3_c = {
    "label": "c", "points": 2,
    "body": "<p>How should each share price react to the pill? (1–2 sentences)</p>",
    "solution": (
        "<p>Mallory's price should fall: the market reads the pill as entrenchment and lowers the chance of a "
        "takeover premium; the lecture notes that the market reaction to such pills is usually very negative "
        "(recording 17, 22:51). Orrin's price should react little, or even rise, since the owners approved the pill "
        "and it protects the programme; a small fall for the lost takeover premium is also accepted with that "
        "reason.</p>"
    ),
    "criteria": [
        "Mallory (1 point): the price falls, because the pill signals entrenchment and removes the expected "
        "takeover premium.",
        "Orrin (1 point): a small or no reaction, or a rise, because the owners approved it and it protects the "
        "programme; a small fall is accepted if it is explained by the lost chance of a takeover premium.",
        "The direction must be consistent with the verdicts in (b).",
    ],
}
SVAR["mk-governance-3:1:c"] = {"type": "tekst"}

OPPG["mk-governance-3"] = {
    "n": 1, "title": "Governance", "points": 10, "topic": "Corporate governance", "chapters": [27],
    "merke": "Teoriformen fra H2024 E2 og H2025 E2 (setningsbudsjett og poeng per del), med stoffet fra forelesning 17, 1:08:04",
    "body": g3_body, "parts": [g3_a, g3_b, g3_c],
}


# ======================================================================
# kontroll
# ======================================================================
feil = []


def ren(h):
    s = re.sub(r"<[^>]*>", " ", str(h)).replace("&minus;", "−").replace("&nbsp;", " ")
    return re.sub(r"&[a-z]+;", " ", s)


def tall_i(tekst):
    s = ren(tekst).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", s):
        x = float(re.sub(r"[, ](?=\d{3}\b)", "", m.group(0)))
        ut += [x, abs(x)]
    return ut


def innenfor(n, v, d):
    return abs(n - v) <= max(d.get("abs", 0), d.get("tol", 0.01) * abs(v), 1e-9)


for sid, ex in OPPG.items():
    hvor = sid
    deler = ex.get("parts") or [dict(ex, label="")]
    if ex["n"] != 1:
        feil.append(f"{hvor}: n skal være 1")
    if ex.get("parts") and sum(p["points"] for p in ex["parts"]) != ex["points"]:
        feil.append(f"{hvor}: poengene summerer ikke")
    if sid.startswith("mk-deal") and not (ex["points"] == 20 and 4 <= len(ex["parts"]) <= 7):
        feil.append(f"{hvor}: regneoppgaven skal ha 20 poeng og 4 til 7 deler")
    if sid.startswith("mk-deal") and ex["parts"][-1]["points"] not in (3, 4, 5):
        feil.append(f"{hvor}: halen skal være 3 til 5 poeng")
    if sid.startswith("mk-deal") and ex["parts"][0]["points"] > 3:
        feil.append(f"{hvor}: del a er tung")
    if sid.startswith("mk-governance") and ex["points"] != 10:
        feil.append(f"{hvor}: teorioppgaven skal ha 10 poeng")
    for p in deler:
        if not 3 <= len(p["criteria"]) <= 7:
            feil.append(f"{hvor}{p['label']}: {len(p['criteria'])} kriterier")
        for c in p["criteria"]:
            if re.search(r"<[a-zA-Z/!]|&[a-z#0-9]+;", c):
                feil.append(f"{hvor}{p['label']}: markup i kriterium")
        k = f"{sid}:1:{p['label']}"
        if k not in SVAR:
            feil.append(f"mangler svar-data {k}")
            continue
        d = SVAR[k]
        if d["type"] == "blandet" and not 0 < d["tallPoeng"] < p["points"]:
            feil.append(f"{k}: tallPoeng")
        kilde = " ".join([p["solution"], " ".join(p["criteria"])])
        nums = tall_i(kilde)
        for tt in d.get("tall", []):
            kand = [tt["verdi"]] + tt.get("alt", [])
            ok = any(innenfor(n, v, tt) or (tt["enhet"] == "%" and innenfor(n * 100, v, tt))
                     for v in kand for n in nums)
            if not ok and not tt.get("regnet"):
                feil.append(f"{k}: {tt['navn']} = {tt['verdi']} står ikke i løsningen")
            if abs(tt["verdi"]) < 1e-6 and "abs" not in tt:
                feil.append(f"{k}: verdien er 0 uten abs")
        # svaret skal ikke stå i oppgaveteksten
        tekst = ren(ex["body"]) + " " + " ".join(ren(q["body"]) for q in ex.get("parts", []))
        tall_tekst = tall_i(tekst)
        for tt in d.get("tall", []):
            v = tt["verdi"]
            if abs(v) > 1e-6 and any(abs(n - v) <= 1e-4 * abs(v) for n in tall_tekst):
                feil.append(f"{k}: svaret {v} står i oppgaveteksten")

for k in SVAR:
    sid, n, lab = k.split(":")
    ex = OPPG.get(sid)
    if not ex or (lab and lab not in [p["label"] for p in ex.get("parts", [])]) or (not lab and ex.get("parts")):
        feil.append(f"svar-data uten deloppgave: {k}")


def alle(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from alle(v)
    elif isinstance(o, list):
        for v in o:
            yield from alle(v)


for s in list(alle(OPPG)) + list(alle(SVAR)):
    r = re.sub(r"</?(sub|sup|b|i)>", "", s)
    if "—" in r or "&mdash;" in r:
        feil.append(f"tankestrek: {r[:60]}")
    for m in re.finditer(r",\s+and\b", r):
        feil.append(f"komma før and: …{r[max(0, m.start() - 50):m.end() + 10]}…")
    m = re.search(r",\s+og\b", r)
    if m:
        feil.append(f"komma før og: …{r[max(0, m.start() - 50):m.end() + 10]}…")
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"pronomen om Kurbatov: {r[:80]}")
    if re.search(r"lecturer[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"pronomen om the lecturer: {r[:80]}")
    for tag in ("p", "b", "tr", "table", "li", "ul", "ol", "sub", "sup"):
        if s.count(f"<{tag}>") + s.count(f"<{tag} ") != s.count(f"</{tag}>"):
            feil.append(f"ubalansert <{tag}>: {s[:60]}")
    if re.search(r"\b(nan|inf)\b", s):
        feil.append(f"nan/inf: {s[:60]}")
for s in alle(OPPG):
    for m in re.finditer(r"(?:^|[\s(=])-\d", ren(s)):
        feil.append(f"bindestrek som minus: …{ren(s)[max(0, m.start() - 30):m.end() + 10]}…")
    if "synerg" in ren(s).lower() and False:
        pass

# merket navngir ikke mekanismen
for sid, ex in OPPG.items():
    for ordet in ("sannsynlighet", "arbitrasje", "selvfinans", "utsett", "giftpille", "forskans", "fallskjerm"):
        if ordet in ex["merke"].lower():
            feil.append(f"{sid}: merket navngir mekanismen ({ordet})")

print("Ord i oppgaveteksten:")
for sid, ex in OPPG.items():
    ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex.get("parts", []))).split())
    print(f"   {sid}: {ord_} ord ({ord_ / ex['points']:.1f} per poeng)")
    if not 8 <= ord_ / ex["points"] <= (18 if sid.startswith("mk-governance") else 16):
        feil.append(f"{sid}: {ord_} ord")

print("\nNøkkeltall:")
print(f"   deal-1: tilbud {tilbud1:.2f}, premie {premie1:.4%}, andel {andel1:.4%}, dV {dVA1:.0f}/{dVT1:.0f}, "
      f"suksess {suk1:.4f}, fiasko {fia1:.4f}, CE {ce1:.4f}, p {p1:.6f} (helt år {p1_aar:.4f}, uten CE {p1_udisk:.4f})")
print(f"   deal-2: tilbud {tilbud2:.2f}, premie {premie2:.4%}, suksess {suk2:.2f}, fiasko {fia2:.2f}, CE {ce2:.2f}, "
      f"p {p2:.6f} (uten CE {p2_udisk:.4f}, uten rente {p2_ingen:.4f}); A ved gjennomføring {As2:.4f}")
print(f"   deal-3: tilbud {tilbud3:.2f}, spread {spread3:.2f} ({spread3_pc:.4%}), suksess {suk3:.4f}, fiasko {fia3:.4f}, "
      f"p {p3:.6f}, kollega {p3k:.6f}, utsatt {p3_ny:.6f}, spread ved samme p {spread3_ny:.4f}")

if feil:
    print("\nFEIL, ingenting ble skrevet:")
    for x in feil:
        print("  ", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(OPPG, fh, ensure_ascii=False, indent=1)
with open(UT_SVAR, "w", encoding="utf-8") as fh:
    json.dump(SVAR, fh, ensure_ascii=False, indent=1)
print(f"\nSkrev {UT} og {UT_SVAR}: {len(OPPG)} oppgaver, {len(SVAR)} svar-oppføringer.")
