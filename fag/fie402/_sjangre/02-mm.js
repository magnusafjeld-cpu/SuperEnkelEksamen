/* sjanger 2 · mm · MM and recapitalisation */
window.EDU_DATA.sjangre.push({
  id: "mm",
  num: 2,
  title: "MM and recapitalisation",
  summary: "From the market-value balance sheet to a full leveraged recapitalisation, dividend and buyback",
  chapters: [6, 15],
  exam: "11 of 11 papers · H2024 E3, H2025 E3",
  intro: `<p>Every paper has this exercise: a firm in a perfect capital market issues debt and hands the cash to its shareholders, as a special dividend or a share repurchase. H2024 Exercise 3 and H2025 Exercise 3 were exactly this, 18 points each, in five chained sub-questions where one slip cascades. By the last step you can give r<sub>U</sub> and r<sub>E</sub> before and after, the price at announcement and after execution, the dividend per share, the shares bought back and the comparison of seller and holder, to four decimals.</p>`,
  steps: [
    {
      id: "mm-1",
      title: "The market-value balance sheet and the share price",
      theory: `<p>A firm's assets are worth the present value of the free cash flow they produce. Two groups own that value: the lenders and the shareholders. Written as a market-value balance sheet, the assets equal debt plus equity, so equity is what is left after the debt. The share price is equity divided by the number of shares.</p>
<div class="formula"><div class="eq">V = FCF/r<sub>U</sub></div><div class="eq">V = E + D &nbsp;⟹&nbsp; P = E/N = (V − D)/N</div>
<div class="where">FCF is a level free cash flow paid every year forever, r<sub>U</sub> the return investors require on the assets (the cost of capital of an all-equity firm with this risk) and N the number of shares. For an all-equity firm D = 0, so E = V and P = V/N.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Assets pay FCF = 45 a year forever and r<sub>U</sub> = 9%, so V = 45/0.09 = 500.</p><p>All-equity with 25 million shares: P = 500/25 = 20.00. If the same firm had 100 of debt: E = 500 − 100 = 400 and P = 400/25 = 16.00.</p></div>`,
      q: `<p>A firm's assets produce a free cash flow of 66 million a year in perpetuity and r<sub>U</sub> = 6%. The firm has 250 million of debt and 10 million shares. Markets are perfect and there are no taxes. What is the share price?</p>`,
      options: ["6.60", "85.00", "110.00", "135.00"],
      answer: 1,
      solution: `<p>Value of the assets: V = 66/0.06 = 1 100 million.</p><p>Equity is what the lenders leave: E = 1 100 − 250 = 850 million.</p><p>P = 850/10 = <b>85.00</b>.</p>`,
      check: `<p>Backwards: 10 × 85.00 + 250 = 1 100 = 66/0.06, so the two claims add up to the assets. The price must also lie below V/N = 110.00 whenever the firm has debt. It does.</p>`,
      traps: [
        "Divided the yearly cash flow by the share count without capitalising it: 66/10 = 6.60.",
        null,
        "Divided firm value by the share count, forgetting that the lenders own 250 of it: 1 100/10 = 110.00.",
        "Added the debt instead of subtracting it: (1 100 + 250)/10 = 135.00.",
      ],
    },
    {
      id: "mm-2",
      title: "MM Proposition I: leverage does not change firm value",
      theory: `<p>In a perfect capital market (no taxes, no transaction or issuance costs, financing that neither changes the investment cash flows nor reveals news about them, investors who trade the same securities at the same prices as firms) the value of a firm does not depend on how it is financed. Debt only splits the same cash flow into a fixed slice for lenders and a residual slice for shareholders. The result is enforced by arbitrage: if a levered firm were worth more than an identical unlevered one, investors would sell the dear package and build the cheap one with their own borrowing, which is homemade leverage. Risk neutrality is not one of the conditions. MM is a trade, not a claim about preferences.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = E + D = V<sup>U</sup> &nbsp;⟹&nbsp; E<sub>L</sub> = V<sup>U</sup> − D</div>
<div class="where">V<sup>U</sup> is the value of the same assets with no debt. Levered equity is worth the assets minus the debt, at market values.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two firms own assets paying 50 a year forever, r<sub>U</sub> = 10%, so V<sup>U</sup> = 500. Firm L has 200 of risk-free debt at 5%, so E<sub>L</sub> = 500 − 200 = 300.</p><p>Suppose L's equity traded at 350 instead. At 1% scale: short L's equity (+3.50), borrow 2.00 at 5% (+2.00), buy 1% of U (−5.00). Net today +0.50. Every year: receive 0.50 from U, pay 0.10 of interest, pay the short 0.01 × (50 − 10) = 0.40. Net 0.00. The trade runs until E<sub>L</sub> is back at 300.</p></div>`,
      q: `<p>Firm U and firm L own identical assets paying 63 million a year in perpetuity. U is all-equity and is worth 700 million, so r<sub>U</sub> = 9%. L has 350 million of risk-free perpetual debt at r<sub>f</sub> = 4%. Markets are perfect and there are no taxes. What must L's equity be worth, in millions?</p>`,
      options: ["544.44", "1 050.00", "350.00", "700.00"],
      answer: 2,
      solution: `<p>MM I: V<sup>L</sup> = V<sup>U</sup> = 700.</p><p>E<sub>L</sub> = 700 − 350 = <b>350.00</b>.</p><p>L's shareholders receive 63 − 0.04 × 350 = 63 − 14 = 49 a year, so at 350 the market prices that stream to yield 49/350 = 14%.</p>`,
      check: `<p>Levered equity is paid after a fixed claim, so it is riskier than the assets and must yield more than r<sub>U</sub>: 14% &gt; 9%. This check can fail. A value of 544.44 implies 49/544.44 = 9%, levered equity no riskier than the assets, which is impossible.</p>`,
      traps: [
        "Discounted the equity's cash flow at r<sub>U</sub>, as if leverage left its risk unchanged: (63 − 14)/0.09 = 544.44.",
        "Treated the borrowed money as extra value: 700 + 350 = 1 050.00.",
        null,
        "Set L's equity equal to the whole firm value, forgetting the lenders' claim: 700.00.",
      ],
    },
    {
      id: "mm-3",
      title: "Announcing a recapitalisation: the price does not move",
      theory: `<p>A leveraged recapitalisation issues debt and pays the cash to shareholders, as a special dividend or a share repurchase. Keep two dates apart. At the <b>announcement</b> the market learns the plan. The price moves only if the plan changes firm value. At <b>execution</b> cash is swapped for shares or paid out, at prices already set. In a perfect market MM I says the plan creates nothing, so the announcement leaves the price where it was. A promised dividend is still attached to the share.</p>
<div class="formula"><div class="eq">P<sub>announcement</sub> = P<sub>0</sub></div>
<div class="where">Perfect market, no taxes: no tax shield to capitalise, no costs, no news. With corporate taxes this changes, because the value of the tax shield is priced at the announcement (k7).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm has 25 million shares at 32.00, all equity, so V = 800. It announces that it will borrow 200 and buy back shares next week.</p><p>At the announcement V is still 800 and nothing has been paid, so P = 800/25 = 32.00. Once the loan is drawn but before the buyback, the balance sheet is assets 800 + cash 200 = 1 000, debt 200, equity 800: still 32.00.</p></div>`,
      q: `<p>A firm in a perfect capital market with no taxes trades at 64.00 per share. It announces that next month it will borrow 500 million of risk-free debt and pay all of it out as a special dividend. What happens to the share price at the announcement?</p>`,
      options: [
        "It stays at 64.00, because the plan only re-slices the same cash flows between lenders and shareholders, so firm value is unchanged",
        "It rises, because debt is cheaper than equity, so the firm's cost of capital falls and its value goes up",
        "It falls, because leverage raises the return shareholders require, so future dividends are discounted at a higher rate",
        "It falls at once by the dividend per share, because the market already knows the cash will leave the firm",
      ],
      answer: 0,
      solution: `<p>No taxes, no issuance costs and no information: the plan changes who gets the cash flow, not how much there is. By MM I firm value is unchanged, so the price stays at <b>64.00</b>.</p><p>The dividend is paid later. Until the ex-dividend date the share still carries the right to it, so nothing can drop yet.</p>`,
      check: `<p>Run the balance sheet at the announcement: no cash has moved, the assets are the same and so are the claims, so E/N cannot have changed. The drop comes on the ex-dividend date, by exactly the dividend. The holder is handed that amount in cash the same day.</p>`,
      traps: [
        null,
        "Debt is cheaper, but the equity left behind becomes riskier and dearer by exactly enough to cancel the saving. In a perfect market cheap debt adds no value.",
        "A higher required return only pays shareholders for the extra risk they now carry. It does not lower firm value, so it cannot move the price at the announcement.",
        "Mixed up the announcement and the ex-dividend date. The price drops by the dividend only when the share stops carrying it.",
      ],
    },
    {
      id: "mm-7",
      title: "A debt-financed repurchase: only the new money buys shares",
      theory: `<p>In a repurchase the firm uses the borrowed cash to buy its own shares at the market price, which in a perfect market is the unchanged price. Equity falls by the cash paid out and the share count falls by the shares bought, so the price per share stays where it was. Exam firms often carry debt already. If the board targets a leverage ratio, the new debt is the target minus what is already there. Only that new money goes to shareholders. If instead a new loan first repays the old debt, the payout is the new loan minus the debt repaid. A target D/V is a fraction of V, which a perfect-market recapitalisation leaves unchanged.</p>
<div class="formula"><div class="eq">D<sub>target</sub> = (D/V)<sub>target</sub> × V &nbsp;·&nbsp; D<sub>new</sub> = D<sub>target</sub> − D<sub>old</sub></div>
<div class="eq">n = D<sub>new</sub>/P &nbsp;·&nbsp; N<sub>1</sub> = N<sub>0</sub> − n &nbsp;·&nbsp; P<sub>1</sub> = (V − D<sub>target</sub>)/N<sub>1</sub> = P</div>
<div class="where">n is the number of shares bought back and P the price at which the firm buys. Refinancing variant: payout = new loan − old debt repaid. Read whether the target is D/V or D/E: with D/E = x, D = [x/(1 + x)] × V.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V = 800 with D<sub>old</sub> = 200 and E = 600, on 30 million shares at 20.00. Target D/V = 0.40.</p><p>D<sub>target</sub> = 0.40 × 800 = 320, so D<sub>new</sub> = 320 − 200 = 120 and n = 120/20.00 = 6 million, leaving 24 million. E<sub>1</sub> = 800 − 320 = 480 and 480/24 = 20.00. A new loan of 320 that repays the 200 releases the same 120.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has V = 1 500 million: debt of 300 million and equity of 1 200 million, on 40 million shares at 30.00. The board will issue debt until D/V = 0.35 and use the proceeds to buy back shares. How many shares (in millions) does it buy back?</p>`,
      options: ["2.9630", "4.0000", "7.5000", "17.5000"],
      answer: 2,
      solution: `<p>D<sub>target</sub> = 0.35 × 1 500 = 525.</p><p>D<sub>new</sub> = 525 − 300 = 225.</p><p>n = 225/30.00 = <b>7.5000</b> million, leaving 40 − 7.5 = 32.5 million.</p>`,
      check: `<p>Total debt 525 over V = 1 500 is 0.35, the target. This can fail: issue the whole 525 as new debt and total debt is 825, D/V = 0.55. Price: E<sub>1</sub> = 1 500 − 525 = 975 and 975/32.5 = 30.00, unchanged.</p>`,
      traps: [
        "Read the target as D/E = 0.35: D = (0.35/1.35) × 1 500 = 388.89, so (388.89 − 300)/30.00 = 2.9630.",
        "Applied the target ratio to equity instead of firm value: 0.35 × 1 200 = 420, so (420 − 300)/30.00 = 4.0000.",
        null,
        "Treated the whole target as new debt, ignoring the 300 already there: 525/30.00 = 17.5000.",
      ],
    },
    {
      id: "mm-5",
      title: "A debt-financed special dividend: the ex-dividend price",
      theory: `<p>A special dividend pays every share, so the share count does not change. Up to the ex-dividend date the share still carries the dividend and trades at the old price. From the ex-date it does not: the price drops by exactly the dividend. Equity afterwards is V − D spread over the same N shares.</p>
<div class="formula"><div class="eq">DPS = D<sub>new</sub>/N &nbsp;·&nbsp; P<sub>ex</sub> = P<sub>0</sub> − DPS = (V − D)/N</div>
<div class="where">DPS is the dividend per share and P<sub>ex</sub> the ex-dividend price. A dividend shrinks the numerator (equity); a repurchase shrinks the denominator (shares).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, V = 640, 16 million shares at 40.00. It borrows 160 and pays it all out.</p><p>DPS = 160/16 = 10.00 and P<sub>ex</sub> = 40.00 − 10.00 = 30.00. Balance sheet: 16 × 30.00 = 480 = 640 − 160.</p></div>`,
      q: `<p>An all-equity firm has 15 million shares trading at 70.00. Markets are perfect and there are no taxes. It borrows 315 million and pays all of it out as a special dividend. What is the ex-dividend share price?</p>`,
      options: ["21.00", "28.00", "49.00", "70.00"],
      answer: 2,
      solution: `<p>DPS = 315/15 = 21.00.</p><p>P<sub>ex</sub> = 70.00 − 21.00 = <b>49.00</b>.</p><p>From the balance sheet: E<sub>1</sub> = 1 050 − 315 = 735 over the same 15 million shares, 735/15 = 49.00.</p>`,
      check: `<p>A holder of one share ends with 49.00 + 21.00 = 70.00, the price before: wealth unchanged, as MM I requires. The two routes, P<sub>0</sub> − DPS and (V − D)/N, start from different numbers and agree.</p>`,
      traps: [
        "Gave the dividend per share, 315/15 = 21.00, instead of the price.",
        "Took the payout off twice, once for the new debt and once for the cash paid out: 70.00 − 21.00 − 21.00 = 28.00.",
        null,
        "Kept the price at 70.00 as if this were a repurchase. A dividend leaves the share count unchanged, so equity per share must fall.",
      ],
    },
    {
      id: "mm-6",
      title: "The seller, the holder and the dividend taker are equally rich",
      theory: `<p>Compare shareholders after the deal, per original share. In a repurchase the seller gets P in cash and the holder keeps a share still worth P. With a special dividend every holder gets DPS in cash plus a share worth P − DPS. All end with P: the recapitalisation changes the form of wealth, not its size. Value each position at the price that holds after the event. Count the cash.</p>
<div class="formula"><div class="eq">seller: P &nbsp;·&nbsp; holder: E<sub>1</sub>/N<sub>1</sub> = P &nbsp;·&nbsp; dividend taker: P<sub>ex</sub> + DPS = P</div>
<div class="where">A holder who seems richer, or a dividend taker who seems poorer, means a share count or a cash payment has gone missing.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, V = 640, 16 million shares at 40.00, borrows 160. Take 100 shares each.</p><p>Repurchase: the seller gets 100 × 40.00 = 4 000.00; the holder's shares are worth 100 × 480/12 = 4 000.00. Dividend: 100 × 30.00 + 100 × 10.00 = 4 000.00.</p></div>`,
      q: `<p>An all-equity firm has 25 million shares at 48.00. Markets are perfect and there are no taxes. It borrows 300 million and buys back shares at the market price. Shareholder S tenders all of her 200 shares. Shareholder H keeps all of his 200 shares. What is H's holding worth right after the buyback?</p>`,
      options: ["7 200.00", "9 600.00", "12 000.00", "12 800.00"],
      answer: 1,
      solution: `<p>n = 300/48.00 = 6.25 million, N<sub>1</sub> = 25 − 6.25 = 18.75 million.</p><p>E<sub>1</sub> = 1 200 − 300 = 900 and P<sub>1</sub> = 900/18.75 = 48.00.</p><p>H holds 200 × 48.00 = <b>9 600.00</b>. S received 200 × 48.00 = 9 600.00 in cash. Neither beat the other.</p>`,
      check: `<p>Run the third route. Had the firm paid the 300 as a special dividend: DPS = 300/25 = 12.00 and P<sub>ex</sub> = 36.00. A holder of 200 shares would have 200 × 36.00 + 200 × 12.00 = 7 200.00 + 2 400.00 = 9 600.00. Same number from different inputs. Drop the cash or a share count and the three no longer match.</p>`,
      traps: [
        "Divided the smaller equity by the old share count: 200 × 900/25 = 7 200.00. That is the dividend route's share value without its cash.",
        null,
        "Gave the holder a dividend as well as the unchanged price: 200 × (48.00 + 12.00) = 12 000.00. A repurchase pays only the shares tendered.",
        "Divided firm value by the new share count, forgetting the debt: 200 × 1 200/18.75 = 12 800.00.",
      ],
    },
    {
      id: "mm-8",
      title: "Backing out the unlevered cost of capital: the pre-tax WACC",
      theory: `<p>r<sub>U</sub> is the expected return on the firm's assets, so it is the value-weighted average of what its two claims earn: r<sub>E</sub> on the equity and r<sub>D</sub> on the debt. With no taxes there is no (1 − τ<sub>c</sub>) on the debt. This pre-tax WACC equals r<sub>U</sub>. Use market values, E = N × P. If the firm pays a level free cash flow forever, you can instead run the perpetuity backwards. r<sub>U</sub> belongs to the assets, so a financing transaction does not change it.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = [E/(E + D)] r<sub>E</sub> + [D/(E + D)] r<sub>D</sub> &nbsp;·&nbsp; or r<sub>U</sub> = FCF/V</div>
<div class="where">The weights are E/V and D/V, not D/E. Risk-free debt: r<sub>D</sub> = r<sub>f</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>15 million shares at 50.00, so E = 750. D = 250 at r<sub>D</sub> = 4% and r<sub>E</sub> = 12%. V = 1 000.</p><p>r<sub>U</sub> = 0.75 × 0.12 + 0.25 × 0.04 = 0.09 + 0.01 = 0.10 = 10%. If the firm pays FCF = 100 forever, 100/1 000 = 10% gives the same.</p></div>`,
      q: `<p>A firm in a perfect market has 24 million shares at 55.00 and 360 million of risk-free debt with r<sub>D</sub> = 3.5%. Its equity cost of capital is 10%. What is r<sub>U</sub>, to four decimals?</p>`,
      options: ["6.7500%", "7.8571%", "8.2273%", "8.6071%"],
      answer: 3,
      solution: `<p>E = 24 × 55.00 = 1 320 and V = 1 320 + 360 = 1 680.</p><p>r<sub>U</sub> = (1 320/1 680)(0.10) + (360/1 680)(0.035) = 0.078571 + 0.007500 = 0.086071 = <b>8.6071%</b>.</p>`,
      check: `<p>r<sub>U</sub> must lie between r<sub>D</sub> = 3.5% and r<sub>E</sub> = 10%, much nearer r<sub>E</sub> because equity is 78.57% of V. 8.6071% does; the equal-weight 6.75% fails that test. Backwards, (0.086071 × 1 680 − 0.035 × 360)/1 320 = (144.60 − 12.60)/1 320 = 0.1000, which only re-checks the arithmetic.</p>`,
      traps: [
        "Averaged the two rates with equal weights: (10% + 3.5%)/2 = 6.7500%.",
        "Dropped the debt term, as if risk-free debt earned nothing: (1 320/1 680) × 10% = 7.8571%. Risk-free debt still earns r<sub>D</sub> = 3.5%.",
        "Used D/E = 360/1 320 as the debt weight: (1 − 360/1 320) × 10% + (360/1 320) × 3.5% = 8.2273%.",
        null,
      ],
    },
    {
      id: "mm-9",
      title: "MM Proposition II: the cost of equity after the recapitalisation",
      theory: `<p>Leverage leaves the assets' risk and r<sub>U</sub> unchanged, but loads all of that risk onto a smaller equity base, so r<sub>E</sub> rises in a straight line with D/E. This needs no default and no bankruptcy costs: it holds with risk-free debt. Use market values after the deal. If the debt stays risk-free, r<sub>D</sub> = r<sub>f</sub>. If lenders now bear some risk and demand a higher r<sub>D</sub>, use the new rate: they carry part of the risk, so r<sub>E</sub> rises less.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">On the formula sheet. D/E, not D/V, both after the transaction. The slope is the spread r<sub>U</sub> − r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>U</sub> = 10% and V = 1 000. After a recapitalisation D = 400 at r<sub>D</sub> = 5% and E = 600, so D/E = 0.666667.</p><p>r<sub>E</sub> = 0.10 + 0.666667 × 0.05 = 0.10 + 0.033333 = 0.133333 = 13.3333%. If lenders demand 6% because the debt is now risky: r<sub>E</sub> = 0.10 + 0.666667 × 0.04 = 0.126667 = 12.6667%.</p></div>`,
      q: `<p>An all-equity firm worth 900 million has r<sub>U</sub> = 7%. It borrows 300 million of risk-free debt at r<sub>f</sub> = 4% and buys back shares. Markets are perfect and there are no taxes. What is r<sub>E</sub> after the buyback?</p>`,
      options: ["8.5000%", "8.0000%", "7.0000%", "5.5000%"],
      answer: 0,
      solution: `<p>E after = 900 − 300 = 600, so D/E = 300/600 = 0.5.</p><p>r<sub>E</sub> = 0.07 + 0.5 × (0.07 − 0.04) = 0.07 + 0.015 = 0.085 = <b>8.5000%</b>.</p>`,
      check: `<p>From the cash flows instead of the formula: the assets pay 0.07 × 900 = 63 a year, interest is 0.04 × 300 = 12, equity gets 51 and 51/600 = 0.085. This route never uses D/E, so it catches a D/V slip.</p>`,
      traps: [
        null,
        "Used D/V = 300/900 where D/E belongs: 0.07 + 0.3333 × 0.03 = 8.0000%.",
        "Left r<sub>E</sub> at r<sub>U</sub> = 7.0000%, as if leverage did not make the equity riskier.",
        "Thought cheap debt lowers the cost of equity and took the premium off instead of adding it: 0.07 − 0.5 × 0.03 = 5.5000%.",
      ],
    },
    {
      id: "mm-10",
      title: "Dividends per share before and after, priced at the new cost of equity",
      theory: `<p>When all cash flow is paid out, interest comes first and the rest goes to shareholders. The dividend per share is that residual over the shares outstanding. The share is a perpetuity of it, discounted at r<sub>E</sub>. After a debt-financed buyback, interest is due on all the debt and the residual is shared by fewer shares: the dividend per share rises, r<sub>E</sub> rises by just enough and the price is unchanged. Nothing grows, so the share trades at P + DPS just before each payment and is back at P just after.</p>
<div class="formula"><div class="eq">DPS = (FCF − r<sub>D</sub> × D)/N &nbsp;·&nbsp; P = DPS/r<sub>E</sub></div>
<div class="where">D is all the debt outstanding and N the shares outstanding after the transaction.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>All-equity firm, FCF = 60, r<sub>U</sub> = 10%, so V = 600; 15 million shares at 40.00. DPS = 60/15 = 4.00 and 4.00/0.10 = 40.00.</p><p>It borrows 200 at 5% and buys back 200/40.00 = 5 million shares. Interest 10, dividends 50 over 10 million shares: DPS = 5.00. r<sub>E</sub> = 0.10 + (200/400)(0.05) = 0.125 and 5.00/0.125 = 40.00. Just before each payment the share trades at 45.00.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has a free cash flow of 81 million a year in perpetuity, all paid out as interest and dividends. Its r<sub>U</sub> is 9%. It has 400 million of risk-free debt at r<sub>f</sub> = 4% and 10 million shares at 50.00. It borrows another 100 million, still risk-free at 4%. It uses all of it to buy back shares. What is the dividend per share after the buyback, to four decimals?</p>`,
      options: ["6.5000", "8.1250", "6.1000", "7.6250"],
      answer: 3,
      solution: `<p>n = 100/50.00 = 2 million, N<sub>1</sub> = 8 million.</p><p>Debt is now 500, interest 0.04 × 500 = 20, dividends 81 − 20 = 61.</p><p>DPS = 61/8 = <b>7.6250</b>, up from (81 − 16)/10 = 6.5000.</p>`,
      check: `<p>E<sub>1</sub> = 900 − 500 = 400 and r<sub>E</sub> = 0.09 + (500/400)(0.05) = 0.09 + 0.0625 = 0.1525, so 7.6250/0.1525 = 50.00, the price. Before: r<sub>E</sub> = 0.09 + (400/500)(0.05) = 0.13 and 6.5000/0.13 = 50.00. A fair test: the dividend comes from the cash flow and r<sub>E</sub> from MM II. They meet at 50.00 only if both are right.</p>`,
      traps: [
        "Left the buyback out entirely: (81 − 16)/10 = 6.5000 is the dividend per share before it.",
        "Charged interest on the old debt only: (81 − 16)/8 = 8.1250.",
        "Divided by the old share count, forgetting the buyback: 61/10 = 6.1000.",
        null,
      ],
    },
    {
      id: "mm-13",
      title: "Exam level: refinance, pay a dividend, the debt turns risky (H2024 E3)",
      theory: `<p>H2024 Exercise 3 chained five parts on one firm: r<sub>U</sub> from market values, the price at the announcement, a new loan that first repays the old debt and pays the rest as a dividend, r<sub>E</sub> when the larger debt turns risky and a repurchase as the alternative. Each answer feeds the next, so work in order and keep four decimals on rates.</p>
<div class="formula"><div class="eq">r<sub>U</sub> → payout = D<sub>new</sub> − D<sub>old</sub> → P<sub>ex</sub> = (V − D<sub>new</sub>)/N → r<sub>E</sub> = r<sub>U</sub> + (D<sub>new</sub>/E<sub>1</sub>)(r<sub>U</sub> − r<sub>D,new</sub>)</div>
<div class="where">After refinancing, the new loan is the only debt. r<sub>U</sub> is unchanged; r<sub>D</sub> is the rate lenders now require.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>30 million shares at 30.00, so E = 900. Debt 300, risk-free at 4%. r<sub>E</sub> = 9.5%.</p><p><b>(a)</b> V = 1 200. r<sub>U</sub> = 0.75 × 0.095 + 0.25 × 0.04 = 0.071250 + 0.010000 = 0.081250 = 8.1250%.</p><p><b>(b)</b> A new loan of 450 will repay the 300 and pay out the rest. At the announcement the price stays 30.00 (MM I).</p><p><b>(c)</b> Payout 450 − 300 = 150, DPS = 150/30 = 5.00, P<sub>ex</sub> = (1 200 − 450)/30 = 25.00. A holder has 25.00 + 5.00 = 30.00: neither better nor worse off.</p><p><b>(d)</b> Lenders now require 5.5%. D/E = 450/750 = 0.6 and r<sub>E</sub> = 0.081250 + 0.6 × 0.026250 = 0.081250 + 0.015750 = 0.097000 = 9.7000%.</p><p><b>(e)</b> Repurchase instead: n = 150/30.00 = 5 million, N<sub>1</sub> = 25 million, 750/25 = 30.00, unchanged.</p></div>`,
      q: `<p>A firm in a perfect market with no taxes has 20 million shares at 75.00 and 300 million of risk-free debt at 4%. Its equity cost of capital is 8.5%. It takes a new loan of 700 million, repays the old debt and pays the rest out as a dividend. The larger debt is risky: lenders require 5% on it. What is r<sub>E</sub> after the transaction, to four decimals?</p>`,
      options: ["10.1364%", "8.5000%", "11.1875%", "9.5000%"],
      answer: 3,
      solution: `<p><b>r<sub>U</sub>.</b> E = 20 × 75.00 = 1 500 and V = 1 800. r<sub>U</sub> = (1 500/1 800)(0.085) + (300/1 800)(0.04) = 0.070833 + 0.006667 = 0.077500 = 7.7500%.</p><p><b>The payout.</b> 700 − 300 = 400, so DPS = 20.00 and P<sub>ex</sub> = (1 800 − 700)/20 = 55.00.</p><p><b>r<sub>E</sub>.</b> D/E = 700/1 100 = 0.636364. r<sub>E</sub> = 0.077500 + 0.636364 × (0.077500 − 0.050000) = 0.077500 + 0.017500 = 0.095000 = <b>9.5000%</b>.</p>`,
      check: `<p>FCF = 0.0775 × 1 800 = 139.50. Interest 0.05 × 700 = 35.00, dividends 104.50, DPS = 104.50/20 = 5.2250 and 5.2250/0.095 = 55.00 = P<sub>ex</sub>. It catches a D/V slip: r<sub>E</sub> = 8.8194% gives 5.2250/0.088194 = 59.24. It catches the old 8.5% too: 5.2250/0.085 = 61.47. It does not catch the old r<sub>D</sub> if you also charge interest at 4%: (139.50 − 28.00)/20 = 5.5750 and 5.5750/0.101364 = 55.00 as well. Only the question's words, lenders now require 5%, catch that one.</p>`,
      traps: [
        "Kept the old r<sub>D</sub> of 4%: 0.0775 + 0.636364 × 0.0375 = 10.1364%. Risky debt takes part of the risk off equity.",
        "Kept the old cost of equity of 8.5000%, as if the transaction left the equity's risk unchanged. More debt on a smaller equity base raises r<sub>E</sub>.",
        "Added the new loan to the old debt instead of repaying it: D = 1 000, E = 800, 0.0775 + 1.25 × 0.0275 = 11.1875%.",
        null,
      ],
    },
    {
      id: "mm-14",
      title: "Exam level: target D/V, buyback and the new dividend (H2025 E3)",
      theory: `<p>H2025 Exercise 3 started from the cash flow instead of the cost of equity. Its parts: r<sub>U</sub> as FCF/V; r<sub>E</sub> and the price; the dividend per share and the price after it; a buyback to a target D/V; the new dividend per share and r<sub>E</sub>; the comparison of shareholders. The new dividend per share ends the longest chain: it needs the new debt, the shares bought, the shares left and the interest on all the debt.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = FCF/V → D<sub>new</sub> = (D/V)<sub>target</sub> × V − D<sub>old</sub> → n = D<sub>new</sub>/P → DPS<sub>1</sub> = (FCF − r<sub>D</sub> × D<sub>target</sub>)/(N<sub>0</sub> − n)</div>
<div class="where">Close with the check the key rewards: DPS<sub>1</sub>/r<sub>E</sub> = P, so the seller, the holder and the shareholder without a recapitalisation all end at P.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: the whole exercise</span><p>Debt 100, risk-free at 5%, equity 300, 5 million shares. FCF = 38 a year forever, paid out as interest and dividends.</p><p><b>(a)</b> V = 400, r<sub>U</sub> = 38/400 = 9.5000%. r<sub>E</sub> = 0.095 + (100/300)(0.045) = 0.095 + 0.015 = 0.11 = 11.0000%. P = 300/5 = 60.00.</p><p><b>(b)</b> Interest 5, dividends 33, DPS = 6.60. Price after the dividend: 6.60/0.11 = 60.00 (66.60 just before it).</p><p><b>(c)</b> Target D/V = 0.40: D = 160, new debt 60. The announcement leaves P at 60.00. n = 60/60.00 = 1 million, leaving 4 million.</p><p><b>(d)</b> Interest 0.05 × 160 = 8, dividends 30, DPS = 7.50. r<sub>E</sub> = 0.095 + (160/240)(0.045) = 0.095 + 0.030 = 0.125 = 12.5000%.</p><p><b>(e)</b> No recapitalisation: 6.60/0.11 = 60.00. Sold: 60.00 in cash. Kept: 7.50/0.125 = 60.00. All equal, MM I.</p></div>`,
      q: `<p>A firm operates in a perfect market with no taxes. It has 200 million of risk-free debt at r<sub>f</sub> = 3% and equity worth 800 million, on 10 million shares. It generates a free cash flow of 57 million a year in perpetuity, paid out as interest and dividends at the end of each year. The board now issues debt until D/V = 0.55 and uses the proceeds to repurchase shares right away. The new debt is also risk-free at 3%. What is the dividend per share at the end of year 1, to four decimals?</p>`,
      options: ["5.1000", "7.2000", "9.0667", "12.9600"],
      answer: 1,
      solution: `<p><b>Start.</b> V = 1 000, r<sub>U</sub> = 57/1 000 = 5.7000%, P = 800/10 = 80.00. r<sub>E</sub> = 0.057 + (200/800)(0.027) = 0.057 + 0.00675 = 0.06375 = 6.3750%. Without the recapitalisation DPS = (57 − 6)/10 = 5.1000.</p><p><b>Recapitalisation.</b> D<sub>target</sub> = 0.55 × 1 000 = 550, so D<sub>new</sub> = 350. The price stays 80.00 at the announcement. n = 350/80.00 = 4.3750 million, leaving 5.6250 million.</p><p><b>New dividend.</b> Interest 0.03 × 550 = 16.50, dividends 57 − 16.50 = 40.50, DPS = 40.50/5.6250 = <b>7.2000</b>.</p><p><b>New r<sub>E</sub>.</b> 0.057 + (550/450)(0.027) = 0.057 + 0.033 = 0.0900 = 9.0000%.</p>`,
      check: `<p>7.2000/0.09 = 80.00: the holder is as well off as the seller, who got 80.00 in cash. So is the shareholder without a recapitalisation: 5.1000/0.06375 = 80.00. As a group: 4.375 × 80.00 + 5.625 × 80.00 = 350 + 450 = 800, the equity before. The check fails on the usual slips: the old share count gives 4.0500/0.09 = 45.00 and the old interest gives 9.0667/0.09 = 100.74.</p>`,
      traps: [
        "Left the recapitalisation out: (57 − 6)/10 = 5.1000 is the dividend per share without it.",
        null,
        "Charged interest on the old 200 only: (57 − 6)/5.6250 = 9.0667.",
        "Bought back with the 550 target instead of the 350 of new debt: n = 550/80.00 = 6.8750 million, so 40.50/3.1250 = 12.9600.",
      ],
    },
  ],
});
