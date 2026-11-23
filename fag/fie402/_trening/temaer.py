# -*- coding: utf-8 -*-
"""Temaene i eksamenstreningen for FIE402 Corporate Finance.

   Temaene følger oppgavetypene på Kurbatovs eksamen (H2024, H2025) og
   kjernepensumdelene. `vekt` er eksamensvekten 1–5 og styrer hvor mange
   spørsmål et tema får når du trekker fra flere temaer samtidig. `mal` er hvor
   mange spørsmål temaet skal ha i banken; tools/sjekk-trening.js melder avvik.
   `kap` er manualkapitlene og `kjerne` kjernepensumdelen, som gjennomgangen
   lenker til. Navn og innføring er på engelsk, som resten av fagstoffet i
   FIE402 (sjangertreningen har engelske titler). Motorens tekster er norske.

   id-ene er lagringsnøkler for valgene dine. De må aldri endres.

   Vektene ble justert 22. november 2026 etter signalfilen fra opptakene (del 7):
   agent og kreditt fra 3 til 4. Kurbatov pekte ut gjeldsoverheng, gambling for
   resurrection og wealth transfer som eksamenskandidater, og sa at et CDS-eksempel
   som i forelesning 10 og Google-oppgaven med senior og junior gjeld kan komme.
   Målet for wacc-apv ble satt ned fra 70 til 65 da regnefamiliene for justert WACC
   (wac-perm1, wac-perm2) ble fjernet: Kurbatov kalte dem «not mandatory».

   Oppsettet under gjelder hele faget (se tools/bygg-trening.py):
     SPRAK      engelsk tallformat: punktum som desimaltegn, hardt mellomrom
                som tusenskille, ekte minustegn
     POENG      ingen minuspoeng: eksamen er åpne regneoppgaver
     REGN_SELV  «Regn selv først» er på som standard, fordi eksamen er åpen
     SJEKKER    en kort sjekk per opsjonsforelesning (9, 10 og 11), åtte spørsmål
                hver i forelesningens rekkefølge. Magnus ba om det 22. november 2026:
                bare det viktigste, mest som en sjekk. Utvalget følger
                lysbildene og oppsummeringsforelesningen. Totrinnstreet er
                utelatt, siden Kurbatov bare tar ett steg. En id står for familien
                sin, så regnespørsmålene får nye tall neste gang.
"""
SPRAK = "en"
POENG = {"rett": 1, "feil": 0, "blank": 0}
REGN_SELV = True

SJEKKER = {
    "tittel": "Opsjoner: kort sjekk per forelesning",
    "tekst": "Åtte spørsmål fra hver av de tre opsjonsforelesningene, bare det viktigste og i forelesningens rekkefølge. Regnespørsmålene får nye tall hver gang du tar sjekken.",
    "liste": [
        dict(id="ops-f9", navn="Options I", kort="Forelesning 9",
             tekst="Payoff, put-call-paritet, replikering, ρ, sann mot implisitt volatilitet, utbytte og amerikansk call",
             ids=["ops-s11", "ops-par1-01", "ops-rep1-01", "ops-bin1-01", "ops-s09", "ops-s08", "ops-s03", "ops-s05"]),
        dict(id="ops-f10", navn="Options II", kort="Forelesning 10",
             tekst="Gjeld som risikofri gjeld minus en put, gjeld og egenkapital i et tre, CDS, gjeld fra noterte calls, senior og junior gjeld og mer risiko",
             ids=["kre-s01", "kre-tre1-01", "kre-put1-01", "kre-cds1-01", "kre-exr1-01", "kre-cal1-01", "kre-snj1-01", "kre-s06"]),
        dict(id="ops-f11", navn="Options III", kort="Forelesning 11",
             tekst="Vente, verdien av informasjon, trinnvis finansiering, ρ fra et omsatt verdipapir, exit og månedsrente",
             ids=["reo-ven1-01", "reo-inf1-01", "reo-trn1-01", "reo-rho1-01", "reo-s14", "reo-exi1-01", "reo-s01", "reo-s15"]),
    ],
}

