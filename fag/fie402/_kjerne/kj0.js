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
