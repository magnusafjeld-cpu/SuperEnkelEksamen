/* sjanger 3 · wacc-apv · Valuation with leverage: tax shield, WACC and APV */
window.EDU_DATA.sjangre.push({
  id: "wacc-apv",
  num: 3,
  title: "Valuation with leverage: tax shield, WACC and APV",
  summary: "From one year's tax saving to a two-period valuation by WACC and APV",
  chapters: [7, 17, 18, 19, 20],
  exam: "11 of 11 papers · H2024 E5, H2025 E4",
  intro: `<p>Every paper since 2015 values a levered firm twice: once by discounting free cash flow at the after-tax WACC, once by APV, where the tax shield is added to the unlevered value. It is usually the largest exercise on the paper. In H2024 E5 and H2025 E4 it ran to five and nine chained sub-questions. This ladder starts with one year's tax saving and ends with H2025 E4 in full: the rates, a two-period value path, the debt adjustment between periods and the tax shield discounted at the right rate, to four decimals. Eight steps follow Kurbatov's 2026 lectures: an interest-only loan, working capital released at the end, flow to equity, which rate goes with which method, constant interest coverage, permanent debt checked with its own WACC, unlevering with D(1 − τ<sub>c</sub>) weights and debt capacity.</p>`,
  steps: [
    {
      id: "wacc-apv-1",
      title: "The interest tax shield in one year",
      theory: `<p>Interest is deductible from taxable profit, dividends are not. A firm that pays interest of r<sub>D</sub> × D therefore pays τ<sub>c</sub> × r<sub>D</sub> × D less tax than the same firm without debt. That saving is the interest tax shield, a real cash flow to the firm's investors. Like any cash flow it is worth its present value. When the loan is a fixed contract the shield is as safe as the interest, so you discount it at r<sub>D</sub>.</p>
<div class="formula"><div class="eq">TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub></div>
<div class="eq">One-year loan: PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D / (1 + r<sub>D</sub>)</div>
<div class="where">D<sub>t−1</sub> is the debt outstanding during year t, so the shield arrives at the end of the year.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm borrows 200 for one year at r<sub>D</sub> = 5%, τ<sub>c</sub> = 25%.</p><p>Interest = 0.05 × 200 = 10.00. TS<sub>1</sub> = 0.25 × 10.00 = 2.50, received at date 1.</p><p>PV(TS) = 2.50/1.05 = 2.3810.</p></div>`,
      q: `<p>A firm borrows 150 for one year at r<sub>D</sub> = 6% and repays it in full at date 1. The corporate tax rate is τ<sub>c</sub> = 22%. What is the present value at date 0 of the interest tax shield?</p>`,
      options: ["1.8679", "33.0000", "1.9800", "8.4906"],
      answer: 0,
      solution: `<p>Interest at date 1 = 0.06 × 150 = 9.00.</p><p>TS<sub>1</sub> = 0.22 × 9.00 = 1.98, received at date 1.</p><p>The loan is a fixed contract, so the shield is discounted at r<sub>D</sub>: PV(TS) = 1.98/1.06 = <b>1.8679</b>.</p>`,
      check: `<p>Backwards: 1.8679 × 1.06 = 1.9800 = 0.22 × 9.00. The value is also far below τ<sub>c</sub> × D = 33.00, the value of a shield that lasts forever. One year of savings must be worth much less than a perpetuity of them.</p>`,
      traps: [
        null,
        "Used the permanent-debt shortcut τ<sub>c</sub> × D = 0.22 × 150 = 33.0000 on a one-year loan.",
        "Forgot to discount: 1.9800 is the shield at date 1, not its value at date 0.",
        "Discounted the interest instead of the tax saving: 9.00/1.06 = 8.4906.",
      ],
    },
    {
      id: "wacc-apv-15",
      title: "An interest-only loan: the tax shield is an annuity",
      theory: `<p>Many loans pay interest every year and repay the whole principal at maturity. The interest is fixed by contract, so each year's shield is the same safe amount until the loan ends: an annuity, discounted at r<sub>D</sub>. The repayment of principal is not deductible, so it stays out of the shield. Kurbatov's lecture 3 example: 100 million of interest a year for 10 years, τ<sub>c</sub> = 35% and r<sub>f</sub> = 5% give 35 × the annuity factor = 270.26 million.</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D × [1 − (1 + r<sub>D</sub>)<sup>−T</sup>]/r<sub>D</sub></div>
<div class="where">T is the number of interest payments. When the loan is priced at par (coupon = r<sub>D</sub>), the same number is τ<sub>c</sub> × [D − D/(1 + r<sub>D</sub>)<sup>T</sup>]: the shield on everything except the final repayment. τ<sub>c</sub> × D is the limit as T grows without end.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 3</span><p>DFB pays 100 million of interest a year for 10 years and repays 2 billion in year 10. τ<sub>c</sub> = 35% and r<sub>f</sub> = 5%.</p><p>TS = 0.35 × 100 = 35 a year. Annuity factor (1 − 1.05<sup>−10</sup>)/0.05 = 7.721735, so PV(TS) = 35 × 7.721735 = 270.26 million.</p><p>Par check: 0.35 × (2 000 − 2 000/1.05<sup>10</sup>) = 0.35 × (2 000 − 1 227.83) = 270.26.</p></div>`,
      q: `<p>A firm borrows 600 at r<sub>D</sub> = 6% for 8 years. It pays interest every year and repays the full 600 at the end of year 8. The corporate tax rate is 22% and the firm's unlevered cost of capital is 10%. What is the present value of the interest tax shield?</p>`,
      options: ["132.00", "52.13", "63.36", "49.18"],
      answer: 3,
      solution: `<p>Interest = 0.06 × 600 = 36.00 a year, so TS = 0.22 × 36.00 = 7.92 a year for 8 years.</p><p>The payments are fixed by contract, so discount at r<sub>D</sub>: (1 − 1.06<sup>−8</sup>)/0.06 = 6.209794.</p><p>PV(TS) = 7.92 × 6.209794 = <b>49.18</b>. The 600 repaid in year 8 adds nothing.</p>`,
      check: `<p>Par route: the repayment is worth 600/1.06<sup>8</sup> = 376.4474 today, so τ<sub>c</sub> × (600 − 376.4474) = 0.22 × 223.5526 = 49.18 ✓. It also lies below the perpetual ceiling τ<sub>c</sub> × D = 132.00, as eight years of shields must.</p>`,
      traps: [
        "Used the permanent-debt shortcut τ<sub>c</sub> × D = 0.22 × 600 = 132.00 on a loan that ends in year 8.",
        "Treated the shields as an annuity due, as if the first came today: 7.92 × 6.209794 × 1.06 = 52.13. Interest is paid at the end of each year.",
        "Added up the shields without discounting: 8 × 7.92 = 63.36.",
        null,
      ],
    },
    {
      id: "wacc-apv-3",
      title: "Permanent debt and the announcement: who gets the tax shield",
      theory: `<p>If the firm borrows a fixed amount and rolls it over forever, the shield τ<sub>c</sub> × r<sub>D</sub> × D is a level perpetuity as safe as the interest. Discounted at r<sub>D</sub>, the r<sub>D</sub> cancels and the shield is worth τ<sub>c</sub> × D, which the levered firm has on top of the unlevered one. The share price moves when the market learns about the debt, not when the debt is issued. At that moment the whole PV(TS) lands on the shares already outstanding: the lenders pay a fair price for their debt, a zero-NPV deal. The buyback then runs at the new, higher price, so it moves nothing.</p>
<div class="formula"><div class="eq">PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D / r<sub>D</sub> = τ<sub>c</sub> × D  ·  V<sup>L</sup> = V<sup>U</sup> + PV(TS)</div>
<div class="eq">P<sub>1</sub> = P<sub>0</sub> + PV(TS)/N<sub>0</sub>  ·  shares bought back = D/P<sub>1</sub></div>
<div class="where">τ<sub>c</sub> × D holds only when the debt is both fixed in amount and permanent. Neither value line is on the formula sheet. N<sub>0</sub> is the share count before anything happens. Borrowing to hold government bonds is not leverage: net debt stays at zero and the interest received is taxed as the interest paid is deducted. The price does not move.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>10 million shares at 40.00, so V<sup>U</sup> = 400. The firm announces 100 of permanent debt at r<sub>D</sub> = 4% to buy back shares, τ<sub>c</sub> = 25%.</p><p>TS = 0.25 × 0.04 × 100 = 1.00 a year, so PV(TS) = 1.00/0.04 = 25.00 = 0.25 × 100 and V<sup>L</sup> = 425. P<sub>1</sub> = 40.00 + 25.00/10 = 42.50.</p><p>Shares bought back = 100/42.50 = 2.3529 million, leaving 7.6471 million. Equity afterwards = 425 − 100 = 325 and 325/7.6471 = 42.50.</p></div>`,
      q: `<p>An all-equity firm has 40 million shares at 15.00. Investors expect it to stay all-equity. It announces that it will borrow 150 at r<sub>D</sub> = 5% as permanent debt and use all of it to buy back shares. τ<sub>c</sub> = 22%. The market believes the plan at once. How many shares, in millions, does the firm buy back?</p>`,
      options: ["10.0000", "12.4224", "9.4787", "9.9726"],
      answer: 2,
      solution: `<p>V<sup>U</sup> = 40 × 15.00 = 600. The debt is permanent, so PV(TS) = 0.22 × 150 = 33.00.</p><p>At the announcement: P<sub>1</sub> = 15.00 + 33.00/40 = 15.8250.</p><p>The buyback runs at that price: 150/15.8250 = <b>9.4787</b> million shares, leaving 30.5213 million.</p>`,
      check: `<p>After the buyback V<sup>L</sup> = 600 + 33 = 633 and equity = 633 − 150 = 483, so the price is 483/30.5213 = 15.8250, the announcement price. A buyback at the market price cannot move the price. The old shareholders now hold 150 in cash plus 483 in shares, 633 in all: 33 more than before, the whole PV(TS).</p>`,
      traps: [
        "Bought back at the old price of 15.00, as if there were no tax shield: 150/15.00 = 10.0000.",
        "Subtracted the debt while the borrowed cash was still in the firm: (633 − 150)/40 = 12.0750, so 150/12.0750 = 12.4224.",
        null,
        "Added one year's shield to the price instead of its present value: 15.00 + 1.65/40 = 15.04125, so 150/15.04125 = 9.9726.",
      ],
    },
    {
      id: "wacc-apv-4",
      title: "Free cash flow and the unlevered value",
      theory: `<p>Every valuation starts from free cash flow: the cash the operations produce for all investors together, computed as if the firm had no debt. Interest never enters it, because financing is handled in the discount rate or in PV(TS). Discount it at r<sub>U</sub>, the return investors require on the assets alone, to get V<sup>U</sup>. With constant growth from next year on, use the growing perpetuity.</p>
<div class="formula"><div class="eq">FCF = EBIT × (1 − τ<sub>c</sub>) + Depreciation − CapEx − ΔNWC</div>
<div class="eq">V<sup>U</sup> = FCF<sub>1</sub>/(r<sub>U</sub> − g)</div>
<div class="where">Both are on the formula sheet. FCF<sub>1</sub> is next year's flow; if you are given this year's, multiply by (1 + g) first.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Next year: EBIT 100, depreciation 20, CapEx 25, ΔNWC 5, τ<sub>c</sub> = 25%. r<sub>U</sub> = 10% and g = 2%.</p><p>FCF<sub>1</sub> = 100 × 0.75 + 20 − 25 − 5 = 75 + 20 − 25 − 5 = 65.00.</p><p>V<sup>U</sup> = 65.00/(0.10 − 0.02) = 65.00/0.08 = 812.50.</p></div>`,
      q: `<p>Next year a firm expects EBIT of 80, interest of 12 on its current debt, depreciation of 15, capital expenditure of 18 and an increase in net working capital of 4. τ<sub>c</sub> = 25%. Free cash flow grows at 3% a year after that, forever. The unlevered cost of capital is r<sub>U</sub> = 11%. What is V<sup>U</sup>?</p>`,
      options: ["550.00", "662.50", "481.82", "475.00"],
      answer: 1,
      solution: `<p>EBIT × (1 − τ<sub>c</sub>) = 80 × 0.75 = 60.00. The interest of 12 stays out.</p><p>FCF<sub>1</sub> = 60.00 + 15 − 18 − 4 = 53.00.</p><p>V<sup>U</sup> = 53.00/(0.11 − 0.03) = 53.00/0.08 = <b>662.50</b>.</p>`,
      check: `<p>Backwards: 662.50 × 0.08 = 53.00 = FCF<sub>1</sub>. One year on the firm is worth 53.00 × 1.03/0.08 = 682.38, which is 662.50 × 1.03: value grows at g, as a growing perpetuity must.</p>`,
      traps: [
        "Deducted the interest before tax: (80 − 12) × 0.75 + 15 − 18 − 4 = 44.00, so 44.00/0.08 = 550.00.",
        null,
        "Ignored the growth: 53.00/0.11 = 481.82.",
        "Forgot to add back depreciation: 60.00 − 18 − 4 = 38.00, so 38.00/0.08 = 475.00.",
      ],
    },
    {
      id: "wacc-apv-22",
      title: "Free cash flow over a project's life: working capital comes back",
      theory: `<p>A project ties up working capital: inventory and receivables net of payables. Building it up is a cash outflow. When the project ends the working capital is released, a cash inflow. Always use the change ΔNWC, never the level: Kurbatov calls forgetting the delta one of the biggest fallacies. Add back depreciation, or start from EBITDA. Interest never enters FCF.</p>
<div class="formula"><div class="eq">FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC = EBITDA(1 − τ<sub>c</sub>) + τ<sub>c</sub> × Dep − CapEx − ΔNWC</div>
<div class="eq">ΔNWC<sub>t</sub> = NWC<sub>t</sub> − NWC<sub>t−1</sub></div>
<div class="where">In the final year NWC falls to zero, so ΔNWC is negative and FCF rises by the amount released. Financing enters through the discount rate or PV(TS), never as interest in FCF.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A two-year project needs equipment for 60 today, depreciated over two years. Working capital is 10 today, 15 at the end of year 1 and 0 at the end of year 2. EBITDA is 50 a year and τ<sub>c</sub> = 25%.</p><p>EBIT = 50 − 30 = 20, so EBIT(1 − τ<sub>c</sub>) = 15. Year 0: −60 − 10 = −70. Year 1: 15 + 30 − (15 − 10) = 40. Year 2: 15 + 30 − (0 − 15) = 60.</p></div>`,
      q: `<p>In year 3, the last year of a project, EBITDA is 90 and depreciation is 30. There is no capital expenditure that year. Working capital stands at 24 at the end of year 2 and is fully released by the end of year 3. The project is partly debt-financed and pays interest of 8 in year 3. τ<sub>c</sub> = 25%. What is the project's free cash flow in year 3?</p>`,
      options: ["99.00", "75.00", "51.00", "93.00"],
      answer: 0,
      solution: `<p>EBIT = 90 − 30 = 60, so EBIT(1 − τ<sub>c</sub>) = 45.</p><p>ΔNWC = 0 − 24 = −24: the release adds 24.</p><p>FCF = 45 + 30 − 0 − (−24) = <b>99.00</b>. The interest of 8 stays out.</p>`,
      check: `<p>EBITDA route: 90 × 0.75 + 0.25 × 30 + 24 = 67.50 + 7.50 + 24 = 99.00 ✓. The two forms differ only in where depreciation enters, so the check catches a forgotten add-back, not a wrong sign on ΔNWC.</p>`,
      traps: [
        null,
        "Forgot that the working capital comes back: 45 + 30 = 75.00. The 24 tied up since year 2 is released in year 3.",
        "Got the sign of ΔNWC wrong and subtracted the release: 45 + 30 − 24 = 51.00. A fall in working capital frees cash.",
        "Deducted the interest: (60 − 8) × 0.75 + 30 + 24 = 93.00. Interest belongs in the discount rate or PV(TS), not in FCF.",
      ],
    },
    {
      id: "wacc-apv-5",
      title: "A loan with a fixed repayment schedule",
      theory: `<p>Most debt on an exam is not permanent. When the question gives the repayment plan, every future balance is known today, so every shield is as safe as the debt and is discounted at r<sub>D</sub>. Build a table: the opening balance each year, its interest and the shield, then discount each shield separately. There is no shortcut.</p>
<div class="formula"><div class="eq">PV(TS) = Σ<sub>t</sub> τ<sub>c</sub> × r<sub>D</sub> × D<sub>t−1</sub> / (1 + r<sub>D</sub>)<sup>t</sup></div>
<div class="where">D<sub>t−1</sub> is the balance carried into year t, after the previous repayment. Here τ<sub>c</sub> × D<sub>0</sub> is a ceiling, not the answer.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A loan of 90 at r<sub>D</sub> = 5% is repaid with 30 at the end of each of years 1, 2 and 3. τ<sub>c</sub> = 20%.</p><p>Opening balances 90, 60, 30. Interest 4.50, 3.00, 1.50. Shields 0.90, 0.60, 0.30.</p><p>PV(TS) = 0.90/1.05 + 0.60/1.05² + 0.30/1.05³ = 0.857143 + 0.544218 + 0.259151 = 1.6605.</p></div>`,
      q: `<p>A firm borrows 240 today at r<sub>D</sub> = 6%. The loan contract repays it in three equal instalments of 80 at the end of years 1, 2 and 3. Interest is paid each year on the balance outstanding during that year. τ<sub>c</sub> = 25% and r<sub>U</sub> = 11%. What is PV(TS)?</p>`,
      options: ["60.0000", "6.0686", "6.5398", "3.3321"],
      answer: 2,
      solution: `<table class="data"><tr><th>Year</th><th>Opening balance</th><th>Interest at 6%</th><th>TS at 25%</th><th>PV at 6%</th></tr>
<tr><td>1</td><td class="n">240</td><td class="n">14.40</td><td class="n">3.60</td><td class="n">3.396226</td></tr>
<tr><td>2</td><td class="n">160</td><td class="n">9.60</td><td class="n">2.40</td><td class="n">2.135991</td></tr>
<tr><td>3</td><td class="n">80</td><td class="n">4.80</td><td class="n">1.20</td><td class="n">1.007543</td></tr></table>
<p>The schedule is fixed by contract, so the shields are discounted at r<sub>D</sub>: PV(TS) = 3.396226 + 2.135991 + 1.007543 = <b>6.5398</b>.</p>`,
      check: `<p>Every shield is 0.25 × 0.06 = 0.015 times the opening balance, so PV(TS) = 0.015 × (240/1.06 + 160/1.06² + 80/1.06³) = 0.015 × 435.9841 = 6.5398, without computing a single shield. It also lies between 0 and the ceiling τ<sub>c</sub> × D<sub>0</sub> = 60.00.</p>`,
      traps: [
        "Used the permanent-debt shortcut on a loan that is repaid: 0.25 × 240 = 60.0000.",
        "Discounted at r<sub>U</sub> = 11% as if the debt moved with firm value: 3.243243 + 1.947894 + 0.877430 = 6.0686.",
        null,
        "Charged interest on the closing balances 160, 80 and 0: 2.40/1.06 + 1.20/1.06² = 3.3321.",
      ],
    },
    {
      id: "wacc-apv-6",
      title: "The after-tax WACC and the WACC method",
      theory: `<p>A firm that keeps a constant debt ratio can be valued in one line: discount FCF at the after-tax WACC. The (1 − τ<sub>c</sub>) on r<sub>D</sub> puts the tax shield into the rate, so you never add it on top. Without that factor you get the pre-tax WACC, which under the course's rebalancing convention equals r<sub>U</sub> and gives V<sup>U</sup>, not V<sup>L</sup>. The weights are D/V and E/V at market values: convert a D/E ratio first.</p>
<div class="formula"><div class="eq">r<sub>wacc</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V) r<sub>D</sub> τ<sub>c</sub></div>
<div class="eq">V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g)  ·  D/V = (D/E)/(1 + D/E)</div>
<div class="where">r<sub>U</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub> is the pre-tax WACC. The second form of r<sub>wacc</sub> is a quick check and is not on the sheet.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/V = 0.40, r<sub>E</sub> = 12%, r<sub>D</sub> = 5%, τ<sub>c</sub> = 25%, FCF<sub>1</sub> = 30, g = 2%.</p><p>Pre-tax: 0.60 × 0.12 + 0.40 × 0.05 = 0.072 + 0.020 = 9.20% = r<sub>U</sub>. After-tax: 0.072 + 0.40 × 0.05 × 0.75 = 0.072 + 0.015 = 8.70%.</p><p>V<sup>L</sup> = 30/(0.087 − 0.02) = 30/0.067 = 447.76.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.25. Its cost of equity is r<sub>E</sub> = 13%, its cost of debt r<sub>D</sub> = 6% and τ<sub>c</sub> = 25%. Next year's free cash flow is 80, growing at 3% a year forever. What is V<sup>L</sup> by the WACC method?</p>`,
      options: ["930.23", "963.86", "1 015.87", "707.96"],
      answer: 1,
      solution: `<p>D/V = 0.25/1.25 = 0.20 and E/V = 0.80.</p><p>r<sub>wacc</sub> = 0.80 × 0.13 + 0.20 × 0.06 × 0.75 = 0.1040 + 0.0090 = 0.1130.</p><p>V<sup>L</sup> = 80/(0.1130 − 0.03) = 80/0.0830 = <b>963.86</b>.</p>`,
      check: `<p>Pre-tax WACC: 0.1040 + 0.20 × 0.06 = 0.1160 = r<sub>U</sub>. Shortcut: 0.1160 − 0.20 × 0.06 × 0.25 = 0.1160 − 0.0030 = 0.1130, the same rate. Backwards: 963.86 × 0.0830 = 80.00.</p>`,
      traps: [
        "Used the pre-tax WACC of 11.60%: 80/0.0860 = 930.23, which is V<sup>U</sup>, not V<sup>L</sup>.",
        null,
        "Used D/E = 0.25 as the debt weight: r<sub>wacc</sub> = 0.75 × 0.13 + 0.25 × 0.045 = 0.10875, so 80/0.07875 = 1 015.87.",
        "Forgot the growth: 80/0.1130 = 707.96.",
      ],
    },
    {
      id: "wacc-apv-7",
      title: "APV when the debt grows with the firm",
      theory: `<p>APV values the firm in two pieces: V<sup>U</sup> at r<sub>U</sub>, then the tax shield. The rate on the shield depends on the debt policy. If the firm keeps its debt at a constant fraction of its value, future debt rises and falls with the business, so the shield carries asset risk and is discounted at r<sub>U</sub>. Only fixed debt, permanent or on a schedule, takes r<sub>D</sub>. Excess cash is not part of operations: add it at face value at the end.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS)  ·  PV(TS) = τ<sub>c</sub> × r<sub>D</sub> × D<sub>0</sub>/(r<sub>U</sub> − g)  (constant D/V)</div>
<div class="where">D<sub>0</sub> is today's debt. It grows at g with the firm, so the shield does too. Firm value with cash = V<sup>L</sup> + excess cash.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>FCF<sub>1</sub> = 50, g = 2%, r<sub>U</sub> = 10%. Debt today 200 at r<sub>D</sub> = 5%, held at a constant D/V, τ<sub>c</sub> = 25%. Excess cash 40.</p><p>V<sup>U</sup> = 50/0.08 = 625.00. TS<sub>1</sub> = 0.25 × 0.05 × 200 = 2.50, so PV(TS) = 2.50/0.08 = 31.25.</p><p>V<sup>L</sup> = 625.00 + 31.25 = 656.25. With the cash: 656.25 + 40 = 696.25.</p></div>`,
      q: `<p>A fund values a firm with next year's free cash flow of 72, growing at 3% a year forever. Its unlevered cost of capital is r<sub>U</sub> = 12%. The firm has 300 of debt today at r<sub>D</sub> = 6% and will keep its debt at a constant fraction of firm value, so the debt also grows at 3% a year. τ<sub>c</sub> = 25%. The firm also holds 50 of excess cash that operations do not need. What is the firm worth today, excess cash included?</p>`,
      options: ["1 000.00", "850.00", "925.00", "900.00"],
      answer: 3,
      solution: `<p>V<sup>U</sup> = 72/(0.12 − 0.03) = 72/0.09 = 800.00.</p><p>TS<sub>1</sub> = 0.25 × 0.06 × 300 = 4.50, growing at 3%. The debt tracks firm value, so the shield is discounted at r<sub>U</sub>: PV(TS) = 4.50/0.09 = 50.00.</p><p>V<sup>L</sup> = 800.00 + 50.00 = 850.00. With the cash: 850.00 + 50 = <b>900.00</b>.</p>`,
      check: `<p>Run the WACC method on the operations (consistency check 1). D/V = 300/850 = 0.352941, so r<sub>wacc</sub> = 0.12 − 0.352941 × 0.06 × 0.25 = 0.12 − 0.005294 = 0.114706. Then 72/(0.114706 − 0.03) = 850.00, the APV value before cash. The weight came from the APV answer, so this is a fixed point rather than a second valuation. It still catches a wrong rate on the shield: at r<sub>D</sub> the two methods disagree.</p>`,
      traps: [
        "Discounted the shield at r<sub>D</sub> as if the debt were fixed: 4.50/(0.06 − 0.03) = 150.00, so 800 + 150 + 50 = 1 000.00.",
        "Left out the excess cash: 800.00 + 50.00 = 850.00 is the operations only.",
        "Used τ<sub>c</sub> × D for the shield: 800 + 0.25 × 300 + 50 = 925.00.",
        null,
      ],
    },
    {
      id: "wacc-apv-20",
      title: "Flow to equity: value the equity directly",
      theory: `<p>FTE values the equity, not the firm (lecture 8). Start from FCF, take off the interest after tax and add net borrowing. What is left is the cash the shareholders actually receive, FCFE. Discount it at r<sub>E</sub>. With a constant D/E the debt grows with the firm, so net borrowing is g × D and FCFE grows at g as well.</p>
<div class="formula"><div class="eq">FCFE<sub>t</sub> = FCF<sub>t</sub> − (1 − τ<sub>c</sub>) × IP<sub>t</sub> + (D<sub>t</sub> − D<sub>t−1</sub>)</div>
<div class="eq">E = FCFE<sub>1</sub>/(r<sub>E</sub> − g)</div>
<div class="where">IP<sub>t</sub> is the interest paid on the debt carried into year t, r<sub>D</sub> × D<sub>t−1</sub>. Net borrowing is positive when the debt grows and negative when it is repaid. Like APV, FTE needs the debt path.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 6</span><p>AMC: EBIT 2 000 next year, τ<sub>c</sub> = 40%, no net investment, g = 3%. Debt 5 000, risk-free at 5%, growing at 3%. r<sub>E</sub> = 15%.</p><p>Interest 250, net borrowing 0.03 × 5 000 = 150. FCFE = (2 000 − 250) × 0.60 + 150 = 1 050 + 150 = 1 200. E = 1 200/(0.15 − 0.03) = 10 000, the same as by APV.</p></div>`,
      q: `<p>Next year a firm will earn EBIT of 500. Capital expenditure equals depreciation and working capital does not change. τ<sub>c</sub> = 25%. The firm has 1 500 of risk-free debt at 4%. It keeps a constant debt-to-equity ratio, so its debt grows at 2% a year, like its cash flows. Any new borrowing is paid out to the shareholders. Its cost of equity is 11%. What is its equity worth by the flow-to-equity method?</p>`,
      options: ["3 833.33", "4 000.00", "4 166.67", "3 666.67"],
      answer: 1,
      solution: `<p>FCF = 500 × 0.75 = 375.</p><p>Interest = 0.04 × 1 500 = 60, which costs 60 × 0.75 = 45 after tax. Net borrowing = 0.02 × 1 500 = 30.</p><p>FCFE = 375 − 45 + 30 = 360.</p><p>E = 360/(0.11 − 0.02) = <b>4 000.00</b>.</p>`,
      check: `<p>WACC route: V<sup>L</sup> = 4 000 + 1 500 = 5 500 and r<sub>wacc</sub> = (4 000/5 500) × 11% + (1 500/5 500) × 4% × 0.75 = 8.0000% + 0.8182% = 8.8182%. Then 375/(0.088182 − 0.02) = 5 500 ✓. Like WACC = APV this is a fixed point, but it fails on a forgotten net borrowing: E = 3 666.67 gives V<sup>L</sup> = 5 166.67, r<sub>wacc</sub> = 8.6774% and 375/(0.086774 − 0.02) = 5 615.96, not 5 166.67.</p>`,
      traps: [
        "Took off the full interest without its tax saving: 375 − 60 + 30 = 345, so 345/0.09 = 3 833.33.",
        null,
        "Discounted FCF instead of FCFE at r<sub>E</sub>: 375/0.09 = 4 166.67. That counts the lenders' cash flow as the shareholders'.",
        "Left out the net borrowing: (375 − 45)/0.09 = 3 666.67. The new debt raised each year goes to the shareholders.",
      ],
    },
    {
      id: "wacc-apv-21",
      title: "Three methods, three rates",
      theory: `<p>Kurbatov's wrap-up: each method has its own cash flow and its own rate. WACC discounts FCF at r<sub>wacc</sub>. APV discounts the same FCF at r<sub>U</sub> and adds PV(TS). FTE discounts FCFE at r<sub>E</sub>. If an exam gives you r<sub>wacc</sub>, expect the WACC method; if it gives r<sub>U</sub>, expect APV. A frequent follow-up: compute r<sub>wacc</sub> and explain how it compares with r<sub>U</sub>.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub></div>
<div class="eq">r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub></div>
<div class="where">The second form of r<sub>wacc</sub> holds when the debt is rebalanced to a target D/V, the course's default. It does not hold for a fixed, permanent amount of debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/V = 0.25, r<sub>E</sub> = 12%, r<sub>D</sub> = 6%, τ<sub>c</sub> = 22%.</p><p>r<sub>U</sub> = 0.75 × 12% + 0.25 × 6% = 9.00% + 1.50% = 10.50%. r<sub>wacc</sub> = 9.00% + 0.25 × 6% × 0.78 = 9.00% + 1.17% = 10.17%. The gap is 0.25 × 0.22 × 6% = 0.33 points.</p></div>`,
      q: `<p>A firm keeps D/V = 0.40. Its cost of equity is 13%, its cost of debt 5% and τ<sub>c</sub> = 25%. Which statement about its after-tax WACC is correct?</p>`,
      options: [
        "r<sub>wacc</sub> = 7.35%, the pre-tax rate times (1 − τ<sub>c</sub>), applied to free cash flow before interest",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow after interest, because the interest is cash the firm really pays out",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow before interest. It is below r<sub>U</sub> because debt is cheaper than equity, so it would stay below with no taxes",
        "r<sub>wacc</sub> = 9.30%, applied to free cash flow before interest. It is below r<sub>U</sub> = 9.80% by the tax saving 0.40 × 25% × 5%",
      ],
      answer: 3,
      solution: `<p>r<sub>U</sub> = 0.60 × 13% + 0.40 × 5% = 7.80% + 2.00% = 9.80%.</p><p>r<sub>wacc</sub> = 7.80% + 0.40 × 5% × 0.75 = 7.80% + 1.50% = <b>9.30%</b>.</p><p>The gap of 0.50 points is (D/V)τ<sub>c</sub>r<sub>D</sub> = 0.40 × 0.25 × 5%: the (1 − τ<sub>c</sub>) on r<sub>D</sub> builds the tax shield into the rate. So r<sub>wacc</sub> discounts FCF with no interest deducted. APV would discount the same FCF at 9.80% and add PV(TS). FTE would discount FCFE at 13%.</p>`,
      check: `<p>Set τ<sub>c</sub> = 0: r<sub>wacc</sub> = 7.80% + 2.00% = 9.80% = r<sub>U</sub>. The whole gap is the tax factor, so cheap debt alone lowers nothing. If you deduct the interest in FCF and then discount at r<sub>wacc</sub>, the debt is counted twice.</p>`,
      traps: [
        "Put the tax factor on the whole pre-tax WACC, which gives 7.35%. Only the debt's return is tax-deductible, not the equity's.",
        "Interest belongs in the rate, not in the cash flow. FCF after interest discounted at r<sub>wacc</sub> counts the debt twice.",
        "Cheap debt is offset by a dearer r<sub>E</sub>, since leverage makes the equity riskier. With no taxes r<sub>wacc</sub> equals r<sub>U</sub>.",
        null,
      ],
    },
    {
      id: "wacc-apv-18",
      title: "Constant interest coverage: the levered value in one line",
      theory: `<p>A third debt policy (lecture 8): the firm sets its interest each year at a fixed fraction k of its free cash flow. The shield τ<sub>c</sub> × k × FCF<sub>t</sub> is then a fixed slice of FCF with the same risk, so it is worth τ<sub>c</sub> × k × V<sup>U</sup>. No circularity: you never need V<sup>L</sup> to find the debt. Kurbatov repeated this formula in the wrap-up.</p>
<div class="formula"><div class="eq">IP<sub>t</sub> = k × FCF<sub>t</sub> &nbsp;·&nbsp; PV(TS) = τ<sub>c</sub> × k × V<sup>U</sup> &nbsp;·&nbsp; V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup></div>
<div class="where">k is interest divided by FCF, not debt divided by FCF. The debt follows from the interest: D = IP/r<sub>D</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 5</span><p>Tybo: FCF 2.5 million next year, growing at 4%, r<sub>U</sub> = 10%, τ<sub>c</sub> = 40%, k = 20%.</p><p>V<sup>U</sup> = 2.5/0.06 = 41.67 and V<sup>L</sup> = 1.08 × 41.67 = 45.00. Interest 0.20 × 2.5 = 0.50 at r<sub>D</sub> = 5% means D = 10. Then d = 10/45 = 0.2222, r<sub>wacc</sub> = 10% − 0.2222 × 0.40 × 5% = 9.5556% and 2.5/(0.095556 − 0.04) = 45.00.</p></div>`,
      q: `<p>An expansion will produce free cash flow of 6 next year, growing at 2% a year forever. Its unlevered cost of capital is 9.5%. The firm sets its interest payments each year at 25% of the expansion's free cash flow and borrows at r<sub>D</sub> = 5%. The corporate tax rate is 22%. What is the levered value of the expansion?</p>`,
      options: ["91.00", "86.60", "100.00", "84.40"],
      answer: 3,
      solution: `<p>V<sup>U</sup> = 6/(0.095 − 0.02) = 80.00.</p><p>PV(TS) = τ<sub>c</sub> × k × V<sup>U</sup> = 0.22 × 0.25 × 80.00 = 4.40.</p><p>V<sup>L</sup> = 80.00 × 1.055 = <b>84.40</b>.</p>`,
      check: `<p>WACC route: interest 0.25 × 6 = 1.50 means D = 1.50/0.05 = 30, so d = 30/84.40 = 0.355450 and r<sub>wacc</sub> = 9.5% − 0.355450 × 0.22 × 5% = 9.1090%. Then 6/(0.091090 − 0.02) = 84.40 ✓. The debt grows with FCF, so the constant-D/V formula holds here. The check takes d from the answer, so it confirms the rate on the shield and the arithmetic, not the policy.</p>`,
      traps: [
        "Discounted the growing shield at r<sub>D</sub>: 0.22 × 1.50/(0.05 − 0.02) = 11.00, so 80 + 11 = 91.00. The shield is a slice of FCF and as risky as FCF.",
        "Treated the debt as permanent: D = 1.50/0.05 = 30 and τ<sub>c</sub> × D = 6.60, so 80 + 6.60 = 86.60. This debt grows with the cash flow.",
        "Left the tax rate out: 80 × (1 + 0.25) = 100.00. Only the tax saving on the interest adds value, not the interest itself.",
        null,
      ],
    },
    {
      id: "wacc-apv-16",
      title: "Permanent debt: APV first, then the WACC that matches it",
      theory: `<p>With a fixed, permanent amount of debt, APV is the natural route: V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D (Kurbatov's PS2 Exercise 9). The WACC method still works when nothing grows, because D/V is then constant. The shortcut r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> does not: it assumes the shield is as risky as the assets. Use the rate that matches APV, solved together with V<sup>L</sup> = FCF/r<sub>wacc</sub>.</p>
<div class="formula"><div class="eq">V<sup>L</sup> = FCF/r<sub>U</sub> + τ<sub>c</sub>D &nbsp;·&nbsp; r<sub>wacc</sub> = r<sub>U</sub>(1 − τ<sub>c</sub>D/V<sup>L</sup>)</div>
<div class="where">Level perpetual FCF and permanent D, equation 18.21 in the book. Nothing grows, so D/V<sup>L</sup> stays constant. The full formula (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) gives the same rate once r<sub>E</sub> comes from the equity's own cash flow.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: PS2 Exercise 9</span><p>FCF 2 million a year forever, r<sub>U</sub> = 11%, permanent debt 12 million, τ<sub>c</sub> = 25%.</p><p>V<sup>U</sup> = 2/0.11 = 18.18, PV(TS) = 0.25 × 12 = 3.00 and V<sup>L</sup> = 21.18. Then r<sub>wacc</sub> = 0.11 × (1 − 0.25 × 12/21.1818) = 9.4421%. Forwards: 2/0.094421 = 21.18.</p></div>`,
      q: `<p>A firm's free cash flow is 9 a year forever, with no growth. Its unlevered cost of capital is 12%. It has 40 of permanent debt at r<sub>D</sub> = 5%, which it will never change. The corporate tax rate is 22%. Which after-tax WACC values this firm correctly? Give four decimals.</p>`,
      options: ["11.4749%", "10.7399%", "10.5920%", "11.4407%"],
      answer: 1,
      solution: `<p><b>APV.</b> V<sup>U</sup> = 9/0.12 = 75.00. The debt is fixed and permanent, so PV(TS) = 0.22 × 40 = 8.80 and V<sup>L</sup> = 83.80.</p><p><b>The matching rate.</b> r<sub>wacc</sub> = 0.12 × (1 − 0.22 × 40/83.80) = 0.12 × 0.894988 = <b>10.7399%</b>.</p>`,
      check: `<p>Forwards: 9/0.107399 = 83.80, the APV value. Through the equity: E = 83.80 − 40 = 43.80 and its cash flow is 9 − 0.05 × 0.78 × 40 = 7.44, so r<sub>E</sub> = 7.44/43.80 = 16.9863%. Full formula: (43.80/83.80) × 16.9863% + (40/83.80) × 5% × 0.78 = 8.8783% + 1.8616% = 10.7399% ✓. The shortcut r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> would value the firm at only 78.43.</p>`,
      traps: [
        "Used the constant-D/V shortcut: 12% − (40/83.80) × 22% × 5% = 11.4749%. It treats the shield as risky as the assets, which permanent debt is not.",
        null,
        "Measured the debt against V<sup>U</sup> instead of V<sup>L</sup>: 0.12 × (1 − 0.22 × 40/75) = 10.5920%.",
        "Discounted the shield at r<sub>U</sub>: PV(TS) = 0.22 × 0.05 × 40/0.12 = 3.6667, so V<sup>L</sup> = 78.6667 and 9/78.6667 = 11.4407%. A fixed, permanent shield is as safe as the debt.",
      ],
    },
    {
      id: "wacc-apv-17",
      title: "Unlevering when the debt is fixed: D(1 − τ) weights",
      theory: `<p>The course unlevers with plain market-value weights because a firm that rebalances to a target D/V has a shield as risky as its assets. When the debt is a fixed, permanent amount, Kurbatov (lecture 8) points out that the pre-tax WACC no longer equals r<sub>U</sub>. The shield τ<sub>c</sub>D is then safe, so the risky assets are worth only V<sup>U</sup> = E + D(1 − τ<sub>c</sub>). The debt enters with weight D(1 − τ<sub>c</sub>). The same weights unlever betas.</p>
<div class="formula"><div class="eq">r<sub>U</sub> = [E/(E + D(1 − τ<sub>c</sub>))] r<sub>E</sub> + [D(1 − τ<sub>c</sub>)/(E + D(1 − τ<sub>c</sub>))] r<sub>D</sub></div>
<div class="where">Use it only when the question says the debt is fixed or permanent. With a target D/V or D/E keep the plain weights. Rearranged it is MM II with taxes: r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>E = 360 and permanent debt D = 300 at r<sub>D</sub> = 5%, r<sub>E</sub> = 12%, τ<sub>c</sub> = 20%. D(1 − τ<sub>c</sub>) = 240.</p><p>r<sub>U</sub> = (360 × 12% + 240 × 5%)/600 = (43.20 + 12.00)/600 = 9.20%. The plain weights would give (43.20 + 15.00)/660 = 8.8182%.</p></div>`,
      q: `<p>A listed twin has equity worth 600 and 400 of permanent, risk-free debt at r<sub>D</sub> = 4%, which it never changes. Its cost of equity is 11%. The corporate tax rate is 25%. What is the twin's unlevered cost of capital, to four decimals?</p>`,
      options: ["8.6667%", "8.3333%", "7.8000%", "8.2000%"],
      answer: 0,
      solution: `<p>D(1 − τ<sub>c</sub>) = 400 × 0.75 = 300, so the weights are 600/900 and 300/900.</p><p>r<sub>U</sub> = (600 × 11% + 300 × 4%)/900 = (66 + 12)/900 = 78/900 = <b>8.6667%</b>.</p>`,
      check: `<p>Through the cash flows: with no growth the firm's FCF is the equity's 0.11 × 600 = 66 plus after-tax interest 0.04 × 400 × 0.75 = 12, so 78. APV backwards: V<sup>U</sup> = V<sup>L</sup> − τ<sub>c</sub>D = 1 000 − 100 = 900. Then 78/900 = 8.6667% ✓. MM II with taxes returns the cost of equity: 8.6667% + (400/600) × 0.75 × (8.6667% − 4%) = 8.6667% + 2.3333% = 11% ✓. Both routes rearrange the same formula, so they confirm the arithmetic only. Only the question's word permanent tells you to use these weights.</p>`,
      traps: [
        null,
        "Put the tax factor on both the weight and the rate: (66 + 300 × 4% × 0.75)/900 = (66 + 9)/900 = 8.3333%.",
        "Computed the after-tax WACC: 0.60 × 11% + 0.40 × 4% × 0.75 = 7.8000%. That rate values the levered firm, so it is not r<sub>U</sub>.",
        "Used the plain weights E/V and D/V: 0.60 × 11% + 0.40 × 4% = 8.2000%. They assume a target D/V. This debt is fixed.",
      ],
    },
    {
      id: "wacc-apv-8",
      title: "Explicit years and a terminal value",
      theory: `<p>Exam firms often have a few forecast years and then steady growth. Value the steady part as a growing perpetuity at the last forecast date, then discount it together with that year's cash flow. The perpetuity needs the next year's flow, so grow the last forecast once. Working backwards one year at a time gives V<sup>L</sup> at every date, which you will need for the debt.</p>
<div class="formula"><div class="eq">TV<sub>2</sub> = FCF<sub>3</sub>/(r<sub>wacc</sub> − g) = FCF<sub>2</sub>(1 + g)/(r<sub>wacc</sub> − g)</div>
<div class="eq">V<sup>L</sup><sub>t−1</sub> = (FCF<sub>t</sub> + V<sup>L</sup><sub>t</sub>)/(1 + r<sub>wacc</sub>), starting from V<sup>L</sup><sub>2</sub> = TV<sub>2</sub></div>
<div class="where">TV<sub>2</sub> sits at date 2 and is discounted two years, never three. Growing FCF<sub>2</sub> is right only if year 2 is a normal year.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>wacc</sub> = 10%, FCF<sub>1</sub> = 20, FCF<sub>2</sub> = 30, growth of 2% from year 3.</p><p>TV<sub>2</sub> = 30 × 1.02/0.08 = 30.60/0.08 = 382.50.</p><p>V<sup>L</sup><sub>1</sub> = (30 + 382.50)/1.10 = 375.00. V<sup>L</sup><sub>0</sub> = (20 + 375.00)/1.10 = 359.09.</p></div>`,
      q: `<p>A firm keeps a constant debt ratio and its r<sub>wacc</sub> is 9%. Free cash flow is 40 in year 1 and 50 in year 2. Year 2 is a normal year. From then on free cash flow grows at 3% a year forever. What is V<sup>L</sup><sub>0</sub>?</p>`,
      options: ["801.22", "780.18", "741.57", "546.38"],
      answer: 0,
      solution: `<p>FCF<sub>3</sub> = 50 × 1.03 = 51.50. TV<sub>2</sub> = 51.50/(0.09 − 0.03) = 858.3333.</p><p>V<sup>L</sup><sub>1</sub> = (50 + 858.3333)/1.09 = 833.3333.</p><p>V<sup>L</sup><sub>0</sub> = (40 + 833.3333)/1.09 = <b>801.22</b>.</p>`,
      check: `<p>In one line instead: 40/1.09 + 50/1.09² + 858.3333/1.09² = 36.6972 + 42.0840 + 722.4420 = 801.2232. About 90% of the value is the terminal value, which is why its numerator and its timing decide the answer.</p>`,
      traps: [
        null,
        "Forgot the growth in the numerator: TV<sub>2</sub> = 50/0.06 = 833.3333, giving 36.6972 + 883.3333/1.09² = 780.18.",
        "Discounted the terminal value three years: 36.6972 + 42.0840 + 858.3333/1.09³ = 741.57.",
        "Forgot the growth entirely: TV<sub>2</sub> = 50/0.09 = 555.5556, giving 36.6972 + 605.5556/1.09² = 546.38.",
      ],
    },
    {
      id: "wacc-apv-9",
      title: "The debt adjustment between periods",
      theory: `<p>A constant debt ratio is a policy: at every date the firm sets its debt to d times its levered value at that date. V<sup>L</sup><sub>t</sub> is the value just after the year-t cash flow has been paid, so it counts only the flows still to come. When V<sup>L</sup> falls, the firm must repay debt. A firm with a finite life ends at V<sup>L</sup> = 0, so its debt runs down to zero.</p>
<div class="formula"><div class="eq">D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>  ·  ΔD<sub>t</sub> = D<sub>t</sub> − D<sub>t−1</sub> = d(V<sup>L</sup><sub>t</sub> − V<sup>L</sup><sub>t−1</sub>)</div>
<div class="where">d is D/V, not D/E. Not on the formula sheet. H2025 E4(f) asked for exactly this. It is the step almost everyone gets wrong.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>d = 0.30, r<sub>wacc</sub> = 10%, FCF<sub>1</sub> = 60, FCF<sub>2</sub> = 55. The firm closes after year 2.</p><p>V<sup>L</sup><sub>1</sub> = 55/1.10 = 50.00. V<sup>L</sup><sub>0</sub> = (60 + 50.00)/1.10 = 100.00.</p><p>D<sub>0</sub> = 0.30 × 100.00 = 30.00 and D<sub>1</sub> = 0.30 × 50.00 = 15.00, so ΔD<sub>1</sub> = −15.00: the firm repays 15.00 at the end of year 1.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.5. It exists for two years: free cash flow is 33 at the end of year 1 and 44 at the end of year 2, then nothing. r<sub>wacc</sub> = 10%. What is the debt adjustment D<sub>1</sub> − D<sub>0</sub> at the end of year 1?</p>`,
      options: ["+2.2121", "−13.1818", "0.0000", "−8.7879"],
      answer: 3,
      solution: `<p>d = D/V = 0.5/1.5 = 1/3.</p><p>V<sup>L</sup><sub>1</sub> = 44/1.10 = 40.0000 and V<sup>L</sup><sub>0</sub> = (33 + 40.0000)/1.10 = 66.3636.</p><p>D<sub>0</sub> = 66.3636/3 = 22.1212 and D<sub>1</sub> = 40.0000/3 = 13.3333.</p><p>D<sub>1</sub> − D<sub>0</sub> = 13.3333 − 22.1212 = <b>−8.7879</b>: the firm repays 8.7879 at the end of year 1.</p>`,
      check: `<p>The ratio holds at both dates: D<sub>0</sub>/E<sub>0</sub> = 22.1212/44.2424 = 0.5 and D<sub>1</sub>/E<sub>1</sub> = 13.3333/26.6667 = 0.5. Value fell, so debt fell: the sign of ΔD is always the sign of the change in V<sup>L</sup>.</p>`,
      traps: [
        "Kept the year-1 cash flow in V<sup>L</sup><sub>1</sub>: D<sub>1</sub> = (33 + 40)/3 = 24.3333, so 24.3333 − 22.1212 = +2.2121.",
        "Used D/E = 0.5 as the debt ratio: 0.5 × 40 − 0.5 × 66.3636 = 20.0000 − 33.1818 = −13.1818.",
        "Held the debt at its opening level, which abandons the target ratio: 0.0000.",
        null,
      ],
    },
    {
      id: "wacc-apv-19",
      title: "Debt capacity: how the project is funded and who gets the NPV",
      theory: `<p>A firm that keeps net debt at D/V = d must add debt when it takes a project: d times the project's levered value. That is the project's <b>debt capacity</b> (lecture 7). Kurbatov's example shows where the money goes. The capacity is filled with excess cash and new debt, since spending cash raises net debt just as borrowing does. The project is paid for and anything left over goes to the shareholders. They end with the whole NPV: equity rises by (1 − d) times the project's value, plus the payout.</p>
<div class="formula"><div class="eq">debt capacity = d × V<sup>L</sup> = cash used + new debt</div>
<div class="eq">payout = d × V<sup>L</sup> − I &nbsp;·&nbsp; ΔE + payout = (1 − d)V<sup>L</sup> + d × V<sup>L</sup> − I = NPV</div>
<div class="where">V<sup>L</sup> is the project's value at the firm's WACC, before its cost I is paid. If d × V<sup>L</sup> is below I, the shareholders fund the rest and the payout is negative. As the project winds down, its capacity falls and the firm repays debt.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: lecture 7</span><p>The project costs 28 and is worth 61.25, so NPV = 33.25. The firm keeps d = 0.5.</p><p>Capacity 0.5 × 61.25 = 30.625: 20 from cash and 10.625 of new debt. After paying 28, 2.625 is paid out. Equity rises by 0.5 × 61.25 = 30.625. With the 2.625 that is 33.25 = NPV.</p></div>`,
      q: `<p>A firm keeps its net debt at 40% of its value. It takes a project that costs 40 today and is worth 120 at the firm's WACC. It uses its 15 of excess cash and borrows the rest of the project's debt capacity. Whatever is left after paying for the project goes to the shareholders right away. How much is paid out?</p>`,
      options: ["23.00", "−8.00", "8.00", "33.00"],
      answer: 2,
      solution: `<p>Debt capacity = 0.40 × 120 = 48.</p><p>Using the 15 of cash raises net debt by 15, so the new debt is 48 − 15 = 33.</p><p>Cash raised: 15 + 33 = 48. After the project's 40, <b>8.00</b> is paid out.</p>`,
      check: `<p>Equity rises by (1 − 0.40) × 120 = 72. With the payout the shareholders gain 72 + 8 = 80, the NPV of 120 − 40 ✓. The lenders pay a fair price for the new debt and gain nothing, so the shareholders get it all (consistency check 3).</p>`,
      traps: [
        "Borrowed the full 48 and spent the 15 of cash as well: 48 + 15 − 40 = 23. Spending cash already counts toward net debt.",
        "Set the capacity at d × NPV = 0.40 × 80 = 32 instead of d × the project's value: 32 − 40 = −8.",
        null,
        "Reported the new debt, 48 − 15 = 33, not the cash left over once the project is paid for.",
      ],
    },
    {
      id: "wacc-apv-12",
      title: "Running the WACC method backwards: implied growth",
      theory: `<p>The exam often gives you a price and asks what the market must be assuming. Build the WACC from market values, then solve V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) for g. The cost of equity comes from the CAPM with the market risk premium E[R<sub>mkt</sub>] − r<sub>f</sub>, not the market return. The same equation solved for V<sup>L</sup> instead gives the most you can pay, the break-even price.</p>
<div class="formula"><div class="eq">g = r<sub>wacc</sub> − FCF<sub>1</sub>/V<sup>L</sup>  ·  r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">V<sup>L</sup> = E + D at market values: E is price × shares, D follows from the D/E ratio. Verify forwards: FCF<sub>1</sub>/(r<sub>wacc</sub> − g) must return V<sup>L</sup>.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>100 million shares at 20.00, D/E = 0.5, β<sub>E</sub> = 1.0, r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%, r<sub>D</sub> = 4%, τ<sub>c</sub> = 25%, FCF<sub>1</sub> = 60 million.</p><p>E = 2 000, D = 1 000, V<sup>L</sup> = 3 000. r<sub>E</sub> = 0.03 + 1.0 × 0.05 = 8%.</p><p>r<sub>wacc</sub> = (2/3)(0.08) + (1/3)(0.04)(0.75) = 0.053333 + 0.010000 = 0.063333. g = 0.063333 − 60/3 000 = 0.063333 − 0.020000 = 4.3333%.</p></div>`,
      q: `<p>A firm has 400 million shares at 25.00 and keeps a debt-to-equity ratio of 0.25. Its equity beta is 0.9 and its cost of debt is 4%. The risk-free rate is 3%, the expected market return 8% and τ<sub>c</sub> = 22%. Next year's free cash flow is 450 million, growing at a constant rate forever. What growth rate does the market value imply? Use four decimals.</p>`,
      options: ["3.0240%", "2.9189%", "2.1240%", "5.1840%"],
      answer: 0,
      solution: `<p>E = 400 × 25.00 = 10 000, D = 0.25 × 10 000 = 2 500 and V<sup>L</sup> = 12 500, so E/V = 0.80 and D/V = 0.20.</p><p>r<sub>E</sub> = 0.03 + 0.9 × (0.08 − 0.03) = 0.0750.</p><p>r<sub>wacc</sub> = 0.80 × 0.0750 + 0.20 × 0.04 × 0.78 = 0.060000 + 0.006240 = 0.066240.</p><p>g = 0.066240 − 450/12 500 = 0.066240 − 0.036000 = 0.030240 = <b>3.0240%</b>.</p>`,
      check: `<p>Forwards: 450/(0.066240 − 0.030240) = 450/0.036000 = 12 500, the market value. Watch the other classic slip, reading D/E = 0.25 as D/V = 0.25: it changes both the weights and V and lands at 3.0300%, close enough to pass for rounding. Convert the ratio before you start.</p>`,
      traps: [
        null,
        "Read 450 as this year's flow and grew it once: 12 500 = 450(1 + g)/(0.066240 − g), so 378 = 12 950g and g = 2.9189%.",
        "Divided by the equity instead of the firm value: 0.066240 − 450/10 000 = 2.1240%.",
        "Used the market return as the premium: r<sub>E</sub> = 0.03 + 0.9 × 0.08 = 0.1020, so r<sub>wacc</sub> = 0.087840 and g = 5.1840%.",
      ],
    },
    {
      id: "wacc-apv-13",
      title: "Exam level: a twin firm, then WACC and APV on a perpetuity",
      theory: `<p>H2024 E5 has this shape: a comparable firm gives you r<sub>U</sub>, you relever to the target's own leverage, value by WACC and then value again by APV with the debt from the WACC answer. Unlever with the value-weighted betas and price the asset beta with the CAPM. Relever with MM Proposition II, which needs D/E. Only β<sub>U</sub> and r<sub>U</sub> cross from one firm to the other, never the weights.</p>
<div class="formula"><div class="eq">β<sub>U</sub> = (E/V) β<sub>E</sub> + (D/V) β<sub>D</sub>  ·  r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="where">All three are on the formula sheet. The course weights β<sub>U</sub> without taxes. Risk-free debt has β<sub>D</sub> = 0.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Comparable: D/E = 0.25, β<sub>E</sub> = 1.25, risk-free debt. r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%. Target: D/V = 0.40, r<sub>D</sub> = 4.5%, τ<sub>c</sub> = 22%, FCF of 25 a year forever.</p><p>β<sub>U</sub> = 0.80 × 1.25 = 1.00, so r<sub>U</sub> = 0.03 + 1.00 × 0.05 = 8%. D/E = 0.40/0.60 = 0.666667, so r<sub>E</sub> = 0.08 + 0.666667 × 0.035 = 0.103333.</p><p>r<sub>wacc</sub> = 0.60 × 0.103333 + 0.40 × 0.045 × 0.78 = 0.062000 + 0.014040 = 0.076040, so V<sup>L</sup> = 25/0.07604 = 328.7743.</p><p>D = 0.40 × 328.7743 = 131.5097, TS = 0.22 × 0.045 × 131.5097 = 1.301946 and PV(TS) = 1.301946/0.08 = 16.2743. V<sup>U</sup> = 25/0.08 = 312.5000. Then 312.5000 + 16.2743 = 328.7743.</p></div>`,
      q: `<p>You value a private firm that will keep D/V = 0.40 and borrow at r<sub>D</sub> = 5%. Its free cash flow is 20 a year forever, starting next year. A listed comparable with the same business risk has an equity beta of 1.4, risk-free debt and a debt-to-equity ratio of 1/3. r<sub>f</sub> = 4%, the expected market return is 10% and τ<sub>c</sub> = 22%. Using the debt implied by the WACC value, what is PV(TS) in the APV valuation? Use four decimals.</p>`,
      options: ["17.8499", "9.4803", "8.6650", "8.0671"],
      answer: 2,
      solution: `<p>Comparable: D/E = 1/3 gives E/V = 0.75 and D/V = 0.25. β<sub>U</sub> = 0.75 × 1.4 + 0.25 × 0 = 1.05, so r<sub>U</sub> = 0.04 + 1.05 × 0.06 = 0.1030.</p><p>Target: D/E = 0.40/0.60 = 0.666667. r<sub>E</sub> = 0.1030 + 0.666667 × (0.1030 − 0.05) = 0.103000 + 0.035333 = 0.138333.</p><p>r<sub>wacc</sub> = 0.60 × 0.138333 + 0.40 × 0.05 × 0.78 = 0.083000 + 0.015600 = 0.098600, so V<sup>L</sup> = 20/0.0986 = 202.8398.</p><p>D = 0.40 × 202.8398 = 81.1359 and TS = 0.22 × 0.05 × 81.1359 = 0.892495 a year. The firm keeps a constant D/V, so the shield is discounted at r<sub>U</sub>: PV(TS) = 0.892495/0.1030 = <b>8.6650</b>.</p>`,
      check: `<p>Consistency check 1: V<sup>U</sup> = 20/0.1030 = 194.1748. Then 194.1748 + 8.6650 = 202.8398, the WACC value. Consistency check 2: β<sub>E</sub> = (0.138333 − 0.04)/0.06 = 1.638889 and β<sub>D</sub> = (0.05 − 0.04)/0.06 = 0.166667, so 0.60 × 1.638889 + 0.40 × 0.166667 = 0.983333 + 0.066667 = 1.050000 = β<sub>U</sub>. The first is a fixed point that catches a wrong rate on the shield. The second is an identity here and catches only arithmetic.</p>`,
      traps: [
        "Discounted the shield at r<sub>D</sub>: 0.892495/0.05 = 17.8499, which is τ<sub>c</sub> × D. That rate belongs to fixed debt.",
        "Put D/V = 0.40 into MM II as if it were D/E: r<sub>E</sub> = 0.1242, r<sub>wacc</sub> = 0.090120, D = 88.7705 and PV(TS) = 9.4803.",
        null,
        "Unlevered with the tax-adjusted formula β<sub>U</sub> = β<sub>E</sub>/[1 + (1 − τ<sub>c</sub>)D/E] = 1.4/1.26 = 1.1111 instead of the value weights: r<sub>U</sub> = 0.106667, r<sub>wacc</sub> = 0.102267, D = 78.2269 and PV(TS) = 8.0671.",
      ],
    },
    {
      id: "wacc-apv-14",
      title: "Exam level: WACC and APV over two periods, step by step",
      theory: `<p>H2025 E4 chains nine questions on one firm with a finite life: debt beta, r<sub>E</sub>, r<sub>U</sub>, r<sub>wacc</sub>, V<sup>L</sup> by WACC, the debt adjustment, V<sup>U</sup>, the shields and V<sup>L</sup> by APV. Two tools are new. Debt with r<sub>D</sub> above r<sub>f</sub> has a beta, read off the CAPM backwards. Over several periods APV is two discounted sums at r<sub>U</sub>, where the shield in year t comes from the debt carried into that year, D<sub>t−1</sub>. Lay out one table with a column per date, carry full precision and round only when you write.</p>
<div class="formula"><div class="eq">β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>)  ·  r<sub>U</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub></div>
<div class="eq">V<sup>U</sup> = Σ FCF<sub>t</sub>/(1 + r<sub>U</sub>)<sup>t</sup>  ·  PV(TS) = Σ τ<sub>c</sub> r<sub>D</sub> D<sub>t−1</sub>/(1 + r<sub>U</sub>)<sup>t</sup></div>
<div class="where">r<sub>U</sub> has no tax term. The order is fixed: the value path first, then the debt path, then the shields. Under a constant debt ratio every shield is discounted at r<sub>U</sub>. V<sup>U</sup> + PV(TS) must equal the WACC value (consistency check 1). The debt came from the WACC answer, so the check is a fixed point, but it still catches a wrong rate on the shield and slips in the debt path.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>D/E = 0.25, β<sub>E</sub> = 1.5, r<sub>D</sub> = 7%, r<sub>f</sub> = 4%, E[R<sub>mkt</sub>] = 10%, τ<sub>c</sub> = 25%, FCF of 30 and 40 over two years.</p><p>β<sub>D</sub> = 0.03/0.06 = 0.50. r<sub>E</sub> = 0.04 + 1.5 × 0.06 = 13%. D/V = 0.20, so r<sub>U</sub> = 0.80 × 0.13 + 0.20 × 0.07 = 0.104 + 0.014 = 11.80% and r<sub>wacc</sub> = 0.104 + 0.20 × 0.07 × 0.75 = 11.45%.</p><p>V<sup>L</sup><sub>1</sub> = 40/1.1145 = 35.8905 and V<sup>L</sup><sub>0</sub> = (30 + 35.8905)/1.1145 = 59.1212, so D<sub>0</sub> = 11.8242 and D<sub>1</sub> = 7.1781.</p><p>TS<sub>1</sub> = 0.25 × 0.07 × 11.8242 = 0.206924 and TS<sub>2</sub> = 0.25 × 0.07 × 7.1781 = 0.125617. PV(TS) = 0.206924/1.118 + 0.125617/1.118² = 0.185084 + 0.100500 = 0.285584.</p><p>V<sup>U</sup> = 30/1.118 + 40/1.118² = 26.833631 + 32.001946 = 58.835577. Then 58.835577 + 0.285584 = 59.121161.</p></div>`,
      q: `<p>A firm keeps a debt-to-equity ratio of 0.5 and exists for two years, with free cash flow of 60 at the end of year 1 and 80 at the end of year 2. Its equity beta is 1.6 and its cost of debt is 6%. The risk-free rate is 4%, the expected market return 9% and τ<sub>c</sub> = 30%. What is PV(TS) in the APV valuation? Use four decimals.</p>`,
      options: ["0.3989", "1.5395", "1.0264", "1.0793"],
      answer: 2,
      solution: `<p>Rates. Premium = 0.09 − 0.04 = 0.05. β<sub>D</sub> = (0.06 − 0.04)/0.05 = 0.4000. r<sub>E</sub> = 0.04 + 1.6 × 0.05 = 0.1200. D/V = 0.5/1.5 = 1/3, so r<sub>U</sub> = (2/3)(0.12) + (1/3)(0.06) = 0.0800 + 0.0200 = 0.1000 and r<sub>wacc</sub> = 0.0800 + (1/3)(0.06)(0.70) = 0.0800 + 0.0140 = 0.0940.</p><p>Value path. V<sup>L</sup><sub>1</sub> = 80/1.094 = 73.1261 and V<sup>L</sup><sub>0</sub> = (60 + 73.1261)/1.094 = 121.6875.</p><p>Debt path. D<sub>0</sub> = 121.6875/3 = 40.5625 and D<sub>1</sub> = 73.1261/3 = 24.3754, so the firm repays 16.1871 at the end of year 1.</p><p>Shields. TS<sub>1</sub> = 0.30 × 0.06 × 40.5625 = 0.730125 and TS<sub>2</sub> = 0.30 × 0.06 × 24.3754 = 0.438757. The firm keeps a constant D/E, so discount at r<sub>U</sub>: PV(TS) = 0.730125/1.10 + 0.438757/1.21 = 0.663750 + 0.362609 = <b>1.0264</b>.</p>`,
      check: `<p>V<sup>U</sup> = 60/1.10 + 80/1.21 = 54.545455 + 66.115702 = 120.661157. Then 120.661157 + 1.026359 = 121.687516, the WACC value of 121.6875 (consistency check 1). The weighted betas give β<sub>U</sub> = (2/3)(1.6) + (1/3)(0.4) = 1.2000. Priced with the CAPM, 0.04 + 1.2 × 0.05 = 0.1000, the same r<sub>U</sub> as from the returns.</p>`,
      traps: [
        "Took each shield from the debt at the end of its year, D<sub>1</sub> and then D<sub>2</sub> = 0: TS<sub>1</sub> = 0.30 × 0.06 × 24.3754 = 0.438757 and TS<sub>2</sub> = 0, so 0.438757/1.10 = 0.3989.",
        "Used D/E = 0.5 as the debt ratio: D<sub>0</sub> = 60.8438 and D<sub>1</sub> = 36.5631, giving 1.5395.",
        null,
        "Discounted the shields at r<sub>D</sub> = 6%: 0.688797 + 0.390492 = 1.0793.",
      ],
    },
  ],
});
