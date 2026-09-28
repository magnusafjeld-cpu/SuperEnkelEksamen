/* kj1 · Cost of capital and the twin-firm routine */
window.EDU_DATA.kjerne.push({
  id: "kj1",
  num: 1,
  title: "Cost of capital and the twin-firm routine",
  chapters: [3, 4, 1],
  html: `
<p class="lead-in">Unlevering and relevering a twin firm has been in all eleven mapped papers. It opens H2024 Exercise 5 and H2025 Exercise 4, and every later step of those exercises uses the r<sub>U</sub> you find here, so one slip costs the whole chain.</p>
<h3>The CAPM, run both ways</h3>
<div class="formula"><div class="eq">r<sub>i</sub> = r<sub>f</sub> + β<sub>i</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>) &nbsp;⟺&nbsp; β<sub>i</sub> = (r<sub>i</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">On the formula sheet. The exam mostly runs it backwards: a twin's r<sub>E</sub> gives β<sub>E</sub>, its r<sub>D</sub> gives β<sub>D</sub>. Underline whether you were given the market return or the premium.</div></div>
<p>Only systematic risk is priced. Firm-specific risk disappears in a diversified portfolio at no cost, so nobody is paid to bear it; what survives is co-movement with the market, which β measures. Betas add with market-value weights, β<sub>P</sub> = Σ w<sub>i</sub>β<sub>i</sub>, and a firm is a portfolio of its equity and its debt.</p>
<h3>Three rates and one identity</h3>
<p>With market values E, D and V = E + D, owning all the equity and all the debt means owning the assets, whose required return is r<sub>U</sub>:</p>
<div class="formula"><div class="eq">r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = pre-tax WACC</div>
<div class="eq">β<sub>U</sub> = [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub></div>
<div class="where">The course weights β<sub>U</sub> without taxes. It assumes the firm rebalances to a target D/V, so the tax shield carries asset risk; under that convention the pre-tax WACC equals r<sub>U</sub>. The equality fails under fixed permanent debt.</div></div>
<p>Solve the weighting for the equity side and you get MM Proposition II, in rates or in betas:</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) &nbsp;·&nbsp; β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>)</div>
<div class="eq">r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V)r<sub>D</sub>τ<sub>c</sub></div>
<div class="where">MM II multiplies by D/E; the WACC weights are E/V and D/V. The after-tax WACC sits below r<sub>U</sub> only because interest is deductible.</div></div>
<div class="callout mech"><span class="h">Why does leverage raise r<sub>E</sub> but leave r<sub>U</sub> alone?</span>Leverage changes neither the assets' cash flows nor their risk, only who is paid first. Debt absorbs little of the swing in asset value, so the swing lands on a smaller equity base: more risk per krone, a higher r<sub>E</sub>, exactly enough to keep the average at r<sub>U</sub>. So two firms in the same business share r<sub>U</sub> whatever their debt.</div>
<p>Debt is risk-free only if it is repaid in every state. If the question quotes an expected return on debt r<sub>D</sub> above r<sub>f</sub> (not the promised yield, kj8), default risk is systematic and β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>) is positive. Setting it to zero drops a positive term from the weighting: it <b>understates</b> β<sub>U</sub>, r<sub>U</sub> and the WACC, and so <b>overvalues</b> the firm.</p>
<h3>The twin-firm routine</h3>
<ol>
<li>Read the twin's r<sub>E</sub>, r<sub>D</sub> and its market-value weights E/V and D/V.</li>
<li>CAPM backwards: β<sub>E</sub> and β<sub>D</sub> (β<sub>D</sub> = 0 only if the debt is risk-free).</li>
<li>Unlever with the twin's weights: β<sub>U</sub> = [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub>.</li>
<li>r<sub>U</sub> by the CAPM. Sanity line: the twin's weighted rates must return the same r<sub>U</sub>.</li>
<li>Convert your own target to D/E, and find your own β<sub>D</sub> from the r<sub>D</sub> you borrow at.</li>
<li>Relever: β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>), then r<sub>E</sub> by the CAPM; confirm with MM II.</li>
<li>After-tax WACC with your own weights.</li>
</ol>
<div class="worked"><span class="wh">Worked example: from a twin to your WACC</span>
<p>A listed twin has E = 750 and D = 250, r<sub>E</sub> = 12.0000% and r<sub>D</sub> = 4.5000%. r<sub>f</sub> = 3.0000%, market risk premium 5.0000%. Your division targets D/V = 0.40, borrows at 4.5000%, and τ<sub>c</sub> = 22%.</p>
<p><b>Steps 1–2.</b> E/V = 0.7500, D/V = 0.2500. β<sub>E</sub> = (0.1200 − 0.0300)/0.0500 = 1.8000; β<sub>D</sub> = (0.0450 − 0.0300)/0.0500 = 0.3000.</p>
<p><b>Steps 3–4.</b> β<sub>U</sub> = 0.7500(1.8000) + 0.2500(0.3000) = 1.3500 + 0.0750 = 1.4250. r<sub>U</sub> = 0.030000 + 1.4250(0.050000) = 0.030000 + 0.071250 = 0.101250 = <b>10.1250%</b>. Sanity: 0.7500(0.1200) + 0.2500(0.0450) = 0.090000 + 0.011250 = 0.101250 ✓</p>
<p><b>Steps 5–6.</b> D/E = 0.40/0.60 = 0.666667, own β<sub>D</sub> = 0.3000. β<sub>E</sub> = 1.4250 + 0.666667(1.4250 − 0.3000) = 1.4250 + 0.7500 = 2.1750; r<sub>E</sub> = 0.030000 + 2.1750(0.050000) = 0.138750 = <b>13.8750%</b>. MM II: 0.101250 + 0.666667(0.101250 − 0.045000) = 0.101250 + 0.037500 = 0.138750 ✓</p>
<p><b>Step 7.</b> r<sub>wacc</sub> = 0.6000(0.138750) + 0.4000(0.045000)(0.78) = 0.083250 + 0.014040 = 0.097290 = <b>9.7290%</b>.</p>
<p><b>Check:</b> the sanity line in step 4 can fail, because it reaches r<sub>U</sub> through rates, not betas. It catches a β<sub>D</sub> that contradicts r<sub>D</sub> and arithmetic slips, not misread weights, which both routes share. Set β<sub>D</sub> = 0 and the betas give r<sub>U</sub> = 9.7500% against 10.1250% from the rates; uncaught, the error cuts the WACC to 9.3540% and overvalues the division. Check 2 on your own numbers, 0.6000(2.1750) + 0.4000(0.3000) = 1.4250, holds by construction.</p></div>
<div class="callout warn"><span class="h">Where the points go</span><ul>
<li><b>D/E versus D/V.</b> D/V = 0.40 means D/E = 0.6667 in MM II, not 0.40.</li>
<li><b>No (1 − τ<sub>c</sub>) in the unlevering.</b> Some textbooks weight debt by D(1 − τ<sub>c</sub>); this course does not, and that version breaks WACC = APV.</li>
<li><b>Reprice r<sub>D</sub> when leverage changes.</b> With r<sub>f</sub> = 3%, a 5% premium, β<sub>U</sub> = 1.20 and a move to D/E = 1, a bank rate of 5.5000% (β<sub>D</sub> = 0.50) gives r<sub>E</sub> = 12.5000%. Keep the old 4.5000% (β<sub>D</sub> = 0.30) and you get 13.5000%, yet check 2 and pre-tax WACC = r<sub>U</sub> both still pass. They verify algebra, not assumptions.</li>
<li><b>Market values, not book values,</b> in every weight.</li>
</ul></div>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>β<sub>U</sub> = [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub>, with no (1 − τ<sub>c</sub>); under this course's rebalancing convention, pre-tax WACC = r<sub>U</sub>.</li>
<li>Twin-firm routine: twin's r<sub>E</sub>, r<sub>D</sub> → β<sub>E</sub>, β<sub>D</sub> → β<sub>U</sub> with the twin's weights → r<sub>U</sub> → relever with your own D/E and own r<sub>D</sub> → r<sub>E</sub> → r<sub>wacc</sub>.</li>
<li>MM II multiplies by D/E, not D/V: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>).</li>
<li>β<sub>D</sub> = 0 on risky debt understates β<sub>U</sub>, r<sub>U</sub> and the WACC, and overvalues the firm.</li>
<li>Reprice r<sub>D</sub> and β<sub>D</sub> when leverage changes, and use market values in every weight.</li></ul></div>
`,
  checks: [
    {
      id: "kj1-s1",
      q: "A twin firm borrows at an r<sub>D</sub> above r<sub>f</sub>, but you set its β<sub>D</sub> = 0 when unlevering. Everything else is done correctly. Your value of the division comes out…",
      options: [
        "too low, because β<sub>U</sub> and r<sub>U</sub> come out too high",
        "unaffected, because β<sub>D</sub> cancels out when you relever",
        "too high, because β<sub>U</sub>, r<sub>U</sub> and the WACC all come out too low",
        "too low, because putting all the risk on equity raises r<sub>E</sub>",
      ],
      answer: 2,
      explanation: "Setting β<sub>D</sub> = 0 drops the positive term [D/V]β<sub>D</sub> from the weighting, so β<sub>U</sub> is understated, and with it r<sub>U</sub> and the WACC. A discount rate that is too low overvalues the division. The answer about r<sub>E</sub> confuses the twin's observed β<sub>E</sub> with your relevered one, which starts from the understated β<sub>U</sub>.",
    },
    {
      id: "kj1-s2",
      q: "r<sub>U</sub> = 10%, r<sub>D</sub> = 5%, τ<sub>c</sub> = 22%, and the firm targets D/V = 0.20. Under this course's conventions, r<sub>E</sub> is…",
      options: [
        "11.0000%",
        "11.2500%",
        "10.9750%",
        "10.0000%, since leverage does not change the cost of capital",
      ],
      answer: 1,
      explanation: "MM II multiplies by D/E, and D/V = 0.20 means D/E = 0.20/0.80 = 0.25, so r<sub>E</sub> = 0.10 + 0.25(0.10 − 0.05) = 0.1125. Plugging in 0.20 gives 11.0000%, the D/V slip. Multiplying by (1 − τ<sub>c</sub>) gives 10.9750%, the textbook variant for fixed permanent debt, which the course's rebalancing convention rejects. It is r<sub>U</sub>, not r<sub>E</sub>, that leverage leaves unchanged.",
    },
    {
      id: "kj1-s3",
      q: "You relevered β<sub>U</sub> to your own D/E, then computed [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> for your own firm and got β<sub>U</sub> back. What has this shown?",
      options: [
        "That β<sub>U</sub> was estimated correctly from the twin, since re-weighting returns it exactly",
        "That you used the right r<sub>D</sub> after the change in leverage",
        "Only that the arithmetic is consistent; it holds whatever β<sub>U</sub> you used",
        "That the value by WACC will equal the value by APV",
      ],
      answer: 2,
      explanation: "Relevering is the weighting identity solved for β<sub>E</sub>, so re-weighting returns the β<sub>U</sub> you started from even with a wrong β<sub>U</sub> or a stale r<sub>D</sub>. It checks arithmetic only. The check that can fail is on the twin: its weighted rates must return the r<sub>U</sub> you got through its betas.",
    },
  ],
  case: {
    id: "kj1-m1",
    open: true,
    topic: "Twin firm with risky debt, and the zero debt beta error",
    points: 6,
    minutes: 10,
    body: `<p>Your firm is setting up a packaging division and needs its cost of capital. Kvitfjell Emballasje ASA is listed and in the same business: equity worth NOK 1,200 million, debt worth NOK 600 million, cost of equity 13.5000% and expected return on debt 5.4000%. The risk-free rate is 3.0000% and the market risk premium 6.0000%. The division will keep a target debt-to-value ratio of 0.25 and can borrow at an expected return of 4.2000%. The corporate tax rate is 22%. Give rates to 4 decimal places.</p>
<p>(a) Find Kvitfjell's equity beta, debt beta and unlevered beta, and the unlevered cost of capital r<sub>U</sub>. Verify r<sub>U</sub> by a second route. (2 points)</p>
<p>(b) Find the division's equity beta, cost of equity and after-tax WACC. Confirm the cost of equity with MM Proposition II. (2 points)</p>
<p>(c) A colleague sets Kvitfjell's debt beta to zero but otherwise follows your steps, using the division's own debt beta correctly. Find his r<sub>U</sub> and his after-tax WACC for the division, and state the direction of his error in the division's value. (2 points)</p>`,
    solution: `<p><b>(a) Unlever the twin.</b> E/V = 1200/1800 = 0.666667, D/V = 0.333333. CAPM backwards: β<sub>E</sub> = (0.1350 − 0.0300)/0.0600 = 1.7500 and β<sub>D</sub> = (0.0540 − 0.0300)/0.0600 = 0.4000, positive because Kvitfjell borrows above r<sub>f</sub>. β<sub>U</sub> = 0.666667(1.7500) + 0.333333(0.4000) = 1.1667 + 0.1333 = 1.3000. r<sub>U</sub> = 0.030000 + 1.3000(0.060000) = 0.030000 + 0.078000 = 0.108000 = <b>10.8000%</b>. Second route, the twin's pre-tax WACC: 0.666667(0.1350) + 0.333333(0.0540) = 0.090000 + 0.018000 = 0.108000 ✓</p>
<p><b>(b) Relever to the division.</b> D/V = 0.25 gives D/E = 0.25/0.75 = 0.333333. Own β<sub>D</sub> = (0.0420 − 0.0300)/0.0600 = 0.2000. β<sub>E</sub> = 1.300000 + 0.333333(1.300000 − 0.200000) = 1.300000 + 0.366667 = 1.666667, so r<sub>E</sub> = 0.030000 + 1.666667(0.060000) = 0.030000 + 0.100000 = 0.130000 = <b>13.0000%</b>. MM II: 0.108000 + 0.333333(0.108000 − 0.042000) = 0.108000 + 0.022000 = 0.130000 ✓. r<sub>wacc</sub> = 0.75(0.130000) + 0.25(0.042000)(0.78) = 0.097500 + 0.008190 = 0.105690 = <b>10.5690%</b>. Check 2 here, 0.75(1.6667) + 0.25(0.2000) = 1.3000, holds by construction; the check that could fail was the second route in (a).</p>
<p><b>(c) The β<sub>D</sub> = 0 error.</b> β<sub>U</sub> = 0.666667(1.7500) = 1.166667, so r<sub>U</sub> = 0.030000 + 1.166667(0.060000) = 0.030000 + 0.070000 = 0.100000 = <b>10.0000%</b>. MM II: r<sub>E</sub> = 0.100000 + 0.333333(0.100000 − 0.042000) = 0.100000 + 0.019333 = 0.119333, and r<sub>wacc</sub> = 0.75(0.119333) + 0.008190 = 0.089500 + 0.008190 = 0.097690 = <b>9.7690%</b>. Dropping the positive term [D/V]β<sub>D</sub> understates β<sub>U</sub>, r<sub>U</sub> and the WACC, each rate by 0.8000 percentage points, so he <b>overvalues</b> the division. His own r<sub>U</sub> would also fail the second route in (a), which still gives 10.8000%.</p>`,
    criteria: [
      "beta_E = 1.7500, beta_D = 0.4000, beta_U = 1.3000 and r_U = 10.8000%, confirmed by the twin's pre-tax WACC",
      "Relevered at D/E = 0.3333 with the division's own beta_D = 0.2000: r_E = 13.0000%, matching MM II",
      "r_wacc = 0.097500 + 0.008190 = 10.5690%",
      "With beta_D = 0: r_U = 10.0000% and r_wacc = 9.7690%, both too low, so the division is overvalued",
    ],
  },
});
