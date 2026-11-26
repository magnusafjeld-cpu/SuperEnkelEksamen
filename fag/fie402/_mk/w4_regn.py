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
# TIER 2 · mk-budkamp-1 · tabellformen fra bank D (forelesning 16, 1:25:55)
# ======================================================================
B1 = {  # verdi (SEK m) alene og etter hvert mulig kjøp, før prisen for D er betalt
    "A": {"alene": 420, "A": 630, "B": 395, "C": 395},
    "B": {"alene": 360, "A": 350, "B": 580, "C": 350},
    "C": {"alene": 300, "A": 290, "B": 290, "C": 515},
}
TD1 = 180
N1 = {"A": 60, "B": 40, "C": 48, "D": 24}           # millioner aksjer
by1 = ["A", "B", "C"]
syn1 = {k: B1[k][k] - B1[k]["alene"] - TD1 for k in by1}
tap1b = {k: B1[k]["alene"] - B1[k][[j for j in by1 if j != k][0]] for k in by1}
for k in by1:   # samme tap uansett hvilken rival som kjøper
    assert len({B1[k][j] for j in by1 if j != k}) == 1
maks_sq1 = {k: B1[k][k] - B1[k]["alene"] for k in by1}
maks_r1 = {k: B1[k][k] - B1[k][[j for j in by1 if j != k][0]] for k in by1}
assert maks_sq1 == {"A": 210, "B": 220, "C": 215} and maks_r1 == {"A": 235, "B": 230, "C": 225}
vinner1 = max(by1, key=lambda k: maks_r1[k])
pris1 = sorted(maks_r1.values())[-2]
assert vinner1 == "A" and pris1 == 230
assert max(by1, key=lambda k: maks_sq1[k]) == "B" and max(by1, key=lambda k: syn1[k]) == "B"   # alternativet snur vinneren
tot0_1 = sum(B1[k]["alene"] for k in by1) + TD1
tot1 = {j: sum(B1[k][j] for k in by1) - tot0_1 for j in by1}
assert tot1 == {"A": 10, "B": 5, "C": 0}


def b1_utfall(v, P):
    dD = P - TD1
    dV = B1[v][v] - P - B1[v]["alene"]
    mot_tap = B1[v][v] - P - B1[v][[j for j in by1 if j != v][0]]
    kurs = (B1[v][v] - P) / N1[v]
    x = P / kurs
    return dD, dV, mot_tap, kurs, x, x / N1["D"]


dD1, dV1, mot1, kurs1, x1, ER1b = b1_utfall("A", pris1)
RES_v1, RES_p1 = "C", 222
dD1r, dV1r, mot1r, kurs1r, x1r, ER1br = b1_utfall(RES_v1, RES_p1)
assert RES_p1 <= maks_r1["C"] and (RES_v1, RES_p1) != (vinner1, pris1)
assert near(dD1, 50) and near(dV1, -20) and near(mot1, 5) and near(x1, 34.5) and near(ER1b, 1.4375)
assert mot1r > 0 and dV1r < 0
assert near(x1 * kurs1 + N1["A"] * kurs1, B1["A"]["A"], 1e-9)      # sammenslått verdi stemmer
sum1 = dD1 + dV1 + (B1["B"]["A"] - B1["B"]["alene"]) + (B1["C"]["A"] - B1["C"]["alene"])
assert near(sum1, tot1["A"])

tab_b1 = ("<table class=\"data\"><tr><th>Firm</th><th>Stand-alone</th><th>A buys D</th><th>B buys D</th>"
          "<th>C buys D</th></tr>"
          + "".join(f"<tr><td>{k}</td><td class=\"n\">{B1[k]['alene']}</td><td class=\"n\">{B1[k]['A']}</td>"
                    f"<td class=\"n\">{B1[k]['B']}</td><td class=\"n\">{B1[k]['C']}</td></tr>" for k in by1)
          + f"<tr><td>D</td><td class=\"n\">{TD1}</td><td class=\"n\">0</td><td class=\"n\">0</td>"
            "<td class=\"n\">0</td></tr></table>")

bk1_body = (
    "<p>Four Swedish parcel-delivery firms compete. D is for sale and A, B and C are interested. The table shows "
    "each firm's market value (SEK million) alone and after each possible purchase of D, before the price is paid; "
    "a firm's value is the same whichever rival buys D.</p>"
    + tab_b1 +
    f"<p>A has {N1['A']} million shares, B {N1['B']} million, C {N1['C']} million and D {N1['D']} million.</p>"
)
bk1_a = {
    "label": "a", "points": 3,
    "body": "<p>If the alternative were that nobody buys D, what is the most each of A, B and C would pay for D?</p>",
    "solution": (
        "<p>Against no deal, a bidder gains its value with D minus its value alone:</p>"
        + tab(["Bidder", "Calculation", "Most it would pay"], [
            [k, f"{B1[k][k]} − {B1[k]['alene']}", f"<b>{maks_sq1[k]}</b>"] for k in by1])
        + f"<p>Each figure is D's value {TD1} plus the bidder's synergy ({', '.join(f'{k}: {syn1[k]}' for k in by1[:2])} "
        f"and C: {syn1['C']}). On this view B would bid the most.</p>"
    ),
    "criteria": [
        f"A: {B1['A']['A']} − {B1['A']['alene']} = {maks_sq1['A']}; B: {maks_sq1['B']}; C: {maks_sq1['C']} (1 point each).",
        "The comparison is the bidder's value with D against its value alone.",
        "Using the values after a rival's purchase here answers (b), not (a).",
    ],
}
SVAR["mk-budkamp-1:1:a"] = {"type": "tall", "tall": [
    t("Most A would pay", maks_sq1["A"], "SEK m"), t("Most B would pay", maks_sq1["B"], "SEK m"),
    t("Most C would pay", maks_sq1["C"], "SEK m")]}

bk1_b = {
    "label": "b", "points": 5,
    "body": ("<p>D will be sold to one of A, B or C in any case. What is the most each would pay now? In an open "
             "ascending auction the winner pays the maximum of the last bidder to drop out. Who buys D and at what "
             "price?</p>"),
    "solution": (
        "<p><b>Step 1. The right alternative.</b> Losing now means that a rival gets D, so each bidder compares its "
        "value with D against its value after a rival's purchase:</p>"
        + tab(["Bidder", "Calculation", "Most it would pay", "Of which: loss avoided"], [
            [k, f"{B1[k][k]} − {B1[k][[j for j in by1 if j != k][0]]}", f"<b>{maks_r1[k]}</b>", f"{tap1b[k]}"]
            for k in by1])
        + f"<p><b>Step 2. The auction.</b> C drops out at {maks_r1['C']} and B at {maks_r1['B']}. <b>A buys D for "
        f"SEK {pris1} million</b>, just as B gives up.</p>"
        f"<p>B has the largest synergy ({syn1['B']}), but A fears losing the most: a rival with D would cost A "
        f"{tap1b['A']}. Bidding depends on the alternatives.</p>"
    ),
    "criteria": [
        f"Maximum = value with D − value if a rival buys D: A {maks_r1['A']}, B {maks_r1['B']}, C {maks_r1['C']}, "
        "that is the gain plus the loss avoided.",
        f"A wins and pays {pris1}, the maximum of B, the last bidder to drop out (the question states the rule).",
        f"Using the stand-alone values gives the bids in (a) and B as the winner at {maks_sq1['C']}: wrong here, "
        "since D is sold in any case.",
        "The numbers carry 4 points and the winner 1 point.",
    ],
}
SVAR["mk-budkamp-1:1:b"] = {
    "type": "blandet",
    "tall": [t("Most A would pay", maks_r1["A"], "SEK m"), t("Most B would pay", maks_r1["B"], "SEK m"),
             t("Most C would pay", maks_r1["C"], "SEK m"), t("Price paid for D", pris1, "SEK m")],
    "tallPoeng": 4,
    "tekstLedd": "Who buys D?",
}

bk1_c = {
    "label": "c", "points": 4,
    "body": (f"<p>The winner pays the price in cash. (If you could not solve (b), assume that {RES_v1} buys D for "
             f"SEK {RES_p1} million.) Against their stand-alone values, how much do D's shareholders and the "
             "winner's shareholders gain or lose? Is the winner better off than if it had lost the auction?</p>"),
    "solution": (
        f"<p><b>D's shareholders.</b> {pris1} − {TD1} = <b>+{f(dD1, 0)}</b>.</p>"
        f"<p><b>A's shareholders.</b> A is worth {B1['A']['A']} with D but pays {pris1}: {B1['A']['A']} − {pris1} − "
        f"{B1['A']['alene']} = <b>{f(dV1, 0)}</b>.</p>"
        f"<p><b>Better off than losing?</b> Yes. Had B or C bought D, A would be worth {B1['A']['B']}; now it is worth "
        f"{B1['A']['A'] - pris1}, {f(mot1, 0)} more. A loses against the stand-alone value only because the old "
        "position is gone either way.</p>"
        f"<p><b>Check.</b> With B and C at {f(B1['B']['A'] - B1['B']['alene'], 0)} and {f(B1['C']['A'] - B1['C']['alene'], 0)}, "
        f"the changes add up to {f(sum1, 0)}, the total value A's purchase creates.</p>"
        f"<p><b>With the assumption in the question.</b> C buys at {RES_p1}: D {f(dD1r, 0)}, C {B1['C']['C']} − "
        f"{RES_p1} − {B1['C']['alene']} = {f(dV1r, 0)}; C is {f(mot1r, 0)} better off than if it had lost.</p>"
    ),
    "criteria": [
        f"D's shareholders gain {pris1} − {TD1} = {f(dD1, 0)}; A's shareholders lose {f(-dV1, 0)} against the "
        "stand-alone value (1 point each).",
        f"Better off than losing (2 points): yes, {B1['A']['A'] - pris1} against {B1['A']['B']} if a rival had bought D.",
        f"Follow-through: with C buying for {RES_p1}, D gains {f(dD1r, 0)} and C loses {f(-dV1r, 0)} but is better off "
        "than losing; full marks for a correct method on the result from (b).",
    ],
}
SVAR["mk-budkamp-1:1:c"] = {
    "type": "blandet",
    "tall": [t("Change for D's shareholders", dD1, "SEK m", alt=[dD1r]),
             t("Change for the winner's shareholders", dV1, "SEK m", alt=[dV1r])],
    "tallPoeng": 2,
    "tekstLedd": "Is the winner better off than if it had lost the auction?",
    "merknad": f"alt: reserveantakelsen ({RES_v1} kjøper for {RES_p1}).",
}

