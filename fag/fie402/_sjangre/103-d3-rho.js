/* sjanger 103 · d3-rho · Risk-neutral pricing with ρ */
window.EDU_DATA.sjangre.push({
  id: "d3-rho",
  num: 103,
  title: "Risk-neutral pricing with ρ",
  summary: "From the formula for ρ to pricing any claim, why ρ sits below the real probability, the p-then-ρ pattern and ρ backed out of a traded security",
  chapters: [22],
  exam: "7 of 11 papers · H2024 E6, V2022 P4",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>ρ is the shortcut through replication: the probability of the up state that makes the underlying earn exactly r<sub>f</sub>. With it any claim on the tree is its ρ-weighted payoff discounted at r<sub>f</sub>. The binomial model has come in 7 of 11 papers. H2024 Exercise 6 gave 8 points for backing ρ out of a traded security and saying why the real probabilities are not needed. At the top you can find ρ from a share or any other traded asset, use the real probability only where it belongs and explain why ρ lies below it.</p>`,
  steps: [
    {
      id: "d3-rho-1",
      title: "ρ: the weight that makes the share earn the risk-free rate",
      theory: `<p>Replication works, but there is a shortcut. Ask which probability of the up state would make a risk-neutral investor pay exactly today's share price. Such an investor discounts the expected payoff at r<sub>f</sub>, so ρ solves S<sub>0</sub> = [ρS<sub>u</sub> + (1 − ρ)S<sub>d</sub>]/(1 + r<sub>f</sub>). The solution is on the formula sheet. Grow S<sub>0</sub> by (1 + r<sub>f</sub>) before you compare it with the two outcomes.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">ρ is the weight on the up state, 1 − ρ the weight on the down state. It lies strictly between 0 and 1 only if S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>; otherwise the tree itself allows arbitrage. Keep four decimals.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>(1 + r<sub>f</sub>)S<sub>0</sub> is what the share's price would grow to in the bank. ρ says where that point sits on the line from S<sub>d</sub> to S<sub>u</sub>: close to S<sub>u</sub> gives ρ near 1, close to S<sub>d</sub> gives ρ near 0.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%.</p><p>ρ = (1.05 × 40 − 30)/(50 − 30) = (42 − 30)/20 = 0.6000. Check: (0.6 × 50 + 0.4 × 30)/1.05 = 42/1.05 = 40 ✓</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 64. In one year it will be worth 80 or 52. The one-year risk-free rate is 3%. What is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.4971", "0.4286", "0.5029", "0.3620"],
      answer: 0,
      solution: `<p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.03 × 64 = 65.92.</p><p>ρ = (65.92 − 52)/(80 − 52) = 13.92/28 = <b>0.4971</b> (0.497143 unrounded), so 1 − ρ = 0.5029.</p>`,
      check: `<p>ρ must reprice the share: (0.497143 × 80 + 0.502857 × 52)/1.03 = (39.7714 + 26.1486)/1.03 = 65.92/1.03 = 64.00 ✓. This test fails for each wrong answer: 0.4286 reprices to 62.1359, 0.5029 to 64.1553 and 0.3620 to 60.3261. The tree is arbitrage-free: 52 &lt; 65.92 &lt; 80.</p>`,
      traps: [
        null,
        "Forgot to grow S<sub>0</sub>: (64 − 52)/28 = 0.4286. Compare the outcomes with what S<sub>0</sub> becomes at r<sub>f</sub>, 65.92.",
        "Gave the down-state weight: 1 − ρ = 0.5029, the same as (80 − 65.92)/28. ρ belongs to the up state.",
        "Discounted S<sub>0</sub> instead of growing it: 64/1.03 = 62.1359, so (62.1359 − 52)/28 = 0.3620.",
      ],
    },
    {
      id: "d3-rho-2",
      title: "Price any claim: weight with ρ, discount at the risk-free rate",
      theory: `<p>Once ρ prices the share, it prices everything whose payoff depends on the same two states: a call, a put, a bond, a firm's equity and debt, a CDS. Take the claim's payoff in each state, weight with ρ and 1 − ρ and discount one period at r<sub>f</sub>. The result equals the replication price, because it is the same equation rewritten. The formula sheet has it with C for the claim.</p>
<div class="formula"><div class="eq">X<sub>0</sub> = [ρX<sub>u</sub> + (1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">X<sub>u</sub> and X<sub>d</sub> are the claim's payoffs. A put pays in the down state, so its payoff carries 1 − ρ. Discount at r<sub>f</sub>, never at a risk-adjusted rate: the risk adjustment is already in ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Every claim on the tree is a mix of the share and the bond. ρ prices both correctly. So it prices every mix correctly too. The risk premium has moved out of the discount rate and into the weights.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%, so ρ = 0.60.</p><p>A put with K = 45 pays 0 or 15: 0.40 × 15/1.05 = 5.7143. A contract paying 10 if up and 4 if down: (0.60 × 10 + 0.40 × 4)/1.05 = 7.60/1.05 = 7.2381. A bond paying 1 in both states: 1/1.05 = 0.9524, as it must.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 75. In one year it will be worth 95 or 60. The one-year risk-free rate is 4%. What is a one-year European put with strike K = 80 worth today?</p>`,
      options: ["9.7143", "9.8901", "9.3407", "7.4176"],
      answer: 2,
      solution: `<p>ρ = (1.04 × 75 − 60)/(95 − 60) = (78 − 60)/35 = 0.514286, so 1 − ρ = 0.485714.</p><p>Put payoffs: max(80 − 95, 0) = 0 and max(80 − 60, 0) = 20.</p><p>P = (0.514286 × 0 + 0.485714 × 20)/1.04 = 9.714286/1.04 = <b>9.3407</b>.</p>`,
      check: `<p>Price the call with the same strike from its own payoffs, 15 and 0: C = 0.514286 × 15/1.04 = 7.4176. Parity: C + PV(K) = 7.4176 + 80/1.04 = 7.4176 + 76.9231 = 84.3407 = P + S = 9.3407 + 75 ✓. With the weights swapped the two sides come out at 83.9286 and 84.8901, so this check catches that error.</p>`,
      traps: [
        "Forgot to discount: 0.485714 × 20 = 9.7143 is the value in one year.",
        "Put ρ on the put's payoff: 0.514286 × 20/1.04 = 9.8901. The put pays in the down state, which carries 1 − ρ.",
        null,
        "Priced the call instead: payoffs max(95 − 80, 0) = 15 and 0 give 0.514286 × 15/1.04 = 7.4176.",
      ],
    },
    {
      id: "d3-rho-3",
      title: "Why the real probability is above ρ",
      theory: `<p>For an ordinary share the real probability p of the up state is higher than ρ. Investors are risk averse, so they pay less for the share than its expected payoff discounted at r<sub>f</sub>: they demand an expected return above r<sub>f</sub>. ρ is the weight that strips out that premium, so it moves weight from the good state to the bad one. Kurbatov drew p &gt; ρ on the board but called it "a huge arbitrage opportunity" in class. That is a slip not to copy: nothing riskless follows from it.</p>
<div class="formula"><div class="eq">S<sub>0</sub> = [p × S<sub>u</sub> + (1 − p) × S<sub>d</sub>]/(1 + r<sub>E</sub>) = [ρS<sub>u</sub> + (1 − ρ)S<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Two routes to the same price: p with the share's required return r<sub>E</sub>, or ρ with r<sub>f</sub>. With r<sub>E</sub> &gt; r<sub>f</sub>, p &gt; ρ. Mixing them, p with r<sub>f</sub>, is the error. For an asset that pays in bad times, such as insurance, the order flips.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risk aversion has to show up somewhere. Real investors put it in the discount rate; risk-neutral pricing puts it in the probabilities instead, by shading the good state down. The gap between p and ρ is the price of risk, not free money.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 40, S<sub>u</sub> = 50, S<sub>d</sub> = 30, r<sub>f</sub> = 5%, so ρ = 0.60. Analysts say p = 0.75.</p><p>Expected payoff: 0.75 × 50 + 0.25 × 30 = 45, an expected return of 45/40 − 1 = 12.50%. At r<sub>f</sub> the expected payoff would be worth 45/1.05 = 42.8571, but the share costs 40. The gap of 2.8571 is the discount for risk; ρ = 0.60 &lt; 0.75 is how risk-neutral pricing absorbs it.</p></div>`,
      q: `<p>A share trades at 100. In one year it will be worth 125 or 85. The one-year risk-free rate is 4%. Analysts put the probability of the up state at 0.70. Which statement about ρ and the analysts' 0.70 is right?</p>`,
      options: [
        "ρ = 0.4750 is below 0.70, an arbitrage: buy the share, which is more likely to rise than its price says.",
        "ρ = 0.4750 is below 0.70 because investors demand a risk premium; ρ moves weight to the down state to absorb it.",
        "No arbitrage requires ρ to equal the real probability of 0.70, so either the share price or the analysts are wrong.",
        "ρ = 0.4750 is the market's own forecast of the up move, so the analysts' 0.70 is too optimistic.",
      ],
      answer: 1,
      solution: `<p>ρ = (1.04 × 100 − 85)/(125 − 85) = (104 − 85)/40 = 0.4750.</p><p>With p = 0.70 the expected payoff is 0.70 × 125 + 0.30 × 85 = 113, an expected return of 13% against r<sub>f</sub> = 4%. Discounted at r<sub>f</sub> the expected payoff would be worth 113/1.04 = 108.6538, yet the share costs 100: investors demand a premium for the risk. ρ shifts weight to the down state until discounting at r<sub>f</sub> gives 100. <b>The gap between 0.70 and 0.4750 is the risk premium.</b></p>`,
      check: `<p>Both routes give the same price: 113/1.13 = 100 with p and the share's own 13%; (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 with ρ ✓. Buying the share earns 13% on average but loses in the down state, so it is not riskless: no arbitrage. And ρ is not a forecast of anything; it is the weight that makes discounting at r<sub>f</sub> work.</p>`,
      traps: [
        "Copied a slip from class. Buying the share earns 13% on average but loses 15 in the down state: a risk premium, not a riskless profit.",
        null,
        "ρ equals p only when investors are risk neutral. With a 13% expected return against 4%, ρ must lie below p.",
        "ρ is a pricing weight, not a forecast. It sits below 0.70 because the market charges for risk, not because it disagrees with the analysts.",
      ],
    },
    {
      id: "d3-rho-4",
      title: "A low share price shows up in ρ",
      theory: `<p>ρ depends on S<sub>0</sub>, not only on the two outcomes. Hold S<sub>u</sub>, S<sub>d</sub> and r<sub>f</sub> fixed and let the share price fall: (1 + r<sub>f</sub>)S<sub>0</sub> moves towards S<sub>d</sub>, so ρ falls. Kurbatov in the wrap-up: a very low S<sub>0</sub> means the market is very pessimistic, which shows up in ρ. Calls lose and puts gain. If S<sub>0</sub> falls to S<sub>d</sub>/(1 + r<sub>f</sub>) or below, ρ hits zero and the tree allows arbitrage.</p>
<div class="formula"><div class="eq">same S<sub>u</sub> and S<sub>d</sub>, lower S<sub>0</sub> ⟹ lower ρ ⟹ calls fall, puts rise</div>
<div class="where">The price can fall because investors think the down state more likely, because they fear it more, or both. ρ mixes the two and never tells you which.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The same two outcomes at a lower price means the market treats the bad outcome as heavier. ρ is that weight read straight off the price: the cheaper the share, the more weight on the down state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kurbatov's drill: r<sub>f</sub> = 5%, S<sub>0</sub> = 100, S<sub>u</sub> = 120, S<sub>d</sub> = 60. ρ = (105 − 60)/60 = 0.7500.</p><p>If the share fell to 90 with the same outcomes: ρ = (94.50 − 60)/60 = 0.5750. At 60/1.05 = 57.1429 or below there would be no ρ above 0.</p></div>`,
      q: `<p>Everyone agrees that a share will be worth 150 or 90 in one year. The one-year risk-free rate is 5%. Last week the share traded at 120. After a profit warning it trades at 100. The two outcomes have not changed. Which statement is right?</p>`,
      options: [
        "ρ is still 0.6000: it depends only on S<sub>u</sub>, S<sub>d</sub> and r<sub>f</sub>, none of which has moved.",
        "ρ rises above 0.6000: at 100 the share has more room to reach 150, so the up state is likelier.",
        "ρ falls to 0.2500, which shows that the real probability of the up state is now 25%.",
        "ρ falls to 0.2500: the market now prices the share as if the down state were much heavier.",
      ],
      answer: 3,
      solution: `<p>Before: ρ = (1.05 × 120 − 90)/(150 − 90) = (126 − 90)/60 = 0.6000. After: ρ = (105 − 90)/60 = <b>0.2500</b>.</p><p>The same two outcomes now cost less, so the market puts far more weight on the low one. A call with K = 110 falls from 0.60 × 40/1.05 = 22.8571 to 0.25 × 40/1.05 = 9.5238; the put with K = 110 rises from 0.40 × 20/1.05 = 7.6190 to 0.75 × 20/1.05 = 14.2857.</p>`,
      check: `<p>ρ = 0.25 reprices the share at today's price: (0.25 × 150 + 0.75 × 90)/1.05 = 105/1.05 = 100 ✓, while 0.60 gives last week's 120. Had the price fallen to 90/1.05 = 85.7143 or below, ρ would be 0 or negative: borrowing to buy the share would then never lose, an arbitrage.</p>`,
      traps: [
        "ρ uses S<sub>0</sub> too: (1 + r<sub>f</sub>)S<sub>0</sub> fell from 126 to 105, so ρ fell from 0.6000 to 0.2500.",
        "A higher expected return on a cheaper share is the real-world view. ρ is a pricing weight; a lower price with the same outcomes lowers it.",
        "ρ is not the real probability. The fall can reflect more fear of the down state as well as a lower chance of the up state; ρ mixes both.",
        null,
      ],
    },
    {
      id: "d3-rho-5",
      title: "Exam level: p first, then switch to ρ",
      theory: `<p>Kurbatov: "In some exercises, you might have to first use the p, but then you'll switch to rho." Problem Set 3 Exercises 2 and 4 follow this pattern. If S<sub>0</sub> is not given, find it with the real probability and the CAPM: the expected payoff discounted at the share's own required return. Then compute ρ from that S<sub>0</sub> and price the option with ρ and r<sub>f</sub>. The real p comes back only for expected returns.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>f</sub> + β(E[R<sub>mkt</sub>] − r<sub>f</sub>) &nbsp;&nbsp; S<sub>0</sub> = [p × S<sub>u</sub> + (1 − p) × S<sub>d</sub>]/(1 + r<sub>E</sub>)</div><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">p goes with r<sub>E</sub>, ρ goes with r<sub>f</sub>; say in each line which one you use. β multiplies the market risk premium E[R<sub>mkt</sub>] − r<sub>f</sub>, not E[R<sub>mkt</sub>].</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The real probability and the CAPM tell you what the share is worth. Once the share has a price, the option is priced relative to it and the real probability has done its job. Using p for the option too would need the option's own expected return, far above the share's because the option is levered.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>u</sub> = 120, S<sub>d</sub> = 70, p = 0.6, β = 1.0, r<sub>f</sub> = 5%, E[R<sub>mkt</sub>] = 11%, call with K = 100.</p><p>r<sub>E</sub> = 5% + 1.0 × 6% = 11%. E[S<sub>1</sub>] = 0.6 × 120 + 0.4 × 70 = 100, so S<sub>0</sub> = 100/1.11 = 90.0901. ρ = (1.05 × 90.0901 − 70)/50 = (94.5946 − 70)/50 = 0.4919. C<sub>0</sub> = 0.491892 × 20/1.05 = 9.3694.</p></div>`,
      q: `<p>In one year a share will be worth 140 with real probability 0.55 or 80 with probability 0.45. Its beta is 1.2, the risk-free rate is 4% and the expected market return is 9%. No share price is quoted. What is a one-year European call with strike K = 100 worth today? Use four decimals.</p>`,
      options: ["17.2028", "21.1538", "20.0000", "14.3393"],
      answer: 0,
      solution: `<p><b>p first.</b> r<sub>E</sub> = 4% + 1.2 × (9% − 4%) = 10%. E[S<sub>1</sub>] = 0.55 × 140 + 0.45 × 80 = 77 + 36 = 113. S<sub>0</sub> = 113/1.10 = 102.7273.</p><p><b>Then ρ.</b> ρ = (1.04 × 102.7273 − 80)/(140 − 80) = (106.8364 − 80)/60 = 0.4473 (0.447273 unrounded).</p><p><b>Price.</b> C<sub>u</sub> = 40, C<sub>d</sub> = 0. C<sub>0</sub> = 0.447273 × 40/1.04 = 17.8909/1.04 = <b>17.2028</b>.</p>`,
      check: `<p>The check that can fail: the share earns 10% against 4%, so ρ must lie below p: 0.4473 &lt; 0.55 ✓. Pairing p with r<sub>f</sub> amounts to setting ρ = p, which this test rejects. Replication agrees: Δ = 40/60 = 0.666667, B = −80 × 0.666667/1.04 = −51.2821, C<sub>0</sub> = 68.4848 − 51.2821 = 17.2028 ✓, though it is the same model and catches slips only. The call's real expected return is 0.55 × 40/17.2028 − 1 = 27.8862%, far above the share's 10%: the call is levered 68.4848/17.2028 = 3.98 times.</p>`,
      traps: [
        null,
        "Paired the real probability with r<sub>f</sub>: 0.55 × 40/1.04 = 21.1538. Switch to ρ once S<sub>0</sub> is known.",
        "Discounted the call's expected payoff at the share's 10%: 0.55 × 40/1.10 = 20.0000. The call is levered, so its own required return is far higher.",
        "Used the market return instead of the premium: r<sub>E</sub> = 4% + 1.2 × 9% = 14.8%, so S<sub>0</sub> = 98.4321, ρ = 0.3728 and C<sub>0</sub> = 14.3393.",
      ],
    },
    {
      id: "d3-rho-6",
      title: "Exam level: ρ from a traded security with a payout",
      theory: `<p>ρ does not have to come from the share. Any traded security whose value depends on the same two states reveals it: an annuity in H2024 Exercise 6, a royalty stream, a fund, an option. The rule from the H2024 key: S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must describe the same security. If it pays a cash flow at date 1, add the payment to both S<sub>u</sub> and S<sub>d</sub>, just as a share's value at date 1 includes a dividend just paid.</p>
<div class="formula"><div class="eq">S<sub>u</sub> = payout in the up state + value after the payout &nbsp;&nbsp; S<sub>d</sub> likewise</div><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">Then price the claim you want with ρ and r<sub>f</sub>. Leaving the payout out still gives a ρ between 0 and 1, so the range test misses it; repricing the security with its full date-1 values catches it.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>At date 1 the holder owns the cash just paid out and the unit that remains. Today's price buys both, so the date-1 values must count both. Leave the payout out and you compare today's price of one asset with next year's value of a smaller one.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A certificate trades at 50. In one year it pays out 5 (high state) or 2 (low) and is then worth 60 or 40. r<sub>f</sub> = 5%.</p><p>S<sub>u</sub> = 65, S<sub>d</sub> = 42. ρ = (52.50 − 42)/(65 − 42) = 10.50/23 = 0.4565. A claim paying 10 in the low state is worth 0.543478 × 10/1.05 = 5.1760. Without the payout: (52.50 − 40)/20 = 0.6250, which is wrong.</p></div>`,
      q: `<p>Units in a listed shipping fund trade at 230 today. In one year the fund pays out that year's charter income: 24 per unit if freight rates are high and 12 if they are low. Right after the payout a unit is worth 260 (high) or 190 (low). The one-year risk-free rate is 4% and nobody knows the real probabilities. A shipowner wants a contract that pays 40 in one year if freight rates are low and nothing if they are high. What is the contract worth today?</p>`,
      options: ["11.4286", "17.4484", "21.0131", "25.3283"],
      answer: 2,
      solution: `<p>Date-1 values including the payout: S<sub>u</sub> = 24 + 260 = 284, S<sub>d</sub> = 12 + 190 = 202.</p><p>ρ = (1.04 × 230 − 202)/(284 − 202) = (239.20 − 202)/82 = 37.20/82 = 0.453659, so 1 − ρ = 0.546341.</p><p>Contract = (0.453659 × 0 + 0.546341 × 40)/1.04 = 21.8537/1.04 = <b>21.0131</b>.</p>`,
      check: `<p>Reprice the fund with its full date-1 values: (0.453659 × 284 + 0.546341 × 202)/1.04 = (128.8390 + 110.3610)/1.04 = 239.20/1.04 = 230 ✓. The ρ that ignores the payout, 0.702857, reprices it to (199.6114 + 60.0229)/1.04 = 249.6484, not 230. This check catches that error; the range test 0 &lt; ρ &lt; 1 does not.</p>`,
      traps: [
        "Left the payout out: ρ = (239.20 − 190)/(260 − 190) = 0.702857, so 0.297143 × 40/1.04 = 11.4286. Today's 230 buys the payout too.",
        "Put ρ on the low state: 0.453659 × 40/1.04 = 17.4484. The contract pays when rates are low, which carries 1 − ρ.",
        null,
        "Did not grow today's price: ρ = (230 − 202)/82 = 0.341463, so 0.658537 × 40/1.04 = 25.3283.",
      ],
    },
  ],
});
