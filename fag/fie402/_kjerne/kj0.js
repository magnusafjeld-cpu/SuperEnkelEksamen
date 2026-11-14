/* kj0 · The exam in one page */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "The exam in one page",
  chapters: [0, 28],
  html: `
<p class="lead-in">Kurbatov set H2024 and H2025 and says the next paper is built "exactly the same". This is what it holds, how it is marked and how to use the parts that follow.</p>
<h3>The format</h3>
<ul>
<li>Six exercises, 100 points, three or four hours (check the exam information). Pen, paper, a scientific calculator, one bilingual dictionary and the course formula sheet (the last page; no sheet of your own). English, no multiple choice.</li>
<li>Two short theory exercises of about 10–12 points, common sense within sentence budgets; governance has been one every time (kj11). Four problems, about 80% of the paper: part (a) is easy, several end with 3–5 points of intuition.</li>
<li>Every block appears: capital structure and payout, valuation with debt, options and real options, M&amp;A and governance, often with a twist ("what if the deal is delayed a year?").</li>
<li>About 1.8 minutes per point on three hours. A follow-on error gets full credit on the next part, so if a step will not come, write a labelled assumption and carry on. Four decimals on rates; an A has needed about 90 points.</li>
<li>Read the question. "Evaluate the project" means the project's NPV, not the firm's value; a PV is not an NPV. Part of a year is a power: (1 + r)<sup>1.5</sup> for 18 months, √(1 + r) for six, (1 + r)<sup>1/12</sup> − 1 a month.</li>
</ul>
<h3>What recurs</h3>
<table class="data">
<tr><th>Topic</th><th>Papers of 11 (two are Kurbatov's)</th><th>Part</th></tr>
<tr><td>Twin firm: unlever and relever β, CAPM, MM II</td><td class="n">11</td><td>kj1</td></tr>
<tr><td>MM I and II in perfect markets, recapitalisation</td><td class="n">11</td><td>kj2</td></tr>
<tr><td>WACC and APV on the same case</td><td class="n">11</td><td>kj4</td></tr>
<tr><td>Real options</td><td class="n">8</td><td>kj9</td></tr>
<tr><td>M&amp;A: share exchange, premium, deal probability</td><td class="n">8</td><td>kj10</td></tr>
<tr><td>Debt and equity as options, credit risk</td><td class="n">8</td><td>kj8</td></tr>
<tr><td>Asymmetric information, Myers-Majluf</td><td class="n">8</td><td>kj6</td></tr>
</table>
<p>The last two were absent from both Kurbatov papers, but his wrap-up lists the pecking order, IPO underpricing, securities as options and lower borrowing costs after a merger (coinsurance): treat them as core.</p>
<h3>How to score</h3>
<p>On every quantitative sub-question: <b>state the method</b>, <b>show the computation</b> with the numbers substituted (no calculation, no points), <b>name the mechanism</b> ("this is debt overhang") and <b>run the check</b>. Every part refers to the five checks by number:</p>
<ol>
<li>Value by WACC = value by APV</li>
<li>[E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> = β<sub>U</sub></li>
<li>Creditors' gain + shareholders' gain = the project's NPV</li>
<li>Creditors' gain = shareholders' loss when total value is fixed</li>
<li>Are investors' beliefs rational given the action taken?</li>
</ol>
<p>Check 5 is the one candidates skip.</p>
<h3>The formula sheet</h3>
<p>It gives FCF from EBIT, the perpetuities, the CAPM, MM II, the β<sub>U</sub> weighting, both WACCs, binomial replication and the stock-swap NPVs. Memorise: V<sup>L</sup> = V<sup>U</sup> + PV(TS) and the rate on the shield (kj3, kj4); D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub> (kj4); put-call parity (kj7); Myers-Majluf and its rationality check (kj6); all of real options, with the annuity C·[1 − (1 + r)<sup>−n</sup>]/r (kj9). Black-Scholes is not computed on the exam, only its intuition.</p>
<h3>How to use this path</h3>
<p>Parts kj1 to kj4 are one chain, the valuation machine: read them in order. Parts kj5 to kj11 stand alone. Write each minicase on paper before you open the solution. Kurbatov's order of preparation: his two papers, the problem sets (anything that fits in a few lines can come), his slides ("understand everything in this presentation"), the textbook last.</p>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Six exercises, 100 points: two short theory exercises (governance every time) and four problems with intuition at the end; every block appears; a follow-on error is not punished twice.</li>
<li>On every quantitative sub-question: state the method, show the numbers, name the mechanism, run the check. Project NPV is not firm value and PV is not NPV.</li>
<li>The five checks: (1) value by WACC = value by APV; (2) [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> = β<sub>U</sub>; (3) creditors' gain + shareholders' gain = the project's NPV; (4) creditors' gain = shareholders' loss when total value is fixed; (5) investors' beliefs are rational given the action taken.</li>
<li>Not on the formula sheet: the tax-shield rules, D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub>, put-call parity, Myers-Majluf and all of real options. Black-Scholes and β<sub>E</sub> near distress are intuition only.</li></ul></div>
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
      explanation: "The α you computed rests on what investors believe and the outcome is an equilibrium only if those beliefs match who actually issues. That is check 5 and the keys single it out as the step candidates skip. Checks 1 and 3 are real checks, but they belong to levered valuation and to agency problems, not to an issue decision under private information.",
    },
    {
      id: "kj0-s2",
      q: "Part (a) of a chained exercise will not come out and parts (b) to (d) need its answer. What is the best move?",
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