TEMAER = [
    dict(id="tvilling", navn="Twin firm and the cost of capital", kort="Twin firm", vekt=5, kap=[3, 4, 5], kjerne="kj1", mal=60,
         beskrivelse="Twin firm, unlevering and relevering, the CAPM, debt beta and net debt."),
    dict(id="mm", navn="Modigliani-Miller and recapitalisations", kort="MM", vekt=5, kap=[6], kjerne="kj2", mal=60,
         beskrivelse="MM I and II without taxes, leveraged recapitalisations, homemade leverage and EPS."),
    dict(id="skatt", navn="Taxes, the tax shield and the trade-off", kort="Tax shield", vekt=4, kap=[7, 8], kjerne="kj3", mal=55,
         beskrivelse="The interest tax shield with permanent and predetermined debt, recapitalisation with taxes, "
                     "the trade-off theory, financial distress and fire sales."),
    dict(id="agent", navn="Agency costs of debt", kort="Agency", vekt=4, kap=[9, 10, 11], kjerne="kj5", mal=45,
         beskrivelse="Risk shifting, debt overhang, spin-offs and gambling for resurrection."),
    dict(id="info", navn="Asymmetric information and issuing securities", kort="Information", vekt=3, kap=[12, 13, 14], kjerne="kj6", mal=45,
         beskrivelse="Myers-Majluf, the pecking order, IPOs and SEOs."),
    dict(id="utbytte", navn="Payout policy", kort="Payout", vekt=3, kap=[15, 16], kjerne="kj2", mal=45,
         beskrivelse="Payout under MM, dividends against buybacks, signals, clienteles and taxes."),
    dict(id="wacc-apv", navn="Valuation with leverage: WACC, APV and FTE", kort="WACC and APV", vekt=5, kap=[17, 18, 19, 20, 2], kjerne="kj4", mal=65,
         beskrivelse="Free cash flow, WACC, APV, FTE, debt capacity, constant interest coverage and permanent debt."),
    dict(id="opsjoner", navn="Options: payoffs, parity and binomial pricing", kort="Options", vekt=4, kap=[21, 22, 23], kjerne="kj7", mal=55,
         beskrivelse="Payoffs, put-call parity, the binomial model, the risk-neutral probability ρ and "
                     "Black-Scholes as intuition only."),
    dict(id="kreditt", navn="Debt and equity as options: credit risk", kort="Credit risk", vekt=4, kap=[24, 5], kjerne="kj8", mal=45,
         beskrivelse="Equity and debt as options, senior and junior debt, credit spreads and CDS."),
    dict(id="realopsjon", navn="Real options", kort="Real options", vekt=5, kap=[25], kjerne="kj9", mal=60,
         beskrivelse="The options to wait and to abandon (compared with 0), staged investment, the value of "
                     "information and pricing with a twin security."),
    dict(id="ma", navn="Mergers and acquisitions", kort="M&A", vekt=4, kap=[26], kjerne="kj10", mal=55,
         beskrivelse="Stock swaps, cash offers, the exchange ratio, the deal probability with (1 + r_f)^T, "
                     "merger arbitrage, coinsurance and bidding."),
    dict(id="governance", navn="Corporate governance and the verbal M&A questions", kort="Governance", vekt=4, kap=[27, 26], kjerne="kj11", mal=45,
         beskrivelse="Verbal: the board, pay and KPIs, activists, proxy advisers, takeover defences, "
                     "stakeholders and the motives for M&A."),
]


