/* kj2 · Modigliani-Miller, recapitalisations and payout */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Modigliani-Miller, recapitalisations and payout",
  chapters: [6, 15, 16],
  html: `
<p class="lead-in">H2024 Exercise 3 and H2025 Exercise 3 were this part alone, 18 points each: a perfect-market firm issues debt, pays it out as a buyback or a special dividend, and you price every step and compare the seller with the holder. MM appears in all eleven mapped papers, payout in seven.</p>
<h3>MM in a perfect market</h3>
<p>A perfect capital market means: no taxes; no transaction, issuance or distress costs; investment and cash flows that do not depend on financing; the same information for everyone; and investors who borrow, lend and trade on the same terms as firms.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = E + D = V<sup>U</sup></div>
<div class="where">MM Proposition I. Financing divides the cash flow of the assets; it does not enlarge it.</div></div>
<p>The argument is homemade leverage. If a levered firm were worth more than an identical unlevered one, you could copy its equity by buying unlevered shares and borrowing on your own account in the same proportion: the same payoff in every state, at a lower cost. Investors would sell the levered equity and buy the copy until the gap closed. Nobody pays a firm for leverage they can make themselves.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">MM Proposition II, on the formula sheet. Risk moves to equity, so r<sub>E</sub> rises with D/E; the pre-tax WACC stays at r<sub>U</sub>.</div></div>
<div class="callout mech"><span class="h">Why does r<sub>E</sub> rise without making anyone poorer?</span>Debt is paid first and absorbs little of the swing in asset value, so the swing lands on a smaller equity base. The higher r<sub>E</sub> compensates exactly for that risk, with a higher expected payout per krone of equity, so the shareholder's wealth does not move. It is not bad news.</div>
<h3>The recapitalisation, move by move</h3>
<p>A leveraged recapitalisation issues debt D<sub>new</sub> and hands the cash to shareholders. V is unchanged, so equity falls by exactly D<sub>new</sub>:</p>
<div class="formula"><div class="eq">repurchase: n = D<sub>new</sub>/P · N<sub>1</sub> = N<sub>0</sub> − n · price unchanged</div>
<div class="eq">special dividend: DPS = D<sub>new</sub>/N<sub>0</sub> · P<sub>ex</sub> = P<sub>0</sub> − DPS · N unchanged</div>
<div class="eq">both: E<sub>1</sub> = V − D<sub>new</sub> · r<sub>E</sub> = r<sub>U</sub> + (D<sub>new</sub>/E<sub>1</sub>)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">P is the post-announcement price the shares are bought at; here it equals P<sub>0</sub>, with taxes it does not (kj3). D/E, and so r<sub>E</sub>, is the same on both routes. Use the r<sub>D</sub> lenders quote at the new leverage.</div></div>
<div class="callout mech"><span class="h">Announcement and execution are different events</span>The announcement is when the market learns the plan, so it is the only moment news can move the price; a later ex-dividend drop is just the cash leaving. Without taxes the plan creates nothing, so there is nothing to price. Execution swaps cash for shares, or pays cash out, at prices already set: it changes the form of wealth, not its size.</div>
<div class="worked"><span class="wh">Worked example: one recapitalisation, both routes</span>
<p>An all-equity firm, no taxes. FCF 90.00 a year in perpetuity, all paid out; r<sub>U</sub> = 9.0000%; 40 million shares. It announces 400.00 of permanent risk-free debt at r<sub>D</sub> = 4.0000%, all proceeds to shareholders. Millions of kroner.</p>
<p><b>Step 1, before.</b> V = 90.00/0.090000 = 1000.00, P<sub>0</sub> = 1000.00/40 = 25.00, DPS = 90.00/40 = 2.25.</p>
<p><b>Step 2, announcement.</b> No taxes, no costs, assets unchanged: V stays 1000.00 and the price stays 25.00 (MM I).</p>
<p><b>Step 3, after, both routes.</b> E<sub>1</sub> = 1000.00 − 400.00 = 600.00, D/E = 0.666667. r<sub>E</sub> = 0.090000 + 0.666667(0.090000 − 0.040000) = 0.090000 + 0.033333 = <b>12.3333%</b>. Equity receives 90.00 − 0.04(400.00) = 74.00 a year.</p>
<p><b>Step 4, repurchase.</b> n = 400.00/25.00 = 16 million, leaving 24 million at 600.00/24 = 25.00. New DPS = 74.00/24 = 3.0833.</p>
<p><b>Step 5, special dividend instead.</b> DPS = 400.00/40 = 10.00, so P<sub>ex</sub> = 25.00 − 10.00 = 15.00. Ongoing DPS = 74.00/40 = 1.85.</p>
<table class="data">
<tr><th>One share before</th><th>Holds</th><th>Cash</th><th>Wealth</th></tr>
<tr><td>No recapitalisation</td><td>2.25 a year at 9.0000%</td><td class="n">0.00</td><td class="n">25.00</td></tr>
<tr><td>Special dividend</td><td>1.85 a year at 12.3333%</td><td class="n">10.00</td><td class="n">25.00</td></tr>
<tr><td>Tenders into the buyback</td><td>nothing</td><td class="n">25.00</td><td class="n">25.00</td></tr>
<tr><td>Holds through the buyback</td><td>3.0833 a year at 12.3333%</td><td class="n">0.00</td><td class="n">25.00</td></tr>
</table>
<p><b>Check:</b> 3.0833/0.123333 = 25.00 and 1.85/0.123333 = 15.00 ✓. These can fail: discount 3.0833 at the old 9.0000% and you get 34.26. P = E<sub>1</sub>/N<sub>1</sub> cannot, since n was defined as D<sub>new</sub>/P.</p></div>
<p>The investor is indifferent because he can convert one route into the other himself. Under the buyback, a holder who wants cash sells shares at 25.00. Under the dividend, a holder who wants none reinvests 10.00 at the ex-dividend price of 15.00, buys 0.6667 shares, and owns 1.6667 of 40 million shares, the same fraction as 1 of 24 million. Selling shares for cash is a homemade dividend; reinvesting a dividend undoes one.</p>
<h3>Payout in a perfect market</h3>
<p>With investment fixed, a dividend and a repurchase are equivalent. A dividend lowers the price and keeps the share count; a repurchase keeps the price and lowers the count. EPS changes, value does not: in the example EPS (all paid out, so equal to DPS) rises from 2.25 to 3.0833 after the buyback, yet the price stays 25.00, because r<sub>E</sub> rose from 9.0000% to 12.3333%. The ex-dividend drop is no loss either: the holder has the difference in cash.</p>
<div class="callout warn"><span class="h">Errors that lose points</span><ul>
<li>Say <b>why</b> the price holds ("no taxes, so the recapitalisation is purely financial, MM I"), not only that it does.</li>
<li>Buy back at the post-announcement price; reinvest a dividend at the ex-dividend price, not the cum price.</li>
<li>If the new loan first repays old debt, only D<sub>new</sub> − D<sub>old</sub> reaches shareholders, while MM II uses the total new debt (H2024 Exercise 3).</li>
<li>Relever: discount the new DPS at the new r<sub>E</sub>, built with the new r<sub>D</sub>.</li>
<li>"r<sub>E</sub> rose, so shareholders lost", "the price fell ex-dividend, so value was destroyed" and "EPS rose, so value was created" are all wrong in a perfect market.</li>
</ul></div>
<h3>Payout with frictions</h3>
<p>Any real price reaction to a payout must come from a named friction:</p>
<table class="data">
<tr><th>Friction</th><th>Mechanism</th><th>Favours</th></tr>
<tr><td>Taxes</td><td>A dividend is taxed in full, for every holder, at once. A repurchase taxes only the gain, only for sellers, at the gains rate, and defers the rest. With τ<sub>d</sub> above τ<sub>g</sub> the ex-dividend drop is only Div(1 − τ<sub>d</sub>)/(1 − τ<sub>g</sub>).</td><td>Repurchases</td></tr>
<tr><td>Clienteles</td><td>Investors sort by tax rate; tax-exempt holders take the high payers. The marginal investor is then indifferent, but serving a clientele already served creates nothing.</td><td>What the holders want</td></tr>
<tr><td>Signalling</td><td>Managers know more. Dividends are smoothed: set at a sustainable level, raised slowly, cut only under pressure, so a rise is good news and a cut very bad news. A buyback signals undervaluation, more weakly: an open-market programme commits to nothing.</td><td>Smoothed dividends</td></tr>
<tr><td>Agency</td><td>Free cash flow left inside is spent on empire building; cash paid out cannot be wasted, and a sticky dividend commits more than a buyback.</td><td>Committed payout</td></tr>
</table>
<p>Repurchase methods: <b>open market</b> (on the exchange at the market price; most common, no commitment), <b>fixed-price tender</b> (a stated number of shares at a stated premium, pro rata if oversubscribed) and <b>Dutch auction</b> (holders name the lowest price they accept; everyone is paid the one clearing price that fills the quantity, usually a smaller premium). A tender premium is not a gift. If everyone tenders pro rata, holders pay it to themselves out of the firm's cash and the post-offer price falls below the old one; if only some tender, it transfers value from those who stay to those who sell.</p>
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>In a perfect market a debt-financed payout leaves V unchanged and the price unchanged at the announcement (MM I); equity falls by exactly the new debt. A buyback keeps the price; a special dividend lowers it by the dividend.</li>
<li>Repurchase: n = cash paid out/P at the post-announcement price. Special dividend: DPS = cash paid out/N<sub>0</sub> and P<sub>ex</sub> = P<sub>0</sub> − DPS. If old debt is refinanced, the cash paid out is D<sub>new</sub> − D<sub>old</sub>.</li>
<li>Relever with MM II at the new D/E and the new r<sub>D</sub>; the check that can fail is new DPS / new r<sub>E</sub> = the price.</li>
<li>Seller, holder and dividend taker end with the same wealth, and homemade dividends (or reinvesting) undo any payout choice; EPS can change, value does not.</li>
<li>With frictions: taxes favour repurchases for taxable holders when τ<sub>d</sub> &gt; τ<sub>g</sub>, signalling favours smoothed dividends, free cash flow favours committed payout; a tender premium is a transfer, not value.</li></ul></div>
`,
  checks: [
    {
      id: "kj2-s1",
      q: "A firm in a perfect market with no taxes announces that it will borrow and use the cash to buy back shares. At the announcement, the share price…",
      options: [
        "rises, because fewer shares will share the same earnings",
        "stays unchanged, because the plan only re-divides the same asset cash flows",
        "falls, because r<sub>E</sub> rises and equity is discounted at a higher rate",
        "rises by D<sub>new</sub>/N<sub>0</sub>, because the new debt adds value to the firm",
      ],
      answer: 1,
      explanation: "Without taxes or costs the recapitalisation creates nothing, so V and the price stay put, at the announcement and at execution (MM I). The higher r<sub>E</sub> comes with a higher expected dividend per share, so it does not push the price down. The higher EPS comes with more risk per share, so it does not push the price up.",
    },
    {
      id: "kj2-s2",
      q: "A firm has 20 million shares at 40.00 in a perfect market and pays a debt-financed special dividend of 200 million. A shareholder who wanted no cash reinvests his dividend in the firm's shares. Which is right?",
      options: [
        "He buys at the ex-dividend price of 30.00 and is back at 40.00 per original share",
        "He buys at 40.00, since the dividend did not change the value of the firm",
        "He cannot undo it: the dividend has cut his wealth by 10.00 per share, and buying back cannot restore it",
        "He buys at 30.00 and ends richer than before, because the shares are now cheaper",
      ],
      answer: 0,
      explanation: "DPS = 200/20 = 10.00, and the price falls by exactly that, to 30.00. Reinvesting 10.00 at 30.00 buys one third of a share, so each original share becomes 4/3 of a share worth 40.00: a homemade reversal of the dividend. Buying at the stale cum price of 40.00 is the classic slip, and the lower price is no gain, because each share is now a claim on less equity.",
    },
    {
      id: "kj2-s3",
      q: "A firm in a perfect market borrows to buy back shares, and its EPS rises by 8%. The share price…",
      options: [
        "rises by about 8%, because the P/E ratio stays the same",
        "falls, because the firm now carries debt",
        "is unchanged: the higher EPS comes with a higher r<sub>E</sub>, so the P/E ratio falls",
        "rises, because a buyback tells the market that the shares are undervalued",
      ],
      answer: 2,
      explanation: "The firm buys its shares at a fair price, so equity and the share count fall in proportion and the price is unchanged (MM I). Each remaining share carries more risk, so r<sub>E</sub> rises and the P/E ratio falls just enough to absorb the higher EPS. The signalling answer needs asymmetric information, which a perfect market rules out.",
    },
    {
      id: "kj2-s4",
      q: "A firm makes a fixed-price tender offer at a 10% premium, and every shareholder tenders the same fraction of his shares. In a perfect market, the shareholders as a group…",
      options: [
        "are no better off: they pay the premium to themselves",
        "gain the premium on every share they tender, paid out of the firm's cash",
        "lose, because the price after the offer is below the price before it",
        "gain, because the premium signals that the shares are undervalued",
      ],
      answer: 0,
      explanation: "Each holder collects the premium on the shares he sells and loses the same amount on the shares he keeps, whose price falls below the pre-offer level, so his wealth per original share is unchanged. The lower post-offer price is the other half of that trade, not a loss. Only when some holders stay out does the premium become a transfer from those who stay to those who sell.",
    },
  ],
  case: {
    id: "kj2-m1",
    open: true,
    topic: "Recapitalisation with risky debt, buyback against special dividend",
    points: 6,
    minutes: 10,
    body: `<p>Sirdal Kjøling ASA is all-equity and operates in a perfect capital market: no taxes, no transaction, issuance or distress costs, and symmetric information. Its expected free cash flow is NOK 60 million a year in perpetuity, all paid out, and its unlevered cost of capital is r<sub>U</sub> = 10.0000%. There are 30 million shares. The board announces that it will borrow NOK 300 million of perpetual debt, which lenders price at r<sub>D</sub> = 5.5000%, and use all of it to buy back shares. Amounts in NOK million; give rates to 4 decimal places.</p>
<p>(a) What is the share price before the announcement, just after it, and after the buyback? How many shares are repurchased? (2 points)</p>
<p>(b) Find the cost of equity and the dividend per share after the recapitalisation, and show that they price the share correctly. (2 points)</p>
<p>(c) Suppose the board instead pays the NOK 300 million out as a special dividend. Find the dividend per share, the ex-dividend price and the ongoing dividend per share, and show that a shareholder with 100 shares ends with the same wealth as under the buyback. (2 points)</p>`,
    solution: `<p><b>(a) Price and shares repurchased.</b> V = 60/0.100000 = 600.00, so P<sub>0</sub> = 600.00/30 = 20.00. No taxes and no costs mean the plan only re-divides the same cash flows (MM I): V stays 600.00 and the price stays <b>20.00</b> at the announcement. The firm buys at 20.00: n = 300/20.00 = <b>15 million</b> shares, leaving 15 million. E<sub>1</sub> = 600.00 − 300.00 = 300.00, and 300.00/15 = <b>20.00</b> after the buyback.</p>
<p><b>(b) New r<sub>E</sub> and dividend.</b> D/E = 300/300 = 1.0000, so by MM II r<sub>E</sub> = 0.100000 + 1.0000(0.100000 − 0.055000) = 0.100000 + 0.045000 = <b>14.5000%</b>. Interest = 0.055 × 300 = 16.50, so equity receives 60.00 − 16.50 = 43.50, and DPS = 43.50/15 = <b>2.90</b>, up from 60/30 = 2.00. Check: 2.90/0.145000 = 20.00 ✓. The rise in DPS is exactly offset by the higher risk; discounting 2.90 at the old 10.0000% would give 29.00 and expose the missing relevering.</p>
<p><b>(c) Special dividend.</b> DPS = 300/30 = <b>10.00</b>, so P<sub>ex</sub> = 20.00 − 10.00 = <b>10.00</b> on 30 million shares (equity 300.00). Ongoing DPS = 43.50/30 = <b>1.45</b>, and 1.45/0.145000 = 10.00 ✓, with the same r<sub>E</sub> because D/E is the same. A holder of 100 shares gets 100 × 10.00 = 1,000 in cash plus 100 × 10.00 = 1,000 in shares, total 2,000. Under the buyback she has 2,000 whether she sells (100 × 20.00 in cash) or holds (100 × 20.00 in shares). Payout irrelevance: the route changes the form of her wealth, not its size.</p>`,
    criteria: [
      "Price 20.00 before, at the announcement and after the buyback, justified by MM I with no taxes; n = 300/20.00 = 15 million shares",
      "r_E = 0.10 + 1.0(0.10 - 0.055) = 14.5000% by MM II, DPS = 43.50/15 = 2.90, and 2.90/0.145 = 20.00",
      "Special dividend 10.00, ex-dividend price 10.00, ongoing DPS 1.45 = 0.145 x 10.00",
      "100 shares are worth 2,000 on every route: payout irrelevance",
    ],
  },
});
