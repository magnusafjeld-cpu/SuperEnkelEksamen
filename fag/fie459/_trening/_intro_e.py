# -*- coding: utf-8 -*-
"""Hurtiginnføringen for skribent E: temaene «koalisjoner» (forelesning 13) og
   «gjest» (Folketrygdfondet, Fondsfinans og Heidelberg Materials).
   Flettes inn i TEMAER av temaer.py. Samme språkregler som spørsmålene.
"""

INTRO = {
    "koalisjoner": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Matching a short case to one of the six motives for joining a coalition.",
            "Naming the Ostrom design feature a coalition rule puts into practice and what it does against free "
            "riding.",
            "Reading Table 4.3 (coverage against SF ambition, weak enforcement) and Table 3.1 (the five players, "
            "their horizons and threats).",
            "The findings of Dimson, Karakaş &amp; Li on collaboration, success and who leads a coordinated "
            "engagement.",
            "Gates's reasons why government policies matter, the Bank of England risk trade-off and the steps of "
            "backcasting.",
        ],
        formler=[
            ("Six motives to join",
             "Collective advocacy (lobbying for clearer policy), reputation, peer effect (rivals are members), "
             "outside pressure (consumers, investors, NGOs), risk avoidance (stranded assets) and collective "
             "engagement."),
            ("Free riding",
             "Enjoying the benefits of membership without observing the rules. Compliance is a private cost while "
             "the benefits are shared, so shirking is individually rational."),
            ("Ostrom's design features",
             "Boundaries (coverage), membership rules (SF ambition), collective choice, monitoring (makes shirking "
             "visible), sanctions and rewards (make it costly) and conflict resolution."),
            ("Table 4.3",
             "Size and ambition are inversely related: the broad coalitions sit at SF 1.0/2.0, the SF 3.0 ones "
             "cover under 1%. Principles tighten over time. Only WBCSD can expel members."),
            ("Dimson, Karakaş &amp; Li",
             "2015: collaboration raises the success rate; success brings positive abnormal returns, failure zero. "
             "2020: lead investors backed by supporters; a higher stake and a domestic target make a lead."),
            ("Table 3.1",
             "Five players: government, civil society, corporates, investors and households. Government has the "
             "strongest tools but a horizon of up to four years. Free riding threatens governments and "
             "households."),
            ("Gates's seven reasons",
             "Investment gap, level playing field (carbon price), non-market barriers, stay up to date (old policy "
             "as barrier), just transition, the hard stuff and all three levers at once."),
            ("Physical against transition risk",
             "High-emission paths bring physical risk, low-emission paths bring transition risk (Bank of England "
             "2018). The less of one, the more of the other."),
            ("Backcasting",
             "Vision for the end point, then pathways with stepping stones, then actions for now. Forecasting "
             "instead extrapolates today's trends. The transition follows an S-curve."),
        ],
        feller=[
            "Thinking the biggest coalition is the most ambitious. Wide coverage goes with SF 1.0/2.0.",
            "Treating membership or reporting as enforcement. Monitoring makes shirking visible; only sanctions "
            "make it costly.",
            "Saying failed engagements bring negative returns. Dimson, Karakaş &amp; Li find zero.",
            "Swapping the paths: fast emission cuts bring transition risk, not physical risk.",
            "Giving government the longest horizon. It has the shortest, up to four years.",
        ],
    ),
    "gjest": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Linking what each guest said to a course concept: value against values, voice against exit, "
            "materiality, SFDR, physical and transition risk, internalisation and the role of government.",
            "Folketrygdfondet: why a large state owner takes a financial approach to ESG and engages first.",
            "Fondsfinans: ESG against sustainability, the weaknesses of ESG ratings and how an ESG issue reaches the "
            "investment case.",
            "Heidelberg Materials: why cement needs carbon capture and which policies make Brevik CCS pay.",
        ],
        formler=[
            ("Folketrygdfondet's approach",
             "One goal, the highest possible return over time. A financial approach to ESG, integrated in the "
             "analysis, with engagement first: expectations, dialogue, voting and nomination committees."),
            ("Why ownership pays",
             "Its return depends on companies doing well over time and on efficient, well-functioning markets. "
             "That makes it a value investor in Starks' sense."),
            ("ESG against sustainability",
             "ESG is how a company is run, scored against its industry. Sustainability also asks what its products "
             "contribute (SDGs, Paris, EU Taxonomy)."),
            ("Double and dynamic materiality",
             "How ESG affects the company and how the company affects society. Both directions can change over "
             "time as new issues become material."),
            ("SFDR",
             "Article 6 integrates sustainability risk only. Article 8 also promotes environmental or social "
             "characteristics. Article 9 has sustainable investment as its objective, with hard constraints."),
            ("Four questions",
             "Is it material? Which channel? Is it priced? What do we do? Only a view the market does not share "
             "justifies a position."),
            ("Calcination",
             "About two thirds of cement CO<sub>2</sub> comes from the raw material, not the fuel. Clean energy "
             "cannot remove it, so it must be captured."),
            ("Longship and Brevik",
             "State-funded chain: capture at Brevik, ship to Øygarden, storage under the North Sea. Brevik captures "
             "about half of the plant's CO<sub>2</sub>, limited by waste heat."),
            ("Policy that makes capture pay",
             "Fewer free ETS allowances internalise more of the CO<sub>2</sub> cost. Procurement rules that count "
             "indirect (Scope 3) emissions create demand for low-carbon cement."),
        ],
        feller=[
            "Calling a state fund a values investor. Folketrygdfondet states a financial goal.",
            "Reading the best ESG score in an industry as proof that a company is sustainable.",
            "Thinking a passive investor has no tools. It cannot exit, but it can vote and engage.",
            "Netting a large climate contribution against a severe controversy in an Article 9 fund.",
            "Putting purchased steel and concrete in Scope 1 or 2. For the buyer they are Scope 3.",
        ],
    ),
}
