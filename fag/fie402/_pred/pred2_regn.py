# -*- coding: utf-8 -*-
"""Prediksjon 2 for FIE402: den nest mest sannsynlige eksamenen (12 · 12 · 18 · 18 · 20 · 20).

Regner alle tall med full presisjon, sjekker konsistensen med assert og skriver
pred2.json (hele settet) og pred2_svar.json (svar-data etter docs/fie402-svar-spek.md)
ved siden av seg. Kjør fra hvor som helst:  python3 -I fag/fie402/_pred/pred2_regn.py

Spesifikasjon: docs/fie402-prediksjon-spek.md (tabellen «Pred2»).
"""
import json, math, os, re

HER = os.path.dirname(os.path.abspath(__file__))
SID = "pred2"


# ---------------------------------------------------------------- formatering
def f(x, d=4):
    """Tall med d desimaler og ekte minus."""
    s = f"{abs(x):.{d}f}"
    return ("−" if x < 0 and float(s) != 0 else "") + s


def p(x, d=2):
    """Andel som prosent."""
    return f(100 * x, d) + "%"


def tab(rader, hode):
    h = "".join(f"<th>{c}</th>" for c in hode)
    r = ""
    for rad in rader:
        r += "<tr>" + "".join(
            (f'<td class="n">{c}</td>' if i else f"<td>{c}</td>") for i, c in enumerate(rad)) + "</tr>"
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


def close(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))


SVAR = {}


