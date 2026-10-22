/* sjanger 9 · myers · Asymmetric information: Myers-Majluf */
window.EDU_DATA.sjangre.push({
  id: "myers",
  num: 9,
  title: "Asymmetric information: Myers-Majluf",
  summary: "From the fair price of a new share to pooling, separating, the announcement drop and the pecking order",
  chapters: [12, 13],
  exam: "8 of 11 papers · not in H2024 or H2025",
  intro: `<p>Asymmetric information reached 8 of the 11 papers, almost always as one template: 2016 P1, 2017V P1, 2020 P2, 2022 P2 and 2023 P4, plus debt against equity in 2021 P1. Neither Kurbatov paper (H2024, H2025) used it, but it is still on the syllabus and the setup is not on the formula sheet. The ladder builds the template one piece at a time: the fair stake α, the old shareholders' payoff, the issue decision, the belief check, pooling and separating, the price reaction and the pecking order. At the top you can solve any of these exercises with new numbers.</p>`,
  steps: [
    {
      id: "myers-1",
      title: "The fair stake when everyone knows V",
      theory: `<p>A firm with assets in place worth V needs cash I for a project. The project's NPV is what it adds over and above its cost I. The firm has no cash, so it sells new shares. New investors are competitive: they pay exactly what their stake is worth. Their stake is a fraction α of the firm <b>after</b> the issue, which holds the assets V plus the project, worth I + NPV once the cash is invested. In this step everyone knows V, so the price is fair to both sides.</p>
<div class="formula"><div class="eq">α × (V + I + NPV) = I &nbsp;⟹&nbsp; α = I/(V + I + NPV)</div>
<div class="where">V + I + NPV is the post-issue value of the whole firm. The cash raised belongs in the denominator because it is inside the firm after the issue. Not on the formula sheet: memorise it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 100, I = 40, NPV = 10. Post-issue value = 100 + 40 + 10 = 150.</p><p>α = 40/150 = 0.2667. The new investors pay 40 for 26.67% of a firm worth 150, a stake worth exactly 40.</p></div>`,
      q: `<p>Everyone, managers and investors alike, knows that a firm's assets in place are worth 260. The firm raises 75 by issuing new shares to fund a project with an NPV of 15. Investors are competitive and risk neutral and there is no discounting. What fraction α of the post-issue firm must the new investors receive? Give four decimals.</p>`,
      options: ["0.2239", "0.2727", "0.2143", "0.2885"],
      answer: 2,
      solution: `<p>Post-issue value = V + I + NPV = 260 + 75 + 15 = 350.</p><p>α = 75/350 = <b>0.2143</b> (3/14 exactly).</p>`,
      check: `<p>Backwards: 0.214286 × 350 = 75.00, exactly the cash the investors paid ✓. The answer must also lie below 75/260 = 0.2885, because the firm the investors buy into is bigger than V once the cash and the project are inside it.</p>`,
      traps: [
        "Left the NPV out of the post-issue value: 75/(260 + 75) = 0.2239.",
        "Left the cash raised out of the denominator: 75/(260 + 15) = 0.2727. After the issue the firm holds the project, worth I + NPV, not just the NPV.",
        null,
        "Priced the stake against the assets alone: 75/260 = 0.2885, as if the investors bought into the firm before the issue.",
      ],
    },
    {
      id: "myers-3",
      title: "The old shareholders' payoff and the issue decision",
      theory: `<p>The old shareholders keep the rest, 1 − α, of the post-issue firm. With fair pricing the new investors take out exactly the I they put in, so the old shareholders end with V + NPV. The manager acts for them. If he does not issue, the project is lost, because the firm has no other money. So he compares the payoff from issuing with V alone, not with V + NPV. When investors know V the rule reduces to NPV &gt; 0: the stake handed to the new investors is not a loss, because they paid I for it, exactly its value.</p>
<div class="formula"><div class="eq">Payoff to old shareholders = (1 − α)(V + I + NPV) = V + NPV</div><div class="eq">Issue and invest if (1 − α)(V + I + NPV) &gt; V</div>
<div class="where">The shortcut V + NPV uses α(V + I + NPV) = I and holds only when α is priced on the true V. Once investors price α on a different V, use the first form. V on the right of the issue rule is what the old shares are worth if the firm walks away; comparing with V + NPV counts the project in the alternative where it is never built.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 100, I = 40, NPV = 10, so α = 40/150 = 4/15.</p><p>Issue: (1 − 4/15) × 150 = (11/15) × 150 = 110 = 100 + 10. Walk away: 100. They issue and gain 110 − 100 = 10, the NPV.</p></div>`,
      q: `<p>A firm's assets in place are worth 320 and everyone knows it. A project with an NPV of 18 needs 90, which can only be raised by issuing shares. Without the issue the project is lost. Investors are competitive and there is no discounting. What should the manager, acting for the old shareholders, do?</p>`,
      options: [
        "Do not issue: the new investors get 21.03% of a firm worth 428.00, that is 90.00, far more than the NPV of 18.00",
        "Either: the old shareholders end with 338.00, which equals V + NPV, the value of the firm with the project",
        "Issue: the old shareholders end with 338.00 against 320.00 without the project, a gain of 18.00",
        "Do not issue: the old shareholders keep 78.97% of the assets, 252.71, against 320.00 without the issue",
      ],
      answer: 2,
      solution: `<p>α = 90/(320 + 90 + 18) = 90/428 = 0.210280.</p><p>Issue: (1 − 0.210280) × 428 = 0.789720 × 428 = <b>338.00</b>. Walk away: the project is lost and the old shareholders keep V = <b>320.00</b>.</p><p>338.00 &gt; 320.00, so the manager <b>issues</b>. The old shareholders gain 18.00.</p>`,
      check: `<p>The gain equals the NPV, 338.00 − 320.00 = 18.00 ✓, as it must when investors know V. The stake the new investors receive is worth 0.210280 × 428 = 90.00, matched by the 90 of cash they bring, so it costs the old shareholders nothing.</p>`,
      traps: [
        "Treated the stake sold as a cost and ignored the 90 of cash it buys. The new investors pay exactly what their stake is worth.",
        "Compared the payoff with V + NPV = 338.00. Without the issue the project is lost, so the alternative is V = 320.00.",
        null,
        "Applied 1 − α to the assets alone: 0.789720 × 320 = 252.71. The cash and the project stay in the firm.",
      ],
    },
    {
      id: "myers-5",
      title: "Asymmetric information: the undervalued type walks away",
      theory: `<p>Now the manager knows V but investors do not. They know only that the assets are worth V<sub>H</sub> with probability q and V<sub>L</sub> with probability 1 − q; the project, I and NPV, is public. Investors price what they expect V to be given the action they observe. If they believe every firm issues whatever its type (the pooling belief), an issue tells them nothing and they use the prior average. The old shareholders' payoff still uses the <b>true</b> V, which the manager knows, times the 1 − α that investors set.</p>
<div class="formula"><div class="eq">E[V | issue] = qV<sub>H</sub> + (1 − q)V<sub>L</sub> &nbsp;(if both types issue) &nbsp;·&nbsp; α = I/(E[V | issue] + I + NPV)</div><div class="eq">Gain from issuing = (1 − α)(V + I + NPV) − V = NPV − α(V − E[V | issue])</div>
<div class="where">α is the same for both types, because investors cannot tell them apart. α(V − E[V | issue]) is the dilution cost: value handed to new investors who bought into a firm worth more than they believed. If it exceeds the NPV, the high type keeps V by not issuing and a positive-NPV project dies. That is underinvestment. For the low type the sign flips: it sells overpriced shares, gains from issuing and always issues at the pooled price.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, I = 40, NPV = 10. E[V | issue] = 0.5 × 200 + 0.5 × 80 = 140 and α = 40/190 = 4/19 = 0.210526.</p><p>High type: (15/19) × 250 = 197.37, a gain of 197.37 − 200 = −2.63. Dilution form: 0.210526 × 60 = 12.63 and 10 − 12.63 = −2.63. It does not issue.</p><p>Low type: (15/19) × 130 = 102.63 = 80 + 10 + 12.63 &gt; 80. It issues.</p></div>`,
      q: `<p>A firm's assets in place are worth 360 or 160; investors think each is equally likely. The manager knows they are worth 360. A project with a publicly known NPV of 12 needs 80, to be raised by a share issue. Investors believe the firm would issue whatever its type. Measured once the true value comes out, by how much does issuing and investing change the old shareholders' wealth compared with not issuing?</p>`,
      options: ["−10.73", "12.00", "−22.73", "−88.00"],
      answer: 0,
      solution: `<p>E[V | issue] = 0.5 × 360 + 0.5 × 160 = 260, so α = 80/(260 + 80 + 12) = 80/352 = 0.227273.</p><p>Payoff if it issues = (1 − 0.227273) × (360 + 80 + 12) = 0.772727 × 452 = 349.27. Without the issue the old shareholders keep 360.</p><p>Change = 349.27 − 360 = <b>−10.73</b>. The high type does not issue: it walks away from a project with a positive NPV.</p>`,
      check: `<p>Dilution form: α(V − E[V | issue]) = 0.227273 × (360 − 260) = 22.73. NPV minus dilution: 12 − 22.73 = −10.73 ✓. The project adds 12 but the issue gives away 22.73, so the old shareholders are better off letting it die.</p>`,
      traps: [
        null,
        "Priced α on the true value 360, as if investors knew it. The old shareholders then keep the whole NPV, 12.00.",
        "Compared the payoff with V + NPV = 372 instead of V = 360: 349.27 − 372 = −22.73. That is the dilution, not the change in wealth.",
        "Valued the payoff at investors' beliefs instead of the true V: 0.772727 × 352 − 360 = 272 − 360 = −88.00.",
      ],
    },
    {
      id: "myers-8",
      title: "Check 5 and the separating equilibrium",
      theory: `<p>Computing α does not finish the answer. An equilibrium is an action for each type plus a belief that is correct given those actions: consistency check 5, the step the solution keys mark. The pooling belief holds only if both types issue at the pooled α. The low type always does, so the test is the high type. If it walks away, an issue reveals the low type, investors price the shares on V<sub>L</sub> and α rises. Two checks make this separating outcome an equilibrium and both earn points: the low type still issues at the harsher price while the high type still stays out.</p>
<div class="formula"><div class="eq">Pooling holds if NPV &gt; α<sub>pool</sub>(V<sub>H</sub> − E[V | issue]) &nbsp;·&nbsp; else α<sub>sep</sub> = I/(V<sub>L</sub> + I + NPV)</div><div class="eq">Low type: (1 − α<sub>sep</sub>)(V<sub>L</sub> + I + NPV) = V<sub>L</sub> + NPV &gt; V<sub>L</sub> &nbsp;·&nbsp; High type: (1 − α<sub>sep</sub>)(V<sub>H</sub> + I + NPV) &lt; V<sub>H</sub></div>
<div class="where">Investors breaking even at the pooled price is not the test: under the belief they break even by construction. Under separating the low type is priced correctly, so it keeps exactly V<sub>L</sub> + NPV. The high type faces an even worse price than under pooling, so if it refused then, it refuses now.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, I = 40, NPV = 10. At the pooled α = 0.2105 the high type keeps 197.37 &lt; 200 and does not issue. The pooling belief fails check 5.</p><p>Separating: α = 40/(80 + 40 + 10) = 40/130 = 0.3077. Low type: (9/13) × 130 = 90 = 80 + 10 &gt; 80, so it issues ✓. High type, if it issued: (9/13) × 250 = 173.08 &lt; 200, so it stays out ✓. Only the low type issues: a separating equilibrium.</p></div>`,
      q: `<p>A firm's assets in place are worth 500 or 200, equally likely in investors' eyes; the manager knows which. A project with a publicly known NPV of 24 needs 120, raised by issuing shares. Find the equilibrium. What fraction α do new investors receive in it? Give four decimals.</p>`,
      options: ["0.2429", "0.1863", "0.3488", "0.5357"],
      answer: 2,
      solution: `<p><b>Test pooling.</b> E[V | issue] = 350 and α = 120/(350 + 120 + 24) = 120/494 = 0.242915. High type: 0.757085 × 644 = 487.56 &lt; 500. It does not issue, so pooling fails check 5.</p><p><b>Separating.</b> Investors read an issue as V = 200: α = 120/(200 + 120 + 24) = 120/344 = <b>0.3488</b>.</p><p>Low type: 0.651163 × 344 = 224.00 &gt; 200, so it issues ✓. High type, if it issued: 0.651163 × 644 = 419.35 &lt; 500, so it stays out ✓.</p>`,
      check: `<p>The issuer is identified correctly, so the low type must keep exactly V<sub>L</sub> + NPV = 200 + 24 = 224.00 with no transfer either way ✓. New investors pay 120 for 0.348837 × 344 = 120.00 ✓.</p>`,
      traps: [
        "Skipped check 5 and kept the pooled α: 120/494 = 0.2429. The high type refuses at that price, so the belief behind it is wrong.",
        "Assumed the high type is the one that issues: 120/(500 + 120 + 24) = 0.1863.",
        null,
        "Left the cash raised out of the denominator: 120/(200 + 24) = 0.5357.",
      ],
    },
    {
      id: "myers-9",
      title: "The real cost: NPV that is never created",
      theory: `<p>Pooling and separating are not equally harmful. Under pooling both types invest and value only moves from the high type's old shareholders to the low type's through the new investors. Nothing real is lost. Under separating the high type abandons a positive-NPV project. That NPV is not transferred to anyone: it is never created. This is underinvestment, the same family as debt overhang.</p>
<div class="formula"><div class="eq">Expected loss = q × NPV<sub>H</sub> &nbsp;(when the high type does not invest)</div>
<div class="where">In the running case the separating equilibrium loses 0.5 × 10 = 5.00. 2022 Problem 2 used a starker form. The firm has no assets in place and the project itself is good or bad. Investors then pay for E[project value]. If I exceeds it, α = I/E[project value] &gt; 1: no security can raise I, nobody is financed and the good project dies with the bad one.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An entrepreneur with no money has a project costing 90. It is worth 120 if good and 40 if bad, each with probability 0.5. Everyone is risk neutral and there is no discounting.</p><p>Symmetric information: good α = 90/120 = 0.75, funded, NPV 30. Bad α = 90/40 = 2.25 &gt; 1, not funded, which is right since its NPV is −50.</p><p>Asymmetric: E[value] = 0.5 × 120 + 0.5 × 40 = 80 &lt; 90, so α = 90/80 = 1.125 &gt; 1. Nobody is financed. Expected loss = 0.5 × 30 = 15.00.</p></div>`,
      q: `<p>An entrepreneur with no money of her own has a project that costs 115. If the project is good it is worth 150; if bad, 50. She knows which; investors put probability 0.4 on good. The only funding is equity sold to competitive investors. Everyone is risk neutral and there is no discounting. Compared with a world where investors know the project's quality, how much expected value does the information problem destroy?</p>`,
      options: ["14.00", "35.00", "21.00", "0.00"],
      answer: 0,
      solution: `<p><b>Symmetric information.</b> Good: α = 115/150 = 0.7667 ≤ 1, funded, NPV = 150 − 115 = 35. Bad: α = 115/50 = 2.30 &gt; 1, not funded, which is efficient since its NPV is −65.</p><p><b>Asymmetric information.</b> E[value] = 0.4 × 150 + 0.6 × 50 = 60 + 30 = 90 &lt; 115, so α = 115/90 = 1.2778 &gt; 1. No issue can raise 115 and neither project is built.</p><p>Lost: the good project's NPV, with probability 0.4: 0.4 × 35 = <b>14.00</b>.</p>`,
      check: `<p>Could investors instead believe that any issuer is good? Then α = 115/150 = 0.766667 and the bad type would mimic: it keeps 0.233333 × 50 = 11.67 &gt; 0. Both types would issue, the belief falls back to the prior and α to 1.2778. So no financing is the only outcome that survives check 5. The loss of 14.00 stands.</p>`,
      traps: [
        null,
        "Forgot the probability: the good project's NPV of 35.00 is lost only when the project is good.",
        "Weighted by the bad type's probability: 0.6 × 35 = 21.00.",
        "Missed that α = 1.2778 is impossible and treated the outcome as pooling, where value only moves between the types.",
      ],
    },
    {
      id: "myers-10",
      title: "The share price reaction to an equity issue",
      theory: `<p>In a separating equilibrium an issue announcement is news: it reveals the low type. Before the announcement investors do not know which type they hold; after it they do. The old shares are then worth what investors now believe the firm is worth to them. The cash raised drops out because the new investors pay full price for their slice.</p>
<div class="formula"><div class="eq">Old shares after an issue is announced = (1 − α)(E[V | issue] + I + NPV) = E[V | issue] + NPV</div><div class="eq">Before = q × V<sub>H</sub> + (1 − q)(V<sub>L</sub> + NPV) &nbsp;(separating: the high type abstains)</div>
<div class="where">The price before is the weighted average of the two outcomes the market expects. Under pooling an issue reveals nothing about V, so it carries no bad news. In the data, seasoned equity offers meet a price fall of roughly 3% on average, while straight debt issues barely move the price.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the running case</span><p>V<sub>H</sub> = 200, V<sub>L</sub> = 80, q = 0.5, NPV = 10. Separating: the high type stays out, the low type issues.</p><p>Before the announcement: 0.5 × 200 + 0.5 × (80 + 10) = 145. After an issue is announced: 80 + 10 = 90. Price reaction = 90/145 − 1 = −37.93%.</p></div>`,
      q: `<p>A firm's assets in place are worth 600 or 300. Investors put probability 0.3 on 600; the manager knows which. A project with a publicly known NPV of 30 needs 150, raised by issuing shares. First find the equilibrium. Then: by how much does the market value of the existing shares change, in per cent, when the firm announces an equity issue?</p>`,
      options: ["−15.38%", "−19.71%", "−27.01%", "16.79%"],
      answer: 1,
      solution: `<p><b>Equilibrium.</b> Pooled: E[V | issue] = 0.3 × 600 + 0.7 × 300 = 390, α = 150/570 = 0.263158 and the high type keeps 0.736842 × 780 = 574.74 &lt; 600, so pooling fails. Separating: α = 150/480 = 0.3125. The low type keeps 330 &gt; 300 and the high type would keep 0.6875 × 780 = 536.25 &lt; 600. Only the low type issues.</p><p><b>Before.</b> 0.3 × 600 + 0.7 × 330 = 180 + 231 = 411.</p><p><b>After an issue.</b> 300 + 30 = 330.</p><p>Change = 330/411 − 1 = <b>−19.71%</b>.</p>`,
      check: `<p>A firm that does not issue is revealed as the high type and rises to 600, a change of +45.99%. The two moves must average to zero: 0.3 × 45.99% − 0.7 × 19.71% = 13.80% − 13.80% = 0 ✓. Also, 411 is the prior 390 plus the expected NPV actually captured, 0.7 × 30 = 21 ✓.</p>`,
      traps: [
        "Used the prior E[V] = 390 as the price before, forgetting the NPV the market already expected: 330/390 − 1 = −15.38%.",
        null,
        "Left the NPV out of the price after the issue: 300/411 − 1 = −27.01%.",
        "Counted the cash raised as the old shareholders': (300 + 150 + 30)/411 − 1 = 16.79%. The new investors paid for that 150.",
      ],
    },
    {
      id: "myers-12",
      title: "Debt or equity: the pecking order",
      theory: `<p>The high type's loss comes from selling a claim that outsiders underprice. Risk-free debt pays the same in every state, so investors' ignorance of V cannot touch its price: it costs both types exactly I and the old shareholders keep V + NPV. Equity tracks V one for one and carries the full dilution. Hence the pecking order: internal funds first, then debt (safest first), then equity last. It rests on asymmetric information, not on taxes or inefficient markets: every price here is fair given what investors know. 2021 Problem 1 tested it with 100% debt or 100% equity and beliefs held at the prior whatever the choice. The two types then want different securities, so those fixed beliefs cannot be rational: an equity issue reveals the low type.</p>
<div class="formula"><div class="eq">Debt: V + C − I = V + NPV &nbsp;·&nbsp; Equity: (1 − α)(V + C), with α = I/(E[V] + C)</div><div class="eq">Debt − equity = α(V − E[V])</div>
<div class="where">C is the project's sure cash flow next year, so C = I + NPV with no discounting. Check that the debt is risk-free (V<sub>L</sub> + C ≥ I) before valuing it at face. The difference is positive for the high type and negative for the low type.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>H</sub> = 150, V<sub>L</sub> = 30, q = 0.5, I = 20, C = 26. E[V] = 90 and α = 20/116 = 0.172414.</p><p>High type: debt 150 + 6 = 156; equity 0.827586 × 176 = 145.66. Debt wins by 10.34 = 0.172414 × 60. Low type: debt 36; equity 0.827586 × 56 = 46.34. Equity wins.</p></div>`,
      q: `<p>A firm's assets in place are worth 240 or 60, equally likely in investors' eyes; the manager knows they are worth 240. A project costs 30 today and pays a sure 40 next year. The firm can raise the 30 with 100% equity or 100% debt. Investors keep their 50/50 beliefs whatever the firm does. Everyone is risk neutral and there is no discounting. Measured once the true value comes out, by how much is the old shareholders' payoff with debt higher than with equity?</p>`,
      options: ["22.50", "14.21", "0.00", "90.00"],
      answer: 1,
      solution: `<p><b>Debt.</b> The low state still has 60 + 40 = 100 ≥ 30, so the debt is risk-free and sells at face. Old shareholders: 240 + 40 − 30 = 250.</p><p><b>Equity.</b> E[V] = 150, so α = 30/(150 + 40) = 30/190 = 0.157895. Old shareholders: (1 − 0.157895) × (240 + 40) = 0.842105 × 280 = 235.79.</p><p>Difference = 250 − 235.79 = <b>14.21</b>. The manager borrows.</p>`,
      check: `<p>Formula: α(V<sub>H</sub> − E[V]) = 0.157895 × 90 = 14.21 ✓. Mirror: the low type gets 70 with debt and 0.842105 × 100 = 84.21 with equity, so it prefers equity by the same 14.21 (equal because q = 0.5). The fixed beliefs are therefore not rational. Once investors read an equity issue as the low type, α = 30/100 = 0.30 and the low type keeps 0.70 × 100 = 70.00, no more than with debt.</p>`,
      traps: [
        "Left the cash raised out of the equity pricing: α = 30/(150 + 10) = 0.1875, so 250 − 0.8125 × 280 = 22.50. After the issue the firm holds the sure 40, not just the NPV.",
        null,
        "Priced the equity on the true value, α = 30/280. Both routes then give 250 and the difference is 0.00, but investors cannot see the true value.",
        "Valued the old shareholders' equity at investors' beliefs: 250 − 0.842105 × 190 = 250 − 160 = 90.00. The payoff uses the true value.",
      ],
    },
    {
      id: "myers-13",
      title: "Exam level: the full template when the project is good enough",
      theory: `<p>2016 Problem 1, 2017V Problem 1 and 2020 Problem 2 are one exercise with new numbers: assets in place worth V<sub>H</sub> or V<sub>L</sub>, a project costing I with a sure payoff C, equity the only source. (a) α under the belief that the firm always issues, the payoffs and the high type's choice. (b) The same under the belief that only the low type issues. (c) With a cheaper project or a larger payoff: does the "always issues" belief now hold? Run the same four lines every time and end with check 5.</p>
<div class="formula"><div class="eq">α = I/(E[V | beliefs] + C) → payoff (1 − α)(V<sub>true</sub> + C) → compare with V<sub>true</sub> → do the types act as the belief assumes?</div>
<div class="where">C = I + NPV. Undervaluation alone predicts nothing: a large enough NPV pays for the dilution and the high type issues even though it is underpriced.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>V<sub>H</sub> = 150, V<sub>L</sub> = 50, q = 0.5, I = 30, C = 40.</p><p><b>(a)</b> E[V] = 100, α = 30/140 = 0.2143. High: (11/14) × 190 = 149.29 &lt; 150, does not issue. Low: (11/14) × 90 = 70.71 &gt; 50, issues. The belief is not rational.</p><p><b>(b)</b> α = 30/90 = 0.3333. Low: (2/3) × 90 = 60 &gt; 50, issues. High: (2/3) × 190 = 126.67 &lt; 150, stays out. Rational: a separating equilibrium that loses 0.5 × 10 = 5.00 in expectation.</p><p><b>(c)</b> The payoff rises to C = 70. α = 30/170 = 0.1765. High: (14/17) × 220 = 181.18 &gt; 150, issues. Low: (14/17) × 120 = 98.82 &gt; 50, issues. Both issue as believed: pooling, nothing is lost and an issue carries no bad news.</p></div>`,
      q: `<p>An all-equity firm's assets in place are worth 100 or 40. The manager knows which; investors put probability 0.2 on 100. A project costs 35 today and pays a sure 60 next year. The only source of money is new equity sold in a competitive market. Everyone is risk neutral and there is no discounting. Investors believe the manager always issues equity. Given that belief, which statement is correct?</p>`,
      options: [
        "The high type keeps 110.00, below the 125.00 it is worth with the project, so it does not issue and the belief is not rational",
        "At α = 0.4545 the high type keeps 87.27 against 100.00, so it does not issue and the belief is not rational",
        "At α = 0.2188 the high type keeps 125.00 against 100.00, so it issues and the belief is rational",
        "At α = 0.3125 the high type keeps 110.00 against 100.00, so it issues and the belief is rational",
      ],
      answer: 3,
      solution: `<p><b>α.</b> E[V] = 0.2 × 100 + 0.8 × 40 = 20 + 32 = 52. α = 35/(52 + 60) = 35/112 = <b>0.3125</b>.</p><p><b>Payoffs.</b> High: (1 − 0.3125) × (100 + 60) = 0.6875 × 160 = 110.00 &gt; 100, so it issues. Low: 0.6875 × 100 = 68.75 &gt; 40, so it issues.</p><p><b>Check 5.</b> Both types issue, exactly as the belief assumed. The belief is <b>rational</b>: a pooling equilibrium in which both types invest.</p><p>A separating belief would not survive here: at α = 35/100 = 0.35 the high type would keep 0.65 × 160 = 104.00 &gt; 100 and issue, contradicting it. Because an issue reveals nothing about V, it carries no bad news for the share price.</p>`,
      check: `<p>Dilution: α(V<sub>H</sub> − E[V]) = 0.3125 × 48 = 15.00 &lt; NPV = 25. Payoff: 100 + 25 − 15 = 110.00 ✓. Investors break even: 0.3125 × (0.2 × 160 + 0.8 × 100) = 0.3125 × 112 = 35.00 ✓. The high type gives up 15.00 and the low type gains 0.3125 × 12 = 3.75; 0.2 × 15.00 = 0.8 × 3.75 = 3.00 ✓.</p>`,
      traps: [
        "Compared the payoff with V + NPV = 125 instead of V = 100. Without the issue the project is lost, so the alternative is 100.",
        "Left the cash raised out of the denominator: α = 35/(52 + 25) = 0.4545, so 0.545455 × 160 = 87.27.",
        "Priced α on the high type's true value: 35/160 = 0.21875, so 0.78125 × 160 = 125.00. Investors cannot see it.",
        null,
      ],
    },
    {
      id: "myers-14",
      title: "Exam level: debt against equity with distress costs and a tax benefit",
      theory: `<p>2023 Problem 4 asked the same question per share. A firm with N shares whose true price is P<sub>H</sub> or P<sub>L</sub> trades at the average P<sub>0</sub>. It must raise I. Equity sold at P<sub>0</sub> means n = I/P<sub>0</sub> new shares, so α = n/(N + n): the template with NPV = 0. Debt is priced correctly but carries a net cost L, distress costs above the tax benefit. Managers pick the route with the higher long-run price once the truth is out.</p>
<div class="formula"><div class="eq">Equity: (N × P<sub>true</sub> + I)/(N + n) &nbsp;·&nbsp; Debt: P<sub>true</sub> − L/N</div><div class="eq">With a net tax benefit B instead of L: Debt = P<sub>true</sub> + B/N</div>
<div class="where">The overvalued type issues equity and the undervalued type borrows. That separates the types, so an equity issue drops the price to P<sub>L</sub> and a debt issue lifts it to P<sub>H</sub> − L/N. Replace L with a tax benefit and the overvalued type switches to debt once B/N exceeds its gain from equity. Then both borrow and debt signals nothing.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>N = 50 million, P<sub>H</sub> = 12 or P<sub>L</sub> = 8, equally likely, so P<sub>0</sub> = 10. I = 100 million, L = 5 million. n = 100/10 = 10 million, so 60 million shares in total.</p><p><b>(a)</b> Worth 8: equity (400 + 100)/60 = 8.3333, debt 8 − 0.10 = 7.90, so it issues equity. Worth 12: equity (600 + 100)/60 = 11.6667, debt 12 − 0.10 = 11.90, so it borrows.</p><p><b>(b) and (c)</b> An equity issue reveals the low type: the price falls from 10.00 to 8.00. A debt issue reveals the high type: the price rises to 11.90.</p><p><b>(d)</b> A tax benefit B instead: the low type borrows if 8 + B/50 &gt; 8.3333, that is B &gt; 50 × 0.3333 = 16.67 million. Above that both types borrow and the choice reveals nothing.</p></div>`,
      q: `<p>Bratt ASA has no debt and 100 million shares. Their correct value is 25.00 or 20.00 per share; investors put probability 0.4 on 25.00, so the shares trade at 22.00. The managers know the correct value is 20.00. Bratt must raise 330 million for a plant that adds exactly its cost in value. Any debt is priced correctly. New equity could be sold at 22.00. The managers maximise the long-run share price. Borrowing was expected to bring distress costs 12 million above its tax benefits. Now assume instead that there are no distress costs, only tax benefits with present value B. Above what B do the managers prefer to borrow?</p>`,
      options: ["30.00 million", "39.13 million", "38.09 million", "26.09 million"],
      answer: 3,
      solution: `<p>New shares if equity: n = 330/22 = 15 million, so 115 million in total.</p><p>Equity route: (100 × 20 + 330)/115 = 2 330/115 = 20.2609 per share.</p><p>Debt route with a tax benefit B: 20 + B/100 per share.</p><p>Borrow when 20 + B/100 &gt; 20.2609, that is B &gt; 100 × 0.260870 = <b>26.09 million</b>.</p>`,
      check: `<p>Direct route: selling 15 million shares at 22.00 that are worth 20.2609 after the issue hands the old shareholders 330 − 15 × 20.2609 = 330 − 303.91 = 26.09 million ✓. Equivalently (100/115) × 15 × (22 − 20) = (100/115) × 30 = 26.09 ✓. With the old distress cost of 12 the low type issued equity (20.2609 &gt; 19.88) and the high type borrowed (24.88 &gt; 2 830/115 = 24.6087). The two equity prices average to the market price: 0.4 × 24.6087 + 0.6 × 20.2609 = 22.00 ✓.</p>`,
      traps: [
        "Took the gross overpricing, 15 × (22 − 20) = 30.00 million. The new shares share in that gain too, so the old shareholders keep only 100/115 of it.",
        "Used the high type's loss from equity, 100 × (25 − 24.6087) = 39.13 million. The high type borrows for any B ≥ 0.",
        "Kept the distress cost of 12 million in the debt route: 26.09 + 12 = 38.09 million. The question removes it.",
        null,
      ],
    },
  ],
});
