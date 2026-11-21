# -*- coding: utf-8 -*-
"""Hurtiginnføringen for skribent C: rapportering, investering og esg-priser.
   Flettes inn i TEMAER av temaer.py."""

INTRO = {
    "rapportering": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Which framework serves which reader and lens: GRI for impact; SASB, ISSB and TCFD for financial "
            "materiality; CSRD for both",
            "The three EU Taxonomy tests applied to a case",
            "The four TCFD pillars, the six &lt;IR&gt; capitals and why ESG ratings disagree",
            "NFRD to CSRD, the Omnibus narrowing and the PwC lessons from the first CSRD reports",
        ],
        formler=[
            ("Financial against impact materiality",
             "Financial materiality asks how sustainability affects the firm (outside-in, for investors). Impact "
             "materiality asks how the firm affects people and planet (inside-out, for all stakeholders). CSRD "
             "requires both: double materiality."),
            ("Integrated Reporting (&lt;IR&gt;)",
             "One report on six capitals: financial, manufactured, intellectual, human and natural, plus social and "
             "relationship. It beats no ESG reporting and ESG in the annual report but adds nothing to a stand-alone "
             "ESG report."),
            ("TCFD and CDP",
             "TCFD: climate disclosure for investors in the financial filings, in four pillars (governance, "
             "strategy with scenario resilience, risk management, metrics and targets). The slides spell it "
             "«TFCD». CDP: an online platform that also takes reports from cities, states and regions."),
            ("EU Taxonomy",
             "An activity is aligned only if it contributes substantially to at least one of six environmental "
             "objectives, does no significant harm to the other five and meets the minimum safeguards. Technical "
             "screening criteria measure the tests."),
            ("CSRD, ESRS and the Omnibus",
             "CSRD replaced NFRD (about 12,000 companies) and was to cover about 50,000, reporting under ESRS on "
             "impacts, risks and opportunities. After the Omnibus package: at least 1,000 employees and net turnover "
             "above EUR 450 million, from financial year 2027."),
            ("ESG ratings",
             "Kotsantonis and Serafeim (2019): inconsistent reporting, rankings driven by the choice of peers and "
             "large rater disagreement that grows with more public information."),
            ("PwC: from reporting to steering",
             "Reporting looks back, monitoring looks at now, steering looks ahead. Sustainability belongs in the "
             "core strategy, a target needs a base year and a target state and climate risk is a today issue."),
        ],
        feller=[
            "«More disclosure makes ratings converge»: disagreement grows with more information",
            "«An aligned activity must serve all six objectives» or «must cut emissions»: one substantial "
            "contribution is enough",
            "«Voluntary reporting best prevents greenwashing»: purely voluntary reporting facilitates it",
            "«A small carbon footprint means low physical risk»: exposure comes through operations, supply chains "
            "and customers",
        ],
    ),
    "investering": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Matching a fund description to one of the six SRI strategies, with best-in-class against exclusion "
            "against integration as the favourite trap",
            "Article 8 against Article 9 under SFDR and why funds moved from 9 to 8",
            "Why an ESG constraint can never raise the best Sharpe ratio",
            "The three barriers, why a passive investor cannot exit and the LTVC profile with its six conditions",
        ],
        formler=[
            ("ESG-efficient frontier",
             "Pedersen, Fitzgibbons and Pomorski (2021): the best Sharpe ratio for each level of portfolio ESG. A "
             "binding constraint costs Sharpe ratio; a view that ESG predicts returns belongs in the forecasts."),
            ("The investment chain",
             "Beneficiaries own a share of what asset owners (pension funds, insurers, funds) hold. Asset owners hire "
             "asset managers, who buy companies' shares and bonds. Every link is a principal-agent relationship."),
            ("SFDR Article 8 and Article 9",
             "Article 8 promotes environmental or social characteristics among others. Article 9 has sustainable "
             "investment as its objective, with no significant harm and good governance. SFDR is a disclosure "
             "regulation, so the article is a claim."),
            ("The six SRI strategies",
             "Negative screening (exclude by rule), best-in-class (top ESG firms within each sector), thematic (top-"
             "down from a trend), ESG integration (into forecasts and discount rate), stewardship (voting and "
             "engagement) and impact investing (intended and measured impact)."),
            ("Stewardship and exit",
             "LGIM and Glencore: engagement, then a shareholder resolution, then divestment as the final escalation. "
             "The threat of exit gives voice its force."),
            ("Three barriers",
             "Overreliance on market metrics (EMH, past volatility, benchmarks), long investment chains and the "
             "limits of ESG tools (little materiality, reported data only, industry-neutral, operations not "
             "products)."),
            ("Passive investors",
             "They can vote, their room to engage is uncertain and they cannot exit, because they must hold the "
             "index."),
            ("Traditional against LTVC",
             "SF 1.0 against SF 2.0: efficient against adaptive markets, max F against max IV, extremely diversified "
             "against concentrated, limited against deep dialogue, 12 months against years or a decade."),
            ("Six conditions for LTVC",
             "Long horizons, active management in a concentrated portfolio, effective engagement, performance "
             "analysis of real-economy value added, long-term alignment of the mandate and a short investment "
             "chain."),
        ],
        feller=[
            "Calling best-in-class an exclusion of sectors: it ranks within each sector, so the best oil producer "
            "can stay",
            "Calling ESG integration a screen: it excludes nothing by itself",
            "Reading a move from Article 9 to Article 8 as more ambition: it lowers the claim",
            "Calling a green theme impact investing: impact needs intention and measurement",
        ],
    ),
    "esg-priser": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Expected against realised returns: why green can outperform while having a lower expected return",
            "Sorting an ESG issue into the cash-flow or the cost-of-capital channel",
            "Alpha and the SML, risk against mispricing and whether ESG is a factor",
            "Matching objectives to strategies and SF typology, plus methods to investor types",
            "The washing machine and the case against blanket divestment",
        ],
        formler=[
            ("Two channels",
             "Cash-flow channel: revenues, costs including litigation, capex and stranded assets. Cost-of-capital "
             "channel: the discount rate. Integration puts each material issue into a line of the DCF."),
            ("Cost of capital evidence",
             "Better CSR or environmental risk management goes with a lower cost of capital (El Ghoul et al. 2011, "
             "Dhaliwal et al. 2011, Cheng et al. 2014, Sharfman and Fernando 2008). For the investor, that is a "
             "lower expected return."),
            ("Pástor, Stambaugh and Taylor (2022)",
             "Green should have lower expected returns (taste premium and climate hedge) but had higher realised "
             "returns because climate concerns rose unexpectedly. Purged of those shocks, green-minus-brown is "
             "flat."),
            ("Realised = expected + surprise",
             "A repricing lifts past returns and lowers future expected returns, since the same cash flows now cost "
             "more."),
            ("Alpha and the SML",
             "Above the line: underpriced, α &gt; 0, the price rises. Below the line: overpriced, α &lt; 0, the "
             "price falls. The slide formula has the sign of α the wrong way round."),
            ("Is ESG a factor?",
             "Research Affiliates' tests: a deep literature, robustness across definitions and robustness across "
             "geographies. Studies disagree. Their European long-short tests show nothing significant."),
            ("Objectives and the ladder",
             "Max FV: finance as usual. Max FV s.t. minimum SEV: exclusionary screening, SF 1.0. Max IV = FV + SEV: "
             "integration, SF 2.0. Max SEV s.t. minimum FV: impact investing, SF 3.0."),
            ("Washing machine and divestment",
             "Gollier and Pouget (2014): avoiding polluters raises their cost of capital; a large, patient and "
             "credible activist can earn abnormal returns by reforming them. Cohen, Gurun and Nguyen (2020): energy "
             "firms are key green innovators, so blanket exclusion may backfire."),
            ("Methods by investor type",
             "Only screening runs on scores. Fundamental investors can use all six methods; passive ones are mostly "
             "limited to screening. ESG integration does not suit them at all."),
        ],
        feller=[
            "«Green outperformed, so green has a higher expected return»",
            "«ESG lowers the cost of capital, so ESG stocks should earn more»",
            "Reading α &lt; 0 as underpriced, which the slide formula invites",
            "Treating a firm-specific ESG risk as one that earns a premium",
        ],
    ),
}
