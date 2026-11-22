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
