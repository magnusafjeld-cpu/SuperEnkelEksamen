/* kj3 · Taxes, the interest tax shield and the trade-off */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Taxes, the interest tax shield and the trade-off",
  chapters: [7, 8],
  html: `
<div class="callout kort"><span class="h">In short</span>Taxes are the first reason debt can create value. Interest is tax deductible, so a firm with debt pays less tax and more of its cash reaches investors. That saving is the interest tax shield. This part shows how to value it, who captures the gain when a firm takes on debt (the existing shareholders) and why firms still do not borrow without limit: more debt also raises the expected costs of financial distress. The trade-off theory weighs the two.</div>

<p class="lead-in">Taxes are the first friction that makes capital structure matter: 2022 Problem 1, 2023 Problem 1 and 2015 Problem 3 are built on the tax shield, and H2025 Exercise 4 computes it year by year. Distress costs are the counterweight the examiner expects you to name.</p>

<h3>The interest tax shield</h3>
<p>Interest is tax-deductible; dividends are not. The tax saved is a real cash flow to investors:</p>
<div class="formula"><div class="eq">TS = τ<sub>c</sub> × interest = τ<sub>c</sub> × r<sub>D</sub> × D</div>
<div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</div>
<div class="where">Not on the formula sheet. V<sup>U</sup> is free cash flow discounted at r<sub>U</sub>. Whenever you write the second line, say which rate discounted the shield.</div></div>
<p>Debt that is fixed and never repaid gives a level perpetuity as safe as the interest, so it is discounted at r<sub>D</sub>, which cancels:</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub>r<sub>D</sub>D / r<sub>D</sub> = τ<sub>c</sub>D ⟹ V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D</div>
<div class="where">Valid only for fixed, permanent debt, and the most the shield can be worth for debt that never grows. For a firm that rebalances to a target ratio it overstates value (the full rule is in kj4).</div></div>
<div class="callout mech"><span class="h">Why does leverage create value when the assets did not change?</span>Taxes add a third claimant, the government, whose slice depends on the financing mix. Debt shrinks that slice and leaves more for investors. Leverage creates no cash; it redirects a payment.</div>
<p>The shield also shows up as a lower rate: under the course's rebalancing convention r<sub>wacc</sub> = r<sub>U</sub> − (D/V)r<sub>D</sub>τ<sub>c</sub>, which falls as leverage rises.</p>

<h3>Who captures the gain, and when</h3>
<p>Lenders pay a fair price for their bonds and gain nothing. The whole PV(TS) goes to the shareholders who own the firm when the plan becomes credible, before any debt is issued:</p>
<div class="formula"><div class="eq">ΔP = PV(TS)/N<sub>0</sub> · n = D/P<sub>1</sub>, with P<sub>1</sub> = P<sub>0</sub> + ΔP</div>
<div class="where">N<sub>0</sub> is the share count before anything happens. The buyback executes at P<sub>1</sub>, not P<sub>0</sub>: the only change from the no-tax case in kj2.</div></div>
<div class="worked"><span class="wh">Worked example: a debt-financed buyback with taxes</span>
<p>Fjellheim AS is all-equity: V<sup>U</sup> = 600 on 20 million shares, P<sub>0</sub> = 30.00, τ<sub>c</sub> = 25%. It announces 200 of permanent risk-free debt at r<sub>D</sub> = r<sub>f</sub> = 5.0000% to repurchase shares. Millions.</p>
<p><b>Step 1: the shield.</b> TS = 0.25 × 0.05 × 200 = 2.50 a year; fixed and permanent, so PV(TS) = 2.50/0.05 = 50.00 = τ<sub>c</sub>D and V<sup>L</sup> = 650.00.</p>
<p><b>Step 2: the announcement.</b> All 650.00 is still equity on 20 million shares: P<sub>1</sub> = 32.50, a jump of 50.00/20 = 2.50.</p>
<p><b>Step 3: the buyback at 32.50.</b> n = 200/32.50 = 6.1538 million, leaving 13.8462 million, and (650.00 − 200)/13.8462 = 32.50. The old shareholders hold 450.00 + 200 = 650.00 against 600: the whole 50.00 is theirs.</p>
<p><b>Check:</b> 450.00 + 200 = 650.00 is nearly an identity. What can fail is the price: buy at the stale 30.00 and you retire 6.6667 million shares, implying 450.00/13.3333 = 33.75, two prices for one share.</p></div>

<h3>Financial distress and the trade-off</h3>
<p>Why is no firm all debt? Handing the assets to creditors is free; the process is not. <b>Direct costs</b> (lawyers, courts, management time) run about 3–4% of value. <b>Indirect costs</b> run 10–20%: customers and staff leave, suppliers demand cash, assets are fire-sold, mostly before any court is involved.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(financial distress costs)</div>
<div class="where">The third term is the expected, discounted deadweight loss: value nobody receives, never the transfer to creditors. It grows with leverage and asset volatility. Not on the formula sheet.</div></div>
<div class="callout mech"><span class="h">Why do shareholders pay for a bankruptcy they will not attend?</span>Creditors price the expected loss into the bond and pay less for the same promise. Ex post the costs land on creditors; ex ante shareholders bear them all, through the share price at the announcement.</div>
<p>The shield rises linearly in D while distress costs accelerate, so value peaks at an interior D*: borrow while the next step adds more shield than distress cost, and in a schedule compare differences, not levels. Personal taxes cut the advantage to τ* = 1 − (1 − τ<sub>c</sub>)(1 − τ<sub>e</sub>)/(1 − τ<sub>i</sub>), below τ<sub>c</sub> when interest income is taxed more heavily than equity income.</p>
<div class="callout warn"><span class="h">Errors that lose points</span>(1) V<sup>U</sup> + τ<sub>c</sub>D for a firm that keeps a target ratio. (2) Repurchasing at P<sub>0</sub> after a value-creating announcement. (3) Dividing the gain by the post-buyback share count. (4) Counting what creditors lose in default as the distress cost: only value nobody receives counts.</div>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>V<sup>L</sup> = V<sup>U</sup> + PV(TS); fixed permanent debt gives PV(TS) = τ<sub>c</sub>D, the most the shield can be worth for debt that never grows.</li>
<li>With taxes the share price jumps by PV(TS)/N<sub>0</sub> at the announcement, and the buyback executes at that new price: n = D/P<sub>1</sub>.</li>
<li>Lenders gain nothing; the pre-announcement shareholders capture the whole PV(TS).</li>
<li>Shareholders bear expected distress costs up front, because creditors price them into the debt.</li>
<li>Trade-off: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs); borrow while the marginal shield exceeds the marginal distress cost.</li></ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "An all-equity firm worth V<sup>U</sup> = 800 with 40 million shares announces that it will issue 160 of permanent debt and use it to buy back shares. τ<sub>c</sub> = 25%. What is the share price just after the announcement?",
      options: [
        "20.00: the price moves only when the debt is issued and the shares are bought back",
        "21.25: the 40 of PV(TS) is shared among the 32 million shares left after a buyback at 20.00",
        "24.00: the 160 raised is added to the 800 and spread over the 40 million shares",
        "21.00: PV(TS) = τ<sub>c</sub>D = 40 accrues at once to the 40 million existing shares",
      ],
      answer: 3,
      explanation: "Permanent debt gives PV(TS) = 0.25 × 160 = 40, and the market prices it the moment the plan is credible: (800 + 40)/40 = 21.00. The tempting 21.25 divides by the post-buyback share count, but no shares have been bought at the announcement, and the buyback then executes at 21.00, retiring 7.6190 million shares and leaving the price at 21.00. The cash raised is not value: it goes straight back out to the sellers.",
    },
    {
      id: "kj3-s2",
      q: "A firm issues bonds that carry a real chance of default, and in default lawyers' fees and fire sales will destroy part of the assets. Who bears the expected cost of that destruction, and when?",
      options: [
        "The shareholders, today: bondholders price in the loss and pay less for the bonds",
        "The bondholders, in default: the costs are paid out of assets the creditors then own",
        "Nobody until default actually happens; before that it is only a probability",
        "Shareholders and bondholders equally, since both claims are affected when the firm is in distress",
      ],
      answer: 0,
      explanation: "Debt is sold at a fair price, so bondholders price the expected loss into what they pay and earn a fair return anyway. The shortfall lands on the shareholders who sell the claim, and it reaches the share price when the debt is announced. The answer that puts the cost on bondholders describes who pays ex post, not who bears it ex ante.",
    },
    {
      id: "kj3-s3",
      q: "A firm is choosing permanent debt in steps of 50. With τ<sub>c</sub> = 25%, each step adds 12.50 of tax shield. PV(financial distress costs) is 4.00 at D = 100, 10.00 at D = 150, 21.00 at D = 200 and 36.00 at D = 250. Which debt level maximises firm value?",
      options: [
        "D = 250: the total shield there (62.50) still exceeds the total distress costs (36.00)",
        "D = 150: after 150 the value added per step falls, from 6.50 to 1.50",
        "D = 200: the step to 200 adds 1.50 of value and the step to 250 subtracts 2.50",
        "As much debt as possible: every step adds 12.50 of tax shield, whatever it costs",
      ],
      answer: 2,
      explanation: "The rule is marginal: take a step while its shield exceeds its added distress cost. From 150 to 200 it adds 12.50 against 11.00, from 200 to 250 it adds 12.50 against 15.00, so stop at 200. The answer comparing totals at 250 confuses a positive total gain with a positive marginal gain; value there is 26.50 above V<sup>U</sup>, against 29.00 at 200.",
    },
  ],
  case: {
    id: "kj3-m1",
    open: true,
    topic: "Permanent debt, the announcement price and distress costs",
    points: 6,
    minutes: 10,
    body: `<p>Stord Verft ASA is all-equity financed. It generates a free cash flow of NOK 56 million a year in perpetuity, its unlevered cost of capital is r<sub>U</sub> = 8.0000%, and it has 25 million shares outstanding. The corporate tax rate is τ<sub>c</sub> = 22%. The board announces, as a surprise, that the firm will borrow NOK 200 million at r<sub>D</sub> = 4.0000%, keep exactly that amount outstanding forever, and use the proceeds to repurchase shares at the market price. Ignore distress costs in (a) and (b).</p>
