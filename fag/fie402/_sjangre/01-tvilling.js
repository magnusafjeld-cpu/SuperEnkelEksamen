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
      id: "tvilling-2",
      title: "The CAPM backwards: beta from a return",
      theory: `<p>The exam rarely hands you a beta. It hands you a return, usually a comparable firm's cost of equity. You must recover the beta behind it. Rearrange the CAPM: the asset's excess return divided by the market's excess return.</p>
<div class="formula"><div class="eq">β = (r − r<sub>f</sub>) / (E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">The same rearrangement works on equity (r<sub>E</sub> gives β<sub>E</sub>), on debt (r<sub>D</sub> gives β<sub>D</sub>) and on the whole business (r<sub>U</sub> gives β<sub>U</sub>). Only systematic risk is priced: an asset whose risk is all diversifiable has β = 0 and earns r<sub>f</sub>, however volatile it is.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>f</sub> = 2%, E[R<sub>mkt</sub>] = 7%, r<sub>E</sub> = 10%.</p><p>Premium = 7% − 2% = 5%. Excess return on the stock = 10% − 2% = 8%.</p><p>β<sub>E</sub> = 8% / 5% = 1.60.</p></div>`,
      q: `<p>The risk-free rate is 3.5% and the expected return on the market is 9.5%. Investors require 11.9% on a stock. What is the stock's beta?</p>`,
      options: ["0.40", "0.88", "1.40", "1.98"],
      answer: 2,
      solution: `<p>Market risk premium = 9.5% − 3.5% = 6%.</p><p>Excess return on the stock = 11.9% − 3.5% = 8.4%.</p><p>β<sub>E</sub> = 8.4% / 6% = <b>1.40</b>.</p>`,
      check: `<p>Run the CAPM forwards: 3.5% + 1.40 × 6% = 3.5% + 8.4% = 11.9%, the return you started from. A required return above the market's 9.5% must come with a beta above 1: 1.40 does.</p>`,
      traps: [
        "Measured the stock's excess return over the market instead of over r<sub>f</sub>: (11.9% − 9.5%) / 6% = 0.40.",
        "Divided by the market return instead of the premium: 8.4% / 9.5% = 0.88.",
        null,
        "Forgot to subtract the risk-free rate from the stock's return: 11.9% / 6% = 1.98.",
      ],
    },
    {
      id: "tvilling-3",
      title: "The CAPM backwards: the market risk premium from a known pair",
      theory: `<p>Sometimes the exam gives you one asset whose beta and expected return you both know but leaves the market out. One known pair pins down the slope of the security market line. That slope is the market risk premium. Add r<sub>f</sub> to the premium and you have the expected market return.</p>
<div class="formula"><div class="eq">E[R<sub>mkt</sub>] − r<sub>f</sub> = (r<sub>i</sub> − r<sub>f</sub>) / β<sub>i</sub></div>
<div class="where">The premium is the reward per unit of beta, so it is the same for every asset. Keep the premium and the market return apart: a premium of 6% with r<sub>f</sub> = 3% means a market return of 9%.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>f</sub> = 3%. A stock with β = 0.80 has an expected return of 7%.</p><p>Premium = (7% − 3%) / 0.80 = 4% / 0.80 = 5%.</p><p>E[R<sub>mkt</sub>] = 3% + 5% = 8%.</p></div>`,
      q: `<p>The risk-free rate is 2.5%. A stock with a beta of 1.25 has an expected return of 10%. What expected return on the market portfolio does this imply?</p>`,
      options: ["8.50%", "6.00%", "11.88%", "8.00%"],
      answer: 0,
      solution: `<p>Premium = (10% − 2.5%) / 1.25 = 7.5% / 1.25 = 6%.</p><p>E[R<sub>mkt</sub>] = 2.5% + 6% = <b>8.50%</b>.</p>`,
      check: `<p>Put the stock back on the line: 2.5% + 1.25 × (8.5% − 2.5%) = 2.5% + 7.5% = 10%. A beta above 1 must earn more than the market: 10% is above 8.5%.</p>`,
      traps: [
        null,
        "Reported the premium, not the market return: (10% − 2.5%) / 1.25 = 6.00%.",
        "Multiplied the excess return by beta instead of dividing: 2.5% + 1.25 × 7.5% = 11.875%, which rounds to 11.88%.",
        "Divided the whole return by beta and forgot the risk-free rate: 10% / 1.25 = 8.00%.",
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
      theory: `<p>Debt is only risk-free if it is repaid in every state. When debt is expected to return more than r<sub>f</sub>, part of its default risk is systematic, so it has a positive beta. Get it from the CAPM backwards, as you did for equity. Then keep it in the weighting.</p>
<div class="formula"><div class="eq">β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>) / (E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="eq">β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub></div>
<div class="where">r<sub>D</sub> is the expected return on the debt. Setting β<sub>D</sub> = 0 when r<sub>D</sub> &gt; r<sub>f</sub> drops a positive term, so it understates β<sub>U</sub> and every discount rate built on it. The firm then looks more valuable than it is.</div></div>`,
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
      id: "tvilling-8",
      title: "Relevering beta to your own capital structure",
      theory: `<p>Once you have the business risk β<sub>U</sub>, you put your own financing back on. Rearranging the beta weighting gives the equity beta at any leverage. Use your own target D/E and your own debt beta, never the twin's. Then turn β<sub>E</sub> into r<sub>E</sub> with the CAPM.</p>
<div class="formula"><div class="eq">β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>)</div>
<div class="where">With risk-free debt this is β<sub>E</sub> = β<sub>U</sub>(1 + D/E). More debt puts the same business risk on a smaller equity base, so β<sub>E</sub> rises with D/E. A positive β<sub>D</sub> means the lenders carry part of that risk, which holds β<sub>E</sub> down.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>β<sub>U</sub> = 1.00. Your D/E = 0.50 and your β<sub>D</sub> = 0.20. r<sub>f</sub> = 3%, premium 5%.</p><p>β<sub>E</sub> = 1.00 + 0.50 × (1.00 − 0.20) = 1.00 + 0.40 = 1.40.</p><p>r<sub>E</sub> = 3% + 1.40 × 5% = 10%.</p></div>`,
      q: `<p>A twin with a debt-to-equity ratio of 1.00 has an unlevered beta of 0.90. Your firm is in the same business and targets a debt-to-value ratio of 0.40, with a debt beta of 0.15. The risk-free rate is 2% and the market risk premium is 5%. Relever the beta to your firm and find your cost of equity, to four decimals.</p>`,
      options: ["8.0000%", "9.0000%", "9.5000%", "10.2500%"],
      answer: 1,
      solution: `<p>Your D/E = 0.40/0.60 = 2/3.</p><p>β<sub>E</sub> = 0.90 + (2/3) × (0.90 − 0.15) = 0.90 + (2/3) × 0.75 = 0.90 + 0.50 = 1.40.</p><p>r<sub>E</sub> = 2% + 1.40 × 5% = 2% + 7% = <b>9.0000%</b>.</p>`,
      check: `<p>Weight your own betas back: 0.60 × 1.40 + 0.40 × 0.15 = 0.84 + 0.06 = 0.90 = β<sub>U</sub>. That only confirms the arithmetic, since β<sub>E</sub> was built from β<sub>U</sub>. The returns must agree too: r<sub>U</sub> = 2% + 0.90 × 5% = 6.5% and r<sub>D</sub> = 2% + 0.15 × 5% = 2.75%. Then 0.60 × 9% + 0.40 × 2.75% = 5.40% + 1.10% = 6.50% = r<sub>U</sub>.</p>`,
      traps: [
        "Used D/V = 0.40 in place of D/E: β<sub>E</sub> = 0.90 + 0.40 × 0.75 = 1.20, so r<sub>E</sub> = 8.0000%.",
        null,
        "Ignored your own debt beta: β<sub>E</sub> = 0.90 × (1 + 2/3) = 1.50, so r<sub>E</sub> = 9.5000%.",
        "Relevered with the twin's D/E of 1.00: β<sub>E</sub> = 0.90 + 1.00 × 0.75 = 1.65, so r<sub>E</sub> = 10.2500%.",
      ],
    },
    {
      id: "tvilling-9",
      title: "MM Proposition II: relevering the cost of equity",
      theory: `<p>This is the relevering of the previous step written in returns instead of betas. If you have r<sub>U</sub> and your own r<sub>D</sub>, MM Proposition II, which is on the formula sheet, gives r<sub>E</sub> directly. The multiplier is D/E, not D/V. When the firm keeps a target D/E the formula holds with corporate taxes too, so no (1 − τ<sub>c</sub>) enters.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">Equity holders earn r<sub>U</sub> plus a premium for financial risk. The premium grows with D/E and with the spread between r<sub>U</sub> and what the lenders earn. Use your own D/E and your own r<sub>D</sub>.</div></div>`,
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
