/* ===================== FIE402 · KJERNEPENSUM =====================
   Det viktigste i faget på én kveld: en kort gjennomgang av det som kommer på
   eksamen, organisert etter eksamensblokkene og ikke etter kapitlene. Hver del
   har raske sjekker (flervalg med forklaring) og en kort minicase i
   eksamensformat. Teksten er en nedkorting av manualen, ikke nytt stoff.

   id-ene (kjN, kjN-sM, kjN-m1) er lagringsnøkler. De må aldri endres; en del
   eller et spørsmål som skrives om, får ny id (fallgruve 7s).

   BYGGET FIL — ikke rediger her. Delene ligger i _kjerne/kjN.js, og settes
   sammen med: python3 tools/bygg-kjerne.py fie402
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.kjerne = [];

/* kj0 · The exam in one page */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "The exam in one page",
  chapters: [0, 28],
  html: `
<p class="lead-in">This is the paper Andrey Kurbatov set in H2024 and H2025, and the one you will sit: what is on it, how it is marked, and how to use the parts that follow.</p>
<h3>The format</h3>
<ul>
<li>Six exercises, 100 points, three hours. Closed book, pen and paper, a calculator, answered in English. No multiple choice since 2024.</li>
<li>Points are printed per sub-question: about 1.8 minutes per point, so a 12-point exercise gets about 20 minutes.</li>
<li>Two exercises are verbal, 12 points each, with sentence budgets ("2–3 sentences per action"). Governance has been one of them every time (kj11).</li>
<li>Sub-questions chain: (b) uses (a). Carry four decimals on rates. If a step will not come, write it as a symbol or a labelled assumption and carry on; later steps are marked on method.</li>
</ul>
<h3>What recurs</h3>
<table class="data">
<tr><th>Topic</th><th>Papers of 11</th><th>Part</th></tr>
<tr><td>Twin firm: unlever and relever β, CAPM, MM II</td><td class="n">11</td><td>kj1</td></tr>
<tr><td>MM I and II in perfect markets, recapitalisation</td><td class="n">11</td><td>kj2</td></tr>
<tr><td>WACC and APV on the same case</td><td class="n">11</td><td>kj4</td></tr>
<tr><td>Real options</td><td class="n">8</td><td>kj9</td></tr>
<tr><td>M&amp;A: share exchange, premium, deal probability</td><td class="n">8</td><td>kj10</td></tr>
<tr><td>Debt and equity as options, credit risk</td><td class="n">8</td><td>kj8</td></tr>
<tr><td>Asymmetric information, Myers-Majluf</td><td class="n">8</td><td>kj6</td></tr>
</table>
<p>The last two are absent from both Kurbatov papers but still on the syllabus.</p>
<h3>How to score</h3>
<p>On every quantitative sub-question: <b>state the method</b> in one sentence, <b>show the computation</b> with the numbers substituted (no calculation, no points), <b>name the mechanism</b> ("this is debt overhang"), and <b>run the check</b>. The examiner uses five checks, and every part refers to them by number:</p>
<ol>
<li>Value by WACC = value by APV</li>
<li>[E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> = β<sub>U</sub></li>
<li>Creditors' gain + shareholders' gain = the project's NPV</li>
<li>Creditors' gain = shareholders' loss when total value is fixed</li>
<li>Are investors' beliefs rational given the action taken?</li>
</ol>
<p>Check 5 is the one candidates skip. Before you tick a check, ask which wrong number would break it; a check that cannot fail proves nothing.</p>
<h3>The formula sheet</h3>
<p>It gives FCF from EBIT, the perpetuity and growing perpetuity, the CAPM, MM II, the β<sub>U</sub> weighting, both WACCs, binomial replication and the M&amp;A stock-swap NPVs. Memorise the rest:</p>
<ul>
<li>V<sup>L</sup> = V<sup>U</sup> + PV(TS), and which rate discounts the shield (kj3, kj4)</li>
<li>D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub> and the debt adjustment between periods (kj4)</li>
<li>put-call parity (kj7)</li>
<li>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub> (kj8)</li>
<li>the Myers-Majluf setup and its rationality check (kj6)</li>
<li>everything about real options, including the annuity C·[1 − (1 + r)<sup>−n</sup>]/r (kj9)</li>
</ul>
<h3>How to use this path</h3>
<p>Parts kj1 to kj4 are one chain, the valuation machine: read them in order. Parts kj5 to kj11 stand alone, in any order. Write each minicase on paper before you open the solution.</p>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Six exercises, 100 points, three hours: about 1.8 minutes per point, two 12-point verbal exercises, and governance every time.</li>
<li>On every quantitative sub-question: state the method, show the numbers, name the mechanism, run the check.</li>
<li>The five checks: (1) value by WACC = value by APV; (2) [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> = β<sub>U</sub>; (3) creditors' gain + shareholders' gain = the project's NPV; (4) creditors' gain = shareholders' loss when total value is fixed; (5) investors' beliefs are rational given the action taken.</li>
<li>Not on the formula sheet: V<sup>L</sup> = V<sup>U</sup> + PV(TS) and the rate on the shield, D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub>, put-call parity, the annuity, β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub>, the Myers-Majluf setup and all of real options.</li></ul></div>
`,
  checks: [
    {
      id: "kj0-s1",
      q: "In an asymmetric-information exercise you have computed α and shown which type of firm would issue equity. What does the examiner still expect before you finish?",
      options: [
        "Check 3: that the creditors' and shareholders' gains sum to the project's NPV",
        "Check 5: that investors' beliefs are rational given which types actually issue",
        "Nothing more: α and the issue decision are the full answer",
        "Check 1: that the value by WACC equals the value by APV",
      ],
      answer: 1,
      explanation: "The α you computed rests on what investors believe, and the outcome is an equilibrium only if those beliefs match who actually issues. That is check 5, and the keys single it out as the step candidates skip. Checks 1 and 3 are real checks, but they belong to levered valuation and to agency problems, not to an issue decision under private information.",
    },
    {
      id: "kj0-s2",
      q: "Part (a) of a chained exercise will not come out, and parts (b) to (d) need its answer. What is the best move?",
      options: [
        "State the missing number as a labelled assumption and carry on with (b) to (d)",
        "Leave the whole exercise, since the later parts cannot be right without (a)",
        "Stay on (a) until it is solved, because everything after it depends on it",
        "Pick a plausible number and use it without comment, so the answer looks complete",
      ],
      answer: 0,
      explanation: "Later steps are marked on method, so a stated assumption turns an unanswerable chain into an answerable one at the cost of the marks for (a). Staying on (a) burns the budget of about 1.8 minutes per point. An unlabelled invented number reads as an error, not as a consistent assumption.",
    },
  ],
});

