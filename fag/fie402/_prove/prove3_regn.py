#!/usr/bin/env python3
"""FIE402 Mock exam 3 («Kurbatov's 2026 emphasis»): beregner alle tall og skriver prove3.json.

Kjør:  python3 -I fag/fie402/_prove/prove3_regn.py

Hvert tall i oppgavetekst, løsning og kriterier kommer fra beregningene her.
Konsistenssjekkene (WACC = APV, βU som vektet snitt, rasjonelle forventninger
i Myers-Majluf, put-call-paritet, uendret kurs ved tilbakekjøp osv.) er
assert-er, så skriptet stopper hvis et tall ikke henger sammen.
Til slutt sjekkes poeng, tankestrek, «, and» og markup i kriteriene.
"""

import json
from fractions import Fraction as Fr
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "prove3.json")

MINUS = "−"
OK = "✓"


def close(a, b, tol=1e-9):
    assert abs(a - b) < tol, (a, b)


def f(x, d=4):
    """Tall med d desimaler og ekte minustegn."""
    s = f"{x:.{d}f}"
    if s.startswith("-"):
        s = s[1:] if float(s) == 0 else MINUS + s[1:]
    return s


def pc(x, d=4):
    return f(x * 100, d) + "%"


def i0(x):
    assert abs(x - round(x)) < 1e-9, x
    return f(round(x), 0)


def tbl(header, rows, num=()):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in header) + "</tr>"
    body = ""
    for r in rows:
        body += "<tr>" + "".join(
            (f'<td class="n">{c}</td>' if j in num else f"<td>{c}</td>") for j, c in enumerate(r)
        ) + "</tr>"
    return f'<table class="data">{h}{body}</table>'


def fr(x):
    """Brøk som tekst, f.eks. 15/62."""
    return f"{x.numerator}/{x.denominator}"


def ledd(xs, total, d=4):
    """Velger 4 eller 6 desimaler slik at de trykte leddene summerer til den trykte totalen."""
    for dd in (d, 6):
        if round(sum(round(x, dd) for x in xs), d) == round(total, d):
            return [f(x, dd) for x in xs]
    raise AssertionError(("summen går ikke opp", xs, total))


def P(*paras):
    return "".join(f"<p>{p}</p>" for p in paras)


# ===========================================================================
# Exercise 1 · Payout policy (verbal)
# ===========================================================================
tau_div, tau_cg = 0.30, 0.20
tau_d_star = (tau_div - tau_cg) / (1 - tau_cg)
close(tau_d_star, 0.125)
cash_payout = 600

ex1 = {
    "n": 1,
    "title": "Payout policy",
    "points": 12,
    "topic": "Payout policy",
    "chapters": [15, 16],
    "body": P(
        f"Cash Cow Industries has NOK {cash_payout} million of excess cash and no positive-NPV projects to spend it on. "
        "The board is choosing between paying the cash out as a one-off special dividend and using it to buy back "
        "shares in the open market at the market price.",
        "a) (4 points) Assume perfect capital markets. Explain why a shareholder should be indifferent between the two routes.",
        f"b) (4 points) Most of the firm's shareholders are taxable individuals who pay {pc(tau_div, 0)} tax on dividends "
        f"and {pc(tau_cg, 0)} tax on realised capital gains. Which route do they prefer and why?",
        "c) (4 points) The CFO argues that the special dividend sends the stronger positive signal to the market, "
        "because “investors reward dividends”. Do you agree? Briefly explain what each route can signal.",
        "(You do not need any calculations. Keep explanations short: 2-3 sentences per question should be enough.)",
    ),
    "solution": P(
        "<b>a) Payout irrelevance.</b> In a perfect market the payout is a purely financial transaction: the cash "
        "leaves the firm either way, while the operating assets and the value of the firm's future cash flows are untouched. "
        "With the dividend the share price falls by exactly the dividend per share on the ex-dividend date, so share plus "
        "cash is worth what the share was worth before; with the repurchase the firm buys shares at their fair price, so "
        "the price does not move and the remaining shareholders own a larger fraction of a smaller firm. "
        "Each shareholder can also undo the firm's choice at no cost, by selling shares to create a homemade dividend or by "
        "reinvesting the dividend at the ex-dividend price, so wealth is identical under both routes (MM payout irrelevance).",
        "<b>b) Personal taxes favour the repurchase.</b> With a special dividend every shareholder pays "
        f"{pc(tau_div, 0)} on the full amount received, immediately. With a repurchase only the shareholders who choose to sell "
        f"pay tax, at the lower {pc(tau_cg, 0)} rate and only on the gain above what they paid for their shares, while those who "
        "keep their shares defer the tax until they sell. Lower rate, smaller base and deferral all point the same way, so "
        "these investors prefer the repurchase; a tax-exempt holder such as a pension fund would still be indifferent.",
        "<b>c) Only partly.</b> The signalling power of dividends comes from the <i>regular</i> dividend, which commits "
        "the firm to future payments the market punishes it for cutting; a special dividend is labelled one-off, so it "
        "carries little of that signal beyond telling the market that the firm has more cash than good projects. "
        "A repurchase at the market price benefits the remaining shareholders only if the shares are cheap, so it signals "
        "that management believes the shares are undervalued, although an open-market programme is not binding and can be "
        "left half done. "
        "So the CFO is at most partly right: either way a price reaction reflects information about existing value rather "
        "than value created by the payout.",
        "<b>Also accepted.</b> In a): the arithmetic P<sub>ex</sub> = P<sub>cum</sub> − Div against an unchanged price "
        "after a repurchase. In b): the effective dividend tax penalty "
        f"τ*<sub>d</sub> = (τ<sub>d</sub> − τ<sub>g</sub>)/(1 − τ<sub>g</sub>) = "
        f"({f(tau_div, 2)} − {f(tau_cg, 2)})/(1 − {f(tau_cg, 2)}) = {pc(tau_d_star, 1)}, which also means the "
        "price falls by less than the dividend on the ex-date; clientele effects. In c): both routes reduce the free cash "
        "flow problem by taking the cash away from management; paying out can be read as a sign of few investment "
        "opportunities; a fixed-price tender offer at a premium is a stronger repurchase signal than an open-market programme.",
    ),
    "criteria": [
        "a) Names payout irrelevance in a perfect market and gives the mechanism: the dividend lowers the share price by exactly the dividend per share, while a repurchase at a fair price leaves it unchanged. Wealth (shares plus cash) is the same either way.",
        "a) Credit for the homemade-dividend argument: a shareholder can sell shares to replicate the dividend or reinvest the dividend to replicate the repurchase, at no cost.",
        "b) Repurchase. Minimal accepted answer: capital gains are taxed at 20% against 30% for dividends. Full marks name at least two of the three advantages: lower rate, smaller base (only the gain over the purchase price), deferral for those who do not sell.",
        "b) Bonus: the conclusion is conditional on the tax rates. A tax-exempt investor is indifferent; the effective dividend tax penalty here is (0.30 − 0.20)/(1 − 0.20) = 12.5%.",
        "c) Either verdict can score if it is argued. Full marks need the key distinction: the signal in dividends comes from the commitment of a regular dividend, which a one-off special dividend does not carry.",
        "c) States what a repurchase can signal: management believes the shares are undervalued. Credit for noting that an open-market programme is not binding (so the special dividend is the firmer payment), or that the signal is stronger when insiders do not sell.",
        "Classic error: claiming that the payout itself creates value. A price reaction is information about existing value; in a perfect market neither route creates or destroys anything.",
    ],
}

# ===========================================================================
# Exercise 2 · Governance (verbal)
# ===========================================================================
stake, trigger, n_acq, drop, sev_years, pay_m = 0.07, 0.10, 5, 0.30, 3, 15
severance = sev_years * pay_m                    # 45 millioner USD

ex2 = {
    "n": 2,
    "title": "Governance",
    "points": 12,
    "topic": "Corporate governance",
    "chapters": [11, 26, 27],
    "body": P(
        "Quiet Harbor Software Inc. is a US-listed company with dispersed ownership. Over the past three years its CEO "
        f"has bought {n_acq} companies outside the firm's core business. Over the same period the share price has fallen by "
        f"{pc(drop, 0)} while the market rose. He has announced further acquisitions of the same kind. An activist hedge fund, Loudvoice "
        f"Capital, has bought {pc(stake, 0)} of the shares. It publicly demands that the board stop the acquisition "
        "programme, replace the CEO and give the fund two seats on the board.",
        f"The board responds in two ways. It adopts a poison pill with a {pc(trigger, 0)} trigger without a shareholder vote. "
        "It also amends the CEO's contract: if he loses his job within two years after a change in the board's majority or "
        f"a takeover, he receives a severance payment of USD {severance} million ({sev_years} times his annual pay).",
        "Answer the following three questions (each is worth 4 points):",
        "a) Why is it the fund rather than the firm's many small shareholders that takes action? Which agency problem do "
        "its demands address?",
        "b) Whose interest is the poison pill likely to serve? Give one consequence for the shareholders other than the fund.",
        "c) Whose interest is the new severance clause likely to serve? Give one consequence for the shareholders.",
        "Keep explanations short: 2-3 sentences per question.",
    ),
    "solution": P(
        "<b>a) The free-rider problem and empire building.</b> A small shareholder who spent money monitoring or "
        "campaigning would bear the whole cost but collect only his tiny fraction of the gain, so he free-rides; with "
        f"{pc(stake, 0)} the fund captures enough of any increase in value to make a costly campaign worthwhile. "
        "Its demands target empire building: a CEO who gains prestige, power and pay from running a larger firm keeps "
        "buying businesses that destroy value for the owners, so stopping the programme, replacing him and putting "
        "monitors on the board all attack the conflict between the manager's interest and the shareholders'.",
        f"<b>b) The poison pill.</b> The pill lets every shareholder except the one who crosses {pc(trigger, 0)} buy new "
        "shares at a deep discount, so it caps Loudvoice's stake and any group it forms; only the board can remove it. "
        "Under the shareholder-bargaining view a pill lets the board negotiate a higher price in a takeover, but here there "
        "is no bid to negotiate over and it was adopted without a vote, so it most likely serves management by entrenching "
        "the board. For the other shareholders it weakens the two disciplines they rely on, activism and the threat of a "
        "takeover, so the acquisition programme is more likely to continue and the share price will typically fall on the news.",
        "<b>c) The severance clause, a golden parachute.</b> A golden parachute can serve shareholders when it removes a "
        "manager's personal reason to resist a value-increasing change of control, but adopted in the middle of a campaign "
        "to replace this CEO it mainly protects him: it pays him for the failure the fund is complaining about. "
        f"For the other shareholders it makes the remedy expensive (up to USD {severance} million paid to the CEO if he is "
        "removed) while weakening the threat of dismissal that disciplines him as long as he stays.",
        "<b>Also accepted.</b> In a): the stake is large enough to internalise the gain but too small to win a vote alone, "
        "which is why the fund campaigns in public; diversifying acquisitions also lower the CEO's personal risk, which "
        "shareholders could diversify themselves. In b): the pill does not stop a proxy fight, so Loudvoice could still try "
        "to replace directors who would then redeem it; firms with pills receive fewer takeover bids. In c): a board that "
        "adopts the clause during the campaign signals that it sides with management; the payment is a cost to the firm "
        "whether or not it deters anyone; shareholders could vote against it in an advisory say-on-pay vote. A well-argued "
        "point beyond these earns credit, as in H2025.",
    ),
    "criteria": [
        "Three answers of 2–3 sentences, 4 points each. The explanation carries the points, not the label.",
        "a) Names the free-rider problem: a small holder bears the full cost of acting but gets only his fraction of the gain, while a 7% stake internalises enough of the gain to make monitoring pay.",
        "a) Names the agency problem behind the demands: empire building, a CEO who gains prestige, power and pay from size and makes value-destroying acquisitions. Stopping the programme, replacing the CEO and board seats all address the manager–shareholder conflict.",
        "b) Explains how the pill works (heavy dilution of anyone crossing the trigger, removable only by the board) and weighs the two readings, shareholder bargaining versus managerial entrenchment. With no bid on the table and no vote, entrenchment is the stronger reading.",
        "b) Gives a concrete consequence: activism and the takeover threat are blunted, the acquisition programme is likely to continue, fewer bids, a lower share price.",
        "c) Identifies a golden parachute and weighs both readings: it can remove a manager's reason to resist a good change of control, but adopted during a campaign to replace this CEO it mainly protects him.",
        "c) Consequence: replacing the CEO now costs up to USD 45 million, a transfer from the shareholders to the manager whose performance is the problem; the threat of dismissal also loses force.",
    ],
}