bk1_d = {
    "label": "d", "points": 5,
    "body": ("<p>Suppose instead that the winner pays with new shares, so that D's shareholders receive the same "
             "value as in (c). The market values the merged firm at the winner's value with D in the table. How "
             "many new shares must the winner issue? What are the exchange ratio (new shares per D share) and the price "
             "of a merged share?</p>"),
    "solution": (
        f"<p><b>Step 1. The merged share price.</b> The old A shareholders keep what is left after D's shareholders "
        f"get {pris1}: ({B1['A']['A']} − {pris1})/{N1['A']} = {B1['A']['A'] - pris1}/{N1['A']} = "
        f"<b>SEK {f(kurs1)}</b>.</p>"
        f"<p><b>Step 2. New shares.</b> x = {pris1}/{f(kurs1)} = <b>{f(x1)} million</b>. Check: y = {f(x1)}/"
        f"({N1['A']} + {f(x1)}) = {f(x1 / (N1['A'] + x1))} and y × {B1['A']['A']} = {f(x1 / (N1['A'] + x1) * B1['A']['A'], 2)} ✓.</p>"
        f"<p><b>Step 3. Exchange ratio.</b> {f(x1)}/{N1['D']} = <b>{f(ER1b)} A shares per D share</b>.</p>"
        "<p>The formula sheet's NPV for A, (1 − y)(A + T + S) − A, gives "
        f"{f(1 - x1 / (N1['A'] + x1), 6)} × {B1['A']['A']} − {B1['A']['alene']} = {f(dV1, 2)}, the same as with cash: "
        "the payment form only changes who carries the risk.</p>"
        f"<p><b>With the assumption in (c).</b> C: price ({B1['C']['C']} − {RES_p1})/{N1['C']} = {f(kurs1r)}, "
        f"x = {f(x1r)} million, exchange ratio {f(ER1br)}.</p>"
    ),
    "criteria": [
        f"Merged price ({B1['A']['A']} − {pris1})/{N1['A']} = {f(kurs1)}; or solving y = {pris1}/{B1['A']['A']} and "
        "x = y·N_A/(1 − y), an equivalent route.",
        f"New shares {f(x1)} million and exchange ratio {f(ER1b)} (x divided by D's {N1['D']} million shares).",
        f"Dividing {pris1} by A's old price {f(B1['A']['alene'] / N1['A'], 2)} ignores that the merged share is worth "
        "less after paying for D.",
        f"Follow-through: with C buying for {RES_p1}, {f(kurs1r)}, {f(x1r)} million and {f(ER1br)}.",
    ],
}
SVAR["mk-budkamp-1:1:d"] = {"type": "tall", "tall": [
    t("New shares issued", x1, "m shares", alt=[x1r]),
    t("Exchange ratio", ER1b, "", alt=[ER1br]),
    t("Price of a merged share", kurs1, "SEK", alt=[kurs1r]),
], "merknad": f"alt: reserveantakelsen ({RES_v1} kjøper for {RES_p1}) med {N1['C']} millioner C-aksjer."}
assert rel(pris1 / (B1["A"]["alene"] / N1["A"]), x1) > 0.02

bk1_e = {
    "label": "e", "points": 3,
    "body": ("<p>Which bidder has the largest synergy with D? Compare with the winner in (b) and explain. Which "
             "purchase creates the most value for the four firms together? (2–3 sentences)</p>"),
    "solution": (
        f"<p>B has the largest synergy ({syn1['B']}). But the most a bidder pays is its gain plus the loss it avoids: A would lose {tap1b['A']} if a rival got D, "
        f"B only {tap1b['B']}, so A outbids B although B's synergy is larger. Together the four firms gain "
        f"{tot1['A']} when A buys and {tot1['B']} when B buys (C: {tot1['C']}), because a purchase by B or C would "
        "hurt A badly, so here the auction picks the purchase that creates the most value.</p>"
        "<p>The totals: no deal "
        f"{tot0_1}; A buys {tot0_1 + tot1['A']}; B buys {tot0_1 + tot1['B']}; C buys {tot0_1 + tot1['C']}.</p>"
    ),
    "criteria": [
        f"Largest synergy and why (2 points): B ({syn1['B']}); the maximum bid includes the loss avoided and A's loss "
        f"({tap1b['A']}) is the largest, so A bids more although B's synergy is larger.",
        f"Total value (1 point): +{tot1['A']} when A buys against +{tot1['B']} when B buys, so A's purchase creates more.",
        f"Bonus: A's bid counts A's own loss if a rival wins ({tap1b['A']}), but not the losses A's purchase causes "
        f"B and C ({tap1b['B']} each); those losses enter only the total in the last question.",
    ],
}
SVAR["mk-budkamp-1:1:e"] = {"type": "tekst"}

OPPG["mk-budkamp-1"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [26],
    "merke": "Samme form som bank D-eksemplet i forelesning 16 (1:25:55)",
    "body": bk1_body, "parts": [bk1_a, bk1_b, bk1_c, bk1_d, bk1_e],
}

# ======================================================================
# mk-budkamp-2 · kontanter mot aksjer og høyeste bytteforhold med rival
# ======================================================================
NA2b, PA2b = 64, 62.50
NT2b, PT2b = 24, 50.00
A2b, T2b = NA2b * PA2b, NT2b * PT2b
S2b, LA2b = 450, 150          # Kessingtons synergi og tap hvis Brockhurst kjøper
SR2b, LR2b = 300, 100         # Brockhursts synergi og tap hvis Kessington kjøper
assert near(A2b, 4_000) and near(T2b, 1_200)
Rmaks2 = T2b + SR2b + LR2b
Rmaks2_ps = Rmaks2 / NT2b
bud2 = 67.00
P2b = bud2 * NT2b
npvT2 = P2b - T2b
npvA2 = S2b - (P2b - T2b)
assert bud2 > Rmaks2_ps and npvA2 > 0
V2b = A2b + T2b + S2b
ER2b = 1.08
x2b = ER2b * NT2b
y2b = x2b / (NA2b + x2b)
npvT2s = y2b * V2b - T2b
npvA2s = (1 - y2b) * V2b - A2b
assert near(npvT2s + npvA2s, S2b) and y2b * V2b > Rmaks2
RES_R2 = 1_580
assert y2b * V2b > RES_R2                         # samme konklusjon med reserveverdien
ERmaks2 = (T2b + S2b) / A2b * NA2b / NT2b
ERmaks2r = NA2b / NT2b * (T2b + S2b + LA2b) / (A2b - LA2b)
yr2 = (T2b + S2b + LA2b) / V2b
assert near(ERmaks2, 1.1) and ERmaks2 < ERmaks2r
assert near((1 - yr2) * V2b, A2b - LA2b) and near(yr2 / (1 - yr2) * NA2b / NT2b, ERmaks2r)
assert ER2b < ERmaks2                              # tilbudet er under begge grensene
ERfelle2 = (T2b + S2b) / A2b                       # glemmer NA/NT
assert rel(ERfelle2, ERmaks2) > 0.5

bk2_body = (
    "<p>Kessington Labs Inc. (A), a US chain of clinical laboratories, competes with its rival Brockhurst Health Inc. "
    f"(R) to buy Wenlow Diagnostics Inc. (T). Kessington has {NA2b} million shares at ${f(PA2b, 2)} and Wenlow "
    f"{NT2b} million shares at ${f(PT2b, 2)}; the prices reflect stand-alone values. Kessington expects synergies "
    f"of ${S2b} million with Wenlow; if Brockhurst buys Wenlow instead, Kessington's value falls by ${LA2b} million. "
    f"Brockhurst's synergies would be ${SR2b} million; its value falls by ${LR2b} million if Kessington wins. "
    "From (b) on, measure each NPV against the firm's stand-alone value.</p>"
)
bk2_a = {
    "label": "a", "points": 3,
    "body": ("<p>Compared with losing Wenlow to Kessington, what is the most Brockhurst would pay for Wenlow in "
             "cash, in total and per Wenlow share?</p>"),
    "solution": (
        f"<p>Brockhurst gains Wenlow's value and its synergies and avoids the loss if Kessington wins:</p>"
        f"<p>{f(T2b, 0)} + {SR2b} + {LR2b} = <b>${f(Rmaks2, 0)} million</b>, or {f(Rmaks2, 0)}/{NT2b} = "
        f"<b>${f(Rmaks2_ps, 2)} per share</b>.</p>"
        f"<p>Without the threat from Kessington it would pay at most {f(T2b + SR2b, 0)}.</p>"
    ),
    "criteria": [
        f"Maximum = T + S_R + loss avoided = {f(T2b, 0)} + {SR2b} + {LR2b} = ${f(Rmaks2, 0)} million.",
        f"Per share {f(Rmaks2, 0)}/{NT2b} = ${f(Rmaks2_ps, 2)}.",
        f"Leaving out the loss avoided gives {f(T2b + SR2b, 0)}: the question is about a contest, so the loss counts.",
    ],
}
SVAR["mk-budkamp-2:1:a"] = {"type": "tall", "tall": [
    t("Most Brockhurst would pay, total", Rmaks2, "$ m"),
    t("Most Brockhurst would pay per Wenlow share", Rmaks2_ps, "$ per share")]}

bk2_b = {
    "label": "b", "points": 4,
    "body": (f"<p>Kessington wins with a cash offer of ${f(bud2, 2)} per Wenlow share. What is the NPV for "
             "Wenlow's shareholders and for Kessington's shareholders?</p>"),
    "solution": (
        f"<p>Price P = {f(bud2, 2)} × {NT2b} = {f(P2b, 0)}.</p>"
        f"<p>NPV<sub>T</sub> = P − T = {f(P2b, 0)} − {f(T2b, 0)} = <b>${f(npvT2, 0)} million</b>.<br>"
        f"NPV<sub>A</sub> = S − (P − T) = {S2b} − {f(npvT2, 0)} = <b>${f(npvA2, 0)} million</b>.</p>"
        f"<p><b>Check.</b> {f(npvT2, 0)} + {f(npvA2, 0)} = {S2b} = S: the price only splits the synergies. Wenlow's "
        "shareholders get most of them, as the lecture says targets usually do.</p>"
    ),
    "criteria": [
        f"NPV_T = {f(P2b, 0)} − {f(T2b, 0)} = ${f(npvT2, 0)} million (2 points).",
        f"NPV_A = {S2b} − {f(npvT2, 0)} = ${f(npvA2, 0)} million (2 points).",
        "Bonus: the two NPVs add up to the synergies.",
    ],
}
SVAR["mk-budkamp-2:1:b"] = {"type": "tall", "tall": [
    t("NPV for Wenlow's shareholders", npvT2, "$ m"), t("NPV for Kessington's shareholders", npvA2, "$ m")]}

