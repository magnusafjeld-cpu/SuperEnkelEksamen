#!/usr/bin/env python3
"""FIE402 Mock exam 4 («det mest sannsynlige settet»): regner alle tall og skriver prove4.json.

Kjør:  python3 -I fag/fie402/_prove/prove4_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove4): emisjon, KPI og kortsiktighet,
skatteskjold i en rekapitalisering med brannsalg, prosjektverdsetting med FCF bygd fra EBIT,
nedleggelsesopsjon med månedsrente og dealsannsynlighet over 3 måneder.

Hvert tall i oppgavetekst, løsning og kriterier kommer fra beregningene her.
Konsistenssjekkene er assert-er: uendret kurs ved tilbakekjøp og aksjonærenes gevinst = PV(TS),
utbytte/r_E = kurs (en ekte sjekk som feiler med MM II uten skatt), FCF/r_wacc = V^L ved
permanent gjeld, WACC = APV (et fast punkt, sagt ærlig), hele beslutningstreet i
realopsjonen, likegyldighet i F og p, at long-short-strategien gjenskaper sikkerhets-
ekvivalenten og at S regnet på to måter og NPV_A + NPV_B = S stemmer.

Til slutt sjekkes poeng (12/12/18/18/20/20, deloppgavene summerer), tankestrek, «, and»,
markup i kriteriene og norsk desimalkomma. Er alt rent, skrives prove4.json og
prove4_oppgave.md (bare oppgaveteksten, til den blinde kontrolløren). Er noe galt,
skrives ingenting.

Avvik fra planen: E4 har rytmen 3/3/2/4/3/3 i stedet for 3/3/2/4/4/2, slik at den verbale
halen får 3 poeng. Da har tre regneoppgaver en hale på 3–5 poeng (spesifikasjonen).
"""

import html
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "prove4.json")
OUT_MD = os.path.join(HERE, "prove4_oppgave.md")

MINUS = "−"
OK = "✓"


# ---------------------------------------------------------------- hjelpere
def close(a, b, tol=1e-9):
    assert abs(a - b) < tol, (a, b)


def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return (MINUS if r < 0 else "") + s


def pc(x, d=4):
    """Rente i prosent: 0.088 -> 8.8000%."""
    return f(100 * x, d) + "%"


def n0(x):
    """Hele tall med tusenskille."""
    return f(x, 0)


def i0(x):
    """Tall som skal være heltall."""
    assert abs(x - round(x)) < 1e-9, x
    return f(round(x), 0)


def P(*paras):
    """Avsnitt i <p>; en tabell står for seg selv (en <table> inne i <p> er ugyldig HTML)."""
    return "".join(p if p.startswith("<table") else f"<p>{p}</p>" for p in paras)


def tbl(header, rows, num=()):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in header) + "</tr>"
    body = ""
    for r in rows:
        body += "<tr>" + "".join(
            (f'<td class="n">{c}</td>' if j in num else f"<td>{c}</td>") for j, c in enumerate(r)
        ) + "</tr>"
    return f'<table class="data">{h}{body}</table>'


def ledd(xs, total, d=4):
    """Velger d eller 6 desimaler slik at de trykte leddene summerer til den trykte totalen."""
    for dd in (d, 6):
        if round(sum(round(x, dd) for x in xs), d) == round(total, d):
            return [f(x, dd) for x in xs]
    raise AssertionError(("summen går ikke opp", xs, total))


# ===========================================================================
# Oppgave 1 · Emisjon: kursfall ved SEO (verbal, 8 + 4)
# ===========================================================================
MV1 = 8_000.0          # NOK mill., markedsverdi av EK før kunngjøring
ISSUE1 = 1_200.0       # NOK mill. som hentes
FALL1 = 0.12
fee1, other1 = 0.053, 0.017   # Kurbatov, lecture_6 s13: 5.3 % honorar og 1.7 % andre kostnader
tap1 = FALL1 * MV1
kost1 = (fee1 + other1) * ISSUE1
close(tap1, 960.0)
close(kost1, 84.0)
andel_kost1 = kost1 / MV1          # om lag 1 % av verdien
andel_tap1 = tap1 / ISSUE1         # 80 % av beløpet som hentes
assert andel_kost1 < 0.011 and abs(andel_tap1 - 0.8) < 1e-12

ex1 = {
    "n": 1,
    "title": "Security issues",
    "points": 12,
    "topic": "Equity issues, asymmetric information, pecking order",
    "chapters": [12, 13, 14],
    "body": P(
        f"Glomfjord Batteri ASA, a listed battery producer with almost no debt and equity worth NOK {f(MV1 / 1000, 0)} "
        f"billion, announces a seasoned equity offering of NOK {f(ISSUE1 / 1000, 1)} billion to build a new factory. On "
        f"the announcement day its share price falls by {pc(FALL1, 0)} while the market is flat.",
        "<b>a)</b> (8 points) What are the potential reasons for the price fall? Describe two distinct reasons, each "
        "worth 4 points. Reasons must be other than «the new shares dilute the existing shareholders». Around five "
        "sentences in total should be enough.",
        "<b>b)</b> (4 points) Suggest a better way to raise the money and explain briefly why the market would react "
        "less negatively. (2-3 sentences.)",
    ),
    "solution": P(
        f"<b>Read the number first.</b> A fall of {pc(FALL1, 0)} on NOK {f(MV1 / 1000, 0)} billion is NOK "
        f"{n0(tap1)} million, {pc(andel_tap1, 0)} of the amount Glomfjord is raising. A drop of that size is news about the "
        "value of the company, not about the mechanics of the issue.",
        "<b>a) Model answer (four sentences).</b> <b>Reason 1: adverse selection (Myers-Majluf).</b> Managers know more "
        "about the company than outside investors and the existing shareholders gain when new shares are sold above "
        "their true value, so a company is most willing to issue equity when its shares are overvalued. Investors know "
        "this and read the announcement as a signal that management thinks the share price is too high, so they revise "
        "the value of the existing assets down. <b>Reason 2: doubt about the factory (agency).</b> The market may "
        "believe that management wants a bigger company more than a more valuable one, so that the factory has a "
        "negative NPV (empire building). Raising equity hands managers cash without the discipline of fixed debt "
        "payments, so the price falls by the value investors expect to be lost.",
        "<b>b) Model answer (three sentences).</b> Borrow the money instead: Glomfjord has almost no debt and the value of "
        "safe debt hardly depends on what management knows, so issuing it says little about whether the shares are "
        "overvalued (the pecking order: internal funds first, then debt, then equity). The interest is also "
        "tax-deductible. If equity is needed, a rights offer to the existing shareholders is cheaper and less "
        "underpriced and leaves no outsiders to sell overvalued shares to, so it carries a weaker signal.",
        "<b>Also accepted in a).</b> Equity chosen over debt as news about cash flows (pecking order): Glomfjord could "
        "have borrowed, so declining to commit to debt payments suggests that management expects weak cash flows. This "
        "counts as a reason distinct from overvaluation only if it is explained as news about future cash flows rather "
        "than about the share price. Market timing: firms tend to issue after a run-up in their share price and "
        "investors read the timing. Free cash flow: more cash weakens management's discipline. Issue costs and "
        f"underpricing as a minor part only: fees of about {pc(fee1, 1)} plus {pc(other1, 1)} other costs on NOK "
        f"{n0(ISSUE1)} million are about NOK {n0(kost1)} million, roughly {pc(andel_kost1, 0)} of the company's value, "
        f"far below the {pc(FALL1, 0)} fall. Moving away from the tax advantage of debt, also minor here.",
        "<b>Not accepted.</b> «Dilution» or «more shares mean a lower price». New shares sold at a fair price bring in "
        "cash worth exactly what the new shareholders pay, so the value per share is unchanged (the dilution fallacy). "
        "The exercise excludes it.",
        "<b>Also accepted in b).</b> Internal funds: cut the dividend or build the factory in stages from retained "
        "earnings. Reduce the information gap before issuing: disclose the contracts behind the factory or bring in a "
        "well-informed anchor investor (a credible certification). Convertible debt as a middle way, if the reason is "
        "given.",
    ),
    "criteria": [
        "a) Reason 1 (4 points): asymmetric information. Managers issue when the shares are overvalued, so the issue "
        "signals overvaluation and investors lower their estimate of the existing assets. Naming 'Myers-Majluf' or "
        "'lemons' without the mechanism earns at most 2 points.",
        "a) Reason 2 (4 points): a second distinct mechanism: doubt about the NPV of the factory or empire building, "
        "market timing after a run-up, or equity chosen over debt as news about weak future cash flows (pecking order). "
        "Overvaluation and the cash-flow signal count as two reasons only if the second is explained as news about cash "
        "flows, not about the share price.",
        f"a) Issue costs or underpricing alone earn at most 2 points: about 7% of NOK {n0(ISSUE1)} million is NOK "
        f"{n0(kost1)} million, roughly 1% of the firm's value, not {pc(FALL1, 0)}.",
        "a) 'Dilution' earns nothing: the exercise excludes it. New shares sold at a fair price do not lower the value "
        "per share.",
        "b) (4 points) A concrete alternative with the reason the market reacts less: safe debt is insensitive to "
        "private information (pecking order), a rights offer leaves no outsiders to sell overvalued shares to, or "
        "internal funds avoid the issue altogether. The alternative without the reason earns 2 points.",
        "Keep to the budget: around five sentences in a), 2-3 in b). No calculation is needed.",
    ],
}

# ===========================================================================
# Oppgave 2 · Governance: KPI og kortsiktighet (verbal, 4/4/4)
# ===========================================================================
BUYBACK2, RD_CUT2 = 0.06, 0.30
eps_mek2 = 1 / (1 - BUYBACK2) - 1      # EPS-økning fra færre aksjer alene, med uendret resultat
assert 0.06 < eps_mek2 < 0.07

ex2 = {
    "n": 2,
    "title": "Governance",
    "points": 12,
    "topic": "Corporate governance",
    "chapters": [6, 27],
    "body": P(
        "Kvitstein Medical, a listed company with dispersed ownership, pays its CEO a cash bonus of about twice the "
        "salary if earnings per share (EPS) reach a target set by the board. With one quarter left, EPS was heading just "
        f"below the target. The company then postponed two clinical trials, cutting R&amp;D spending by {pc(RD_CUT2, 0)}. "
        f"It also bought back {pc(BUYBACK2, 0)} of its shares with cash meant for a new laboratory. EPS ended just above "
        "the target. The next spring the share price fell when two product launches were delayed.",
        "Answer each question in 2-3 sentences (4 points each).",
        "<b>(i)</b> Name the problem and explain why the two actions raised EPS without creating value.",
        "<b>(ii)</b> Propose one change to the CEO's contract that removes this incentive and one way it can backfire.",
        "<b>(iii)</b> Propose one mechanism outside the CEO's pay that could have stopped both actions: who performs it, "
        "how it works and one weakness.",
    ),
    "solution": P(
        "<b>(i) The problem.</b> This is short-termism (managerial myopia) created by the contract itself: the bonus "
        "rewards a one-year accounting number, so the CEO maximises the number instead of the value of the firm, an "
        "agency problem between the CEO and the shareholders. Postponing the trials raised this year's earnings only "
        "because R&amp;D is expensed, while it delayed or gave up positive-NPV projects; the delayed launches and the "
        "fall in the share price are that lost value showing up. The buyback raised EPS mechanically by dividing the "
        f"earnings by {pc(BUYBACK2, 0)} fewer shares (about {pc(eps_mek2, 1)} higher EPS with unchanged earnings), but a "
        "repurchase at a fair price creates no value in itself (the EPS fallacy); here it was even paid for with cash "
        "meant for an investment.",
        "<b>(ii) A change to the contract.</b> Replace the annual EPS bonus with shares that vest over three to five "
        "years, or defer the bonus and add a clawback, so that the CEO's pay depends on the long-run share price, which "
        "falls when valuable R&amp;D is cut. This can backfire because the CEO then carries much of the firm's specific "
        "risk and may avoid risky but valuable projects; the share price also moves with the market, so the CEO is "
        "rewarded or punished for luck (with options instead of shares the danger becomes excessive risk-taking).",
        "<b>(iii) A mechanism outside the pay contract.</b> The board, through its independent directors and its audit "
        "or compensation committee, should have to approve share buybacks and large cuts to the R&amp;D budget; it "
        "can ask why the cuts come exactly when the bonus is at stake. Independent directors see the internal plans and "
        "can refuse the buyback or replace the CEO. The weakness is that the board depends on the CEO for information "
        "and may be captive, especially if the CEO helped pick the directors.",
        "<b>Also accepted.</b> In (ii): measure EPS before the effect of buybacks and R&amp;D cuts, use several KPIs "
        "(economic profit, R&amp;D milestones) or pay relative to peers; each is weak because any measure can be gamed "
        "and a complex contract is hard to evaluate. In (iii): shareholders voting against the pay plan at the general "
        "meeting or an activist fund pushing for a new contract, weak because dispersed shareholders free-ride and many "
        "simply follow proxy advisors; disclosure rules for buybacks and pay, weak because regulation targets fraud "
        "rather than legal short-termism; a takeover by a buyer who sees the lost value, weak because it comes only "
        "after the damage.",
    ),
    "criteria": [
        "(i) Names the problem: short-termism (myopia) caused by pay tied to a one-year accounting KPI, an agency "
        "problem. Minimal accepted answer: the CEO maximises EPS, not the value of the firm.",
        "(i) Explains both actions: the R&D cut raises this year's earnings but delays or gives up positive-NPV "
        "projects; the buyback raises EPS by dividing by fewer shares but creates no value at a fair price (the EPS "
        "fallacy). One action explained well earns 3 of the 4 points.",
        "(ii) A contract change that removes the incentive: long-vesting shares, a deferred bonus with clawback or a "
        "KPI that buybacks and R&D cuts cannot move. 2 points for the design and the incentive it creates, 2 for a "
        "credible way it backfires.",
        "(iii) A mechanism outside pay with who acts, how and one weakness: independent board or committee approval of "
        "buybacks and R&D cuts, a shareholder vote against the pay plan, an activist. A mechanism without a weakness "
        "loses up to 2 points.",
        "(iii) 'Fire the CEO' earns credit only if the answer says who does it and how (the board, or shareholders "
        "replacing the board).",
        "2-3 sentences per question. Bonus credit for using the setting: dispersed ownership weakens monitoring by "
        "shareholders because of free-riding.",
    ],
}