def tall(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


# =============================================================================
# E1 · Governance: lønn, KPI-er og kortsiktighet (12 p, teori)
# =============================================================================
E1 = {
    "n": 1, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "merke": "Som H2025 E2: setningsbudsjett og poeng per svar · governance 90 %, vinkelen lønn og KPI-er 20 %",
    "body": (
        "<p>Haverford Instruments Inc., a US-listed maker of laboratory instruments with dispersed "
        "ownership, develops each new generation of instruments over four to six years. The board pays the "
        "CEO a cash bonus of 150% of salary if earnings per share (EPS) grow by at least 10% in the year. "
        "Three quarters into this year EPS was on track to grow by only 6%, but the CEO still met the "
        "target.</p>"
        "<p>Answer the four questions below in 2–3 sentences each (3 points each).</p>"
        "<ol><li>Why might a board choose an EPS target? What behaviour can a one-year EPS target encourage?</li>"
        "<li>Describe one action the CEO could have taken in the last quarter to reach the target without "
        "creating value: how does it raise EPS and why can it hurt long-term shareholders?</li>"
        "<li>Do the same for a second action that works differently.</li>"
        "<li>Propose a better design for the bonus and explain why it works better.</li></ol>"),
    "solution": (
        "<p><b>Model answer (2–3 sentences per question).</b></p>"
        "<p><b>1. Why EPS and what it encourages.</b> EPS is simple, audited and published every quarter, so "
        "the board can verify the target and tie a large part of pay to the profits shareholders care about; "
        "pay that depends on performance makes low effort costly for the CEO. But the target covers one year "
        "and one accounting number, so it encourages the CEO to maximise this year's reported EPS rather than "
        "the long-term value of the firm: it makes the CEO myopic.</p>"
        "<p><b>2. A share buyback.</b> Buying back shares cuts the number of shares, so EPS rises "
        "mechanically even if total earnings do not change, as long as the earnings yield of the shares bought "
        "(EPS divided by the price) exceeds the after-tax interest rate on the cash used or the debt raised. "
        "Since EPS uses the weighted-average number of shares, a buyback late in the fourth quarter lowers "
        "that number only partly, so it must be large to lift this year's EPS. The buyback itself creates no "
        "value: at a fair "
        "price the remaining shareholders are no better off. It destroys value if the shares are "
        "overpriced or if the cash or the new debt raised to pay for it was needed for positive-NPV "
        "projects. This is the lecturer's own example: a slightly inefficient buyback announced only to "
        "reach the EPS target (recording 17, 37:19; recording 18, 1:14:07).</p>"
        "<p><b>3. A cut in R&amp;D.</b> R&amp;D is expensed at once, so cutting the budget for the next "
        "generation of instruments raises this year's earnings almost one for one (after tax). The projects "
        "that are cut may well have positive NPV, so the firm gives up long-term value to hit a one-year "
        "number; with a development cycle of four to six years the damage shows only after the bonus has "
        "been paid.</p>"
        "<p><b>4. A better design.</b> Measure performance over several years (for example three-year growth "
        "in economic profit, or total shareholder return relative to peers) and pay the bonus in restricted "
        "shares that vest over three to five years, with a clawback if results are reversed. Then a buyback "
        "or an R&amp;D cut that only moves one year's number no longer pays, because the CEO's wealth "
        "depends on the long-run value of the shares. Long-term milestones such as product launches, or ESG "
        "targets, which the lecturer called much less abusable than EPS (recording 17, 38:23), can be "
        "added.</p>"
        "<p><b>Also accepted.</b> For 2 and 3: cutting marketing, training or maintenance; recognising "
        "revenue early or delaying expenses; selling an asset at a gain to book a one-off profit. For 4: EPS "
        "measured with a fixed number of shares so buybacks do not count; a mix of financial and "
        "non-financial targets; options with long vesting (with the caveat that options reward risk); "
        "an independent compensation committee that can adjust the target for one-off actions.</p>"),
    "criteria": [
        "3 points per question, graded separately: 1 for the action or claim and 2 for the mechanism with "
        "its consequence for long-term shareholders. A label alone («short-termism», «agency problem») "
        "earns at most 1.",
        "Question 1: EPS is observable and ties pay to profits, which rewards effort; but a one-year target "
        "rewards one year's accounting number, so the CEO becomes myopic. Both halves (effort and the "
        "one-year horizon) are needed for 3 points.",
        "Questions 2 and 3: two actions that work differently. The natural pair is a share buyback (EPS "
        "rises because the number of shares falls, no value is created) and a cut in R&D or other long-term "
        "spending (earnings rise now, but the firm forgoes positive-NPV projects). Accounting choices such as "
        "booking revenue early are accepted as one of the two.",
        "Two versions of the same action (two ways to buy back shares, or cutting R&D and cutting the R&D "
        "staff) count as one.",
        "Question 4: a concrete design (several years of measurement, restricted shares with vesting, a "
        "clawback, a relative or value-based measure, long-term or ESG milestones) with the reason it "
        "removes the gain from the actions in 2 and 3. A design without a reason earns 1.",
        "Each answer is 2–3 sentences. Length is not rewarded.",
    ],
}
SVAR[f"{SID}:1:"] = {"type": "tekst"}


# =============================================================================
# E2 · Emisjon: kursfall ved SEO og bedre alternativ (12 p, teori)
# =============================================================================
E2 = {
    "n": 2, "title": "Security Issues", "points": 12, "topic": "Equity issues", "chapters": [11, 13, 14],
    "merke": "Teorispørsmålet Kurbatov skisserte i wrap-up (opptak 18, 48:05) · emisjon 40 %",
    "body": (
        "<p>Westerschelde Terminals N.V. runs container terminals in the Netherlands and is listed on "
        "Euronext Amsterdam. It holds €180 million in cash and has little debt. It announces a seasoned "
        "equity offering (SEO) of €450 million to build a new terminal. On the day of the announcement its "
        "share price falls by 12%.</p>"
        "<p>What are the possible reasons for the fall? Give two different reasons. What would have been a "
        "better way to finance the terminal? Around five sentences in total should be enough (each reason is "
        "worth 4 points and the better alternative 4 points).</p>"),
    "solution": (
        "<p><b>Model answer (about five sentences).</b></p>"
        "<p><b>Reason 1: the issue signals that the shares are overvalued.</b> Managers know more about the "
        "firm than outside investors and prefer to sell new shares when they believe the market price is too "
        "high, so investors read the announcement as bad news and mark the price down (Myers-Majluf). The "
        "signal is especially strong here, because Westerschelde had cash and spare debt capacity and still "
        "chose equity.</p>"
        "<p><b>Reason 2: agency costs of free cash flow.</b> €450 million on top of €180 million in cash puts "
        "more money under the managers' control. Investors may fear it will be spent on empire building "
        "or on a terminal with a negative NPV. Lower leverage also removes the discipline that fixed interest "
        "payments put on managers.</p>"
        "<p><b>Better alternative.</b> Follow the pecking order: use the €180 million in cash first and borrow "
        "the rest, because internal funds reveal nothing and debt is much less sensitive to the managers' "
        "private information (it also brings a tax shield and discipline); new equity comes last.</p>"
        "<p><b>Also accepted.</b> As a reason: the need for outside money reveals that internally generated "
        "cash flows are weaker than investors expected; the market doubts the terminal itself; with little "
        "debt the market expected the terminal to be financed with debt, so equity gives up the expected tax "
        "shields; price pressure, because the demand for the shares slopes downwards and new shares must be "
        "sold at a discount. If equity must "
        "be raised, reduce the information gap first (publish the contracts with shipping lines, bring in a "
        "well-known anchor investor who certifies the value) or issue when the gap is small. Not accepted on "
        "its own: «dilution». New shares sold at a fair price do not lower the value of the old shares, so "
        "the fall must come from what the issue tells investors. Issue costs are real but far too small to "
        "explain a 12% fall in the value of all the shares.</p>"),
    "criteria": [
        "Each reason is worth 4 points: 1 for naming it and 3 for the mechanism (who knows what, what "
        "investors infer and why the price falls).",
        "Reason 1: asymmetric information. Managers issue equity when the shares are overpriced, so the issue "
        "is a negative signal and the price falls (Myers-Majluf, adverse selection). Using the cash and the "
        "low debt to sharpen the argument is a bonus.",
        "Reason 2: agency costs of free cash flow: more cash for managers to spend on empire building or "
        "negative-NPV projects, with less debt to discipline them. A reason based on the project (investors "
        "think the terminal is a poor investment) is accepted if it is explained.",
        "Also accepted with a mechanism (any reasonable reason counts, as in Kurbatov's keys): the issue reveals "
        "that internal cash flows are weaker than expected; lost expected tax shields (with little debt the "
        "market expected debt financing); price pressure (downward-sloping demand for the shares). "
        "«Dilution» alone earns nothing; issue costs alone cannot explain 12% of the whole market value.",
        "Better alternative (4 points): internal funds first, then debt, then equity (the pecking order), with "
        "the reason: cash reveals nothing and debt is less sensitive to private information. Naming debt "
        "without a reason earns 2.",
        "About five sentences in total. Two reasons that are really the same (two versions of "
        "overvaluation) count as one.",
    ],
}
SVAR[f"{SID}:2:"] = {"type": "tekst"}


# =============================================================================
# E3 · Gjeldsoverheng finansiert med ny egenkapital (18 p)
# =============================================================================
rf3 = 0.04
pLo, pHi = 0.6, 0.4          # lave og høye drivstoffpriser
VLo, VHi = 260.0, 90.0       # eiendelene om ett år
F3 = 150.0                   # pålydende
I3 = 30.0                    # investeringen i dag
gLo, gHi = 27.0, 50.0        # økning i eiendelene med prosjektet

def bond_eq(vlo, vhi, face):
    d = (pLo * min(vlo, face) + pHi * min(vhi, face)) / (1 + rf3)
    e = (pLo * max(vlo - face, 0) + pHi * max(vhi - face, 0)) / (1 + rf3)
    return d, e

D3a, E3a = bond_eq(VLo, VHi, F3)
V3a = (pLo * VLo + pHi * VHi) / (1 + rf3)
assert close(D3a + E3a, V3a)
PVg3 = (pLo * gLo + pHi * gHi) / (1 + rf3)
NPV3 = PVg3 - I3
assert NPV3 > 0
VLo2, VHi2 = VLo + gLo, VHi + gHi
assert VHi2 < F3 < VLo2                  # fortsatt mislighold ved høye priser
D3c, Eall3c = bond_eq(VLo2, VHi2, F3)
x3c = I3 / Eall3c
founder3c = (1 - x3c) * Eall3c
assert close(founder3c, Eall3c - I3)
dF3c = founder3c - E3a
dD3c = D3c - D3a
assert dF3c < 0 < dD3c                   # gründeren taper, kreditorene vinner
assert close(dF3c + dD3c + 0.0, NPV3)    # nye aksjonærer går i null: summen er NPV
assert dD3c > NPV3                       # kreditorene tar mer enn hele NPV
# (d) reforhandling: trygg gjeld når F ≤ VHi2
Fmin3 = D3a * (1 + rf3)
EVsum3 = pLo * VLo2 + pHi * VHi2
Fmax3 = EVsum3 - (E3a + I3) * (1 + rf3)
assert Fmin3 <= Fmax3 <= VHi2
assert close(Fmax3 - Fmin3, NPV3 * (1 + rf3))
# F > VHi2: gründeren krever 0.6(287 − F)/1.04 − 30 ≥ E3a, umulig
Fcap3 = VLo2 - (E3a + I3) * (1 + rf3) / pLo
assert Fcap3 < VHi2
Fex3 = 128.0
Dex3 = Fex3 / (1 + rf3)
Eallex3 = (EVsum3 - Fex3) / (1 + rf3)
Fex_founder3 = Eallex3 - I3
xex3 = I3 / Eallex3
assert close((Dex3 - D3a) + (Fex_founder3 - E3a), NPV3)
assert Dex3 > D3a and Fex_founder3 > E3a

e3_tab_a = tab([
    ["Low (60%)", f(VLo, 0), f(min(VLo, F3), 0), f(max(VLo - F3, 0), 0)],
    ["High (40%)", f(VHi, 0), f(min(VHi, F3), 0), f(max(VHi - F3, 0), 0)],
], ["Fuel prices", "Assets", "Bond", "Equity"])
e3_tab_c = tab([
    ["Low (60%)", f(VLo2, 0), f(min(VLo2, F3), 0), f(max(VLo2 - F3, 0), 0)],
    ["High (40%)", f(VHi2, 0), f(min(VHi2, F3), 0), f(max(VHi2 - F3, 0), 0)],
], ["Fuel prices", "Assets with retrofit", "Bond (F = 150)", "All equity"])

E3 = {
    "n": 3, "title": "Debt and risk", "points": 18, "topic": "Risky debt and investment", "chapters": [10],
    "merke": "Som eksemplet i forelesning 04 (33:41) og PS1 E6, med diskontering og ulik gevinst i tilstandene · denne typen 40 %",
    "body": (
        "<p>Northgale Airways Ltd, a regional airline in the north of England, is owned entirely and run by "
        "its founder. Its only debt is a zero-coupon bond with a face value of £150 million due in one year. "
        "Next year its assets will be worth £260 million if fuel prices are low (probability 60%) and £90 "
        "million if they are high (probability 40%). In default the bondholders take over the firm at no "
        "cost. Investors are risk neutral, the risk-free rate is 4% and there are no taxes. Treat the "
        "bondholders as one party. Use 4 decimal places.</p>"
        "<p>A fuel-saving retrofit costs £30 million today. It adds £27 million to next year's asset value if "
        "fuel prices are low and £50 million if they are high. Northgale has no cash.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Without the retrofit, what are Northgale's bond and its equity worth today?</p>",
         "solution": (
             "<p><b>Step 1. Payoffs state by state.</b> The bondholders get min(assets, 150) and the founder "
             "gets max(assets − 150, 0):</p>" + e3_tab_a +
             f"<p><b>Step 2. Discount the expected payoffs at r<sub>f</sub> = 4%</b> (everyone is risk neutral):</p>"
             f"<p>Bond = (0.6 × 150 + 0.4 × 90)/1.04 = 126/1.04 = <b>£{f(D3a)} million</b><br>"
             f"Equity = (0.6 × 110 + 0.4 × 0)/1.04 = 66/1.04 = <b>£{f(E3a)} million</b></p>"
             f"<p><b>Check.</b> {f(D3a)} + {f(E3a)} = {f(V3a)} = (0.6 × 260 + 0.4 × 90)/1.04 ✓. The bond is "
             f"worth far less than 150/1.04 = {f(F3 / (1 + rf3))}, because Northgale defaults when fuel prices "
             f"are high.</p>"),
         "criteria": [
             f"Bond valued state by state: (0.6 × 150 + 0.4 × 90)/1.04 = {f(D3a)}. Discounting the face value "
             f"(150/1.04 = {f(F3 / (1 + rf3))}) ignores default and is the classic error.",
             f"Equity = 0.6 × 110/1.04 = {f(E3a)}.",
             "Discounts at the risk-free rate, since investors are risk neutral.",
             f"The check D + E = {f(V3a)} is a bonus.",
         ]},
        {"label": "b", "points": 2,
         "body": "<p>What is the NPV of the retrofit?</p>",
         "solution": (
             f"<p>The retrofit pays 27 or 50 next year and costs 30 today:</p>"
             f"<p>NPV = −30 + (0.6 × 27 + 0.4 × 50)/1.04 = −30 + 36.2/1.04 = −30 + {f(PVg3)} = "
             f"<b>£{f(NPV3)} million</b></p>"
             f"<p>The NPV is positive, so for the firm as a whole the retrofit is a good project.</p>"),
         "criteria": [
             f"NPV = −30 + 36.2/1.04 = {f(NPV3)}.",
             "Uses the expected increase in each state, not the increase in one state only.",
             "Says that the retrofit creates value for the firm as a whole.",
         ]},
        {"label": "c", "points": 5,
         "body": (
             "<p>The retrofit can only be financed by selling new shares to outside investors at a fair price. "
             "What fraction of the equity must they receive? Will the founder go ahead? How much do the founder "
             "and the bondholders each gain or lose compared with (a)?</p>"),
         "solution": (
             "<p><b>Step 1. Payoffs with the retrofit.</b> With high fuel prices the assets are worth "
             "90 + 50 = 140, still below 150, so Northgale still defaults:</p>" + e3_tab_c +
             f"<p><b>Step 2. Value of all the equity with the retrofit.</b> 0.6 × 137/1.04 = 82.2/1.04 = "
             f"<b>{f(Eall3c)}</b>.</p>"
             f"<p><b>Step 3. The new shareholders' fraction.</b> In a competitive market they pay 30 for a stake "
             f"worth exactly 30: x × {f(Eall3c)} = 30, so x = <b>{p(x3c)}</b>.</p>"
             f"<p><b>Step 4. The founder.</b> The founder keeps {p(1 - x3c)} × {f(Eall3c)} = {f(founder3c)} "
             f"(the same as {f(Eall3c)} − 30), against {f(E3a)} without the retrofit: a change of "
             f"<b>{f(dF3c)}</b>. <b>The founder does not go ahead</b>: the firm forgoes a positive-NPV "
             f"project.</p>"
             f"<p><b>Step 5. The bondholders.</b> With the retrofit the bond is worth (0.6 × 150 + 0.4 × 140)/1.04 "
             f"= 146/1.04 = {f(D3c)}, against {f(D3a)}: a change of <b>+{f(dD3c)}</b>. The bondholders would "
             f"love the retrofit: in the high-fuel state they receive the whole 50 it adds.</p>"
             f"<p><b>Check.</b> Bondholders +{f(dD3c)}, founder {f(dF3c)}, new shareholders 0 (they pay 30 for "
             f"30): {f(dD3c)} − {f(-dF3c)} = {f(NPV3)} = the NPV ✓. The bondholders capture more than the whole "
             f"NPV, which is why the founder says no.</p>"),
         "criteria": [
             "Sees that the firm still defaults with high fuel prices (140 is below 150), so only the low-fuel "
             f"state gives equity: all equity is worth 0.6 × 137/1.04 = {f(Eall3c)}.",
             f"Fraction from x × {f(Eall3c)} = 30: x = {p(x3c)}. Dividing by the undiscounted 82.2 "
             f"({p(I3 / (pLo * (VLo2 - F3)))}) or by the low-state payoff alone is wrong.",
             f"Founder: {f(founder3c)} against {f(E3a)}, a loss of {f(-dF3c)}, so the founder does not go ahead.",
             f"Bondholders: {f(D3c)} against {f(D3a)}, a gain of {f(dD3c)}.",
             f"The check {f(dD3c)} − {f(-dF3c)} = {f(NPV3)} = NPV is a bonus.",
         ]},
        {"label": "d", "points": 5,
         "body": (
             "<p>The founder asks the bondholders to cut the face value to £F million if the retrofit is "
             "installed, again financed by selling new shares to outside investors at a fair price; otherwise "
             "it stays at £150 million. For which F are both the bondholders and the founder at least as well "
             "off as in (a)?</p>"),
         "solution": (
             f"<p><b>Step 1. The benchmarks.</b> If the bondholders refuse, the retrofit is not installed "
             f"(from (c)), so each party compares with (a): the bondholders with {f(D3a)} and the founder with "
             f"{f(E3a)}. Not with the face value of 150 and not with {f(D3c)} from (c).</p>"
             f"<p><b>Step 2. Is the new bond safe?</b> With the retrofit the assets are worth at least 140. For "
             f"F ≤ 140 the bond is repaid in full in both states and is worth F/1.04.</p>"
             f"<p><b>Step 3. The bondholders accept</b> if F/1.04 ≥ {f(D3a)}, that is F ≥ {f(D3a)} × 1.04 = "
             f"<b>{f(Fmin3)}</b>.</p>"
             f"<p><b>Step 4. The founder goes ahead</b> if the stake left after selling shares worth 30 is worth "
             f"at least {f(E3a)}. All equity is worth [0.6(287 − F) + 0.4(140 − F)]/1.04 = (228.2 − F)/1.04, so</p>"
             f"<p>(228.2 − F)/1.04 − 30 ≥ {f(E3a)} ⇔ 228.2 − F ≥ {f(E3a + I3)} × 1.04 = {f((E3a + I3) * (1 + rf3))} "
             f"⇔ F ≤ <b>{f(Fmax3)}</b></p>"
             f"<p><b>Step 5. Face values above 140.</b> Then Northgale defaults with high fuel prices and the "
             f"founder needs 0.6(287 − F)/1.04 − 30 ≥ {f(E3a)}, that is F ≤ {f(Fcap3)}, which contradicts F &gt; 140. "
             f"No such F works.</p>"
             f"<p><b>Answer: any F from {f(Fmin3, 0)} to {f(Fmax3, 0)}</b> (£ million) gets everyone on board; "
             f"strictly inside the range both parties gain.</p>"
             f"<p><b>Example and check.</b> With F = 128 the bond is safe and worth 128/1.04 = {f(Dex3)} "
             f"(+{f(Dex3 - D3a)}), the new shareholders receive 30/{f(Eallex3)} = {p(xex3)} and the founder keeps "
             f"{f(Fex_founder3)} (+{f(Fex_founder3 - E3a)}). {f(Dex3 - D3a)} + {f(Fex_founder3 - E3a)} = "
             f"{f(NPV3)} = the NPV ✓. The range is {f(Fmax3 - Fmin3, 0)} wide: the NPV measured at Year 1, "
             f"{f(NPV3)} × 1.04 = {f(NPV3 * (1 + rf3), 0)}, is what the two parties can share.</p>"),
         "criteria": [
             f"Uses the right benchmarks: the values without the retrofit from (a), {f(D3a)} and {f(E3a)}. "
             f"Comparing the bondholders with 150 or with {f(D3c)} from (c) is the classic error: without the "
             "cut the retrofit is not installed.",
             "Sees that the new bond is safe for F ≤ 140, so it is worth F/1.04.",
             f"Bondholders: F ≥ {f(Fmin3, 0)}.",
             f"Founder: (228.2 − F)/1.04 − 30 ≥ {f(E3a)}, so F ≤ {f(Fmax3, 0)}. Forgetting that the founder "
             "pays for the retrofit by giving up shares worth 30 is the second classic error.",
             f"States the range {f(Fmin3, 0)} ≤ F ≤ {f(Fmax3, 0)}. Ruling out F above 140, an example inside the "
             "range or the check that the gains add up to the NPV is a bonus.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Explain briefly the founder's decision in (c) and the bondholders' position in (d). Who "
             "captures the value of the retrofit in each case?</p>"),
         "solution": (
             f"<p><b>In (c).</b> The retrofit has a positive NPV of {f(NPV3)}, yet the founder turns it down: "
             f"the firm forgoes a positive-NPV project because of its debt (debt overhang). The bond is senior, "
             f"so with high fuel prices the whole 50 from the retrofit goes to the bondholders (their payoff "
             f"rises from 90 to 140), while the founder pays for the retrofit by giving away {p(x3c)} of the "
             f"equity. The project is a wealth transfer from the founder to the bondholders: they gain "
             f"{f(dD3c)}, more than the whole NPV, while the founder loses {f(-dF3c)}.</p>"
             f"<p><b>In (d).</b> A claim of 150 is worth only {f(D3a)} to the bondholders, because they receive "
             f"just 90 when fuel prices are high. A smaller claim that is repaid in full is worth more than a "
             f"larger one that defaults 40% of the time, so they gain by cutting the face value to between "
             f"{f(Fmin3, 0)} and {f(Fmax3, 0)}. With the cut Northgale no longer defaults, the founder keeps "
             f"the upside of the retrofit and the NPV is shared instead of lost.</p>"
             f"<p><b>Also accepted.</b> In practice renegotiation is hard when the bonds are held by many "
             f"investors: each one would rather keep the full claim and let the others take the cut (a "
             f"hold-out problem).</p>"),
         "criteria": [
             "Key sentence, about half the marks (lecture 04, 44:31): the firm forgoes a positive-NPV project "
             "because of its existing debt.",
             "Mechanism: the bond is senior, so the bondholders capture the payoff of the retrofit in the "
             f"default state; a wealth transfer from the founder to the bondholders (+{f(dD3c)} against "
             f"−{f(-dF3c)}).",
             f"Renegotiation: a smaller safe claim is worth more than a larger risky one worth {f(D3a)}, so the "
             "bondholders gain by cutting the face value and the NPV is shared.",
             "Naming debt overhang without the mechanism earns 1 of 3.",
         ]},
    ],
}
SVAR[f"{SID}:3:a"] = {"type": "tall", "tall": [
    tall("Bond", D3a, "£ m"), tall("Equity", E3a, "£ m")],
    "merknad": f"Fellen er pålydende diskontert, {f(F3 / (1 + rf3))}; da blir egenkapitalen {f(V3a - F3 / (1 + rf3))}."}