bk2_c = {
    "label": "c", "points": 5,
    "body": (f"<p>Kessington could instead offer {f(ER2b, 2)} new Kessington shares per Wenlow share. What fraction y "
             "of the merged firm would Wenlow's shareholders own? What are the NPVs for both sides? Does the offer "
             "beat Brockhurst's maximum from (a)? (If you could not solve (a), use "
             f"${f(RES_R2, 0)} million.)</p>"),
    "solution": (
        f"<p><b>Step 1. New shares and y.</b> x = {f(ER2b, 2)} × {NT2b} = {f(x2b, 2)} million; y = {f(x2b, 2)}/"
        f"({NA2b} + {f(x2b, 2)}) = <b>{f(y2b)} ({pc(y2b)})</b>.</p>"
        f"<p><b>Step 2. NPVs (formula sheet).</b> A + T + S = {f(A2b, 0)} + {f(T2b, 0)} + {S2b} = {f(V2b, 0)}.<br>"
        f"NPV<sub>T</sub> = y(A + T + S) − T = {f(y2b, 6)} × {f(V2b, 0)} − {f(T2b, 0)} = <b>${f(npvT2s, 2)} million</b><br>"
        f"NPV<sub>A</sub> = (1 − y)(A + T + S) − A = {f(1 - y2b, 6)} × {f(V2b, 0)} − {f(A2b, 0)} = "
        f"<b>${f(npvA2s, 2)} million</b></p>"
        f"<p><b>Step 3. Against Brockhurst.</b> Wenlow's shareholders receive {f(y2b * V2b, 2)}, more than "
        f"Brockhurst's {f(Rmaks2, 0)}, so <b>the offer beats it</b>.</p>"
        f"<p><b>Check.</b> {f(npvT2s, 2)} + {f(npvA2s, 2)} = {S2b} ✓.</p>"
    ),
    "criteria": [
        f"x = {f(x2b, 2)} million, y = {f(x2b, 2)}/{f(NA2b + x2b, 2)} = {pc(y2b)}.",
        f"NPV_T = {f(npvT2s, 2)} and NPV_A = {f(npvA2s, 2)} with the formula sheet and A + T + S = {f(V2b, 0)}.",
        f"Beats Brockhurst (1 point): {f(y2b * V2b, 2)} against {f(Rmaks2, 0)} (or against {f(RES_R2, 0)} with the "
        "value given in the question).",
        "Using y = x/N_T or leaving S out of the merged value is the classic error.",
    ],
}
SVAR["mk-budkamp-2:1:c"] = {
    "type": "blandet",
    "tall": [t("Fraction y owned by Wenlow's shareholders", y2b * 100, "%"),
             t("NPV for Wenlow's shareholders", npvT2s, "$ m"), t("NPV for Kessington's shareholders", npvA2s, "$ m", abs=0.3)],
    "tallPoeng": 4,
    "tekstLedd": "Does the offer beat Brockhurst's maximum from (a)?",
}

bk2_d = {
    "label": "d", "points": 5,
    "body": ("<p>What is the highest exchange ratio Kessington's shareholders should accept if the alternative is "
             "to stay as they are, as on the formula sheet? What is it if the alternative is that Brockhurst buys "
             "Wenlow?</p>"),
    "solution": (
        f"<p><b>Against staying alone (formula sheet).</b> ER ≤ [(T + S)/A] × N<sub>A</sub>/N<sub>T</sub> = "
        f"({f(T2b + S2b, 0)}/{f(A2b, 0)}) × {NA2b}/{NT2b} = <b>{f(ERmaks2)}</b>.</p>"
        f"<p><b>Against Brockhurst winning.</b> Kessington would then be worth {f(A2b, 0)} − {LA2b} = "
        f"{f(A2b - LA2b, 0)}, so its old shareholders accept any y with (1 − y) × {f(V2b, 0)} ≥ {f(A2b - LA2b, 0)}: "
        f"y ≤ {f(T2b + S2b + LA2b, 0)}/{f(V2b, 0)} = {f(yr2)}. Then x ≤ {f(yr2)}/{f(1 - yr2)} × {NA2b} = "
        f"{f(yr2 / (1 - yr2) * NA2b)} million and ER ≤ {f(yr2 / (1 - yr2) * NA2b)}/{NT2b} = <b>{f(ERmaks2r)}</b>.</p>"
        "<p>The same formula with the loss added: ER ≤ (N<sub>A</sub>/N<sub>T</sub>) × (T + S + L)/(A − L). The "
        f"threat of losing Wenlow to a rival raises the ceiling from {f(ERmaks2)} to {f(ERmaks2r)}; the offer of "
        f"{f(ER2b, 2)} in (c) lies below both.</p>"
    ),
    "criteria": [
        f"Formula sheet: ER ≤ (1,650/4,000) × 64/24 = {f(ERmaks2)} (2.5 points).",
        f"With Brockhurst as the alternative: (1 − y) × {f(V2b, 0)} ≥ {f(A2b - LA2b, 0)}, giving ER ≤ {f(ERmaks2r)} "
        "(2.5 points). Any correct route is accepted.",
        f"Forgetting N_A/N_T gives {f(ERfelle2)}, a ratio of values rather than of shares.",
    ],
}
SVAR["mk-budkamp-2:1:d"] = {"type": "tall", "tall": [
    t("Highest exchange ratio, alternative: stay alone", ERmaks2, ""),
    t("Highest exchange ratio, alternative: Brockhurst buys Wenlow", ERmaks2r, "")]}

bk2_e = {
    "label": "e", "points": 3,
    "body": ("<p>Wenlow's two founders own most of its shares. One will stay on and run Wenlow inside Kessington; "
             "the other wants to retire. Which form of payment would each founder prefer? Why? (2–3 sentences)</p>"),
    "solution": (
        "<p>The founder who stays prefers shares: a stake in the merged firm keeps the founder's wealth tied to the "
        "value the founder helps create, synergies included; Kessington also gets a manager with the right "
        "incentives. The founder who retires prefers cash: a fixed amount now, with no exposure to a firm the founder "
        "no longer influences or to the risk that the synergies fall short.</p>"
        "<p><b>Also accepted.</b> Liquidity or timing (the retiring founder wants to spend the money); either founder "
        "preferring cash if they doubt the synergies; a share offer as a signal that Kessington thinks its own shares "
        "are overvalued. The lecture uses the same two sellers: one who wants «to remain just as a manager» and one "
        "who would rather «build a yacht» (recording 16, 1:24:11 to 1:24:48).</p>"
    ),
    "criteria": [
        "Staying founder (1.5 points): shares, with a reason such as keeping a stake in the value the founder creates "
        "or aligned incentives.",
        "Retiring founder (1.5 points): cash, with a reason such as a fixed amount now, no exposure to a firm the "
        "founder no longer runs or to synergy risk.",
        "Bonus: Kessington also gains from paying the staying founder in shares, since it ties the founder to the "
        "merged firm's value.",
    ],
}
SVAR["mk-budkamp-2:1:e"] = {"type": "tekst"}

OPPG["mk-budkamp-2"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [26],
    "merke": "Forelesningsformen fra forelesning 16 (38:03 til 52:52 og 1:25:55) med formelarkets bytteforhold",
    "body": bk2_body, "parts": [bk2_a, bk2_b, bk2_c, bk2_d, bk2_e],
}

# ======================================================================
# mk-budkamp-3 · synergiene blir lavere enn ventet
# ======================================================================
NA3b, PA3b = 100, 48.0
NT3b, PT3b = 25, 64.0
A3b, T3b = NA3b * PA3b, NT3b * PT3b
S3b, LA3b = 500, 80
SR3b, LR3b = 180, 120
S3b_ny = 100
Amaks3 = T3b + S3b + LA3b
Rmaks3 = T3b + SR3b + LR3b
assert Amaks3 > Rmaks3
P3b = Rmaks3
P3b_ps = P3b / NT3b
npvT3 = P3b - T3b
npvA3 = S3b - npvT3
RES_P3 = 1_850
npvT3r, npvA3r = RES_P3 - T3b, S3b - (RES_P3 - T3b)
ER3b = 1.52
x3b = ER3b * NT3b
y3b = x3b / (NA3b + x3b)
V3b = A3b + T3b + S3b
npvT3s = y3b * V3b - T3b
npvA3s = (1 - y3b) * V3b - A3b
assert near(npvT3s, npvT3, 1e-9) and near(npvA3s, npvA3, 1e-9)    # samme verdi ex ante
V3b_ny = A3b + T3b + S3b_ny
kA3 = S3b_ny - npvT3
kT3 = npvT3
sA3 = (1 - y3b) * V3b_ny - A3b
sT3 = y3b * V3b_ny - T3b
kA3r = S3b_ny - npvT3r
mangel3 = S3b - S3b_ny
assert near(npvA3 - kA3, mangel3) and near(npvA3s - sA3, (1 - y3b) * mangel3) and near(npvT3s - sT3, y3b * mangel3)
assert sA3 > kA3 and sT3 < kT3

bk3_body = (
    "<p>Vesterhav Service A/S (A) and Hvidsand Energi A/S (R) both bid for Skovlund Mølleservice A/S (T), a Danish "
    f"firm that services wind turbines. Vesterhav has {NA3b} million shares at DKK {f(PA3b, 2)} and Skovlund "
    f"{NT3b} million shares at DKK {f(PT3b, 2)}, their stand-alone values. Vesterhav expects synergies of DKK {S3b} "
    f"million with Skovlund and would lose DKK {LA3b} million of value if Hvidsand bought it. Hvidsand's synergies "
    f"would be DKK {SR3b} million; it would lose DKK {LR3b} million if Vesterhav won. The bidding stops when one "
    "bidder reaches its maximum; the other then pays that amount. From (b) on, measure NPVs against stand-alone "
    "values.</p>"
)
bk3_a = {
    "label": "a", "points": 3,
    "body": ("<p>Compared with losing Skovlund to the other bidder, what is the most each bidder would pay? What "
             "does the winning bidder pay per Skovlund share?</p>"),
    "solution": (
        f"<p>Vesterhav: {f(T3b, 0)} + {S3b} + {LA3b} = <b>{f(Amaks3, 0)}</b>. Hvidsand: {f(T3b, 0)} + {SR3b} + "
        f"{LR3b} = <b>{f(Rmaks3, 0)}</b> (DKK million).</p>"
        f"<p>Hvidsand stops at {f(Rmaks3, 0)}, so <b>Vesterhav wins</b> and pays {f(P3b, 0)}/{NT3b} = "
        f"<b>DKK {f(P3b_ps, 2)} per share</b>.</p>"
    ),
    "criteria": [
        f"Each maximum is T + own synergies + the loss avoided: {f(Amaks3, 0)} and {f(Rmaks3, 0)} (1 point each).",
        f"Vesterhav wins and pays Hvidsand's maximum, {f(P3b, 0)}, which is DKK {f(P3b_ps, 2)} per share (1 point).",
        "Leaving out the loss avoided gives 2,100 and 1,780; the winner is the same but the price is wrong.",
    ],
}
SVAR["mk-budkamp-3:1:a"] = {"type": "tall", "tall": [
    t("Most Vesterhav would pay", Amaks3, "DKK m"), t("Most Hvidsand would pay", Rmaks3, "DKK m"),
    t("Price per Skovlund share paid by the winner", P3b_ps, "DKK per share")]}