# ===========================================================================
# Oppgave 3 · Kapitalstruktur med skatt: permanent gjeld, tilbakekjøp, brannsalg (3/3/4/4/4)
# ===========================================================================
N3, EBIT3, tau3, bU3, rf3, rm3, dv3 = 24.0, 192.0, 0.25, 0.8, 0.04, 0.09, 0.40
mrp3 = rm3 - rf3
rU3 = rf3 + bU3 * mrp3
close(rU3, 0.08)
FCF3 = EBIT3 * (1 - tau3)
VU3 = FCF3 / rU3
P0_3 = VU3 / N3
close(VU3, 1800.0)
close(P0_3, 75.0)
DPS0_3 = FCF3 / N3
close(DPS0_3 / rU3, P0_3)
# b) D = d·V^L og V^L = V^U + τD  =>  D = d·V^U/(1 − dτ)
D3 = dv3 * VU3 / (1 - dv3 * tau3)
close(D3, 800.0)
PVTS3 = tau3 * D3
VL3 = VU3 + PVTS3
close(D3 / VL3, dv3)
close(PVTS3, (tau3 * rf3 * D3) / rf3)       # TS diskontert med r_D = r_f
D3_feil = dv3 * VU3                           # glemt at V^L inneholder skatteskjoldet
assert abs(D3_feil - D3) > 1
# c) kunngjøring og tilbakekjøp
P1_3 = VL3 / N3                               # aksjekurs ved kunngjøring
gain3 = P1_3 - P0_3
close(gain3 * N3, PVTS3)                      # aksjonærenes gevinst = PV(TS)
n3 = D3 / P1_3
N1_3 = N3 - n3
E1_3 = VL3 - D3
close(E1_3 / N1_3, P1_3)                      # kursen uendret ved tilbakekjøpet
close(n3, 9.6)
P_feil3 = E1_3 / (N3 - D3 / P0_3)             # tilbakekjøp til gammel kurs: de som beholder, tar gevinsten
assert P_feil3 > P1_3
# d) utbytte og r_E (MM II med skatt, permanent gjeld)
int3 = rf3 * D3
NI3 = (EBIT3 - int3) * (1 - tau3)
DPS1_3 = NI3 / N1_3
DE3 = D3 / E1_3
rE3 = rU3 + DE3 * (1 - tau3) * (rU3 - rf3)
close(rE3, 0.10)
close(DPS1_3 / rE3, P1_3)                     # ekte sjekk: utbytte/r_E = kurs
bE3 = bU3 + DE3 * (1 - tau3) * (bU3 - 0.0)
close(rf3 + bE3 * mrp3, rE3)                  # samme r_E via beta og CAPM
rE3_feil = rU3 + DE3 * (rU3 - rf3)            # MM II uten skatt
assert abs(DPS1_3 / rE3_feil - P1_3) > 1      # sjekken fanger feil formel
wacc3 = (E1_3 / VL3) * rE3 + (D3 / VL3) * rf3 * (1 - tau3)
close(wacc3, rU3 * (1 - tau3 * D3 / VL3))     # PS2 E9: r_wacc = r_U(1 − τD/V^L)
close(FCF3 / wacc3, VL3)                      # WACC-metoden gir samme V^L
# vekt med D(1 − τ): r_U tilbake fra r_E og r_D (lecture_8 s18)
close((E1_3 * rE3 + D3 * (1 - tau3) * rf3) / (E1_3 + D3 * (1 - tau3)), rU3)
# e) Kurbatovs tall for direkte kostnader (lecture_4 s8)
dir_cost3, p_bank3 = 0.03, 0.01
exp_dir3 = dir_cost3 * p_bank3

