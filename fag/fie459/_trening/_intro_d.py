# -*- coding: utf-8 -*-
"""Hurtiginnføringen for skribent D: obligasjoner (forelesning 10), bank
   (forelesning 11 og DNB) og forsikring (forelesning 12). Flettes inn i
   TEMAER av temaer.py. Kilder: k10, k11 og k12 i manualen.
"""

INTRO = {
    "obligasjoner": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Why ESG enters bonds as downside risk and how it reaches the price through the yield and the rating",
            "Classifying a labelled bond from what is tied to sustainability: the use of proceeds or the coupon",
            "The four components of the Green Bond Principles and ICMA's voluntary sets against the EU standard",
            "The five reasons bonds matter and the findings of Flammer (2021) on green bonds",
            "Real estate phases, building certification and ESG-related derivatives such as the ING swap",
        ],
        formler=[
            ("Debt payoff",
             "Debt holders get at most the face value D; below D they take what is left. ESG matters to them "
             "through default risk, loss given default and the rating."),
            ("Price, yield, risk, rating",
             "The coupon is fixed, so the price moves with the yield to maturity. The yield reflects risk and "
             "ratings summarise that risk."),
            ("Sovereign against corporate drivers",
             "Sovereign bonds: GDP, inflation, external debt and default history. Corporate bonds: default risk, "
             "loss given default, liquidity risk and credit migration risk."),
            ("Use-of-proceeds bonds",
             "Green, social and sustainability bonds earmark the money for eligible projects: green, social or a "
             "combination of the two."),
            ("Sustainability-linked bond",
             "A general corporate purpose bond whose coupon is linked to sustainability performance targets. "
             "Nothing is earmarked."),
            ("Green Bond Principles (2017)",
             "Use of proceeds, project evaluation and selection, management of proceeds in a tracked sub-account "
             "and mandatory reporting."),
            ("ICMA against the EU",
             "ICMA's four sets (GBP, SBP, SBG, SLBP) are voluntary. The European Green Bond Standard sits on the "
             "regulation side, but issuers choose whether to use the label."),
            ("Five reasons bonds matter",
             "Maturity (refinancing), market size, shorting «bad» bonds, engagement and signaling."),
            ("Flammer (2021)",
             "A positive announcement reaction, strongest for first-time and certified issues, then better "
             "environmental performance and more long-term and green owners. Read as a credible signal, not as "
             "cheaper funding."),
        ],
        feller=[
            "Calling a bond green because its target is environmental: a green bond is defined by where the money "
            "goes",
            "Reading the label as a verdict on the issuer: an oil producer can issue a green bond for a solar park",
            "Citing the greenium of lecture 9 as Flammer's finding",
            "Putting board expertise under sovereigns or rule of law under corporates",
            "Calling the European Green Bond Standard ICMA's fifth set, or a rule every green bond must follow",
        ],
    ),
    "bank": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Placing a bank policy on the ladder: risk-based (exclusion, ESG integration) or value-based (impact "
            "lending, microfinance)",
            "Telling a green loan, a transition loan and a sustainability-linked loan apart",
            "Why a bank's material issues are indirect and how ESG reaches its credit risk",
            "The Equator Principles, the PRB and the Pillar 3 disclosures, GAR and BTAR included",
            "The DNB guest lecture: ESG risk assessment, avoided emissions, the five phases and the dilemmas",
        ],
        formler=[
            ("Screening, monitoring, verification",
             "Screening before the loan prevents adverse selection. Monitoring during it prevents moral hazard. "
             "Costly state verification audits borrowers who fail to pay."),
            ("Indirect material issues",
             "Credit risk is indirectly all risks a counterparty faces, so a bank's big ESG issues sit in its "
             "credits and investments."),
            ("Risk-based banking",
             "SF 1.0 exclusion and SF 2.0 ESG integration: sustainability enters credit risk management and the "
             "risk premium."),
            ("Value-based banking",
             "SF 3.0 impact lending and microfinance: lending to create social and environmental value with just "
             "enough return to stay viable."),
            ("Two channels into credit risk",
             "ESG changes the borrower's creditworthiness and the value of the collateral."),
            ("GABV data",
             "Values-based banks against global banks: similar ROE, higher ROA, lower leverage and much lower "
             "volatility."),
            ("Green loan against SLL",
             "Green loan: proceeds tracked and allocated to green projects. SLL: margin tied to ESG targets, money "
             "free. DNB's transition loan earmarks money for investments that cut emissions."),
            ("Equator Principles, PRB, Pillar 3",
             "Equator: environmental and social risk in projects. PRB: six principles for the whole bank. Pillar "
             "3: EBA disclosures of transition and physical risk, mitigating actions, GAR and BTAR."),
            ("Avoided emissions (WBCSD)",
             "Life-cycle emissions of the most likely alternative without a solution minus those with it."),
        ],
        feller=[
            "Calling exclusion value-based because the bank acts on its values: in the typology it is risk-based",
            "Thinking an SLL must fund green projects or that a green loan's margin must follow an ESG score",
            "Concluding that climate is immaterial for banks because SASB lists no environmental issue for them",
            "Mixing up the Equator Principles (single projects) with the PRB (the whole bank)",
            "Putting mortgages sorted by energy label under physical risk: in Pillar 3 they are transition risk",
        ],
    ),
    "forsikring": dict(
        formeltittel="Concepts you must know",
        tester=[
            "What technical provisions and equity cover and how that maps onto VaR = EL + UL",
            "The five components of the catastrophe model in order and where a change enters",
            "How catastrophe risk is shared: reinsurance, government programmes and cat bonds",
            "The DNB (2017) projections, the four PSI principles and Solvency II against the IDD",
            "Microinsurance: who supplies it and why it is hard to make profitable",
        ],
        formler=[
            ("Two roles",
             "Risk transfer, pricing and management through pooling, plus capital accumulation and investment of "
             "premiums until claims fall due."),
            ("Provisions against equity",
             "Technical provisions cover expected claims; equity covers unexpected claims. A higher average calls "
             "for premiums and provisions, a fatter tail for equity or risk sharing."),
            ("Catastrophe model",
             "Hazard, vulnerability, exposure, financial loss (before insurance) and the platform that integrates "
             "them."),
            ("VaR = EL + UL",
             "Value at risk at a confidence level is expected plus unexpected loss. Losses beyond it occur with "
             "probability 100% minus the confidence level."),
            ("Three layers of risk sharing",
             "Insurers and reinsurers; government programmes such as the US NFIP when those do not suffice; cat "
             "bonds that let the issuer skip or defer payments after a catastrophic loss."),
            ("DNB (2017)",
             "De Nederlandsche Bank: climate-related claims on Dutch home policies rise by 2085 at 1.5 °C and more "
             "at 3.5 °C, driven by rain and hail."),
            ("PSI",
             "Four voluntary UNEP FI principles that run outwards: own decisions, clients and partners, "
             "governments and society, disclosure of progress."),
            ("Solvency II against the IDD",
             "Solvency II: capital requirements and risk management. IDD: product design, distribution and "
             "suitability. In EY's package the SFDR applies to life insurance only."),
        ],
        feller=[
            "Saying equity covers expected claims: that is the job of technical provisions",
            "Reading VaR as the unexpected loss alone or as the largest possible loss",
            "Saying cat bond investors receive extra payments after a disaster",
            "Taking «DNB (2017)» for the Norwegian bank",
            "Putting stricter building codes under exposure: they change vulnerability",
        ],
    ),
}
