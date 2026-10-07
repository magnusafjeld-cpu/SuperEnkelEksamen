/* kj8 · Debt and equity as options, and credit risk */
window.EDU_DATA.kjerne.push({
  id: "kj8",
  num: 8,
  title: "Debt and equity as options, and credit risk",
  chapters: [5, 24],
  html: `
<div class="callout kort"><span class="h">In short</span>This part applies options to the firm's own claims. Shareholders can walk away when the firm is worth less than its debt, so equity works like a call option on the firm's assets, with the face value of the debt as the strike price. Risky debt is then safe debt minus a put. That explains why a bond's promised yield is higher than its expected return, how default risk is priced and why more risk in the assets moves value from lenders to shareholders. Credit default swaps, which insure a lender against default, close the part.</div>

<p class="lead-in">Credit risk and option-based debt pricing are in eight of eleven mapped papers: 2015 Problem 4 alone was worth 90 points, and 2016 Problem 4, 2021 MC7–9 and V2024 Problems 3 and 4 sit here too. Neither Kurbatov paper has used it yet, so it is a real risk rather than a certainty.</p>

<h3>Promised versus expected return</h3>
<p>A zero-coupon bond with face value F and price P has yield y = (F/P)<sup>1/n</sup> − 1, a promised return earned only if every krone arrives. With default probability p and loss given default L = 1 − R (R the recovery rate):</p>
<div class="formula"><div class="eq">r<sub>D</sub> = y − p·L · credit spread = y − r<sub>f</sub></div>
<div class="where">Not on the sheet. The wedge y − r<sub>D</sub> = p·L is expected loss, money the lender never expects to get; it never enters β<sub>D</sub>. Only r<sub>D</sub> − r<sub>f</sub> is a risk premium, because defaults cluster in bad times: β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(market risk premium). Never put y in a WACC. Given payoffs, compute r<sub>D</sub> from expected cash flows instead and say so.</div></div>

<h3>Equity is a call on the firm's assets</h3>
<p>Let the assets be worth V<sub>T</sub> when the only debt, a zero-coupon bond with face value F, matures. Limited liability gives:</p>
<div class="formula"><div class="eq">E<sub>T</sub> = max(V<sub>T</sub> − F, 0) · D<sub>T</sub> = min(V<sub>T</sub>, F)</div>
<div class="eq">E = Call(V, F, T) · D = V − Call = PV(F) − Put(V, F, T)</div>
<div class="where">The strike is the face value F (k24 calls it K), and σ is asset volatility, not share volatility. The lender has written the shareholders a put: the right to hand over the assets instead of paying F. From D, y = (F/D)<sup>1/T</sup> − 1 and the spread is y − r<sub>f</sub>.</div></div>
<figure>
<svg viewBox="0 0 620 360" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Payoff diagram at maturity splitting firm value between debt and equity. Equity is flat at zero up to the face value F and then rises one for one, which is a call payoff. Debt rises one for one up to F and is then flat at F, which equals a risk-free payment of F minus a put payoff, the shaded triangle below F."
     font-family="Georgia,serif" font-size="12.5">
  <polygon points="70,300 70,175 320,175" fill="#b06000" fill-opacity="0.12"/>
  <line x1="70" y1="300" x2="595" y2="300" stroke="#333" stroke-width="1.4"/>
  <line x1="70" y1="300" x2="70" y2="45" stroke="#333" stroke-width="1.4"/>
  <line x1="70" y1="175" x2="570" y2="175" stroke="#999" stroke-dasharray="5 4"/>
  <text x="500" y="168" fill="#555" font-size="11.5">risk-free debt: F in every state</text>
  <line x1="70" y1="300" x2="570" y2="50" stroke="#2f5a3f" stroke-width="1.1" stroke-dasharray="2 6"/>
  <text x="574" y="54" fill="#2f5a3f" font-size="11.5">V</text>
  <polyline points="70,300 320,175 570,175" fill="none" stroke="#1f3a5f" stroke-width="2.4"/>
  <polyline points="70,300 320,300 570,175" fill="none" stroke="#6b1f2a" stroke-width="2.6"/>
  <text x="200" y="215" fill="#1f3a5f" font-weight="bold">D = min(V, F)</text>
  <text x="430" y="252" fill="#6b1f2a" font-weight="bold">E = max(V − F, 0)</text>
  <text x="392" y="272" fill="#6b1f2a" font-size="11.5">the call</text>
  <text x="112" y="264" fill="#b06000" font-size="11.5">the put the</text>
  <text x="112" y="280" fill="#b06000" font-size="11.5">lender wrote</text>
  <line x1="320" y1="300" x2="320" y2="120" stroke="#999" stroke-dasharray="4 4"/>
  <text x="320" y="112" text-anchor="middle" fill="#555">F, the face value</text>
  <circle cx="320" cy="300" r="4" fill="#6b1f2a"/>
  <circle cx="320" cy="175" r="4" fill="#1f3a5f"/>
  <text x="62" y="304" text-anchor="end" fill="#555" font-size="11">0</text>
  <text x="62" y="179" text-anchor="end" fill="#555" font-size="11">F</text>
  <text x="24" y="175" text-anchor="middle" transform="rotate(-90 24 175)" fill="#333">Payoff at maturity</text>
  <text x="330" y="332" text-anchor="middle" fill="#333">Value of the firm's assets at maturity, V<tspan baseline-shift="sub" font-size="9">T</tspan></text>
  <text x="452" y="120" fill="#2f5a3f" font-size="11.5">D + E = V in every state</text>
  <line x1="570" y1="175" x2="570" y2="120" stroke="#2f5a3f" stroke-width="1.2"/>
</svg>
<figcaption>Equity (red) is a call struck at F. Debt (blue) is a safe F minus the shaded put.</figcaption>
</figure>
<p>With Black-Scholes on the assets, E = V·N(d<sub>1</sub>) − PV(F)·N(d<sub>2</sub>), and 1 − N(d<sub>2</sub>) is the risk-neutral default probability, above the true one. The equity beta follows:</p>
<div class="formula"><div class="eq">β<sub>E</sub> = N(d<sub>1</sub>)·(V/E)·β<sub>U</sub></div>
<div class="where">Memorise it. N(d<sub>1</sub>) is the equity's delta with respect to V, and V/E the leverage inside the option, so β<sub>E</sub> explodes as the firm nears distress.</div></div>
<div class="callout mech"><span class="h">Why volatility helps equity and hurts debt</span>Equity is a call, and a call gains from volatility (kj7). Raise asset volatility with V unchanged and the call gains exactly what the lender's written put loses: a pure transfer, so check 4 holds. This is risk shifting (kj5) with a price on it, and why lenders write covenants.</div>

<h3>Credit default swaps and coinsurance</h3>
<div class="formula"><div class="eq">CDS payoff = max(F − V<sub>T</sub>, 0) · upfront price = PV(F) − D · spread s = q·L</div>
<div class="where">A CDS buys back the lender's put, so risky bond + CDS = risk-free bond. q is the risk-neutral default probability over the period, not a historical default rate. Backwards: q = s/L.</div></div>
<p><b>Coinsurance.</b> Merge two firms with imperfectly correlated assets and no synergies, and one firm's good state covers the other's shortfall, so the merged firm defaults less often. In k24, two independent firms worth 100 or 40 (ρ = 0.5, r<sub>f</sub> = 0) with debt of face value 60 each merge: only the bad-bad state still defaults, debt rises from 100 to 110 and equity falls from 40 to 30 (check 4). A call on a portfolio is worth no more than a portfolio of calls.</p>

<div class="worked"><span class="wh">Worked example: split a two-state firm and price its credit</span>
<p>Assets V<sub>0</sub> = 100, worth 130 or 80 in one year. One zero-coupon bond, F = 90, due in one year. r<sub>f</sub> = 5.00%, and the assets are traded.</p>
<table class="data">
<tr><th>State</th><th>V<sub>T</sub></th><th>Debt</th><th>Equity</th><th>Put</th></tr>
<tr><td>Up</td><td class="n">130</td><td class="n">90</td><td class="n">40</td><td class="n">0</td></tr>
<tr><td>Down</td><td class="n">80</td><td class="n">80</td><td class="n">0</td><td class="n">10</td></tr>
</table>
<p><b>Step 1, the claims.</b> ρ = (1.05 × 100 − 80)/(130 − 80) = 0.5000. E = 0.5000(40)/1.05 = 19.0476, D = [0.5000(90) + 0.5000(80)]/1.05 = 80.9524. E + D = 100.0000 = V<sub>0</sub> ✓</p>
<p><b>Step 2, debt as risk-free minus a put.</b> PV(F) = 90/1.05 = 85.7143, Put = 0.5000(10)/1.05 = 4.7619, and 85.7143 − 4.7619 = 80.9524 = D ✓</p>
<p><b>Step 3, yield and spread.</b> y = 90/80.9524 − 1 = 11.1765%, spread 6.1765%.</p>
<p><b>Step 4, the CDS.</b> Protection on 90 pays 0 or 10, the put: 4.7619 upfront. Paid at year end, s = 4.7619 × 1.05/90 = 5.5556% = q·L = 0.5000 × 10/90. Bond plus CDS costs 85.7143 and pays 90 for sure: 5.0000% = r<sub>f</sub> ✓</p>
<p><b>Step 5, expected return.</b> With a real down probability of 0.35, E[payment] = 0.65(90) + 0.35(80) = 86.5000 and r<sub>D</sub> = 86.5000/80.9524 − 1 = 6.8529%. <b>Check:</b> r<sub>f</sub> &lt; r<sub>D</sub> &lt; y ✓</p>
</div>

<div class="callout warn"><span class="h">Errors that lose points</span>Using y as r<sub>D</sub> or reading the whole spread as risk premium. Share volatility where asset volatility belongs. Pricing debt directly instead of as V − E or PV(F) − Put. Pairing real probabilities with r<sub>f</sub>. Calling 1 − N(d<sub>2</sub>) a default forecast.</div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>The yield is promised; r<sub>D</sub> = y − p·L is expected (p the default probability, L the loss given default), and the wedge p·L is expected loss, which never enters β<sub>D</sub>.</li>
<li>Equity is a call on the firm's assets struck at the face value F; risky debt = PV(F) − Put = V − Call.</li>
<li>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub> is not on the sheet; it explodes near distress.</li>
<li>More asset volatility with V fixed moves value from creditors to shareholders (check 4).</li>
<li>A CDS is the lender's put, priced off the risk-neutral default probability: spread q·L, and risky bond + CDS = risk-free bond.</li></ul></div>
`,
  checks: [
    {
      id: "kj8-s1",
      q: "A bond has promised yield y = 9.00%. The default probability is p = 5% and the loss given default is L = 60%. With r<sub>f</sub> = 4.00% and a market risk premium of 5.00%, the debt beta is…",
      options: [
        "1.00, from the spread y − r<sub>f</sub>",
        "0.60, from the expected loss p·L",
        "0.00, because the expected loss has been deducted and what remains is safe",
        "0.40, from r<sub>D</sub> = 9.00% − 3.00% = 6.00%",
      ],
      answer: 3,
      explanation: "The expected return is r<sub>D</sub> = y − p·L = 0.0900 − 0.0300 = 0.0600, and β<sub>D</sub> = (0.0600 − 0.0400)/0.0500 = 0.40. Taking beta from the whole spread treats expected loss as a risk premium, but p·L is money the lender never expects to receive and carries no beta. The remaining 2.00 percentage points over r<sub>f</sub> is real compensation for systematic default risk, so β<sub>D</sub> is not zero.",
    },
    {
      id: "kj8-s2",
      q: "Managers of a levered firm swap its assets for riskier ones with the same total market value V. Nothing else changes. What happens?",
      options: [
        "Equity rises and debt falls by the same amount",
        "Equity and debt both fall, because investors dislike risk",
        "Nothing, because V is unchanged",
        "Debt rises, because creditors now receive a higher promised yield",
      ],
      answer: 0,
      explanation: "Equity is a call on V struck at F, and a call gains from volatility; debt is PV(F) minus a put, and the put gains too, so debt falls. With V fixed the change is a pure transfer: the shareholders' gain equals the creditors' loss (check 4), and the credit spread widens. The promised yield on existing debt rises only because its price falls, which hurts the holders rather than helping them.",
    },
    {
      id: "kj8-s3",
      q: "A one-year CDS on a firm trades at a spread of 3.00% of notional, and the market assumes 40% recovery. What does this tell you about default?",
      options: [
        "The default probability is 3.00%, the spread itself",
        "The default probability is 7.50%, the spread divided by the recovery rate",
        "The default probability is 5.00%, the market's forecast of how often firms like this default",
        "The default probability is 5.00%, a risk-neutral figure above the true default probability",
      ],
      answer: 3,
      explanation: "The spread is the risk-neutral expected loss rate, s = q·L, so q = 0.0300/0.60 = 0.0500. It must be divided by the loss given default, 1 − R = 0.60, not by the recovery rate. Because it is a pricing probability, it already contains the premium for default clustering in bad times, so it overstates the real default frequency and is not a forecast.",
    },
  ],
  case: {
    id: "kj8-m1",
    open: true,
    topic: "A two-state firm: equity, debt, spread and a CDS",
    points: 6,
    minutes: 10,
    body: `<p>Trollheim Maskin AS has assets worth V<sub>0</sub> = 150 today (NOK million). In one year the assets will be worth either 190 or 110. The firm's only liability is a zero-coupon bond with face value F = 130, due in one year. The one-year risk-free rate is r<sub>f</sub> = 4.00%, and the assets are traded, so risk-neutral valuation applies directly to V.</p>
<p>(a) Find the risk-neutral probability ρ of the up state, value the equity and the debt, and show that they add up to V<sub>0</sub>. (2 points)</p>
<p>(b) Compute the promised yield and the credit spread on the bond, and show that the debt equals risk-free debt minus a put. (2 points)</p>
<p>(c) A bank sells a one-year CDS on the full face value of 130. Find its upfront price, and the running spread s, as a fraction of the 130 notional, if the premium is instead paid at the end of the year in both states. Show that the bond plus the CDS earns r<sub>f</sub>. (2 points)</p>`,
    solution: `<p><b>(a) ρ and the two claims.</b> ρ = (1.04 × 150 − 110)/(190 − 110) = (156 − 110)/80 = 0.5750, so 1 − ρ = 0.4250. Up: debt 130, equity 60. Down: debt 110, equity 0.</p>
<p>E = 0.5750(60)/1.04 = 34.5000/1.04 = <b>33.1731</b>. D = [0.5750(130) + 0.4250(110)]/1.04 = (74.7500 + 46.7500)/1.04 = 121.5000/1.04 = <b>116.8269</b>. Check: 33.1731 + 116.8269 = 150.0000 = V<sub>0</sub> ✓. Equity is a call on the assets struck at the face value 130.</p>
<p><b>(b) Yield, spread and the put.</b> y = 130/116.8269 − 1 = <b>11.2757%</b>, a promised return. Spread = 11.2757% − 4.0000% = <b>7.2757%</b>.</p>
<p>PV(F) = 130/1.04 = 125.0000. The put pays max(130 − V, 0): 0 up, 20 down, so Put = 0.4250(20)/1.04 = 8.5000/1.04 = 8.1731. D = 125.0000 − 8.1731 = 116.8269 ✓, the same as in (a).</p>
<p><b>(c) The CDS.</b> The protection pays 0 up and 130 − 110 = 20 down, exactly the put, so the upfront price is <b>8.1731</b> = PV(F) − D = 125.0000 − 116.8269.</p>
<p>Paid at year end: s × 130/1.04 = 8.1731, so s = 8.5000/130 = <b>6.5385%</b>. That is q·L with q = 1 − ρ = 0.4250 and L = 20/130 = 0.153846: 0.4250 × 0.153846 = 0.065385 ✓. It is below the bond spread of 7.2757% because the bond spread is charged on the price 116.8269, not on 130.</p>
<p>Bond plus CDS costs 116.8269 + 8.1731 = 125.0000 and pays 130 in both states: 130/125.0000 − 1 = 4.0000% = r<sub>f</sub> ✓. Risky bond + CDS = risk-free bond.</p>`,
    criteria: [
      "rho = 0.5750; E = 33.1731 and D = 116.8269, summing to V0 = 150",
      "y = 11.2757% (promised), spread = 7.2757%; D = PV(F) − Put = 125.0000 − 8.1731",
      "CDS upfront = 8.1731 (the put), running spread s = q × L = 0.4250 × 20/130 = 6.5385%",
      "Bond + CDS costs 125.0000 and pays 130 for sure, earning r_f = 4%",
    ],
  },
});