ex3 = {
    "n": 3,
    "title": "Capital Structure",
    "points": 18,
    "topic": "Interest tax shield, recapitalisation, fire sales",
    "chapters": [4, 6, 7, 8],
    "body": P(
        f"Nordfôr ASA, a fish-feed producer, is all-equity financed with {i0(N3)} million shares and EBIT of NOK "
        f"{i0(EBIT3)} million a year in perpetuity. Capital expenditure equals depreciation, working capital is constant "
        f"and all earnings are paid out. The tax rate is {pc(tau3, 0)}, the equity beta {f(bU3, 1)}, the risk-free rate "
        f"{pc(rf3, 0)} and the expected market return {pc(rm3, 0)}. Markets are perfect apart from taxes. Use 4 decimal "
        "places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 3,
            "body": P("Find Nordfôr's unlevered cost of capital, its market value and its share price."),
            "solution": P(
                f"<b>Step 1. Cost of capital.</b> Nordfôr has no debt, so β<sub>U</sub> = β<sub>E</sub> = {f(bU3, 1)}. "
                f"With a market risk premium of {pc(rm3, 0)} − {pc(rf3, 0)} = {pc(mrp3, 0)}: r<sub>U</sub> = "
                f"{pc(rf3, 0)} + {f(bU3, 1)} × {pc(mrp3, 0)} = <b>{pc(rU3)}</b>.",
                f"<b>Step 2. Free cash flow.</b> Capital expenditure equals depreciation and working capital does not "
                f"change, so FCF = EBIT × (1 − τ<sub>c</sub>) = {i0(EBIT3)} × {f(1 - tau3, 2)} = <b>{i0(FCF3)}</b> "
                "million per year, forever.",
                f"<b>Step 3. Value and price.</b> V<sup>U</sup> = {i0(FCF3)}/{f(rU3, 2)} = <b>NOK {n0(VU3)} million</b> "
                f"and P<sub>0</sub> = {n0(VU3)}/{i0(N3)} = <b>NOK {f(P0_3, 2)}</b>.",
                f"<b>Check.</b> Per share the dividend is {i0(FCF3)}/{i0(N3)} = {f(DPS0_3, 2)} and {f(DPS0_3, 2)}/"
                f"{f(rU3, 2)} = {f(DPS0_3 / rU3, 2)} {OK} (the same calculation per share, so it checks the arithmetic only).",
            ),
            "criteria": [
                f"All-equity firm, so beta_U = beta_E = 0.8 and r_U = 4% + 0.8 × 5% = {pc(rU3, 2)}. Using 9% as the "
                "risk premium is the trap.",
                f"FCF = EBIT × (1 − tau) = {i0(EBIT3)} × 0.75 = {i0(FCF3)}, because capex equals depreciation and NWC "
                "does not change.",
                f"V^U = {i0(FCF3)}/0.08 = {n0(VU3)} million and P = {n0(VU3)}/{i0(N3)} = NOK {f(P0_3, 2)}.",
                "Show the calculation. No calculation, no points.",
            ],
        },
        {
            "label": "b",
            "points": 3,
            "body": P(
                f"Nordfôr announces that it will borrow a fixed, permanent amount of risk-free debt at {pc(rf3, 0)} to "
                f"repurchase shares, set so that debt will be {pc(dv3, 0)} of firm value after the repurchase. How much "
                "will it borrow? What is the present value of the interest tax shield, at which rate and why?"
            ),
            "solution": P(
                "<b>Step 1. The rate.</b> The debt is a fixed, permanent amount and risk-free, so every year's tax "
                f"shield τ<sub>c</sub> × r<sub>D</sub> × D is as certain as the interest itself and is discounted at "
                f"r<sub>D</sub> = r<sub>f</sub> = {pc(rf3, 0)}, not at r<sub>U</sub>. A perpetuity of "
                "τ<sub>c</sub> × r<sub>D</sub> × D at r<sub>D</sub> is worth <b>PV(TS) = τ<sub>c</sub> × D</b>.",
                f"<b>Step 2. The amount.</b> The {pc(dv3, 0)} refers to the firm's value <i>after</i> the transaction. "
                "That value includes the tax shield the debt creates: V<sup>L</sup> = V<sup>U</sup> + "
                "τ<sub>c</sub>D. So<br>"
                f"D = {f(dv3, 2)} × ({n0(VU3)} + {f(tau3, 2)} × D)<br>"
                f"D × (1 − {f(dv3, 2)} × {f(tau3, 2)}) = {f(dv3, 2)} × {n0(VU3)}<br>"
                f"D = {n0(dv3 * VU3)}/{f(1 - dv3 * tau3, 2)} = <b>NOK {n0(D3)} million</b>",
                f"<b>Step 3. The tax shield.</b> PV(TS) = {f(tau3, 2)} × {n0(D3)} = <b>NOK {n0(PVTS3)} million</b> "
                f"(each year {f(tau3, 2)} × {f(rf3, 2)} × {n0(D3)} = {f(tau3 * rf3 * D3, 0)}, divided by {f(rf3, 2)}).",
                f"<b>Check (an identity, since D was solved from this condition).</b> V<sup>L</sup> = {n0(VU3)} + "
                f"{n0(PVTS3)} = {n0(VL3)} and D/V<sup>L</sup> = {n0(D3)}/"
                f"{n0(VL3)} = {f(D3 / VL3, 2)} {OK} Taking {pc(dv3, 0)} of today's value instead gives {f(dv3, 2)} × "
                f"{n0(VU3)} = {n0(D3_feil)} and D/V<sup>L</sup> = {n0(D3_feil)}/{n0(VU3 + tau3 * D3_feil)} = "
                f"{f(D3_feil / (VU3 + tau3 * D3_feil), 4)}, below the target.",
            ),
            "criteria": [
                f"Sets up D = 0.40 × V^L with V^L = V^U + tau × D: D = 0.40 × {n0(VU3)}/(1 − 0.40 × 0.25) = {n0(D3)}.",
                f"Classic error: D = 0.40 × {n0(VU3)} = {n0(D3_feil)}, which forgets that the recapitalisation itself "
                "raises the firm's value. Later parts are then graded on the student's own D.",
                f"PV(TS) = tau × D = {n0(PVTS3)} million.",
                "Rate with reason: r_D = r_f = 4%, because the debt is a fixed, permanent and risk-free amount, so the "
                "shield is as safe as the interest. Discounting at r_U is the rule for debt that is rebalanced to a "
                "target ratio.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P(
                "What happens to the share price on the announcement? How many shares are repurchased and at what price? "
                "Who gains more: sellers or keepers?"
            ),
            "solution": P(
                "<b>Step 1. Announcement.</b> The market prices the tax shield as soon as the plan is announced, before "
                f"any debt is issued. Equity is then worth V<sup>U</sup> + PV(TS) = {n0(VU3)} + {n0(PVTS3)} = "
                f"{n0(VL3)}, so<br>P = {n0(VL3)}/{i0(N3)} = <b>NOK {f(P1_3)}</b>, up {f(gain3)} "
                f"({pc(gain3 / P0_3, 2)}) from {f(P0_3, 2)}.",
                f"<b>Step 2. The repurchase.</b> Nordfôr borrows {n0(D3)} and buys shares at the new market price:<br>"
                f"Shares repurchased = {n0(D3)}/{f(P1_3)} = <b>{f(n3, 1)} million</b>, leaving {i0(N3)} − {f(n3, 1)} = "
                f"{f(N1_3, 1)} million shares.<br>"
                f"After the repurchase E = V<sup>L</sup> − D = {n0(VL3)} − {n0(D3)} = {n0(E1_3)} and P = {n0(E1_3)}/"
                f"{f(N1_3, 1)} = <b>NOK {f(E1_3 / N1_3)}</b>: the repurchase itself does not move the price.",
                tbl(
                    ["Market values, NOK million", "Before", "After announcement", "After repurchase"],
                    [
                        ["V<sup>U</sup> (operating assets)", n0(VU3), n0(VU3), n0(VU3)],
                        ["PV(TS)", "0", n0(PVTS3), n0(PVTS3)],
                        ["Debt D", "0", "0", n0(D3)],
                        ["Equity E", n0(VU3), n0(VL3), n0(E1_3)],
                        ["Shares (million)", i0(N3), i0(N3), f(N1_3, 1)],
                        ["Price per share", f(P0_3, 2), f(P1_3), f(E1_3 / N1_3)],
                    ],
                    num=(1, 2, 3),
                ),
                f"<b>Step 3. Who gains.</b> Both groups gain the same {f(gain3)} per share: the sellers receive "
                f"{f(P1_3)} in cash and the keepers hold a share worth {f(P1_3)}. The whole gain goes to the "
                "shareholders, because the debt is issued at a fair price and the creditors only earn their required "
                "return.",
                f"<b>Check (an identity: the announcement price was built from PV(TS)).</b> Total gain = {i0(N3)} × "
                f"{f(gain3)} = {n0(gain3 * N3)} = PV(TS) {OK} If the shares were "
                f"bought back at the old {f(P0_3, 2)}, the keepers would end up at {f(P_feil3, 2)} and the sellers at "
                f"{f(P0_3, 2)}: the sellers would hand their part of the gain to the keepers, which cannot happen once the "
                "plan is public.",
            ),
            "criteria": [
                f"Price on announcement = (V^U + PV(TS))/N = {n0(VL3)}/{i0(N3)} = {f(P1_3)}: the tax shield is priced "
                "when the plan becomes known, not when the debt is issued.",
                f"Shares repurchased = {n0(D3)}/{f(P1_3)} = {f(n3, 1)} million at the new price, leaving "
                f"{f(N1_3, 1)} million.",
                f"Price after the repurchase = ({n0(VL3)} − {n0(D3)})/{f(N1_3, 1)} = {f(P1_3)}: unchanged.",
                f"Sellers and keepers gain the same {f(gain3)} per share; total {i0(N3)} × {f(gain3)} = {n0(PVTS3)} = "
                "PV(TS). Buying back at 75 is the classic error.",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P(
                "What is the expected dividend per share after the recapitalisation? What is the new equity cost of "
                "capital?"
            ),
            "solution": P(
                f"<b>Step 1. Dividend.</b> Interest is {f(rf3, 2)} × {n0(D3)} = {i0(int3)}. Earnings after interest "
                f"and tax are ({i0(EBIT3)} − {i0(int3)}) × {f(1 - tau3, 2)} = {i0(NI3)}, all paid out:<br>"
                f"DPS = {i0(NI3)}/{f(N1_3, 1)} = <b>NOK {f(DPS1_3)}</b>, up from {f(DPS0_3, 2)}.",
                "<b>Step 2. Cost of equity, direct route.</b> Each share is a level perpetuity, so "
                f"r<sub>E</sub> = DPS/P = {f(DPS1_3)}/{f(P1_3)} = <b>{pc(rE3)}</b>. This is a full answer.",
                "<b>Step 3. The same from MM Proposition II.</b> With permanent debt and taxes, "
                "r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>):<br>"
                f"r<sub>E</sub> = {pc(rU3, 0)} + ({n0(D3)}/{n0(E1_3)}) × {f(1 - tau3, 2)} × ({pc(rU3, 0)} − "
                f"{pc(rf3, 0)}) = {pc(rU3, 0)} + {pc(DE3 * (1 - tau3) * (rU3 - rf3))} = <b>{pc(rE3)}</b><br>"
                f"Through betas: β<sub>E</sub> = {f(bU3, 1)} × (1 + {f(DE3)} × {f(1 - tau3, 2)}) = {f(bE3, 2)} and "
                f"{pc(rf3, 0)} + {f(bE3, 2)} × {pc(mrp3, 0)} = {pc(rf3 + bE3 * mrp3)}.",
                f"<b>Check.</b> The two routes agree {OK} This is a real check, since the price comes from APV and the "
                f"formula from MM II: the no-tax formula would give r<sub>E</sub> = {pc(rE3_feil)} and "
                f"{f(DPS1_3)}/{f(rE3_feil, 6)} = {f(DPS1_3 / rE3_feil)}, not {f(P1_3)}. A second check is an identity once "
                f"r<sub>E</sub> comes from MM II with taxes: r<sub>wacc</sub> = {f(E1_3 / VL3, 1)} × {pc(rE3, 0)} + "
                f"{f(D3 / VL3, 1)} × {pc(rf3, 0)} × {f(1 - tau3, 2)} = {pc(wacc3)} = r<sub>U</sub>(1 − "
                f"τ<sub>c</sub>D/V<sup>L</sup>) and {i0(FCF3)}/{f(wacc3, 3)} = {n0(FCF3 / wacc3)} = V<sup>L</sup> {OK}",
            ),
            "criteria": [
                f"Interest = 0.04 × {n0(D3)} = {i0(int3)}; dividends = ({i0(EBIT3)} − {i0(int3)}) × 0.75 = {i0(NI3)}; "
                f"DPS = {i0(NI3)}/{f(N1_3, 1)} = {f(DPS1_3)}. Dividing by the original {i0(N3)} million shares is the "
                "classic error.",
                f"r_E = DPS/P = {f(DPS1_3)}/{f(P1_3)} = {pc(rE3, 2)} is a full route, since each share is a level "
                "perpetuity.",
                f"Equally full: r_E = r_U + (D/E)(1 − tau)(r_U − r_D) = 8% + (800/1,200) × 0.75 × 4% = {pc(rE3, 2)}, or "
                f"beta_E = {f(bE3, 1)} with the CAPM.",
                f"The no-tax formula (r_E = {pc(rE3_feil)}) is wrong here: the debt is permanent and the firm pays taxes. "
                "Showing that two routes agree is a bonus.",
            ],
        },
        {
            "label": "e",
            "points": 4,
            "body": P(
                "The CFO notes that permanent debt adds value through the tax shield and proposes debt of 90% of firm "
                "value. She argues that bankruptcy costs are small: legal fees are about 3% of firm value and the annual "
                "bankruptcy probability is below 1%. Nordfôr's specialised plants can only be sold to other feed "
                "producers, hit by the same downturns. Explain briefly, with reference to fire sales, why her argument "
                "understates the cost of high leverage. (3-5 sentences.)"
            ),
            "solution": P(
                f"<b>Model answer (five sentences).</b> The CFO is right about direct costs: about {pc(dir_cost3, 0)} "
                f"times a probability below {pc(p_bank3, 0)} is an expected cost of roughly {pc(exp_dir3, 2)} of value a "
                "year, far too small to stop a firm from borrowing. The large costs of distress are indirect and start "
                "before any formal bankruptcy: a firm that cannot pay its creditors in a downturn must sell assets "
                "quickly, but Nordfôr's specialised plants can only be sold to other feed producers who are short of "
                "cash in the same downturn, so they fetch far less than their value in use (a fire sale). Customers and "
                "suppliers also turn away from a firm that may not survive, while debt overhang makes the owners skip "
                "positive-NPV investments. The probability of distress rises steeply with leverage; at 90% debt the "
                "debt is no longer risk-free, so neither the low interest rate nor the full tax shield of b) survives. "
                "Creditors anticipate these losses and price them into the debt, so the shareholders bear the expected "
                "cost today: the best debt level is where the extra tax shield of one more NOK of debt equals its extra "
                "expected cost of distress (the trade-off theory).",
                "<b>Also accepted.</b> Kurbatov's lecture example: assets worth 300 in normal use that fetch 100-150 "
                "in a fire sale. Lost employees, time spent on negotiations with creditors or a weaker competitive "
                "position (lecture 4, slide 9). Agency costs of high leverage such as excessive risk-taking (gambling "
                "for resurrection).",
            ),
            "criteria": [
                "Agrees that direct costs are small: about 3% of value times a probability below 1% is a tiny expected "
                "cost (Kurbatov's lecture numbers), so the CFO's arithmetic is not the problem.",
                "Explains the fire sale: a distressed firm must sell fast; specialised plants can only go to rivals "
                "hit by the same downturn, so they fetch far below their value in use. This is the core of the answer.",
                "Adds one more mechanism: lost customers or suppliers, debt overhang, the probability of distress rising "
                "steeply with leverage, or the tax shield no longer being safe at 90% debt.",
                "Bonus: concludes with the trade-off: creditors price the expected costs, so the shareholders bear them today; "
                "borrow until the marginal tax benefit equals the marginal expected cost of distress.",
                "3-5 sentences. 'Bankruptcy is costly' without a mechanism earns little.",
            ],
        },
    ],
}

# ===========================================================================
# Oppgave 4 · Verdsetting av prosjekt: FCF fra EBIT, tvilling med overskuddskasse, WACC og APV
# (3/3/2/4/3/3)
# ===========================================================================
tau4, rf4, rm4 = 0.22, 0.04, 0.09
mrp4 = rm4 - rf4
I4, DEP4 = 60.0, 20.0
REV4 = [62.0, 72.0, 68.0]
COST4 = [34.0, 38.0, 37.0]
NWC4 = [6.0, 7.5, 7.0, 0.0]          # nivå ved utgangen av år 0, 1, 2, 3
STUDY4 = 1.5                         # sunk cost
close(I4, 3 * DEP4)
EBITDA4 = [r - c for r, c in zip(REV4, COST4)]
EBIT4 = [e - DEP4 for e in EBITDA4]
NOPAT4 = [e * (1 - tau4) for e in EBIT4]
dNWC4 = [NWC4[0]] + [NWC4[t] - NWC4[t - 1] for t in range(1, 4)]
close(sum(dNWC4), 0.0)               # all arbeidskapital frigjøres til slutt
F4 = [-I4 - dNWC4[0]] + [NOPAT4[t] + DEP4 - dNWC4[t + 1] for t in range(3)]
for t in range(3):                   # samme FCF via EBITDA(1 − τ) + τ·Dep
    close(EBITDA4[t] * (1 - tau4) + tau4 * DEP4 - dNWC4[t + 1], F4[t + 1])
