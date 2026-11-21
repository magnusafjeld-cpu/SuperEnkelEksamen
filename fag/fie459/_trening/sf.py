# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: hva bærekraftig finans er (tema «sf», forelesning 1).

   Statiske spørsmål sf-s01 … sf-s30: finance in a nutshell (prinsipal-agent,
   MM og friksjoner, ingen gratis lunsj), de to definisjonene, hvordan ESG går
   inn i verdsettingen, tradisjonell mot bærekraftig finans, begrepskjeden CSR,
   SRI og ESG, driverne, dobbel vesentlighet, Giglio et al. (2025), Starks
   (2023) om value mot values og spekteret, og Schoenmaker og Schramades
   rammeverk fra finance as usual til SF 3.0.

   Kilder: fag/fie459/_fragmenter/k1.html, foilteksten til forelesning 1
   (FIE459_H26_1_Introduction.txt), Starks (2023) og
   docs/fie459-forfatterspek.md § 5 (k1). Spesifikasjonen er
   docs/fie459-trening-spek.md.
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# Begrepskjeden: CSR, SRI og ESG
# ---------------------------------------------------------------------------
statisk(
    "sf-s01", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's chain from sustainability to measurement: which link a given action belongs to.",
        "Sustainability requires taking care of stakeholders (stakeholder management). Firms put it into practice "
        "through CSR, the corporate side. Investors put it into practice through SRI, the investor side. ESG metrics "
        "try to measure the outcomes.",
        "<p><b>Step 1: who acts and on what?</b> Is the bank choosing which other firms to finance or own, or "
        "changing how it runs itself?</p>"
        "<p><b>Step 2: action or measurement?</b> A label in a press release does not change what the act is.</p>",
    ),
    q="<p>Fjordbank, a Nordic savings bank, replaces the heating in all its branches with heat pumps and cuts its "
      "own emissions sharply. Its press release calls this «our ESG investment strategy».</p>"
      "<p>In the lecture's concept chain, what is the bank's action?</p>",
    alternativer=[
        R("CSR, because the bank acts as a firm on its own operations"),
        F("SRI, because a bank is an investor and all it spends is investing",
          "SRI is the investor side: choosing which firms to finance or own. Changing its own branches is not a "
          "decision about other firms."),
        F("ESG, because the press release presents it as an ESG strategy",
          "ESG is the measurement of outcomes. Calling an action ESG does not turn it into a measurement."),
        F("Stakeholder management, which follows CSR and SRI in the chain",
          "The order is reversed. Stakeholder management comes first and is put into practice through the "
          "actions."),
    ],
    kort="<p><b>CSR.</b> The bank changes its own operations, so it acts on the corporate side. SRI would be a choice "
         "about which firms it finances or owns; ESG would be a score of the result.</p>",
    full="<p><b>The chain.</b> Lecture 1 links the acronyms in one line. Sustainability requires that the interests "
         "of the firm's stakeholders are taken care of, which is stakeholder management. Firms put it into practice "
         "through CSR (the corporate side) and investors through SRI (the investor side). The outcomes, stakeholder "
         "welfare, are what ESG metrics try to measure.</p>"
         "<p><b>Here.</b> Fjordbank is a financial firm, but cutting the emissions of its own branches is something it "
         "does as a corporation. That is CSR. Had it refused to lend to coal miners, it would be acting as an "
         "investor, which is SRI.</p>"
         "<p><b>The usual confusion.</b> «ESG strategy» is everyday language. In the lecture's terms ESG is not "
         "something a firm does: it is how a rater scores what the firm did. A bank can sit on both sides of the "
         "chain, so ask in what role it acts.</p>"
         "<p><b>Remember:</b> CSR and SRI are actions; ESG is measurement.</p>",
)

statisk(
    "sf-s02", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about where the lecture locates most of the empirical difficulties in sustainable finance.",
        "The chain runs from sustainability to stakeholder management, which firms put into practice through CSR "
        "and investors through SRI. ESG metrics then try to measure the outcomes.",
        "<p><b>Step 1: what is the same in both assessments?</b> List what the two raters agree on about the utility.</p>"
        "<p><b>Step 2: what differs?</b> Ask which link of the chain produces two different numbers from one set of "
        "facts: an action by the firm, an action by investors or something else.</p>",
    ),
    q="<p>Two rating agencies score the same Nordic utility. One puts it in the top tenth of its industry, the other "
      "in the bottom half. Both assessments use the same information on the utility's policies and emissions.</p>"
      "<p>According to the lecture, where in the chain from sustainability to ESG does this problem arise?</p>",
    alternativer=[
        R("At the measurement step, where ESG metrics try to capture results"),
        F("At the CSR step, since the utility's own actions are unclear",
          "Both raters look at the same policies and emissions. The actions are not in doubt."),
        F("At the SRI step, since investors choose which of the ratings to rely on",
          "SRI is what investors do with their money. The scores already differ before any investor acts."),
        F("At the stakeholder management step, since stakeholders disagree",
          "Nothing in the case says stakeholders disagree. Two raters reach different numbers for one firm."),
    ],
    kort="<p><b>At the measurement step.</b> CSR and SRI are actions; ESG is measurement. The lecture says most "
         "empirical difficulties arise there: raters can score the same firm very differently.</p>",
    full="<p><b>Why measurement is the weak link.</b> The concept chain ends with ESG metrics, which try to measure "
         "the stakeholder welfare that CSR and SRI produce. Measuring welfare is hard: raters must choose which issues "
         "count, how to score them and how to weigh them. Different choices give different scores for the same "
         "firm.</p>"
         "<p><b>Here.</b> The utility's policies and emissions are identical in both assessments, so the actions are "
         "not the problem. The two numbers differ because the raters measure differently. That is the step lecture 1 "
         "flags. Lecture 7 returns to it.</p>"
         "<p><b>The usual confusion.</b> It is tempting to blame the firm for an unclear record or the investors for "
         "picking a rating. Neither explains why one set of facts gives two scores.</p>"
         "<p><b>Remember:</b> most empirical difficulties in ESG arise at the measurement step, not at the "
         "actions.</p>",
)

# ---------------------------------------------------------------------------
# Dobbel vesentlighet
# ---------------------------------------------------------------------------
statisk(
    "sf-s03", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about double materiality: in which direction a sustainability disclosure looks.",
        "Financial materiality is outside-in: how sustainability issues affect the firm. Impact materiality is "
        "inside-out: how the firm affects people and planet. The direction of the effect decides, not the topic.",
        "<p><b>Step 1: who is affected in the section?</b> The company, or people and nature around it?</p>"
        "<p><b>Step 2: separate what is disclosed from what might follow.</b> Answer for what the section actually "
        "reports.</p>",
    ),
    q="<p>A cement producer adds a section to its sustainability report that estimates how much dust from its kilns "
      "harms the lungs of people in nearby villages. The section says nothing about costs to the company.</p>"
      "<p>Which side of double materiality does this section cover?</p>",
    alternativer=[
        R("Impact materiality: how the company's activities affect people and planet"),
        F("Financial materiality, since lawsuits over the dust could cost money later",
          "The section reports harm to the villagers, not effects on the firm. A future lawsuit would add a "
          "financial side, but that is not what is disclosed."),
        F("Financial materiality, since sustainability reports are written for investors",
          "The audience does not set the direction. And this side of materiality speaks to consumers, civil "
          "society and employees as well as investors."),
        F("Neither, since dust is a health issue rather than a sustainability issue",
          "Harm to the health of local people is a social effect of the firm's activities."),
    ],
    kort="<p><b>Impact materiality.</b> The section looks inside-out: from the kilns to the villagers' lungs. It says "
         "nothing about how the issue affects the company.</p>",
    full="<p><b>Two directions.</b> Under double materiality an issue can matter in two ways. Financial materiality "
         "is outside-in: how sustainability issues affect the firm, which is what investors look for. Impact "
         "materiality is inside-out: how the firm affects people and planet, which matters to consumers, civil "
         "society, employees and investors.</p>"
         "<p><b>Here.</b> The section estimates harm that the firm causes to people outside it. The direction runs "
         "from the company to the villages, so it is impact materiality.</p>"
         "<p><b>The usual confusion.</b> The two sides are linked: an impact can become financially material, for "
         "example once a court or a regulator makes the firm pay for the harm. But that is a possible future effect, "
         "not what this section reports. Classify the disclosure by the direction it actually covers.</p>"
         "<p><b>Remember:</b> outside-in is financial materiality; inside-out is impact materiality.</p>",
)