SVAR[f"{SID}:3:b"] = {"type": "tall", "tall": [tall("NPV", NPV3, "£ m")],
    "merknad": "Udiskontert NPV 6,2 faller utenfor toleransen."}
SVAR[f"{SID}:3:c"] = {"type": "blandet", "tall": [
    tall("Fraction to new shareholders", 100 * x3c, "%"),
    tall("Change for the founder", dF3c, "£ m", alt=[-dF3c]),
    tall("Change for the bondholders", dD3c, "£ m")],
    "tallPoeng": 3, "tekstLedd": "Will the founder go ahead?",
    "merknad": (f"Fellene: 30/82,2 = {p(I3 / (pLo * (VLo2 - F3)))} (udiskontert) og 30/131,7308 = "
                f"{p(I3 / ((VLo2 - F3) / (1 + rf3)))} (bare lav tilstand). Begge fortegn godtas for gründerens "
                "endring; retningen rettes i tekstdelen.")}
SVAR[f"{SID}:3:d"] = {"type": "tall", "tall": [
    tall("Smallest F", Fmin3, "£ m"),
    tall("Largest F", Fmax3, "£ m")],
    "merknad": (f"Fellene: {f(D3c * (1 + rf3), 0)} (kreditorene sammenlignet med (c)), 150 og "
                f"{f(EVsum3 - E3a * (1 + rf3), 1)} (gründeren uten de 30 som betales) faller utenfor.")}
SVAR[f"{SID}:3:e"] = {"type": "tekst"}
TRAPS = {  # (nøkkel, tallnr): feller som ikke skal godtas
    (f"{SID}:3:a", 0): [F3 / (1 + rf3), D3a * (1 + rf3)],
    (f"{SID}:3:a", 1): [V3a - F3 / (1 + rf3), E3a * (1 + rf3)],
    (f"{SID}:3:b", 0): [pLo * gLo + pHi * gHi - I3],
    (f"{SID}:3:c", 0): [100 * I3 / (pLo * (VLo2 - F3)), 100 * I3 / ((VLo2 - F3) / (1 + rf3))],
    (f"{SID}:3:c", 2): [F3 / (1 + rf3) - D3a],
    (f"{SID}:3:d", 0): [D3c * (1 + rf3), F3], (f"{SID}:3:d", 1): [EVsum3 - E3a * (1 + rf3)],
}


# =============================================================================
# E4 · WACC og APV over to år med gjeldsjustering (18 p, 9 × 2)
# =============================================================================
rf4, rm4 = 0.03, 0.09
mrp4 = rm4 - rf4
bE_tw, DE_tw, rD_tw = 1.35, 0.25, 0.042
d4, rD4, tau4 = 0.40, 0.05, 0.21
C1, C2 = 48.0, 75.0

bD_tw = (rD_tw - rf4) / mrp4
dv_tw = DE_tw / (1 + DE_tw)
rE_tw = rf4 + bE_tw * mrp4
bU4 = (1 - dv_tw) * bE_tw + dv_tw * bD_tw
rU4 = rf4 + bU4 * mrp4
assert close(rU4, (1 - dv_tw) * rE_tw + dv_tw * rD_tw)      # direkte vei gir det samme
DE4 = d4 / (1 - d4)


def kjede(rU, rw=None):
    """Alle tallene i kjeden for gitt r_U (og eventuelt en gitt r_wacc)."""
    rE = rU + DE4 * (rU - rD4)
    rw_calc = (1 - d4) * rE + d4 * rD4 * (1 - tau4)
    assert close(rw_calc, rU - d4 * tau4 * rD4)
    rw = rw_calc if rw is None else rw
    V1 = C2 / (1 + rw)
    V0 = (C1 + V1) / (1 + rw)
    D0, D1 = d4 * V0, d4 * V1
    return dict(rE=rE, rw=rw, V0=V0, V1=V1, D0=D0, D1=D1, adj=D0 - D1)


def apv(rU, D0, D1):
    VU = C1 / (1 + rU) + C2 / (1 + rU) ** 2
    TS1, TS2 = tau4 * rD4 * D0, tau4 * rD4 * D1
    PVTS = TS1 / (1 + rU) + TS2 / (1 + rU) ** 2
    return dict(VU=VU, TS1=TS1, TS2=TS2, PVTS=PVTS, VL=VU + PVTS)