# ===========================================================================
# Exercise 3 · Asymmetric information, Myers-Majluf (3/3/4/4/4)
# ===========================================================================
VH, VL, q = 180.0, 60.0, 0.6
I3, X3 = 45.0, 54.0           # investering og sikker utbetaling ved t = 1
NPV3 = X3 - I3                # 9
EV = q * VH + (1 - q) * VL    # 132
post_pool = EV + X3           # = EV + I + NPV = 186
a_pool = I3 / post_pool
a_pool_fr = Fr(int(I3), int(post_pool))          # 15/62
payH_pool = (1 - a_pool) * (VH + X3)
payL_pool = (1 - a_pool) * (VL + X3)
dilH = a_pool * (VH - EV)
gainL = a_pool * (EV - VL)
close(payH_pool, VH + NPV3 - dilH)
close(payL_pool, VL + NPV3 + gainL)
assert payH_pool < VH and payL_pool > VL          # bare lav type utsteder
assert dilH > NPV3
close(q * dilH, (1 - q) * gainL)                  # investorene går i null i snitt ved pooling

a_sep = I3 / (VL + X3)
a_sep_fr = Fr(int(I3), int(VL + X3))             # 15/38
payL_sep = (1 - a_sep) * (VL + X3)
payH_dev = (1 - a_sep) * (VH + X3)
close(payL_sep, VL + NPV3)
assert payL_sep > VL and payH_dev < VH            # konsistenssjekk 5: separerende likevekt
close(a_sep * (VL + X3), I3)                       # nye investorer går i null
loss3 = q * NPV3
pre_value = q * VH + (1 - q) * (VL + NPV3)
close(pre_value, EV + (1 - q) * NPV3)
payH_pool_r = round(1 - a_pool, 4) * (VH + X3)    # med α avrundet til 4 desimaler
payH_dev_r = round(1 - a_sep, 4) * (VH + X3)
assert 0 < payH_pool_r - payH_pool < 0.01 and 0 < payH_dev_r - payH_dev < 0.01             # kursen før beslutningen = prior + realisert NPV

# Prior der pooling ville overleve: I(VH − E) = NPV(E + X)
E_star = (I3 * VH - NPV3 * X3) / (I3 + NPV3)
q_star = (E_star - VL) / (VH - VL)
close((I3 / (E_star + X3)) * (VH - E_star), NPV3)
assert q_star > q

a_cert = I3 / (VH + X3)
a_cert_fr = Fr(int(I3), int(VH + X3))            # 5/26
payH_cert = (1 - a_cert) * (VH + X3)
close(payH_cert, VH + NPV3)
K_max = payH_cert - VH
close(K_max, NPV3)
K_cert = 4.0
payH_net = payH_cert - K_cert
assert payH_net > VH and payH_net > payH_dev
loss_cert = q * K_cert
recovered = loss3 - loss_cert
value_cert = q * (NPV3 - K_cert) + (1 - q) * NPV3
close(value_cert, NPV3 - loss_cert)
close(recovered, value_cert - (1 - q) * NPV3)

F_debt = I3                                        # rf = 0, risikofri gjeld
assert VL + X3 >= F_debt
payH_debt = VH + X3 - F_debt
payL_debt = VL + X3 - F_debt
close(payH_debt, VH + NPV3)
close(payL_debt, VL + NPV3)
assert payH_debt > VH and payL_debt > VL
close(payL_debt, payL_sep)                         # lav type tjener ikke på å bytte til egenkapital

