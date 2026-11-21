# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: obligasjoner og andre aktivaklasser enn aksjer
   (tema «obligasjoner», forelesning 10).

   Statiske spørsmål bnd-s01 … bnd-s30:
     s01 til s05  gjeld som nedsiderisiko, kjeden pris, yield, risiko og rating og
              risikodriverne for stats- og selskapsobligasjoner
     s06 til s07  ESG i kredittratinger: S&P-rammeverket og Attig et al. (2013)
     s08 til s09  Schoenmaker og Schramades tabell (mest stat, mest selskap, felles)
     s10      ICMAs fire frivillige sett mot EUs grønne obligasjonsstandard
     s11 til s14  klassifisering: social, sustainability-linked, sustainability og
              grønn obligasjon fra et oljeselskap
     s15 til s16, s30  de fire komponentene i Green Bond Principles
     s17 til s19  fem grunner til at obligasjoner betyr noe (forfall, shorting,
              engasjement)
     s20 til s22  Flammer (2021)
     s23      den globale markedsporteføljen (Gadzinski, Schuller og Vacchino)
     s24 til s25  eiendom: PRIs fire faser og BREEAM/LEED
     s26 til s28  derivater: ISDA-kategoriene, ING og SBM Offshore, HSBC og
              Siemens Gamesa
     s29      utstedelsesmønsteret (grønne obligasjoner størst)

   Kilder: fag/fie459/_fragmenter/k10.html, foilene til forelesning 10
   (_tekst/FIE459_H26_10_Non-equity_asset_classes.txt) og DNB-foilene for
   definisjonen av sustainability-linked bonds. EUs grønne obligasjonsstandard
   står på reguleringssiden, men merket er frivillig (allmenn bakgrunn).
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# Gjeld: begrenset oppside, ESG som nedsiderisiko
# ---------------------------------------------------------------------------
statisk(
    "bnd-s01", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about how a bondholder's payoff differs from a shareholder's and which ESG news therefore "
        "matters to her.",
        "Above the face value of the debt, debt holders receive what they were promised and the rest goes to the "
        "shareholders. Below it, the firm defaults and the debt holders take what is left.",
        "<p><b>Step 1: draw the two payoffs.</b> Where does the bondholder's payoff stop rising as the asset "
        "value grows?</p>"
        "<p><b>Step 2: place each piece of news.</b> Does it move the asset value in the region where the "
        "bondholder's payoff still changes, or in the region where it is flat?</p>",
    ),
    q="<p>Nordvik Shipping has a bond outstanding and listed shares. In the same week two pieces of news arrive. "
      "First, a new low-emission vessel design could double the firm's asset value. Second, a pending pollution "
      "lawsuit could cut its asset value to below the face value of its debt.</p>"
      "<p>Following the lecture's payoff logic, which news matters more to the bondholders and why?</p>",
    alternativer=[
        R("The lawsuit, since bondholders lose when assets fall below the debt but gain nothing above it"),
        F("The vessel design, since a higher asset value raises the coupon that the bondholders receive",
          "The coupon is fixed. Value above the face value goes to the shareholders, not to the bondholders."),
        F("Both equally, since bondholders and shareholders share the firm's gains and losses in proportion",
          "Debt and equity have different payoffs. The bondholder's payoff is capped at what she was promised."),
        F("Neither, since bondholders are paid first and so never bear any of the firm's losses",
          "Ranking first protects them only while the assets cover the debt. Below that the firm defaults."),
    ],
    kort="<p><b>The lawsuit.</b> A bondholder's payoff is capped at what she was promised, so the upside does "
         "little for her. A loss that pushes the assets below the debt hits her directly.</p>",
    full="<p><b>The payoff.</b> If the firm's asset value ends above the face value D, debt holders get D and the "
         "shareholders keep the rest. If it ends below D, the firm defaults and the debt holders take what is "
         "left. Their upside is capped; their downside is not (lecture 10).</p>"
         "<p><b>The case.</b> The vessel design lifts the asset value far above D. The bondholders were already "
         "going to be paid, so they gain little. The lawsuit could push the asset value below D, which is exactly "
         "the region where bondholders lose.</p>"
         "<p><b>The usual mix-up.</b> Treating bondholders like shareholders. The shareholder shares in the "
         "upside, so the vessel news matters most to her. That is why the lecture says ESG enters debt mainly "
         "as downside risk: default risk, loss given default and the rating.</p>"
         "<p><b>Remember:</b> for debt, ESG is a downside story.</p>",
)

statisk(
    "bnd-s02", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about how a change in risk reaches the price of a bond whose coupon is fixed.",
        "A bond's price is the present value of its coupons and face value, discounted at the yield to maturity. "
        "The yield reflects risk, which ratings summarise.",
        "<p><b>Step 1: what changed?</b> Did the bond's promised cash flows change, or did the risk change?</p>"
        "<p><b>Step 2: follow the chain.</b> Go from the risk to the yield investors require. Then go from the "
        "yield to the present value of the same cash flows.</p>"
        "<p><b>Step 3: check whether anything in an ordinary bond resets with the rating.</b></p>",
    ),
    q="<p>A rating agency downgrades Helio Chemicals after a series of safety failures at its plants. Helio's "
      "bonds pay a fixed coupon. Following the chain in lecture 10, what happens to the price of the bonds "
      "already in issue?</p>",
    alternativer=[
        R("It falls, since investors now require a higher yield to maturity for the higher risk"),
        F("It stays the same, since the coupon and face value are fixed in the contract",
          "The cash flows are fixed, but the price is their present value. The discount rate is what moves."),
        F("It rises, since the fixed coupon now looks generous next to the firm's higher risk",
          "More risk makes the same fixed cash flows worth less to an investor, not more."),
        F("It falls, since Helio must now cut its coupon to match its new rating",
          "The coupon on bonds already issued does not change with the rating."),
    ],
    kort="<p><b>The price falls.</b> The coupon is fixed, so the price moves with the yield. More risk means a "
         "higher required yield and a lower present value of the same cash flows.</p>",
    full="<p><b>The chain.</b> A bond's price is the present value of its coupons and face value, discounted at "
         "the yield to maturity. The coupon is fixed, so the price moves with the yield. The yield reflects risk. "
         "Risk is summarised in the rating (Schoenmaker &amp; Schramade 2019, lecture 10).</p>"
         "<p><b>The case.</b> The safety failures are an ESG problem that raises Helio's default risk. The agency "
         "downgrades the bonds. Investors now demand a higher yield to hold them, so they pay less for the same "
         "fixed cash flows.</p>"
         "<p><b>The usual mix-up.</b> Thinking a fixed coupon means a fixed price. The contract fixes the cash "
         "flows, not what the market will pay for them. Nor does the coupon of an ordinary bond reset with the "
         "rating. A coupon tied to targets is the sustainability-linked bond, a different product.</p>"
         "<p><b>Remember:</b> ESG problem, higher risk, higher yield, lower price.</p>",
)

statisk(
    "bnd-s03", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the corporate bond risk driver behind a loss in value.",
        "Lecture 10 lists four drivers of risk for corporate bonds: default risk, loss given default, liquidity "
        "risk and credit migration risk. Ask what has to happen for the analyst's loss to occur.",
        "<p><b>Step 1: does the analyst expect a missed payment?</b> If not, default risk and loss given default "
        "are not her worry.</p>"
        "<p><b>Step 2: find the event in the case that would lower the price.</b> Is it about selling the bond or "
        "about something an outside party might do?</p>",
    ),
    q="<p>A bond fund holds bonds from Ostrava Steel. The fund's analyst is not worried that Ostrava will default "
      "soon. She worries that weak climate plans will lead the agencies to cut the bonds' rating next year, so "
      "the bonds lose value even though every payment is made.</p>"
      "<p>Which of the lecture's corporate bond risk drivers is she describing?</p>",
    alternativer=[
        R("Credit migration risk: the risk that the bond's rating changes"),
        F("Default risk: the risk that the issuer fails to pay",
          "She expects every payment to be made. Her worry is a loss in value without a default."),
        F("Loss given default: how much is lost if the issuer defaults",
          "That matters only once the issuer has defaulted, which she does not expect."),
        F("Liquidity risk: the risk that the bond cannot be sold at a fair price",
          "Nothing in the case is about finding a buyer for the bonds."),
    ],
    kort="<p><b>Credit migration risk.</b> The loss comes from a rating change, not from a missed payment. A "
         "downgrade raises the yield investors require and lowers the price.</p>",
    full="<p><b>The four corporate drivers.</b> Lecture 10 lists the drivers of risk for corporate bonds: default "
         "risk (the issuer fails to pay), loss given default (how much is lost if it does), liquidity risk (the "
         "bond is hard to sell) and credit migration risk (the rating changes).</p>"
         "<p><b>The case.</b> The analyst expects Ostrava to pay. Her fear is a downgrade driven by an ESG issue, "
         "weak climate plans. A downgrade raises the required yield, so the price falls before anything is "
         "missed. That is credit migration.</p>"
         "<p><b>The usual mix-up.</b> Thinking ESG can hurt a bondholder only through default. A bond can lose "
         "value long before that, through its rating. The sovereign list (GDP, inflation, external debt, default "
         "history) is a different set and does not apply to a firm.</p>"
         "<p><b>Remember:</b> a rating change without a default is credit migration risk.</p>",
)