K = kjede(rU4)
A = apv(rU4, K["D0"], K["D1"])
assert close(A["VL"], K["V0"], 1e-12)                       # WACC = APV
rE4, rw4 = K["rE"], K["rw"]
bD4 = (rD4 - rf4) / mrp4
assert close(rE4, rf4 + (bU4 + DE4 * (bU4 - bD4)) * mrp4)  # relevering av betaene gir samme r_E
assert K["adj"] > 0                                         # gjeld betales ned
# reserveverdier
# feller
VU_trap_D0 = d4 * A["VU"]
PVTS_rD = A["TS1"] / (1 + rD4) + A["TS2"] / (1 + rD4) ** 2
PVTS_rw = A["TS1"] / (1 + rw4) + A["TS2"] / (1 + rw4) ** 2
rU_trapDE = rf4 + ((1 - DE_tw) * bE_tw + DE_tw * bD_tw) * mrp4
rU_traptax = (1 - dv_tw) * rE_tw + dv_tw * rD_tw * (1 - tau4)
rE_trapDV = rU4 + d4 * (rU4 - rD4)
rE_trapDEtw = rU4 + DE_tw * (rU4 - rD4)

E4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18, "topic": "WACC and APV",
    "chapters": [3, 4, 17, 18, 19],
    "merke": "Som H2025 E4: 9 × 2 poeng, med en sammenlignbar bedrift · WACC og APV 80 %",
    "body": (
        "<p>Kittredge Environmental Inc. holds a two-year contract to clean up a former steel works. Its "
        "free cash flows are $48 million at the end of Year 1 and $75 million at the end of Year 2; then it "
        "is wound up. It keeps a debt-to-value ratio of 40% and its cost of debt is 5%. Kittredge is not "
        "listed, but Redwater Remediation Corp. has the same business risk. Redwater keeps a debt-to-equity "
        "ratio of 0.25; its debt has an expected return of 4.2% and its equity beta is 1.35. The risk-free "
        "rate is 3% per year and will stay the same, the expected market return is 9% and the tax rate is "
        "21%.</p>"
        "<p>Each question is worth 2 points. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 2,
         "body": "<p>Find the debt beta of Redwater.</p>",
         "solution": (
             "<p>Redwater's debt is risky (4.2% &gt; 3%), so invert the CAPM for the debt. The market risk "
             "premium is 9% − 3% = 6%:</p>"
             f"<p>β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
             f"(0.042 − 0.03)/0.06 = <b>{f(bD_tw)}</b></p>"),
         "criteria": [
             "Inverts the CAPM on the debt: β_D = (r_D − r_f)/(E[R_Mkt] − r_f).",
             "Market risk premium 0.09 − 0.03 = 0.06, not 0.09.",
             f"β_D = {f(bD_tw)}.",
         ]},
        {"label": "b", "points": 2,
         "body": "<p>Find the unlevered cost of capital for Kittredge.</p>",
         "solution": (
             f"<p><b>Step 1. Redwater's weights.</b> D/E = 0.25, so D/V = 0.25/1.25 = {f(dv_tw)} and E/V = "
             f"{f(1 - dv_tw)}.</p>"
             f"<p><b>Step 2. Unlever Redwater</b>, through betas or directly:</p>"
             f"<p>β<sub>U</sub> = 0.8 × 1.35 + 0.2 × 0.2 = 1.08 + 0.04 = {f(bU4)}, so r<sub>U</sub> = 0.03 + "
             f"{f(bU4, 2)} × 0.06 = <b>{f(rU4)} ({p(rU4)})</b><br>"
             f"Directly: r<sub>E</sub> of Redwater = 0.03 + 1.35 × 0.06 = {f(rE_tw)}, so r<sub>U</sub> = "
             f"0.8 × {f(rE_tw, 3)} + 0.2 × 0.042 = {f(0.8 * rE_tw)} + {f(0.2 * rD_tw)} = {f(rU4)} ✓</p>"
             f"<p><b>Step 3.</b> Kittredge has the same business risk, so its r<sub>U</sub> is also "
             f"{p(rU4)}. r<sub>U</sub> does not depend on leverage or taxes.</p>"),
         "criteria": [
             "Converts Redwater's D/E = 0.25 into D/V = 0.2 and E/V = 0.8. Using 0.25 and 0.75 as weights "
             f"gives {p(rU_trapDE, 3)} and is the classic error.",
             f"r_U = {p(rU4)}, through betas (β_U = {f(bU4, 2)}) or by weighting Redwater's returns.",
             "No (1 − τ) in r_U. The comparable is used because it has the same business risk.",
         ]},
        {"label": "c", "points": 2,
         "body": "<p>Find Kittredge's cost of equity.</p>",
         "solution": (
             f"<p>Kittredge's D/V = 0.4, so D/E = 0.4/0.6 = {f(DE4)}. MM Proposition II:</p>"
             f"<p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = {f(rU4)} + "
             f"{f(DE4)} × ({f(rU4)} − 0.05) = {f(rU4)} + {f(DE4 * (rU4 - rD4))} = <b>{f(rE4)} ({p(rE4)})</b></p>"
             f"<p>Same result through betas: β<sub>D</sub> = (0.05 − 0.03)/0.06 = {f(bD4)} and β<sub>E</sub> = "
             f"{f(bU4, 2)} + {f(DE4)} × ({f(bU4, 2)} − {f(bD4)}) = {f(bU4 + DE4 * (bU4 - bD4))}, so r<sub>E</sub> = "
             f"0.03 + {f(bU4 + DE4 * (bU4 - bD4))} × 0.06 = {f(rE4)} ✓</p>"),
         "criteria": [
             f"Uses Kittredge's own leverage: D/E = 0.4/0.6 = {f(DE4)}. Putting D/V = 0.4 into MM II gives "
             f"{p(rE_trapDV, 3)}; using Redwater's D/E gives {p(rE_trapDEtw, 3)}.",
             f"r_E = {p(rE4)}, from MM II or by relevering the betas.",
             "Uses Kittredge's cost of debt, 5%, not Redwater's 4.2%.",
         ]},
        {"label": "d", "points": 2,
         "body": "<p>Find Kittredge's after-tax WACC.</p>",
         "solution": (
             f"<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = 0.6 × "
             f"{f(rE4)} + 0.4 × 0.05 × 0.79 = {f(0.6 * rE4)} + {f(0.4 * 0.05 * 0.79)} = "
             f"<b>{f(rw4)} ({p(rw4)})</b></p>"
             f"<p>Cross-check: r<sub>wacc</sub> = r<sub>U</sub> − d·τ<sub>c</sub>·r<sub>D</sub> = {f(rU4)} − "
             f"0.4 × 0.21 × 0.05 = {f(rU4)} − {f(d4 * tau4 * rD4)} = {f(rw4)} ✓</p>"),
         "criteria": [
             "(1 − τ) applies to r_D only, with the weights E/V = 0.6 and D/V = 0.4.",
             f"r_wacc = {p(rw4)}.",
             "The shortcut r_U − d·τ·r_D is a fast cross-check, not a requirement.",
         ]},
        {"label": "e", "points": 2,
         "body": "<p>Find the levered value today using the WACC method.</p>",
         "solution": (
             f"<p>Discount the free cash flows at r<sub>wacc</sub>; the tax shield is already in the rate:</p>"
             f"<p>V<sup>L</sup><sub>0</sub> = 48/{f(1 + rw4, 3)} + 75/{f(1 + rw4, 3)}<sup>2</sup> = "
             f"{f(C1 / (1 + rw4), 5)} + {f(C2 / (1 + rw4) ** 2, 5)} = <b>${f(K['V0'])} million</b></p>"),
         "criteria": [
             f"Discounts both cash flows at {p(rw4)}, the Year-2 flow over two years.",
             f"V^L_0 = {f(K['V0'])}.",
             f"Discounting at r_U gives V^U = {f(A['VU'])}, which is part (g), not this part.",
         ]},
        {"label": "f", "points": 2,
         "body": ("<p>Find the levered value at the end of Year 1 (of the cash flow still to come) and the "
                  "debt at Year 0 and Year 1. How much does Kittredge borrow or repay at the end of Year "
                  "1?</p>"),
         "solution": (
             f"<p>With a constant D/V the debt is D<sub>t</sub> = 0.4 × V<sup>L</sup><sub>t</sub>.</p>"
             f"<p>V<sup>L</sup><sub>1</sub> = 75/{f(1 + rw4, 3)} = <b>{f(K['V1'])}</b> (only the Year-2 flow is "
             f"left once the Year-1 flow has been paid)<br>"
             f"D<sub>0</sub> = 0.4 × {f(K['V0'])} = <b>{f(K['D0'])}</b><br>"
             f"D<sub>1</sub> = 0.4 × {f(K['V1'])} = <b>{f(K['D1'])}</b></p>"
             f"<p>Debt adjustment = {f(K['D0'])} − {f(K['D1'])} = <b>${f(K['adj'])} million repaid</b> at the "
             f"end of Year 1. The firm's value falls as the contract runs down, so Kittredge pays back debt to "
             f"keep D/V at 40%.</p>"),
         "criteria": [
             "D_t = 0.4 × V^L_t at both dates.",
             f"V^L_1 = 75/{f(1 + rw4, 3)} = {f(K['V1'])}: the value after the Year-1 flow. Including the $48 "
             f"million (D_1 = {f(d4 * (C1 + K['V1']))}) is the classic error.",
             f"D_0 = {f(K['D0'])}, D_1 = {f(K['D1'])}, adjustment {f(K['adj'])}.",
             "Says that Kittredge repays debt.",
         ]},
        {"label": "g", "points": 2,
         "body": "<p>Find the unlevered value of Kittredge today using the APV method.</p>",
         "solution": (
             f"<p>The same free cash flows at r<sub>U</sub> = {p(rU4)}:</p>"
             f"<p>V<sup>U</sup><sub>0</sub> = 48/{f(1 + rU4)} + 75/{f(1 + rU4)}<sup>2</sup> = "
             f"{f(C1 / (1 + rU4), 5)} + {f(C2 / (1 + rU4) ** 2, 5)} = <b>${f(A['VU'])} million</b></p>"
             f"<p>V<sup>U</sup> is below V<sup>L</sup> from (e); the difference is the value of the tax shield, "
             f"part (h).</p>"),
         "criteria": [
             "Discounts the free cash flows at r_U, not at r_wacc or r_D.",
             f"V^U = {f(A['VU'])}.",
         ]},
        {"label": "h", "points": 2,
         "body": "<p>Find the interest tax shield in each year and its present value.</p>",
         "solution": (
             f"<p><b>Step 1. The shields.</b> TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × "
             f"D<sub>t−1</sub>, with the debt at the start of each year from (f):</p>"
             f"<p>TS<sub>1</sub> = 0.21 × 0.05 × {f(K['D0'])} = <b>{f(A['TS1'])}</b><br>"
             f"TS<sub>2</sub> = 0.21 × 0.05 × {f(K['D1'])} = <b>{f(A['TS2'])}</b></p>"
             f"<p><b>Step 2. The rate.</b> With a constant D/V the debt (and so the shield) moves with the value "
             f"of the firm, so the shield is as risky as the assets: discount at r<sub>U</sub>.</p>"
             f"<p>PV(TS) = {f(A['TS1'])}/{f(1 + rU4)} + {f(A['TS2'])}/{f(1 + rU4)}<sup>2</sup> = "
             f"{f(A['TS1'] / (1 + rU4))} + {f(A['TS2'] / (1 + rU4) ** 2)} = <b>${f(A['PVTS'])} million</b></p>"),
         "criteria": [
             f"TS_t = τ × r_D × D_(t−1): {f(A['TS1'])} and {f(A['TS2'])}.",
             f"Discounts at r_U and says why (constant D/V). At r_D the answer would be {f(PVTS_rD)}; at "
             f"r_wacc {f(PVTS_rw)}.",
             f"PV(TS) = {f(A['PVTS'])}. Carry 4 decimals: the key to H2025 accepted an error of about 0.001.",
         ]},
        {"label": "i", "points": 2,
         "body": ("<p>Find the levered value with APV and compare with (e). What does the difference between "
                  "r<sub>U</sub> and r<sub>wacc</sub> represent (one or two sentences)?</p>"),
         "solution": (
             f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {f(A['VU'])} + {f(A['PVTS'])} = "
             f"<b>${f(A['VL'])} million</b>, the same as the WACC value in (e) ✓.</p>"
             f"<p><b>Interpretation.</b> r<sub>wacc</sub> = r<sub>U</sub> − d·τ<sub>c</sub>·r<sub>D</sub>: the "
             f"gap of {f(100 * (rU4 - rw4), 2)} percentage points is the interest tax shield, built into the "
             f"discount rate through the after-tax cost of debt. APV values the same shields as a separate "
             f"cash flow, so the two methods must agree. Because APV used the debt from the WACC method, this "
             f"is a consistency check that catches a wrong rate on the shield or an arithmetic slip, not two "
             f"independent estimates.</p>"),
         "criteria": [
             f"V^L = {f(A['VU'])} + {f(A['PVTS'])} = {f(A['VL'])}, equal to (e).",
             "Interpretation: the gap between r_U and r_wacc is the tax shield on interest (only the (1 − τ) on "
             "r_D differs); WACC puts it in the rate, APV adds it as a separate value.",
             "A difference of about 0.001 from (e) is rounding; much more means a real error.",
         ]},
    ],
}
SVAR[f"{SID}:4:a"] = {"type": "tall", "tall": [tall("β<sub>D</sub> of Redwater", bD_tw, "")]}
SVAR[f"{SID}:4:b"] = {"type": "tall", "tall": [tall("r<sub>U</sub>", 100 * rU4, "%", abs=0.05, tol=0.0001)],
    "merknad": f"Fellene {p(rU_trapDE, 3)} (D/E som vekt), {p(rU_traptax, 3)} (skatt i r_U) og {p(rE_tw, 1)} (Redwaters r_E) faller utenfor."}