ex3 = {
    "n": 3,
    "title": "Asymmetric information",
    "points": 18,
    "topic": "Asymmetric information, Myers-Majluf",
    "chapters": [12, 13],
    "body": P(
        "Tindefjell Mining is an all-equity firm owned by its existing shareholders. At t = 1 its existing assets will be "
        f"worth either {i0(VH)} (a high-value firm) or {i0(VL)} (a low-value firm). The manager knows the firm's true type. "
        f"Investors do not: they assign probability {pc(q, 0)} to the high-value type and {pc(1 - q, 0)} to the low-value type.",
        f"The firm can invest {i0(I3)} at t = 0 in a new processing plant that pays a certain {i0(X3)} at t = 1, whatever "
        "the type of the firm. If the firm does not invest now, the opportunity is lost. The investment must be financed "
        "entirely by issuing new equity. New investors are competitive and risk-neutral; if they receive a fraction α "
        "of the firm after the issue, the existing shareholders keep 1 − α. The manager acts in the interest of "
        "the existing shareholders. The risk-free rate is 0%, so no discounting is required. All amounts are in million NOK. "
        "Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 3,
            "body": P(
                "What is the market value of the firm's existing assets before the manager's type is revealed? Suppose "
                "investors price the new shares using this prior belief, that is, they expect both types to issue. What "
                f"fraction α of the firm must be sold to raise {i0(I3)}?"
            ),
            "solution": P(
                f"<b>Step 1. The prior value of the assets.</b> E[V] = {f(q, 1)} × {i0(VH)} + {f(1 - q, 1)} × {i0(VL)} "
                f"= {i0(q * VH)} + {i0((1 - q) * VL)} = <b>{i0(EV)}</b>.",
                f"<b>Step 2. The post-issue value investors expect.</b> After the issue the firm holds the existing assets and "
                f"the plant, which pays {i0(X3)} = I + NPV with NPV = {i0(X3)} − {i0(I3)} = {i0(NPV3)}. Under the prior "
                f"belief the firm is worth {i0(EV)} + {i0(I3)} + {i0(NPV3)} = <b>{i0(post_pool)}</b> after the issue.",
                f"<b>Step 3. The fraction sold.</b> New investors break even: α × {i0(post_pool)} = {i0(I3)}, so "
                f"α = {i0(I3)}/{i0(post_pool)} = <b>{f(a_pool)}</b> (15/62). The existing shareholders keep "
                f"1 − α = {fr(1 - a_pool_fr)} = {f(1 - a_pool)}.",
                f"<b>Check.</b> The cash raised belongs in the denominator. Writing α = {i0(I3)}/({i0(EV)} + {i0(NPV3)}) = "
                f"{f(I3 / (EV + NPV3))} leaves it out and overstates the fraction sold; every payoff after it inherits the error.",
            ),
            "criteria": [
                "E[V] = 0.6 × 180 + 0.4 × 60 = 132, the prior value of the existing assets.",
                f"The post-issue value includes the cash raised: 132 + 45 + 9 = 186 (or 132 + 54). Leaving out the 45 gives α = 45/141 = {f(I3 / (EV + NPV3))}, the classic error.",
                f"α = 45/186 = {f(a_pool)}.",
                "Show the calculation. No calculation, no points.",
            ],
        },
        {
            "label": "b",
            "points": 3,
            "body": P(
                "At this α, what is the payoff to the existing shareholders of each type if the firm issues equity and "
                "invests? Which type or types will issue equity and undertake the project?"
            ),
            "solution": P(
                f"Investors price the issue off their belief, but the existing shareholders' payoff depends on the <i>true</i> "
                f"value: (1 − α)(V + {i0(X3)}), compared with V if the firm does not issue (the project is then lost).",
                tbl(
                    ["Type", f"True value after issue, V + {i0(X3)}", "Payoff (1 − α)(V + 54)", "Value if no issue", "Issue?"],
                    [
                        ["High", i0(VH + X3), f"({fr(1 - a_pool_fr)}) × {i0(VH + X3)} = {f(payH_pool)}", i0(VH), "No"],
                        ["Low", i0(VL + X3), f"({fr(1 - a_pool_fr)}) × {i0(VL + X3)} = {f(payL_pool)}", i0(VL), "Yes"],
                    ],
                    num=(1, 2, 3),
                ),
                f"<b>Why.</b> The high-value firm sells underpriced shares: it gives away α(V<sub>H</sub> − E[V]) = "
                f"({fr(a_pool_fr)}) × {i0(VH - EV)} = <b>{f(dilH)}</b>, more than the NPV of {i0(NPV3)}, so its old shareholders "
                f"end with {i0(VH)} + {i0(NPV3)} − {f(dilH)} = {f(payH_pool)} &lt; {i0(VH)}. The low-value firm sells "
                f"overpriced shares and gains ({fr(a_pool_fr)}) × {i0(EV - VL)} = {f(gainL)} on top of the NPV: "
                f"{i0(VL)} + {i0(NPV3)} + {f(gainL)} = {f(payL_pool)} &gt; {i0(VL)}. <b>Only the low-value firm issues.</b>",
                f"<b>Check.</b> At the pooling price new investors would break even on average: {f(q, 1)} × {f(dilH, 6)} = "
                f"{f(1 - q, 1)} × {f(gainL, 6)} = {f(q * dilH, 6)} {OK}. The good type's loss and the bad type's gain are "
                "equal only after weighting by the probabilities.",
            ),
            "criteria": [
                "Values the existing shareholders' stake at the TRUE value, (1 − α)(V + 54), not at the investors' 186. Mixing beliefs and truth is the standard error.",
                f"High: ({fr(1 - a_pool_fr)}) × 234 = {f(payH_pool)} < 180, so it does not issue. Low: ({fr(1 - a_pool_fr)}) × 114 = {f(payL_pool)} > 60, so it issues.",
                "Compares with V alone, because the project is lost without the issue, not with V + NPV.",
                f"Explains why: the high type's dilution of {f(dilH)} exceeds the NPV of 9, while the low type gains from selling overpriced shares.",
                f"Deviations below 0.01 come from rounding α and are accepted, as in the H2025 key: {f(1 - a_pool)} × 234 = {f(payH_pool_r)} against the exact {f(payH_pool)}.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P(
                "Are the investors' beliefs in a) consistent with your answer in b)? Find the equilibrium: what fraction "
                "α is sold and which type issues and invests? What is the expected loss of value compared with a world "
                "where investors also know the type?"
            ),
            "solution": P(
                "<b>Step 1. The pooling belief fails (consistency check 5).</b> Pricing at "
                f"{i0(post_pool)} assumed that both types issue, but b) shows that only the low type does. A belief that is "
                "contradicted by the behaviour it produces cannot be an equilibrium: rational investors infer that an issuing "
                "firm is the low-value type.",
                f"<b>Step 2. Reprice under the belief that only the low type issues.</b> E[V | issue] = {i0(VL)}, so "
                f"α = {i0(I3)}/({i0(VL)} + {i0(X3)}) = {i0(I3)}/{i0(VL + X3)} = <b>{f(a_sep)}</b> (15/38).",
                "<b>Step 3. Check both types at this price.</b>",
                tbl(
                    ["Type", "Payoff if it issues, (1 − α)(V + 54)", "Value if no issue", "Acts as investors assume?"],
                    [
                        ["Low", f"({fr(1 - a_sep_fr)}) × {i0(VL + X3)} = {f(payL_sep)}", i0(VL), f"Issues {OK}"],
                        ["High", f"({fr(1 - a_sep_fr)}) × {i0(VH + X3)} = {f(payH_dev)}", i0(VH), f"Stays out {OK}"],
                    ],
                    num=(1, 2),
                ),
                f"Both types act as the belief assumes, so the belief is rational: the equilibrium is <b>separating</b>. "
                f"Only the low-value firm issues (at α = {f(a_sep)}) and invests; the high-value firm forgoes the project.",
                f"<b>Step 4. The loss.</b> The low type's shares are now correctly priced, so its old shareholders get exactly "
                f"{i0(VL)} + {i0(NPV3)} = {i0(payL_sep)}: nothing is transferred. The high type walks away from a project "
                f"with NPV {i0(NPV3)}. With full information both types would invest, so the expected loss is "
                f"{f(q, 1)} × {i0(NPV3)} = <b>{f(loss3, 1)}</b>. This is underinvestment caused by adverse selection: "
                "value is destroyed, not moved between groups.",
                f"<b>Check.</b> New investors pay {i0(I3)} for ({fr(a_sep_fr)}) × {i0(VL + X3)} = {f(a_sep * (VL + X3))} {OK}. "
                f"Before the financing decision the firm's shares are worth {f(q, 1)} × {i0(VH)} + {f(1 - q, 1)} × "
                f"{i0(payL_sep)} = {f(pre_value, 1)}, which equals the prior {i0(EV)} plus the NPV actually captured, "
                f"{f(1 - q, 1)} × {i0(NPV3)} = {f((1 - q) * NPV3, 1)} {OK}.",
                f"(Not asked: with these numbers pooling would survive only if investors put at least {pc(q_star, 1)} on the "
                "high type, the prior at which the high type's dilution equals the NPV.)",
            ),
            "criteria": [
                "Answers the consistency question explicitly: no, the pooling belief assumed both types issue but only the low type does. This is consistency check 5; the keys treat stopping at the pooling α as incomplete.",
                f"Reprices with E[V | issue] = 60: α = 45/114 = {f(a_sep)}.",
                f"Checks BOTH types at the new price: low gets 69 > 60 and issues; high would get {f(payH_dev)} < 180 and stays out.",
                "Names the outcome: a separating equilibrium in which only the low-value firm invests.",
                "Expected loss = 0.6 × 9 = 5.4. Says that this is real underinvestment rather than a transfer; calling the separating outcome efficient is a conceptual error.",
                f"Rounding tolerance as in b): {f(1 - a_sep)} × 234 = {f(payH_dev_r)} against the exact {f(payH_dev)} is accepted.",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P(
                f"The high-value firm can buy a perfectly credible certificate proving that its existing assets are worth {i0(VH)}. "
                "The certificate costs K, which is paid by the existing shareholders. Investors see the certificate before they "
                "buy the new shares. What is the maximum K the high-value firm would pay? If the certificate costs "
                f"{i0(K_cert)}, how much of the expected loss in c) is recovered, net of the certificate cost?"
            ),
            "solution": P(
                f"<b>Step 1. Price the certified issue.</b> Investors now know V = {i0(VH)}, so α = {i0(I3)}/({i0(VH)} + "
                f"{i0(X3)}) = {i0(I3)}/{i0(VH + X3)} = <b>{f(a_cert)}</b> (5/26). The existing shareholders keep "
                f"({fr(1 - a_cert_fr)}) × {i0(VH + X3)} = <b>{f(payH_cert)}</b> = {i0(VH)} + {i0(NPV3)}: with correct pricing "
                "they capture the whole NPV.",
                f"<b>Step 2. Maximum price.</b> Without the certificate the high type does not issue and keeps {i0(VH)}. With it, "
                f"the old shareholders get {i0(payH_cert)} − K. They buy it as long as {i0(payH_cert)} − K ≥ "
                f"{i0(VH)}, so <b>K<sub>max</sub> = {i0(K_max)}</b>, exactly the NPV the information problem was destroying.",
                f"<b>Step 3. A certificate that costs {i0(K_cert)}.</b> The high type certifies, issues and invests: "
                f"{i0(payH_cert)} − {i0(K_cert)} = {i0(payH_net)} &gt; {i0(VH)}. Beliefs stay consistent. An uncertified "
                f"issuer must be the low type, since it cannot certify {i0(VH)}: it is priced at α = {f(a_sep)} and still "
                f"gets {i0(payL_sep)}. The high type would get only {f(payH_dev)} by issuing without a certificate, so it "
                f"certifies. The expected loss falls from {f(loss3, 1)} to the cost of the certificates, {f(q, 1)} × "
                f"{i0(K_cert)} = {f(loss_cert, 1)}, so <b>{f(recovered, 1)} of the {f(loss3, 1)} is recovered, net of the certificate cost</b>.",
                f"<b>Check.</b> Expected value created with the certificate: {f(q, 1)} × ({i0(NPV3)} − {i0(K_cert)}) + "
                f"{f(1 - q, 1)} × {i0(NPV3)} = {f(q * (NPV3 - K_cert), 1)} + {f((1 - q) * NPV3, 1)} = {f(value_cert, 1)} = "
                f"{i0(NPV3)} − {f(loss_cert, 1)} {OK}. In c) only {f((1 - q) * NPV3, 1)} was created, so the gain is "
                f"{f(recovered, 1)}.",
            ),
            "criteria": [
                f"Certified issue priced at the true value: α = 45/234 = {f(a_cert)}, so the old shareholders keep 189 = 180 + 9.",
                "Compares with not issuing (180): K_max = 189 − 180 = 9, the project's NPV.",
                "With K = 4 the high type certifies and invests (185 > 180).",
                "Recovered value, net of the certificate cost = 0.6 × (9 − 4) = 3.0; the remaining loss of 2.4 is the resources spent on certificates.",
                "Credit for checking that beliefs remain consistent: an uncertified issuer is the low type, which is unaffected at 69.",
            ],
        },
        {
            "label": "e",
            "points": 4,
            "body": P(
                f"Suppose instead that the firm can raise the {i0(I3)} by issuing debt that promises a repayment F at t = 1 "
                "(there are no taxes and no costs of financial distress). Find F and show which types invest. Briefly explain "
                "what this implies for the order in which firms prefer to raise external funds."
            ),
            "solution": P(
                f"<b>Step 1. The debt is risk-free.</b> Even the low-value firm is worth {i0(VL)} + {i0(X3)} = {i0(VL + X3)} at "
                f"t = 1, more than enough to repay {i0(I3)}. With r<sub>f</sub> = 0 competitive investors lend {i0(I3)} against "
                f"<b>F = {i0(F_debt)}</b>, whatever they believe about the type.",
                f"<b>Step 2. Payoffs.</b> High: {i0(VH)} + {i0(X3)} − {i0(F_debt)} = <b>{i0(payH_debt)}</b> &gt; {i0(VH)}. "
                f"Low: {i0(VL)} + {i0(X3)} − {i0(F_debt)} = <b>{i0(payL_debt)}</b> &gt; {i0(VL)}. <b>Both types invest</b> "
                f"and each keeps exactly V + {i0(NPV3)}: no value is transferred and no NPV is lost, so the outcome matches full "
                "information.",
                "<b>Step 3. Beliefs (consistency check 5).</b> The payoff of risk-free debt does not depend on the type, so "
                "investors need no belief to price it. The low type cannot do better by issuing equity instead: an equity "
                f"issuer would be identified as the low type, priced at α = {f(a_sep)} and left with {i0(payL_sep)}, the "
                "same as with debt.",
                "<b>Interpretation.</b> Debt beats equity because its value is insensitive to the manager's private "
                "information, so selling it transfers little or nothing to new investors, while equity is the claim most "
                "exposed to mispricing. This is the pecking order: internal funds first, then debt, then equity as a last "
                "resort. It is also why the market reads an equity issue as bad news and the share price falls on the announcement.",
            ),
            "criteria": [
                "Shows that the debt is risk-free (114 > 45 even for the low type), so F = 45 at r_f = 0.",
                "Payoffs 189 > 180 and 69 > 60: both types invest and the full NPV is realised.",
                "Explains the mechanism: safe debt is insensitive to private information, so there is no adverse-selection transfer; equity is the most information-sensitive claim.",
                "Names the pecking order: internal funds, then debt, then equity. Credit for adding that an equity issue is bad news and lowers the share price.",
                "Bonus: risky debt would also carry a transfer, but a smaller one than equity.",
            ],
        },
    ],
}

# ===========================================================================
# Exercise 4 · Tax shield, recapitalisation, distress costs (4/4/4/3/3)
# ===========================================================================
EBIT, tau4, rU4, N0, D4, rD4 = 150.0, 0.22, 0.09, 50.0, 400.0, 0.04
FCF4 = EBIT * (1 - tau4)                 # 117
VU4 = FCF4 / rU4                         # 1300
P0_4 = VU4 / N0                          # 26.00
TS4 = tau4 * rD4 * D4                    # 3.52
PVTS4 = TS4 / rD4                        # 88
close(PVTS4, tau4 * D4)
PVTS4_rU = TS4 / rU4                     # feil sats for permanent gjeld
VL4 = VU4 + PVTS4                        # 1388
P1_4 = VL4 / N0                          # 27.76
dP4 = P1_4 - P0_4
close(dP4, PVTS4 / N0)
assets_mid = VU4 + D4 + PVTS4            # 1788
close(assets_mid - D4, VL4)
n4 = D4 / P1_4
N1_4 = N0 - n4
E1_4 = VL4 - D4                          # 988
P2_4 = E1_4 / N1_4
close(P2_4, P1_4)                        # tilbakekjøp til markedspris flytter ikke kursen
n_stale = D4 / P0_4
N1_stale = N0 - n_stale
P_stale = E1_4 / N1_stale
assert abs(P_stale - P1_4) > 0.5         # feil kurs gir en motsigelse
wealth4 = n4 * P1_4 + N1_4 * P2_4
close(wealth4, VL4)
gain_sh4, gain_cr4 = wealth4 - VU4, 0.0
close(gain_sh4 + gain_cr4, PVTS4)        # konsistenssjekk 3
int4 = rD4 * D4                          # 16
NI4 = (EBIT - int4) * (1 - tau4)         # 104.52
DPS0_4 = FCF4 / N0                       # 2.34
DPS1_4 = NI4 / N1_4
rE4 = DPS1_4 / P2_4
close(rE4, NI4 / E1_4)
close(DPS0_4 / P0_4, rU4)
rE4_perm = rU4 + (D4 / E1_4) * (1 - tau4) * (rU4 - rD4)
close(rE4, rE4_perm)
rE4_sheet = rU4 + (D4 / E1_4) * (rU4 - rD4)          # formelarkets MM II, feil for permanent gjeld
wE4, wD4 = E1_4 / VL4, D4 / VL4
wacc4 = wE4 * rE4 + wD4 * rD4 * (1 - tau4)
close(FCF4 / wacc4, VL4)                 # WACC gjenskaper V^L
wacc4_bad = wE4 * rE4_sheet + wD4 * rD4 * (1 - tau4)
V_bad4 = FCF4 / wacc4_bad
assert abs(V_bad4 - VL4) > 10
# Plan B
D4b, p_fd, C_fd = 800.0, 0.30, 400.0
PVTS4b = tau4 * D4b
PVFD4b = p_fd * C_fd
VL4b = VU4 + PVTS4b - PVFD4b
P1_4b = VL4b / N0
assert P1_4b < P1_4 and P1_4b > P0_4
marg_ts = tau4 * (D4b - D4)
marg_fd = PVFD4b - 0.0
destroyed = marg_fd - marg_ts
close(destroyed, VL4 - VL4b)
close(destroyed / N0, P1_4 - P1_4b)
p_star = marg_ts / C_fd