close(F4[0], -66.0)
# tvillingen: netto gjeld
Etw, Dtw, Ctw, Cop_tw, bEtw = 960.0, 400.0, 180.0, 60.0, 1.24
exc_tw = Ctw - Cop_tw
Dnet_tw = Dtw - exc_tw
Vtw = Etw + Dnet_tw
bU4 = Etw / Vtw * bEtw + Dnet_tw / Vtw * 0.0
close(bU4, 0.96)
rU4 = rf4 + bU4 * mrp4
close(rU4, 0.088)
bU4_brutto = Etw / (Etw + Dtw) * bEtw           # feil: ignorerer kassen
bU4_allcash = Etw / (Etw + Dtw - Ctw) * bEtw    # feil: trekker fra all kasse
rU4_brutto, rU4_allcash = rf4 + bU4_brutto * mrp4, rf4 + bU4_allcash * mrp4
# prosjektets finansiering
DE4, rD4 = 0.5, 0.055
d4 = DE4 / (1 + DE4)
e4 = 1 - d4
rE4 = rU4 + DE4 * (rU4 - rD4)
wacc4 = e4 * rE4 + d4 * rD4 * (1 - tau4)
close(wacc4, rU4 - d4 * tau4 * rD4)
close(e4 * rE4 + d4 * rD4, rU4)                 # førskatts-WACC = r_U (identitet ved konstant D/E)
# d) WACC-verdier, NPV og debt capacity
VL4 = [0.0] * 4
for t in range(2, -1, -1):
    VL4[t] = (F4[t + 1] + VL4[t + 1]) / (1 + wacc4)
pv_w4 = [F4[t] / (1 + wacc4) ** t for t in range(1, 4)]
close(sum(pv_w4), VL4[0])
NPV4 = VL4[0] + F4[0]
assert NPV4 > 0
D4t = [d4 * v for v in VL4]
dD4 = [D4t[t + 1] - D4t[t] for t in range(3)]
close(sum(dD4), -D4t[0])
FIRMVAL_FEIL = VL4[0]                           # PV, ikke NPV: fellen
# e) APV
pv_u4 = [F4[t] / (1 + rU4) ** t for t in range(1, 4)]
VU4 = sum(pv_u4)
TS4 = [tau4 * rD4 * D4t[t] for t in range(3)]   # TS_{t+1} = τ r_D D_t
pv_ts4 = [TS4[t] / (1 + rU4) ** (t + 1) for t in range(3)]
PVTS4 = sum(pv_ts4)
APV4 = VU4 + PVTS4
VL4_r = sum(F4[t] / 1.084 ** t for t in range(1, 4))     # r_wacc avrundet til 0.0840 godtas
assert abs(VL4_r - VL4[0]) < 0.01
close(APV4, VL4[0])                             # WACC = APV (fast punkt)
close((VU4 + F4[0]) + PVTS4, NPV4)
PVTS4_rD = sum(TS4[t] / (1 + rD4) ** (t + 1) for t in range(3))
assert PVTS4_rD > PVTS4 and abs((VU4 + PVTS4_rD) - VL4[0]) > 0.001
gap4 = rU4 - wacc4
close(gap4, d4 * tau4 * rD4)

ex4 = {
    "n": 4,
    "title": "Valuation with leverage",
    "points": 18,
    "topic": "Free cash flow, net debt, WACC and APV",
    "chapters": [2, 4, 17, 18],
    "body": P(
        "Hjeltnes Transport ASA, a trucking company, is offered a three-year contract to run a plastics sorting plant. "
        "The project has the risk of Ren Sortering ASA, a listed firm that only runs such plants. Hjeltnes has already "
        f"paid NOK {f(STUDY4, 1)} million for an engineering study. Figures are in NOK million.",
        f"The equipment costs {i0(I4)} today (Year 0) and is depreciated straight-line to zero over Years 1-3; it is "
        "worthless afterwards. Revenue and cash operating costs:",
        tbl(
            ["Year", "1", "2", "3"],
            [["Revenue"] + [i0(x) for x in REV4], ["Operating costs (cash)"] + [i0(x) for x in COST4]],
            num=(1, 2, 3),
        ),
        f"Net working capital is {f(NWC4[0], 1)}, {f(NWC4[1], 1)} and {f(NWC4[2], 1)} at the end of Years 0, 1 and 2 "
        f"and is fully recovered at the end of Year 3. The tax rate is {pc(tau4, 0)}.",
        f"Ren Sortering: market capitalisation {i0(Etw)}, risk-free debt {i0(Dtw)}, cash {i0(Ctw)} ({i0(Cop_tw)} needed "
        f"in operations, the rest excess), equity beta {f(bEtw, 2)}. The risk-free rate is {pc(rf4, 0)} and the "
        f"expected market return {pc(rm4, 0)}.",
        f"Both firms keep their leverage constant: the project's D/E is {f(DE4, 1)} (rebalanced at each year end) and "
        f"its debt costs {pc(rD4, 1)}. Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 3,
            "body": P("Find the project's free cash flow in Years 0 to 3."),
            "solution": P(
                "<b>Step 1. Earnings.</b> Depreciation is "
                f"{i0(I4)}/3 = {i0(DEP4)} per year, so EBIT = revenue − cash costs − depreciation.",
                "<b>Step 2. From EBIT to FCF.</b> FCF = EBIT × (1 − τ<sub>c</sub>) + depreciation − capital "
                "expenditure − ΔNWC. Only the <i>change</i> in working capital is a cash flow; the recovery in Year 3 is "
                "an inflow.",
                tbl(
                    ["Year", "0", "1", "2", "3"],
                    [
                        ["Revenue", ""] + [i0(x) for x in REV4],
                        ["Operating costs", ""] + [MINUS + i0(x) for x in COST4],
                        ["Depreciation", ""] + [MINUS + i0(DEP4)] * 3,
                        ["EBIT", ""] + [i0(x) for x in EBIT4],
                        [f"EBIT × (1 − {f(tau4, 2)})", ""] + [f(x, 2) for x in NOPAT4],
                        ["+ Depreciation", ""] + [i0(DEP4)] * 3,
                        ["− Capital expenditure", MINUS + i0(I4), "", "", ""],
                        ["NWC (level)"] + [f(x, 1) for x in NWC4],
                        ["− ΔNWC"] + [f(-x, 1) for x in dNWC4],
                        ["<b>FCF</b>"] + [f"<b>{f(x, 2)}</b>" for x in F4],
                    ],
                    num=(1, 2, 3, 4),
                ),
                f"<b>FCF = {f(F4[0], 2)}, {f(F4[1], 2)}, {f(F4[2], 2)} and {f(F4[3], 2)}</b>. The NOK "
                f"{f(STUDY4, 1)} million study is sunk: it has been paid whether or not the plant is built, so it is left "
                "out. Interest is not deducted: financing enters through the discount rate.",
                f"<b>Check.</b> The other route gives the same numbers: EBITDA × (1 − τ<sub>c</sub>) + τ<sub>c</sub> × "
                f"depreciation − ΔNWC, for example in Year 1: {i0(EBITDA4[0])} × {f(1 - tau4, 2)} + {f(tau4, 2)} × "
                f"{i0(DEP4)} − {f(dNWC4[1], 1)} = {f(F4[1], 2)} {OK} The changes in working capital sum to "
                f"{f(dNWC4[0], 1)} + {f(dNWC4[1], 1)} {MINUS} {f(-dNWC4[2], 1)} {MINUS} {f(-dNWC4[3], 1)} = 0 {OK}",
            ),
            "criteria": [
                "FCF = EBIT × (1 − tau) + depreciation − capex − ΔNWC with EBIT = revenue − cash costs − depreciation "
                f"({i0(EBIT4[0])}, {i0(EBIT4[1])}, {i0(EBIT4[2])}). EBITDA × (1 − tau) + tau × depreciation is the same.",
                f"Uses the change in NWC, not the level: {f(dNWC4[0], 1)} in Year 0, {f(dNWC4[1], 1)} in Year 1, "
                f"{f(dNWC4[2], 1)} in Year 2 and {f(dNWC4[3], 1)} (recovery) in Year 3. Forgetting the delta is the error "
                "Kurbatov calls one of the biggest.",
                f"Leaves out the {f(STUDY4, 1)} already paid for the study (sunk) and deducts no interest.",
                f"FCF = {f(F4[0], 2)}, {f(F4[1], 2)}, {f(F4[2], 2)}, {f(F4[3], 2)}.",
            ],
        },
        {
            "label": "b",
            "points": 3,
            "body": P("Find the project's unlevered cost of capital."),
            "solution": P(
                "<b>Step 1. Why the comparable.</b> The project's risk is that of a sorting plant, not of Hjeltnes's "
                "trucking, so its cost of capital comes from Ren Sortering.",
                f"<b>Step 2. Net debt.</b> Excess cash is a risk-free asset that offsets debt: excess cash = {i0(Ctw)} − "
                f"{i0(Cop_tw)} = {i0(exc_tw)} and net debt = {i0(Dtw)} − {i0(exc_tw)} = <b>{i0(Dnet_tw)}</b>, so the "
                f"enterprise value is {i0(Etw)} + {i0(Dnet_tw)} = {n0(Vtw)}.",
                "<b>Step 3. Unlever.</b> The debt is risk-free (β<sub>D</sub> = 0) and the weights are without taxes, "
                "since Ren Sortering keeps its leverage constant:<br>"
                f"β<sub>U</sub> = ({i0(Etw)}/{n0(Vtw)}) × {f(bEtw, 2)} + ({i0(Dnet_tw)}/{n0(Vtw)}) × 0 = <b>{f(bU4)}</b><br>"
                f"r<sub>U</sub> = {pc(rf4, 0)} + {f(bU4, 2)} × {pc(mrp4, 0)} = <b>{pc(rU4)}</b>",
                f"<b>Check.</b> Ignoring the cash gives β<sub>U</sub> = {f(bU4_brutto)} (r<sub>U</sub> = "
                f"{pc(rU4_brutto)}) and subtracting all of it gives {f(bU4_allcash)} (r<sub>U</sub> = {pc(rU4_allcash)}): "
                "the cash that is needed to run the business belongs to the operating assets and stays in.",
            ),
            "criteria": [
                f"Net debt in the weights: {i0(Dtw)} − ({i0(Ctw)} − {i0(Cop_tw)}) = {i0(Dnet_tw)}, so V = {n0(Vtw)}. Only "
                "the excess cash is subtracted.",
                f"beta_U = ({i0(Etw)}/{n0(Vtw)}) × {f(bEtw, 2)} = {f(bU4, 2)} and r_U = 4% + {f(bU4, 2)} × 5% = "
                f"{pc(rU4, 2)}.",
                f"Classic errors: ignoring the cash (beta_U = {f(bU4_brutto)}) or subtracting all of it "
                f"(beta_U = {f(bU4_allcash)}).",
                "Uses the comparable, not Hjeltnes's own business, because the project is a new line of business.",
            ],
        },
        {
            "label": "c",
            "points": 2,
            "body": P("Find the project's equity cost of capital and after-tax WACC."),
            "solution": P(
                f"<b>Step 1. Weights.</b> D/E = {f(DE4, 1)} means D/V = {f(DE4, 1)}/{f(1 + DE4, 1)} = 1/3 and E/V = 2/3.",
                "<b>Step 2. Cost of equity</b> (MM II, constant leverage):<br>"
                f"r<sub>E</sub> = {pc(rU4, 1)} + {f(DE4, 1)} × ({pc(rU4, 1)} − {pc(rD4, 1)}) = {pc(rU4, 1)} + "
                f"{pc(DE4 * (rU4 - rD4), 2)} = <b>{pc(rE4)}</b>",
                "<b>Step 3. WACC.</b><br>"
                f"r<sub>wacc</sub> = (2/3) × {pc(rE4, 2)} + (1/3) × {pc(rD4, 1)} × {f(1 - tau4, 2)} = "
                f"{pc(e4 * rE4)} + {pc(d4 * rD4 * (1 - tau4))} = <b>{pc(wacc4)}</b>",
                f"<b>Check.</b> r<sub>wacc</sub> = r<sub>U</sub> − d × τ<sub>c</sub> × r<sub>D</sub> = {pc(rU4, 1)} − "
                f"(1/3) × {f(tau4, 2)} × {pc(rD4, 1)} = {pc(rU4, 1)} − {pc(gap4)} = {pc(wacc4)} {OK} (an identity under "
                "constant leverage, so it checks the arithmetic).",
            ),
            "criteria": [
                "Converts D/E = 0.5 into D/V = 1/3 and E/V = 2/3. Using 0.5 as a weight is the trap.",
                f"r_E = 8.8% + 0.5 × (8.8% − 5.5%) = {pc(rE4, 2)}.",
                f"r_wacc = (2/3) × {pc(rE4, 2)} + (1/3) × 5.5% × 0.78 = {pc(wacc4)}.",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P("Find the project's NPV with the WACC method and its debt capacity at the end of Years 0-2."),
            "solution": P(
                "<b>Step 1. Roll the value back from the end.</b> V<sup>L</sup><sub>3</sub> = 0 and "
                "V<sup>L</sup><sub>t−1</sub> = (FCF<sub>t</sub> + V<sup>L</sup><sub>t</sub>)/(1 + r<sub>wacc</sub>):<br>"
                f"V<sup>L</sup><sub>2</sub> = {f(F4[3], 2)}/{f(1 + wacc4, 6)} = <b>{f(VL4[2])}</b><br>"
                f"V<sup>L</sup><sub>1</sub> = ({f(F4[2], 2)} + {f(VL4[2])})/{f(1 + wacc4, 6)} = <b>{f(VL4[1])}</b><br>"
                f"V<sup>L</sup><sub>0</sub> = ({f(F4[1], 2)} + {f(VL4[1])})/{f(1 + wacc4, 6)} = <b>{f(VL4[0])}</b>",
                f"<b>Step 2. NPV.</b> V<sup>L</sup><sub>0</sub> is the value of the future cash flows. The project's NPV "
                f"subtracts what it costs today: NPV = {f(VL4[0])} − {f(-F4[0], 0)} = <b>{f(NPV4)}</b> &gt; 0, so Hjeltnes "
                "should take the contract. The question asks for the project's NPV, not for a value of Hjeltnes.",
                "<b>Step 3. Debt capacity.</b> D<sub>t</sub> = (1/3) × V<sup>L</sup><sub>t</sub>:",
                tbl(
                    ["End of year t", "0", "1", "2", "3"],
                    [
                        ["FCF<sub>t</sub>"] + [f(x, 2) for x in F4],
                        ["V<sup>L</sup><sub>t</sub>"] + [f(v) for v in VL4],
                        ["D<sub>t</sub> = V<sup>L</sup><sub>t</sub>/3"] + [f(x) for x in D4t],
                        ["Borrow (+) or repay (−)", "+" + f(D4t[0])] + [("+" if x > 0 else "") + f(x) for x in dD4],
                    ],
                    num=(1, 2, 3, 4),
                ),
                f"<b>Check (identities that confirm the arithmetic).</b> The repayments in Years 1 to 3 sum to "
                f"{f(sum(dD4))} = −D<sub>0</sub>: the project's debt "
                f"is gone when the contract ends {OK} One step forward: {f(VL4[0])} × {f(1 + wacc4, 6)} − {f(F4[1], 2)} = "
                f"{f(VL4[0] * (1 + wacc4) - F4[1])} = V<sup>L</sup><sub>1</sub> {OK}",
            ),
            "criteria": [
                f"Discounts the FCF of Years 1 to 3 at the WACC: V^L_0 = {f(VL4[0])}.",
                f"NPV = {f(VL4[0])} − 66 = {f(NPV4)}. Reporting {f(VL4[0])} as the answer (PV, not NPV) loses points.",
                f"V^L_1 = {f(VL4[1])} and V^L_2 = {f(VL4[2])}, the value of the cash flows still to come after each date's "
                "cash flow has been paid.",
                f"Debt capacity D_t = V^L_t/3: D_0 = {f(D4t[0])}, D_1 = {f(D4t[1])}, D_2 = {f(D4t[2])}. Using 0.5 instead "
                "of 1/3 is the D/E-versus-D/V error again.",
                f"Rounding r_wacc to 0.0840 gives V^L_0 = {f(VL4_r)}, which is accepted.",
            ],
        },
        {
            "label": "e",
            "points": 3,
            "body": P("Value the project with APV (unlevered value, yearly tax shields, PV(TS)) and compare with d)."),
            "solution": P(
                f"<b>Step 1. Unlevered value</b> at r<sub>U</sub> = {pc(rU4, 1)}:<br>"
                f"V<sup>U</sup> = {f(F4[1], 2)}/{f(1 + rU4, 3)} + {f(F4[2], 2)}/{f(1 + rU4, 3)}<sup>2</sup> + "
                f"{f(F4[3], 2)}/{f(1 + rU4, 3)}<sup>3</sup> = " + " + ".join(ledd(pv_u4, VU4)) + f" = <b>{f(VU4)}</b>",
                "<b>Step 2. Tax shields.</b> TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub>, on the "
                "debt at the start of each year:<br>"
                + "<br>".join(
                    f"TS<sub>{t + 1}</sub> = {f(tau4, 2)} × {f(rD4, 3)} × {f(D4t[t])} = {f(TS4[t])}" for t in range(3)
                ),
                "<b>Step 3. Discount the shields at r<sub>U</sub>.</b> The debt is rebalanced to a constant ratio, so "
                "it moves with the project's value and the shields carry the project's risk:<br>"
                f"PV(TS) = {f(TS4[0])}/{f(1 + rU4, 3)} + {f(TS4[1])}/{f(1 + rU4, 3)}<sup>2</sup> + {f(TS4[2])}/"
                f"{f(1 + rU4, 3)}<sup>3</sup> = " + " + ".join(ledd(pv_ts4, PVTS4)) + f" = <b>{f(PVTS4)}</b>",
                f"<b>Step 4. Add up.</b> APV = {f(VU4)} + {f(PVTS4)} = <b>{f(APV4)}</b> = V<sup>L</sup><sub>0</sub> from d), "
                f"so the NPV is also {f(APV4)} − 66 = {f(APV4 + F4[0])} {OK}",
                "<b>Check.</b> The two methods agree, as they must: they count the same tax shield, once inside the "
                "discount rate and once as a separate cash flow. Since the debt levels came from the WACC values, the "
                "agreement is a fixed point rather than an independent test; it still catches arithmetic slips and the "
                f"wrong rate on the shields (at r<sub>D</sub> PV(TS) would be {f(PVTS4_rD)} and APV {f(VU4 + PVTS4_rD)}).",
            ),
            "criteria": [
                f"V^U discounts the same FCF at r_U = {pc(rU4, 1)}: {f(VU4)}.",
                f"TS_t = 0.22 × 5.5% × D_(t−1): {f(TS4[0])}, {f(TS4[1])}, {f(TS4[2])}. Using D_t instead of D_(t−1) is the "
                "timing error.",
                f"PV(TS) at r_U (constant leverage, so the shield is as risky as the project) = {f(PVTS4)}.",
                f"APV = {f(VU4)} + {f(PVTS4)} = {f(APV4)}, equal to d). A deviation of about 0.001 is rounding; 0.05 is a "
                "real error.",
            ],
        },
        {
            "label": "f",
            "points": 3,
            "body": P(
                "Why is the after-tax WACC lower than r<sub>U</sub>? A colleague says debt is simply cheaper than equity. "
                "Is she right? (2-3 sentences.)"
            ),
            "solution": P(
                "<b>Model answer.</b> r<sub>U</sub> is the return the project's assets must earn as if they were "
                "financed only with equity; it does not depend on taxes. The WACC uses the after-tax cost of debt, "
                "so it is lower by the value of the interest tax shield: r<sub>wacc</sub> = r<sub>U</sub> − d × "
                f"τ<sub>c</sub> × r<sub>D</sub> = {pc(rU4, 1)} − {pc(gap4)}. The colleague is wrong: debt has a lower "
                "required return, but borrowing more raises r<sub>E</sub> exactly enough to offset it (MM II), so without "
                "taxes the WACC would equal r<sub>U</sub> at any leverage.",
                "<b>Also accepted.</b> The gap is the tax shield expressed as a rate; with τ<sub>c</sub> = 0 the two "
                "rates coincide. The WACC method puts the tax shield in the discount rate, while the APV method uses "
                "r<sub>U</sub> and adds the shield separately.",
            ),
            "criteria": [
                "States that the gap comes from the tax deductibility of interest: the WACC uses r_D(1 − tau), so "
                f"r_wacc = r_U − d × tau × r_D (here {pc(gap4)} lower).",
                "Rejects the colleague's reason: cheaper debt alone does not lower the cost of capital, because r_E rises "
                "with leverage (MM II); without taxes r_wacc = r_U.",
                "Bonus: notes that r_U is the pre-tax return on the assets and does not depend on taxes, or links to APV, "
                "which adds the shield separately.",
            ],
        },
    ],
}

