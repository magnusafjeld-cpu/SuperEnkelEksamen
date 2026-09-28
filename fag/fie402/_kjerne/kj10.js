/* kj10 · Mergers and acquisitions */
window.EDU_DATA.kjerne.push({
  id: "kj10",
  num: 10,
  title: "Mergers and acquisitions",
  chapters: [26],
  html: `
<p class="lead-in">M&amp;A opened H2024 (Exercise 1, 12 verbal points, synergies banned as a motive) and closed H2025 (Exercise 6, 20 points: the market's probability that a deal closes, from four prices and r<sub>f</sub>). You need motives and two routines: the stock swap and reading prices backwards.</p>

<h3>Motives, without saying "synergies"</h3>
<p>Targets gain a 20% to 40% premium, acquirers about nothing: each target holder can hold out for the post-deal value, so the bidder pays most of the gain away.</p>
<table class="data">
<tr><th>Motive</th><th>Mechanism</th><th>Value</th></tr>
<tr><td>Undervaluation</td><td>The acquirer knows the target is worth more than its price</td><td>Captured by the acquirer; needs better information</td></tr>
<tr><td>Market power</td><td>Fewer competitors, higher prices</td><td>At customers' expense; regulators may block it</td></tr>
<tr><td>Tax</td><td>Use the target's tax losses; steadier cash flow carries more debt</td><td>A transfer from the tax authority</td></tr>
<tr><td>Disciplinary takeover</td><td>Replace bad management</td><td>Real: the market for corporate control (kj11)</td></tr>
<tr><td>Diversification, coinsurance</td><td>Pooled cash flows default less, so risky debt gets safer</td><td>None: shareholders lose what creditors gain (check 4)</td></tr>
<tr><td>Empire building</td><td>A CEO with free cash flow buys size</td><td>Destroyed: negative NPV</td></tr>
<tr><td>Hubris, winner's curse</td><td>The winner is the bidder who overestimated most</td><td>Destroyed: overpayment</td></tr>
</table>
<p>H2024 wanted the reasons as a grid, one to two sentences each. Good for the acquirer: the value-creating motives above. Bad for the acquirer: overpayment, empire building, coinsurance, or a stock offer read as a sign that its own shares are overvalued. Good for the target: the premium, in cash and certain. Bad for the target: lost independence and private benefits, a thin auction, or payment in overvalued acquirer stock.</p>

<h3>The stock swap</h3>
<p>With share counts N<sub>A</sub>, N<sub>T</sub>, pre-announcement prices P<sub>A</sub>, P<sub>T</sub>, stand-alone values A = N<sub>A</sub>P<sub>A</sub> and T = N<sub>T</sub>P<sub>T</sub>, synergies S, and ER acquirer shares per target share:</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub> · y = x/(N<sub>A</sub> + x) · P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="eq">NPV<sub>A</sub> = (1 − y)(A + T + S) − A · NPV<sub>T</sub> = y(A + T + S) − T</div>
<div class="eq">ER<sub>max</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = (P<sub>T</sub> + S/N<sub>T</sub>)/P<sub>A</sub></div>
<div class="where">y is the target holders' share of the merged firm. The NPVs and ER<sub>max</sub> (where NPV<sub>A</sub> = 0) are on the formula sheet. Post-announcement values for A and T double count S.</div></div>
<div class="formula"><div class="eq">offered premium = ER × P<sub>A</sub>/P<sub>T</sub> − 1 · actual premium = ER × P<sub>new</sub>/P<sub>T</sub> − 1</div>
<div class="where">The target is paid in a currency the deal revalues. Since NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>), the actual premium exceeds the offered one exactly when NPV<sub>A</sub> &gt; 0.</div></div>

<div class="worked"><span class="wh">Worked example: a stock swap</span>
<p>Nordvik ASA (20 million shares at 150 NOK) offers ER = 0.4500 for Sørhavn AS (10 million shares at 60 NOK); S = 240 million.</p>
<p><b>Step 1.</b> A = 3000.00, T = 600.00, x = 0.4500 × 10.00 = 4.50, so 24.50 million shares and A + T + S = 3840.00.</p>
<p><b>Step 2.</b> y = 4.50/24.50 = 0.18367347; P<sub>new</sub> = 3840.00/24.50 = 156.7347.</p>
<p><b>Step 3.</b> NPV<sub>A</sub> = (1 − 0.18367347)(3840.00) − 3000.00 = 134.6939; NPV<sub>T</sub> = 0.18367347(3840.00) − 600.00 = 105.3061.</p>
<p><b>Step 4.</b> ER<sub>max</sub> = (60.00 + 24.00)/150.00 = 0.5600 &gt; 0.4500.</p>
<p><b>Step 5.</b> Offered premium = 0.4500 × 150.00/60.00 − 1 = 12.5000%; actual = 0.4500 × 156.7347/60.00 − 1 = 17.5510%, higher because NPV<sub>A</sub> &gt; 0.</p>
<p><b>First check:</b> 134.6939 + 105.3061 = 240.0000 = S ✓, but it holds for any y, so it only catches a slip in one line. <b>Second check:</b> N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>) = 20.00 × 6.734694 = 134.6939 ✓; it skips y, so a wrong y fails it. Neither catches a wrong x, such as an inverted ER.</p></div>

<p><b>EPS accretion is not value creation.</b> Merged EPS rises whenever the P/E paid for the target is below the acquirer's own, even at zero premium with S = 0, where P<sub>new</sub> = P<sub>A</sub>.</p>

<h3>Reading the prices backwards</h3>
<p>The market's synergy estimate is the change in combined market value, for cash or stock:</p>
<div class="formula"><div class="eq">S<sub>implied</sub> = (N<sub>A</sub>P<sub>A</sub><sup>post</sup> + N<sub>T</sub>P<sub>T</sub><sup>post</sup>) − (A + T)</div>
<div class="where">Biased down if the deal may fail, up if the bid revealed news about the target. In a cash deal the acquirer gains S − premium, which with the target at the offer is its price change by construction: an identity, not a test.</div></div>
<p>For the deal probability, go long the target and short the acquirer in the exchange ratio, proceeds at r<sub>f</sub>:</p>
<div class="formula"><div class="eq">cost × (1 + r<sub>f</sub>) = p × payoff(completes) + (1 − p) × payoff(fails)</div>
<div class="where">Not on the sheet. When the question says prices revert if the deal fails, the failure branch uses pre-announcement prices.</div></div>
<div class="callout mech"><span class="h">Why r<sub>f</sub>, and why p is a real forecast</span>On completion the long leg becomes the short leg, so only the deal outcome is left. That risk is diversifiable and earns no premium, so the risk-neutral p is the market's actual belief.</div>

<div class="worked"><span class="wh">Worked example: the implied probability (H2025 Exercise 6)</span>
<p>On completion in one year, 5 B shares become 1 A share (ER = 0.2000); on failure prices revert. Before: P<sub>A</sub> = 110, P<sub>B</sub> = 16; after: 105 and 20; r<sub>f</sub> = 3%.</p>
<p><b>Step 1.</b> Buy 5 B for 100, short 1 A for 105, deposit the 105: cost 100.</p>
<p><b>Step 2.</b> Completes: the B shares close the short, leaving 105 × 1.03 = 108.15. Fails: 108.15 + 5 × 16 − 110 = 78.15.</p>
<p><b>Step 3.</b> 100 × 1.03 = 103.00 = 108.15p + 78.15(1 − p), so p = 24.85/30.00 = 0.828333 ≈ 0.8283.</p>
<p><b>The same equation as a spread:</b> 1 A minus 5 B is worth 5 now, 0 on completion, 30 on failure: 1 − p = 5 × 1.03/30 = 0.171667 ✓. A quicker route, not an independent check: a wrong failure price enters both.</p>
<p><b>Read it.</b> Pricing A with the same p, 1.03 × 105 = 0.828333 A<sub>s</sub> + 0.171667 × 110, so A<sub>s</sub> = 107.7666, below its failure price of 110. The deal destroys value for A's holders (empire building or hubris); they vote against.</p></div>

<div class="callout warn"><span class="h">Errors that cost the points</span>Equating the expected payoff to the cost, not cost × (1 + r<sub>f</sub>): p = 0.7283 here, the error the H2025 key names. Post-announcement prices in the failure branch. Reversing the ratio ("5 B for 1 A" is 0.2000 A per B). Giving the offered premium when the actual was asked.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Beyond synergies: undervaluation, market power, tax and disciplinary takeovers; coinsurance only moves value to creditors; empire building and hubris destroy it.</li>
<li>Reasons by side: the premium is good for the target; overpayment, empire building and coinsurance are bad for the acquirer; lost independence, a thin auction and overvalued acquirer stock are bad for the target.</li>
<li>The actual premium exceeds the offered one exactly when the deal is positive-NPV for the acquirer.</li>
<li>EPS accretion from buying a lower P/E is arithmetic, not value.</li>
<li>Deal probability: go long the target and short ER acquirer shares per target share, proceeds at r<sub>f</sub>; its cost × (1 + r<sub>f</sub>) equals its expected payoff, with pre-announcement prices in the failure branch when prices revert.</li></ul></div>
`,
  checks: [
    {
      id: "kj10-s1",
      q: "A stock offer at a fixed exchange ratio is announced, and the acquirer's share price falls on the news. Compared with the offered premium, the premium the target's shareholders actually receive is…",
      options: [
        "the same, because the exchange ratio is fixed in the offer",
        "smaller, because they are paid in acquirer shares the deal has devalued",
        "larger, because the target's own share price jumps on the announcement",
        "larger, because a lower acquirer price means they receive more acquirer shares",
      ],
      answer: 1,
      explanation: "The actual premium is ER × P<sub>new</sub>/P<sub>T</sub> − 1 and the offered one ER × P<sub>A</sub>/P<sub>T</sub> − 1, so they differ by the factor P<sub>new</sub>/P<sub>A</sub>. A falling acquirer price means NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>) is negative, and the target is paid in that debased currency. A fixed ratio fixes the number of shares, not their value, which is what the answer about receiving more shares gets wrong: that describes a fixed-value offer.",
    },
    {
      id: "kj10-s2",
      q: "In the long-short calculation of a deal probability you set p × payoff(completes) + (1 − p) × payoff(fails) equal to the cost × (1 + r<sub>f</sub>). What justifies this, and what does it make p?",
      options: [
        "Only diversifiable deal risk is left, so the position earns r<sub>f</sub> and p is the market's real forecast",
        "The two legs cancel in both outcomes, so the position is risk-free and p drops out of the equation",
        "The expected payoff should equal the cost itself; the factor (1 + r<sub>f</sub>) is only a refinement for deals longer than a year",
        "Deal risk is systematic, so p is a risk-neutral probability that overstates the true chance of completion",
      ],
      answer: 0,
      explanation: "When the deal completes the long leg turns into the short leg, and when it fails both return to known prices, so the only uncertainty is the binary deal outcome. That risk carries no premium, so the position's expected payoff grows at r<sub>f</sub>, and the risk-neutral p coincides with the real belief. Dropping the (1 + r<sub>f</sub>) is the error the H2025 key singles out; in the exam's numbers it moves p from 0.8283 to 0.7283.",
    },
    {
      id: "kj10-s3",
      q: "A high-P/E acquirer buys a low-P/E target with its own shares at a zero premium, and S = 0. After the merger…",
      options: [
        "EPS rises and the share price rises, because the market applies the acquirer's P/E to the target's earnings",
        "EPS rises and the share price is unchanged, because no value is created or moved",
        "EPS falls, because new shares are issued to the target's shareholders",
        "EPS and the share price are both unchanged, because both firms were fairly priced",
      ],
      answer: 1,
      explanation: "Buying earnings at a lower P/E than your own always raises EPS, because the earnings bought per new share exceed your own EPS. With S = 0 and no premium, x = T/P<sub>A</sub>, so P<sub>new</sub> = (A + T)/(N<sub>A</sub> + x) = P<sub>A</sub> exactly. The answer in which the market applies the acquirer's multiple to the new earnings is the bootstrap illusion: the merged P/E falls instead, because slower-growing earnings were added.",
    },
  ],
  case: {
    id: "kj10-m1",
    open: true,
    topic: "The implied probability that a deal closes",
    points: 6,
    minutes: 10,
    body: `<p>Solberg Maskin ASA (A) announces a bid for Tunhovd Hydraulikk AS (T). The bid was not anticipated. The deal will complete or fail in exactly one year: if it completes, every 4 T shares are exchanged for 3 A shares; if it fails, both prices return to their pre-announcement levels. Before the announcement P<sub>A</sub> = 84.00 and P<sub>T</sub> = 56.00; immediately after, P<sub>A</sub> = 80.00 and P<sub>T</sub> = 58.50. The one-year risk-free rate is 2.5%.</p>
<p>(a) Build the long-short position a merger arbitrageur would hold, sized to one exchange at the announced ratio, with the short-sale proceeds invested at the risk-free rate. Give its cost today and its payoff if the deal completes and if it fails. (2 points)</p>
<p>(b) Compute the probability of completion implied by the market, and redo it with the merger spread. (2 points)</p>
<p>(c) Using the same probability and the risk-free rate, what price of A in one year, if the deal completes, is consistent with today's 80.00? What does that say about the deal for A's shareholders, and how should they vote? (2 points)</p>`,
    solution: `<p><b>(a) The position.</b> The ratio is 0.7500 A shares per T share, so hold 4 T against 3 A. Buy 4 T for 4 × 58.50 = 234.00, short 3 A for 3 × 80.00 = 240.00 and deposit the 240.00 at 2.5%. Net cost 234.00. If the deal completes, the 4 T become the 3 A you owe, leaving the deposit: 240.00 × 1.025 = 246.00. If it fails, you sell 4 T at 56.00 and buy back 3 A at 84.00: 246.00 + 224.00 − 252.00 = 218.00.</p>
<p><b>(b) The probability.</b> The only risk left is deal risk, which is diversifiable, so the expected payoff equals the cost grown at r<sub>f</sub>: 234.00 × 1.025 = 239.85 = 246.00p + 218.00(1 − p). So 21.85 = 28.00p and p = 0.780357 ≈ 0.7804. The spread gives the same equation faster: 3 A minus 4 T is worth 240.00 − 234.00 = 6.00 today, 0 if the deal completes and 252.00 − 224.00 = 28.00 if it fails, so 1 − p = 6.00 × 1.025/28.00 = 6.15/28.00 = 0.219643 and p = 0.780357 ✓. It is the same position without the deposit, so it catches arithmetic, not a wrong set-up.</p>
<p><b>(c) What the price says.</b> 80.00 × 1.025 = 82.00 = 0.780357 A<sub>s</sub> + 0.219643 × 84.00 = 0.780357 A<sub>s</sub> + 18.45, so A<sub>s</sub> = 63.55/0.780357 = 81.4371. A is worth 2.5629 less per share if the deal completes than if it fails (84.00), while T's holders would get 0.75 × 81.4371 = 61.0778 against 56.00, a gain of 9.0675%. The market sees a negative-NPV deal for A, which points to empire building or hubris rather than synergies, so A's shareholders should vote against it; if the deal is then dropped, prices move back towards 84.00 and 56.00.</p>`,
    criteria: [
      "Correct position: long 4 T, short 3 A (0.75 A per T), net cost 234.00; payoffs 246.00 if the deal completes and 218.00 if it fails, with pre-announcement prices in the failure branch.",
      "Expected payoff set equal to the cost times (1 + r_f), 239.85, not the cost: p = 0.7804. Setting it equal to 234.00 gives the wrong p = 0.5714.",
      "The same p from the merger spread: 1 - p = 1.025 x 6.00/28.00 = 0.2196.",
      "Completion price of A = 81.4371, below 84.00: the deal is value-destroying for A's holders, so they vote against.",
    ],
  },
});
