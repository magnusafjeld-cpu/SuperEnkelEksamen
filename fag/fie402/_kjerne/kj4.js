/* kj4 · Valuing a levered firm: WACC, APV and FTE */
window.EDU_DATA.kjerne.push({
  id: "kj4",
  num: 4,
  title: "Valuing a levered firm: WACC, APV and FTE",
  chapters: [17, 18, 19, 20, 2],
  html: `
<div class="callout kort"><span class="h">In short</span>Here the pieces come together into a full valuation of a firm with debt. There are three ways to do it. All three start from the same free cash flow. WACC discounts that cash flow at a rate that already contains the tax benefit of debt. APV values the firm as if it had no debt and adds the value of the tax shield separately. FTE values only the equity, using the cash left for shareholders after debt payments. Done right they give the same answer, which is how you check your work.</div>

<p class="lead-in">Valuing one firm by WACC and again by APV is on all eleven mapped papers and is usually the biggest exercise. H2024 Exercise 5 goes from a comparable firm to a value by both routes; H2025 Exercise 4 does it over two periods in nine chained sub-questions, at four decimals. The three methods split one set of cash flows three ways, and must agree.</p>

<h3>Free cash flow and the WACC method</h3>
<p>Every method starts from unlevered free cash flow, which is on the formula sheet:</p>
<div class="formula"><div class="eq">FCF<sub>t</sub> = EBIT<sub>t</sub>(1 − τ<sub>c</sub>) + Depreciation<sub>t</sub> − CapEx<sub>t</sub> − ΔNWC<sub>t</sub> + Other<sub>t</sub></div>
<div class="where">Tax is charged on full EBIT, as if there were no debt. Interest never enters: the cost of debt lives in the discount rate, and the interest deduction comes back once, in the lower WACC or as PV(TS). For a terminal value, build a normalised FCF<sub>T+1</sub> from its components rather than growing a year with one-off items.</div></div>
<p>The WACC method discounts that one stream at the after-tax WACC:</p>
<div class="formula"><div class="eq">r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V)r<sub>D</sub>τ<sub>c</sub></div>
<div class="eq">V<sup>L</sup><sub>0</sub> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) · V<sup>L</sup><sub>t−1</sub> = (FCF<sub>t</sub> + V<sup>L</sup><sub>t</sub>)/(1 + r<sub>wacc</sub>) · D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub></div>
<div class="where">The second form holds under the course's rebalancing convention (pre-tax WACC = r<sub>U</sub>). One rate for every year needs a constant D/V = d, kept by rebalancing. Roll the value back from the last date and write V<sup>L</sup><sub>t</sub> for every date: the debt schedule D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub> (not on the sheet) needs them all.</div></div>
<div class="callout mech"><span class="h">Why value by WACC first?</span>Under a target ratio the debt at each date depends on the value you are computing. But r<sub>wacc</sub> needs only the ratio d, which is given, so you value first and read the debt off afterwards. That is why the exam asks for the WACC value before the APV value.</div>

<h3>APV and the rate on the tax shield</h3>
<p>APV values the business and the financing separately:</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS), with V<sup>U</sup> = Σ FCF<sub>t</sub>/(1 + r<sub>U</sub>)<sup>t</sup> and TS<sub>t</sub> = τ<sub>c</sub>r<sub>D</sub>D<sub>t−1</sub></div>
<div class="where">Not on the formula sheet. V<sup>U</sup> is always discounted at r<sub>U</sub>, never at r<sub>wacc</sub>. The shield in year t comes from the balance carried into year t, D<sub>t−1</sub>.</div></div>
<p>Only the shield's rate is ever in question. This is the rule to recite:</p>
<div class="formula"><div class="eq">Tax shield at r<sub>U</sub> under constant D/E · at r<sub>D</sub> (or r<sub>f</sub>) under fixed permanent debt</div>
<div class="where">Constant D/E or D/V, rebalanced (also debt held at a multiple of FCF): discount at r<sub>U</sub>; a growing perpetuity gives PV(TS) = τ<sub>c</sub>r<sub>D</sub>D<sub>0</sub>/(r<sub>U</sub> − g). Fixed permanent debt: discount at r<sub>D</sub>, or r<sub>f</sub> if the debt is risk-free, so PV(TS) = τ<sub>c</sub>D. A known repayment schedule: each shield is a known amount, discounted at r<sub>D</sub> period by period. Name the assumption in one sentence, every time.</div></div>
<div class="callout mech"><span class="h">Why does a target ratio make the shield risky?</span>Next year's debt is d times next year's V<sup>L</sup>: good year, more debt and a bigger shield; bad year, a smaller one. The shield moves with the assets, so it is priced at r<sub>U</sub>. Fixed debt is a contract number that ignores the business, so its shield is as safe as the interest, which r<sub>D</sub> prices.</div>
<p>When D/V is not constant (a loan being repaid, a fixed amount) there is no single r<sub>wacc</sub>: use APV alone, and say that the WACC method is not available.</p>

<h3>Flow to equity, the debt adjustment and the share price</h3>
<p>Flow to equity discounts the cash that reaches shareholders at their own rate:</p>
<div class="formula"><div class="eq">FCFE<sub>t</sub> = FCF<sub>t</sub> − (1 − τ<sub>c</sub>) × Interest<sub>t</sub> + ΔD<sub>t</sub>, discounted at r<sub>E</sub></div>
<div class="eq">ΔD<sub>t</sub> = D<sub>t</sub> − D<sub>t−1</sub> = d(V<sup>L</sup><sub>t</sub> − V<sup>L</sup><sub>t−1</sub>)</div>
<div class="where">Interest leaves after tax, so the shield arrives as cash and needs no separate term. FTE values equity, not the firm: add D<sub>0</sub> before comparing. ΔD takes the sign of the change in value. A growing firm borrows and shareholders receive it; when V<sup>L</sup> falls the firm must repay, and shareholders fund it (H2025 Exercise 4(f)).</div></div>
<div class="formula"><div class="eq">E<sub>0</sub> = V<sup>L</sup><sub>0</sub> − D<sub>0</sub> + excess cash · price per share = E<sub>0</sub>/N</div>
<div class="where">Excess cash never entered FCF, so it is added at face value at the end; operating cash is already inside NWC. Subtract D<sub>0</sub> = d·V<sup>L</sup><sub>0</sub>, the debt consistent with the policy you valued.</div></div>

<div class="worked"><span class="wh">Worked example: two periods, a falling value, three methods</span>
<p>Lofoten Seafood generates FCF of 100 at date 1 and 120 at date 2, then is wound up with nothing left. It holds D/V = 0.40, rebalanced at each year-end; r<sub>U</sub> = 10.0000%, r<sub>D</sub> = 5.0000%, τ<sub>c</sub> = 25%. MNOK.</p>
<p><b>Step 1: rates.</b> D/E = 0.40/0.60 = 0.666667. r<sub>E</sub> = 0.1000 + 0.666667(0.1000 − 0.0500) = 0.133333 = 13.3333%. r<sub>wacc</sub> = 0.60(0.133333) + 0.40(0.0500)(0.75) = 0.080000 + 0.015000 = 9.5000%.</p>
<p><b>Step 2: WACC, value path.</b> V<sup>L</sup><sub>2</sub> = 0. V<sup>L</sup><sub>1</sub> = 120/1.095 = 109.5890. V<sup>L</sup><sub>0</sub> = (100 + 109.5890)/1.095 = 191.4055.</p>
<p><b>Step 3: debt schedule.</b> D<sub>0</sub> = 0.40 × 191.4055 = 76.5622, D<sub>1</sub> = 0.40 × 109.5890 = 43.8356, D<sub>2</sub> = 0. So ΔD<sub>1</sub> = −32.7266 and ΔD<sub>2</sub> = −43.8356: value falls, so the firm repays.</p>
<p><b>Step 4: APV.</b> V<sup>U</sup> = 100/1.10 + 120/1.10² = 90.90909 + 99.17355 = 190.0826. TS<sub>1</sub> = 0.25 × 0.05 × 76.5622 = 0.957028 and TS<sub>2</sub> = 0.25 × 0.05 × 43.8356 = 0.547945. The firm keeps a target ratio, so both go at r<sub>U</sub>: PV(TS) = 0.870025 + 0.452847 = 1.3229, and V<sup>L</sup><sub>0</sub> = 190.0826 + 1.3229 = 191.4055.</p>
<p><b>Step 5: FTE.</b> FCFE<sub>1</sub> = 100 − 0.75(0.05 × 76.5622) − 32.7266 = 64.4023. FCFE<sub>2</sub> = 120 − 0.75(0.05 × 43.835616) − 43.835616 = 74.520548. E<sub>0</sub> = 64.4023/1.133333 + 74.5205/1.133333² = 56.8256 + 58.0177 = 114.8433 = 191.4055 − 76.5622.</p>
<p><b>Check (consistency check 1):</b> WACC 191.4055 = APV 191.4055. Be honest about what this proves: APV took its debt levels from the WACC answer, so with r<sub>wacc</sub> = r<sub>U</sub> − d·r<sub>D</sub>·τ<sub>c</sub> the two must agree. It is a fixed point, not two independent valuations, but it catches the errors that happen: the shield at r<sub>D</sub> gives PV(TS) = 1.4085 and a total of 191.4911, and arithmetic slips show. A wrong β<sub>U</sub> moves both routes together and passes. FTE on the same debt path is a fixed point too; it catches errors in FCFE, such as a missing ΔD.</p></div>

<div class="callout warn"><span class="h">Errors that cost the sub-question</span>(1) The shield at r<sub>D</sub>, or τ<sub>c</sub>D, for a firm that rebalances. (2) V<sup>U</sup> at r<sub>wacc</sub>, or PV(TS) added to a WACC value: the shield counted twice. (3) Interest on D<sub>t</sub> instead of D<sub>t−1</sub>. (4) Leaving debt at its opening level, or leaving ΔD out of FCFE: dropping net borrowing shifts equity by −PV(ΔD) at r<sub>E</sub>, so a repaying firm's equity is overstated. (5) The comparable's weights in your own WACC. (6) Forgetting excess cash, or giving firm value when a price was asked.</div>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>FCF taxes full EBIT and never contains interest; the tax shield enters once, through the lower r<sub>wacc</sub> or as PV(TS) in APV.</li>
<li>The WACC method needs a constant D/V: roll V<sup>L</sup><sub>t</sub> back date by date, then set D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub>, with d the target D/V.</li>
<li>The tax shield is discounted at r<sub>U</sub> under constant D/E and at r<sub>D</sub> (or r<sub>f</sub>) under fixed permanent debt; only the latter gives PV(TS) = τ<sub>c</sub>D.</li>
<li>When V<sup>L</sup> falls, the target ratio forces a repayment ΔD<sub>t</sub> = d(V<sup>L</sup><sub>t</sub> − V<sup>L</sup><sub>t−1</sub>) that shareholders fund: it enters FCFE with a minus sign.</li>
<li>WACC = APV (check 1) is a fixed point: it catches a wrong shield rate and arithmetic slips, not a wrong β<sub>U</sub>.</li></ul></div>
`,
  checks: [
    {
      id: "kj4-s1",
      q: "A firm maintains a debt-to-equity ratio of 0.50, rebalancing every year. Which rate discounts its interest tax shield in an APV valuation?",
      options: [
        "r<sub>U</sub>, because future debt, and so the shield, moves with firm value",
        "r<sub>D</sub>, because the shield is generated by interest payments and is as risky as the debt",
        "r<sub>wacc</sub>, because that is the rate the firm's cash flows are discounted at",
        "r<sub>E</sub>, because the tax saving ends up with the shareholders",
      ],
      answer: 0,
      explanation: "Under a constant D/E the debt next year is a fixed fraction of next year's firm value, so the shield rises and falls with the assets and takes their rate, r<sub>U</sub>. The tempting r<sub>D</sub> is right only when the debt is a fixed contract amount, such as fixed permanent debt or a known repayment schedule. r<sub>wacc</sub> is the rate for FCF and already has the shield built in; the shield itself carries asset risk, so it takes r<sub>U</sub>.",
    },
    {
      id: "kj4-s2",
      q: "A firm holds D/V = 0.30 by rebalancing. Its levered value is 500 at date 1 and 400 at date 2. In the flow to equity for year 2, the net borrowing term is…",
      options: [
        "0: the firm keeps its debt at the date-1 level",
        "+30: debt changes by d times the change in value",
        "−30: the firm repays 0.30 × 100, and shareholders fund it",
        "−100: the whole fall in value is repaid to the lenders",
      ],
      answer: 2,
      explanation: "D<sub>1</sub> = 0.30 × 500 = 150 and D<sub>2</sub> = 0.30 × 400 = 120, so ΔD<sub>2</sub> = −30: value fell, so debt must fall with it, and the repayment is cash taken from shareholders. Leaving debt at 150 abandons the target ratio and overstates the cash reaching shareholders; the answer with +30 has the right size but the wrong sign.",
    },
    {
      id: "kj4-s3",
      q: "Your WACC value and your APV value agree to four decimals. The APV route used D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub> taken from the WACC value path. Which error could still be in your answer?",
      options: [
        "The tax shield discounted at r<sub>D</sub> although the firm rebalances",
        "An arithmetic slip in discounting the tax shields",
        "V<sup>U</sup> discounted at r<sub>wacc</sub> instead of r<sub>U</sub>",
        "A wrong β<sub>U</sub>, from misreading the comparable's debt and equity values",
      ],
      answer: 3,
      explanation: "A wrong β<sub>U</sub> flows into r<sub>U</sub>, r<sub>E</sub> and r<sub>wacc</sub> alike, so both routes are built on the same wrong input and still agree. The other three break the agreement: WACC = APV is a fixed point that catches a wrong shield rate, a double-counted shield and arithmetic slips. Guard β<sub>U</sub> by rereading the inputs, since weighted betas recomputed from the same β<sub>U</sub> cannot fail either.",
    },
    {
      id: "kj4-s4",
      q: "A classmate computes free cash flow as (EBIT − Interest)(1 − τ<sub>c</sub>) + Depreciation − CapEx − ΔNWC and discounts it at the after-tax WACC. Compared with the correct value, his firm value is…",
      options: [
        "correct: interest is a real cash cost, so it belongs in the cash flow",
        "too high: the tax shield is counted twice, in the cash flow and in the rate",
        "too low: the lenders are charged twice, in the cash flow and in the WACC",
        "correct only if the firm keeps its D/V constant",
      ],
      answer: 2,
      explanation: "His numerator is FCF − (1 − τ<sub>c</sub>) × Interest, strictly smaller than FCF, and the WACC already charges the cost of debt, so the value comes out too low. It is true that the shield now sits in both the cash flow and the rate, which is why the answer with 'too high' tempts, but the full after-tax interest he subtracts outweighs it. In the WACC method, financing costs belong in the denominator only.",
    },
  ],
  case: {
    id: "kj4-m1",
    open: true,
    topic: "Two periods: WACC, debt adjustment and APV",
    points: 6,
    minutes: 10,
    body: `<p>Senja Havbruk AS holds a fish-farming licence that expires in two years. It will generate free cash flow of NOK 70 million at the end of year 1 and NOK 95 million at the end of year 2, after which the firm is wound up with nothing left over. It keeps its debt at 0.50 of the value of its operations (excluding the excess cash), rebalancing at every year-end, and interest is charged on the debt outstanding at the start of each year. r<sub>U</sub> = 9.0000%, r<sub>D</sub> = 5.0000% and τ<sub>c</sub> = 22%. The firm also holds NOK 20 million of excess cash and has 5 million shares outstanding. Give rates to four decimals.</p>
<p>(a) Compute r<sub>E</sub> and the after-tax WACC, and value the firm by the WACC method at dates 1 and 0. (2 points)</p>
<p>(b) Give the debt at dates 0 and 1 and the change in debt at date 1, and say what it means for shareholders. Compute the value of equity and the price per share today. (2 points)</p>
<p>(c) Value the firm by the APV method. State which rate discounts the tax shield and why, and show that the result agrees with (a). (2 points)</p>`,
    solution: `<p><b>(a) Rates and WACC value.</b> D/E = 0.50/0.50 = 1.0000. MM II: r<sub>E</sub> = 0.0900 + 1.0000(0.0900 − 0.0500) = 0.1300 = 13.0000%. r<sub>wacc</sub> = 0.50(0.1300) + 0.50(0.0500)(0.78) = 0.065000 + 0.019500 = 0.0845 = 8.4500%. (Pre-tax WACC 0.50(0.1300) + 0.50(0.0500) = 0.0900 = r<sub>U</sub>, an identity under the course's convention.) Roll back from V<sup>L</sup><sub>2</sub> = 0: V<sup>L</sup><sub>1</sub> = 95/1.0845 = 87.5980, and V<sup>L</sup><sub>0</sub> = (70 + 87.5980)/1.0845 = 157.5980/1.0845 = 145.3186.</p>
<p><b>(b) Debt schedule, equity and price.</b> D<sub>0</sub> = 0.50 × 145.3186 = 72.6593 and D<sub>1</sub> = 0.50 × 87.5980 = 43.7990, so ΔD<sub>1</sub> = 43.7990 − 72.6593 = −28.8603. Value falls, so to hold D/V = 0.50 the firm must repay 28.8603 at date 1 (and the remaining 43.7990 at date 2). Shareholders fund the repayment: it enters FCFE<sub>1</sub> with a minus sign. E<sub>0</sub> = V<sup>L</sup><sub>0</sub> − D<sub>0</sub> + excess cash = 145.3186 − 72.6593 + 20.0000 = 92.6593, so the price per share is 92.6593/5 = 18.5319.</p>
<p><b>(c) APV.</b> The firm rebalances to a target ratio, so future debt moves with firm value, the shield carries asset risk, and it is discounted at r<sub>U</sub>. V<sup>U</sup> = 70/1.09 + 95/1.09² = 64.22018 + 79.95960 = 144.17978. TS<sub>1</sub> = 0.22 × 0.05 × 72.6593 = 0.799252 and TS<sub>2</sub> = 0.22 × 0.05 × 43.7990 = 0.481789, so PV(TS) = 0.799252/1.09 + 0.481789/1.09² = 0.733259 + 0.405512 = 1.138771. V<sup>L</sup><sub>0</sub> = 144.17978 + 1.138771 = 145.3186, the WACC value (consistency check 1). The agreement is a fixed point, since the debt levels came from the WACC path, but it would expose a shield discounted at r<sub>D</sub>: that gives PV(TS) = 1.1982 and a total of 145.3780.</p>`,
    criteria: [
      "r_E = 13.0000% and r_wacc = 8.4500%; V^L_1 = 87.5980 and V^L_0 = 145.3186",
      "D_0 = 72.6593, D_1 = 43.7990, a repayment of 28.8603 at date 1 funded by shareholders",
      "E_0 = 145.3186 − 72.6593 + 20 = 92.6593 and a price of 18.5319 per share",
      "Shield discounted at r_U because the firm rebalances; V^U = 144.1798 plus PV(TS) = 1.1388 gives 145.3186, equal to the WACC value",
    ],
  },
});