SVAR[f"{SID}:4:c"] = {"type": "tall", "tall": [tall("r<sub>E</sub>", 100 * rE4, "%", abs=0.05, tol=0.0001)],
    "merknad": f"Fellene {p(rE_trapDV, 3)} (D/V i MM II) og {p(rE_trapDEtw, 3)} (Redwaters D/E) faller utenfor."}
SVAR[f"{SID}:4:d"] = {"type": "tall", "tall": [tall("r<sub>wacc</sub>", 100 * rw4, "%", abs=0.02, tol=0.0001)],
    "merknad": "Fellen r_U (uten skatt) faller utenfor."}
SVAR[f"{SID}:4:e"] = {"type": "tall", "tall": [
    tall("V<sup>L</sup><sub>0</sub> (WACC)", K["V0"], "$ m", tol=0.0025)],
    "merknad": "Toleransen er 0,25 % så V^U faller utenfor."}
SVAR[f"{SID}:4:f"] = {"type": "blandet", "tall": [
    tall("V<sup>L</sup><sub>1</sub>", K["V1"], "$ m", tol=0.002),
    tall("D<sub>0</sub>", K["D0"], "$ m", tol=0.0025),
    tall("D<sub>1</sub>", K["D1"], "$ m", tol=0.002),
    tall("Debt adjustment", K["adj"], "$ m", tol=0.005, alt=[-K["adj"]])],
    "tallPoeng": 1.5, "tekstLedd": "Does Kittredge borrow or repay?",
    "merknad": "Begge fortegn godtas for justeringen; retningen rettes i tekstdelen. Toleransene skiller ut gjelden regnet fra V^U."}
SVAR[f"{SID}:4:g"] = {"type": "tall", "tall": [
    tall("V<sup>U</sup><sub>0</sub>", A["VU"], "$ m", tol=0.0025)],
    "merknad": "Toleransen er 0,25 % så V^L faller utenfor."}
SVAR[f"{SID}:4:h"] = {"type": "tall", "tall": [
    tall("TS<sub>1</sub>", A["TS1"], "$ m", tol=0.0025),
    tall("TS<sub>2</sub>", A["TS2"], "$ m", tol=0.002),
    tall("PV(TS)", A["PVTS"], "$ m", tol=0.002)],
    "merknad": f"Toleransen for PV(TS) er 0,2 % så skjoldet diskontert med r_wacc ({f(PVTS_rw)}) faller utenfor; med r_D blir det {f(PVTS_rD)}."}
SVAR[f"{SID}:4:i"] = {"type": "blandet", "tall": [
    tall("V<sup>L</sup><sub>0</sub> (APV)", A["VL"], "$ m", tol=0.0001)],
    "tallPoeng": 1, "tekstLedd": "Explain what the difference between r_U and r_wacc represents.",
    "merknad": f"Toleransen er 0,01 % så skjoldet diskontert med r_D ({f(A['VU'] + PVTS_rD)}) faller utenfor. Skjoldet med r_wacc ({f(A['VU'] + PVTS_rw)}) kan ikke skilles ut her; det fanges i (h)."}
TRAPS.update({
    (f"{SID}:4:b", 0): [100 * rU_trapDE, 100 * rU_traptax, 100 * rE_tw],
    (f"{SID}:4:c", 0): [100 * rE_trapDV, 100 * rE_trapDEtw, 100 * rE_tw],
    (f"{SID}:4:d", 0): [100 * rU4],
    (f"{SID}:4:e", 0): [A["VU"]],
    (f"{SID}:4:f", 1): [VU_trap_D0], (f"{SID}:4:f", 2): [d4 * C2 / (1 + rU4), d4 * (C1 + K["V1"])],
    (f"{SID}:4:g", 0): [K["V0"]],
    (f"{SID}:4:h", 2): [PVTS_rw, PVTS_rD],
    (f"{SID}:4:i", 0): [A["VU"] + PVTS_rD],
})


# =============================================================================
# E5 · Risikabel obligasjon og CDS, løpetid to år (20 p)
# =============================================================================
rf5, y5, R5, preal5 = 0.025, 0.065, 58.0, 0.06
T5 = 2
Fbond = 100.0
FV5 = 20.0                              # € millioner pålydende
P1_5 = Fbond / (1 + rf5) ** T5
P2_5 = Fbond / (1 + y5) ** T5
Epay5 = (1 - preal5) * Fbond + preal5 * R5
er2_5 = Epay5 / P2_5 - 1
er5 = (1 + er2_5) ** (1 / T5) - 1
rho5 = (Fbond - P2_5 * (1 + rf5) ** T5) / (Fbond - R5)
assert 0 < rho5 < 1 and rho5 > preal5 and rho5 / preal5 < 4
assert close(((1 - rho5) * Fbond + rho5 * R5) / (1 + rf5) ** T5, P2_5)
cds5 = rho5 / (1 + rf5) ** T5
assert rf5 < er5 < y5
N5 = FV5 * (Fbond - R5) / Fbond          # millioner kontrakter (tap per € pålydende × pålydende)
cost5 = N5 * cds5
bonds5 = FV5 * P2_5 / Fbond
tot5 = bonds5 + cost5
assert close(tot5, FV5 / (1 + rf5) ** T5)  # obligasjonen pluss beskyttelse = risikofri obligasjon
put5 = P1_5 - P2_5
assert close(put5, (Fbond - R5) * cds5)    # gjeld = PV(F) − put
# feller
rho5_surv = 1 - rho5
rho5_1yr = (Fbond - P2_5 * (1 + rf5)) / (Fbond - R5)
rho5_simple = (Fbond - P2_5 * (1 + T5 * rf5)) / (Fbond - R5)          # enkel rente på r_f
P1_5_simple, P2_5_simple = Fbond / (1 + T5 * rf5), Fbond / (1 + T5 * y5)
rho5_allsimple = (Fbond - P2_5_simple * (1 + T5 * rf5)) / (Fbond - R5)
cds5_simple = rho5_allsimple / (1 + T5 * rf5)
er5_half = er2_5 / 2

e5_tab = tab([
    ["No default", f(1 - preal5, 2), f(1 - rho5), "100", "0"],
    ["Default", f(preal5, 2), f(rho5), "58", "1"],
], ["At maturity (Year 2)", "Analysts' probability", "Risk-neutral probability", "Oberwald bond", "CDS"])

