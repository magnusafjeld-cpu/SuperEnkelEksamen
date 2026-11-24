"""«Hintet i forelesning», skribent H1: alle tall regnes her.

Kjør fra prosjektroten:  python3 -I fag/fie402/_del/h1_regn.py

Oppdraget står i docs/fie402-hint-spek.md. H1 skriver:
  hint1-1  n 1 (10 p): beta, hva den måler, bransjer med høy, lav og nær 1 (opptak 01, 1:03:43)
           n 2 (10 p): kilder til positiv NPV, tre kilder, to setninger hver (opptak 08, 7:53)
           n 3 (20 p): prosjektverdsetting med fellene fra opptak 18 (6:41 til 15:05, 52:08),
                       01 (12:24, 17:31, 44:08) og 08 (4:03): firmatall gitt, sunk cost,
                       kannibalisering, alternativkostnad, ΔNWC med frigjøring etter 3,5 år,
                       avskrivning lagt tilbake, NPV og ikke PV, NPV mot IRR mot et mindre prosjekt.
           n 4 (20 p): WACC og APV med to sammenlignbare firmaer (opptak 09, 8:09 og 44:22;
                       08, 1:19:40 og 1:24:02): r_U som snitt, D/V gitt (gjøres om til D/E),
                       gjeldsbeta null, gjeldskapasitet, PV(TS) med r_U, WACC = APV, r_wacc mot r_U.
  hint2-3  n 1 (10 p): fordel og kostnad ved børsnotert og privat (opptak 07, 38:30)
           n 2 (20 p): signalisering og sertifisering (opptak 10, 3:07, PS2 E1-formen):
                       pooling-pris, emisjon for en utgift uten verdi, test av separerende
                       likevekt, sertifiseringens maksverdi. Vri: dårlig type er verdt noe
                       (48, ikke 0), så terskelen for kopiering er V_G − V_B.
           n 3 (20 p): replikering av gründerens andel (opptak 02, 8:16, 33:54 til 38:09):
                       markedsporteføljen og risikofritt aktivum, gjeld mot egenkapital, MM.
                       Vri: en engleinvestor tilbyr en fast andel (70 %), og sannsynligheten α
                       der gründeren er likegyldig, finnes med markedets forventede avkastning fast.

Skriptet asserter regnesjekkene (WACC = APV, replikerte porteføljer gir begge tilstandene,
investorene får null NPV, separeringen feiler, at feller ligger utenfor toleransen, at viste
ledd summerer, at hvert tall i svar-dataene står i løsningsteksten, poengene og skrivereglene).
Er alt rent, skrives h1.json og h1_svar.json i samme mappe.
"""
import json
import math
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))