assert near(T3b + S3b, 2_100) and near(T3b + SR3b, 1_780)

bk3_b = {
    "label": "b", "points": 3,
    "body": ("<p>The winner pays in cash. What is the NPV for each side? (If you could not solve (a), use a price "
             f"of DKK {f(RES_P3, 0)} million.)</p>"),
    "solution": (
        f"<p>NPV<sub>T</sub> = {f(P3b, 0)} − {f(T3b, 0)} = <b>DKK {f(npvT3, 0)} million</b>; NPV<sub>A</sub> = {S3b} "
        f"− {f(npvT3, 0)} = <b>DKK {f(npvA3, 0)} million</b>.</p>"
        f"<p>With the price in the question: {f(npvT3r, 0)} and {f(npvA3r, 0)}.</p>"
    ),
    "criteria": [
        f"NPV_T = P − T = {f(npvT3, 0)} and NPV_A = S − (P − T) = {f(npvA3, 0)} (1.5 points each).",
        f"Follow-through: with {f(RES_P3, 0)}, {f(npvT3r, 0)} and {f(npvA3r, 0)}.",
        "The two NPVs add up to the synergies; a pair that does not signals an error.",
    ],
}
SVAR["mk-budkamp-3:1:b"] = {"type": "tall", "tall": [
    t("NPV for Skovlund's shareholders", npvT3, "DKK m", alt=[npvT3r]),
    t("NPV for Vesterhav's shareholders", npvA3, "DKK m", alt=[npvA3r])],
    "merknad": f"alt: reserveprisen {f(RES_P3, 0)}."}

bk3_c = {
    "label": "c", "points": 4,
    "body": (f"<p>The winning bidder could instead offer {f(ER3b, 2)} of its own new shares per Skovlund share. Using the "
             "formula sheet and the expected synergies, what are the NPVs for both sides? Compare with (b).</p>"),
    "solution": (
        f"<p>x = {f(ER3b, 2)} × {NT3b} = {f(x3b, 0)} million; y = {f(x3b, 0)}/({NA3b} + {f(x3b, 0)}) = {f(y3b)}.<br>"
        f"A + T + S = {f(A3b, 0)} + {f(T3b, 0)} + {S3b} = {f(V3b, 0)}.</p>"
        f"<p>NPV<sub>T</sub> = {f(y3b, 6)} × {f(V3b, 0)} − {f(T3b, 0)} = <b>{f(npvT3s, 2)}</b>; NPV<sub>A</sub> = "
        f"{f(1 - y3b, 6)} × {f(V3b, 0)} − {f(A3b, 0)} = <b>{f(npvA3s, 2)}</b> (DKK million).</p>"
        "<p>The same as with cash: at the expected synergies the share offer gives Skovlund's shareholders exactly "
        f"the cash price, since {f(y3b, 6)} × {f(V3b, 0)} = {f(y3b * V3b, 2)}. The difference only shows when the "
        "synergies turn out differently.</p>"
    ),
    "criteria": [
        f"y = {f(x3b, 0)}/{f(NA3b + x3b, 0)} = {f(y3b)} and A + T + S = {f(V3b, 0)}.",
        f"NPV_T = {f(npvT3s, 2)} and NPV_A = {f(npvA3s, 2)} (1.5 points each).",
        "Comparison (1 point): the same as in (b), because the shares are worth the cash price when the synergies "
        "are as expected.",
    ],
}
SVAR["mk-budkamp-3:1:c"] = {"type": "blandet", "tall": [
    t("NPV for Skovlund's shareholders", npvT3s, "DKK m"), t("NPV for Vesterhav's shareholders", npvA3s, "DKK m")],
    "tallPoeng": 3, "tekstLedd": "Compare with (b)."}

bk3_d = {
    "label": "d", "points": 6,
    "body": (f"<p>After the deal the synergies turn out to be only DKK {S3b_ny} million. What are the NPVs for both "
             "sides if the winning bidder paid in cash as in (b)? If it paid in shares as in (c)?</p>"),
    "solution": (
        "<p><b>Cash.</b> Skovlund's shareholders already have their price: NPV<sub>T</sub> = <b>"
        f"{f(kT3, 0)}</b> (unchanged). NPV<sub>A</sub> = {S3b_ny} − {f(npvT3, 0)} = <b>{f(kA3, 0)}</b>: Vesterhav's "
        f"shareholders carry the whole shortfall of {f(mangel3, 0)}.</p>"
        f"<p><b>Shares.</b> The merged firm is worth {f(A3b, 0)} + {f(T3b, 0)} + {S3b_ny} = {f(V3b_ny, 0)}.<br>"
        f"NPV<sub>T</sub> = {f(y3b, 6)} × {f(V3b_ny, 0)} − {f(T3b, 0)} = <b>{f(sT3, 2)}</b><br>"
        f"NPV<sub>A</sub> = {f(1 - y3b, 6)} × {f(V3b_ny, 0)} − {f(A3b, 0)} = <b>{f(sA3, 2)}</b></p>"
        f"<p><b>Check.</b> The shortfall of {f(mangel3, 0)} is split {f(npvA3s - sA3, 2)} to Vesterhav and "
        f"{f(npvT3s - sT3, 2)} to Skovlund, in proportion {f(1 - y3b)} and {f(y3b)}.</p>"
        f"<p>With the reserve price {f(RES_P3, 0)} from (b): cash gives NPV<sub>A</sub> = {f(kA3r, 0)} and "
        f"NPV<sub>T</sub> = {f(npvT3r, 0)}; the share figures do not change.</p>"
    ),
    "criteria": [
        f"Cash: NPV_T = {f(kT3, 0)} and NPV_A = {f(kA3, 0)}; the acquirer bears the whole shortfall.",
        f"Shares: NPV_T = {f(sT3, 2)} and NPV_A = {f(sA3, 2)}, from y × {f(V3b_ny, 0)} and (1 − y) × {f(V3b_ny, 0)}.",
        "1.5 points per number; show the merged value with the lower synergies.",
        f"Follow-through for cash with the reserve price {f(RES_P3, 0)}: {f(kA3r, 0)} and {f(npvT3r, 0)}.",
    ],
}
SVAR["mk-budkamp-3:1:d"] = {"type": "tall", "tall": [
    t("Cash: NPV for Vesterhav's shareholders", kA3, "DKK m", alt=[kA3r]),
    t("Cash: NPV for Skovlund's shareholders", kT3, "DKK m", alt=[npvT3r]),
    t("Shares: NPV for Vesterhav's shareholders", sA3, "DKK m"),
    t("Shares: NPV for Skovlund's shareholders", sT3, "DKK m")],
    "merknad": f"alt: reserveprisen {f(RES_P3, 0)} i (b) endrer bare kontanttallene."}

bk3_e = {
    "label": "e", "points": 4,
    "body": ("<p>Who bears the synergy risk under each form of payment? If the winning bidder's managers had "
             "doubted the synergies before bidding, or believed that their own shares were overvalued, which payment would "
             "they have chosen? How would the market read that choice? (3–4 sentences)</p>"),
    "solution": (
        "<p>With cash, the target's shareholders get a fixed price and the acquirer's shareholders bear all of the "
        f"synergy risk; with shares, the target's shareholders own {pc(y3b, 1)} of the merged firm and bear that part "
        "of it. Managers who doubted the synergies would therefore have preferred shares, to hedge against the worst "
        "case; so would managers who thought their shares were overvalued, since they pay with an expensive "
        "currency. The market knows this, so a share offer is read as a sign that the acquirer's shares may be "
        "overvalued or that its managers doubt the deal; its price tends to fall on the announcement.</p>"
        "<p>The lecture makes both points: shares «hedge yourself against the worst case», while a stock offer makes "
        "the market think the acquirer is «probably overvalued» (recording 16, 1:23:53 to 1:25:46).</p>"
    ),
    "criteria": [
        "Risk (1 point): cash puts all of it on the acquirer; shares share it in proportion y and 1 − y.",
        "Doubtful managers (1 point): prefer shares as a hedge.",
        "Overvalued shares (1 point): prefer shares, a cheap currency.",
        "Market reading (1 point): a share offer signals overvaluation or doubt, so the acquirer's price falls.",
    ],
}
SVAR["mk-budkamp-3:1:e"] = {"type": "tekst"}

OPPG["mk-budkamp-3"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [26],
    "merke": "Forelesningsformen fra forelesning 16 (38:03 til 46:37 og 1:25:55), med et tillegg i del d",
    "body": bk3_body, "parts": [bk3_a, bk3_b, bk3_c, bk3_d, bk3_e],
}


# ======================================================================
# mk-coinsurance · hjelper
# ======================================================================
def to_tilstander(VA, VB, FA, FB, p, rf, s=0):
    """Gjeld og egenkapital per tilstand og i verdi, alene og fusjonert (lån med lik prioritet)."""
    d = lambda V, F: min(V, F)
    e = lambda V, F: max(V - F, 0.0)
    disk = 1 + rf
    pv = lambda x: (p[0] * x[0] + p[1] * x[1]) / disk
    r = {}
    r["DA"], r["EA"] = pv([d(v, FA) for v in VA]), pv([e(v, FA) for v in VA])
    r["DB"], r["EB"] = pv([d(v, FB) for v in VB]), pv([e(v, FB) for v in VB])
    VAB = [VA[i] + VB[i] + s for i in range(2)]
    F = FA + FB
    r["DAB"], r["EAB"] = pv([d(v, F) for v in VAB]), pv([e(v, F) for v in VAB])
    r["lanA"] = pv([d(v, F) * FA / F for v in VAB])
    r["lanB"] = pv([d(v, F) * FB / F for v in VAB])
    r["VAB"] = VAB
    return r