statisk(
    "bnd-s04", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about which part of a corporate bond's credit risk differs when two issuers are equally likely "
        "to fail.",
        "Default risk is how likely the issuer is to fail. Loss given default is how much is lost if it fails. "
        "Liquidity risk is about selling the bond and credit migration risk about its rating.",
        "<p><b>Step 1: strike what the case holds equal.</b> One driver is the same for both bonds by "
        "construction.</p>"
        "<p><b>Step 2: find what differs.</b> Is it the chance of a failure, the value of the assets after a "
        "failure, how easily the bonds trade or their rating?</p>",
    ),
    q="<p>Two bonds from different firms carry the same probability of default. The first is issued by a coal "
      "miner whose mines would fetch little if the firm failed, since buyers expect coal demand to shrink. The "
      "second is issued by a power grid operator whose assets would keep their value in a default.</p>"
      "<p>Which corporate bond risk driver makes the coal miner's bond riskier?</p>",
    alternativer=[
        R("Loss given default: bondholders recover less from assets that have lost value"),
        F("Default risk: a coal miner is more likely to fail than a grid operator",
          "The case sets the probability of default at the same level for both bonds."),
        F("Liquidity risk: coal bonds are harder to sell at a fair price",
          "Nothing in the case says how often the bonds trade or how hard they are to sell."),
        F("Credit migration risk: a falling coal price will lower the miner's rating",
          "The case describes no rating change. Read again what differs between the two bonds."),
    ],
    kort="<p><b>Loss given default.</b> The default probabilities are equal, so the difference is how much "
         "bondholders get back. Assets that lose value in a failure mean a larger loss.</p>",
    full="<p><b>Two parts of credit risk.</b> Default risk is how likely the issuer is to fail. Loss given "
         "default is how much the bondholder loses if it does, which depends on what the assets are worth then. "
         "Both are on lecture 10's list of corporate bond drivers, next to liquidity risk and credit migration "
         "risk.</p>"
         "<p><b>The case.</b> The question holds the default probability equal. What differs is the value of the "
         "assets in a default. Mines that buyers expect to lose value as coal demand shrinks would fetch little, "
         "so bondholders recover less. ESG enters through the size of the loss, not its likelihood.</p>"
         "<p><b>The usual mix-up.</b> Treating every ESG risk in debt as default risk. The lecture's point is that "
         "ESG works on the downside. The downside has two parts: how likely a loss is and how large it is.</p>"
         "<p><b>Remember:</b> same chance of default, different recovery: that is loss given default.</p>",
)

statisk(
    "bnd-s05", tema="obligasjoner", type="paastand",
    hjelp=hjelp3(
        "This is about which risk drivers lecture 10 gives for sovereign bonds and which for corporate bonds.",
        "The lecture gives two separate lists. One describes a country's economy and its record of paying. The "
        "other describes a single firm's credit risk.",
        "<p><b>Step 1: sort each driver named in the statements.</b> Is it about a national economy or about a "
        "single firm's credit?</p>"
        "<p><b>Step 2: check both halves of each statement.</b> One wrong half is enough to make the statement "
        "false.</p>",
    ),
    q="<p>Which statement about the drivers of bond risk in lecture 10 is correct?</p>",
    alternativer=[
        R("Inflation and default history drive sovereign bonds, while loss given default drives corporate ones"),
        F("Credit migration risk and liquidity drive sovereign bonds, while GDP growth drives corporate bonds",
          "This swaps the lists. GDP growth describes a national economy; credit migration and liquidity describe "
          "a firm's bonds."),
        F("The same drivers apply to both kinds of issuer, since a state and a firm both promise fixed coupons",
          "The lecture gives two separate lists, since states and firms run into trouble for different reasons."),
        F("External debt drives corporate bonds, while GDP per capita drives sovereign bonds",
          "External debt is on the sovereign list, not the corporate one."),
    ],
    kort="<p><b>Inflation and default history for sovereigns, loss given default for corporates.</b> Each "
         "kind of issuer has its own list, since states and firms run into trouble for different reasons.</p>",
    full="<p><b>The two lists.</b> For sovereign bonds lecture 10 lists GDP, GDP growth, GDP per capita, "
         "inflation, external debt and default history. For corporate bonds it lists default risk, loss given "
         "default, liquidity risk and credit migration risk. Both feed the same chain: risk sets the yield and the "
         "yield sets the price.</p>"
         "<p><b>Why the statement is right.</b> Inflation and default history are on the sovereign list. Loss "
         "given default is on the corporate list.</p>"
         "<p><b>The usual mix-up.</b> Mixing the lists: putting external debt or GDP growth under corporate bonds, "
         "or credit migration under sovereigns. A country's ability to pay depends on its economy and its record; "
         "a firm's on its default risk and on what bondholders recover.</p>"
         "<p><b>Remember:</b> sovereigns: the economy and the record. Corporates: default, loss, liquidity and "
         "migration.</p>",
)

# ---------------------------------------------------------------------------
# ESG i kredittratinger
# ---------------------------------------------------------------------------
statisk(
    "bnd-s06", tema="obligasjoner", type="paastand",
    hjelp=hjelp3(
        "This is about how ESG shows up in credit ratings, from S&amp;P's framework and the study lecture 10 "
        "cites.",
        "Check each claim against three things in lecture 10: the factors in S&amp;P's rating framework, the "
        "finding of Attig et al. and S&amp;P's own remark on ESG.",
        "<p><b>Step 1: which ESG pillar has a factor of its own in S&amp;P's framework?</b></p>"
        "<p><b>Step 2: what did Attig et al. find for firms with good social performance?</b> Higher or lower "
        "ratings?</p>"
        "<p><b>Step 3: strike every statement that gets one of these backwards.</b></p>",
    ),
    q="<p>Which statement about ESG and credit ratings matches lecture 10?</p>",
    alternativer=[
        R("Governance is a named S&amp;P factor, while social performance reaches ratings without a box"),
        F("S&amp;P's framework has a separate box for environmental and social risks next to governance",
          "Only management and governance is a named factor. E and S have no box of their own."),
        F("Attig et al. (2013) find that agencies award lower ratings to firms with good social performance",
          "This turns the direction of Attig et al.'s finding upside down."),
        F("S&amp;P says the open question is whether ESG factors affect credit ratings at all",
          "S&amp;P puts the question the other way round."),
    ],
    kort="<p><b>Governance is named; social performance still counts.</b> S&amp;P lists management and "
         "governance as a factor. Attig et al. (2013) find relatively high ratings for firms with good social "
         "performance.</p>",
    full="<p><b>The framework.</b> S&amp;P Global Ratings builds a corporate rating from country risk, industry "
         "risk, competitive position and cash flow/leverage. It then adjusts for factors such as financial policy, "
         "liquidity and management/governance. Last comes group or government influence. Governance is the only "
         "ESG pillar with a box.</p>"
         "<p><b>E and S still matter.</b> Attig, El Ghoul, Guedhami &amp; Suh (2013) find that agencies tend to "
         "award relatively high ratings to firms with good social performance. The components tied to primary "
         "stakeholders matter most. S&amp;P itself says the question is not if ESG factors affect ratings, but "
         "how.</p>"
         "<p><b>The usual mix-up.</b> Reading the missing boxes as proof that E and S do not count. The evidence "
         "and S&amp;P's own words say they do.</p>"
         "<p><b>Remember:</b> G has a box; E and S reach ratings anyway.</p>",
)

statisk(
    "bnd-s07", tema="obligasjoner", type="fakta",
    hjelp=hjelp3(
        "This is about the finding of Attig et al. on social performance and credit ratings.",
        "The study asks two things: do rating agencies reward or penalise CSR? Which CSR components "
        "matter most for the rating?",
        "<p><b>Step 1: recall the direction.</b> Do agencies tend to reward or penalise good social "
        "performance?</p>"
        "<p><b>Step 2: look at what the case varies.</b> Employee relations, community relations and product "
        "quality. Does the study count such components, or does it look at one pillar only?</p>",
    ),
    q="<p>Two firms are alike in size, leverage and industry. The first has strong employee relations, strong "
      "community relations and high product quality. The second is weak on all three. According to Attig et al. "
      "(2013), how are credit rating agencies likely to treat the two?</p>",
    alternativer=[
        R("The first tends to get a higher rating, since CSR towards primary stakeholders matters most"),
        F("Both get the same rating, since agencies rate only financial factors such as cash flow and leverage",
          "Attig et al. find that social performance does reach credit ratings."),
        F("The second tends to get a higher rating, since it spends less on CSR and keeps more cash for creditors",
          "This reverses the direction of the finding."),
        F("The first gets a higher rating only if its environmental score is also strong, since E is all they weigh",
          "Agencies do not weigh the environment alone. Employee and community relations count in the results "
          "too."),
    ],
    kort="<p><b>The first firm tends to get a relatively higher rating.</b> Attig et al. (2013) find that "
         "agencies reward good social performance, most of all the components tied to primary stakeholders.</p>",
    full="<p><b>The finding.</b> Attig, El Ghoul, Guedhami &amp; Suh (2013) find that credit rating agencies tend "
         "to award relatively high ratings to firms with good social performance. The CSR components tied to "
         "primary stakeholders matter most: community relations, diversity, employee relations, environmental "
         "performance and product characteristics.</p>"
         "<p><b>The case.</b> The two firms differ only in employee relations, community relations and product "
         "quality. All three are primary-stakeholder components, so the first firm should tend to get the better "
         "rating.</p>"
         "<p><b>The link to debt.</b> Lecture 10 argues that ESG reaches bonds through risk. S&amp;P says the "
         "question is not if ESG affects ratings, but how. Attig et al. give evidence that it does.</p>"
         "<p><b>The usual mix-up.</b> Thinking CSR is a cost that creditors dislike, or that only the E pillar "
         "counts. The evidence points the other way on both.</p>"
         "<p><b>Remember:</b> good social performance, relatively higher rating (Attig et al. 2013).</p>",
)

