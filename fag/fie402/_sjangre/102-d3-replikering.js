/* sjanger 102 · d3-replikering · The replicating portfolio */
window.EDU_DATA.sjangre.push({
  id: "d3-replikering",
  num: 102,
  title: "The replicating portfolio",
  summary: "Copy an option with shares and a risk-free loan: the law of one price, Δ, B, the put, why no probability is needed and a firm's debt",
  chapters: [22, 24],
  exam: "7 of 11 papers · V2022 P4, H2024 E6",
  seksjon: "del3",
  emne: "Opsjoner",
  symboler: "opsjoner",
  intro: `<p>Replication is the idea behind every option price in this course: build a portfolio of shares and risk-free borrowing or lending that pays exactly what the option pays. The option must then cost what the portfolio costs. Δ, B and the price are on the formula sheet, so the marks go to the payoffs, the signs, the copy verified in both states and the sentence on why no probability is needed. V2022 Problem 4 asked you to replicate a firm's equity and its debt this way. At the top you can copy a call, a put and risky debt and say in words what each copy holds.</p>`,
  steps: [
    {
      id: "d3-replikering-1",
      title: "Same payoff, same price",
      theory: `<p>In the binomial model the share can only move to S<sub>u</sub> or S<sub>d</sub> in one period. You can borrow or lend at r<sub>f</sub>. With two states and two instruments you can build a portfolio of shares and a risk-free loan that pays exactly what the option pays in both states: the replicating portfolio. Two things that pay the same in every state must cost the same today. If the option traded above its copy, you would write the option, buy the copy and keep the difference with nothing owed later.</p>
<div class="formula"><div class="eq">option payoff = portfolio payoff in every state ⟹ option price = portfolio cost</div>
<div class="where">Check the copy in both states: the shares' value minus the loan repaid with interest. For a mispriced option: sell what is dear, buy the copy.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Two identical boxes in the same shop must carry the same price tag. If one is dearer, sell it and buy the other: whatever happens they pay the same, so the gap is yours today. Everyone doing that pushes the prices together.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 20, S<sub>u</sub> = 26, S<sub>d</sub> = 16, r<sub>f</sub> = 4%. A call with K = 20 pays 6 or 0.</p><p>Copy: buy 0.6 shares and borrow 9.2308, which you repay as 9.2308 × 1.04 = 9.60. Up: 0.6 × 26 − 9.60 = 15.60 − 9.60 = 6 ✓. Down: 0.6 × 16 − 9.60 = 9.60 − 9.60 = 0 ✓. Cost today: 0.6 × 20 − 9.2308 = 12.00 − 9.2308 = 2.7692, so the call is worth 2.7692.</p></div>`,
      q: `<p>A share trades at 50. In one year it will be worth 65 or 40. The one-year risk-free rate is 5%. A portfolio that buys 0.6 shares and borrows 22.8571 pays exactly what a one-year European call with strike K = 50 pays, in both states. The call trades at 8.00. Which statement is right?</p>`,
      options: [
        "The call is too dear: write it and buy the portfolio, which locks in 0.8571 today.",
        "The call is too cheap: buy it and sell the portfolio short, which locks in 0.8571 today.",
        "No trade: a call may cost more than its copy, because its loss is capped at the premium.",
        "The call is too dear, but writing it is risky, because you must pay 15 if the share rises.",
      ],
      answer: 0,
      solution: `<p>The copy costs 0.6 × 50 − 22.8571 = 30.0000 − 22.8571 = 7.1429. The call trades at 8.00, so it is dear by 8.00 − 7.1429 = 0.8571.</p><p><b>Write the call and buy the copy.</b> Today: +8.00 − 30.00 + 22.8571 = +0.8571. In a year you repay 22.8571 × 1.05 = 24.00. Up: 0.6 × 65 − 24 − 15 = 39 − 24 − 15 = 0. Down: 0.6 × 40 − 24 − 0 = 0.</p>`,
      check: `<p>Check the copy itself first: up 39 − 24 = 15 and down 24 − 24 = 0, the call's payoffs ✓. The profit equals the mispricing, 8.00 − 7.1429 = 0.8571 ✓. The opposite trade, buying the call and shorting the copy, costs 0.8571 today: if an arbitrage shows a loss today, you have the direction wrong.</p>`,
      traps: [
        null,
        "Took the wrong side. At 8.00 the call is dearer than its copy at 7.1429, so buying it and shorting the copy costs 0.8571 today.",
        "The capped loss is already in the copy, which also pays 0 in the down state. Same payoffs in every state leave no room for a different price.",
        "The 15 you owe when the share rises is paid by the copy: 0.6 × 65 − 24 = 15. The position is riskless in both states.",
      ],
    },
    {
      id: "d3-replikering-2",
      title: "Δ: shares per option",
      theory: `<p>The first unknown is how many shares to hold. The portfolio must swing between the two states exactly as much as the option does. The option's payoff moves by C<sub>u</sub> − C<sub>d</sub> while one share moves by S<sub>u</sub> − S<sub>d</sub>, so the number of shares is the ratio. Δ is on the formula sheet.</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">C<sub>u</sub> and C<sub>d</sub> are the option's payoffs in the up and down states. Δ is a ratio of differences, not of levels. For a call 0 ≤ Δ ≤ 1. Kurbatov: "in most reasonable cases, C<sub>d</sub> will be just zero", because the strike lies between S<sub>d</sub> and S<sub>u</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Δ is the slope of the option's value against the share: how much the option moves when the share moves by 1. The bond pays the same in both states, so only the shares can produce the swing. Δ shares produce exactly the option's swing.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, call with K = 30: C<sub>u</sub> = 6, C<sub>d</sub> = 0.</p><p>Δ = (6 − 0)/(36 − 24) = 6/12 = 0.5000. The share swings by 12 and the call by 6: half a share swings by 6.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 120. In one year it will be worth 150 or 96. Consider a one-year European call with strike K = 110. How many shares does the replicating portfolio hold per call?</p>`,
      options: ["0.2667", "0.3333", "1.3500", "0.7407"],
      answer: 3,
      solution: `<p>Payoffs: C<sub>u</sub> = max(150 − 110, 0) = 40, C<sub>d</sub> = max(96 − 110, 0) = 0.</p><p>Δ = (40 − 0)/(150 − 96) = 40/54 = <b>0.7407</b> shares per call.</p>`,
      check: `<p>The swing test can fail, so run it: 0.740741 × 150 − 0.740741 × 96 = 111.1111 − 71.1111 = 40.0000, exactly the call's swing ✓. With 0.2667 shares the swing is only 14.40, with 0.3333 only 18.00. Δ for a call lies between 0 and 1, which rules out 1.3500.</p>`,
      traps: [
        "Took a ratio of levels: C<sub>u</sub>/S<sub>u</sub> = 40/150 = 0.2667. Δ is the change in the option over the change in the share.",
        "Divided by today's price: C<sub>u</sub>/S<sub>0</sub> = 40/120 = 0.3333. The denominator is the share's swing, S<sub>u</sub> − S<sub>d</sub> = 54.",
        "Turned the fraction upside down: 54/40 = 1.3500. A call never needs more than one share.",
        null,
      ],
    },
    {
      id: "d3-replikering-3",
      title: "B and the price: a call is a levered share",
      theory: `<p>With Δ fixed, the second unknown is B, the amount placed in the risk-free asset today. In each state the portfolio is worth ΔS + B(1 + r<sub>f</sub>), which must equal the option's payoff. Solve the down-state equation for B, then add up what the portfolio costs. Both formulas are on the formula sheet.</p>
<div class="formula"><div class="eq">ΔS<sub>d</sub> + B(1 + r<sub>f</sub>) = C<sub>d</sub> ⟹ B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>)</div><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">B is today's amount. B &lt; 0 means you borrow and repay B(1 + r<sub>f</sub>) next period; for a call B is always negative. The up-state equation gives the same B, so use it as a check.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A call is a share bought partly with borrowed money. The loan is sized so that in the down state the shares exactly repay it and nothing is left: the call's zero payoff. In the up state the same shares are worth more; the surplus is the call's payoff.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, call with K = 30, so Δ = 0.5.</p><p>B = (0 − 24 × 0.5)/1.04 = −12/1.04 = −11.5385: borrow 11.5385 and repay 12.00. C<sub>0</sub> = 30 × 0.5 − 11.5385 = 15.0000 − 11.5385 = 3.4615. Up: 18 − 12 = 6 ✓. Down: 12 − 12 = 0 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 120. In one year it will be worth 150 or 96. The one-year risk-free rate is 4%. A one-year European call with strike K = 110 has Δ = 40/54 = 0.740741. What is the call worth today?</p>`,
      options: ["17.7778", "157.2650", "20.5128", "14.9333"],
      answer: 2,
      solution: `<p>B = (0 − 96 × 0.740741)/1.04 = −71.1111/1.04 = −68.3761: borrow 68.3761 today and repay 71.1111 in a year.</p><p>C<sub>0</sub> = 120 × 0.740741 − 68.3761 = 88.8889 − 68.3761 = <b>20.5128</b>.</p>`,
      check: `<p>Verify the copy in both states, which is where the marks are. Up: 0.740741 × 150 − 71.1111 = 111.1111 − 71.1111 = 40 = C<sub>u</sub> ✓. Down: 71.1111 − 71.1111 = 0 = C<sub>d</sub> ✓. The price respects the bounds: above S<sub>0</sub> − PV(K) = 120 − 110/1.04 = 14.2308 and below S<sub>0</sub> = 120, which rules out 157.2650.</p>`,
      traps: [
        "Did not discount the loan: 88.8889 − 71.1111 = 17.7778. B is today's amount; 71.1111 is what you repay in a year.",
        "Added the loan instead of subtracting it: 88.8889 + 68.3761 = 157.2650. A call is shares bought with borrowed money, so B is negative. No call is worth more than the share.",
        null,
        "Multiplied by 1.04 instead of dividing: B = −71.1111 × 1.04 = −73.9556, so C<sub>0</sub> = 88.8889 − 73.9556 = 14.9333. Today's loan is smaller than the repayment, not larger.",
      ],
    },
    {
      id: "d3-replikering-4",
      title: "Replicating a put: short the share and lend",
      theory: `<p>A put pays in the down state, so its payoff falls when the share rises. The same two formulas copy it, but the signs flip. Δ comes out negative, so you short shares; B comes out positive, so you lend. When the exam asks what your portfolio is in words, the answer for a put reads "short Δ shares and lend B", never "buy".</p>
<div class="formula"><div class="eq">Δ = (P<sub>u</sub> − P<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) &lt; 0 &nbsp;&nbsp; B = (P<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>) &gt; 0</div><div class="eq">P<sub>0</sub> = S<sub>0</sub>Δ + B</div>
<div class="where">P<sub>u</sub> = max(K − S<sub>u</sub>, 0) and P<sub>d</sub> = max(K − S<sub>d</sub>, 0). For a put −1 ≤ Δ ≤ 0. A positive Δ for a put is a sign of a mistake.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A put gains when the share falls, so its copy must be short the share. The short sets the swing; the lending sets the level. When the share ends high, closing the short costs what the bond pays and nothing is left. When it ends low, closing is cheap and the surplus is the put's payoff.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, put with K = 30: P<sub>u</sub> = 0, P<sub>d</sub> = 6.</p><p>Δ = (0 − 6)/12 = −0.5. B = (6 − 24 × (−0.5))/1.04 = 18/1.04 = 17.3077. P<sub>0</sub> = 30 × (−0.5) + 17.3077 = 2.3077. In words: short half a share and lend 17.3077. Up: −18 + 18 = 0 ✓. Down: −12 + 18 = 6 ✓.</p></div>`,
      q: `<p>A share trades at S<sub>0</sub> = 45. In one year it will be worth 54 or 36. The one-year risk-free rate is 3%. Using a replicating portfolio, what is a one-year European put with strike K = 48 worth today?</p>`,
      options: ["18.3495", "4.9515", "6.0000", "3.3495"],
      answer: 1,
      solution: `<p>Payoffs: P<sub>u</sub> = max(48 − 54, 0) = 0, P<sub>d</sub> = max(48 − 36, 0) = 12.</p><p>Δ = (0 − 12)/(54 − 36) = −0.666667: short two thirds of a share.</p><p>B = (12 − 36 × (−0.666667))/1.03 = (12 + 24)/1.03 = 36/1.03 = 34.9515: lend 34.9515.</p><p>P<sub>0</sub> = 45 × (−0.666667) + 34.9515 = −30.0000 + 34.9515 = <b>4.9515</b>.</p>`,
      check: `<p>State by state: up −0.666667 × 54 + 36 = −36 + 36 = 0 ✓; down −24 + 36 = 12 ✓. Parity is a real check here, since the call comes from other payoffs: the call with K = 48 pays 6 or 0, so Δ = 1/3, B = −12/1.03 = −11.6505 and C = 15 − 11.6505 = 3.3495. C + PV(K) = 3.3495 + 46.6019 = 49.9515 = P + S = 4.9515 + 45 ✓</p>`,
      traps: [
        "Bought shares instead of shorting them: Δ = +0.666667 gives B = (12 − 24)/1.03 = −11.6505 and P = 30 − 11.6505 = 18.3495. That portfolio pays 24 in the up state, where the put pays 0.",
        null,
        "Did not discount the lending: −30 + 36 = 6.0000. B is today's amount; 36 is what the bond pays in a year.",
        "Used the call's payoffs out of habit: 6 and 0 give Δ = 0.3333, B = −11.6505 and 3.3495, the price of the call with the same strike.",
      ],
    },
    {
      id: "d3-replikering-5",
      title: "Why the real probability never appears",
      theory: `<p>No probability appeared anywhere in Δ, B or the price. The copy matches the option in every state, not on average, so its cost is the option's price whatever anyone thinks the chances are. The market's beliefs and risk aversion are not lost: they sit in S<sub>0</sub>, the share price you used. That is the answer the exam wants when it asks why the analysts' probability is not needed.</p>
<div class="formula"><div class="eq">C<sub>0</sub> = S<sub>0</sub>Δ + B uses S<sub>0</sub>, S<sub>u</sub>, S<sub>d</sub>, r<sub>f</sub> and the payoffs, no probability</div>
<div class="where">A real probability p is not useless: it gives expected returns. With p the expected payoff must be discounted at the option's own expected return, which you only know once you have the price. Pairing p with r<sub>f</sub> is the classic error.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The option is priced relative to the share, not from scratch. Two investors who disagree about the share both agree that the call is Δ shares minus a loan. Both can look up what Δ shares cost. Their disagreement has already moved S<sub>0</sub>, which carries it into the option.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S<sub>0</sub> = 30, S<sub>u</sub> = 36, S<sub>d</sub> = 24, r<sub>f</sub> = 4%, call with K = 30: the copy costs 3.4615.</p><p>An optimist with p = 0.9 who pairs p with r<sub>f</sub> gets 0.9 × 6/1.04 = 5.1923; a pessimist with p = 0.2 gets 0.2 × 6/1.04 = 1.1538. Neither price can stand: at 5.1923 you would write the call and buy the copy for 3.4615, at 1.1538 you would do the reverse.</p></div>`,
      q: `<p>A share trades at 80. In one year it will be worth 104 or 68. The one-year risk-free rate is 5%. Analyst A puts the probability of the up state at 0.8, analyst B at 0.5. Both value a one-year European call with strike K = 84. Which statement is right?</p>`,
      options: [
        "Both get 8.4656: the copy matches the call in every state, so its cost is the price whatever p is.",
        "Analyst A gets more: the call pays only in the up state, which A thinks is far more likely.",
        "Neither can price it: the expected payoff needs one probability, which the two do not share.",
        "Both get 8.4656, because each discounts their own expected payoff at the risk-free rate.",
      ],
      answer: 0,
      solution: `<p>Payoffs: C<sub>u</sub> = 104 − 84 = 20, C<sub>d</sub> = 0. Δ = 20/36 = 0.555556. B = (0 − 68 × 0.555556)/1.05 = −37.7778/1.05 = −35.9788.</p><p>C<sub>0</sub> = 80 × 0.555556 − 35.9788 = 44.4444 − 35.9788 = <b>8.4656</b> for both analysts. Neither probability entered.</p>`,
      check: `<p>Where the probabilities do matter is the expected return. With p = 0.8 the call's expected payoff is 16.00, a return of 16.00/8.4656 − 1 = 89.0000%; with p = 0.5 it is 10.00, a return of 18.1250%. Pairing p with r<sub>f</sub> instead gives 15.2381 and 9.5238, two prices for one payoff. Whoever quoted either would be arbitraged against the copy at 8.4656.</p>`,
      traps: [
        null,
        "Optimism does not change the copy: 0.555556 shares and a loan of 35.9788 pay 20 or 0 whatever A believes. A higher price comes only from pairing p = 0.8 with r<sub>f</sub>: 15.2381.",
        "Replication needs no expected payoff. Δ and B come from the two states alone, so the price is fixed before anyone agrees on a probability.",
        "Right number, wrong reason. Discounting each analyst's expected payoff at r<sub>f</sub> gives 15.2381 and 9.5238, two different prices. Only the copy gives one.",
      ],
    },
    {
      id: "d3-replikering-6",
      title: "Exam level: replicate the firm's debt (V2022 P4)",
      theory: `<p>Replace the share with the assets of a firm that owes zero-coupon debt with face value F. At maturity the shareholders get max(V − F, 0), a call on the assets. The creditors get min(V, F): the face value when the firm can pay, the whole firm when it cannot. Both are claims on the same tree, so both can be copied with the assets (the unlevered firm, which trades) and the risk-free bond. V2022 Problem 4 asked for exactly this. A full answer writes out the payoffs, verifies the copy in both states and checks E + D = V.</p>
<div class="formula"><div class="eq">Debt pays D<sub>u</sub> = min(V<sub>u</sub>, F) and D<sub>d</sub> = min(V<sub>d</sub>, F); equity pays max(V − F, 0)</div><div class="eq">Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) &nbsp;&nbsp; B<sub>D</sub> = (D<sub>d</sub> − V<sub>d</sub>Δ<sub>D</sub>)/(1 + r<sub>f</sub>) &nbsp;&nbsp; D = V<sub>0</sub>Δ<sub>D</sub> + B<sub>D</sub></div>
<div class="where">In default the creditors get V<sub>d</sub>, not zero. The debt's B is positive: its copy lends. Check E + D = V<sub>0</sub>: in a perfect market the claims only split the firm (Modigliani-Miller Proposition I).</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risky debt behaves like a safe loan plus a slice of the firm's assets; the slice is why creditors lose when the assets fall. Equity is the rest of the assets bought with borrowed money. The equity's copy borrows exactly what the debt's copy lends, so together they hold the whole firm and no bond at all.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Assets worth 200 today, 250 or 150 in a year, r<sub>f</sub> = 4%, face value F = 170.</p><p>Debt pays 170 or 150: Δ<sub>D</sub> = 20/100 = 0.20, B<sub>D</sub> = (150 − 150 × 0.20)/1.04 = 120/1.04 = 115.3846 (lend), D = 200 × 0.20 + 115.3846 = 155.3846. Equity pays 80 or 0: Δ<sub>E</sub> = 0.80, B<sub>E</sub> = −115.3846, E = 160 − 115.3846 = 44.6154. E + D = 200 ✓</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 300 in one year. The assets trade, markets are perfect and the one-year risk-free rate is 5%. The firm's only debt is a one-year zero-coupon bond with face value 360. Analysts put the probability of the high state at 0.6. Using a replicating portfolio, what is the debt worth today?</p>`,
      options: ["342.8571", "187.0130", "320.0000", "316.8831"],
      answer: 3,
      solution: `<p>Payoffs: D<sub>u</sub> = min(520, 360) = 360, D<sub>d</sub> = min(300, 360) = 300. The firm defaults in the low state and the creditors take the assets.</p><p>Δ<sub>D</sub> = (360 − 300)/(520 − 300) = 60/220 = 0.272727.</p><p>B<sub>D</sub> = (300 − 300 × 0.272727)/1.05 = (300 − 81.8182)/1.05 = 218.1818/1.05 = 207.7922: lend 207.7922.</p><p>D = 400 × 0.272727 + 207.7922 = 109.0909 + 207.7922 = <b>316.8831</b>.</p>`,
      check: `<p>Copy: up 0.272727 × 520 + 218.1818 = 141.8182 + 218.1818 = 360 ✓; down 81.8182 + 218.1818 = 300 ✓. Equity pays 160 or 0: Δ<sub>E</sub> = 0.727273, B<sub>E</sub> = −207.7922, E = 290.9091 − 207.7922 = 83.1169. E + D = 83.1169 + 316.8831 = 400 ✓, Modigliani-Miller Proposition I. This check fails for each wrong answer, which give 425.9740, 270.1299 and 403.1169. The promised yield is 360/316.8831 − 1 = 13.6066% against 5%.</p>`,
      traps: [
        "Ignored default: PV(F) = 360/1.05 = 342.8571 is what safe debt would be worth. In the low state the creditors get 300, not 360.",
        "Gave the creditors nothing in default: payoffs 360 and 0 give Δ = 1.636364, B = −467.5325 and 187.0130. They take the assets worth 300.",
        "Paired the analysts' probability with r<sub>f</sub>: (0.6 × 360 + 0.4 × 300)/1.05 = 320.0000. Replication needs no probability.",
        null,
      ],
    },
  ],
});