ex4 = {
    "n": 4,
    "title": "Capital Structure",
    "points": 18,
    "topic": "Interest tax shield, recapitalisation, distress costs",
    "chapters": [6, 7, 8, 15],
    "body": P(
        f"Hallingdal Cement ASA is an all-equity firm with {i0(N0)} million shares outstanding. It generates EBIT of "
        f"{i0(EBIT)} million NOK every year in perpetuity. Depreciation equals capital expenditure, working capital does not "
        f"change and all earnings are paid out as dividends at the end of each year. The corporate tax rate is {pc(tau4, 0)} "
        f"and the unlevered cost of capital is {pc(rU4, 0)}. Investors currently expect the firm to remain all-equity financed.",
        f"The board plans to announce that the firm will borrow {i0(D4)} million NOK and use the proceeds to repurchase "
        f"shares. The debt is risk-free with an interest rate of {pc(rD4, 0)}. It is permanent: the firm will pay interest "
        "only and has no plans to change the amount of debt. At this debt level there are no costs of financial distress. "
        "Apart from corporate taxes, capital markets are perfect. Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 4,
            "body": P(
                "What are the value of the firm and its share price today? What is the present value of the interest tax "
                "shield created by the plan? State which rate you discount it at and why."
            ),
            "solution": P(
                f"<b>Step 1. The unlevered firm.</b> FCF = EBIT(1 − τ<sub>c</sub>) = {i0(EBIT)} × {f(1 - tau4, 2)} = "
                f"<b>{i0(FCF4)}</b> per year, since depreciation equals capital expenditure and working capital does not change. "
                f"V<sup>U</sup> = {i0(FCF4)}/{f(rU4, 2)} = <b>{i0(VU4)} million NOK</b> and P<sub>0</sub> = {i0(VU4)}/{i0(N0)} = "
                f"<b>NOK {f(P0_4, 2)}</b>.",
                f"<b>Step 2. The annual tax shield.</b> TS = τ<sub>c</sub> × r<sub>D</sub> × D = {f(tau4, 2)} × "
                f"{f(rD4, 2)} × {i0(D4)} = <b>{f(TS4, 2)}</b> per year, forever.",
                "<b>Step 3. The rate and the present value.</b> The debt is a fixed, permanent amount, so the shield is as "
                "safe as the interest payments and is discounted at r<sub>D</sub> = "
                f"{pc(rD4, 0)}, not at r<sub>U</sub>: PV(TS) = {f(TS4, 2)}/{f(rD4, 2)} = τ<sub>c</sub> × D = "
                f"{f(tau4, 2)} × {i0(D4)} = <b>{i0(PVTS4)} million NOK</b>.",
                f"<b>Note.</b> Discounting the same {f(TS4, 2)} at r<sub>U</sub> would give {f(PVTS4_rU)}. That is the value "
                "under a policy of rebalancing to a constant debt ratio, which is not this firm's policy.",
            ),
            "criteria": [
                "FCF = EBIT(1 − τ_c) = 117; V^U = 117/0.09 = 1300; P0 = 1300/50 = 26.00.",
                "TS = 0.22 × 0.04 × 400 = 3.52 per year.",
                "States the policy and the rate: fixed permanent debt, so the shield is discounted at r_D, giving PV(TS) = τ_c × D = 88.",
                f"Discounting at r_U ({f(PVTS4_rU)}) belongs to debt rebalanced to a constant ratio. Naming the assumption earns credit on its own.",
            ],
        },
        {
            "label": "b",
            "points": 4,
            "body": P(
                "What happens to the share price when the plan is announced? Show the market value balance sheet just after "
                "the debt is issued, before any shares are repurchased. Who captures the value of the tax shield?"
            ),
            "solution": P(
                f"<b>Step 1. The announcement.</b> The market prices the tax shield as soon as the plan is credible. No shares "
                f"have been bought yet, so the whole {i0(PVTS4)} accrues to the {i0(N0)} million existing shares: "
                f"P<sub>1</sub> = ({i0(VU4)} + {i0(PVTS4)})/{i0(N0)} = {i0(VL4)}/{i0(N0)} = <b>NOK {f(P1_4, 2)}</b>, a rise of "
                f"{i0(PVTS4)}/{i0(N0)} = <b>{f(dP4, 2)}</b> per share.",
                "<b>Step 2. Balance sheet after the debt issue, before the repurchase.</b>",
                tbl(
                    ["Assets", "Value", "Liabilities and equity", "Value"],
                    [
                        ["Operating assets, V<sup>U</sup>", i0(VU4), "Debt", i0(D4)],
                        ["Cash from the debt issue", i0(D4), "Equity", i0(VL4)],
                        ["PV(TS)", i0(PVTS4), "", ""],
                        ["<b>Total</b>", f"<b>{i0(assets_mid)}</b>", "<b>Total</b>", f"<b>{i0(assets_mid)}</b>"],
                    ],
                    num=(1, 3),
                ),
                f"Equity per share is still {i0(VL4)}/{i0(N0)} = {f(P1_4, 2)}: issuing the debt itself moves nothing.",
                f"<b>Step 3. Who gains.</b> The lenders pay {i0(D4)} for debt worth {i0(D4)}, a zero-NPV deal, so they capture "
                f"none of the shield. The whole {i0(PVTS4)} goes to the shareholders who own the firm when the plan is "
                "announced, both those who will later sell and those who will keep their shares.",
            ),
            "criteria": [
                "The price jumps on ANNOUNCEMENT, not at the repurchase: P1 = 1388/50 = 27.76, up 1.76 = 88/50.",
                "Balance sheet: operating assets 1300 + cash 400 + PV(TS) 88 = 1788 against debt 400 and equity 1388.",
                "The lenders get zero NPV; the existing shareholders capture all of PV(TS).",
                "Dividing by a share count that has already been reduced is a classic error: no shares have been repurchased yet.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P("How many shares does the firm repurchase? What is the share price after the repurchase?"),
            "solution": P(
                f"<b>Step 1. Shares repurchased.</b> The repurchase executes at the post-announcement price: n = "
                f"{i0(D4)}/{f(P1_4, 2)} = <b>{f(n4)} million shares</b>, leaving {i0(N0)} − {f(n4)} = <b>{f(N1_4)} million</b>.",
                f"<b>Step 2. The price after the repurchase.</b> The cash has left the firm, so equity = {i0(VU4)} + {i0(PVTS4)} "
                f"− {i0(D4)} = <b>{i0(E1_4)}</b> and P = {i0(E1_4)}/{f(N1_4)} = <b>NOK {f(P2_4, 2)}</b>, unchanged. Buying "
                "shares at their fair price is a zero-NPV transaction.",
                f"<b>Check.</b> The original shareholders hold {f(n4)} × {f(P1_4, 2)} = {i0(n4 * P1_4)} in cash plus "
                f"{f(N1_4)} × {f(P2_4, 2)} = {i0(N1_4 * P2_4)} in shares, {i0(wealth4)} in total against {i0(VU4)} before: "
                f"a gain of <b>{i0(gain_sh4)}</b> = PV(TS). The creditors gain 0, so creditors' gain + shareholders' gain = "
                f"0 + {i0(gain_sh4)} = {i0(PVTS4)}, the value the recapitalisation creates (consistency check 3) {OK}. "
                f"The check that can fail is the price: repurchasing at the stale {f(P0_4, 2)} buys {i0(D4)}/{f(P0_4, 2)} = "
                f"{f(n_stale)} million shares and leaves {f(N1_stale)} million worth {i0(E1_4)}/{f(N1_stale)} = {f(P_stale)} "
                "each, a second price for the same share after one transaction.",
            ),
            "criteria": [
                f"Repurchases at the post-announcement price 27.76: n = 400/27.76 = {f(n4)} million, leaving {f(N1_4)} million shares.",
                f"Price after the repurchase: 988/{f(N1_4)} = 27.76, unchanged, because the repurchase is zero NPV.",
                f"Using the old price 26.00 ({f(n_stale)} million shares) is the classic error and produces an impossible second price of {f(P_stale)}.",
                "Check: the original shareholders end with 400 of cash + 988 of shares = 1388, a gain of 88 = PV(TS); the creditors gain nothing.",
            ],
        },
        {
            "label": "d",
            "points": 3,
            "body": P(
                "What is the dividend per share after the recapitalisation? What is the new equity cost of capital? "
                "(Hint: the firm still pays out all its earnings every year, so each share is a level perpetuity. Compute "
                "r<sub>E</sub> from the dividend and the share price.)"
            ),
            "solution": P(
                f"<b>Step 1. The new dividend.</b> Interest = {f(rD4, 2)} × {i0(D4)} = {i0(int4)}, so net income = "
                f"({i0(EBIT)} − {i0(int4)})(1 − {f(tau4, 2)}) = {i0(EBIT - int4)} × {f(1 - tau4, 2)} = "
                f"<b>{f(NI4, 2)}</b>, all paid out over {f(N1_4)} million shares: DPS = {f(NI4, 2)}/{f(N1_4)} = "
                f"<b>NOK {f(DPS1_4)}</b>, up from {i0(FCF4)}/{i0(N0)} = {f(DPS0_4, 2)} before the recapitalisation.",
                f"<b>Step 2. The cost of equity.</b> The share is a level perpetuity of {f(DPS1_4)} priced at {f(P2_4, 2)}, so "
                f"r<sub>E</sub> = {f(DPS1_4)}/{f(P2_4, 2)} = <b>{pc(rE4)}</b> (equivalently {f(NI4, 2)}/{i0(E1_4)}). Before the "
                f"recapitalisation it was {f(DPS0_4, 2)}/{f(P0_4, 2)} = {pc(rU4, 0)} = r<sub>U</sub>.",
                "The same number follows from MM II for permanent debt with taxes, r<sub>E</sub> = r<sub>U</sub> + "
                "(D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>) = "
                f"{f(rU4, 2)} + ({i0(D4)}/{i0(E1_4)})({f(1 - tau4, 2)})({f(rU4 - rD4, 2)}) = {pc(rE4)}. The formula-sheet "
                "version without (1 − τ<sub>c</sub>) assumes debt rebalanced to a constant ratio and would give "
                f"{pc(rE4_sheet)} here.",
                f"<b>Check.</b> After-tax WACC = ({i0(E1_4)}/{i0(VL4)})({f(rE4, 6)}) + ({i0(D4)}/{i0(VL4)})({f(rD4, 2)})"
                f"({f(1 - tau4, 2)}) = {f(wE4 * rE4, 6)} + {f(wD4 * rD4 * (1 - tau4), 6)} = {pc(wacc4)}. Then "
                f"{i0(FCF4)}/{f(wacc4, 6)} = <b>{i0(VL4)}</b> = V<sup>L</sup> {OK}. The firm is a level perpetuity with fixed "
                f"debt, so D/V stays at {i0(D4)}/{i0(VL4)} every year and the WACC must reproduce the levered value. With "
                f"r<sub>E</sub> = {pc(rE4_sheet)} it would give {f(V_bad4, 2)}, so this check catches the wrong formula.",
            ),
            "criteria": [
                f"Interest 16; net income (150 − 16)(0.78) = 104.52; divides by the REDUCED share count {f(N1_4)}: DPS = {f(DPS1_4)} (up from 2.34).",
                f"r_E = DPS/P = {f(DPS1_4)}/27.76 = {pc(rE4)}, or equivalently 104.52/988.",
                f"Split credit: the DPS earns about half of the 3 points. The correct DPS combined with r_E = {pc(rE4_sheet)} from the formula-sheet MM II earns only the DPS part: that formula assumes debt rebalanced to a constant ratio and is inconsistent with the dividend and the price here.",
                f"The permanent-debt form r_U + (D/E)(1 − τ_c)(r_U − r_D) = {pc(rE4)} is accepted.",
                f"Check: the after-tax WACC of {pc(wacc4)} reproduces V^L = 117/{f(wacc4, 6)} = 1388.",
            ],
        },
        {
            "label": "e",
            "points": 3,
            "body": P(
                f"The CFO proposes instead to borrow {i0(D4b)} million NOK (also permanent, with the proceeds used for a "
                f"repurchase). At that level analysts estimate a {pc(p_fd, 0)} probability of financial distress, which would "
                f"cost the firm {i0(C_fd)} million NOK in present value terms. Treat the tax shield as τ<sub>c</sub> × D "
                "at both debt levels. Which plan gives the higher share price on announcement? Briefly explain who bears the "
                "expected cost of financial distress, given that it is the creditors who take over the firm in distress."
            ),
            "solution": P(
                f"<b>Step 1. Value under the larger plan.</b> PV(FD) = {f(p_fd, 2)} × {i0(C_fd)} = <b>{i0(PVFD4b)}</b>. "
                f"V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(FD) = {i0(VU4)} + {f(tau4, 2)} × {i0(D4b)} − "
                f"{i0(PVFD4b)} = {i0(VU4)} + {i0(PVTS4b)} − {i0(PVFD4b)} = <b>{i0(VL4b)}</b>, so the announcement price is "
                f"{i0(VL4b)}/{i0(N0)} = <b>NOK {f(P1_4b, 2)}</b>, against {f(P1_4, 2)} for the {i0(D4)} plan.",
                f"<b>Step 2. The margin.</b> The extra {i0(D4b - D4)} of debt adds {f(tau4, 2)} × {i0(D4b - D4)} = "
                f"{i0(marg_ts)} of tax shield but {i0(marg_fd)} of expected distress costs, so it destroys {i0(destroyed)} "
                f"({f(destroyed / N0, 2)} per share). <b>The {i0(D4)} plan is better.</b> The larger plan would only match it "
                f"if PV(FD) were at most {i0(marg_ts)}, a distress probability of {pc(p_star, 0)}. (It still beats staying "
                f"all-equity at {f(P0_4, 2)}.)",
                "<b>Step 3. Who bears the cost.</b> Creditors anticipate the distress costs and pay less for the debt (or "
                "demand a higher promised rate), so the firm raises less for the same promises and the shortfall falls on the "
                "shareholders. Ex post the costs hit the creditors; ex ante the shareholders bear them in full, which is why "
                "the share price already reflects them at the announcement.",
                f"<b>Check.</b> The creditors' gain is 0 under both plans, so the shareholders' gain equals the value created: "
                f"{i0(VL4b)} − {i0(VU4)} = {i0(VL4b - VU4)} under the larger plan against {i0(PVTS4)} under the smaller one "
                f"(consistency check 3) {OK}.",
            ),
            "criteria": [
                "PV(FD) = 0.30 × 400 = 120; V^L = 1300 + 176 − 120 = 1356; P = 27.12.",
                "Compares with 27.76 and concludes that the 400 plan is better: the marginal shield of 88 is smaller than the marginal distress cost of 120.",
                "Verbal part: creditors price the expected cost into the debt, so the shareholders bear it ex ante even though the creditors bear it ex post. Minimal accepted answer: the shareholders, because the debt is fairly priced.",
                "Credit for naming the trade-off theory: borrow while the marginal tax shield exceeds the marginal expected distress cost.",
            ],
        },
    ],
}

