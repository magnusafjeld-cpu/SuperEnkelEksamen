# -*- coding: utf-8 -*-
"""Hurtiginnføringen for skribent B sine temaer: stakeholder (k4), governance (k5)
   og forretningsmodell (k6). Flettes inn av temaer.py. Samme språkregler som
   spørsmålene: engelsk, ingen tankestrek, ingen komma foran «and»."""

INTRO = {
    "stakeholder": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Matching each critique of the Business Roundtable statement to its author.",
            "When Friedman's separation argument holds and when it fails (Hart and Zingales).",
            "Amoral drift, the shareholder vote and invest and engage against divestment.",
            "Telling shareholder welfare apart from stakeholder theory and pie-growing from pie-splitting.",
            "Codetermination rules and what employees and supply chains add to the debate.",
        ],
        formler=[
            ("Friedman (1970)",
             "The social responsibility of business is to increase its profits, while conforming to the basic rules of "
             "society: law and ethical custom. Not profit at any price."),
            ("Stakeholder theory (Freeman)",
             "The firm is responsible to employees, creditors, customers, suppliers, the community and the environment "
             "as well as owners. The catch: their interests may be misaligned."),
            ("The four critiques",
             "Jensen: managers design their own objective function. Mehrotra and Morck: bright line against ill-defined "
             "charge. Bebchuk and Tallarita: who counts, trade-offs, no aggregation. Harvard Law School Forum: legally "
             "incorrect and unnecessary."),
            ("Separable against non-separable",
             "Separable (charity): owners can do the good themselves, so Friedman holds. Non-separable: the harm is tied "
             "to the firm's technology, so owners cannot undo it."),
            ("Shareholder welfare (Hart and Zingales 2017)",
             "Maximise what owners want, money and values, not market value. Owners stay the principal; this is not "
             "stakeholder theory."),
            ("Amoral drift",
             "A small owner is almost never pivotal, so she does not feel responsible and tenders to a bidder who will "
             "pollute. A shareholder vote fixes it."),
            ("Invest and engage",
             "Divestment fails unless prosocial wealth vastly exceeds the rest: others buy and the shares end up with "
             "the least prosocial owners."),
            ("Pie-splitting against pie-growing (Edmans 2020)",
             "Value as a fixed pie, so one side's gain is the other's loss, against firms that deliver both purpose and "
             "profit. Purpose: how is the world better because the firm exists?"),
            ("Codetermination",
             "Germany: one-third of the supervisory board above 500 employees, half above 2,000. Norway: employees may "
             "elect board members above 30, mandatory above 200 unless there is a corporate assembly."),
        ],
        feller=[
            "Saying Friedman allows breaking the law for profit.",
            "Calling Hart and Zingales stakeholder theorists, or saying they reject Friedman even for charity.",
            "Swapping the bright line: it is shareholder value and stakeholder welfare is the ill-defined charge.",
            "Thinking the Harvard Law School Forum supported the statement; it called it legally incorrect and "
            "unnecessary.",
            "Overstating harmony: the lecture says the perspectives often involve trade-offs.",
        ],
    ),
    "governance": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Classifying a case as adverse selection or moral hazard by its timing.",
            "Voice against exit and why the threat of exit disciplines ex ante.",
            "Sorting measures into governance practices and the benefits of governing sustainability.",
            "The governance challenges of finance as usual, SF 1.0 and SF 2.0 and EMH against AMH.",
            "Judging ESG-linked pay and applying Schoenmaker and Schramade's guidelines.",
        ],
        formler=[
            ("Agency costs",
             "What principals (owners) spend to make agents (managers) act in their interest. The problem arises from "
             "superior information, hidden action after the contract and costly monitoring."),
            ("Adverse selection against moral hazard",
             "Hidden information before the contract (lemons) against hidden action after it (debt overhang, asset "
             "substitution). Timing decides, not whether information is asymmetric."),
            ("Corporate governance",
             "Controls, regulations and incentives that minimise agency costs and prevent fraud, without unduly "
             "burdening managers with the firm's risk. Good governance is value enhancing."),
            ("Voice and exit",
             "Voice: voting and engagement (jawboning). Exit: selling, which disciplines ex ante through the threat of "
             "a lower price. An index fund cannot credibly exit."),
            ("Governance practices",
             "Board monitoring, compensation, shareholder rights (avoid dual-class shares), corporate culture "
             "(compliance, anti-bribery, whistleblowing) and transparency."),
            ("EMH against AMH",
             "Fama: prices hold all relevant information, so carbon is priced. Lo: efficiency depends on the market's "
             "participants, so a new risk such as carbon may not be priced yet."),
            ("SF 1.0 against SF 2.0 challenges",
             "SF 1.0 (F subject to S and E): several objectives leave managers unaccountable. SF 2.0 (I = F + S + E): "
             "balancing everyone, more subjectivity, measuring integrated value."),
            ("ESG-linked pay",
             "Weak, non-causal link to ESG performance. Concerns: tactical short-term targets, vague discretionary "
             "measures, lack of transparency. Starbucks moved it into a three-year equity modifier."),
            ("Focus against objective",
             "A stakeholder focus can create shareholder value; stakeholder value as the objective can raise agency "
             "costs through subjectivity and greenwashing."),
        ],
        feller=[
            "Calling a switch to riskier projects after a loan adverse selection; it is moral hazard.",
            "Thinking exit only works if shareholders actually sell.",
            "Saying ESG-linked pay has been shown to cause better ESG performance.",
            "Listing dual-class shares as a good practice; the lecture says avoid them.",
            "Putting the measurement of integrated value under SF 1.0 instead of SF 2.0.",
        ],
    ),
    "forretningsmodell": dict(
        formeltittel="Concepts you must know",
        tester=[
            "The parts of a business model and the sources of competitive advantage.",
            "Intangible assets against intangible resources and what each DuPont ratio measures.",
            "Financial against impact materiality, double materiality and which issues pay.",
            "Scoring a short case on the three impact criteria.",
            "Applying the seven guidelines for long-term value creation.",
        ],
        formler=[
            ("Business model",
             "How a firm creates, delivers and captures value (Osterwalder and Pigneur). Three parts (Johnson et al.): "
             "customer value proposition, profit formula, key resources and processes."),
            ("Sources of competitive advantage (Porter)",
             "Resources, knowledge, human capital and culture, networks and access (regulation, switching costs, "
             "scale). Oatly's brand and head start did not keep rivals out."),
            ("Intangible assets against resources",
             "Assets such as goodwill are on the balance sheet; resources such as human capital are not. Goodwill is a "
             "price premium and need not reflect those resources."),
            ("DuPont",
             "ROE = net profit margin × asset turnover × financial leverage. Oatly's 0.58 is asset turnover, not a "
             "return; its 2022 return on assets was −33%."),
            ("Financial against impact materiality",
             "SASB: important to investors, outside-in. GRI: the firm's effect on economy, environment and people, "
             "inside-out. Double materiality uses both."),
            ("Khan, Serafeim and Yoon (2016)",
             "Firms that perform well on material issues outperform; performance on immaterial issues does not matter. "
             "Materiality also moves over time (pathways to materiality)."),
            ("Three impact criteria",
             "Material (relevant to value drivers), intentional (part of strategy and purpose) and transformational "
             "(drives major change through business model, technology, scale or standards)."),
            ("Top-down against bottom-up",
             "Top-down rates the exposure of the sector; bottom-up rates how well the company itself manages the "
             "issues. Each runs from 1 to 5."),
            ("Seven LTVC guidelines",
             "Purpose in strategy, sustainability in all functions, communicate goals, deliver on promises, build "
             "long-term intangibles, long-term measurement and long-term incentives without short-term variable pay."),
        ],
        feller=[
            "Reading the slide's \"return on assets\" of 0.58 as a return; it is asset turnover.",
            "Saying good ESG pays on any issue; only material issues are linked to outperformance.",
            "Treating a materiality assessment as fixed.",
            "Putting human capital on the balance sheet, or reading goodwill as the value of staff.",
            "Taking a higher gross margin as proof of profit.",
        ],
    ),
}
