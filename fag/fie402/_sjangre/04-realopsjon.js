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
