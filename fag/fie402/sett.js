/* ===================== FIE402 · TIDLIGERE EKSAMENSSETT =====================
   Ordrett gjengitt oppgavetekst med fullstendige løsninger. Kjøres av modulen
   /sett (js/bundle-sett.js) i øvingsmodus eller på tid.

   Sortert nyest først. H2024 og H2025 er Kurbatov-formatet — det leseren faktisk
   møter i 2026. De eldre settene har flervalg, som er avskaffet, men temaene og
   regnetypene er de samme.

   id-ene er lagringsnøkler for selvvurdering — de må aldri endres.
   =========================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sets = [
  {
    "id": "h2025",
    "label": "Autumn 2025",
    "date": "2025-12-08",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": "Set by Andrey Kurbatov, who is also course responsible for autumn 2026. This is the format you will meet. An official solution key exists for this paper and states, exercise by exercise, what the minimal accepted answer is.",
    "exercises": [
      {
        "n": 1,
        "title": "Options",
        "points": 12,
        "topic": "Options",
        "chapters": [
          21,
          23
        ],
        "body": "<p>You are considering investing in a stock S which is currently worth $100. You feel quite confident about the stock's future performance and thus you are considering a call option with strike price K = $110. The option is currently being traded at $6.04. You know that one-year risk-free rate is r<sub>f</sub> = 5%. Applying your knowledge of Black-Scholes equation, you quickly calculate the volatility &sigma; = 20% implied by the market. However, as you are about to buy the option, your friend approaches you and tells you that he's been researching the company for years and its true annualized volatility is 15%, not 20%.</p><p>How would incorporating the real volatility affect the call price? Considering the difference between the current market price and the true fair price, what should you do? (You do not need any calculations to answer this question. Please be very clear and answer both questions, 4-6 sentences should typically be enough.)</p>",
        "solution": "<p><b>Question 1 — what lower volatility does to the call price.</b> In the Black-Scholes setting the value of an option is strictly increasing in volatility, for calls and for puts alike. The reason is that the payoff is one-sided: a call pays max(S<sub>T</sub> &minus; K, 0), so the holder collects the whole of any upside but is never exposed to more than the premium on the downside. Widening the distribution of S<sub>T</sub> therefore adds expected payoff on the right tail while adding nothing on the left, and the expectation rises. Since &sigma; enters nowhere else in the formula, replacing 20% by 15% can only lower the value: <b>the fair call price falls</b>.</p><p><b>Question 2 — what to do about it.</b> The $6.04 you observe is by construction the Black-Scholes value at &sigma; = 20% — that is exactly what &laquo;implied volatility of 20%&raquo; means. If your friend is right and the true volatility is 15%, the option is <b>overpriced</b>: it trades at $6.04 but is worth materially less. The minimum correct response is therefore <b>do not buy it</b>. The stronger response is to take the other side: <b>write (sell) the call</b>, because you would be selling for $6.04 something you believe is worth around $4. If you want the volatility view isolated from the direction of the stock, sell the call and delta-hedge it by buying &Delta; shares, so that you profit from the mispricing rather than from S falling.</p><p><b>The numbers behind it (not required by the question).</b> With S = 100, K = 110, r<sub>f</sub> = 5% (continuously compounded) and T = 1 year:</p><table class=\"data\"><tr><th>&sigma;</th><th>d<sub>1</sub></th><th>d<sub>2</sub></th><th>N(d<sub>1</sub>)</th><th>N(d<sub>2</sub>)</th><th>Call value</th></tr><tr><td>20%</td><td class=\"n\">&minus;0.1266</td><td class=\"n\">&minus;0.3266</td><td class=\"n\">0.4496</td><td class=\"n\">0.3720</td><td class=\"n\">$6.04</td></tr><tr><td>15%</td><td class=\"n\">&minus;0.2271</td><td class=\"n\">&minus;0.3771</td><td class=\"n\">0.4102</td><td class=\"n\">0.3531</td><td class=\"n\">$4.08</td></tr></table><p>The $6.04 quoted in the exercise reproduces the 20% figure exactly, which confirms that the market price is the &sigma; = 20% Black-Scholes value. At &sigma; = 15% the value drops to about $4, a gap of roughly $2 per option, or one third of the price.</p><p><b>Caveats worth one sentence.</b> This is not arbitrage: it is a bet that your friend's volatility estimate beats the market's. A naked short call has unbounded loss if the stock rallies, so size the position accordingly, and remember that implied volatility can stay &laquo;wrong&raquo; for a long time.</p>",
        "criteria": [
          "States clearly that the Black-Scholes value is increasing in volatility, so using 15% instead of 20% LOWERS the call price. This is the whole of the first question and must be explicit.",
          "Explains the mechanism, not just the sign: the payoff max(S−K,0) is convex and one-sided, so more dispersion adds upside without adding downside. Naming vega is fine but the intuition is what earns the points.",
          "Recognises that $6.04 IS the Black-Scholes price at the implied volatility of 20%, so the market price and the 20% figure are the same statement.",
          "Concludes that the option is overpriced relative to the true fair value (the key says the fair value is 'closer to 4 if you calculated it').",
          "Answers the second question explicitly. Minimum accepted answer: do not buy the option.",
          "Full marks for going one step further: sell/write the option — you would be selling something worth about $4 for $6. Delta-hedging the short call is a bonus, not a requirement.",
          "No calculation is required and none is expected; a purely verbal answer scores full marks. Do not spend exam minutes computing N(d).",
          "The key stresses 'answer both questions'. An answer that only discusses the volatility effect and never states an action loses the second half of the points."
        ]
      },
      {
        "n": 2,
        "title": "Governance",
        "points": 12,
        "topic": "Corporate governance",
        "chapters": [
          27
        ],
        "body": "<p>You are a major shareholder in a for-profit education company (let's say, you have between 5% and 10% of shares outstanding/voting power). You notice that the management is clearly exerting low effort and enjoying private benefits (such as designing tasks with &plusmn;X for the exam) instead of maximizing firm value. What are possible actions you could undertake? Select 3 such actions and briefly explain (2-3 sentences per action, each action is worth 4 points).</p>",
        "solution": "<p>The setup is the classic manager&ndash;shareholder agency problem, and the fact that you hold 5&ndash;10% is the key detail: you are large enough that monitoring pays for you (you internalise 5&ndash;10% of any value you create, which beats the free-rider problem a 0.1% holder faces), but too small to simply give orders. Three actions, in the 2&ndash;3 sentence format the exercise asks for.</p><p><b>1. Active monitoring and direct engagement, backed by a board seat.</b> With 5&ndash;10% I have the incentive and the standing to demand regular access to management, to question capital allocation and expense budgets, and to nominate one or more directors at the general meeting. A blockholder on the board sees the internal numbers and can put the CEO's effort and perks on the agenda of the board and the compensation committee. The credible threat behind the engagement is that I vote my block, and can attract other institutions to vote with me.</p><p><b>2. Rewrite the CEO's pay so that shirking becomes expensive.</b> Through the compensation committee, or by voting against the pay proposal at the AGM, I push for a contract that ties a large fraction of the CEO's wealth to long-horizon firm value: restricted stock and options with multi-year vesting, performance conditions measured against a peer group, and clawbacks. This aligns the manager's payoff with mine and makes private benefits and low effort directly costly to him rather than only to shareholders.</p><p><b>3. Escalate to a public activist campaign and, if necessary, a proxy fight to replace the board or the CEO.</b> If quiet engagement fails, I go public with a letter and a plan, solicit proxies from other shareholders, and run my own slate of directors at the annual meeting. A block of 5&ndash;10% plus support from institutional investors is usually enough to win a vote or to force the board to remove the CEO before it comes to a vote; the reputational cost of a public campaign is itself a disciplining device.</p><p><b>Naming the mechanism.</b> Whatever three you pick, say which side of the governance system each belongs to: internal monitoring (the board, the compensation committee, the audit committee), the shareholder's own toolkit (voting, proposals, proxy contests, litigation, exit) or the market for corporate control (a hostile bid or an LBO that removes the manager). Sensor rewards naming the channel as much as describing the action.</p>",
        "criteria": [
          "Exactly three actions, each explained in 2–3 sentences. Each action is worth 4 points and is graded independently, so three thin answers beat one long one.",
          "The key states plainly: 'any reasonable action with explanation should be accepted'. The explanation carries the points, not the choice of action.",
          "Accepted actions from the key: active monitoring (any variant, provided it is explained); an activist campaign; making the board more independent by replacing insider directors; a better compensation contract with proper incentives; voting or pressuring to fire the manager; buying out the company in an LBO and replacing the manager; finding a friendly acquirer to rescue the firm; legal action where there is good evidence of misbehaviour; and — flagged in the key as a bonus for creativity — simply exiting by selling your shares.",
          "Use the 5–10% stake in the argument: it is large enough to overcome the free-rider problem in monitoring, but not large enough for unilateral control. An answer that would read identically for a 0.01% holder is weaker.",
          "Name the governance channel each action belongs to: internal monitoring, shareholder voice, or the market for corporate control.",
          "Three distinct actions are required. 'Vote against the directors' and 'run a proxy fight to replace the directors' risk being read as one action; make them clearly different, or pick a third from another channel."
        ]
      },
      {
        "n": 3,
        "title": "Capital Structure",
        "points": 18,
        "topic": "MM in perfect markets, recapitalisation",
        "chapters": [
          4,
          6,
          15
        ],
        "body": "<p>Company X operates in a perfect capital market with no taxes (MM propositions hold, no taxes). It has $100 million in debt and $200 million in equity. Its debt is risk-free and r<sub>f</sub> is 5%. There are 1000000 (1 million) shares outstanding. The company generates $20 million in free cash flows every year in perpetuity, and pays out all cash flows as interest and dividends at the end of the year.</p>",
        "parts": [
          {
            "label": "a",
            "points": 3,
            "body": "<p>What is the equity cost of capital of the firm? What is the share price right now?</p>",
            "solution": "<p><b>Step 1 — firm value and the WACC.</b> The firm is worth the market value of its two claims: V = D + E = 100 + 200 = <b>$300M</b>. All free cash flow is paid out, so V is the present value of a perpetuity of $20M discounted at the firm's weighted average cost of capital:</p><p>V = FCF / r<sub>wacc</sub> &rArr; r<sub>wacc</sub> = FCF / V = 20 / 300 = 1/15 = <b>0.0667 (6.6667%)</b></p><p>There are no taxes, so this is the pre-tax WACC, which equals the unlevered cost of capital: r<sub>U</sub> = 6.6667%.</p><p><b>Step 2 — back out r<sub>E</sub>.</b> The debt is risk-free, so r<sub>D</sub> = r<sub>f</sub> = 5%. Weights are E/V = 200/300 = 2/3 and D/V = 100/300 = 1/3:</p><p>0.0667 = (2/3)r<sub>E</sub> + (1/3)(0.05)<br>(2/3)r<sub>E</sub> = 0.0667 &minus; 0.0167 = 0.0500<br>r<sub>E</sub> = <b>0.0750 (7.5000%)</b></p><p>Cross-check with MM Proposition II: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>) = 0.0667 + (100/200)(0.0667 &minus; 0.05) = 0.0667 + 0.5(0.0167) = 0.0750. &#10003;</p><p><b>Step 3 — share price.</b> Price is the market value of equity per share: P<sub>0</sub> = E / N = $200M / 1M = <b>$200 per share</b>.</p>",
            "criteria": [
              "Recognises V = D + E = 300 and that the perpetuity formula run backwards gives r_wacc = 20/300 = 6.6667%.",
              "States that with no taxes the pre-tax WACC equals r_U, and uses r_D = r_f = 5% because the debt is risk-free.",
              "Solves the weighted average for r_E = 7.5%. Getting there via MM II instead of via the WACC identity is equally acceptable.",
              "Share price = equity value / shares = 200/1 = $200. Dividing firm value rather than equity value by the share count is the classic error here.",
              "Show the calculation. No calculation, no points."
            ]
          },
          {
            "label": "b",
            "points": 3,
            "body": "<p>What is the dividend (per share) at the end of Year 1? What is the share price (after the dividend has been paid)?</p>",
            "solution": "<p><b>Step 1 — split the $20M between the two claims.</b> Interest first: 5% &times; $100M = <b>$5M</b>. Everything left over is paid out as dividend: 20 &minus; 5 = <b>$15M</b>. With 1M shares, the dividend per share is</p><p>Div<sub>1</sub> = $15M / 1M = <b>$15.00 per share</b></p><p><b>Step 2 — the ex-dividend price.</b> Nothing about the firm changes from year to year, so after the year-1 dividend has been paid the share is again a claim on $15 per year forever, discounted at r<sub>E</sub> = 7.5%:</p><p>P<sub>1</sub> = 15 / 0.075 = <b>$200.00</b></p><p><b>Step 3 — check it against the one-period return identity.</b> A shareholder who buys at P<sub>0</sub> and holds one year must earn exactly r<sub>E</sub>:</p><p>P<sub>0</sub> = (Div<sub>1</sub> + P<sub>1</sub>) / (1 + r<sub>E</sub>) &rArr; 200 = (15 + P<sub>1</sub>) / 1.075 &rArr; P<sub>1</sub> = 215 &minus; 15 = <b>$200</b> &#10003;</p><p>So the cum-dividend price just before the payment is $215, the share goes ex-dividend and drops by exactly the $15 dividend to $200, and the price is flat over time because the firm is a constant perpetuity that retains nothing.</p>",
            "criteria": [
              "Interest is computed on the face/market value of debt: 5% × 100 = $5M, and the residual $15M is the dividend. Paying out all $20M as dividend is a point-losing slip.",
              "Dividend per share = $15 (1 million shares).",
              "Ex-dividend price P1 = 15/0.075 = $200, either by valuing the perpetual dividend stream or from P0 = (Div1 + P1)/(1 + r_E). Both routes are accepted by the key.",
              "Full marks include noticing that the price is unchanged at $200: the firm neither grows nor shrinks. Stating the cum-dividend price of $215 and the $15 ex-dividend drop is a bonus, not a requirement."
            ]
          },
          {
            "label": "c",
            "points": 4,
            "body": "<p>Instead of the projected scenario, the board of directors decides to repurchase shares right now and issue debt so that D/V = 0.5.</p><p>How much debt will be issued? What happens to share price upon announcement? How many shares will be repurchased?</p>",
            "solution": "<p><b>Step 1 — is there any value effect?</b> No. There are no taxes and no other frictions, so MM Proposition I applies: the recapitalisation is a purely financial transaction that repackages the same $20M of free cash flow into different claims. <b>Firm value stays at $300M and the share price stays at $200 on announcement.</b> There is no tax shield to capitalise, so there is nothing for the market to price in.</p><p><b>Step 2 — how much debt.</b> The target is D/V = 0.5 with V = $300M:</p><p>D<sub>target</sub> = 0.5 &times; 300 = <b>$150M</b>, and the firm already has $100M, so it issues <b>$50M of new debt</b>.</p><p><b>Step 3 — how many shares.</b> The $50M raised is used to buy back shares at the unchanged market price of $200:</p><p>Shares repurchased = $50M / $200 = <b>0.25M shares (250,000)</b>, leaving 1.00 &minus; 0.25 = <b>0.75M shares</b> outstanding.</p><p><b>Consistency check.</b> After the recap, E = V &minus; D = 300 &minus; 150 = $150M, spread over 0.75M shares: 150/0.75 = <b>$200 per share</b>. &#10003; The price is unchanged, exactly as MM I requires, and the shareholders who sold received fair value.</p>",
            "criteria": [
              "Names the mechanism: with no taxes the restructuring is purely financial, MM I holds, so firm value and share price are unchanged. The key opens with exactly this sentence.",
              "Target debt = 0.5 × 300 = $150M, so NEW debt issued = $50M. Answering '$150M will be issued' ignores the $100M already outstanding.",
              "Share price on announcement: unchanged at $200, with a reason (no tax shield, no value created or destroyed).",
              "Shares repurchased = 50/200 = 0.25 million, at the unchanged $200 price. Repurchasing at some 'post-announcement' price you invented loses the point.",
              "Closing check E = 300 − 150 = 150 over 0.75M shares = $200 is not required but confirms the answer."
            ]
          },
          {
            "label": "d",
            "points": 4,
            "body": "<p>What is the dividend (per share) at the end of Year 1? What is new equity cost of capital?</p>",
            "solution": "<p><b>Step 1 — the new dividend.</b> Interest is now 5% &times; $150M = <b>$7.5M</b>, so the residual paid to equity is 20 &minus; 7.5 = <b>$12.5M</b>. This is now spread over only 0.75M shares:</p><p>Div<sub>1</sub> = $12.5M / 0.75M = <b>$16.6667 per share</b> (up from $15.00)</p><p><b>Step 2 — the new cost of equity.</b> The firm's asset risk has not changed, so r<sub>wacc</sub> = r<sub>U</sub> is still 6.6667%. With the new weights E/V = D/V = 0.5:</p><p>0.0667 = 0.5 r<sub>E</sub> + 0.5(0.05)<br>0.5 r<sub>E</sub> = 0.0667 &minus; 0.0250 = 0.0417<br>r<sub>E</sub> = <b>0.0833 (8.3333%)</b></p><p>Cross-check with MM II, now with D/E = 150/150 = 1:</p><p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>) = 0.0667 + 1 &times; (0.0667 &minus; 0.0500) = <b>0.0833</b> &#10003;</p><p><b>Consistency check.</b> The share must still be worth $200: PV of the new dividend stream = 16.6667 / 0.083333 = <b>$200.00</b>. &#10003; The dividend per share went up by 11.1%, and the discount rate went up by exactly enough to leave the price unchanged. That is MM II doing its job.</p>",
            "criteria": [
              "Interest recomputed on the new debt level: 5% × 150 = $7.5M, leaving $12.5M for equity.",
              "Divides by the REDUCED share count of 0.75M, not by 1M. Dividend per share = $16.67. Forgetting that shares were retired is the single most common error in this part.",
              "New r_E = 8.3333%, obtained either from the unchanged WACC of 6.6667% with 50/50 weights or from MM II with D/E = 1. Both appear in the key.",
              "States why r_wacc is unchanged: no taxes, so leverage does not move the firm's cost of capital, only its split between debt and equity.",
              "Optional but valued: verify that 16.6667/0.083333 = $200, i.e. the share price is still $200."
            ]
          },
          {
            "label": "e",
            "points": 4,
            "body": "<p>Compare the payoffs of the original scenario shareholder, the new scenario shareholder who sold their share, the new scenario shareholder who kept their share. Comment.</p>",
            "solution": "<p>All three positions are worth exactly <b>$200 today</b>.</p><table class=\"data\"><tr><th>Position</th><th>What they hold</th><th>Value today</th></tr><tr><td>Original scenario (no recap)</td><td>One share paying $15.00 per year forever, discounted at r<sub>E</sub> = 7.5%</td><td class=\"n\">15 / 0.075 = $200</td></tr><tr><td>New scenario, sold the share</td><td>$200 in cash, received immediately in the buyback</td><td class=\"n\">$200</td></tr><tr><td>New scenario, kept the share</td><td>One share paying $16.6667 per year forever, discounted at r<sub>E</sub> = 8.3333%</td><td class=\"n\">16.6667 / 0.083333 = $200</td></tr></table><p><b>Comment.</b> This is Modigliani&ndash;Miller Proposition I made concrete. In a perfect market with no taxes the recapitalisation does not create or destroy a single dollar of value; it only changes how the same $20M annual cash flow is sliced between debt holders and equity holders, and how many slices there are. The shareholder who kept his share now receives a 11.1% larger dividend, but he also bears the firm's business risk over a smaller equity base, so his required return rises from 7.5% to 8.3333% by exactly the amount that leaves the price at $200. The shareholder who sold was paid the fair market price, so he is neither exploited nor subsidised: there is no arbitrage between selling and holding, and no reason to prefer one over the other. If an investor wanted the pre-recap risk profile back, he could undo the firm's leverage himself by holding the company's bonds alongside the share — homemade leverage, which is the arbitrage argument behind MM I.</p><p><b>Consistency check.</b> Total value to the original shareholders: 0.25M &times; $200 in cash + 0.75M &times; $200 in shares = $50M + $150M = <b>$200M</b>, exactly the equity value before the recapitalisation. &#10003;</p>",
            "criteria": [
              "All three payoffs are stated and all three come to $200. The comparison, not just one of the three, is what is graded.",
              "The original shareholder's $200 is expressed as the PV of the $15 perpetual dividend at 7.5%; the retained share as the PV of the $16.67 perpetual dividend at 8.3333%. Showing that a bigger dividend and a higher discount rate cancel is the heart of the answer.",
              "The seller receives $200 in immediate cash — the fair price, not a discount or a premium.",
              "The key says: 'Comment: anything reasonable about MM.' Credit for naming MM Proposition I, for saying that value is only re-sliced and not created, or for the homemade-leverage argument.",
              "A closing check that 0.25M × 200 + 0.75M × 200 = $200M, the original equity value, is a clean way to end and costs one line."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Valuation with leverage",
        "points": 18,
        "topic": "WACC and APV",
        "chapters": [
          3,
          4,
          17,
          18,
          19
        ],
        "body": "<p>Your task is to evaluate company A. The company maintains Debt-to-Equity ratio of 25%. The company will exist for 2 years: right now we are in Year 0, and the company generates cash flows of $40M and $50M at the end of Year 1 and Year 2, respectively. The yearly risk-free rate is 6% and will stay the same. Cost of debt is 10%. The tax rate is 40%. The market portfolio has an expected return of 11%. The equity beta of the company is 2.4.</p><p>Each question is worth 2 points. Recommended precision is 4 decimal places (as in, 1.2345 instead of 1.23).</p>",
        "parts": [
          {
            "label": "a",
            "points": 2,
            "body": "<p>Find the debt beta of the company.</p>",
            "solution": "<p>The debt is risky (r<sub>D</sub> = 10% &gt; r<sub>f</sub> = 6%), so it has a positive beta. Invert the CAPM for the debt claim. The market risk premium is E[R<sub>Mkt</sub>] &minus; r<sub>f</sub> = 0.11 &minus; 0.06 = 0.05.</p><p>r<sub>D</sub> = r<sub>f</sub> + &beta;<sub>D</sub>(E[R<sub>Mkt</sub>] &minus; r<sub>f</sub>)<br>0.10 = 0.06 + &beta;<sub>D</sub>(0.05)<br>&beta;<sub>D</sub> = (0.10 &minus; 0.06) / 0.05 = <b>0.8000</b></p>",
            "criteria": [
              "Uses CAPM in reverse on the debt: beta_D = (r_D − r_f)/(E[R_Mkt] − r_f).",
              "Market risk premium correctly identified as 0.11 − 0.06 = 0.05, not 0.11.",
              "beta_D = 0.8000. Assuming a zero debt beta because 'debt is safe' contradicts r_D = 10% and loses the point."
            ]
          },
          {
            "label": "b",
            "points": 2,
            "body": "<p>Find the cost of equity of the company.</p>",
            "solution": "<p>Straight CAPM, this time on the equity claim:</p><p>r<sub>E</sub> = r<sub>f</sub> + &beta;<sub>E</sub>(E[R<sub>Mkt</sub>] &minus; r<sub>f</sub>) = 0.06 + 2.4 &times; 0.05 = 0.06 + 0.12 = <b>0.1800 (18.0000%)</b></p>",
            "criteria": [
              "Plugs beta_E = 2.4 into CAPM with the 5% risk premium.",
              "r_E = 18.00%. Using 11% as the premium (giving 32.4%) is the trap."
            ]
          },
          {
            "label": "c",
            "points": 2,
            "body": "<p>Find unlevered cost of equity of the company.</p>",
            "solution": "<p><b>Step 1 — turn D/E into weights.</b> D/E = 0.25, so D/V = 0.25/1.25 = <b>0.2000</b> and E/V = <b>0.8000</b>.</p><p><b>Step 2 — unlever, either through betas or directly.</b></p><p><i>Through betas:</i> &beta;<sub>U</sub> = (E/V)&beta;<sub>E</sub> + (D/V)&beta;<sub>D</sub> = 0.8(2.4) + 0.2(0.8) = 1.92 + 0.16 = <b>2.0800</b><br>r<sub>U</sub> = 0.06 + 2.08 &times; 0.05 = <b>0.1640 (16.4000%)</b></p><p><i>Directly (pre-tax WACC = r<sub>U</sub>):</i> r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = 0.8(0.18) + 0.2(0.10) = 0.144 + 0.020 = <b>0.1640</b> &#10003;</p><p>Note that r<sub>U</sub> does <b>not</b> take taxes into account — it is the return on the firm's assets as if the firm were all-equity financed. The tax rate belongs in the after-tax WACC in part (d), not here.</p>",
            "criteria": [
              "Converts D/E = 0.25 into D/V = 0.2 and E/V = 0.8. Using 0.25 and 0.75 as weights is a frequent and expensive error.",
              "r_U = 16.40%, obtained either by weighting the betas (beta_U = 2.08) or by weighting the returns. The key notes beta_U = 2.08 is 'not required' if you solve directly.",
              "The key states explicitly that r_U does not take taxes into account. Multiplying r_D by (1 − τ) here is wrong.",
              "Course convention: beta_U is weighted WITHOUT taxes, beta_U = [E/(E+D)]beta_E + [D/(E+D)]beta_D. Never the (1 − τ) version."
            ]
          },
          {
            "label": "d",
            "points": 2,
            "body": "<p>Find after-tax WACC of the company.</p>",
            "solution": "<p>Now the tax shield enters, through the after-tax cost of debt:</p><p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>) = 0.8(0.18) + 0.2(0.10)(1 &minus; 0.40)<br>= 0.1440 + 0.2(0.06) = 0.1440 + 0.0120 = <b>0.1560 (15.6000%)</b></p><p>Cross-check with the shortcut r<sub>wacc</sub> = r<sub>U</sub> &minus; d&middot;&tau;<sub>c</sub>&middot;r<sub>D</sub>, where d = D/V: 0.1640 &minus; 0.2(0.40)(0.10) = 0.1640 &minus; 0.0080 = <b>0.1560</b> &#10003;</p>",
            "criteria": [
              "Uses the after-tax WACC formula with (1 − τ_c) applied to r_D only, never to r_E.",
              "r_wacc = 15.60%.",
              "Weights are still E/V = 0.8 and D/V = 0.2.",
              "The shortcut r_wacc = r_U − d·τ_c·r_D is a fast consistency check and is worth knowing, but the formula-sheet version is what is expected."
            ]
          },
          {
            "label": "e",
            "points": 2,
            "body": "<p>Find the levered firm value of the company using WACC approach.</p>",
            "solution": "<p>The WACC method discounts the unlevered free cash flows at the after-tax WACC; the tax shield is already inside the discount rate, so it must not be added separately.</p><p>V<sup>L</sup><sub>0</sub> = 40 / 1.156 + 50 / 1.156<sup>2</sup> = 34.6021 + 37.4157 = <b>$72.0178M</b></p><p>Intermediate values, to 4 decimals: 40/1.156 = 34.6021 and 1.156<sup>2</sup> = 1.3363, so 50/1.3363 = 37.4157.</p>",
            "criteria": [
              "Discounts BOTH cash flows at 15.6%, with the year-2 flow squared: 40/1.156 + 50/1.156².",
              "V^L = 72.0178. Four decimal places, as the paper requests.",
              "Does not add a tax shield on top — the WACC method already contains it. Doing both is double counting."
            ]
          },
          {
            "label": "f",
            "points": 2,
            "body": "<p>Find the debt adjustment at the end of Year 1.</p>",
            "solution": "<p>The firm maintains a constant D/E of 25%, i.e. a constant D/V of 20%, so debt must be scaled to the levered value at every date: D<sub>t</sub> = d &middot; V<sup>L</sup><sub>t</sub> with d = 0.2.</p><p><b>Year 0:</b> D<sub>0</sub> = 0.2 &times; 72.0178 = <b>$14.4036M</b></p><p><b>Year 1:</b> the value at the end of year 1, after the $40M cash flow has been paid out, is only the remaining year-2 flow:</p><p>V<sup>L</sup><sub>1</sub> = 50 / 1.156 = <b>$43.2526M</b> &rArr; D<sub>1</sub> = 0.2 &times; 43.2526 = <b>$8.6505M</b></p><p><b>Debt adjustment:</b> 14.4036 &minus; 8.6505 = <b>$5.7531M repaid</b> at the end of Year 1.</p><p>The sign matters and should be stated in words: as the project runs down towards its end, the levered value falls, so the firm must <b>pay back</b> debt to keep the ratio constant. This is the step almost everyone gets wrong, either by holding debt fixed at D<sub>0</sub> or by forgetting to strip out the year-1 cash flow before computing V<sup>L</sup><sub>1</sub>.</p>",
            "criteria": [
              "Applies D_t = d · V^L_t with d = D/V = 0.2, at both dates.",
              "V^L_1 = 50/1.156 = 43.2526 — the value AFTER the year-1 cash flow has been paid, i.e. only the remaining year-2 flow. Including the $40M here is the classic mistake.",
              "D_0 = 14.4036 and D_1 = 8.6505, giving an adjustment of 5.7531.",
              "Says in words what the adjustment is: debt is REPAID as the project nears its end, to maintain the constant ratio. The key ends part (f) with exactly this sentence."
            ]
          },
          {
            "label": "g",
            "points": 2,
            "body": "<p>Find the unlevered value component of the company using APV approach.</p>",
            "solution": "<p>The APV method values the firm in two pieces. The first piece is the value of the same free cash flows as if the firm carried no debt at all, discounted at the unlevered cost of capital r<sub>U</sub> = 16.4%:</p><p>V<sup>U</sup><sub>0</sub> = 40 / 1.164 + 50 / 1.164<sup>2</sup> = 34.3643 + 36.9032 = <b>$71.2675M</b></p><p>Intermediate values: 1.164<sup>2</sup> = 1.3549, so 50/1.3549 = 36.9032.</p><p>Note that V<sup>U</sup> = 71.2675 &lt; V<sup>L</sup> = 72.0178. The difference is precisely the value of the tax shield, computed in part (h).</p>",
            "criteria": [
              "Discounts the same unlevered free cash flows at r_U = 16.4%, not at the WACC and not at r_D.",
              "V^U = 71.2675.",
              "No tax adjustment to the cash flows themselves: the $40M and $50M are already the unlevered FCFs."
            ]
          },
          {
            "label": "h",
            "points": 2,
            "body": "<p>Find the tax shield every year and calculate PV(TS).</p>",
            "solution": "<p><b>Step 1 — the shields.</b> The tax shield in year t is &tau;<sub>c</sub> &times; r<sub>D</sub> &times; D<sub>t&minus;1</sub>, using the debt outstanding at the <i>start</i> of the year, taken from part (f):</p><p>TS<sub>1</sub> = 0.40 &times; 0.10 &times; 14.4036 = <b>$0.5761M</b><br>TS<sub>2</sub> = 0.40 &times; 0.10 &times; 8.6505 = <b>$0.3460M</b></p><p><b>Step 2 — the discount rate.</b> The firm rebalances to a constant D/E, so the debt level, and therefore the tax shield, is proportional to the firm's value and carries the same risk as the firm's assets. The correct discount rate is <b>r<sub>U</sub> = 16.4%</b>, not r<sub>D</sub> and not r<sub>f</sub>. (r<sub>D</sub> or r<sub>f</sub> would be right only if the debt schedule were fixed in advance.)</p><p>PV(TS) = 0.5761/1.164 + 0.3460/1.164<sup>2</sup> = 0.4950 + 0.2554 = <b>$0.7503M</b></p>",
            "criteria": [
              "TS_t = τ_c × r_D × D_{t−1}, using D_0 = 14.4036 for year 1 and D_1 = 8.6505 for year 2.",
              "TS_1 = 0.5761 and TS_2 = 0.3460.",
              "Discounts the tax shield at r_U, and SAYS WHY: constant D/E means the debt level moves with firm value, so the shield is as risky as the assets. Using r_D or r_f here is the single most-tested judgement call in the course.",
              "PV(TS) = 0.7503.",
              "Rounding discipline: the key warns that a drift of about 0.001 is acceptable but 0.05 is not. Carry 4 decimals through the chain."
            ]
          },
          {
            "label": "i",
            "points": 2,
            "body": "<p>Find the levered firm value using APV approach.</p>",
            "solution": "<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = 71.2675 + 0.7503 = <b>$72.0178M</b></p><p><b>Consistency check — the one sensor performs.</b> The WACC method in part (e) gave $72.0178M and the APV method gives $72.0178M. The two agree, as they must: they are two ways of accounting for the same tax shield, one inside the discount rate and one as a separate cash flow. Carried through in exact arithmetic the two are identical to the last decimal.</p><p>Write this check down in the exam. It costs one line and it tells the examiner you know the two methods are not independent estimates but the same valuation seen from two sides.</p>",
            "criteria": [
              "V^L = V^U + PV(TS) = 72.0178.",
              "States explicitly that this equals the WACC answer from part (e). The key ends the exercise with this note, and the consistency check is one of the habits sensor rewards throughout the course.",
              "Acknowledges the rounding tolerance: the key says a deviation of about 0.001 is reasonable, about 0.05 is too much. If your two numbers differ by more than that, you have a real error, not a rounding artefact."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Real Options",
        "points": 20,
        "topic": "Real options",
        "chapters": [
          1,
          25
        ],
        "body": "<p>You are considering an opportunity to open a store. It costs 160000 NOK to open. The risk-free rate is 7%. Operating the shop will cost 90000 NOK per year and generate either 80000 NOK per year or 120000 NOK per year with equal probability. You don't know the state of the world at the moment but if you open the store you will learn it during Year 1.</p>",
        "parts": [
          {
            "label": "a",
            "points": 2,
            "body": "<p>What is the NPV of opening the store right now? Will you open it?</p>",
            "solution": "<p><b>Step 1 — net the operating cost off the revenue, state by state.</b></p><table class=\"data\"><tr><th>State</th><th>Probability</th><th>Revenue</th><th>Cost</th><th>Net cash flow per year</th></tr><tr><td>Good</td><td class=\"n\">0.5</td><td class=\"n\">120,000</td><td class=\"n\">90,000</td><td class=\"n\">+30,000</td></tr><tr><td>Bad</td><td class=\"n\">0.5</td><td class=\"n\">80,000</td><td class=\"n\">90,000</td><td class=\"n\">&minus;10,000</td></tr></table><p>Expected net cash flow = 0.5(30,000) + 0.5(&minus;10,000) = <b>10,000 NOK per year</b>, in perpetuity.</p><p><b>Step 2 — value the perpetuity and subtract the outlay.</b> Opening now commits you to operate forever whatever the state, so you discount the <i>expected</i> flow:</p><p>PV = 10,000 / 0.07 = <b>142,857 NOK</b><br>NPV = 142,857 &minus; 160,000 = <b>&minus;17,143 NOK</b></p><p><b>Decision: do not open the store.</b> The NPV is negative.</p>",
            "criteria": [
              "Nets the 90,000 operating cost against the revenue before valuing anything: +30,000 in the good state, −10,000 in the bad state.",
              "Expected annual cash flow = 10,000, valued as a perpetuity at 7%: PV = 142,857.",
              "NPV = 142,857 − 160,000 = −17,143.",
              "Answers the question asked: no, you do not open the store."
            ]
          },
          {
            "label": "b",
            "points": 4,
            "body": "<p>How much would you be willing to pay for a market study? The study has already been conducted, so if you pay C<sub>0</sub> now, you immediately know the state of the market.</p>",
            "solution": "<p>This is the <b>value of perfect information</b>: what the opportunity is worth when you can condition your investment decision on the state, minus what it is worth without that ability.</p><p><b>Step 1 — value the project state by state, conditional on knowing.</b></p><p><i>Good state:</i> PV = 30,000/0.07 = 428,571 &rArr; NPV = 428,571 &minus; 160,000 = <b>+268,571</b>. You invest.<br><i>Bad state:</i> PV = &minus;10,000/0.07 = &minus;142,857 &rArr; NPV = &minus;302,857. Strongly negative, so <b>you do not invest</b> and the payoff is <b>0</b>.</p><p><b>Step 2 — take the expectation over the informed decisions.</b></p><p>E[max(0, NPV<sub>i</sub>)] = 0.5(268,571) + 0.5(0) = <b>134,286 NOK</b></p><p><b>Step 3 — subtract the value without the study.</b> From part (a) the uninformed NPV is &minus;17,143, so uninformed you simply do nothing, worth <b>0</b>.</p><p>Value of the study = 134,286 &minus; max(0, &minus;17,143) = 134,286 &minus; 0 = <b>134,286 NOK</b></p><p><b>You are willing to pay up to C<sub>0</sub> = 134,286 NOK.</b> Note where the value comes from: not from the information as such, but from the ability to walk away in the bad state. The study converts a project you would refuse into a coin flip whose downside is truncated at zero.</p>",
            "criteria": [
              "Values each state separately: good-state NPV = +268,571, bad-state NPV = −302,857 so you decline in the bad state.",
              "Takes the expectation over max(0, NPV_i): 0.5(268,571) + 0.5(0) = 134,286.",
              "Compares against the base case, which is max(0, −17,143) = 0. Since the uninformed value is zero, the willingness to pay equals the full 134,286.",
              "States the answer as a maximum willingness to pay: you would pay up to 134,286, not exactly that.",
              "Explaining that the value comes from being able to avoid the bad state (the downside is truncated at zero) earns the mechanism credit sensor looks for."
            ]
          },
          {
            "label": "c",
            "points": 4,
            "body": "<p>How would your answer change if the study took 1 year to complete? In other words, you pay C<sub>1</sub> now, wait a year, learn the state and then decide whether to invest or not. Compare your result to the previous one and comment.</p>",
            "solution": "<p><b>Step 1 — should you invest immediately instead of waiting?</b> No: the immediate NPV is &minus;17,143 &lt; 0, so there is nothing to give up by waiting.</p><p><b>Step 2 — the shortcut.</b> Waiting a year gives you exactly the same project on exactly the same terms, only starting one year later. The good-state NPV measured at date 1 is therefore the same 268,571 as before, and you simply discount it back one year at 7%:</p><p>NPV<sup>good</sup><sub>0</sub> = 268,571 / 1.07 = <b>251,001 NOK</b></p><p><b>Step 3 — expectation over the informed decision.</b> You still invest only in the good state:</p><p>C<sub>1</sub> = 0.5(251,001) + 0.5(0) = <b>125,501 NOK</b></p><p><b>Comparison.</b> 125,501 &lt; 134,286: the delayed study is worth <b>8,785 NOK less</b>. The reason is that the one-year wait has two opposing effects, and the first one dominates:</p><table class=\"data\"><tr><th>Effect of waiting one year</th><th>Value</th></tr><tr><td>You lose the Year-1 cash flow of 30,000 in the good state (PV)</td><td class=\"n\">&minus;28,037</td></tr><tr><td>You pay the 160,000 outlay a year later, so it costs less today</td><td class=\"n\">+10,467</td></tr><tr><td>Net, in the good state</td><td class=\"n\">&minus;17,570</td></tr><tr><td>&times; probability 0.5 of the good state</td><td class=\"n\">&minus;8,785</td></tr></table><p>28,037 = 30,000/1.07 and 10,467 = 160,000 &minus; 160,000/1.07. The two together reconcile 134,286 &minus; 8,785 = 125,501 exactly. &#10003;</p><p>(The key notes that this full decomposition is not needed for full marks: mentioning that you lose the Year-1 cash flow is enough.)</p>",
            "criteria": [
              "Notes first that you would not invest immediately, so waiting costs you nothing in the base case.",
              "Recognises the project is identical one year later and simply discounts: 268,571/1.07 = 251,001. Re-deriving it from scratch is equally accepted.",
              "Multiplies by the 0.5 probability of the good state: C_1 = 125,501.",
              "Compares to part (b) and states the answer is lower.",
              "Explains why. The key's minimal accepted explanation is 'you lose the Year-1 cash flow'. The full decomposition (lost 30,000/1.07 against a cheaper investment of 160,000 − 160,000/1.07) is explicitly NOT required for full marks."
            ]
          },
          {
            "label": "d",
            "points": 4,
            "body": "<p>For the rest of the exercise, the study is not available.</p><p>The government is trying to stimulate business and it offers a program where after 2 years you can close the shop and exit the market (you are no longer forced to operate forever). You don't recover anything from the shop itself, so if you decide to exit you just get 0 NOK forever starting from Year 3. What is the NPV of opening the store now? Will you open it?</p>",
            "solution": "<p>You still have to open the store before you know the state, so you take both Year-1 and Year-2 cash flows in both states. The option only bites at the end of Year 2, when you know the state and can walk away.</p><p><b>Good state.</b> The cash flow is +30,000 per year forever; you would never exit. The NPV is unchanged:</p><p>NPV<sup>good</sup> = 30,000/0.07 &minus; 160,000 = <b>+268,571</b></p><p><b>Bad state.</b> You lose 10,000 in each of Years 1 and 2, then exit and get nothing thereafter:</p><p>NPV<sup>bad</sup> = &minus;160,000 &minus; 10,000/1.07 &minus; 10,000/1.07<sup>2</sup><br>= &minus;160,000 &minus; 9,346 &minus; 8,734 = <b>&minus;178,080</b></p><p><b>Expected NPV.</b></p><p>NPV = 0.5(268,571) + 0.5(&minus;178,080) = 134,286 &minus; 89,040 = <b>+45,246 NOK</b></p><p><b>Decision: yes, open the store now.</b> The downside is no longer punishing enough to sink the project.</p><p><b>What the exit option is worth.</b> 45,246 &minus; (&minus;17,143) = <b>62,388 NOK</b>. Verify it directly: the option removes a perpetuity of &minus;10,000 starting in Year 3 in the bad state, whose value today is (&minus;10,000/0.07)/1.07<sup>2</sup> = &minus;124,777, and you get that benefit with probability 0.5: 0.5 &times; 124,777 = <b>62,388</b>. &#10003;</p>",
            "criteria": [
              "Understands the timing: you commit before learning the state, so Years 1 and 2 are taken in both states; the option is exercised only at the end of Year 2.",
              "Good-state NPV is unaffected at +268,571, with a reason (you would never abandon a +30,000 perpetuity).",
              "Bad-state NPV = −160,000 − 10,000/1.07 − 10,000/1.07² = −178,080. Truncating the perpetuity into a two-year annuity is the whole exercise.",
              "Expected NPV = 0.5(268,571 − 178,080) = +45,246.",
              "Answers the decision question: yes, invest now, because the downside is now bounded.",
              "Optional: quantifying the exit option at 45,246 − (−17,143) = 62,388 shows you know an abandonment option is worth exactly the bad-state losses it avoids."
            ]
          },
          {
            "label": "e",
            "points": 6,
            "body": "<p>Your assistant comes to you and informs you that the payoffs in the 2 states aren't 80000 NOK and 120000 NOK. They are still 100000 NOK in expectation, so we can denote them as 100000-X NOK and 100000+X NOK. Find X for which you are indifferent whether to enter the market (the option to exit after 2 years is still there).</p>",
            "solution": "<p><b>Step 1 — write the two state NPVs as functions of X.</b> Revenue is 100,000 &plusmn; X and the operating cost is 90,000, so the net cash flows are 10,000 + X in the good state and 10,000 &minus; X in the bad state. Assume X &gt; 10,000 so the bad-state flow is negative and the exit option is exercised (this is verified at the end):</p><p>NPV<sup>good</sup>(X) = &minus;160,000 + (10,000 + X)/0.07<br>NPV<sup>bad</sup>(X) = &minus;160,000 + (10,000 &minus; X)(1/1.07 + 1/1.07<sup>2</sup>)</p><p>The two-year annuity factor at 7% is 1/1.07 + 1/1.07<sup>2</sup> = 0.9346 + 0.8734 = <b>1.8080</b>, and 1/0.07 = <b>14.2857</b>.</p><p><b>Step 2 — set the expected NPV to zero.</b></p><p>0 = &minus;160,000 + 0.5[14.2857(10,000 + X) + 1.8080(10,000 &minus; X)]</p><p>Multiply through by 2:</p><p>320,000 = 14.2857(10,000 + X) + 1.8080(10,000 &minus; X)<br>320,000 = 142,857 + 14.2857X + 18,080 &minus; 1.8080X<br>320,000 &minus; 160,937 = (14.2857 &minus; 1.8080)X<br>159,063 = 12.4777X</p><p><b>X = 159,063 / 12.4777 = 12,747.76 NOK</b></p><p><b>Step 3 — verify.</b> With X = 12,747.76 the state cash flows are +22,747.76 and &minus;2,747.76:</p><table class=\"data\"><tr><th>State</th><th>Calculation</th><th>NPV</th></tr><tr><td>Good</td><td>&minus;160,000 + 22,747.76/0.07 = &minus;160,000 + 324,968</td><td class=\"n\">+164,968</td></tr><tr><td>Bad</td><td>&minus;160,000 &minus; 2,747.76 &times; 1.8080 = &minus;160,000 &minus; 4,968</td><td class=\"n\">&minus;164,968</td></tr><tr><td>Expected</td><td>0.5(164,968) + 0.5(&minus;164,968)</td><td class=\"n\">0</td></tr></table><p>Exactly zero. &#10003; And 12,747.76 &gt; 10,000, so the bad-state cash flow really is negative and exiting after two years really is optimal &mdash; the assumption used to build the equation holds.</p><p><b>Sanity check (not required).</b> In the original setting X = 20,000, which is above the indifference level, and indeed part (d) gave a positive NPV of +45,246. The wider the spread, the better this project, because the upside is a perpetuity while the downside is capped at two years by the exit option. Asymmetry, not expected cash flow, is what makes the store worth opening: the expected annual flow is 10,000 regardless of X.</p>",
            "criteria": [
              "Writes the net cash flows as 10,000 + X and 10,000 − X (revenue less the 90,000 operating cost), not as 100,000 ± X.",
              "Keeps the asymmetry: the good state is a perpetuity (÷0.07) while the bad state is a two-year annuity (the exit option), and the 160,000 outlay is paid in both states.",
              "Sets the expected NPV to zero and solves: 0 = −160,000 + 0.5[(10,000+X)/0.07 + (10,000−X)(1/1.07 + 1/1.07²)].",
              "X = 12,748 (12,747.76). The key notes there are many valid routes, including redoing every step numerically.",
              "Full marks require a shown calculation. The annuity factor 1.8080 and the perpetuity factor 14.2857 should both appear.",
              "Bonus, flagged as not required in the key: the sanity check that the original X = 20,000 lies above the indifference point, which is consistent with the positive NPV found in part (d).",
              "Checking that X > 10,000, so the bad-state flow is genuinely negative and the exit option is genuinely exercised, closes a real logical gap and is cheap to write."
            ]
          }
        ]
      },
      {
        "n": 6,
        "title": "M&A",
        "points": 20,
        "topic": "Mergers and acquisitions",
        "chapters": [
          22,
          26
        ],
        "body": "<p>Company A recently announced its intentions to acquire company B. The news came suddenly and there was no anticipation effect. The deal is expected to be completed or to fail in precisely 1 year from now. If the deal goes through, 5 shares of company B will be exchanged for 1 share of company A. If the deal fails, prices will return to their original levels.</p><p>Share prices before the announcement were: P<sub>A,0</sub> = 110, P<sub>B,0</sub> = 16. Immediately after the announcement the market incorporated the new information: P<sub>A,1</sub> = 105, P<sub>B,1</sub> = 20. One-year risk-free rate is r<sub>f</sub> = 3%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>Based on the market prices, please calculate the probability of the deal being successfully completed as perceived by the market. (Hint: use the long-short strategy and invest proceedings from short strategy to invest at risk-free rate)</p>",
            "solution": "<p>The logic is the Mannesmann-style merger-arbitrage trade: build a portfolio whose two possible payoffs you know exactly, price it against its cost, and solve for the probability the market must be using.</p><p><b>Step 1 — build the position, at post-announcement prices.</b></p><table class=\"data\"><tr><th>Leg</th><th>Action</th><th>Cash flow today</th></tr><tr><td>Long target</td><td>Buy 5 shares of B at 20</td><td class=\"n\">&minus;100</td></tr><tr><td>Short acquirer</td><td>Short-sell 1 share of A at 105</td><td class=\"n\">+105</td></tr><tr><td>Risk-free</td><td>Invest the 105 short proceeds at 3%</td><td class=\"n\">&minus;105</td></tr><tr><td><b>Net outlay today</b></td><td></td><td class=\"n\"><b>&minus;100</b></td></tr></table><p>The strategy costs you <b>100</b> out of pocket.</p><p><b>Step 2 — payoff if the deal goes through.</b> Your 5 B shares are converted into exactly 1 A share, which you deliver to close the short. The two equity legs cancel perfectly and you are left with the bond:</p><p>Payoff<sup>success</sup> = 105 &times; 1.03 = <b>108.15</b></p><p><b>Step 3 — payoff if the deal fails.</b> Prices revert to their pre-announcement levels: A back to 110, B back to 16. You must buy one A share at 110 to close the short, and you sell your 5 B shares at 16 each:</p><p>Payoff<sup>fail</sup> = 105 &times; 1.03 &minus; 110 + 5 &times; 16 = 108.15 &minus; 110 + 80 = <b>78.15</b></p><p><b>Step 4 — the certainty equivalent of the outlay.</b> The strategy cost 100 today, so a fair price requires the expected payoff in one year to equal that 100 <i>compounded at the risk-free rate</i>:</p><p>Certainty equivalent = 100 &times; 1.03 = <b>103</b></p><p>This is the step the key singles out: <b>do not set the expected payoff equal to 100</b>. Forgetting to compound gives p = 72.83% instead of 82.83%, a 10-point error.</p><p><b>Step 5 — solve for p.</b></p><p>103 = p(108.15) + (1 &minus; p)(78.15)<br>103 &minus; 78.15 = p(108.15 &minus; 78.15)<br>24.85 = 30p<br><b>p = 0.8283, i.e. 82.83%</b></p><p><b>Check.</b> 0.8283(108.15) + 0.1717(78.15) = 103.00 &#10003;</p><p><b>Reading the answer.</b> The market puts roughly a 5-in-6 chance on completion. That is consistent with B's price sitting at 20, close to but below the 21 (= 105/5) it would be worth if completion were certain: the 1-point gap is the risk of the deal breaking.</p>",
            "criteria": [
              "Constructs a self-financing long-short position: long 5 shares of B for every 1 share of A shorted, because the exchange ratio is 5:1. The key notes many valid constructions exist; only the internal consistency matters.",
              "Invests the short-sale proceeds at the risk-free rate, as the hint directs, and carries them forward: 105 × 1.03 = 108.15.",
              "Success payoff = 108.15, because the 5 B shares convert into exactly the 1 A share needed to close the short and the equity legs cancel.",
              "Failure payoff = 108.15 − 110 + 80 = 78.15, using the PRE-announcement prices, since the exercise states prices revert if the deal fails.",
              "Discounts or compounds correctly: the certainty equivalent of the 100 outlay is 100 × 1.03 = 103. The key calls this out as 'very important to not just plug 100'.",
              "Solves 103 = p(108.15) + (1−p)(78.15) to get p ≈ 82.83%. The key says reasonable approximations are fine and no extreme precision is needed.",
              "This part is worth 12 of the exercise's 20 points, so show the whole construction: the position, both payoffs, the certainty equivalent, and the equation."
            ]
          },
          {
            "label": "b",
            "points": 4,
            "body": "<p>Based on market reaction to the announcement, what could be the potential reason for this M&amp;A deal? (There can be multiple potential answers, choose one reason (not synergies!) and briefly explain in 2-3 sentences)</p>",
            "solution": "<p><b>Read the price reaction first.</b> A fell from 110 to 105 while B rose from 16 to 20. The market therefore believes the deal <b>destroys value for the acquirer's shareholders and transfers it to the target's</b>. Any acceptable explanation must produce that pattern; a value-creating motive would not push A down.</p><p><b>Model answer (empire building / managerial agency).</b> A's management appears to be pursuing size rather than value: the CEO wants to run a larger company, perhaps to expand into a new market or country, and is willing to overpay for a target that will not earn its price. The target's shareholders capture the whole of the premium, and possibly genuine benefits from joining a bigger organisation with better logistics, suppliers, customers or marketing, which is why B jumps 25%. This is an agency problem between A's managers and A's shareholders, not a synergy story: the total pie may not grow at all, and A's shareholders pay for it.</p><p><b>Other reasons that fit the same price pattern.</b> Managerial hubris and the winner's curse in a bidding contest; overpayment because the target was already fairly priced; the target's current management being so poor that the target gains from any change of owner; diversification that the acquirer's shareholders could have achieved themselves more cheaply; or coinsurance, where merging makes A's debt safer at the expense of A's shareholders.</p>",
            "criteria": [
              "Uses the announcement reaction as evidence: A down 5, B up 4. The key says 'the key logic is that for firm B the reaction is very positive and for firm A it is negative'.",
              "Concludes that the market sees the deal as inefficient for the acquirer, with the target's shareholders extracting the benefits.",
              "Gives ONE reason, in 2–3 sentences, and it must not be synergies — the exercise bans that answer explicitly.",
              "Accepted reasons include: empire building (the key's own example), managerial hubris or overconfidence, overpaying / the winner's curse, the target's current management being worse than the acquirer's, the target gaining access to a bigger market or better resources, unnecessary diversification, and coinsurance transferring value to creditors.",
              "The key's illustration is worth imitating: A's manager has ambitions to build a global company, expands abroad by buying a small foreign firm, there is little real value in the expansion relative to its cost, but the target still gains from access to better resources, logistics, suppliers, customers, HR and marketing.",
              "Keep it to 2–3 sentences. This part is worth 4 points; length is not rewarded."
            ]
          },
          {
            "label": "c",
            "points": 4,
            "body": "<p>You are a shareholder of A. As the situation develops, the management of company A decided to hold a shareholder vote to determine whether they should proceed with the deal. Based on the reason you chose in part b), how would you vote? How will the market react to the vote results (assume that most other shareholders followed you)? Briefly explain.</p>",
            "solution": "<p><b>Minimal accepted answer.</b> As a shareholder of A, I have no interest in a deal that transfers value out of my pocket, so <b>I vote against</b>. If most other shareholders vote the same way the deal is blocked, the reason for the repricing disappears, and <b>prices should revert to their pre-announcement levels: A back towards 110 and B back towards 16</b>. That is precisely what the exercise's own assumption says happens when the deal fails.</p><p><b>Bonus thought 1 &mdash; the reversion may be incomplete.</b> If A's management is entrenched enough, a shareholder vote against does not guarantee the deal dies; management may find a way to press ahead. As long as the market attaches some residual chance to completion, A will not climb all the way back to 110 and B will not fall all the way to 16. You can put a number on it by running the part (a) calculation backwards on the post-vote prices: the closer the prices are to their pre-announcement levels, the smaller the implied completion probability.</p><p><b>Bonus thought 2 &mdash; the failed bid is itself information.</b> A's interest in B may have told the market something it did not know, for example that B was undervalued or that B's assets are worth more in someone else's hands. In that case even a failed deal can leave B permanently above 16, because it has flagged B as a plausible target for another bidder.</p><p><b>Consistency with part (b).</b> The instruction is to answer &laquo;based on the reason you chose in part b)&raquo;, so the vote must follow from that reason. If you had argued in (b) that A's fall reflected something other than value destruction for A &mdash; say, a temporary overreaction &mdash; then a vote in favour with the corresponding market reaction would also be defensible. What is graded is the internal logic, not the direction of the vote.</p>",
            "criteria": [
              "Votes against, and gives the reason: the deal is inefficient for A's shareholders, which is who you are.",
              "Answers the second question too: prices revert towards their original levels (A up towards 110, B down towards 16). The key marks exactly this as 'the minimal accepted answer'.",
              "The answer must be CONSISTENT with the reason chosen in part b). The question says so explicitly, and an inconsistent pair loses points even if each half is defensible alone.",
              "Bonus credit, per the key: noting that a strong or entrenched manager might proceed anyway, so a small completion probability survives and prices do not fully revert.",
              "Bonus credit, per the key: noting that the bid itself may have revealed information, for example that B was undervalued, so B may stabilise above its pre-announcement price even after a failed deal.",
              "H2025's key explicitly awards bonus points for creativity on the verbal exercises, so a well-argued extra observation is never wasted."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "h2024",
    "label": "Autumn 2024",
    "date": "2024-11-18",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": "Kurbatov's first paper in the new format, and structurally identical to autumn 2025: two verbal exercises worth 12 points each, then capital structure, agency, valuation with leverage and real options. No official solution key exists for this sitting, so the solutions below are worked from scratch and every figure has been recomputed and checked.",
    "exercises": [
      {
        "n": 1,
        "title": "M&A",
        "points": 12,
        "topic": "Mergers and acquisitions",
        "chapters": [
          26
        ],
        "body": "<p>Briefly describe a possible reason why an acquisition could be beneficial or detrimental for the target and the acquiror (separately). In other words, list four possible reasons: why an M&amp;A could be positive for the acquiror, negative for the acquiror, positive for the target and negative for the target. Reasons must be other than &laquo;synergies&raquo;. Keep explanations short, 1-2 sentences per reason.</p>",
        "solution": "<p>Four boxes, one reason each, one to two sentences each. Three points per box. Synergies are banned, so every reason below is about value transfer, information, governance or agency instead.</p><p><b>1. Positive for the acquirer &mdash; a disciplinary takeover.</b> If the target is badly run, the acquirer can buy it at a price that reflects its current mediocre performance and then replace the management to unlock the difference. The gain is a governance gain, not a synergy: the same assets simply become worth more once someone competent runs them.</p><p><b>2. Negative for the acquirer &mdash; empire building and hubris.</b> An acquirer's CEO whose pay, prestige and career prospects rise with firm size has a private incentive to buy, and an overconfident bidder systematically overestimates what the target is worth to him. In a competitive auction the winner is by construction the bidder with the most optimistic valuation, so winning is itself bad news &mdash; the winner's curse.</p><p><b>3. Positive for the target &mdash; the control premium.</b> To acquire control the bidder must pay well above the market price, historically a premium of roughly 30 to 40%, so target shareholders realise an immediate gain the moment the bid is announced. The free-rider problem reinforces this: no individual target shareholder will tender below the post-acquisition value, so the bidder is forced to hand over most of the gains.</p><p><b>4. Negative for the target &mdash; entrenched management selling the shareholders short.</b> Target managers who fear losing their jobs can deploy poison pills, a staggered board or other defences to block a good offer, or can accept a low offer in exchange for private benefits such as a golden parachute or a seat on the combined board. Either way the target's shareholders end up with less than the deal was worth to them.</p><p><b>Other defensible answers.</b> Positive for the acquirer: buying a genuinely undervalued target if you have superior information; tax benefits such as using accumulated losses; increased market power. Negative for the acquirer: coinsurance, where the combined firm's cash flows are less risky so the acquirer's existing creditors gain at the acquirer's shareholders' expense; overpaying in stock when your own shares are undervalued. Negative for the target: the same coinsurance effect at the target's own level, where the target's creditors gain from the merger while its shareholders do not; or an all-stock deal in an overvalued acquirer, which leaves target shareholders holding paper that later reprices down.</p>",
        "criteria": [
          "Exactly four reasons, one in each of the four boxes: positive for acquirer, negative for acquirer, positive for target, negative for target. The exercise is graded box by box, so an answer that gives three brilliant reasons and leaves one box empty loses a quarter of the points.",
          "Synergies are explicitly banned and must not appear as any of the four, in any disguise ('cost savings', 'economies of scale', 'cross-selling').",
          "1–2 sentences per reason, as instructed. This is a 12-point exercise with a tight sentence budget; length is not rewarded.",
          "Each reason must be explained, not just named. Writing 'hubris' without saying what hubris does to the deal earns little.",
          "Reasonable, well-explained answers are accepted broadly, in line with Kurbatov's key for the 2025 verbal exercises. Defensible options include: disciplinary takeover, undervaluation, tax benefits, market power (acquirer positive); empire building, hubris, the winner's curse, overpayment, coinsurance transferring value to the acquirer's creditors (acquirer negative); the control premium, the free-rider problem forcing a high price, access to a stronger parent's resources (target positive); entrenchment and takeover defences, a lowball offer accepted for private benefits, coinsurance benefiting the target's creditors, receiving overvalued acquirer stock (target negative).",
          "Naming the mechanism is what sensor rewards. Say 'this is the winner's curse', 'this is the free-rider problem', 'this is coinsurance'."
        ]
      },
      {
        "n": 2,
        "title": "Governance",
        "points": 12,
        "topic": "Corporate governance",
        "chapters": [
          27
        ],
        "body": "<p>Select and describe two distinct ways of executive monitoring (for simplicity, let's refer to monitoring the CEO). Explain who is performing the monitoring and which tools they have at their disposal. Limit your explanations to 3-4 sentences per method at most.</p>",
        "solution": "<p>Two methods, six points each. Each answer must name the monitor and list the monitor's tools &mdash; the question asks for both, so an answer that describes only the mechanism loses half the marks.</p><p><b>Method 1 &mdash; the board of directors.</b> The monitor is the board, elected by shareholders at the general meeting and legally charged with acting in their interest; its independent (outside) directors are the ones who can actually confront the CEO, since inside directors report to him. Its tools are the strongest in the system: it hires and fires the CEO, sets his pay through the compensation committee, approves major investments and acquisitions, and oversees the accounts through an audit committee that has direct access to the auditors and to internal information. Board independence is therefore the key variable: a board packed with insiders, or one chaired by the CEO himself, has the same tools on paper but will not use them.</p><p><b>Method 2 &mdash; large blockholders and institutional investors.</b> The monitor here is a shareholder large enough to overcome the free-rider problem: a founding family, a private-equity holder, a pension fund or an activist hedge fund with a stake of a few percent or more, which internalises enough of any improvement to make monitoring worth its cost. Its tools are voting its block against directors or against the pay proposal, filing shareholder proposals, running a proxy contest to seat its own directors, campaigning publicly, engaging management privately behind the scenes, and threatening to sell out and depress the share price. Its ultimate weapon is the market for corporate control: a blockholder can launch or support a takeover or an LBO that replaces the CEO outright.</p><p><b>Other pairs that would score equally.</b> Auditors and the audit committee, whose tool is the statutory audit and, where applicable, certification requirements on the financial statements. Lenders, who monitor through debt covenants, financial reporting requirements and the threat of calling the loan. Security analysts and the financial press, whose tool is public scrutiny and reputational cost. The market for corporate control itself, whose tools are the hostile tender offer made directly to shareholders and the proxy contest. Regulators and the legal system, through disclosure rules, say-on-pay votes and fiduciary-duty litigation.</p>",
        "criteria": [
          "Exactly two methods, and they must be genuinely distinct. 'The board' and 'the compensation committee' are one method, not two.",
          "For each method, the answer must identify WHO monitors and WHICH TOOLS they have. The question asks for both explicitly, and both are graded.",
          "3–4 sentences per method at most, as instructed.",
          "Any well-explained pair of real monitoring channels is acceptable: the board of directors; large blockholders or institutional investors; activist investors; auditors and the audit committee; lenders through covenants; analysts and the financial press; the market for corporate control; regulators, say-on-pay and litigation.",
          "Credit for naming the underlying problem: monitoring exists because of the manager–shareholder agency problem, and dispersed small shareholders free-ride rather than monitor.",
          "Board independence deserves a mention if the board is one of your two methods: the tools are worthless if the monitors are the CEO's appointees."
        ]
      },
      {
        "n": 3,
        "title": "Capital Structure",
        "points": 18,
        "topic": "MM in perfect markets, recapitalisation",
        "chapters": [
          4,
          6,
          15
        ],
        "body": "<p>Best Interests Corporation currently has 15 million shares outstanding, and the share price is $90 per share. The company operates in perfect capital markets and has $250 million in debt. Its debt is risk-free with an expected return of 3% and it has an equity cost of capital of 9%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 3,
            "body": "<p>What is the unlevered cost of capital (r<sub>U</sub>) of the firm?</p>",
            "solution": "<p><b>Step 1 — market values.</b></p><p>E = 15M shares &times; $90 = <b>$1,350M</b><br>D = <b>$250M</b><br>V = E + D = <b>$1,600M</b></p><p><b>Step 2 — the unlevered cost of capital is the pre-tax WACC.</b> The market is perfect, so there are no taxes and no (1 &minus; &tau;<sub>c</sub>) term:</p><p>r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub><br>= (1,350/1,600)(0.09) + (250/1,600)(0.03)<br>= 0.84375(0.09) + 0.15625(0.03)<br>= 0.0759375 + 0.0046875 = <b>0.0806 (8.0625%)</b></p><p>Cross-check with MM II run backwards: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>) &rArr; 0.09 = 0.080625 + (250/1350)(0.080625 &minus; 0.03) = 0.080625 + 0.185185(0.050625) = 0.09 &#10003;</p>",
            "criteria": [
              "Computes E from the share price and share count: 15 × 90 = $1,350M. Using book values or the share count alone loses the exercise from the first line.",
              "V = E + D = $1,600M, with weights E/V = 0.84375 and D/V = 0.15625.",
              "Uses the PRE-tax WACC, with no (1 − τ) term, because the market is perfect and there are no taxes.",
              "r_U = 8.0625%. Four decimals on rates is the house style in this course."
            ]
          },
          {
            "label": "b",
            "points": 3,
            "body": "<p>The management announces a new issue of $400 million of debt. This new debt will be used to repay the existing one and the rest is paid out as a dividend.</p><p>What happens to the share price immediately upon announcement of the transaction?</p>",
            "solution": "<p><b>Nothing. The share price stays at $90.</b></p><p>In a perfect capital market there are no taxes, so there is no interest tax shield to create, and no bankruptcy or agency costs to destroy. By MM Proposition I the total value of the firm is set by its assets and their cash flows, not by how those cash flows are divided between debt holders and equity holders. The announcement changes the division and nothing else, so there is no new information for the market to capitalise into the price.</p><p>Contrast this with the taxed world: there, an announcement of $150M of extra permanent debt would raise firm value by &tau;<sub>c</sub> &times; $150M immediately on announcement, and the whole of that jump would accrue to the existing shareholders. Here &tau;<sub>c</sub> = 0, so the jump is zero.</p><p>V = $1,600M before and after the announcement; E = $1,350M; P = $90.</p>",
            "criteria": [
              "Answers unambiguously: the share price does not change, it stays at $90.",
              "Gives the reason, which is the point of the question: perfect markets, no taxes, so no tax shield is created and MM Proposition I holds.",
              "Distinguishes the announcement from the execution. At announcement nothing has been paid out yet, so the price cannot have dropped.",
              "Bonus for contrasting with the taxed case, where the announcement would move the price by PV of the tax shield."
            ]
          },
          {
            "label": "c",
            "points": 6,
            "body": "<p>What happens to the share price after the conclusion of the transaction? Are the shareholders better off or worse off?</p>",
            "solution": "<p><b>Step 1 — trace the cash.</b> The firm raises $400M of new debt. $250M goes to retiring the old debt, so the remaining <b>$150M is paid out as a dividend</b>:</p><p>Dividend per share = $150M / 15M shares = <b>$10.00 per share</b></p><p><b>Step 2 — the new equity value.</b> Firm value is unchanged at $1,600M (MM I, perfect markets), and debt is now $400M:</p><p>E<sub>new</sub> = 1,600 &minus; 400 = <b>$1,200M</b></p><p>The share count is unchanged &mdash; a dividend retires no shares &mdash; so</p><p>P<sub>ex-div</sub> = $1,200M / 15M = <b>$80.00 per share</b></p><p>The share price falls by exactly $10, the size of the dividend. This is the ordinary ex-dividend drop, not a loss.</p><p><b>Step 3 — are shareholders better or worse off?</b> <b>Neither.</b> Look at what a single shareholder holds after the transaction:</p><table class=\"data\"><tr><th>Before</th><th>After</th></tr><tr><td>1 share worth $90</td><td>1 share worth $80 + $10 cash = <b>$90</b></td></tr></table><p>Their total wealth is unchanged at $90 per share. The leveraged recapitalisation moved $150M from the equity claim into their pockets and financed it by selling a larger claim to debt holders. In a perfect market that is a pure repackaging: value is neither created nor destroyed.</p><p><b>Consistency check.</b> Total value to shareholders = 15M &times; $80 + $150M dividend = $1,200M + $150M = <b>$1,350M</b>, exactly the equity value before the transaction. &#10003;</p>",
            "criteria": [
              "Identifies the dividend correctly: $400M raised less $250M used to repay the old debt leaves $150M, i.e. $10 per share on 15 million shares.",
              "New equity value = 1,600 − 400 = $1,200M, over an UNCHANGED 15 million shares, giving $80. Reducing the share count here confuses a dividend with a repurchase and is the main trap in the exercise.",
              "States that the price falls by exactly the dividend, from $90 to $80.",
              "Answers the second question explicitly: shareholders are neither better nor worse off. $80 in shares plus $10 in cash is $90, the same as before.",
              "Names the mechanism: MM Proposition I in a perfect market, and the ex-dividend price drop. A drop in price is not a loss.",
              "This part carries 6 of the 18 points, so both halves — the new price and the welfare conclusion — must be answered."
            ]
          },
          {
            "label": "d",
            "points": 3,
            "body": "<p>The debt becomes riskier after the transaction, and it has an expected return of 4.5%. What is the new equity cost of capital for the firm?</p>",
            "solution": "<p><b>Step 1 — the new capital structure.</b> After the recapitalisation D = $400M and E = $1,200M, so D/E = 400/1,200 = <b>1/3</b>.</p><p><b>Step 2 — MM Proposition II with the new, riskier debt.</b> r<sub>U</sub> is unchanged at 8.0625%, because the firm's assets and their business risk have not changed:</p><p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>)<br>= 0.080625 + (1/3)(0.080625 &minus; 0.045)<br>= 0.080625 + (1/3)(0.035625)<br>= 0.080625 + 0.011875 = <b>0.0925 (9.2500%)</b></p><p><b>Consistency check.</b> The pre-tax WACC must still equal r<sub>U</sub>:</p><p>(1,200/1,600)(0.0925) + (400/1,600)(0.045) = 0.75(0.0925) + 0.25(0.045) = 0.069375 + 0.011250 = <b>0.080625</b> &#10003;</p><p>Note the mechanism: leverage went up, which pushes r<sub>E</sub> up, but part of the extra risk has been passed to the debt holders (r<sub>D</sub> rose from 3% to 4.5%), which pulls r<sub>E</sub> back down. The two effects together take r<sub>E</sub> from 9% only to 9.25%.</p>",
            "criteria": [
              "Uses the POST-transaction capital structure, D = 400 and E = 1,200, giving D/E = 1/3. Using the old D/E of 250/1,350 is the error to avoid.",
              "Keeps r_U at 8.0625%: the asset risk is unchanged by a financing transaction.",
              "Applies MM II with the NEW r_D of 4.5%, not the old 3%.",
              "r_E = 9.25%.",
              "The check that the pre-tax WACC still equals r_U costs one line and catches any of the above slips."
            ]
          },
          {
            "label": "e",
            "points": 3,
            "body": "<p>Instead of a dividend, the management is considering a share repurchase. So, they will still repay the old debt and use the remaining money to repurchase shares.</p><p>What happens to the share price after the transaction? How many shares would the management repurchase?</p>",
            "solution": "<p><b>Step 1 — the share price.</b> It stays at <b>$90</b>. A repurchase executed at the market price is a fair-value exchange: the firm hands over $150M of cash and receives shares worth exactly $150M in return, so the remaining shareholders neither gain nor lose. In a perfect market a repurchase and a dividend are equivalent; they differ only in whether the payout arrives as cash per share or as a reduced share count.</p><p><b>Step 2 — how many shares.</b></p><p>Shares repurchased = $150M / $90 = <b>1.6667 million shares</b></p><p>Shares remaining = 15.0000 &minus; 1.6667 = <b>13.3333 million</b></p><p><b>Consistency check.</b> Equity value after the transaction is still E = 1,600 &minus; 400 = $1,200M, and</p><p>$1,200M / 13.3333M shares = <b>$90.00 per share</b> &#10003;</p><p><b>Compare the two policies.</b> Under the dividend, a shareholder ends with a $80 share plus $10 cash. Under the repurchase, a shareholder who sells gets $90 cash and one who holds keeps a $90 share. Both routes leave every shareholder with exactly $90 of wealth per original share, which is payout irrelevance in a perfect market.</p>",
            "criteria": [
              "Share price is unchanged at $90, with the reason: the repurchase is executed at the fair market price, so it is a value-neutral exchange of cash for shares.",
              "Shares repurchased = 150/90 = 1.6667 million, using the $150M left after repaying the old debt — not the full $400M.",
              "The check E/N = 1,200/13.3333 = $90 confirms the answer and takes one line.",
              "Full marks for adding the comparison with part (c): dividend gives $80 + $10, repurchase gives $90, and both leave wealth at $90. That is payout irrelevance, and it is exactly what the two-part structure of this exercise is testing."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Debt and risk",
        "points": 18,
        "topic": "Risk shifting and hedging",
        "chapters": [
          9,
          24
        ],
        "body": "<p>Big Tobacco Company (BTC) is considering several possible projects. It has an option to implement one project or none at all. The projects' outcomes are summarized in the following table:</p><table class=\"data\"><tr><th></th><th>Probability</th><th>Payoff, million USD</th></tr><tr><td>Project A</td><td class=\"n\">100 %</td><td class=\"n\">50</td></tr><tr><td rowspan=\"2\">Project B</td><td class=\"n\">50 %</td><td class=\"n\">80</td></tr><tr><td class=\"n\">50 %</td><td class=\"n\">16</td></tr><tr><td rowspan=\"2\">Project C</td><td class=\"n\">20 %</td><td class=\"n\">150</td></tr><tr><td class=\"n\">80 %</td><td class=\"n\">0</td></tr></table><p>For example, Project B generates 80 million USD with a 50% chance and 16 million USD with 50% chance. The manager acts in the best interests of BTC's shareholders.</p>",
        "parts": [
          {
            "label": "a",
            "points": 3,
            "body": "<p>Assume that BTC has no debt. Which project will the manager choose?</p>",
            "solution": "<p>With no debt, equity holders own the entire firm, so maximising shareholder value is the same as maximising expected firm value. Compute the expected payoff of each project:</p><table class=\"data\"><tr><th>Project</th><th>Expected payoff</th><th>Value</th></tr><tr><td>A</td><td>1.00 &times; 50</td><td class=\"n\">50.0</td></tr><tr><td>B</td><td>0.50 &times; 80 + 0.50 &times; 16 = 40 + 8</td><td class=\"n\">48.0</td></tr><tr><td>C</td><td>0.20 &times; 150 + 0.80 &times; 0 = 30 + 0</td><td class=\"n\">30.0</td></tr></table><p><b>The manager chooses Project A</b>, worth $50M. It is the first-best choice: it has the highest expected value, and with no debt outstanding there is nothing to distort the decision. Note that A is also the safest project, so the ranking A &gt; B &gt; C happens to run from least to most risky. That is what makes the following parts work.</p>",
            "criteria": [
              "Recognises that with no debt, equity value = firm value, so the criterion is simply the highest expected payoff.",
              "Computes all three expectations and shows them: 50, 48 and 30.",
              "Chooses A. This is the first-best benchmark, and later parts are measured against it, so say so.",
              "Show the calculation. Asserting 'A, because it is certain' without the numbers loses points."
            ]
          },
          {
            "label": "b",
            "points": 5,
            "body": "<p>Assume that BTC has 25 million USD in debt. Which project will the manager choose?</p>",
            "solution": "<p>Now equity is a residual claim: shareholders are paid only what is left after the $25M debt is served, and their payoff is floored at zero because of limited liability. Value equity state by state as E = E[max(CF &minus; 25, 0)].</p><table class=\"data\"><tr><th>Project</th><th>Equity payoff, state by state</th><th>Equity value</th><th>Debt value</th><th>Firm value</th></tr><tr><td>A</td><td>1.00 &times; max(50&minus;25,0) = 25</td><td class=\"n\">25.0</td><td class=\"n\">25.0</td><td class=\"n\">50.0</td></tr><tr><td>B</td><td>0.50 &times; max(80&minus;25,0) + 0.50 &times; max(16&minus;25,0) = 0.5(55) + 0.5(0)</td><td class=\"n\"><b>27.5</b></td><td class=\"n\">20.5</td><td class=\"n\">48.0</td></tr><tr><td>C</td><td>0.20 &times; max(150&minus;25,0) + 0.80 &times; max(0&minus;25,0) = 0.2(125) + 0</td><td class=\"n\">25.0</td><td class=\"n\">5.0</td><td class=\"n\">30.0</td></tr></table><p><b>The manager chooses Project B</b>, because it gives shareholders 27.5 against 25.0 for A and 25.0 for C.</p><p><b>Name the mechanism: this is risk shifting, or asset substitution.</b> With risky debt outstanding, shareholders hold what is effectively a call option on the firm's assets with strike 25. They keep all of the upside above 25 but limited liability caps their downside at zero, so they prefer more volatility even at the cost of expected value. Project B destroys $2M of firm value relative to A (48 versus 50), and the manager takes it anyway.</p><p><b>Who pays for it.</b> Debt value falls from 25.0 under A to 20.5 under B, a loss of 4.5 for creditors, while equity gains 2.5. The 2.5 gain plus the 2.0 of destroyed value equals the 4.5 taken from the creditors. &#10003; The <b>agency cost of debt</b> here is 50 &minus; 48 = <b>$2M</b>: the value that disappears because the financing structure distorts the investment decision. Rational creditors anticipate this and price the debt accordingly, so ultimately the shareholders bear it when they issue the debt.</p>",
            "criteria": [
              "Values equity as E[max(CF − D, 0)] state by state, with limited liability flooring the payoff at zero. Subtracting 25 from the expected payoff instead of state by state is the fatal error and gives the wrong ranking.",
              "All three equity values shown: A = 25.0, B = 27.5, C = 25.0.",
              "Chooses B.",
              "Names the mechanism: risk shifting / asset substitution, equity as a call option on firm value with strike equal to the face value of debt.",
              "Full marks for the value accounting: firm value falls from 50 to 48, creditors lose 4.5, shareholders gain 2.5, and 2.5 + 2.0 = 4.5. Stating the agency cost of debt as $2M is exactly what sensor is looking for."
            ]
          },
          {
            "label": "c",
            "points": 5,
            "body": "<p>Is there a value of debt for which the manager is indifferent between projects B and C? If it exists, find it and briefly explain what happens if debt increases beyond that value. If it does not exist, explain why.</p>",
            "solution": "<p><b>Step 1 — write equity value as a function of the debt level D.</b></p><p>Project B: for 16 &lt; D &le; 80 the low state pays nothing to equity, so E<sub>B</sub>(D) = 0.5(80 &minus; D).<br>Project C: for 0 &lt; D &le; 150 the low state pays nothing to equity, so E<sub>C</sub>(D) = 0.2(150 &minus; D).</p><p><b>Step 2 — set them equal.</b></p><p>0.5(80 &minus; D) = 0.2(150 &minus; D)<br>40 &minus; 0.5D = 30 &minus; 0.2D<br>10 = 0.3D<br><b>D = 33.3333 million USD</b> (exactly 100/3)</p><p><b>Step 3 — verify, including that the solution lies in the assumed region.</b> 33.3333 lies in (16, 80], so the assumption that B's low state wipes out equity is satisfied.</p><p>E<sub>B</sub> = 0.5(80 &minus; 33.3333) = 0.5(46.6667) = <b>23.3333</b><br>E<sub>C</sub> = 0.2(150 &minus; 33.3333) = 0.2(116.6667) = <b>23.3333</b> &#10003;<br>E<sub>A</sub> = max(50 &minus; 33.3333, 0) = 16.6667, well below both, so B and C really are the two contenders at that debt level.</p><p>(For completeness: in the region D &le; 16 the equation 48 &minus; D = 0.2(150 &minus; D) gives D = 22.5, which is outside that region, so there is no second solution.)</p><p><b>Step 4 — what happens beyond D = 33.3333.</b> Compare the slopes: E<sub>B</sub> falls at 0.5 per unit of debt while E<sub>C</sub> falls at only 0.2, because C's upside is concentrated in a single very high state that stays far above the strike. So for any D &gt; 33.3333 the manager <b>switches to Project C</b>:</p><table class=\"data\"><tr><th>Debt D</th><th>E<sub>A</sub></th><th>E<sub>B</sub></th><th>E<sub>C</sub></th><th>Chosen</th></tr><tr><td class=\"n\">25</td><td class=\"n\">25.0</td><td class=\"n\">27.5</td><td class=\"n\">25.0</td><td>B</td></tr><tr><td class=\"n\">33.33</td><td class=\"n\">16.7</td><td class=\"n\">23.3</td><td class=\"n\">23.3</td><td>B = C</td></tr><tr><td class=\"n\">40</td><td class=\"n\">10.0</td><td class=\"n\">20.0</td><td class=\"n\">22.0</td><td>C</td></tr><tr><td class=\"n\">60</td><td class=\"n\">0.0</td><td class=\"n\">10.0</td><td class=\"n\">18.0</td><td>C</td></tr></table><p><b>The mechanism, stated for the examiner.</b> Risk shifting escalates with leverage. The more debt is outstanding, the deeper out of the money the equity call is, and the more shareholders value the extreme upside of a lottery-like project over expected value. Beyond D = 33.3333 the manager abandons the $48M project for the $30M one, so the agency cost of debt jumps from $2M to <b>$20M</b> (50 &minus; 30). This is the standard argument for why highly levered firms need covenants: creditors know exactly this will happen and must contract against it.</p>",
            "criteria": [
              "Sets up equity value as a function of D for both projects, using max(CF − D, 0) state by state, and identifies the relevant region 16 < D ≤ 80.",
              "Solves 0.5(80 − D) = 0.2(150 − D) to get D = 33.3333 (100/3).",
              "Verifies the solution lies inside the assumed region and that both equity values really are equal at 23.3333. Checking that Project A is not preferred at that debt level closes the argument.",
              "Answers the follow-up question: beyond D = 33.3333 the manager switches to C, because C's equity value falls more slowly in D (slope 0.2 versus 0.5).",
              "Names the mechanism: risk shifting intensifies with leverage; equity is a call option that goes further out of the money as D rises, making lottery-like payoffs relatively more attractive.",
              "Full marks for quantifying the consequence: the agency cost of debt rises from $2M (choosing B over A) to $20M (choosing C over A), which motivates debt covenants."
            ]
          },
          {
            "label": "d",
            "points": 5,
            "body": "<p>Keep the assumption that the firm has 25 million in debt. The management receives a call from a medical firm, Enhanced Tobacco Health (ETH). ETH operates in a different industry where the boom and bust states are inverted compared to BTC. ETH proposes a zero-NPV project to smooth out the states for both firms. The project details are summarized in the table below:</p><table class=\"data\"><tr><th></th><th>Probability</th><th>Payoff, million USD</th><th>ETH project, million USD</th></tr><tr><td>Project A</td><td class=\"n\">100 %</td><td class=\"n\">50</td><td class=\"n\">0</td></tr><tr><td rowspan=\"2\">Project B</td><td class=\"n\">50 %</td><td class=\"n\">80</td><td class=\"n\">&minus;10</td></tr><tr><td class=\"n\">50 %</td><td class=\"n\">16</td><td class=\"n\">+10</td></tr><tr><td rowspan=\"2\">Project C</td><td class=\"n\">20 %</td><td class=\"n\">150</td><td class=\"n\">&minus;10</td></tr><tr><td class=\"n\">80 %</td><td class=\"n\">0</td><td class=\"n\">+2.5</td></tr></table><p>Will BTC management accept the project? Explain why or why not.</p>",
            "solution": "<p><b>Step 0 — confirm the hedge really is zero-NPV.</b> Under B: 0.5(&minus;10) + 0.5(+10) = 0. Under C: 0.2(&minus;10) + 0.8(+2.5) = &minus;2 + 2 = 0. Under A: 0. &#10003; It transfers money from the good state to the bad state without changing any expected value. It is a pure hedge.</p><p><b>Step 1 — combined payoffs and equity values with the hedge, still at D = 25.</b></p><table class=\"data\"><tr><th>Project</th><th>Combined payoffs</th><th>Firm value</th><th>Equity value</th><th>Debt value</th></tr><tr><td>A + hedge</td><td>50 for sure</td><td class=\"n\">50.0</td><td class=\"n\"><b>25.0</b></td><td class=\"n\">25.0</td></tr><tr><td>B + hedge</td><td>70 (p=0.5), 26 (p=0.5)</td><td class=\"n\">48.0</td><td class=\"n\">23.0</td><td class=\"n\">25.0</td></tr><tr><td>C + hedge</td><td>140 (p=0.2), 2.5 (p=0.8)</td><td class=\"n\">30.0</td><td class=\"n\">23.0</td><td class=\"n\">7.0</td></tr></table><p>Equity under B + hedge = 0.5(70 &minus; 25) + 0.5(26 &minus; 25) = 22.5 + 0.5 = 23.0. Equity under C + hedge = 0.2(140 &minus; 25) + 0.8(0) = 23.0. So with the hedge in place the best the shareholders can do is <b>A, worth 25.0</b>.</p><p><b>Step 2 — compare with the no-hedge world.</b> From part (b), without the hedge the manager picks B and equity is worth <b>27.5</b>.</p><p><b>Conclusion: BTC management will REJECT the project.</b> 25.0 &lt; 27.5, so accepting the hedge costs shareholders $2.5M.</p><p><b>Why, in words.</b> The hedge lifts the bad state from 16 to 26, which is above the $25 face value of the debt. That makes the debt <i>safe</i>, and the whole point of Project B for shareholders was that the debt was <i>unsafe</i>: B was attractive only because in the low state the creditors, not the shareholders, absorbed the shortfall. Hedging destroys that option value. Shareholders are being asked to give up their risk-shifting gain, and they refuse &mdash; even though the hedge would make the firm as a whole better off.</p><p><b>The consistency check sensor performs.</b> Compare the world with the hedge (where A is chosen) against the world without it (where B is chosen):</p><table class=\"data\"><tr><th>Claim</th><th>No hedge (B chosen)</th><th>With hedge (A chosen)</th><th>Change</th></tr><tr><td>Shareholders</td><td class=\"n\">27.5</td><td class=\"n\">25.0</td><td class=\"n\">&minus;2.5</td></tr><tr><td>Creditors</td><td class=\"n\">20.5</td><td class=\"n\">25.0</td><td class=\"n\">+4.5</td></tr><tr><td>Firm</td><td class=\"n\">48.0</td><td class=\"n\">50.0</td><td class=\"n\">+2.0</td></tr></table><p>&minus;2.5 + 4.5 = +2.0, and the +2.0 is exactly the efficiency gain from eliminating the risk-shifting distortion. &#10003; <b>Creditors capture more than the whole of the efficiency gain</b>, so shareholders are left worse off. This is the general result: a zero-NPV hedge is rejected by levered shareholders precisely when it works, because reducing risk transfers wealth to debt holders. It is the mirror image of debt overhang.</p><p><b>What would change the answer.</b> If the debt could be renegotiated &mdash; creditors giving up some face value in exchange for the hedge &mdash; there is $2M of surplus to split, so a deal exists that makes both sides better off. Alternatively, if the hedge had been agreed <i>before</i> the debt was issued, the creditors would have paid up front for the safer claim and the shareholders would have captured the $2M themselves.</p>",
            "criteria": [
              "Verifies that the ETH project is zero-NPV in every case (0.5(−10) + 0.5(10) = 0 for B; 0.2(−10) + 0.8(2.5) = 0 for C), so nothing here is about expected value.",
              "Recomputes the state-by-state payoffs with the hedge and re-optimises the project choice under the hedge. Simply asking 'does the hedge help project B?' misses that the manager can now switch to A.",
              "Equity values with the hedge: A = 25.0, B = 23.0, C = 23.0. So the best shareholders can do with the hedge is 25.0.",
              "Compares against the no-hedge optimum of 27.5 from part (b), and concludes: management REJECTS the project.",
              "Explains the mechanism: the hedge raises the bad state above the face value of debt, making the debt safe and destroying the shareholders' risk-shifting option. The benefit accrues to creditors.",
              "The consistency check is the high-value part of this answer: shareholders lose 2.5, creditors gain 4.5, firm value rises 2.0, and −2.5 + 4.5 = +2.0. Sensor's keys single out the belief that shareholders gain from de-risking as a specific error — creditors capture more than the efficiency gain.",
              "Bonus: noting that renegotiating the debt, or hedging before the debt was issued, would let shareholders capture the $2M."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Valuation",
        "points": 20,
        "topic": "WACC and APV",
        "chapters": [
          3,
          4,
          17,
          18
        ],
        "body": "<p>You are working as an analyst for Hordaland Solutions and your task is to evaluate a competitor, Sogn og Fjordane Industries, for a potential merge into Vestland Incorporated. You know that SoF Inc. generates a FCF of 40 million NOK per year (starting next year and every year after). They maintain a constant debt-to-value ratio of 30%. The cost of debt for SoF is 6%. The product they produce is very similar to the product of Hordaland Solutions, the risks are comparable. Hordaland Solutions maintains a debt-to-equity ratio of 25%, has a debt beta of 0 and its equity has a beta of 1.5. You know that the tax rate is currently 40% and that the risk-free rate is 5% in the current economy. Moreover, you are also monitoring the market portfolio, and its expected return is 11%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 6,
            "body": "<p>What is the unlevered cost of capital for SoF Industries?</p>",
            "solution": "<p>This is the twin-firm routine. SoF is not listed as a comparable in its own right, but Hordaland makes a very similar product with comparable risk, so Hordaland's <b>unlevered</b> (asset) beta is also SoF's. The word &laquo;unlevered&raquo; matters: the two firms have different leverage, so their equity betas differ, but their asset betas do not.</p><p><b>Step 1 — turn Hordaland's D/E into weights.</b> D/E = 0.25, so</p><p>D/V = 0.25/1.25 = <b>0.2000</b> and E/V = 1/1.25 = <b>0.8000</b></p><p><b>Step 2 — unlever Hordaland's equity beta.</b> Course convention: weight without taxes.</p><p>&beta;<sub>U</sub> = (E/V)&beta;<sub>E</sub> + (D/V)&beta;<sub>D</sub> = 0.8(1.5) + 0.2(0) = 1.20 + 0 = <b>1.2000</b></p><p><b>Step 3 — CAPM on the asset beta.</b> The market risk premium is 0.11 &minus; 0.05 = 0.06.</p><p>r<sub>U</sub> = r<sub>f</sub> + &beta;<sub>U</sub>(E[R<sub>Mkt</sub>] &minus; r<sub>f</sub>) = 0.05 + 1.2(0.06) = 0.05 + 0.072 = <b>0.1220 (12.2000%)</b></p><p><b>Step 4 — transfer it.</b> Because the products and risks are comparable, SoF has the same business risk and therefore the same unlevered cost of capital: <b>r<sub>U</sub><sup>SoF</sup> = 12.20%</b>. Note that SoF's own leverage (30%) plays no part in this answer; it enters only from part (b) onwards.</p>",
            "criteria": [
              "Identifies that the comparable's UNLEVERED beta, not its equity beta, is what transfers between the two firms, and says why: same product, comparable business risk, different leverage.",
              "Converts D/E = 0.25 into D/V = 0.2, E/V = 0.8. Using 0.25/0.75 is the standard slip.",
              "beta_U = 0.8(1.5) + 0.2(0) = 1.2, weighted WITHOUT taxes as the course requires.",
              "Market risk premium = 11% − 5% = 6%, and r_U = 5% + 1.2(6%) = 12.20%.",
              "Explicitly does NOT use SoF's own 30% leverage here. This part is worth 6 points, the most of any part in the exercise, precisely because the unlever/transfer/relever logic is the most examined skill in the course."
            ]
          },
          {
            "label": "b",
            "points": 3,
            "body": "<p>What is the return on equity for SoF Industries?</p>",
            "solution": "<p><b>Step 1 — SoF's leverage in D/E form.</b> D/V = 0.30, so E/V = 0.70 and</p><p>D/E = 0.30/0.70 = 3/7 = <b>0.4286</b></p><p><b>Step 2 — relever with MM Proposition II.</b></p><p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>)<br>= 0.1220 + 0.4286(0.1220 &minus; 0.0600)<br>= 0.1220 + 0.4286(0.0620)<br>= 0.1220 + 0.0266 = <b>0.1486 (14.8571%)</b></p><p><b>Check.</b> The pre-tax WACC must return r<sub>U</sub>: 0.7(0.148571) + 0.3(0.06) = 0.104 + 0.018 = <b>0.1220</b> &#10003;</p>",
            "criteria": [
              "Converts SoF's D/V = 0.30 into D/E = 0.30/0.70 = 0.4286. Plugging 0.30 into the MM II formula in place of D/E is the trap this part is built around.",
              "Applies MM II with SoF's own cost of debt of 6%, not Hordaland's zero-beta rate.",
              "r_E = 14.8571%.",
              "The pre-tax WACC check (0.7 r_E + 0.3 r_D = r_U) takes one line and catches the D/E error immediately."
            ]
          },
          {
            "label": "c",
            "points": 3,
            "body": "<p>What is the after-tax WACC for SoF Industries?</p>",
            "solution": "<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>)<br>= 0.70(0.148571) + 0.30(0.06)(1 &minus; 0.40)<br>= 0.104000 + 0.30(0.036)<br>= 0.104000 + 0.010800 = <b>0.1148 (11.4800%)</b></p><p><b>Check with the shortcut.</b> r<sub>wacc</sub> = r<sub>U</sub> &minus; d&middot;&tau;<sub>c</sub>&middot;r<sub>D</sub> where d = D/V = 0.30:</p><p>0.1220 &minus; 0.30(0.40)(0.06) = 0.1220 &minus; 0.0072 = <b>0.1148</b> &#10003;</p><p>The tax shield reduces the cost of capital by 72 basis points, and that reduction is what the WACC method uses in place of an explicit tax-shield cash flow.</p>",
            "criteria": [
              "Applies (1 − τ_c) to the cost of debt only, never to the cost of equity.",
              "Uses SoF's own weights, E/V = 0.70 and D/V = 0.30.",
              "r_wacc = 11.48%.",
              "The shortcut r_wacc = r_U − d·τ_c·r_D is a fast cross-check worth knowing, but the formula-sheet version is what is expected in the answer."
            ]
          },
          {
            "label": "d",
            "points": 2,
            "body": "<p>What is the levered value of SoF Industries using the WACC approach?</p>",
            "solution": "<p>The free cash flow is a level perpetuity of 40M NOK starting next year, with no growth, so:</p><p>V<sup>L</sup> = FCF / r<sub>wacc</sub> = 40 / 0.1148 = <b>348.4321 million NOK</b></p><p>The tax shield is already inside the 11.48% discount rate, so it must not be added on top. Adding it separately here would double count it.</p>",
            "criteria": [
              "Uses the perpetuity formula with the AFTER-tax WACC: V^L = 40/0.1148.",
              "V^L = 348.4321 million NOK (348.43).",
              "Does not add a separate tax shield — that is the APV method, coming next.",
              "No growth rate: the exercise says 40M per year, not growing, so the denominator is r_wacc alone."
            ]
          },
          {
            "label": "e",
            "points": 6,
            "body": "<p>Using the debt values from the WACC method, find the levered value of SoF Industries using the APV approach.</p>",
            "solution": "<p><b>Step 1 — the unlevered value.</b> Discount the same free cash flows at r<sub>U</sub>, as if the firm carried no debt:</p><p>V<sup>U</sup> = 40 / 0.1220 = <b>327.8689 million NOK</b></p><p><b>Step 2 — the debt level, taken from the WACC answer as instructed.</b> The firm holds D/V constant at 30%, so</p><p>D = 0.30 &times; 348.4321 = <b>104.5296 million NOK</b></p><p><b>Step 3 — the annual tax shield.</b></p><p>Interest = r<sub>D</sub> &times; D = 0.06 &times; 104.5296 = <b>6.2718M</b><br>TS = &tau;<sub>c</sub> &times; Interest = 0.40 &times; 6.2718 = <b>2.5087M per year, in perpetuity</b></p><p><b>Step 4 — which rate discounts it, and why.</b> The firm maintains a <i>constant debt-to-value ratio</i>, so the debt level rises and falls with the firm's value and the tax shield inherits the risk of the firm's assets. The correct discount rate is therefore <b>r<sub>U</sub> = 12.20%</b>, not r<sub>D</sub> and not r<sub>f</sub>. (Those would apply only to a fixed, pre-set debt schedule.) Say this explicitly in the exam; it is the single most tested judgement call in the valuation part of the course.</p><p>PV(TS) = 2.5087 / 0.1220 = <b>20.5632 million NOK</b></p><p><b>Step 5 — put it together.</b></p><p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = 327.8689 + 20.5632 = <b>348.4321 million NOK</b></p><p><b>Consistency check 1 — the two methods agree.</b> The WACC method in part (d) gave 348.4321 and the APV method gives 348.4321. Identical, as they must be. &#10003;</p><p><b>Consistency check 2 — the weighted beta returns &beta;<sub>U</sub>.</b> SoF's equity beta is (0.148571 &minus; 0.05)/0.06 = 1.6429 and its debt beta is (0.06 &minus; 0.05)/0.06 = 0.1667. Weighting them:</p><p>0.70(1.6429) + 0.30(0.1667) = 1.1500 + 0.0500 = <b>1.2000</b> = &beta;<sub>U</sub> &#10003;</p><p>(E = 348.4321 &minus; 104.5296 = 243.9024, so D/E = 0.4286, matching part (b). &#10003;)</p>",
            "criteria": [
              "V^U = 40/0.122 = 327.8689, discounting the SAME free cash flows at r_U.",
              "Takes D from the WACC answer as the question instructs: D = 0.30 × 348.4321 = 104.5296. Using an assumed or arbitrary debt level ignores the instruction.",
              "Tax shield = τ_c × r_D × D = 0.4 × 0.06 × 104.5296 = 2.5087 per year, valued as a perpetuity.",
              "Discounts the tax shield at r_U = 12.2%, AND states the reason: constant D/V means the debt level moves with firm value, so the shield carries asset risk. Using r_D (giving 41.81) or r_f is the classic error and changes the answer by more than 20M.",
              "PV(TS) = 20.5632 and V^L = 327.8689 + 20.5632 = 348.4321.",
              "Ends with the consistency check that the APV value equals the WACC value from part (d). This part carries 6 points and the check is what shows you understand the two methods are the same valuation, not two estimates.",
              "Optional second check, worth writing if time allows: SoF's beta_E = 1.6429 and beta_D = 0.1667 weight back to beta_U = 1.2000."
            ]
          }
        ]
      },
      {
        "n": 6,
        "title": "Risk-neutral valuation",
        "points": 20,
        "topic": "Real options, risk-neutral valuation",
        "chapters": [
          22,
          25
        ],
        "body": "<p>You are currently considering investing in a ferry service to one of the islands around Bergen. You need a license to operate it and a ferry which cost 12 million NOK together, paid immediately. Once you start operating the ferry, it will generate 1.5 million NOK every year for 10 years (at that point the ferry is scrapped, scrap value exactly offsets the scrapping cost and the license expires, so there is no value generation after year 10). You know that we live in uncertain times, but the risk-free rate is currently 5%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 3,
            "body": "<p>What is the project's NPV if you invest right now?</p>",
            "solution": "<p>The cash flows are a 10-year annuity of 1.5M NOK, the first payment falling at the end of Year 1, discounted at 5%.</p><p><b>Step 1 — the annuity factor.</b></p><p>A(10, 5%) = [1 &minus; 1.05<sup>&minus;10</sup>] / 0.05 = [1 &minus; 0.6139] / 0.05 = 0.3861 / 0.05 = <b>7.7217</b></p><p><b>Step 2 — present value of the operating cash flows.</b></p><p>PV = 1.5 &times; 7.7217 = <b>11.5826 million NOK</b></p><p><b>Step 3 — subtract the immediate outlay.</b></p><p>NPV = 11.5826 &minus; 12 = <b>&minus;0.4174 million NOK</b></p><p>The static NPV is negative, so on a naive analysis you would not build the ferry. Hold on to the 11.5826 figure: it is the value of the underlying asset, and it does the work in part (c).</p>",
            "criteria": [
              "Recognises a 10-year annuity, not a perpetuity. The exercise is explicit that nothing is generated after Year 10.",
              "Annuity factor at 5% for 10 years = 7.7217; PV = 11.5826.",
              "NPV = 11.5826 − 12 = −0.4174 million NOK.",
              "Shows the annuity factor. It is reused in part (c) as the current price of the underlying asset, so writing it down explicitly pays off twice."
            ]
          },
          {
            "label": "b",
            "points": 6,
            "body": "<p>Instead of investing straight away, you have an opportunity to wait for a year and decide whether to invest then. By that time the uncertainty will be resolved, the risk-free rate will be either 3% or 7%, starting from year 1 (risk-free rate from Year 0 to Year 1 remains 5%). The investment cost will still be the same, 12 million NOK, paid at time 1. The project still generates cash for 10 years, so the last year is Year 11 in this scenario.</p><p>What is the project's NPV from today's perspective (time 0) in both cases?</p>",
            "solution": "<p>If you wait, the project is the same 10-year annuity of 1.5M and the same 12M outlay, just shifted one year forward. Value it at date 1 using the then-prevailing rate, then bring it back to date 0 at the Year-0-to-Year-1 rate of 5%.</p><p><b>Upside, r<sub>f</sub> = 3%.</b></p><p>A(10, 3%) = [1 &minus; 1.03<sup>&minus;10</sup>] / 0.03 = [1 &minus; 0.7441] / 0.03 = <b>8.5302</b><br>PV<sub>1</sub> = 1.5 &times; 8.5302 = <b>12.7953</b><br>NPV<sub>1</sub> = 12.7953 &minus; 12 = <b>+0.7953</b><br>NPV<sub>0</sub> = 0.7953 / 1.05 = <b>+0.7574 million NOK</b></p><p><b>Downside, r<sub>f</sub> = 7%.</b></p><p>A(10, 7%) = [1 &minus; 1.07<sup>&minus;10</sup>] / 0.07 = [1 &minus; 0.5083] / 0.07 = <b>7.0236</b><br>PV<sub>1</sub> = 1.5 &times; 7.0236 = <b>10.5354</b><br>NPV<sub>1</sub> = 10.5354 &minus; 12 = <b>&minus;1.4646</b><br>NPV<sub>0</sub> = &minus;1.4646 / 1.05 = <b>&minus;1.3949 million NOK</b></p><table class=\"data\"><tr><th>State at t = 1</th><th>Annuity factor</th><th>PV<sub>1</sub> of cash flows</th><th>NPV at t = 1</th><th>NPV at t = 0</th></tr><tr><td>Up, r<sub>f</sub> = 3%</td><td class=\"n\">8.5302</td><td class=\"n\">12.7953</td><td class=\"n\">+0.7953</td><td class=\"n\">+0.7574</td></tr><tr><td>Down, r<sub>f</sub> = 7%</td><td class=\"n\">7.0236</td><td class=\"n\">10.5354</td><td class=\"n\">&minus;1.4646</td><td class=\"n\">&minus;1.3949</td></tr></table><p>Note that the rate move is what drives everything here: a lower discount rate makes the same annuity worth more, so &laquo;up&raquo; for this project means <i>down</i> for interest rates.</p>",
            "criteria": [
              "Values each branch at date 1 with that branch's own rate, using 10 payments starting one year after the outlay.",
              "Annuity factors: 8.5302 at 3% and 7.0236 at 7%. PV_1 = 12.7953 and 10.5354.",
              "NPV at t = 1: +0.7953 and −1.4646.",
              "Discounts BOTH back to t = 0 at 5%, the rate that applies from Year 0 to Year 1, since the question asks for today's perspective: +0.7574 and −1.3949. Using 3% or 7% for that first year is the trap.",
              "Identifies the 3% branch as the upside: a lower discount rate raises the value of a fixed annuity."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>Sadly, you don't know the probabilities of the upside and downside. However, you remember how to use risk-neutral valuation.</p><p>What is the risk-neutral probability of the upside (r<sub>f</sub> = 3%)?</p>",
            "solution": "<p><b>Step 1 — identify the underlying asset.</b> The asset is the ferry operation itself: the claim to ten annual payments of 1.5M. Its price today is what you computed in part (a), and its two possible values at date 1 are the PV<sub>1</sub> figures from part (b). Crucially, the underlying is the <b>cash-flow stream, not the NPV</b>: the 12M investment cost is the option's strike price, not part of the asset.</p><table class=\"data\"><tr><th></th><th>Value</th></tr><tr><td>S<sub>0</sub>, value today</td><td class=\"n\">11.5826</td></tr><tr><td>S<sub>u</sub>, value at t = 1 if r<sub>f</sub> = 3%</td><td class=\"n\">12.7953</td></tr><tr><td>S<sub>d</sub>, value at t = 1 if r<sub>f</sub> = 7%</td><td class=\"n\">10.5354</td></tr></table><p><b>Step 2 — apply the formula-sheet expression.</b> The risk-neutral probability &rho; is the one that makes the asset earn the risk-free rate in expectation over Year 0 to Year 1, i.e. 5%:</p><p>&rho; = [(1 + r<sub>f</sub>)S<sub>0</sub> &minus; S<sub>d</sub>] / (S<sub>u</sub> &minus; S<sub>d</sub>)<br>= [1.05 &times; 11.5826 &minus; 10.5354] / (12.7953 &minus; 10.5354)<br>= [12.1617 &minus; 10.5354] / 2.2599<br>= 1.6264 / 2.2599 = <b>0.7197 (71.97%)</b></p><p>and 1 &minus; &rho; = <b>0.2803 (28.03%)</b>.</p><p><b>Step 3 — check it.</b> Under &rho; the asset must be worth exactly S<sub>0</sub> when discounted at the risk-free rate:</p><p>[0.7197(12.7953) + 0.2803(10.5354)] / 1.05 = 12.1617 / 1.05 = <b>11.5826</b> &#10003;</p><p><b>Why real probabilities never appear.</b> &rho; is not a forecast. It is the probability that would prevail if every investor were risk neutral, and it is constructed so that the replicating portfolio prices correctly. Because the option payoff can be replicated with the underlying asset and the risk-free bond, its price cannot depend on the true probabilities or on anyone's risk aversion, and neither can be estimated here anyway. That is precisely why the exercise can tell you the true probabilities are unknown and still ask for a number.</p>",
            "criteria": [
              "Identifies the underlying asset as the PROJECT'S CASH FLOWS (S_0 = 11.5826), not the NPV. Building the tree on the NPV values gives a different and wrong probability; the 12M is a strike, not part of the asset.",
              "S_u = 12.7953 and S_d = 10.5354, taken from part (b).",
              "Uses the formula-sheet expression rho = [(1 + r_f)S_0 − S_d]/(S_u − S_d) with r_f = 5%, the rate that applies from Year 0 to Year 1.",
              "rho = 0.7197 (about 72%), and 1 − rho = 0.2803.",
              "Verifies: [rho·S_u + (1−rho)·S_d]/1.05 must return S_0 = 11.5826.",
              "Explains why the true probabilities are not needed: the payoff can be replicated with the asset and the risk-free bond, so no risk preferences enter. This part carries 8 points, so the reasoning is worth as much as the arithmetic.",
              "A sanity check that rho lies between 0 and 1 costs nothing and catches a mis-specified tree."
            ]
          },
          {
            "label": "d",
            "points": 3,
            "body": "<p>What is the current value of the option to wait? Keep in mind that you are not forced to invest at time 1 if the conditions are unfavorable. What is your decision right now (Year 0): do you invest or wait?</p>",
            "solution": "<p><b>Step 1 — the option payoffs at t = 1.</b> Waiting gives you a call on the ferry operation with strike 12, exercised only if it is worth exercising:</p><p>C<sub>u</sub> = max(12.7953 &minus; 12, 0) = <b>0.7953</b><br>C<sub>d</sub> = max(10.5354 &minus; 12, 0) = <b>0</b> (you simply do not invest)</p><p><b>Step 2 — value it under the risk-neutral probability.</b></p><p>C<sub>0</sub> = [&rho;C<sub>u</sub> + (1 &minus; &rho;)C<sub>d</sub>] / (1 + r<sub>f</sub>)<br>= [0.7197(0.7953) + 0.2803(0)] / 1.05<br>= 0.5723 / 1.05 = <b>0.5451 million NOK</b></p><p><b>Step 3 — verify by replication.</b> The formula sheet's other route must give the same number:</p><p>&Delta; = (C<sub>u</sub> &minus; C<sub>d</sub>)/(S<sub>u</sub> &minus; S<sub>d</sub>) = 0.7953 / 2.2599 = <b>0.3519</b><br>B = (C<sub>d</sub> &minus; S<sub>d</sub>&Delta;)/(1 + r<sub>f</sub>) = (0 &minus; 10.5354 &times; 0.3519)/1.05 = &minus;3.7076/1.05 = <b>&minus;3.5310</b><br>C<sub>0</sub> = S<sub>0</sub>&Delta; + B = 11.5826(0.3519) &minus; 3.5310 = 4.0761 &minus; 3.5310 = <b>0.5451</b> &#10003;</p><p><b>Step 4 — the decision.</b> The value of the option to wait, measured against the alternative of investing today, is</p><p>0.5451 &minus; max(NPV<sub>now</sub>, 0) = 0.5451 &minus; 0 = <b>0.5451 million NOK</b></p><p><b>Decision: wait.</b> Waiting is worth +0.5451M whereas investing now is worth &minus;0.4174M, a difference of 0.9625M in favour of waiting.</p><p><b>Comment.</b> The licence is a call option on the ferry business, and waiting is valuable for two separate reasons. First, the project is not worth doing today anyway, so there is no cash flow you are giving up by holding back. Second, and more generally, the uncertainty about the interest rate has genuine option value: you get to invest only in the branch where the annuity is worth more than 12M, and to walk away in the branch where it is not. The right to be selective is what the 0.5451M measures, and it exists even though the project's static NPV is negative.</p>",
            "criteria": [
              "Applies the option payoff max(S_1 − 12, 0) at date 1: 0.7953 in the up state and 0 in the down state, because you are not forced to invest.",
              "Discounts the risk-neutral expectation at the risk-free rate: C_0 = [0.7197(0.7953)]/1.05 = 0.5451 million NOK.",
              "Answers the decision question explicitly: WAIT. Waiting is worth +0.5451M, investing now is worth −0.4174M.",
              "Notes that the value of the option to wait is the value of waiting minus max(NPV_now, 0), which here is 0.5451 − 0 = 0.5451 because the immediate NPV is negative.",
              "Optional but strong: verify with the replication route from the formula sheet, Delta = 0.3519 and B = −3.5310, giving the same 0.5451. Two independent routes to the same number is the consistency check for a binomial question.",
              "Comment on the mechanism: the licence is a call option, the value comes from being able to invest only in the favourable state, and a negative static NPV does not mean the opportunity is worthless."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2024",
    "label": "Spring 2024",
    "date": "2024-05-28",
    "minutes": 180,
    "points": 180,
    "format": "10 multiple choice + 4 problems · calculator permitted",
    "note": "The last paper in the old format before Kurbatov took over: 36 points of multiple choice plus four long problems. IMPORTANT SOURCE WARNING — the archive contains only the sensor guide (2024 - S.pdf) for this sitting, not the question paper. The guide gives the worked solutions but reproduces none of the question text, and for the multiple-choice part it records nothing but the ten answer letters. The four problem statements below are therefore RECONSTRUCTED from the data in the guide: every number is exactly as the guide states it, but the wording is not the examiner's. The ten multiple-choice questions could not be reconstructed at all and are left as placeholders carrying the recorded letters; use the Spring 2023 multiple-choice section for practice instead. Per-part point splits are not recorded in the guide either; the splits shown are a reasonable division of each problem's stated total. Every figure in the solutions has been recomputed from scratch and cross-checked along a second, independent route.",
    "exercises": [
      {
        "n": 1,
        "title": "Multiple choice (MC 1–10)",
        "points": 36,
        "topic": "Answer key only — questions not recorded",
        "chapters": [
          12,
          13,
          14
        ],
        "body": "<p><i>The Spring 2024 question paper is not in the archive. Only the sensor guide survives, and for this section it records nothing but the ten answer letters. The questions themselves are lost, so the ten parts below are placeholders.</i></p><p>The guide does print one note about the section, verbatim:</p><p>&laquo;Please note that the first six MC questions are based on an exercise we solved in the lecture on &lt;Security Issues&gt;. Indeed, the six MC questions are based on the exact same setting, even with the same numbers as in the exercise in the lecture. So you may want to check the lecture slides or video recording if you are unsure about the analysis.&raquo;</p><p>That places questions 1&ndash;6 squarely in the asymmetric-information and issuance block &mdash; Myers-Majluf, the pecking order, and the mechanics of an IPO or SEO (chapters 12&ndash;14). Questions 7&ndash;10 are not attributed to any lecture.</p><p><b>For actual practice, use the Spring 2023 multiple-choice section</b>, which is reproduced in full with worked solutions. The FIE402 multiple-choice bank is reused heavily across sittings, so those ten are the closest available substitute.</p>",
        "parts": [
          {
            "label": "1",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>C</b>.</p><p>One of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise, so the subject is asymmetric information and the debt-versus-equity issuance decision. Nothing further about the question survives.</p>",
            "criteria": [
              "The key records C. Nothing else about this question survives — treat it as a bookkeeping entry, not as practice material."
            ]
          },
          {
            "label": "2",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>B</b>.</p><p>One of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise (chapters 12&ndash;14).</p>",
            "criteria": [
              "The key records B. The question text is lost."
            ]
          },
          {
            "label": "3",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>A</b>.</p><p>One of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise (chapters 12&ndash;14).</p>",
            "criteria": [
              "The key records A. The question text is lost."
            ]
          },
          {
            "label": "4",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>B</b>.</p><p>One of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise (chapters 12&ndash;14).</p>",
            "criteria": [
              "The key records B. The question text is lost."
            ]
          },
          {
            "label": "5",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>B</b>.</p><p>One of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise (chapters 12&ndash;14).</p>",
            "criteria": [
              "The key records B. The question text is lost."
            ]
          },
          {
            "label": "6",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>D</b>.</p><p>The last of the six questions drawn from the &laquo;Security Issues&raquo; lecture exercise (chapters 12&ndash;14).</p>",
            "criteria": [
              "The key records D. The question text is lost."
            ]
          },
          {
            "label": "7",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>A</b>.</p><p>Questions 7&ndash;10 are not attributed to any lecture in the key, so not even the topic is known.</p>",
            "criteria": [
              "The key records A. Neither the question nor its topic survives."
            ]
          },
          {
            "label": "8",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>C</b>.</p><p>Questions 7&ndash;10 are not attributed to any lecture in the key.</p>",
            "criteria": [
              "The key records C. Neither the question nor its topic survives."
            ]
          },
          {
            "label": "9",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>D</b>.</p><p>Questions 7&ndash;10 are not attributed to any lecture in the key.</p>",
            "criteria": [
              "The key records D. Neither the question nor its topic survives."
            ]
          },
          {
            "label": "10",
            "points": 3.6,
            "body": "<p><i>Question text not recorded.</i></p>",
            "solution": "<p>The official key records the answer as <b>A</b>.</p><p>Questions 7&ndash;10 are not attributed to any lecture in the key. The full recorded sequence for the section is C, B, A, B, B, D, A, C, D, A.</p>",
            "criteria": [
              "The key records A. Neither the question nor its topic survives."
            ]
          }
        ]
      },
      {
        "n": 2,
        "title": "Problem 1 — Risk shifting",
        "points": 52,
        "topic": "Agency costs of debt, risk shifting, debt buy-back",
        "chapters": [
          9,
          10
        ],
        "body": "<p><i>[Reconstructed from the solution key &mdash; the Spring 2024 question paper is not in the archive. Every number below is exactly as the key states it; the wording is not the examiner's.]</i></p><p>Petron Corporation's management team is meeting to decide on a new corporate strategy. There are four strategies available, each with a different probability of success and a different total firm value in the event of success. If a strategy fails, the firm is worth nothing.</p><table class=\"data\"><tr><th>Strategy</th><th>Probability of success</th><th>Firm value if successful</th></tr><tr><td>A</td><td class=\"n\">100%</td><td class=\"n\">$50 million</td></tr><tr><td>B</td><td class=\"n\">80%</td><td class=\"n\">$60 million</td></tr><tr><td>C</td><td class=\"n\">60%</td><td class=\"n\">$70 million</td></tr><tr><td>D</td><td class=\"n\">40%</td><td class=\"n\">$80 million</td></tr></table><p>Petron's debt matures at the same time as the strategy pays off, and management chooses the strategy that maximises the value of the firm's equity. Assume investors are risk neutral and the risk-free rate is zero, so that all values below are expected values.</p>",
        "parts": [
          {
            "label": "a",
            "points": 8,
            "body": "<p>Which strategy maximises the expected value of the firm as a whole?</p>",
            "solution": "<p>Expected firm value = probability of success &times; firm value if successful, since the firm is worth nothing if the strategy fails.</p><table class=\"data\"><tr><th>Strategy</th><th>Calculation</th><th>Expected firm value</th></tr><tr><td>A</td><td>1.0 &times; 50</td><td class=\"n\">$50M</td></tr><tr><td>B</td><td>0.8 &times; 60</td><td class=\"n\">$48M</td></tr><tr><td>C</td><td>0.6 &times; 70</td><td class=\"n\">$42M</td></tr><tr><td>D</td><td>0.4 &times; 80</td><td class=\"n\">$32M</td></tr></table><p><b>Strategy A implies the highest expected firm value, $50 million.</b> Note the pattern: each step from A to D buys $10 million of extra upside at the cost of 20 percentage points of success probability, and the trade is a losing one every time. A is the first-best strategy.</p>",
            "criteria": [
              "Multiplies probability by value-if-successful for all four strategies and gets 50, 48, 42, 32.",
              "Recognises that firm value is zero on failure, so no second term is needed.",
              "Names A as the value-maximising strategy. This is the first-best benchmark that parts (c) and (f) are measured against, so it must be stated explicitly."
            ]
          },
          {
            "label": "b",
            "points": 10,
            "body": "<p>Management chooses the strategy that maximises the expected value of the firm's equity. Which strategy will management choose if Petron has (i) no debt, and (ii) debt with a face value of $40 million?</p>",
            "solution": "<p>Equity is a call option on the firm's assets with a strike equal to the face value of debt: the expected equity value is p &times; max(V &minus; F, 0).</p><p><b>(i) No debt (F = 0).</b> Expected equity value is just the expected firm value from part (a): 50, 48, 42, 32. <b>Management chooses strategy A</b> &mdash; with no debt, the shareholders own the whole firm, so their interest and the firm's interest coincide.</p><p><b>(ii) Face value $40 million.</b></p><table class=\"data\"><tr><th>Strategy</th><th>Calculation</th><th>Expected equity value</th></tr><tr><td>A</td><td>1.0 &times; (50 &minus; 40)</td><td class=\"n\">$10M</td></tr><tr><td>B</td><td>0.8 &times; (60 &minus; 40)</td><td class=\"n\">$16M</td></tr><tr><td>C</td><td>0.6 &times; (70 &minus; 40)</td><td class=\"n\">$18M</td></tr><tr><td>D</td><td>0.4 &times; (80 &minus; 40)</td><td class=\"n\">$16M</td></tr></table><p><b>Management will choose strategy C</b>, worth $18 million to shareholders &mdash; even though strategy C destroys $8 million of firm value relative to A.</p><p>Why the ranking flips: the $40 million face value absorbs the whole downside. Shareholders keep every dollar above 40 and lose nothing extra below it, so they care only about the part of the distribution above the strike. Raising the upside from 50 to 70 doubles the equity payoff in the success state (10 &rarr; 30), which more than pays for the drop in success probability from 100% to 60%. Beyond C the probability loss finally dominates, which is why D falls back to 16.</p>",
            "criteria": [
              "Uses expected equity value = p × max(V − F, 0), i.e. treats equity as a call on firm value struck at the face value of debt.",
              "With no debt, equity value equals firm value, so the choice is A. Saying this in one line is enough, but it must be said — it is the comparison the whole exercise rests on.",
              "With F = 40, computes 10, 16, 18, 16 and picks C.",
              "Explains the mechanism, not just the arithmetic: limited liability truncates the downside, so shareholders are paid for variance they do not fully bear."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>What agency cost of debt does your answer to part (b) illustrate? Quantify it.</p>",
            "solution": "<p>The result illustrates the <b>agency cost of leverage in the form of excessive risk taking</b> &mdash; risk shifting, or asset substitution. As the amount of leverage increases, the firm's equity holders may prefer riskier strategies even though those strategies lower the total expected value of the firm.</p><p><b>Quantifying it.</b> Compare the firm value under the strategy actually chosen against the first-best strategy:</p><p>With a $40 million face value the firm chooses strategy C, so the expected firm value is $42 million and the expected equity value is $18 million. Without debt, management chooses strategy A, implying an expected firm value of $50 million.</p><p>Agency cost = 50 &minus; 42 = <b>$8 million</b></p><p><b>Who actually pays it.</b> Not the shareholders, at the moment of the decision &mdash; they gain, from $10M to $18M. The loss lands on the creditors, whose claim falls from a fully covered $40 million to 0.6 &times; 40 = $24 million. In a rational market the creditors anticipate this and price the debt at $24 million when it is issued, so the $8 million is ultimately borne by the shareholders in the form of a lower issue price. That is the sense in which it is a cost of debt and not a free transfer.</p>",
            "criteria": [
              "Names the mechanism: risk shifting / asset substitution / excessive risk taking, an agency cost of leverage. Naming it is what the key rewards.",
              "Quantifies it as first-best firm value minus the value under the chosen strategy: 50 − 42 = $8 million.",
              "States both figures the comparison rests on: strategy C gives an expected firm value of $42M and an expected equity value of $18M; strategy A gives $50M.",
              "Full marks for adding that creditors anticipate the behaviour and price it into the debt, so the cost falls back on shareholders ex ante. Treating the $8M as a pure gift from creditors to shareholders misses why it is called a cost."
            ]
          },
          {
            "label": "d",
            "points": 8,
            "body": "<p>Which strategy will management choose if Petron instead has debt with a face value of $5 million? What is the expected firm value in that case?</p>",
            "solution": "<table class=\"data\"><tr><th>Strategy</th><th>Calculation</th><th>Expected equity value</th></tr><tr><td>A</td><td>1.0 &times; (50 &minus; 5)</td><td class=\"n\">$45M</td></tr><tr><td>B</td><td>0.8 &times; (60 &minus; 5)</td><td class=\"n\">$44M</td></tr><tr><td>C</td><td>0.6 &times; (70 &minus; 5)</td><td class=\"n\">$39M</td></tr><tr><td>D</td><td>0.4 &times; (80 &minus; 5)</td><td class=\"n\">$30M</td></tr></table><p><b>Management will choose strategy A</b>, implying an expected firm value of <b>$50 million</b> &mdash; the first best.</p><p>The point of the part is the comparison with (b): the distortion is a function of how much leverage there is, not of leverage as such. At a face value of $5 million the debt is almost never in the money, shareholders bear essentially the whole downside, and their ranking of the four strategies is the same as the firm's. There is <b>no agency cost at this debt level</b>: 50 &minus; 50 = 0.</p>",
            "criteria": [
              "Computes 45, 44, 39, 30 and picks A.",
              "States the resulting expected firm value of $50 million, which is the first best from part (a).",
              "Draws the conclusion that matters: with low leverage the agency cost disappears, because shareholders again bear the downside. The distortion is driven by the LEVEL of debt, not by the presence of debt."
            ]
          },
          {
            "label": "e",
            "points": 8,
            "body": "<p>Petron considers reducing its debt from a face value of $40 million to a face value of $5 million, by raising equity and using the proceeds to buy back debt. You hold Petron debt with a face value of $0.1 million. What price would you accept for it, and how much equity must Petron raise in total?</p>",
            "solution": "<p><b>Step 1 &mdash; what the debt is worth after the transaction.</b> This is where the exercise is won or lost. Once the face value has been cut to $5 million, part (d) tells us management will switch to strategy A, which succeeds with certainty and produces $50 million. A claim of $5 million against a firm worth $50 million for sure is <b>risk free</b>.</p><p><b>Step 2 &mdash; what you demand for your bond.</b> Because the remaining debt will be risk free after the transaction, holding on is worth full face value. So you would only sell your debt if you received the face value of <b>$0.1 million</b>. Anything less and you simply keep the bond, which will pay 0.1 in every state of the world.</p><p><b>Step 3 &mdash; the total.</b> Petron must retire $40M &minus; $5M = $35 million of face value, and every holder reasons exactly as you do. Petron will therefore need to raise <b>$35 million from equity holders</b> to buy back debt with a face value of $35 million.</p><p><b>Why you do not sell at the pre-announcement price.</b> Before the recapitalisation the debt is worth only 0.6 &times; 40 = $24 million in total, i.e. 60 cents on the dollar, because management is running strategy C. But that price reflects the risk shifting that the buy-back itself eliminates. A bondholder who is asked to sell into the transaction knows the survivors will be paid in full, so he will not accept 60 cents. This hold-out logic is what makes the recapitalisation expensive, and it is exactly what part (f) prices.</p>",
            "criteria": [
              "Recognises the chain: cutting the face value to $5M changes the strategy to A (part d), which makes the remaining debt risk free.",
              "Concludes that a holder sells only at full face value — $0.1 million for a $0.1 million bond, and $35 million for $35 million of face value.",
              "Does NOT price the buy-back at the pre-transaction market value of 60 cents on the dollar. Paying 0.6 × 35 = $21M is the trap: it ignores that the transaction itself removes the risk the discount was compensating for.",
              "Naming the hold-out problem, or noting that the creditors capture the benefit of their own release, is what earns the top of the band."
            ]
          },
          {
            "label": "f",
            "points": 10,
            "body": "<p>Compare the payoffs to Petron's existing shareholders and to its debt holders, with and without the buy-back. Would the shareholders want to undertake the recapitalisation? Comment.</p>",
            "solution": "<p><b>Existing shareholders.</b></p><p><i>With the buy-back:</i> the expected value of equity after the transaction is $45 million (strategy A, face value 5, from part d), but equity holders would have to contribute $35 million to buy back the debt. Either the old shareholders contribute this amount directly, or it is raised from new shareholders, in which case old shareholders have to give away a share of the firm's equity worth $35 million. Either way the expected net value for existing shareholders is</p><p>45 &minus; 35 = <b>$10 million</b></p><p><i>Without the buy-back:</i> the existing equity holders receive the $18 million computed in part (b).</p><p><b>Shareholders would therefore lose 18 &minus; 10 = $8 million as a result of the buy-back.</b></p><p><b>Debt holders.</b></p><p><i>With the buy-back:</i> they receive $35 million in cash and still hold $5 million of risk-free debt, for a total payoff of <b>$40 million</b>.</p><p><i>Without the buy-back:</i> Petron finds it optimal to run strategy C, which implies a debt value of 60% &times; $40 million = <b>$24 million</b>.</p><p><b>Debt holders would therefore gain 40 &minus; 24 = $16 million.</b></p><p><b>The consistency check.</b> The two changes must add up to the change in total firm value:</p><table class=\"data\"><tr><th>Claim</th><th>Without buy-back</th><th>With buy-back</th><th>Change</th></tr><tr><td>Shareholders</td><td class=\"n\">$18M</td><td class=\"n\">$10M</td><td class=\"n\">&minus;$8M</td></tr><tr><td>Debt holders</td><td class=\"n\">$24M</td><td class=\"n\">$40M</td><td class=\"n\">+$16M</td></tr><tr><td><b>Firm</b></td><td class=\"n\"><b>$42M</b></td><td class=\"n\"><b>$50M</b></td><td class=\"n\"><b>+$8M</b></td></tr></table><p>&minus;8 + 16 = +8, and +8 is precisely the agency cost computed in part (c). &#10003; The efficiency gain from eliminating risk shifting is real, and it is exactly $8 million.</p><p><b>Comment &mdash; the punchline.</b> The total expected value of the firm would increase by $8 million through the recapitalisation, which reflects the benefit of eliminating the agency costs computed in part (c). Importantly, the <b>debt holders capture $16 million, more than the whole $8 million of efficiency gain</b>, and thus equity holders lose. Therefore, even though Petron has an inefficiently high level of leverage, <b>shareholders would not find it optimal to reduce the leverage</b>.</p><p>This is the general lesson and one the solution keys return to across several years: it is not enough that a transaction creates value. Shareholders act only if they capture some of it, and when existing creditors are the ones whose claim is repaired, they take the gain and then some. The same logic, run in reverse, is debt overhang &mdash; shareholders decline a positive-NPV project because the creditors would collect the proceeds.</p>",
            "criteria": [
              "Shareholders with buy-back: $45M of equity less the $35M they must contribute = $10M. Forgetting to subtract the contribution is the single most common error and turns a loss into an apparent gain.",
              "Shareholders without buy-back: $18M, carried over from part (b).",
              "Debt holders with buy-back: $35M cash plus $5M of risk-free debt = $40M. Without: 0.6 × 40 = $24M.",
              "States both changes with their signs: shareholders −$8M, debt holders +$16M.",
              "Runs the consistency check the examiner runs: the gain to creditors plus the gain to shareholders must equal the change in firm value, −8 + 16 = +8 = the agency cost from part (c).",
              "Answers the question asked: NO, shareholders would not undertake the recapitalisation, because creditors capture more than the entire efficiency gain.",
              "Naming the mechanism — that this is the mirror image of debt overhang, and that believing shareholders always gain from reducing inefficient debt is precisely the error the keys call out — is what separates a full-mark answer."
            ]
          }
        ]
      },
      {
        "n": 3,
        "title": "Problem 2 — Valuation with leverage",
        "points": 36,
        "topic": "WACC, MM II, growing perpetuity, releveraging",
        "chapters": [
          3,
          4,
          17
        ],
        "body": "<p><i>[Reconstructed from the solution key &mdash; the Spring 2024 question paper is not in the archive. Every number below is exactly as the key states it; the wording is not the examiner's.]</i></p><p>A company has 2.5 billion shares outstanding, trading at $50 per share, and maintains a debt-to-equity ratio of 0.20. Its debt has a cost of capital of 4.2% and its equity has a beta of 0.5. The risk-free rate is 4%, the expected return on the market portfolio is 10%, and the corporate tax rate is 25%. The company expects free cash flow of $6 billion at the end of next year, growing at a constant rate in perpetuity thereafter.</p><p>Recommended precision is 4 decimal places on all rates.</p>",
        "parts": [
          {
            "label": "a",
            "points": 9,
            "body": "<p>Compute the market value of the company's equity, the market value of its debt, and its levered firm value.</p>",
            "solution": "<p><b>Equity.</b> Market capitalisation is price times shares:</p><p>E = $50 &times; 2.5 billion = <b>$125 billion</b></p><p><b>Debt.</b> The debt-to-equity ratio is 0.20, so debt is 20% of equity, not 20% of firm value:</p><p>D = 0.20 &times; 125 = <b>$25 billion</b></p><p><b>Firm value.</b></p><p>V<sup>L</sup> = E + D = 125 + 25 = <b>$150 billion</b></p><p><b>The weights you will need later.</b> E/V = 125/150 = 5/6 = 0.8333 and D/V = 25/150 = 1/6 = 0.1667. Write them down now: every remaining part of this exercise uses them, and the standard slip is to carry 0.20 and 0.80 forward instead.</p>",
            "criteria": [
              "E = 50 × 2.5bn = $125bn.",
              "D = 0.20 × E = $25bn. Reading D/E = 0.20 as D/V = 0.20 (giving D = $30bn) is the classic error and poisons every later part.",
              "V^L = $150bn.",
              "Deriving the weights E/V = 5/6 and D/V = 1/6 explicitly is worth the line it costs."
            ]
          },
          {
            "label": "b",
            "points": 9,
            "body": "<p>Compute the company's equity cost of capital and its weighted average cost of capital.</p>",
            "solution": "<p><b>Step 1 &mdash; equity cost of capital, from the CAPM.</b> The market risk premium is E[R<sub>Mkt</sub>] &minus; r<sub>f</sub> = 10% &minus; 4% = 6%.</p><p>r<sub>E</sub> = r<sub>f</sub> + &beta;<sub>E</sub>(E[R<sub>Mkt</sub>] &minus; r<sub>f</sub>) = 4% + 0.5(10% &minus; 4%) = 4% + 3% = <b>0.0700 (7.0000%)</b></p><p><b>Step 2 &mdash; the after-tax WACC.</b> The tax rate enters only through the cost of debt:</p><p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>)<br>= (125/150)(7%) + (25/150)(4.2%)(1 &minus; 25%)<br>= 0.8333(0.0700) + 0.1667(0.0315)<br>= 0.058333 + 0.005250 = <b>0.0635833 (6.3583%)</b></p><p>The key rounds this to <b>6.36%</b>. Carry the unrounded figure into part (c), where it is subtracted from a number of similar size &mdash; rounding here shows up magnified there.</p><p><i>Cross-check with the ratio form, which avoids computing V at all:</i> r<sub>wacc</sub> = [1/(1 + D/E)]r<sub>E</sub> + [(D/E)/(1 + D/E)]r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>) = (1/1.2)(0.07) + (0.2/1.2)(0.042)(0.75) = 0.0583333 + 0.0052500 = <b>0.0635833</b> &#10003;</p>",
            "criteria": [
              "r_E = 7.00% from the CAPM with a 6% market risk premium. Using 10% as the premium (giving 9%) is the trap.",
              "After-tax WACC applies (1 − τ_c) to r_D only, never to r_E.",
              "Weights 5/6 and 1/6, not 0.8 and 0.2.",
              "r_wacc = 6.3583%, which the key reports as 6.36%.",
              "Rounding discipline: this number is subtracted from a similar-sized number in part (c), so 4 decimals must be carried forward."
            ]
          },
          {
            "label": "c",
            "points": 9,
            "body": "<p>What constant growth rate of free cash flow is implied by the company's current market value?</p>",
            "solution": "<p>The WACC method values a growing perpetuity of free cash flow as</p><p>V<sup>L</sup> = FCF<sub>1</sub> / (r<sub>wacc</sub> &minus; g)</p><p>Everything except g is known, so invert it:</p><p>V<sup>L</sup>(r<sub>wacc</sub> &minus; g) = FCF<sub>1</sub><br>r<sub>wacc</sub> &minus; g = FCF<sub>1</sub> / V<sup>L</sup> = 6 / 150 = 0.0400<br>g = r<sub>wacc</sub> &minus; FCF<sub>1</sub>/V<sup>L</sup> = 0.0635833 &minus; 0.0400 = <b>0.0235833 (2.3583%)</b></p><p>The key reports <b>2.36%</b>.</p><p><i>Verification, the other way round:</i> 6 / (0.0635833 &minus; 0.0235833) = 6 / 0.0400 = <b>150</b> &#10003; &mdash; exactly the firm value from part (a).</p><p>Note the shape of the answer: the ratio FCF<sub>1</sub>/V<sup>L</sup> = 4% is the free cash flow yield, and the growing-perpetuity formula says the discount rate must exceed the yield by precisely the growth rate. That is a useful sanity check in itself: a 6.36% cost of capital against a 4% cash flow yield can only be reconciled by roughly 2.4% of growth.</p>",
            "criteria": [
              "Uses V^L = FCF_1/(r_wacc − g) and solves for g rather than for V.",
              "FCF_1/V^L = 6/150 = 0.04 is computed as one clean step.",
              "g = 2.3583%, reported by the key as 2.36%.",
              "Discounts at the WACC, not at r_U — the tax shield belongs in the rate here.",
              "The one-line verification that 6/(0.0635833 − 0.0235833) = 150 is cheap and catches a sign or rounding slip immediately."
            ]
          },
          {
            "label": "d",
            "points": 9,
            "body": "<p>Suppose the company permanently increases its leverage to a debt-to-equity ratio of 0.5, and that its cost of debt rises to 4.5% as a result. Assuming free cash flow and its growth rate are unaffected, compute the new unlevered cost of capital, the new equity cost of capital, the new weighted average cost of capital, and the new values of the firm, its debt and its equity.</p>",
            "solution": "<p><b>Step 1 &mdash; the unlevered cost of capital, which does not change.</b> Leverage changes how the firm's business risk is split between claims, not the risk of the assets themselves. Compute r<sub>U</sub> from the ORIGINAL capital structure, as the pre-tax WACC:</p><p>r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = (125/150)(7%) + (25/150)(4.2%) = 0.0583333 + 0.0070000 = <b>0.0653333 (6.5333%)</b></p><p>The key reports <b>6.53%</b>. Note that no tax term appears: r<sub>U</sub> is a pre-tax weighted average.</p><p><i>Cross-check through the betas.</i> The debt beta follows from the CAPM in reverse: &beta;<sub>D</sub> = (0.042 &minus; 0.04)/0.06 = 0.0333. Then</p><p>&beta;<sub>U</sub> = (E/V)&beta;<sub>E</sub> + (D/V)&beta;<sub>D</sub> = (5/6)(0.5) + (1/6)(0.0333) = 0.416667 + 0.005556 = <b>0.4222</b><br>r<sub>U</sub> = 0.04 + 0.4222(0.06) = <b>0.0653333</b> &#10003;</p><p><b>Step 2 &mdash; relever to the new D/E, using MM Proposition II.</b></p><p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>) = 6.5333% + 0.5(6.5333% &minus; 4.5%)<br>= 6.5333% + 0.5(2.0333%) = 6.5333% + 1.0167% = <b>0.0755000 (7.5500%)</b></p><p>The key reports <b>7.55%</b>.</p><p><b>Step 3 &mdash; the new WACC.</b> With D/E = 0.5 the weights are E/V = 1/1.5 = 2/3 and D/V = 0.5/1.5 = 1/3:</p><p>r<sub>wacc</sub> = [1/(D/E + 1)]r<sub>E</sub> + [(D/E)/(D/E + 1)]r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>)<br>= (1/1.5)(7.55%) + (0.5/1.5)(4.5%)(1 &minus; 25%)<br>= 0.0503333 + 0.0112500 = <b>0.0615833 (6.1583%)</b></p><p>The key reports <b>6.16%</b>. <i>Cross-check with the shortcut</i> r<sub>wacc</sub> = r<sub>U</sub> &minus; d&middot;&tau;<sub>c</sub>&middot;r<sub>D</sub> with d = D/V = 1/3: 0.0653333 &minus; (1/3)(0.25)(0.045) = 0.0653333 &minus; 0.0037500 = <b>0.0615833</b> &#10003;</p><p><b>Step 4 &mdash; the new firm value.</b> Free cash flow and growth are unchanged, so only the discount rate moves:</p><p>r<sub>wacc</sub> &minus; g = 0.0615833 &minus; 0.0235833 = <b>0.0380000</b> exactly<br>V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> &minus; g) = 6.0 / 0.0380 = <b>$157.8947 billion</b></p><p>The key reports <b>157.9</b>. The firm gains 157.89 &minus; 150 = $7.89 billion, which is the capitalised value of the larger interest tax shield.</p><p><b>Step 5 &mdash; split it between debt and equity.</b> To determine the new equity value we need the new target ratio, which implies E = 2D:</p><p>V<sup>L</sup> = D + E = D + 2D = 3D<br>D = (1/3)V<sup>L</sup> = (1/3)(157.8947) = <b>$52.6316 billion</b><br>E = (2/3)V<sup>L</sup> = (2/3)(157.8947) = <b>$105.2632 billion</b></p><p>The key reports 52.63 and 105.26. Check: 52.6316/105.2632 = 0.5000 &#10003;</p><p><b>Consistency check &mdash; the weighted beta.</b> At the new structure, &beta;<sub>D</sub> = (0.045 &minus; 0.04)/0.06 = 0.0833 and &beta;<sub>E</sub> = (0.0755 &minus; 0.04)/0.06 = 0.5917. Weighting them:</p><p>(2/3)(0.5917) + (1/3)(0.0833) = 0.394444 + 0.027778 = <b>0.4222</b> = &beta;<sub>U</sub> &#10003;</p><p>Exactly the unlevered beta from Step 1 (19/45 in exact arithmetic). The relevering has moved risk from the assets to the equity holders without creating or destroying any, which is what MM II says it must do. Write this check down: it is one of the five the examiner performs.</p>",
            "criteria": [
              "Computes r_U from the ORIGINAL structure as the pre-tax WACC: 6.5333%. Applying (1 − τ) to r_D here is wrong — r_U is a pre-tax average.",
              "Course convention: β_U is weighted WITHOUT taxes, β_U = [E/(E+D)]β_E + [D/(E+D)]β_D. Never the (1 − τ) version.",
              "Relevers with MM II using the NEW D/E of 0.5 and the NEW r_D of 4.5%: r_E = 7.55%. Using the old 4.2% here is a common slip.",
              "New WACC = 6.1583%, with weights 2/3 and 1/3 — not 0.5 and 0.5.",
              "Keeps g at 2.3583% from part (c): the question says cash flows and growth are unaffected, so only the discount rate moves. Recomputing g at the new WACC is circular.",
              "V^L = 6/0.038 = 157.89, then D = V/3 = 52.63 and E = 2V/3 = 105.26. Splitting with the OLD ratio is the error the key guards against by spelling out 'we need to use the new target ratio'.",
              "Closing check that the weighted new betas return β_U = 0.4222. One line, and it is a check the examiner performs."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Problem 3 — Credit risk and CDS",
        "points": 28,
        "topic": "Risky debt, risk-neutral default probability, credit default swaps",
        "chapters": [
          5,
          22,
          24
        ],
        "body": "<p><i>[Reconstructed from the solution key &mdash; the Spring 2024 question paper is not in the archive. Every number below is exactly as the key states it; the wording is not the examiner's. The key notes: &laquo;the setting of this exercise is identical to the setting in the CDS exercise covered in the lecture &lt;Options II&gt;&raquo;.]</i></p><p>Consider two one-year zero-coupon bonds, each with a face value of $100.</p><p><b>Bond 1</b> is default-free and has a yield to maturity of 5%. <b>Bond 2</b> is issued by a risky firm: with probability 90% it repays the full $100, and with probability 10% the issuer defaults and pays only $80. Bond 2's promised yield to maturity is 10%.</p><p>The one-year risk-free rate is 5%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 10,
            "body": "<p>Compute the price and the expected return of each bond.</p>",
            "solution": "<p>A bond's price is its promised payment discounted at its yield to maturity; its expected return is built from the payments it is actually expected to make.</p><p><b>Bond 1.</b></p><p>Price = 100/1.05 = <b>95.238</b><br>Return = [100 &minus; 95.238]/95.238 = <b>5%</b></p><p>Bond 1 is default-free, so its promised yield, its expected return and the risk-free rate are all the same number. That is the whole content of the first line, and it is worth saying explicitly &mdash; it is the benchmark the second bond is measured against.</p><p><b>Bond 2.</b></p><p>Price = [100]/1.1 = <b>90.909</b></p><p>The expected payoff is not 100. It is the probability-weighted payment:</p><p>E[payoff] = 0.9 &times; 100 + 0.1 &times; 80 = 90 + 8 = <b>98</b></p><p>Return = [0.9 &times; 100 + 0.1 &times; 80 &minus; 90.909]/90.909 = 7.0909/90.909 = <b>7.8%</b></p><p><b>The distinction the exercise is testing.</b> Bond 2's promised yield is 10%, but its expected return is only 7.8%. The 2.2 percentage-point gap is the expected loss from default: 10% probability &times; a $20 shortfall = $2 of expected loss on a price of $90.909, which is 2.2% of the price. The credit spread over the risk-free rate is 10% &minus; 5% = 5 percentage points, of which 2.2 points compensate for expected default losses and the remaining 2.8 points are the risk premium the market demands for bearing default risk. Never report a promised yield as an expected return.</p>",
            "criteria": [
              "Bond 1: price 95.238, expected return 5%, and the observation that for a default-free bond promised yield = expected return = r_f.",
              "Bond 2: price = 100/1.1 = 90.909 — the PROMISED payment discounted at the PROMISED yield.",
              "Expected payoff of Bond 2 = 0.9(100) + 0.1(80) = 98, not 100.",
              "Expected return of Bond 2 = (98 − 90.909)/90.909 = 7.8%, clearly distinguished from the 10% promised yield.",
              "Explaining the gap — expected loss plus a default risk premium, and the 5-point credit spread it decomposes — is what the key is fishing for. r_D = y − p·L in the notation of the course."
            ]
          },
          {
            "label": "b",
            "points": 10,
            "body": "<p>Back out the risk-neutral probability of default implied by the price of Bond 2, and use it to value a credit default swap that pays $1 if the issuer of Bond 2 defaults.</p>",
            "solution": "<p><b>Step 1 &mdash; the logic.</b> The risk-neutral probability of default can be backed out from the price of Bond 2. The expected payoff of the bond, computed under risk-neutral probabilities and discounted at the risk-free rate, should equal the bond price today (which was derived in part (a)). Under risk-neutral probabilities every asset earns the risk-free rate, so the whole risk premium is absorbed into the probability rather than into the discount rate.</p><p><b>Step 2 &mdash; solve for p.</b> Let p denote the risk-neutral probability of default. Then p must satisfy</p><p>[p &times; 80 + (1 &minus; p) &times; 100]/1.05 = 90.909<br>&rArr; &minus;20p + 100 = 90.909 &times; 1.05 = 95.4545<br>&rArr; 20p = 100 &minus; 95.4545 = 4.5455<br>&rArr; p = 4.5455/20 = <b>0.2273</b></p><p>Exactly, p = 5/22 = 0.227273. The key writes 0.2272.</p><p><b>Step 3 &mdash; note how far this is from the real probability.</b> The true probability of default is 10%; the risk-neutral probability is 22.7%, more than twice as large. That is not a contradiction &mdash; it is the point. Default happens in bad states of the world, so investors demand compensation for it, and in the risk-neutral world that compensation is expressed by inflating the probability of the bad state rather than by raising the discount rate. If you use the true 10% probability here, you will underprice the CDS by more than half.</p><p><b>Step 4 &mdash; value the CDS.</b> The value of one CDS contract is its expected payoff, computed under risk-neutral probabilities, discounted at the risk-free rate:</p><p>CDS = [p &times; 1 + (1 &minus; p) &times; 0]/1.05 = 0.2273/1.05 = <b>0.2164</b></p><p>Exactly, 50/231 = 0.216450 per $1 of protection.</p>",
            "criteria": [
              "States the pricing condition in words before writing it: expected payoff under RISK-NEUTRAL probabilities, discounted at the RISK-FREE rate, equals the observed market price.",
              "Sets up [p(80) + (1−p)(100)]/1.05 = 90.909 and solves p = 0.2273.",
              "Uses the risk-free 5% in the discounting, not the bond's 10% promised yield.",
              "CDS = p/1.05 = 0.2164 per $1 of protection.",
              "Uses the risk-neutral 22.7%, not the true 10%, to value the CDS. Mixing real probabilities with risk-free discounting is the single most-punished error in this topic, and it more than halves the answer.",
              "Commenting on why p_risk-neutral (22.7%) exceeds p_true (10%) — default lands in bad states, so it carries a risk premium — earns the mechanism credit."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>Value the put option implicit in Bond 2 &mdash; the option to default, which pays the $20 shortfall in the default state &mdash; in two different ways.</p>",
            "solution": "<p>Risky debt can be decomposed as</p><p>Risky debt = Risk-free debt &minus; Put option on the firm's assets</p><p>The put pays exactly the shortfall the lender suffers: $100 &minus; $80 = $20 in the default state, and nothing otherwise. That payoff is 20 times the payoff of the CDS priced in part (b), which pays $1 in the same state and nothing otherwise.</p><p><b>Route 1 &mdash; from the CDS.</b></p><p>Value of Put = 20 &times; CDS = 20 &times; 0.216450 = <b>4.329</b></p><p><b>Route 2 &mdash; from the two bond prices.</b> Rearranging the decomposition, Put = Risk-free debt &minus; Risky debt, and both of those are already priced in part (a):</p><p>Value of Put = Price Bond 1 &minus; Price Bond 2 = 95.238 &minus; 90.909 = <b>4.329</b></p><p><b>Consistency check.</b> The two routes agree to the last decimal &mdash; in exact arithmetic both are 1000/231 = 4.329004. &#10003; They must, and seeing why is the point of the part: the CDS and the price gap between the two bonds are two ways of quoting the same thing, the market's price of this issuer's default risk. A CDS is simply the put on the firm's assets, sold separately from the bond.</p><p><b>Reading the number.</b> $4.33 on a $95.24 default-free bond is the cost of the credit risk, about 4.5% of the safe bond's value. Equivalently, a lender who buys Bond 2 for $90.909 and simultaneously buys 20 CDS contracts for $4.329 has spent $95.238 and holds a portfolio that pays $100 with certainty &mdash; which is Bond 1. That is the no-arbitrage argument in one line, and it is the cleanest way to end the exercise.</p>",
            "criteria": [
              "Writes the decomposition explicitly: risky debt = risk-free debt − put, so put = Bond 1 − Bond 2.",
              "Route 1: recognises that the put's $20 payoff is 20 CDS contracts, so Put = 20 × 0.2164 = 4.329.",
              "Route 2: Put = 95.238 − 90.909 = 4.329.",
              "Both routes must be shown — the question asks for two — and the answer must state that they agree. This is one of the consistency checks the examiner looks for.",
              "Full marks for closing with the no-arbitrage reading: Bond 2 plus 20 CDS contracts costs 90.909 + 4.329 = 95.238 and pays $100 for certain, i.e. it replicates Bond 1."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Problem 4 — M&A",
        "points": 28,
        "topic": "Coinsurance, diversification and value transfer in a merger",
        "chapters": [
          24,
          26
        ],
        "body": "<p><i>[Reconstructed from the solution key &mdash; the Spring 2024 question paper is not in the archive. Every number below is exactly as the key states it; the wording is not the examiner's. The key notes: &laquo;this entire exercise is identical to an exercise that we covered in the M&amp;A lecture, just with different numbers&raquo;.]</i></p><p>Firm A and firm B each have debt outstanding that matures in one year. There are two equally likely states of the economy next year, and the value of each firm's assets in each state is:</p><table class=\"data\"><tr><th>State</th><th>Probability</th><th>Value of firm A</th><th>Value of firm B</th></tr><tr><td>1</td><td class=\"n\">50%</td><td class=\"n\">$40M</td><td class=\"n\">$5M</td></tr><tr><td>2</td><td class=\"n\">50%</td><td class=\"n\">$10M</td><td class=\"n\">$20M</td></tr></table><p>Firm A's debt has a face value of $15 million and firm B's debt has a face value of $7.5 million. Both mature in one year, investors are risk neutral, and the risk-free rate is zero, so all values below are simple expected values.</p>",
        "parts": [
          {
            "label": "a",
            "points": 8,
            "body": "<p>Compute the value of the assets, the debt and the equity of firms A and B separately.</p>",
            "solution": "<p>Work state by state. Debt receives min(V, F) and equity receives max(V &minus; F, 0); with two equally likely states each value is the simple average.</p><p><b>Firm A</b> (face value of debt F<sub>A</sub> = 15):</p><table class=\"data\"><tr><th>State</th><th>Firm value</th><th>Debt: min(V, 15)</th><th>Equity: max(V &minus; 15, 0)</th></tr><tr><td>1</td><td class=\"n\">40</td><td class=\"n\">15</td><td class=\"n\">25</td></tr><tr><td>2</td><td class=\"n\">10</td><td class=\"n\">10</td><td class=\"n\">0</td></tr></table><p>Firm A: &frac12; &times; 40 + &frac12; &times; 10 = <b>25</b><br>Debt A: &frac12; &times; 15 + &frac12; &times; 10 = <b>12.5</b><br>Equity A: &frac12; &times; 25 + &frac12; &times; 0 = <b>12.5</b></p><p>Firm A's debt is risky: in state 2 the firm is worth only 10 against a promised 15, so the lenders take a $5 haircut and the shareholders are wiped out.</p><p><b>Firm B</b> (face value of debt F<sub>B</sub> = 7.5):</p><table class=\"data\"><tr><th>State</th><th>Firm value</th><th>Debt: min(V, 7.5)</th><th>Equity: max(V &minus; 7.5, 0)</th></tr><tr><td>1</td><td class=\"n\">5</td><td class=\"n\">5</td><td class=\"n\">0</td></tr><tr><td>2</td><td class=\"n\">20</td><td class=\"n\">7.5</td><td class=\"n\">12.5</td></tr></table><p>Firm B: &frac12; &times; 5 + &frac12; &times; 20 = <b>12.5</b><br>Debt B: &frac12; &times; 5 + &frac12; &times; 7.5 = <b>6.25</b><br>Equity B: &frac12; &times; 0 + &frac12; &times; 12.5 = <b>6.25</b></p><p><b>Check</b>: 12.5 + 12.5 = 25 &#10003; and 6.25 + 6.25 = 12.5 &#10003; &mdash; the two claims exhaust the firm in each case.</p><p><b>The feature that drives the whole exercise:</b> the two firms do badly in <i>opposite</i> states. A is worth 40 when B is worth 5, and 10 when B is worth 20. Their cash flows are perfectly negatively correlated. Spot this on the first reading &mdash; everything in parts (b) to (d) follows from it.</p>",
            "criteria": [
              "Values the claims state by state with debt = min(V, F) and equity = max(V − F, 0), rather than trying to value them from expected firm value directly.",
              "Firm A = 25, Debt A = 12.5, Equity A = 12.5. In state 2 the debt receives only 10, not 15 — treating debt as always paying face value is the error that collapses the exercise.",
              "Firm B = 12.5, Debt B = 6.25, Equity B = 6.25. Here it is state 1 in which the debt is impaired.",
              "Checks that debt + equity = firm value in each case.",
              "Noticing that the two firms' values move in opposite directions is not asked for here but sets up parts (b)–(d)."
            ]
          },
          {
            "label": "b",
            "points": 6,
            "body": "<p>Suppose firms A and B merge. Compute the value of the assets, the debt and the equity of the combined firm AB.</p>",
            "solution": "<p>After the merger the assets are pooled and both sets of creditors have a claim on the combined pool. The combined face value is 15 + 7.5 = 22.5.</p><table class=\"data\"><tr><th>State</th><th>A</th><th>B</th><th>Combined AB</th><th>Debt: min(V, 22.5)</th><th>Equity</th></tr><tr><td>1</td><td class=\"n\">40</td><td class=\"n\">5</td><td class=\"n\">45</td><td class=\"n\">22.5</td><td class=\"n\">22.5</td></tr><tr><td>2</td><td class=\"n\">10</td><td class=\"n\">20</td><td class=\"n\">30</td><td class=\"n\">22.5</td><td class=\"n\">7.5</td></tr></table><p>Firm AB: &frac12; &times; 45 + &frac12; &times; 30 = <b>37.5</b><br>Debt AB: &frac12; &times; 22.5 + &frac12; &times; 22.5 = <b>22.5</b><br>Equity AB: &frac12; &times; 22.5 + &frac12; &times; 7.5 = <b>15</b></p><p><b>First check &mdash; no value is created.</b> 37.5 = 25 + 12.5, the sum of the two stand-alone firm values. The merger produces no synergies: the same assets in the same states, just held in one legal entity.</p><p><b>Second check &mdash; the debt has become risk free.</b> The combined firm is worth at least 30 in every state, comfortably above the 22.5 promised, so the creditors are paid in full whatever happens. Their claim is worth its full face value of 22.5, up from 12.5 + 6.25 = 18.75. That is a gain of 3.75, and since the firm as a whole is worth the same 37.5, the 3.75 has to have come out of someone's pocket. Part (c) identifies whose.</p><p><b>Third check</b>: 22.5 + 15 = 37.5 &#10003;</p>",
            "criteria": [
              "Adds the state values before valuing the claims: 40 + 5 = 45 and 10 + 20 = 30. Averaging first and then applying min/max is wrong and loses the entire point of the exercise.",
              "Combined face value = 15 + 7.5 = 22.5.",
              "Firm AB = 37.5, Debt AB = 22.5, Equity AB = 15.",
              "Notes that 37.5 = 25 + 12.5, so no value is created — the merger is a pure repackaging.",
              "Notes that the combined debt is now RISK FREE (min(30, 22.5) = 22.5 in the worst state) and therefore worth full face value. This observation is the exercise."
            ]
          },
          {
            "label": "c",
            "points": 10,
            "body": "<p>Suppose the shareholders of firm A receive two thirds of the equity of the combined firm and the shareholders of firm B receive one third, in proportion to their pre-merger equity values. Compute the gain or loss to each of the four groups of claim holders, and check that the gains and the losses cancel. Would the shareholders undertake the acquisition?</p>",
            "solution": "<p><b>Step 1 &mdash; check the ownership split is fair on its own terms.</b> Equity A is 12.5 and Equity B is 6.25, a ratio of exactly 2 : 1, so a two-thirds / one-third split of the combined equity is the split that treats both sides symmetrically. There is no bargaining advantage hidden in the exchange ratio &mdash; whatever happens next is caused by the merger itself, not by the terms.</p><p><b>Step 2 &mdash; the four claims, before and after.</b></p><p>Shareholders firm A: 2/3 &times; 15 = <b>10</b> &lt; 12.5<br>Shareholders firm B: 1/3 &times; 15 = <b>5</b> &lt; 6.25<br>Debt holders firm A: &frac12; &times; 15 + &frac12; &times; 15 = <b>15</b> &gt; 12.5<br>Debt holders firm B: &frac12; &times; 7.5 + &frac12; &times; 7.5 = <b>7.5</b> &gt; 6.25</p><table class=\"data\"><tr><th>Claim holder</th><th>Before</th><th>After</th><th>Change</th></tr><tr><td>Shareholders A</td><td class=\"n\">12.50</td><td class=\"n\">10.00</td><td class=\"n\">&minus;2.50</td></tr><tr><td>Shareholders B</td><td class=\"n\">6.25</td><td class=\"n\">5.00</td><td class=\"n\">&minus;1.25</td></tr><tr><td>Debt holders A</td><td class=\"n\">12.50</td><td class=\"n\">15.00</td><td class=\"n\">+2.50</td></tr><tr><td>Debt holders B</td><td class=\"n\">6.25</td><td class=\"n\">7.50</td><td class=\"n\">+1.25</td></tr><tr><td><b>Total</b></td><td class=\"n\"><b>37.50</b></td><td class=\"n\"><b>37.50</b></td><td class=\"n\"><b>0.00</b></td></tr></table><p><b>Step 3 &mdash; the consistency check.</b> The total gain to debt holders of 2.5 + 1.25 = <b>3.75</b> equals the sum of the losses to the shareholders of firms A and B, which equals 2.5 + 1.25 = <b>3.75</b>. &#10003;</p><p>The merger has zero NPV at the firm level, so the gains and losses must sum to zero &mdash; and they do, exactly. This is the check the examiner performs, and it is worth writing down: gain to creditors + gain to shareholders = the transaction's NPV, which here is nil.</p><p><b>Step 4 &mdash; the answer to the question.</b> <b>The shareholders would not want to undertake the acquisition.</b> Both sets of shareholders are worse off, by 2.5 and 1.25 respectively. No renegotiation of the exchange ratio fixes this: the ratio only decides how the shrunken $15 million of equity is divided between A's and B's shareholders, and $15 million is less than the $18.75 million they held between them beforehand. The only way to make the merger acceptable to shareholders would be genuine synergies worth at least 3.75, or a renegotiation with the creditors.</p>",
            "criteria": [
              "Verifies that the 2/3 : 1/3 split matches the pre-merger equity values of 12.5 and 6.25, so nothing turns on the exchange ratio.",
              "All four claims, before and after: shareholders A 12.5 → 10, shareholders B 6.25 → 5, debt A 12.5 → 15, debt B 6.25 → 7.5.",
              "The post-merger debt values are 15 and 7.5 IN BOTH STATES, because the combined debt is now risk free. Re-running min(V, F) firm by firm after the merger is the error.",
              "Runs the consistency check explicitly: total gain to creditors 3.75 = total loss to shareholders 3.75, and the two sum to the merger's NPV of zero. The examiner performs this check.",
              "Answers the question: NO, the shareholders would not undertake the acquisition.",
              "Adding that no exchange ratio can rescue the deal — the combined equity is simply smaller than the two equity claims it replaces — shows the mechanism has been understood rather than just computed."
            ]
          },
          {
            "label": "d",
            "points": 4,
            "body": "<p>Explain the effect at work.</p>",
            "solution": "<p>The diversification effect of a merger can benefit debt holders at the expense of shareholders. The merger would amount to a transfer of value from shareholders to debt holders. Without the merger, firm A does not guarantee the debt of firm B and firm B does not guarantee the debt of firm A. After the merger, debt holders can draw on the value of each firm or division. This mutual guarantee or <b>coinsurance effect</b> makes the debt less risky. The debt holders' gain is the shareholders' loss.</p><p><b>Why the option view makes it obvious.</b> Equity is a call option on the firm's assets, struck at the face value of the debt. Two separate firms give the shareholders two separate calls; the merged firm gives them one call on the sum of the assets. A portfolio of options is always worth at least as much as an option on the portfolio, because the separate options let you collect the upside in one firm while walking away from the other. Here A's shareholders were collecting 25 in state 1 while abandoning the firm in state 2; after the merger, state 1's surplus is used to make B's creditors whole instead. Merging destroys the separate limited-liability shields, and since total firm value is unchanged, whatever the option loses the debt gains.</p><p><b>The practical lesson.</b> Reducing risk through diversification is not a reason for shareholders to merge two firms &mdash; investors can diversify in their own portfolios far more cheaply, and at the firm level diversification simply hands value to the existing creditors. The effect is strongest exactly where it appears here: when both firms have risky debt and their cash flows are poorly correlated, which is precisely the case that looks most attractive if you reason about risk instead of about value.</p>",
            "criteria": [
              "Names it: the coinsurance effect (also acceptable: the diversification effect of a merger, or the mutual-guarantee effect). Naming the mechanism is what the key rewards.",
              "Explains the mechanism, in the key's own terms: before the merger neither firm guarantees the other's debt; after the merger creditors can draw on the assets of both divisions, so the debt becomes less risky.",
              "States the conclusion: it is a pure transfer, and the debt holders' gain is the shareholders' loss.",
              "Full marks for the option framing — equity is a call, and a portfolio of calls is worth more than a call on the portfolio, so merging destroys value for the option holders.",
              "Credit for the practical corollary: diversification per se is not a valid motive for a merger, because shareholders can diversify more cheaply themselves."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2023",
    "label": "Spring 2023",
    "date": "2023-06-06",
    "minutes": 180,
    "points": 180,
    "format": "10 multiple choice + 4 problems · calculator permitted",
    "note": "A complete question paper in the old format: 36 points of multiple choice followed by four 36-point problems, all drawn from the Berk & DeMarzo problem set. The paper is reproduced verbatim. NO official solution key exists for this sitting, so every solution below is worked from scratch; each figure has been computed twice, the second time along an independent route, and the standard consistency checks are carried out where the material allows. The paper itself does not state a point split within each problem — the per-part splits shown are a reasonable division of each problem's stated 36 points. Note the point budget: 180 points in 180 minutes, one point per minute, with the ten multiple-choice questions worth 3.6 points each.",
    "exercises": [
      {
        "n": 1,
        "title": "Multiple choice (MC 1–10)",
        "points": 36,
        "topic": "Mixed: MM, CAPM, beta, payout, WACC/APV, FTE, options, issuance",
        "chapters": [
          4,
          6,
          14,
          15,
          17,
          18,
          19,
          21
        ],
        "body": "<p>Multiple Choice Questions (36 Points): Your score for the following ten multiple-choice questions is fully determined by whether you identify the correct answer. You do NOT need to provide calculations or explanations.</p><p><i>Eight of the ten are pure recall &mdash; spot the false statement &mdash; and two require a short calculation. At 3.6 points each this section is worth as much as a whole problem, and it should take a fraction of the time. Do it first.</i></p>",
        "parts": [
          {
            "label": "1",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) Modigliani Miller Proposition 1 states that leverage can affect a firm's value even in a perfect capital market.</p><p>B) In the CAPM framework, we can evaluate the relationship between a security's risk and return more formally by computing the sensitivity of the security's return to the systematic risk of the economy.</p><p>C) Investors in a levered firm's equity require compensation in the form of a higher expected return for the increased risk, which results from leverage.</p><p>D) Leverage increases the risk of equity even when there is no risk that the firm will default.</p>",
            "solution": "<p><b>Answer: A.</b></p><p>MM Proposition I says the opposite of what A claims: in a perfect capital market the total value of a firm is <b>independent</b> of its capital structure. Leverage cannot affect firm value, because a change in financing only re-slices the same cash flows between debt holders and equity holders. The arbitrage argument is homemade leverage &mdash; if a levered firm traded at a premium, an investor could replicate its payoff by borrowing on his own account and buying the unlevered firm, and sell the difference.</p><p><b>Why the others are true.</b> B is simply the definition of beta as the sensitivity of a security's return to systematic risk. C and D are MM Proposition II: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>), so r<sub>E</sub> rises with leverage. D deserves a second look because it sounds wrong: even with completely risk-free debt, the equity holders' residual claim becomes more sensitive to swings in firm value, since a fixed interest payment is subtracted from a variable cash flow. Default risk and leverage risk are two different things, and D is about the second.</p>",
            "criteria": [
              "A is the false statement. MM I says value is INDEPENDENT of capital structure in a perfect market.",
              "Do not be drawn to D: leverage raises equity risk through the fixed claim ahead of it, whether or not default is possible. That statement is true.",
              "No explanation is required for the marks — the paper says so explicitly. Read, decide, move on."
            ]
          },
          {
            "label": "2",
            "points": 3.6,
            "body": "<p>Which of the following is NOT one of the conditions referred to as a perfect capital market?</p><p>A) There are no taxes, transaction costs, or issuance costs associated with security trading.</p><p>B) A firm's financing decisions do not change the cash flows generated by its investments, nor do they reveal new information about them.</p><p>C) All investors are risk neutral</p><p>D) Investors and firms can trade the same set of securities at competitive market prices equal to the present value of their future cash flows.</p>",
            "solution": "<p><b>Answer: C.</b></p><p>The three perfect-capital-market conditions are exactly A, B and D:</p><p>1. Investors and firms can trade the same set of securities at competitive market prices equal to the present value of their future cash flows (D).<br>2. There are no taxes, transaction costs or issuance costs associated with security trading (A).<br>3. A firm's financing decisions do not change the cash flows generated by its investments, nor do they reveal new information about them (B).</p><p><b>Risk neutrality is not among them and is not needed.</b> MM holds perfectly well in a world of risk-averse investors: the argument is an arbitrage argument, not a preference argument. Investors may demand any risk premium they like, so long as they price the same risk consistently whether it is packaged as levered equity or as a homemade levered position. Confusing &laquo;no arbitrage&raquo; with &laquo;no risk aversion&raquo; is the trap this question is built on.</p>",
            "criteria": [
              "C is the odd one out: risk neutrality is NOT a perfect-market condition.",
              "Know the three conditions cold — competitive prices equal to PV, no taxes or transaction/issuance costs, and financing that neither changes nor signals cash flows.",
              "Understand why risk neutrality is unnecessary: MM rests on an arbitrage argument, which works for any risk preferences."
            ]
          },
          {
            "label": "3",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) The asset beta measures the market risk of the firm's business activities, ignoring any additional risk due to leverage.</p><p>B) If the debt is risk-free, the debt beta is zero.</p><p>C) When a firm changes its leverage, the asset beta will remain unchanged.</p><p>D) When a firm changes its capital structure without changing its investments, its equity beta will remain unchanged. However, its asset beta will change to reflect the effect of the capital structure change on its risk.</p>",
            "solution": "<p><b>Answer: D.</b></p><p>D has the two betas exactly the wrong way round. The correct statement is: when a firm changes its capital structure without changing its investments, its <b>asset</b> beta remains unchanged &mdash; the business is the same business &mdash; while its <b>equity</b> beta changes to reflect the new leverage.</p><p>The identity behind it is the one on the formula sheet:</p><p>&beta;<sub>U</sub> = [E/(E + D)]&beta;<sub>E</sub> + [D/(E + D)]&beta;<sub>D</sub></p><p>&beta;<sub>U</sub> is a property of the assets. Moving the D/E ratio changes the weights, and &beta;<sub>E</sub> must move to keep the weighted average pinned at the same &beta;<sub>U</sub>. That is the whole unlever/relever routine, and it is the single most examined skill in the course.</p><p><b>Why the others are true.</b> A is the definition of the asset (unlevered) beta. B follows from the CAPM: risk-free debt earns r<sub>f</sub>, so its beta is zero. C is the correct half of the statement D gets wrong &mdash; note that C and D directly contradict each other, which is the fastest way to find the answer: one of them must be false, and A and B are unimpeachable.</p>",
            "criteria": [
              "D is false: it reverses the roles. Asset beta is unchanged by leverage; equity beta is not.",
              "Spot that C and D contradict each other — on a 'which is FALSE' question that immediately narrows the field to two.",
              "Be able to write β_U = [E/(E+D)]β_E + [D/(E+D)]β_D from memory; it is the identity the whole question rests on and it appears in almost every FIE402 paper."
            ]
          },
          {
            "label": "4",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) In a perfect capital market, buying and selling securities is a zero-NPV transaction, so it should not affect firm value.</p><p>B) In a perfect capital market, making positive-NPV investments will create value for the firm's investors, whereas investing excess cash in fairly priced financial securities neither creates nor destroys value.</p><p>C) In a perfect capital market, if a firm invests excess cash in financial securities, the firm's choice of payout versus retention is irrelevant.</p><p>D) In a perfect capital market, if a firm invests excess cash in financial securities, the firm's choice between the payout and the retention of excess cash affects firm value.</p>",
            "solution": "<p><b>Answer: D.</b></p><p>D contradicts C, and C is the correct statement: in a perfect capital market the payout-versus-retention decision is <b>irrelevant</b> to firm value. This is MM's payout irrelevance, the third of the MM irrelevance results after capital structure and dividends-versus-repurchases.</p><p>The argument is the same one as always. If the firm retains the cash and invests it in fairly priced securities, that investment is zero NPV by definition of &laquo;fairly priced&raquo;, so the firm is worth the same as before plus the cash. If instead it pays the cash out, shareholders can buy the identical securities themselves and end up in exactly the same position. Nothing the firm does with fairly priced assets can create value that shareholders could not create for themselves at the same price &mdash; the homemade-dividend argument.</p><p><b>Why the others are true.</b> A states the underlying principle: trading fairly priced securities is a zero-NPV transaction. B draws the correct distinction &mdash; real investments can have positive NPV, financial investments in efficient markets cannot. C is the conclusion.</p><p><i>In the real world, of course, the choice does matter: taxes on dividends versus capital gains, issuance costs, agency costs of free cash flow, and signalling all break the irrelevance. But every option here begins &laquo;In a perfect capital market&raquo;.</i></p>",
            "criteria": [
              "D is false: with perfect markets, payout versus retention is irrelevant.",
              "Again the fast route is that C and D are direct negations of each other.",
              "Name the mechanism if you are explaining it: investing in fairly priced securities is zero NPV, and shareholders can replicate any payout policy themselves (homemade dividends).",
              "Do not answer from real-world intuition about taxes and signalling — every option is explicitly conditioned on a perfect capital market."
            ]
          },
          {
            "label": "5",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) The APV method separately values the tax shield created through leverage.</p><p>B) The WACC method involves computing two separate valuations: the unlevered project and the interest tax shield.</p><p>C) We need to know the debt level to compute the APV, but with a constant debt-equity ratio we need to know the project's value to compute the debt level.</p><p>D) Implementing the APV approach with a constant debt-equity ratio requires solving for the project's debt and value simultaneously.</p>",
            "solution": "<p><b>Answer: B.</b></p><p>B describes the <b>APV</b> method, not the WACC method. The two-part valuation &mdash; unlevered project first, interest tax shield second &mdash; is precisely what APV does, and it is what A correctly says. The WACC method does the opposite: it folds the tax shield into the discount rate, through the (1 &minus; &tau;<sub>c</sub>) factor on the cost of debt, and then performs <b>one</b> valuation of the unlevered free cash flows.</p><p>V<sup>L</sup> = FCF discounted at r<sub>wacc</sub>&nbsp;&nbsp;&nbsp;versus&nbsp;&nbsp;&nbsp;V<sup>L</sup> = V<sup>U</sup> + PV(TS)</p><p>They give the same answer when applied consistently &mdash; that is the standard consistency check &mdash; but they get there differently, and the corollary is that you must never do both: discounting at the WACC and then adding a tax shield double counts.</p><p><b>Why C and D are true.</b> They describe the simultaneity problem of APV under a constant debt-equity ratio: the debt level is a fixed fraction of the levered value, D<sub>t</sub> = d&middot;V<sup>L</sup><sub>t</sub>, but the levered value depends on the tax shields generated by that debt. You either solve the two together or work backwards from the final period.</p>",
            "criteria": [
              "B is false: two separate valuations is APV's method, not the WACC's.",
              "State the difference cleanly if asked to explain: WACC puts the tax shield in the discount rate; APV puts it in a separate cash flow.",
              "This APV/WACC multiple choice question has appeared in every FIE402 paper that had a multiple-choice section. Learn the distinction cold.",
              "C and D are correct descriptions of the constant-D/E simultaneity problem, and are worth reading as a reminder rather than as distractors."
            ]
          },
          {
            "label": "6",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) In the flow-to-equity valuation method, the cash flows to equity holders are discounted using the weighted average cost of capital.</p><p>B) In the WACC and APV methods, we value a project based on its free cash flow, which is computed ignoring interest and debt payments.</p><p>C) In the flow-to-equity (FTE) valuation method, we explicitly calculate the free cash flow available to equity holders taking into account all payments to and from debt holders.</p><p>D) In the flow-to-equity valuation method, the cash flows to equity holders are discounted using the shareholders' expected return r<sub>E</sub>.</p>",
            "solution": "<p><b>Answer: A.</b></p><p>A and D make contradictory claims about the same thing, and D is the correct one. In the flow-to-equity method the cash flows being discounted are the <b>free cash flows to equity</b> &mdash; what is left after interest, principal repayments and new borrowing &mdash; so the appropriate discount rate is the <b>equity cost of capital r<sub>E</sub></b>, not the WACC.</p><p>The matching rule is worth stating once and never forgetting: <b>discount a cash flow at the rate demanded by whoever receives it.</b></p><table class=\"data\"><tr><th>Method</th><th>Cash flow</th><th>Discount rate</th><th>Result</th></tr><tr><td>WACC</td><td>Unlevered FCF</td><td>r<sub>wacc</sub></td><td>V<sup>L</sup></td></tr><tr><td>APV</td><td>Unlevered FCF, then TS</td><td>r<sub>U</sub>, then r<sub>U</sub> or r<sub>D</sub></td><td>V<sup>L</sup></td></tr><tr><td>FTE</td><td>FCFE (after all debt flows)</td><td>r<sub>E</sub></td><td>E</td></tr></table><p>Note the last column: FTE gives you the value of the <b>equity</b> directly, not the value of the firm. Discounting FCFE at the WACC, as A proposes, mixes a levered cash flow with a blended rate and double counts the benefit of debt.</p><p><b>Why B and C are true.</b> B states the defining feature of unlevered free cash flow &mdash; interest never enters FCF, because the financing side is handled in the discount rate or in a separate tax shield term. C is the definition of FCFE.</p>",
            "criteria": [
              "A is false: FTE discounts at r_E, not at the WACC.",
              "A and D are direct negations — the fast route to the answer.",
              "Know which cash flow pairs with which rate: unlevered FCF with r_wacc or r_U, FCFE with r_E.",
              "Remember that FTE returns the value of EQUITY, while WACC and APV return the value of the FIRM."
            ]
          },
          {
            "label": "7",
            "points": 3.6,
            "body": "<p>The holder of a put option has:</p><p>A) the obligation to sell a security for a given price.</p><p>B) the right to buy a security for a given price.</p><p>C) the right to sell a security for a given price.</p><p>D) the obligation to buy a security for a given price.</p>",
            "solution": "<p><b>Answer: C.</b></p><p>Two dimensions, four combinations, and the question tests both at once:</p><table class=\"data\"><tr><th></th><th>Call</th><th>Put</th></tr><tr><td><b>Holder (long)</b></td><td>Right to BUY at K</td><td><b>Right to SELL at K</b></td></tr><tr><td><b>Writer (short)</b></td><td>Obligation to SELL at K</td><td>Obligation to BUY at K</td></tr></table><p><b>Holder means right, never obligation.</b> That is what he paid the premium for, and it is why an option is worth at least zero: he simply does not exercise when exercise would hurt. B has the right side but the wrong instrument (that is a call). A and D both say &laquo;obligation&raquo;, which describes the writer, not the holder &mdash; A is the short call and D is the short put.</p><p>The payoff to the put holder is max(K &minus; S<sub>T</sub>, 0): he sells at K when the market price S<sub>T</sub> is lower, and walks away otherwise.</p>",
            "criteria": [
              "C. The holder of a put has the RIGHT to SELL at the strike.",
              "Distinguish holder from writer: the holder always has rights, the writer always has obligations.",
              "Be able to write the payoff: max(K − S_T, 0) for a put, max(S_T − K, 0) for a call.",
              "This is a free 3.6 points. If it takes more than fifteen seconds, drill the four-cell table before the exam."
            ]
          },
          {
            "label": "8",
            "points": 3.6,
            "body": "<p>Which of the following statements is FALSE?</p><p>A) The process of selling stock to the public for the very first time is called a seasoned equity offering (SEO).</p><p>B) A possible advantage of going public is that it provides liquidity to the firm's shareholders.</p><p>C) On average, IPOs appear to be underpriced.</p><p>D) A possible advantage of going public is that it gives the firm access to large amounts of capital through the public markets.</p>",
            "solution": "<p><b>Answer: A.</b></p><p>Selling stock to the public for the very first time is an <b>initial public offering (IPO)</b>. A seasoned equity offering is the opposite case: a company whose shares are <i>already</i> publicly traded issues additional shares.</p><p><b>Why the others are true.</b> B and D are the two standard advantages of going public: greater liquidity for the existing shareholders, who can now sell into a public market rather than negotiating a private sale, and access to a far deeper pool of capital. C is one of the most robust empirical regularities in corporate finance &mdash; IPOs are on average underpriced, with a first-day return of roughly 15 to 20% in US data. The usual explanation is the winner's curse: uninformed investors receive full allocations in the bad deals and rationed allocations in the good ones, so the offer price must be set low enough to leave them a profit on average, or they would not participate at all.</p>",
            "criteria": [
              "A is false: first-time sale to the public is an IPO, not an SEO.",
              "Know the direction of IPO underpricing — the price rises on the first day, which is a cost to the ISSUER, not a benefit.",
              "Be ready to name the winner's-curse explanation for underpricing; it is the standard follow-up in the long-form version of this topic."
            ]
          },
          {
            "label": "9",
            "points": 3.6,
            "body": "<p>Luther Industries is currently trading for $27 per share. The stock pays no dividends. A one-year European put option on Luther with a strike price of $30 is currently trading for $2.60. If the risk-free interest rate is 6% per year, then the price of a one-year European call option on Luther with a strike price of $30 will be closest to:</p><p>A) $7.10.</p><p>B) $1.30.</p><p>C) $2.60.</p><p>D) $1.95.</p>",
            "solution": "<p><b>Answer: B ($1.30).</b></p><p><b>Put-call parity</b>, for a non-dividend-paying stock with European options of the same strike and maturity:</p><p>C = P + S &minus; PV(K) = P + S &minus; K/(1 + r<sub>f</sub>)</p><p><b>Step 1 &mdash; the present value of the strike.</b></p><p>PV(K) = 30 / 1.06 = <b>28.3019</b></p><p><b>Step 2 &mdash; substitute.</b></p><p>C = 2.60 + 27 &minus; 28.3019 = <b>1.2981</b></p><p>Closest to <b>$1.30</b>.</p><p><b>Verification along the other direction.</b> Rearranging parity for the put and putting the call value back in: P = C &minus; S + PV(K) = 1.2981 &minus; 27 + 28.3019 = <b>2.60</b> &#10003; &mdash; exactly the quoted put price.</p><p><b>Sanity check without arithmetic.</b> The call is out of the money (S = 27 &lt; K = 30) so it must be cheap; the put is in the money by $3 of intrinsic value but only costs $2.60, which is possible for a European put because early exercise is not available and the strike is received only at maturity. A value near $1.30 is the only plausible option: $7.10 exceeds the share price minus nothing and is far too large for an out-of-the-money call, and $2.60 would mean the call and the put trade at the same price, which parity permits only when S = PV(K), i.e. around $28.30.</p><p><i>Watch the discounting convention. The exam works in annual compounding here, so PV(K) = K/(1 + r<sub>f</sub>). If you use continuous compounding, PV(K) = 30e<sup>&minus;0.06</sup> = 28.2528 and the call comes out at $1.35 &mdash; still closest to B, but do not invent a convention the question did not give you.</i></p>",
            "criteria": [
              "Writes put-call parity in the right direction: C = P + S − PV(K). Getting the sign of S or PV(K) wrong lands you on one of the distractors.",
              "PV(K) = 30/1.06 = 28.30, i.e. the strike is discounted, not used at face value. Using 30 gives C = −0.40, which is not offered — a warning sign you should heed rather than round away.",
              "C = 1.2981, closest to $1.30.",
              "Substituting back to recover the $2.60 put price takes one line and confirms the whole thing.",
              "No dividends are paid, so no dividend term is needed in parity. If the stock did pay dividends, the parity relation becomes C = P + S − PV(Div) − PV(K)."
            ]
          },
          {
            "label": "10",
            "points": 3.6,
            "body": "<p>Suppose that Nielson Motors stock is trading for $50 per share and that Nielson pays no dividends. What is the maximum possible price for a call option on Nielson Motors?</p><p>A) $0</p><p>B) $20</p><p>C) $50</p><p>D) infinite</p>",
            "solution": "<p><b>Answer: C ($50).</b></p><p><b>A call can never be worth more than the stock it is written on.</b> C &le; S, so the upper bound here is the current share price of $50.</p><p><b>The arbitrage argument.</b> Suppose a call traded for more than $50. You would write the call, collect more than $50, and buy the share for $50, pocketing the difference immediately. If the call is exercised against you, you deliver the share you already own and collect the strike on top; if it is not exercised, you keep the share. Either way you cannot lose, and you banked cash at the outset &mdash; a money machine, which cannot survive in an arbitrage-free market. Hence C &le; S.</p><p>Intuitively, the call gives you the right to acquire the share by paying the strike as well; owning the share outright gives you the same asset for free thereafter. You would never pay more for the conditional, cost-bearing version than for the thing itself.</p><p><b>Why the others fail.</b> A ($0) is the <i>lower</i> bound, not the maximum. B ($20) has no basis &mdash; no strike price is even given, and the bound C &le; S does not depend on the strike. D (infinite) confuses the call's <i>payoff</i>, which is unbounded above because the stock price is, with its <i>price</i> today, which is a present value and is bounded by S.</p><p><i>For completeness, the full set of bounds on an American call on a non-dividend-paying stock is max(S &minus; K, 0) &le; C &le; S, and for a European call the lower bound tightens to max(S &minus; PV(K), 0).</i></p>",
            "criteria": [
              "C. The maximum price of a call is the price of the underlying stock, $50.",
              "Be able to give the arbitrage argument in one sentence: writing the call and buying the share locks in a riskless profit if C > S.",
              "Do not answer 'infinite': the PAYOFF is unbounded, the PRICE is not.",
              "Note that the bound holds without knowing the strike price — which is why the question can be asked without giving one."
            ]
          }
        ]
      },
      {
        "n": 2,
        "title": "Problem 1 — Capital Structure",
        "points": 36,
        "topic": "Interest tax shield, permanent debt, recapitalisation",
        "chapters": [
          6,
          7,
          15
        ],
        "body": "<p>Kurz Manufacturing is currently an all-equity firm with 20 million shares outstanding and a stock price of $7.50 per share. Although investors currently expect Kurz to remain an all-equity firm, Kurz plans to announce that it will borrow $50 million and use the funds to repurchase shares. Kurz will pay interest only on this debt; the debt is permanent and Kurz has no further plans to increase or decrease the amount of debt. Kurz is subject to a 25% corporate tax rate.</p>",
        "parts": [
          {
            "label": "a",
            "points": 5,
            "body": "<p>What is the market value of Kurz's existing assets before the announcement?</p>",
            "solution": "<p>Before the announcement Kurz is all equity, so the market value of its assets is simply the market value of its shares:</p><p>V<sup>U</sup> = 20 million shares &times; $7.50 = <b>$150 million</b></p><p>Nothing else belongs on this line. Investors currently expect Kurz to remain all-equity financed, so the $7.50 price contains no anticipation of the tax shield &mdash; that is exactly why the paper says so. This $150 million is the unlevered value of the firm and the benchmark every later part is measured against.</p>",
            "criteria": [
              "V^U = 20 × 7.50 = $150 million.",
              "States that this is the UNLEVERED value, and that it contains no tax shield because investors do not yet expect the debt issue. The problem's clause 'Although investors currently expect Kurz to remain an all-equity firm' is there to be used.",
              "One line, one calculation. Do not overthink a five-point opener."
            ]
          },
          {
            "label": "b",
            "points": 7,
            "body": "<p>What is the market value of Kurz's assets (including any tax shields) just after the debt is issued, but before the shares are repurchased?</p>",
            "solution": "<p>At this intermediate moment the firm holds three things: the original operating assets, the $50 million of borrowed cash it has not yet spent, and the newly created tax shield.</p><p><b>The tax shield.</b> The debt is permanent and interest-only, so the interest tax shield is a perpetuity and its present value collapses to the familiar constant:</p><p>PV(interest tax shield) = &tau;<sub>c</sub> &times; D = 0.25 &times; $50M = <b>$12.5 million</b></p><p>(Why the discount rate drops out: the annual shield is &tau;<sub>c</sub>&middot;r<sub>D</sub>&middot;D, a perpetuity discounted at r<sub>D</sub> since the debt level is fixed and known, giving &tau;<sub>c</sub>&middot;r<sub>D</sub>&middot;D / r<sub>D</sub> = &tau;<sub>c</sub>&middot;D. This is the permanent-debt case, and it is the only case in which the tax shield can be written down without an interest rate.)</p><p><b>The total.</b></p><table class=\"data\"><tr><th>Asset</th><th>Value</th></tr><tr><td>Existing operating assets (part a)</td><td class=\"n\">$150.0M</td></tr><tr><td>Cash raised from the debt issue</td><td class=\"n\">$50.0M</td></tr><tr><td>PV of the interest tax shield, &tau;<sub>c</sub>D</td><td class=\"n\">$12.5M</td></tr><tr><td><b>Total assets</b></td><td class=\"n\"><b>$212.5M</b></td></tr></table><p><b>$212.5 million.</b> Against this sit $50 million of debt and $162.5 million of equity.</p><p>Note that the announcement itself created $12.5 million of value out of nothing that shows up in the accounts &mdash; it is the capitalised value of a stream of tax deductions the government will now allow. That $12.5 million accrues to the shareholders, which is what part (c) makes concrete.</p>",
            "criteria": [
              "PV(TS) = τ_c × D = 0.25 × 50 = $12.5M, using the permanent-debt formula. Discounting interest shields year by year is unnecessary here and invites arithmetic errors.",
              "The $50M of cash is still ON the balance sheet at this moment and must be included: total = 150 + 50 + 12.5 = $212.5M. Omitting the cash and answering $162.5M is the most common error in this part, and it is a timing error rather than a formula error.",
              "The question says 'including any tax shields' — the phrase is a prompt, and an answer that leaves the tax shield out is answering a different question.",
              "Naming the mechanism: the tax shield is created the moment the debt is credibly announced, not when the interest is actually paid."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>What is Kurz's share price just before the share repurchase? How many shares will Kurz repurchase?</p>",
            "solution": "<p><b>Step 1 &mdash; equity value at this moment.</b> Assets are $212.5M and the new debt of $50M ranks ahead of the shareholders:</p><p>E = 212.5 &minus; 50 = <b>$162.5 million</b></p><p><b>Step 2 &mdash; the share price.</b> No shares have been bought back yet, so all 20 million are still outstanding:</p><p>P = $162.5M / 20M shares = <b>$8.125 per share</b></p><p><b>Step 3 &mdash; how many shares are repurchased.</b> The $50 million of cash is used to buy shares at the prevailing market price:</p><p>Shares repurchased = $50M / $8.125 = <b>6.1538 million shares</b></p><p>Exactly 80/13 = 6.153846 million, leaving 20 &minus; 6.1538 = <b>13.8462 million shares</b> outstanding.</p><p><b>Independent check on the price.</b> The only thing that changed for the shareholders is that a $12.5 million tax shield appeared, spread over the 20 million shares that existed when the news broke:</p><p>P = 7.50 + 12.5/20 = 7.50 + 0.625 = <b>$8.125</b> &#10003;</p><p><b>The timing point, which is the whole exercise.</b> The share price jumps on the <i>announcement</i>, from $7.50 to $8.125, because that is when the market learns the tax shield exists. By the time the repurchase happens the good news is already in the price, so the buyback itself is a fair-value transaction: the firm hands over $50 million of cash and receives $50 million of shares. Existing shareholders capture the entire $12.5 million gain simply by holding the stock through the announcement, whether or not they tender.</p>",
            "criteria": [
              "Equity before the repurchase = 212.5 − 50 = $162.5M, and the price = 162.5/20 = $8.125 using the ORIGINAL 20 million share count.",
              "Shares repurchased = 50/8.125 = 6.1538 million. Dividing by the pre-announcement $7.50 (giving 6.667 million) is the error the question is designed to catch — it assumes shareholders sell before the good news is priced in.",
              "States that the price rise from $7.50 to $8.125 happens at the ANNOUNCEMENT and equals τ_c·D per original share, 12.5/20 = $0.625.",
              "The cross-check P = 7.50 + τ_cD/N is one line and confirms the whole chain.",
              "Full marks include the observation that the repurchase itself is a zero-NPV transaction at the post-announcement price, so it does not matter whether a given shareholder tenders."
            ]
          },
          {
            "label": "d",
            "points": 8,
            "body": "<p>What are Kurz's market value balance sheet and share price after the share repurchase?</p>",
            "solution": "<p>The $50 million of cash has now left the firm, and with it 6.1538 million shares.</p><table class=\"data\"><tr><th>Assets</th><th>Value</th><th>Liabilities and equity</th><th>Value</th></tr><tr><td>Operating assets</td><td class=\"n\">$150.0M</td><td>Debt</td><td class=\"n\">$50.0M</td></tr><tr><td>Cash</td><td class=\"n\">$0.0M</td><td>Equity</td><td class=\"n\">$112.5M</td></tr><tr><td>PV(interest tax shield)</td><td class=\"n\">$12.5M</td><td></td><td></td></tr><tr><td><b>Total</b></td><td class=\"n\"><b>$162.5M</b></td><td><b>Total</b></td><td class=\"n\"><b>$162.5M</b></td></tr></table><p><b>The share price.</b> 20 &minus; 6.1538 = 13.8462 million shares remain, against $112.5 million of equity:</p><p>P = $112.5M / 13.8462M = <b>$8.125 per share</b></p><p>Exactly: 112.5 / (180/13) = $8.125.</p><p><b>Consistency check &mdash; the price must not move.</b> It is <b>$8.125 both before and after the repurchase</b>, and that is the result to state out loud. The buyback exchanged $50 million of cash for $50 million of shares at the market price, a zero-NPV transaction, so it cannot move the price. If your answer shows the price changing at the repurchase, you have made an error somewhere upstream.</p><p><b>Second check &mdash; follow the money.</b> The original shareholders as a group ended up with 6.1538M &times; $8.125 = $50 million in cash plus 13.8462M &times; $8.125 = $112.5 million in shares, a total of <b>$162.5 million</b>. Before the announcement they held $150 million. The $12.5 million difference is exactly &tau;<sub>c</sub>D. &#10003; The entire tax shield went to the shareholders, and none of it to the new debt holders, who lent $50 million and hold a claim worth $50 million.</p><p><b>The summary the examiner wants:</b> V<sup>L</sup> = V<sup>U</sup> + &tau;<sub>c</sub>D = 150 + 12.5 = $162.5 million, split $50 million debt and $112.5 million equity, at an unchanged price of $8.125.</p>",
            "criteria": [
              "Balance sheet after: operating assets 150 + tax shield 12.5 = $162.5M total, financed by $50M debt and $112.5M equity. Cash is now zero.",
              "Share count is 13.8462 million and the price is 112.5/13.8462 = $8.125.",
              "States explicitly that the price is UNCHANGED by the repurchase, and why: a buyback at the market price is a zero-NPV transaction.",
              "The check that the original shareholders end with $50M cash + $112.5M shares = $162.5M = 150 + τ_cD is the cleanest way to close, and it shows where the tax shield ended up.",
              "Recognises the whole exercise as V^L = V^U + τ_c·D applied step by step through the transaction."
            ]
          },
          {
            "label": "e",
            "points": 8,
            "body": "<p>How would your answers to the above questions b), c), and d) change if the government abolished the tax deductibility of interest payments and Kurz would thus operate in a perfect capital market?</p>",
            "solution": "<p>Removing the interest deduction removes the only friction in the problem. With no taxes, no transaction costs and no information effects, <b>Modigliani-Miller Proposition I applies</b>: the firm's value is independent of its capital structure, and the recapitalisation becomes a purely financial transaction that creates no value at all. Set &tau;<sub>c</sub>D = 0 and everything follows.</p><p><b>(b) revisited.</b></p><p>Assets = 150 (operating) + 50 (cash) + <b>0</b> (no tax shield) = <b>$200 million</b>, down from $212.5M.</p><p><b>(c) revisited.</b></p><p>E = 200 &minus; 50 = $150 million, over 20 million shares:</p><p>P = 150/20 = <b>$7.50 per share &mdash; unchanged</b></p><p>There is no announcement effect at all, because there is no longer any news worth pricing. Shares repurchased = $50M / $7.50 = <b>6.6667 million</b>, leaving 13.3333 million outstanding.</p><p><b>(d) revisited.</b></p><table class=\"data\"><tr><th>Assets</th><th>Value</th><th>Liabilities and equity</th><th>Value</th></tr><tr><td>Operating assets</td><td class=\"n\">$150.0M</td><td>Debt</td><td class=\"n\">$50.0M</td></tr><tr><td>Cash</td><td class=\"n\">$0.0M</td><td>Equity</td><td class=\"n\">$100.0M</td></tr><tr><td><b>Total</b></td><td class=\"n\"><b>$150.0M</b></td><td><b>Total</b></td><td class=\"n\"><b>$150.0M</b></td></tr></table><p>P = $100M / 13.3333M = <b>$7.50 per share</b> &#10003;</p><p><b>Side by side.</b></p><table class=\"data\"><tr><th></th><th>With &tau;<sub>c</sub> = 25%</th><th>Perfect market</th></tr><tr><td>Assets after issue, before repurchase (b)</td><td class=\"n\">$212.5M</td><td class=\"n\">$200.0M</td></tr><tr><td>Share price before repurchase (c)</td><td class=\"n\">$8.125</td><td class=\"n\">$7.50</td></tr><tr><td>Shares repurchased (c)</td><td class=\"n\">6.1538M</td><td class=\"n\">6.6667M</td></tr><tr><td>Firm value after (d)</td><td class=\"n\">$162.5M</td><td class=\"n\">$150.0M</td></tr><tr><td>Equity after (d)</td><td class=\"n\">$112.5M</td><td class=\"n\">$100.0M</td></tr><tr><td>Share price after (d)</td><td class=\"n\">$8.125</td><td class=\"n\">$7.50</td></tr></table><p><b>The lesson.</b> The share price is constant at $7.50 throughout the perfect-market version &mdash; at announcement, before the repurchase and after it. Every dollar of the $12.5 million difference between the two columns is the tax shield, and nothing else. Leverage in this problem is valuable for exactly one reason, and when that reason is removed the recapitalisation becomes an elaborate way of changing the number of shares outstanding without changing what anyone owns.</p><p>Note also that the firm repurchases <i>more</i> shares in the perfect market (6.6667M against 6.1538M) because it buys them at the lower, unenhanced price of $7.50. Fewer shares survive, but each is worth less, and the two effects cancel exactly.</p>",
            "criteria": [
              "Names MM Proposition I and states the conclusion first: with no taxes the recapitalisation creates no value, so firm value and share price are unchanged throughout.",
              "b) becomes $200M (150 operating + 50 cash, no tax shield).",
              "c) price stays at $7.50 with NO announcement effect, and 50/7.50 = 6.6667 million shares are repurchased.",
              "d) firm value $150M, equity $100M over 13.3333M shares, price $7.50.",
              "The answer must be comparative — the question says 'how would your answers change', so it is the DIFFERENCE from parts b), c) and d) that is graded, not a fresh set of numbers with no reference back.",
              "Full marks for identifying the $12.5M gap as exactly τ_c·D, and for noting that more shares are repurchased precisely because they are cheaper."
            ]
          }
        ]
      },
      {
        "n": 3,
        "title": "Problem 2 — Valuation with leverage",
        "points": 36,
        "topic": "APV with a predetermined debt schedule",
        "chapters": [
          4,
          17,
          18
        ],
        "body": "<p>Aardvark Industries is considering a project that will generate the following free cash flows:</p><table class=\"data\"><tr><th>Year</th><th>0</th><th>1</th><th>2</th><th>3</th></tr><tr><td>Free Cash Flows</td><td class=\"n\">&minus;$200</td><td class=\"n\">$100</td><td class=\"n\">$80</td><td class=\"n\">$60</td></tr></table><p>You are also provided with the following market value balance sheet and information regarding Aardvark's cost of capital:</p><table class=\"data\"><tr><th>Assets</th><th></th><th>Liabilities</th><th></th><th>Cost of Capital</th><th></th></tr><tr><td>Cash</td><td class=\"n\">0</td><td>Debt</td><td class=\"n\">400</td><td>Debt</td><td class=\"n\">7%</td></tr><tr><td>Other Assets</td><td class=\"n\">1000</td><td>Equity</td><td class=\"n\">600</td><td>Equity</td><td class=\"n\">12%</td></tr></table><p>The corporate tax rate is 21%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 5,
            "body": "<p>What is Aardvark's unlevered cost of capital?</p>",
            "solution": "<p>The unlevered cost of capital is the pre-tax weighted average cost of capital &mdash; the return the firm's assets must earn, irrespective of how they happen to be financed. Read the weights off the market value balance sheet: D = 400 and E = 600, so V = 1000 and the weights are E/V = 0.6 and D/V = 0.4.</p><p>r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = 0.6(12%) + 0.4(7%) = 7.20% + 2.80% = <b>0.1000 (10.0000%)</b></p><p><b>No tax term appears.</b> r<sub>U</sub> is a pre-tax average by construction: it is the cost of capital of the assets, and the assets do not care about the interest deduction. Multiplying r<sub>D</sub> by (1 &minus; &tau;<sub>c</sub>) here would give 9.41% and would be wrong &mdash; that is the after-tax WACC, a different quantity, and this problem does not need it because it is solved by APV.</p><p><i>Cross-check, written the other way:</i> r<sub>U</sub> = r<sub>D</sub> + (E/V)(r<sub>E</sub> &minus; r<sub>D</sub>) = 0.07 + 0.6(0.12 &minus; 0.07) = 0.07 + 0.03 = <b>0.1000</b> &#10003;</p><p>Note that the cash balance is zero, so there is no net-debt adjustment to make. When a firm holds cash, the relevant weights are built on net debt, D &minus; Cash.</p>",
            "criteria": [
              "Reads the weights off the market-value balance sheet: E/V = 600/1000 = 0.6 and D/V = 400/1000 = 0.4.",
              "r_U = 0.6(12%) + 0.4(7%) = 10.00%.",
              "NO (1 − τ_c) factor. r_U is the pre-tax WACC; applying the tax factor gives 9.41% and corrupts every later part.",
              "Noting that cash is zero, so no net-debt adjustment is required, shows you knew to look."
            ]
          },
          {
            "label": "b",
            "points": 5,
            "body": "<p>What is the unlevered value of Aardvark's new project?</p>",
            "solution": "<p>Discount the project's free cash flows at r<sub>U</sub> = 10%, which is what the project would be worth financed entirely with equity.</p><table class=\"data\"><tr><th>Year</th><th>FCF</th><th>Discount factor at 10%</th><th>PV</th></tr><tr><td>1</td><td class=\"n\">100</td><td class=\"n\">1/1.10</td><td class=\"n\">90.9091</td></tr><tr><td>2</td><td class=\"n\">80</td><td class=\"n\">1/1.10<sup>2</sup> = 1/1.21</td><td class=\"n\">66.1157</td></tr><tr><td>3</td><td class=\"n\">60</td><td class=\"n\">1/1.10<sup>3</sup> = 1/1.331</td><td class=\"n\">45.0789</td></tr><tr><td><b>Sum of years 1&ndash;3</b></td><td></td><td></td><td class=\"n\"><b>202.1037</b></td></tr></table><p>So the project's future cash flows are worth <b>V<sup>U</sup> = $202.10</b> today, and netting off the year-0 outlay of $200 gives</p><p>Unlevered NPV = 202.1037 &minus; 200 = <b>$2.10</b></p><p><b>Report both figures and label them.</b> The year-0 flow of &minus;$200 is listed as part of the free cash flow stream, so &laquo;the unlevered value of the project&raquo; can reasonably be read either as the $202.10 present value of what it produces or as the $2.10 net of what it costs. Stating both, clearly labelled, is safe and costs one line; the later parts add the tax shield to whichever base you chose, and the comparison in part (f) is unaffected.</p><p><b>What the number says.</b> On an all-equity basis this project is barely worth doing &mdash; it clears its hurdle by about 1% of the outlay. That matters for parts (c) to (g): almost all of the project's value, when it is financed with debt, will turn out to come from the tax shield rather than from the operations.</p>",
            "criteria": [
              "Discounts at r_U = 10%, not at the WACC and not at r_D. This is the APV method, so the unlevered leg must use the unlevered rate.",
              "Year-by-year discounting with the correct exponents: 100/1.1 + 80/1.1² + 60/1.1³ = 202.10.",
              "Nets off the $200 outlay to give an unlevered NPV of $2.10, and labels which of the two figures is which.",
              "Does not add any tax shield at this stage — that is part (c), and doing it here double counts.",
              "Observing that the project is only marginally positive unlevered sets up the discussion in parts (f) and (g)."
            ]
          },
          {
            "label": "c",
            "points": 6,
            "body": "<p>Suppose that to fund this new project, Aardvark borrows $120 in year 0 with the principal to be paid in three equal installments at the end of the years 1, 2, and 3. What is the present value of Aardvark's interest tax shield?</p>",
            "solution": "<p><b>Step 1 &mdash; the debt schedule.</b> $120 is borrowed at date 0 and repaid in three equal installments of $40. Interest in year t is charged on the balance outstanding at the <i>start</i> of the year:</p><table class=\"data\"><tr><th>Year t</th><th>Debt at start, D<sub>t&minus;1</sub></th><th>Interest = 7% &times; D<sub>t&minus;1</sub></th><th>Tax shield = 21% &times; interest</th></tr><tr><td>1</td><td class=\"n\">120</td><td class=\"n\">8.40</td><td class=\"n\">1.7640</td></tr><tr><td>2</td><td class=\"n\">80</td><td class=\"n\">5.60</td><td class=\"n\">1.1760</td></tr><tr><td>3</td><td class=\"n\">40</td><td class=\"n\">2.80</td><td class=\"n\">0.5880</td></tr></table><p><b>Step 2 &mdash; which rate discounts the shields.</b> This is the judgement the exercise is really testing. The debt schedule is <b>predetermined</b>: the amounts 120, 80, 40 are fixed in advance and do not depend on how the project turns out. The tax shields are therefore about as risky as the debt itself, and the correct discount rate is <b>r<sub>D</sub> = 7%</b>.</p><p>(Contrast this with a firm that targets a constant debt-equity ratio. There the debt level moves with the firm's value, so the shields inherit the risk of the assets and must be discounted at r<sub>U</sub>. Getting this rule the right way round is one of the most frequently tested points in the course.)</p><p><b>Step 3 &mdash; discount them.</b></p><p>PV(TS) = 1.7640/1.07 + 1.1760/1.07<sup>2</sup> + 0.5880/1.07<sup>3</sup><br>= 1.6486 + 1.0272 + 0.4800 = <b>$3.1557</b></p><p><i>Verification along an independent route.</i> Factor the constants out of the sum: PV(TS) = &tau;<sub>c</sub>r<sub>D</sub> &Sigma; D<sub>t&minus;1</sub>/(1 + r<sub>D</sub>)<sup>t</sup> = 0.21 &times; 0.07 &times; [120/1.07 + 80/1.07<sup>2</sup> + 40/1.07<sup>3</sup>] = 0.0147 &times; 214.6765 = <b>3.1557</b> &#10003;</p>",
            "criteria": [
              "Builds the debt schedule explicitly: 120, 80, 40 outstanding at the start of years 1, 2, 3, with the principal repaid in $40 installments.",
              "Interest in year t is 7% of the balance at the START of year t, so 8.40, 5.60, 2.80 — not 7% of $120 every year, and not 7% of the year-END balance.",
              "TS_t = τ_c × interest = 1.764, 1.176, 0.588.",
              "Discounts at r_D = 7% AND SAYS WHY: the debt schedule is predetermined, so the shields carry debt risk, not asset risk. Using r_U here is the error, and the reasoning is worth more than the number.",
              "PV(TS) = $3.1557. Four decimals are cheap insurance in a chained problem."
            ]
          },
          {
            "label": "d",
            "points": 5,
            "body": "<p>What is the levered value of Aardvark's new project under the leverage policy stated in part c)?</p>",
            "solution": "<p>The APV identity, which is not on the formula sheet and must be memorised:</p><p>V<sup>L</sup> = V<sup>U</sup> + PV(TS)</p><p><b>On an NPV basis:</b> 2.1037 + 3.1557 = <b>$5.2594</b><br><b>On a gross present-value basis:</b> 202.1037 + 3.1557 = <b>$205.2594</b>, against an outlay of $200.</p><p>Either presentation is fine as long as it is consistent with part (b) and labelled.</p><p><b>Reading the result.</b> The project is worth $5.26 with the debt financing against $2.10 without it, so <b>60% of the project's value comes from the tax shield rather than from the operations</b>. A project this marginal is only worth doing because of how it is financed &mdash; a fact worth stating, and one that part (g) will make uncomfortable.</p><p><i>Cross-check by backing out an effective discount rate.</i> If the levered NPV of $5.2594 is right, then there is a single rate r that satisfies &minus;200 + 100/(1+r) + 80/(1+r)<sup>2</sup> + 60/(1+r)<sup>3</sup> = 5.2594. Solving gives r = <b>9.0445%</b>, comfortably below the unlevered 10% and above the after-tax cost of debt. That is exactly what an effective WACC for this project should look like, and it confirms that the APV arithmetic has not gone astray. (You would not be asked to do this in the exam &mdash; the debt policy here is a fixed schedule, not a constant ratio, so no single WACC applies exactly across all three years. It is a check, not a method.)</p>",
            "criteria": [
              "V^L = V^U + PV(TS). This identity is NOT on the formula sheet — memorise it.",
              "$5.2594 on an NPV basis, or $205.2594 gross, consistent with whichever convention part (b) used.",
              "Does not also discount at a WACC — combining the two methods double counts the tax shield.",
              "Observing that most of the project's value is the tax shield is the natural bridge to parts (f) and (g), and the examiner is clearly steering there."
            ]
          },
          {
            "label": "e",
            "points": 6,
            "body": "<p>Suppose that to fund this new project, Aardvark instead borrows $150 in year 0 with the principal to be paid in three equal installments at the end of the years 1, 2, and 3. What is the present value of Aardvark's interest tax shield?</p>",
            "solution": "<p>Same structure, larger loan: $150 repaid in three installments of $50.</p><table class=\"data\"><tr><th>Year t</th><th>Debt at start, D<sub>t&minus;1</sub></th><th>Interest = 7% &times; D<sub>t&minus;1</sub></th><th>Tax shield = 21% &times; interest</th></tr><tr><td>1</td><td class=\"n\">150</td><td class=\"n\">10.50</td><td class=\"n\">2.2050</td></tr><tr><td>2</td><td class=\"n\">100</td><td class=\"n\">7.00</td><td class=\"n\">1.4700</td></tr><tr><td>3</td><td class=\"n\">50</td><td class=\"n\">3.50</td><td class=\"n\">0.7350</td></tr></table><p>PV(TS) = 2.2050/1.07 + 1.4700/1.07<sup>2</sup> + 0.7350/1.07<sup>3</sup><br>= 2.0607 + 1.2839 + 0.6000 = <b>$3.9447</b></p><p><i>Verification, by proportionality.</i> Every entry in the debt schedule has been scaled by 150/120 = 1.25, and the tax shield is linear in the debt level, so the present value must scale by the same factor:</p><p>3.1557 &times; 1.25 = <b>3.9447</b> &#10003;</p><p>This is worth noticing in the exam, not just as a check but as a shortcut: with a proportional debt schedule and the same discount rate, you can get part (e) from part (c) in one multiplication and spend the saved minutes elsewhere.</p>",
            "criteria": [
              "Debt schedule 150, 100, 50 with $50 installments, giving interest of 10.50, 7.00, 3.50.",
              "Tax shields 2.205, 1.470, 0.735, still discounted at r_D = 7% for the same reason as in part (c).",
              "PV(TS) = $3.9447.",
              "Spotting the proportionality — the schedule is 1.25× the one in part (c), so the answer is 1.25 × 3.1557 — is both a check and a time saver, and it demonstrates you understand the shield is linear in the debt level."
            ]
          },
          {
            "label": "f",
            "points": 5,
            "body": "<p>What is the levered value of Aardvark's new project under the leverage policy stated in part e). Compare your result to the value in part d) and comment.</p>",
            "solution": "<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = 2.1037 + 3.9447 = <b>$6.0484</b> (or $206.0484 gross).</p><p><b>The comparison.</b></p><table class=\"data\"><tr><th>Leverage policy</th><th>V<sup>U</sup></th><th>PV(TS)</th><th>V<sup>L</sup></th></tr><tr><td>Borrow $120 (part d)</td><td class=\"n\">2.1037</td><td class=\"n\">3.1557</td><td class=\"n\">5.2594</td></tr><tr><td>Borrow $150 (part f)</td><td class=\"n\">2.1037</td><td class=\"n\">3.9447</td><td class=\"n\">6.0484</td></tr><tr><td><b>Difference</b></td><td class=\"n\"><b>0</b></td><td class=\"n\"><b>+0.7889</b></td><td class=\"n\"><b>+0.7889</b></td></tr></table><p><b>Comment.</b> The project is worth $0.79 more when it is financed with $150 rather than $120, and the entire difference is tax shield: the unlevered value is untouched, because how the project is financed does not change the cash flows its assets produce. That separation is the whole point of the APV method, and it is why APV is the natural tool whenever the debt schedule is given exogenously.</p><p><b>The uncomfortable implication, which is what the question is fishing for.</b> Value is <i>linear</i> in the amount borrowed here: 0.7889 = 0.25 &times; 3.1557, exactly the 25% by which the loan was increased. Extrapolate and the model says borrow $1,500, or $15,000, and capture ever more tax shield &mdash; a firm should be financed almost entirely with debt. That conclusion is obviously false, and the reason it is false is that the model as set up contains only the benefit of debt and none of its costs. Part (g) supplies them.</p>",
            "criteria": [
              "V^L = $6.0484, and the difference from part (d) is +$0.7889.",
              "States that V^U is IDENTICAL in the two cases: financing does not change the project's operating cash flows. Recomputing a different unlevered value is a conceptual error.",
              "Attributes the whole difference to the larger tax shield.",
              "The comment must go beyond 'more debt is better'. The examiner wants the observation that value is linear in debt in this model, which implies an absurd corner solution and therefore signals a missing ingredient — the natural set-up for part (g)."
            ]
          },
          {
            "label": "g",
            "points": 4,
            "body": "<p>Briefly discuss why Aardvark might prefer to borrow $120 rather than $150.</p>",
            "solution": "<p>Because the valuation above counts only the <b>benefit</b> of debt. The moment the costs are put back in, the optimum stops being &laquo;as much as possible&raquo; and becomes an interior point &mdash; the <b>trade-off theory</b> of capital structure:</p><p>V<sup>L</sup> = V<sup>U</sup> + PV(interest tax shield) &minus; PV(financial distress costs) &minus; PV(agency costs) + PV(agency benefits)</p><p><b>1. Financial distress costs.</b> More debt means a higher probability of default and larger expected costs of it &mdash; direct costs such as legal and administrative fees, and, usually much larger, indirect costs: lost customers, lost suppliers, key employees leaving, fire-sale asset disposals, and management time spent on creditors rather than on the business. These are anticipated by the market and capitalised into the price today, so they reduce firm value now, not only in the state where default happens.</p><p><b>2. Agency costs of debt.</b> High leverage distorts the shareholders' investment incentives in two familiar directions: <b>risk shifting</b>, where they favour projects that increase volatility because they keep the upside and the creditors absorb the downside; and <b>debt overhang</b>, where they decline positive-NPV projects because the gains would accrue largely to existing creditors. Both destroy value, and both get worse as leverage rises.</p><p><b>3. The shield may not be usable.</b> The tax shield is only worth &tau;<sub>c</sub> per dollar of interest if there is enough taxable income to absorb the deduction. Aardvark's project generates $240 of free cash flow in total, and interest of $10.50 in year 1 is already a real charge against it. Push the leverage far enough and the deductions exceed earnings, at which point they are carried forward at best and lost at worst &mdash; so the effective marginal tax benefit falls well below 21% before default risk even becomes the binding issue.</p><p><b>4. Debt capacity and flexibility.</b> $150 against a project worth roughly $200 is already substantial leverage. Borrowing to the limit uses up the capacity to raise cheap debt later, and a firm that cannot borrow when an opportunity arrives may be forced to pass it up or to issue equity into a market that reads the issue as bad news (the pecking order).</p><p><b>5. Personal taxes.</b> The corporate tax advantage of debt is partly offset at the investor level, where interest income is typically taxed more heavily than equity income. The effective tax advantage &tau;* is smaller than &tau;<sub>c</sub>, which shrinks the benefit side of the trade-off without touching the cost side.</p><p><i>Two or three of these, briefly explained, is what a four-point answer needs. Naming the trade-off theory explicitly is what earns the last point.</i></p>",
            "criteria": [
              "Names the trade-off theory and states the missing ingredient in one sentence: the APV calculation above prices the benefit of debt but not its costs.",
              "Gives at least two distinct real costs of higher leverage, explained rather than listed. Financial distress costs (direct and indirect) and agency costs of debt (risk shifting, debt overhang) are the two the course expects.",
              "Credit for the point that the tax shield requires sufficient taxable income to be usable — a specific and quantitative observation given this project's modest cash flows.",
              "Credit also for debt capacity and financial flexibility, and for personal taxes reducing the effective tax advantage below τ_c.",
              "The question says 'briefly' and is worth four points. Two or three well-explained reasons beat a long list of names."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Problem 3 — Real Options",
        "points": 36,
        "topic": "Option to wait, abandonment option, decision tree",
        "chapters": [
          1,
          25
        ],
        "body": "<p>Kinston Industries has come up with a new mountain bike prototype and is ready to go ahead with pilot production and test marketing. The pilot production and test marketing phase will last for one year and cost $500,000. Your management team believes that there is a 50% chance that the test marketing will be successful and that there will be sufficient demand for the new mountain bike. If the test-marketing phase is successful, then Kinston Industries will invest $3 million in year one to build a plant that will generate expected annual after-tax cash flows of $400,000 in perpetuity beginning in year two. If the test marketing is not successful, Kinston can still go ahead and build the new plant, but the expected annual after-tax cash flows would be only $200,000 in perpetuity beginning in year two. Kinston has the option to stop the project at any time and sell the prototype mountain bike to an overseas competitor for $300,000. Kinston's cost of capital is 10%.</p>",
        "parts": [
          {
            "label": "a",
            "points": 8,
            "body": "<p>What is the NPV of the Kinston Industries Mountain Bike Project if the investment decision is made after the pilot production and test marketing phase?</p>",
            "solution": "<p>Work backwards from year 1, when the state of demand is known and the decision is made.</p><p><b>Step 1 &mdash; value the plant at date 1 in each state.</b> The plant costs $3 million at date 1 and produces a perpetuity starting at date 2. A perpetuity whose first payment is at date 2, valued at date 1, is simply CF/r &mdash; the standard perpetuity formula values the stream one period before its first payment.</p><table class=\"data\"><tr><th>State</th><th>Probability</th><th>Annual CF</th><th>PV at date 1 = CF/0.10</th><th>NPV at date 1</th></tr><tr><td>Successful</td><td class=\"n\">50%</td><td class=\"n\">$400,000</td><td class=\"n\">$4,000,000</td><td class=\"n\">+$1,000,000</td></tr><tr><td>Unsuccessful</td><td class=\"n\">50%</td><td class=\"n\">$200,000</td><td class=\"n\">$2,000,000</td><td class=\"n\">&minus;$1,000,000</td></tr></table><p><b>Step 2 &mdash; take the best action in each state.</b> Kinston has three choices at date 1: build, sell the prototype for $300,000, or do nothing.</p><p><i>Successful:</i> max(build $1,000,000; sell $300,000; nothing $0) = <b>$1,000,000</b> &mdash; build the plant.<br><i>Unsuccessful:</i> max(build &minus;$1,000,000; sell $300,000; nothing $0) = <b>$300,000</b> &mdash; abandon and sell the prototype.</p><p>This is where the value is. The right to walk away turns a $1,000,000 loss into a $300,000 gain, a swing of $1.3 million in the bad state.</p><p><b>Step 3 &mdash; expected payoff at date 1, discounted to date 0, less the pilot cost.</b></p><p>E[payoff at date 1] = 0.5($1,000,000) + 0.5($300,000) = $500,000 + $150,000 = <b>$650,000</b></p><p>NPV = &minus;$500,000 + $650,000/1.10 = &minus;$500,000 + $590,909 = <b>+$90,909</b></p><p>Exactly $1,000,000/11 = $90,909.09.</p><p><b>Go ahead with the pilot.</b> Note how thin the margin is: a $500,000 study buys a claim worth $590,909, a gain of about $91,000, and essentially all of it comes from the two options embedded in the design &mdash; the option to wait before committing $3 million, and the option to abandon for $300,000.</p>",
            "criteria": [
              "Values each state at DATE 1: a perpetuity of CF beginning at date 2 is worth CF/r at date 1. Dividing by 1.10 again, or valuing the perpetuity at date 2, is the standard timing error.",
              "State NPVs at date 1 of +$1,000,000 and −$1,000,000, both net of the $3 million plant.",
              "Applies max() state by state: build in the good state, sell the prototype for $300,000 in the bad one. The $300,000 must beat both the −$1,000,000 of building and the $0 of doing nothing, and saying so is the point of the part.",
              "Discounts the expected date-1 payoff of $650,000 by one year only, and subtracts the $500,000 pilot cost which is paid at date 0 and is NOT discounted.",
              "NPV = +$90,909, and the decision to proceed is stated."
            ]
          },
          {
            "label": "b",
            "points": 7,
            "body": "<p>Assume now that Kinston does not have the ability to sell the prototype in year one for $300,000. What is the NPV of the Kinston Industries Mountain Bike Project if the investment decision is made after the pilot production and test marketing phase?</p>",
            "solution": "<p>The only thing that changes is the menu at date 1 in the bad state. Kinston can still refuse to build &mdash; that right is never lost &mdash; but refusing now yields nothing rather than $300,000.</p><p><i>Successful:</i> max($1,000,000; $0) = <b>$1,000,000</b> &mdash; build.<br><i>Unsuccessful:</i> max(&minus;$1,000,000; $0) = <b>$0</b> &mdash; walk away with nothing.</p><p>E[payoff at date 1] = 0.5($1,000,000) + 0.5($0) = <b>$500,000</b></p><p>NPV = &minus;$500,000 + $500,000/1.10 = &minus;$500,000 + $454,545 = <b>&minus;$45,455</b></p><p>Exactly &minus;$500,000/11 = &minus;$45,454.55.</p><p><b>Now the pilot is not worth doing.</b> The project's NPV is negative, so Kinston should not spend the $500,000.</p><p><b>The salvage option, priced.</b> Comparing with part (a):</p><p>Value of the option to sell the prototype = 90,909 &minus; (&minus;45,455) = <b>$136,364</b></p><p><i>Check it directly:</i> the option pays $300,000, but only in the bad state (probability 0.5) and only at date 1:</p><p>0.5 &times; $300,000 / 1.10 = $150,000/1.10 = <b>$136,364</b> &#10003;</p><p>The two routes agree exactly. And the comparison makes the point that the exercise is built around: <b>a $300,000 salvage value, available half the time, is worth $136,364 &mdash; and it is the difference between a project worth doing and one that is not.</b> Abandonment options are routinely ignored in naive NPV analysis, and this is what ignoring them costs.</p>",
            "criteria": [
              "Only the bad-state payoff changes, from $300,000 to $0. The good state is untouched at $1,000,000.",
              "The right to decline the $3 million investment survives — the bad state is worth $0, NOT −$1,000,000. Building anyway is the error that turns this into a large negative number.",
              "NPV = −$45,455, and the conclusion that Kinston should not undertake the pilot.",
              "Full marks for pricing the salvage option as the difference between (a) and (b), $136,364, and verifying it independently as 0.5 × 300,000/1.10.",
              "The comparison is the answer, not just the number: an apparently minor salvage clause flips the decision."
            ]
          },
          {
            "label": "c",
            "points": 7,
            "body": "<p>Assume that Kinston has the ability to ignore the pilot production and test marketing and to go ahead and build their manufacturing plant immediately. That is, Kinston can invest $3 million today and will start to generate cash flows in year one. Assume that Kinston does not have the ability to sell the prototype in year one for $300,000. The probability of high or low demand is still 50%. What is the NPV of the Kinston Industries Mountain Bike Project?</p>",
            "solution": "<p>Building immediately means committing the $3 million <b>before</b> learning which state of demand obtains. There is no decision left to make afterwards, so there is no option value: simply discount the expected cash flow.</p><p><b>Step 1 &mdash; the expected annual cash flow.</b></p><p>E[CF] = 0.5($400,000) + 0.5($200,000) = <b>$300,000 per year in perpetuity</b>, beginning in year 1.</p><p><b>Step 2 &mdash; value it and net off the outlay.</b> The first payment arrives at date 1 and the plant is built at date 0, so the ordinary perpetuity formula applies with no extra discounting:</p><p>PV = $300,000 / 0.10 = <b>$3,000,000</b><br>NPV = $3,000,000 &minus; $3,000,000 = <b>$0</b></p><p><i>Verification state by state, which is the independent route:</i></p><p>0.5($4,000,000 &minus; $3,000,000) + 0.5($2,000,000 &minus; $3,000,000) = 0.5(+$1,000,000) + 0.5(&minus;$1,000,000) = <b>$0</b> &#10003;</p><p><b>Exactly zero &mdash; and that is the designed answer, not a coincidence.</b> Immediate investment is a coin flip between a $1 million gain and a $1 million loss, and the two cancel. The project as a static, take-it-or-leave-it proposition is worth precisely nothing. Everything the project is worth in part (a) is option value, created purely by the ability to learn first and decide second.</p><p><b>Note also that the pilot's $500,000 does not appear here.</b> The question says Kinston ignores the pilot altogether, so that cost is avoided.</p>",
            "criteria": [
              "Recognises that committing before learning the state means NO option: value the expected cash flow, do not take a max().",
              "E[CF] = 0.5(400,000) + 0.5(200,000) = $300,000, valued as a perpetuity at 10% = $3,000,000, beginning at date 1 so no extra discounting.",
              "NPV = 3,000,000 − 3,000,000 = $0 exactly.",
              "Does NOT include the $500,000 pilot cost — the pilot is skipped in this scenario.",
              "The state-by-state check 0.5(+1m) + 0.5(−1m) = 0 is one line and confirms both the arithmetic and the logic.",
              "Naming what the zero means — the static project is worth nothing, so all the value in part (a) is option value — is what lifts this above a bare calculation."
            ]
          },
          {
            "label": "d",
            "points": 7,
            "body": "<p>Assume that Kinston has the ability to ignore the pilot production and test marketing and to go ahead and build their manufacturing plant immediately. That is, Kinston can invest $3 million today and will start to generate cash flows in year one. Assume that Kinston has the ability to sell the prototype in year one for $300,000. The probability of high or low demand is still 50%. What is the value of the option to do pilot production and test marketing?</p>",
            "solution": "<p>The value of an option is always the same construction: <b>what the opportunity is worth when you may use the option, minus what it is worth when you may not</b>. Here the alternative to doing the pilot is to build immediately.</p><p><b>The two branches.</b></p><table class=\"data\"><tr><th>Strategy</th><th>Description</th><th>NPV at date 0</th></tr><tr><td>Do the pilot, then decide</td><td>Pay $500,000, learn the state at date 1, build if successful, sell the prototype for $300,000 if not (part a)</td><td class=\"n\">+$90,909</td></tr><tr><td>Build immediately</td><td>Commit $3 million now, take the expected perpetuity, no decision left (part c)</td><td class=\"n\">$0</td></tr></table><p>Value of the option to do pilot production and test marketing = $90,909 &minus; $0 = <b>$90,909</b></p><p>Exactly $1,000,000/11 = $90,909.09.</p><p><b>Why the alternative is worth zero.</b> If Kinston builds the plant today, there is no prototype left to sell and no decision left to condition on &mdash; the $300,000 salvage clause is irrelevant on that branch. So the immediate-investment benchmark is the $0 computed in part (c), and the whole of the pilot strategy's $90,909 is the option's value.</p><p><b>What the option actually is.</b> Two things bundled together, and it is worth naming both:</p><p>1. An <b>option to wait</b>. Deferring the $3 million commitment by one year, at a cost of $500,000, buys the information needed to avoid building into weak demand. Note that this is valuable even though waiting is <i>not</i> free and even though the immediate NPV is not negative &mdash; a zero-NPV project that can be turned into a conditional one is worth strictly more than zero.</p><p>2. An <b>option to abandon</b>, worth $136,364 as computed in part (b), which pays the $300,000 salvage value in the bad state.</p><p><b>The decomposition, which ties the whole exercise together:</b></p><table class=\"data\"><tr><th>Component</th><th>Value</th></tr><tr><td>Static project, build now (part c)</td><td class=\"n\">$0</td></tr><tr><td>+ Option to wait and learn, net of the $500,000 pilot cost (part b less part c)</td><td class=\"n\">&minus;$45,455</td></tr><tr><td>+ Option to abandon and sell the prototype (part a less part b)</td><td class=\"n\">+$136,364</td></tr><tr><td><b>= Pilot strategy (part a)</b></td><td class=\"n\"><b>+$90,909</b></td></tr></table><p>&minus;45,455 + 136,364 = 90,909 &#10003;. Read the middle line carefully: <b>the option to wait is not worth its $500,000 price on its own.</b> Waiting alone leaves the project worse off than building immediately. It is only in combination with the salvage value that the delay pays for itself &mdash; which is a genuinely instructive result and exactly the kind of interaction between real options that the topic is about.</p>",
            "criteria": [
              "Uses the right construction: option value = value WITH the option minus value WITHOUT it, i.e. part (a) minus part (c).",
              "The benchmark is the immediate-investment NPV of $0 from part (c) — the $300,000 salvage is irrelevant once the plant is built, so it does not change the alternative.",
              "Value of the option = $90,909 − $0 = $90,909.",
              "Identifies WHAT the option is: the right to defer a $3 million commitment until the state of demand is known, bundled with the right to abandon for $300,000.",
              "Full marks for the decomposition showing that the delay alone is worth −$45,455 and only becomes worthwhile once the abandonment option is added. Most answers stop at the number."
            ]
          },
          {
            "label": "e",
            "points": 7,
            "body": "<p>Assuming that Kinston has the ability to sell the prototype in year one for $300,000, draw a decision tree detailing the Kinston Industries Mountain Bike Project.</p>",
            "solution": "<p>Draw it with square nodes for decisions Kinston makes and round nodes for the demand outcome nature chooses. Label every branch with its cash flow, its timing and, where relevant, its probability. The tree below is written out; on the exam sketch it, and make sure the two node types are visually distinct.</p><p><b>The tree.</b></p><p><b>&#9633; DECISION at t = 0:</b> pilot, build immediately, or do nothing?</p><p>&nbsp;&nbsp;<b>Branch 1 &mdash; Do the pilot.</b> Cash flow &minus;$500,000 at t = 0.<br>&nbsp;&nbsp;&nbsp;&nbsp;&rarr; <b>&#9711; CHANCE at t = 1:</b> is the test marketing successful?<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Successful, p = 0.5</b> &rarr; <b>&#9633; DECISION:</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Build: &minus;$3,000,000 at t = 1, then $400,000 per year from t = 2 forever &rarr; value at t = 1 = 4,000,000 &minus; 3,000,000 = <b>+$1,000,000</b> &nbsp;&#10004; <i>chosen</i><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Sell the prototype: <b>+$300,000</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Do nothing: <b>$0</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Unsuccessful, p = 0.5</b> &rarr; <b>&#9633; DECISION:</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Build: &minus;$3,000,000 at t = 1, then $200,000 per year from t = 2 forever &rarr; value at t = 1 = 2,000,000 &minus; 3,000,000 = <b>&minus;$1,000,000</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Sell the prototype: <b>+$300,000</b> &nbsp;&#10004; <i>chosen</i><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; Do nothing: <b>$0</b></p><p>&nbsp;&nbsp;<b>Branch 2 &mdash; Build immediately.</b> Cash flow &minus;$3,000,000 at t = 0.<br>&nbsp;&nbsp;&nbsp;&nbsp;&rarr; <b>&#9711; CHANCE at t = 1:</b> demand is high ($400,000 per year forever, p = 0.5) or low ($200,000 per year forever, p = 0.5). No decision follows &mdash; the commitment has been made.<br>&nbsp;&nbsp;&nbsp;&nbsp;Value at t = 0 = 3,000,000 &minus; 3,000,000 = <b>$0</b></p><p>&nbsp;&nbsp;<b>Branch 3 &mdash; Do nothing.</b> <b>$0</b></p><p><b>Rolling the tree back.</b> Fold it from right to left, taking a maximum at every square node and an expectation at every round node.</p><table class=\"data\"><tr><th>Node</th><th>Operation</th><th>Value</th></tr><tr><td>Decision, t = 1, successful</td><td>max(1,000,000 ; 300,000 ; 0)</td><td class=\"n\">$1,000,000</td></tr><tr><td>Decision, t = 1, unsuccessful</td><td>max(&minus;1,000,000 ; 300,000 ; 0)</td><td class=\"n\">$300,000</td></tr><tr><td>Chance, t = 1</td><td>0.5(1,000,000) + 0.5(300,000)</td><td class=\"n\">$650,000</td></tr><tr><td>Branch 1 at t = 0</td><td>&minus;500,000 + 650,000/1.10</td><td class=\"n\">$90,909</td></tr><tr><td>Branch 2 at t = 0</td><td>300,000/0.10 &minus; 3,000,000</td><td class=\"n\">$0</td></tr><tr><td>Branch 3 at t = 0</td><td>&mdash;</td><td class=\"n\">$0</td></tr><tr><td><b>Decision, t = 0</b></td><td><b>max(90,909 ; 0 ; 0)</b></td><td class=\"n\"><b>$90,909</b></td></tr></table><p><b>The optimal policy, stated in words:</b> run the pilot; if the test marketing succeeds, build the plant; if it fails, sell the prototype to the overseas competitor for $300,000. Value today: <b>$90,909</b> &#10003; &mdash; which reconciles with part (a), as it must.</p><p><b>What earns the marks in a drawn tree.</b> Square nodes for your decisions and round nodes for nature's; every branch labelled with a cash flow, a date and, where it is a chance branch, a probability; the abandonment branch present in <i>both</i> states, not only the bad one, since Kinston may sell &laquo;at any time&raquo;; and the chosen branch at each decision node marked. A tree that shows only the path that turns out to be optimal is not a decision tree &mdash; the rejected alternatives are what demonstrate that a decision was actually made.</p>",
            "criteria": [
              "Uses the two node types correctly: squares for Kinston's decisions, circles for the demand outcome. Mixing them up is the most common presentation error.",
              "Includes the t = 0 decision as well as the t = 1 decisions — the tree has three initial branches (pilot, build immediately, do nothing), not one.",
              "Every branch labelled with its cash flow, its timing, and its probability where applicable.",
              "The abandonment branch appears in BOTH states at t = 1, since the prototype may be sold at any time; it simply is not chosen in the successful state.",
              "Rolls the tree back explicitly: max at decision nodes, expectation at chance nodes, discount between dates, arriving at $90,909 consistent with part (a).",
              "States the optimal policy in words at the end: run the pilot, build if successful, sell the prototype if not."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Problem 4 — Asymmetric information",
        "points": 36,
        "topic": "Myers-Majluf, signalling, pecking order",
        "chapters": [
          8,
          12,
          13
        ],
        "body": "<p>Info Systems Technology (IST) manufactures microprocessor chips for use in appliances and other applications. IST has no debt and 200 million shares outstanding. The correct price for these shares is either $15.50 or $13.50 per share. Investors view both possibilities as equally likely, so the shares currently trade for $14.50. The managers of IST know the correct value of the shares.</p><p>IST must raise $550 million to build a new production facility. Because the firm would suffer a large loss of both customers and engineering talent in the event of financial distress, managers believe that if IST borrows the $550 million, the present value of financial distress costs will exceed any tax benefits by $15 million. At the same time, because investors believe that managers know the correct share price, IST faces an asymmetric information problem if it attempts to raise the $550 million by issuing equity. The value of any debt issue would be unaffected by the information asynmetry.</p>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>Suppose that if IST issues equity, the share price will remain at $14.50. To maximize the long-term share price of the firm once its true value is known, would managers choose to issue equity or borrow the $550 million if</p><p>i. They know the correct value of the shares is $13.50?</p><p>ii. They know the correct value of the shares is $15.50?</p>",
            "solution": "<p><b>Set-up &mdash; the two financing routes, in general.</b></p><p><i>Equity route.</i> IST sells $550 million of new shares at $14.50 each:</p><p>New shares = 550 / 14.50 = <b>37.9310 million</b> (exactly 1100/29)<br>Total shares afterwards = 200 + 37.9310 = <b>237.9310 million</b> (exactly 6900/29)</p><p>Once the truth emerges, the firm is worth its true asset value plus the $550 million raised, and that total is divided over all 237.9310 million shares.</p><p><i>Debt route.</i> IST borrows $550 million. The debt is fairly priced regardless of the information problem, but leverage costs $15 million in distress costs net of tax benefits. The 200 million original shares therefore share the true asset value plus $550 million of new assets, less $550 million of debt, less $15 million.</p><p><b>(i) The correct value is $13.50 per share.</b> True value of existing assets = 200 &times; 13.50 = $2,700 million.</p><p><i>Equity:</i> firm value = 2,700 + 550 = $3,250M, over 237.9310M shares<br>Long-run price = 3,250 / 237.9310 = <b>$13.6594</b></p><p><i>Debt:</i> firm value = 2,700 + 550 &minus; 15 = $3,235M; equity = 3,235 &minus; 550 = $2,685M, over 200M shares<br>Long-run price = 2,685 / 200 = <b>$13.4250</b></p><p><b>13.6594 &gt; 13.4250, so managers issue EQUITY.</b> They gain $0.23 per share by doing so.</p><p><i>Where the gain comes from:</i> the firm is truly worth $13.50 per share but sells new shares at $14.50, so each new share is sold for $1.00 more than it is worth. Total value transferred from new to existing shareholders = 37.9310 &times; $1.00 = $37.93 million, which spread over the 200 million old shares is $0.19 &mdash; and the same $37.93 million spread over all 237.93 million shares raises the price by the $0.1594 we computed. The overpricing more than covers the $15 million distress penalty that debt would carry, which is $0.075 per share.</p><p><b>(ii) The correct value is $15.50 per share.</b> True value of existing assets = 200 &times; 15.50 = $3,100 million.</p><p><i>Equity:</i> firm value = 3,100 + 550 = $3,650M, over 237.9310M shares<br>Long-run price = 3,650 / 237.9310 = <b>$15.3406</b></p><p><i>Debt:</i> firm value = 3,100 + 550 &minus; 15 = $3,635M; equity = 3,635 &minus; 550 = $3,085M, over 200M shares<br>Long-run price = 3,085 / 200 = <b>$15.4250</b></p><p><b>15.4250 &gt; 15.3406, so managers BORROW.</b></p><p><i>Why:</i> selling shares worth $15.50 for only $14.50 hands $1.00 per new share to the new investors &mdash; a dilution cost of 37.9310 &times; $1.00 = $37.93 million, or $0.1594 per share. That is more than the $15 million ($0.075 per share) cost of the distress risk, so debt is the cheaper way to raise the money even though debt is genuinely costly here.</p><p><b>Summary.</b></p><table class=\"data\"><tr><th>True value</th><th>Long-run price if equity</th><th>Long-run price if debt</th><th>Choice</th></tr><tr><td>$13.50 (overvalued at 14.50)</td><td class=\"n\">$13.6594</td><td class=\"n\">$13.4250</td><td><b>Equity</b></td></tr><tr><td>$15.50 (undervalued at 14.50)</td><td class=\"n\">$15.3406</td><td class=\"n\">$15.4250</td><td><b>Debt</b></td></tr></table><p><b>Consistency check.</b> The two equity-route prices average to (13.6594 + 15.3406)/2 = <b>$14.50</b> exactly &mdash; the current market price. That has to hold: if both types issued equity at $14.50, the market would be pricing the firm at its unconditional expected value, and no value would be created or destroyed in aggregate. It is a one-line check on eight lines of arithmetic. &#10003;</p>",
            "criteria": [
              "Computes the number of new shares from the ISSUE price: 550/14.50 = 37.93 million, giving 237.93 million shares in total.",
              "Values the long-run price as (true asset value + cash raised)/total shares on the equity route, and as (true asset value + cash raised − 15 − debt)/200 on the debt route.",
              "Applies the $15 million distress cost ONLY to the debt route, and applies it once — it is already a present value.",
              "i. equity gives $13.66 against debt's $13.43 → issue EQUITY. ii. equity gives $15.34 against debt's $15.43 → issue DEBT.",
              "Both parts must be answered with a decision, not just with numbers.",
              "Explains the trade-off in words: an overvalued firm gains by selling shares dear, an undervalued firm loses by selling them cheap, and the $15 million distress cost is what the mispricing is weighed against.",
              "The check that the two equity prices average to exactly $14.50 costs one line and catches an arithmetic slip immediately."
            ]
          },
          {
            "label": "b",
            "points": 8,
            "body": "<p>Given your answer to part (a), what should investors conclude if IST issues equity? What will happen to the share price?</p>",
            "solution": "<p>From part (a), only the <b>overvalued</b> type &mdash; the one whose shares are truly worth $13.50 &mdash; prefers to issue equity. The undervalued type strictly prefers debt. An equity issue is therefore a <b>perfect signal</b> of bad news.</p><p><b>What investors conclude:</b> the shares are worth $13.50, not $15.50. Their prior of 50/50 collapses to certainty.</p><p><b>What happens to the price:</b> it falls immediately from $14.50 to <b>$13.50</b>, a drop of $1.00 or 6.9%, on announcement of the issue &mdash; before any shares actually change hands.</p><p><b>The unravelling, which is what a full-mark answer adds.</b> The premise of part (a) &mdash; &laquo;suppose the share price will remain at $14.50&raquo; &mdash; cannot survive rational investors. Once the price drops to $13.50 on announcement, the firm can no longer sell shares at $14.50; it must issue at $13.50, which is fair value, and the whole gain to the overvalued type disappears. In equilibrium the low type issues equity at its true value of $13.50, capturing nothing, and the high type issues debt. That is a <b>separating equilibrium</b>: the financing choice fully reveals the private information, and both types are correctly priced afterwards.</p><p><b>The name and the evidence.</b> This is the Myers-Majluf adverse selection result and the theoretical foundation of the <b>pecking order</b>: internal funds first, then debt, then equity as a last resort, because each step down the order carries a larger information cost. It also predicts what is one of the most reliable findings in empirical corporate finance: announcements of seasoned equity offerings are met with an average share price decline of roughly 2 to 3%.</p>",
            "criteria": [
              "Concludes that only the low type issues equity, so an equity issue reveals the shares are worth $13.50.",
              "The price falls to $13.50 — immediately, on ANNOUNCEMENT, not gradually and not when the shares are sold.",
              "Recognises the unravelling: the assumed $14.50 issue price cannot survive, so in equilibrium the issue happens at $13.50 and the overvalued type's gain evaporates.",
              "Names it: adverse selection, Myers-Majluf, a separating equilibrium, and the pecking order that follows from it. The keys reward naming the mechanism.",
              "Credit for connecting it to the empirical regularity that SEO announcements produce a negative share-price reaction."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>Given your answer to part (a), what should investors conclude if IST issues debt? What will happen to the share price in that case?</p>",
            "solution": "<p>The mirror image. Only the <b>undervalued</b> type &mdash; truly worth $15.50 &mdash; prefers debt, because only it suffers the dilution that makes equity expensive. The low type would rather issue equity and pocket the overpricing.</p><p><b>What investors conclude:</b> the shares are worth $15.50.</p><p><b>What happens to the price:</b> it rises immediately from $14.50 to <b>$15.50</b> on announcement, a gain of $1.00 or 6.9%.</p><p><b>Refining the number.</b> Strictly, once the market knows the true asset value is $15.50 per share and that the firm is taking on $550 million of debt with a net distress cost of $15 million, the correct post-announcement price is the debt-route price computed in part (a):</p><p>P = (3,100 + 550 &minus; 15 &minus; 550)/200 = 3,085/200 = <b>$15.4250</b></p><p>So the price rises by $0.9250 rather than the full $1.00 &mdash; the good news is worth $1.00 per share, and the $15 million of net distress costs takes back $0.075 of it. Either answer is defensible provided you say which effect you are including; stating both is best.</p><p><b>The mechanism worth naming.</b> Debt is a <b>credible signal</b> precisely because it is costly, and costly in a way that hurts the low type more than the high type. The high type is willing to bear $15 million of distress costs to avoid $37.93 million of dilution; the low type is not, because for him the &laquo;dilution&raquo; is a gift he is receiving rather than paying. That asymmetry in the cost of the signal is what makes the separation stick, and it is the general structure of every signalling equilibrium in corporate finance.</p><p><b>The pecking order restated.</b> Firms with good private information avoid equity and use debt; firms with bad private information reach for equity. Rational investors know this, so equity issues are punished and debt issues are rewarded, which reinforces the ordering internal funds &rarr; debt &rarr; equity.</p>",
            "criteria": [
              "Concludes that only the high type issues debt, so a debt issue reveals the shares are worth $15.50.",
              "The price rises on announcement — to $15.50 on the pure-information view, or more precisely to $15.425 once the $15 million net distress cost is netted off. Say which you are computing.",
              "Explains WHY the signal is credible: it is costly, and it is more costly for the type that would like to imitate it.",
              "Names the separating equilibrium and the pecking order.",
              "Credit for symmetry with part (b): the two answers are mirror images, and saying so shows the structure has been understood rather than two calculations performed."
            ]
          },
          {
            "label": "d",
            "points": 8,
            "body": "<p>How would your answers change if there were no distress costs, but only tax benefits of leverage?</p>",
            "solution": "<p>Debt now carries a net <b>benefit</b> of B &gt; 0 instead of a net cost of $15 million. Redo part (a) with the sign flipped and B left as a symbol, since the question does not quantify it.</p><p><b>The debt-route price becomes</b> (200 &times; true value + 550 + B &minus; 550)/200 = true value + B/200.</p><p><b>High type ($15.50).</b> Debt gives 15.50 + B/200; equity still gives $15.3406 (nothing about the equity route has changed). Since 15.50 &gt; 15.3406 already, <b>the high type prefers debt for any B &ge; 0</b> &mdash; more strongly than before, since debt no longer carries a penalty.</p><p><b>Low type ($13.50).</b> Debt gives 13.50 + B/200; equity gives $13.6594. Debt wins if and only if</p><p>B/200 &gt; 13.6594 &minus; 13.50 = 0.1594&nbsp;&nbsp;&rArr;&nbsp;&nbsp;<b>B &gt; $31.88 million</b></p><p>Note what $31.88 million is: it is the mispricing gain, 37.9310 million new shares &times; $1.00 of overpricing each = $37.93 million, less the share of it that leaks back to the low type's own new shares. In other words, the low type abandons equity only when the tax benefit outweighs the profit from selling overpriced stock.</p><p><b>Two regimes, and the answer must give both.</b></p><table class=\"data\"><tr><th>Tax benefit B</th><th>Low type</th><th>High type</th><th>Equilibrium</th></tr><tr><td>B &gt; $31.88M</td><td>Debt</td><td>Debt</td><td><b>Pooling</b> &mdash; both issue debt</td></tr><tr><td>0 &le; B &lt; $31.88M</td><td>Equity</td><td>Debt</td><td><b>Separating</b> &mdash; as in (b) and (c)</td></tr></table><p><b>Case 1: a large tax benefit (B &gt; $31.88M).</b> Both types issue debt, so the financing choice conveys <b>no information at all</b>. Investors learn nothing from a debt issue and the share price stays at <b>$14.50</b> (plus the value of the tax shield, shared by both types). The signal has been destroyed &mdash; not because debt stopped being attractive, but because it became attractive to <i>everyone</i>. A signal only separates when it is costly enough that the imitator will not pay for it. Equity is never issued, which is the strong form of the pecking order.</p><p><b>Case 2: a small tax benefit (B &lt; $31.88M).</b> The separation of parts (b) and (c) survives intact: the low type still issues equity, the high type still issues debt, and the qualitative conclusions are unchanged. What changes is the magnitude of the price reaction to a debt issue, which now reflects both the good news and the tax benefit and is therefore <i>larger</i> than before.</p><p><b>The general lesson, which is the point of the part.</b> The informational content of a financing decision depends entirely on the costs and benefits attached to it. Debt signalled good news in parts (b) and (c) only because it was expensive &mdash; the $15 million of distress costs was the price the high type paid to distinguish itself. Remove the cost, and debt stops being a signal.</p><p><i>Source note: the paper does not state the size of the tax benefit, so the threshold above is the honest answer. If the intended reading was simply &laquo;debt now dominates for both types&raquo;, that is Case 1, and it is the answer a marker is most likely to expect &mdash; but the threshold should be stated, because below it nothing changes at all.</i></p>",
            "criteria": [
              "Recognises that the sign on the leverage effect flips: the debt route now pays true value + B/200 per share rather than true value − 0.075.",
              "The high type prefers debt for any positive tax benefit — this half is unambiguous and should be stated first.",
              "The low type's choice depends on the size of B, and the threshold B* ≈ $31.9 million should be derived rather than assumed away. The paper does not quantify the tax benefit, so an answer that gives the threshold is stronger than one that guesses.",
              "Case 1 (large B): both types issue debt → POOLING equilibrium, the debt issue conveys no information, and the share price stays at $14.50. Equity is never issued.",
              "Case 2 (small B): the separating equilibrium of parts (b) and (c) survives unchanged.",
              "Names the general principle: a signal separates only when it is costly, and costlier for the imitator than for the sender. Removing the cost destroys the signal.",
              "The keys reward checking whether the equilibrium is rational rather than stopping at the arithmetic — that is exactly what the two-regime answer does here."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2022",
    "label": "Spring 2022",
    "date": "2022-06-07",
    "minutes": 240,
    "points": 240,
    "format": "10 multiple choice + 4 problems · home exam",
    "note": "Pandemic home examination, submitted in WiseFlow: four hours, de facto open book, 240 points. Ten multiple-choice questions worth 48 points in total, then four problems of 48 points each. This is NOT the format you will meet in 2026 — Kurbatov's papers are three hours, closed book, six exercises, 100 points and no multiple choice — so read nothing into the length or the time pressure. Use this set for its topics. Problem 4, the binomial replication of debt and equity, is one of the two most valuable exercises in the whole archive for today's syllabus (k22 and k24) and is worked out here in full. No official solution key exists for this sitting: every answer below is derived from scratch and every figure recomputed along a second, independent route. The paper states 48 points per problem without splitting them across sub-questions, so the per-part points shown here are an even split.",
    "exercises": [
      {
        "n": 1,
        "title": "Multiple choice (MC 1–10)",
        "points": 48,
        "topic": "M&A stock swap, MM, agency, real options, APV",
        "chapters": [
          4,
          6,
          10,
          11,
          18,
          25,
          26
        ],
        "body": "<p>Multiple Choice Questions (48 Points): Your score for the following ten multiple-choice questions is fully determined by whether you identify the correct answer. You do NOT need to provide calculations or explanations.</p><p>Consider two firms A and B with the following characteristics:</p><table class=\"data\"><tr><th></th><th>Firm A</th><th>Firm B</th></tr><tr><td>Market price per share</td><td class=\"n\">$200</td><td class=\"n\">$100</td></tr><tr><td>Number of shares</td><td class=\"n\">1,000,000</td><td class=\"n\">500,000</td></tr><tr><td>Market value of firm</td><td class=\"n\">$200 million</td><td class=\"n\">$50 million</td></tr></table><p>Merging the two firms would allow cost savings (or synergies) of $25 million. Suppose that firm A would finance the merger by stock and offers 325,000 shares (that is, 0.325 million shares) in exchange for the 500,000 target shares of firm B.</p>",
        "parts": [
          {
            "label": "1",
            "points": 4.8,
            "body": "<p>What will the new stock price after the merger of firm A and firm B be closest to?</p><p>A. $190<br>B. $195<br>C. $200<br>D. $205</p>",
            "solution": "<p><b>Answer: D ($205).</b></p><p><b>Step 1 &mdash; the combined firm's value.</b> In a stock swap the merged firm is worth the two stand-alone values plus the synergies:</p><p>A + T + S = 200 + 50 + 25 = <b>$275M</b></p><p><b>Step 2 &mdash; the new share count.</b> The acquirer issues 325,000 new shares to the target's owners and keeps its own 1,000,000:</p><p>N<sub>new</sub> = 1,000,000 + 325,000 = <b>1,325,000 shares</b></p><p><b>Step 3 &mdash; divide.</b></p><p>P<sub>new</sub> = $275,000,000 / 1,325,000 = <b>$207.55 per share</b></p><p>Of the four alternatives, $205 is closest. Note that the exchange ratio implied by the offer is 325,000/500,000 = <b>0.65 acquirer shares per target share</b>, which at the new price is worth 0.65 &times; 207.55 = $134.91 per B share &mdash; a 34.9% premium over B's pre-deal price of $100.</p><p><b>The trap.</b> Dividing by 1,000,000 (forgetting the newly issued shares) gives $275, and dividing 250 by 1.325 (forgetting the synergies) gives $188.68. Both are off the answer list, which is the exam's way of telling you the construction is wrong.</p>",
            "criteria": [
              "Values the merged firm as A + T + S = 275, not as A + T.",
              "Adds the 325,000 new shares to the acquirer's 1,000,000 before dividing. Forgetting the issued shares is the standard error and is what separates a stock swap from a cash deal.",
              "P = 275/1.325 = $207.55, closest to $205."
            ]
          },
          {
            "label": "2",
            "points": 4.8,
            "body": "<p>What is the NPV of the transaction for the target shareholders of firm B closest to?</p><p>A. $1million<br>B. $10 million<br>C. $20million<br>D. $25million</p>",
            "solution": "<p><b>Answer: C ($20 million).</b></p><p><b>Step 1 &mdash; what fraction of the merged firm the target's owners end up with.</b></p><p>y = 325,000 / 1,325,000 = <b>0.245283 (24.5283%)</b></p><p><b>Step 2 &mdash; apply the formula-sheet expression.</b></p><p>NPV<sub>target</sub> = y(A + T + S) &minus; T = 0.245283 &times; 275 &minus; 50 = 67.4528 &minus; 50 = <b>$17.45M</b></p><p>Closest to $20 million.</p><p><b>Same number, second route.</b> The target's shareholders receive 325,000 shares that are worth $207.5472 each after the deal: 325,000 &times; 207.5472 = $67,452,830, against the $50,000,000 their shares were worth before. The gain is again <b>$17.45M</b>. &#10003;</p>",
            "criteria": [
              "Computes the target's post-deal ownership fraction y = 325,000/1,325,000 = 24.53%, not 325,000/1,000,000.",
              "NPV = y(A+T+S) − T = 17.45, closest to $20M.",
              "Subtracts the target's PRE-deal value of $50M, not the price per share or the number of shares."
            ]
          },
          {
            "label": "3",
            "points": 4.8,
            "body": "<p>What is the NPV of the transaction for the acquirer shareholders of firm A closest to?</p><p>A. $1million<br>B. $7million<br>C. $12million<br>D. $25million</p>",
            "solution": "<p><b>Answer: B ($7 million).</b></p><p>NPV<sub>acquirer</sub> = (1 &minus; y)(A + T + S) &minus; A = 0.754717 &times; 275 &minus; 200 = 207.5472 &minus; 200 = <b>$7.55M</b></p><p><b>Same number, second route.</b> A's original shareholders still hold their 1,000,000 shares, now worth $207.5472 each, i.e. $207.5472M, against $200M before. Gain = <b>$7.55M</b>. &#10003;</p><p><b>The consistency check that closes the three questions.</b> The two NPVs must exhaust the synergies, because a stock swap creates nothing beyond them and destroys nothing:</p><p>17.45 + 7.55 = <b>25.00 = S</b> &#10003;</p><p>The target captures roughly 70% of the gain and the acquirer 30% &mdash; the usual empirical pattern, and here a direct consequence of the generous 0.65 exchange ratio.</p>",
            "criteria": [
              "NPV = (1−y)(A+T+S) − A = 7.55, closest to $7M.",
              "Runs the check that the two NPVs sum to the synergies of $25M. It costs one line and catches an error in either of the previous two answers.",
              "Does not confuse the acquirer's NPV with the change in the acquirer's share price alone — the share count matters."
            ]
          },
          {
            "label": "4",
            "points": 4.8,
            "body": "<p>Consider the same setting as in parts 1) to 3) with the exception that the synergies are now assumed to be zero. The terms of the offer are unchanged and firm A still offers 325,000 shares. What is the NPV of the transaction for the target shareholders closest to?</p><p>A. $11million<br>B. $12million<br>C. $13million<br>D. $14million</p>",
            "solution": "<p><b>Answer: A ($11 million).</b></p><p>With S = 0 the merged firm is worth only A + T = 200 + 50 = <b>$250M</b>, spread over the same 1,325,000 shares:</p><p>P<sub>new</sub> = 250 / 1.325 = <b>$188.68 per share</b></p><p>NPV<sub>target</sub> = y(A + T) &minus; T = 0.245283 &times; 250 &minus; 50 = 61.3208 &minus; 50 = <b>+$11.32M</b></p><p><b>Second route.</b> 325,000 &times; $188.6792 = $61,320,755, against $50,000,000 before: gain <b>$11.32M</b>. &#10003;</p><p><b>What is going on.</b> With no synergies nothing is created, so the target's gain can only be a transfer out of the acquirer's pocket. A hands over 24.53% of a firm worth $250M &mdash; that is $61.3M of value &mdash; in exchange for assets worth $50M. It is overpaying by $11.3M, and that is exactly the target's gain.</p>",
            "criteria": [
              "Recomputes the merged value as 250, and re-uses the SAME ownership fraction y = 24.5283%, because the number of shares offered has not changed.",
              "NPV = 0.245283 × 250 − 50 = +11.32, closest to $11M.",
              "Recognises that with zero synergies the target's gain is a pure transfer, not value creation."
            ]
          },
          {
            "label": "5",
            "points": 4.8,
            "body": "<p>Consider the same setting as in parts 1) to 3) with the exception that the synergies are now assumed to be zero. The terms of the offer are unchanged and firm A still offers 325,000 shares. What is the NPV of the transaction for the acquirer shareholders closest to?</p><p>A.  - $25million<br>B.  - $11million<br>C.  - $1million<br>D.  +$11million</p>",
            "solution": "<p><b>Answer: B (&minus;$11 million).</b></p><p>NPV<sub>acquirer</sub> = (1 &minus; y)(A + T) &minus; A = 0.754717 &times; 250 &minus; 200 = 188.6792 &minus; 200 = <b>&minus;$11.32M</b></p><p><b>Second route.</b> A's own 1,000,000 shares fall from $200 to $188.6792, a loss of $11.3208 per share, i.e. <b>&minus;$11.32M</b> in total. &#10003;</p><p><b>The check.</b> +11.32 &minus; 11.32 = <b>0 = S</b>. &#10003; With no synergies the deal is exactly zero-sum: every dollar the target gains comes out of the acquirer's shareholders. This is the cleanest possible demonstration that a merger premium is not, by itself, value creation.</p>",
            "criteria": [
              "NPV = (1−y)(A+T) − A = −11.32, closest to −$11M. The sign is the answer: it must be negative.",
              "Checks that the acquirer's loss exactly offsets the target's gain from question 4, because the synergies are zero.",
              "Notices that the acquirer's share price falls from $200 to $188.68 — the same conclusion seen per share."
            ]
          },
          {
            "label": "6",
            "points": 4.8,
            "body": "<p>Which of the following statements is true?</p><p>A) In a perfect capital market, a firm can increase its value by issuing debt (rather than equity) to finance a project, because the cost of debt (rD) is always smaller than the cost of equity (rE).<br>B) In a perfect capital market, purely financial transactions always have a strictly positive NPV.<br>C) Modigliani Miller Proposition II, whereby the cost of equity increases in leverage, is only valid in the presence of bankruptcy costs.<br>D) Statements A, B, and C are false.</p>",
            "solution": "<p><b>Answer: D.</b></p><p><b>A is false.</b> This is the single most common misconception in the course. Yes, r<sub>D</sub> &lt; r<sub>E</sub>. But substituting cheap debt for expensive equity does not lower the WACC, because the substitution raises r<sub>E</sub>: the remaining equity is a levered claim on the same assets and therefore riskier. MM Proposition II says exactly this, r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>), and the two effects cancel to the last decimal, leaving the pre-tax WACC equal to r<sub>U</sub> at every leverage ratio.</p><p><b>B is false.</b> A purely financial transaction &mdash; a recapitalisation, a share repurchase, a dividend, an issue of debt to retire equity &mdash; buys and sells claims at their fair market value. In a perfect market that has an NPV of exactly <b>zero</b>, not a positive one. This is MM Proposition I stated as a transaction rule.</p><p><b>C is false, and backwards.</b> MM II is derived <i>in</i> a perfect capital market, with no bankruptcy costs, no taxes and no asymmetric information. Bankruptcy costs are not required for it; they are one of the frictions that break the tidy MM world, not a precondition for it.</p><p>All three are false, so D is the answer.</p>",
            "criteria": [
              "Rejects A by naming the mechanism: leverage raises r_E by exactly enough to keep the pre-tax WACC at r_U (MM II).",
              "Rejects B: purely financial transactions have zero NPV in a perfect market, not positive.",
              "Rejects C: MM II is a perfect-market result and needs no bankruptcy costs.",
              "The typical mistake is picking A because 'debt is cheaper'. If you catch yourself reasoning that way, you have not yet internalised MM II."
            ]
          },
          {
            "label": "7",
            "points": 4.8,
            "body": "<p>Which of the following situations is most likely to present an example of &laquo;agency costs of free cash flow&raquo;?</p><p>A) A manager of a firm with excess cash holdings and weak corporate governance acquires a number of unrelated businesses to expand the size of her firm.<br>B) A firm pays a special dividend to shareholders.<br>C) A manager of a firm in a mature industry takes on leverage to finance a share repurchase.<br>D) A firm in financial distress sells an underperforming division.</p>",
            "solution": "<p><b>Answer: A.</b></p><p>The free-cash-flow agency problem (Jensen) has three ingredients and A has all three: <b>cash the firm does not need</b>, <b>governance too weak to stop the manager spending it</b>, and <b>spending that serves the manager rather than the shareholders</b>. Buying unrelated businesses to make the firm bigger is the textbook illustration &mdash; empire building. Size raises the manager's pay, prestige and career options, while the shareholders would have been better off receiving the cash.</p><p><b>B is the cure, not the disease.</b> Paying out a special dividend removes the cash from the manager's reach, which is precisely the recommended remedy.</p><p><b>C is also a cure.</b> Leveraging up in a mature, cash-rich industry commits future cash flow to interest payments the manager cannot divert. Debt as a bonding device is the agency <i>benefit</i> of leverage.</p><p><b>D is a different problem entirely.</b> Asset sales in distress belong to the costs of financial distress and possibly to asset fire-sales, not to the agency cost of excess cash &mdash; a distressed firm has no free cash flow to waste.</p>",
            "criteria": [
              "Identifies A and names the mechanism: empire building financed out of free cash flow, enabled by weak governance.",
              "Explains why B and C are the standard REMEDIES (payout and leverage as commitment devices), not examples of the problem.",
              "Does not confuse costs of financial distress (D) with agency costs of free cash flow."
            ]
          },
          {
            "label": "8",
            "points": 4.8,
            "body": "<p>Which of the following statements is true?</p><p>A) According to the static trade-off theory, shareholders can ignore indirect financial distress costs because these costs are borne entirely by debtholders.<br>B) According to the pecking order theory, managers never find it optimal to accumulate cash reserves.<br>C) A debt overhang problem can only arise if a company's debt is risky, but not if the debt is risk-free.<br>D) A company's asset beta is always lower than its equity beta.</p>",
            "solution": "<p><b>Answer: C.</b></p><p><b>C is true, and the reason is worth memorising.</b> Debt overhang is the situation where shareholders decline a positive-NPV project because part of the gain accrues to existing creditors. That transfer can only happen if the creditors are not already certain of being repaid &mdash; i.e. if the debt is <b>risky</b>. If the debt is risk-free, the creditors receive their face value in every state whatever the firm does, the whole of any incremental NPV goes to the shareholders, and they will always take a positive-NPV project. No risk in the debt, no overhang.</p><p><b>A is false.</b> Indirect distress costs &mdash; lost customers, lost suppliers, key employees leaving, fire-sale asset prices, management distraction &mdash; are anticipated by the market and capitalised into the value of the firm <i>today</i>, and it is the shareholders who pay that discount when they issue the debt. In the trade-off theory these costs are precisely what limits optimal leverage; if shareholders could ignore them, leverage would be unbounded.</p><p><b>B is false, and backwards.</b> The pecking order says internal funds are the cheapest source because they avoid the adverse-selection discount on new securities. That is a positive argument for building up cash reserves (financial slack), not against.</p><p><b>D is false because of the word 'always'.</b> &beta;<sub>U</sub> = (E/V)&beta;<sub>E</sub> + (D/V)&beta;<sub>D</sub>, so &beta;<sub>U</sub> &lt; &beta;<sub>E</sub> only when the firm actually has debt and &beta;<sub>D</sub> &lt; &beta;<sub>E</sub>. An unlevered firm has &beta;<sub>U</sub> = &beta;<sub>E</sub> exactly &mdash; equal, not lower &mdash; and a firm with net cash (negative net debt) has an asset beta <i>above</i> its equity beta, which is exactly the situation in Spring 2021 Problem 3.</p>",
            "criteria": [
              "Picks C and can say why: with risk-free debt no value is transferred to creditors, so shareholders capture the full NPV and never decline a good project.",
              "Rejects A by noting that distress costs are anticipated and priced today, so shareholders bear them ex ante — that is the whole basis of the trade-off theory.",
              "Rejects D on the word 'always': an all-equity firm gives equality, and a firm holding net cash gives beta_U > beta_E.",
              "The typical mistake is choosing D because it 'usually' holds. Multiple-choice statements with 'always' or 'never' fail on the boundary case; test the boundary case."
            ]
          },
          {
            "label": "9",
            "points": 4.8,
            "body": "<p>Which of the following statements is true?</p><p>A) One key insight of real options theory is that it may be optimal to delay an investment even if the NPV of undertaking the investment immediately is positive.<br>B) One key insight of real options theory is that a project, which currently has a negative NPV, can never have a positive NPV.<br>C) One key insight of real options theory is that a project's value always decreases with its idiosyncratic risk.<br>D) Statements A, B, and C are false.</p>",
            "solution": "<p><b>Answer: A.</b></p><p><b>A is the central result of the option-to-wait.</b> Investing now is irreversible and kills the option; waiting keeps it alive and lets you condition the decision on information that arrives in the meantime. The correct rule is not &laquo;invest when NPV &gt; 0&raquo; but &laquo;invest when NPV now exceeds the value of the live option to wait&raquo;. When uncertainty is high and the cost of delay (foregone cash flow) is low, that threshold sits well above zero, so a project with a positive NPV today can still be worth postponing.</p><p><b>B is false.</b> Precisely the opposite &mdash; Spring 2021 Problem 4 in this same archive is the counterexample. The drug patent has an NPV of &minus;$2.54M if you must invest today or never, yet the option to wait one year for the interest-rate uncertainty to resolve is worth <b>+$0.313M</b>. A negative-NPV project can be a positive-value asset.</p><p><b>C is false and inverts the logic of options.</b> An option's payoff is one-sided: you exercise only in the good states. More dispersion in the underlying &mdash; whether systematic or idiosyncratic &mdash; adds to the upside you keep and nothing to the downside you can walk away from, so the value of a real option <b>increases</b> with volatility of any kind. That is why real-option value is one of the few places in finance where diversifiable risk raises value rather than being irrelevant.</p>",
            "criteria": [
              "Picks A and gives the reason: exercising kills the option, so the hurdle for investing now is the value of the option to wait, not zero.",
              "Can produce a counterexample to B — a negative-NPV project whose option to wait is positive.",
              "Rejects C by naming the convexity argument: the payoff is one-sided, so value rises with volatility of any kind, idiosyncratic included."
            ]
          },
          {
            "label": "10",
            "points": 4.8,
            "body": "<p>Which of the following statements about the Adjusted Present Value method is true?</p><p>A) The Adjusted Present Value method is based on the assumption that capital markets are perfect.<br>B) If a company maintains a constant debt-to-equity ratio, we use the after-tax WACC to discount the tax shield.<br>C) If a company maintains a fixed, permanent amount of debt, we use the risk-free rate to discount the tax shield.<br>D) Statements A, B, and C are false.</p>",
            "solution": "<p><b>Answer: C.</b></p><p><b>A is false on its face.</b> APV writes V<sup>L</sup> = V<sup>U</sup> + PV(TS). The whole second term exists only because interest is tax-deductible, which is a market imperfection. In a perfect market PV(TS) = 0 and APV collapses into MM Proposition I. APV is a tool <i>for</i> imperfect markets, not an assumption of perfect ones.</p><p><b>B is false, and it is the standard trap.</b> Under a constant debt-to-equity ratio the debt level is rebalanced to track the firm's value, so the tax shield inherits the risk of the firm's <b>assets</b> and is discounted at <b>r<sub>U</sub></b>. The after-tax WACC is never the right rate for the tax shield: the WACC already contains the shield inside it, so discounting the shield at the WACC and then adding it to V<sup>U</sup> would count it twice.</p><p><b>C is the intended true statement.</b> When the debt schedule is fixed and predetermined rather than rebalanced, the interest payments are known in advance, so the tax shield is as risky as the debt and is discounted at the cost of debt r<sub>D</sub>. For the permanent risk-free debt that this course's exercises use &mdash; including Problem 1 of this very paper &mdash; r<sub>D</sub> = r<sub>f</sub>, which gives the familiar closed form PV(TS) = &tau;<sub>c</sub>r<sub>f</sub>D/r<sub>f</sub> = &tau;<sub>c</sub>D.</p><p><b>A word on the imprecision in C.</b> Strictly, the rate for a predetermined debt schedule is r<sub>D</sub>, which coincides with r<sub>f</sub> only if the debt is risk-free; a permanent fixed amount of <i>risky</i> debt would take r<sub>D</sub> &gt; r<sub>f</sub>. The course's own summary treats &laquo;r<sub>D</sub> or r<sub>f</sub> under fixed permanent debt&raquo; as one rule, and since A and B are unambiguously false, C is the only defensible choice. If you meet this question, pick C and do not lose time on the nuance.</p><p><b>The rule, in one line, that you must be able to state cold:</b> constant D/E &rarr; discount the tax shield at r<sub>U</sub>; fixed predetermined debt &rarr; discount it at r<sub>D</sub> (= r<sub>f</sub> when the debt is risk-free).</p>",
            "criteria": [
              "Knows the rule both ways round: constant D/E → r_U; fixed permanent debt → r_D or r_f. An APV multiple-choice question appeared in every paper in this archive that had multiple choice.",
              "Rejects B explicitly: the after-tax WACC already contains the tax shield, so using it to discount the shield double-counts.",
              "Rejects A: APV exists because of a tax imperfection; in a perfect market it reduces to MM I.",
              "The typical mistake is answering D because C names r_f rather than r_D. A and B are unambiguously wrong, so C has to be the answer."
            ]
          }
        ]
      },
      {
        "n": 2,
        "title": "Problem 1 — Debt, the tax shield and net debt",
        "points": 48,
        "topic": "Interest tax shield, net debt, leveraged recapitalisation",
        "chapters": [
          6,
          7,
          15
        ],
        "body": "<p>A firm has 300 million shares outstanding and current earnings before taxes of $900 million. The firm has no debt and the market value of its equity is E=$9'600 million. The corporate tax rate is &tau;=24%. The firm decides to raise $1'000 million worth of risk free debt and will maintain this debt level indefinitely.</p>",
        "parts": [
          {
            "label": "a",
            "points": 16,
            "body": "<p>What is the stock price and the after-tax earnings per share after the debt issue if the firm invests the $1'000 million raised in safe government bonds?</p>",
            "solution": "<p><b>The answer is that nothing happens: the price stays at $32.00 and after-tax EPS stays at $2.28.</b> The point of the question is to see whether you recognise that borrowing in order to hold risk-free securities is not leverage at all.</p><p><b>Step 0 &mdash; the starting point.</b></p><p>P<sub>0</sub> = E/N = $9,600M / 300M = <b>$32.00 per share</b><br>After-tax earnings = 900(1 &minus; 0.24) = <b>$684M</b> &rArr; EPS = 684/300 = <b>$2.28</b></p><p><b>Step 1 &mdash; the earnings, after the transaction.</b> The firm pays interest r<sub>f</sub> &times; $1,000M on the new debt and simultaneously receives interest r<sub>f</sub> &times; $1,000M on the government bonds, because both are risk-free and therefore both carry the same rate. Taxable income is</p><p>EBT = 900 &minus; r<sub>f</sub>(1,000) + r<sub>f</sub>(1,000) = <b>$900M</b>, whatever r<sub>f</sub> is</p><p>The interest deduction is exactly cancelled by the tax on the interest income, so the <b>tax shield is zero</b>. After-tax earnings remain $684M and after-tax EPS remains <b>$2.28</b>. Notice that the exercise never gives you r<sub>f</sub> &mdash; that omission is the hint. If the answer depended on r<sub>f</sub> the question would be unanswerable.</p><p><b>Step 2 &mdash; the balance sheet, and the price.</b> Assets are now the operating business, still worth $9,600M unlevered, plus $1,000M of government bonds. Liabilities are $1,000M of debt.</p><p>V = 9,600 + 1,000 = $10,600M<br>E = V &minus; D = 10,600 &minus; 1,000 = <b>$9,600M</b><br>P = 9,600/300 = <b>$32.00 per share</b> (unchanged)</p><p><b>Name the mechanism.</b> Leverage is measured by <b>net debt</b>, D &minus; cash and risk-free securities. Here net debt = 1,000 &minus; 1,000 = <b>0</b>, so the firm is still effectively unlevered, and an unlevered firm has no interest tax shield. Gross debt of $1,000M on the balance sheet is cosmetic.</p><p><b>The trap.</b> Writing V<sup>L</sup> = V<sup>U</sup> + &tau;<sub>c</sub>D = 9,600 + 240 = $9,840M and concluding P = $32.80 is the error the question is built to catch. That formula assumes the borrowed money is handed to shareholders or invested in the operating business, so that the interest deduction is not offset by taxable interest income. Here it is offset, dollar for dollar. Keep $32.80 in reserve &mdash; it is the right answer to part (b).</p>",
            "criteria": [
              "States both required numbers: share price $32.00 and after-tax EPS $2.28, and says explicitly that both are UNCHANGED.",
              "Gives the reason, which is the whole exercise: the interest paid on the debt is exactly offset by the taxable interest received on the government bonds, so the net tax shield is zero.",
              "Names the concept: net debt = gross debt − cash and risk-free securities = 0, so the firm is still effectively unlevered.",
              "Notices that the risk-free rate is deliberately not given, which is only possible because the two interest flows cancel.",
              "The typical mistake is applying V^L = V^U + τ_c·D mechanically to get $32.80. That formula requires the borrowing to be genuine leverage; it is not when the proceeds sit in risk-free bonds."
            ]
          },
          {
            "label": "b",
            "points": 16,
            "body": "<p>The firm uses all the funds raised with the debt issue to repurchase shares. What is the stock price after the share repurchase?</p>",
            "solution": "<p>Now the debt is real leverage: the cash leaves the firm, and there is no offsetting interest income to tax.</p><p><b>Step 1 &mdash; the value of the tax shield.</b> The debt is risk-free and permanent, so the shield is a risk-free perpetuity of &tau;<sub>c</sub>r<sub>f</sub>D discounted at r<sub>f</sub>:</p><p>PV(TS) = &tau;<sub>c</sub>r<sub>f</sub>D / r<sub>f</sub> = &tau;<sub>c</sub>D = 0.24 &times; 1,000 = <b>$240M</b></p><p>V<sup>L</sup> = V<sup>U</sup> + &tau;<sub>c</sub>D = 9,600 + 240 = <b>$9,840M</b></p><p><b>Step 2 &mdash; the announcement.</b> The market capitalises the shield immediately, while the shares outstanding are still 300M and no debt has yet been issued:</p><p>P<sub>announcement</sub> = 9,840 / 300 = <b>$32.80 per share</b></p><p>The whole $240M of the shield accrues to the <b>existing</b> shareholders, because they own the firm at the moment the news arrives. That is $0.80 per share.</p><p><b>Step 3 &mdash; the repurchase.</b> The firm issues $1,000M of debt and buys shares back at the post-announcement price, which is the only price at which anyone would sell:</p><p>Shares repurchased = 1,000 / 32.80 = <b>30.4878M shares</b><br>Shares remaining = 300 &minus; 30.4878 = <b>269.5122M</b></p><p><b>Step 4 &mdash; the price afterwards.</b></p><p>E = V<sup>L</sup> &minus; D = 9,840 &minus; 1,000 = $8,840M<br>P = 8,840 / 269.5122 = <b>$32.80 per share</b></p><p><b>Consistency check.</b> The price after the repurchase must equal the price at announcement, because a repurchase at the fair market price is a zero-NPV transaction: the firm hands over $1,000M of cash and retires exactly $1,000M of market value of equity. If your two numbers differ, you have repurchased at the wrong price. Here 8,840/269.5122 = 32.80 &#10003;</p><p><b>Second route to the same answer.</b> The gain to a shareholder is the shield spread over the pre-existing shares: &tau;<sub>c</sub>D/N = 240/300 = $0.80, so P = 32.00 + 0.80 = <b>$32.80</b>. &#10003;</p>",
            "criteria": [
              "PV(TS) = τ_c·D = $240M, with the reasoning for the closed form: permanent risk-free debt, so the perpetual shield τ_c·r_f·D discounted at r_f collapses to τ_c·D.",
              "Separates announcement from execution: the price rises to $32.80 on announcement, on the OLD share count of 300M, and the whole gain goes to existing shareholders.",
              "Repurchases at $32.80, not at $32.00. Buying back at the pre-announcement price would hand a windfall to the firm and is the classic error.",
              "Shares retired = 1000/32.80 = 30.4878M, leaving 269.5122M.",
              "Final price = 8,840/269.5122 = $32.80, and states that it MUST equal the announcement price because a repurchase at fair value is zero-NPV. That check is worth writing down."
            ]
          },
          {
            "label": "c",
            "points": 16,
            "body": "<p>In which situation(s) are the firm's shareholders better off?</p><ul><li>No debt issued, no shares repurchased</li><li>Debt issued but no shares repurchased</li><li>Debt issued and shares repurchased</li></ul>",
            "solution": "<table class=\"data\"><tr><th>Situation</th><th>Net debt</th><th>PV(tax shield)</th><th>Value per share</th></tr><tr><td>No debt issued, no repurchase</td><td class=\"n\">0</td><td class=\"n\">$0M</td><td class=\"n\">$32.00</td></tr><tr><td>Debt issued, proceeds in government bonds</td><td class=\"n\">0</td><td class=\"n\">$0M</td><td class=\"n\">$32.00</td></tr><tr><td>Debt issued and shares repurchased</td><td class=\"n\">$1,000M</td><td class=\"n\">$240M</td><td class=\"n\">$32.80</td></tr></table><p><b>Shareholders are better off only in the third situation</b>, and they are better off by exactly $0.80 per share, or $240M in total &mdash; the present value of the interest tax shield.</p><p><b>The first two situations are identical for shareholders.</b> Both leave the firm with zero net debt. Issuing $1,000M of debt and parking the proceeds in risk-free government bonds changes the size of the balance sheet and nothing else: the interest deduction is cancelled by the tax on the interest income, so no value is created. A shareholder cannot tell the two apart from his own position.</p><p><b>Why the third differs.</b> The repurchase takes the $1,000M out of the firm and hands it to shareholders, leaving the debt behind with nothing to offset its interest deduction. Only then does the firm actually shelter $240M of taxes from the government, and in a world where the corporate tax is the only friction, that transfer from the tax authority to the shareholders is the entire gain.</p><p><b>What the answer would look like with the frictions the question leaves out.</b> The question is set in the corporate-tax-only world, so the conclusion is &laquo;more leverage is better&raquo;. In practice the third situation also brings expected costs of financial distress and the agency costs of debt, and personal taxes shrink the effective tax advantage below &tau;<sub>c</sub>. The trade-off theory is where the optimum stops short of infinite leverage. Saying this in one sentence is the difference between a correct answer and a complete one.</p>",
            "criteria": [
              "Answers the question asked: only the third situation makes shareholders better off, by $0.80 per share.",
              "States that the first two are EQUIVALENT, and gives the reason: both leave net debt at zero, so neither generates a tax shield.",
              "Quantifies the gain as PV(TS) = τ_c·D = $240M and identifies it as a transfer from the tax authority, not value created out of thin air.",
              "The typical mistake is ranking the second situation between the other two, on the grounds that 'some' shield is created. None is.",
              "A closing sentence on what the corporate-tax-only framing leaves out — distress costs, agency costs, personal taxes — is what turns a correct answer into a full-marks one."
            ]
          }
        ]
      },
      {
        "n": 3,
        "title": "Problem 2 — Asymmetric information and Myers-Majluf",
        "points": 48,
        "topic": "Asymmetric information, adverse selection, underinvestment",
        "chapters": [
          12,
          13
        ],
        "body": "<p>Consider an entrepreneur who has an idea for a project. The project will generate a cash flow of $160 in case of success and a cash flow of $40 in case of failure. The project comes in one of two possible varieties, namely &laquo;good&laquo; or &laquo;bad&laquo;: If the project is good, the probability of success is &frac34; and the probablity of failure is &frac14;.  If the project is bad, the probability of success is &frac14; and the probablity of failure is &frac34;. The project requires an initial investment of $50. The entrepreneur has no funds. The only way to finance the project is by issuing equity to investors in a competitive stock market. Everyone is risk neutral and there is no discounting.</p>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>Suppose that there is symmetric information about the quality of the project, meaning that both the entrepreneur and investors know whether the entrepreneur's project is good or bad. Let &alpha; denote the fraction of the project's equity that is given to investors. The entrepreneur retains the remaining equity stake (1-&alpha;). Will investors provide funding of $50 to the entrepreneur if the project is good? If so, what fraction &alpha; has to be issued to investors? Will investors provide funding of $50 to the entrepreneur if the project is bad? If so, what fraction &alpha; has to be issued to investors? What is the value of the entrepreneur's equity stake in each of the two cases?</p>",
            "solution": "<p><b>Step 1 &mdash; value each type of project.</b> Risk neutrality and no discounting mean value = expected cash flow.</p><table class=\"data\"><tr><th>Type</th><th>P(success)</th><th>Expected cash flow</th><th>Stand-alone NPV</th></tr><tr><td>Good</td><td class=\"n\">3/4</td><td class=\"n\">&frac34;(160) + &frac14;(40) = <b>$130</b></td><td class=\"n\">130 &minus; 50 = <b>+$80</b></td></tr><tr><td>Bad</td><td class=\"n\">1/4</td><td class=\"n\">&frac14;(160) + &frac34;(40) = <b>$70</b></td><td class=\"n\">70 &minus; 50 = <b>+$20</b></td></tr></table><p><b>Step 2 &mdash; the good project.</b> The stock market is competitive, so investors must break even exactly:</p><p>&alpha;<sup>good</sup> &times; 130 = 50 &rArr; <b>&alpha;<sup>good</sup> = 50/130 = 5/13 = 0.3846</b></p><p>Since &alpha; &le; 1 the financing is feasible, so <b>yes, investors fund the good project</b>. The entrepreneur keeps</p><p>(1 &minus; 5/13) &times; 130 = (8/13) &times; 130 = <b>$80</b></p><p><b>Step 3 &mdash; the bad project.</b></p><p>&alpha;<sup>bad</sup> &times; 70 = 50 &rArr; <b>&alpha;<sup>bad</sup> = 50/70 = 5/7 = 0.7143</b></p><p>Again &alpha; &le; 1, so <b>yes, investors fund the bad project too</b>. The entrepreneur keeps</p><p>(1 &minus; 5/7) &times; 70 = (2/7) &times; 70 = <b>$20</b></p><p><b>Consistency check &mdash; the one that proves the logic.</b> In a competitive market investors earn zero NPV, so the entrepreneur must capture the entire NPV of his project. And he does: $80 for the good project and $20 for the bad one, exactly the stand-alone NPVs computed in Step 1. &#10003;</p><p><b>The economics.</b> With symmetric information the outcome is first best. Both projects are positive-NPV and both get built; the price of the equity adjusts to the true quality, so a bad entrepreneur simply has to give away a bigger stake (71.4% instead of 38.5%) for the same $50.</p>",
            "criteria": [
              "Values each type as its expected cash flow, $130 and $70, because everyone is risk neutral and there is no discounting.",
              "Uses the break-even condition of a COMPETITIVE market, α·V = 50 with equality, not an inequality left unsolved.",
              "α_good = 5/13 = 38.46% and α_bad = 5/7 = 71.43%, and states explicitly that both projects get funded because both fractions are below 1.",
              "Entrepreneur's stakes = $80 and $20.",
              "Runs the check that the entrepreneur's stake equals the project's NPV. This is not decoration: it is the fastest way to catch an arithmetic slip, and it makes the zero-NPV condition for investors visible."
            ]
          },
          {
            "label": "b",
            "points": 12,
            "body": "<p>Suppose now that there is asymmetric information about the quality of the project. While the entrepreneur knows whether her project is good or bad, investors do not know the true quality. They believe that the entrepreneur's project is good with probability &frac12; and bad with probability &frac12;. What fraction &alpha; of the project's equity does the entrepreneur have to issue to raise $50? What is the value of the entrepreneur's equity stake if her project is good? What is the value of the entrepreneur's equity stake if her project is bad? Compare your results to part a) and discuss.</p>",
            "solution": "<p><b>Step 1 &mdash; investors price on their beliefs, not on the truth.</b> The perceived value of the project is</p><p>E[V | beliefs] = &frac12;(130) + &frac12;(70) = <b>$100</b></p><p>&alpha; &times; 100 = 50 &rArr; <b>&alpha; = 0.50 (50%)</b></p><p><b>Step 2 &mdash; what the entrepreneur is actually left with.</b> The stake she keeps is worth (1 &minus; &alpha;) times the <i>true</i> value:</p><table class=\"data\"><tr><th>True type</th><th>Stake under symmetric info (a)</th><th>Stake under asymmetric info (b)</th><th>Difference</th></tr><tr><td>Good</td><td class=\"n\">$80</td><td class=\"n\">0.5 &times; 130 = <b>$65</b></td><td class=\"n\">&minus;$15</td></tr><tr><td>Bad</td><td class=\"n\">$20</td><td class=\"n\">0.5 &times; 70 = <b>$35</b></td><td class=\"n\">+$15</td></tr></table><p><b>Step 3 &mdash; the discussion the question asks for.</b></p><p><b>1. Both projects are still financed, and both should be.</b> &alpha; = 0.5 &le; 1 is feasible, and both types are positive-NPV, so the investment decision is unchanged and there is no efficiency loss here. Asymmetric information at this investment size is a pure <b>redistribution</b>.</p><p><b>2. The direction of the transfer is the point.</b> The good entrepreneur is pooled with the bad one and therefore sells her equity at a discount to its true worth: she gives up 50% of a $130 project for $50, when 38.5% would have sufficed. She loses $15. The bad entrepreneur is subsidised by exactly the same $15, because she sells 50% of a $70 project for $50 when she should have had to give up 71.4%. This is <b>adverse selection</b>: the market prices the average, so the good type is penalised and the bad type is rewarded.</p><p><b>3. Investors still break even.</b> &alpha; &times; E[V] = 0.5 &times; 100 = $50 &#10003;, and the transfer nets to zero across the two types: &minus;15 and +15.</p><p><b>4. Are the beliefs rational?</b> Yes, and you must say so. Both types issue equity, so the population of issuers is exactly the population of entrepreneurs, and the posterior belief conditional on seeing an equity issue really is &frac12;/&frac12;. This is a <b>pooling equilibrium</b>, and it is self-consistent. Verifying the rationality of beliefs is not optional in this course; computing &alpha; and stopping is a half answer.</p><p><b>5. The seed of the pecking order.</b> The good entrepreneur would strictly prefer any financing instrument whose value is less sensitive to private information &mdash; internal funds first, then debt, and equity last. That preference, generalised, is the pecking order theory.</p>",
            "criteria": [
              "Prices the equity off the investors' BELIEFS: E[V] = ½(130) + ½(70) = 100, hence α = 50%.",
              "Values the retained stake at the TRUE value of the project: $65 if good, $35 if bad. Multiplying (1−α) by the perceived $100 in both cases is the standard error and destroys the whole point.",
              "Compares with part (a) and identifies the $15 transfer from the good type to the bad type, naming it adverse selection.",
              "Notes that both projects are still financed, so the distortion here is purely distributional — there is no underinvestment yet.",
              "Checks that the beliefs are rational: both types issue, so the ½/½ posterior conditional on issuing is correct and the pooling equilibrium is self-consistent. The course keys demand this step explicitly.",
              "A sentence linking the good type's loss to the pecking order earns the mechanism credit."
            ]
          },
          {
            "label": "c",
            "points": 12,
            "body": "<p>How do your answers to part a) change if the project requires an investment of $120 instead of $50? Discuss your results.</p>",
            "solution": "<p>Symmetric information again, but the outlay is now $120.</p><p><b>Good project.</b> NPV = 130 &minus; 120 = <b>+$10</b>, still positive.</p><p>&alpha;<sup>good</sup> = 120/130 = <b>12/13 = 0.9231 (92.31%)</b></p><p>This is below 1, so the project is <b>still financed</b>. The entrepreneur keeps (1/13)(130) = <b>$10</b> &mdash; again exactly the NPV. &#10003;</p><p><b>Bad project.</b> NPV = 70 &minus; 120 = <b>&minus;$50</b>, negative.</p><p>&alpha;<sup>bad</sup> = 120/70 = <b>1.714</b>, which is impossible: you cannot sell more than 100% of the equity.</p><p>Even handing investors the entire project gives them $70 against an outlay of $120, so they lose $50. <b>The bad project cannot be financed and is not undertaken.</b> The entrepreneur's stake is <b>$0</b>.</p><p><b>Discussion.</b> Under symmetric information the market does precisely the right thing at every investment size. The positive-NPV project is built; the negative-NPV project is refused. The rejection is not a market failure &mdash; it is the market correctly declining to destroy $50 of value. The infeasibility condition is worth stating as a rule: <b>a project can be equity-financed if and only if its expected value is at least the required investment, i.e. exactly when its NPV is non-negative.</b> Under symmetric information &laquo;financeable&raquo; and &laquo;worth doing&raquo; are the same condition. Part (d) is where those two come apart.</p>",
            "criteria": [
              "Good project: α = 12/13 = 92.31%, still feasible, entrepreneur keeps $10 = the NPV.",
              "Bad project: α = 120/70 = 1.71 > 1, therefore infeasible. Says in words WHY — investors would need more than the whole firm to break even.",
              "Concludes that the bad project is not undertaken, and that this is the efficient outcome because its NPV is −$50.",
              "States the general rule: under symmetric information a project is financeable exactly when its NPV ≥ 0, so financing constraints never distort investment.",
              "The typical mistake is reporting α = 1.71 as a number without noticing it is impossible, or capping it at 1 and concluding the project goes ahead."
            ]
          },
          {
            "label": "d",
            "points": 12,
            "body": "<p>How do your answers to part b) change if the project requires an investment of $120 instead of $50? Remember that under the information structure in part b), investors cannot distinguish between a good and a bad project and believe that the entrepreneur's project is good with probability &frac12; and bad with probability &frac12;. Discuss your results.</p>",
            "solution": "<p><b>Step 1 &mdash; try to price the issue.</b> Investors still value the project at their perceived E[V] = &frac12;(130) + &frac12;(70) = <b>$100</b>. The break-even fraction is</p><p>&alpha; = 120/100 = <b>1.20 &gt; 1</b></p><p>Impossible. <b>No financing takes place, and neither project is undertaken.</b> The entrepreneur's stake is $0 whether her project is good or bad.</p><p><b>Step 2 &mdash; the result is stronger than it looks.</b> The argument does not depend on equity being the instrument. The most any security can be worth to outside investors, given the &frac12;/&frac12; belief, is the whole perceived firm value of $100. Since $100 &lt; $120, <b>no security whatsoever</b> &mdash; equity, debt, convertibles, any combination &mdash; can raise $120 under these beliefs. The market for this project simply shuts down.</p><p><b>Step 3 &mdash; what has been lost.</b></p><table class=\"data\"><tr><th>True type</th><th>Symmetric info, I = 120 (part c)</th><th>Asymmetric info, I = 120</th><th>Loss</th></tr><tr><td>Good</td><td class=\"n\">Financed, entrepreneur keeps $10</td><td class=\"n\">Not financed, $0</td><td class=\"n\">&minus;$10</td></tr><tr><td>Bad</td><td class=\"n\">Not financed, $0</td><td class=\"n\">Not financed, $0</td><td class=\"n\">0</td></tr></table><p>The good project, worth $130 against a cost of $120, is <b>not built</b>. Its $10 of NPV is destroyed outright, and with probability &frac12; that is an expected deadweight loss of $5. Compare part (b), where asymmetric information only moved $15 between the two types and every project still got built. The difference between the two parts is the whole lesson: <b>adverse selection is a transfer when the project has a large NPV cushion and becomes real underinvestment when the cushion is thin.</b> The good project's cushion here is only $10, and the $30 subsidy it would have to pay to the bad type is far bigger than that.</p><p><b>Step 4 &mdash; are the beliefs rational?</b> Yes, trivially: nobody issues, so the &frac12;/&frac12; belief is never tested on the equilibrium path and cannot be contradicted. It is worth asking the sharper question &mdash; could investors instead believe that any issuer must be good? Then &alpha; = 120/130 = 92.31%, the good type would issue and keep $10, but the bad type would immediately mimic her, since (1 &minus; 0.9231)(70) = $5.38 &gt; $0. Once both types issue, investors are back to the &frac12;/&frac12; belief and back to &alpha; = 1.2. The optimistic belief therefore unravels, and <b>no financing is the only sustainable outcome</b>.</p><p><b>Name it.</b> This is the Myers-Majluf underinvestment result and, more generally, Akerlof's market for lemons: the good type cannot credibly separate herself, so the price collapses to the pooled average and the market disappears. Real-world responses &mdash; building up financial slack so you never have to issue under duress, issuing debt rather than equity, and signalling through insider ownership &mdash; are all attempts to escape exactly this.</p>",
            "criteria": [
              "α = 120/100 = 1.2 > 1, therefore no financing and NEITHER project is undertaken.",
              "Identifies the loss: the good project has a positive NPV of $10 and is nevertheless not built. This is genuine underinvestment, not a transfer.",
              "Contrasts explicitly with part (b), where the same information problem cost nobody a project because the NPV cushion was large enough to absorb the subsidy.",
              "Names the mechanism: Myers-Majluf underinvestment / adverse selection / the lemons problem.",
              "Full marks for checking whether an optimistic belief could survive: if investors believed any issuer were good, the bad type would mimic (gaining $5.38), which drags the belief back to ½/½. That unravelling argument is the course's 'are the beliefs rational' step applied here.",
              "The strongest version of the answer notes that no security at all can raise $120, since the perceived firm is worth only $100 — so the conclusion does not depend on equity being the instrument.",
              "The typical mistake is concluding that only the bad project fails, by analogy with part (c). Under pooling the good project fails too, and that is the entire result."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Problem 3 — Shakespeare Ltd: FCF, twin firm and WACC valuation",
        "points": 48,
        "topic": "Free cash flow, unlevering a comparable, WACC valuation",
        "chapters": [
          2,
          3,
          4,
          17,
          20
        ],
        "body": "<p>At the end of 2022, you are considering acquiring the troubled publishing company Shakespeare Ltd.  You believe that you can turn the company around by growing sales, improving distribution, and reducing costs. You plan to gradually reduce the inventory (all other current assets and current liabilities remain unchanged). This plan will take three years to implement, after which you expect free cash flows to grow at the industry growth rate of 5% per year in perpetuity.</p><p>The corporate tax rate is 40%. To value the investment, you consider the three-year projections given below. Note that the interest payments are based on Shakespeare's historical debt level of $160m and the risk-free rate of 5%.</p><table class=\"data\"><tr><th>All numbers in $M</th><th>2023</th><th>2024</th><th>2025</th></tr><tr><td>1 Revenue</td><td class=\"n\">100</td><td class=\"n\">120</td><td class=\"n\">140</td></tr><tr><td>2 Cost of Goods Sold</td><td class=\"n\">80</td><td class=\"n\">60</td><td class=\"n\">70</td></tr><tr><td>3 SG&amp;A</td><td class=\"n\">10</td><td class=\"n\">10</td><td class=\"n\">10</td></tr><tr><td>4 Depreciation</td><td class=\"n\">10</td><td class=\"n\">10</td><td class=\"n\">10</td></tr><tr><td>5 CAPX</td><td class=\"n\">10</td><td class=\"n\">10</td><td class=\"n\">10</td></tr><tr><td>6 Inventory Reduction</td><td class=\"n\">0</td><td class=\"n\">6</td><td class=\"n\">5</td></tr><tr><td>7 Interest Payment</td><td class=\"n\">8</td><td class=\"n\">8</td><td class=\"n\">8</td></tr><tr><td>8 Pre-tax Profits EBIT</td><td class=\"n\">0</td><td class=\"n\">40</td><td class=\"n\">50</td></tr></table>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>Calculate the free cash flows for the all-equity financed firm (excluding the terminal value) for the three years 2023, 2024, and 2025.</p>",
            "solution": "<p><b>The formula, from the exam sheet:</b> FCF = EBIT(1 &minus; &tau;<sub>c</sub>) + Depreciation &minus; CapEx &minus; &Delta;NWC</p><p><b>Two things must be handled correctly before anything else.</b></p><p><b>1. Interest never enters free cash flow.</b> Row 7 is a distractor. FCF is the cash the <i>assets</i> throw off, before any financing decision; leverage is dealt with in the discount rate (part c). Subtracting the $8M of interest, or taxing the profit after interest, corrupts every later number. The exercise even tells you the interest is computed off the historical debt of $160M, which you are about to replace &mdash; another signal that it is irrelevant here.</p><p><b>2. Row 8 really is EBIT.</b> The label &laquo;Pre-tax Profits EBIT&raquo; is ambiguous, so verify it: Revenue &minus; COGS &minus; SG&amp;A &minus; Depreciation = 100 &minus; 80 &minus; 10 &minus; 10 = 0 &#10003;, 120 &minus; 60 &minus; 10 &minus; 10 = 40 &#10003;, 140 &minus; 70 &minus; 10 &minus; 10 = 50 &#10003;. The row is earnings <i>before</i> interest, as required.</p><p><b>3. An inventory reduction is a negative &Delta;NWC.</b> Inventory is a current asset, so cutting it releases cash: &minus;&Delta;NWC = +Inventory Reduction. All other working-capital items are stated to be unchanged, so there is nothing else to add.</p><table class=\"data\"><tr><th>$M</th><th>2023</th><th>2024</th><th>2025</th></tr><tr><td>EBIT</td><td class=\"n\">0</td><td class=\"n\">40</td><td class=\"n\">50</td></tr><tr><td>EBIT(1 &minus; 0.40)</td><td class=\"n\">0</td><td class=\"n\">24</td><td class=\"n\">30</td></tr><tr><td>+ Depreciation</td><td class=\"n\">+10</td><td class=\"n\">+10</td><td class=\"n\">+10</td></tr><tr><td>&minus; CapEx</td><td class=\"n\">&minus;10</td><td class=\"n\">&minus;10</td><td class=\"n\">&minus;10</td></tr><tr><td>&minus; &Delta;NWC (= + inventory reduction)</td><td class=\"n\">0</td><td class=\"n\">+6</td><td class=\"n\">+5</td></tr><tr><td><b>Free cash flow</b></td><td class=\"n\"><b>0</b></td><td class=\"n\"><b>30</b></td><td class=\"n\"><b>35</b></td></tr></table><p><b>FCF<sub>2023</sub> = $0M, FCF<sub>2024</sub> = $30M, FCF<sub>2025</sub> = $35M.</b></p><p>Note in passing that depreciation and CapEx are equal in every year, so they cancel; the whole of the cash flow comes from after-tax EBIT plus the working capital released.</p>",
            "criteria": [
              "Excludes the interest payment entirely. FCF is unlevered by construction, and taxing profit after interest is the single most damaging error in the exercise because it cascades into part (d).",
              "Verifies that row 8 is EBIT (Revenue − COGS − SG&A − Depreciation), not earnings after interest.",
              "Treats the inventory reduction as a release of working capital, i.e. ADDS it: −ΔNWC = +6 in 2024 and +5 in 2025.",
              "Adds back depreciation and subtracts CapEx (here they cancel).",
              "Answers 0, 30, 35 for 2023, 2024, 2025.",
              "The 2023 zero is not a mistake — EBIT is zero that year, and depreciation and CapEx offset. Do not 'fix' it."
            ]
          },
          {
            "label": "b",
            "points": 12,
            "body": "<p>Currently Shakespeare is a privately held firm, so its equity and debt are not publicly traded. However, one publicly traded firm, Marvel Corp, is in a similar line of business, and has an equity beta of 1.6. Marvel has $300 million of debt on its balance sheet. This debt is risk-free, and historically Marvel has kept its D/D+E ratio constant at 25%. The market risk premium is 7%, and the risk-free interest rate is 5% as assumed above.</p><p>What is the asset beta of Marvel?</p>",
            "solution": "<p>This is the first half of the twin-firm routine: Shakespeare is private and has no observable beta, so you borrow the business risk of a listed comparable and strip out that comparable's financing.</p><p><b>Step 1 &mdash; the weights.</b> D/(D+E) = 0.25 is given directly, so E/(D+E) = <b>0.75</b>. (The $300M of debt implies E = $900M and V = $1,200M, but the ratio is all you need.)</p><p><b>Step 2 &mdash; the debt beta.</b> Marvel's debt is risk-free, so <b>&beta;<sub>D</sub> = 0</b>.</p><p><b>Step 3 &mdash; unlever.</b> The course convention weights the betas <i>without</i> any tax term:</p><p>&beta;<sub>U</sub> = [E/(E+D)]&beta;<sub>E</sub> + [D/(E+D)]&beta;<sub>D</sub> = 0.75(1.6) + 0.25(0) = <b>1.2000</b></p><p><b>Sanity check on the direction.</b> Unlevering must always <i>reduce</i> the beta, because you are removing the financial risk that leverage added: 1.2 &lt; 1.6 &#10003;. A number above 1.6 means you have relevered instead of unlevered.</p><p><b>Why this is legitimate.</b> Marvel is in a similar line of business, so its asset beta is a usable estimate of Shakespeare's asset beta. What differs between the two firms is capital structure, and that is exactly what &beta;<sub>U</sub> strips out. Never use Marvel's <i>equity</i> beta of 1.6 for Shakespeare: Shakespeare will run at D/V = 1/3, not 1/4.</p>",
            "criteria": [
              "Uses the given D/V = 0.25 directly, so E/V = 0.75. Converting to a D/E of 0.25 by mistake would give weights of 0.8 and 0.2 and the wrong answer.",
              "beta_D = 0 because Marvel's debt is stated to be risk-free.",
              "beta_U = 0.75(1.6) = 1.2000, using the untaxed weighting convention.",
              "Checks the direction: unlevering lowers the beta, 1.2 < 1.6.",
              "The typical mistake is carrying Marvel's equity beta of 1.6 straight over to Shakespeare — that imports Marvel's leverage along with its business risk."
            ]
          },
          {
            "label": "c",
            "points": 12,
            "body": "<p>Shakespeare currently has $160 million of long-term risk-free debt on its balance sheet and it has maintained this amount historically. However, after the acquisition, you plan to change the capital structure to maintain a constant debt to value ratio, D/(D+E), of 1/3. The debt you issue is risk-free.</p><p>What is the appropriate WACC rate for Shakespeare?</p>",
            "solution": "<p><b>Step 1 &mdash; the unlevered cost of capital.</b> Shakespeare inherits Marvel's asset beta of 1.2, and CAPM converts it into a rate:</p><p>r<sub>U</sub> = r<sub>f</sub> + &beta;<sub>U</sub>(MRP) = 0.05 + 1.2(0.07) = 0.05 + 0.084 = <b>0.1340 (13.4000%)</b></p><p><b>Step 2 &mdash; the after-tax WACC at Shakespeare's own leverage.</b> The debt Shakespeare will issue is risk-free, so r<sub>D</sub> = r<sub>f</sub> = 5%, and d = D/V = 1/3. Use the shortcut:</p><p>r<sub>wacc</sub> = r<sub>U</sub> &minus; d&middot;&tau;<sub>c</sub>&middot;r<sub>D</sub> = 0.1340 &minus; (1/3)(0.40)(0.05) = 0.1340 &minus; 0.0066667 = <b>0.1273 (12.7333%)</b></p><p><b>Step 3 &mdash; verify along the long route, which is the version the formula sheet gives.</b> Relever the beta to Shakespeare's own structure, with E/V = 2/3:</p><p>&beta;<sub>E</sub> = [&beta;<sub>U</sub> &minus; (D/V)&beta;<sub>D</sub>]/(E/V) = 1.2 / (2/3) = <b>1.8000</b><br>r<sub>E</sub> = 0.05 + 1.8(0.07) = <b>0.1760 (17.6000%)</b><br>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>) = (2/3)(0.176) + (1/3)(0.05)(0.60)<br>= 0.1173333 + 0.0100000 = <b>0.1273333</b> &#10003;</p><p>The two routes agree to the last decimal, which confirms both the unlevering in part (b) and the relevering here.</p><p><b>Two things the exercise is testing that are easy to miss.</b> First, the historical $160M of debt and the $8M of interest are <b>irrelevant</b> to the discount rate: you are valuing the company under the capital structure you intend to run, D/V = 1/3, not the one it had. Second, the constant-D/V policy is what makes the WACC method legitimate here in the first place; with a fixed dollar debt schedule you would have to use APV instead.</p>",
            "criteria": [
              "r_U = 5% + 1.2(7%) = 13.40%, using the asset beta from part (b) and the market risk PREMIUM of 7%, not a market return.",
              "r_D = r_f = 5% because the new debt is stated to be risk-free.",
              "Uses Shakespeare's target D/V = 1/3, not Marvel's 1/4 and not the historical $160M of debt.",
              "r_wacc = 12.7333%, obtained either from the shortcut r_U − d·τ_c·r_D or by relevering to beta_E = 1.8 and applying the formula-sheet WACC. Showing both is a free consistency check.",
              "Applies (1 − τ_c) to r_D only, never to r_E.",
              "Four decimal places on the rate, as this course expects."
            ]
          },
          {
            "label": "d",
            "points": 12,
            "body": "<p>Using the WACC rate calculated above, what is the enterprise value of Shakespeare?</p>",
            "solution": "<p><b>Step 1 &mdash; the terminal value.</b> Free cash flow grows at g = 5% in perpetuity after 2025, so the value at the end of 2025 of everything from 2026 onwards is a growing perpetuity:</p><p>TV<sub>2025</sub> = FCF<sub>2025</sub>(1 + g) / (r<sub>wacc</sub> &minus; g) = 35(1.05) / (0.1273333 &minus; 0.05) = 36.75 / 0.0773333 = <b>$475.2155M</b></p><p>Note the numerator: the perpetuity formula needs the <i>next</i> cash flow, 36.75, not the current 35. And note the placement: TV<sub>2025</sub> sits at the end of 2025, so it is discounted three years, alongside FCF<sub>2025</sub>, never four.</p><p><b>Step 2 &mdash; discount everything to end-2022.</b> Discount factors at 12.7333%: 1.127333, 1.270880, 1.432706.</p><table class=\"data\"><tr><th>Year</th><th>Cash flow</th><th>Discount factor</th><th>Present value</th></tr><tr><td>2023</td><td class=\"n\">0</td><td class=\"n\">1.1273</td><td class=\"n\">0.0000</td></tr><tr><td>2024</td><td class=\"n\">30</td><td class=\"n\">1.2709</td><td class=\"n\">23.6057</td></tr><tr><td>2025</td><td class=\"n\">35</td><td class=\"n\">1.4327</td><td class=\"n\">24.4293</td></tr><tr><td>2025 (terminal value)</td><td class=\"n\">475.2155</td><td class=\"n\">1.4327</td><td class=\"n\">331.6909</td></tr><tr><td><b>Enterprise value</b></td><td class=\"n\"></td><td class=\"n\"></td><td class=\"n\"><b>379.7259</b></td></tr></table><p><b>Enterprise value = $379.73M.</b></p><p><b>Second route, as a check.</b> Roll the value backwards one year at a time, V<sub>t</sub> = (FCF<sub>t+1</sub> + V<sub>t+1</sub>)/(1 + r<sub>wacc</sub>), starting from V<sub>2025</sub> = TV = 475.2155:</p><p>V<sub>2024</sub> = (35 + 475.2155)/1.1273333 = 452.5709<br>V<sub>2023</sub> = (30 + 452.5709)/1.1273333 = 428.0752<br>V<sub>2022</sub> = (0 + 428.0752)/1.1273333 = <b>379.7259</b> &#10003;</p><p><b>Reading the answer.</b> Almost 87% of the value sits in the terminal value, which is normal for a three-year projection with perpetual growth and is worth one sentence: the valuation is far more sensitive to g and to r<sub>wacc</sub> than to the individual forecast years. A one-point change in g here moves the answer by tens of millions.</p><p><b>What &laquo;enterprise value&raquo; means here.</b> This is the value of the operating business, i.e. the levered value V<sup>L</sup> of the assets. It is what the debt and equity claims together are worth; to get the price of the equity you would subtract the debt and add any excess cash, neither of which the question asks for.</p>",
            "criteria": [
              "Grows the 2025 cash flow one year before capitalising it: TV = 35(1.05)/(0.1273333 − 0.05) = 475.2155. Using 35/(r − g) is the standard slip and understates the value by 5%.",
              "Discounts the terminal value THREE years, together with FCF_2025, not four.",
              "Discounts all cash flows at the after-tax WACC of 12.7333% and adds no separate tax shield — the WACC already contains it.",
              "Enterprise value = $379.73M.",
              "Remembers that FCF_2023 = 0 contributes nothing but still occupies year 1; shifting the later flows forward by one year is a common and expensive error.",
              "A closing remark that ~87% of the value is terminal value, and therefore sensitive to g, shows the judgement sensors reward."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Problem 4 — Binomial replication of debt and equity",
        "points": 48,
        "topic": "Binomial replication, risk-neutral valuation, equity and debt as options",
        "chapters": [
          6,
          22,
          24
        ],
        "body": "<p>ABC company is an all-equity firm with a current market value of $1000 and will be worth $800 (down state) or $1600 (up state) in one year. The one-year risk-free rate is 5%. ABC is considering issuing zero-coupon, one-year debt with a face value of $1050 (and will use the proceeds to pay a special dividend). ABC operates in a perfect capital market.</p><p><i>Read this one carefully &mdash; it is the cleanest binomial treatment of levered equity and risky debt in the whole archive, and it joins together three chapters: the binomial model (k22), equity and debt as options on firm value (k24), and MM Proposition I (k6).</i></p>",
        "parts": [
          {
            "label": "a",
            "points": 16,
            "body": "<p>Use the binomial replication model to answer the following question. What is the value of ABC's equity (after the transaction)? (Hint: You can design a suitable replicating portfolio, which is composed of risk-free lending or borrowing as well as an equity stake in the all-equity ABC company.)</p>",
            "solution": "<p><b>Step 0 &mdash; identify the underlying and the derivative.</b> The traded underlying is the <b>unlevered firm</b>, worth S<sub>0</sub> = $1000 today and S<sub>u</sub> = $1600 or S<sub>d</sub> = $800 in a year. Once the debt is in place, the equity is a <b>call option on firm value with strike K = $1050</b>: shareholders keep whatever is left after the creditors are paid, and their liability is limited at zero.</p><p><b>Step 1 &mdash; write down the equity's payoffs.</b></p><table class=\"data\"><tr><th>State</th><th>Firm value</th><th>Owed to creditors</th><th>Equity payoff = max(V &minus; K, 0)</th></tr><tr><td>Up</td><td class=\"n\">1600</td><td class=\"n\">1050</td><td class=\"n\"><b>550</b></td></tr><tr><td>Down</td><td class=\"n\">800</td><td class=\"n\">1050</td><td class=\"n\"><b>0</b></td></tr></table><p>In the down state the firm is worth less than the face value, so the shareholders default, hand over the assets and receive nothing. They do <i>not</i> pay the $250 shortfall &mdash; that is limited liability, and it is what makes the equity an option rather than a linear claim.</p><p><b>Step 2 &mdash; find the replicating portfolio.</b> Buy &Delta; of the unlevered firm and lend B at the risk-free rate, so that the portfolio matches the equity in both states.</p><p>&Delta; = (C<sub>u</sub> &minus; C<sub>d</sub>)/(S<sub>u</sub> &minus; S<sub>d</sub>) = (550 &minus; 0)/(1600 &minus; 800) = 550/800 = <b>0.6875</b></p><p>B = (C<sub>d</sub> &minus; S<sub>d</sub>&Delta;)/(1 + r<sub>f</sub>) = (0 &minus; 800 &times; 0.6875)/1.05 = &minus;550/1.05 = <b>&minus;$523.8095</b></p><p>The negative B means <b>borrowing</b> $523.8095 at 5%, which requires repaying exactly $550 next year.</p><p><b>Step 3 &mdash; the portfolio must be verified, and the verification is cheap.</b></p><table class=\"data\"><tr><th>State</th><th>0.6875 &times; firm value</th><th>&minus; loan repayment</th><th>Portfolio payoff</th><th>Equity payoff</th></tr><tr><td>Up</td><td class=\"n\">0.6875 &times; 1600 = 1100</td><td class=\"n\">&minus;550</td><td class=\"n\">550</td><td class=\"n\">550 &#10003;</td></tr><tr><td>Down</td><td class=\"n\">0.6875 &times; 800 = 550</td><td class=\"n\">&minus;550</td><td class=\"n\">0</td><td class=\"n\">0 &#10003;</td></tr></table><p><b>Step 4 &mdash; price the portfolio, and therefore the equity.</b> Two assets with identical payoffs in every state must have identical prices, or there is an arbitrage:</p><p>E = S<sub>0</sub>&Delta; + B = 1000(0.6875) &minus; 523.8095 = 687.50 &minus; 523.8095 = <b>$163.6905</b></p><p>Exactly, E = 6875/42 = $163.69047619&hellip;</p><p><b>What &Delta; means and why it is worth a sentence.</b> &Delta; = 0.6875 is the sensitivity of the equity's value to the value of the firm's assets &mdash; the analogue of N(d<sub>1</sub>) in Black-Scholes. A dollar added to firm value raises the equity by 69 cents and the debt by 31 cents. It also says that levered equity is a <i>geared</i> position in the assets: 68.75% of the firm financed with 76% borrowed money, which is why levered equity is riskier than the assets it rests on.</p><p><b>Note what never appeared.</b> No probability of the up state was used, and none was given. Replication prices the claim off the traded underlying alone; real-world probabilities are irrelevant because they are already embedded in the $1000 price of the firm.</p>",
            "criteria": [
              "Identifies the equity as a call option on firm value with strike equal to the face value, and writes the payoffs 550 and 0 — including the zero, by limited liability, not −250.",
              "Delta = (550 − 0)/(1600 − 800) = 0.6875.",
              "B = (0 − 800 × 0.6875)/1.05 = −523.8095, and says in words that a negative B is borrowing.",
              "E = 1000(0.6875) − 523.8095 = $163.69.",
              "Verifies the replicating portfolio in BOTH states. It costs two lines and it is the only way to know the construction is right.",
              "Uses no probabilities at all, and ideally says why: the $1000 market price of the unlevered firm already contains them.",
              "The typical mistake is computing the equity as an expected payoff — for instance ½(550) + ½(0) discounted at 5% = 261.9 — which invents a probability the exercise never gave and discounts a risky claim at the risk-free rate."
            ]
          },
          {
            "label": "b",
            "points": 16,
            "body": "<p>Use the binomial replication model to answer the following question. What is the value of ABC's debt (after the transaction)? (Hint: You can design a suitable replicating portfolio, which is composed of risk-free lending or borrowing as well as an equity stake in the all-equity ABC company.)</p>",
            "solution": "<p><b>Step 1 &mdash; the debt's payoffs.</b> Creditors receive the face value if the firm can pay, and the whole firm if it cannot: min(V, K).</p><table class=\"data\"><tr><th>State</th><th>Firm value</th><th>Debt payoff = min(V, K)</th></tr><tr><td>Up</td><td class=\"n\">1600</td><td class=\"n\"><b>1050</b></td></tr><tr><td>Down</td><td class=\"n\">800</td><td class=\"n\"><b>800</b></td></tr></table><p><b>Step 2 &mdash; replicate.</b></p><p>&Delta;<sub>D</sub> = (1050 &minus; 800)/(1600 &minus; 800) = 250/800 = <b>0.3125</b></p><p>B<sub>D</sub> = (800 &minus; 800 &times; 0.3125)/1.05 = (800 &minus; 250)/1.05 = 550/1.05 = <b>+$523.8095</b></p><p>This time B is positive: the debt is replicated by holding 31.25% of the firm's assets <i>and lending</i> $523.8095 risk-free.</p><p><b>Step 3 &mdash; verify.</b> Up: 0.3125(1600) + 550 = 500 + 550 = 1050 &#10003;. Down: 0.3125(800) + 550 = 250 + 550 = 800 &#10003;.</p><p><b>Step 4 &mdash; price it.</b></p><p>D = 1000(0.3125) + 523.8095 = 312.50 + 523.8095 = <b>$836.3095</b></p><p>Exactly, D = 35125/42 = $836.30952381&hellip;</p><p><b>The consistency check that has to be written down.</b></p><p>E + D = 163.6905 + 836.3095 = <b>$1000.00</b> = the value of the unlevered firm &#10003;</p><p>This is <b>MM Proposition I</b> in its most literal form. The market is perfect, so the capital structure only slices the same $1000 of firm value into two claims; it creates nothing and destroys nothing. Note also that the two replicating portfolios are complementary by construction: &Delta;<sub>E</sub> + &Delta;<sub>D</sub> = 0.6875 + 0.3125 = 1.0 (together they hold the whole firm) and B<sub>E</sub> + B<sub>D</sub> = &minus;523.8095 + 523.8095 = 0 (the shareholders' borrowing is the creditors' lending). Once you have priced the equity, the fastest route to the debt is simply D = V &minus; E.</p><p><b>What the numbers say about the debt.</b> The promised payment is $1050 and the market price is $836.3095, so</p><p>Yield to maturity = 1050/836.3095 &minus; 1 = <b>0.2555 (25.5516%)</b><br>Credit spread = 25.5516% &minus; 5% = <b>20.5516%</b></p><p>That is a distressed yield, and rightly so: the debt defaults in one of the two states and recovers only $800 of $1050 there. The yield is a <i>promised</i> return, not an expected one, and it must never be used as a discount rate for cash flows.</p><p><b>Debt as risk-free debt minus a put &mdash; the decomposition worth memorising.</b> A creditor holds a risk-free claim to $1050 and has written a put on the firm's assets with strike $1050, which the shareholders exercise by defaulting:</p><p>PV(K) = 1050/1.05 = $1000.00<br>Value of the put = PV(K) &minus; D = 1000 &minus; 836.3095 = <b>$163.6905</b></p><p>The put is worth exactly the same as the equity here, which is not a coincidence but put-call parity at work: C = P + S &minus; PV(K) = 163.6905 + 1000 &minus; 1000 = <b>163.6905</b> &#10003;. The two agree because the strike happens to satisfy K/(1 + r<sub>f</sub>) = S<sub>0</sub>, i.e. the debt is exactly at-the-money on a forward basis.</p><p><b>Where the money goes.</b> The $836.3095 raised is paid out as the special dividend. A shareholder ends the transaction holding $836.3095 in cash plus equity worth $163.6905, for a total of $1000 &mdash; precisely what he owned before. The recapitalisation makes him no better and no worse off, which is MM I stated from the shareholder's side.</p>",
            "criteria": [
              "Debt payoffs are min(V, K) = 1050 and 800 — the creditors get the whole firm in default, not zero and not the face value.",
              "Delta_D = 0.3125 and B_D = +523.8095, with the sign read correctly as lending.",
              "D = $836.31, verified in both states.",
              "Runs the check E + D = $1000 and NAMES it: MM Proposition I in a perfect market. This is the consistency check the examiner is looking for.",
              "Bonus, and cheap: Delta_E + Delta_D = 1 and B_E + B_D = 0, which is why D = V − E works as a shortcut.",
              "Bonus: the yield to maturity of 25.5516% and the credit spread of 20.5516%, with the warning that a promised yield is not an expected return.",
              "Bonus: the decomposition of risky debt into risk-free debt minus a put worth $163.69, checked against put-call parity.",
              "The typical mistake is valuing the debt at its face value, or at PV(1050) = $1000, which ignores default risk entirely."
            ]
          },
          {
            "label": "c",
            "points": 16,
            "body": "<p>What is the risk-neutral probability of the up state? Use risk-neutral valuation to determine the value of ABC's equity (after the transaction) and show that you get the same result as in part a).</p>",
            "solution": "<p><b>Step 1 &mdash; back the risk-neutral probability out of the traded firm value.</b> &rho; is defined as the probability under which the underlying asset itself is expected to earn the risk-free rate:</p><p>S<sub>0</sub> = [&rho;S<sub>u</sub> + (1 &minus; &rho;)S<sub>d</sub>]/(1 + r<sub>f</sub>) &nbsp;&rArr;&nbsp; &rho; = [(1 + r<sub>f</sub>)S<sub>0</sub> &minus; S<sub>d</sub>]/(S<sub>u</sub> &minus; S<sub>d</sub>)</p><p>&rho; = [1.05(1000) &minus; 800]/(1600 &minus; 800) = (1050 &minus; 800)/800 = 250/800 = <b>0.3125</b></p><p><b>Check the definition holds.</b> [0.3125(1600) + 0.6875(800)]/1.05 = (500 + 550)/1.05 = 1050/1.05 = <b>$1000</b> &#10003;</p><p><b>Step 2 &mdash; value the equity under the risk-neutral measure.</b></p><p>E = [&rho;(550) + (1 &minus; &rho;)(0)]/1.05 = (0.3125 &times; 550)/1.05 = 171.875/1.05 = <b>$163.6905</b></p><p><b>Identical to part (a)</b>, to the last decimal &mdash; as it must be, since risk-neutral valuation is nothing but the replication argument rearranged. Substituting &rho; into C = S<sub>0</sub>&Delta; + B and simplifying gives C = [&rho;C<sub>u</sub> + (1&minus;&rho;)C<sub>d</sub>]/(1+r<sub>f</sub>) algebraically; the two methods are the same theorem, not two independent estimates.</p><p><b>Step 3 &mdash; and the debt, free of charge.</b></p><p>D = [0.3125(1050) + 0.6875(800)]/1.05 = (328.125 + 550)/1.05 = 878.125/1.05 = <b>$836.3095</b> &#10003;</p><p>Once you have &rho;, every claim on the firm can be valued in a single line. That is why risk-neutral valuation is usually the faster method in an exam, provided you can state where &rho; comes from.</p><p><b>What &rho; is and is not.</b> &rho; = 0.3125 is <b>not</b> a forecast of anything. It is the probability that would have to be true for investors to be indifferent to risk, given the observed price of $1000. The true probability of the up state is not given in this exercise and is not needed. If the real probability were, say, 0.5, the firm's expected value in a year would be 0.5(1600) + 0.5(800) = $1200, implying an expected return of 20% on the assets &mdash; a 15% risk premium over the risk-free rate. The risk-neutral measure shifts weight away from the up state (0.3125 instead of 0.5) precisely to strip that premium out, so that everything can be discounted at r<sub>f</sub>.</p><p><b>Closing checks worth one line each in the exam.</b></p><p>&bull; E + D = 163.6905 + 836.3095 = $1000 = V<sup>U</sup> &#10003; (MM I)<br>&bull; Both claims earn 5% under &rho;: 171.875/163.6905 = 1.05 and 878.125/836.3095 = 1.05 &#10003;<br>&bull; The replication answer and the risk-neutral answer agree exactly &#10003;</p><p>Note the numerical curiosity that &rho; = 0.3125 equals &Delta;<sub>D</sub>. That is an artefact of these particular numbers, not a general result &mdash; do not carry it into another exercise.</p>",
            "criteria": [
              "States the formula and, more importantly, where it comes from: ρ is the probability that makes the UNDERLYING earn the risk-free rate, ρ = [(1+r_f)S₀ − S_d]/(S_u − S_d).",
              "ρ = 0.3125, and ideally verifies that it reprices the firm at $1000.",
              "E = [ρ(550) + (1−ρ)(0)]/1.05 = $163.69, and states explicitly that this is the same as part (a) — the question asks you to show it.",
              "Says why the two methods must agree: risk-neutral valuation is the replication argument rearranged, not a second independent estimate.",
              "Discounts at the RISK-FREE rate under ρ. Discounting risk-neutral expectations at a risk-adjusted rate is double counting and is the standard error.",
              "Full marks for making clear that ρ is not a real-world probability and that no real probability is needed anywhere in the exercise.",
              "Bonus: valuing the debt with the same ρ in one line, and closing with E + D = $1000."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "v2021",
    "label": "Spring 2021",
    "date": "2021-06-09",
    "minutes": 240,
    "points": 240,
    "format": "10 multiple choice + 4 problems · home exam",
    "note": "Pandemic home examination, submitted in WiseFlow: four hours, de facto open book, 240 points — ten multiple-choice questions worth 48 points in total, then four problems of 48 points each. This is NOT the format you will meet in 2026 (three hours, closed book, six exercises, 100 points, no multiple choice), so read nothing into the length or the time pressure; the value of this set is in its topics. An official solution key exists, but it is incomplete: it covers the multiple choice, Problem 1, Problem 2 and — as a spreadsheet screenshot on its last page — Problem 4, and contains no solution whatsoever for Problem 3. Problem 3, the full APV valuation of the Meatballs Inc buyout, is the most valuable exercise in this set for today's syllabus and is solved from scratch here, with the WACC method used as an independent check on every figure. Problem 4's numbers below reproduce the official spreadsheet to eight significant figures. The paper states 48 points per problem without splitting them across sub-questions, so the per-part points shown here are an even split.",
    "exercises": [
      {
        "n": 1,
        "title": "Multiple choice (MC 1–10)",
        "points": 48,
        "topic": "MM, CAPM, tax shield, debt overhang, payout, credit risk, CDS, APV",
        "chapters": [
          3,
          5,
          6,
          7,
          10,
          16,
          18,
          24
        ],
        "body": "<p>Multiple Choice Questions (48 Points): Your score for the following ten multiple-choice questions is fully determined by whether you identify the correct answer. You do NOT need to provide calculations or explanations.</p>",
        "parts": [
          {
            "label": "1",
            "points": 4.8,
            "body": "<p>Which of the following statements is true?</p><p>a) In a perfect capital market, a firm can increase its value by issuing debt (rather than equity) to finance a project, because the cost of debt (rD) is always smaller than the cost of equity (rE).<br>b) In a perfect capital market, purely financial transactions always have a strictly positive NPV.<br>c) Modigliani Miller Proposition II, whereby the cost of equity increases in leverage, is only valid in the presence of bankruptcy costs.<br>d) None of the above.</p>",
            "solution": "<p><b>Answer: D (official key).</b> This is the same question as Spring 2022 multiple choice 6, word for word.</p><p><b>a) is false.</b> Debt is indeed cheaper than equity, but substituting it does not lower the WACC: the residual equity becomes a levered claim on the same assets and r<sub>E</sub> rises by exactly enough to offset the saving. MM Proposition II, r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>), is that offset written down.</p><p><b>b) is false.</b> Buying and selling claims at fair value has an NPV of exactly zero, not a positive one. That is MM Proposition I restated as a rule about transactions.</p><p><b>c) is false and inverted.</b> MM II is derived in a perfect market with no bankruptcy costs at all. Bankruptcy costs are one of the frictions that break MM, not a condition for it.</p>",
            "criteria": [
              "Answers D and can dispose of all three statements.",
              "The essential reason for rejecting (a): leverage raises r_E by exactly enough to keep the pre-tax WACC equal to r_U.",
              "The typical mistake is picking (a) because 'debt is cheaper than equity' — the most persistent misconception in the course."
            ]
          },
          {
            "label": "2",
            "points": 4.8,
            "body": "<p>You have been retained by a well-diversified institutional investor to purchase real-estate and land on the Chicago Southside, since its value will increase dramatically if Chicago is awarded the 2028 Olympic Games (OG). If this is the only determinant of the land's future value and this risk is diversifiable, then what is the appropriate discount rate?</p><p>a) The market risk-premium.<br>b) The risk-free rate.<br>c) The risk-free rate plus the market risk-premium.<br>d) The average market return (for example the S&amp;P 500 historical return).</p>",
            "solution": "<p><b>Answer: B, the risk-free rate (official key).</b></p><p>The CAPM prices only <b>systematic</b> risk. If the only source of uncertainty is whether the IOC picks Chicago, and that risk is diversifiable, then the asset's beta is <b>zero</b> and CAPM gives</p><p>r = r<sub>f</sub> + 0 &times; (E[R<sub>Mkt</sub>] &minus; r<sub>f</sub>) = <b>r<sub>f</sub></b></p><p>The investor is well diversified, so the Olympic risk washes out across his portfolio and he demands no compensation for bearing it. Note that the asset is not <i>safe</i> &mdash; its value is highly uncertain &mdash; but risk that can be diversified away is not priced.</p><p><b>The distractors.</b> a) The market risk premium is a premium, not a discount rate; it does not include r<sub>f</sub>. c) r<sub>f</sub> + MRP is the CAPM rate for an asset with &beta; = 1, which this asset does not have. d) The average market return is again the &beta; = 1 answer, dressed up in historical data.</p><p><b>The typical mistake</b> is reasoning &laquo;this investment is very risky, so it needs a high discount rate&raquo;. Total volatility is not what CAPM prices; covariance with the market is.</p>",
            "criteria": [
              "Answers B and says why: diversifiable risk means beta = 0, and CAPM with beta = 0 returns r_f.",
              "Distinguishes total risk from systematic risk, and uses the fact that the investor is well diversified.",
              "The typical mistake is equating 'risky' with 'high discount rate'."
            ]
          },
          {
            "label": "3",
            "points": 4.8,
            "body": "<p>If a firm borrows $50 million only for one year until date 1 (i.e., the firm is levered for one year only) at an interest rate of 9%, what is the present value of the interest tax shield at date 0 closest to? Assume that the corporate tax rate is 35%.</p><p>a) $17.500 million<br>b) $4.128 million<br>c) $1.575 million<br>d) $1.445 million</p>",
            "solution": "<p><b>Answer: D ($1.445 million).</b> The official key spells it out.</p><p><b>Step 1 &mdash; the interest.</b> 0.09 &times; $50M = <b>$4.5M</b>, paid at date 1.</p><p><b>Step 2 &mdash; the shield.</b> That interest shelters 0.35 &times; 4.5 = <b>$1.575M</b> of tax, also at date 1.</p><p><b>Step 3 &mdash; discount it one year.</b> The debt schedule is fixed and known, so the shield is as risky as the debt and is discounted at r<sub>D</sub> = 9%:</p><p>PV(TS) = 1.575/1.09 = <b>$1.445M</b></p><p><b>The distractors are a map of the three ways to get this wrong.</b> a) $17.5M = &tau;<sub>c</sub> &times; D = 0.35 &times; 50, which is the <i>permanent</i>-debt formula applied to one-year debt. c) $1.575M is the shield itself, undiscounted &mdash; the answer if you forget that it arrives at date 1. b) $4.128M = 4.5/1.09 is the present value of the interest payment rather than of the tax saving, i.e. forgetting to multiply by &tau;<sub>c</sub>.</p><p><b>The lesson.</b> &tau;<sub>c</sub>D is a shortcut that is valid only for permanent debt. For a finite horizon you must discount the shields year by year.</p>",
            "criteria": [
              "Computes interest 4.5, shield 1.575, then discounts one year at 9% to get 1.445.",
              "Discounts at r_D = 9%, because the debt schedule is fixed and predetermined.",
              "Does not apply τ_c·D = 17.5 — that closed form assumes permanent debt, and the firm is levered for one year only. This distractor is deliberately placed first.",
              "Does not stop at 1.575: the shield arrives at date 1 and the question asks for its value at date 0."
            ]
          },
          {
            "label": "4",
            "points": 4.8,
            "body": "<p>The debt overhang problem arises when:</p><p>a) A firm cannot raise capital for new projects, even if they have a positive NPV, due to the presence of existing creditors.<br>b) Financial distress, caused by debt, forces the firm to sell its assets.<br>c) The interest payment of a highly levered firm leads to negative earnings, which reduces the value of the debt tax shield.<br>d) None of the above</p>",
            "solution": "<p><b>Answer: A (official key).</b></p><p>Debt overhang is a <b>underinvestment</b> problem. When existing debt is risky, part of the value created by a new positive-NPV project accrues to the creditors, because it makes their existing claim safer. Shareholders, who must put up the money, capture only the remainder. If the creditors' share exceeds the NPV, the shareholders' own return is negative and they rationally decline a project that is good for the firm as a whole. Problem 2 of this same paper is exactly this, with numbers: project A has an NPV of +$10, creditors gain $20, and the shareholders therefore lose $10 and refuse to fund it.</p><p><b>b)</b> describes asset sales in distress, a cost of financial distress, not debt overhang. <b>c)</b> describes the loss of tax shields when there is not enough taxable income to shelter &mdash; a real effect, and a limit on the tax benefit of debt, but a different mechanism.</p>",
            "criteria": [
              "Answers A and identifies the mechanism by name: underinvestment because the gain accrues partly to existing creditors.",
              "Requires the existing debt to be RISKY — with risk-free debt there is no transfer and no overhang.",
              "Distinguishes debt overhang from the other agency cost of debt, risk shifting, where the distortion goes the other way: taking a bad project rather than declining a good one."
            ]
          },
          {
            "label": "5",
            "points": 4.8,
            "body": "<p>Which of the following statements about payout policy is correct?</p><p>a.) According to the pecking order theory, firms should always pay out any free cash flow and never retain earnings.<br>b.) According to the free cash flow theory, managers should retain free cash flow inside the firm (rather than pay it out) to avoid issuing mispriced securities.<br>c) In a perfect capital market, retaining excess cash inside the firm (rather than paying it out) reduces firm value.<br>d.) None of the above</p>",
            "solution": "<p><b>Answer: D (official key).</b> Statements a) and b) have had their theories swapped, and c) contradicts payout irrelevance.</p><p><b>a) is false &mdash; it states the opposite of the pecking order.</b> The pecking order ranks internal funds first precisely because they avoid the adverse-selection discount on new securities. It therefore argues for <i>retaining</i> earnings and building financial slack, not for paying everything out.</p><p><b>b) is false &mdash; it is the pecking order's argument attached to the free-cash-flow theory.</b> The free-cash-flow theory (Jensen) says the reverse: managers with cash they do not need will waste it on empire building, so the cash should be <i>paid out</i> to discipline them.</p><p><b>c) is false.</b> In a perfect market, payout policy is irrelevant. Cash held inside the firm earns the fair market return and is worth exactly its face value to shareholders; whether it sits on the balance sheet or in their own bank accounts changes nothing. Retention only reduces value once you add frictions, notably personal taxes on dividends and the agency costs of free cash flow.</p><p><b>The way to see through this question quickly:</b> a) and b) are each the correct statement of the <i>other</i> theory. Swapping two labels is a favourite construction in this course's multiple choice.</p>",
            "criteria": [
              "Answers D, and can say precisely what is wrong with each of a), b) and c).",
              "Knows the two theories the right way round: pecking order → retain, to avoid issuing mispriced securities; free cash flow → pay out, to stop managers wasting it.",
              "Knows that payout policy is irrelevant in a perfect market, so retention neither creates nor destroys value there."
            ]
          },
          {
            "label": "6",
            "points": 4.8,
            "body": "<p>The company XYZ Inc. has debt outstanding with a face value of K=$100,000 maturing in t=3 months. Which of the following statements is true?</p><p>a) The debt of XYZ Inc. can be seen as a portfolio composed of a written put on XYZ's assets with a strike price of K maturing in t=3 months.<br>b) The debt of XYZ Inc. can be seen as a portfolio composed of a put and a written call on XYZ's assets, both with a strike price K and both maturing in t=3 months.<br>c) The debt of XYZ Inc. can be seen as a portfolio composed of XYZ's assets and a written call on XYZ's assets with a strike price of K, maturing in t=3 months.<br>d) None of the above.</p>",
            "solution": "<p><b>Answer: C (official key).</b></p><p><b>Start from the payoff.</b> Creditors receive min(V, K), where V is the value of the assets at maturity. Rewrite it:</p><p>min(V, K) = V &minus; max(V &minus; K, 0)</p><p>The first term is the assets themselves; the second is a call on the assets with strike K, and the minus sign means it has been <b>written</b> (sold). So <b>debt = long the firm's assets + short a call on those assets</b> &mdash; statement c). Equivalently: the creditors own the firm and have handed the shareholders the option to buy it back for K, which is the shareholders' equity.</p><p><b>The other true decomposition, which is not on the list.</b> min(V, K) = K &minus; max(K &minus; V, 0): risk-free debt with face value K, plus a <b>written put</b> on the assets. Statement a) is this decomposition with the risk-free component missing, which is why it is wrong &mdash; a written put alone has a payoff that is zero or negative, and can never be a debt claim.</p><p><b>b) is nonsense</b>: long a put and short a call with the same strike is a short forward position, not a debt claim.</p><p><b>Check that the two correct decompositions agree.</b> V &minus; C = K &minus; P rearranges to C = P + V &minus; K, i.e. put-call parity with an undiscounted strike; in present value terms, C = P + V &minus; PV(K). &#10003; Spring 2022 Problem 4 puts numbers on exactly this: debt of $836.31 = firm value $1000 minus a call worth $163.69, and equally = PV(K) of $1000 minus a put worth $163.69.</p>",
            "criteria": [
              "Answers C, derived from min(V,K) = V − max(V−K,0) rather than recalled.",
              "Knows both standard decompositions of risky debt and can state the second one (risk-free debt minus a put) even though it is not among the options.",
              "Sees why a) fails: it drops the risk-free debt component and leaves only the written put.",
              "The typical mistake is picking a) from a half-remembered 'debt is a written put'. The full statement is 'risk-free debt plus a written put'."
            ]
          },
          {
            "label": "7",
            "points": 4.8,
            "body": "<p>Consider two zero-coupon bonds that promise to pay the same amount of $100 in one year in case of no default. Bond 1 is a risk-free government bond with a yield of 5%. Bond 2 is a corporate bond issued by firm X, with an estimated probability of default of 20% and a loss given default of 20%. Bond 2 has a yield of 20%. What is today's price of Bond 2 closest to?</p><p>a) $70<br>b) $80<br>c) $90<br>d) $100</p>",
            "solution": "<p><b>Answer: B ($80). The official key: Price = 100/1.2 = 83.33.</b></p><p>The yield to maturity of a zero-coupon bond is by definition the rate that discounts the <b>promised</b> payment back to the market price:</p><p>Price = Face / (1 + YTM) = 100 / 1.20 = <b>$83.33</b></p><p>Closest to $80.</p><p><b>The trap is that the default probability and the loss given default are not needed here.</b> They are already reflected in the 20% yield &mdash; that is why the yield is 15 percentage points above the risk-free rate. Using them again would double count. They are supplied because questions 8 and 9 need them.</p><p><b>Worth knowing, for context.</b> The expected payoff on Bond 2 is 0.80(100) + 0.20(80) = $96, so the <b>expected</b> return is 96/83.33 &minus; 1 = <b>15.20%</b>, not the promised 20%. The gap between the promised yield and the expected return is the cost of default risk, and it is why a bond's YTM must never be used as a discount rate for expected cash flows.</p>",
            "criteria": [
              "Price = 100/1.20 = $83.33, closest to $80. One line.",
              "Recognises that the YTM already prices default, so the 20% default probability and 20% loss given default must NOT be applied on top.",
              "Bonus: distinguishing the promised yield of 20% from the expected return of 15.20%, which is the concept the question is really about."
            ]
          },
          {
            "label": "8",
            "points": 4.8,
            "body": "<p>Consider the setting of question 7. What is the risk-neutral probability that firm X defaults on its bond closest to?</p><p>a) 20%<br>b) 40%<br>c) 60%<br>d) 80%</p>",
            "solution": "<p><b>Answer: C (60%). The official key: the condition [&rho;&middot;80 + (1&minus;&rho;)&middot;100]/1.05 = 100/1.2 rearranges to &rho; = 0.625.</b></p><p><b>Step 1 &mdash; the two payoffs.</b> A loss given default of 20% on a face value of $100 means creditors recover <b>$80</b> if firm X defaults and <b>$100</b> if it does not.</p><p><b>Step 2 &mdash; impose risk-neutral pricing.</b> Under the risk-neutral measure every asset is discounted at the risk-free rate of 5%, and the resulting value must reproduce the observed market price of $83.33:</p><p>[&rho;(80) + (1 &minus; &rho;)(100)]/1.05 = 83.3333</p><p>80&rho; + 100 &minus; 100&rho; = 87.5000<br>&minus;20&rho; = &minus;12.5000<br><b>&rho; = 0.6250 (62.5%)</b></p><p>Closest to 60%.</p><p><b>Why &rho; = 62.5% is so much larger than the true 20%.</b> The risk-neutral measure loads extra weight onto the bad state, exactly enough to account for investors' aversion to that state, so that everything can be discounted at the risk-free rate. Risk-neutral default probabilities are systematically higher than actual ones, and the wedge between them is the risk premium. Answering 20% &mdash; option a) &mdash; is the whole trap of the question.</p><p><b>Check.</b> [0.625(80) + 0.375(100)]/1.05 = (50 + 37.5)/1.05 = 87.5/1.05 = $83.33 &#10003;</p>",
            "criteria": [
              "Recovery in default = 80, not 20 and not 0. Loss GIVEN default of 20% means 20% of face is lost.",
              "Sets the risk-neutral expected payoff discounted at r_f equal to the OBSERVED market price of 83.33.",
              "ρ = 0.625, closest to 60%.",
              "The typical mistake is answering 20%, the actual default probability. A risk-neutral probability is a pricing device, not a forecast, and is higher than the true probability whenever the bad state carries a risk premium."
            ]
          },
          {
            "label": "9",
            "points": 4.8,
            "body": "<p>Consider the setting of questions 7 &amp; 8. Consider a credit default swap (CDS), which guarantees a payment of $1 if firm X defaults. What is the price of a single CDS contract (that guarantees a payment of $1 in case of default) closest to?</p><p>a) $0.60<br>b) $0.61<br>c) $0.62<br>d) $0.63</p>",
            "solution": "<p><b>Answer: A ($0.60). The official key: Price = 0.625/1.05 = 0.595.</b></p><p>A CDS that pays $1 in default and $0 otherwise is an Arrow-Debreu security for the default state. Its price is the risk-neutral probability of that state, discounted at the risk-free rate:</p><p>Price = &rho;/(1 + r<sub>f</sub>) = 0.625/1.05 = <b>$0.5952</b></p><p>Closest to $0.60.</p><p><b>Why the options are so tightly spaced.</b> $0.61, $0.62 and $0.63 are all above 0.5952, and 0.625 itself is one of them &mdash; option d). The question is testing one thing: that you <b>discount</b> the risk-neutral probability rather than quoting it. Undiscounted, &rho; = 0.625 would be the price of a claim paying $1 <i>today</i> in default; the CDS pays in a year.</p><p><b>The general rule worth carrying out of this question.</b> The price today of any claim paying $1 in one state at date 1 is that state's risk-neutral probability divided by (1 + r<sub>f</sub>). Sum over all states and you recover the price of a risk-free zero: (0.625 + 0.375)/1.05 = 1/1.05 = $0.9524 &#10003;</p>",
            "criteria": [
              "Price = ρ/(1 + r_f) = 0.625/1.05 = $0.5952, closest to $0.60.",
              "Discounts. Quoting the undiscounted 0.625 lands on option d), which is the trap the tightly-spaced alternatives are built around.",
              "Uses the risk-neutral probability from question 8, not the actual 20% default probability."
            ]
          },
          {
            "label": "10",
            "points": 4.8,
            "body": "<p>Which of the following statements about the adjusted present value (APV) method is true?</p><p>a) If a company maintains a fixed, permanent amount of debt, we use the cost of debt to discount both the unlevered cash flows and the tax shield.<br>b) If a company maintains a constant debt-to-equity ratio, we use the unlevered cost of capital to discount both the free cash flows and the tax shield.<br>c) If a company maintains a constant debt-to-equity ratio, we use the cost of debt to discount the tax shield.<br>d) None of the above.</p>",
            "solution": "<p><b>Answer: B (official key).</b></p><p><b>b) is exactly right on both halves.</b> In APV the unlevered free cash flows are <i>always</i> discounted at r<sub>U</sub>, by definition of V<sup>U</sup>. And when the firm rebalances to keep D/E constant, the debt level tracks firm value, so the tax shield inherits the risk of the firm's assets and is discounted at r<sub>U</sub> as well. Both terms therefore use the same rate.</p><p><b>a) is false on its first half.</b> The unlevered cash flows are never discounted at r<sub>D</sub> &mdash; they are the firm's operating cash flows, not a debt claim, and they carry asset risk. The <i>second</i> half of a) is right (fixed permanent debt &rarr; tax shield at r<sub>D</sub>), which is what makes this the most tempting distractor.</p><p><b>c) is false</b>: it applies the fixed-debt rate to the rebalancing case, mixing up the two regimes.</p><p><b>The rule, in one line:</b> free cash flows at r<sub>U</sub>, always. Tax shield at r<sub>U</sub> if D/E is constant, at r<sub>D</sub> (= r<sub>f</sub> for risk-free debt) if the debt schedule is fixed and predetermined.</p><p><b>This question, in some form, appeared in every paper in this archive that had multiple choice.</b> Spring 2022 asked it from the other side. Learn the rule cold, both directions, and check each half of a compound statement separately &mdash; option a) is half true, which is exactly how these distractors are built.</p>",
            "criteria": [
              "Answers B and gives both halves of the reason: unlevered FCFs at r_U by definition; and under constant D/E the debt tracks firm value, so the shield carries asset risk and is discounted at r_U too.",
              "Rejects a) by checking its two clauses separately — the tax-shield half is correct, the unlevered-cash-flow half is not.",
              "Can state the rule in both directions, since the exam asks it from either side depending on the year.",
              "The typical mistake is picking a) because the phrase 'fixed, permanent amount of debt → cost of debt' is familiar, without noticing that the statement also applies that rate to the unlevered cash flows."
            ]
          }
        ]
      },
      {
        "n": 2,
        "title": "Problem 1 — Debt or equity under private information",
        "points": 48,
        "topic": "Asymmetric information, signalling, pecking order",
        "chapters": [
          12,
          13
        ],
        "body": "<p>Consider the following risky company. The firm currently has no debt outstanding. The value of the firm's assets in place is either $200 or $50. Investors view both possibilities as equally likely. That is, investors believe that the assets are worth $200 with probability &frac12; and $50 with probability &frac12;.</p><p>The manager is considering a new investment that would cost $20 today and generate a sure, risk-free cash flow of $25 next year (i.e. irrespective of the value of the assets in place the investment will generate a cash flow of $25.) There are only two possible ways of financing the project. The firm can either use 100% equity financing to raise $20, or the firm can use 100% debt financing to raise $20.</p><p>Suppose that the manager maximizes the payoff for existing shareholders. Everyone is risk neutral and there is no discounting.</p>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>Suppose that the manager has the same beliefs as investors. That is, he believes that the firm's existing assets are worth $200 with probability &frac12; and $50 with probability &frac12;. Will the manager undertake the new investment? Will he prefer 100% debt financing or 100% equity financing to raise the $20? Briefly comment.</p>",
            "solution": "<p><b>Step 0 &mdash; the benchmark.</b> Without the project the firm is worth &frac12;(200) + &frac12;(50) = <b>$125</b>, all of it equity. With the project it is worth</p><p>&frac12;(200 + 25) + &frac12;(50 + 25) = &frac12;(225) + &frac12;(75) = <b>$150</b></p><p>The project itself has an NPV of 25 &minus; 20 = <b>+$5</b>, and 150 &minus; 125 &minus; 20 = 5 &#10003;.</p><p><b>(i) Debt financing.</b> The manager issues debt with face value $20. Check that it is risk-free before pricing it at par: even in the low state the firm ends up with 50 + 25 = $75, far above $20, so the debt is repaid with certainty and investors will lend $20 for a promise of $20 (no discounting). Existing shareholders receive</p><p>&frac12;(200 + 25) + &frac12;(50 + 25) &minus; 20 = 150 &minus; 20 = <b>$130</b></p><p><b>(ii) Equity financing.</b> Suppose the manager sells a stake x to new investors. Competitive investors break even:</p><p>x[&frac12;(200 + 25) + &frac12;(50 + 25)] &ge; 20 &nbsp;&hArr;&nbsp; 150x &ge; 20 &nbsp;&hArr;&nbsp; x &ge; <b>2/15</b></p><p>The manager issues the smallest feasible stake, x* = 20/150 = 2/15 = 13.33%. Existing shareholders receive</p><p>(1 &minus; 2/15)(150) = (13/15)(150) = <b>$130</b></p><p><b>(iii) No investment.</b> Existing shareholders expect <b>$125</b>.</p><p><b>(iv) Conclusion.</b> 130 &gt; 125, so <b>the manager undertakes the investment</b>. Both financing modes give existing shareholders exactly $130, so <b>he is indifferent between debt and equity</b>.</p><p><b>Comment &mdash; and this is the point of part (a).</b> When the manager knows nothing the investors do not, securities are priced fairly, so raising $20 costs the old shareholders exactly $20 of value whatever the instrument. They keep the whole of the project's $5 NPV, and the choice of financing is irrelevant &mdash; MM Proposition I inside an information problem. Everything interesting in parts (b) and (c) comes from breaking that symmetry.</p>",
            "criteria": [
              "Verifies that the $20 debt is risk-free (the firm is worth at least $75 in every state) before valuing it at face.",
              "Debt: existing shareholders get 150 − 20 = $130.",
              "Equity: solves the competitive break-even condition 150x = 20 for x* = 2/15, then values the retained stake at (13/15)(150) = $130.",
              "Compares against the no-investment benchmark of $125 and concludes the project is undertaken.",
              "States the indifference explicitly — both routes give $130 — and explains it: with symmetric information both securities are fairly priced, so the old shareholders keep the full $5 NPV either way.",
              "The typical mistake is skipping the no-investment benchmark, which is what makes 'will he undertake it' answerable."
            ]
          },
          {
            "label": "b",
            "points": 12,
            "body": "<p>Suppose now that the manager knows the true value of the assets in place. Investors still believe that the true value is $200 with probability &frac12; and $50 with probability &frac12; and they maintain these beliefs regardless of the manager's financing decision. Suppose the manager knows that the true value is $200. Will the manager undertake the project? If so, will he prefer 100% debt financing or 100% equity financing? Briefly comment.</p>",
            "solution": "<p>The manager now knows the assets are worth $200, but investors still price securities off their &frac12;/&frac12; beliefs. He maximises the payoff of existing shareholders, computed at the <b>true</b> value.</p><p><b>(i) Debt financing.</b> The face value is still $20 and the debt is still risk-free, so investors still lend $20 for a promise of $20. Nothing about the debt's price depends on which state is true &mdash; that is the whole point of a safe claim. Existing shareholders receive</p><p>200 + 25 &minus; 20 = <b>$205</b></p><p><b>(ii) Equity financing.</b> Investors value the whole firm at their perceived $150, so they still demand x* = 2/15 for their $20 &mdash; the same fraction as in part (a). But that fraction is now a slice of a firm truly worth 200 + 25 = $225. Existing shareholders receive</p><p>(1 &minus; 2/15)(225) = (13/15)(225) = <b>$195</b></p><p><b>(iii) Conclusion.</b> 205 &gt; 195, so the manager <b>strictly prefers debt financing</b>. And 205 &gt; 200, the value of doing nothing, so he <b>undertakes the project</b>.</p><p><b>Comment.</b> The good-news manager is being asked to sell equity at a price that reflects a firm worth $150 when he knows it is worth $225. He would be handing new investors a slice worth (2/15)(225) = $30 in exchange for $20 &mdash; a gift of $10, which is exactly the $205 &minus; $195 gap. Debt avoids the giveaway entirely, because a risk-free claim cannot be underpriced: its value is $20 whatever the manager knows. This is the core of the <b>pecking order</b>. The less information-sensitive the security, the smaller the adverse-selection cost of issuing it, and safe debt is the limiting case with a cost of zero.</p>",
            "criteria": [
              "Values the retained equity stake at the TRUE firm value of $225, while pricing the new stake at the investors' perceived $150. Mixing these up destroys the exercise.",
              "Debt payoff $205, equity payoff $195, so debt is strictly preferred.",
              "Explains WHY debt wins: the debt is risk-free, so its value does not depend on the manager's private information and cannot be mispriced; equity can be, and here is underpriced by $10.",
              "Also answers the first question — the project is undertaken, because $205 exceeds the $200 of doing nothing.",
              "Naming the pecking order, and the underlying idea that information-insensitive securities are issued first, is what earns the mechanism credit."
            ]
          },
          {
            "label": "c",
            "points": 12,
            "body": "<p>Suppose as in part b) that the manager knows the true value of the assets in place. Investors still believe that the true value is $200 with probability &frac12; and $50 with probability &frac12; and they maintain these beliefs regardless of the manager's financing decision. Suppose the manager knows that the true value is $50. Will the manager undertake the project? If so, will he prefer 100% debt financing or 100% equity financing? Briefly comment.</p>",
            "solution": "<p>Same structure, mirror image.</p><p><b>(i) Debt financing.</b> The debt is still risk-free (the firm ends with 50 + 25 = $75 &gt; $20) and still priced at $20. Existing shareholders receive</p><p>50 + 25 &minus; 20 = <b>$55</b></p><p><b>(ii) Equity financing.</b> Investors again demand x* = 2/15, priced off their perceived $150, but the true firm is worth only 50 + 25 = $75. Existing shareholders receive</p><p>(1 &minus; 2/15)(75) = (13/15)(75) = <b>$65</b></p><p><b>(iii) Conclusion.</b> 65 &gt; 55, so the manager <b>strictly prefers equity financing</b>. And 65 &gt; 50, so he <b>undertakes the project</b>.</p><p><b>Comment.</b> Exactly the reverse of part (b). The bad-news manager is delighted to sell overpriced equity: he gives away a stake truly worth (2/15)(75) = $10 and receives $20 for it, a gain of $10 to his existing shareholders. Debt, being safe, offers no such opportunity &mdash; you cannot overprice a claim that is worth its face value in every state. So the type with bad news issues equity, the type with good news issues debt, and the preferences are exactly opposed.</p><p><b>Note the symmetry.</b> The good type loses $10 by issuing equity; the bad type gains $10. Both numbers are the same $10 because it is the same mispricing seen from the two sides, and it nets to zero across the two types &mdash; which is precisely why investors, on average, break even.</p>",
            "criteria": [
              "Debt payoff $55, equity payoff $65, so equity is strictly preferred.",
              "Uses the SAME x* = 2/15, because investors' beliefs are stated to be unchanged by the financing choice.",
              "Values the retained stake at the true $75, not the perceived $150.",
              "Explains the mechanism: the bad type profits by selling overpriced equity, which is impossible with risk-free debt.",
              "Points out that the good type's $10 loss and the bad type's $10 gain are the same mispricing from two sides, so investors break even on average. That symmetry is what makes part (d) work."
            ]
          },
          {
            "label": "d",
            "points": 12,
            "body": "<p>You have assumed in parts b) and c) that investors always believe that the true value of the assets in place is $200 with probability &frac12; and $50 with probability &frac12;, regardless of the manager's choice between debt and equity. Based on your results in b) and c), are these beliefs rational? Briefly discuss.</p>",
            "solution": "<p><b>No, the beliefs are not rational.</b> This is the step the course keys insist on: computing the stakes is not enough, you must check whether the equilibrium hangs together.</p><p><b>The argument.</b> Parts (b) and (c) showed that the two types behave differently. The good-news manager <b>always</b> prefers debt ($205 vs $195) and the bad-news manager <b>always</b> prefers equity ($65 vs $55). So an equity issue is never made by a good firm. Rational investors who observe an equity issue should therefore conclude that the assets are worth $50, with probability one &mdash; not &frac12;. Holding on to the &frac12;/&frac12; belief after seeing an equity issue means ignoring information that the manager's own choice has just revealed.</p><p><b>What happens once investors update &mdash; the separating equilibrium.</b> Suppose investors infer from an equity issue that the assets are worth $50, so the firm is worth 50 + 25 = $75. Then the required stake becomes</p><p>x(75) = 20 &rArr; x = <b>4/15 = 26.67%</b>, twice the old 2/15</p><p>and the bad-news manager's existing shareholders receive</p><p>(1 &minus; 4/15)(75) = (11/15)(75) = <b>$55</b></p><p>which is exactly what debt would have given him. <b>The bad type is now indifferent between debt and equity</b>, and the free lunch of part (c) has disappeared. That is the equilibrium: equity is correctly priced once the market has drawn the obvious inference, and the mispricing gain evaporates.</p><p><b>Two observations worth adding.</b></p><p><b>1. The signalling logic.</b> In equilibrium the financing choice itself carries information: issuing debt is good news and issuing equity is bad news. This is the theoretical basis for the well-documented negative stock-price reaction to seasoned equity offerings, and for the pecking order as an <i>equilibrium</i> rather than merely a preference.</p><p><b>2. Investment is undistorted here, but need not be.</b> In this exercise both types still take the project under the updated beliefs ($205 &gt; $200 for the good type, $55 &gt; $50 for the bad type), so the information problem costs nothing in real terms. When the mispricing is large enough relative to the NPV, the good type would rather forgo a positive-NPV project than issue underpriced equity &mdash; the Myers-Majluf underinvestment result, which is what Spring 2022 Problem 2(d) demonstrates.</p>",
            "criteria": [
              "Answers the question directly: no, the beliefs are not rational.",
              "The reason, drawn from (b) and (c): the good type always chooses debt and the bad type always chooses equity, so an equity issue perfectly reveals the bad state and the ½/½ belief cannot survive.",
              "Full marks for carrying the updated belief through: x = 20/75 = 4/15, giving the bad type (11/15)(75) = $55, exactly equal to what debt gives him — so he is driven to indifference. The official key ends on precisely this point.",
              "Names the mechanism: signalling, and the resulting negative market reaction to an equity issue.",
              "The typical mistake is answering 'no' with a hand-wave and no calculation. The 4/15 recomputation is what turns an assertion into an argument."
            ]
          }
        ]
      },
      {
        "n": 3,
        "title": "Problem 2 — Risk shifting, debt overhang and renegotiation",
        "points": 48,
        "topic": "Agency costs of debt, asset substitution, debt renegotiation",
        "chapters": [
          9,
          10
        ],
        "body": "<p>Consider a firm that generates random cash flows at date t=2. Cash flows at t=2 are either $200 or $100 with equal probability. Everyone, including the manager, agrees on these probabilities. At t=1 the firm has debt outstanding with a face value of $150, which is due at t=2. The manager makes all investment decisions in the interest of current equityholders. All investors are risk-neutral and the discount rate is zero.</p>",
        "parts": [
          {
            "label": "a",
            "points": 16,
            "body": "<p>What is the value of the firm at t=1? What is, respectively, the value of the firm's equity and the value of the firm's debt at t=1?</p>",
            "solution": "<p>Risk neutrality and a zero discount rate mean every value is simply an expected payoff. Build the state table first &mdash; every part of this exercise is solved by the same table with different numbers, so it is worth setting out cleanly.</p><table class=\"data\"><tr><th>State</th><th>Prob</th><th>Firm value</th><th>Debt = min(CF, 150)</th><th>Equity = max(CF &minus; 150, 0)</th></tr><tr><td>High</td><td class=\"n\">&frac12;</td><td class=\"n\">200</td><td class=\"n\">150</td><td class=\"n\">50</td></tr><tr><td>Low</td><td class=\"n\">&frac12;</td><td class=\"n\">100</td><td class=\"n\">100</td><td class=\"n\">0</td></tr></table><p><b>Firm value:</b> &frac12;(200) + &frac12;(100) = <b>$150</b><br><b>Debt:</b> &frac12;(150) + &frac12;(100) = <b>$125</b><br><b>Equity:</b> &frac12;(50) + &frac12;(0) = <b>$25</b></p><p><b>Check:</b> 125 + 25 = 150 &#10003; The two claims exhaust the firm.</p><p><b>Read the numbers before moving on.</b> The debt is <b>risky</b>: it is promised $150 but is worth only $125, because in the low state the creditors receive $100 and take a $50 loss. That is what makes the rest of the exercise possible &mdash; with risk-free debt neither risk shifting nor debt overhang could arise. The equity is deep out of the money in the low state, worth $25 in total, and it is that option-like asymmetry that drives the manager's choices in part (b).</p>",
            "criteria": [
              "Sets out the state table with min(CF, K) for debt and max(CF − K, 0) for equity. Every later part reuses it.",
              "Firm 150, debt 125, equity 25, and the check that debt + equity = firm value.",
              "Notes that the debt is risky — worth 125 against a promise of 150 — because that is the precondition for everything in parts (b) and (c).",
              "Does not discount: the exercise states the discount rate is zero and investors are risk neutral."
            ]
          },
          {
            "label": "b",
            "points": 16,
            "body": "<p>Now assume that the firm has access to two mutually exclusive projects (Project A and B). Each project requires additional financing of $30 at t=1. If the firm invests in Project A, the cash flows at t=2 will increase by $40 for sure. In other words, cash flows will be either $240 or $140 with equal probability. If the firm invests instead in Project B, cash flows increase by 50 in the high state and decrease by 50 in the low state. That is, cash flows will either be 250 or 50 with equal probability. Assume that there are covenants in place at t=1 that prohibit the issue of additional debt. Which project has a higher NPV when considered on a stand-alone basis? Would the current shareholders be willing to provide the $30 for the investment? Briefly discuss.</p>",
            "solution": "<p><b>Step 1 &mdash; stand-alone NPVs.</b> Project A raises expected cash flow by $40 for a cost of $30: <b>NPV<sub>A</sub> = +$10</b>. Project B is a pure mean-preserving spread &mdash; +50 in the high state, &minus;50 in the low state, so zero expected gain &mdash; for a cost of $30: <b>NPV<sub>B</sub> = &minus;$30</b>. <b>Project A has the higher NPV, and it is the only one worth doing.</b></p><p><b>Step 2 &mdash; the state tables, which show who gets what.</b></p><p><i>Project A:</i></p><table class=\"data\"><tr><th>State</th><th>Prob</th><th>Firm value</th><th>Debt</th><th>Equity</th></tr><tr><td>High</td><td class=\"n\">&frac12;</td><td class=\"n\">240</td><td class=\"n\">150</td><td class=\"n\">90</td></tr><tr><td>Low</td><td class=\"n\">&frac12;</td><td class=\"n\">140</td><td class=\"n\">140</td><td class=\"n\">0</td></tr><tr><td><b>Value</b></td><td class=\"n\">&mdash;</td><td class=\"n\"><b>190</b></td><td class=\"n\"><b>145</b></td><td class=\"n\"><b>45</b></td></tr></table><p><i>Project B:</i></p><table class=\"data\"><tr><th>State</th><th>Prob</th><th>Firm value</th><th>Debt</th><th>Equity</th></tr><tr><td>High</td><td class=\"n\">&frac12;</td><td class=\"n\">250</td><td class=\"n\">150</td><td class=\"n\">100</td></tr><tr><td>Low</td><td class=\"n\">&frac12;</td><td class=\"n\">50</td><td class=\"n\">50</td><td class=\"n\">0</td></tr><tr><td><b>Value</b></td><td class=\"n\">&mdash;</td><td class=\"n\"><b>150</b></td><td class=\"n\"><b>100</b></td><td class=\"n\"><b>50</b></td></tr></table><p><b>Step 3 &mdash; what the manager would choose, if he could.</b> He maximises the value of the existing shareholders' claim: E<sub>B</sub> = $50 &gt; E<sub>A</sub> = $45. <b>He prefers project B</b> &mdash; the value-destroying one.</p><p><b>Name it: this is risk shifting, also called asset substitution.</b> Equity is a call option on firm value, so it gains from added volatility. Project B adds volatility without adding expected value; the extra $50 in the high state accrues entirely to shareholders, while the extra $50 loss in the low state falls entirely on creditors, who were already not being paid in full there. Look at the transfer directly: creditors go from $125 to $100 (a loss of $25) while equity goes from $25 to $50 (a gain of $25), and the $30 investment is thrown away. <b>&minus;25 &minus; 30 + 25 = &minus;30 = NPV<sub>B</sub></b> &#10003;</p><p><b>Step 4 &mdash; would the shareholders actually put up the $30?</b> <b>No, and not for either project.</b> They must weigh the increase in their claim against the cash they must inject:</p><table class=\"data\"><tr><th>Project</th><th>Equity before</th><th>Equity after</th><th>Gain to shareholders</th><th>Cash required</th><th>Net</th></tr><tr><td>A</td><td class=\"n\">25</td><td class=\"n\">45</td><td class=\"n\">20</td><td class=\"n\">30</td><td class=\"n\"><b>&minus;10</b></td></tr><tr><td>B</td><td class=\"n\">25</td><td class=\"n\">50</td><td class=\"n\">25</td><td class=\"n\">30</td><td class=\"n\"><b>&minus;5</b></td></tr></table><p>Both are negative, so <b>no investment takes place</b>. The best of the two is still refused.</p><p><b>Name that too: project A is blocked by debt overhang.</b> A creates $10 of value, but $20 of the gain goes to the creditors, whose claim rises from $125 to $145 because the low state now pays $140 instead of $100. The shareholders finance the whole $30 and receive only $20, so they lose $10 &mdash; exactly the NPV, with the sign flipped by the transfer. <b>+20 &minus; 30 + 20 = +10 = NPV<sub>A</sub></b> &#10003;</p><p><b>The two agency costs of debt in one exercise.</b> Risky debt makes shareholders want the wrong project (risk shifting) and refuse the right one (debt overhang). The covenant prohibiting new debt closes off one escape route and is the reason the shareholders must fund it themselves.</p>",
            "criteria": [
              "Stand-alone NPVs: A = 40 − 30 = +10, B = 0 − 30 = −30. Project A is the better project.",
              "Builds both state tables and reads off firm, debt and equity values: A gives 190/145/45, B gives 150/100/50.",
              "Identifies that the manager, acting for shareholders, would prefer B (50 > 45), and NAMES it risk shifting / asset substitution.",
              "Answers the actual question asked: shareholders would NOT provide the $30, for either project, because their gain (20 for A, 25 for B) is less than the $30 required.",
              "Names the second mechanism too: project A is declined because of debt overhang — creditors capture $20 of a $10 NPV.",
              "Runs the check that the shareholders' gain plus the creditors' gain equals the project's NPV: +20 and +20 minus the 30 outlay gives +10 for A; +25 and −25 minus 30 gives −30 for B. This is one of the consistency checks the examiner performs.",
              "The typical mistake, called out in the official key, is confusing the stand-alone NPV with the change in equity value. They differ by exactly the transfer to creditors."
            ]
          },
          {
            "label": "c",
            "points": 16,
            "body": "<p>Suppose the manager offers the debt holders to renegotiate their current debt contract, which has a face value of $150. She offers to replace the existing debt contract with a new contract that stipulates a lower face value of $128. Suppose that if the debt holders reject the offer, the old contract remains in place and the face value remains at $150. If the debt holders accept the offer, will the manager be able to raise $30 from current shareholders? Which project would the manager choose, if she could raise $30? Will the debt holders agree to renegotiate and accept the new contract? Briefly discuss.</p>",
            "solution": "<p>Redo the equity valuations with the face value lowered to $128.</p><p>E<sub>A</sub> = &frac12;(240 &minus; 128) + &frac12;(140 &minus; 128) = &frac12;(112) + &frac12;(12) = 56 + 6 = <b>$62</b><br>E<sub>B</sub> = &frac12;(250 &minus; 128) + &frac12;(0) = <b>$61</b> &nbsp;(in the low state 50 &lt; 128, so the equity is still wiped out)</p><p><b>Question 1 &mdash; can she raise the $30?</b> <b>Yes.</b> Shareholders compare their position with the project against their fallback. If they refuse, the old $150 contract stands, no project is undertaken, and their claim is worth <b>$25</b> as in part (a). If they fund project A, their claim is worth $62 and they have paid out $30, for a net of <b>$32 &gt; $25</b>. They are $7 better off, so they provide the money.</p><p><b>Question 2 &mdash; which project?</b> <b>Project A.</b> Under the new contract E<sub>A</sub> = 62 &gt; E<sub>B</sub> = 61, so the manager, still maximising equity value, now picks the value-creating project. Net of the $30 injection it is $32 against $31.</p><p><b>Why the reversal happened.</b> Lowering the face value from $150 to $128 puts the equity <i>in the money</i> in the low state under project A: the shareholders now receive 140 &minus; 128 = $12 there instead of $0. That gives them something to lose, which blunts the appeal of gambling. Reducing the debt burden realigns the shareholders' incentives with the firm's &mdash; it is the same mechanism as a debt write-down in a real restructuring.</p><p><b>Question 3 &mdash; will the creditors accept?</b> <b>Yes.</b> They must anticipate what their concession will cause. If they accept, project A goes ahead and their claim is worth</p><p>D<sub>A</sub> = &frac12;(128) + &frac12;(128) = <b>$128</b></p><p>(both 240 and 140 exceed 128, so the new debt is <b>risk-free</b>). If they reject, nothing happens and their claim stays at <b>$125</b>. They gain <b>$3</b>, so they accept &mdash; even though they have cut the face value they are owed by $22. They give up a promise they were never going to collect in full and get certainty in exchange.</p><p><b>The consistency check that closes the exercise.</b></p><table class=\"data\"><tr><th>Party</th><th>Before (no renegotiation)</th><th>After (renegotiate, project A)</th><th>Gain</th></tr><tr><td>Debt holders</td><td class=\"n\">125</td><td class=\"n\">128</td><td class=\"n\">+3</td></tr><tr><td>Shareholders</td><td class=\"n\">25</td><td class=\"n\">62 &minus; 30 = 32</td><td class=\"n\">+7</td></tr><tr><td><b>Total</b></td><td class=\"n\"></td><td class=\"n\"></td><td class=\"n\"><b>+10</b></td></tr></table><p>The combined gain of $10 is exactly the NPV of project A, 40 &minus; 30. <b>Renegotiation produces a genuine efficiency gain</b>, not a transfer: it unlocks a positive-NPV project that debt overhang had blocked, and both sides share the proceeds. This check &mdash; that the parties' gains sum to the project's NPV &mdash; is one the examiner performs, so write it down.</p><p><b>One more thing worth saying.</b> The creditors' acceptance depends on the manager choosing A afterwards, and that is <b>credible</b> precisely because E<sub>A</sub> &gt; E<sub>B</sub> under the new contract. If she chose B instead, the debt would be worth &frac12;(128) + &frac12;(50) = $89, far below the $125 they gave up. A concession is only safe when it changes the borrower's incentives, not merely his balance sheet &mdash; which is why $128 works and why a smaller write-down might not.</p>",
            "criteria": [
              "Recomputes equity at the new face value: E_A = 62 and E_B = 61.",
              "Compares against the correct fallback, which is the status quo equity of $25 under the old contract, not zero.",
              "Answers all three questions: yes the $30 can be raised (32 > 25), the manager picks project A (62 > 61), and the creditors accept (128 > 125).",
              "Notices that the renegotiated debt is RISK-FREE under project A, since 140 > 128 in the low state, which is why it is worth its full face value of 128.",
              "Runs the closing check: creditors gain $3, shareholders gain $7, total $10 = the NPV of project A. The official key ends here, and the course lists this among the consistency checks the examiner expects.",
              "Explains the mechanism: cutting the face value puts the equity in the money in the low state, which removes the incentive to gamble and restores the incentive to invest.",
              "Bonus: checking that the manager's promise to choose A is credible, by valuing the debt at $89 if she chose B instead."
            ]
          }
        ]
      },
      {
        "n": 4,
        "title": "Problem 3 — Valuation with leverage (APV)",
        "points": 48,
        "topic": "APV",
        "chapters": [
          2,
          4,
          18
        ],
        "body": "<p>A fund is thinking of acquiring the publicly traded company &ldquo;Meatballs Inc&rdquo; (MBI). In order to evaluate the deal, the fund has access to the following information.</p><ul><li>The corporate tax rate is 30%. The long-term risk-free rate is 5% and the expected market risk premium is 6%.</li><li>MBI is currently (at t=0) trading at $90 per share and has 10 million shares outstanding. The beta of the MBI stock is estimated to equal to 1.0.</li><li>MBI currently (at t=0) has no debt outstanding and $300 million of excess cash on its balance sheet. (The fund is certain that the $300 million of cash can be paid out to shareholders without any effect on the future operations of the company.) In addition, the fund believes that MBI is underleveraged and therefore plans to lever up the company in the acquisition. The fund believes that the optimal debt level would be achieved by taking on $600 million of debt, at 10% interest, and by growing this debt at 4% per year. The $600 million of debt would be taken on next year (at t=1).</li><li>The operations of MBI are expected to generate revenues next year (at t=1) of $400 million and operating expenses (not including depreciation) of 60% of sales. Depreciation is expected to be $40 million next year (t=1), and capital expenditures are expected to be $50 million next year (t=1). Revenues, operating expenses, capital expenditures and depreciation are expected to grow at 4% per year after t=1 for the foreseeable future.</li><li>MBI currently (at t=0) has $90 million of net working capital (excluding excess cash). Future net working capital is expected to equal 25% of revenues.</li></ul>",
        "parts": [
          {
            "label": "a",
            "points": 12,
            "body": "<p>What is the free cash-flow of Meatballs Inc next year (t=1)?</p>",
            "solution": "<p>Build it from EBIT. All figures in $ millions.</p><table class=\"data\"><tr><th>Line</th><th>Value</th></tr><tr><td>Revenues</td><td class=\"n\">400.00</td></tr><tr><td>Operating expenses (60% of sales)</td><td class=\"n\">&minus;240.00</td></tr><tr><td>Depreciation</td><td class=\"n\">&minus;40.00</td></tr><tr><td><b>EBIT</b></td><td class=\"n\"><b>120.00</b></td></tr><tr><td>Taxes at 30%</td><td class=\"n\">&minus;36.00</td></tr><tr><td>EBIT(1 &minus; &tau;<sub>c</sub>)</td><td class=\"n\">84.00</td></tr><tr><td>+ Depreciation</td><td class=\"n\">+40.00</td></tr><tr><td>&minus; CapEx</td><td class=\"n\">&minus;50.00</td></tr><tr><td>&minus; &Delta;NWC</td><td class=\"n\">&minus;10.00</td></tr><tr><td><b>FCF<sub>1</sub></b></td><td class=\"n\"><b>64.00</b></td></tr></table><p>The working capital step is the one that is missed. NWC<sub>1</sub> = 25% &times; 400 = 100.00, and NWC<sub>0</sub> is given as 90.00, so &Delta;NWC = <b>10.00</b>, a cash outflow.</p><p><b>FCF<sub>1</sub> = 64.00</b>. Note what does not appear: interest. The $600 million of debt changes nothing in this line, because financing enters through the discount rate and through the tax shield, never through the numerator.</p>",
            "criteria": [
              "Depreciation subtracted before tax and added back after — not simply ignored.",
              "ΔNWC = 0.25 × 400 − 90 = 10, subtracted. Using the level (100) instead of the change is the standard error.",
              "No interest anywhere in the free cash flow.",
              "FCF1 = 64.00."
            ]
          },
          {
            "label": "b",
            "points": 12,
            "body": "<p>What is the unlevered cost of capital of Meatballs Inc?</p>",
            "solution": "<p>The quoted equity beta of 1.0 is the beta of the <b>whole</b> equity claim, and that claim holds two things: the operating business and $300 million of cash. Cash is risk free, so it has a beta of zero and it drags the measured beta down. Strip it out before using it.</p><div class=\"formula\"><div class=\"eq\">&beta;<sub>E</sub> &times; E = &beta;<sub>ops</sub> &times; V<sub>ops</sub> + &beta;<sub>cash</sub> &times; Cash</div></div><p>Equity = $90 &times; 10 million shares = <b>900</b>. Operations = 900 &minus; 300 = <b>600</b>. With &beta;<sub>cash</sub> = 0:</p><p>1.0 &times; 900 = &beta;<sub>ops</sub> &times; 600 &nbsp;&rArr;&nbsp; &beta;<sub>ops</sub> = 900/600 = <b>1.5000</b></p><p>The firm has no debt, so this asset beta <i>is</i> the unlevered beta. CAPM forwards:</p><p>r<sub>U</sub> = 0.05 + 1.5000 &times; 0.06 = <b>0.1400 = 14.00%</b></p><p>Taking &beta;<sub>U</sub> = 1.0 straight off the quote gives r<sub>U</sub> = 11.00%, which undervalues the business by understating its risk. The cash is not part of what you are discounting.</p>",
            "criteria": [
              "Excess cash netted out before unlevering: βops = βE × E/(E − Cash).",
              "βops = 1.5000 and rU = 14.00%.",
              "Recognising that with zero debt the asset beta and the unlevered beta are the same thing.",
              "Using β = 1.0 directly (rU = 11%) is the error the question is built to catch."
            ]
          },
          {
            "label": "c",
            "points": 8,
            "body": "<p>What is tax shield of Meatballs Inc next year (t=1)?</p>",
            "solution": "<p>The shield is the tax saved on the interest deduction:</p><div class=\"formula\"><div class=\"eq\">TS = &tau;<sub>c</sub> &times; r<sub>D</sub> &times; D = 0.30 &times; 0.10 &times; 600 = <b>18.00</b></div></div><p>State the timing assumption, because the wording is loose: the debt is described as taken on at t=1, and the question asks for the shield at t=1, so the intended reading is that the $600 million is in place for that year and the first shield of 18.00 accrues then. It then grows with the debt at 4% per year.</p>",
            "criteria": [
              "TS = τc · rD · D, not τc · D.",
              "18.00.",
              "Stating the timing assumption explicitly — the question invites it."
            ]
          },
          {
            "label": "d",
            "points": 16,
            "body": "<p>Use the APV method to determine the value of Meatballs Inc today (t=0). If you find it necessary to make additional assumptions, state them clearly.</p>",
            "solution": "<p>APV values the business as if unlevered, then adds the financing side effects, then adds assets that are not part of operations.</p><p><b>Step 1 &mdash; the unlevered business.</b> FCF<sub>1</sub> = 64.00 growing at 4% forever, discounted at r<sub>U</sub> = 14.00%:</p><p>V<sup>U</sup> = 64.00/(0.14 &minus; 0.04) = <b>640.00</b></p><p><b>Step 2 &mdash; the tax shield.</b> TS<sub>1</sub> = 18.00, growing at 4% forever. <b>Assumption, stated:</b> the debt grows at the same 4% as the firm's cash flows, so the debt-to-value ratio is constant. Under a rebalanced policy the shield carries the risk of the assets, so it is discounted at r<sub>U</sub>:</p><p>PV(TS) = 18.00/(0.14 &minus; 0.04) = <b>180.00</b></p><p><b>Step 3 &mdash; the excess cash.</b> It was excluded from operations in part b), so it must be added back here, at face value: <b>300.00</b>.</p><p><b>Step 4 &mdash; add up.</b></p><table class=\"data\"><tr><th>Component</th><th>Value</th></tr><tr><td>V<sup>U</sup>, operations</td><td class=\"n\">640.00</td></tr><tr><td>+ PV(tax shield)</td><td class=\"n\">180.00</td></tr><tr><td>+ Excess cash</td><td class=\"n\">300.00</td></tr><tr><td><b>V<sup>L</sup> at t=0</b></td><td class=\"n\"><b>1 120.00</b></td></tr></table><p><b>Sanity check against the market.</b> MBI trades at 900, of which 300 is cash, so the market prices the operations at 600 against your 640. The fund's case is that leverage adds a further 180. Both numbers are close enough to the market to be credible, which is what you want from a valuation.</p><p><b>The alternative assumption.</b> If instead you read the 4% debt growth as a fixed, predetermined schedule rather than a rebalancing rule, the shield is as safe as the debt and is discounted at r<sub>D</sub> = 10%: PV(TS) = 18.00/(0.10 &minus; 0.04) = 300.00 and V<sup>L</sup> = 1 240.00. Either answer earns full marks <b>if the assumption is stated and used consistently</b>. What loses marks is discounting at r<sub>D</sub> while calling the policy a constant ratio, or switching rate between parts.</p>",
            "criteria": [
              "V^U = 64.00/(0.14 − 0.04) = 640.00, using the growing perpetuity with FCF1 in the numerator.",
              "The discount rate for the tax shield is chosen and justified by a stated debt policy. Both 180.00 (at rU) and 300.00 (at rD) are acceptable when argued.",
              "Excess cash of 300.00 added back, since it was removed when unlevering the beta.",
              "V^L = 1 120.00 under the rebalanced reading, or 1 240.00 under the fixed-schedule reading.",
              "Not discounting FCF at the WACC and then adding a tax shield as well — that double counts the financing benefit."
            ]
          }
        ]
      },
      {
        "n": 5,
        "title": "Problem 4 — Real options (the patent)",
        "points": 48,
        "topic": "Real options",
        "chapters": [
          1,
          22,
          25
        ],
        "body": "<p>Assume Drugs Incorporated is a new company whose only asset is a patent on a new drug. If produced, the drug will generate sure, risk-free profits of $1 million for 20 years. After that, the patent expires and competition will drive profits down to zero. To produce the drug, the company would have to incur a one-time capital expenditure of $15 million. If the company invests today (date 0), the first profit of $1 million would arise one year from now (date 1). The investment would be irreversible. Finally, assume that the yield on a 20-year risk-free annuity is currently 5% per year.</p>",
        "parts": [
          {
            "label": "a",
            "points": 10,
            "body": "<p>What is the value of the patent today at date 0. Assume that the investment of $15 million can only be undertaken either now (at date 0) or never?</p><p><i>Hint: the present value of a stream of constant cash flows, beginning next period (time 1) with C<sub>1</sub>, lasting T periods, and discounted at a constant rate r, is the standard annuity formula.</i></p>",
            "solution": "<p>Twenty payments of $1 million starting at date 1, discounted at 5%:</p><div class=\"formula\"><div class=\"eq\">PV = (1/r)[1 &minus; (1 + r)<sup>&minus;T</sup>] &times; C = (1/0.05)[1 &minus; 1.05<sup>&minus;20</sup>] &times; 1</div></div><p>1.05<sup>20</sup> = 2.653298, so 1.05<sup>&minus;20</sup> = 0.376889 and the annuity factor is 20 &times; (1 &minus; 0.376889) = <b>12.4622</b>.</p><p>PV = <b>$12.4622 million</b>, against an outlay of $15 million:</p><p>NPV = 12.4622 &minus; 15 = <b>&minus;$2.5378 million</b></p><p>Negative, so under a now-or-never rule you do not invest, and the patent is worth <b>$0</b>. A patent you would never exercise is worthless &mdash; but only because the rule forbids waiting, which is exactly what the rest of the question relaxes.</p>",
            "criteria": [
              "Annuity factor 12.4622 for 20 years at 5%.",
              "NPV = −2.5378, so do not invest.",
              "Concluding that the patent is worth 0, not −2.5378. You are never forced to exercise."
            ]
          },
          {
            "label": "b",
            "points": 14,
            "body": "<p>We have assumed that the yield on a 20-year risk-free annuity is currently 5% per year. Assume that one year from now, interest rates will either permanently rise to 10% or fall to 2%.</p><p>Suppose now that you have the option to postpone the investment decision for one year. What is the value of the patent in one year (date 1) if interest rates have risen to 10%? What is the value of the patent in one year (date 1) if interest rates have fallen to 2%? Assume that the investment cost is unaffected by waiting and therefore still equals $15 million at date 1. The timing of your investment decision does not change the expiration date for the patent.</p>",
            "solution": "<p><b>The trap is in the last sentence.</b> Waiting does not postpone expiry, so a year of profit is lost for good: invest at date 1 and you collect <b>19</b> payments, from date 2 to date 20, not 20.</p><p><b>Rates rise to 10%.</b> 1.10<sup>19</sup> = 6.115909, so the annuity factor is (1/0.10)(1 &minus; 0.163508) = <b>8.3649</b>.</p><p>NPV<sub>1</sub> = 8.3649 &minus; 15 = &minus;6.6351 &rArr; do not invest &rArr; value = <b>$0</b></p><p><b>Rates fall to 2%.</b> 1.02<sup>19</sup> = 1.456811, so the annuity factor is (1/0.02)(1 &minus; 0.686435) = <b>15.6785</b>.</p><p>NPV<sub>1</sub> = 15.6785 &minus; 15 = <b>+$0.6785 million</b> &rArr; invest &rArr; value = <b>$0.6785 million</b></p><p>So the patent pays off in exactly one branch. Note how violent the effect of the rate is: the same twenty-year cash flow is worth 8.36 or 15.68 depending on the discount rate, which is why a long annuity is essentially a bet on interest rates.</p>",
            "criteria": [
              "Nineteen payments, not twenty. Using 20 gives 8.5136 and 16.3514 and is the single most common error here.",
              "Annuity factors 8.3649 and 15.6785.",
              "Value 0 in the high-rate state, because you decline — not the negative NPV.",
              "Value 0.6785 in the low-rate state."
            ]
          },
          {
            "label": "c",
            "points": 12,
            "body": "<p>Unfortunately, you do not know the real-life probabilities of the interest rising or falling. Use the concept of risk-neutral valuation to back out these probabilities from annuity prices. Assume that the current one-year risk-free rate is 3%.</p><p>What is the risk neutral probability that interest rates increase to 10%?</p>",
            "solution": "<p>The traded asset whose price you already know is the 20-year annuity itself: it costs 12.4622 today. Price it as a one-period tree. Holding it for one year pays the date-1 coupon of 1, plus whatever the remaining 19 payments are then worth, which is exactly the two annuity factors from part b).</p><div class=\"formula\"><div class=\"eq\">12.4622 &times; 1.03 = 1 + &rho;(8.3649) + (1 &minus; &rho;)(15.6785)</div><div class=\"where\">Left: today's price grown at the one-year risk-free rate. Right: the risk-neutral expected value at date 1, coupon included.</div></div><p>12.8361 = 16.6783 &minus; &rho;(7.3133)</p><p>&rho;(7.3133) = 3.8422 &nbsp;&rArr;&nbsp; <b>&rho; = 0.5254, that is 52.54%</b></p><p><b>Check.</b> Put &rho; back in: [1 + 0.5254(8.3649) + 0.4746(15.6785)]/1.03 = 12.4622, the observed price. ✓ This is a real check, not an identity &mdash; drop the date-1 coupon, or forget to grow the price by 1.03, and it fails.</p><p>Two things worth saying in the answer. First, &rho; is <b>not</b> a forecast: it is the probability under which the traded annuity is priced correctly, and that is precisely what makes it usable for valuing the patent. Second, the coupon must be included, because the annuity holder receives it while waiting.</p>",
            "criteria": [
              "Using the traded 20-year annuity as the underlying asset, since that is the only observed price.",
              "Including the date-1 coupon of 1 on the right-hand side.",
              "Discounting at the one-year rate of 3%, not at 5%.",
              "ρ = 0.5254 (52.54%), and stating that it is a risk-neutral, not a real-world, probability."
            ]
          },
          {
            "label": "d",
            "points": 12,
            "body": "<p>What is the value of the patent today (date 0) assuming that you have the option to wait one year (until date 1) to decide whether to invest in the drug? Briefly comment.</p>",
            "solution": "<p>Take the date-1 values from b), weight them with the risk-neutral probability from c), and discount at the one-year risk-free rate:</p><div class=\"formula\"><div class=\"eq\">V<sub>0</sub> = [&rho; &times; 0 + (1 &minus; &rho;) &times; 0.6785] / 1.03 = [0.4746 &times; 0.6785]/1.03</div></div><p>V<sub>0</sub> = 0.3220/1.03 = <b>$0.3126 million</b>, about $313 000.</p><p><b>Comment.</b> In part a) the same patent was worth nothing: the project has negative NPV today and always will at 5%. The entire $313 000 is the value of <b>flexibility</b>. Three points are worth making explicitly:</p><ul><li>The option is worth something only because you can decline in the bad branch. Truncating the downside at zero is what creates the value, exactly as for a financial call.</li><li>Waiting is not free: it costs a year of profit, since the patent expires on schedule. The option is worth having anyway, which tells you the rate uncertainty is large relative to that cost.</li><li>A naive expected-NPV calculation using the same &rho; without the option to decline gives 0.5254(&minus;6.6351) + 0.4746(0.6785) = &minus;3.1638, discounted &minus;3.0716. The difference between that and +0.3126 <b>is</b> the option value.</li></ul>",
            "criteria": [
              "Risk-neutral weighting of the two date-1 values, discounted at 3%.",
              "Using 0 rather than the negative NPV in the high-rate branch.",
              "V0 = 0.3126 (about $313 000).",
              "A comment that identifies the value as flexibility and names the asymmetry: unlimited participation on the upside, the right to walk away on the downside.",
              "Bonus for noting that waiting costs a year of patent life, so the option is not free."
            ]
          }
        ]
      }
    ]
  }
];