# ===========================================================================
# Exercise 5 · Binomial option pricing, put-call parity (4/5/4/4/3)
# ===========================================================================
S0, Su, Sd, rf5, K5, p_real, P_quote = 62.0, 80.0, 50.0, 0.03, 68.0, 0.70, 8.90
assert Sd < (1 + rf5) * S0 < Su
rho = ((1 + rf5) * S0 - Sd) / (Su - Sd)
close(rho, 0.462)
close((rho * Su + (1 - rho) * Sd) / (1 + rf5), S0)
ER_real = (p_real * Su + (1 - p_real) * Sd) / S0 - 1
assert rho < p_real
Cu, Cd = max(Su - K5, 0), max(Sd - K5, 0)
Delta = (Cu - Cd) / (Su - Sd)
B = (Cd - Sd * Delta) / (1 + rf5)
C5 = S0 * Delta + B
close(C5, (rho * Cu + (1 - rho) * Cd) / (1 + rf5))
close(Delta * Su + B * (1 + rf5), Cu)
close(Delta * Sd + B * (1 + rf5), Cd)
C_wrong = S0 * Delta - Sd * Delta                    # glemt å diskontere B
Pu, Pd = max(K5 - Su, 0), max(K5 - Sd, 0)
P5 = (rho * Pu + (1 - rho) * Pd) / (1 + rf5)
PVK = K5 / (1 + rf5)
close(C5 + PVK, P5 + S0)                             # put-call-paritet (ekte sjekk)
DeltaP = (Pu - Pd) / (Su - Sd)
BP = (Pd - Sd * DeltaP) / (1 + rf5)
close(S0 * DeltaP + BP, P5)
close(Delta - DeltaP, 1.0)
# Arbitrasje: put notert for lavt
assert P_quote < P5
cf0 = -S0 - P_quote + C5 + PVK
close(cf0, P5 - P_quote)
for S in (Su, Sd):
    close(S + max(K5 - S, 0) - max(S - K5, 0) - K5, 0.0)
# Alternativ: kjøp put, selg dens replikerende portefølje
cf0_alt = -P_quote - (-DeltaP) * S0 + BP
close(cf0_alt, cf0)
for S in (Su, Sd):
    close(max(K5 - S, 0) + (-DeltaP) * S - BP * (1 + rf5), 0.0)
# Egenkapital som kjøpsopsjon
E5 = C5
D5 = S0 - E5
close(D5, PVK - P5)
y5 = K5 / D5 - 1
# Risk shifting: samme verdi i dag, større spredning
Su2, Sd2 = 90.0, 40.0
rho2 = ((1 + rf5) * S0 - Sd2) / (Su2 - Sd2)
close((rho2 * Su2 + (1 - rho2) * Sd2) / (1 + rf5), S0)
E5r = rho2 * max(Su2 - K5, 0) / (1 + rf5)
P5r = (1 - rho2) * max(K5 - Sd2, 0) / (1 + rf5)
D5r = S0 - E5r
close(E5r - P5r, S0 - PVK)                         # paritet: C − P uendret når V er uendret
shift = E5r - E5
close(shift, D5 - D5r)
close(shift, P5r - P5)
assert shift > 0

