/* kj7 · Options: payoffs, parity, binomial pricing, Black-Scholes */
window.EDU_DATA.kjerne.push({
  id: "kj7",
  num: 7,
  title: "Options: payoffs, parity, binomial pricing, Black-Scholes",
  chapters: [21, 22, 23],
  html: `
<p class="lead-in">Options are examined three ways. Put-call parity is a quick computation (2023 MC9–10). The binomial model, in seven of eleven papers, is a full exercise: 2022 Problem 4, and H2024 Exercise 6 (a 20-point real option). Black-Scholes is now pure intuition: H2025 Exercise 1 asked about volatility and a mispriced option.</p>

<h3>Payoffs, bounds and put-call parity</h3>
<p>A call gives the right to buy one share at the strike K on the expiry date T; a put gives the right to sell. Assume European options (exercise only at T) unless told otherwise:</p>
<div class="formula"><div class="eq">call payoff = max(S<sub>T</sub> − K, 0) · put payoff = max(K − S<sub>T</sub>, 0)</div>
<div class="where">A call is in the money when S &gt; K, a put when S &lt; K. Profit subtracts the premium; the exercise decision ignores it.</div></div>
<p>Arbitrage alone bounds European options on a share paying no dividends:</p>
<div class="formula"><div class="eq">max(S − PV(K), 0) ≤ C ≤ S · max(PV(K) − S, 0) ≤ P ≤ PV(K)</div>
<div class="where">PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. The floor uses the discounted strike, not the intrinsic value S − K, because K is paid only at T. So an American call on a non-dividend share is never exercised early.</div></div>
<p>A share plus a put, and a call plus a bond paying K, both pay max(S<sub>T</sub>, K) in every state, so they cost the same:</p>
<div class="formula"><div class="eq">C + PV(K) = P + S ⟺ C − P = S − PV(K)</div>
<div class="where">Put-call parity, not on the formula sheet. It needs European options on the same share with the same K and T, and no dividends before T. No volatility, expected return or probability enters, so it holds under any model. Three of C, P, S and PV(K) give the fourth. If quotes violate it, buy the cheap side and sell the dear one; the profit today equals the gap.</div></div>

<h3>The one-period binomial model</h3>
<p>The share moves from S<sub>0</sub> to S<sub>u</sub> or S<sub>d</sub>, and no arbitrage requires S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>. Hold Δ shares and B in bonds so that the portfolio pays exactly C<sub>u</sub> and C<sub>d</sub>:</p>
<div class="formula"><div class="eq">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) · B = (C<sub>d</sub> − S<sub>d</sub>Δ)/(1 + r<sub>f</sub>) · C = S<sub>0</sub>Δ + B</div>
<div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) · C = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">Both routes are on the formula sheet and always agree. B &lt; 0 means borrowing; a put has Δ &lt; 0. ρ, the risk-neutral probability, makes the share earn r<sub>f</sub>: a pricing weight, not a forecast, so discount at r<sub>f</sub>. Any traded asset on the tree gives the same ρ, which is how kj9 values a project.</div></div>
<div class="callout mech"><span class="h">Why the real probability never appears</span>The replicating portfolio matches the option's payoff in every state, not on average, so its cost is the price whatever anyone believes. Beliefs and risk aversion are not lost: they sit inside S<sub>0</sub>. Pairing a real probability with r<sub>f</sub> is the big error; for a share with a risk premium it overprices a call.</div>

<div class="worked"><span class="wh">Worked example: a call both ways, then the put and parity</span>
<p>S<sub>0</sub> = 100.00, S<sub>u</sub> = 130.00, S<sub>d</sub> = 80.00, r<sub>f</sub> = 4.00%, K = 105, one year. Tree check: 80.00 &lt; 104.00 &lt; 130.00 ✓</p>
<p><b>Step 1, replication.</b> C<sub>u</sub> = 25.00, C<sub>d</sub> = 0.00. Δ = 25.00/50.00 = 0.5000. B = (0.00 − 80.00 × 0.5000)/1.04 = −38.4615 (borrow). C = 50.0000 − 38.4615 = <b>11.5385</b>. State by state, repaying 40.00: 65.00 − 40.00 = 25.00 and 40.00 − 40.00 = 0.00 ✓</p>
<p><b>Step 2, risk-neutral.</b> ρ = (104.00 − 80.00)/50.00 = 0.4800. It prices the share: [0.4800(130.00) + 0.5200(80.00)]/1.04 = 104.0000/1.04 = 100.00 ✓. C = 0.4800(25.00)/1.04 = 12.0000/1.04 = <b>11.5385</b>.</p>
<p><b>Step 3, the put.</b> P<sub>u</sub> = 0.00, P<sub>d</sub> = 25.00. Δ<sub>P</sub> = (0.00 − 25.00)/50.00 = −0.5000, B<sub>P</sub> = (25.00 − 80.00 × (−0.5000))/1.04 = 62.5000 (lend), P = −50.0000 + 62.5000 = <b>12.5000</b>. Risk-neutral: 0.5200(25.00)/1.04 = 12.5000 ✓</p>
<p><b>Check, parity:</b> PV(K) = 105/1.04 = 100.9615, so P + S<sub>0</sub> − PV(K) = 12.5000 + 100.0000 − 100.9615 = 11.5385 = C ✓. This check can fail: call and put came from different payoffs and hedge ratios, so it catches a sign error in Δ<sub>P</sub> or a wrongly discounted strike.</p>
</div>

<h3>Black-Scholes and volatility</h3>
<p>With many small binomial steps the price converges to Black-Scholes, for a European call on a share paying no dividends:</p>
<div class="formula"><div class="eq">C = S·N(d<sub>1</sub>) − PV(K)·N(d<sub>2</sub>)</div>
<div class="eq">d<sub>1</sub> = ln[S/PV(K)]/(σ√T) + σ√T/2 · d<sub>2</sub> = d<sub>1</sub> − σ√T</div>
<div class="where">σ is the annual volatility of returns. This is C = SΔ + B again: N(d<sub>1</sub>) is the hedge ratio Δ, PV(K)·N(d<sub>2</sub>) the borrowing. N(d<sub>2</sub>) is the risk-neutral probability of finishing in the money; N(d<sub>1</sub>) is not a probability. No expected return appears. The sheet has had no N(d) tables since 2021.</div></div>
<table class="data">
<tr><th>Input rises</th><th>Call</th><th>Put</th><th>Why</th></tr>
<tr><td>Share price S</td><td>↑</td><td>↓</td><td>The call buys the share, the put sells it</td></tr>
<tr><td>Strike K</td><td>↓</td><td>↑</td><td>You pay K on a call, receive it on a put</td></tr>
<tr><td>Volatility σ</td><td>↑</td><td>↑</td><td>Truncated downside: dispersion adds only upside</td></tr>
<tr><td>Time to expiry T</td><td>↑</td><td>↑ American, ambiguous European</td><td>More dispersion, but a smaller PV(K) hurts the put</td></tr>
<tr><td>Risk-free rate r<sub>f</sub></td><td>↑</td><td>↓</td><td>A higher rate shrinks PV(K)</td></tr>
<tr><td>Dividends before T</td><td>↓</td><td>↑</td><td>The share drops ex-dividend; the holder gets no cash</td></tr>
</table>
<div class="callout mech"><span class="h">Why volatility raises both a call and a put</span>Spread out the distribution of S<sub>T</sub>. Extra high prices raise the call's payoff without limit, while extra low prices cost nothing, because the payoff is already zero there; the put mirrors this. The gain comes from the kink, not from a reward for risk. Since σ is absent from C − P = S − PV(K), call and put move by the same amount. Risk shifting (kj5), equity as a call (kj8) and real options (kj9) rest on the same kink.</div>
<p><b>Implied volatility</b> is the σ that makes the formula reproduce the market price. Since C rises strictly with σ, each price gives exactly one. It is a risk-neutral model output, not a measurement of the share.</p>
<p><b>The H2025 Exercise 1 question.</b> In k23 a call at 15.4519 implies σ = 40%; at a true σ of 25% it is worth 9.5220. Answer in four moves:</p>
<ol><li>Comparative static: call value rises with σ.</li>
<li>Direction: the call is worth less than its price, so it is overpriced, here by 5.9299. By parity the put is overpriced by the same amount.</li>
<li>Action: write the call and buy N(d<sub>1</sub>) shares, rebalancing as it moves, so you bet on volatility, not direction.</li>
<li>Limit: not an arbitrage. Your σ may be wrong, rebalancing costs money, and a naked written call has unlimited loss.</li></ol>

<div class="callout warn"><span class="h">Errors that lose points</span>S − K instead of S − PV(K) as the lower bound. Δ = C<sub>u</sub>/S<sub>u</sub>, or a positive Δ for a put. A real-probability expectation discounted at r<sub>f</sub>. ln(S/K) instead of ln[S/PV(K)]. "More time is worth more" said of a European put. Implied volatility, ρ or N(d<sub>2</sub>) presented as forecasts.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Put-call parity, C − P = S − PV(K), is not on the sheet; it holds for European options with equal K and T, no dividends, under any model.</li>
<li>A binomial price by replication (Δ, B) equals the price by ρ discounted at r<sub>f</sub>; the real probability never enters.</li>
<li>In Black-Scholes, N(d<sub>1</sub>) is the hedge ratio and N(d<sub>2</sub>) the risk-neutral probability of finishing in the money.</li>
<li>Volatility raises both calls and puts, because the payoff is truncated at zero; by parity, by the same amount.</li>
<li>True volatility below implied means the option is overpriced: write it and delta-hedge with N(d<sub>1</sub>) shares. A bet on volatility, not an arbitrage.</li></ul></div>
`,
  checks: [
    {
      id: "kj7-s1",
      q: "A European call and a European put on the same non-dividend share have the same strike and expiry. The put trades 4.00 above the call. What must be true?",
      options: [
        "The share price is 4.00 below the present value of the strike",
        "The share price is 4.00 below the strike",
        "The market expects the share to fall, so investors have bid up the put",
        "Nothing: calls should cost more than puts, so buying the call and writing the put is an arbitrage",
      ],
      answer: 0,
      explanation: "Parity gives C − P = S − PV(K), so C − P = −4.00 means S = PV(K) − 4.00. Comparing S with the undiscounted strike is the tempting slip, but K is paid only at T and must be discounted. Beliefs about direction do not enter parity at all: whether the call or the put is dearer depends only on S against PV(K).",
    },
    {
      id: "kj7-s2",
      q: "You have priced a one-period call by replication. An analyst now raises his probability of the up state from 0.50 to 0.70, while S<sub>0</sub>, S<sub>u</sub>, S<sub>d</sub>, K and r<sub>f</sub> are unchanged. The call's value…",
      options: [
        "rises, because the call's expected payoff rises",
        "rises to the new expected payoff discounted at r<sub>f</sub>",
        "cannot be found until you know the call's own expected return",
        "is unchanged: the replicating portfolio costs the same",
      ],
      answer: 3,
      explanation: "The portfolio of Δ shares and B in bonds pays the call's payoff in every state, so its cost fixes the price whatever the probabilities are. The expected payoff does rise, but discounting it at r<sub>f</sub> pairs a real probability with a risk-free rate and overprices the call. The call's own expected return would work as a discount rate, but you only know it once you have the price, which is why the risk-neutral route exists.",
    },
    {
      id: "kj7-s3",
      q: "The volatility of a non-dividend share rises while S, K, T and r<sub>f</sub> stay fixed. What happens to a European call and a European put on it with the same strike and expiry?",
      options: [
        "The call rises and the put falls, since they are bets in opposite directions",
        "Both rise, and by exactly the same amount",
        "Both fall, because investors demand compensation for risk",
        "The call rises, while the put is unchanged because its payoff is capped at K",
      ],
      answer: 1,
      explanation: "Both payoffs are truncated at zero, so extra dispersion adds upside without adding downside: in the high states for the call, in the low states for the put. Parity says C − P = S − PV(K), and σ is not in that expression, so the two changes must be equal. The opposite-directions answer describes a change in S, not in σ.",
    },
    {
      id: "kj7-s4",
      q: "A call's market price implies a volatility of 40%. You are confident the share's true volatility is 25%. Which response is right?",
      options: [
        "Buy the call: at a lower volatility it is less risky to hold",
        "Buy the put: if the call is overpriced, parity makes the put cheap",
        "Write the call and hold nothing else, since the profit is riskless",
        "Write the call and delta-hedge with N(d<sub>1</sub>) shares",
      ],
      answer: 3,
      explanation: "Call value rises with σ, so at your 25% the call is worth less than its price: it is overpriced and you sell it. Buying N(d<sub>1</sub>) shares hedges the exposure to S, leaving only your view on volatility. It is not riskless: you may be wrong about σ, the hedge must be rebalanced, and a naked written call has unlimited loss. Nor is the put cheap: σ is absent from parity, so the put is overpriced by the same amount.",
    },
  ],
  case: {
    id: "kj7-m1",
    open: true,
    topic: "One-period binomial: a put, parity and a mispriced call",
    points: 6,
    minutes: 10,
    body: `<p>Vikfjord Kjemi ASA trades at S<sub>0</sub> = 60.00 and pays no dividend. In one year the share will be worth either 80.00 or 50.00, and nothing else can happen. The one-year risk-free rate is r<sub>f</sub> = 5.00%. The firm's analyst puts the probability of the up state at 0.70. Consider one-year European options on the share with strike K = 65.</p>
<p>(a) Price the put by replication (Δ and B), and confirm the price with the risk-neutral probability ρ. (3 points)</p>
<p>(b) Use put-call parity to find the call, and verify it with ρ. (1 point)</p>
<p>(c) The call is quoted at 7.00. Set out the arbitrage, show that it owes nothing at date 1 in either state, and state the profit today. (2 points)</p>`,
    solution: `<p><b>(a) The put.</b> Tree check: 50.00 &lt; 1.05 × 60.00 = 63.00 &lt; 80.00 ✓. Payoffs: P<sub>u</sub> = max(65 − 80.00, 0) = 0.00, P<sub>d</sub> = 65 − 50.00 = 15.00.</p>
<p>Δ<sub>P</sub> = (0.00 − 15.00)/(80.00 − 50.00) = −0.5000 (short half a share). B<sub>P</sub> = (15.00 − 50.00 × (−0.5000))/1.05 = 40.00/1.05 = 38.0952 (lend). P = 60.00(−0.5000) + 38.0952 = −30.0000 + 38.0952 = <b>8.0952</b>.</p>
<p>ρ = (63.00 − 50.00)/(80.00 − 50.00) = 13/30 = 0.4333, 1 − ρ = 17/30 = 0.5667. It prices the share: [(13/30)(80.00) + (17/30)(50.00)]/1.05 = (34.6667 + 28.3333)/1.05 = 63.0000/1.05 = 60.00 ✓. Put: (17/30)(15.00)/1.05 = 8.5000/1.05 = 8.0952 ✓. The analyst's 0.70 is not used: the portfolio matches the put in both states, so beliefs cannot change its price.</p>
<p><b>(b) The call by parity.</b> PV(K) = 65/1.05 = 61.904762. C = P + S − PV(K) = 8.095238 + 60.000000 − 61.904762 = <b>6.1905</b>. With ρ: C<sub>u</sub> = 15.00, C<sub>d</sub> = 0.00, so C = (13/30)(15.00)/1.05 = 6.5000/1.05 = 6.1905 ✓. Pairing the analyst's 0.70 with r<sub>f</sub> would give 0.70(15.00)/1.05 = 10.0000, overpricing the call by 3.8095.</p>
<p><b>(c) The arbitrage.</b> 7.00 &gt; 6.1905, so the call is overpriced: write it and buy the replicating portfolio. Δ<sub>C</sub> = (15.00 − 0.00)/30.00 = 0.5000, B<sub>C</sub> = (0.00 − 50.00 × 0.5000)/1.05 = −23.8095 (borrow). Cash today: +7.0000 − 30.0000 + 23.8095 = <b>+0.8095</b>.</p>
<p>At date 1 the loan costs 23.8095 × 1.05 = 25.00. Up: 0.5(80.00) − 25.00 − 15.00 = 0.00. Down: 0.5(50.00) − 25.00 − 0.00 = 0.00. Nothing is owed in either state. Check: the profit today equals the mispricing, 7.0000 − 6.1905 = 0.8095 ✓.</p>`,
    criteria: [
      "Put by replication: Delta_P = −0.5000, B_P = 38.0952 (lend), P = 8.0952, confirmed with rho = 13/30 = 0.4333; the analyst's 0.70 is not used",
      "Call from parity: C = P + S − PV(K) = 6.1905 with PV(K) = 65/1.05 = 61.9048, matching rho × 15/1.05",
      "Arbitrage: write the call at 7.00, buy 0.5 shares, borrow 23.8095; profit today 0.8095 = 7.00 − 6.1905 and zero in both states at date 1",
    ],
  },
});
