/* kj6 · Asymmetric information and raising capital */
window.EDU_DATA.kjerne.push({
  id: "kj6",
  num: 6,
  title: "Asymmetric information and raising capital",
  chapters: [12, 13, 14],
  html: `
<p class="lead-in">When managers know more than investors, selling shares transfers wealth, and a firm may skip a good project rather than sell itself cheaply. A flag: this appeared in 8 of 11 papers historically but in neither Kurbatov paper, and it is still on the syllabus. The template barely changed: 2016 Problem 1, 2017V Problem 1, 2020 Problem 2, 2022 Problem 2, 2023 Problem 4.</p>

<h3>The Myers-Majluf template</h3>
<p>Assets in place are worth V<sub>H</sub> or V<sub>L</sub>; only the manager knows which, and the market puts probability q on the high type. A project needs I, raised by an equity issue now or lost, and its NPV is public. The manager acts for the old shareholders. Competitive new investors break even under their beliefs:</p>
<div class="formula"><div class="eq">α = I / (E[V | beliefs] + I + NPV)</div>
<div class="where">α is the fraction of the firm sold. The denominator is the post-issue value in investors' eyes, including the cash raised. Drop the I and α is too large. Not on the formula sheet.</div></div>
<div class="formula"><div class="eq">Old shareholders get (1 − α)(V<sub>true</sub> + I + NPV); issue if this exceeds V<sub>true</sub></div>
<div class="eq">⇔ issue if NPV &gt; α(V<sub>true</sub> − E[V | beliefs])</div>
<div class="where">α is priced off beliefs, the payoff off the truth. The alternative is V<sub>true</sub> alone, since the project is lost without the issue. The right-hand side is the dilution handed to new investors.</div></div>
<p>Four steps, every time:</p>
<ol>
<li>State the belief. Start with pooling: both types issue, so E[V | issue] = qV<sub>H</sub> + (1 − q)V<sub>L</sub>.</li>
<li>Compute α from that belief, I in the denominator, four decimals.</li>
<li>Compare each type's payoff with its V<sub>true</sub>.</li>
<li><b>Consistency check 5: are the beliefs rational?</b> If a type does not act as the belief assumed, switch to separating (only the low type issues, E[V | issue] = V<sub>L</sub>), reprice, and verify that the low type still issues and the high type still abstains.</li>
</ol>
<div class="callout mech"><span class="h">Why does an undervalued firm refuse free money?</span>The price is fair on average, and the manager is not average. Pooling prices every issuer at the mean, subsidising the low type and taxing the high type. If that tax exceeds the NPV, the high type lets a good project die rather than sell a good firm cheaply. Nobody is fooled, and saying "we are the good type" is free, so it convinces nobody.</div>

<div class="worked"><span class="wh">Worked example: pooling fails, separating holds</span>
<p>V<sub>H</sub> = 250, V<sub>L</sub> = 100, q = 0.50, I = 60, NPV = 15.</p>
<p><b>Step 1, pooling belief.</b> E[V | issue] = 0.50(250) + 0.50(100) = 175.</p>
<p><b>Step 2, price.</b> α = 60/(175 + 60 + 15) = 60/250 = <b>0.2400</b>.</p>
<table class="data">
<tr><th>Type</th><th>Dilution α(V − 175)</th><th>Payoff (1 − α)(V + I + NPV)</th><th>No issue</th><th>Issue?</th></tr>
<tr><td>High, 250</td><td class="n">18.00</td><td class="n">0.76 × 325 = 247.00</td><td class="n">250.00</td><td>no</td></tr>
<tr><td>Low, 100</td><td class="n">−18.00</td><td class="n">0.76 × 175 = 133.00</td><td class="n">100.00</td><td>yes</td></tr>
</table>
<p><b>Step 3, check 5.</b> The belief was "both issue", but the high type's dilution of 18 exceeds the NPV of 15, so it abstains. The pooling belief is not rational.</p>
<p><b>Step 4, separating.</b> E[V | issue] = 100, so α = 60/(100 + 60 + 15) = 60/175 = <b>0.3429</b> (12/35). Low type: (23/35)(175) = 115.00 &gt; 100, issues ✓. High type, if it deviated: (23/35)(325) = 213.5714 &lt; 250, abstains ✓. Beliefs are rational: a separating equilibrium.</p>
<p><b>Check.</b> The revealed low type suffers no dilution, so it must get V<sub>L</sub> + NPV = 115 ✓. Expected value lost: q × NPV = 0.50 × 15 = <b>7.50</b>.</p>
</div>

<h3>Pooling versus separating</h3>
<p><b>Separating destroys value:</b> the high type's positive-NPV project never happens. That is underinvestment, the same family as debt overhang (kj5). <b>Pooling only moves value:</b> both types invest, and the high type's old shareholders transfer wealth to the low type's through new investors who break even on average:</p>
<div class="formula"><div class="eq">q × (high type's loss) = (1 − q) × (low type's gain)</div>
<div class="where">Equal in size only when q = 0.5. Had the example's q been 0.80, E[V | issue] = 220 and α = 60/295 = 0.2034; the high type loses 6.1017, below the NPV of 15, so both issue, and the low type gains 24.4068: 0.80 × 6.1017 = 0.20 × 24.4068 = 4.8814 ✓</div></div>
<p>Financial slack (cash or unused debt capacity) lets the high type invest without issuing, which removes the underinvestment. It does not remove an overvalued firm's wish to sell shares: that firm still gains α(E[V | beliefs] − V<sub>true</sub>).</p>

<h3>Pecking order, announcements and market timing</h3>
<p>Selling a claim to less-informed investors costs the old owners more the more its payoff depends on the hidden value. Hence the pecking order: internal funds, then debt (fixed unless the firm defaults), then equity (exposed to every krone of hidden value). 2021 Problem 1 set debt against equity this way. It rests on asymmetric information, not market inefficiency: prices are fair given what investors know. It ranks without forbidding equity, has no target leverage, and explains why the most profitable firms borrow least.</p>
<p><b>Debt or equity?</b> In the k13 example a firm must raise 150; next year it is worth 600 or 300 if good and 400 or 60 if bad (ρ = 0.50, r<sub>f</sub> = 0, q = 0.50). Pooled equity sells α = 150/340 = 0.4412, so the good type hands over a claim truly worth 198.5294 for 150: a transfer of 48.5294. Pooled debt needs 0.50K + 0.50(0.5K + 30) = 150, so K = 180, and the good type's debt is truly worth 180: a transfer of only 30.0000. Debt is less sensitive to the hidden value (the two types' claims differ by 60, against 97.0588 for equity), so the good type prefers debt. The bad type would gain more from equity, but an equity issue would reveal it (check 5), so it mimics and both issue debt. Debt that is repaid in every state, here up to 60, carries no transfer at all. 2021 Problem 1 is this comparison.</p>
<p>Since equity is the last resort, an issue is bad news: seasoned equity offers meet an average price fall of about 3%, straight debt about zero. The fall is the market revising its view of the assets, not value destroyed. Market timing has two versions: the information version is Myers-Majluf again; only the behavioural version, with over-optimistic investors, needs inefficiency and predicts long-run underperformance after issues.</p>

<h3>Raising capital: IPOs, SEOs and rights issues</h3>
<p>In an IPO the underwriter markets the issue and, under firm commitment, buys it at the offer price less the spread; its reputation certifies the issue. Book building sets the price, typically below what demand would bear.</p>
<div class="formula"><div class="eq">Net proceeds = N × P<sub>offer</sub> × (1 − spread) − other direct costs</div>
<div class="eq">Underpricing = (P<sub>close</sub> − P<sub>offer</sub>)/P<sub>offer</sub>; money left on the table = N<sub>primary</sub> × (P<sub>close</sub> − P<sub>offer</sub>)</div>
<div class="where">5 million new shares at 80, a 6% spread and 12 of other costs raise 400 − 24 − 12 = 364 net. A first-day close of 96 is 20.00% underpricing and 80 left on the table: total cost 116, 29% of gross. The underpricing falls on the pre-IPO owners, in shares, not on the company's accounts.</div></div>
<p>Why underprice? The winner's curse: informed investors bid only for good issues, so an uninformed investor is rationed in good deals and filled in bad ones. Priced at expected value he loses on average, so the issue must be priced below it to keep him in. IPO and SEO issuers have also underperformed comparable firms for three to five years afterwards; give both readings, over-optimism or a benchmark problem.</p>
<p>A rights issue, standard in Norway, sells the new shares to existing owners pro rata, so the dilution transfer has no one to flow to:</p>
<div class="formula"><div class="eq">TERP = (N<sub>old</sub> × P<sub>cum</sub> + N<sub>new</sub> × P<sub>sub</sub>)/(N<sub>old</sub> + N<sub>new</sub>); value of a right = P<sub>cum</sub> − TERP</div>
<div class="where">40 million shares at 50 plus 10 million new at 40: TERP = 2 400/50 = 48, a right is worth 2. Owners who subscribe or sell their rights lose nothing; only those who let them lapse do. The discount is cosmetic.</div></div>

<div class="callout warn"><span class="h">Slips that cost points</span>Leaving I out of α's denominator. Comparing the issue payoff with V + NPV instead of V. Putting E[V | beliefs] where the true V belongs. Stopping at α without check 5, or claiming separating without checking that the low type still issues.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Myers-Majluf: α = I/(E[V | beliefs] + I + NPV), with the cash raised in the denominator.</li>
<li>Issue if (1 − α)(V<sub>true</sub> + I + NPV) &gt; V<sub>true</sub>, that is if NPV &gt; α(V<sub>true</sub> − E[V | beliefs]).</li>
<li>Always run check 5: price at pooling, see who issues; if the high type abstains, reprice at E[V | issue] = V<sub>L</sub> and verify both types.</li>
<li>Separating destroys q × NPV, q the probability of the high type (underinvestment); pooling only transfers. Slack cures the underinvestment, not an overvalued firm's wish to issue.</li>
<li>Pecking order: internal funds, debt, equity, because debt is less sensitive to the hidden value; an equity issue cuts the price about 3%; IPO underpricing (winner's curse) costs the pre-IPO owners; rights issues avoid the transfer.</li></ul></div>
`,
  checks: [
    {
      id: "kj6-s1",
      q: "Investors expect both types to issue, so E[V | issue] = 300. The firm raises I = 100 for a project with public NPV = 20; the manager knows the assets are worth 380. What fraction α of the firm must be sold?",
      options: [
        "0.3125 = 100/(300 + 20)",
        "0.2381 = 100/(300 + 100 + 20)",
        "0.2000 = 100/(380 + 100 + 20)",
        "0.2500 = 100/(300 + 100)",
      ],
      answer: 1,
      explanation: "New investors break even on what they believe the post-issue firm is worth: the assets as they assess them, plus the cash they pay in, plus the NPV. Leaving out the I shrinks the denominator and overstates α. The manager's 380 enters the old shareholders' payoff, not the price, because investors cannot see it.",
    },
    {
      id: "kj6-s2",
      q: "You price an equity issue at the pooling belief and find that the high type's old shareholders are better off not issuing. What is the correct conclusion?",
      options: [
        "The equilibrium is pooling, and the high type simply bears the dilution",
        "Both types issue anyway, since the project has a positive NPV",
        "Pooling is not an equilibrium: reprice at V<sub>L</sub> and check that only the low type issues",
        "The equilibrium is separating, with the high type issuing and the low type abstaining instead",
      ],
      answer: 2,
      explanation: "This is consistency check 5: a belief contradicted by the behaviour it predicts cannot be an equilibrium. If only the low type issues, an issue reveals it, so investors price at V<sub>L</sub>, and you confirm that both types act as assumed at that price. The reversed separating answer gets the direction wrong: the low type is never sold below its worth, so it always wants to issue.",
    },
    {
      id: "kj6-s3",
      q: "Which statement about the two Myers-Majluf equilibria is right?",
      options: [
        "Pooling destroys value, because the high type's old shareholders lose to the new investors",
        "Both destroy value, each by the high type's dilution cost",
        "Neither destroys value, because investors' beliefs are rational in both",
        "Separating destroys value: the high type skips a positive-NPV project",
      ],
      answer: 3,
      explanation: "In separating the high type's project never happens, so its NPV is lost, q × NPV in expectation with q the probability of the high type: underinvestment, the same family as debt overhang. In pooling both types invest, and the high type's loss is a transfer to the low type through the new investors, not a deadweight loss. Rational beliefs do not guarantee an efficient outcome.",
    },
    {
      id: "kj6-s4",
      q: "A company sells 2 million new shares in its IPO at 50 NOK, and they close the first day at 60 NOK. Who bears the 20 million NOK left on the table?",
      options: [
        "The company, which books a 20 million loss in its accounts",
        "The underwriter, which must buy the shares back at 60",
        "The pre-IPO shareholders, who gave up shares worth 60 each for 50",
        "Nobody, because no cash changes hands on the first trading day",
      ],
      answer: 2,
      explanation: "Underpricing never appears in the company's accounts: its cash is the net proceeds either way. The cost falls on the pre-IPO owners, whose stake was diluted by more new shares than the money required. Saying nobody pays ignores that those shares could have been sold for 60.",
    },
  ],
  case: {
    id: "kj6-m1",
    open: true,
    topic: "Myers-Majluf: price the issue, then test the belief",
    points: 6,
    minutes: 10,
    body: `<p>Tindefjell ASA has assets in place worth 320 if its licence was renewed and 120 if it was not. Management knows which; the market attaches probability q = 0.40 to the high value. A new plant requires I = 80, raised today by an equity issue, and adds a publicly known NPV = 20. The firm has no cash and no access to debt, and without the issue the project is lost. Management acts for the existing shareholders, who do not buy into the issue. Figures in millions of NOK.</p>
<p>(a) Price the issue under the belief that both types issue, and state what each type does. (2 points)</p>
<p>(b) Find the equilibrium: reprice the issue under the belief that survives, and verify that both types behave as that belief assumes. (2 points)</p>
<p>(c) How much value does the information problem destroy in expectation? Name the mechanism, and say how much of the loss would be recovered if the firm instead held 80 of cash, known to everyone, to fund the project. (2 points)</p>`,
    solution: `<p><b>(a) Pooling candidate.</b> E[V | issue] = 0.40 × 320 + 0.60 × 120 = 128 + 72 = 200. Post-issue value in investors' eyes = 200 + 80 + 20 = 300, so α = 80/300 = <b>0.2667</b> (4/15).</p>
<p>High type: (11/15)(320 + 80 + 20) = (11/15)(420) = 308.0000, below the 320 it keeps by not issuing, so it does <b>not</b> issue. Its dilution (4/15)(320 − 200) = 32.0000 exceeds the NPV of 20.</p>
<p>Low type: (11/15)(120 + 80 + 20) = (11/15)(220) = 161.3333, above 120, so it issues.</p>
<p><b>(b) Consistency check 5.</b> The belief assumed both types issue, but the high type does not, so the pooling belief is not rational. The surviving belief is separating: only the low type issues, so E[V | issue] = 120 and α = 80/(120 + 80 + 20) = 80/220 = <b>0.3636</b> (4/11).</p>
<p>Low type: (7/11)(220) = 140.0000 &gt; 120, so it still issues ✓ (and 140 = V<sub>L</sub> + NPV, as it must be once its type is revealed). High type if it deviated: (7/11)(420) = 267.2727 &lt; 320, so it abstains ✓. Both behave as assumed: a separating equilibrium. Check: before the announcement the firm is worth 0.40 × 320 + 0.60 × 140 = 212, which equals 200 + 0.60 × 20 ✓</p>
<p><b>(c) Value lost.</b> The high type forgoes a project with NPV 20, so the expected loss is q × NPV = 0.40 × 20 = <b>8.00</b>. This is underinvestment caused by adverse selection, the same family as debt overhang. With 80 of cash the high type funds the project without selling any shares, so there is no dilution and its old shareholders capture the full NPV of 20. It invests, and the whole 8.00 is recovered.</p>`,
    criteria: [
      "Pooling: E[V | issue] = 200 and alpha = 80/300 = 0.2667 with I in the denominator; the high type gets 308.00, below 320, and abstains, while the low type gets 161.33 and issues.",
      "Check 5: the pooling belief is not rational; separating alpha = 80/220 = 0.3636, the low type gets 140.00 (above 120) and the high type would get only 267.27, so it abstains.",
      "Expected loss q × NPV = 0.40 × 20 = 8.00, named as underinvestment from adverse selection; cash slack recovers all of it.",
    ],
  },
});