# ===========================================================================
# Oppgave 5 · Realopsjon: nedlegging med månedsrente (2/4/4/4/6)
# ===========================================================================
I5, COST5, REV_LO5, REV_HI5, R5 = 600_000.0, 41_000.0, 36_000.0, 51_000.0, 0.06
rm5_exact = (1 + R5) ** (1 / 12) - 1
rm5 = round(rm5_exact, 6)                      # 0.4868 % med fire desimaler i prosent
close(rm5, 0.004868)
cg5, cb5 = REV_HI5 - COST5, REV_LO5 - COST5
close(cg5, 10_000.0)
close(cb5, -5_000.0)
ce5 = 0.5 * (cg5 + cb5)


def ann(n, r=rm5):
    return (1 - (1 + r) ** -n) / r


a24, a12 = ann(24), ann(12)
g24 = (1 + rm5) ** 24
PV5a = ce5 / rm5
NPV5a = PV5a - I5
assert NPV5a < 0
NG5 = cg5 / rm5 - I5
NB5_forever = cb5 / rm5 - I5
close(0.5 * NG5 + 0.5 * NB5_forever, NPV5a)
NB5 = -I5 + cb5 * a24
NPV5b = 0.5 * NG5 + 0.5 * NB5
assert NPV5b > 0
lim5 = -cb5 / rm5                              # PV ved måned 24 av tapene man slipper
# c) verdien av retten, sammenlignet med 0
VAL5 = NPV5b - max(0.0, NPV5a)
close(VAL5, NPV5b)
VAL5_feil = NPV5b - NPV5a                      # «ChatGPT-feilen»
NB5_12 = -I5 + cb5 * a12
NPV5_12 = 0.5 * NG5 + 0.5 * NB5_12
extra5 = NPV5_12 - NPV5b
close(extra5, 0.5 * (-cb5) * (a24 - a12))
# uavhengig vei: retten fjerner en evig strøm av −5000 fra måned 25 i dårlig tilstand
close(NPV5b - NPV5a, 0.5 * (-cb5 / rm5) / g24)
# d) høyeste gebyr ved måned 24
Fmax5 = 2 * NPV5b * g24
assert Fmax5 < lim5                            # du går fortsatt ut i dårlig tilstand


def npv_tre(F, p=0.5, exit_month=24, fee=True):
    """Hele treet: god tilstand fortsetter alltid, dårlig tilstand velger max(fortsett, gå ut)."""
    n = exit_month
    fortsett = cb5 / rm5                        # verdi ved måned n av å fortsette (negativ)
    ut = -F if fee else 0.0
    best = max(fortsett, ut)
    good = -I5 + cg5 / rm5
    bad = -I5 + cb5 * ann(n) + best / (1 + rm5) ** n
    return p * good + (1 - p) * bad


close(npv_tre(0.0), NPV5b, 1e-6)
close(npv_tre(Fmax5), 0.0, 1e-6)
close(npv_tre(0.0, exit_month=12), NPV5_12, 1e-6)
assert npv_tre(Fmax5 + 1) < 0 < npv_tre(Fmax5 - 1)
close(npv_tre(10 * lim5), NPV5a, 1e-6)        # med et skyhøyt gebyr blir du værende: tilbake til a)
# e) likegyldig p
p5_with = -NB5 / (NG5 - NB5)
p5_no = (I5 * rm5 - cb5) / (cg5 - cb5)
close(npv_tre(0.0, p=p5_with), 0.0, 1e-6)
close(p5_no * NG5 + (1 - p5_no) * NB5_forever, 0.0, 1e-6)
assert p5_with < 0.5 < p5_no
# avrunding: eksakt månedsrente
NPV5b_exact = 0.5 * (cg5 / rm5_exact - I5) + 0.5 * (-I5 + cb5 * ann(24, rm5_exact))
avvik5 = abs(NPV5b_exact - NPV5b)
assert avvik5 < 300

