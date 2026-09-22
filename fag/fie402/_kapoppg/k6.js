/* Chapter 6 — MM I and II in perfect markets */
window.EDU_DATA.chapterTasks[6] = {
  minutes: 30,
  tasks: [
    {
      id: "k6-1",
      open: true,
      topic: "Recapitalisation",
      points: 10,
      body: "<p>Nordlys ASA is all-equity financed. It has 30 million shares outstanding, and its equity is worth $600 million. Its unlevered cost of capital is r<sub>U</sub> = 10%. Markets are perfect: no taxes, no distress costs, no information problems.</p><p>The board announces that it will borrow $200 million at r<sub>D</sub> = 5% and use the full proceeds to repurchase shares.</p><p>(a) What is the share price before the announcement, and what is it after the repurchase has been carried out? Explain in one sentence why. (4 points)</p><p>(b) How many shares are repurchased, and how many remain? (2 points)</p><p>(c) What is the cost of equity after the recapitalisation? Show the calculation and run the consistency check. (4 points)</p>",
      solution: "<p><b>(a) Share price.</b> Before: P = E/N = 600/30 = <b>$20.00</b>. After: by MM Proposition I, firm value is independent of capital structure in a perfect market, so V<sup>L</sup> = 600. Equity is 600 − 200 = 400, and the shares are repurchased at the fair price, so P<sub>after</sub> = 400/20 = <b>$20.00</b>, unchanged. The mechanism is that the repurchase is a zero-NPV exchange of $200m of cash for $200m of shares; nothing is created or destroyed.</p><p><b>(b) Shares.</b> Repurchased: 200/20 = <b>10 million</b>. Remaining: 30 − 10 = <b>20 million</b>.</p><p><b>(c) Cost of equity.</b> MM II: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = 0.10 + (200/400)(0.10 − 0.05) = 0.10 + 0.5 × 0.05 = <b>0.1250</b>, that is 12.5%.</p><p><b>Consistency check (check 1 in the manual's list): pre-tax WACC = r<sub>U</sub>.</b> (400/600) × 0.125 + (200/600) × 0.05 = 0.08333 + 0.01667 = 0.1000 = r<sub>U</sub>. ✓ Note that this check is an identity whenever r<sub>E</sub> came from MM II; it catches arithmetic slips, not a wrong method.</p>",
      criteria: [
        "States MM Proposition I explicitly as the reason the share price is unchanged at $20.00, not just the number. The examiner rewards naming the mechanism.",
        "Uses market values throughout: E after = 600 − 200 = 400, and divides by the post-repurchase share count of 20 million, not 30.",
        "Applies MM II with D/E = 200/400 = 0.5, giving r_E = 12.5%. Using D/V = 1/3 in the formula is the classic slip and gives 11.67%.",
        "Runs the pre-tax WACC check and shows it returns 10%. Labels it honestly: it is an identity given MM II, so it catches arithmetic, not method.",
        "Shows every calculation. H2017's key states plainly: no calculation, no points."
      ]
    },
    {
      id: "k6-2",
      open: true,
      topic: "Dividend vs repurchase",
      points: 8,
      body: "<p>Same firm, same perfect market. Suppose instead that Nordlys borrows the $200 million and pays it out as a <b>special dividend</b> rather than repurchasing shares.</p><p>(a) What is the dividend per share, and what is the ex-dividend share price? (4 points)</p><p>(b) Compare the wealth of a shareholder who holds 100 shares under the dividend versus under the repurchase (assuming she does not tender). Are the two policies equivalent for her? Explain in 2–3 sentences. (4 points)</p>",
      solution: "<p><b>(a)</b> Dividend per share = 200/30 = <b>$6.6667</b>. The equity falls to 400 with 30 million shares still outstanding, so the ex-dividend price is 400/30 = <b>$13.3333</b>. Check: 20.00 − 6.6667 = 13.3333 ✓, the price drops by exactly the dividend.</p><p><b>(b)</b> Under the dividend she holds 100 × 13.3333 = $1,333.33 in shares plus $666.67 in cash = <b>$2,000</b>. Under the repurchase, not tendering, she holds 100 × 20.00 = <b>$2,000</b> in shares and no cash. Her wealth is identical; only its form differs (cash versus shares). This is payout irrelevance: in a perfect market the split between dividends and repurchases does not change shareholder wealth, because she can undo either policy herself by selling or buying shares at the fair price.</p>",
      criteria: [
        "Computes the dividend per share on the pre-payout share count (30 million), not on 20 million.",
        "States that the ex-dividend price falls by exactly the dividend, 20.00 → 13.3333, and shows the check.",
        "Compares total wealth (shares plus cash) and finds $2,000 in both cases.",
        "Names the mechanism: payout irrelevance in a perfect market, and why — the shareholder can replicate either policy by trading at the fair price."
      ]
    }
  ]
};
