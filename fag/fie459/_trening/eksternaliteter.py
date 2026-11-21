# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: eksternaliteter (tema «eksternaliteter», forelesning 3).

   Statiske spørsmål ext-s01 … ext-s32: definisjonen (og hva som ikke er en
   eksternalitet), 2×2-en, retningen på pris og mengde, tofirmaeksempelet,
   den utvidede produktfunksjonen, Velsicol, internalisering og kanalene,
   Unerman-stigen, de tre begrensningene med studiene (Bartram, Hou og Kim;
   Duchin, Gao og Xu; Leippold, Sautner og Yu; Shell), integrert verdi og
   strandede eiendeler, usikkerhet, scenarioanalyse og stresstest og Air
   France-KLM.

   Kilder: fag/fie459/_fragmenter/k3.html, foilteksten til forelesning 3
   (FIE459_H26_3_Externalities.txt), Unerman-figuren (foil 19, lest som bilde)
   og docs/fie459-forfatterspek.md § 5 (k3).
"""
from trening_lib import *  # noqa: F401,F403

DEF = ("An externality is a positive or negative effect on agents not involved in the production or consumption of the "
       "product. A cost borne by the producer or by its own customers is not one.")
TOXT = ("The lecture's 2×2 crosses production or consumption with negative or positive: pollution, smoking, R&amp;D and "
        "vaccines are its four examples. Ask where the effect comes from and whether it helps or harms.")
UNERMAN = ("Unerman, Bebbington and O'Dwyer: a spectrum from externalised to internalised. It runs from no financial "
           "internalisation, through recognising risks and opportunities as values and science change, voluntary "
           "initiatives and mandatory internalisation of part of the impact, to full internalisation.")
GRENSER = ("Lecture 3 names three limitations to internalisation. One: firms can shift production to regions with weaker "
           "rules. Two: outsiders cannot verify how green a firm really is. Three: policy uncertainty and lobbying "
           "slow policy down.")

# ---------------------------------------------------------------------------
# Hva en eksternalitet er
# ---------------------------------------------------------------------------
statisk(
    "ext-s01", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the definition of an externality: who must bear an effect for it to count.",
        "An externality is a positive or negative effect on agents not involved in the production or consumption of "
        "the product or service.",
        "<p><b>Step 1: who bears each cost?</b> Place the sick customers and the fined dairy relative to the "
        "transaction.</p>"
        "<p><b>Step 2: is anyone outside the deal affected?</b> Only an effect on an outsider counts.</p>",
    ),
    q="<p>A dairy sells yoghurt contaminated with bacteria. Customers who ate it fall ill. The food authority fines the "
      "dairy.</p>"
      "<p>Which statement fits lecture 3's definition of an externality?</p>",
    alternativer=[
        R("Neither is an externality: both costs fall on parties to the transaction itself"),
        F("Both are negative externalities, since both are costs caused by the dairy",
          "Being caused by the dairy is not enough. The effect must land on someone outside the transaction."),
        F("The illness is a negative consumption externality, since it comes from eating",
          "The people who fall ill are the dairy's own customers. They are inside the transaction."),
        F("The fine is a negative production externality, since it is imposed from outside",
          "The fine is a cost to the dairy, the producer itself. It makes the firm pay; it does not harm an "
          "outsider."),
    ],
    kort="<p><b>Neither is an externality.</b> The customers and the dairy are both parties to the sale. An "
         "externality lands on someone who neither makes nor buys the product.</p>",
    full="<p><b>The definition.</b> Lecture 3 defines an externality as a positive or negative effect on agents not "
         "involved in the production or consumption of the product or service. The price leaves the effect out "
         "because nobody in the deal bears it.</p>"
         "<p><b>Here.</b> The sick customers bought and ate the yoghurt: they are on the consumption side of the deal. "
         "The fine falls on the dairy, the producer. Both costs stay inside the transaction, so neither is an "
         "externality. The customers can sue or stop buying; the fine is already a cost to the firm.</p>"
         "<p><b>The usual confusion.</b> Calling every harm an externality. Compare the Velsicol case: people who drank "
         "polluted water neither made nor bought the pesticides, so the harm to them is an externality.</p>"
         "<p><b>Remember:</b> an externality falls outside the transaction. A cost the firm or its own customers bear "
         "is not one.</p>",
)

statisk(
    "ext-s02", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an externality in the lecture's 2×2.",
        TOXT,
        "<p><b>Step 1: does the effect come from making a product or from using one?</b></p>"
        "<p><b>Step 2: does it help or harm the people outside the deal?</b> Check also whether anyone pays them "
        "for the effect.</p>",
    ),
    q="<p>Households that heat their homes with wood stoves emit fine particles that harm their neighbours' lungs.</p>"
      "<p>Where does this belong in lecture 3's 2×2 of externalities?</p>",
    alternativer=[
        R("Negative consumption externality"),
        F("Negative production externality",
          "The households are not producing anything for sale. The harm comes from using a product."),
        F("Positive consumption externality",
          "The neighbours are harmed, not helped."),
        F("Not an externality",
          "The neighbours neither sell nor burn the firewood, yet their lungs are harmed. They are outside the "
          "deal."),
    ],
    kort="<p><b>Negative consumption externality.</b> The harm comes from using a product and falls on neighbours "
         "outside any deal, like the lecture's smoking example.</p>",
    full="<p><b>The 2×2.</b> Lecture 3 sorts externalities by two questions. Where does the effect come from: making "
         "the product (production) or using it (consumption)? Is it good or bad for outsiders (positive or "
         "negative)? The lecture's examples: pollution (negative production), smoking (negative consumption), R&amp;D "
         "(positive production) and vaccines (positive consumption).</p>"
         "<p><b>Here.</b> The particles come from households burning wood to heat their homes, which is consumption. "
         "They harm neighbours who are not part of any transaction, so the effect is negative.</p>"
         "<p><b>The usual confusion.</b> Treating any smoke as pollution from production. A cement plant's smoke is "
         "production; a household's stove smoke is consumption. The same kind of harm can sit in different cells.</p>"
         "<p><b>Remember:</b> ask who generates the effect (a producer or a user) and whether it helps or harms "
         "outsiders.</p>",
)

statisk(
    "ext-s03", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an externality in the lecture's 2×2.",
        TOXT,
        "<p><b>Step 1: whose activity creates the effect?</b> A firm making something, or people using "
        "something?</p>"
        "<p><b>Step 2: are the others on the road better or worse off?</b> And do they pay for it?</p>",
    ),
    q="<p>Commuters who switch from cars to bicycles reduce congestion and exhaust for everyone else on the road. Nobody "
      "pays them for it.</p>"
      "<p>Where does this belong in lecture 3's 2×2 of externalities?</p>",
    alternativer=[
        R("Positive consumption externality"),
        F("Positive production externality",
          "The commuters are not producing a good for sale. The benefit comes from how they travel."),
        F("Negative consumption externality",
          "Others on the road gain from less congestion and exhaust. The effect is not a harm."),
        F("Not an externality",
          "People outside the commuters' choice gain without paying. That meets the definition."),
    ],
    kort="<p><b>Positive consumption externality.</b> The benefit comes from how people use transport and lands on "
         "others who do not pay for it, like the lecture's vaccine example.</p>",
    full="<p><b>The cell.</b> A positive consumption externality is a benefit to outsiders that comes from using a "
         "product. The lecture's example is vaccines: being vaccinated also protects people who are not.</p>"
         "<p><b>Here.</b> The commuters choose how to travel. Their choice gives drivers less congestion and "
         "pedestrians cleaner air. Those people are outside the choice and pay nothing for the gain, so it is a "
         "positive consumption externality.</p>"
         "<p><b>What follows.</b> Because the commuters are not paid for the benefit they give others, the market "
         "tends to deliver too little of such behaviour. This mirrors the negative case, where the market makes too "
         "much.</p>"
         "<p><b>The usual confusion.</b> Missing that externalities can be positive. Lecture 3 defines them as positive "
         "or negative effects on outsiders.</p>"
         "<p><b>Remember:</b> a user's choice that helps outsiders for free is a positive consumption "
         "externality.</p>",
)

statisk(
    "ext-s04", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an externality in the lecture's 2×2.",
        TOXT,
        "<p><b>Step 1: whose activity creates the benefit?</b> The shipyard as a producer, or someone using a "
        "product?</p>"
        "<p><b>Step 2: who gains without paying?</b> Check whether they are part of the shipyard's deals.</p>",
    ),
    q="<p>A shipyard trains its welders to a high standard at its own cost. Many later move to rival yards, which "
      "benefit from the skills without paying anything for the training.</p>"
      "<p>How is this best classified?</p>",
    alternativer=[
        R("A positive production externality"),
        F("A negative production externality",
          "The rivals gain, so the effect on them is positive. The training cost is the shipyard's own cost, not an "
          "external one."),
        F("A positive consumption externality",
          "The training is part of how the shipyard produces. The benefit flows from production."),
        F("Not an externality",
          "The rival yards gain from training they did not pay for. They are outside the shipyard's deal."),
    ],
    kort="<p><b>A positive production externality.</b> Like R&amp;D, the training is part of production and benefits "
         "outsiders, the rival yards, for free.</p>",
    full="<p><b>The cell.</b> A positive production externality is a benefit to outsiders that comes from producing. "
         "The lecture's example is R&amp;D: knowledge one firm creates spills over to others who did not pay for "
         "it.</p>"
         "<p><b>Here.</b> The shipyard pays to train welders as part of how it produces. When the welders move, rival "
         "yards get the skills free. They are not part of the shipyard's training decision or its costs, so the "
         "benefit is external and positive.</p>"
         "<p><b>What follows.</b> The shipyard bears the whole cost but gets only part of the benefit. Like R&amp;D, "
         "training of this kind will tend to be under-supplied by the market.</p>"
         "<p><b>The usual confusion.</b> Calling it negative because the shipyard loses out. The shipyard's cost is a "
         "private cost. The externality is the free gain to the rivals.</p>"
         "<p><b>Remember:</b> production that benefits outsiders for free is a positive production "
         "externality.</p>",
)

statisk(
    "ext-s05", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the direction of the market's mistake when an externality is positive.",
        "A producer decides by its own costs and benefits. With a negative externality, others bear part of the cost. "
        "With a positive one, others receive part of the benefit. Ask how each case shifts what the producer chooses.",
        "<p><b>Step 1: who gets the benefit of the research?</b> The firm, or also others?</p>"
        "<p><b>Step 2: does the firm count the benefit to others when it decides how much to do?</b> Then compare its "
        "choice with what society would want.</p>",
    ),
    q="<p>A biotech firm's research creates knowledge that other firms use freely. The firm decides how much research "
      "to do by weighing only its own costs and its own gains.</p>"
      "<p>Compared with the social optimum, how much research does the free market produce?</p>",
    alternativer=[
        R("Too little, because the firm is not paid for the benefit to others"),
        F("Too much, because the free use by rivals pushes up demand for research",
          "Rivals use the knowledge without paying, so they add nothing to the firm's reward for doing it."),
        F("The optimal amount, because the knowledge ends up being used anyway",
          "The question is how much research gets done in the first place, not whether results are used."),
        F("Too little, because research harms rivals and so is held back",
          "The rivals benefit from the knowledge. The effect on them is positive, not a harm."),
    ],
    kort="<p><b>Too little.</b> Part of the benefit goes to others for free, so the firm stops short of the level "
         "that would be best for society.</p>",
    full="<p><b>The logic.</b> A firm weighs its own costs against its own benefits. With a negative externality it "
         "ignores costs that fall on others, so the market makes too much. With a positive externality it ignores "
         "benefits that go to others, so the market makes too little. The lecture draws the negative case; the "
         "positive one follows by the same logic (general background, not from the lecture).</p>"
         "<p><b>Here.</b> The biotech firm's research helps other firms, which pay nothing. The firm counts only its "
         "own gain, so it does less research than society would want.</p>"
         "<p><b>The usual confusion.</b> Assuming every externality means overproduction. The direction depends on the "
         "sign: negative means too much, positive means too little.</p>"
         "<p><b>Remember:</b> nobody is paid for a positive externality, so the market under-supplies it.</p>",
)

# ---------------------------------------------------------------------------
# Markedet lager for mye: diagrammet og tofirmaeksempelet
# ---------------------------------------------------------------------------
statisk(
    "ext-s06", tema="eksternaliteter", type="paastand",
    hjelp=hjelp3(
        "This is about the lecture's supply and demand diagram for a negative production externality.",
        "Supply is the marginal production cost (MPC). With a negative production externality the marginal societal "
        "cost (MSC) lies above it. The market settles where demand meets MPC; the social optimum is where demand "
        "meets MSC.",
        "<p><b>Step 1: which quantity is larger, the market's or the optimum's?</b></p>"
        "<p><b>Step 2: for a unit in between, compare two heights.</b> What buyers will pay for it (demand) against "
        "what it costs society (MSC).</p>",
    ),
    q="<p>In lecture 3's diagram of a negative production externality, the market produces Q<sub>e</sub> and the social "
      "optimum is Q<sub>so</sub>. Which statement about the units between Q<sub>so</sub> and Q<sub>e</sub> is "
      "correct?</p>",
    alternativer=[
        R("Each costs society more than it is worth to the buyers"),
        F("Each is worth more to buyers than it costs society, so it should be made",
          "Between the two quantities, demand lies below the marginal societal cost. The comparison is "
          "reversed."),
        F("They are produced only after the externality has been internalised",
          "Internalisation removes these units. The free market produces them."),
        F("They are the units the free market fails to produce",
          "The free market produces more than the optimum, not less."),
    ],
    kort="<p><b>Each costs society more than it is worth.</b> Beyond Q<sub>so</sub> the marginal societal cost is "
         "above what buyers will pay, yet the market makes these units because the producer prices only its own "
         "cost.</p>",
    full="<p><b>The diagram.</b> Supply is the marginal production cost (MPC). Demand is the marginal benefit to "
         "buyers, which here equals the marginal societal benefit. With a negative production externality the "
         "marginal societal cost (MSC) lies above MPC: the gap is the external cost per unit, which appears in nobody's "
         "price.</p>"
         "<p><b>Why the market overshoots.</b> The market settles where demand meets MPC, at Q<sub>e</sub> and "
         "P<sub>e</sub>. The optimum is where demand meets MSC, at Q<sub>so</sub> and P<sub>so</sub>. So "
         "Q<sub>e</sub> &gt; Q<sub>so</sub> and P<sub>e</sub> &lt; P<sub>so</sub>.</p>"
         "<p><b>Here.</b> Every unit between the two quantities is worth less to the buyer than its full cost to "
         "society. Producing it lowers social welfare. That is the market failure.</p>"
         "<p><b>The usual confusion.</b> Thinking the market makes too little. The polluter's price is too low, so "
         "buyers take too much.</p>"
         "<p><b>Remember:</b> negative production externality: too cheap, too much.</p>",
)

statisk(
    "ext-s07", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about which way the market price is wrong when production harms outsiders.",
        "The producer prices only its own cost, the marginal production cost. The marginal societal cost also "
        "includes the harm to others. The market settles where demand meets the producer's own cost.",
        "<p><b>Step 1: who pays for the pollution today?</b> The buyers of steel, or someone else?</p>"
        "<p><b>Step 2: what happens to the price once the mill pays it?</b> Then judge today's price against that "
        "level.</p>",
    ),
    q="<p>A commentator writes: «Steel from a polluting mill is overpriced, because its pollution makes steel so costly "
      "to society.»</p>"
      "<p>What is wrong with the claim, according to lecture 3?</p>",
    alternativer=[
        R("The market price is too low, since part of the cost falls on others"),
        F("Nothing: the price already includes the pollution cost, so it is too high",
          "The pollution falls on people outside the deal. That is exactly why it is not in the price."),
        F("The price is right, since a free market always sets the efficient price",
          "With an externality the free market fails to reach the social optimum. That is the market "
          "failure."),
        F("The quantity is too low, which is what pushes the price up",
          "With a negative production externality the market makes too much, not too little."),
    ],
    kort="<p><b>The price is too low.</b> The mill prices only its own cost. Others pay for the pollution, so steel is "
         "too cheap and buyers take too much.</p>",
    full="<p><b>The trap.</b> It feels natural that a harmful product is «too expensive». Lecture 3 shows the opposite. "
         "A negative production externality makes the market price too low and the quantity too high.</p>"
         "<p><b>Why.</b> The producer prices only its marginal production cost. The marginal societal cost also "
         "includes the damage to outsiders, which nobody in the deal pays. The market settles where demand meets the "
         "lower curve, so P<sub>e</sub> &lt; P<sub>so</sub> and Q<sub>e</sub> &gt; Q<sub>so</sub>. The polluter's "
         "price is low precisely because someone else pays part of the cost.</p>"
         "<p><b>What internalisation does.</b> Making the mill pay for the damage raises its cost toward the societal "
         "cost. The price rises and the quantity falls toward the optimum.</p>"
         "<p><b>The usual confusion.</b> Confusing «costly to society» with «expensive in the shop». The social cost is "
         "high; the market price is too low.</p>"
         "<p><b>Remember:</b> someone else pays part of the cost, so the price is too low.</p>",
)

statisk(
    "ext-s08", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's two-firm example: why each firm picks the polluting technology and what makes it "
        "switch.",
        "Each firm compares its own profit under the two technologies. A cost it imposes on the other firm does not "
        "enter that comparison. Internalisation makes the firm responsible bear the cost of its own action.",
        "<p><b>Step 1: compute firm A's own profit under each technology.</b> Revenue minus its own cost.</p>"
        "<p><b>Step 2: for each proposed change, recompute.</b> Does the dirty technology still earn more for firm "
        "A?</p>",
    ),
    q="<p>Two firms each choose a technology. Dirty: revenue 200, cost 40, plus a cost of 30 imposed on the other firm. "
      "Clean: revenue 200, cost 50, no cost to anyone else. Both maximise their own profit, so both choose the dirty "
      "technology.</p>"
      "<p>Which change would make firm A choose the clean technology?</p>",
    alternativer=[
        R("Making firm A pay the 30 it imposes on firm B"),
        F("Making firm A pay the 30 that firm B imposes on it",
          "Firm A bears that cost whatever it chooses itself. It does not change the comparison between A's two "
          "options."),
        F("Raising both technologies' revenue by the same amount",
          "The same addition on both sides leaves the ranking of the two technologies unchanged."),
        F("Lowering the cost of the dirty technology",
          "That makes the dirty technology even more profitable for firm A."),
    ],
    kort="<p><b>Make firm A pay the 30 it imposes.</b> Dirty then earns 200 − 40 − 30 = 130, less than 150 for clean, "
         "so A switches: internalisation in one line.</p>",
    full="<p><b>The private choice.</b> Dirty earns firm A 200 − 40 = 160; clean earns 200 − 50 = 150. The 30 lands on "
         "firm B, so A ignores it and goes dirty. Firm B reasons the same way.</p>"
         "<p><b>The social cost.</b> With both dirty, each firm ends with 200 − 40 − 30 = 130 against 150 if both went "
         "clean. Total welfare is 260 instead of 300: 40 is lost. Polluting saves each firm 10 but costs the other "
         "30.</p>"
         "<p><b>Internalisation.</b> If A must pay the 30 it imposes, dirty earns it 130, less than 150. It "
         "switches. The cost has been brought into the decision of the party that causes it.</p>"
         "<p><b>The usual confusion.</b> Charging A for the cost it suffers. That cost comes from B's choice and is "
         "the same whatever A does, so it cannot change A's decision.</p>"
         "<p><b>Remember:</b> make the polluter bear the cost it imposes and its choice changes. This is lecture 3's "
         "two-firm example with new numbers.</p>",
)

statisk(
    "ext-s09", tema="eksternaliteter", type="paastand",
    hjelp=hjelp3(
        "This is about the root cause of externalities in the enlarged production function.",
        "q + w = F(K, L, N, S, H; r, e). Output q and waste w flow out. Financial capital K, labour L, natural capital "
        "N, social capital S and human capital H are the funds used, with flows of natural resources r and energy e.",
        "<p><b>Step 1: which of these end up in the product the buyer pays for?</b></p>"
        "<p><b>Step 2: which do not?</b> Ask what that means for the product's price, since a buyer pays only for "
        "what the product carries.</p>",
    ),
    q="<p>Lecture 3 extends the neoclassical production function Q = F(K, L) to q + w = F(K, L, N, S, H; r, e). According "
      "to the lecture, what is the root cause of externalities in this framework?</p>",
    alternativer=[
        R("Waste and the use of natural, social and human capital are not embodied in the product, so its price "
          "leaves them out"),
        F("Firms use too much financial capital and labour, which pushes prices above cost",
          "K and L are already in the neoclassical function and in the price. The problem lies with what is "
          "added."),
        F("Natural capital is priced too high, so firms switch to labour and create waste",
          "Natural capital is not priced too high. The lecture's point is that its use does not show up in the "
          "price."),
        F("Output and waste are both embodied in the product, so the price counts them twice",
          "Waste is not embodied in the product. That is the opposite of the lecture's point."),
    ],
    kort="<p><b>Effects not embodied in the product.</b> Waste and the use of natural, social and human capital are not "
         "physically part of what is sold, so its price leaves them out.</p>",
    full="<p><b>The enlarged function.</b> The neoclassical production function turns capital and labour into output: "
         "Q = F(K, L). The enlarged version, based on ecological economics, adds what that leaves out. Output q and "
         "waste w flow out. The funds used are financial capital K, labour L, natural capital N, social capital S and "
         "human capital H, together with flows of natural resources r and energy e.</p>"
         "<p><b>The root cause.</b> Waste and the use of natural, social and human capital are not physically embodied "
         "in the product. A buyer pays for the product, so whatever is not in it does not show up in its price. That "
         "is where externalities come from.</p>"
         "<p><b>Why it matters.</b> It explains why the market cannot fix the problem on its own: prices only carry "
         "what the product carries. Internalisation has to bring the rest in from outside.</p>"
         "<p><b>Remember:</b> not embodied in the product, so not in the price.</p>",
)

statisk(
    "ext-s10", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the funds in the enlarged production function and which ones a firm can use without paying.",
        "q + w = F(K, L, N, S, H; r, e): financial capital K, labour L, natural capital N (nature's stocks), social "
        "capital S (relationships and trust in society) and human capital H (people's skills and health), plus flows "
        "of resources r and energy e.",
        "<p><b>Step 1: classify the clean fjord water.</b> Which kind of capital is a natural stock?</p>"
        "<p><b>Step 2: classify the community's trust and goodwill.</b> Which kind of capital is a relationship?</p>",
    ),
    q="<p>A salmon farm relies on clean fjord water and on the trust and goodwill of the local community. Neither shows "
      "up in the price of its salmon.</p>"
      "<p>In lecture 3's enlarged production function, which funds are these?</p>",
    alternativer=[
        R("Natural capital and social capital"),
        F("Financial capital and labour",
          "These are the funds of the neoclassical function, which the firm pays for and which enter the price."),
        F("Human capital and flows of energy",
          "Human capital is people's skills and health; energy is a flow. Neither describes fjord water or "
          "community trust."),
        F("Output and waste",
          "Output and waste are what flows out of production. The question asks what the farm uses."),
    ],
    kort="<p><b>Natural capital and social capital.</b> The fjord is natural capital and the community's trust is "
         "social capital. Neither is embodied in the salmon, so neither is in its price.</p>",
    full="<p><b>The funds.</b> The enlarged production function q + w = F(K, L, N, S, H; r, e) adds three kinds of "
         "capital to financial capital and labour: natural capital (nature's stocks, such as clean water), social "
         "capital (relationships, trust and institutions in society) and human capital (people's skills and "
         "health).</p>"
         "<p><b>Here.</b> The clean fjord is natural capital. The community's trust and goodwill is social capital. The "
         "farm uses both, but neither is physically part of the salmon, so the price of salmon does not reflect "
         "them.</p>"
         "<p><b>Why it matters.</b> If the farm pollutes the fjord or loses the community's trust, it runs down capital "
         "it does not pay for. That is how externalities arise. It is also why integrated value adds S and E to F.</p>"
         "<p><b>Remember:</b> nature is N, relationships are S, people's skills and health are H.</p>",
)

statisk(
    "ext-s11", tema="eksternaliteter", type="fakta",
    hjelp=hjelp3(
        "This is about the lecture's discussion case and the concept of internalisation.",
        "Internalisation is bringing the costs or benefits of external effects into the decisions and prices of the "
        "parties involved, so that those responsible bear the costs or enjoy the benefits of their actions.",
        "<p><b>Step 1: classify the original harm.</b> Who bears it? Are they part of Velsicol's deals?</p>"
        "<p><b>Step 2: what does a successful lawsuit change?</b> Ask who pays for the damage afterwards.</p>",
    ),
    q="<p>In lecture 3's discussion case, the chemical maker Velsicol is sued for knowingly polluting water with "
      "cancer-causing pesticides.</p>"
      "<p>In the lecture's terms, what does the lawsuit do?</p>",
    alternativer=[
        R("It internalises the externality by turning the damage into a cost for the firm"),
        F("It turns a negative externality into a positive one for the people affected",
          "Compensation does not make the pollution beneficial. The harm is still a harm; what changes is who pays "
          "for it."),
        F("It turns the harm into a consumption externality, since water users are affected",
          "The harm comes from making pesticides, so it stays on the production side."),
        F("It creates a new externality, since the court is outside the transaction",
          "A court ruling is not an effect of production or consumption on outsiders. It makes the polluter pay."),
    ],
    kort="<p><b>It internalises the externality.</b> The damage that fell on outsiders becomes a cost Velsicol must "
         "bear.</p>",
    full="<p><b>The case.</b> Velsicol polluted water with pesticides. The harm fell on people who neither made nor "
         "bought the product: a negative production externality.</p>"
         "<p><b>Internalisation.</b> Lecture 3 defines it as bringing the costs or benefits of external effects into the "
         "decisions and prices of the parties involved, so that those responsible bear the costs. A lawsuit does this "
         "by turning the damage into a cost for the firm. Future decisions now have to count it.</p>"
         "<p><b>Other channels.</b> Government (taxes, quotas, subsidies), civil society (media), investors (strategy, "
         "engagement), corporates themselves and consumers can all push internalisation. Innovation by competitors "
         "can force it too.</p>"
         "<p><b>The usual confusion.</b> Thinking compensation changes the type of externality. The type is set by "
         "where the effect comes from and whether it helps or harms. Internalisation changes who pays.</p>"
         "<p><b>Remember:</b> internalisation makes the polluter pay; a lawsuit is one route.</p>",
)

# ---------------------------------------------------------------------------
# Internalisering: kanalene og Unerman-stigen
# ---------------------------------------------------------------------------
statisk(
    "ext-s12", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the forces that can push a firm to internalise its externalities.",
        "Lecture 3 lists government (taxes, quotas, subsidies, campaigns), civil society (media attention), investors "
        "(strategy and engagement), corporates themselves and consumers. It adds one more force that works through "
        "the market without any of them acting on purpose.",
        "<p><b>Step 1: who acts in the case?</b> Not a regulator, a newspaper or an investor.</p>"
        "<p><b>Step 2: what makes the old process a problem for the firm?</b> Ask where the pressure comes from.</p>",
    ),
    q="<p>A rival launches a cheaper electric version of a diesel machine. A machinery maker's diesel model starts to lose "
      "sales. It can only win them back by cleaning up its own product. No new law or tax is involved.</p>"
      "<p>Which force behind internalisation does lecture 3 say this is?</p>",
    alternativer=[
        R("Innovation by competitors"),
        F("Government regulation",
          "No law, tax or quota is involved in the case."),
        F("Civil society and media attention",
          "Nobody campaigns or reports on the firm. The pressure comes through the market."),
        F("Investor engagement",
          "No investor acts in the case."),
    ],
    kort="<p><b>Innovation by competitors.</b> A cleaner rival turns the firm's externality into a commercial problem "
         "before any law does. The lecture's illustration is Tesla.</p>",
    full="<p><b>The channels.</b> Lecture 3 lists who can push internalisation: government (taxes, quotas, subsidies, "
         "awareness campaigns), civil society (media attention), investors (externalities in investment and lending "
         "strategy, engagement), corporates (costs of externalities built into their practices) and consumers (buying "
         "sustainable products). The lecture adds that innovation by competitors may force companies to internalise "
         "their externalities.</p>"
         "<p><b>Here.</b> A rival's cleaner and cheaper machine takes sales from the diesel model. The maker must clean "
         "up to compete. No regulator or investor acted: competition did it. The lecture's illustration is "
         "Tesla.</p>"
         "<p><b>The usual confusion.</b> Calling it consumer pressure. Buyers switch here because the rival's product "
         "is cheaper and better, not because they demand sustainability. The trigger is the rival's innovation.</p>"
         "<p><b>Remember:</b> a competitor's innovation can make an externality a commercial problem before any law "
         "does.</p>",
)

statisk(
    "ext-s13", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the forces that can push a firm to internalise its externalities.",
        "Lecture 3 lists government (taxes, quotas, subsidies), civil society (media attention), investors "
        "(externalities in investment and lending strategy, engagement), corporates (costs built into business "
        "practices) and consumers (buying sustainable products).",
        "<p><b>Step 1: who acts?</b> Look at what kind of institution sets the loan terms.</p>"
        "<p><b>Step 2: in what role does it act?</b> As a lawmaker, as a buyer or as a provider of capital?</p>",
    ),
    q="<p>A bank starts pricing its loans to a cement producer as if every tonne of CO<sub>2</sub> carried a charge, "
      "although no carbon tax applies. Plants with high emissions get dearer loans.</p>"
      "<p>Which channel of internalisation from lecture 3 is this?</p>",
    alternativer=[
        R("Investors: externalities built into lending strategy"),
        F("Government: a tax on emissions",
          "No tax applies. The charge exists only in the bank's pricing."),
        F("Consumers: buying sustainable products",
          "The bank is not buying cement. It is supplying capital."),
        F("Civil society: media attention",
          "Nobody is campaigning or reporting. A lender sets its terms."),
    ],
    kort="<p><b>Investors.</b> By pricing emissions into its loans, the bank makes the producer bear part of its "
         "externality through the cost of capital.</p>",
    full="<p><b>The channel.</b> Lecture 3 lists investors among the forces that can internalise externalities: they "
         "can incorporate externalities in their investment and lending strategy and engage with companies. Banks "
         "count here as providers of capital.</p>"
         "<p><b>Here.</b> No law charges the cement producer for its emissions, but the bank does so in its loan "
         "pricing. A dirtier plant pays more for its funding. Part of the externality now enters the firm's costs "
         "through the cost of capital.</p>"
         "<p><b>Why it matters.</b> This links lecture 3 to the rest of the course: if ESG changes a firm's risk or "
         "what lenders know, it can change the cost of capital. Lectures 10 and 11 come back to how banks do it.</p>"
         "<p><b>The usual confusion.</b> Assuming only government can internalise. Investors, consumers, the media and "
         "competitors can all make a firm pay before any tax arrives.</p>"
         "<p><b>Remember:</b> pricing externalities into capital is the investor channel.</p>",
)

statisk(
    "ext-s14", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about placing a firm on Unerman, Bebbington and O'Dwyer's spectrum from externalised to internalised.",
        UNERMAN,
        "<p><b>Step 1: is anyone forcing the firm?</b> Look for a tax, a fine or a ban.</p>"
        "<p><b>Step 2: what does the firm do and what does it get back?</b> Costs, savings, new income?</p>",
    ),
    q="<p>A ferry operator, with no rule requiring it, invests in hybrid engines. It pays for the new engines but also "
      "saves fuel and wins a new contract from a municipality that wants low-emission ferries.</p>"
      "<p>Where on Unerman et al.'s (2018) spectrum does this belong?</p>",
    alternativer=[
        R("Voluntary internalisation initiatives"),
        F("Mandatory cost internalisation for part of the impact",
          "No tax, fine or mandatory rule applies. The operator acts on its own."),
        F("Full financial internalisation",
          "Full internalisation comes through a legislative ban. Nothing is banned here."),
        F("No financial internalisation",
          "The operator clearly recognises the issue and acts on it."),
    ],
    kort="<p><b>Voluntary internalisation initiatives.</b> The operator chooses to act: it bears mitigation costs but "
         "also saves costs and finds new income.</p>",
    full="<p><b>The spectrum.</b> Unerman, Bebbington and O'Dwyer (2018) describe internalisation as a spectrum. At one "
         "end the externality is not recognised or understood. Next, as societal values and scientific knowledge "
         "change, financial risks and opportunities are recognised and managed. Then come voluntary internalisation "
         "initiatives. Then mandatory internalisation for part of the impact: taxation, fines and mandatory "
         "mitigation. At the far end is full internalisation through a legislative ban.</p>"
         "<p><b>Here.</b> No rule forces the ferry operator. It invests on its own and gets three things the figure "
         "names for this stage: mitigation costs, but also costs saved and new sources of income.</p>"
         "<p><b>The usual confusion.</b> Assuming internalisation is always a pure cost imposed from outside. At the "
         "voluntary stage it can pay.</p>"
         "<p><b>Remember:</b> recognised, then voluntary, then partly mandatory, then banned.</p>",
)

statisk(
    "ext-s15", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about placing a firm on Unerman, Bebbington and O'Dwyer's spectrum from externalised to internalised.",
        UNERMAN,
        "<p><b>Step 1: has the firm done anything yet?</b> Look for costs paid, rules or bans.</p>"
        "<p><b>Step 2: has anything changed in how the issue is seen?</b> Ask what drives that change.</p>",
    ),
    q="<p>New research links a widely used food additive to health problems. Analysts start asking a snack maker how "
      "exposed it is. Its board puts the issue on its risk register. No rule applies and the firm has not changed "
      "its products yet.</p>"
      "<p>Where on Unerman et al.'s (2018) spectrum is the snack maker?</p>",
    alternativer=[
        R("Financial risks recognised and managed"),
        F("No financial internalisation",
          "The board has put the issue on its risk register. It is recognised."),
        F("Voluntary internalisation initiatives",
          "The firm has not yet taken any action that costs or saves money."),
        F("Mandatory cost internalisation for part of the impact",
          "No rule, tax or fine applies."),
    ],
    kort="<p><b>Risks recognised.</b> New science makes the issue a financial risk that the firm now recognises and "
         "manages, before any voluntary or mandatory action.</p>",
    full="<p><b>The second stage.</b> On Unerman et al.'s (2018) spectrum, an externality starts out not recognised or "
         "understood. As societal values and scientific knowledge change, the firm comes to appreciate it: financial "
         "risks are recognised and managed while financial opportunities are identified. Only after that come "
         "voluntary initiatives, mandatory partial internalisation and finally a ban.</p>"
         "<p><b>Here.</b> New research changes what is known about the additive. Analysts ask about exposure and the "
         "board registers the risk. Nothing has been paid or changed yet. The firm has moved from not recognising the "
         "issue to recognising it as a risk.</p>"
         "<p><b>The usual confusion.</b> Treating recognition as internalisation already achieved. It is the step "
         "before action: the externality is seen, but the firm does not yet bear any of its cost.</p>"
         "<p><b>Remember:</b> new science or values first make a risk visible; action comes later.</p>",
)

statisk(
    "ext-s16", tema="eksternaliteter", type="begrep",
    hjelp=hjelp3(
        "This is about the order of Unerman, Bebbington and O'Dwyer's internalisation spectrum.",
        "The five stages, listed here out of order: a legislative ban; voluntary initiatives; an externality not "
        "recognised; taxes, fines and mandatory mitigation for part of the impact; risks and opportunities "
        "recognised as values and science change.",
        "<p><b>Step 1: find the two ends.</b> Which stage has no internalisation at all? Which has full "
        "internalisation?</p>"
        "<p><b>Step 2: order the middle.</b> Seeing a risk comes before acting on it. Acting by choice comes before "
        "being forced.</p>",
    ),
    q="<p>Which sequence runs from externalised to fully internalised on Unerman, Bebbington and O'Dwyer's (2018) "
      "spectrum?</p>",
    alternativer=[
        R("Not recognised, risks recognised, voluntary initiatives, partial mandatory charges, ban"),
        F("Not recognised, voluntary initiatives, risks recognised, partial mandatory charges, ban",
          "A firm cannot take voluntary action on a risk it has not yet recognised."),
        F("Not recognised, risks recognised, partial mandatory charges, voluntary initiatives, ban",
          "Voluntary action comes before rules that force a firm to pay for part of its impact."),
        F("Not recognised, risks recognised, voluntary initiatives, ban, partial mandatory charges",
          "A ban is full internalisation and closes the spectrum. Taxes and fines cover only part of the "
          "impact."),
    ],
    kort="<p><b>Recognise, volunteer, pay part, ban.</b> The spectrum runs from an unrecognised externality to full "
         "internalisation through a legislative ban.</p>",
    full="<p><b>The spectrum.</b> Unerman, Bebbington and O'Dwyer (2018) show internalisation as a spectrum from "
         "externalised to internalised impact. First, no financial internalisation: the externality is not recognised "
         "or understood. Second, as societal values and scientific knowledge change, financial risks and "
         "opportunities are recognised and managed. Third, voluntary internalisation initiatives: mitigation costs, "
         "but also costs saved and new sources of income. Fourth, mandatory cost internalisation for part of the "
         "impact: taxation, fines and mandatory mitigation. Fifth, full financial internalisation: a legislative "
         "ban.</p>"
         "<p><b>Why the order.</b> Recognition comes before action, choice before force and partial charges before "
         "full prohibition.</p>"
         "<p><b>The usual confusion.</b> Treating a carbon tax as full internalisation. In practice taxes and fines "
         "charge only part of the impact; only a ban goes all the way.</p>"
         "<p><b>Remember:</b> internalisation is a spectrum, not a switch.</p>",
)

# ---------------------------------------------------------------------------
# Tre begrensninger
# ---------------------------------------------------------------------------
statisk(
    "ext-s17", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the limitations that keep internalisation from working.",
        GRENSER,
        "<p><b>Step 1: what does the firm do in response to the carbon price?</b></p>"
        "<p><b>Step 2: where are the emissions after the change?</b> Ask whether they fell or simply moved to a "
        "place the EU price does not reach.</p>",
    ),
    q="<p>The EU tightens its carbon price. A chemicals group stops making a carbon-heavy input at its plant in the EU "
      "and instead buys it from a supplier in a country with no carbon price.</p>"
      "<p>Which limitation of internalisation does this illustrate?</p>",
    alternativer=[
        R("Territoriality of jurisdiction: rules stop at the border"),
        F("Information asymmetry: greenwashing",
          "Nobody is misled about how green the group is. It has changed where the input is made."),
        F("Political frictions: policy uncertainty and lobbying",
          "The policy is in place and the group does not lobby against it. It moves around it."),
        F("Innovation by competitors",
          "That is a force that pushes internalisation, not a limitation. No rival is involved."),
    ],
    kort="<p><b>Territoriality of jurisdiction.</b> A rule binds only where it applies, so the group outsources the "
         "dirty step to a region without it. Emissions move rather than fall.</p>",
    full="<p><b>The limitation.</b> Lecture 3 asks what a CEO with plants in the EU would do if EU climate policy "
         "tightens. One answer is to relocate or outsource. Territoriality of jurisdiction means firms can shift "
         "production to regions with weaker regulation. The lecture's evidence: after California adopted cap-and-trade "
         "in 2013, firms shifted production and greenhouse gas emissions to other states (Bartram, Hou and Kim "
         "2022).</p>"
         "<p><b>Here.</b> The group does not move a whole plant; it buys the carbon-heavy input from abroad. "
         "Outsourcing works the same way: the emissions happen outside the reach of the EU price.</p>"
         "<p><b>The usual confusion.</b> Reading the group's lower EU emissions as a climate gain. The input is still "
         "made, only elsewhere. A greener firm is not a greener planet.</p>"
         "<p><b>Remember:</b> a rule stops at the border; relocating or outsourcing moves emissions rather than cutting "
         "them.</p>",
)

statisk(
    "ext-s18", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the limitations that keep internalisation from working and about what a firm's own "
        "footprint shows.",
        GRENSER,
        "<p><b>Step 1: what happens to the oil field after the sale?</b> Does it close or keep producing?</p>"
        "<p><b>Step 2: who watches it now?</b> Then ask what the seller's lower reported emissions say about total "
        "emissions.</p>",
    ),
    q="<p>A listed oil company sells its most polluting field to a private buyer that discloses far less. The field "
      "keeps producing. The listed company then reports a large cut in its emissions and advertises itself as "
      "greener.</p>"
      "<p>Which limitation does this illustrate and what happens to total emissions?</p>",
    alternativer=[
        R("Information asymmetry: greenwashing; total emissions need not fall"),
        F("Territoriality of jurisdiction; total emissions fall since the field moves abroad",
          "The field does not move. It changes owner and keeps producing."),
        F("Information asymmetry: greenwashing; total emissions fall by the reported cut",
          "The field keeps producing under the new owner. The cut is in the seller's books, not necessarily in the "
          "atmosphere."),
        F("Political frictions; total emissions rise since the buyer lobbies against rules",
          "Nothing in the case concerns lobbying or policy."),
    ],
    kort="<p><b>Greenwashing; total emissions need not fall.</b> The listed firm looks greener, but the field keeps "
         "running under a much less monitored private owner.</p>",
    full="<p><b>The limitation.</b> Information asymmetry means outsiders cannot verify how green a firm really is, "
         "which opens the door to greenwashing. Lecture 3's evidence: one common way for public firms to become "
         "«greener» is to sell polluting assets to private firms, which are much less monitored (Duchin, Gao and Xu "
         "2024).</p>"
         "<p><b>Here.</b> The listed company's reported emissions fall because the field is no longer on its books. "
         "The field still produces, now under an owner that discloses far less. The planet sees no cut.</p>"
         "<p><b>The usual confusion.</b> Equating a greener firm with lower total emissions. Selling or relocating a "
         "polluting asset moves the emissions rather than cutting them. The same logic appears in lecture 2, where "
         "Telenor's exit was criticised because the buyer could continue the harm.</p>"
         "<p><b>Remember:</b> a greener firm is not a greener planet.</p>",
)

statisk(
    "ext-s19", tema="eksternaliteter", type="paastand",
    hjelp=hjelp3(
        "This is about why greenwashing counts as a limitation to internalisation, not just as a marketing problem.",
        "Internalisation needs someone (government, investors, consumers, the media) to make the polluter bear the "
        "cost. Each of them acts on what it can observe about the firm.",
        "<p><b>Step 1: what do misleading adverts change?</b> The firm's emissions, or what outsiders believe about "
        "them?</p>"
        "<p><b>Step 2: what does that do to those who could make the firm pay?</b> Strike the options that describe "
        "a different limitation.</p>",
    ),
    q="<p>Lecture 3 shows the UK Advertising Standards Authority banning Shell adverts that made low-carbon products "
      "look like a significant share of Shell's business when they were not.</p>"
      "<p>Why does the lecture treat this kind of problem as a limitation to internalisation?</p>",
    alternativer=[
        R("Outsiders who cannot see a firm's true footprint cannot make it pay for that footprint"),
        F("Misleading adverts raise the firm's costs, so the harm is already internalised through them",
          "Advertising costs have nothing to do with the external cost of emissions. Nobody is charged for the "
          "harm."),
        F("A ban on adverts moves production to regions with weaker rules, so emissions simply relocate",
          "Nothing in the case moves production. The adverts change what people believe, not where the firm "
          "produces."),
        F("Adverts work like lobbying: they delay climate policy by changing what politicians vote for",
          "The adverts were aimed at the public. The case says nothing about policy or votes."),
    ],
    kort="<p><b>Hidden footprints cannot be charged.</b> Greenwashing exploits information asymmetry: if investors, "
         "consumers and regulators cannot see the true footprint, they cannot make the firm pay for it.</p>",
    full="<p><b>The limitation.</b> Information asymmetry is the second of lecture 3's three limitations. Outsiders "
         "cannot verify how green a firm is, which lets it greenwash: look greener than it is.</p>"
         "<p><b>Why it blocks internalisation.</b> Every channel of internalisation acts on what it can observe. "
         "Consumers who believe the adverts keep buying, investors price a cleaner firm and regulators see less reason "
         "to act. The externality stays unpaid because it is hidden.</p>"
         "<p><b>The lecture's evidence.</b> The ASA ruled that Shell's adverts left out its more polluting fossil-fuel "
         "work. Duchin, Gao and Xu (2024) add a subtler form: public firms get «greener» by selling polluting assets "
         "to much less monitored private firms.</p>"
         "<p><b>The usual confusion.</b> Treating greenwashing as only a consumer-protection issue. In this course it "
         "matters because it shields the externality from those who could price it.</p>"
         "<p><b>Remember:</b> if outsiders cannot see it, they cannot charge for it.</p>",
)

statisk(
    "ext-s20", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the limitations that keep internalisation from working.",
        GRENSER,
        "<p><b>Step 1: is anyone moving production or hiding its footprint?</b> If not, strike those "
        "limitations.</p>"
        "<p><b>Step 2: what makes the firms wait?</b> Ask where their doubt comes from: technology, customers or "
        "the policy itself.</p>",
    ),
    q="<p>A government announces a carbon price that will rise every year. Several steel makers delay investing in "
      "cleaner furnaces because they expect the price to be scrapped after the next election.</p>"
      "<p>Which limitation of internalisation does this illustrate?</p>",
    alternativer=[
        R("Political frictions: policy uncertainty"),
        F("Territoriality of jurisdiction",
          "The steel makers do not move production to another region. They wait."),
        F("Information asymmetry: greenwashing",
          "Nobody misleads outsiders about how green they are."),
        F("Innovation by competitors",
          "That is a force pushing internalisation. No rival innovation appears in the case."),
    ],
    kort="<p><b>Political frictions.</b> Doubt about whether the policy will last weakens its effect: firms wait instead "
         "of internalising.</p>",
    full="<p><b>The limitation.</b> Political frictions are the third limitation in lecture 3: policy uncertainty and "
         "lobbying. A tax that firms expect to be reversed changes little today. Lobbying can also weaken or delay "
         "policy. The lecture's evidence is Leippold, Sautner and Yu (2024): firms spend more on anti-climate than on "
         "pro-climate lobbying on average.</p>"
         "<p><b>Here.</b> The carbon price exists on paper, but the steel makers do not trust it to survive the next "
         "election. Investing in cleaner furnaces would pay only if the price stays, so they wait. Internalisation "
         "stalls through policy uncertainty.</p>"
         "<p><b>The usual confusion.</b> Thinking a policy works once it is announced. Its credibility matters. "
         "Uncertainty about policy is also one of the three sources of uncertainty about internalisation, next to "
         "technology and consumer behaviour.</p>"
         "<p><b>Remember:</b> policy uncertainty and lobbying are political frictions.</p>",
)

statisk(
    "ext-s21", tema="eksternaliteter", type="paastand",
    hjelp=hjelp3(
        "This is about what the lecture's lobbying evidence says about why internalisation stalls.",
        "Lecture 3 names three limitations: firms shifting production to weaker regimes, outsiders being unable to "
        "verify how green a firm is; policy uncertainty and lobbying.",
        "<p><b>Step 1: which way does the average firm's climate lobbying lean?</b> For or against the rules "
        "that would charge for emissions?</p>"
        "<p><b>Step 2: what does lobbying act on?</b> Production, information or policy? Match that to a "
        "limitation.</p>",
    ),
    q="<p>Leippold, Sautner and Yu (2024) find that the average firm spends more on lobbying against climate policy than "
      "on lobbying for it.</p>"
      "<p>What does lecture 3 take this to show?</p>",
    alternativer=[
        R("Political frictions can delay or weaken the policies that would make firms pay for emissions"),
        F("Firms have already internalised their emissions, so lobbying is now aimed at other issues",
          "The lobbying is about climate policy itself. It is spent to block or shape the rules that would charge "
          "for emissions."),
        F("Territoriality: firms lobby so that they can move production to states with weaker rules",
          "Territoriality is about relocating production. Lobbying acts on the policy, wherever the firm "
          "produces."),
        F("Greenwashing: lobbying hides firms' true emissions from the investors who could price them",
          "Lobbying targets policymakers, not what investors can observe about a firm's footprint."),
    ],
    kort="<p><b>Political frictions.</b> If firms on balance spend to resist climate policy, the taxes and rules that "
         "would internalise emissions arrive later or weaker.</p>",
    full="<p><b>The limitation.</b> Political frictions are the third limitation in lecture 3: policy uncertainty and "
         "lobbying. Much internalisation depends on policy: taxes, quotas, fines and bans. Anything that delays or "
         "weakens that policy keeps the externality off the firm's books.</p>"
         "<p><b>The evidence.</b> Leippold, Sautner and Yu (2024) find that the average firm's spending on "
         "anti-climate lobbying exceeds its spending on pro-climate lobbying. The direction is the point: on balance, "
         "corporate money pushes against the rules that would make firms pay. The lecture also shows a shareholder "
         "proposal asking a firm to report on such lobbying, one way owners can respond.</p>"
         "<p><b>The usual confusion.</b> Filing lobbying under greenwashing or relocation. Greenwashing works on what "
         "outsiders know; relocation works on where production happens; lobbying works on the policy itself.</p>"
         "<p><b>Remember:</b> lobbying against climate policy is a political friction that stalls "
         "internalisation.</p>",
)

statisk(
    "ext-s22", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about what the evidence on territoriality means for judging a regional climate policy.",
        "Territoriality of jurisdiction: a rule binds only where it applies, so firms can shift production and its "
        "emissions to regions with weaker regulation.",
        "<p><b>Step 1: where did the emissions go after the programme?</b></p>"
        "<p><b>Step 2: compare the fall inside the state with the change in total emissions.</b> Which one does the "
        "climate care about?</p>",
    ),
    q="<p>Bartram, Hou and Kim (2022) find that after California adopted cap-and-trade, firms shifted production and "
      "greenhouse gas emissions to other states. A state official points to the fall in emissions inside California as "
      "proof that the programme cut emissions.</p>"
      "<p>What does the study imply about that claim?</p>",
    alternativer=[
        R("It overstates the gain: part of the fall is emissions that moved to other states"),
        F("It is right: emissions that leave California no longer count as an externality",
          "The harm from greenhouse gases does not depend on which state they come from."),
        F("It understates the gain: firms also cut emissions in the states they moved to",
          "The study finds production and emissions moving to other states, not falling there."),
        F("It is wrong only because firms lobbied the programme until it had no effect",
          "The study is about relocation, not lobbying. The programme did cut emissions inside the state."),
    ],
    kort="<p><b>The fall overstates the gain.</b> Some of California's cut is emissions that moved to other states, so "
         "total emissions fell by less: territoriality of jurisdiction.</p>",
    full="<p><b>The limitation.</b> Territoriality of jurisdiction is the first limitation in lecture 3. A rule binds "
         "only where it applies, so firms can shift production to regions with weaker regulation. The lecture's "
         "opening question makes the same point for the EU: a CEO facing a tighter EU carbon price can relocate or "
         "outsource.</p>"
         "<p><b>The evidence.</b> Bartram, Hou and Kim (2022) show that after California's cap-and-trade, firms "
         "shifted production and emissions to other states. California's own numbers improved partly because "
         "emissions crossed the border.</p>"
         "<p><b>Here.</b> The official counts only emissions inside California. Since some of the cut reappeared "
         "elsewhere, the fall inside the state overstates the fall in total emissions, which is what matters for the "
         "climate.</p>"
         "<p><b>The usual confusion.</b> Judging a policy by the emissions inside its own borders. Like a firm that "
         "sells a dirty plant, a region that exports production can look greener without the planet being "
         "greener.</p>"
         "<p><b>Remember:</b> regional rules can move emissions rather than cut them.</p>",
)

# ---------------------------------------------------------------------------
# Integrert verdi og strandede eiendeler
# ---------------------------------------------------------------------------
statisk(
    "ext-s23", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's integrated value approach to measuring the effect of "
        "internalisation.",
        "Integrated value I = F + S + E: the sum of financial, social and environmental value. External costs enter S "
        "and E as negative numbers.",
        "<p><b>Step 1: compute I for each process.</b> Keep the signs: S and E are negative.</p>"
        "<p><b>Step 2: compare the change in F with the change in I.</b> Which process would the approach "
        "favour?</p>",
    ),
    q="<p>A fertiliser maker can keep its current process (F 40, S −6, E −14) or switch to a cleaner one (F 34, S −2, "
      "E −4), all in the same value units.</p>"
      "<p>What does the integrated value approach imply?</p>",
    alternativer=[
        R("Switch: F falls by 6 while integrated value rises from 20 to 28"),
        F("Keep: integrated value is 60 for the current process against 40",
          "This adds the external costs as if they were positive values. They enter as negative numbers."),
        F("Switch: integrated value rises by 14, the gain in S and E",
          "This counts only the improvement in S and E and leaves out the fall in F."),
        F("Keep: F is 6 higher, which is what the process is worth",
          "Ranking on F alone ignores the external costs. That is finance as usual, not integrated value."),
    ],
    kort="<p><b>Switch.</b> I = 40 − 6 − 14 = 20 now and 34 − 2 − 4 = 28 after. Giving up 6 of F gains 8 of "
         "integrated value.</p>",
    full="<p><b>The approach.</b> Schoenmaker and Schramade measure a production process by its integrated value, "
         "I = F + S + E. External costs enter S and E as negative numbers. Optimising I is the SF 2.0 objective. The "
         "lecture's example: an original process (F 15, S −3, E −3) has I = 9; an optimised one (F 14, S −1, E −1) "
         "has I = 12.</p>"
         "<p><b>Here.</b> Current: 40 − 6 − 14 = 20. Cleaner: 34 − 2 − 4 = 28. Switching lowers F by 6 and raises "
         "S + E by 14, so I rises by 8.</p>"
         "<p><b>Why a firm would do it.</b> I shows what the firm would be worth if every externality were charged to "
         "it. Once government, employees or the public make it pay, the old process loses value and may become a "
         "stranded asset.</p>"
         "<p><b>The usual confusion.</b> Adding the external costs as positive numbers, or comparing only F.</p>"
         "<p><b>Remember:</b> I = F + S + E with S and E negative for external costs.</p>",
)

statisk(
    "ext-s24", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about what integrated value tells an investor about the future value of a polluting asset.",
        "Integrated value I = F + S + E can be read as what a firm would be worth if every externality were charged "
        "to it. Government, employees or the public can make the firm pay.",
        "<p><b>Step 1: compare F with I for the plants.</b> What closes the gap if the tax arrives?</p>"
        "<p><b>Step 2: what happens to an asset whose process becomes obsolete once it is charged?</b></p>",
    ),
    q="<p>An insurer holds long-term bonds issued by a utility whose coal plants have high financial value today but "
      "strongly negative environmental value, so their integrated value is far below F. A carbon tax is widely "
      "expected within a few years.</p>"
      "<p>What risk does the integrated value approach warn the insurer about?</p>",
    alternativer=[
        R("The plants may become stranded assets once the externality is charged"),
        F("None, since the plants' high F today protects the bonds",
          "F today leaves out the external cost. If it is charged, F falls toward I."),
        F("None, since integrated value only counts costs that are already charged",
          "Integrated value counts S and E whether or not anyone charges for them yet. That is its use."),
        F("The insurer itself will be charged for the plants' emissions",
          "The tax would fall on the emitter, the utility. The insurer's risk is the value of what it holds."),
    ],
    kort="<p><b>Stranded assets.</b> Once the carbon tax charges the externality, the coal process becomes obsolete and "
         "the plants lose financial value, putting the bonds at risk.</p>",
    full="<p><b>Reading I.</b> Integrated value shows what a firm would be worth if every externality were charged to "
         "it. A large gap between F and I means much of today's financial value rests on costs that others bear.</p>"
         "<p><b>Here.</b> If the carbon tax arrives, the utility must pay for its emissions. The coal process becomes "
         "obsolete and the plants lose financial value: they become stranded assets. A lender or bondholder is exposed "
         "to that loss.</p>"
         "<p><b>The response.</b> Lecture 3 says a firm and its financiers may internalise before others force them "
         "to, precisely to avoid stranded assets. Government (taxation, regulation), employees (strikes, talent "
         "drain) and the public (reputation, customer strikes) can all make the firm pay.</p>"
         "<p><b>The usual confusion.</b> Treating today's F as safe. The integrated value approach exists to show how "
         "fragile F can be.</p>"
         "<p><b>Remember:</b> a big gap between F and I signals a risk of stranded assets.</p>",
)

statisk(
    "ext-s25", tema="eksternaliteter", type="paastand",
    hjelp=hjelp3(
        "This is about how the integrated value approach is built and where it sits in Schoenmaker and Schramade's "
        "framework.",
        "I = F + S + E. Ask how an external cost is entered, whether it must already be charged and which rung of the "
        "ladder optimises the sum.",
        "<p><b>Step 1: check each statement's sign for external costs.</b></p>"
        "<p><b>Step 2: check whether it limits I to costs already charged.</b> Then check the rung it names: does "
        "that rung maximise F or optimise the sum?</p>",
    ),
    q="<p>Which statement about Schoenmaker and Schramade's integrated value I = F + S + E is correct?</p>",
    alternativer=[
        R("External costs enter S and E as negative numbers; optimising I is the SF 2.0 objective"),
        F("It counts only external costs that are already charged through taxes or fines",
          "I counts social and environmental effects whether or not anyone charges for them yet."),
        F("External costs are added to F as positive numbers, since they are part of value",
          "External costs reduce S and E. Adding them as positive numbers reverses the sign."),
        F("Optimising I is the SF 1.0 objective, since financial value still comes first",
          "SF 1.0 maximises F with S and E as constraints. Adding the three with equal weight is a different "
          "rung."),
    ],
    kort="<p><b>Negative S and E; SF 2.0.</b> External costs reduce S and E. Optimising the sum I is the "
         "stakeholder value objective.</p>",
    full="<p><b>The measure.</b> Integrated value adds financial, social and environmental value: I = F + S + E. "
         "External costs enter S and E as negative numbers, so a polluting process has I below F. The lecture's "
         "example: F 15, S −3, E −3 gives I = 9.</p>"
         "<p><b>Where it sits.</b> In Schoenmaker and Schramade's ladder, SF 2.0 creates stakeholder value, the "
         "triple bottom line, by optimising I. A unit of S or E counts like a unit of F.</p>"
         "<p><b>What it is for.</b> It counts effects whether or not anyone charges for them yet. That is how it shows "
         "what the firm would be worth if every externality were charged. It is also why it warns about stranded assets.</p>"
         "<p><b>The usual confusion.</b> Thinking I only records taxes and fines already paid. Those are already in "
         "F.</p>"
         "<p><b>Remember:</b> I = F + S + E with external costs negative; optimising it is SF 2.0.</p>",
)

# ---------------------------------------------------------------------------
# Usikkerhet, scenarier og stresstest
# ---------------------------------------------------------------------------
statisk(
    "ext-s26", tema="eksternaliteter", type="begrep",
    hjelp=hjelp3(
        "This is about why nobody knows when, or how hard, an externality will be internalised.",
        "Lecture 3 has three separate lists: who pushes internalisation, what limits it and what makes its timing "
        "and strength uncertain. Only one option is the last of these lists.",
        "<p><b>Step 1: identify the lists the wrong options come from.</b> Channels, limitations or ordinary "
        "macroeconomics?</p>"
        "<p><b>Step 2: ask what could change the speed of internalisation from outside the firm.</b> Think of "
        "new inventions, new laws and what customers choose to buy.</p>",
    ),
    q="<p>Lecture 3 names three sources of uncertainty about when and how hard an externality will be internalised. "
      "Which are they?</p>",
    alternativer=[
        R("Technology, policy and consumer behaviour"),
        F("Interest rates, inflation and exchange rates",
          "These matter for valuation in general but are not the lecture's sources of uncertainty about "
          "internalisation."),
        F("Government, civil society and investors",
          "These are channels that push internalisation, not sources of uncertainty."),
        F("Territoriality, greenwashing and political frictions",
          "These are the three limitations to internalisation, a different list."),
    ],
    kort="<p><b>Technology, policy and consumer behaviour.</b> Each can speed up or delay the moment a firm is made to "
         "pay for its externality.</p>",
    full="<p><b>Three sources.</b> Nobody knows when, or how hard, an externality will be internalised. Lecture 3 names "
         "three sources of uncertainty: technology (for example how fast clean alternatives become cheap), policy (for "
         "example whether and when a carbon price arrives) and consumer behaviour and preferences (for example "
         "whether customers switch).</p>"
         "<p><b>Why it matters.</b> The value lost through internalisation depends on its timing and strength. A firm "
         "or investor cannot just assume one future.</p>"
         "<p><b>The tools.</b> Scenario analysis and stress testing handle the uncertainty. For climate, the lecture "
         "uses the scenarios of the Network for Greening the Financial System (NGFS).</p>"
         "<p><b>The usual confusion.</b> Mixing up the three lists in lecture 3: channels (government, civil society, "
         "investors, corporates, consumers), limitations (territoriality, greenwashing, political frictions) and "
         "sources of uncertainty (technology, policy, consumer behaviour).</p>"
         "<p><b>Remember:</b> technology, policy and consumers make internalisation uncertain.</p>",
)

statisk(
    "ext-s27", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the two tools lecture 3 gives for handling uncertainty about internalisation.",
        "Scenario analysis: determine the most important uncertainties, elaborate scenarios, present them and weigh "
        "the probability of each. Stress testing: ask «what if everything goes wrong?», that is, how the company "
        "would fare in a drastic scenario.",
        "<p><b>Step 1: how many futures does the fund look at?</b> One drastic case or a range?</p>"
        "<p><b>Step 2: does it weigh them by probability?</b> Or does it look only at the worst one?</p>",
    ),
    q="<p>A pension fund takes four climate pathways from the Network for Greening the Financial System (NGFS), from "
      "orderly transition to severe warming. It assigns each a probability and estimates its portfolio loss under "
      "each one.</p>"
      "<p>Which tool from lecture 3 is it using?</p>",
    alternativer=[
        R("Scenario analysis"),
        F("A stress test",
          "A stress test looks at one drastic outcome and asks how the portfolio would fare. The fund weighs "
          "several outcomes by probability."),
        F("An integrated value calculation",
          "Integrated value sums F, S and E for a process. It does not weigh futures by probability."),
        F("Internalisation through investor engagement",
          "The fund is measuring its exposure, not engaging with firms to change their behaviour."),
    ],
    kort="<p><b>Scenario analysis.</b> Several scenarios, each weighed by its probability. A stress test would look only "
         "at the drastic one.</p>",
    full="<p><b>Two tools.</b> Lecture 3 handles uncertainty about internalisation with scenario analysis and stress "
         "testing. Scenario analysis determines the most important uncertainties, elaborates scenarios (developments, "
         "trends, possible external actions), presents them and weighs the probability of each. Stress testing asks "
         "«what if everything goes wrong?»: how the company would fare in a drastic scenario.</p>"
         "<p><b>Here.</b> The fund uses four pathways, attaches a probability to each and estimates the loss under "
         "each. That is scenario analysis.</p>"
         "<p><b>The usual confusion.</b> Calling anything with climate scenarios a stress test. The NGFS scenarios can "
         "feed both tools. What matters is whether you weigh several outcomes or look only at the severe one.</p>"
         "<p><b>Remember:</b> scenario analysis weighs several outcomes; a stress test looks at the worst.</p>",
)

# ---------------------------------------------------------------------------
# Air France-KLM og karbonprisen
# ---------------------------------------------------------------------------
statisk(
    "ext-s28", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about the Air France-KLM case: how big a carbon charge must be to eliminate the airline's operating "
        "profit.",
        "CO<sub>2</sub> charge = carbon price × emissions. EBIT hit = charge × (1 − pass-on rate). With no pass-on the "
        "whole charge comes off EBIT.",
        "<p><b>Step 1: write the condition.</b> The charge equals EBIT.</p>"
        "<p><b>Step 2: solve for the carbon price.</b> Which two figures does that leave you dividing? In which "
        "order, to get euros per tonne?</p>",
    ),
    q="<p>In the Air France-KLM case, the airline had 2017 EBIT of about EUR 1.42 billion and scope 1 and 2 emissions of "
      "32.7 million tonnes of CO<sub>2</sub>. Assume none of a carbon charge can be passed on to customers.</p>"
      "<p>How do you find the carbon price per tonne at which the charge would wipe out EBIT?</p>",
    alternativer=[
        R("Divide EBIT by emissions"),
        F("Divide sales by emissions",
          "Sales are revenue before costs. The charge has to be set against operating profit."),
        F("Divide net income by emissions",
          "Net income was already negative, so this gives no meaningful price. The case uses operating profit."),
        F("Divide emissions by EBIT",
          "That gives tonnes per euro of profit, not euros per tonne."),
    ],
    kort="<p><b>EBIT divided by emissions.</b> Set price × emissions = EBIT: about 1,423 / 32.7, or EUR 43.5 per "
         "tonne.</p>",
    full="<p><b>The case.</b> Schoenmaker and Schramade make Air France-KLM's externality visible by applying a carbon "
         "price to its emissions, whether or not such a tax is in place. The charge is carbon price × emissions. The "
         "EBIT hit is charge × (1 − pass-on rate).</p>"
         "<p><b>Here.</b> With no pass-on, EBIT is gone when price × emissions = EBIT, so price = EBIT / emissions. In "
         "EUR million: 1,423 / 32.7 is about EUR 43.5 per tonne. At EUR 100 per tonne the charge would be about EUR "
         "3.3 billion, 2.3 times EBIT.</p>"
         "<p><b>Why it matters.</b> The airline's EBIT margin was only 5.5% of sales. Pass-on is likely low in a "
         "price-competitive industry. A modest carbon price would erase its operating profit.</p>"
         "<p><b>The usual confusion.</b> Using sales or net income. The charge hits operating profit first; net income "
         "was already negative.</p>"
         "<p><b>Remember:</b> the charge scales with price × emissions; break-even price = EBIT / emissions.</p>",
)

statisk(
    "ext-s29", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about how a carbon charge and the ability to pass it on to customers determine the hit to an "
        "airline's operating profit.",
        "CO<sub>2</sub> charge = carbon price × emissions. EBIT hit = charge × (1 − pass-on rate). The pass-on rate is "
        "the share of the charge the airline recovers through higher fares.",
        "<p><b>Step 1: compute the full charge.</b> Price times tonnes.</p>"
        "<p><b>Step 2: keep the part that is not passed on.</b> Multiply by one minus the pass-on rate.</p>"
        "<p><b>Watch out:</b> the question asks for the hit, not for what is left of EBIT.</p>",
    ),
    q="<p>A regional airline emits 10 million tonnes of CO<sub>2</sub> a year and has EBIT of EUR 1 billion. A carbon "
      "price of EUR 80 per tonne is introduced and the airline can pass 25% of the charge on through higher fares.</p>"
      "<p>What is the hit to its EBIT?</p>",
    alternativer=[
        R("EUR 600 million"),
        F("EUR 800 million",
          "This is the full charge with no pass-on. A quarter of it is recovered through fares."),
        F("EUR 200 million",
          "This is the part passed on to customers, not the part the airline bears."),
        F("EUR 400 million",
          "This is what is left of EBIT after the hit, not the hit itself."),
    ],
    kort="<p><b>EUR 600 million.</b> Charge = 80 × 10 million = EUR 800 million. Hit = 800 × (1 − 0.25) = 600.</p>",
    full="<p><b>The mechanics.</b> In the Air France-KLM case, the charge is carbon price × emissions and the EBIT hit is "
         "charge × (1 − pass-on rate). At 0% pass-on the hit is the full charge; at 100% it is zero.</p>"
         "<p><b>Here.</b> The full charge is EUR 80 × 10 million tonnes = EUR 800 million. The airline recovers 25% "
         "through fares, so it bears 75%: 800 × 0.75 = EUR 600 million. EBIT falls from EUR 1,000 million to EUR 400 "
         "million.</p>"
         "<p><b>The intuition.</b> The charge scales with the carbon price and with emissions; pass-on shrinks the hit. "
         "In a price-competitive industry like aviation, pass-on is likely low, so most of the charge stays with the "
         "airline.</p>"
         "<p><b>The usual confusion.</b> Using the pass-on share instead of one minus it, or reporting the EBIT left "
         "instead of the hit.</p>"
         "<p><b>Remember:</b> hit = price × emissions × (1 − pass-on).</p>",
)

statisk(
    "ext-s30", tema="eksternaliteter", type="tolkning",
    hjelp=hjelp3(
        "This is about what internalisation is and what only looks like it.",
        "Internalisation brings the costs of external effects into the decisions and prices of the parties involved, "
        "so that those responsible bear them. " + GRENSER,
        "<p><b>Step 1: for each option, ask who bears the cost of the exhaust afterwards.</b></p>"
        "<p><b>Step 2: ask whether the exhaust itself falls or just moves or gets hidden.</b> Only one option "
        "changes who pays.</p>",
    ),
    q="<p>Diesel trucks in a city harm residents' health with their exhaust. Which of these internalises that external "
      "cost?</p>",
    alternativer=[
        R("The city charges each diesel truck a toll equal to the estimated damage from its exhaust"),
        F("A haulier moves its depot to a nearby town that has no toll",
          "The trucks keep running, only elsewhere. The cost moves; it is not borne by the polluter."),
        F("A haulier advertises a «green fleet» without changing any of its trucks",
          "Nothing changes for the exhaust or for who pays for it. That is greenwashing."),
        F("A haulier sells its oldest trucks to a smaller operator that is less closely watched",
          "The trucks stay on the road under a new owner. The harm continues."),
    ],
    kort="<p><b>The damage-based toll.</b> It makes each truck's owner pay for the harm its exhaust causes, so the cost "
         "enters the haulier's decisions and prices.</p>",
    full="<p><b>Internalisation.</b> Lecture 3 defines it as bringing the costs of external effects into the "
         "decision-making and pricing of the parties involved, so those responsible bear the costs of their actions. "
         "Government can do it through taxes, quotas or subsidies.</p>"
         "<p><b>Here.</b> A toll equal to the estimated damage makes the haulier pay for each truck's exhaust. Its "
         "costs rise toward the societal cost, so it has a reason to drive less or switch to cleaner trucks.</p>"
         "<p><b>Why the others fail.</b> Moving the depot is territoriality: the harm moves. Advertising a green fleet "
         "without changes is greenwashing. Selling old trucks to a less watched owner keeps them on the road, like "
         "public firms selling polluting assets to private buyers.</p>"
         "<p><b>The usual confusion.</b> Taking a firm's smaller footprint for internalisation. The test is whether "
         "the polluter now bears the cost and the harm falls.</p>"
         "<p><b>Remember:</b> internalisation makes the polluter pay; moving or hiding the harm does not.</p>",
)

statisk(
    "ext-s31", tema="eksternaliteter", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the supply and demand diagram for a negative production externality and what internalisation "
        "does to it.",
        "Supply is the marginal production cost (MPC). The marginal societal cost (MSC) lies above it. The market "
        "settles where demand meets MPC; the social optimum is where demand meets MSC.",
        "<p><b>Step 1: statement I.</b> What does the vertical distance between the two cost curves represent?</p>"
        "<p><b>Step 2: statement II.</b> If the producer must pay that distance on every unit, does its cost curve "
        "move up or down? What happens to the price?</p>",
    ),
    q="<p>Consider two statements about a negative production externality.</p>"
      "<p>I. The gap between marginal societal cost and marginal production cost is the external cost per unit, which "
      "appears in nobody's price.</p>"
      "<p>II. Internalising the externality lowers the market price, because the market moves toward the social "
      "optimum.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II has the price moving the wrong way: charging the polluter raises its cost."),
        F("Both I and II",
          "Statement II has the price moving the wrong way: charging the polluter raises its cost."),
        F("Neither I nor II",
          "Ask what the distance between the two cost curves measures for each unit produced."),
    ],
    kort="<p><b>Only I.</b> The gap is the external cost per unit. Internalising it raises the producer's cost, so the "
         "price rises and the quantity falls toward the optimum.</p>",
    full="<p><b>Statement I.</b> True. With a negative production externality, the marginal societal cost lies above "
         "the marginal production cost. The vertical gap is the external cost of each unit: harm that falls on "
         "outsiders and that no price reflects.</p>"
         "<p><b>Statement II.</b> False. The free market settles at P<sub>e</sub> and Q<sub>e</sub>, where demand "
         "meets the producer's own cost. The social optimum has P<sub>so</sub> &gt; P<sub>e</sub> and Q<sub>so</sub> "
         "&lt; Q<sub>e</sub>. Making the polluter pay the gap lifts its cost curve toward MSC, so the price rises and "
         "the quantity falls. Moving toward the optimum means a higher price, not a lower one.</p>"
         "<p><b>The usual confusion.</b> «Toward the optimum» sounds like «better for buyers». The polluter's price was "
         "too low because others paid part of the cost; fixing that raises it.</p>"
         "<p><b>Remember:</b> internalising a negative externality raises the price and cuts the quantity.</p>",
)

statisk(
    "ext-s32", tema="eksternaliteter", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the stages of Unerman, Bebbington and O'Dwyer's internalisation spectrum.",
        "The stages: no financial internalisation; risks and opportunities recognised; voluntary initiatives; "
        "mandatory cost internalisation for part of the impact; full financial internalisation.",
        "<p><b>Step 1: statement I.</b> What sits at the far end of the spectrum: a charge or something "
        "stronger?</p>"
        "<p><b>Step 2: statement II.</b> What can a firm get out of acting voluntarily, besides costs?</p>",
    ),
    q="<p>Consider two statements about Unerman et al.'s (2018) internalisation spectrum.</p>"
      "<p>I. Taxes and fines form the far end of the spectrum: full financial internalisation.</p>"
      "<p>II. At the voluntary stage, internalisation can bring cost savings and new sources of income as well as "
      "mitigation costs.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        F("Only I",
          "Statement I puts taxes and fines at the wrong stage of the spectrum."),
        R("Only II"),
        F("Both I and II",
          "Statement I puts taxes and fines at the wrong stage of the spectrum."),
        F("Neither I nor II",
          "Ask what the figure lists under voluntary internalisation initiatives besides mitigation costs."),
    ],
    kort="<p><b>Only II.</b> Taxes, fines and mandatory mitigation charge only part of the impact; full "
         "internalisation is a legislative ban. Voluntary action can save costs and open new income.</p>",
    full="<p><b>Statement I.</b> False. On Unerman, Bebbington and O'Dwyer's (2018) spectrum, taxation, fines and "
         "mandatory mitigation make up the fourth stage: mandatory cost internalisation for part of the impact. The "
         "far end, full financial internalisation, is a legislative ban. In practice a tax charges only part of the "
         "damage.</p>"
         "<p><b>Statement II.</b> True. The figure shows three outcomes of voluntary internalisation initiatives: "
         "mitigation costs, but also costs saved and new sources of income. Internalising is not always a pure "
         "cost.</p>"
         "<p><b>The whole spectrum.</b> Not recognised; risks and opportunities recognised as values and science "
         "change; voluntary initiatives; mandatory internalisation of part of the impact; full internalisation by "
         "ban.</p>"
         "<p><b>The usual confusion.</b> Treating a carbon tax as the end point. It is partial and mandatory; only a "
         "ban is full.</p>"
         "<p><b>Remember:</b> recognise, volunteer, pay part, ban.</p>",
)