ex5 = {
    "n": 5,
    "title": "Real Options",
    "points": 20,
    "topic": "Real options",
    "chapters": [1, 25],
    "body": P(
        f"You consider opening a bakery-café. The fit-out costs NOK {n0(I5)} now and has no resale value; running costs "
        f"are NOK {n0(COST5)} a month. Monthly revenue will be NOK {n0(REV_LO5)} or NOK {n0(REV_HI5)} forever, with "
        "equal probability; you learn which right after opening. Cash flows arrive at the end of each month. Demand is "
        f"unrelated to the market, so discount at the risk-free rate of {pc(R5, 0)} a year. The standard lease runs "
        "forever and cannot be terminated. Give the monthly rate in percent with 4 decimals (as in 0.1234%) and use it "
        "throughout.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 2,
            "body": P(
                "What is the monthly rate? What is the NPV of opening now under the standard lease? Will you open?"
            ),
            "solution": P(
                f"<b>Step 1. Monthly rate.</b> r<sub>m</sub> = (1 + {f(R5, 2)})<sup>1/12</sup> − 1 = "
                f"<b>{pc(rm5)}</b> per month. (Dividing 6% by 12 gives 0.5%, which is too high: it ignores monthly "
                "compounding.)",
                f"<b>Step 2. Expected monthly cash flow.</b> Net of the running cost the café earns {n0(cg5)} in the good "
                f"state and {n0(cb5)} in the bad state, so {n0(ce5)} per month in expectation, forever.",
                f"<b>Step 3. NPV.</b> PV = {n0(ce5)}/{f(rm5, 6)} = {n0(PV5a)} and NPV = {n0(PV5a)} − {n0(I5)} = "
                f"<b>NOK {n0(NPV5a)}</b>. <b>Do not open the café</b> under the standard lease.",
            ),
            "criteria": [
                f"r_m = 1.06^(1/12) − 1 = {pc(rm5)}, not 6%/12 = 0.5%.",
                f"Nets the running cost off the revenue first: +{n0(cg5)} or {n0(cb5)}, so {n0(ce5)} per month in "
                "expectation.",
                f"NPV = {n0(ce5)}/{f(rm5, 6)} − {n0(I5)} = {n0(NPV5a)} < 0: do not open.",
            ],
        },
        {
            "label": "b",
            "points": 4,
            "body": P(
                "The landlord offers instead a lease you can terminate at no cost at the end of month 24, after which you "
                "receive nothing. What is the NPV of opening now? Will you open?"
            ),
            "solution": P(
                "<b>Step 1. The timing.</b> You pay the fit-out before you know the state. In the good state you never "
                "leave. In the bad state you are locked in for 24 months and then leave, because staying means losing "
                f"{n0(-cb5)} a month forever.",
                f"<b>Step 2. Good state.</b> NPV<sub>good</sub> = {n0(cg5)}/{f(rm5, 6)} − {n0(I5)} = {n0(cg5 / rm5)} − "
                f"{n0(I5)} = <b>{n0(NG5)}</b>",
                f"<b>Step 3. Bad state.</b> A 24-month annuity: a<sub>24</sub> = [1 − 1/{f(1 + rm5, 6)}<sup>24</sup>]/"
                f"{f(rm5, 6)} = {f(a24)}<br>"
                f"NPV<sub>bad</sub> = −{n0(I5)} − {n0(-cb5)} × {f(a24)} = −{n0(I5)} − {n0(-cb5 * a24)} = "
                f"<b>{n0(NB5)}</b>",
                f"<b>Step 4. Expected NPV.</b> NPV = 0.5 × {n0(NG5)} + 0.5 × ({n0(NB5)}) = <b>NOK {n0(NPV5b)}</b> &gt; 0. "
                "<b>Open the café</b>: the right to leave caps the loss in the bad state at two years.",
            ),
            "criteria": [
                "Timing: the fit-out is paid in both states; in the bad state you bear 24 months of losses and then "
                "leave; in the good state you never leave.",
                f"NPV_good = {n0(cg5)}/{f(rm5, 6)} − {n0(I5)} = {n0(NG5)}.",
                f"NPV_bad = −{n0(I5)} − {n0(-cb5)} × a24 with a24 = {f(a24, 2)}: {n0(NB5)}.",
                f"NPV = 0.5 × ({n0(NG5)} {MINUS} {n0(-NB5)}) = {n0(NPV5b)} > 0: open. Rounding in the monthly rate moves "
                "the answers by a few hundred NOK, which is accepted.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P(
                "How much is the right to terminate after 24 months worth to you, given what you would do without it? How "
                "much more would it be worth with termination at the end of month 12?"
            ),
            "solution": P(
                "<b>Step 1. Compare with what you would do without the right.</b> Under the standard lease you would not "
                "open (part a), so the alternative is to do nothing, worth 0:<br>"
                f"Value of the right = {n0(NPV5b)} − max(0, {n0(NPV5a)}) = <b>NOK {n0(VAL5)}</b>",
                "This is how Kurbatov values such options. In his key to H2024 Exercise 6 d) the option to wait is "
                "ρ × NPV<sub>u</sub> + (1 − ρ) × 0: the bad branch counts as 0 and the negative NPV of investing now is not "
                "subtracted. In the 2026 wrap-up lecture he warned against comparing an exit option with the negative "
                f"value. The number {n0(NPV5b)} − ({n0(NPV5a)}) = {n0(VAL5_feil)} answers another question: how much the "
                "clause adds to a café you are already committed to open.",
                f"<b>Step 2. Exit after 12 months.</b> Only the bad state changes: a<sub>12</sub> = {f(a12)}, so "
                f"NPV<sub>bad</sub> = −{n0(I5)} − {n0(-cb5)} × {f(a12)} = {n0(NB5_12)} and NPV = 0.5 × {n0(NG5)} + 0.5 × "
                f"({n0(NB5_12)}) = {n0(NPV5_12)}. The right is then worth {n0(NPV5_12)}, that is "
                f"<b>NOK {n0(extra5)} more</b>.",
                f"<b>Check (an identity, written out to show where the value comes from).</b> The extra value is the 12 "
                f"months of losses you avoid, with probability 0.5: 0.5 × {n0(-cb5)} × ({f(a24)} − {f(a12)}) = "
                f"{n0(extra5)} {OK}",
            ),
            "criteria": [
                f"The 24-month right (2 points): NPV with the right − max(0, NPV without) = {n0(NPV5b)} − 0 = "
                f"{n0(NPV5b)}, because without the right you would not open.",
                f"Partial credit: {n0(NPV5b)} − ({n0(NPV5a)}) = {n0(VAL5_feil)}, measured against the negative NPV, earns 1 "
                "of the 2 points if the calculation and the explanation are correct. Kurbatov compares with 0, both in "
                "his H2024 key (Exercise 6 d) and in the 2026 wrap-up.",
                f"Exit after 12 months (2 points): NPV_bad = {n0(NB5_12)}, NPV = {n0(NPV5_12)}, so the right is worth "
                f"{n0(extra5)} more.",
                "Bonus: the extra value equals the avoided losses of months 13 to 24, 0.5 × 5,000 × (a24 − a12).",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P(
                "Return to the lease in b). The landlord now charges a fee F, paid at the end of month 24 only if you "
                "leave. What is the highest F at which you would still open?"
            ),
            "solution": P(
                "<b>Step 1. Where the fee enters.</b> You pay F only in the bad state, at month 24, so it costs "
                f"0.5 × F/{f(1 + rm5, 6)}<sup>24</sup> = 0.5 × F/{f(g24, 6)} today.",
                "<b>Step 2. Set the NPV to zero.</b><br>"
                f"0 = {n0(NPV5b)} − 0.5 × F/{f(g24, 6)}<br>"
                f"F = 2 × {n0(NPV5b)} × {f(g24, 6)} = <b>NOK {n0(Fmax5)}</b>",
                "<b>Step 3. Would you still leave?</b> At month 24 in the bad state, staying costs the present value of "
                f"{n0(-cb5)} a month forever, {n0(-cb5)}/{f(rm5, 6)} = {n0(lim5)}. Since {n0(Fmax5)} &lt; {n0(lim5)}, "
                "paying the fee and leaving is still the better choice, so the equation in Step 2 is the right one. (A "
                f"fee above {n0(lim5)} would make you stay. The café would then be back to a), worth "
                f"{n0(NPV5a)}.)",
                f"<b>Check (an identity: F is put back into the equation it was solved from).</b> With F = {n0(Fmax5)} the "
                f"whole decision tree gives 0.5 × {n0(NG5)} + 0.5 × [−{n0(I5)} − "
                f"{n0(-cb5 * a24)} − {n0(Fmax5)}/{f(g24, 6)}] = 0 {OK}",
            ),
            "criteria": [
                f"The fee is paid only in the bad state and only at month 24: it is discounted by (1 + r_m)^24 = "
                f"{f(g24, 4)} and weighted by 0.5.",
                f"F = 2 × {n0(NPV5b)} × {f(g24, 4)} = {n0(Fmax5)}.",
                f"Checks that leaving is still optimal at that fee: {n0(Fmax5)} < {n0(-cb5)}/{f(rm5, 6)} = {n0(lim5)}.",
                f"Classic errors: not discounting the fee ({n0(2 * NPV5b)}) or forgetting that it is paid only in the "
                f"bad state ({n0(NPV5b * g24)}).",
            ],
        },
        {
            "label": "e",
            "points": 6,
            "body": P(
                "Without a fee, let the probability of high revenue be p. For which p are you indifferent about opening "
                "with the lease in b)? Under the standard lease? Explain briefly why the two differ."
            ),
            "solution": P(
                "<b>Step 1. With the right to leave.</b> The two state NPVs from b) do not depend on p:<br>"
                f"0 = p × {n0(NG5)} + (1 − p) × ({n0(NB5)})<br>"
                f"p = {n0(-NB5)}/({n0(NG5)} + {n0(-NB5)}) = <b>{f(p5_with)} ({pc(p5_with, 2)})</b>",
                "<b>Step 2. Without the right.</b> The bad state is now a loss forever:<br>"
                f"0 = p × {n0(cg5)}/{f(rm5, 6)} + (1 − p) × ({n0(cb5)})/{f(rm5, 6)} − {n0(I5)}<br>"
                f"p × {n0(cg5 - cb5)} = {n0(I5)} × {f(rm5, 6)} + {n0(-cb5)} = {f(I5 * rm5 + -cb5, 1)}<br>"
                f"p = <b>{f(p5_no)} ({pc(p5_no, 2)})</b>",
                f"<b>Step 3. Why they differ.</b> The right to leave truncates the downside: in the bad state you lose "
                f"{n0(-cb5)} a month for 24 months instead of forever, while the good state keeps its whole upside. A "
                f"much smaller chance of success, {pc(p5_with, 1)} instead of {pc(p5_no, 1)}, is therefore enough to "
                "make opening worthwhile; the more uncertain the demand, the more the flexibility is worth.",
                f"<b>Check.</b> Putting p = {f(p5_with)} back in is an identity: {f(p5_with)} × {n0(NG5)} − {f(1 - p5_with)} × {n0(-NB5)} = "
                f"{n0(p5_with * NG5 + (1 - p5_with) * NB5)} {OK} The real check is that both thresholds agree with the earlier parts: "
                f"{pc(p5_with, 1)} &lt; 50% &lt; {pc(p5_no, 1)}, so at 50% you open with the right (b) and not without it "
                "(a).",
            ),
            "criteria": [
                f"With the right: 0 = p × {n0(NG5)} + (1 − p) × ({n0(NB5)}), so p = {f(p5_with)}.",
                f"Without the right: 0 = p × {n0(cg5)}/r_m − (1 − p) × {n0(-cb5)}/r_m − {n0(I5)}, so p = {f(p5_no)}.",
                "The explanation names the mechanism: the right truncates the bad state at 24 months while the good "
                "state keeps the perpetuity, so a lower probability of success is enough.",
                "Bonus: links the thresholds to a) and b) (50% lies between them) or notes that flexibility is worth more "
                "when the spread of outcomes is wider.",
                "Points: 2 for each probability and 2 for the explanation. Show the equations.",
            ],
        },
    ],
}