/* kj1 · Cost of capital and the twin-firm routine */
window.EDU_DATA.kjerne.push({
  id: "kj1",
  num: 1,
  title: "Cost of capital and the twin-firm routine",
  chapters: [3, 4, 1],
  html: `
<div class="callout kort"><span class="h">In short</span>Every valuation needs a discount rate. This part is about finding it. The CAPM turns risk, measured by beta, into a required return. The catch is that a firm's beta depends on how much debt it has, so you cannot borrow a comparable firm's number directly. Instead you strip the comparable's debt out to get the risk of the business alone (unlevering), then add your own firm's debt back in (relevering). That business-only rate, r<sub>U</sub>, feeds everything that follows.</div>

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

/* kj2 · Modigliani-Miller, recapitalisations and payout */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Modigliani-Miller, recapitalisations and payout",
  chapters: [6, 15, 16],
  html: `
<div class="callout kort"><span class="h">In short</span>Modigliani and Miller's starting point: in a perfect market, with no taxes, no distress costs and everyone holding the same information, it does not matter how a firm is financed or how it pays out cash. Value comes from the business, not from how the claims on it are sliced. This part runs that idea through one concrete event: the firm borrows and pays the money out as a buyback or a special dividend. You follow the share price and each shareholder's wealth step by step and see that no value is created. Then come the frictions (taxes, signalling, agency costs) that make payout policy matter after all.</div>

<p class="lead-in">H2024 Exercise 3 and H2025 Exercise 3 were this part alone, 18 points each: a perfect-market firm issues debt, pays it out as a buyback or a special dividend, and you price every step and compare the seller with the holder. MM appears in all eleven mapped papers, payout in seven.</p>
<h3>MM in a perfect market</h3>
<p>A perfect capital market means: no taxes; no transaction, issuance or distress costs; investment and cash flows that do not depend on financing; the same information for everyone; and investors who borrow, lend and trade on the same terms as firms.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = E + D = V<sup>U</sup></div>
<div class="where">MM Proposition I. Financing divides the cash flow of the assets; it does not enlarge it.</div></div>
<p>The argument is homemade leverage. If a levered firm were worth more than an identical unlevered one, you could copy its equity by buying unlevered shares and borrowing on your own account in the same proportion: the same payoff in every state, at a lower cost. Investors would sell the levered equity and buy the copy until the gap closed. Nobody pays a firm for leverage they can make themselves.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">MM Proposition II, on the formula sheet. Risk moves to equity, so r<sub>E</sub> rises with D/E; the pre-tax WACC stays at r<sub>U</sub>.</div></div>
<div class="callout mech"><span class="h">Why does r<sub>E</sub> rise without making anyone poorer?</span>Debt is paid first and absorbs little of the swing in asset value, so the swing lands on a smaller equity base. The higher r<sub>E</sub> compensates exactly for that risk, with a higher expected payout per krone of equity, so the shareholder's wealth does not move. It is not bad news.</div>
<h3>The recapitalisation, move by move</h3>
<p>A leveraged recapitalisation issues debt D<sub>new</sub> and hands the cash to shareholders. V is unchanged, so equity falls by exactly D<sub>new</sub>:</p>
<div class="formula"><div class="eq">repurchase: n = D<sub>new</sub>/P · N<sub>1</sub> = N<sub>0</sub> − n · price unchanged</div>
<div class="eq">special dividend: DPS = D<sub>new</sub>/N<sub>0</sub> · P<sub>ex</sub> = P<sub>0</sub> − DPS · N unchanged</div>
<div class="eq">both: E<sub>1</sub> = V − D<sub>new</sub> · r<sub>E</sub> = r<sub>U</sub> + (D<sub>new</sub>/E<sub>1</sub>)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">P is the post-announcement price the shares are bought at; here it equals P<sub>0</sub>, with taxes it does not (kj3). D/E, and so r<sub>E</sub>, is the same on both routes. Use the r<sub>D</sub> lenders quote at the new leverage.</div></div>
<div class="callout mech"><span class="h">Announcement and execution are different events</span>The announcement is when the market learns the plan, so it is the only moment news can move the price; a later ex-dividend drop is just the cash leaving. Without taxes the plan creates nothing, so there is nothing to price. Execution swaps cash for shares, or pays cash out, at prices already set: it changes the form of wealth, not its size.</div>
<div class="worked"><span class="wh">Worked example: one recapitalisation, both routes</span>
<p>An all-equity firm, no taxes. FCF 90.00 a year in perpetuity, all paid out; r<sub>U</sub> = 9.0000%; 40 million shares. It announces 400.00 of permanent risk-free debt at r<sub>D</sub> = 4.0000%, all proceeds to shareholders. Millions of kroner.</p>
<p><b>Step 1, before.</b> V = 90.00/0.090000 = 1000.00, P<sub>0</sub> = 1000.00/40 = 25.00, DPS = 90.00/40 = 2.25.</p>
<p><b>Step 2, announcement.</b> No taxes, no costs, assets unchanged: V stays 1000.00 and the price stays 25.00 (MM I).</p>
<p><b>Step 3, after, both routes.</b> E<sub>1</sub> = 1000.00 − 400.00 = 600.00, D/E = 0.666667. r<sub>E</sub> = 0.090000 + 0.666667(0.090000 − 0.040000) = 0.090000 + 0.033333 = <b>12.3333%</b>. Equity receives 90.00 − 0.04(400.00) = 74.00 a year.</p>
<p><b>Step 4, repurchase.</b> n = 400.00/25.00 = 16 million, leaving 24 million at 600.00/24 = 25.00. New DPS = 74.00/24 = 3.0833.</p>
<p><b>Step 5, special dividend instead.</b> DPS = 400.00/40 = 10.00, so P<sub>ex</sub> = 25.00 − 10.00 = 15.00. Ongoing DPS = 74.00/40 = 1.85.</p>
<table class="data">
<tr><th>One share before</th><th>Holds</th><th>Cash</th><th>Wealth</th></tr>
<tr><td>No recapitalisation</td><td>2.25 a year at 9.0000%</td><td class="n">0.00</td><td class="n">25.00</td></tr>
<tr><td>Special dividend</td><td>1.85 a year at 12.3333%</td><td class="n">10.00</td><td class="n">25.00</td></tr>
<tr><td>Tenders into the buyback</td><td>nothing</td><td class="n">25.00</td><td class="n">25.00</td></tr>
<tr><td>Holds through the buyback</td><td>3.0833 a year at 12.3333%</td><td class="n">0.00</td><td class="n">25.00</td></tr>
</table>
<p><b>Check:</b> 3.0833/0.123333 = 25.00 and 1.85/0.123333 = 15.00 ✓. These can fail: discount 3.0833 at the old 9.0000% and you get 34.26. P = E<sub>1</sub>/N<sub>1</sub> cannot, since n was defined as D<sub>new</sub>/P.</p></div>
<p>The investor is indifferent because he can convert one route into the other himself. Under the buyback, a holder who wants cash sells shares at 25.00. Under the dividend, a holder who wants none reinvests 10.00 at the ex-dividend price of 15.00, buys 0.6667 shares, and owns 1.6667 of 40 million shares, the same fraction as 1 of 24 million. Selling shares for cash is a homemade dividend; reinvesting a dividend undoes one.</p>
<h3>Payout in a perfect market</h3>
<p>With investment fixed, a dividend and a repurchase are equivalent. A dividend lowers the price and keeps the share count; a repurchase keeps the price and lowers the count. EPS changes, value does not: in the example EPS (all paid out, so equal to DPS) rises from 2.25 to 3.0833 after the buyback, yet the price stays 25.00, because r<sub>E</sub> rose from 9.0000% to 12.3333%. The ex-dividend drop is no loss either: the holder has the difference in cash.</p>
<div class="callout warn"><span class="h">Errors that lose points</span><ul>
<li>Say <b>why</b> the price holds ("no taxes, so the recapitalisation is purely financial, MM I"), not only that it does.</li>
<li>Buy back at the post-announcement price; reinvest a dividend at the ex-dividend price, not the cum price.</li>
<li>If the new loan first repays old debt, only D<sub>new</sub> − D<sub>old</sub> reaches shareholders, while MM II uses the total new debt (H2024 Exercise 3).</li>
<li>Relever: discount the new DPS at the new r<sub>E</sub>, built with the new r<sub>D</sub>.</li>
<li>"r<sub>E</sub> rose, so shareholders lost", "the price fell ex-dividend, so value was destroyed" and "EPS rose, so value was created" are all wrong in a perfect market.</li>
</ul></div>
<h3>Payout with frictions</h3>
<p>Any real price reaction to a payout must come from a named friction:</p>
<table class="data">
<tr><th>Friction</th><th>Mechanism</th><th>Favours</th></tr>
<tr><td>Taxes</td><td>A dividend is taxed in full, for every holder, at once. A repurchase taxes only the gain, only for sellers, at the gains rate, and defers the rest. With τ<sub>d</sub> above τ<sub>g</sub> the ex-dividend drop is only Div(1 − τ<sub>d</sub>)/(1 − τ<sub>g</sub>).</td><td>Repurchases</td></tr>
<tr><td>Clienteles</td><td>Investors sort by tax rate; tax-exempt holders take the high payers. The marginal investor is then indifferent, but serving a clientele already served creates nothing.</td><td>What the holders want</td></tr>
<tr><td>Signalling</td><td>Managers know more. Dividends are smoothed: set at a sustainable level, raised slowly, cut only under pressure, so a rise is good news and a cut very bad news. A buyback signals undervaluation, more weakly: an open-market programme commits to nothing.</td><td>Smoothed dividends</td></tr>
<tr><td>Agency</td><td>Free cash flow left inside is spent on empire building; cash paid out cannot be wasted, and a sticky dividend commits more than a buyback.</td><td>Committed payout</td></tr>
</table>
<p>Repurchase methods: <b>open market</b> (on the exchange at the market price; most common, no commitment), <b>fixed-price tender</b> (a stated number of shares at a stated premium, pro rata if oversubscribed) and <b>Dutch auction</b> (holders name the lowest price they accept; everyone is paid the one clearing price that fills the quantity, usually a smaller premium). A tender premium is not a gift. If everyone tenders pro rata, holders pay it to themselves out of the firm's cash and the post-offer price falls below the old one; if only some tender, it transfers value from those who stay to those who sell.</p>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>In a perfect market a debt-financed payout leaves V unchanged and the price unchanged at the announcement (MM I); equity falls by exactly the new debt. A buyback keeps the price; a special dividend lowers it by the dividend.</li>
<li>Repurchase: n = cash paid out/P at the post-announcement price. Special dividend: DPS = cash paid out/N<sub>0</sub> and P<sub>ex</sub> = P<sub>0</sub> − DPS. If old debt is refinanced, the cash paid out is D<sub>new</sub> − D<sub>old</sub>.</li>
<li>Relever with MM II at the new D/E and the new r<sub>D</sub>; the check that can fail is new DPS / new r<sub>E</sub> = the price.</li>
<li>Seller, holder and dividend taker end with the same wealth, and homemade dividends (or reinvesting) undo any payout choice; EPS can change, value does not.</li>
<li>With frictions: taxes favour repurchases for taxable holders when τ<sub>d</sub> &gt; τ<sub>g</sub>, signalling favours smoothed dividends, free cash flow favours committed payout; a tender premium is a transfer, not value.</li></ul></div>
`,
  checks: [
    {
      id: "kj2-s1",
      q: "A firm in a perfect market with no taxes announces that it will borrow and use the cash to buy back shares. At the announcement, the share price…",
      options: [
        "rises, because fewer shares will share the same earnings",
        "stays unchanged, because the plan only re-divides the same asset cash flows",
        "falls, because r<sub>E</sub> rises and equity is discounted at a higher rate",
        "rises by D<sub>new</sub>/N<sub>0</sub>, because the new debt adds value to the firm",
      ],
      answer: 1,
      explanation: "Without taxes or costs the recapitalisation creates nothing, so V and the price stay put, at the announcement and at execution (MM I). The higher r<sub>E</sub> comes with a higher expected dividend per share, so it does not push the price down. The higher EPS comes with more risk per share, so it does not push the price up.",
    },
    {
      id: "kj2-s2",
      q: "A firm has 20 million shares at 40.00 in a perfect market and pays a debt-financed special dividend of 200 million. A shareholder who wanted no cash reinvests his dividend in the firm's shares. Which is right?",
      options: [
        "He buys at the ex-dividend price of 30.00 and is back at 40.00 per original share",
        "He buys at 40.00, since the dividend did not change the value of the firm",
        "He cannot undo it: the dividend has cut his wealth by 10.00 per share, and buying back cannot restore it",
        "He buys at 30.00 and ends richer than before, because the shares are now cheaper",
      ],
      answer: 0,
      explanation: "DPS = 200/20 = 10.00, and the price falls by exactly that, to 30.00. Reinvesting 10.00 at 30.00 buys one third of a share, so each original share becomes 4/3 of a share worth 40.00: a homemade reversal of the dividend. Buying at the stale cum price of 40.00 is the classic slip, and the lower price is no gain, because each share is now a claim on less equity.",
    },
    {
      id: "kj2-s3",
      q: "A firm in a perfect market borrows to buy back shares, and its EPS rises by 8%. The share price…",
      options: [
        "rises by about 8%, because the P/E ratio stays the same",
        "falls, because the firm now carries debt",
        "is unchanged: the higher EPS comes with a higher r<sub>E</sub>, so the P/E ratio falls",
        "rises, because a buyback tells the market that the shares are undervalued",
      ],
      answer: 2,
      explanation: "The firm buys its shares at a fair price, so equity and the share count fall in proportion and the price is unchanged (MM I). Each remaining share carries more risk, so r<sub>E</sub> rises and the P/E ratio falls just enough to absorb the higher EPS. The signalling answer needs asymmetric information, which a perfect market rules out.",
    },
    {
      id: "kj2-s4",
      q: "A firm makes a fixed-price tender offer at a 10% premium, and every shareholder tenders the same fraction of his shares. In a perfect market, the shareholders as a group…",
      options: [
        "are no better off: they pay the premium to themselves",
        "gain the premium on every share they tender, paid out of the firm's cash",
        "lose, because the price after the offer is below the price before it",
        "gain, because the premium signals that the shares are undervalued",
      ],
      answer: 0,
      explanation: "Each holder collects the premium on the shares he sells and loses the same amount on the shares he keeps, whose price falls below the pre-offer level, so his wealth per original share is unchanged. The lower post-offer price is the other half of that trade, not a loss. Only when some holders stay out does the premium become a transfer from those who stay to those who sell.",
    },
  ],
  case: {
    id: "kj2-m1",
    open: true,
    topic: "Recapitalisation with risky debt, buyback against special dividend",
    points: 6,
    minutes: 10,
    body: `<p>Sirdal Kjøling ASA is all-equity and operates in a perfect capital market: no taxes, no transaction, issuance or distress costs, and symmetric information. Its expected free cash flow is NOK 60 million a year in perpetuity, all paid out, and its unlevered cost of capital is r<sub>U</sub> = 10.0000%. There are 30 million shares. The board announces that it will borrow NOK 300 million of perpetual debt, which lenders price at r<sub>D</sub> = 5.5000%, and use all of it to buy back shares. Amounts in NOK million; give rates to 4 decimal places.</p>
<p>(a) What is the share price before the announcement, just after it, and after the buyback? How many shares are repurchased? (2 points)</p>
<p>(b) Find the cost of equity and the dividend per share after the recapitalisation, and show that they price the share correctly. (2 points)</p>
<p>(c) Suppose the board instead pays the NOK 300 million out as a special dividend. Find the dividend per share, the ex-dividend price and the ongoing dividend per share, and show that a shareholder with 100 shares ends with the same wealth as under the buyback. (2 points)</p>`,
    solution: `<p><b>(a) Price and shares repurchased.</b> V = 60/0.100000 = 600.00, so P<sub>0</sub> = 600.00/30 = 20.00. No taxes and no costs mean the plan only re-divides the same cash flows (MM I): V stays 600.00 and the price stays <b>20.00</b> at the announcement. The firm buys at 20.00: n = 300/20.00 = <b>15 million</b> shares, leaving 15 million. E<sub>1</sub> = 600.00 − 300.00 = 300.00, and 300.00/15 = <b>20.00</b> after the buyback.</p>
<p><b>(b) New r<sub>E</sub> and dividend.</b> D/E = 300/300 = 1.0000, so by MM II r<sub>E</sub> = 0.100000 + 1.0000(0.100000 − 0.055000) = 0.100000 + 0.045000 = <b>14.5000%</b>. Interest = 0.055 × 300 = 16.50, so equity receives 60.00 − 16.50 = 43.50, and DPS = 43.50/15 = <b>2.90</b>, up from 60/30 = 2.00. Check: 2.90/0.145000 = 20.00 ✓. The rise in DPS is exactly offset by the higher risk; discounting 2.90 at the old 10.0000% would give 29.00 and expose the missing relevering.</p>
<p><b>(c) Special dividend.</b> DPS = 300/30 = <b>10.00</b>, so P<sub>ex</sub> = 20.00 − 10.00 = <b>10.00</b> on 30 million shares (equity 300.00). Ongoing DPS = 43.50/30 = <b>1.45</b>, and 1.45/0.145000 = 10.00 ✓, with the same r<sub>E</sub> because D/E is the same. A holder of 100 shares gets 100 × 10.00 = 1,000 in cash plus 100 × 10.00 = 1,000 in shares, total 2,000. Under the buyback she has 2,000 whether she sells (100 × 20.00 in cash) or holds (100 × 20.00 in shares). Payout irrelevance: the route changes the form of her wealth, not its size.</p>`,
    criteria: [
      "Price 20.00 before, at the announcement and after the buyback, justified by MM I with no taxes; n = 300/20.00 = 15 million shares",
      "r_E = 0.10 + 1.0(0.10 - 0.055) = 14.5000% by MM II, DPS = 43.50/15 = 2.90, and 2.90/0.145 = 20.00",
      "Special dividend 10.00, ex-dividend price 10.00, ongoing DPS 1.45 = 0.145 x 10.00",
      "100 shares are worth 2,000 on every route: payout irrelevance",
    ],
  },
});

/* kj3 · Taxes, the interest tax shield and the trade-off */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Taxes, the interest tax shield and the trade-off",
  chapters: [7, 8],
  html: `
<div class="callout kort"><span class="h">In short</span>Taxes are the first reason debt can create value. Interest is tax deductible, so a firm with debt pays less tax and more of its cash reaches investors. That saving is the interest tax shield. This part shows how to value it, who captures the gain when a firm takes on debt (the existing shareholders) and why firms still do not borrow without limit: more debt also raises the expected costs of financial distress. The trade-off theory weighs the two.</div>

<p class="lead-in">Taxes are the first friction that makes capital structure matter: 2022 Problem 1, 2023 Problem 1 and 2015 Problem 3 are built on the tax shield, and H2025 Exercise 4 computes it year by year. Distress costs are the counterweight the examiner expects you to name.</p>

<h3>The interest tax shield</h3>
<p>Interest is tax-deductible; dividends are not. The tax saved is a real cash flow to investors:</p>
<div class="formula"><div class="eq">TS = τ<sub>c</sub> × interest = τ<sub>c</sub> × r<sub>D</sub> × D</div>
<div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</div>
<div class="where">Not on the formula sheet. V<sup>U</sup> is free cash flow discounted at r<sub>U</sub>. Whenever you write the second line, say which rate discounted the shield.</div></div>
<p>Debt that is fixed and never repaid gives a level perpetuity as safe as the interest, so it is discounted at r<sub>D</sub>, which cancels:</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub>r<sub>D</sub>D / r<sub>D</sub> = τ<sub>c</sub>D ⟹ V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D</div>
<div class="where">Valid only for fixed, permanent debt, and the most the shield can be worth for debt that never grows. For a firm that rebalances to a target ratio it overstates value (the full rule is in kj4).</div></div>
<div class="callout mech"><span class="h">Why does leverage create value when the assets did not change?</span>Taxes add a third claimant, the government, whose slice depends on the financing mix. Debt shrinks that slice and leaves more for investors. Leverage creates no cash; it redirects a payment.</div>
<p>The shield also shows up as a lower rate: under the course's rebalancing convention r<sub>wacc</sub> = r<sub>U</sub> − (D/V)r<sub>D</sub>τ<sub>c</sub>, which falls as leverage rises.</p>

<h3>Who captures the gain, and when</h3>
<p>Lenders pay a fair price for their bonds and gain nothing. The whole PV(TS) goes to the shareholders who own the firm when the plan becomes credible, before any debt is issued:</p>
<div class="formula"><div class="eq">ΔP = PV(TS)/N<sub>0</sub> · n = D/P<sub>1</sub>, with P<sub>1</sub> = P<sub>0</sub> + ΔP</div>
<div class="where">N<sub>0</sub> is the share count before anything happens. The buyback executes at P<sub>1</sub>, not P<sub>0</sub>: the only change from the no-tax case in kj2.</div></div>
<div class="worked"><span class="wh">Worked example: a debt-financed buyback with taxes</span>
<p>Fjellheim AS is all-equity: V<sup>U</sup> = 600 on 20 million shares, P<sub>0</sub> = 30.00, τ<sub>c</sub> = 25%. It announces 200 of permanent risk-free debt at r<sub>D</sub> = r<sub>f</sub> = 5.0000% to repurchase shares. Millions.</p>
<p><b>Step 1: the shield.</b> TS = 0.25 × 0.05 × 200 = 2.50 a year; fixed and permanent, so PV(TS) = 2.50/0.05 = 50.00 = τ<sub>c</sub>D and V<sup>L</sup> = 650.00.</p>
<p><b>Step 2: the announcement.</b> All 650.00 is still equity on 20 million shares: P<sub>1</sub> = 32.50, a jump of 50.00/20 = 2.50.</p>
<p><b>Step 3: the buyback at 32.50.</b> n = 200/32.50 = 6.1538 million, leaving 13.8462 million, and (650.00 − 200)/13.8462 = 32.50. The old shareholders hold 450.00 + 200 = 650.00 against 600: the whole 50.00 is theirs.</p>
<p><b>Check:</b> 450.00 + 200 = 650.00 is nearly an identity. What can fail is the price: buy at the stale 30.00 and you retire 6.6667 million shares, implying 450.00/13.3333 = 33.75, two prices for one share.</p></div>

<h3>Financial distress and the trade-off</h3>
<p>Why is no firm all debt? Handing the assets to creditors is free; the process is not. <b>Direct costs</b> (lawyers, courts, management time) run about 3–4% of value. <b>Indirect costs</b> run 10–20%: customers and staff leave, suppliers demand cash, assets are fire-sold, mostly before any court is involved.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(financial distress costs)</div>
<div class="where">The third term is the expected, discounted deadweight loss: value nobody receives, never the transfer to creditors. It grows with leverage and asset volatility. Not on the formula sheet.</div></div>
<div class="callout mech"><span class="h">Why do shareholders pay for a bankruptcy they will not attend?</span>Creditors price the expected loss into the bond and pay less for the same promise. Ex post the costs land on creditors; ex ante shareholders bear them all, through the share price at the announcement.</div>
<p>The shield rises linearly in D while distress costs accelerate, so value peaks at an interior D*: borrow while the next step adds more shield than distress cost, and in a schedule compare differences, not levels. Personal taxes cut the advantage to τ* = 1 − (1 − τ<sub>c</sub>)(1 − τ<sub>e</sub>)/(1 − τ<sub>i</sub>), below τ<sub>c</sub> when interest income is taxed more heavily than equity income.</p>
<div class="callout warn"><span class="h">Errors that lose points</span>(1) V<sup>U</sup> + τ<sub>c</sub>D for a firm that keeps a target ratio. (2) Repurchasing at P<sub>0</sub> after a value-creating announcement. (3) Dividing the gain by the post-buyback share count. (4) Counting what creditors lose in default as the distress cost: only value nobody receives counts.</div>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>V<sup>L</sup> = V<sup>U</sup> + PV(TS); fixed permanent debt gives PV(TS) = τ<sub>c</sub>D, the most the shield can be worth for debt that never grows.</li>
<li>With taxes the share price jumps by PV(TS)/N<sub>0</sub> at the announcement, and the buyback executes at that new price: n = D/P<sub>1</sub>.</li>
<li>Lenders gain nothing; the pre-announcement shareholders capture the whole PV(TS).</li>
<li>Shareholders bear expected distress costs up front, because creditors price them into the debt.</li>
<li>Trade-off: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs); borrow while the marginal shield exceeds the marginal distress cost.</li></ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "An all-equity firm worth V<sup>U</sup> = 800 with 40 million shares announces that it will issue 160 of permanent debt and use it to buy back shares. τ<sub>c</sub> = 25%. What is the share price just after the announcement?",
      options: [
        "20.00: the price moves only when the debt is issued and the shares are bought back",
        "21.25: the 40 of PV(TS) is shared among the 32 million shares left after a buyback at 20.00",
        "24.00: the 160 raised is added to the 800 and spread over the 40 million shares",
        "21.00: PV(TS) = τ<sub>c</sub>D = 40 accrues at once to the 40 million existing shares",
      ],
      answer: 3,
      explanation: "Permanent debt gives PV(TS) = 0.25 × 160 = 40, and the market prices it the moment the plan is credible: (800 + 40)/40 = 21.00. The tempting 21.25 divides by the post-buyback share count, but no shares have been bought at the announcement, and the buyback then executes at 21.00, retiring 7.6190 million shares and leaving the price at 21.00. The cash raised is not value: it goes straight back out to the sellers.",
    },
    {
      id: "kj3-s2",
      q: "A firm issues bonds that carry a real chance of default, and in default lawyers' fees and fire sales will destroy part of the assets. Who bears the expected cost of that destruction, and when?",
      options: [
        "The shareholders, today: bondholders price in the loss and pay less for the bonds",
        "The bondholders, in default: the costs are paid out of assets the creditors then own",
        "Nobody until default actually happens; before that it is only a probability",
        "Shareholders and bondholders equally, since both claims are affected when the firm is in distress",
      ],
      answer: 0,
      explanation: "Debt is sold at a fair price, so bondholders price the expected loss into what they pay and earn a fair return anyway. The shortfall lands on the shareholders who sell the claim, and it reaches the share price when the debt is announced. The answer that puts the cost on bondholders describes who pays ex post, not who bears it ex ante.",
    },
    {
      id: "kj3-s3",
      q: "A firm is choosing permanent debt in steps of 50. With τ<sub>c</sub> = 25%, each step adds 12.50 of tax shield. PV(financial distress costs) is 4.00 at D = 100, 10.00 at D = 150, 21.00 at D = 200 and 36.00 at D = 250. Which debt level maximises firm value?",
      options: [
        "D = 250: the total shield there (62.50) still exceeds the total distress costs (36.00)",
        "D = 150: after 150 the value added per step falls, from 6.50 to 1.50",
        "D = 200: the step to 200 adds 1.50 of value and the step to 250 subtracts 2.50",
        "As much debt as possible: every step adds 12.50 of tax shield, whatever it costs",
      ],
      answer: 2,
      explanation: "The rule is marginal: take a step while its shield exceeds its added distress cost. From 150 to 200 it adds 12.50 against 11.00, from 200 to 250 it adds 12.50 against 15.00, so stop at 200. The answer comparing totals at 250 confuses a positive total gain with a positive marginal gain; value there is 26.50 above V<sup>U</sup>, against 29.00 at 200.",
    },
  ],
  case: {
    id: "kj3-m1",
    open: true,
    topic: "Permanent debt, the announcement price and distress costs",
    points: 6,
    minutes: 10,
    body: `<p>Stord Verft ASA is all-equity financed. It generates a free cash flow of NOK 56 million a year in perpetuity, its unlevered cost of capital is r<sub>U</sub> = 8.0000%, and it has 25 million shares outstanding. The corporate tax rate is τ<sub>c</sub> = 22%. The board announces, as a surprise, that the firm will borrow NOK 200 million at r<sub>D</sub> = 4.0000%, keep exactly that amount outstanding forever, and use the proceeds to repurchase shares at the market price. Ignore distress costs in (a) and (b).</p>
<p>(a) Compute the share price before the announcement, the present value of the interest tax shield and V<sup>L</sup>. State the rate at which you discount the shield and why. (2 points)</p>
<p>(b) Compute the share price just after the announcement, the number of shares repurchased and the share price after the buyback. (2 points)</p>
<p>(c) The advisers now estimate that this debt adds NOK 18 million of present value of financial distress costs. Recompute the announcement price, and explain who bears the distress costs and when. (2 points)</p>`,
    solution: `<p><b>(a) Price, shield and levered value.</b> V<sup>U</sup> = 56/0.08 = 700.00, so P<sub>0</sub> = 700.00/25 = 28.00. The debt is fixed and permanent, so the shield is as safe as the interest and is discounted at r<sub>D</sub>: TS = 0.22 × 0.04 × 200 = 1.76 a year, PV(TS) = 1.76/0.04 = 44.00 = τ<sub>c</sub>D. V<sup>L</sup> = 700.00 + 44.00 = 744.00.</p>
<p><b>(b) Announcement and buyback.</b> At the announcement no debt has been issued, so all 744.00 is equity on the original 25 million shares: P<sub>1</sub> = 744.00/25 = 29.76, a jump of 1.76 = 44.00/25. The buyback executes at 29.76: n = 200/29.76 = 6.7204 million shares, leaving 18.2796 million. Equity after the buyback is 744.00 − 200 = 544.00, and 544.00/18.2796 = 29.76, so the price does not move again. Check: the original shareholders hold 544.00 + 200 = 744.00 against 700.00, a gain of 44.00 = PV(TS); the lenders pay 200 for debt worth 200 and gain nothing.</p>
<p><b>(c) With distress costs.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs) = 700.00 + 44.00 − 18.00 = 726.00, so P<sub>1</sub> = 726.00/25 = 29.04 (n = 200/29.04 = 6.8871 million, and 526.00/18.1129 = 29.04). The shareholders bear the distress costs, and they bear them now: creditors anticipate the loss in default and price it into the debt, so the cost reaches the share price at the announcement, even though ex post it would be paid out of assets the creditors own. The recapitalisation still adds 44.00 − 18.00 = 26.00, so it is worth doing.</p>`,
    criteria: [
      "PV(TS) = tau_c × D = 44.00, discounted at r_D because the debt is fixed and permanent; V^L = 744.00 and P_0 = 28.00",
      "Price jumps at the announcement to 744.00/25 = 29.76; buyback at 29.76 retires 6.7204 million shares and the price stays at 29.76",
      "With distress costs V^L = 726.00 and P_1 = 29.04",
      "Shareholders bear the distress costs ex ante, because creditors price the expected loss into the debt",
    ],
  },
});

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