<p>(a) Compute the share price before the announcement, the present value of the interest tax shield and V<sup>L</sup>. State the rate at which you discount the shield and why. (2 points)</p>
<p>(b) Compute the share price just after the announcement, the number of shares repurchased and the share price after the buyback. (2 points)</p>
<p>(c) The advisers now estimate that this debt adds NOK 18 million of present value of financial distress costs. Recompute the announcement price, and explain who bears the distress costs and when. (2 points)</p>`,
    solution: `<p><b>(a) Price, shield and levered value.</b> V<sup>U</sup> = 56/0.08 = 700.00, so P<sub>0</sub> = 700.00/25 = 28.00. The debt is fixed and permanent, so the shield is as safe as the interest and is discounted at r<sub>D</sub>: TS = 0.22 × 0.04 × 200 = 1.76 a year, PV(TS) = 1.76/0.04 = 44.00 = τ<sub>c</sub>D. V<sup>L</sup> = 700.00 + 44.00 = 744.00.</p>
<p><b>(b) Announcement and buyback.</b> At the announcement no debt has been issued, so all 744.00 is equity on the original 25 million shares: P<sub>1</sub> = 744.00/25 = 29.76, a jump of 1.76 = 44.00/25. The buyback executes at 29.76: n = 200/29.76 = 6.7204 million shares, leaving 18.2796 million. Equity after the buyback is 744.00 − 200 = 544.00, and 544.00/18.2796 = 29.76, so the price does not move again. Check: the original shareholders hold 544.00 + 200 = 744.00 against 700.00, a gain of 44.00 = PV(TS); the lenders pay 200 for debt worth 200 and gain nothing.</p>
<p><b>(c) With distress costs.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs) = 700.00 + 44.00 − 18.00 = 726.00, so P<sub>1</sub> = 726.00/25 = 29.04 (n = 200/29.04 = 6.8871 million, and 526.00/18.1129 = 29.04). The shareholders bear the distress costs, and they bear them now: creditors anticipate the loss in default and price it into the debt, so the cost reaches the share price at the announcement, even though ex post it would be paid out of assets the creditors own. The recapitalisation still adds 44.00 − 18.00 = 26.00, so it is worth doing.</p>`,
    criteria: [
      "PV(TS) = tau_c × D = 44.00, discounted at r_D because the debt is fixed and permanent; V^L = 744.00 and P_0 = 28.00",
      "Price jumps at the announcement to 744.00/25 = 29.76; buyback at 29.76 retires 6.7204 million shares and the price stays at 29.76",
      "With distress costs V^L = 726.00 and P_1 = 29.04",
      "Shareholders bear the distress costs ex ante, because creditors price the expected loss into the debt",
    ],
  },
});