statisk(
    "sf-s04", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about how the two sides of double materiality are linked over time.",
        "Financial materiality is outside-in (how an issue affects the firm). Impact materiality is inside-out (how "
        "the firm affects people and planet). The lecture stresses that the two are linked.",
        "<p><b>Step 1: before the price.</b> Which direction did the emissions cover?</p>"
        "<p><b>Step 2: after the price.</b> Does the harm to the climate disappear? Does a new effect appear? In "
        "which direction does it run?</p>",
    ),
    q="<p>For years a shipping company reported its CO<sub>2</sub> emissions only as an impact on the climate. Then a "
      "carbon price is introduced that the company must pay for every tonne it emits.</p>"
      "<p>What does the lecture's view of double materiality imply for the emissions now?</p>",
    alternativer=[
        R("The impact has also become financially material, since it now affects the firm"),
        F("They have become purely financial, so they no longer count as an impact",
          "The emissions still affect the climate. Paying for them adds an effect; it does not remove the "
          "inside-out one."),
        F("They remain an impact issue only, since the climate is still what is harmed",
          "The carbon price makes the company pay for every tonne, so the issue now reaches its cash flows."),
        F("They are no longer material at all, since the price internalises the harm",
          "Paying for the harm makes the issue matter more to the firm, not less."),
    ],
    kort="<p><b>The impact has also become financially material.</b> Once the firm must pay for the harm, an "
         "inside-out issue also works outside-in.</p>",
    full="<p><b>The link.</b> Double materiality separates two directions: financial materiality (how sustainability "
         "issues affect the firm) and impact materiality (how the firm affects people and planet). Lecture 1 stresses "
         "that they are linked. A firm's impact can become financially material, for example once regulation or "
         "customers make it pay for the harm.</p>"
         "<p><b>Here.</b> Before the carbon price, the emissions harmed the climate but cost the company nothing. "
         "After it, every tonne is a cost. The impact is still there. It now also affects the firm's earnings. "
         "The issue matters in both directions.</p>"
         "<p><b>The usual confusion.</b> Treating the two sides as exclusive: as if an issue must be either impact or "
         "financial. Paying for a harm does not stop it being a harm. This is also why internalisation (lecture 3) "
         "turns impacts into financial risks.</p>"
         "<p><b>Remember:</b> today's impact can be tomorrow's financial risk once someone makes the firm pay.</p>",
)

# ---------------------------------------------------------------------------
# Finance in a nutshell
# ---------------------------------------------------------------------------
statisk(
    "sf-s05", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about the principal-agent problem in lecture 1 and its two forms based on information asymmetry.",
        "Adverse selection: taking advantage of undisclosed information in an economic contract. Moral hazard: one "
        "party in a transaction can take on additional risks that hurt the other party.",
        "<p><b>Step 1: when does the problem arise?</b> Is something hidden when the contract is signed, or does a "
        "party change its behaviour afterwards?</p>"
        "<p><b>Step 2: who bears the cost?</b> A party to the contract or someone outside it?</p>",
    ),
    q="<p>A hotel chain buys insurance against flood damage for its seaside hotels. Once the policy is in place, it "
      "stops maintaining the flood barriers it used to pay for, since the insurer now covers the losses.</p>"
      "<p>Which part of the principal-agent problem is this?</p>",
    alternativer=[
        R("Moral hazard"),
        F("Adverse selection",
          "Adverse selection is about using undisclosed information when the contract is made. Here the behaviour "
          "changes after the contract."),
        F("A negative externality",
          "The insurer is a party to the contract. An externality lands on someone outside the transaction."),
        F("Greenwashing",
          "Greenwashing makes a firm look greener than it is. Nobody is misled about environmental performance "
          "here."),
    ],
    kort="<p><b>Moral hazard.</b> After the contract the chain takes on more risk while the cost falls on the "
         "insurer.</p>",
    full="<p><b>The problem.</b> In the principal-agent problem one party acts for another and their priorities can "
         "differ. Information asymmetry is at the core: the other side cannot see everything. Lecture 1 names two "
         "forms. Adverse selection is taking advantage of undisclosed information in a contract. Moral hazard is one "
         "party taking on extra risk that falls on the other.</p>"
         "<p><b>Here.</b> The hotel chain changes its behaviour after it is insured. Skipping maintenance raises the "
         "chance of flood damage, but the insurer pays. The insurer cannot easily watch every barrier. That is moral "
         "hazard.</p>"
         "<p><b>The usual confusion.</b> Adverse selection would be the chain hiding, when it bought the policy, that "
         "its barriers were already broken. The timing separates the two: before the deal (hidden information) or "
         "after it (hidden action).</p>"
         "<p><b>Remember:</b> moral hazard is extra risk taken after the deal that the other party bears. Remedies "
         "include governance, disclosure, regulation, auditing and ratings.</p>",
)

statisk(
    "sf-s06", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about the two forms of the principal-agent problem that lecture 1 names.",
        "Adverse selection: taking advantage of undisclosed information in an economic contract. Moral hazard: one "
        "party in a transaction can take on additional risks that hurt the other party.",
        "<p><b>Step 1: what does the seller know that the buyer does not?</b></p>"
        "<p><b>Step 2: does the problem come from what is hidden at the deal or from what happens after it?</b></p>",
    ),
    q="<p>A landowner sells a forest plot to a pension fund that wants it as a long-term sustainable investment. The "
      "landowner knows, but does not say, that part of the soil is contaminated with old industrial waste.</p>"
      "<p>Which part of the principal-agent problem does this illustrate?</p>",
    alternativer=[
        R("Adverse selection: undisclosed information is used in the contract"),
        F("Moral hazard: the seller takes on extra risk after the sale",
          "Moral hazard is behaviour after the deal that shifts risk to the other party. The seller does nothing "
          "after the sale."),
        F("A negative externality, since the waste harms the pension fund",
          "The fund is a party to the sale. An externality lands on someone outside the transaction."),
        F("A stranded asset, since the plot loses value once the harm is charged",
          "Stranded assets lose value when externalities are charged to their owner. The problem here is what the "
          "buyer was not told."),
    ],
    kort="<p><b>Adverse selection.</b> The seller takes advantage of information the buyer does not have when the "
         "contract is made.</p>",
    full="<p><b>Hidden information.</b> Lecture 1 puts information asymmetry at the core of the principal-agent "
         "problem. Adverse selection is taking advantage of undisclosed information in an economic contract. The "
         "better-informed side can sell a bad asset at the price of a good one.</p>"
         "<p><b>Here.</b> The landowner knows about the contaminated soil and the fund does not. The fund pays for a "
         "clean forest and gets a polluted one. The problem is fully in place at the moment of the sale.</p>"
         "<p><b>The usual confusion.</b> Moral hazard also rests on information asymmetry, but it is about actions "
         "after the deal that load risk on the other side, such as a borrower switching to riskier projects. Nothing "
         "happens after this sale.</p>"
         "<p><b>Why it matters for ESG.</b> The lecture lists disclosure requirements, auditing and ratings, "
         "including ESG ratings, among the remedies: they shrink what the seller can hide.</p>"
         "<p><b>Remember:</b> hidden information at the deal is adverse selection; hidden action after it is moral "
         "hazard.</p>",
)

statisk(
    "sf-s07", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about the financing decision in lecture 1 and why it leaves room for sustainability.",
        "MM Proposition I: in a perfect capital market firm value does not depend on capital structure. MM "
        "Proposition II: the cost of equity rises linearly with leverage. In reality taxes, bankruptcy costs and "
        "information asymmetry make financing matter.",
        "<p><b>Step 1: check each statement's account of MM I and MM II.</b> Is the direction right?</p>"
        "<p><b>Step 2: ask where ESG can enter.</b> In a perfect market, or through the frictions?</p>",
    ),
    q="<p>Which statement explains why lecture 1 says real-world frictions open the door for sustainability in "
      "financing decisions?</p>",
    alternativer=[
        R("Financing matters once there are frictions, so ESG that changes risk or information can change the cost "
          "of capital"),
        F("MM Proposition I shows that firms with good ESG scores are worth more whatever their capital structure",
          "MM I says firm value does not depend on the financing mix in a perfect market. It says nothing about "
          "ESG."),
        F("MM Proposition II shows that more debt lowers the cost of equity, which helps sustainable firms borrow",
          "MM II says the cost of equity rises with leverage, to pay shareholders for the added risk. The direction "
          "is reversed."),
        F("In a perfect capital market, investors would demand full ESG information before buying any bond or share",
          "A perfect capital market has no information asymmetry and no frictions. The opening for ESG lies "
          "elsewhere."),
    ],
    kort="<p><b>Through the frictions.</b> In a perfect market financing does not matter (MM I). Taxes, bankruptcy "
         "costs and information asymmetry make it matter, so ESG that changes risk or what investors know can change "
         "the cost of capital.</p>",
    full="<p><b>The benchmark.</b> Modigliani and Miller show that in a perfect capital market a firm's value does not "
         "depend on how it is financed (Proposition I). The cost of equity rises linearly with leverage to pay "
         "shareholders for the added risk (Proposition II). In that world the financing decision is irrelevant.</p>"
         "<p><b>The opening.</b> Real markets have taxes, bankruptcy costs and information asymmetry. Once those "
         "frictions exist, financing matters. If ESG changes a firm's risk, for example its exposure to lawsuits or "
         "regulation, or changes what investors know about it, it can change the cost of capital. Lecture 9 returns to "
         "this.</p>"
         "<p><b>The usual confusion.</b> Reading MM as a claim about ESG, or getting MM II backwards. MM is the "
         "benchmark in which nothing about financing matters; sustainability enters through the departures from "
         "it.</p>"
         "<p><b>Remember:</b> sustainable finance changes the inputs to finance, not its logic. Frictions are where "
         "ESG can reach the cost of capital.</p>",
)