# ---------------------------------------------------------------------------
# Schoenmaker og Schramades tabell: stat, selskap eller begge
# ---------------------------------------------------------------------------
statisk(
    "bnd-s08", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker &amp; Schramade's table that sorts the ESG issues relevant to bonds by type "
        "of issuer.",
        "The table has three columns: corporate and sovereign, mostly sovereign and mostly corporate. An issue "
        "belongs to the sovereign column when it describes a country as a whole.",
        "<p><b>Step 1: for each pair, ask who it describes.</b> A whole country, a single firm or both kinds of "
        "issuer?</p>"
        "<p><b>Step 2: keep the pair that only makes sense for a country.</b> Check that it is not one of the "
        "issues that matter for every issuer.</p>",
    ),
    q="<p>An analyst covers the government bonds of an emerging economy. Following Schoenmaker &amp; "
      "Schramade's table of ESG issues relevant to bonds, which pair of issues matters mostly for her sovereign "
      "issuer rather than for corporate issuers?</p>",
    alternativer=[
        R("Regime stability and civil liberties"),
        F("Board expertise and independent directors",
          "These are about a firm's board. The table puts them in the mostly corporate column."),
        F("Climate change and biodiversity",
          "These sit in the shared column: they matter for corporate and sovereign issuers alike."),
        F("Product responsibility and consumer relations",
          "These concern what a firm sells. The table puts them in the mostly corporate column."),
    ],
    kort="<p><b>Regime stability and civil liberties.</b> For a country, governance means its institutions: "
         "corruption, rule of law and regime stability. These have no counterpart inside a firm.</p>",
    full="<p><b>The table.</b> Schoenmaker &amp; Schramade (2019) sort the ESG issues relevant to bonds into three "
         "columns: issues for both corporate and sovereign issuers, issues mostly for sovereigns and issues mostly "
         "for corporates.</p>"
         "<p><b>The case.</b> The analyst holds government bonds. Regime stability and civil liberties are in the "
         "G row of the mostly sovereign column, next to institutional strength, corruption, rule of law and "
         "regulatory quality. A state's ability to pay depends on them.</p>"
         "<p><b>The usual mix-up.</b> Thinking G means the same for a state and a firm. For a firm, G is "
         "shareholder rights, incentives, audit, board expertise and independent directors. E and S split the same "
         "way: natural disasters and demographic change are mostly sovereign, product stewardship and consumer "
         "relations mostly corporate. Climate change and biodiversity are in the shared column.</p>"
         "<p><b>Remember:</b> a country's governance is its institutions; a firm's governance is its board.</p>",
)

statisk(
    "bnd-s09", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about where a product-related environmental issue sits in Schoenmaker &amp; Schramade's table "
        "of ESG issues for bonds.",
        "Each column of the table has its own E, S and G issues. Ask whether the issue describes a country, a "
        "single firm or both kinds of issuer.",
        "<p><b>Step 1: who does the issue describe?</b> Could a government do it, or only a firm that makes and "
        "sells things?</p>"
        "<p><b>Step 2: check the shared column.</b> Is taking back used products among the environmental issues "
        "that matter for every issuer?</p>",
    ),
    q="<p>A credit analyst reviews a consumer electronics maker's bonds. She focuses on whether the firm takes "
      "back and recycles its used products. In Schoenmaker &amp; Schramade's table of ESG issues relevant to "
      "bonds, where does this issue sit?</p>",
    alternativer=[
        R("In the mostly corporate column, as product stewardship and redemption of used products"),
        F("In the mostly sovereign column, next to natural disasters and land system change",
          "Those E issues describe a country's territory. Taking back used products is something a firm does."),
        F("In the shared column, next to climate change and natural resources",
          "The shared E issues are climate change, biodiversity, energy, pollution and natural resources. Product "
          "take-back is not among them."),
        F("Nowhere, since the table covers only governance issues for credit risk",
          "The table has E, S and G rows in every column."),
    ],
    kort="<p><b>Mostly corporate.</b> Product stewardship and the redemption of used products are about what a "
         "firm makes and sells, so the table puts them in the corporate column.</p>",
    full="<p><b>The table.</b> Schoenmaker &amp; Schramade (2019) sort the ESG issues relevant to bonds by type of "
         "issuer. Each column has E, S and G issues. The shared column holds climate change, biodiversity, energy, "
         "pollution, natural resources, human rights, education, health and safety, financial policy and "
         "accounting standards.</p>"
         "<p><b>The case.</b> Taking back and recycling used products is product stewardship and the redemption of "
         "used products: the E issues of the mostly corporate column. A state does not sell electronics.</p>"
         "<p><b>The usual mix-up.</b> Assuming every environmental issue matters for every issuer. The E row also "
         "splits: natural disasters and land system change are mostly sovereign, product stewardship mostly "
         "corporate. The same split holds for S and G.</p>"
         "<p><b>Remember:</b> issues about products and boards are corporate; issues about territory and "
         "institutions are sovereign.</p>",
)

# ---------------------------------------------------------------------------
# Rammeverkene: ICMA mot EU
# ---------------------------------------------------------------------------
statisk(
    "bnd-s10", tema="obligasjoner", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the frameworks for labelled bonds: ICMA's voluntary principles and the EU's European Green "
        "Bond Standard.",
        "Lecture 10 splits the frameworks into voluntary principles from one body and regulation from another.",
        "<p><b>Step 1: count ICMA's sets of principles.</b> Which kinds of bond do they cover?</p>"
        "<p><b>Step 2: ask who issues the European Green Bond Standard.</b> On which side of the slide does the "
        "lecture put it?</p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements about the frameworks for labelled bonds in lecture 10.</p>"
      "<p>I. The International Capital Market Association (ICMA) publishes four voluntary sets of principles, "
      "among them the Sustainability-Linked Bond Principles.<br>"
      "II. The European Green Bond Standard is one of ICMA's voluntary sets, next to the Green Bond "
      "Principles.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: the European Green Bond Standard comes from the EU, not from ICMA."),
        F("Both I and II", "Statement II fails: the lecture puts the EU standard on the regulation side, apart "
                           "from ICMA's sets."),
        F("Neither I nor II", "Count ICMA's sets: green, social, sustainability and sustainability-linked. Is "
                              "statement I really wrong?"),
    ],
    kort="<p><b>Only I.</b> ICMA has four voluntary sets. The European Green Bond Standard is the EU's and sits on "
         "the regulation side of the slide, although issuers choose whether to use its label.</p>",
    full="<p><b>Statement I.</b> ICMA publishes four voluntary sets: the Green Bond Principles (GBP), the Social Bond "
         "Principles (SBP), the Sustainability Bond Guidelines (SBG) and the Sustainability-Linked Bond Principles "
         "(SLBP). The statement is correct.</p>"
         "<p><b>Statement II.</b> The slide lists the EU's European Green Bond Standard under «Regulation», apart "
         "from ICMA's sets. It is not an ICMA framework. It is EU law, but issuers choose whether to use the label "
         "(general background). The statement is false.</p>"
         "<p><b>The usual mix-up.</b> Two traps sit close together: calling the EU standard ICMA's fifth set and "
         "treating it as a rule that every green bond must follow. Both are wrong.</p>"
         "<p><b>Remember:</b> ICMA: four voluntary sets. EU standard: regulation, but a voluntary label.</p>",
)

# ---------------------------------------------------------------------------
# Klassifisering av merkede obligasjoner
# ---------------------------------------------------------------------------
statisk(
    "bnd-s11", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying a labelled bond by what is tied to sustainability: where the money goes or "
        "what it costs.",
        "Green, social and sustainability bonds earmark the proceeds for eligible projects. A sustainability-linked "
        "bond earmarks nothing and ties its financial terms to targets.",
        "<p><b>Step 1: is the money earmarked?</b> If not, it is not a use-of-proceeds bond.</p>"
        "<p><b>Step 2: if it is, what do the funded projects deliver?</b> An environmental benefit, a social "
        "outcome or both?</p>"
        "<p><b>Step 3: check whether any term of the bond moves with a target.</b></p>",
    ),
    q="<p>A county council issues a bond. The legal documentation says that the proceeds go only to new school "
      "buildings and to health clinics in low-income areas. The coupon is fixed and does not depend on any "
      "target.</p>"
      "<p>Which ICMA set of principles should this bond follow?</p>",
    alternativer=[
        R("The Social Bond Principles, since the proceeds fund projects with positive social outcomes"),
        F("The Sustainability Bond Guidelines, since schools and clinics serve sustainable development",
          "Sustainability bonds fund a combination of green and social projects. No green project is funded "
          "here."),
        F("The Green Bond Principles, since new public buildings also bring environmental benefits",
          "The documentation names schools and clinics for low-income areas. Nothing is earmarked for an "
          "environmental benefit."),
        F("The Sustainability-Linked Bond Principles, since the council's social goals are linked to the bond",
          "A sustainability-linked bond ties its financial terms to targets. This coupon is fixed."),
    ],
    kort="<p><b>The Social Bond Principles.</b> The proceeds are earmarked for social projects only. That makes "
         "it a social bond, one of the use-of-proceeds bonds.</p>",
    full="<p><b>Four families.</b> ICMA's voluntary principles cover green bonds (GBP), social bonds (SBP), "
         "sustainability bonds (SBG) and sustainability-linked bonds (SLBP). The first three are use-of-proceeds "
         "bonds: the money is earmarked. Green bonds fund environmental projects. Social bonds fund projects with "
         "positive social outcomes. Sustainability bonds fund a combination of green and social projects. A "
         "sustainability-linked bond earmarks nothing; its coupon is tied to targets.</p>"
         "<p><b>The case.</b> The money goes to schools and clinics in low-income areas. Both are social projects "
         "and nothing is green. The coupon is fixed, so nothing is linked to targets.</p>"
         "<p><b>The usual mix-up.</b> Calling any bond with a good cause a sustainability bond. That label needs "
         "both green and social projects. Ask two questions: is the money earmarked? If it is, for what kind of "
         "project?</p>"
         "<p><b>Remember:</b> earmarked for social projects only: social bond.</p>",
)