# ===========================================================================
# Oppgave 6 · M&A: dealsannsynlighet over 3 måneder, implisitte synergier (3/9/4/4)
# ===========================================================================
NA6, PA0, NB6, PB0 = 150.0, 40.0, 30.0, 50.0
ER6 = 1.5                      # 3 A-aksjer for 2 B-aksjer
PA1, PB1 = 41.70, 59.60
rf6, T6 = 0.045, 0.25
g6 = (1 + rf6) ** T6
A6, T6v = NA6 * PA0, NB6 * PB0
offer6 = ER6 * PA1
spread6 = offer6 - PB1
prem0 = ER6 * PA0 / PB0 - 1    # premie til kursene før kunngjøring
prem1 = offer6 / PB0 - 1
# b) long-short per B-aksje
short6 = ER6 * PA1
inv6 = short6 * g6
succ6 = inv6
fail6 = PB0 - ER6 * PA0 + inv6
CE6 = PB1 * g6
p6 = (CE6 - fail6) / (succ6 - fail6)
close(p6 * succ6 + (1 - p6) * fail6, CE6)
close(p6, 1 - g6 * spread6 / (ER6 * PA0 - PB0))   # samme p på kortform
assert 0.6 < p6 < 0.8
p6_noCE = (PB1 - fail6) / (succ6 - fail6)          # glemt sikkerhetsekvivalenten
g6_year = 1 + rf6
p6_year = (PB1 * g6_year - (PB0 - ER6 * PA0 + short6 * g6_year)) / 10.0   # brukt et helt år
close(succ6 - fail6, ER6 * PA0 - PB0)
# c) implisitte synergier, to veier
MV1_6 = NA6 * PA1 + NB6 * PB1
S6 = (g6 * MV1_6 - (A6 + T6v)) / p6
X6 = ER6 * NB6
Pm6 = (g6 * PA1 - (1 - p6) * PA0) / p6
close(S6, (NA6 + X6) * Pm6 - (A6 + T6v), 1e-6)     # vei 2: merged-kursen fra A
close(g6 * PB1, p6 * ER6 * Pm6 + (1 - p6) * PB0, 1e-9)  # B prises med samme P_m
NPVA6 = NA6 * (Pm6 - PA0)
NPVB6 = NB6 * (ER6 * Pm6 - PB0)
close(NPVA6 + NPVB6, S6, 1e-6)
y6 = X6 / (NA6 + X6)
close((1 - y6) * (A6 + T6v + S6) - A6, NPVA6, 1e-6)  # formelarket
S6_noG = (MV1_6 - (A6 + T6v)) / p6                  # glemt å rente opp
S6_noP = g6 * MV1_6 - (A6 + T6v)                     # glemt p
S6_p4 = (g6 * MV1_6 - (A6 + T6v)) / round(p6, 4)     # med p avrundet til fire desimaler
assert abs(S6_p4 - S6) < 0.1
dMV6 = MV1_6 - (A6 + T6v)
assert S6 > S6_noG > dMV6 > 0
# d) utsettelse til 15 måneder: samme p og P_m gir lavere B-kurs
g6_15 = (1 + rf6) ** 1.25
PB_delay = (p6 * ER6 * Pm6 + (1 - p6) * PB0) / g6_15
assert PB_delay < PB1
PA_delay = (p6 * Pm6 + (1 - p6) * PA0) / g6_15
close((ER6 * PA_delay - PB_delay) / PB_delay, spread6 / PB1, 1e-3)   # spreaden i prosent uendret med samme p
close((ER6 * PA_delay - PB_delay) / PB_delay, (ER6 * PA1 - PB1) / PB1, 1e-3)
assert ER6 * PA_delay - PB_delay < spread6                          # i NOK krymper den

ex6 = {
    "n": 6,
    "title": "M&A",
    "points": 20,
    "topic": "Mergers and acquisitions",
    "chapters": [22, 26],
    "body": P(
        "Gaustad Energi ASA (A) bids for Bølgefiber ASA (B), offering 3 A shares for every 2 B shares. The bid was a "
        "surprise. The deal will be completed or fail in exactly 3 months; if it fails, both prices return to their "
        "pre-announcement levels, which reflect stand-alone values.",
        f"Before the announcement: {i0(NA6)} million A shares at P<sub>A,0</sub> = NOK {f(PA0, 2)} and {i0(NB6)} "
        f"million B shares at P<sub>B,0</sub> = NOK {f(PB0, 2)}. Just after: P<sub>A,1</sub> = NOK {f(PA1, 2)} and "
        f"P<sub>B,1</sub> = NOK {f(PB1, 2)}. The risk-free rate is {pc(rf6, 1)} a year. Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 3,
            "body": P(
                "What is the offer worth per B share at the new prices? What is the spread in NOK and in percent of B's "
                "price? Why does B trade below the offer?"
            ),
            "solution": P(
                f"<b>Step 1. The offer.</b> One B share becomes {f(ER6, 1)} A shares: {f(ER6, 1)} × {f(PA1, 2)} = "
                f"<b>NOK {f(offer6, 2)}</b> per B share, a premium of {pc(prem1, 1)} over B's pre-announcement price.",
                f"<b>Step 2. The spread.</b> {f(offer6, 2)} − {f(PB1, 2)} = <b>NOK {f(spread6, 2)}</b>, or "
                f"{f(spread6, 2)}/{f(PB1, 2)} = <b>{pc(spread6 / PB1, 2)}</b> of B's price.",
                "<b>Step 3. Why.</b> The deal may fail and then B falls back to "
                f"{f(PB0, 2)}. A holder of B bears that risk until the decision, so B trades below the offer; the spread "
                "is the price of insurance against deal failure that merger arbitrageurs earn for bearing it.",
            ),
            "criteria": [
                f"Offer = 1.5 × {f(PA1, 2)} = {f(offer6, 2)} per B share, at A's price after the announcement.",
                f"Spread = {f(spread6, 2)}, {pc(spread6 / PB1, 2)} of B's price (as a share of the offer, "
                f"{pc(spread6 / offer6, 2)}, is also accepted).",
                f"Reason: the deal can fail and then B returns to {f(PB0, 2)}; the spread compensates for that risk. "
                "Minimal accepted answer: 'the deal may not go through'.",
            ],
        },
        {
            "label": "b",
            "points": 9,
            "body": P(
                "Calculate the probability of completion perceived by the market. (Hint: use a long-short strategy, invest "
                "the short-sale proceeds at the risk-free rate and remember that the deal is decided in 3 months.)"
            ),
            "solution": P(
                "<b>Step 1. Build the position, per B share, at today's prices.</b>",
                tbl(
                    ["Leg", "Action", "Cash flow today"],
                    [
                        ["Long target", f"Buy 1 B share at {f(PB1, 2)}", MINUS + f(PB1, 2)],
                        ["Short acquirer", f"Short-sell {f(ER6, 1)} A shares at {f(PA1, 2)}", "+" + f(short6, 2)],
                        ["Risk-free", f"Invest the {f(short6, 2)} for 3 months", MINUS + f(short6, 2)],
                        ["<b>Net outlay</b>", "", f"<b>{MINUS}{f(PB1, 2)}</b>"],
                    ],
                    num=(2,),
                ),
                f"<b>Step 2. Three months at an annual rate.</b> The growth factor is (1 + {f(rf6, 3)})<sup>0.25</sup> = "
                f"{f(g6, 6)}, so the investment returns {f(short6, 2)} × {f(g6, 6)} = <b>{f(inv6)}</b>.",
                f"<b>Step 3. Payoff if the deal goes through.</b> The B share is exchanged for exactly the {f(ER6, 1)} A "
                f"shares needed to close the short. Only the investment is left: <b>{f(succ6)}</b>.",
                f"<b>Step 4. Payoff if the deal fails.</b> Prices return to {f(PA0, 2)} and {f(PB0, 2)}: sell B for "
                f"{f(PB0, 2)}, buy back {f(ER6, 1)} A shares for {f(ER6 * PA0, 2)}, keep the investment:<br>"
                f"{f(PB0, 2)} − {f(ER6 * PA0, 2)} + {f(inv6)} = <b>{f(fail6)}</b>",
                f"<b>Step 5. The certainty equivalent.</b> The strategy costs {f(PB1, 2)} today, so its expected payoff in "
                f"3 months must be {f(PB1, 2)} × {f(g6, 6)} = <b>{f(CE6)}</b>. Setting it equal to {f(PB1, 2)} is the "
                "error the H2025 key calls «very important to not just plug».",
                "<b>Step 6. Solve for p.</b><br>"
                f"{f(CE6)} = p × {f(succ6)} + (1 − p) × {f(fail6)}<br>"
                f"{f(CE6)} − {f(fail6)} = p × ({f(succ6)} − {f(fail6)})<br>"
                f"{f(CE6 - fail6)} = p × {f(succ6 - fail6)}<br>"
                f"<b>p = {f(p6)} ({pc(p6, 2)})</b>",
                f"<b>Check (an identity: p is put back into its own equation).</b> With the unrounded p = {f(p6, 6)}: {f(p6, 6)} × {f(succ6)} + {f(1 - p6, 6)} × {f(fail6)} = "
                f"{f(p6 * succ6 + (1 - p6) * fail6)} = "
                f"{f(PB1, 2)} × {f(g6, 6)} {OK} The market prices the deal as roughly a "
                f"{f(round(p6 * 10), 0)}-in-10 chance. Because the payoffs are discounted at r<sub>f</sub>, p is a "
                "risk-neutral probability.",
            ),
            "criteria": [
                "Builds a long-short position in the exchange ratio: long 1 B and short 1.5 A (or long 2 B and short 3 A) "
                f"and invests the short proceeds of {f(short6, 2)} at the risk-free rate. Many constructions work if they are "
                "consistent.",
                f"Uses the 3-month factor (1.045)^0.25 = {f(g6, 6)}, not 1.045: {f(short6, 2)} × {f(g6, 6)} = {f(inv6)}.",
                f"Success payoff = {f(succ6)} (the equity legs cancel); failure payoff = 50 − 60 + {f(inv6)} = {f(fail6)}, "
                "at the pre-announcement prices.",
                f"Certainty equivalent = {f(PB1, 2)} × {f(g6, 6)} = {f(CE6)}. Plugging {f(PB1, 2)} gives p = "
                f"{f(p6_noCE)}; using a full year gives p = {f(p6_year)}.",
                f"Solves {f(CE6)} = p × {f(succ6)} + (1 − p) × {f(fail6)}: p = {f(p6)} ({pc(p6, 2)}).",
                "This part carries 9 of the 20 points: show the position, both payoffs, the certainty equivalent and "
                "the equation.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P(
                "If the deal succeeds, the merged company will be worth the two pre-announcement market values plus "
                "synergies S. What S do the prices after the announcement imply? Use the assumptions of b)."
            ),
            "solution": P(
                "<b>Step 1. What the market value says.</b> In 3 months the two companies are worth A + T + S with "
                "probability p and A + T without the deal. Today's combined market value is the risk-neutral expectation "
                "discounted at r<sub>f</sub>:<br>"
                "N<sub>A</sub> × P<sub>A,1</sub> + N<sub>B</sub> × P<sub>B,1</sub> = [A + T + p × S]/(1 + r<sub>f</sub>)"
                "<sup>0.25</sup>",
                f"<b>Step 2. Numbers.</b> A + T = {i0(NA6)} × {f(PA0, 2)} + {i0(NB6)} × {f(PB0, 2)} = {n0(A6)} + "
                f"{n0(T6v)} = {n0(A6 + T6v)}. After the announcement: {i0(NA6)} × {f(PA1, 2)} + {i0(NB6)} × {f(PB1, 2)} "
                f"= {f(NA6 * PA1, 0)} + {f(NB6 * PB1, 0)} = {f(MV1_6, 0)}.<br>"
                f"S = ({f(MV1_6, 0)} × {f(g6, 6)} − {n0(A6 + T6v)})/{f(p6, 6)} = {f(g6 * MV1_6 - (A6 + T6v), 2)}/{f(p6, 6)} = "
                f"<b>NOK {f(S6, 1)} million</b>",
                f"<b>Second route (an identity: it uses the same p and the same pricing, so it checks the arithmetic, not "
                f"the model).</b> A's price must equal the expected value of A's share: "
                f"{f(PA1, 2)} × {f(g6, 6)} = p × P<sub>merged</sub> + (1 − p) × {f(PA0, 2)}, so P<sub>merged</sub> = "
                f"({f(g6 * PA1)} − {f(1 - p6, 6)} × {f(PA0, 2)})/{f(p6, 6)} = {f(Pm6)}. The merged company has {i0(NA6)} + "
                f"{f(X6, 0)} = {f(NA6 + X6, 0)} million shares, so S = {f(NA6 + X6, 0)} × {f(Pm6)} − {n0(A6 + T6v)} = "
                f"{f((NA6 + X6) * Pm6 - (A6 + T6v), 1)} {OK} The split: NPV<sub>A</sub> = {i0(NA6)} × ({f(Pm6)} − "
                f"{f(PA0, 2)}) = {f(NPVA6, 1)} and NPV<sub>B</sub> = {i0(NB6)} × ({f(ER6, 1)} × {f(Pm6)} − {f(PB0, 2)}) = "
                f"{f(NPVB6, 1)}, which sum to S, again an identity {OK}",
                f"<b>Note.</b> The combined market value rose by only {f(dMV6, 0)}: the market expects synergies of about "
                f"{f(S6, 0)} but discounts them for the {pc(1 - p6, 0)} chance that the deal fails.",
            ),
            "criteria": [
                "Uses the same convention as b): A + T + S in the success state, A + T in the failure state, risk-neutral "
                "probability p and discounting over 3 months.",
                f"Combined market value after the announcement = {f(MV1_6, 0)} against A + T = {n0(A6 + T6v)} before.",
                f"S = ({f(MV1_6, 0)} × {f(g6, 6)} − {n0(A6 + T6v)})/{f(p6)} = {f(S6, 1)} ({f(S6_p4, 1)} with p rounded to "
                f"{f(p6)} is fine). The same S follows from A's "
                f"price through the merged share price of {f(Pm6, 2)}.",
                f"Classic errors: forgetting p (S = {f(S6_noP, 1)}), the 3-month factor (S = {f(S6_noG, 1)}) or both "
                f"(S = {f(dMV6, 0)}).",
                f"Bonus: the split NPV_A = {f(NPVA6, 1)} and NPV_B = {f(NPVB6, 1)}, which sum to S.",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P(
                "What if the decision is delayed by one year, to 15 months? How would the calculation in b) change? "
                "What do you expect for B's share price and why? (3-4 sentences, no calculation needed.)"
            ),
            "solution": P(
                "<b>Model answer (four sentences).</b> In b) the 3-month factor (1.045)<sup>0.25</sup> becomes "
                "(1.045)<sup>1.25</sup>, both for the investment of the short proceeds and for the certainty "
                "equivalent; the payoffs in the two states are otherwise the same. B's price should fall towards its "
                "stand-alone value. B's shareholders now receive the offer (and the synergies behind it) a year later, "
                "which lowers its present value. A longer wait also gives more room for the deal to fail (conditions "
                "from the regulator, financing, a change in market conditions), so the market's probability of "
                "completion is likely to fall as well.",
                f"<b>Bonus (not required).</b> With p and the merged share price unchanged, the model gives a B price of "
                f"[{f(p6)} × {f(ER6, 1)} × {f(Pm6)} + {f(1 - p6)} × {f(PB0, 2)}]/{f(g6_15, 6)} = {f(PB_delay, 2)} instead "
                f"of {f(PB1, 2)}: the time effect alone. With p unchanged the spread stays at {pc(spread6 / PB1, 2)} of B's "
                f"price; it widens only if p falls. A delay can also work the other way if it opens the door for a "
                "rival bidder for B, or if A can use the extra year to learn more about the synergies (an option to "
                "wait).",
            ),
            "criteria": [
                "Changes the time factor to (1.045)^1.25 in both places: the short proceeds and the certainty "
                "equivalent.",
                "Predicts that B's price falls and gives a reason: the offer and the "
                "synergies arrive later, so they are worth less today.",
                "A second mechanism: more time for the deal to fail lowers p. A rival bidder (B could rise) or the option "
                "to wait for information is accepted if argued.",
                "3-4 sentences. A calculation is not required.",
            ],
        },
    ],
}