E5 = {
    "n": 5, "title": "Credit risk", "points": 20, "topic": "Risky debt and credit default swaps",
    "chapters": [5, 22, 24],
    "merke": "Som CDS-eksemplet i forelesning 13 og V2024 P3, med løpetid to år · kreditt 40 %",
    "body": (
        "<p>Oberwald Kunststoffe AG, a German plastics maker, has two-year zero-coupon bonds with a face value "
        "of €100 and a promised yield of 6.5% per year. Two-year government bonds yield 2.5% per year, the "
        "risk-free rate. Oberwald can default only at maturity and then pays €58 per bond. Analysts put the "
        "probability of default at 6% over the two years.</p>"
        "<p>A credit default swap (CDS) contract pays €1 at maturity if Oberwald defaults and nothing "
        "otherwise. It is paid for today. Let ρ be the risk-neutral probability of default over the two "
        "years. Rates are annually compounded. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Find the prices today of a government bond and an Oberwald bond (face value €100).</p>",
         "solution": (
             f"<p>Both are zero-coupon bonds, so discount the face value over two years at the yield:</p>"
             f"<p>Government bond: 100/1.025<sup>2</sup> = 100/{f((1 + rf5) ** 2, 6)} = <b>€{f(P1_5)}</b><br>"
             f"Oberwald bond: 100/1.065<sup>2</sup> = 100/{f((1 + y5) ** 2, 6)} = <b>€{f(P2_5)}</b></p>"
             f"<p>The promised yield prices the bond as if the €100 were certain; the risk of default is in "
             f"the higher yield.</p>"),
         "criteria": [
             f"Government bond 100/1.025² = {f(P1_5)}.",
             f"Oberwald bond 100/1.065² = {f(P2_5)}: the promised yield discounts the promised €100.",
             f"Simple interest (100/1.05 = {f(P1_5_simple)}, 100/1.13 = {f(P2_5_simple)}) or discounting one "
             "year only is the error.",
         ]},
        {"label": "b", "points": 3,
         "body": ("<p>Using the analysts' probability, find the expected return per year on an Oberwald bond. "
                  "Compare it with the promised yield and the risk-free rate and explain the difference "
                  "briefly.</p>"),
         "solution": (
             f"<p><b>Step 1. Expected payoff.</b> 0.94 × 100 + 0.06 × 58 = 94 + 3.48 = <b>€{f(Epay5, 2)}</b>.</p>"
             f"<p><b>Step 2. Expected return.</b> Over two years: {f(Epay5, 2)}/{f(P2_5)} − 1 = {p(er2_5)}. Per "
             f"year: √{f(1 + er2_5, 6)} − 1 = <b>{p(er5)}</b>.</p>"
             f"<p><b>Comparison.</b> {p(rf5, 1)} &lt; {p(er5)} &lt; {p(y5, 1)}. The promised yield is what the "
             f"bond earns if Oberwald repays in full; with a 6% chance of receiving only €58 the expected return "
             f"is lower. It is still above the risk-free rate, because default tends to happen in bad times, so "
             f"investors demand a risk premium for holding the bond.</p>"),
         "criteria": [
             f"Expected payoff 0.94 × 100 + 0.06 × 58 = {f(Epay5, 2)}.",
             f"Annualises with the square root: {p(er5)} per year. The two-year return {p(er2_5)} or half of it "
             f"({p(er5_half)}) is not the annual rate.",
             "The yield is the return if there is no default; the expected return includes the chance of "
             "default, so it is lower.",
             "Saying why it is above r_f (systematic default risk, a risk premium) is a bonus.",
         ]},
        {"label": "c", "points": 7,
         "body": ("<p>What risk-neutral probability of default ρ does the price of the Oberwald bond imply? What "
                  "is the price of one CDS contract?</p>"),
         "solution": (
             f"<p><b>Step 1. ρ from the bond.</b> Under risk-neutral probabilities the expected payoff discounted "
             f"at the risk-free rate equals the price. With ρ the probability of <b>default</b> (bottom "
             f"branch):</p>" + e5_tab +
             f"<p>[(1 − ρ) × 100 + ρ × 58]/1.025<sup>2</sup> = {f(P2_5)}<br>"
             f"100 − 42ρ = {f(P2_5)} × {f((1 + rf5) ** 2, 6)} = {f(P2_5 * (1 + rf5) ** 2)}<br>"
             f"ρ = {f(Fbond - P2_5 * (1 + rf5) ** 2)}/42 = <b>{f(rho5)} ({p(rho5)})</b></p>"
             f"<p><b>Step 2. The CDS.</b> It pays €1 in default and 0 otherwise. Same risk-neutral probability, "
             f"discounted two years at the risk-free rate:</p>"
             f"<p>CDS = [ρ × 1 + (1 − ρ) × 0]/1.025<sup>2</sup> = {f(rho5)}/{f((1 + rf5) ** 2, 6)} = "
             f"<b>€{f(cds5)}</b></p>"
             f"<p>Keep ρ as the default probability to the end. Solving for survival gives {f(rho5_surv)}, "
             f"the mistake the lecturer singled out: when this example was on an exam, more than half of the "
             f"students lost points by confusing ρ and 1 − ρ (recording 13, 27:31 to 32:24).</p>"),
         "criteria": [
             "Sets up [(1 − ρ) × 100 + ρ × 58]/1.025² = price, with ρ on the default branch.",
             "Discounts over two years at the risk-free rate (the certainty equivalent is the price × 1.025²).",
             f"ρ = {f(rho5)}. The survival probability {f(rho5_surv)} is the classic error; discounting one year "
             f"gives {f(rho5_1yr)} and simple interest {f(rho5_simple)}.",
             f"CDS = ρ/1.025² = €{f(cds5)}. Using the analysts' 6% ({f(preal5 / (1 + rf5) ** 2)}), forgetting to "
             f"discount ({f(rho5)}) or discounting one year ({f(rho5 / (1 + rf5))}) loses the points.",
         ]},
        {"label": "d", "points": 4,
         "body": ("<p>A pension fund holds Oberwald bonds with a total face value of €20 million and wants to "
                  "remove all default risk. How many CDS contracts must it buy and what do they cost? What "
                  "are the bonds and contracts worth together, compared with government bonds with the same "
                  "face value?</p>"),
         "solution": (
             f"<p><b>Step 1. Exposure.</b> In default each €100 of face value pays 58, a loss of €42. €20 million "
             f"of face value is 200,000 bonds, so the loss in default is 200,000 × 42 = €8.4 million. Each "
             f"contract pays €1, so the fund buys <b>{f(N5, 1)} million contracts</b> (face value × loss rate = "
             f"20 × 0.42).</p>"
             f"<p><b>Step 2. Cost.</b> {f(N5, 1)} million × {f(cds5)} = <b>€{f(cost5)} million</b>.</p>"
             f"<p><b>Step 3. Together.</b> The bonds are worth 20 × {f(P2_5 / 100, 6)} = €{f(bonds5)} million, so "
             f"bonds plus contracts are worth {f(bonds5)} + {f(cost5)} = <b>€{f(tot5)} million</b>. That is "
             f"exactly the price of government bonds with the same face value, 20/1.025<sup>2</sup> = "
             f"{f(FV5 / (1 + rf5) ** 2)} ✓: the hedged position pays €20 million in both states, so it must be "
             f"worth the same as a risk-free bond.</p>"
             f"<p><b>Second check.</b> Per bond, 42 × {f(cds5)} = {f(put5)} = {f(P1_5)} − {f(P2_5)}: the "
             f"protection is worth exactly the gap between the risk-free and the risky bond, the put that the "
             f"bondholders have written.</p>"),
         "criteria": [
             f"Number of contracts = face value × loss per €1 of face = 20 × 0.42 = {f(N5, 1)} million. Buying "
             "20 million (one per € of face value) over-insures.",
             f"Cost {f(N5, 1)} × {f(cds5)} = €{f(cost5)} million.",
             f"Bonds {f(bonds5)} + contracts {f(cost5)} = {f(tot5)}, equal to 20/1.025² for a government bond: "
             "the hedge makes the position risk-free.",
             "Seeing that the total must equal the risk-free value without any probability is the insight "
             "the comparison asks for.",
         ]},
        {"label": "e", "points": 3,
         "body": ("<p>Compare ρ with the analysts' 6%. Why do they differ? Which should be used to price the "
                  "CDS?</p>"),
         "solution": (
             f"<p>ρ = {p(rho5)} is almost three times the analysts' 6%. ρ is not a forecast: it is the "
             f"probability that makes the bond price fair when payoffs are discounted at the risk-free rate, so it "
             f"includes the risk premium investors demand. Defaults cluster in recessions, when money is worth "
             f"most to investors, so they price the default state as if it were more likely than it is (other "
             f"premia, such as for illiquidity, end up in ρ too). The CDS must be priced with ρ: it pays in "
             f"exactly the same state as the bond defaults. Only ρ is consistent with the market prices. With "
             f"6% the CDS would be too cheap: buying bonds plus cheap protection would beat the government "
             f"bond with no risk.</p>"),
         "criteria": [
             "ρ is higher because it embeds the risk premium: default happens in bad times and investors are "
             "risk averse. Saying ρ is the market's «real» forecast earns nothing.",
             "Price the CDS with ρ, because it is consistent with the bond prices (no arbitrage: bond plus CDS "
             "equals the risk-free bond).",
             "Illiquidity or a liquidity premium in the yield is accepted as an extra reason.",
         ]},
    ],
}
SVAR[f"{SID}:5:a"] = {"type": "tall", "tall": [
    tall("Price of the government bond", P1_5, "€", tol=0.0002),
    tall("Price of the Oberwald bond", P2_5, "€", tol=0.0002)],
    "merknad": (f"Toleransen er 0,02 % så enkel rente ({f(P1_5_simple)} og {f(P2_5_simple)}) faller utenfor; "
                "95.18 og 88.17 godtas.")}
SVAR[f"{SID}:5:b"] = {"type": "blandet", "tall": [
    tall("Expected return per year", 100 * er5, "%", abs=0.05, tol=0.0001)],
    "tallPoeng": 1.5, "tekstLedd": "Compare with the promised yield and the risk-free rate and explain the difference.",
    "merknad": f"Fellene: toårsavkastningen {p(er2_5)} og halvparten av den ({p(er5_half)}) faller utenfor."}
SVAR[f"{SID}:5:c"] = {"type": "tall", "tall": [
    tall("ρ", 100 * rho5, "%", abs=0.1, tol=0.0001),
    tall("Price of one CDS contract", cds5, "€", tol=0.004)],
    "merknad": (f"Fellene: overlevelse {p(rho5_surv)}, ettårs diskontering {p(rho5_1yr)} og enkel rente "
                f"{p(rho5_simple)} faller utenfor. CDS-toleransen er 0,4 % så enkel rente gjennom hele kjeden "
                f"({f(cds5_simple)}), udiskontert {f(rho5)} og ett år {f(rho5 / (1 + rf5))} faller utenfor.")}
SVAR[f"{SID}:5:d"] = {"type": "blandet", "tall": [
    tall("Number of CDS contracts", N5, "million contracts", alt=[N5 * 1e6]),
    tall("Cost of the contracts", cost5, "€ m", tol=0.004),
    tall("Bonds plus contracts", tot5, "€ m", tol=0.0004)],
    "tallPoeng": 3, "tekstLedd": "How does that compare with government bonds with the same face value?",
    "merknad": (f"alt godtar antallet skrevet ut (8400000). 20 millioner kontrakter er fellen. Toleransen for summen "
                f"er 0,04 % så 20/1,05 = {f(FV5 / (1 + T5 * rf5))} (enkel rente) faller utenfor.")}