ex5 = {
    "n": 5,
    "title": "Options",
    "points": 20,
    "topic": "Binomial option pricing, put-call parity",
    "chapters": [21, 22, 24],
    "body": P(
        f"Salmon Growth Unlimited (SGU) trades at NOK {i0(S0)} per share. In one year the share price will be either "
        f"NOK {i0(Su)} or NOK {i0(Sd)}. The one-year risk-free rate is {pc(rf5, 0)}. This uncertainty is the only factor "
        "affecting the share price, so the observed prices are fair. SGU pays no dividends. Analysts estimate that the "
        f"probability of the high price is {pc(p_real, 0)}.",
        f"Consider one-year European call and put options on SGU, both with a strike price of NOK {i0(K5)}. "
        "Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 3,
            "body": P(
                "Find the risk-neutral probabilities of the high and the low state. Why do you not need the analysts' "
                f"estimate of {pc(p_real, 0)}?"
            ),
            "solution": P(
                f"<b>Step 1. Check the tree.</b> {i0(Sd)} &lt; {i0(S0)} × {f(1 + rf5, 2)} = {f((1 + rf5) * S0, 2)} &lt; "
                f"{i0(Su)}, so neither the share nor the risk-free asset dominates the other.",
                f"<b>Step 2. The risk-neutral probability.</b> ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/"
                f"(S<sub>u</sub> − S<sub>d</sub>) = ({f((1 + rf5) * S0, 2)} − {i0(Sd)})/({i0(Su)} − {i0(Sd)}) = "
                f"{f((1 + rf5) * S0 - Sd, 2)}/{i0(Su - Sd)} = <b>{f(rho)}</b>. Then 1 − ρ = <b>{f(1 - rho)}</b>.",
                f"<b>Check.</b> ρ must price the share: ({f(rho, 3)} × {i0(Su)} + {f(1 - rho, 3)} × {i0(Sd)})/"
                f"{f(1 + rf5, 2)} = ({f(rho * Su, 2)} + {f((1 - rho) * Sd, 2)})/{f(1 + rf5, 2)} = "
                f"{f(rho * Su + (1 - rho) * Sd, 2)}/{f(1 + rf5, 2)} = {f(S0, 2)} {OK}",
                "<b>Why not the analysts' probability.</b> An option can be replicated exactly, state by state, with shares "
                "and risk-free borrowing, so its price cannot depend on how likely the states are. The market's beliefs and "
                f"risk aversion are already inside the share price of {i0(S0)}. ρ is the weight that makes the share earn "
                f"exactly r<sub>f</sub>; it lies below {pc(p_real, 0)} because investors demand a risk premium (with "
                f"{pc(p_real, 0)} the share's expected return is {pc(ER_real)}).",
            ),
            "criteria": [
                f"ρ = (1.03 × 62 − 50)/(80 − 50) = {f(rho)}; 1 − ρ = {f(1 - rho)}.",
                "Credit for checking that ρ reprices the share: (0.462 × 80 + 0.538 × 50)/1.03 = 62.",
                "Explains why the real probability is irrelevant: exact replication in every state, with the beliefs and the risk premium already in S0. ρ is a pricing weight, not a forecast.",
                "Using 70% together with the risk-free rate is the classic error in this material.",
            ],
        },
        {
            "label": "b",
            "points": 5,
            "body": P(
                "Find the price of the call by constructing a portfolio of Δ shares and an amount B in the risk-free asset "
                "that replicates the call's payoff. Show that the portfolio replicates the call in both states."
            ),
            "solution": P(
                f"<b>Step 1. Payoffs.</b> C<sub>u</sub> = max({i0(Su)} − {i0(K5)}, 0) = {i0(Cu)} and C<sub>d</sub> = "
                f"max({i0(Sd)} − {i0(K5)}, 0) = {i0(Cd)}.",
                f"<b>Step 2. Hedge ratio.</b> Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) = "
                f"{i0(Cu)}/{i0(Su - Sd)} = <b>{f(Delta)}</b> shares.",
                f"<b>Step 3. Borrowing.</b> B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>) = ({i0(Cd)} − "
                f"{i0(Sd)} × {f(Delta, 1)})/{f(1 + rf5, 2)} = {f(-Sd * Delta, 0)}/{f(1 + rf5, 2)} = <b>{f(B)}</b>: borrow "
                f"{f(-B)} today and repay {f(-B * (1 + rf5), 2)} in one year.",
                f"<b>Step 4. Price.</b> C = S<sub>0</sub>Δ + B = {i0(S0)} × {f(Delta, 1)} − {f(-B)} = "
                f"{f(S0 * Delta, 2)} − {f(-B)} = <b>NOK {f(C5)}</b>.",
                "<b>Step 5. Verify the replication.</b>",
                tbl(
                    ["State", f"{f(Delta, 1)} shares", "Repay the loan", "Portfolio", "Call payoff"],
                    [
                        [f"High (S = {i0(Su)})", f(Delta * Su, 2), f(B * (1 + rf5), 2), f(Delta * Su + B * (1 + rf5), 2), f(Cu, 2)],
                        [f"Low (S = {i0(Sd)})", f(Delta * Sd, 2), f(B * (1 + rf5), 2), f(Delta * Sd + B * (1 + rf5), 2), f(Cd, 2)],
                    ],
                    num=(1, 2, 3, 4),
                ),
                f"<b>Check.</b> Risk-neutral valuation gives the same price: {f(rho, 3)} × {i0(Cu)}/{f(1 + rf5, 2)} = "
                f"{f(rho * Cu, 3)}/{f(1 + rf5, 2)} = {f(C5)} {OK}",
            ),
            "criteria": [
                f"Δ = 12/30 = {f(Delta)}, a ratio of differences (not C_u/S_u).",
                f"B = −20/1.03 = {f(B)}: the replicating portfolio borrows. Using −20 without discounting gives {f(C_wrong, 2)}, the classic error.",
                f"C = 24.80 − {f(-B)} = {f(C5)}.",
                "Shows that the portfolio pays 12 and 0 in the two states, exactly the call's payoffs. The question asks for this explicitly.",
                f"Credit for confirming with ρ: 0.462 × 12/1.03 = {f(C5)}.",
            ],
        },
        {
            "label": "c",
            "points": 4,
            "body": P(
                "Find the price of the put using the risk-neutral probabilities. Verify that your call and put prices "
                "satisfy put-call parity."
            ),
            "solution": P(
                f"<b>Step 1. Put payoffs.</b> P<sub>u</sub> = max({i0(K5)} − {i0(Su)}, 0) = {i0(Pu)} and P<sub>d</sub> = "
                f"max({i0(K5)} − {i0(Sd)}, 0) = {i0(Pd)}.",
                f"<b>Step 2. Price.</b> P = (ρ × {i0(Pu)} + (1 − ρ) × {i0(Pd)})/{f(1 + rf5, 2)} = "
                f"{f(1 - rho, 3)} × {i0(Pd)}/{f(1 + rf5, 2)} = {f((1 - rho) * Pd, 3)}/{f(1 + rf5, 2)} = <b>NOK {f(P5)}</b>.",
                f"<b>Step 3. Put-call parity.</b> PV(K) = {i0(K5)}/{f(1 + rf5, 2)} = {f(PVK)}. C + PV(K) = {f(C5)} + {f(PVK)} = "
                f"{f(C5 + PVK)} and P + S<sub>0</sub> = {f(P5)} + {i0(S0)} = {f(P5 + S0)} {OK} Equivalently C − P = "
                f"{f(C5 - P5)} = S<sub>0</sub> − PV(K).",
                "<b>Check.</b> This is a genuine check: the call came from replication and the put from ρ with a different "
                "payoff vector; parity was used for neither. It would catch a wrong discounting of the strike or a sign "
                f"error. The put can also be replicated: Δ<sub>P</sub> = ({i0(Pu)} − {i0(Pd)})/{i0(Su - Sd)} = "
                f"{f(DeltaP, 1)} and B<sub>P</sub> = ({i0(Pd)} + {i0(Sd)} × {f(-DeltaP, 1)})/{f(1 + rf5, 2)} = {f(BP)}, "
                f"so P = {f(DeltaP, 1)} × {i0(S0)} + {f(BP)} = {f(P5)} {OK}",
            ),
            "criteria": [
                f"P_u = 0, P_d = 18, P = 0.538 × 18/1.03 = {f(P5)}.",
                f"Parity stated correctly: C + PV(K) = P + S0, with PV(K) = 68/1.03 = {f(PVK)}.",
                f"Both sides equal {f(C5 + PVK)} (or C − P = S0 − PV(K) = {f(C5 - P5)}).",
                "Parity is not on the formula sheet and must be written from memory. Credit for stating its assumptions: European options, same strike and maturity, no dividends.",
            ],
        },
        {
            "label": "d",
            "points": 4,
            "body": P(
                f"A dealer offers to sell you the put for NOK {f(P_quote, 2)}. The share trades at NOK {i0(S0)} and the call at "
                "the price you found in b). Describe an arbitrage strategy. Show its cash flows today and in both states in one year."
            ),
            "solution": P(
                f"<b>Step 1. Which side is cheap.</b> At {f(P_quote, 2)} the put is below its fair value of {f(P5)}. The "
                f"protective put (share + put) costs {i0(S0)} + {f(P_quote, 2)} = {f(S0 + P_quote, 2)}, while the fiduciary call "
                f"(call + PV(K)) costs {f(C5 + PVK)}. Both pay max(S<sub>T</sub>, {i0(K5)}) in one year. Buy the cheap "
                "portfolio and sell the expensive one.",
                "<b>Step 2. The trades.</b>",
                tbl(
                    ["Transaction", "Today", f"High (S = {i0(Su)})", f"Low (S = {i0(Sd)})"],
                    [
                        ["Buy one share", f(-S0, 2), "+" + f(Su, 2), "+" + f(Sd, 2)],
                        [f"Buy one put at {f(P_quote, 2)}", f(-P_quote, 2), f(Pu, 2), "+" + f(Pd, 2)],
                        ["Write one call", "+" + f(C5), f(-Cu, 2), f(Cd, 2)],
                        [f"Borrow PV(K) at {pc(rf5, 0)}", "+" + f(PVK), f(-K5, 2), f(-K5, 2)],
                        ["<b>Net</b>", f"<b>+{f(cf0)}</b>", f"<b>{f(Su + Pu - Cu - K5, 2)}</b>", f"<b>{f(Sd + Pd - Cd - K5, 2)}</b>"],
                    ],
                    num=(1, 2, 3),
                ),
                f"You receive {f(cf0)} today and owe nothing in either state: a riskless profit.",
                f"<b>Check.</b> The profit today equals the mispricing: {f(P5)} − {f(P_quote, 2)} = {f(P5 - P_quote)} {OK} "
                "An equivalent trade buys the put and sells its replicating portfolio, that is buys "
                f"{f(-DeltaP, 1)} shares and borrows {f(BP)}, for the same {f(cf0_alt)} today.",
            ),
            "criteria": [
                f"Identifies the put as underpriced ({f(P_quote, 2)} against {f(P5)}) and buys it: buy cheap, sell dear.",
                f"A complete strategy: buy the share and the put, write the call, borrow PV(K) = {f(PVK)} (or buy the put against its replicating portfolio).",
                f"Shows the cash flows: +{f(cf0)} today and exactly 0 in both states.",
                f"Checks that the profit equals the mispricing of {f(P5 - P_quote)}. Buying the expensive side gives a loss today, the usual sign error.",
            ],
        },
        {
            "label": "e",
            "points": 4,
            "body": P(
                "Now let the same tree describe the total assets of a firm rather than a share: the assets are worth "
                f"{i0(S0)} today and will be worth {i0(Su)} or {i0(Sd)} in one year. The firm has zero-coupon debt with a face "
                f"value of {i0(K5)} due in one year. Using your results, what are the market values of the firm's equity and "
                "debt? Briefly explain what the put represents for the creditors and why the shareholders would gain if the "
                f"firm's assets became riskier while their value today stayed at {i0(S0)}."
            ),
            "solution": P(
                f"<b>Equity is a call.</b> The shareholders receive max(V − {i0(K5)}, 0): {i0(Cu)} in the high state and "
                f"{i0(Cd)} in the low state, exactly the call. E = <b>{f(E5)}</b>.",
                f"<b>Debt.</b> D = V − E = {i0(S0)} − {f(E5)} = <b>{f(D5)}</b>. Equivalently D = PV(K) − P = "
                f"{f(PVK)} − {f(P5)} = {f(D5)} {OK}",
                "<b>What the put is.</b> With limited liability the shareholders can hand over the assets instead of paying "
                f"{i0(K5)} when the assets are worth less: in the low state they deliver {i0(Sd)} and the creditors lose "
                f"{i0(K5 - Sd)}. The creditors have in effect written this put to the shareholders: risky debt = risk-free "
                f"debt minus a put on the firm's assets. The put's value of {f(P5)} is the discount the creditors require for "
                f"default risk, which shows up as a promised yield of {i0(K5)}/{f(D5)} − 1 = {pc(y5, 2)} against "
                f"{pc(rf5, 0)}.",
                "<b>Why the shareholders like risk.</b> Equity is a call. A call gains from a wider spread of outcomes "
                "because its payoff is cut off at zero. The creditors' written put gains by exactly the same amount, since "
                "parity fixes C \u2212 P = V \u2212 PV(K) when V is unchanged, so riskier assets move value from the "
                "creditors to the shareholders without creating any: this is risk shifting (asset substitution).",
                f"<b>Illustration (not required).</b> With the same value of {i0(S0)} but outcomes of {i0(Su2)} or {i0(Sd2)}: "
                f"\u03c1 = ({f((1 + rf5) * S0, 2)} \u2212 {i0(Sd2)})/{i0(Su2 - Sd2)} = {f(rho2)}, equity = {f(rho2)} \u00d7 "
                f"{i0(Su2 - K5)}/{f(1 + rf5, 2)} = {f(E5r)} and debt = {i0(S0)} \u2212 {f(E5r)} = {f(D5r)}. The shareholders "
                f"gain {f(shift)} and the creditors lose the same {f(shift)} {OK}",
            ),
            "criteria": [
                f"Equity = max(V − 68, 0), the call: E = {f(E5)}.",
                f"D = 62 − {f(E5)} = {f(D5)}, or PV(K) − P = {f(PVK)} − {f(P5)} = {f(D5)}.",
                "Explains the put: the shareholders' limited-liability option to default, written by the creditors; risky debt = risk-free debt minus the put.",
                "Required: explains why the shareholders gain from riskier assets. Equity is a call whose payoff is cut off at zero; the creditors' put rises by the same amount, so value is transferred rather than created: risk shifting or asset substitution.",
                f"Bonus: the promised yield 68/{f(D5)} − 1 = {pc(y5, 2)} against r_f = 3%, or a numerical illustration of the transfer.",
            ],
        },
    ],
}

