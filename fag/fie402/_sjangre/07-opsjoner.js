/* sjanger 7 · opsjoner · Options: payoffs, parity, the binomial model and Black-Scholes intuition */
window.EDU_DATA.sjangre.push({
  id: "opsjoner",
  num: 7,
  title: "Options: payoffs, parity, the binomial model and Black-Scholes intuition",
  summary: "From a single payoff to put-call parity, the binomial tree, risk-neutral pricing and what volatility does to an option",
  chapters: [21, 22, 23],
  exam: "7 of 11 papers · H2024 E6, H2025 E1",
  intro: `<p>The binomial model and risk-neutral pricing have appeared on 7 of 11 papers and put-call parity on 4. Kurbatov has tested options twice: H2024 Exercise 6 priced the right to wait with risk-neutral probabilities for 20 points; H2025 Exercise 1 opened the paper with 12 verbal points on what volatility does to a call. The ladder starts with one payoff, builds parity and the one-period tree, then climbs to two periods, ρ backed out of prices and Black-Scholes intuition. At the top you can price any claim on a binomial tree, find a missing price with parity, spot a quote that breaks the no-arbitrage bounds and say what a mispriced volatility means for the trade.</p>`,
  steps: [
    {
      id: "opsjoner-1",
      title: "Payoff and profit at expiry",
      theory: `<p>An option gives its holder a right, never an obligation. A call is the right to buy one share at the strike K on the expiry date; a put is the right to sell one share at K. The holder exercises only when it pays, so the payoff is never negative. The profit subtracts the premium paid today. The writer (seller) has the mirror image: he receives the premium and pays the payoff.</p>
<div class="formula"><div class="eq">Call payoff = max(S<sub>T</sub> − K, 0) &nbsp;&nbsp; Put payoff = max(K − S<sub>T</sub>, 0)</div><div class="eq">Profit = payoff − premium</div>
<div class="where">S<sub>T</sub> is the share price at expiry. The exercise decision never looks at the premium: you exercise a call whenever S<sub>T</sub> &gt; K, even if you still lose money overall. Assume European options, exercised only at expiry, unless told otherwise.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A call with K = 100 costs 6.</p><p>S<sub>T</sub> = 115: payoff 15, profit 15 − 6 = 9. S<sub>T</sub> = 104: payoff 4, profit −2. You still exercise, because 4 beats 0. S<sub>T</sub> = 90: payoff max(90 − 100, 0) = 0, profit −6, the whole premium.</p></div>`,
      q: `<p>You buy a European put with strike K = 64 for a premium of 5.20. At expiry the share trades at S<sub>T</sub> = 70. What is your profit?</p>`,
      options: ["0.80", "−11.20", "−5.20", "0.00"],
      answer: 2,
      solution: `<p>Put payoff = max(64 − 70, 0) = max(−6, 0) = 0. The right to sell at 64 is worthless when the market pays 70, so you let the put expire.</p><p>Profit = 0 − 5.20 = <b>−5.20</b>.</p>`,
      check: `<p>A long option can never lose more than its premium; −5.20 is exactly the premium. The put's break-even is K − premium = 64 − 5.20 = 58.80: it makes money only below 58.80; 70 is far above that.</p>`,
      traps: [
        "Used the call's payoff for a put: max(70 − 64, 0) − 5.20 = 6 − 5.20 = 0.80.",
        "Dropped the max(·, 0): (64 − 70) − 5.20 = −11.20. A holder never exercises at a loss, so the payoff cannot be negative.",
        null,
        "Gave the payoff instead of the profit: max(64 − 70, 0) = 0.00, forgetting the premium of 5.20.",
      ],
    },
    {
      id: "opsjoner-3",
      title: "The bounds: what a call cannot cost",
      theory: `<p>Arbitrage alone, before any model, limits what a European call on a share without dividends can cost. It can never be worth more than the share, because owning the share gives you the same thing without paying K. It is worth at least S − PV(K): a call plus a deposit of PV(K) pays max(S<sub>T</sub>, K) at expiry, which is never less than the share, so the package cannot cost less than S. The floor uses the discounted strike, so it lies above the intrinsic value S − K, what the call would pay if you exercised it today.</p>
<div class="formula"><div class="eq">max(S − PV(K), 0) ≤ C ≤ S &nbsp;&nbsp; PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup></div>
<div class="where">A quote outside the bounds is an arbitrage. Below the floor: buy the call, short the share and lend PV(K). The upper bound holds whatever the strike: the call's payoff is unlimited, its price is not. For a put: max(PV(K) − S, 0) ≤ P ≤ PV(K).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 100, K = 84, r<sub>f</sub> = 5%, one year. PV(K) = 84/1.05 = 80, so 20 ≤ C ≤ 100.</p><p>A quote of 18 is impossible even though it beats the intrinsic value of 16. Buy the call for 18, short the share for 100 and lend 80: you collect 2 today. At expiry you hold max(S<sub>T</sub> − 84, 0) − S<sub>T</sub> + 84 = max(84 − S<sub>T</sub>, 0) ≥ 0.</p></div>`,
      q: `<p>A share that pays no dividends trades at S = 150. The one-year risk-free rate is 5%. A one-year European call on it has strike K = 126. Which quote for the call does not violate the no-arbitrage bounds?</p>`,
      options: ["34.00", "27.50", "151.00", "23.00"],
      answer: 0,
      solution: `<p>PV(K) = 126/1.05 = 120.00.</p><p>Lower bound: max(150 − 120.00, 0) = 30.00. Upper bound: S = 150.00.</p><p>Only <b>34.00</b> lies between 30.00 and 150.00.</p>`,
      check: `<p>Test the quote of 27.50: buy the call, short the share and lend 120. Today: −27.50 + 150 − 120 = +2.50. At expiry you hold max(126 − S<sub>T</sub>, 0) ≥ 0. Money for nothing, so 27.50 is impossible. At 34.00 the same trade costs 4.00 today, so there is no free lunch ✓.</p>`,
      traps: [
        null,
        "Used the intrinsic value S − K = 24.00 as the floor instead of S − PV(K) = 30.00, so 27.50 looked fine.",
        "Thought a call has no upper bound because its payoff is unlimited. Its price can never exceed the share's 150.",
        "Discounted the intrinsic value instead of the strike: (150 − 126)/1.05 = 22.86, so 23.00 looked fine.",
      ],
    },
    {
      id: "opsjoner-4",
      title: "Put-call parity: the missing price",
      theory: `<p>Two portfolios pay exactly the same at expiry. A share plus a put (the protective put) pays max(S<sub>T</sub>, K). So does a call plus a deposit of PV(K) (the fiduciary call). Identical payoffs in every state must cost the same today, or there is free money. That is put-call parity. It needs no model and no probabilities. It is not on the formula sheet.</p>
<div class="formula"><div class="eq">C + PV(K) = P + S &nbsp;⟺&nbsp; C = P + S − PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>, with the exponent T. Parity holds for European options with the same strike, the same expiry and the same underlying, on a share that pays no dividends before expiry. If quoted prices break parity, buy the cheaper side, sell the dearer one and keep the gap: the payoffs cancel in every state.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 60, K = 66, r<sub>f</sub> = 5% a year, T = 2 years. The put costs 7.00.</p><p>(1.05)<sup>2</sup> = 1.1025, so PV(K) = 66/1.1025 = 59.8639.</p><p>C = 7.00 + 60 − 59.8639 = 7.1361.</p></div>`,
      q: `<p>A share trades at S = 84 and pays no dividends. A two-year European put with strike K = 90 costs 9.20. The risk-free rate is 4% a year. What is the price of the two-year European call with the same strike?</p>`,
      options: ["3.2000", "6.6615", "9.9899", "8.4101"],
      answer: 2,
      solution: `<p>(1.04)<sup>2</sup> = 1.0816, so PV(K) = 90/1.0816 = 83.2101.</p><p>C = P + S − PV(K) = 9.20 + 84 − 83.2101 = <b>9.9899</b>.</p>`,
      check: `<p>Running parity backwards, 9.9899 − 84 + 83.2101 = 9.2000, only confirms the arithmetic. The bounds are a real test: C = 9.9899 must lie between max(84 − 83.2101, 0) = 0.7899 and S = 84. It does ✓.</p>`,
      traps: [
        "Used K instead of PV(K): 9.20 + 84 − 90 = 3.2000.",
        "Discounted the strike for one year only: 9.20 + 84 − 90/1.04 = 9.20 + 84 − 86.5385 = 6.6615.",
        null,
        "Swapped the signs of S and PV(K): 9.20 − 84 + 83.2101 = 8.4101.",
      ],
    },
    {
      id: "opsjoner-6",
      title: "Replication in a one-period tree: Δ, B and the price",
      theory: `<p>Let the share move from S<sub>0</sub> to either S<sub>u</sub> or S<sub>d</sub> in one period. You can borrow or lend at r<sub>f</sub>. Buy Δ shares and place B in the risk-free asset, chosen so that the portfolio pays exactly what the option pays in both states: two equations, two unknowns. Something that pays the same as the option in every state must cost the same, so the option's price is the portfolio's cost. All three formulas are on the formula sheet.</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>)</div><div class="eq">B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>)</div><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">C<sub>u</sub> and C<sub>d</sub> are the option's payoffs in the two states. B is today's amount: B &lt; 0 means you borrow; you repay B(1 + r<sub>f</sub>) next period. First check that S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>, or the tree itself is an arbitrage.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 50, S<sub>u</sub> = 60, S<sub>d</sub> = 40, r<sub>f</sub> = 4%, call with K = 50. C<sub>u</sub> = 10, C<sub>d</sub> = 0.</p><p>Δ = 10/20 = 0.5. B = (0 − 40 × 0.5)/1.04 = −20/1.04 = −19.2308: borrow 19.2308, repay 20.00.</p><p>C<sub>0</sub> = 50 × 0.5 − 19.2308 = 25.0000 − 19.2308 = 5.7692. Up: 0.5 × 60 − 20 = 10 ✓. Down: 0.5 × 40 − 20 = 0 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 60. In one year it will be worth either 75 or 48. The one-year risk-free rate is 5%. What is the price of a one-year European call with strike K = 63?</p>`,
      options: ["6.3492", "46.9841", "5.3333", "2.2857"],
      answer: 0,
      solution: `<p>Payoffs: C<sub>u</sub> = max(75 − 63, 0) = 12, C<sub>d</sub> = max(48 − 63, 0) = 0.</p><p>Δ = (12 − 0)/(75 − 48) = 12/27 = 0.444444.</p><p>B = (0 − 48 × 0.444444)/1.05 = −21.3333/1.05 = −20.3175, so you borrow 20.3175.</p><p>C<sub>0</sub> = 60 × 0.444444 − 20.3175 = 26.6667 − 20.3175 = <b>6.3492</b>.</p>`,
      check: `<p>Verify the portfolio state by state. Up: 0.444444 × 75 − 21.3333 = 33.3333 − 21.3333 = 12.00 = C<sub>u</sub> ✓, where 21.3333 is the loan repaid with interest. Down: 0.444444 × 48 − 21.3333 = 0.00 = C<sub>d</sub> ✓. The tree is arbitrage-free: 48 &lt; 1.05 × 60 = 63 &lt; 75. The price also lies inside the bounds: above max(60 − 63/1.05, 0) = 0 and below 60.</p>`,
      traps: [
        null,
        "Got the sign of B wrong and added the loan: 26.6667 + 20.3175 = 46.9841. B is negative: the call is shares bought with borrowed money.",
        "Did not discount the loan: 26.6667 − 21.3333 = 5.3333. B is today's amount; 21.3333 is what you repay in a year.",
        "Took Δ as a ratio of levels, C<sub>u</sub>/S<sub>u</sub> = 12/75 = 0.16. Then B = −48 × 0.16/1.05 = −7.3143 and C<sub>0</sub> = 9.60 − 7.3143 = 2.2857.",
      ],
    },
    {
      id: "opsjoner-7",
      title: "The risk-neutral probability ρ and why the real one never appears",
      theory: `<p>Rearranging the replication price gives a shortcut that looks like an expectation. ρ is the probability of the up state that makes the share itself earn exactly r<sub>f</sub>. Weight the option's payoffs with ρ and discount at r<sub>f</sub>: you get the replication price exactly, because it is the same equation rewritten. The real probability never enters. The option is copied state by state, so its price cannot depend on how likely the states are; the market's beliefs and risk aversion already sit inside S<sub>0</sub>.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div><div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Both are on the formula sheet. ρ is a pricing weight, not a forecast. The only probability you may pair with r<sub>f</sub> is ρ; a real probability belongs with a risk-adjusted rate you are not given.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The tree from the previous step: S<sub>0</sub> = 50, S<sub>u</sub> = 60, S<sub>d</sub> = 40, r<sub>f</sub> = 4%, call with K = 50.</p><p>ρ = (1.04 × 50 − 40)/(60 − 40) = (52 − 40)/20 = 0.60. On the share: (0.60 × 60 + 0.40 × 40)/1.04 = 52/1.04 = 50 ✓.</p><p>C<sub>0</sub> = (0.60 × 10 + 0.40 × 0)/1.04 = 6/1.04 = 5.7692, exactly the replication price.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 40. In one year it will be worth 52 or 34. The one-year risk-free rate is 3%. Analysts put the probability of the up move at 0.70. What is the price of a one-year European call with strike K = 44?</p>`,
      options: ["5.4369", "3.1068", "3.2000", "4.8069"],
      answer: 1,
      solution: `<p>ρ = (1.03 × 40 − 34)/(52 − 34) = (41.20 − 34)/18 = 7.20/18 = 0.4000.</p><p>Payoffs: C<sub>u</sub> = 52 − 44 = 8, C<sub>d</sub> = 0.</p><p>C<sub>0</sub> = (0.4000 × 8 + 0.6000 × 0)/1.03 = 3.20/1.03 = <b>3.1068</b>. The analysts' 0.70 plays no role.</p>`,
      check: `<p>Replication gives the same: Δ = 8/18 = 0.444444, B = −34 × 0.444444/1.03 = −14.6710, C<sub>0</sub> = 17.7778 − 14.6710 = 3.1068 ✓. That is the same equation rearranged, so it catches arithmetic slips only. What the real probability would need: the expected payoff 0.70 × 8 = 5.60 gives 3.1068 only when discounted at the call's own expected return, 5.60/3.1068 − 1 = 80.25%, a rate you cannot know before you know the price.</p>`,
      traps: [
        "Paired the real probability with the risk-free rate: 0.70 × 8/1.03 = 5.4369. A real probability belongs with a risk-adjusted rate.",
        null,
        "Forgot to discount: 0.40 × 8 = 3.2000 is the value in one year, not today.",
        "Discounted the real expected payoff at the share's expected return: E[S<sub>1</sub>] = 0.70 × 52 + 0.30 × 34 = 46.60, a return of 16.50%, so 5.60/1.165 = 4.8069. The call is far riskier than the share.",
      ],
    },
    {
      id: "opsjoner-9",
      title: "Two periods: roll the tree back node by node",
      theory: `<p>With two periods you solve the one-period problem three times, starting at the end. Build the share tree, compute the payoffs at the last date, then value each date-1 node as the risk-neutral average of the two nodes after it, discounted one period. Repeat at the root. With the same u and d at every node the tree recombines and ρ is the same everywhere. Δ changes from node to node, so a replicating portfolio must be rebalanced at date 1.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>) − d]/(u − d)</div><div class="eq">C<sub>u</sub> = [ρC<sub>uu</sub> + (1 − ρ)C<sub>ud</sub>]/(1 + r<sub>f</sub>); C<sub>d</sub> and C<sub>0</sub> follow the same way</div><div class="eq">Shortcut: C<sub>0</sub> = [ρ<sup>2</sup>C<sub>uu</sub> + 2ρ(1 − ρ)C<sub>ud</sub> + (1 − ρ)<sup>2</sup>C<sub>dd</sub>]/(1 + r<sub>f</sub>)<sup>2</sup></div>
<div class="where">S<sub>u</sub> = uS<sub>0</sub>, S<sub>ud</sub> = udS<sub>0</sub> and so on; r<sub>f</sub> is per period. The 2 in the shortcut counts the two paths to the middle node. For a European option both routes give the same number.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 100, u = 1.2, d = 0.9, r<sub>f</sub> = 5%, call with K = 100 expiring in two periods. ρ = (1.05 − 0.90)/(1.20 − 0.90) = 0.50.</p><p>Share: 120 and 90, then 144, 108 and 81. Payoffs: 44, 8 and 0.</p><p>C<sub>u</sub> = (0.5 × 44 + 0.5 × 8)/1.05 = 26/1.05 = 24.7619. C<sub>d</sub> = (0.5 × 8 + 0.5 × 0)/1.05 = 4/1.05 = 3.8095. C<sub>0</sub> = (0.5 × 24.7619 + 0.5 × 3.8095)/1.05 = 14.2857/1.05 = 13.6054.</p><p>Shortcut: (0.25 × 44 + 0.50 × 8 + 0.25 × 0)/1.1025 = 15/1.1025 = 13.6054 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 80. Each year it rises by the factor u = 1.25 or falls by the factor d = 0.85. The risk-free rate is 4% a year. What is the price of a European call with strike K = 80 that expires in two years?</p>`,
      options: ["10.5399", "12.1605", "11.6927", "9.1346"],
      answer: 2,
      solution: `<p>ρ = (1.04 − 0.85)/(1.25 − 0.85) = 0.19/0.40 = 0.4750.</p><p>Share tree: 100 and 68, then 125, 85 and 57.80. Payoffs at date 2: C<sub>uu</sub> = 45, C<sub>ud</sub> = 5, C<sub>dd</sub> = 0.</p><p>Date 1: C<sub>u</sub> = (0.475 × 45 + 0.525 × 5)/1.04 = (21.375 + 2.625)/1.04 = 24/1.04 = 23.076923. C<sub>d</sub> = (0.475 × 5 + 0.525 × 0)/1.04 = 2.375/1.04 = 2.283654.</p><p>Today: C<sub>0</sub> = (0.475 × 23.076923 + 0.525 × 2.283654)/1.04 = (10.961538 + 1.198918)/1.04 = 12.160456/1.04 = <b>11.6927</b>.</p>`,
      check: `<p>Shortcut: ρ<sup>2</sup> = 0.225625, 2ρ(1 − ρ) = 0.498750, (1 − ρ)<sup>2</sup> = 0.275625, summing to 1. C<sub>0</sub> = (0.225625 × 45 + 0.498750 × 5)/1.0816 = (10.153125 + 2.493750)/1.0816 = 12.646875/1.0816 = 11.6927 ✓. ρ also prices the share at the up node: (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 ✓. The hedge moves: Δ is 20.7933/32 = 0.6498 today, 40/40 = 1.0000 after an up move and 5/27.2 = 0.1838 after a down move.</p>`,
      traps: [
        "Left out the 2 on the middle node: (0.225625 × 45 + 0.249375 × 5)/1.0816 = 11.400000/1.0816 = 10.5399. Two paths lead to 85.",
        "Discounted the date-2 expectation for one period only: 12.646875/1.04 = 12.1605.",
        null,
        "Treated it as a one-period option on the date-1 prices: C<sub>u</sub> = 100 − 80 = 20, so 0.475 × 20/1.04 = 9.1346.",
      ],
    },
    {
      id: "opsjoner-10",
      title: "Backing ρ out of an observed price",
      theory: `<p>ρ does not have to come from the share. On a two-state tree every traded asset is priced with the same weights, so any observed price X<sub>0</sub> with known payoffs X<sub>u</sub> and X<sub>d</sub> reveals ρ. The exam uses this when the share itself is not quoted but something else on the same two states is: an option, a commodity certificate, a bond or the cash flows of a project. Once you have ρ, price any other claim on the tree with it. A put works the same way: its payoff max(K − S, 0) comes in the down state, which carries the weight 1 − ρ.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)X<sub>0</sub> − X<sub>d</sub>]/(X<sub>u</sub> − X<sub>d</sub>)</div>
<div class="where">Grow the price by (1 + r<sub>f</sub>) before you compare it with the payoffs. If the asset also pays a cash flow at date 1, add it to both X<sub>u</sub> and X<sub>d</sub>. If two assets on the same tree imply different ρ, one of them is mispriced.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The share will be worth 120 or 80 in one year and r<sub>f</sub> = 5%. A call with K = 100 trades at 10.00 and pays 20 or 0.</p><p>ρ = (1.05 × 10.00 − 0)/(20 − 0) = 10.50/20 = 0.525.</p><p>A put with K = 110 pays 0 or 30, so P = 0.475 × 30/1.05 = 14.25/1.05 = 13.5714. The share price the options imply is (0.525 × 120 + 0.475 × 80)/1.05 = 101/1.05 = 96.1905.</p></div>`,
      q: `<p>Nobody quotes the share, but everyone agrees that in one year it will be worth 130 or 90. The one-year risk-free rate is 4%. A one-year European call with strike K = 100 trades at 12.50. What is the price of a one-year European put on the same share with strike K = 115?</p>`,
      options: ["14.1667", "10.4167", "14.0224", "13.6218"],
      answer: 3,
      solution: `<p>The call pays C<sub>u</sub> = 30 and C<sub>d</sub> = 0. ρ = (1.04 × 12.50 − 0)/(30 − 0) = 13.00/30 = 0.433333, so 1 − ρ = 0.566667.</p><p>The put pays P<sub>u</sub> = max(115 − 130, 0) = 0 and P<sub>d</sub> = max(115 − 90, 0) = 25.</p><p>P = (0.433333 × 0 + 0.566667 × 25)/1.04 = 14.166667/1.04 = <b>13.6218</b>.</p>`,
      check: `<p>First check: ρ reprices the call, 0.433333 × 30/1.04 = 13.00/1.04 = 12.50 ✓. This is the check that catches a ρ not grown by 1.04. Second check, through parity: the implied share price is (0.433333 × 130 + 0.566667 × 90)/1.04 = 107.333333/1.04 = 103.2051, a call with K = 115 pays 15 or 0 and is worth 0.433333 × 15/1.04 = 6.2500, so P = C − S<sub>0</sub> + PV(K) = 6.2500 − 103.2051 + 110.5769 = 13.6218 ✓. It uses the same ρ, so it catches payoff and state errors, not a wrong ρ.</p>`,
      traps: [
        "Forgot to discount the put: 0.566667 × 25 = 14.1667 is its value in one year.",
        "Gave the put's payoff the up-state weight: 0.433333 × 25/1.04 = 10.4167.",
        "Took ρ straight from the call price without growing it by 1.04: ρ = 12.50/30 = 0.416667, so P = 0.583333 × 25/1.04 = 14.0224.",
        null,
      ],
    },
    {
      id: "opsjoner-11",
      title: "Black-Scholes: which way each input moves the value",
      theory: `<p>Give the binomial tree more and shorter steps and its price converges to the Black-Scholes formula. N(d<sub>1</sub>) is Δ and PV(K)·N(d<sub>2</sub>) is the borrowing, so it is still C = SΔ + B. The formula sheet carries no N(d) tables, so the exam tests the direction of each effect and the reason, not the arithmetic. The key effect: a higher σ raises both a call and a put, because the payoff is floored at zero, so extra dispersion adds upside without adding downside. Four of the inputs can be read off a screen; only σ cannot. Run the formula backwards from a market price and you get the implied volatility: the σ the price is quoting.</p>
<div class="formula"><div class="eq">C = S·N(d<sub>1</sub>) − PV(K)·N(d<sub>2</sub>)</div><div class="eq">d<sub>1</sub> = ln[S/PV(K)]/(σ√T) + σ√T/2 &nbsp;&nbsp; d<sub>2</sub> = d<sub>1</sub> − σ√T</div>
<div class="where">S, K, T, r<sub>f</sub> and σ are the five inputs; σ is the annual volatility of the share's return. PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup> as before: this ladder, like the manual, compounds r<sub>f</sub> annually. Textbooks that write K·e<sup>−r<sub>f</sub>T</sup> use the same formula with a continuous rate. The share's expected return appears nowhere. A dividend before expiry lowers the call and raises the put.</div></div>
<table class="data"><tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>S</td><td>up</td><td>down</td><td>the call buys the share, the put sells it</td></tr>
<tr><td>K</td><td>down</td><td>up</td><td>you pay K on a call and receive it on a put</td></tr>
<tr><td>σ</td><td>up</td><td>up</td><td>the payoff is floored at zero, so more spread is all upside</td></tr>
<tr><td>T</td><td>up</td><td>either (European)</td><td>more spread and a smaller PV(K); for a put the two pull against each other</td></tr>
<tr><td>r<sub>f</sub></td><td>up</td><td>down</td><td>PV(K) falls: paying K later helps the call, receiving K later hurts the put</td></tr></table>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 50, K = 50, r<sub>f</sub> = 4%, T = 1, σ = 30%: C = 6.8582, P = 4.9351. Change one input at a time.</p>
<table class="data"><tr><th>Change</th><th>New C</th><th>New P</th><th>ΔC</th><th>ΔP</th></tr>
<tr><td>σ: 30% to 40%</td><td class="n">8.7719</td><td class="n">6.8488</td><td class="n">+1.9137</td><td class="n">+1.9137</td></tr>
<tr><td>r<sub>f</sub>: 4% to 6%</td><td class="n">7.3162</td><td class="n">4.4860</td><td class="n">+0.4580</td><td class="n">−0.4491</td></tr>
<tr><td>T: 1 to 2 years</td><td class="n">10.1047</td><td class="n">6.3325</td><td class="n">+3.2465</td><td class="n">+1.3974</td></tr></table>
<p>σ is not in S − PV(K), so the call and the put gain exactly the same from it.</p></div>`,
      q: `<p>Hold everything else fixed. Which statement about a European call on a share that pays no dividends is correct?</p>`,
      options: [
        "A higher σ lowers the call, because investors demand a higher return on a riskier share.",
        "A longer time to expiry lowers the call, because its payoff is discounted over more years.",
        "A higher strike K raises the call, because the holder receives K when he exercises.",
        "A higher r<sub>f</sub> raises the call, because the strike is paid at expiry and its PV falls.",
      ],
      answer: 3,
      solution: `<p>The call holder pays K only at expiry. A higher r<sub>f</sub> shrinks PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>, so what he gives up is worth less today and the call is worth more. In replication terms the call is shares bought with borrowed money; a higher rate lowers today's value of the repayment.</p><p>In the example, r<sub>f</sub> from 4% to 6% lifted the call from 6.8582 to <b>7.3162</b>.</p>`,
      check: `<p>Parity confirms the direction: C − P = S − PV(K). A higher r<sub>f</sub> lowers PV(K), so C − P must rise. In the example it rose by 0.4580 + 0.4491 = 0.9071, which is exactly 50/1.04 − 50/1.06 = 48.0769 − 47.1698 = 0.9071 ✓. Each of the other statements fails one row of the table: σ and T raise a call, K lowers it.</p>`,
      traps: [
        "Got the volatility effect backwards. The payoff is floored at zero, so more dispersion adds upside without adding downside: a higher σ raises the call.",
        "Forgot that more time means more dispersion and a smaller PV(K). Both raise a call. The option is not priced by discounting at a risky rate.",
        "Mixed up the call and the put. The call holder pays K at exercise, so a higher K lowers the call and raises the put.",
        null,
      ],
    },
    {
      id: "opsjoner-13",
      title: "Exam level: true volatility below implied (H2025 E1)",
      theory: `<p>H2025 Exercise 1 gave 12 points with no computation: a call trades at a price that implies one σ, a well-informed friend says the true σ is lower. You must say what that does to the call's value and what to do. The marks go to four moves. Name the comparative static: value rises with σ. Give the direction: at the true σ the call is worth less than its price, so it is overpriced. State the action: do not buy it; better, write it and delta-hedge with Δ = N(d<sub>1</sub>) shares, so you bet on volatility and not on the share's direction. Name one limitation: it is not an arbitrage, because your σ may be wrong.</p>
<div class="formula"><div class="eq">true σ &lt; implied σ ⟹ fair value &lt; market price ⟹ do not buy; write the option</div>
<div class="where">The same holds for the put with the same strike, since parity keeps the two mispricings equal. If the true σ is above the implied one, everything flips: the option is cheap, so buy it and hedge.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A model answer for a call (S = K = 50, r<sub>f</sub> = 4%, one year) trades at 8.7719, implying σ = 40%; you believe the truth is 30%.</p><p>Call value rises with σ, because the payoff is floored at zero: more spread adds upside but no downside. At 30% the call is worth less than 8.7719 (6.8582), so it is overpriced. Do not buy it; write it and buy Δ = N(d<sub>1</sub>) ≈ 0.61 shares, so the position bets on volatility, not on the share's direction. This is not an arbitrage: it pays only if the true σ is near 30%.</p></div>`,
      q: `<p>A share trades at 50 and pays no dividends. A one-year European call with strike K = 55 trades at 4.80, which implies a volatility of 30%. The risk-free rate is 4%. You are about to buy the call when an analyst who has covered the firm for years convinces you that the true volatility is 22%. Which answer handles both questions: what the true volatility does to the call's value and what you should do?</p>`,
      options: [
        "Its value is below 4.80, since value rises with σ: with the downside capped, extra spread only adds upside. The call is overpriced, so do not buy it; write it and delta-hedge.",
        "Its value is above 4.80: a less volatile share is less risky, so investors pay more for a claim on it. The call is cheap at 4.80, so buy it before the market corrects.",
        "Its value is below 4.80, so the call is overpriced. Buy the put with the same strike instead: by put-call parity a lower value for the call means a higher value for the put.",
        "Its value is below 4.80, so the call is overpriced. Write it and keep the 4.80 unhedged: since the price exceeds fair value, the gain is a riskless arbitrage profit.",
      ],
      answer: 0,
      solution: `<p>Black-Scholes value rises with σ. The call pays max(S<sub>T</sub> − K, 0): spreading the distribution adds payoff in the right tail and costs nothing in the left, where the payoff is already zero. The 4.80 is the value at σ = 30%, so at the true 22% the call is worth less and is <b>overpriced</b>.</p><p>Do not buy it. Better, write it and buy Δ shares, so the position profits from the mispricing rather than from the share's direction.</p>`,
      check: `<p>The numbers, not needed on the exam, confirm the direction: the Black-Scholes value is 4.7975 at σ = 30% (the quoted 4.80) and 3.2086 at 22%, a gap of 1.5889, about a third of the price. The put with K = 55 is overpriced by the same 1.5889, because σ does not enter S − PV(K). And the trade is not riskless: if the true σ turns out above 22%, the written call loses.</p>`,
      traps: [
        null,
        "Got the volatility effect backwards. Lower σ means less upside for a payoff floored at zero, so the call is worth less, not more.",
        "A lower σ lowers the put too: σ is not in S − PV(K), so the put is overpriced by the same amount as the call.",
        "Not an arbitrage: the profit depends on the analyst being right about σ. An unhedged written call loses without limit if the share rallies.",
      ],
    },
    {
      id: "opsjoner-14",
      title: "Exam level: risk-neutral pricing of the right to wait (H2024 E6)",
      theory: `<p>H2024 Exercise 6 gave 20 points to an investment you can make now or in a year, once the interest rate is known. The right to wait is a call option. The underlying S is the present value of the project's cash flows, not its NPV; the investment cost I is the strike. Find S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>, back ρ out of the underlying with the rate from year 0 to year 1, take max(S − I, 0) in each state, weight with ρ and discount at r<sub>f</sub>. The real probabilities are never needed.</p>
<div class="formula"><div class="eq">S = CF × A(n, r) &nbsp;&nbsp; A(n, r) = [1 − (1 + r)<sup>−n</sup>]/r</div><div class="eq">ρ = [(1 + r<sub>0→1</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; C<sub>0</sub> = [ρ·max(S<sub>u</sub> − I, 0) + (1 − ρ)·max(S<sub>d</sub> − I, 0)]/(1 + r<sub>0→1</sub>)</div><div class="eq">option to wait = C<sub>0</sub> − max(S<sub>0</sub> − I, 0)</div>
<div class="where">S<sub>0</sub> uses today's rate. S<sub>u</sub> and S<sub>d</sub> are values at date 1 at the new rates, with all n payments starting one year after you invest. The low-rate state is the up state, because a lower rate makes the same cash flows worth more. Check that 0 &lt; ρ &lt; 1 before you use it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>CF = 10 a year for 15 years, I = 105. Today's rate is 5%; next year it becomes 4% or 6%.</p><p>S<sub>0</sub> = 10 × 10.379658 = 103.7966, so NPV now = −1.2034. S<sub>u</sub> = 10 × 11.118387 = 111.1839, S<sub>d</sub> = 10 × 9.712249 = 97.1225.</p><p>ρ = (1.05 × 103.7966 − 97.1225)/(111.1839 − 97.1225) = (108.9864 − 97.1225)/14.0614 = 11.8639/14.0614 = 0.8437.</p><p>C<sub>u</sub> = 6.1839, C<sub>d</sub> = max(−7.8775, 0) = 0. C<sub>0</sub> = 0.8437 × 6.1839/1.05 = 5.2174/1.05 = 4.9690. Since NPV now is negative, the option to wait is worth 4.9690: wait.</p></div>`,
      q: `<p>A licence lets you build a solar park for 18.5 (NOK million), paid when you build. The park pays 2.0 a year for 12 years, starting one year after you build. The risk-free rate today is 4.5%. If you wait a year, the rate becomes 3% or 6% for good; the rate from year 0 to year 1 stays 4.5%, the cost is still 18.5 and the park still runs 12 years. An analyst puts the real probability of 3% at 0.5. What is the value today of the option to wait?</p>`,
      options: ["0.6737", "0.9826", "0.5338", "0.6305"],
      answer: 1,
      solution: `<p><b>Underlying.</b> S<sub>0</sub> = 2.0 × A(12, 4.5%) = 2.0 × 9.118581 = 18.2372, so NPV now = 18.2372 − 18.5 = −0.2628. S<sub>u</sub> = 2.0 × A(12, 3%) = 2.0 × 9.954004 = 19.9080. S<sub>d</sub> = 2.0 × A(12, 6%) = 2.0 × 8.383844 = 16.7677.</p><p><b>ρ.</b> (1.045 × 18.2372 − 16.7677)/(19.9080 − 16.7677) = (19.0579 − 16.7677)/3.1403 = 2.2902/3.1403 = 0.7293 (0.729271 unrounded).</p><p><b>Payoffs.</b> C<sub>u</sub> = max(19.9080 − 18.5, 0) = 1.4080. C<sub>d</sub> = max(16.7677 − 18.5, 0) = 0: you would not build.</p><p><b>Value.</b> C<sub>0</sub> = 0.729271 × 1.4080/1.045 = 1.0268/1.045 = 0.9826. Option to wait = 0.9826 − max(−0.2628, 0) = <b>0.9826</b>. Wait: waiting is worth 0.9826 against −0.2628 for building now.</p>`,
      check: `<p>Replication on the same tree: Δ = 1.408008/3.140320 = 0.448364, B = −16.767688 × 0.448364/1.045 = −7.194292, C<sub>0</sub> = 18.237162 × 0.448364 − 7.194292 = 8.176895 − 7.194292 = 0.982603 ✓. It uses the same tree, so it catches arithmetic slips only. A test from the bounds that can fail: the licence must be worth at least S<sub>0</sub> − I/1.045 = 18.237162 − 17.703349 = 0.5338, the value of committing today to build next year in both states. It must be worth at most S<sub>0</sub> = 18.2372. 0.9826 passes both. ρ = 0.7293 also lies between 0 and 1 ✓.</p>`,
      traps: [
        "Paired the analyst's real probability with the risk-free rate: 0.5 × 1.4080/1.045 = 0.7040/1.045 = 0.6737.",
        null,
        "Forgot that you are not forced to build: C<sub>d</sub> = 16.7677 − 18.5 = −1.7323 gives (1.0268 − 0.270729 × 1.7323)/1.045 = 0.5578/1.045 = 0.5338, the value of committing to build next year.",
        "Did not grow S<sub>0</sub> by 1.045 in ρ: (18.2372 − 16.7677)/3.1403 = 1.4695/3.1403 = 0.4679 (0.467938 unrounded), so C<sub>0</sub> = 0.467938 × 1.4080/1.045 = 0.6305.",
      ],
    },
  ],
});
