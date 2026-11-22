/* sjanger 104 · d3-bs · Black-Scholes intuition and implied volatility */
window.EDU_DATA.sjangre.push({
  id: "d3-bs",
  num: 104,
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  title: "Black-Scholes intuition and implied volatility",
  summary: "Which way each input moves a call and a put, why volatility helps the holder and what to do when your σ differs from the implied one",
  chapters: [23, 25],
  exam: "H2025 E1 (12 points, verbal) · σ intuition after a real-options calculation",
  intro: `<p>Kurbatov has said the Black-Scholes calculation will not be on the exam, but the intuition can be. H2025 Exercise 1 opened the paper with 12 verbal points: the market price implies one volatility, a friend says the true one is lower; what happens to the value and what should you do? This short ladder gives you the direction of every input and the reason behind it, the σ = 0 edge case, implied volatility and the same logic in a real option. Only European options are priced. At the top you can write the H2025 answer in four to six sentences.</p>`,
  steps: [
    {
      id: "d3-bs-1",
      title: "Why volatility raises an option's value",
      theory: `<p>An option holder can always walk away, so the payoff is never below zero: a call pays max(S<sub>T</sub> − K, 0) and a put max(K − S<sub>T</sub>, 0). Spread the possible share prices out while their average stays the same. The good tail gets better and the option collects it. The bad tail gets worse, but the payoff there is already zero and cannot fall further. So a higher volatility σ raises both a call and a put, while the share itself is worth the same.</p>
<div class="formula"><div class="eq">higher σ ⟹ higher C and higher P</div>
<div class="where">σ is the annual volatility of the share's return. Only the spread changes, not the expected price. σ does not enter put-call parity, C − P = S − PV(K), so the call and the put gain the same amount.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Everywhere else in finance risk is a cost. For an option holder it is a benefit, because the floor at zero cuts off the bad outcomes and keeps the good ones. The writer of the option is the one who pays for it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 50. The share will be worth 40 or 60 at expiry, equally likely: the call pays 0 or 10, an expected 5. Widen that to 20 or 80, still averaging 50: the call pays 0 or 30, an expected 15.</p><p>The put goes from 0.5 × 10 = 5 to 0.5 × 30 = 15 as well. The share's expected price stayed at 50.</p></div>`,
      q: `<p>A share will be worth 85 or 115 at expiry, each with probability 0.5. News widens that to 70 or 130, still equally likely, so the expected price stays at 100. A call on the share has strike K = 105. Ignore discounting. By how much does the call's expected payoff at expiry rise?</p>`,
      options: ["0.00", "7.50", "12.50", "15.00"],
      answer: 1,
      solution: `<p>Before: the call pays max(115 − 105, 0) = 10 or max(85 − 105, 0) = 0, so 0.5 × 10 = 5.00.</p><p>After: it pays max(130 − 105, 0) = 25 or 0, so 0.5 × 25 = 12.50.</p><p>Rise = 12.50 − 5.00 = <b>7.50</b>, while the expected share price is unchanged at 100.</p>`,
      check: `<p>The put with the same strike must rise by the same amount: before 0.5 × (105 − 85) = 10.00, after 0.5 × (105 − 70) = 17.50, a rise of 7.50 ✓ The gap between the two expected payoffs stays at 5.00 − 10.00 = 12.50 − 17.50 = −5.00, the expected price minus the strike, because the spread is not in it.</p>`,
      traps: [
        "Applied the share's logic to the option. The expected share price is unchanged, but the floor at zero keeps the better top outcome and ignores the worse bottom one.",
        null,
        "Gave the new expected payoff, 0.5 × 25 = 12.50, not the change from 5.00.",
        "Left out the probabilities: 25 − 10 = 15.00 compares the top payoffs as if the top state were certain.",
      ],
    },
    {
      id: "d3-bs-2",
      title: "Which way each input moves a call and a put",
      theory: `<p>Black-Scholes prices a European option from five inputs: S, K, T, r<sub>f</sub> and σ. A dividend paid before expiry is a sixth. The exam asks for the direction and the reason, not the formula. Two facts give almost every row. The call holder pays K at expiry and the put holder receives it, so anything that lowers PV(K) helps the call and hurts the put. And the option holder gets none of a dividend, while the share drops by it on the ex-dividend date.</p>
<table class="data"><tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>S</td><td>up</td><td>down</td><td>the call buys the share, the put sells it</td></tr>
<tr><td>K</td><td>down</td><td>up</td><td>the call pays K, the put receives it</td></tr>
<tr><td>σ</td><td>up</td><td>up</td><td>the payoff is floored at zero</td></tr>
<tr><td>T</td><td>up</td><td>either</td><td>more spread helps both; a later K helps the call and hurts the put</td></tr>
<tr><td>r<sub>f</sub></td><td>up</td><td>down</td><td>PV(K) falls</td></tr>
<tr><td>dividend</td><td>down</td><td>up</td><td>the share drops and the holder gets none of the cash</td></tr></table>
<div class="formula"><div class="eq">C − P = S − PV(Div) − PV(K)</div>
<div class="where">Put-call parity with a dividend before expiry. It checks the direction of every row: whatever raises the right-hand side raises C − P.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Ask two questions about any news. Does it change the share the holder ends up with? Does it change what K is worth today? A lower rate makes the fixed K weigh more today, which the call holder pays and the put holder collects.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 100, K = 100, r<sub>f</sub> = 5%, T = 1, σ = 25%: C = 12.2751 and P = 7.5132. Change one input at a time.</p>
<table class="data"><tr><th>Change</th><th>ΔC</th><th>ΔP</th></tr>
<tr><td>S: 100 to 110</td><td class="n">+6.9523</td><td class="n">−3.0477</td></tr>
<tr><td>K: 100 to 110</td><td class="n">−4.2967</td><td class="n">+5.2271</td></tr>
<tr><td>σ: 25% to 35%</td><td class="n">+3.7973</td><td class="n">+3.7973</td></tr>
<tr><td>T: 1 to 2 years</td><td class="n">+6.2534</td><td class="n">+1.7183</td></tr>
<tr><td>r<sub>f</sub>: 5% to 7%</td><td class="n">+0.9665</td><td class="n">−0.8137</td></tr>
<tr><td>dividend of 4 in six months</td><td class="n">−2.3232</td><td class="n">+1.5804</td></tr></table></div>`,
      q: `<p>A share trades at 80 and will pay a dividend of 3 in six months. European calls and puts on it have strike 80 and one year to expiry. The risk-free rate is 5%. Two pieces of news arrive; treat each one separately. (i) The risk-free rate falls to 3%. (ii) The firm cancels the dividend. Which line gives the right direction for both options in both cases?</p>`,
      options: [
        "(i) call falls, put rises · (ii) call rises, put falls",
        "(i) call rises, put rises · (ii) call rises, put falls",
        "(i) call falls, put rises · (ii) no change to either",
        "(i) call rises, put falls · (ii) call falls, put rises",
      ],
      answer: 0,
      solution: `<p>(i) A lower r<sub>f</sub> raises PV(K): 80/1.03 instead of 80/1.05. The call holder pays K at expiry, so the call is worth less; the put holder receives K, so the put is worth more: <b>call falls, put rises</b>.</p><p>(ii) Without the dividend the share no longer drops by 3 before expiry. The call is written on a dearer share and rises; the put falls: <b>call rises, put falls</b>.</p>`,
      check: `<p>Parity gives the direction of the gap C − P = S − PV(Div) − PV(K). (i) It falls from 80 − 2.9277 − 76.1905 = 0.8818 to 80 − 2.9560 − 77.6699 = −0.6259 ✓ (ii) Without PV(Div) it rises to 80 − 76.1905 = 3.8095 ✓ The Black-Scholes values at σ = 30% agree: in (i) the call goes from 9.5848 to 8.9141 and the put from 8.7029 to 9.5400; in (ii) they go to 11.3384 and 7.5289.</p>`,
      traps: [
        null,
        "A lower rate does not lift every payoff. The call holder pays K at expiry, so a lower rate makes that payment weigh more today: the call falls.",
        "The shareholders are indifferent to the dividend, but the option holders get none of the cash. Without the dividend the share stays higher, so the call rises and the put falls.",
        "Mixed up who pays and who receives. The call holder pays K and loses when the share drops; the put holder receives K and gains when it drops.",
      ],
    },
    {
      id: "d3-bs-3",
      title: "The edge case σ → 0: the option falls to its floor",
      theory: `<p>To reason about an intuition question, test the extreme. Set σ = 0. The share is then riskless, so it must grow at r<sub>f</sub>: S<sub>T</sub> = S(1 + r<sub>f</sub>)<sup>T</sup> for sure. You know today whether the call will be exercised, so it is a sure payoff discounted at r<sub>f</sub>. That makes the call worth S − PV(K) when that is positive and zero otherwise.</p>
<div class="formula"><div class="eq">σ = 0: &nbsp; C = max(S − PV(K), 0) &nbsp;&nbsp; P = max(PV(K) − S, 0)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. This is the lower bound for any σ: every bit of volatility adds value on top of it. Compare S with PV(K), not with K.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>With no uncertainty there is nothing to walk away from, so the right to walk away is worth nothing. What is left is a sure purchase of the share for K at expiry, worth S − PV(K) today. Everything an option is worth above that floor is volatility value.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S = 50, K = 52, r<sub>f</sub> = 5%, T = 1, σ = 0. S − K = −2 looks out of the money. But the share grows to 50 × 1.05 = 52.50 for sure, so you exercise and earn 0.50, worth 0.50/1.05 = 0.4762 today.</p><p>Directly: PV(K) = 52/1.05 = 49.5238 and C = 50 − 49.5238 = 0.4762. At σ = 10% the call is worth 2.2316 and at 20% 4.2064: the floor plus volatility value.</p></div>`,
      q: `<p>A share trades at 64 and pays no dividends. A European call on it has strike 66 and two years to expiry. The risk-free rate is 5% a year. What is the call worth if the share's volatility is zero?</p>`,
      options: ["0.0000", "1.1429", "4.1361", "4.5600"],
      answer: 2,
      solution: `<p>PV(K) = 66/1.05<sup>2</sup> = 66/1.1025 = 59.8639.</p><p>C = max(64 − 59.8639, 0) = <b>4.1361</b>.</p><p>The same as a sure payoff: the share grows to 64 × 1.1025 = 70.56, the call pays 70.56 − 66 = 4.56 and 4.56/1.1025 = 4.1361.</p>`,
      check: `<p>The put at σ = 0 is max(59.8639 − 64, 0) = 0. Parity holds: C − P = 4.1361 = 64 − 59.8639 ✓ It is a floor, so any σ above zero must give more. Black-Scholes gives 4.5405 at σ = 5% and 7.5557 at 15% ✓</p>`,
      traps: [
        "Compared S with K instead of PV(K). 64 − 66 is negative, but the share grows to 70.56 for sure and the call is exercised.",
        "Discounted the strike over one year instead of two: 64 − 66/1.05 = 1.1429.",
        null,
        "Found the sure payoff at expiry, 64 × 1.1025 − 66 = 4.5600. It arrives in two years and must be discounted back.",
      ],
    },
    {
      id: "d3-bs-4",
      title: "Implied volatility: the σ a price is quoting",
      theory: `<p>Four of the five inputs, S, K, T and r<sub>f</sub>, can be read off a screen. Only σ has to be estimated. So traders run the model backwards: the implied volatility is the σ that makes the model price equal the market price. Since value rises with σ, each price matches exactly one σ. Quoting the implied volatility is just another way of quoting the price. Your own σ, from history or from knowing the firm, gives your fair value. If it differs from the implied one, the option is mispriced in your view.</p>
<div class="formula"><div class="eq">σ<sub>implied</sub> solves: model price(σ) = market price</div>
<div class="eq">your σ &gt; σ<sub>implied</sub> ⟹ underpriced: buy &nbsp;·&nbsp; your σ &lt; σ<sub>implied</sub> ⟹ overpriced: write</div>
<div class="where">The rule is the same for calls and puts, since both rise with σ. On the exam you are given the implied σ or a table; you never invert the formula yourself.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Everyone sees the same S, K, T and r<sub>f</sub>, so σ is the one number traders disagree on. Implied volatility works like ρ: take a market price and read off the number that makes the model fit it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A one-year call with S = K = 100 and r<sub>f</sub> = 4% is worth 9.8847 at σ = 20%, 11.7986 at 25%, 13.7164 at 30% and 15.6325 at 35%. It trades at 13.7164, so the implied volatility is 30%.</p><p>You believe 20%. To you the call is worth 9.8847, so it is overpriced by 13.7164 − 9.8847 = 3.8317.</p></div>`,
      q: `<p>A share trades at 40 and pays no dividends. A one-year European put on it with strike 42 trades at 4.1934. The risk-free rate is 4%. The Black-Scholes value of the put at different volatilities is:</p>
<table class="data"><tr><th>σ</th><td>20%</td><td>25%</td><td>30%</td><td>35%</td><td>40%</td></tr>
<tr><th>Put</th><td class="n">3.3975</td><td class="n">4.1934</td><td class="n">4.9871</td><td class="n">5.7779</td><td class="n">6.5654</td></tr></table>
<p>Your own estimate of the share's volatility is 35%. Which line is right?</p>`,
      options: [
        "Implied σ 35%; overpriced by 1.5845, so write it",
        "Implied σ 25%; fairly priced, since its price holds the true σ",
        "Implied σ 25%; overpriced by 1.5845, so write it",
        "Implied σ 25%; underpriced by 1.5845, so buy it",
      ],
      answer: 3,
      solution: `<p>The market price 4.1934 sits in the 25% column, so the implied volatility is 25%.</p><p>At your 35% the put is worth 5.7779. In your view it is mispriced by 5.7779 − 4.1934 = 1.5845. A put rises with σ like a call, so the market price is too low: <b>underpriced by 1.5845, so buy it</b>.</p>`,
      check: `<p>Parity ties the call with strike 42 to the same verdict. C − P = S − PV(K) = 40 − 42/1.04 = −0.3846 at any σ, so the call is worth 3.8088 at 25% and 5.3933 at 35%: underpriced by the same 1.5845 ✓ When parity holds in the market, a call and a put with the same strike and expiry quote the same implied volatility.</p>`,
      traps: [
        "Swapped the two volatilities. The market price is the 25% value, so 25% is implied; 35% is your own view. At 35% the put is worth more than its price.",
        "The market price holds the market's σ, not necessarily the true one. When your estimate differs, the option is mispriced in your view; that is what implied volatility is used for.",
        "Got the volatility effect backwards for the put. A put is floored at zero too, so it rises with σ: at 35% it is worth more than the 25% price.",
        null,
      ],
    },
    {
      id: "d3-bs-5",
      title: "Real options: what if σ is very low?",
      theory: `<p>The option to wait is a call. The underlying S is the project you would get by investing later, valued today; the strike K is the investment cost. Waiting costs you the cash flow you give up meanwhile, which acts like a dividend and lowers S. After a real-options calculation, Kurbatov may ask for the intuition: what if σ is very, very low? Reason with σ = 0. The future is then known and waiting has no upside to capture. The right to wait falls to its floor, S − PV(K). Compare that with the NPV of investing now.</p>
<div class="formula"><div class="eq">σ = 0: &nbsp; value of waiting = max(S − PV(K), 0)</div>
<div class="eq">S = PV(project) − PV(cash flow lost by waiting) &nbsp;·&nbsp; PV(K) = K/(1 + r<sub>f</sub>)</div>
<div class="where">The cost is a fixed amount paid later, so it is discounted at r<sub>f</sub>, as in lecture 11. Invest now if the NPV now beats the value of waiting.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Waiting pays when it lets you skip the bad outcomes. With low σ there are none to skip, so you would take the same decision in a year as today: you only lose the first cash flow and gain a year's interest on K. With high σ waiting keeps the upside and drops the downside.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 11, the restaurant)</span><p>Cost K = 5 million, cash flow 0.6 million a year from year 1 growing at 2%, cost of capital 12%, r<sub>f</sub> = 5%. Now: 0.6/(0.12 − 0.02) = 6, so NPV = 1.</p><p>Waiting gives up the first 0.6: S = 6 − 0.6/1.12 = 5.4643 and PV(K) = 5/1.05 = 4.7619. At σ = 0 waiting is worth 5.4643 − 4.7619 = 0.7024, less than 1: open now. Waiting a year gains you nothing.</p></div>`,
      q: `<p>You can invest 10 million in a project now or in one year. It pays 1.2 million a year from year 1, growing at 2% a year for ever. The cost of capital is 12% and the risk-free rate 5%. Investing in a year means losing the first 1.2 million. Comparable firms suggest the volatility of the project's value is close to zero. Using σ = 0, what is the right to wait worth (in millions) and what do you do?</p>`,
      options: ["2.4762, wait", "1.4048, invest now", "1.4048, wait", "0.9286, invest now"],
      answer: 1,
      solution: `<p>NPV now: 1.2/(0.12 − 0.02) − 10 = 12 − 10 = 2.0000.</p><p>S = 12 − 1.2/1.12 = 12 − 1.0714 = 10.9286 and PV(K) = 10/1.05 = 9.5238.</p><p>Value of waiting at σ = 0: 10.9286 − 9.5238 = <b>1.4048</b>, below the 2.0000 from investing now, so <b>invest now</b>.</p>`,
      check: `<p>The gap 2.0000 − 1.4048 = 0.5952 is the trade waiting offers when nothing is uncertain: you lose the first cash flow (worth 1.0714) and save a year's interest on the cost (10 − 9.5238 = 0.4762). 1.0714 − 0.4762 = 0.5952 ✓ With volatility the answer can flip: the Black-Scholes value of waiting, not needed on the exam, passes 2.0000 at a σ of about 29%.</p>`,
      traps: [
        "Forgot that waiting gives up the first cash flow: 12 − 9.5238 = 2.4762. The lost 1.2 million acts like a dividend and must come out of S.",
        null,
        "Compared the value of waiting with zero instead of with investing now. 1.4048 is positive, but below the 2.0000 NPV of investing today.",
        "Did not discount the cost: 10.9286 − 10 = 0.9286. The cost is paid in a year, so today it is worth 10/1.05. The decision is right, the number is not.",
      ],
    },
    {
      id: "d3-bs-6",
      title: "Exam level: true volatility below implied (H2025 E1)",
      theory: `<p>H2025 Exercise 1 gave 12 points with no computation: an option's price implies one σ, a well-informed friend says the true σ is lower. What does that do to the value and what should you do? The marks go to four moves, in this order. The comparative static: value rises with σ because the payoff is floored at zero. The direction: at the true σ the option is worth less than its price, so it is overpriced. The action: do not buy it; better, write it and delta-hedge, so you bet on volatility and not on the share's direction. The limit: it is not an arbitrage, since your σ may be wrong. Answer both questions; four to six sentences is enough.</p>
<div class="formula"><div class="eq">true σ &lt; implied σ ⟹ value &lt; price ⟹ overpriced: do not buy, write and hedge</div>
<div class="where">It holds for the call and the put with the same strike alike: σ is not in parity, so both are overpriced by the same amount. If your σ is above the implied one, everything flips.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The price already pays for the volatility the market expects. If the share will move less, a buyer pays for spread that will not come. The writer keeps the difference.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: a model answer</span><p>The setting: a one-year call (S = 60, K = 62, r<sub>f</sub> = 4%) trades at 10.84, implying σ = 45%; a friend says the truth is 30%.</p><p>Option value rises with σ, because the payoff is floored at zero: more spread adds upside but no downside. At 30% the call is worth less than 10.84 (7.33), so it is overpriced. Do not buy it; write it and buy about 0.57 shares per call, so the position bets on volatility, not on direction. This is not an arbitrage: it pays only if the true σ is near 30%.</p></div>`,
      q: `<p>You own shares in a firm that trade at 120 and plan to protect them with a one-year European put with strike 115, priced at 12.70. The risk-free rate is 3% and the price implies a volatility of 36%. An analyst who has followed the firm for years convinces you that the true volatility is 24%. What does the true volatility do to the put's value and what should you do about the put?</p>`,
      options: [
        "Its value is below 12.70, since value rises with σ: the payoff is floored at zero. The put is overpriced, so do not buy it; write it and delta-hedge.",
        "Its value is above 12.70: a less volatile share is safer, so the insurance a put gives is worth more. The put is cheap, so buy it before the market catches up.",
        "Its value is below 12.70, so the put is overpriced. By put-call parity the call with the same strike must then be underpriced, so buy the call instead.",
        "Its value is below 12.70, so the put is overpriced. Write it and keep the premium unhedged: with the price above fair value, the profit is riskless.",
      ],
      answer: 0,
      solution: `<p>Value rises with σ for a put as for a call: the put pays max(K − S<sub>T</sub>, 0), so more spread adds payoff in the left tail and costs nothing on the right. The 12.70 is the value at 36%, so at the true 24% the put is worth less: it is <b>overpriced</b>.</p><p>Do not buy it. Better, write it and hedge the share exposure, so you profit from the mispricing rather than from the share's direction. Add the limit: it is not an arbitrage, you are betting that 24% is right.</p>`,
      check: `<p>The numbers, not needed on the exam, confirm the direction: the Black-Scholes value is 12.6977 at 36% (the quoted 12.70) and 7.3816 at 24%, an overpricing of 5.3161, about 42% of the price. The call with strike 115 is overpriced by the same 5.3161 (21.0473 against 15.7311), since σ is not in C − P = S − PV(K). A written put loses if the share falls hard, so the hedge is a short position of about 0.34 shares per put.</p>`,
      traps: [
        null,
        "Got the volatility effect backwards. A put is floored at zero like a call, so less spread means less payoff in the left tail: it is worth less, not more.",
        "σ is not in put-call parity, C − P = S − PV(K), so a lower σ lowers the call by exactly as much as the put. The call is overpriced too.",
        "Not an arbitrage: the profit depends on the analyst being right about σ. An unhedged written put loses heavily if the share collapses.",
      ],
    },
  ],
});