# ===========================================================================
# Settet
# ===========================================================================
exam = {
    "id": "prove4",
    "kind": "mock",
    "label": "Mock exam 4",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator and one bilingual dictionary permitted",
    "note": (
        "Mock exam 4, “the most likely set”. Written for this app as practice in Kurbatov's format (H2024, H2025) from "
        "the 2026 prediction for this course, with new firms and numbers throughout. It is not an official exam and no "
        "official solution key exists."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 6 exercises, 100 points, 180 minutes, no multiple choice, "
        "calculator and one bilingual dictionary permitted.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Two verbal exercises with sentence budgets, then four "
        "computational exercises.",
        "The formula sheet is handed out.",
        "Recommended precision: 4 decimal places. An error carried forward is not penalised again in later parts.",
        "Written for this app. Every number in the solutions is computed in a script.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}


# ===========================================================================
# Kontroller før skriving
# ===========================================================================
def strings(o, sti="sett"):
    if isinstance(o, str):
        yield sti, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from strings(v, f"{sti}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from strings(v, f"{sti}[{i}]")


feil = []
POENG = [12, 12, 18, 18, 20, 20]
if sum(POENG) != exam["points"]:
    feil.append("poengsummen er ikke 100")
for e, p in zip(exam["exercises"], POENG):
    if e["points"] != p:
        feil.append(f"oppgave {e['n']}: {e['points']} poeng, skal være {p}")
    if "parts" in e:
        s = sum(d["points"] for d in e["parts"])
        if s != e["points"]:
            feil.append(f"oppgave {e['n']}: deloppgavene summerer til {s}")
        if not 3 <= len(e["parts"]) <= 9:
            feil.append(f"oppgave {e['n']}: {len(e['parts'])} deloppgaver")
        for d in e["parts"]:
            if not 2 <= d["points"] <= 12:
                feil.append(f"oppgave {e['n']}{d['label']}: {d['points']} poeng")
            if not 3 <= len(d["criteria"]) <= 7:
                feil.append(f"oppgave {e['n']}{d['label']}: {len(d['criteria'])} kriterier")
            if not d.get("solution"):
                feil.append(f"oppgave {e['n']}{d['label']}: mangler løsning")
    else:
        if not 3 <= len(e["criteria"]) <= 7:
            feil.append(f"oppgave {e['n']}: {len(e['criteria'])} kriterier")

HTML_RE = re.compile(r"<[a-zA-Z/!]")
for sti, t in strings(exam):
    if "—" in t or "&mdash;" in t:
        feil.append(f"tankestrek i {sti}")
    for m in re.finditer(r",\s+and\b", t, re.I):
        feil.append(f"komma foran «and» i {sti}: …{t[max(0, m.start() - 60):m.end() + 10]}…")
    if ".criteria" in sti and (HTML_RE.search(t) or re.search(r"&[a-z#0-9]+;", t)):
        feil.append(f"markup eller entitet i kriterium {sti}")
    if re.search(r"\d,\d{1,2}(?!\d)", t):
        feil.append(f"mulig norsk desimalkomma i {sti}")
    if re.search(r"(?<![\w.])(nan|inf)(?![\w])", t):
        feil.append(f"nan/inf i {sti}")
    if "-0.0" in t or MINUS + "0.0000" in t:
        feil.append(f"minus null i {sti}")

if feil:
    print("\nFEIL, ingenting ble skrevet:")
    for x in feil:
        print("  ✗", x)
    raise SystemExit(1)


# ===========================================================================
# Oppgaveteksten alene (til den blinde kontrolløren)
# ===========================================================================
def md_inline(s):
    """HTML i en tekst til lesbar Markdown: fet, kursiv, sub/sup som _ og ^."""
    s = re.sub(r"<b>(.*?)</b>", r"**\1**", s, flags=re.S)
    s = re.sub(r"<i>(.*?)</i>", r"*\1*", s, flags=re.S)
    s = re.sub(r"<sub>(.*?)</sub>", lambda m: "_" + (m.group(1) if len(m.group(1)) == 1 else "{" + m.group(1) + "}"), s)
    s = re.sub(r"<sup>(.*?)</sup>", lambda m: "^" + (m.group(1) if len(m.group(1)) == 1 else "(" + m.group(1) + ")"), s)
    s = s.replace("<br>", "  \n")
    s = re.sub(r"<[^>]+>", "", s)
    return html.unescape(s)


def md_block(h):
    ut = []
    for m in re.finditer(r"<p>(.*?)</p>|<table class=\"data\">(.*?)</table>", h, flags=re.S):
        if m.group(1) is not None:
            ut.append(md_inline(m.group(1)))
        else:
            rader = re.findall(r"<tr>(.*?)</tr>", m.group(2), flags=re.S)
            celler = [[md_inline(c) for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, flags=re.S)] for r in rader]
            linjer = ["| " + " | ".join(celler[0]) + " |", "|" + "---|" * len(celler[0])]
            linjer += ["| " + " | ".join(r) + " |" for r in celler[1:]]
            ut.append("\n".join(linjer))
    return "\n\n".join(ut)


md = [
    "# FIE402 Corporate Finance · Mock exam 4",
    "",
    "180 minutes · 100 points · 6 exercises · no multiple choice · calculator and one bilingual dictionary "
    "permitted. The formula sheet is handed out. Answer in English and show your calculations.",
    "",
]
for e in exam["exercises"]:
    md += [f"## Exercise {e['n']} ({e['points']} points) · {e['title']}", "", md_block(e["body"]), ""]
    for d in e.get("parts", []):
        md += [f"**{d['label']})** ({d['points']} points) " + md_block(d["body"]), ""]
md_tekst = "\n".join(md).rstrip() + "\n"
assert "—" not in md_tekst and not re.search(r",\s+and\b", md_tekst)
assert "<" not in md_tekst.replace("< ", "").replace("&lt;", ""), "HTML igjen i oppgaveteksten"

with open(OUT, "w", encoding="utf-8") as fh:
    json.dump(exam, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(OUT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)

# ------------------------------------------------------------- hovedtallene
print("E1: tap", n0(tap1), "kostnad", n0(kost1), "andel", pc(andel_kost1, 2))
print("E3: rU", pc(rU3), "VU", n0(VU3), "P0", f(P0_3, 2), "D", n0(D3), "PVTS", n0(PVTS3), "P1", f(P1_3),
      "n", f(n3, 2), "N1", f(N1_3, 2), "DPS", f(DPS1_3), "rE", pc(rE3), "rE_feil", pc(rE3_feil), "wacc", pc(wacc3),
      "D_feil", n0(D3_feil))
print("E4: F", [f(x, 2) for x in F4], "bU", f(bU4), "rU", pc(rU4), "rE", pc(rE4), "wacc", pc(wacc4))
print("    VL", [f(v) for v in VL4], "NPV", f(NPV4), "D", [f(x) for x in D4t], "VU", f(VU4), "TS", [f(x) for x in TS4],
      "PVTS", f(PVTS4), "APV", f(APV4), "APV_rD", f(VU4 + PVTS4_rD), "bU_feil", f(bU4_brutto), f(bU4_allcash))
print("E5: rm", pc(rm5), "a24", f(a24), "a12", f(a12), "NPVa", n0(NPV5a), "NG", n0(NG5), "NB", n0(NB5),
      "NPVb", n0(NPV5b), "feil", n0(VAL5_feil), "NPV12", n0(NPV5_12), "ekstra", n0(extra5), "Fmax", n0(Fmax5),
      "grense", n0(lim5), "p_with", f(p5_with), "p_no", f(p5_no), "avvik eksakt rente", f(avvik5, 0))
print("E6: tilbud", f(offer6, 2), "spread", f(spread6, 2), pc(spread6 / PB1, 2), "g", f(g6, 6), "inv", f(inv6),
      "fail", f(fail6), "CE", f(CE6), "p", f(p6), "p_noCE", f(p6_noCE), "p_year", f(p6_year))
print("    MV1", f(MV1_6, 0), "S", f(S6, 2), "Pm", f(Pm6), "NPVA", f(NPVA6, 2), "NPVB", f(NPVB6, 2),
      "S_noG", f(S6_noG, 2), "PB_delay", f(PB_delay, 2))
print("Skrev", OUT)
print("Skrev", OUT_MD)