statisk(
    "bnd-s12", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about which of ICMA's four families a bond belongs to when its proceeds are free to use.",
        "Ask what is tied to sustainability. In three families it is the use of the money. In the fourth it is "
        "a financial term of the bond.",
        "<p><b>Step 1: are the proceeds earmarked?</b> Read the prospectus terms in the case.</p>"
        "<p><b>Step 2: what changes if the firm misses its target?</b> Which family ties that feature to "
        "sustainability?</p>"
        "<p><b>Step 3: judge the investor's claim against the four families, not only the first three.</b></p>",
    ),
    q="<p>Kalksten Cement issues a five-year bond. The prospectus lets Kalksten use the money for any purpose. If "
      "the firm has not cut the CO<sub>2</sub> intensity of its cement by an agreed amount by year three, the "
      "coupon steps up for the remaining years.</p>"
      "<p>An investor argues that the bond cannot carry a sustainability label, since the money may fund a new "
      "kiln. Is she right?</p>",
    alternativer=[
        R("No: it is a sustainability-linked bond, which ties the coupon to a target and earmarks nothing"),
        F("Yes: a bond earns a sustainability label only if its proceeds go to eligible green or social projects",
          "That rule covers only three of ICMA's four sets. One set ties a different feature of the bond to "
          "sustainability."),
        F("No: it is a green bond, since its only target is environmental",
          "A green bond earmarks the proceeds for green projects. Here the money can go anywhere."),
        F("No: it is a sustainability bond, since it mixes a general purpose with a green target",
          "A sustainability bond funds a mix of green and social projects. Nothing here is earmarked."),
    ],
    kort="<p><b>She is wrong: it is a sustainability-linked bond.</b> The proceeds are free to use. What is "
         "tied to sustainability is the coupon, through a CO<sub>2</sub> target.</p>",
    full="<p><b>Two families.</b> Use-of-proceeds bonds (green, social and sustainability) earmark the money. A "
         "sustainability-linked bond is a general corporate purpose bond whose financial terms, typically the "
         "coupon, are linked to sustainability performance targets (lecture 10 and the DNB guest lecture). ICMA "
         "covers it with the Sustainability-Linked Bond Principles.</p>"
         "<p><b>The case.</b> Kalksten may spend the money on anything, a new kiln included. The coupon steps up "
         "if the CO<sub>2</sub> target is missed. The label rests on the target, not on the use of the money.</p>"
         "<p><b>The usual mix-up.</b> Thinking a green target makes a green bond. A green bond is defined by where "
         "the money goes. Here the incentive works through the price instead: missing the target costs Kalksten "
         "money.</p>"
         "<p><b>Remember:</b> money free, coupon tied to targets: sustainability-linked bond.</p>",
)

statisk(
    "bnd-s13", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying a use-of-proceeds bond by the kinds of project it funds.",
        "Green bonds fund environmental projects, social bonds social projects and sustainability bonds a "
        "combination of the two. A sustainability-linked bond earmarks nothing.",
        "<p><b>Step 1: is the money earmarked?</b> Look at what the framework commits the proceeds to.</p>"
        "<p><b>Step 2: sort each programme.</b> Is it environmental, social or neither?</p>"
        "<p><b>Step 3: pick the label that covers all of the funded projects.</b> Treat annual reporting as a "
        "separate feature.</p>",
    ),
    q="<p>A city issues a bond. Its framework commits all the proceeds to two programmes: electric buses that "
      "replace diesel buses and job training for the long-term unemployed. A sub-account tracks the money and "
      "the city reports each year on how it was spent.</p>"
      "<p>Which label fits best?</p>",
    alternativer=[
        R("A sustainability bond, since the proceeds fund a combination of green and social projects"),
        F("A green bond, since buses are environmental and the money is tracked",
          "A green bond's proceeds go exclusively to green projects. Job training is not one."),
        F("A social bond, since the city is a public issuer serving its residents",
          "The label depends on the projects, not on who issues the bond."),
        F("A sustainability-linked bond, since the city reports each year on the programmes",
          "A linked bond ties its coupon to targets, which this one does not. Reporting alone says nothing about "
          "the family."),
    ],
    kort="<p><b>A sustainability bond.</b> The money is earmarked for a green programme and a social one. The "
         "Sustainability Bond Guidelines cover exactly that combination.</p>",
    full="<p><b>The rule.</b> Green, social and sustainability bonds are all use-of-proceeds bonds. A "
         "sustainability bond applies the proceeds exclusively to a combination of green and social projects "
         "(Sustainalytics 2019, lecture 10). ICMA's Sustainability Bond Guidelines cover it.</p>"
         "<p><b>The case.</b> Electric buses that replace diesel buses bring an environmental benefit. Job "
         "training for the long-term unemployed is a social outcome. All the money is earmarked for the two, so "
         "the bond is a sustainability bond.</p>"
         "<p><b>The usual mix-up.</b> Treating annual reporting as the mark of a sustainability-linked bond. "
         "Reporting on the use of proceeds is one of the four components of the Green Bond Principles. A linked "
         "bond is told apart by its terms: the coupon moves with targets and the money is not earmarked.</p>"
         "<p><b>Remember:</b> green plus social, earmarked: sustainability bond.</p>",
)

statisk(
    "bnd-s14", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about what makes a bond green under the Green Bond Principles and whether the issuer's business "
        "matters.",
        "The Green Bond Principles have four components: use of proceeds, project evaluation and selection, "
        "management of proceeds and reporting.",
        "<p><b>Step 1: check each of the four components against the case.</b> Is the money earmarked, tracked "
        "and reported on?</p>"
        "<p><b>Step 2: ask whether any component is about the issuer's main business.</b></p>"
        "<p><b>Step 3: check what kind of project is funded and whether anything moves with a target.</b></p>",
    ),
    q="<p>Petronord, an oil producer, issues a bond. Its terms commit every krone raised to building a solar park. "
      "The money sits in a separate, tracked account and Petronord will tell investors each year how it was spent. "
      "Oil still brings in most of Petronord's revenue.</p>"
      "<p>Which statement is correct?</p>",
    alternativer=[
        R("It can be a green bond: the four components concern the money, not the issuer's main business"),
        F("It cannot be a green bond: the principles also require the issuer's main business to be green",
          "None of the four components of the Green Bond Principles is about the issuer's main business."),
        F("It is a sustainability-linked bond: the proceeds are tied to a target that the issuer must meet",
          "A linked bond earmarks nothing and ties its coupon to targets. Here nothing moves with a target."),
        F("It is a sustainability bond: the solar park serves both the climate and the local households",
          "A sustainability bond funds a combination of green and social projects. One solar park is a single "
          "green project."),
    ],
    kort="<p><b>It can be a green bond.</b> The Green Bond Principles look at the use of proceeds, their selection, "
         "their management and reporting. Who issues does not decide the label.</p>",
    full="<p><b>What the label ties.</b> A green bond ties the use of the money: the proceeds go exclusively to green "
         "projects described in the legal documentation. The Green Bond Principles add project evaluation and "
         "selection, management of proceeds in a tracked sub-account and mandatory reporting on the use of "
         "proceeds.</p>"
         "<p><b>The case.</b> Petronord meets all four: the solar park is green, the terms say so, the money is "
         "tracked and Petronord reports. Its oil business does not change the classification of this bond.</p>"
         "<p><b>The usual mix-up.</b> Reading the label as a verdict on the issuer. A green bond says how one pool of "
         "money is spent, not how green the firm is. Lecture 11 draws the same line for loans: a green loan can go "
         "to a polluting firm for one clean project.</p>"
         "<p><b>Remember:</b> the label tells you what is tied, not how green the issuer is.</p>",
)