# ---------------------------------------------------------------------------
# Definisjoner, verdsetting og tradisjonell mot bærekraftig finans
# ---------------------------------------------------------------------------
statisk(
    "sf-s08", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about the two definitions of sustainable finance in lecture 1 and how they differ in kind.",
        "Schoenmaker and Schramade: sustainable finance looks at how finance (investing and lending) interacts with "
        "economic, social and environmental issues. European Commission: taking ESG considerations into account in "
        "investment decisions, leading to more long-term investment in sustainable activities.",
        "<p><b>Step 1: read each definition for its verb.</b> Does it describe a relation, or a procedure?</p>"
        "<p><b>Step 2: check the direction.</b> Does the definition run one way or both ways?</p>",
    ),
    q="<p>Lecture 1 gives two definitions of sustainable finance, one from Schoenmaker and Schramade and one from the "
      "European Commission. Which statement contrasts them correctly?</p>",
    alternativer=[
        R("The first is a broad two-way interaction; the second is a process with an intended result"),
        F("The first is a process with an intended result; the second is a broad two-way interaction",
          "The two descriptions are attached to the wrong sources."),
        F("The first covers lending only; the second covers investing only",
          "Neither definition splits finance this way. Schoenmaker and Schramade name both investing and "
          "lending."),
        F("The first requires investors to accept lower returns; the second does not",
          "Neither definition says anything about giving up return."),
    ],
    kort="<p><b>Interaction against process.</b> Schoenmaker and Schramade describe how finance and society interact "
         "in both directions. The Commission describes a process (ESG in investment decisions) with an intended result "
         "(long-term sustainable investment).</p>",
    full="<p><b>Two kinds of definition.</b> Schoenmaker and Schramade (2019) say sustainable finance looks at how "
         "finance (investing and lending) interacts with economic, social and environmental issues. That is broad "
         "and runs both ways: finance affects society and nature while they in turn affect finance. The European Commission "
         "defines it as taking ESG considerations into account in investment decisions, leading to more long-term "
         "investment in sustainable activities. That is a process with an intended result.</p>"
         "<p><b>Why it matters.</b> The two-way reading is the seed of double materiality: issues that affect the "
         "firm and the firm's effect on the world. The process reading is what regulation can require.</p>"
         "<p><b>The usual confusion.</b> Swapping the sources, or reading a sacrifice of return into either "
         "definition. Whether ESG costs return is a question about investor motives (Starks), not part of the "
         "definitions.</p>"
         "<p><b>Remember:</b> Schoenmaker and Schramade describe an interaction; the Commission describes a "
         "process.</p>",
)

statisk(
    "sf-s09", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about how ESG issues reach a firm's valuation, through the lines lecture 1 lists.",
        "Lecture 1 lists four lines through which ESG issues affect a valuation: revenues, costs, depreciation and "
        "taxation.",
        "<p><b>Step 1: take the customers.</b> What happens when they switch to a rival?</p>"
        "<p><b>Step 2: take the plant.</b> What happens to an asset whose useful life is suddenly much shorter?</p>",
    ),
    q="<p>An analyst values a utility. She expects many customers to switch to a rival's renewable tariff. She also "
      "expects one of the utility's coal plants to close years early, so it must be depreciated over a much shorter "
      "life than planned.</p>"
      "<p>Through which two of the lines lecture 1 lists do these ESG issues enter her valuation?</p>",
    alternativer=[
        R("Revenues and depreciation"),
        F("Operating costs and taxation",
          "Nothing in the case changes what the utility pays to run its plants or what it pays in tax."),
        F("Costs and depreciation",
          "Customers leaving does not raise the utility's running costs. Look again at what lost customers do."),
        F("Revenues and taxation",
          "No tax appears in the case. Look again at what happens to the plant."),
    ],
    kort="<p><b>Revenues and depreciation.</b> Lost customers cut sales; a shorter useful life raises depreciation "
         "and brings the write-off forward.</p>",
    full="<p><b>Same valuation, new inputs.</b> Sustainable finance keeps the toolkit of ordinary finance. ESG issues "
         "reach a valuation through the usual lines: revenues, costs, depreciation and taxation (lecture 1). The "
         "analyst's job is to find which line a given issue moves.</p>"
         "<p><b>Here.</b> Customers moving to a rival's renewable tariff lower the utility's revenues. A coal plant "
         "that closes years early must be written off over a shorter life, so depreciation rises and the asset's value "
         "falls sooner. That is an early sign of a stranded asset (lecture 3).</p>"
         "<p><b>The usual confusion.</b> Assuming every ESG issue is a cost, such as a carbon tax. Many ESG effects "
         "work through demand or through the life of assets instead.</p>"
         "<p><b>Remember:</b> ask which line an ESG issue moves: revenues, costs, depreciation or taxation. The tools "
         "for getting it there include externalities, materiality, scenario analysis and real options.</p>",
)

statisk(
    "sf-s10", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about lecture 1's side-by-side of traditional and sustainable finance.",
        "Traditional finance: efficient allocation, diversification and risk sharing, shareholder value maximisation. "
        "Sustainable finance deals with the same things, but also different ones.",
        "<p><b>Step 1: for each statement, check the toolkit.</b> Does it keep or throw out NPV and risk?</p>"
        "<p><b>Step 2: check each column.</b> Allocation, diversification and the objective: which way does each "
        "change?</p>",
    ),
    q="<p>Which statement matches lecture 1's comparison of traditional and sustainable finance?</p>",
    alternativer=[
        R("Sustainable finance allocates for the long term, may diversify less and aims at stakeholder welfare"),
        F("Sustainable finance replaces NPV and the CAPM with ESG scores as its main tools",
          "The lecture keeps the toolkit. Sustainable finance changes what counts as value and the horizon, not the "
          "logic of NPV and risk."),
        F("Sustainable finance requires full diversification to offset the risk of screens",
          "Avoiding sin stocks means holding fewer stocks, not more. Nothing in the lecture makes full "
          "diversification a requirement."),
        F("Sustainable finance maximises shareholder value, while traditional finance maximises stakeholder welfare",
          "The two objectives are attached to the wrong kind of finance."),
    ],
    kort="<p><b>Same tasks, wider aims.</b> Sustainable finance still allocates capital and shares risk, but for "
         "long-term sustainability, sometimes with less diversification (no sin stocks) and with stakeholder welfare "
         "as the goal.</p>",
    full="<p><b>The comparison.</b> Foil 32 sets the two side by side. Traditional finance deals with efficient "
         "resource and capital allocation, diversification and risk sharing as well as shareholder value maximisation. "
         "Sustainable finance deals with the same things, but differently: allocation for long-term sustainability, "
         "sometimes less diversification for good reasons, such as avoiding «sin stocks», plus stakeholder welfare "
         "maximisation.</p>"
         "<p><b>Why it is not a new toolkit.</b> NPV, the CAPM and the idea of no free lunch still hold. What changes "
         "is what counts as value and how long the horizon is.</p>"
         "<p><b>The usual confusion.</b> Thinking that holding fewer stocks is always a mistake. Excluding sin stocks "
         "costs some diversification; sustainable finance can accept that for a reason. Starks' values investors "
         "may accept a lower return for it.</p>"
         "<p><b>Remember:</b> sustainable finance changes the inputs and the objective, not the logic.</p>",
)

statisk(
    "sf-s11", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about lecture 1's «finance in a nutshell»: which basic principle tests a claim about return and "
        "risk.",
        "The four building blocks: invest if NPV &gt; 0; MM on financing; risk and return with the CAPM, where assets "
        "so mispriced as to be obvious bargains are rare; and the principal-agent problem.",
        "<p><b>Step 1: what does the brochure promise?</b> Look at both return and risk.</p>"
        "<p><b>Step 2: which building block speaks to that pair?</b> Strike the ones about projects, financing mix or "
        "hidden actions.</p>",
    ),
    q="<p>A fund's brochure says: «Our ESG portfolio will earn more than the market every year while carrying less "
      "risk.»</p>"
      "<p>Which idea from lecture 1's «finance in a nutshell» should make you most sceptical of this claim?</p>",
    alternativer=[
        R("Higher expected returns usually come only with greater risk"),
        F("In a perfect capital market a firm's value does not depend on how it is financed",
          "That is MM Proposition I, about capital structure. The brochure makes a claim about a portfolio's return "
          "and risk."),
        F("A firm should invest only in projects with a positive net present value",
          "The NPV rule tells a firm which projects to take. It does not test a promise about portfolio "
          "returns."),
        F("Managers may take on extra risks that fall on the investors",
          "That is moral hazard. The brochure's problem is the promised mix of return and risk, not a hidden "
          "action."),
    ],
    kort="<p><b>No free lunch.</b> Higher expected returns usually come only with greater risk. A promise of more "
         "return with less risk, every year, is the kind of obvious bargain the CAPM says is rare.</p>",
    full="<p><b>The principle.</b> Lecture 1 recalls that investors operate where higher returns can usually be "
         "obtained only at the price of greater risk. The CAPM, E(R<sub>i</sub>) = R<sub>f</sub> + "
         "β<sub>i</sub>[E(R<sub>m</sub>) − R<sub>f</sub>], prices systematic risk. It is rare to find assets so "
         "mispriced as to be obvious bargains: there is no free lunch.</p>"
         "<p><b>Here.</b> The brochure promises higher return and lower risk, every year. That is exactly the free "
         "lunch the principle warns against. The manual's advice: meet any claim that ESG is a free source of extra "
         "return with the same suspicion.</p>"
         "<p><b>The usual confusion.</b> Thinking that Starks' value investors prove the claim. Value investors use "
         "ESG to improve risk and return, but that is a hope about information, not a guarantee. Values investors may "
         "even accept less.</p>"
         "<p><b>Remember:</b> sustainable finance keeps the logic of finance. No free lunch applies to ESG too.</p>",
)