# ===========================================================================
# Exercise 6 · WACC and APV for a project with debt capacity (4/3/5/5/3)
# ===========================================================================
rf6, rm6, bE6, bD6, E6, Dfirm6, tau6 = 0.04, 0.09, 1.6, 0.3, 240.0, 160.0, 0.22
I6, F6 = 100.0, [4.0, 40.0, 56.0, 32.0]
mrp6 = rm6 - rf6
rD6 = rf6 + bD6 * mrp6
rE6 = rf6 + bE6 * mrp6
V6 = E6 + Dfirm6
wE6, d6 = E6 / V6, Dfirm6 / V6
rU6 = wE6 * rE6 + d6 * rD6
bU6 = wE6 * bE6 + d6 * bD6
close(rf6 + bU6 * mrp6, rU6)                          # konsistenssjekk 2 (identitet her)
wacc6 = wE6 * rE6 + d6 * rD6 * (1 - tau6)
close(wacc6, rU6 - d6 * tau6 * rD6)
T6 = len(F6)
VLt = [0.0] * (T6 + 1)
for t in range(T6 - 1, -1, -1):
    VLt[t] = (F6[t] + VLt[t + 1]) / (1 + wacc6)
pv_wacc = [F6[t] / (1 + wacc6) ** (t + 1) for t in range(T6)]
close(sum(pv_wacc), VLt[0])
NPV6 = VLt[0] - I6
assert NPV6 > 0
Dt = [d6 * v for v in VLt]
dD = [Dt[t + 1] - Dt[t] for t in range(T6)]          # endring i år t+1
close(sum(dD), -Dt[0])
assert dD[0] > 0 and all(x < 0 for x in dD[1:])
close(VLt[0] * (1 + wacc6) - F6[0], VLt[1])
growth0 = VLt[0] * wacc6
assert growth0 > F6[0]
pv_u = [F6[t] / (1 + rU6) ** (t + 1) for t in range(T6)]
VU6 = sum(pv_u)
TS6 = [tau6 * rD6 * Dt[t] for t in range(T6)]         # TS_{t+1} = τ rD D_t
pvts_rU = [TS6[t] / (1 + rU6) ** (t + 1) for t in range(T6)]
PVTS6 = sum(pvts_rU)
APV6 = VU6 + PVTS6
close(APV6, VLt[0])                                    # konsistenssjekk 1 (fast punkt)
NPVu6 = VU6 - I6
close(NPVu6 + PVTS6, NPV6)
pvts_rD = [TS6[t] / (1 + rD6) ** (t + 1) for t in range(T6)]
PVTS6_rD = sum(pvts_rD)
PVTS6_ME = sum(TS6[t] / ((1 + rU6) ** t * (1 + rD6)) for t in range(T6))   # første år til r_D
assert PVTS6_ME > PVTS6
APV6_rD = VU6 + PVTS6_rD
assert PVTS6_rD > PVTS6 and abs(APV6_rD - VLt[0]) > 0.01

ex6 = {
    "n": 6,
    "title": "Valuation with leverage",
    "points": 20,
    "topic": "WACC and APV",
    "chapters": [4, 17, 18, 19],
    "body": P(
        "Hardanger Logistics ASA is considering a project with the same risk as the firm as a whole. The market value of "
        f"the firm's equity is {i0(E6)} million NOK and the market value of its debt is {i0(Dfirm6)} million NOK. The firm "
        "maintains a constant debt-to-equity ratio and will keep that ratio when it takes on the project. Its equity beta "
        f"is {f(bE6, 1)} and its debt beta is {f(bD6, 1)}, because the firm's debt carries some systematic risk. The "
        f"risk-free rate is {pc(rf6, 0)}, the expected return on the market portfolio is {pc(rm6, 0)} and the corporate "
        f"tax rate is {pc(tau6, 0)}. The firm pays interest on its debt at its cost of debt.",
        f"The project requires an investment of {i0(I6)} million NOK today (Year 0) and generates free cash flows of "
        f"{i0(F6[0])}, {i0(F6[1])}, {i0(F6[2])} and {i0(F6[3])} million NOK at the end of Years 1, 2, 3 and 4. After Year 4 "
        "the project ends with no further cash flows. Use 4 decimal places.",
    ),
    "parts": [
        {
            "label": "a",
            "points": 4,
            "body": P("Find the firm's cost of debt, cost of equity, unlevered cost of capital and after-tax WACC."),
            "solution": P(
                f"<b>Step 1. Cost of debt.</b> The debt has a beta, so it is not risk-free. With a market risk premium of "
                f"{pc(rm6, 0)} − {pc(rf6, 0)} = {pc(mrp6, 0)}: r<sub>D</sub> = {pc(rf6, 0)} + {f(bD6, 1)} × {pc(mrp6, 0)} "
                f"= <b>{pc(rD6)}</b>.",
                f"<b>Step 2. Cost of equity.</b> r<sub>E</sub> = {pc(rf6, 0)} + {f(bE6, 1)} × {pc(mrp6, 0)} = <b>{pc(rE6)}</b>.",
                f"<b>Step 3. Unlevered cost of capital.</b> Weights from market values: E/V = {i0(E6)}/{i0(V6)} = {f(wE6, 1)} and "
                f"D/V = {f(d6, 1)}. r<sub>U</sub> = {f(wE6, 1)} × {pc(rE6, 1)} + {f(d6, 1)} × {pc(rD6, 1)} = "
                f"{pc(wE6 * rE6, 1)} + {pc(d6 * rD6, 1)} = <b>{pc(rU6)}</b>, without taxes. Through betas: β<sub>U</sub> = "
                f"{f(wE6, 1)} × {f(bE6, 1)} + {f(d6, 1)} × {f(bD6, 1)} = {f(bU6, 2)} and {pc(rf6, 0)} + {f(bU6, 2)} × "
                f"{pc(mrp6, 0)} = {pc(rf6 + bU6 * mrp6)}, the same number because the CAPM is linear.",
                f"<b>Step 4. After-tax WACC.</b> r<sub>wacc</sub> = {f(wE6, 1)} × {pc(rE6, 1)} + {f(d6, 1)} × "
                f"{pc(rD6, 1)} × (1 − {f(tau6, 2)}) = {pc(wE6 * rE6, 3)} + {pc(d6 * rD6 * (1 - tau6), 3)} = "
                f"<b>{pc(wacc6)}</b>.",
                f"<b>Check.</b> r<sub>wacc</sub> = r<sub>U</sub> − d × τ<sub>c</sub> × r<sub>D</sub> = "
                f"{pc(rU6, 1)} − {f(d6, 1)} × {f(tau6, 2)} × {pc(rD6, 1)} = {pc(rU6, 1)} − "
                f"{pc(d6 * tau6 * rD6, 3)} = {pc(wacc6)} {OK} Under the course's rebalancing convention this is an "
                "identity, so it confirms the arithmetic rather than the inputs.",
            ),
            "criteria": [
                "r_D from the CAPM with the debt beta: 4% + 0.3 × 5% = 5.5%. Treating the debt as risk-free (4%) contradicts the debt beta.",
                "r_E = 4% + 1.6 × 5% = 12%.",
                "Weights from market values: E/V = 0.6 and D/V = 0.4 (not D/E = 0.6667).",
                "r_U = 0.6 × 12% + 0.4 × 5.5% = 9.4%, without taxes (or beta_U = 1.08 weighted without taxes).",
                f"After-tax WACC = 0.6 × 12% + 0.4 × 5.5% × 0.78 = {pc(wacc6)}.",
            ],
        },
        {
            "label": "b",
            "points": 3,
            "body": P("Find the project's levered value today using the WACC method. What is the project's NPV?"),
            "solution": P(
                "The project has the firm's risk and is financed at the firm's target leverage, so its free cash flows are "
                f"discounted at the after-tax WACC of {pc(wacc6)}.",
                tbl(
                    ["Year", "FCF", f"Discount factor 1/{f(1 + wacc6, 5)}<sup>t</sup>", "PV"],
                    [[str(t + 1), i0(F6[t]), f(1 / (1 + wacc6) ** (t + 1), 6), ledd(pv_wacc, VLt[0])[t]] for t in range(T6)]
                    + [["<b>Sum</b>", "", "", f"<b>{f(VLt[0])}</b>"]],
                    num=(1, 2, 3),
                ),
                f"V<sup>L</sup><sub>0</sub> = <b>{f(VLt[0])} million NOK</b>, the value of the future cash flows. "
                f"NPV = {f(VLt[0])} − {i0(I6)} = <b>{f(NPV6)}</b> &gt; 0, so the firm should take the project.",
            ),
            "criteria": [
                f"Discounts the project's FCF at the after-tax WACC of {pc(wacc6)}, because the project has the firm's risk and the firm's leverage.",
                f"V^L_0 = {f(VLt[0])}, the value of the future cash flows before the investment.",
                f"NPV = {f(VLt[0])} − 100 = {f(NPV6)} > 0: take the project.",
                "No tax shield is added on top of the WACC value; that would count it twice.",
            ],
        },
        {
            "label": "c",
            "points": 5,
            "body": P(
                "Find the project's levered value at the end of Years 1, 2 and 3 and its debt capacity at the end of Years 0, "
                "1, 2 and 3 (the debt the firm takes on because of the project, given its leverage policy). How much debt is "
                "borrowed or repaid in each year?"
            ),
            "solution": P(
                f"<b>Step 1. The ratio.</b> The firm keeps D/V = d = {f(d6, 1)}, so the debt capacity at each date is "
                "D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>, where V<sup>L</sup><sub>t</sub> is the value of the cash "
                "flows still to come.",
                "<b>Step 2. Roll the value back from the end.</b> V<sup>L</sup><sub>4</sub> = 0 and "
                "V<sup>L</sup><sub>t−1</sub> = (FCF<sub>t</sub> + V<sup>L</sup><sub>t</sub>)/(1 + r<sub>wacc</sub>):<br>"
                f"V<sup>L</sup><sub>3</sub> = {i0(F6[3])}/{f(1 + wacc6, 5)} = <b>{f(VLt[3])}</b><br>"
                f"V<sup>L</sup><sub>2</sub> = ({i0(F6[2])} + {f(VLt[3])})/{f(1 + wacc6, 5)} = <b>{f(VLt[2])}</b><br>"
                f"V<sup>L</sup><sub>1</sub> = ({i0(F6[1])} + {f(VLt[2])})/{f(1 + wacc6, 5)} = <b>{f(VLt[1])}</b><br>"
                f"V<sup>L</sup><sub>0</sub> = ({i0(F6[0])} + {f(VLt[1])})/{f(1 + wacc6, 5)} = {f(VLt[0])} {OK} (as in b)",
                "<b>Step 3. Debt capacity and adjustments.</b>",
                tbl(
                    ["End of year t", "0", "1", "2", "3", "4"],
                    [
                        ["FCF<sub>t</sub>", ""] + [i0(x) for x in F6],
                        ["V<sup>L</sup><sub>t</sub>"] + [f(v) for v in VLt],
                        [f"D<sub>t</sub> = {f(d6, 1)} × V<sup>L</sup><sub>t</sub>"] + [f(x) for x in Dt],
                        ["D<sub>t</sub> − D<sub>t−1</sub>", "+" + f(Dt[0])] + [("+" if x > 0 else "") + f(x) for x in dD],
                    ],
                    num=(1, 2, 3, 4, 5),
                ),
                f"<b>Borrow {f(Dt[0])} when the project starts (Year 0) and a further {f(dD[0])} in Year 1, then repay {f(-dD[1])} in Year 2, {f(-dD[2])} in Year 3 and the last "
                f"{f(-dD[3])} in Year 4.</b> The debt rises in Year 1 because the project pays out only {i0(F6[0])} while its "
                f"value grows at the WACC ({f(VLt[0])} × {f(wacc6, 5)} = {f(growth0)}), so the value climbs to "
                f"{f(VLt[1])} and the firm must borrow more to keep D/V at {pc(d6, 0)}. From Year 2 the large cash flows are "
                "paid out, the value falls and the debt is repaid.",
                f"<b>Check.</b> The adjustments in Years 1 to 4 sum to {f(sum(dD))} = −D<sub>0</sub>: all the debt raised "
                f"at Year 0 is repaid by the end of Year 4 {OK} One step forward also works: {f(VLt[0])} × {f(1 + wacc6, 5)} − {i0(F6[0])} = "
                f"{f(VLt[1])} {OK}",
            ),
            "criteria": [
                "Uses D_t = d × V^L_t with d = D/V = 0.4, where V^L_t is the value of the REMAINING cash flows at date t.",
                f"Backward recursion: V^L_3 = {f(VLt[3])}, V^L_2 = {f(VLt[2])}, V^L_1 = {f(VLt[1])} (the year-t cash flow is not part of V^L_t).",
                f"Debt capacity: {f(Dt[0])}, {f(Dt[1])}, {f(Dt[2])}, {f(Dt[3])} at the end of Years 0 to 3.",
                f"Adjustments with signs: borrow {f(Dt[0])} at Year 0 and a further {f(dD[0])} in Year 1; repay {f(-dD[1])}, {f(-dD[2])} and {f(-dD[3])} in Years 2 to 4. Holding the debt fixed at D_0 abandons the stated policy.",
                "Credit for explaining why the debt rises in Year 1: the value grows faster than the small first cash flow is paid out.",
            ],
        },
        {
            "label": "d",
            "points": 5,
            "body": P(
                "Using the debt capacities from c), value the project with the APV method: find the unlevered value, the "
                "interest tax shield in each year and the present value of the tax shields. Compare your result with b)."
            ),
            "solution": P(
                f"<b>Step 1. The unlevered value.</b> The same free cash flows, discounted at r<sub>U</sub> = {pc(rU6)}:<br>"
                f"V<sup>U</sup><sub>0</sub> = {i0(F6[0])}/{f(1 + rU6, 3)} + {i0(F6[1])}/{f(1 + rU6, 3)}<sup>2</sup> + "
                f"{i0(F6[2])}/{f(1 + rU6, 3)}<sup>3</sup> + {i0(F6[3])}/{f(1 + rU6, 3)}<sup>4</sup> = "
                + " + ".join(ledd(pv_u, VU6))
                + f" = <b>{f(VU6)}</b>.",
                "<b>Step 2. The tax shields.</b> Interest in year t is charged on the debt at the start of the year, so "
                f"TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub> = {f(tau6, 2)} × "
                f"{f(rD6, 3)} × D<sub>t−1</sub> = {f(tau6 * rD6, 4)} × D<sub>t−1</sub>.",
                tbl(
                    ["Year t", "D<sub>t−1</sub>", "TS<sub>t</sub>", f"PV at r<sub>U</sub> = {pc(rU6, 1)}"],
                    [[str(t + 1), f(Dt[t]), f(TS6[t]), ledd(pvts_rU, PVTS6)[t]] for t in range(T6)]
                    + [["<b>Sum</b>", "", "", f"<b>{f(PVTS6)}</b>"]],
                    num=(1, 2, 3),
                ),
                "<b>Step 3. The rate.</b> The firm keeps D/E constant, so the future debt and with it the tax shield rise "
                "and fall with the project's value. The shields carry asset risk and are discounted at r<sub>U</sub>, not at "
                f"r<sub>D</sub>: PV(TS) = <b>{f(PVTS6)}</b>.",
                f"<b>Step 4. APV.</b> V<sup>L</sup><sub>0</sub> = V<sup>U</sup> + PV(TS) = {f(VU6)} + {f(PVTS6)} = "
                f"<b>{f(APV6)}</b>, the same as the WACC value in b) (consistency check 1) {OK} NPV = {f(APV6)} − "
                f"{i0(I6)} = {f(NPV6)}, of which {f(NPVu6)} is the project's own (unlevered) NPV and {f(PVTS6)} comes from "
                "the tax shields of the debt it supports.",
                "<b>Check.</b> The agreement is a fixed point rather than an independent valuation: the APV used the debt "
                "levels from the WACC answer. It still catches the two errors that actually happen, slips in the arithmetic "
                f"and the wrong rate on the shield. Discounting the shields at r<sub>D</sub> = {pc(rD6, 1)} would give "
                f"PV(TS) = {f(PVTS6_rD)} and an APV of {f(APV6_rD)}, which no longer matches {f(VLt[0])}.",
            ),
            "criteria": [
                f"V^U_0 = {f(VU6)}, discounting the same FCF at r_U = 9.4%, never at the WACC.",
                f"TS_t = τ_c × r_D × D_(t−1), using the debt at the START of each year: {', '.join(f(x) for x in TS6)}.",
                "Discounts the shields at r_U and says why: with a constant D/E the debt and its shield move with the project's value.",
                f"PV(TS) = {f(PVTS6)} and APV = {f(APV6)}, equal to the WACC value (consistency check 1). NPV = {f(NPV6)}.",
                f"A gap of about 0.001 is rounding. Discounting the shields at r_D gives {f(APV6_rD)}, a real error.",
                f"Course convention: under a constant ratio every year's shield is discounted at r_U, including the first. The textbook's Miles-Ezzell variant (first year at r_D) would give PV(TS) = {f(PVTS6_ME)} and is not expected here.",
            ],
        },
        {
            "label": "e",
            "points": 3,
            "body": P(
                "The CFO suggests instead borrowing exactly the amounts in c) on a fixed schedule agreed today, whatever "
                "happens to the project. Which rate should then discount the tax shields? Would the project's value be "
                "higher or lower than in d)? Explain briefly. (No calculation is required.)"
            ),
            "solution": P(
                "<b>Model answer.</b> With a fixed schedule the future debt balances are known today, so the tax shields "
                f"are as risky as the debt itself and should be discounted at r<sub>D</sub> = {pc(rD6, 1)} rather than "
                f"r<sub>U</sub> = {pc(rU6, 1)}. The same shields discounted at a lower rate are worth more, so the project's "
                f"value would be <b>higher</b> (PV(TS) = {f(PVTS6_rD)} against {f(PVTS6)}, an APV of {f(APV6_rD)}). The firm "
                "would then no longer hold D/V constant, so a single WACC would no longer value the project correctly and APV "
                "becomes the method to use.",
                "<b>Also accepted.</b> The gain is small because the project's debt is small and short-lived. The price of the "
                "fixed schedule is that leverage rises if the project does badly, which brings back the distress costs of a "
                "higher debt ratio.",
            ),
            "criteria": [
                "Rate: r_D, because the shields of a fixed schedule are known in advance and as safe as the debt.",
                "Direction: higher value, since the same shields are discounted at 5.5% instead of 9.4%.",
                "Credit for noting that D/V is no longer constant, so the WACC method no longer applies and APV is the right tool.",
                "Bonus: the cost of a fixed schedule is that leverage rises if the project does badly.",
            ],
        },
    ],
}