# ---------------------------------------------------------------------------
# Green Bond Principles (2017): de fire komponentene
# ---------------------------------------------------------------------------
statisk(
    "bnd-s15", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about the four components of ICMA's Green Bond Principles and what each one asks of the issuer.",
        "Each of the four components answers a different question about the money: what it may fund, how "
        "projects are chosen, how it is handled and what investors are told.",
        "<p><b>Step 1: what is the treasury team building?</b> A list of eligible projects, a set of criteria, "
        "an account with a tracking system or a report?</p>"
        "<p><b>Step 2: match it to the component that answers that question.</b> Keep in mind that reporting "
        "comes after the money has been spent.</p>",
    ),
    q="<p>A Danish utility prepares its first green bond. Its treasury team sets up a separate sub-account for the "
      "net proceeds and a system to track and verify every payment from it to the eligible projects.</p>"
      "<p>Which component of the Green Bond Principles (2017) is the team working on?</p>",
    alternativer=[
        R("Management of proceeds"),
        F("Use of proceeds",
          "Use of proceeds is about which projects the money may fund, set out in the legal documentation. The "
          "team is not choosing projects."),
        F("Project evaluation and selection",
          "That component tells investors the environmental objectives and the eligibility criteria. The team is "
          "not setting criteria."),
        F("Reporting",
          "Reporting tells investors afterwards how the money was used. The team is building something that "
          "comes before that."),
    ],
    kort="<p><b>Management of proceeds.</b> The net proceeds go to a sub-account and are tracked and verified. "
         "That is how the issuer shows the money really reaches green projects.</p>",
    full="<p><b>The four components.</b> The Green Bond Principles (2017) have four parts. Use of proceeds: the "
         "money goes exclusively to green projects named in the legal documentation. Project evaluation and "
         "selection: the issuer tells investors its environmental objectives, how projects fit the eligible "
         "categories and the criteria. Management of proceeds: the net proceeds go to a sub-account and are "
         "tracked and verified. Reporting: mandatory, on the use of the proceeds.</p>"
         "<p><b>The case.</b> A sub-account and a system to track and verify the payments is management of "
         "proceeds.</p>"
         "<p><b>The usual mix-up.</b> Confusing management with reporting. Management is how the money is held "
         "and followed while it is spent. Reporting is what the issuer tells investors about it afterwards.</p>"
         "<p><b>Remember:</b> what it funds, how projects are chosen, how the money is held, what is reported: the "
         "four GBP components.</p>",
)

statisk(
    "bnd-s16", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about matching an issuer's document to one of the four components of the Green Bond Principles.",
        "One component covers the green projects named in the legal documentation, one how projects are judged "
        "against criteria, one how the money is held and one what is reported afterwards.",
        "<p><b>Step 1: list what the framework tells investors.</b> Objectives, a process and criteria.</p>"
        "<p><b>Step 2: is it about the money or about how projects qualify?</b></p>"
        "<p><b>Step 3: check that each remaining option is a component of ICMA's principles at all.</b></p>",
    ),
    q="<p>Before issuing a green bond, a property company publishes a framework. It tells investors the "
      "environmental objectives the bond serves, the process for deciding whether a building fits an eligible "
      "category and the eligibility criteria, such as a BREEAM rating.</p>"
      "<p>Which part of the green bond rules does this framework mainly address?</p>",
    alternativer=[
        R("Project evaluation and selection under the Green Bond Principles"),
        F("Management of proceeds under the Green Bond Principles",
          "That component is about holding and tracking the money in a sub-account. Nothing here concerns an "
          "account."),
        F("Reporting under the Green Bond Principles",
          "Reporting comes after issuance and covers how the money was used. This framework is published "
          "before."),
        F("Certification of the bond by the EU under the European Green Bond Standard",
          "The EU standard is a separate framework on the regulation side, not a component of ICMA's principles."),
    ],
    kort="<p><b>Project evaluation and selection.</b> The issuer tells investors its environmental objectives, "
         "how projects are matched to eligible categories and the criteria they must meet.</p>",
    full="<p><b>The component.</b> Under the Green Bond Principles (2017), project evaluation and selection means "
         "telling investors three things: the environmental objectives, the process for matching projects to "
         "eligible categories and the eligibility criteria. It lets investors judge which projects their money "
         "can reach.</p>"
         "<p><b>The case.</b> The framework sets out the objectives, the process and criteria such as a BREEAM "
         "rating. That is evaluation and selection.</p>"
         "<p><b>The usual mix-up.</b> Thinking every green bond document is about reporting. Reporting is "
         "mandatory but comes later: it shows how the proceeds were used. Management of proceeds is the tracked "
         "sub-account. The European Green Bond Standard is a separate EU framework on the regulation side, not "
         "one of ICMA's components.</p>"
         "<p><b>Remember:</b> objectives, process and criteria: project evaluation and selection.</p>",
)

# ---------------------------------------------------------------------------
# Fem grunner til at obligasjoner betyr noe
# ---------------------------------------------------------------------------
statisk(
    "bnd-s17", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about the five reasons lecture 10 gives for why bonds matter for sustainability.",
        "The five reasons are maturity, market size, shorting «bad» bonds, engagement and signaling. Ask what "
        "gives the investors their leverage in the case.",
        "<p><b>Step 1: what event is coming up for the firm?</b> Look at the timing in the case.</p>"
        "<p><b>Step 2: why does that event give bond investors a say?</b> Shares have no such event.</p>"
        "<p><b>Step 3: match it to one of the five reasons.</b></p>",
    ),
    q="<p>Bjørnfjell Aluminium must repay a large bond in eighteen months and plans to issue a new one to replace "
      "it. Several bond investors tell the firm they will only buy the new bond if it comes with a credible plan "
      "to cut emissions.</p>"
      "<p>Which of the lecture's reasons why bonds matter for sustainability does this illustrate?</p>",
    alternativer=[
        R("Maturity: bonds expire, so issuers must refinance and investors can set terms"),
        F("Signaling: issuing a green bond tells investors the firm is committed",
          "The investors are setting conditions. The firm is not using a bond label to signal anything."),
        F("Short «bad» bonds: investors bet against a firm's bonds",
          "No investor is betting against Bjørnfjell. They are setting conditions for a purchase."),
        F("Market size: the bond market is larger than the equity market",
          "Market size explains why bonds matter in general, not what gives these investors leverage now."),
    ],
    kort="<p><b>Maturity.</b> The bond expires, so Bjørnfjell must come back to the market. At the refinancing, "
         "investors can set terms, here a credible emission plan.</p>",
    full="<p><b>Five reasons.</b> Lecture 10 gives five reasons bonds matter for sustainability: maturity (issuers "
         "must refinance), market size (the bond market is larger than the equity market), short «bad» bonds, "
         "engagement and signaling.</p>"
         "<p><b>The case.</b> Shares never mature, but bonds do. Bjørnfjell has to replace a maturing bond, so it "
         "needs new buyers. That gives bond investors a recurring moment of power: they can make the purchase "
         "conditional on a transition plan.</p>"
         "<p><b>The usual mix-up.</b> Calling every investor demand engagement. Engagement is dialogue with an "
         "issuer at any time. Here the lever is the deadline the maturity creates. Signaling is the issuer's choice "
         "of a green label, which does not happen here.</p>"
         "<p><b>Remember:</b> bonds expire, so every refinancing is a chance to set terms.</p>",
)

statisk(
    "bnd-s18", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about the five reasons bonds matter for sustainability, applied to an investor that holds none "
        "of the bonds.",
        "The five reasons are maturity, market size, shorting «bad» bonds, engagement and signaling.",
        "<p><b>Step 1: what does the hedge fund actually do with the bonds?</b> It neither holds them nor "
        "issues them.</p>"
        "<p><b>Step 2: which of the five reasons describes that kind of trade?</b></p>"
        "<p><b>Step 3: check how the firm responds.</b> The lecture has a real case with the same response.</p>",
    ),
    q="<p>A hedge fund believes that Zarco Mining hides serious environmental liabilities. It owns no Zarco bonds, "
      "but borrows them and sells them, hoping to buy them back later at a lower price. Under the pressure, "
      "Zarco cuts its capital spending and buys back some of its bonds to shore up confidence.</p>"
      "<p>Which of the lecture's reasons why bonds matter for sustainability does this illustrate?</p>",
    alternativer=[
        R("Short «bad» bonds: investors can bet against the bonds of firms they see as bad"),
        F("Engagement: bondholders talk to the issuer about its environmental record",
          "The fund owns no bonds and does not talk to Zarco."),
        F("Maturity: the issuer must refinance, so investors can set terms",
          "No bond is maturing and no refinancing takes place in the case."),
        F("Signaling: the bond buyback tells the market Zarco is committed to the environment",
          "The buyback is meant to shore up confidence under pressure, not to signal an environmental "
          "commitment."),
    ],
    kort="<p><b>Short «bad» bonds.</b> Investors can short the bonds of firms they see as bad. The FT case in "
         "lecture 10: after a short-seller attack, Adani trimmed capital expenditure and bought back bonds.</p>",
    full="<p><b>The reason.</b> Shorting means selling a security you have borrowed and buying it back later; if "
         "the price falls, the short seller gains. Lecture 10 lists the option to short «bad» bonds among its "
         "five reasons bonds matter. It lets investors put pressure on firms they see as bad without owning "
         "them.</p>"
         "<p><b>The case.</b> The fund borrows and sells Zarco's bonds because it suspects hidden environmental "
         "liabilities. The pressure changes Zarco's behaviour: lower capital spending and a bond buyback. That "
         "mirrors the Adani case from the Financial Times.</p>"
         "<p><b>The usual mix-up.</b> Confusing shorting with engagement. Engagement is a dialogue between a "
         "bondholder and the issuer. A short seller owns nothing and talks to no one; it acts through the "
         "price.</p>"
         "<p><b>Remember:</b> shorting bad bonds is pressure through the price, without owning the bond.</p>",
)

