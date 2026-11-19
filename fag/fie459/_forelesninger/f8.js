/* FIE459 · Forelesning 8: Investing for long-term value creation.
   Kilder: manualkapittel 8 (k8.html) og foilene FIE459_H26_8. */
window.EDU_DATA.forelesninger.push({
  nr: 8,
  kapittel: 8,
  tittel: "Investing for long-term value creation",
  minutter: 14,
  krok: "Pension savers want long-term value. Why does it get lost on the way through the investment chain?",
  steg: [
    { id: "f8-krok", type: "krok", tittel: "Who actually decides?",
      tekst: "<p>A pension saver wants long-term value. Her money passes through a pension fund to asset managers paid in fees, benchmarked against an index and judged over 12 months. NBIM alone has 111 external mandates.</p><p>What does an ESG rule do to a portfolio, which strategies do sustainable investors use and why does the chain make long-term value creation hard?</p>" },

    { id: "f8-gjett-skranke", type: "gjett",
      sporsmal: "<p>The lecture's investor holds stock A (10% return, 30 tons of emissions) and stock B (5%, 20 tons). She adds a cap on portfolio emissions, but her best portfolio already emits less than the cap. What does the cap cost her?</p>",
      alternativer: [
        "Nothing, because the cap does not bind at her optimum",
        "Some return, since any constraint lowers the Sharpe ratio",
        "Nothing; her Sharpe ratio even rises with the cap",
        "Some risk, since she must shift weight to stock B",
      ],
      svar: 0,
      feil: [
        null,
        "A constraint costs something only when it forces a different portfolio.",
        "An extra constraint can never lift the best attainable Sharpe ratio.",
        "Nothing in the problem forces her to change her weights.",
      ],
      forklaring: "<p>A constrained investor picks from a smaller menu. The best item on a smaller menu cannot beat the best on the full menu. A constraint that does not bind costs nothing; one that binds costs return or adds risk.</p>" },

    { id: "f8-ide-frontier", type: "ide", tittel: "The ESG-efficient frontier",
      tekst: "<p>Markowitz (1952): the <b>efficient frontier</b> gives the highest expected return for each level of risk. An emission cap is one more constraint in the same problem. Pedersen, Fitzgibbons and Pomorski (2021) trace the <b>ESG-efficient frontier</b>: the best attainable Sharpe ratio for each level of portfolio ESG.</p><p>If ESG information helps predict returns, it belongs in the forecasts instead. That is ESG integration.</p>",
      husk: "An ESG constraint can lower or keep the best Sharpe ratio, never raise it." },

    { id: "f8-avdekk-kjede", type: "avdekk", tittel: "The investment chain",
      tekst: "<p>Money reaches companies through a chain. Every link is a principal-agent relationship with its own horizon and incentives.</p>",
      rader: [
        { t: "Beneficiaries or clients", d: "Own a proportionate share of the assets held by the asset owner." },
        { t: "Asset owners", d: "Pension funds, insurers and investment funds. They hire asset managers." },
        { t: "Asset managers", d: "Manage portfolios on the owners' behalf and buy the companies' shares and bonds." },
        { t: "Companies", d: "Where the money meets the real economy." },
        { t: "How managers earn", d: "Fees. Income grows with assets under management, not with what the investments achieve in the real economy." },
      ] },

    { id: "f8-sant-materialitet", type: "sant",
      pastand: "<p>An asset manager's material sustainability issues are limited to its own business, such as selling practices, product labelling and employee engagement.</p>",
      svar: false,
      forklaring: "<p>Those are on the list, with product design, business ethics and systemic risk management. But the manager also takes on the material issues of every company it holds, so its materiality depends on its portfolio.</p>" },

    { id: "f8-gjett-artikkel", type: "gjett",
      sporsmal: "<p>Under the EU's SFDR, a fund promotes low carbon as one of several characteristics. It excludes coal, integrates ESG and engages with firms, but sustainable investment is not its objective. Which article fits?</p>",
      alternativer: [
        "Article 9, because it uses exclusions and engagement",
        "Article 8, because it promotes E or S characteristics",
        "Article 9, because low carbon is a sustainable objective",
        "Neither, because SFDR covers only impact funds",
      ],
      svar: 1,
      feil: [
        "The tools do not decide the article; the fund's stated objective does.",
        null,
        "Low carbon is one characteristic among others here, not the objective.",
        "SFDR covers asset managers, pension funds and insurers in general.",
      ],
      forklaring: "<p>Article 8 funds promote, «among other characteristics», environmental or social characteristics, typically through exclusions, ESG integration and engagement. Article 9 funds have sustainable investment as their objective: firms that contribute positively, do no significant harm and follow good governance.</p>" },

    { id: "f8-felle-artikkel", type: "felle", tittel: "Moving from 9 to 8 is not an upgrade",
      tekst: "<p>Article 9 is the stricter claim: sustainability is the objective, not one characteristic among others. Many funds were recently reclassified from 9 to 8 to avoid accusations of greenwashing. SFDR is a disclosure regulation, so the article reflects what the fund claims about itself. When the claim became hard to defend, funds lowered it.</p>" },

    { id: "f8-ide-sri", type: "ide", tittel: "SRI and why investors buy it",
      tekst: "<p><b>Sustainable and responsible investing (SRI)</b> weighs financial return and social or environmental good to bring about positive change. Why do investors buy it? Social preferences and signalling (Riedl and Smeets 2017). Fund flows respond to Morningstar's sustainability ratings (Hartzmark and Sussman 2019). Much of the demand is about <i>values</i>, not only <i>value</i>.</p>" },

    { id: "f8-gjett-tema", type: "gjett",
      sporsmal: "<p>An ETF starts from a long-term trend, clean water and sanitation. It buys the companies expected to benefit. It does not rank firms by ESG score or measure their impact. Which strategy is this?</p>",
      alternativer: ["Thematic investing", "Best-in-class screening", "Impact investing", "ESG integration"],
      svar: 0,
      feil: [
        null,
        "Best-in-class ranks firms by ESG score within each sector.",
        "Impact investing intends and measures positive impact, mostly in private equity.",
        "Integration feeds material ESG into a valuation rather than starting from a trend.",
      ],
      forklaring: "<p>Thematic investing works <b>top-down</b>: pick a medium- to long-term trend, then the assets expected to benefit. The lecture's example is the Xtrackers MSCI Global SDG 6 Clean Water and Sanitation ETF.</p>" },

    { id: "f8-avdekk-strategier", type: "avdekk", tittel: "The six SRI strategies",
      tekst: "<p>CFA Institute and GSIA definitions. BlackRock groups them into <b>avoid</b> (screen out) and <b>advance</b> (ESG, thematic, impact).</p>",
      rader: [
        { t: "Negative / exclusionary screening", d: "Excludes investments that meet «undesirable» criteria from ethics or norms, or risk-prone sectors. Avoid." },
        { t: "Positive / best-in-class screening", d: "Admits only firms that clear an ESG ranking hurdle within their own sector. Advance." },
        { t: "Thematic investing", d: "Top-down: assets expected to benefit from a long-term trend. Advance." },
        { t: "ESG integration", d: "Feeds material ESG information into cash-flow forecasts and cost-of-capital estimates. Advance." },
        { t: "Stewardship", d: "Uses investor rights (engagement, voting) to protect and enhance long-term value. Voice, not selection." },
        { t: "Impact investing", d: "Intends positive, measurable impact alongside a financial return and measures it. Mostly private equity. Advance." },
      ] },

    { id: "f8-sorter-trio", type: "sorter", tittel: "Exclusion, best-in-class or integration?",
      tekst: "<p>The favourite exam trap. Place each fund action.</p>",
      grupper: ["Exclusionary screening", "Best-in-class screening", "ESG integration"],
      kort: [
        { t: "Drops every tobacco and weapons producer", g: 0 },
        { t: "Holds the top-rated firms of each sector, oil included", g: 1 },
        { t: "Cuts a miner's cash-flow forecast for expected litigation", g: 2 },
        { t: "Removes any firm with revenue from thermal coal", g: 0 },
        { t: "Admits only firms above an ESG hurdle within their industry", g: 1 },
        { t: "Buys a low-ESG firm whose price more than covers its risks", g: 2 },
      ],
      forklaring: "<p>Exclusion removes firms or sectors outright. Best-in-class ranks <i>within</i> each sector, so the best oil producer can make the cut. ESG integration excludes nothing by itself: it moves cash flows and the discount rate, so a low-ESG firm can still be a buy.</p>" },

    { id: "f8-ide-lgim", type: "ide", tittel: "Stewardship in practice: LGIM and Glencore",
      tekst: "<p>Legal and General Investment Management (LGIM) engaged with the miner Glencore on climate from 2016, asking for transparency on thermal coal and alignment with net zero. In 2023 it filed a shareholder resolution asking how projected thermal-coal production aligned with the Paris goals. Judging progress insufficient, LGIM put Glencore on the divestment list of selected funds in 2024, around GBP 176 billion.</p>",
      husk: "Voice first, then a resolution, exit as the final escalation." },

    { id: "f8-sant-lgim", type: "sant",
      pastand: "<p>In the LGIM case, the credible threat of exit is part of what gives engagement its force.</p>",
      svar: true,
      forklaring: "<p>Voice and exit work together: an investor that can walk away has leverage when it engages. LGIM showed the threat was real. Dimson, Karakaş and Li study active ownership (2015) and coordinated engagements (2020).</p>" },

    { id: "f8-gjett-relativ", type: "gjett",
      sporsmal: "<p>A fund manager is benchmarked against a market index. She underweights a high-emission stock because she expects climate rules to hurt it. How does her performance measurement see this bet?</p>",
      alternativer: [
        "As relative risk: a bet away from the index weights",
        "As lower risk, since emitters are more volatile",
        "As neutral, since the index already prices emissions",
      ],
      svar: 0,
      feil: [
        null,
        "Risk is measured against the benchmark here, not against emissions.",
        "The measurement counts deviations, whatever the market has priced.",
      ],
      forklaring: "<p>Active investing means holding a different view on risks or cash flows than the market. A sustainability view is such a view. Measured against a benchmark, any deviation shows up as relative risk, whatever its reason.</p>" },

    { id: "f8-ide-barrierer", type: "ide", tittel: "Three barriers to sustainability",
      tekst: "<p>Schoenmaker and Schramade name three:</p><ul><li><b>Overreliance on market metrics.</b> The efficient market hypothesis says all is priced, so active insight cannot pay. CAPM measures risk by past volatility. Performance is benchmarked to an index.</li><li><b>Long investment chains.</b> Each link has its own horizon and incentives.</li><li><b>Limits of ESG tools.</b> Ratings are add-ons that do not address core issues: little weight on materiality, reported data only, industry-neutral.</li></ul>" },

    { id: "f8-sant-passiv", type: "sant",
      pastand: "<p>A passive index fund that disagrees with a company's climate strategy can vote against management but, as long as it tracks the index, cannot sell the shares in protest.</p>",
      svar: true,
      forklaring: "<p>A passive investor must hold the index, so it loses exit, the «Wall Street Walk». It can still vote, while its room to engage is uncertain.</p>" },

    { id: "f8-sant-verktoy", type: "sant",
      pastand: "<p>Schoenmaker and Schramade criticise ESG ratings for favouring small companies, which have less to report.</p>",
      svar: false,
      forklaring: "<p>The bias runs the other way: ESG ratings favour <b>large</b> companies. They also produce intuitively wrong scores and miss material weaknesses.</p>" },

    { id: "f8-sorter-ltvc", type: "sorter", tittel: "Traditional investing or LTVC?",
      tekst: "<p>Schoenmaker and Schramade contrast traditional investing with investing for long-term value creation (LTVC). Place each feature.</p>",
      grupper: ["Traditional (SF 1.0)", "Long-term value creation (SF 2.0)"],
      kort: [
        { t: "Efficient markets hypothesis", g: 0 },
        { t: "Extremely diversified portfolio", g: 0 },
        { t: "Performance horizon of 12 months", g: 0 },
        { t: "Deep dialogue with companies", g: 1 },
        { t: "DCF with scenarios for internalisation", g: 1 },
        { t: "Maximise IV = F + S + E", g: 1 },
      ],
      forklaring: "<p>Traditional investing assumes efficient markets, maximises F, diversifies extremely and judges over 12 months. LTVC assumes markets learn to price S and E (adaptive markets), maximises integrated value, holds a more concentrated portfolio and judges over years or a decade.</p><p>Note: Schoenmaker and Schramade's table labels traditional investing SF 1.0 yet gives it the objective Max F. On the ladder of lectures 1 and 9, Max F alone is finance as usual and SF 1.0 is Max F subject to S and E.</p>" },

    { id: "f8-gjett-vilkar", type: "gjett",
      sporsmal: "<p>A pension fund wants to tackle the barrier of long investment chains. Which step targets it most directly?</p>",
      alternativer: [
        "Keep the chain short and align mandates for the long term",
        "Hire more external managers to spread the risk",
        "Benchmark every manager to the index each year",
        "Pick managers by their funds' ESG ratings",
      ],
      svar: 0,
      feil: [
        null,
        "More mandates add principal-agent links to the chain.",
        "Short index benchmarks feed the first barrier instead.",
        "Ratings are add-ons that miss core issues, the third barrier.",
      ],
      forklaring: "<p>Every link is a principal-agent relationship with its own horizon. A short chain and a long-term mandate between asset owner and asset manager attack that directly.</p>" },

    { id: "f8-ide-vilkar", type: "ide", tittel: "Six conditions for LTVC",
      tekst: "<ul><li>Long investment horizons</li><li>Active management in a concentrated portfolio</li><li>Effective engagement</li><li>Performance analysis of value added in the real economy</li><li>Long-term alignment of the mandate between owner and manager</li><li>A short investment chain</li></ul><p>Conditions 1, 2 and 4 counter the reliance on market metrics, 3 restores voice, 5 and 6 fix the chain. The UN PRI works towards a sustainable global financial system, among other things by addressing obstacles in market practices, structures and regulation.</p>" },
  ],
  kunne: [
    "Explain why an ESG constraint can lower or keep the best Sharpe ratio but never raise it.",
    "Trace the investment chain and explain why fee income and long chains work against long-term value.",
    "Tell apart SFDR Article 8 and Article 9 and explain why funds moved from 9 to 8.",
    "Match a fund description to one of the six SRI strategies, especially exclusion versus best-in-class versus integration.",
    "Explain why a benchmarked investor sees a sustainability bet as relative risk and why a passive investor cannot exit.",
    "Contrast traditional investing with LTVC and link the six conditions to the three barriers.",
  ],
});