# ---------------------------------------------------------------------------
# Driverne og Giglio et al. (2025)
# ---------------------------------------------------------------------------
statisk(
    "sf-s12", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about the drivers of sustainable finance in lecture 1: what pressure from employees and consumers "
        "teaches firms.",
        "Drivers in lecture 1: science, global agreements, regulation, public awareness, employees and consumers who "
        "are increasingly critical of misconduct, plus investor demand.",
        "<p><b>Step 1: what happens to the retailer?</b> Look at sales and hiring.</p>"
        "<p><b>Step 2: what does that show about ESG issues?</b> Ask whether the problem stayed outside the firm's "
        "accounts or reached them.</p>",
    ),
    q="<p>After reports of forced labour at a supplier, a clothing retailer's staff protest and many customers stop "
      "buying. Sales fall and hiring gets harder.</p>"
      "<p>According to lecture 1, what does this kind of pressure from employees and consumers make firms "
      "realise?</p>",
    alternativer=[
        R("That ESG issues are financially material"),
        F("That ESG is measurement rather than action",
          "That is the point of the concept chain. It does not explain what the protests and lost customers "
          "teach the firm."),
        F("That values investors now outnumber value investors",
          "Nothing in the case concerns investors. The pressure comes from staff and customers."),
        F("That regulation is no longer needed",
          "The lecture lists regulation as a separate driver that is growing. Consumer pressure does not replace "
          "it."),
    ],
    kort="<p><b>That ESG issues are financially material.</b> When staff and customers punish misconduct, a social "
         "issue shows up in sales and hiring.</p>",
    full="<p><b>The driver.</b> Lecture 1 lists several reasons sustainable finance has grown: science (planetary "
         "boundaries), global agreements (the SDGs, Paris and Kunming-Montreal), a sharp rise in ESG regulation, "
         "public awareness, employees and consumers as well as investor demand. On employees and consumers the foil is "
         "explicit: they are increasingly aware and critical of misconduct, so firms realise that ESG issues are "
         "financially material.</p>"
         "<p><b>Here.</b> Forced labour at a supplier is a social issue far down the supply chain. Once staff protest "
         "and customers walk away, it hits revenue and the cost of hiring. It has moved from impact to money.</p>"
         "<p><b>The usual confusion.</b> Reading the case as being about investors or regulators. The lesson is that "
         "markets for products and labour can make an ESG issue pay before any law does.</p>"
         "<p><b>Remember:</b> pressure from staff and customers is one route by which an impact becomes financially "
         "material.</p>",
)

statisk(
    "sf-s13", tema="sf", type="fakta",
    hjelp=hjelp3(
        "This is about reading the Vanguard survey through Starks' distinction between two motives for ESG.",
        "Value: ESG matters because it is financially material, through risk and return. Values: nonpecuniary "
        "preferences. Many investors hold both.",
        "<p><b>Step 1: what does a hedge do?</b> It protects against a risk.</p>"
        "<p><b>Step 2: why might someone want that protection?</b> List a financial reason and a nonfinancial one. "
        "Does the survey answer tell you which of them the respondent had?</p>",
    ),
    q="<p>In the survey of Vanguard clients by Giglio et al. (2025), one group invests in ESG mainly as a hedge "
      "against climate risk.</p>"
      "<p>How do Starks and the lecture classify this group in the value versus values framework?</p>",
    alternativer=[
        R("They could be either"),
        F("They are values investors",
          "Hedging protects a portfolio against a risk, which can be a purely financial aim. The topic alone does not "
          "settle the motive."),
        F("They are value investors",
          "Some may hedge because they care about the climate itself, not only about their portfolio."),
        F("They are impact investors",
          "Impact investors set out to change environmental or social outcomes. A hedge protects against a risk; it "
          "does not aim to change it."),
    ],
    kort="<p><b>They could be either.</b> Starks reads the ethical group as values investors and the return group as "
         "value investors. The climate hedgers fit both readings.</p>",
    full="<p><b>The survey.</b> Giglio et al. (2025) asked roughly 30,000 US individual investors, Vanguard clients, "
         "for their main motive. The largest group saw no reason at all to invest in ESG. Among the rest, ethical "
         "considerations came first, then climate hedging, with return expectations last.</p>"
         "<p><b>Starks' reading.</b> The ethical group are values investors: nonpecuniary preferences. The return "
         "group are value investors: ESG as information about risk and return. The climate hedgers want insurance "
         "against climate risk. That can be a financial aim (protect the portfolio) or a values aim (care about the "
         "climate), so they could be either.</p>"
         "<p><b>The usual confusion.</b> Classifying a motive by its topic. Climate is not automatically «values»; "
         "a risk can be managed for purely financial reasons.</p>"
         "<p><b>Remember:</b> ethics points to values and return to value; climate hedging could be either. The "
         "survey's overall message: demand is driven far more by values than by expected value.</p>",
)

statisk(
    "sf-s14", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about what the Vanguard survey implies for how ESG investors behave.",
        "Value investors use ESG because they expect it to improve risk and return. Values investors act on "
        "nonpecuniary preferences and may knowingly accept a lower return. The survey asks which motive drives most "
        "ESG demand.",
        "<p><b>Step 1: recall what most ESG buyers in the survey expect from ESG returns.</b></p>"
        "<p><b>Step 2: ask what a buyer who expects to lag, but buys anyway, is paying for.</b> Then predict how "
        "such buyers react when a fund lags.</p>",
    ),
    q="<p>Giglio et al. (2025) conclude that demand for ESG is driven far more by values than by expected financial "
      "value.</p>"
      "<p>If that is right, which behaviour should you expect from typical ESG fund buyers?</p>",
    alternativer=[
        R("They keep holding ESG funds even while expecting them to lag the market a little"),
        F("They sell their ESG funds as soon as the funds start to lag the market",
          "That describes buyers who bought for return. Values-driven buyers expect to lag and hold anyway."),
        F("They choose between ESG funds mainly on the funds' past returns",
          "Ranking on past returns treats return as the main motive. The survey finds that it is not."),
        F("They avoid ESG funds that screen out sin stocks altogether",
          "Screening out objectionable firms is what many values investors want, even at some cost."),
    ],
    kort="<p><b>They hold on while expecting to lag.</b> Values-driven buyers pay for something besides return, so a "
         "somewhat lower expected return does not drive them out.</p>",
    full="<p><b>The survey.</b> Giglio et al. (2025) asked about 30,000 Vanguard clients why they invest in ESG. Ethical "
         "considerations and climate hedging were far more common motives than return expectations. On average "
         "respondents expected ESG to underperform. The lecture's conclusion: demand is driven far more by values "
         "than by expected value.</p>"
         "<p><b>What follows.</b> A values investor gets something besides return from holding ESG funds: acting on "
         "her preferences. She can rationally hold a fund she expects to lag the market. Starks (2023) cites evidence "
         "that ESG investors show a willingness to pay of this kind.</p>"
         "<p><b>Why the others fail.</b> Selling on the first lag, or choosing on past returns, describes value "
         "investors who bought ESG to win. Avoiding screened funds gets values investors backwards: screening is "
         "often what they want.</p>"
         "<p><b>The usual confusion.</b> Assuming every investor wants the highest return. Values investors trade some "
         "return for their preferences.</p>"
         "<p><b>Remember:</b> values-driven demand can survive expected underperformance.</p>",
)

# ---------------------------------------------------------------------------
# Starks (2023): value mot values og spekteret
# ---------------------------------------------------------------------------
statisk(
    "sf-s15", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about Starks' two motives for ESG and how to tell them apart in a case.",
        "Value: ESG matters because it is financially material; it sheds light on risks and return opportunities. "
        "Values: nonpecuniary preferences, such as not wanting to profit from objectionable conduct or wanting to "
        "back firms that reflect one's own values.",
        "<p><b>Step 1: find the stated reason.</b> Is it about return and risk, or about what the founders think is "
        "right?</p>"
        "<p><b>Step 2: ignore the tool.</b> Tilting toward or screening out firms does not decide the motive.</p>",
    ),
    q="<p>The founders of a family office tell its managers to overweight firms that pay all their workers a living "
      "wage. «We think it is the right thing to do,» they say. «We do not expect it to raise our returns and we "
      "accept that it may lower them a little.»</p>"
      "<p>In Starks' (2023) terms, what drives this strategy?</p>",
    alternativer=[
        R("Values: a nonpecuniary preference about how firms treat workers"),
        F("Value: ESG is used as information about risk and return",
          "The founders say they do not expect higher returns. Their reason is not financial."),
        F("Value, since a positive tilt rather than a negative screen is used",
          "The tool does not decide the motive. Tilts and screens can serve either motive."),
        F("Neither, since workers' pay is a governance issue rather than ESG",
          "Pay and conditions for workers are a social issue, the S in ESG."),
    ],
    kort="<p><b>Values.</b> The founders act on what they think is right and accept a lower return for it: a "
         "nonpecuniary preference.</p>",
    full="<p><b>Two motives.</b> Starks (2023) argues that most confusion about ESG comes from mixing two motives. "
         "Value investors use ESG because it is financially material: it sheds light on risks such as reputation, "
         "litigation or human-capital risk and on return opportunities. Values investors have nonpecuniary "
         "preferences: they do not want to profit from objectionable conduct, or they want to back firms that reflect "
         "their values.</p>"
         "<p><b>Here.</b> The founders say the policy is right in itself, do not expect it to pay and accept a slightly "
         "lower return. That is a values motive.</p>"
         "<p><b>The usual confusion.</b> Inferring the motive from the method. Starks notes that values-driven ESG "
         "investors often use positive screening, while value investors can use tilts, integration or exclusions. "
         "The reason, not the tool, decides.</p>"
         "<p><b>Remember:</b> ask why, not how. A financial reason is value; a reason about what is right is "
         "values. Many investors hold both.</p>",
)