statisk(
    "bnd-s19", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about the five reasons bonds matter for sustainability, applied to a bondholder that wants a "
        "firm to change.",
        "The five reasons are maturity, market size, shorting «bad» bonds, engagement and signaling. Each needs "
        "a different situation.",
        "<p><b>Step 1: list what is not happening in the case.</b> Is a bond maturing, being issued or being "
        "shorted?</p>"
        "<p><b>Step 2: name what the fund is doing.</b> It holds the bond and meets the finance director.</p>"
        "<p><b>Step 3: match that activity to one of the five reasons.</b></p>",
    ),
    q="<p>A pension fund holds a ten-year bond issued last year by Vestgas, a gas distributor. No refinancing is "
      "due for years. The fund's credit team meets Vestgas's finance director to press for a target on methane "
      "leaks and promises to follow up every quarter.</p>"
      "<p>Which of the lecture's reasons why bonds matter for sustainability does this illustrate?</p>",
    alternativer=[
        R("Engagement: bondholders, not only shareholders, can engage with issuers"),
        F("Maturity: bonds expire, so investors can set terms when the issuer refinances",
          "The case says no refinancing is due for years."),
        F("Signaling: by holding the bond, the fund signals its commitment to the climate",
          "In the lecture, signaling is about the issuer of a green bond, not about the investor."),
        F("Market size: the bond market is larger than the equity market, so bondholders matter",
          "Market size says why bonds matter in general. It does not describe what the fund does here."),
    ],
    kort="<p><b>Engagement.</b> The fund holds the bond and uses dialogue with the issuer to push for a methane "
         "target. Bondholders can engage too, not only shareholders.</p>",
    full="<p><b>The reason.</b> Engagement is often seen as a shareholder tool: owners vote and talk to "
         "management. Lecture 10 stresses that bondholders can engage with issuers too. A firm that depends on the "
         "bond market has reason to listen to the investors who buy its debt.</p>"
         "<p><b>The case.</b> The fund meets the finance director, asks for a target and plans to follow up. No "
         "refinancing is near, no bond is being issued and no one is shorting. It is plain engagement.</p>"
         "<p><b>The usual mix-up.</b> Confusing engagement with maturity. Maturity is a lever that comes with a "
         "date: at refinancing, investors can set terms. Engagement works between those dates. Signaling belongs "
         "to the issuer, which can signal commitment by issuing a green bond.</p>"
         "<p><b>Remember:</b> bondholders can engage too, not only shareholders.</p>",
)

# ---------------------------------------------------------------------------
# Flammer (2021)
# ---------------------------------------------------------------------------
statisk(
    "bnd-s20", tema="obligasjoner", type="fakta",
    hjelp=hjelp3(
        "This is about the main findings of Flammer's study of corporate green bonds.",
        "Flammer looks at three things: the share price reaction at announcement, the issuer's environmental "
        "performance afterwards and who owns the firm afterwards.",
        "<p><b>Step 1: what exactly does the journalist claim?</b> That something does not change after a firm "
        "issues a green bond.</p>"
        "<p><b>Step 2: find the finding that measures that very thing.</b></p>"
        "<p><b>Step 3: strike findings that belong to another lecture or that reverse Flammer's results.</b></p>",
    ),
    q="<p>A journalist argues that corporate green bonds are only marketing: firms relabel debt they would have "
      "issued anyway and nothing changes in how they operate. Which finding of Flammer (2021) speaks most "
      "directly against this claim?</p>",
    alternativer=[
        R("After issuing, firms improve their environmental ratings and cut their CO<sub>2</sub> emissions"),
        F("Green bonds pay a lower yield than the issuer's conventional bonds",
          "A lower yield is the greenium of lecture 9, not Flammer's finding. It would say nothing about how firms "
          "operate."),
        F("Share prices fall at announcement, since investors see through the label",
          "Flammer finds the opposite reaction at announcement."),
        F("Most green bonds come from firms that already rate highest on the environment",
          "Flammer's results are about what happens after issuance, not about which firms issue."),
    ],
    kort="<p><b>Environmental performance improves after issuance.</b> Higher environmental ratings and lower "
         "CO<sub>2</sub> emissions show that something real changes in how issuers operate.</p>",
    full="<p><b>The study.</b> Flammer (2021), «Corporate green bonds», asks whether green bonds are a credible "
         "signal or greenwashing. Investors respond positively to the announcement, most of all for first-time "
         "issuers and bonds certified by third parties. After issuance, issuers improve their environmental "
         "performance: higher environmental ratings and lower CO<sub>2</sub> emissions. Ownership by long-term "
         "and green investors rises. She reads this as signaling.</p>"
         "<p><b>The case.</b> The journalist claims that nothing changes in operations. The improvement in ratings "
         "and emissions after issuance is evidence that something does.</p>"
         "<p><b>The usual mix-up.</b> Citing the greenium. A lower yield is about pricing (lecture 9). Flammer's "
         "evidence is about share prices, environmental performance and the investor base. It is not a claim "
         "that green bonds give cheaper funding.</p>"
         "<p><b>Remember:</b> after a green bond, issuers get greener: better ratings, lower emissions.</p>",
)

statisk(
    "bnd-s21", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about which green bond announcements get the strongest stock market reaction in Flammer's "
        "study and why.",
        "A signal is worth most when it tells investors something new and when it is hard to fake.",
        "<p><b>Step 1: for each firm, ask how much news the announcement carries.</b> Is it the first of its kind "
        "or one more of many?</p>"
        "<p><b>Step 2: ask who has checked the green label.</b></p>"
        "<p><b>Step 3: strike explanations that use a finding from another lecture.</b></p>",
    ),
    q="<p>Two firms announce green bonds on the same day. Arkis issues its first green bond and has it certified "
      "by an independent third party. Bervik issues its sixth green bond and labels it itself. Flammer (2021) "
      "finds that the stock market reacts more strongly to one kind of announcement.</p>"
      "<p>Which answer fits her findings and her signaling reading?</p>",
    alternativer=[
        R("Arkis: a first issue is news and an outside check makes the signal harder to fake"),
        F("Bervik: a sixth issue proves a lasting commitment, so investors trust its label more",
          "Flammer finds the stronger reaction for first-time issuers. A sixth issue tells the market little it "
          "did not know."),
        F("Arkis: a first issue carries a lower yield, which lifts the value of the whole firm",
          "A lower yield is the greenium of lecture 9. Flammer's reading is about signaling, not cheaper debt."),
        F("Neither: a green label sends the same signal whoever issues the bond and whoever checks it",
          "Flammer finds that the reaction differs with both features."),
    ],
    kort="<p><b>Arkis.</b> The reaction is strongest for first-time issuers and certified bonds: the signal "
         "carries the most new information and is hardest to fake.</p>",
    full="<p><b>Signaling.</b> A signal is credible when it is hard to fake and tells the receiver something new. "
         "Flammer (2021) reads green bonds this way: by issuing one, firms credibly signal their commitment to "
         "the environment.</p>"
         "<p><b>The case.</b> Arkis issues its first green bond, which is news. A third party has checked it, "
         "which makes it harder to fake. Bervik's sixth self-labelled bond tells investors little they did not "
         "know and nobody outside has checked it. Flammer finds the positive reaction strongest for first-time "
         "issuers and certified bonds.</p>"
         "<p><b>The usual mix-up.</b> Thinking a long record makes the announcement stronger. The sixth bond adds "
         "little that investors did not already know. Another mix-up is the greenium, the lower yield of lecture "
         "9: it is not part of Flammer's finding.</p>"
         "<p><b>Remember:</b> first-time and certified, not repeat and self-labelled.</p>",
)

statisk(
    "bnd-s22", tema="obligasjoner", type="paastand",
    hjelp=hjelp3(
        "This is about the findings of Flammer's study of corporate green bonds and how she interprets them.",
        "Flammer studies the announcement reaction, the issuer's environmental performance afterwards and the "
        "investor base afterwards. Check the direction of each claim.",
        "<p><b>Step 1: recall the direction of each finding.</b> Up or down? Stronger for new or for repeat "
        "issuers? Longer or shorter investor horizons?</p>"
        "<p><b>Step 2: strike any claim that belongs to lecture 9 rather than to Flammer.</b></p>",
    ),
    q="<p>Which statement about Flammer (2021), «Corporate green bonds», is correct?</p>",
    alternativer=[
        R("After issuance, ownership by long-term and green investors rises, in line with her signaling reading"),
        F("She concludes that green bonds pay off mainly because issuers borrow more cheaply than with ordinary bonds",
          "Her evidence is about share prices, environmental performance and the investor base. Cheaper funding is "
          "not her claim."),
        F("She finds that the announcement reaction is strongest for repeat issuers whose bonds have no outside check",
          "This reverses which announcements get the strongest reaction."),
        F("She finds that green bond issuers shift their ownership towards short-term investors who trade on news",
          "This reverses the change in the investor base that she finds."),
    ],
    kort="<p><b>Long-term and green owners rise.</b> Together with the positive announcement reaction and the "
         "better environmental performance, this supports her conclusion: green bonds are a credible signal.</p>",
    full="<p><b>The four findings.</b> In Flammer (2021) the stock market responds positively when a firm "
         "announces a green bond, most of all for first-time issuers and bonds certified by third parties. "
         "Afterwards, issuers improve their environmental performance (higher environmental ratings, lower "
         "CO<sub>2</sub> emissions). Ownership by long-term and green investors rises. She reads all of this as "
         "signaling: issuing green bonds credibly signals a commitment to the environment.</p>"
         "<p><b>Why the statement is right.</b> The shift towards long-term and green owners is one of the "
         "findings. It is part of the evidence she reads as signaling.</p>"
         "<p><b>The usual mix-up.</b> Mixing Flammer up with the greenium of lecture 9. The greenium is a lower "
         "yield on green bonds. Flammer's claim is not cheaper funding.</p>"
         "<p><b>Remember:</b> positive reaction, greener firm, greener owners: a credible signal.</p>",
)

