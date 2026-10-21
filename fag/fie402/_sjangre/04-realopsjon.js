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
      id: "realopsjon-3",
      title: "Deciding after the state is known",
      theory: `<p>Draw the decision as a tree: a square for a choice you make, a circle for a state the world picks. If the square comes before the circle, you commit and get every branch. If the circle comes first, you see the state and then choose, so a branch with negative NPV becomes 0. Put the max inside the expectation, never outside.</p>
<div class="formula"><div class="eq">commit first: E[NPV] = Σ p<sub>i</sub>·NPV<sub>i</sub></div>
<div class="eq">decide after: E[max(0, NPV<sub>i</sub>)] = Σ p<sub>i</sub>·max(0, NPV<sub>i</sub>)</div>
<div class="where">NPV<sub>i</sub> is the NPV in state i and p<sub>i</sub> its probability. Deciding after is never worth less than committing first, nor less than max(0, E[NPV]).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states: NPV<sub>good</sub> = +200, NPV<sub>bad</sub> = −120.</p><p>Commit first: 0.5(200) + 0.5(−120) = 40. Decide after: 0.5(200) + 0.5(0) = 100.</p></div>`,
      q: `<p>A product launch costs 400 today. The PV of its cash flows is 900 with probability 0.3 or 200 with probability 0.7. Suppose you could learn the state before you decide, at no cost and with no delay. What is the expected value of the launch decision, E[max(0, NPV<sub>i</sub>)]?</p>`,
      options: ["10.00", "350.00", "150.00", "−130.00"],
      answer: 2,
      solution: `<p>NPV<sub>good</sub> = 900 − 400 = +500: launch. NPV<sub>bad</sub> = 200 − 400 = −200: do not launch, worth 0.</p><p>E[max(0, NPV<sub>i</sub>)] = 0.3(500) + 0.7(0) = <b>150.00</b>.</p>`,
      check: `<p>Committing first gives E[NPV] = 0.3(500) + 0.7(−200) = 150 − 140 = 10. The gap, 150 − 10 = 140, must equal the loss you avoid in the bad state: 0.7 × 200 = 140 ✓</p>`,
      traps: [
        "Committed before seeing the state, or took the max after averaging: 0.3(500) + 0.7(−200) = 10; max(0, 10) is still 10.",
        "Swapped the probabilities: 0.7(500) + 0.3(0) = 350.",
        null,
        "Declined the bad state but still charged the 400 there: 0.3(500) + 0.7(0 − 400) = 150 − 280 = −130.",
      ],
    },
    {
      id: "realopsjon-4",
      title: "The value of perfect information",
      theory: `<p>Information is worth what you would do differently with it. With it, you decide state by state. Without it, you make one decision on the average: invest if E[NPV] &gt; 0, otherwise do nothing and get 0. The difference is the most you should pay for a study that reveals the state today.</p>
<div class="formula"><div class="eq">value of perfect information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV])</div>
<div class="where">The second term is the best uninformed choice. If E[NPV] is negative it is 0, not E[NPV]. No discounting: the answer arrives now and you act now.</div></div>`,
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
      id: "realopsjon-7",
      title: "What makes the option to wait valuable",
      theory: `<p>Three things must be present: uncertainty, information that arrives while you wait and an investment that cannot be undone for free. The value comes from max(0, ·): the bad state is cut off at zero while the good state is kept. A wider spread with the same expected cash flow therefore raises the option, whether the risk is systematic or firm-specific. Anything that removes part of the good state, or pushes it further away, lowers it. So a positive NPV today can still mean wait; a negative-NPV project can still be worth something.</p>
<div class="formula"><div class="eq">option to wait = avoided loss in the bad state − cost of delaying the good state</div>
<div class="where">With two states, the bad one declined and NPV<sub>now</sub> &gt; 0: p<sub>bad</sub>·|NPV<sub>bad</sub>| − p<sub>good</sub>·NPV<sub>good</sub>·[1 − 1/(1 + r)].</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>I = 100, cash flow 16 or 6 a year forever (p = 0.5), r = 10%: NPV<sub>now</sub> = 10, NPV<sub>good</sub> = 60, NPV<sub>bad</sub> = −40.</p><p>Avoided loss 0.5 × 40 = 20.00, delay cost 0.5 × 60 × (1 − 1/1.10) = 2.73, option 17.27.</p><p>Widen the cash flows to 21 or 1, same mean of 11: NPV<sub>now</sub> stays 10, NPV<sub>good</sub> = 210 − 100 = 110, waiting = 0.5(110)/1.10 = 50, option = 40.</p></div>`,
      q: `<p>A project costs 900 today and pays 120 or 40 a year forever, with probability 0.5 each; the state is revealed in one year. The cost of capital is 8%, so NPV<sub>now</sub> = 100. Waiting a year to build for the same 900 gives an option to wait worth 177.78. Which single change, with everything else unchanged, raises the value of the option to wait?</p>`,
      options: [
        "The good-state cash flow rises to 130 and the bad-state cash flow falls to 30.",
        "The state is revealed only after two years, so waiting means building two years from now.",
        "A rival may take the project during the year, with probability 0.2.",
        "The bad-state cash flow rises from 40 to 60.",
      ],
      answer: 0,
      solution: `<p>Base: NPV<sub>good</sub> = 1 500 − 900 = 600, NPV<sub>bad</sub> = 500 − 900 = −400, waiting 0.5(600)/1.08 = 277.78, option 277.78 − 100 = 177.78.</p><p>Wider spread, 130 or 30 with the mean still 80: NPV<sub>now</sub> stays 100, NPV<sub>good</sub> = 1 625 − 900 = 725, waiting 0.5(725)/1.08 = 335.65, option <b>235.65</b>. Up. The extra loss in the bad state is cut off at zero, while the extra gain in the good state is kept.</p>`,
      check: `<p>The other three all lower the option. Two years: 300/1.08<sup>2</sup> = 257.20, option 157.20. Rival: 0.8 × 300/1.08 = 222.22, option 122.22. Bad state at 60: NPV<sub>now</sub> = 0.5(120 + 60)/0.08 − 900 = 1 125 − 900 = 225, waiting unchanged at 277.78, option 52.78. Only the wider spread raises it ✓</p>`,
      traps: [
        null,
        "Thought more time means more information. The information is the same, it just arrives later: 0.5(600)/1.08<sup>2</sup> − 100 = 157.20, down from 177.78.",
        "Treated any extra uncertainty as option value. A rival removes part of the good state you are waiting for: 0.8 × 300/1.08 − 100 = 122.22.",
        "Thought a milder bad state helps the option. It raises NPV<sub>now</sub> to 225 but not the value of waiting, since you never build in the bad state: 277.78 − 225 = 52.78.",
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
      id: "realopsjon-10",
      title: "The indifference point",
      theory: `<p>Run the comparison backwards: leave one input unknown, write both strategies as functions of it, set them equal and solve. Because max(0, ·) makes each strategy piecewise linear, the algebra holds only inside the interval where the same branches are taken. Check that the answer lies in that interval, then say which side does what.</p>
<div class="formula"><div class="eq">invest now: E[C]/r − I</div>
<div class="eq">wait: Σ p<sub>i</sub>·max(0, C<sub>i</sub>/r − I)/(1 + r)</div>
<div class="where">For an unknown investment cost I, the usual interval is the one where the good state is built and the bad state is not: C<sub>bad</sub>/r &lt; I &lt; C<sub>good</sub>/r.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 30 or 10 a year forever (p = 0.5), r = 10%. Invest now: 200 − I. Wait, for 100 &lt; I &lt; 300: 0.5(300 − I)/1.10.</p><p>Set equal: 1.10(200 − I) = 150 − 0.5I, so 220 − 1.10I = 150 − 0.5I and 70 = 0.60I. I* = 116.6667, inside (100, 300) ✓</p><p>Below I* invest now, above it wait.</p></div>`,
      q: `<p>A plant pays 140 a year forever with probability 0.4 or 40 a year forever with probability 0.6; the state is revealed in one year. The cost of capital is 8%. The investment cost I is the same today and in one year. Waiting shifts the whole project by a year. At what investment cost I* is the firm indifferent between investing today and waiting?</p>`,
      options: ["558.8235", "608.5595", "1 000.0000", "586.4198"],
      answer: 0,
      solution: `<p>PVs: 140/0.08 = 1 750 and 40/0.08 = 500. Expected: 0.4(1 750) + 0.6(500) = 1 000.</p><p>Invest now: 1 000 − I. Wait, for 500 &lt; I &lt; 1 750: 0.4(1 750 − I)/1.08.</p><p>Set equal: 1.08(1 000 − I) = 700 − 0.4I, so 1 080 − 1.08I = 700 − 0.4I and 380 = 0.68I. I* = <b>558.8235</b>, inside (500, 1 750) ✓ Below I* build now, above it wait.</p>`,
      check: `<p>Plug back: invest now 1 000 − 558.8235 = 441.1765. Wait 0.4(1 750 − 558.8235)/1.08 = 476.4706/1.08 = 441.1765 ✓ At I = 600: invest now 400 against wait 0.4(1 150)/1.08 = 425.93, so waiting wins above I*, as stated.</p>`,
      traps: [
        null,
        "Discounted the waiting branch twice: 1.08<sup>2</sup>(1 000 − I) = 0.4(1 750 − I) gives 466.4 = 0.7664I, so I = 608.5595.",
        "Solved the static rule NPV<sub>now</sub> = 0 instead of comparing with waiting: I = 1 000.",
        "Discounted the date-1 cash flows but not the date-1 investment: 1 000 − I = 0.4(1 750/1.08 − I) gives I = 586.4198.",
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