statisk(
    "sf-s16", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about whether a negative screen tells you which of Starks' two motives an investor has.",
        "Value: ESG as financially material information about risk and return. Values: nonpecuniary preferences. "
        "Negative screening is the main tool of one group, but Starks notes that it is not confined to that "
        "group.",
        "<p><b>Step 1: find the analysts' reason for the exclusion.</b> Is it about returns or about what they find "
        "objectionable?</p>"
        "<p><b>Step 2: ask whether the tool alone proves anything.</b> Could an investor with the other motive "
        "have made exactly the same exclusion?</p>",
    ),
    q="<p>An insurer's asset manager excludes mining firms with poorly managed tailings dams. Its analysts expect dam "
      "failures to bring clean-up bills and lawsuits that will hit those firms' share prices. A critic says: «The "
      "exclusion proves that the insurer is a values investor.»</p>"
      "<p>Which reply fits Starks (2023)?</p>",
    alternativer=[
        R("Value investors also use negative screens; here the reason is financial"),
        F("The critic is right: excluding stocks is by definition a values strategy",
          "Excluding a stock says nothing by itself about why. The analysts give a reason about risk and return."),
        F("The critic is right, since the insurer gives up return by holding fewer stocks",
          "Nothing in the case says the insurer expects to lose return. It expects the excluded firms to do "
          "badly."),
        F("It is impact investing, since the insurer aims to make the dams safer",
          "Impact investors set out to change environmental or social outcomes. The insurer only avoids a risk to "
          "its portfolio."),
    ],
    kort="<p><b>Value investors also screen.</b> The reason given is clean-up bills and lawsuits: financial risk. "
         "Negative screening is not proof of values.</p>",
    full="<p><b>The mirror trap.</b> Starks (2023) notes that negative screening is the primary technique of values "
         "investors. One might therefore read any exclusion as evidence of values. But value investors can use it "
         "too: if an ESG risk makes a firm a bad bet, dropping it is a risk-and-return decision.</p>"
         "<p><b>Here.</b> The analysts exclude the miners because dam failures will bring costs and lawsuits that "
         "hurt the share price. That is ESG used as financially material information, the value motive.</p>"
         "<p><b>The usual confusion.</b> Classifying by tool. The same exclusion can come from a church fund that "
         "finds mining objectionable (values) or from an insurer that expects losses (value). Only the reason "
         "separates them. Impact investing is different again: it aims to change outcomes, not to avoid them.</p>"
         "<p><b>Remember:</b> negative screening is the main tool of values investors, not proof of values.</p>",
)

statisk(
    "sf-s17", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about the return expectations along Starks' spectrum of investment approaches.",
        "The spectrum runs from impact investing through socially responsible investing and classic ESG investing to "
        "traditional investing. Starks shows typical motives and typical expected returns for each, with large "
        "differences within each approach.",
        "<p><b>Step 1: test each statement on one approach.</b> What does that group typically expect to earn?</p>"
        "<p><b>Step 2: watch for words like «all» and «always».</b> Starks stresses heterogeneity within each "
        "approach.</p>",
    ),
    q="<p>Which statement about expected returns along Starks' (2023) spectrum of investment approaches is "
      "correct?</p>",
    alternativer=[
        R("Impact investors are split: some accept lower returns for impact, others expect market returns"),
        F("All impact investors accept lower returns, since they target outcomes rather than profit",
          "Targeting outcomes does not by itself fix the return an investor expects. «All» is too strong."),
        F("Traditional investors accept lower returns when the firms they hold have high ESG risks",
          "Traditional investors care about risk and return alone. They expect risk-adjusted market returns or "
          "more."),
        F("Socially responsible investors expect to beat the market, since screening removes bad firms",
          "SRI is usually driven by values. Its investors expect returns closer to the market and some accept "
          "less."),
    ],
    kort="<p><b>Impact investors are split.</b> Some accept lower returns for impact; others expect risk-adjusted "
         "market returns. So ESG investing does not imply sacrificing return.</p>",
    full="<p><b>The spectrum.</b> Starks (2023) orders approaches from impact investing (an intentional focus on E or "
         "S outcomes) through socially responsible investing (mainly avoiding firms that conflict with one's values) "
         "and classic ESG investing (a mix of value and values motives) to traditional investing (risk and return "
         "alone). For each she shows the typical expected return, with large differences within each group.</p>"
         "<p><b>Here.</b> For impact investors the range spans from accepting lower returns in exchange for impact to "
         "expecting risk-adjusted market returns. They are not one group.</p>"
         "<p><b>Why the others fail.</b> Traditional investors expect market returns or more. SRI investors expect "
         "returns closer to the market, with some willing to accept less; beating the market is not their typical "
         "expectation.</p>"
         "<p><b>The usual confusion.</b> «ESG means giving up return.» Only part of the spectrum accepts lower "
         "returns. Even impact investors are split.</p>"
         "<p><b>Remember:</b> ESG investing does not imply sacrificing return.</p>",
)

statisk(
    "sf-s18", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about placing an investor on Starks' spectrum from what it sets out to do.",
        "Impact investing: an intentional focus on environmental or social outcomes. Socially responsible investing: "
        "mainly avoiding firms that conflict with one's values. Classic ESG investing: ESG information used for "
        "values or for risk and return. Traditional investing: risk and return alone.",
        "<p><b>Step 1: what is the investor trying to achieve?</b> Avoid something, manage a risk or bring about an "
        "outcome?</p>"
        "<p><b>Step 2: how does it judge success?</b> Look at what it measures each year.</p>",
    ),
    q="<p>A development fund finances water-purification plants in small towns. For each project it sets targets for "
      "how many households gain safe drinking water and checks every year whether they were met. It will accept a "
      "return below the market if needed.</p>"
      "<p>Where does this sit on Starks' (2023) spectrum?</p>",
    alternativer=[
        R("Impact investing"),
        F("Socially responsible investing",
          "SRI mainly avoids firms that conflict with one's values, through negative screening. This fund sets out "
          "to create a result."),
        F("Classic ESG investing",
          "Classic ESG investing uses ESG information to choose or weight firms. It does not set outcome targets "
          "for each investment."),
        F("Traditional investing",
          "Traditional investors care about risk and return alone. This fund accepts a lower return for "
          "something else."),
    ],
    kort="<p><b>Impact investing.</b> The fund intends a specific social outcome and measures whether it happens. "
         "Accepting a lower return fits the impact end of the spectrum.</p>",
    full="<p><b>The defining feature.</b> On Starks' (2023) spectrum, impact investors have an intentional focus on "
         "the environmental or social outcomes of an investment. Starks adds that the social returns rest on "
         "intentionality and additionality: the investor means to cause the outcome and the outcome would not "
         "happen anyway.</p>"
         "<p><b>Here.</b> The fund sets household targets for each project and checks them every year. It is not "
         "avoiding bad firms or managing a risk; it is trying to make something happen. Its willingness to accept a "
         "lower return is common at this end of the spectrum, although some impact investors expect market "
         "returns.</p>"
         "<p><b>The usual confusion.</b> SRI and impact both often involve values. The difference is the aim: SRI "
         "mainly avoids firms that clash with one's values; impact sets out to change outcomes.</p>"
         "<p><b>Remember:</b> outcome targets point to impact investing; exclusion points to SRI.</p>",
)