# ---------------------------------------------------------------------------
# Hurtiginnføringen per tema: hva temaet tester, formlene du må kunne og de
# vanligste fellene. Vises bak knappen «Hurtiginnføring» på temakortet og fra
# temamerket underveis i en runde. Kortversjon av «Must know»-boksene i
# kjernepensum, rettet etter docs/fie402-forelesninger-2026.md. Formlene vises
# med symbolforklaring fra fag/fie402/symboler.js. Formel er (uttrykk, hva det
# betyr). HTML er lov; ingen tankestrek, ingen komma foran «and»
# (tools/sjekk-trening.js sjekker det).
# ---------------------------------------------------------------------------
INTRO = {
    "tvilling": dict(
        tester=[
            "Unlevering a listed twin's equity beta and relevering it at your own firm's leverage",
            "Debt betas on both sides and net debt (debt minus excess cash) in the weights",
            "Turning betas into r<sub>E</sub>, r<sub>D</sub>, r<sub>U</sub> and the WACC with the CAPM",
        ],
        formler=[
            ("r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)",
             "The CAPM. Check whether the question gives the market return or the market risk premium."),
            ("β<sub>U</sub> = [E/(E + D)]β<sub>E</sub> + [D/(E + D)]β<sub>D</sub>",
             "The course default: market-value weights without taxes, for a firm that keeps D/V constant. "
             "D is net debt."),
            ("β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>)",
             "Relevering at your own D/E with your own debt beta."),
            ("r<sub>D</sub> = r<sub>f</sub> + β<sub>D</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)",
             "The expected return on debt. The promised yield is higher: the gap is expected loss."),
            ("r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>)",
             "The after-tax WACC at the target weights."),
            ("Fixed permanent debt: weights E/(E + D(1 − τ<sub>c</sub>)) and D(1 − τ<sub>c</sub>)/(E + D(1 − τ<sub>c</sub>))",
             "Intuition only. Kurbatov calls this weighting not mandatory: exam WACC questions assume a constant D/E "
             "and use the formula sheet (lecture 8, slide 18)."),
        ],
        feller=[
            "β<sub>D</sub> set to 0 when the debt is risky: it understates β<sub>U</sub> and the WACC and overvalues the firm",
            "Relevering with the twin's D/E instead of your own",
            "Gross debt in the weights when the twin holds excess cash",
            "Book values instead of market values in the weights",
        ],
    ),
    "mm": dict(
        tester=[
            "MM I and II without taxes: firm value and the cost of equity when leverage changes",
            "A leveraged recapitalisation: the share price, the shares bought back and the new r<sub>E</sub>",
            "Homemade leverage: copying or undoing the firm's leverage on your own account",
            "Why a higher EPS after a recapitalisation does not mean a higher share price",
        ],
        formler=[
            ("V<sup>L</sup> = V<sup>U</sup>",
             "MM I in a perfect market: financing does not change the value of the firm."),
            ("r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)",
             "MM II. The ratio is D/E, not D/V."),
            ("r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>",
             "Without taxes the pre-tax WACC is r<sub>U</sub> whatever the leverage."),
            ("Shares bought back = D / P",
             "Without taxes the share price does not move when debt replaces equity."),
            ("EPS break-even: EBIT/N<sub>U</sub> = (EBIT − r<sub>D</sub>D)/N<sub>L</sub>",
             "Above this EBIT leverage raises EPS. The EPS is also riskier, so r<sub>E</sub> rises and the price stays put."),
        ],
        feller=[
            "D/V instead of D/E in MM II",
            "A higher EPS read as a higher share price: the P/E ratio falls as r<sub>E</sub> rises",
            "A price change in a recapitalisation without taxes: the price moves only with a tax shield or distress costs",
        ],
    ),
    "skatt": dict(
        tester=[
            "The value of the interest tax shield with permanent, predetermined or rebalanced debt",
            "A recapitalisation with taxes: the price jump at the announcement and the shares bought back",
            "The trade-off: the tax shield against expected distress costs, fire sales included",
        ],
        formler=[
            ("V<sup>L</sup> = V<sup>U</sup> + PV(TS)",
             "MM I with corporate taxes."),
            ("Permanent debt: PV(TS) = τ<sub>c</sub>r<sub>D</sub>D / r<sub>D</sub> = τ<sub>c</sub>D",
             "A fixed amount forever, so the shield is as safe as the debt and is discounted at r<sub>D</sub>."),
            ("Predetermined debt: PV(TS) = Σ τ<sub>c</sub> × interest<sub>t</sub> / (1 + r<sub>D</sub>)<sup>t</sup>",
             "Only the interest is deductible, never the principal."),
            ("Rebalanced debt (constant D/V): discount the shield at r<sub>U</sub>",
             "The debt moves with the firm's value, so the shield carries the firm's risk."),
            ("Recap with taxes: P = (V<sup>U</sup> + PV(TS)) / N before the buyback",
             "The old shareholders capture the shield, so the price rises at the announcement. Shares bought back = D / P."),
            ("V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs)",
             "The trade-off. Distress costs include fire sales and lost customers, not only legal fees."),
        ],
        feller=[
            "The principal counted as part of the tax shield",
            "Shares bought back at the old price: the price rises first, when the recap is announced",
            "The shield of rebalanced debt discounted at r<sub>D</sub> instead of r<sub>U</sub>",
        ],
    ),
    "agent": dict(
        tester=[
            "Risk shifting: when shareholders prefer a negative-NPV gamble",
            "Debt overhang: when shareholders reject a positive-NPV project and what renegotiation does",
            "Spin-offs and asset sales that move value from creditors to shareholders",
            "Who wins and who loses: the manager, the shareholders and the creditors",
        ],
        formler=[
            ("E = max(V − K, 0) state by state",
             "Equity is a call on the assets with the face value K of the debt as the strike. Take the max in each state before you average."),
            ("Creditors' gain + shareholders' gain = the project's NPV",
             "Check 3. With total value fixed, the creditors' gain is the shareholders' loss (check 4)."),
            ("Overhang with new equity: x = I / E<sub>with</sub>",
             "New investors get the share x. Old owners invest only if (1 − x)E<sub>with</sub> exceeds E<sub>without</sub>, that is if E<sub>with</sub> − I does."),
            ("Gambling for resurrection",
             "Close to default, equity gains from risk itself, because the downside belongs to the creditors."),
        ],
        feller=[
            "Expected values taken before max(·, 0): the option value of equity disappears",
            "Debt overhang judged by the project's NPV: the question is who captures it",
            "Forgetting that rational creditors price risk shifting in advance, so shareholders pay through the interest rate",
        ],
    ),
    "info": dict(
        tester=[
            "Myers-Majluf: whether a good firm issues equity and whether the outcome pools or separates",
            "The share α new investors must get and the transfer between old and new shareholders",
            "The pecking order, the price reaction to an SEO and IPO underpricing",
        ],
        formler=[
            ("α = I / (E[V | beliefs] + I + NPV)",
             "New investors' share. The denominator is the value after the issue and includes the cash raised."),
            ("A type issues if (1 − α)(A + I + NPV) ≥ A",
             "A is the type's own value of assets in place, not the market's average."),
            ("Check 5: are investors' beliefs rational given who issues?",
             "If only the bad type would issue, pooling beliefs cannot be the equilibrium."),
            ("Pecking order: internal funds, then debt, then equity",
             "Equity is the security most sensitive to what managers know."),
            ("IPO underpricing = (first-day price − offer price) / offer price",
             "The winner's curse: uninformed investors get more of the bad issues, so the average issue must be underpriced."),
        ],
        feller=[
            "I dropped from the denominator of α: the share comes out too large",
            "Pooling called inefficient: it is separating that destroys value, when the good type skips a positive-NPV project",
            "Stopping at α without checking that the beliefs are rational",
        ],
    ),
    "utbytte": dict(
        tester=[
            "Dividends against buybacks in a perfect market: the price, the shares and the shareholders' wealth",
            "A dividend financed by issuing new shares",
            "Taxes, signals, clienteles and the four uses of free cash flow",
        ],
        formler=[
            ("P<sub>cum</sub> = P<sub>ex</sub> + Div",
             "Under MM the share price falls by the dividend on the ex-dividend date."),
            ("Buyback: shares bought = cash / P with P unchanged",
             "A fair-price buyback in a perfect market leaves every shareholder as well off as a dividend."),
            ("P<sub>0</sub> = (P<sub>1</sub> + Div<sub>1</sub>) / (1 + r<sub>E</sub>)",
             "Holds whether the dividend is paid from cash or from new shares. Payout policy does not change P<sub>0</sub>."),
            ("Taxes: deferral",
             "Kurbatov (lecture 5): dividend and capital gains tax are equal today in the US and Norway. A buyback's "
             "edge is that only sellers pay, only on the gain and only when they sell."),
            ("Clienteles",
             "Individuals prefer buybacks, corporations prefer dividends, institutions are indifferent."),
        ],
        feller=[
            "A buyback treated as creating value in a perfect market",
            "Forgetting that the price drops by the dividend on the ex date",
            "A signal read the wrong way: a dividend cut is bad news, a buyback signals that managers think the shares are cheap",
        ],
    ),
    "wacc-apv": dict(
        tester=[
            "Free cash flow without interest, with the change in working capital",
            "WACC, APV and FTE on the same firm and why they agree",
            "Debt capacity D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub> and the shortcuts for constant interest coverage and permanent debt",
        ],
        formler=[
            ("FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC",
             "Never subtract interest. The financing enters through the discount rate or the tax shield."),
            ("V<sup>L</sup> = FCF<sub>1</sub> / (r<sub>wacc</sub> − g)",
             "The WACC method, for constant D/V."),
            ("APV: V<sup>L</sup> = V<sup>U</sup> + PV(TS)",
             "V<sup>U</sup> at r<sub>U</sub>. The shield at r<sub>U</sub> under constant D/V and at r<sub>D</sub> under a fixed schedule."),
            ("FTE: E = FCFE<sub>1</sub> / (r<sub>E</sub> − g), FCFE = FCF − (1 − τ<sub>c</sub>)r<sub>D</sub>D + ΔD",
             "Net borrowing belongs in FCFE."),
            ("Interest = k × FCF gives V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup>",
             "Constant interest coverage (lecture 8, slide 17)."),
            ("Permanent debt: V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D",
             "Use APV. The adjusted WACC for permanent debt is not mandatory (Kurbatov): the WACC method on the exam "
             "assumes a constant D/E."),
        ],
        feller=[
            "Interest subtracted in the FCF: the tax shield is then counted twice",
            "The shield of rebalanced debt discounted at r<sub>D</sub>",
            "PV and NPV mixed up: read whether the question asks for the value or the NPV",
        ],
    ),
    "opsjoner": dict(
        tester=[
            "Payoff diagrams and put-call parity",
            "Binomial pricing over one or two periods: replication and the risk-neutral probability ρ",
            "Black-Scholes only as intuition: what raises or lowers an option's price",
        ],
        formler=[
            ("C − P = S − PV(K), PV(K) = K / (1 + r<sub>f</sub>)<sup>T</sup>",
             "Put-call parity for European options on a stock without dividends. Discrete discounting, as in the course."),
            ("ρ = [(1 + r<sub>f</sub>)S − S<sub>d</sub>] / (S<sub>u</sub> − S<sub>d</sub>)",
             "The risk-neutral probability of the up state."),
            ("C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>] / (1 + r<sub>f</sub>)",
             "Discount the risk-neutral expectation at r<sub>f</sub>."),
            ("Δ = (C<sub>u</sub> − C<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>), B = (C<sub>d</sub> − ΔS<sub>d</sub>) / (1 + r<sub>f</sub>)",
             "The replicating portfolio: C<sub>0</sub> = ΔS<sub>0</sub> + B."),
            ("A call rises with S, σ, T and r<sub>f</sub> and falls with K",
             "Black-Scholes intuition. A put rises with K and σ and falls with S and r<sub>f</sub>. No Black-Scholes calculation on the exam."),
        ],
        feller=[
            "Real probabilities discounted at r<sub>f</sub> when the risk is priced",
            "ρ read as the real probability of the up state",
            "An American call on a stock without dividends valued above the European call: early exercise is never optimal there",
        ],
    ),
    "kreditt": dict(
        tester=[
            "Equity as a call on the assets and debt as risk-free debt minus a put",
            "Senior and junior debt as calls and the yield implied by quoted calls",
            "Yield against expected return, the credit spread and the price of a CDS",
        ],
        formler=[
            ("E = C(V, K), D = V − C(V, K) = PV(K) − P(V, K)",
             "Debt is risk-free debt minus a put. The put is the shareholders' right to default."),
            ("D<sub>S</sub> = V − C(K<sub>S</sub>), D<sub>J</sub> = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>), E = C(K<sub>S</sub> + K<sub>J</sub>)",
             "Senior debt is paid first, junior next, equity last."),
            ("y = (K / D)<sup>1/T</sup> − 1",
             "The promised yield with discrete compounding, also for parts of a year."),
            ("y − r<sub>f</sub> = (y − r<sub>D</sub>) + (r<sub>D</sub> − r<sub>f</sub>)",
             "The spread is expected loss plus the risk premium on the debt."),
            ("Risky bond + CDS = risk-free bond",
             "A CDS is the lender's put. It is priced with the risk-neutral default probability."),
        ],
        feller=[
            "The promised yield used as the expected return on the debt",
            "Junior debt valued as V − C(K<sub>J</sub>): the junior strike sits on top of the senior one",
            "Continuous discounting where the course discounts discretely",
        ],
    ),
    "realopsjon": dict(
        tester=[
            "The option to wait: invest now or after the uncertainty is resolved",
            "The option to abandon, valued against stopping at 0",
            "Staged investment and the value of information",
            "Pricing with a twin security, or with real probabilities when the risk is not priced",
        ],
        formler=[
            ("Option value = NPV with the option − NPV without it",
             "Never negative. Take the best decision in each state, then average."),
            ("Abandon: max(value of continuing, 0) in each state",
             "Compare with 0, the value of stopping, not with the negative value of going on."),
            ("Wait: NPV = [p × max(NPV<sub>up</sub>, 0) + (1 − p) × max(NPV<sub>down</sub>, 0)] / (1 + r)",
             "r<sub>f</sub> with risk-neutral probabilities or unpriced risk, the cost of capital with real probabilities of priced risk."),
            ("Twin pricing: Δ units of the twin plus B in bonds with the same payoffs",
             "The project is worth what the replicating portfolio costs."),
            ("Monthly rate = (1 + r)<sup>1/12</sup> − 1",
             "Discrete compounding for parts of a year."),
        ],
        feller=[
            "The exit value compared with the negative value of continuing instead of with 0",
            "Expected NPV used instead of the best decision in each state: the option value disappears",
            "Black-Scholes used on a real option: not on this exam",
        ],
    ),
    "ma": dict(
        tester=[
            "Stock swaps: the exchange ratio, the price after the merger and who gains",
            "Cash offers: the NPV for the acquirer and for the target",
            "The deal probability the market prices in, discounted over T years",
            "Merger arbitrage, coinsurance and bidding",
        ],
        formler=[
            ("P<sub>new</sub> = (V<sub>A</sub> + V<sub>T</sub> + S) / (N<sub>A</sub> + ER × N<sub>T</sub>)",
             "A stock swap. S is the synergy and ER the number of acquirer shares per target share."),
            ("Cash offer: NPV<sub>A</sub> = S − (P − V<sub>T</sub>), NPV<sub>T</sub> = P − V<sub>T</sub>",
             "P is the price paid and V<sub>T</sub> the target's stand-alone value (lecture 12, slide 15)."),
            ("P<sub>0</sub> = [p × P<sub>deal</sub> + (1 − p) × P<sub>no deal</sub>] / (1 + r<sub>f</sub>)<sup>T</sup>",
             "Solve for p. T is in years, so a quarter is T = 0.25."),
            ("Target shareholders accept if ER × P<sub>new</sub> ≥ P<sub>T</sub>",
             "Acquirer shareholders accept if P<sub>new</sub> ≥ P<sub>A</sub>."),
            ("Coinsurance",
             "A merger of firms whose cash flows are not perfectly correlated makes the debt safer. Debt gains and equity loses."),
            ("Reservation price = value if you win − value if a rival wins",
             "Bidding when a rival is also bidding (lecture 12, slide 26)."),
        ],
        feller=[
            "The deal probability discounted over one year when the deal closes in a quarter",
            "The exchange ratio inverted: target shares per acquirer share",
            "The post-merger price divided by the old number of shares instead of N<sub>A</sub> + ER × N<sub>T</sub>",
        ],
    ),
    "governance": dict(
        formeltittel="Begrepene du må kunne",
        tester=[
            "The conflict between managers and shareholders and its forms: empire building, entrenchment, perks and short-termism",
            "The board: insiders, grey and independent directors, the CEO as chair, board size and busy directors",
            "Pay and KPIs, activists and proxy advisers, takeover defences and regulation",
            "Shareholders against stakeholders and the motives for M&A",
        ],
        formler=[
            ("Free-rider problem",
             "A small shareholder bears the full cost of monitoring and gets a sliver of the gain, so dispersed owners monitor too little."),
            ("Board independence",
             "The board monitors only to the extent that it is independent of the CEO it monitors."),
            ("Pay and KPIs",
             "Equity pay aligns interests. KPIs and EPS targets can make the manager short-termist, for example a buyback to hit an EPS target."),
            ("Activists and proxy advisers",
             "Activists buy a stake to force change. ISS and Glass Lewis advise institutions. Many follow them without their own analysis."),
            ("Takeover defences",
             "Poison pills and staggered boards entrench management under US law. They can raise the price a bidder pays, but they can also block value-creating bids."),
            ("The monitoring trade-off",
             "A manager who is monitored too strongly becomes too passive (lecture 13)."),
            ("Motives for M&A",
             "Synergies (scale, scope, the value chain, complementary products), market power, a change of control, EPS manipulation and managerial ambition."),
        ],
        feller=[
            "Answering with Norwegian company law when the question names no jurisdiction: answer in general terms",
            "Listing remedies without saying which agency problem each one solves",
            "A diversifying merger called value-creating: shareholders can diversify on their own",
        ],
    ),
}
for _t in TEMAER:
    _t["intro"] = INTRO[_t["id"]]