# ======================================================================
# mk-coinsurance-1 · forelesningsformen (16, 1:27:49)
# ======================================================================
VA_c1, VB_c1 = [120, 40], [25, 90]
FA_c1, FB_c1 = 50, 36
r1 = to_tilstander(VA_c1, VB_c1, FA_c1, FB_c1, [0.5, 0.5], 0.0)
assert all(v >= FA_c1 + FB_c1 for v in r1["VAB"])           # fusjonert gjeld er risikofri
assert VA_c1[1] < FA_c1 and VB_c1[0] < FB_c1                # hver alene misligholder i sin dårlige tilstand
E0_c1, D0_c1 = r1["EA"] + r1["EB"], r1["DA"] + r1["DB"]
dE_c1, dD_c1 = r1["EAB"] - E0_c1, r1["DAB"] - D0_c1
andA_c1 = r1["EA"] / E0_c1
dEA_c1 = andA_c1 * r1["EAB"] - r1["EA"]
dEB_c1 = (1 - andA_c1) * r1["EAB"] - r1["EB"]
assert near(dE_c1 + dD_c1, 0) and dE_c1 < 0 and near(dEA_c1 + dEB_c1, dE_c1)
yA0_c1, yB0_c1 = FA_c1 / r1["DA"] - 1, FB_c1 / r1["DB"] - 1
yAB_c1 = (FA_c1 + FB_c1) / r1["DAB"] - 1
assert near(yAB_c1, 0)
RES_c1 = dict(EA=40, EB=20, DA=42, DB=33, EAB=55, DAB=80)
assert near(RES_c1["EA"] + RES_c1["EB"] + RES_c1["DA"] + RES_c1["DB"], RES_c1["EAB"] + RES_c1["DAB"])
rdE_c1 = RES_c1["EAB"] - RES_c1["EA"] - RES_c1["EB"]
rdD_c1 = RES_c1["DAB"] - RES_c1["DA"] - RES_c1["DB"]
rdEA_c1 = RES_c1["EAB"] * RES_c1["EA"] / (RES_c1["EA"] + RES_c1["EB"]) - RES_c1["EA"]
rdEB_c1 = RES_c1["EAB"] * RES_c1["EB"] / (RES_c1["EA"] + RES_c1["EB"]) - RES_c1["EB"]
ryA_c1, ryB_c1 = FA_c1 / RES_c1["DA"] - 1, FB_c1 / RES_c1["DB"] - 1
ryAB_c1 = (FA_c1 + FB_c1) / RES_c1["DAB"] - 1
for k in ("EA", "EB", "DA", "DB", "EAB", "DAB"):
    assert abs(RES_c1[k] - r1[k]) > 1


c1_body = (
    "<p>Tverrå Kraft ASA runs hydropower plants and earns most in a wet year; Sandvoll Sol ASA runs solar parks and "
    "earns most in a dry year. Next year is wet or dry with equal probability. The firms' values next year (NOK "
    "million) are:</p>"
    "<table class=\"data\"><tr><th>Firm</th><th>Wet year</th><th>Dry year</th></tr>"
    f"<tr><td>Tverrå (A)</td><td class=\"n\">{VA_c1[0]}</td><td class=\"n\">{VA_c1[1]}</td></tr>"
    f"<tr><td>Sandvoll (B)</td><td class=\"n\">{VB_c1[0]}</td><td class=\"n\">{VB_c1[1]}</td></tr></table>"
    f"<p>Tverrå has a zero-coupon loan with face value {FA_c1} and Sandvoll one with face value {FB_c1}, both due "
    "next year. Investors are risk neutral, the risk-free rate is 0% and there are no taxes or bankruptcy costs. The "
    "firms consider merging without synergies: the merged firm takes over both loans and its shares go to the old "
    "shareholders in proportion to their stand-alone equity values.</p>"
)
c1_a = {
    "label": "a", "points": 4,
    "body": "<p>What are the debt and the equity of each firm worth today if they do not merge?</p>",
    "solution": (
        "<p>In each state the lender gets min(V, F) and the shareholders max(V − F, 0):</p>"
        + tab(["Firm", "Wet: debt / equity", "Dry: debt / equity", "Debt today", "Equity today"], [
            ["Tverrå", f"{min(VA_c1[0], FA_c1)} / {VA_c1[0] - FA_c1}", f"{VA_c1[1]} / 0", f"<b>{f(r1['DA'], 2)}</b>",
             f"<b>{f(r1['EA'], 2)}</b>"],
            ["Sandvoll", f"{VB_c1[0]} / 0", f"{FB_c1} / {VB_c1[1] - FB_c1}", f"<b>{f(r1['DB'], 2)}</b>",
             f"<b>{f(r1['EB'], 2)}</b>"],
        ])
        + f"<p>For example Tverrå's debt: 0.5 × {FA_c1} + 0.5 × {VA_c1[1]} = {f(r1['DA'], 2)}. Each firm defaults in "
        "its bad year.</p>"
    ),
    "criteria": [
        f"Tverrå: debt {f(r1['DA'], 2)}, equity {f(r1['EA'], 2)}; Sandvoll: debt {f(r1['DB'], 2)}, equity "
        f"{f(r1['EB'], 2)} (1 point each).",
        "Per state the lender gets min(V, F); no discounting since the risk-free rate is 0%.",
        "Treating the face value as the value of the debt ignores the default in the bad year.",
    ],
}
SVAR["mk-coinsurance-1:1:a"] = {"type": "tall", "tall": [
    t("Value of Tverrå's debt", r1["DA"], "NOK m"), t("Value of Tverrå's equity", r1["EA"], "NOK m"),
    t("Value of Sandvoll's debt", r1["DB"], "NOK m"), t("Value of Sandvoll's equity", r1["EB"], "NOK m")]}

c1_b = {
    "label": "b", "points": 4,
    "body": "<p>What are the debt and the equity of the merged firm worth?</p>",
    "solution": (
        f"<p>The merged firm is worth {r1['VAB'][0]} in a wet year and {r1['VAB'][1]} in a dry year and owes "
        f"{FA_c1 + FB_c1}. It can pay in both years:</p>"
        + tab(["State", "Value", "Debt", "Equity"], [
            ["Wet", f"{r1['VAB'][0]}", f"{FA_c1 + FB_c1}", f"{r1['VAB'][0] - FA_c1 - FB_c1}"],
            ["Dry", f"{r1['VAB'][1]}", f"{FA_c1 + FB_c1}", f"{r1['VAB'][1] - FA_c1 - FB_c1}"],
        ])
        + f"<p>Debt = <b>{f(r1['DAB'], 2)}</b>, equity = 0.5 × {r1['VAB'][0] - FA_c1 - FB_c1} + 0.5 × "
        f"{r1['VAB'][1] - FA_c1 - FB_c1} = <b>{f(r1['EAB'], 2)}</b>. The debt has become risk-free.</p>"
        f"<p><b>Check.</b> {f(r1['DAB'], 2)} + {f(r1['EAB'], 2)} = {f(r1['DAB'] + r1['EAB'], 2)} = "
        f"{f(r1['DA'] + r1['EA'], 2)} + {f(r1['DB'] + r1['EB'], 2)}: without synergies the total value is unchanged.</p>"
    ),
    "criteria": [
        f"Merged value {r1['VAB'][0]} and {r1['VAB'][1]} against a face value of {FA_c1 + FB_c1}: no default.",
        f"Debt {f(r1['DAB'], 2)} and equity {f(r1['EAB'], 2)} (2 points each).",
        "Bonus: the total value is the same as before, since there are no synergies.",
    ],
}
SVAR["mk-coinsurance-1:1:b"] = {"type": "tall", "tall": [
    t("Value of the merged firm's debt", r1["DAB"], "NOK m"), t("Value of the merged firm's equity", r1["EAB"], "NOK m")]}

res_c1 = (f"(If you could not solve (a) and (b), use E<sub>A</sub> = {RES_c1['EA']}, E<sub>B</sub> = {RES_c1['EB']}, "
          f"D<sub>A</sub> = {RES_c1['DA']} and D<sub>B</sub> = {RES_c1['DB']} before; E = {RES_c1['EAB']} and "
          f"D = {RES_c1['DAB']} after.)")
c1_c = {
    "label": "c", "points": 4,
    "body": ("<p>What do the shareholders as a group and the creditors as a group gain or lose from the merger? How "
             f"is the shareholders' change split between Tverrå's and Sandvoll's shareholders? {res_c1}</p>"),
    "solution": (
        f"<p><b>Groups.</b> Shareholders: {f(r1['EAB'], 2)} − ({f(r1['EA'], 2)} + {f(r1['EB'], 2)}) = "
        f"<b>{f(dE_c1, 2)}</b>. Creditors: {f(r1['DAB'], 2)} − ({f(r1['DA'], 2)} + {f(r1['DB'], 2)}) = "
        f"<b>+{f(dD_c1, 2)}</b>.</p>"
        f"<p><b>Split.</b> Tverrå's shareholders get {f(r1['EA'], 2)}/{f(E0_c1, 2)} = {pc(andA_c1)} of the merged "
        f"equity: {f(andA_c1, 6)} × {f(r1['EAB'], 2)} − {f(r1['EA'], 2)} = <b>{f(dEA_c1, 4)}</b>. Sandvoll's: "
        f"{f(1 - andA_c1, 6)} × {f(r1['EAB'], 2)} − {f(r1['EB'], 2)} = <b>{f(dEB_c1, 4)}</b>.</p>"
        f"<p>The creditors' gain equals the shareholders' loss: a wealth transfer of {f(dD_c1, 2)}, with no value "
        "created.</p>"
        f"<p><b>With the values in the question.</b> Shareholders {f(rdE_c1, 2)}, creditors +{f(rdD_c1, 2)}, Tverrå's "
        f"shareholders {f(rdEA_c1, 4)} and Sandvoll's {f(rdEB_c1, 4)}.</p>"
    ),
    "criteria": [
        f"Shareholders {f(dE_c1, 2)} and creditors +{f(dD_c1, 2)}: a wealth transfer, the gain equals the loss.",
        f"Split by equity values: Tverrå {f(dEA_c1, 4)}, Sandvoll {f(dEB_c1, 4)} (1 point each).",
        "Follow-through: full marks for the method on the values given in the question.",
    ],
}
SVAR["mk-coinsurance-1:1:c"] = {"type": "tall", "tall": [
    t("Change for the shareholders as a group", dE_c1, "NOK m", alt=[rdE_c1]),
    t("Change for the creditors as a group", dD_c1, "NOK m", alt=[rdD_c1]),
    t("Change for Tverrå's shareholders", dEA_c1, "NOK m", alt=[rdEA_c1]),
    t("Change for Sandvoll's shareholders", dEB_c1, "NOK m", alt=[rdEB_c1])],
    "merknad": "alt: reserveverdiene i oppgaveteksten."}

