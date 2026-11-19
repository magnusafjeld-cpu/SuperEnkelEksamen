/* FIE459 · Forelesning 9: ESG integration and asset prices.
   Kilder: manualkapittel 9 (k9.html) og foilene FIE459_H26_9.
   Alfa forklares med ord: fortegnet i foil 20 (og forelesning 8 foil 67) er feil. */
window.EDU_DATA.forelesninger.push({
  nr: 9,
  kapittel: 9,
  tittel: "ESG integration and asset prices",
  minutter: 14,
  krok: "Green stocks beat brown by 174%. So why should green stocks earn less?",
  steg: [
    { id: "f9-krok", type: "krok", tittel: "Lower expected return, higher realised return",
      tekst: "<p>Firms with better ESG have a lower cost of capital, so investors demand a lower return from them. Yet a green-minus-brown portfolio earned a cumulative 174% in recent years. Both are true at once.</p><p>This lecture follows ESG into the share price, solves that puzzle and then links investor objectives to strategies.</p>" },

    { id: "f9-gjett-cesga", type: "gjett",
      sporsmal: "<p>An analyst corrects three lines of a five-year forecast: lower early revenues from litigation over poor treatment of employees, higher taxes linked to tax avoidance and higher capex for better electric batteries. What makes this ESG integration?</p>",
      alternativer: [
        "Each ESG issue lands in a specific line of the valuation",
        "The firm's ESG score is shown next to the valuation",
        "The firm is excluded until the litigation is settled",
        "The discount rate is raised once to cover all ESG issues",
      ],
      svar: 0,
      feil: [
        null,
        "A score beside the model changes no number in it.",
        "Integration excludes nothing by itself.",
        "None of these corrections touches the discount rate.",
      ],
      forklaring: "<p>In the lecture's CESGA example, the corrections cut the equity value to 16 per share, from 20. Integration asks which value driver each material issue moves.</p>" },

    { id: "f9-ide-kanaler", type: "ide", tittel: "Two channels into firm value",
      tekst: "<p>A DCF discounts free cash flows at the cost of capital, so ESG reaches the price in two ways:</p><ul><li><b>Cash-flow channel:</b> revenues, costs (including litigation), capital expenditures and stranded assets.</li><li><b>Cost-of-capital channel:</b> the discount rate.</li></ul><p>The lecture's materiality table asks, issue by issue: how does the firm perform, does it give a competitive edge and which value driver does it move? Part 2 of the group project asks for exactly this.</p>" },

    { id: "f9-sorter-kanal", type: "sorter", tittel: "Which channel?",
      tekst: "<p>Place each ESG effect in the channel it runs through.</p>",
      grupper: ["Cash-flow channel", "Cost-of-capital channel"],
      kort: [
        { t: "Fines and settlements after a labour dispute", g: 0 },
        { t: "Oil reserves that can no longer be extracted", g: 0 },
        { t: "Shareholders accept a lower return for a better CSR score", g: 1 },
        { t: "Extra capex to meet new environmental rules", g: 0 },
        { t: "Good environmental risk management makes funding cheaper", g: 1 },
        { t: "Customers switch to a rival's greener product", g: 0 },
      ],
      forklaring: "<p>What the firm earns or spends (litigation, stranded reserves, capex, lost sales) runs through the cash flows. The return investors demand runs through the discount rate.</p>" },

    { id: "f9-ide-kapitalkost", type: "ide", tittel: "Better ESG, cheaper capital",
      tekst: "<ul><li>Better CSR scores, lower implied cost of capital (El Ghoul, Guedhami, Kwok and Mishra 2011).</li><li>Cost of capital falls once good CSR performers start disclosing (Dhaliwal, Li, Tsang and Yang 2011).</li><li>Superior CSR, better access to finance (Cheng, Ioannou and Serafeim 2014).</li><li>Better environmental risk management, lower cost of capital and more debt (Sharfman and Fernando 2008).</li></ul><p>A lower cost of capital means investors <i>demand</i> a lower return. So how can ESG stocks outperform?</p>" },

    { id: "f9-gjett-to-grunner", type: "gjett",
      sporsmal: "<p>Pástor, Stambaugh and Taylor (2022) argue that green assets should have <b>lower expected returns</b> than brown ones. Which two reasons do they give?</p>",
      alternativer: [
        "Investors' taste for green and green's value as a climate hedge",
        "Green firms' lower margins and their higher regulatory costs",
        "Green firms' higher beta and their lower dividend payouts",
        "Green firms' smaller size and their thinner trading",
      ],
      svar: 0,
      feil: [
        null,
        "The reasons concern what investors want and what risk they bear, not green profits.",
        "A higher beta would raise the expected return, not lower it.",
        "The reasons concern investor demand and climate risk, not trading frictions.",
      ],
      forklaring: "<p><b>Taste premium:</b> investors like green assets, so higher demand pushes prices up and returns down. <b>Risk premium:</b> greener assets are a better hedge against climate risk. Safer assets earn lower returns.</p>" },

    { id: "f9-ide-realisert", type: "ide", tittel: "Why green still beat brown",
      tekst: "<p>Green assets can have <b>higher realised returns</b> when demand shifts towards green <i>unexpectedly</i>. Investors may want more green assets, which lifts prices directly. Or consumers may want more green products, for example because of regulation, which lifts green profits and so prices. Eventually a correction happens: once the shift is priced, green earns its lower expected return again.</p>",
      husk: "Realised return = expected return + surprise." },

    { id: "f9-gjett-35", type: "gjett",
      sporsmal: "<p>Made-up numbers: a green stock pays 5 a year forever and costs 50 at a 10% discount rate. Climate concerns rise, investors now accept 8% and the price jumps to 62.5: a realised return of 35%. What should a buyer expect from now on?</p>",
      alternativer: [
        "8%, below the 10% on a comparable brown stock",
        "35%, since the stock has just shown its strength",
        "10%, since the cash flows have not changed",
        "More than 10%, since green demand keeps rising",
      ],
      svar: 0,
      feil: [
        null,
        "The 35% was a one-off repricing.",
        "The same cash flows at a higher price give a lower return.",
        "Only a further surprise would lift returns; surprises cannot be expected.",
      ],
      forklaring: "<p>The repricing itself lowers the future expected return: the same cash flows now cost more. High realised return, low expected return, same stock.</p>" },

    { id: "f9-felle-fortid", type: "felle", tittel: "High past returns are not high expected returns",
      tekst: "<p>Both sound right, both are false: “green outperformed, so green is a free lunch” and “ESG lowers the cost of capital, so ESG stocks should earn more”. Green beat brown because of a surprise. A lower cost of capital means a <i>lower</i> expected return. Part 5 of the group project asks the same: if the sustainability story is already priced, today's buyer gets the lower expected return.</p>" },

    { id: "f9-sant-motfakta", type: "sant",
      pastand: "<p>When Pástor, Stambaugh and Taylor strip out the unanticipated rise in climate concerns, green stocks still clearly beat brown stocks.</p>",
      svar: false,
      forklaring: "<p>The counterfactual green-minus-brown return is essentially flat: without strengthening climate concerns, green would not have beaten brown. Bonds show the same pattern: the greenium, the lower yield on green bonds, widened.</p>" },

    { id: "f9-gjett-alfa", type: "gjett",
      sporsmal: "<p>A study claims that stocks with strong ESG scores have <b>positive alpha</b>. What is it claiming?</p>",
      alternativer: [
        "They are underpriced: their expected return beats the SML",
        "They are overpriced: their price should fall to the SML",
        "They have a lower market beta than other stocks",
        "Their extra return is pay for higher market risk",
      ],
      svar: 0,
      feil: [
        null,
        "Overpriced means an expected return too low for the risk.",
        "A lower beta is a risk explanation; alpha is about mispricing.",
        "Pay for market risk sits on the SML; alpha is the gap from it.",
      ],
      forklaring: "<p>Alpha is the gap between an asset's expected return and the return the security market line (SML) requires for its beta. Positive alpha: expected return too high for the risk, so the asset is underpriced and its price should rise.</p>" },

    { id: "f9-ide-capm", type: "ide", tittel: "CAPM, APT and two ways ESG could matter",
      tekst: "<p>In the <b>CAPM</b> the required return R<sub>f</sub> + β(E(R<sub>m</sub>) - R<sub>f</sub>) traces the SML. An asset below the line is overpriced (α &lt; 0). Its price falls until it is back on the line. The slide's formula gets the sign of α wrong, so trust these words. The <b>APT</b> adds more systematic factors; only undiversifiable risk earns a premium.</p><p>ESG could matter through <b>risk</b> (beta, or its own factor) or <b>mispricing</b> (α).</p>" },

    { id: "f9-avdekk-faktor", type: "avdekk", tittel: "Is ESG a factor? Three tests",
      tekst: "<p>Research Affiliates sets three tests a factor must pass.</p>",
      rader: [
        { t: "Literature", d: "Grounded in a long and deep academic literature." },
        { t: "Definitions", d: "Robust across definitions." },
        { t: "Geographies", d: "Robust across geographies." },
        { t: "Verdict on ESG", d: "Not clearly passed. Some studies find ESG adds to returns, others that it detracts. No agreed risk-based or behavioural explanation. The debate is still open." },
      ] },

    { id: "f9-sant-faktor", type: "sant",
      pastand: "<p>Research Affiliates' long-short tests in Europe found a positive average return for the environmental strategy, so E passes as a priced factor.</p>",
      svar: false,
      forklaring: "<p>The E strategy averaged 2.2% a year from 2009 to 2020, but like the ESG, S and G strategies it was not statistically significant. A positive average is not a robust premium.</p>" },

    { id: "f9-gjett-mal", type: "gjett",
      sporsmal: "<p>A foundation tells its manager to maximise financial value plus social and environmental value, as equal terms. In Schoenmaker and Schramade's scheme, which strategy and typology fit?</p>",
      alternativer: ["Full ESG integration, SF 2.0", "Exclusionary screening, SF 1.0", "Impact investing, SF 3.0", "Best-in-class screening, SF 2.0"],
      svar: 0,
      feil: [
        null,
        "Screening maximises financial value with SEV only as a minimum.",
        "Impact maximises SEV with financial value only as a minimum.",
        "Best-in-class is a screen within sectors and is not in the objective scheme.",
      ],
      forklaring: "<p>Max IV = FV + SEV treats social and environmental value as an equal term next to financial value. That is ESG integration, the SF 2.0 rung.</p>" },

    { id: "f9-avdekk-mal", type: "avdekk", tittel: "From objectives to strategies",
      tekst: "<p>FV = financial value, SEV = social-environmental value, IV = integrated value. Down the ladder, SEV moves from a constraint to an equal term to the goal.</p>",
      rader: [
        { t: "Max FV", d: "Risk/return optimisation. Finance as usual." },
        { t: "Max FV subject to SEV ≥ minimum", d: "Exclusionary screening. SF 1.0, like the emission-capped portfolio in lecture 8." },
        { t: "Max IV = FV + SEV", d: "ESG integration. SF 2.0." },
        { t: "Max SEV subject to FV ≥ minimum", d: "Impact investing. SF 3.0." },
      ] },

    { id: "f9-gjett-vaskemaskin", type: "gjett",
      sporsmal: "<p>A large activist fund buys a polluter that trades cheaply because of its high cost of capital. It then pushes the firm to become responsible. Where does Gollier and Pouget's (2014) “washing machine” say its abnormal return comes from?</p>",
      alternativer: [
        "The discount disappears and so the share price rises",
        "Responsible investors pay it a taste premium each year",
        "The polluter's dividends rise as it cuts emissions",
      ],
      svar: 0,
      feil: [
        null,
        "A taste premium lowers green holders' expected returns; nobody pays it to the activist.",
        "The mechanism does not need higher payouts.",
      ],
      forklaring: "<p>Making the polluter responsible removes the reason for its discount, so the price rises: a repricing the investor causes instead of waiting for. Gollier and Pouget contrast this activism with voting with your feet, where avoiding polluters raises their cost of capital.</p>" },

    { id: "f9-sant-vask", type: "sant",
      pastand: "<p>A hedge fund with a one-year horizon plans to buy a polluter, clean it up and sell at a profit. By Gollier and Pouget's logic, the short horizon is a problem.</p>",
      svar: true,
      forklaring: "<p>The washing machine works only for a large activist with a <b>long horizon</b> and a <b>credible pro-social orientation</b>. A one-year plan fails the first condition.</p>" },

    { id: "f9-felle-divest", type: "felle", tittel: "Divesting from oil is not automatically green",
      tekst: "<p>Cohen, Gurun and Nguyen (2020), «The ESG-Innovation Disconnect», find that oil, gas and energy firms, with low ESG scores and often excluded from ESG funds, are key green innovators. They produce more and higher-quality green patents. Blanket exclusion may cut capital from the firms doing the most green innovation. Reward-based incentives may work better.</p>" },

    { id: "f9-sant-passiv", type: "sant",
      pastand: "<p>In Schoenmaker and Schramade's table, a passive index investor is essentially limited to screening, because the other methods need fundamental analysis.</p>",
      svar: true,
      forklaring: "<p>Investors can be <b>fundamental</b>, <b>quant</b> or <b>passive</b>. Exclusionary screening runs on scores, so it suits even a passive investor fairly well; best-in-class only to a degree. Everything else needs fundamental analysis. A fundamental investor can use all six methods, while ESG integration is not possible at all for a passive one. Active ownership is rated low for a passive investor: it can still vote (lecture 8), but good engagement needs fundamental analysis or must be bought externally, with loss of quality.</p>" },

  ],
  kunne: [
    "Place an ESG issue in the cash-flow or the cost-of-capital channel of a DCF.",
    "Explain why green assets can have lower expected returns but higher realised returns.",
    "Read alpha in words: negative alpha means overpriced, positive alpha underpriced.",
    "Explain why the evidence on ESG as a systematic factor is still mixed.",
    "Match each portfolio objective to its strategy and SF typology.",
    "Explain the washing machine and the case against blanket divestment.",
    "Tell which sustainability methods suit a fundamental, a quant and a passive investor.",
  ],
});
