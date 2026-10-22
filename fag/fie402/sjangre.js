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
  intro: `<p>Every FIE402 paper since 2015 has asked you to find a cost of capital you cannot observe directly. You take the business risk of a listed twin, strip out the twin's financing, put your own financing back on and build the WACC. In H2024 Exercise 5 (a twin) and H2025 Exercise 4 (your own firm, with a debt beta) this chain opens the valuation exercise. Every later number depends on it. At the end of the ladder you can run the whole chain to four decimals with debt betas on both sides. You will also know the slips that cost the most points.</p>`,
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
<div class="where">This course weights without taxes: the firm keeps a target D/E, so the tax shield carries the same risk as the assets. Never use the textbook version with (1 − τ<sub>c</sub>). With risk-free debt, β<sub>U</sub> is always below β<sub>E</sub>.</div></div>`,
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
  intro: `<p>Every paper has this exercise: a firm in a perfect capital market issues debt and hands the cash to its shareholders, as a special dividend or a share repurchase. H2024 Exercise 3 and H2025 Exercise 3 were exactly this, 18 points each, in five chained sub-questions where one slip cascades. By the last step you can give r<sub>U</sub> and r<sub>E</sub> before and after, the price at announcement and after execution, the dividend per share, the shares bought back and the comparison of seller and holder, to four decimals.</p>`,
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
  intro: `<p>Every paper since 2015 values a levered firm twice: once by discounting free cash flow at the after-tax WACC, once by APV, where the tax shield is added to the unlevered value. It is usually the largest exercise on the paper. In H2024 E5 and H2025 E4 it ran to five and nine chained sub-questions. This ladder starts with one year's tax saving and ends with H2025 E4 in full: the rates, a two-period value path, the debt adjustment between periods and the tax shield discounted at the right rate, to four decimals.</p>`,
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
      id: "realopsjon-8",
      title: "The exit option: a perpetuity cut to an annuity",
      theory: `<p>An exit option is the mirror image of waiting: you commit first, then may quit once you know the state. In the bad state the perpetuity of losses is replaced by an annuity that stops at the exit date, plus any salvage value S. The good state is unchanged, since you never quit a positive perpetuity. The option is worth only the negative tail it cuts off.</p>
<div class="formula"><div class="eq">NPV<sub>bad</sub> with exit after n years = −I + C<sub>bad</sub> × A(n, r) + S/(1 + r)<sup>n</sup></div>
<div class="eq">value of the exit option = E[NPV with exit] − E[NPV without exit]</div>
<div class="where">A(n, r) is the n-year annuity factor. With S = 0 the option is worth p<sub>bad</sub> × (|C<sub>bad</sub>|/r)/(1 + r)<sup>n</sup>: the PV of the losses after the exit date.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>I = 120, net cash flow +15 or −5 a year forever (p = 0.5), r = 10%, exit allowed after 1 year.</p><p>Without exit: 0.5(15 − 5)/0.10 − 120 = 50 − 120 = −70.</p><p>With exit: good 150 − 120 = 30, bad −120 − 5/1.10 = −124.55. E[NPV] = 15.00 − 62.27 = −47.27. The exit option is worth −47.27 − (−70) = 22.73 = 0.5 × (5/0.10)/1.10 ✓ Still negative: do not invest.</p></div>`,
      q: `<p>A gym costs 200 (NOK thousand) to open today. Its net cash flow is +50 a year forever or −20 a year forever, with equal probability. You learn which during year 1, after opening. The discount rate is 10%. A new rule lets you close after year 2 and walk away with nothing, so in the bad state you bear only two years of losses. What is the NPV of opening the gym today?</p>`,
      options: ["32.64", "40.91", "150.00", "50.00"],
      answer: 0,
      solution: `<p>Good state, never close: 50/0.10 − 200 = 500 − 200 = 300.</p><p>Bad state, close after year 2: A(2, 10%) = 1/1.10 + 1/1.10<sup>2</sup> = 0.909091 + 0.826446 = 1.735537, so NPV<sub>bad</sub> = −200 − 20 × 1.735537 = −200 − 34.7107 = −234.7107.</p><p>E[NPV] = 0.5(300) + 0.5(−234.7107) = 150 − 117.3554 = <b>32.64</b>. Positive: open the gym.</p>`,
      check: `<p>Without the rule: 0.5(50 − 20)/0.10 − 200 = 150 − 200 = −50, so the exit option is worth 32.64 + 50 = 82.64. Directly: it removes a perpetuity of −20 starting in year 3, worth (20/0.10)/1.10<sup>2</sup> = 165.29 today, in a state with probability 0.5: 0.5 × 165.29 = 82.64 ✓ The option flips the decision.</p>`,
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
      theory: `<p>When you have no usable probabilities, or the risk is a traded price or a rate, value the option risk-neutrally. The underlying S is the PV of the project's cash flows, not its NPV: the investment cost is the strike. As in the H2024 key, S<sub>u</sub> and S<sub>d</sub> are what the project is worth at date 1 if you start it then, so no cash flow arrives at date 1. ρ is the probability that makes S earn exactly the risk-free rate over the year, so grow today's value by (1 + r<sub>f</sub>) before you compare it with the two date-1 values. Real probabilities never enter. Always check that 0 &lt; ρ &lt; 1: outside that range ρ is not a probability and cannot price the option.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">r<sub>f</sub> is the rate from year 0 to year 1. (1 + r<sub>f</sub>)S<sub>0</sub> is the date-1 certainty equivalent: with S<sub>0</sub> = 100 and r<sub>f</sub> = 3% it is 103, not 100. Only when S is one traded asset that pays C<sub>1</sub> at date 1, such as a listed annuity, add that payment: (1 + r<sub>f</sub>)S<sub>0</sub> = C<sub>1</sub> + ρS<sub>u</sub> + (1 − ρ)S<sub>d</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 100, S<sub>u</sub> = 120, S<sub>d</sub> = 90, r<sub>f</sub> = 4%.</p><p>ρ = (1.04 × 100 − 90)/(120 − 90) = 14/30 = 0.4667.</p><p>Check: [(14/30)(120) + (16/30)(90)]/1.04 = (56 + 48)/1.04 = 100 ✓</p></div>`,
      q: `<p>For a ferry route, the PV of the cash flows if you invest today is S<sub>0</sub> = 7.7622 (NOK million). If you wait a year instead, the PV at date 1 of the cash flows from investing then is S<sub>u</sub> = 8.4159 if the rate has fallen to 4% or S<sub>d</sub> = 7.1833 if it has risen to 8%. The investment cost is 8 and the risk-free rate from year 0 to year 1 is 6%. An analyst puts the real probability of a falling rate at 0.5. What is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.8475", "0.4581", "0.7216", "0.4697"],
      answer: 0,
      solution: `<p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.06 × 7.7622 = 8.2279.</p><p>ρ = (8.2279 − 7.1833)/(8.4159 − 7.1833) = 1.0446/1.2326 = <b>0.8475</b>.</p><p>The investment cost and the analyst's 0.5 play no role.</p>`,
      check: `<p>Reprice the asset: [0.8475 × 8.4159 + 0.1525 × 7.1833]/1.06 = (7.132475 + 1.095453)/1.06 = 8.227928/1.06 = 7.7622 ✓ This only confirms the arithmetic, since ρ is built to make it hold. The real test is 0 &lt; ρ &lt; 1, which needs 1.06 × S<sub>0</sub> between S<sub>d</sub> and S<sub>u</sub>: 7.1833 &lt; 8.2279 &lt; 8.4159 ✓ If it fails, the three values do not describe one asset without arbitrage, so ρ cannot be used: recheck them. Under this convention it can fail for a short annuity, because S<sub>0</sub> includes a payment at date 1 that S<sub>u</sub> and S<sub>d</sub> do not. The same route over 5 years instead of 8 gives ρ = 1.03.</p>`,
      traps: [
        null,
        "Built the tree on the NPVs instead of the PVs: [1.06(−0.2378) + 0.8167]/(0.4159 + 0.8167) = 0.4581. The 8 is the strike, not part of the asset.",
        "Grew S<sub>0</sub> at the up-branch rate of 4% instead of the 6% that applies this year: (1.04 × 7.7622 − 7.1833)/1.2326 = 0.7216.",
        "Forgot to grow S<sub>0</sub> by (1 + r<sub>f</sub>), the slip of using 100 instead of 100 × 1.03 as a certainty equivalent: (7.7622 − 7.1833)/1.2326 = 0.4697.",
      ],
    },
    {
      id: "realopsjon-13",
      title: "Exam level: the option to wait by risk-neutral valuation",
      theory: `<p>Waiting gives you a call on the project, struck at the investment cost I. At date 1 you invest only if it pays, so each payoff is floored at zero. Find ρ as in the last step and check that it lies strictly between 0 and 1. Weight the payoffs with ρ, discount at r<sub>f</sub>, then subtract what you would get by investing today. A positive option value means wait.</p>
<div class="formula"><div class="eq">C<sub>u</sub> = max(S<sub>u</sub> − I, 0), C<sub>d</sub> = max(S<sub>d</sub> − I, 0)</div>
<div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="eq">value of the option to wait = C<sub>0</sub> − max(0, S<sub>0</sub> − I)</div>
<div class="where">Replication on the formula sheet gives the same C<sub>0</sub>: Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>), B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>), C<sub>0</sub> = S<sub>0</sub>Δ + B.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 100, S<sub>u</sub> = 120, S<sub>d</sub> = 90, r<sub>f</sub> = 4%, so ρ = 14/30. The investment cost is I = 105.</p><p>C<sub>u</sub> = 15, C<sub>d</sub> = 0. C<sub>0</sub> = (14/30)(15)/1.04 = 7/1.04 = 6.7308.</p><p>NPV<sub>now</sub> = 100 − 105 = −5, so the option to wait is worth 6.7308 − 0 = 6.7308: wait.</p></div>`,
      q: `<p>A licence lets you build a tidal plant for 24 (NOK million), paid when you build. The plant pays 3.0 a year for 10 years, starting one year after you build. The one-year risk-free rate today is 4%. If you wait a year, the rate becomes 2.5% or 5.5% for good, the rate from year 0 to year 1 stays 4%, the cost is still 24 and the plant still runs 10 years. An analyst puts the real probability of 2.5% at 0.5. What is the value today of the option to wait, measured against building today?</p>`,
      options: ["0.7520", "1.2709", "1.6036", "0.9231"],
      answer: 1,
      solution: `<p><b>Underlying.</b> S<sub>0</sub> = 3.0 × A(10, 4%) = 3.0 × 8.110896 = 24.3327, so NPV<sub>now</sub> = 0.3327. S<sub>u</sub> = 3.0 × A(10, 2.5%) = 3.0 × 8.752064 = 26.2562. S<sub>d</sub> = 3.0 × A(10, 5.5%) = 3.0 × 7.537626 = 22.6129.</p><p><b>ρ.</b> (1.04 × 24.3327 − 22.6129)/(26.2562 − 22.6129) = (25.3060 − 22.6129)/3.6433 = 2.6931/3.6433 = 0.7392, strictly between 0 and 1 ✓</p><p><b>Payoffs.</b> C<sub>u</sub> = max(26.2562 − 24, 0) = 2.2562. C<sub>d</sub> = max(22.6129 − 24, 0) = 0.</p><p><b>Value.</b> C<sub>0</sub> = 0.7392 × 2.2562/1.04 = 1.66778/1.04 = 1.6036. Option to wait = 1.6036 − max(0, 0.3327) = <b>1.2709</b>. Wait.</p>`,
      check: `<p>Replication: Δ = 2.256192/3.643314 = 0.619269, B = −22.612877 × 0.619269/1.04 = −13.464859, C<sub>0</sub> = 24.332687 × 0.619269 − 13.464859 = 15.068479 − 13.464859 = 1.603620 ✓ It uses the same tree, so it catches arithmetic slips only. A test that can fail: C<sub>0</sub> must be at least S<sub>0</sub> − I/1.04 = 24.3327 − 23.0769 = 1.2558, the value of committing today to build next year in both states. 1.6036 passes; the real-probability figure 1.0847 does not.</p>`,
      traps: [
        "Used the analyst's real probability with the risk-free rate: 0.5 × 2.2562/1.04 − 0.3327 = 1.0847 − 0.3327 = 0.7520.",
        null,
        "Reported the value of waiting, C<sub>0</sub> = 1.6036, as the option. The option is what waiting adds over the 0.3327 you get by building today.",
        "Forgot that you are not forced to build at date 1: C<sub>d</sub> = 22.6129 − 24 = −1.3871 gives C<sub>0</sub> = 1.2558 and an option of 0.9231.",
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
  intro: `<p>M&amp;A has appeared on 8 of 11 papers and on both of Kurbatov's. H2024 Exercise 1 asked for four reasons for a deal with synergies banned. H2025 Exercise 6 asked for the probability the market assigns to a deal closing, backed out of four share prices and a risk-free rate. The ladder starts with the premium and the exchange ratio, builds the stock-swap arithmetic the formula sheet only half gives you and ends with the long-short strategy. At the top you can price a stock swap, tell the offered premium from the actual one, argue motives without synergies and solve H2025 Exercise 6 with any numbers.</p>`,
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
      id: "ma-12",
      title: "Exam level: the motive and the vote from the price reaction",
      theory: `<p>The announcement reaction tells you what the market believes about the deal. Whatever the payment method, the two sets of shareholders together own the whole merged firm, so the change in the two firms' combined market value is the market's estimate of the synergies. If the acquirer falls and the target jumps, the market thinks the acquirer pays more than the target is worth to it, so NPV<sub>A</sub> &lt; 0. Motives that predict that pattern are agency motives: empire building (managers gain from running a bigger firm) and hubris or the winner's curse. Motives that create value, such as undervaluation, a disciplinary takeover or a tax gain, should raise the two firms' combined value; they fit a falling acquirer only if it pays away more than the gain.</p>
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
      theory: `<p>H2024 Exercise 1 asked for four reasons in a grid: one good and one bad for the acquirer, one good and one bad for the target, one to two sentences each, with synergies banned. Synergies in disguise (cost savings, economies of scale, cross-selling) are banned too. The grid is marked box by box, so a reason in the wrong box scores nothing. Test every reason with one question: whose wealth does the mechanism move and in which direction?</p>
<table class="data"><tr><th>Box</th><th>Reasons that work</th></tr>
<tr><td>Good for the acquirer</td><td>Disciplinary takeover, undervaluation (better information), tax losses or extra debt capacity, market power</td></tr>
<tr><td>Bad for the acquirer</td><td>Empire building, hubris and the winner's curse, coinsurance handing value to creditors</td></tr>
<tr><td>Good for the target</td><td>The control premium, pushed up by the free-rider problem (no small holder sells below what his share will be worth after the takeover); relief of a financing constraint</td></tr>
<tr><td>Bad for the target</td><td>Entrenched managers accepting a low offer for private benefits, payment in overvalued acquirer shares, loss of independence</td></tr></table>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Take the reason "diversification lowers the merged firm's risk" and ask whose wealth moves. Two firms with risky debt merge, default becomes less likely and the creditors gain. Total value is unchanged, so the shareholders lose exactly what the creditors gain (consistency check 4). The reason belongs under bad for the acquirer, never under good.</p></div>`,
      q: `<p>An exam question asks for four reasons, none of them synergies: one good and one bad for the acquirer, one good and one bad for the target. Which answer earns all four boxes?</p>`,
      options: [
        "Good for acquirer: economies of scale cut the merged firm's cost per unit, so it earns more on the same sales.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: the merged cash flows are less volatile, so its equity becomes safer and worth more.<br>Bad for acquirer: empire building, the CEO overpays to run a bigger firm.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: a disciplinary takeover, new managers run the target's assets better.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: entrenched managers accept a low offer in return for a golden parachute.",
        "Good for acquirer: it buys a target it knows is undervalued, using better information.<br>Bad for acquirer: hubris, an overconfident CEO trusts his own high valuation.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: empire building, the acquirer's CEO overpays to run a bigger firm.",
      ],
      answer: 2,
      solution: `<p>Every box in the winning answer names a mechanism that moves value the way the box says. A <b>disciplinary takeover</b> creates value for the acquirer by running badly run assets better. The <b>winner's curse</b> makes the acquirer overpay. The <b>control premium</b>, forced up by the free-rider problem, is a gain to the target's shareholders. <b>Entrenched managers</b> who take a golden parachute in exchange for a low offer leave the target's shareholders with less.</p><p>Each of the other answers fails one box: economies of scale is a synergy in disguise, less volatile cash flows is coinsurance and an acquirer that overpays is good news for the target.</p>`,
      check: `<p>Run the two tests on all sixteen lines. Is it a synergy in disguise? Only economies of scale is. Does the mechanism move value in the direction its box claims? Coinsurance moves value from shareholders to creditors, so it cannot be good for the acquirer; overpayment moves value to the target, so it cannot be bad for the target. The winning answer is the only one with no line failing either test ✓.</p>`,
      traps: [
        "Economies of scale is a synergy in disguise, so that box scores nothing.",
        "Less volatile cash flows is coinsurance: it moves value from shareholders to creditors, so it is bad, not good, for the acquirer.",
        null,
        "An acquirer that overpays hands value to the target's shareholders, so empire building is good, not bad, for the target.",
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
  intro: `<p>Risky debt gives shareholders two bad incentives. Each has appeared on 5 of 11 papers. In <b>risk shifting</b> they choose a riskier project with a lower value because the creditors bear its downside: H2024 Exercise 4 (18 points) and V2024 Problem 1 (52 points). In <b>debt overhang</b> they refuse a good project because the creditors collect part of its value: 2017V Problem 3, 2017H Problems 1 and 4 plus 2021 Problem 2, which put both problems in one firm and ended with a renegotiation of the face value. The ladder starts with who gets paid in each state. At the top you can find the project management picks, the agency cost, the indifference face value, the fate of a hedge or a debt buyback and the write-down that leaves both sides better off.</p>`,
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
      id: "opsjoner-11",
      title: "Black-Scholes: which way each input moves the value",
      theory: `<p>Give the binomial tree more and shorter steps and its price converges to the Black-Scholes formula. N(d<sub>1</sub>) is Δ and PV(K)·N(d<sub>2</sub>) is the borrowing, so it is still C = SΔ + B. The formula sheet carries no N(d) tables, so the exam tests the direction of each effect and the reason, not the arithmetic. The key effect: a higher σ raises both a call and a put, because the payoff is floored at zero, so extra dispersion adds upside without adding downside. Four of the inputs can be read off a screen; only σ cannot. Run the formula backwards from a market price and you get the implied volatility: the σ the price is quoting.</p>
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
      theory: `<p>H2024 Exercise 6 gave 20 points to an investment you can make now or in a year, once the interest rate is known. The right to wait is a call option. The underlying S is the present value of the project's cash flows, not its NPV; the investment cost I is the strike. Find S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>, back ρ out of the underlying with the rate from year 0 to year 1, take max(S − I, 0) in each state, weight with ρ and discount at r<sub>f</sub>. The real probabilities are never needed.</p>
<div class="formula"><div class="eq">S = CF × A(n, r) &nbsp;&nbsp; A(n, r) = [1 − (1 + r)<sup>−n</sup>]/r</div><div class="eq">ρ = [(1 + r<sub>0→1</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; C<sub>0</sub> = [ρ·max(S<sub>u</sub> − I, 0) + (1 − ρ)·max(S<sub>d</sub> − I, 0)]/(1 + r<sub>0→1</sub>)</div><div class="eq">option to wait = C<sub>0</sub> − max(S<sub>0</sub> − I, 0)</div>
<div class="where">S<sub>0</sub> uses today's rate. S<sub>u</sub> and S<sub>d</sub> are values at date 1 at the new rates, with all n payments starting one year after you invest. The low-rate state is the up state, because a lower rate makes the same cash flows worth more. Check that 0 &lt; ρ &lt; 1 before you use it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>CF = 10 a year for 15 years, I = 105. Today's rate is 5%; next year it becomes 4% or 6%.</p><p>S<sub>0</sub> = 10 × 10.379658 = 103.7966, so NPV now = −1.2034. S<sub>u</sub> = 10 × 11.118387 = 111.1839, S<sub>d</sub> = 10 × 9.712249 = 97.1225.</p><p>ρ = (1.05 × 103.7966 − 97.1225)/(111.1839 − 97.1225) = (108.9864 − 97.1225)/14.0614 = 11.8639/14.0614 = 0.8437.</p><p>C<sub>u</sub> = 6.1839, C<sub>d</sub> = max(−7.8775, 0) = 0. C<sub>0</sub> = 0.8437 × 6.1839/1.05 = 5.2174/1.05 = 4.9690. Since NPV now is negative, the option to wait is worth 4.9690: wait.</p></div>`,
      q: `<p>A licence lets you build a solar park for 18.5 (NOK million), paid when you build. The park pays 2.0 a year for 12 years, starting one year after you build. The risk-free rate today is 4.5%. If you wait a year, the rate becomes 3% or 6% for good; the rate from year 0 to year 1 stays 4.5%, the cost is still 18.5 and the park still runs 12 years. An analyst puts the real probability of 3% at 0.5. What is the value today of the option to wait?</p>`,
      options: ["0.6737", "0.9826", "0.5338", "0.6305"],
      answer: 1,
      solution: `<p><b>Underlying.</b> S<sub>0</sub> = 2.0 × A(12, 4.5%) = 2.0 × 9.118581 = 18.2372, so NPV now = 18.2372 − 18.5 = −0.2628. S<sub>u</sub> = 2.0 × A(12, 3%) = 2.0 × 9.954004 = 19.9080. S<sub>d</sub> = 2.0 × A(12, 6%) = 2.0 × 8.383844 = 16.7677.</p><p><b>ρ.</b> (1.045 × 18.2372 − 16.7677)/(19.9080 − 16.7677) = (19.0579 − 16.7677)/3.1403 = 2.2902/3.1403 = 0.7293 (0.729271 unrounded).</p><p><b>Payoffs.</b> C<sub>u</sub> = max(19.9080 − 18.5, 0) = 1.4080. C<sub>d</sub> = max(16.7677 − 18.5, 0) = 0: you would not build.</p><p><b>Value.</b> C<sub>0</sub> = 0.729271 × 1.4080/1.045 = 1.0268/1.045 = 0.9826. Option to wait = 0.9826 − max(−0.2628, 0) = <b>0.9826</b>. Wait: waiting is worth 0.9826 against −0.2628 for building now.</p>`,
      check: `<p>Replication on the same tree: Δ = 1.408008/3.140320 = 0.448364, B = −16.767688 × 0.448364/1.045 = −7.194292, C<sub>0</sub> = 18.237162 × 0.448364 − 7.194292 = 8.176895 − 7.194292 = 0.982603 ✓. It uses the same tree, so it catches arithmetic slips only. A test from the bounds that can fail: the licence must be worth at least S<sub>0</sub> − I/1.045 = 18.237162 − 17.703349 = 0.5338, the value of committing today to build next year in both states. It must be worth at most S<sub>0</sub> = 18.2372. 0.9826 passes both. ρ = 0.7293 also lies between 0 and 1 ✓.</p>`,
      traps: [
        "Paired the analyst's real probability with the risk-free rate: 0.5 × 1.4080/1.045 = 0.7040/1.045 = 0.6737.",
        null,
        "Forgot that you are not forced to build: C<sub>d</sub> = 16.7677 − 18.5 = −1.7323 gives (1.0268 − 0.270729 × 1.7323)/1.045 = 0.5578/1.045 = 0.5338, the value of committing to build next year.",
        "Did not grow S<sub>0</sub> by 1.045 in ρ: (18.2372 − 16.7677)/3.1403 = 1.4695/3.1403 = 0.4679 (0.467938 unrounded), so C<sub>0</sub> = 0.467938 × 1.4080/1.045 = 0.6305.",
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
  intro: `<p>Credit risk has appeared on 8 of 11 papers, though not yet on Kurbatov's two. The older papers built long chained exercises on it: 2015 Problem 4 carried 90 points, while V2024 Problems 3 and 4 gave 28 points each to a CDS and to a merger with coinsurance. The ladder starts with a bond's yield, then turns equity into a call on the firm's assets and debt into risk-free debt minus a put. At the top you can price risky debt and a CDS, back out the market's default probability, compute option-based betas and split a merger's gains between four groups.</p>`,
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
      id: "kreditt-9",
      title: "The beta of equity as a call: N(d1) times V/E",
      theory: `<p>Equity is a call on the assets, so it moves with them by the option's delta: how much E changes when V changes by 1. In a tree the delta is Δ = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>); in Black-Scholes it is N(d<sub>1</sub>). A 1% move in V moves E by Δ·V/E per cent, so beta scales the same way. An exam that wants numbers must hand you N(d<sub>1</sub>) and N(d<sub>2</sub>), since the formula sheet has no N(d) table. Neither formula below is on the sheet.</p>
<div class="formula"><div class="eq">E = V·N(d<sub>1</sub>) − PV(F)·N(d<sub>2</sub>)</div><div class="eq">β<sub>E</sub> = N(d<sub>1</sub>)·(V/E)·β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = [1 − N(d<sub>1</sub>)]·(V/D)·β<sub>U</sub></div>
<div class="where">The first line is Black-Scholes applied to the firm's assets, with the face value as strike. β<sub>U</sub> is the beta of the assets. In a tree, replace N(d<sub>1</sub>) by Δ. Weighting the two betas by E/V and D/V returns β<sub>U</sub>, but that is an identity: it holds for any N(d<sub>1</sub>).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 800, PV(F) = 500, N(d<sub>1</sub>) = 0.8830, N(d<sub>2</sub>) = 0.7549, β<sub>U</sub> = 1.0.</p><p>E = 800 × 0.8830 − 500 × 0.7549 = 706.40 − 377.45 = 328.95. V/E = 800/328.95 = 2.431981.</p><p>β<sub>E</sub> = 0.8830 × 2.4320 × 1.0 = 2.1474.</p></div>`,
      q: `<p>A firm's assets are worth 900 and have a beta of 1.2. Its only debt is a zero-coupon bond whose face value has a present value of 600 at the risk-free rate. Black-Scholes on the assets gives N(d<sub>1</sub>) = 0.8556 and N(d<sub>2</sub>) = 0.7126. What is the equity beta?</p>`,
      options: ["3.1535", "2.6981", "2.2472", "3.0802"],
      answer: 1,
      solution: `<p>E = 900 × 0.8556 − 600 × 0.7126 = 770.04 − 427.56 = 342.48.</p><p>V/E = 900/342.48 = 2.6279.</p><p>β<sub>E</sub> = 0.8556 × 2.6279 × 1.2 = <b>2.6981</b>.</p>`,
      check: `<p>D = 900 − 342.48 = 557.52 and β<sub>D</sub> = 0.1444 × (900/557.52) × 1.2 = 0.2797. Weighted: (342.48/900)(2.6981) + (557.52/900)(0.2797) = 1.0267 + 0.1733 = 1.2000 = β<sub>U</sub>, an arithmetic check only. The bound that can fail: β<sub>E</sub> must lie below (V/E)β<sub>U</sub> = 3.1535, the value if the debt were riskless, because risky debt carries part of the asset risk.</p>`,
      traps: [
        "Left out N(d<sub>1</sub>): (900/342.48) × 1.2 = 3.1535. That is linear relevering with a zero debt beta.",
        null,
        "Used N(d<sub>2</sub>) where N(d<sub>1</sub>) belongs: 0.7126 × 2.6279 × 1.2 = 2.2472. N(d<sub>2</sub>) is a probability, not the delta.",
        "Valued equity as V − PV(F) = 300, as if the debt were risk-free: 0.8556 × (900/300) × 1.2 = 3.0802.",
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
      id: "kreditt-12",
      title: "Exam level: a debt-financed payout priced as options (2015 P4, 2022 P4)",
      theory: `<p>2015 Problem 4 (90 points) ran this chain on one firm: an all-equity firm issues zero-coupon debt and pays the proceeds out as a special dividend. Value the equity and the debt, then the yield and the credit spread, then the betas of both claims after the payout. 2022 Problem 4 (48 points) asked for the first links in a binomial tree. In a tree the delta Δ plays the role of N(d<sub>1</sub>). Close with D + E = V, which is MM I: the shareholder holds the dividend plus the levered shares.</p>
<div class="formula"><div class="eq">ρ → E, D → y = F/D − 1 → Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) → β<sub>E</sub> = Δ<sub>E</sub>(V/E)β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = (1 − Δ<sub>E</sub>)(V/D)β<sub>U</sub></div>
<div class="where">The debt's own delta is Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) = 1 − Δ<sub>E</sub>. The beta of the all-equity firm before the payout is β<sub>U</sub>. With Black-Scholes the exam hands you N(d<sub>1</sub>) and N(d<sub>2</sub>) and the chain is the same.</div></div>`,
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
  summary: "From the fair price of a new share to pooling, separating, the announcement drop and the pecking order",
  chapters: [12, 13],
  exam: "8 of 11 papers · not in H2024 or H2025",
  intro: `<p>Asymmetric information reached 8 of the 11 papers, almost always as one template: 2016 P1, 2017V P1, 2020 P2, 2022 P2 and 2023 P4, plus debt against equity in 2021 P1. Neither Kurbatov paper (H2024, H2025) used it, but it is still on the syllabus and the setup is not on the formula sheet. The ladder builds the template one piece at a time: the fair stake α, the old shareholders' payoff, the issue decision, the belief check, pooling and separating, the price reaction and the pecking order. At the top you can solve any of these exercises with new numbers.</p>`,
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