SVAR[f"{SID}:5:e"] = {"type": "tekst"}
TRAPS.update({
    (f"{SID}:5:a", 0): [P1_5_simple, Fbond / (1 + rf5)], (f"{SID}:5:a", 1): [P2_5_simple, Fbond / (1 + y5)],
    (f"{SID}:5:b", 0): [100 * er2_5, 100 * er5_half, 100 * y5],
    (f"{SID}:5:c", 0): [100 * rho5_surv, 100 * rho5_1yr, 100 * preal5, 100 * rho5_simple, 100 * rho5_allsimple],
    (f"{SID}:5:c", 1): [rho5, rho5 / (1 + rf5), preal5 / (1 + rf5) ** 2, cds5_simple],
    (f"{SID}:5:d", 0): [FV5], (f"{SID}:5:d", 1): [FV5 * cds5, N5 * cds5_simple],
    (f"{SID}:5:d", 2): [FV5 / (1 + T5 * rf5), FV5 / (1 + rf5)],
})


# =============================================================================
# E6 · Realopsjon: trinnvis finansiering (20 p)
# =============================================================================
rf6 = 0.04
V6 = 160.0                  # verdi ved suksess ved slutten av år 2
q6 = 0.24                   # samlet sannsynlighet for suksess
I_now = 42.0
pilot, line = 5.0, 39.0
pp, ps, pf = 0.40, 0.54, 0.04
assert close(pp * ps + (1 - pp) * pf, q6)
NPV_now = -I_now + q6 * V6 / (1 + rf6) ** 2
n_pass = -line + ps * V6 / (1 + rf6)
n_fail = -line + pf * V6 / (1 + rf6)
assert NPV_now < 0 and n_pass > 0 and n_fail < 0
staged = -pilot + (pp * max(n_pass, 0) + (1 - pp) * max(n_fail, 0)) / (1 + rf6)
val_stage = staged - max(NPV_now, 0)
assert staged > 0 and close(val_stage, staged)
trap_stage = staged - NPV_now
# hvor verdien kommer fra: utsatt investering og muligheten til å stoppe
gain_defer = line - line / (1 + rf6)          # betale 39 ett år senere (samme tidspunkt for alle grener)
# thorough pilot
pilot2, pp2, ps2 = 8.0, 0.32, 0.75
assert close(pp2 * ps2, q6)                   # etter et nei lykkes produktet aldri
n_pass2 = -line + ps2 * V6 / (1 + rf6)
staged2 = -pilot2 + pp2 * max(n_pass2, 0) / (1 + rf6)
assert staged2 > staged and staged2 - staged > pilot2 - pilot
# feller
NPV_now_1yr = -I_now + q6 * V6 / (1 + rf6)
NPV_now_simple = -I_now + q6 * V6 / (1 + 2 * rf6)
n_pass_nodisc = -line + ps * V6
staged_nodisc = -pilot + pp * n_pass
staged_failcont = -pilot + (pp * n_pass + (1 - pp) * n_fail) / (1 + rf6)

E6 = {
    "n": 6, "title": "Real Options", "points": 20, "topic": "Real options", "chapters": [25],
    "merke": "Som eksemplet i L11 s12 (opptak 14, 56:52), med diskontering · realopsjon 85 %, trinnvis investering med en pilot som gir informasjon",
    "body": (
        "<p>Kirkstall Robotics Ltd in Leeds has designed a hospital robot. Whatever Kirkstall does, the robot reaches the market at the end of Year 2, either as a "
        "success, with the business then worth £160 million, or as a failure worth nothing. The probability "
        "of success is 24%. The risk is unrelated to the market, so discount at the risk-free rate of 4% per "
        "year. Kirkstall has two plans:</p>"
        "<ul><li><b>Commit now:</b> pay £42 million today for development and the production line.</li>"
        "<li><b>Stage:</b> pay £5 million today for a one-year pilot. At the end of Year 1 Kirkstall learns "
        "whether the pilot passed (probability 40%) and decides whether to pay £39 million for the line. "
        "After a pass the probability of success is 54%, after a fail 4% (24% overall). Without the line "
        "the project is worth nothing.</li></ul>"
        "<p>Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What is the NPV of committing now? Will Kirkstall do it?</p>",
         "solution": (
             f"<p>The £42 million is paid today and the robot is worth 160 with probability 24% at the end of Year 2:</p>"
             f"<p>NPV = −42 + 0.24 × 160/1.04<sup>2</sup> = −42 + 38.4/{f((1 + rf6) ** 2)} = −42 + "
             f"{f(q6 * V6 / (1 + rf6) ** 2)} = <b>−£{f(-NPV_now)} million</b></p>"
             f"<p>Negative, so <b>Kirkstall does not commit now</b>.</p>"),
         "criteria": [
             "Discounts the Year-2 value over two years.",
             f"NPV = {f(NPV_now)}. Discounting only one year gives {f(NPV_now_1yr)}.",
             "Answers the question: no, Kirkstall does not commit now.",
         ]},
        {"label": "b", "points": 5,
         "body": ("<p>Suppose Kirkstall stages. At the end of Year 1, what is the NPV of building the line "
                  "after a passed pilot and after a failed one? What does Kirkstall do in each case?</p>"),
         "solution": (
             f"<p>Stand at the end of Year 1 and look forward. The £5 million is already spent and does not "
             f"enter; the line costs 39 now and the robot's value arrives one year later.</p>"
             f"<p><b>Pilot passed:</b> −39 + 0.54 × 160/1.04 = −39 + {f(ps * V6 / (1 + rf6))} = "
             f"<b>£{f(n_pass)} million</b> &gt; 0, so <b>Kirkstall builds the line</b>.<br>"
             f"<b>Pilot failed:</b> −39 + 0.04 × 160/1.04 = −39 + {f(pf * V6 / (1 + rf6))} = "
             f"<b>−£{f(-n_fail)} million</b> &lt; 0, so <b>Kirkstall stops</b> and gets 0.</p>"
             f"<p>The stop decision compares with 0, the value of walking away, not with the negative NPV of "
             f"going on: after a failed pilot the project is worth max({f(n_fail)}, 0) = 0.</p>"),
         "criteria": [
             "Values each node from the end of Year 1: the line costs 39 then and the value of 160 comes one "
             "year later.",
             f"After a pass: −39 + 0.54 × 160/1.04 = {f(n_pass)}, so build.",
             f"After a fail: −39 + 0.04 × 160/1.04 = {f(n_fail)}, so stop; the value of that node is 0 "
             "(compared with 0, not with the negative number).",
             "The £5 million pilot cost is sunk at Year 1 and must not enter these NPVs.",
         ]},
        {"label": "c", "points": 4,
         "body": ("<p>What is the NPV today of the staged plan? What is the possibility of staging worth to "
                  "Kirkstall, compared with what it would do if staging were not possible?</p>"),
         "solution": (
             f"<p><b>Step 1. Fold back.</b> Kirkstall builds only after a pass (probability 40%), so</p>"
             f"<p>NPV<sub>staged</sub> = −5 + [0.4 × {f(n_pass)} + 0.6 × 0]/1.04 = −5 + {f(pp * n_pass)}/1.04 = "
             f"−5 + {f(pp * n_pass / (1 + rf6))} = <b>£{f(staged)} million</b></p>"
             f"<p><b>Step 2. The value of staging.</b> Without the option to stage Kirkstall would not invest at "
             f"all (part (a)), so the alternative is worth 0, not {f(NPV_now)}:</p>"
             f"<p>Value of staging = {f(staged)} − max({f(NPV_now)}, 0) = <b>£{f(val_stage)} million</b></p>"
             f"<p>The number {f(staged)} − ({f(NPV_now)}) = {f(trap_stage)} only measures how much staging helps a "
             f"firm that is forced to go ahead; comparing with the negative NPV instead of 0 is the classic "
             f"mistake. Kirkstall starts the pilot, although staging costs £2 million more in total (5 + 39 = 44 "
             f"against 42): it pays the large cost a year later and only in the 40% of cases where the pilot "
             f"passes.</p>"),
         "criteria": [
             f"Folds back: −5 + 0.4 × {f(n_pass)}/1.04 = {f(staged)}, with 0 after a failed pilot.",
             f"Using the negative node ({f(n_fail)}) instead of 0 gives {f(staged_failcont)}; forgetting to "
             f"discount Year 1 gives {f(staged_nodisc)}.",
             f"Value of staging = {f(staged)} − 0 = {f(val_stage)}, since without staging Kirkstall would not "
             f"invest. {f(trap_stage)} (against the negative NPV) is the classic error.",
             "Saying that Kirkstall starts the pilot is expected but carries no separate point.",
         ]},
        {"label": "d", "points": 4,
         "body": ("<p>A more thorough pilot costs £8 million today and passes with probability 32%. After a "
                  "pass the probability of success is 75%; after a fail the robot never succeeds. The line "
                  "still costs £39 million. What is the NPV today of staging with this pilot? Which pilot "
                  "should Kirkstall choose?</p>"),
         "solution": (
             f"<p>The probabilities are again consistent with 24% overall (0.32 × 0.75 = 0.24).</p>"
             f"<p><b>After a pass:</b> −39 + 0.75 × 160/1.04 = −39 + {f(ps2 * V6 / (1 + rf6))} = {f(n_pass2)} "
             f"&gt; 0, so build. <b>After a fail:</b> the robot is worthless, so stop (0).</p>"
             f"<p>NPV = −8 + 0.32 × {f(n_pass2)}/1.04 = −8 + {f(pp2 * n_pass2 / (1 + rf6))} = "
             f"<b>£{f(staged2)} million</b></p>"
             f"<p>{f(staged2)} &gt; {f(staged)}, so <b>Kirkstall should choose the thorough pilot</b>, although "
             f"it costs £3 million more: it is worth {f(staged2 - staged)} more.</p>"),
         "criteria": [
             f"Node after a pass: −39 + 0.75 × 160/1.04 = {f(n_pass2)}; after a fail: stop.",
             f"NPV = −8 + 0.32 × {f(n_pass2)}/1.04 = {f(staged2)}.",
             f"Compares with {f(staged)} from (c) and chooses the thorough pilot.",
         ]},
        {"label": "e", "points": 4,
         "body": ("<p>Kirkstall runs the pilot from (b) and it fails. The project manager wants to build the "
                  "line anyway «so that the £5 million is not wasted». Do you agree? Then explain briefly what "
                  "makes a pilot valuable and how this explains your choice in (d).</p>"),
         "solution": (
             f"<p><b>Sunk cost.</b> No. The £5 million is spent whatever Kirkstall does now, so it must not affect "
             f"the decision; only future cash flows count. Building the line after a failed pilot has an NPV of "
             f"{f(n_fail)}, so it would lose a further £{f(-n_fail)} million in expectation. Stopping is the "
             f"option the staged plan paid for: the value of staging comes precisely from being able to walk "
             f"away after bad news.</p>"
             f"<p><b>What makes a pilot valuable.</b> A pilot tells Kirkstall, before the large £39 million is "
             f"spent, whether the robot is likely to succeed, so the line is built after good news and not after "
             f"bad news. The more sharply the pilot separates the outcomes, the more this option to stop is "
             f"worth (recording 14, 56:52; L11 slide 12). The thorough pilot raises the chance of success after "
             f"a pass from 54% to 75% and leaves none after a fail, so the £39 million is spent only where "
             f"success is likely. That information is worth {f(staged2 - staged)} more, more than the extra £3 "
             f"million it costs, which is why Kirkstall chooses it in (d).</p>"),
         "criteria": [
             "Sunk cost (2 points): disagrees, because the £5 million is spent whatever happens and only future "
             f"cash flows matter; building now has an NPV of {f(n_fail)} < 0.",
             "Ties it to the option: the value of staging comes from stopping after bad news.",
             "What makes a pilot valuable (2 points): it resolves uncertainty before the large investment, so "
             "the line is built only after good news; the more informative the pilot, the more the option to "
             "stop is worth. Links this to (d): the thorough pilot separates the outcomes more sharply.",
             "«More uncertainty resolved before the big investment» is an accepted way to say the same.",
         ]},
    ],
}
SVAR[f"{SID}:6:a"] = {"type": "tall", "tall": [tall("NPV of committing now", NPV_now, "£ m", tol=0.005)],
    "merknad": f"Toleransen er 0,5 % så enkel rente ({f(NPV_now_simple)}) faller utenfor; ett års diskontering gir {f(NPV_now_1yr)}."}
