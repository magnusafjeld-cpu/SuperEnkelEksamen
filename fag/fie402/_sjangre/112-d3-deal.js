/* sjanger 112 · d3-deal · The market's implied deal probability (kort stige, del 3) */
window.EDU_DATA.sjangre.push({
  id: "d3-deal",
  num: 112,
  title: "The market's implied deal probability",
  summary: "The long-short position, the probability the prices imply, the self-financed version, months to completion and the synergies the market prices in",
  chapters: [26],
  exam: "H2025 E6, 12 of its 20 points · Vodafone-Mannesmann flagged for 2026",
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  intro: `<p>H2025 Exercise 6 gave 12 of its 20 points to one number: the probability the market assigns to a deal closing, backed out of four share prices and a risk-free rate. Kurbatov called it "almost a direct copy" of the lecture's Vodafone-Mannesmann example, so expect a variant: another deadline, the self-financed position or the synergies the prices imply. This ladder builds the long-short position, solves for p, adds the months and ends with the comment on your assumptions and the synergies the market prices in.</p>`,
  steps: [
    {
      id: "d3-deal-1",
      title: "The long-short position and its two payoffs",
      theory: `<p>After a stock offer is announced, the target trades below what the offer is worth, because the deal may fail. To read that risk off prices, build a position whose payoff you know in both outcomes. For an offer of "k B shares for m A shares", where A is the acquirer and B the target: buy k B shares, short m A shares and put the short-sale proceeds in the risk-free asset. If the deal completes, the k B shares convert into exactly the m A shares you owe, so the stock legs cancel and only the deposit is left. If it fails, you unwind at the prices that then hold.</p>
<div class="formula"><div class="eq">payoff if the deal completes = m × P<sub>A,1</sub> × (1 + r<sub>f</sub>)</div><div class="eq">payoff if it fails = m × P<sub>A,1</sub> × (1 + r<sub>f</sub>) + k × P<sub>B,0</sub> − m × P<sub>A,0</sub></div>
<div class="where">P<sub>A,0</sub> and P<sub>B,0</sub> are the pre-announcement prices, P<sub>A,1</sub> and P<sub>B,1</sub> the prices just after. The position costs k × P<sub>B,1</sub> today. The failure branch uses the 0 prices when the question says prices return to their original levels.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Whatever A's share is worth on completion, you receive it and hand it straight back. That cancels everything about the two businesses and leaves a bet on one event: does the deal go through?</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>1 A share for 2 B shares, decided in one year. Before: P<sub>A,0</sub> = 60 and P<sub>B,0</sub> = 25. After: P<sub>A,1</sub> = 58 and P<sub>B,1</sub> = 28. r<sub>f</sub> = 5%.</p><p>Buy 2 B for 56, short 1 A for 58 and deposit the 58. Cost today: 56. Completes: 58 × 1.05 = 60.90. Fails: 60.90 + 2 × 25 − 60 = 50.90.</p></div>`,
      q: `<p>Lyngvær ASA (A) has bid for Strand AS (B). If the deal completes in one year, 5 Strand shares are exchanged for 2 Lyngvær shares. If it fails, both prices return to their pre-announcement levels. Before the bid P<sub>A,0</sub> = 75 and P<sub>B,0</sub> = 26; now P<sub>A,1</sub> = 72 and P<sub>B,1</sub> = 28.20. r<sub>f</sub> = 4%. You buy 5 Strand shares, short 2 Lyngvær shares and deposit the proceeds at r<sub>f</sub>. What are your payoffs in one year if the deal completes and if it fails?</p>`,
      options: ["144.00 and 124.00", "149.76 and 129.76", "149.76 and 146.76", "374.40 and 51.40"],
      answer: 1,
      solution: `<p>Short 2 Lyngvær at 72: 144 into the deposit, which grows to 144 × 1.04 = 149.76.</p><p>Completes: the 5 Strand shares become the 2 Lyngvær shares you owe, so you keep <b>149.76</b>.</p><p>Fails: sell 5 Strand at 26 for 130 and buy back 2 Lyngvær at 75 for 150: 149.76 + 130 − 150 = <b>129.76</b>.</p>`,
      check: `<p>The gap between the payoffs is the pre-announcement spread: 2 × 75 − 5 × 26 = 20 = 149.76 − 129.76 ✓ You are short that spread. It closes to 0 if the deal completes and opens back to 20 if it fails. The position costs 5 × 28.20 = 141.00 today, between the two payoffs discounted at 4%, 124.77 and 144.00, as it must.</p>`,
      traps: [
        "Forgot the interest on the deposit: 144.00 and 144 + 130 − 150 = 124.00.",
        null,
        "Unwound at the post-announcement prices in the failure branch: 149.76 + 5 × 28.20 − 2 × 72 = 146.76. The question says prices return to 75 and 26.",
        "Turned the ratio upside down: shorted 5 Lyngvær for 360 and bought 2 Strand, so 360 × 1.04 = 374.40 and 374.40 + 2 × 26 − 5 × 75 = 51.40.",
      ],
    },
    {
      id: "d3-deal-2",
      title: "The implied probability from today's prices",
      theory: `<p>The position's only risk is whether the deal closes. That risk comes from a regulator or a shareholder vote. It is diversifiable, so it carries no risk premium. The position's expected payoff must then equal its cost grown at r<sub>f</sub>, the certainty equivalent. Solve for p. The H2025 key singles out the error of setting the expected payoff equal to the cost itself.</p>
<div class="formula"><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>) = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">shortcut: 1 − p = (1 + r<sub>f</sub>) × spread<sup>post</sup>/spread<sup>pre</sup> &nbsp;&nbsp; spread = m × P<sub>A</sub> − k × P<sub>B</sub></div>
<div class="where">spread<sup>pre</sup> uses the pre-announcement prices, spread<sup>post</sup> today's. Show the first line on the exam; use the second as a check. Because you discount at r<sub>f</sub>, p is a risk-neutral probability.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The spread is a bet on failure. It closes to zero if the deal completes and returns to its old width if it fails. The narrower it is today compared with that old width, the surer the market is that the deal will close.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: cost 56, payoffs 60.90 and 50.90, r<sub>f</sub> = 5%.</p><p>56 × 1.05 = 58.80 = p × 60.90 + (1 − p) × 50.90, so p = (58.80 − 50.90)/(60.90 − 50.90) = 7.90/10 = 0.7900.</p><p>Shortcut: spread<sup>pre</sup> = 60 − 50 = 10 and spread<sup>post</sup> = 58 − 56 = 2. 1 − p = 1.05 × 2/10 = 0.21 ✓</p></div>`,
      q: `<p>Fonnes ASA (A) has bid for Hamre AS (B): 3 Fonnes shares for every 4 Hamre shares, completing or failing in exactly one year. If it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 48 and P<sub>B,0</sub> = 30. Now: P<sub>A,1</sub> = 47 and P<sub>B,1</sub> = 34. r<sub>f</sub> = 3%. What probability does the market assign to completion? Give four decimals.</p>`,
      options: ["0.7854", "0.6154", "0.9562", "0.7917"],
      answer: 0,
      solution: `<p>Buy 4 Hamre for 4 × 34 = 136, short 3 Fonnes for 3 × 47 = 141 and deposit the 141. Cost today: 136.</p><p>Completes: 141 × 1.03 = 145.23. Fails: 145.23 + 4 × 30 − 3 × 48 = 145.23 + 120 − 144 = 121.23.</p><p>Certainty equivalent: 136 × 1.03 = 140.08.</p><p>p = (140.08 − 121.23)/(145.23 − 121.23) = 18.85/24 = <b>0.7854</b>.</p>`,
      check: `<p>Spread route: spread<sup>pre</sup> = 144 − 120 = 24 and spread<sup>post</sup> = 141 − 136 = 5. 1 − p = 1.03 × 5/24 = 0.214583, so p = 0.785417 ✓ Hamre at 34 also sits below the 0.75 × 47 = 35.25 it would fetch if completion were certain.</p>`,
      traps: [
        null,
        "Set the expected payoff equal to the cost, not the cost grown at r<sub>f</sub>: (136 − 121.23)/24 = 0.6154.",
        "Priced Hamre alone, as if it converts into Fonnes at today's 47: 34 × 1.03 = p × 35.25 + (1 − p) × 30 gives 0.9562. Fonnes' price on completion is unknown; the short hedges it out.",
        "Left out the risk-free rate altogether: 1 − 5/24 = 0.7917.",
      ],
    },
    {
      id: "d3-deal-3",
      title: "Kurbatov's self-financed version gives the same p",
      theory: `<p>Kurbatov suggested a variant in class: short first and pay for the target out of the proceeds. Short m A shares, buy k B shares with part of the money and deposit the rest, which is today's spread. The position costs nothing. If the deal completes, the stock legs cancel and you keep the deposit grown at r<sub>f</sub>. If it fails, you unwind at the old prices and lose money. A position that costs 0 must have a risk-neutral expected payoff of 0.</p>
<div class="formula"><div class="eq">deposit = m × P<sub>A,1</sub> − k × P<sub>B,1</sub> = spread<sup>post</sup></div><div class="eq">0 = p × deposit × (1 + r<sub>f</sub>) + (1 − p) × [deposit × (1 + r<sub>f</sub>) + k × P<sub>B,0</sub> − m × P<sub>A,0</sub>]</div>
<div class="where">The failure payoff is negative: the deposit is smaller than the cost of closing the short. In Kurbatov's words, "you should arrive at the same number".</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The self-financed position is the standard one with your own money taken out. That lowers both payoffs by the same risk-free amount, so it cannot change which probability makes the price fair.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The deal from the first example: short 1 A for 58, buy 2 B for 56 and deposit 2. Completes: 2 × 1.05 = 2.10. Fails: 2.10 + 2 × 25 − 60 = −7.90.</p><p>0 = p × 2.10 + (1 − p) × (−7.90), so p = 7.90/(2.10 + 7.90) = 0.7900, as before.</p></div>`,
      q: `<p>Bølstad ASA (A) has bid for Kroken AS (B): 1 Bølstad share for every 3 Kroken shares, completing or failing in one year. If it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 90 and P<sub>B,0</sub> = 24. Now: P<sub>A,1</sub> = 87 and P<sub>B,1</sub> = 27.50. r<sub>f</sub> = 5%. You short 1 Bølstad share, buy 3 Kroken shares with the proceeds and deposit the rest at r<sub>f</sub>. What probability of completion does this position imply?</p>`,
      options: ["0.7500", "0.9875", "0.7375", "0.7921"],
      answer: 2,
      solution: `<p>Short 1 Bølstad: +87. Buy 3 Kroken: −82.50. Deposit the remaining 4.50. Cost today: 0.</p><p>Completes: 4.50 × 1.05 = 4.725. Fails: 4.725 + 3 × 24 − 90 = 4.725 + 72 − 90 = −13.275.</p><p>0 = p × 4.725 + (1 − p) × (−13.275), so p = 13.275/(4.725 + 13.275) = 13.275/18 = <b>0.7375</b>.</p>`,
      check: `<p>Standard position: cost 82.50, payoffs 87 × 1.05 = 91.35 and 91.35 + 72 − 90 = 73.35, certainty equivalent 82.50 × 1.05 = 86.625. p = (86.625 − 73.35)/(91.35 − 73.35) = 13.275/18 = 0.7375 ✓ Both standard payoffs are exactly 86.625 higher than the self-financed ones: the money you put in, grown at r<sub>f</sub>.</p>`,
      traps: [
        "Forgot to grow the deposit: 0 = p × 4.50 + (1 − p) × (−13.50) gives 0.7500, the same as leaving r<sub>f</sub> out altogether.",
        "Treated the 4.50 deposit as the position's cost: 4.50 = p × 4.725 + (1 − p) × (−13.275) gives 0.9875. The deposit comes from the short sale, so the cost is 0.",
        null,
        "Left the deposit out of the failure payoff: 0 = p × 4.725 + (1 − p) × (−18) gives 0.7921. The deposit is yours in both outcomes.",
      ],
    },
    {
      id: "d3-deal-4",
      title: "When the deal is decided in a few months",
      theory: `<p>Real deals are decided in months, not in exactly one year. The position is then held only until the decision, so both the deposit and the cost grow at (1 + r<sub>f</sub>)<sup>t</sup>, with t the time in years: 0.25 for three months, 4/12 for four. Nothing else changes. Kurbatov's Vodafone-Mannesmann example had three months to go. With a cash offer you need no short at all: the target alone is the position, worth the cash price if the deal completes and P<sub>B,0</sub> if it fails.</p>
<div class="formula"><div class="eq">k × P<sub>B,1</sub> × (1 + r<sub>f</sub>)<sup>t</sup> = p × payoff if completes + (1 − p) × payoff if fails</div><div class="eq">1 − p = (1 + r<sub>f</sub>)<sup>t</sup> × spread<sup>post</sup>/spread<sup>pre</sup></div>
<div class="where">r<sub>f</sub> is the annual rate. Grow both sides for the same t: the deposit inside both payoffs and the cost on the left. For a cash offer: P<sub>B,1</sub>(1 + r<sub>f</sub>)<sup>t</sup> = p × cash price + (1 − p) × P<sub>B,0</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The position only has to earn the risk-free rate for the months it is held. Growing it for a full year asks too much of it, which inflates the failure probability and understates p.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>2 A shares for each B share, decided in 6 months. Before: P<sub>A,0</sub> = 20 and P<sub>B,0</sub> = 30. After: P<sub>A,1</sub> = 19.50 and P<sub>B,1</sub> = 36. r<sub>f</sub> = 6%, so 1.06<sup>0.5</sup> = 1.029563.</p><p>Buy 1 B for 36, short 2 A for 39. Completes: 39 × 1.029563 = 40.1530. Fails: 40.1530 + 30 − 40 = 30.1530. Certainty equivalent: 36 × 1.029563 = 37.0643. p = (37.0643 − 30.1530)/10 = 0.6911.</p></div>`,
      q: `<p>Engen ASA (A) has bid for Vikan AS (B): 5 Engen shares for every 2 Vikan shares. The deal completes or fails in exactly 4 months; if it fails, prices return to their pre-announcement levels. Before: P<sub>A,0</sub> = 16 and P<sub>B,0</sub> = 34. Now: P<sub>A,1</sub> = 15.60 and P<sub>B,1</sub> = 37.20. The risk-free rate is 4.5% a year. What probability does the market assign to completion? Give four decimals.</p>`,
      options: ["0.6865", "0.6039", "0.7000", "0.6956"],
      answer: 3,
      solution: `<p>Growth factor: 1.045<sup>4/12</sup> = 1.014781.</p><p>Buy 2 Vikan for 74.40, short 5 Engen for 78 and deposit the 78. Completes: 78 × 1.014781 = 79.1529. Fails: 79.1529 + 2 × 34 − 5 × 16 = 79.1529 + 68 − 80 = 67.1529.</p><p>Certainty equivalent: 74.40 × 1.014781 = 75.4997.</p><p>p = (75.4997 − 67.1529)/(79.1529 − 67.1529) = 8.3468/12 = <b>0.6956</b>.</p>`,
      check: `<p>Spread route: spread<sup>pre</sup> = 80 − 68 = 12 and spread<sup>post</sup> = 78 − 74.40 = 3.60. 1 − p = 1.014781 × 3.60/12 = 0.304434, so p = 0.695566 ✓ Vikan at 37.20 sits below the 2.5 × 15.60 = 39.00 it would fetch on certain completion.</p>`,
      traps: [
        "Grew the position for a full year: 1 − 1.045 × 3.60/12 = 0.6865. The deal is decided in 4 months.",
        "Set the expected payoff equal to the cost, not the cost grown for 4 months: (74.40 − 67.1529)/12 = 0.6039.",
        "Left out the risk-free rate altogether: 1 − 3.60/12 = 0.7000.",
        null,
      ],
    },
    {
      id: "d3-deal-5",
      title: "The assumptions behind p and what breaks them",
      theory: `<p>Questions on the deal probability often end with "comment". These are the assumptions Kurbatov listed:</p>
<ul><li>if the deal fails, prices return exactly to their pre-announcement levels (in Kurbatov's words "extremely strong")</li><li>nothing else happens to the two firms before the decision</li><li>short selling is allowed and the proceeds earn r<sub>f</sub></li><li>r<sub>f</sub> is known and the market prices consistently, with no obvious arbitrage</li></ul>
<p>p is a risk-neutral probability. It equals the market's real belief only if deal risk carries no risk premium. Know which way each broken assumption pushes p.</p>
<div class="formula"><div class="eq">p = [cost × (1 + r<sub>f</sub>)<sup>t</sup> − payoff if fails]/(payoff if completes − payoff if fails)</div>
<div class="where">A higher failure payoff lowers p. A required return above r<sub>f</sub> on the position puts the real probability above the risk-neutral p.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Today's price blends the two outcomes. If failure is less bad than you assumed, less weight on completion is needed to explain the same price, so your p was too high.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The first example gave p = 0.7900 with B back at 25 if the deal fails. Suppose the bid revealed that B is worth more, so it would settle at 26. The failure payoff rises from 50.90 to 60.90 + 52 − 60 = 52.90 and p = (58.80 − 52.90)/(60.90 − 52.90) = 0.7375.</p><p>If instead arbitrageurs demand 7% on the position rather than 5%: 56 × 1.07 = 59.92 and the real probability is (59.92 − 50.90)/10 = 0.9020.</p></div>`,
      q: `<p>An exam question has you compute the market's probability that a stock deal completes, using the long-short position and assuming that prices return to their pre-announcement levels if it fails. It ends with "comment on your result". Which comment is right?</p>`,
      options: [
        "If the bid revealed that the target is worth more, it will not fall all the way back on failure, so p is overstated.",
        "If deal risk carries a risk premium, the market's real probability of completion is lower than the p you computed.",
        "The result relies on known synergies, since the position's payoff if the deal completes depends on them.",
        "Short selling is not needed: buying the target alone and valuing it at today's acquirer price gives the same p.",
      ],
      answer: 0,
      solution: `<p>A higher failure payoff means less probability on completion is needed to explain today's price. If the target settles above its old price when the deal dies, the true failure payoff is higher than the one you used, so <b>the p computed with full reversion is too high</b>.</p><p>A risk premium works the other way: the real probability is above the risk-neutral p. The synergies never enter: on completion the stock legs cancel and only the deposit is left. Buying the target alone leaves you exposed to the acquirer's price on completion, which is unknown today.</p>`,
      check: `<p>Run the example: with the target at 26 rather than 25 on failure, p fell from 0.7900 to 0.7375 ✓ With a 7% required return instead of 5%, the probability rose to 0.9020, above 0.7900 ✓</p>`,
      traps: [
        null,
        "Backwards. A risk premium means the position must earn more than r<sub>f</sub>, which needs more weight on the good outcome: the real probability is higher than p.",
        "The synergies cancel out of the position: on completion the stock legs offset each other and only the deposit is left.",
        "Buying the target alone leaves you exposed to the acquirer's unknown price on completion. The short hedges that price out.",
      ],
    },
    {
      id: "d3-deal-6",
      title: "Exam level: from the deal probability to the synergies the market prices in",
      theory: `<p>Kurbatov called Vodafone's bid for Mannesmann one of the biggest exercises to focus on. The full chain: the long-short position, p with the months, then what the market believes about synergies. On completion the merged firm is worth the two stand-alone values plus S; on failure the two firms fall back to their stand-alone values. Today's combined market value is the p-weighted blend of the two, discounted at r<sub>f</sub>. Solve for S.</p>
<div class="formula"><div class="eq">(N<sub>A</sub>P<sub>A,1</sub> + N<sub>B</sub>P<sub>B,1</sub>) × (1 + r<sub>f</sub>)<sup>t</sup> = (N<sub>A</sub>P<sub>A,0</sub> + N<sub>B</sub>P<sub>B,0</sub>) + p × S</div>
<div class="where">S is valued at the decision date. Second route: price A alone, P<sub>A,1</sub>(1 + r<sub>f</sub>)<sup>t</sup> = p × P<sub>A</sub><sup>complete</sup> + (1 − p) × P<sub>A,0</sub>, then S = (N<sub>A</sub> + ER × N<sub>B</sub>) × P<sub>A</sub><sup>complete</sup> − (N<sub>A</sub>P<sub>A,0</sub> + N<sub>B</sub>P<sub>B,0</sub>). The two routes must agree.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The jump in combined market value is not the synergy. It is the synergy weighted by the chance that the deal closes and discounted for the wait. Undo both and you get what the market expects S to be if the deal goes through.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>4 A shares per B share, decided in 6 months, r<sub>f</sub> = 4%: 1.04<sup>0.5</sup> = 1.019804. N<sub>A</sub> = 200 million and N<sub>B</sub> = 30 million. Before: P<sub>A,0</sub> = 25 and P<sub>B,0</sub> = 80. After: P<sub>A,1</sub> = 26 and P<sub>B,1</sub> = 96.</p><p>Per B share: spread<sup>pre</sup> = 100 − 80 = 20 and spread<sup>post</sup> = 104 − 96 = 8, so 1 − p = 1.019804 × 8/20 = 0.407922 and p = 0.592078.</p><p>Combined value: 200 × 25 + 30 × 80 = 7 400 before and 200 × 26 + 30 × 96 = 8 080 after. S = (8 080 × 1.019804 − 7 400)/0.592078 = 840.02/0.592078 = 1 418.76 million.</p></div>`,
      q: `<p>Brattvåg ASA (A, 600 million shares) has bid for Langøy ASA (B, 40 million shares): 12.5 Brattvåg shares for each Langøy share. The deal completes or fails in exactly 3 months; if it fails, both prices return to their pre-announcement levels, which reflect stand-alone values. Before: P<sub>A,0</sub> = 8.00 and P<sub>B,0</sub> = 85. Just after: P<sub>A,1</sub> = 8.40 and P<sub>B,1</sub> = 98. The risk-free rate is 5% a year. What synergies, in million NOK and valued at the decision date, does the market price in?</p>`,
      options: ["760.00", "869.96", "2 368.63", "1 648.88"],
      answer: 3,
      solution: `<p><b>1. p.</b> 1.05<sup>0.25</sup> = 1.012272. Buy 1 Langøy for 98, short 12.5 Brattvåg for 105 and deposit the 105. Completes: 105 × 1.012272 = 106.2886. Fails: 106.2886 + 85 − 12.5 × 8 = 91.2886. Certainty equivalent: 98 × 1.012272 = 99.2027. p = (99.2027 − 91.2886)/15 = 7.9141/15 = 0.5276.</p><p><b>2. Combined value.</b> Before: 600 × 8 + 40 × 85 = 4 800 + 3 400 = 8 200. Now: 600 × 8.40 + 40 × 98 = 5 040 + 3 920 = 8 960.</p><p><b>3. S.</b> 8 960 × 1.012272 = 9 069.96, so p × S = 9 069.96 − 8 200 = 869.96 and S = 869.96/0.527606 = <b>1 648.88</b> million.</p>`,
      check: `<p>Second route, through Brattvåg's price: 8.40 × 1.012272 = 8.503087 = 0.527606 × P<sub>A</sub><sup>complete</sup> + 0.472394 × 8, so P<sub>A</sub><sup>complete</sup> = (8.503087 − 3.779150)/0.527606 = 8.953527. The merged firm has 600 + 12.5 × 40 = 1 100 million shares: 1 100 × 8.953527 − 8 200 = 9 848.88 − 8 200 = 1 648.88 ✓ Both routes use the same p and prices, so they confirm the arithmetic, not the model. The split: Brattvåg's holders gain 600 × (8.953527 − 8) = 572.12 and Langøy's 40 × (12.5 × 8.953527 − 85) = 40 × 26.9191 = 1 076.76, about 65% of S.</p>`,
      traps: [
        "Took the change in combined market value: 8 960 − 8 200 = 760.00. Today's prices weight the deal by p and discount it.",
        "Forgot to divide by p: 9 069.96 − 8 200 = 869.96. That is p × S, the synergy weighted by the chance that the deal closes.",
        "Grew everything for a full year: p = 1 − 1.05 × 7/15 = 0.5100 and S = (8 960 × 1.05 − 8 200)/0.51 = 2 368.63.",
        null,
      ],
    },
  ],
});