statisk(
    "sf-s19", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about placing an investor on Starks' spectrum from its main tool, its motive and its return "
        "expectation.",
        "Impact investing: intentional focus on outcomes. SRI: usually nonpecuniary, "
        "avoiding firms that conflict with one's values. Classic ESG investing: ESG information used for values or "
        "for risk and return. Traditional investing: risk and return alone.",
        "<p><b>Step 1: what is the fund's main tool?</b></p>"
        "<p><b>Step 2: why does it use it?</b> A financial reason or a reason about the members' values?</p>"
        "<p><b>Step 3: does it try to change the firms it drops?</b></p>",
    ),
    q="<p>A trade-union pension fund removes firms that break core labour rights from its equity portfolio. It aims "
      "for returns close to the market but will accept slightly less. It sets no targets for changing the firms it "
      "drops.</p>"
      "<p>Where does this fit best on Starks' (2023) spectrum?</p>",
    alternativer=[
        R("Socially responsible investing"),
        F("Impact investing",
          "Impact investing intends specific environmental or social outcomes. The fund sets no targets and simply "
          "drops firms."),
        F("Traditional investing",
          "Traditional investors look only at risk and return. This fund drops firms for what they do and accepts a "
          "slightly lower return."),
        F("Classic ESG investing for risk management",
          "The fund drops firms for breaking labour rights and accepts a lower return for it. That is not a "
          "risk-management reason."),
    ],
    kort="<p><b>Socially responsible investing.</b> A values-driven negative screen, returns close to the market with "
         "some willingness to accept less and no outcome targets.</p>",
    full="<p><b>SRI on the spectrum.</b> Starks (2023) describes socially responsible investing as usually driven by "
         "nonpecuniary preferences. Its main intent is to avoid supporting companies that do not reflect the "
         "investor's values, so negative screening is its primary tool. Its investors typically expect returns close "
         "to risk-adjusted market returns, with some willing to accept lower.</p>"
         "<p><b>Here.</b> The union fund removes firms because they break labour rights, a values reason. It aims for "
         "returns close to the market and accepts slightly less. Every element matches SRI.</p>"
         "<p><b>Why not impact.</b> Impact investors intend outcomes and usually measure them. The fund only stops "
         "owning the firms; it does not try to change them.</p>"
         "<p><b>Why not ESG risk management.</b> A value investor might also exclude, but for a financial reason. "
         "Here the reason is the members' values and the fund accepts a cost for it.</p>"
         "<p><b>Remember:</b> avoid what clashes with your values: SRI. Intend an outcome: impact.</p>",
)

statisk(
    "sf-s20", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about why Starks says studies of the average ESG fund cannot settle whether ESG pays.",
        "Starks: ESG funds differ in objectives. Values funds act on nonpecuniary preferences and may knowingly give "
        "up return. Value funds use ESG to manage risk or find return. Performance cannot be judged until the "
        "motives are separated.",
        "<p><b>Step 1: ask what kinds of funds are in the sample.</b> Do they all try to earn the same thing?</p>"
        "<p><b>Step 2: ask what an average over them can tell you.</b> Does it describe any one type of fund?</p>",
    ),
    q="<p>A newspaper reports that a large sample of ESG funds earned less than the market on average over ten "
      "years. The headline reads: «Study proves ESG destroys value.»</p>"
      "<p>How would Starks (2023) respond?</p>",
    alternativer=[
        R("The sample mixes funds with different motives, so its average describes none of them"),
        F("The study is right, since any ESG screen shrinks the set of stocks a fund can hold",
          "A smaller choice set can explain why some values funds accept lower returns. It does not show that "
          "every ESG approach destroys value."),
        F("The study is wrong, since ESG ratings prove that ESG firms carry less risk",
          "Ratings disagree and mostly assess processes. They cannot prove anything about returns."),
        F("The study is wrong, since ten years is too short to measure fund returns",
          "Starks' objection is not about the length of the sample period."),
    ],
    kort="<p><b>The average describes no one.</b> A values fund may knowingly give up return; a value fund aims to "
         "earn more. Lumping them together cannot say whether ESG pays.</p>",
    full="<p><b>Starks' point.</b> Thousands of studies ask whether ESG or SRI funds outperform, with mixed results. "
         "Starks (2023) argues that many samples are an amalgam of funds with different objectives and approaches. "
         "Some screen on religious values and may accept lower returns. Others integrate ESG to manage risk and aim "
         "to earn more. There is no basis to expect them to perform alike.</p>"
         "<p><b>Here.</b> The headline treats one average as a verdict on ESG. If the sample is full of values funds "
         "that chose to give up some return, the average would lag even if every value fund met its aim.</p>"
         "<p><b>The usual confusion.</b> Reading the result either way: «ESG destroys value» or «ESG beats the "
         "market». Both make the same mistake of averaging over different motives. The same split explains why ESG "
         "ratings can disappoint values investors.</p>"
         "<p><b>Remember:</b> separate value and values before judging whether ESG pays.</p>",
)

statisk(
    "sf-s21", tema="sf", type="fakta",
    hjelp=hjelp3(
        "This is about Starks' distinction between a firm's business processes and the outcomes of those processes.",
        "Starks: some investors care most about firms' business processes, especially risk management. Others care "
        "most about the effects of the firm's decisions on the environment and its communities. Ask which group most "
        "rating services are built for.",
        "<p><b>Step 1: what did the oil producer score well on?</b> Was it how much it emits, or how it runs "
        "the firm?</p>"
        "<p><b>Step 2: which kind of investor wants that information?</b> Then ask whether the charity is that kind "
        "of investor.</p>",
    ),
    q="<p>A climate charity is puzzled that an oil producer with very large emissions gets a high ESG rating, mainly "
      "for its well-documented risk management systems.</p>"
      "<p>What explanation does Starks (2023) offer for this kind of mismatch?</p>",
    alternativer=[
        R("Most ratings are built for value investors and assess processes, not outcomes"),
        F("Most ratings are built for values investors, who care most about risk processes",
          "This pairs the group with the wrong concern: values investors care most about effects on the "
          "environment and communities."),
        F("Ratings measure outcomes, so the oil producer's emissions must in fact be low",
          "The case says the emissions are very large. A high score despite them shows the rating is not measuring "
          "them."),
        F("Raters are paid by the firms they rate, so they inflate scores across the board",
          "That is not the explanation Starks gives. Nothing in the case points to a conflict of interest."),
    ],
    kort="<p><b>Ratings assess processes.</b> Most are designed for value investors, who want to know how well risks "
         "are managed. Values investors care about outcomes such as emissions.</p>",
    full="<p><b>Processes against outcomes.</b> Starks (2023) separates two things an ESG assessment can look at. "
         "Value investors, who use ESG to understand firm risk, care most about business processes, especially risk "
         "management. Most rating services are designed for them. Values investors, impact investors among them, care "
         "most about outcomes: what the firm's activities do to the environment and its communities.</p>"
         "<p><b>Here.</b> The oil producer manages its risks well, so a process-based rating scores it highly. The "
         "charity cares about the outcome, the emissions, which the rating does not mainly measure. The mismatch is "
         "built in.</p>"
         "<p><b>The usual confusion.</b> Assuming a high ESG score means a small footprint. It may only mean the firm "
         "is well run in the eyes of a value investor. This is one reason ESG ratings can disappoint. Lecture 7 "
         "shows how much raters also disagree.</p>"
         "<p><b>Remember:</b> ask what a rating measures and for whom: processes for value investors, outcomes for "
         "values investors.</p>",
)

statisk(
    "sf-s22", tema="sf", type="fakta",
    hjelp=hjelp3(
        "This is about the argument Starks reports for why values-based portfolios may earn less.",
        "Starks: a values approach tends to rely on some form of negative screening. Think about what screening does "
        "to the set of investments the portfolio can choose from.",
        "<p><b>Step 1: what does a negative screen remove?</b></p>"
        "<p><b>Step 2: what happens to the best portfolio you can build when some assets are off limits?</b> Compare "
        "it with the best portfolio when every asset is allowed.</p>",
    ),
    q="<p>According to Starks (2023), why do many argue that a values-based ESG portfolio cannot be expected to beat a "
      "conventional portfolio?</p>",
    alternativer=[
        R("Screening shrinks the opportunity set, making it a constrained optimisation"),
        F("Values investors pay higher fees, which always eat up any extra return",
          "Fees play no part in the argument Starks reports."),
        F("Firms that match investors' values always carry higher betas",
          "Beta plays no part in the argument. «Always» is also far too strong."),
        F("Values investors hold too few bonds, which makes their portfolios riskier",
          "The argument is not about the mix of asset classes."),
    ],
    kort="<p><b>A smaller opportunity set.</b> Negative screening removes assets, so the portfolio is optimised under a "
         "constraint and cannot be expected to beat the unconstrained one.</p>",
    full="<p><b>The argument.</b> Starks (2023) notes that a values approach tends to rely on negative screening. An "
         "investor who screens faces a smaller investment opportunity set. Choosing the best portfolio from fewer "
         "assets is a constrained optimisation. A constrained optimum cannot beat the unconstrained one in "
         "expectation. Hence many argue that values portfolios cannot be expected to outperform.</p>"
         "<p><b>The link to lecture 1.</b> This is the cost behind the foil's «sometimes less diversification for "
         "good reasons», such as avoiding sin stocks. Values investors may accept it knowingly.</p>"
         "<p><b>The other side.</b> Starks contrasts it with the value view: if ESG helps manage risk or reveals return "
         "opportunities, expected returns need not suffer and could even improve. That is why the average ESG fund "
         "settles nothing.</p>"
         "<p><b>The usual confusion.</b> Explaining lower returns by fees or risk. The argument is purely about the "
         "choice set.</p>"
         "<p><b>Remember:</b> fewer assets to choose from means a constrained optimum.</p>",
)

# ---------------------------------------------------------------------------
# Schoenmaker og Schramade: fra finance as usual til SF 3.0
# ---------------------------------------------------------------------------
SS_REGEL = ("Finance as usual: maximise F. Next rung: maximise F subject to S and E (refined shareholder value). Next: "
            "optimise integrated value I = F + S + E (stakeholder value). Top rung: optimise S and E subject to F "
            "(common good value).")

