/* sjanger 111 · d3-aksjebytte · Stock swaps, cash offers and bidding (kort stige, del 3) */
window.EDU_DATA.sjangre.push({
  id: "d3-aksjebytte",
  num: 111,
  title: "Stock swaps, cash offers and bidding",
  summary: "The exchange ratio, the merged price, each side's NPV under cash and stock, the highest ratio and a bidding war",
  chapters: [26],
  exam: "M&A on 8 of 11 papers · stock-swap NPVs and the exchange-ratio bound are on the formula sheet · the bank D bidding war is flagged for 2026",
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  intro: `<p>Most M&amp;A calculations start from a stock swap: how many new shares, what the merged firm's shares are worth and how the synergies are split. The formula sheet gives the two NPVs and the bound on the exchange ratio, but not y or the merged price. This ladder builds those, shows why cash and shares split the risk differently and ends with a cash-or-shares exam chain and the bank D bidding war Kurbatov flagged for 2026.</p>`,
  steps: [
    {
      id: "d3-aksjebytte-1",
      title: "The exchange ratio, the new shares and the merged share price",
      theory: `<p>In a stock swap the acquirer pays with its own shares. The exchange ratio ER is the number of acquirer shares each target share receives: "3 acquirer shares for every 8 target shares" is ER = 3/8 = 0.375. The acquirer issues x new shares to the target's holders. After the deal the merged firm is worth the two stand-alone values plus the synergies. Every share, old or new, has the same claim on it.</p>
<div class="formula"><div class="eq">x = ER × N<sub>T</sub> &nbsp;&nbsp; P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x)</div>
<div class="where">A = N<sub>A</sub> × P<sub>A</sub> and T = N<sub>T</sub> × P<sub>T</sub> are the stand-alone equity values at <b>pre-announcement</b> prices. S is the present value of the synergies. Neither formula is on the formula sheet.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The target's holders stop owning the target and start owning a slice of the merged firm. The price is total value over total shares. If P<sub>new</sub> ends above P<sub>A</sub>, the acquirer gave away less than the target brought in.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The acquirer has 9 million shares at 50 NOK and the target 6 million at 20 NOK. The offer is 1 acquirer share for every 2 target shares, so ER = 0.5. S = 54 million.</p><p>A = 450 and T = 120. x = 0.5 × 6 = 3 million new shares. P<sub>new</sub> = (450 + 120 + 54)/(9 + 3) = 624/12 = 52.00 NOK.</p></div>`,
      q: `<p>Granheim ASA has 30 million shares at 84 NOK. It offers 3 Granheim shares for every 8 shares of Tveit AS, which has 24 million shares at 28 NOK. The synergies are worth 150 million NOK. Both prices are pre-announcement. What is the share price of the merged firm?</p>`,
      options: ["81.85 NOK", "35.55 NOK", "85.69 NOK", "61.89 NOK"],
      answer: 2,
      solution: `<p>ER = 3/8 = 0.375, so x = 0.375 × 24 = 9 million new shares and N<sub>A</sub> + x = 39 million.</p><p>A = 30 × 84 = 2 520 and T = 24 × 28 = 672, so A + T + S = 2 520 + 672 + 150 = 3 342 million.</p><p>P<sub>new</sub> = 3 342/39 = <b>85.69 NOK</b>.</p>`,
      check: `<p>Split the value. Tveit's holders get 9 million shares worth 9 × 85.6923 = 771.23 million, while Tveit brings in T + S = 822. Granheim's holders keep the difference, 822 − 771.23 = 50.77 million, or 1.6923 per old share: 84 + 1.6923 = 85.6923 ✓ The price rose, so Granheim gave away less than it got.</p>`,
      traps: [
        "Forgot the synergies: (2 520 + 672)/39 = 81.85 NOK.",
        "Turned the ratio upside down: x = (8/3) × 24 = 64 million, so 3 342/94 = 35.55 NOK.",
        null,
        "Divided by both firms' old share counts, 30 + 24 = 54, instead of 30 + 9: 3 342/54 = 61.89 NOK.",
      ],
    },
    {
      id: "d3-aksjebytte-2",
      title: "The NPV to each side: stock against cash",
      theory: `<p>The deal creates S. How it is paid for decides who gets it. In a stock swap the target's holders end up with the fraction y of the merged firm and the acquirer's old holders with 1 − y. Each side's NPV is what it owns after the deal minus what it had before. In a cash deal the target's holders swap T for the cash price P, while the acquirer keeps the merged firm and pays the cash.</p>
<div class="formula"><div class="eq">Stock: y = x/(N<sub>A</sub> + x) &nbsp; NPV<sub>A</sub> = (1 − y)(A + T + S) − A &nbsp; NPV<sub>T</sub> = y(A + T + S) − T</div><div class="eq">Cash: NPV<sub>T</sub> = P − T &nbsp; NPV<sub>A</sub> = S − (P − T)</div>
<div class="where">P is the total cash price for the target's equity. Both ways NPV<sub>A</sub> + NPV<sub>T</sub> = S. The stock-swap NPVs are on the formula sheet; y and the cash NPVs are not (lecture 12).</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Cash gives the target a fixed premium. Shares give it a slice of the merged firm, synergies included. So a stock offer is worth more to the target than its value at the acquirer's old price whenever the deal lifts the acquirer's price.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>From the previous example: x = 3, N<sub>A</sub> + x = 12, A = 450, T = 120 and S = 54. y = 3/12 = 0.25 and A + T + S = 624.</p><p>NPV<sub>A</sub> = 0.75 × 624 − 450 = 18. NPV<sub>T</sub> = 0.25 × 624 − 120 = 36. Sum 54 = S ✓</p><p>Cash at 25 NOK per share instead, which is what the shares are worth at the old price: P = 150, NPV<sub>T</sub> = 150 − 120 = 30 and NPV<sub>A</sub> = 54 − 30 = 24.</p></div>`,
      q: `<p>Askvik ASA has 25 million shares at 120 NOK. It offers ER = 0.5 for each of the 15 million shares of Breivik AS, which trade at 50 NOK. The synergies are worth 225 million NOK and both prices are pre-announcement. What is the NPV of the deal for Breivik's shareholders?</p>`,
      options: ["150.00 million", "57.69 million", "115.38 million", "167.31 million"],
      answer: 3,
      solution: `<p>A = 25 × 120 = 3 000 and T = 15 × 50 = 750, so A + T + S = 3 975.</p><p>x = 0.5 × 15 = 7.5 million and y = 7.5/32.5 = 0.230769.</p><p>NPV<sub>T</sub> = 0.230769 × 3 975 − 750 = 917.31 − 750 = <b>167.31 million</b>.</p>`,
      check: `<p>Route through the price: P<sub>new</sub> = 3 975/32.5 = 122.3077, so each Breivik share receives 0.5 × 122.3077 = 61.1538 NOK and NPV<sub>T</sub> = 15 × (61.1538 − 50) = 167.31 ✓ A cash offer of 60 NOK per share, the stock offer's value at Askvik's old price, would give Breivik only 150: the shares also hand Breivik part of S.</p>`,
      traps: [
        "Valued the new shares at Askvik's old price, as if the offer were 60 NOK in cash: 7.5 × 120 − 750 = 150.00 million. That leaves out Breivik's slice of the synergies.",
        "Gave Askvik's NPV instead: 0.769231 × 3 975 − 3 000 = 57.69 million.",
        "Forgot the synergies: 0.230769 × 3 750 − 750 = 115.38 million.",
        null,
      ],
    },
    {
      id: "d3-aksjebytte-3",
      title: "Why cash and stock split the risk differently",
      theory: `<p>Cash fixes the target's gain at P − T when the deal is signed. Whatever S turns out to be, the acquirer's holders take all of it: the full shortfall if the synergies disappoint, the full upside if they surprise. In a stock swap the target's holders own y of the merged firm, so they carry y of any surprise. The same holds for overpayment: if the acquirer hands over more than T + S, P<sub>new</sub> falls below P<sub>A</sub> and the target's holders receive less than the offer seemed worth.</p>
<div class="formula"><div class="eq">S falls by ΔS. Cash: NPV<sub>A</sub> falls by ΔS, NPV<sub>T</sub> is unchanged</div><div class="eq">Stock: NPV<sub>A</sub> falls by (1 − y)ΔS, NPV<sub>T</sub> falls by yΔS</div>
<div class="where">y = x/(N<sub>A</sub> + x) is fixed by the exchange ratio when the deal is signed. Both methods still give NPV<sub>A</sub> + NPV<sub>T</sub> = S, whatever S turns out to be.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Cash is a fixed claim; shares are a slice of the outcome. Paying in stock makes the target's holders partners who win and lose with the merged firm. That is why stock is the natural currency when the synergies are uncertain.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The deal from the previous example, but S turns out to be 6, not 54: a shortfall of 48.</p><p>Stock: the merged firm is worth 576 and P<sub>new</sub> = 48. NPV<sub>A</sub> = 0.75 × 576 − 450 = −18, down 36 = 0.75 × 48. NPV<sub>T</sub> = 0.25 × 576 − 120 = 24, down 12 = 0.25 × 48.</p><p>Cash at 25: NPV<sub>T</sub> stays 30. NPV<sub>A</sub> = 6 − 30 = −24, down the full 48.</p></div>`,
      q: `<p>Lunde ASA will buy Vik AS and can pay in cash or in new Lunde shares. At today's prices both offers are worth the same to Vik's holders. Analysts fear that the synergies will be much smaller than Lunde expects. Which statement is right?</p>`,
      options: [
        "With cash, Vik's holders bear part of a shortfall, because the cash price was set from the expected synergies.",
        "With shares, Vik's holders bear the fraction y of a shortfall; with cash, Lunde's holders bear all of it.",
        "The payment method does not change who bears the risk, because the two NPVs add up to S either way.",
        "With shares, Lunde's holders bear all of a shortfall, because Lunde is the firm that issued the new shares.",
      ],
      answer: 1,
      solution: `<p>Once the deal is signed, a cash price no longer depends on S: Vik's holders keep P − T and Lunde's holders absorb the whole shortfall. With shares Vik's holders own y of the merged firm, so a shortfall lowers P<sub>new</sub> and they lose y of it, while Lunde's holders lose 1 − y.</p><p>So <b>with shares Vik's holders bear y of the shortfall; with cash Lunde's holders bear all of it</b>. If Lunde ends up overpaying, the same mechanism makes Vik's actual premium smaller than the offered one.</p>`,
      check: `<p>Run the example: a shortfall of 48 lowered NPV<sub>A</sub> by 48 with cash and by 36 with shares, while NPV<sub>T</sub> fell by 0 with cash and by 12 = 0.25 × 48 with shares ✓ The two NPVs summed to S in all four cases, so that identity cannot tell the methods apart.</p>`,
      traps: [
        "Backwards. The cash price is fixed once the deal is signed, so Vik's holders keep their premium whatever S turns out to be.",
        null,
        "NPV<sub>A</sub> + NPV<sub>T</sub> = S holds for any split. It says nothing about who absorbs a change in S.",
        "Issuing the shares does not make Lunde carry the loss alone: Vik's holders own y of the merged firm and lose with it.",
      ],
    },
    {
      id: "d3-aksjebytte-4",
      title: "The highest exchange ratio the acquirer can offer",
      theory: `<p>A higher ER gives more of the merged firm to the target, so NPV<sub>A</sub> falls as ER rises. The acquirer breaks even when it hands over the target's whole value plus all the synergies. That caps the number of new shares and so the ratio. With cash the same cap is a price of T + S.</p>
<div class="formula"><div class="eq">x<sub>max</sub> = N<sub>A</sub>(T + S)/A</div><div class="eq">ER<sub>max</sub> = x<sub>max</sub>/N<sub>T</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T)</div>
<div class="where">The bound [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) is on the formula sheet. Use pre-announcement prices: later prices already contain part of S. At ER<sub>max</sub>, P<sub>new</sub> = P<sub>A</sub> and the target takes all of S. The target's floor, ER<sub>min</sub> = [T/(A + S)] × (N<sub>A</sub>/N<sub>T</sub>), is not on the sheet.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Without synergies the most the acquirer can pay is the price ratio P<sub>T</sub>/P<sub>A</sub>, a fair swap. Synergies let it pay more, in proportion to how large they are relative to the target. Beyond that point each extra share moves value from the acquirer's holders to the target's.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>N<sub>A</sub> = 20 million at 40 NOK, N<sub>T</sub> = 10 million at 30 NOK and S = 100 million, so A = 800 and T = 300.</p><p>ER<sub>max</sub> = (400/800) × (20/10) = 1.00. By the last form: (30/40)(1 + 100/300) = 0.75 × 1.3333 = 1.00. The highest cash price is T + S = 400, or 40 NOK per share.</p></div>`,
      q: `<p>Haugland ASA (60 million shares) wants to buy Sætre AS (18 million shares) in a stock swap. Before any news Haugland traded at 55 NOK and Sætre at 36 NOK. After rumours of the deal they trade at 54 and 44. The synergies are worth 270 million NOK. What is the highest exchange ratio Haugland can offer before its shareholders lose? Give four decimals.</p>`,
      options: ["0.9273", "0.6545", "1.0926", "0.6050"],
      answer: 0,
      solution: `<p>Use the pre-announcement prices. A = 60 × 55 = 3 300 and T = 18 × 36 = 648.</p><p>ER<sub>max</sub> = [(648 + 270)/3 300] × (60/18) = 0.278182 × 3.333333 = <b>0.9273</b>.</p><p>Last form: (36/55)(1 + 270/648) = 0.654545 × 1.416667 = 0.9273.</p>`,
      check: `<p>At ER = 0.927273, x = 0.927273 × 18 = 16.6909 million and P<sub>new</sub> = (3 300 + 648 + 270)/(60 + 16.6909) = 4 218/76.6909 = 55.00 = P<sub>A</sub> ✓ Backwards: the least synergy that justifies a ratio is S = x × P<sub>A</sub> − T: 16.6909 × 55 − 648 = 270 ✓</p>`,
      traps: [
        null,
        "Left out the synergies: 36/55 = 0.6545. That is a swap with no premium at all.",
        "Used the prices after the rumours, which already contain part of S: (44 + 270/18)/54 = 1.0926.",
        "Gave the target's floor instead: ER<sub>min</sub> = [648/(3 300 + 270)] × (60/18) = 0.6050.",
      ],
    },
    {
      id: "d3-aksjebytte-5",
      title: "Exam level: cash or shares when the synergies disappoint",
      theory: `<p>Exam versions price both offers, then change S and ask who carries the change. Work in a fixed order: stand-alone values, the cash premium P − T, then x and y, then both NPVs with the S the question gives. P − T and y are fixed when the deal is signed; only S moves. A second mechanism earns points in the same exercise: a manager who believes the firm's shares are overvalued prefers to pay with them, so the market reads a stock offer as a sign of overvaluation and the acquirer's price falls.</p>
<div class="formula"><div class="eq">cash: NPV<sub>A</sub> = S − (P − T) &nbsp;&nbsp; stock: NPV<sub>A</sub> = (1 − y)(A + T + S) − A</div>
<div class="where">Use the S that actually materialises. Value the new shares in the merged firm, never at the acquirer's old price.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Paying in stock is buying the target with a currency whose value depends on the deal itself. If the deal disappoints, the currency is worth less, so the target pays part of the bill.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A = 500 (10 million shares at 50) and T = 200 (8 million at 25). Offers: 30 NOK in cash or ER = 0.6. Expected S = 100; it turns out to be 20.</p><p>Cash: P = 240, premium 40, NPV<sub>A</sub> = 20 − 40 = −20. Stock: x = 4.8, y = 4.8/14.8 = 0.324324, NPV<sub>A</sub> = 0.675676 × 720 − 500 = 486.49 − 500 = −13.51.</p></div>`,
      q: `<p>Rødberg ASA has 40 million shares at 90 NOK and Solvang AS 16 million shares at 45 NOK, both stand-alone values. Rødberg expects synergies of 240 million NOK and can pay either 57 NOK in cash per Solvang share or 0.62 new Rødberg shares per Solvang share. Rødberg pays in shares. After closing, the synergies turn out to be only 60 million NOK. What is the NPV of the deal for Rødberg's shareholders?</p>`,
      options: ["−132.00 million", "53.85 million", "−90.38 million", "−112.80 million"],
      answer: 2,
      solution: `<p>A = 40 × 90 = 3 600 and T = 16 × 45 = 720.</p><p>x = 0.62 × 16 = 9.92 million, so N<sub>A</sub> + x = 49.92 and y = 9.92/49.92 = 0.198718.</p><p>With S = 60 the merged firm is worth 3 600 + 720 + 60 = 4 380.</p><p>NPV<sub>A</sub> = (1 − 0.198718) × 4 380 − 3 600 = 3 509.62 − 3 600 = <b>−90.38 million</b>.</p><p>The shortfall of 180 cost Rødberg's holders the full 180 with cash (48 → −132) but only 0.801282 × 180 = 144.23 with shares (53.85 → −90.38). Solvang's holders carried the other 35.77.</p>`,
      check: `<p>Price route: P<sub>new</sub> = 4 380/49.92 = 87.7404, so NPV<sub>A</sub> = 40 × (87.7404 − 90) = −90.38 ✓ This route never uses y, so it would catch a wrong y. Solvang's side: 0.198718 × 4 380 − 720 = 150.38. Then −90.38 + 150.38 = 60 = S, an identity that catches slips only.</p>`,
      traps: [
        "Gave the NPV of the cash offer: 60 − (912 − 720) = −132.00 million. Rødberg paid in shares.",
        "Used the expected synergies of 240: 0.801282 × 4 560 − 3 600 = 53.85 million. The question gives the realised 60.",
        null,
        "Valued the new shares at Rødberg's old price, as if they were cash: 60 − (9.92 × 90 − 720) = 60 − 172.80 = −112.80 million. Solvang's holders get a slice of a firm whose price has fallen.",
      ],
    },
    {
      id: "d3-aksjebytte-6",
      title: "Exam level: a bidding war decided by the alternatives",
      theory: `<p>Kurbatov said the lecture's bidding contest for bank D "could be easily the exam question". When the target will be sold to someone anyway, a bidder does not compare winning with its stand-alone value. It compares winning with losing to a rival, which can leave it worse off than today, for example because the rival becomes a stronger competitor. In an ascending auction the bidder with the highest reservation price wins and pays just above the second highest.</p>
<div class="formula"><div class="eq">reservation price = V(you win) − V(a rival wins)</div><div class="eq">price paid ≈ the second-highest reservation price</div>
<div class="where">V is the bidder's value before it pays anything. If a rival's win does not hurt you, V(a rival wins) is your stand-alone value and the ceiling is your gain from the target. The winner can end below its value before the contest and still be glad it won.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Fear of a rival is worth money. The bidder with the most to lose from someone else's win bids highest, even when every bidder gets the same synergies. Competition can then hand the target more than the whole value the deal creates.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Kystbank and Fjellbank bid for Dalbank, worth 40 alone. Kystbank is worth 100 alone, 170 if it wins and 88 if Fjellbank wins. Fjellbank is worth 80 alone, 150 if it wins and 72 if Kystbank wins.</p><p>Both gain 70 over stand-alone. Ceilings: Kystbank 170 − 88 = 82, Fjellbank 150 − 72 = 78. Kystbank wins at about 78 and ends at 170 − 78 = 92: below its 100 before the contest, above the 88 it would have had if it lost.</p></div>`,
      q: `<p>Nordbank, Vestbank and Sørbank bid for Elvebank, which is worth 50 on its own and will be sold to one of them. The table gives each bidder's value before it pays anything.</p>
<table class="data"><tr><th>Bidder</th><th>Alone</th><th>If it wins Elvebank</th><th>If a rival wins</th></tr>
<tr><td>Nordbank</td><td class="n">120</td><td class="n">200</td><td class="n">110</td></tr>
<tr><td>Vestbank</td><td class="n">100</td><td class="n">180</td><td class="n">85</td></tr>
<tr><td>Sørbank</td><td class="n">90</td><td class="n">170</td><td class="n">72</td></tr></table>
<p>In an ascending auction, who wins and at about what price? How does the winner end up compared with before the contest?</p>`,
      options: [
        "Sørbank wins at about 95 and ends below its value before the contest.",
        "Sørbank wins at about 98 and ends exactly at its value if a rival had won.",
        "No bank bids above its gain of 80 over stand-alone, so Elvebank sells for about 80.",
        "Nordbank wins at about 95, since it is worth the most once it owns Elvebank.",
      ],
      answer: 0,
      solution: `<p>Reservation prices, value if it wins minus value if a rival wins: Nordbank 200 − 110 = 90, Vestbank 180 − 85 = 95, Sørbank 170 − 72 = 98. Every bank gains the same 80 over its stand-alone value, so the ranking comes only from what each loses if a rival wins: 10, 15 and 18.</p><p>Nordbank drops out at 90 and Vestbank at 95, so <b>Sørbank wins at about 95</b>. It ends at 170 − 95 = 75, below its 90 before the contest but above the 72 it would be worth if it lost.</p>`,
      check: `<p>Value before the contest: 120 + 100 + 90 + 50 = 360. After Sørbank's win, before the price is paid: 110 + 85 + 170 = 365, so the deal creates 5. Split at a price of 95: Elvebank's holders +45, Sørbank −15, Nordbank −10, Vestbank −15. Sum +5 ✓ The target takes far more than the whole gain, the same pattern as in Kurbatov's bank D example.</p>`,
      traps: [
        null,
        "The winner pays just above the second-highest ceiling, Vestbank's 95, not its own 98. At 98 Sørbank would end at 72, no better than losing.",
        "Compared winning with stand-alone value. Every bank gains 80, but losing to a rival costs each of them more, so all bid above 80.",
        "Ranked by value with the target. What matters is each bidder's ceiling. Nordbank's 200 − 110 = 90 is the lowest.",
      ],
    },
  ],
});
