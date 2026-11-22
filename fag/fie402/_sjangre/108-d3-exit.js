/* sjanger 108 · d3-exit · Exit, abandonment and staged financing (del 3 i korte stiger) */
window.EDU_DATA.sjangre.push({
  id: "d3-exit",
  num: 108,
  seksjon: "del3",
  emne: "Realopsjoner",
  symboler: "realopsjon",
  title: "Exit, abandonment and staged financing",
  summary: "A perpetuity cut to an annuity, monthly rates, the exit decision with a fee, the value of an exit option and staged financing",
  chapters: [25],
  exam: "H2025 E5 (d) · V2023 P3 · lecture 11 store and staging",
  intro: `<p>The mirror image of waiting: you commit first and keep the right to leave. H2025 Exercise 5 (d) cut a perpetuity of losses to a two-year annuity. Kurbatov named abandonment as something the exam could explore and flagged an exit fee as a twist. Staged financing is the same idea used on purpose: pay for one stage, see the result, then decide. Six steps end with a monthly exit with a fee.</p>`,
  steps: [
    {
      id: "d3-exit-1",
      title: "A perpetuity cut to an annuity",
      theory: `<p>An exit right replaces a perpetuity of losses with an annuity that stops at the exit date. The annuity formula is not on the formula sheet, so learn it as a perpetuity minus the same perpetuity started n years later. That form also shows what the exit removes: the tail after year n.</p>
<div class="formula"><div class="eq">C × A(n, r) = C/r − (C/r)/(1 + r)<sup>n</sup> = C × [1 − (1 + r)<sup>−n</sup>]/r</div>
<div class="where">C is paid every year for n years, first payment in one year. (C/r)/(1 + r)<sup>n</sup> is the tail you no longer bear: a perpetuity that starts after year n, valued today.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>An exit right never touches the good state, since you never leave a profitable perpetuity. It only cuts the bad state's tail, so it is worth something only where that tail is negative. The earlier the exit, the more of the tail it cuts.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Losses of 10 a year, r = 10%, exit after 2 years. Forever: 10/0.10 = 100. Tail: 100/1.10<sup>2</sup> = 82.64. Borne: 100 − 82.64 = 17.36, the same as 10 × A(2, 10%) = 10 × 1.735537.</p></div>`,
      q: `<p>In the bad state a café loses 30 (NOK thousand) a year forever, first loss in one year. A new lease lets the owner close after year 4 and pay nothing more. The discount rate is 5%. What is the present value today of the losses the owner still bears?</p>`,
      options: ["600.00", "106.38", "493.62", "120.00"],
      answer: 1,
      solution: `<p>A(4, 5%) = [1 − 1.05<sup>−4</sup>]/0.05 = (1 − 0.822702)/0.05 = 3.545951.</p><p>PV of the losses borne = 30 × 3.545951 = <b>106.38</b>.</p>`,
      check: `<p>Perpetuity minus tail: 30/0.05 = 600, while the tail from year 5 is worth 600/1.05<sup>4</sup> = 493.62 today. 600 − 493.62 = 106.38 ✓ The answer must also lie below the undiscounted 4 × 30 = 120 ✓</p>`,
      traps: [
        "Valued the losses forever, as if there were no exit: 30/0.05 = 600.",
        null,
        "Reported the tail the lease removes, not the losses still borne: 600/1.05<sup>4</sup> = 493.62.",
        "Added the four losses without discounting: 4 × 30 = 120.",
      ],
    },
    {
      id: "d3-exit-2",
      title: "Monthly cash flows need a monthly rate",
      theory: `<p>If the rate is annual but the cash flows and the question are in months, convert the rate. Kurbatov said it plainly: when the question is about months, use the monthly rate. Convert by compounding, never by dividing by 12. The annuity and perpetuity formulas then work exactly as before, counted in months.</p>
<div class="formula"><div class="eq">r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1 &nbsp;&nbsp; r = (1 + r<sub>m</sub>)<sup>12</sup> − 1</div>
<div class="eq">n-month annuity: C × [1 − (1 + r<sub>m</sub>)<sup>−n</sup>]/r<sub>m</sub> &nbsp;&nbsp; monthly perpetuity: C/r<sub>m</sub></div>
<div class="where">r is the effective annual rate. Over 18 months the discount factor is (1 + r)<sup>1.5</sup> = (1 + r<sub>m</sub>)<sup>18</sup>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>r/12 compounds to more than r over a year, because each month's interest earns interest. So r/12 is too high a monthly rate and makes every value too low. The error is small for a short annuity and much larger for a perpetuity.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>1 000 a month for 12 months at 6% a year. r<sub>m</sub> = 1.06<sup>1/12</sup> − 1 = 0.4868%. A(12, r<sub>m</sub>) = 11.628800, so PV = 11 628.80. With 6%/12 = 0.5% you would get 11 618.93, a little too low.</p></div>`,
      q: `<p>A shop in the bad state loses 2 500 NOK a month, first loss in one month. The lease lets the owner leave after 18 months at no cost. The effective annual discount rate is 7%. What is the present value today of the 18 months of losses?</p>`,
      options: ["42 671.33", "42 600.33", "25 147.72", "442 153.47"],
      answer: 0,
      solution: `<p>r<sub>m</sub> = 1.07<sup>1/12</sup> − 1 = 0.565415% a month.</p><p>A(18, r<sub>m</sub>) = [1 − 1.00565415<sup>−18</sup>]/0.00565415 = 17.068531.</p><p>PV = 2 500 × 17.068531 = <b>42 671.33</b>.</p>`,
      check: `<p>Compound back: 1.00565415<sup>12</sup> = 1.0700 ✓ and 1.00565415<sup>18</sup> = 1.07<sup>1.5</sup> = 1.106817 ✓ The value must lie below the undiscounted 18 × 2 500 = 45 000 and above 45 000/1.106817 = 40 657.14, the value if all 18 losses came at month 18 ✓</p>`,
      traps: [
        null,
        "Divided the annual rate by 12: 0.583333% a month is too high, so 2 500 × A(18, 0.583333%) = 42 600.33 is too low.",
        "Used the annual 7% as if it were a monthly rate: 2 500 × A(18, 7%) = 25 147.72.",
        "Valued the losses forever, ignoring the right to leave: 2 500/0.00565415 = 442 153.47.",
      ],
    },
    {
      id: "d3-exit-3",
      title: "Leave or stay: the exit decision",
      theory: `<p>At the exit date, compare what each choice is worth from that date on. Staying is worth the PV of all the future cash flows. Leaving is worth the exit value: a salvage price S, 0 for a free exit, or −F if leaving costs a fee F. Take the larger. What you have lost so far is sunk and plays no role. Kurbatov flagged the fee as a possible twist: with a fee, the exit branch is worth −F, not 0.</p>
<div class="formula"><div class="eq">value at the exit date = max(PV of continuing, exit value)</div>
<div class="where">Exit value = S (sell the assets), 0 (free exit) or −F (exit fee). PV of continuing is C/r for a perpetuity of C, or C/r<sub>m</sub> in months. Leave only if the exit value is higher.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The exit right is a put on the project, struck at the exit value. You use it only when walking away is worth more than carrying on. A fee lowers the strike, so a project that loses only a little may be better kept.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>At month 24 a shop loses 1 000 a month forever, r<sub>m</sub> = 0.5%. Staying: −1 000/0.005 = −200 000. Leaving for a fee of 120 000: −120 000. Leave, since −120 000 &gt; −200 000.</p></div>`,
      q: `<p>In the bad state a shop loses 1 500 NOK a month forever. At month 24 (and only then) the lease lets the owner leave for a fee of 350 000 NOK, paid on leaving. The monthly discount rate is 0.5%. The shop has already lost 36 000 NOK. Which statement is right at month 24?</p>`,
      options: [
        "Leave, since leaving is worth 0, which beats the negative value of staying.",
        "Leave, since the 36 000 already lost shows the shop will never pay its way.",
        "Stay: staying is worth −300 000 at month 24 and leaving −350 000.",
        "Leave, since the fee is paid once while the losses go on forever.",
      ],
      answer: 2,
      solution: `<p>Staying: −1 500/0.005 = −300 000, the value at month 24 of losing 1 500 a month forever.</p><p>Leaving: −350 000, the fee. Since −300 000 &gt; −350 000, <b>stay</b>: the fee costs more than the losses it would avoid.</p><p>The 36 000 already lost is sunk and does not enter.</p>`,
      check: `<p>Find the fee at which the owner is indifferent: F = 1 500/0.005 = 300 000. Below 300 000 leave, above it stay; 350 000 is above ✓ Without a fee the exit is worth 0 and leaving wins, which is why a free exit and an exit with a fee can give opposite decisions.</p>`,
      traps: [
        "Compared with 0 instead of −F. Leaving costs the 350 000 fee, so the exit branch is worth −350 000, not 0.",
        "Used a sunk cost. The 36 000 is lost whatever the owner does now; only future cash flows count.",
        null,
        "Compared the fee with the monthly loss, not with the present value of all future losses: forever at 0.5% a month that is 300 000, less than the fee.",
      ],
    },
    {
      id: "d3-exit-4",
      title: "The value of an exit option: compare with your best alternative",
      theory: `<p>An exit option is worth the NPV with it minus your best choice without it, max(0, NPV<sub>without</sub>). If you would invest anyway, subtract the NPV without the option. If you would not invest without it, subtract 0, never the negative NPV. Lecture 11's store example subtracts the negative NPV, which is the first case: a store already committed. In the wrap-up Kurbatov warned that comparing with the negative value instead of 0 is the classic mistake when you could stay out.</p>
<div class="formula"><div class="eq">value of the exit option = max(0, NPV<sub>with</sub>) − max(0, NPV<sub>without</sub>)</div>
<div class="eq">bad state with a sale at t = 1: −I + (C<sub>bad</sub> + S)/(1 + r)</div>
<div class="where">You commit at t = 0, so the year-1 cash flow comes in both states. At t = 1 you sell for S only if S beats the PV of continuing, C<sub>bad</sub>/r.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The option changes only the bad state, where it swaps what continuing is worth for the sale price. If you would invest anyway, that swap is the whole option. If you would not, part of the swap only lifts a negative NPV towards 0, which you can have for free by not investing.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cost 350, net cash flow 60 or 20 forever (p = 0.5), r = 10%, a buyer pays 300 at t = 1. Without the sale: 40/0.10 − 350 = 50, so you invest anyway.</p><p>Bad state: continuing is worth 20/0.10 = 200 &lt; 300, so sell: −350 + (20 + 300)/1.10 = −59.09. Good: 600 − 350 = 250. With the sale: 0.5(250 − 59.09) = 95.45. Option = 95.45 − 50 = 45.45 = 0.5 × (300 − 200)/1.10 ✓</p></div>`,
      q: `<p>A fish-feed plant costs 1 000 (NOK thousand) today. Its net cash flow is 130 a year forever or 50 a year forever, with equal probability, first payment in one year; the firm learns which during year 1, after building. The discount rate is 8%. A competitor offers to buy the plant for 800 at t = 1, right after the year-1 cash flow. The offer is valid only then. How much does the offer add to the value of the opportunity?</p>`,
      options: ["206.02", "87.50", "57.87", "81.02"],
      answer: 3,
      solution: `<p>Without the offer: 0.5(130 + 50)/0.08 − 1 000 = 1 125 − 1 000 = 125 &gt; 0, so the firm builds anyway.</p><p>With the offer, at t = 1: in the good state continuing is worth 130/0.08 = 1 625 &gt; 800, so keep it. In the bad state continuing is worth 50/0.08 = 625 &lt; 800, so sell.</p><p>Good: 1 625 − 1 000 = 625. Bad: −1 000 + (50 + 800)/1.08 = −212.96. With the offer: 0.5(625) + 0.5(−212.96) = 312.50 − 106.48 = 206.02.</p><p>Value of the offer = 206.02 − max(0, 125) = <b>81.02</b>.</p>`,
      check: `<p>The offer changes only the bad state, swapping 625 for 800 at t = 1: 0.5 × (800 − 625)/1.08 = 0.5 × 162.04 = 81.02 ✓ This route never uses the NPV without the offer, so it catches a wrong baseline.</p>`,
      traps: [
        "Compared with 0, but the firm builds without the offer too, worth 125. 206.02 is the whole NPV with the offer, not what the offer adds.",
        "Forgot to discount the gain from t = 1: 0.5 × (800 − 625) = 87.50.",
        "Left out the year-1 cash flow in the bad state: −1 000 + 800/1.08 = −259.26, so 0.5(625 − 259.26) − 125 = 57.87.",
        null,
      ],
    },
    {
      id: "d3-exit-5",
      title: "Staged financing: decide each stage on what is still ahead",
      theory: `<p>Staged financing pays for one stage, sees the result and only then decides on the next. Each stage buys the right to stop. Roll the tree back from the end. At stage 2, ignore what stage 1 cost: that money is spent whatever you do now. Kurbatov: "you should ignore the previous stages". When the question gives a rate, discount each payment from the date it is made.</p>
<div class="formula"><div class="eq">C<sub>2</sub> = −I<sub>2</sub> + p<sub>2</sub>·V/(1 + r) &nbsp;&nbsp; (value at t = 1)</div>
<div class="eq">NPV<sub>staged</sub> = −I<sub>1</sub> + p<sub>1</sub>·max(0, C<sub>2</sub>)/(1 + r)</div>
<div class="where">I<sub>1</sub> is paid today, I<sub>2</sub> at t = 1 only if stage 1 succeeds (probability p<sub>1</sub>). V arrives at t = 2 if stage 2 succeeds (p<sub>2</sub>, given that stage 1 did). With β = 0, r = r<sub>f</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Staging changes neither the chance of success nor the total cost. It changes when you pay: the expensive stage is paid only in the branch where it can still pay off. The more stage 1 reveals, the more money staging saves.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11, no discounting)</span><p>10 for product development (50% success), then 90 for the IPO (20% success), IPO worth 800. At stage 2: −90 + 0.2 × 800 = 70 &gt; 0, so continue, ignoring the 10 already spent. NPV = −10 + 0.5 × 70 = 25, against −100 + 0.1 × 800 = −20 in one go.</p></div>`,
      q: `<p>A medtech start-up builds a prototype for 15 (NOK million) today; it works with probability 25%, known at t = 1. If it works, clinical trials cost 40 at t = 1 and succeed with probability 60%, known at t = 2. If both succeed, the firm is worth 220 at t = 2; otherwise nothing. The risks are not systematic and r<sub>f</sub> = 4%. What is the NPV today of financing the stages one at a time?</p>`,
      options: ["−22.95", "8.00", "5.89", "2.29"],
      answer: 2,
      solution: `<p><b>At t = 1, if the prototype works.</b> C<sub>2</sub> = −40 + 0.6 × 220/1.04 = −40 + 126.92 = 86.92 &gt; 0, so pay for the trials. The 15 already spent does not enter. If the prototype fails, stop.</p><p><b>Today.</b> NPV = −15 + 0.25 × 86.92/1.04 = −15 + 20.89 = <b>5.89</b>.</p>`,
      check: `<p>Pay both stages up front instead: −15 − 40/1.04 + 0.15 × 220/1.04<sup>2</sup> = −15 − 38.46 + 30.51 = −22.95. Staging is worth 5.89 − (−22.95) = 28.85, exactly the trial money saved when the prototype fails: 0.75 × 40/1.04 = 28.85 ✓</p>`,
      traps: [
        "Committed to both stages today, giving up the right to stop: −15 − 40/1.04 + 0.15 × 220/1.04<sup>2</sup> = −22.95.",
        "Left out discounting as in the lecture example, although the question gives a rate: −15 + 0.25 × (−40 + 0.6 × 220) = 8.00.",
        null,
        "Charged the 15 again at stage 2: −15 + 0.25 × (86.92 − 15)/1.04 = 2.29. It was spent at t = 0 and is already counted there.",
      ],
    },
    {
      id: "d3-exit-6",
      title: "Exam level: a monthly exit with a fee",
      theory: `<p>This chains the ladder, as in H2025 Exercise 5 (d) and Kurbatov's store from lecture 11, with the fee twist. You open before you know the state, so you pay I in both states. The good state is a monthly perpetuity. In the bad state you bear 24 months of losses, then compare staying (the PV of losses forever) with leaving (−F). The fee is paid at month 24, so discount it. Finally value the right against your best alternative without it.</p>
<div class="formula"><div class="eq">NPV<sub>good</sub> = C<sub>good</sub>/r<sub>m</sub> − I &nbsp;&nbsp; NPV<sub>bad</sub> = C<sub>bad</sub> × A(24, r<sub>m</sub>) − I − F/(1 + r<sub>m</sub>)<sup>24</sup></div>
<div class="eq">value of the right = max(0, E[NPV<sub>with</sub>]) − max(0, E[NPV<sub>without</sub>])</div>
<div class="where">C<sub>bad</sub> is negative. The fee route holds only if F &lt; |C<sub>bad</sub>|/r<sub>m</sub>, the cost of staying seen from month 24. r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The right turns an endless stream of losses into two years of losses plus a fee. The good state keeps its whole perpetuity, so opening becomes a bet with a capped downside. Measured against staying out, which costs nothing, that is what the right is worth to you.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Set-up 100, net cash flow +3 or −2.5 a month (p = 0.5), r<sub>m</sub> = 0.5%, exit at month 12 for a fee of 20. Without the exit: 0.25/0.005 − 100 = −50, stay out. Good: 3/0.005 − 100 = 500.</p><p>Bad: staying at month 12 is worth −2.5/0.005 = −500 &lt; −20, so leave: −2.5 × 11.618932 − 100 − 20/1.005<sup>12</sup> = −29.05 − 100 − 18.84 = −147.89. With the exit: 0.5(500 − 147.89) = 176.06. The right is worth 176.06 − 0 = 176.06.</p></div>`,
      q: `<p>A bakery chain can open a branch for 750 (NOK thousand) now or never. Operating costs are 30 a month. Monthly revenue will be 44 or 25 forever, with equal probability; the chain learns which right after opening. The first monthly cash flow comes one month after opening. Demand is not related to the market and r<sub>f</sub> = 8% a year. The lease lets the chain leave at month 24 (and only then) for a fee of 150 paid on leaving; after that it gets nothing. The chain has not committed to opening. How much does the right to leave add to the value of the opportunity?</p>`,
      options: ["268.83", "218.23", "282.53", "207.53"],
      answer: 1,
      solution: `<p><b>Monthly rate.</b> r<sub>m</sub> = 1.08<sup>1/12</sup> − 1 = 0.643403%, so 1/r<sub>m</sub> = 155.4236, A(24, r<sub>m</sub>) = 22.172911 and (1 + r<sub>m</sub>)<sup>24</sup> = 1.08<sup>2</sup> = 1.1664.</p><p><b>Without the right.</b> Net cash flow 14 or −5, expected 4.5 a month: 4.5 × 155.4236 − 750 = 699.4061 − 750 = −50.5939. The chain would not open: 0.</p><p><b>Good state.</b> 14 × 155.4236 − 750 = 2 175.9301 − 750 = 1 425.9301.</p><p><b>Bad state.</b> At month 24 staying is worth −5 × 155.4236 = −777.12 and leaving −150, so leave. NPV = −5 × 22.172911 − 750 − 150/1.1664 = −110.8646 − 750 − 128.6008 = −989.4654.</p><p><b>With the right.</b> 0.5 × 1 425.9301 − 0.5 × 989.4654 = 712.9651 − 494.7327 = 218.2324. Value of the right = 218.23 − max(0, −50.59) = <b>218.23</b>.</p>`,
      check: `<p>Price what the right changes. It removes the losses from month 25 on, worth 777.1180 at month 24 or 777.1180/1.1664 = 666.2533 today, at the cost of the fee, 128.6008 today. Net 537.6525 in the bad state, times 0.5 = 268.8263. And −50.5939 + 268.8263 = 218.2324 ✓ The first 50.59 of the 268.83 only lifts a negative NPV to 0, which the chain gets for free by not opening.</p>`,
      traps: [
        "Compared with the negative NPV without the right: 218.23 − (−50.59) = 268.83. That is the right's value to a branch already committed. Uncommitted, the chain would stay out without the right, worth 0.",
        null,
        "Ignored the fee, as if leaving were worth 0: 0.5 × 1 425.93 + 0.5 × (−860.86) = 282.53.",
        "Did not discount the fee paid at month 24: 0.5 × 1 425.93 + 0.5 × (−1 010.86) = 207.53.",
      ],
    },
  ],
});
