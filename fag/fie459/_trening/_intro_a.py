# -*- coding: utf-8 -*-
"""Hurtiginnføring for skribent A: sf, etikk og eksternaliteter (forelesning 1, 2 og 3).

   Flettes inn i TEMAER av temaer.py. Engelsk, ingen tankestrek, ingen komma
   foran «and». Kilder: k1, k2 og k3 og foilene til forelesning 1, 2 og 3.
"""

INTRO = {
    "sf": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Labelling the parts of a case as CSR, SRI or ESG",
            "Classifying an investor's motive as value or values and placing it on Starks' spectrum",
            "Saying which direction of double materiality a disclosure covers",
            "Placing an objective on Schoenmaker and Schramade's ladder from finance as usual to SF 3.0",
            "Reading the Giglio et al. (2025) survey and the principal-agent basics of lecture 1",
        ],
        formler=[
            ("The concept chain",
             "Stakeholder management is put into practice through CSR (firms) and SRI (investors); ESG metrics measure "
             "the outcomes. CSR and SRI are actions while ESG is measurement; most empirical problems arise there."),
            ("Double materiality",
             "Financial materiality is outside-in (how sustainability affects the firm, for investors). Impact "
             "materiality is inside-out (how the firm affects people and planet). An impact can become financial."),
            ("Value against values (Starks 2023)",
             "Value: ESG as financially material information on risk and return. Values: nonpecuniary preferences. "
             "Many investors hold both; the tool used does not reveal the motive."),
            ("Starks' spectrum",
             "Impact investing (intended outcomes), SRI (avoid what clashes with one's values), classic ESG investing "
             "(mixed motives) and traditional investing (risk and return alone)."),
            ("Giglio et al. (2025)",
             "About 30,000 Vanguard clients: most see no reason to invest in ESG, return is the rarest motive and on "
             "average ESG is expected to lag. Demand is driven by values more than by expected value."),
            ("Schoenmaker and Schramade's ladder",
             "Finance as usual maximises F. SF 1.0 maximises F subject to S and E. SF 2.0 optimises I = F + S + E. "
             "SF 3.0 optimises S and E subject to F. The horizon lengthens up the ladder."),
            ("Adverse selection and moral hazard",
             "Hidden information used when the contract is made against extra risk taken after it that falls on the "
             "other party. Disclosure, auditing and ratings (ESG ratings too) are remedies."),
            ("Finance in a nutshell",
             "Sustainable finance changes the inputs, not the logic: NPV, MM and no free lunch still hold. Frictions are "
             "where ESG can reach the cost of capital."),
        ],
        feller=[
            "Calling a firm's own action ESG: firms do CSR, investors do SRI and raters measure ESG",
            "Reading a negative screen as proof of values: value investors screen too",
            "Treating SF 1.0 as anything but profit maximisation with constraints, or SF 3.0 as ignoring F",
            "Judging whether ESG pays from the average ESG fund, which mixes value and values funds",
            "Swapping outside-in and inside-out in double materiality",
        ],
    ),
    "etikk": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Classifying a quoted argument by normative theory, from egoism to postmodern ethics",
            "Ordering the Rest and Jones stages and finding where a decision broke down",
            "Placing reasoning on Kohlberg's ladder and naming a moral intensity factor or rationalisation tactic",
            "Sorting factors into individual, issue-related and context-related",
            "Saying which Bénabou and Tirole view a CSR decision reflects",
        ],
        formler=[
            ("Absolutism against relativism",
             "Absolutism: universal moral principles. Relativism: morality depends on context. Consequentialist and "
             "non-consequentialist theories both sit under absolutism."),
            ("Outcomes against principles",
             "Egoism (own interests) and utilitarianism (total welfare) judge outcomes. Ethics of duty (Kant's "
             "universal law) and rights and justice judge the principle. One act can pass one test and fail the other."),
            ("The contemporary theories",
             "Virtue ethics (character), ethics of care (significant relationships), discourse ethics (honest, open "
             "argument) and postmodern ethics (moral impulse in context)."),
            ("Rest and Jones: four stages",
             "Recognise the moral issue, make a moral judgement, establish moral intent, engage in moral behaviour. "
             "Individual and situational factors act on every stage; each can fail."),
            ("Kohlberg's ladder",
             "Pre-conventional (punishment, then fair exchange), conventional (peers, then society) and "
             "post-conventional (rights and contracts, then universal principles). What defines right changes."),
            ("Moral intensity (Jones)",
             "Magnitude, social consensus, probability, temporal immediacy, proximity and concentration of effect. "
             "Low intensity makes an issue less likely to be seen as moral at all."),
            ("Framing, muteness and rationalisation",
             "Moral language triggers moral thinking; moral muteness (Bird and Waters) avoids it. Six tactics: denial "
             "of responsibility, injury or victim, social weighting, higher loyalties, metaphor of the ledger."),
            ("Bénabou and Tirole (2010)",
             "Win-win (CSR pays for itself), delegated philanthropy (stakeholders' values) and insider-initiated "
             "philanthropy (managers spend others' money: an agency problem)."),
        ],
        feller=[
            "Calling ethical egoism non-consequentialist, or saying Kant weighs outcomes",
            "Listing moral intensity or framing as an individual factor: both are situational and issue-related",
            "Confusing denial of injury (no harm) with denial of victim (they deserved it or chose it)",
            "Mixing up failed intent (decides not to act) with failed behaviour (meant to act but did not)",
            "Calling any corporate giving ethical: who wants it and who pays decides the view",
        ],
    ),
    "eksternaliteter": dict(
        formeltittel="Concepts you must know",
        tester=[
            "Classifying an externality in the 2×2 and saying which way price and quantity are wrong",
            "Telling an externality from a cost the firm or its own customers bear",
            "Matching a case to territoriality, greenwashing or political frictions",
            "Placing a step on Unerman et al.'s internalisation spectrum",
            "Reasoning with integrated value, stranded assets and the Air France-KLM carbon charge",
        ],
        formler=[
            ("Externality",
             "A positive or negative effect on agents not involved in producing or consuming the product. The price "
             "leaves it out: a market failure."),
            ("Negative production externality",
             "Marginal societal cost lies above marginal production cost, so P<sub>e</sub> &lt; P<sub>so</sub> and "
             "Q<sub>e</sub> &gt; Q<sub>so</sub>: too cheap, too much."),
            ("The 2×2",
             "Production or consumption, negative or positive: pollution, smoking, R&amp;D and vaccines."),
            ("Enlarged production function",
             "q + w = F(K, L, N, S, H; r, e). Waste and the use of natural, social and human capital are not "
             "embodied in the product, so its price leaves them out."),
            ("Internalisation",
             "Making those responsible bear the costs. Channels: government, civil society, investors, corporates and "
             "consumers; innovation by competitors can force it."),
            ("Unerman et al. (2018) spectrum",
             "Not recognised, risks recognised, voluntary initiatives, mandatory charges for part of the impact, full "
             "internalisation through a legislative ban."),
            ("Three limitations",
             "Territoriality (Bartram, Hou and Kim), greenwashing (Duchin, Gao and Xu; Shell) and political frictions "
             "(Leippold, Sautner and Yu: more anti-climate than pro-climate lobbying)."),
            ("Integrated value",
             "I = F + S + E with external costs negative. Giving up F to raise I protects against stranded assets "
             "once the externality is charged."),
            ("Air France-KLM",
             "Charge = carbon price × emissions; EBIT hit = charge × (1 − pass-on). Scenario analysis weighs several "
             "futures; a stress test looks at the drastic one."),
        ],
        feller=[
            "Saying a polluter's price is too high: others pay part of its cost, so it is too low",
            "Calling harm to the firm's own customers an externality",
            "Reading a greener firm as a greener planet after a sale or relocation",
            "Treating a carbon tax as full internalisation: only a ban is full",
            "Adding external costs to integrated value as positive numbers",
        ],
    ),
}