/* kj5 · Agency costs of debt: risk shifting and debt overhang */
window.EDU_DATA.kjerne.push({
  id: "kj5",
  num: 5,
  title: "Agency costs of debt: risk shifting and debt overhang",
  chapters: [9, 10, 11],
  html: `
<div class="callout kort"><span class="h">In short</span>Until now the firm has been run to maximise its total value. Once debt is risky, that breaks down. Shareholders keep all the upside, while losses beyond their equity fall on the creditors. So they may gamble on risky projects (risk shifting) or turn down good projects whose gains would mostly go to the lenders (debt overhang). This part shows how to measure the value lost with a simple table of outcomes and what renegotiation and contract terms can do about it.</div>

<p class="lead-in">Once debt is risky, shareholders stop maximising firm value: they gamble (risk shifting) or refuse good projects (debt overhang). Risk shifting and hedging was H2024 Exercise 4 (18 points) and V2024 Problem 1; overhang ran in 2017V Problem 3, 2017H Problems 1 and 4 and 2021 Problem 2. Both are a state-by-state table plus a named mechanism.</p>

<h3>Equity is a call on the firm</h3>
<p>Limited liability means shareholders are paid last and never less than zero. Against debt with face value K, each state's cash flow V splits as:</p>
<div class="formula"><div class="eq">D = min(V, K) and E = max(V − K, 0)</div>
<div class="where">K is the face value, and the strike of the shareholders' option. D + E = V in every state. Value each claim as its expected payoff under ρ, discounted at r<sub>f</sub>. If the exercise gives real probabilities and no rate, compare expected payoffs.</div></div>
<div class="callout mech"><span class="h">Why do shareholders of a levered firm like risk?</span>Equity is convex in V. Push the good state up and shareholders keep all of it; push the bad state further below K and they lose nothing, being at zero already. The extra downside lands on the creditors. So more risk moves value from debt to equity, even when it destroys firm value.</div>

<h3>Risk shifting and the zero-NPV hedge</h3>
<p>Management acts for the shareholders, so it picks the project with the highest <i>equity</i> value, not the highest firm value. The exercise ends on:</p>
<div class="formula"><div class="eq">agency cost = V(first best) − V(chosen)</div>
<div class="where">A deadweight loss, not the transfer: neither the shareholders' gain nor the creditors' loss. The first best is what an all-equity firm would choose.</div></div>
<p>Risk shifting needs enough debt. For the indifference face value, write both equity values as functions of K and set them equal, inside an interval where the same states default.</p>

<div class="worked"><span class="wh">Worked example: the gamble, its cost, and a free hedge</span>
<p>A firm owes K = 100 and will run one of two projects, neither needing new investment. Two states, ρ = 0.50 each, and r<sub>f</sub> = 0, so value equals expected payoff.</p>
<table class="data">
<tr><th>State</th><th>S: CF</th><th>D</th><th>E</th><th>R: CF</th><th>D</th><th>E</th></tr>
<tr><td>Boom</td><td class="n">120</td><td class="n">100</td><td class="n">20</td><td class="n">170</td><td class="n">100</td><td class="n">70</td></tr>
<tr><td>Bust</td><td class="n">100</td><td class="n">100</td><td class="n">0</td><td class="n">30</td><td class="n">30</td><td class="n">0</td></tr>
<tr><td>Value</td><td class="n">110</td><td class="n">100</td><td class="n">10</td><td class="n">100</td><td class="n">65</td><td class="n">35</td></tr>
</table>
<p><b>Step 1, first best.</b> V<sub>S</sub> = 110 &gt; V<sub>R</sub> = 100, so an all-equity firm takes S. Switching to R has NPV = −10.</p>
<p><b>Step 2, the choice.</b> E<sub>R</sub> = 35 &gt; E<sub>S</sub> = 10, so management takes R: risk shifting (asset substitution).</p>
<p><b>Step 3, the agency cost.</b> 110 − 100 = <b>10</b>. Creditors gain 65 − 100 = −35, shareholders 35 − 10 = +25. Consistency check 3: −35 + 25 = −10 = the NPV of the switch ✓</p>
<p><b>Step 4, the indifference face value.</b> For 30 &lt; K ≤ 100 only R's bust defaults: E<sub>S</sub> = 110 − K, E<sub>R</sub> = 0.5(170 − K) = 85 − 0.5K. Equal at K* = <b>50</b> (both 60). Above 50 management gambles.</p>
<p><b>Step 5, the hedge.</b> At K = 100, a costless forward turns R's cash flow into a certain 100 (NPV = 0). Debt becomes 100 and equity 0: the hedge removes equity's option value, so shareholders refuse. Consistency check 4 (total value fixed): creditors' gain 35 = shareholders' loss 35 ✓</p>
<p><b>Step 6, who pays.</b> Creditors who foresee R pay only 65 for the bond, so the owners end with 65 + 35 = 100, not the 110 a credible promise of S would give. They bear the agency cost up front.</p>
</div>

<h3>Debt overhang and renegotiation</h3>
<p>Shareholders pay the whole outlay I, but in default states every extra krone goes to the creditors:</p>
<div class="formula"><div class="eq">Δ(shareholders' wealth) = NPV − ΔD</div>
<div class="where">ΔD is the rise in the value of the existing debt. Shareholders invest only if NPV &gt; ΔD. Debt overhang is ΔD &gt; NPV &gt; 0. The agency cost is the lost NPV.</div></div>
<p>In k10, debt of face value 100 meets assets paying 50 or 150 (ρ = 0.5), r<sub>f</sub> = 5%, and a project costing 20 adds a safe 30. NPV = 30/1.05 − 20 = 8.5714, but the debt rises by 85.7143 − 71.4286 = 14.2857, so shareholders get 8.5714 − 14.2857 = −5.7143 and decline. The agency cost is 8.5714, not 5.7143. The fix is to cut the face value to K<sub>1</sub>, within:</p>
<div class="formula"><div class="eq">D(K<sub>1</sub>) ≥ D<sub>0</sub> and E(K<sub>1</sub>) − I ≥ E<sub>0</sub></div>
<div class="where">D<sub>0</sub>, E<sub>0</sub> are the claims without the project. Here the creditors need K<sub>1</sub> ≥ 75, the owners K<sub>1</sub> ≤ 88. At K<sub>1</sub> = 82 creditors gain 5.7143 and shareholders 2.8571; consistency check 3: 5.7143 + 2.8571 = 8.5714 = NPV ✓ It holds at every K<sub>1</sub>, since renegotiation only changes the division. Check 4 does not apply: total value is not fixed.</div></div>
<p>The same arithmetic runs backwards. Buying back risky debt raises the value of the debt that stays outstanding, so creditors capture part of any gain, and shareholders can lose from reducing debt even when the firm gains. The keys name this error: run check 3, then read the shareholders' column alone.</p>

<div class="callout warn"><span class="h">Where the points go</span>Compare equity values, not NPVs: the question is what management chooses. Equity in a default state is 0, not negative. In overhang, subtract I from the shareholders' gain, and write the cash flow, not K, in the default state.</div>

<h3>Remedies, and what debt does well</h3>
<p>Covenants cap borrowing, payouts and asset sales; they create value, since the owners get the avoided deadweight loss back in the bond price, unless they bind where the forbidden action was efficient. Senior or secured debt for the new project gives its lender the bad-state cash first, so the old creditor gets no windfall and the owners invest. Convertibles give the lender the upside, removing the convexity that makes gambling pay.</p>
<p>Debt also disciplines. A manager with free cash flow, the cash left after every positive-NPV project, is tempted to build an empire. A skipped dividend costs him nothing; a missed coupon hands control to the creditors. So debt commits the cash, which matters most in mature, cash-rich firms. Everything combines into:</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress) − PV(agency costs) + PV(agency benefits)</div>
<div class="where">The trade-off (kj3) plus the agency terms; asymmetric information (kj6) adds the pecking order. In a discussion, sign each term for the firm, say which dominates, conclude: stable, tangible, cash-rich firms carry more debt, intangible growth firms little.</div></div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>With risky debt, equity = max(V − K, 0) is a call on the firm: shareholders gain from risk at the creditors' expense.</li>
<li>Risk shifting: management picks the highest equity value; the indifference face value K* sets the two equity values equal; agency cost = V(first best) − V(chosen), never the transfer.</li>
<li>With risky debt, shareholders refuse a zero-NPV hedge: it hands the option value to creditors (check 4).</li>
<li>Debt overhang: shareholders invest only if NPV &gt; ΔD, the rise in the old debt's value. Renegotiate the face value to K<sub>1</sub> within D(K<sub>1</sub>) ≥ D<sub>0</sub> and E(K<sub>1</sub>) − I ≥ E<sub>0</sub> (D<sub>0</sub>, E<sub>0</sub> the claims without the project); the gains sum to the NPV (check 3).</li>
<li>Creditors anticipate both, so shareholders pay up front; covenants, seniority and convertibles reduce the cost, while debt disciplines free cash flow.</li></ul></div>
`,
  checks: [
    {
      id: "kj5-s1",
      q: "Debt is risky. Management picks project R (firm value 138: debt 93, equity 45) over project S (firm value 150: debt 130, equity 20). What is the agency cost of debt?",
      options: [
        "25, the gain to shareholders from choosing R",
        "12, the firm value of S minus the firm value of R",
        "37, the loss to creditors from choosing R",
        "Zero, since choosing R only moves value from creditors to shareholders",
      ],
      answer: 1,
      explanation: "The agency cost is the deadweight loss, first-best value minus the value of the chosen project: 150 − 138 = 12. The shareholders' +25 and the creditors' −37 are the transfer, and they sum to −12, the NPV of the switch (check 3). The answer of zero misses that total value falls by 12.",
    },
    {
      id: "kj5-s2",
      q: "A firm's debt is risky. A bank offers a costless hedge that makes the firm's cash flow certain at its current expected value. Management acts for the shareholders. What happens?",
      options: [
        "They accept: a zero-NPV project leaves shareholder wealth unchanged",
        "They accept: lower risk reduces r<sub>E</sub> and so raises the share price",
        "They refuse: the hedge hands equity's option value to the creditors",
        "They refuse: the hedge has a negative NPV for the firm as a whole",
      ],
      answer: 2,
      explanation: "Equity is a call on the firm, so its value depends on the whole distribution, not only the mean. The hedge lifts the debt towards its face value and lowers equity by the same amount, since total value is unchanged (check 4). The zero-NPV argument works only when debt is risk-free and equity is linear in the cash flow.",
    },
    {
      id: "kj5-s3",
      q: "Existing debt is risky. A project costs I = 20 and has NPV = 8; if it is taken, the market value of the existing debt rises by 12. The shareholders must fund the outlay. Which statement is right?",
      options: [
        "They invest, because a positive-NPV project always raises the value of equity",
        "They decline, since their wealth changes by −4; the agency cost is the lost NPV of 8",
        "They decline, and the agency cost is the 4 the shareholders would have lost",
        "They are indifferent, because the creditors' gain equals the shareholders' loss (check 4)",
      ],
      answer: 1,
      explanation: "Shareholders pay all of I but capture only NPV − ΔD = 8 − 12 = −4, so they decline: debt overhang. The value lost is the NPV of 8, because the project never happens; the 4 is a transfer that would have occurred only had they invested. Check 4 needs total value to be fixed, and here the project would add 8.",
    },
  ],
  case: {
    id: "kj5-m1",
    open: true,
    topic: "Debt overhang and renegotiating the face value",
    points: 7,
    minutes: 12,
    body: `<p>Solvik Verft AS has zero-coupon debt with face value K = 130 due in one year and no other liabilities. Its assets pay 65 in the bad state and 260 in the good state next year, each with risk-neutral probability ρ = 0.50, and r<sub>f</sub> = 4%, so every claim is worth its expected payoff discounted at r<sub>f</sub>. A project costs I = 25 today, must be funded by the existing shareholders, and adds a certain 39 in both states next year. Figures in millions of NOK.</p>
<p>(a) Value the debt and the equity with and without the project, compute the project's NPV, and show whether the shareholders take it. Name the mechanism. (3 points)</p>
<p>(b) The creditors, a single bank, offer to cut the face value to K<sub>1</sub> = 104 if the shareholders fund the project. Compute each side's gain, and say what the two gains add up to and why. (2 points)</p>
<p>(c) Find the range of face values K<sub>1</sub> that both the bank and the shareholders would accept. (2 points)</p>`,
    solution: `<p><b>(a) Overhang.</b> Without the project: bad state D = 65, E = 0; good state D = 130, E = 130. D<sub>0</sub> = (0.5 × 65 + 0.5 × 130)/1.04 = 97.5/1.04 = <b>93.7500</b>, E<sub>0</sub> = (0.5 × 130)/1.04 = 65/1.04 = <b>62.5000</b>.</p>
<p>NPV = 39/1.04 − 25 = 37.5000 − 25 = <b>12.5000</b>.</p>
<p>With the project the cash flows are 104 and 299: bad state D = 104, E = 0; good state D = 130, E = 169. D = 117/1.04 = 112.5000, E = 84.5/1.04 = 81.2500.</p>
<p>Creditors gain 112.5000 − 93.7500 = +18.7500. Shareholders gain 81.2500 − 62.5000 − 25 = <b>−6.2500</b>, so they reject a positive-NPV project. This is debt overhang: the bad-state increment of 39 goes wholly to the creditors while the owners pay all 25. Check 3: 18.7500 − 6.2500 = 12.5000 = NPV ✓ The agency cost is the lost NPV, 12.5000.</p>
<p><b>(b) K<sub>1</sub> = 104.</b> Bad state D = 104, E = 0; good state D = 104, E = 195. The debt is now riskless: D = 104/1.04 = 100.0000, E = 97.5/1.04 = 93.7500.</p>
<p>Creditors gain 100.0000 − 93.7500 = +6.2500. Shareholders gain 93.7500 − 62.5000 − 25 = +6.2500. Both gain, so the project goes ahead. Consistency check 3: 6.2500 + 6.2500 = 12.5000 = NPV ✓</p>
<p><b>(c) The bargaining range.</b> Bank's floor: D(K<sub>1</sub>) ≥ 93.7500. For K<sub>1</sub> ≤ 104 the debt is safe, D = K<sub>1</sub>/1.04, so K<sub>1</sub> ≥ 97.5.</p>
<p>Shareholders' ceiling: for K<sub>1</sub> ≥ 104 the bad state defaults, so E = 0.5(299 − K<sub>1</sub>)/1.04, and they need E − 25 ≥ 62.5000, that is 0.5(299 − K<sub>1</sub>) ≥ 1.04 × 87.5 = 91, so K<sub>1</sub> ≤ 117.</p>
<p>Any 97.5 ≤ K<sub>1</sub> ≤ 117 is signable. At 97.5 the shareholders take the whole 12.5000, at 117 the bank does.</p>`,
    criteria: [
      "Values the claims state by state: D_0 = 93.75 and E_0 = 62.50 without the project, D = 112.50 and E = 81.25 with it, and NPV = 12.50.",
      "Shows the shareholders' gain is 81.25 − 62.50 − 25 = −6.25 while creditors gain 18.75, so the project is rejected, and names it debt overhang.",
      "At K_1 = 104 creditors and shareholders each gain 6.25, and check 3 confirms the gains sum to the NPV of 12.50.",
      "Finds the range 97.5 to 117 from D(K_1) at least 93.75 and E(K_1) − 25 at least 62.50.",
    ],
  },
});