c1_d = {
    "label": "d", "points": 3,
    "body": ("<p>What yield to maturity does each loan offer at its market value before the merger? What does the "
             "merged firm's debt offer? (Use the values from (a) and (b), or those given in (c).)</p>"),
    "solution": (
        f"<p>Before: Tverrå {FA_c1}/{f(r1['DA'], 2)} − 1 = <b>{pc(yA0_c1)}</b>; Sandvoll {FB_c1}/{f(r1['DB'], 2)} − 1 "
        f"= <b>{pc(yB0_c1)}</b>.</p>"
        f"<p>After: {FA_c1 + FB_c1}/{f(r1['DAB'], 2)} − 1 = <b>{pc(yAB_c1)}</b>, the risk-free rate, since the merged "
        "firm never defaults. The joint debt has a lower yield because each firm now backs the other's loan.</p>"
        f"<p>With the values in (c): {pc(ryA_c1)}, {pc(ryB_c1)} and {pc(ryAB_c1)}.</p>"
    ),
    "criteria": [
        f"Tverrå {pc(yA0_c1)} and Sandvoll {pc(yB0_c1)} before (1 point each).",
        f"Merged debt {pc(yAB_c1)}: risk-free (1 point).",
        f"Follow-through with the values in (c): {pc(ryA_c1)}, {pc(ryB_c1)} and {pc(ryAB_c1)}.",
    ],
}
SVAR["mk-coinsurance-1:1:d"] = {"type": "tall", "tall": [
    t("Yield on Tverrå's loan before the merger", yA0_c1 * 100, "%", alt=[ryA_c1 * 100]),
    t("Yield on Sandvoll's loan before the merger", yB0_c1 * 100, "%", alt=[ryB_c1 * 100]),
    t("Yield on the merged firm's debt", yAB_c1 * 100, "%", abs=0.05, alt=[ryAB_c1 * 100])],
    "merknad": "alt: reserveverdiene i (c)."}

c1_e = {
    "label": "e", "points": 5,
    "body": ("<p>Explain who gains and who loses from the merger and why, although it creates no value. Would you "
             "vote for it as a Tverrå shareholder? When would such a merger change nothing for either group? "
             "(3–4 sentences)</p>"),
    "solution": (
        "<p>After the merger each firm's assets back both loans: in a dry year Sandvoll's surplus pays Tverrå's lender "
        "and in a wet year Tverrå's pays Sandvoll's, so the debt becomes risk-free (coinsurance). The total value is "
        "unchanged, so the creditors' gain is taken from the shareholders, who lose the part of the upside they kept "
        "when their firm alone could default. As a Tverrå shareholder I would vote against. The merger changes "
        "nothing for either group if, in every state, the two firms either both default or both pay in full, for "
        "example when neither can default on its own: then no surplus of one firm is ever used for the other's "
        "loan.</p>"
        "<p><b>Correlation.</b> «Perfectly positively correlated values» is accepted as the lecture's phrasing "
        "(recording 16, 1:28:43), but it is not enough on its own: with Tverrå at 120/40 and a second firm at "
        "100/70 owing 36, the values move together, yet only Tverrå defaults in the dry year and the merger still "
        "raises the debt from 81 to 86. What matters is whether the default states overlap.</p>"
        "<p><b>Also accepted.</b> Shareholders like risk because equity is like a call on the firm's assets; "
        "diversification inside the firm only helps the lenders unless the firm uses the lower risk, for example by "
        "borrowing more at a lower rate.</p>"
    ),
    "criteria": [
        "Mechanism (2 points): each firm's assets now back both loans, so default disappears and the debt is safer.",
        "Wealth transfer (1 point): no value is created, so the creditors' gain is the shareholders' loss.",
        "Vote (1 point): against, as a shareholder.",
        "Condition (1 point): no effect when in every state both firms default or both pay in full, for example "
        "when neither can default alone. «Perfectly positively correlated values» is accepted as the lecture's "
        "phrasing.",
    ],
}
SVAR["mk-coinsurance-1:1:e"] = {"type": "tekst"}

OPPG["mk-coinsurance-1"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions, merging levered firms",
    "chapters": [26],
    "merke": "Samme form som eksemplet med to belånte firmaer i forelesning 16 (1:27:49 til 1:31:43)",
    "body": c1_body, "parts": [c1_a, c1_b, c1_c, c1_d, c1_e],
}

# ======================================================================
# mk-coinsurance-2 · V2024 P4-formen, ulike sannsynligheter, rente og delvis mislighold
# ======================================================================
VA_c2, VB_c2 = [140, 70], [48, 75]
FA_c2, FB_c2 = 90, 60
p_c2, rf_c2 = [0.6, 0.4], 0.05
r2 = to_tilstander(VA_c2, VB_c2, FA_c2, FB_c2, p_c2, rf_c2)
F2 = FA_c2 + FB_c2
assert r2["VAB"][0] >= F2 > r2["VAB"][1]                # fusjonert misligholder bare i lav-tilstanden
E0_c2, D0_c2 = r2["EA"] + r2["EB"], r2["DA"] + r2["DB"]
andA_c2 = r2["EA"] / E0_c2
dEA_c2 = andA_c2 * r2["EAB"] - r2["EA"]
dEB_c2 = (1 - andA_c2) * r2["EAB"] - r2["EB"]
dlA_c2, dlB_c2 = r2["lanA"] - r2["DA"], r2["lanB"] - r2["DB"]
assert near(dEA_c2 + dEB_c2 + dlA_c2 + dlB_c2, 0) and dlA_c2 > 0 and dlB_c2 > 0
assert near(r2["lanA"] + r2["lanB"], r2["DAB"])
yA0_c2, yB0_c2 = FA_c2 / r2["DA"] - 1, FB_c2 / r2["DB"] - 1
yA1_c2, yB1_c2 = FA_c2 / r2["lanA"] - 1, FB_c2 / r2["lanB"] - 1
assert near(yA1_c2, yB1_c2) and yA1_c2 < yA0_c2 and yA1_c2 > rf_c2
RES_c2 = dict(EA=25, EB=10, EAB=23, lA0=80, lB0=48, lA1=84, lB1=56)
assert near(RES_c2["EA"] + RES_c2["EB"] + RES_c2["lA0"] + RES_c2["lB0"], RES_c2["EAB"] + RES_c2["lA1"] + RES_c2["lB1"])
rE0 = RES_c2["EA"] + RES_c2["EB"]
rdEA_c2 = RES_c2["EAB"] * RES_c2["EA"] / rE0 - RES_c2["EA"]
rdEB_c2 = RES_c2["EAB"] * RES_c2["EB"] / rE0 - RES_c2["EB"]
rdlA_c2, rdlB_c2 = RES_c2["lA1"] - RES_c2["lA0"], RES_c2["lB1"] - RES_c2["lB0"]
ry_c2 = [FA_c2 / RES_c2["lA0"] - 1, FB_c2 / RES_c2["lB0"] - 1, FA_c2 / RES_c2["lA1"] - 1, FB_c2 / RES_c2["lB1"] - 1]
lavA_c2 = r2["VAB"][1] * FA_c2 / F2
lavB_c2 = r2["VAB"][1] * FB_c2 / F2

c2_body = (
    "<p>Redmarsh Drilling Inc. (A) does well when the oil price is high; Bluewing Airlines Inc. (B) does well when it is "
    f"low. Next year the oil price is high with probability {f(p_c2[0], 1)} and low with probability "
    f"{f(p_c2[1], 1)}. The firms' values next year ($ million) are:</p>"
    "<table class=\"data\"><tr><th>Firm</th><th>High oil price</th><th>Low oil price</th></tr>"
    f"<tr><td>Redmarsh (A)</td><td class=\"n\">{VA_c2[0]}</td><td class=\"n\">{VA_c2[1]}</td></tr>"
    f"<tr><td>Bluewing (B)</td><td class=\"n\">{VB_c2[0]}</td><td class=\"n\">{VB_c2[1]}</td></tr></table>"
    f"<p>Redmarsh owes {FA_c2} and Bluewing {FB_c2} on zero-coupon loans due next year. Investors are risk neutral, "
    "the risk-free rate is 5% and there are no taxes or bankruptcy costs. The firms merge without synergies. The "
    "merged firm takes over both loans, which rank equally: if it cannot pay in full, each lender gets the same "
    "fraction of its face value. The merged shares go to the old shareholders in proportion to their stand-alone "
    "equity values. Use 3 decimal places.</p>"
)
c2_a = {
    "label": "a", "points": 4,
    "body": "<p>What are each firm's debt and equity worth today without the merger?</p>",
    "solution": (
        f"<p>Expected payoff under the given probabilities, discounted at 5%:</p>"
        + tab(["", "High: debt / equity", "Low: debt / equity", "Debt today", "Equity today"], [
            ["Redmarsh", f"{FA_c2} / {VA_c2[0] - FA_c2}", f"{VA_c2[1]} / 0", f"<b>{f(r2['DA'], 3)}</b>",
             f"<b>{f(r2['EA'], 3)}</b>"],
            ["Bluewing", f"{VB_c2[0]} / 0", f"{FB_c2} / {VB_c2[1] - FB_c2}", f"<b>{f(r2['DB'], 3)}</b>",
             f"<b>{f(r2['EB'], 3)}</b>"],
        ])
        + f"<p>For example Redmarsh's debt: ({f(p_c2[0], 1)} × {FA_c2} + {f(p_c2[1], 1)} × {VA_c2[1]})/1.05 = "
        f"{f(p_c2[0] * FA_c2 + p_c2[1] * VA_c2[1], 0)}/1.05 = {f(r2['DA'], 3)}.</p>"
    ),
    "criteria": [
        f"Redmarsh: debt {f(r2['DA'], 3)}, equity {f(r2['EA'], 3)}; Bluewing: debt {f(r2['DB'], 3)}, equity "
        f"{f(r2['EB'], 3)} (1 point each).",
        "Probabilities 0.6 and 0.4 (not 0.5) and discounting at 5%, since investors are risk neutral.",
        "Forgetting to discount gives values 5% too high.",
    ],
}
SVAR["mk-coinsurance-2:1:a"] = {"type": "tall", "tall": [
    t("Value of Redmarsh's debt", r2["DA"], "$ m"), t("Value of Redmarsh's equity", r2["EA"], "$ m"),
    t("Value of Bluewing's debt", r2["DB"], "$ m"), t("Value of Bluewing's equity", r2["EB"], "$ m")]}

