/* kj9 · Real options */
window.EDU_DATA.kjerne.push({
  id: "kj9",
  num: 9,
  title: "Real options",
  chapters: [25],
  html: `
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