# ------------------------------------------------------------------ hjelpere
def F(x, d=4):
    """Engelsk tallformat med tusenskille og ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def P(x, d=2):
    """Rente som prosent med d desimaler."""
    return F(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))


def summ(ledd, total, d=4):
    """«a + b = t» der de viste leddene summerer til vist total."""
    vist = sum(round(x, d) for x in ledd)
    assert abs(vist - round(total, d)) <= 1.01 * 10 ** (-d), (ledd, total, vist)
    s = F(ledd[0], d)
    for x in ledd[1:]:
        s += (" − " if round(x, d) < 0 else " + ") + F(abs(x), d)
    return s + " = " + F(total, d)


def sm(ledd, total, d=4):
    """Som summ, men uten totalen."""
    return summ(ledd, total, d).rsplit(" = ", 1)[0]


SVAR = {}


def tall(navn, verdi, enhet, feller=(), drift=0.0, alt=None, tolmax=0.01, abs_=None):
    """Ett tall i svar-dataene. Toleransen velges så ingen felle havner innenfor
    (ov-spek 6b.1), og så avrunding til fire desimaler alltid godtas."""
    t = {"navn": navn, "verdi": verdi, "enhet": enhet}
    if abs_ is not None:
        t["abs"] = abs_
        for f in feller:
            assert abs(f - verdi) > abs_, (navn, f)
        if alt:
            t["alt"] = alt
        return t
    tol = tolmax
    if feller:
        m = min(abs(f - verdi) / abs(verdi) for f in feller)
        tol = min(tolmax, m / 2.5)
    assert tol >= 0.00005, (navn, verdi, feller)
    assert abs(drift) <= 0.5 * tol * abs(verdi), (navn, drift, tol)
    for f in feller:
        assert abs(f - verdi) > tol * abs(verdi), (navn, f)
    if tol < 0.01:
        t["tol"] = round(tol, 4) if tol >= 0.001 else round(tol, 5)
    if alt:
        t["alt"] = alt
    return t


def svar(key, typ, tallene=None, merknad=None, tallPoeng=None, tekstLedd=None):
    assert key not in SVAR, key
    e = {"type": typ}
    if tallene:
        e["tall"] = tallene
    if tallPoeng is not None:
        e["tallPoeng"] = tallPoeng
    if tekstLedd:
        e["tekstLedd"] = tekstLedd
    if merknad:
        e["merknad"] = merknad
    SVAR[key] = e


def del_(label, points, body, solution, criteria):
    return {"label": label, "points": points, "body": body, "solution": solution, "criteria": criteria}


# ============================================================ hint1-1 oppgave 1: beta (verbal)
H11_E1 = {
    "n": 1, "title": "Risk and return", "points": 10, "topic": "Beta and the CAPM", "chapters": [3],
    "merke": "Forelesning 01 (Review of Basic Concepts), 1:03:43: «it could easily be an exam question»",
    "body": ("<p>The investment committee of a Norwegian pension fund is reviewing its equity portfolio and asks "
             "you to explain beta.</p>"
             "<p>Explain the concept of beta: what does it measure and which kind of risk does it capture? Then "
             "give two examples of industries with a high beta, two examples of industries with a low beta and "
             "one example of an industry or asset with a beta close to one. Give a short reason for each "
             "example. (No calculations are needed. Keep explanations short, 1–2 sentences per point.)</p>"),
    "solution": (
        "<p><b>What beta measures.</b> Beta measures how strongly an asset's return moves with the return on the "
        "market portfolio, β<sub>i</sub> = Cov(R<sub>i</sub>, R<sub>Mkt</sub>)/Var(R<sub>Mkt</sub>). It captures "
        "systematic risk, the part that cannot be diversified away and the only risk the CAPM rewards with a "
        "premium.</p>"
        "<p><b>High beta.</b> (1) <i>Hotels and leisure travel:</i> holidays are among the first expenses "
        "households cut in a downturn and among the first they add in a boom, so revenue swings more than the "
        "economy. (2) <i>Construction and building materials (or car makers):</i> demand comes from investment "
        "and big purchases that are postponed in a recession; high fixed costs amplify the swing in "
        "profits.</p>"
        "<p><b>Low beta.</b> (1) <i>Grocery retail:</i> people need food in good and bad times; in a boom they "
        "may buy better food but not twice as much, so sales move little with the market. (2) <i>Regulated "
        "utilities (power grid, water):</i> demand is stable and prices are regulated, so the cash flows hardly "
        "depend on the business cycle.</p>"
        "<p><b>Beta close to one.</b> <i>A broad market index fund</i>, for example one that tracks a world "
        "index: it holds the market itself, whose beta is exactly 1 by definition. A large "
        "conglomerate spread over most sectors of the economy is also accepted.</p>"
        "<p><b>Also accepted.</b> High: airlines, luxury goods, semiconductors and other suppliers of capital "
        "goods, investment banking and brokerage. Low: tobacco, basic healthcare and pharmaceuticals, "
        "agriculture and food producers, telecom subscriptions. A gold miner as a low-beta example is a strong "
        "answer if it adds that the stock is volatile yet moves little with the market: beta is not total risk. "
        "Bonus, not required: a beta above 1 amplifies the market's moves and a beta below 1 dampens them; the "
        "same industry has a higher equity beta in a more levered firm, since β<sub>E</sub> rises with D/E.</p>"),
    "criteria": [
        "Definition (2.5 points): 1.25 for the co-movement with the market return (Cov/Var or «sensitivity to "
        "the market»), 1.25 for systematic, non-diversifiable risk, the risk the CAPM prices. «Beta is the risk "
        "of the stock» without the market earns 0.5.",
        "Each of the five examples earns 1.5 points: 0.5 for a sensible industry, 1 for a reason that ties its "
        "cash flows to the business cycle. An industry without a reason earns 0.5.",
        "Counting: two examples from the same industry count once (hotels and cruise lines are both leisure "
        "travel). The beta-one example must be justified by its link to the whole market; «a big, stable "
        "company» is not enough.",
        "Classic error: calling a volatile stock high-beta. A biotech or gold-mining stock can swing a lot and "
        "still have a low beta, because its swings are not tied to the market.",
        "Sentence budget: 1–2 sentences per point. Length is not rewarded.",
    ],
}
svar("hint1-1:1:", "tekst")


# ============================================================ hint1-1 oppgave 2: kilder til positiv NPV
H11_E2 = {
    "n": 2, "title": "Capital budgeting", "points": 10, "topic": "Sources of positive NPV", "chapters": [1],
    "merke": "Forelesning 08 (Valuation with leverage I), 7:53: «I keep repeating it could be an exam question»",
    "body": ("<p>At a board meeting of a Norwegian consumer-electronics company, a director asks: «Our analysts "
             "keep finding projects with a positive NPV. If these projects are so good, why have our competitors "
             "not taken them already?»</p>"
             "<p>Name three different sources of positive-NPV projects. For each source, explain in two sentences "
             "what it is and why a competitor cannot simply copy the project. Higher revenue, growth and "
             "diversification are not accepted as sources.</p>"),
    "solution": (
        "<p><b>The common thread.</b> In a competitive market a project that anyone can copy earns only its cost "
        "of capital: rivals enter until the NPV is zero. A positive NPV therefore needs something scarce that the "
        "firm has and its rivals lack, a competitive advantage. Each source below is such an advantage.</p>"
        "<p><b>1. Intangible assets from R&amp;D (patents and know-how).</b> Research gives the firm technology "
        "and know-how that rivals do not have; a patent gives it the legal right to be the only user of the "
        "invention for years. A competitor would have to spend the same years and money on its own research, or "
        "license the patent at a price that takes the NPV away.</p>"
        "<p><b>2. Barriers to entry and market power.</b> Licences, regulation, economies of scale or network "
        "effects keep new firms out of the market, so the firm inside can price above its cost of capital, as a "
        "monopolist would. A competitor cannot copy the project because it cannot get into the market, or only "
        "at a cost that wipes out the profit.</p>"
        "<p><b>3. A cost advantage.</b> Better production technology, cheaper inputs or an efficient supply chain "
        "(for example production where labour is cheaper) let the firm make the same product at a lower cost. At "
        "the market price the project then earns more than its cost of capital for this firm, while a rival with "
        "higher costs would earn nothing on the same project.</p>"
        "<p><b>Also accepted.</b> First-mover advantage (the first large search engine or browser locks in its "
        "users), reputation and brand (customers trust a new product from a famous brand more than one from an "
        "unknown firm), human capital and culture (buying a start-up for its people), scarce tangible assets "
        "(the only plot above an oil field, the best location) and a competitor's failure (taking its market "
        "share or buying it cheaply). Kurbatov also accepted these in recording 08: cooperation with firms in "
        "other industries (10:07), legal loopholes (13:53), connections and lobbying (19:00 to 19:28) and "
        "having less debt than rivals, so the firm can borrow where they cannot (9:38). Each counts when the "
        "explanation says why rivals cannot copy it.</p>"
        "<p><b>Not accepted.</b> Higher revenue and growth are goals, not sources. Diversification does not "
        "create value for shareholders who can diversify on their own. «Good cost-benefit analysis» is not a "
        "source either: a rival can do the same analysis. Illegal shortcuts such as tax fraud may raise the "
        "expected cash flow, but they carry a large downside and are not a legitimate source.</p>"),
    "criteria": [
        "Each source earns 3 points: 1 for a valid source, 2 for the explanation of what it is and why a "
        "competitor cannot copy it. A source without the «why not copied» part earns at most 2.",
        "1 point for the common thread: competition drives the NPV of an easily copied project to zero, so a "
        "positive NPV needs a scarce competitive advantage. It may be stated once or inside each explanation.",
        "Counting: R&D and patents are one source; monopoly, licences and barriers to entry are one source; a "
        "cost advantage and cheaper labour abroad are one source. Economies of scale belong to barriers to entry "
        "when the argument is that entrants cannot reach the scale; they belong to the cost advantage when the argument "
        "is a lower unit cost; they count once. Two answers from the same group earn points once.",
        "Higher revenue, growth, diversification or «good analysis» earn nothing, as the question says. "
        "«High risk tolerance» earns points only if it is tied to an advantage rivals lack (for example the "
        "ability to fund long, risky research).",
        "Sentence budget: two sentences per source. Length is not rewarded.",
    ],
}
svar("hint1-1:2:", "tekst")


# ============================================================ hint1-1 oppgave 3: Kvernhus Bryggeri
tau3, r3 = 0.22, 0.08
capex3 = 54.0
dep3 = capex3 / 3
sales3, cost3, can3, rent3, ovh3, study3, lan3 = 70.0, 33.0, 6.0, 4.0, 2.5, 1.8, 0.05
nwc3 = [8.0, 12.0, 12.0, 12.0]          # nivå ved t = 0, 1, 2, 3; frigjøres ved t = 3,5
ebit3 = sales3 - cost3 - can3 - rent3 - dep3
nopat3 = ebit3 * (1 - tau3)
ocf3 = nopat3 + dep3
dnwc3 = [nwc3[0], nwc3[1] - nwc3[0], nwc3[2] - nwc3[1], nwc3[3] - nwc3[2]]
FCF3 = [-capex3 - dnwc3[0], ocf3 - dnwc3[1], ocf3 - dnwc3[2], ocf3 - dnwc3[3]]
FCF35 = nwc3[3]
assert near(ebit3, 9.0) and near(ocf3, 25.02)
assert FCF3 == [-62.0, ocf3 - 4.0, ocf3, ocf3]


def npv3(rate, fcf=FCF3, f35=FCF35, t35=3.5):
    return fcf[0] + sum(fcf[t] / (1 + rate) ** t for t in (1, 2, 3)) + f35 / (1 + rate) ** t35


pv3_ledd = [FCF3[t] / (1 + r3) ** t for t in (1, 2, 3)] + [FCF35 / (1 + r3) ** 3.5]
PV3 = sum(pv3_ledd)
NPV3 = FCF3[0] + PV3
assert near(NPV3, npv3(r3))
fak35 = (1 + r3) ** 3.5


def irr(f, lo=0.0, hi=1.0):
    for _ in range(200):
        m = (lo + hi) / 2
        if f(m) > 0:
            lo = m
        else:
            hi = m
    return lo


IRR3 = irr(npv3)
# Cideren (det mindre prosjektet)
I_c, C_c = 6.0, 7.8
NPV_c = C_c / (1 + r3) - I_c
IRR_c = C_c / I_c - 1
NPV3_ved_c = npv3(IRR_c)
led30 = [FCF3[t] / (1 + IRR_c) ** t for t in (1, 2, 3)] + [FCF35 / (1 + IRR_c) ** 3.5]
assert near(IRR_c, 0.30)
assert NPV3 > NPV_c > 0                 # NPV velger ølet
assert IRR3 < IRR_c and NPV3_ved_c < 0  # IRR velger cideren
assert 0.13 < IRR3 < 0.15
krysning3 = irr(lambda x: npv3(x) - (C_c / (1 + x) - I_c))   # renten der de to NPV-ene er like
assert near(npv3(krysning3), C_c / (1 + krysning3) - I_c, 1e-6) and r3 < krysning3 < IRR3
# Feller (NPV)
f3 = {
    "PV": PV3,
    "t3": npv3(r3, t35=3),
    "t4": npv3(r3, t35=4),
    "sunk": NPV3 - study3,
    "rente": npv3(r3, [FCF3[0]] + [x - lan3 * capex3 * (1 - tau3) for x in FCF3[1:]]),
    "leie_etter_skatt": npv3(r3, [FCF3[0]] + [x - rent3 * tau3 for x in FCF3[1:]]),
    "uten_kann": npv3(r3, [FCF3[0]] + [x + can3 * (1 - tau3) for x in FCF3[1:]]),
    "uten_leie": npv3(r3, [FCF3[0]] + [x + rent3 * (1 - tau3) for x in FCF3[1:]]),
    "nivå": npv3(r3, [-capex3 - nwc3[0]] + [ocf3 - nwc3[t] for t in (1, 2, 3)], f35=nwc3[3]),
    "med_overhead": npv3(r3, [FCF3[0]] + [x - ovh3 * (1 - tau3) for x in FCF3[1:]]),
}
half_enkel = npv3(r3, t35=3) - FCF35 / (1 + r3) ** 3 + FCF35 / ((1 + r3) ** 3 * (1 + r3 / 2))
# 1.08^3 × 1.04 i stedet for 1.08^3.5: en liten metodefeil som havner innenfor 1 % (se merknaden).
assert abs(half_enkel - NPV3) / NPV3 < 0.002
F3_leie_etter = (sales3 - cost3 - can3 - dep3) * (1 - tau3) + dep3 - rent3  # leien trukket fra etter skatt (feil)

t3_body = (
    "<p>Kvernhus Bryggeri ASA, a brewery with revenue of NOK 2.1 billion, a free cash flow of NOK 140 million "
    "last year and 35 million shares, considers a line of alcohol-free beer that will run for three years. "
    "Amounts in NOK million:</p>"
    "<ul>"
    "<li>The equipment costs 54 today. It is depreciated straight-line to zero over three years and has no "
    "resale value.</li>"
    "<li>Sales are 70 and cash operating costs 33 per year (Years 1 to 3).</li>"
    "<li>Customers who switch from Kvernhus's regular beer cost it 6 per year in operating profit (before "
    "tax).</li>"
    "<li>The line uses an empty storage hall that Kvernhus could otherwise rent out for 4 per year (rental "
    "income is taxed).</li>"
    "<li>The line is charged 2.5 per year of head-office costs, which do not change with the launch.</li>"
    "<li>A market study paid last year cost 1.8.</li>"
    "<li>The equipment is financed with a bank loan at 5% interest.</li>"
    "<li>Net working capital is 8 today and 12 from the end of Year 1 to the end of Year 3. It is recovered in "
    "full six months after the end of Year 3.</li>"
    "</ul>"
    "<p>The tax rate is 22%. The line has the same risk as Kvernhus, whose cost of capital is 8% per year "
    "(effective annual rate). Use 4 decimal places.</p>")

k3 = lambda lab: f"hint1-1:3:{lab}"
# ---- a
a3_sol = (
    "<p><b>Market study: exclude.</b> It is a sunk cost: the 1.8 has been paid whatever Kvernhus decides now.</p>"
    "<p><b>Interest on the bank loan: exclude.</b> Free cash flow is the cash flow of the project as if it were "
    "all-equity financed; the cost of financing is in the discount rate, so subtracting the interest would "
    "count it twice.</p>"
    f"<p><b>Rent of the storage hall: include, as a cost of 4 per year before tax.</b> It is an opportunity "
    f"cost: by using the hall Kvernhus gives up the rent it could earn. Rental income is taxed, so the loss after "
    f"tax is 4 × (1 − 0.22) = {F(rent3 * (1 - tau3), 2)} per year.</p>"
    "<p><b>Lost profit on regular beer: include, as a cost of 6 per year before tax.</b> It is cannibalisation, "
    "a negative side effect of the launch: only the change in Kvernhus's total cash flow counts.</p>"
    "<p><b>Head-office costs: exclude.</b> They are allocated, not incremental: Kvernhus pays them whether or not "
    "the line is launched.</p>"
    "<p>Only incremental cash flows count, so the firm-level figures in the text (revenue, last year's free cash "
    "flow, the number of shares) play no part either.</p>")
a3_crit = [
    "One point per item for the right decision with the right reason: sunk cost (exclude), financing cost "
    "already in the discount rate (exclude), opportunity cost (include), cannibalisation (include), not "
    "incremental (exclude).",
    "A decision without a reason earns half a point.",
    "Subtracting the interest is the classic error. Kurbatov, recording 18 at 54:48: «they subtract interest "
    "from EBIT because they panic during the exam».",
    "Bonus, not required: noting that the rent and the lost profit are before tax, so they also lower the tax "
    "bill.",
]
A3 = del_("a", 5,
          "<p>Does each of these belong in the free cash flows of the line? Answer with one sentence each: the "
          "market study, the interest on the bank loan, the rent of the storage hall, the lost profit on regular "
          "beer and the head-office costs.</p>",
          a3_sol, a3_crit)
svar(k3("a"), "tekst")

# ---- b
rad = lambda navn, v: "<tr><td>" + navn + "</td>" + "".join(
    f"<td class=\"n\">{x}</td>" for x in v) + "</tr>"
tab3 = ("<table class=\"data\"><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th>"
        "<th>Year 3.5</th></tr>"
        + rad("Sales", ["", "70", "70", "70", ""])
        + rad("Operating costs", ["", "−33", "−33", "−33", ""])
        + rad("Lost profit on regular beer", ["", "−6", "−6", "−6", ""])
        + rad("Forgone rent", ["", "−4", "−4", "−4", ""])
        + rad("Depreciation", ["", "−18", "−18", "−18", ""])
        + rad("EBIT", ["", F(ebit3, 2), F(ebit3, 2), F(ebit3, 2), ""])
        + rad("EBIT × (1 − 0.22)", ["", F(nopat3, 2), F(nopat3, 2), F(nopat3, 2), ""])
        + rad("+ Depreciation", ["", "18", "18", "18", ""])
        + rad("− CapEx", ["−54", "", "", "", ""])
        + rad("− ΔNWC", ["−8", "−4", "0", "0", "+12"])
        + rad("<b>FCF</b>", [f"<b>{F(FCF3[0], 2)}</b>", f"<b>{F(FCF3[1], 2)}</b>", f"<b>{F(FCF3[2], 2)}</b>",
                              f"<b>{F(FCF3[3], 2)}</b>", f"<b>{F(FCF35, 2)}</b>"])
        + "</table>")
b3_sol = (
    f"<p><b>Step 1. EBIT (Years 1 to 3).</b> The forgone rent and the lost profit on regular beer are costs of "
    f"the line; depreciation is 54/3 = 18 per year:<br>EBIT = 70 − 33 − 6 − 4 − 18 = <b>{F(ebit3, 2)}</b></p>"
    f"<p><b>Step 2. Operating cash flow.</b> EBIT × (1 − τ) + depreciation = {F(ebit3, 2)} × 0.78 + 18 = "
    f"{F(nopat3, 2)} + 18 = <b>{F(ocf3, 2)}</b>. Depreciation is not a payment, so it is added back after the "
    f"tax has been computed.</p>"
    "<p><b>Step 3. Working capital: use the change, not the level.</b> ΔNWC is +8 in Year 0 (an outflow), +4 in "
    "Year 1 (from 8 to 12), 0 in Years 2 and 3 and −12 in Year 3.5, when the working capital is recovered (an "
    "inflow).</p>"
    + tab3 +
    "<p>The market study, the interest and the head-office costs are left out, as in (a).</p>")
b3_crit = [
    "EBIT = 9 per year: the forgone rent and the lost profit on regular beer are subtracted before tax; the "
    "head-office costs, the interest and the market study are not.",
    f"Adds depreciation back after tax: operating cash flow {F(ocf3, 2)}. Forgetting it gives "
    f"{F(nopat3, 2)} per year. Kurbatov, recording 18 at 13:54: «One of the biggest mistakes is people "
    "forgetting to re-add depreciation».",
    "Uses the change in working capital: −8 in Year 0, −4 in Year 1, 0 in Years 2 and 3, +12 in Year 3.5. "
    "Subtracting the level (12 every year) is «forgetting the delta».",
    f"FCF = {F(FCF3[0], 2)}, {F(FCF3[1], 2)}, {F(FCF3[2], 2)}, {F(FCF3[3], 2)} and {F(FCF35, 2)} in Year 3.5. "
    "The recovery belongs in Year 3.5, not in Year 3.",
]
B3 = del_("b", 6, "<p>Find the free cash flow of the line in each year, including the year in which the working "
                  "capital is recovered.</p>", b3_sol, b3_crit)
svar(k3("b"), "tall", [
    tall("FCF<sub>0</sub>", FCF3[0], "NOK m", [-capex3, FCF3[0] - study3]),
    tall("FCF<sub>1</sub>", FCF3[1], "NOK m", [ocf3, ocf3 - nwc3[1], F3_leie_etter - 4.0]),
    tall("FCF<sub>2</sub>", FCF3[2], "NOK m", [ocf3 - nwc3[2], F3_leie_etter, ocf3 - ovh3 * (1 - tau3),
                                                 ocf3 + rent3 * (1 - tau3), nopat3]),
    tall("FCF<sub>3</sub>", FCF3[3], "NOK m", [ocf3 + FCF35, ocf3 - nwc3[3], F3_leie_etter]),
    tall("FCF<sub>3.5</sub> (working capital recovered)", FCF35, "NOK m"),
], merknad="Fellene er arbeidskapitalens nivå i stedet for endringen, leien trukket fra etter skatt, "
           "hovedkontorkostnadene tatt med og frigjøringen lagt i år 3.")

# ---- c
c3_sol = (
    f"<p>Discount each free cash flow at 8%. The recovery comes 3.5 years from now, so the 8% must be compounded "
    f"over three and a half years: 1.08<sup>3.5</sup> = 1.08<sup>3</sup> × √1.08 = {F((1 + r3) ** 3, 6)} × "
    f"{F(math.sqrt(1 + r3), 6)} = {F(fak35, 6)}.</p>"
    f"<p>NPV = −62 + {F(FCF3[1], 2)}/1.08 + {F(FCF3[2], 2)}/1.08<sup>2</sup> + {F(FCF3[3], 2)}/1.08<sup>3</sup> + "
    f"12/1.08<sup>3.5</sup><br>= −62 + {sm(pv3_ledd, PV3)} = <b>NOK {F(NPV3)} million</b></p>"
    f"<p><b>Kvernhus should launch the line</b>: the NPV is positive. The question asks for the NPV of the "
    f"project, not for the value of Kvernhus and not only for the present value of the future cash flows "
    f"({F(PV3)}): the 62 paid today must be subtracted.</p>")
c3_crit = [
    "Values the line, not Kvernhus as a whole: the firm-level revenue, free cash flow and share count are not "
    "used.",
    f"Discounts the Year-3.5 recovery with 1.08^3.5 = {F(fak35)}. Treating it as a Year-3 cash flow gives "
    f"{F(f3['t3'], 2)}, as a Year-4 cash flow {F(f3['t4'], 2)}. Using 1.04 for the half year instead of "
    "√1.08 is a small method error (the NPV moves by less than 0.01).",
    f"Reports the NPV, {F(NPV3)}, not the present value of the future cash flows ({F(PV3)}). Kurbatov, "
    "recording 18 at 52:38: «I say find the NPV of the project, then just calculating PV is not enough».",
    "Concludes: launch, since the NPV is positive.",
]
C3 = del_("c", 3, "<p>Find the NPV of the line. Should Kvernhus launch it?</p>", c3_sol, c3_crit)
d35 = npv3(r3 + 0.00005) - NPV3   # avrunding av diskonteringsfaktorene
svar(k3("c"), "tall", [tall("NPV", NPV3, "NOK m", list(f3.values()), d35)],
     merknad="Fellene: PV uten investeringen, frigjøringen i år 3 eller år 4, sunk cost tatt med, renter "
             "trukket fra, leien etter skatt, kannibalisering eller leie utelatt, nivå i stedet for endring i "
             "arbeidskapital, hovedkontorkostnader tatt med. 1.08^3 × 1.04 for halvåret gir "
             + F(half_enkel) + " og ligger innenfor toleransen; det er en liten metodefeil, ikke en felle.")

# ---- d
d3_sol = (
    f"<p><b>Step 1. The cider.</b> NPV = 7.8/1.08 − 6 = {F(C_c / (1 + r3))} − 6 = <b>{F(NPV_c)}</b>. With a "
    f"single cash flow after one year the IRR solves 7.8/(1 + IRR) = 6, so IRR = 7.8/6 − 1 = <b>{P(IRR_c)}</b>.</p>"
    f"<p><b>Step 2. The beer line at 30%.</b> NPV(30%) = −62 + {F(FCF3[1], 2)}/1.3 + {F(FCF3[2], 2)}/1.3<sup>2</sup> + "
    f"{F(FCF3[3], 2)}/1.3<sup>3</sup> + 12/1.3<sup>3.5</sup><br>= −62 + {sm(led30, sum(led30))} = "
    f"<b>{F(NPV3_ved_c)}</b></p>"
    f"<p>The cash flows are one outflow followed by inflows, so the NPV falls as the rate rises. It is negative at "
    f"30%, so the IRR of the beer line is below 30% (it is about {P(IRR3, 1)}).</p>"
    f"<p><b>Step 3. The choice.</b> The IRR rule picks the cider (30% against about {P(IRR3, 1)}). The NPV rule "
    f"picks the beer line ({F(NPV3)} against {F(NPV_c)}). <b>Kvernhus should launch the beer line</b>: the two "
    f"launches exclude each other; the NPV rule maximises the value created for the shareholders.</p>"
    f"<p><b>Why the rules disagree.</b> IRR is a rate and ignores the scale of a project: the cider earns 30% on "
    f"only NOK 6 million, while the beer line earns about {P(IRR3, 0)} on NOK 62 million and so adds more value "
    f"in kroner. The cider's higher IRR would matter only if it could be repeated or scaled up at the same "
    f"return. Timing adds to the gap: the cider pays back after one year, the beer line over 3.5 years, so the "
    f"beer line's NPV falls faster as the rate rises. The two NPVs are equal at {P(krysning3)} (the crossover "
    f"rate); below it the beer line has the higher NPV.</p>")
d3_crit = [
    f"Cider: NPV = {F(NPV_c)} and IRR = 30%.",
    f"NPV of the beer line at 30% = {F(NPV3_ved_c)}, with the conclusion that its IRR is below 30% because the "
    "NPV falls with the rate (one outflow, then inflows). The exact IRR (about 14.1%) is not required.",
    "Chooses the beer line: with mutually exclusive projects the higher NPV wins.",
    "Why the rules disagree: IRR ignores scale, a high rate on a small investment against a lower rate on a "
    "large one. Bonus, not required: the cider would win only if it could be scaled up at the same return.",
    f"Timing (the cider pays after one year, the beer line over 3.5 years; crossover rate {P(krysning3)}) is "
    "also accepted as a reason: half the reason point on its own, the full point together with scale.",
]
D3 = del_("d", 6,
          "<p>The product team can run only one launch. The alternative is a cider that costs 6 today and gives a "
          "free cash flow of 7.8 after one year and nothing after (side effects included). Find the NPV and the "
          "IRR of the cider and the NPV of the beer line at a discount rate equal to the cider's IRR. Which "
          "launch should Kvernhus choose? Why do the NPV rule and the IRR rule disagree here?</p>", d3_sol, d3_crit)
svar(k3("d"), "blandet", [
    tall("NPV (cider)", NPV_c, "NOK m", [C_c / (1 + r3)]),
    tall("IRR (cider)", IRR_c * 100, "%"),
    tall("NPV of the beer line at 30%", NPV3_ved_c, "NOK m"),
], tallPoeng=3, tekstLedd="Which launch should Kvernhus choose, and why do the two rules disagree?")

H11_E3 = {"n": 3, "title": "Capital budgeting", "points": 20, "topic": "Project cash flows, NPV and IRR",
          "chapters": [1, 2],
          "merke": "Forelesning 18 (Wrap-up), 6:41: «it could be a trap in the exam»",
          "body": t3_body, "parts": [A3, B3, C3, D3]}


# ============================================================ hint1-1 oppgave 4: Skaret Entreprenør
rf4, tau4, d4 = 0.04, 0.22, 0.40
rE_v, dv_v = 0.124, 0.30                 # Voltvei: D/V gitt
rE_l, de_l = 0.13, 0.50                  # Ladeport: D/E gitt
dv_l = de_l / (1 + de_l)
rU_v = (1 - dv_v) * rE_v + dv_v * rf4
rU_l = (1 - dv_l) * rE_l + dv_l * rf4
rU4 = (rU_v + rU_l) / 2
DE4 = d4 / (1 - d4)
rE4 = rU4 + DE4 * (rU4 - rf4)
w4 = (1 - d4) * rE4 + d4 * rf4 * (1 - tau4)
assert near(w4, rU4 - d4 * tau4 * rf4)    # snarveien
assert near((1 - d4) * rE4 + d4 * rf4, rU4)  # pre-tax WACC = r_U (identitet)
assert w4 < rU4
assert near(rU4, 0.0994) and near(rE4, 0.139) and near(w4, 0.09588)
I4 = 300.0
FC4 = [125.0, 135.0, 115.0]
V4 = [0.0] * 4
for t in (2, 1, 0):
    V4[t] = (FC4[t] + V4[t + 1]) / (1 + w4)
NPV4 = V4[0] - I4
D4 = [d4 * V4[t] for t in range(3)]
vu_ledd = [FC4[t - 1] / (1 + rU4) ** t for t in (1, 2, 3)]
VU4 = sum(vu_ledd)
TS4 = [tau4 * rf4 * D4[t] for t in range(3)]
ts_ledd = [TS4[t - 1] / (1 + rU4) ** t for t in (1, 2, 3)]
PVTS4 = sum(ts_ledd)
APV4 = VU4 + PVTS4
assert near(APV4, V4[0], 1e-12)           # WACC = APV
assert NPV4 > 0
# Feller
f4 = {}
f4["rU_l_DEvekt"] = (1 - de_l) * rE_l + de_l * rf4
f4["rU_snitt_DEvekt"] = (rU_v + f4["rU_l_DEvekt"]) / 2
f4["rU_v_skatt"] = (1 - dv_v) * rE_v + dv_v * rf4 * (1 - tau4)
f4["rU_l_skatt"] = (1 - dv_l) * rE_l + dv_l * rf4 * (1 - tau4)
f4["rU_snitt_skatt"] = (f4["rU_v_skatt"] + f4["rU_l_skatt"]) / 2
f4["rE_DVsomDE"] = rU4 + d4 * (rU4 - rf4)
f4["w_DVsomDE"] = (1 - d4) * f4["rE_DVsomDE"] + d4 * rf4 * (1 - tau4)
f4["w_utenskatt"] = rU4
f4["w_DEvekt"] = (1 - DE4) * rE4 + DE4 * rf4 * (1 - tau4)


def verdi(rate):
    return sum(FC4[t - 1] / (1 + rate) ** t for t in (1, 2, 3))


f4["V0_rU"] = verdi(rU4)
f4["V0_egen"] = verdi(0.081)
f4["V0_rE"] = verdi(rE4)
f4["D1_cum"] = d4 * (V4[1] + FC4[0])
f4["D0_V0minusI"] = d4 * NPV4
f4["D_DE"] = [DE4 * V4[t] for t in range(3)]
pv_rd = sum(TS4[t - 1] / (1 + rf4) ** t for t in (1, 2, 3))
f4["PVTS_rD"] = pv_rd
f4["VL_rD"] = VU4 + pv_rd
TS_skjev = [tau4 * rf4 * x for x in (D4[1], D4[2], 0.0)]
f4["PVTS_skjev"] = sum(TS_skjev[t - 1] / (1 + rU4) ** t for t in (1, 2, 3))
f4["PVTS_w"] = sum(TS4[t - 1] / (1 + w4) ** t for t in (1, 2, 3))
# Feil som faktisk gir WACC over r_U (til hale e)
rE_uavlev = rE_l + DE4 * (rE_l - rf4)            # Ladeports r_E relevert uten å avlevere først
w_uavlev = (1 - d4) * rE_uavlev + d4 * rf4 * (1 - tau4)
w_DEgjeld = (1 - d4) * rE4 + DE4 * rf4 * (1 - tau4)  # D/E brukt som gjeldsvekt (vektene summerer ikke til 1)
w_plusskatt = (1 - d4) * rE4 + d4 * rf4 * (1 + tau4)  # (1 + τ) i stedet for (1 − τ)
for x in (w_uavlev, w_DEgjeld, w_plusskatt):
    assert x > rU4
assert not f4["w_DVsomDE"] > rU4 and near(f4["w_utenskatt"], rU4)   # de gamle eksemplene gir ikke WACC > r_U
assert near(rE_uavlev, 0.19)
w4R = round(w4, 4)
drift_V0 = verdi(w4R) - V4[0]
assert abs(drift_V0) < 0.05

k4 = lambda lab: f"hint1-1:4:{lab}"
t4_body = (
    "<p>Skaret Entreprenør, a construction company, considers building and running a charging park for electric "
    "trucks under a three-year contract. The park costs NOK 300 million today and is expected to generate free "
    "cash flows of NOK 125 million, NOK 135 million and NOK 115 million at the end of Years 1, 2 and 3. Then it "
    "is handed over to the customer for free. Skaret's own cost of capital is 8.1%, but the charging business "
    "has a different risk. Two listed charging-network operators have the same business risk as the park:</p>"
    "<table class=\"data\"><tr><th></th><th>Voltvei</th><th>Ladeport</th></tr>"
    "<tr><td>Cost of equity</td><td class=\"n\">12.4%</td><td class=\"n\">13.0%</td></tr>"
    "<tr><td>Leverage</td><td class=\"n\">D/V = 0.30</td><td class=\"n\">D/E = 0.50</td></tr></table>"
    "<p>Skaret will finance the park with a constant debt-to-value ratio of 40%. All debt in this exercise is "
    "risk-free (debt beta zero) and costs the risk-free rate of 4%. The tax rate is 22%. Use 4 decimal "
    "places.</p>")

# ---- a
a4_sol = (
    "<p>The park's risk differs from Skaret's construction business, so Skaret's own 8.1% is the wrong rate. "
    "Unlever each comparable with its own leverage. The debt is risk-free, so r<sub>D</sub> = r<sub>f</sub> = 4%; "
    "r<sub>U</sub> is the pre-tax WACC (no taxes in r<sub>U</sub>).</p>"
    f"<p><b>Voltvei.</b> D/V = 0.30 is given, so E/V = 0.70:<br>"
    f"r<sub>U</sub> = 0.70(0.124) + 0.30(0.04) = {summ([0.7 * rE_v, 0.3 * rf4], rU_v)}, so "
    f"<b>r<sub>U</sub> = {P(rU_v)}</b></p>"
    f"<p><b>Ladeport.</b> D/E = 0.50, so D/V = 0.50/1.50 = {F(dv_l)} and E/V = {F(1 - dv_l)}:<br>"
    f"r<sub>U</sub> = {F(1 - dv_l)}(0.13) + {F(dv_l)}(0.04) = {summ([(1 - dv_l) * rE_l, dv_l * rf4], rU_l, 6)}, so "
    f"<b>r<sub>U</sub> = {P(rU_l)}</b></p>"
    f"<p><b>Average.</b> r<sub>U</sub> = ({F(rU_v)} + {F(rU_l)})/2 = <b>{F(rU4)} ({P(rU4)})</b></p>")
a4_crit = [
    "Unlevers each comparable separately with its own leverage (pre-tax weights, no (1 − τ)).",
    f"Voltvei: D/V = 0.30 used directly, r_U = {P(rU_v)}.",
    f"Ladeport: converts D/E = 0.50 into D/V = {F(dv_l)} before weighting, r_U = {P(rU_l)}. Using 0.50 as the "
    f"weight gives {P(f4['rU_l_DEvekt'])} and an average of {P(f4['rU_snitt_DEvekt'])}.",
    f"Average r_U = {P(rU4)}. Using Skaret's own 8.1% is the trap of this exercise: the park has a different "
    "risk.",
]
A4 = del_("a", 4, "<p>Find the unlevered cost of capital of each comparable firm and use their average as the "
                  "unlevered cost of capital of the park.</p>", a4_sol, a4_crit)
svar(k4("a"), "tall", [
    tall("r<sub>U</sub> (Voltvei)", rU_v * 100, "%", [f4["rU_v_skatt"] * 100]),
    tall("r<sub>U</sub> (Ladeport)", rU_l * 100, "%", [f4["rU_l_DEvekt"] * 100, f4["rU_l_skatt"] * 100]),
    tall("r<sub>U</sub> (park, average)", rU4 * 100, "%", [f4["rU_snitt_DEvekt"] * 100, f4["rU_snitt_skatt"] * 100,
                                                          8.1]),
])

# ---- b
b4_sol = (
    f"<p><b>Step 1. Convert the target ratio.</b> MM II needs D/E: D/E = 0.40/0.60 = <b>{F(DE4)}</b>.</p>"
    f"<p><b>Step 2. Cost of equity (MM II).</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) "
    f"= {F(rU4)} + {F(DE4)}({F(rU4)} − 0.04) = {summ([rU4, DE4 * (rU4 - rf4)], rE4)}, so "
    f"<b>r<sub>E</sub> = {P(rE4)}</b></p>"
    f"<p><b>Step 3. After-tax WACC.</b> r<sub>wacc</sub> = 0.60({F(rE4)}) + 0.40(0.04)(1 − 0.22) = "
    f"{summ([(1 - d4) * rE4, d4 * rf4 * (1 - tau4)], w4, 5)}, so <b>r<sub>wacc</sub> = {P(w4, 3)}</b></p>"
    f"<p><b>Check.</b> r<sub>U</sub> − (D/V)τr<sub>D</sub> = {F(rU4)} − 0.40(0.22)(0.04) = {F(rU4)} − 0.00352 = "
    f"{F(w4, 5)} ✓. This is an identity once r<sub>E</sub> comes from MM II, so it catches arithmetic slips "
    f"only.</p>")
b4_crit = [
    f"Converts D/V = 0.40 into D/E = {F(DE4)} for MM II. Using 0.40 as D/E gives r_E = {P(f4['rE_DVsomDE'])}. "
    "Kurbatov, recording 09 at 51:10: «here it's not D over V it's D over E strictly».",
    f"r_E = {P(rE4)}.",
    f"r_wacc = {P(w4, 3)}: (1 − τ) on r_D only, weights E/V = 0.60 and D/V = 0.40.",
    "Bonus, not required: the shortcut r_U − (D/V)τr_D as a check.",
]
B4 = del_("b", 4, "<p>Find the cost of equity and the after-tax WACC of the park.</p>", b4_sol, b4_crit)
svar(k4("b"), "tall", [
    tall("r<sub>E</sub>", rE4 * 100, "%", [f4["rE_DVsomDE"] * 100, rU4 * 100]),
    tall("r<sub>wacc</sub>", w4 * 100, "%", [f4["w_DVsomDE"] * 100, f4["w_utenskatt"] * 100, f4["w_DEvekt"] * 100]),
])

# ---- c
tab4 = ("<table class=\"data\"><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr>"
        + rad("Free cash flow", ["−300", "125", "135", "115"])
        + rad("V<sup>L</sup><sub>t</sub> (after the year-t cash flow)",
              [F(V4[0]), F(V4[1]), F(V4[2]), "0"])
        + rad("Debt capacity D<sub>t</sub> = 0.40 V<sup>L</sup><sub>t</sub>",
              [F(D4[0]), F(D4[1]), F(D4[2]), "0"])
        + "</table>")
c4_sol = (
    f"<p>With a constant D/V one WACC discounts every year. Work backwards from Year 3, so the value at each date "
    f"(and with it the debt capacity) comes out of the same calculation:</p>"
    f"<p>V<sup>L</sup><sub>2</sub> = 115/{F(1 + w4, 5)} = <b>{F(V4[2])}</b><br>"
    f"V<sup>L</sup><sub>1</sub> = (135 + {F(V4[2])})/{F(1 + w4, 5)} = <b>{F(V4[1])}</b><br>"
    f"V<sup>L</sup><sub>0</sub> = (125 + {F(V4[1])})/{F(1 + w4, 5)} = <b>NOK {F(V4[0])} million</b></p>"
    f"<p><b>NPV</b> = {F(V4[0])} − 300 = <b>NOK {F(NPV4)} million</b></p>"
    f"<p><b>Debt capacity.</b> D<sub>t</sub> = 0.40 × V<sup>L</sup><sub>t</sub>: D<sub>0</sub> = <b>{F(D4[0])}</b>, "
    f"D<sub>1</sub> = <b>{F(D4[1])}</b>, D<sub>2</sub> = <b>{F(D4[2])}</b> and D<sub>3</sub> = 0. The debt is "
    f"repaid as the contract runs out, because the value it is tied to falls.</p>" + tab4)
c4_crit = [
    f"Discounts the free cash flows at r_wacc = {P(w4, 3)}. Using r_U gives the unlevered value "
    f"({F(f4['V0_rU'], 2)}); Skaret's own 8.1% gives {F(f4['V0_egen'], 2)}.",
    f"V^L_0 = {F(V4[0])} and NPV = {F(NPV4)}: the 300 is subtracted, since the question asks for the NPV.",
    f"D_t = 0.40 × V^L_t, with V^L_t the value of the cash flows after year t: D_0 = {F(D4[0])}, "
    f"D_1 = {F(D4[1])}, D_2 = {F(D4[2])}. Including the year-t cash flow in V^L_t is the classic error.",
]
C4 = del_("c", 4, "<p>Find the levered value of the park today with the WACC method and its NPV. How much debt "
                  "does the park support today and at the end of Years 1 and 2 (its debt capacity)?</p>",
          c4_sol, c4_crit)
svar(k4("c"), "tall", [
    tall("V<sup>L</sup><sub>0</sub> (WACC)", V4[0], "NOK m", [f4["V0_rU"], f4["V0_egen"], f4["V0_rE"]], drift_V0),
    tall("NPV", NPV4, "NOK m", [V4[0], f4["V0_rU"] - I4, f4["V0_egen"] - I4], drift_V0),
    tall("D<sub>0</sub>", D4[0], "NOK m", [f4["D_DE"][0], f4["D0_V0minusI"]], d4 * drift_V0),
    tall("D<sub>1</sub>", D4[1], "NOK m", [f4["D_DE"][1], f4["D1_cum"]]),
    tall("D<sub>2</sub>", D4[2], "NOK m", [f4["D_DE"][2], d4 * (V4[2] + FC4[1])]),
], merknad="Fellene: verdien med r_U, med Skarets egne 8,1 % og med r_E; PV i stedet for NPV; D/E brukt som "
           "andel av verdien; årets kontantstrøm tatt med i V_t.")

# ---- d
d4_sol = (
    f"<p><b>Step 1. Unlevered value.</b> The same free cash flows, discounted at r<sub>U</sub> = {P(rU4)}:<br>"
    f"V<sup>U</sup> = 125/{F(1 + rU4)} + 135/{F(1 + rU4)}<sup>2</sup> + 115/{F(1 + rU4)}<sup>3</sup> = "
    f"{sm(vu_ledd, VU4)} = <b>NOK {F(VU4)} million</b></p>"
    f"<p><b>Step 2. The interest tax shields.</b> Interest in year t is paid on the debt at the start of the "
    f"year: TS<sub>t</sub> = τ × r<sub>D</sub> × D<sub>t−1</sub> = 0.22 × 0.04 × D<sub>t−1</sub>:<br>"
    f"TS<sub>1</sub> = 0.0088 × {F(D4[0])} = <b>{F(TS4[0])}</b>, TS<sub>2</sub> = 0.0088 × {F(D4[1])} = "
    f"<b>{F(TS4[1])}</b>, TS<sub>3</sub> = 0.0088 × {F(D4[2])} = <b>{F(TS4[2])}</b></p>"
    f"<p><b>Step 3. Discount at r<sub>U</sub>.</b> With a constant D/V the debt moves with the value of the park, "
    f"so the shields carry the park's risk:<br>"
    f"PV(TS) = {F(TS4[0])}/{F(1 + rU4)} + {F(TS4[1])}/{F(1 + rU4)}<sup>2</sup> + {F(TS4[2])}/{F(1 + rU4)}<sup>3</sup> "
    f"= {sm(ts_ledd, PVTS4)} = <b>NOK {F(PVTS4)} million</b></p>"
    f"<p><b>Step 4. APV.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {sm([VU4, PVTS4], APV4)} = "
    f"<b>NOK {F(APV4)} million</b>, the same as in (c), so the NPV is again {F(APV4 - I4)}.</p>"
    f"<p><b>Check.</b> The two methods agree. The check is not fully independent (the debt came from the WACC "
    f"values), but it catches a wrong rate on the shields: discounted at r<sub>D</sub> = 4% they would be worth "
    f"{F(f4['PVTS_rD'])} and the value {F(f4['VL_rD'])}.</p>")
d4_crit = [
    f"V^U = {F(VU4)}, discounted at r_U.",
    f"Tax shields on the debt at the start of each year: {F(TS4[0])}, {F(TS4[1])} and {F(TS4[2])}. Using the "
    "debt at the end of the year shifts the shields one year.",
    f"PV(TS) = {F(PVTS4)}, discounted at r_U (at r_D it would be {F(f4['PVTS_rD'])}). Bonus, not required: the "
    "reason (constant D/V).",
    f"V^L = {F(APV4)}, equal to (c). A gap of about 0.001 is rounding; a larger gap is an error.",
]
D4p = del_("d", 5, "<p>Using the debt capacity from (c), find the unlevered value of the park, the present value "
                   "of the interest tax shields and the levered value with the APV method. Compare with (c).</p>",
           d4_sol, d4_crit)
drift_VU = verdi(round(rU4, 4)) - VU4
svar(k4("d"), "tall", [
    tall("V<sup>U</sup>", VU4, "NOK m", [V4[0], f4["V0_egen"]], drift_VU),
    tall("PV(TS)", PVTS4, "NOK m", [f4["PVTS_rD"], f4["PVTS_skjev"], sum(TS4)], tolmax=0.003),
    tall("V<sup>L</sup> (APV)", APV4, "NOK m", [f4["VL_rD"], VU4 + f4["PVTS_skjev"]], drift_V0),
], merknad="PV(TS) har tol 0,003 fordi skjoldet diskontert med r_wacc gir " + F(f4["PVTS_w"])
           + f" ({abs(f4['PVTS_w'] / PVTS4 - 1):.2%} unna), en metode kriteriene avviser.")
assert abs(f4["PVTS_w"] / PVTS4 - 1) > 0.003 > 0.0002

# ---- e
e4_sol = (
    f"<p><b>r<sub>wacc</sub> = {P(w4, 3)} is below r<sub>U</sub> = {P(rU4)}</b>, by (D/V)τr<sub>D</sub> = "
    f"0.40 × 0.22 × 4% = 0.352 percentage points.</p>"
    "<p><b>Why.</b> r<sub>U</sub> is the return the park's assets must earn whatever the financing; without taxes "
    "the WACC would equal r<sub>U</sub> (MM). The only difference is the (1 − τ) on the cost of debt: interest is "
    "tax-deductible, so debt is cheaper after tax; the WACC method builds the value of the tax shield into a "
    "lower discount rate. APV instead discounts at r<sub>U</sub> and adds the shield separately, which is why the "
    f"two methods both give {F(V4[0])}.</p>"
    "<p><b>A WACC above r<sub>U</sub></b> should ring an alarm bell. With risk-free debt and a positive tax rate "
    "it cannot happen, so it signals a calculation error rather than debt that destroys value. Typical "
    f"culprits: relevering a comparable's r<sub>E</sub> without unlevering it first (Ladeport's 13% gives "
    f"r<sub>E</sub> = {P(rE_uavlev, 1)} and a WACC of {P(w_uavlev)}), using D/E = {F(DE4)} as the weight on debt "
    f"({P(w_DEgjeld)}), writing (1 + τ) instead of (1 − τ) ({P(w_plusskatt)}) or any other r<sub>E</sub> that is "
    "too high.</p>")
e4_crit = [
    f"States that r_wacc is below r_U, with both numbers ({P(w4, 3)} and {P(rU4)}).",
    "Explains why: the only difference is the (1 − τ) on r_D, so the gap is the tax advantage of debt, "
    "(D/V)τr_D. «Debt is cheaper after tax» is the minimum accepted answer.",
    "A WACC above r_U signals a calculation error. Kurbatov, recording 09 at 53:22: «it should be like a small "
    "alarming bell ringing in your head». An example of such an error is a bonus, not required.",
    "The economic reading («the debt destroys value») earns the point only if the answer adds that this "
    "cannot happen with risk-free debt and a positive tax rate, so it must be an error.",
    "Not required: the pre-tax WACC (it equals r_U).",
]
E4p = del_("e", 3, "<p>Compare the park's after-tax WACC with its unlevered cost of capital. Why do they differ? "
                   "What would it tell you if you had found a WACC above r<sub>U</sub>?</p>", e4_sol, e4_crit)
svar(k4("e"), "tekst")

H11_E4 = {"n": 4, "title": "Valuation with leverage", "points": 20, "topic": "WACC and APV",
          "chapters": [4, 17, 18, 19],
          "merke": "Forelesning 09 (Valuation with Leverage II), 8:09: «it could very easily be an exam question»",
          "body": t4_body, "parts": [A4, B4, C4, D4p, E4p]}


# ============================================================ hint2-3 oppgave 1: børsnotert mot privat
H23_E1 = {
    "n": 1, "title": "Security issues", "points": 10, "topic": "Going public", "chapters": [14],
    "merke": "Forelesning 07 (Security Issues), 38:30: «again this could be on the exam»",
    "body": ("<p>Ravndal Software AS is a profitable software company owned by its three founders and a venture "
             "fund. The owners are considering listing the company on Oslo Børs.</p>"
             "<p>Give one benefit and one cost of being a publicly traded company. Then give one benefit and one "
             "cost of staying private. Use four different reasons: turning a benefit of one form into a cost of "
             "the other (for example «public firms must publish a lot of information» and «private firms need "
             "not publish») counts as one reason. Keep explanations short, 1–2 sentences per reason.</p>"),
    "solution": (
        "<p><b>Public, benefit: access to capital.</b> A listed firm can raise new equity from a large pool of "
        "investors at a competitive price whenever it needs to (seasoned offerings). It can also pay for "
        "acquisitions with its own shares.</p>"
        "<p><b>Public, cost: the costs of going and being public.</b> The IPO itself costs underwriter fees of "
        "around 5–7% of the proceeds plus the underpricing. Afterwards the firm faces reporting, audit and "
        "disclosure requirements that are expensive and also reveal information to competitors.</p>"
        "<p><b>Private, benefit: control and a long horizon.</b> A few large owners keep control, monitor "
        "management closely and can follow long-term plans without pressure to meet quarterly earnings targets "
        "(no short-termism).</p>"
        "<p><b>Private, cost: illiquid and undiversified ownership.</b> The owners cannot easily sell their shares "
        "or spread their wealth over many firms, so they carry concentrated risk; without a market price they "
        "also get no price signal on how investors judge the firm's decisions.</p>"
        "<p><b>Also accepted.</b> Public benefits: liquidity and an easy exit for shareholders, price discovery "
        "(the share price as a traffic light after decisions such as an acquisition), analyst coverage and "
        "visibility, shares as currency for stock-based pay. Public costs: market pressure and short-termism, "
        "loss of control as ownership spreads (dual-class shares can limit it), exposure to hostile takeovers. "
        "Private benefits: confidentiality, lower compliance costs, owners who monitor management closely. "
        "Private costs: outside financing that is scarcer and more expensive, no market price for valuing the "
        "firm. Transparency counts in either box, as a benefit (discipline and better governance) or as a cost "
        "(expensive, reveals information), when the explanation says which.</p>"),
    "criteria": [
        "Four boxes, 2.5 points each: 1 for a valid reason in the right box, 1.5 for the mechanism in 1–2 "
        "sentences.",
        "Four different reasons. A box filled with the mirror image of another box (public cost «heavy "
        "reporting», private benefit «no reporting») earns at most 1 point: the two boxes count as one reason.",
        "Transparency, monitoring and market pressure can be argued as a benefit or a cost; the explanation "
        "decides the box. Kurbatov, recording 07 at 39:38, on reporting and transparency: «it's both a benefit "
        "and the cost at the same time».",
        "«More cash» on its own is not enough: the answer must say why a listing gives access to capital that a "
        "private firm lacks.",
        "Sentence budget: 1–2 sentences per reason. Length is not rewarded.",
    ],
}
svar("hint2-3:1:", "tekst")


# ============================================================ hint2-3 oppgave 2: Kvalvik Robotics
VG, VB, q, n2, X2 = 168.0, 48.0, 0.4, 2.4, 18.0
EV2 = q * VG + (1 - q) * VB
P0_2 = EV2 / n2
# (b) begge typer sponser: verdien er fortsatt EV2
Pb = (EV2 - X2) / n2
mb = X2 / Pb
assert near((n2 + mb) * Pb, EV2) and near(mb * Pb, X2)
# (c) bare god type sponser
Pc = (VG - X2) / n2
mc = X2 / Pc
Pnon = VB / n2
assert near((n2 + mc) * Pc, VG) and near(mc * Pc, X2)
assert Pc > Pnon                        # god type vil sponse
# (d) dårlig type kopierer
assert Pc > Pnon                        # dårlig type får 62,5 mot 20
sann_verdi_nye = VB / (n2 + mc)         # hva en aksje i dårlig Kvalvik egentlig er verdt
Xterskel = VG - VB
assert near((VG - Xterskel) / n2, Pnon)
assert (VG - Xterskel) / n2 < P0_2      # god type taper på å sponse ved terskelen
# (e) sertifisering
Cmax = VG - EV2
assert near((VG - Cmax) / n2, P0_2)
assert (VB - 0) / n2 < P0_2             # dårlig type kjøper ikke
for a_, b_ in ((P0_2, Pb), (Pc, Pnon), (Cmax, Xterskel), (Pc, Cmax), (mb, mc)):
    assert not near(a_, b_)
assert near(P0_2, 40) and near(Pb, 32.5) and near(Pc, 62.5) and near(Pnon, 20) and near(Cmax, 72)

k2 = lambda lab: f"hint2-3:2:{lab}"
t2_body = (
    "<p>Kvalvik Robotics ASA owns a patent on a robot gripper and nothing else: no cash, no debt. The patent is "
    "worth NOK 168 million (good type) or NOK 48 million (bad type). Kvalvik's managers know which; the market "
    "only puts a 40% probability on the good type. The founders own all 2.4 million shares and will sell them at "
    "the market price right after any announcement and share issue, so management maximises that price. "
    "Everyone is risk-neutral and the discount rate is zero.</p>")
a2_sol = (f"<p>The market cannot tell the types apart, so it prices Kvalvik at the expected value of the patent "
          f"under its own beliefs:</p>"
          f"<p>V = 0.4 × 168 + 0.6 × 48 = {summ([q * VG, (1 - q) * VB], EV2, 1)}, so P<sub>0</sub> = "
          f"{F(EV2, 0)}/2.4 = <b>NOK {F(P0_2, 2)} per share</b></p>")
a2_crit = ["Expected value with the market's 40%/60% beliefs, not the managers' knowledge: V = 96.",
           f"P_0 = {F(P0_2, 2)} per share."]
A2 = del_("a", 2, "<p>What is Kvalvik's share price today?</p>", a2_sol, a2_crit)
svar(k2("a"), "tall", [tall("P<sub>0</sub>", P0_2, "NOK per share", [VG / n2, VB / n2])])

b2_body = ("<p>Kvalvik considers sponsoring a cycling team for NOK 18 million, raised by issuing new shares. "
           "Everyone knows the sponsorship generates no cash flow at all.</p>"
           "<p>Suppose the market believes that Kvalvik sponsors whatever its type. How many new shares must it "
           "issue? What is the share price afterwards?</p>")
b2_sol = (f"<p>If both types sponsor, the sponsorship tells the market nothing: the patent is still worth 96 in "
          f"expectation. The 18 raised is spent on something worth nothing, so after the issue the firm is still "
          f"worth 96 in total, now shared by 2.4 + m million shares.</p>"
          f"<p>Two equations: m × P = 18 and (2.4 + m) × P = 96. Subtract the first from the second: 2.4P = 78, "
          f"so <b>P = NOK {F(Pb, 2)}</b> and <b>m = 18/{F(Pb, 1)} = {F(mb)} million new shares</b>.</p>"
          f"<p>The price falls by {F(P0_2 - Pb, 2)} because the old shareholders pay for a sponsorship that creates "
          f"no value: 2.4 × {F(P0_2 - Pb, 2)} = 18.</p>")
b2_crit = ["Firm value after the issue stays at 96: the sponsorship adds nothing and reveals nothing.",
           "Two equations (new shares × price = 18; all shares × price = 96), or the share of the firm sold, "
           "18/96 = 18.75%.",
           f"P = {F(Pb, 2)} and m = {F(mb)} million. Classic error: issuing at today's price of {F(P0_2, 0)} "
           f"({F(X2 / P0_2, 2)} million shares), which ignores that the price falls when the money is spent.",
           "Bonus, not required: the check m × P = 18."]
B2 = del_("b", 4, b2_body, b2_sol, b2_crit)
svar(k2("b"), "tall", [tall("New shares", mb, "m shares", [X2 / P0_2]),
                       tall("Share price", Pb, "NOK per share", [P0_2, (EV2 + X2) / (n2 + mb)])])

c2_sol = (f"<p>Now a sponsorship is read as proof of the good type, so a sponsoring Kvalvik is valued at 168:</p>"
          f"<p>m × P = 18 and (2.4 + m) × P = 168, so 2.4P = 150, <b>P = NOK {F(Pc, 2)}</b> and "
          f"<b>m = 18/{F(Pc, 1)} = {F(mc)} million new shares</b>.</p>"
          f"<p>A Kvalvik that does not sponsor is taken for the bad type: <b>P = 48/2.4 = NOK {F(Pnon, 2)}</b>.</p>"
          f"<p>Under this belief a good type is glad to sponsor: {F(Pc, 2)} against {F(Pnon, 2)} if it does not.</p>")
c2_crit = [f"Values a sponsoring firm at 168: P = {F(Pc, 2)} and m = {F(mc)} million.",
           f"A firm that does not sponsor is valued as bad: P = {F(Pnon, 2)}.",
           f"Bonus, not required: the check {F(mc, 3)} × {F(Pc, 1)} = 18."]
C2 = del_("c", 4, "<p>Suppose instead the market believes that only the good type sponsors: a sponsorship proves "
                  "the good type and no sponsorship proves the bad type. How many new shares must a sponsoring "
                  "Kvalvik issue and at what price? What is the price of a Kvalvik that does not sponsor?</p>",
          c2_sol, c2_crit)
svar(k2("c"), "tall", [tall("New shares (sponsor)", mc, "m shares", [mb]),
                       tall("Share price (sponsor)", Pc, "NOK per share", [VG / n2, Pb]),
                       tall("Share price (no sponsorship)", Pnon, "NOK per share", [P0_2, (VB - X2) / n2])])

d2_sol = (f"<p><b>The bad type copies.</b> The market sees the sponsorship, not the type. If a bad Kvalvik sponsors, "
          f"it is priced like a good one at {F(Pc, 2)}; if it does not, it is revealed as bad and priced at "
          f"{F(Pnon, 2)}. The founders sell at the market price, so they want it to sponsor: "
          f"<b>{F(Pc, 2)} &gt; {F(Pnon, 2)}</b>. The new investors pay for it: they buy at {F(Pc, 2)} shares that "
          f"are really worth 48/{F(n2 + mc, 3)} = {F(sann_verdi_nye, 2)}.</p>"
          f"<p><b>The belief in (c) is not rational.</b> If the market believes that only good types sponsor, bad "
          f"types sponsor too, so a sponsorship proves nothing. The separating equilibrium fails; the market "
          f"is back to pooling the two types.</p>"
          f"<p><b>How large would the cost have to be?</b> A bad type stops copying when (168 − X)/2.4 ≤ 48/2.4, "
          f"that is when X ≥ 168 − 48 = <b>NOK {F(Xterskel, 0)} million</b>. But at that cost a good type gets "
          f"(168 − {F(Xterskel, 0)})/2.4 = {F(Pnon, 2)} from sponsoring: no more than if it is taken for a bad "
          f"type and less than the pooled price of {F(P0_2, 2)}. Only at exactly X = {F(Xterskel, 0)} can the types "
          f"separate; even then the good type gains nothing ({F(Pnon, 0)} either way, below the pooled "
          f"{F(P0_2, 0)}). Burning money costs both types the same, so it is a worthless signal: a signal works "
          f"only if it is cheaper for the good type or can be verified.</p>")
d2_crit = [f"Compares {F(Pc, 2)} (sponsor, taken for good) with {F(Pnon, 2)} (no sponsorship, taken for bad): "
           "the bad type sponsors.",
           "Concludes that the belief in (c) is not rational: the bad type mimics, so the sponsorship cannot "
           "separate the types and they are pooled.",
           f"Threshold X = {F(Xterskel, 0)} = 168 − 48. Comparing with the pooled price of 40 instead of 20 gives "
           f"{F(VG - n2 * P0_2, 0)} and is wrong here: under the belief in (c), not sponsoring reveals the bad "
           "type.",
           f"Only at exactly X = {F(Xterskel, 0)} can the types separate; even then the good type gains nothing "
           f"(price {F(Pnon, 2)}, below the pooled {F(P0_2, 0)}): burning money is a worthless signal when it costs "
           "both types the same. The idea earns the point; the word «signal» alone does not."]
D2 = del_("d", 5, "<p>Suppose Kvalvik is in fact the bad type and the market holds the belief in (c). Do the "
                  "founders want it to sponsor? Is the belief rational? How costly must the sponsorship be before "
                  "a bad type stops sponsoring? Would a good type still sponsor at that cost?</p>", d2_sol, d2_crit)
svar(k2("d"), "blandet", [tall("Threshold cost of the sponsorship", Xterskel, "NOK m", [VG - n2 * P0_2, VG - X2])],
     tallPoeng=1, tekstLedd="Will a bad type sponsor, and is the belief in (c) rational? Would a good type still "
                            "sponsor at the threshold cost?")

e2_sol = (f"<p><b>Highest fee.</b> With the certificate the market values a good Kvalvik at 168. The fee C is paid "
          f"with new shares, so the old shareholders keep 168 − C and P = (168 − C)/2.4. Without it the price is "
          f"{F(P0_2, 2)}, as in (a). The good type pays as long as (168 − C)/2.4 ≥ {F(P0_2, 0)}, so "
          f"<b>C<sub>max</sub> = 168 − 96 = NOK {F(Cmax, 0)} million</b>: the amount by which the pooled price "
          f"undervalues the good type, 2.4 × ({F(VG / n2, 0)} − {F(P0_2, 0)}).</p>"
          f"<p><b>A bad type would not buy it.</b> The certificate would reveal a value of 48, a price of at most "
          f"{F(Pnon, 0)}, against {F(P0_2, 0)} without it.</p>"
          f"<p><b>No certificate is bad news.</b> Once good types certify, a firm without a certificate is taken "
          f"for the bad type and priced at {F(Pnon, 0)}, so the pooled price disappears; even applying for a "
          f"certificate tells the market something. If even applying reveals the type, the good type's alternative "
          f"is {F(Pnon, 0)}, not {F(P0_2, 0)}, so it would pay up to {F(Xterskel, 0)}; measured against the price in "
          f"(a), as the question asks, the answer is {F(Cmax, 0)}. This is why audits, ratings and reputable "
          f"underwriters have value: they make the type verifiable instead of relying on a signal the bad type can "
          f"copy.</p>")
e2_crit = [f"Price with the certificate (168 − C)/2.4 compared with {F(P0_2, 0)}: C_max = {F(Cmax, 0)}. Per share "
           f"the undervaluation is {F(VG / n2 - P0_2, 0)} (not required).",
           "A bad type never buys: the certificate would reveal 48.",
           f"Not buying reveals the bad type (price {F(Pnon, 0)}), so pooling breaks down. Kurbatov, recording 10 "
           "at 3:58: «even the fact that you applied for certification will already reveal your type».",
           f"Bonus, not required: once that is so, a good type would pay up to {F(Xterskel, 0)} to avoid being "
           f"priced at {F(Pnon, 0)}."]
E2 = del_("e", 5, "<p>Instead, Kvalvik can pay an independent auditor to certify the patent's true value to the "
                  "market, with the fee paid in new shares issued after the certificate is published. What is the "
                  "highest fee a good type would pay rather than be priced as in (a)? Would a bad type buy the "
                  "certificate? Once good types buy certificates, what does the market conclude about a firm "
                  "without one?</p>", e2_sol, e2_crit)
svar(k2("e"), "blandet", [tall("Highest fee", Cmax, "NOK m", [VG / n2 - P0_2, Xterskel, VG - EV2 - X2])],
     tallPoeng=2, tekstLedd="Would a bad type buy the certificate? What does the market conclude about a firm "
                            "without one?")

H23_E2 = {"n": 2, "title": "Asymmetric information", "points": 20, "topic": "Signalling and certification",
          "chapters": [12, 13],
          "merke": "Forelesning 10 (Problem set exercises 2), 3:07: «you might expect something like that in the "
                   "exam as well»",
          "body": t2_body, "parts": [A2, B2, C2, D2, E2]}


# ============================================================ hint2-3 oppgave 3: Ragnhild og fjordcruiset
I3, Xu, Xd, p3, rf3 = 2.0, 4.48, 2.08, 0.6, 0.04
Ru, Rd = 1.00, -1.00
ERM = p3 * Ru + (1 - p3) * Rd
rEinv = 0.10
assert near(ERM, 0.20)
EX = p3 * Xu + (1 - p3) * Xd
s3 = (1 + rEinv) * I3 / EX
Fdebt = I3 * (1 + rf3)
assert near(Fdebt, Xd)                  # lånet er risikofritt, akkurat
CF_E = (1 - s3) * EX
CF_D = EX - Fdebt


def repliker(pu, pd):
    """Kroner i markedet (M) og i risikofritt (B) som gir pu i boom og pd i bust."""
    M = (pu - pd) / ((1 + Ru) - (1 + Rd))
    B = (pd - M * (1 + Rd)) / (1 + rf3)
    assert near(M * (1 + Ru) + B * (1 + rf3), pu) and near(M * (1 + Rd) + B * (1 + rf3), pd)
    return M, B


M_D, B_D = repliker(Xu - Fdebt, Xd - Fdebt)
val_D = M_D + B_D
M_E, B_E = repliker((1 - s3) * Xu, (1 - s3) * Xd)
val_E = M_E + B_E
M_I, B_I = repliker(s3 * Xu, s3 * Xd)
val_I = M_I + B_I
V3 = val_E + val_I
assert near(val_D, val_E)               # MM: samme verdi for gründeren
assert near(val_I, I3)                  # investorene får null NPV
assert near(V3, val_D + I3)             # samme firmaverdi
assert near(B_D, 0.0)                   # gjeldsfinansiert andel er ren markedsposisjon
# lærebokveien: forventet risikabel del / (1 + E[R_M])
assert near(val_D, p3 * (Xu - Xd) / (1 + ERM))
# (e) fast andel 70 %, alfa ukjent, E[R_M] fast
s_eng = 0.70


def V_alfa(a):
    return Xd / (1 + rf3) + a * (Xu - Xd) / (1 + ERM)


alfa = (I3 / s_eng - Xd / (1 + rf3)) * (1 + ERM) / (Xu - Xd)
assert near(s_eng * V_alfa(alfa), I3)
assert near((1 - s_eng) * V_alfa(alfa), V_alfa(alfa) - I3)
assert near(alfa, 3 / 7)
assert (1 - s_eng) * V_alfa(p3) < V_alfa(p3) - I3   # ved 0,6 foretrekker hun lånet
assert 0 < alfa < 1 and not near(alfa, p3)
# feller
V_fast = V3                             # med boom-avkastningen fast på 100 % er V uavhengig av alfa
assert s_eng * V_fast > I3              # da finnes ingen likegyldighet
alfa_feil_PV = (I3 / s_eng * (1 + rf3) - Xd) / (Xu - Xd)   # forventet betaling diskontert med r_f
alfa_kf = (Fdebt / s_eng - Xd) / (Xu - Xd)   # 0,3·E[X] = E[X] − 2,08: forventede kontantstrømmer
assert near(alfa_kf, alfa_feil_PV) and abs(alfa_kf - alfa) > 0.05

k33 = lambda lab: f"hint2-3:3:{lab}"
t33_body = (
    "<p>Ragnhild Solheim wants to start a luxury fjord-cruise business. The boat and the launch cost NOK 2 million "
    "today. In one year Ragnhild sells the business, which then pays NOK 4.48 million if the economy booms and "
    "NOK 2.08 million if it busts. A boom has probability 0.6. Ragnhild has no money of her own. She can raise the "
    "NOK 2 million either from equity investors, who demand an expected return of 10%, or as a bank loan at the "
    "risk-free rate of 4%. The market portfolio returns +100% in a boom and −100% in a bust (an expected return of "
    "20%). It booms and busts together with the business. Markets are perfect and there are no taxes.</p>")
a33_sol = (f"<p><b>Expected payoff.</b> E[X] = 0.6 × 4.48 + 0.4 × 2.08 = {summ([p3 * Xu, (1 - p3) * Xd], EX, 3)}</p>"
           f"<p><b>Equity investors.</b> They put in 2 and want 2 × 1.10 = 2.2 in expectation, so they need "
           f"2.2/{F(EX, 2)} = <b>{F(s3, 3)} (62.5%)</b> of the firm. Ragnhild keeps 37.5%.</p>"
           f"<p><b>Ragnhild's expected cash flow.</b> With equity: {F(EX, 2)} − 2.2 = <b>{F(CF_E, 2)}</b>. With the bank "
           f"loan she repays 2 × 1.04 = 2.08 in both states: {F(EX, 2)} − 2.08 = <b>{F(CF_D, 2)}</b>.</p>"
           f"<p>The loan gives the higher expected cash flow, but all of it comes in a boom (in a bust Ragnhild gets "
           f"2.08 − 2.08 = 0). Expected cash flows alone cannot rank the two, since the risk differs.</p>")
a33_crit = [f"E[X] = {F(EX, 2)}.",
            "Fraction to the investors 2.2/3.52 = 62.5% (5/8).",
            f"Ragnhild: {F(CF_E, 2)} with equity, {F(CF_D, 2)} with the bank loan.",
            "Bonus, not required: the higher expected cash flow with the loan comes with more risk, so it does "
            "not make the loan better."]
A33 = del_("a", 3, "<p>Find the expected payoff of the business, the fraction of the firm the equity investors "
                   "require and Ragnhild's expected cash flow with equity financing and with the bank loan.</p>",
           a33_sol, a33_crit)
svar(k33("a"), "tall", [tall("E[X]", EX, "NOK m"),
                        tall("Investors' fraction", s3 * 100, "%", [I3 / EX * 100]),
                        tall("Ragnhild's expected cash flow, equity", CF_E, "NOK m", [EX - I3]),
                        tall("Ragnhild's expected cash flow, bank loan", CF_D, "NOK m", [EX - I3])])

b33_sol = (f"<p><b>The loan is risk-free.</b> The bank is owed 2 × 1.04 = 2.08; even the bust payoff is "
           f"2.08, so the bank is paid in full in both states.</p>"
           f"<p><b>Ragnhild's payoff.</b> Boom: 4.48 − 2.08 = {F(Xu - Fdebt, 2)}. Bust: 2.08 − 2.08 = 0.</p>"
           f"<p><b>Replicate it.</b> NOK 1 in the market portfolio pays 2 in a boom and 0 in a bust: the same "
           f"pattern. To get {F(Xu - Fdebt, 2)} in a boom she needs {F(Xu - Fdebt, 2)}/2 = {F(M_D, 2)} in the "
           f"market portfolio and nothing in the risk-free asset. Equivalently, 0.6 × {F(Xu - Fdebt, 2)}/1.20 = "
           f"{F(val_D, 2)}: the expected payoff discounted at the market's expected return.</p>"
           f"<p><b>Value of Ragnhild's stake: NOK {F(val_D, 2)} million.</b></p>")
b33_crit = ["Shows the loan is risk-free: 2.08 is owed and even the bust pays 2.08.",
            f"Payoff {F(Xu - Fdebt, 2)} in a boom and 0 in a bust, replicated by {F(M_D, 2)} in the market "
            "portfolio and nothing in the risk-free asset.",
            f"Value {F(val_D, 2)}. Discounting the expected 1.44 at the risk-free rate ({F(CF_D / (1 + rf3))}) "
            "is wrong: the stake is exactly as risky as the market."]
B33 = del_("b", 4, "<p>Show that the bank loan is risk-free. Find the value today of Ragnhild's stake with the bank "
                   "loan by replicating its payoff with the market portfolio and the risk-free asset.</p>",
           b33_sol, b33_crit)
svar(k33("b"), "tall", [tall("Value of Ragnhild's stake (bank loan)", val_D, "NOK m",
                             [CF_D / (1 + rf3), CF_D / (1 + rEinv), CF_D])])

c33_sol = (f"<p><b>Ragnhild's payoff.</b> She keeps 37.5% of the firm: 0.375 × 4.48 = {F((1 - s3) * Xu, 2)} in a boom "
           f"and 0.375 × 2.08 = {F((1 - s3) * Xd, 2)} in a bust.</p>"
           f"<p><b>Split it.</b> The {F((1 - s3) * Xd, 2)} she gets in both states is risk-free; the remaining "
           f"{F((1 - s3) * Xu, 2)} − {F((1 - s3) * Xd, 2)} = {F((1 - s3) * (Xu - Xd), 2)} comes only in a boom, "
           f"like the market.</p>"
           f"<p>Risk-free asset: {F((1 - s3) * Xd, 2)}/1.04 = <b>{F(B_E, 2)}</b>. Market portfolio: "
           f"{F((1 - s3) * (Xu - Xd), 2)}/2 = <b>{F(M_E, 2)}</b> (or 0.6 × {F((1 - s3) * (Xu - Xd), 2)}/1.20).</p>"
           f"<p><b>Value: {summ([B_E, M_E], val_E, 2)}, NOK {F(val_E, 2)} million</b>, the same as with the bank loan. "
           f"Check: the portfolio pays {F(B_E, 2)} × 1.04 + {F(M_E, 2)} × 2 = {F((1 - s3) * Xu, 2)} in a boom and "
           f"{F(B_E, 2)} × 1.04 = {F((1 - s3) * Xd, 2)} in a bust ✓.</p>"
           "<p>This is MM I: in a perfect market the choice of financing does not change what Ragnhild's stake is "
           "worth. It only changes how her payoff is spread over the two states.</p>")
c33_crit = [f"Payoff {F((1 - s3) * Xu, 2)} in a boom and {F((1 - s3) * Xd, 2)} in a bust (37.5% of each).",
            f"Portfolio: {F(B_E, 2)} in the risk-free asset and {F(M_E, 2)} in the market portfolio.",
            f"Value {F(val_E, 2)}, equal to (b): financing does not matter in a perfect market (MM I).",
            "Bonus, not required: checking that the portfolio reproduces both payoffs."]
C33 = del_("c", 5, "<p>Find the value today of Ragnhild's stake with equity financing by replication. State the "
                   "replicating portfolio and compare with (b).</p>", c33_sol, c33_crit)
svar(k33("c"), "tall", [tall("Risk-free asset", B_E, "NOK m", [M_E, (1 - s3) * Xd]),
                        tall("Market portfolio", M_E, "NOK m", [B_E, (1 - s3) * (Xu - Xd)]),
                        tall("Value of Ragnhild's stake (equity)", val_E, "NOK m", [CF_E / (1 + rf3), CF_E])])

d33_sol = (f"<p><b>The investors' stake.</b> 62.5% of the payoff: {F(s3 * Xu, 2)} in a boom and {F(s3 * Xd, 2)} in a "
           f"bust. Risk-free part {F(s3 * Xd, 2)}/1.04 = {F(B_I, 2)}, market part ({F(s3 * Xu, 2)} − {F(s3 * Xd, 2)})/2 "
           f"= {F(M_I, 2)}: value <b>{F(val_I, 2)}</b>, exactly what they pay. A zero-NPV deal, as is the bank loan "
           f"(2 today for a risk-free 2.08).</p>"
           f"<p><b>Firm value.</b> Equity financing: {F(val_I, 2)} + {F(val_E, 2)} = <b>{F(V3, 2)}</b>. Bank loan: "
           f"debt {F(I3, 2)} + Ragnhild's equity {F(val_D, 2)} = <b>{F(V3, 2)}</b>. The same value.</p>"
           f"<p><b>Who gets the NPV.</b> NPV = {F(V3, 2)} − 2.00 = {F(V3 - I3, 2)} under both forms of financing. "
           f"All of it goes to Ragnhild: her stake is worth {F(val_D, 2)} and she puts in nothing. The outside "
           f"investors only break even.</p>")
d33_crit = [f"Investors' stake {F(val_I, 2)}, equal to the money they put in (zero NPV).",
            f"Firm value {F(V3, 2)} under both forms of financing.",
            f"Ragnhild captures the whole NPV of {F(V3 - I3, 2)}."]
D33 = del_("d", 3, "<p>Find the value of the equity investors' stake and the value of the firm with each form of "
                   "financing. Who gets the NPV of the business?</p>", d33_sol, d33_crit)
svar(k33("d"), "blandet", [tall("Value of the investors' stake", val_I, "NOK m", [s3 * EX / (1 + rf3), s3 * EX]),
                           tall("Firm value", V3, "NOK m", [EX / (1 + rf3), EX])],
     tallPoeng=2, tekstLedd="Who gets the NPV of the business?")

e33_sol = (f"<p><b>Value of the business as a function of α.</b> The risk-free part is 2.08/1.04 = "
           f"{F(Xd / (1 + rf3), 2)}. The boom-only part, {F(Xu - Xd, 2)}, is worth α × {F(Xu - Xd, 2)}/1.20 = 2α "
           f"(the replication from (b), with α instead of 0.6). So V(α) = 2 + 2α.</p>"
           f"<p><b>Ragnhild's stake.</b> Bank loan: V − 2 = 2α. Angel: 0.30 × (2 + 2α) = 0.6 + 0.6α.</p>"
           f"<p><b>Indifference.</b> 2α = 0.6 + 0.6α, so 1.4α = 0.6 and <b>α = 3/7 = {F(alfa)}</b>. Equivalently, "
           f"the angel's 70% is then worth exactly the NOK 2 million paid: 0.7 × (2 + 2 × {F(alfa)}) = 2.</p>"
           f"<p><b>If a boom is more likely than {F(alfa)}</b>, the firm is worth more than 2/0.7 = {F(I3 / s_eng)}, "
           f"so 70% of it is worth more than the 2 million the angel pays: Ragnhild gives away too much and prefers "
           f"the bank loan (at α = 0.6 her stake is worth {F(V_alfa(p3) - I3, 2)} with the loan and "
           f"{F((1 - s_eng) * V_alfa(p3), 2)} with the angel). Below {F(alfa)} the angel overpays and she prefers "
           f"the angel.</p>"
           f"<p><b>No contradiction with (c).</b> In (c) the investors' fraction was set so that their claim was "
           f"fairly priced, a zero-NPV deal. MM's irrelevance holds when every security is sold at its fair value. "
           f"A fixed 70% is a fair price only at α = {F(alfa)}; at any other α one side gets a positive-NPV deal at "
           f"the other's expense, which a competitive, perfect market would not offer.</p>")
e33_crit = [f"V(α) = 2 + 2α: the risk-free part {F(Xd / (1 + rf3), 2)} plus α × {F(Xu - Xd, 2)}/1.20 for the "
            "boom-only part.",
            f"Sets Ragnhild's two stakes equal (2α = 0.6 + 0.6α), or the angel's 70% equal to 2: α = {F(alfa)} (3/7).",
            f"Above {F(alfa)} Ragnhild prefers the bank loan; below it, the angel.",
            f"MM needs fairly priced securities: the 70% is fair only at α = {F(alfa)}, so a preference away from "
            "it reflects a mispricing, not a failure of MM.",
            "Keeping the market's boom return at +100% makes V = 3.20 whatever α is, so the question would have no "
            "answer; that misreads the text, which keeps the expected return at 20%.",
            f"Comparing expected cash flows (0.3 × E[X] = E[X] − 2.08) or discounting them at r_f gives "
            f"α = {F(alfa_feil_PV)} and earns nothing for the number: the stakes must be valued by replication."]
E33 = del_("e", 5, "<p>A business angel instead offers Ragnhild the NOK 2 million for 70% of the firm. Suppose you do "
                   "not know the probability of a boom; call it α. The market portfolio still loses everything in a "
                   "bust and still has an expected return of 20%, so its return in a boom depends on α. For which "
                   "α do Ragnhild's two stakes (with the angel and with the bank loan) have the same value today? "
                   "Value them by replication, as in (b) and (c). Which offer does she prefer if a boom is more "
                   "likely than that? Explain briefly why this does not contradict your answer in "
                   "(c).</p>", e33_sol, e33_crit)
svar(k33("e"), "blandet", [tall("α (indifference)", alfa, "", [alfa_feil_PV, 1 - alfa, p3])],
     tallPoeng=2, tekstLedd="Which does Ragnhild prefer if a boom is more likely, and why does this not contradict (c)?",
     merknad="Fellen er å sammenligne forventede kontantstrømmer eller diskontere dem med r_f (gir "
             + F(alfa_feil_PV) + ").")

H23_E3 = {"n": 3, "title": "Capital Structure", "points": 20, "topic": "MM in perfect markets, replication",
          "chapters": [3, 6],
          "merke": "Forelesning 02 (Capital Structure I), 33:54: «like with different numbers, this could be like "
                   "an exam question»",
          "body": t33_body, "parts": [A33, B33, C33, D33, E33]}

UT = {"hint1-1": [H11_E1, H11_E2, H11_E3, H11_E4], "hint2-3": [H23_E1, H23_E2, H23_E3]}


# ============================================================ kontroller
def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return (h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")
            .replace("&amp;", "&"))


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


def innenfor(n, v, t):
    return abs(n - v) <= max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)


def tekster(ex):
    for k in ("title", "body", "merke", "solution"):
        if k in ex:
            yield ex[k]
    yield from ex.get("criteria", [])
    for p in ex.get("parts", []):
        yield p["body"]
        yield p["solution"]
        yield from p["criteria"]


POENG = {"hint1-1": [10, 10, 20, 20], "hint2-3": [10, 20, 20]}
feil = []
for sid, liste in UT.items():
    assert [e["n"] for e in liste] == list(range(1, len(liste) + 1))
    assert [e["points"] for e in liste] == POENG[sid], sid
    for ex in liste:
        if "parts" in ex:
            assert sum(p["points"] for p in ex["parts"]) == ex["points"], (sid, ex["n"])
        for t in tekster(ex):
            r = ren(t)
            if "—" in r:
                feil.append(f"{sid}:{ex['n']} tankestrek: {r[:80]}")
            if re.search(r",\s+and\b", r):
                m = re.search(r",\s+and\b", r)
                feil.append(f"{sid}:{ex['n']} komma før and: {r[max(0, m.start() - 50):][:90]}")
            if re.search(r",\s+og\b", r):
                feil.append(f"{sid}:{ex['n']} komma før og: {r[:80]}")
            if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
                feil.append(f"{sid}:{ex['n']} pronomen om Kurbatov: {r[:80]}")
            if re.search(r"(?<![\w(/])-\d", r):
                feil.append(f"{sid}:{ex['n']} bindestrek som minus: {r[:80]}")
        krit = ex.get("criteria", []) + [c for p in ex.get("parts", []) for c in p["criteria"]]
        for c in krit:
            if "<" in c:
                feil.append(f"{sid}:{ex['n']} markup i criteria: {c[:60]}")
        enheter = [(f"{sid}:{ex['n']}:{p['label']}", p) for p in ex.get("parts", [])] or [(f"{sid}:{ex['n']}:", ex)]
        for key, p in enheter:
            if key not in SVAR:
                feil.append(f"mangler svar {key}")
                continue
            e = SVAR[key]
            if e["type"] == "blandet":
                assert 0 < e["tallPoeng"] < p["points"], key
            nums = tall_i(p["solution"] + " " + " ".join(p["criteria"]))
            for t in e.get("tall", []):
                kand = [t["verdi"]] + t.get("alt", [])
                ok = any(innenfor(n, v, t) or (t["enhet"] == "%" and innenfor(n * 100, v, t))
                         for v in kand for n in nums)
                if not ok:
                    feil.append(f"{key}: {t['navn']} = {t['verdi']} står ikke i løsningen")
    for ex in liste:
        ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex.get("parts", []))).split())
        print(f"{sid} oppgave {ex['n']}: {ord_} ord, {ex['points']} p ({ord_ / ex['points']:.1f} ord per poeng)")

forventet = set()
for s, l in UT.items():
    for e in l:
        if "parts" in e:
            forventet |= {f"{s}:{e['n']}:{p['label']}" for p in e["parts"]}
        else:
            forventet.add(f"{s}:{e['n']}:")
assert set(SVAR) == forventet, set(SVAR) ^ forventet

if feil:
    for f_ in feil:
        print("FEIL", f_)
    raise SystemExit("skriver ingenting")

json.dump(UT, open(os.path.join(HER, "h1.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(os.path.join(HER, "h1_svar.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Hovedtallene (til rapporten og søket etter gjenbruk)
print(f"hint1-1 E3: FCF {[round(x, 2) for x in FCF3]} + {FCF35} ved 3,5; NPV {NPV3:.4f}; PV {PV3:.4f}; "
      f"IRR {IRR3:.4%}; cider NPV {NPV_c:.4f}, IRR {IRR_c:.0%}; NPV ved 30 % {NPV3_ved_c:.4f}")
print(f"hint1-1 E4: rU {rU_v:.4f}/{rU_l:.4f} snitt {rU4:.4f}; rE {rE4:.4f}; wacc {w4:.5f}; V0 {V4[0]:.4f}; "
      f"NPV {NPV4:.4f}; D {[round(x, 4) for x in D4]}; VU {VU4:.4f}; PVTS {PVTS4:.4f}")
print(f"hint2-3 E2: P0 {P0_2}; (b) m {mb:.4f} P {Pb}; (c) m {mc:.4f} P {Pc}, uten {Pnon}; terskel {Xterskel}; "
      f"Cmax {Cmax}")
print(f"hint2-3 E3: E[X] {EX:.2f}; s {s3:.3f}; CF {CF_E:.2f}/{CF_D:.2f}; verdi {val_D:.2f}/{val_E:.2f}; "
      f"B {B_E:.2f} M {M_E:.2f}; investorer {val_I:.2f}; V {V3:.2f}; alfa {alfa:.4f}")
print("skrev h1.json og h1_svar.json:", len(SVAR), "svar-oppføringer")
