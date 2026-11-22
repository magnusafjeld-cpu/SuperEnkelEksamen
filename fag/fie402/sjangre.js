/* ===================== FIE402 · SJANGERTRENING =====================
   Én stige per oppgavesjanger: korte steg fra null til eksamensnivå, hvert med
   teori, et lite eksempel og én flervalgsoppgave med utregning, kontroll og
   feilene bak de gale alternativene. Motoren: js/bundle-sjangre.js.

   id-ene (sjangerens og stegenes) er lagringsnøkler. De må aldri endres; et
   steg som skrives om til en annen oppgave, får ny id.

   BYGGET FIL, ikke rediger her. Sjangrene ligger i _sjangre/*.js, og settes
   sammen med: python3 tools/bygg-sjangre.py fie402
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sjangre = [];
/* sjanger 1 · tvilling · Twin firm: unlever, relever and the cost of capital */
window.EDU_DATA.sjangre.push({
  id: "tvilling",
  num: 1,
  title: "Twin firm: unlever, relever and the cost of capital",
  summary: "From the CAPM to a full WACC built on a comparable firm",
  chapters: [3, 4],
  exam: "11 of 11 papers · H2024 E5, H2025 E4",
  intro: `<p>Every FIE402 paper since 2015 has asked you to find a cost of capital you cannot observe directly. You take the business risk of a listed twin, strip out the twin's financing, put your own financing back on and build the WACC. In H2024 Exercise 5 (a twin) and H2025 Exercise 4 (your own firm, with a debt beta) this chain opens the valuation exercise. Every later number depends on it. At the end of the ladder you can run the whole chain to four decimals with debt betas on both sides. You will also know the slips that cost the most points. Two steps follow Kurbatov's 2026 lectures: net debt in the weights and an average over several twins.</p>`,
  steps: [
    {
      id: "tvilling-1",
      title: "The CAPM: from beta to required return",
      theory: `<p>Investors are only paid for risk they cannot diversify away. Beta measures that risk: how much a stock moves with the market. The CAPM turns beta into a required return.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">r<sub>f</sub> is the risk-free rate, E[R<sub>mkt</sub>] − r<sub>f</sub> the market risk premium. Check whether the exam gives you the market return or the premium.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%, β<sub>E</sub> = 1.2.</p><p>Premium = 8% − 3% = 5%. r<sub>E</sub> = 3% + 1.2 × 5% = 9%.</p></div>`,
      q: `<p>The risk-free rate is 4%, the expected market return is 10% and a stock's beta is 1.5. What is the stock's required return?</p>`,
      options: ["9.00%", "13.00%", "15.00%", "19.00%"],
      answer: 1,
      solution: `<p>Market risk premium = 10% − 4% = 6%.</p><p>r<sub>E</sub> = 4% + 1.5 × 6% = 4% + 9% = <b>13.00%</b>.</p>`,
      check: `<p>A beta above 1 must give a return above the market's 10%: 13% does. Backwards: (13% − 4%) / 6% = 1.5, the beta you started with.</p>`,
      traps: [
        "Forgot to add the risk-free rate: 1.5 × 6% = 9%.",
        null,
        "Multiplied beta by the market return and dropped the risk-free rate: 1.5 × 10% = 15%.",
        "Used the market return instead of the premium: 4% + 1.5 × 10% = 19%.",
      ],
    },
    {
      id: "tvilling-4",
      title: "Market-value weights: D/V, E/V and D/E",
      theory: `<p>Every weight in the twin-firm chain is a market value. Equity is the share price times the shares outstanding, never the book equity on the balance sheet. Debt is its market value, which the exam usually gives you. Firm value is V = E + D.</p>
<div class="formula"><div class="eq">E = price × shares, &nbsp;D/V = D/(E + D), &nbsp;E/V = 1 − D/V</div>
<div class="eq">D/V = (D/E)/(1 + D/E), &nbsp;D/E = (D/V)/(1 − D/V)</div>
<div class="where">D/E and D/V are different numbers for the same firm: a D/E of 0.25 is a D/V of 0.20. Exams state leverage either way, so convert before you weight anything.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>20 million shares at NOK 45 and debt worth NOK 300 million.</p><p>E = 20 × 45 = 900. V = 900 + 300 = 1 200. D/V = 300/1 200 = 0.25, E/V = 0.75, D/E = 300/900 = 0.3333.</p><p>The other way: a firm with D/E = 0.25 has D/V = 0.25/1.25 = 0.20.</p></div>`,
      q: `<p>A firm has 23 million shares trading at NOK 50. Its debt has a market value of NOK 100 million. The balance sheet shows book equity of NOK 400 million. What is the firm's debt-to-value ratio D/V?</p>`,
      options: ["8.00%", "8.70%", "20.00%", "25.00%"],
      answer: 0,
      solution: `<p>E = 23 million × NOK 50 = NOK 1 150 million, at market value.</p><p>V = 1 150 + 100 = NOK 1 250 million.</p><p>D/V = 100/1 250 = <b>8.00%</b>. The book equity of 400 plays no part.</p>`,
      check: `<p>Go through D/E instead: D/E = 100/1 150 = 0.086957. The conversion gives D/V = 0.086957/1.086957 = 0.0800. Same 8.00%.</p>`,
      traps: [
        null,
        "Reported D/E instead of D/V: 100/1 150 = 8.70%.",
        "Used book equity instead of market equity: 100/(400 + 100) = 20.00%.",
        "Used book equity and reported D/E: 100/400 = 25.00%.",
      ],
    },
    {
      id: "tvilling-5",
      title: "Unlevering beta when debt is risk-free",
      theory: `<p>A firm is a portfolio of its equity and its debt, so its asset beta β<sub>U</sub> is the value-weighted average of the two. β<sub>U</sub> measures the risk of the business alone, so two firms in the same business share it even when their leverage differs. That is why you can lift it from a twin. When the debt is risk-free, β<sub>D</sub> = 0 and only the equity term survives.</p>
<div class="formula"><div class="eq">β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub></div>
<div class="eq">β<sub>U</sub> = (E/V)β<sub>E</sub> &nbsp;when β<sub>D</sub> = 0</div>
<div class="where">This course weights without taxes: the firm keeps a target D/E, so the tax shield carries the same risk as the assets. Do not use the textbook version with (1 − τ<sub>c</sub>) here. It belongs to a fixed, permanent amount of debt, where the shield is as safe as the debt (the valuation ladder has a step on it). With risk-free debt, β<sub>U</sub> is always below β<sub>E</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A twin has equity worth 900 and risk-free debt worth 300. β<sub>E</sub> = 1.20.</p><p>E/V = 900/1 200 = 0.75. β<sub>U</sub> = 0.75 × 1.20 + 0.25 × 0 = 0.90.</p></div>`,
      q: `<p>A listed twin keeps a constant debt-to-equity ratio of 0.60. Its debt is risk-free and its equity beta is 1.60. The corporate tax rate is 25%. Using the course convention, what is the twin's unlevered beta?</p>`,
      options: ["2.56", "1.10", "1.00", "0.64"],
      answer: 2,
      solution: `<p>Convert D/E to weights: E/V = 1/1.60 = 0.625 and D/V = 0.60/1.60 = 0.375.</p><p>β<sub>D</sub> = 0, since the debt is risk-free.</p><p>β<sub>U</sub> = 0.625 × 1.60 + 0.375 × 0 = <b>1.00</b>. The tax rate does not enter.</p>`,
      check: `<p>Divide back: β<sub>E</sub> = β<sub>U</sub> / (E/V) = 1.00 / 0.625 = 1.60, the beta you were given. And 1.00 is below 1.60, as unlevering with risk-free debt must give.</p>`,
      traps: [
        "Relevered instead of unlevering: 1.60 × (1 + 0.60) = 2.56.",
        "Used the textbook formula with taxes: 1.60 / (1 + 0.75 × 0.60) = 1.10.",
        null,
        "Used D/E as the debt weight, so E/V = 1 − 0.60: 0.40 × 1.60 = 0.64.",
      ],
    },
    {
      id: "tvilling-6",
      title: "The debt beta and unlevering with risky debt",
      theory: `<p>Debt is only risk-free if it is repaid in every state. When debt is expected to return more than r<sub>f</sub>, part of its default risk is systematic, so it has a positive beta. The exam gives you r<sub>D</sub>, not β<sub>D</sub>, so run the CAPM backwards: the debt's excess return divided by the market's excess return. Then keep β<sub>D</sub> in the weighting.</p>
<div class="formula"><div class="eq">β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>) / (E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="eq">β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub></div>
<div class="where">r<sub>D</sub> is the expected return on the debt. The same rearrangement turns a cost of equity into β<sub>E</sub>: β<sub>E</sub> = (r<sub>E</sub> − r<sub>f</sub>) / premium. Setting β<sub>D</sub> = 0 when r<sub>D</sub> &gt; r<sub>f</sub> drops a positive term, so it understates β<sub>U</sub> and every discount rate built on it. The firm then looks more valuable than it is.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>f</sub> = 3%, premium 5%. A twin has E/V = 0.70, β<sub>E</sub> = 1.50 and r<sub>D</sub> = 4%.</p><p>β<sub>D</sub> = (4% − 3%) / 5% = 0.20.</p><p>β<sub>U</sub> = 0.70 × 1.50 + 0.30 × 0.20 = 1.05 + 0.06 = 1.11.</p></div>`,
      q: `<p>The risk-free rate is 2% and the expected market return is 8%. A twin has a debt-to-value ratio of 0.40, an equity beta of 1.75 and an expected return on its debt of 3.5%. What is the twin's unlevered beta, to four decimals?</p>`,
      options: ["1.0500", "1.1500", "1.2833", "1.3214"],
      answer: 1,
      solution: `<p>Premium = 8% − 2% = 6%.</p><p>β<sub>D</sub> = (3.5% − 2%) / 6% = 1.5% / 6% = 0.2500.</p><p>β<sub>U</sub> = 0.60 × 1.75 + 0.40 × 0.25 = 1.0500 + 0.1000 = <b>1.1500</b>.</p>`,
      check: `<p>β<sub>U</sub> must lie between β<sub>D</sub> = 0.25 and β<sub>E</sub> = 1.75. It must also sit above the 1.0500 you get with β<sub>D</sub> = 0, because risky debt carries part of the business risk. 1.1500 passes both.</p>`,
      traps: [
        "Forgot the debt beta and set β<sub>D</sub> = 0: 0.60 × 1.75 = 1.0500.",
        null,
        "Forgot to subtract r<sub>f</sub> in the debt beta: β<sub>D</sub> = 3.5% / 6% = 0.5833, so β<sub>U</sub> = 1.0500 + 0.40 × 0.5833 = 1.2833.",
        "Read D/V = 0.40 as D/E, giving weights 1/1.4 and 0.4/1.4: 0.7143 × 1.75 + 0.2857 × 0.25 = 1.2500 + 0.0714 = 1.3214.",
      ],
    },
    {
      id: "tvilling-7",
      title: "The unlevered cost of capital, two ways",
      theory: `<p>r<sub>U</sub> is the return investors require on the business itself, as if it had no debt. You can reach it two ways. Put β<sub>U</sub> into the CAPM, or weight the returns on the firm's two claims directly. That weighted average is the pre-tax WACC. Under this course's convention (a target D/E) it equals r<sub>U</sub>.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="eq">r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub></div>
<div class="where">No tax term. r<sub>U</sub> belongs to the assets. The assets do not care about the interest deduction. Taxes enter only in the after-tax WACC. Use the route the question gives you inputs for: betas or returns.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A twin has E/V = 0.70, β<sub>E</sub> = 1.50 and β<sub>D</sub> = 0.20, so β<sub>U</sub> = 1.11. r<sub>f</sub> = 3%, premium 5%.</p><p>Through the beta: r<sub>U</sub> = 3% + 1.11 × 5% = 8.55%.</p><p>Through the returns: r<sub>E</sub> = 3% + 1.50 × 5% = 10.5% and r<sub>D</sub> = 3% + 0.20 × 5% = 4%, so r<sub>U</sub> = 0.70 × 10.5% + 0.30 × 4% = 7.35% + 1.20% = 8.55%.</p></div>`,
      q: `<p>A twin keeps a debt-to-equity ratio of 0.25. Its cost of equity is 11% and the expected return on its debt is 4.5%. The risk-free rate is 3%, the market risk premium is 6% and the corporate tax rate is 25%. What is the twin's unlevered cost of capital, to four decimals?</p>`,
      options: ["9.4750%", "9.3750%", "9.7000%", "9.4000%"],
      answer: 2,
      solution: `<p>Weights: D/V = 0.25/1.25 = 0.20 and E/V = 0.80.</p><p>r<sub>U</sub> = 0.80 × 11% + 0.20 × 4.5% = 8.80% + 0.90% = <b>9.7000%</b>. The tax rate does not enter.</p>`,
      check: `<p>Take the beta route. β<sub>E</sub> = (11% − 3%) / 6% = 1.333333 and β<sub>D</sub> = (4.5% − 3%) / 6% = 0.250000. β<sub>U</sub> = 0.80 × 1.333333 + 0.20 × 0.25 = 1.066667 + 0.050000 = 1.116667. r<sub>U</sub> = 3% + 1.116667 × 6% = 3% + 6.70% = 9.70%. The two routes are the same arithmetic in different units, so this catches slips, not a wrong weight.</p>`,
      traps: [
        "Put taxes into r<sub>U</sub>: 0.80 × 11% + 0.20 × 4.5% × 0.75 = 8.80% + 0.675% = 9.4750%. That is an after-tax WACC, not r<sub>U</sub>.",
        "Used D/E as the debt weight: 0.75 × 11% + 0.25 × 4.5% = 8.25% + 1.125% = 9.3750%.",
        null,
        "Treated the debt as risk-free and weighted r<sub>f</sub> in place of r<sub>D</sub>: 0.80 × 11% + 0.20 × 3% = 8.80% + 0.60% = 9.4000%.",
      ],
    },
    {
      id: "tvilling-16",
      title: "Several twins: average their unlevered cost of capital",
      theory: `<p>One twin gives a noisy estimate. Kurbatov (lecture 8) takes several comparable firms, turns each into r<sub>U</sub> with its own weights and averages the results. Average r<sub>U</sub> or β<sub>U</sub>, never r<sub>E</sub>: each twin's r<sub>E</sub> carries its own leverage. Twins that are closer to your firm in size and Tobin's Q deserve more weight. On the board he weighted each twin by one over its distance to your firm, or by one over the squared distance, which tilts the weights even more toward the closest twin.</p>
<div class="formula"><div class="eq">r<sub>U,i</sub> = (E/V)<sub>i</sub> r<sub>E,i</sub> + (D/V)<sub>i</sub> r<sub>D,i</sub></div>
<div class="eq">r<sub>U</sub> = Σ w<sub>i</sub> r<sub>U,i</sub> &nbsp;·&nbsp; w<sub>i</sub> = (1/dist<sub>i</sub>)/Σ<sub>j</sub>(1/dist<sub>j</sub>)</div>
<div class="where">Equal weights are the special case where all twins are equally close. Convert each twin's D/E to D/V before you weight its returns. The weights sum to one.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 8</span><p>Comparable 1: r<sub>E</sub> = 12%, r<sub>D</sub> = 6%, D/V = 40%, so r<sub>U</sub> = 0.60 × 12% + 0.40 × 6% = 7.2% + 2.4% = 9.6%.</p><p>Comparable 2: r<sub>E</sub> = 10.7%, r<sub>D</sub> = 5.5%, D/V = 25%, so r<sub>U</sub> = 0.75 × 10.7% + 0.25 × 5.5% = 8.025% + 1.375% = 9.4%.</p><p>Equal weights give 9.5%. If comparable 1 were twice as close, the weights would be 2/3 and 1/3: (2/3)(9.6%) + (1/3)(9.4%) = 9.5333%.</p></div>`,
      q: `<p>You have two listed twins, both with constant leverage. Twin A has a cost of equity of 10%, an expected return on its debt of 4.5% and a debt-to-equity ratio of 0.25. Twin B has a cost of equity of 11.5%, an expected return on its debt of 5% and a debt-to-value ratio of 0.30. Measured on size and Tobin's Q, A lies at distance 2 from your firm and B at distance 6. You weight each twin by 1/distance. What unlevered cost of capital do you use, to four decimals?</p>`,
      options: ["9.2250%", "10.3750%", "9.3875%", "9.0625%"],
      answer: 3,
      solution: `<p><b>Twin A.</b> D/V = 0.25/1.25 = 0.20. r<sub>U,A</sub> = 0.80 × 10% + 0.20 × 4.5% = 8.00% + 0.90% = 8.90%.</p><p><b>Twin B.</b> r<sub>U,B</sub> = 0.70 × 11.5% + 0.30 × 5% = 8.05% + 1.50% = 9.55%.</p><p><b>Weights.</b> 1/2 + 1/6 = 2/3, so w<sub>A</sub> = 0.5/(2/3) = 0.75 and w<sub>B</sub> = 0.25.</p><p>r<sub>U</sub> = 0.75 × 8.90% + 0.25 × 9.55% = 6.675% + 2.3875% = <b>9.0625%</b>.</p>`,
      check: `<p>The average must lie between the two twins and nearer the closer one, A. Measure the gaps: 9.0625% − 8.90% = 0.1625 points and 9.55% − 9.0625% = 0.4875 points. The ratio is 1 to 3, the inverse of the 3 to 1 weights ✓. The gap ratio holds for any weighted average, so this check confirms the arithmetic and the direction of the weights, not the twins' own r<sub>U</sub>. It fails on reversed weights, which put the average nearer B.</p>`,
      traps: [
        "Gave the twins equal weights although A is three times closer: (8.90% + 9.55%)/2 = 9.2250%.",
        "Averaged the twins' costs of equity instead of their r<sub>U</sub>: 0.75 × 10% + 0.25 × 11.5% = 10.3750%. Each r<sub>E</sub> still carries its twin's leverage.",
        "Weighted by distance instead of 1/distance, which favours the far twin: 0.25 × 8.90% + 0.75 × 9.55% = 9.3875%.",
        null,
      ],
    },
    {
      id: "tvilling-9",
      title: "MM Proposition II: relevering the cost of equity",
      theory: `<p>Once you have the business risk, you put your own financing back on. More debt puts the same business risk on a smaller equity base, so the cost of equity rises with D/E. If you have r<sub>U</sub> and your own r<sub>D</sub>, MM Proposition II, which is on the formula sheet, gives r<sub>E</sub> directly. The multiplier is D/E, not D/V. When the firm keeps a target D/E the formula holds with corporate taxes too, so no (1 − τ<sub>c</sub>) enters.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="eq">β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>)</div>
<div class="where">Equity holders earn r<sub>U</sub> plus a premium for financial risk. The premium grows with D/E and with the spread between r<sub>U</sub> and what the lenders earn. The second line is the same relevering in betas: put its β<sub>E</sub> into the CAPM and you get the same r<sub>E</sub>. Use your own D/E and your own r<sub>D</sub> or β<sub>D</sub>, never the twin's.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>U</sub> = 9%, D/E = 0.50, r<sub>D</sub> = 5%.</p><p>r<sub>E</sub> = 9% + 0.50 × (9% − 5%) = 9% + 2% = 11%.</p></div>`,
      q: `<p>Your firm's unlevered cost of capital is 8.1%, taken from a twin that runs a debt-to-equity ratio of 0.60. Your firm will keep a constant debt-to-value ratio of 0.25. The expected return on its debt will be 4.5%. The corporate tax rate is 22%. What is your cost of equity, to four decimals?</p>`,
      options: ["8.1000%", "9.0000%", "9.0360%", "9.3000%"],
      answer: 3,
      solution: `<p>Your D/E = 0.25/0.75 = 1/3.</p><p>r<sub>E</sub> = 8.1% + (1/3) × (8.1% − 4.5%) = 8.1% + (1/3) × 3.6% = 8.1% + 1.2% = <b>9.3000%</b>.</p>`,
      check: `<p>The pre-tax WACC at your weights must return r<sub>U</sub>: 0.75 × 9.3% + 0.25 × 4.5% = 6.975% + 1.125% = 8.1%. This check bites on the most common slip. With D/V in place of D/E you get r<sub>E</sub> = 9.0%. Then 0.75 × 9.0% + 0.25 × 4.5% = 7.875%, not 8.1%.</p>`,
      traps: [
        "Stopped at r<sub>U</sub> and never relevered: 8.1000% is the cost of capital of the assets, but your equity carries the debt's financial risk on top.",
        "Used D/V in place of D/E: 8.1% + 0.25 × 3.6% = 9.0000%.",
        "Put the textbook tax factor into MM II: 8.1% + (1/3) × 0.78 × 3.6% = 8.1% + 0.936% = 9.0360%.",
        null,
      ],
    },
    {
      id: "tvilling-10",
      title: "The after-tax WACC",
      theory: `<p>Interest is tax-deductible, so each krone of interest saves τ<sub>c</sub> in tax. The after-tax WACC builds that saving into the discount rate by pricing debt at r<sub>D</sub>(1 − τ<sub>c</sub>). It is the rate for the WACC method, which discounts free cash flow and adds no separate tax shield. Use the weights of the firm you are valuing.</p>
<div class="formula"><div class="eq">r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>)</div>
<div class="where">The tax factor touches r<sub>D</sub> only, never r<sub>E</sub>. The after-tax WACC sits below the pre-tax WACC by exactly (D/V)τ<sub>c</sub>r<sub>D</sub>, so r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>E/V = 0.75, r<sub>E</sub> = 10%, r<sub>D</sub> = 4%, τ<sub>c</sub> = 25%.</p><p>r<sub>wacc</sub> = 0.75 × 10% + 0.25 × 4% × 0.75 = 7.50% + 0.75% = 8.25%.</p></div>`,
      q: `<p>Your firm keeps a debt-to-equity ratio of 0.50. Its cost of equity is 12%, the expected return on its debt is 6% and the corporate tax rate is 22%. What is its after-tax WACC, to four decimals?</p>`,
      options: ["7.8000%", "8.3400%", "9.5600%", "10.0000%"],
      answer: 2,
      solution: `<p>Weights: D/V = 0.50/1.50 = 1/3 and E/V = 2/3.</p><p>After-tax cost of debt = 6% × (1 − 0.22) = 4.68%.</p><p>r<sub>wacc</sub> = (2/3) × 12% + (1/3) × 4.68% = 8.00% + 1.56% = <b>9.5600%</b>.</p>`,
      check: `<p>Pre-tax WACC = (2/3) × 12% + (1/3) × 6% = 8% + 2% = 10% = r<sub>U</sub>. The tax shield per krone of value is (1/3) × 0.22 × 6% = 0.44%. Then 10% − 0.44% = 9.56%. The shortcut is the same formula rearranged, so it catches slips in the arithmetic, not a wrong weight.</p>`,
      traps: [
        "Applied the tax factor to the whole WACC: 10% × 0.78 = 7.8000%.",
        "Used D/E = 0.50 as the debt weight: 0.50 × 12% + 0.50 × 4.68% = 6.00% + 2.34% = 8.3400%.",
        null,
        "Left out the tax factor and reported the pre-tax WACC: (2/3) × 12% + (1/3) × 6% = 10.0000%.",
      ],
    },
    {
      id: "tvilling-11",
      title: "What leverage changes and what it leaves alone",
      theory: `<p>Leverage changes who carries the business risk, not how much of it there is. β<sub>U</sub> and r<sub>U</sub> belong to the assets, so they stay put when the firm swaps equity for debt. β<sub>E</sub> and r<sub>E</sub> rise, because the same risk now sits on a smaller equity base. The pre-tax WACC stays at r<sub>U</sub>. Only the after-tax WACC falls, because more debt means a larger tax shield.</p>
<div class="formula"><div class="eq">r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub></div>
<div class="where">r<sub>U</sub> is fixed by the business. A higher D/V and a higher r<sub>D</sub> both enlarge the subtracted term, so the after-tax WACC falls even though r<sub>E</sub> and r<sub>D</sub> both rise.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>β<sub>U</sub> = 1.00, r<sub>f</sub> = 3%, premium 5%, so r<sub>U</sub> = 8%. τ<sub>c</sub> = 22%.</p><p>At D/E = 0.25 with β<sub>D</sub> = 0.10 (r<sub>D</sub> = 3.5%): β<sub>E</sub> = 1.00 + 0.25 × 0.90 = 1.225 and r<sub>wacc</sub> = 8% − 0.20 × 0.22 × 3.5% = 7.846%.</p><p>At D/E = 0.75 with β<sub>D</sub> = 0.30 (r<sub>D</sub> = 4.5%): β<sub>E</sub> = 1.00 + 0.75 × 0.70 = 1.525 and r<sub>wacc</sub> = 8% − (3/7) × 0.22 × 4.5% = 8% − 0.424% = 7.576%.</p><p>r<sub>U</sub> is 8% both times.</p></div>`,
      q: `<p>Moen ASA issues debt and buys back shares, raising its debt-to-equity ratio from 0.40 to 1.00. Its assets do not change. Before the change its unlevered beta is 0.80. Its debt beta rises from 0.05 to 0.20. It will keep the new D/E constant. Corporate tax is 22%. Which statement is correct?</p>`,
      options: [
        "β<sub>U</sub> rises, because the firm now carries more debt and therefore more risk.",
        "β<sub>E</sub> stays the same, while β<sub>U</sub> rises to reflect the new leverage.",
        "The after-tax WACC rises, because r<sub>E</sub> and r<sub>D</sub> both rise and a weighted average of two higher returns must be higher.",
        "β<sub>U</sub> and the pre-tax WACC are unchanged, β<sub>E</sub> rises and the after-tax WACC falls.",
      ],
      answer: 3,
      solution: `<p>The assets did not change, so β<sub>U</sub> stays at 0.80 and r<sub>U</sub>, the pre-tax WACC, stays put.</p><p>β<sub>E</sub> before = 0.80 + 0.40 × (0.80 − 0.05) = 0.80 + 0.30 = 1.10. After = 0.80 + 1.00 × (0.80 − 0.20) = 0.80 + 0.60 = 1.40. It rises.</p><p>r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>. D/V rises from 0.40/1.40 = 0.2857 to 0.50 and r<sub>D</sub> rises with β<sub>D</sub>. Both make the subtracted term larger, so the after-tax WACC <b>falls</b>.</p>`,
      check: `<p>Weight the betas at each structure. Before: 0.7143 × 1.10 + 0.2857 × 0.05 = 0.7857 + 0.0143 = 0.80. After: 0.50 × 1.40 + 0.50 × 0.20 = 0.70 + 0.10 = 0.80. Both return β<sub>U</sub> (the course's consistency check 2): leverage moved risk between the claims without creating any.</p>`,
      traps: [
        "Confuses financial risk with business risk. β<sub>U</sub> belongs to the assets, which did not change, so it stays at 0.80.",
        "Has the two betas the wrong way round. β<sub>E</sub> rises from 1.10 to 1.40 while β<sub>U</sub> stays at 0.80.",
        "Forgets that the weights shift toward the cheaper claim. Even the pre-tax WACC stays at r<sub>U</sub>. The after-tax WACC, r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>, falls.",
        null,
      ],
    },
    {
      id: "tvilling-12",
      title: "Excess cash: strip it out before unlevering",
      theory: `<p>A firm's market value of equity covers two things: the operating business and any excess cash. Cash is risk-free with a beta of zero, so it drags the measured equity beta down. To get the beta of the business, take the cash out. With no debt, the equity beta is a weighted average of the operations' beta and a zero.</p>
<div class="formula"><div class="eq">β<sub>E</sub> × E = β<sub>ops</sub> × (E − Cash) + 0 × Cash</div>
<div class="eq">β<sub>U</sub> = β<sub>ops</sub> = β<sub>E</sub> × E / (E − Cash)</div>
<div class="where">Cash works as negative debt. With net cash the asset beta lies <i>above</i> the equity beta, so the claim that β<sub>U</sub> is always below β<sub>E</sub> is false. In a valuation you add the cash back at face value after discounting the operations.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Market value of equity 500, excess cash 100, no debt, β<sub>E</sub> = 0.80.</p><p>Operations = 500 − 100 = 400. β<sub>ops</sub> = 0.80 × 500/400 = 1.00.</p></div>`,
      q: `<p>A firm has no debt. Its 20 million shares trade at NOK 60. It holds NOK 300 million of excess cash that its operations do not need. Its equity beta is 0.90. The risk-free rate is 3% and the expected market return is 8%. What is the unlevered cost of capital of its operations, to four decimals?</p>`,
      options: ["6.3750%", "9.0000%", "6.0000%", "7.5000%"],
      answer: 1,
      solution: `<p>E = 20 million × NOK 60 = NOK 1 200 million. Operations = 1 200 − 300 = NOK 900 million.</p><p>β<sub>ops</sub> = 0.90 × 1 200/900 = 1.20.</p><p>Premium = 8% − 3% = 5%. r<sub>U</sub> = 3% + 1.20 × 5% = 3% + 6% = <b>9.0000%</b>.</p>`,
      check: `<p>Weight the two assets back into the equity beta: (900/1 200) × 1.20 + (300/1 200) × 0 = 0.90 + 0 = 0.90 = β<sub>E</sub>. And β<sub>ops</sub> = 1.20 lies above β<sub>E</sub> = 0.90, as it must with net cash.</p>`,
      traps: [
        "Scaled the beta the wrong way, by (E − Cash)/E: 0.90 × 0.75 = 0.675, so 3% + 0.675 × 5% = 6.3750%.",
        null,
        "Forgot to add the risk-free rate: 1.20 × 5% = 6.0000%.",
        "Took the equity beta as the business beta and ignored the cash: 3% + 0.90 × 5% = 7.5000%.",
      ],
    },
    {
      id: "tvilling-15",
      title: "Net debt: take the excess cash off the debt",
      theory: `<p>Kurbatov weights with <b>net debt</b>: debt minus the cash the firm does not need to run its business. Excess cash is a risk-free asset with a beta of zero, so it cancels an equal amount of risk-free debt. Only excess cash comes off. Cash the operations need stays part of the business. Then unlever on V = E + D<sub>net</sub> as usual.</p>
<div class="formula"><div class="eq">D<sub>net</sub> = D − (cash − operating cash) &nbsp;·&nbsp; V = E + D<sub>net</sub></div>
<div class="eq">β<sub>U</sub> = [E/(E + D<sub>net</sub>)]β<sub>E</sub> + [D<sub>net</sub>/(E + D<sub>net</sub>)]β<sub>D</sub></div>
<div class="where">With risk-free debt the second term is zero. The same net weights go into the WACC: lecture 7 uses D = 320 − 20 = 300. PS2 Exercise 7 makes the rule explicit: only the excess cash comes off, never the cash the operations need. Leaving excess cash inside D overstates leverage and understates β<sub>U</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 7</span><p>H&amp;M has 12 million shares at 100, so E = 1 200. Its debt of 400 has β<sub>D</sub> = 0. It holds 150 of cash and needs 50 of it to operate.</p><p>D<sub>net</sub> = 400 − (150 − 50) = 300 and V = 1 500. β<sub>U</sub> = (1 200/1 500) × 1.25 = 1.00, so r<sub>U</sub> = 4% + 1.00 × 6% = 10%.</p></div>`,
      q: `<p>A listed twin has 15 million shares trading at NOK 80 and debt worth NOK 500 million. Its debt is risk-free. It holds NOK 200 million of cash, of which NOK 50 million is needed to run its operations. Its equity beta is 1.24. The risk-free rate is 3% and the market risk premium is 6%. Using net debt, what is the twin's unlevered cost of capital, to four decimals?</p>`,
      options: ["8.7600%", "8.2518%", "8.9520%", "7.8259%"],
      answer: 0,
      solution: `<p>E = 15 million × NOK 80 = NOK 1 200 million.</p><p>Excess cash = 200 − 50 = 150, so D<sub>net</sub> = 500 − 150 = 350 and V = 1 200 + 350 = 1 550.</p><p>β<sub>U</sub> = (1 200/1 550) × 1.24 + (350/1 550) × 0 = 0.9600.</p><p>r<sub>U</sub> = 3% + 0.96 × 6% = 3% + 5.76% = <b>8.7600%</b>.</p>`,
      check: `<p>Relever with the net weights: β<sub>U</sub>(1 + D<sub>net</sub>/E) = 0.96 × (1 + 350/1 200) = 0.96 × 1.291667 = 1.24, the beta you were given. That only confirms the arithmetic. The bounds are the real test: netting none of the cash gives β<sub>U</sub> = 0.8753 and netting all of it gives 0.9920, so the answer must lie between them. 0.9600 does.</p>`,
      traps: [
        null,
        "Left all the cash in the firm and used gross debt: β<sub>U</sub> = (1 200/1 700) × 1.24 = 0.875294, so r<sub>U</sub> = 3% + 0.875294 × 6% = 8.2518%.",
        "Netted all the cash, also the 50 the operations need: D<sub>net</sub> = 300, β<sub>U</sub> = (1 200/1 500) × 1.24 = 0.9920 and r<sub>U</sub> = 8.9520%.",
        "Added the excess cash to the debt instead of subtracting it: β<sub>U</sub> = (1 200/1 850) × 1.24 = 0.804324, so r<sub>U</sub> = 7.8259%.",
      ],
    },
    {
      id: "tvilling-13",
      title: "The twin-firm chain with risk-free twin debt",
      theory: `<p>Now chain the steps, as the opening sub-questions of H2024 Exercise 5 do. The twin supplies the business risk and you supply the leverage. Carry four decimals all the way, because every later number depends on the first.</p>
<ol><li>Convert the twin's leverage to weights and unlever: β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>.</li><li>CAPM forwards: r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub> × premium.</li><li>Convert your own D/V to D/E and relever with MM II.</li><li>Build the after-tax WACC at your own weights.</li></ol>
<div class="formula"><div class="eq">twin β<sub>E</sub> → β<sub>U</sub> → r<sub>U</sub> → your r<sub>E</sub> → your r<sub>wacc</sub></div>
<div class="where">Only β<sub>U</sub> and r<sub>U</sub> cross from the twin to you. Everything after them uses your own D/E, D/V and r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Twin: D/E = 1.00, risk-free debt, β<sub>E</sub> = 1.60. r<sub>f</sub> = 3%, premium 5%. You: D/V = 0.20, r<sub>D</sub> = 4%, τ<sub>c</sub> = 25%.</p><p>β<sub>U</sub> = 0.50 × 1.60 = 0.80. r<sub>U</sub> = 3% + 0.80 × 5% = 7%.</p><p>Your D/E = 0.20/0.80 = 0.25. r<sub>E</sub> = 7% + 0.25 × (7% − 4%) = 7.75%.</p><p>r<sub>wacc</sub> = 0.80 × 7.75% + 0.20 × 4% × 0.75 = 6.20% + 0.60% = 6.80%.</p></div>`,
      q: `<p>You must find the cost of capital for an unlisted firm. A listed twin with the same business risk keeps a debt-to-equity ratio of 0.50. Its debt is risk-free and its equity beta is 1.35. The risk-free rate is 4% and the expected market return is 9.5%. Your firm will keep a constant debt-to-value ratio of 0.30. The expected return on its debt will be 5%. The corporate tax rate is 22%. What is your firm's after-tax WACC, to four decimals?</p>`,
      options: ["8.6200%", "8.8175%", "8.9500%", "11.0950%"],
      answer: 0,
      solution: `<p><b>Unlever the twin.</b> D/E = 0.50 gives E/V = 1/1.50 and D/V = 0.50/1.50. β<sub>U</sub> = (1/1.50) × 1.35 + (0.50/1.50) × 0 = 0.9000.</p><p><b>r<sub>U</sub>.</b> Premium = 9.5% − 4% = 5.5%. r<sub>U</sub> = 4% + 0.90 × 5.5% = 4% + 4.95% = 8.9500%.</p><p><b>Relever.</b> Your D/E = 0.30/0.70 = 3/7 = 0.428571. r<sub>E</sub> = 8.95% + (3/7) × (8.95% − 5%) = 8.95% + 1.692857% = 10.642857%.</p><p><b>WACC.</b> r<sub>wacc</sub> = 0.70 × 10.642857% + 0.30 × 5% × 0.78 = 7.450000% + 1.170000% = <b>8.6200%</b>.</p>`,
      check: `<p>Shortcut: r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = 8.95% − 0.30 × 0.22 × 5% = 8.95% − 0.33% = 8.62%. Weighted betas at your structure: your β<sub>D</sub> = (5% − 4%) / 5.5% = 0.181818 and β<sub>E</sub> = (10.642857% − 4%) / 5.5% = 1.207792, so 0.70 × 1.207792 + 0.30 × 0.181818 = 0.845455 + 0.054545 = 0.900000 = β<sub>U</sub>. Both checks confirm the arithmetic after r<sub>U</sub>. Neither can tell you whether you unlevered the twin with the right weights.</p>`,
      traps: [
        null,
        "Relevered with the twin's D/E of 0.50 instead of your own 3/7: r<sub>E</sub> = 8.95% + 0.50 × 3.95% = 10.925%, so r<sub>wacc</sub> = 0.70 × 10.925% + 1.17% = 7.6475% + 1.17% = 8.8175%.",
        "Left out the tax factor and reported the pre-tax WACC, which is r<sub>U</sub>: 0.70 × 10.642857% + 0.30 × 5% = 7.45% + 1.50% = 8.9500%.",
        "Skipped the unlevering and treated the twin's β<sub>E</sub> = 1.35 as β<sub>U</sub>: r<sub>U</sub> = 11.425%, so r<sub>wacc</sub> = 11.425% − 0.33% = 11.0950%.",
      ],
    },
    {
      id: "tvilling-14",
      title: "The full chain: market values and debt betas on both sides",
      theory: `<p>The hardest version combines everything. The twin's weights come from a share price, the twin's debt is risky and your own debt earns a different return from the twin's. H2025 Exercise 4 opened with a debt beta from r<sub>D</sub>. H2024 Exercise 5 made you carry β<sub>U</sub> from a twin and switch between D/E and D/V. Here you do both in one chain.</p>
<div class="formula"><div class="eq">E = price × shares, &nbsp;β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>) / premium</div>
<div class="eq">β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>, &nbsp;r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub> × premium</div>
<div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>), &nbsp;r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>)</div>
<div class="where">The first two lines use the twin's market values and the twin's r<sub>D</sub>. The last line uses your own D/E, D/V and r<sub>D</sub>. Three slips cost the most here: book equity in the twin's weights, a forgotten twin debt beta and relevering with the twin's D/E.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Twin: 35 million shares at NOK 20, debt worth NOK 300 million, r<sub>E</sub> = 12%, r<sub>D</sub> = 5%. r<sub>f</sub> = 3%, premium 6%. You: D/V = 0.20, r<sub>D</sub> = 4.2%, τ<sub>c</sub> = 25%.</p><p>E = 35 × 20 = 700, V = 1 000, so E/V = 0.70 and D/V = 0.30.</p><p>β<sub>E</sub> = 9%/6% = 1.50 and β<sub>D</sub> = 2%/6% = 0.333333. β<sub>U</sub> = 0.70 × 1.50 + 0.30 × 0.333333 = 1.05 + 0.10 = 1.15. r<sub>U</sub> = 3% + 1.15 × 6% = 9.90%.</p><p>Your D/E = 0.25. r<sub>E</sub> = 9.90% + 0.25 × (9.90% − 4.2%) = 9.90% + 1.425% = 11.325%.</p><p>r<sub>wacc</sub> = 0.80 × 11.325% + 0.20 × 4.2% × 0.75 = 9.06% + 0.63% = 9.69%.</p></div>`,
      q: `<p>Your firm is unlisted. A listed twin in the same business has 40 million shares trading at NOK 45. Its debt has a market value of NOK 1 200 million and its book equity is NOK 900 million. The twin's cost of equity is 12.6% and the expected return on its debt is 5%. The risk-free rate is 3.5% and the expected market return is 9%. Your firm will keep a constant debt-to-value ratio of 0.25. The expected return on its debt will be 4.6%. The corporate tax rate is 22%. Using the course convention, what is your firm's after-tax WACC, to four decimals?</p>`,
      options: ["8.7070%", "10.5470%", "8.0041%", "9.3070%"],
      answer: 3,
      solution: `<p><b>Twin's weights.</b> E = 40 million × NOK 45 = NOK 1 800 million. V = 1 800 + 1 200 = 3 000. E/V = 0.60 and D/V = 0.40.</p><p><b>Twin's betas.</b> Premium = 9% − 3.5% = 5.5%. β<sub>E</sub> = (12.6% − 3.5%) / 5.5% = 1.654545. β<sub>D</sub> = (5% − 3.5%) / 5.5% = 0.272727.</p><p><b>Unlever.</b> β<sub>U</sub> = 0.60 × 1.654545 + 0.40 × 0.272727 = 0.992727 + 0.109091 = 1.101818.</p><p><b>r<sub>U</sub>.</b> r<sub>U</sub> = 3.5% + 1.101818 × 5.5% = 3.5% + 6.06% = 9.5600%.</p><p><b>Relever.</b> Your D/E = 0.25/0.75 = 1/3. r<sub>E</sub> = 9.56% + (1/3) × (9.56% − 4.6%) = 9.56% + 1.653333% = 11.213333%.</p><p><b>WACC.</b> r<sub>wacc</sub> = 0.75 × 11.213333% + 0.25 × 4.6% × 0.78 = 8.410000% + 0.897000% = <b>9.3070%</b>.</p>`,
      check: `<p>First, r<sub>U</sub> by the other route, which does not use β<sub>D</sub>: 0.60 × 12.6% + 0.40 × 5% = 7.56% + 2.00% = 9.56%. This one catches a forgotten twin debt beta, which would give 8.96% on the beta route. Second, the shortcut: 9.56% − 0.25 × 0.22 × 4.6% = 9.56% − 0.253% = 9.307%. Third, weighted betas at your structure: your β<sub>D</sub> = (4.6% − 3.5%) / 5.5% = 0.200000 and β<sub>E</sub> = (11.213333% − 3.5%) / 5.5% = 1.402424, so 0.75 × 1.402424 + 0.25 × 0.20 = 1.051818 + 0.050000 = 1.101818 = β<sub>U</sub>. That one catches relevering with the twin's D/E, which gives 1.3273.</p>`,
      traps: [
        "Forgot the twin's debt beta: β<sub>U</sub> = 0.60 × 1.654545 = 0.992727, r<sub>U</sub> = 8.96%, r<sub>E</sub> = 10.413333% and r<sub>wacc</sub> = 8.7070%.",
        "Relevered with the twin's D/E of 2/3 instead of your own 1/3: r<sub>E</sub> = 9.56% + (2/3) × 4.96% = 12.866667%, so r<sub>wacc</sub> = 9.65% + 0.897% = 10.5470%.",
        "Used book equity in the twin's weights: E/V = 900/2 100 = 0.4286, β<sub>U</sub> = 0.864935, r<sub>U</sub> = 8.257143% and r<sub>wacc</sub> = 8.0041%.",
        null,
      ],
    },
  ],
});

/* sjanger 2 · mm · MM and recapitalisation */
window.EDU_DATA.sjangre.push({
  id: "mm",
  num: 2,
  title: "MM and recapitalisation",
  summary: "From the market-value balance sheet to a full leveraged recapitalisation, dividend and buyback",
  chapters: [6, 15],
  exam: "11 of 11 papers · H2024 E3, H2025 E3",
  intro: `<p>Every paper has this exercise: a firm in a perfect capital market issues debt and hands the cash to its shareholders, as a special dividend or a share repurchase. H2024 Exercise 3 and H2025 Exercise 3 were exactly this, 18 points each, in five chained sub-questions where one slip cascades. By the last step you can give r<sub>U</sub> and r<sub>E</sub> before and after, the price at announcement and after execution, the dividend per share, the shares bought back and the comparison of seller and holder, to four decimals. Six steps follow Kurbatov's 2026 lectures: the founder's financing choice, a dividend paid with new shares, stopping the dividend to buy back, bank capital requirements, the EPS fallacy and distress costs that the shareholders bear when the debt is issued.</p>`,
  steps: [
    {
      id: "mm-1",
      title: "The market-value balance sheet and the share price",
      theory: `<p>A firm's assets are worth the present value of the free cash flow they produce. Two groups own that value: the lenders and the shareholders. Written as a market-value balance sheet, the assets equal debt plus equity, so equity is what is left after the debt. The share price is equity divided by the number of shares.</p>
<div class="formula"><div class="eq">V = FCF/r<sub>U</sub></div><div class="eq">V = E + D &nbsp;⟹&nbsp; P = E/N = (V − D)/N</div>
<div class="where">FCF is a level free cash flow paid every year forever, r<sub>U</sub> the return investors require on the assets (the cost of capital of an all-equity firm with this risk) and N the number of shares. For an all-equity firm D = 0, so E = V and P = V/N.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Assets pay FCF = 45 a year forever and r<sub>U</sub> = 9%, so V = 45/0.09 = 500.</p><p>All-equity with 25 million shares: P = 500/25 = 20.00. If the same firm had 100 of debt: E = 500 − 100 = 400 and P = 400/25 = 16.00.</p></div>`,
      q: `<p>A firm's assets produce a free cash flow of 66 million a year in perpetuity and r<sub>U</sub> = 6%. The firm has 250 million of debt and 10 million shares. Markets are perfect and there are no taxes. What is the share price?</p>`,
      options: ["6.60", "85.00", "110.00", "135.00"],
      answer: 1,
      solution: `<p>Value of the assets: V = 66/0.06 = 1 100 million.</p><p>Equity is what the lenders leave: E = 1 100 − 250 = 850 million.</p><p>P = 850/10 = <b>85.00</b>.</p>`,
      check: `<p>Backwards: 10 × 85.00 + 250 = 1 100 = 66/0.06, so the two claims add up to the assets. The price must also lie below V/N = 110.00 whenever the firm has debt. It does.</p>`,
      traps: [
        "Divided the yearly cash flow by the share count without capitalising it: 66/10 = 6.60.",
        null,
        "Divided firm value by the share count, forgetting that the lenders own 250 of it: 1 100/10 = 110.00.",
        "Added the debt instead of subtracting it: (1 100 + 250)/10 = 135.00.",
      ],
    },
    {
      id: "mm-2",
      title: "MM Proposition I: leverage does not change firm value",
      theory: `<p>In a perfect capital market (no taxes, no transaction or issuance costs, financing that neither changes the investment cash flows nor reveals news about them, investors who trade the same securities at the same prices as firms) the value of a firm does not depend on how it is financed. Debt only splits the same cash flow into a fixed slice for lenders and a residual slice for shareholders. The result is enforced by arbitrage: if a levered firm were worth more than an identical unlevered one, investors would sell the dear package and build the cheap one with their own borrowing, which is homemade leverage. Risk neutrality is not one of the conditions. MM is a trade, not a claim about preferences.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = E + D = V<sup>U</sup> &nbsp;⟹&nbsp; E<sub>L</sub> = V<sup>U</sup> − D</div>
<div class="where">V<sup>U</sup> is the value of the same assets with no debt. Levered equity is worth the assets minus the debt, at market values.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two firms own assets paying 50 a year forever, r<sub>U</sub> = 10%, so V<sup>U</sup> = 500. Firm L has 200 of risk-free debt at 5%, so E<sub>L</sub> = 500 − 200 = 300.</p><p>Suppose L's equity traded at 350 instead. At 1% scale: short L's equity (+3.50), borrow 2.00 at 5% (+2.00), buy 1% of U (−5.00). Net today +0.50. Every year: receive 0.50 from U, pay 0.10 of interest, pay the short 0.01 × (50 − 10) = 0.40. Net 0.00. The trade runs until E<sub>L</sub> is back at 300.</p></div>`,
      q: `<p>Firm U and firm L own identical assets paying 63 million a year in perpetuity. U is all-equity and is worth 700 million, so r<sub>U</sub> = 9%. L has 350 million of risk-free perpetual debt at r<sub>f</sub> = 4%. Markets are perfect and there are no taxes. What must L's equity be worth, in millions?</p>`,
      options: ["544.44", "1 050.00", "350.00", "700.00"],
      answer: 2,
      solution: `<p>MM I: V<sup>L</sup> = V<sup>U</sup> = 700.</p><p>E<sub>L</sub> = 700 − 350 = <b>350.00</b>.</p><p>L's shareholders receive 63 − 0.04 × 350 = 63 − 14 = 49 a year, so at 350 the market prices that stream to yield 49/350 = 14%.</p>`,
      check: `<p>Levered equity is paid after a fixed claim, so it is riskier than the assets and must yield more than r<sub>U</sub>: 14% &gt; 9%. This check can fail. A value of 544.44 implies 49/544.44 = 9%, levered equity no riskier than the assets, which is impossible.</p>`,
      traps: [
        "Discounted the equity's cash flow at r<sub>U</sub>, as if leverage left its risk unchanged: (63 − 14)/0.09 = 544.44.",
        "Treated the borrowed money as extra value: 700 + 350 = 1 050.00.",
        null,
        "Set L's equity equal to the whole firm value, forgetting the lenders' claim: 700.00.",
      ],
    },
    {
      id: "mm-15",
      title: "A start-up's financing choice: the founder keeps the NPV either way",
      theory: `<p>Kurbatov's opening example (lecture 2): a founder with no money has a project that costs I today. She can sell equity or borrow. Either way the investors pay a fair price, a zero-NPV deal for them, so she keeps exactly the project's NPV. With debt her claim sits behind the lenders and is riskier, so the market prices her expected payoff at a higher return than the project's. The quickest route is the balance sheet: her stake is the firm's value minus what the lenders pay today.</p>
<div class="formula"><div class="eq">V = E[CF]/(1 + r<sub>U</sub>) &nbsp;·&nbsp; NPV = V − I</div>
<div class="eq">Debt: stake = V − D = V − I &nbsp;·&nbsp; Equity: α = I(1 + r<sub>U</sub>)/E[CF], stake = (1 − α)V = V − I</div>
<div class="where">r<sub>U</sub> is the return investors require on the project's cash flow. D is what the lenders pay today, not the amount they are owed next year. α is the investors' share of the firm when she sells equity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 2</span><p>Cost 1.00, payoff 3.15 or 1.05 with equal probability, r<sub>U</sub> = 20% and r<sub>f</sub> = 5%. V = 2.10/1.20 = 1.75 and NPV = 0.75.</p><p>Equity: investors need 1.20 of the expected 2.10, so α = 4/7 and she keeps (3/7) × 1.75 = 0.75.</p><p>Debt: she owes 1.05, which the bust state covers, so the debt is risk-free. Her stake = 1.75 − 1.00 = 0.75. She expects 0.5 × 2.10 = 1.05 next year, a return of 1.05/0.75 − 1 = 40%.</p></div>`,
      q: `<p>A founder with no money of her own has a project that costs 2.0 million today. In one year it pays 4.4 million or 2.2 million with equal probability and then closes. Investors require 10% on the project's cash flow. She borrows the 2.0 million at r<sub>f</sub> = 4%, which the bad state covers in full. Markets are perfect and there are no taxes. What is her stake worth today, in millions?</p>`,
      options: ["1.0000", "1.1731", "1.2200", "1.1091"],
      answer: 0,
      solution: `<p>V = (0.5 × 4.4 + 0.5 × 2.2)/1.10 = 3.30/1.10 = 3.0000.</p><p>The lenders pay 2.0000 today for a safe claim of 2.0 × 1.04 = 2.08 next year.</p><p>Her stake = V − D = 3.0000 − 2.0000 = <b>1.0000</b>, the project's NPV.</p>`,
      check: `<p>Equity route: investors need 2.0 × 1.10 = 2.20 of the expected 3.30, so α = 2/3 and she keeps (1/3) × 3.0000 = 1.0000 ✓. With debt she expects 3.30 − 2.08 = 1.22 next year, a return of 1.22/1.00 − 1 = 22%. That is above the project's 10%, as a claim behind the lenders must be.</p>`,
      traps: [
        null,
        "Discounted her payoff at the risk-free rate: 1.22/1.04 = 1.1731. Only the lenders' claim is safe; hers carries all the project's risk.",
        "Forgot to discount: her expected payoff 3.30 − 2.08 = 1.22 arrives in one year.",
        "Discounted her payoff at the project's 10%: 1.22/1.10 = 1.1091. Her claim sits behind the debt and is riskier than the project.",
      ],
    },
    {
      id: "mm-3",
      title: "Announcing a recapitalisation: the price does not move",
      theory: `<p>A leveraged recapitalisation issues debt and pays the cash to shareholders, as a special dividend or a share repurchase. Keep two dates apart. At the <b>announcement</b> the market learns the plan. The price moves only if the plan changes firm value. At <b>execution</b> cash is swapped for shares or paid out, at prices already set. In a perfect market MM I says the plan creates nothing, so the announcement leaves the price where it was. A promised dividend is still attached to the share.</p>
<div class="formula"><div class="eq">P<sub>announcement</sub> = P<sub>0</sub></div>
<div class="where">Perfect market, no taxes: no tax shield to capitalise, no costs, no news. With corporate taxes this changes, because the value of the tax shield is priced at the announcement (k7).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm has 25 million shares at 32.00, all equity, so V = 800. It announces that it will borrow 200 and buy back shares next week.</p><p>At the announcement V is still 800 and nothing has been paid, so P = 800/25 = 32.00. Once the loan is drawn but before the buyback, the balance sheet is assets 800 + cash 200 = 1 000, debt 200, equity 800: still 32.00.</p></div>`,
      q: `<p>A firm in a perfect capital market with no taxes trades at 64.00 per share. It announces that next month it will borrow 500 million of risk-free debt and pay all of it out as a special dividend. What happens to the share price at the announcement?</p>`,
      options: [
        "It stays at 64.00, because the plan only re-slices the same cash flows between lenders and shareholders, so firm value is unchanged",
        "It rises, because debt is cheaper than equity, so the firm's cost of capital falls and its value goes up",
        "It falls, because leverage raises the return shareholders require, so future dividends are discounted at a higher rate",
        "It falls at once by the dividend per share, because the market already knows the cash will leave the firm",
      ],
      answer: 0,
      solution: `<p>No taxes, no issuance costs and no information: the plan changes who gets the cash flow, not how much there is. By MM I firm value is unchanged, so the price stays at <b>64.00</b>.</p><p>The dividend is paid later. Until the ex-dividend date the share still carries the right to it, so nothing can drop yet.</p>`,
      check: `<p>Run the balance sheet at the announcement: no cash has moved, the assets are the same and so are the claims, so E/N cannot have changed. The drop comes on the ex-dividend date, by exactly the dividend. The holder is handed that amount in cash the same day.</p>`,
      traps: [
        null,
        "Debt is cheaper, but the equity left behind becomes riskier and dearer by exactly enough to cancel the saving. In a perfect market cheap debt adds no value.",
        "A higher required return only pays shareholders for the extra risk they now carry. It does not lower firm value, so it cannot move the price at the announcement.",
        "Mixed up the announcement and the ex-dividend date. The price drops by the dividend only when the share stops carrying it.",
      ],
    },
    {
      id: "mm-7",
      title: "A debt-financed repurchase: only the new money buys shares",
      theory: `<p>In a repurchase the firm uses the borrowed cash to buy its own shares at the market price, which in a perfect market is the unchanged price. Equity falls by the cash paid out and the share count falls by the shares bought, so the price per share stays where it was. Exam firms often carry debt already. If the board targets a leverage ratio, the new debt is the target minus what is already there. Only that new money goes to shareholders. If instead a new loan first repays the old debt, the payout is the new loan minus the debt repaid. A target D/V is a fraction of V, which a perfect-market recapitalisation leaves unchanged.</p>
<div class="formula"><div class="eq">D<sub>target</sub> = (D/V)<sub>target</sub> × V &nbsp;·&nbsp; D<sub>new</sub> = D<sub>target</sub> − D<sub>old</sub></div>
<div class="eq">n = D<sub>new</sub>/P &nbsp;·&nbsp; N<sub>1</sub> = N<sub>0</sub> − n &nbsp;·&nbsp; P<sub>1</sub> = (V − D<sub>target</sub>)/N<sub>1</sub> = P</div>
<div class="where">n is the number of shares bought back and P the price at which the firm buys. Refinancing variant: payout = new loan − old debt repaid. Read whether the target is D/V or D/E: with D/E = x, D = [x/(1 + x)] × V.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 800 with D<sub>old</sub> = 200 and E = 600, on 30 million shares at 20.00. Target D/V = 0.40.</p><p>D<sub>target</sub> = 0.40 × 800 = 320, so D<sub>new</sub> = 320 − 200 = 120 and n = 120/20.00 = 6 million, leaving 24 million. E<sub>1</sub> = 800 − 320 = 480 and 480/24 = 20.00. A new loan of 320 that repays the 200 releases the same 120.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has V = 1 500 million: debt of 300 million and equity of 1 200 million, on 40 million shares at 30.00. The board will issue debt until D/V = 0.35 and use the proceeds to buy back shares. How many shares (in millions) does it buy back?</p>`,
      options: ["2.9630", "4.0000", "7.5000", "17.5000"],
      answer: 2,
      solution: `<p>D<sub>target</sub> = 0.35 × 1 500 = 525.</p><p>D<sub>new</sub> = 525 − 300 = 225.</p><p>n = 225/30.00 = <b>7.5000</b> million, leaving 40 − 7.5 = 32.5 million.</p>`,
      check: `<p>Total debt 525 over V = 1 500 is 0.35, the target. This can fail: issue the whole 525 as new debt and total debt is 825, D/V = 0.55. Price: E<sub>1</sub> = 1 500 − 525 = 975 and 975/32.5 = 30.00, unchanged.</p>`,
      traps: [
        "Read the target as D/E = 0.35: D = (0.35/1.35) × 1 500 = 388.89, so (388.89 − 300)/30.00 = 2.9630.",
        "Applied the target ratio to equity instead of firm value: 0.35 × 1 200 = 420, so (420 − 300)/30.00 = 4.0000.",
        null,
        "Treated the whole target as new debt, ignoring the 300 already there: 525/30.00 = 17.5000.",
      ],
    },
    {
      id: "mm-5",
      title: "A debt-financed special dividend: the ex-dividend price",
      theory: `<p>A special dividend pays every share, so the share count does not change. Up to the ex-dividend date the share still carries the dividend and trades at the old price. From the ex-date it does not: the price drops by exactly the dividend. Equity afterwards is V − D spread over the same N shares.</p>
<div class="formula"><div class="eq">DPS = D<sub>new</sub>/N &nbsp;·&nbsp; P<sub>ex</sub> = P<sub>0</sub> − DPS = (V − D)/N</div>
<div class="where">DPS is the dividend per share and P<sub>ex</sub> the ex-dividend price. A dividend shrinks the numerator (equity); a repurchase shrinks the denominator (shares).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, V = 640, 16 million shares at 40.00. It borrows 160 and pays it all out.</p><p>DPS = 160/16 = 10.00 and P<sub>ex</sub> = 40.00 − 10.00 = 30.00. Balance sheet: 16 × 30.00 = 480 = 640 − 160.</p></div>`,
      q: `<p>An all-equity firm has 15 million shares trading at 70.00. Markets are perfect and there are no taxes. It borrows 315 million and pays all of it out as a special dividend. What is the ex-dividend share price?</p>`,
      options: ["21.00", "28.00", "49.00", "70.00"],
      answer: 2,
      solution: `<p>DPS = 315/15 = 21.00.</p><p>P<sub>ex</sub> = 70.00 − 21.00 = <b>49.00</b>.</p><p>From the balance sheet: E<sub>1</sub> = 1 050 − 315 = 735 over the same 15 million shares, 735/15 = 49.00.</p>`,
      check: `<p>A holder of one share ends with 49.00 + 21.00 = 70.00, the price before: wealth unchanged, as MM I requires. The two routes, P<sub>0</sub> − DPS and (V − D)/N, start from different numbers and agree.</p>`,
      traps: [
        "Gave the dividend per share, 315/15 = 21.00, instead of the price.",
        "Took the payout off twice, once for the new debt and once for the cash paid out: 70.00 − 21.00 − 21.00 = 28.00.",
        null,
        "Kept the price at 70.00 as if this were a repurchase. A dividend leaves the share count unchanged, so equity per share must fall.",
      ],
    },
    {
      id: "mm-6",
      title: "The seller, the holder and the dividend taker are equally rich",
      theory: `<p>Compare shareholders after the deal, per original share. In a repurchase the seller gets P in cash and the holder keeps a share still worth P. With a special dividend every holder gets DPS in cash plus a share worth P − DPS. All end with P: the recapitalisation changes the form of wealth, not its size. Value each position at the price that holds after the event. Count the cash.</p>
<div class="formula"><div class="eq">seller: P &nbsp;·&nbsp; holder: E<sub>1</sub>/N<sub>1</sub> = P &nbsp;·&nbsp; dividend taker: P<sub>ex</sub> + DPS = P</div>
<div class="where">A holder who seems richer, or a dividend taker who seems poorer, means a share count or a cash payment has gone missing.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, V = 640, 16 million shares at 40.00, borrows 160. Take 100 shares each.</p><p>Repurchase: the seller gets 100 × 40.00 = 4 000.00; the holder's shares are worth 100 × 480/12 = 4 000.00. Dividend: 100 × 30.00 + 100 × 10.00 = 4 000.00.</p></div>`,
      q: `<p>An all-equity firm has 25 million shares at 48.00. Markets are perfect and there are no taxes. It borrows 300 million and buys back shares at the market price. Shareholder S tenders all of her 200 shares. Shareholder H keeps all of his 200 shares. What is H's holding worth right after the buyback?</p>`,
      options: ["7 200.00", "9 600.00", "12 000.00", "12 800.00"],
      answer: 1,
      solution: `<p>n = 300/48.00 = 6.25 million, N<sub>1</sub> = 25 − 6.25 = 18.75 million.</p><p>E<sub>1</sub> = 1 200 − 300 = 900 and P<sub>1</sub> = 900/18.75 = 48.00.</p><p>H holds 200 × 48.00 = <b>9 600.00</b>. S received 200 × 48.00 = 9 600.00 in cash. Neither beat the other.</p>`,
      check: `<p>Run the third route. Had the firm paid the 300 as a special dividend: DPS = 300/25 = 12.00 and P<sub>ex</sub> = 36.00. A holder of 200 shares would have 200 × 36.00 + 200 × 12.00 = 7 200.00 + 2 400.00 = 9 600.00. Same number from different inputs. Drop the cash or a share count and the three no longer match.</p>`,
      traps: [
        "Divided the smaller equity by the old share count: 200 × 900/25 = 7 200.00. That is the dividend route's share value without its cash.",
        null,
        "Gave the holder a dividend as well as the unchanged price: 200 × (48.00 + 12.00) = 12 000.00. A repurchase pays only the shares tendered.",
        "Divided firm value by the new share count, forgetting the debt: 200 × 1 200/18.75 = 12 800.00.",
      ],
    },
    {
      id: "mm-16",
      title: "A dividend paid with new shares",
      theory: `<p>MM makes dividend policy irrelevant too, as long as investment is fixed (lecture 5). A firm that pays out more than its cash flow must raise the difference, here by selling new shares right after the dividend. The new shareholders pay a fair price for a share of all later dividends. The old shareholders get more cash now but own a smaller slice of the future. The two cancel. After the dividend the firm is still worth V<sub>1</sub>, the value of the later cash flows, but X of it now belongs to the new shares.</p>
<div class="formula"><div class="eq">(N + n) × P<sub>1</sub> = V<sub>1</sub> &nbsp;and&nbsp; n × P<sub>1</sub> = X &nbsp;⟹&nbsp; P<sub>1</sub> = (V<sub>1</sub> − X)/N</div>
<div class="eq">P<sub>0</sub> = (DPS<sub>1</sub> + P<sub>1</sub>)/(1 + r<sub>E</sub>)</div>
<div class="where">X is the extra payout raised by the issue, N the old share count and n the new shares. Here the new shareholders do not receive the dividend they fund. Kurbatov also uses the other set-up (PS1 Exercise 13(c)): the shares are sold before the dividend and the new holders receive it too. Read which one the question describes. P<sub>0</sub> does not change: the higher dividend is offset exactly by the lower price after it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 5</span><p>100 000 shares, 1 million a year forever, r<sub>E</sub> = 10%: V = 10 million, P<sub>0</sub> = 100 and DPS = 10.</p><p>Next year's dividend rises to 1.5 million. The extra 500 000 is raised with new shares. V<sub>1</sub> = 10 million, so P<sub>1</sub> = (10 000 000 − 500 000)/100 000 = 95. Today: P<sub>0</sub> = (15 + 95)/1.10 = 100, unchanged.</p></div>`,
      q: `<p>An all-equity firm has 2 million shares and pays out its whole free cash flow of 6 million a year forever. Its cost of equity is 12%. The board announces that next year's dividend will be 10 million. The extra 4 million is raised by selling new shares right after that dividend is paid, so the new shares do not receive it. From year 2 on, total dividends are back at 6 million a year. Markets are perfect. What is the share price right after the issue at the end of year 1?</p>`,
      options: ["25.00", "20.00", "23.00", "23.33"],
      answer: 2,
      solution: `<p>After the year-1 dividend the firm is worth the later dividends: V<sub>1</sub> = 6/0.12 = 50 million.</p><p>The new shares must be worth the 4 million they pay: P<sub>1</sub> = (50 − 4)/2 = <b>23.00</b>.</p><p>The firm sells n = 4/23 = 0.1739 million new shares.</p>`,
      check: `<p>Today's price is unchanged: P<sub>0</sub> = (5.00 + 23.00)/1.12 = 25.00 = 50/2 ✓. Second route: the old shareholders keep 2/2.173913 = 92% of later dividends, 0.92 × 6 = 5.52 million or 2.76 per share, so P<sub>0</sub> = (5.00 + 2.76/0.12)/1.12 = 25.00 ✓.</p>`,
      traps: [
        "Gave the new shares no claim on the later dividends: 50/2 = 25.00. They paid 4 million for a slice of them.",
        "Took the whole new dividend off the ex-dividend price, 25.00 − 5.00 = 20.00, as if the regular dividend were paid twice.",
        null,
        "Used the set-up where the new shareholders buy before the dividend and receive it too: n = 4/28 = 0.1429 million, DPS = 10/2.1429 = 4.6667 and 28.00 − 4.6667 = 23.33. In this question the issue comes after the dividend.",
      ],
    },
    {
      id: "mm-20",
      title: "Stopping the dividend to buy back shares",
      theory: `<p>A firm can use free cash flow in four ways: pay a dividend, buy back shares, hold the cash or reinvest it. With investment fixed, MM makes the dividend and the buyback equivalent: the dividend taker and the seller end equally rich. Kurbatov's wrap-up added what MM leaves out. Dividends are sticky, so a cut is punished (General Motors). A buyback can signal that the shares are undervalued. Reinvesting without good projects is empire building.</p>
<div class="formula"><div class="eq">dividend: P<sub>ex</sub> + DPS = P<sub>cum</sub> &nbsp;·&nbsp; buyback: n = cash/P<sub>cum</sub>, P after = (V − cash)/(N − n) = P<sub>cum</sub></div>
<div class="where">P<sub>cum</sub> is the price while the cash is still in the firm. Under MM the price moves only through cash leaving per share, never through the form of the payout.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS1 Exercise 13</span><p>Genron has 10 million shares, 20 million of excess cash and pays 4.80 a share forever after, r<sub>E</sub> = 12%. Cum-dividend price 2 + 4.80/0.12 = 42.</p><p>Dividend: 2 in cash and a share worth 40. Buyback: 20/42 = 0.4762 million shares, leaving 9.5238 million. Later dividends are 48/9.5238 = 5.04 a share and 5.04/0.12 = 42. Same wealth either way.</p></div>`,
      q: `<p>Hval ASA is all-equity with 10 million shares. Its operations are worth 500 million and it holds 40 million of excess cash, which it has always paid out as a dividend of 4.00 per share. This year it stops the dividend and uses the 40 million to buy back shares at the market price. What happens to the share price under MM? And what can happen in practice?</p>`,
      options: [
        "The price stays at 54.00, the same wealth (54.00) as with the dividend under MM. In practice the cut may read as bad news, the buyback as good news",
        "The price falls to 50.00 as on an ex-dividend date. In practice too the holders lose the 4.00 per share they no longer get in cash",
        "The price rises to 58.32 because fewer shares now share the firm. In practice the buyback adds to that gain as a good signal",
        "The price rises to 54.35 because the shares are bought back at 50.00. In practice the switch only confirms that gain for the holders who keep their shares",
      ],
      answer: 0,
      solution: `<p>With the cash inside, the price is (500 + 40)/10 = 54.00. The buyback runs at that price: n = 40/54.00 = 0.740741 million, leaving 9.259259 million. After it: 500/9.259259 = 54.00, so the price <b>stays at 54.00</b>.</p><p>In practice the two moves send opposite signals. Dividends are sticky, so stopping one can read as bad news about future cash flow. A buyback can read as a sign that management thinks the shares are cheap.</p>`,
      check: `<p>Dividend route for comparison: a share worth 500/10 = 50.00 plus 4.00 in cash = 54.00, the same wealth as holding or selling in the buyback ✓. A buyback at 50.00 would give 500/9.20 = 54.35 to the holders and less to the sellers, so the price the firm pays matters. The signals come from information the perfect market assumes away.</p>`,
      traps: [
        null,
        "A buyback does not create an ex-dividend date. The cash leaves only from the shares sold, at the full price.",
        "Kept the 40 million in the firm after paying it out: 540/9.259259 = 58.32. The firm is smaller by the cash it spent.",
        "Bought back at the price without the cash, 50.00: n = 40/50 = 0.80 million and 500/9.20 = 54.35. The firm buys at the price that holds while the cash is still inside it.",
      ],
    },
    {
      id: "mm-8",
      title: "Backing out the unlevered cost of capital: the pre-tax WACC",
      theory: `<p>r<sub>U</sub> is the expected return on the firm's assets, so it is the value-weighted average of what its two claims earn: r<sub>E</sub> on the equity and r<sub>D</sub> on the debt. With no taxes there is no (1 − τ<sub>c</sub>) on the debt. This pre-tax WACC equals r<sub>U</sub>. Use market values, E = N × P. If the firm pays a level free cash flow forever, you can instead run the perpetuity backwards. r<sub>U</sub> belongs to the assets, so a financing transaction does not change it.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = [E/(E + D)] r<sub>E</sub> + [D/(E + D)] r<sub>D</sub> &nbsp;·&nbsp; or r<sub>U</sub> = FCF/V</div>
<div class="where">The weights are E/V and D/V, not D/E. Risk-free debt: r<sub>D</sub> = r<sub>f</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>15 million shares at 50.00, so E = 750. D = 250 at r<sub>D</sub> = 4% and r<sub>E</sub> = 12%. V = 1 000.</p><p>r<sub>U</sub> = 0.75 × 0.12 + 0.25 × 0.04 = 0.09 + 0.01 = 0.10 = 10%. If the firm pays FCF = 100 forever, 100/1 000 = 10% gives the same.</p></div>`,
      q: `<p>A firm in a perfect market has 24 million shares at 55.00 and 360 million of risk-free debt with r<sub>D</sub> = 3.5%. Its equity cost of capital is 10%. What is r<sub>U</sub>, to four decimals?</p>`,
      options: ["6.7500%", "7.8571%", "8.2273%", "8.6071%"],
      answer: 3,
      solution: `<p>E = 24 × 55.00 = 1 320 and V = 1 320 + 360 = 1 680.</p><p>r<sub>U</sub> = (1 320/1 680)(0.10) + (360/1 680)(0.035) = 0.078571 + 0.007500 = 0.086071 = <b>8.6071%</b>.</p>`,
      check: `<p>r<sub>U</sub> must lie between r<sub>D</sub> = 3.5% and r<sub>E</sub> = 10%, much nearer r<sub>E</sub> because equity is 78.57% of V. 8.6071% does; the equal-weight 6.75% fails that test. Backwards, (0.086071 × 1 680 − 0.035 × 360)/1 320 = (144.60 − 12.60)/1 320 = 0.1000, which only re-checks the arithmetic.</p>`,
      traps: [
        "Averaged the two rates with equal weights: (10% + 3.5%)/2 = 6.7500%.",
        "Dropped the debt term, as if risk-free debt earned nothing: (1 320/1 680) × 10% = 7.8571%. Risk-free debt still earns r<sub>D</sub> = 3.5%.",
        "Used D/E = 360/1 320 as the debt weight: (1 − 360/1 320) × 10% + (360/1 320) × 3.5% = 8.2273%.",
        null,
      ],
    },
    {
      id: "mm-9",
      title: "MM Proposition II: the cost of equity after the recapitalisation",
      theory: `<p>Leverage leaves the assets' risk and r<sub>U</sub> unchanged, but loads all of that risk onto a smaller equity base, so r<sub>E</sub> rises in a straight line with D/E. This needs no default and no bankruptcy costs: it holds with risk-free debt. Use market values after the deal. If the debt stays risk-free, r<sub>D</sub> = r<sub>f</sub>. If lenders now bear some risk and demand a higher r<sub>D</sub>, use the new rate: they carry part of the risk, so r<sub>E</sub> rises less.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">On the formula sheet. D/E, not D/V, both after the transaction. The slope is the spread r<sub>U</sub> − r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>U</sub> = 10% and V = 1 000. After a recapitalisation D = 400 at r<sub>D</sub> = 5% and E = 600, so D/E = 0.666667.</p><p>r<sub>E</sub> = 0.10 + 0.666667 × 0.05 = 0.10 + 0.033333 = 0.133333 = 13.3333%. If lenders demand 6% because the debt is now risky: r<sub>E</sub> = 0.10 + 0.666667 × 0.04 = 0.126667 = 12.6667%.</p></div>`,
      q: `<p>An all-equity firm worth 900 million has r<sub>U</sub> = 7%. It borrows 300 million of risk-free debt at r<sub>f</sub> = 4% and buys back shares. Markets are perfect and there are no taxes. What is r<sub>E</sub> after the buyback?</p>`,
      options: ["8.5000%", "8.0000%", "7.0000%", "5.5000%"],
      answer: 0,
      solution: `<p>E after = 900 − 300 = 600, so D/E = 300/600 = 0.5.</p><p>r<sub>E</sub> = 0.07 + 0.5 × (0.07 − 0.04) = 0.07 + 0.015 = 0.085 = <b>8.5000%</b>.</p>`,
      check: `<p>From the cash flows instead of the formula: the assets pay 0.07 × 900 = 63 a year, interest is 0.04 × 300 = 12, equity gets 51 and 51/600 = 0.085. This route never uses D/E, so it catches a D/V slip.</p>`,
      traps: [
        null,
        "Used D/V = 300/900 where D/E belongs: 0.07 + 0.3333 × 0.03 = 8.0000%.",
        "Left r<sub>E</sub> at r<sub>U</sub> = 7.0000%, as if leverage did not make the equity riskier.",
        "Thought cheap debt lowers the cost of equity and took the premium off instead of adding it: 0.07 − 0.5 × 0.03 = 5.5000%.",
      ],
    },
    {
      id: "mm-19",
      title: "Bank capital requirements: dearer equity, same funding cost",
      theory: `<p>Bankers argue that equity costs 25% and debt 5%, so a higher equity requirement must raise their funding cost. Kurbatov's answer (lecture 2) is MM II. Swapping debt for equity leaves the bank's assets unchanged, so r<sub>U</sub>, its pre-tax funding cost, stays put. With a thicker equity cushion each krone of equity carries less risk and r<sub>E</sub> falls. The error is to hold r<sub>E</sub> fixed while the weights change.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> &nbsp;·&nbsp; r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">Banks state the requirement as E/V. Convert it to D/E before you use MM II. As in the lecture, r<sub>D</sub> stays fixed.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 2</span><p>E/V = 3%, r<sub>E</sub> = 25%, r<sub>D</sub> = 5%: r<sub>U</sub> = 0.03 × 25% + 0.97 × 5% = 0.75% + 4.85% = 5.6%.</p><p>The regulator requires E/V = 6%. The bankers' figure, 0.06 × 25% + 0.94 × 5% = 6.2%, keeps r<sub>E</sub> at 25%. MM II: r<sub>E</sub> = 5.6% + (94/6)(5.6% − 5%) = 5.6% + 9.4% = 15%. Then 0.06 × 15% + 0.94 × 5% = 5.6%. The funding cost does not rise.</p></div>`,
      q: `<p>A bank funds itself with 4% equity and 96% debt. Its shareholders expect 20% and its debt costs 4.5%. The regulator raises the equity requirement to 8% of assets. The bank's assets do not change and its debt still costs 4.5%. Markets are perfect and there are no taxes. What is the bank's cost of equity under the new requirement, to four decimals?</p>`,
      options: ["12.2500%", "5.6904%", "20.0000%", "10.0000%"],
      answer: 0,
      solution: `<p>r<sub>U</sub> = 0.04 × 20% + 0.96 × 4.5% = 0.80% + 4.32% = 5.12%.</p><p>New D/E = 0.92/0.08 = 11.5.</p><p>r<sub>E</sub> = 5.12% + 11.5 × (5.12% − 4.5%) = 5.12% + 7.13% = <b>12.2500%</b>.</p>`,
      check: `<p>Funding cost at the new weights: 0.08 × 12.25% + 0.92 × 4.5% = 0.98% + 4.14% = 5.12% = r<sub>U</sub>, unchanged ✓. The bankers' figure, 0.08 × 20% + 0.92 × 4.5% = 5.74%, fails this test: it moves the funding cost although the assets did not change.</p>`,
      traps: [
        null,
        "Used D/V = 0.92 in MM II where D/E belongs: 5.12% + 0.92 × 0.62% = 5.6904%.",
        "Kept the cost of equity at 20%, the bankers' assumption. A thicker equity cushion makes each krone of equity safer.",
        "Halved r<sub>E</sub> because the equity share doubled: 20%/2 = 10%. MM II is linear in D/E, not in E/V.",
      ],
    },
    {
      id: "mm-17",
      title: "The EPS fallacy: higher earnings per share, same price",
      theory: `<p>Borrowing to buy back shares raises earnings per share whenever the firm earns more on its assets than it pays on the debt. That looks like value creation, but the price does not move (MM I). The higher EPS only pays for the extra risk: below a break-even level of earnings EPS is lower with the debt than without. So the forward P/E falls, because each krone of EPS is now riskier (lecture 2 and Yerba in tutorial 1).</p>
<div class="formula"><div class="eq">EPS = (Earnings − r<sub>D</sub> × D)/(N − n) &nbsp;·&nbsp; n = D/P &nbsp;·&nbsp; P/E = P/EPS</div>
<div class="eq">Break-even: Earnings/N = (Earnings − r<sub>D</sub> × D)/(N − n)</div>
<div class="where">No taxes here, so earnings are EBIT. P is the same before and after the buyback.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 2</span><p>EBIT 10 million, 10 million shares at 7.50, so EPS = 1.00. Borrow 15 million at 8% and buy back 2 million shares.</p><p>Interest 1.2, earnings 8.8 over 8 million shares: EPS = 1.10. Break-even: EBIT/10 = (EBIT − 1.2)/8 gives EBIT = 6. Above 6 the levered firm has the higher EPS, below it the lower.</p></div>`,
      q: `<p>An all-equity firm has 50 million shares at 30.00 and expects earnings of 120 million next year. It borrows 30% of its market value of equity at a risk-free 4% and uses all of it to buy back shares. Markets are perfect and there are no taxes. What is its forward P/E ratio after the buyback, to four decimals?</p>`,
      options: ["12.5000", "10.2941", "14.7059", "8.7500"],
      answer: 1,
      solution: `<p>D = 0.30 × 1 500 = 450 million and n = 450/30.00 = 15 million, leaving 35 million.</p><p>Interest = 0.04 × 450 = 18 million, earnings = 120 − 18 = 102 million and EPS = 102/35 = 2.914286, up from 2.40.</p><p>The price stays at 30.00 (MM I), so P/E = 30.00/2.914286 = <b>10.2941</b>, down from 12.5000.</p>`,
      check: `<p>Price from the balance sheet: (1 500 − 450)/35 = 1 050/35 = 30.00 ✓. That follows from the same numbers, so it confirms the arithmetic only. Break-even earnings: Earnings/50 = (Earnings − 18)/35 gives 60 million, an EPS of 1.20. Above 60 million the buyback raises EPS, below it the buyback lowers EPS. The spread of outcomes widens, which is why the market pays less per krone of EPS.</p>`,
      traps: [
        "Kept the P/E at 12.5, as if the higher EPS lifted the price. A buyback at the market price cannot move the price.",
        null,
        "Forgot that the buyback cuts the share count: EPS = 102/50 = 2.04, so 30.00/2.04 = 14.7059.",
        "Forgot the interest: EPS = 120/35 = 3.428571, so 30.00/3.428571 = 8.7500.",
      ],
    },
    {
      id: "mm-10",
      title: "Dividends per share before and after, priced at the new cost of equity",
      theory: `<p>When all cash flow is paid out, interest comes first and the rest goes to shareholders. The dividend per share is that residual over the shares outstanding. The share is a perpetuity of it, discounted at r<sub>E</sub>. After a debt-financed buyback, interest is due on all the debt and the residual is shared by fewer shares: the dividend per share rises, r<sub>E</sub> rises by just enough and the price is unchanged. Nothing grows, so the share trades at P + DPS just before each payment and is back at P just after.</p>
<div class="formula"><div class="eq">DPS = (FCF − r<sub>D</sub> × D)/N &nbsp;·&nbsp; P = DPS/r<sub>E</sub></div>
<div class="where">D is all the debt outstanding and N the shares outstanding after the transaction.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, FCF = 60, r<sub>U</sub> = 10%, so V = 600; 15 million shares at 40.00. DPS = 60/15 = 4.00 and 4.00/0.10 = 40.00.</p><p>It borrows 200 at 5% and buys back 200/40.00 = 5 million shares. Interest 10, dividends 50 over 10 million shares: DPS = 5.00. r<sub>E</sub> = 0.10 + (200/400)(0.05) = 0.125 and 5.00/0.125 = 40.00. Just before each payment the share trades at 45.00.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has a free cash flow of 81 million a year in perpetuity, all paid out as interest and dividends. Its r<sub>U</sub> is 9%. It has 400 million of risk-free debt at r<sub>f</sub> = 4% and 10 million shares at 50.00. It borrows another 100 million, still risk-free at 4%. It uses all of it to buy back shares. What is the dividend per share after the buyback, to four decimals?</p>`,
      options: ["6.5000", "8.1250", "6.1000", "7.6250"],
      answer: 3,
      solution: `<p>n = 100/50.00 = 2 million, N<sub>1</sub> = 8 million.</p><p>Debt is now 500, interest 0.04 × 500 = 20, dividends 81 − 20 = 61.</p><p>DPS = 61/8 = <b>7.6250</b>, up from (81 − 16)/10 = 6.5000.</p>`,
      check: `<p>E<sub>1</sub> = 900 − 500 = 400 and r<sub>E</sub> = 0.09 + (500/400)(0.05) = 0.09 + 0.0625 = 0.1525, so 7.6250/0.1525 = 50.00, the price. Before: r<sub>E</sub> = 0.09 + (400/500)(0.05) = 0.13 and 6.5000/0.13 = 50.00. A fair test: the dividend comes from the cash flow and r<sub>E</sub> from MM II. They meet at 50.00 only if both are right.</p>`,
      traps: [
        "Left the buyback out entirely: (81 − 16)/10 = 6.5000 is the dividend per share before it.",
        "Charged interest on the old debt only: (81 − 16)/8 = 8.1250.",
        "Divided by the old share count, forgetting the buyback: 61/10 = 6.1000.",
        null,
      ],
    },
    {
      id: "mm-18",
      title: "Distress costs and fire sales: the shareholders pay when the debt is issued",
      theory: `<p>Leave the perfect market for one step. If default destroys value, the levered firm is worth V<sup>U</sup> minus the present value of those losses. Kurbatov's wrap-up stressed fire sales: a firm in default sells its assets in a hurry, often for half their value. Direct legal costs are small, roughly 3% times the probability of default. Creditors foresee the loss and pay less for the debt, so the shareholders bear it on the day the debt is issued. A debt-financed buyback therefore lowers the share price to V<sup>L</sup>/N.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> − PV(distress costs) = D + E</div>
<div class="eq">Price after a debt-financed buyback = V<sup>L</sup>/N &nbsp;·&nbsp; n = D/P</div>
<div class="where">Value the debt state by state: the face value where the firm is solvent, what the assets fetch where it defaults. With diversifiable risk discount at r<sub>f</sub>. The yield K/D − 1 is a promise; lenders expect only r<sub>f</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the wrap-up lecture</span><p>Debt with face value 30. The assets will be worth 80 or 15, taken here as equally likely, with no discounting. In default a fire sale fetches only half, 7.5.</p><p>Without the fire sale D = 0.5 × 30 + 0.5 × 15 = 22.50. With it D = 0.5 × 30 + 0.5 × 7.5 = 18.75. Equity is 0.5 × 50 = 25.00 either way. V<sup>L</sup> = 43.75 against V<sup>U</sup> = 47.50: the fire sale costs 3.75. The bond raises 3.75 less when it is sold. Gladstone (tutorial 1) is the same idea with four states: the price falls from 10.95 to 9.91.</p></div>`,
      q: `<p>Next year a firm will be worth 200, 140, 80 or 60, each with probability 0.25. The risk is diversifiable and r<sub>f</sub> = 4%. If the firm defaults, its assets must be sold in a fire sale that fetches only 80% of their value. It has 10 million shares and no debt. It now issues zero-coupon debt with face value 90, due next year. It uses all the proceeds to buy back shares. There are no taxes. What is the share price after the buyback?</p>`,
      options: ["11.54", "12.50", "3.85", "10.87"],
      answer: 3,
      solution: `<p><b>Debt.</b> It pays 90, 90, 0.8 × 80 = 64 and 0.8 × 60 = 48, so D = 0.25 × 292/1.04 = 70.1923.</p><p><b>Equity.</b> It pays 110, 50, 0 and 0, so E = 0.25 × 160/1.04 = 38.4615. V<sup>L</sup> = 108.6538.</p><p><b>Price.</b> The buyback runs at the price that holds after it: P = V<sup>L</sup>/N = 108.6538/10 = <b>10.87</b>. The firm buys back n = 70.1923/10.8654 = 6.4602 million shares.</p>`,
      check: `<p>Equity per remaining share: 38.4615/(10 − 6.4602) = 38.4615/3.5398 = 10.87 ✓. Without debt the price is 0.25 × 480/1.04/10 = 11.54. The fall of 0.67 per share is the fire-sale loss 0.25 × (16 + 12)/1.04 = 6.7308 spread over 10 million shares ✓. The debt yields 90/70.1923 − 1 = 28.22%, but lenders expect 0.25 × 292/70.1923 − 1 = 4% = r<sub>f</sub>.</p>`,
      traps: [
        "Ignored the fire-sale loss and kept the all-equity price: 0.25 × 480/1.04/10 = 11.54.",
        "Priced the debt as risk-free: 90/1.04 = 86.5385, so (38.4615 + 86.5385)/10 = 12.50. Lenders will not pay that for debt that defaults half the time.",
        "Forgot that the buyback cuts the share count: 38.4615/10 = 3.85.",
        null,
      ],
    },
    {
      id: "mm-13",
      title: "Exam level: refinance, pay a dividend, the debt turns risky (H2024 E3)",
      theory: `<p>H2024 Exercise 3 chained five parts on one firm: r<sub>U</sub> from market values, the price at the announcement, a new loan that first repays the old debt and pays the rest as a dividend, r<sub>E</sub> when the larger debt turns risky and a repurchase as the alternative. Each answer feeds the next, so work in order and keep four decimals on rates.</p>
<div class="formula"><div class="eq">r<sub>U</sub> → payout = D<sub>new</sub> − D<sub>old</sub> → P<sub>ex</sub> = (V − D<sub>new</sub>)/N → r<sub>E</sub> = r<sub>U</sub> + (D<sub>new</sub>/E<sub>1</sub>)(r<sub>U</sub> − r<sub>D,new</sub>)</div>
<div class="where">After refinancing, the new loan is the only debt. r<sub>U</sub> is unchanged; r<sub>D</sub> is the rate lenders now require.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>30 million shares at 30.00, so E = 900. Debt 300, risk-free at 4%. r<sub>E</sub> = 9.5%.</p><p><b>(a)</b> V = 1 200. r<sub>U</sub> = 0.75 × 0.095 + 0.25 × 0.04 = 0.071250 + 0.010000 = 0.081250 = 8.1250%.</p><p><b>(b)</b> A new loan of 450 will repay the 300 and pay out the rest. At the announcement the price stays 30.00 (MM I).</p><p><b>(c)</b> Payout 450 − 300 = 150, DPS = 150/30 = 5.00, P<sub>ex</sub> = (1 200 − 450)/30 = 25.00. A holder has 25.00 + 5.00 = 30.00: neither better nor worse off.</p><p><b>(d)</b> Lenders now require 5.5%. D/E = 450/750 = 0.6 and r<sub>E</sub> = 0.081250 + 0.6 × 0.026250 = 0.081250 + 0.015750 = 0.097000 = 9.7000%.</p><p><b>(e)</b> Repurchase instead: n = 150/30.00 = 5 million, N<sub>1</sub> = 25 million, 750/25 = 30.00, unchanged.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has 20 million shares at 75.00 and 300 million of risk-free debt at 4%. Its equity cost of capital is 8.5%. It takes a new loan of 700 million, repays the old debt and pays the rest out as a dividend. The larger debt is risky: lenders require 5% on it. What is r<sub>E</sub> after the transaction, to four decimals?</p>`,
      options: ["10.1364%", "8.5000%", "11.1875%", "9.5000%"],
      answer: 3,
      solution: `<p><b>r<sub>U</sub>.</b> E = 20 × 75.00 = 1 500 and V = 1 800. r<sub>U</sub> = (1 500/1 800)(0.085) + (300/1 800)(0.04) = 0.070833 + 0.006667 = 0.077500 = 7.7500%.</p><p><b>The payout.</b> 700 − 300 = 400, so DPS = 20.00 and P<sub>ex</sub> = (1 800 − 700)/20 = 55.00.</p><p><b>r<sub>E</sub>.</b> D/E = 700/1 100 = 0.636364. r<sub>E</sub> = 0.077500 + 0.636364 × (0.077500 − 0.050000) = 0.077500 + 0.017500 = 0.095000 = <b>9.5000%</b>.</p>`,
      check: `<p>FCF = 0.0775 × 1 800 = 139.50. Interest 0.05 × 700 = 35.00, dividends 104.50, DPS = 104.50/20 = 5.2250 and 5.2250/0.095 = 55.00 = P<sub>ex</sub>. It catches a D/V slip: r<sub>E</sub> = 8.8194% gives 5.2250/0.088194 = 59.24. It catches the old 8.5% too: 5.2250/0.085 = 61.47. It does not catch the old r<sub>D</sub> if you also charge interest at 4%: (139.50 − 28.00)/20 = 5.5750 and 5.5750/0.101364 = 55.00 as well. Only the question's words, lenders now require 5%, catch that one.</p>`,
      traps: [
        "Kept the old r<sub>D</sub> of 4%: 0.0775 + 0.636364 × 0.0375 = 10.1364%. Risky debt takes part of the risk off equity.",
        "Kept the old cost of equity of 8.5000%, as if the transaction left the equity's risk unchanged. More debt on a smaller equity base raises r<sub>E</sub>.",
        "Added the new loan to the old debt instead of repaying it: D = 1 000, E = 800, 0.0775 + 1.25 × 0.0275 = 11.1875%.",
        null,
      ],
    },
    {
      id: "mm-14",
      title: "Exam level: target D/V, buyback and the new dividend (H2025 E3)",
      theory: `<p>H2025 Exercise 3 started from the cash flow instead of the cost of equity. Its parts: r<sub>U</sub> as FCF/V; r<sub>E</sub> and the price; the dividend per share and the price after it; a buyback to a target D/V; the new dividend per share and r<sub>E</sub>; the comparison of shareholders. The new dividend per share ends the longest chain: it needs the new debt, the shares bought, the shares left and the interest on all the debt.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = FCF/V → D<sub>new</sub> = (D/V)<sub>target</sub> × V − D<sub>old</sub> → n = D<sub>new</sub>/P → DPS<sub>1</sub> = (FCF − r<sub>D</sub> × D<sub>target</sub>)/(N<sub>0</sub> − n)</div>
<div class="where">Close with the check the key rewards: DPS<sub>1</sub>/r<sub>E</sub> = P, so the seller, the holder and the shareholder without a recapitalisation all end at P.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>Debt 100, risk-free at 5%, equity 300, 5 million shares. FCF = 38 a year forever, paid out as interest and dividends.</p><p><b>(a)</b> V = 400, r<sub>U</sub> = 38/400 = 9.5000%. r<sub>E</sub> = 0.095 + (100/300)(0.045) = 0.095 + 0.015 = 0.11 = 11.0000%. P = 300/5 = 60.00.</p><p><b>(b)</b> Interest 5, dividends 33, DPS = 6.60. Price after the dividend: 6.60/0.11 = 60.00 (66.60 just before it).</p><p><b>(c)</b> Target D/V = 0.40: D = 160, new debt 60. The announcement leaves P at 60.00. n = 60/60.00 = 1 million, leaving 4 million.</p><p><b>(d)</b> Interest 0.05 × 160 = 8, dividends 30, DPS = 7.50. r<sub>E</sub> = 0.095 + (160/240)(0.045) = 0.095 + 0.030 = 0.125 = 12.5000%.</p><p><b>(e)</b> No recapitalisation: 6.60/0.11 = 60.00. Sold: 60.00 in cash. Kept: 7.50/0.125 = 60.00. All equal, MM I.</p></div>`,
      q: `<p>A firm operates in a perfect market with no taxes. It has 200 million of risk-free debt at r<sub>f</sub> = 3% and equity worth 800 million, on 10 million shares. It generates a free cash flow of 57 million a year in perpetuity, paid out as interest and dividends at the end of each year. The board now issues debt until D/V = 0.55 and uses the proceeds to repurchase shares right away. The new debt is also risk-free at 3%. What is the dividend per share at the end of year 1, to four decimals?</p>`,
      options: ["5.1000", "7.2000", "9.0667", "12.9600"],
      answer: 1,
      solution: `<p><b>Start.</b> V = 1 000, r<sub>U</sub> = 57/1 000 = 5.7000%, P = 800/10 = 80.00. r<sub>E</sub> = 0.057 + (200/800)(0.027) = 0.057 + 0.00675 = 0.06375 = 6.3750%. Without the recapitalisation DPS = (57 − 6)/10 = 5.1000.</p><p><b>Recapitalisation.</b> D<sub>target</sub> = 0.55 × 1 000 = 550, so D<sub>new</sub> = 350. The price stays 80.00 at the announcement. n = 350/80.00 = 4.3750 million, leaving 5.6250 million.</p><p><b>New dividend.</b> Interest 0.03 × 550 = 16.50, dividends 57 − 16.50 = 40.50, DPS = 40.50/5.6250 = <b>7.2000</b>.</p><p><b>New r<sub>E</sub>.</b> 0.057 + (550/450)(0.027) = 0.057 + 0.033 = 0.0900 = 9.0000%.</p>`,
      check: `<p>7.2000/0.09 = 80.00: the holder is as well off as the seller, who got 80.00 in cash. So is the shareholder without a recapitalisation: 5.1000/0.06375 = 80.00. As a group: 4.375 × 80.00 + 5.625 × 80.00 = 350 + 450 = 800, the equity before. The check fails on the usual slips: the old share count gives 4.0500/0.09 = 45.00 and the old interest gives 9.0667/0.09 = 100.74.</p>`,
      traps: [
        "Left the recapitalisation out: (57 − 6)/10 = 5.1000 is the dividend per share without it.",
        null,
        "Charged interest on the old 200 only: (57 − 6)/5.6250 = 9.0667.",
        "Bought back with the 550 target instead of the 350 of new debt: n = 550/80.00 = 6.8750 million, so 40.50/3.1250 = 12.9600.",
      ],
    },
  ],
});

/* sjanger 3 · wacc-apv · Valuation with leverage: tax shield, WACC and APV */
window.EDU_DATA.sjangre.push({
  id: "wacc-apv",
  num: 3,
  title: "Valuation with leverage: tax shield, WACC and APV",
  summary: "From one year's tax saving to a two-period valuation by WACC and APV",
  chapters: [7, 17, 18, 19, 20],
  exam: "11 of 11 papers · H2024 E5, H2025 E4",
  intro: `<p>Every paper since 2015 values a levered firm twice: once by discounting free cash flow at the after-tax WACC, once by APV, where the tax shield is added to the unlevered value. It is usually the largest exercise on the paper. In H2024 E5 and H2025 E4 it ran to five and nine chained sub-questions. This ladder starts with one year's tax saving and ends with H2025 E4 in full: the rates, a two-period value path, the debt adjustment between periods and the tax shield discounted at the right rate, to four decimals. Seven steps follow Kurbatov's 2026 lectures: an interest-only loan, working capital released at the end, flow to equity, which rate goes with which method, constant interest coverage, why permanent debt is valued by APV and debt capacity.</p>`,
  steps: [
    {
      id: "wacc-apv-1",
      title: "The interest tax shield in one year",
      theory: `<p>Interest is deductible from taxable profit, dividends are not. A firm that pays interest of r<sub>D</sub> × D therefore pays τ<sub>c</sub> × r<sub>D</sub> × D less tax than the same firm without debt. That saving is the interest tax shield, a real cash flow to the firm's investors. Like any cash flow it is worth its present value. When the loan is a fixed contract the shield is as safe as the interest, so you discount it at r<sub>D</sub>.</p>
<div class="formula"><div class="eq">TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub></div>
<div class="eq">One-year loan: PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D / (1 + r<sub>D</sub>)</div>
<div class="where">D<sub>t−1</sub> is the debt outstanding during year t, so the shield arrives at the end of the year.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm borrows 200 for one year at r<sub>D</sub> = 5%, τ<sub>c</sub> = 25%.</p><p>Interest = 0.05 × 200 = 10.00. TS<sub>1</sub> = 0.25 × 10.00 = 2.50, received at date 1.</p><p>PV(TS) = 2.50/1.05 = 2.3810.</p></div>`,
      q: `<p>A firm borrows 150 for one year at r<sub>D</sub> = 6% and repays it in full at date 1. The corporate tax rate is τ<sub>c</sub> = 22%. What is the present value at date 0 of the interest tax shield?</p>`,
      options: ["1.8679", "33.0000", "1.9800", "8.4906"],
      answer: 0,
      solution: `<p>Interest at date 1 = 0.06 × 150 = 9.00.</p><p>TS<sub>1</sub> = 0.22 × 9.00 = 1.98, received at date 1.</p><p>The loan is a fixed contract, so the shield is discounted at r<sub>D</sub>: PV(TS) = 1.98/1.06 = <b>1.8679</b>.</p>`,
      check: `<p>Backwards: 1.8679 × 1.06 = 1.9800 = 0.22 × 9.00. The value is also far below τ<sub>c</sub> × D = 33.00, the value of a shield that lasts forever. One year of savings must be worth much less than a perpetuity of them.</p>`,
      traps: [
        null,
        "Used the permanent-debt shortcut τ<sub>c</sub> × D = 0.22 × 150 = 33.0000 on a one-year loan.",
        "Forgot to discount: 1.9800 is the shield at date 1, not its value at date 0.",
        "Discounted the interest instead of the tax saving: 9.00/1.06 = 8.4906.",
      ],
    },
    {
      id: "wacc-apv-15",
      title: "An interest-only loan: the tax shield is an annuity",
      theory: `<p>Many loans pay interest every year and repay the whole principal at maturity. The interest is fixed by contract, so each year's shield is the same safe amount until the loan ends: an annuity, discounted at r<sub>D</sub>. The repayment of principal is not deductible, so it stays out of the shield. Kurbatov's lecture 3 example: 100 million of interest a year for 10 years, τ<sub>c</sub> = 35% and r<sub>f</sub> = 5% give 35 × the annuity factor = 270.26 million.</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D × [1 − (1 + r<sub>D</sub>)<sup>−T</sup>]/r<sub>D</sub></div>
<div class="where">T is the number of interest payments. When the loan is priced at par (coupon = r<sub>D</sub>), the same number is τ<sub>c</sub> × [D − D/(1 + r<sub>D</sub>)<sup>T</sup>]: the shield on everything except the final repayment. τ<sub>c</sub> × D is the limit as T grows without end.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 3</span><p>DFB pays 100 million of interest a year for 10 years and repays 2 billion in year 10. τ<sub>c</sub> = 35% and r<sub>f</sub> = 5%.</p><p>TS = 0.35 × 100 = 35 a year. Annuity factor (1 − 1.05<sup>−10</sup>)/0.05 = 7.721735, so PV(TS) = 35 × 7.721735 = 270.26 million.</p><p>Par check: 0.35 × (2 000 − 2 000/1.05<sup>10</sup>) = 0.35 × (2 000 − 1 227.83) = 270.26.</p></div>`,
      q: `<p>A firm borrows 600 at r<sub>D</sub> = 6% for 8 years. It pays interest every year and repays the full 600 at the end of year 8. The corporate tax rate is 22% and the firm's unlevered cost of capital is 10%. What is the present value of the interest tax shield?</p>`,
      options: ["132.00", "52.13", "63.36", "49.18"],
      answer: 3,
      solution: `<p>Interest = 0.06 × 600 = 36.00 a year, so TS = 0.22 × 36.00 = 7.92 a year for 8 years.</p><p>The payments are fixed by contract, so discount at r<sub>D</sub>: (1 − 1.06<sup>−8</sup>)/0.06 = 6.209794.</p><p>PV(TS) = 7.92 × 6.209794 = <b>49.18</b>. The 600 repaid in year 8 adds nothing.</p>`,
      check: `<p>Par route: the repayment is worth 600/1.06<sup>8</sup> = 376.4474 today, so τ<sub>c</sub> × (600 − 376.4474) = 0.22 × 223.5526 = 49.18 ✓. It also lies below the perpetual ceiling τ<sub>c</sub> × D = 132.00, as eight years of shields must.</p>`,
      traps: [
        "Used the permanent-debt shortcut τ<sub>c</sub> × D = 0.22 × 600 = 132.00 on a loan that ends in year 8.",
        "Treated the shields as an annuity due, as if the first came today: 7.92 × 6.209794 × 1.06 = 52.13. Interest is paid at the end of each year.",
        "Added up the shields without discounting: 8 × 7.92 = 63.36.",
        null,
      ],
    },
    {
      id: "wacc-apv-3",
      title: "Permanent debt and the announcement: who gets the tax shield",
      theory: `<p>If the firm borrows a fixed amount and rolls it over forever, the shield τ<sub>c</sub> × r<sub>D</sub> × D is a level perpetuity as safe as the interest. Discounted at r<sub>D</sub>, the r<sub>D</sub> cancels and the shield is worth τ<sub>c</sub> × D, which the levered firm has on top of the unlevered one. The share price moves when the market learns about the debt, not when the debt is issued. At that moment the whole PV(TS) lands on the shares already outstanding: the lenders pay a fair price for their debt, a zero-NPV deal. The buyback then runs at the new, higher price, so it moves nothing.</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D / r<sub>D</sub> = τ<sub>c</sub> × D  ·  V<sup>L</sup> = V<sup>U</sup> + PV(TS)</div>
<div class="eq">P<sub>1</sub> = P<sub>0</sub> + PV(TS)/N<sub>0</sub>  ·  shares bought back = D/P<sub>1</sub></div>
<div class="where">τ<sub>c</sub> × D holds only when the debt is both fixed in amount and permanent. Neither value line is on the formula sheet. N<sub>0</sub> is the share count before anything happens. Borrowing to hold government bonds is not leverage: net debt stays at zero and the interest received is taxed as the interest paid is deducted. The price does not move.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>10 million shares at 40.00, so V<sup>U</sup> = 400. The firm announces 100 of permanent debt at r<sub>D</sub> = 4% to buy back shares, τ<sub>c</sub> = 25%.</p><p>TS = 0.25 × 0.04 × 100 = 1.00 a year, so PV(TS) = 1.00/0.04 = 25.00 = 0.25 × 100 and V<sup>L</sup> = 425. P<sub>1</sub> = 40.00 + 25.00/10 = 42.50.</p><p>Shares bought back = 100/42.50 = 2.3529 million, leaving 7.6471 million. Equity afterwards = 425 − 100 = 325 and 325/7.6471 = 42.50.</p></div>`,
      q: `<p>An all-equity firm has 40 million shares at 15.00. Investors expect it to stay all-equity. It announces that it will borrow 150 at r<sub>D</sub> = 5% as permanent debt and use all of it to buy back shares. τ<sub>c</sub> = 22%. The market believes the plan at once. How many shares, in millions, does the firm buy back?</p>`,
      options: ["10.0000", "12.4224", "9.4787", "9.9726"],
      answer: 2,
      solution: `<p>V<sup>U</sup> = 40 × 15.00 = 600. The debt is permanent, so PV(TS) = 0.22 × 150 = 33.00.</p><p>At the announcement: P<sub>1</sub> = 15.00 + 33.00/40 = 15.8250.</p><p>The buyback runs at that price: 150/15.8250 = <b>9.4787</b> million shares, leaving 30.5213 million.</p>`,
      check: `<p>After the buyback V<sup>L</sup> = 600 + 33 = 633 and equity = 633 − 150 = 483, so the price is 483/30.5213 = 15.8250, the announcement price. A buyback at the market price cannot move the price. The old shareholders now hold 150 in cash plus 483 in shares, 633 in all: 33 more than before, the whole PV(TS).</p>`,
      traps: [
        "Bought back at the old price of 15.00, as if there were no tax shield: 150/15.00 = 10.0000.",
        "Subtracted the debt while the borrowed cash was still in the firm: (633 − 150)/40 = 12.0750, so 150/12.0750 = 12.4224.",
        null,
        "Added one year's shield to the price instead of its present value: 15.00 + 1.65/40 = 15.04125, so 150/15.04125 = 9.9726.",
      ],
    },
    {
      id: "wacc-apv-4",
      title: "Free cash flow and the unlevered value",
      theory: `<p>Every valuation starts from free cash flow: the cash the operations produce for all investors together, computed as if the firm had no debt. Interest never enters it, because financing is handled in the discount rate or in PV(TS). Discount it at r<sub>U</sub>, the return investors require on the assets alone, to get V<sup>U</sup>. With constant growth from next year on, use the growing perpetuity.</p>
<div class="formula"><div class="eq">FCF = EBIT × (1 − τ<sub>c</sub>) + Depreciation − CapEx − ΔNWC</div>
<div class="eq">V<sup>U</sup> = FCF<sub>1</sub>/(r<sub>U</sub> − g)</div>
<div class="where">Both are on the formula sheet. FCF<sub>1</sub> is next year's flow; if you are given this year's, multiply by (1 + g) first.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Next year: EBIT 100, depreciation 20, CapEx 25, ΔNWC 5, τ<sub>c</sub> = 25%. r<sub>U</sub> = 10% and g = 2%.</p><p>FCF<sub>1</sub> = 100 × 0.75 + 20 − 25 − 5 = 75 + 20 − 25 − 5 = 65.00.</p><p>V<sup>U</sup> = 65.00/(0.10 − 0.02) = 65.00/0.08 = 812.50.</p></div>`,
      q: `<p>Next year a firm expects EBIT of 80, interest of 12 on its current debt, depreciation of 15, capital expenditure of 18 and an increase in net working capital of 4. τ<sub>c</sub> = 25%. Free cash flow grows at 3% a year after that, forever. The unlevered cost of capital is r<sub>U</sub> = 11%. What is V<sup>U</sup>?</p>`,
      options: ["550.00", "662.50", "481.82", "475.00"],
      answer: 1,
      solution: `<p>EBIT × (1 − τ<sub>c</sub>) = 80 × 0.75 = 60.00. The interest of 12 stays out.</p><p>FCF<sub>1</sub> = 60.00 + 15 − 18 − 4 = 53.00.</p><p>V<sup>U</sup> = 53.00/(0.11 − 0.03) = 53.00/0.08 = <b>662.50</b>.</p>`,
      check: `<p>Backwards: 662.50 × 0.08 = 53.00 = FCF<sub>1</sub>. One year on the firm is worth 53.00 × 1.03/0.08 = 682.38, which is 662.50 × 1.03: value grows at g, as a growing perpetuity must.</p>`,
      traps: [
        "Deducted the interest before tax: (80 − 12) × 0.75 + 15 − 18 − 4 = 44.00, so 44.00/0.08 = 550.00.",
        null,
        "Ignored the growth: 53.00/0.11 = 481.82.",
        "Forgot to add back depreciation: 60.00 − 18 − 4 = 38.00, so 38.00/0.08 = 475.00.",
      ],
    },
    {
      id: "wacc-apv-22",
      title: "Free cash flow over a project's life: working capital comes back",
      theory: `<p>A project ties up working capital: inventory and receivables net of payables. Building it up is a cash outflow. When the project ends the working capital is released, a cash inflow. Always use the change ΔNWC, never the level: Kurbatov calls forgetting the delta one of the biggest fallacies. Add back depreciation, or start from EBITDA. Interest never enters FCF.</p>
<div class="formula"><div class="eq">FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC = EBITDA(1 − τ<sub>c</sub>) + τ<sub>c</sub> × Dep − CapEx − ΔNWC</div>
<div class="eq">ΔNWC<sub>t</sub> = NWC<sub>t</sub> − NWC<sub>t−1</sub></div>
<div class="where">In the final year NWC falls to zero, so ΔNWC is negative and FCF rises by the amount released. Financing enters through the discount rate or PV(TS), never as interest in FCF.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A two-year project needs equipment for 60 today, depreciated over two years. Working capital is 10 today, 15 at the end of year 1 and 0 at the end of year 2. EBITDA is 50 a year and τ<sub>c</sub> = 25%.</p><p>EBIT = 50 − 30 = 20, so EBIT(1 − τ<sub>c</sub>) = 15. Year 0: −60 − 10 = −70. Year 1: 15 + 30 − (15 − 10) = 40. Year 2: 15 + 30 − (0 − 15) = 60.</p></div>`,
      q: `<p>In year 3, the last year of a project, EBITDA is 90 and depreciation is 30. There is no capital expenditure that year. Working capital stands at 24 at the end of year 2 and is fully released by the end of year 3. The project is partly debt-financed and pays interest of 8 in year 3. τ<sub>c</sub> = 25%. What is the project's free cash flow in year 3?</p>`,
      options: ["99.00", "75.00", "51.00", "93.00"],
      answer: 0,
      solution: `<p>EBIT = 90 − 30 = 60, so EBIT(1 − τ<sub>c</sub>) = 45.</p><p>ΔNWC = 0 − 24 = −24: the release adds 24.</p><p>FCF = 45 + 30 − 0 − (−24) = <b>99.00</b>. The interest of 8 stays out.</p>`,
      check: `<p>EBITDA route: 90 × 0.75 + 0.25 × 30 + 24 = 67.50 + 7.50 + 24 = 99.00 ✓. The two forms differ only in where depreciation enters, so the check catches a forgotten add-back, not a wrong sign on ΔNWC.</p>`,
      traps: [
        null,
        "Forgot that the working capital comes back: 45 + 30 = 75.00. The 24 tied up since year 2 is released in year 3.",
        "Got the sign of ΔNWC wrong and subtracted the release: 45 + 30 − 24 = 51.00. A fall in working capital frees cash.",
        "Deducted the interest: (60 − 8) × 0.75 + 30 + 24 = 93.00. Interest belongs in the discount rate or PV(TS), not in FCF.",
      ],
    },
    {
      id: "wacc-apv-5",
      title: "A loan with a fixed repayment schedule",
      theory: `<p>Most debt on an exam is not permanent. When the question gives the repayment plan, every future balance is known today, so every shield is as safe as the debt and is discounted at r<sub>D</sub>. Build a table: the opening balance each year, its interest and the shield, then discount each shield separately. There is no shortcut.</p>
<div class="formula"><div class="eq">PV(TS) = Σ<sub>t</sub> τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub> / (1 + r<sub>D</sub>)<sup>t</sup></div>
<div class="where">D<sub>t−1</sub> is the balance carried into year t, after the previous repayment. Here τ<sub>c</sub> × D<sub>0</sub> is a ceiling, not the answer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A loan of 90 at r<sub>D</sub> = 5% is repaid with 30 at the end of each of years 1, 2 and 3. τ<sub>c</sub> = 20%.</p><p>Opening balances 90, 60, 30. Interest 4.50, 3.00, 1.50. Shields 0.90, 0.60, 0.30.</p><p>PV(TS) = 0.90/1.05 + 0.60/1.05² + 0.30/1.05³ = 0.857143 + 0.544218 + 0.259151 = 1.6605.</p></div>`,
      q: `<p>A firm borrows 240 today at r<sub>D</sub> = 6%. The loan contract repays it in three equal instalments of 80 at the end of years 1, 2 and 3. Interest is paid each year on the balance outstanding during that year. τ<sub>c</sub> = 25% and r<sub>U</sub> = 11%. What is PV(TS)?</p>`,
      options: ["60.0000", "6.0686", "6.5398", "3.3321"],
      answer: 2,
      solution: `<table class="data"><tr><th>Year</th><th>Opening balance</th><th>Interest at 6%</th><th>TS at 25%</th><th>PV at 6%</th></tr>
<tr><td>1</td><td class="n">240</td><td class="n">14.40</td><td class="n">3.60</td><td class="n">3.396226</td></tr>
<tr><td>2</td><td class="n">160</td><td class="n">9.60</td><td class="n">2.40</td><td class="n">2.135991</td></tr>
<tr><td>3</td><td class="n">80</td><td class="n">4.80</td><td class="n">1.20</td><td class="n">1.007543</td></tr></table>
<p>The schedule is fixed by contract, so the shields are discounted at r<sub>D</sub>: PV(TS) = 3.396226 + 2.135991 + 1.007543 = <b>6.5398</b>.</p>`,
      check: `<p>Every shield is 0.25 × 0.06 = 0.015 times the opening balance, so PV(TS) = 0.015 × (240/1.06 + 160/1.06² + 80/1.06³) = 0.015 × 435.9841 = 6.5398, without computing a single shield. It also lies between 0 and the ceiling τ<sub>c</sub> × D<sub>0</sub> = 60.00.</p>`,
      traps: [
        "Used the permanent-debt shortcut on a loan that is repaid: 0.25 × 240 = 60.0000.",
        "Discounted at r<sub>U</sub> = 11% as if the debt moved with firm value: 3.243243 + 1.947894 + 0.877430 = 6.0686.",
        null,
        "Charged interest on the closing balances 160, 80 and 0: 2.40/1.06 + 1.20/1.06² = 3.3321.",
      ],
    },
    {
      id: "wacc-apv-6",
      title: "The after-tax WACC and the WACC method",
      theory: `<p>A firm that keeps a constant debt ratio can be valued in one line: discount FCF at the after-tax WACC. The (1 − τ<sub>c</sub>) on r<sub>D</sub> puts the tax shield into the rate, so you never add it on top. Without that factor you get the pre-tax WACC, which under the course's rebalancing convention equals r<sub>U</sub> and gives V<sup>U</sup>, not V<sup>L</sup>. The weights are D/V and E/V at market values: convert a D/E ratio first.</p>
<div class="formula"><div class="eq">r<sub>wacc</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V) r<sub>D</sub> τ<sub>c</sub></div>
<div class="eq">V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g)  ·  D/V = (D/E)/(1 + D/E)</div>
<div class="where">r<sub>U</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub> is the pre-tax WACC. The second form of r<sub>wacc</sub> is a quick check and is not on the sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/V = 0.40, r<sub>E</sub> = 12%, r<sub>D</sub> = 5%, τ<sub>c</sub> = 25%, FCF<sub>1</sub> = 30, g = 2%.</p><p>Pre-tax: 0.60 × 0.12 + 0.40 × 0.05 = 0.072 + 0.020 = 9.20% = r<sub>U</sub>. After-tax: 0.072 + 0.40 × 0.05 × 0.75 = 0.072 + 0.015 = 8.70%.</p><p>V<sup>L</sup> = 30/(0.087 − 0.02) = 30/0.067 = 447.76.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.25. Its cost of equity is r<sub>E</sub> = 13%, its cost of debt r<sub>D</sub> = 6% and τ<sub>c</sub> = 25%. Next year's free cash flow is 80, growing at 3% a year forever. What is V<sup>L</sup> by the WACC method?</p>`,
      options: ["930.23", "963.86", "1 015.87", "707.96"],
      answer: 1,
      solution: `<p>D/V = 0.25/1.25 = 0.20 and E/V = 0.80.</p><p>r<sub>wacc</sub> = 0.80 × 0.13 + 0.20 × 0.06 × 0.75 = 0.1040 + 0.0090 = 0.1130.</p><p>V<sup>L</sup> = 80/(0.1130 − 0.03) = 80/0.0830 = <b>963.86</b>.</p>`,
      check: `<p>Pre-tax WACC: 0.1040 + 0.20 × 0.06 = 0.1160 = r<sub>U</sub>. Shortcut: 0.1160 − 0.20 × 0.06 × 0.25 = 0.1160 − 0.0030 = 0.1130, the same rate. Backwards: 963.86 × 0.0830 = 80.00.</p>`,
      traps: [
        "Used the pre-tax WACC of 11.60%: 80/0.0860 = 930.23, which is V<sup>U</sup>, not V<sup>L</sup>.",
        null,
        "Used D/E = 0.25 as the debt weight: r<sub>wacc</sub> = 0.75 × 0.13 + 0.25 × 0.045 = 0.10875, so 80/0.07875 = 1 015.87.",
        "Forgot the growth: 80/0.1130 = 707.96.",
      ],
    },
    {
      id: "wacc-apv-7",
      title: "APV when the debt grows with the firm",
      theory: `<p>APV values the firm in two pieces: V<sup>U</sup> at r<sub>U</sub>, then the tax shield. The rate on the shield depends on the debt policy. If the firm keeps its debt at a constant fraction of its value, future debt rises and falls with the business, so the shield carries asset risk and is discounted at r<sub>U</sub>. Only fixed debt, permanent or on a schedule, takes r<sub>D</sub>. Excess cash is not part of operations: add it at face value at the end.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS)  ·  PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D<sub>0</sub>/(r<sub>U</sub> − g)  (constant D/V)</div>
<div class="where">D<sub>0</sub> is today's debt. It grows at g with the firm, so the shield does too. Firm value with cash = V<sup>L</sup> + excess cash.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>FCF<sub>1</sub> = 50, g = 2%, r<sub>U</sub> = 10%. Debt today 200 at r<sub>D</sub> = 5%, held at a constant D/V, τ<sub>c</sub> = 25%. Excess cash 40.</p><p>V<sup>U</sup> = 50/0.08 = 625.00. TS<sub>1</sub> = 0.25 × 0.05 × 200 = 2.50, so PV(TS) = 2.50/0.08 = 31.25.</p><p>V<sup>L</sup> = 625.00 + 31.25 = 656.25. With the cash: 656.25 + 40 = 696.25.</p></div>`,
      q: `<p>A fund values a firm with next year's free cash flow of 72, growing at 3% a year forever. Its unlevered cost of capital is r<sub>U</sub> = 12%. The firm has 300 of debt today at r<sub>D</sub> = 6% and will keep its debt at a constant fraction of firm value, so the debt also grows at 3% a year. τ<sub>c</sub> = 25%. The firm also holds 50 of excess cash that operations do not need. What is the firm worth today, excess cash included?</p>`,
      options: ["1 000.00", "850.00", "925.00", "900.00"],
      answer: 3,
      solution: `<p>V<sup>U</sup> = 72/(0.12 − 0.03) = 72/0.09 = 800.00.</p><p>TS<sub>1</sub> = 0.25 × 0.06 × 300 = 4.50, growing at 3%. The debt tracks firm value, so the shield is discounted at r<sub>U</sub>: PV(TS) = 4.50/0.09 = 50.00.</p><p>V<sup>L</sup> = 800.00 + 50.00 = 850.00. With the cash: 850.00 + 50 = <b>900.00</b>.</p>`,
      check: `<p>Run the WACC method on the operations (consistency check 1). D/V = 300/850 = 0.352941, so r<sub>wacc</sub> = 0.12 − 0.352941 × 0.06 × 0.25 = 0.12 − 0.005294 = 0.114706. Then 72/(0.114706 − 0.03) = 850.00, the APV value before cash. The weight came from the APV answer, so this is a fixed point rather than a second valuation. It still catches a wrong rate on the shield: at r<sub>D</sub> the two methods disagree.</p>`,
      traps: [
        "Discounted the shield at r<sub>D</sub> as if the debt were fixed: 4.50/(0.06 − 0.03) = 150.00, so 800 + 150 + 50 = 1 000.00.",
        "Left out the excess cash: 800.00 + 50.00 = 850.00 is the operations only.",
        "Used τ<sub>c</sub> × D for the shield: 800 + 0.25 × 300 + 50 = 925.00.",
        null,
      ],
    },
    {
      id: "wacc-apv-20",
      title: "Flow to equity: value the equity directly",
      theory: `<p>FTE values the equity, not the firm (lecture 8). Start from FCF, take off the interest after tax and add net borrowing. What is left is the cash the shareholders actually receive, FCFE. Discount it at r<sub>E</sub>. With a constant D/E the debt grows with the firm, so net borrowing is g × D and FCFE grows at g as well.</p>
<div class="formula"><div class="eq">FCFE<sub>t</sub> = FCF<sub>t</sub> − (1 − τ<sub>c</sub>) × IP<sub>t</sub> + (D<sub>t</sub> − D<sub>t−1</sub>)</div>
<div class="eq">E = FCFE<sub>1</sub>/(r<sub>E</sub> − g)</div>
<div class="where">IP<sub>t</sub> is the interest paid on the debt carried into year t, r<sub>D</sub> × D<sub>t−1</sub>. Net borrowing is positive when the debt grows and negative when it is repaid. Like APV, FTE needs the debt path.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 6</span><p>AMC: EBIT 2 000 next year, τ<sub>c</sub> = 40%, no net investment, g = 3%. Debt 5 000, risk-free at 5%, growing at 3%. r<sub>E</sub> = 15%.</p><p>Interest 250, net borrowing 0.03 × 5 000 = 150. FCFE = (2 000 − 250) × 0.60 + 150 = 1 050 + 150 = 1 200. E = 1 200/(0.15 − 0.03) = 10 000, the same as by APV.</p></div>`,
      q: `<p>Next year a firm will earn EBIT of 500. Capital expenditure equals depreciation and working capital does not change. τ<sub>c</sub> = 25%. The firm has 1 500 of risk-free debt at 4%. It keeps a constant debt-to-equity ratio, so its debt grows at 2% a year, like its cash flows. Any new borrowing is paid out to the shareholders. Its cost of equity is 11%. What is its equity worth by the flow-to-equity method?</p>`,
      options: ["3 833.33", "4 000.00", "4 166.67", "3 666.67"],
      answer: 1,
      solution: `<p>FCF = 500 × 0.75 = 375.</p><p>Interest = 0.04 × 1 500 = 60, which costs 60 × 0.75 = 45 after tax. Net borrowing = 0.02 × 1 500 = 30.</p><p>FCFE = 375 − 45 + 30 = 360.</p><p>E = 360/(0.11 − 0.02) = <b>4 000.00</b>.</p>`,
      check: `<p>WACC route: V<sup>L</sup> = 4 000 + 1 500 = 5 500 and r<sub>wacc</sub> = (4 000/5 500) × 11% + (1 500/5 500) × 4% × 0.75 = 8.0000% + 0.8182% = 8.8182%. Then 375/(0.088182 − 0.02) = 5 500 ✓. Like WACC = APV this is a fixed point, but it fails on a forgotten net borrowing: E = 3 666.67 gives V<sup>L</sup> = 5 166.67, r<sub>wacc</sub> = 8.6774% and 375/(0.086774 − 0.02) = 5 615.96, not 5 166.67.</p>`,
      traps: [
        "Took off the full interest without its tax saving: 375 − 60 + 30 = 345, so 345/0.09 = 3 833.33.",
        null,
        "Discounted FCF instead of FCFE at r<sub>E</sub>: 375/0.09 = 4 166.67. That counts the lenders' cash flow as the shareholders'.",
        "Left out the net borrowing: (375 − 45)/0.09 = 3 666.67. The new debt raised each year goes to the shareholders.",
      ],
    },
    {
      id: "wacc-apv-21",
      title: "Three methods, three rates",
      theory: `<p>Kurbatov's wrap-up: each method has its own cash flow and its own rate. WACC discounts FCF at r<sub>wacc</sub>. APV discounts the same FCF at r<sub>U</sub> and adds PV(TS). FTE discounts FCFE at r<sub>E</sub>. If an exam gives you r<sub>wacc</sub>, expect the WACC method; if it gives r<sub>U</sub>, expect APV. A frequent follow-up: compute r<sub>wacc</sub> and explain how it compares with r<sub>U</sub>.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub></div>
<div class="eq">r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub></div>
<div class="where">The second form of r<sub>wacc</sub> holds when the debt is rebalanced to a target D/V, the course's default. It does not hold for a fixed, permanent amount of debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/V = 0.25, r<sub>E</sub> = 12%, r<sub>D</sub> = 6%, τ<sub>c</sub> = 22%.</p><p>r<sub>U</sub> = 0.75 × 12% + 0.25 × 6% = 9.00% + 1.50% = 10.50%. r<sub>wacc</sub> = 9.00% + 0.25 × 6% × 0.78 = 9.00% + 1.17% = 10.17%. The gap is 0.25 × 0.22 × 6% = 0.33 points.</p></div>`,
      q: `<p>A firm keeps D/V = 0.40. Its cost of equity is 13%, its cost of debt 5% and τ<sub>c</sub> = 25%. Which statement about its after-tax WACC is correct?</p>`,
      options: [
        "r<sub>wacc</sub> = 7.35%, the pre-tax rate times (1 − τ<sub>c</sub>), applied to free cash flow before interest",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow after interest, because the interest is cash the firm really pays out",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow before interest. It is below r<sub>U</sub> because debt is cheaper than equity, so it would stay below with no taxes",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow before interest. It is below r<sub>U</sub> = 9.80% by the tax saving 0.40 × 25% × 5%",
      ],
      answer: 3,
      solution: `<p>r<sub>U</sub> = 0.60 × 13% + 0.40 × 5% = 7.80% + 2.00% = 9.80%.</p><p>r<sub>wacc</sub> = 7.80% + 0.40 × 5% × 0.75 = 7.80% + 1.50% = <b>9.30%</b>.</p><p>The gap of 0.50 points is (D/V)τ<sub>c</sub>r<sub>D</sub> = 0.40 × 0.25 × 5%: the (1 − τ<sub>c</sub>) on r<sub>D</sub> builds the tax shield into the rate. So r<sub>wacc</sub> discounts FCF with no interest deducted. APV would discount the same FCF at 9.80% and add PV(TS). FTE would discount FCFE at 13%.</p>`,
      check: `<p>Set τ<sub>c</sub> = 0: r<sub>wacc</sub> = 7.80% + 2.00% = 9.80% = r<sub>U</sub>. The whole gap is the tax factor, so cheap debt alone lowers nothing. If you deduct the interest in FCF and then discount at r<sub>wacc</sub>, the debt is counted twice.</p>`,
      traps: [
        "Put the tax factor on the whole pre-tax WACC, which gives 7.35%. Only the debt's return is tax-deductible, not the equity's.",
        "Interest belongs in the rate, not in the cash flow. FCF after interest discounted at r<sub>wacc</sub> counts the debt twice.",
        "Cheap debt is offset by a dearer r<sub>E</sub>, since leverage makes the equity riskier. With no taxes r<sub>wacc</sub> equals r<sub>U</sub>.",
        null,
      ],
    },
    {
      id: "wacc-apv-18",
      title: "Constant interest coverage: the levered value in one line",
      theory: `<p>A third debt policy (lecture 8): the firm sets its interest each year at a fixed fraction k of its free cash flow. The shield τ<sub>c</sub> × k × FCF<sub>t</sub> is then a fixed slice of FCF with the same risk, so it is worth τ<sub>c</sub> × k × V<sup>U</sup>. No circularity: you never need V<sup>L</sup> to find the debt. Kurbatov repeated this formula in the wrap-up.</p>
<div class="formula"><div class="eq">IP<sub>t</sub> = k × FCF<sub>t</sub> &nbsp;·&nbsp; PV(TS) = τ<sub>c</sub> × k × V<sup>U</sup> &nbsp;·&nbsp; V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup></div>
<div class="where">k is interest divided by FCF, not debt divided by FCF. The debt follows from the interest: D = IP/r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 5</span><p>Tybo: FCF 2.5 million next year, growing at 4%, r<sub>U</sub> = 10%, τ<sub>c</sub> = 40%, k = 20%.</p><p>V<sup>U</sup> = 2.5/0.06 = 41.67 and V<sup>L</sup> = 1.08 × 41.67 = 45.00. Interest 0.20 × 2.5 = 0.50 at r<sub>D</sub> = 5% means D = 10. Then d = 10/45 = 0.2222, r<sub>wacc</sub> = 10% − 0.2222 × 0.40 × 5% = 9.5556% and 2.5/(0.095556 − 0.04) = 45.00.</p></div>`,
      q: `<p>An expansion will produce free cash flow of 6 next year, growing at 2% a year forever. Its unlevered cost of capital is 9.5%. The firm sets its interest payments each year at 25% of the expansion's free cash flow and borrows at r<sub>D</sub> = 5%. The corporate tax rate is 22%. What is the levered value of the expansion?</p>`,
      options: ["91.00", "86.60", "100.00", "84.40"],
      answer: 3,
      solution: `<p>V<sup>U</sup> = 6/(0.095 − 0.02) = 80.00.</p><p>PV(TS) = τ<sub>c</sub> × k × V<sup>U</sup> = 0.22 × 0.25 × 80.00 = 4.40.</p><p>V<sup>L</sup> = 80.00 × 1.055 = <b>84.40</b>.</p>`,
      check: `<p>WACC route: interest 0.25 × 6 = 1.50 means D = 1.50/0.05 = 30, so d = 30/84.40 = 0.355450 and r<sub>wacc</sub> = 9.5% − 0.355450 × 0.22 × 5% = 9.1090%. Then 6/(0.091090 − 0.02) = 84.40 ✓. The debt grows with FCF, so the constant-D/V formula holds here. The check takes d from the answer, so it confirms the rate on the shield and the arithmetic, not the policy.</p>`,
      traps: [
        "Discounted the growing shield at r<sub>D</sub>: 0.22 × 1.50/(0.05 − 0.02) = 11.00, so 80 + 11 = 91.00. The shield is a slice of FCF and as risky as FCF.",
        "Treated the debt as permanent: D = 1.50/0.05 = 30 and τ<sub>c</sub> × D = 6.60, so 80 + 6.60 = 86.60. This debt grows with the cash flow.",
        "Left the tax rate out: 80 × (1 + 0.25) = 100.00. Only the tax saving on the interest adds value, not the interest itself.",
        null,
      ],
    },
    {
      id: "wacc-apv-23",
      title: "Permanent debt: why APV and what the WACC would get wrong",
      theory: `<p>Kurbatov's biggest takeaway from the valuation lectures: the WACC method works only when the firm keeps a constant debt ratio. With a fixed, permanent amount of debt, value the firm by APV, V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D, because the shield is as safe as the debt and is discounted at r<sub>D</sub> (PS2 Exercise 9). The lectures also show an adjusted WACC for permanent debt and unlevering with D(1 − τ<sub>c</sub>) weights. Kurbatov called both not mandatory: on the exam you use only the formula sheet, whose WACC assumes a constant D/E. What can come is the intuition behind them.</p>
<div class="formula"><div class="eq">Permanent debt: V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D</div>
<div class="where">The shield τ<sub>c</sub>r<sub>D</sub>D a year never changes, so it is as safe as the interest. The formula-sheet WACC assumes a constant D/E, so the shield it builds in is as risky as the assets.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>FCF 9 a year forever, r<sub>U</sub> = 12%, permanent debt 40 at r<sub>D</sub> = 5%, τ<sub>c</sub> = 22%. APV: 9/0.12 + 0.22 × 40 = 75.00 + 8.80 = 83.80. Discount the same shield at r<sub>U</sub>, as a constant ratio would: 0.22 × 0.05 × 40/0.12 = 3.6667, so the firm comes out at only 78.67.</p></div>`,
      q: `<p>A firm has a fixed amount of permanent debt that it will never change. An analyst values it with the formula-sheet WACC, (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>), using today's weights and an r<sub>E</sub> from the formula-sheet MM II. What is wrong? What should you do on the exam?</p>`,
      options: [
        "Nothing: the WACC method gives the same value as APV for any debt policy, so the analyst's number is right",
        "The weights should be book values: with fixed debt the market weights move, so use the balance sheet",
        "He should discount the free cash flow at r<sub>D</sub>, since permanent debt makes the firm as safe as its lenders",
        "His rates assume a constant D/E, so the safe shield is discounted at r<sub>U</sub>. Use APV: V<sup>U</sup> plus τ<sub>c</sub>D",
      ],
      answer: 3,
      solution: `<p>The formula-sheet WACC and MM II assume the firm keeps D/E constant. Then the shield moves with the firm's value and carries the assets' risk, so the WACC discounts it at r<sub>U</sub>. This firm's debt never changes: its shield τ<sub>c</sub>r<sub>D</sub>D is as safe as the interest and is worth <b>τ<sub>c</sub>D</b>. The analyst undervalues the shield. On the exam, value permanent debt by APV: <b>V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D</b>.</p>`,
      check: `<p>Run the example: APV gives 83.80, while the same shield discounted at r<sub>U</sub> gives 78.67. The gap is the shield's lower risk, which the constant-ratio WACC leaves out ✓ Had the question said the firm keeps D/V constant, the WACC method would have been right.</p>`,
      traps: [
        "WACC = APV only when the inputs match the debt policy. These inputs assume a constant D/E, so the safe shield is discounted at r<sub>U</sub> and the value comes out below APV.",
        "Book values never belong in the weights. The problem is the debt policy, not the kind of weights.",
        "Only the tax shield is as safe as the debt. The business risk stays, so V<sup>U</sup> is still discounted at r<sub>U</sub>.",
        null,
      ],
    },
    {
      id: "wacc-apv-8",
      title: "Explicit years and a terminal value",
      theory: `<p>Exam firms often have a few forecast years and then steady growth. Value the steady part as a growing perpetuity at the last forecast date, then discount it together with that year's cash flow. The perpetuity needs the next year's flow, so grow the last forecast once. Working backwards one year at a time gives V<sup>L</sup> at every date, which you will need for the debt.</p>
<div class="formula"><div class="eq">TV<sub>2</sub> = FCF<sub>3</sub>/(r<sub>wacc</sub> − g) = FCF<sub>2</sub>(1 + g)/(r<sub>wacc</sub> − g)</div>
<div class="eq">V<sup>L</sup><sub>t−1</sub> = (FCF<sub>t</sub> + V<sup>L</sup><sub>t</sub>)/(1 + r<sub>wacc</sub>), starting from V<sup>L</sup><sub>2</sub> = TV<sub>2</sub></div>
<div class="where">TV<sub>2</sub> sits at date 2 and is discounted two years, never three. Growing FCF<sub>2</sub> is right only if year 2 is a normal year.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>wacc</sub> = 10%, FCF<sub>1</sub> = 20, FCF<sub>2</sub> = 30, growth of 2% from year 3.</p><p>TV<sub>2</sub> = 30 × 1.02/0.08 = 30.60/0.08 = 382.50.</p><p>V<sup>L</sup><sub>1</sub> = (30 + 382.50)/1.10 = 375.00. V<sup>L</sup><sub>0</sub> = (20 + 375.00)/1.10 = 359.09.</p></div>`,
      q: `<p>A firm keeps a constant debt ratio and its r<sub>wacc</sub> is 9%. Free cash flow is 40 in year 1 and 50 in year 2. Year 2 is a normal year. From then on free cash flow grows at 3% a year forever. What is V<sup>L</sup><sub>0</sub>?</p>`,
      options: ["801.22", "780.18", "741.57", "546.38"],
      answer: 0,
      solution: `<p>FCF<sub>3</sub> = 50 × 1.03 = 51.50. TV<sub>2</sub> = 51.50/(0.09 − 0.03) = 858.3333.</p><p>V<sup>L</sup><sub>1</sub> = (50 + 858.3333)/1.09 = 833.3333.</p><p>V<sup>L</sup><sub>0</sub> = (40 + 833.3333)/1.09 = <b>801.22</b>.</p>`,
      check: `<p>In one line instead: 40/1.09 + 50/1.09² + 858.3333/1.09² = 36.6972 + 42.0840 + 722.4420 = 801.2232. About 90% of the value is the terminal value, which is why its numerator and its timing decide the answer.</p>`,
      traps: [
        null,
        "Forgot the growth in the numerator: TV<sub>2</sub> = 50/0.06 = 833.3333, giving 36.6972 + 883.3333/1.09² = 780.18.",
        "Discounted the terminal value three years: 36.6972 + 42.0840 + 858.3333/1.09³ = 741.57.",
        "Forgot the growth entirely: TV<sub>2</sub> = 50/0.09 = 555.5556, giving 36.6972 + 605.5556/1.09² = 546.38.",
      ],
    },
    {
      id: "wacc-apv-9",
      title: "The debt adjustment between periods",
      theory: `<p>A constant debt ratio is a policy: at every date the firm sets its debt to d times its levered value at that date. V<sup>L</sup><sub>t</sub> is the value just after the year-t cash flow has been paid, so it counts only the flows still to come. When V<sup>L</sup> falls, the firm must repay debt. A firm with a finite life ends at V<sup>L</sup> = 0, so its debt runs down to zero.</p>
<div class="formula"><div class="eq">D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>  ·  ΔD<sub>t</sub> = D<sub>t</sub> − D<sub>t−1</sub> = d(V<sup>L</sup><sub>t</sub> − V<sup>L</sup><sub>t−1</sub>)</div>
<div class="where">d is D/V, not D/E. Not on the formula sheet. H2025 E4(f) asked for exactly this. It is the step almost everyone gets wrong.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>d = 0.30, r<sub>wacc</sub> = 10%, FCF<sub>1</sub> = 60, FCF<sub>2</sub> = 55. The firm closes after year 2.</p><p>V<sup>L</sup><sub>1</sub> = 55/1.10 = 50.00. V<sup>L</sup><sub>0</sub> = (60 + 50.00)/1.10 = 100.00.</p><p>D<sub>0</sub> = 0.30 × 100.00 = 30.00 and D<sub>1</sub> = 0.30 × 50.00 = 15.00, so ΔD<sub>1</sub> = −15.00: the firm repays 15.00 at the end of year 1.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.5. It exists for two years: free cash flow is 33 at the end of year 1 and 44 at the end of year 2, then nothing. r<sub>wacc</sub> = 10%. What is the debt adjustment D<sub>1</sub> − D<sub>0</sub> at the end of year 1?</p>`,
      options: ["+2.2121", "−13.1818", "0.0000", "−8.7879"],
      answer: 3,
      solution: `<p>d = D/V = 0.5/1.5 = 1/3.</p><p>V<sup>L</sup><sub>1</sub> = 44/1.10 = 40.0000 and V<sup>L</sup><sub>0</sub> = (33 + 40.0000)/1.10 = 66.3636.</p><p>D<sub>0</sub> = 66.3636/3 = 22.1212 and D<sub>1</sub> = 40.0000/3 = 13.3333.</p><p>D<sub>1</sub> − D<sub>0</sub> = 13.3333 − 22.1212 = <b>−8.7879</b>: the firm repays 8.7879 at the end of year 1.</p>`,
      check: `<p>The ratio holds at both dates: D<sub>0</sub>/E<sub>0</sub> = 22.1212/44.2424 = 0.5 and D<sub>1</sub>/E<sub>1</sub> = 13.3333/26.6667 = 0.5. Value fell, so debt fell: the sign of ΔD is always the sign of the change in V<sup>L</sup>.</p>`,
      traps: [
        "Kept the year-1 cash flow in V<sup>L</sup><sub>1</sub>: D<sub>1</sub> = (33 + 40)/3 = 24.3333, so 24.3333 − 22.1212 = +2.2121.",
        "Used D/E = 0.5 as the debt ratio: 0.5 × 40 − 0.5 × 66.3636 = 20.0000 − 33.1818 = −13.1818.",
        "Held the debt at its opening level, which abandons the target ratio: 0.0000.",
        null,
      ],
    },
    {
      id: "wacc-apv-19",
      title: "Debt capacity: how the project is funded and who gets the NPV",
      theory: `<p>A firm that keeps net debt at D/V = d must add debt when it takes a project: d times the project's levered value. That is the project's <b>debt capacity</b> (lecture 7). Kurbatov's example shows where the money goes. The capacity is filled with excess cash and new debt, since spending cash raises net debt just as borrowing does. The project is paid for and anything left over goes to the shareholders. They end with the whole NPV: equity rises by (1 − d) times the project's value, plus the payout.</p>
<div class="formula"><div class="eq">debt capacity = d × V<sup>L</sup> = cash used + new debt</div>
<div class="eq">payout = d × V<sup>L</sup> − I &nbsp;·&nbsp; ΔE + payout = (1 − d)V<sup>L</sup> + d × V<sup>L</sup> − I = NPV</div>
<div class="where">V<sup>L</sup> is the project's value at the firm's WACC, before its cost I is paid. If d × V<sup>L</sup> is below I, the shareholders fund the rest and the payout is negative. As the project winds down, its capacity falls and the firm repays debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 7</span><p>The project costs 28 and is worth 61.25, so NPV = 33.25. The firm keeps d = 0.5.</p><p>Capacity 0.5 × 61.25 = 30.625: 20 from cash and 10.625 of new debt. After paying 28, 2.625 is paid out. Equity rises by 0.5 × 61.25 = 30.625. With the 2.625 that is 33.25 = NPV.</p></div>`,
      q: `<p>A firm keeps its net debt at 40% of its value. It takes a project that costs 40 today and is worth 120 at the firm's WACC. It uses its 15 of excess cash and borrows the rest of the project's debt capacity. Whatever is left after paying for the project goes to the shareholders right away. How much is paid out?</p>`,
      options: ["23.00", "−8.00", "8.00", "33.00"],
      answer: 2,
      solution: `<p>Debt capacity = 0.40 × 120 = 48.</p><p>Using the 15 of cash raises net debt by 15, so the new debt is 48 − 15 = 33.</p><p>Cash raised: 15 + 33 = 48. After the project's 40, <b>8.00</b> is paid out.</p>`,
      check: `<p>Equity rises by (1 − 0.40) × 120 = 72. With the payout the shareholders gain 72 + 8 = 80, the NPV of 120 − 40 ✓. The lenders pay a fair price for the new debt and gain nothing, so the shareholders get it all (consistency check 3).</p>`,
      traps: [
        "Borrowed the full 48 and spent the 15 of cash as well: 48 + 15 − 40 = 23. Spending cash already counts toward net debt.",
        "Set the capacity at d × NPV = 0.40 × 80 = 32 instead of d × the project's value: 32 − 40 = −8.",
        null,
        "Reported the new debt, 48 − 15 = 33, not the cash left over once the project is paid for.",
      ],
    },
    {
      id: "wacc-apv-12",
      title: "Running the WACC method backwards: implied growth",
      theory: `<p>The exam often gives you a price and asks what the market must be assuming. Build the WACC from market values, then solve V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) for g. The cost of equity comes from the CAPM with the market risk premium E[R<sub>mkt</sub>] − r<sub>f</sub>, not the market return. The same equation solved for V<sup>L</sup> instead gives the most you can pay, the break-even price.</p>
<div class="formula"><div class="eq">g = r<sub>wacc</sub> − FCF<sub>1</sub>/V<sup>L</sup>  ·  r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">V<sup>L</sup> = E + D at market values: E is price × shares, D follows from the D/E ratio. Verify forwards: FCF<sub>1</sub>/(r<sub>wacc</sub> − g) must return V<sup>L</sup>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>100 million shares at 20.00, D/E = 0.5, β<sub>E</sub> = 1.0, r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%, r<sub>D</sub> = 4%, τ<sub>c</sub> = 25%, FCF<sub>1</sub> = 60 million.</p><p>E = 2 000, D = 1 000, V<sup>L</sup> = 3 000. r<sub>E</sub> = 0.03 + 1.0 × 0.05 = 8%.</p><p>r<sub>wacc</sub> = (2/3)(0.08) + (1/3)(0.04)(0.75) = 0.053333 + 0.010000 = 0.063333. g = 0.063333 − 60/3 000 = 0.063333 − 0.020000 = 4.3333%.</p></div>`,
      q: `<p>A firm has 400 million shares at 25.00 and keeps a debt-to-equity ratio of 0.25. Its equity beta is 0.9 and its cost of debt is 4%. The risk-free rate is 3%, the expected market return 8% and τ<sub>c</sub> = 22%. Next year's free cash flow is 450 million, growing at a constant rate forever. What growth rate does the market value imply? Use four decimals.</p>`,
      options: ["3.0240%", "2.9189%", "2.1240%", "5.1840%"],
      answer: 0,
      solution: `<p>E = 400 × 25.00 = 10 000, D = 0.25 × 10 000 = 2 500 and V<sup>L</sup> = 12 500, so E/V = 0.80 and D/V = 0.20.</p><p>r<sub>E</sub> = 0.03 + 0.9 × (0.08 − 0.03) = 0.0750.</p><p>r<sub>wacc</sub> = 0.80 × 0.0750 + 0.20 × 0.04 × 0.78 = 0.060000 + 0.006240 = 0.066240.</p><p>g = 0.066240 − 450/12 500 = 0.066240 − 0.036000 = 0.030240 = <b>3.0240%</b>.</p>`,
      check: `<p>Forwards: 450/(0.066240 − 0.030240) = 450/0.036000 = 12 500, the market value. Watch the other classic slip, reading D/E = 0.25 as D/V = 0.25: it changes both the weights and V and lands at 3.0300%, close enough to pass for rounding. Convert the ratio before you start.</p>`,
      traps: [
        null,
        "Read 450 as this year's flow and grew it once: 12 500 = 450(1 + g)/(0.066240 − g), so 378 = 12 950g and g = 2.9189%.",
        "Divided by the equity instead of the firm value: 0.066240 − 450/10 000 = 2.1240%.",
        "Used the market return as the premium: r<sub>E</sub> = 0.03 + 0.9 × 0.08 = 0.1020, so r<sub>wacc</sub> = 0.087840 and g = 5.1840%.",
      ],
    },
    {
      id: "wacc-apv-13",
      title: "Exam level: a twin firm, then WACC and APV on a perpetuity",
      theory: `<p>H2024 E5 has this shape: a comparable firm gives you r<sub>U</sub>, you relever to the target's own leverage, value by WACC and then value again by APV with the debt from the WACC answer. Unlever with the value-weighted betas and price the asset beta with the CAPM. Relever with MM Proposition II, which needs D/E. Only β<sub>U</sub> and r<sub>U</sub> cross from one firm to the other, never the weights.</p>
<div class="formula"><div class="eq">β<sub>U</sub> = (E/V) β<sub>E</sub> + (D/V) β<sub>D</sub>  ·  r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">All three are on the formula sheet. The course weights β<sub>U</sub> without taxes. Risk-free debt has β<sub>D</sub> = 0.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Comparable: D/E = 0.25, β<sub>E</sub> = 1.25, risk-free debt. r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%. Target: D/V = 0.40, r<sub>D</sub> = 4.5%, τ<sub>c</sub> = 22%, FCF of 25 a year forever.</p><p>β<sub>U</sub> = 0.80 × 1.25 = 1.00, so r<sub>U</sub> = 0.03 + 1.00 × 0.05 = 8%. D/E = 0.40/0.60 = 0.666667, so r<sub>E</sub> = 0.08 + 0.666667 × 0.035 = 0.103333.</p><p>r<sub>wacc</sub> = 0.60 × 0.103333 + 0.40 × 0.045 × 0.78 = 0.062000 + 0.014040 = 0.076040, so V<sup>L</sup> = 25/0.07604 = 328.7743.</p><p>D = 0.40 × 328.7743 = 131.5097, TS = 0.22 × 0.045 × 131.5097 = 1.301946 and PV(TS) = 1.301946/0.08 = 16.2743. V<sup>U</sup> = 25/0.08 = 312.5000. Then 312.5000 + 16.2743 = 328.7743.</p></div>`,
      q: `<p>You value a private firm that will keep D/V = 0.40 and borrow at r<sub>D</sub> = 5%. Its free cash flow is 20 a year forever, starting next year. A listed comparable with the same business risk has an equity beta of 1.4, risk-free debt and a debt-to-equity ratio of 1/3. r<sub>f</sub> = 4%, the expected market return is 10% and τ<sub>c</sub> = 22%. Using the debt implied by the WACC value, what is PV(TS) in the APV valuation? Use four decimals.</p>`,
      options: ["17.8499", "9.4803", "8.6650", "8.0671"],
      answer: 2,
      solution: `<p>Comparable: D/E = 1/3 gives E/V = 0.75 and D/V = 0.25. β<sub>U</sub> = 0.75 × 1.4 + 0.25 × 0 = 1.05, so r<sub>U</sub> = 0.04 + 1.05 × 0.06 = 0.1030.</p><p>Target: D/E = 0.40/0.60 = 0.666667. r<sub>E</sub> = 0.1030 + 0.666667 × (0.1030 − 0.05) = 0.103000 + 0.035333 = 0.138333.</p><p>r<sub>wacc</sub> = 0.60 × 0.138333 + 0.40 × 0.05 × 0.78 = 0.083000 + 0.015600 = 0.098600, so V<sup>L</sup> = 20/0.0986 = 202.8398.</p><p>D = 0.40 × 202.8398 = 81.1359 and TS = 0.22 × 0.05 × 81.1359 = 0.892495 a year. The firm keeps a constant D/V, so the shield is discounted at r<sub>U</sub>: PV(TS) = 0.892495/0.1030 = <b>8.6650</b>.</p>`,
      check: `<p>Consistency check 1: V<sup>U</sup> = 20/0.1030 = 194.1748. Then 194.1748 + 8.6650 = 202.8398, the WACC value. Consistency check 2: β<sub>E</sub> = (0.138333 − 0.04)/0.06 = 1.638889 and β<sub>D</sub> = (0.05 − 0.04)/0.06 = 0.166667, so 0.60 × 1.638889 + 0.40 × 0.166667 = 0.983333 + 0.066667 = 1.050000 = β<sub>U</sub>. The first is a fixed point that catches a wrong rate on the shield. The second is an identity here and catches only arithmetic.</p>`,
      traps: [
        "Discounted the shield at r<sub>D</sub>: 0.892495/0.05 = 17.8499, which is τ<sub>c</sub> × D. That rate belongs to fixed debt.",
        "Put D/V = 0.40 into MM II as if it were D/E: r<sub>E</sub> = 0.1242, r<sub>wacc</sub> = 0.090120, D = 88.7705 and PV(TS) = 9.4803.",
        null,
        "Unlevered with the tax-adjusted formula β<sub>U</sub> = β<sub>E</sub>/[1 + (1 − τ<sub>c</sub>)D/E] = 1.4/1.26 = 1.1111 instead of the value weights: r<sub>U</sub> = 0.106667, r<sub>wacc</sub> = 0.102267, D = 78.2269 and PV(TS) = 8.0671.",
      ],
    },
    {
      id: "wacc-apv-14",
      title: "Exam level: WACC and APV over two periods, step by step",
      theory: `<p>H2025 E4 chains nine questions on one firm with a finite life: debt beta, r<sub>E</sub>, r<sub>U</sub>, r<sub>wacc</sub>, V<sup>L</sup> by WACC, the debt adjustment, V<sup>U</sup>, the shields and V<sup>L</sup> by APV. Two tools are new. Debt with r<sub>D</sub> above r<sub>f</sub> has a beta, read off the CAPM backwards. Over several periods APV is two discounted sums at r<sub>U</sub>, where the shield in year t comes from the debt carried into that year, D<sub>t−1</sub>. Lay out one table with a column per date, carry full precision and round only when you write.</p>
<div class="formula"><div class="eq">β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>)  ·  r<sub>U</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub></div>
<div class="eq">V<sup>U</sup> = Σ FCF<sub>t</sub>/(1 + r<sub>U</sub>)<sup>t</sup>  ·  PV(TS) = Σ τ<sub>c</sub> r<sub>D</sub> D<sub>t−1</sub>/(1 + r<sub>U</sub>)<sup>t</sup></div>
<div class="where">r<sub>U</sub> has no tax term. The order is fixed: the value path first, then the debt path, then the shields. Under a constant debt ratio every shield is discounted at r<sub>U</sub>. V<sup>U</sup> + PV(TS) must equal the WACC value (consistency check 1). The debt came from the WACC answer, so the check is a fixed point, but it still catches a wrong rate on the shield and slips in the debt path.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/E = 0.25, β<sub>E</sub> = 1.5, r<sub>D</sub> = 7%, r<sub>f</sub> = 4%, E[R<sub>mkt</sub>] = 10%, τ<sub>c</sub> = 25%, FCF of 30 and 40 over two years.</p><p>β<sub>D</sub> = 0.03/0.06 = 0.50. r<sub>E</sub> = 0.04 + 1.5 × 0.06 = 13%. D/V = 0.20, so r<sub>U</sub> = 0.80 × 0.13 + 0.20 × 0.07 = 0.104 + 0.014 = 11.80% and r<sub>wacc</sub> = 0.104 + 0.20 × 0.07 × 0.75 = 11.45%.</p><p>V<sup>L</sup><sub>1</sub> = 40/1.1145 = 35.8905 and V<sup>L</sup><sub>0</sub> = (30 + 35.8905)/1.1145 = 59.1212, so D<sub>0</sub> = 11.8242 and D<sub>1</sub> = 7.1781.</p><p>TS<sub>1</sub> = 0.25 × 0.07 × 11.8242 = 0.206924 and TS<sub>2</sub> = 0.25 × 0.07 × 7.1781 = 0.125617. PV(TS) = 0.206924/1.118 + 0.125617/1.118² = 0.185084 + 0.100500 = 0.285584.</p><p>V<sup>U</sup> = 30/1.118 + 40/1.118² = 26.833631 + 32.001946 = 58.835577. Then 58.835577 + 0.285584 = 59.121161.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.5 and exists for two years, with free cash flow of 60 at the end of year 1 and 80 at the end of year 2. Its equity beta is 1.6 and its cost of debt is 6%. The risk-free rate is 4%, the expected market return 9% and τ<sub>c</sub> = 30%. What is PV(TS) in the APV valuation? Use four decimals.</p>`,
      options: ["0.3989", "1.5395", "1.0264", "1.0793"],
      answer: 2,
      solution: `<p>Rates. Premium = 0.09 − 0.04 = 0.05. β<sub>D</sub> = (0.06 − 0.04)/0.05 = 0.4000. r<sub>E</sub> = 0.04 + 1.6 × 0.05 = 0.1200. D/V = 0.5/1.5 = 1/3, so r<sub>U</sub> = (2/3)(0.12) + (1/3)(0.06) = 0.0800 + 0.0200 = 0.1000 and r<sub>wacc</sub> = 0.0800 + (1/3)(0.06)(0.70) = 0.0800 + 0.0140 = 0.0940.</p><p>Value path. V<sup>L</sup><sub>1</sub> = 80/1.094 = 73.1261 and V<sup>L</sup><sub>0</sub> = (60 + 73.1261)/1.094 = 121.6875.</p><p>Debt path. D<sub>0</sub> = 121.6875/3 = 40.5625 and D<sub>1</sub> = 73.1261/3 = 24.3754, so the firm repays 16.1871 at the end of year 1.</p><p>Shields. TS<sub>1</sub> = 0.30 × 0.06 × 40.5625 = 0.730125 and TS<sub>2</sub> = 0.30 × 0.06 × 24.3754 = 0.438757. The firm keeps a constant D/E, so discount at r<sub>U</sub>: PV(TS) = 0.730125/1.10 + 0.438757/1.21 = 0.663750 + 0.362609 = <b>1.0264</b>.</p>`,
      check: `<p>V<sup>U</sup> = 60/1.10 + 80/1.21 = 54.545455 + 66.115702 = 120.661157. Then 120.661157 + 1.026359 = 121.687516, the WACC value of 121.6875 (consistency check 1). The weighted betas give β<sub>U</sub> = (2/3)(1.6) + (1/3)(0.4) = 1.2000. Priced with the CAPM, 0.04 + 1.2 × 0.05 = 0.1000, the same r<sub>U</sub> as from the returns.</p>`,
      traps: [
        "Took each shield from the debt at the end of its year, D<sub>1</sub> and then D<sub>2</sub> = 0: TS<sub>1</sub> = 0.30 × 0.06 × 24.3754 = 0.438757 and TS<sub>2</sub> = 0, so 0.438757/1.10 = 0.3989.",
        "Used D/E = 0.5 as the debt ratio: D<sub>0</sub> = 60.8438 and D<sub>1</sub> = 36.5631, giving 1.5395.",
        null,
        "Discounted the shields at r<sub>D</sub> = 6%: 0.688797 + 0.390492 = 1.0793.",
      ],
    },
  ],
});

/* sjanger 4 · realopsjon · Real options */
window.EDU_DATA.sjangre.push({
  id: "realopsjon",
  num: 4,
  title: "Real options",
  summary: "From the NPV of a perpetuity to the option to wait, the value of information, exit options and risk-neutral valuation",
  chapters: [25, 1, 22],
  exam: "8 of 11 papers · H2024 E6, H2025 E5",
  intro: `<p>Real options have been a fixed exercise since 2017, worth 20 points in both of Kurbatov's papers. H2024 Exercise 6 valued the option to wait with risk-neutral probabilities. H2025 Exercise 5 asked for the value of information, an exit option and an indifference point. Almost every number in the genre is the gap between two ways of deciding: state by state, E[max(0, NPV<sub>i</sub>)], or once on the average, max(0, E[NPV]). The ladder starts from the NPV of a perpetuity and ends with both of Kurbatov's exercises in new numbers.</p>`,
  steps: [
    {
      id: "realopsjon-1",
      title: "Static NPV of a perpetuity",
      theory: `<p>Every real-option problem starts from the plain NPV of committing today. Net the operating cost off the revenue first, state by state. If you invest before you know the state, you are stuck with whatever comes, so you value the expected net cash flow. A level cash flow C every year forever, first payment in one year, is worth C/r today.</p>
<div class="formula"><div class="eq">NPV = E[C]/r − I</div>
<div class="where">E[C] is the expected net cash flow per year (revenue minus operating cost), r the discount rate and I the investment paid today.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A kiosk costs 150. Revenue is 50 or 70 a year forever, with equal probability. Operating costs are 40 a year and r = 10%.</p><p>Net cash flow: 50 − 40 = 10 or 70 − 40 = 30. Expected: 0.5(10) + 0.5(30) = 20.</p><p>NPV = 20/0.10 − 150 = 200 − 150 = 50.</p></div>`,
      q: `<p>A café costs 400 (NOK thousand) to open today. Operating costs are 150 a year. Revenue is either 140 a year forever or 200 a year forever, with equal probability, first payment in one year. You must open before you know which. Once open, the café runs forever. The discount rate is 8%. What is the NPV of opening the café today?</p>`,
      options: ["250.00", "1 725.00", "−87.50", "−150.00"],
      answer: 3,
      solution: `<p>Net cash flow: 140 − 150 = −10 or 200 − 150 = 50. Expected: 0.5(−10) + 0.5(50) = 20 a year.</p><p>PV = 20/0.08 = 250. NPV = 250 − 400 = <b>−150.00</b>. Do not open on these terms.</p>`,
      check: `<p>Value each state and average: good 50/0.08 − 400 = 225, bad −10/0.08 − 400 = −525. 0.5(225) + 0.5(−525) = −150 ✓ Committing today means taking both states, so the two routes must agree.</p>`,
      traps: [
        "Reported the PV and forgot to subtract the investment: 20/0.08 = 250.",
        "Forgot the operating cost: 0.5(140 + 200)/0.08 − 400 = 2 125 − 400 = 1 725.",
        "Set the loss-making state to zero, as if the café could close for free once revenue turned out low: 0.5(0) + 0.5(50) = 25 a year, so 25/0.08 − 400 = −87.50.",
        null,
      ],
    },
    {
      id: "realopsjon-2",
      title: "Annuity NPV and a now-or-never right",
      theory: `<p>When the cash flow stops after T years, use the annuity factor instead of 1/r. A right you can use only today or never is worth max(0, NPV): you are never forced to invest, so a negative NPV makes the right worth zero, not a negative number.</p>
<div class="formula"><div class="eq">A(T, r) = [1 − (1 + r)<sup>−T</sup>]/r</div>
<div class="eq">value of a now-or-never right = max(0, C × A(T, r) − I)</div>
<div class="where">C is paid every year for T years, first payment in one year. A(T, r) is always below the perpetuity factor 1/r.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A plant costs 9 and pays 1.5 a year for 8 years. r = 6%.</p><p>1.06<sup>−8</sup> = 0.627412, so A(8, 6%) = 0.372588/0.06 = 6.2098. PV = 1.5 × 6.2098 = 9.3147.</p><p>NPV = 9.3147 − 9 = 0.3147. Positive, so the right is worth 0.3147.</p></div>`,
      q: `<p>A licence lets you build a plant today or never. The plant costs 20 (NOK million) today and pays 2.2 a year for 12 years, first payment in one year. The discount rate is 5%. What is the licence worth today?</p>`,
      options: ["−0.5008", "24.0000", "0.4741", "0.0000"],
      answer: 3,
      solution: `<p>1.05<sup>−12</sup> = 0.556837, so A(12, 5%) = 0.443163/0.05 = 8.8633.</p><p>PV = 2.2 × 8.8633 = 19.4992. NPV = 19.4992 − 20 = −0.5008.</p><p>Negative, so you do not build. The licence is worth max(0, −0.5008) = <b>0.0000</b>.</p>`,
      check: `<p>Backwards: the payment that breaks even is 20/8.8633 = 2.2565 a year, above the 2.2 on offer, so the NPV must be negative ✓ The annuity is also worth less than the perpetuity 2.2/0.05 = 44, as it must be.</p>`,
      traps: [
        "Reported the negative NPV as the licence's value. You are never forced to build: max(0, −0.5008) = 0.",
        "Used a perpetuity instead of a 12-year annuity: 2.2/0.05 − 20 = 44 − 20 = 24.",
        "Treated the first payment as arriving today, an annuity due: 19.4992 × 1.05 − 20 = 0.4741.",
        null,
      ],
    },
    {
      id: "realopsjon-15",
      title: "A monthly rate from an annual one",
      theory: `<p>Real-option cash flows often come by the month: rent, wages, a store's takings. Then the discount rate must be monthly too. An annual rate r converts to the monthly rate that compounds back to r over twelve months, not to r/12. Kurbatov said in the wrap-up that converting a rate from monthly to yearly or the other way could well be on the exam; the same idea gives (1 + r)<sup>1.5</sup> for a year and a half. With r<sub>m</sub> in hand, the perpetuity and annuity formulas work exactly as before, counted in months.</p>
<div class="formula"><div class="eq">r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1 &nbsp;&nbsp; r = (1 + r<sub>m</sub>)<sup>12</sup> − 1</div>
<div class="eq">monthly perpetuity = C/r<sub>m</sub> &nbsp;&nbsp; n-month annuity = C × A(n, r<sub>m</sub>), A(n, r<sub>m</sub>) = [1 − (1 + r<sub>m</sub>)<sup>−n</sup>]/r<sub>m</sub></div>
<div class="where">C is paid every month, first payment in one month. r is the effective annual rate.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kurbatov's store in lecture 11 discounts at 7% a year: r<sub>m</sub> = 1.07<sup>1/12</sup> − 1 = 0.5654% a month.</p><p>2 000 a month forever: 2 000/0.005654 = 353 723. For 24 months only: A(24, 0.5654%) = 22.3838, so 2 000 × 22.3838 = 44 768.</p></div>`,
      q: `<p>A lease pays you a net 3 000 NOK a month for 36 months, first payment in one month. The effective annual discount rate is 9%. What is the lease worth today?</p>`,
      options: ["94 827.10", "91 126.61", "416 243.29", "94 340.42"],
      answer: 0,
      solution: `<p>r<sub>m</sub> = 1.09<sup>1/12</sup> − 1 = 0.720732% a month.</p><p>1.00720732<sup>−36</sup> = 0.772183, so A(36, r<sub>m</sub>) = 0.227817/0.00720732 = 31.609033.</p><p>PV = 3 000 × 31.609033 = <b>94 827.10</b>.</p>`,
      check: `<p>Compound back: 1.00720732<sup>12</sup> = 1.0900 ✓ The answer must also lie between two bounds: below the undiscounted 36 × 3 000 = 108 000 and above 91 126.61, the value if the same 36 000 a year arrived only at each year end, which is later than monthly ✓</p>`,
      traps: [
        null,
        "Lumped the payments into 36 000 at each year end: 36 000 × A(3, 9%) = 91 126.61. The money arrives every month, earlier than that.",
        "Valued the payments forever: 3 000/0.00720732 = 416 243.29. The lease runs 36 months.",
        "Divided the annual rate by 12: 0.75% a month compounds to 9.38% a year, too high, so 3 000 × A(36, 0.75%) = 94 340.42 is too low.",
      ],
    },
    {
      id: "realopsjon-4",
      title: "The value of perfect information",
      theory: `<p>Draw the decision as a tree: a square for a choice you make, a circle for a state the world picks. If the circle comes first, you see the state and then choose, so a branch with negative NPV becomes 0: the max goes inside the expectation. If the square comes first, you make one decision on the average: invest if E[NPV] &gt; 0, otherwise do nothing and get 0. Information is worth the difference, the most you should pay for a study that reveals the state today.</p>
<div class="formula"><div class="eq">value of perfect information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV])</div>
<div class="where">E[max(0, NPV<sub>i</sub>)] = Σ p<sub>i</sub>·max(0, NPV<sub>i</sub>), with p<sub>i</sub> the probability of state i. The second term is the best uninformed choice. If E[NPV] is negative it is 0, not E[NPV]. No discounting: the answer arrives now and you act now.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>p = 0.5, NPV<sub>good</sub> = +150, NPV<sub>bad</sub> = −250.</p><p>E[NPV] = 0.5(150) + 0.5(−250) = −50, so uninformed you do nothing: 0. Informed: 0.5(150) + 0.5(0) = 75.</p><p>Value of the information = 75 − 0 = 75, not 75 + 50 = 125.</p></div>`,
      q: `<p>A mining company can expand a mine for 500 today. The PV of the extra cash flows is 800 with probability 0.6 or 350 with probability 0.4. A geological survey, delivered immediately, would tell the company which. What is the most the company should pay for the survey?</p>`,
      options: ["180.00", "60.00", "0.00", "150.00"],
      answer: 1,
      solution: `<p>NPV<sub>good</sub> = 800 − 500 = +300. NPV<sub>bad</sub> = 350 − 500 = −150.</p><p>Informed: 0.6(300) + 0.4(0) = 180. Uninformed: E[NPV] = 0.6(300) + 0.4(−150) = 180 − 60 = 120 &gt; 0, so the company expands anyway, worth 120.</p><p>Value of the survey = 180 − 120 = <b>60.00</b>.</p>`,
      check: `<p>The survey changes one decision only: in the bad state it stops a loss of 150, which happens with probability 0.4. 0.4 × 150 = 60 ✓ This route is independent of the first and catches a missing max(0, ·).</p>`,
      traps: [
        "Forgot to subtract the uninformed value. Without the survey the company still expands and earns 120, so 180 is the informed value, not the gain from the information.",
        null,
        "Dropped the max(0, ·) in the informed term, so both terms are E[NPV]: 120 − 120 = 0.",
        "Took the loss avoided in the bad state without its probability: 150.",
      ],
    },
    {
      id: "realopsjon-5",
      title: "Information that arrives in one year",
      theory: `<p>If the study takes a year, you invest a year later, so the informed strategy is discounted once. NPV<sub>i</sub> is measured at the date you invest (the whole project shifts a year), so it needs exactly one factor of (1 + r). The uninformed alternative is still decided today. The delay costs a year of cash flow in the states where you invest, partly offset by paying the investment a year later.</p>
<div class="formula"><div class="eq">value of information delayed one year = E[max(0, NPV<sub>i</sub>)]/(1 + r) − max(0, E[NPV])</div>
<div class="where">The same as the immediate value except for the discount factor on the informed term. If E[NPV] &lt; 0 the second term is 0.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The same tree as before: p = 0.5, NPV<sub>good</sub> = +150, NPV<sub>bad</sub> = −250, so E[NPV] = −50. Now r = 10% and the answer takes a year.</p><p>Delayed value = 75/1.10 − 0 = 68.18, against 75 if the answer came today.</p></div>`,
      q: `<p>A bakery costs 200 (NOK thousand) to open. Operating costs are 100 a year. Revenue is 130 a year forever or 90 a year forever, with equal probability. The discount rate is 8%. A market study reveals the state, but it takes a year: you pay for it today, learn the state in one year and then decide whether to open, on the same terms one year later. What is the most you should pay for the study today?</p>`,
      options: ["87.50", "156.02", "81.02", "75.02"],
      answer: 2,
      solution: `<p>Net cash flow: 30 or −10. NPV<sub>good</sub> = 30/0.08 − 200 = 375 − 200 = 175. NPV<sub>bad</sub> = −10/0.08 − 200 = −325.</p><p>E[NPV] = 0.5(175) + 0.5(−325) = −75, so without the study you do not open: max(0, −75) = 0.</p><p>Informed, at date 1: 0.5(175) + 0.5(0) = 87.50. Today: 87.50/1.08 = 81.0185. Value of the study = 81.0185 − 0 = <b>81.02</b>.</p>`,
      check: `<p>Rebuild the cost of the delay in the good state. You lose a year of cash flow, 30/1.08 = 27.7778, but pay the 200 a year later, which saves 200 − 200/1.08 = 14.8148. Net −12.9630, times 0.5 = −6.4815. Immediate value 87.50 − 6.4815 = 81.0185 ✓ The delayed study is worth less because you lose the first year's cash flow.</p>`,
      traps: [
        "Forgot to discount the informed value for the year you wait: 87.50 is the value of a study delivered today.",
        "Subtracted the negative E[NPV]: 81.02 + 75 = 156.02. Uninformed you do nothing, worth 0, not −75.",
        null,
        "Discounted twice, as if NPV<sub>good</sub> were not already a date-1 figure: 87.50/1.08<sup>2</sup> = 75.02.",
      ],
    },
    {
      id: "realopsjon-6",
      title: "The option to wait: why a positive NPV can mean wait",
      theory: `<p>Investing today buys the average outcome. Waiting a year buys the right to invest only in the good state, at the price of a year's delay. The value of waiting is the discounted informed value. The option to wait is what waiting adds over the best you can do today: if it is positive, wait, even when NPV<sub>now</sub> is positive.</p>
<div class="formula"><div class="eq">option to wait = Σ p<sub>i</sub>·max(0, NPV<sub>i</sub>)/(1 + r) − max(0, NPV<sub>now</sub>)</div>
<div class="where">p<sub>i</sub> are the real probabilities and r the project's cost of capital. Report the option as this difference, then write "wait" or "invest now" in words.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>I = 100, cash flow 16 or 6 a year forever (p = 0.5 each), r = 10%.</p><p>NPV<sub>now</sub> = 0.5(16 + 6)/0.10 − 100 = 110 − 100 = 10. NPV<sub>good</sub> = 160 − 100 = 60, NPV<sub>bad</sub> = 60 − 100 = −40.</p><p>Waiting: 0.5(60)/1.10 = 27.27. Option = 27.27 − 10 = 17.27 &gt; 0, so wait.</p></div>`,
      q: `<p>A firm can build a terminal for 500 today. It then pays 80 a year forever with probability 0.5 or 30 a year forever with probability 0.5; the state is revealed in one year. The cost of capital is 10%. Instead, the firm can wait a year, see the state and build then for the same 500, with the cash flows starting a year later. What is the value of the option to wait, that is, what waiting adds over building today?</p>`,
      options: ["73.97", "136.36", "86.36", "−4.55"],
      answer: 2,
      solution: `<p>NPV<sub>now</sub> = 0.5(80 + 30)/0.10 − 500 = 550 − 500 = 50.</p><p>NPV<sub>good</sub> = 800 − 500 = 300. NPV<sub>bad</sub> = 300 − 500 = −200, declined.</p><p>Waiting: 0.5(300)/1.10 = 136.3636. Option = 136.3636 − 50 = <b>86.36</b>. Positive, so wait, although NPV<sub>now</sub> = 50 is positive.</p>`,
      check: `<p>Split the 86.36 into its two forces. Waiting avoids the bad branch: 0.5 × 200 = 100.00. It delays the good branch: 0.5 × 300 × (1 − 1/1.10) = 150 × 0.090909 = 13.64. Net 100.00 − 13.64 = 86.36 ✓</p>`,
      traps: [
        "Discounted NPV<sub>good</sub> twice, though it is already a date-1 value: 0.5(300)/1.10<sup>2</sup> − 50 = 123.97 − 50 = 73.97.",
        "Reported the value of waiting instead of the option. 136.36 is the whole value with the option; the option is what it adds over the 50 you get today.",
        null,
        "Took the max after averaging: max(0, 50)/1.10 − 50 = −4.55, which makes waiting look worthless.",
      ],
    },
    {
      id: "realopsjon-16",
      title: "The probability that makes you indifferent between waiting and investing",
      theory: `<p>Waiting pays off through the bad news you can still avoid. If that news comes only with some probability p, the option to wait is worth more the larger p is. Investing today does not depend on p when the expected cash flow does not. So there is one p at which the two strategies are worth the same. Write the value of waiting as a function of p, set it equal to NPV<sub>now</sub> and solve. Above that p, wait; below it, invest now.</p>
<div class="formula"><div class="eq">NPV<sub>now</sub> = E[C]/r − I &nbsp;&nbsp; value of waiting(p) = Σ p<sub>i</sub>(p)·max(0, NPV<sub>i</sub>)/(1 + r)</div>
<div class="eq">indifference: value of waiting(p*) = NPV<sub>now</sub></div>
<div class="where">NPV<sub>i</sub> is measured at date 1, when you invest after seeing the state. At p*, the investment saved in the bad branch exactly pays for the year of delay.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (Problem Set 3, Exercise 9)</span><p>I = 250, r = 10%. With probability p a lawsuit comes: half succeed (cash flow 0 forever), half are dismissed (100 forever). With no lawsuit the cash flow is 50 forever. E[C] = 50 for every p, so NPV<sub>now</sub> = 50/0.10 − 250 = 250.</p><p>Waiting: [(p/2)(1 000 − 250) + (1 − p)(500 − 250)]/1.10 = 250, so 375p + 250 − 250p = 275 and p* = 25/125 = 0.20. At p = 0.1 waiting is worth 238.64 (invest now); at p = 0.3 it is worth 261.36 (wait).</p></div>`,
      q: `<p>A firm can build a plant for 400 today; cash flows start one year after it builds. This year a regulator may rule on the industry, with probability p. A ruling is favourable with probability 0.25 (cash flow 440 a year forever) and a ban with probability 0.75 (0 forever). With no ruling, the cash flow is 110 a year forever. Discount everything at 5%. If the firm waits a year, it sees what happened and decides then, with cash flows from year 2. For what p is the firm indifferent between building today and waiting?</p>`,
      options: ["0.6150", "0.3000", "0.0000", "0.2250"],
      answer: 1,
      solution: `<p><b>Building today.</b> E[C] = p × 0.25 × 440 + (1 − p) × 110 = 110 for every p, so NPV<sub>now</sub> = 110/0.05 − 400 = 2 200 − 400 = 1 800.</p><p><b>Waiting.</b> At date 1: favourable 440/0.05 − 400 = 8 400; ban: do not build, 0; no ruling 1 800. Value = [0.25p × 8 400 + (1 − p) × 1 800]/1.05 = (1 800 + 300p)/1.05.</p><p><b>Indifference.</b> (1 800 + 300p)/1.05 = 1 800 gives 300p = 90, so p* = <b>0.3000</b>. Wait if p &gt; 0.30, build now if p &lt; 0.30.</p>`,
      check: `<p>Try both sides: p = 0.40 gives 1 920/1.05 = 1 828.57 &gt; 1 800 (wait) and p = 0.20 gives 1 860/1.05 = 1 771.43 &lt; 1 800 (build) ✓ The economics at date 1: waiting saves the 400 in the ban branch, worth 0.30 × 0.75 × 400 = 90. It costs a year on the NPV, 0.05 × 1 800 = 90 ✓</p>`,
      traps: [
        "Discounted the waiting strategy twice, though the date-1 NPVs need one factor: (1 800 + 300p)/1.05<sup>2</sup> = 1 800 gives p = 0.6150.",
        null,
        "Forgot to discount the waiting strategy: 1 800 + 300p = 1 800 gives p = 0, as if waiting cost nothing.",
        "Counted the saved investment in every ruling, as if the favourable one were a ban too: 400p = 90 gives p = 0.2250. Only 0.75 of the rulings save the 400.",
      ],
    },
    {
      id: "realopsjon-8",
      title: "The exit option: a perpetuity cut to an annuity",
      theory: `<p>An exit option is the mirror image of waiting: you commit first, then may quit once you know the state. In the bad state the perpetuity of losses is replaced by an annuity that stops at the exit date, plus any salvage value S. The good state is unchanged, since you never quit a positive perpetuity. The option is worth only the negative tail it cuts off.</p>
<div class="formula"><div class="eq">NPV<sub>bad</sub> with exit after n years = −I + C<sub>bad</sub> × A(n, r) + S/(1 + r)<sup>n</sup></div>
<div class="eq">value of the exit option = max(0, E[NPV with exit]) − max(0, E[NPV without exit])</div>
<div class="where">A(n, r) is the n-year annuity factor. With S = 0 the exit cuts off p<sub>bad</sub> × (|C<sub>bad</sub>|/r)/(1 + r)<sup>n</sup> of expected losses: the PV of the losses after the exit date. That is the option's value only if you would invest without it. If the NPV without exit is negative, the alternative is not to invest, worth 0. Then you compare with 0.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>I = 120, net cash flow +15 or −5 a year forever (p = 0.5), r = 10%, exit allowed after 1 year.</p><p>Without exit: 0.5(15 − 5)/0.10 − 120 = 50 − 120 = −70.</p><p>With exit: good 150 − 120 = 30, bad −120 − 5/1.10 = −124.55. E[NPV] = 15.00 − 62.27 = −47.27. The exit cuts off losses worth 0.5 × (5/0.10)/1.10 = 22.73 = −47.27 − (−70) ✓ But the NPV stays negative, so you do not invest either way and the option is worth max(0, −47.27) − max(0, −70) = 0.</p></div>`,
      q: `<p>A gym costs 200 (NOK thousand) to open today. Its net cash flow is +50 a year forever or −20 a year forever, with equal probability. You learn which during year 1, after opening. The discount rate is 10%. A new rule lets you close after year 2 and walk away with nothing, so in the bad state you bear only two years of losses. What is the NPV of opening the gym today?</p>`,
      options: ["32.64", "40.91", "150.00", "50.00"],
      answer: 0,
      solution: `<p>Good state, never close: 50/0.10 − 200 = 500 − 200 = 300.</p><p>Bad state, close after year 2: A(2, 10%) = 1/1.10 + 1/1.10<sup>2</sup> = 0.909091 + 0.826446 = 1.735537, so NPV<sub>bad</sub> = −200 − 20 × 1.735537 = −200 − 34.7107 = −234.7107.</p><p>E[NPV] = 0.5(300) + 0.5(−234.7107) = 150 − 117.3554 = <b>32.64</b>. Positive: open the gym.</p>`,
      check: `<p>Without the rule: 0.5(50 − 20)/0.10 − 200 = 150 − 200 = −50. The rule removes a perpetuity of −20 starting in year 3, worth (20/0.10)/1.10<sup>2</sup> = 165.29 today, in a state with probability 0.5: 0.5 × 165.29 = 82.64. Then −50 + 82.64 = 32.64 ✓ The rule flips the decision. What it is worth to you is 32.64 − 0 = 32.64, not 82.64: without it you would not open.</p>`,
      traps: [
        null,
        "Counted one year of losses instead of two before closing: 0.5(300) + 0.5(−200 − 20/1.10) = 150 − 109.09 = 40.91.",
        "Declined the bad state as if you learned it before opening: 0.5(300) + 0.5(0) = 150. You open first, so you pay 200 in both states.",
        "Treated the exit as immediate and dropped the two years of losses: 0.5(300) + 0.5(−200) = 50.",
      ],
    },
    {
      id: "realopsjon-9",
      title: "Abandonment for a salvage value: rolling back the tree",
      theory: `<p>At a decision node, take the best of every action on the menu: invest, sell the assets for a salvage value S or do nothing. Then roll the tree back from the right: max at each square, probability-weighted average at each circle, one discount factor per year between dates. A perpetuity that starts at date 2 is worth C/r at date 1. A cost paid today is not discounted.</p>
<div class="formula"><div class="eq">value at date 1 in state i = max(NPV<sub>i</sub>, S, 0)</div>
<div class="eq">NPV today = −cost today + Σ p<sub>i</sub>·max(NPV<sub>i</sub>, S, 0)/(1 + r)</div>
<div class="where">NPV<sub>i</sub> is measured at date 1, net of any investment paid at date 1. The value of the salvage option is the NPV with it minus the NPV without it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A pilot costs 50 today. With p = 0.5 it succeeds: a plant costing 400 at date 1 pays 60 a year from date 2, worth 600 − 400 = +200 at date 1. If it fails, the plant pays 30 a year: 300 − 400 = −100. Selling the prototype gives 80. r = 10%.</p><p>Date 1: max(200, 80, 0) = 200 and max(−100, 80, 0) = 80.</p><p>NPV = −50 + 0.5(200 + 80)/1.10 = −50 + 127.27 = 77.27.</p></div>`,
      q: `<p>A firm can run a one-year pilot for 200 today. With probability 0.4 the pilot succeeds: a plant costing 2 000 at date 1 would then pay 260 a year forever from date 2. With probability 0.6 it fails: the same plant would pay 150 a year forever from date 2. At date 1 the firm chooses one of three actions: build the plant, sell the prototype for 250 or do nothing. The discount rate is 10%. What is the NPV today of running the pilot and then acting optimally?</p>`,
      options: ["18.18", "68.60", "154.55", "−254.55"],
      answer: 2,
      solution: `<p>Success at date 1: 260/0.10 − 2 000 = 2 600 − 2 000 = 600; max(600, 250, 0) = 600: build.</p><p>Failure at date 1: 150/0.10 − 2 000 = 1 500 − 2 000 = −500; max(−500, 250, 0) = 250: sell the prototype.</p><p>Expected at date 1: 0.4(600) + 0.6(250) = 240 + 150 = 390. NPV = −200 + 390/1.10 = −200 + 354.5455 = <b>154.55</b>. Run the pilot.</p>`,
      check: `<p>Price the salvage option alone: it pays 250 instead of 0 in the failure state, worth 0.6 × 250/1.10 = 1 500/11 = 136.36. Without it the pilot is worth −200 + 0.4(600)/1.10 = 200/11 = 18.18. Together 1 700/11 = 154.55 ✓ Building at once instead is worth 0.4(260) + 0.6(150) = 194 a year, so 1 940 − 2 000 = −60: all of the 154.55 is option value.</p>`,
      traps: [
        "Forgot the salvage value, so the failure state is worth 0: −200 + 0.4(600)/1.10 = 18.18.",
        "Valued the perpetuity at date 2 and discounted it again: success 2 600/1.10 − 2 000 = 363.64, failure still sells for 250, NPV = −200 + [0.4(363.64) + 0.6(250)]/1.10 = 68.60.",
        null,
        "Built in both states, with no max at date 1: −200 + [0.4(600) + 0.6(−500)]/1.10 = −200 − 54.55 = −254.55.",
      ],
    },
    {
      id: "realopsjon-17",
      title: "Staged financing: pay for one stage at a time",
      theory: `<p>Venture capital, biotech and R&amp;D are rarely funded in one go. You pay for one stage, see whether it reached its milestone and only then decide to pay for the next. Each stage buys an option on the next one: if a stage fails, you save the money for the later stages. The total cost and the overall chance of success can be exactly as before; the value rises because the later money is spent only in the branches where it can still pay off. The more a stage reveals, the more staging is worth. Roll the tree back as in the previous step.</p>
<div class="formula"><div class="eq">NPV<sub>staged</sub> = −I<sub>1</sub> + p<sub>1</sub> × max(0, −I<sub>2</sub> + p<sub>2</sub> × V)</div>
<div class="where">I<sub>1</sub> and I<sub>2</sub> are the costs of the two stages, p<sub>1</sub> the chance the first succeeds, p<sub>2</sub> the chance the second succeeds once the first has, V the payoff at the end. The overall success probability is p<sub>1</sub>p<sub>2</sub>. Kurbatov's example ignores discounting; so does this step.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11)</span><p>100 brings a start-up to an IPO worth 800 with a 10% chance. In one go: −100 + 0.1 × 800 = −20.</p><p>Staged: 10 to develop the product (50% success), then 90 to market the IPO (20% success). After stage 1: −90 + 0.2 × 800 = 70 &gt; 0, so continue. NPV = −10 + 0.5 × 70 = 25.</p><p>The three outcomes give the same: 0.1(700) + 0.4(−100) + 0.5(−10) = 70 − 40 − 5 = 25.</p></div>`,
      q: `<p>A biotech start-up needs 60 (NOK million) to reach an IPO worth 360. Funded in one go, the chance of reaching the IPO is 15%. A venture fund offers to fund it in two stages instead: 12 for clinical trials, which succeed with probability 30%, then 48 for approval, which succeeds with probability 50% once the trials have succeeded. The fund may stop after the trials. Ignore discounting. What is the NPV of the staged plan?</p>`,
      options: ["−6.00", "36.60", "−10.20", "27.60"],
      answer: 3,
      solution: `<p>After successful trials: −48 + 0.50 × 360 = 132 &gt; 0, so the fund pays for approval.</p><p>NPV = −12 + 0.30 × 132 = −12 + 39.60 = <b>27.60</b>.</p>`,
      check: `<p>Count the three outcomes: both stages succeed, 0.15 × (360 − 60) = 45; trials succeed and approval fails, 0.15 × (−60) = −9; trials fail, 0.70 × (−12) = −8.40. Sum 27.60 ✓ In one go the plan is worth −60 + 0.15 × 360 = −6. The gap 33.60 = 0.70 × 48 is the approval money saved when the trials fail ✓</p>`,
      traps: [
        "Paid both stages up front: −60 + 0.15 × 360 = −6.00. That throws away the right to stop after the trials.",
        "Left out the branch where the trials succeed and approval fails: 0.15 × 300 − 0.70 × 12 = 36.60. With probability 0.15 both stages are paid and lost.",
        "Used the overall 15% at the second node instead of the conditional 50%: −12 + 0.30 × (−48 + 0.15 × 360) = −10.20.",
        null,
      ],
    },
    {
      id: "realopsjon-11",
      title: "When the discount rate is what is uncertain",
      theory: `<p>Sometimes the cash flows are known and the uncertainty is the interest rate. Then a lower rate is the good state, because it makes the same annuity worth more. Value each branch at date 1 with that branch's own rate, then bring it back to today with the rate from year 0 to year 1, which you know today. Read the timing: if the project simply starts a year later it keeps all T payments; if a licence expires on a fixed date, waiting costs you a payment.</p>
<div class="formula"><div class="eq">NPV<sub>i</sub> seen from today = [C × A(T, r<sub>i</sub>) − I]/(1 + r<sub>0→1</sub>)</div>
<div class="where">r<sub>i</sub> is the rate in branch i from year 1 on, r<sub>0→1</sub> the rate from year 0 to year 1. Do not discount the first year at r<sub>i</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>C = 1 a year for 5 years, I = 4.3. The rate is 5% this year and 4% or 6% from year 1.</p><p>4% branch: A(5, 4%) = 4.4518, NPV<sub>1</sub> = 4.4518 − 4.3 = 0.1518, today 0.1518/1.05 = 0.1446.</p><p>6% branch: A(5, 6%) = 4.2124, NPV<sub>1</sub> = −0.0876: you would not invest there.</p></div>`,
      q: `<p>A ferry route costs 8 (NOK million), paid when you invest. It pays 1.25 a year for 8 years, starting one year after you invest. The one-year rate today is 6%. You can wait one year: the rate then becomes 4% or 8% for good, while the rate from year 0 to year 1 stays 6%. The cost is still 8 and the route still runs 8 years after investment. What is the NPV, from today's perspective, of investing at date 1 in the 4% branch?</p>`,
      options: ["0.4159", "−0.4693", "0.3999", "0.3924"],
      answer: 3,
      solution: `<p>1.04<sup>−8</sup> = 0.730690, so A(8, 4%) = 0.269310/0.04 = 6.7327.</p><p>PV<sub>1</sub> = 1.25 × 6.7327 = 8.4159. NPV<sub>1</sub> = 8.4159 − 8 = 0.4159.</p><p>Today: 0.4159/1.06 = <b>0.3924</b>.</p>`,
      check: `<p>The 8% branch: A(8, 8%) = 5.7466, PV<sub>1</sub> = 7.1833, NPV<sub>1</sub> = −0.8167, so you would not invest there. Investing today at 6%: PV = 1.25 × 6.209794 = 7.7622, NPV −0.2378. The low-rate branch must beat both. It does ✓</p>`,
      traps: [
        "Stopped at date 1 and forgot to bring the NPV back to today: 0.4159.",
        "Counted 7 payments, as if the licence expired on a fixed date: 1.25 × 6.002055 − 8 = −0.497432 at date 1, −0.4693 today.",
        "Discounted the first year at the branch rate of 4% instead of 6%: 0.4159/1.04 = 0.3999.",
        null,
      ],
    },
    {
      id: "realopsjon-12",
      title: "The risk-neutral probability from the underlying",
      theory: `<p>When you have no usable probabilities, or the risk is a traded price or a rate, value the option risk-neutrally. The underlying S is a stream of cash flows, not an NPV: the investment cost is the strike. ρ is the probability that makes S earn exactly the risk-free rate over the year, so grow today's price by (1 + r<sub>f</sub>) before you compare it with the two date-1 values. Real probabilities never enter. The rule that decides the answer: S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must price exactly the same cash flows. The option to wait delivers the project started at date 1, so if it pays C for T years from one year after you invest, the underlying is the payments in years 2 to T + 1.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="eq">S<sub>u</sub> = C × A(T, r<sub>u</sub>), S<sub>d</sub> = C × A(T, r<sub>d</sub>), S<sub>0</sub> = C × A(T, r<sub>0</sub>)/(1 + r<sub>0</sub>)</div>
<div class="where">r<sub>f</sub> = r<sub>0</sub> is the rate from year 0 to year 1. S<sub>0</sub> assumes every maturity is discounted at r<sub>0</sub> today. S<sub>u</sub> and S<sub>d</sub> are values at date 1 including any payment made at date 1. The H2024 key prices the same stream with an annuity of 1 for T + 1 years from year 1, S<sub>u</sub> = 1 + A(T, r<sub>u</sub>): a sure payment at date 1 adds the same amount to (1 + r<sub>f</sub>)S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>, so ρ is unchanged. Check that 0 &lt; ρ &lt; 1.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A project pays 2 a year for 3 years, starting one year after you invest. Today every maturity is discounted at 5%; in one year the rate becomes 4% or 6%. The option is to invest at date 1, so the underlying is the payments in years 2 to 4.</p><p>S<sub>u</sub> = 2 × A(3, 4%) = 5.550182 and S<sub>d</sub> = 2 × A(3, 6%) = 5.346024. Today: S<sub>0</sub> = 2 × A(3, 5%)/1.05 = 5.446496/1.05 = 5.187139.</p><p>ρ = (1.05 × 5.187139 − 5.346024)/(5.550182 − 5.346024) = (5.446496 − 5.346024)/0.204158 = 0.100472/0.204158 = 0.4921.</p></div>`,
      q: `<p>A ferry route costs 8 (NOK million) to build and pays 1.25 a year for 8 years, starting one year after you invest. Today every maturity is discounted at 6%, so investing today gives cash flows worth 7.7622. You can wait a year instead: the rate then becomes 4% or 8% for good. Investing at date 1 then gives cash flows worth S<sub>u</sub> = 8.4159 or S<sub>d</sub> = 7.1833 at date 1. The rate from year 0 to year 1 is 6%. An analyst puts the real probability of a falling rate at 0.5. To value the option to wait, a call on the route started at date 1, what is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.4697", "0.3509", "0.8475", "0.0803"],
      answer: 0,
      solution: `<p>The option delivers the route started at date 1, with payments in years 2 to 9. S<sub>u</sub> and S<sub>d</sub> already price that stream at date 1. Today it is worth the 7.7622 of investing now discounted one more year: S<sub>0</sub> = 7.7622/1.06 = 7.3229.</p><p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.06 × 7.7622/1.06 = 7.7622: growing the stream one year undoes the extra year of discounting.</p><p>ρ = (7.7622 − 7.1833)/(8.4159 − 7.1833) = 0.5789/1.2326 = <b>0.4697</b>.</p><p>The investment cost and the analyst's 0.5 play no role.</p>`,
      check: `<p>Reprice the asset: [0.4697 × 8.4159 + 0.5303 × 7.1833]/1.06 = (3.9530 + 3.8093)/1.06 = 7.7623/1.06 = 7.3229 ✓ This only confirms the arithmetic, since ρ is built to make it hold. A test that can fail is a second twin for the same stream. The H2024 key's version is an annuity of 1 a year for 9 years from year 1: S<sub>0</sub> = A(9, 6%) = 6.801692, S<sub>u</sub> = 1 + A(8, 4%) = 7.732745, S<sub>d</sub> = 1 + A(8, 8%) = 6.746639, so ρ = (1.06 × 6.801692 − 6.746639)/(7.732745 − 6.746639) = 0.463155/0.986106 = 0.4697 ✓ A twin that mixes two streams fails this test.</p>`,
      traps: [
        null,
        "Grew S<sub>0</sub> at the up-branch rate of 4% instead of the 6% that applies this year: (1.04 × S<sub>0</sub> − 7.1833)/1.2326 = 0.3509.",
        "S<sub>0</sub> prices a different cash flow than S<sub>u</sub> and S<sub>d</sub>: 7.7622 is the route started today (years 1 to 8), while S<sub>u</sub> and S<sub>d</sub> value the route started at date 1 (years 2 to 9). (1.06 × 7.7622 − 7.1833)/1.2326 = 0.8475.",
        "Built the tree on NPVs instead of PVs, taking the cost of 8 off the asset at both dates: [1.06(S<sub>0</sub> − 8) + 0.8167]/(0.4159 + 0.8167) = 0.0803. The 8 is the strike, not part of the asset.",
      ],
    },
    {
      id: "realopsjon-13",
      title: "Exam level: the option to wait by risk-neutral valuation",
      theory: `<p>Waiting gives you a call on the project started at date 1, struck at the investment cost I. At date 1 you invest only if it pays, so each payoff is floored at zero. Find ρ as in the last step, from S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> for that same stream. Check that it lies strictly between 0 and 1. Weight the payoffs with ρ, discount at r<sub>f</sub>, then subtract what you would get by investing today. A positive option value means wait.</p>
<div class="formula"><div class="eq">C<sub>u</sub> = max(S<sub>u</sub> − I, 0), C<sub>d</sub> = max(S<sub>d</sub> − I, 0)</div>
<div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="eq">value of the option to wait = C<sub>0</sub> − max(0, NPV<sub>now</sub>)</div>
<div class="where">NPV<sub>now</sub> = C × A(T, r<sub>0</sub>) − I is investing today, a different stream from the underlying. Replication on the formula sheet gives the same C<sub>0</sub>: Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>), B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>), C<sub>0</sub> = S<sub>0</sub>Δ + B, with the same S<sub>0</sub> as in ρ.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The project started at date 1 has S<sub>0</sub> = 100, S<sub>u</sub> = 120 and S<sub>d</sub> = 90, r<sub>f</sub> = 4%, so ρ = (104 − 90)/30 = 14/30. The investment cost is I = 105. Investing today instead gives cash flows worth 104, so NPV<sub>now</sub> = 104 − 105 = −1.</p><p>C<sub>u</sub> = 15, C<sub>d</sub> = 0. C<sub>0</sub> = (14/30)(15)/1.04 = 7/1.04 = 6.7308.</p><p>The option to wait is worth 6.7308 − max(0, −1) = 6.7308: wait.</p></div>`,
      q: `<p>A licence lets you build a tidal plant for 24 (NOK million), paid when you build. The plant pays 3.0 a year for 10 years, starting one year after you build. Today every maturity is discounted at 4%. If you wait a year, the rate becomes 2.5% or 5.5% for good, the rate from year 0 to year 1 stays 4%, the cost is still 24 and the plant still runs 10 years after you build. An analyst puts the real probability of 2.5% at 0.5. What is the value today of the option to wait, measured against building today?</p>`,
      options: ["1.2709", "0.6914", "−0.0128", "1.0241"],
      answer: 1,
      solution: `<p><b>Building today.</b> 3.0 × A(10, 4%) = 3.0 × 8.110896 = 24.3327, so NPV<sub>now</sub> = 0.3327.</p><p><b>Underlying: the plant built at date 1</b>, payments in years 2 to 11. S<sub>u</sub> = 3.0 × A(10, 2.5%) = 3.0 × 8.752064 = 26.2562. S<sub>d</sub> = 3.0 × A(10, 5.5%) = 3.0 × 7.537626 = 22.6129. Today: S<sub>0</sub> = 24.3327/1.04 = 23.3968.</p><p><b>ρ.</b> (1.04 × 23.3968 − 22.6129)/(26.2562 − 22.6129) = (24.3327 − 22.6129)/3.6433 = 1.7198/3.6433 = 0.4720, strictly between 0 and 1 ✓</p><p><b>Payoffs.</b> C<sub>u</sub> = max(26.2562 − 24, 0) = 2.2562. C<sub>d</sub> = max(22.6129 − 24, 0) = 0.</p><p><b>Value.</b> C<sub>0</sub> = 0.472045 × 2.256192/1.04 = 1.065025/1.04 = 1.024063. Option to wait = 1.024063 − max(0, 0.332687) = <b>0.6914</b>. Wait.</p>`,
      check: `<p>A second twin for the same stream must give the same ρ. The H2024 key's version is an annuity of 1 a year for 11 years from year 1: S<sub>0</sub> = A(11, 4%) = 8.760477, S<sub>u</sub> = 1 + A(10, 2.5%) = 9.752064, S<sub>d</sub> = 1 + A(10, 5.5%) = 8.537626, so ρ = (1.04 × 8.760477 − 8.537626)/(9.752064 − 8.537626) = 0.573270/1.214438 = 0.4720 ✓ Pairing today's 24.3327 with S<sub>u</sub> and S<sub>d</sub> gives 0.7392 and fails this test. Replication on the same tree catches arithmetic slips only: Δ = 2.256192/3.643314 = 0.619269, B = −22.612877 × 0.619269/1.04 = −13.464861, C<sub>0</sub> = 23.396815 × 0.619269 − 13.464861 = 14.488923 − 13.464861 = 1.024062 ✓</p>`,
      traps: [
        "S<sub>0</sub> prices a different cash flow than S<sub>u</sub> and S<sub>d</sub>: 24.3327 is the plant built today (years 1 to 10), while S<sub>u</sub> and S<sub>d</sub> value the plant built at date 1 (years 2 to 11). That gives ρ = 0.7392, C<sub>0</sub> = 1.6036 and an option of 1.6036 − 0.3327 = 1.2709.",
        null,
        "Forgot that you are not forced to build at date 1: C<sub>d</sub> = 22.6129 − 24 = −1.3871 gives C<sub>0</sub> = 0.3199 and an option of 0.3199 − 0.3327 = −0.0128.",
        "Reported C<sub>0</sub> = 1.0241, the whole value of waiting, as the option. The option is only what waiting adds over building today. Building today has a positive NPV here.",
      ],
    },
    {
      id: "realopsjon-18",
      title: "Exam level: the abandonment option with monthly cash flows",
      theory: `<p>Kurbatov flagged this in the wrap-up as a possible exam exercise (lecture 11, the store). You can open a business now or never. In the bad state its net cash flow is negative forever, but the lease lets you leave after two years at no cost, so the perpetuity of losses becomes a 24-month annuity. The cash flows are monthly, so use r<sub>m</sub>. Then answer the question in the right units: the value the exit right adds is measured against what you would do without it. Without the right the NPV is negative and you would not open, which is worth 0. So compare with 0, not with the negative NPV. Kurbatov singles out that comparison as the mistake to avoid.</p>
<div class="formula"><div class="eq">NPV<sub>good</sub> = (R<sub>good</sub> − c)/r<sub>m</sub> − I &nbsp;&nbsp; NPV<sub>bad</sub> = (R<sub>bad</sub> − c) × A(24, r<sub>m</sub>) − I</div>
<div class="eq">value of the exit right = max(0, E[NPV with exit]) − max(0, E[NPV without exit])</div>
<div class="where">R is monthly revenue, c the monthly operating cost including rent, I the set-up cost and r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1. You learn the state right after opening, so you pay I in both states.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11)</span><p>Set-up 400 000, costs 10 000 a month, cash flow 16 000 or 8 000 a month (50% each), monthly rate 0.565% as on the slide.</p><p>Without exit: 2 000/0.00565 − 400 000 = −46 018: do not open. Good: 6 000/0.00565 − 400 000 = 661 947. Bad, leaving after 24 months: −2 000 × A(24, 0.565%) − 400 000 = −444 770.</p><p>With exit: 0.5 × 661 947 − 0.5 × 444 770 = 108 589: open. The right is worth 108 589 − 0, not 108 589 + 46 018 = 154 607.</p></div>`,
      q: `<p>A gym chain can open a branch for 700 (NOK thousand) now or never. Operating costs, including rent, are 25 a month. Revenue will be 40 a month forever or 16 a month forever, with equal probability; the chain learns which right after opening. The effective annual discount rate is 6%. The lease lets the chain leave at no cost after 24 months; it gets nothing after that. How much does the right to leave add to the value of the opportunity?</p>`,
      options: ["739.12", "822.79", "698.47", "701.00"],
      answer: 0,
      solution: `<p><b>Monthly rate.</b> r<sub>m</sub> = 1.06<sup>1/12</sup> − 1 = 0.486755%, so 1/r<sub>m</sub> = 205.4421 and A(24, r<sub>m</sub>) = 22.599367.</p><p><b>Good state.</b> 15 × 205.4421 − 700 = 3 081.63 − 700 = 2 381.63.</p><p><b>Bad state, leave after 24 months.</b> −9 × 22.599367 − 700 = −203.39 − 700 = −903.39. With exit: E[NPV] = 0.5 × 2 381.63 − 0.5 × 903.39 = 739.12.</p><p><b>Without the right.</b> Bad state forever: −9 × 205.4421 − 700 = −2 548.98, so E[NPV] = 0.5 × (2 381.63 − 2 548.98) = −83.67. The chain would not open: 0.</p><p><b>Value of the right</b> = 739.12 − 0 = <b>739.12</b>.</p>`,
      check: `<p>Price the losses the lease cuts off: −9 a month from month 25, worth 9 × 205.4421 = 1 848.98 at month 24, or 1 848.98/1.06<sup>2</sup> = 1 645.58 today, times 0.5 = 822.79. And −83.67 + 822.79 = 739.12 ✓ Of those 822.79, the first 83.67 only lift the NPV from −83.67 to 0, which the chain can have anyway by not opening. Only 739.12 is new value.</p>`,
      traps: [
        null,
        "Compared with the negative NPV without the right: 739.12 − (−83.67) = 822.79. Without the right the chain would not open, so the alternative is worth 0.",
        "Divided the annual rate by 12: at 0.5% a month the good state is worth 15/0.005 − 700 = 2 300 and the bad −9 × A(24, 0.5%) − 700 = −903.07, so 698.47.",
        "Switched to annual sums at 6%: 180/0.06 − 700 = 2 300 and −108 × A(2, 6%) − 700 = −898.00, so 701.00. The money comes monthly.",
      ],
    },
    {
      id: "realopsjon-14",
      title: "Exam level: the indifference spread with an exit option",
      theory: `<p>The hardest version chains everything: a perpetuity in the good state, an annuity cut short by the exit option in the bad state and the outlay paid in both states, because you commit first. An unknown X sets the spread. Write the expected NPV as a function of X, set it to zero and solve. Then check that the bad-state cash flow really is negative, so the exit really is used.</p>
<div class="formula"><div class="eq">0 = −I + 0.5[(m + X)/r + (m − X) × A(n, r)]</div>
<div class="where">m is the expected net cash flow (revenue minus operating cost), X the spread around it and n the number of years before you may exit. The equation is valid only for X &gt; m.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>m = 10, I = 150, r = 10%, exit after 1 year, so A(1, 10%) = 0.909091.</p><p>Multiply by 2: 300 = 10(10 + X) + 0.909091(10 − X) = 109.090909 + 9.090909X.</p><p>X = 190.909091/9.090909 = 21.0000. Since 21 &gt; 10, the exit is used ✓</p></div>`,
      q: `<p>A shop costs 300 (NOK thousand) to open today. Operating costs are 120 a year. Revenue is 130 + X or 130 − X a year forever, with equal probability; you learn which during year 1, after opening. The discount rate is 6%. You may close the shop after year 3 and get nothing from year 4 on. For what X are you indifferent between opening and not opening?</p>`,
      options: ["26.0000", "29.0563", "7.6180", "30.1996"],
      answer: 1,
      solution: `<p>Net cash flows: 10 + X and 10 − X. For X &gt; 10 the bad state loses money, so you close after year 3.</p><p>Factors: 1/0.06 = 16.666667 and A(3, 6%) = 2.673012.</p><p>Set E[NPV] = 0 and multiply by 2: 600 = 16.666667(10 + X) + 2.673012(10 − X) = 166.666667 + 26.730120 + 13.993655X.</p><p>406.603213 = 13.993655X, so X = <b>29.0563</b>. Since 29.0563 &gt; 10, the exit is used ✓</p>`,
      check: `<p>Plug back with X = 29.056256. Good: −300 + 39.056256/0.06 = −300 + 650.9376 = 350.9376. Bad: −300 − 19.056256 × 2.673012 = −300 − 50.9376 = −350.9376. Average 0 ✓ A wider spread makes opening worth it, a narrower one does not, because the upside is a perpetuity while the downside stops after three years.</p>`,
      traps: [
        "Treated the exit as immediate and dropped the three years of bad-state losses: 600 = 16.666667(10 + X) gives X = 26.0000.",
        null,
        "Cleared the 0.5 from the bracket but not from the outlay, so 300 = 16.666667(10 + X) + 2.673012(10 − X): X = 7.6180, which also fails the check X &gt; 10.",
        "Counted four years of losses before the exit: A(4, 6%) = 3.465106 gives X = 30.1996.",
      ],
    },
  ],
});

/* sjanger 5 · ma · Mergers and acquisitions: stock swaps and deal probability */
window.EDU_DATA.sjangre.push({
  id: "ma",
  num: 5,
  title: "Mergers and acquisitions: stock swaps and deal probability",
  summary: "From the premium and the exchange ratio to the market's implied probability that a deal closes",
  chapters: [26],
  exam: "8 of 11 papers · H2024 E1, H2025 E6",
  intro: `<p>M&amp;A has appeared on 8 of 11 papers and on both of Kurbatov's. H2024 Exercise 1 asked for four reasons for a deal with synergies banned. H2025 Exercise 6 asked for the probability the market assigns to a deal closing, backed out of four share prices and a risk-free rate. The ladder starts with the premium and the exchange ratio, builds the stock-swap arithmetic the formula sheet only half gives you and ends with the long-short strategy and Kurbatov's Vodafone-Mannesmann exercise. At the top you can price a stock swap, tell the offered premium from the actual one, argue motives without synergies and solve H2025 Exercise 6 with any numbers.</p>`,
  steps: [
    {
      id: "ma-1",
      title: "The acquisition premium in per cent and in kroner",
      theory: `<p>To win control, an acquirer must offer more than the target's market price. The premium measures how much more. It is always measured against the target's price <b>before</b> the bid became known: after the announcement the price already contains most of the premium. In kroner it is what the target's shareholders gain if the deal closes at the offer.</p>
<div class="formula"><div class="eq">premium (%) = offer per share/P<sub>T</sub> − 1</div><div class="eq">premium (NOK) = N<sub>T</sub> × (offer per share − P<sub>T</sub>)</div>
<div class="where">P<sub>T</sub> is the target's pre-announcement share price and N<sub>T</sub> its number of shares. T = N<sub>T</sub> × P<sub>T</sub> is the target's stand-alone equity value, so the premium in NOK is also premium (%) × T.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target has 10 million shares at 40 NOK. The acquirer offers 50 NOK per share in cash.</p><p>Premium = 50/40 − 1 = 25%. In NOK: 10 × (50 − 40) = 100 million, which is 25% × 400 million.</p></div>`,
      q: `<p>Kveldsol AS has 24 million shares, which traded at 75 NOK before any news of a bid. Fjordlys ASA then announced a cash offer of 93 NOK per share. Kveldsol now trades at 90 NOK. What is the premium, in per cent and in total NOK?</p>`,
      options: ["24.00% and 432.00 million", "3.33% and 72.00 million", "20.00% and 360.00 million", "124.00% and 2 232.00 million"],
      answer: 0,
      solution: `<p>Measure against the pre-announcement price of 75, not today's 90.</p><p>Premium per share = 93 − 75 = 18 NOK, so the premium = 93/75 − 1 = <b>24.00%</b>.</p><p>In NOK: 24 × 18 = <b>432.00 million</b>.</p>`,
      check: `<p>24% of Kveldsol's pre-bid value: 0.24 × (24 × 75) = 0.24 × 1 800 = 432.00 million ✓. Today's price of 90 lies between 75 and 93: the market has priced in most of the premium but not all of it, because the deal may still fail. A later step turns that gap into a probability.</p>`,
      traps: [
        null,
        "Measured against the post-announcement price: 93/90 − 1 = 3.33% and 24 × 3 = 72.00 million. That price already contains most of the premium.",
        "Treated today's price as the offer: 90/75 − 1 = 20.00% and 24 × 15 = 360.00 million. The offer is 93; the 90 only shows how much of the premium the market has priced in.",
        "Reported the offer instead of the premium: 93/75 = 124.00% of the old price and 24 × 93 = 2 232.00 million paid in total.",
      ],
    },
    {
      id: "ma-2",
      title: "The exchange ratio and the number of new shares",
      theory: `<p>In a stock swap the acquirer pays with its own shares. The exchange ratio ER is the number of acquirer shares each target share receives. The acquirer issues x new shares to the target's shareholders. Read the ratio as a sentence before you use it: "1 acquirer share for every 4 target shares" means ER = 1/4 = 0.25, not 4.</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub></div><div class="eq">ER = offer per target share/P<sub>A</sub></div>
<div class="where">N<sub>T</sub> is the target's number of shares and P<sub>A</sub> the acquirer's pre-announcement price. The second line converts an offer stated in NOK per target share into a ratio. Multiply by the target's share count, never the acquirer's: the new shares go to the target's holders.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target has 12 million shares. The acquirer offers 1 of its shares for every 4 target shares, so ER = 0.25 and x = 0.25 × 12 = 3 million new shares.</p><p>The same offer stated in NOK: 30 NOK per target share, paid in acquirer shares worth 120 NOK, gives ER = 30/120 = 0.25.</p></div>`,
      q: `<p>Sørlys ASA has 50 million shares. It offers 2 of its own shares for every 5 shares of Vindfang AS, which has 24 million shares. How many new Sørlys shares will be issued?</p>`,
      options: ["20.00 million", "60.00 million", "9.60 million", "59.60 million"],
      answer: 2,
      solution: `<p>"2 for every 5" means each Vindfang share receives ER = 2/5 = 0.40 Sørlys shares.</p><p>x = 0.40 × 24 = <b>9.60 million</b> new shares. Sørlys will then have 50 + 9.60 = 59.60 million shares in total.</p>`,
      check: `<p>Count in batches: 24 million Vindfang shares make 24/5 = 4.8 million batches of five. Each batch receives 2 new shares: 4.8 × 2 = 9.60 million ✓. Backwards, 9.60/24 = 0.40 = 2/5 ✓.</p>`,
      traps: [
        "Multiplied the ratio by the acquirer's share count: 0.40 × 50 = 20.00 million.",
        "Turned the ratio upside down: (5/2) × 24 = 60.00 million.",
        null,
        "Reported the total share count after the deal, 50 + 9.60 = 59.60 million, not the new shares.",
      ],
    },
    {
      id: "ma-3",
      title: "The share price after the merger",
      theory: `<p>After a stock swap the merged firm is worth the two stand-alone equity values plus the synergies, A + T + S. That value is shared by every share outstanding: the acquirer's old N<sub>A</sub> plus the x new ones. The formula is not on the formula sheet, so you must know it.</p>
<div class="formula"><div class="eq">P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="where">A = N<sub>A</sub>P<sub>A</sub> and T = N<sub>T</sub>P<sub>T</sub> at <b>pre-announcement</b> prices. S is the present value of the synergies. A post-announcement market value already contains part of S, so using it counts the synergies twice.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 10 million at 50 NOK, N<sub>T</sub> = 5 million at 20 NOK, ER = 0.5, S = 50 million.</p><p>A = 500, T = 100, x = 0.5 × 5 = 2.5. P<sub>new</sub> = (500 + 100 + 50)/(10 + 2.5) = 650/12.5 = 52.00 NOK.</p></div>`,
      q: `<p>Brattli ASA has 40 million shares at 90 NOK. It offers ER = 0.40 for each of the 16 million shares of Elvekant AS, which trade at 30 NOK. The synergies have a present value of 120 million NOK. Both prices are pre-announcement. What is the share price of the merged firm?</p>`,
      options: ["90.52 NOK", "87.93 NOK", "105.00 NOK", "75.00 NOK"],
      answer: 0,
      solution: `<p>A = 40 × 90 = 3 600 and T = 16 × 30 = 480, so A + T + S = 3 600 + 480 + 120 = 4 200 million.</p><p>x = 0.40 × 16 = 6.40 million, so N<sub>A</sub> + x = 46.40 million shares.</p><p>P<sub>new</sub> = 4 200/46.40 = <b>90.52 NOK</b>.</p>`,
      check: `<p>Split the value. Elvekant's holders get 6.40 million shares worth 6.40 × 90.5172 = 579.31 million, while Elvekant brings in T + S = 600. Brattli's old holders keep the difference, 600 − 579.31 = 20.69 million, or 0.5172 per old share: 90 + 0.5172 = 90.5172 ✓.</p>`,
      traps: [
        null,
        "Forgot the synergies: (3 600 + 480)/46.40 = 87.93 NOK.",
        "Forgot the new shares and divided by the old count: 4 200/40 = 105.00 NOK.",
        "Divided by both firms' old share counts, 40 + 16 = 56, instead of 40 + 6.40: 4 200/56 = 75.00 NOK.",
      ],
    },
    {
      id: "ma-15",
      title: "Paying cash: the NPV to each side",
      theory: `<p>In a cash deal the acquirer pays a price P for the target's equity, worth T on its own. The target's shareholders swap something worth T for P in cash, so they gain the premium P − T. The acquirer's shareholders get the merged firm A + T + S, pay P and give up A, so they gain S − (P − T): the synergies minus the premium they hand over. The two gains add up to S. With cash, the acquirer's cost is fixed once P is agreed; in a stock swap the target also gets a share of S (a later step).</p>
<div class="formula"><div class="eq">NPV<sub>T</sub> = P − T &nbsp;&nbsp; NPV<sub>A</sub> = (A + T + S) − P − A = S − (P − T)</div>
<div class="where">T = N<sub>T</sub> × P<sub>T</sub> at the <b>pre-announcement</b> price, P = N<sub>T</sub> × cash offer per share and S the present value of the synergies (lecture 12). The acquirer gains only if the premium is below S.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>T = 400, P = 500 and S = 150.</p><p>NPV<sub>T</sub> = 500 − 400 = 100. NPV<sub>A</sub> = 150 − 100 = 50. Sum 150 = S.</p></div>`,
      q: `<p>Havbris AS has 20 million shares, which traded at 24 NOK before any news of a bid. Fjordline ASA offers 29 NOK per share in cash. Havbris now trades at 28 NOK. The synergies are worth 140 million NOK. What is the NPV of the deal for Fjordline's shareholders?</p>`,
      options: ["100.00 million", "120.00 million", "240.00 million", "40.00 million"],
      answer: 3,
      solution: `<p>T = 20 × 24 = 480 and P = 20 × 29 = 580, so the premium is P − T = 100.</p><p>NPV<sub>A</sub> = S − (P − T) = 140 − 100 = <b>40.00 million</b>.</p>`,
      check: `<p>NPV<sub>T</sub> = 100. Then 40 + 100 = 140 = S ✓ That sum is an identity and catches arithmetic only. The sign test is real: Fjordline gains exactly when the premium of 100 is below the synergies of 140 ✓</p>`,
      traps: [
        "Gave the target's NPV, the premium: 580 − 480 = 100.00 million.",
        "Measured T at the post-announcement price of 28: 140 − (580 − 560) = 120.00 million. That price already contains most of the premium.",
        "Added the premium instead of subtracting it: 140 + 100 = 240.00 million. The premium is what Fjordline pays away.",
        null,
      ],
    },
    {
      id: "ma-5",
      title: "The target's ownership share y and the NPV to each side",
      theory: `<p>After the swap the target's former shareholders hold the x new shares and the acquirer's old shareholders keep their N<sub>A</sub>. The target's fraction of the merged firm is y, a ratio of share counts that depends on neither prices nor synergies. Each group's gain is what it owns after the deal minus what it had before. The acquirer's old shareholders own 1 − y of A + T + S and had A; the target's shareholders own y of it and had T. The formula sheet gives both NPV formulas but does not define y. Added together they give S: the exchange ratio only decides how the synergies are divided.</p>
<div class="formula"><div class="eq">y = x/(N<sub>A</sub> + x)</div><div class="eq">NPV<sub>A</sub> = (1 − y)(A + T + S) − A &nbsp;&nbsp; NPV<sub>T</sub> = y(A + T + S) − T</div><div class="eq">NPV<sub>A</sub> + NPV<sub>T</sub> = S &nbsp;&nbsp; NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>)</div>
<div class="where">The denominator of y is the share count after the deal, not N<sub>A</sub> and not N<sub>A</sub> + N<sub>T</sub>. The sum to S is an identity: it catches a slip in one NPV line but holds for any y. The last identity never uses y, so it is the check that catches a wrong y.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 10 million and x = 2.5 million new shares, A = 500, T = 100 and S = 50.</p><p>y = 2.5/(10 + 2.5) = 20% and A + T + S = 650. NPV<sub>A</sub> = 0.80 × 650 − 500 = 20. NPV<sub>T</sub> = 0.20 × 650 − 100 = 30. Sum: 20 + 30 = 50 = S ✓.</p></div>`,
      q: `<p>Kvitfjell ASA has 30 million shares at 150 NOK. It offers ER = 0.36 for each of the 12 million shares of Bergtind AS, which trade at 45 NOK. The synergies are worth 180 million NOK. Both prices are pre-announcement. What is the NPV of the deal for Kvitfjell's shareholders?</p>`,
      options: ["117.06 million", "−94.41 million", "160.71 million", "62.94 million"],
      answer: 3,
      solution: `<p>A = 30 × 150 = 4 500, T = 12 × 45 = 540, so A + T + S = 4 500 + 540 + 180 = 5 220.</p><p>x = 0.36 × 12 = 4.32 million and y = 4.32/34.32 = 0.125874.</p><p>NPV<sub>A</sub> = (1 − 0.125874) × 5 220 − 4 500 = 4 562.94 − 4 500 = <b>62.94 million</b>.</p>`,
      check: `<p>NPV<sub>T</sub> = 0.125874 × 5 220 − 540 = 657.06 − 540 = 117.06. Then 62.94 + 117.06 = 180.00 = S ✓. That confirms the arithmetic only. Independent route: P<sub>new</sub> = 5 220/34.32 = 152.0979, so NPV<sub>A</sub> = 30 × (152.0979 − 150) = 30 × 2.0979 = 62.94 ✓. This one would fail with a wrong y.</p>`,
      traps: [
        "Gave the target's NPV instead: 0.125874 × 5 220 − 540 = 117.06 million.",
        "Forgot the synergies: 0.8741259 × 5 040 − 4 500 = 4 405.59 − 4 500 = −94.41 million.",
        "Used the target's share of value, T/(A + T) = 540/5 040 = 0.107143, as y: 0.892857 × 5 220 − 4 500 = 160.71 million.",
        null,
      ],
    },
    {
      id: "ma-6",
      title: "The highest exchange ratio the acquirer can offer",
      theory: `<p>A higher ER hands more of the merged firm to the target, so NPV<sub>A</sub> falls as ER rises. The acquirer breaks even when it hands over the whole of T + S. The formula sheet gives that bound. The second form is the one to remember: the most the acquirer can pay per target share is the target's price plus all of the synergy per target share, converted into acquirer shares at P<sub>A</sub>.</p>
<div class="formula"><div class="eq">ER &lt; [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) &nbsp;⟺&nbsp; ER<sub>max</sub> = (P<sub>T</sub> + S/N<sub>T</sub>)/P<sub>A</sub></div>
<div class="where">At ER<sub>max</sub>, NPV<sub>A</sub> = 0 and P<sub>new</sub> = P<sub>A</sub>. The target's floor is ER<sub>min</sub> = [T/(A + S)] × (N<sub>A</sub>/N<sub>T</sub>), which is not on the sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A = 500, T = 100, S = 50, N<sub>A</sub> = 10, N<sub>T</sub> = 5, P<sub>A</sub> = 50, P<sub>T</sub> = 20.</p><p>ER<sub>max</sub> = (150/500) × (10/5) = 0.30 × 2 = 0.60. Second form: (20 + 50/5)/50 = 30/50 = 0.60 ✓.</p></div>`,
      q: `<p>Lynghaug ASA has 45 million shares at 80 NOK. Sandvik AS has 15 million shares at 50 NOK. The synergies are worth 210 million NOK and both prices are pre-announcement. What is the highest exchange ratio Lynghaug can offer before its shareholders lose from the deal?</p>`,
      options: ["0.8000", "0.6250", "0.5906", "0.0889"],
      answer: 0,
      solution: `<p>A = 45 × 80 = 3 600 and T = 15 × 50 = 750.</p><p>ER<sub>max</sub> = [(750 + 210)/3 600] × (45/15) = 0.266667 × 3 = <b>0.8000</b>.</p><p>Second form: (50 + 210/15)/80 = (50 + 14)/80 = 64/80 = 0.8000.</p>`,
      check: `<p>At ER = 0.8000, x = 0.80 × 15 = 12 million and P<sub>new</sub> = (3 600 + 750 + 210)/(45 + 12) = 4 560/57 = 80.00 = P<sub>A</sub>, so NPV<sub>A</sub> = 45 × (80 − 80) = 0 ✓.</p>`,
      traps: [
        null,
        "Left out the synergies: (750/3 600) × 3 = 0.6250. That only pays Sandvik's market price, 50/80.",
        "Gave the target's floor instead: ER<sub>min</sub> = [750/(3 600 + 210)] × 3 = 0.5906.",
        "Turned the share-count ratio upside down: 0.266667 × (15/45) = 0.0889.",
      ],
    },
    {
      id: "ma-7",
      title: "Offered premium versus actual premium",
      theory: `<p>The offered premium values the ER acquirer shares at the acquirer's old price P<sub>A</sub>. But the target's shareholders receive shares in the merged firm, worth P<sub>new</sub>, so the premium they actually get uses P<sub>new</sub>. The actual premium exceeds the offered one exactly when P<sub>new</sub> &gt; P<sub>A</sub>, that is when NPV<sub>A</sub> &gt; 0. An acquirer that overpays debases the currency it pays with. In a cash deal the two premiums coincide.</p>
<div class="formula"><div class="eq">offered premium = ER × P<sub>A</sub>/P<sub>T</sub> − 1 &nbsp;&nbsp; actual premium = ER × P<sub>new</sub>/P<sub>T</sub> − 1</div>
<div class="where">P<sub>A</sub> and P<sub>T</sub> are pre-announcement prices. NPV<sub>T</sub> = T × actual premium. Not on the formula sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>ER = 0.5, P<sub>A</sub> = 50, P<sub>T</sub> = 20 and P<sub>new</sub> = 52.</p><p>Offered = 0.5 × 50/20 − 1 = 25%. Actual = 0.5 × 52/20 − 1 = 30%. The deal lifted the acquirer's price, so the target receives more than it was offered.</p></div>`,
      q: `<p>Tindvik ASA has 50 million shares at 110 NOK. It offers ER = 0.48 for each of the 20 million shares of Fossum AS, which trade at 40 NOK. The synergies are worth 60 million NOK and both prices are pre-announcement. What premium do Fossum's shareholders actually receive?</p>`,
      options: ["32.0000%", "28.0537%", "26.8456%", "52.6400%"],
      answer: 1,
      solution: `<p>A = 50 × 110 = 5 500, T = 20 × 40 = 800 and x = 0.48 × 20 = 9.60 million.</p><p>P<sub>new</sub> = (5 500 + 800 + 60)/(50 + 9.60) = 6 360/59.60 = 106.7114 NOK.</p><p>Each Fossum share receives 0.48 × 106.7114 = 51.2215 NOK, so the actual premium = 51.2215/40 − 1 = <b>28.0537%</b>. The offered premium was 0.48 × 110/40 − 1 = 32.0000%.</p>`,
      check: `<p>NPV<sub>T</sub> = T × actual premium = 800 × 0.280537 = 224.43. Directly, y = 9.60/59.60 = 0.161074 and NPV<sub>T</sub> = 0.161074 × 6 360 − 800 = 1 024.43 − 800 = 224.43 ✓. The actual premium is below the offered one because Tindvik overpays: NPV<sub>A</sub> = 60 − 224.43 = −164.43 = 50 × (106.7114 − 110) ✓.</p>`,
      traps: [
        "Gave the offered premium, which values the shares at the old price: 0.48 × 110/40 − 1 = 32.0000%.",
        null,
        "Left the synergies out of the merged price: 6 300/59.60 = 105.7047, so 0.48 × 105.7047/40 − 1 = 26.8456%.",
        "Forgot the new shares in the merged price: 6 360/50 = 127.2000, so 0.48 × 127.2000/40 − 1 = 52.6400%.",
      ],
    },
    {
      id: "ma-17",
      title: "Bidding depends on alternatives",
      theory: `<p>When several firms bid for the same target, a bidder's ceiling is not its gain over its stand-alone value. If it loses, a rival gets the target. That can hurt it: the rival becomes a stronger competitor. So the most a bidder should pay is its value if it wins minus its value if the rival who would otherwise win gets the target (lecture 12, "Bidding depends on alternatives!"). A bidder threatened by a rival can rationally pay more than its own synergies.</p>
<div class="formula"><div class="eq">reservation price of i = V<sub>i</sub>(i wins) − V<sub>i</sub>(the rival j wins)</div>
<div class="where">V<sub>i</sub> is bidder i's value before paying anything. The relevant rival is the one who wins if i drops out. The bidder with the highest reservation price wins, at a price just above the second highest.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 12)</span><p>Banks A, B and C bid for bank D. A is worth 100 alone, 190 if it wins D and 90 if B or C wins. Its ceiling is 190 − 90 = 100, not its gain over stand-alone, 190 − 100 = 90. B: 170 − 70 = 100. C: 160 − 55 = 105.</p></div>`,
      q: `<p>Nordbank, Vestbank and Sørbank bid for Østbank, which is worth 50 on its own. The table gives each bidder's value before paying anything.</p>
<table class="data"><tr><th>Bidder</th><th>Alone</th><th>Nordbank wins</th><th>Vestbank wins</th><th>Sørbank wins</th></tr>
<tr><td>Nordbank</td><td class="n">120</td><td class="n">210</td><td class="n">95</td><td class="n">105</td></tr>
<tr><td>Vestbank</td><td class="n">90</td><td class="n">80</td><td class="n">185</td><td class="n">80</td></tr>
<tr><td>Sørbank</td><td class="n">75</td><td class="n">65</td><td class="n">70</td><td class="n">160</td></tr></table>
<p>Vestbank has dropped out. If Nordbank stops bidding, Sørbank wins. What is the most Nordbank should bid?</p>`,
      options: ["105", "90", "115", "50"],
      answer: 0,
      solution: `<p>If Nordbank wins it is worth 210. If it stops, Sørbank wins and Nordbank is worth 105.</p><p>Reservation price = 210 − 105 = <b>105</b>.</p>`,
      check: `<p>Sørbank's ceiling against Nordbank is 160 − 65 = 95, below Nordbank's 105, so Nordbank wins at just above 95 and keeps about 10 ✓ The 105 also exceeds Nordbank's own gain over stand-alone, 90: losing to Sørbank costs Nordbank 15, which is worth paying to avoid.</p>`,
      traps: [
        null,
        "Took the gain over the stand-alone value: 210 − 120 = 90. If Nordbank loses, it is not left at 120; Sørbank's win pushes it down to 105.",
        "Used the wrong rival: 210 − 95 = 115 is the ceiling against Vestbank, which has dropped out.",
        "Bid the target's stand-alone value of 50. What Østbank is worth alone does not set what it is worth to Nordbank.",
      ],
    },
    {
      id: "ma-10",
      title: "The long-short strategy and its two payoffs",
      theory: `<p>Between announcement and completion the target trades below what it will be worth if the deal closes, because the deal may fail. To read that risk off prices, build a position whose payoff you know in both outcomes: buy target shares and short acquirer shares in exactly the exchange ratio, then put the short-sale proceeds in the risk-free asset. If the deal completes, the target shares convert into exactly the acquirer shares you owe, so only the deposit is left. If it fails, you unwind at the prices that then hold.</p>
<div class="formula"><div class="eq">payoff if completes = short proceeds × (1 + r<sub>f</sub>)</div><div class="eq">payoff if fails = short proceeds × (1 + r<sub>f</sub>) + k × P<sub>T</sub><sup>pre</sup> − m × P<sub>A</sub><sup>pre</sup></div>
<div class="where">For "k target shares for m acquirer shares", buy k target shares and short m acquirer shares at post-announcement prices. The failure branch uses the pre-announcement prices when the question says prices return to their original levels.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>4 target shares for 1 acquirer share. Before the announcement P<sub>A</sub> = 100 and P<sub>T</sub> = 20; after it P<sub>A</sub> = 96 and P<sub>T</sub> = 23. r<sub>f</sub> = 5%.</p><p>Buy 4 target shares for 92, short 1 acquirer share for 96 and deposit the 96. Cost today: 92. Completes: 96 × 1.05 = 100.80. Fails: 100.80 + 4 × 20 − 100 = 80.80.</p></div>`,
      q: `<p>Varden ASA has announced a bid for Holmen AS. If the deal goes through in exactly one year, 3 Holmen shares will be exchanged for 1 Varden share. If it fails, both prices return to their pre-announcement levels. Before the announcement Varden traded at 102 and Holmen at 28; now Varden trades at 99 and Holmen at 31.50. The one-year risk-free rate is 4%. You buy 3 Holmen shares, short 1 Varden share and invest the short proceeds at the risk-free rate. What is your payoff in one year if the deal fails?</p>`,
      options: ["98.46", "81.00", "102.96", "84.96"],
      answer: 3,
      solution: `<p>The 99 from the short sale grows to 99 × 1.04 = 102.96.</p><p>If the deal fails, sell the 3 Holmen shares at 28 for 84 and buy back 1 Varden share at 102.</p><p>Payoff = 102.96 + 84 − 102 = <b>84.96</b>.</p>`,
      check: `<p>Spread view: one Varden share minus three Holmen shares is worth 102 − 84 = 18 if the deal fails and 0 if it completes, since the Holmen shares become the Varden share. You hold the deposit and are short that spread, so the payoffs are 102.96 − 0 = 102.96 and 102.96 − 18 = 84.96 ✓.</p>`,
      traps: [
        "Used the post-announcement prices in the failure branch: 102.96 + 3 × 31.50 − 99 = 98.46. The question says prices return to their original levels.",
        "Forgot the interest on the deposit: 99 + 84 − 102 = 81.00.",
        "Gave the payoff if the deal completes: 99 × 1.04 = 102.96.",
        null,
      ],
    },
    {
      id: "ma-11",
      title: "The market's implied probability that the deal closes",
      theory: `<p>The long-short position has one risk left: whether the deal closes. That risk comes from a regulator or a shareholder vote, it is diversifiable and so it carries no risk premium. The position's expected payoff must therefore equal its cost <b>grown at r<sub>f</sub></b>, the certainty equivalent. Solve for p. Because the risk is unpriced, p is the market's actual belief and not only a risk-neutral number.</p>
<div class="formula"><div class="eq">cost × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">1 − p = (1 + r<sub>f</sub>) × spread<sup>post</sup>/spread<sup>pre</sup> &nbsp;&nbsp; spread = m × P<sub>A</sub> − k × P<sub>T</sub></div>
<div class="where">The left side of the first line is the cost times (1 + r<sub>f</sub>), not the cost: the H2025 key singles out that error. The second line is a shortcut and a check: the spread closes to 0 if the deal completes and returns to its pre-announcement width if it fails.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: cost 92, payoffs 100.80 if the deal completes and 80.80 if it fails, r<sub>f</sub> = 5%.</p><p>Certainty equivalent = 92 × 1.05 = 96.60. p = (96.60 − 80.80)/(100.80 − 80.80) = 15.80/20 = 0.79.</p></div>`,
      q: `<p>Moe ASA has announced a bid for Lia AS. If the deal completes in exactly one year, 4 Lia shares will be exchanged for 1 Moe share. If it fails, both prices return to their pre-announcement levels. Before the announcement Moe traded at 120 and Lia at 26; immediately after, Moe trades at 116 and Lia at 28.40. The one-year risk-free rate is 3%. Using the long-short strategy, what probability does the market assign to the deal completing?</p>`,
      options: ["0.6325", "0.8455", "0.8500", "0.7940"],
      answer: 1,
      solution: `<p>Buy 4 Lia for 4 × 28.40 = 113.60, short 1 Moe for 116 and deposit it. Cost today: 113.60.</p><p>Completes: 116 × 1.03 = 119.48. Fails: 119.48 + 4 × 26 − 120 = 103.48.</p><p>Certainty equivalent: 113.60 × 1.03 = 117.008.</p><p>p = (117.008 − 103.48)/(119.48 − 103.48) = 13.528/16 = <b>0.8455</b>.</p>`,
      check: `<p>Spread route: before the announcement 120 − 4 × 26 = 16, now 116 − 113.60 = 2.40. 1 − p = 1.03 × 2.40/16 = 0.1545, so p = 0.8455 ✓. Lia at 28.40 also sits below the 116/4 = 29.00 it would be worth if completion were certain, as it must.</p>`,
      traps: [
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (113.60 − 103.48)/16 = 0.6325.",
        null,
        "Left out the risk-free rate altogether, both on the deposit and in the certainty equivalent: 1 − 2.40/16 = 0.8500.",
        "Bought Moe back at the post-announcement price of 116 in the failure branch: payoff 107.48, so p = (117.008 − 107.48)/12 = 0.7940.",
      ],
    },
    {
      id: "ma-16",
      title: "The deal probability when completion is not one year away",
      theory: `<p>Real deals close in weeks or months, not exactly one year. Then the deposit grows for T years instead of one. The certainty equivalent of the position is its cost grown at (1 + r<sub>f</sub>)<sup>T</sup>. Nothing else changes. Kurbatov used exactly this for Vodafone's bid for Mannesmann, three months from the offer.</p>
<div class="formula"><div class="eq">cost × (1 + r<sub>f</sub>)<sup>T</sup> = p × payoff if completes + (1 − p) × payoff if fails</div>
<div class="eq">1 − p = (1 + r<sub>f</sub>)<sup>T</sup> × spread<sup>post</sup>/spread<sup>pre</sup></div>
<div class="where">T in years: 0.25 for three months, 0.75 for nine. Both payoffs contain the deposit grown at (1 + r<sub>f</sub>)<sup>T</sup>. r<sub>f</sub> is the effective annual rate.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 12, Vodafone and Mannesmann)</span><p>53.7 Vodafone shares per Mannesmann share, three months to go, r<sub>f</sub> = 5.5%. Before the bid P<sub>M</sub> = 145.35 and P<sub>V</sub> = 4.19; on 17 December P<sub>M</sub> = 234 and P<sub>V</sub> = 4.96. 1.055<sup>0.25</sup> = 1.013475.</p><p>Buy 1 M for 234, short 53.7 V for 266.352 and deposit it. Completes: 266.352 × 1.013475 = 269.941. Fails: 269.941 + 145.35 − 53.7 × 4.19 = 269.941 + 145.35 − 225.003 = 190.288.</p><p>234 × 1.013475 = 237.153, so p = (237.153 − 190.288)/(269.941 − 190.288) = 46.865/79.653 = 0.5884, about 59%. (Slide 21 prints 225.03, 190.261 and 0.5885: 53.7 × 4.19 is 225.003.)</p></div>`,
      q: `<p>Fosen ASA has bid for Lindås AS. The deal will complete or fail in exactly 9 months. If it completes, each Lindås share is exchanged for 2.5 Fosen shares. If it fails, both prices return to their pre-announcement levels. Before the announcement Fosen traded at 40 and Lindås at 80; now Fosen trades at 38 and Lindås at 88. The risk-free rate is 4% a year. Using the long-short strategy, what probability does the market assign to the deal completing?</p>`,
      options: ["0.6360", "0.5082", "0.6500", "0.6396"],
      answer: 3,
      solution: `<p>Buy 1 Lindås for 88, short 2.5 Fosen for 95 and deposit the 95. Growth factor: 1.04<sup>0.75</sup> = 1.029852.</p><p>Completes: 95 × 1.029852 = 97.8360. Fails: 97.8360 + 80 − 2.5 × 40 = 77.8360.</p><p>Certainty equivalent: 88 × 1.029852 = 90.6270.</p><p>p = (90.6270 − 77.8360)/(97.8360 − 77.8360) = 12.7910/20 = <b>0.6396</b>.</p>`,
      check: `<p>Spread route: 2.5 × 40 − 80 = 20 before and 2.5 × 38 − 88 = 7 after. 1 − p = 1.029852 × 7/20 = 0.3604, so p = 0.6396 ✓ Lindås at 88 also sits below the 2.5 × 38 = 95 it would fetch if completion were certain.</p>`,
      traps: [
        "Grew the position for a full year: 1 − 1.04 × 7/20 = 0.6360. The deal closes in 9 months.",
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (88 − 77.8360)/20 = 0.5082.",
        "Left out the risk-free rate altogether: 1 − 7/20 = 0.6500.",
        null,
      ],
    },
    {
      id: "ma-12",
      title: "Exam level: the motive and the vote from the price reaction",
      theory: `<p>The announcement reaction tells you what the market believes about the deal. Whatever the payment method, the two sets of shareholders together own the whole merged firm, so the change in the two firms' combined market value is the market's estimate of the synergies. If the acquirer falls and the target jumps, the market thinks the acquirer pays more than the target is worth to it, so NPV<sub>A</sub> &lt; 0. Motives that predict that pattern are agency motives: empire building (managers gain from running a bigger firm) and hubris or the winner's curse. Motives that create value, such as undervaluation, a disciplinary takeover or extra debt capacity, should raise the two firms' combined value; they fit a falling acquirer only if it pays away more than the gain.</p>
<div class="formula"><div class="eq">S<sub>implied</sub> = N<sub>A</sub>ΔP<sub>A</sub> + N<sub>T</sub>ΔP<sub>T</sub></div><div class="eq">acquirer ↓, target ↑ ⟹ NPV<sub>A</sub> &lt; 0: empire building, hubris, winner's curse</div>
<div class="where">ΔP is the change in each share price on the announcement; keep the sign. An acquirer shareholder votes by his own NPV. If enough holders vote against, the deal fails and prices move back towards their pre-announcement levels. They may not go all the way: the bid may have revealed something about the target, or management may try again.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An acquirer with 20 million shares falls from 80 to 76; a target with 10 million shares rises from 30 to 37. Combined value: 1 600 + 300 = 1 900 before and 1 520 + 370 = 1 890 after.</p><p>The acquirer loses 20 × 4 = 80 million and the target gains 10 × 7 = 70 million, so S<sub>implied</sub> = −80 + 70 = −10 million: 1 890 − 1 900. That fits empire building, not undervaluation.</p></div>`,
      q: `<p>Storhaug ASA is a mature firm with large cash holdings, few investment opportunities and a CEO whose bonus grows with the size of the firm. It announces an offer for Lindvik AS, a firm in an unrelated industry. Storhaug's 30 million shares fall from 140 to 131 NOK and Lindvik's 12 million shares rise from 50 to 63 NOK. Synergies are not an accepted answer. Which answer gives a motive that fits the evidence, the right vote for a Storhaug shareholder and the right prediction for the prices if most holders vote the same way?</p>`,
      options: [
        "Undervaluation: Storhaug has spotted that Lindvik is cheap and buys it below its true value. Vote in favour, since Storhaug's price recovers once the deal closes.",
        "Diversification: an unrelated business makes Storhaug's cash flows safer, which is worth a premium to its shareholders. Vote in favour and expect Storhaug's price to rise when the deal is approved.",
        "Empire building: the CEO buys size at a price above what Lindvik is worth to Storhaug. Vote against; if the deal is blocked, prices move back towards 140 and 50.",
        "Hubris: Storhaug's CEO is sure he can run Lindvik better than the market thinks and pays too much. Vote against, although a blocked deal leaves the prices at 131 and 63, since the news is already priced in.",
      ],
      answer: 2,
      solution: `<p>Read the reaction first: Storhaug fell 9 NOK and Lindvik rose 13 NOK, so the market thinks Storhaug overpays. The case lists the agency ingredients: spare cash, no good projects and a CEO paid for size. That is <b>empire building</b>. Hubris would fit the prices too, so the motive alone does not settle the question; the price prediction does.</p><p>A Storhaug shareholder loses from the deal and votes against. If most holders do the same, the deal dies, the reason for the repricing disappears and the prices move back towards 140 and 50.</p>`,
      check: `<p>Run the implied-synergy calculation: before 30 × 140 + 12 × 50 = 4 200 + 600 = 4 800 million, after 30 × 131 + 12 × 63 = 3 930 + 756 = 4 686 million. The market expects the deal to destroy 114 million while moving value to Lindvik: Storhaug loses 270 and Lindvik gains 156. Only a value-destroying motive, empire building or hubris, fits those numbers.</p>`,
      traps: [
        "Undervaluation would lift the acquirer's price. Storhaug fell, so the market thinks it overpays.",
        "Diversification that shareholders can do themselves is worth no premium; safer cash flows mainly help creditors. The price fall shows the market sees no gain.",
        null,
        "Hubris fits the price reaction and voting against is right, but the price prediction is wrong: if the deal dies, the reason for the repricing disappears and prices revert towards 140 and 50.",
      ],
    },
    {
      id: "ma-13",
      title: "Exam level: four reasons for a deal, none of them synergies",
      theory: `<p>H2024 Exercise 1 asked for four reasons in a grid: one good and one bad for the acquirer, one good and one bad for the target, one to two sentences each, with synergies banned. Kurbatov's key accepts any reasonable reason with a short explanation. Its own list even includes economies of scale (good for the target) and supply-chain gains (good for the acquirer). Two things still fail. One is the banned reason itself in other words: "the two firms are worth more together than apart" is the definition of a synergy. The other is a reason in the wrong box, a mechanism that moves value the opposite way from what its box claims. Test every reason with one question: whose wealth does the mechanism move and in which direction?</p>
<table class="data"><tr><th>Box</th><th>Reasons that work</th></tr>
<tr><td>Good for the acquirer</td><td>Market power or removing a competitor, supply-chain gains, a disciplinary takeover, undervaluation (better information), extra debt capacity</td></tr>
<tr><td>Bad for the acquirer</td><td>Empire building, hubris and the winner's curse, coinsurance handing value to creditors</td></tr>
<tr><td>Good for the target</td><td>The control premium, pushed up by the free-rider problem (no small holder sells below what his share will be worth after the takeover); better management and practices, economies of scale, access to larger markets, relief of a financing constraint</td></tr>
<tr><td>Bad for the target</td><td>Entrenched managers accepting a low offer for private benefits, payment in overvalued acquirer shares, damage to the corporate culture, long-term plans cut short for quick returns</td></tr></table>
<p>The safest answer still names a mechanism that is plainly something other than a combined gain, so a marker cannot read it as a synergy. Leave out the target's tax losses: Kurbatov says they are erased when the ownership changes, so you cannot buy a firm to use its losses (lecture 13).</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Take the reason "diversification lowers the merged firm's risk" and ask whose wealth moves. Two firms with risky debt merge, default becomes less likely and the creditors gain. Total value is unchanged, so the shareholders lose exactly what the creditors gain (consistency check 4). The reason belongs under bad for the acquirer, never under good.</p></div>`,
      q: `<p>An exam question asks for four reasons, none of them synergies: one good and one bad for the acquirer, one good and one bad for the target. Which answer earns all four boxes?</p>`,
      options: [
        "Good for acquirer: the two firms are worth more together than apart, so the acquirer keeps part of that gain.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: the merged cash flows are less volatile, so its equity becomes safer and worth more.<br>Bad for acquirer: empire building, the CEO overpays to run a bigger firm.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: a disciplinary takeover, new managers run the target's assets better.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: entrenched managers accept a low offer in return for a golden parachute.",
        "Good for acquirer: it buys a target it knows is undervalued, using better information.<br>Bad for acquirer: hubris, an overconfident CEO trusts his own high valuation.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: empire building, the acquirer's CEO overpays to run a bigger firm.",
      ],
      answer: 2,
      solution: `<p>Every box in the winning answer names a mechanism that moves value the way the box says. A <b>disciplinary takeover</b> creates value for the acquirer by running badly run assets better. The <b>winner's curse</b> makes the acquirer overpay. The <b>control premium</b>, forced up by the free-rider problem, is a gain to the target's shareholders. <b>Entrenched managers</b> who take a golden parachute in exchange for a low offer leave the target's shareholders with less.</p><p>Each of the other answers fails one box: "worth more together than apart" is the definition of a synergy, the reason the question bans; less volatile cash flows is coinsurance; an acquirer that overpays is good news for the target.</p>`,
      check: `<p>Run the two tests on all sixteen lines. Is it the banned reason in other words? Only "worth more together than apart" is. A named source such as economies of scale or supply-chain gains would have passed, because the key accepts it. Does the mechanism move value in the direction its box claims? Coinsurance moves value from shareholders to creditors, so it cannot be good for the acquirer; overpayment moves value to the target, so it cannot be bad for the target. The winning answer is the only one with no line failing either test ✓.</p>`,
      traps: [
        "Worth more together than apart is the definition of a synergy, the one reason the question bans, so that box scores nothing.",
        "Less volatile cash flows is coinsurance: it moves value from shareholders to creditors, so it is bad, not good, for the acquirer.",
        null,
        "An acquirer that overpays hands value to the target's shareholders, so empire building is good, not bad, for the target.",
      ],
    },
    {
      id: "ma-19",
      title: "What if the deal can be delayed a year?",
      theory: `<p>Kurbatov gave this twist in the wrap-up as an intuition question: "What if we can delay this M&amp;A by one year?" Treat the deal as a real option. Delaying is an option to wait: you learn more about the synergies, the target or the regulator. Then you buy only if the news is good. That is worth more the larger the uncertainty and the more of it a year resolves. Waiting has two costs. One is a year of synergy cash flows forgone, which works like a dividend you miss. The other is the risk that a rival buys the target meanwhile, which can leave you worse off than before (bidding depends on alternatives).</p>
<div class="formula"><div class="eq">delay if [a × E[max(0, NPV<sub>1</sub>)] + (1 − a) × L]/(1 + r) &gt; max(0, NPV<sub>now</sub>)</div>
<div class="where">NPV<sub>1</sub> is the deal's NPV when you decide in a year, after the news. a is the probability that the target is still available. L ≤ 0 is the change in your own value if a rival buys it instead; L = 0 if the rival's win leaves you as you are. A positive NPV today does not settle the question. Neither does the option value alone.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Synergies of 100 or 20 with equal probability, a cash premium of 50, r = 10%. Now: 0.5 × 100 + 0.5 × 20 − 50 = 10.</p><p>Wait and buy only if the synergies are 100: 0.5 × (100 − 50)/1.10 = 22.73 &gt; 10, so wait. If a rival takes the target during the year with probability 0.6: 0.4 × 22.73 = 9.09 &lt; 10, so buy now. If the rival's win would also cost you 5 (L = −5): (0.4 × 25 − 0.6 × 5)/1.10 = 6.36.</p></div>`,
      q: `<p>Bjørkvik ASA plans to buy Holt AS for cash. The deal has a positive NPV today, but the synergies are very uncertain. A regulator's review will settle most of that uncertainty within a year. No other bidder is in sight. The board asks what happens if the acquisition is delayed by one year. Which answer is best?</p>`,
      options: [
        "Close now: the deal already has a positive NPV, so a year's delay mainly postpones the same synergies and shrinks their present value.",
        "Delay: like a financial option, the right to wait gains value with time to expiry, so the longer the board waits the more the deal is worth.",
        "It is an option to wait: buy only if the review shows large synergies. Uncertainty and no rival favour waiting; lost synergies are the cost.",
        "Delay matters little for the acquirer: the target's holders receive the same premium a year later, so the deal's NPV stays roughly where it is today.",
      ],
      answer: 2,
      solution: `<p>Waiting turns the deal into a call: Bjørkvik buys after the review only if the synergies turn out large and walks away otherwise. High uncertainty that resolves within the year makes that option valuable. With no rival the target is likely still there. Against it stands a year of synergy cash flows. So delay can beat closing now even though today's NPV is positive; the answer is <b>the option to wait</b>, weighed against its two costs.</p>`,
      check: `<p>Test the claim against the example: with no rival, waiting gave 22.73 against 10 for closing now; with a 60% chance of losing the target to a rival, 9.09 against 10. The same deal flips both ways, so an answer that always closes now or always waits cannot be right. The answer that names both the option and its cost is the one that survives ✓</p>`,
      traps: [
        "Leaves out the option to wait: a positive NPV today is not enough when waiting lets Bjørkvik walk away from the bad outcome.",
        "Leaves out the costs of waiting. Unlike a call on a share without dividends, a real option loses the synergies of the year you wait. Waiting longer does not add value by itself.",
        null,
        "Leaves out both the information and the time value: paid a year later the premium is cheaper in present value, the synergies start a year later and the decision can use the review.",
      ],
    },
    {
      id: "ma-14",
      title: "Exam level: the implied deal probability with a 3-for-2 ratio",
      theory: `<p>H2025 Exercise 6 gave 12 of its 20 points to the implied probability. A ratio that is not "k for 1" changes the position, not the method: "3 shares of B for 2 shares of A" means buy 3 B and short 2 A, so that the long leg converts exactly into the short leg. Then run the routine: cost today at post-announcement prices, short proceeds into the deposit, two payoffs, certainty equivalent, solve for p. Report four decimals and check with the spread.</p>
<div class="formula"><div class="eq">k shares of B for m shares of A: long k B, short m A, deposit m × P<sub>A,1</sub></div><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div>
<div class="where">The exam writes P<sub>A,0</sub> for the pre-announcement price and P<sub>A,1</sub> for the price immediately after. The failure branch uses the 0 prices for both legs.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>3 B for 2 A. Before: P<sub>A,0</sub> = 60, P<sub>B,0</sub> = 36. After: P<sub>A,1</sub> = 58, P<sub>B,1</sub> = 37.60. r<sub>f</sub> = 5%.</p><p>Buy 3 B for 112.80, short 2 A for 116 and deposit it. Completes: 116 × 1.05 = 121.80. Fails: 121.80 + 3 × 36 − 2 × 60 = 109.80. Certainty equivalent: 112.80 × 1.05 = 118.44. p = (118.44 − 109.80)/(121.80 − 109.80) = 8.64/12 = 0.72.</p><p>Spread check: 2 × 60 − 3 × 36 = 12 before and 2 × 58 − 3 × 37.60 = 3.20 after, so 1 − p = 1.05 × 3.20/12 = 0.28 ✓.</p></div>`,
      q: `<p>Company A announced that it intends to acquire company B. The news came suddenly and there was no anticipation effect. The deal will be completed or will fail in exactly one year. If it goes through, 3 shares of B will be exchanged for 2 shares of A. If it fails, prices return to their original levels. Before the announcement P<sub>A,0</sub> = 72 and P<sub>B,0</sub> = 40. Immediately after it P<sub>A,1</sub> = 69 and P<sub>B,1</sub> = 44.50. The one-year risk-free rate is 3%. Using the long-short strategy, with the short-sale proceeds invested at the risk-free rate, what probability does the market assign to the deal being completed? Give four decimals.</p>`,
      options: ["0.6400", "0.8069", "0.7425", "0.8125"],
      answer: 1,
      solution: `<table class="data"><tr><th>Leg</th><th>Today</th><th>Deal completes</th><th>Deal fails</th></tr>
<tr><td>Long 3 B</td><td class="n">−133.50</td><td>converts into 2 A</td><td class="n">+120.00</td></tr>
<tr><td>Short 2 A</td><td class="n">+138.00</td><td>closed with the 2 A received</td><td class="n">−144.00</td></tr>
<tr><td>Deposit at 3%</td><td class="n">−138.00</td><td class="n">+142.14</td><td class="n">+142.14</td></tr>
<tr><td>Total</td><td class="n">−133.50</td><td class="n">142.14</td><td class="n">118.14</td></tr></table>
<p>Certainty equivalent: 133.50 × 1.03 = 137.505.</p><p>137.505 = p × 142.14 + (1 − p) × 118.14 ⟹ 137.505 − 118.14 = p × (142.14 − 118.14) ⟹ 19.365 = 24.00p ⟹ p = <b>0.8069</b>.</p>`,
      check: `<p>Spread route: 2 × 72 − 3 × 40 = 24 before and 2 × 69 − 3 × 44.50 = 4.50 after. 1 − p = 1.03 × 4.50/24 = 0.193125, so p = 0.806875 = 0.8069 ✓.</p><p>Pricing A under the same p gives its price if the deal completes: (1.03 × 69 − 0.193125 × 72)/0.806875 = 70.8474, below 72. B is then worth (2/3) × 70.8474 = 47.2316 on completion. Discounted: (0.806875 × 47.2316 + 0.193125 × 40)/1.03 = 44.50, B's observed price ✓. The market expects the deal to cost A's shareholders and enrich B's.</p>`,
      traps: [
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (133.50 − 118.14)/24 = 0.6400.",
        null,
        "Closed the short at the post-announcement price of 69 in the failure branch: payoff 124.14, so p = (137.505 − 124.14)/18 = 0.7425.",
        "Left out the risk-free rate altogether: 1 − 4.50/24 = 0.8125.",
      ],
    },
    {
      id: "ma-18",
      title: "Exam level: Mannesmann-style, from the deal probability to the synergies the market prices in",
      theory: `<p>Kurbatov called Vodafone's bid for Mannesmann one of the biggest exercises to focus on. It chains four things. First the arbitrage position: long the target, short the acquirer in the exchange ratio, deposit the proceeds. Second the deal probability p, with the deposit grown at (1 + r<sub>f</sub>)<sup>T</sup>. Third risk-neutral valuation of the acquirer's own share: today's price is the discounted p-weighted average of its price if the deal completes and its old price if it fails, which you solve for the price if it completes. Fourth the synergies: the merged firm at that price against the two stand-alone values the market falls back to if the deal fails. The deal risk is diversifiable, so p is both the risk-neutral and the real probability. Slide 21 stops at p: the third and fourth links are an extension of this ladder, built with the same risk-neutral logic, to put a number on the synergies the market prices in, which Kurbatov named in the wrap-up.</p>
<div class="formula"><div class="eq">P<sub>A,1</sub>(1 + r<sub>f</sub>)<sup>T</sup> = p × P<sub>A</sub><sup>complete</sup> + (1 − p) × P<sub>A,0</sub></div>
<div class="eq">S<sub>implied</sub> = (N<sub>A</sub> + x) × P<sub>A</sub><sup>complete</sup> − (N<sub>A</sub>P<sub>A,0</sub> + N<sub>T</sub>P<sub>T,0</sub>)</div>
<div class="where">x = ER × N<sub>T</sub> new shares. Both terms of S<sub>implied</sub> are values at the completion date: the merged firm if the deal goes through, the two stand-alone firms at their old prices if it fails. Today's combined price change understates S, because today's prices weight the deal by p and discount it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 12, Vodafone and Mannesmann)</span><p>p = 0.5884 from the previous step (slide 21 prints 0.5885, from its 225.03 for 53.7 × 4.19 = 225.003). Vodafone if the deal completes: (1.013475 × 4.96 − 0.4116 × 4.19)/0.5884 = (5.0268 − 1.7247)/0.5884 = 5.6123 euro.</p><p>Shares after the deal: 31.105 + 27.811 = 58.916 billion, worth 58.916 × 5.6123 = 330.65 billion. Stand-alone: 31.105 × 4.19 + 0.5179 × 145.35 = 130.33 + 75.28 = 205.61 billion. Implied synergies ≈ 125 billion euro.</p></div>`,
      q: `<p>Fjellkraft ASA (400 million shares) has bid for Elvekraft ASA (50 million shares): 6 Fjellkraft shares for each Elvekraft share. The deal will complete or fail in exactly 6 months; if it fails, both prices return to their pre-announcement levels. Before the announcement Fjellkraft traded at 20 and Elvekraft at 96. Now Fjellkraft trades at 19 and Elvekraft at 108. The risk-free rate is 5% a year. What synergies, in million NOK and valued at the completion date, does the market price in?</p>`,
      options: ["200.00", "700.48", "1 152.54", "500.00"],
      answer: 1,
      solution: `<p><b>1. Position.</b> Buy 1 Elvekraft for 108, short 6 Fjellkraft for 114 and deposit the 114. 1.05<sup>0.5</sup> = 1.024695. Completes: 114 × 1.024695 = 116.8152. Fails: 116.8152 + 96 − 6 × 20 = 92.8152.</p><p><b>2. p.</b> 108 × 1.024695 = 110.6671, so p = (110.6671 − 92.8152)/24 = 17.8519/24 = 0.7438.</p><p><b>3. Fjellkraft if the deal completes.</b> 1.024695 × 19 = 19.4692 = 0.7438 × P<sub>A</sub><sup>complete</sup> + 0.2562 × 20, so P<sub>A</sub><sup>complete</sup> = (19.4692 − 5.1235)/0.743826 = 19.2864.</p><p><b>4. Synergies.</b> x = 6 × 50 = 300 million new shares. Merged firm: 700 × 19.2864 = 13 500.48. Stand-alone: 400 × 20 + 50 × 96 = 12 800. S = <b>700.48</b> million.</p>`,
      check: `<p>Reprice Elvekraft: if the deal completes it is worth 6 × 19.2864 = 115.7184. Then [0.7438 × 115.7184 + 0.2562 × 96]/1.024695 = (86.0744 + 24.5927)/1.024695 = 108.00, its observed price ✓ That only confirms the arithmetic: p and the completion price were solved from these same prices. Split the synergies: Fjellkraft's holders get 400 × (19.2864 − 20) = −285.44 and Elvekraft's 50 × (115.7184 − 96) = 985.92. They sum to 700.48 ✓, again an identity that catches slips in the split only. The market expects real synergies but thinks Fjellkraft overpays.</p>`,
      traps: [
        "Took the change in combined market value: 400 × (19 − 20) + 50 × (108 − 96) = −400 + 600 = 200.00. Today's prices weight the deal by p and discount it.",
        null,
        "Grew everything at a full year's 5% instead of 1.05<sup>0.5</sup>: p = 0.7375, Fjellkraft at completion 19.9322 and S = 700 × 19.9322 − 12 800 = 1 152.54.",
        "Used today's price of 19 as Fjellkraft's price if the deal completes: 700 × 19 − 12 800 = 500.00. Today's price still mixes in the chance that the deal fails.",
      ],
    },
  ],
});

/* sjanger 6 · agent · Risk shifting and debt overhang */
window.EDU_DATA.sjangre.push({
  id: "agent",
  num: 6,
  title: "Risk shifting and debt overhang",
  summary: "From the state-by-state split of cash flow to risk shifting, hedging, debt overhang and renegotiation",
  chapters: [9, 10],
  exam: "Risk shifting 5 of 11 papers, debt overhang 5 of 11 · H2024 E4, V2024 P1, 2021 P2",
  intro: `<p>Risky debt gives shareholders two bad incentives. Each has appeared on 5 of 11 papers. In <b>risk shifting</b> they choose a riskier project with a lower value because the creditors bear its downside: H2024 Exercise 4 (18 points) and V2024 Problem 1 (52 points). In <b>debt overhang</b> they refuse a good project because the creditors collect part of its value: 2017V Problem 3, 2017H Problems 1 and 4 plus 2021 Problem 2, which put both problems in one firm and ended with a renegotiation of the face value. The ladder starts with who gets paid in each state. At the top you can find the project management picks, the agency cost, the indifference face value, the fate of a hedge or a debt buyback and the write-down that leaves both sides better off. Three steps follow Kurbatov's 2026 lectures: gambling for resurrection, a spin-off that leaves the debt behind and overhang when new shareholders fund the project. In each, ask his question: who wins and who loses?</p>`,
  steps: [
    {
      id: "agent-2",
      title: "Who gets paid in each state and what each claim is worth today",
      theory: `<p>A firm with debt has two claims on the same cash flow. At maturity the creditors are paid first, up to the face value K of the debt. The shareholders get what is left, but never less than zero: limited liability lets them walk away from a firm that owes more than it has. In a state where CF &lt; K the firm defaults and the creditors take all of CF. Today each claim is worth its expected payoff discounted at the risk-free rate. That works because the course gives you risk-neutral probabilities or risk-neutral investors, so no risk premium is needed. The order matters: apply min and max in each state first, then take the expectation. Subtracting K from the expected cash flow skips the floor and gets equity wrong whenever some state defaults.</p>
<div class="formula"><div class="eq">D<sub>1</sub> = min(CF, K) &nbsp;&nbsp; E<sub>1</sub> = max(CF − K, 0)</div><div class="eq">E = E[max(CF − K, 0)]/(1 + r<sub>f</sub>) &nbsp;&nbsp; D = E[min(CF, K)]/(1 + r<sub>f</sub>)</div>
<div class="where">CF is the firm's cash flow in one state at maturity and K the face value. D<sub>1</sub> + E<sub>1</sub> = CF in every state. E[·] is the probability-weighted average over the states. V = E + D = E[CF]/(1 + r<sub>f</sub>). Not on the formula sheet. When the exam sets the discount rate to zero, every value is simply an expected payoff.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 100. Cash flow 140 or 70 with probability 0.5 each, investors risk neutral, r<sub>f</sub> = 5%.</p><p>Good state: debt min(140, 100) = 100 and equity max(140 − 100, 0) = 40. Bad state: debt 70 and equity 0; the 30 shortfall is the creditors' loss.</p><p>Equity: 0.5 × 40 + 0.5 × 0 = 20, so E = 20/1.05 = 19.05. Debt: 0.5 × 100 + 0.5 × 70 = 85, so D = 85/1.05 = 80.95. Firm: 105/1.05 = 100.00 = 19.05 + 80.95.</p></div>`,
      q: `<p>Brekke AS has zero-coupon debt with face value 120, due in one year. Its cash flow in one year will be 240 with probability 0.4 and 100 with probability 0.6. Investors are risk neutral and r<sub>f</sub> = 4%. What is the equity worth today?</p>`,
      options: ["34.62", "30.00", "48.00", "46.15"],
      answer: 3,
      solution: `<p>State by state: equity gets max(240 − 120, 0) = 120 in the good state and max(100 − 120, 0) = 0 in the bad state.</p><p>Expected payoff: 0.4 × 120 + 0.6 × 0 = 48.</p><p>E = 48/1.04 = <b>46.15</b>.</p>`,
      check: `<p>Value the debt on its own: 0.4 × 120 + 0.6 × 100 = 108, so D = 108/1.04 = 103.85. The firm: 0.4 × 240 + 0.6 × 100 = 156, so V = 156/1.04 = 150.00. Then 46.15 + 103.85 = 150.00 ✓. This check fails on the no-floor answer: 34.62 + 103.85 = 138.47, not 150.</p>`,
      traps: [
        "Took the expectation first and subtracted K afterwards: (156 − 120)/1.04 = 34.62. That lets the bad state's −20 drag equity down.",
        "Subtracted the face value from today's firm value, 150 − 120 = 30.00, as if the debt were risk-free and due today.",
        "Forgot to discount: the expected payoff 0.4 × 120 = 48.00 arrives in one year.",
        null,
      ],
    },
    {
      id: "agent-3",
      title: "Which project? Firm value without debt, equity value with debt",
      theory: `<p>Management acts for the shareholders, so it picks the project that maximises the value of equity. With no debt, equity is the whole firm and management picks the highest expected value: the <b>first best</b>. With risky debt, equity is worth E[max(CF − K, 0)] and the two rankings can differ. Equity keeps all the upside above K but loses nothing below it, so a riskier project can be worth more to the shareholders even with a lower expected value. This is <b>risk shifting</b>, also called asset substitution.</p>
<div class="formula"><div class="eq">no debt: maximise V = E[CF] &nbsp;&nbsp; with debt: maximise E = E[max(CF − K, 0)]</div>
<div class="where">The discount rate is zero here, so values are expected payoffs. Equity's payoff is a call option on the firm's cash flow with strike K: flat below K, one for one above it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Project S pays 100 for sure. Project R pays 160 or 20 with probability 0.5 each.</p><p>No debt: V<sub>S</sub> = 100 and V<sub>R</sub> = 0.5 × 160 + 0.5 × 20 = 90, so management picks S. With face value K = 80: E<sub>S</sub> = 100 − 80 = 20 and E<sub>R</sub> = 0.5 × 80 + 0.5 × 0 = 40, so management picks R, although R is worth 10 less.</p></div>`,
      q: `<p>Hovland AS can run exactly one of three projects. A pays 75 for sure. B pays 125 or 20 with probability 0.5 each. C pays 185 with probability 0.25 and 0 otherwise. The firm has debt with face value 50, due when the project pays off. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. Which project does management choose and what is the equity worth?</p>`,
      options: ["Project B, equity 37.50", "Project A, equity 25.00", "Project C, equity 33.75", "Project B, equity 72.50"],
      answer: 0,
      solution: `<p>Equity state by state with K = 50:</p><p>A: max(75 − 50, 0) = 25.00. B: 0.5 × max(125 − 50, 0) + 0.5 × max(20 − 50, 0) = 0.5 × 75 + 0 = 37.50. C: 0.25 × max(185 − 50, 0) + 0.75 × 0 = 0.25 × 135 = 33.75.</p><p>Management chooses <b>project B, equity 37.50</b>. Firm values are 75, 72.50 and 46.25, so without debt A would be chosen: B is risk shifting and destroys 2.50.</p>`,
      check: `<p>Value the debt and add: A 50 + 25 = 75, B 0.5 × 50 + 0.5 × 20 = 35 and 35 + 37.50 = 72.50, C 0.25 × 50 = 12.50 and 12.50 + 33.75 = 46.25, the three firm values ✓. Moving from A to B, the creditors lose 50 − 35 = 15 and the shareholders gain 37.50 − 25 = 12.50: −15 + 12.50 = −2.50, the value B destroys.</p>`,
      traps: [
        null,
        "Maximised firm value, the all-equity rule: A has the highest expected value, 75, but with debt it gives equity only 75 − 50 = 25.00.",
        "Assumed shareholders always want the riskiest project. C has the largest upside, but with a 25% chance it gives only 0.25 × 135 = 33.75.",
        "Picked B but reported its firm value, 0.5 × 125 + 0.5 × 20 = 72.50, not its equity value.",
      ],
    },
    {
      id: "agent-4",
      title: "The agency cost: value destroyed, not value transferred",
      theory: `<p>Risk shifting moves value between the claims and destroys some along the way. Keep three numbers apart: the creditors' loss, the shareholders' gain and the agency cost. The <b>agency cost of debt</b> is the deadweight loss, the value that disappears because the decision maximises equity instead of the firm. The creditors' loss is larger: it pays for the shareholders' gain and for the value destroyed. Consistency check 3 ties the three together.</p>
<div class="formula"><div class="eq">agency cost = V(first best) − V(chosen)</div><div class="eq">ΔD + ΔE = V(chosen) − V(first best)</div>
<div class="where">ΔD and ΔE are the changes in the values of debt and equity when the firm moves from the first-best project to the one actually chosen. ΔD is negative. Compute both firm values first, then split each into D and E.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure, R pays 160 or 20 with probability 0.5 each, K = 80 and the discount rate is zero. Management picks R.</p><p>Agency cost = V<sub>S</sub> − V<sub>R</sub> = 100 − 90 = 10. Debt falls from 80 to 0.5 × 80 + 0.5 × 20 = 50, a loss of 30. Equity rises from 20 to 40, a gain of 20. Check 3: −30 + 20 = −10 ✓.</p></div>`,
      q: `<p>Skjold AS can run its assets as project S or project R. A boom has probability 0.6 and a bust 0.4. S pays 125 in the boom and 75 in the bust. R pays 160 in the boom and 0 in the bust. The firm has debt with face value 90. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. What is the agency cost of debt?</p>`,
      options: ["30.00", "9.00", "21.00", "0.00"],
      answer: 1,
      solution: `<p>First best: V<sub>S</sub> = 0.6 × 125 + 0.4 × 75 = 75 + 30 = 105 and V<sub>R</sub> = 0.6 × 160 + 0.4 × 0 = 96. An all-equity firm picks S.</p><p>With the debt: E<sub>S</sub> = 0.6 × (125 − 90) = 21 and E<sub>R</sub> = 0.6 × (160 − 90) = 42, so management picks R.</p><p>Agency cost = 105 − 96 = <b>9.00</b>.</p>`,
      check: `<p>Debt: D<sub>S</sub> = 0.6 × 90 + 0.4 × 75 = 84 and D<sub>R</sub> = 0.6 × 90 + 0.4 × 0 = 54. Creditors' gain 54 − 84 = −30, shareholders' gain 42 − 21 = +21. Check 3: −30 + 21 = −9 = 96 − 105 ✓.</p>`,
      traps: [
        "Reported the creditors' loss, 84 − 54 = 30.00. That is the transfer to the shareholders plus the value destroyed.",
        null,
        "Reported the shareholders' gain, 42 − 21 = 21.00. That is why R is chosen, not what it costs.",
        "Treated risk shifting as a pure transfer between the claims. The creditors lose 30 but the shareholders gain only 21, so 9 disappears.",
      ],
    },
    {
      id: "agent-5",
      title: "The face value at which management is indifferent",
      theory: `<p>Risk shifting needs enough debt. While no state defaults, equity is V − K under every project and the shareholders rank projects as the firm does. As K rises, the risky project's bad state defaults first. From some face value K* on, the equity values cross. Write each project's equity as a function of K on an interval where the same states default, set the two equal and check that the solution lies inside that interval. Because of max(·, 0) the functions are piecewise linear, so an equation solved on the wrong piece gives a number that is not an answer.</p>
<div class="formula"><div class="eq">E<sub>1</sub>(K) = E<sub>2</sub>(K) on an interval where the same states default ⟹ K*</div>
<div class="where">Each project's equity falls by the probability of its solvent states for every extra krone of K. The project with the higher probability of default loses equity more slowly, so it wins above K*. State the interval and verify both equity values at K*.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure. R pays 160 or 20 with probability 0.5 each. The discount rate is zero.</p><p>For 20 &lt; K ≤ 100, R defaults in its bad state and S never does: E<sub>S</sub> = 100 − K and E<sub>R</sub> = 0.5(160 − K) = 80 − 0.5K. Setting them equal: 100 − K = 80 − 0.5K, so K* = 40. That lies inside (20, 100] and both equal 60 ✓. Below 40 management picks S, above it R.</p></div>`,
      q: `<p>Hovland AS can run exactly one of three projects. A pays 75 for sure. B pays 125 or 20 with probability 0.5 each. C pays 185 with probability 0.25 and 0 otherwise. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. At which face value of debt K is management indifferent between B and C?</p>`,
      options: ["K = 35.00", "K = 20.00", "K = 65.00", "No such K exists"],
      answer: 2,
      solution: `<p>For 20 &lt; K ≤ 125, B's bad state defaults and C's bad state pays nothing anyway:</p><p>E<sub>B</sub> = 0.5(125 − K) = 62.5 − 0.5K and E<sub>C</sub> = 0.25(185 − K) = 46.25 − 0.25K.</p><p>62.5 − 0.5K = 46.25 − 0.25K ⟹ 16.25 = 0.25K ⟹ <b>K = 65.00</b>, inside (20, 125] ✓.</p><p>There E<sub>B</sub> = E<sub>C</sub> = 30.00, while E<sub>A</sub> = 75 − 65 = 10, so B and C really are the contenders. Above 65 management switches to C and the agency cost jumps from 75 − 72.50 = 2.50 to 75 − 46.25 = 28.75.</p>`,
      check: `<p>Evaluate on both sides. At K = 50: E<sub>B</sub> = 0.5 × 75 = 37.50 &gt; E<sub>C</sub> = 0.25 × 135 = 33.75, so B. At K = 80: E<sub>B</sub> = 0.5 × 45 = 22.50 &lt; E<sub>C</sub> = 0.25 × 105 = 26.25, so C ✓. The ranking flips between 50 and 80, consistent with 65.</p>`,
      traps: [
        "Solved on the wrong interval: treating B's debt as safe gives 72.5 − K = 46.25 − 0.25K and K = 35.00. That formula holds only for K ≤ 20, so 35 is not a solution.",
        "Gave the face value at which B's debt turns risky, 20.00. Above it B gains from risk shifting, but B still beats C until 65.",
        null,
        "Forgot the floor: with E = V − K for both projects the gap 72.50 − 46.25 = 26.25 never closes. Equity is max(CF − K, 0) state by state.",
      ],
    },
    {
      id: "agent-15",
      title: "Gambling for resurrection",
      theory: `<p>When the assets are worth less than the face value, the equity is worthless if nothing changes: the creditors take everything. Then any gamble with a chance of clearing the debt is worth something to the shareholders, even one that destroys value on average. The creditors pay for it in the bad state. Kurbatov (lecture 4) calls this gambling for resurrection. The manager likes it too: without the gamble the firm is shut down for sure, with it the firm may survive.</p>
<div class="formula"><div class="eq">no gamble: D = min(A, K), E = max(A − K, 0) = 0 when A &lt; K</div><div class="eq">gamble: D = E[min(V, K)], E = E[max(V − K, 0)] &nbsp;·&nbsp; ΔD + ΔE = ΔV</div>
<div class="where">A is the sure value of the assets without the gamble, V the uncertain value with it. The last identity is consistency check 3: it ties the creditors' loss, the shareholders' gain and the value destroyed.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 4</span><p>Assets worth 900 (thousand) for sure and debt with face value 1 000, so D = 900 and E = 0. A gamble pays 1 300 or 300 with probability 0.5, an expected 800.</p><p>With it: D = 0.5 × 1 000 + 0.5 × 300 = 650 and E = 0.5 × 300 = 150. Creditors −250, shareholders +150, firm −100. Check 3: −250 + 150 = −100 ✓.</p></div>`,
      q: `<p>Fossen AS owes 750, due in one year. Its assets will be worth 600 at that date for sure. Management can switch to a strategy that leaves the firm worth 1 000 or 150, each with probability 0.5. Investors are risk neutral and the discount rate is zero. Management acts for the shareholders. By how much does the switch reduce the value of the debt?</p>`,
      options: ["125.00", "300.00", "150.00", "25.00"],
      answer: 2,
      solution: `<p>Without the switch: D = min(600, 750) = 600 and E = 0.</p><p>With it: D = 0.5 × 750 + 0.5 × 150 = 450 and E = 0.5 × (1 000 − 750) = 125. The shareholders gain 125, so management switches.</p><p>The debt loses 600 − 450 = <b>150.00</b>.</p>`,
      check: `<p>Firm value falls from 600 to 0.5 × 1 000 + 0.5 × 150 = 575. Check 3: −150 + 125 = −25 = 575 − 600 ✓. Who wins and who loses: the shareholders gain 125, the creditors lose 150 and the manager keeps the firm alive with probability 0.5 instead of losing it for sure.</p>`,
      traps: [
        "Reported the shareholders' gain, 0.5 × 250 = 125. The creditors' loss is larger, since they also bear the value destroyed.",
        "Measured the debt against its face value: 750 − 450 = 300. Without the switch the creditors would get only 600, not 750.",
        null,
        "Reported the value destroyed, 600 − 575 = 25. That is the agency cost, not the creditors' loss.",
      ],
    },
    {
      id: "agent-6",
      title: "Will shareholders accept a zero-NPV hedge?",
      theory: `<p>A hedge moves cash flow from the good state to the bad state. A fair hedge has zero NPV: what the firm pays in the good state equals, in expectation, what it receives in the bad state. Firm value is unchanged, but the split between the claims is not. If the bad state defaults, the cash received there goes to the creditors first, while the shareholders give up cash in the good state. With risky debt the shareholders therefore lose and refuse a hedge that costs the firm nothing.</p>
<div class="formula"><div class="eq">zero NPV: p<sub>good</sub> × paid = p<sub>bad</sub> × received</div><div class="eq">V unchanged ⟹ ΔE = −ΔD</div>
<div class="where">Value both claims with and without the hedge, state by state. Total value is fixed, so consistency check 4 applies: the creditors' gain equals the shareholders' loss. With risk-free debt the hedge is neutral for equity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 120 or 20 with probability 0.5 each, K = 50, discount rate zero. Without a hedge: E = 0.5 × 70 = 35 and D = 0.5 × 50 + 0.5 × 20 = 35.</p><p>A hedge pays 50 in the good state and receives 50 in the bad, so the firm has 70 for sure. Then E = 20 and D = 50. The shareholders lose 15, the creditors gain 15 and V = 70 both ways. They refuse.</p></div>`,
      q: `<p>Grønli AS has debt with face value 70, due in one year. Its cash flow will be 160 with probability 0.4 and 50 with probability 0.6. A bank offers a contract at no cost: the firm pays 36 in the good state and receives 24 in the bad state. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. Will management accept the contract and what happens to the equity value?</p>`,
      options: ["Indifferent: equity stays at 36.00", "Accept: equity rises by 2.40", "Reject: equity falls by 14.40", "Reject: equity falls by 12.00"],
      answer: 3,
      solution: `<p>Zero NPV: 0.4 × (−36) + 0.6 × 24 = −14.40 + 14.40 = 0.</p><p>Without the contract: E = 0.4 × (160 − 70) + 0.6 × 0 = 36.</p><p>With it the cash flows are 124 and 74, both above 70: E = 0.4 × 54 + 0.6 × 4 = 21.60 + 2.40 = 24.</p><p>Equity falls by 36 − 24 = 12, so management <b>rejects: equity falls by 12.00</b>.</p>`,
      check: `<p>Debt: 0.4 × 70 + 0.6 × 50 = 58 without the contract and 70 with it, since 74 now covers the face value. Creditors +12 = shareholders' loss of 12 (consistency check 4) ✓. Firm value: 0.4 × 160 + 0.6 × 50 = 94 and 0.4 × 124 + 0.6 × 74 = 49.60 + 44.40 = 94 ✓.</p>`,
      traps: [
        "Treated a zero-NPV hedge as neutral for every claim. It is neutral for the firm, not for equity once the debt is risky.",
        "Looked only at the bad state, where equity now gets 74 − 70 = 4: 0.6 × 4 = 2.40. The 36 paid in the good state costs equity 0.4 × 36 = 14.40.",
        "Kept equity at zero in the hedged bad state out of habit: 0.4 × 54 = 21.60, a fall of 14.40. The hedged bad state pays 74 − 70 = 4 to equity.",
        null,
      ],
    },
    {
      id: "agent-17",
      title: "A spin-off that leaves the debt behind",
      theory: `<p>Risk shifting does not need a new project. If the covenants allow it, the owners can split the firm and put all the debt on the riskier part. The safe part leaves debt-free, so the cash flow that used to back the creditors in bad times is gone. The shareholders can gain even when the split destroys synergies (PS1 Exercise 8; Marriott in 1993, lecture 4). Creditors who foresee this write covenants against it. Kurbatov calls covenants a necessary evil: they make the debt cheaper when it is issued, which is good for the owners.</p>
<div class="formula"><div class="eq">D after = E[min(CF<sub>unit with the debt</sub>, K)] &nbsp;·&nbsp; E after = E[max(CF<sub>unit with the debt</sub> − K, 0)] + E[CF<sub>other unit</sub>]</div>
<div class="where">Try the debt on each unit and keep the split that gives the shareholders the most. Close with check 3: creditors' gain + shareholders' gain = change in firm value, here the lost synergies.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS1 Exercise 8</span><p>Hillton: Nicole pays 150 or 50 and Paris 130 or 70, equally likely, with debt of 100 and no discounting. Together 280 or 120, so D = 100 and E = 100.</p><p>After a spin-off each unit pays 10 less in each state: Nicole 140 or 40, Paris 120 or 60. Debt on Nicole: D = 0.5 × 100 + 0.5 × 40 = 70 and E = 0.5 × 40 + 0.5 × 120 + 0.5 × 60 = 110. Shareholders +10, creditors −30, synergies −20.</p></div>`,
      q: `<p>Bakke ASA has two divisions. X pays 160 in a boom and 40 in a bust. Y pays 120 in a boom and 80 in a bust. Boom and bust are equally likely. Bakke has debt with face value 120, backed by both divisions. Investors are risk neutral and the discount rate is zero. The CEO can spin the divisions off into two firms and put all the debt on either one. Splitting loses synergies: each division then pays 10 less in each state. If the CEO picks the split that is best for the shareholders, by how much does their wealth change?</p>`,
      options: ["+25.00", "+45.00", "−20.00", "+10.00"],
      answer: 0,
      solution: `<p><b>Before.</b> The firm pays 280 or 120, so D = 120 and E = 0.5 × 160 = 80.</p><p><b>After.</b> X pays 150 or 30 and Y pays 110 or 70. Debt on X: D = 0.5 × 120 + 0.5 × 30 = 75 and E = 0.5 × 30 + 0.5 × 110 + 0.5 × 70 = 105. Debt on Y: Y defaults in both states, D = 90 and E = 0.5 × 150 + 0.5 × 30 = 90.</p><p>The CEO puts the debt on X: equity goes from 80 to 105, a change of <b>+25.00</b>.</p>`,
      check: `<p>Who wins and who loses: creditors 120 → 75, a loss of 45. Firm value 200 → 180, a loss of 20. Check 3: −45 + 25 = −20 ✓. The shareholders gain although the split destroys 20, because the creditors lose 45.</p>`,
      traps: [
        null,
        "Counted the creditors' whole loss of 45 as the shareholders' gain, as if the split were a pure transfer. Firm value falls too.",
        "Charged the lost synergies to the shareholders: 10 per division in each state, 20 in expectation. The value taken from the creditors more than covers that.",
        "Put the debt on Y, the safer division: equity 90 against 80. The creditors keep more of their value there.",
      ],
    },
    {
      id: "agent-8",
      title: "Debt overhang: the creditors' windfall and the shareholders' gain",
      theory: `<p>Now the firm can take a new project with positive NPV that the shareholders must pay for themselves. When the debt is risky, part of the project's cash flow lands in default states, where every extra krone goes to the creditors. The existing debt rises in value although the creditors put up nothing: a windfall ΔD. The shareholders pay the whole outlay I but receive only what does not leak, so their gain is the project's NPV minus ΔD. <b>Debt overhang</b> is the case ΔD &gt; NPV &gt; 0: the project creates value, but the owners who fund it lose. With risk-free debt ΔD = 0 and overhang cannot arise. The solution keys single out one error: using the stand-alone NPV as the change in equity value. The two differ by exactly the transfer to the creditors.</p>
<div class="formula"><div class="eq">ΔD = E[min(CF + X, K) − min(CF, K)]/(1 + r<sub>f</sub>)</div><div class="eq">ΔE − I = NPV − ΔD &nbsp;&nbsp; invest only if NPV &gt; ΔD</div>
<div class="where">X is the project's cash flow in each state and the face value K is unchanged. In a state that stays in default, all of X goes to the creditors; in a state already solvent, none of it does. NPV = PV(X) − I is the project's stand-alone NPV. ΔE is the rise in the market value of equity before the outlay is paid.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, r<sub>f</sub> = 5%. The project costs 15 and adds 20 in both states, so NPV = 20/1.05 − 15 = 4.0476. The bad state rises to 80, still below 120, so its 20 goes to the creditors: ΔD = 0.5 × 20/1.05 = 9.5238.</p><p>Equity rises from 0.5 × 60/1.05 to 0.5 × 80/1.05, so ΔE = 0.5 × 20/1.05 = 9.5238 and ΔE − I = 9.5238 − 15 = −5.4762. Same number the short way: 4.0476 − 9.5238 = −5.4762. The shareholders refuse.</p></div>`,
      q: `<p>Tjelta AS has debt with face value 110, due in one year. Its cash flow will be 70 or 170 with probability 0.5 each. A project costs 30 today, is paid for by the shareholders and adds 20 to the cash flow in the bad state and 50 in the good state. The face value is not changed. Investors are risk neutral and r<sub>f</sub> = 5%. What is the change in the shareholders' wealth if they take the project?</p>`,
      options: ["+3.33", "−6.19", "+23.81", "−5.00"],
      answer: 1,
      solution: `<p>NPV = (0.5 × 20 + 0.5 × 50)/1.05 − 30 = 35/1.05 − 30 = 33.33 − 30 = 3.33.</p><p>Bad state: 70 rises to 90, still below 110, so all 20 goes to the creditors. Good state: 170 rises to 220, already above 110, so all 50 goes to the shareholders.</p><p>ΔE = 0.5 × 50/1.05 = 23.81. The shareholders' change is 23.81 − 30 = <b>−6.19</b>.</p>`,
      check: `<p>The creditors' windfall is ΔD = 0.5 × 20/1.05 = 9.52. Check 3: 9.52 + (−6.19) = 3.33 = NPV ✓. Equivalently NPV − ΔD = 3.33 − 9.52 = −6.19. A positive-NPV project is refused: debt overhang.</p>`,
      traps: [
        "Used the stand-alone NPV as the change in equity value: 35/1.05 − 30 = +3.33. It ignores the 9.52 that leaks to the creditors.",
        null,
        "Forgot to subtract the outlay: equity rises by 0.5 × 50/1.05 = 23.81, but the shareholders paid 30 for it.",
        "Forgot to discount: 0.5 × 50 − 30 = −5.00.",
      ],
    },
    {
      id: "agent-16",
      title: "Overhang when new shareholders fund the project",
      theory: `<p>Often the owner has no cash and must sell a fraction x of the equity to new investors to pay for a project costing I (PS1 Exercise 6). Competitive investors pay a fair price, so x × E<sub>1</sub> = I, where E<sub>1</sub> is the equity after the project, still junior to the old debt. The owner keeps (1 − x)E<sub>1</sub> = E<sub>1</sub> − I: exactly what he would have if he paid I himself. So the overhang test is unchanged: he invests only if E<sub>1</sub> − I &gt; E<sub>0</sub>. The creditors' windfall can still block a positive-NPV project.</p>
<div class="formula"><div class="eq">x = I/E<sub>1</sub> &nbsp;·&nbsp; owner keeps (1 − x)E<sub>1</sub> = E<sub>1</sub> − I &nbsp;·&nbsp; invest if (1 − x)E<sub>1</sub> &gt; E<sub>0</sub></div>
<div class="where">E<sub>1</sub> = E[max(CF + X − K, 0)] with the old face value K. E<sub>0</sub> is the equity without the project. Price x on the equity after the project, not on the firm. A lower face value raises E<sub>1</sub>, lowers x and can turn the decision.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS1 Exercise 6</span><p>Cash flow 150 or 50, face value 100, no discounting: E<sub>0</sub> = 25 and D<sub>0</sub> = 75. A project costs 24 and adds 30 in both states, so NPV = 6. E<sub>1</sub> = 0.5 × 80 = 40, so x = 24/40 = 60% and the owner keeps 0.40 × 40 = 16 &lt; 25. He refuses.</p><p>Cut the face value to 80: E<sub>1</sub> = 0.5 × 100 = 50, x = 48% and the owner keeps 26 &gt; 25. Debt 75 → 80 (+5), owner +1: 5 + 1 = 6 = NPV ✓.</p></div>`,
      q: `<p>Krog AS will have a cash flow of 200 or 60 next year, equally likely. Its debt has face value 120, due then. Its owner has no cash. A project costs 30 today and adds 40 to the cash flow in both states. The owner can fund it only by selling new shares to competitive investors. Investors are risk neutral and the discount rate is zero. Which statement is correct?</p>`,
      options: [
        "x = 17.65%: the owner keeps 49.41 against 40.00, so he invests",
        "The project's NPV is 10.00, so he invests whatever x the investors ask",
        "x = 50.00%: the owner keeps 30.00 against 40.00, so he refuses",
        "x = 42.86%: the owner keeps 34.29 against 40.00, so he refuses",
      ],
      answer: 2,
      solution: `<p>Without the project: E<sub>0</sub> = 0.5 × (200 − 120) = 40.</p><p>With it the cash flow is 240 or 100. The bad state still defaults, so E<sub>1</sub> = 0.5 × (240 − 120) = 60.</p><p>x = 30/60 = 50.00%. The owner keeps 0.50 × 60 = 30.00 = E<sub>1</sub> − I against 40.00 without the project. <b>He refuses.</b></p>`,
      check: `<p>Who wins and who loses: the creditors' claim rises from 0.5 × 120 + 0.5 × 60 = 90 to 0.5 × 120 + 0.5 × 100 = 110, a windfall of 20. The owner goes from 40 to 30, a change of −10. The new investors break even. Check 3: 20 − 10 = 10 = NPV of 40 − 30 ✓. The windfall exceeds the NPV: debt overhang.</p>`,
      traps: [
        "Priced the new shares on the firm's value after the project, 0.5 × 240 + 0.5 × 100 = 170: x = 30/170. The new investors buy equity, which sits behind the debt.",
        "Used the stand-alone NPV. It ignores the 20 that leaks to the creditors, which the owner pays for through the shares he gives away.",
        null,
        "Priced the new shares on the old equity plus the cash, 40 + 30 = 70: x = 30/70. Part of what the cash earns goes to the creditors, so the equity after the project is worth only 60.",
      ],
    },
    {
      id: "agent-9",
      title: "Renegotiation: how far must the face value fall?",
      theory: `<p>The creditors want the project, since it lifts their claim for free, but the shareholders decide. Cutting the face value from K to K′ hands value back to equity, but only in the states where the debt is paid in full: in a default state the creditors take the whole cash flow whatever K′ is. So each krone of write-down is worth only the probability of the solvent states to the shareholders, discounted. The smallest write-down leaves them exactly as well off as without the project. The creditors still come out ahead as long as their claim is worth at least what it was without the project. The two gains always sum to the project's NPV (consistency check 3).</p>
<div class="formula"><div class="eq">E(K′) − I ≥ E<sub>0</sub> ⟹ K′ ≤ K′<sub>max</sub> &nbsp;&nbsp; write-down = K − K′<sub>max</sub></div>
<div class="where">E<sub>0</sub> is the equity value with the old face value and no project: the shareholders' fallback, not zero. E(K′) is the equity value with the project and face value K′. Solve on the interval where the same states default and check it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, r<sub>f</sub> = 5%. The project costs 15 and adds 20 in both states, so the cash flows become 80 and 200. E<sub>0</sub> = 0.5 × 60/1.05 = 28.57.</p><p>For K′ ≥ 80 the bad state still defaults, so E(K′) = 0.5(200 − K′)/1.05. The condition 0.5(200 − K′)/1.05 ≥ 15 + 30/1.05 gives 0.5(200 − K′) ≥ 15.75 + 30 = 45.75, so K′ ≤ 108.50, inside the interval. The face value must fall by 120 − 108.50 = 11.50.</p></div>`,
      q: `<p>Rørslett AS has debt with face value 110, due in one year. Its cash flow will be 50 with probability 0.4 and 170 with probability 0.6. A project costs 21 today, is paid for by the shareholders and adds 30 to the cash flow in both states. Investors are risk neutral and the discount rate is zero. At the face value of 110 the shareholders refuse the project. They fund it if that leaves them no worse off. What is the smallest cut in the face value that makes them fund the project?</p>`,
      options: ["3.00", "5.00", "12.00", "15.00"],
      answer: 1,
      solution: `<p>Fallback: E<sub>0</sub> = 0.6 × (170 − 110) = 36.</p><p>At K = 110 with the project: E = 0.6 × (200 − 110) = 54. Net of the outlay that is 54 − 21 = 33, short of 36 by 3, so they refuse.</p><p>For 80 ≤ K′ ≤ 110 the bad state (80) still defaults, so E(K′) = 0.6(200 − K′) = 120 − 0.6K′. Then 120 − 0.6K′ − 21 ≥ 36 gives 0.6K′ ≤ 63 and K′ ≤ 105, inside the interval.</p><p>The face value must fall by 110 − 105 = <b>5.00</b>.</p>`,
      check: `<p>Shortfall route: 3 is missing and each krone of write-down is worth 0.6 to the shareholders, so 3/0.6 = 5 ✓. At K′ = 105: E = 0.6 × 95 = 57 and 57 − 21 = 36 = E<sub>0</sub> ✓. The creditors still gain: 0.4 × 80 + 0.6 × 105 = 95 against 0.4 × 50 + 0.6 × 110 = 86 before, so they keep the whole NPV of 30 − 21 = 9.</p>`,
      traps: [
        "Cut the face value by the shareholders' shortfall of 3 krone for krone. A cut is worth only 0.6 per krone to them, because in the bad state the creditors take everything anyway.",
        null,
        "Cut the face value by the creditors' windfall, 98 − 86 = 12. That hands the shareholders 0.6 × 12 − 3 = 4.20 more than they need, so it is not the smallest cut.",
        "Assumed the debt becomes safe after the cut, so E = 152 − K′ and K′ ≤ 95. At 95 the bad state's 80 still defaults, so that formula does not apply.",
      ],
    },
    {
      id: "agent-11",
      title: "Covenants, seniority and who pays ex ante",
      theory: `<p>Creditors who can foresee risk shifting or overhang price it into the bond when they lend: they pay less for the same promise. The owners then raise less today, so they bear the agency cost themselves, ex ante, which is why they accept contracts that tie their own hands. <b>Covenants</b> restrict the actions that create the cost: caps on dividends and new debt, limits on asset sales, required hedging. <b>Seniority</b> attacks overhang: if a new project can be funded with debt that ranks ahead of the old claim or is secured on the new asset, the new lender takes the bad-state cash first and the old creditors get no windfall. <b>Convertible debt</b> gives the creditors a share of the upside, which takes the gain out of gambling.</p>
<div class="formula"><div class="eq">bond proceeds today = D(project the creditors expect) ⟹ owners' wealth = V(project chosen)</div>
<div class="where">The owners collect the bond proceeds plus their equity, so they end up with the firm's value under the project that will actually be chosen. A credible covenant raises that value by the agency cost it removes. Its cost is lost flexibility where the forbidden action would have been efficient.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure, R pays 160 or 20 with probability 0.5 each and the bond has face value 80. Creditors who expect R pay 0.5 × 80 + 0.5 × 20 = 50 for it. The owners end up with 50 + 40 = 90.</p><p>With a covenant that forbids R, the creditors pay 80 and the owners end up with 80 + 20 = 100. The covenant is worth 10 to the owners: exactly the agency cost.</p></div>`,
      q: `<p>Ulvik AS is about to issue debt. Once the debt is in place, its owners could switch the assets into a riskier strategy with a lower expected value. The prospective creditors know it. Which statement is correct?</p>`,
      options: [
        "Creditors who foresee the switch pay less for the bond, so the owners bear the agency cost when the debt is issued. A covenant that rules out the switch raises the owners' wealth.",
        "The creditors bear the agency cost, since their claim is the one that loses value when the firm switches after the debt is issued. The owners keep what they gain from the switch.",
        "A covenant that rules out the switch only moves value from the owners to the creditors. It can raise the price the bond fetches, but never the owners' wealth.",
        "If overhang arises later, fund the new project with debt junior to the existing bond. The old creditors then keep their priority and collect no windfall from the project.",
      ],
      answer: 0,
      solution: `<p>Rational creditors price the switch they expect, so the bond fetches only what it will be worth under the riskier strategy. The owners collect proceeds plus equity, which is the firm's value under the strategy actually chosen: they bear the whole deadweight loss <b>ex ante</b>. A covenant that credibly rules out the switch raises the bond's price by more than the owners give up in equity. The difference is the agency cost removed.</p>`,
      check: `<p>Put numbers on it with the example: the covenant lifts the bond from 50 to 80 (+30) and lowers the owners' equity from 40 to 20 (−20). Net for the owners: −20 + 30 = +10 = 100 − 90, the agency cost ✓. The creditors pay a fair price either way and gain nothing, so the whole change in firm value lands on the owners.</p>`,
      traps: [
        null,
        "Ignores pricing at issue: creditors who foresee the switch pay less for the bond, so the loss comes back to the owners.",
        "A covenant is priced: it lifts the bond's price by more than the equity the owners give up, because it removes a deadweight loss. The owners gain.",
        "Junior new debt does not help: the old creditors still take the bad-state cash first, so their windfall remains. The new debt must rank ahead of the old claim or be secured on the new asset.",
      ],
    },
    {
      id: "agent-12",
      title: "Exam level: a zero-NPV hedge when the project can change",
      theory: `<p>H2024 Exercise 4 ended with a hedge offered to a firm that already runs a risky project because of its debt. The trap is to test the hedge only on the project currently chosen. With the hedge in place the manager re-optimises: compute equity for every project with the hedge, take the best and compare it with the best equity without the hedge. Then close with check 3 on the change of regime: creditors' gain + shareholders' gain = change in firm value.</p>
<div class="formula"><div class="eq">accept ⟺ max<sub>j</sub> E(project j + hedge) ≥ max<sub>j</sub> E(project j)</div>
<div class="where">Both sides are evaluated at the same face value K. The hedge has zero NPV for each project, so firm value changes only through the project choice.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 75 for sure, R pays 120 or 20 with probability 0.5 each, K = 50 and the discount rate is zero. Without a hedge: E<sub>S</sub> = 25 and E<sub>R</sub> = 0.5 × 70 = 35, so R. A zero-NPV hedge for R pays 30 in the good state and receives 30 in the bad, giving 90 or 50: E = 0.5 × 40 + 0.5 × 0 = 20.</p><p>The best with the hedge is S with 25, against 35 without, so the hedge is rejected. Creditors would go from 0.5 × 50 + 0.5 × 20 = 35 to 50 (+15), the firm from 70 to 75 (+5): −10 + 15 = 5 ✓.</p></div>`,
      q: `<p>Sletta ASA can run exactly one of three projects. A pays 60 for sure. B pays 110 or 8 with probability 0.5 each. C pays 160 with probability 0.25 and 0 otherwise. The firm has debt with face value 30. Investors are risk neutral, the discount rate is zero and the manager acts for the shareholders. A counterparty offers a contract at no cost. Under B the firm pays 24 in B's good state and receives 24 in its bad state. Under C it pays 18 in C's good state and receives 6 in its bad state. Under A nothing changes hands. Will management accept the contract and what happens to the equity value?</p>`,
      options: ["Reject: equity would fall from 40.00 to 29.00", "Reject: equity would fall from 40.00 to 30.00", "Accept: equity would rise from 40.00 to 41.00", "Indifferent: equity stays at 40.00"],
      answer: 1,
      solution: `<p><b>Without the contract.</b> E<sub>A</sub> = 60 − 30 = 30, E<sub>B</sub> = 0.5 × (110 − 30) + 0.5 × 0 = 40, E<sub>C</sub> = 0.25 × (160 − 30) = 32.50. The manager runs B, equity 40.</p><p><b>Zero NPV.</b> Under B: 0.5 × (−24) + 0.5 × 24 = 0. Under C: 0.25 × (−18) + 0.75 × 6 = −4.50 + 4.50 = 0.</p><p><b>With the contract.</b> B pays 86 or 32: E = 0.5 × 56 + 0.5 × 2 = 29. C pays 142 or 6: E = 0.25 × 112 = 28. A still gives 30. The best is A with 30.</p><p>30 &lt; 40, so management <b>rejects: equity would fall from 40.00 to 30.00</b>.</p>`,
      check: `<p>Compare the two regimes. Without the contract (B): equity 40, debt 0.5 × 30 + 0.5 × 8 = 19, firm 59. With it (A): equity 30, debt 30, firm 60. Shareholders −10, creditors +11, firm +1: −10 + 11 = +1 ✓ (check 3). The creditors take more than the whole efficiency gain, so the shareholders refuse a contract that makes the firm better off.</p>`,
      traps: [
        "Tested the contract only on B, the project already chosen: 40 to 29. With the contract in place the manager switches to A, which gives 30.",
        null,
        "Gave the shareholders the efficiency gain: the contract moves the firm from B, worth 59, to A, worth 60. But the creditors gain 11, so equity falls by 10.",
        "Treated a zero-NPV contract as neutral for equity. It is zero NPV for the firm, but it makes the debt safer and moves value to the creditors.",
      ],
    },
    {
      id: "agent-13",
      title: "Exam level: buying back debt and who captures the gain",
      theory: `<p>V2024 Problem 1 (52 points) ended with a firm whose debt makes it run a value-destroying strategy. It can raise equity and buy back debt until the remaining debt is safe and the first-best strategy returns. The efficiency gain is real, but it does not go to the shareholders. Every bondholder knows the bonds left behind will be paid in full, so none sells below face value: the hold-out problem. The shareholders pay full face value for debt worth far less today. The creditors capture more than the whole gain. The solution keys call out the belief that shareholders gain from cutting inefficient debt.</p>
<div class="formula"><div class="eq">shareholders' change = E<sub>new</sub>(K<sub>low</sub>) − cash injected − E<sub>old</sub>(K<sub>high</sub>)</div><div class="eq">creditors' change = cash received + D<sub>new</sub>(K<sub>low</sub>) − D<sub>old</sub>(K<sub>high</sub>)</div>
<div class="where">With bonds bought at par, the cash injected is the face value retired, K<sub>high</sub> − K<sub>low</sub>. Re-run the strategy choice at K<sub>low</sub> first. The two changes sum to the change in firm value (check 3).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Strategy A pays 60 for sure, strategy R pays 100 with probability 0.5 and 0 otherwise, K = 50, discount rate zero. E<sub>A</sub> = 10 and E<sub>R</sub> = 0.5 × 50 = 25, so R runs and the firm is worth 50.</p><p>Buy back 40 of face at par, so K = 10: E<sub>A</sub> = 50 and E<sub>R</sub> = 0.5 × 90 = 45, so A runs. Shareholders: 50 − 40 = 10 against 25, a change of −15. Creditors: 40 cash + 10 safe = 50 against 0.5 × 50 = 25, a change of +25. Firm: 50 to 60. Check 3: −15 + 25 = 10 ✓.</p></div>`,
      q: `<p>Strand ASA must pick one of four strategies. If a strategy fails, the firm is worth nothing.</p><table class="data"><tr><th>Strategy</th><th>Probability of success</th><th>Firm value if successful</th></tr><tr><td>A</td><td class="n">100%</td><td class="n">70</td></tr><tr><td>B</td><td class="n">75%</td><td class="n">85</td></tr><tr><td>C</td><td class="n">50%</td><td class="n">100</td></tr><tr><td>D</td><td class="n">25%</td><td class="n">115</td></tr></table><p>Strand has debt with face value 60, maturing when the strategy pays off. Management maximises the value of equity. Investors are risk neutral and the discount rate is zero. Strand considers raising cash from its existing shareholders and buying back debt until the face value is 20. The bonds are held by many small investors. The firm must pay whatever price makes them willing to sell. By how much does the existing shareholders' wealth change if the buyback goes ahead?</p>`,
      options: ["+30.00", "+10.00", "−20.00", "−10.00"],
      answer: 3,
      solution: `<p><b>Before.</b> At K = 60: E<sub>A</sub> = 10, E<sub>B</sub> = 0.75 × 25 = 18.75, E<sub>C</sub> = 0.5 × 40 = 20, E<sub>D</sub> = 0.25 × 55 = 13.75. Management runs C. Debt is worth 0.5 × 60 = 30 and the firm 0.5 × 100 = 50.</p><p><b>After.</b> At K = 20: E<sub>A</sub> = 50, E<sub>B</sub> = 0.75 × 65 = 48.75, E<sub>C</sub> = 0.5 × 80 = 40, E<sub>D</sub> = 0.25 × 95 = 23.75. Management runs A, which pays 70 for sure, so the remaining debt is risk-free.</p><p><b>The price.</b> A bond kept is worth its full face value after the deal, so no holder sells for less. Retiring 60 − 20 = 40 of face costs 40.</p><p><b>Shareholders.</b> 50 − 40 = 10 against 20 without the buyback: a change of <b>−10.00</b>.</p>`,
      check: `<p>Creditors: 40 in cash plus 20 of safe debt = 60, against 30 before, a gain of 30. Firm value rises from 50 to 70. Check 3: −10 + 30 = +20 ✓, which is also the agency cost 70 − 50 that the buyback removes. The creditors capture 30, more than the whole gain of 20, so the shareholders will not deleverage although the leverage is inefficient.</p>`,
      traps: [
        "Forgot the 40 the shareholders inject: 50 − 20 = +30.00. That is the equity value after the deal, not the wealth net of the cash put in.",
        "Bought the bonds at today's market value, 0.5 × 40 = 20, so 50 − 20 − 20 = +10.00. No holder sells at 50% when the bonds left behind become safe.",
        "Skipped re-running the strategy choice and kept C at K = 20: 0.5 × 80 − 40 = 0 against 20, a change of −20.00. At K = 20 management switches to A, worth 50 to the shareholders.",
        null,
      ],
    },
    {
      id: "agent-14",
      title: "Exam level: overhang, risk shifting and the renegotiation range",
      theory: `<p>2021 Problem 2 (48 points) put both agency costs in one firm: risky debt, a good project A and a gamble B, each with the same cost and funded by the shareholders because a covenant bans new debt. At the old face value the manager prefers the gamble but funds neither. A new face value K′ must meet three conditions at once. The creditors are no worse off than with no project. The shareholders' equity net of I is at least their fallback. The manager prefers A to B at K′. Without the third, the creditors write down their claim and then find themselves funding a gamble.</p>
<div class="formula"><div class="eq">D<sub>A</sub>(K′) ≥ D<sub>0</sub> &nbsp;&nbsp; E<sub>A</sub>(K′) − I ≥ E<sub>0</sub> &nbsp;&nbsp; E<sub>A</sub>(K′) ≥ E<sub>B</sub>(K′)</div>
<div class="where">D<sub>0</sub> and E<sub>0</sub>: the values at the old face value with no project, the fallback if talks fail. Each condition is piecewise linear in K′, so say which states default under A and under B.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 160 or 60, equally likely, K = 120, discount rate zero: E<sub>0</sub> = 20 and D<sub>0</sub> = 90. Each project costs 30. A adds 45 in both states (160 + 45 = 205 or 60 + 45 = 105). B adds 50 or subtracts 50 (210 or 10). At K = 120: E<sub>A</sub> = 42.5 and E<sub>B</sub> = 45, so the shareholders' gains are 42.5 − 30 − 20 = −7.5 and 45 − 30 − 20 = −5. The manager prefers B and funds neither.</p><p>For K′ ≤ 105, A's debt is safe. Creditors: K′ ≥ 90. Shareholders: E<sub>A</sub> = 155 − K′, so 155 − K′ − 30 ≥ 20 gives K′ ≤ 105. Choice: 155 − K′ ≥ 0.5(210 − K′) gives K′ ≤ 100. The range is 90 ≤ K′ ≤ 100.</p></div>`,
      q: `<p>Tveit AS will have a cash flow at t = 2 of 280 or 120 with equal probability. It has debt with face value 190, due at t = 2. At t = 1 it can take one of two mutually exclusive projects, each costing 35 and funded by the current shareholders, since covenants prohibit new debt. Project A adds 55 to the cash flow in both states. Project B adds 60 in the high state and subtracts 60 in the low state. Investors are risk neutral, the discount rate is zero and the manager acts for the current shareholders.</p><p>The manager offers to replace the face value of 190 by K′; if the creditors refuse, the old contract stays. A party that is exactly as well off accepts. A manager indifferent between A and B picks A. For which K′ do the shareholders fund 35, the manager choose A and the creditors accept?</p>`,
      options: ["155.00 ≤ K′ ≤ 175.00", "No K′ satisfies both sides", "155.00 ≤ K′ ≤ 162.50", "155.00 ≤ K′ ≤ 170.00"],
      answer: 3,
      solution: `<p><b>Fallback.</b> E<sub>0</sub> = 0.5 × (280 − 190) = 45 and D<sub>0</sub> = 0.5 × 190 + 0.5 × 120 = 155.</p><p><b>At 190.</b> A gives 335 or 175: E<sub>A</sub> = 0.5 × 145 = 72.5, net 72.5 − 35 = 37.5. B gives 340 or 60: E<sub>B</sub> = 0.5 × 150 = 75, net 40. Both are below 45, so nothing is funded. Given the choice, the manager would rather gamble. The creditors would take 0.5 × 190 + 0.5 × 175 − 155 = 27.5 of A's NPV of 55 − 35 = 20: debt overhang.</p><p><b>The three conditions</b>, for K′ ≤ 175 (A's low state covers the debt) and K′ &gt; 60 (B's low state defaults): D<sub>A</sub> = K′, E<sub>A</sub> = 0.5(335 − K′) + 0.5(175 − K′) = 255 − K′, E<sub>B</sub> = 0.5(340 − K′) = 170 − 0.5K′.</p><p>Creditors: K′ ≥ 155. Shareholders: 255 − K′ − 35 ≥ 45, so K′ ≤ 175. Choice: 255 − K′ ≥ 170 − 0.5K′, so K′ ≤ 170. All inside the assumed interval.</p><p>The renegotiation works for <b>155.00 ≤ K′ ≤ 170.00</b>.</p>`,
      check: `<p>At K′ = 160: creditors 160 − 155 = +5, shareholders 255 − 160 − 35 − 45 = +15: 5 + 15 = 20 = NPV of A ✓ (check 3). The choice condition is the one that binds. At K′ = 172, E<sub>A</sub> = 83 but E<sub>B</sub> = 84, so the manager funds B (84 − 35 = 49 &gt; 45) and the debt is worth 0.5 × 172 + 0.5 × 60 = 116, far below the creditors' 155.</p>`,
      traps: [
        "Dropped the manager's choice between A and B. Above 170 the manager prefers B. With B the debt is worth only 0.5K′ + 30, at most 117.50 and far below the creditors' 155.",
        "Used the creditors' value with A at the old face value, 182.5, as their fallback. Without a deal no project is funded, so their fallback is 155.",
        "Cut the face value by the creditors' windfall at the old face value, 190 − 27.5 = 162.50. The shareholders need only K′ ≤ 175. The limit that binds is the manager's choice between A and B, at 170.",
        null,
      ],
    },
  ],
});

/* sjanger 7 · opsjoner · Options: payoffs, parity, the binomial model and Black-Scholes intuition */
window.EDU_DATA.sjangre.push({
  id: "opsjoner",
  num: 7,
  title: "Options: payoffs, parity, the binomial model and Black-Scholes intuition",
  summary: "From a single payoff to put-call parity, the binomial tree, risk-neutral pricing and what volatility does to an option",
  chapters: [21, 22, 23],
  exam: "7 of 11 papers · H2024 E6, H2025 E1",
  intro: `<p>The binomial model and risk-neutral pricing have appeared on 7 of 11 papers and put-call parity on 4. Kurbatov has tested options twice: H2024 Exercise 6 priced the right to wait with risk-neutral probabilities for 20 points; H2025 Exercise 1 opened the paper with 12 verbal points on what volatility does to a call. The ladder starts with one payoff, builds parity and the one-period tree, then climbs to two periods, ρ backed out of prices and Black-Scholes intuition. At the top you can price any claim on a binomial tree, find a missing price with parity, spot a quote that breaks the no-arbitrage bounds and say what a mispriced volatility means for the trade.</p>`,
  steps: [
    {
      id: "opsjoner-1",
      title: "Payoff and profit at expiry",
      theory: `<p>An option gives its holder a right, never an obligation. A call is the right to buy one share at the strike K on the expiry date; a put is the right to sell one share at K. The holder exercises only when it pays, so the payoff is never negative. The profit subtracts the premium paid today. The writer (seller) has the mirror image: he receives the premium and pays the payoff.</p>
<div class="formula"><div class="eq">Call payoff = max(S<sub>T</sub> − K, 0) &nbsp;&nbsp; Put payoff = max(K − S<sub>T</sub>, 0)</div><div class="eq">Profit = payoff − premium</div>
<div class="where">S<sub>T</sub> is the share price at expiry. The exercise decision never looks at the premium: you exercise a call whenever S<sub>T</sub> &gt; K, even if you still lose money overall. Assume European options, exercised only at expiry, unless told otherwise.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A call with K = 100 costs 6.</p><p>S<sub>T</sub> = 115: payoff 15, profit 15 − 6 = 9. S<sub>T</sub> = 104: payoff 4, profit −2. You still exercise, because 4 beats 0. S<sub>T</sub> = 90: payoff max(90 − 100, 0) = 0, profit −6, the whole premium.</p></div>`,
      q: `<p>You buy a European put with strike K = 64 for a premium of 5.20. At expiry the share trades at S<sub>T</sub> = 70. What is your profit?</p>`,
      options: ["0.80", "−11.20", "−5.20", "0.00"],
      answer: 2,
      solution: `<p>Put payoff = max(64 − 70, 0) = max(−6, 0) = 0. The right to sell at 64 is worthless when the market pays 70, so you let the put expire.</p><p>Profit = 0 − 5.20 = <b>−5.20</b>.</p>`,
      check: `<p>A long option can never lose more than its premium; −5.20 is exactly the premium. The put's break-even is K − premium = 64 − 5.20 = 58.80: it makes money only below 58.80; 70 is far above that.</p>`,
      traps: [
        "Used the call's payoff for a put: max(70 − 64, 0) − 5.20 = 6 − 5.20 = 0.80.",
        "Dropped the max(·, 0): (64 − 70) − 5.20 = −11.20. A holder never exercises at a loss, so the payoff cannot be negative.",
        null,
        "Gave the payoff instead of the profit: max(64 − 70, 0) = 0.00, forgetting the premium of 5.20.",
      ],
    },
    {
      id: "opsjoner-3",
      title: "The bounds: what a call cannot cost",
      theory: `<p>Arbitrage alone, before any model, limits what a European call on a share without dividends can cost. It can never be worth more than the share, because owning the share gives you the same thing without paying K. It is worth at least S − PV(K): a call plus a deposit of PV(K) pays max(S<sub>T</sub>, K) at expiry, which is never less than the share, so the package cannot cost less than S. The floor uses the discounted strike, so it lies above the intrinsic value S − K, what the call would pay if you exercised it today.</p>
<div class="formula"><div class="eq">max(S − PV(K), 0) ≤ C ≤ S &nbsp;&nbsp; PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup></div>
<div class="where">A quote outside the bounds is an arbitrage. Below the floor: buy the call, short the share and lend PV(K). The upper bound holds whatever the strike: the call's payoff is unlimited, its price is not. For a put: max(PV(K) − S, 0) ≤ P ≤ PV(K).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 100, K = 84, r<sub>f</sub> = 5%, one year. PV(K) = 84/1.05 = 80, so 20 ≤ C ≤ 100.</p><p>A quote of 18 is impossible even though it beats the intrinsic value of 16. Buy the call for 18, short the share for 100 and lend 80: you collect 2 today. At expiry you hold max(S<sub>T</sub> − 84, 0) − S<sub>T</sub> + 84 = max(84 − S<sub>T</sub>, 0) ≥ 0.</p></div>`,
      q: `<p>A share that pays no dividends trades at S = 150. The one-year risk-free rate is 5%. A one-year European call on it has strike K = 126. Which quote for the call does not violate the no-arbitrage bounds?</p>`,
      options: ["34.00", "27.50", "151.00", "23.00"],
      answer: 0,
      solution: `<p>PV(K) = 126/1.05 = 120.00.</p><p>Lower bound: max(150 − 120.00, 0) = 30.00. Upper bound: S = 150.00.</p><p>Only <b>34.00</b> lies between 30.00 and 150.00.</p>`,
      check: `<p>Test the quote of 27.50: buy the call, short the share and lend 120. Today: −27.50 + 150 − 120 = +2.50. At expiry you hold max(126 − S<sub>T</sub>, 0) ≥ 0. Money for nothing, so 27.50 is impossible. At 34.00 the same trade costs 4.00 today, so there is no free lunch ✓.</p>`,
      traps: [
        null,
        "Used the intrinsic value S − K = 24.00 as the floor instead of S − PV(K) = 30.00, so 27.50 looked fine.",
        "Thought a call has no upper bound because its payoff is unlimited. Its price can never exceed the share's 150.",
        "Discounted the intrinsic value instead of the strike: (150 − 126)/1.05 = 22.86, so 23.00 looked fine.",
      ],
    },
    {
      id: "opsjoner-4",
      title: "Put-call parity: the missing price",
      theory: `<p>Two portfolios pay exactly the same at expiry. A share plus a put (the protective put) pays max(S<sub>T</sub>, K). So does a call plus a deposit of PV(K) (the fiduciary call). Identical payoffs in every state must cost the same today, or there is free money. That is put-call parity. It needs no model and no probabilities. It is not on the formula sheet.</p>
<div class="formula"><div class="eq">C + PV(K) = P + S &nbsp;⟺&nbsp; C = P + S − PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>, with the exponent T. Parity holds for European options with the same strike, the same expiry and the same underlying, on a share that pays no dividends before expiry. If quoted prices break parity, buy the cheaper side, sell the dearer one and keep the gap: the payoffs cancel in every state.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 60, K = 66, r<sub>f</sub> = 5% a year, T = 2 years. The put costs 7.00.</p><p>(1.05)<sup>2</sup> = 1.1025, so PV(K) = 66/1.1025 = 59.8639.</p><p>C = 7.00 + 60 − 59.8639 = 7.1361.</p></div>`,
      q: `<p>A share trades at S = 84 and pays no dividends. A two-year European put with strike K = 90 costs 9.20. The risk-free rate is 4% a year. What is the price of the two-year European call with the same strike?</p>`,
      options: ["3.2000", "6.6615", "9.9899", "8.4101"],
      answer: 2,
      solution: `<p>(1.04)<sup>2</sup> = 1.0816, so PV(K) = 90/1.0816 = 83.2101.</p><p>C = P + S − PV(K) = 9.20 + 84 − 83.2101 = <b>9.9899</b>.</p>`,
      check: `<p>Running parity backwards, 9.9899 − 84 + 83.2101 = 9.2000, only confirms the arithmetic. The bounds are a real test: C = 9.9899 must lie between max(84 − 83.2101, 0) = 0.7899 and S = 84. It does ✓.</p>`,
      traps: [
        "Used K instead of PV(K): 9.20 + 84 − 90 = 3.2000.",
        "Discounted the strike for one year only: 9.20 + 84 − 90/1.04 = 9.20 + 84 − 86.5385 = 6.6615.",
        null,
        "Swapped the signs of S and PV(K): 9.20 − 84 + 83.2101 = 8.4101.",
      ],
    },
    {
      id: "opsjoner-6",
      title: "Replication in a one-period tree: Δ, B and the price",
      theory: `<p>Let the share move from S<sub>0</sub> to either S<sub>u</sub> or S<sub>d</sub> in one period. You can borrow or lend at r<sub>f</sub>. Buy Δ shares and place B in the risk-free asset, chosen so that the portfolio pays exactly what the option pays in both states: two equations, two unknowns. Something that pays the same as the option in every state must cost the same, so the option's price is the portfolio's cost. All three formulas are on the formula sheet.</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>)</div><div class="eq">B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>)</div><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">C<sub>u</sub> and C<sub>d</sub> are the option's payoffs in the two states. B is today's amount: B &lt; 0 means you borrow; you repay B(1 + r<sub>f</sub>) next period. First check that S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>, or the tree itself is an arbitrage.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 50, S<sub>u</sub> = 60, S<sub>d</sub> = 40, r<sub>f</sub> = 4%, call with K = 50. C<sub>u</sub> = 10, C<sub>d</sub> = 0.</p><p>Δ = 10/20 = 0.5. B = (0 − 40 × 0.5)/1.04 = −20/1.04 = −19.2308: borrow 19.2308, repay 20.00.</p><p>C<sub>0</sub> = 50 × 0.5 − 19.2308 = 25.0000 − 19.2308 = 5.7692. Up: 0.5 × 60 − 20 = 10 ✓. Down: 0.5 × 40 − 20 = 0 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 60. In one year it will be worth either 75 or 48. The one-year risk-free rate is 5%. What is the price of a one-year European call with strike K = 63?</p>`,
      options: ["6.3492", "46.9841", "5.3333", "2.2857"],
      answer: 0,
      solution: `<p>Payoffs: C<sub>u</sub> = max(75 − 63, 0) = 12, C<sub>d</sub> = max(48 − 63, 0) = 0.</p><p>Δ = (12 − 0)/(75 − 48) = 12/27 = 0.444444.</p><p>B = (0 − 48 × 0.444444)/1.05 = −21.3333/1.05 = −20.3175, so you borrow 20.3175.</p><p>C<sub>0</sub> = 60 × 0.444444 − 20.3175 = 26.6667 − 20.3175 = <b>6.3492</b>.</p>`,
      check: `<p>Verify the portfolio state by state. Up: 0.444444 × 75 − 21.3333 = 33.3333 − 21.3333 = 12.00 = C<sub>u</sub> ✓, where 21.3333 is the loan repaid with interest. Down: 0.444444 × 48 − 21.3333 = 0.00 = C<sub>d</sub> ✓. The tree is arbitrage-free: 48 &lt; 1.05 × 60 = 63 &lt; 75. The price also lies inside the bounds: above max(60 − 63/1.05, 0) = 0 and below 60.</p>`,
      traps: [
        null,
        "Got the sign of B wrong and added the loan: 26.6667 + 20.3175 = 46.9841. B is negative: the call is shares bought with borrowed money.",
        "Did not discount the loan: 26.6667 − 21.3333 = 5.3333. B is today's amount; 21.3333 is what you repay in a year.",
        "Took Δ as a ratio of levels, C<sub>u</sub>/S<sub>u</sub> = 12/75 = 0.16. Then B = −48 × 0.16/1.05 = −7.3143 and C<sub>0</sub> = 9.60 − 7.3143 = 2.2857.",
      ],
    },
    {
      id: "opsjoner-7",
      title: "The risk-neutral probability ρ and why the real one never appears",
      theory: `<p>Rearranging the replication price gives a shortcut that looks like an expectation. ρ is the probability of the up state that makes the share itself earn exactly r<sub>f</sub>. Weight the option's payoffs with ρ and discount at r<sub>f</sub>: you get the replication price exactly, because it is the same equation rewritten. The real probability never enters. The option is copied state by state, so its price cannot depend on how likely the states are; the market's beliefs and risk aversion already sit inside S<sub>0</sub>.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div><div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Both are on the formula sheet. ρ is a pricing weight, not a forecast. The only probability you may pair with r<sub>f</sub> is ρ; a real probability belongs with a risk-adjusted rate you are not given.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The tree from the previous step: S<sub>0</sub> = 50, S<sub>u</sub> = 60, S<sub>d</sub> = 40, r<sub>f</sub> = 4%, call with K = 50.</p><p>ρ = (1.04 × 50 − 40)/(60 − 40) = (52 − 40)/20 = 0.60. On the share: (0.60 × 60 + 0.40 × 40)/1.04 = 52/1.04 = 50 ✓.</p><p>C<sub>0</sub> = (0.60 × 10 + 0.40 × 0)/1.04 = 6/1.04 = 5.7692, exactly the replication price.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 40. In one year it will be worth 52 or 34. The one-year risk-free rate is 3%. Analysts put the probability of the up move at 0.70. What is the price of a one-year European call with strike K = 44?</p>`,
      options: ["5.4369", "3.1068", "3.2000", "4.8069"],
      answer: 1,
      solution: `<p>ρ = (1.03 × 40 − 34)/(52 − 34) = (41.20 − 34)/18 = 7.20/18 = 0.4000.</p><p>Payoffs: C<sub>u</sub> = 52 − 44 = 8, C<sub>d</sub> = 0.</p><p>C<sub>0</sub> = (0.4000 × 8 + 0.6000 × 0)/1.03 = 3.20/1.03 = <b>3.1068</b>. The analysts' 0.70 plays no role.</p>`,
      check: `<p>Replication gives the same: Δ = 8/18 = 0.444444, B = −34 × 0.444444/1.03 = −14.6710, C<sub>0</sub> = 17.7778 − 14.6710 = 3.1068 ✓. That is the same equation rearranged, so it catches arithmetic slips only. What the real probability would need: the expected payoff 0.70 × 8 = 5.60 gives 3.1068 only when discounted at the call's own expected return, 5.60/3.1068 − 1 = 80.25%, a rate you cannot know before you know the price.</p>`,
      traps: [
        "Paired the real probability with the risk-free rate: 0.70 × 8/1.03 = 5.4369. A real probability belongs with a risk-adjusted rate.",
        null,
        "Forgot to discount: 0.40 × 8 = 3.2000 is the value in one year, not today.",
        "Discounted the real expected payoff at the share's expected return: E[S<sub>1</sub>] = 0.70 × 52 + 0.30 × 34 = 46.60, a return of 16.50%, so 5.60/1.165 = 4.8069. The call is far riskier than the share.",
      ],
    },
    {
      id: "opsjoner-9",
      title: "Two periods: roll the tree back node by node",
      theory: `<p>With two periods you solve the one-period problem three times, starting at the end. Build the share tree, compute the payoffs at the last date, then value each date-1 node as the risk-neutral average of the two nodes after it, discounted one period. Repeat at the root. With the same u and d at every node the tree recombines and ρ is the same everywhere. Δ changes from node to node, so a replicating portfolio must be rebalanced at date 1.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>) − d]/(u − d)</div><div class="eq">C<sub>u</sub> = [ρC<sub>uu</sub> + (1 − ρ)C<sub>ud</sub>]/(1 + r<sub>f</sub>); C<sub>d</sub> and C<sub>0</sub> follow the same way</div><div class="eq">Shortcut: C<sub>0</sub> = [ρ<sup>2</sup>C<sub>uu</sub> + 2ρ(1 − ρ)C<sub>ud</sub> + (1 − ρ)<sup>2</sup>C<sub>dd</sub>]/(1 + r<sub>f</sub>)<sup>2</sup></div>
<div class="where">S<sub>u</sub> = uS<sub>0</sub>, S<sub>ud</sub> = udS<sub>0</sub> and so on; r<sub>f</sub> is per period. The 2 in the shortcut counts the two paths to the middle node. For a European option both routes give the same number.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 100, u = 1.2, d = 0.9, r<sub>f</sub> = 5%, call with K = 100 expiring in two periods. ρ = (1.05 − 0.90)/(1.20 − 0.90) = 0.50.</p><p>Share: 120 and 90, then 144, 108 and 81. Payoffs: 44, 8 and 0.</p><p>C<sub>u</sub> = (0.5 × 44 + 0.5 × 8)/1.05 = 26/1.05 = 24.7619. C<sub>d</sub> = (0.5 × 8 + 0.5 × 0)/1.05 = 4/1.05 = 3.8095. C<sub>0</sub> = (0.5 × 24.7619 + 0.5 × 3.8095)/1.05 = 14.2857/1.05 = 13.6054.</p><p>Shortcut: (0.25 × 44 + 0.50 × 8 + 0.25 × 0)/1.1025 = 15/1.1025 = 13.6054 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 80. Each year it rises by the factor u = 1.25 or falls by the factor d = 0.85. The risk-free rate is 4% a year. What is the price of a European call with strike K = 80 that expires in two years?</p>`,
      options: ["10.5399", "12.1605", "11.6927", "9.1346"],
      answer: 2,
      solution: `<p>ρ = (1.04 − 0.85)/(1.25 − 0.85) = 0.19/0.40 = 0.4750.</p><p>Share tree: 100 and 68, then 125, 85 and 57.80. Payoffs at date 2: C<sub>uu</sub> = 45, C<sub>ud</sub> = 5, C<sub>dd</sub> = 0.</p><p>Date 1: C<sub>u</sub> = (0.475 × 45 + 0.525 × 5)/1.04 = (21.375 + 2.625)/1.04 = 24/1.04 = 23.076923. C<sub>d</sub> = (0.475 × 5 + 0.525 × 0)/1.04 = 2.375/1.04 = 2.283654.</p><p>Today: C<sub>0</sub> = (0.475 × 23.076923 + 0.525 × 2.283654)/1.04 = (10.961538 + 1.198918)/1.04 = 12.160456/1.04 = <b>11.6927</b>.</p>`,
      check: `<p>Shortcut: ρ<sup>2</sup> = 0.225625, 2ρ(1 − ρ) = 0.498750, (1 − ρ)<sup>2</sup> = 0.275625, summing to 1. C<sub>0</sub> = (0.225625 × 45 + 0.498750 × 5)/1.0816 = (10.153125 + 2.493750)/1.0816 = 12.646875/1.0816 = 11.6927 ✓. ρ also prices the share at the up node: (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 ✓. The hedge moves: Δ is 20.7933/32 = 0.6498 today, 40/40 = 1.0000 after an up move and 5/27.2 = 0.1838 after a down move.</p>`,
      traps: [
        "Left out the 2 on the middle node: (0.225625 × 45 + 0.249375 × 5)/1.0816 = 11.400000/1.0816 = 10.5399. Two paths lead to 85.",
        "Discounted the date-2 expectation for one period only: 12.646875/1.04 = 12.1605.",
        null,
        "Treated it as a one-period option on the date-1 prices: C<sub>u</sub> = 100 − 80 = 20, so 0.475 × 20/1.04 = 9.1346.",
      ],
    },
    {
      id: "opsjoner-15",
      title: "Price the easier of the call and the put first, then use parity",
      theory: `<p>Kurbatov's advice for the exam: price first the call or the put, whichever is easier. Then get the other from put-call parity. In a two-period tree a call deep in the money pays at two or three end nodes, while the put with the same strike may pay at only one. One term means less work and fewer slips. Parity then needs only today's share price and the strike discounted over the option's whole life.</p>
<div class="formula"><div class="eq">C = P + S<sub>0</sub> − K/(1 + r<sub>f</sub>)<sup>T</sup> &nbsp;&nbsp; P = C − S<sub>0</sub> + K/(1 + r<sub>f</sub>)<sup>T</sup></div>
<div class="eq">two periods, put paying only at the bottom: P = (1 − ρ)<sup>2</sup> × P<sub>dd</sub>/(1 + r<sub>f</sub>)<sup>2</sup></div>
<div class="where">European options with the same strike, expiry and underlying, no dividends. T counts the periods to expiry, so a two-year option discounts K twice.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 100, u = 1.1, d = 0.9, r<sub>f</sub> = 3%, K = 95, two years. ρ = (1.03 − 0.90)/0.20 = 0.65. End nodes: 121, 99 and 81.</p><p>The put pays only at 81: 14. P = 0.35<sup>2</sup> × 14/1.03<sup>2</sup> = 1.715/1.0609 = 1.6166.</p><p>C = 1.6166 + 100 − 95/1.0609 = 1.6166 + 100 − 89.5466 = 12.0699. Directly: (0.4225 × 26 + 0.455 × 4)/1.0609 = 12.805/1.0609 = 12.0699 ✓</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 100 and pays no dividends. Each year it rises by the factor u = 1.2 or falls by the factor d = 0.8. The risk-free rate is 5% a year. What is the price of a two-year European call with strike K = 90?</p>`,
      options: ["17.6020", "21.6837", "27.5794", "13.3163"],
      answer: 1,
      solution: `<p>ρ = (1.05 − 0.80)/(1.20 − 0.80) = 0.25/0.40 = 0.625. End nodes: 144, 96 and 64.</p><p>The call pays 54 and 6 at two nodes; the put with K = 90 pays only at 64: 26. Price the put first: P = 0.375<sup>2</sup> × 26/1.05<sup>2</sup> = 0.140625 × 26/1.1025 = 3.65625/1.1025 = 3.3163.</p><p>PV(K) = 90/1.1025 = 81.6327. C = 3.3163 + 100 − 81.6327 = <b>21.6837</b>.</p>`,
      check: `<p>Price the call directly: (0.390625 × 54 + 0.46875 × 6)/1.1025 = (21.09375 + 2.8125)/1.1025 = 23.90625/1.1025 = 21.6837 ✓ This route uses other end nodes and no parity, so it catches a wrong PV(K) or a wrong weight on the put. The call also clears its floor S − PV(K) = 18.3673 ✓</p>`,
      traps: [
        "Discounted the strike for one year only: 3.3163 + 100 − 90/1.05 = 17.6020. The option runs two years.",
        null,
        "Weighted the bottom node with ρ<sup>2</sup> instead of (1 − ρ)<sup>2</sup>: P = 0.390625 × 26/1.1025 = 9.2120, so C = 27.5794. Two down moves carry the down weight.",
        "Used K instead of PV(K) in parity: 3.3163 + 100 − 90 = 13.3163.",
      ],
    },
    {
      id: "opsjoner-10",
      title: "Backing ρ out of an observed price",
      theory: `<p>ρ does not have to come from the share. On a two-state tree every traded asset is priced with the same weights, so any observed price X<sub>0</sub> with known payoffs X<sub>u</sub> and X<sub>d</sub> reveals ρ. The exam uses this when the share itself is not quoted but something else on the same two states is: an option, a commodity certificate, a bond or the cash flows of a project. Once you have ρ, price any other claim on the tree with it. A put works the same way: its payoff max(K − S, 0) comes in the down state, which carries the weight 1 − ρ.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)X<sub>0</sub> − X<sub>d</sub>]/(X<sub>u</sub> − X<sub>d</sub>)</div>
<div class="where">Grow the price by (1 + r<sub>f</sub>) before you compare it with the payoffs. If the asset also pays a cash flow at date 1, add it to both X<sub>u</sub> and X<sub>d</sub>. If two assets on the same tree imply different ρ, one of them is mispriced.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The share will be worth 120 or 80 in one year and r<sub>f</sub> = 5%. A call with K = 100 trades at 10.00 and pays 20 or 0.</p><p>ρ = (1.05 × 10.00 − 0)/(20 − 0) = 10.50/20 = 0.525.</p><p>A put with K = 110 pays 0 or 30, so P = 0.475 × 30/1.05 = 14.25/1.05 = 13.5714. The share price the options imply is (0.525 × 120 + 0.475 × 80)/1.05 = 101/1.05 = 96.1905.</p></div>`,
      q: `<p>Nobody quotes the share, but everyone agrees that in one year it will be worth 130 or 90. The one-year risk-free rate is 4%. A one-year European call with strike K = 100 trades at 12.50. What is the price of a one-year European put on the same share with strike K = 115?</p>`,
      options: ["14.1667", "10.4167", "14.0224", "13.6218"],
      answer: 3,
      solution: `<p>The call pays C<sub>u</sub> = 30 and C<sub>d</sub> = 0. ρ = (1.04 × 12.50 − 0)/(30 − 0) = 13.00/30 = 0.433333, so 1 − ρ = 0.566667.</p><p>The put pays P<sub>u</sub> = max(115 − 130, 0) = 0 and P<sub>d</sub> = max(115 − 90, 0) = 25.</p><p>P = (0.433333 × 0 + 0.566667 × 25)/1.04 = 14.166667/1.04 = <b>13.6218</b>.</p>`,
      check: `<p>First check: ρ reprices the call, 0.433333 × 30/1.04 = 13.00/1.04 = 12.50 ✓. This is the check that catches a ρ not grown by 1.04. Second check, through parity: the implied share price is (0.433333 × 130 + 0.566667 × 90)/1.04 = 107.333333/1.04 = 103.2051, a call with K = 115 pays 15 or 0 and is worth 0.433333 × 15/1.04 = 6.2500, so P = C − S<sub>0</sub> + PV(K) = 6.2500 − 103.2051 + 110.5769 = 13.6218 ✓. It uses the same ρ, so it catches payoff and state errors, not a wrong ρ.</p>`,
      traps: [
        "Forgot to discount the put: 0.566667 × 25 = 14.1667 is its value in one year.",
        "Gave the put's payoff the up-state weight: 0.433333 × 25/1.04 = 10.4167.",
        "Took ρ straight from the call price without growing it by 1.04: ρ = 12.50/30 = 0.416667, so P = 0.583333 × 25/1.04 = 14.0224.",
        null,
      ],
    },
    {
      id: "opsjoner-16",
      title: "One ρ prices everything on the tree, a CDS included",
      theory: `<p>Kurbatov's own drill from the wrap-up: r<sub>f</sub> = 5%, S<sub>0</sub> = 100, up 120, down 60; find ρ. Then use it. The same weights price any claim on the same two states. A credit default swap is one more claim. If a firm's assets follow the tree and its debt defaults in the down state, a CDS pays the creditors' shortfall there and nothing in the up state. 1 − ρ is the risk-neutral default probability. Risky debt plus the CDS is risk-free debt.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>)</div>
<div class="eq">CDS = (1 − ρ) × max(F − V<sub>d</sub>, 0)/(1 + r<sub>f</sub>) &nbsp;&nbsp; D = PV(F) − CDS</div>
<div class="where">V is the firm's assets and F the face value of its debt. The CDS here pays the whole shortfall; if it pays 1 per default, drop the shortfall. Real probabilities never enter.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kurbatov's tree: ρ = (1.05 × 100 − 60)/(120 − 60) = 45/60 = 0.75.</p><p>Let the firm's assets follow that tree and its debt have face value 80. Default comes in the down state, shortfall 20. CDS = 0.25 × 20/1.05 = 4.7619. Debt = 80/1.05 − 4.7619 = 76.1905 − 4.7619 = 71.4286 = (0.75 × 80 + 0.25 × 60)/1.05 ✓</p></div>`,
      q: `<p>A firm's assets are worth 250 today and will be worth 330 or 170 in one year. The real probability of the up state is 0.7. Its only debt is a one-year zero-coupon bond with face value 200. The risk-free rate is 4%. A CDS pays the bondholders' shortfall at maturity if the firm defaults. What is the price of the CDS today?</p>`,
      options: ["16.2260", "8.6538", "13.1250", "12.6202"],
      answer: 3,
      solution: `<p>ρ = (1.04 × 250 − 170)/(330 − 170) = 90/160 = 0.5625, so 1 − ρ = 0.4375.</p><p>Default happens only in the down state: shortfall 200 − 170 = 30.</p><p>CDS = 0.4375 × 30/1.04 = 13.125/1.04 = <b>12.6202</b>.</p>`,
      check: `<p>The test that can fail: the real probability of the up state is 0.7, so the assets are expected to return (0.7 × 330 + 0.3 × 170)/250 − 1 = 282/250 − 1 = 12.8%, above r<sub>f</sub>. ρ = 0.5625 must then lie below 0.7 and the risk-neutral default probability 0.4375 above the real 0.3 ✓ Pricing the bond, D = (0.5625 × 200 + 0.4375 × 170)/1.04 = 179.6875 and PV(F) − D = 192.3077 − 179.6875 = 12.6202, with equity 0.5625 × 130/1.04 = 70.3125 and D + E = 250. Those use the same ρ and only confirm the arithmetic.</p>`,
      traps: [
        "Put ρ on the default state: 0.5625 × 30/1.04 = 16.2260. ρ belongs to the up state.",
        "Used the real default probability of 0.3 with r<sub>f</sub>: 0.3 × 30/1.04 = 8.6538. Default comes in the bad state, so the risk-neutral 0.4375 is higher.",
        "Forgot to discount: 0.4375 × 30 = 13.1250 is the value in one year.",
        null,
      ],
    },
    {
      id: "opsjoner-11",
      title: "Black-Scholes: which way each input moves the value",
      theory: `<p>Give the binomial tree more and shorter steps and its price converges to the Black-Scholes formula. N(d<sub>1</sub>) is Δ and PV(K)·N(d<sub>2</sub>) is the borrowing, so it is still C = SΔ + B. Kurbatov has said it plainly: the Black-Scholes calculation will not be on the exam, the intuition can be. So the exam tests the direction of each effect and the reason, not the arithmetic. The key effect: a higher σ raises both a call and a put, because the payoff is floored at zero, so extra dispersion adds upside without adding downside. Four of the inputs can be read off a screen; only σ cannot. Run the formula backwards from a market price and you get the implied volatility: the σ the price is quoting.</p>
<div class="formula"><div class="eq">C = S·N(d<sub>1</sub>) − PV(K)·N(d<sub>2</sub>)</div><div class="eq">d<sub>1</sub> = ln[S/PV(K)]/(σ√T) + σ√T/2 &nbsp;&nbsp; d<sub>2</sub> = d<sub>1</sub> − σ√T</div>
<div class="where">S, K, T, r<sub>f</sub> and σ are the five inputs; σ is the annual volatility of the share's return. PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup> as before: this ladder, like the manual, compounds r<sub>f</sub> annually. Textbooks that write K·e<sup>−r<sub>f</sub>T</sup> use the same formula with a continuous rate. The share's expected return appears nowhere. A dividend before expiry lowers the call and raises the put.</div></div>
<table class="data"><tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>S</td><td>up</td><td>down</td><td>the call buys the share, the put sells it</td></tr>
<tr><td>K</td><td>down</td><td>up</td><td>you pay K on a call and receive it on a put</td></tr>
<tr><td>σ</td><td>up</td><td>up</td><td>the payoff is floored at zero, so more spread is all upside</td></tr>
<tr><td>T</td><td>up</td><td>either (European)</td><td>more spread and a smaller PV(K); for a put the two pull against each other</td></tr>
<tr><td>r<sub>f</sub></td><td>up</td><td>down</td><td>PV(K) falls: paying K later helps the call, receiving K later hurts the put</td></tr></table>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 50, K = 50, r<sub>f</sub> = 4%, T = 1, σ = 30%: C = 6.8582, P = 4.9351. Change one input at a time.</p>
<table class="data"><tr><th>Change</th><th>New C</th><th>New P</th><th>ΔC</th><th>ΔP</th></tr>
<tr><td>σ: 30% to 40%</td><td class="n">8.7719</td><td class="n">6.8488</td><td class="n">+1.9137</td><td class="n">+1.9137</td></tr>
<tr><td>r<sub>f</sub>: 4% to 6%</td><td class="n">7.3162</td><td class="n">4.4860</td><td class="n">+0.4580</td><td class="n">−0.4491</td></tr>
<tr><td>T: 1 to 2 years</td><td class="n">10.1047</td><td class="n">6.3325</td><td class="n">+3.2465</td><td class="n">+1.3974</td></tr></table>
<p>σ is not in S − PV(K), so the call and the put gain exactly the same from it.</p></div>`,
      q: `<p>Hold everything else fixed. Which statement about a European call on a share that pays no dividends is correct?</p>`,
      options: [
        "A higher σ lowers the call, because investors demand a higher return on a riskier share.",
        "A longer time to expiry lowers the call, because its payoff is discounted over more years.",
        "A higher strike K raises the call, because the holder receives K when he exercises.",
        "A higher r<sub>f</sub> raises the call, because the strike is paid at expiry and its PV falls.",
      ],
      answer: 3,
      solution: `<p>The call holder pays K only at expiry. A higher r<sub>f</sub> shrinks PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>, so what he gives up is worth less today and the call is worth more. In replication terms the call is shares bought with borrowed money; a higher rate lowers today's value of the repayment.</p><p>In the example, r<sub>f</sub> from 4% to 6% lifted the call from 6.8582 to <b>7.3162</b>.</p>`,
      check: `<p>Parity confirms the direction: C − P = S − PV(K). A higher r<sub>f</sub> lowers PV(K), so C − P must rise. In the example it rose by 0.4580 + 0.4491 = 0.9071, which is exactly 50/1.04 − 50/1.06 = 48.0769 − 47.1698 = 0.9071 ✓. Each of the other statements fails one row of the table: σ and T raise a call, K lowers it.</p>`,
      traps: [
        "Got the volatility effect backwards. The payoff is floored at zero, so more dispersion adds upside without adding downside: a higher σ raises the call.",
        "Forgot that more time means more dispersion and a smaller PV(K). Both raise a call. The option is not priced by discounting at a risky rate.",
        "Mixed up the call and the put. The call holder pays K at exercise, so a higher K lowers the call and raises the put.",
        null,
      ],
    },
    {
      id: "opsjoner-18",
      title: "The put side and what a dividend does",
      theory: `<p>Read the table of the last step for the put. A put sells the share at K, so it gains when S falls, when K rises and when σ rises; a higher r<sub>f</sub> lowers it, because the K it receives at expiry is worth less today. Time cuts both ways for a European put. A dividend paid before expiry matters too: on the ex-dividend date the share price drops by the dividend, but K does not move. So a dividend raises the put and lowers the call. Kurbatov: the Black-Scholes calculation will not be on the exam, the intuition can be.</p>
<div class="formula"><div class="eq">C − P = S − PV(Div) − PV(K)</div>
<div class="where">Put-call parity with a dividend paid before expiry: the dividend leaves the share, so it is not part of what the call buys or the put sells. Anything that lowers S − PV(Div) − PV(K) by more than it lowers C raises P.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (Problem Set 3, Exercise 3)</span><p>S = 60, K = 60, σ = 30%, r<sub>f</sub> = 5%, one year: the call is worth 8.50. A dividend of 1 paid immediately drops the share to 59 and the call to 7.89.</p><p>Parity, PV(K) = 60/1.05 = 57.1429. Put before: 8.50 − 60 + 57.1429 = 5.6429. After: 7.89 − 59 + 57.1429 = 6.0329. The put gains 0.39.</p></div>`,
      q: `<p>Hold everything else fixed. Which statement about a European put on a share is correct?</p>`,
      options: [
        "A higher r<sub>f</sub> raises the put, because at a higher rate the strike the holder receives at expiry grows into more money.",
        "A higher share price raises the put, because the put is then written on a share that is worth more money.",
        "A higher σ lowers the put, because a riskier share is more likely to end far above the strike.",
        "A dividend paid before expiry raises the put, because the share price drops by the dividend while K stays the same.",
      ],
      answer: 3,
      solution: `<p>The put pays max(K − S<sub>T</sub>, 0). A dividend paid before expiry leaves the firm, so the share price falls by the dividend on the ex-dividend date while K is unchanged. The put is closer to the money: <b>a dividend raises the put</b>. In Problem Set 3 a dividend of 1 lifted the put from 5.6429 to 6.0329.</p>`,
      check: `<p>Parity confirms the direction: P = C − S + PV(Div) + PV(K). The dividend lowers S − PV(Div) − PV(K) by 1 but the call by only 8.50 − 7.89 = 0.61, so P rises by 1 − 0.61 = 0.39 ✓ Each of the other statements fails one row of the table: a higher r<sub>f</sub> lowers PV(K) and the put, a higher S lowers the put, a higher σ raises it.</p>`,
      traps: [
        "Got the rate effect backwards. The holder receives K only at expiry; a higher r<sub>f</sub> shrinks PV(K), so the put is worth less.",
        "Mixed up the put and the call. The put sells the share at K, so a higher share price makes it worth less.",
        "Got the volatility effect backwards. The put's payoff is floored at zero too, so extra spread adds payoff in the left tail and costs nothing in the right: σ raises the put.",
        null,
      ],
    },
    {
      id: "opsjoner-17",
      title: "What if the option were American?",
      theory: `<p>An American option can be exercised at any time up to expiry, a European one only at expiry. Kurbatov: no American options to compute, but you may be asked whether the price would go up or down if the option were American. An extra right can never hurt, so an American option is worth at least the European one. For a call on a share without dividends it is worth exactly the same: alive, the call is worth at least S − PV(K), which is more than the S − K you get by exercising, so you never exercise early. A put can be worth exercising early: deep in the money you take K now and earn interest on it, rather than wait for at most K later. So an American put is worth more.</p>
<div class="formula"><div class="eq">C<sub>American</sub> = C<sub>European</sub> (no dividends) &nbsp;&nbsp; P<sub>American</sub> ≥ P<sub>European</sub></div>
<div class="eq">C<sub>European</sub> ≥ S − PV(K) &gt; S − K</div>
<div class="where">Put-call parity holds only for European options; with American options it becomes an inequality. With a dividend, early exercise of a call just before the ex-dividend date can pay.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Call: S = 100, K = 84, r<sub>f</sub> = 5%, one year. Alive it is worth at least 100 − 84/1.05 = 20; exercising gives 16. Keep it.</p><p>Put: S = 2, K = 50, r<sub>f</sub> = 5%, one year. Exercising gives 48 now. A European put can pay at most 50 in a year, worth at most 50/1.05 = 47.62 today. The right to exercise now is worth something, so the American put is worth at least 48.</p></div>`,
      q: `<p>A share pays no dividends. A one-year European call and a one-year European put on it, with the same strike, trade at C and P. If both were American instead, with everything else unchanged, what would happen to their prices?</p>`,
      options: [
        "Both rise: an American option adds the right to exercise early, so the call and the put each gain some value from that extra right.",
        "The call is unchanged; the put is worth at least as much, since early exercise can pay for a deep in-the-money put but not for this call.",
        "Both are unchanged: put-call parity ties the call and the put to the share and the strike, so neither gains from the right to exercise early.",
        "The call rises and the put is unchanged: the holder can exercise the call as soon as S passes K and lock in the gain before the share falls back.",
      ],
      answer: 1,
      solution: `<p>Call: alive it is worth at least S − PV(K), more than the S − K from exercising, so the right to exercise early is never used and is worth nothing: <b>the call is unchanged</b>. Put: deep in the money, taking K now beats waiting for at most K later, so the right to exercise early can be worth something: <b>the put is worth at least as much, often more</b>.</p>`,
      check: `<p>Test with the example: a call with S = 100 and K = 84 is worth at least 20 alive against 16 exercised; a put with S = 2 and K = 50 gives 48 exercised against at most 47.62 for the European put ✓ The answer also respects the rule that an extra right can never lower a price.</p>`,
      traps: [
        "An extra right adds value only if it is ever used. Without dividends the call is never exercised early, so its price does not change.",
        null,
        "Parity holds only for European options. With American options it becomes an inequality. The put gains from early exercise.",
        "Exercising a call early throws away its time value: alive it is worth at least S − PV(K), more than S − K. The put is the one that gains.",
      ],
    },
    {
      id: "opsjoner-13",
      title: "Exam level: true volatility below implied (H2025 E1)",
      theory: `<p>H2025 Exercise 1 gave 12 points with no computation: a call trades at a price that implies one σ, a well-informed friend says the true σ is lower. You must say what that does to the call's value and what to do. The marks go to four moves. Name the comparative static: value rises with σ. Give the direction: at the true σ the call is worth less than its price, so it is overpriced. State the action: do not buy it; better, write it and delta-hedge with Δ = N(d<sub>1</sub>) shares, so you bet on volatility and not on the share's direction. Name one limitation: it is not an arbitrage, because your σ may be wrong.</p>
<div class="formula"><div class="eq">true σ &lt; implied σ ⟹ fair value &lt; market price ⟹ do not buy; write the option</div>
<div class="where">The same holds for the put with the same strike, since parity keeps the two mispricings equal. If the true σ is above the implied one, everything flips: the option is cheap, so buy it and hedge.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A model answer for a call (S = K = 50, r<sub>f</sub> = 4%, one year) trades at 8.7719, implying σ = 40%; you believe the truth is 30%.</p><p>Call value rises with σ, because the payoff is floored at zero: more spread adds upside but no downside. At 30% the call is worth less than 8.7719 (6.8582), so it is overpriced. Do not buy it; write it and buy Δ = N(d<sub>1</sub>) ≈ 0.61 shares, so the position bets on volatility, not on the share's direction. This is not an arbitrage: it pays only if the true σ is near 30%.</p></div>`,
      q: `<p>A share trades at 50 and pays no dividends. A one-year European call with strike K = 55 trades at 4.80, which implies a volatility of 30%. The risk-free rate is 4%. You are about to buy the call when an analyst who has covered the firm for years convinces you that the true volatility is 22%. Which answer handles both questions: what the true volatility does to the call's value and what you should do?</p>`,
      options: [
        "Its value is below 4.80, since value rises with σ: with the downside capped, extra spread only adds upside. The call is overpriced, so do not buy it; write it and delta-hedge.",
        "Its value is above 4.80: a less volatile share is less risky, so investors pay more for a claim on it. The call is cheap at 4.80, so buy it before the market corrects.",
        "Its value is below 4.80, so the call is overpriced. Buy the put with the same strike instead: by put-call parity a lower value for the call means a higher value for the put.",
        "Its value is below 4.80, so the call is overpriced. Write it and keep the 4.80 unhedged: since the price exceeds fair value, the gain is a riskless arbitrage profit.",
      ],
      answer: 0,
      solution: `<p>Black-Scholes value rises with σ. The call pays max(S<sub>T</sub> − K, 0): spreading the distribution adds payoff in the right tail and costs nothing in the left, where the payoff is already zero. The 4.80 is the value at σ = 30%, so at the true 22% the call is worth less and is <b>overpriced</b>.</p><p>Do not buy it. Better, write it and buy Δ shares, so the position profits from the mispricing rather than from the share's direction.</p>`,
      check: `<p>The numbers, not needed on the exam, confirm the direction: the Black-Scholes value is 4.7975 at σ = 30% (the quoted 4.80) and 3.2086 at 22%, a gap of 1.5889, about a third of the price. The put with K = 55 is overpriced by the same 1.5889, because σ does not enter S − PV(K). And the trade is not riskless: if the true σ turns out above 22%, the written call loses.</p>`,
      traps: [
        null,
        "Got the volatility effect backwards. Lower σ means less upside for a payoff floored at zero, so the call is worth less, not more.",
        "A lower σ lowers the put too: σ is not in S − PV(K), so the put is overpriced by the same amount as the call.",
        "Not an arbitrage: the profit depends on the analyst being right about σ. An unhedged written call loses without limit if the share rallies.",
      ],
    },
    {
      id: "opsjoner-14",
      title: "Exam level: risk-neutral pricing of the right to wait (H2024 E6)",
      theory: `<p>H2024 Exercise 6 gave 20 points to an investment you can make now or in a year, once the interest rate is known. The right to wait is a call option on the project started in one year, struck at the investment cost I. The underlying is the present value of that project's cash flows, not its NPV. S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must price exactly the same cash flows: if the project pays for n years from one year after you invest, waiting gives you the payments in years 2 to n + 1, so S<sub>0</sub> is today's price of those, not of the project started now. Back ρ out with the rate from year 0 to year 1, take max(S − I, 0) in each state, weight with ρ and discount at r<sub>f</sub>. The real probabilities are never needed.</p>
<div class="formula"><div class="eq">S<sub>u</sub> = CF × A(n, r<sub>u</sub>) &nbsp;&nbsp; S<sub>d</sub> = CF × A(n, r<sub>d</sub>) &nbsp;&nbsp; S<sub>0</sub> = CF × A(n, r<sub>0</sub>)/(1 + r<sub>0</sub>)</div><div class="eq">ρ = [(1 + r<sub>0→1</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; C<sub>0</sub> = [ρ·max(S<sub>u</sub> − I, 0) + (1 − ρ)·max(S<sub>d</sub> − I, 0)]/(1 + r<sub>0→1</sub>)</div><div class="eq">option to wait = C<sub>0</sub> − max(NPV<sub>now</sub>, 0) &nbsp;&nbsp; NPV<sub>now</sub> = CF × A(n, r<sub>0</sub>) − I</div>
<div class="where">A(n, r) = [1 − (1 + r)<sup>−n</sup>]/r. S<sub>0</sub> assumes every maturity is discounted at r<sub>0</sub> today: it is the project started now, discounted one more year. The H2024 key prices the same stream with an annuity of 1 for n + 1 years from year 1, so S<sub>u</sub> = 1 + A(n, r<sub>u</sub>); a sure payment at date 1 does not change ρ. The low-rate state is the up state, because a lower rate makes the same cash flows worth more. Check that 0 &lt; ρ &lt; 1 before you use it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>CF = 10 a year for 15 years, I = 105. Today every maturity is discounted at 5%; next year the rate becomes 4% or 6%.</p><p>Investing now: 10 × 10.379658 = 103.7966, so NPV now = −1.2034. The project started at date 1: S<sub>u</sub> = 10 × 11.118387 = 111.1839, S<sub>d</sub> = 10 × 9.712249 = 97.1225 and S<sub>0</sub> = 103.7966/1.05 = 98.8539.</p><p>ρ = (1.05 × 98.8539 − 97.1225)/(111.1839 − 97.1225) = (103.7966 − 97.1225)/14.0614 = 6.6741/14.0614 = 0.4746.</p><p>C<sub>u</sub> = 6.1839, C<sub>d</sub> = max(−7.8775, 0) = 0. C<sub>0</sub> = 0.474640 × 6.1839/1.05 = 2.9351/1.05 = 2.7953. Since NPV now is negative, the option to wait is worth 2.7953: wait.</p></div>`,
      q: `<p>A licence lets you build a solar park for 18.5 (NOK million), paid when you build. The park pays 2.0 a year for 12 years, starting one year after you build. Today every maturity is discounted at 4.5%. If you wait a year, the rate becomes 3% or 6% for good; the rate from year 0 to year 1 stays 4.5%, the cost is still 18.5 and the park still runs 12 years after you build. An analyst puts the real probability of 3% at 0.5. What is the value today of the option to wait?</p>`,
      options: ["0.9826", "0.6305", "−0.2515", "0.5182"],
      answer: 1,
      solution: `<p><b>Building today.</b> 2.0 × A(12, 4.5%) = 2.0 × 9.118581 = 18.2372, so NPV now = 18.2372 − 18.5 = −0.2628.</p><p><b>Underlying: the park built at date 1</b>, payments in years 2 to 13. S<sub>u</sub> = 2.0 × A(12, 3%) = 2.0 × 9.954004 = 19.9080. S<sub>d</sub> = 2.0 × A(12, 6%) = 2.0 × 8.383844 = 16.7677. Today: S<sub>0</sub> = 18.2372/1.045 = 17.4518.</p><p><b>ρ.</b> (1.045 × 17.4518 − 16.7677)/(19.9080 − 16.7677) = (18.2372 − 16.7677)/3.1403 = 1.4695/3.1403 = 0.4679 (0.467938 unrounded).</p><p><b>Payoffs.</b> C<sub>u</sub> = max(19.9080 − 18.5, 0) = 1.4080. C<sub>d</sub> = max(16.7677 − 18.5, 0) = 0: you would not build.</p><p><b>Value.</b> C<sub>0</sub> = 0.467938 × 1.4080/1.045 = 0.6589/1.045 = 0.6305. Option to wait = 0.6305 − max(−0.2628, 0) = <b>0.6305</b>. Wait: waiting is worth 0.6305 against −0.2628 for building now.</p>`,
      check: `<p>A second twin for the same stream must give the same ρ. The H2024 key's version is an annuity of 1 a year for 13 years from year 1: S<sub>0</sub> = A(13, 4.5%) = 9.682852, S<sub>u</sub> = 1 + A(12, 3%) = 10.954004, S<sub>d</sub> = 1 + A(12, 6%) = 9.383844, so ρ = (1.045 × 9.682852 − 9.383844)/(10.954004 − 9.383844) = 0.734737/1.570160 = 0.4679 ✓ Pairing today's 18.2372 with S<sub>u</sub> and S<sub>d</sub> gives 0.7293 and fails this test. Replication on the same tree catches arithmetic slips only: Δ = 1.408008/3.140320 = 0.448364, B = −16.767688 × 0.448364/1.045 = −7.194292, C<sub>0</sub> = 17.451829 × 0.448364 − 7.194292 = 7.824780 − 7.194292 = 0.630488 ✓ The bounds hold too: 0 ≤ C<sub>0</sub> ≤ S<sub>0</sub>.</p>`,
      traps: [
        "S<sub>0</sub> prices a different cash flow than S<sub>u</sub> and S<sub>d</sub>: 18.2372 is the park built today (years 1 to 12), while S<sub>u</sub> and S<sub>d</sub> value the park built at date 1 (years 2 to 13). That gives ρ = 0.7293 and C<sub>0</sub> = 0.7293 × 1.4080/1.045 = 0.9826.",
        null,
        "Forgot that you are not forced to build: C<sub>d</sub> = 16.7677 − 18.5 = −1.7323 gives C<sub>0</sub> = −0.2515, a negative value for a right you never have to use.",
        "Grew S<sub>0</sub> at the up-branch rate of 3% instead of the 4.5% that applies this year: ρ = (1.03 × S<sub>0</sub> − 16.7677)/3.1403 = 0.3846, so C<sub>0</sub> = 0.3846 × 1.4080/1.045 = 0.5182.",
      ],
    },
  ],
});

/* sjanger 8 · kreditt · Debt and equity as options: credit risk */
window.EDU_DATA.sjangre.push({
  id: "kreditt",
  num: 8,
  title: "Debt and equity as options: credit risk",
  summary: "From a bond's yield to CDS prices, option-based betas and coinsurance in mergers",
  chapters: [5, 24],
  exam: "8 of 11 papers · V2024 P3 and P4, 2021 MC7–9 · not yet in the Kurbatov papers",
  intro: `<p>Credit risk has appeared on 8 of 11 papers, though not yet on Kurbatov's two. The older papers built long chained exercises on it: 2015 Problem 4 carried 90 points, while V2024 Problems 3 and 4 gave 28 points each to a CDS and to a merger with coinsurance. V2024 Problem 3 used the CDS example from lecture 10. Kurbatov said in class that a very similar example could be on the exam. He said the same of the Google exercise with senior and junior debt (Problem Set 3). The ladder starts with a bond's yield, then turns equity into a call on the firm's assets and debt into risk-free debt minus a put. At the top you can price risky debt and a CDS, back out the market's default probability, compute option-based betas and split a merger's gains between four groups.</p>`,
  steps: [
    {
      id: "kreditt-1",
      title: "A zero-coupon bond: price and yield to maturity",
      theory: `<p>A zero-coupon bond pays one amount, its face value F, at maturity and nothing before. Its yield to maturity y is the single annual rate that discounts F back to today's price P. It is the return you earn if every promised krone arrives, so it is a <b>promised</b> return. A default-free zero yields the risk-free rate r<sub>f</sub> for its maturity.</p>
<div class="formula"><div class="eq">P = F/(1 + y)<sup>T</sup> &nbsp;⟹&nbsp; y = (F/P)<sup>1/T</sup> − 1</div>
<div class="where">T is the number of years to maturity. For T = 1 this is simply y = F/P − 1. Price and yield always move in opposite directions.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A two-year zero with F = 1 000 trades at P = 810.00.</p><p>F/P = 1 000/810.00 = 1.234568. y = 1.234568<sup>1/2</sup> − 1 = 1.111111 − 1 = 0.111111 = 11.1111% a year.</p><p>Backwards: 1 000/1.111111<sup>2</sup> = 1 000/1.234568 = 810.00.</p></div>`,
      q: `<p>A three-year zero-coupon bond with face value 1 000 trades at 800.00. What is its yield to maturity per year, to four decimals?</p>`,
      options: ["25.0000%", "8.3333%", "6.6667%", "7.7217%"],
      answer: 3,
      solution: `<p>F/P = 1 000/800.00 = 1.25.</p><p>y = 1.25<sup>1/3</sup> − 1 = 1.077217 − 1 = <b>7.7217%</b> a year.</p>`,
      check: `<p>Backwards: 1.077217<sup>3</sup> = 1.25 and 1 000/1.25 = 800.00. The yield must also lie below the simple average 25%/3 = 8.3333%, because compounding earns interest on interest. It does.</p>`,
      traps: [
        "Forgot to annualise: 1 000/800 − 1 = 25.0000% is the three-year total, not a yearly rate.",
        "Divided the three-year total by three, ignoring compounding: 25%/3 = 8.3333%.",
        "Measured the discount against face value instead of price: (1 000 − 800)/1 000 = 20%, divided by three, 6.6667%.",
        null,
      ],
    },
    {
      id: "kreditt-2",
      title: "Promised versus expected return on risky debt",
      theory: `<p>A corporate borrower can default. Let p be the probability of default over the year and R the recovery rate, the fraction of face value the creditors collect if it happens. The loss given default is L = 1 − R. The yield y assumes nothing goes wrong. The <b>expected return</b> r<sub>D</sub> takes off the expected loss. It is r<sub>D</sub>, not y, that is the cost of debt in a WACC. The course formula is not on the formula sheet: memorise it. The credit spread y − r<sub>f</sub> holds two parts. The expected loss p·L is money the lender does not expect to get. Only the rest, r<sub>D</sub> − r<sub>f</sub>, is a premium for bearing default risk.</p>
<div class="formula"><div class="eq">r<sub>D</sub> = y − p·L</div><div class="eq">exact, from the payoffs: r<sub>D</sub> = E[payment]/P − 1 with E[payment] = (1 − p)·F + p·R·F</div>
<div class="where">The two routes differ by p·L·y, because the formula charges the loss on the price and the exact route on the promised payment. Use the formula when you are given y, p and L. Use the payoffs when you are given them.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>y = 8%, p = 5%, R = 50%, so L = 0.50.</p><p>p·L = 0.05 × 0.50 = 0.025. r<sub>D</sub> = 8% − 2.5% = 5.5000%.</p><p>Exact route per 100 of face: price 100/1.08 = 92.5926, expected payment 0.95 × 100 + 0.05 × 50 = 97.50, return 97.50/92.5926 − 1 = 5.3000%. The gap of 0.2% is p·L·y = 0.025 × 0.08 = 0.002.</p></div>`,
      q: `<p>A one-year corporate bond has a promised yield of 9%. Analysts put the probability of default at 4% and expect creditors to recover 40% of face value if it happens. Using the course formula, what is the expected return on the debt?</p>`,
      options: ["6.6000%", "9.0000%", "7.4000%", "5.0000%"],
      answer: 0,
      solution: `<p>L = 1 − 0.40 = 0.60, so p·L = 0.04 × 0.60 = 0.024.</p><p>r<sub>D</sub> = 9% − 2.4% = <b>6.6000%</b>.</p>`,
      check: `<p>The exact route per 100 of face: price 100/1.09 = 91.7431, expected payment 0.96 × 100 + 0.04 × 40 = 97.60, return 97.60/91.7431 − 1 = 6.3840%. It sits 0.2160% below the formula, which is p·L·y = 0.024 × 0.09 = 0.00216, as it should. Both lie below the 9% promised: whenever default is possible, the expected return is below the promised one.</p>`,
      traps: [
        null,
        "Used the promised yield as the expected return: 9.0000%. That is the return only if nothing goes wrong.",
        "Subtracted p times the recovery rate instead of the loss: 9% − 0.04 × 0.40 = 7.4000%.",
        "Subtracted the default probability as if creditors lost everything in default: 9% − 4% = 5.0000%.",
      ],
    },
    {
      id: "kreditt-4",
      title: "Equity as a call on the firm's assets",
      theory: `<p>Take a firm whose only debt is a zero-coupon bond with face value F, due at T. At T the shareholders either pay F and keep the rest, or walk away. Limited liability means they never pay more than the firm has. So equity pays max(V<sub>T</sub> − F, 0): a call option on the firm's assets with strike F. The creditors get min(V<sub>T</sub>, F). Work state by state: apply the max and the min in each state first, then average.</p>
<div class="formula"><div class="eq">E<sub>T</sub> = max(V<sub>T</sub> − F, 0) &nbsp;·&nbsp; D<sub>T</sub> = min(V<sub>T</sub>, F) &nbsp;·&nbsp; E<sub>T</sub> + D<sub>T</sub> = V<sub>T</sub></div>
<div class="where">V<sub>T</sub> is the value of the firm's assets at maturity and the face value F is the strike. E[V] − F is not the expected equity payoff: it lets equity go negative in the default states.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 90. The assets will be worth 150 or 70, each with probability 0.5.</p><p>Equity: max(150 − 90, 0) = 60 and max(70 − 90, 0) = 0, expected 0.5 × 60 = 30. Debt: 90 and 70, expected 80. Assets: expected 110 = 30 + 80.</p><p>The shortcut E[V] − F = 110 − 90 = 20 is wrong: it charges the shareholders the shortfall of 20 in the bad state, which limited liability spares them.</p></div>`,
      q: `<p>A firm has one zero-coupon bond with face value 100 due in one year. Its assets will then be worth 180 with probability 0.3, 120 with probability 0.4 or 60 with probability 0.3. What is the expected payoff to the shareholders at maturity?</p>`,
      options: ["20.00", "88.00", "32.00", "12.00"],
      answer: 2,
      solution: `<table class="data"><tr><th>V<sub>T</sub></th><th>Probability</th><th>Equity max(V − 100, 0)</th><th>Debt min(V, 100)</th></tr>
<tr><td class="n">180</td><td class="n">0.3</td><td class="n">80</td><td class="n">100</td></tr>
<tr><td class="n">120</td><td class="n">0.4</td><td class="n">20</td><td class="n">100</td></tr>
<tr><td class="n">60</td><td class="n">0.3</td><td class="n">0</td><td class="n">60</td></tr></table>
<p>Expected equity payoff = 0.3 × 80 + 0.4 × 20 + 0.3 × 0 = 24 + 8 + 0 = <b>32.00</b>.</p>`,
      check: `<p>Expected debt payoff = 30 + 40 + 18 = 88. Then 32 + 88 = 120 = E[V] = 54 + 48 + 18 ✓. The gap between 32 and E[V] − F = 20 is the expected shortfall the creditors absorb, 0.3 × 40 = 12: the call minus the put equals V − F, here 32 − 12 = 20.</p>`,
      traps: [
        "Subtracted the face value from expected firm value: 120 − 100 = 20.00. That makes equity pay the shortfall of 40 in the bad state.",
        "Gave the creditors' expected payoff: 0.3 × 100 + 0.4 × 100 + 0.3 × 60 = 88.00.",
        null,
        "Gave the creditors' expected shortfall, which is the payoff of the put: 0.3 × (100 − 60) = 12.00.",
      ],
    },
    {
      id: "kreditt-5",
      title: "Risky debt as risk-free debt minus a put",
      theory: `<p>Rewrite the creditors' payoff: min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). Lending to a levered firm is lending risk-free and at the same time writing the shareholders a put on the assets with strike F. The put is their right to hand over the assets instead of paying F. Equivalently, debt is the assets minus the shareholders' call. Put-call parity, Call = Put + V − PV(F), makes the two readings the same.</p>
<div class="formula"><div class="eq">D = PV(F) − Put = V − Call</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>)<sup>T</sup> is the value of the same promise if it were risk-free. Put and Call are options on V with strike F and the debt's maturity. The put enters with a minus: it is worth something to the shareholders, not to the lender. If the firm is all-equity before the issue, options on its n shares with strike F/n are options on V: n such puts make one put on V with strike F (2016 Problem 4).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 120, F = 110 due in one year, r<sub>f</sub> = 10%. The put on V with strike 110 is worth 6.</p><p>PV(F) = 110/1.10 = 100. D = 100 − 6 = 94. Equity is the rest: E = 120 − 94 = 26.</p><p>Parity: Call = 6 + 120 − 100 = 26 ✓.</p></div>`,
      q: `<p>A firm's assets are worth 250. Its only debt is a zero-coupon bond with face value 210 due in one year. The risk-free rate is 5%. A European put on the firm's assets with strike 210 and one year to expiry is worth 12. What is the market value of the debt?</p>`,
      options: ["212.00", "198.00", "200.00", "188.00"],
      answer: 3,
      solution: `<p>PV(F) = 210/1.05 = 200.</p><p>D = PV(F) − Put = 200 − 12 = <b>188.00</b>.</p>`,
      check: `<p>Equity is 250 − 188 = 62. Parity gives the call as 12 + 250 − 200 = 62. That is the same identity rearranged, so it only re-checks the arithmetic. The bound that can fail: risky debt must be worth less than both PV(F) = 200 and V = 250. 188 is; a value of 212 is not, which exposes a wrong sign on the put.</p>`,
      traps: [
        "Added the put instead of subtracting it: 200 + 12 = 212.00. That makes risky debt worth more than risk-free debt.",
        "Subtracted the put from the undiscounted face value: 210 − 12 = 198.00.",
        "Valued the debt as risk-free and left out the put: 210/1.05 = 200.00.",
        null,
      ],
    },
    {
      id: "kreditt-18",
      title: "In words: why debt is risk-free debt minus a put",
      theory: `<p>Kurbatov in the wrap-up: this could be on the exam, with the question "explain why". A full answer has three moves. Payoff: the creditors are owed F but receive min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). Option: the second term is the payoff of a put on the firm's assets struck at F. Limited liability gives the shareholders that put, the right to hand over the assets instead of paying F, the option to default. Who holds it: the creditors have written it, so they hold a risk-free claim on F minus the put. Kurbatov's wording in the wrap-up is risk-free debt plus a written put, which is the same thing: being short a put subtracts its value. Never write risk-free debt minus a written put, which flips the sign. If the shareholders had unlimited liability, the put would vanish and the debt would be risk-free (lecture 10).</p>
<div class="formula"><div class="eq">min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0) &nbsp;⟹&nbsp; D = PV(F) − Put</div>
<div class="where">A CDS is that same put bought back: D + Put = PV(F), the risk-free bond. Put-call parity turns it into the other reading, D = V − Call.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100 and the assets will be worth 140 or 60. The creditors get 100 = 100 − 0 or 60 = 100 − 40. The 40 is exactly what a put on the assets struck at 100 pays in the bad state. The creditors are the ones who pay it, through the shortfall.</p></div>`,
      q: `<p>An exam question asks: "Explain why corporate debt can be seen as risk-free debt minus a put option." Which answer earns full marks?</p>`,
      options: [
        "The creditors own a put on the firm's assets that pays them if V falls below F. Like any insurance it costs them a premium up front, which is why the put is subtracted from the risk-free value: D = PV(F) − Put.",
        "Creditors get min(V, F) = F − max(F − V, 0). That max is a put on the assets struck at F, the shareholders' right to default under limited liability. The creditors have written it: D = PV(F) − Put.",
        "Debt is a call on the firm's assets struck at F: the creditors collect more as V rises, up to F. By put-call parity that call equals risk-free debt minus a put with the same strike, which gives D = PV(F) − Put.",
        "The firm may repay early when interest rates fall, a right the creditors have sold to it at issue. That right works like a put on the bond, so the debt is worth PV(F), the risk-free value, minus the put.",
      ],
      answer: 1,
      solution: `<p>The winning answer makes all three moves: it rewrites the payoff, names the put and its strike, says where the put comes from (limited liability, the right to default) and who is short it (the creditors). That is the argument of lecture 10: <b>D = PV(F) − Put</b>.</p>`,
      check: `<p>Run the answer through the two extremes. If V<sub>T</sub> is far above F the put is worthless and the debt pays F: risk-free ✓ If V<sub>T</sub> = 0 the put pays F and the debt pays F − F = 0 ✓ An answer in which the creditors own the put fails this test: their payoff would rise as V falls.</p>`,
      traps: [
        "Got the holder backwards. If the creditors owned the put they would be insured: debt plus that put is the risk-free bond, D + Put = PV(F). The put belongs to the shareholders.",
        null,
        "Equity, not debt, is the call on the assets struck at F. Parity gives Call = Put + V − PV(F), so debt is V − Call, which is the same as PV(F) − Put.",
        "Mixes up a callable bond with default risk. The put in risky debt is the shareholders' right to default under limited liability, not a right to repay early.",
      ],
    },
    {
      id: "kreditt-15",
      title: "The value and yield of debt from a quoted call",
      theory: `<p>Equity is a call on the firm's assets struck at the face value of the debt. So if calls on the firm's shares trade with the right strike and expiry, the market has already priced the equity. Kurbatov's Google exercise (lecture 10, Problem Set 3): divide the face value by the number of shares to get the strike per share, take the call price as the midpoint of bid and ask, multiply by the number of shares. Debt is the rest of the firm. Then annualise the yield with T in years, also when T is not a whole number.</p>
<div class="formula"><div class="eq">strike per share = F/N &nbsp;&nbsp; E = N × (bid + ask)/2 &nbsp;&nbsp; D = V − E</div>
<div class="eq">y = (F/D)<sup>1/T</sup> − 1</div>
<div class="where">N is the number of shares and V the firm's total value, unchanged by the debt under perfect markets. For 18 months T = 18/12 and the exponent is 12/18. The firm has no debt today, so options on its shares are options on V.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10, Google)</span><p>320 million shares, V = 135 billion, a zero-coupon issue of 128 billion due in 18 months: 128/0.32 = 400 per share. The call with strike 400 has a midpoint of 86.05, so E = 0.32 × 86.05 = 27.536 billion and D = 135 − 27.536 = 107.464.</p><p>y = (128/107.464)<sup>12/18</sup> − 1 = 12.37%, a spread of 11.37% over r<sub>f</sub> = 1%.</p></div>`,
      q: `<p>Kystnett ASA has 250 million shares, a total value of 60 billion NOK and no debt. Markets are perfect. It considers issuing a zero-coupon bond with face value 40 billion, due in 15 months, then paying the proceeds out. Calls on its shares with strike 160 NOK and 15 months to expiry are quoted at bid 91.60 and ask 92.40. What annual yield would the bond pay?</p>`,
      options: ["6.4355%", "8.1081%", "10.2358%", "6.6662%"],
      answer: 0,
      solution: `<p>Strike per share: 40/0.25 = 160, the quoted strike. Midpoint: (91.60 + 92.40)/2 = 92.00.</p><p>E = 0.25 × 92.00 = 23.00 billion, so D = 60 − 23 = 37.00 billion.</p><p>y = (40/37)<sup>12/15</sup> − 1 = 1.081081<sup>0.8</sup> − 1 = <b>6.4355%</b> a year.</p>`,
      check: `<p>Grow the debt back: 37 × 1.064355<sup>1.25</sup> = 40.00 ✓ The annual yield must lie below the 15-month total, 40/37 − 1 = 8.11%, because the bond runs longer than a year. It does.</p>`,
      traps: [
        null,
        "Did not annualise: 40/37 − 1 = 8.1081% is the return over 15 months.",
        "Turned the exponent upside down: (40/37)<sup>15/12</sup> − 1 = 10.2358%.",
        "Used the ask instead of the midpoint: E = 0.25 × 92.40 = 23.10, D = 36.90 and (40/36.9)<sup>0.8</sup> − 1 = 6.6662%.",
      ],
    },
    {
      id: "kreditt-16",
      title: "Senior and junior debt from two calls",
      theory: `<p>With two layers of debt, value them one layer at a time (lecture 10). First pretend only the senior debt exists: equity would be the call struck at K<sub>S</sub>, so the senior debt is the rest. With both layers, equity is the call struck at K<sub>S</sub> + K<sub>J</sub>. The junior debt is what is left between them: a call spread that receives everything between K<sub>S</sub> and K<sub>S</sub> + K<sub>J</sub>. Its yield is above the yield on all the debt taken together. The senior yield is below it.</p>
<div class="formula"><div class="eq">D<sub>S</sub> = V − C(K<sub>S</sub>) &nbsp;&nbsp; E = C(K<sub>S</sub> + K<sub>J</sub>) &nbsp;&nbsp; D<sub>J</sub> = V − D<sub>S</sub> − E = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>)</div>
<div class="where">C(K) is N times the call price per share with strike K/N. Yields as before: y = (F/D)<sup>1/T</sup> − 1 for each layer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10, Google)</span><p>Senior 96 billion (300 per share): call 149.15, so 0.32 × 149.15 = 47.728 and D<sub>S</sub> = 135 − 47.728 = 87.272, y<sub>S</sub> = (96/87.272)<sup>12/18</sup> − 1 = 6.56%.</p><p>Junior 32 billion: equity is the call with strike 400, 27.536. D<sub>J</sub> = 135 − 87.272 − 27.536 = 20.192 ≈ 20.19 and y<sub>J</sub> = (32/20.19)<sup>12/18</sup> − 1 = 35.94%. (The slide prints 34.94%, an arithmetic slip.)</p></div>`,
      q: `<p>Kystnett ASA (250 million shares, total value 60 billion NOK, no debt today, perfect markets) instead considers two zero-coupon bonds, both due in 15 months: senior debt with face value 30 billion and junior debt with face value 10 billion. Calls on its shares with 15 months to expiry have midpoints of 128.00 for strike 120 and 92.00 for strike 160. What annual yield would the junior bond pay?</p>`,
      options: ["6.4355%", "33.0214%", "8.7943%", "11.1111%"],
      answer: 2,
      solution: `<p><b>Senior.</b> Strike 30/0.25 = 120: equity if only senior debt existed is 0.25 × 128 = 32, so D<sub>S</sub> = 60 − 32 = 28.</p><p><b>Equity.</b> Strike (30 + 10)/0.25 = 160: E = 0.25 × 92 = 23.</p><p><b>Junior.</b> D<sub>J</sub> = 60 − 28 − 23 = 9 = 0.25 × (128 − 92). y<sub>J</sub> = (10/9)<sup>12/15</sup> − 1 = <b>8.7943%</b>.</p>`,
      check: `<p>The senior yield is (30/28)<sup>0.8</sup> − 1 = 5.6746% and the yield on all 40 billion together is 6.4355%. The junior yield must be the highest of the three: 5.6746% &lt; 6.4355% &lt; 8.7943% ✓ The two layers also sum to the debt of a single bond with the same total face value, 28 + 9 = 37 ✓, but that is an identity (both routes are V minus the call struck at 160) and only confirms the arithmetic.</p>`,
      traps: [
        "Gave the yield on all the debt together: (40/37)<sup>0.8</sup> − 1 = 6.4355%. Splitting the debt moves risk onto the junior layer.",
        "Valued the senior debt at its face value of 30: D<sub>J</sub> = 37 − 30 = 7 and (10/7)<sup>0.8</sup> − 1 = 33.0214%. The senior debt is risky too and is worth only 28.",
        null,
        "Did not annualise: 10/9 − 1 = 11.1111% is the return over 15 months.",
      ],
    },
    {
      id: "kreditt-6",
      title: "Valuing debt and equity in a one-period tree",
      theory: `<p>To value the claims you need prices, not expected payoffs. In a one-period tree the firm's assets move from V<sub>0</sub> to V<sub>u</sub> or V<sub>d</sub>. The risk-neutral probability ρ is the up probability under which the assets earn exactly r<sub>f</sub>. Under ρ every claim on the assets also earns r<sub>f</sub>: take its payoff in each state, weight by ρ and 1 − ρ and discount at r<sub>f</sub>. The real probabilities never enter, because the asset price V<sub>0</sub> already contains them.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>)</div><div class="eq">D<sub>0</sub> = [ρ·min(V<sub>u</sub>, F) + (1 − ρ)·min(V<sub>d</sub>, F)]/(1 + r<sub>f</sub>) &nbsp;·&nbsp; E<sub>0</sub> = V<sub>0</sub> − D<sub>0</sub></div>
<div class="where">ρ is on the formula sheet. Pair ρ with r<sub>f</sub>, never with a real probability or a risky rate.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 125, V<sub>d</sub> = 85, r<sub>f</sub> = 5%, F = 95.</p><p>ρ = (105 − 85)/(125 − 85) = 20/40 = 0.50. Debt pays 95 or 85: D<sub>0</sub> = (0.5 × 95 + 0.5 × 85)/1.05 = 90/1.05 = 85.7143. Equity pays 30 or 0: E<sub>0</sub> = 0.5 × 30/1.05 = 14.2857. Sum 100.0000 = V<sub>0</sub>.</p></div>`,
      q: `<p>A firm's assets are worth 200 today and will be worth 260 or 160 in one year. Analysts put the probability of the up state at 0.6. The firm has one zero-coupon bond with face value 180 due in one year. The risk-free rate is 4%. What is the market value of the debt today?</p>`,
      options: ["165.3846", "163.0769", "173.0769", "169.6000"],
      answer: 1,
      solution: `<p>ρ = (1.04 × 200 − 160)/(260 − 160) = 48/100 = 0.48.</p><p>The debt pays min(260, 180) = 180 up and min(160, 180) = 160 down.</p><p>D<sub>0</sub> = (0.48 × 180 + 0.52 × 160)/1.04 = (86.40 + 83.20)/1.04 = 169.60/1.04 = <b>163.0769</b>.</p>`,
      check: `<p>Equity pays 80 or 0, so E<sub>0</sub> = 0.48 × 80/1.04 = 38.40/1.04 = 36.9231. Then 163.0769 + 36.9231 = 200.0000 = V<sub>0</sub> ✓. This one can fail: drop the max in the down state and equity is charged −20. The put route, 173.0769 − 0.52 × 20/1.04 = 173.0769 − 10.0000 = 163.0769, recombines the same numbers and catches arithmetic only.</p>`,
      traps: [
        "Used the analysts' 0.6 instead of ρ: (0.6 × 180 + 0.4 × 160)/1.04 = 172/1.04 = 165.3846. Real probabilities never pair with r<sub>f</sub>.",
        null,
        "Valued the debt as risk-free: 180/1.04 = 173.0769. That ignores the shortfall of 20 in the down state.",
        "Forgot to discount the risk-neutral expectation: 169.6000.",
      ],
    },
    {
      id: "kreditt-8",
      title: "The risk-neutral default probability and the price of a CDS",
      theory: `<p>A bond price tells you what the market believes about default, in risk-neutral terms. Set the price equal to the expected payoff under the risk-neutral default probability q, discounted at r<sub>f</sub>. Then solve for q. A credit default swap (CDS) is insurance on the bond. A contract that pays 1 if the issuer defaults and 0 otherwise is worth q/(1 + r<sub>f</sub>). q exceeds the real default probability, because default comes in bad times and the risk premium has been moved into the probability.</p>
<div class="formula"><div class="eq">P = [q·R·F + (1 − q)·F]/(1 + r<sub>f</sub>) &nbsp;⟹&nbsp; q = [1 − P(1 + r<sub>f</sub>)/F]/L</div><div class="eq">CDS paying 1 in default = q/(1 + r<sub>f</sub>)</div>
<div class="where">R·F is what the bond pays in default and L = 1 − R. In a tree where default is the down state, q = 1 − ρ.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A one-year bond with F = 100 has a promised yield of 6.25% and pays 80 in default; r<sub>f</sub> = 2%.</p><p>P = 100/1.0625 = 94.1176. q = [1 − 94.1176 × 1.02/100]/0.20 = (1 − 0.96)/0.20 = 0.20.</p><p>CDS paying 1 in default = 0.20/1.02 = 0.1961.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 12%. If the issuer defaults it pays 75. Analysts estimate the real default probability at 10%. The risk-free rate is 5%. What is the price today of a CDS that pays 1 if the issuer defaults and nothing otherwise?</p>`,
      options: ["0.2500", "0.0952", "0.2381", "0.2232"],
      answer: 2,
      solution: `<p>Price: P = 100/1.12 = 89.2857.</p><p>Risk-neutral default probability: [q × 75 + (1 − q) × 100]/1.05 = 89.2857, so 100 − 25q = 93.7500 and q = 6.25/25 = 0.25.</p><p>CDS = 0.25/1.05 = <b>0.2381</b>.</p>`,
      check: `<p>Reprice the bond with q: (0.25 × 75 + 0.75 × 100)/1.05 = 93.75/1.05 = 89.2857 ✓. A claim paying 1 in default plus a claim paying 1 otherwise is a risk-free zero: (0.25 + 0.75)/1.05 = 0.9524 = 1/1.05 ✓. And q = 25% sits well above the real 10%, as it must when default lands in bad times.</p>`,
      traps: [
        "Quoted the risk-neutral probability without discounting: 0.2500 is the value of 1 paid today, not in a year.",
        "Used the real default probability: 0.10/1.05 = 0.0952. Real probabilities never pair with r<sub>f</sub>.",
        null,
        "Discounted at the bond's promised yield instead of r<sub>f</sub>: 0.25/1.12 = 0.2232.",
      ],
    },
    {
      id: "kreditt-19",
      title: "The beta of equity as a call: Δ times V/E in a tree",
      theory: `<p>Equity is a call on the assets, so it moves with them by the option's delta Δ<sub>E</sub>: how much E changes when V changes by 1. In a one-period tree Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>), the same Δ as in replication. A 1% move in V moves E by Δ<sub>E</sub>·V/E per cent, so the equity beta scales the same way. Kurbatov has said the Black-Scholes calculation with N(d<sub>1</sub>) and N(d<sub>2</sub>) will not be on the exam, so work in the tree; in Black-Scholes N(d<sub>1</sub>) plays the role of Δ<sub>E</sub>.</p>
<div class="formula"><div class="eq">Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) &nbsp;·&nbsp; β<sub>E</sub> = Δ<sub>E</sub>·(V/E)·β<sub>U</sub></div>
<div class="where">E is the equity's value today from the tree, V = V<sub>0</sub> and β<sub>U</sub> the beta of the assets. Δ<sub>E</sub> is below 1 when the debt is risky, so β<sub>E</sub> stays below (V/E)β<sub>U</sub>, the value with riskless debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 125, V<sub>d</sub> = 85, r<sub>f</sub> = 5%, F = 95, β<sub>U</sub> = 1.0. ρ = 20/40 = 0.50 and E = 0.5 × 30/1.05 = 14.2857.</p><p>Δ<sub>E</sub> = (30 − 0)/(125 − 85) = 0.75. β<sub>E</sub> = 0.75 × (100/14.2857) × 1.0 = 5.25.</p></div>`,
      q: `<p>A firm's assets are worth 500 today and will be worth 700 or 350 in one year. Their beta is 1.1 and the risk-free rate is 4%. The firm's only debt is a one-year zero-coupon bond with face value 400. What is the equity beta, to four decimals?</p>`,
      options: ["3.9255", "1.9067", "1.3099", "3.3647"],
      answer: 3,
      solution: `<p><b>ρ.</b> (1.04 × 500 − 350)/(700 − 350) = 170/350 = 0.485714.</p><p><b>E.</b> Equity pays 300 or 0, so E = 0.485714 × 300/1.04 = 140.1099.</p><p><b>Δ<sub>E</sub>.</b> (300 − 0)/(700 − 350) = 0.857143.</p><p><b>β<sub>E</sub></b> = 0.857143 × (500/140.1099) × 1.1 = 0.857143 × 3.568627 × 1.1 = <b>3.3647</b>.</p>`,
      check: `<p>The bound that can fail: with riskless debt β<sub>E</sub> would be (V/E)β<sub>U</sub> = 3.9255; risky debt carries part of the asset risk, so β<sub>E</sub> must lie below that and above β<sub>U</sub> = 1.1. It does ✓ The debt's beta, (1 − 0.857143) × (500/359.8901) × 1.1 = 0.2183, weights back to β<sub>U</sub>: 0.280220 × 3.3647 + 0.719780 × 0.2183 = 1.1000. That last one is an identity and only confirms the arithmetic.</p>`,
      traps: [
        "Left out Δ<sub>E</sub>: (500/140.1099) × 1.1 = 3.9255. That is relevering as if the debt were riskless.",
        "Used ρ as the delta: 0.485714 × 3.568627 × 1.1 = 1.9067. ρ prices the claims; Δ measures how they move with V.",
        "Used V/D instead of V/E: 0.857143 × (500/359.8901) × 1.1 = 1.3099.",
        null,
      ],
    },
    {
      id: "kreditt-11",
      title: "Coinsurance: what a merger does to the debt",
      theory: `<p>Merge two levered firms with no synergies whose good and bad states do not coincide. Each firm's assets now stand behind both firms' debt, so a good outcome at one covers a shortfall at the other. The merged debt defaults less often and is worth more: this is the <b>coinsurance effect</b>. Total value is unchanged, so the creditors' gain is exactly the shareholders' loss (consistency check 4). Work state by state: add the two asset values in each state first, then apply the min against the total face value.</p>
<div class="formula"><div class="eq">merged debt in state s = min(V<sub>A,s</sub> + V<sub>B,s</sub>, F<sub>A</sub> + F<sub>B</sub>)</div><div class="eq">Call(V<sub>A</sub> + V<sub>B</sub>) ≤ Call(V<sub>A</sub>) + Call(V<sub>B</sub>) &nbsp;⟹&nbsp; E<sub>merged</sub> ≤ E<sub>A</sub> + E<sub>B</sub></div>
<div class="where">Value each claim as its risk-neutral average payoff discounted at r<sub>f</sub>. An option on a portfolio is worth no more than a portfolio of options, so the merged equity loses and the merged debt gains. Averaging V first and applying the min afterwards gives the wrong answer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A is worth 30 or 10, firm B 10 or 30. Each owes 15.</p><p>Apart: each debt pays 15 and 10, worth 12.5; each equity pays 15 and 0, worth 7.5. Total debt 25, total equity 15.</p><p>Merged: 40 in both states against F = 30. Debt 30, equity 10. Creditors gain 30 − 25 = 5 and shareholders lose 15 − 10 = 5 ✓.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 60 or 10 and owes 30. Firm B will be worth 10 or 30 and owes 20. Both debts are zero-coupon and mature at the same date. The firms merge with no synergies. The merged firm takes over both debts. What is the merged firm's debt worth?</p>`,
      options: ["45.00", "35.00", "50.00", "10.00"],
      answer: 0,
      solution: `<p>Add first: the merged assets are worth 60 + 10 = 70 in state 1 and 10 + 30 = 40 in state 2. Total face value is 30 + 20 = 50.</p><p>The debt pays min(70, 50) = 50 and min(40, 50) = 40, so D<sub>merged</sub> = 0.5 × 50 + 0.5 × 40 = <b>45.00</b>.</p>`,
      check: `<p>Apart, A's debt is worth 0.5 × 30 + 0.5 × 10 = 20 and B's 0.5 × 10 + 0.5 × 20 = 15, total 35. Equity apart: A 0.5 × 30 = 15, B 0.5 × 10 = 5, total 20. Merged equity: 0.5 × 20 = 10. Creditors gain 45 − 35 = 10 and shareholders lose 20 − 10 = 10. Firm value is 55 before and after, so the two must cancel (consistency check 4) ✓.</p>`,
      traps: [
        null,
        "Valued each debt on its own firm's assets as before the merger: 20 + 15 = 35.00. That leaves out the coinsurance.",
        "Averaged the merged assets first, min(55, 50) = 50.00, which is the face value: the debt then looks risk-free although it falls short in state 2.",
        "Gave the merged equity instead of the debt: 0.5 × (70 − 50) + 0.5 × 0 = 10.00.",
      ],
    },
    {
      id: "kreditt-17",
      title: "Coinsurance in yields: why the merged firm borrows cheaper",
      theory: `<p>Kurbatov's version of coinsurance asks three questions (lecture 12). Why does a joint bond yield less than two separate ones? Because in a state where one firm falls short, the other's surplus covers the gap. When is the joint firm less risky? When the two firms' bad states do not coincide; if both are low in the same state, nothing is covered. Who pays for the lower yield? With no synergies total value is fixed, so the shareholders: the debt is worth more and the equity less (consistency check 4).</p>
<div class="formula"><div class="eq">D<sub>merged</sub> = E[min(V<sub>A</sub> + V<sub>B</sub>, F<sub>A</sub> + F<sub>B</sub>)] &nbsp;&nbsp; y = F/D − 1</div>
<div class="where">One-period zero-coupon debt, risk-neutral investors and r<sub>f</sub> = 0, as in the lecture, so each claim is worth its expected payoff. Add the assets state by state before you apply the min.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 12)</span><p>Two equally likely states. A is worth 80 or 20 and owes 30; B is worth 10 or 40 and owes 15. Apart: A's debt pays 30 or 20, worth 25, yield 30/25 − 1 = 20%; B's pays 10 or 15, worth 12.5, yield 20%. Equity 25 + 12.5 = 37.5.</p><p>Merged: 90 or 60 against 45, so the debt is risk-free: 45, yield 0%. Equity pays 45 or 15, worth 30. Debt 37.5 → 45, equity 37.5 → 30.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 90 or 20 and owes 50. Firm B will be worth 10 or 60 and owes 40. Both debts are one-year zero-coupon bonds. The firms merge with no synergies. The merged firm owes 90 at the same date. What promised yield does the merged firm's debt carry?</p>`,
      options: ["5.8824%", "51.4286%", "50.0000%", "0.0000%"],
      answer: 0,
      solution: `<p>Add first: the merged assets are worth 90 + 10 = 100 in state 1 and 20 + 60 = 80 in state 2, against F = 90.</p><p>The debt pays 90 and 80, so D = 0.5 × 90 + 0.5 × 80 = 85.</p><p>y = 90/85 − 1 = <b>5.8824%</b>.</p>`,
      check: `<p>Apart: A's debt pays 50 or 20, worth 35, yield 42.8571%; B's pays 10 or 40, worth 25, yield 60%. The creditors gain 85 − 60 = 25. Equity apart is 20 + 10 = 30 and merged 0.5 × 10 = 5, a loss of 25 ✓ (check 4). The merged debt is still risky, since 80 &lt; 90 in state 2, so its yield stays above r<sub>f</sub> = 0.</p>`,
      traps: [
        null,
        "Averaged the two stand-alone yields: (42.8571% + 60%)/2 = 51.4286%. That ignores the coinsurance.",
        "Priced the two bonds apart and pooled them: 90/(35 + 25) − 1 = 50.0000%. That is the combined yield without the merger.",
        "Averaged the merged assets first: min(90, 90) = 90, so the debt looks risk-free. It falls short by 10 in state 2.",
      ],
    },
    {
      id: "kreditt-12",
      title: "Exam level: a debt-financed payout priced as options (2015 P4, 2022 P4)",
      theory: `<p>2015 Problem 4 (90 points) ran this chain on one firm: an all-equity firm issues zero-coupon debt and pays the proceeds out as a special dividend. Value the equity and the debt, then the yield and the credit spread, then the betas of both claims after the payout. 2022 Problem 4 (48 points) asked for the first links in a binomial tree. In a tree the delta Δ plays the role of N(d<sub>1</sub>). Close with D + E = V, which is MM I: the shareholder holds the dividend plus the levered shares.</p>
<div class="formula"><div class="eq">ρ → E, D → y = F/D − 1 → Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) → β<sub>E</sub> = Δ<sub>E</sub>(V/E)β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = (1 − Δ<sub>E</sub>)(V/D)β<sub>U</sub></div>
<div class="where">The debt's own delta is Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) = 1 − Δ<sub>E</sub>. The beta of the all-equity firm before the payout is β<sub>U</sub>. Kurbatov will not ask for the Black-Scholes calculation, so run the chain in the tree.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole chain</span><p>All-equity firm worth 200, assets worth 280 or 160 next year, r<sub>f</sub> = 4%, β<sub>U</sub> = 1.0. It issues a one-year zero with F = 176 and pays out the proceeds.</p><p>ρ = (208 − 160)/120 = 0.40. Equity pays 104 or 0: E = 0.40 × 104/1.04 = 40.0000. Debt pays 176 or 160: D = (70.40 + 96.00)/1.04 = 160.0000, which is the dividend.</p><p>y = 176/160 − 1 = 10.0000% and the spread is 6.0000%.</p><p>Δ<sub>E</sub> = 104/120 = 0.866667. β<sub>E</sub> = 0.866667 × (200/40) × 1.0 = 4.3333. β<sub>D</sub> = 0.133333 × (200/160) × 1.0 = 0.1667. Weighted: 0.2 × 4.3333 + 0.8 × 0.1667 = 1.0000.</p></div>`,
      q: `<p>An all-equity firm is worth 500 today. In one year its assets will be worth 750 or 375. Its asset beta is 1.1 and the risk-free rate is 5%. Markets are perfect. The firm issues a one-year zero-coupon bond with face value 450 and pays the proceeds to its shareholders as a special dividend. What is the beta of the new debt, to four decimals?</p>`,
      options: ["0.5704", "0.2852", "1.1407", "0.9625"],
      answer: 1,
      solution: `<p><b>ρ.</b> (1.05 × 500 − 375)/(750 − 375) = 150/375 = 0.40.</p><p><b>Claims.</b> Equity pays 300 or 0, so E = 0.40 × 300/1.05 = 114.2857. Debt pays 450 or 375, so D = (0.40 × 450 + 0.60 × 375)/1.05 = 405/1.05 = 385.7143. The dividend is 385.7143.</p><p><b>Yield and spread.</b> y = 450/385.7143 − 1 = 16.6667%, spread 16.6667% − 5% = 11.6667%.</p><p><b>Deltas.</b> Δ<sub>E</sub> = 300/375 = 0.80 and Δ<sub>D</sub> = (450 − 375)/375 = 0.20.</p><p><b>Betas.</b> β<sub>E</sub> = 0.80 × (500/114.2857) × 1.1 = 0.80 × 4.3750 × 1.1 = 3.8500. β<sub>D</sub> = 0.20 × (500/385.7143) × 1.1 = 0.20 × 1.2963 × 1.1 = <b>0.2852</b>.</p>`,
      check: `<p>D + E = 385.7143 + 114.2857 = 500 = V, so a shareholder holds 114.2857 in shares plus 385.7143 in cash: MM I ✓. Both claims earn r<sub>f</sub> under ρ: 0.40 × 300/114.2857 = 1.05 and 405/385.7143 = 1.05 ✓. The betas weight back to β<sub>U</sub>: (114.2857/500)(3.8500) + (385.7143/500)(0.2852) = 0.8800 + 0.2200 = 1.1000. That is an identity, but it catches a wrong weight.</p>`,
      traps: [
        "Used the risk-neutral probability as the debt's delta: 0.40 × 1.2963 × 1.1 = 0.5704. ρ prices the claims; Δ measures how they move with V.",
        null,
        "Used the equity's delta for the debt: 0.80 × 1.2963 × 1.1 = 1.1407.",
        "Copied the equity's leverage V/E into the debt formula: 0.20 × (500/114.2857) × 1.1 = 0.20 × 4.3750 × 1.1 = 0.9625. The debt beta scales with V/D.",
      ],
    },
    {
      id: "kreditt-13",
      title: "Exam level: two bonds, a CDS and the put (V2024 P3)",
      theory: `<p>V2024 Problem 3 (28 points) set a risk-free and a risky one-year zero side by side, in three parts. First, price both and find each one's expected return from its payoffs with the real probabilities. Second, back out the risk-neutral default probability from the risky bond's price and price a CDS that pays 1 in default. Third, value the put in the risky bond two ways: as the shortfall times the CDS price or as the price gap between the two bonds. The two routes must agree.</p>
<div class="formula"><div class="eq">r<sub>D</sub> = E<sub>real</sub>[payoff]/P<sub>2</sub> − 1 &nbsp;·&nbsp; P<sub>2</sub>(1 + r<sub>f</sub>) = (1 − q)F + q·R·F &nbsp;·&nbsp; Put = L·F × q/(1 + r<sub>f</sub>) = P<sub>1</sub> − P<sub>2</sub></div>
<div class="where">P<sub>1</sub> is the risk-free bond, P<sub>2</sub> the risky one. Real probabilities give expected returns; risk-neutral ones give prices. Close with the no-arbitrage reading: the risky bond plus CDS protection on the shortfall is the risk-free bond.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Face value 100 on both. Bond 1 yields r<sub>f</sub> = 3%. Bond 2 promises 9% and pays 80 in default, which has a real probability of 5%.</p><p>P<sub>1</sub> = 100/1.03 = 97.0874. P<sub>2</sub> = 100/1.09 = 91.7431. Expected payoff 0.95 × 100 + 0.05 × 80 = 99, so r<sub>D</sub> = 99/91.7431 − 1 = 7.9100%.</p><p>(1 − q) × 100 + q × 80 = 91.7431 × 1.03 = 94.4954, so 20q = 5.5046 and q = 0.2752. CDS = 0.2752/1.03 = 0.2672.</p><p>Put = 20 × 0.267213 = 5.3443. Also P<sub>1</sub> − P<sub>2</sub> = 97.0874 − 91.7431 = 5.3443 ✓.</p></div>`,
      q: `<p>Bond 1 is a one-year default-free zero with face value 100 and a yield of 4%. Bond 2 is a one-year corporate zero with face value 100 and a promised yield of 12.5%. It repays 100 with probability 92% and pays 75 if the issuer defaults, with probability 8%. The risk-free rate is 4%. Find the expected return on bond 2, the price of a CDS that pays 1 if the issuer defaults and the value of the put embedded in bond 2. Which line is right?</p>`,
      options: [
        "Expected return 12.5000% · CDS 0.2906 · put 7.2650",
        "Expected return 10.2500% · CDS 0.0769 · put 1.9231",
        "Expected return 4.0000% · CDS 0.0769 · put 1.9231",
        "Expected return 10.2500% · CDS 0.2906 · put 7.2650",
      ],
      answer: 3,
      solution: `<p><b>Prices and expected returns.</b> P<sub>1</sub> = 100/1.04 = 96.1538, expected return 4%. P<sub>2</sub> = 100/1.125 = 88.8889. Expected payoff 0.92 × 100 + 0.08 × 75 = 92 + 6 = 98, so r<sub>D</sub> = 98/88.8889 − 1 = 10.2500%, against 12.5000% promised.</p><p><b>q and the CDS.</b> (1 − q) × 100 + q × 75 = 88.8889 × 1.04 = 92.4444, so 25q = 7.5556 and q = 0.3022. CDS = 0.302222/1.04 = 0.2906.</p><p><b>The put.</b> It pays the shortfall of 25 in default: 25 × 0.290598 = 7.2650. From the bonds: 96.1538 − 88.8889 = 7.2650.</p><p>The right line is <b>10.2500%, 0.2906 and 7.2650</b>.</p>`,
      check: `<p>The two put routes start from different inputs and agree at 7.2650 ✓. Buy bond 2 for 88.8889 and 25 CDS contracts for 7.2650: you pay 96.1538 and receive 100 in both states, which is bond 1 ✓. The spread of 8.5% splits into 2.25% of expected loss (12.5% − 10.25%) and a 6.25% risk premium (10.25% − 4%). And q = 30.22% sits well above the real 8%.</p>`,
      traps: [
        "Gave the promised yield as the expected return: 12.5000%. Bond 2 pays 100 only if it does not default.",
        "Used the real 8% default probability for the prices: CDS 0.08/1.04 = 0.0769 and put 25 × 0.076923 = 1.9231. The route through the bond prices then fails.",
        "Swapped the two probabilities. The risk-neutral q in the expected return gives 92.4444/88.8889 − 1 = 4.0000%, which is just r<sub>f</sub>; the real 8% in the prices gives CDS 0.08/1.04 = 0.0769 and put 25 × 0.076923 = 1.9231.",
        null,
      ],
    },
    {
      id: "kreditt-14",
      title: "Exam level: coinsurance in a merger, four groups (V2024 P4)",
      theory: `<p>V2024 Problem 4 (28 points) merged two levered firms with no synergies and asked for four things: assets, debt and equity of each firm apart; the same for the merged firm; the gain or loss to all four groups of claim holders, with the check that they cancel and whether the shareholders would merge; the name of the effect. In the exam the merged debt became risk-free. If the merged firm can still default, the two bonds, which rank equally, share its assets in proportion to face value. Read the equity split from the question: usually in proportion to the pre-merger equity values.</p>
<div class="formula"><div class="eq">creditors of i in a merged default receive V<sub>merged</sub> × F<sub>i</sub>/(F<sub>A</sub> + F<sub>B</sub>)</div><div class="eq">ΔD<sub>A</sub> + ΔD<sub>B</sub> + ΔE<sub>A</sub> + ΔE<sub>B</sub> = 0 with no synergies</div>
<div class="where">The creditors gain and the shareholders lose: the coinsurance effect. No exchange ratio rescues both groups of shareholders, since it only splits a smaller equity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, risk neutral, r<sub>f</sub> = 0. A is worth 36 or 6 and owes 24; B is worth 6 or 18 and owes 12.</p><p>Apart: debt A pays 24 or 6, worth 15, equity A 6; debt B pays 6 or 12, worth 9, equity B 3.</p><p>Merged: 42 or 24 against 36, so debt 30 and equity 3. In state 2 the 24 is shared 24 × 24/36 = 16 to A's creditors and 8 to B's. Debt A = (24 + 16)/2 = 20, up 5. Debt B = (12 + 8)/2 = 10, up 1. Equity 3 split 6 : 3 gives A 2 (down 4) and B 1 (down 2). Check: 5 + 1 − 4 − 2 = 0 ✓.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 70 or 8 and owes 30. Firm B will be worth 24 or 48 and owes 40. Both debts are zero-coupon, mature at the same date and rank equally after a merger. The firms merge with no synergies. Each group of shareholders receives a share of the merged equity in proportion to its pre-merger equity value. Which line gives the change in value of each group and the shareholders' decision?</p>`,
      options: [
        "Creditors A +10.00, creditors B +2.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "Creditors A 0.00, creditors B 0.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "Creditors A +8.00, creditors B +4.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "No group gains or loses, since the merger adds no value; the shareholders are indifferent",
      ],
      answer: 2,
      solution: `<p><b>Apart.</b> A: debt pays 30 or 8, worth 19; equity 40 or 0, worth 20; V<sub>A</sub> = 39. B: debt pays 24 or 40, worth 32; equity 0 or 8, worth 4; V<sub>B</sub> = 36.</p><p><b>Merged.</b> Assets 94 or 56 against F = 70. Debt pays 70 or 56, worth 63; equity 24 or 0, worth 12. V = 75 = 39 + 36, so no value is created.</p><p><b>Split.</b> In state 2 the 56 is shared by face value: A's creditors get 56 × 30/70 = 24 and B's get 56 × 40/70 = 32. Debt A = (30 + 24)/2 = 27, debt B = (40 + 32)/2 = 36. The equity of 12 is split 20 : 4, so A's shareholders get 10 and B's get 2.</p>
<table class="data"><tr><th>Group</th><th>Before</th><th>After</th><th>Change</th></tr>
<tr><td>Creditors A</td><td class="n">19.00</td><td class="n">27.00</td><td class="n">+8.00</td></tr>
<tr><td>Creditors B</td><td class="n">32.00</td><td class="n">36.00</td><td class="n">+4.00</td></tr>
<tr><td>Shareholders A</td><td class="n">20.00</td><td class="n">10.00</td><td class="n">−10.00</td></tr>
<tr><td>Shareholders B</td><td class="n">4.00</td><td class="n">2.00</td><td class="n">−2.00</td></tr>
<tr><td>Total</td><td class="n">75.00</td><td class="n">75.00</td><td class="n">0.00</td></tr></table>
<p>Both shareholder groups lose, so they <b>reject</b> the merger. The effect is coinsurance: each firm's assets now back the other's debt.</p>`,
      check: `<p>Consistency check 4: the creditors gain 8 + 4 = 12 and the shareholders lose 10 + 2 = 12 while total value stays at 75 ✓. The check does not catch every slip: splitting state 2 equally gives the creditors +10 and +2, which still sums to 12. Only the pro rata rule catches that. The bound that can fail: merged equity of 12 is below the 24 the two groups held apart, so no exchange ratio can make both better off.</p>`,
      traps: [
        "Split the state 2 assets equally between the bonds, 28 each, instead of by face value: creditors A gain 29 − 19 = 10.00 and B 34 − 32 = 2.00. Check 4 still balances, so only the pro rata rule catches it.",
        "Split the smaller merged equity 20 : 4 but left both bonds at their stand-alone values of 19 and 32. The four changes then sum to −12, not 0, which check 4 catches: the merged assets back both bonds, so the creditors gain.",
        null,
        "Assumed nothing moves because there are no synergies. Total value is fixed, but value still moves from the shareholders to the creditors.",
      ],
    },
  ],
});

/* sjanger 9 · myers · Asymmetric information: Myers-Majluf */
window.EDU_DATA.sjangre.push({
  id: "myers",
  num: 9,
  title: "Asymmetric information: Myers-Majluf",
  summary: "From the fair price of a new share to pooling, separating, the announcement drop, IPO costs and the pecking order",
  chapters: [12, 13],
  exam: "8 of 11 papers · not in H2024 or H2025",
  intro: `<p>Asymmetric information reached 8 of the 11 papers, almost always as one template: 2016 P1, 2017V P1, 2020 P2, 2022 P2 and 2023 P4, plus debt against equity in 2021 P1. Neither Kurbatov paper (H2024, H2025) used it, but Kurbatov taught it in 2026 (lecture 6 and problem set 2) and lists it in his summary lecture. The setup is not on the formula sheet. The ladder builds the template one piece at a time: the fair stake α, the old shareholders' payoff, the issue decision, the belief check, pooling and separating, the price reaction and the pecking order. At the top you can solve any of these exercises with new numbers. Three steps follow his 2026 material: α as a number of shares, the cost of an IPO and the winner's curse behind IPO underpricing.</p>`,
  steps: [
    {
      id: "myers-1",
      title: "The fair stake when everyone knows V",
      theory: `<p>A firm with assets in place worth V needs cash I for a project. The project's NPV is what it adds over and above its cost I. The firm has no cash, so it sells new shares. New investors are competitive: they pay exactly what their stake is worth. Their stake is a fraction α of the firm <b>after</b> the issue, which holds the assets V plus the project, worth I + NPV once the cash is invested. In this step everyone knows V, so the price is fair to both sides.</p>
<div class="formula"><div class="eq">α × (V + I + NPV) = I &nbsp;⟹&nbsp; α = I/(V + I + NPV)</div>
<div class="where">V + I + NPV is the post-issue value of the whole firm. The cash raised belongs in the denominator because it is inside the firm after the issue. Not on the formula sheet: memorise it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 100, I = 40, NPV = 10. Post-issue value = 100 + 40 + 10 = 150.</p><p>α = 40/150 = 0.2667. The new investors pay 40 for 26.67% of a firm worth 150, a stake worth exactly 40.</p></div>`,
      q: `<p>Everyone, managers and investors alike, knows that a firm's assets in place are worth 260. The firm raises 75 by issuing new shares to fund a project with an NPV of 15. Investors are competitive and risk neutral and there is no discounting. What fraction α of the post-issue firm must the new investors receive? Give four decimals.</p>`,
      options: ["0.2239", "0.2727", "0.2143", "0.2885"],
      answer: 2,
      solution: `<p>Post-issue value = V + I + NPV = 260 + 75 + 15 = 350.</p><p>α = 75/350 = <b>0.2143</b> (3/14 exactly).</p>`,
      check: `<p>Backwards: 0.214286 × 350 = 75.00, exactly the cash the investors paid ✓. The answer must also lie below 75/260 = 0.2885, because the firm the investors buy into is bigger than V once the cash and the project are inside it.</p>`,
      traps: [
        "Left the NPV out of the post-issue value: 75/(260 + 75) = 0.2239.",
        "Left the cash raised out of the denominator: 75/(260 + 15) = 0.2727. After the issue the firm holds the project, worth I + NPV, not just the NPV.",
        null,
        "Priced the stake against the assets alone: 75/260 = 0.2885, as if the investors bought into the firm before the issue.",
      ],
    },
    {
      id: "myers-15",
      title: "From the stake α to the number of new shares",
      theory: `<p>Exams often ask how many shares the firm must sell, not only α. The new shares are the fraction α of all shares after the issue, so n/(N + n) = α. Solve for n. Each new share then sells at the post-issue value per share.</p>
<div class="formula"><div class="eq">n/(N + n) = α &nbsp;⟹&nbsp; n = αN/(1 − α) &nbsp;·&nbsp; P = (V + I + NPV)/(N + n)</div>
<div class="where">N is the share count before the issue. α × N alone is too few shares: it ignores that the new shares are part of the total they are a fraction of. When the issue is fairly priced, P also equals (V + NPV)/N, so n = I/P is a quick check.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 1</span><p>Rothko has 1 000 shares and the market values its art at 50 000, so P = 50. It raises 10 000 for an exhibition that will produce nothing, so NPV = −10 000 and the post-issue value is 50 000 + 10 000 − 10 000 = 50 000.</p><p>α = 10 000/50 000 = 20%. n = 0.20 × 1 000/0.80 = 250 shares. The price falls to 50 000/1 250 = 40.</p></div>`,
      q: `<p>Everyone knows that a firm's assets in place are worth 380 million. It has 40 million shares. It raises 60 million by issuing shares to fund a project with an NPV of 20 million. Investors are competitive and there is no discounting. How many new shares, in millions, must it issue? Give four decimals.</p>`,
      options: ["6.0000", "7.0588", "5.2174", "6.3158"],
      answer: 0,
      solution: `<p>α = 60/(380 + 60 + 20) = 60/460 = 0.130435.</p><p>n = 0.130435 × 40/(1 − 0.130435) = 5.217391/0.869565 = <b>6.0000</b> million.</p>`,
      check: `<p>Price route: before the issue the shares are worth (380 + 20)/40 = 10.00 each, so n = 60/10.00 = 6.0000 ✓. After it: 460/46 = 10.00, so a fair issue leaves the price unchanged. And 6/46 = 0.130435 = α ✓.</p>`,
      traps: [
        null,
        "Left the cash raised out of α: 60/(380 + 20) = 0.15, so n = 0.15 × 40/0.85 = 7.0588.",
        "Multiplied α by the old share count: 0.130435 × 40 = 5.2174. The new shares are part of the total they are a fraction of.",
        "Priced the new shares at V/N = 380/40 = 9.50, leaving the NPV out: 60/9.50 = 6.3158.",
      ],
    },
    {
      id: "myers-3",
      title: "The old shareholders' payoff and the issue decision",
      theory: `<p>The old shareholders keep the rest, 1 − α, of the post-issue firm. With fair pricing the new investors take out exactly the I they put in, so the old shareholders end with V + NPV. The manager acts for them. If he does not issue, the project is lost, because the firm has no other money. So he compares the payoff from issuing with V alone, not with V + NPV. When investors know V the rule reduces to NPV &gt; 0: the stake handed to the new investors is not a loss, because they paid I for it, exactly its value.</p>
<div class="formula"><div class="eq">Payoff to old shareholders = (1 − α)(V + I + NPV) = V + NPV</div><div class="eq">Issue and invest if (1 − α)(V + I + NPV) &gt; V</div>
<div class="where">The shortcut V + NPV uses α(V + I + NPV) = I and holds only when α is priced on the true V. Once investors price α on a different V, use the first form. V on the right of the issue rule is what the old shares are worth if the firm walks away; comparing with V + NPV counts the project in the alternative where it is never built.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 100, I = 40, NPV = 10, so α = 40/150 = 4/15.</p><p>Issue: (1 − 4/15) × 150 = (11/15) × 150 = 110 = 100 + 10. Walk away: 100. They issue and gain 110 − 100 = 10, the NPV.</p></div>`,
      q: `<p>A firm's assets in place are worth 320 and everyone knows it. A project with an NPV of 18 needs 90, which can only be raised by issuing shares. Without the issue the project is lost. Investors are competitive and there is no discounting. What should the manager, acting for the old shareholders, do?</p>`,
      options: [
        "Do not issue: the new investors get 21.03% of a firm worth 428.00, that is 90.00, far more than the NPV of 18.00",
        "Either: the old shareholders end with 338.00, which equals V + NPV, the value of the firm with the project",
        "Issue: the old shareholders end with 338.00 against 320.00 without the project, a gain of 18.00",
        "Do not issue: the old shareholders keep 78.97% of the assets, 252.71, against 320.00 without the issue",
      ],
      answer: 2,
      solution: `<p>α = 90/(320 + 90 + 18) = 90/428 = 0.210280.</p><p>Issue: (1 − 0.210280) × 428 = 0.789720 × 428 = <b>338.00</b>. Walk away: the project is lost and the old shareholders keep V = <b>320.00</b>.</p><p>338.00 &gt; 320.00, so the manager <b>issues</b>. The old shareholders gain 18.00.</p>`,
      check: `<p>The gain equals the NPV, 338.00 − 320.00 = 18.00 ✓, as it must when investors know V. The stake the new investors receive is worth 0.210280 × 428 = 90.00, matched by the 90 of cash they bring, so it costs the old shareholders nothing.</p>`,
      traps: [
        "Treated the stake sold as a cost and ignored the 90 of cash it buys. The new investors pay exactly what their stake is worth.",
        "Compared the payoff with V + NPV = 338.00. Without the issue the project is lost, so the alternative is V = 320.00.",
        null,
        "Applied 1 − α to the assets alone: 0.789720 × 320 = 252.71. The cash and the project stay in the firm.",
      ],
    },
    {
      id: "myers-5",
      title: "Asymmetric information: the undervalued type walks away",
      theory: `<p>Now the manager knows V but investors do not. They know only that the assets are worth V<sub>H</sub> with probability q and V<sub>L</sub> with probability 1 − q; the project, I and NPV, is public. Investors price what they expect V to be given the action they observe. If they believe every firm issues whatever its type (the pooling belief), an issue tells them nothing and they use the prior average. The old shareholders' payoff still uses the <b>true</b> V, which the manager knows, times the 1 − α that investors set.</p>
<div class="formula"><div class="eq">E[V | issue] = qV<sub>H</sub> + (1 − q)V<sub>L</sub> &nbsp;(if both types issue) &nbsp;·&nbsp; α = I/(E[V | issue] + I + NPV)</div><div class="eq">Gain from issuing = (1 − α)(V + I + NPV) − V = NPV − α(V − E[V | issue])</div>
<div class="where">α is the same for both types, because investors cannot tell them apart. α(V − E[V | issue]) is the dilution cost: value handed to new investors who bought into a firm worth more than they believed. If it exceeds the NPV, the high type keeps V by not issuing and a positive-NPV project dies. That is underinvestment. For the low type the sign flips: it sells overpriced shares, gains from issuing and always issues at the pooled price.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, I = 40, NPV = 10. E[V | issue] = 0.5 × 200 + 0.5 × 80 = 140 and α = 40/190 = 4/19 = 0.210526.</p><p>High type: (15/19) × 250 = 197.37, a gain of 197.37 − 200 = −2.63. Dilution form: 0.210526 × 60 = 12.63 and 10 − 12.63 = −2.63. It does not issue.</p><p>Low type: (15/19) × 130 = 102.63 = 80 + 10 + 12.63 &gt; 80. It issues.</p></div>`,
      q: `<p>A firm's assets in place are worth 360 or 160; investors think each is equally likely. The manager knows they are worth 360. A project with a publicly known NPV of 12 needs 80, to be raised by a share issue. Investors believe the firm would issue whatever its type. Measured once the true value comes out, by how much does issuing and investing change the old shareholders' wealth compared with not issuing?</p>`,
      options: ["−10.73", "12.00", "−22.73", "−88.00"],
      answer: 0,
      solution: `<p>E[V | issue] = 0.5 × 360 + 0.5 × 160 = 260, so α = 80/(260 + 80 + 12) = 80/352 = 0.227273.</p><p>Payoff if it issues = (1 − 0.227273) × (360 + 80 + 12) = 0.772727 × 452 = 349.27. Without the issue the old shareholders keep 360.</p><p>Change = 349.27 − 360 = <b>−10.73</b>. The high type does not issue: it walks away from a project with a positive NPV.</p>`,
      check: `<p>Dilution form: α(V − E[V | issue]) = 0.227273 × (360 − 260) = 22.73. NPV minus dilution: 12 − 22.73 = −10.73 ✓. The project adds 12 but the issue gives away 22.73, so the old shareholders are better off letting it die.</p>`,
      traps: [
        null,
        "Priced α on the true value 360, as if investors knew it. The old shareholders then keep the whole NPV, 12.00.",
        "Compared the payoff with V + NPV = 372 instead of V = 360: 349.27 − 372 = −22.73. That is the dilution, not the change in wealth.",
        "Valued the payoff at investors' beliefs instead of the true V: 0.772727 × 352 − 360 = 272 − 360 = −88.00.",
      ],
    },
    {
      id: "myers-8",
      title: "Check 5 and the separating equilibrium",
      theory: `<p>Computing α does not finish the answer. An equilibrium is an action for each type plus a belief that is correct given those actions: consistency check 5, the step the solution keys mark. The pooling belief holds only if both types issue at the pooled α. The low type always does, so the test is the high type. If it walks away, an issue reveals the low type, investors price the shares on V<sub>L</sub> and α rises. Two checks make this separating outcome an equilibrium and both earn points: the low type still issues at the harsher price while the high type still stays out.</p>
<div class="formula"><div class="eq">Pooling holds if NPV &gt; α<sub>pool</sub>(V<sub>H</sub> − E[V | issue]) &nbsp;·&nbsp; else α<sub>sep</sub> = I/(V<sub>L</sub> + I + NPV)</div><div class="eq">Low type: (1 − α<sub>sep</sub>)(V<sub>L</sub> + I + NPV) = V<sub>L</sub> + NPV &gt; V<sub>L</sub> &nbsp;·&nbsp; High type: (1 − α<sub>sep</sub>)(V<sub>H</sub> + I + NPV) &lt; V<sub>H</sub></div>
<div class="where">Investors breaking even at the pooled price is not the test: under the belief they break even by construction. Under separating the low type is priced correctly, so it keeps exactly V<sub>L</sub> + NPV. The high type faces an even worse price than under pooling, so if it refused then, it refuses now.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, I = 40, NPV = 10. At the pooled α = 0.2105 the high type keeps 197.37 &lt; 200 and does not issue. The pooling belief fails check 5.</p><p>Separating: α = 40/(80 + 40 + 10) = 40/130 = 0.3077. Low type: (9/13) × 130 = 90 = 80 + 10 &gt; 80, so it issues ✓. High type, if it issued: (9/13) × 250 = 173.08 &lt; 200, so it stays out ✓. Only the low type issues: a separating equilibrium.</p></div>`,
      q: `<p>A firm's assets in place are worth 500 or 200, equally likely in investors' eyes; the manager knows which. A project with a publicly known NPV of 24 needs 120, raised by issuing shares. Find the equilibrium. What fraction α do new investors receive in it? Give four decimals.</p>`,
      options: ["0.2429", "0.1863", "0.3488", "0.5357"],
      answer: 2,
      solution: `<p><b>Test pooling.</b> E[V | issue] = 350 and α = 120/(350 + 120 + 24) = 120/494 = 0.242915. High type: 0.757085 × 644 = 487.56 &lt; 500. It does not issue, so pooling fails check 5.</p><p><b>Separating.</b> Investors read an issue as V = 200: α = 120/(200 + 120 + 24) = 120/344 = <b>0.3488</b>.</p><p>Low type: 0.651163 × 344 = 224.00 &gt; 200, so it issues ✓. High type, if it issued: 0.651163 × 644 = 419.35 &lt; 500, so it stays out ✓.</p>`,
      check: `<p>The issuer is identified correctly, so the low type must keep exactly V<sub>L</sub> + NPV = 200 + 24 = 224.00 with no transfer either way ✓. New investors pay 120 for 0.348837 × 344 = 120.00 ✓.</p>`,
      traps: [
        "Skipped check 5 and kept the pooled α: 120/494 = 0.2429. The high type refuses at that price, so the belief behind it is wrong.",
        "Assumed the high type is the one that issues: 120/(500 + 120 + 24) = 0.1863.",
        null,
        "Left the cash raised out of the denominator: 120/(200 + 24) = 0.5357.",
      ],
    },
    {
      id: "myers-9",
      title: "The real cost: NPV that is never created",
      theory: `<p>Pooling and separating are not equally harmful. Under pooling both types invest and value only moves from the high type's old shareholders to the low type's through the new investors. Nothing real is lost. Under separating the high type abandons a positive-NPV project. That NPV is not transferred to anyone: it is never created. This is underinvestment, the same family as debt overhang.</p>
<div class="formula"><div class="eq">Expected loss = q × NPV<sub>H</sub> &nbsp;(when the high type does not invest)</div>
<div class="where">In the running case the separating equilibrium loses 0.5 × 10 = 5.00. 2022 Problem 2 used a starker form. The firm has no assets in place and the project itself is good or bad. Investors then pay for E[project value]. If I exceeds it, α = I/E[project value] &gt; 1: no security can raise I, nobody is financed and the good project dies with the bad one.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An entrepreneur with no money has a project costing 90. It is worth 120 if good and 40 if bad, each with probability 0.5. Everyone is risk neutral and there is no discounting.</p><p>Symmetric information: good α = 90/120 = 0.75, funded, NPV 30. Bad α = 90/40 = 2.25 &gt; 1, not funded, which is right since its NPV is −50.</p><p>Asymmetric: E[value] = 0.5 × 120 + 0.5 × 40 = 80 &lt; 90, so α = 90/80 = 1.125 &gt; 1. Nobody is financed. Expected loss = 0.5 × 30 = 15.00.</p></div>`,
      q: `<p>An entrepreneur with no money of her own has a project that costs 115. If the project is good it is worth 150; if bad, 50. She knows which; investors put probability 0.4 on good. The only funding is equity sold to competitive investors. Everyone is risk neutral and there is no discounting. Compared with a world where investors know the project's quality, how much expected value does the information problem destroy?</p>`,
      options: ["14.00", "35.00", "21.00", "0.00"],
      answer: 0,
      solution: `<p><b>Symmetric information.</b> Good: α = 115/150 = 0.7667 ≤ 1, funded, NPV = 150 − 115 = 35. Bad: α = 115/50 = 2.30 &gt; 1, not funded, which is efficient since its NPV is −65.</p><p><b>Asymmetric information.</b> E[value] = 0.4 × 150 + 0.6 × 50 = 60 + 30 = 90 &lt; 115, so α = 115/90 = 1.2778 &gt; 1. No issue can raise 115 and neither project is built.</p><p>Lost: the good project's NPV, with probability 0.4: 0.4 × 35 = <b>14.00</b>.</p>`,
      check: `<p>Could investors instead believe that any issuer is good? Then α = 115/150 = 0.766667 and the bad type would mimic: it keeps 0.233333 × 50 = 11.67 &gt; 0. Both types would issue, the belief falls back to the prior and α to 1.2778. So no financing is the only outcome that survives check 5. The loss of 14.00 stands.</p>`,
      traps: [
        null,
        "Forgot the probability: the good project's NPV of 35.00 is lost only when the project is good.",
        "Weighted by the bad type's probability: 0.6 × 35 = 21.00.",
        "Missed that α = 1.2778 is impossible and treated the outcome as pooling, where value only moves between the types.",
      ],
    },
    {
      id: "myers-10",
      title: "The share price reaction to an equity issue",
      theory: `<p>In a separating equilibrium an issue announcement is news: it reveals the low type. Before the announcement investors do not know which type they hold; after it they do. The old shares are then worth what investors now believe the firm is worth to them. The cash raised drops out because the new investors pay full price for their slice.</p>
<div class="formula"><div class="eq">Old shares after an issue is announced = (1 − α)(E[V | issue] + I + NPV) = E[V | issue] + NPV</div><div class="eq">Before = q × V<sub>H</sub> + (1 − q)(V<sub>L</sub> + NPV) &nbsp;(separating: the high type abstains)</div>
<div class="where">The price before is the weighted average of the two outcomes the market expects. Under pooling an issue reveals nothing about V, so it carries no bad news. In the data, seasoned equity offers meet a price fall of roughly 3% on average, while straight debt issues barely move the price.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, NPV = 10. Separating: the high type stays out, the low type issues.</p><p>Before the announcement: 0.5 × 200 + 0.5 × (80 + 10) = 145. After an issue is announced: 80 + 10 = 90. Price reaction = 90/145 − 1 = −37.93%.</p></div>`,
      q: `<p>A firm's assets in place are worth 600 or 300. Investors put probability 0.3 on 600; the manager knows which. A project with a publicly known NPV of 30 needs 150, raised by issuing shares. First find the equilibrium. Then: by how much does the market value of the existing shares change, in per cent, when the firm announces an equity issue?</p>`,
      options: ["−15.38%", "−19.71%", "−27.01%", "16.79%"],
      answer: 1,
      solution: `<p><b>Equilibrium.</b> Pooled: E[V | issue] = 0.3 × 600 + 0.7 × 300 = 390, α = 150/570 = 0.263158 and the high type keeps 0.736842 × 780 = 574.74 &lt; 600, so pooling fails. Separating: α = 150/480 = 0.3125. The low type keeps 330 &gt; 300 and the high type would keep 0.6875 × 780 = 536.25 &lt; 600. Only the low type issues.</p><p><b>Before.</b> 0.3 × 600 + 0.7 × 330 = 180 + 231 = 411.</p><p><b>After an issue.</b> 300 + 30 = 330.</p><p>Change = 330/411 − 1 = <b>−19.71%</b>.</p>`,
      check: `<p>A firm that does not issue is revealed as the high type and rises to 600, a change of +45.99%. The two moves must average to zero: 0.3 × 45.99% − 0.7 × 19.71% = 13.80% − 13.80% = 0 ✓. Also, 411 is the prior 390 plus the expected NPV actually captured, 0.7 × 30 = 21 ✓.</p>`,
      traps: [
        "Used the prior E[V] = 390 as the price before, forgetting the NPV the market already expected: 330/390 − 1 = −15.38%.",
        null,
        "Left the NPV out of the price after the issue: 300/411 − 1 = −27.01%.",
        "Counted the cash raised as the old shareholders': (300 + 150 + 30)/411 − 1 = 16.79%. The new investors paid for that 150.",
      ],
    },
    {
      id: "myers-16",
      title: "IPO arithmetic: proceeds, underpricing and the cost to the old owners",
      theory: `<p>An IPO costs the old owners twice. Issuing costs about 7% of the money raised (Kurbatov: the bank's underwriting fee of 5.3% plus 1.7% of other costs). On top, the shares are sold below the price they trade at on the first day. Kurbatov's route (PS2 Exercise 2): the first-day price tells you what the firm is worth. Take out the cash raised to find the old owners' fair price per share. Compare it with what their shares are actually worth after the IPO. Why underprice? He lists bank conflicts, control over the shareholder base, behavioural bidding and asymmetric information, the next step.</p>
<div class="formula"><div class="eq">proceeds = n × P<sub>IPO</sub> × (1 − spread) &nbsp;·&nbsp; V = (N + n) × P<sub>1</sub></div>
<div class="eq">P<sub>fair</sub> = (V − proceeds)/N &nbsp;·&nbsp; cost = (P<sub>fair</sub> − P<sub>1</sub>) × N</div>
<div class="where">N old shares, n new shares and P<sub>1</sub> the first-day closing price, taken as fair value. P<sub>fair</sub> is the price a perfect market, with no spread and no underpricing, would have given while raising the same proceeds. The cost equals the underpricing n(P<sub>1</sub> − P<sub>IPO</sub>) plus the spread.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 2</span><p>10 million old shares, 5 million new at 20, a 7% spread and a first-day price of 50.</p><p>Proceeds 5 × 20 × 0.93 = 93. V = 15 × 50 = 750. P<sub>fair</sub> = (750 − 93)/10 = 65.70. Cost (65.70 − 50) × 10 = 157 million: underpricing 5 × 30 = 150 plus the spread of 7.</p></div>`,
      q: `<p>A firm has 20 million shares and sells 8 million new shares in an IPO at 15.00. The underwriting spread is 7%. The shares close at 24.00 on the first day, which is their fair value. What is the total cost to the original owners of the spread and the underpricing, in millions?</p>`,
      options: ["260.40", "80.40", "8.40", "72.00"],
      answer: 1,
      solution: `<p>Proceeds = 8 × 15.00 × 0.93 = 111.60. V = 28 × 24.00 = 672.00.</p><p>P<sub>fair</sub> = (672.00 − 111.60)/20 = 560.40/20 = 28.02.</p><p>Cost = (28.02 − 24.00) × 20 = <b>80.40</b> million.</p>`,
      check: `<p>Split it: the new investors paid 8 × 15 = 120 for shares worth 8 × 24 = 192, an underpricing of 72.00. The spread took 0.07 × 120 = 8.40. Together 72.00 + 8.40 = 80.40 ✓. At P<sub>fair</sub> the firm would have sold 111.60/28.02 = 3.9829 million shares. Then 672/23.9829 = 28.02 ✓.</p>`,
      traps: [
        "Compared the fair price with the IPO price instead of the first-day price: (28.02 − 15.00) × 20 = 260.40. The old shares are worth 24.00 after the IPO, not 15.00.",
        null,
        "Counted only the spread of 0.07 × 120 = 8.40 and missed the underpricing.",
        "Counted only the underpricing of 8 × (24 − 15) = 72.00 and missed the spread.",
      ],
    },
    {
      id: "myers-17",
      title: "The winner's curse: why IPOs are underpriced",
      theory: `<p>Kurbatov's asymmetric-information story (lecture 6): some investors know which IPOs are good and bid only for those. Good IPOs are heavily oversubscribed, so an uninformed investor gets few shares. Bad IPOs are not, so he gets many. Priced at expected value he loses on average and would stay away. To keep him in, issuers underprice until he breaks even. Then the average IPO rises on its first day.</p>
<div class="formula"><div class="eq">break-even price: Σ s<sub>i</sub>(V<sub>i</sub> − P*) = 0 &nbsp;⟹&nbsp; P* = Σ s<sub>i</sub>V<sub>i</sub>/Σ s<sub>i</sub></div>
<div class="where">s<sub>i</sub> is the number of shares the uninformed investor receives in state i: his bid divided by the oversubscription. The average first-day return at P* is E[V]/P* − 1, which is positive although he only breaks even.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 6</span><p>Shares are worth 120 or 80, equally likely. You bid for 100 shares: good IPOs are 10 times oversubscribed and give you 10, bad ones 2 times and give you 50.</p><p>At a price of 100: (10 × 20 + 50 × (−20))/(60 × 100) = −800/6 000 = −13.33%. Break-even: (10 × 120 + 50 × 80)/60 = 5 200/60 = 86.67. Good IPOs then rise 38.46% and bad ones fall 7.69%, an average first-day return of 15.38%.</p></div>`,
      q: `<p>You bid for 100 shares in each of many IPOs. Each IPO's shares turn out to be worth 125 or 75, equally likely. Informed investors bid only for the good ones. Good IPOs are 4 times oversubscribed, so you receive 25 shares. Bad IPOs are 2 times oversubscribed, so you receive 50. Every IPO is priced the same. At what price do you, an uninformed investor, just break even on average?</p>`,
      options: ["100.00", "75.00", "108.33", "91.67"],
      answer: 3,
      solution: `<p>Break-even: 25 × (125 − P) + 50 × (75 − P) = 0.</p><p>3 125 + 3 750 = 75P, so P = 6 875/75 = <b>91.67</b>.</p>`,
      check: `<p>At 91.67 you gain 25 × 33.33 = 833.33 on the good IPOs and lose 50 × 16.67 = 833.33 on the bad ones ✓. At 100 you would earn (25 × 25 − 50 × 25)/7 500 = −8.33%. The average IPO now rises 0.5 × 36.36% + 0.5 × (−18.18%) = 9.09% on its first day: underpricing, although you only break even.</p>`,
      traps: [
        "Priced at the expected value 0.5 × 125 + 0.5 × 75 = 100 and ignored the rationing. You get twice as many bad shares as good ones.",
        "Assumed you only ever get the bad IPOs. You still receive 25 shares in each good one.",
        "Swapped the allocations to 50 good and 25 bad: (50 × 125 + 25 × 75)/75 = 108.33. Rationing hits the good IPOs, where the informed investors crowd in.",
        null,
      ],
    },
    {
      id: "myers-12",
      title: "Debt or equity: the pecking order",
      theory: `<p>The high type's loss comes from selling a claim that outsiders underprice. Risk-free debt pays the same in every state, so investors' ignorance of V cannot touch its price: it costs both types exactly I and the old shareholders keep V + NPV. Equity tracks V one for one and carries the full dilution. Hence the pecking order: internal funds first, then debt (safest first), then equity last. It rests on asymmetric information, not on taxes or inefficient markets: every price here is fair given what investors know. 2021 Problem 1 tested it with 100% debt or 100% equity and beliefs held at the prior whatever the choice. The two types then want different securities, so those fixed beliefs cannot be rational: an equity issue reveals the low type.</p>
<div class="formula"><div class="eq">Debt: V + C − I = V + NPV &nbsp;·&nbsp; Equity: (1 − α)(V + C), with α = I/(E[V] + C)</div><div class="eq">Debt − equity = α(V − E[V])</div>
<div class="where">C is the project's sure cash flow next year, so C = I + NPV with no discounting. Check that the debt is risk-free (V<sub>L</sub> + C ≥ I) before valuing it at face. The difference is positive for the high type and negative for the low type.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>H</sub> = 150, V<sub>L</sub> = 30, q = 0.5, I = 20, C = 26. E[V] = 90 and α = 20/116 = 0.172414.</p><p>High type: debt 150 + 6 = 156; equity 0.827586 × 176 = 145.66. Debt wins by 10.34 = 0.172414 × 60. Low type: debt 36; equity 0.827586 × 56 = 46.34. Equity wins.</p></div>`,
      q: `<p>A firm's assets in place are worth 240 or 60, equally likely in investors' eyes; the manager knows they are worth 240. A project costs 30 today and pays a sure 40 next year. The firm can raise the 30 with 100% equity or 100% debt. Investors keep their 50/50 beliefs whatever the firm does. Everyone is risk neutral and there is no discounting. Measured once the true value comes out, by how much is the old shareholders' payoff with debt higher than with equity?</p>`,
      options: ["22.50", "14.21", "0.00", "90.00"],
      answer: 1,
      solution: `<p><b>Debt.</b> The low state still has 60 + 40 = 100 ≥ 30, so the debt is risk-free and sells at face. Old shareholders: 240 + 40 − 30 = 250.</p><p><b>Equity.</b> E[V] = 150, so α = 30/(150 + 40) = 30/190 = 0.157895. Old shareholders: (1 − 0.157895) × (240 + 40) = 0.842105 × 280 = 235.79.</p><p>Difference = 250 − 235.79 = <b>14.21</b>. The manager borrows.</p>`,
      check: `<p>Formula: α(V<sub>H</sub> − E[V]) = 0.157895 × 90 = 14.21 ✓. Mirror: the low type gets 70 with debt and 0.842105 × 100 = 84.21 with equity, so it prefers equity by the same 14.21 (equal because q = 0.5). The fixed beliefs are therefore not rational. Once investors read an equity issue as the low type, α = 30/100 = 0.30 and the low type keeps 0.70 × 100 = 70.00, no more than with debt.</p>`,
      traps: [
        "Left the cash raised out of the equity pricing: α = 30/(150 + 10) = 0.1875, so 250 − 0.8125 × 280 = 22.50. After the issue the firm holds the sure 40, not just the NPV.",
        null,
        "Priced the equity on the true value, α = 30/280. Both routes then give 250 and the difference is 0.00, but investors cannot see the true value.",
        "Valued the old shareholders' equity at investors' beliefs: 250 − 0.842105 × 190 = 250 − 160 = 90.00. The payoff uses the true value.",
      ],
    },
    {
      id: "myers-13",
      title: "Exam level: the full template when the project is good enough",
      theory: `<p>2016 Problem 1, 2017V Problem 1 and 2020 Problem 2 are one exercise with new numbers: assets in place worth V<sub>H</sub> or V<sub>L</sub>, a project costing I with a sure payoff C, equity the only source. (a) α under the belief that the firm always issues, the payoffs and the high type's choice. (b) The same under the belief that only the low type issues. (c) With a cheaper project or a larger payoff: does the "always issues" belief now hold? Run the same four lines every time and end with check 5.</p>
<div class="formula"><div class="eq">α = I/(E[V | beliefs] + C) → payoff (1 − α)(V<sub>true</sub> + C) → compare with V<sub>true</sub> → do the types act as the belief assumes?</div>
<div class="where">C = I + NPV. Undervaluation alone predicts nothing: a large enough NPV pays for the dilution and the high type issues even though it is underpriced.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>V<sub>H</sub> = 150, V<sub>L</sub> = 50, q = 0.5, I = 30, C = 40.</p><p><b>(a)</b> E[V] = 100, α = 30/140 = 0.2143. High: (11/14) × 190 = 149.29 &lt; 150, does not issue. Low: (11/14) × 90 = 70.71 &gt; 50, issues. The belief is not rational.</p><p><b>(b)</b> α = 30/90 = 0.3333. Low: (2/3) × 90 = 60 &gt; 50, issues. High: (2/3) × 190 = 126.67 &lt; 150, stays out. Rational: a separating equilibrium that loses 0.5 × 10 = 5.00 in expectation.</p><p><b>(c)</b> The payoff rises to C = 70. α = 30/170 = 0.1765. High: (14/17) × 220 = 181.18 &gt; 150, issues. Low: (14/17) × 120 = 98.82 &gt; 50, issues. Both issue as believed: pooling, nothing is lost and an issue carries no bad news.</p></div>`,
      q: `<p>An all-equity firm's assets in place are worth 100 or 40. The manager knows which; investors put probability 0.2 on 100. A project costs 35 today and pays a sure 60 next year. The only source of money is new equity sold in a competitive market. Everyone is risk neutral and there is no discounting. Investors believe the manager always issues equity. Given that belief, which statement is correct?</p>`,
      options: [
        "The high type keeps 110.00, below the 125.00 it is worth with the project, so it does not issue and the belief is not rational",
        "At α = 0.4545 the high type keeps 87.27 against 100.00, so it does not issue and the belief is not rational",
        "At α = 0.2188 the high type keeps 125.00 against 100.00, so it issues and the belief is rational",
        "At α = 0.3125 the high type keeps 110.00 against 100.00, so it issues and the belief is rational",
      ],
      answer: 3,
      solution: `<p><b>α.</b> E[V] = 0.2 × 100 + 0.8 × 40 = 20 + 32 = 52. α = 35/(52 + 60) = 35/112 = <b>0.3125</b>.</p><p><b>Payoffs.</b> High: (1 − 0.3125) × (100 + 60) = 0.6875 × 160 = 110.00 &gt; 100, so it issues. Low: 0.6875 × 100 = 68.75 &gt; 40, so it issues.</p><p><b>Check 5.</b> Both types issue, exactly as the belief assumed. The belief is <b>rational</b>: a pooling equilibrium in which both types invest.</p><p>A separating belief would not survive here: at α = 35/100 = 0.35 the high type would keep 0.65 × 160 = 104.00 &gt; 100 and issue, contradicting it. Because an issue reveals nothing about V, it carries no bad news for the share price.</p>`,
      check: `<p>Dilution: α(V<sub>H</sub> − E[V]) = 0.3125 × 48 = 15.00 &lt; NPV = 25. Payoff: 100 + 25 − 15 = 110.00 ✓. Investors break even: 0.3125 × (0.2 × 160 + 0.8 × 100) = 0.3125 × 112 = 35.00 ✓. The high type gives up 15.00 and the low type gains 0.3125 × 12 = 3.75; 0.2 × 15.00 = 0.8 × 3.75 = 3.00 ✓.</p>`,
      traps: [
        "Compared the payoff with V + NPV = 125 instead of V = 100. Without the issue the project is lost, so the alternative is 100.",
        "Left the cash raised out of the denominator: α = 35/(52 + 25) = 0.4545, so 0.545455 × 160 = 87.27.",
        "Priced α on the high type's true value: 35/160 = 0.21875, so 0.78125 × 160 = 125.00. Investors cannot see it.",
        null,
      ],
    },
    {
      id: "myers-14",
      title: "Exam level: debt against equity with distress costs and a tax benefit",
      theory: `<p>2023 Problem 4 asked the same question per share. A firm with N shares whose true price is P<sub>H</sub> or P<sub>L</sub> trades at the average P<sub>0</sub>. It must raise I. Equity sold at P<sub>0</sub> means n = I/P<sub>0</sub> new shares, so α = n/(N + n): the template with NPV = 0. Debt is priced correctly but carries a net cost L, distress costs above the tax benefit. Managers pick the route with the higher long-run price once the truth is out.</p>
<div class="formula"><div class="eq">Equity: (N × P<sub>true</sub> + I)/(N + n) &nbsp;·&nbsp; Debt: P<sub>true</sub> − L/N</div><div class="eq">With a net tax benefit B instead of L: Debt = P<sub>true</sub> + B/N</div>
<div class="where">The overvalued type issues equity and the undervalued type borrows. That separates the types, so an equity issue drops the price to P<sub>L</sub> and a debt issue lifts it to P<sub>H</sub> − L/N. Replace L with a tax benefit and the overvalued type switches to debt once B/N exceeds its gain from equity. Then both borrow and debt signals nothing.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>N = 50 million, P<sub>H</sub> = 12 or P<sub>L</sub> = 8, equally likely, so P<sub>0</sub> = 10. I = 100 million, L = 5 million. n = 100/10 = 10 million, so 60 million shares in total.</p><p><b>(a)</b> Worth 8: equity (400 + 100)/60 = 8.3333, debt 8 − 0.10 = 7.90, so it issues equity. Worth 12: equity (600 + 100)/60 = 11.6667, debt 12 − 0.10 = 11.90, so it borrows.</p><p><b>(b) and (c)</b> An equity issue reveals the low type: the price falls from 10.00 to 8.00. A debt issue reveals the high type: the price rises to 11.90.</p><p><b>(d)</b> A tax benefit B instead: the low type borrows if 8 + B/50 &gt; 8.3333, that is B &gt; 50 × 0.3333 = 16.67 million. Above that both types borrow and the choice reveals nothing.</p></div>`,
      q: `<p>Bratt ASA has no debt and 100 million shares. Their correct value is 25.00 or 20.00 per share; investors put probability 0.4 on 25.00, so the shares trade at 22.00. The managers know the correct value is 20.00. Bratt must raise 330 million for a plant that adds exactly its cost in value. Any debt is priced correctly. New equity could be sold at 22.00. The managers maximise the long-run share price. Borrowing was expected to bring distress costs 12 million above its tax benefits. Now assume instead that there are no distress costs, only tax benefits with present value B. Above what B do the managers prefer to borrow?</p>`,
      options: ["30.00 million", "39.13 million", "38.09 million", "26.09 million"],
      answer: 3,
      solution: `<p>New shares if equity: n = 330/22 = 15 million, so 115 million in total.</p><p>Equity route: (100 × 20 + 330)/115 = 2 330/115 = 20.2609 per share.</p><p>Debt route with a tax benefit B: 20 + B/100 per share.</p><p>Borrow when 20 + B/100 &gt; 20.2609, that is B &gt; 100 × 0.260870 = <b>26.09 million</b>.</p>`,
      check: `<p>Direct route: selling 15 million shares at 22.00 that are worth 20.2609 after the issue hands the old shareholders 330 − 15 × 20.2609 = 330 − 303.91 = 26.09 million ✓. Equivalently (100/115) × 15 × (22 − 20) = (100/115) × 30 = 26.09 ✓. With the old distress cost of 12 the low type issued equity (20.2609 &gt; 19.88) and the high type borrowed (24.88 &gt; 2 830/115 = 24.6087). The two equity prices average to the market price: 0.4 × 24.6087 + 0.6 × 20.2609 = 22.00 ✓.</p>`,
      traps: [
        "Took the gross overpricing, 15 × (22 − 20) = 30.00 million. The new shares share in that gain too, so the old shareholders keep only 100/115 of it.",
        "Used the high type's loss from equity, 100 × (25 − 24.6087) = 39.13 million. The high type borrows for any B ≥ 0.",
        "Kept the distress cost of 12 million in the debt route: 26.09 + 12 = 38.09 million. The question removes it.",
        null,
      ],
    },
  ],
});

/* sjanger 10 · governance · Governance and the verbal M&A questions */
window.EDU_DATA.sjangre.push({
  id: "governance",
  num: 10,
  title: "Governance and the verbal M&A questions",
  summary: "From the agency problem and its names to monitors, boards, pay, takeovers, payout and the SEO puzzle, ending with H2024 and H2025 Exercise 2",
  chapters: [27, 26, 16, 14],
  exam: "5 of 11 papers · H2024 E2, H2025 E2 (and H2024 E1)",
  intro: `<p>Both Kurbatov papers opened with two verbal theory questions worth 12 points each. For 2026 he has said about 10 points each, that governance is pretty much always one of them and that the topics can move between questions. The second was governance both times: H2024 Exercise 2 asked for two ways to monitor the CEO, who does it and with which tools; H2025 Exercise 2 asked for three actions open to a shareholder with 5–10%. In the wrap-up lecture Kurbatov said these questions can be answered with common sense but in the course's terms. His examples: why firms merge beyond synergies, an SEO that sends the price down 12% and the four ways to use free cash flow. The ladder gives you the terms one at a time (the names of the agency problems, the four tools, the monitors, the board, pay, shareholder action, entrenchment, regulation, stakeholders, merger motives, takeover defences, who gains, payout and the SEO) and ends with the two governance exercises themselves, where your job is to pick the answer that earns full marks or to find what an answer is missing.</p>`,
  steps: [
    {
      id: "governance-1",
      title: "The agency problem and the names of the misbehaviour",
      theory: `<p>In a perfect world everyone with a claim on the firm wants the same thing and the manager maximises its value. In a listed firm the owners and the people who run it are different people. The manager has motives of his own: pay, status, job security, an easy life. Corporate governance is the set of measures that narrow the gap. Kurbatov's list of what the gap produces (lecture 1, slide 29) gives you the names to use on the exam:</p>
<ul><li><b>Empire building</b>: inefficient acquisitions and projects that make the firm bigger, not more valuable.</li><li><b>Shirking</b>: low effort, too many outside activities.</li><li><b>Entrenchment</b>: making yourself hard to replace, including manipulating reports so that problems stay hidden.</li><li><b>Private benefits</b>: perks paid for by the firm, insider trading.</li></ul>
<p>The agency cost is the value destroyed, not what the manager gains: a perk that gives him 2 and costs the firm 10 destroys 10.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO with a large cash pile buys a ski resort, a regional airline and a football club in three years. The share price falls on each announcement. The deals make the firm bigger and him more prominent, while the market says they destroy value: <b>empire building</b>. Had he used the firm's jet for family holidays instead, that would be <b>private benefits</b>.</p></div>`,
      q: `<p>A CEO has run a listed firm for twelve years. He persuades the board to require a 75% vote to remove a director. He also stops reporting the results of the division he built, which has lost money for three years. Which name fits his behaviour best?</p>`,
      options: [
        "Empire building: he grows the firm beyond the size that maximises its value",
        "Shirking: he puts too little effort into running the firm well",
        "Entrenchment: he makes himself hard to replace and hides bad news",
        "Private benefits: he consumes the firm's resources for his own gain",
      ],
      answer: 2,
      solution: `<p>Both actions protect his job rather than the firm's value. The 75% rule makes it harder for the owners to change the board that could fire him. Hiding the losing division keeps from them the information that would justify firing him. Kurbatov lists exactly this pair together: <b>entrenchment and report manipulation</b>.</p>`,
      check: `<p>Test each name against the facts. Nothing is bought, so it is not empire building. Nothing in the facts suggests low effort or perks. What the two actions share is that they lower the chance that he is replaced ✓.</p>`,
      traps: [
        "The division was built earlier; the actions in the question buy nothing new. Empire building is about acquisitions and projects that grow the firm.",
        "Rewriting the voting rule and the reporting takes effort. The problem is not how hard he works but that he shields himself from removal.",
        null,
        "No firm resources go to his personal use. Perks and insider trading are private benefits; protecting his job is entrenchment.",
      ],
    },
    {
      id: "governance-2",
      title: "The four tools: monitoring, contracts, shareholder action and regulation",
      theory: `<p>Every governance measure tries to align the manager's interests with the owners'. Kurbatov sorts the measures into four tools (lecture 13, slide 3). Name the tool before you describe it: the exam rewards naming the mechanism.</p>
<ul><li><b>Better monitoring</b>: someone watches the manager and can act on what they see. The board, large shareholders, lenders, the takeover market.</li><li><b>Better contracts</b>: the manager's pay is designed so that his payoff moves with the owners'. Performance targets, shares and options, golden parachutes.</li><li><b>Shareholder action</b>: the owners use their votes. Voting against directors, items on the agenda, coordinated voting, activist campaigns, proxy contests.</li><li><b>Regulation</b>: the state sets and enforces rules. Disclosure, independent auditors, penalties for fraud and insider trading.</li></ul>
<p>Monitoring changes what the owners know about the manager and what they can do about it. A contract changes what the manager wants.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Four measures at one firm. The board adds three directors with no ties to management: monitoring. The CEO's cash bonus is replaced by shares that vest over four years: a contract. A fund with 4% puts a proposal on the agenda of the annual meeting: shareholder action. The law requires the accounts to be checked by an independent auditor: regulation.</p></div>`,
      q: `<p>A firm's board replaces the CEO's fixed salary with restricted shares that vest over five years and are lost if he leaves early. Nothing else changes: the same board, the same owners, the same rules. Which of the four tools does this measure use?</p>`,
      options: [
        "Better contracts",
        "Better monitoring",
        "Shareholder action",
        "Regulation",
      ],
      answer: 0,
      solution: `<p>The measure changes what the CEO earns when the share price moves, so it changes what he <b>wants</b>: a <b>better contract</b>. Long vesting ties his wealth to value five years out. Losing the shares if he leaves makes walking away costly. The board decides it, but setting a contract is not monitoring: nobody watches him more closely than before.</p>`,
      check: `<p>Ask what is different the day after. The same people watch him with the same information (no change in monitoring), no owner has voted (no shareholder action) and no law has changed (no regulation). Only his payoff has changed ✓.</p>`,
      traps: [
        null,
        "The board designs the contract, but nobody observes or controls the CEO more than before. Monitoring changes who watches; this changes what he is paid for.",
        "No shareholder voted, proposed or campaigned. The board acted on its own.",
        "No law or regulator is involved. The firm chose the pay scheme itself.",
      ],
    },
    {
      id: "governance-3",
      title: "Who monitors the CEO and with which tools",
      theory: `<p>H2024 Exercise 2 asked for two ways of monitoring the CEO: <b>who</b> monitors and <b>which tools</b> they have. Kurbatov's list (lecture 13, slide 4, plus his key): the board; shareholders, especially big institutions; to a lesser degree lenders, employees and the authorities; and external monitoring by the takeover market.</p>
<table class="data"><tr><th>Monitor</th><th>Tools</th></tr>
<tr><td>Board</td><td>Hires and fires the CEO, sets pay, takes the major decisions, has the best access to reports and files</td></tr>
<tr><td>Large shareholders, institutions, activists</td><td>Request materials, put items on the ballot, vote, run activist campaigns and proxy fights</td></tr>
<tr><td>Lenders</td><td>Covenants, reporting requirements, the threat of not renewing the loan</td></tr>
<tr><td>Employees</td><td>See problems first and can blow the whistle</td></tr>
<tr><td>Authorities</td><td>Disclosure rules, fraud investigations, penalties</td></tr>
<tr><td>Takeover market</td><td>A badly run firm is cheap, so an acquirer buys it and installs better management</td></tr></table>
<p>Small dispersed shareholders rarely monitor: each would bear the whole cost and get only his small share of the gain. That is the free-rider problem.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A bank lends to a firm on condition that debt stays below 3 times EBITDA and that it receives quarterly accounts. When the CEO proposes a debt-financed acquisition that would breach the limit, the bank can refuse to waive it. Monitor: the lender. Tools: the covenant and the reporting requirement.</p></div>`,
      q: `<p>Which pairing of a monitor with its tools is correct?</p>`,
      options: [
        "Lenders: they vote against the directors at the annual shareholders' meeting",
        "The board: it launches a hostile bid for the firm to replace the CEO",
        "Small dispersed shareholders: they check each large project in detail",
        "Large institutional holders: they vote their block and run proxy fights",
      ],
      answer: 3,
      solution: `<p>A shareholder with a large block gains enough from a better-run firm to make monitoring worth its cost. Its tools are the owners' tools: <b>votes, proposals, campaigns and proxy fights</b>. This is the second channel in Kurbatov's key to H2024 Exercise 2.</p>`,
      check: `<p>Ask of each pairing whether that monitor holds that tool. Lenders hold covenants, not votes. The board can fire the CEO directly and needs no bid; a hostile bid comes from outside. A small shareholder bears the whole cost of checking a project and gets a tiny share of the gain, so he free-rides ✓.</p>`,
      traps: [
        "Lenders have no votes at the shareholders' meeting. Their tools are covenants, reporting requirements and the threat of not renewing the loan.",
        "The board can fire the CEO itself. A hostile bid is external monitoring by the takeover market: an outside acquirer buys the firm and replaces management.",
        "The free-rider problem: a holder of 0.01% pays the whole cost of checking and gets 0.01% of the gain, so he does not monitor.",
        null,
      ],
    },
    {
      id: "governance-4",
      title: "The board: independence, captive boards and staggered terms",
      theory: `<p>The board hires the executives, sets their pay and takes the major decisions. Who picks the board? Mostly the board itself, which is the first problem (lecture 13, slide 5). Directors come in three kinds:</p>
<ul><li><b>Insiders</b>: executives of the firm, who report to the CEO.</li><li><b>Gray directors</b>: outsiders with ties to the firm, such as its lawyer, its banker or a former executive.</li><li><b>Independent directors</b>: no ties. They monitor best.</li></ul>
<p>Warning signs: a <b>captive board</b> that owes its seats to the CEO and approves what he proposes; the <b>CEO as chair</b>, who then runs the body that monitors him; a <b>staggered board</b> (a US arrangement) where only part of the seats is elected each year, so replacing a majority takes several annual meetings. Size matters too: Kurbatov puts a good board at 7 to 11 members, since a very small board lacks capacity and a large one invites free riding. Directors who sit on many boards have less time to monitor.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Six directors: the CEO as chair, the CFO, a retired partner of the firm's audit firm and three with no ties. Insiders: 2. Gray: 1. Independent: 3 of 6, not a majority. If two seats were elected each year, an activist who won every contested seat would hold 2 seats after one meeting and 4 of 6, a majority, after two.</p></div>`,
      q: `<p>A US-listed firm has nine directors. The CEO chairs the board and two other executives sit on it. One director is the firm's outside lawyer, who has billed the firm for fifteen years. Five directors have no ties to the firm. The board is staggered: three seats are elected each year for three-year terms. An activist holding 8% wants a board majority that will replace the CEO. Which statement is correct?</p>`,
      options: [
        "Six of the nine directors are independent, so the board is already well placed to monitor the CEO",
        "Even if the activist wins every contested seat, it needs two annual meetings to hold a majority",
        "Insiders hold four of the nine seats, so the CEO controls the board's decisions",
        "The staggered terms slow down a hostile bid, but they do not affect a proxy fight",
      ],
      answer: 1,
      solution: `<p>A majority of nine is five seats. Only three seats are up each year. Winning all three at the first meeting gives the activist 3 seats, short of 5; the second meeting brings it to 6. So it takes <b>two annual meetings</b>, which is what Kurbatov means when he says a staggered board makes incumbents much harder to replace.</p><p>The others, counted: insiders are the CEO and two executives, 3. The lawyer is gray, 1. Independent: 5 of 9, a bare majority, with the CEO in the chair.</p>`,
      check: `<p>3 insiders + 1 gray + 5 independent = 9 ✓. Seats after one meeting: 3 &lt; 5. After two: 6 ≥ 5 ✓.</p>`,
      traps: [
        "Counted the lawyer as independent. A director paid by the firm for fifteen years is gray: 5 of 9 are independent and the CEO chairs the board.",
        null,
        "Counted the lawyer as an insider. Insiders are the CEO and two executives, 3 of 9, short of control.",
        "A staggered board slows any change in the board majority, by vote or by bid. A proxy fight to replace directors runs into the same three-seats-a-year limit.",
      ],
    },
    {
      id: "governance-5",
      title: "Pay for performance: why targets make the manager short-sighted",
      theory: `<p>Is a perfect contract possible? Kurbatov's slide on pay (lecture 13, slide 7) lists the pieces: performance targets, stock-based pay, golden parachutes. Each helps and each can backfire. Pay tied to the share price over many years aligns the CEO with the owners. Pay tied to a short-term number, a KPI such as this year's earnings per share (EPS), invites him to move the number rather than the value. The classic case is a buyback paid with cash: it raises EPS whenever the earnings yield is above the interest the cash earned, while under MM the share price does not move.</p>
<div class="formula"><div class="eq">EPS after = (Earnings − r × Cash)/(N − Cash/P)</div>
<div class="where">Cash is the amount spent on the buyback, r the rate it earned, N the number of shares before and P the price paid per share. No taxes. Under MM the price after the buyback is still P: the owners are no richer even though EPS rose.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Earnings 300, of which 20 is interest on cash of 500 at 4%. N = 100 shares at P = 40, so EPS = 3.00. The CEO's bonus pays out if EPS reaches 3.20.</p><p>He spends the 500 on a buyback: 500/40 = 12.5 shares. Earnings 300 − 20 = 280 over 87.5 shares: EPS = 3.20. The bonus is paid. Equity value 4 000 − 500 = 3 500 over 87.5 shares = 40: the price has not moved.</p></div>`,
      q: `<p>A firm earns 600 a year, of which 60 is interest on cash of 1 200 at 5%. It has 250 shares at a price of 40. There are no taxes and markets are perfect. The CEO uses all the cash to buy back shares at 40. What is EPS after the buyback? Give four decimals.</p>`,
      options: ["2.7273", "2.4545", "2.4000", "2.1600"],
      answer: 1,
      solution: `<p>Shares bought: 1 200/40 = 30, so 250 − 30 = 220 remain.</p><p>Earnings lose the interest on the cash: 600 − 0.05 × 1 200 = 600 − 60 = 540.</p><p>EPS = 540/220 = <b>2.4545</b>, up from 600/250 = 2.4000.</p><p>The price stays at 40: equity was 250 × 40 = 10 000, the firm paid out 1 200 and 8 800/220 = 40. EPS rose 2.27% while the owners gained nothing. A bonus on an EPS target pays the CEO for a move that creates no value. It can also make him prefer such moves to a long-term project that would lower this year's EPS.</p>`,
      check: `<p>EPS rises because the earnings yield, 600/10 000 = 6%, is above the 5% the cash earned. Had the cash earned 6%, the lost interest would be 72 and EPS = 528/220 = 2.4000, unchanged ✓.</p>`,
      traps: [
        "Forgot that the cash stops earning interest once it is spent: 600/220 = 2.7273.",
        null,
        "Assumed EPS cannot change because value does not change under MM. The price stays at 40, but EPS rises.",
        "Took out the interest but kept 250 shares: 540/250 = 2.1600.",
      ],
    },
    {
      id: "governance-6",
      title: "Shareholder action, the free-rider problem and proxy advisers",
      theory: `<p>When the board does not act, the owners can (lecture 13, slide 8): vote no on directors or pay, put items on the agenda of the annual meeting, coordinate their votes, run an activist campaign or a proxy contest with their own candidates for the board. Each costs money and time, while the gain goes to all owners. So only a holder with a large enough stake acts:</p>
<div class="formula"><div class="eq">act if α × ΔV &gt; C</div>
<div class="where">α is the fraction of the shares you own, ΔV the increase in firm value the action would bring and C its cost to you.</div></div>
<p>Most institutions hold hundreds of firms and cannot study every ballot. They buy research and voting recommendations from <b>proxy advisers</b> such as ISS and Glass Lewis. Many simply follow them (slide 9). Kurbatov asks whether that is optimal: it is cheap, but one standard policy then decides votes at thousands of firms, whatever the facts at each.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A campaign to replace a weak CEO would raise firm value by 200 and cost 6. A fund with 5% gains 0.05 × 200 = 10 &gt; 6 and acts. A holder of 1% gains 2 &lt; 6 and free-rides. The voting data Kurbatov showed (Broadridge, 2024 season) fit the picture: retail investors held 31.7% of the shares but voted only 29.8% of them. Directors received 91.2% support on average.</p></div>`,
      q: `<p>A pension fund owns shares in 3 000 listed firms. At each annual meeting it votes as ISS recommends. What is the best description of this practice?</p>`,
      options: [
        "ISS holds large stakes itself, so its own votes decide most director elections",
        "The fund saves little, since retail investors cast most of the votes anyway",
        "It solves the free-rider problem, since ISS bears the cost of a proxy fight",
        "Cheap voting at thousands of firms, but one standard policy replaces local judgment",
      ],
      answer: 3,
      solution: `<p>The fund holds small stakes in very many firms, so studying every ballot would cost more than its share of the gain: α × ΔV &lt; C at each firm. Buying a recommendation spreads the cost of research over all of the adviser's clients. The price is that the vote follows one standard policy rather than the facts at each firm. Many funds following the same adviser also give it influence without ownership. That is Kurbatov's question whether it is optimal.</p>`,
      check: `<p>ISS distributes materials and issues recommendations; it does not own the shares or vote them. Retail investors voted only about 30% of their shares in 2024, so the institutions' votes carry most elections. The advice behind those votes matters for the same reason ✓.</p>`,
      traps: [
        "Proxy advisers own no stakes. They sell research and recommendations; the votes are cast by the funds that follow them.",
        "Retail investors voted only 29.8% of their shares in 2024. Institutions cast most votes, which is why their advisers matter.",
        "ISS recommends; it does not run campaigns or proxy fights. The fund still bears none of the cost of acting, so the free-rider problem remains.",
        null,
      ],
    },
    {
      id: "governance-7",
      title: "Entrenchment and the cost of monitoring too hard",
      theory: `<p>Managers resist being monitored (lecture 13, slide 15). They adopt anti-takeover provisions that block external monitoring, protect a friendly board with staggered terms and negotiate golden parachutes. Each makes them harder to remove: <b>entrenchment</b>. The cure is not maximal control. Kurbatov's trade-off: "a manager who is monitored too strongly will be too passive". A CEO who is second-guessed on every decision and fired after one bad outcome avoids risky projects, even those with positive NPV, because he carries the blame for a failure and gets little of the gain. Good governance picks a point between freedom for the manager and tight control (slide 18).</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A project costs 100 and pays 300 or 0 with equal probability: NPV = 0.5 × 300 − 100 = 50 (no discounting). Under a board that fires the CEO after a loss, he loses his job with probability 0.5. If the job is worth more to him than his share of the 50, he turns the project down and the owners lose 50.</p></div>`,
      q: `<p>A new board requires its approval for every project above a small limit and announces that it will replace the CEO after a quarter with a loss. What is the most likely effect on the firm?</p>`,
      options: [
        "He passes up risky positive-NPV projects, since one visible loss costs him his job",
        "The CEO works harder, since more monitoring brings more effort and more value",
        "Value rises, since the board now captures the private benefits the CEO enjoyed",
        "Little changes, since a closely watched CEO already acts for the owners",
      ],
      answer: 0,
      solution: `<p>The rule punishes a visible failure hard and rewards success little. A risky project with positive NPV can lose money in some quarter. The CEO now carries that risk with his job while the owners keep the gain. He chooses safe, low-value projects instead: the passivity Kurbatov warns about. Tighter control buys less shirking at the cost of less risk-taking, so past some point it lowers value.</p>`,
      check: `<p>Run the example: a project with NPV 50 and a 50% chance of a loss is rejected by a CEO who loses his job on a loss. The owners lose 50 of value, so the rule destroys value even though it may reduce shirking ✓.</p>`,
      traps: [
        null,
        "Assumed effort keeps rising with monitoring. Past some point the CEO protects himself by taking less risk. Value falls.",
        "The rule does not target perks; it targets losses. Losses from good risky projects are what the CEO now avoids.",
        "Monitoring changes behaviour; that is its purpose. Here it changes it in the wrong direction, towards safe projects.",
      ],
    },
    {
      id: "governance-8",
      title: "Regulation: Sarbanes-Oxley and Dodd-Frank",
      theory: `<p>The state can make monitoring easier by law (lecture 13, slide 17). Kurbatov's US history: the Insider Trading Sanctions Act of 1984 focused on punishing insiders. In the early 2000s came a wave of managerial abuse and fraud, with Enron as the landmark case ($11 billion in shareholder losses). The response came in two acts:</p>
<ul><li><b>Sarbanes-Oxley (SOX, 2002)</b>: independent auditors, enhanced disclosure and corporate responsibility, meaning that top executives answer personally for the accounts.</li><li><b>Dodd-Frank (2010)</b>: many provisions for financial stability and, for governance, independent compensation committees and a legal basis for letting large shareholders nominate directors (proxy access). That last point is simplified: Dodd-Frank gave the SEC the power to write the rule, a court struck the SEC's rule down in 2011 and proxy access later spread firm by firm through shareholder proposals.</li></ul>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Enron hid debt in entities off its balance sheet while its auditor also earned large consulting fees from it. SOX attacks both sides: the auditor must be independent of the firm it audits. The CEO and CFO certify the accounts personally.</p></div>`,
      q: `<p>Which pairing of each act with its governance provisions is correct?</p>`,
      options: [
        "SOX: independent pay committees, board nominations by large holders. Dodd-Frank: independent auditors, more disclosure",
        "SOX: penalties for insider trading. Dodd-Frank: independent auditors, more disclosure",
        "SOX: independent auditors, more disclosure. Dodd-Frank: independent pay committees, nominations by large holders",
        "SOX: independent auditors, more disclosure. Dodd-Frank: penalties for insider trading",
      ],
      answer: 2,
      solution: `<p>SOX answered the accounting frauds of the early 2000s, so it targets the numbers: <b>independent auditors, enhanced disclosure and personal responsibility for the accounts</b>. Dodd-Frank came after the financial crisis and, among many stability rules, strengthened shareholders against the board: <b>independent compensation committees and a legal basis for board nominations by large shareholders</b>.</p>`,
      check: `<p>Dates: the act built around insider-trading penalties came in 1984, long before either act. The order of the problems, fraud first and the financial crisis second, matches the order of the acts ✓.</p>`,
      traps: [
        "Swapped the two acts. Auditors and disclosure are SOX, the response to Enron; pay committees and nominations are Dodd-Frank.",
        "Insider-trading penalties were the focus of the 1984 Sanctions Act. SOX raised some penalties too, but its core is auditors and disclosure, which belong to SOX, not Dodd-Frank.",
        null,
        "Gave Dodd-Frank the insider-trading focus of the 1984 act. Its governance provisions are pay committees and nominations by large holders.",
      ],
    },
    {
      id: "governance-9",
      title: "Shareholders or stakeholders?",
      theory: `<p>Most governance measures make managers accountable. To whom? Mostly to shareholders. The <b>stakeholder view</b> says the firm should also weigh employees, communities, customers and suppliers. Milton Friedman (1970) argued that a manager who spends on "social responsibility" spends the owners' money on goals they did not choose; the owners can support causes themselves. Kurbatov's criticism of the stakeholder view: <b>too many missions, conflicting interests</b>, so a manager who answers to everyone can justify any choice. The debate is open and culture plays a role (lecture 1, slides 31–32). The Stanford survey of 209 CEOs and CFOs (2019): 89% say stakeholder interests are important in their planning, 23% say shareholder interests are significantly more important. Employees are seen as the most important stakeholders.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO spends 50 of the firm's money on a sponsorship he likes and calls it CSR (corporate social responsibility). If it raises sales by more than 50 in present value, it is ordinary marketing that creates value. Both views approve. If it does not, Friedman would say the CEO taxed the owners for his own preference. The stakeholder critique would add that the CSR label makes him hard to hold to account.</p></div>`,
      q: `<p>A CEO keeps an unprofitable plant open to protect local jobs. The owners lose 30 in present value. Which statement applies Friedman's argument correctly?</p>`,
      options: [
        "It is justified, since the Stanford survey shows that 89% of CEOs see stakeholders as important",
        "It is part of his duty, since Friedman counts social responsibility as part of the job",
        "It is justified if the employees at the plant outnumber the firm's shareholders",
        "He spends the owners' 30 on a goal they did not choose; they could fund it themselves",
      ],
      answer: 3,
      solution: `<p>Friedman's point is about whose money is spent. The 30 belongs to the shareholders. The CEO is their agent. Spending it on a social goal is a decision the owners can make for themselves, with their own money, if they share the goal. The survey describes what CEOs believe; it does not settle whose money it is.</p>`,
      check: `<p>The stakeholder critique reaches the same place from another side: with jobs as a second mission, the owners cannot tell a social choice from a bad decision. Neither argument depends on how many people are affected ✓.</p>`,
      traps: [
        "Took a survey of what CEOs believe as an argument for what they should do. The survey says nothing about whose money it is.",
        "Reversed Friedman: he argued that the manager's responsibility is to the owners. Spending their money on social goals is not his decision.",
        "Counted heads. Friedman's argument is about who owns the money, not how many people are affected.",
        null,
      ],
    },
    {
      id: "governance-10",
      title: "Why firms merge: synergies and the other motives",
      theory: `<p>Kurbatov's list of merger motives (lecture 12, slide 4): economies of scale and scope, supply chain optimisation, complementary goods, industry consolidation and market power, changes in corporate control, EPS manipulation and manager ambitions. The first three are <b>synergies</b> in the narrow sense: the combined firm produces more or at lower cost than the two apart. H2024 Exercise 1 banned "synergies" as an answer, yet the key accepted economies of scale and supply-chain gains when they were explained: name the specific source, not the word. Mergers also have costs: integration can damage the corporate culture or a unique management vision. Long-term plans can also be bent towards immediate returns.</p>
<div class="formula"><div class="eq">(A + T + S) − (A + T) = S</div>
<div class="where">A and T are the acquirer's and the target's values before the deal and S the synergy (lecture 12, slide 13). The economic gain from the merger is S. A motive that adds no S can still raise a number such as EPS.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: EPS manipulation</span><p>Acquirer: earnings 100, 100 shares at 20 (P/E 20). Target: earnings 50, value 500 (P/E 10). The acquirer issues 500/20 = 25 shares to pay. With no synergy, combined earnings of 150 over 125 shares give EPS 1.20, up from 1.00. Combined value 2 000 + 500 = 2 500 over 125 shares: still 20 per share. EPS rose 20% and nobody is richer; the P/E fell from 20 to 16.67.</p></div>`,
      q: `<p>Which merger motive creates no value for anyone, not even at someone else's expense?</p>`,
      options: [
        "Economies of scale: spreading fixed costs over more output cuts the cost per unit",
        "EPS manipulation: buying a firm with a lower P/E lifts the combined earnings per share",
        "Change of control: new managers raise the profit margin on the target's assets",
        "Market power: with fewer rivals the merged firm can raise its prices",
      ],
      answer: 1,
      solution: `<p>Buying a firm with a lower P/E than your own raises combined EPS by arithmetic alone: you issue a few expensive shares for a lot of cheap earnings. Value per share does not change, so the higher EPS is matched by a lower P/E. That is <b>EPS manipulation</b>, also called bootstrapping.</p>`,
      check: `<p>For each motive, ask who gains. Economies of scale lower costs: S &gt; 0. Better management raises the cash flows from the target's assets. Market power raises profits at the customers' expense: a gain for shareholders, a loss for others. EPS manipulation gains nobody: 2 500/125 = 20 per share before and after ✓.</p>`,
      traps: [
        "Economies of scale lower costs and create real value. It is a synergy. The H2024 key accepted it when explained.",
        null,
        "Better management raises the cash flows from the target's assets: a real gain from a change of control, not a cosmetic number.",
        "Market power raises profits. The gain is real for shareholders even though customers pay for it.",
      ],
    },
    {
      id: "governance-11",
      title: "Hostile takeovers, defences and the threat of a bid",
      theory: `<p>A hostile bidder goes over the board's head and offers to buy the shares directly. Kurbatov's two sides (lecture 12, slide 11): a takeover can bring new management and new ideas. <b>Even the threat</b> of one disciplines current managers, because a badly run firm is cheap to buy. But a takeover can also disrupt operations and endanger soft assets such as the corporate culture. The threat can also push managers to entrench themselves with defences (slide 29): poison pills, staggered boards and supermajority rules in the charter; scorched earth, selling or destroying the asset the bidder wants; a white knight, a friendlier bidder; greenmail, buying back the raider's block at a premium; regulatory barriers; golden parachutes. The charter defences are features of US firms. The key question: does a defence raise value by letting the board bargain for a higher price, or does it protect the managers?</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A bidder offers 50 for a target trading at 40. The board adopts a poison pill, negotiates and recommends a revised offer of 56. The pill won the target's owners 6 a share: bargaining. Had the board kept the pill and refused every offer, the owners would have lost the premium of 10 on the table: entrenchment.</p></div>`,
      q: `<p>A US firm receives a bid at a 30% premium. Which response points to entrenchment rather than bargaining for a better price?</p>`,
      options: [
        "The board uses a poison pill to make the bidder raise its offer, then recommends the higher bid",
        "The board invites a white knight, a second bidder who pays more than the first",
        "The board refuses to talk, adds a staggered board and the share price falls on the news",
        "The board delays its recommendation by two weeks to get an outside opinion on the price",
      ],
      answer: 2,
      solution: `<p>A defence serves the owners when it gets them a better deal and serves the managers when it removes the deal. Refusing to talk and adding a staggered board removes this bid and weakens the threat of the next one; the falling price is the market's verdict that the owners lost the premium. That is <b>entrenchment</b>.</p>`,
      check: `<p>Ask what the owners end up with. A higher bid or a rival bid: more than 30%. A short delay for an outside opinion: the same bid, better informed. Refusal plus a new defence: no premium and a lower price ✓.</p>`,
      traps: [
        "A pill used to extract a higher price that the board then accepts is the bargaining case: the owners get more.",
        "A white knight who pays more gives the owners a better price. That is bargaining, even though the first bidder loses.",
        null,
        "A short delay to check the price is ordinary diligence. The bid stays on the table.",
      ],
    },
    {
      id: "governance-12",
      title: "Who gains from a merger and what paying in shares signals",
      theory: `<p>Announcement returns tell you who gains (lecture 12, slide 12): targets earn about <b>15%</b> abnormal return on average, acquirers about <b>1%</b> on average and a negative return in about half the cases. The two combined earn about <b>1–3%</b>, mostly positive. So mergers usually create value, most of it going to the target's shareholders. The premium offered over the market price, often 20–40%, is a different number from the abnormal return; keep them apart.</p>
<p>How the acquirer pays matters too (slides 24–25): time pressure, the acquirer's liquidity and debt capacity, who has better information, uncertainty about the synergies, the sellers' need for cash and their taxes. In a stock swap the target's owners receive a fraction y of the combined firm, so the acquirer's true cost is y(A + T + S) − T. The ratio y is set at market prices, so if the market overprices the acquirer, its true A is lower than the price says and the true cost falls. An acquirer that thinks its shares are overvalued prefers to pay in stock and one that thinks they are cheap pays cash. Investors know this, so the choice reveals information.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Acquirer worth 6 000, target worth 1 500. On the announcement the target rises 16% and the acquirer falls 0.5%. Target gain: 0.16 × 1 500 = 240. Acquirer loss: 0.005 × 6 000 = 30. Combined: 210 on 7 500, or 2.80%. Value is created; the target's owners get more than all of it.</p></div>`,
      q: `<p>An acquirer worth 9 000 announces that it will buy a target worth 3 000 and pay entirely in its own shares. On the announcement the target's price rises 18% and the acquirer's falls 2%. Which statement is consistent with the course?</p>`,
      options: [
        "Combined value rose 3.00%; paying in stock hints the acquirer sees its shares as overvalued",
        "Combined value fell, since the acquirer's 2% loss is on a firm three times the target's size",
        "The deal destroys value because the acquirer's price fell; the payment method is beside the point",
        "Combined value rose 16.00%; paying in shares signals that the acquirer sees its shares as cheap",
      ],
      answer: 0,
      solution: `<p>Weight the returns by value. Target: 0.18 × 3 000 = +540. Acquirer: −0.02 × 9 000 = −180. Combined: +360 on 12 000 = <b>+3.00%</b>, at the top of Kurbatov's 1–3% range, with the target's owners taking more than all of it. The acquirer's fall fits the stock payment: a swap is cheapest for an acquirer whose shares are overpriced, so investors read a stock offer as a hint that they are and mark the shares down.</p>`,
      check: `<p>The pattern, a large gain for the target, a small loss for the acquirer and a small positive total, is the typical one on slide 12. Three times the size at 2% is 6% of the target's value, well below its 18% gain, so the total must rise ✓.</p>`,
      traps: [
        null,
        "The acquirer's loss of 180 is smaller than the target's gain of 540, even though the acquirer is three times as big. Weight by value before you compare.",
        "The acquirer's return is not the deal's value: weighted, the total is +360. And the choice of payment does carry information.",
        "Added the percentages, 18% − 2% = 16%, without weighting them. The signal is also reversed: an acquirer that thinks its shares are cheap pays cash.",
      ],
    },
    {
      id: "governance-13",
      title: "Four ways to use free cash flow",
      theory: `<p>A firm with free cash flow has four choices (lecture 14, slide 14): pay a <b>dividend</b>, <b>buy back</b> shares, <b>hold</b> the cash or <b>reinvest</b> it. In a perfect market the choice is irrelevant. In practice each has a governance side. Holding cash avoids the cost of raising capital, makes distress less likely and avoids the costs of asymmetric information, but it gives no tax advantage and makes it harder to keep the manager disciplined. Reinvesting sounds good, but without positive-NPV projects it becomes <b>empire building</b>. Dividends are <b>sticky</b>: managers smooth them and are reluctant to cut them, so a dividend is a commitment and a cut is punished. A buyback is flexible and can <b>signal</b> that management thinks the shares are undervalued (lecture 5, slides 20–24). Kurbatov named this topic as a possible theory question in the wrap-up.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm earns a one-off windfall of 200 on top of its usual 100 a year. Raising the dividend from 100 to 300 would commit it to a level it cannot keep; the later cut would be read as bad news. A buyback of 200 pays the windfall out once. Investors may read it as a sign that the shares are cheap.</p></div>`,
      q: `<p>A mature firm generates 400 of free cash flow a year and has no projects with positive NPV. Its CEO, who owns 0.2% of the shares, wants to "reinvest all of it to grow". Which statement is right?</p>`,
      options: [
        "Paying it out is best: without positive-NPV projects, reinvesting is empire building",
        "Reinvesting is best, since cash kept inside the firm saves the cost of raising capital later",
        "Holding the cash is best, since a cash buffer makes financial distress less likely",
        "Under MM the use of cash is irrelevant, so the CEO's plan leaves firm value unchanged",
      ],
      answer: 0,
      solution: `<p>With no positive-NPV projects, every reinvestment has negative NPV, so "growth" here means a bigger firm that is worth less: <b>empire building</b>, the use Kurbatov flagged. A dividend or a buyback takes the cash out of the manager's hands. With 0.2% of the shares the CEO bears almost none of the loss while he gains the size: the agency problem in miniature.</p>`,
      check: `<p>MM's irrelevance holds the investment policy fixed: it compares ways of paying out, not paying out against wasting the money. Holding the cash is not free either: no tax advantage and less discipline ✓.</p>`,
      traps: [
        null,
        "Saving future issue costs is a real benefit of retention, but it cannot justify investing now in projects with negative NPV.",
        "A buffer does lower distress risk, but cash brings no tax advantage and weakens the manager's discipline, the very problem in this firm.",
        "MM's payout irrelevance assumes the investment policy is fixed. Spending the cash on negative-NPV projects destroys value.",
      ],
    },
    {
      id: "governance-14",
      title: "Exam level: an equity issue and a 12% fall in the share price",
      theory: `<p>Kurbatov's own example of a theory question: the firm announces a seasoned equity offering (SEO) and its share price falls 12%. What are the potential reasons? What would have been better? About five sentences. The course gives you the pieces:</p>
<ul><li><b>Asymmetric information</b>: managers know more than investors and prefer to issue equity when they think the shares are overvalued. An issue is a signal. Investors mark the price down (lecture 6, slides 33–37).</li><li><b>Pecking order</b>: internal cash first, then debt, then equity. Choosing equity also tells investors that the cheaper sources were not available, for instance no spare debt capacity.</li><li><b>Agency</b>: fresh cash in the hands of a manager with no good projects invites empire building.</li><li><b>Issue costs</b>: fees of a few per cent of the money raised (Kurbatov quotes 5.3% + 1.7% for a US IPO), small relative to the value of the whole firm.</li></ul>
<p>Better alternatives: retained earnings or debt, or a rights offer to the existing shareholders, which costs less and is underpriced less (slide 31).</p>`,
      example: `<div class="worked"><span class="wh">Example: Kurbatov's numbers</span><p>A firm is worth 140 or 40 with equal probability. It can invest 8 today to get 10 tomorrow. Outsiders value it at 100 after the investment, so selling 8% raises 8. If insiders know it is worth 140, the old shareholders get 0.92 × 150 = 138 &lt; 140, so they would not issue. If it is worth 40, they get 0.92 × 50 = 46 &gt; 40: they issue. The firm that wants to issue is the overvalued one, so an issue is bad news.</p></div>`,
      q: `<p>Your firm announces an SEO and its share price falls 12%. Which five-sentence answer to "what are the potential reasons and what would have been better?" earns full marks?</p>`,
      options: [
        "The new shares dilute the old ones: the same earnings are shared by more shares, so each is worth less. The firm should have split the issue into several smaller ones over time.",
        "Investors suspect that managers issue because they see the shares as overvalued and that the firm lacks cheaper funding. The fresh cash may also be wasted on poor projects.",
        "Investors infer that managers issue because the shares are overpriced and that cheaper funds ran out. Better: use retained cash, then debt, or a rights offer.",
        "The bank's fees of about 7% of the proceeds explain the fall. The firm should have issued more shares in one go, so that the fixed fees were spread over a larger amount.",
      ],
      answer: 2,
      solution: `<p>The question has two parts. A full answer does both. The reasons: <b>adverse selection</b> (managers issue when the shares are overpriced, so investors lower the price) and what choosing equity says about the alternatives (no spare cash or debt capacity), possibly with agency (cash for a manager with no good projects). The alternative: <b>follow the pecking order</b>, internal funds and then debt, or use a rights offer. The answer that gives sound reasons and stops there loses about half the points.</p>`,
      check: `<p>Size test for the fee story: fees of 7% on an issue worth 20% of the firm cost about 0.07 × 20% = 1.4% of firm value, far below 12%. The fall is about information, not fees ✓.</p>`,
      traps: [
        "The dilution fallacy: new shares sold at a fair price bring in cash worth what they cost, so they do not dilute value. Splitting the issue changes nothing.",
        "Good reasons, but the question also asks what would have been better. Without an alternative, half the answer is missing.",
        null,
        "Fees are a few per cent of the money raised, a small fraction of firm value. And a larger equity issue makes the signal worse, not better.",
      ],
    },
    {
      id: "governance-15",
      title: "Exam level: two ways to monitor the CEO, who and with what",
      theory: `<p>H2024 Exercise 2 (12 points): select and describe two distinct ways of monitoring the CEO, explain who monitors and which tools they have, 3–4 sentences per method. Kurbatov's key lists four channels: the <b>board</b> (takes the key decisions including hiring and firing the CEO and has the best access to reports and files; independent directors monitor best); <b>shareholders</b> (request materials, submit items to the ballot and, if ignored, start activist campaigns and proxy fights); the <b>government</b> (legislation and monitoring systems such as anti-fraud services); <b>external monitoring</b> (a badly performing firm can be bought by a competitor who installs better management). Two groups described in enough detail earn full points. Three things lose points: two methods that are really one (the board and its pay committee), a method without its monitor or its tools and a general essay on governance.</p>`,
      example: `<div class="worked"><span class="wh">Example: one method in full detail</span><p><b>Lenders.</b> Banks and bondholders monitor because they lose if the firm fails. Their tools are covenants (limits on debt, payouts and asset sales), regular financial reports and the threat of not renewing the loan. A CEO who wants a risky acquisition must first persuade the lender to waive the covenant.</p></div>`,
      q: `<p>Which answer to H2024 Exercise 2 would earn full marks?</p>`,
      options: [
        "1. The board: it is elected by the shareholders and monitors the CEO on their behalf, which is central to good governance in any listed firm. 2. The board's pay committee: it sets the CEO's pay so that he works harder.",
        "1. Shareholders: if they are unhappy with the CEO, they can sell their shares. 2. Norwegian company law: under the ASA rules the general meeting can remove the directors.",
        "1. Corporate governance aligns managers with shareholders through monitoring, contracts and regulation. 2. Monitoring matters because of the agency problem between owners and managers.",
        "1. The board, via its independent directors: hires and fires the CEO, sets his pay, sees internal reports. 2. Large shareholders: request materials, file ballot items, run campaigns and proxy fights.",
      ],
      answer: 3,
      solution: `<p>The winning answer names two distinct monitors and gives each its tools, which is what the key asks: the board (independent directors, hiring and firing, pay, access to reports) and large shareholders (materials, ballot items, campaigns, proxy fights). The board and its pay committee count as one method. Saying that the board "monitors" names no tool. A general paragraph on governance answers a question that was not asked. Selling shares is exit, not monitoring the CEO. The exercise names no country, so one country's company law is beside the point.</p>`,
      check: `<p>Run the key's two tests on each method: is the monitor named? Are its tools named? The winning answer passes both tests for both methods; each of the others fails at least one ✓.</p>`,
      traps: [
        "The board and its pay committee are one method. The first item also names no tools. The key wants two distinct groups described in detail.",
        "Selling the shares is exit, not monitoring the CEO. The exercise names no jurisdiction either. Neither item describes a monitor with its tools.",
        "A general account of governance names no monitor and no tools. It answers a question that was not asked.",
        null,
      ],
    },
    {
      id: "governance-16",
      title: "Exam level: three actions for a shareholder with 5–10%",
      theory: `<p>H2025 Exercise 2 (12 points): you hold 5–10% of a firm whose management exerts low effort and enjoys private benefits; select three actions, 2–3 sentences each, 4 points each. Kurbatov's key accepts any reasonable action with an explanation, for example active monitoring, an activist campaign, making the board more independent by replacing insider directors, a better pay contract, voting or pressing to fire the manager, an LBO that replaces the manager, finding an acquirer that would save the firm, or legal action if there is good evidence of misbehaviour. As a bonus for creativity it also accepts exiting by selling the shares. A full-mark action says <b>what</b> you do, <b>through which channel</b> and <b>why it changes the manager's behaviour</b>. It also uses the size of your stake: large enough to make acting worth its cost, too small to decide alone.</p>`,
      example: `<div class="worked"><span class="wh">Example: one action in full detail</span><p><b>A pay contract with long-term shares.</b> Through the compensation committee, or by voting down the current pay plan, I push for restricted shares that vest over several years. The CEO's wealth then moves with firm value, so shirking and perks cost him personally. With 5–10% my vote carries weight in the pay vote, more so with support from other institutions.</p></div>`,
      q: `<p>A student answers H2025 Exercise 2 as follows.</p><p>"1. I vote against re-electing the directors at the annual meeting, because they have let management shirk. With 5–10% my votes carry weight. I can also persuade other institutions to vote the same way.</p><p>2. I run a proxy fight: I nominate my own candidates for the board and ask the other shareholders to vote for them. A new board can then replace the CEO.</p><p>3. I write a letter to the CEO asking him to work harder and cut his perks. He will see that a large shareholder is watching."</p><p>What is the main weakness of the answer?</p>`,
      options: [
        "It cites no Norwegian company law, which the key expects in governance answers",
        "The first two actions overlap heavily; the letter has no tool behind it",
        "It leaves out selling the shares, which the key expects as one of the three",
        "Three actions are one too many; the key gives full marks for two explained ones",
      ],
      answer: 1,
      solution: `<p>Each action is explained and the stake is used, so the answer is not weak on form. Its weaknesses are two. Voting against the directors and running a proxy fight to replace them both aim at the same result, a new board through the shareholder vote, so a grader may read them as one action. And the letter has no tool behind it: nothing in it changes what the CEO earns or risks, so "he will see" is hope, not a mechanism. Fix both: keep one of the voting actions and add a channel with teeth, for example a pay contract with long-vesting shares or replacing insider directors with independent ones.</p>`,
      check: `<p>The key accepts any reasonable action with an explanation, so how many points the overlap costs depends on the grader; the letter is the clearer weakness, since it explains no mechanism. Three plainly distinct channels, each explained, remove both risks and leave nothing for the grader to discount ✓.</p>`,
      traps: [
        "The exercise names no country. Answer in general terms and bring in national company law only when the exercise says the firm is, for example, a Norwegian ASA.",
        null,
        "Exit is a bonus for creativity in the key, not a requirement. Three well-explained actions earn full marks without it.",
        "The exercise asks for three actions at 4 points each. Two actions can earn at most 8 of 12.",
      ],
    },
  ],
});

/* sjanger 101 · d3-paritet · Payoffs and put-call parity */
window.EDU_DATA.sjangre.push({
  id: "d3-paritet",
  num: 101,
  title: "Payoffs and put-call parity",
  summary: "From one payoff and the hedges firms buy to parity, the missing price over six months and the trade that earns a parity gap",
  chapters: [21],
  exam: "4 of 11 papers · 2023 MC9–10, V2024",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>Put-call parity has come in 4 of 11 papers, usually as three prices given and the fourth asked for. It is not on the formula sheet. Kurbatov added two habits in the lectures: the call price is usually given and the put follows from parity; a six-month option means dividing by √(1 + r<sub>f</sub>). This ladder starts from one payoff and the hedges firms buy, builds parity and ends with the twists the exam adds. At the top you can find a missing price over any horizon and say which trade earns the gap when quotes break parity.</p>`,
  steps: [
    {
      id: "d3-paritet-1",
      title: "Payoff and profit: a payoff is never negative",
      theory: `<p>A call is the right to buy one share at the strike K on the expiry date; a put is the right to sell one at K. The holder decides after seeing the share price S<sub>T</sub> and exercises only when it pays, so the payoff can never be negative. Kurbatov calls zero "the natural border". The profit subtracts the premium paid today. The writer gets the mirror image of the holder.</p>
<div class="formula"><div class="eq">Call payoff = max(S<sub>T</sub> − K, 0) &nbsp;&nbsp; Put payoff = max(K − S<sub>T</sub>, 0)</div><div class="eq">Profit = payoff − premium</div>
<div class="where">The exercise decision looks only at S<sub>T</sub> and K, never at the premium: the premium is paid whatever you do. European options are exercised only at expiry.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The holder owns a choice. A choice can only add. In bad states you walk away with zero; in good states you collect. That one-sided payoff is why an option costs money today.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A call with K = 40 costs 3.</p><p>S<sub>T</sub> = 48: payoff 8, profit 8 − 3 = 5. S<sub>T</sub> = 41: payoff 1, profit 1 − 3 = −2. You still exercise: 1 beats 0 and the 3 is gone either way. S<sub>T</sub> = 35: payoff max(35 − 40, 0) = 0, profit −3, the whole premium.</p></div>`,
      q: `<p>You bought a one-year European call with strike K = 250 for a premium of 18. At expiry the share trades at 262. What is your profit?</p>`,
      options: ["−6.00", "12.00", "−18.00", "6.00"],
      answer: 0,
      solution: `<p>Payoff = max(262 − 250, 0) = 12. You exercise: buying at 250 a share worth 262 gives 12, better than 0.</p><p>Profit = 12 − 18 = <b>−6.00</b>.</p>`,
      check: `<p>The break-even is K + premium = 250 + 18 = 268. The share ended below it, so the profit must be negative; it ended above K, so the loss must be smaller than the premium: −18 &lt; −6 &lt; 0 ✓. The writer earns 18 − 12 = +6.00. Holder plus writer sum to zero, as they must for a contract between two parties ✓</p>`,
      traps: [
        null,
        "Gave the payoff instead of the profit: max(262 − 250, 0) = 12.00, forgetting the 18 you paid.",
        "Let the call expire because the share ended below the break-even of 268: profit −18.00. Exercising still recovers 12 of the 18; the premium is sunk.",
        "Took the writer's side: the writer keeps 18 and pays 12, a profit of 6.00. You hold the call.",
      ],
    },
    {
      id: "d3-paritet-2",
      title: "Hedging with options: the payoff of a combination",
      theory: `<p>The payoff of a portfolio is the sum of the payoffs of its parts, state by state. Firms use this to hedge. An oil producer sells oil, so a low price hurts: it buys puts, which pay exactly when the price is low. An airline buys fuel, so a high price hurts: it buys calls. A share plus a put on it is the protective put, an insured share. A share plus a call is no hedge; in Kurbatov's words "you are doubling down, then just buy two stocks".</p>
<div class="formula"><div class="eq">Share + put: S<sub>T</sub> + max(K − S<sub>T</sub>, 0) = max(S<sub>T</sub>, K)</div><div class="eq">Fuel bill − call: S<sub>T</sub> − max(S<sub>T</sub> − K, 0) = min(S<sub>T</sub>, K)</div>
<div class="where">The put sets a floor at K, the call a cap at K. Then subtract the premium from what you receive, or add it to what you pay. Ignore interest on the premium unless the question mentions it.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A hedge pays when the business loses. The producer is long oil, so it buys the right to sell; the airline is short fuel, so it buys the right to buy. Either way the firm keeps the good outcomes and pays a premium to remove the bad ones.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An airline buys one-year calls on jet fuel with K = 80 for a premium of 5 per barrel.</p><p>Fuel at 95: the call pays 15, so the net cost is 95 − 15 + 5 = 85. Fuel at 70: the call expires and the net cost is 70 + 5 = 75. The cost can never exceed K + premium = 85.</p></div>`,
      q: `<p>An oil producer will sell its oil in one year at the market price. To protect itself it buys one-year European puts on oil with strike K = 72 per barrel, at a premium of 3.50 per barrel. In one year oil trades at 61. What does the producer get per barrel: the oil sale plus the put's payoff, minus the premium (ignore interest)?</p>`,
      options: ["57.50", "72.00", "46.50", "68.50"],
      answer: 3,
      solution: `<p>Oil sale: 61. Put payoff: max(72 − 61, 0) = 11.</p><p>Per barrel: 61 + 11 − 3.50 = <b>68.50</b>.</p>`,
      check: `<p>Oil plus put pays max(S<sub>T</sub>, K), so at any oil price below 72 the producer gets K − premium = 72 − 3.50 = 68.50, the floor ✓. Above 72 it keeps the upside: at 90 it gets 90 − 3.50 = 86.50. Nothing can land below the floor, which rules out 57.50 and 46.50.</p>`,
      traps: [
        "Used the airline's hedge, a call: it pays max(61 − 72, 0) = 0 when oil falls, so 61 + 0 − 3.50 = 57.50.",
        "Forgot the premium: 61 + 11 = 72.00.",
        "Wrote the put's payoff as S<sub>T</sub> − K = −11, a negative payoff no holder accepts: 61 − 11 − 3.50 = 46.50.",
        null,
      ],
    },
    {
      id: "d3-paritet-3",
      title: "Put-call parity: why it must hold",
      theory: `<p>Compare two portfolios. The protective put, a share plus a put with strike K, pays max(S<sub>T</sub>, K). The fiduciary call, a call with strike K plus a risk-free bond that pays K at expiry, pays max(S<sub>T</sub> − K, 0) + K = max(S<sub>T</sub>, K) too. Two portfolios that pay the same in every state must cost the same today, or you buy the cheap one, sell the dear one and keep the gap. That is put-call parity. It is not on the formula sheet.</p>
<div class="formula"><div class="eq">C + PV(K) = P + S &nbsp;&nbsp; PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup></div>
<div class="where">It holds for European options with the same strike, the same expiry and the same share, with no dividends before expiry. It needs no model and no probabilities: no volatility, no expected return, no view on where the share goes.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Both portfolios build a floor at K with all the upside above it. One builds the floor with a put, the other with a bond. Same thing in two wrappings, so one price.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 50. Payoffs at expiry:</p>
<table class="data"><tr><th>S<sub>T</sub></th><th>Share + put</th><th>Call + bond paying 50</th></tr>
<tr><td class="n">35</td><td class="n">35 + 15 = 50</td><td class="n">0 + 50 = 50</td></tr>
<tr><td class="n">50</td><td class="n">50 + 0 = 50</td><td class="n">0 + 50 = 50</td></tr>
<tr><td class="n">65</td><td class="n">65 + 0 = 65</td><td class="n">15 + 50 = 65</td></tr></table>
<p>Equal in every row, so S + P = C + PV(50).</p></div>`,
      q: `<p>A share trades at 30 and pays no dividends. One-year European calls and puts on it both have strike K = 30. Which statement explains why C + PV(K) = P + S must hold?</p>`,
      options: [
        "The call and the put are equally likely to end in the money, so their prices must balance.",
        "Both portfolios earn the share's expected return, so investors must pay the same for them.",
        "A share plus a put and a call plus a bond paying K pay the same in every state at expiry.",
        "The put insures the share, so a share plus a put must cost exactly what the share costs.",
      ],
      answer: 2,
      solution: `<p>At expiry the share plus the put is worth max(S<sub>T</sub>, 30). So is the call plus a bond that pays 30. They pay the same in every state, so they must cost the same today: <b>C + PV(K) = P + S</b>. If one side were cheaper, buying it and selling the other would give a riskless profit today with nothing to pay later.</p><p>Probabilities and expected returns never enter this argument. An insured share also cannot cost the same as the bare share.</p>`,
      check: `<p>Test each claim against the formula. Parity contains no probability and no expected return, so it holds whether the share is likely to rise or not; neither can be the reason. The insured share costs S + P, more than S, because the put has a price. Only the state-by-state argument survives. The table in the example shows it row by row ✓</p>`,
      traps: [
        "Probabilities never enter parity. It holds whether the call is likely to pay or not, because the two portfolios match in every state.",
        "Parity uses no expected return. Two portfolios with identical payoffs must cost the same whatever anyone expects to earn on them.",
        null,
        "The insured share costs S + P, not S: the put has a price. Parity compares it with the call plus a bond, not with the bare share.",
      ],
    },
    {
      id: "d3-paritet-4",
      title: "The usual exam use: the call is given, find the put",
      theory: `<p>Kurbatov: the call price is usually given. The put then follows from parity. Rearrange, then write the formula, PV(K) and the number on separate lines; that order earns the marks. Quote four decimals.</p>
<div class="formula"><div class="eq">P = C − S + PV(K) &nbsp;&nbsp; C = P + S − PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. A sign test: C − P = S − PV(K), so the call is dearer than the put exactly when the share trades above the discounted strike.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A call minus a put with the same strike pays S<sub>T</sub> − K in every state: a share you pay K for at expiry. Its price is therefore S − PV(K). Once you know the call, the put is what is left.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 60, K = 55, r<sub>f</sub> = 5%, one year, C = 9.00.</p><p>PV(K) = 55/1.05 = 52.3810. P = 9.00 − 60 + 52.3810 = 1.3810.</p></div>`,
      q: `<p>A share trades at S = 145 and pays no dividends. A one-year European call with strike K = 150 costs 11.20. The one-year risk-free rate is 4%. What is the price of the one-year European put with the same strike?</p>`,
      options: ["16.2000", "10.4308", "11.9692", "5.0000"],
      answer: 1,
      solution: `<p>PV(K) = 150/1.04 = 144.2308.</p><p>P = C − S + PV(K) = 11.20 − 145 + 144.2308 = <b>10.4308</b>.</p>`,
      check: `<p>The share trades above the discounted strike, S − PV(K) = 145 − 144.2308 = +0.7692, so the call must be the dearer option by exactly that much: 11.20 − 10.4308 = 0.7692 ✓. This test fails for each wrong answer: the swapped signs give C − P = −0.7692, the undiscounted strike −5.0000 and the intrinsic value +6.2000. The bounds hold too: 0 ≤ 10.4308 ≤ PV(K) = 144.2308.</p>`,
      traps: [
        "Used K instead of PV(K): 11.20 − 145 + 150 = 16.2000.",
        null,
        "Swapped the signs of S and PV(K): 11.20 + 145 − 144.2308 = 11.9692. That makes the put dearer than the call although the share trades above PV(K).",
        "Gave the put's intrinsic value K − S = 150 − 145 = 5.0000 as its price. The price also carries time value. Parity gives it exactly.",
      ],
    },
    {
      id: "d3-paritet-5",
      title: "Six months: discount with the square root",
      theory: `<p>Rates are quoted per year; options often run for less. PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup> with T in years, so six months means the power 0.5: the square root. Kurbatov's slide 17 has a six-month tree with a one-year rate of 1.5% and divides by √1.015 = 1.007472: "we have to take the square root because we are looking at six months". Dividing the annual rate by two (1.015) is a close approximation Kurbatov's keys accept, but not the exact answer when the rate is compounded annually. Using the full year is an error.</p>
<div class="formula"><div class="eq">six months: PV(K) = K/√(1 + r<sub>f</sub>) &nbsp;&nbsp; three months: PV(K) = K/(1 + r<sub>f</sub>)<sup>0.25</sup></div>
<div class="where">r<sub>f</sub> is the annual rate, compounded annually. For 90 days use the power 90/365. The same period rate goes into ρ when the tree covers six months.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>PV(K) is what you must deposit today to hold K at expiry. Over six months the deposit grows for half a year only. Half a year at 3% a year is √1.03, not 1.03 and not 1.015.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The annual rate is 6%, six months to expiry, K = 80, S = 78 and the six-month call costs 5.30.</p><p>√1.06 = 1.029563, a six-month rate of 2.9563%. PV(K) = 80/1.029563 = 77.7029. P = 5.30 − 78 + 77.7029 = 5.0029. For three months the factor would be 1.06<sup>0.25</sup> = 1.014674.</p></div>`,
      q: `<p>A share trades at S = 72 and pays no dividends. A six-month European call with strike K = 75 costs 4.15. The risk-free rate is 3% a year, compounded annually. What is the price of the six-month European put with the same strike? Use four decimals.</p>`,
      options: ["4.9655", "7.1500", "6.0497", "6.0416"],
      answer: 2,
      solution: `<p>Six-month factor: √1.03 = 1.014889. PV(K) = 75/1.014889 = 73.8997.</p><p>P = C − S + PV(K) = 4.15 − 72 + 73.8997 = <b>6.0497</b>.</p>`,
      check: `<p>Grow PV(K) for six months: 73.8997 × 1.014889 = 75.0000 ✓, the strike. The put clears its floor PV(K) − S = 73.8997 − 72 = 1.8997 and stays below PV(K) ✓. The share is below PV(K), so the put must cost more than the call: 6.0497 &gt; 4.15 ✓</p>`,
      traps: [
        "Discounted the strike with the full annual rate: 75/1.03 = 72.8155, so P = 4.15 − 72 + 72.8155 = 4.9655. The option runs six months, not a year.",
        "Used K instead of PV(K): 4.15 − 72 + 75 = 7.1500.",
        null,
        "Divided the annual rate by two: 75/1.015 = 73.8916, so P = 6.0416. A close approximation the keys accept on paper, but the question says compounded annually: six months is √1.03 = 1.014889.",
      ],
    },
    {
      id: "d3-paritet-6",
      title: "Exam level: which trade earns the parity gap",
      theory: `<p>If quoted prices break parity, the two portfolios that pay max(S<sub>T</sub>, K) cost different amounts. Buy the cheap one and sell the dear one: the payoffs cancel in every state, so you keep the price gap today and owe nothing later. Selling the fiduciary call means writing the call and borrowing PV(K); selling the protective put means shorting the share and writing the put. Work out PV(K) for the option's own horizon first, because a wrong period can flip which side looks cheap.</p>
<div class="formula"><div class="eq">Gap = [C + PV(K)] − [P + S]</div><div class="eq">Gap &gt; 0: buy the share and the put, write the call, borrow PV(K)</div><div class="eq">Gap &lt; 0: buy the call, lend PV(K), short the share, write the put</div>
<div class="where">The profit today equals the size of the gap. If your trade shows a loss today, you bought the dear side.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Two packages with the same contents and different price tags: buy the cheap one and sell the dear one. You never take a view on the share, because whatever it does, what you hold pays exactly what you owe.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>One year, S = 50, K = 52, r<sub>f</sub> = 4%, C = 4.00, P = 4.50.</p><p>PV(K) = 52/1.04 = 50.00. C + PV(K) = 54.00 and P + S = 54.50, so the protective put is dear. Buy the call and lend 50.00, short the share and write the put. Today: −4.00 − 50.00 + 50.00 + 4.50 = +0.50, the gap.</p></div>`,
      q: `<p>A share trades at 96 and pays no dividends. Six-month European options with strike K = 100 trade at C = 6.10 for the call and P = 7.40 for the put. The risk-free rate is 4% a year, compounded annually. Which trade locks in a riskless profit today?</p>`,
      options: [
        "Buy the call, short the share, write the put and lend the present value of the strike.",
        "Buy the share and the put, write the call and borrow the present value of the strike.",
        "Buy the put on its own: at 7.40 it is cheap, so holding it earns the gap without risk.",
        "No trade: the put should cost more than the call when the share trades below the strike.",
      ],
      answer: 1,
      solution: `<p>Six months: PV(K) = 100/√1.04 = 100/1.019804 = 98.0581.</p><p>Fiduciary call: C + PV(K) = 6.10 + 98.0581 = 104.1581. Protective put: P + S = 7.40 + 96 = 103.4000. Both pay max(S<sub>T</sub>, 100) in six months, so the protective put is the cheap side.</p><p><b>Buy the share and the put, write the call and borrow 98.0581.</b> Today: −96 − 7.40 + 6.10 + 98.0581 = +0.7581. In six months you repay 100. If S<sub>T</sub> = 120: 120 + 0 − 20 − 100 = 0. If S<sub>T</sub> = 80: 80 + 20 − 0 − 100 = 0.</p>`,
      check: `<p>The profit today equals the parity gap: 104.1581 − 103.4000 = 0.7581 ✓. The period matters here: with 1.04 for six months, PV(K) = 96.1538 and C + PV(K) = 102.2538 drops below P + S = 103.40, so you would trade the other way and lose 0.7581 today.</p>`,
      traps: [
        "Discounted the strike with the full annual 4%: PV(K) = 96.1538 makes C + PV(K) = 102.2538 look cheaper than P + S = 103.40, so the trade runs backwards. With √1.04 it costs 0.7581 today.",
        null,
        "A put alone is not riskless: if the share ends above 100 it expires worthless and you lose 7.40. The gap is riskless only when the payoffs cancel.",
        "The sign is right, the size is not: parity requires P − C = PV(K) − S = 2.0581 and the quotes give only 1.30. The put is too cheap.",
      ],
    },
  ],
});

/* sjanger 102 · d3-replikering · The replicating portfolio */
window.EDU_DATA.sjangre.push({
  id: "d3-replikering",
  num: 102,
  title: "The replicating portfolio",
  summary: "Copy an option with shares and a risk-free loan: the law of one price, Δ, B, the put, why no probability is needed and a firm's debt",
  chapters: [22, 24],
  exam: "7 of 11 papers · V2022 P4, H2024 E6",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>Replication is the idea behind every option price in this course: build a portfolio of shares and risk-free borrowing or lending that pays exactly what the option pays. The option must then cost what the portfolio costs. Δ, B and the price are on the formula sheet, so the marks go to the payoffs, the signs, the copy verified in both states and the sentence on why no probability is needed. V2022 Problem 4 asked you to replicate a firm's equity and its debt this way. At the top you can copy a call, a put and risky debt and say in words what each copy holds.</p>`,
  steps: [
    {
      id: "d3-replikering-1",
      title: "Same payoff, same price",
      theory: `<p>In the binomial model the share can only move to S<sub>u</sub> or S<sub>d</sub> in one period. You can borrow or lend at r<sub>f</sub>. With two states and two instruments you can build a portfolio of shares and a risk-free loan that pays exactly what the option pays in both states: the replicating portfolio. Two things that pay the same in every state must cost the same today. If the option traded above its copy, you would write the option, buy the copy and keep the difference with nothing owed later.</p>
<div class="formula"><div class="eq">option payoff = portfolio payoff in every state ⟹ option price = portfolio cost</div>
<div class="where">Check the copy in both states: the shares' value minus the loan repaid with interest. For a mispriced option: sell what is dear, buy the copy.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Two identical boxes in the same shop must carry the same price tag. If one is dearer, sell it and buy the other: whatever happens they pay the same, so the gap is yours today. Everyone doing that pushes the prices together.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 20, S<sub>u</sub> = 26, S<sub>d</sub> = 16, r<sub>f</sub> = 4%. A call with K = 20 pays 6 or 0.</p><p>Copy: buy 0.6 shares and borrow 9.2308, which you repay as 9.2308 × 1.04 = 9.60. Up: 0.6 × 26 − 9.60 = 15.60 − 9.60 = 6 ✓. Down: 0.6 × 16 − 9.60 = 9.60 − 9.60 = 0 ✓. Cost today: 0.6 × 20 − 9.2308 = 12.00 − 9.2308 = 2.7692, so the call is worth 2.7692.</p></div>`,
      q: `<p>A share trades at 50. In one year it will be worth 65 or 40. The one-year risk-free rate is 5%. A portfolio that buys 0.6 shares and borrows 22.8571 pays exactly what a one-year European call with strike K = 50 pays, in both states. The call trades at 8.00. Which statement is right?</p>`,
      options: [
        "The call is too dear: write it and buy the portfolio, which locks in 0.8571 today.",
        "The call is too cheap: buy it and sell the portfolio short, which locks in 0.8571 today.",
        "No trade: a call may cost more than its copy, because its loss is capped at the premium.",
        "The call is too dear, but writing it is risky, because you must pay 15 if the share rises.",
      ],
      answer: 0,
      solution: `<p>The copy costs 0.6 × 50 − 22.8571 = 30.0000 − 22.8571 = 7.1429. The call trades at 8.00, so it is dear by 8.00 − 7.1429 = 0.8571.</p><p><b>Write the call and buy the copy.</b> Today: +8.00 − 30.00 + 22.8571 = +0.8571. In a year you repay 22.8571 × 1.05 = 24.00. Up: 0.6 × 65 − 24 − 15 = 39 − 24 − 15 = 0. Down: 0.6 × 40 − 24 − 0 = 0.</p>`,
      check: `<p>Check the copy itself first: up 39 − 24 = 15 and down 24 − 24 = 0, the call's payoffs ✓. The profit equals the mispricing, 8.00 − 7.1429 = 0.8571 ✓. The opposite trade, buying the call and shorting the copy, costs 0.8571 today: if an arbitrage shows a loss today, you have the direction wrong.</p>`,
      traps: [
        null,
        "Took the wrong side. At 8.00 the call is dearer than its copy at 7.1429, so buying it and shorting the copy costs 0.8571 today.",
        "The capped loss is already in the copy, which also pays 0 in the down state. Same payoffs in every state leave no room for a different price.",
        "The 15 you owe when the share rises is paid by the copy: 0.6 × 65 − 24 = 15. The position is riskless in both states.",
      ],
    },
    {
      id: "d3-replikering-2",
      title: "Δ: shares per option",
      theory: `<p>The first unknown is how many shares to hold. The portfolio must swing between the two states exactly as much as the option does. The option's payoff moves by C<sub>u</sub> − C<sub>d</sub> while one share moves by S<sub>u</sub> − S<sub>d</sub>, so the number of shares is the ratio. Δ is on the formula sheet.</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">C<sub>u</sub> and C<sub>d</sub> are the option's payoffs in the up and down states. Δ is a ratio of differences, not of levels. For a call 0 ≤ Δ ≤ 1. Kurbatov: "in most reasonable cases, C<sub>d</sub> will be just zero", because the strike lies between S<sub>d</sub> and S<sub>u</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Δ is the slope of the option's value against the share: how much the option moves when the share moves by 1. The bond pays the same in both states, so only the shares can produce the swing. Δ shares produce exactly the option's swing.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, call with K = 30: C<sub>u</sub> = 6, C<sub>d</sub> = 0.</p><p>Δ = (6 − 0)/(36 − 24) = 6/12 = 0.5000. The share swings by 12 and the call by 6: half a share swings by 6.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 120. In one year it will be worth 150 or 96. Consider a one-year European call with strike K = 110. How many shares does the replicating portfolio hold per call?</p>`,
      options: ["0.2667", "0.3333", "1.3500", "0.7407"],
      answer: 3,
      solution: `<p>Payoffs: C<sub>u</sub> = max(150 − 110, 0) = 40, C<sub>d</sub> = max(96 − 110, 0) = 0.</p><p>Δ = (40 − 0)/(150 − 96) = 40/54 = <b>0.7407</b> shares per call.</p>`,
      check: `<p>The swing test can fail, so run it: 0.740741 × 150 − 0.740741 × 96 = 111.1111 − 71.1111 = 40.0000, exactly the call's swing ✓. With 0.2667 shares the swing is only 14.40, with 0.3333 only 18.00. Δ for a call lies between 0 and 1, which rules out 1.3500.</p>`,
      traps: [
        "Took a ratio of levels: C<sub>u</sub>/S<sub>u</sub> = 40/150 = 0.2667. Δ is the change in the option over the change in the share.",
        "Divided by today's price: C<sub>u</sub>/S<sub>0</sub> = 40/120 = 0.3333. The denominator is the share's swing, S<sub>u</sub> − S<sub>d</sub> = 54.",
        "Turned the fraction upside down: 54/40 = 1.3500. A call never needs more than one share.",
        null,
      ],
    },
    {
      id: "d3-replikering-3",
      title: "B and the price: a call is a levered share",
      theory: `<p>With Δ fixed, the second unknown is B, the amount placed in the risk-free asset today. In each state the portfolio is worth ΔS + B(1 + r<sub>f</sub>), which must equal the option's payoff. Solve the down-state equation for B, then add up what the portfolio costs. Both formulas are on the formula sheet.</p>
<div class="formula"><div class="eq">ΔS<sub>d</sub> + B(1 + r<sub>f</sub>) = C<sub>d</sub> ⟹ B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>)</div><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">B is today's amount. B &lt; 0 means you borrow and repay B(1 + r<sub>f</sub>) next period; for a call B is always negative. The up-state equation gives the same B, so use it as a check.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A call is a share bought partly with borrowed money. The loan is sized so that in the down state the shares exactly repay it and nothing is left: the call's zero payoff. In the up state the same shares are worth more; the surplus is the call's payoff.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, call with K = 30, so Δ = 0.5.</p><p>B = (0 − 24 × 0.5)/1.04 = −12/1.04 = −11.5385: borrow 11.5385 and repay 12.00. C<sub>0</sub> = 30 × 0.5 − 11.5385 = 15.0000 − 11.5385 = 3.4615. Up: 18 − 12 = 6 ✓. Down: 12 − 12 = 0 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 120. In one year it will be worth 150 or 96. The one-year risk-free rate is 4%. A one-year European call with strike K = 110 has Δ = 40/54 = 0.740741. What is the call worth today?</p>`,
      options: ["17.7778", "157.2650", "20.5128", "14.9333"],
      answer: 2,
      solution: `<p>B = (0 − 96 × 0.740741)/1.04 = −71.1111/1.04 = −68.3761: borrow 68.3761 today and repay 71.1111 in a year.</p><p>C<sub>0</sub> = 120 × 0.740741 − 68.3761 = 88.8889 − 68.3761 = <b>20.5128</b>.</p>`,
      check: `<p>Verify the copy in both states, which is where the marks are. Up: 0.740741 × 150 − 71.1111 = 111.1111 − 71.1111 = 40 = C<sub>u</sub> ✓. Down: 71.1111 − 71.1111 = 0 = C<sub>d</sub> ✓. The price respects the bounds: above S<sub>0</sub> − PV(K) = 120 − 110/1.04 = 14.2308 and below S<sub>0</sub> = 120, which rules out 157.2650.</p>`,
      traps: [
        "Did not discount the loan: 88.8889 − 71.1111 = 17.7778. B is today's amount; 71.1111 is what you repay in a year.",
        "Added the loan instead of subtracting it: 88.8889 + 68.3761 = 157.2650. A call is shares bought with borrowed money, so B is negative. No call is worth more than the share.",
        null,
        "Multiplied by 1.04 instead of dividing: B = −71.1111 × 1.04 = −73.9556, so C<sub>0</sub> = 88.8889 − 73.9556 = 14.9333. Today's loan is smaller than the repayment, not larger.",
      ],
    },
    {
      id: "d3-replikering-4",
      title: "Replicating a put: short the share and lend",
      theory: `<p>A put pays in the down state, so its payoff falls when the share rises. The same two formulas copy it, but the signs flip. Δ comes out negative, so you short shares; B comes out positive, so you lend. When the exam asks what your portfolio is in words, the answer for a put reads "short Δ shares and lend B", never "buy".</p>
<div class="formula"><div class="eq">Δ = (P<sub>u</sub> − P<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) &lt; 0 &nbsp;&nbsp; B = (P<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>) &gt; 0</div><div class="eq">P<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">P<sub>u</sub> = max(K − S<sub>u</sub>, 0) and P<sub>d</sub> = max(K − S<sub>d</sub>, 0). For a put −1 ≤ Δ ≤ 0. A positive Δ for a put is a sign of a mistake.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A put gains when the share falls, so its copy must be short the share. The short sets the swing; the lending sets the level. When the share ends high, closing the short costs what the bond pays and nothing is left. When it ends low, closing is cheap and the surplus is the put's payoff.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, put with K = 30: P<sub>u</sub> = 0, P<sub>d</sub> = 6.</p><p>Δ = (0 − 6)/12 = −0.5. B = (6 − 24 × (−0.5))/1.04 = 18/1.04 = 17.3077. P<sub>0</sub> = 30 × (−0.5) + 17.3077 = 2.3077. In words: short half a share and lend 17.3077. Up: −18 + 18 = 0 ✓. Down: −12 + 18 = 6 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 45. In one year it will be worth 54 or 36. The one-year risk-free rate is 3%. Using a replicating portfolio, what is a one-year European put with strike K = 48 worth today?</p>`,
      options: ["18.3495", "4.9515", "6.0000", "3.3495"],
      answer: 1,
      solution: `<p>Payoffs: P<sub>u</sub> = max(48 − 54, 0) = 0, P<sub>d</sub> = max(48 − 36, 0) = 12.</p><p>Δ = (0 − 12)/(54 − 36) = −0.666667: short two thirds of a share.</p><p>B = (12 − 36 × (−0.666667))/1.03 = (12 + 24)/1.03 = 36/1.03 = 34.9515: lend 34.9515.</p><p>P<sub>0</sub> = 45 × (−0.666667) + 34.9515 = −30.0000 + 34.9515 = <b>4.9515</b>.</p>`,
      check: `<p>State by state: up −0.666667 × 54 + 36 = −36 + 36 = 0 ✓; down −24 + 36 = 12 ✓. Parity is a real check here, since the call comes from other payoffs: the call with K = 48 pays 6 or 0, so Δ = 1/3, B = −12/1.03 = −11.6505 and C = 15 − 11.6505 = 3.3495. C + PV(K) = 3.3495 + 46.6019 = 49.9515 = P + S = 4.9515 + 45 ✓</p>`,
      traps: [
        "Bought shares instead of shorting them: Δ = +0.666667 gives B = (12 − 24)/1.03 = −11.6505 and P = 30 − 11.6505 = 18.3495. That portfolio pays 24 in the up state, where the put pays 0.",
        null,
        "Did not discount the lending: −30 + 36 = 6.0000. B is today's amount; 36 is what the bond pays in a year.",
        "Used the call's payoffs out of habit: 6 and 0 give Δ = 0.3333, B = −11.6505 and 3.3495, the price of the call with the same strike.",
      ],
    },
    {
      id: "d3-replikering-5",
      title: "Why the real probability never appears",
      theory: `<p>No probability appeared anywhere in Δ, B or the price. The copy matches the option in every state, not on average, so its cost is the option's price whatever anyone thinks the chances are. The market's beliefs and risk aversion are not lost: they sit in S<sub>0</sub>, the share price you used. That is the answer the exam wants when it asks why the analysts' probability is not needed.</p>
<div class="formula"><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B uses S<sub>0</sub>, S<sub>u</sub>, S<sub>d</sub>, r<sub>f</sub> and the payoffs, no probability</div>
<div class="where">A real probability p is not useless: it gives expected returns. With p the expected payoff must be discounted at the option's own expected return, which you only know once you have the price. Pairing p with r<sub>f</sub> is the classic error.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The option is priced relative to the share, not from scratch. Two investors who disagree about the share both agree that the call is Δ shares minus a loan. Both can look up what Δ shares cost. Their disagreement has already moved S<sub>0</sub>, which carries it into the option.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, call with K = 30: the copy costs 3.4615.</p><p>An optimist with p = 0.9 who pairs p with r<sub>f</sub> gets 0.9 × 6/1.04 = 5.1923; a pessimist with p = 0.2 gets 0.2 × 6/1.04 = 1.1538. Neither price can stand: at 5.1923 you would write the call and buy the copy for 3.4615, at 1.1538 you would do the reverse.</p></div>`,
      q: `<p>A share trades at 80. In one year it will be worth 104 or 68. The one-year risk-free rate is 5%. Analyst A puts the probability of the up state at 0.8, analyst B at 0.5. Both value a one-year European call with strike K = 84. Which statement is right?</p>`,
      options: [
        "Both get 8.4656: the copy matches the call in every state, so its cost is the price whatever p is.",
        "Analyst A gets more: the call pays only in the up state, which A thinks is far more likely.",
        "Neither can price it: the expected payoff needs one probability, which the two do not share.",
        "Both get 8.4656, because each discounts their own expected payoff at the risk-free rate.",
      ],
      answer: 0,
      solution: `<p>Payoffs: C<sub>u</sub> = 104 − 84 = 20, C<sub>d</sub> = 0. Δ = 20/36 = 0.555556. B = (0 − 68 × 0.555556)/1.05 = −37.7778/1.05 = −35.9788.</p><p>C<sub>0</sub> = 80 × 0.555556 − 35.9788 = 44.4444 − 35.9788 = <b>8.4656</b> for both analysts. Neither probability entered.</p>`,
      check: `<p>Where the probabilities do matter is the expected return. With p = 0.8 the call's expected payoff is 16.00, a return of 16.00/8.4656 − 1 = 89.0000%; with p = 0.5 it is 10.00, a return of 18.1250%. Pairing p with r<sub>f</sub> instead gives 15.2381 and 9.5238, two prices for one payoff. Whoever quoted either would be arbitraged against the copy at 8.4656.</p>`,
      traps: [
        null,
        "Optimism does not change the copy: 0.555556 shares and a loan of 35.9788 pay 20 or 0 whatever A believes. A higher price comes only from pairing p = 0.8 with r<sub>f</sub>: 15.2381.",
        "Replication needs no expected payoff. Δ and B come from the two states alone, so the price is fixed before anyone agrees on a probability.",
        "Right number, wrong reason. Discounting each analyst's expected payoff at r<sub>f</sub> gives 15.2381 and 9.5238, two different prices. Only the copy gives one.",
      ],
    },
    {
      id: "d3-replikering-6",
      title: "Exam level: replicate the firm's debt (V2022 P4)",
      theory: `<p>Replace the share with the assets of a firm that owes zero-coupon debt with face value F. At maturity the shareholders get max(V − F, 0), a call on the assets. The creditors get min(V, F): the face value when the firm can pay, the whole firm when it cannot. Both are claims on the same tree, so both can be copied with the assets (the unlevered firm, which trades) and the risk-free bond. V2022 Problem 4 asked for exactly this. A full answer writes out the payoffs, verifies the copy in both states and checks E + D = V.</p>
<div class="formula"><div class="eq">Debt pays D<sub>u</sub> = min(V<sub>u</sub>, F) and D<sub>d</sub> = min(V<sub>d</sub>, F); equity pays max(V − F, 0)</div><div class="eq">Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) &nbsp;&nbsp; B<sub>D</sub> = (D<sub>d</sub> − V<sub>d</sub>Δ<sub>D</sub>)/(1 + r<sub>f</sub>) &nbsp;&nbsp; D = V<sub>0</sub>Δ<sub>D</sub> + B<sub>D</sub></div>
<div class="where">In default the creditors get V<sub>d</sub>, not zero. The debt's B is positive: its copy lends. Check E + D = V<sub>0</sub>: in a perfect market the claims only split the firm (Modigliani-Miller Proposition I).</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risky debt behaves like a safe loan plus a slice of the firm's assets; the slice is why creditors lose when the assets fall. Equity is the rest of the assets bought with borrowed money. The equity's copy borrows exactly what the debt's copy lends, so together they hold the whole firm and no bond at all.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Assets worth 200 today, 250 or 150 in a year, r<sub>f</sub> = 4%, face value F = 170.</p><p>Debt pays 170 or 150: Δ<sub>D</sub> = 20/100 = 0.20, B<sub>D</sub> = (150 − 150 × 0.20)/1.04 = 120/1.04 = 115.3846 (lend), D = 200 × 0.20 + 115.3846 = 155.3846. Equity pays 80 or 0: Δ<sub>E</sub> = 0.80, B<sub>E</sub> = −115.3846, E = 160 − 115.3846 = 44.6154. E + D = 200 ✓</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 300 in one year. The assets trade, markets are perfect and the one-year risk-free rate is 5%. The firm's only debt is a one-year zero-coupon bond with face value 360. Analysts put the probability of the high state at 0.6. Using a replicating portfolio, what is the debt worth today?</p>`,
      options: ["342.8571", "187.0130", "320.0000", "316.8831"],
      answer: 3,
      solution: `<p>Payoffs: D<sub>u</sub> = min(520, 360) = 360, D<sub>d</sub> = min(300, 360) = 300. The firm defaults in the low state and the creditors take the assets.</p><p>Δ<sub>D</sub> = (360 − 300)/(520 − 300) = 60/220 = 0.272727.</p><p>B<sub>D</sub> = (300 − 300 × 0.272727)/1.05 = (300 − 81.8182)/1.05 = 218.1818/1.05 = 207.7922: lend 207.7922.</p><p>D = 400 × 0.272727 + 207.7922 = 109.0909 + 207.7922 = <b>316.8831</b>.</p>`,
      check: `<p>Copy: up 0.272727 × 520 + 218.1818 = 141.8182 + 218.1818 = 360 ✓; down 81.8182 + 218.1818 = 300 ✓. Equity pays 160 or 0: Δ<sub>E</sub> = 0.727273, B<sub>E</sub> = −207.7922, E = 290.9091 − 207.7922 = 83.1169. E + D = 83.1169 + 316.8831 = 400 ✓, Modigliani-Miller Proposition I. This check fails for each wrong answer, which give 425.9740, 270.1299 and 403.1169. The promised yield is 360/316.8831 − 1 = 13.6066% against 5%.</p>`,
      traps: [
        "Ignored default: PV(F) = 360/1.05 = 342.8571 is what safe debt would be worth. In the low state the creditors get 300, not 360.",
        "Gave the creditors nothing in default: payoffs 360 and 0 give Δ = 1.636364, B = −467.5325 and 187.0130. They take the assets worth 300.",
        "Paired the analysts' probability with r<sub>f</sub>: (0.6 × 360 + 0.4 × 300)/1.05 = 320.0000. Replication needs no probability.",
        null,
      ],
    },
  ],
});

/* sjanger 103 · d3-rho · Risk-neutral pricing with ρ */
window.EDU_DATA.sjangre.push({
  id: "d3-rho",
  num: 103,
  title: "Risk-neutral pricing with ρ",
  summary: "From the formula for ρ to pricing any claim, why ρ sits below the real probability, the p-then-ρ pattern and ρ backed out of a traded security",
  chapters: [22],
  exam: "7 of 11 papers · H2024 E6, V2022 P4",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>ρ is the shortcut through replication: the probability of the up state that makes the underlying earn exactly r<sub>f</sub>. With it any claim on the tree is its ρ-weighted payoff discounted at r<sub>f</sub>. The binomial model has come in 7 of 11 papers. H2024 Exercise 6 gave 8 points for backing ρ out of a traded security and saying why the real probabilities are not needed. At the top you can find ρ from a share or any other traded asset, use the real probability only where it belongs and explain why ρ lies below it.</p>`,
  steps: [
    {
      id: "d3-rho-1",
      title: "ρ: the weight that makes the share earn the risk-free rate",
      theory: `<p>Replication works, but there is a shortcut. Ask which probability of the up state would make a risk-neutral investor pay exactly today's share price. Such an investor discounts the expected payoff at r<sub>f</sub>, so ρ solves S<sub>0</sub> = [ρS<sub>u</sub> + (1 − ρ)S<sub>d</sub>]/(1 + r<sub>f</sub>). The solution is on the formula sheet. Grow S<sub>0</sub> by (1 + r<sub>f</sub>) before you compare it with the two outcomes.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">ρ is the weight on the up state, 1 − ρ the weight on the down state. It lies strictly between 0 and 1 only if S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>; otherwise the tree itself allows arbitrage. Keep four decimals.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>(1 + r<sub>f</sub>)S<sub>0</sub> is what the share's price would grow to in the bank. ρ says where that point sits on the line from S<sub>d</sub> to S<sub>u</sub>: close to S<sub>u</sub> gives ρ near 1, close to S<sub>d</sub> gives ρ near 0.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%.</p><p>ρ = (1.05 × 40 − 30)/(50 − 30) = (42 − 30)/20 = 0.6000. Check: (0.6 × 50 + 0.4 × 30)/1.05 = 42/1.05 = 40 ✓</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 64. In one year it will be worth 80 or 52. The one-year risk-free rate is 3%. What is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.4971", "0.4286", "0.5029", "0.3620"],
      answer: 0,
      solution: `<p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.03 × 64 = 65.92.</p><p>ρ = (65.92 − 52)/(80 − 52) = 13.92/28 = <b>0.4971</b> (0.497143 unrounded), so 1 − ρ = 0.5029.</p>`,
      check: `<p>ρ must reprice the share: (0.497143 × 80 + 0.502857 × 52)/1.03 = (39.7714 + 26.1486)/1.03 = 65.92/1.03 = 64.00 ✓. This test fails for each wrong answer: 0.4286 reprices to 62.1359, 0.5029 to 64.1553 and 0.3620 to 60.3261. The tree is arbitrage-free: 52 &lt; 65.92 &lt; 80.</p>`,
      traps: [
        null,
        "Forgot to grow S<sub>0</sub>: (64 − 52)/28 = 0.4286. Compare the outcomes with what S<sub>0</sub> becomes at r<sub>f</sub>, 65.92.",
        "Gave the down-state weight: 1 − ρ = 0.5029, the same as (80 − 65.92)/28. ρ belongs to the up state.",
        "Discounted S<sub>0</sub> instead of growing it: 64/1.03 = 62.1359, so (62.1359 − 52)/28 = 0.3620.",
      ],
    },
    {
      id: "d3-rho-2",
      title: "Price any claim: weight with ρ, discount at the risk-free rate",
      theory: `<p>Once ρ prices the share, it prices everything whose payoff depends on the same two states: a call, a put, a bond, a firm's equity and debt, a CDS. Take the claim's payoff in each state, weight with ρ and 1 − ρ and discount one period at r<sub>f</sub>. The result equals the replication price, because it is the same equation rewritten. The formula sheet has it with C for the claim.</p>
<div class="formula"><div class="eq">X<sub>0</sub> = [ρX<sub>u</sub> + (1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">X<sub>u</sub> and X<sub>d</sub> are the claim's payoffs. A put pays in the down state, so its payoff carries 1 − ρ. Discount at r<sub>f</sub>, never at a risk-adjusted rate: the risk adjustment is already in ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Every claim on the tree is a mix of the share and the bond. ρ prices both correctly. So it prices every mix correctly too. The risk premium has moved out of the discount rate and into the weights.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%, so ρ = 0.60.</p><p>A put with K = 45 pays 0 or 15: 0.40 × 15/1.05 = 5.7143. A contract paying 10 if up and 4 if down: (0.60 × 10 + 0.40 × 4)/1.05 = 7.60/1.05 = 7.2381. A bond paying 1 in both states: 1/1.05 = 0.9524, as it must.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 75. In one year it will be worth 95 or 60. The one-year risk-free rate is 4%. What is a one-year European put with strike K = 80 worth today?</p>`,
      options: ["9.7143", "9.8901", "9.3407", "7.4176"],
      answer: 2,
      solution: `<p>ρ = (1.04 × 75 − 60)/(95 − 60) = (78 − 60)/35 = 0.514286, so 1 − ρ = 0.485714.</p><p>Put payoffs: max(80 − 95, 0) = 0 and max(80 − 60, 0) = 20.</p><p>P = (0.514286 × 0 + 0.485714 × 20)/1.04 = 9.714286/1.04 = <b>9.3407</b>.</p>`,
      check: `<p>Price the call with the same strike from its own payoffs, 15 and 0: C = 0.514286 × 15/1.04 = 7.4176. Parity: C + PV(K) = 7.4176 + 80/1.04 = 7.4176 + 76.9231 = 84.3407 = P + S = 9.3407 + 75 ✓. With the weights swapped the two sides come out at 83.9286 and 84.8901, so this check catches that error.</p>`,
      traps: [
        "Forgot to discount: 0.485714 × 20 = 9.7143 is the value in one year.",
        "Put ρ on the put's payoff: 0.514286 × 20/1.04 = 9.8901. The put pays in the down state, which carries 1 − ρ.",
        null,
        "Priced the call instead: payoffs max(95 − 80, 0) = 15 and 0 give 0.514286 × 15/1.04 = 7.4176.",
      ],
    },
    {
      id: "d3-rho-3",
      title: "Why the real probability is above ρ",
      theory: `<p>For an ordinary share the real probability p of the up state is higher than ρ. Investors are risk averse, so they pay less for the share than its expected payoff discounted at r<sub>f</sub>: they demand an expected return above r<sub>f</sub>. ρ is the weight that strips out that premium, so it moves weight from the good state to the bad one. Kurbatov drew p &gt; ρ on the board but called it "a huge arbitrage opportunity" in class. That is a slip not to copy: nothing riskless follows from it.</p>
<div class="formula"><div class="eq">S<sub>0</sub> = [p × S<sub>u</sub> + (1 − p) × S<sub>d</sub>]/(1 + r<sub>E</sub>) = [ρS<sub>u</sub> + (1 − ρ)S<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Two routes to the same price: p with the share's required return r<sub>E</sub>, or ρ with r<sub>f</sub>. With r<sub>E</sub> &gt; r<sub>f</sub>, p &gt; ρ. Mixing them, p with r<sub>f</sub>, is the error. For an asset that pays in bad times, such as insurance, the order flips.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risk aversion has to show up somewhere. Real investors put it in the discount rate; risk-neutral pricing puts it in the probabilities instead, by shading the good state down. The gap between p and ρ is the price of risk, not free money.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%, so ρ = 0.60. Analysts say p = 0.75.</p><p>Expected payoff: 0.75 × 50 + 0.25 × 30 = 45, an expected return of 45/40 − 1 = 12.50%. At r<sub>f</sub> the expected payoff would be worth 45/1.05 = 42.8571, but the share costs 40. The gap of 2.8571 is the discount for risk; ρ = 0.60 &lt; 0.75 is how risk-neutral pricing absorbs it.</p></div>`,
      q: `<p>A share trades at 100. In one year it will be worth 125 or 85. The one-year risk-free rate is 4%. Analysts put the probability of the up state at 0.70. Which statement about ρ and the analysts' 0.70 is right?</p>`,
      options: [
        "ρ = 0.4750 is below 0.70, an arbitrage: buy the share, which is more likely to rise than its price says.",
        "ρ = 0.4750 is below 0.70 because investors demand a risk premium; ρ moves weight to the down state to absorb it.",
        "No arbitrage requires ρ to equal the real probability of 0.70, so either the share price or the analysts are wrong.",
        "ρ = 0.4750 is the market's own forecast of the up move, so the analysts' 0.70 is too optimistic.",
      ],
      answer: 1,
      solution: `<p>ρ = (1.04 × 100 − 85)/(125 − 85) = (104 − 85)/40 = 0.4750.</p><p>With p = 0.70 the expected payoff is 0.70 × 125 + 0.30 × 85 = 113, an expected return of 13% against r<sub>f</sub> = 4%. Discounted at r<sub>f</sub> the expected payoff would be worth 113/1.04 = 108.6538, yet the share costs 100: investors demand a premium for the risk. ρ shifts weight to the down state until discounting at r<sub>f</sub> gives 100. <b>The gap between 0.70 and 0.4750 is the risk premium.</b></p>`,
      check: `<p>Both routes give the same price: 113/1.13 = 100 with p and the share's own 13%; (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 with ρ ✓. Buying the share earns 13% on average but loses in the down state, so it is not riskless: no arbitrage. And ρ is not a forecast of anything; it is the weight that makes discounting at r<sub>f</sub> work.</p>`,
      traps: [
        "Copied a slip from class. Buying the share earns 13% on average but loses 15 in the down state: a risk premium, not a riskless profit.",
        null,
        "ρ equals p only when investors are risk neutral. With a 13% expected return against 4%, ρ must lie below p.",
        "ρ is a pricing weight, not a forecast. It sits below 0.70 because the market charges for risk, not because it disagrees with the analysts.",
      ],
    },
    {
      id: "d3-rho-4",
      title: "A low share price shows up in ρ",
      theory: `<p>ρ depends on S<sub>0</sub>, not only on the two outcomes. Hold S<sub>u</sub>, S<sub>d</sub> and r<sub>f</sub> fixed and let the share price fall: (1 + r<sub>f</sub>)S<sub>0</sub> moves towards S<sub>d</sub>, so ρ falls. Kurbatov in the wrap-up: a very low S<sub>0</sub> means the market is very pessimistic, which shows up in ρ. Calls lose and puts gain. If S<sub>0</sub> falls to S<sub>d</sub>/(1 + r<sub>f</sub>) or below, ρ hits zero and the tree allows arbitrage.</p>
<div class="formula"><div class="eq">same S<sub>u</sub> and S<sub>d</sub>, lower S<sub>0</sub> ⟹ lower ρ ⟹ calls fall, puts rise</div>
<div class="where">The price can fall because investors think the down state more likely, because they fear it more, or both. ρ mixes the two and never tells you which.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The same two outcomes at a lower price means the market treats the bad outcome as heavier. ρ is that weight read straight off the price: the cheaper the share, the more weight on the down state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kurbatov's drill: r<sub>f</sub> = 5%, S<sub>0</sub> = 100, S<sub>u</sub> = 120, S<sub>d</sub> = 60. ρ = (105 − 60)/60 = 0.7500.</p><p>If the share fell to 90 with the same outcomes: ρ = (94.50 − 60)/60 = 0.5750. At 60/1.05 = 57.1429 or below there would be no ρ above 0.</p></div>`,
      q: `<p>Everyone agrees that a share will be worth 150 or 90 in one year. The one-year risk-free rate is 5%. Last week the share traded at 120. After a profit warning it trades at 100. The two outcomes have not changed. Which statement is right?</p>`,
      options: [
        "ρ is still 0.6000: it depends only on S<sub>u</sub>, S<sub>d</sub> and r<sub>f</sub>, none of which has moved.",
        "ρ rises above 0.6000: at 100 the share has more room to reach 150, so the up state is likelier.",
        "ρ falls to 0.2500, which shows that the real probability of the up state is now 25%.",
        "ρ falls to 0.2500: the market now prices the share as if the down state were much heavier.",
      ],
      answer: 3,
      solution: `<p>Before: ρ = (1.05 × 120 − 90)/(150 − 90) = (126 − 90)/60 = 0.6000. After: ρ = (105 − 90)/60 = <b>0.2500</b>.</p><p>The same two outcomes now cost less, so the market puts far more weight on the low one. A call with K = 110 falls from 0.60 × 40/1.05 = 22.8571 to 0.25 × 40/1.05 = 9.5238; the put with K = 110 rises from 0.40 × 20/1.05 = 7.6190 to 0.75 × 20/1.05 = 14.2857.</p>`,
      check: `<p>ρ = 0.25 reprices the share at today's price: (0.25 × 150 + 0.75 × 90)/1.05 = 105/1.05 = 100 ✓, while 0.60 gives last week's 120. Had the price fallen to 90/1.05 = 85.7143 or below, ρ would be 0 or negative: borrowing to buy the share would then never lose, an arbitrage.</p>`,
      traps: [
        "ρ uses S<sub>0</sub> too: (1 + r<sub>f</sub>)S<sub>0</sub> fell from 126 to 105, so ρ fell from 0.6000 to 0.2500.",
        "A higher expected return on a cheaper share is the real-world view. ρ is a pricing weight; a lower price with the same outcomes lowers it.",
        "ρ is not the real probability. The fall can reflect more fear of the down state as well as a lower chance of the up state; ρ mixes both.",
        null,
      ],
    },
    {
      id: "d3-rho-5",
      title: "Exam level: p first, then switch to ρ",
      theory: `<p>Kurbatov: "In some exercises, you might have to first use the p, but then you'll switch to rho." Problem Set 3 Exercises 2 and 4 follow this pattern. If S<sub>0</sub> is not given, find it with the real probability and the CAPM: the expected payoff discounted at the share's own required return. Then compute ρ from that S<sub>0</sub> and price the option with ρ and r<sub>f</sub>. The real p comes back only for expected returns.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>f</sub> + β(E[R<sub>mkt</sub>] − r<sub>f</sub>) &nbsp;&nbsp; S<sub>0</sub> = [p × S<sub>u</sub> + (1 − p) × S<sub>d</sub>]/(1 + r<sub>E</sub>)</div><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">p goes with r<sub>E</sub>, ρ goes with r<sub>f</sub>; say in each line which one you use. β multiplies the market risk premium E[R<sub>mkt</sub>] − r<sub>f</sub>, not E[R<sub>mkt</sub>].</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The real probability and the CAPM tell you what the share is worth. Once the share has a price, the option is priced relative to it and the real probability has done its job. Using p for the option too would need the option's own expected return, far above the share's because the option is levered.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>u</sub> = 120, S<sub>d</sub> = 70, p = 0.6, β = 1.0, r<sub>f</sub> = 5%, E[R<sub>mkt</sub>] = 11%, call with K = 100.</p><p>r<sub>E</sub> = 5% + 1.0 × 6% = 11%. E[S<sub>1</sub>] = 0.6 × 120 + 0.4 × 70 = 100, so S<sub>0</sub> = 100/1.11 = 90.0901. ρ = (1.05 × 90.0901 − 70)/50 = (94.5946 − 70)/50 = 0.4919. C<sub>0</sub> = 0.491892 × 20/1.05 = 9.3694.</p></div>`,
      q: `<p>In one year a share will be worth 140 with real probability 0.55 or 80 with probability 0.45. Its beta is 1.2, the risk-free rate is 4% and the expected market return is 9%. No share price is quoted. What is a one-year European call with strike K = 100 worth today? Use four decimals.</p>`,
      options: ["17.2028", "21.1538", "20.0000", "14.3393"],
      answer: 0,
      solution: `<p><b>p first.</b> r<sub>E</sub> = 4% + 1.2 × (9% − 4%) = 10%. E[S<sub>1</sub>] = 0.55 × 140 + 0.45 × 80 = 77 + 36 = 113. S<sub>0</sub> = 113/1.10 = 102.7273.</p><p><b>Then ρ.</b> ρ = (1.04 × 102.7273 − 80)/(140 − 80) = (106.8364 − 80)/60 = 0.4473 (0.447273 unrounded).</p><p><b>Price.</b> C<sub>u</sub> = 40, C<sub>d</sub> = 0. C<sub>0</sub> = 0.447273 × 40/1.04 = 17.8909/1.04 = <b>17.2028</b>.</p>`,
      check: `<p>The check that can fail: the share earns 10% against 4%, so ρ must lie below p: 0.4473 &lt; 0.55 ✓. Pairing p with r<sub>f</sub> amounts to setting ρ = p, which this test rejects. Replication agrees: Δ = 40/60 = 0.666667, B = −80 × 0.666667/1.04 = −51.2821, C<sub>0</sub> = 68.4848 − 51.2821 = 17.2028 ✓, though it is the same model and catches slips only. The call's real expected return is 0.55 × 40/17.2028 − 1 = 27.8862%, far above the share's 10%: the call is levered 68.4848/17.2028 = 3.98 times.</p>`,
      traps: [
        null,
        "Paired the real probability with r<sub>f</sub>: 0.55 × 40/1.04 = 21.1538. Switch to ρ once S<sub>0</sub> is known.",
        "Discounted the call's expected payoff at the share's 10%: 0.55 × 40/1.10 = 20.0000. The call is levered, so its own required return is far higher.",
        "Used the market return instead of the premium: r<sub>E</sub> = 4% + 1.2 × 9% = 14.8%, so S<sub>0</sub> = 98.4321, ρ = 0.3728 and C<sub>0</sub> = 14.3393.",
      ],
    },
    {
      id: "d3-rho-6",
      title: "Exam level: ρ from a traded security with a payout",
      theory: `<p>ρ does not have to come from the share. Any traded security whose value depends on the same two states reveals it: an annuity in H2024 Exercise 6, a royalty stream, a fund, an option. The rule from the H2024 key: S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must describe the same security. If it pays a cash flow at date 1, add the payment to both S<sub>u</sub> and S<sub>d</sub>, just as a share's value at date 1 includes a dividend just paid.</p>
<div class="formula"><div class="eq">S<sub>u</sub> = payout in the up state + value after the payout &nbsp;&nbsp; S<sub>d</sub> likewise</div><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">Then price the claim you want with ρ and r<sub>f</sub>. Leaving the payout out still gives a ρ between 0 and 1, so the range test misses it; repricing the security with its full date-1 values catches it.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>At date 1 the holder owns the cash just paid out and the unit that remains. Today's price buys both, so the date-1 values must count both. Leave the payout out and you compare today's price of one asset with next year's value of a smaller one.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A certificate trades at 50. In one year it pays out 5 (high state) or 2 (low) and is then worth 60 or 40. r<sub>f</sub> = 5%.</p><p>S<sub>u</sub> = 65, S<sub>d</sub> = 42. ρ = (52.50 − 42)/(65 − 42) = 10.50/23 = 0.4565. A claim paying 10 in the low state is worth 0.543478 × 10/1.05 = 5.1760. Without the payout: (52.50 − 40)/20 = 0.6250, which is wrong.</p></div>`,
      q: `<p>Units in a listed shipping fund trade at 230 today. In one year the fund pays out that year's charter income: 24 per unit if freight rates are high and 12 if they are low. Right after the payout a unit is worth 260 (high) or 190 (low). The one-year risk-free rate is 4% and nobody knows the real probabilities. A shipowner wants a contract that pays 40 in one year if freight rates are low and nothing if they are high. What is the contract worth today?</p>`,
      options: ["11.4286", "17.4484", "21.0131", "25.3283"],
      answer: 2,
      solution: `<p>Date-1 values including the payout: S<sub>u</sub> = 24 + 260 = 284, S<sub>d</sub> = 12 + 190 = 202.</p><p>ρ = (1.04 × 230 − 202)/(284 − 202) = (239.20 − 202)/82 = 37.20/82 = 0.453659, so 1 − ρ = 0.546341.</p><p>Contract = (0.453659 × 0 + 0.546341 × 40)/1.04 = 21.8537/1.04 = <b>21.0131</b>.</p>`,
      check: `<p>Reprice the fund with its full date-1 values: (0.453659 × 284 + 0.546341 × 202)/1.04 = (128.8390 + 110.3610)/1.04 = 239.20/1.04 = 230 ✓. The ρ that ignores the payout, 0.702857, reprices it to (199.6114 + 60.0229)/1.04 = 249.6484, not 230. This check catches that error; the range test 0 &lt; ρ &lt; 1 does not.</p>`,
      traps: [
        "Left the payout out: ρ = (239.20 − 190)/(260 − 190) = 0.702857, so 0.297143 × 40/1.04 = 11.4286. Today's 230 buys the payout too.",
        "Put ρ on the low state: 0.453659 × 40/1.04 = 17.4484. The contract pays when rates are low, which carries 1 − ρ.",
        null,
        "Did not grow today's price: ρ = (230 − 202)/82 = 0.341463, so 0.658537 × 40/1.04 = 25.3283.",
      ],
    },
  ],
});

/* sjanger 104 · d3-bs · Black-Scholes intuition and implied volatility */
window.EDU_DATA.sjangre.push({
  id: "d3-bs",
  num: 104,
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  title: "Black-Scholes intuition and implied volatility",
  summary: "Which way each input moves a call and a put, why volatility helps the holder and what to do when your σ differs from the implied one",
  chapters: [23, 25],
  exam: "H2025 E1 (12 points, verbal) · σ intuition after a real-options calculation",
  intro: `<p>Kurbatov has said the Black-Scholes calculation will not be on the exam, but the intuition can be. H2025 Exercise 1 opened the paper with 12 verbal points: the market price implies one volatility, a friend says the true one is lower; what happens to the value and what should you do? This short ladder gives you the direction of every input and the reason behind it, the σ = 0 edge case, implied volatility and the same logic in a real option. Only European options are priced. At the top you can write the H2025 answer in four to six sentences.</p>`,
  steps: [
    {
      id: "d3-bs-1",
      title: "Why volatility raises an option's value",
      theory: `<p>An option holder can always walk away, so the payoff is never below zero: a call pays max(S<sub>T</sub> − K, 0) and a put max(K − S<sub>T</sub>, 0). Spread the possible share prices out while their average stays the same. The good tail gets better and the option collects it. The bad tail gets worse, but the payoff there is already zero and cannot fall further. So a higher volatility σ raises both a call and a put, while the share itself is worth the same.</p>
<div class="formula"><div class="eq">higher σ ⟹ higher C and higher P</div>
<div class="where">σ is the annual volatility of the share's return. Only the spread changes, not the expected price. σ does not enter put-call parity, C − P = S − PV(K), so the call and the put gain the same amount.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Everywhere else in finance risk is a cost. For an option holder it is a benefit, because the floor at zero cuts off the bad outcomes and keeps the good ones. The writer of the option is the one who pays for it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 50. The share will be worth 40 or 60 at expiry, equally likely: the call pays 0 or 10, an expected 5. Widen that to 20 or 80, still averaging 50: the call pays 0 or 30, an expected 15.</p><p>The put goes from 0.5 × 10 = 5 to 0.5 × 30 = 15 as well. The share's expected price stayed at 50.</p></div>`,
      q: `<p>A share will be worth 85 or 115 at expiry, each with probability 0.5. News widens that to 70 or 130, still equally likely, so the expected price stays at 100. A call on the share has strike K = 105. Ignore discounting. By how much does the call's expected payoff at expiry rise?</p>`,
      options: ["0.00", "7.50", "12.50", "15.00"],
      answer: 1,
      solution: `<p>Before: the call pays max(115 − 105, 0) = 10 or max(85 − 105, 0) = 0, so 0.5 × 10 = 5.00.</p><p>After: it pays max(130 − 105, 0) = 25 or 0, so 0.5 × 25 = 12.50.</p><p>Rise = 12.50 − 5.00 = <b>7.50</b>, while the expected share price is unchanged at 100.</p>`,
      check: `<p>The put with the same strike must rise by the same amount: before 0.5 × (105 − 85) = 10.00, after 0.5 × (105 − 70) = 17.50, a rise of 7.50 ✓ The gap between the two expected payoffs stays at 5.00 − 10.00 = 12.50 − 17.50 = −5.00, the expected price minus the strike, because the spread is not in it.</p>`,
      traps: [
        "Applied the share's logic to the option. The expected share price is unchanged, but the floor at zero keeps the better top outcome and ignores the worse bottom one.",
        null,
        "Gave the new expected payoff, 0.5 × 25 = 12.50, not the change from 5.00.",
        "Left out the probabilities: 25 − 10 = 15.00 compares the top payoffs as if the top state were certain.",
      ],
    },
    {
      id: "d3-bs-2",
      title: "Which way each input moves a call and a put",
      theory: `<p>Black-Scholes prices a European option from five inputs: S, K, T, r<sub>f</sub> and σ. A dividend paid before expiry is a sixth. The exam asks for the direction and the reason, not the formula. Two facts give almost every row. The call holder pays K at expiry and the put holder receives it, so anything that lowers PV(K) helps the call and hurts the put. And the option holder gets none of a dividend, while the share drops by it on the ex-dividend date.</p>
<table class="data"><tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>S</td><td>up</td><td>down</td><td>the call buys the share, the put sells it</td></tr>
<tr><td>K</td><td>down</td><td>up</td><td>the call pays K, the put receives it</td></tr>
<tr><td>σ</td><td>up</td><td>up</td><td>the payoff is floored at zero</td></tr>
<tr><td>T</td><td>up</td><td>either</td><td>more spread helps both; a later K helps the call and hurts the put</td></tr>
<tr><td>r<sub>f</sub></td><td>up</td><td>down</td><td>PV(K) falls</td></tr>
<tr><td>dividend</td><td>down</td><td>up</td><td>the share drops and the holder gets none of the cash</td></tr></table>
<div class="formula"><div class="eq">C − P = S − PV(Div) − PV(K)</div>
<div class="where">Put-call parity with a dividend before expiry. It checks the direction of every row: whatever raises the right-hand side raises C − P.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Ask two questions about any news. Does it change the share the holder ends up with? Does it change what K is worth today? A lower rate makes the fixed K weigh more today, which the call holder pays and the put holder collects.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 100, K = 100, r<sub>f</sub> = 5%, T = 1, σ = 25%: C = 12.2751 and P = 7.5132. Change one input at a time.</p>
<table class="data"><tr><th>Change</th><th>ΔC</th><th>ΔP</th></tr>
<tr><td>S: 100 to 110</td><td class="n">+6.9523</td><td class="n">−3.0477</td></tr>
<tr><td>K: 100 to 110</td><td class="n">−4.2967</td><td class="n">+5.2271</td></tr>
<tr><td>σ: 25% to 35%</td><td class="n">+3.7973</td><td class="n">+3.7973</td></tr>
<tr><td>T: 1 to 2 years</td><td class="n">+6.2534</td><td class="n">+1.7183</td></tr>
<tr><td>r<sub>f</sub>: 5% to 7%</td><td class="n">+0.9665</td><td class="n">−0.8137</td></tr>
<tr><td>dividend of 4 in six months</td><td class="n">−2.3232</td><td class="n">+1.5804</td></tr></table></div>`,
      q: `<p>A share trades at 80 and will pay a dividend of 3 in six months. European calls and puts on it have strike 80 and one year to expiry. The risk-free rate is 5%. Two pieces of news arrive; treat each one separately. (i) The risk-free rate falls to 3%. (ii) The firm cancels the dividend. Which line gives the right direction for both options in both cases?</p>`,
      options: [
        "(i) call falls, put rises · (ii) call rises, put falls",
        "(i) call rises, put rises · (ii) call rises, put falls",
        "(i) call falls, put rises · (ii) no change to either",
        "(i) call rises, put falls · (ii) call falls, put rises",
      ],
      answer: 0,
      solution: `<p>(i) A lower r<sub>f</sub> raises PV(K): 80/1.03 instead of 80/1.05. The call holder pays K at expiry, so the call is worth less; the put holder receives K, so the put is worth more: <b>call falls, put rises</b>.</p><p>(ii) Without the dividend the share no longer drops by 3 before expiry. The call is written on a dearer share and rises; the put falls: <b>call rises, put falls</b>.</p>`,
      check: `<p>Parity gives the direction of the gap C − P = S − PV(Div) − PV(K). (i) It falls from 80 − 2.9277 − 76.1905 = 0.8818 to 80 − 2.9560 − 77.6699 = −0.6259 ✓ (ii) Without PV(Div) it rises to 80 − 76.1905 = 3.8095 ✓ The Black-Scholes values at σ = 30% agree: in (i) the call goes from 9.5848 to 8.9141 and the put from 8.7029 to 9.5400; in (ii) they go to 11.3384 and 7.5289.</p>`,
      traps: [
        null,
        "A lower rate does not lift every payoff. The call holder pays K at expiry, so a lower rate makes that payment weigh more today: the call falls.",
        "The shareholders are indifferent to the dividend, but the option holders get none of the cash. Without the dividend the share stays higher, so the call rises and the put falls.",
        "Mixed up who pays and who receives. The call holder pays K and loses when the share drops; the put holder receives K and gains when it drops.",
      ],
    },
    {
      id: "d3-bs-3",
      title: "The edge case σ → 0: the option falls to its floor",
      theory: `<p>To reason about an intuition question, test the extreme. Set σ = 0. The share is then riskless, so it must grow at r<sub>f</sub>: S<sub>T</sub> = S(1 + r<sub>f</sub>)<sup>T</sup> for sure. You know today whether the call will be exercised, so it is a sure payoff discounted at r<sub>f</sub>. That makes the call worth S − PV(K) when that is positive and zero otherwise.</p>
<div class="formula"><div class="eq">σ = 0: &nbsp; C = max(S − PV(K), 0) &nbsp;&nbsp; P = max(PV(K) − S, 0)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. This is the lower bound for any σ: every bit of volatility adds value on top of it. Compare S with PV(K), not with K.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>With no uncertainty there is nothing to walk away from, so the right to walk away is worth nothing. What is left is a sure purchase of the share for K at expiry, worth S − PV(K) today. Everything an option is worth above that floor is volatility value.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 50, K = 52, r<sub>f</sub> = 5%, T = 1, σ = 0. S − K = −2 looks out of the money. But the share grows to 50 × 1.05 = 52.50 for sure, so you exercise and earn 0.50, worth 0.50/1.05 = 0.4762 today.</p><p>Directly: PV(K) = 52/1.05 = 49.5238 and C = 50 − 49.5238 = 0.4762. At σ = 10% the call is worth 2.2316 and at 20% 4.2064: the floor plus volatility value.</p></div>`,
      q: `<p>A share trades at 64 and pays no dividends. A European call on it has strike 66 and two years to expiry. The risk-free rate is 5% a year. What is the call worth if the share's volatility is zero?</p>`,
      options: ["0.0000", "1.1429", "4.1361", "4.5600"],
      answer: 2,
      solution: `<p>PV(K) = 66/1.05<sup>2</sup> = 66/1.1025 = 59.8639.</p><p>C = max(64 − 59.8639, 0) = <b>4.1361</b>.</p><p>The same as a sure payoff: the share grows to 64 × 1.1025 = 70.56, the call pays 70.56 − 66 = 4.56 and 4.56/1.1025 = 4.1361.</p>`,
      check: `<p>The put at σ = 0 is max(59.8639 − 64, 0) = 0. Parity holds: C − P = 4.1361 = 64 − 59.8639 ✓ It is a floor, so any σ above zero must give more. Black-Scholes gives 4.5405 at σ = 5% and 7.5557 at 15% ✓</p>`,
      traps: [
        "Compared S with K instead of PV(K). 64 − 66 is negative, but the share grows to 70.56 for sure and the call is exercised.",
        "Discounted the strike over one year instead of two: 64 − 66/1.05 = 1.1429.",
        null,
        "Found the sure payoff at expiry, 64 × 1.1025 − 66 = 4.5600. It arrives in two years and must be discounted back.",
      ],
    },
    {
      id: "d3-bs-4",
      title: "Implied volatility: the σ a price is quoting",
      theory: `<p>Four of the five inputs, S, K, T and r<sub>f</sub>, can be read off a screen. Only σ has to be estimated. So traders run the model backwards: the implied volatility is the σ that makes the model price equal the market price. Since value rises with σ, each price matches exactly one σ. Quoting the implied volatility is just another way of quoting the price. Your own σ, from history or from knowing the firm, gives your fair value. If it differs from the implied one, the option is mispriced in your view.</p>
<div class="formula"><div class="eq">σ<sub>implied</sub> solves: model price(σ) = market price</div>
<div class="eq">your σ &gt; σ<sub>implied</sub> ⟹ underpriced: buy &nbsp;·&nbsp; your σ &lt; σ<sub>implied</sub> ⟹ overpriced: write</div>
<div class="where">The rule is the same for calls and puts, since both rise with σ. On the exam you are given the implied σ or a table; you never invert the formula yourself.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Everyone sees the same S, K, T and r<sub>f</sub>, so σ is the one number traders disagree on. Implied volatility works like ρ: take a market price and read off the number that makes the model fit it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A one-year call with S = K = 100 and r<sub>f</sub> = 4% is worth 9.8847 at σ = 20%, 11.7986 at 25%, 13.7164 at 30% and 15.6325 at 35%. It trades at 13.7164, so the implied volatility is 30%.</p><p>You believe 20%. To you the call is worth 9.8847, so it is overpriced by 13.7164 − 9.8847 = 3.8317.</p></div>`,
      q: `<p>A share trades at 40 and pays no dividends. A one-year European put on it with strike 42 trades at 4.1934. The risk-free rate is 4%. The Black-Scholes value of the put at different volatilities is:</p>
<table class="data"><tr><th>σ</th><td>20%</td><td>25%</td><td>30%</td><td>35%</td><td>40%</td></tr>
<tr><th>Put</th><td class="n">3.3975</td><td class="n">4.1934</td><td class="n">4.9871</td><td class="n">5.7779</td><td class="n">6.5654</td></tr></table>
<p>Your own estimate of the share's volatility is 35%. Which line is right?</p>`,
      options: [
        "Implied σ 35%; overpriced by 1.5845, so write it",
        "Implied σ 25%; fairly priced, since its price holds the true σ",
        "Implied σ 25%; overpriced by 1.5845, so write it",
        "Implied σ 25%; underpriced by 1.5845, so buy it",
      ],
      answer: 3,
      solution: `<p>The market price 4.1934 sits in the 25% column, so the implied volatility is 25%.</p><p>At your 35% the put is worth 5.7779. In your view it is mispriced by 5.7779 − 4.1934 = 1.5845. A put rises with σ like a call, so the market price is too low: <b>underpriced by 1.5845, so buy it</b>.</p>`,
      check: `<p>Parity ties the call with strike 42 to the same verdict. C − P = S − PV(K) = 40 − 42/1.04 = −0.3846 at any σ, so the call is worth 3.8088 at 25% and 5.3933 at 35%: underpriced by the same 1.5845 ✓ When parity holds in the market, a call and a put with the same strike and expiry quote the same implied volatility.</p>`,
      traps: [
        "Swapped the two volatilities. The market price is the 25% value, so 25% is implied; 35% is your own view. At 35% the put is worth more than its price.",
        "The market price holds the market's σ, not necessarily the true one. When your estimate differs, the option is mispriced in your view; that is what implied volatility is used for.",
        "Got the volatility effect backwards for the put. A put is floored at zero too, so it rises with σ: at 35% it is worth more than the 25% price.",
        null,
      ],
    },
    {
      id: "d3-bs-5",
      title: "Real options: what if σ is very low?",
      theory: `<p>The option to wait is a call. The underlying S is the project you would get by investing later, valued today; the strike K is the investment cost. Waiting costs you the cash flow you give up meanwhile, which acts like a dividend and lowers S. After a real-options calculation, Kurbatov may ask for the intuition: what if σ is very, very low? Reason with σ = 0. The future is then known and waiting has no upside to capture. The right to wait falls to its floor, S − PV(K). Compare that with the NPV of investing now.</p>
<div class="formula"><div class="eq">σ = 0: &nbsp; value of waiting = max(S − PV(K), 0)</div>
<div class="eq">S = PV(project) − PV(cash flow lost by waiting) &nbsp;·&nbsp; PV(K) = K/(1 + r<sub>f</sub>)</div>
<div class="where">The cost is a fixed amount paid later, so it is discounted at r<sub>f</sub>, as in lecture 11. Invest now if the NPV now beats the value of waiting.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Waiting pays when it lets you skip the bad outcomes. With low σ there are none to skip, so you would take the same decision in a year as today: you only lose the first cash flow and gain a year's interest on K. With high σ waiting keeps the upside and drops the downside.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11, the restaurant)</span><p>Cost K = 5 million, cash flow 0.6 million a year from year 1 growing at 2%, cost of capital 12%, r<sub>f</sub> = 5%. Now: 0.6/(0.12 − 0.02) = 6, so NPV = 1.</p><p>Waiting gives up the first 0.6: S = 6 − 0.6/1.12 = 5.4643 and PV(K) = 5/1.05 = 4.7619. At σ = 0 waiting is worth 5.4643 − 4.7619 = 0.7024, less than 1: open now. Waiting a year gains you nothing.</p></div>`,
      q: `<p>You can invest 10 million in a project now or in one year. It pays 1.2 million a year from year 1, growing at 2% a year for ever. The cost of capital is 12% and the risk-free rate 5%. Investing in a year means losing the first 1.2 million. Comparable firms suggest the volatility of the project's value is close to zero. Using σ = 0, what is the right to wait worth (in millions) and what do you do?</p>`,
      options: ["2.4762, wait", "1.4048, invest now", "1.4048, wait", "0.9286, invest now"],
      answer: 1,
      solution: `<p>NPV now: 1.2/(0.12 − 0.02) − 10 = 12 − 10 = 2.0000.</p><p>S = 12 − 1.2/1.12 = 12 − 1.0714 = 10.9286 and PV(K) = 10/1.05 = 9.5238.</p><p>Value of waiting at σ = 0: 10.9286 − 9.5238 = <b>1.4048</b>, below the 2.0000 from investing now, so <b>invest now</b>.</p>`,
      check: `<p>The gap 2.0000 − 1.4048 = 0.5952 is the trade waiting offers when nothing is uncertain: you lose the first cash flow (worth 1.0714) and save a year's interest on the cost (10 − 9.5238 = 0.4762). 1.0714 − 0.4762 = 0.5952 ✓ With volatility the answer can flip: the Black-Scholes value of waiting, not needed on the exam, passes 2.0000 at a σ of about 29%.</p>`,
      traps: [
        "Forgot that waiting gives up the first cash flow: 12 − 9.5238 = 2.4762. The lost 1.2 million acts like a dividend and must come out of S.",
        null,
        "Compared the value of waiting with zero instead of with investing now. 1.4048 is positive, but below the 2.0000 NPV of investing today.",
        "Did not discount the cost: 10.9286 − 10 = 0.9286. The cost is paid in a year, so today it is worth 10/1.05. The decision is right, the number is not.",
      ],
    },
    {
      id: "d3-bs-6",
      title: "Exam level: true volatility below implied (H2025 E1)",
      theory: `<p>H2025 Exercise 1 gave 12 points with no computation: an option's price implies one σ, a well-informed friend says the true σ is lower. What does that do to the value and what should you do? The marks go to four moves, in this order. The comparative static: value rises with σ because the payoff is floored at zero. The direction: at the true σ the option is worth less than its price, so it is overpriced. The action: do not buy it; better, write it and delta-hedge, so you bet on volatility and not on the share's direction. The limit: it is not an arbitrage, since your σ may be wrong. Answer both questions; four to six sentences is enough.</p>
<div class="formula"><div class="eq">true σ &lt; implied σ ⟹ value &lt; price ⟹ overpriced: do not buy, write and hedge</div>
<div class="where">It holds for the call and the put with the same strike alike: σ is not in parity, so both are overpriced by the same amount. If your σ is above the implied one, everything flips.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The price already pays for the volatility the market expects. If the share will move less, a buyer pays for spread that will not come. The writer keeps the difference.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: a model answer</span><p>The setting: a one-year call (S = 60, K = 62, r<sub>f</sub> = 4%) trades at 10.84, implying σ = 45%; a friend says the truth is 30%.</p><p>Option value rises with σ, because the payoff is floored at zero: more spread adds upside but no downside. At 30% the call is worth less than 10.84 (7.33), so it is overpriced. Do not buy it; write it and buy about 0.57 shares per call, so the position bets on volatility, not on direction. This is not an arbitrage: it pays only if the true σ is near 30%.</p></div>`,
      q: `<p>You own shares in a firm that trade at 120 and plan to protect them with a one-year European put with strike 115, priced at 12.70. The risk-free rate is 3% and the price implies a volatility of 36%. An analyst who has followed the firm for years convinces you that the true volatility is 24%. What does the true volatility do to the put's value and what should you do about the put?</p>`,
      options: [
        "Its value is below 12.70, since value rises with σ: the payoff is floored at zero. The put is overpriced, so do not buy it; write it and delta-hedge.",
        "Its value is above 12.70: a less volatile share is safer, so the insurance a put gives is worth more. The put is cheap, so buy it before the market catches up.",
        "Its value is below 12.70, so the put is overpriced. By put-call parity the call with the same strike must then be underpriced, so buy the call instead.",
        "Its value is below 12.70, so the put is overpriced. Write it and keep the premium unhedged: with the price above fair value, the profit is riskless.",
      ],
      answer: 0,
      solution: `<p>Value rises with σ for a put as for a call: the put pays max(K − S<sub>T</sub>, 0), so more spread adds payoff in the left tail and costs nothing on the right. The 12.70 is the value at 36%, so at the true 24% the put is worth less: it is <b>overpriced</b>.</p><p>Do not buy it. Better, write it and hedge the share exposure, so you profit from the mispricing rather than from the share's direction. Add the limit: it is not an arbitrage, you are betting that 24% is right.</p>`,
      check: `<p>The numbers, not needed on the exam, confirm the direction: the Black-Scholes value is 12.6977 at 36% (the quoted 12.70) and 7.3816 at 24%, an overpricing of 5.3161, about 42% of the price. The call with strike 115 is overpriced by the same 5.3161 (21.0473 against 15.7311), since σ is not in C − P = S − PV(K). A written put loses if the share falls hard, so the hedge is a short position of about 0.34 shares per put.</p>`,
      traps: [
        null,
        "Got the volatility effect backwards. A put is floored at zero like a call, so less spread means less payoff in the left tail: it is worth less, not more.",
        "σ is not in put-call parity, C − P = S − PV(K), so a lower σ lowers the call by exactly as much as the put. The call is overpriced too.",
        "Not an arbitrage: the profit depends on the analyst being right about σ. An unhedged written put loses heavily if the share collapses.",
      ],
    },
  ],
});

/* sjanger 105 · d3-gjeld · Debt and equity as options */
window.EDU_DATA.sjangre.push({
  id: "d3-gjeld",
  num: 105,
  seksjon: "del3",
  emne: "Kreditt",
  symboler: "kreditt",
  title: "Debt and equity as options",
  summary: "Equity as a call, debt as risk-free debt plus a written put, the risk-shifting transfer, senior and junior layers and coinsurance in a merger",
  chapters: [24],
  exam: "V2024 P4 · 2022 P4 · PS3 E6 (Google) flagged for 2026",
  intro: `<p>Credit risk has been on 8 of 11 papers but not yet on Kurbatov's two. For 2026 Kurbatov flagged three things: explaining why debt is risk-free debt plus a written put, the Google exercise with senior and junior debt (Problem Set 3, Exercise 6) and the coinsurance example from the M&amp;A lecture, which the spring 2024 paper used as Problem 4. This short ladder turns the balance sheet into options, values the claims in a tree, shows why shareholders like risk and splits debt into layers. At the top you can work a merger's effect on four groups of claim holders and name it.</p>`,
  steps: [
    {
      id: "d3-gjeld-1",
      title: "Equity is a call, debt is risk-free debt plus a written put",
      theory: `<p>Take a firm whose only debt is a zero-coupon bond with face value F due at T. At T the shareholders either pay F and keep the rest or hand the assets to the creditors. Limited liability means they never pay more. So equity pays max(V<sub>T</sub> − F, 0): a call on the firm's assets V with strike F. The creditors get min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0): a safe F minus the payoff of a put on the assets struck at F. The shareholders hold that put, their option to default. The creditors have written it.</p>
<div class="formula"><div class="eq">E = Call(V, F) &nbsp;·&nbsp; D = PV(F) − Put(V, F) = V − Call(V, F)</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>)<sup>T</sup>. In Kurbatov's words, risky debt is risk-free debt plus a written put. Being short a put subtracts its value, so the formula has a minus. Never write risk-free debt minus a written put: that flips the sign. The underlying is the firm's assets V, not the debt D.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Limited liability is an option the creditors have granted. When the assets fall below F the shareholders walk away and the shortfall lands on the lender. The put is worth exactly what risky debt loses against safe debt.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100. If V<sub>T</sub> = 150: equity gets 50, debt 100 and the put pays 0.</p><p>If V<sub>T</sub> = 60: equity gets 0, debt 60 = 100 − 40 and the put pays 100 − 60 = 40. The creditors are the ones who pay that 40, through the shortfall.</p></div>`,
      q: `<p>A firm's only debt is a zero-coupon bond with face value F. An exam question asks you to describe the creditors' position with options on the firm's assets. Which description is right?</p>`,
      options: [
        "Risk-free debt with face value F minus a written put on the firm's assets, strike F",
        "Risk-free debt with face value F plus a bought put on the firm's assets, strike F",
        "Risk-free debt with face value F plus a written put on the firm's assets, strike F",
        "A call on the firm's assets with strike F, written to them by the shareholders",
      ],
      answer: 2,
      solution: `<p>The creditors receive min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). The first term is a safe claim to F. The second is the payoff of a put on the firm's assets with strike F. It enters with a minus: the creditors pay it, so they are short the put. Short is the same as written. So the creditors hold <b>risk-free debt plus a written put</b>, worth D = PV(F) − Put.</p>`,
      check: `<p>Test with numbers: F = 80 and V<sub>T</sub> = 50. Risk-free debt pays 80 and the written put costs the creditors max(80 − 50, 0) = 30, so they get 50 = V<sub>T</sub> ✓ With minus a written put they would get 80 + 30 = 110, more than the whole firm.</p>`,
      traps: [
        "Flipped the sign. Minus a written put means plus the put's value: the creditors would gain from a default. The right wording is plus a written put, D = PV(F) − Put.",
        "Got the side of the put backwards. Risk-free debt plus a bought put pays F + (F − V<sub>T</sub>) in default, more than the firm owns. The creditors have written the put. Buying one on top of risky debt gives the risk-free bond, which is what a CDS does.",
        null,
        "Equity, not debt, is the call on the assets struck at F. Debt is the assets minus that call, D = V − Call.",
      ],
    },
    {
      id: "d3-gjeld-2",
      title: "Valuing E and D in a one-period tree",
      theory: `<p>To value the claims you need prices, not expected payoffs. In a one-period tree the firm's assets move from V<sub>0</sub> to V<sub>u</sub> or V<sub>d</sub>. The risk-neutral probability ρ is the up probability under which the assets earn exactly r<sub>f</sub>. Work state by state: equity pays max(V − F, 0) and debt pays min(V, F). Weight each payoff by ρ and 1 − ρ and discount at r<sub>f</sub>. Real probabilities never enter, because V<sub>0</sub> already contains them.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>)</div>
<div class="eq">E<sub>0</sub> = [ρ·max(V<sub>u</sub> − F, 0) + (1 − ρ)·max(V<sub>d</sub> − F, 0)]/(1 + r<sub>f</sub>) &nbsp;·&nbsp; D<sub>0</sub> = V<sub>0</sub> − E<sub>0</sub></div>
<div class="where">ρ is on the formula sheet. Apply the max and the min in each state before you average.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The floor at zero is worth something. E<sub>0</sub> is more than V<sub>0</sub> − PV(F). The difference is the put: the value of walking away in the down state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 120, V<sub>d</sub> = 80, r<sub>f</sub> = 4%, F = 90. ρ = (104 − 80)/40 = 0.60.</p><p>Equity pays 30 or 0: E<sub>0</sub> = 0.6 × 30/1.04 = 17.3077. Debt pays 90 or 80: D<sub>0</sub> = (54 + 32)/1.04 = 82.6923. Sum 100 ✓</p><p>The put pays 0 or 10, worth 0.4 × 10/1.04 = 3.8462. PV(F) − Put = 86.5385 − 3.8462 = 82.6923 ✓</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 320 in one year. Analysts put the probability of the up state at 0.7. The firm's only debt is a one-year zero-coupon bond with face value 360. The risk-free rate is 4%. What is the firm's equity worth today?</p>`,
      options: ["53.8462", "73.8462", "76.8000", "107.6923"],
      answer: 1,
      solution: `<p>ρ = (1.04 × 400 − 320)/(520 − 320) = 96/200 = 0.48.</p><p>Equity pays max(520 − 360, 0) = 160 up and max(320 − 360, 0) = 0 down.</p><p>E<sub>0</sub> = 0.48 × 160/1.04 = 76.80/1.04 = <b>73.8462</b>.</p>`,
      check: `<p>Debt pays 360 or 320: D<sub>0</sub> = (0.48 × 360 + 0.52 × 320)/1.04 = 339.20/1.04 = 326.1538. Then 73.8462 + 326.1538 = 400 ✓ The put pays 0 or 40, worth 0.52 × 40/1.04 = 20.0000. PV(F) − Put = 346.1538 − 20.0000 = 326.1538 ✓ Equity also beats the no-floor value V<sub>0</sub> − PV(F) = 53.8462 by exactly that put.</p>`,
      traps: [
        "Dropped limited liability: V<sub>0</sub> − PV(F) = 400 − 346.1538 = 53.8462 charges the shareholders the shortfall of 40 in the down state.",
        null,
        "Forgot to discount the risk-neutral expectation: 0.48 × 160 = 76.8000.",
        "Used the analysts' 0.7 instead of ρ: 0.7 × 160/1.04 = 107.6923. Real probabilities never pair with r<sub>f</sub>.",
      ],
    },
    {
      id: "d3-gjeld-3",
      title: "Why shareholders like risk: the wealth transfer",
      theory: `<p>Equity is a call on the assets. A call is worth more when the underlying is more volatile. Debt is risk-free debt minus a put, which is worth more too. So if the firm makes its assets riskier without changing their value V, the equity rises and the debt falls by the same amount. No value is created; it moves from the creditors to the shareholders. The graders look for the words <b>wealth transfer</b>. Taken far enough, shareholders accept a negative-NPV gamble: asset substitution, or gambling for resurrection.</p>
<div class="formula"><div class="eq">V unchanged, σ up ⟹ ΔE = −ΔD &gt; 0</div>
<div class="where">Consistency check 4: creditors' gain = shareholders' loss when total value is fixed, here with the creditors losing. Keep ρ: it comes from market prices and does not change when one firm swaps its assets.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The shareholders keep all the extra upside and, thanks to the floor at zero, none of the extra downside. That downside lands on the creditors, whose debt was priced before the switch.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The firm from the last example (V<sub>0</sub> = 100, 120 or 80, F = 90, r<sub>f</sub> = 4%, ρ = 0.60) swaps to assets worth 140 or 50. They are still worth (0.6 × 140 + 0.4 × 50)/1.04 = 104/1.04 = 100.</p><p>Equity: 0.6 × 50/1.04 = 28.8462, up 11.5385. Debt: (0.6 × 90 + 0.4 × 50)/1.04 = 71.1538, down 11.5385.</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 320 in one year. Its only debt is a one-year zero-coupon bond with face value 360. The risk-free rate is 4%. The managers swap the assets for riskier ones that will be worth 572 or 272 in the same two states and are also worth 400 today. What happens to the values of the equity and the debt?</p>`,
      options: [
        "Equity +24.0000 and debt −24.0000: a wealth transfer to the shareholders",
        "Equity 0.0000 and debt 0.0000: V is unchanged, so no one gains or loses",
        "Equity +24.0000 and debt unchanged: the riskier assets create value",
        "Equity +24.9600 and debt −24.9600: a wealth transfer to shareholders",
      ],
      answer: 0,
      solution: `<p>ρ = (1.04 × 400 − 320)/200 = 0.48. The new assets are still worth (0.48 × 572 + 0.52 × 272)/1.04 = 416/1.04 = 400.</p><p><b>Equity.</b> Before: 0.48 × 160/1.04 = 73.8462. After it pays 572 − 360 = 212 or 0: 0.48 × 212/1.04 = 97.8462. Change +24.0000.</p><p><b>Debt.</b> Before: 326.1538. After it pays 360 or 272: (172.80 + 141.44)/1.04 = 302.1538. Change −24.0000.</p><p>Firm value is unchanged, so this is a <b>wealth transfer</b> of 24.0000 from the creditors to the shareholders.</p>`,
      check: `<p>Consistency check 4: +24.0000 − 24.0000 = 0 with V fixed at 400 ✓ The put tells the same story: it now pays 0 or 360 − 272 = 88, worth 0.52 × 88/1.04 = 44.0000 against 20.0000 before. The debt's yield jumps from 360/326.1538 − 1 = 10.3774% to 360/302.1538 − 1 = 19.1446%: new lenders would price that in, the old ones cannot.</p>`,
      traps: [
        null,
        "V is unchanged, but its split is not. The call on the assets gains from the extra spread and the debt, short a put, loses the same amount.",
        "Looked at the equity only. With V fixed at 400 the 24.0000 must come from somewhere: the debt falls by exactly that much.",
        "Forgot to discount: 0.48 × 212 − 0.48 × 160 = 24.9600 is the change in the risk-neutral expected payoff a year from now.",
      ],
    },
    {
      id: "d3-gjeld-4",
      title: "Senior and junior debt from two calls",
      theory: `<p>With two layers of debt, value them one layer at a time (lecture 10, the Google exercise). Pretend first that only the senior debt exists: equity would be the call struck at F<sub>S</sub>, so the senior debt is V − C(F<sub>S</sub>). With both layers the shareholders are paid only after F<sub>S</sub> + F<sub>J</sub>, so equity is the call struck at the total. The junior debt is what lies between the two calls.</p>
<div class="formula"><div class="eq">D<sub>S</sub> = V − C(F<sub>S</sub>) &nbsp;·&nbsp; E = C(F<sub>S</sub> + F<sub>J</sub>) &nbsp;·&nbsp; D<sub>J</sub> = C(F<sub>S</sub>) − C(F<sub>S</sub> + F<sub>J</sub>)</div>
<div class="eq">y = (F/D)<sup>1/T</sup> − 1</div>
<div class="where">If the firm has no debt today, a call on one share struck at F/n is a call on 1/n of the assets, where n is the number of shares. So C(F) = n × the quoted call price with strike F/n. Take the midpoint of bid and ask, multiply by n and say that you did. T is in years: 30 months is T = 2.5.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The junior creditors get nothing until the seniors are paid in full, then everything up to F<sub>J</sub>. They take the first losses after the shareholders, so their yield is the highest of the three layers.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>100 million shares at 80 (V = 8 billion), no debt. Plan: senior 3 billion and junior 2 billion, both due in one year. Calls: strike 30 at 50.80/51.20, strike 50 at 33.30/33.70.</p><p>Midpoints 51.00 and 33.50. D<sub>S</sub> = 8 − 0.1 × 51.00 = 2.90. E = 0.1 × 33.50 = 3.35. D<sub>J</sub> = 8 − 2.90 − 3.35 = 1.75 = 0.1 × (51.00 − 33.50).</p><p>y<sub>J</sub> = 2/1.75 − 1 = 14.2857% against y<sub>S</sub> = 3/2.90 − 1 = 3.4483%.</p></div>`,
      q: `<p>A firm has 500 million shares trading at 90 and no debt. Markets are perfect and the risk-free rate is 3%. It considers issuing two zero-coupon bonds due in 30 months: senior debt with face value 20 billion and junior debt with face value 10 billion. European calls on its shares expiring in 30 months are quoted at bid 53.95 and ask 54.35 for strike 40 and at bid 37.60 and ask 38.00 for strike 60. What annual yield would the junior bond pay?</p>`,
      options: ["5.7286%", "22.3242%", "12.0483%", "8.3939%"],
      answer: 3,
      solution: `<p><b>Strikes.</b> Senior: 20/0.5 = 40 per share. Total: (20 + 10)/0.5 = 60 per share.</p><p><b>Midpoints.</b> (53.95 + 54.35)/2 = 54.15 and (37.60 + 38.00)/2 = 37.80.</p><p><b>Layers.</b> V = 0.5 × 90 = 45 billion. D<sub>S</sub> = 45 − 0.5 × 54.15 = 45 − 27.075 = 17.925. E = 0.5 × 37.80 = 18.900. D<sub>J</sub> = 45 − 17.925 − 18.900 = 8.175 = 0.5 × (54.15 − 37.80).</p><p><b>Yield.</b> y<sub>J</sub> = (10/8.175)<sup>1/2.5</sup> − 1 = <b>8.3939%</b> a year.</p>`,
      check: `<p>Grow the junior debt back: 8.175 × 1.083939<sup>2.5</sup> = 10.000 ✓ The three yields line up as they must: senior (20/17.925)<sup>0.4</sup> − 1 = 4.4788%, all debt together (30/26.100)<sup>0.4</sup> − 1 = 5.7286%, junior 8.3939%. Neither layer is worth more than its risk-free value: 17.925 &lt; 20/1.03<sup>2.5</sup> = 18.5753 and 8.175 &lt; 9.2877 ✓</p>`,
      traps: [
        "Gave the yield on all 30 billion together: (30/26.100)<sup>0.4</sup> − 1 = 5.7286%. Splitting the debt moves the risk onto the junior layer.",
        "Did not annualise: 10/8.175 − 1 = 22.3242% is the return over 30 months.",
        "Valued the senior debt as risk-free, 20/1.03<sup>2.5</sup> = 18.5753, so D<sub>J</sub> = 45 − 18.5753 − 18.900 = 7.5247 and (10/7.5247)<sup>0.4</sup> − 1 = 12.0483%. The senior debt is risky too.",
        null,
      ],
    },
    {
      id: "d3-gjeld-5",
      title: "Coinsurance: who gains when two levered firms merge",
      theory: `<p>Merge two levered firms with no synergies whose bad states do not coincide. Each firm's assets now stand behind both firms' debt, so a surplus at one covers a shortfall at the other. The merged debt defaults less often and is worth more: the <b>coinsurance effect</b>. The old debt was priced before the merger as risky debt, so the creditors now hold a safer claim than the one they paid for. Firm value is unchanged, so the creditors' gain is the shareholders' loss: a wealth transfer.</p>
<div class="formula"><div class="eq">merged debt in state s = min(V<sub>A,s</sub> + V<sub>B,s</sub>, F<sub>A</sub> + F<sub>B</sub>)</div>
<div class="eq">Call(V<sub>A</sub> + V<sub>B</sub>) ≤ Call(V<sub>A</sub>) + Call(V<sub>B</sub>)</div>
<div class="where">Add the assets state by state first, then apply the min against the total face value. With risk-neutral investors and r<sub>f</sub> = 0, each claim is worth its average payoff.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Apart, each group of shareholders could walk away from its own bad state. Merged, the good firm's surplus must first fill the other firm's hole. Two calls are worth more than one call on the sum. The debt gains what the calls lose.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, r<sub>f</sub> = 0. A is worth 30 or 12 and owes 18; B is worth 10 or 26 and owes 14.</p><p>Apart: A's debt pays 18 or 12, worth 15, with equity worth 6. B's debt pays 10 or 14, worth 12, with equity worth 6.</p><p>Merged: 40 or 38 against 32, so the debt is worth 32 and the equity (8 + 6)/2 = 7. Creditors gain 32 − 27 = 5; shareholders lose 12 − 7 = 5.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 40 or 10 and owes 24. Firm B will be worth 8 or 26 and owes 16. Both debts are zero-coupon bonds due at the same date. The firms merge with no synergies and the merged firm takes over both debts. By how much do the creditors of the two firms gain in total?</p>`,
      options: ["−9.00", "9.00", "0.00", "11.00"],
      answer: 1,
      solution: `<p><b>Apart.</b> A's debt pays 24 or 10, worth 17. B's pays 8 or 16, worth 12. Total 29.</p><p><b>Merged.</b> Add first: 40 + 8 = 48 and 10 + 26 = 36, against 24 + 16 = 40. The debt pays 40 or 36, worth 38.</p><p>The creditors gain 38 − 29 = <b>9.00</b>.</p>`,
      check: `<p>Equity apart: A pays 16 or 0, worth 8; B pays 0 or 10, worth 5; total 13. Merged equity pays 8 or 0, worth 4: the shareholders lose 9 ✓ Firm value is 29 + 13 = 42 = 38 + 4 before and after (consistency check 4). The option route agrees: the puts the creditors have written were worth (0 + 14)/2 + (8 + 0)/2 = 11 apart and (0 + 4)/2 = 2 merged, a gain of 9 to the creditors.</p>`,
      traps: [
        "Gave the shareholders' change, not the creditors'. The merged equity is worth 4 against 13 apart; the creditors gain the same 9.",
        null,
        "No synergies means firm value is fixed, not that nothing moves. The merged assets back both bonds, so the debt is worth more and the equity less.",
        "Averaged the merged assets first: min(42, 40) = 40, as if the debt were risk-free. It falls short by 4 in state 2, so it is worth 38.",
      ],
    },
    {
      id: "d3-gjeld-6",
      title: "Exam level: coinsurance with four groups (V2024 P4)",
      theory: `<p>V2024 Problem 4 (28 points) was the coinsurance example from the M&amp;A lecture with new numbers. Kurbatov called that example a hint for this year's exam. It asked for four things: assets, debt and equity of each firm apart; the same for the merged firm; the gain or loss of each of the four groups with the check that they cancel, plus whether the shareholders would merge; the name of the effect. In the exam the merged debt became risk-free. Split the merged equity as the question says, usually in proportion to the equity values before the merger.</p>
<div class="formula"><div class="eq">ΔD<sub>A</sub> + ΔD<sub>B</sub> + ΔE<sub>A</sub> + ΔE<sub>B</sub> = 0 &nbsp;(no synergies)</div>
<div class="where">Name the coinsurance effect and say why it happens: the old debt was priced before the merger, so the creditors' gain is a wealth transfer from the shareholders. No exchange ratio rescues both groups of shareholders, since it only splits a smaller equity.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risk reduction is no reason to merge. Shareholders can diversify on their own. When the firm does it for them, the safer debt hands value to creditors who never paid for it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, r<sub>f</sub> = 0. A is worth 50 or 8 and owes 18; B is worth 10 or 28 and owes 12.</p><p>Apart: debt A 13, equity A 16; debt B 11, equity B 8. Merged: 60 or 36 against 30, so the debt is risk-free at 30 and the equity is (30 + 6)/2 = 18, split 16 : 8 into 12 and 6.</p><p>Creditors A +5, B +1; shareholders A −4, B −2. Sum 0 ✓ Both groups of shareholders lose.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 52 or 10 and owes 22. Firm B will be worth 10 or 40 and owes 16. Both debts are zero-coupon bonds due at the same date. The firms merge with no synergies. Each group of shareholders gets a share of the merged equity in proportion to its equity value before the merger. Which line gives the change in value of each group and the shareholders' decision?</p>`,
      options: [
        "Creditors A +6.00, B +3.00; shareholders A −5.00, B −4.00; the shareholders reject",
        "Creditors A +6.00, B +3.00; shareholders A −6.00, B −3.00; the shareholders reject",
        "Creditors A 0.00, B 0.00; shareholders A 0.00, B 0.00; the shareholders are indifferent",
        "Creditors A +6.00, B +3.00; shareholders A −5.00, B −4.00; the shareholders are indifferent",
      ],
      answer: 0,
      solution: `<p><b>Apart.</b> A: debt pays 22 or 10, worth 16; equity 30 or 0, worth 15; V<sub>A</sub> = 31. B: debt pays 10 or 16, worth 13; equity 0 or 24, worth 12; V<sub>B</sub> = 25.</p><p><b>Merged.</b> Assets 62 or 50 against F = 38, so the debt is risk-free and worth 38. Equity pays 24 or 12, worth 18. V = 56 = 31 + 25.</p><p><b>Split.</b> Equity before was 15 : 12, so A's shareholders get 18 × 15/27 = 10 and B's get 8. Each bond is now paid in full: 22 and 16.</p>
<table class="data"><tr><th>Group</th><th>Before</th><th>After</th><th>Change</th></tr>
<tr><td>Creditors A</td><td class="n">16.00</td><td class="n">22.00</td><td class="n">+6.00</td></tr>
<tr><td>Creditors B</td><td class="n">13.00</td><td class="n">16.00</td><td class="n">+3.00</td></tr>
<tr><td>Shareholders A</td><td class="n">15.00</td><td class="n">10.00</td><td class="n">−5.00</td></tr>
<tr><td>Shareholders B</td><td class="n">12.00</td><td class="n">8.00</td><td class="n">−4.00</td></tr>
<tr><td>Total</td><td class="n">56.00</td><td class="n">56.00</td><td class="n">0.00</td></tr></table>
<p>Both groups of shareholders lose, so they <b>reject</b> the merger. The effect is coinsurance: a wealth transfer to creditors whose debt was priced before the merger.</p>`,
      check: `<p>Consistency check 4: the creditors gain 6 + 3 = 9 and the shareholders lose 5 + 4 = 9 while V stays at 56 ✓ The check cannot catch a wrong split of the equity: a 50 : 50 split gives −6 and −3, which still sums to −9. Only the proportional rule catches it. The bound that can fail: merged equity of 18 is below the 27 the two groups held apart, so no exchange ratio makes both better off.</p>`,
      traps: [
        null,
        "Split the merged equity 50 : 50, 9 each, instead of 15 : 12: A loses 15 − 9 = 6 and B 12 − 9 = 3. The four changes still sum to zero, so check 4 does not catch it.",
        "Assumed nothing moves because there are no synergies. Total value is fixed, but the merged assets now back both bonds, so value moves from the shareholders to the creditors.",
        "Judged the merger by firm value, which is unchanged, instead of by the shareholders' own claims. Both groups lose, so they reject.",
      ],
    },
  ],
});

/* sjanger 106 · d3-cds · Pricing default protection: the CDS */
window.EDU_DATA.sjangre.push({
  id: "d3-cds",
  num: 106,
  seksjon: "del3",
  emne: "Kreditt",
  title: "Pricing default protection: the CDS",
  summary: "Draw the tree, back out the default probability ρ, price the CDS and the protection on a bond, then check that bond plus CDS is risk-free",
  chapters: [5, 24],
  exam: "V2024 P3 (28 points) · lecture 10's CDS example, flagged for 2026",
  intro: `<p>V2024 Problem 3 was the CDS example from lecture 10 with the lecture's own numbers. Kurbatov said that very few solved it then and that a very similar example could be on this year's exam. The trap is the tree: more than half the class lost points by pricing with the survival probability. This short ladder follows the lecture's convention throughout: <b>ρ is the risk-neutral probability of default and sits in the bottom branch</b>. You draw the tree, back ρ out of a bond's price, price the CDS and the protection on a whole bond and say why ρ is so much higher than the real default probability. At the top you can solve all three parts of V2024 Problem 3.</p>`,
  steps: [
    {
      id: "d3-cds-1",
      title: "The risky bond: promised yield against expected return",
      theory: `<p>Draw the tree first; it takes ten seconds. A one-year zero-coupon bond promises its face value F. Top branch, no default: it pays F. Bottom branch, default: it pays only F(1 − LGD), where LGD is the loss given default as a fraction of F. The price comes from the promised yield y. The yield is a promise, earned only in the top branch. The expected return uses the real default probability p and the payoffs in both branches.</p>
<div class="formula"><div class="eq">P = F/(1 + y) &nbsp;·&nbsp; E[payoff] = (1 − p)·F + p·F(1 − LGD) &nbsp;·&nbsp; r = E[payoff]/P − 1</div>
<div class="where">p is the real default probability. Real probabilities give expected returns; prices need the risk-neutral one, which comes in the next step. For a risky bond r<sub>f</sub> &lt; r &lt; y.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The promised yield counts every krone as if it will arrive. Take out the expected loss and you get the expected return. That is still above r<sub>f</sub>, because defaults come in bad times and investors want a premium for bearing them.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100, y = 8%, real default probability 5%, the bond pays 70 in default.</p><p>P = 100/1.08 = 92.5926. E[payoff] = 0.95 × 100 + 0.05 × 70 = 98.50. r = 98.50/92.5926 − 1 = 6.3800%, below the promised 8%.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 11%. If the issuer defaults, the bond pays 60. Analysts put the real probability of default at 8%. The risk-free rate is 4%. What is the bond's expected return, to four decimals?</p>`,
      options: ["11.0000%", "4.0000%", "7.8000%", "7.4480%"],
      answer: 3,
      solution: `<p>Tree: no default (0.92) pays 100; default (0.08) pays 60.</p><p>P = 100/1.11 = 90.0901. E[payoff] = 0.92 × 100 + 0.08 × 60 = 92 + 4.80 = 96.80.</p><p>r = 96.80/90.0901 − 1 = <b>7.4480%</b>.</p>`,
      check: `<p>The gap between promise and expectation, 11% − 7.4480% = 3.5520%, is the expected loss 0.08 × 40 = 3.20 divided by the price: 3.20/90.0901 = 3.5520% ✓ The order r<sub>f</sub> = 4% &lt; 7.4480% &lt; 11% holds: the 3.4480% above r<sub>f</sub> is the premium for default risk.</p>`,
      traps: [
        "Gave the promised yield. 11% is earned only if the issuer pays in full; the expected return counts the default branch too.",
        "Assumed the bond earns r<sub>f</sub>. That holds only under risk-neutral probabilities; with the real 8% the expected return carries a risk premium.",
        "Used the shortcut y − p·LGD = 11% − 0.08 × 40% = 7.8000%. It is only an approximation; with the payoffs given, use them.",
        null,
      ],
    },
    {
      id: "d3-cds-2",
      title: "Backing ρ out of the bond's price",
      theory: `<p>The bond's price tells you what the market charges for default. Under risk-neutral pricing every asset earns r<sub>f</sub>, so the price equals the expected payoff under the risk-neutral probabilities, discounted at r<sub>f</sub>. Follow the lecture's convention: <b>ρ is the risk-neutral probability of default</b>. Put it in the bottom branch next to the default payoff and keep it there to the end. On the exam where this example came, more than half the class lost points by pricing with 1 − ρ, the survival probability.</p>
<div class="formula"><div class="eq">P = [(1 − ρ)·F + ρ·F(1 − LGD)]/(1 + r<sub>f</sub>) &nbsp;⟹&nbsp; ρ = [F − P(1 + r<sub>f</sub>)]/(F·LGD)</div>
<div class="where">Here ρ belongs to the bottom branch. In the share trees of the options ladders ρ sat in the up branch; in a CDS question the branch you price is default. ρ is not a forecast: it lies above the real default probability.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Discounting at r<sub>f</sub> leaves no room for a risk premium in the rate, so the premium goes into the probability. The bad branch gets more weight than it really has.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The bond from the last example (F = 100, y = 8%, pays 70 in default) with r<sub>f</sub> = 3%.</p><p>P × 1.03 = 92.5926 × 1.03 = 95.3704. So 100 − 30ρ = 95.3704 and ρ = 4.6296/30 = 0.1543, three times the real 5%.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 11% and pays 60 if the issuer defaults. Analysts put the real probability of default at 8%. The risk-free rate is 4%. What risk-neutral probability of default ρ does the bond's price imply?</p>`,
      options: ["84.2342%", "8.0000%", "15.7658%", "24.7748%"],
      answer: 2,
      solution: `<p>Tree: the top branch (1 − ρ) pays 100, the bottom branch (ρ) pays 60.</p><p>P = 100/1.11 = 90.0901, so [(1 − ρ) × 100 + ρ × 60]/1.04 = 90.0901.</p><p>100 − 40ρ = 90.0901 × 1.04 = 93.6937, so ρ = 6.3063/40 = <b>15.7658%</b>.</p>`,
      check: `<p>Reprice: (0.842342 × 100 + 0.157658 × 60)/1.04 = 93.6937/1.04 = 90.0901 ✓ With ρ in the top branch the same numbers give (0.157658 × 100 + 0.842342 × 60)/1.04 = 63.7561, nowhere near the price. And 15.7658% is about twice the real 8%, as it should be.</p>`,
      traps: [
        "Gave the survival probability 1 − ρ = 84.2342%. Define ρ as the default probability, put it in the bottom branch with the 60 and keep it there.",
        "Gave the real probability. The price is set with risk-neutral probabilities: 8% would price the bond at 96.80/1.04 = 93.0769, not 90.0901.",
        null,
        "Forgot to grow the price at r<sub>f</sub>: 100 − 40ρ = 90.0901 gives 24.7748%. The payoff arrives in a year, so it must equal 90.0901 × 1.04.",
      ],
    },
    {
      id: "d3-cds-3",
      title: "The price of a CDS that pays 1 in default",
      theory: `<p>A credit default swap (CDS) is insurance on a bond: the buyer pays a price today and is paid the loss if the issuer defaults. Price the basic contract, which pays 1 in the default branch and 0 otherwise. Its risk-neutral expected payoff is ρ × 1, discounted at r<sub>f</sub>. The price is per unit of protection: per krone or dollar paid out in default.</p>
<div class="formula"><div class="eq">CDS paying 1 in default = ρ/(1 + r<sub>f</sub>)</div>
<div class="where">ρ is the risk-neutral default probability from the bond's price: not the real probability and not 1 − ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The CDS pays exactly when the bond falls short, in the bottom branch. You are buying money in the bad state, where money is scarce, so it costs more than its real expected payout.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10)</span><p>A bond promises 100, yields 10% and pays 80 in default; r<sub>f</sub> = 5% and the real default probability is 10%. P = 100/1.10 = 90.9091. 100 − 20ρ = 90.9091 × 1.05 = 95.4545, so ρ = 0.2273.</p><p>CDS = 0.2273/1.05 = 0.2165 per dollar of protection; the slide and the exam key write 0.2164 because they cut ρ to 0.2272 instead of rounding it. That is about 21.6 cents per dollar. In class it was once called 21.64 dollars, a slip.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 9% and pays 75 if the issuer defaults. Analysts put the real probability of default at 6%. The risk-free rate is 3%. What is the price today of a CDS that pays 1 if the issuer defaults and nothing otherwise?</p>`,
      options: ["0.0583", "0.2138", "0.2202", "0.7571"],
      answer: 1,
      solution: `<p>P = 100/1.09 = 91.7431. The bottom branch ρ pays 75: 100 − 25ρ = 91.7431 × 1.03 = 94.4954, so ρ = 5.5046/25 = 0.220183.</p><p>CDS = 0.220183/1.03 = <b>0.2138</b> per unit of protection.</p>`,
      check: `<p>A claim that pays 1 in default plus one that pays 1 otherwise is a risk-free 1: 0.213770 + 0.779817/1.03 = 0.213770 + 0.757103 = 0.9709 = 1/1.03 ✓ The CDS also matches the bond prices: protection on the loss of 25 costs 25 × 0.213770 = 5.3443 = 100/1.03 − 91.7431 = 97.0874 − 91.7431 ✓</p>`,
      traps: [
        "Used the real 6%: 0.06/1.03 = 0.0583. Real probabilities never pair with r<sub>f</sub>; this underprices the protection by almost three quarters.",
        null,
        "Gave ρ without discounting. The CDS pays in a year, so its price today is ρ/1.03.",
        "Priced with the survival probability: (1 − 0.2202)/1.03 = 0.7571. The CDS pays in the default branch, which carries ρ.",
      ],
    },
    {
      id: "d3-cds-4",
      title: "Protection on a whole bond: λ contracts and the synthetic risk-free bond",
      theory: `<p>Each CDS contract pays 1 in default. A bond with face value F loses F × LGD in default, so to cover it you buy λ = F × LGD contracts. Kurbatov calls λ the loss at default, or the exposure. The protection costs λ times the CDS price. The bond plus the protection pays F in both branches, so together they are a <b>synthetic risk-free bond</b>, worth PV(F). That gives a second route to the price of protection: the gap between the risk-free and the risky bond.</p>
<div class="formula"><div class="eq">λ = F × LGD &nbsp;·&nbsp; protection = λ × ρ/(1 + r<sub>f</sub>)</div>
<div class="eq">P + protection = PV(F) &nbsp;⟹&nbsp; protection = PV(F) − P</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>). The protection is the put in risky debt bought back: D = PV(F) − Put.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Insure only what you can lose. In default the bond still pays F(1 − LGD), so you need cover for the rest. Bond plus cover is safe, so it must cost exactly what a government bond costs.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The bond from the example in step 2: F = 100, y = 8%, pays 70 in default, r<sub>f</sub> = 3%, ρ = 0.154321. CDS = 0.154321/1.03 = 0.149826.</p><p>λ = 100 × 0.30 = 30 contracts, costing 30 × 0.149826 = 4.4948. Bond plus protection: 92.5926 + 4.4948 = 97.0874 = 100/1.03 ✓</p></div>`,
      q: `<p>An investor holds a one-year corporate zero-coupon bond with face value 1 000 and a promised yield of 7%. If the issuer defaults, the bond repays 55% of face value. The risk-free rate is 2.5%. CDS contracts on the issuer pay 1 per contract in default. What does it cost today to protect the bond fully against default?</p>`,
      options: ["41.0303", "91.1785", "50.1482", "42.0561"],
      answer: 0,
      solution: `<p>P = 1 000/1.07 = 934.5794. The bottom branch ρ pays 550: 1 000 − 450ρ = 934.5794 × 1.025 = 957.9439, so ρ = 42.0561/450 = 0.0934579.</p><p>CDS = 0.0934579/1.025 = 0.0911785 per contract. λ = 1 000 × 0.45 = 450 contracts.</p><p>Protection = 450 × 0.0911785 = <b>41.0303</b>.</p>`,
      check: `<p>Second route: PV(F) − P = 1 000/1.025 − 1 000/1.07 = 975.60976 − 934.57944 = 41.0303 ✓ State by state: with no default the bond pays 1 000 and the contracts 0; in default the bond pays 550 and the 450 contracts pay 450. Either way 1 000: a synthetic risk-free bond ✓</p>`,
      traps: [
        null,
        "Bought one contract per unit of face value: 1 000 × 0.0911785 = 91.1785. The bond still repays 550 in default, so only the loss of 450 needs cover.",
        "Covered the recovery instead of the loss: 550 × 0.0911785 = 50.1482. λ = F × LGD = 450.",
        "Forgot to discount: 450 × 0.0934579 = 42.0561 is the protection's risk-neutral expected payout in a year.",
      ],
    },
    {
      id: "d3-cds-5",
      title: "Why ρ is above the real default probability",
      theory: `<p>ρ is almost always far above the real default probability: 22.7% against 10% in the lecture's example. Two readings are tempting and wrong. ρ is not the market's forecast of default. Nor is the gap a free lunch. Defaults cluster in recessions, when a krone is worth most to investors. They pay up for protection that pays in those states, so the default branch is priced as if it were more likely than it is. Risk-neutral pricing discounts at r<sub>f</sub>, so the whole premium has to sit in the probability.</p>
<div class="formula"><div class="eq">price of protection − PV(expected loss at the real p) = risk premium</div>
<div class="where">Expected loss uses the real probability: PD × LGD × exposure, as in the guest lecture. The CDS price uses ρ. The gap is what investors charge for bearing default risk.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Insurance that pays in a crisis is worth more than its average payout. A seller of protection earns the premium on average but pays out exactly when everything else is going badly.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10)</span><p>Real default probability 10%, ρ = 22.73%, loss in default 20. Protection costs 20 × 0.216450 = 4.3290.</p><p>The expected loss at the real probability, discounted, is 0.10 × 20/1.05 = 1.9048. The gap of 4.3290 − 1.9048 = 2.4242 is the risk premium.</p></div>`,
      q: `<p>A one-year bond's price implies a risk-neutral default probability ρ of 22%. Rating analysts put the real default probability at 9%. Which statement is right?</p>`,
      options: [
        "The gap is an arbitrage: defaults happen only 9% of the time, so selling protection at the ρ price locks in a sure profit.",
        "Defaults come in bad times, when money is worth most; pricing at r<sub>f</sub> moves that risk premium into the probability, so ρ exceeds 9%.",
        "ρ is the market's forecast: investors expect 22% of such issuers to default, so the analysts' 9% is too optimistic.",
        "The two differ only because the price is discounted at r<sub>f</sub>; discounted at the bond's promised yield, the implied ρ would equal 9%.",
      ],
      answer: 1,
      solution: `<p>Investors value a krone more in recessions, when defaults cluster. A claim that pays in default is insurance against bad times. Investors pay a premium for it. Risk-neutral pricing discounts everything at r<sub>f</sub>, so the premium must go into the probability: ρ = 22% weights the default branch as if it were more than twice as likely as the real 9%. <b>ρ is a price, not a forecast.</b></p>`,
      check: `<p>Test the arbitrage claim on a seller of one unit of protection, say with r<sub>f</sub> = 4%. The price is 0.22/1.04 = 0.2115. With no default the seller keeps it; in default the seller pays 1 and ends down 1 − 0.2115 × 1.04 = 0.78. A strategy that can lose 0.78 is not an arbitrage ✓ The real expected payout, 0.09/1.04 = 0.0865, is below the price: the seller earns the risk premium on average, not for sure.</p>`,
      traps: [
        "Not an arbitrage. Selling protection earns the premium on average but loses heavily in the default state, which is exactly when losses hurt most.",
        null,
        "ρ is not a forecast. It is the probability that makes prices work at r<sub>f</sub>, so it carries the risk premium; it says nothing about the analysts being wrong.",
        "Discounting at the promised yield assumes the bond always pays in full, so the implied ρ would be 0, not 9%. Real probabilities go with expected returns, ρ with r<sub>f</sub>.",
      ],
    },
    {
      id: "d3-cds-6",
      title: "Exam level: two bonds, ρ, the CDS and the put (V2024 P3)",
      theory: `<p>V2024 Problem 3 (28 points) was lecture 10's CDS example with the same numbers. Kurbatov has said a very similar example could come again. It had three parts. Part a: price a risk-free and a risky one-year zero and find each one's expected return with the real probabilities. Part b: back ρ out of the risky bond's price and price a CDS that pays 1 in default. Part c: value the put in the risky bond two ways: as the loss times the CDS price and as the price gap between the two bonds. Draw the tree before you write an equation, with ρ in the default branch.</p>
<div class="formula"><div class="eq">P = F/(1 + y), &nbsp; r = E<sub>real</sub>[payoff]/P − 1</div>
<div class="eq">ρ = [F − P<sub>2</sub>(1 + r<sub>f</sub>)]/(F·LGD), &nbsp; CDS = ρ/(1 + r<sub>f</sub>)</div>
<div class="eq">Put = λ × CDS = P<sub>1</sub> − P<sub>2</sub>, &nbsp; λ = F × LGD</div>
<div class="where">P<sub>1</sub> is the risk-free bond, P<sub>2</sub> the risky one. Close with the no-arbitrage line: the risky bond plus λ CDS contracts costs P<sub>1</sub> and pays F for sure.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Three numbers sit in one tree: the promise (y), the real expectation (r) and the price of the bad branch (ρ). Keep the real probability for part a and ρ for parts b and c.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Bond 1 yields r<sub>f</sub> = 2%. Bond 2 promises 6.5%, pays 85 in default and has a real default probability of 4%.</p><p>Part a: P<sub>1</sub> = 100/1.02 = 98.0392 and P<sub>2</sub> = 100/1.065 = 93.8967. E[payoff] = 0.96 × 100 + 0.04 × 85 = 99.40, so r = 99.40/93.8967 − 1 = 5.8610%.</p><p>Part b: 100 − 15ρ = 93.8967 × 1.02 = 95.7746, so ρ = 4.2254/15 = 0.281690. CDS = 0.281690/1.02 = 0.276167.</p><p>Part c: put = 15 × 0.276167 = 4.1425 = 98.0392 − 93.8967 ✓</p></div>`,
      q: `<p>Bond 1 is a one-year default-free zero-coupon bond with face value 100 and a yield of 3.5%. Bond 2 is a one-year corporate zero-coupon bond with face value 100 and a promised yield of 9.5%. Bond 2 repays 100 with probability 93% and pays 72 if the issuer defaults, with probability 7%. The risk-free rate is 3.5%. Find the expected return on bond 2, the risk-neutral default probability ρ, the price of a CDS that pays 1 in default and the value of the put embedded in bond 2. Which line is right?</p>`,
      options: [
        "Expected return 9.5000% · ρ 0.1957 · CDS 0.1891 · put 5.2942",
        "Expected return 7.3538% · ρ 0.8043 · CDS 0.7771 · put 21.7590",
        "Expected return 7.3538% · ρ 0.1957 · CDS 0.1891 · put 5.2942",
        "Expected return 7.3538% · ρ 0.0700 · CDS 0.0676 · put 1.8937",
      ],
      answer: 2,
      solution: `<p><b>Part a.</b> P<sub>1</sub> = 100/1.035 = 96.6184, expected return 3.5%. P<sub>2</sub> = 100/1.095 = 91.3242. E[payoff] = 0.93 × 100 + 0.07 × 72 = 93 + 5.04 = 98.04, so r = 98.04/91.3242 − 1 = 7.3538%.</p><p><b>Part b.</b> Bottom branch ρ pays 72: 100 − 28ρ = 91.3242 × 1.035 = 94.5205, so ρ = 5.4795/28 = 0.195695. CDS = 0.195695/1.035 = 0.189077.</p><p><b>Part c.</b> The put pays the loss of 28 in default: 28 × 0.189077 = 5.2942. From the bonds: 96.6184 − 91.3242 = 5.2942.</p><p>The right line is <b>7.3538%, 0.1957, 0.1891 and 5.2942</b>.</p>`,
      check: `<p>The two put routes agree at 5.2942 ✓ They must, since ρ came from the same two prices, so this checks the arithmetic. It does catch a swap of ρ and 1 − ρ after the first step: the survival probability gives 21.7590 by the CDS route against 5.2942 from the bonds. Buy bond 2 for 91.3242 and 28 CDS contracts for 5.2942: you pay 96.6184 and get 100 in both branches, which is bond 1 ✓ The 6% spread splits into 2.1462% of expected loss (9.5% − 7.3538%) and a 3.8538% risk premium (7.3538% − 3.5%).</p>`,
      traps: [
        "Gave the promised yield as the expected return. Bond 2 pays 100 only in the top branch: 98.04/91.3242 − 1 = 7.3538%.",
        "Priced with the survival probability 1 − ρ = 0.8043, so the CDS and the put sit in the wrong branch. The bond route still gives 5.2942, so the two routes disagree.",
        null,
        "Used the real 7% for the prices: CDS 0.07/1.035 = 0.0676 and put 28 × 0.067633 = 1.8937. The bond route gives 5.2942, so the two routes disagree.",
      ],
    },
  ],
});

/* sjanger 107 · d3-vente · The option to wait (del 3 i korte stiger) */
window.EDU_DATA.sjangre.push({
  id: "d3-vente",
  num: 107,
  seksjon: "del3",
  emne: "Realopsjoner",
  symboler: "realopsjon",
  title: "The option to wait",
  summary: "Starting now, the value of waiting, volatility, the value of information and the indifference probability",
  chapters: [25],
  exam: "8 of 11 papers · H2025 E5 (b), (c) · lecture 11 example 1",
  intro: `<p>Every real-option exercise starts here: invest now and take the average, or wait a year, see the state and invest only where it pays. H2025 Exercise 5 asked for the value of information. Kurbatov called the indifference probability "a very nice exam question". The five steps go from the static NPV, with the "starting now" trap, to that indifference probability.</p>`,
  steps: [
    {
      id: "d3-vente-1",
      title: "Investing now when production starts today",
      theory: `<p>Investing now commits you to every future state, so you value the expected cash flow. Read the timing first. If the machine produces from the day you buy it, the first cash flow comes at t = 0. C/r only covers the flows from t = 1 on. In Kurbatov's lecture example a price of 200 today and 200 expected from next year, at 10%, is worth 200 + 200/0.1 = 2 200, not 2 000. Kurbatov expects many students to forget year zero.</p>
<p>The course often discounts real probabilities at r<sub>f</sub>. That is allowed only when the risk is not systematic. Write the assumption: β = 0, so the cost of capital is r<sub>f</sub>.</p>
<div class="formula"><div class="eq">NPV<sub>now</sub> = −I + C<sub>0</sub> + E[C]/r</div>
<div class="where">C<sub>0</sub> is the cash flow at t = 0, E[C] the expected yearly cash flow from t = 1 on and r the discount rate (r<sub>f</sub> when β = 0). If production starts a year after you invest, the C<sub>0</sub> term drops out.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Committing today means you take the bad state along with the good one, so only the average counts. The cash flow at t = 0 is money you get the moment you invest. Leaving it out makes the project look a whole year's cash flow worse.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A press costs 600 and earns 50 a year forever, the first 50 the day it starts. The risk is not systematic (β = 0) and r<sub>f</sub> = 10%.</p><p>Value of the cash flows: 50 + 50/0.10 = 50 + 500 = 550. NPV = 550 − 600 = −50. Forgetting year zero gives 500 − 600 = −100.</p></div>`,
      q: `<p>A bottling line costs 1 550 (NOK thousand) and produces from the day it is installed. Its net cash flow is 150 today. Next year the price moves for good, so the cash flow becomes 250 a year forever or 50 a year forever, with equal probability. The price risk is unrelated to the market (β = 0) and the risk-free rate is 10%. What is the NPV of installing the line today?</p>`,
      options: ["100.00", "−50.00", "250.00", "−36.36"],
      answer: 0,
      solution: `<p>Expected cash flow from t = 1: 0.5(250) + 0.5(50) = 150 a year forever, worth 150/0.10 = 1 500 today.</p><p>Add the cash flow at t = 0: 150 + 1 500 = 1 650. NPV = 1 650 − 1 550 = <b>100.00</b>. Since β = 0, discounting the expected cash flow at r<sub>f</sub> is right.</p>`,
      check: `<p>Value each state and average. Good: −1 550 + 150 + 250/0.10 = 1 100. Bad: −1 550 + 150 + 50/0.10 = −900. 0.5(1 100) + 0.5(−900) = 100 ✓ Committing today takes both states, so the two routes must agree.</p>`,
      traps: [
        null,
        "Forgot year zero: 1 500 − 1 550 = −50. The line produces from the day it is installed, so the 150 at t = 0 belongs in the value.",
        "Added the 150 at t = 0 and then valued the rest as an annuity due, which counts it twice: 150 + 150 × 1.10/0.10 − 1 550 = 250.",
        "Treated 150/0.10 as a value at t = 1 and discounted it again: 150 + 1 500/1.10 − 1 550 = −36.36.",
      ],
    },
    {
      id: "d3-vente-2",
      title: "The value of waiting and the option to wait",
      theory: `<p>Waiting a year lets you see the state before you pay. At t = 1 you invest only where the NPV is positive and take 0 elsewhere: the max sits inside the expectation. Each NPV<sub>i</sub> is a value at t = 1, so discount it once. The option to wait is what waiting adds over the best you can do today.</p>
<div class="formula"><div class="eq">value of waiting = Σ p<sub>i</sub>·max(0, NPV<sub>i</sub>)/(1 + r)</div>
<div class="eq">option to wait = value of waiting − max(0, NPV<sub>now</sub>)</div>
<div class="where">NPV<sub>i</sub> is the NPV of investing at t = 1 in state i, measured at t = 1. If production starts the day you invest, it includes that day's cash flow. A positive option value means wait, even when NPV<sub>now</sub> is positive.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Investing now buys the average, bad state included. Waiting buys the good state only, at the price of a year's delay. When the bad state is bad enough, dropping it is worth more than the year you lose, so a positive NPV today can still mean wait.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A machine costs 700 and earns 60 today. Next year its cash flow becomes 100 or 20 forever (p = 0.5). β = 0 and r<sub>f</sub> = 10%. NPV<sub>now</sub> = −700 + 60 + 60/0.10 = −40.</p><p>At t = 1: good −700 + 100 + 100/0.10 = 400, invest; bad −700 + 20 + 200 = −480, do not. Waiting: 0.5(400)/1.10 = 181.82. Option = 181.82 − max(0, −40) = 181.82.</p></div>`,
      q: `<p>A bottling line costs 1 550 (NOK thousand) and produces from the day it is installed. Installed today, it earns 150 now and then 250 or 50 a year forever (equal probability), for an NPV of 100. Instead the firm can wait a year, see the cash flow and install then for the same 1 550. The line then earns that year's cash flow at t = 1 and the same amount every year after. β = 0 and r<sub>f</sub> = 10%. What is the value of the option to wait, measured against installing today?</p>`,
      options: ["−9.09", "445.45", "545.45", "331.82"],
      answer: 1,
      solution: `<p>At t = 1, good state: −1 550 + 250 + 250/0.10 = −1 550 + 250 + 2 500 = 1 200, install. Bad state: −1 550 + 50 + 500 = −1 000, do not install: 0.</p><p>Value of waiting: 0.5(1 200)/1.10 = 600/1.10 = 545.45.</p><p>Option to wait = 545.45 − max(0, 100) = <b>445.45</b>. Positive, so wait, although installing today has a positive NPV.</p>`,
      check: `<p>Split the option into its two forces. Waiting avoids the bad state, where installing today loses 900: 0.5 × 900 = 450.00. In the good state it costs a little: you give up the 150 at t = 0 but pay the 1 550 a year later, saving 1 550 × (1 − 1/1.10) = 140.91. Net −9.09, times 0.5 = −4.55. Then 450.00 − 4.55 = 445.45 ✓</p>`,
      traps: [
        "Kept the bad state's −1 000 instead of 0, as if you had to install anyway: (0.5 × 1 200 − 0.5 × 1 000)/1.10 − 100 = −9.09.",
        null,
        "Reported the value of waiting as the option. The option is what waiting adds over the 100 you can get today: 545.45 − 100.",
        "Left out the cash flow at t = 1 when installing at t = 1: 0.5(−1 550 + 2 500)/1.10 − 100 = 331.82.",
      ],
    },
    {
      id: "d3-vente-3",
      title: "Why volatility drives the option to wait",
      theory: `<p>The option to wait is worth something only if the future states differ enough that you would decide differently in them. Two edge cases settle most intuition questions. If σ is very low, next year looks like today, so you would take today's decision anyway and waiting only costs a year. If the project is unprofitable in every future state, you never invest and the option to wait is worth nothing. In between, a wider spread with the same mean leaves NPV<sub>now</sub> unchanged but raises the value of waiting.</p>
<div class="formula"><div class="eq">σ = 0: value of waiting = max(0, NPV<sub>now</sub>)/(1 + r) ≤ max(0, NPV<sub>now</sub>)</div>
<div class="where">With no uncertainty, waiting delays the same project by a year, so it never beats investing now. The option to wait needs a state in which you would decline. Kurbatov's likely follow-up after a real-option calculation is "what if σ is very, very low?": reason from σ = 0.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>An option pays off through the states it lets you avoid. Less spread means less to avoid, so waiting is worth less, while the cost of waiting, the cash flow you give up, stays the same.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The machine from the last example costs 700 and earns 60 today, β = 0, r<sub>f</sub> = 10%, NPV<sub>now</sub> = −40. With next year's cash flow at 100 or 20, waiting was worth 181.82.</p><p>Now let it be 63 or 57. At t = 1: −700 + 63 + 630 = −7 and −700 + 57 + 570 = −73. Unprofitable in both states, so you never invest: waiting is worth 0 and so is the option.</p></div>`,
      q: `<p>A bottling line costs 1 550 (NOK thousand), produces from the day it is installed and earns 150 now. β = 0 and r<sub>f</sub> = 10%. When next year's cash flow was 250 or 50 forever (equal probability), installing now had an NPV of 100 and the option to wait was worth 445.45. Now the cash flow next year will instead be 155 or 145 forever, with equal probability. Which statement is right?</p>`,
      options: [
        "Waiting still wins, since an option to wait has positive value whenever next year's cash flow is uncertain.",
        "Installing now is worth less than 100, since the good state is now much less good.",
        "Waiting and installing now are worth exactly the same, since there is almost nothing to learn.",
        "Install now: you would install in both states next year, so waiting only delays the same NPV.",
      ],
      answer: 3,
      solution: `<p>Installing now still has NPV<sub>now</sub> = −1 550 + 150 + 150/0.10 = 100: the mean is unchanged.</p><p>Waiting, at t = 1: −1 550 + 155 + 1 550 = 155 and −1 550 + 145 + 1 450 = 45. Both are positive, so you would install in both states. Value of waiting: 0.5(155 + 45)/1.10 = 100/1.10 = 90.91, below 100.</p><p><b>Install now.</b> Measured against installing today, waiting would add 90.91 − 100 = −9.09, so you do not use the option. Low σ leaves no state to avoid. Waiting just delays the same NPV by a year.</p>`,
      check: `<p>σ = 0 gives the same: a cash flow of 150 forever gives −1 550 + 150 + 1 500 = 100 at t = 1, so waiting is worth 100/1.10 = 90.91 ✓ With 160 or 140 the bad state turns slightly negative (−10), waiting is worth 0.5 × 210/1.10 = 95.45 and installing now still wins. Only a spread wide enough to make declining worth more than the year lost flips the decision, as with 250 or 50.</p>`,
      traps: [
        "An option to wait is worth something only if there is a state you would decline. Here you install in both states, so waiting is worth 90.91, less than 100.",
        "NPV<sub>now</sub> depends only on the mean cash flow, which is still 150, so it stays at 100.",
        "Waiting is worth 90.91 and installing now 100. They are not equal: waiting costs a year of NPV even when there is nothing to learn.",
        null,
      ],
    },
    {
      id: "d3-vente-4",
      title: "The value of information",
      theory: `<p>A market study that reveals the state today lets you decide state by state at once. Its value is the informed value minus the best you can do uninformed. If E[NPV] is negative, the uninformed choice is to do nothing, worth 0, not E[NPV]. This is H2025 Exercise 5 (b). If the study takes a year, discount the informed value once: that is the option to wait again. It is worth less because the good state starts a year later.</p>
<div class="formula"><div class="eq">value of information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV])</div>
<div class="where">No discounting when the answer arrives now and you act now. It is the most you should pay for the study.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Information has value only through the decision it changes. Uninformed you stay out; informed you invest in the good state. A study can never be worth less than 0, since you can always ignore it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cost 100, net cash flow 15 or −5 a year forever (p = 0.5), r = 10%. E[NPV] = 5/0.10 − 100 = −50, so uninformed you do nothing: 0.</p><p>Good: 150 − 100 = 50. Bad: −50 − 100 = −150, declined. Informed: 0.5(50) = 25. Value of the study = 25 − 0 = 25, not 25 + 50 = 75.</p></div>`,
      q: `<p>Opening a climbing gym costs 1 000 (NOK thousand). Operating costs are 80 a year. Revenue will be 190 a year forever or 60 a year forever, with equal probability, first payment in one year. Demand is unrelated to the market (β = 0) and r<sub>f</sub> = 5%. A market study that has already been done reveals the state immediately. What is the most you should pay for it?</p>`,
      options: ["700.00", "571.43", "600.00", "−100.00"],
      answer: 2,
      solution: `<p>Net cash flow: 190 − 80 = 110 or 60 − 80 = −20.</p><p>Uninformed: E[NPV] = 0.5(110 − 20)/0.05 − 1 000 = 900 − 1 000 = −100, so you would not open: max(0, −100) = 0.</p><p>Informed: good 110/0.05 − 1 000 = 1 200, open; bad −20/0.05 − 1 000 = −1 400, do not open. 0.5(1 200) + 0.5(0) = 600.</p><p>Value of the study = 600 − 0 = <b>600.00</b>.</p>`,
      check: `<p>The study changes one decision: in the good state you now open, worth 1 200, with probability 0.5. 0.5 × 1 200 = 600 ✓ If the study took a year it would be worth 600/1.05 = 571.43. In the good state you lose the first year's 110 (104.76 today) and pay the 1 000 a year later (saving 47.62): net −57.14, times 0.5 = −28.57. Then 600 − 28.57 = 571.43 ✓</p>`,
      traps: [
        "Compared with the negative E[NPV]: 600 − (−100) = 700. Uninformed you stay out, which is worth 0.",
        "Discounted the informed value a year, as if the study took a year: 600/1.05 = 571.43.",
        null,
        "Dropped the max(0, ·) in the informed term, so it becomes E[NPV] = −100 and the answer −100 − 0 = −100. Information can never be worth less than 0.",
      ],
    },
    {
      id: "d3-vente-5",
      title: "Exam level: the probability that makes you indifferent",
      theory: `<p>Kurbatov called this "a very nice exam question": let X be the probability of the good state and find the X at which investing now and waiting are worth the same. Write both sides as functions of X before you solve. The trap is that X usually moves the NPV of investing now too, because it sets the expected cash flow after today. Holding NPV<sub>now</sub> at its value from an earlier part answers a different question.</p>
<div class="formula"><div class="eq">NPV<sub>now</sub>(X) = −I + C<sub>0</sub> + [X·C<sub>u</sub> + (1 − X)C<sub>d</sub>]/r</div>
<div class="eq">value of waiting(X) = X·NPV<sub>u</sub>/(1 + r), with NPV<sub>u</sub> = −I + C<sub>u</sub> + C<sub>u</sub>/r</div>
<div class="where">Set them equal and solve. The waiting side assumes you decline the bad state at t = 1, so check that NPV<sub>d</sub> = −I + C<sub>d</sub> + C<sub>d</sub>/r is negative. Above X* invest now, below it wait.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Waiting is insurance against the bad state. The likelier the good state, the less that insurance is worth, while the year of delay costs the same. So investing now wins once the good state is likely enough.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11)</span><p>A machine costs 1 600 and produces from today: price 200 now, then 300 with probability X or 100, forever. r<sub>f</sub> = 10%.</p><p>Invest now: −1 600 + 200 + [300X + 100(1 − X)]/0.1 = −400 + 2 000X. Wait: at t = 1 the good state gives −1 600 + 300 + 3 000 = 1 700 and the bad state −500, declined, so 1 700X/1.1 = 1 545.45X.</p><p>−400 + 2 000X = 1 545.45X gives X* = 0.8800. Holding investing now at its 600 from X = 0.5 gives 600/1 545.45 = 0.3882, the answer to a different question.</p></div>`,
      q: `<p>A packaging machine costs 950 (NOK thousand) and produces from the day it is bought. Its net cash flow is 200 today. Next year the cash flow moves for good to 350 a year with probability X or to 50 a year with probability 1 − X. The risk is not systematic (β = 0) and r<sub>f</sub> = 10%. The firm can buy today or wait a year, see the cash flow and buy then for the same 950; production then starts at t = 1. An earlier part, with equal probabilities, found an NPV of 1 250 for buying today. For which X is the firm indifferent between buying today and waiting?</p>`,
      options: ["0.4741", "0.6875", "0.6600", "0.4144"],
      answer: 1,
      solution: `<p><b>Buying today.</b> −950 + 200 + [350X + 50(1 − X)]/0.10 = −750 + 500 + 3 000X = −250 + 3 000X. X sets the expected cash flow, so this side moves with X.</p><p><b>Waiting.</b> At t = 1: good −950 + 350 + 3 500 = 2 900, buy; bad −950 + 50 + 500 = −400, do not buy. Value today: X × 2 900/1.10 = 2 636.36X.</p><p><b>Indifference.</b> −250 + 3 000X = 2 636.36X gives 363.64X = 250, so X* = <b>0.6875</b>. Above it buy today, below it wait.</p>`,
      check: `<p>Plug in X* = 0.6875: buying today −250 + 3 000 × 0.6875 = 1 812.50; waiting 2 636.36 × 0.6875 = 1 812.50 ✓ Test each side: at X = 0.5, 1 250 against 1 318.18 (wait); at X = 0.8, 2 150 against 2 109.09 (buy today) ✓ The gap in the slopes, 363.64 = 400/1.10, is the bad-state loss that waiting avoids, discounted a year.</p>`,
      traps: [
        "Held buying today at its value with equal probabilities: 1 250 = 2 636.36X gives 0.4741. X changes the expected cash flow, so it changes that side too.",
        null,
        "Forgot year zero on both sides, the 200 today and the 350 at t = 1: −450 + 3 000X = 2 318.18X gives 0.6600.",
        "Discounted the t = 1 value twice: −250 + 3 000X = 2 900X/1.10<sup>2</sup> = 2 396.69X gives 0.4144.",
      ],
    },
  ],
});

/* sjanger 108 · d3-exit · Exit, abandonment and staged financing (del 3 i korte stiger) */
window.EDU_DATA.sjangre.push({
  id: "d3-exit",
  num: 108,
  seksjon: "del3",
  emne: "Realopsjoner",
  symboler: "realopsjon",
  title: "Exit, abandonment and staged financing",
  summary: "A perpetuity cut to an annuity, monthly rates, the exit decision with a fee, the value of an exit option and staged financing",
  chapters: [25],
  exam: "H2025 E5 (d) · V2023 P3 · lecture 11 store and staging",
  intro: `<p>The mirror image of waiting: you commit first and keep the right to leave. H2025 Exercise 5 (d) cut a perpetuity of losses to a two-year annuity. Kurbatov named abandonment as something the exam could explore and flagged an exit fee as a twist. Staged financing is the same idea used on purpose: pay for one stage, see the result, then decide. Six steps end with a monthly exit with a fee.</p>`,
  steps: [
    {
      id: "d3-exit-1",
      title: "A perpetuity cut to an annuity",
      theory: `<p>An exit right replaces a perpetuity of losses with an annuity that stops at the exit date. The annuity formula is not on the formula sheet, so learn it as a perpetuity minus the same perpetuity started n years later. That form also shows what the exit removes: the tail after year n.</p>
<div class="formula"><div class="eq">C × A(n, r) = C/r − (C/r)/(1 + r)<sup>n</sup> = C × [1 − (1 + r)<sup>−n</sup>]/r</div>
<div class="where">C is paid every year for n years, first payment in one year. (C/r)/(1 + r)<sup>n</sup> is the tail you no longer bear: a perpetuity that starts after year n, valued today.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>An exit right never touches the good state, since you never leave a profitable perpetuity. It only cuts the bad state's tail, so it is worth something only where that tail is negative. The earlier the exit, the more of the tail it cuts.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Losses of 10 a year, r = 10%, exit after 2 years. Forever: 10/0.10 = 100. Tail: 100/1.10<sup>2</sup> = 82.64. Borne: 100 − 82.64 = 17.36, the same as 10 × A(2, 10%) = 10 × 1.735537.</p></div>`,
      q: `<p>In the bad state a café loses 30 (NOK thousand) a year forever, first loss in one year. A new lease lets the owner close after year 4 and pay nothing more. The discount rate is 5%. What is the present value today of the losses the owner still bears?</p>`,
      options: ["600.00", "106.38", "493.62", "120.00"],
      answer: 1,
      solution: `<p>A(4, 5%) = [1 − 1.05<sup>−4</sup>]/0.05 = (1 − 0.822702)/0.05 = 3.545951.</p><p>PV of the losses borne = 30 × 3.545951 = <b>106.38</b>.</p>`,
      check: `<p>Perpetuity minus tail: 30/0.05 = 600, while the tail from year 5 is worth 600/1.05<sup>4</sup> = 493.62 today. 600 − 493.62 = 106.38 ✓ The answer must also lie below the undiscounted 4 × 30 = 120 ✓</p>`,
      traps: [
        "Valued the losses forever, as if there were no exit: 30/0.05 = 600.",
        null,
        "Reported the tail the lease removes, not the losses still borne: 600/1.05<sup>4</sup> = 493.62.",
        "Added the four losses without discounting: 4 × 30 = 120.",
      ],
    },
    {
      id: "d3-exit-2",
      title: "Monthly cash flows need a monthly rate",
      theory: `<p>If the rate is annual but the cash flows and the question are in months, convert the rate. Kurbatov said it plainly: when the question is about months, use the monthly rate. Convert by compounding, never by dividing by 12. The annuity and perpetuity formulas then work exactly as before, counted in months.</p>
<div class="formula"><div class="eq">r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1 &nbsp;&nbsp; r = (1 + r<sub>m</sub>)<sup>12</sup> − 1</div>
<div class="eq">n-month annuity: C × [1 − (1 + r<sub>m</sub>)<sup>−n</sup>]/r<sub>m</sub> &nbsp;&nbsp; monthly perpetuity: C/r<sub>m</sub></div>
<div class="where">r is the effective annual rate. Over 18 months the discount factor is (1 + r)<sup>1.5</sup> = (1 + r<sub>m</sub>)<sup>18</sup>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>r/12 compounds to more than r over a year, because each month's interest earns interest. So r/12 is too high a monthly rate and makes every value too low. The error is small for a short annuity and much larger for a perpetuity.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>1 000 a month for 12 months at 6% a year. r<sub>m</sub> = 1.06<sup>1/12</sup> − 1 = 0.4868%. A(12, r<sub>m</sub>) = 11.628800, so PV = 11 628.80. With 6%/12 = 0.5% you would get 11 618.93, a little too low.</p></div>`,
      q: `<p>A shop in the bad state loses 2 500 NOK a month, first loss in one month. The lease lets the owner leave after 18 months at no cost. The effective annual discount rate is 7%. What is the present value today of the 18 months of losses?</p>`,
      options: ["42 671.33", "42 600.33", "25 147.72", "442 153.47"],
      answer: 0,
      solution: `<p>r<sub>m</sub> = 1.07<sup>1/12</sup> − 1 = 0.565415% a month.</p><p>A(18, r<sub>m</sub>) = [1 − 1.00565415<sup>−18</sup>]/0.00565415 = 17.068531.</p><p>PV = 2 500 × 17.068531 = <b>42 671.33</b>.</p>`,
      check: `<p>Compound back: 1.00565415<sup>12</sup> = 1.0700 ✓ and 1.00565415<sup>18</sup> = 1.07<sup>1.5</sup> = 1.106817 ✓ The value must lie below the undiscounted 18 × 2 500 = 45 000 and above 45 000/1.106817 = 40 657.14, the value if all 18 losses came at month 18 ✓</p>`,
      traps: [
        null,
        "Divided the annual rate by 12: 0.583333% a month is too high, so 2 500 × A(18, 0.583333%) = 42 600.33 is too low.",
        "Used the annual 7% as if it were a monthly rate: 2 500 × A(18, 7%) = 25 147.72.",
        "Valued the losses forever, ignoring the right to leave: 2 500/0.00565415 = 442 153.47.",
      ],
    },
    {
      id: "d3-exit-3",
      title: "Leave or stay: the exit decision",
      theory: `<p>At the exit date, compare what each choice is worth from that date on. Staying is worth the PV of all the future cash flows. Leaving is worth the exit value: a salvage price S, 0 for a free exit, or −F if leaving costs a fee F. Take the larger. What you have lost so far is sunk and plays no role. Kurbatov flagged the fee as a possible twist: with a fee, the exit branch is worth −F, not 0.</p>
<div class="formula"><div class="eq">value at the exit date = max(PV of continuing, exit value)</div>
<div class="where">Exit value = S (sell the assets), 0 (free exit) or −F (exit fee). PV of continuing is C/r for a perpetuity of C, or C/r<sub>m</sub> in months. Leave only if the exit value is higher.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The exit right is a put on the project, struck at the exit value. You use it only when walking away is worth more than carrying on. A fee lowers the strike, so a project that loses only a little may be better kept.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>At month 24 a shop loses 1 000 a month forever, r<sub>m</sub> = 0.5%. Staying: −1 000/0.005 = −200 000. Leaving for a fee of 120 000: −120 000. Leave, since −120 000 &gt; −200 000.</p></div>`,
      q: `<p>In the bad state a shop loses 1 500 NOK a month forever. At month 24 (and only then) the lease lets the owner leave for a fee of 350 000 NOK, paid on leaving. The monthly discount rate is 0.5%. The shop has already lost 36 000 NOK. Which statement is right at month 24?</p>`,
      options: [
        "Leave, since leaving is worth 0, which beats the negative value of staying.",
        "Leave, since the 36 000 already lost shows the shop will never pay its way.",
        "Stay: staying is worth −300 000 at month 24 and leaving −350 000.",
        "Leave, since the fee is paid once while the losses go on forever.",
      ],
      answer: 2,
      solution: `<p>Staying: −1 500/0.005 = −300 000, the value at month 24 of losing 1 500 a month forever.</p><p>Leaving: −350 000, the fee. Since −300 000 &gt; −350 000, <b>stay</b>: the fee costs more than the losses it would avoid.</p><p>The 36 000 already lost is sunk and does not enter.</p>`,
      check: `<p>Find the fee at which the owner is indifferent: F = 1 500/0.005 = 300 000. Below 300 000 leave, above it stay; 350 000 is above ✓ Without a fee the exit is worth 0 and leaving wins, which is why a free exit and an exit with a fee can give opposite decisions.</p>`,
      traps: [
        "Compared with 0 instead of −F. Leaving costs the 350 000 fee, so the exit branch is worth −350 000, not 0.",
        "Used a sunk cost. The 36 000 is lost whatever the owner does now; only future cash flows count.",
        null,
        "Compared the fee with the monthly loss, not with the present value of all future losses: forever at 0.5% a month that is 300 000, less than the fee.",
      ],
    },
    {
      id: "d3-exit-4",
      title: "The value of an exit option: compare with your best alternative",
      theory: `<p>An exit option is worth the NPV with it minus your best choice without it, max(0, NPV<sub>without</sub>). If you would invest anyway, subtract the NPV without the option. If you would not invest without it, subtract 0, never the negative NPV. Lecture 11's store example subtracts the negative NPV, which is the first case: a store already committed. In the wrap-up Kurbatov warned that comparing with the negative value instead of 0 is the classic mistake when you could stay out.</p>
<div class="formula"><div class="eq">value of the exit option = max(0, NPV<sub>with</sub>) − max(0, NPV<sub>without</sub>)</div>
<div class="eq">bad state with a sale at t = 1: −I + (C<sub>bad</sub> + S)/(1 + r)</div>
<div class="where">You commit at t = 0, so the year-1 cash flow comes in both states. At t = 1 you sell for S only if S beats the PV of continuing, C<sub>bad</sub>/r.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The option changes only the bad state, where it swaps what continuing is worth for the sale price. If you would invest anyway, that swap is the whole option. If you would not, part of the swap only lifts a negative NPV towards 0, which you can have for free by not investing.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cost 350, net cash flow 60 or 20 forever (p = 0.5), r = 10%, a buyer pays 300 at t = 1. Without the sale: 40/0.10 − 350 = 50, so you invest anyway.</p><p>Bad state: continuing is worth 20/0.10 = 200 &lt; 300, so sell: −350 + (20 + 300)/1.10 = −59.09. Good: 600 − 350 = 250. With the sale: 0.5(250 − 59.09) = 95.45. Option = 95.45 − 50 = 45.45 = 0.5 × (300 − 200)/1.10 ✓</p></div>`,
      q: `<p>A fish-feed plant costs 1 000 (NOK thousand) today. Its net cash flow is 130 a year forever or 50 a year forever, with equal probability, first payment in one year; the firm learns which during year 1, after building. The discount rate is 8%. A competitor offers to buy the plant for 800 at t = 1, right after the year-1 cash flow. The offer is valid only then. How much does the offer add to the value of the opportunity?</p>`,
      options: ["206.02", "87.50", "57.87", "81.02"],
      answer: 3,
      solution: `<p>Without the offer: 0.5(130 + 50)/0.08 − 1 000 = 1 125 − 1 000 = 125 &gt; 0, so the firm builds anyway.</p><p>With the offer, at t = 1: in the good state continuing is worth 130/0.08 = 1 625 &gt; 800, so keep it. In the bad state continuing is worth 50/0.08 = 625 &lt; 800, so sell.</p><p>Good: 1 625 − 1 000 = 625. Bad: −1 000 + (50 + 800)/1.08 = −212.96. With the offer: 0.5(625) + 0.5(−212.96) = 312.50 − 106.48 = 206.02.</p><p>Value of the offer = 206.02 − max(0, 125) = <b>81.02</b>.</p>`,
      check: `<p>The offer changes only the bad state, swapping 625 for 800 at t = 1: 0.5 × (800 − 625)/1.08 = 0.5 × 162.04 = 81.02 ✓ This route never uses the NPV without the offer, so it catches a wrong baseline.</p>`,
      traps: [
        "Compared with 0, but the firm builds without the offer too, worth 125. 206.02 is the whole NPV with the offer, not what the offer adds.",
        "Forgot to discount the gain from t = 1: 0.5 × (800 − 625) = 87.50.",
        "Left out the year-1 cash flow in the bad state: −1 000 + 800/1.08 = −259.26, so 0.5(625 − 259.26) − 125 = 57.87.",
        null,
      ],
    },
    {
      id: "d3-exit-5",
      title: "Staged financing: decide each stage on what is still ahead",
      theory: `<p>Staged financing pays for one stage, sees the result and only then decides on the next. Each stage buys the right to stop. Roll the tree back from the end. At stage 2, ignore what stage 1 cost: that money is spent whatever you do now. Kurbatov: "you should ignore the previous stages". When the question gives a rate, discount each payment from the date it is made.</p>
<div class="formula"><div class="eq">C<sub>2</sub> = −I<sub>2</sub> + p<sub>2</sub>·V/(1 + r) &nbsp;&nbsp; (value at t = 1)</div>
<div class="eq">NPV<sub>staged</sub> = −I<sub>1</sub> + p<sub>1</sub>·max(0, C<sub>2</sub>)/(1 + r)</div>
<div class="where">I<sub>1</sub> is paid today, I<sub>2</sub> at t = 1 only if stage 1 succeeds (probability p<sub>1</sub>). V arrives at t = 2 if stage 2 succeeds (p<sub>2</sub>, given that stage 1 did). With β = 0, r = r<sub>f</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Staging changes neither the chance of success nor the total cost. It changes when you pay: the expensive stage is paid only in the branch where it can still pay off. The more stage 1 reveals, the more money staging saves.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11, no discounting)</span><p>10 for product development (50% success), then 90 for the IPO (20% success), IPO worth 800. At stage 2: −90 + 0.2 × 800 = 70 &gt; 0, so continue, ignoring the 10 already spent. NPV = −10 + 0.5 × 70 = 25, against −100 + 0.1 × 800 = −20 in one go.</p></div>`,
      q: `<p>A medtech start-up builds a prototype for 15 (NOK million) today; it works with probability 25%, known at t = 1. If it works, clinical trials cost 40 at t = 1 and succeed with probability 60%, known at t = 2. If both succeed, the firm is worth 220 at t = 2; otherwise nothing. The risks are not systematic and r<sub>f</sub> = 4%. What is the NPV today of financing the stages one at a time?</p>`,
      options: ["−22.95", "8.00", "5.89", "2.29"],
      answer: 2,
      solution: `<p><b>At t = 1, if the prototype works.</b> C<sub>2</sub> = −40 + 0.6 × 220/1.04 = −40 + 126.92 = 86.92 &gt; 0, so pay for the trials. The 15 already spent does not enter. If the prototype fails, stop.</p><p><b>Today.</b> NPV = −15 + 0.25 × 86.92/1.04 = −15 + 20.89 = <b>5.89</b>.</p>`,
      check: `<p>Pay both stages up front instead: −15 − 40/1.04 + 0.15 × 220/1.04<sup>2</sup> = −15 − 38.46 + 30.51 = −22.95. Staging is worth 5.89 − (−22.95) = 28.85, exactly the trial money saved when the prototype fails: 0.75 × 40/1.04 = 28.85 ✓</p>`,
      traps: [
        "Committed to both stages today, giving up the right to stop: −15 − 40/1.04 + 0.15 × 220/1.04<sup>2</sup> = −22.95.",
        "Left out discounting as in the lecture example, although the question gives a rate: −15 + 0.25 × (−40 + 0.6 × 220) = 8.00.",
        null,
        "Charged the 15 again at stage 2: −15 + 0.25 × (86.92 − 15)/1.04 = 2.29. It was spent at t = 0 and is already counted there.",
      ],
    },
    {
      id: "d3-exit-6",
      title: "Exam level: a monthly exit with a fee",
      theory: `<p>This chains the ladder, as in H2025 Exercise 5 (d) and Kurbatov's store from lecture 11, with the fee twist. You open before you know the state, so you pay I in both states. The good state is a monthly perpetuity. In the bad state you bear 24 months of losses, then compare staying (the PV of losses forever) with leaving (−F). The fee is paid at month 24, so discount it. Finally value the right against your best alternative without it.</p>
<div class="formula"><div class="eq">NPV<sub>good</sub> = C<sub>good</sub>/r<sub>m</sub> − I &nbsp;&nbsp; NPV<sub>bad</sub> = C<sub>bad</sub> × A(24, r<sub>m</sub>) − I − F/(1 + r<sub>m</sub>)<sup>24</sup></div>
<div class="eq">value of the right = max(0, E[NPV<sub>with</sub>]) − max(0, E[NPV<sub>without</sub>])</div>
<div class="where">C<sub>bad</sub> is negative. The fee route holds only if F &lt; |C<sub>bad</sub>|/r<sub>m</sub>, the cost of staying seen from month 24. r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The right turns an endless stream of losses into two years of losses plus a fee. The good state keeps its whole perpetuity, so opening becomes a bet with a capped downside. Measured against staying out, which costs nothing, that is what the right is worth to you.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Set-up 100, net cash flow +3 or −2.5 a month (p = 0.5), r<sub>m</sub> = 0.5%, exit at month 12 for a fee of 20. Without the exit: 0.25/0.005 − 100 = −50, stay out. Good: 3/0.005 − 100 = 500.</p><p>Bad: staying at month 12 is worth −2.5/0.005 = −500 &lt; −20, so leave: −2.5 × 11.618932 − 100 − 20/1.005<sup>12</sup> = −29.05 − 100 − 18.84 = −147.89. With the exit: 0.5(500 − 147.89) = 176.06. The right is worth 176.06 − 0 = 176.06.</p></div>`,
      q: `<p>A bakery chain can open a branch for 750 (NOK thousand) now or never. Operating costs are 30 a month. Monthly revenue will be 44 or 25 forever, with equal probability; the chain learns which right after opening. The first monthly cash flow comes one month after opening. Demand is not related to the market and r<sub>f</sub> = 8% a year. The lease lets the chain leave at month 24 (and only then) for a fee of 150 paid on leaving; after that it gets nothing. The chain has not committed to opening. How much does the right to leave add to the value of the opportunity?</p>`,
      options: ["268.83", "218.23", "282.53", "207.53"],
      answer: 1,
      solution: `<p><b>Monthly rate.</b> r<sub>m</sub> = 1.08<sup>1/12</sup> − 1 = 0.643403%, so 1/r<sub>m</sub> = 155.4236, A(24, r<sub>m</sub>) = 22.172911 and (1 + r<sub>m</sub>)<sup>24</sup> = 1.08<sup>2</sup> = 1.1664.</p><p><b>Without the right.</b> Net cash flow 14 or −5, expected 4.5 a month: 4.5 × 155.4236 − 750 = 699.4061 − 750 = −50.5939. The chain would not open: 0.</p><p><b>Good state.</b> 14 × 155.4236 − 750 = 2 175.9301 − 750 = 1 425.9301.</p><p><b>Bad state.</b> At month 24 staying is worth −5 × 155.4236 = −777.12 and leaving −150, so leave. NPV = −5 × 22.172911 − 750 − 150/1.1664 = −110.8646 − 750 − 128.6008 = −989.4654.</p><p><b>With the right.</b> 0.5 × 1 425.9301 − 0.5 × 989.4654 = 712.9651 − 494.7327 = 218.2324. Value of the right = 218.23 − max(0, −50.59) = <b>218.23</b>.</p>`,
      check: `<p>Price what the right changes. It removes the losses from month 25 on, worth 777.1180 at month 24 or 777.1180/1.1664 = 666.2533 today, at the cost of the fee, 128.6008 today. Net 537.6525 in the bad state, times 0.5 = 268.8263. And −50.5939 + 268.8263 = 218.2324 ✓ The first 50.59 of the 268.83 only lifts a negative NPV to 0, which the chain gets for free by not opening.</p>`,
      traps: [
        "Compared with the negative NPV without the right: 218.23 − (−50.59) = 268.83. That is the right's value to a branch already committed. Uncommitted, the chain would stay out without the right, worth 0.",
        null,
        "Ignored the fee, as if leaving were worth 0: 0.5 × 1 425.93 + 0.5 × (−860.86) = 282.53.",
        "Did not discount the fee paid at month 24: 0.5 × 1 425.93 + 0.5 × (−1 010.86) = 207.53.",
      ],
    },
  ],
});

/* sjanger 109 · d3-realrho · Real options priced with a traded twin (del 3 i korte stiger) */
window.EDU_DATA.sjangre.push({
  id: "d3-realrho",
  num: 109,
  seksjon: "del3",
  emne: "Realopsjoner",
  symboler: "realopsjon",
  title: "Real options priced with a traded twin",
  summary: "ρ from a traded twin, the option valued at the risk-free rate, why real probabilities fail, rate trees and the option to wait",
  chapters: [25, 22],
  exam: "H2024 E6 · V2021 P4 · lecture 11 patent",
  intro: `<p>When the exam gives you no probabilities, Kurbatov wants a light bulb: find a traded asset that moves with the same uncertainty, back ρ out of its prices and value the real option with ρ and r<sub>f</sub>. H2024 Exercise 6 did this for a ferry whose value moved with the interest rate. Spring 2021 Problem 4 did it for a patent. Five steps go from ρ to the full option to wait.</p>`,
  steps: [
    {
      id: "d3-realrho-1",
      title: "No probabilities? Find a traded twin",
      theory: `<p>If the exercise gives no usable probabilities, or the risk is a traded price or a rate, Kurbatov says it should be "like a light bulb": find a traded twin, an asset whose value moves with the same uncertainty. ρ is the probability that makes the twin earn exactly the risk-free rate over the year. Grow today's price by (1 + r<sub>f</sub>) before you compare it with the two values at t = 1. A real probability in the text plays no role in ρ.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">S<sub>0</sub> is the twin's price today, S<sub>u</sub> and S<sub>d</sub> its values at t = 1 including any payment made then. r<sub>f</sub> is the one-year risk-free rate. Check that 0 &lt; ρ &lt; 1.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>ρ is not a forecast. The twin's price already holds the market's beliefs and its risk premium; ρ is the weight that turns that price into a fair bet at r<sub>f</sub>. When the twin earns a risk premium, ρ sits below the real probability of the up state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A traded certificate costs 100 today and is worth 125 or 85 in a year. r<sub>f</sub> = 4%. ρ = (1.04 × 100 − 85)/(125 − 85) = 19/40 = 0.4750. Check: (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 ✓</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne today. In one year it will be 3 000 or 2 000. Aluminium costs nothing to store and pays nothing. The one-year risk-free rate is 5%. Analysts put the probability of 3 000 at 0.6. What is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.6000", "0.4500", "0.4275", "0.5725"],
      answer: 3,
      solution: `<p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.05 × 2 450 = 2 572.50.</p><p>ρ = (2 572.50 − 2 000)/(3 000 − 2 000) = 572.50/1 000 = <b>0.5725</b>. The analysts' 0.6 plays no role.</p>`,
      check: `<p>Reprice aluminium: (0.5725 × 3 000 + 0.4275 × 2 000)/1.05 = (1 717.50 + 855.00)/1.05 = 2 572.50/1.05 = 2 450 ✓ That only confirms the arithmetic, since ρ is built to make it hold. The sense check: under the analysts' 0.6, aluminium is expected to earn 2 600/2 450 − 1 = 6.12%, above the 5% risk-free rate, so ρ must sit below 0.6. It does ✓</p>`,
      traps: [
        "Used the analysts' real probability. ρ comes from prices, not from forecasts.",
        "Forgot to grow today's price by (1 + r<sub>f</sub>): (2 450 − 2 000)/1 000 = 0.4500.",
        "Gave 1 − ρ, the risk-neutral probability of the down state: 1 − 0.5725 = 0.4275.",
        null,
      ],
    },
    {
      id: "d3-realrho-2",
      title: "Value the real option with ρ and the risk-free rate",
      theory: `<p>Once you have ρ, every payoff that depends only on the same state is priced with the same weights. Find the option's payoff in each state at t = 1, with max(·, 0) because you are never forced to invest. Weight with ρ and discount at r<sub>f</sub>. Never mix: ρ goes with r<sub>f</sub>, a real probability goes with a risk-adjusted rate.</p>
<div class="formula"><div class="eq">C<sub>u</sub> = max(V<sub>u</sub> − I, 0) &nbsp;&nbsp; C<sub>d</sub> = max(V<sub>d</sub> − I, 0)</div>
<div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">V<sub>u</sub> and V<sub>d</sub> are what the project is worth at t = 1 in each state, I the investment paid at t = 1. Kurbatov's H2024 key writes the same thing as ρ times the up-state NPV seen from today.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The right to invest later is a call on the project. Its payoff can be copied with the twin and the risk-free bond, so it must cost what the copy costs. That is why real probabilities and risk preferences drop out.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The certificate from the last example gives ρ = 0.4750 at r<sub>f</sub> = 4%. A project worth 60 or 30 at t = 1 costs 45 then. C<sub>u</sub> = 15, C<sub>d</sub> = 0. C<sub>0</sub> = 0.475 × 15/1.04 = 6.85.</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne and will be 3 000 or 2 000 in one year; it pays nothing. The one-year risk-free rate is 5% and analysts put the probability of 3 000 at 0.6. A firm holds the right to build a recycling plant at t = 1 for 150 (USD million). The plant's value at t = 1 moves with aluminium: 260 if aluminium is 3 000 and 60 if it is 2 000. What is the right worth today?</p>`,
      options: ["59.98", "62.86", "23.33", "44.79"],
      answer: 0,
      solution: `<p>ρ = (1.05 × 2 450 − 2 000)/(3 000 − 2 000) = 0.5725.</p><p>Payoffs at t = 1: C<sub>u</sub> = max(260 − 150, 0) = 110. C<sub>d</sub> = max(60 − 150, 0) = 0: the firm does not build.</p><p>C<sub>0</sub> = (0.5725 × 110 + 0.4275 × 0)/1.05 = 62.975/1.05 = <b>59.98</b>.</p>`,
      check: `<p>Replicate the payoff with aluminium and the bond. Δ = (110 − 0)/(3 000 − 2 000) = 0.11 million tonnes, B = (0 − 2 000 × 0.11)/1.05 = −209.52. Cost: 2 450 × 0.11 − 209.52 = 269.50 − 209.52 = 59.98 ✓ The two routes are the same equation, so this catches arithmetic slips only.</p>`,
      traps: [
        null,
        "Used the analysts' 0.6 with the risk-free rate: 0.6 × 110/1.05 = 62.86. A real probability needs a risk-adjusted rate.",
        "Kept the negative payoff in the down state, as if the firm had to build: (0.5725 × 110 − 0.4275 × 90)/1.05 = 23.33.",
        "Put 1 − ρ on the up state: 0.4275 × 110/1.05 = 44.79.",
      ],
    },
    {
      id: "d3-realrho-3",
      title: "Why the real-probability answer differs",
      theory: `<p>You can value the right with real probabilities, but then you must discount at the right's own cost of capital. That is neither the project's rate nor the twin's. A call is a levered position in the twin: long Δ units, financed partly by borrowing. So its required return is higher than the twin's. You only know it once you know the price. Risk-neutral valuation avoids the circle: ρ moves the risk premium into the weights, so r<sub>f</sub> is the right rate.</p>
<div class="formula"><div class="eq">C<sub>0</sub> = E<sub>p</sub>[C<sub>1</sub>]/(1 + r<sub>C</sub>) = E<sub>ρ</sub>[C<sub>1</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">E<sub>p</sub> uses the real probability, E<sub>ρ</sub> the risk-neutral one. r<sub>C</sub> is the option's expected return, which you can back out only after pricing the option with ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Real probabilities are not wrong; they are incomplete without a discount rate that nobody hands you. The twin's price already contains both the beliefs and the premium, so it does the work in one step.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The certificate (100 today, 125 or 85 in a year, r<sub>f</sub> = 4%) has a real probability of 0.6 for the up state. A call paying 15 or 0 costs 6.8510. Its expected return under 0.6 is 0.6 × 15/6.8510 − 1 = 31.37%, against the certificate's (0.6 × 125 + 0.4 × 85)/100 − 1 = 9%. The call needs the far higher rate.</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne and will be 3 000 or 2 000 in a year; r<sub>f</sub> = 5%. A firm's right to build a recycling plant at t = 1 for 150 pays 110 if aluminium is 3 000 and 0 if it is 2 000. Priced with ρ = 0.5725 the right is worth 59.98. An analyst instead weights the payoffs with her real probability of 0.6 and discounts at r<sub>f</sub>. She gets 62.86. Which statement is right?</p>`,
      options: [
        "Hers is better: 0.6 is a forecast of the up state, while ρ is not.",
        "Hers is too high: under 0.6 the payoff must be discounted at the right's own rate, which is above aluminium's 6.12%.",
        "Both are right; they differ only because ρ was rounded to four decimals.",
        "Hers is too low: ρ already contains a risk premium, so her answer should be grossed up.",
      ],
      answer: 1,
      solution: `<p>Under 0.6, aluminium is expected to earn (0.6 × 3 000 + 0.4 × 2 000)/2 450 − 1 = 6.12%, above r<sub>f</sub>: its risk is priced, so 0.6 cannot be discounted at 5%.</p><p>The right is riskier still. Its expected return under 0.6 is 0.6 × 110/59.98 − 1 = 10.04%. Even aluminium's 6.12% gives 66/1.0612 = 62.19, still too high. Only 10.04% returns 59.98. That rate comes out of the risk-neutral price. So the analyst's 62.86 is <b>too high</b>; ρ with r<sub>f</sub> gives the price directly.</p>`,
      check: `<p>Discount her expected payoff at 10.04%: 66/1.1004 = 59.98 ✓ The leverage gives the same rate: the right holds 0.11 million tonnes worth 269.50 against a loan of 209.52, so it carries 269.50/59.98 = 4.4934 times aluminium's exposure. r<sub>C</sub> = 5% + 4.4934 × (6.1224% − 5%) = 10.04% ✓</p>`,
      traps: [
        "ρ is a pricing weight, not a forecast. Her 0.6 is fine as a forecast. The problem is the rate she discounts it at.",
        null,
        "The gap is 2.88, far more than rounding. The two methods agree only if her expected payoff is discounted at the right's own 10.04%.",
        "The premium makes ρ lower than 0.6 and her answer higher, not lower. A real probability discounted at r<sub>f</sub> overstates a call whose risk is priced.",
      ],
    },
    {
      id: "d3-realrho-4",
      title: "When the rate is the risk: the up state is the low rate",
      theory: `<p>In a rate tree the uncertain thing is the discount rate. The up state is the low rate, because a lower rate makes the same cash flows worth more. In Kurbatov's patent example "the upper case is the 5%", the lower of the two rates. The twin is a traded risk-free annuity. Three rules. First, S<sub>u</sub> and S<sub>d</sub> include the payment made at t = 1, as a share's value includes a dividend just paid. Second, grow S<sub>0</sub> at the one-year risk-free rate, which the exam states separately from today's long yield. Third, read the timing: if the right expires on a fixed date, waiting costs you a payment.</p>
<div class="formula"><div class="eq">S<sub>0</sub> = A(T, y) &nbsp;&nbsp; S<sub>u</sub> = 1 + A(T − 1, r<sub>low</sub>) &nbsp;&nbsp; S<sub>d</sub> = 1 + A(T − 1, r<sub>high</sub>)</div>
<div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">The twin pays 1 a year for T years from year 1 and yields y today. r<sub>f</sub> is the one-year rate, not y.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Bond prices and rates move in opposite directions, so the state that is good for the project is the one where rates fall. The one-year rate is what a risk-free investor earns while the tree resolves, so that is the return ρ must give the twin.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A 5-year annuity of 1 yields 5%: S<sub>0</sub> = A(5, 5%) = 4.329477. The one-year rate is 3%. Next year rates become 4% or 7%: S<sub>u</sub> = 1 + A(4, 4%) = 4.629895, S<sub>d</sub> = 1 + A(4, 7%) = 4.387211.</p><p>ρ = (1.03 × 4.329477 − 4.387211)/(4.629895 − 4.387211) = 0.072150/0.242684 = 0.2973.</p></div>`,
      q: `<p>A patent gives the right to produce a drug that pays a risk-free 2 (NOK million) a year until the patent expires in year 15. Production costs 20, paid when you start. The first payment comes one year later; if you wait a year, you collect only the payments in years 2 to 15. A traded risk-free annuity paying 1 a year in years 1 to 15 yields 6% today. The one-year risk-free rate is 4%. In one year the yield will be 3.5% or 9% for good. Nobody knows the real probabilities. What is the risk-neutral probability of the up state?</p>`,
      options: ["0.4814", "0.7385", "0.4194", "0.5806"],
      answer: 2,
      solution: `<p>The up state is the low rate, 3.5%, since it makes the payments worth more.</p><p>Twin today: S<sub>0</sub> = A(15, 6%) = 9.712249. At t = 1 the holder gets the year-1 payment plus 14 more: S<sub>u</sub> = 1 + A(14, 3.5%) = 11.920520 and S<sub>d</sub> = 1 + A(14, 9%) = 8.786150.</p><p>ρ = (1.04 × 9.712249 − 8.786150)/(11.920520 − 8.786150) = (10.100739 − 8.786150)/3.134370 = 1.314589/3.134370 = <b>0.4194</b>.</p>`,
      check: `<p>Reprice the annuity: (0.4194 × 11.920520 + 0.5806 × 8.786150)/1.04 = 9.7122 ✓ This confirms the arithmetic only. The order test can fail: S<sub>d</sub> = 8.786150 &lt; 1.04 × S<sub>0</sub> = 10.100739 &lt; S<sub>u</sub> = 11.920520, so 0 &lt; ρ &lt; 1 ✓ Where it leads: producing today gives 2 × A(15, 6%) − 20 = −0.5755. Waiting, you produce only at 3.5%, where 2 × A(14, 3.5%) − 20 = 1.841041 at t = 1, worth 0.419411 × 1.841041/1.04 = 0.7425 today.</p>`,
      traps: [
        "Grew S<sub>0</sub> at today's 6% long yield instead of the 4% one-year rate: (1.06 × 9.712249 − 8.786150)/3.134370 = 0.4814.",
        "Left the year-1 payment out of S<sub>u</sub> and S<sub>d</sub>, though S<sub>0</sub> includes it: (10.100739 − 7.786150)/(10.920520 − 7.786150) = 0.7385.",
        null,
        "Gave the risk-neutral probability of the high rate: 1 − 0.4194 = 0.5806. The up state is the low rate.",
      ],
    },
    {
      id: "d3-realrho-5",
      title: "Exam level: the option to wait, valued risk-neutrally",
      theory: `<p>This is H2024 Exercise 6 with new numbers. Waiting gives a call on the project started at t = 1, struck at the investment cost. All three twin prices must price one stream: the cash flows the option delivers, years 2 to T + 1. When every maturity is discounted at r<sub>0</sub> today, that stream is worth the value of investing now discounted one more year. Find ρ, value the call at r<sub>f</sub>, then subtract what investing today is worth, never a negative number.</p>
<div class="formula"><div class="eq">S<sub>u</sub> = C × A(T, r<sub>low</sub>) &nbsp;&nbsp; S<sub>d</sub> = C × A(T, r<sub>high</sub>) &nbsp;&nbsp; S<sub>0</sub> = C × A(T, r<sub>0</sub>)/(1 + r<sub>0</sub>)</div>
<div class="eq">C<sub>0</sub> = [ρ·max(S<sub>u</sub> − I, 0) + (1 − ρ)·max(S<sub>d</sub> − I, 0)]/(1 + r<sub>f</sub>)</div>
<div class="eq">option to wait = C<sub>0</sub> − max(0, NPV<sub>now</sub>)</div>
<div class="where">NPV<sub>now</sub> = C × A(T, r<sub>0</sub>) − I. The H2024 key's twin, an annuity of 1 for T + 1 years from year 1, gives the same ρ: a sure payment at t = 1 adds the same amount to (1 + r<sub>f</sub>)S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A project with a negative NPV today can still be worth something as a right: you keep the state where rates fall and walk away from the other. When investing today does not pay, the alternative to waiting is doing nothing, worth 0.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The project started at t = 1 has S<sub>0</sub> = 50, S<sub>u</sub> = 60 and S<sub>d</sub> = 45, r<sub>f</sub> = 5%, cost I = 54. Investing now gives cash flows worth 1.05 × 50 = 52.50, so NPV<sub>now</sub> = −1.50.</p><p>ρ = (52.50 − 45)/15 = 0.5000. C<sub>0</sub> = 0.5 × 6/1.05 = 2.8571. Option to wait = 2.8571 − max(0, −1.50) = 2.8571: wait.</p></div>`,
      q: `<p>A licence lets you build a feed barge for 40 (NOK million), paid when you build. It pays 6 a year for 8 years, starting one year after you build. Today every maturity is discounted at 5%. The risk-free rate from year 0 to year 1 is 5%. If you wait a year, the rate becomes 3% or 6.5% for good; the cost is still 40 and the barge still pays for 8 years after you build. An analyst puts the real probability of 3% at 0.5. What is the value today of the option to wait, measured against the best you can do today (build now or do nothing)?</p>`,
      options: ["0.8114", "1.5117", "1.0086", "2.0322"],
      answer: 0,
      solution: `<p><b>Building today.</b> 6 × A(8, 5%) = 6 × 6.463213 = 38.7793, so NPV<sub>now</sub> = −1.2207. Do not build today.</p><p><b>Underlying: the barge built at t = 1</b>, payments in years 2 to 9. S<sub>u</sub> = 6 × A(8, 3%) = 6 × 7.019692 = 42.1182. S<sub>d</sub> = 6 × A(8, 6.5%) = 6 × 6.088751 = 36.5325. Today: S<sub>0</sub> = 38.7793/1.05 = 36.9326.</p><p><b>ρ.</b> (1.05 × 36.9326 − 36.5325)/(42.1182 − 36.5325) = (38.7793 − 36.5325)/5.5856 = 2.2468/5.5856 = 0.4022.</p><p><b>Payoffs.</b> C<sub>u</sub> = 42.1182 − 40 = 2.1182. C<sub>d</sub> = max(36.5325 − 40, 0) = 0.</p><p><b>Value.</b> C<sub>0</sub> = 0.4022 × 2.1182/1.05 = 0.8114. Option to wait = 0.8114 − max(0, −1.2207) = <b>0.8114</b>. Wait.</p>`,
      check: `<p>A second twin for the same stream must give the same ρ. The H2024 key's version is an annuity of 1 a year for 9 years from year 1: S<sub>0</sub> = A(9, 5%) = 7.107822, S<sub>u</sub> = 1 + A(8, 3%) = 8.019692, S<sub>d</sub> = 1 + A(8, 6.5%) = 7.088751, so ρ = (1.05 × 7.107822 − 7.088751)/(8.019692 − 7.088751) = 0.374462/0.930941 = 0.4022 ✓ Pairing today's 38.7793 with S<sub>u</sub> and S<sub>d</sub> gives 0.7494 and fails this test. The analyst's 0.5 sits above ρ, as it should when rate risk is priced.</p>`,
      traps: [
        null,
        "S<sub>0</sub> priced a different stream: 38.7793 is the barge built today (years 1 to 8), while S<sub>u</sub> and S<sub>d</sub> value the barge built at t = 1 (years 2 to 9). That gives ρ = 0.7494 and 0.7494 × 2.1182/1.05 = 1.5117.",
        "Used the analyst's real 0.5 with the risk-free rate: 0.5 × 2.1182/1.05 = 1.0086. Rate risk is priced, so 0.5 needs a risk-adjusted rate.",
        "Compared with the negative NPV of building today: 0.8114 − (−1.2207) = 2.0322. Building today does not pay, so the alternative is 0.",
      ],
    },
  ],
});

/* sjanger 110 · d3-motiver · Why firms merge and who gains */
window.EDU_DATA.sjangre.push({
  id: "d3-motiver",
  num: 110,
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  title: "Why firms merge and who gains",
  summary: "Motives with their mechanism, the motives that fail, who captures the gain, cash or stock and the takeover threat, ending with an H2024 E1 answer to grade",
  chapters: [26],
  exam: "H2024 E1 (12 points, verbal) · Mock exams 2, 6 and 10, E1",
  intro: `<p>M&amp;A motives come as a theory question of about 10 points with no calculations. H2024 Exercise 1 asked for four reasons a deal can be good or bad for the acquirer and for the target, with synergies banned. Kurbatov's own example of a theory question was simply "why do firms merge?". The grader pays for the mechanism behind each reason, not the label. The ladder takes the motives that work, the ones that fail, who gains and why, cash or stock and the takeover threat. It ends by grading an H2024-style answer the way the key does.</p>`,
  steps: [
    {
      id: "d3-motiver-1",
      title: "A motive is a mechanism: say how the value arises",
      theory: `<p>A merger creates value only if the combined firm is worth more than the two firms apart: the gain is S = (A + T + S) − (A + T). Writing "the deal creates value" restates that equation. Kurbatov said in class that "value creation" alone would not be accepted: say <b>through which channel</b> the cash flows rise or the costs fall.</p>
<table class="data"><tr><th>Motive</th><th>The mechanism to write</th></tr>
<tr><td>Economies of scale and scope</td><td>Fixed costs spread over more output; one sales force or platform serves several products</td></tr>
<tr><td>Vertical integration</td><td>Buying a supplier or a customer takes the middleman's margin and ends the risk of being held up</td></tr>
<tr><td>Expertise, patents, human capital</td><td>Buy a team or a technology that would take years to build (Disney buying Pixar)</td></tr>
<tr><td>Market power</td><td>Fewer competitors, higher prices: real for the owners, paid by customers, so authorities may block it</td></tr>
<tr><td>Change of control</td><td>Replace weak managers and run the same assets better</td></tr>
<tr><td>Foothold in a new market</td><td>Local brands, contracts and relationships come with the target</td></tr>
<tr><td>Scarce resources</td><td>A licence, a site or a raw material that cannot be bought on its own</td></tr></table>
<p>Only the first row is a synergy in the narrow sense. With synergies banned, Kurbatov accepted the others in class: patents and human capital (Pixar and Disney), the middleman's margin, a foothold in a new market and scarce resources. The H2024 key even listed economies of scale, but the safest answer leads with a mechanism that is plainly not "the two firms are worth more together".</p>
<div class="callout tip"><span class="h">Intuition</span><p>Every motive ends in value creation, so naming the end earns nothing. Test your sentence: why could the firms not get this gain apart, or by a contract? If you can answer that, you have the mechanism.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: a weak and a full answer</span><p>Fjellmelk ASA, a dairy, buys the firm that makes its milk cartons.</p><p>Weak: "The deal creates value because the two firms are worth more together." That is the definition of a synergy, with no channel.</p><p>Full point: "Vertical integration: Fjellmelk stops paying the supplier's margin on every carton and can no longer be held up by a supplier that raises prices before the Christmas season."</p></div>`,
      q: `<p>Nordkapp Sjømat ASA, a Norwegian salmon exporter, buys Sakura Import, a small firm that has sold Norwegian salmon to Japanese supermarket chains for 20 years. The exam question bans synergies. Which sentence earns the point?</p>`,
      options: [
        "The deal creates value for Nordkapp's owners, since the two firms together are worth more than the two firms apart",
        "Sales in Japan and Norway do not move together, so the combined firm is less risky and worth more to its owners",
        "A foothold in Japan: Sakura's contracts and supermarket relationships would take Nordkapp many years to build",
        "Sakura has posted losses for three years, so Nordkapp can set those losses against its own taxable profit",
      ],
      answer: 2,
      solution: `<p>The sentence that scores names <b>what Nordkapp buys</b> (contracts and relationships in Japan) and <b>why buying beats building</b> (they take years to build). That is the foothold motive Kurbatov accepted in class. Had Sakura been reselling Nordkapp's own salmon, "taking the middleman's margin" would also have scored with its mechanism.</p><p>The other sentences fail for three different reasons: a restated synergy, a risk argument that helps creditors rather than owners and a tax argument that does not hold in this course.</p>`,
      check: `<p>Run the test on each sentence: why could Nordkapp not get this gain alone? Only the foothold sentence answers it, since the relationships take years to build. The others name no channel, name a channel that moves value to someone else or rely on losses that vanish when the owner changes ✓.</p>`,
      traps: [
        "Restates the definition of a synergy and names no channel. Kurbatov: value creation alone is not accepted.",
        "Diversification: owners can hold both shares themselves without paying a premium. Only systematic risk is priced; the lower default risk helps creditors (coinsurance).",
        null,
        "Tax losses are erased when the owner changes (Kurbatov, lecture 13), so you cannot buy a firm for its losses in this course.",
      ],
    },
    {
      id: "d3-motiver-2",
      title: "Motives that fail: diversification, EPS and empire building",
      theory: `<p>Some motives sound like value and are not. The grader rejects the label without the reason, so learn why each one fails.</p>
<ul><li><b>Diversification.</b> The merged firm is less risky, but owners can diversify by holding both shares without paying a premium. Only systematic risk is priced, so the discount rate does not fall. The lower default risk makes the old debt safer: a <b>wealth transfer</b> from shareholders to creditors (coinsurance).</li><li><b>EPS bootstrapping.</b> An acquirer with a high P/E that buys a low-P/E target with shares reports higher earnings per share even with S = 0. The price per share does not move; the P/E falls instead.</li><li><b>Empire building.</b> The CEO gains pay, status and security from running a bigger firm and buys at a negative NPV. Kurbatov: "inefficient reasons are also reasons for M&amp;A". If the question asks why firms merge, it counts, labelled as value-destroying.</li><li><b>Tax losses.</b> Not a motive in this course: the losses are erased when the owner changes.</li></ul>
<div class="formula"><div class="eq">EPS after = (Earnings<sub>A</sub> + Earnings<sub>T</sub>)/(N<sub>A</sub> + x)</div><div class="eq">P after = (A + T + S)/(N<sub>A</sub> + x)</div><div class="where">x is the number of new shares issued to the target's owners. With S = 0 and a fair price for the target, the share price is unchanged whatever happens to EPS.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A motive creates value only if it changes the cash flows or the risk investors are paid for. Diversification and EPS change neither; they rearrange numbers investors see through. Empire building does change the cash flows: downwards.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: EPS up, nobody richer</span><p>Acquirer: earnings 60, 30 shares at 50, so A = 1 500, EPS = 2.00 and P/E = 25. Target: earnings 40, worth 400 (P/E 10). No synergies. The acquirer pays 400 in its own shares: x = 400/50 = 8.</p><p>EPS after = (60 + 40)/(30 + 8) = 100/38 = 2.6316, up 31.58%. Price after = (1 500 + 400)/38 = 1 900/38 = 50.00, unchanged. The P/E falls to 50/2.6316 = 19.00: the higher EPS is paid for with a lower multiple.</p></div>`,
      q: `<p>Brattli ASA plans to buy Holmen AS with new shares. There are no synergies and the merged firm takes on no new debt. Which statement about the possible motives is correct?</p>`,
      options: [
        "Diversification is worth a premium to Brattli's owners, since the merged firm's cash flows are less volatile than each firm's alone",
        "If EPS rises after the share deal, Brattli's owners must have gained, since each Brattli share now earns more",
        "With no synergies and no new debt, the lower default risk after the merger raises the value of the merged firm's equity",
        "Empire building counts as a reason firms merge, although it destroys value for the owners of the acquiring firm",
      ],
      answer: 3,
      solution: `<p>Kurbatov counts inefficient motives as motives. If the question is why firms merge, <b>empire building</b> is a reason. You score by naming its mechanism (the CEO gains size, pay and status while the owners pay a premium for a negative-NPV deal) and its sign.</p><p>The other three confuse a change in a number with a change in value. Less volatile cash flows are diversification the owners can do themselves. Higher EPS from a share deal is bootstrapping: the price per share does not move. Lower default risk with the same debt is coinsurance: the debt gains and the equity loses by the same amount.</p>`,
      check: `<p>Use the example: EPS rose from 2.00 to 2.6316 while the price stayed at 50.00, so EPS is no evidence of value. For coinsurance use consistency check 4: with total value fixed, the creditors' gain is the shareholders' loss ✓.</p>`,
      traps: [
        "Owners diversify for free by holding both shares. Only systematic risk is priced, so a premium paid for diversification is value given away.",
        "EPS bootstrapping: buying a lower P/E with shares lifts EPS by arithmetic. In the example EPS rose 31.58% while the price stayed at 50.00.",
        "Coinsurance runs the other way: safer debt is worth more, so with total value fixed the equity is worth less. A wealth transfer to creditors.",
        null,
      ],
    },
    {
      id: "d3-motiver-3",
      title: "Who gains: the target, because it can be sold only once",
      theory: `<p>Announcement returns (Kurbatov, lecture 12): targets earn about <b>+15%</b> on average, acquirers about <b>+1%</b> and negative in about half the deals, so roughly zero. The two together earn about +1% to +3%. Mergers create value on average and the target's owners take most of it. The 15% is a price reaction, not the premium; offered premiums are often 20–40%.</p>
<ul><li><b>Competition.</b> A target can be sold only once. Rival bidders, or the threat of one, push the price towards the full synergy. A bidder pays up to its value if it wins minus its value if a rival wins.</li><li><b>Holding out.</b> Each small target holder refuses to sell below what the share will be worth after the deal (the free-rider problem).</li><li><b>Overpayment.</b> Hubris, the winner's curse and empire building make bidders pay more than the target is worth to them.</li><li><b>Information.</b> A bid tells the market the target is better than thought, so part of its price rise is a revaluation, not a share of S.</li></ul>
<p>The exception: a target in <b>distress</b> must sell and has no bargaining power, so the acquirer keeps most of S, "even like a fire sale" (Kurbatov).</p>
<div class="callout tip"><span class="h">Intuition</span><p>The gain goes to the side that is hard to replace. There are many possible buyers but only one target, so competition hands the target the synergy, unless the target cannot wait.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target is worth 400 alone. Two bidders each expect synergies of 100, so each will pay up to 500. Bidding pushes the price close to 500: the target's owners get almost all of the 100 and the winner keeps little. If the target must sell within weeks and only one bidder shows up, the price can stay near 400 and the acquirer keeps the 100.</p></div>`,
      q: `<p>On the announcement of a deal, targets earn about +15% on average while acquirers earn about zero. Which statement explains the pattern correctly?</p>`,
      options: [
        "Competition: a target can be sold only once, so rival bidders push the price towards the full synergy and the winner keeps little",
        "Mergers create no value on average: whatever the target's owners gain, the acquirer's owners lose in the same deal",
        "The target's owners gain because the synergies are produced inside the target's own business and belong to it",
        "Targets always win: even a distressed target that must sell quickly to a single bidder still takes most of the synergy",
      ],
      answer: 0,
      solution: `<p>Who gets S depends on the price; the price depends on bargaining power. A target can be sold only once, so competing bidders bid the price up until the winner is left with little of the synergy: that is why acquirers earn about zero. Overpayment through hubris or the winner's curse pushes the same way.</p><p>Mergers do create value on average (+1% to +3% combined), so the target's gain is not simply the acquirer's loss. The pattern also has an exception: a distressed target has no bargaining power.</p>`,
      check: `<p>Ask what would change the split. Remove the rivals and the acquirer pays less; force the target to sell and the acquirer keeps most of S. Neither change moves the place where the synergies are produced, so that place cannot be what decides the split ✓.</p>`,
      traps: [
        null,
        "The combined return is about +1% to +3%, mostly positive. Value is created; it is the split that favours the target.",
        "Where S arises does not decide who gets it. The price does: a target that must sell gets little, whichever business produces the gain.",
        "A distressed target has no bargaining power: the acquirer keeps most of the synergy, \"even like a fire sale\" (Kurbatov).",
      ],
    },
    {
      id: "d3-motiver-4",
      title: "Cash or stock: who carries the risk and what the choice signals",
      theory: `<p>With <b>cash</b> the acquirer pays a fixed price P and owns the whole merged firm. With <b>stock</b> the target's owners get a fraction y of the merged firm and become partners.</p>
<div class="formula"><div class="eq">Cash: NPV<sub>A</sub> = S − (P − T) · NPV<sub>T</sub> = P − T</div><div class="eq">Stock: NPV<sub>A</sub> = (1 − y)(A + T + S) − A · NPV<sub>T</sub> = y(A + T + S) − T</div><div class="where">A and T are the stand-alone values, S the synergies. With cash the target's payoff does not depend on S, so the acquirer carries all of the synergy risk. With stock the target carries the fraction y of it.</div></div>
<ul><li><b>Uncertain synergies</b>: pay in stock, so the sellers share the risk.</li><li><b>A seller who stays on as manager</b> takes stock; one who wants out takes cash (Kurbatov).</li><li><b>An acquirer that thinks its shares are overvalued</b> prefers stock, a cheap currency. Investors know it, so a stock offer signals overvaluation and the acquirer's price tends to fall. An acquirer that thinks its shares are cheap pays cash.</li><li><b>Liquidity and debt capacity</b>: cash needs cash or new debt.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>Paying in shares makes the sellers partners in whatever the merged firm turns out to be worth. That is useful when you are unsure about the synergies and costly when you know your own shares are cheap.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: the same deal when the synergies fail</span><p>A = 800, T = 200, expected S = 100. A cash offer of P = 250, or the equal stock offer y = 250/1 100 = 0.227273. Expected NPV<sub>A</sub> = 100 − (250 − 200) = 50 either way.</p><p>Now S turns out to be 0. Cash: NPV<sub>A</sub> = 0 − 50 = −50 while the target keeps +50. Stock: the merged firm is worth 1 000, so NPV<sub>A</sub> = (1 − 0.227273) × 1 000 − 800 = 772.73 − 800 = −27.27 and NPV<sub>T</sub> = +27.27. With stock the target bore 50 − 27.27 = 22.73 of the 100 shortfall, which is y × 100.</p></div>`,
      q: `<p>Holt Robotics AS is sold to Bjørkvik ASA. Holt's founder will stay on for five years to run the Holt division. The size of the synergies depends on whether Holt's engineers and Bjørkvik's sales force work well together. Nobody can tell yet. Bjørkvik's managers believe the market prices their shares fairly. Bjørkvik can afford either payment. Which payment does the course point to and why?</p>`,
      options: [
        "Cash: when the synergies are uncertain, the acquirer should lock in a fixed price so that it knows exactly what it pays",
        "Shares: the founder then bears part of the risk that the synergies fail and, by staying on, keeps a stake in the result",
        "Shares: a stock offer signals that Bjørkvik's managers believe their own shares are undervalued by the market",
        "Cash: a stock offer always pushes the acquirer's share price down, whatever its managers know about its shares",
      ],
      answer: 1,
      solution: `<p>Two facts point the same way. The synergies are uncertain; with shares Holt's owners carry the fraction y of any shortfall instead of leaving all of it to Bjørkvik. The founder stays on as manager. A seller who stays takes shares (Kurbatov): the founder's wealth then moves with the integration the founder now runs.</p><p>The signalling argument is neutral here, since Bjørkvik's managers think their shares are fairly priced.</p>`,
      check: `<p>Use the example: when the synergies failed, a stock offer moved 22.73 of the 100 shortfall to the sellers, while cash left all 100 with the acquirer ✓. Turn the facts around and the answer flips: certain synergies and a founder who retires would point to cash.</p>`,
      traps: [
        "Direction reversed: a fixed cash price leaves all of the synergy risk with the acquirer. In the example cash cost the acquirer the full 100 shortfall.",
        null,
        "Signal reversed: stock is the currency an acquirer uses when it thinks its shares are overvalued. An acquirer that thinks they are cheap pays cash.",
        "Overreach: the discount on a stock offer comes from investors suspecting overvaluation. It is a tendency, not a rule. Here the risk sharing and the founder's role decide.",
      ],
    },
    {
      id: "d3-motiver-5",
      title: "The takeover threat: a motive and a monitor",
      theory: `<p>A badly run firm trades below what its assets would be worth under better managers. An outside buyer can buy it, replace management and keep part of the difference: the <b>disciplinary takeover</b>, or change of control, on Kurbatov's list of motives. The gain comes from running the target's own assets better, not from combining two firms, so it survives a ban on synergies.</p>
<p>It also works when no bid comes. A CEO who wants to keep the job must close the gap before someone else does. Kurbatov calls the threat of a hostile takeover "one of the strongest forms of monitoring for corporate managers". It weakens when defences such as poison pills and staggered boards block bids and when target owners hold out for the whole improvement. Takeovers have costs too: disrupted operations and damage to the corporate culture.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The discount on a badly run firm is a prize for whoever fixes it. As long as an outsider can claim the prize, the manager has a reason to claim it first.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm is worth 1 000 under its current CEO and 1 300 under better managers. A bidder that pays 1 150 and replaces management gains 1 300 − 1 150 = 150; the target's owners gain 1 150 − 1 000 = 150 on the sale. If the CEO lifts the value to 1 300 first, no bidder can profit, so no bid comes.</p></div>`,
      q: `<p>Granvik Inc., a US-listed firm, has traded about 20% below analysts' estimate of its value under better management for years. No bid has been made in ten years. Why does the takeover market still discipline Granvik's CEO?</p>`,
      options: [
        "It does not: the takeover market disciplines a CEO only in the years when a bid is actually on the table",
        "A poison pill would let Granvik's board bargain for a higher price in a bid, which forces the CEO to work harder today",
        "The 20% discount is a prize for any bidder who replaces management, so the CEO has a reason to close the gap first",
        "The discount lowers the value of the CEO's share options, so the CEO's own pay suffers for as long as the gap stays open",
      ],
      answer: 2,
      solution: `<p>A bidder that buys Granvik, replaces management and runs the assets well collects the 20% gap. The CEO knows this. Closing the gap first removes the prize and with it the bid that would cost the CEO the job. That is why Kurbatov counts the <b>threat</b> as one of the strongest forms of monitoring: it works in every year, not only in the year a bid arrives.</p>`,
      check: `<p>Ask what would switch the discipline off: defences that block bids. They take the prize away from outsiders and the pressure off the CEO, which is why the market reacts badly when a firm adopts a pill ✓. Pay in options is a separate channel that works through the CEO's contract.</p>`,
      traps: [
        "Ignores the threat. A CEO who expects a bid if the gap stays open acts before the bid comes.",
        "A pill blocks bids, so it weakens the threat. It may raise the price once a bid comes, but it does not discipline the CEO.",
        null,
        "A different channel: option pay disciplines through the contract. The question asks about the takeover market, which works through the threat of replacement.",
      ],
    },
    {
      id: "d3-motiver-6",
      title: "Exam level: grade a four-box answer like H2024 E1",
      theory: `<p>H2024 Exercise 1 (12 points) asked for four reasons, synergies banned: one good and one bad for the acquirer, one good and one bad for the target, 1–2 sentences each, 3 points per box. The key accepts any reasonable reason with its mechanism. Run two tests on every box:</p>
<ul><li><b>Is it the banned answer in other words?</b> "Worth more together" and "value creation" are.</li><li><b>Does the mechanism move value the way the box claims?</b> Overpayment is bad for the acquirer and good for the target. Coinsurance helps creditors, not owners. Payment in overvalued acquirer shares hurts the target.</li></ul>
<p>Also check that two boxes do not repeat one mechanism. Leave out tax losses.</p>
<div class="callout tip"><span class="h">Intuition</span><p>A box scores when it says whose wealth moves, in which direction and through which channel. A reason that is true but moves value to someone else belongs in another box or nowhere.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one box, weak and full</span><p>Bad for the target, weak: "The target loses its independence." No channel to the owners' wealth.</p><p>Full: "Entrenched managers recommend a low offer in return for a golden parachute, so the target's owners get less than the firm is worth to the bidder."</p></div>`,
      q: `<p>A student answers an H2024-style question (synergies banned, 1–2 sentences per box):</p><p>1. Good for the acquirer: replacing the target's weak managers lets the acquirer run the same assets with tighter cost control.</p><p>2. Bad for the acquirer: the winner's curse; the bidder that wins is the one that overestimated the target most, so it tends to overpay.</p><p>3. Good for the target: the merged firm is less risky, so the target's shareholders now own safer shares.</p><p>4. Bad for the target: payment in acquirer shares that later prove overvalued, so the target's owners receive less than the offer seemed worth.</p><p>Which box would the grader mark down and why?</p>`,
      options: [
        "Box 1: replacing the target's managers is a synergy in other words, so it scores nothing when synergies are banned",
        "Box 3: lower risk is diversification the owners could do themselves; the lower default risk helps the creditors",
        "Box 2: the winner's curse is good for the target, since its owners are overpaid, so it belongs in box 3 instead",
        "Box 4: it repeats box 2, since both boxes describe a price that turns out too high for one side of the deal",
      ],
      answer: 1,
      solution: `<p>Box 3 fails the direction test. A less risky merged firm is diversification, which the target's owners could get by holding both shares; only systematic risk is priced. The risk reduction that does move prices goes to the <b>creditors</b>: safer debt is worth more and equity less (coinsurance), so it cannot be good for the target's owners. A box that scores: the control premium, pushed up by competing bidders.</p><p>The other boxes pass both tests. Better management is a governance gain on the target's own assets, which the H2024 key accepts. The winner's curse moves value away from the acquirer. Overvalued paper moves value away from the target.</p>`,
      check: `<p>Score the answer box by box at 3 points each: boxes 1, 2 and 4 pass both tests and box 3 fails the direction test, so 3 × 3 = 9 of 12. Swapping box 3 for the control premium restores 12 ✓.</p>`,
      traps: [
        "Better management is a gain on the target's own assets, not a gain from combining two firms. Kurbatov's key accepts it.",
        null,
        "The winner's curse is bad for the acquirer, which is the box it is in. That the target gains from the same overpayment does not make the box wrong.",
        "Opposite directions: in box 2 the acquirer overpays and the target gains; in box 4 the target receives overpriced paper and loses.",
      ],
    },
  ],
});

/* sjanger 111 · d3-aksjebytte · Stock swaps, cash offers and bidding (kort stige, del 3) */
window.EDU_DATA.sjangre.push({
  id: "d3-aksjebytte",
  num: 111,
  title: "Stock swaps, cash offers and bidding",
  summary: "The exchange ratio, the merged price, each side's NPV under cash and stock, the highest ratio and a bidding war",
  chapters: [26],
  exam: "M&A on 8 of 11 papers · stock-swap NPVs and the exchange-ratio bound are on the formula sheet · the bank D bidding war is flagged for 2026",
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  intro: `<p>Most M&amp;A calculations start from a stock swap: how many new shares, what the merged firm's shares are worth and how the synergies are split. The formula sheet gives the two NPVs and the bound on the exchange ratio, but not y or the merged price. This ladder builds those, shows why cash and shares split the risk differently and ends with a cash-or-shares exam chain and the bank D bidding war Kurbatov flagged for 2026.</p>`,
  steps: [
    {
      id: "d3-aksjebytte-1",
      title: "The exchange ratio, the new shares and the merged share price",
      theory: `<p>In a stock swap the acquirer pays with its own shares. The exchange ratio ER is the number of acquirer shares each target share receives: "3 acquirer shares for every 8 target shares" is ER = 3/8 = 0.375. The acquirer issues x new shares to the target's holders. After the deal the merged firm is worth the two stand-alone values plus the synergies. Every share, old or new, has the same claim on it.</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub> &nbsp;&nbsp; P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="where">A = N<sub>A</sub> × P<sub>A</sub> and T = N<sub>T</sub> × P<sub>T</sub> are the stand-alone equity values at <b>pre-announcement</b> prices. S is the present value of the synergies. Neither formula is on the formula sheet.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The target's holders stop owning the target and start owning a slice of the merged firm. The price is total value over total shares. If P<sub>new</sub> ends above P<sub>A</sub>, the acquirer gave away less than the target brought in.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The acquirer has 9 million shares at 50 NOK and the target 6 million at 20 NOK. The offer is 1 acquirer share for every 2 target shares, so ER = 0.5. S = 54 million.</p><p>A = 450 and T = 120. x = 0.5 × 6 = 3 million new shares. P<sub>new</sub> = (450 + 120 + 54)/(9 + 3) = 624/12 = 52.00 NOK.</p></div>`,
      q: `<p>Granheim ASA has 30 million shares at 84 NOK. It offers 3 Granheim shares for every 8 shares of Tveit AS, which has 24 million shares at 28 NOK. The synergies are worth 150 million NOK. Both prices are pre-announcement. What is the share price of the merged firm?</p>`,
      options: ["81.85 NOK", "35.55 NOK", "85.69 NOK", "61.89 NOK"],
      answer: 2,
      solution: `<p>ER = 3/8 = 0.375, so x = 0.375 × 24 = 9 million new shares and N<sub>A</sub> + x = 39 million.</p><p>A = 30 × 84 = 2 520 and T = 24 × 28 = 672, so A + T + S = 2 520 + 672 + 150 = 3 342 million.</p><p>P<sub>new</sub> = 3 342/39 = <b>85.69 NOK</b>.</p>`,
      check: `<p>Split the value. Tveit's holders get 9 million shares worth 9 × 85.6923 = 771.23 million, while Tveit brings in T + S = 822. Granheim's holders keep the difference, 822 − 771.23 = 50.77 million, or 1.6923 per old share: 84 + 1.6923 = 85.6923 ✓ The price rose, so Granheim gave away less than it got.</p>`,
      traps: [
        "Forgot the synergies: (2 520 + 672)/39 = 81.85 NOK.",
        "Turned the ratio upside down: x = (8/3) × 24 = 64 million, so 3 342/94 = 35.55 NOK.",
        null,
        "Divided by both firms' old share counts, 30 + 24 = 54, instead of 30 + 9: 3 342/54 = 61.89 NOK.",
      ],
    },
    {
      id: "d3-aksjebytte-2",
      title: "The NPV to each side: stock against cash",
      theory: `<p>The deal creates S. How it is paid for decides who gets it. In a stock swap the target's holders end up with the fraction y of the merged firm and the acquirer's old holders with 1 − y. Each side's NPV is what it owns after the deal minus what it had before. In a cash deal the target's holders swap T for the cash price P, while the acquirer keeps the merged firm and pays the cash.</p>
<div class="formula"><div class="eq">Stock: y = x/(N<sub>A</sub> + x) &nbsp; NPV<sub>A</sub> = (1 − y)(A + T + S) − A &nbsp; NPV<sub>T</sub> = y(A + T + S) − T</div><div class="eq">Cash: NPV<sub>T</sub> = P − T &nbsp; NPV<sub>A</sub> = S − (P − T)</div>
<div class="where">P is the total cash price for the target's equity. Both ways NPV<sub>A</sub> + NPV<sub>T</sub> = S. The stock-swap NPVs are on the formula sheet; y and the cash NPVs are not (lecture 12).</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Cash gives the target a fixed premium. Shares give it a slice of the merged firm, synergies included. So a stock offer is worth more to the target than its value at the acquirer's old price whenever the deal lifts the acquirer's price.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: x = 3, N<sub>A</sub> + x = 12, A = 450, T = 120 and S = 54. y = 3/12 = 0.25 and A + T + S = 624.</p><p>NPV<sub>A</sub> = 0.75 × 624 − 450 = 18. NPV<sub>T</sub> = 0.25 × 624 − 120 = 36. Sum 54 = S ✓</p><p>Cash at 25 NOK per share instead, which is what the shares are worth at the old price: P = 150, NPV<sub>T</sub> = 150 − 120 = 30 and NPV<sub>A</sub> = 54 − 30 = 24.</p></div>`,
      q: `<p>Askvik ASA has 25 million shares at 120 NOK. It offers ER = 0.5 for each of the 15 million shares of Breivik AS, which trade at 50 NOK. The synergies are worth 225 million NOK and both prices are pre-announcement. What is the NPV of the deal for Breivik's shareholders?</p>`,
      options: ["150.00 million", "57.69 million", "115.38 million", "167.31 million"],
      answer: 3,
      solution: `<p>A = 25 × 120 = 3 000 and T = 15 × 50 = 750, so A + T + S = 3 975.</p><p>x = 0.5 × 15 = 7.5 million and y = 7.5/32.5 = 0.230769.</p><p>NPV<sub>T</sub> = 0.230769 × 3 975 − 750 = 917.31 − 750 = <b>167.31 million</b>.</p>`,
      check: `<p>Route through the price: P<sub>new</sub> = 3 975/32.5 = 122.3077, so each Breivik share receives 0.5 × 122.3077 = 61.1538 NOK and NPV<sub>T</sub> = 15 × (61.1538 − 50) = 167.31 ✓ A cash offer of 60 NOK per share, the stock offer's value at Askvik's old price, would give Breivik only 150: the shares also hand Breivik part of S.</p>`,
      traps: [
        "Valued the new shares at Askvik's old price, as if the offer were 60 NOK in cash: 7.5 × 120 − 750 = 150.00 million. That leaves out Breivik's slice of the synergies.",
        "Gave Askvik's NPV instead: 0.769231 × 3 975 − 3 000 = 57.69 million.",
        "Forgot the synergies: 0.230769 × 3 750 − 750 = 115.38 million.",
        null,
      ],
    },
    {
      id: "d3-aksjebytte-3",
      title: "Why cash and stock split the risk differently",
      theory: `<p>Cash fixes the target's gain at P − T when the deal is signed. Whatever S turns out to be, the acquirer's holders take all of it: the full shortfall if the synergies disappoint, the full upside if they surprise. In a stock swap the target's holders own y of the merged firm, so they carry y of any surprise. The same holds for overpayment: if the acquirer hands over more than T + S, P<sub>new</sub> falls below P<sub>A</sub> and the target's holders receive less than the offer seemed worth.</p>
<div class="formula"><div class="eq">S falls by ΔS. Cash: NPV<sub>A</sub> falls by ΔS, NPV<sub>T</sub> is unchanged</div><div class="eq">Stock: NPV<sub>A</sub> falls by (1 − y)ΔS, NPV<sub>T</sub> falls by yΔS</div>
<div class="where">y = x/(N<sub>A</sub> + x) is fixed by the exchange ratio when the deal is signed. Both methods still give NPV<sub>A</sub> + NPV<sub>T</sub> = S, whatever S turns out to be.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Cash is a fixed claim; shares are a slice of the outcome. Paying in stock makes the target's holders partners who win and lose with the merged firm. That is why stock is the natural currency when the synergies are uncertain.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The deal from the previous example, but S turns out to be 6, not 54: a shortfall of 48.</p><p>Stock: the merged firm is worth 576 and P<sub>new</sub> = 48. NPV<sub>A</sub> = 0.75 × 576 − 450 = −18, down 36 = 0.75 × 48. NPV<sub>T</sub> = 0.25 × 576 − 120 = 24, down 12 = 0.25 × 48.</p><p>Cash at 25: NPV<sub>T</sub> stays 30. NPV<sub>A</sub> = 6 − 30 = −24, down the full 48.</p></div>`,
      q: `<p>Lunde ASA will buy Vik AS and can pay in cash or in new Lunde shares. At today's prices both offers are worth the same to Vik's holders. Analysts fear that the synergies will be much smaller than Lunde expects. Which statement is right?</p>`,
      options: [
        "With cash, Vik's holders bear part of a shortfall, because the cash price was set from the expected synergies.",
        "With shares, Vik's holders bear the fraction y of a shortfall; with cash, Lunde's holders bear all of it.",
        "The payment method does not change who bears the risk, because the two NPVs add up to S either way.",
        "With shares, Lunde's holders bear all of a shortfall, because Lunde is the firm that issued the new shares.",
      ],
      answer: 1,
      solution: `<p>Once the deal is signed, a cash price no longer depends on S: Vik's holders keep P − T and Lunde's holders absorb the whole shortfall. With shares Vik's holders own y of the merged firm, so a shortfall lowers P<sub>new</sub> and they lose y of it, while Lunde's holders lose 1 − y.</p><p>So <b>with shares Vik's holders bear y of the shortfall; with cash Lunde's holders bear all of it</b>. If Lunde ends up overpaying, the same mechanism makes Vik's actual premium smaller than the offered one.</p>`,
      check: `<p>Run the example: a shortfall of 48 lowered NPV<sub>A</sub> by 48 with cash and by 36 with shares, while NPV<sub>T</sub> fell by 0 with cash and by 12 = 0.25 × 48 with shares ✓ The two NPVs summed to S in all four cases, so that identity cannot tell the methods apart.</p>`,
      traps: [
        "Backwards. The cash price is fixed once the deal is signed, so Vik's holders keep their premium whatever S turns out to be.",
        null,
        "NPV<sub>A</sub> + NPV<sub>T</sub> = S holds for any split. It says nothing about who absorbs a change in S.",
        "Issuing the shares does not make Lunde carry the loss alone: Vik's holders own y of the merged firm and lose with it.",
      ],
    },
    {
      id: "d3-aksjebytte-4",
      title: "The highest exchange ratio the acquirer can offer",
      theory: `<p>A higher ER gives more of the merged firm to the target, so NPV<sub>A</sub> falls as ER rises. The acquirer breaks even when it hands over the target's whole value plus all the synergies. That caps the number of new shares and so the ratio. With cash the same cap is a price of T + S.</p>
<div class="formula"><div class="eq">x<sub>max</sub> = N<sub>A</sub>(T + S)/A</div><div class="eq">ER<sub>max</sub> = x<sub>max</sub>/N<sub>T</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T)</div>
<div class="where">The bound [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) is on the formula sheet. Use pre-announcement prices: later prices already contain part of S. At ER<sub>max</sub>, P<sub>new</sub> = P<sub>A</sub> and the target takes all of S. The target's floor, ER<sub>min</sub> = [T/(A + S)] × (N<sub>A</sub>/N<sub>T</sub>), is not on the sheet.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Without synergies the most the acquirer can pay is the price ratio P<sub>T</sub>/P<sub>A</sub>, a fair swap. Synergies let it pay more, in proportion to how large they are relative to the target. Beyond that point each extra share moves value from the acquirer's holders to the target's.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 20 million at 40 NOK, N<sub>T</sub> = 10 million at 30 NOK and S = 100 million, so A = 800 and T = 300.</p><p>ER<sub>max</sub> = (400/800) × (20/10) = 1.00. By the last form: (30/40)(1 + 100/300) = 0.75 × 1.3333 = 1.00. The highest cash price is T + S = 400, or 40 NOK per share.</p></div>`,
      q: `<p>Haugland ASA (60 million shares) wants to buy Sætre AS (18 million shares) in a stock swap. Before any news Haugland traded at 55 NOK and Sætre at 36 NOK. After rumours of the deal they trade at 54 and 44. The synergies are worth 270 million NOK. What is the highest exchange ratio Haugland can offer before its shareholders lose? Give four decimals.</p>`,
      options: ["0.9273", "0.6545", "1.0926", "0.6050"],
      answer: 0,
      solution: `<p>Use the pre-announcement prices. A = 60 × 55 = 3 300 and T = 18 × 36 = 648.</p><p>ER<sub>max</sub> = [(648 + 270)/3 300] × (60/18) = 0.278182 × 3.333333 = <b>0.9273</b>.</p><p>Last form: (36/55)(1 + 270/648) = 0.654545 × 1.416667 = 0.9273.</p>`,
      check: `<p>At ER = 0.927273, x = 0.927273 × 18 = 16.6909 million and P<sub>new</sub> = (3 300 + 648 + 270)/(60 + 16.6909) = 4 218/76.6909 = 55.00 = P<sub>A</sub> ✓ Backwards: the least synergy that justifies a ratio is S = x × P<sub>A</sub> − T: 16.6909 × 55 − 648 = 270 ✓</p>`,
      traps: [
        null,
        "Left out the synergies: 36/55 = 0.6545. That is a swap with no premium at all.",
        "Used the prices after the rumours, which already contain part of S: (44 + 270/18)/54 = 1.0926.",
        "Gave the target's floor instead: ER<sub>min</sub> = [648/(3 300 + 270)] × (60/18) = 0.6050.",
      ],
    },
    {
      id: "d3-aksjebytte-5",
      title: "Exam level: cash or shares when the synergies disappoint",
      theory: `<p>Exam versions price both offers, then change S and ask who carries the change. Work in a fixed order: stand-alone values, the cash premium P − T, then x and y, then both NPVs with the S the question gives. P − T and y are fixed when the deal is signed; only S moves. A second mechanism earns points in the same exercise: a manager who believes the firm's shares are overvalued prefers to pay with them, so the market reads a stock offer as a sign of overvaluation and the acquirer's price falls.</p>
<div class="formula"><div class="eq">cash: NPV<sub>A</sub> = S − (P − T) &nbsp;&nbsp; stock: NPV<sub>A</sub> = (1 − y)(A + T + S) − A</div>
<div class="where">Use the S that actually materialises. Value the new shares in the merged firm, never at the acquirer's old price.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Paying in stock is buying the target with a currency whose value depends on the deal itself. If the deal disappoints, the currency is worth less, so the target pays part of the bill.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A = 500 (10 million shares at 50) and T = 200 (8 million at 25). Offers: 30 NOK in cash or ER = 0.6. Expected S = 100; it turns out to be 20.</p><p>Cash: P = 240, premium 40, NPV<sub>A</sub> = 20 − 40 = −20. Stock: x = 4.8, y = 4.8/14.8 = 0.324324, NPV<sub>A</sub> = 0.675676 × 720 − 500 = 486.49 − 500 = −13.51.</p></div>`,
      q: `<p>Rødberg ASA has 40 million shares at 90 NOK and Solvang AS 16 million shares at 45 NOK, both stand-alone values. Rødberg expects synergies of 240 million NOK and can pay either 57 NOK in cash per Solvang share or 0.62 new Rødberg shares per Solvang share. Rødberg pays in shares. After closing, the synergies turn out to be only 60 million NOK. What is the NPV of the deal for Rødberg's shareholders?</p>`,
      options: ["−132.00 million", "53.85 million", "−90.38 million", "−112.80 million"],
      answer: 2,
      solution: `<p>A = 40 × 90 = 3 600 and T = 16 × 45 = 720.</p><p>x = 0.62 × 16 = 9.92 million, so N<sub>A</sub> + x = 49.92 and y = 9.92/49.92 = 0.198718.</p><p>With S = 60 the merged firm is worth 3 600 + 720 + 60 = 4 380.</p><p>NPV<sub>A</sub> = (1 − 0.198718) × 4 380 − 3 600 = 3 509.62 − 3 600 = <b>−90.38 million</b>.</p><p>The shortfall of 180 cost Rødberg's holders the full 180 with cash (48 → −132) but only 0.801282 × 180 = 144.23 with shares (53.85 → −90.38). Solvang's holders carried the other 35.77.</p>`,
      check: `<p>Price route: P<sub>new</sub> = 4 380/49.92 = 87.7404, so NPV<sub>A</sub> = 40 × (87.7404 − 90) = −90.38 ✓ This route never uses y, so it would catch a wrong y. Solvang's side: 0.198718 × 4 380 − 720 = 150.38. Then −90.38 + 150.38 = 60 = S, an identity that catches slips only.</p>`,
      traps: [
        "Gave the NPV of the cash offer: 60 − (912 − 720) = −132.00 million. Rødberg paid in shares.",
        "Used the expected synergies of 240: 0.801282 × 4 560 − 3 600 = 53.85 million. The question gives the realised 60.",
        null,
        "Valued the new shares at Rødberg's old price, as if they were cash: 60 − (9.92 × 90 − 720) = 60 − 172.80 = −112.80 million. Solvang's holders get a slice of a firm whose price has fallen.",
      ],
    },
    {
      id: "d3-aksjebytte-6",
      title: "Exam level: a bidding war decided by the alternatives",
      theory: `<p>Kurbatov said the lecture's bidding contest for bank D "could be easily the exam question". When the target will be sold to someone anyway, a bidder does not compare winning with its stand-alone value. It compares winning with losing to a rival, which can leave it worse off than today, for example because the rival becomes a stronger competitor. In an ascending auction the bidder with the highest reservation price wins and pays just above the second highest.</p>
<div class="formula"><div class="eq">reservation price = V(you win) − V(a rival wins)</div><div class="eq">price paid ≈ the second-highest reservation price</div>
<div class="where">V is the bidder's value before it pays anything. If a rival's win does not hurt you, V(a rival wins) is your stand-alone value and the ceiling is your gain from the target. The winner can end below its value before the contest and still be glad it won.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Fear of a rival is worth money. The bidder with the most to lose from someone else's win bids highest, even when every bidder gets the same synergies. Competition can then hand the target more than the whole value the deal creates.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kystbank and Fjellbank bid for Dalbank, worth 40 alone. Kystbank is worth 100 alone, 170 if it wins and 88 if Fjellbank wins. Fjellbank is worth 80 alone, 150 if it wins and 72 if Kystbank wins.</p><p>Both gain 70 over stand-alone. Ceilings: Kystbank 170 − 88 = 82, Fjellbank 150 − 72 = 78. Kystbank wins at about 78 and ends at 170 − 78 = 92: below its 100 before the contest, above the 88 it would have had if it lost.</p></div>`,
      q: `<p>Nordbank, Vestbank and Sørbank bid for Elvebank, which is worth 50 on its own and will be sold to one of them. The table gives each bidder's value before it pays anything.</p>
<table class="data"><tr><th>Bidder</th><th>Alone</th><th>If it wins Elvebank</th><th>If a rival wins</th></tr>
<tr><td>Nordbank</td><td class="n">120</td><td class="n">200</td><td class="n">110</td></tr>
<tr><td>Vestbank</td><td class="n">100</td><td class="n">180</td><td class="n">85</td></tr>
<tr><td>Sørbank</td><td class="n">90</td><td class="n">170</td><td class="n">72</td></tr></table>
<p>In an ascending auction, who wins and at about what price? How does the winner end up compared with before the contest?</p>`,
      options: [
        "Sørbank wins at about 95 and ends below its value before the contest.",
        "Sørbank wins at about 98 and ends exactly at its value if a rival had won.",
        "No bank bids above its gain of 80 over stand-alone, so Elvebank sells for about 80.",
        "Nordbank wins at about 95, since it is worth the most once it owns Elvebank.",
      ],
      answer: 0,
      solution: `<p>Reservation prices, value if it wins minus value if a rival wins: Nordbank 200 − 110 = 90, Vestbank 180 − 85 = 95, Sørbank 170 − 72 = 98. Every bank gains the same 80 over its stand-alone value, so the ranking comes only from what each loses if a rival wins: 10, 15 and 18.</p><p>Nordbank drops out at 90 and Vestbank at 95, so <b>Sørbank wins at about 95</b>. It ends at 170 − 95 = 75, below its 90 before the contest but above the 72 it would be worth if it lost.</p>`,
      check: `<p>Value before the contest: 120 + 100 + 90 + 50 = 360. After Sørbank's win, before the price is paid: 110 + 85 + 170 = 365, so the deal creates 5. Split at a price of 95: Elvebank's holders +45, Sørbank −15, Nordbank −10, Vestbank −15. Sum +5 ✓ The target takes far more than the whole gain, the same pattern as in Kurbatov's bank D example.</p>`,
      traps: [
        null,
        "The winner pays just above the second-highest ceiling, Vestbank's 95, not its own 98. At 98 Sørbank would end at 72, no better than losing.",
        "Compared winning with stand-alone value. Every bank gains 80, but losing to a rival costs each of them more, so all bid above 80.",
        "Ranked by value with the target. What matters is each bidder's ceiling. Nordbank's 200 − 110 = 90 is the lowest.",
      ],
    },
  ],
});

/* sjanger 112 · d3-deal · The market's implied deal probability (kort stige, del 3) */
window.EDU_DATA.sjangre.push({
  id: "d3-deal",
  num: 112,
  title: "The market's implied deal probability",
  summary: "The long-short position, the probability the prices imply, the self-financed version, months to completion and the synergies the market prices in",
  chapters: [26],
  exam: "H2025 E6, 12 of its 20 points · Vodafone-Mannesmann flagged for 2026",
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  intro: `<p>H2025 Exercise 6 gave 12 of its 20 points to one number: the probability the market assigns to a deal closing, backed out of four share prices and a risk-free rate. Kurbatov called it "almost a direct copy" of the lecture's Vodafone-Mannesmann example, so expect a variant: another deadline, the self-financed position or the synergies the prices imply. This ladder builds the long-short position, solves for p, adds the months and ends with the comment on your assumptions and the synergies the market prices in.</p>`,
  steps: [
    {
      id: "d3-deal-1",
      title: "The long-short position and its two payoffs",
      theory: `<p>After a stock offer is announced, the target trades below what the offer is worth, because the deal may fail. To read that risk off prices, build a position whose payoff you know in both outcomes. For an offer of "k B shares for m A shares", where A is the acquirer and B the target: buy k B shares, short m A shares and put the short-sale proceeds in the risk-free asset. If the deal completes, the k B shares convert into exactly the m A shares you owe, so the stock legs cancel and only the deposit is left. If it fails, you unwind at the prices that then hold.</p>
<div class="formula"><div class="eq">payoff if the deal completes = m × P<sub>A,1</sub> × (1 + r<sub>f</sub>)</div><div class="eq">payoff if it fails = m × P<sub>A,1</sub> × (1 + r<sub>f</sub>) + k × P<sub>B,0</sub> − m × P<sub>A,0</sub></div>
<div class="where">P<sub>A,0</sub> and P<sub>B,0</sub> are the pre-announcement prices, P<sub>A,1</sub> and P<sub>B,1</sub> the prices just after. The position costs k × P<sub>B,1</sub> today. The failure branch uses the 0 prices when the question says prices return to their original levels.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Whatever A's share is worth on completion, you receive it and hand it straight back. That cancels everything about the two businesses and leaves a bet on one event: does the deal go through?</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>1 A share for 2 B shares, decided in one year. Before: P<sub>A,0</sub> = 60 and P<sub>B,0</sub> = 25. After: P<sub>A,1</sub> = 58 and P<sub>B,1</sub> = 28. r<sub>f</sub> = 5%.</p><p>Buy 2 B for 56, short 1 A for 58 and deposit the 58. Cost today: 56. Completes: 58 × 1.05 = 60.90. Fails: 60.90 + 2 × 25 − 60 = 50.90.</p></div>`,
      q: `<p>Lyngvær ASA (A) has bid for Strand AS (B). If the deal completes in one year, 5 Strand shares are exchanged for 2 Lyngvær shares. If it fails, both prices return to their pre-announcement levels. Before the bid P<sub>A,0</sub> = 75 and P<sub>B,0</sub> = 26; now P<sub>A,1</sub> = 72 and P<sub>B,1</sub> = 28.20. r<sub>f</sub> = 4%. You buy 5 Strand shares, short 2 Lyngvær shares and deposit the proceeds at r<sub>f</sub>. What are your payoffs in one year if the deal completes and if it fails?</p>`,
      options: ["144.00 and 124.00", "149.76 and 129.76", "149.76 and 146.76", "374.40 and 51.40"],
      answer: 1,
      solution: `<p>Short 2 Lyngvær at 72: 144 into the deposit, which grows to 144 × 1.04 = 149.76.</p><p>Completes: the 5 Strand shares become the 2 Lyngvær shares you owe, so you keep <b>149.76</b>.</p><p>Fails: sell 5 Strand at 26 for 130 and buy back 2 Lyngvær at 75 for 150: 149.76 + 130 − 150 = <b>129.76</b>.</p>`,
      check: `<p>The gap between the payoffs is the pre-announcement spread: 2 × 75 − 5 × 26 = 20 = 149.76 − 129.76 ✓ You are short that spread. It closes to 0 if the deal completes and opens back to 20 if it fails. The position costs 5 × 28.20 = 141.00 today, between the two payoffs discounted at 4%, 124.77 and 144.00, as it must.</p>`,
      traps: [
        "Forgot the interest on the deposit: 144.00 and 144 + 130 − 150 = 124.00.",
        null,
        "Unwound at the post-announcement prices in the failure branch: 149.76 + 5 × 28.20 − 2 × 72 = 146.76. The question says prices return to 75 and 26.",
        "Turned the ratio upside down: shorted 5 Lyngvær for 360 and bought 2 Strand, so 360 × 1.04 = 374.40 and 374.40 + 2 × 26 − 5 × 75 = 51.40.",
      ],
    },
    {
      id: "d3-deal-2",
      title: "The implied probability from today's prices",
      theory: `<p>The position's only risk is whether the deal closes. That risk comes from a regulator or a shareholder vote. It is diversifiable, so it carries no risk premium. The position's expected payoff must then equal its cost grown at r<sub>f</sub>, the certainty equivalent. Solve for p. The H2025 key singles out the error of setting the expected payoff equal to the cost itself.</p>
<div class="formula"><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">shortcut: 1 − p = (1 + r<sub>f</sub>) × spread<sup>post</sup>/spread<sup>pre</sup> &nbsp;&nbsp; spread = m × P<sub>A</sub> − k × P<sub>B</sub></div>
<div class="where">spread<sup>pre</sup> uses the pre-announcement prices, spread<sup>post</sup> today's. Show the first line on the exam; use the second as a check. Because you discount at r<sub>f</sub>, p is a risk-neutral probability.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The spread is a bet on failure. It closes to zero if the deal completes and returns to its old width if it fails. The narrower it is today compared with that old width, the surer the market is that the deal will close.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: cost 56, payoffs 60.90 and 50.90, r<sub>f</sub> = 5%.</p><p>56 × 1.05 = 58.80 = p × 60.90 + (1 − p) × 50.90, so p = (58.80 − 50.90)/(60.90 − 50.90) = 7.90/10 = 0.7900.</p><p>Shortcut: spread<sup>pre</sup> = 60 − 50 = 10 and spread<sup>post</sup> = 58 − 56 = 2. 1 − p = 1.05 × 2/10 = 0.21 ✓</p></div>`,
      q: `<p>Fonnes ASA (A) has bid for Hamre AS (B): 3 Fonnes shares for every 4 Hamre shares, completing or failing in exactly one year. If it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 48 and P<sub>B,0</sub> = 30. Now: P<sub>A,1</sub> = 47 and P<sub>B,1</sub> = 34. r<sub>f</sub> = 3%. What probability does the market assign to completion? Give four decimals.</p>`,
      options: ["0.7854", "0.6154", "0.9562", "0.7917"],
      answer: 0,
      solution: `<p>Buy 4 Hamre for 4 × 34 = 136, short 3 Fonnes for 3 × 47 = 141 and deposit the 141. Cost today: 136.</p><p>Completes: 141 × 1.03 = 145.23. Fails: 145.23 + 4 × 30 − 3 × 48 = 145.23 + 120 − 144 = 121.23.</p><p>Certainty equivalent: 136 × 1.03 = 140.08.</p><p>p = (140.08 − 121.23)/(145.23 − 121.23) = 18.85/24 = <b>0.7854</b>.</p>`,
      check: `<p>Spread route: spread<sup>pre</sup> = 144 − 120 = 24 and spread<sup>post</sup> = 141 − 136 = 5. 1 − p = 1.03 × 5/24 = 0.214583, so p = 0.785417 ✓ Hamre at 34 also sits below the 0.75 × 47 = 35.25 it would fetch if completion were certain.</p>`,
      traps: [
        null,
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (136 − 121.23)/24 = 0.6154.",
        "Priced Hamre alone, as if it converts into Fonnes at today's 47: 34 × 1.03 = p × 35.25 + (1 − p) × 30 gives 0.9562. Fonnes' price on completion is unknown; the short hedges it out.",
        "Left out the risk-free rate altogether: 1 − 5/24 = 0.7917.",
      ],
    },
    {
      id: "d3-deal-3",
      title: "Kurbatov's self-financed version gives the same p",
      theory: `<p>Kurbatov suggested a variant in class: short first and pay for the target out of the proceeds. Short m A shares, buy k B shares with part of the money and deposit the rest, which is today's spread. The position costs nothing. If the deal completes, the stock legs cancel and you keep the deposit grown at r<sub>f</sub>. If it fails, you unwind at the old prices and lose money. A position that costs 0 must have a risk-neutral expected payoff of 0.</p>
<div class="formula"><div class="eq">deposit = m × P<sub>A,1</sub> − k × P<sub>B,1</sub> = spread<sup>post</sup></div><div class="eq">0 = p × deposit × (1 + r<sub>f</sub>) + (1 − p) × [deposit × (1 + r<sub>f</sub>) + k × P<sub>B,0</sub> − m × P<sub>A,0</sub>]</div>
<div class="where">The failure payoff is negative: the deposit is smaller than the cost of closing the short. In Kurbatov's words, "you should arrive at the same number".</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The self-financed position is the standard one with your own money taken out. That lowers both payoffs by the same risk-free amount, so it cannot change which probability makes the price fair.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The deal from the first example: short 1 A for 58, buy 2 B for 56 and deposit 2. Completes: 2 × 1.05 = 2.10. Fails: 2.10 + 2 × 25 − 60 = −7.90.</p><p>0 = p × 2.10 + (1 − p) × (−7.90), so p = 7.90/(2.10 + 7.90) = 0.7900, as before.</p></div>`,
      q: `<p>Bølstad ASA (A) has bid for Kroken AS (B): 1 Bølstad share for every 3 Kroken shares, completing or failing in one year. If it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 90 and P<sub>B,0</sub> = 24. Now: P<sub>A,1</sub> = 87 and P<sub>B,1</sub> = 27.50. r<sub>f</sub> = 5%. You short 1 Bølstad share, buy 3 Kroken shares with the proceeds and deposit the rest at r<sub>f</sub>. What probability of completion does this position imply?</p>`,
      options: ["0.7500", "0.9875", "0.7375", "0.7921"],
      answer: 2,
      solution: `<p>Short 1 Bølstad: +87. Buy 3 Kroken: −82.50. Deposit the remaining 4.50. Cost today: 0.</p><p>Completes: 4.50 × 1.05 = 4.725. Fails: 4.725 + 3 × 24 − 90 = 4.725 + 72 − 90 = −13.275.</p><p>0 = p × 4.725 + (1 − p) × (−13.275), so p = 13.275/(4.725 + 13.275) = 13.275/18 = <b>0.7375</b>.</p>`,
      check: `<p>Standard position: cost 82.50, payoffs 87 × 1.05 = 91.35 and 91.35 + 72 − 90 = 73.35, certainty equivalent 82.50 × 1.05 = 86.625. p = (86.625 − 73.35)/(91.35 − 73.35) = 13.275/18 = 0.7375 ✓ Both standard payoffs are exactly 86.625 higher than the self-financed ones: the money you put in, grown at r<sub>f</sub>.</p>`,
      traps: [
        "Forgot to grow the deposit: 0 = p × 4.50 + (1 − p) × (−13.50) gives 0.7500, the same as leaving r<sub>f</sub> out altogether.",
        "Treated the 4.50 deposit as the position's cost: 4.50 = p × 4.725 + (1 − p) × (−13.275) gives 0.9875. The deposit comes from the short sale, so the cost is 0.",
        null,
        "Left the deposit out of the failure payoff: 0 = p × 4.725 + (1 − p) × (−18) gives 0.7921. The deposit is yours in both outcomes.",
      ],
    },
    {
      id: "d3-deal-4",
      title: "When the deal is decided in a few months",
      theory: `<p>Real deals are decided in months, not in exactly one year. The position is then held only until the decision, so both the deposit and the cost grow at (1 + r<sub>f</sub>)<sup>t</sup>, with t the time in years: 0.25 for three months, 4/12 for four. Nothing else changes. Kurbatov's Vodafone-Mannesmann example had three months to go. With a cash offer you need no short at all: the target alone is the position, worth the cash price if the deal completes and P<sub>B,0</sub> if it fails.</p>
<div class="formula"><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>)<sup>t</sup> = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">1 − p = (1 + r<sub>f</sub>)<sup>t</sup> × spread<sup>post</sup>/spread<sup>pre</sup></div>
<div class="where">r<sub>f</sub> is the annual rate. Grow both sides for the same t: the deposit inside both payoffs and the cost on the left. For a cash offer: P<sub>B,1</sub>(1 + r<sub>f</sub>)<sup>t</sup> = p × cash price + (1 − p) × P<sub>B,0</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The position only has to earn the risk-free rate for the months it is held. Growing it for a full year asks too much of it, which inflates the failure probability and understates p.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>2 A shares for each B share, decided in 6 months. Before: P<sub>A,0</sub> = 20 and P<sub>B,0</sub> = 30. After: P<sub>A,1</sub> = 19.50 and P<sub>B,1</sub> = 36. r<sub>f</sub> = 6%, so 1.06<sup>0.5</sup> = 1.029563.</p><p>Buy 1 B for 36, short 2 A for 39. Completes: 39 × 1.029563 = 40.1530. Fails: 40.1530 + 30 − 40 = 30.1530. Certainty equivalent: 36 × 1.029563 = 37.0643. p = (37.0643 − 30.1530)/10 = 0.6911.</p></div>`,
      q: `<p>Engen ASA (A) has bid for Vikan AS (B): 5 Engen shares for every 2 Vikan shares. The deal completes or fails in exactly 4 months; if it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 16 and P<sub>B,0</sub> = 34. Now: P<sub>A,1</sub> = 15.60 and P<sub>B,1</sub> = 37.20. The risk-free rate is 4.5% a year. What probability does the market assign to completion? Give four decimals.</p>`,
      options: ["0.6865", "0.6039", "0.7000", "0.6956"],
      answer: 3,
      solution: `<p>Growth factor: 1.045<sup>4/12</sup> = 1.014781.</p><p>Buy 2 Vikan for 74.40, short 5 Engen for 78 and deposit the 78. Completes: 78 × 1.014781 = 79.1529. Fails: 79.1529 + 2 × 34 − 5 × 16 = 79.1529 + 68 − 80 = 67.1529.</p><p>Certainty equivalent: 74.40 × 1.014781 = 75.4997.</p><p>p = (75.4997 − 67.1529)/(79.1529 − 67.1529) = 8.3468/12 = <b>0.6956</b>.</p>`,
      check: `<p>Spread route: spread<sup>pre</sup> = 80 − 68 = 12 and spread<sup>post</sup> = 78 − 74.40 = 3.60. 1 − p = 1.014781 × 3.60/12 = 0.304434, so p = 0.695566 ✓ Vikan at 37.20 sits below the 2.5 × 15.60 = 39.00 it would fetch on certain completion.</p>`,
      traps: [
        "Grew the position for a full year: 1 − 1.045 × 3.60/12 = 0.6865. The deal is decided in 4 months.",
        "Set the expected payoff equal to the cost, not the cost grown for 4 months: (74.40 − 67.1529)/12 = 0.6039.",
        "Left out the risk-free rate altogether: 1 − 3.60/12 = 0.7000.",
        null,
      ],
    },
    {
      id: "d3-deal-5",
      title: "The assumptions behind p and what breaks them",
      theory: `<p>Questions on the deal probability often end with "comment". These are the assumptions Kurbatov listed:</p>
<ul><li>if the deal fails, prices return exactly to their pre-announcement levels (in Kurbatov's words "extremely strong")</li><li>nothing else happens to the two firms before the decision</li><li>short selling is allowed and the proceeds earn r<sub>f</sub></li><li>r<sub>f</sub> is known and the market prices consistently, with no obvious arbitrage</li></ul>
<p>p is a risk-neutral probability. It equals the market's real belief only if deal risk carries no risk premium. Know which way each broken assumption pushes p.</p>
<div class="formula"><div class="eq">p = [cost × (1 + r<sub>f</sub>)<sup>t</sup> − payoff if fails]/(payoff if completes − payoff if fails)</div>
<div class="where">A higher failure payoff lowers p. A required return above r<sub>f</sub> on the position puts the real probability above the risk-neutral p.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Today's price blends the two outcomes. If failure is less bad than you assumed, less weight on completion is needed to explain the same price, so your p was too high.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The first example gave p = 0.7900 with B back at 25 if the deal fails. Suppose the bid revealed that B is worth more, so it would settle at 26. The failure payoff rises from 50.90 to 60.90 + 52 − 60 = 52.90 and p = (58.80 − 52.90)/(60.90 − 52.90) = 0.7375.</p><p>If instead arbitrageurs demand 7% on the position rather than 5%: 56 × 1.07 = 59.92 and the real probability is (59.92 − 50.90)/10 = 0.9020.</p></div>`,
      q: `<p>An exam question has you compute the market's probability that a stock deal completes, using the long-short position and assuming that prices return to their pre-announcement levels if it fails. It ends with "comment on your result". Which comment is right?</p>`,
      options: [
        "If the bid revealed that the target is worth more, it will not fall all the way back on failure, so p is overstated.",
        "If deal risk carries a risk premium, the market's real probability of completion is lower than the p you computed.",
        "The result relies on known synergies, since the position's payoff if the deal completes depends on them.",
        "Short selling is not needed: buying the target alone and valuing it at today's acquirer price gives the same p.",
      ],
      answer: 0,
      solution: `<p>A higher failure payoff means less probability on completion is needed to explain today's price. If the target settles above its old price when the deal dies, the true failure payoff is higher than the one you used, so <b>the p computed with full reversion is too high</b>.</p><p>A risk premium works the other way: the real probability is above the risk-neutral p. The synergies never enter: on completion the stock legs cancel and only the deposit is left. Buying the target alone leaves you exposed to the acquirer's price on completion, which is unknown today.</p>`,
      check: `<p>Run the example: with the target at 26 rather than 25 on failure, p fell from 0.7900 to 0.7375 ✓ With a 7% required return instead of 5%, the probability rose to 0.9020, above 0.7900 ✓</p>`,
      traps: [
        null,
        "Backwards. A risk premium means the position must earn more than r<sub>f</sub>, which needs more weight on the good outcome: the real probability is higher than p.",
        "The synergies cancel out of the position: on completion the stock legs offset each other and only the deposit is left.",
        "Buying the target alone leaves you exposed to the acquirer's unknown price on completion. The short hedges that price out.",
      ],
    },
    {
      id: "d3-deal-6",
      title: "Exam level: from the deal probability to the synergies the market prices in",
      theory: `<p>Kurbatov called Vodafone's bid for Mannesmann one of the biggest exercises to focus on. The full chain: the long-short position, p with the months, then what the market believes about synergies. On completion the merged firm is worth the two stand-alone values plus S; on failure the two firms fall back to their stand-alone values. Today's combined market value is the p-weighted blend of the two, discounted at r<sub>f</sub>. Solve for S.</p>
<div class="formula"><div class="eq">(N<sub>A</sub>P<sub>A,1</sub> + N<sub>B</sub>P<sub>B,1</sub>) × (1 + r<sub>f</sub>)<sup>t</sup> = (N<sub>A</sub>P<sub>A,0</sub> + N<sub>B</sub>P<sub>B,0</sub>) + p × S</div>
<div class="where">S is valued at the decision date. Second route: price A alone, P<sub>A,1</sub>(1 + r<sub>f</sub>)<sup>t</sup> = p × P<sub>A</sub><sup>complete</sup> + (1 − p) × P<sub>A,0</sub>, then S = (N<sub>A</sub> + ER × N<sub>B</sub>) × P<sub>A</sub><sup>complete</sup> − (N<sub>A</sub>P<sub>A,0</sub> + N<sub>B</sub>P<sub>B,0</sub>). The two routes must agree.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The jump in combined market value is not the synergy. It is the synergy weighted by the chance that the deal closes and discounted for the wait. Undo both and you get what the market expects S to be if the deal goes through.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>4 A shares per B share, decided in 6 months, r<sub>f</sub> = 4%: 1.04<sup>0.5</sup> = 1.019804. N<sub>A</sub> = 200 million and N<sub>B</sub> = 30 million. Before: P<sub>A,0</sub> = 25 and P<sub>B,0</sub> = 80. After: P<sub>A,1</sub> = 26 and P<sub>B,1</sub> = 96.</p><p>Per B share: spread<sup>pre</sup> = 100 − 80 = 20 and spread<sup>post</sup> = 104 − 96 = 8, so 1 − p = 1.019804 × 8/20 = 0.407922 and p = 0.592078.</p><p>Combined value: 200 × 25 + 30 × 80 = 7 400 before and 200 × 26 + 30 × 96 = 8 080 after. S = (8 080 × 1.019804 − 7 400)/0.592078 = 840.02/0.592078 = 1 418.76 million.</p></div>`,
      q: `<p>Brattvåg ASA (A, 600 million shares) has bid for Langøy ASA (B, 40 million shares): 12.5 Brattvåg shares for each Langøy share. The deal completes or fails in exactly 3 months; if it fails, both prices return to their pre-announcement levels, which reflect stand-alone values. Before: P<sub>A,0</sub> = 8.00 and P<sub>B,0</sub> = 85. Just after: P<sub>A,1</sub> = 8.40 and P<sub>B,1</sub> = 98. The risk-free rate is 5% a year. What synergies, in million NOK and valued at the decision date, does the market price in?</p>`,
      options: ["760.00", "869.96", "2 368.63", "1 648.88"],
      answer: 3,
      solution: `<p><b>1. p.</b> 1.05<sup>0.25</sup> = 1.012272. Buy 1 Langøy for 98, short 12.5 Brattvåg for 105 and deposit the 105. Completes: 105 × 1.012272 = 106.2886. Fails: 106.2886 + 85 − 12.5 × 8 = 91.2886. Certainty equivalent: 98 × 1.012272 = 99.2027. p = (99.2027 − 91.2886)/15 = 7.9141/15 = 0.5276.</p><p><b>2. Combined value.</b> Before: 600 × 8 + 40 × 85 = 4 800 + 3 400 = 8 200. Now: 600 × 8.40 + 40 × 98 = 5 040 + 3 920 = 8 960.</p><p><b>3. S.</b> 8 960 × 1.012272 = 9 069.96, so p × S = 9 069.96 − 8 200 = 869.96 and S = 869.96/0.527606 = <b>1 648.88</b> million.</p>`,
      check: `<p>Second route, through Brattvåg's price: 8.40 × 1.012272 = 8.503087 = 0.527606 × P<sub>A</sub><sup>complete</sup> + 0.472394 × 8, so P<sub>A</sub><sup>complete</sup> = (8.503087 − 3.779150)/0.527606 = 8.953527. The merged firm has 600 + 12.5 × 40 = 1 100 million shares: 1 100 × 8.953527 − 8 200 = 9 848.88 − 8 200 = 1 648.88 ✓ Both routes use the same p and prices, so they confirm the arithmetic, not the model. The split: Brattvåg's holders gain 600 × (8.953527 − 8) = 572.12 and Langøy's 40 × (12.5 × 8.953527 − 85) = 40 × 26.9191 = 1 076.76, about 65% of S.</p>`,
      traps: [
        "Took the change in combined market value: 8 960 − 8 200 = 760.00. Today's prices weight the deal by p and discount it.",
        "Forgot to divide by p: 9 069.96 − 8 200 = 869.96. That is p × S, the synergy weighted by the chance that the deal closes.",
        "Grew everything for a full year: p = 1 − 1.05 × 7/15 = 0.5100 and S = (8 960 × 1.05 − 8 200)/0.51 = 2 368.63.",
        null,
      ],
    },
  ],
});

/* sjanger 113 · d3-overvaking · Monitoring the CEO: who and with what */
window.EDU_DATA.sjangre.push({
  id: "d3-overvaking",
  num: 113,
  seksjon: "del3",
  emne: "Governance",
  symboler: "governance",
  title: "Monitoring the CEO: who and with what",
  summary: "The agency problem and its names, the board, the monitors outside the boardroom, the cost of monitoring too hard, ending with H2024 Exercise 2",
  chapters: [27],
  exam: "H2024 E2 (12 points, verbal) · Mock exams 1, 6 and 11, E2",
  intro: `<p>Governance is "pretty much always" one of the two theory questions (Kurbatov), about 10 points with no calculations. H2024 Exercise 2 asked for two distinct ways to monitor the CEO: who monitors and with which tools, at most 3–4 sentences each. Per method the grader looks for a named monitor and a named tool. The ladder gives you the agency problem, the board, the monitors outside the boardroom and the cost of monitoring too hard. It ends by grading answers to the H2024 question.</p>`,
  steps: [
    {
      id: "d3-overvaking-1",
      title: "The agency problem: what the CEO does when nobody watches",
      theory: `<p>In a listed firm the owners and the people who run it are different people. The CEO bears the full cost of effort but keeps only a small share of the value it creates, while perks cost the CEO almost nothing. Kurbatov's names for what that gap produces (lecture 1):</p>
<ul><li><b>Empire building</b>: acquisitions and projects that make the firm bigger, not more valuable.</li><li><b>Shirking</b>: low effort, too many outside activities.</li><li><b>Entrenchment</b>: making yourself hard to replace, including manipulating reports so that problems stay hidden.</li><li><b>Private benefits</b>: perks paid for by the firm, insider trading.</li></ul>
<p><b>Monitoring</b> means that someone watches the CEO and can act on what they see. Small shareholders rarely do it: each would bear the full cost and get only a sliver of the gain (the free-rider problem).</p>
<div class="callout tip"><span class="h">Intuition</span><p>A CEO with 0.5% of the shares pays the whole cost of a hard decision and gets half a per cent of its value. A perk that costs the firm 10 costs the CEO 0.05. Without a monitor the cheap choice wins.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO moves a loss-making division's results into a footnote and pushes through a rule that removing a director needs 80% of the votes. Both make the CEO harder to replace: <b>entrenchment</b>. The agency cost is the value lost because a weak CEO stays, not what the CEO earns by staying.</p></div>`,
      q: `<p>Sørvik ASA's CEO owns 0.3% of the shares. Over two years the CEO (i) moved the head office into a tower with a private gym and a chef, (ii) bought a ski resort and a regional airline while the share price fell on each announcement and (iii) now leaves most days at two to sit on outside boards. Which matching of behaviour and name is right?</p>`,
      options: [
        "(i) empire building, (ii) private benefits, (iii) shirking",
        "(i) private benefits, (ii) entrenchment, (iii) shirking",
        "(i) shirking, (ii) empire building, (iii) private benefits",
        "(i) private benefits, (ii) empire building, (iii) shirking",
      ],
      answer: 3,
      solution: `<p>(i) A tower with a gym and a chef is consumption paid for by the firm: <b>private benefits</b>. (ii) Buying unrelated businesses while the market marks the price down each time makes the firm bigger and less valuable: <b>empire building</b>. (iii) Little time for the firm because of outside activities: <b>shirking</b>. Nothing in the case protects the CEO's job, so entrenchment does not fit.</p>`,
      check: `<p>Ask what the CEO gets from each: (i) comfort, (ii) size and status, (iii) time. Comfort is a private benefit, size is the empire and time taken from the job is shirking ✓. Entrenchment would show up as defences or hidden information, which the case does not mention.</p>`,
      traps: [
        "Swapped (i) and (ii). A luxury office is consumption, a private benefit; buying businesses that lower the share price is empire building.",
        "Nothing in (ii) makes the CEO harder to replace. Value-destroying acquisitions that grow the firm are empire building.",
        "Swapped (i) and (iii). Outside board seats that take the CEO's time are shirking; a firm-paid tower with a chef is a private benefit.",
        null,
      ],
    },
    {
      id: "d3-overvaking-2",
      title: "The board: the monitor that can fire the CEO",
      theory: `<p>The board hires and fires the CEO, sets the CEO's pay, approves the big decisions and has the best access to internal reports. It monitors only as well as it is independent. Directors come in three kinds: <b>insiders</b> (executives who report to the CEO), <b>gray directors</b> (outsiders with ties, such as the firm's lawyer, its banker or a former executive) and <b>independent directors</b>, who monitor best.</p>
<ul><li><b>CEO as chair</b> is the red flag: the CEO then runs the body that monitors the CEO. A seat on the board alone is fine: "The only red flag is if the CEO is also chair of the board" (Kurbatov).</li><li><b>Size</b>: 7 to 11 directors. Too small lacks capacity; too large invites free riding among the directors.</li><li><b>Captive board</b>: directors who owe their seats to the CEO approve whatever the CEO proposes. Who picks the board? Mostly the board itself.</li><li><b>Busy directors</b> with many seats have little time for each.</li><li><b>Nordic nomination committee</b>: in Norway and Sweden a committee of the largest shareholders nominates directors. Kurbatov: research shows it "really increases transparency and independence of the board".</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>A director who owes the CEO a seat, a salary or fees pays a personal price for voting against the CEO. Independence removes that price; a sensible size stops each director from leaving the work to the others.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A US-listed firm has nine directors: the CEO (not chair), the CFO, the firm's banker and six with no ties, one of whom chairs the board. Insiders 2, gray 1, independent 6 of 9. The size is inside 7 to 11 and the chair is independent, so the CEO's seat is no problem on its own.</p></div>`,
      q: `<p>Elmwood Inc., a US-listed firm, has 15 directors: the CEO (not the chair), the CFO, a former CEO of the firm and 12 directors with no ties to the firm. An independent director chairs the board. Seven of the 12 independent directors also sit on five or more other boards. Which statement is correct?</p>`,
      options: [
        "The main red flag is the CEO's seat: a CEO should not be a director, even with an independent director as chair",
        "Twelve independent directors out of 15 make this a strong monitor; how many other boards they sit on does not matter",
        "The board is too large: with 15 seats each director can leave the work to the others, so 7 to 11 would monitor better",
        "The former CEO counts as independent, since a former CEO no longer works for the firm or reports to the current CEO",
      ],
      answer: 2,
      solution: `<p>Kurbatov's sweet spot is 7 to 11 directors. Fifteen is above it: with many seats each director assumes someone else will do the work, the free-rider problem inside the board. The board has a second weakness: seven independent directors are busy with five or more other boards and have little time to monitor. The CEO's seat is not a problem while someone else chairs the board. The former CEO is gray, not independent.</p>`,
      check: `<p>Count by kind: insiders 2 (CEO, CFO), gray 1 (former CEO), independent 12; 2 + 1 + 12 = 15 ✓. Independence on paper is high, so the weaknesses must come from elsewhere: the size and the busy directors.</p>`,
      traps: [
        "Kurbatov: the only red flag is a CEO who also chairs the board. Here an independent director is chair.",
        "Busy directors with five or more other boards have little time for each. Independence on paper does not make up for absent directors.",
        null,
        "A former CEO has ties to the firm and to the people the former CEO hired: a gray director.",
      ],
    },
    {
      id: "d3-overvaking-3",
      title: "Monitors outside the boardroom and their tools",
      theory: `<p>A monitor needs a reason to watch and a tool to act. Kurbatov's list beyond the board (lecture 13 and the wrap-up):</p>
<table class="data"><tr><th>Monitor</th><th>Tool</th><th>Weak point</th></tr>
<tr><td>Block holders</td><td>Vote the block, board seats, campaigns, proxy fights</td><td>May take private benefits from minority holders</td></tr>
<tr><td>Institutions</td><td>Votes across many holdings, engagement teams</td><td>Index funds hold a stock only because it is in the index, cannot sell and spread a small budget thinly: weak monitors</td></tr>
<tr><td>Analysts and the press</td><td>Questions, public scrutiny, reputation</td><td>No formal power; analysts need access to management</td></tr>
<tr><td>Auditors</td><td>An independent check of the accounts</td><td>Paid by the firm they audit</td></tr>
<tr><td>Creditors</td><td>Covenants, reporting duties, refusing new credit</td><td>Care about repayment, not value</td></tr>
<tr><td>Regulators</td><td>SOX (2002): independent auditors, disclosure, the CEO and CFO answer for the accounts. Dodd-Frank (2010): independent pay committees, large holders may nominate directors</td><td>Target fraud, not legal waste</td></tr>
<tr><td>Employees</td><td>See problems first, blow the whistle</td><td>Speaking up is risky</td></tr>
<tr><td>Takeover market</td><td>A bidder buys a badly run firm and replaces management; the threat alone disciplines</td><td>Blocked by defences, slow and costly</td></tr></table>
<p>Kurbatov calls the takeover threat "one of the strongest forms of monitoring for corporate managers".</p>
<div class="callout tip"><span class="h">Intuition</span><p>Monitoring pays only for someone with enough at stake and a way to act. A holder of 5% gets 5% of the gain and may act; a holder of 0.01% waits for others. An index fund holds a large stake but has no option to sell and no budget to look closely.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: does a holder bother?</span><p>A campaign to replace a weak CEO would raise firm value by 400 and cost 10. A fund with 5% gains 0.05 × 400 = 20 &gt; 10 and acts. A holder of 0.5% gains 2 &lt; 10 and free-rides. The break-even stake is 10/400 = 2.5%.</p></div>`,
      q: `<p>An index fund owns 2% of Brakstad ASA, one of the largest stakes on the register. Kurbatov calls index funds weak monitors. Which statement explains why?</p>`,
      options: [
        "It holds Brakstad only because Brakstad is in the index, cannot sell to punish the CEO and has a tiny budget per firm",
        "Its portfolio is well diversified, so a badly run Brakstad costs the fund nothing and it has no reason to care about the CEO",
        "The free-rider problem is worst for the largest holders, so a 2% stake makes the fund monitor less than a holder of 0.01%",
        "It exits instead: a fund unhappy with the CEO simply sells its shares, which is far cheaper than monitoring the firm",
      ],
      answer: 0,
      solution: `<p>An index fund's reason to own Brakstad is the index, not a view on the CEO. It cannot sell without leaving the index, so the threat to exit is gone. Its governance team covers thousands of firms, so the budget per firm is tiny. A large stake with no exit and no budget makes a weak monitor, which is Kurbatov's point.</p>`,
      check: `<p>Run the free-rider test from the example: 2% of a gain of 400 is 8, below a campaign cost of 10, so even a 2% holder stays put ✓. Voting is cheap, so the fund votes; a campaign is not, so it rarely runs one.</p>`,
      traps: [
        null,
        "Diversification removes the risk of one firm, not its losses: a badly run Brakstad still lowers the fund's value by 2% of the loss.",
        "Direction reversed: a larger stake captures more of the gain, so the free-rider problem is weaker for large holders, not stronger.",
        "An index fund must hold every firm in the index, so it cannot sell. Exit is what active funds can do.",
      ],
    },
    {
      id: "d3-overvaking-4",
      title: "Monitoring has a cost: too much makes the CEO passive",
      theory: `<p>Monitoring is not free. Directors and owners spend time and money on it. Independent directors also know less about the business than insiders do. It also changes what the CEO does. A CEO who is second-guessed on every decision and punished for every visible failure protects the job by avoiding risk, including risky projects with positive NPV. Kurbatov: "Monitor someone too harshly, they will be just not doing anything." Good governance picks a point between freedom for the manager and tight control: monitor more only while the agency cost it removes exceeds what it costs.</p>
<div class="callout tip"><span class="h">Intuition</span><p>A failed project costs the CEO the job; a success earns the CEO a small share of the gain. The harder failures are punished, the more the CEO prefers doing nothing to doing something good but risky.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A board makes every contract above NOK 2 million need its approval and reviews the CEO after each quarter. Shirking falls. But the CEO stops proposing a new plant with positive NPV because it could show losses in its first two years. The board has traded a little shirking for a lost project.</p></div>`,
      q: `<p>At the annual meeting a shareholder says: "More monitoring is always better for the owners." Which reply earns the point?</p>`,
      options: [
        "Agree: each extra check removes some shirking, so firm value keeps rising for as long as monitoring grows",
        "Disagree: monitoring costs money, while a CEO punished for every failure stops taking risky positive-NPV projects",
        "Disagree: monitoring never changes behaviour, since the CEO always knows more than the monitors do",
        "Agree, as long as the monitors are independent: independent monitors remove all of the costs of monitoring",
      ],
      answer: 1,
      solution: `<p>The reply that scores names the <b>trade-off</b>. Monitoring has a direct cost in time and money. It also has an indirect cost: a CEO who loses the job after a visible failure avoids good risky projects, which Kurbatov sums up as monitoring so harshly that "they will be just not doing anything". Past some point extra monitoring lowers value.</p>`,
      check: `<p>Test the claim on the example: tighter control removed some shirking and cost the owners a plant with positive NPV. If more monitoring were always better, that plant could not have been lost ✓.</p>`,
      traps: [
        "Ignores the cost. Past some point the CEO protects the job by taking less risk and value falls.",
        null,
        "Overreach: monitoring does change behaviour, which is exactly why too much of it makes the CEO passive.",
        "Independent monitors still cost time and money and know less about the business than insiders. Independence does not stop a CEO from turning passive.",
      ],
    },
    {
      id: "d3-overvaking-5",
      title: "Exam level: two ways to monitor the CEO, who and with what",
      theory: `<p>H2024 Exercise 2 (12 points): select and describe two distinct ways of monitoring the CEO, explain who monitors and which tools they have, at most 3–4 sentences per method. Each method carries about half the points. The grader checks three things:</p>
<ul><li><b>Who</b>: a named monitor (the board's independent directors, lenders, a bidder), not "governance".</li><li><b>With what</b>: concrete tools (fire the CEO and set pay; covenants; a tender offer).</li><li><b>Distinct</b>: two different monitors. An activist's vote and a proxy fight are both shareholder voice, so they count as one method.</li></ul>
<p>A sentence on the weak point (a captive board, lenders who care only about repayment, defences) lifts a good answer. Selling the shares is exit, not monitoring the CEO.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The grader reads each method as a pair: who monitors and what they can do to the CEO. A monitor without a tool cannot touch the CEO, so it disciplines nobody and earns half the points at most.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one method in full</span><p><b>Auditors and the audit committee.</b> An independent auditor checks the accounts each year and reports to the board's audit committee, which meets the auditor without management in the room. Tools: a qualified opinion and direct access to the committee; under SOX the CEO and CFO answer personally for the accounts. Weak point: the firm pays its own auditor.</p></div>`,
      q: `<p>Which answer to the H2024 question (two distinct ways of monitoring the CEO, who monitors and with which tools) earns full marks?</p>`,
      options: [
        "1. Lenders: banks write covenants that cap debt, payouts and acquisitions and demand quarterly reports; a breach lets them call the loan.<br>2. The takeover market: a bidder can buy a badly run firm by a tender offer to the shareholders and replace the CEO; the threat alone disciplines.",
        "1. Activist funds: they buy a stake in the firm, vote against the directors at the annual meeting and go public with their criticism of the CEO.<br>2. Proxy fights: shareholders nominate their own candidates for the board, solicit the other owners for their votes and replace the directors.",
        "1. The board: it monitors the CEO on behalf of the shareholders and makes sure the CEO always acts in their best interest, which is its main task.<br>2. Regulators: they make sure that listed firms and their CEOs follow the law at all times and that the shareholders are protected from abuse.",
        "1. Index funds: they hold the largest stakes in most listed firms, so they watch the CEO more closely than any other shareholder can.<br>2. Unhappy shareholders: they can sell their shares, which pushes the share price down and shows the CEO that they disagree with the strategy.",
      ],
      answer: 0,
      solution: `<p>The winning answer passes all three tests for both methods. Lenders are named and given tools: covenants, reporting duties and the right to call the loan. The takeover market is named with its tool (a tender offer that goes over the board's head) and its mechanism (the threat). One monitor sits inside the financing contract and the other outside the firm, so they are clearly distinct.</p><p>Each of the others fails at least one test: two versions of shareholder voice, monitors without tools, a weak monitor paired with an exit that is not monitoring.</p>`,
      check: `<p>Mark each method on two counts, who (named?) and with what (tools?). The winning answer scores on both counts for both methods. The activist pair counts as one method; the board and the regulators come without tools; index funds are weak monitors and selling is exit ✓.</p>`,
      traps: [
        null,
        "Two versions of one mechanism: voting, campaigning and proxy fights are all shareholder voice. The key wants two distinct monitors.",
        "Names monitors without tools. Say what the board can do (fire the CEO, set pay, approve big decisions) and how regulators act (disclosure rules, SOX certification, penalties).",
        "Index funds are weak monitors: no exit and a tiny budget per firm. Selling the shares is exit, not monitoring the CEO.",
      ],
    },
  ],
});

/* sjanger 114 · d3-eierverktoy · The owner's toolkit: pay, voice and defences */
window.EDU_DATA.sjangre.push({
  id: "d3-eierverktoy",
  num: 114,
  seksjon: "del3",
  emne: "Governance",
  symboler: "governance",
  title: "The owner's toolkit: pay, voice and defences",
  summary: "Pay for performance, shareholder voice, what a 5–10% holder can do, the poison pill in numbers and when protecting a manager helps, ending with Kurbatov's owner template",
  chapters: [27],
  exam: "H2025 E2 (12 points, verbal) · Mock exams 2, 3, 4, 7, 9, 10 and 12, E2",
  intro: `<p>Kurbatov expects governance in one of the two theory questions and "probably" from a new angle. H2025 Exercise 2 asked what a holder of 5–10% can do about a shirking CEO: three actions at 4 points each. In class Kurbatov tried a new template and graded the answers live: you are the owner, so choose three measures that make the manager act in your interest "but not scare them too much". The ladder takes the tools one at a time: pay, voice, the block holder's actions, the takeover defences with the poison pill in numbers and the cases where protecting a manager helps. It ends by grading an answer to the new template.</p>`,
  steps: [
    {
      id: "d3-eierverktoy-1",
      title: "Pay for performance: the CEO maximises what you measure",
      theory: `<p>A contract changes what the CEO wants. Pay that moves with long-run firm value aligns the CEO with the owners. Pay tied to a number that can move without value moving invites the CEO to move the number. Kurbatov's points (lecture 13):</p>
<ul><li><b>EPS targets</b> make the manager short-sighted: a buyback or a cut in R&amp;D lifts this year's EPS without creating value.</li><li><b>Shares with long vesting</b> tie the CEO's wealth to value years ahead, but load firm-specific risk on a manager who cannot diversify, which can make the manager cautious. <b>Options</b> reward the upside only and can push towards too much risk.</li><li><b>ESG-based pay</b> is "much less abusable than, let's say, EPS". Long-term metrics are possible but harder to set.</li><li><b>Golden parachutes</b> pay the CEO who loses the job. In an R&amp;D-heavy firm with high-risk, high-reward projects they make sure the CEO "will not be afraid to take those risks". Set too generously, they reward failure.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>Pay is a measuring stick and the CEO will grow whatever it measures. Measure something only real value moves. Then soften the personal downside of the risks you want taken.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: hitting an EPS target</span><p>A bonus pays if EPS reaches 3.00. EPS is heading for 2.90. The firm has idle cash that earns nothing and uses it to buy back 4% of the shares. Same earnings over fewer shares: EPS = 2.90/0.96 = 3.0208. The bonus is paid, while under MM the share price does not move.</p></div>`,
      q: `<p>Kvernes Biotech is ten years into developing new drugs. Most trials fail, but a success is worth many times its cost. The board wants a CEO contract that keeps the CEO working for the owners and willing to start bold trials. Which design fits best?</p>`,
      options: [
        "An annual bonus on EPS: earnings are easy to measure and audited, so the CEO cannot move them without creating value",
        "Mostly fixed salary: without pressure from pay, the CEO feels free to take the long view on the firm's research",
        "Long-vesting shares plus a golden parachute: the CEO shares in success and need not fear losing the job after a failed trial",
        "A large grant of options only: options reward risk, so the more options the CEO holds, the better it is for the owners of the firm",
      ],
      answer: 2,
      solution: `<p>The owners want two things: effort aimed at long-run value and a CEO willing to start trials that usually fail. <b>Shares with long vesting</b> handle the first: the CEO's wealth moves with value years ahead. A <b>golden parachute</b> handles the second: a failed trial that costs the CEO the job no longer costs the CEO everything, so the CEO "will not be afraid to take those risks" (Kurbatov).</p>`,
      check: `<p>Test each design against what a drug developer needs. An EPS bonus rewards cutting R&amp;D, the opposite of what the owners want. A fixed salary pays the same for effort and for shirking. Options alone reward any risk, good or bad. They also lose their pull when far out of the money ✓.</p>`,
      traps: [
        "An EPS target is easy to game: an R&amp;D cut or a buyback lifts EPS without creating value. Kurbatov: targets make the manager short-sighted.",
        "A fixed salary does not move with value, so effort and shirking pay the same. Freedom without alignment invites shirking.",
        null,
        "Options push towards risk of any kind, bad bets included. They stop working when deep out of the money; more is not always better.",
      ],
    },
    {
      id: "d3-eierverktoy-2",
      title: "Shareholder voice: proposals, votes and proxy advisers",
      theory: `<p>Owners can use their votes: vote against directors or pay (<b>say on pay</b>), put a <b>proposal</b> on the agenda, coordinate votes with other holders or run a <b>proxy fight</b> with their own candidates for the board. Three limits:</p>
<ul><li><b>Free riding.</b> The holder who campaigns pays the full cost; every owner shares the gain.</li><li><b>Most proposals fail and most are advisory</b>: a passed proposal is a request to the board, not an order. Low support is not only laziness: many proposals cater "to a certain small group" (Kurbatov). At Microsoft's 2023 meeting all nine shareholder proposals failed.</li><li><b>Proxy advisers</b> such as ISS and Glass Lewis give voting advice that many institutions simply follow. That is cheap, but one standard policy then decides votes at very different firms. There is also some evidence that the advice caters to the bigger institutions.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>A vote rarely wins outright, but it is counted and published. Voice works through visibility and coalitions: a board that sees a third of the votes go against it tends to act before the next meeting.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A proposal asks the board to separate the roles of CEO and chair. It gets 38% of the votes and fails. The board is not bound, but 38% is public: directors who want to keep their seats often meet the large holders and make a concession before next year.</p></div>`,
      q: `<p>At a large listed firm a shareholder proposal asking for a report on the firm's lobbying gets 8% of the votes. Which reading is best?</p>`,
      options: [
        "Owners are lazy: support of only 8% shows that almost nobody reads the proposals they are asked to vote on each year",
        "Low support need not be laziness: many proposals serve a small group's agenda, so most owners side with the board",
        "Had the proposal won 51% of the votes, the board would have been legally bound to publish the report",
        "Proxy advisers would have backed it, since their advice is written mainly for the small retail holders",
      ],
      answer: 1,
      solution: `<p>Kurbatov's point: low support for shareholder proposals is not only laziness. Many proposals cater to a small group; owners who read them may simply disagree. A proposal like this is also usually advisory, so even a majority would only put pressure on the board, not bind it.</p>`,
      check: `<p>Compare with the data Kurbatov showed: directors get about 91% support on average and Microsoft's nine proposals all failed, the best one at 33.57%. Low support is the normal result, not proof that nobody reads ✓.</p>`,
      traps: [
        "Laziness is not the only reason: many proposals cater to a small group, so informed owners vote against them.",
        null,
        "Most shareholder proposals are advisory (precatory): a passed one is a request to the board, which then faces strong pressure to act, not a legal order. Write “pressure, not binding”.",
        "Reversed: there is some evidence that proxy advice caters to the bigger institutions.",
      ],
    },
    {
      id: "d3-eierverktoy-3",
      title: "Exam level: what a holder of 5–10% can do",
      theory: `<p>H2025 Exercise 2 (12 points): you hold 5–10% of a firm whose managers shirk and enjoy private benefits; give three actions, 2–3 sentences each, 4 points each. The key accepts any reasonable action with an explanation: active monitoring, an activist campaign, replacing insider directors with independent ones, a better pay contract, voting or pressing to fire the manager, an LBO or a friendly acquirer, legal action if there is good evidence. As a bonus for creativity it also accepts <b>exit</b>.</p>
<p>Exit works as a threat: selling a large block pushes the price down, which hurts a CEO paid in shares and makes the firm cheaper for a bidder. A full-mark action says what you do, through which channel and why it changes the CEO's behaviour. It also uses your stake: 5–10% makes acting worth its cost, but you cannot decide alone, so you need allies.</p>
<div class="callout tip"><span class="h">Intuition</span><p>Your stake is too big to sell quietly and too small to give orders. That pushes you towards voice with allies, with exit as the threat you keep in reserve.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one action in full</span><p><b>Replace insider directors.</b> With 8% I nominate two independent directors at the annual meeting and ask the other large holders to back them. Independent directors can cut the CEO's perks and tie pay to results, so shirking starts to cost the CEO. My stake makes the campaign worth its cost; the allies make it winnable.</p></div>`,
      q: `<p>You hold 7% of Lyngstad ASA. Its CEO shirks and uses the firm's cabin and jet for private trips. Which action, as written, earns the full 4 points?</p>`,
      options: [
        "I would make the CEO work harder and stop the private trips. The CEO is clearly shirking, which hurts every shareholder in the firm.",
        "I would sell all my shares at once. An unhappy owner should leave; the buyer of the shares can then deal with the CEO.",
        "I would vote to fire the CEO at the annual meeting. With 7% of the votes I can remove the CEO on my own, without any allies.",
        "I would nominate two independent directors and ask other large holders to back them. A new board can cut the perks and tie pay to results.",
      ],
      answer: 3,
      solution: `<p>The action that scores has the three parts the key rewards. <b>What</b>: nominate two independent directors. <b>Channel</b>: the board, the body that can cut the CEO's perks, change the CEO's pay or replace the CEO. <b>Why it works with 7%</b>: the stake makes the campaign worth its cost, while the call for allies admits that 7% cannot win a vote alone.</p>`,
      check: `<p>Ask of each action: what do I do, through which channel and why does the CEO change? Only the board action answers all three ✓. Exit could also score, but only with its mechanism: a block sold pushes the price down and invites a bidder.</p>`,
      traps: [
        "Names the goal, not an action: no channel and no tool. \"Make the CEO work harder\" gives the grader nothing to mark.",
        "Exit can score (the H2025 key gave a bonus for it), but only with the mechanism: a block sold pushes the price down, hurts a CEO paid in shares and invites a bidder.",
        "Owners elect the board; the board fires the CEO. And 7% cannot decide a vote alone.",
        null,
      ],
    },
    {
      id: "d3-eierverktoy-4",
      title: "Takeover defences: the poison pill in numbers",
      theory: `<p>Managers can resist the takeover market with defences (Kurbatov, lecture 12). Most belong in a US firm:</p>
<ul><li><b>Poison pill</b>: if a raider crosses a trigger stake, every <i>other</i> shareholder gets new shares cheaply. The raider is diluted, so a hostile bid cannot succeed unless the board removes the pill.</li><li><b>Staggered board</b>: only a third of the seats are elected each year, so winning a majority takes two annual meetings.</li><li><b>Supermajority</b>: a merger or the removal of a director needs, say, 75% of the votes, so a minority can block it.</li><li><b>Golden parachutes, white knights and greenmail</b> complete the list.</li></ul>
<p>The key question for each: does it raise value by giving the board bargaining power, or does it entrench the managers? The market's reaction when a firm adopts a pill is "super negative" (Kurbatov). Since 1985 a pill has been triggered only once, by accident.</p>
<div class="formula"><div class="eq">raider's stake after = s/(s + (1 − s)(1 + n))</div><div class="where">s is the raider's stake when the pill triggers and n the number of new shares each other shareholder gets per share owned. The raider gets no new shares.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The pill is built never to be used. Its power is the threat: a bidder that crosses the line loses much of its stake, so it must negotiate with the board instead of buying from the shareholders.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: Kurbatov's numbers</span><p>Trigger 10%; each other shareholder gets one new share per share owned. Per 100 old shares the raider holds 10 and the others 90, which become 180. Raider's stake: 10/(10 + 180) = 0.1/1.9 = 5.26%.</p></div>`,
      q: `<p>Brekke Industries Inc., a US-listed firm, adopts a poison pill with a 15% trigger. If a raider crosses it, every other shareholder receives two new shares for each share owned; the raider receives none. A raider buys exactly 15% and triggers the pill. What is the raider's stake afterwards?</p>`,
      options: ["5.56%", "8.11%", "5.00%", "15.00%"],
      answer: 0,
      solution: `<p>Per 100 old shares the raider holds 15 and the others 85. The others get 2 × 85 = 170 new shares, so they now hold 85 + 170 = 255.</p><p>Total shares: 15 + 255 = 270. Raider's stake = 15/270 = <b>5.56%</b>.</p><p>With the formula: 0.15/(0.15 + 0.85 × 3) = 0.15/2.70 = 0.0556.</p>`,
      check: `<p>Backwards: 5.5556% of 270 shares is 15.00, the raider's own shares ✓. If the new shares are free, as in Kurbatov's version, the raider's claim on the firm falls by 1 − 5.5556/15 = 62.96%. That loss is the deterrent.</p>`,
      traps: [
        null,
        "Used Kurbatov's one new share per share instead of two: 0.15/(0.15 + 0.85 × 2) = 0.15/1.85 = 8.11%.",
        "Tripled every share, the raider's too: 15/(100 × 3) = 5.00%. The raider gets no new shares, so the total is 270, not 300.",
        "Let the raider take part in the issue, so its stake does not change. The pill excludes the raider; that is what dilutes it.",
      ],
    },
    {
      id: "d3-eierverktoy-5",
      title: "When protecting the manager can help: long projects and dual-class shares",
      theory: `<p>Entrenchment usually destroys value: it switches off the takeover threat and makes a weak manager hard to replace. Kurbatov's exception: a firm with "absolutely crystal clear reputation, very transparent long-term vision" and a stable group of shareholders. The lecture example is year 7 of 10 towards a cancer drug, where a raider would cut the research for a quick profit. Protection keeps the scientists and the trusted manager in place. The cost is the usual one: external monitoring is greatly reduced.</p>
<p><b>Dual-class shares</b> build the same trade-off into the share structure. The founders keep voting control with a small part of the capital, so the firm can raise equity without giving up control: Ford raised capital while the family kept control with about 3% of the equity and about 40% of the votes. The price: the vote and the takeover threat no longer discipline the controlling owners. Ford also shows the other side. Its board added a low-trigger pill to protect the firm's tax losses, but with about 40% of the votes in the family's hands the losses were never at risk. The pill "was just entrenching the inefficient management" and the market punished it.</p>
<div class="callout tip"><span class="h">Intuition</span><p>Protection buys time. Time is worth something only when the plan is clear, close to paying off and backed by stable owners; otherwise it just shelters a manager from the people who could replace the manager.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: control with a tenth of the capital</span><p>A founder owns 10% of the capital in B shares with 10 votes each; the public owns 90% in A shares with one vote each. Votes: 10 × 10 = 100 against 90, so the founder holds 100/190 = 52.63% of the votes with 10% of the capital. The firm can sell more A shares without the founder losing control.</p></div>`,
      q: `<p>Four US-listed firms want to protect their managers from hostile bids. In which case does the course see a possible gain for the owners?</p>`,
      options: [
        "Granite Tools Inc. has lagged its peers for five years; its CEO needs time to turn the firm around without pressure from bidders",
        "Medivo Inc. is in year 6 of 9 towards a vaccine, with a transparent plan, a trusted CEO and a stable group of owners",
        "Harbor Foods Inc.'s board adopts a pill without a shareholder vote in the week after a bid at a 30% premium",
        "Stanton Motors Inc.'s founding family holds 60% of the votes; the board adds a pill so that no raider can ever take control",
      ],
      answer: 1,
      solution: `<p>Medivo fits Kurbatov's conditions: a transparent long-term plan close to paying off, a trusted manager and stable owners. A raider who bought it now could cut the programme for a quick profit just before the value arrives, so protection can keep the value for the owners. The cost, weaker external monitoring, is still there; the case is that the plan is worth more.</p>`,
      check: `<p>Test each firm against the three conditions (clear plan near its payoff, trusted manager, stable owners). Granite has a record of failure, the very case the takeover market exists for. Harbor's pill, adopted without a vote right after a bid, points to entrenchment. Stanton repeats Ford: 60% of the votes already blocks any raider, so the pill only protects the managers ✓.</p>`,
      traps: [
        "A firm that has lagged for years is exactly where a bidder adds value by replacing management. Protection shelters the failure.",
        null,
        "A pill adopted without a vote right after a premium bid takes the premium off the table: the classic sign of entrenchment.",
        "The Ford lesson: with 60% of the votes no raider can win anyway, so the pill adds no protection to the firm, only to the managers.",
      ],
    },
    {
      id: "d3-eierverktoy-6",
      title: "Exam level: you are the owner, choose three measures",
      theory: `<p>Kurbatov's new template, tried in class: you own a company and design the manager's contract. Choose three measures that make the manager act in the shareholders' interest "but not scare them too much", about three sentences each. How Kurbatov graded the class's answers live:</p>
<ul><li><b>An independent board</b>: "one of the first check marks". Add a chair who is not the CEO and 7 to 11 directors.</li><li><b>A ban on dual-class shares</b>: "not a completely stupid measure", but the shares also have benefits: Ford raised capital while the family kept control. Give both sides.</li><li><b>"Make shareholders vote"</b>: "my question is how". Say how: meetings and visits with the largest institutions, since small retail holders are hard to reach.</li><li><b>Communication and transparency</b> such as press releases and newsletters: "this is good".</li></ul>
<p>Strong extras: long-vesting shares or ESG-based pay instead of an EPS target; a golden parachute in an R&amp;D-heavy firm. Close with the trade-off: a manager monitored too hard turns passive.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The question has two halves: align the manager and keep the manager willing to act. A measure scores when it says how it works and what it costs; a measure that only adds pressure misses the second half.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one measure with both sides</span><p><b>Ban dual-class shares.</b> With one vote per share the controlling owners can be outvoted, so the vote and the takeover threat reach them too. The cost: a founder who would lose control may never list the firm or raise new equity, while Ford raised capital and kept control. I would ban it in a mature firm whose founders no longer run a long-term plan.</p></div>`,
      q: `<p>A student answers the template with three measures: (1) an independent board, with a chair who is not the CEO; (2) "make shareholders vote more, because voting disciplines the manager"; (3) monthly newsletters and open results calls, so that the owners can see what the manager does. Which comment matches how Kurbatov graded such measures in class?</p>`,
      options: [
        "Measure 3 earns nothing: newsletters and results calls change nothing in what the CEO is paid or risks",
        "Measure 1 is weak: the CEO must leave the board entirely before the board can count as independent at all",
        "Add a fourth measure that dismisses the CEO after any loss-making quarter, since owners want the tightest control",
        "Measure 2 needs a how: say who is reached and by what means, for example meetings with the largest institutions",
      ],
      answer: 3,
      solution: `<p>Kurbatov's reply to "make shareholders vote" was "my question is how". A measure without a channel cannot be marked. Say who is reached and how: meetings and visits with the largest institutions before the annual meeting, since small retail holders are hard to reach. Measures 1 and 3 match what Kurbatov rewarded: an independent board is one of the first check marks and transparency "is good".</p>`,
      check: `<p>Run each measure through the template's two halves. Does it make the manager act for the owners and does it say how? Does it avoid scaring the manager into passivity? Measures 1 and 3 pass both; measure 2 fails the "how". A rule that fires the CEO after one bad quarter fails the second half ✓.</p>`,
      traps: [
        "Kurbatov called better communication and transparency good: owners who can see what the manager does can monitor and vote on facts.",
        "A CEO with a board seat is fine; only the CEO as chair is the red flag. The student already has an independent chair.",
        "Fails the template's second half: a manager fired after one bad quarter turns passive. Kurbatov asked for measures that do not scare the manager too much.",
        null,
      ],
    },
  ],
});

window.EDU_DATA.sjangerSeksjoner = [
 {
  "id": "del3",
  "tittel": "Del 3 i korte stiger",
  "tekst": "Opsjoner, kreditt, realopsjoner, M&A og governance, delt opp i én kort stige per oppgavetype som kan komme på eksamen. Hver stige har rundt fem steg med vekt på intuisjonen: hvorfor svaret blir som det blir, ikke bare hvordan du regner. Start med den delen du sliter mest med."
 }
];