SVAR[f"{SID}:6:b"] = {"type": "blandet", "tall": [
    tall("NPV at Year 1 after a passed pilot", n_pass, "£ m"),
    tall("NPV at Year 1 after a failed pilot", n_fail, "£ m")],
    "tallPoeng": 3, "tekstLedd": "What does Kirkstall do after each result?",
    "merknad": f"Fellen uten diskontering etter et ja ({f(n_pass_nodisc)}) faller utenfor."}
SVAR[f"{SID}:6:c"] = {"type": "tall", "tall": [
    tall("NPV of the staged plan", staged, "£ m"),
    tall("Value of the possibility of staging", val_stage, "£ m")],
    "merknad": (f"Fellene: {f(trap_stage)} (sammenlignet med den negative "
                f"NPV-en), {f(staged_nodisc)} (uten diskontering) og {f(staged_failcont)} (bygger også etter et nei).")}
SVAR[f"{SID}:6:d"] = {"type": "blandet", "tall": [
    tall("NPV with the thorough pilot", staged2, "£ m")],
    "tallPoeng": 3, "tekstLedd": "Which pilot should Kirkstall choose?"}
SVAR[f"{SID}:6:e"] = {"type": "tekst"}
TRAPS.update({
    (f"{SID}:6:a", 0): [NPV_now_1yr, NPV_now_simple],
    (f"{SID}:6:b", 0): [n_pass_nodisc],
    (f"{SID}:6:c", 0): [staged_nodisc, staged_failcont], (f"{SID}:6:c", 1): [trap_stage],
    (f"{SID}:6:d", 0): [staged],
})


# =============================================================================
# Settet
# =============================================================================
SETT = {
    "id": SID, "kind": "mock", "fane": "pred", "nr": 2, "label": "Prediksjon 2",
    "minutes": 180, "points": 100,
    "format": "6 oppgaver · 100 poeng · ingen flervalg",
    "note": ("Den nest mest sannsynlige eksamenen: temaene prediksjon 1 ikke dekker, med kreditt og trinnvis "
             "investering med en pilot som gir informasjon. Poengfordelingen er den samme som i begge "
             "Kurbatov-settene."),
    "facts": [
        "Prediction exam in Kurbatov's format: 6 exercises, 100 points, 180 minutes, no multiple choice, "
        "calculator and one bilingual dictionary permitted.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20, as in both of Kurbatov's papers. Two verbal exercises "
        "with sentence budgets, then four computational exercises.",
        "The formula sheet is handed out.",
        "Recommended precision: 4 decimal places. An error carried forward is not penalised again in later parts.",
        "Written for this app from the prediction of the 2026 exam. Every number in the solutions is computed in "
        "a script.",
    ],
    "exercises": [E1, E2, E3, E4, E5, E6],
}


# =============================================================================
# Kontroller
# =============================================================================
def ren(h):
    h = re.sub(r"</?(sub|sup|b|i|em|strong)>", "", str(h))
    return re.sub(r"<[^>]*>", " ", h).replace("&minus;", "−").replace("&nbsp;", " ")


def skriveregler(hvor, t):
    r = ren(t)
    assert "—" not in r, f"{hvor}: tankestrek"
    assert not re.search(r",\s+and\b", r), f"{hvor}: komma før and: {r[max(0, re.search(r',\s+and', r).start() - 60):][:90]}"
    assert not re.search(r",\s+og\b", r), f"{hvor}: komma før og"
    assert not re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r), f"{hvor}: pronomen"
    assert not re.search(r"(?<![\w.])-\d", r), f"{hvor}: bindestrek som minus: {r[:80]}"


def tallI(tekst):
    t = re.sub(r"<[^>]*>", " ", str(tekst)).replace("&minus;", "−").replace("&nbsp;", " ")
    t = re.sub(r"&[a-z]+;", " ", t).replace("−", "-").replace("–", "-")
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


def godtatt(n, t):
    kand = [t["verdi"], *t.get("alt", [])]
    for v in kand:
        if innenfor(n, v, t):
            return True
        if t["enhet"] == "%" and (innenfor(n * 100, v, t) or
                                  innenfor(n, v / 100, dict(t, abs=t.get("abs", 0) / 100))):
            return True
    return False


ord_totalt = 0
for t in [SETT["note"], SETT["label"], *SETT["facts"]]:
    skriveregler("settet", t)
for e in SETT["exercises"]:
    hvor = f"oppgave {e['n']}"
    for k in ("title", "body", "solution", "merke"):
        if k in e:
            skriveregler(hvor, e[k])
    assert not re.search(r"<[a-zA-Z/]", e["merke"])
    for c in e.get("criteria", []):
        skriveregler(hvor, c)
    ord_e = len(ren(e["body"]).split())
    deler = e.get("parts", [])
    if deler:
        assert sum(x["points"] for x in deler) == e["points"], hvor
        assert 3 <= deler[-1]["points"] <= 5 or e["n"] == 4, f"{hvor}: halen"
        for x in deler:
            for k in ("body", "solution"):
                skriveregler(f"{hvor} {x['label']}", x[k])
            for c in x["criteria"]:
                skriveregler(f"{hvor} {x['label']}", c)
            assert 2 <= len(x["criteria"]) <= 7
            ord_e += len(ren(x["body"]).split())
    ord_totalt += ord_e
    print(f"E{e['n']}: {e['points']} p, {ord_e} ord oppgavetekst")
assert [e["points"] for e in SETT["exercises"]] == [12, 12, 18, 18, 20, 20]
assert sum(e["points"] for e in SETT["exercises"]) == SETT["points"] == 100

# svar-dataene: én oppføring per del, tallene står i løsningsteksten, fellene avvises
nøkler = set()
for e in SETT["exercises"]:
    if e.get("parts"):
        for x in e["parts"]:
            k = f"{SID}:{e['n']}:{x['label']}"
            nøkler.add(k)
            kilde = " ".join([x["solution"], " ".join(x["criteria"])])
            d = SVAR[k]
            if d["type"] == "blandet":
                assert 0 < d["tallPoeng"] < x["points"], k
            for i, t in enumerate(d.get("tall", [])):
                nums = tallI(kilde)
                assert any(godtatt(n, t) for n in nums if innenfor(n, t["verdi"], t) or
                           (t["enhet"] == "%" and (innenfor(n * 100, t["verdi"], t)))), \
                    f"{k} tall {i + 1} ({t['navn']} = {t['verdi']}) står ikke i løsningen"
                if abs(t["verdi"]) < 1e-6:
                    assert "abs" in t
                # en abs under 1 % av verdien virker bare sammen med en liten tol
                if "abs" in t and t["abs"] < 0.01 * abs(t["verdi"]):
                    assert t.get("tol", 0.01) * abs(t["verdi"]) <= t["abs"], f"{k} tall {i + 1}: abs uten tol"
                # riktige svar avrundet til 4 desimaler (og 2 for store tall) godtas
                runde = [round(t["verdi"], 4)] + ([round(t["verdi"], 2)] if abs(t["verdi"]) >= 10 else [])
                if t["enhet"] == "%":
                    runde += [round(t["verdi"], 2), round(t["verdi"] / 100, 4)]
                for r_ in runde:
                    assert godtatt(r_, t), f"{k} tall {i + 1}: det avrundede svaret {r_} avvises"
                for felle in TRAPS.get((k, i), []):
                    assert not godtatt(felle, t), f"{k} tall {i + 1}: fellen {felle} godtas"
                    if t["enhet"] == "%":
                        assert not godtatt(felle / 100, t), f"{k} tall {i + 1}: fellen {felle} godtas som andel"
    else:
        nøkler.add(f"{SID}:{e['n']}:")
assert nøkler == set(SVAR), set(SVAR) ^ nøkler
print(f"{ord_totalt} ord oppgavetekst, {len(SVAR)} svar-oppføringer, "
      f"{sum(len(d.get('tall', [])) for d in SVAR.values())} tall")

with open(os.path.join(HER, "pred2.json"), "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=1)
with open(os.path.join(HER, "pred2_svar.json"), "w", encoding="utf-8") as fh:
    json.dump(SVAR, fh, ensure_ascii=False, indent=1)
print("skrev pred2.json og pred2_svar.json")