/* kj6 · Asymmetric information and raising capital */
window.EDU_DATA.kjerne.push({
  id: "kj6",
  num: 6,
  title: "Asymmetric information and raising capital",
  chapters: [12, 13, 14],
  html: `
<div class="callout kort"><span class="h">In short</span>Managers usually know more about the firm than outside investors do. That makes raising money tricky. When a firm offers new shares, investors suspect the shares are overpriced and pay less for them. A firm whose shares really are worth more may then skip a good project rather than sell itself too cheaply. This part works through that logic (the Myers-Majluf model), explains why firms prefer internal funds first, then debt, then equity (the pecking order) and covers how firms actually raise capital through IPOs, seasoned offerings and rights issues.</div>

<p class="lead-in">When managers know more than investors, selling shares transfers wealth, and a firm may skip a good project rather than sell itself cheaply. A flag: this appeared in 8 of 11 papers historically but in neither Kurbatov paper, and it is still on the syllabus. The template barely changed: 2016 Problem 1, 2017V Problem 1, 2020 Problem 2, 2022 Problem 2, 2023 Problem 4.</p>

<h3>The Myers-Majluf template</h3>
<p>Assets in place are worth V<sub>H</sub> or V<sub>L</sub>; only the manager knows which, and the market puts probability q on the high type. A project needs I, raised by an equity issue now or lost, and its NPV is public. The manager acts for the old shareholders. Competitive new investors break even under their beliefs:</p>
<div class="formula"><div class="eq">α = I / (E[V | beliefs] + I + NPV)</div>
<div class="where">α is the fraction of the firm sold. The denominator is the post-issue value in investors' eyes, including the cash raised. Drop the I and α is too large. Not on the formula sheet.</div></div>
<div class="formula"><div class="eq">Old shareholders get (1 − α)(V<sub>true</sub> + I + NPV); issue if this exceeds V<sub>true</sub></div>
<div class="eq">⇔ issue if NPV &gt; α(V<sub>true</sub> − E[V | beliefs])</div>
<div class="where">α is priced off beliefs, the payoff off the truth. The alternative is V<sub>true</sub> alone, since the project is lost without the issue. The right-hand side is the dilution handed to new investors.</div></div>
<p>Four steps, every time:</p>
<ol>
<li>State the belief. Start with pooling: both types issue, so E[V | issue] = qV<sub>H</sub> + (1 − q)V<sub>L</sub>.</li>
<li>Compute α from that belief, I in the denominator, four decimals.</li>
<li>Compare each type's payoff with its V<sub>true</sub>.</li>
<li><b>Consistency check 5: are the beliefs rational?</b> If a type does not act as the belief assumed, switch to separating (only the low type issues, E[V | issue] = V<sub>L</sub>), reprice, and verify that the low type still issues and the high type still abstains.</li>
</ol>
<div class="callout mech"><span class="h">Why does an undervalued firm refuse free money?</span>The price is fair on average, and the manager is not average. Pooling prices every issuer at the mean, subsidising the low type and taxing the high type. If that tax exceeds the NPV, the high type lets a good project die rather than sell a good firm cheaply. Nobody is fooled, and saying "we are the good type" is free, so it convinces nobody.</div>

<div class="worked"><span class="wh">Worked example: pooling fails, separating holds</span>
<p>V<sub>H</sub> = 250, V<sub>L</sub> = 100, q = 0.50, I = 60, NPV = 15.</p>
<p><b>Step 1, pooling belief.</b> E[V | issue] = 0.50(250) + 0.50(100) = 175.</p>
<p><b>Step 2, price.</b> α = 60/(175 + 60 + 15) = 60/250 = <b>0.2400</b>.</p>
<table class="data">
<tr><th>Type</th><th>Dilution α(V − 175)</th><th>Payoff (1 − α)(V + I + NPV)</th><th>No issue</th><th>Issue?</th></tr>
<tr><td>High, 250</td><td class="n">18.00</td><td class="n">0.76 × 325 = 247.00</td><td class="n">250.00</td><td>no</td></tr>
<tr><td>Low, 100</td><td class="n">−18.00</td><td class="n">0.76 × 175 = 133.00</td><td class="n">100.00</td><td>yes</td></tr>
</table>
<p><b>Step 3, check 5.</b> The belief was "both issue", but the high type's dilution of 18 exceeds the NPV of 15, so it abstains. The pooling belief is not rational.</p>
<p><b>Step 4, separating.</b> E[V | issue] = 100, so α = 60/(100 + 60 + 15) = 60/175 = <b>0.3429</b> (12/35). Low type: (23/35)(175) = 115.00 &gt; 100, issues ✓. High type, if it deviated: (23/35)(325) = 213.5714 &lt; 250, abstains ✓. Beliefs are rational: a separating equilibrium.</p>
<p><b>Check.</b> The revealed low type suffers no dilution, so it must get V<sub>L</sub> + NPV = 115 ✓. Expected value lost: q × NPV = 0.50 × 15 = <b>7.50</b>.</p>
</div>

<h3>Pooling versus separating</h3>
<p><b>Separating destroys value:</b> the high type's positive-NPV project never happens. That is underinvestment, the same family as debt overhang (kj5). <b>Pooling only moves value:</b> both types invest, and the high type's old shareholders transfer wealth to the low type's through new investors who break even on average:</p>
<div class="formula"><div class="eq">q × (high type's loss) = (1 − q) × (low type's gain)</div>
<div class="where">Equal in size only when q = 0.5. Had the example's q been 0.80, E[V | issue] = 220 and α = 60/295 = 0.2034; the high type loses 6.1017, below the NPV of 15, so both issue, and the low type gains 24.4068: 0.80 × 6.1017 = 0.20 × 24.4068 = 4.8814 ✓</div></div>
<p>Financial slack (cash or unused debt capacity) lets the high type invest without issuing, which removes the underinvestment. It does not remove an overvalued firm's wish to sell shares: that firm still gains α(E[V | beliefs] − V<sub>true</sub>).</p>

<h3>Pecking order, announcements and market timing</h3>
<p>Selling a claim to less-informed investors costs the old owners more the more its payoff depends on the hidden value. Hence the pecking order: internal funds, then debt (fixed unless the firm defaults), then equity (exposed to every krone of hidden value). 2021 Problem 1 set debt against equity this way. It rests on asymmetric information, not market inefficiency: prices are fair given what investors know. It ranks without forbidding equity, has no target leverage, and explains why the most profitable firms borrow least.</p>
<p><b>Debt or equity?</b> In the k13 example a firm must raise 150; next year it is worth 600 or 300 if good and 400 or 60 if bad (ρ = 0.50, r<sub>f</sub> = 0, q = 0.50). Pooled equity sells α = 150/340 = 0.4412, so the good type hands over a claim truly worth 198.5294 for 150: a transfer of 48.5294. Pooled debt needs 0.50K + 0.50(0.5K + 30) = 150, so K = 180, and the good type's debt is truly worth 180: a transfer of only 30.0000. Debt is less sensitive to the hidden value (the two types' claims differ by 60, against 97.0588 for equity), so the good type prefers debt. The bad type would gain more from equity, but an equity issue would reveal it (check 5), so it mimics and both issue debt. Debt that is repaid in every state, here up to 60, carries no transfer at all. 2021 Problem 1 is this comparison.</p>
<p>Since equity is the last resort, an issue is bad news: seasoned equity offers meet an average price fall of about 3%, straight debt about zero. The fall is the market revising its view of the assets, not value destroyed. Market timing has two versions: the information version is Myers-Majluf again; only the behavioural version, with over-optimistic investors, needs inefficiency and predicts long-run underperformance after issues.</p>

<h3>Raising capital: IPOs, SEOs and rights issues</h3>
<p>In an IPO the underwriter markets the issue and, under firm commitment, buys it at the offer price less the spread; its reputation certifies the issue. Book building sets the price, typically below what demand would bear.</p>
<div class="formula"><div class="eq">Net proceeds = N × P<sub>offer</sub> × (1 − spread) − other direct costs</div>
<div class="eq">Underpricing = (P<sub>close</sub> − P<sub>offer</sub>)/P<sub>offer</sub>; money left on the table = N<sub>primary</sub> × (P<sub>close</sub> − P<sub>offer</sub>)</div>
<div class="where">5 million new shares at 80, a 6% spread and 12 of other costs raise 400 − 24 − 12 = 364 net. A first-day close of 96 is 20.00% underpricing and 80 left on the table: total cost 116, 29% of gross. The underpricing falls on the pre-IPO owners, in shares, not on the company's accounts.</div></div>
<p>Why underprice? The winner's curse: informed investors bid only for good issues, so an uninformed investor is rationed in good deals and filled in bad ones. Priced at expected value he loses on average, so the issue must be priced below it to keep him in. IPO and SEO issuers have also underperformed comparable firms for three to five years afterwards; give both readings, over-optimism or a benchmark problem.</p>
<p>A rights issue, standard in Norway, sells the new shares to existing owners pro rata, so the dilution transfer has no one to flow to:</p>
<div class="formula"><div class="eq">TERP = (N<sub>old</sub> × P<sub>cum</sub> + N<sub>new</sub> × P<sub>sub</sub>)/(N<sub>old</sub> + N<sub>new</sub>); value of a right = P<sub>cum</sub> − TERP</div>
<div class="where">40 million shares at 50 plus 10 million new at 40: TERP = 2 400/50 = 48, a right is worth 2. Owners who subscribe or sell their rights lose nothing; only those who let them lapse do. The discount is cosmetic.</div></div>

<div class="callout warn"><span class="h">Slips that cost points</span>Leaving I out of α's denominator. Comparing the issue payoff with V + NPV instead of V. Putting E[V | beliefs] where the true V belongs. Stopping at α without check 5, or claiming separating without checking that the low type still issues.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Myers-Majluf: α = I/(E[V | beliefs] + I + NPV), with the cash raised in the denominator.</li>
<li>Issue if (1 − α)(V<sub>true</sub> + I + NPV) &gt; V<sub>true</sub>, that is if NPV &gt; α(V<sub>true</sub> − E[V | beliefs]).</li>
<li>Always run check 5: price at pooling, see who issues; if the high type abstains, reprice at E[V | issue] = V<sub>L</sub> and verify both types.</li>
<li>Separating destroys q × NPV, q the probability of the high type (underinvestment); pooling only transfers. Slack cures the underinvestment, not an overvalued firm's wish to issue.</li>
<li>Pecking order: internal funds, debt, equity, because debt is less sensitive to the hidden value; an equity issue cuts the price about 3%; IPO underpricing (winner's curse) costs the pre-IPO owners; rights issues avoid the transfer.</li></ul></div>
`,
  checks: [
    {
      id: "kj6-s1",
      q: "Investors expect both types to issue, so E[V | issue] = 300. The firm raises I = 100 for a project with public NPV = 20; the manager knows the assets are worth 380. What fraction α of the firm must be sold?",
      options: [
        "0.3125 = 100/(300 + 20)",
        "0.2381 = 100/(300 + 100 + 20)",
        "0.2000 = 100/(380 + 100 + 20)",
        "0.2500 = 100/(300 + 100)",
      ],
      answer: 1,
      explanation: "New investors break even on what they believe the post-issue firm is worth: the assets as they assess them, plus the cash they pay in, plus the NPV. Leaving out the I shrinks the denominator and overstates α. The manager's 380 enters the old shareholders' payoff, not the price, because investors cannot see it.",
    },
    {
      id: "kj6-s2",
      q: "You price an equity issue at the pooling belief and find that the high type's old shareholders are better off not issuing. What is the correct conclusion?",
      options: [
        "The equilibrium is pooling, and the high type simply bears the dilution",
        "Both types issue anyway, since the project has a positive NPV",
        "Pooling is not an equilibrium: reprice at V<sub>L</sub> and check that only the low type issues",
        "The equilibrium is separating, with the high type issuing and the low type abstaining instead",
      ],
      answer: 2,
      explanation: "This is consistency check 5: a belief contradicted by the behaviour it predicts cannot be an equilibrium. If only the low type issues, an issue reveals it, so investors price at V<sub>L</sub>, and you confirm that both types act as assumed at that price. The reversed separating answer gets the direction wrong: the low type is never sold below its worth, so it always wants to issue.",
    },
    {
      id: "kj6-s3",
      q: "Which statement about the two Myers-Majluf equilibria is right?",
      options: [
        "Pooling destroys value, because the high type's old shareholders lose to the new investors",
        "Both destroy value, each by the high type's dilution cost",
        "Neither destroys value, because investors' beliefs are rational in both",
        "Separating destroys value: the high type skips a positive-NPV project",
      ],
      answer: 3,
      explanation: "In separating the high type's project never happens, so its NPV is lost, q × NPV in expectation with q the probability of the high type: underinvestment, the same family as debt overhang. In pooling both types invest, and the high type's loss is a transfer to the low type through the new investors, not a deadweight loss. Rational beliefs do not guarantee an efficient outcome.",
    },
    {
      id: "kj6-s4",
      q: "A company sells 2 million new shares in its IPO at 50 NOK, and they close the first day at 60 NOK. Who bears the 20 million NOK left on the table?",
      options: [
        "The company, which books a 20 million loss in its accounts",
        "The underwriter, which must buy the shares back at 60",
        "The pre-IPO shareholders, who gave up shares worth 60 each for 50",
        "Nobody, because no cash changes hands on the first trading day",
      ],
      answer: 2,
      explanation: "Underpricing never appears in the company's accounts: its cash is the net proceeds either way. The cost falls on the pre-IPO owners, whose stake was diluted by more new shares than the money required. Saying nobody pays ignores that those shares could have been sold for 60.",
    },
  ],
  case: {
    id: "kj6-m1",
    open: true,
    topic: "Myers-Majluf: price the issue, then test the belief",
    points: 6,
    minutes: 10,
    body: `<p>Tindefjell ASA has assets in place worth 320 if its licence was renewed and 120 if it was not. Management knows which; the market attaches probability q = 0.40 to the high value. A new plant requires I = 80, raised today by an equity issue, and adds a publicly known NPV = 20. The firm has no cash and no access to debt, and without the issue the project is lost. Management acts for the existing shareholders, who do not buy into the issue. Figures in millions of NOK.</p>
<p>(a) Price the issue under the belief that both types issue, and state what each type does. (2 points)</p>
<p>(b) Find the equilibrium: reprice the issue under the belief that survives, and verify that both types behave as that belief assumes. (2 points)</p>
<p>(c) How much value does the information problem destroy in expectation? Name the mechanism, and say how much of the loss would be recovered if the firm instead held 80 of cash, known to everyone, to fund the project. (2 points)</p>`,
    solution: `<p><b>(a) Pooling candidate.</b> E[V | issue] = 0.40 × 320 + 0.60 × 120 = 128 + 72 = 200. Post-issue value in investors' eyes = 200 + 80 + 20 = 300, so α = 80/300 = <b>0.2667</b> (4/15).</p>
<p>High type: (11/15)(320 + 80 + 20) = (11/15)(420) = 308.0000, below the 320 it keeps by not issuing, so it does <b>not</b> issue. Its dilution (4/15)(320 − 200) = 32.0000 exceeds the NPV of 20.</p>
<p>Low type: (11/15)(120 + 80 + 20) = (11/15)(220) = 161.3333, above 120, so it issues.</p>
<p><b>(b) Consistency check 5.</b> The belief assumed both types issue, but the high type does not, so the pooling belief is not rational. The surviving belief is separating: only the low type issues, so E[V | issue] = 120 and α = 80/(120 + 80 + 20) = 80/220 = <b>0.3636</b> (4/11).</p>
<p>Low type: (7/11)(220) = 140.0000 &gt; 120, so it still issues ✓ (and 140 = V<sub>L</sub> + NPV, as it must be once its type is revealed). High type if it deviated: (7/11)(420) = 267.2727 &lt; 320, so it abstains ✓. Both behave as assumed: a separating equilibrium. Check: before the announcement the firm is worth 0.40 × 320 + 0.60 × 140 = 212, which equals 200 + 0.60 × 20 ✓</p>
<p><b>(c) Value lost.</b> The high type forgoes a project with NPV 20, so the expected loss is q × NPV = 0.40 × 20 = <b>8.00</b>. This is underinvestment caused by adverse selection, the same family as debt overhang. With 80 of cash the high type funds the project without selling any shares, so there is no dilution and its old shareholders capture the full NPV of 20. It invests, and the whole 8.00 is recovered.</p>`,
    criteria: [
      "Pooling: E[V | issue] = 200 and alpha = 80/300 = 0.2667 with I in the denominator; the high type gets 308.00, below 320, and abstains, while the low type gets 161.33 and issues.",
      "Check 5: the pooling belief is not rational; separating alpha = 80/220 = 0.3636, the low type gets 140.00 (above 120) and the high type would get only 267.27, so it abstains.",
      "Expected loss q × NPV = 0.40 × 20 = 8.00, named as underinvestment from adverse selection; cash slack recovers all of it.",
    ],
  },
});