# ===========================================================================
# Settet
# ===========================================================================
exam = {
    "id": "prove3",
    "kind": "mock",
    "label": "Mock exam 3",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Mock exam 3, “Kurbatov's 2026 emphasis”. Written for this app as practice in Kurbatov's format "
        "(H2024, H2025); it is not an official exam and no official solution key exists. The computational exercises "
        "follow the types in his 2026 home assignments with new firms and numbers: Myers-Majluf with a credible "
        "certificate (HA1), risk-neutral option pricing with put-call parity (HA2), WACC and APV for a project with "
        "debt capacity (HA2). It also covers syllabus topics that neither real paper used: payout policy, asymmetric "
        "information, the tax shield with distress costs and binomial pricing."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 6 exercises, 100 points, 180 minutes, no multiple choice, calculator permitted.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Two verbal exercises with sentence budgets, then four computational chains.",
        "Exercises 3, 5 and 6 follow the types of Kurbatov's 2026 home assignments (HA1 Exercise 3, HA2 Exercises 2 and 1) with new numbers.",
        "Recommended precision: 4 decimal places, as in H2025.",
        "Every computational exercise ends with a short verbal question; every solution closes with a consistency check.",
        "Written for this app. The solutions follow the course manual; every number is computed and checked in a script.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}

# ===========================================================================
# Kontroller før skriving
# ===========================================================================
assert [e["points"] for e in exam["exercises"]] == [12, 12, 18, 18, 20, 20]
assert sum(e["points"] for e in exam["exercises"]) == exam["points"]
for e in exam["exercises"]:
    if "parts" in e:
        assert sum(p["points"] for p in e["parts"]) == e["points"], e["n"]
        assert 3 <= len(e["parts"]) <= 9
        for p in e["parts"]:
            assert 2 <= p["points"] <= 8, (e["n"], p["label"])
            assert 3 <= len(p["criteria"]) <= 7, (e["n"], p["label"], len(p["criteria"]))
    else:
        assert 3 <= len(e["criteria"]) <= 7


def strings(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from strings(v)
    elif isinstance(o, list):
        for v in o:
            yield from strings(v)


brudd = []
for s in strings(exam):
    if "—" in s or "&mdash;" in s:
        brudd.append("tankestrek: " + s[:120])
    for m in re.finditer(r",\s+and\b", s, re.I):
        brudd.append(", and: " + s[max(0, m.start() - 80): m.end() + 20])
    if "-0.0000" in s or MINUS + "0.0000" in s:
        brudd.append("minus null: " + s[:120])
for b in brudd:
    print("BRUDD", b)
assert not brudd

HTML = re.compile(r"<[a-zA-Z/!]")
for e in exam["exercises"]:
    for c in e.get("criteria", []):
        assert not HTML.search(c), c
    for p in e.get("parts", []):
        for c in p["criteria"]:
            assert not HTML.search(c), c

with open(OUT, "w", encoding="utf-8") as fh:
    json.dump(exam, fh, ensure_ascii=False, indent=2)
    fh.write("\n")

# Kort utskrift av hovedtallene
print("E3: alpha_pool", f(a_pool), "payH", f(payH_pool), "payL", f(payL_pool), "alpha_sep", f(a_sep),
      "payH_dev", f(payH_dev), "loss", loss3, "Kmax", K_max, "recovered", recovered, "q*", f(q_star))
print("E4: VU", VU4, "P0", P0_4, "PVTS", PVTS4, "P1", P1_4, "n", f(n4), "N1", f(N1_4), "DPS", f(DPS1_4),
      "rE", pc(rE4), "rE_sheet", pc(rE4_sheet), "wacc", pc(wacc4), "P_B", P1_4b)
print("E5: rho", f(rho), "Delta", f(Delta), "B", f(B), "C", f(C5), "P", f(P5), "PVK", f(PVK), "arb", f(cf0),
      "D", f(D5), "y", pc(y5))
print("E6: rD", pc(rD6), "rE", pc(rE6), "rU", pc(rU6), "wacc", pc(wacc6), "VL", [f(v) for v in VLt], "NPV", f(NPV6))
print("    D", [f(x) for x in Dt], "dD", [f(x) for x in dD], "VU", f(VU6), "TS", [f(x) for x in TS6],
      "PVTS", f(PVTS6), "APV", f(APV6), "PVTS_rD", f(PVTS6_rD))
print("Skrev", OUT)
