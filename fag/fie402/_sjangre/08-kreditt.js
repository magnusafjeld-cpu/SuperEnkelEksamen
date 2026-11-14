/* sjanger 8 · kreditt · Debt and equity as options: credit risk */
window.EDU_DATA.sjangre.push({
  id: "kreditt",
  num: 8,
  title: "Debt and equity as options: credit risk",
  summary: "From a bond's yield to CDS prices, option-based betas and coinsurance in mergers",
  chapters: [5, 24],
  exam: "8 of 11 papers · V2024 P3 and P4, 2021 MC7–9 · not yet in the Kurbatov papers",
  intro: `<p>Credit risk has appeared on 8 of 11 papers, though not yet on Kurbatov's two. The older papers built long chained exercises on it: 2015 Problem 4 carried 90 points, while V2024 Problems 3 and 4 gave 28 points each to a CDS and to a merger with coinsurance. The ladder starts with a bond's yield, then turns equity into a call on the firm's assets and debt into risk-free debt minus a put. At the top you can price risky debt and a CDS, back out the market's default probability, compute option-based betas and split a merger's gains between four groups.</p>`,
  steps: [
    {
      id: "kreditt-1",
      title: "A zero-coupon bond: price and yield to maturity",
      theory: `<p>A zero-coupon bond pays one amount, its face value F, at maturity and nothing before. Its yield to maturity y is the single annual rate that discounts F back to today's price P. It is the return you earn if every promised krone arrives, so it is a <b>promised</b> return. A default-free zero yields the risk-free rate r<sub>f</sub> for its maturity.</p>
<div class="formula"><div class="eq">P = F/(1 + y)<sup>T</sup> &nbsp;⟹&nbsp; y = (F/P)<sup>1/T</sup> − 1</div>
<div class="where">T is the number of years to maturity. For T = 1 this is simply y = F/P − 1. Price and yield always move in opposite directions.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A two-year zero with F = 1 000 trades at P = 810.00.</p><p>F/P = 1 000/810.00 = 1.234568. y = 1.234568<sup>1/2</sup> − 1 = 1.111111 − 1 = 0.111111 = 11.1111% a year.</p><p>Backwards: 1 000/1.111111<sup>2</sup> = 1 000/1.234568 = 810.00.</p></div>`,
      q: `<p>A three-year zero-coupon bond with face value 1 000 trades at 800.00. What is its yield to maturity per year, to four decimals?</p>`,
      options: ["25.0000%", "8.3333%", "6.6667%", "7.7217%"],
      answer: 3,
      solution: `<p>F/P = 1 000/800.00 = 1.25.</p><p>y = 1.25<sup>1/3</sup> − 1 = 1.077217 − 1 = <b>7.7217%</b> a year.</p>`,
      check: `<p>Backwards: 1.077217<sup>3</sup> = 1.25 and 1 000/1.25 = 800.00. The yield must also lie below the simple average 25%/3 = 8.3333%, because compounding earns interest on interest. It does.</p>`,
      traps: [
        "Forgot to annualise: 1 000/800 − 1 = 25.0000% is the three-year total, not a yearly rate.",
        "Divided the three-year total by three, ignoring compounding: 25%/3 = 8.3333%.",
        "Measured the discount against face value instead of price: (1 000 − 800)/1 000 = 20%, divided by three, 6.6667%.",
        null,
      ],
    },
    {
      id: "kreditt-2",
      title: "Promised versus expected return on risky debt",
      theory: `<p>A corporate borrower can default. Let p be the probability of default over the year and R the recovery rate, the fraction of face value the creditors collect if it happens. The loss given default is L = 1 − R. The yield y assumes nothing goes wrong. The <b>expected return</b> r<sub>D</sub> takes off the expected loss. It is r<sub>D</sub>, not y, that is the cost of debt in a WACC. The course formula is not on the formula sheet: memorise it. The credit spread y − r<sub>f</sub> holds two parts. The expected loss p·L is money the lender does not expect to get. Only the rest, r<sub>D</sub> − r<sub>f</sub>, is a premium for bearing default risk.</p>
<div class="formula"><div class="eq">r<sub>D</sub> = y − p·L</div><div class="eq">exact, from the payoffs: r<sub>D</sub> = E[payment]/P − 1 with E[payment] = (1 − p)·F + p·R·F</div>
<div class="where">The two routes differ by p·L·y, because the formula charges the loss on the price and the exact route on the promised payment. Use the formula when you are given y, p and L. Use the payoffs when you are given them.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>y = 8%, p = 5%, R = 50%, so L = 0.50.</p><p>p·L = 0.05 × 0.50 = 0.025. r<sub>D</sub> = 8% − 2.5% = 5.5000%.</p><p>Exact route per 100 of face: price 100/1.08 = 92.5926, expected payment 0.95 × 100 + 0.05 × 50 = 97.50, return 97.50/92.5926 − 1 = 5.3000%. The gap of 0.2% is p·L·y = 0.025 × 0.08 = 0.002.</p></div>`,
      q: `<p>A one-year corporate bond has a promised yield of 9%. Analysts put the probability of default at 4% and expect creditors to recover 40% of face value if it happens. Using the course formula, what is the expected return on the debt?</p>`,
      options: ["6.6000%", "9.0000%", "7.4000%", "5.0000%"],
      answer: 0,
      solution: `<p>L = 1 − 0.40 = 0.60, so p·L = 0.04 × 0.60 = 0.024.</p><p>r<sub>D</sub> = 9% − 2.4% = <b>6.6000%</b>.</p>`,
      check: `<p>The exact route per 100 of face: price 100/1.09 = 91.7431, expected payment 0.96 × 100 + 0.04 × 40 = 97.60, return 97.60/91.7431 − 1 = 6.3840%. It sits 0.2160% below the formula, which is p·L·y = 0.024 × 0.09 = 0.00216, as it should. Both lie below the 9% promised: whenever default is possible, the expected return is below the promised one.</p>`,
      traps: [
        null,
        "Used the promised yield as the expected return: 9.0000%. That is the return only if nothing goes wrong.",
        "Subtracted p times the recovery rate instead of the loss: 9% − 0.04 × 0.40 = 7.4000%.",
        "Subtracted the default probability as if creditors lost everything in default: 9% − 4% = 5.0000%.",
      ],
    },
    {
      id: "kreditt-4",
      title: "Equity as a call on the firm's assets",
      theory: `<p>Take a firm whose only debt is a zero-coupon bond with face value F, due at T. At T the shareholders either pay F and keep the rest, or walk away. Limited liability means they never pay more than the firm has. So equity pays max(V<sub>T</sub> − F, 0): a call option on the firm's assets with strike F. The creditors get min(V<sub>T</sub>, F). Work state by state: apply the max and the min in each state first, then average.</p>
<div class="formula"><div class="eq">E<sub>T</sub> = max(V<sub>T</sub> − F, 0) &nbsp;·&nbsp; D<sub>T</sub> = min(V<sub>T</sub>, F) &nbsp;·&nbsp; E<sub>T</sub> + D<sub>T</sub> = V<sub>T</sub></div>
<div class="where">V<sub>T</sub> is the value of the firm's assets at maturity and the face value F is the strike. E[V] − F is not the expected equity payoff: it lets equity go negative in the default states.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 90. The assets will be worth 150 or 70, each with probability 0.5.</p><p>Equity: max(150 − 90, 0) = 60 and max(70 − 90, 0) = 0, expected 0.5 × 60 = 30. Debt: 90 and 70, expected 80. Assets: expected 110 = 30 + 80.</p><p>The shortcut E[V] − F = 110 − 90 = 20 is wrong: it charges the shareholders the shortfall of 20 in the bad state, which limited liability spares them.</p></div>`,
      q: `<p>A firm has one zero-coupon bond with face value 100 due in one year. Its assets will then be worth 180 with probability 0.3, 120 with probability 0.4 or 60 with probability 0.3. What is the expected payoff to the shareholders at maturity?</p>`,
      options: ["20.00", "88.00", "32.00", "12.00"],
      answer: 2,
      solution: `<table class="data"><tr><th>V<sub>T</sub></th><th>Probability</th><th>Equity max(V − 100, 0)</th><th>Debt min(V, 100)</th></tr>
<tr><td class="n">180</td><td class="n">0.3</td><td class="n">80</td><td class="n">100</td></tr>
<tr><td class="n">120</td><td class="n">0.4</td><td class="n">20</td><td class="n">100</td></tr>
<tr><td class="n">60</td><td class="n">0.3</td><td class="n">0</td><td class="n">60</td></tr></table>
<p>Expected equity payoff = 0.3 × 80 + 0.4 × 20 + 0.3 × 0 = 24 + 8 + 0 = <b>32.00</b>.</p>`,
      check: `<p>Expected debt payoff = 30 + 40 + 18 = 88. Then 32 + 88 = 120 = E[V] = 54 + 48 + 18 ✓. The gap between 32 and E[V] − F = 20 is the expected shortfall the creditors absorb, 0.3 × 40 = 12: the call minus the put equals V − F, here 32 − 12 = 20.</p>`,
      traps: [
        "Subtracted the face value from expected firm value: 120 − 100 = 20.00. That makes equity pay the shortfall of 40 in the bad state.",
        "Gave the creditors' expected payoff: 0.3 × 100 + 0.4 × 100 + 0.3 × 60 = 88.00.",
        null,
        "Gave the creditors' expected shortfall, which is the payoff of the put: 0.3 × (100 − 60) = 12.00.",
      ],
    },
    {
      id: "kreditt-5",
      title: "Risky debt as risk-free debt minus a put",
      theory: `<p>Rewrite the creditors' payoff: min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). Lending to a levered firm is lending risk-free and at the same time writing the shareholders a put on the assets with strike F. The put is their right to hand over the assets instead of paying F. Equivalently, debt is the assets minus the shareholders' call. Put-call parity, Call = Put + V − PV(F), makes the two readings the same.</p>
<div class="formula"><div class="eq">D = PV(F) − Put = V − Call</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>)<sup>T</sup> is the value of the same promise if it were risk-free. Put and Call are options on V with strike F and the debt's maturity. The put enters with a minus: it is worth something to the shareholders, not to the lender. If the firm is all-equity before the issue, options on its n shares with strike F/n are options on V: n such puts make one put on V with strike F (2016 Problem 4).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 120, F = 110 due in one year, r<sub>f</sub> = 10%. The put on V with strike 110 is worth 6.</p><p>PV(F) = 110/1.10 = 100. D = 100 − 6 = 94. Equity is the rest: E = 120 − 94 = 26.</p><p>Parity: Call = 6 + 120 − 100 = 26 ✓.</p></div>`,
      q: `<p>A firm's assets are worth 250. Its only debt is a zero-coupon bond with face value 210 due in one year. The risk-free rate is 5%. A European put on the firm's assets with strike 210 and one year to expiry is worth 12. What is the market value of the debt?</p>`,
      options: ["212.00", "198.00", "200.00", "188.00"],
      answer: 3,
      solution: `<p>PV(F) = 210/1.05 = 200.</p><p>D = PV(F) − Put = 200 − 12 = <b>188.00</b>.</p>`,
      check: `<p>Equity is 250 − 188 = 62. Parity gives the call as 12 + 250 − 200 = 62. That is the same identity rearranged, so it only re-checks the arithmetic. The bound that can fail: risky debt must be worth less than both PV(F) = 200 and V = 250. 188 is; a value of 212 is not, which exposes a wrong sign on the put.</p>`,
      traps: [
        "Added the put instead of subtracting it: 200 + 12 = 212.00. That makes risky debt worth more than risk-free debt.",
        "Subtracted the put from the undiscounted face value: 210 − 12 = 198.00.",
        "Valued the debt as risk-free and left out the put: 210/1.05 = 200.00.",
        null,
      ],
    },
    {
      id: "kreditt-18",
      title: "In words: why debt is risk-free debt minus a written put",
      theory: `<p>Kurbatov in the wrap-up: this could be on the exam, with the question "explain why". A full answer has three moves. Payoff: the creditors are owed F but receive min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). Option: the second term is the payoff of a put on the firm's assets struck at F. Limited liability gives the shareholders that put, the right to hand over the assets instead of paying F, the option to default. Who holds it: the creditors have written it, so they hold a risk-free claim on F minus the put. If the shareholders had unlimited liability, the put would vanish and the debt would be risk-free (lecture 10).</p>
<div class="formula"><div class="eq">min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0) &nbsp;⟹&nbsp; D = PV(F) − Put</div>
<div class="where">A CDS is that same put bought back: D + Put = PV(F), the risk-free bond. Put-call parity turns it into the other reading, D = V − Call.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100 and the assets will be worth 140 or 60. The creditors get 100 = 100 − 0 or 60 = 100 − 40. The 40 is exactly what a put on the assets struck at 100 pays in the bad state. The creditors are the ones who pay it, through the shortfall.</p></div>`,
      q: `<p>An exam question asks: "Explain why corporate debt can be seen as risk-free debt minus a put option." Which answer earns full marks?</p>`,
      options: [
        "The creditors own a put on the firm's assets that pays them if V falls below F. Like any insurance it costs them a premium up front, which is why the put is subtracted from the risk-free value: D = PV(F) − Put.",
        "Creditors get min(V, F) = F − max(F − V, 0). That max is a put on the assets struck at F, the shareholders' right to default under limited liability. The creditors have written it: D = PV(F) − Put.",
        "Debt is a call on the firm's assets struck at F: the creditors collect more as V rises, up to F. By put-call parity that call equals risk-free debt minus a put with the same strike, which gives D = PV(F) − Put.",
        "The firm may repay early when interest rates fall, a right the creditors have sold to it at issue. That right works like a put on the bond, so the debt is worth PV(F), the risk-free value, minus the put.",
      ],
      answer: 1,
      solution: `<p>The winning answer makes all three moves: it rewrites the payoff, names the put and its strike, says where the put comes from (limited liability, the right to default) and who is short it (the creditors). That is the argument of lecture 10: <b>D = PV(F) − Put</b>.</p>`,
      check: `<p>Run the answer through the two extremes. If V<sub>T</sub> is far above F the put is worthless and the debt pays F: risk-free ✓ If V<sub>T</sub> = 0 the put pays F and the debt pays F − F = 0 ✓ An answer in which the creditors own the put fails this test: their payoff would rise as V falls.</p>`,
      traps: [
        "Got the holder backwards. If the creditors owned the put they would be insured: debt plus that put is the risk-free bond, D + Put = PV(F). The put belongs to the shareholders.",
        null,
        "Equity, not debt, is the call on the assets struck at F. Parity gives Call = Put + V − PV(F), so debt is V − Call, which is the same as PV(F) − Put.",
        "Mixes up a callable bond with default risk. The put in risky debt is the shareholders' right to default under limited liability, not a right to repay early.",
      ],
    },
    {
      id: "kreditt-15",
      title: "The value and yield of debt from a quoted call",
      theory: `<p>Equity is a call on the firm's assets struck at the face value of the debt. So if calls on the firm's shares trade with the right strike and expiry, the market has already priced the equity. Kurbatov's Google exercise (lecture 10, Problem Set 3): divide the face value by the number of shares to get the strike per share, take the call price as the midpoint of bid and ask, multiply by the number of shares. Debt is the rest of the firm. Then annualise the yield with T in years, also when T is not a whole number.</p>
<div class="formula"><div class="eq">strike per share = F/N &nbsp;&nbsp; E = N × (bid + ask)/2 &nbsp;&nbsp; D = V − E</div>
<div class="eq">y = (F/D)<sup>1/T</sup> − 1</div>
<div class="where">N is the number of shares and V the firm's total value, unchanged by the debt under perfect markets. For 18 months T = 18/12 and the exponent is 12/18. The firm has no debt today, so options on its shares are options on V.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10, Google)</span><p>320 million shares, V = 135 billion, a zero-coupon issue of 128 billion due in 18 months: 128/0.32 = 400 per share. The call with strike 400 has a midpoint of 86.05, so E = 0.32 × 86.05 = 27.536 billion and D = 135 − 27.536 = 107.464.</p><p>y = (128/107.464)<sup>12/18</sup> − 1 = 12.37%, a spread of 11.37% over r<sub>f</sub> = 1%.</p></div>`,
      q: `<p>Kystnett ASA has 250 million shares, a total value of 60 billion NOK and no debt. Markets are perfect. It considers issuing a zero-coupon bond with face value 40 billion, due in 15 months, then paying the proceeds out. Calls on its shares with strike 160 NOK and 15 months to expiry are quoted at bid 91.60 and ask 92.40. What annual yield would the bond pay?</p>`,
      options: ["6.4355%", "8.1081%", "10.2358%", "6.6662%"],
      answer: 0,
      solution: `<p>Strike per share: 40/0.25 = 160, the quoted strike. Midpoint: (91.60 + 92.40)/2 = 92.00.</p><p>E = 0.25 × 92.00 = 23.00 billion, so D = 60 − 23 = 37.00 billion.</p><p>y = (40/37)<sup>12/15</sup> − 1 = 1.081081<sup>0.8</sup> − 1 = <b>6.4355%</b> a year.</p>`,
      check: `<p>Grow the debt back: 37 × 1.064355<sup>1.25</sup> = 40.00 ✓ The annual yield must lie below the 15-month total, 40/37 − 1 = 8.11%, because the bond runs longer than a year. It does.</p>`,
      traps: [
        null,
        "Did not annualise: 40/37 − 1 = 8.1081% is the return over 15 months.",
        "Turned the exponent upside down: (40/37)<sup>15/12</sup> − 1 = 10.2358%.",
        "Used the ask instead of the midpoint: E = 0.25 × 92.40 = 23.10, D = 36.90 and (40/36.9)<sup>0.8</sup> − 1 = 6.6662%.",
      ],
    },
    {
      id: "kreditt-16",
      title: "Senior and junior debt from two calls",
      theory: `<p>With two layers of debt, value them one layer at a time (lecture 10). First pretend only the senior debt exists: equity would be the call struck at K<sub>S</sub>, so the senior debt is the rest. With both layers, equity is the call struck at K<sub>S</sub> + K<sub>J</sub>. The junior debt is what is left between them: a call spread that receives everything between K<sub>S</sub> and K<sub>S</sub> + K<sub>J</sub>. Its yield is above the yield on all the debt taken together. The senior yield is below it.</p>
<div class="formula"><div class="eq">D<sub>S</sub> = V − C(K<sub>S</sub>) &nbsp;&nbsp; E = C(K<sub>S</sub> + K<sub>J</sub>) &nbsp;&nbsp; D<sub>J</sub> = V − D<sub>S</sub> − E = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>)</div>
<div class="where">C(K) is N times the call price per share with strike K/N. Yields as before: y = (F/D)<sup>1/T</sup> − 1 for each layer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10, Google)</span><p>Senior 96 billion (300 per share): call 149.15, so 0.32 × 149.15 = 47.728 and D<sub>S</sub> = 135 − 47.728 = 87.272, y<sub>S</sub> = (96/87.272)<sup>12/18</sup> − 1 = 6.56%.</p><p>Junior 32 billion: equity is the call with strike 400, 27.536. D<sub>J</sub> = 135 − 87.272 − 27.536 = 20.192 ≈ 20.19 and y<sub>J</sub> = (32/20.19)<sup>12/18</sup> − 1 = 35.94%. (The slide prints 34.94%, an arithmetic slip.)</p></div>`,
      q: `<p>Kystnett ASA (250 million shares, total value 60 billion NOK, no debt today, perfect markets) instead considers two zero-coupon bonds, both due in 15 months: senior debt with face value 30 billion and junior debt with face value 10 billion. Calls on its shares with 15 months to expiry have midpoints of 128.00 for strike 120 and 92.00 for strike 160. What annual yield would the junior bond pay?</p>`,
      options: ["6.4355%", "33.0214%", "8.7943%", "11.1111%"],
      answer: 2,
      solution: `<p><b>Senior.</b> Strike 30/0.25 = 120: equity if only senior debt existed is 0.25 × 128 = 32, so D<sub>S</sub> = 60 − 32 = 28.</p><p><b>Equity.</b> Strike (30 + 10)/0.25 = 160: E = 0.25 × 92 = 23.</p><p><b>Junior.</b> D<sub>J</sub> = 60 − 28 − 23 = 9 = 0.25 × (128 − 92). y<sub>J</sub> = (10/9)<sup>12/15</sup> − 1 = <b>8.7943%</b>.</p>`,
      check: `<p>The senior yield is (30/28)<sup>0.8</sup> − 1 = 5.6746% and the yield on all 40 billion together is 6.4355%. The junior yield must be the highest of the three: 5.6746% &lt; 6.4355% &lt; 8.7943% ✓ The two layers also sum to the debt of a single bond with the same total face value, 28 + 9 = 37 ✓, but that is an identity (both routes are V minus the call struck at 160) and only confirms the arithmetic.</p>`,
      traps: [
        "Gave the yield on all the debt together: (40/37)<sup>0.8</sup> − 1 = 6.4355%. Splitting the debt moves risk onto the junior layer.",
        "Valued the senior debt at its face value of 30: D<sub>J</sub> = 37 − 30 = 7 and (10/7)<sup>0.8</sup> − 1 = 33.0214%. The senior debt is risky too and is worth only 28.",
        null,
        "Did not annualise: 10/9 − 1 = 11.1111% is the return over 15 months.",
      ],
    },
    {
      id: "kreditt-6",
      title: "Valuing debt and equity in a one-period tree",
      theory: `<p>To value the claims you need prices, not expected payoffs. In a one-period tree the firm's assets move from V<sub>0</sub> to V<sub>u</sub> or V<sub>d</sub>. The risk-neutral probability ρ is the up probability under which the assets earn exactly r<sub>f</sub>. Under ρ every claim on the assets also earns r<sub>f</sub>: take its payoff in each state, weight by ρ and 1 − ρ and discount at r<sub>f</sub>. The real probabilities never enter, because the asset price V<sub>0</sub> already contains them.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>)</div><div class="eq">D<sub>0</sub> = [ρ·min(V<sub>u</sub>, F) + (1 − ρ)·min(V<sub>d</sub>, F)]/(1 + r<sub>f</sub>) &nbsp;·&nbsp; E<sub>0</sub> = V<sub>0</sub> − D<sub>0</sub></div>
<div class="where">ρ is on the formula sheet. Pair ρ with r<sub>f</sub>, never with a real probability or a risky rate.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 125, V<sub>d</sub> = 85, r<sub>f</sub> = 5%, F = 95.</p><p>ρ = (105 − 85)/(125 − 85) = 20/40 = 0.50. Debt pays 95 or 85: D<sub>0</sub> = (0.5 × 95 + 0.5 × 85)/1.05 = 90/1.05 = 85.7143. Equity pays 30 or 0: E<sub>0</sub> = 0.5 × 30/1.05 = 14.2857. Sum 100.0000 = V<sub>0</sub>.</p></div>`,
      q: `<p>A firm's assets are worth 200 today and will be worth 260 or 160 in one year. Analysts put the probability of the up state at 0.6. The firm has one zero-coupon bond with face value 180 due in one year. The risk-free rate is 4%. What is the market value of the debt today?</p>`,
      options: ["165.3846", "163.0769", "173.0769", "169.6000"],
      answer: 1,
      solution: `<p>ρ = (1.04 × 200 − 160)/(260 − 160) = 48/100 = 0.48.</p><p>The debt pays min(260, 180) = 180 up and min(160, 180) = 160 down.</p><p>D<sub>0</sub> = (0.48 × 180 + 0.52 × 160)/1.04 = (86.40 + 83.20)/1.04 = 169.60/1.04 = <b>163.0769</b>.</p>`,
      check: `<p>Equity pays 80 or 0, so E<sub>0</sub> = 0.48 × 80/1.04 = 38.40/1.04 = 36.9231. Then 163.0769 + 36.9231 = 200.0000 = V<sub>0</sub> ✓. This one can fail: drop the max in the down state and equity is charged −20. The put route, 173.0769 − 0.52 × 20/1.04 = 173.0769 − 10.0000 = 163.0769, recombines the same numbers and catches arithmetic only.</p>`,
      traps: [
        "Used the analysts' 0.6 instead of ρ: (0.6 × 180 + 0.4 × 160)/1.04 = 172/1.04 = 165.3846. Real probabilities never pair with r<sub>f</sub>.",
        null,
        "Valued the debt as risk-free: 180/1.04 = 173.0769. That ignores the shortfall of 20 in the down state.",
        "Forgot to discount the risk-neutral expectation: 169.6000.",
      ],
    },
    {
      id: "kreditt-8",
      title: "The risk-neutral default probability and the price of a CDS",
      theory: `<p>A bond price tells you what the market believes about default, in risk-neutral terms. Set the price equal to the expected payoff under the risk-neutral default probability q, discounted at r<sub>f</sub>. Then solve for q. A credit default swap (CDS) is insurance on the bond. A contract that pays 1 if the issuer defaults and 0 otherwise is worth q/(1 + r<sub>f</sub>). q exceeds the real default probability, because default comes in bad times and the risk premium has been moved into the probability.</p>
<div class="formula"><div class="eq">P = [q·R·F + (1 − q)·F]/(1 + r<sub>f</sub>) &nbsp;⟹&nbsp; q = [1 − P(1 + r<sub>f</sub>)/F]/L</div><div class="eq">CDS paying 1 in default = q/(1 + r<sub>f</sub>)</div>
<div class="where">R·F is what the bond pays in default and L = 1 − R. In a tree where default is the down state, q = 1 − ρ.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A one-year bond with F = 100 has a promised yield of 6.25% and pays 80 in default; r<sub>f</sub> = 2%.</p><p>P = 100/1.0625 = 94.1176. q = [1 − 94.1176 × 1.02/100]/0.20 = (1 − 0.96)/0.20 = 0.20.</p><p>CDS paying 1 in default = 0.20/1.02 = 0.1961.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 12%. If the issuer defaults it pays 75. Analysts estimate the real default probability at 10%. The risk-free rate is 5%. What is the price today of a CDS that pays 1 if the issuer defaults and nothing otherwise?</p>`,
      options: ["0.2500", "0.0952", "0.2381", "0.2232"],
      answer: 2,
      solution: `<p>Price: P = 100/1.12 = 89.2857.</p><p>Risk-neutral default probability: [q × 75 + (1 − q) × 100]/1.05 = 89.2857, so 100 − 25q = 93.7500 and q = 6.25/25 = 0.25.</p><p>CDS = 0.25/1.05 = <b>0.2381</b>.</p>`,
      check: `<p>Reprice the bond with q: (0.25 × 75 + 0.75 × 100)/1.05 = 93.75/1.05 = 89.2857 ✓. A claim paying 1 in default plus a claim paying 1 otherwise is a risk-free zero: (0.25 + 0.75)/1.05 = 0.9524 = 1/1.05 ✓. And q = 25% sits well above the real 10%, as it must when default lands in bad times.</p>`,
      traps: [
        "Quoted the risk-neutral probability without discounting: 0.2500 is the value of 1 paid today, not in a year.",
        "Used the real default probability: 0.10/1.05 = 0.0952. Real probabilities never pair with r<sub>f</sub>.",
        null,
        "Discounted at the bond's promised yield instead of r<sub>f</sub>: 0.25/1.12 = 0.2232.",
      ],
    },
    {
      id: "kreditt-19",
      title: "The beta of equity as a call: Δ times V/E in a tree",
      theory: `<p>Equity is a call on the assets, so it moves with them by the option's delta Δ<sub>E</sub>: how much E changes when V changes by 1. In a one-period tree Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>), the same Δ as in replication. A 1% move in V moves E by Δ<sub>E</sub>·V/E per cent, so the equity beta scales the same way. Kurbatov has said the Black-Scholes calculation with N(d<sub>1</sub>) and N(d<sub>2</sub>) will not be on the exam, so work in the tree; in Black-Scholes N(d<sub>1</sub>) plays the role of Δ<sub>E</sub>.</p>
<div class="formula"><div class="eq">Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) &nbsp;·&nbsp; β<sub>E</sub> = Δ<sub>E</sub>·(V/E)·β<sub>U</sub></div>
<div class="where">E is the equity's value today from the tree, V = V<sub>0</sub> and β<sub>U</sub> the beta of the assets. Δ<sub>E</sub> is below 1 when the debt is risky, so β<sub>E</sub> stays below (V/E)β<sub>U</sub>, the value with riskless debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 125, V<sub>d</sub> = 85, r<sub>f</sub> = 5%, F = 95, β<sub>U</sub> = 1.0. ρ = 20/40 = 0.50 and E = 0.5 × 30/1.05 = 14.2857.</p><p>Δ<sub>E</sub> = (30 − 0)/(125 − 85) = 0.75. β<sub>E</sub> = 0.75 × (100/14.2857) × 1.0 = 5.25.</p></div>`,
      q: `<p>A firm's assets are worth 500 today and will be worth 700 or 350 in one year. Their beta is 1.1 and the risk-free rate is 4%. The firm's only debt is a one-year zero-coupon bond with face value 400. What is the equity beta, to four decimals?</p>`,
      options: ["3.9255", "1.9067", "1.3099", "3.3647"],
      answer: 3,
      solution: `<p><b>ρ.</b> (1.04 × 500 − 350)/(700 − 350) = 170/350 = 0.485714.</p><p><b>E.</b> Equity pays 300 or 0, so E = 0.485714 × 300/1.04 = 140.1099.</p><p><b>Δ<sub>E</sub>.</b> (300 − 0)/(700 − 350) = 0.857143.</p><p><b>β<sub>E</sub></b> = 0.857143 × (500/140.1099) × 1.1 = 0.857143 × 3.568627 × 1.1 = <b>3.3647</b>.</p>`,
      check: `<p>The bound that can fail: with riskless debt β<sub>E</sub> would be (V/E)β<sub>U</sub> = 3.9255; risky debt carries part of the asset risk, so β<sub>E</sub> must lie below that and above β<sub>U</sub> = 1.1. It does ✓ The debt's beta, (1 − 0.857143) × (500/359.8901) × 1.1 = 0.2183, weights back to β<sub>U</sub>: 0.280220 × 3.3647 + 0.719780 × 0.2183 = 1.1000. That last one is an identity and only confirms the arithmetic.</p>`,
      traps: [
        "Left out Δ<sub>E</sub>: (500/140.1099) × 1.1 = 3.9255. That is relevering as if the debt were riskless.",
        "Used ρ as the delta: 0.485714 × 3.568627 × 1.1 = 1.9067. ρ prices the claims; Δ measures how they move with V.",
        "Used V/D instead of V/E: 0.857143 × (500/359.8901) × 1.1 = 1.3099.",
        null,
      ],
    },
    {
      id: "kreditt-11",
      title: "Coinsurance: what a merger does to the debt",
      theory: `<p>Merge two levered firms with no synergies whose good and bad states do not coincide. Each firm's assets now stand behind both firms' debt, so a good outcome at one covers a shortfall at the other. The merged debt defaults less often and is worth more: this is the <b>coinsurance effect</b>. Total value is unchanged, so the creditors' gain is exactly the shareholders' loss (consistency check 4). Work state by state: add the two asset values in each state first, then apply the min against the total face value.</p>
<div class="formula"><div class="eq">merged debt in state s = min(V<sub>A,s</sub> + V<sub>B,s</sub>, F<sub>A</sub> + F<sub>B</sub>)</div><div class="eq">Call(V<sub>A</sub> + V<sub>B</sub>) ≤ Call(V<sub>A</sub>) + Call(V<sub>B</sub>) &nbsp;⟹&nbsp; E<sub>merged</sub> ≤ E<sub>A</sub> + E<sub>B</sub></div>
<div class="where">Value each claim as its risk-neutral average payoff discounted at r<sub>f</sub>. An option on a portfolio is worth no more than a portfolio of options, so the merged equity loses and the merged debt gains. Averaging V first and applying the min afterwards gives the wrong answer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A is worth 30 or 10, firm B 10 or 30. Each owes 15.</p><p>Apart: each debt pays 15 and 10, worth 12.5; each equity pays 15 and 0, worth 7.5. Total debt 25, total equity 15.</p><p>Merged: 40 in both states against F = 30. Debt 30, equity 10. Creditors gain 30 − 25 = 5 and shareholders lose 15 − 10 = 5 ✓.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 60 or 10 and owes 30. Firm B will be worth 10 or 30 and owes 20. Both debts are zero-coupon and mature at the same date. The firms merge with no synergies. The merged firm takes over both debts. What is the merged firm's debt worth?</p>`,
      options: ["45.00", "35.00", "50.00", "10.00"],
      answer: 0,
      solution: `<p>Add first: the merged assets are worth 60 + 10 = 70 in state 1 and 10 + 30 = 40 in state 2. Total face value is 30 + 20 = 50.</p><p>The debt pays min(70, 50) = 50 and min(40, 50) = 40, so D<sub>merged</sub> = 0.5 × 50 + 0.5 × 40 = <b>45.00</b>.</p>`,
      check: `<p>Apart, A's debt is worth 0.5 × 30 + 0.5 × 10 = 20 and B's 0.5 × 10 + 0.5 × 20 = 15, total 35. Equity apart: A 0.5 × 30 = 15, B 0.5 × 10 = 5, total 20. Merged equity: 0.5 × 20 = 10. Creditors gain 45 − 35 = 10 and shareholders lose 20 − 10 = 10. Firm value is 55 before and after, so the two must cancel (consistency check 4) ✓.</p>`,
      traps: [
        null,
        "Valued each debt on its own firm's assets as before the merger: 20 + 15 = 35.00. That leaves out the coinsurance.",
        "Averaged the merged assets first, min(55, 50) = 50.00, which is the face value: the debt then looks risk-free although it falls short in state 2.",
        "Gave the merged equity instead of the debt: 0.5 × (70 − 50) + 0.5 × 0 = 10.00.",
      ],
    },
    {
      id: "kreditt-17",
      title: "Coinsurance in yields: why the merged firm borrows cheaper",
      theory: `<p>Kurbatov's version of coinsurance asks three questions (lecture 12). Why does a joint bond yield less than two separate ones? Because in a state where one firm falls short, the other's surplus covers the gap. When is the joint firm less risky? When the two firms' bad states do not coincide; if both are low in the same state, nothing is covered. Who pays for the lower yield? With no synergies total value is fixed, so the shareholders: the debt is worth more and the equity less (consistency check 4).</p>
<div class="formula"><div class="eq">D<sub>merged</sub> = E[min(V<sub>A</sub> + V<sub>B</sub>, F<sub>A</sub> + F<sub>B</sub>)] &nbsp;&nbsp; y = F/D − 1</div>
<div class="where">One-period zero-coupon debt, risk-neutral investors and r<sub>f</sub> = 0, as in the lecture, so each claim is worth its expected payoff. Add the assets state by state before you apply the min.</div></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 12)</span><p>Two equally likely states. A is worth 80 or 20 and owes 30; B is worth 10 or 40 and owes 15. Apart: A's debt pays 30 or 20, worth 25, yield 30/25 − 1 = 20%; B's pays 10 or 15, worth 12.5, yield 20%. Equity 25 + 12.5 = 37.5.</p><p>Merged: 90 or 60 against 45, so the debt is risk-free: 45, yield 0%. Equity pays 45 or 15, worth 30. Debt 37.5 → 45, equity 37.5 → 30.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 90 or 20 and owes 50. Firm B will be worth 10 or 60 and owes 40. Both debts are one-year zero-coupon bonds. The firms merge with no synergies. The merged firm owes 90 at the same date. What promised yield does the merged firm's debt carry?</p>`,
      options: ["5.8824%", "51.4286%", "50.0000%", "0.0000%"],
      answer: 0,
      solution: `<p>Add first: the merged assets are worth 90 + 10 = 100 in state 1 and 20 + 60 = 80 in state 2, against F = 90.</p><p>The debt pays 90 and 80, so D = 0.5 × 90 + 0.5 × 80 = 85.</p><p>y = 90/85 − 1 = <b>5.8824%</b>.</p>`,
      check: `<p>Apart: A's debt pays 50 or 20, worth 35, yield 42.8571%; B's pays 10 or 40, worth 25, yield 60%. The creditors gain 85 − 60 = 25. Equity apart is 20 + 10 = 30 and merged 0.5 × 10 = 5, a loss of 25 ✓ (check 4). The merged debt is still risky, since 80 &lt; 90 in state 2, so its yield stays above r<sub>f</sub> = 0.</p>`,
      traps: [
        null,
        "Averaged the two stand-alone yields: (42.8571% + 60%)/2 = 51.4286%. That ignores the coinsurance.",
        "Priced the two bonds apart and pooled them: 90/(35 + 25) − 1 = 50.0000%. That is the combined yield without the merger.",
        "Averaged the merged assets first: min(90, 90) = 90, so the debt looks risk-free. It falls short by 10 in state 2.",
      ],
    },
    {
      id: "kreditt-12",
      title: "Exam level: a debt-financed payout priced as options (2015 P4, 2022 P4)",
      theory: `<p>2015 Problem 4 (90 points) ran this chain on one firm: an all-equity firm issues zero-coupon debt and pays the proceeds out as a special dividend. Value the equity and the debt, then the yield and the credit spread, then the betas of both claims after the payout. 2022 Problem 4 (48 points) asked for the first links in a binomial tree. In a tree the delta Δ plays the role of N(d<sub>1</sub>). Close with D + E = V, which is MM I: the shareholder holds the dividend plus the levered shares.</p>
<div class="formula"><div class="eq">ρ → E, D → y = F/D − 1 → Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) → β<sub>E</sub> = Δ<sub>E</sub>(V/E)β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = (1 − Δ<sub>E</sub>)(V/D)β<sub>U</sub></div>
<div class="where">The debt's own delta is Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) = 1 − Δ<sub>E</sub>. The beta of the all-equity firm before the payout is β<sub>U</sub>. Kurbatov will not ask for the Black-Scholes calculation, so run the chain in the tree.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole chain</span><p>All-equity firm worth 200, assets worth 280 or 160 next year, r<sub>f</sub> = 4%, β<sub>U</sub> = 1.0. It issues a one-year zero with F = 176 and pays out the proceeds.</p><p>ρ = (208 − 160)/120 = 0.40. Equity pays 104 or 0: E = 0.40 × 104/1.04 = 40.0000. Debt pays 176 or 160: D = (70.40 + 96.00)/1.04 = 160.0000, which is the dividend.</p><p>y = 176/160 − 1 = 10.0000% and the spread is 6.0000%.</p><p>Δ<sub>E</sub> = 104/120 = 0.866667. β<sub>E</sub> = 0.866667 × (200/40) × 1.0 = 4.3333. β<sub>D</sub> = 0.133333 × (200/160) × 1.0 = 0.1667. Weighted: 0.2 × 4.3333 + 0.8 × 0.1667 = 1.0000.</p></div>`,
      q: `<p>An all-equity firm is worth 500 today. In one year its assets will be worth 750 or 375. Its asset beta is 1.1 and the risk-free rate is 5%. Markets are perfect. The firm issues a one-year zero-coupon bond with face value 450 and pays the proceeds to its shareholders as a special dividend. What is the beta of the new debt, to four decimals?</p>`,
      options: ["0.5704", "0.2852", "1.1407", "0.9625"],
      answer: 1,
      solution: `<p><b>ρ.</b> (1.05 × 500 − 375)/(750 − 375) = 150/375 = 0.40.</p><p><b>Claims.</b> Equity pays 300 or 0, so E = 0.40 × 300/1.05 = 114.2857. Debt pays 450 or 375, so D = (0.40 × 450 + 0.60 × 375)/1.05 = 405/1.05 = 385.7143. The dividend is 385.7143.</p><p><b>Yield and spread.</b> y = 450/385.7143 − 1 = 16.6667%, spread 16.6667% − 5% = 11.6667%.</p><p><b>Deltas.</b> Δ<sub>E</sub> = 300/375 = 0.80 and Δ<sub>D</sub> = (450 − 375)/375 = 0.20.</p><p><b>Betas.</b> β<sub>E</sub> = 0.80 × (500/114.2857) × 1.1 = 0.80 × 4.3750 × 1.1 = 3.8500. β<sub>D</sub> = 0.20 × (500/385.7143) × 1.1 = 0.20 × 1.2963 × 1.1 = <b>0.2852</b>.</p>`,
      check: `<p>D + E = 385.7143 + 114.2857 = 500 = V, so a shareholder holds 114.2857 in shares plus 385.7143 in cash: MM I ✓. Both claims earn r<sub>f</sub> under ρ: 0.40 × 300/114.2857 = 1.05 and 405/385.7143 = 1.05 ✓. The betas weight back to β<sub>U</sub>: (114.2857/500)(3.8500) + (385.7143/500)(0.2852) = 0.8800 + 0.2200 = 1.1000. That is an identity, but it catches a wrong weight.</p>`,
      traps: [
        "Used the risk-neutral probability as the debt's delta: 0.40 × 1.2963 × 1.1 = 0.5704. ρ prices the claims; Δ measures how they move with V.",
        null,
        "Used the equity's delta for the debt: 0.80 × 1.2963 × 1.1 = 1.1407.",
        "Copied the equity's leverage V/E into the debt formula: 0.20 × (500/114.2857) × 1.1 = 0.20 × 4.3750 × 1.1 = 0.9625. The debt beta scales with V/D.",
      ],
    },
    {
      id: "kreditt-13",
      title: "Exam level: two bonds, a CDS and the put (V2024 P3)",
      theory: `<p>V2024 Problem 3 (28 points) set a risk-free and a risky one-year zero side by side, in three parts. First, price both and find each one's expected return from its payoffs with the real probabilities. Second, back out the risk-neutral default probability from the risky bond's price and price a CDS that pays 1 in default. Third, value the put in the risky bond two ways: as the shortfall times the CDS price or as the price gap between the two bonds. The two routes must agree.</p>
<div class="formula"><div class="eq">r<sub>D</sub> = E<sub>real</sub>[payoff]/P<sub>2</sub> − 1 &nbsp;·&nbsp; P<sub>2</sub>(1 + r<sub>f</sub>) = (1 − q)F + q·R·F &nbsp;·&nbsp; Put = L·F × q/(1 + r<sub>f</sub>) = P<sub>1</sub> − P<sub>2</sub></div>
<div class="where">P<sub>1</sub> is the risk-free bond, P<sub>2</sub> the risky one. Real probabilities give expected returns; risk-neutral ones give prices. Close with the no-arbitrage reading: the risky bond plus CDS protection on the shortfall is the risk-free bond.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Face value 100 on both. Bond 1 yields r<sub>f</sub> = 3%. Bond 2 promises 9% and pays 80 in default, which has a real probability of 5%.</p><p>P<sub>1</sub> = 100/1.03 = 97.0874. P<sub>2</sub> = 100/1.09 = 91.7431. Expected payoff 0.95 × 100 + 0.05 × 80 = 99, so r<sub>D</sub> = 99/91.7431 − 1 = 7.9100%.</p><p>(1 − q) × 100 + q × 80 = 91.7431 × 1.03 = 94.4954, so 20q = 5.5046 and q = 0.2752. CDS = 0.2752/1.03 = 0.2672.</p><p>Put = 20 × 0.267213 = 5.3443. Also P<sub>1</sub> − P<sub>2</sub> = 97.0874 − 91.7431 = 5.3443 ✓.</p></div>`,
      q: `<p>Bond 1 is a one-year default-free zero with face value 100 and a yield of 4%. Bond 2 is a one-year corporate zero with face value 100 and a promised yield of 12.5%. It repays 100 with probability 92% and pays 75 if the issuer defaults, with probability 8%. The risk-free rate is 4%. Find the expected return on bond 2, the price of a CDS that pays 1 if the issuer defaults and the value of the put embedded in bond 2. Which line is right?</p>`,
      options: [
        "Expected return 12.5000% · CDS 0.2906 · put 7.2650",
        "Expected return 10.2500% · CDS 0.0769 · put 1.9231",
        "Expected return 4.0000% · CDS 0.0769 · put 1.9231",
        "Expected return 10.2500% · CDS 0.2906 · put 7.2650",
      ],
      answer: 3,
      solution: `<p><b>Prices and expected returns.</b> P<sub>1</sub> = 100/1.04 = 96.1538, expected return 4%. P<sub>2</sub> = 100/1.125 = 88.8889. Expected payoff 0.92 × 100 + 0.08 × 75 = 92 + 6 = 98, so r<sub>D</sub> = 98/88.8889 − 1 = 10.2500%, against 12.5000% promised.</p><p><b>q and the CDS.</b> (1 − q) × 100 + q × 75 = 88.8889 × 1.04 = 92.4444, so 25q = 7.5556 and q = 0.3022. CDS = 0.302222/1.04 = 0.2906.</p><p><b>The put.</b> It pays the shortfall of 25 in default: 25 × 0.290598 = 7.2650. From the bonds: 96.1538 − 88.8889 = 7.2650.</p><p>The right line is <b>10.2500%, 0.2906 and 7.2650</b>.</p>`,
      check: `<p>The two put routes start from different inputs and agree at 7.2650 ✓. Buy bond 2 for 88.8889 and 25 CDS contracts for 7.2650: you pay 96.1538 and receive 100 in both states, which is bond 1 ✓. The spread of 8.5% splits into 2.25% of expected loss (12.5% − 10.25%) and a 6.25% risk premium (10.25% − 4%). And q = 30.22% sits well above the real 8%.</p>`,
      traps: [
        "Gave the promised yield as the expected return: 12.5000%. Bond 2 pays 100 only if it does not default.",
        "Used the real 8% default probability for the prices: CDS 0.08/1.04 = 0.0769 and put 25 × 0.076923 = 1.9231. The route through the bond prices then fails.",
        "Swapped the two probabilities. The risk-neutral q in the expected return gives 92.4444/88.8889 − 1 = 4.0000%, which is just r<sub>f</sub>; the real 8% in the prices gives CDS 0.08/1.04 = 0.0769 and put 25 × 0.076923 = 1.9231.",
        null,
      ],
    },
    {
      id: "kreditt-14",
      title: "Exam level: coinsurance in a merger, four groups (V2024 P4)",
      theory: `<p>V2024 Problem 4 (28 points) merged two levered firms with no synergies and asked for four things: assets, debt and equity of each firm apart; the same for the merged firm; the gain or loss to all four groups of claim holders, with the check that they cancel and whether the shareholders would merge; the name of the effect. In the exam the merged debt became risk-free. If the merged firm can still default, the two bonds, which rank equally, share its assets in proportion to face value. Read the equity split from the question: usually in proportion to the pre-merger equity values.</p>
<div class="formula"><div class="eq">creditors of i in a merged default receive V<sub>merged</sub> × F<sub>i</sub>/(F<sub>A</sub> + F<sub>B</sub>)</div><div class="eq">ΔD<sub>A</sub> + ΔD<sub>B</sub> + ΔE<sub>A</sub> + ΔE<sub>B</sub> = 0 with no synergies</div>
<div class="where">The creditors gain and the shareholders lose: the coinsurance effect. No exchange ratio rescues both groups of shareholders, since it only splits a smaller equity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, risk neutral, r<sub>f</sub> = 0. A is worth 36 or 6 and owes 24; B is worth 6 or 18 and owes 12.</p><p>Apart: debt A pays 24 or 6, worth 15, equity A 6; debt B pays 6 or 12, worth 9, equity B 3.</p><p>Merged: 42 or 24 against 36, so debt 30 and equity 3. In state 2 the 24 is shared 24 × 24/36 = 16 to A's creditors and 8 to B's. Debt A = (24 + 16)/2 = 20, up 5. Debt B = (12 + 8)/2 = 10, up 1. Equity 3 split 6 : 3 gives A 2 (down 4) and B 1 (down 2). Check: 5 + 1 − 4 − 2 = 0 ✓.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 70 or 8 and owes 30. Firm B will be worth 24 or 48 and owes 40. Both debts are zero-coupon, mature at the same date and rank equally after a merger. The firms merge with no synergies. Each group of shareholders receives a share of the merged equity in proportion to its pre-merger equity value. Which line gives the change in value of each group and the shareholders' decision?</p>`,
      options: [
        "Creditors A +10.00, creditors B +2.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "Creditors A 0.00, creditors B 0.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "Creditors A +8.00, creditors B +4.00, shareholders A −10.00, shareholders B −2.00; the shareholders reject the merger",
        "No group gains or loses, since the merger adds no value; the shareholders are indifferent",
      ],
      answer: 2,
      solution: `<p><b>Apart.</b> A: debt pays 30 or 8, worth 19; equity 40 or 0, worth 20; V<sub>A</sub> = 39. B: debt pays 24 or 40, worth 32; equity 0 or 8, worth 4; V<sub>B</sub> = 36.</p><p><b>Merged.</b> Assets 94 or 56 against F = 70. Debt pays 70 or 56, worth 63; equity 24 or 0, worth 12. V = 75 = 39 + 36, so no value is created.</p><p><b>Split.</b> In state 2 the 56 is shared by face value: A's creditors get 56 × 30/70 = 24 and B's get 56 × 40/70 = 32. Debt A = (30 + 24)/2 = 27, debt B = (40 + 32)/2 = 36. The equity of 12 is split 20 : 4, so A's shareholders get 10 and B's get 2.</p>
<table class="data"><tr><th>Group</th><th>Before</th><th>After</th><th>Change</th></tr>
<tr><td>Creditors A</td><td class="n">19.00</td><td class="n">27.00</td><td class="n">+8.00</td></tr>
<tr><td>Creditors B</td><td class="n">32.00</td><td class="n">36.00</td><td class="n">+4.00</td></tr>
<tr><td>Shareholders A</td><td class="n">20.00</td><td class="n">10.00</td><td class="n">−10.00</td></tr>
<tr><td>Shareholders B</td><td class="n">4.00</td><td class="n">2.00</td><td class="n">−2.00</td></tr>
<tr><td>Total</td><td class="n">75.00</td><td class="n">75.00</td><td class="n">0.00</td></tr></table>
<p>Both shareholder groups lose, so they <b>reject</b> the merger. The effect is coinsurance: each firm's assets now back the other's debt.</p>`,
      check: `<p>Consistency check 4: the creditors gain 8 + 4 = 12 and the shareholders lose 10 + 2 = 12 while total value stays at 75 ✓. The check does not catch every slip: splitting state 2 equally gives the creditors +10 and +2, which still sums to 12. Only the pro rata rule catches that. The bound that can fail: merged equity of 12 is below the 24 the two groups held apart, so no exchange ratio can make both better off.</p>`,
      traps: [
        "Split the state 2 assets equally between the bonds, 28 each, instead of by face value: creditors A gain 29 − 19 = 10.00 and B 34 − 32 = 2.00. Check 4 still balances, so only the pro rata rule catches it.",
        "Split the smaller merged equity 20 : 4 but left both bonds at their stand-alone values of 19 and 32. The four changes then sum to −12, not 0, which check 4 catches: the merged assets back both bonds, so the creditors gain.",
        null,
        "Assumed nothing moves because there are no synergies. Total value is fixed, but value still moves from the shareholders to the creditors.",
      ],
    },
  ],
});