/* kj7 · Options: payoffs, parity, binomial pricing, Black-Scholes */
window.EDU_DATA.kjerne.push({
  id: "kj7",
  num: 7,
  title: "Options: payoffs, parity, binomial pricing, Black-Scholes",
  chapters: [21, 22, 23],
  html: `
<div class="callout kort"><span class="h">In short</span>An option is the right, but not the duty, to buy (a call) or sell (a put) an asset at a fixed price. You only use it when it pays, so its payoff is never negative. This part shows how to read payoffs, how calls and puts are linked (put-call parity) and how to price an option. The binomial model does it by building a portfolio of shares and bonds with the same payoff. Black-Scholes is the continuous version of the same idea. The tools return in kj8 and kj9.</div>

<p class="lead-in">Options are examined three ways. Put-call parity is a quick computation (2023 MC9–10). The binomial model, in seven of eleven papers, is a full exercise: 2022 Problem 4, and H2024 Exercise 6 (a 20-point real option). Black-Scholes is now pure intuition: H2025 Exercise 1 asked about volatility and a mispriced option.</p>

<h3>Payoffs, bounds and put-call parity</h3>
<p>A call gives the right to buy one share at the strike K on the expiry date T; a put gives the right to sell. Assume European options (exercise only at T) unless told otherwise:</p>
<div class="formula"><div class="eq">call payoff = max(S<sub>T</sub> − K, 0) · put payoff = max(K − S<sub>T</sub>, 0)</div>
<div class="where">A call is in the money when S &gt; K, a put when S &lt; K. Profit subtracts the premium; the exercise decision ignores it.</div></div>
<p>Arbitrage alone bounds European options on a share paying no dividends:</p>
<div class="formula"><div class="eq">max(S − PV(K), 0) ≤ C ≤ S · max(PV(K) − S, 0) ≤ P ≤ PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. The floor uses the discounted strike, not the intrinsic value S − K, because K is paid only at T. So an American call on a non-dividend share is never exercised early.</div></div>
<p>A share plus a put, and a call plus a bond paying K, both pay max(S<sub>T</sub>, K) in every state, so they cost the same:</p>
<div class="formula"><div class="eq">C + PV(K) = P + S ⟺ C − P = S − PV(K)</div>
<div class="where">Put-call parity, not on the formula sheet. It needs European options on the same share with the same K and T, and no dividends before T. No volatility, expected return or probability enters, so it holds under any model. Three of C, P, S and PV(K) give the fourth. If quotes violate it, buy the cheap side and sell the dear one; the profit today equals the gap.</div></div>

<h3>The one-period binomial model</h3>
<p>The share moves from S<sub>0</sub> to S<sub>u</sub> or S<sub>d</sub>, and no arbitrage requires S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>. Hold Δ shares and B in bonds so that the portfolio pays exactly C<sub>u</sub> and C<sub>d</sub>:</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) · B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>) · C = S<sub>0</sub>Δ + B</div>
<div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) · C = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Both routes are on the formula sheet and always agree. B &lt; 0 means borrowing; a put has Δ &lt; 0. ρ, the risk-neutral probability, makes the share earn r<sub>f</sub>: a pricing weight, not a forecast, so discount at r<sub>f</sub>. Any traded asset on the tree gives the same ρ, which is how kj9 values a project.</div></div>
<div class="callout mech"><span class="h">Why the real probability never appears</span>The replicating portfolio matches the option's payoff in every state, not on average, so its cost is the price whatever anyone believes. Beliefs and risk aversion are not lost: they sit inside S<sub>0</sub>. Pairing a real probability with r<sub>f</sub> is the big error; for a share with a risk premium it overprices a call.</div>

<div class="worked"><span class="wh">Worked example: a call both ways, then the put and parity</span>
<p>S<sub>0</sub> = 100.00, S<sub>u</sub> = 130.00, S<sub>d</sub> = 80.00, r<sub>f</sub> = 4.00%, K = 105, one year. Tree check: 80.00 &lt; 104.00 &lt; 130.00 ✓</p>
<p><b>Step 1, replication.</b> C<sub>u</sub> = 25.00, C<sub>d</sub> = 0.00. Δ = 25.00/50.00 = 0.5000. B = (0.00 − 80.00 × 0.5000)/1.04 = −38.4615 (borrow). C = 50.0000 − 38.4615 = <b>11.5385</b>. State by state, repaying 40.00: 65.00 − 40.00 = 25.00 and 40.00 − 40.00 = 0.00 ✓</p>
<p><b>Step 2, risk-neutral.</b> ρ = (104.00 − 80.00)/50.00 = 0.4800. It prices the share: [0.4800(130.00) + 0.5200(80.00)]/1.04 = 104.0000/1.04 = 100.00 ✓. C = 0.4800(25.00)/1.04 = 12.0000/1.04 = <b>11.5385</b>.</p>
<p><b>Step 3, the put.</b> P<sub>u</sub> = 0.00, P<sub>d</sub> = 25.00. Δ<sub>P</sub> = (0.00 − 25.00)/50.00 = −0.5000, B<sub>P</sub> = (25.00 − 80.00 × (−0.5000))/1.04 = 62.5000 (lend), P = −50.0000 + 62.5000 = <b>12.5000</b>. Risk-neutral: 0.5200(25.00)/1.04 = 12.5000 ✓</p>
<p><b>Check, parity:</b> PV(K) = 105/1.04 = 100.9615, so P + S<sub>0</sub> − PV(K) = 12.5000 + 100.0000 − 100.9615 = 11.5385 = C ✓. This check can fail: call and put came from different payoffs and hedge ratios, so it catches a sign error in Δ<sub>P</sub> or a wrongly discounted strike.</p>
</div>

<h3>Black-Scholes and volatility</h3>
<p>With many small binomial steps the price converges to Black-Scholes, for a European call on a share paying no dividends:</p>
<div class="formula"><div class="eq">C = S·N(d<sub>1</sub>) − PV(K)·N(d<sub>2</sub>)</div>
<div class="eq">d<sub>1</sub> = ln[S/PV(K)]/(σ√T) + σ√T/2 · d<sub>2</sub> = d<sub>1</sub> − σ√T</div>
<div class="where">σ is the annual volatility of returns. This is C = SΔ + B again: N(d<sub>1</sub>) is the hedge ratio Δ, PV(K)·N(d<sub>2</sub>) the borrowing. N(d<sub>2</sub>) is the risk-neutral probability of finishing in the money; N(d<sub>1</sub>) is not a probability. No expected return appears. The sheet has had no N(d) tables since 2021.</div></div>
<table class="data">
<tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>Share price S</td><td>↑</td><td>↓</td><td>The call buys the share, the put sells it</td></tr>
<tr><td>Strike K</td><td>↓</td><td>↑</td><td>You pay K on a call, receive it on a put</td></tr>
<tr><td>Volatility σ</td><td>↑</td><td>↑</td><td>Truncated downside: dispersion adds only upside</td></tr>
<tr><td>Time to expiry T</td><td>↑</td><td>↑ American, ambiguous European</td><td>More dispersion, but a smaller PV(K) hurts the put</td></tr>
<tr><td>Risk-free rate r<sub>f</sub></td><td>↑</td><td>↓</td><td>A higher rate shrinks PV(K)</td></tr>
<tr><td>Dividends before T</td><td>↓</td><td>↑</td><td>The share drops ex-dividend; the holder gets no cash</td></tr>
</table>
<div class="callout mech"><span class="h">Why volatility raises both a call and a put</span>Spread out the distribution of S<sub>T</sub>. Extra high prices raise the call's payoff without limit, while extra low prices cost nothing, because the payoff is already zero there; the put mirrors this. The gain comes from the kink, not from a reward for risk. Since σ is absent from C − P = S − PV(K), call and put move by the same amount. Risk shifting (kj5), equity as a call (kj8) and real options (kj9) rest on the same kink.</div>
<p><b>Implied volatility</b> is the σ that makes the formula reproduce the market price. Since C rises strictly with σ, each price gives exactly one. It is a risk-neutral model output, not a measurement of the share.</p>
<p><b>The H2025 Exercise 1 question.</b> In k23 a call at 15.4519 implies σ = 40%; at a true σ of 25% it is worth 9.5220. Answer in four moves:</p>
<ol><li>Comparative static: call value rises with σ.</li>
<li>Direction: the call is worth less than its price, so it is overpriced, here by 5.9299. By parity the put is overpriced by the same amount.</li>
<li>Action: write the call and buy N(d<sub>1</sub>) shares, rebalancing as it moves, so you bet on volatility, not direction.</li>
<li>Limit: not an arbitrage. Your σ may be wrong, rebalancing costs money, and a naked written call has unlimited loss.</li></ol>

<div class="callout warn"><span class="h">Errors that lose points</span>S − K instead of S − PV(K) as the lower bound. Δ = C<sub>u</sub>/S<sub>u</sub>, or a positive Δ for a put. A real-probability expectation discounted at r<sub>f</sub>. ln(S/K) instead of ln[S/PV(K)]. "More time is worth more" said of a European put. Implied volatility, ρ or N(d<sub>2</sub>) presented as forecasts.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Put-call parity, C − P = S − PV(K), is not on the sheet; it holds for European options with equal K and T, no dividends, under any model.</li>
<li>A binomial price by replication (Δ, B) equals the price by ρ discounted at r<sub>f</sub>; the real probability never enters.</li>
<li>In Black-Scholes, N(d<sub>1</sub>) is the hedge ratio and N(d<sub>2</sub>) the risk-neutral probability of finishing in the money.</li>
<li>Volatility raises both calls and puts, because the payoff is truncated at zero; by parity, by the same amount.</li>
<li>True volatility below implied means the option is overpriced: write it and delta-hedge with N(d<sub>1</sub>) shares. A bet on volatility, not an arbitrage.</li></ul></div>
`,
  checks: [
    {
      id: "kj7-s1",
      q: "A European call and a European put on the same non-dividend share have the same strike and expiry. The put trades 4.00 above the call. What must be true?",
      options: [
        "The share price is 4.00 below the present value of the strike",
        "The share price is 4.00 below the strike",
        "The market expects the share to fall, so investors have bid up the put",
        "Nothing: calls should cost more than puts, so buying the call and writing the put is an arbitrage",
      ],
      answer: 0,
      explanation: "Parity gives C − P = S − PV(K), so C − P = −4.00 means S = PV(K) − 4.00. Comparing S with the undiscounted strike is the tempting slip, but K is paid only at T and must be discounted. Beliefs about direction do not enter parity at all: whether the call or the put is dearer depends only on S against PV(K).",
    },
    {
      id: "kj7-s2",
      q: "You have priced a one-period call by replication. An analyst now raises his probability of the up state from 0.50 to 0.70, while S<sub>0</sub>, S<sub>u</sub>, S<sub>d</sub>, K and r<sub>f</sub> are unchanged. The call's value…",
      options: [
        "rises, because the call's expected payoff rises",
        "rises to the new expected payoff discounted at r<sub>f</sub>",
        "cannot be found until you know the call's own expected return",
        "is unchanged: the replicating portfolio costs the same",
      ],
      answer: 3,
      explanation: "The portfolio of Δ shares and B in bonds pays the call's payoff in every state, so its cost fixes the price whatever the probabilities are. The expected payoff does rise, but discounting it at r<sub>f</sub> pairs a real probability with a risk-free rate and overprices the call. The call's own expected return would work as a discount rate, but you only know it once you have the price, which is why the risk-neutral route exists.",
    },
    {
      id: "kj7-s3",
      q: "The volatility of a non-dividend share rises while S, K, T and r<sub>f</sub> stay fixed. What happens to a European call and a European put on it with the same strike and expiry?",
      options: [
        "The call rises and the put falls, since they are bets in opposite directions",
        "Both rise, and by exactly the same amount",
        "Both fall, because investors demand compensation for risk",
        "The call rises, while the put is unchanged because its payoff is capped at K",
      ],
      answer: 1,
      explanation: "Both payoffs are truncated at zero, so extra dispersion adds upside without adding downside: in the high states for the call, in the low states for the put. Parity says C − P = S − PV(K), and σ is not in that expression, so the two changes must be equal. The opposite-directions answer describes a change in S, not in σ.",
    },
    {
      id: "kj7-s4",
      q: "A call's market price implies a volatility of 40%. You are confident the share's true volatility is 25%. Which response is right?",
      options: [
        "Buy the call: at a lower volatility it is less risky to hold",
        "Buy the put: if the call is overpriced, parity makes the put cheap",
        "Write the call and hold nothing else, since the profit is riskless",
        "Write the call and delta-hedge with N(d<sub>1</sub>) shares",
      ],
      answer: 3,
      explanation: "Call value rises with σ, so at your 25% the call is worth less than its price: it is overpriced and you sell it. Buying N(d<sub>1</sub>) shares hedges the exposure to S, leaving only your view on volatility. It is not riskless: you may be wrong about σ, the hedge must be rebalanced, and a naked written call has unlimited loss. Nor is the put cheap: σ is absent from parity, so the put is overpriced by the same amount.",
    },
  ],
  case: {
    id: "kj7-m1",
    open: true,
    topic: "One-period binomial: a put, parity and a mispriced call",
    points: 6,
    minutes: 10,
    body: `<p>Vikfjord Kjemi ASA trades at S<sub>0</sub> = 60.00 and pays no dividend. In one year the share will be worth either 80.00 or 50.00, and nothing else can happen. The one-year risk-free rate is r<sub>f</sub> = 5.00%. The firm's analyst puts the probability of the up state at 0.70. Consider one-year European options on the share with strike K = 65.</p>
<p>(a) Price the put by replication (Δ and B), and confirm the price with the risk-neutral probability ρ. (3 points)</p>
<p>(b) Use put-call parity to find the call, and verify it with ρ. (1 point)</p>
<p>(c) The call is quoted at 7.00. Set out the arbitrage, show that it owes nothing at date 1 in either state, and state the profit today. (2 points)</p>`,
    solution: `<p><b>(a) The put.</b> Tree check: 50.00 &lt; 1.05 × 60.00 = 63.00 &lt; 80.00 ✓. Payoffs: P<sub>u</sub> = max(65 − 80.00, 0) = 0.00, P<sub>d</sub> = 65 − 50.00 = 15.00.</p>
<p>Δ<sub>P</sub> = (0.00 − 15.00)/(80.00 − 50.00) = −0.5000 (short half a share). B<sub>P</sub> = (15.00 − 50.00 × (−0.5000))/1.05 = 40.00/1.05 = 38.0952 (lend). P = 60.00(−0.5000) + 38.0952 = −30.0000 + 38.0952 = <b>8.0952</b>.</p>
<p>ρ = (63.00 − 50.00)/(80.00 − 50.00) = 13/30 = 0.4333, 1 − ρ = 17/30 = 0.5667. It prices the share: [(13/30)(80.00) + (17/30)(50.00)]/1.05 = (34.6667 + 28.3333)/1.05 = 63.0000/1.05 = 60.00 ✓. Put: (17/30)(15.00)/1.05 = 8.5000/1.05 = 8.0952 ✓. The analyst's 0.70 is not used: the portfolio matches the put in both states, so beliefs cannot change its price.</p>
<p><b>(b) The call by parity.</b> PV(K) = 65/1.05 = 61.904762. C = P + S − PV(K) = 8.095238 + 60.000000 − 61.904762 = <b>6.1905</b>. With ρ: C<sub>u</sub> = 15.00, C<sub>d</sub> = 0.00, so C = (13/30)(15.00)/1.05 = 6.5000/1.05 = 6.1905 ✓. Pairing the analyst's 0.70 with r<sub>f</sub> would give 0.70(15.00)/1.05 = 10.0000, overpricing the call by 3.8095.</p>
<p><b>(c) The arbitrage.</b> 7.00 &gt; 6.1905, so the call is overpriced: write it and buy the replicating portfolio. Δ<sub>C</sub> = (15.00 − 0.00)/30.00 = 0.5000, B<sub>C</sub> = (0.00 − 50.00 × 0.5000)/1.05 = −23.8095 (borrow). Cash today: +7.0000 − 30.0000 + 23.8095 = <b>+0.8095</b>.</p>
<p>At date 1 the loan costs 23.8095 × 1.05 = 25.00. Up: 0.5(80.00) − 25.00 − 15.00 = 0.00. Down: 0.5(50.00) − 25.00 − 0.00 = 0.00. Nothing is owed in either state. Check: the profit today equals the mispricing, 7.0000 − 6.1905 = 0.8095 ✓.</p>`,
    criteria: [
      "Put by replication: Delta_P = −0.5000, B_P = 38.0952 (lend), P = 8.0952, confirmed with rho = 13/30 = 0.4333; the analyst's 0.70 is not used",
      "Call from parity: C = P + S − PV(K) = 6.1905 with PV(K) = 65/1.05 = 61.9048, matching rho × 15/1.05",
      "Arbitrage: write the call at 7.00, buy 0.5 shares, borrow 23.8095; profit today 0.8095 = 7.00 − 6.1905 and zero in both states at date 1",
    ],
  },
});