c2_b = {
    "label": "b", "points": 5,
    "body": "<p>What are the merged firm's debt and equity worth? What is each lender's loan worth after the merger?</p>",
    "solution": (
        f"<p><b>Step 1. Per state.</b> High: {r2['VAB'][0]} against {F2}, so the lenders get {F2} and the shareholders "
        f"{r2['VAB'][0] - F2}. Low: {r2['VAB'][1]} &lt; {F2}, so the firm defaults and the lenders get all "
        f"{r2['VAB'][1]}.</p>"
        f"<p><b>Step 2. Values.</b> Debt = ({f(p_c2[0], 1)} × {F2} + {f(p_c2[1], 1)} × {r2['VAB'][1]})/1.05 = "
        f"<b>{f(r2['DAB'], 3)}</b>; equity = {f(p_c2[0], 1)} × {r2['VAB'][0] - F2}/1.05 = <b>{f(r2['EAB'], 3)}</b>.</p>"
        f"<p><b>Step 3. Each loan.</b> In the low state Redmarsh's lender gets {FA_c2}/{F2} of {r2['VAB'][1]} = "
        f"{f(lavA_c2, 0)} and Bluewing's {f(lavB_c2, 0)}.<br>Redmarsh's loan: ({f(p_c2[0], 1)} × {FA_c2} + "
        f"{f(p_c2[1], 1)} × {f(lavA_c2, 0)})/1.05 = <b>{f(r2['lanA'], 3)}</b><br>Bluewing's loan: ({f(p_c2[0], 1)} × "
        f"{FB_c2} + {f(p_c2[1], 1)} × {f(lavB_c2, 0)})/1.05 = <b>{f(r2['lanB'], 3)}</b></p>"
        f"<p><b>Check.</b> {f(r2['lanA'], 3)} + {f(r2['lanB'], 3)} = {f(r2['DAB'], 3)} ✓; debt plus equity is "
        f"{f(r2['DAB'] + r2['EAB'], 3)}, the same as before the merger.</p>"
    ),
    "criteria": [
        f"The merged firm defaults in the low state ({r2['VAB'][1]} &lt; {F2}) but not in the high state.".replace("&lt;", "<"),
        f"Debt {f(r2['DAB'], 3)} and equity {f(r2['EAB'], 3)}.",
        f"Each loan with equal ranking: {f(r2['lanA'], 3)} and {f(r2['lanB'], 3)}, which add up to the debt.",
        "1.25 points per number, shown with its calculation.",
    ],
}
SVAR["mk-coinsurance-2:1:b"] = {"type": "tall", "tall": [
    t("Value of the merged firm's debt", r2["DAB"], "$ m"), t("Value of the merged firm's equity", r2["EAB"], "$ m"),
    t("Value of Redmarsh's loan after the merger", r2["lanA"], "$ m"),
    t("Value of Bluewing's loan after the merger", r2["lanB"], "$ m")]}

res_c2 = (f"(If you could not solve (a) and (b), use equity {RES_c2['EA']} (Redmarsh) and {RES_c2['EB']} (Bluewing) "
          f"and loans {RES_c2['lA0']} and {RES_c2['lB0']} before; equity {RES_c2['EAB']} and loans {RES_c2['lA1']} "
          f"and {RES_c2['lB1']} after.)")
c2_c = {
    "label": "c", "points": 4,
    "body": ("<p>What does each group of shareholders and each lender gain or lose? Would the shareholders want the "
             f"merger? {res_c2}</p>"),
    "solution": (
        f"<p><b>Shareholders.</b> Redmarsh's own {f(r2['EA'], 3)}/{f(E0_c2, 3)} = {pc(andA_c2)} of the merged equity: "
        f"{f(andA_c2, 6)} × {f(r2['EAB'], 3)} − {f(r2['EA'], 3)} = <b>{f(dEA_c2, 3)}</b>. Bluewing's: {f(1 - andA_c2, 6)} × "
        f"{f(r2['EAB'], 3)} − {f(r2['EB'], 3)} = <b>{f(dEB_c2, 3)}</b>.</p>"
        f"<p><b>Lenders.</b> Redmarsh's: {f(r2['lanA'], 3)} − {f(r2['DA'], 3)} = <b>+{f(dlA_c2, 3)}</b>. Bluewing's: "
        f"{f(r2['lanB'], 3)} − {f(r2['DB'], 3)} = <b>+{f(dlB_c2, 3)}</b>.</p>"
        f"<p>The lenders gain {f(dlA_c2 + dlB_c2, 3)} and the shareholders lose the same: <b>the shareholders would "
        "not want the merger</b>.</p>"
        f"<p><b>With the values in the question.</b> {f(rdEA_c2, 3)}, {f(rdEB_c2, 3)}, +{f(rdlA_c2, 3)} and "
        f"+{f(rdlB_c2, 3)}.</p>"
    ),
    "criteria": [
        f"Shareholders: Redmarsh {f(dEA_c2, 3)}, Bluewing {f(dEB_c2, 3)}, split by stand-alone equity values.",
        f"Lenders: Redmarsh +{f(dlA_c2, 3)}, Bluewing +{f(dlB_c2, 3)}; the gains equal the losses.",
        "Verdict (1 point): the shareholders would not want it.",
        "Follow-through: full marks for the method on the values given in the question.",
    ],
}
SVAR["mk-coinsurance-2:1:c"] = {
    "type": "blandet",
    "tall": [t("Change for Redmarsh's shareholders", dEA_c2, "$ m", alt=[rdEA_c2]),
             t("Change for Bluewing's shareholders", dEB_c2, "$ m", alt=[rdEB_c2]),
             t("Change for Redmarsh's lender", dlA_c2, "$ m", alt=[rdlA_c2]),
             t("Change for Bluewing's lender", dlB_c2, "$ m", alt=[rdlB_c2])],
    "tallPoeng": 3,
    "tekstLedd": "Would the shareholders want the merger?",
    "merknad": "alt: reserveverdiene i oppgaveteksten.",
}

c2_d = {
    "label": "d", "points": 3,
    "body": ("<p>What yield to maturity does each loan offer at its market value before and after the merger? (Use the "
             "values from (a) and (b), or those given in (c).)</p>"),
    "solution": (
        f"<p>Before: Redmarsh {FA_c2}/{f(r2['DA'], 3)} − 1 = <b>{pc(yA0_c2)}</b>; Bluewing {FB_c2}/{f(r2['DB'], 3)} − 1 "
        f"= <b>{pc(yB0_c2)}</b>.<br>After: Redmarsh {FA_c2}/{f(r2['lanA'], 3)} − 1 = <b>{pc(yA1_c2)}</b>; Bluewing "
        f"{FB_c2}/{f(r2['lanB'], 3)} − 1 = <b>{pc(yB1_c2)}</b>.</p>"
        "<p>Both yields fall. After the merger they are equal because the two loans share the same assets and "
        "rank equally. They stay above 5% because the merged firm can still default.</p>"
        f"<p>With the values in (c): {pc(ry_c2[0])}, {pc(ry_c2[1])}, {pc(ry_c2[2])} and {pc(ry_c2[3])}.</p>"
    ),
    "criteria": [
        f"Before: {pc(yA0_c2)} and {pc(yB0_c2)}; after: {pc(yA1_c2)} for both.",
        "Yield = face value/market value − 1. Bonus: the expected return is still 5% because investors are risk "
        "neutral.",
        "Follow-through with the values in (c) is accepted.",
    ],
}
SVAR["mk-coinsurance-2:1:d"] = {"type": "tall", "tall": [
    t("Yield on Redmarsh's loan before", yA0_c2 * 100, "%", alt=[ry_c2[0] * 100]),
    t("Yield on Bluewing's loan before", yB0_c2 * 100, "%", alt=[ry_c2[1] * 100]),
    t("Yield on Redmarsh's loan after", yA1_c2 * 100, "%", alt=[ry_c2[2] * 100]),
    t("Yield on Bluewing's loan after", yB1_c2 * 100, "%", alt=[ry_c2[3] * 100])],
    "merknad": "alt: reserveverdiene i (c)."}

c2_e = {
    "label": "e", "points": 4,
    "body": ("<p>Explain the mechanism behind your results in (b) to (d). Why does a merger without synergies change "
             "the positions of the shareholders and the lenders? (3–4 sentences)</p>"),
    "solution": (
        "<p>Before the merger each lender could only draw on its own borrower's assets; after it both can draw on the "
        f"combined assets, so in the high state Redmarsh's surplus covers Bluewing's loan and in the low state the "
        f"lenders recover {r2['VAB'][1]} of {F2} instead of losing more on one firm alone. This mutual guarantee "
        "(coinsurance) makes the debt less risky, so its value rises although the firm's total value does not change. "
        "With no synergies the lenders' gain must come from the shareholders, who give up the option to walk away "
        "from one firm's debt while keeping the other firm's upside.</p>"
    ),
    "criteria": [
        "Mechanism (2 points): each lender can now draw on both firms' assets, a mutual guarantee, so default is "
        "less likely and losses in default are smaller.",
        "Wealth transfer (1 point): total value is unchanged, so the lenders' gain is the shareholders' loss.",
        "Why shareholders lose (1 point): they lose the limited-liability option on each firm separately (equity as "
        "a call); lower risk helps the lenders, not them.",
    ],
}
SVAR["mk-coinsurance-2:1:e"] = {"type": "tekst"}

OPPG["mk-coinsurance-2"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions, merging levered firms",
    "chapters": [26],
    "merke": "Samme form som V2024 P4, med ulike vekter på tilstandene og positiv rente",
    "body": c2_body, "parts": [c2_a, c2_b, c2_c, c2_d, c2_e],
}

# ======================================================================
# mk-coinsurance-3 · liten synergi, likegyldig synergi og konkurskostnader
# ======================================================================
VA_c3, VB_c3 = [100, 28], [12, 76]
FA_c3, FB_c3 = 45, 30
p_c3 = [0.4, 0.6]
s_c3 = 8
r3 = to_tilstander(VA_c3, VB_c3, FA_c3, FB_c3, p_c3, 0.0, s=s_c3)
r3_0 = to_tilstander(VA_c3, VB_c3, FA_c3, FB_c3, p_c3, 0.0, s=0)
F3 = FA_c3 + FB_c3
assert all(v >= F3 for v in r3_0["VAB"])                    # risikofri også uten synergi
E0_c3, D0_c3 = r3["EA"] + r3["EB"], r3["DA"] + r3["DB"]
dE_c3, dD_c3 = r3["EAB"] - E0_c3, r3["DAB"] - D0_c3
assert near(dE_c3 + dD_c3, s_c3) and dE_c3 < 0
s_stjerne = F3 - D0_c3
r3_s = to_tilstander(VA_c3, VB_c3, FA_c3, FB_c3, p_c3, 0.0, s=s_stjerne)
assert near(r3_s["EAB"], E0_c3) and s_stjerne > s_c3
RES_c3 = dict(E0=50, D0=55, EAB=38)
assert near(RES_c3["E0"] + RES_c3["D0"] + s_c3, RES_c3["EAB"] + F3)
rdE_c3, rdD_c3 = RES_c3["EAB"] - RES_c3["E0"], F3 - RES_c3["D0"]
RES_c3d = 60
rs_stjerne = F3 - RES_c3d
# halen: konkurskostnader 20 % ved mislighold alene, uten synergi
kk = 0.20
DA_kk = p_c3[0] * FA_c3 + p_c3[1] * VA_c3[1] * (1 - kk)
DB_kk = p_c3[0] * VB_c3[0] * (1 - kk) + p_c3[1] * FB_c3
spart_kk = (r3["DA"] - DA_kk) + (r3["DB"] - DB_kk)
assert near(spart_kk, kk * (p_c3[1] * VA_c3[1] + p_c3[0] * VB_c3[0]))