statisk(
    "sf-s23", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about placing an objective on Schoenmaker and Schramade's ladder from finance as usual upwards.",
        SS_REGEL,
        "<p><b>Step 1: what does the bank maximise?</b></p>"
        "<p><b>Step 2: what role do S and E play?</b> Are they weighed against profit, ranked above it or only set "
        "as a fixed limit?</p>",
    ),
    q="<p>A bank sets its lending policy to maximise profit, with one rule added: it will not lend to firms that use "
      "child labour or make cluster munitions.</p>"
      "<p>Where does this policy sit in Schoenmaker and Schramade's framework?</p>",
    alternativer=[
        R("SF 1.0: maximise F, with S and E as constraints"),
        F("SF 2.0: optimise F, S and E together",
          "The bank does not trade profit against social value; it maximises profit inside a fixed rule."),
        F("SF 3.0: optimise S and E, subject to enough F",
          "Profit is the objective here, not the floor. The ranking is the other way round."),
        F("Finance as usual: maximise F and nothing else",
          "The exclusion rule limits the profit objective, so this is not F alone."),
    ],
    kort="<p><b>SF 1.0.</b> Profit is still maximised; the exclusions are constraints on it. That is refined "
         "shareholder value.</p>",
    full="<p><b>The ladder.</b> Schoenmaker and Schramade classify finance by the value it creates. Finance as usual "
         "maximises financial value F. SF 1.0 maximises F subject to S and E: refined shareholder value, with F "
         "ranked far above S and E. SF 2.0 optimises integrated value I = F + S + E. SF 3.0 optimises S and E "
         "subject to F.</p>"
         "<p><b>Here.</b> The bank keeps profit as its goal and adds a rule that removes the worst borrowers. S and E "
         "enter only as minor constraints, such as excluding the worst offenders. That is SF 1.0.</p>"
         "<p><b>The usual confusion.</b> Thinking that any social rule moves a firm far up the ladder. The likely "
         "exam trap is that SF 1.0 is still profit maximisation, only with constraints. Only when S and E are weighed "
         "against F unit for unit (SF 2.0) or ranked above it (SF 3.0) does the objective change.</p>"
         "<p><b>Remember:</b> exclusions on top of profit maximisation are SF 1.0. Lecture 9 maps exclusionary "
         "screening to SF 1.0.</p>",
)

statisk(
    "sf-s24", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about the content of Schoenmaker and Schramade's table: ranking, objective and horizon.",
        SS_REGEL + " The horizon runs from short term for the lower rungs to long term at the top.",
        "<p><b>Step 1: check each statement's ranking of F against S and E.</b></p>"
        "<p><b>Step 2: check its horizon.</b> Does it lengthen or shorten as you climb the ladder? Strike every "
        "statement that fails either test.</p>",
    ),
    q="<p>Which statement about Schoenmaker and Schramade's framework is correct?</p>",
    alternativer=[
        R("SF 2.0 counts a unit of S or E the same as a unit of F"),
        F("SF 1.0 ranks S and E above F, but only in the short term",
          "Under SF 1.0, F ranks far above S and E. They enter only as constraints."),
        F("SF 3.0 ignores F and counts only social and environmental value",
          "SF 3.0 optimises S and E subject to F. The investment must still earn enough."),
        F("The horizon shortens as you move from finance as usual to SF 3.0",
          "The horizon lengthens: short term at the bottom of the ladder, long term at SF 3.0."),
    ],
    kort="<p><b>SF 2.0 weighs S and E like F.</b> It optimises I = F + S + E, so a less profitable project can win "
         "if it creates more S and E.</p>",
    full="<p><b>The table.</b> Finance as usual creates shareholder value and maximises F over the short term. SF 1.0 "
         "creates refined shareholder value: max F subject to S and E, still short term. SF 2.0 creates stakeholder "
         "value, the triple bottom line: it optimises I = F + S + E over the medium term. SF 3.0 creates common good "
         "value: it optimises S and E subject to F over the long term.</p>"
         "<p><b>Here.</b> Because SF 2.0 adds the three values, one unit of S or E counts like one unit of F. A "
         "project with less profit can win if it creates more S and E.</p>"
         "<p><b>Why the others fail.</b> SF 1.0 keeps F on top. SF 3.0 still requires enough F. The horizon gets "
         "longer, not shorter, as you climb.</p>"
         "<p><b>The usual confusion.</b> Reading SF 3.0 as «profit no longer matters». It mirrors SF 1.0: there F is "
         "the goal and S and E the limits; at SF 3.0 the roles are reversed.</p>"
         "<p><b>Remember:</b> SF 2.0 means equal weights in I = F + S + E.</p>",
)

statisk(
    "sf-s25", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about placing two mandates on Schoenmaker and Schramade's ladder by what each maximises and what "
        "each treats as a limit.",
        SS_REGEL,
        "<p><b>Step 1: for each mandate, name the objective.</b> Return or social benefit?</p>"
        "<p><b>Step 2: name the constraint.</b> A screen on S and E, or a floor on F?</p>"
        "<p><b>Step 3: match each pair to a rung.</b></p>",
    ),
    q="<p>Two investment mandates. Mandate X: maximise return, but hold no firms that fail a human-rights screen. "
      "Mandate Y: choose the projects with the largest social benefit, as long as each one preserves the capital "
      "invested.</p>"
      "<p>How do they fit Schoenmaker and Schramade's framework?</p>",
    alternativer=[
        R("X is SF 1.0 and Y is SF 3.0"),
        F("X is SF 2.0 and Y is SF 3.0",
          "X does not weigh F against S and E; it maximises F inside a fixed screen."),
        F("X is SF 1.0 and Y is SF 2.0",
          "Y does not add F, S and E with equal weight. It puts social benefit first and treats F as a floor."),
        F("X is SF 3.0 and Y is SF 1.0",
          "The two are swapped. X keeps return as its goal; Y keeps return only as a floor."),
    ],
    kort="<p><b>X is SF 1.0, Y is SF 3.0.</b> X maximises F subject to S and E. Y maximises S subject to F. The two "
         "mirror each other.</p>",
    full="<p><b>Two mirror images.</b> SF 1.0 maximises financial value F, with social and environmental value as "
         "constraints. SF 3.0 turns this round: it optimises S and E, subject to earning enough F. In between, SF 2.0 "
         "adds the three into integrated value I = F + S + E and optimises the sum.</p>"
         "<p><b>Mandate X.</b> Return is the goal; the human-rights screen is a constraint. SF 1.0.</p>"
         "<p><b>Mandate Y.</b> Social benefit is the goal; preserving capital is the financial floor. SF 3.0. Lecture 9 "
         "maps impact investing to this rung.</p>"
         "<p><b>The usual confusion.</b> Placing any mandate that cares about S somewhere in the middle. The test is "
         "which value is maximised and which one is only a limit. If neither is a limit and the values are added, it "
         "is SF 2.0.</p>"
         "<p><b>Remember:</b> max F subject to S and E is SF 1.0; max S and E subject to F is SF 3.0.</p>",
)

statisk(
    "sf-s26", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about the course's mapping of investment strategies onto Schoenmaker and Schramade's ladder.",
        SS_REGEL + " The course maps exclusionary screening, ESG integration and impact investing onto the three "
        "rungs above finance as usual.",
        "<p><b>Step 1: what does the manager do with S and E?</b> Exclude on them, add them to F or put them "
        "first?</p>"
        "<p><b>Step 2: does it give up expected return for them?</b> Then match the strategy to its rung.</p>",
    ),
    q="<p>An asset manager builds estimates of each firm's social and environmental value into its valuation models "
      "next to financial value. It buys the firms with the highest combined value, even when another firm offers a "
      "higher expected return.</p>"
      "<p>In the course's mapping of strategies onto Schoenmaker and Schramade's framework, which strategy and level "
      "is this?</p>",
    alternativer=[
        R("ESG integration, at SF 2.0"),
        F("Exclusionary screening, at SF 1.0",
          "No firm is excluded. Every firm is valued and S and E are weighed against F."),
        F("Impact investing, at SF 3.0",
          "Impact investing puts S and E first and treats F as a floor. Here the three are combined."),
        F("ESG integration, at SF 1.0",
          "The manager accepts a lower expected return for more S and E. At SF 1.0, F would still be "
          "maximised."),
    ],
    kort="<p><b>ESG integration at SF 2.0.</b> S and E enter the valuation next to F and the manager optimises the "
         "combined value, as in I = F + S + E.</p>",
    full="<p><b>The mapping.</b> The course links the ladder to portfolio strategies (lectures 1 and 9). Exclusionary "
         "screening is SF 1.0: maximise F, drop the worst. ESG integration is SF 2.0: bring S and E into the analysis "
         "next to F and optimise the total. Impact investing is SF 3.0: pursue S and E, subject to enough F.</p>"
         "<p><b>Here.</b> The manager puts social and environmental value into its models and ranks firms on the "
         "combined figure, even at the cost of expected return. That is optimising integrated value, SF 2.0.</p>"
         "<p><b>The usual confusion.</b> «ESG integration» in practice often means using ESG data only to improve "
         "return, which would leave F as the objective. What decides the rung here is that the manager accepts a "
         "lower F for more S and E.</p>"
         "<p><b>Remember:</b> exclusion is SF 1.0, integration SF 2.0, impact SF 3.0.</p>",
)