# ---------------------------------------------------------------------------
# Andre aktivaklasser
# ---------------------------------------------------------------------------
statisk(
    "bnd-s23", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about what the global market portfolio says about where capital sits.",
        "The global market portfolio includes public equity, bonds and money markets, loans, cash, private equity "
        "plus real estate and land.",
        "<p><b>Step 1: recall how listed equity compares with real estate, private equity and loans.</b> Larger "
        "or smaller?</p>"
        "<p><b>Step 2: ask what a policy limited to listed shares leaves out.</b></p>"
        "<p><b>Step 3: check the claim about debt against lecture 10's view of ESG for bondholders.</b></p>",
    ),
    q="<p>A foundation's sustainability policy covers only its holdings of listed shares. Its board says this "
      "captures the main lever capital has on sustainability. Gadzinski, Schuller &amp; Vacchino (2021) estimate the "
      "global market portfolio. What does their estimate imply for the board's claim?</p>",
    alternativer=[
        R("The claim fails: several other asset classes are each larger than listed equity"),
        F("The claim holds: listed equity is the largest class in the global market portfolio",
          "The estimate shows several classes that are larger than listed equity."),
        F("The claim holds: debt holders gain nothing from ESG, so only equity is a lever",
          "Lecture 10 shows that ESG matters for debt through the downside. Bondholders can also engage."),
        F("The claim fails only because bonds are larger than all other asset classes combined",
          "The estimate gives no single class anything near that weight."),
    ],
    kort="<p><b>The claim fails.</b> Listed shares are a minority of global capital. Real estate, private equity and "
         "non-securitised loans are each larger, so a policy limited to listed shares misses most of the "
         "capital.</p>",
    full="<p><b>The estimate.</b> Gadzinski, Schuller &amp; Vacchino (2021) estimate the global market portfolio: "
         "public equity, bonds and money markets, loans, cash, private equity plus real estate and land. In their "
         "chart for 2019, stock markets are a small part of the net global capital stock, while real estate, private "
         "equity and non-securitised loans are each larger.</p>"
         "<p><b>What it implies.</b> A policy that stops at listed shares misses most of the capital. That is why "
         "lecture 10 turns to bonds, real estate, infrastructure, commodities and derivatives.</p>"
         "<p><b>The usual mix-up.</b> Equating «the market» with the stock market, or thinking that ESG is irrelevant "
         "to debt. Bondholders care about the downside. The bond market is also larger than the equity market.</p>"
         "<p><b>Remember:</b> sustainable finance that stops at listed shares misses most of the capital.</p>",
)

statisk(
    "bnd-s24", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about the PRI's four phases for a direct investor in real estate.",
        "The phases run from before a purchase to after it: deal sourcing, investment decision, ownership and "
        "sale. Each phase has its own ESG task.",
        "<p><b>Step 1: does the fund own the building yet?</b></p>"
        "<p><b>Step 2: what is the team doing with the ESG issues?</b> Finding them, presenting them to a "
        "committee for a decision or managing them in a building it owns?</p>"
        "<p><b>Step 3: match that task to a phase.</b></p>",
    ),
    q="<p>A property fund is screening an office building it may buy. During due diligence, its team finds that "
      "the building's energy performance is poor and that the area faces growing flood risk. It flags both as "
      "material ESG issues.</p>"
      "<p>In the PRI's four phases for a direct real estate investor, which phase is this?</p>",
    alternativer=[
        R("Deal sourcing"),
        F("Investment decision",
          "In that phase, issues already found go to the investment committee and into the valuation. The fund is "
          "still screening."),
        F("Ownership", "The fund does not own the building yet."),
        F("Sale", "The fund is looking to buy, not to sell."),
    ],
    kort="<p><b>Deal sourcing.</b> Identifying material ESG issues in screening and due diligence comes first, "
         "before the investment committee decides.</p>",
    full="<p><b>The four phases.</b> The PRI follows a direct real estate investor through four phases. Deal "
         "sourcing: identify material ESG issues in screening, due diligence and the planning of new developments "
         "and major renovations. Investment decision: communicate those issues to the investment committee and "
         "assess their impact on valuation. Ownership: include ESG in managing the asset, in the use of external "
         "property managers and in engagement with tenants. Sale: add value when the asset is sold.</p>"
         "<p><b>The case.</b> The fund is screening and doing due diligence on a building it does not yet own. "
         "Finding the material issues is deal sourcing.</p>"
         "<p><b>The usual mix-up.</b> Jumping to the investment decision because valuation is involved. The "
         "decision phase uses the issues that deal sourcing has found.</p>"
         "<p><b>Remember:</b> find, decide, own, sell: deal sourcing, investment decision, ownership, sale.</p>",
)

statisk(
    "bnd-s25", tema="obligasjoner", type="begrep",
    hjelp=hjelp3(
        "This is about how lecture 10 says the environmental performance of buildings is certified.",
        "The real estate part of the lecture names green building councils as useful resources. It also names two "
        "certification schemes for buildings.",
        "<p><b>Step 1: what is to be rated?</b> A bond, a project's risk, an investor's process or a building?</p>"
        "<p><b>Step 2: for each option, ask what object it was made for.</b></p>"
        "<p><b>Step 3: pick the one made for the object in the case.</b></p>",
    ),
    q="<p>A Bergen developer wants a recognised third-party rating of a new office building's environmental "
      "performance, so that tenants and lenders can compare it with other buildings. Which tools does lecture 10 "
      "name for this?</p>",
    alternativer=[
        R("Building rating tools such as BREEAM and LEED"),
        F("The Green Bond Principles and the Social Bond Principles",
          "These govern labelled bonds, not the rating of buildings."),
        F("The Equator Principles for project finance",
          "These are a banking benchmark for environmental and social risk in projects. They do not rate "
          "buildings."),
        F("The PRI's four phases for real estate investors",
          "The phases describe an investor's process from deal sourcing to sale, not a rating of a building."),
    ],
    kort="<p><b>BREEAM and LEED.</b> Buildings are certified with rating tools such as BREEAM (Building Research "
         "Establishment Environmental Assessment Method) and LEED (Leadership in Energy and Environmental Design, "
         "US).</p>",
    full="<p><b>Certification.</b> Lecture 10 names two building certifications. BREEAM is the Building Research "
         "Establishment Environmental Assessment Method. LEED is Leadership in Energy and Environmental Design, "
         "from the US. The lecture also points to the World Green Building Council, which links green buildings "
         "to nine of the Sustainable Development Goals. Norway's Green Building Council is Grønn "
         "Byggallianse.</p>"
         "<p><b>The case.</b> The developer wants a third-party rating of a building that others can compare. That "
         "is what BREEAM and LEED provide.</p>"
         "<p><b>The usual mix-up.</b> Reaching for a familiar sustainable finance framework. The Green Bond "
         "Principles label bonds, the Equator Principles manage project risk for banks and the PRI's four phases "
         "describe an investor's process. None of them rates a building.</p>"
         "<p><b>Remember:</b> buildings are certified with BREEAM or LEED.</p>",
)

# ---------------------------------------------------------------------------
# Derivater
# ---------------------------------------------------------------------------
statisk(
    "bnd-s26", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about sorting an ESG-related derivative into ISDA's categories.",
        "Ask what the derivative's payments depend on: a default, an emission allowance, renewable power, a "
        "natural event or the client's sustainability performance.",
        "<p><b>Step 1: what does the swap hedge?</b> Look at the loan it is attached to.</p>"
        "<p><b>Step 2: what makes its price move from year to year?</b></p>"
        "<p><b>Step 3: match that driver to a category on ISDA's list.</b></p>",
    ),
    q="<p>Fjordbank hedges a client's floating rate loan with an interest rate swap in which the client pays a "
      "fixed rate. Each year an external ESG rater scores the client. If the score beats a target set at the "
      "start of the year, the fixed rate falls by a few basis points. If it misses, the client pays a small "
      "penalty.</p>"
      "<p>Which category on ISDA's overview of ESG-related derivatives does this swap belong to?</p>",
    alternativer=[
        R("Sustainability-linked derivatives"),
        F("ESG-related credit derivatives",
          "Credit derivatives deal with the risk that a borrower defaults. This swap hedges an interest rate."),
        F("Emissions trading", "Emissions trading deals in allowances to emit. No allowance changes hands here."),
        F("Catastrophe and weather derivatives",
          "These pay out on natural events such as storms or rainfall. No natural event drives this swap."),
    ],
    kort="<p><b>A sustainability-linked derivative.</b> The swap is an ordinary hedge, but its price moves with the "
         "client's ESG performance, like ING's swap with SBM Offshore in 2019.</p>",
    full="<p><b>The ISDA list.</b> ISDA's overview sorts ESG-related derivatives into sustainability-linked "
         "derivatives, ESG-related credit derivatives, ESG-related exchange-traded derivatives, emissions trading, "
         "renewable energy and renewable fuels (power purchase agreements, renewable energy certificates, wind "
         "index futures and more) plus catastrophe and weather derivatives.</p>"
         "<p><b>The case.</b> The swap hedges interest rate risk. Its fixed rate moves with a yearly ESG target. "
         "That is the structure of the world's first sustainability improvement derivative, ING's 2019 swap with "
         "SBM Offshore: 5 to 10 basis points lower if SBM met its Sustainalytics target, a 5 to 10 bp penalty if "
         "not.</p>"
         "<p><b>The usual mix-up.</b> Calling any derivative with an ESG angle a credit derivative or an emissions "
         "product. Ask what the payments depend on: here an ESG score.</p>"
         "<p><b>Remember:</b> a hedge whose price moves with ESG targets is a sustainability-linked derivative.</p>",
)

