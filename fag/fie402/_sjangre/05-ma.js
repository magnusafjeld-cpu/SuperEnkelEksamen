/* sjanger 5 · ma · Mergers and acquisitions: stock swaps and deal probability */
window.EDU_DATA.sjangre.push({
  id: "ma",
  num: 5,
  title: "Mergers and acquisitions: stock swaps and deal probability",
  summary: "From the premium and the exchange ratio to the market's implied probability that a deal closes",
  chapters: [26],
  exam: "8 of 11 papers · H2024 E1, H2025 E6",
  intro: `<p>M&amp;A has appeared on 8 of 11 papers and on both of Kurbatov's. H2024 Exercise 1 asked for four reasons for a deal with synergies banned. H2025 Exercise 6 asked for the probability the market assigns to a deal closing, backed out of four share prices and a risk-free rate. The ladder starts with the premium and the exchange ratio, builds the stock-swap arithmetic the formula sheet only half gives you and ends with the long-short strategy. At the top you can price a stock swap, tell the offered premium from the actual one, argue motives without synergies and solve H2025 Exercise 6 with any numbers.</p>`,
  steps: [
    {
      id: "ma-1",
      title: "The acquisition premium in per cent and in kroner",
      theory: `<p>To win control, an acquirer must offer more than the target's market price. The premium measures how much more. It is always measured against the target's price <b>before</b> the bid became known: after the announcement the price already contains most of the premium. In kroner it is what the target's shareholders gain if the deal closes at the offer.</p>
<div class="formula"><div class="eq">premium (%) = offer per share/P<sub>T</sub> − 1</div><div class="eq">premium (NOK) = N<sub>T</sub> × (offer per share − P<sub>T</sub>)</div>
<div class="where">P<sub>T</sub> is the target's pre-announcement share price and N<sub>T</sub> its number of shares. T = N<sub>T</sub> × P<sub>T</sub> is the target's stand-alone equity value, so the premium in NOK is also premium (%) × T.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target has 10 million shares at 40 NOK. The acquirer offers 50 NOK per share in cash.</p><p>Premium = 50/40 − 1 = 25%. In NOK: 10 × (50 − 40) = 100 million, which is 25% × 400 million.</p></div>`,
      q: `<p>Kveldsol AS has 24 million shares, which traded at 75 NOK before any news of a bid. Fjordlys ASA then announced a cash offer of 93 NOK per share. Kveldsol now trades at 90 NOK. What is the premium, in per cent and in total NOK?</p>`,
      options: ["24.00% and 432.00 million", "3.33% and 72.00 million", "20.00% and 360.00 million", "124.00% and 2 232.00 million"],
      answer: 0,
      solution: `<p>Measure against the pre-announcement price of 75, not today's 90.</p><p>Premium per share = 93 − 75 = 18 NOK, so the premium = 93/75 − 1 = <b>24.00%</b>.</p><p>In NOK: 24 × 18 = <b>432.00 million</b>.</p>`,
      check: `<p>24% of Kveldsol's pre-bid value: 0.24 × (24 × 75) = 0.24 × 1 800 = 432.00 million ✓. Today's price of 90 lies between 75 and 93: the market has priced in most of the premium but not all of it, because the deal may still fail. A later step turns that gap into a probability.</p>`,
      traps: [
        null,
        "Measured against the post-announcement price: 93/90 − 1 = 3.33% and 24 × 3 = 72.00 million. That price already contains most of the premium.",
        "Treated today's price as the offer: 90/75 − 1 = 20.00% and 24 × 15 = 360.00 million. The offer is 93; the 90 only shows how much of the premium the market has priced in.",
        "Reported the offer instead of the premium: 93/75 = 124.00% of the old price and 24 × 93 = 2 232.00 million paid in total.",
      ],
    },
    {
      id: "ma-2",
      title: "The exchange ratio and the number of new shares",
      theory: `<p>In a stock swap the acquirer pays with its own shares. The exchange ratio ER is the number of acquirer shares each target share receives. The acquirer issues x new shares to the target's shareholders. Read the ratio as a sentence before you use it: "1 acquirer share for every 4 target shares" means ER = 1/4 = 0.25, not 4.</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub></div><div class="eq">ER = offer per target share/P<sub>A</sub></div>
<div class="where">N<sub>T</sub> is the target's number of shares and P<sub>A</sub> the acquirer's pre-announcement price. The second line converts an offer stated in NOK per target share into a ratio. Multiply by the target's share count, never the acquirer's: the new shares go to the target's holders.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target has 12 million shares. The acquirer offers 1 of its shares for every 4 target shares, so ER = 0.25 and x = 0.25 × 12 = 3 million new shares.</p><p>The same offer stated in NOK: 30 NOK per target share, paid in acquirer shares worth 120 NOK, gives ER = 30/120 = 0.25.</p></div>`,
      q: `<p>Sørlys ASA has 50 million shares. It offers 2 of its own shares for every 5 shares of Vindfang AS, which has 24 million shares. How many new Sørlys shares will be issued?</p>`,
      options: ["20.00 million", "60.00 million", "9.60 million", "59.60 million"],
      answer: 2,
      solution: `<p>"2 for every 5" means each Vindfang share receives ER = 2/5 = 0.40 Sørlys shares.</p><p>x = 0.40 × 24 = <b>9.60 million</b> new shares. Sørlys will then have 50 + 9.60 = 59.60 million shares in total.</p>`,
      check: `<p>Count in batches: 24 million Vindfang shares make 24/5 = 4.8 million batches of five. Each batch receives 2 new shares: 4.8 × 2 = 9.60 million ✓. Backwards, 9.60/24 = 0.40 = 2/5 ✓.</p>`,
      traps: [
        "Multiplied the ratio by the acquirer's share count: 0.40 × 50 = 20.00 million.",
        "Turned the ratio upside down: (5/2) × 24 = 60.00 million.",
        null,
        "Reported the total share count after the deal, 50 + 9.60 = 59.60 million, not the new shares.",
      ],
    },
    {
      id: "ma-3",
      title: "The share price after the merger",
      theory: `<p>After a stock swap the merged firm is worth the two stand-alone equity values plus the synergies, A + T + S. That value is shared by every share outstanding: the acquirer's old N<sub>A</sub> plus the x new ones. The formula is not on the formula sheet, so you must know it.</p>
<div class="formula"><div class="eq">P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="where">A = N<sub>A</sub>P<sub>A</sub> and T = N<sub>T</sub>P<sub>T</sub> at <b>pre-announcement</b> prices. S is the present value of the synergies. A post-announcement market value already contains part of S, so using it counts the synergies twice.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 10 million at 50 NOK, N<sub>T</sub> = 5 million at 20 NOK, ER = 0.5, S = 50 million.</p><p>A = 500, T = 100, x = 0.5 × 5 = 2.5. P<sub>new</sub> = (500 + 100 + 50)/(10 + 2.5) = 650/12.5 = 52.00 NOK.</p></div>`,
      q: `<p>Brattli ASA has 40 million shares at 90 NOK. It offers ER = 0.40 for each of the 16 million shares of Elvekant AS, which trade at 30 NOK. The synergies have a present value of 120 million NOK. Both prices are pre-announcement. What is the share price of the merged firm?</p>`,
      options: ["90.52 NOK", "87.93 NOK", "105.00 NOK", "75.00 NOK"],
      answer: 0,
      solution: `<p>A = 40 × 90 = 3 600 and T = 16 × 30 = 480, so A + T + S = 3 600 + 480 + 120 = 4 200 million.</p><p>x = 0.40 × 16 = 6.40 million, so N<sub>A</sub> + x = 46.40 million shares.</p><p>P<sub>new</sub> = 4 200/46.40 = <b>90.52 NOK</b>.</p>`,
      check: `<p>Split the value. Elvekant's holders get 6.40 million shares worth 6.40 × 90.5172 = 579.31 million, while Elvekant brings in T + S = 600. Brattli's old holders keep the difference, 600 − 579.31 = 20.69 million, or 0.5172 per old share: 90 + 0.5172 = 90.5172 ✓.</p>`,
      traps: [
        null,
        "Forgot the synergies: (3 600 + 480)/46.40 = 87.93 NOK.",
        "Forgot the new shares and divided by the old count: 4 200/40 = 105.00 NOK.",
        "Divided by both firms' old share counts, 40 + 16 = 56, instead of 40 + 6.40: 4 200/56 = 75.00 NOK.",
      ],
    },
    {
      id: "ma-5",
      title: "The target's ownership share y and the NPV to each side",
      theory: `<p>After the swap the target's former shareholders hold the x new shares and the acquirer's old shareholders keep their N<sub>A</sub>. The target's fraction of the merged firm is y, a ratio of share counts that depends on neither prices nor synergies. Each group's gain is what it owns after the deal minus what it had before. The acquirer's old shareholders own 1 − y of A + T + S and had A; the target's shareholders own y of it and had T. The formula sheet gives both NPV formulas but does not define y. Added together they give S: the exchange ratio only decides how the synergies are divided.</p>
<div class="formula"><div class="eq">y = x/(N<sub>A</sub> + x)</div><div class="eq">NPV<sub>A</sub> = (1 − y)(A + T + S) − A &nbsp;&nbsp; NPV<sub>T</sub> = y(A + T + S) − T</div><div class="eq">NPV<sub>A</sub> + NPV<sub>T</sub> = S &nbsp;&nbsp; NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>)</div>
<div class="where">The denominator of y is the share count after the deal, not N<sub>A</sub> and not N<sub>A</sub> + N<sub>T</sub>. The sum to S is an identity: it catches a slip in one NPV line but holds for any y. The last identity never uses y, so it is the check that catches a wrong y.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 10 million and x = 2.5 million new shares, A = 500, T = 100 and S = 50.</p><p>y = 2.5/(10 + 2.5) = 20% and A + T + S = 650. NPV<sub>A</sub> = 0.80 × 650 − 500 = 20. NPV<sub>T</sub> = 0.20 × 650 − 100 = 30. Sum: 20 + 30 = 50 = S ✓.</p></div>`,
      q: `<p>Kvitfjell ASA has 30 million shares at 150 NOK. It offers ER = 0.36 for each of the 12 million shares of Bergtind AS, which trade at 45 NOK. The synergies are worth 180 million NOK. Both prices are pre-announcement. What is the NPV of the deal for Kvitfjell's shareholders?</p>`,
      options: ["117.06 million", "−94.41 million", "160.71 million", "62.94 million"],
      answer: 3,
      solution: `<p>A = 30 × 150 = 4 500, T = 12 × 45 = 540, so A + T + S = 4 500 + 540 + 180 = 5 220.</p><p>x = 0.36 × 12 = 4.32 million and y = 4.32/34.32 = 0.125874.</p><p>NPV<sub>A</sub> = (1 − 0.125874) × 5 220 − 4 500 = 4 562.94 − 4 500 = <b>62.94 million</b>.</p>`,
      check: `<p>NPV<sub>T</sub> = 0.125874 × 5 220 − 540 = 657.06 − 540 = 117.06. Then 62.94 + 117.06 = 180.00 = S ✓. That confirms the arithmetic only. Independent route: P<sub>new</sub> = 5 220/34.32 = 152.0979, so NPV<sub>A</sub> = 30 × (152.0979 − 150) = 30 × 2.0979 = 62.94 ✓. This one would fail with a wrong y.</p>`,
      traps: [
        "Gave the target's NPV instead: 0.125874 × 5 220 − 540 = 117.06 million.",
        "Forgot the synergies: 0.8741259 × 5 040 − 4 500 = 4 405.59 − 4 500 = −94.41 million.",
        "Used the target's share of value, T/(A + T) = 540/5 040 = 0.107143, as y: 0.892857 × 5 220 − 4 500 = 160.71 million.",
        null,
      ],
    },
    {
      id: "ma-6",
      title: "The highest exchange ratio the acquirer can offer",
      theory: `<p>A higher ER hands more of the merged firm to the target, so NPV<sub>A</sub> falls as ER rises. The acquirer breaks even when it hands over the whole of T + S. The formula sheet gives that bound. The second form is the one to remember: the most the acquirer can pay per target share is the target's price plus all of the synergy per target share, converted into acquirer shares at P<sub>A</sub>.</p>
<div class="formula"><div class="eq">ER &lt; [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) &nbsp;⟺&nbsp; ER<sub>max</sub> = (P<sub>T</sub> + S/N<sub>T</sub>)/P<sub>A</sub></div>
<div class="where">At ER<sub>max</sub>, NPV<sub>A</sub> = 0 and P<sub>new</sub> = P<sub>A</sub>. The target's floor is ER<sub>min</sub> = [T/(A + S)] × (N<sub>A</sub>/N<sub>T</sub>), which is not on the sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A = 500, T = 100, S = 50, N<sub>A</sub> = 10, N<sub>T</sub> = 5, P<sub>A</sub> = 50, P<sub>T</sub> = 20.</p><p>ER<sub>max</sub> = (150/500) × (10/5) = 0.30 × 2 = 0.60. Second form: (20 + 50/5)/50 = 30/50 = 0.60 ✓.</p></div>`,
      q: `<p>Lynghaug ASA has 45 million shares at 80 NOK. Sandvik AS has 15 million shares at 50 NOK. The synergies are worth 210 million NOK and both prices are pre-announcement. What is the highest exchange ratio Lynghaug can offer before its shareholders lose from the deal?</p>`,
      options: ["0.8000", "0.6250", "0.5906", "0.0889"],
      answer: 0,
      solution: `<p>A = 45 × 80 = 3 600 and T = 15 × 50 = 750.</p><p>ER<sub>max</sub> = [(750 + 210)/3 600] × (45/15) = 0.266667 × 3 = <b>0.8000</b>.</p><p>Second form: (50 + 210/15)/80 = (50 + 14)/80 = 64/80 = 0.8000.</p>`,
      check: `<p>At ER = 0.8000, x = 0.80 × 15 = 12 million and P<sub>new</sub> = (3 600 + 750 + 210)/(45 + 12) = 4 560/57 = 80.00 = P<sub>A</sub>, so NPV<sub>A</sub> = 45 × (80 − 80) = 0 ✓.</p>`,
      traps: [
        null,
        "Left out the synergies: (750/3 600) × 3 = 0.6250. That only pays Sandvik's market price, 50/80.",
        "Gave the target's floor instead: ER<sub>min</sub> = [750/(3 600 + 210)] × 3 = 0.5906.",
        "Turned the share-count ratio upside down: 0.266667 × (15/45) = 0.0889.",
      ],
    },
    {
      id: "ma-7",
      title: "Offered premium versus actual premium",
      theory: `<p>The offered premium values the ER acquirer shares at the acquirer's old price P<sub>A</sub>. But the target's shareholders receive shares in the merged firm, worth P<sub>new</sub>, so the premium they actually get uses P<sub>new</sub>. The actual premium exceeds the offered one exactly when P<sub>new</sub> &gt; P<sub>A</sub>, that is when NPV<sub>A</sub> &gt; 0. An acquirer that overpays debases the currency it pays with. In a cash deal the two premiums coincide.</p>
<div class="formula"><div class="eq">offered premium = ER × P<sub>A</sub>/P<sub>T</sub> − 1 &nbsp;&nbsp; actual premium = ER × P<sub>new</sub>/P<sub>T</sub> − 1</div>
<div class="where">P<sub>A</sub> and P<sub>T</sub> are pre-announcement prices. NPV<sub>T</sub> = T × actual premium. Not on the formula sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>ER = 0.5, P<sub>A</sub> = 50, P<sub>T</sub> = 20 and P<sub>new</sub> = 52.</p><p>Offered = 0.5 × 50/20 − 1 = 25%. Actual = 0.5 × 52/20 − 1 = 30%. The deal lifted the acquirer's price, so the target receives more than it was offered.</p></div>`,
      q: `<p>Tindvik ASA has 50 million shares at 110 NOK. It offers ER = 0.48 for each of the 20 million shares of Fossum AS, which trade at 40 NOK. The synergies are worth 60 million NOK and both prices are pre-announcement. What premium do Fossum's shareholders actually receive?</p>`,
      options: ["32.0000%", "28.0537%", "26.8456%", "52.6400%"],
      answer: 1,
      solution: `<p>A = 50 × 110 = 5 500, T = 20 × 40 = 800 and x = 0.48 × 20 = 9.60 million.</p><p>P<sub>new</sub> = (5 500 + 800 + 60)/(50 + 9.60) = 6 360/59.60 = 106.7114 NOK.</p><p>Each Fossum share receives 0.48 × 106.7114 = 51.2215 NOK, so the actual premium = 51.2215/40 − 1 = <b>28.0537%</b>. The offered premium was 0.48 × 110/40 − 1 = 32.0000%.</p>`,
      check: `<p>NPV<sub>T</sub> = T × actual premium = 800 × 0.280537 = 224.43. Directly, y = 9.60/59.60 = 0.161074 and NPV<sub>T</sub> = 0.161074 × 6 360 − 800 = 1 024.43 − 800 = 224.43 ✓. The actual premium is below the offered one because Tindvik overpays: NPV<sub>A</sub> = 60 − 224.43 = −164.43 = 50 × (106.7114 − 110) ✓.</p>`,
      traps: [
        "Gave the offered premium, which values the shares at the old price: 0.48 × 110/40 − 1 = 32.0000%.",
        null,
        "Left the synergies out of the merged price: 6 300/59.60 = 105.7047, so 0.48 × 105.7047/40 − 1 = 26.8456%.",
        "Forgot the new shares in the merged price: 6 360/50 = 127.2000, so 0.48 × 127.2000/40 − 1 = 52.6400%.",
      ],
    },
    {
      id: "ma-10",
      title: "The long-short strategy and its two payoffs",
      theory: `<p>Between announcement and completion the target trades below what it will be worth if the deal closes, because the deal may fail. To read that risk off prices, build a position whose payoff you know in both outcomes: buy target shares and short acquirer shares in exactly the exchange ratio, then put the short-sale proceeds in the risk-free asset. If the deal completes, the target shares convert into exactly the acquirer shares you owe, so only the deposit is left. If it fails, you unwind at the prices that then hold.</p>
<div class="formula"><div class="eq">payoff if completes = short proceeds × (1 + r<sub>f</sub>)</div><div class="eq">payoff if fails = short proceeds × (1 + r<sub>f</sub>) + k × P<sub>T</sub><sup>pre</sup> − m × P<sub>A</sub><sup>pre</sup></div>
<div class="where">For "k target shares for m acquirer shares", buy k target shares and short m acquirer shares at post-announcement prices. The failure branch uses the pre-announcement prices when the question says prices return to their original levels.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>4 target shares for 1 acquirer share. Before the announcement P<sub>A</sub> = 100 and P<sub>T</sub> = 20; after it P<sub>A</sub> = 96 and P<sub>T</sub> = 23. r<sub>f</sub> = 5%.</p><p>Buy 4 target shares for 92, short 1 acquirer share for 96 and deposit the 96. Cost today: 92. Completes: 96 × 1.05 = 100.80. Fails: 100.80 + 4 × 20 − 100 = 80.80.</p></div>`,
      q: `<p>Varden ASA has announced a bid for Holmen AS. If the deal goes through in exactly one year, 3 Holmen shares will be exchanged for 1 Varden share. If it fails, both prices return to their pre-announcement levels. Before the announcement Varden traded at 102 and Holmen at 28; now Varden trades at 99 and Holmen at 31.50. The one-year risk-free rate is 4%. You buy 3 Holmen shares, short 1 Varden share and invest the short proceeds at the risk-free rate. What is your payoff in one year if the deal fails?</p>`,
      options: ["98.46", "81.00", "102.96", "84.96"],
      answer: 3,
      solution: `<p>The 99 from the short sale grows to 99 × 1.04 = 102.96.</p><p>If the deal fails, sell the 3 Holmen shares at 28 for 84 and buy back 1 Varden share at 102.</p><p>Payoff = 102.96 + 84 − 102 = <b>84.96</b>.</p>`,
      check: `<p>Spread view: one Varden share minus three Holmen shares is worth 102 − 84 = 18 if the deal fails and 0 if it completes, since the Holmen shares become the Varden share. You hold the deposit and are short that spread, so the payoffs are 102.96 − 0 = 102.96 and 102.96 − 18 = 84.96 ✓.</p>`,
      traps: [
        "Used the post-announcement prices in the failure branch: 102.96 + 3 × 31.50 − 99 = 98.46. The question says prices return to their original levels.",
        "Forgot the interest on the deposit: 99 + 84 − 102 = 81.00.",
        "Gave the payoff if the deal completes: 99 × 1.04 = 102.96.",
        null,
      ],
    },
    {
      id: "ma-11",
      title: "The market's implied probability that the deal closes",
      theory: `<p>The long-short position has one risk left: whether the deal closes. That risk comes from a regulator or a shareholder vote, it is diversifiable and so it carries no risk premium. The position's expected payoff must therefore equal its cost <b>grown at r<sub>f</sub></b>, the certainty equivalent. Solve for p. Because the risk is unpriced, p is the market's actual belief and not only a risk-neutral number.</p>
<div class="formula"><div class="eq">cost × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">1 − p = (1 + r<sub>f</sub>) × spread<sup>post</sup>/spread<sup>pre</sup> &nbsp;&nbsp; spread = m × P<sub>A</sub> − k × P<sub>T</sub></div>
<div class="where">The left side of the first line is the cost times (1 + r<sub>f</sub>), not the cost: the H2025 key singles out that error. The second line is a shortcut and a check: the spread closes to 0 if the deal completes and returns to its pre-announcement width if it fails.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: cost 92, payoffs 100.80 if the deal completes and 80.80 if it fails, r<sub>f</sub> = 5%.</p><p>Certainty equivalent = 92 × 1.05 = 96.60. p = (96.60 − 80.80)/(100.80 − 80.80) = 15.80/20 = 0.79.</p></div>`,
      q: `<p>Moe ASA has announced a bid for Lia AS. If the deal completes in exactly one year, 4 Lia shares will be exchanged for 1 Moe share. If it fails, both prices return to their pre-announcement levels. Before the announcement Moe traded at 120 and Lia at 26; immediately after, Moe trades at 116 and Lia at 28.40. The one-year risk-free rate is 3%. Using the long-short strategy, what probability does the market assign to the deal completing?</p>`,
      options: ["0.6325", "0.8455", "0.8500", "0.7940"],
      answer: 1,
      solution: `<p>Buy 4 Lia for 4 × 28.40 = 113.60, short 1 Moe for 116 and deposit it. Cost today: 113.60.</p><p>Completes: 116 × 1.03 = 119.48. Fails: 119.48 + 4 × 26 − 120 = 103.48.</p><p>Certainty equivalent: 113.60 × 1.03 = 117.008.</p><p>p = (117.008 − 103.48)/(119.48 − 103.48) = 13.528/16 = <b>0.8455</b>.</p>`,
      check: `<p>Spread route: before the announcement 120 − 4 × 26 = 16, now 116 − 113.60 = 2.40. 1 − p = 1.03 × 2.40/16 = 0.1545, so p = 0.8455 ✓. Lia at 28.40 also sits below the 116/4 = 29.00 it would be worth if completion were certain, as it must.</p>`,
      traps: [
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (113.60 − 103.48)/16 = 0.6325.",
        null,
        "Left out the risk-free rate altogether, both on the deposit and in the certainty equivalent: 1 − 2.40/16 = 0.8500.",
        "Bought Moe back at the post-announcement price of 116 in the failure branch: payoff 107.48, so p = (117.008 − 107.48)/12 = 0.7940.",
      ],
    },
    {
      id: "ma-12",
      title: "Exam level: the motive and the vote from the price reaction",
      theory: `<p>The announcement reaction tells you what the market believes about the deal. Whatever the payment method, the two sets of shareholders together own the whole merged firm, so the change in the two firms' combined market value is the market's estimate of the synergies. If the acquirer falls and the target jumps, the market thinks the acquirer pays more than the target is worth to it, so NPV<sub>A</sub> &lt; 0. Motives that predict that pattern are agency motives: empire building (managers gain from running a bigger firm) and hubris or the winner's curse. Motives that create value, such as undervaluation, a disciplinary takeover or a tax gain, should raise the two firms' combined value; they fit a falling acquirer only if it pays away more than the gain.</p>
<div class="formula"><div class="eq">S<sub>implied</sub> = N<sub>A</sub>ΔP<sub>A</sub> + N<sub>T</sub>ΔP<sub>T</sub></div><div class="eq">acquirer ↓, target ↑ ⟹ NPV<sub>A</sub> &lt; 0: empire building, hubris, winner's curse</div>
<div class="where">ΔP is the change in each share price on the announcement; keep the sign. An acquirer shareholder votes by his own NPV. If enough holders vote against, the deal fails and prices move back towards their pre-announcement levels. They may not go all the way: the bid may have revealed something about the target, or management may try again.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>An acquirer with 20 million shares falls from 80 to 76; a target with 10 million shares rises from 30 to 37. Combined value: 1 600 + 300 = 1 900 before and 1 520 + 370 = 1 890 after.</p><p>The acquirer loses 20 × 4 = 80 million and the target gains 10 × 7 = 70 million, so S<sub>implied</sub> = −80 + 70 = −10 million: 1 890 − 1 900. That fits empire building, not undervaluation.</p></div>`,
      q: `<p>Storhaug ASA is a mature firm with large cash holdings, few investment opportunities and a CEO whose bonus grows with the size of the firm. It announces an offer for Lindvik AS, a firm in an unrelated industry. Storhaug's 30 million shares fall from 140 to 131 NOK and Lindvik's 12 million shares rise from 50 to 63 NOK. Synergies are not an accepted answer. Which answer gives a motive that fits the evidence, the right vote for a Storhaug shareholder and the right prediction for the prices if most holders vote the same way?</p>`,
      options: [
        "Undervaluation: Storhaug has spotted that Lindvik is cheap and buys it below its true value. Vote in favour, since Storhaug's price recovers once the deal closes.",
        "Diversification: an unrelated business makes Storhaug's cash flows safer, which is worth a premium to its shareholders. Vote in favour and expect Storhaug's price to rise when the deal is approved.",
        "Empire building: the CEO buys size at a price above what Lindvik is worth to Storhaug. Vote against; if the deal is blocked, prices move back towards 140 and 50.",
        "Hubris: Storhaug's CEO is sure he can run Lindvik better than the market thinks and pays too much. Vote against, although a blocked deal leaves the prices at 131 and 63, since the news is already priced in.",
      ],
      answer: 2,
      solution: `<p>Read the reaction first: Storhaug fell 9 NOK and Lindvik rose 13 NOK, so the market thinks Storhaug overpays. The case lists the agency ingredients: spare cash, no good projects and a CEO paid for size. That is <b>empire building</b>. Hubris would fit the prices too, so the motive alone does not settle the question; the price prediction does.</p><p>A Storhaug shareholder loses from the deal and votes against. If most holders do the same, the deal dies, the reason for the repricing disappears and the prices move back towards 140 and 50.</p>`,
      check: `<p>Run the implied-synergy calculation: before 30 × 140 + 12 × 50 = 4 200 + 600 = 4 800 million, after 30 × 131 + 12 × 63 = 3 930 + 756 = 4 686 million. The market expects the deal to destroy 114 million while moving value to Lindvik: Storhaug loses 270 and Lindvik gains 156. Only a value-destroying motive, empire building or hubris, fits those numbers.</p>`,
      traps: [
        "Undervaluation would lift the acquirer's price. Storhaug fell, so the market thinks it overpays.",
        "Diversification that shareholders can do themselves is worth no premium; safer cash flows mainly help creditors. The price fall shows the market sees no gain.",
        null,
        "Hubris fits the price reaction and voting against is right, but the price prediction is wrong: if the deal dies, the reason for the repricing disappears and prices revert towards 140 and 50.",
      ],
    },
    {
      id: "ma-13",
      title: "Exam level: four reasons for a deal, none of them synergies",
      theory: `<p>H2024 Exercise 1 asked for four reasons in a grid: one good and one bad for the acquirer, one good and one bad for the target, one to two sentences each, with synergies banned. Synergies in disguise (cost savings, economies of scale, cross-selling) are banned too. The grid is marked box by box, so a reason in the wrong box scores nothing. Test every reason with one question: whose wealth does the mechanism move and in which direction?</p>
<table class="data"><tr><th>Box</th><th>Reasons that work</th></tr>
<tr><td>Good for the acquirer</td><td>Disciplinary takeover, undervaluation (better information), tax losses or extra debt capacity, market power</td></tr>
<tr><td>Bad for the acquirer</td><td>Empire building, hubris and the winner's curse, coinsurance handing value to creditors</td></tr>
<tr><td>Good for the target</td><td>The control premium, pushed up by the free-rider problem (no small holder sells below what his share will be worth after the takeover); relief of a financing constraint</td></tr>
<tr><td>Bad for the target</td><td>Entrenched managers accepting a low offer for private benefits, payment in overvalued acquirer shares, loss of independence</td></tr></table>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Take the reason "diversification lowers the merged firm's risk" and ask whose wealth moves. Two firms with risky debt merge, default becomes less likely and the creditors gain. Total value is unchanged, so the shareholders lose exactly what the creditors gain (consistency check 4). The reason belongs under bad for the acquirer, never under good.</p></div>`,
      q: `<p>An exam question asks for four reasons, none of them synergies: one good and one bad for the acquirer, one good and one bad for the target. Which answer earns all four boxes?</p>`,
      options: [
        "Good for acquirer: economies of scale cut the merged firm's cost per unit, so it earns more on the same sales.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: the merged cash flows are less volatile, so its equity becomes safer and worth more.<br>Bad for acquirer: empire building, the CEO overpays to run a bigger firm.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: payment in acquirer shares that later prove overvalued.",
        "Good for acquirer: a disciplinary takeover, new managers run the target's assets better.<br>Bad for acquirer: winner's curse, the winning bidder is the one who overestimated the target most.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: entrenched managers accept a low offer in return for a golden parachute.",
        "Good for acquirer: it buys a target it knows is undervalued, using better information.<br>Bad for acquirer: hubris, an overconfident CEO trusts his own high valuation.<br>Good for target: a control premium, pushed up by the free-rider problem.<br>Bad for target: empire building, the acquirer's CEO overpays to run a bigger firm.",
      ],
      answer: 2,
      solution: `<p>Every box in the winning answer names a mechanism that moves value the way the box says. A <b>disciplinary takeover</b> creates value for the acquirer by running badly run assets better. The <b>winner's curse</b> makes the acquirer overpay. The <b>control premium</b>, forced up by the free-rider problem, is a gain to the target's shareholders. <b>Entrenched managers</b> who take a golden parachute in exchange for a low offer leave the target's shareholders with less.</p><p>Each of the other answers fails one box: economies of scale is a synergy in disguise, less volatile cash flows is coinsurance and an acquirer that overpays is good news for the target.</p>`,
      check: `<p>Run the two tests on all sixteen lines. Is it a synergy in disguise? Only economies of scale is. Does the mechanism move value in the direction its box claims? Coinsurance moves value from shareholders to creditors, so it cannot be good for the acquirer; overpayment moves value to the target, so it cannot be bad for the target. The winning answer is the only one with no line failing either test ✓.</p>`,
      traps: [
        "Economies of scale is a synergy in disguise, so that box scores nothing.",
        "Less volatile cash flows is coinsurance: it moves value from shareholders to creditors, so it is bad, not good, for the acquirer.",
        null,
        "An acquirer that overpays hands value to the target's shareholders, so empire building is good, not bad, for the target.",
      ],
    },
    {
      id: "ma-14",
      title: "Exam level: the implied deal probability with a 3-for-2 ratio",
      theory: `<p>H2025 Exercise 6 gave 12 of its 20 points to the implied probability. A ratio that is not "k for 1" changes the position, not the method: "3 shares of B for 2 shares of A" means buy 3 B and short 2 A, so that the long leg converts exactly into the short leg. Then run the routine: cost today at post-announcement prices, short proceeds into the deposit, two payoffs, certainty equivalent, solve for p. Report four decimals and check with the spread.</p>
<div class="formula"><div class="eq">k shares of B for m shares of A: long k B, short m A, deposit m × P<sub>A,1</sub></div><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div>
<div class="where">The exam writes P<sub>A,0</sub> for the pre-announcement price and P<sub>A,1</sub> for the price immediately after. The failure branch uses the 0 prices for both legs.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>3 B for 2 A. Before: P<sub>A,0</sub> = 60, P<sub>B,0</sub> = 36. After: P<sub>A,1</sub> = 58, P<sub>B,1</sub> = 37.60. r<sub>f</sub> = 5%.</p><p>Buy 3 B for 112.80, short 2 A for 116 and deposit it. Completes: 116 × 1.05 = 121.80. Fails: 121.80 + 3 × 36 − 2 × 60 = 109.80. Certainty equivalent: 112.80 × 1.05 = 118.44. p = (118.44 − 109.80)/(121.80 − 109.80) = 8.64/12 = 0.72.</p><p>Spread check: 2 × 60 − 3 × 36 = 12 before and 2 × 58 − 3 × 37.60 = 3.20 after, so 1 − p = 1.05 × 3.20/12 = 0.28 ✓.</p></div>`,
      q: `<p>Company A announced that it intends to acquire company B. The news came suddenly and there was no anticipation effect. The deal will be completed or will fail in exactly one year. If it goes through, 3 shares of B will be exchanged for 2 shares of A. If it fails, prices return to their original levels. Before the announcement P<sub>A,0</sub> = 72 and P<sub>B,0</sub> = 40. Immediately after it P<sub>A,1</sub> = 69 and P<sub>B,1</sub> = 44.50. The one-year risk-free rate is 3%. Using the long-short strategy, with the short-sale proceeds invested at the risk-free rate, what probability does the market assign to the deal being completed? Give four decimals.</p>`,
      options: ["0.6400", "0.8069", "0.7425", "0.8125"],
      answer: 1,
      solution: `<table class="data"><tr><th>Leg</th><th>Today</th><th>Deal completes</th><th>Deal fails</th></tr>
<tr><td>Long 3 B</td><td class="n">−133.50</td><td>converts into 2 A</td><td class="n">+120.00</td></tr>
<tr><td>Short 2 A</td><td class="n">+138.00</td><td>closed with the 2 A received</td><td class="n">−144.00</td></tr>
<tr><td>Deposit at 3%</td><td class="n">−138.00</td><td class="n">+142.14</td><td class="n">+142.14</td></tr>
<tr><td>Total</td><td class="n">−133.50</td><td class="n">142.14</td><td class="n">118.14</td></tr></table>
<p>Certainty equivalent: 133.50 × 1.03 = 137.505.</p><p>137.505 = p × 142.14 + (1 − p) × 118.14 ⟹ 137.505 − 118.14 = p × (142.14 − 118.14) ⟹ 19.365 = 24.00p ⟹ p = <b>0.8069</b>.</p>`,
      check: `<p>Spread route: 2 × 72 − 3 × 40 = 24 before and 2 × 69 − 3 × 44.50 = 4.50 after. 1 − p = 1.03 × 4.50/24 = 0.193125, so p = 0.806875 = 0.8069 ✓.</p><p>Pricing A under the same p gives its price if the deal completes: (1.03 × 69 − 0.193125 × 72)/0.806875 = 70.8474, below 72. B is then worth (2/3) × 70.8474 = 47.2316 on completion. Discounted: (0.806875 × 47.2316 + 0.193125 × 40)/1.03 = 44.50, B's observed price ✓. The market expects the deal to cost A's shareholders and enrich B's.</p>`,
      traps: [
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (133.50 − 118.14)/24 = 0.6400.",
        null,
        "Closed the short at the post-announcement price of 69 in the failure branch: payoff 124.14, so p = (137.505 − 124.14)/18 = 0.7425.",
        "Left out the risk-free rate altogether: 1 − 4.50/24 = 0.8125.",
      ],
    },
  ],
});
