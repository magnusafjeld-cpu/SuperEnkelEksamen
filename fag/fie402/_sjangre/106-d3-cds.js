/* sjanger 106 · d3-cds · Pricing default protection: the CDS */
window.EDU_DATA.sjangre.push({
  id: "d3-cds",
  num: 106,
  seksjon: "del3",
  emne: "Kreditt",
  title: "Pricing default protection: the CDS",
  summary: "Draw the tree, back out the default probability ρ, price the CDS and the protection on a bond, then check that bond plus CDS is risk-free",
  chapters: [5, 24],
  exam: "V2024 P3 (28 points) · lecture 10's CDS example, flagged for 2026",
  intro: `<p>V2024 Problem 3 was the CDS example from lecture 10 with the lecture's own numbers. Kurbatov said that very few solved it then and that a very similar example could be on this year's exam. The trap is the tree: more than half the class lost points by pricing with the survival probability. This short ladder follows the lecture's convention throughout: <b>ρ is the risk-neutral probability of default and sits in the bottom branch</b>. You draw the tree, back ρ out of a bond's price, price the CDS and the protection on a whole bond and say why ρ is so much higher than the real default probability. At the top you can solve all three parts of V2024 Problem 3.</p>`,
  steps: [
    {
      id: "d3-cds-1",
      title: "The risky bond: promised yield against expected return",
      theory: `<p>Draw the tree first; it takes ten seconds. A one-year zero-coupon bond promises its face value F. Top branch, no default: it pays F. Bottom branch, default: it pays only F(1 − LGD), where LGD is the loss given default as a fraction of F. The price comes from the promised yield y. The yield is a promise, earned only in the top branch. The expected return uses the real default probability p and the payoffs in both branches.</p>
<div class="formula"><div class="eq">P = F/(1 + y) &nbsp;·&nbsp; E[payoff] = (1 − p)·F + p·F(1 − LGD) &nbsp;·&nbsp; r = E[payoff]/P − 1</div>
<div class="where">p is the real default probability. Real probabilities give expected returns; prices need the risk-neutral one, which comes in the next step. For a risky bond r<sub>f</sub> &lt; r &lt; y.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The promised yield counts every krone as if it will arrive. Take out the expected loss and you get the expected return. That is still above r<sub>f</sub>, because defaults come in bad times and investors want a premium for bearing them.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100, y = 8%, real default probability 5%, the bond pays 70 in default.</p><p>P = 100/1.08 = 92.5926. E[payoff] = 0.95 × 100 + 0.05 × 70 = 98.50. r = 98.50/92.5926 − 1 = 6.3800%, below the promised 8%.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 11%. If the issuer defaults, the bond pays 60. Analysts put the real probability of default at 8%. The risk-free rate is 4%. What is the bond's expected return, to four decimals?</p>`,
      options: ["11.0000%", "4.0000%", "7.8000%", "7.4480%"],
      answer: 3,
      solution: `<p>Tree: no default (0.92) pays 100; default (0.08) pays 60.</p><p>P = 100/1.11 = 90.0901. E[payoff] = 0.92 × 100 + 0.08 × 60 = 92 + 4.80 = 96.80.</p><p>r = 96.80/90.0901 − 1 = <b>7.4480%</b>.</p>`,
      check: `<p>The gap between promise and expectation, 11% − 7.4480% = 3.5520%, is the expected loss 0.08 × 40 = 3.20 divided by the price: 3.20/90.0901 = 3.5520% ✓ The order r<sub>f</sub> = 4% &lt; 7.4480% &lt; 11% holds: the 3.4480% above r<sub>f</sub> is the premium for default risk.</p>`,
      traps: [
        "Gave the promised yield. 11% is earned only if the issuer pays in full; the expected return counts the default branch too.",
        "Assumed the bond earns r<sub>f</sub>. That holds only under risk-neutral probabilities; with the real 8% the expected return carries a risk premium.",
        "Used the shortcut y − p·LGD = 11% − 0.08 × 40% = 7.8000%. It is only an approximation; with the payoffs given, use them.",
        null,
      ],
    },
    {
      id: "d3-cds-2",
      title: "Backing ρ out of the bond's price",
      theory: `<p>The bond's price tells you what the market charges for default. Under risk-neutral pricing every asset earns r<sub>f</sub>, so the price equals the expected payoff under the risk-neutral probabilities, discounted at r<sub>f</sub>. Follow the lecture's convention: <b>ρ is the risk-neutral probability of default</b>. Put it in the bottom branch next to the default payoff and keep it there to the end. On the exam where this example came, more than half the class lost points by pricing with 1 − ρ, the survival probability.</p>
<div class="formula"><div class="eq">P = [(1 − ρ)·F + ρ·F(1 − LGD)]/(1 + r<sub>f</sub>) &nbsp;⟹&nbsp; ρ = [F − P(1 + r<sub>f</sub>)]/(F·LGD)</div>
<div class="where">Here ρ belongs to the bottom branch. In the share trees of the options ladders ρ sat in the up branch; in a CDS question the branch you price is default. ρ is not a forecast: it lies above the real default probability.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Discounting at r<sub>f</sub> leaves no room for a risk premium in the rate, so the premium goes into the probability. The bad branch gets more weight than it really has.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The bond from the last example (F = 100, y = 8%, pays 70 in default) with r<sub>f</sub> = 3%.</p><p>P × 1.03 = 92.5926 × 1.03 = 95.3704. So 100 − 30ρ = 95.3704 and ρ = 4.6296/30 = 0.1543, three times the real 5%.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 11% and pays 60 if the issuer defaults. Analysts put the real probability of default at 8%. The risk-free rate is 4%. What risk-neutral probability of default ρ does the bond's price imply?</p>`,
      options: ["84.2342%", "8.0000%", "15.7658%", "24.7748%"],
      answer: 2,
      solution: `<p>Tree: the top branch (1 − ρ) pays 100, the bottom branch (ρ) pays 60.</p><p>P = 100/1.11 = 90.0901, so [(1 − ρ) × 100 + ρ × 60]/1.04 = 90.0901.</p><p>100 − 40ρ = 90.0901 × 1.04 = 93.6937, so ρ = 6.3063/40 = <b>15.7658%</b>.</p>`,
      check: `<p>Reprice: (0.842342 × 100 + 0.157658 × 60)/1.04 = 93.6937/1.04 = 90.0901 ✓ With ρ in the top branch the same numbers give (0.157658 × 100 + 0.842342 × 60)/1.04 = 63.7561, nowhere near the price. And 15.7658% is about twice the real 8%, as it should be.</p>`,
      traps: [
        "Gave the survival probability 1 − ρ = 84.2342%. Define ρ as the default probability, put it in the bottom branch with the 60 and keep it there.",
        "Gave the real probability. The price is set with risk-neutral probabilities: 8% would price the bond at 96.80/1.04 = 93.0769, not 90.0901.",
        null,
        "Forgot to grow the price at r<sub>f</sub>: 100 − 40ρ = 90.0901 gives 24.7748%. The payoff arrives in a year, so it must equal 90.0901 × 1.04.",
      ],
    },
    {
      id: "d3-cds-3",
      title: "The price of a CDS that pays 1 in default",
      theory: `<p>A credit default swap (CDS) is insurance on a bond: the buyer pays a price today and is paid the loss if the issuer defaults. Price the basic contract, which pays 1 in the default branch and 0 otherwise. Its risk-neutral expected payoff is ρ × 1, discounted at r<sub>f</sub>. The price is per unit of protection: per krone or dollar paid out in default.</p>
<div class="formula"><div class="eq">CDS paying 1 in default = ρ/(1 + r<sub>f</sub>)</div>
<div class="where">ρ is the risk-neutral default probability from the bond's price: not the real probability and not 1 − ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The CDS pays exactly when the bond falls short, in the bottom branch. You are buying money in the bad state, where money is scarce, so it costs more than its real expected payout.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10)</span><p>A bond promises 100, yields 10% and pays 80 in default; r<sub>f</sub> = 5% and the real default probability is 10%. P = 100/1.10 = 90.9091. 100 − 20ρ = 90.9091 × 1.05 = 95.4545, so ρ = 0.2273.</p><p>CDS = 0.2273/1.05 = 0.2165 per dollar of protection; the slide and the exam key write 0.2164 because they cut ρ to 0.2272 instead of rounding it. That is about 21.6 cents per dollar. In class it was once called 21.64 dollars, a slip.</p></div>`,
      q: `<p>A one-year corporate zero-coupon bond with face value 100 has a promised yield of 9% and pays 75 if the issuer defaults. Analysts put the real probability of default at 6%. The risk-free rate is 3%. What is the price today of a CDS that pays 1 if the issuer defaults and nothing otherwise?</p>`,
      options: ["0.0583", "0.2138", "0.2202", "0.7571"],
      answer: 1,
      solution: `<p>P = 100/1.09 = 91.7431. The bottom branch ρ pays 75: 100 − 25ρ = 91.7431 × 1.03 = 94.4954, so ρ = 5.5046/25 = 0.220183.</p><p>CDS = 0.220183/1.03 = <b>0.2138</b> per unit of protection.</p>`,
      check: `<p>A claim that pays 1 in default plus one that pays 1 otherwise is a risk-free 1: 0.213770 + 0.779817/1.03 = 0.213770 + 0.757103 = 0.9709 = 1/1.03 ✓ The CDS also matches the bond prices: protection on the loss of 25 costs 25 × 0.213770 = 5.3443 = 100/1.03 − 91.7431 = 97.0874 − 91.7431 ✓</p>`,
      traps: [
        "Used the real 6%: 0.06/1.03 = 0.0583. Real probabilities never pair with r<sub>f</sub>; this underprices the protection by almost three quarters.",
        null,
        "Gave ρ without discounting. The CDS pays in a year, so its price today is ρ/1.03.",
        "Priced with the survival probability: (1 − 0.2202)/1.03 = 0.7571. The CDS pays in the default branch, which carries ρ.",
      ],
    },
    {
      id: "d3-cds-4",
      title: "Protection on a whole bond: λ contracts and the synthetic risk-free bond",
      theory: `<p>Each CDS contract pays 1 in default. A bond with face value F loses F × LGD in default, so to cover it you buy λ = F × LGD contracts. Kurbatov calls λ the loss at default, or the exposure. The protection costs λ times the CDS price. The bond plus the protection pays F in both branches, so together they are a <b>synthetic risk-free bond</b>, worth PV(F). That gives a second route to the price of protection: the gap between the risk-free and the risky bond.</p>
<div class="formula"><div class="eq">λ = F × LGD &nbsp;·&nbsp; protection = λ × ρ/(1 + r<sub>f</sub>)</div>
<div class="eq">P + protection = PV(F) &nbsp;⟹&nbsp; protection = PV(F) − P</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>). The protection is the put in risky debt bought back: D = PV(F) − Put.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Insure only what you can lose. In default the bond still pays F(1 − LGD), so you need cover for the rest. Bond plus cover is safe, so it must cost exactly what a government bond costs.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The bond from the example in step 2: F = 100, y = 8%, pays 70 in default, r<sub>f</sub> = 3%, ρ = 0.154321. CDS = 0.154321/1.03 = 0.149826.</p><p>λ = 100 × 0.30 = 30 contracts, costing 30 × 0.149826 = 4.4948. Bond plus protection: 92.5926 + 4.4948 = 97.0874 = 100/1.03 ✓</p></div>`,
      q: `<p>An investor holds a one-year corporate zero-coupon bond with face value 1 000 and a promised yield of 7%. If the issuer defaults, the bond repays 55% of face value. The risk-free rate is 2.5%. CDS contracts on the issuer pay 1 per contract in default. What does it cost today to protect the bond fully against default?</p>`,
      options: ["41.0303", "91.1785", "50.1482", "42.0561"],
      answer: 0,
      solution: `<p>P = 1 000/1.07 = 934.5794. The bottom branch ρ pays 550: 1 000 − 450ρ = 934.5794 × 1.025 = 957.9439, so ρ = 42.0561/450 = 0.0934579.</p><p>CDS = 0.0934579/1.025 = 0.0911785 per contract. λ = 1 000 × 0.45 = 450 contracts.</p><p>Protection = 450 × 0.0911785 = <b>41.0303</b>.</p>`,
      check: `<p>Second route: PV(F) − P = 1 000/1.025 − 1 000/1.07 = 975.60976 − 934.57944 = 41.0303 ✓ State by state: with no default the bond pays 1 000 and the contracts 0; in default the bond pays 550 and the 450 contracts pay 450. Either way 1 000: a synthetic risk-free bond ✓</p>`,
      traps: [
        null,
        "Bought one contract per unit of face value: 1 000 × 0.0911785 = 91.1785. The bond still repays 550 in default, so only the loss of 450 needs cover.",
        "Covered the recovery instead of the loss: 550 × 0.0911785 = 50.1482. λ = F × LGD = 450.",
        "Forgot to discount: 450 × 0.0934579 = 42.0561 is the protection's risk-neutral expected payout in a year.",
      ],
    },
    {
      id: "d3-cds-5",
      title: "Why ρ is above the real default probability",
      theory: `<p>ρ is almost always far above the real default probability: 22.7% against 10% in the lecture's example. Two readings are tempting and wrong. ρ is not the market's forecast of default. Nor is the gap a free lunch. Defaults cluster in recessions, when a krone is worth most to investors. They pay up for protection that pays in those states, so the default branch is priced as if it were more likely than it is. Risk-neutral pricing discounts at r<sub>f</sub>, so the whole premium has to sit in the probability.</p>
<div class="formula"><div class="eq">price of protection − PV(expected loss at the real p) = risk premium</div>
<div class="where">Expected loss uses the real probability: PD × LGD × exposure, as in the guest lecture. The CDS price uses ρ. The gap is what investors charge for bearing default risk.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Insurance that pays in a crisis is worth more than its average payout. A seller of protection earns the premium on average but pays out exactly when everything else is going badly.</p></div>`,
      example: `<div class="worked"><span class="wh">Example (lecture 10)</span><p>Real default probability 10%, ρ = 22.73%, loss in default 20. Protection costs 20 × 0.216450 = 4.3290.</p><p>The expected loss at the real probability, discounted, is 0.10 × 20/1.05 = 1.9048. The gap of 4.3290 − 1.9048 = 2.4242 is the risk premium.</p></div>`,
      q: `<p>A one-year bond's price implies a risk-neutral default probability ρ of 22%. Rating analysts put the real default probability at 9%. Which statement is right?</p>`,
      options: [
        "The gap is an arbitrage: defaults happen only 9% of the time, so selling protection at the ρ price locks in a sure profit.",
        "Defaults come in bad times, when money is worth most; pricing at r<sub>f</sub> moves that risk premium into the probability, so ρ exceeds 9%.",
        "ρ is the market's forecast: investors expect 22% of such issuers to default, so the analysts' 9% is too optimistic.",
        "The two differ only because the price is discounted at r<sub>f</sub>; discounted at the bond's promised yield, the implied ρ would equal 9%.",
      ],
      answer: 1,
      solution: `<p>Investors value a krone more in recessions, when defaults cluster. A claim that pays in default is insurance against bad times. Investors pay a premium for it. Risk-neutral pricing discounts everything at r<sub>f</sub>, so the premium must go into the probability: ρ = 22% weights the default branch as if it were more than twice as likely as the real 9%. <b>ρ is a price, not a forecast.</b></p>`,
      check: `<p>Test the arbitrage claim on a seller of one unit of protection, say with r<sub>f</sub> = 4%. The price is 0.22/1.04 = 0.2115. With no default the seller keeps it; in default the seller pays 1 and ends down 1 − 0.2115 × 1.04 = 0.78. A strategy that can lose 0.78 is not an arbitrage ✓ The real expected payout, 0.09/1.04 = 0.0865, is below the price: the seller earns the risk premium on average, not for sure.</p>`,
      traps: [
        "Not an arbitrage. Selling protection earns the premium on average but loses heavily in the default state, which is exactly when losses hurt most.",
        null,
        "ρ is not a forecast. It is the probability that makes prices work at r<sub>f</sub>, so it carries the risk premium; it says nothing about the analysts being wrong.",
        "Discounting at the promised yield assumes the bond always pays in full, so the implied ρ would be 0, not 9%. Real probabilities go with expected returns, ρ with r<sub>f</sub>.",
      ],
    },
    {
      id: "d3-cds-6",
      title: "Exam level: two bonds, ρ, the CDS and the put (V2024 P3)",
      theory: `<p>V2024 Problem 3 (28 points) was lecture 10's CDS example with the same numbers. Kurbatov has said a very similar example could come again. It had three parts. Part a: price a risk-free and a risky one-year zero and find each one's expected return with the real probabilities. Part b: back ρ out of the risky bond's price and price a CDS that pays 1 in default. Part c: value the put in the risky bond two ways: as the loss times the CDS price and as the price gap between the two bonds. Draw the tree before you write an equation, with ρ in the default branch.</p>
<div class="formula"><div class="eq">P = F/(1 + y), &nbsp; r = E<sub>real</sub>[payoff]/P − 1</div>
<div class="eq">ρ = [F − P<sub>2</sub>(1 + r<sub>f</sub>)]/(F·LGD), &nbsp; CDS = ρ/(1 + r<sub>f</sub>)</div>
<div class="eq">Put = λ × CDS = P<sub>1</sub> − P<sub>2</sub>, &nbsp; λ = F × LGD</div>
<div class="where">P<sub>1</sub> is the risk-free bond, P<sub>2</sub> the risky one. Close with the no-arbitrage line: the risky bond plus λ CDS contracts costs P<sub>1</sub> and pays F for sure.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Three numbers sit in one tree: the promise (y), the real expectation (r) and the price of the bad branch (ρ). Keep the real probability for part a and ρ for parts b and c.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Bond 1 yields r<sub>f</sub> = 2%. Bond 2 promises 6.5%, pays 85 in default and has a real default probability of 4%.</p><p>Part a: P<sub>1</sub> = 100/1.02 = 98.0392 and P<sub>2</sub> = 100/1.065 = 93.8967. E[payoff] = 0.96 × 100 + 0.04 × 85 = 99.40, so r = 99.40/93.8967 − 1 = 5.8610%.</p><p>Part b: 100 − 15ρ = 93.8967 × 1.02 = 95.7746, so ρ = 4.2254/15 = 0.281690. CDS = 0.281690/1.02 = 0.276167.</p><p>Part c: put = 15 × 0.276167 = 4.1425 = 98.0392 − 93.8967 ✓</p></div>`,
      q: `<p>Bond 1 is a one-year default-free zero-coupon bond with face value 100 and a yield of 3.5%. Bond 2 is a one-year corporate zero-coupon bond with face value 100 and a promised yield of 9.5%. Bond 2 repays 100 with probability 93% and pays 72 if the issuer defaults, with probability 7%. The risk-free rate is 3.5%. Find the expected return on bond 2, the risk-neutral default probability ρ, the price of a CDS that pays 1 in default and the value of the put embedded in bond 2. Which line is right?</p>`,
      options: [
        "Expected return 9.5000% · ρ 0.1957 · CDS 0.1891 · put 5.2942",
        "Expected return 7.3538% · ρ 0.8043 · CDS 0.7771 · put 21.7590",
        "Expected return 7.3538% · ρ 0.1957 · CDS 0.1891 · put 5.2942",
        "Expected return 7.3538% · ρ 0.0700 · CDS 0.0676 · put 1.8937",
      ],
      answer: 2,
      solution: `<p><b>Part a.</b> P<sub>1</sub> = 100/1.035 = 96.6184, expected return 3.5%. P<sub>2</sub> = 100/1.095 = 91.3242. E[payoff] = 0.93 × 100 + 0.07 × 72 = 93 + 5.04 = 98.04, so r = 98.04/91.3242 − 1 = 7.3538%.</p><p><b>Part b.</b> Bottom branch ρ pays 72: 100 − 28ρ = 91.3242 × 1.035 = 94.5205, so ρ = 5.4795/28 = 0.195695. CDS = 0.195695/1.035 = 0.189077.</p><p><b>Part c.</b> The put pays the loss of 28 in default: 28 × 0.189077 = 5.2942. From the bonds: 96.6184 − 91.3242 = 5.2942.</p><p>The right line is <b>7.3538%, 0.1957, 0.1891 and 5.2942</b>.</p>`,
      check: `<p>The two put routes agree at 5.2942 ✓ They must, since ρ came from the same two prices, so this checks the arithmetic. It does catch a swap of ρ and 1 − ρ after the first step: the survival probability gives 21.7590 by the CDS route against 5.2942 from the bonds. Buy bond 2 for 91.3242 and 28 CDS contracts for 5.2942: you pay 96.6184 and get 100 in both branches, which is bond 1 ✓ The 6% spread splits into 2.1462% of expected loss (9.5% − 7.3538%) and a 3.8538% risk premium (7.3538% − 3.5%).</p>`,
      traps: [
        "Gave the promised yield as the expected return. Bond 2 pays 100 only in the top branch: 98.04/91.3242 − 1 = 7.3538%.",
        "Priced with the survival probability 1 − ρ = 0.8043, so the CDS and the put sit in the wrong branch. The bond route still gives 5.2942, so the two routes disagree.",
        null,
        "Used the real 7% for the prices: CDS 0.07/1.035 = 0.0676 and put 28 × 0.067633 = 1.8937. The bond route gives 5.2942, so the two routes disagree.",
      ],
    },
  ],
});
