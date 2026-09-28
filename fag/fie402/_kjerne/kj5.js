/* kj5 · Agency costs of debt: risk shifting and debt overhang */
window.EDU_DATA.kjerne.push({
  id: "kj5",
  num: 5,
  title: "Agency costs of debt: risk shifting and debt overhang",
  chapters: [9, 10, 11],
  html: `
<p class="lead-in">Once debt is risky, shareholders stop maximising firm value: they gamble (risk shifting) or refuse good projects (debt overhang). Risk shifting and hedging was H2024 Exercise 4 (18 points) and V2024 Problem 1; overhang ran in 2017V Problem 3, 2017H Problems 1 and 4 and 2021 Problem 2. Both are a state-by-state table plus a named mechanism.</p>

<h3>Equity is a call on the firm</h3>
<p>Limited liability means shareholders are paid last and never less than zero. Against debt with face value K, each state's cash flow V splits as:</p>
<div class="formula"><div class="eq">D = min(V, K) and E = max(V − K, 0)</div>
<div class="where">K is the face value, and the strike of the shareholders' option. D + E = V in every state. Value each claim as its expected payoff under ρ, discounted at r<sub>f</sub>. If the exercise gives real probabilities and no rate, compare expected payoffs.</div></div>
<div class="callout mech"><span class="h">Why do shareholders of a levered firm like risk?</span>Equity is convex in V. Push the good state up and shareholders keep all of it; push the bad state further below K and they lose nothing, being at zero already. The extra downside lands on the creditors. So more risk moves value from debt to equity, even when it destroys firm value.</div>

<h3>Risk shifting and the zero-NPV hedge</h3>
<p>Management acts for the shareholders, so it picks the project with the highest <i>equity</i> value, not the highest firm value. The exercise ends on:</p>
<div class="formula"><div class="eq">agency cost = V(first best) − V(chosen)</div>
<div class="where">A deadweight loss, not the transfer: neither the shareholders' gain nor the creditors' loss. The first best is what an all-equity firm would choose.</div></div>
<p>Risk shifting needs enough debt. For the indifference face value, write both equity values as functions of K and set them equal, inside an interval where the same states default.</p>

<div class="worked"><span class="wh">Worked example: the gamble, its cost, and a free hedge</span>
<p>A firm owes K = 100 and will run one of two projects, neither needing new investment. Two states, ρ = 0.50 each, and r<sub>f</sub> = 0, so value equals expected payoff.</p>
<table class="data">
<tr><th>State</th><th>S: CF</th><th>D</th><th>E</th><th>R: CF</th><th>D</th><th>E</th></tr>
<tr><td>Boom</td><td class="n">120</td><td class="n">100</td><td class="n">20</td><td class="n">170</td><td class="n">100</td><td class="n">70</td></tr>
<tr><td>Bust</td><td class="n">100</td><td class="n">100</td><td class="n">0</td><td class="n">30</td><td class="n">30</td><td class="n">0</td></tr>
<tr><td>Value</td><td class="n">110</td><td class="n">100</td><td class="n">10</td><td class="n">100</td><td class="n">65</td><td class="n">35</td></tr>
</table>
<p><b>Step 1, first best.</b> V<sub>S</sub> = 110 &gt; V<sub>R</sub> = 100, so an all-equity firm takes S. Switching to R has NPV = −10.</p>
<p><b>Step 2, the choice.</b> E<sub>R</sub> = 35 &gt; E<sub>S</sub> = 10, so management takes R: risk shifting (asset substitution).</p>
<p><b>Step 3, the agency cost.</b> 110 − 100 = <b>10</b>. Creditors gain 65 − 100 = −35, shareholders 35 − 10 = +25. Consistency check 3: −35 + 25 = −10 = the NPV of the switch ✓</p>
<p><b>Step 4, the indifference face value.</b> For 30 &lt; K ≤ 100 only R's bust defaults: E<sub>S</sub> = 110 − K, E<sub>R</sub> = 0.5(170 − K) = 85 − 0.5K. Equal at K* = <b>50</b> (both 60). Above 50 management gambles.</p>
<p><b>Step 5, the hedge.</b> At K = 100, a costless forward turns R's cash flow into a certain 100 (NPV = 0). Debt becomes 100 and equity 0: the hedge removes equity's option value, so shareholders refuse. Consistency check 4 (total value fixed): creditors' gain 35 = shareholders' loss 35 ✓</p>
<p><b>Step 6, who pays.</b> Creditors who foresee R pay only 65 for the bond, so the owners end with 65 + 35 = 100, not the 110 a credible promise of S would give. They bear the agency cost up front.</p>
</div>

<h3>Debt overhang and renegotiation</h3>
<p>Shareholders pay the whole outlay I, but in default states every extra krone goes to the creditors:</p>
<div class="formula"><div class="eq">Δ(shareholders' wealth) = NPV − ΔD</div>
<div class="where">ΔD is the rise in the value of the existing debt. Shareholders invest only if NPV &gt; ΔD. Debt overhang is ΔD &gt; NPV &gt; 0. The agency cost is the lost NPV.</div></div>
<p>In k10, debt of face value 100 meets assets paying 50 or 150 (ρ = 0.5), r<sub>f</sub> = 5%, and a project costing 20 adds a safe 30. NPV = 30/1.05 − 20 = 8.5714, but the debt rises by 85.7143 − 71.4286 = 14.2857, so shareholders get 8.5714 − 14.2857 = −5.7143 and decline. The agency cost is 8.5714, not 5.7143. The fix is to cut the face value to K<sub>1</sub>, within:</p>
<div class="formula"><div class="eq">D(K<sub>1</sub>) ≥ D<sub>0</sub> and E(K<sub>1</sub>) − I ≥ E<sub>0</sub></div>
<div class="where">D<sub>0</sub>, E<sub>0</sub> are the claims without the project. Here the creditors need K<sub>1</sub> ≥ 75, the owners K<sub>1</sub> ≤ 88. At K<sub>1</sub> = 82 creditors gain 5.7143 and shareholders 2.8571; consistency check 3: 5.7143 + 2.8571 = 8.5714 = NPV ✓ It holds at every K<sub>1</sub>, since renegotiation only changes the division. Check 4 does not apply: total value is not fixed.</div></div>
<p>The same arithmetic runs backwards. Buying back risky debt raises the value of the debt that stays outstanding, so creditors capture part of any gain, and shareholders can lose from reducing debt even when the firm gains. The keys name this error: run check 3, then read the shareholders' column alone.</p>

<div class="callout warn"><span class="h">Where the points go</span>Compare equity values, not NPVs: the question is what management chooses. Equity in a default state is 0, not negative. In overhang, subtract I from the shareholders' gain, and write the cash flow, not K, in the default state.</div>

<h3>Remedies, and what debt does well</h3>
<p>Covenants cap borrowing, payouts and asset sales; they create value, since the owners get the avoided deadweight loss back in the bond price, unless they bind where the forbidden action was efficient. Senior or secured debt for the new project gives its lender the bad-state cash first, so the old creditor gets no windfall and the owners invest. Convertibles give the lender the upside, removing the convexity that makes gambling pay.</p>
<p>Debt also disciplines. A manager with free cash flow, the cash left after every positive-NPV project, is tempted to build an empire. A skipped dividend costs him nothing; a missed coupon hands control to the creditors. So debt commits the cash, which matters most in mature, cash-rich firms. Everything combines into:</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress) − PV(agency costs) + PV(agency benefits)</div>
<div class="where">The trade-off (kj3) plus the agency terms; asymmetric information (kj6) adds the pecking order. In a discussion, sign each term for the firm, say which dominates, conclude: stable, tangible, cash-rich firms carry more debt, intangible growth firms little.</div></div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>With risky debt, equity = max(V − K, 0) is a call on the firm: shareholders gain from risk at the creditors' expense.</li>
<li>Risk shifting: management picks the highest equity value; the indifference face value K* sets the two equity values equal; agency cost = V(first best) − V(chosen), never the transfer.</li>
<li>With risky debt, shareholders refuse a zero-NPV hedge: it hands the option value to creditors (check 4).</li>
<li>Debt overhang: shareholders invest only if NPV &gt; ΔD, the rise in the old debt's value. Renegotiate the face value to K<sub>1</sub> within D(K<sub>1</sub>) ≥ D<sub>0</sub> and E(K<sub>1</sub>) − I ≥ E<sub>0</sub> (D<sub>0</sub>, E<sub>0</sub> the claims without the project); the gains sum to the NPV (check 3).</li>
<li>Creditors anticipate both, so shareholders pay up front; covenants, seniority and convertibles reduce the cost, while debt disciplines free cash flow.</li></ul></div>
`,
  checks: [
    {
      id: "kj5-s1",
      q: "Debt is risky. Management picks project R (firm value 138: debt 93, equity 45) over project S (firm value 150: debt 130, equity 20). What is the agency cost of debt?",
      options: [
        "25, the gain to shareholders from choosing R",
        "12, the firm value of S minus the firm value of R",
        "37, the loss to creditors from choosing R",
        "Zero, since choosing R only moves value from creditors to shareholders",
      ],
      answer: 1,
      explanation: "The agency cost is the deadweight loss, first-best value minus the value of the chosen project: 150 − 138 = 12. The shareholders' +25 and the creditors' −37 are the transfer, and they sum to −12, the NPV of the switch (check 3). The answer of zero misses that total value falls by 12.",
    },
    {
      id: "kj5-s2",
      q: "A firm's debt is risky. A bank offers a costless hedge that makes the firm's cash flow certain at its current expected value. Management acts for the shareholders. What happens?",
      options: [
        "They accept: a zero-NPV project leaves shareholder wealth unchanged",
        "They accept: lower risk reduces r<sub>E</sub> and so raises the share price",
        "They refuse: the hedge hands equity's option value to the creditors",
        "They refuse: the hedge has a negative NPV for the firm as a whole",
      ],
      answer: 2,
      explanation: "Equity is a call on the firm, so its value depends on the whole distribution, not only the mean. The hedge lifts the debt towards its face value and lowers equity by the same amount, since total value is unchanged (check 4). The zero-NPV argument works only when debt is risk-free and equity is linear in the cash flow.",
    },
    {
      id: "kj5-s3",
      q: "Existing debt is risky. A project costs I = 20 and has NPV = 8; if it is taken, the market value of the existing debt rises by 12. The shareholders must fund the outlay. Which statement is right?",
      options: [
        "They invest, because a positive-NPV project always raises the value of equity",
        "They decline, since their wealth changes by −4; the agency cost is the lost NPV of 8",
        "They decline, and the agency cost is the 4 the shareholders would have lost",
        "They are indifferent, because the creditors' gain equals the shareholders' loss (check 4)",
      ],
      answer: 1,
      explanation: "Shareholders pay all of I but capture only NPV − ΔD = 8 − 12 = −4, so they decline: debt overhang. The value lost is the NPV of 8, because the project never happens; the 4 is a transfer that would have occurred only had they invested. Check 4 needs total value to be fixed, and here the project would add 8.",
    },
  ],
  case: {
    id: "kj5-m1",
    open: true,
    topic: "Debt overhang and renegotiating the face value",
    points: 7,
    minutes: 12,
    body: `<p>Solvik Verft AS has zero-coupon debt with face value K = 130 due in one year and no other liabilities. Its assets pay 65 in the bad state and 260 in the good state next year, each with risk-neutral probability ρ = 0.50, and r<sub>f</sub> = 4%, so every claim is worth its expected payoff discounted at r<sub>f</sub>. A project costs I = 25 today, must be funded by the existing shareholders, and adds a certain 39 in both states next year. Figures in millions of NOK.</p>
<p>(a) Value the debt and the equity with and without the project, compute the project's NPV, and show whether the shareholders take it. Name the mechanism. (3 points)</p>
<p>(b) The creditors, a single bank, offer to cut the face value to K<sub>1</sub> = 104 if the shareholders fund the project. Compute each side's gain, and say what the two gains add up to and why. (2 points)</p>
<p>(c) Find the range of face values K<sub>1</sub> that both the bank and the shareholders would accept. (2 points)</p>`,
    solution: `<p><b>(a) Overhang.</b> Without the project: bad state D = 65, E = 0; good state D = 130, E = 130. D<sub>0</sub> = (0.5 × 65 + 0.5 × 130)/1.04 = 97.5/1.04 = <b>93.7500</b>, E<sub>0</sub> = (0.5 × 130)/1.04 = 65/1.04 = <b>62.5000</b>.</p>
<p>NPV = 39/1.04 − 25 = 37.5000 − 25 = <b>12.5000</b>.</p>
<p>With the project the cash flows are 104 and 299: bad state D = 104, E = 0; good state D = 130, E = 169. D = 117/1.04 = 112.5000, E = 84.5/1.04 = 81.2500.</p>
<p>Creditors gain 112.5000 − 93.7500 = +18.7500. Shareholders gain 81.2500 − 62.5000 − 25 = <b>−6.2500</b>, so they reject a positive-NPV project. This is debt overhang: the bad-state increment of 39 goes wholly to the creditors while the owners pay all 25. Check 3: 18.7500 − 6.2500 = 12.5000 = NPV ✓ The agency cost is the lost NPV, 12.5000.</p>
<p><b>(b) K<sub>1</sub> = 104.</b> Bad state D = 104, E = 0; good state D = 104, E = 195. The debt is now riskless: D = 104/1.04 = 100.0000, E = 97.5/1.04 = 93.7500.</p>
<p>Creditors gain 100.0000 − 93.7500 = +6.2500. Shareholders gain 93.7500 − 62.5000 − 25 = +6.2500. Both gain, so the project goes ahead. Consistency check 3: 6.2500 + 6.2500 = 12.5000 = NPV ✓</p>
<p><b>(c) The bargaining range.</b> Bank's floor: D(K<sub>1</sub>) ≥ 93.7500. For K<sub>1</sub> ≤ 104 the debt is safe, D = K<sub>1</sub>/1.04, so K<sub>1</sub> ≥ 97.5.</p>
<p>Shareholders' ceiling: for K<sub>1</sub> ≥ 104 the bad state defaults, so E = 0.5(299 − K<sub>1</sub>)/1.04, and they need E − 25 ≥ 62.5000, that is 0.5(299 − K<sub>1</sub>) ≥ 1.04 × 87.5 = 91, so K<sub>1</sub> ≤ 117.</p>
<p>Any 97.5 ≤ K<sub>1</sub> ≤ 117 is signable. At 97.5 the shareholders take the whole 12.5000, at 117 the bank does.</p>`,
    criteria: [
      "Values the claims state by state: D_0 = 93.75 and E_0 = 62.50 without the project, D = 112.50 and E = 81.25 with it, and NPV = 12.50.",
      "Shows the shareholders' gain is 81.25 − 62.50 − 25 = −6.25 while creditors gain 18.75, so the project is rejected, and names it debt overhang.",
      "At K_1 = 104 creditors and shareholders each gain 6.25, and check 3 confirms the gains sum to the NPV of 12.50.",
      "Finds the range 97.5 to 117 from D(K_1) at least 93.75 and E(K_1) − 25 at least 62.50.",
    ],
  },
});