statisk(
    "sf-s27", tema="sf", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the concept chain and about what most ESG ratings actually assess.",
        "Concept chain: firms act through CSR, investors through SRI, ESG metrics measure the outcomes. Starks "
        "separates a firm's business processes, such as risk management, from the outcomes of those processes for "
        "the environment and communities.",
        "<p><b>Step 1: check statement I against the chain.</b> Which items are actions and which is "
        "measurement?</p>"
        "<p><b>Step 2: check statement II.</b> Which of the two things in Starks' distinction do most rating services "
        "mainly examine? For which investors are they built?</p>",
    ),
    q="<p>Consider two statements.</p>"
      "<p>I. CSR and SRI are actions, while ESG metrics try to measure their outcomes.</p>"
      "<p>II. Most ESG ratings mainly measure what firms' activities do to the environment and to the communities "
      "they operate in.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II describes what values investors want ratings to measure, not what most ratings "
          "assess."),
        F("Both I and II",
          "Statement II describes what values investors want ratings to measure, not what most ratings "
          "assess."),
        F("Neither I nor II",
          "Ask how the lecture's chain sorts CSR, SRI and ESG into what people do and what raters measure."),
    ],
    kort="<p><b>Only I.</b> CSR and SRI are actions; ESG is measurement. But most ratings are built for value investors "
         "and assess business processes such as risk management, not outcomes.</p>",
    full="<p><b>Statement I.</b> True. This is the lecture's own summary of the chain. Stakeholder management is put into "
         "practice through CSR (firms) and SRI (investors). ESG metrics try to measure the resulting stakeholder "
         "welfare.</p>"
         "<p><b>Statement II.</b> False. Starks (2023) separates processes from outcomes. Value investors, who use ESG "
         "to understand firm risk, care most about business processes, especially risk management. Most rating "
         "services are designed for them and mainly examine firm risks. Values investors care most about outcomes for "
         "the environment and communities, which most ratings do not mainly measure.</p>"
         "<p><b>Why it matters.</b> This is why a firm with large emissions but good risk management can score well. "
         "It is also why ratings can disappoint values investors.</p>"
         "<p><b>The usual confusion.</b> Assuming that a measure of «ESG» measures the impact the firm has. The "
         "measurement step is where most empirical difficulties arise.</p>"
         "<p><b>Remember:</b> ESG is measurement; most ratings measure processes for value investors.</p>",
)

statisk(
    "sf-s28", tema="sf", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what each rung of Schoenmaker and Schramade's ladder optimises and what it treats as a "
        "constraint.",
        SS_REGEL,
        "<p><b>Step 1: statement I.</b> At the first rung above finance as usual, which value is the objective and "
        "which are limits?</p>"
        "<p><b>Step 2: statement II.</b> At the top rung, which value is the objective and which is the limit?</p>",
    ),
    q="<p>Consider two statements about Schoenmaker and Schramade's framework.</p>"
      "<p>I. Under SF 1.0, social and environmental value enter only as constraints on maximising financial value.</p>"
      "<p>II. Under SF 3.0, financial value enters only as a constraint on optimising social and environmental "
      "value.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        F("Only I",
          "Ask whether the top rung drops financial value altogether or keeps it in some role."),
        F("Only II",
          "Ask what a fund that maximises return but excludes the worst offenders is still trying to "
          "maximise."),
        R("Both I and II"),
        F("Neither I nor II",
          "Ask which value is maximised and which is only a limit at each end of the ladder."),
    ],
    kort="<p><b>Both.</b> SF 1.0 maximises F subject to S and E. SF 3.0 is its mirror image: it optimises S and E "
         "subject to F. In between, SF 2.0 optimises I = F + S + E.</p>",
    full="<p><b>Statement I.</b> True. It is also the likely exam trap. SF 1.0 creates refined shareholder value: max F subject "
         "to S and E. F ranks far above S and E, which enter only as minor constraints, such as excluding the worst "
         "offenders. It is still profit maximisation.</p>"
         "<p><b>Statement II.</b> True. SF 3.0 creates common good value: it optimises S and E subject to F. Financial "
         "return does not disappear; the investment must still earn enough. The roles of SF 1.0 are simply "
         "reversed.</p>"
         "<p><b>The rung in between.</b> SF 2.0 has no constraint of this kind: it adds the three into integrated "
         "value I = F + S + E and optimises the sum, so a unit of S or E counts like a unit of F.</p>"
         "<p><b>The usual confusion.</b> Reading SF 3.0 as «profit no longer matters», or SF 1.0 as already putting S "
         "and E first.</p>"
         "<p><b>Remember:</b> SF 1.0 and SF 3.0 are mirror images: the objective at one end is the constraint at the "
         "other.</p>",
)

statisk(
    "sf-s29", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an investor's motives in Starks' framework when it uses more than one tool.",
        "Value: ESG as financially material information about risk and return. Values: nonpecuniary preferences. "
        "Starks notes that many investors hold both.",
        "<p><b>Step 1: take each policy separately.</b> What reason do the trustees give for it?</p>"
        "<p><b>Step 2: classify each reason.</b> A financial reason and a reason about what is objectionable "
        "belong to different motives. Then ask whether one label must cover the whole endowment.</p>",
    ),
    q="<p>A university endowment excludes tobacco firms because its trustees find the product objectionable. It also "
      "tilts the rest of its portfolio toward firms with low exposure to climate regulation, because the trustees "
      "expect that to protect returns.</p>"
      "<p>How does Starks' (2023) framework classify the endowment's motives?</p>",
    alternativer=[
        R("Both: values behind the exclusion and value behind the climate tilt"),
        F("Values only, since any exclusion reveals a nonpecuniary preference",
          "Exclusion is not proof of values. The climate tilt is justified by returns."),
        F("Value only, since the climate tilt is meant to protect returns",
          "The tobacco exclusion is justified by finding the product objectionable, not by returns."),
        F("Impact investing, since the endowment targets climate outcomes",
          "The endowment sets no outcome targets. It avoids a product and manages a risk."),
    ],
    kort="<p><b>Both.</b> The tobacco exclusion rests on a nonpecuniary preference (values); the climate tilt rests on "
         "expected returns (value). Many investors hold both.</p>",
    full="<p><b>Two motives can coexist.</b> Starks (2023) separates value (ESG as financially material) from values "
         "(nonpecuniary preferences) and notes that ESG investing can be motivated by a combination. Her spectrum "
         "puts «classic» ESG investing in the overlap.</p>"
         "<p><b>Here.</b> The trustees give two reasons for two policies. Tobacco is excluded because they find it "
         "objectionable: values. The climate tilt is meant to protect returns from regulation: value.</p>"
         "<p><b>The usual confusion.</b> Forcing one label on the whole investor, or classifying by tool. The "
         "exclusion is values here because of the trustees' reason, not because it is an exclusion. A different "
         "investor could exclude tobacco for fear of litigation.</p>"
         "<p><b>Why it matters.</b> Mixed motives are one reason studies of «ESG funds» are hard to read. The same "
         "fund pursues return and something else.</p>"
         "<p><b>Remember:</b> classify each decision by its reason; many investors hold both motives.</p>",
)

statisk(
    "sf-s30", tema="sf", type="paastand",
    hjelp=hjelp3(
        "This is about the two directions of double materiality and whom each one speaks to.",
        "Financial materiality: outside-in, how sustainability issues affect the firm. Impact materiality: "
        "inside-out, how the firm affects people and planet. The lecture's table also lists a primary audience for "
        "each.",
        "<p><b>Step 1: check each statement's direction.</b> Outside-in or inside-out?</p>"
        "<p><b>Step 2: check its audience.</b> Who mainly needs this information: investors only, or a wider "
        "group? Strike any statement that fails either test.</p>",
    ),
    q="<p>Which statement about double materiality, as lecture 1 presents it, is correct?</p>",
    alternativer=[
        R("Financial materiality is outside-in and speaks mainly to investors"),
        F("Financial materiality is inside-out and speaks mainly to investors",
          "The direction is reversed. Inside-out is how the firm affects people and planet."),
        F("Impact materiality is outside-in and speaks mainly to civil society",
          "The direction is reversed. Outside-in is how sustainability issues affect the firm."),
        F("Impact materiality speaks only to consumers, so investors can ignore it",
          "Impact materiality speaks to a wide audience that includes investors. An impact can also become "
          "financially material later."),
    ],
    kort="<p><b>Financial materiality is outside-in, for investors.</b> It asks how sustainability issues affect the "
         "firm. Impact materiality is inside-out and speaks to consumers, civil society, employees and investors.</p>",
    full="<p><b>The two sides.</b> Lecture 1 introduces double materiality with a climate example. Financial "
         "materiality is outside-in: climate change hits the company. Its primary audience is investors, who want to "
         "know how sustainability affects cash flows and risk. Impact materiality is inside-out: the company's "
         "activities affect the climate. Its audience is wider: consumers, civil society, employees and investors.</p>"
         "<p><b>Why investors care about both.</b> The two are linked. An impact can become financially material once "
         "regulation or customers make the firm pay for the harm, so an investor who ignores impacts may miss "
         "tomorrow's risks.</p>"
         "<p><b>The usual confusion.</b> Swapping the directions. Picture the arrow: from the world into the firm is "
         "financial; from the firm out to the world is impact.</p>"
         "<p><b>Remember:</b> outside-in, financial, investors; inside-out, impact, a wider audience. Lectures 6 and "
         "7 build on this.</p>",
)