c3_body = (
    "<p>Breiset Alpin AS runs ski resorts and does well in a cold winter; Lysvann Golf AS runs golf courses and does "
    f"well in a mild one. Next winter is cold with probability {f(p_c3[0], 1)} and mild with probability "
    f"{f(p_c3[1], 1)}. The firms' values next year (NOK million) are:</p>"
    "<table class=\"data\"><tr><th>Firm</th><th>Cold winter</th><th>Mild winter</th></tr>"
    f"<tr><td>Breiset (A)</td><td class=\"n\">{VA_c3[0]}</td><td class=\"n\">{VA_c3[1]}</td></tr>"
    f"<tr><td>Lysvann (B)</td><td class=\"n\">{VB_c3[0]}</td><td class=\"n\">{VB_c3[1]}</td></tr></table>"
    f"<p>Breiset owes {FA_c3} and Lysvann {FB_c3} on zero-coupon loans due next year. Investors are risk neutral, "
    "the risk-free rate is 0% and there are no taxes or bankruptcy costs. If they merge, the merged firm takes over "
    f"both loans and gains synergies of {s_c3} in each state (a shared booking system).</p>"
)
c3_a = {
    "label": "a", "points": 4,
    "body": "<p>What are each firm's debt and equity worth today without the merger?</p>",
    "solution": (
        tab(["", "Cold: debt / equity", "Mild: debt / equity", "Debt today", "Equity today"], [
            ["Breiset", f"{FA_c3} / {VA_c3[0] - FA_c3}", f"{VA_c3[1]} / 0", f"<b>{f(r3['DA'], 2)}</b>",
             f"<b>{f(r3['EA'], 2)}</b>"],
            ["Lysvann", f"{VB_c3[0]} / 0", f"{FB_c3} / {VB_c3[1] - FB_c3}", f"<b>{f(r3['DB'], 2)}</b>",
             f"<b>{f(r3['EB'], 2)}</b>"],
        ])
        + f"<p>For example Breiset's debt: {f(p_c3[0], 1)} × {FA_c3} + {f(p_c3[1], 1)} × {VA_c3[1]} = "
        f"{f(r3['DA'], 2)}.</p>"
    ),
    "criteria": [
        f"Breiset: debt {f(r3['DA'], 2)}, equity {f(r3['EA'], 2)}; Lysvann: debt {f(r3['DB'], 2)}, equity "
        f"{f(r3['EB'], 2)} (1 point each).",
        "Probabilities 0.4 and 0.6; no discounting since the risk-free rate is 0%.",
        "Each firm defaults in its bad winter.",
    ],
}
SVAR["mk-coinsurance-3:1:a"] = {"type": "tall", "tall": [
    t("Value of Breiset's debt", r3["DA"], "NOK m"), t("Value of Breiset's equity", r3["EA"], "NOK m"),
    t("Value of Lysvann's debt", r3["DB"], "NOK m"), t("Value of Lysvann's equity", r3["EB"], "NOK m")]}

c3_b = {
    "label": "b", "points": 4,
    "body": "<p>The firms merge. What are the merged firm's debt and equity worth?</p>",
    "solution": (
        f"<p>With the synergies the merged firm is worth {VA_c3[0]} + {VB_c3[0]} + {s_c3} = {r3['VAB'][0]} in a cold "
        f"winter and {VA_c3[1]} + {VB_c3[1]} + {s_c3} = {r3['VAB'][1]} in a mild one, against debt of {F3}: it never "
        "defaults.</p>"
        f"<p>Debt = <b>{f(r3['DAB'], 2)}</b>; equity = {f(p_c3[0], 1)} × {r3['VAB'][0] - F3} + {f(p_c3[1], 1)} × "
        f"{r3['VAB'][1] - F3} = <b>{f(r3['EAB'], 2)}</b>.</p>"
    ),
    "criteria": [
        f"Merged values {r3['VAB'][0]} and {r3['VAB'][1]} include the synergies of {s_c3} in each state.",
        f"No default, so debt {f(r3['DAB'], 2)} and equity {f(r3['EAB'], 2)} (2 points each).",
        "Leaving out the synergies gives equity 8 lower.",
    ],
}
SVAR["mk-coinsurance-3:1:b"] = {"type": "tall", "tall": [
    t("Value of the merged firm's debt", r3["DAB"], "NOK m"), t("Value of the merged firm's equity", r3["EAB"], "NOK m")]}

c3_c = {
    "label": "c", "points": 4,
    "body": ("<p>What do the shareholders as a group and the creditors as a group gain or lose? (If you could not "
             f"solve (a) and (b), use equity of {RES_c3['E0']} and debt of {RES_c3['D0']} before the merger and equity "
             f"of {RES_c3['EAB']} after it.)</p>"),
    "solution": (
        f"<p>Shareholders: {f(r3['EAB'], 2)} − ({f(r3['EA'], 2)} + {f(r3['EB'], 2)}) = <b>{f(dE_c3, 2)}</b>.<br>"
        f"Creditors: {f(r3['DAB'], 2)} − ({f(r3['DA'], 2)} + {f(r3['DB'], 2)}) = <b>+{f(dD_c3, 2)}</b>.</p>"
        f"<p><b>Check.</b> {f(dE_c3, 2)} + {f(dD_c3, 2)} = {f(dE_c3 + dD_c3, 2)}, the synergies: the merger now "
        "creates value, but the creditors take more than all of it.</p>"
        f"<p><b>With the values in the question.</b> Shareholders {f(rdE_c3, 2)}, creditors +{f(rdD_c3, 2)}.</p>"
    ),
    "criteria": [
        f"Shareholders {f(dE_c3, 2)} and creditors +{f(dD_c3, 2)} (2 points each).",
        f"Bonus: the two changes add up to the synergies of {s_c3}.",
        "Follow-through: full marks for the method on the values given in the question.",
    ],
}
SVAR["mk-coinsurance-3:1:c"] = {"type": "tall", "tall": [
    t("Change for the shareholders as a group", dE_c3, "NOK m", alt=[rdE_c3]),
    t("Change for the creditors as a group", dD_c3, "NOK m", alt=[rdD_c3])],
    "merknad": "alt: reserveverdiene i oppgaveteksten."}

c3_d = {
    "label": "d", "points": 4,
    "body": ("<p>What synergy, the same in each state, would leave the shareholders as a group exactly as well off as "
             f"without the merger? (If you could not solve (a), use debt worth {RES_c3d} before the merger.)</p>"),
    "solution": (
        "<p>As long as the merged firm never defaults, its debt is worth the face value "
        f"{F3}, so the creditors always gain {F3} − {f(D0_c3, 2)} = {f(F3 - D0_c3, 2)}. The total value rises by the "
        "synergy s, so the shareholders gain s − "
        f"{f(F3 - D0_c3, 2)}.</p>"
        f"<p>Exactly as well off: s = <b>{f(s_stjerne, 2)}</b> in each state; a larger synergy makes them better off.</p>"
        f"<p><b>Check.</b> With s = {f(s_stjerne, 2)}, equity = {f(p_c3[0], 1)} × "
        f"{f(r3_s['VAB'][0] - F3, 2)} + {f(p_c3[1], 1)} × {f(r3_s['VAB'][1] - F3, 2)} = {f(r3_s['EAB'], 2)} = "
        f"{f(E0_c3, 2)}, the shareholders' value before ✓.</p>"
        f"<p>With debt worth {RES_c3d}: s = {F3} − {RES_c3d} = {f(rs_stjerne, 2)}.</p>"
    ),
    "criteria": [
        f"The synergy must cover the transfer to the creditors: s = {F3} − {f(D0_c3, 2)} = {f(s_stjerne, 2)}.",
        "An equivalent route: set the merged equity equal to the shareholders' value before and solve for s.",
        "The debt stays risk-free at that synergy, so the creditors' gain does not change.",
        f"Follow-through: with debt of {RES_c3d}, s = {f(rs_stjerne, 2)}.",
    ],
}
SVAR["mk-coinsurance-3:1:d"] = {"type": "tall", "tall": [
    t("Synergy per state that leaves the shareholders no worse off", s_stjerne, "NOK m", alt=[rs_stjerne])],
    "merknad": "alt: reserveverdien i oppgaveteksten."}

c3_e = {
    "label": "e", "points": 4,
    "body": ("<p>Suppose instead there are no synergies, but a firm that cannot repay its loan loses 20% of its "
             "assets in bankruptcy costs. Who gains from the merger now? Does that change how the shareholders "
             "should vote? (3–4 sentences, no full calculation needed.)</p>"),
    "solution": (
        "<p>Standing alone, each firm would default in its bad winter and lose 20% of its assets, a cost the creditors "
        "bear since they take the assets; the merged firm never defaults, so the merger now saves those costs and "
        f"raises total value (by {f(spart_kk, 2)} in expectation). All of the saving goes to the creditors, who also "
        "keep the coinsurance gain; the shareholders get nothing in default in either case, so they still lose "
        f"the coinsurance transfer of {f(-(r3_0['EAB'] - E0_c3), 2)}. They should still vote against, unless they can share "
        "the gain, for example by borrowing more afterwards at the lower risk or by renegotiating the loans.</p>"
        f"<p>The numbers, not required: saved costs 0.2 × ({f(p_c3[1], 1)} × {VA_c3[1]} + {f(p_c3[0], 1)} × "
        f"{VB_c3[0]}) = {f(spart_kk, 2)}.</p>"
    ),
    "criteria": [
        "Who gains (2 points): the creditors, because they bear the bankruptcy costs in default and the merger "
        "removes default.",
        "Value (1 point): the merger now creates value by avoiding the expected bankruptcy costs.",
        "Vote (1 point): the shareholders still lose and vote against. Bonus: they could capture the gain only by, "
        "for example, borrowing more at the lower rate or renegotiating the loans.",
    ],
}
SVAR["mk-coinsurance-3:1:e"] = {"type": "tekst"}

OPPG["mk-coinsurance-3"] = {
    "n": 1, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions, merging levered firms",
    "chapters": [26],
    "merke": "Forelesningsformen fra forelesning 16 (1:27:49) med en liten synergi og konkurskostnader som tillegg",
    "body": c3_body, "parts": [c3_a, c3_b, c3_c, c3_d, c3_e],
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
    regn = sid.startswith(("mk-deal", "mk-budkamp", "mk-coinsurance"))
    if regn and not (ex["points"] == 20 and 4 <= len(ex["parts"]) <= 7):
        feil.append(f"{hvor}: regneoppgaven skal ha 20 poeng og 4 til 7 deler")
    if regn and ex["parts"][-1]["points"] not in (3, 4, 5):
        feil.append(f"{hvor}: halen skal være 3 til 5 poeng")
    if regn and ex["parts"][0]["points"] > (3 if sid.startswith("mk-deal") else 4):
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
    for ordet in ("sannsynlighet", "arbitrasje", "selvfinans", "utsett", "giftpille", "forskans", "fallskjerm",
                  "coinsurance", "formuesoverf", "risikoovert", "synergirisiko"):
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
