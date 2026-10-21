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
      theory: `<p>A corporate borrower can default. Let p be the probability of default over the year and R the recovery rate, the fraction of face value the creditors collect if it happens. The loss given default is L = 1 − R. The yield y assumes nothing goes wrong. The <b>expected return</b> r<sub>D</sub> takes off the expected loss. It is r<sub>D</sub>, not y, that is the cost of debt in a WACC. The course formula is not on the formula sheet: memorise it.</p>
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
      id: "kreditt-3",
      title: "The credit spread: expected loss plus a risk premium",
      theory: `<p>The credit spread is the promised yield over the risk-free rate of the same maturity. It holds two different things. The expected loss p·L is money the lender does not expect to get, so it compensates for nothing. The rest, r<sub>D</sub> − r<sub>f</sub>, is a genuine premium for bearing default risk that strikes in bad times. Only that part is priced by the CAPM, so never compute the debt beta from the yield.</p>
<div class="formula"><div class="eq">spread = y − r<sub>f</sub> = p·L + (r<sub>D</sub> − r<sub>f</sub>)</div><div class="eq">β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">E[R<sub>mkt</sub>] − r<sub>f</sub> is the market risk premium. The first line is the course formula r<sub>D</sub> = y − p·L rearranged.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>y = 7%, r<sub>f</sub> = 3%, p = 2%, L = 0.60 and a market risk premium of 5%.</p><p>Spread = 7% − 3% = 4.0%. Expected loss p·L = 1.2%. r<sub>D</sub> = 7% − 1.2% = 5.8%, so the risk premium is 5.8% − 3% = 2.8%. β<sub>D</sub> = 0.028/0.05 = 0.56.</p></div>`,
      q: `<p>A bond has a promised yield of 8.5%. The risk-free rate is 4% and the market risk premium is 6%. The probability of default is 3% and the loss given default is 50%. What is the debt beta?</p>`,
      options: ["0.7500", "0.5000", "0.2500", "1.1667"],
      answer: 1,
      solution: `<p>Spread = 8.5% − 4% = 4.5%. Expected loss p·L = 0.03 × 0.50 = 1.5%.</p><p>r<sub>D</sub> = 8.5% − 1.5% = 7.0%, so the risk premium is 7.0% − 4% = 3.0%.</p><p>β<sub>D</sub> = 0.030/0.06 = <b>0.5000</b>.</p>`,
      check: `<p>Backwards through the CAPM: 4% + 0.5 × 6% = 7.0% = r<sub>D</sub> ✓. The test the wrong answers fail: a beta of 0.75 would put the expected return at 4% + 0.75 × 6% = 8.5%, the promised yield, which lenders do not expect to earn when default is possible.</p>`,
      traps: [
        "Computed the beta from the whole spread: (8.5% − 4%)/6% = 0.7500. The expected loss is not a risk premium.",
        null,
        "Priced the expected loss instead of the premium: 1.5%/6% = 0.2500.",
        "Forgot to subtract the risk-free rate: 7.0%/6% = 1.1667.",
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
<div class="where">PV(F) = F/(1 + r<sub>f</sub>)<sup>T</sup> is the value of the same promise if it were risk-free. Put and Call are options on V with strike F and the debt's maturity. The put enters with a minus: it is worth something to the shareholders, not to the lender.</div></div>`,
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
      id: "kreditt-7",
      title: "Yield and credit spread from the value of the debt",
      theory: `<p>Once you have the market value D of a zero-coupon debt, its promised yield is the rate that turns D into F, exactly as in the first step. The credit spread is that yield minus r<sub>f</sub>. D can come from a tree or from traded option prices. If the firm is all-equity, its shares are claims on the assets, so options on the shares are options on V: n puts with strike F/n on its n shares are one put on V with strike F. 2016 Problem 4 gave option prices on an all-equity firm's shares and asked for the yield its debt would carry.</p>
<div class="formula"><div class="eq">D = PV(F) − n × Put<sub>share</sub> &nbsp;·&nbsp; y = (F/D)<sup>1/T</sup> − 1 &nbsp;·&nbsp; spread = y − r<sub>f</sub></div>
<div class="where">n is the number of shares. Put<sub>share</sub> is the price of one put on a share with strike F/n and maturity T. Quote y and r<sub>f</sub> on the same compounding basis, per year.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An all-equity firm has 100 million shares at 30.00. It plans a zero-coupon bond with F = 2 400 million due in one year, so the strike per share is 2 400/100 = 24.00. A one-year put on the shares with strike 24.00 costs 1.20 and r<sub>f</sub> = 4%.</p><p>PV(F) = 2 400/1.04 = 2 307.6923. Puts: 100 × 1.20 = 120.00. D = 2 307.6923 − 120.00 = 2 187.6923.</p><p>y = 2 400/2 187.6923 − 1 = 9.7046%. Spread = 9.7046% − 4% = 5.7046%.</p></div>`,
      q: `<p>An all-equity firm has 250 million shares at 48.00. It considers issuing a zero-coupon bond with face value 10 000 million due in two years and paying out the proceeds. Markets are perfect. A two-year European put on its shares with strike 40.00 trades at 2.60. The two-year risk-free rate is 3% a year with annual compounding. What credit spread per year would the bond carry, to four decimals?</p>`,
      options: ["3.5282%", "−3.3776%", "3.7463%", "0.4175%"],
      answer: 2,
      solution: `<p>The strike per share is 10 000/250 = 40.00, so the 250 million puts make one put on the assets with strike 10 000: 250 × 2.60 = 650.00 million.</p><p>PV(F) = 10 000/1.03<sup>2</sup> = 10 000/1.0609 = 9 425.9591.</p><p>D = 9 425.9591 − 650.0000 = 8 775.9591.</p><p>y = (10 000/8 775.9591)<sup>1/2</sup> − 1 = 1.139477<sup>1/2</sup> − 1 = 6.7463%. Spread = 6.7463% − 3% = <b>3.7463%</b>.</p>`,
      check: `<p>Price the bond back at its yield: 10 000/1.0674627<sup>2</sup> = 8 775.96 ✓. The spread is positive and D lies below PV(F), as risky debt must. The equity left after the payout, 12 000 − 8 775.9591 = 3 224.0409, is positive too.</p>`,
      traps: [
        "Mixed compounding bases: took the continuously compounded yield ln(10 000/8 775.9591)/2 = 6.5282% and subtracted the annually compounded 3%, giving 3.5282%. Put y and r<sub>f</sub> on the same basis.",
        "Added the puts instead of subtracting them: D = 9 425.9591 + 650 = 10 075.9591, so y = −0.3776% and the spread −3.3776%.",
        null,
        "Subtracted the puts from the undiscounted face value: D = 10 000 − 650 = 9 350, so y = 3.4175% and the spread 0.4175%.",
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
      id: "kreditt-9",
      title: "The beta of equity as a call: N(d1) times V/E",
      theory: `<p>Equity is a call on the assets, so it moves with them by the option's delta: how much E changes when V changes by 1. In a tree the delta is Δ = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>); in Black-Scholes it is N(d<sub>1</sub>). A 1% move in V moves E by Δ·V/E per cent, so beta scales the same way. An exam that wants numbers must hand you N(d<sub>1</sub>) and N(d<sub>2</sub>), since the formula sheet has no N(d) table. Neither formula below is on the sheet.</p>
<div class="formula"><div class="eq">E = V·N(d<sub>1</sub>) − PV(F)·N(d<sub>2</sub>)</div><div class="eq">β<sub>E</sub> = N(d<sub>1</sub>)·(V/E)·β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = [1 − N(d<sub>1</sub>)]·(V/D)·β<sub>U</sub></div>
<div class="where">The first line is Black-Scholes applied to the firm's assets, with the face value as strike. β<sub>U</sub> is the beta of the assets. In a tree, replace N(d<sub>1</sub>) by Δ. Weighting the two betas by E/V and D/V returns β<sub>U</sub>, but that is an identity: it holds for any N(d<sub>1</sub>).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 800, PV(F) = 500, N(d<sub>1</sub>) = 0.8830, N(d<sub>2</sub>) = 0.7549, β<sub>U</sub> = 1.0.</p><p>E = 800 × 0.8830 − 500 × 0.7549 = 706.40 − 377.45 = 328.95. V/E = 800/328.95 = 2.431981.</p><p>β<sub>E</sub> = 0.8830 × 2.4320 × 1.0 = 2.1474.</p></div>`,
      q: `<p>A firm's assets are worth 900 and have a beta of 1.2. Its only debt is a zero-coupon bond whose face value has a present value of 600 at the risk-free rate. Black-Scholes on the assets gives N(d<sub>1</sub>) = 0.8556 and N(d<sub>2</sub>) = 0.7126. What is the equity beta?</p>`,
      options: ["3.1535", "2.6981", "2.2472", "3.0802"],
      answer: 1,
      solution: `<p>E = 900 × 0.8556 − 600 × 0.7126 = 770.04 − 427.56 = 342.48.</p><p>V/E = 900/342.48 = 2.6279.</p><p>β<sub>E</sub> = 0.8556 × 2.6279 × 1.2 = <b>2.6981</b>.</p>`,
      check: `<p>D = 900 − 342.48 = 557.52 and β<sub>D</sub> = 0.1444 × (900/557.52) × 1.2 = 0.2797. Weighted: (342.48/900)(2.6981) + (557.52/900)(0.2797) = 1.0267 + 0.1733 = 1.2000 = β<sub>U</sub>, an arithmetic check only. The bound that can fail: β<sub>E</sub> must lie below (V/E)β<sub>U</sub> = 3.1535, the value if the debt were riskless, because risky debt carries part of the asset risk.</p>`,
      traps: [
        "Left out N(d<sub>1</sub>): (900/342.48) × 1.2 = 3.1535. That is linear relevering with a zero debt beta.",
        null,
        "Used N(d<sub>2</sub>) where N(d<sub>1</sub>) belongs: 0.7126 × 2.6279 × 1.2 = 2.2472. N(d<sub>2</sub>) is a probability, not the delta.",
        "Valued equity as V − PV(F) = 300, as if the debt were risk-free: 0.8556 × (900/300) × 1.2 = 3.0802.",
      ],
    },
    {
      id: "kreditt-10",
      title: "Equity risk when the firm nears default",
      theory: `<p>As the asset value falls towards the face value of the debt, two things happen to β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub>. The delta N(d<sub>1</sub>) falls, because the call moves out of the money. But E falls much faster than N(d<sub>1</sub>)·V, so V/E shoots up. The second effect wins: equity near default is a thin, highly geared claim and its beta rises steeply. The debt beta rises too, because the lenders now carry part of the asset risk. So the linear formula with β<sub>D</sub> = 0 overstates β<sub>E</sub>.</p>
<div class="formula"><div class="eq">V ↓ ⟹ N(d<sub>1</sub>) ↓ but V/E ↑ faster ⟹ β<sub>E</sub> ↑ &nbsp;·&nbsp; β<sub>D</sub> ↑</div>
<div class="where">N(d<sub>1</sub>)·V/E is the call's elasticity: the per cent change in E for a 1% change in V. The further out of the money a call is, the larger its elasticity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Take the firm from the last step and let its assets fall, holding PV(F) = 600, the asset volatility and β<sub>U</sub> = 1.2 fixed.</p>
<table class="data"><tr><th>V</th><th>N(d<sub>1</sub>)</th><th>E</th><th>V/E</th><th>β<sub>E</sub></th><th>β<sub>D</sub></th><th>(V/E)β<sub>U</sub></th></tr>
<tr><td class="n">1 200</td><td class="n">0.9491</td><td class="n">615.66</td><td class="n">1.9491</td><td class="n">2.2199</td><td class="n">0.1254</td><td class="n">2.3390</td></tr>
<tr><td class="n">900</td><td class="n">0.8556</td><td class="n">342.48</td><td class="n">2.6279</td><td class="n">2.6981</td><td class="n">0.2797</td><td class="n">3.1535</td></tr>
<tr><td class="n">700</td><td class="n">0.7117</td><td class="n">184.27</td><td class="n">3.7988</td><td class="n">3.2443</td><td class="n">0.4696</td><td class="n">4.5585</td></tr></table>
<p>From 1 200 to 700 the delta falls by a quarter while V/E almost doubles, so β<sub>E</sub> rises from 2.2199 to 3.2443. The last column, which assumes riskless debt, overshoots more and more.</p></div>`,
      q: `<p>Over a bad year a firm's asset value falls until its equity is a thin slice above the present value of its debt. Its asset beta and its zero-coupon debt are unchanged. No N(d) values are given. What happens to the equity beta and why?</p>`,
      options: [
        "It rises: E shrinks much faster than N(d<sub>1</sub>)·V, so each krone of equity carries more of the asset risk.",
        "It falls: N(d<sub>1</sub>) drops as the call moves out of the money and outweighs the rise in V/E.",
        "It stays where it was: leverage moves risk between the claims while the asset beta is unchanged.",
        "It rises exactly as β<sub>U</sub>(1 + D/E) predicts, since the debt keeps a beta of zero near default.",
      ],
      answer: 0,
      solution: `<p>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub>. As V falls, N(d<sub>1</sub>) falls, but E falls much faster: it is a small residual on top of a large debt claim. V/E rises steeply and the product rises. Equity near default is a deep out-of-the-money call, the most geared claim on the firm, so <b>β<sub>E</sub> rises</b>.</p><p>It rises by less than the linear formula with β<sub>D</sub> = 0 says, because the debt beta also rises: the lenders now carry part of the asset risk.</p>`,
      check: `<p>In the example, β<sub>E</sub> rises from 2.2199 to 3.2443 between V = 1 200 and V = 700. The weighted betas still return β<sub>U</sub> at 700: (184.27/700)(3.2443) + (515.73/700)(0.4696) = 0.8540 + 0.3460 = 1.2000. That is an identity, so it confirms the arithmetic, not the direction; the direction comes from V/E rising faster than N(d<sub>1</sub>) falls.</p>`,
      traps: [
        null,
        "N(d<sub>1</sub>) does fall, but E falls much faster, so V/E rises by more: from V = 1 200 to 700 the delta drops by a quarter while V/E almost doubles.",
        "The asset beta is fixed, but equity's share of the assets shrinks, so the same risk sits on a smaller base. Only the weighted average of β<sub>E</sub> and β<sub>D</sub> stays at β<sub>U</sub>.",
        "Near default the debt is far from risk-free. β<sub>D</sub> rises, so β<sub>E</sub> rises by less than β<sub>U</sub>(1 + D/E): 3.2443 against 4.5585 at V = 700.",
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
      id: "kreditt-12",
      title: "Exam level: a debt-financed payout priced as options (2015 P4, 2022 P4)",
      theory: `<p>2015 Problem 4 (90 points) ran this chain on one firm: an all-equity firm issues zero-coupon debt and pays the proceeds out as a special dividend. Value the equity and the debt, then the yield and the credit spread, then the betas of both claims after the payout. 2022 Problem 4 (48 points) asked for the first links in a binomial tree. In a tree the delta Δ plays the role of N(d<sub>1</sub>). Close with D + E = V, which is MM I: the shareholder holds the dividend plus the levered shares.</p>
<div class="formula"><div class="eq">ρ → E, D → y = F/D − 1 → Δ<sub>E</sub> = (E<sub>u</sub> − E<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) → β<sub>E</sub> = Δ<sub>E</sub>(V/E)β<sub>U</sub> &nbsp;·&nbsp; β<sub>D</sub> = (1 − Δ<sub>E</sub>)(V/D)β<sub>U</sub></div>
<div class="where">The debt's own delta is Δ<sub>D</sub> = (D<sub>u</sub> − D<sub>d</sub>)/(V<sub>u</sub> − V<sub>d</sub>) = 1 − Δ<sub>E</sub>. The beta of the all-equity firm before the payout is β<sub>U</sub>. With Black-Scholes the exam hands you N(d<sub>1</sub>) and N(d<sub>2</sub>) and the chain is the same.</div></div>`,
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