/* kj8 · Debt and equity as options, and credit risk */
window.EDU_DATA.kjerne.push({
  id: "kj8",
  num: 8,
  title: "Debt and equity as options, and credit risk",
  chapters: [5, 24],
  html: `
<div class="callout kort"><span class="h">In short</span>This part applies options to the firm's own claims. Shareholders can walk away when the firm is worth less than its debt, so equity works like a call option on the firm's assets, with the face value of the debt as the strike price. Risky debt is then safe debt minus a put. That explains why a bond's promised yield is higher than its expected return, how default risk is priced and why more risk in the assets moves value from lenders to shareholders. Credit default swaps, which insure a lender against default, close the part.</div>

<p class="lead-in">Credit risk and option-based debt pricing are in eight of eleven mapped papers: 2015 Problem 4 alone was worth 90 points, and 2016 Problem 4, 2021 MC7–9 and V2024 Problems 3 and 4 sit here too. Neither Kurbatov paper has used it yet, so it is a real risk rather than a certainty.</p>

<h3>Promised versus expected return</h3>
<p>A zero-coupon bond with face value F and price P has yield y = (F/P)<sup>1/n</sup> − 1, a promised return earned only if every krone arrives. With default probability p and loss given default L = 1 − R (R the recovery rate):</p>
<div class="formula"><div class="eq">r<sub>D</sub> = y − p·L · credit spread = y − r<sub>f</sub></div>
<div class="where">Not on the sheet. The wedge y − r<sub>D</sub> = p·L is expected loss, money the lender never expects to get; it never enters β<sub>D</sub>. Only r<sub>D</sub> − r<sub>f</sub> is a risk premium, because defaults cluster in bad times: β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(market risk premium). Never put y in a WACC. Given payoffs, compute r<sub>D</sub> from expected cash flows instead and say so.</div></div>

<h3>Equity is a call on the firm's assets</h3>
<p>Let the assets be worth V<sub>T</sub> when the only debt, a zero-coupon bond with face value F, matures. Limited liability gives:</p>
<div class="formula"><div class="eq">E<sub>T</sub> = max(V<sub>T</sub> − F, 0) · D<sub>T</sub> = min(V<sub>T</sub>, F)</div>
<div class="eq">E = Call(V, F, T) · D = V − Call = PV(F) − Put(V, F, T)</div>
<div class="where">The strike is the face value F (k24 calls it K), and σ is asset volatility, not share volatility. The lender has written the shareholders a put: the right to hand over the assets instead of paying F. From D, y = (F/D)<sup>1/T</sup> − 1 and the spread is y − r<sub>f</sub>.</div></div>
<figure>
<svg viewBox="0 0 620 360" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Payoff diagram at maturity splitting firm value between debt and equity. Equity is flat at zero up to the face value F and then rises one for one, which is a call payoff. Debt rises one for one up to F and is then flat at F, which equals a risk-free payment of F minus a put payoff, the shaded triangle below F."
     font-family="Georgia,serif" font-size="12.5">
  <polygon points="70,300 70,175 320,175" fill="#b06000" fill-opacity="0.12"/>
  <line x1="70" y1="300" x2="595" y2="300" stroke="#333" stroke-width="1.4"/>
  <line x1="70" y1="300" x2="70" y2="45" stroke="#333" stroke-width="1.4"/>
  <line x1="70" y1="175" x2="570" y2="175" stroke="#999" stroke-dasharray="5 4"/>
  <text x="500" y="168" fill="#555" font-size="11.5">risk-free debt: F in every state</text>
  <line x1="70" y1="300" x2="570" y2="50" stroke="#2f5a3f" stroke-width="1.1" stroke-dasharray="2 6"/>
  <text x="574" y="54" fill="#2f5a3f" font-size="11.5">V</text>
  <polyline points="70,300 320,175 570,175" fill="none" stroke="#1f3a5f" stroke-width="2.4"/>
  <polyline points="70,300 320,300 570,175" fill="none" stroke="#6b1f2a" stroke-width="2.6"/>
  <text x="200" y="215" fill="#1f3a5f" font-weight="bold">D = min(V, F)</text>
  <text x="430" y="252" fill="#6b1f2a" font-weight="bold">E = max(V − F, 0)</text>
  <text x="392" y="272" fill="#6b1f2a" font-size="11.5">the call</text>
  <text x="112" y="264" fill="#b06000" font-size="11.5">the put the</text>
  <text x="112" y="280" fill="#b06000" font-size="11.5">lender wrote</text>
  <line x1="320" y1="300" x2="320" y2="120" stroke="#999" stroke-dasharray="4 4"/>
  <text x="320" y="112" text-anchor="middle" fill="#555">F, the face value</text>
  <circle cx="320" cy="300" r="4" fill="#6b1f2a"/>
  <circle cx="320" cy="175" r="4" fill="#1f3a5f"/>
  <text x="62" y="304" text-anchor="end" fill="#555" font-size="11">0</text>
  <text x="62" y="179" text-anchor="end" fill="#555" font-size="11">F</text>
  <text x="24" y="175" text-anchor="middle" transform="rotate(-90 24 175)" fill="#333">Payoff at maturity</text>
  <text x="330" y="332" text-anchor="middle" fill="#333">Value of the firm's assets at maturity, V<tspan baseline-shift="sub" font-size="9">T</tspan></text>
  <text x="452" y="120" fill="#2f5a3f" font-size="11.5">D + E = V in every state</text>
  <line x1="570" y1="175" x2="570" y2="120" stroke="#2f5a3f" stroke-width="1.2"/>
</svg>
<figcaption>Equity (red) is a call struck at F. Debt (blue) is a safe F minus the shaded put.</figcaption>
</figure>
<p>With Black-Scholes on the assets, E = V·N(d<sub>1</sub>) − PV(F)·N(d<sub>2</sub>), and 1 − N(d<sub>2</sub>) is the risk-neutral default probability, above the true one. The equity beta follows:</p>
<div class="formula"><div class="eq">β<sub>E</sub> = N(d<sub>1</sub>)·(V/E)·β<sub>U</sub></div>
<div class="where">Memorise it. N(d<sub>1</sub>) is the equity's delta with respect to V, and V/E the leverage inside the option, so β<sub>E</sub> explodes as the firm nears distress.</div></div>
<div class="callout mech"><span class="h">Why volatility helps equity and hurts debt</span>Equity is a call, and a call gains from volatility (kj7). Raise asset volatility with V unchanged and the call gains exactly what the lender's written put loses: a pure transfer, so check 4 holds. This is risk shifting (kj5) with a price on it, and why lenders write covenants.</div>

<h3>Credit default swaps and coinsurance</h3>
<div class="formula"><div class="eq">CDS payoff = max(F − V<sub>T</sub>, 0) · upfront price = PV(F) − D · spread s = q·L</div>
<div class="where">A CDS buys back the lender's put, so risky bond + CDS = risk-free bond. q is the risk-neutral default probability over the period, not a historical default rate. Backwards: q = s/L.</div></div>
<p><b>Coinsurance.</b> Merge two firms with imperfectly correlated assets and no synergies, and one firm's good state covers the other's shortfall, so the merged firm defaults less often. In k24, two independent firms worth 100 or 40 (ρ = 0.5, r<sub>f</sub> = 0) with debt of face value 60 each merge: only the bad-bad state still defaults, debt rises from 100 to 110 and equity falls from 40 to 30 (check 4). A call on a portfolio is worth no more than a portfolio of calls.</p>

<div class="worked"><span class="wh">Worked example: split a two-state firm and price its credit</span>
<p>Assets V<sub>0</sub> = 100, worth 130 or 80 in one year. One zero-coupon bond, F = 90, due in one year. r<sub>f</sub> = 5.00%, and the assets are traded.</p>
<table class="data">
<tr><th>State</th><th>V<sub>T</sub></th><th>Debt</th><th>Equity</th><th>Put</th></tr>
<tr><td>Up</td><td class="n">130</td><td class="n">90</td><td class="n">40</td><td class="n">0</td></tr>
<tr><td>Down</td><td class="n">80</td><td class="n">80</td><td class="n">0</td><td class="n">10</td></tr>
</table>
<p><b>Step 1, the claims.</b> ρ = (1.05 × 100 − 80)/(130 − 80) = 0.5000. E = 0.5000(40)/1.05 = 19.0476, D = [0.5000(90) + 0.5000(80)]/1.05 = 80.9524. E + D = 100.0000 = V<sub>0</sub> ✓</p>
<p><b>Step 2, debt as risk-free minus a put.</b> PV(F) = 90/1.05 = 85.7143, Put = 0.5000(10)/1.05 = 4.7619, and 85.7143 − 4.7619 = 80.9524 = D ✓</p>
<p><b>Step 3, yield and spread.</b> y = 90/80.9524 − 1 = 11.1765%, spread 6.1765%.</p>
<p><b>Step 4, the CDS.</b> Protection on 90 pays 0 or 10, the put: 4.7619 upfront. Paid at year end, s = 4.7619 × 1.05/90 = 5.5556% = q·L = 0.5000 × 10/90. Bond plus CDS costs 85.7143 and pays 90 for sure: 5.0000% = r<sub>f</sub> ✓</p>
<p><b>Step 5, expected return.</b> With a real down probability of 0.35, E[payment] = 0.65(90) + 0.35(80) = 86.5000 and r<sub>D</sub> = 86.5000/80.9524 − 1 = 6.8529%. <b>Check:</b> r<sub>f</sub> &lt; r<sub>D</sub> &lt; y ✓</p>
</div>

<div class="callout warn"><span class="h">Errors that lose points</span>Using y as r<sub>D</sub> or reading the whole spread as risk premium. Share volatility where asset volatility belongs. Pricing debt directly instead of as V − E or PV(F) − Put. Pairing real probabilities with r<sub>f</sub>. Calling 1 − N(d<sub>2</sub>) a default forecast.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>The yield is promised; r<sub>D</sub> = y − p·L is expected (p the default probability, L the loss given default), and the wedge p·L is expected loss, which never enters β<sub>D</sub>.</li>
<li>Equity is a call on the firm's assets struck at the face value F; risky debt = PV(F) − Put = V − Call.</li>
<li>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub> is not on the sheet; it explodes near distress.</li>
<li>More asset volatility with V fixed moves value from creditors to shareholders (check 4).</li>
<li>A CDS is the lender's put, priced off the risk-neutral default probability: spread q·L, and risky bond + CDS = risk-free bond.</li></ul></div>
`,
  checks: [
    {
      id: "kj8-s1",
      q: "A bond has promised yield y = 9.00%. The default probability is p = 5% and the loss given default is L = 60%. With r<sub>f</sub> = 4.00% and a market risk premium of 5.00%, the debt beta is…",
      options: [
        "1.00, from the spread y − r<sub>f</sub>",
        "0.60, from the expected loss p·L",
        "0.00, because the expected loss has been deducted and what remains is safe",
        "0.40, from r<sub>D</sub> = 9.00% − 3.00% = 6.00%",
      ],
      answer: 3,
      explanation: "The expected return is r<sub>D</sub> = y − p·L = 0.0900 − 0.0300 = 0.0600, and β<sub>D</sub> = (0.0600 − 0.0400)/0.0500 = 0.40. Taking beta from the whole spread treats expected loss as a risk premium, but p·L is money the lender never expects to receive and carries no beta. The remaining 2.00 percentage points over r<sub>f</sub> is real compensation for systematic default risk, so β<sub>D</sub> is not zero.",
    },
    {
      id: "kj8-s2",
      q: "Managers of a levered firm swap its assets for riskier ones with the same total market value V. Nothing else changes. What happens?",
      options: [
        "Equity rises and debt falls by the same amount",
        "Equity and debt both fall, because investors dislike risk",
        "Nothing, because V is unchanged",
        "Debt rises, because creditors now receive a higher promised yield",
      ],
      answer: 0,
      explanation: "Equity is a call on V struck at F, and a call gains from volatility; debt is PV(F) minus a put, and the put gains too, so debt falls. With V fixed the change is a pure transfer: the shareholders' gain equals the creditors' loss (check 4), and the credit spread widens. The promised yield on existing debt rises only because its price falls, which hurts the holders rather than helping them.",
    },
    {
      id: "kj8-s3",
      q: "A one-year CDS on a firm trades at a spread of 3.00% of notional, and the market assumes 40% recovery. What does this tell you about default?",
      options: [
        "The default probability is 3.00%, the spread itself",
        "The default probability is 7.50%, the spread divided by the recovery rate",
        "The default probability is 5.00%, the market's forecast of how often firms like this default",
        "The default probability is 5.00%, a risk-neutral figure above the true default probability",
      ],
      answer: 3,
      explanation: "The spread is the risk-neutral expected loss rate, s = q·L, so q = 0.0300/0.60 = 0.0500. It must be divided by the loss given default, 1 − R = 0.60, not by the recovery rate. Because it is a pricing probability, it already contains the premium for default clustering in bad times, so it overstates the real default frequency and is not a forecast.",
    },
  ],
  case: {
    id: "kj8-m1",
    open: true,
    topic: "A two-state firm: equity, debt, spread and a CDS",
    points: 6,
    minutes: 10,
    body: `<p>Trollheim Maskin AS has assets worth V<sub>0</sub> = 150 today (NOK million). In one year the assets will be worth either 190 or 110. The firm's only liability is a zero-coupon bond with face value F = 130, due in one year. The one-year risk-free rate is r<sub>f</sub> = 4.00%, and the assets are traded, so risk-neutral valuation applies directly to V.</p>
<p>(a) Find the risk-neutral probability ρ of the up state, value the equity and the debt, and show that they add up to V<sub>0</sub>. (2 points)</p>
<p>(b) Compute the promised yield and the credit spread on the bond, and show that the debt equals risk-free debt minus a put. (2 points)</p>
<p>(c) A bank sells a one-year CDS on the full face value of 130. Find its upfront price, and the running spread s, as a fraction of the 130 notional, if the premium is instead paid at the end of the year in both states. Show that the bond plus the CDS earns r<sub>f</sub>. (2 points)</p>`,
    solution: `<p><b>(a) ρ and the two claims.</b> ρ = (1.04 × 150 − 110)/(190 − 110) = (156 − 110)/80 = 0.5750, so 1 − ρ = 0.4250. Up: debt 130, equity 60. Down: debt 110, equity 0.</p>
<p>E = 0.5750(60)/1.04 = 34.5000/1.04 = <b>33.1731</b>. D = [0.5750(130) + 0.4250(110)]/1.04 = (74.7500 + 46.7500)/1.04 = 121.5000/1.04 = <b>116.8269</b>. Check: 33.1731 + 116.8269 = 150.0000 = V<sub>0</sub> ✓. Equity is a call on the assets struck at the face value 130.</p>
<p><b>(b) Yield, spread and the put.</b> y = 130/116.8269 − 1 = <b>11.2757%</b>, a promised return. Spread = 11.2757% − 4.0000% = <b>7.2757%</b>.</p>
<p>PV(F) = 130/1.04 = 125.0000. The put pays max(130 − V, 0): 0 up, 20 down, so Put = 0.4250(20)/1.04 = 8.5000/1.04 = 8.1731. D = 125.0000 − 8.1731 = 116.8269 ✓, the same as in (a).</p>
<p><b>(c) The CDS.</b> The protection pays 0 up and 130 − 110 = 20 down, exactly the put, so the upfront price is <b>8.1731</b> = PV(F) − D = 125.0000 − 116.8269.</p>
<p>Paid at year end: s × 130/1.04 = 8.1731, so s = 8.5000/130 = <b>6.5385%</b>. That is q·L with q = 1 − ρ = 0.4250 and L = 20/130 = 0.153846: 0.4250 × 0.153846 = 0.065385 ✓. It is below the bond spread of 7.2757% because the bond spread is charged on the price 116.8269, not on 130.</p>
<p>Bond plus CDS costs 116.8269 + 8.1731 = 125.0000 and pays 130 in both states: 130/125.0000 − 1 = 4.0000% = r<sub>f</sub> ✓. Risky bond + CDS = risk-free bond.</p>`,
    criteria: [
      "rho = 0.5750; E = 33.1731 and D = 116.8269, summing to V0 = 150",
      "y = 11.2757% (promised), spread = 7.2757%; D = PV(F) − Put = 125.0000 − 8.1731",
      "CDS upfront = 8.1731 (the put), running spread s = q × L = 0.4250 × 20/130 = 6.5385%",
      "Bond + CDS costs 125.0000 and pays 130 for sure, earning r_f = 4%",
    ],
  },
});

/* kj9 · Real options */
window.EDU_DATA.kjerne.push({
  id: "kj9",
  num: 9,
  title: "Real options",
  chapters: [25],
  html: `
<div class="callout kort"><span class="h">In short</span>Real options are choices built into a real project: waiting before you invest, learning more before you decide or shutting down if things go badly. Standard NPV treats a project as now or never and ignores that flexibility, so it can undervalue the project. This part shows how to value each choice with a simple tree of outcomes, often with the risk-neutral pricing from kj7. A project with a positive NPV today can still be worth waiting for.</div>

<p class="lead-in">Real options have been a fixed exam item since 2017, and both Kurbatov papers gave them 20 points: H2024 Exercise 6 valued a real option with risk-neutral probabilities, and H2025 Exercise 5 asked for the value of information, an exit option and an indifference point. None of it is on the formula sheet.</p>

<h3>The option to wait</h3>
<p>Investing today buys the average outcome, bad states included. Waiting lets you invest only in the good states, since you can always decline: each state pays max(0, NPV). The price is a year of discounting. The option needs uncertainty, information that arrives over time, and an investment that cannot be reversed for free.</p>
<div class="formula"><div class="eq">option to wait = Σ<sub>i</sub> p<sub>i</sub>·max(0, NPV<sub>i</sub>)/(1 + r) − max(0, NPV<sub>now</sub>)</div>
<div class="where">p<sub>i</sub> are real probabilities and r is the project's cost of capital. NPV<sub>i</sub> is measured at the date you would invest, so it is discounted exactly once more. The outer max(0, ·) is there because the alternative to a bad project is doing nothing, worth zero. Wait whenever the option is positive, even if NPV<sub>now</sub> &gt; 0. State the timing: the whole project, cost and cash flows, shifts by one year.</div></div>
<div class="callout mech"><span class="h">Why a positive NPV can still mean wait</span>E[max(0, NPV<sub>i</sub>)] is never below max(0, E[NPV]): deciding state by state drops the bad states, deciding now averages them in. Waiting trades the losses avoided against the cost of delaying the good states, and wins when uncertainty is large, the bad state really bad, and no rival can take the project meanwhile. It is the convexity that makes options gain from volatility (kj7).</div>

<div class="worked"><span class="wh">Worked example: invest now or wait, then the indifference point</span>
<p>A wind farm costs I = 1000, now or in a year. From one year after it is built it pays 150 a year forever (probability 0.50) or 70 forever (0.50); the regime is revealed in one year and is permanent. r = 10.00%.</p>
<p><b>Step 1, invest now.</b> E[cash flow] = 0.50(150) + 0.50(70) = 110, so NPV<sub>now</sub> = 110/0.10 − 1000 = 100. The naive rule says build.</p>
<p><b>Step 2, state NPVs at the investment date.</b> High: 1500 − 1000 = +500. Low: 700 − 1000 = −300. Consistency: 0.50(500) + 0.50(−300) = 100 = NPV<sub>now</sub> ✓</p>
<p><b>Step 3, wait.</b> [0.50(500) + 0.50(0)]/1.10 = 250/1.10 = 227.2727. Option to wait = 227.2727 − 100 = <b>127.2727</b> &gt; 0, so wait.</p>
<p><b>Check, the two forces:</b> avoiding the low branch is worth 0.50(300) = 150.0000; delaying the high branch costs 250.0000 − 227.2727 = 22.7273; and 150.0000 − 22.7273 = 127.2727 ✓</p>
<p><b>Step 4, indifference cost I*.</b> For 700 &lt; I &lt; 1500 only the high state is built after waiting, so set 1100 − I = 0.50(1500 − I)/1.10. Then 1210 − 1.10I = 750 − 0.50I, so I* = 460/0.60 = 766.6667, which lies inside (700, 1500) ✓. Both strategies give 333.3333 there. Build now below I*, wait above.</p>
</div>
<figure>
<svg viewBox="0 0 640 350" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Decision tree for the option to wait. A square decision node branches into invest now, leading to a chance node with a plus five hundred and a minus three hundred branch averaging one hundred, and wait one year, leading to a chance node whose high branch invests for plus five hundred and whose low branch does nothing for zero, averaging two hundred and fifty at date one, or two hundred and twenty seven point two seven today."
     font-family="Georgia,serif" font-size="12.5">
  <text x="88" y="26" text-anchor="middle" fill="#555" font-size="11.5">date 0</text>
  <text x="300" y="26" text-anchor="middle" fill="#555" font-size="11.5">date 1: the price regime is revealed</text>
  <text x="560" y="26" text-anchor="middle" fill="#555" font-size="11.5">outcome</text>
  <line x1="180" y1="36" x2="180" y2="330" stroke="#999" stroke-dasharray="3 6"/>
  <line x1="420" y1="36" x2="420" y2="330" stroke="#999" stroke-dasharray="3 6"/>
  <rect x="62" y="152" width="26" height="26" fill="none" stroke="#333" stroke-width="1.8"/>
  <text x="75" y="196" text-anchor="middle" fill="#333" font-size="11.5">decide</text>
  <line x1="88" y1="158" x2="270" y2="92" stroke="#555" stroke-width="1.6"/>
  <text x="150" y="112" fill="#555" font-size="11.5">invest now</text>
  <line x1="176" y1="120" x2="188" y2="132" stroke="#6b1f2a" stroke-width="1.8"/>
  <line x1="184" y1="116" x2="196" y2="128" stroke="#6b1f2a" stroke-width="1.8"/>
  <circle cx="278" cy="90" r="9" fill="none" stroke="#333" stroke-width="1.6"/>
  <text x="278" y="70" text-anchor="middle" fill="#333" font-size="11.5">100</text>
  <line x1="287" y1="86" x2="470" y2="60" stroke="#555" stroke-width="1.4"/>
  <line x1="287" y1="96" x2="470" y2="128" stroke="#555" stroke-width="1.4"/>
  <text x="360" y="64" fill="#555" font-size="11">high, 0.50</text>
  <text x="360" y="124" fill="#555" font-size="11">low, 0.50</text>
  <text x="478" y="62" fill="#555">NPV = +500</text>
  <text x="478" y="132" fill="#b06000">NPV = −300, and you own it</text>
  <line x1="88" y1="172" x2="270" y2="250" stroke="#6b1f2a" stroke-width="2.6"/>
  <text x="140" y="228" fill="#6b1f2a" font-weight="bold">wait one year</text>
  <circle cx="278" cy="252" r="9" fill="none" stroke="#6b1f2a" stroke-width="2"/>
  <text x="278" y="286" text-anchor="middle" fill="#6b1f2a" font-size="11.5">250 at date 1</text>
  <text x="278" y="302" text-anchor="middle" fill="#6b1f2a" font-size="11.5">227.27 today</text>
  <line x1="287" y1="248" x2="440" y2="212" stroke="#6b1f2a" stroke-width="2"/>
  <line x1="287" y1="258" x2="440" y2="300" stroke="#6b1f2a" stroke-width="2"/>
  <text x="352" y="216" fill="#555" font-size="11">high, 0.50</text>
  <text x="352" y="296" fill="#555" font-size="11">low, 0.50</text>
  <rect x="440" y="200" width="22" height="22" fill="none" stroke="#333" stroke-width="1.6"/>
  <rect x="440" y="290" width="22" height="22" fill="none" stroke="#333" stroke-width="1.6"/>
  <text x="470" y="216" fill="#2f5a3f">invest: NPV<tspan baseline-shift="sub" font-size="9">1</tspan> = +500</text>
  <text x="470" y="306" fill="#2f5a3f">walk away: 0</text>
  <text x="88" y="332" fill="#6b1f2a" font-weight="bold">option to wait = 227.27 − 100 = 127.27</text>
</svg>
<figcaption>The worked example as a decision tree. Squares are decisions, circles are chance. Waiting puts the second decision after the uncertainty resolves, so the −300 is never incurred.</figcaption>
</figure>

<h3>The value of information</h3>
<div class="formula"><div class="eq">VOI = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV])</div>
<div class="where">The informed strategy, deciding state by state, minus the uninformed one, a single decision on the average. No discounting if the information arrives now. If it arrives in a year, use E[max(0, NPV<sub>i</sub>)]/(1 + r) − max(0, E[NPV]). VOI is the most you should pay for a study, and it is zero if the information would change no decision. The benchmark is the best the firm can do without the study: if it could simply wait for the answer, subtract the value of waiting instead, and the study is worth only the cost of the delay it saves.</div></div>
<p>In k25, three states (p = 0.30, 0.50, 0.20) have NPVs of +400, +20 and −300. E[NPV] = 70.0000, so the uninformed firm launches; E[max(0, NPV<sub>i</sub>)] = 130.0000, so VOI = 60.0000. Check: only the weak-state decision changes, saving 0.20(300) = 60.0000 ✓. Delayed a year at r = 12%: 130.0000/1.12 − 70.0000 = 46.0714.</p>

<h3>The exit option</h3>
<p>A running project can often be stopped and its assets sold for a salvage value S. That right is a put on the project. In the exam form, a truncated annuity plus the salvage replaces the bad branch's perpetuity:</p>
<div class="formula"><div class="eq">value at the exit date = max(PV(continuing), S)</div>
<div class="eq">C/r → C·[1 − (1 + r)<sup>−n</sup>]/r + S/(1 + r)<sup>n</sup> for exit at date n</div>
<div class="where">C is the yearly cash flow while operating. The option is worth something only in a branch where continuing is worth less than S. Where continuing beats S you keep operating and the option adds nothing; truncating that tail would be a cost, not an option value.</div></div>
<p>In k25 the tight branch (probability 0.40) pays 40 a year forever. At date 1 continuing is worth 40/0.10 = 400 against a sale price of 700, so the firm sells there; the favourable branch, worth 2000, keeps operating. The option is 0.40(700 − 400)/1.10 = 109.0909.</p>
<p><b>Risk-neutral version.</b> When no probabilities are given but you can value the underlying X at each node, take ρ = [(1 + r<sub>f</sub>)X<sub>0</sub> − X<sub>d</sub>]/(X<sub>u</sub> − X<sub>d</sub>) from it, take max(0, NPV) at each node and discount at r<sub>f</sub> (kj7). In H2024 Exercise 6 the uncertainty was next year's interest rate: the underlying is the project's stream of cash flows, an annuity C·A(r, n) with A(r, n) = [1 − (1 + r)<sup>−n</sup>]/r valued at each node's rate, and the investment cost is the strike, not part of the asset. Never pair a real probability with r<sub>f</sub>.</p>

<div class="callout warn"><span class="h">Errors that lose points</span>Averaging before taking the maximum, which erases the option. Discounting NPV<sub>i</sub> twice, or not at all. Forgetting that the alternative to a bad project is zero, not a negative number. Solving an indifference equation outside the interval where its branch decisions hold. Staying silent on the timing assumption.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Option to wait = Σp<sub>i</sub>·max(0, NPV<sub>i</sub>)/(1 + r) − max(0, NPV<sub>now</sub>); a positive NPV today can still mean wait.</li>
<li>Value of perfect information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]); it is zero if no decision changes.</li>
<li>An exit option turns a perpetuity into a truncated annuity plus salvage, and has value only where continuing is worth less than the salvage.</li>
<li>Indifference point: set the two strategies equal, solve, check the answer lies in its branch interval, and say which side does what.</li>
<li>With no probabilities given, value the underlying at each node (often an annuity, C·[1 − (1 + r)<sup>−n</sup>]/r), take ρ from it and discount at r<sub>f</sub>; the investment is the strike. With real probabilities, discount at the cost of capital.</li></ul></div>
`,
  checks: [
    {
      id: "kj9-s1",
      q: "A project costs 100, today or in one year. Its cash flows are worth 170 or 50 (probability 0.50 each), measured at the date you invest, and you learn which in one year. r = 10%. What should you do, and what is the option to wait worth?",
      options: [
        "Invest now, because NPV<sub>now</sub> = 10 is positive",
        "Wait, and the option to wait is worth 0.50(70)/1.10 = 31.8182",
        "Invest now, because waiting is worth only [0.50(70) + 0.50(−50)]/1.10 = 9.0909",
        "Wait, because the option to wait is worth 31.8182 − 10 = 21.8182",
      ],
      answer: 3,
      explanation: "NPV<sub>now</sub> = 0.50(170) + 0.50(50) − 100 = 10, but waiting lets you skip the state with NPV −50: 0.50(70)/1.10 = 31.8182 today. The option is that minus max(0, NPV<sub>now</sub>), so 21.8182, and you wait. The 9.0909 answer averages before taking the maximum and so builds in the bad state, which erases the option; the 31.8182 answer forgets that investing now is the alternative you give up.",
    },
    {
      id: "kj9-s2",
      q: "If you invest today, two equally likely states give NPVs of +60 and −80. A study that reveals the state today is offered; r = 10%. What is the most you should pay for it?",
      options: [
        "0, because no study can rescue a project whose expected NPV is negative",
        "40, the expected loss avoided in the bad state, 0.50 × 80",
        "30, the informed value 0.50 × 60 minus zero for the uninformed decision",
        "27.2727, because the informed value must be discounted by one year",
      ],
      answer: 2,
      explanation: "VOI = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]) = 30 − max(0, −10) = 30. Without the study the firm would not invest at all, so the study's value is letting it invest in the good state. The 40 answer counts a loss the uninformed firm would never have suffered. No discounting applies, because the information arrives today.",
    },
    {
      id: "kj9-s3",
      q: "In a project's weak branch the cash flow is 20 a year forever from next year, worth 200 at r = 10%, and the assets can be sold now for 150. What does the option to exit add in this branch?",
      options: [
        "Nothing, because continuing is worth more than selling, so you keep operating",
        "50, because the tail given up by truncating the perpetuity is the option's value",
        "150, the salvage value you can collect",
        "−50, because selling for 150 destroys 50 of value",
      ],
      answer: 0,
      explanation: "An exit option is a put struck at the salvage value, used only where continuing is worth less than walking away. Here continuing (200) beats selling (150), so you keep operating and the option adds zero. The 50 is the tail you would give up by exiting, a cost you avoid by not exercising, not an option value. An option can never be worth less than zero, because you are not obliged to use it.",
    },
  ],
  case: {
    id: "kj9-m1",
    open: true,
    topic: "Wait or build, the value of information and the indifference cost",
    points: 6,
    minutes: 10,
    body: `<p>Sandnes Datasenter AS can build a data centre for I = 1500 (NOK million), payable at once. From one year after it is built, the centre earns 220 a year forever if a large cloud customer signs (probability 0.40), or 110 a year forever if it does not (probability 0.60). The customer decides in exactly one year, and the outcome is permanent. The cost of capital is r = 10.00%. The cost is the same if the firm waits a year, and waiting shifts the whole project by one year.</p>
<p>(a) Compute the NPV of building today and the value today of waiting one year. Should the firm build now or wait, and what is the option to wait worth? (3 points)</p>
<p>(b) Suppose instead that the firm must build today or never. A consultant can tell the firm today, with certainty, whether the customer will sign. What is the most the firm should pay for this? (1 point)</p>
<p>(c) Back in the setting of (a), at what investment cost I* would the firm be indifferent between building today and waiting? Show that your answer lies in the interval your equation assumes. (2 points)</p>`,
    solution: `<p><b>(a) Build now or wait.</b> E[cash flow] = 0.40(220) + 0.60(110) = 88 + 66 = 154, so NPV<sub>now</sub> = 154/0.10 − 1500 = 1540 − 1500 = <b>40</b>. The naive NPV rule says build.</p>
<p>State NPVs at the investment date: signs, 220/0.10 − 1500 = 2200 − 1500 = +700; no signing, 110/0.10 − 1500 = 1100 − 1500 = −400. Consistency: 0.40(700) + 0.60(−400) = 280 − 240 = 40 = NPV<sub>now</sub> ✓</p>
<p>Waiting, the firm builds only if the customer signs: [0.40(700) + 0.60(0)]/1.10 = 280/1.10 = <b>254.5455</b>. Option to wait = 254.5455 − max(0, 40) = <b>214.5455</b> &gt; 0, so wait, even though NPV<sub>now</sub> is positive.</p>
<p>Check: avoiding the bad branch is worth 0.60(400) = 240.0000; delaying the good branch costs 280.0000 − 254.5455 = 25.4545; 240.0000 − 25.4545 = 214.5455 ✓</p>
<p><b>(b) Value of perfect information.</b> VOI = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]) = 0.40(700) + 0.60(0) − 40 = 280 − 40 = <b>240</b>. Check: the information changes only the no-signing decision, where it avoids a loss of 400: 0.60(400) = 240 ✓. The benchmark matters: if the firm can wait, as in (a), the same study is worth only 280 − 254.5455 = 25.4545, the cost of the year's delay, because waiting delivers the answer for free a year later.</p>
<p><b>(c) Indifference cost.</b> Build now: 1540 − I. Wait, for 1100 &lt; I &lt; 2200, where only the signing state is built: 0.40(2200 − I)/1.10. Set equal: 1.10(1540 − I) = 0.40(2200 − I), so 1694 − 1.10I = 880 − 0.40I, 814 = 0.70I and I* = <b>1162.8571</b>. It lies in (1100, 2200) ✓.</p>
<p>Check: build now gives 1540 − 1162.8571 = 377.1429; waiting gives 0.40(1037.1429)/1.10 = 414.8572/1.10 = 377.1429 ✓. Build now if I is below 1162.8571, wait if it is above.</p>`,
    criteria: [
      "NPV_now = 40, with state NPVs +700 and −400 that average back to 40",
      "Waiting worth 280/1.10 = 254.5455; option to wait = 214.5455, so wait despite a positive NPV",
      "Build today or never: value of perfect information = 280 − 40 = 240 (check: 0.60 × 400); where waiting is possible the study is worth only 280 − 254.5455 = 25.4545",
      "I* = 814/0.70 = 1162.8571, inside (1100, 2200); build now below it, wait above",
    ],
  },
});

