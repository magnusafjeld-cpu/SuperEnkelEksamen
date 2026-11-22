/* sjanger 101 · d3-paritet · Payoffs and put-call parity */
window.EDU_DATA.sjangre.push({
  id: "d3-paritet",
  num: 101,
  title: "Payoffs and put-call parity",
  summary: "From one payoff and the hedges firms buy to parity, the missing price over six months and the trade that earns a parity gap",
  chapters: [21],
  exam: "4 of 11 papers · 2023 MC9–10, V2024",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>Put-call parity has come in 4 of 11 papers, usually as three prices given and the fourth asked for. It is not on the formula sheet. Kurbatov added two habits in the lectures: the call price is usually given and the put follows from parity; a six-month option means dividing by √(1 + r<sub>f</sub>). This ladder starts from one payoff and the hedges firms buy, builds parity and ends with the twists the exam adds. At the top you can find a missing price over any horizon and say which trade earns the gap when quotes break parity.</p>`,
  steps: [
    {
      id: "d3-paritet-1",
      title: "Payoff and profit: a payoff is never negative",
      theory: `<p>A call is the right to buy one share at the strike K on the expiry date; a put is the right to sell one at K. The holder decides after seeing the share price S<sub>T</sub> and exercises only when it pays, so the payoff can never be negative. Kurbatov calls zero "the natural border". The profit subtracts the premium paid today. The writer gets the mirror image of the holder.</p>
<div class="formula"><div class="eq">Call payoff = max(S<sub>T</sub> − K, 0) &nbsp;&nbsp; Put payoff = max(K − S<sub>T</sub>, 0)</div><div class="eq">Profit = payoff − premium</div>
<div class="where">The exercise decision looks only at S<sub>T</sub> and K, never at the premium: the premium is paid whatever you do. European options are exercised only at expiry.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The holder owns a choice. A choice can only add. In bad states you walk away with zero; in good states you collect. That one-sided payoff is why an option costs money today.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A call with K = 40 costs 3.</p><p>S<sub>T</sub> = 48: payoff 8, profit 8 − 3 = 5. S<sub>T</sub> = 41: payoff 1, profit 1 − 3 = −2. You still exercise: 1 beats 0 and the 3 is gone either way. S<sub>T</sub> = 35: payoff max(35 − 40, 0) = 0, profit −3, the whole premium.</p></div>`,
      q: `<p>You bought a one-year European call with strike K = 250 for a premium of 18. At expiry the share trades at 262. What is your profit?</p>`,
      options: ["−6.00", "12.00", "−18.00", "6.00"],
      answer: 0,
      solution: `<p>Payoff = max(262 − 250, 0) = 12. You exercise: buying at 250 a share worth 262 gives 12, better than 0.</p><p>Profit = 12 − 18 = <b>−6.00</b>.</p>`,
      check: `<p>The break-even is K + premium = 250 + 18 = 268. The share ended below it, so the profit must be negative; it ended above K, so the loss must be smaller than the premium: −18 &lt; −6 &lt; 0 ✓. The writer earns 18 − 12 = +6.00. Holder plus writer sum to zero, as they must for a contract between two parties ✓</p>`,
      traps: [
        null,
        "Gave the payoff instead of the profit: max(262 − 250, 0) = 12.00, forgetting the 18 you paid.",
        "Let the call expire because the share ended below the break-even of 268: profit −18.00. Exercising still recovers 12 of the 18; the premium is sunk.",
        "Took the writer's side: the writer keeps 18 and pays 12, a profit of 6.00. You hold the call.",
      ],
    },
    {
      id: "d3-paritet-2",
      title: "Hedging with options: the payoff of a combination",
      theory: `<p>The payoff of a portfolio is the sum of the payoffs of its parts, state by state. Firms use this to hedge. An oil producer sells oil, so a low price hurts: it buys puts, which pay exactly when the price is low. An airline buys fuel, so a high price hurts: it buys calls. A share plus a put on it is the protective put, an insured share. A share plus a call is no hedge; in Kurbatov's words "you are doubling down, then just buy two stocks".</p>
<div class="formula"><div class="eq">Share + put: S<sub>T</sub> + max(K − S<sub>T</sub>, 0) = max(S<sub>T</sub>, K)</div><div class="eq">Fuel bill − call: S<sub>T</sub> − max(S<sub>T</sub> − K, 0) = min(S<sub>T</sub>, K)</div>
<div class="where">The put sets a floor at K, the call a cap at K. Then subtract the premium from what you receive, or add it to what you pay. Ignore interest on the premium unless the question mentions it.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A hedge pays when the business loses. The producer is long oil, so it buys the right to sell; the airline is short fuel, so it buys the right to buy. Either way the firm keeps the good outcomes and pays a premium to remove the bad ones.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An airline buys one-year calls on jet fuel with K = 80 for a premium of 5 per barrel.</p><p>Fuel at 95: the call pays 15, so the net cost is 95 − 15 + 5 = 85. Fuel at 70: the call expires and the net cost is 70 + 5 = 75. The cost can never exceed K + premium = 85.</p></div>`,
      q: `<p>An oil producer will sell its oil in one year at the market price. To protect itself it buys one-year European puts on oil with strike K = 72 per barrel, at a premium of 3.50 per barrel. In one year oil trades at 61. What does the producer get per barrel: the oil sale plus the put's payoff, minus the premium (ignore interest)?</p>`,
      options: ["57.50", "72.00", "46.50", "68.50"],
      answer: 3,
      solution: `<p>Oil sale: 61. Put payoff: max(72 − 61, 0) = 11.</p><p>Per barrel: 61 + 11 − 3.50 = <b>68.50</b>.</p>`,
      check: `<p>Oil plus put pays max(S<sub>T</sub>, K), so at any oil price below 72 the producer gets K − premium = 72 − 3.50 = 68.50, the floor ✓. Above 72 it keeps the upside: at 90 it gets 90 − 3.50 = 86.50. Nothing can land below the floor, which rules out 57.50 and 46.50.</p>`,
      traps: [
        "Used the airline's hedge, a call: it pays max(61 − 72, 0) = 0 when oil falls, so 61 + 0 − 3.50 = 57.50.",
        "Forgot the premium: 61 + 11 = 72.00.",
        "Wrote the put's payoff as S<sub>T</sub> − K = −11, a negative payoff no holder accepts: 61 − 11 − 3.50 = 46.50.",
        null,
      ],
    },
    {
      id: "d3-paritet-3",
      title: "Put-call parity: why it must hold",
      theory: `<p>Compare two portfolios. The protective put, a share plus a put with strike K, pays max(S<sub>T</sub>, K). The fiduciary call, a call with strike K plus a risk-free bond that pays K at expiry, pays max(S<sub>T</sub> − K, 0) + K = max(S<sub>T</sub>, K) too. Two portfolios that pay the same in every state must cost the same today, or you buy the cheap one, sell the dear one and keep the gap. That is put-call parity. It is not on the formula sheet.</p>
<div class="formula"><div class="eq">C + PV(K) = P + S &nbsp;&nbsp; PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup></div>
<div class="where">It holds for European options with the same strike, the same expiry and the same share, with no dividends before expiry. It needs no model and no probabilities: no volatility, no expected return, no view on where the share goes.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Both portfolios build a floor at K with all the upside above it. One builds the floor with a put, the other with a bond. Same thing in two wrappings, so one price.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 50. Payoffs at expiry:</p>
<table class="data"><tr><th>S<sub>T</sub></th><th>Share + put</th><th>Call + bond paying 50</th></tr>
<tr><td class="n">35</td><td class="n">35 + 15 = 50</td><td class="n">0 + 50 = 50</td></tr>
<tr><td class="n">50</td><td class="n">50 + 0 = 50</td><td class="n">0 + 50 = 50</td></tr>
<tr><td class="n">65</td><td class="n">65 + 0 = 65</td><td class="n">15 + 50 = 65</td></tr></table>
<p>Equal in every row, so S + P = C + PV(50).</p></div>`,
      q: `<p>A share trades at 30 and pays no dividends. One-year European calls and puts on it both have strike K = 30. Which statement explains why C + PV(K) = P + S must hold?</p>`,
      options: [
        "The call and the put are equally likely to end in the money, so their prices must balance.",
        "Both portfolios earn the share's expected return, so investors must pay the same for them.",
        "A share plus a put and a call plus a bond paying K pay the same in every state at expiry.",
        "The put insures the share, so a share plus a put must cost exactly what the share costs.",
      ],
      answer: 2,
      solution: `<p>At expiry the share plus the put is worth max(S<sub>T</sub>, 30). So is the call plus a bond that pays 30. They pay the same in every state, so they must cost the same today: <b>C + PV(K) = P + S</b>. If one side were cheaper, buying it and selling the other would give a riskless profit today with nothing to pay later.</p><p>Probabilities and expected returns never enter this argument. An insured share also cannot cost the same as the bare share.</p>`,
      check: `<p>Test each claim against the formula. Parity contains no probability and no expected return, so it holds whether the share is likely to rise or not; neither can be the reason. The insured share costs S + P, more than S, because the put has a price. Only the state-by-state argument survives. The table in the example shows it row by row ✓</p>`,
      traps: [
        "Probabilities never enter parity. It holds whether the call is likely to pay or not, because the two portfolios match in every state.",
        "Parity uses no expected return. Two portfolios with identical payoffs must cost the same whatever anyone expects to earn on them.",
        null,
        "The insured share costs S + P, not S: the put has a price. Parity compares it with the call plus a bond, not with the bare share.",
      ],
    },
    {
      id: "d3-paritet-4",
      title: "The usual exam use: the call is given, find the put",
      theory: `<p>Kurbatov: the call price is usually given. The put then follows from parity. Rearrange, then write the formula, PV(K) and the number on separate lines; that order earns the marks. Quote four decimals.</p>
<div class="formula"><div class="eq">P = C − S + PV(K) &nbsp;&nbsp; C = P + S − PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. A sign test: C − P = S − PV(K), so the call is dearer than the put exactly when the share trades above the discounted strike.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A call minus a put with the same strike pays S<sub>T</sub> − K in every state: a share you pay K for at expiry. Its price is therefore S − PV(K). Once you know the call, the put is what is left.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 60, K = 55, r<sub>f</sub> = 5%, one year, C = 9.00.</p><p>PV(K) = 55/1.05 = 52.3810. P = 9.00 − 60 + 52.3810 = 1.3810.</p></div>`,
      q: `<p>A share trades at S = 145 and pays no dividends. A one-year European call with strike K = 150 costs 11.20. The one-year risk-free rate is 4%. What is the price of the one-year European put with the same strike?</p>`,
      options: ["16.2000", "10.4308", "11.9692", "5.0000"],
      answer: 1,
      solution: `<p>PV(K) = 150/1.04 = 144.2308.</p><p>P = C − S + PV(K) = 11.20 − 145 + 144.2308 = <b>10.4308</b>.</p>`,
      check: `<p>The share trades above the discounted strike, S − PV(K) = 145 − 144.2308 = +0.7692, so the call must be the dearer option by exactly that much: 11.20 − 10.4308 = 0.7692 ✓. This test fails for each wrong answer: the swapped signs give C − P = −0.7692, the undiscounted strike −5.0000 and the intrinsic value +6.2000. The bounds hold too: 0 ≤ 10.4308 ≤ PV(K) = 144.2308.</p>`,
      traps: [
        "Used K instead of PV(K): 11.20 − 145 + 150 = 16.2000.",
        null,
        "Swapped the signs of S and PV(K): 11.20 + 145 − 144.2308 = 11.9692. That makes the put dearer than the call although the share trades above PV(K).",
        "Gave the put's intrinsic value K − S = 150 − 145 = 5.0000 as its price. The price also carries time value. Parity gives it exactly.",
      ],
    },
    {
      id: "d3-paritet-5",
      title: "Six months: discount with the square root",
      theory: `<p>Rates are quoted per year; options often run for less. PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup> with T in years, so six months means the power 0.5: the square root. Kurbatov's slide 17 has a six-month tree with a one-year rate of 1.5% and divides by √1.015 = 1.007472: "we have to take the square root because we are looking at six months". Dividing the annual rate by two (1.015) is a close approximation Kurbatov's keys accept, but not the exact answer when the rate is compounded annually. Using the full year is an error.</p>
<div class="formula"><div class="eq">six months: PV(K) = K/√(1 + r<sub>f</sub>) &nbsp;&nbsp; three months: PV(K) = K/(1 + r<sub>f</sub>)<sup>0.25</sup></div>
<div class="where">r<sub>f</sub> is the annual rate, compounded annually. For 90 days use the power 90/365. The same period rate goes into ρ when the tree covers six months.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>PV(K) is what you must deposit today to hold K at expiry. Over six months the deposit grows for half a year only. Half a year at 3% a year is √1.03, not 1.03 and not 1.015.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The annual rate is 6%, six months to expiry, K = 80, S = 78 and the six-month call costs 5.30.</p><p>√1.06 = 1.029563, a six-month rate of 2.9563%. PV(K) = 80/1.029563 = 77.7029. P = 5.30 − 78 + 77.7029 = 5.0029. For three months the factor would be 1.06<sup>0.25</sup> = 1.014674.</p></div>`,
      q: `<p>A share trades at S = 72 and pays no dividends. A six-month European call with strike K = 75 costs 4.15. The risk-free rate is 3% a year, compounded annually. What is the price of the six-month European put with the same strike? Use four decimals.</p>`,
      options: ["4.9655", "7.1500", "6.0497", "6.0416"],
      answer: 2,
      solution: `<p>Six-month factor: √1.03 = 1.014889. PV(K) = 75/1.014889 = 73.8997.</p><p>P = C − S + PV(K) = 4.15 − 72 + 73.8997 = <b>6.0497</b>.</p>`,
      check: `<p>Grow PV(K) for six months: 73.8997 × 1.014889 = 75.0000 ✓, the strike. The put clears its floor PV(K) − S = 73.8997 − 72 = 1.8997 and stays below PV(K) ✓. The share is below PV(K), so the put must cost more than the call: 6.0497 &gt; 4.15 ✓</p>`,
      traps: [
        "Discounted the strike with the full annual rate: 75/1.03 = 72.8155, so P = 4.15 − 72 + 72.8155 = 4.9655. The option runs six months, not a year.",
        "Used K instead of PV(K): 4.15 − 72 + 75 = 7.1500.",
        null,
        "Divided the annual rate by two: 75/1.015 = 73.8916, so P = 6.0416. A close approximation the keys accept on paper, but the question says compounded annually: six months is √1.03 = 1.014889.",
      ],
    },
    {
      id: "d3-paritet-6",
      title: "Exam level: which trade earns the parity gap",
      theory: `<p>If quoted prices break parity, the two portfolios that pay max(S<sub>T</sub>, K) cost different amounts. Buy the cheap one and sell the dear one: the payoffs cancel in every state, so you keep the price gap today and owe nothing later. Selling the fiduciary call means writing the call and borrowing PV(K); selling the protective put means shorting the share and writing the put. Work out PV(K) for the option's own horizon first, because a wrong period can flip which side looks cheap.</p>
<div class="formula"><div class="eq">Gap = [C + PV(K)] − [P + S]</div><div class="eq">Gap &gt; 0: buy the share and the put, write the call, borrow PV(K)</div><div class="eq">Gap &lt; 0: buy the call, lend PV(K), short the share, write the put</div>
<div class="where">The profit today equals the size of the gap. If your trade shows a loss today, you bought the dear side.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Two packages with the same contents and different price tags: buy the cheap one and sell the dear one. You never take a view on the share, because whatever it does, what you hold pays exactly what you owe.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>One year, S = 50, K = 52, r<sub>f</sub> = 4%, C = 4.00, P = 4.50.</p><p>PV(K) = 52/1.04 = 50.00. C + PV(K) = 54.00 and P + S = 54.50, so the protective put is dear. Buy the call and lend 50.00, short the share and write the put. Today: −4.00 − 50.00 + 50.00 + 4.50 = +0.50, the gap.</p></div>`,
      q: `<p>A share trades at 96 and pays no dividends. Six-month European options with strike K = 100 trade at C = 6.10 for the call and P = 7.40 for the put. The risk-free rate is 4% a year, compounded annually. Which trade locks in a riskless profit today?</p>`,
      options: [
        "Buy the call, short the share, write the put and lend the present value of the strike.",
        "Buy the share and the put, write the call and borrow the present value of the strike.",
        "Buy the put on its own: at 7.40 it is cheap, so holding it earns the gap without risk.",
        "No trade: the put should cost more than the call when the share trades below the strike.",
      ],
      answer: 1,
      solution: `<p>Six months: PV(K) = 100/√1.04 = 100/1.019804 = 98.0581.</p><p>Fiduciary call: C + PV(K) = 6.10 + 98.0581 = 104.1581. Protective put: P + S = 7.40 + 96 = 103.4000. Both pay max(S<sub>T</sub>, 100) in six months, so the protective put is the cheap side.</p><p><b>Buy the share and the put, write the call and borrow 98.0581.</b> Today: −96 − 7.40 + 6.10 + 98.0581 = +0.7581. In six months you repay 100. If S<sub>T</sub> = 120: 120 + 0 − 20 − 100 = 0. If S<sub>T</sub> = 80: 80 + 20 − 0 − 100 = 0.</p>`,
      check: `<p>The profit today equals the parity gap: 104.1581 − 103.4000 = 0.7581 ✓. The period matters here: with 1.04 for six months, PV(K) = 96.1538 and C + PV(K) = 102.2538 drops below P + S = 103.40, so you would trade the other way and lose 0.7581 today.</p>`,
      traps: [
        "Discounted the strike with the full annual 4%: PV(K) = 96.1538 makes C + PV(K) = 102.2538 look cheaper than P + S = 103.40, so the trade runs backwards. With √1.04 it costs 0.7581 today.",
        null,
        "A put alone is not riskless: if the share ends above 100 it expires worthless and you lose 7.40. The gap is riskless only when the payoffs cancel.",
        "The sign is right, the size is not: parity requires P − C = PV(K) − S = 2.0581 and the quotes give only 1.30. The put is too cheap.",
      ],
    },
  ],
});