statisk(
    "bnd-s27", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about sorting an energy contract into ISDA's categories of ESG-related derivatives.",
        "Ask what the contract trades: an allowance to emit, a payout on a weather measure, a price tied to "
        "sustainability targets or the power itself.",
        "<p><b>Step 1: what is bought and sold under the contract?</b></p>"
        "<p><b>Step 2: does anything in the price move with the weather or with a target?</b> Read the terms in "
        "the case.</p>"
        "<p><b>Step 3: find the ISDA group that holds contracts of this kind.</b></p>",
    ),
    q="<p>A supermarket chain signs a 15-year contract with a wind farm developer to buy a fixed volume of the "
      "farm's electricity at a fixed price. Under ISDA's overview of ESG-related derivatives, where does this "
      "contract belong?</p>",
    alternativer=[
        R("Renewable energy and renewable fuels, as a power purchase agreement"),
        F("Emissions trading, since the chain cuts the emissions from its power use",
          "Emissions trading deals in allowances to emit. The contract here is for electricity."),
        F("Catastrophe and weather derivatives, since wind output depends on the weather",
          "Weather derivatives pay out on a weather measure. This contract buys power at a fixed price."),
        F("Sustainability-linked derivatives, since the price depends on how green the chain is",
          "The price is fixed in the contract. It does not move with any sustainability target."),
    ],
    kort="<p><b>Renewable energy and renewable fuels.</b> A long-term contract to buy a renewable producer's power "
         "is a power purchase agreement, which ISDA lists in that group.</p>",
    full="<p><b>The category.</b> ISDA's renewable energy and renewable fuels group covers power purchase "
         "agreements (PPAs), renewable energy certificates, wind index futures, renewable identification numbers "
         "and low carbon fuel standards. A PPA is a long-term contract to buy electricity from a producer at "
         "agreed terms (general background on how a PPA works).</p>"
         "<p><b>The case.</b> Fifteen years, a fixed volume and a fixed price for power from a wind farm: a "
         "PPA.</p>"
         "<p><b>The usual mix-up.</b> Choosing weather derivatives because wind depends on the weather. A weather "
         "derivative pays out on a weather measure. Wind index futures are in fact listed with renewables. "
         "Sustainability-linked derivatives are also tempting, but here no price moves with a target.</p>"
         "<p><b>Remember:</b> PPAs sit under renewable energy and renewable fuels.</p>",
)

statisk(
    "bnd-s28", tema="obligasjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about two ways a derivative can be linked to a client's ESG performance.",
        "In both lecture cases the ESG rating creates an incentive for the client. Ask which payment the rating "
        "changes in each.",
        "<p><b>Step 1: what happens to the fixed rate in each swap?</b></p>"
        "<p><b>Step 2: what happens when the rating improves or declines?</b> Who pays what to whom?</p>"
        "<p><b>Step 3: name the difference.</b> Check also that both are the same kind of swap.</p>",
    ),
    q="<p>Fjellbank writes an interest rate swap for a wind turbine maker. The fixed rate is set at the start and "
      "never changes. If the client's ESG rating improves, Fjellbank donates to non-profit projects. If the "
      "rating declines, the client donates instead.</p>"
      "<p>How does this swap differ from ING's 2019 sustainability improvement derivative with SBM Offshore?</p>",
    alternativer=[
        R("Here the ESG link runs through donations, while ING's swap moved SBM's fixed rate itself"),
        F("It does not differ: in both, the client's fixed rate falls when its ESG score beats the target",
          "The case says the fixed rate never changes."),
        F("Here the bank pays a penalty if the client misses, while in the ING swap nobody paid a penalty",
          "In the ING swap SBM did pay a penalty when it missed its target."),
        F("This swap hedges a credit risk, while the ING swap hedged the interest rate on a credit facility",
          "Both cases are interest rate swaps."),
    ],
    kort="<p><b>The link runs through donations, not through the price.</b> This is the structure of HSBC's 2020 "
         "swap with Siemens Gamesa. In the ING swap, SBM's fixed rate moved 5 to 10 basis points with its ESG "
         "score.</p>",
    full="<p><b>Two structures.</b> In August 2019 ING executed the world's first sustainability improvement "
         "derivative. It hedged the interest rate on SBM Offshore's floating rate credit facility: SBM pays fixed "
         "and receives floating. Each year ING sets a target ESG score, measured by Sustainalytics. If SBM meets "
         "it, the fixed rate falls by 5 to 10 basis points; if not, SBM pays a 5 to 10 bp penalty.</p>"
         "<p><b>The case.</b> Here the fixed rate never moves. If the rating improves the bank donates; if it "
         "declines the client does. That copies HSBC's 2020 swap with Siemens Gamesa.</p>"
         "<p><b>The usual mix-up.</b> Assuming every sustainability-linked derivative adjusts the rate. Lecture 10 "
         "shows that the ESG incentive can also run through payments outside the swap's price.</p>"
         "<p><b>Remember:</b> ING moves the rate; HSBC moves donations.</p>",
)

# ---------------------------------------------------------------------------
# Markedet og GBP-utsagn
# ---------------------------------------------------------------------------
statisk(
    "bnd-s29", tema="obligasjoner", type="paastand",
    hjelp=hjelp3(
        "This is about what the issuance data in lecture 10 show about the families of labelled bonds.",
        "Recall which category is the largest, which stay small and whether total issuance rose every year.",
        "<p><b>Step 1: which family dominates: bonds that tie the money or bonds that tie the coupon?</b></p>"
        "<p><b>Step 2: did total issuance keep rising or did it peak?</b></p>"
        "<p><b>Step 3: strike every statement that gets either point wrong.</b></p>",
    ),
    q="<p>Lecture 10 shows global labelled sustainable bond issuance by category (World Bank, based on Environmental "
      "Finance data). What does the pattern say about the families of labelled bonds?</p>",
    alternativer=[
        R("Use-of-proceeds bonds, led by green bonds, dominate; bonds tied to targets remain a small share"),
        F("Bonds tied to targets have overtaken use-of-proceeds bonds since total issuance peaked",
          "Sustainability-linked bonds stayed a small category."),
        F("Social bonds lead the market, since investors prefer earmarked social projects",
          "Social bonds were not the largest category in any year."),
        F("Issuance keeps rising every year, so labelled bonds steadily replace conventional ones",
          "Total issuance peaked and then fell back."),
    ],
    kort="<p><b>Green bonds dominate; linked bonds stay small.</b> Use-of-proceeds green bonds are the largest category "
         "every year. Sustainability-linked and transition bonds remain small. Total issuance has peaked and fallen "
         "back.</p>",
    full="<p><b>The data.</b> World Bank figures based on Environmental Finance data show labelled sustainable bond "
         "issuance rising fast from 2016 to a peak in 2021, then running lower and falling back by 2025. Green bonds "
         "are the largest category every year.</p>"
         "<p><b>What the pattern says.</b> The labelled bond market is still mainly a use-of-proceeds market, led by "
         "green bonds. Sustainability-linked bonds tie the coupon to targets; they and transition bonds remain a "
         "small share.</p>"
         "<p><b>The usual mix-up.</b> Assuming steady growth, or assuming that the newer linked bonds have taken over. "
         "Neither shows in the data.</p>"
         "<p><b>Remember:</b> green bonds dominate labelled issuance; total issuance has peaked.</p>",
)

statisk(
    "bnd-s30", tema="obligasjoner", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what the Green Bond Principles require and how they differ from the principles for linked "
        "bonds.",
        "The Green Bond Principles have four components: use of proceeds, project evaluation and selection, "
        "management of proceeds and reporting. ICMA has a separate set for bonds whose terms are tied to targets.",
        "<p><b>Step 1: for statement I, ask what is tied to sustainability in the bond it describes.</b> Which of "
        "ICMA's sets covers that kind of bond?</p>"
        "<p><b>Step 2: for statement II, recall what the use of proceeds component asks for.</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements about the Green Bond Principles (2017).</p>"
      "<p>I. Under the Green Bond Principles, the proceeds may fund general corporate purposes as long as the coupon "
      "is tied to environmental targets.<br>"
      "II. The proceeds must go exclusively to green projects, described in the bond's legal documentation.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Statement I fails: free money with a coupon tied to targets describes a different kind of "
                    "bond with its own set of principles."),
        R("Only II"),
        F("Both I and II", "Statement I fails: a green bond cannot leave the use of the money open."),
        F("Neither I nor II", "Look again at statement II: what does the use of proceeds component ask for?"),
    ],
    kort="<p><b>Only II.</b> Use of proceeds means exclusively green projects, set out in the legal documentation. "
         "Free money with a coupon tied to targets is a sustainability-linked bond, under ICMA's SLBP.</p>",
    full="<p><b>Statement I.</b> A bond whose money may fund general corporate purposes and whose coupon is tied to "
         "targets is a sustainability-linked bond. ICMA covers it with the Sustainability-Linked Bond Principles, "
         "not the Green Bond Principles. The statement mixes the two families. It is false.</p>"
         "<p><b>Statement II.</b> Use of proceeds is the first component of the Green Bond Principles: the money goes "
         "exclusively to green projects, described in the bond's legal documentation. The statement is correct.</p>"
         "<p><b>The other components.</b> Project evaluation and selection tells investors the environmental "
         "objectives, the process and the eligibility criteria. Management of proceeds puts the net proceeds in a "
         "tracked sub-account. Reporting on the use of proceeds is mandatory.</p>"
         "<p><b>Remember:</b> green bond: the money is tied. Linked bond: the coupon is tied.</p>",
)