/* kj10 · Mergers and acquisitions */
window.EDU_DATA.kjerne.push({
  id: "kj10",
  num: 10,
  title: "Mergers and acquisitions",
  chapters: [26],
  html: `
<div class="callout kort"><span class="h">In short</span>Mergers and acquisitions raise two questions: when buying another firm creates value and who gets it. Synergies are the usual answer, but this part also covers the other motives, good and bad. It then teaches two routines. The first splits value between the two sets of owners when a deal is paid in the acquirer's shares. The second reads market prices backwards to find the probability the market puts on a deal closing.</div>

<p class="lead-in">M&amp;A opened H2024 (Exercise 1, 12 verbal points, synergies banned as a motive) and closed H2025 (Exercise 6, 20 points: the market's probability that a deal closes, from four prices and r<sub>f</sub>). You need motives and two routines: the stock swap and reading prices backwards.</p>

<h3>Motives, without saying "synergies"</h3>
<p>Targets gain a 20% to 40% premium, acquirers about nothing: each target holder can hold out for the post-deal value, so the bidder pays most of the gain away.</p>
<table class="data">
<tr><th>Motive</th><th>Mechanism</th><th>Value</th></tr>
<tr><td>Undervaluation</td><td>The acquirer knows the target is worth more than its price</td><td>Captured by the acquirer; needs better information</td></tr>
<tr><td>Market power</td><td>Fewer competitors, higher prices</td><td>At customers' expense; regulators may block it</td></tr>
<tr><td>Tax</td><td>Use the target's tax losses; steadier cash flow carries more debt</td><td>A transfer from the tax authority</td></tr>
<tr><td>Disciplinary takeover</td><td>Replace bad management</td><td>Real: the market for corporate control (kj11)</td></tr>
<tr><td>Diversification, coinsurance</td><td>Pooled cash flows default less, so risky debt gets safer</td><td>None: shareholders lose what creditors gain (check 4)</td></tr>
<tr><td>Empire building</td><td>A CEO with free cash flow buys size</td><td>Destroyed: negative NPV</td></tr>
<tr><td>Hubris, winner's curse</td><td>The winner is the bidder who overestimated most</td><td>Destroyed: overpayment</td></tr>
</table>
<p>H2024 wanted the reasons as a grid, one to two sentences each. Good for the acquirer: the value-creating motives above. Bad for the acquirer: overpayment, empire building, coinsurance, or a stock offer read as a sign that its own shares are overvalued. Good for the target: the premium, in cash and certain. Bad for the target: lost independence and private benefits, a thin auction, or payment in overvalued acquirer stock.</p>

<h3>The stock swap</h3>
<p>With share counts N<sub>A</sub>, N<sub>T</sub>, pre-announcement prices P<sub>A</sub>, P<sub>T</sub>, stand-alone values A = N<sub>A</sub>P<sub>A</sub> and T = N<sub>T</sub>P<sub>T</sub>, synergies S, and ER acquirer shares per target share:</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub> · y = x/(N<sub>A</sub> + x) · P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="eq">NPV<sub>A</sub> = (1 − y)(A + T + S) − A · NPV<sub>T</sub> = y(A + T + S) − T</div>
<div class="eq">ER<sub>max</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = (P<sub>T</sub> + S/N<sub>T</sub>)/P<sub>A</sub></div>
<div class="where">y is the target holders' share of the merged firm. The NPVs and ER<sub>max</sub> (where NPV<sub>A</sub> = 0) are on the formula sheet. Post-announcement values for A and T double count S.</div></div>
<div class="formula"><div class="eq">offered premium = ER × P<sub>A</sub>/P<sub>T</sub> − 1 · actual premium = ER × P<sub>new</sub>/P<sub>T</sub> − 1</div>
<div class="where">The target is paid in a currency the deal revalues. Since NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>), the actual premium exceeds the offered one exactly when NPV<sub>A</sub> &gt; 0.</div></div>

<div class="worked"><span class="wh">Worked example: a stock swap</span>
<p>Nordvik ASA (20 million shares at 150 NOK) offers ER = 0.4500 for Sørhavn AS (10 million shares at 60 NOK); S = 240 million.</p>
<p><b>Step 1.</b> A = 3000.00, T = 600.00, x = 0.4500 × 10.00 = 4.50, so 24.50 million shares and A + T + S = 3840.00.</p>
<p><b>Step 2.</b> y = 4.50/24.50 = 0.18367347; P<sub>new</sub> = 3840.00/24.50 = 156.7347.</p>
<p><b>Step 3.</b> NPV<sub>A</sub> = (1 − 0.18367347)(3840.00) − 3000.00 = 134.6939; NPV<sub>T</sub> = 0.18367347(3840.00) − 600.00 = 105.3061.</p>
<p><b>Step 4.</b> ER<sub>max</sub> = (60.00 + 24.00)/150.00 = 0.5600 &gt; 0.4500.</p>
<p><b>Step 5.</b> Offered premium = 0.4500 × 150.00/60.00 − 1 = 12.5000%; actual = 0.4500 × 156.7347/60.00 − 1 = 17.5510%, higher because NPV<sub>A</sub> &gt; 0.</p>
<p><b>First check:</b> 134.6939 + 105.3061 = 240.0000 = S ✓, but it holds for any y, so it only catches a slip in one line. <b>Second check:</b> N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>) = 20.00 × 6.734694 = 134.6939 ✓; it skips y, so a wrong y fails it. Neither catches a wrong x, such as an inverted ER.</p></div>

<p><b>EPS accretion is not value creation.</b> Merged EPS rises whenever the P/E paid for the target is below the acquirer's own, even at zero premium with S = 0, where P<sub>new</sub> = P<sub>A</sub>.</p>

<h3>Reading the prices backwards</h3>
<p>The market's synergy estimate is the change in combined market value, for cash or stock:</p>
<div class="formula"><div class="eq">S<sub>implied</sub> = (N<sub>A</sub>P<sub>A</sub><sup>post</sup> + N<sub>T</sub>P<sub>T</sub><sup>post</sup>) − (A + T)</div>
<div class="where">Biased down if the deal may fail, up if the bid revealed news about the target. In a cash deal the acquirer gains S − premium, which with the target at the offer is its price change by construction: an identity, not a test.</div></div>
<p>For the deal probability, go long the target and short the acquirer in the exchange ratio, proceeds at r<sub>f</sub>:</p>
<div class="formula"><div class="eq">cost × (1 + r<sub>f</sub>) = p × payoff(completes) + (1 − p) × payoff(fails)</div>
<div class="where">Not on the sheet. When the question says prices revert if the deal fails, the failure branch uses pre-announcement prices.</div></div>
<div class="callout mech"><span class="h">Why r<sub>f</sub>, and why p is a real forecast</span>On completion the long leg becomes the short leg, so only the deal outcome is left. That risk is diversifiable and earns no premium, so the risk-neutral p is the market's actual belief.</div>

<div class="worked"><span class="wh">Worked example: the implied probability (H2025 Exercise 6)</span>
<p>On completion in one year, 5 B shares become 1 A share (ER = 0.2000); on failure prices revert. Before: P<sub>A</sub> = 110, P<sub>B</sub> = 16; after: 105 and 20; r<sub>f</sub> = 3%.</p>
<p><b>Step 1.</b> Buy 5 B for 100, short 1 A for 105, deposit the 105: cost 100.</p>
<p><b>Step 2.</b> Completes: the B shares close the short, leaving 105 × 1.03 = 108.15. Fails: 108.15 + 5 × 16 − 110 = 78.15.</p>
<p><b>Step 3.</b> 100 × 1.03 = 103.00 = 108.15p + 78.15(1 − p), so p = 24.85/30.00 = 0.828333 ≈ 0.8283.</p>
<p><b>The same equation as a spread:</b> 1 A minus 5 B is worth 5 now, 0 on completion, 30 on failure: 1 − p = 5 × 1.03/30 = 0.171667 ✓. A quicker route, not an independent check: a wrong failure price enters both.</p>
<p><b>Read it.</b> Pricing A with the same p, 1.03 × 105 = 0.828333 A<sub>s</sub> + 0.171667 × 110, so A<sub>s</sub> = 107.7666, below its failure price of 110. The deal destroys value for A's holders (empire building or hubris); they vote against.</p></div>

<div class="callout warn"><span class="h">Errors that cost the points</span>Equating the expected payoff to the cost, not cost × (1 + r<sub>f</sub>): p = 0.7283 here, the error the H2025 key names. Post-announcement prices in the failure branch. Reversing the ratio ("5 B for 1 A" is 0.2000 A per B). Giving the offered premium when the actual was asked.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Beyond synergies: undervaluation, market power, tax and disciplinary takeovers; coinsurance only moves value to creditors; empire building and hubris destroy it.</li>
<li>Reasons by side: the premium is good for the target; overpayment, empire building and coinsurance are bad for the acquirer; lost independence, a thin auction and overvalued acquirer stock are bad for the target.</li>
<li>The actual premium exceeds the offered one exactly when the deal is positive-NPV for the acquirer.</li>
<li>EPS accretion from buying a lower P/E is arithmetic, not value.</li>
<li>Deal probability: go long the target and short ER acquirer shares per target share, proceeds at r<sub>f</sub>; its cost × (1 + r<sub>f</sub>) equals its expected payoff, with pre-announcement prices in the failure branch when prices revert.</li></ul></div>
`,
  checks: [
    {
      id: "kj10-s1",
      q: "A stock offer at a fixed exchange ratio is announced, and the acquirer's share price falls on the news. Compared with the offered premium, the premium the target's shareholders actually receive is…",
      options: [
        "the same, because the exchange ratio is fixed in the offer",
        "smaller, because they are paid in acquirer shares the deal has devalued",
        "larger, because the target's own share price jumps on the announcement",
        "larger, because a lower acquirer price means they receive more acquirer shares",
      ],
      answer: 1,
      explanation: "The actual premium is ER × P<sub>new</sub>/P<sub>T</sub> − 1 and the offered one ER × P<sub>A</sub>/P<sub>T</sub> − 1, so they differ by the factor P<sub>new</sub>/P<sub>A</sub>. A falling acquirer price means NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>) is negative, and the target is paid in that debased currency. A fixed ratio fixes the number of shares, not their value, which is what the answer about receiving more shares gets wrong: that describes a fixed-value offer.",
    },
    {
      id: "kj10-s2",
      q: "In the long-short calculation of a deal probability you set p × payoff(completes) + (1 − p) × payoff(fails) equal to the cost × (1 + r<sub>f</sub>). What justifies this, and what does it make p?",
      options: [
        "Only diversifiable deal risk is left, so the position earns r<sub>f</sub> and p is the market's real forecast",
        "The two legs cancel in both outcomes, so the position is risk-free and p drops out of the equation",
        "The expected payoff should equal the cost itself; the factor (1 + r<sub>f</sub>) is only a refinement for deals longer than a year",
        "Deal risk is systematic, so p is a risk-neutral probability that overstates the true chance of completion",
      ],
      answer: 0,
      explanation: "When the deal completes the long leg turns into the short leg, and when it fails both return to known prices, so the only uncertainty is the binary deal outcome. That risk carries no premium, so the position's expected payoff grows at r<sub>f</sub>, and the risk-neutral p coincides with the real belief. Dropping the (1 + r<sub>f</sub>) is the error the H2025 key singles out; in the exam's numbers it moves p from 0.8283 to 0.7283.",
    },
    {
      id: "kj10-s3",
      q: "A high-P/E acquirer buys a low-P/E target with its own shares at a zero premium, and S = 0. After the merger…",
      options: [
        "EPS rises and the share price rises, because the market applies the acquirer's P/E to the target's earnings",
        "EPS rises and the share price is unchanged, because no value is created or moved",
        "EPS falls, because new shares are issued to the target's shareholders",
        "EPS and the share price are both unchanged, because both firms were fairly priced",
      ],
      answer: 1,
      explanation: "Buying earnings at a lower P/E than your own always raises EPS, because the earnings bought per new share exceed your own EPS. With S = 0 and no premium, x = T/P<sub>A</sub>, so P<sub>new</sub> = (A + T)/(N<sub>A</sub> + x) = P<sub>A</sub> exactly. The answer in which the market applies the acquirer's multiple to the new earnings is the bootstrap illusion: the merged P/E falls instead, because slower-growing earnings were added.",
    },
  ],
  case: {
    id: "kj10-m1",
    open: true,
    topic: "The implied probability that a deal closes",
    points: 6,
    minutes: 10,
    body: `<p>Solberg Maskin ASA (A) announces a bid for Tunhovd Hydraulikk AS (T). The bid was not anticipated. The deal will complete or fail in exactly one year: if it completes, every 4 T shares are exchanged for 3 A shares; if it fails, both prices return to their pre-announcement levels. Before the announcement P<sub>A</sub> = 84.00 and P<sub>T</sub> = 56.00; immediately after, P<sub>A</sub> = 80.00 and P<sub>T</sub> = 58.50. The one-year risk-free rate is 2.5%.</p>
<p>(a) Build the long-short position a merger arbitrageur would hold, sized to one exchange at the announced ratio, with the short-sale proceeds invested at the risk-free rate. Give its cost today and its payoff if the deal completes and if it fails. (2 points)</p>
<p>(b) Compute the probability of completion implied by the market, and redo it with the merger spread. (2 points)</p>
<p>(c) Using the same probability and the risk-free rate, what price of A in one year, if the deal completes, is consistent with today's 80.00? What does that say about the deal for A's shareholders, and how should they vote? (2 points)</p>`,
    solution: `<p><b>(a) The position.</b> The ratio is 0.7500 A shares per T share, so hold 4 T against 3 A. Buy 4 T for 4 × 58.50 = 234.00, short 3 A for 3 × 80.00 = 240.00 and deposit the 240.00 at 2.5%. Net cost 234.00. If the deal completes, the 4 T become the 3 A you owe, leaving the deposit: 240.00 × 1.025 = 246.00. If it fails, you sell 4 T at 56.00 and buy back 3 A at 84.00: 246.00 + 224.00 − 252.00 = 218.00.</p>
<p><b>(b) The probability.</b> The only risk left is deal risk, which is diversifiable, so the expected payoff equals the cost grown at r<sub>f</sub>: 234.00 × 1.025 = 239.85 = 246.00p + 218.00(1 − p). So 21.85 = 28.00p and p = 0.780357 ≈ 0.7804. The spread gives the same equation faster: 3 A minus 4 T is worth 240.00 − 234.00 = 6.00 today, 0 if the deal completes and 252.00 − 224.00 = 28.00 if it fails, so 1 − p = 6.00 × 1.025/28.00 = 6.15/28.00 = 0.219643 and p = 0.780357 ✓. It is the same position without the deposit, so it catches arithmetic, not a wrong set-up.</p>
<p><b>(c) What the price says.</b> 80.00 × 1.025 = 82.00 = 0.780357 A<sub>s</sub> + 0.219643 × 84.00 = 0.780357 A<sub>s</sub> + 18.45, so A<sub>s</sub> = 63.55/0.780357 = 81.4371. A is worth 2.5629 less per share if the deal completes than if it fails (84.00), while T's holders would get 0.75 × 81.4371 = 61.0778 against 56.00, a gain of 9.0675%. The market sees a negative-NPV deal for A, which points to empire building or hubris rather than synergies, so A's shareholders should vote against it; if the deal is then dropped, prices move back towards 84.00 and 56.00.</p>`,
    criteria: [
      "Correct position: long 4 T, short 3 A (0.75 A per T), net cost 234.00; payoffs 246.00 if the deal completes and 218.00 if it fails, with pre-announcement prices in the failure branch.",
      "Expected payoff set equal to the cost times (1 + r_f), 239.85, not the cost: p = 0.7804. Setting it equal to 234.00 gives the wrong p = 0.5714.",
      "The same p from the merger spread: 1 - p = 1.025 x 6.00/28.00 = 0.2196.",
      "Completion price of A = 81.4371, below 84.00: the deal is value-destroying for A's holders, so they vote against.",
    ],
  },
});

/* kj11 · Corporate governance */
window.EDU_DATA.kjerne.push({
  id: "kj11",
  num: 11,
  title: "Corporate governance",
  chapters: [27],
  html: `
<div class="callout kort"><span class="h">In short</span>Shareholders own the firm, but managers run it. Their interests are not the same. Corporate governance is the set of tools that keeps managers working for the owners: the board, shareholder votes, pay, debt and the threat of a takeover. This part explains why small shareholders rarely bother to monitor (the free-rider problem), what a larger holder can do and how takeover defences cut both ways. It ends with the rules of Norwegian company law that matter.</div>

<p class="lead-in">Exercise 2 was governance in both Kurbatov papers, 12 predictable verbal points each time. H2024 asked for two distinct ways to monitor a CEO, who monitors and with which tools; H2025 asked what a 5–10% holder can do about a shirking CEO, three actions at four points each.</p>

<h3>The agency problem and the free rider</h3>
<p>Owners want value; the manager also wants pay, security, size and an easy life. Name the wedges: shirking, perks, empire building, entrenchment, excessive caution, earnings management. The agency cost is the value destroyed, not what he captures: a perk worth 3 to him that costs the firm 20 is a cost of 20. Investors pricing the waste up front does not prevent it. Owners also under-monitor, because the cost is private and the gain shared:</p>
<div class="formula"><div class="eq">monitor if α × ΔV &gt; C ⟹ α* = C/ΔV</div>
<div class="where">α is your stake, ΔV the value the intervention adds, C its full cost. Below α* you rationally free-ride. If it succeeds only with probability q, α* = C/(q × ΔV).</div></div>
<div class="worked"><span class="wh">Worked example: does a 7% owner act?</span>
<p>Equity is worth 4000 million NOK; a disciplined CEO would add 8%, so ΔV = 320.00; a campaign costs C = 12.00.</p>
<p><b>Step 1.</b> α* = 12.00/320.00 = 0.0375 = 3.7500%. A 7% holder gains 0.07 × 320.00 = 22.40 &gt; 12.00 and acts; a 0.1% holder gains 0.32 and waits.</p>
<p><b>Step 2.</b> With success probability 0.6000, α* = 12.00/(0.6000 × 320.00) = 0.0625 = 6.2500%, inside the 5–10% band of H2025.</p>
<p><b>Why he still under-monitors:</b> the others receive 0.93 × 320.00 = 297.60 for nothing. He produces a public good and keeps 7% of it.</p></div>

<h3>The monitors and their tools</h3>
<p>A monitor without a tool is not a monitor. The <b>board</b> hires, pays and dismisses the CEO; it monitors only if independent, since the CEO controls its information. <b>Blockholders</b> have board seats and credible votes, but may exploit minorities. <b>Institutions</b> aggregate votes; index funds cannot sell. The <b>market for corporate control</b> replaces the whole team, and its threat alone disciplines. <b>Pay</b> in stock raises pay-performance sensitivity, and relative performance filters out market and industry noise. <b>Debt</b> removes free cash flow, and default ends careers. An <b>LBO</b> combines them: one owner with no free-rider problem, debt that strips the free cash flow, a large management stake and no listing, at the price of the distress and debt-agency costs (kj5). <b>Auditors and analysts</b> certify and scrutinise; <b>regulation</b> sets disclosure, independence and say-on-pay.</p>

<h3>What a 5–10% blockholder can do</h3>
<div class="callout mech"><span class="h">Why 5–10% is the interesting stake</span>He is at or above α*, so monitoring can pay, but he cannot outvote the register alone, so every action must persuade others. Selling a block that size moves the price: exit is costly, voice affordable. In Norway 5% also triggers disclosure and lets him requisition an extraordinary general meeting.</div>
<p>Three sentences per action: the action, the mechanism that reaches the CEO, the limitation. Take three from different channels.</p>
<table class="data">
<tr><th>Action</th><th>Mechanism</th><th>Limitation</th></tr>
<tr><td>Engage the chair privately</td><td>The board sets his pay and tenure</td><td>Needs a board willing to listen</td></tr>
<tr><td>Requisition a general meeting to elect new directors</td><td>Changes who is in the room</td><td>Needs other holders' votes</td></tr>
<tr><td>Vote against directors and the pay report</td><td>A visible protest vote hurts directors' reputations</td><td>Say-on-pay is usually advisory</td></tr>
<tr><td>Proxy fight</td><td>Replaces directors without the board's cooperation</td><td>He pays all, keeps only his share</td></tr>
<tr><td>Go public</td><td>Reputational cost; rallies free-riding holders</td><td>Can harden resistance</td></tr>
<tr><td>Redesign pay</td><td>Higher sensitivity makes shirking cost him</td><td>Risk premium; options invite risk shifting</td></tr>
<tr><td>Demand a payout or leveraged recapitalisation</td><td>Removes the free cash flow that funds perks</td><td>Distress and debt-agency costs (kj5)</td></tr>
<tr><td>Invite a bidder, offering the stake as a toehold</td><td>The market for corporate control replaces the team</td><td>Needs a willing buyer</td></tr>
<tr><td>Sue the directors or the chief executive</td><td>Liability for breach of duty makes shirking costly</td><td>Slow, costly and hard to prove</td></tr>
<tr><td>Sell the block</td><td>Price pressure hurts an equity-paid CEO, invites bids</td><td>Price impact</td></tr>
</table>

<h3>Takeover defences and Norwegian law</h3>
<p>Under US law a poison pill (cheap shares for everyone but a bidder above a trigger, redeemable only by the board) can stop a hostile bid, and a staggered board (a bidder needs two annual meetings to control it) delays one, which with a pill in place amounts to blocking it; golden parachutes pay the CEO for losing his job. Name both readings. Shareholder bargaining: the board extracts a higher premium, so defended firms that sell should fetch more. Entrenchment: the people the bid would displace get a veto, so defended firms should get fewer bids and perform worse.</p>

<div class="callout warn"><span class="h">Errors that lose points</span>Applying US law to a Norwegian ASA. There the CEO cannot sit on the board (allmennaksjeloven § 6-1); the general meeting can remove directors it elected at any time (§ 6-7), so staggered terms add no delay of their own; and a target board may not issue shares against a notified bid without prior general-meeting authority (verdipapirhandelloven § 6-17). Also: calling the agency cost the manager's gain; three actions from one channel; defining governance, which earns nothing.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>The agency cost is the value destroyed, not the manager's gain; pricing it up front does not prevent it.</li>
<li>Free rider: α* = C/ΔV. At 5–10% voice pays and exit is costly, but no vote is won alone.</li>
<li>A 12-point answer is three actions from different channels (board, votes and meetings, the market for corporate control, pay, debt, exit), each as action, mechanism, limitation.</li>
<li>Defences: shareholder bargaining (higher premiums) against entrenchment (fewer bids); name both.</li>
<li>In a Norwegian ASA the CEO is not on the board, the general meeting can remove the directors it elected at any time, and no shares may be issued against a notified bid without general-meeting authority.</li></ul></div>
`,
  checks: [
    {
      id: "kj11-s1",
      q: "A campaign to replace a shirking CEO would cost 18 million NOK and raise equity value by 400 million. Why does a holder of 0.5% do nothing?",
      options: [
        "The waste is already in the share price, so there is nothing left for him to gain",
        "He bears the whole 18 million cost but gets only 0.5% × 400 = 2 million",
        "Only the board has power over the CEO, so shareholders have no tools",
        "The CEO's gain is exactly the shareholders' loss, so the firm as a whole loses nothing",
      ],
      answer: 1,
      explanation: "Acting pays only if α × ΔV &gt; C, so the break-even stake is α* = C/ΔV = 18/400 = 0.0450, that is 4.5000%. The argument that the waste is already priced confuses who paid for it with whether it can be recovered: earlier owners bore the discount, and removing it is still worth 400 million to someone. That someone is a holder above 4.5%, which is why the blockholder is the pivotal monitor.",
    },
    {
      id: "kj11-s2",
      q: "An adviser proposes a US-style defence package for a Norwegian ASA. Which statement is correct under Norwegian law?",
      options: [
        "Staggering the directors' terms means a bidder with a majority needs two annual meetings to control the board",
        "The CEO may sit on the board as long as someone else chairs it",
        "Once a bid is notified, the board may place new shares with a friendly investor if it judges the bid too low",
        "The general meeting can remove any director it elected at any time, so staggered terms add no delay",
      ],
      answer: 3,
      explanation: "Allmennaksjeloven § 6-7 lets the general meeting remove directors it elected at any time, so the two-meeting delay of a US staggered board never arises. In an ASA the CEO cannot sit on the board at all (§ 6-1), and verdipapirhandelloven § 6-17 bars a target board from issuing shares against a notified bid without prior general-meeting authority. The staggered-board statement is true only under US law, where directors can be removed only for cause.",
    },
    {
      id: "kj11-s3",
      q: "A board adopts a poison pill. Which evidence would support the view that the pill serves shareholders rather than entrenching managers?",
      options: [
        "Defended firms that are eventually sold fetch higher premiums than undefended ones",
        "Defended firms receive fewer bids, which shows the pill screens out low-ball offers",
        "Only the board can redeem the pill, so the bidder must negotiate with it",
        "Managers of defended firms keep their jobs longer after poor results",
      ],
      answer: 0,
      explanation: "Under the shareholder-bargaining hypothesis the pill turns the board into a single tough negotiator, so defended firms that are sold should sell for more. Fewer bids is what the entrenchment hypothesis predicts: a defence that deters low-ball bids deters good ones too. That only the board can redeem the pill holds under both readings, so it cannot tell them apart, and longer tenure after poor results points to entrenchment.",
    },
  ],
  case: {
    id: "kj11-m1",
    open: true,
    topic: "A blockholder against entrenchment in an ASA",
    points: 6,
    minutes: 10,
    body: `<p>You hold 8% of the shares and votes in Skarsvåg Fiskeri ASA, listed in Oslo; no other holder owns more than 4%. For four years margins have trailed the peers while the chief executive spent the firm's cash on a new head office and two unrelated acquisitions. The chair is his former business partner. Fearing that the weak share price invites a bid, the chief executive asks the board to adopt three measures: (1) he joins the board as deputy chair; (2) the directors' terms are staggered so that only a third stand for election each year; (3) the board resolves, without asking the general meeting, that if a bid is notified it will at once issue 20% new shares to a friendly family office.</p>
<p>(a) For each of the three measures, say in <b>one sentence</b> whether it would protect him in a Norwegian ASA, and why. (2 points)</p>
<p>(b) Give <b>two</b> actions you would take with your 8%, from two different governance channels. For each, give the action, the mechanism by which it reaches the chief executive, and one limitation, in <b>2–3 sentences per action</b>. (4 points)</p>`,
    solution: `<p><b>(a) The three measures.</b> (1) It cannot be done, because in an ASA the chief executive may not sit on the board (allmennaksjeloven § 6-1). (2) Staggered terms add no delay of their own, because the general meeting can remove any director it elected at any time (§ 6-7), so a new majority replaces the board at one meeting. (3) It fails, because verdipapirhandelloven § 6-17 bars a target board from issuing shares against a notified bid without prior general-meeting authority, so the owners and not the board decide on the bid.</p>
<p><b>(b) Two actions.</b> Action 1, voting and meeting rights: together with other large holders I requisition an extraordinary general meeting, which 5% of the capital can demand in Norway, and propose independent directors in place of the chair. The board is the only body that can dismiss the chief executive and set his pay, and since directors can be removed at any time, a new board changes what he faces at once. The limitation is that 8% cannot win the vote alone, and I bear the whole cost of organising while every other holder shares the gain for free.</p>
<p>Action 2, the market for corporate control: I tell industrial buyers and private-equity sponsors that my 8% is available as a toehold for a bid. A bid goes to the shareholders over the board's head and replaces the whole team, and because the board cannot issue shares against it without general-meeting authority, even the threat disciplines him. The limitation is that it needs a willing buyer, and the free-rider problem in takeovers forces the bidder to pay most of the improvement away as a premium.</p>`,
    criteria: [
      "(a) None of the three protects him: (1) the CEO cannot sit on an ASA board (allmennaksjeloven § 6-1); (2) staggered terms add no delay of their own, since the general meeting can remove directors at any time (§ 6-7); (3) the board cannot issue shares against a notified bid without prior general-meeting authority (verdipapirhandelloven § 6-17).",
      "Each action in (b) has three parts within 2-3 sentences: the action, the mechanism that reaches the CEO, and a limitation.",
      "The two actions come from different channels (for example meeting and voting rights to change the board, and the market for corporate control); two versions of the same channel count once.",
      "The 8% is used in the argument: above the 5% needed to requisition a meeting and large enough for monitoring to pay, too small to win a vote alone. Other well-explained actions (pay redesign, a payout or leveraged recapitalisation, a public campaign) earn the same credit.",
    ],
  },
});
