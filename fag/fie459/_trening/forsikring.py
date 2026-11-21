# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: bærekraft i forsikring (tema «forsikring»,
   forelesning 12).

   Statiske spørsmål ins-s01 … ins-s30:
     s01, s02, s29, s30  rollene (risikooverføring og pooling, kapital og
                  investering), liv mot skade, resultatregnskapet
     s03, s04, s15  avsetninger for forventede krav, egenkapital for uventede,
                  VaR = EL + UL og hva halen krever
     s05 til s07  vesentlige temaer: begge sider av balansen, Gatzert, Reichel og
                  Zitzmann (2020) og SASB for forsikring mot bank
     s08 til s12  verktøyene og katastrofemodellen (eksponering, finansielt tap,
                  rekkefølgen, fare og sårbarhet)
     s13, s14, s16  AAL, VaR som ikke er verste tap og returperiode
     s17, s18     risikodeling: katastrofeobligasjoner («skip or defer») og de
                  tre lagene
     s19 til s21  klima: de sju farene og DNB (2017), som er De Nederlandsche Bank
     s22 til s24  UN Principles for Sustainable Insurance
     s25 til s27  Solvens II, IDD og EYs regelpakke (SFDR bare for liv)
     s28          mikroforsikring

   Kilder: fag/fie459/_fragmenter/k12.html og foilene til forelesning 12
   (_tekst/FIE459_H26_12_Insurance.txt). Tallet om forsikrede naturskadetap i
   Europa i 2024 er tatt ut av foilene og brukes ikke.
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# Rollene og forretningsmodellen
# ---------------------------------------------------------------------------
statisk(
    "ins-s01", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the two roles lecture 12 gives insurers in the financial system.",
        "Lecture 12 names two roles. Ask whether the case is about the clients' risks or about something else "
        "the insurer does with its balance sheet.",
        "<p><b>Step 1: what is the insurer doing with the money in the case?</b></p>"
        "<p><b>Step 2: is that taking over clients' risks, sharing risk with other companies or something "
        "else?</b></p>"
        "<p><b>Step 3: name the role.</b></p>",
    ),
    q="<p>Each January, Fjordsikring collects a year of premiums from its policyholders. Claims for injuries and "
      "disability are paid out over many years. Until then, the insurer holds the money in bonds, shares and "
      "property.</p>"
      "<p>Which role of insurers in the financial system does this holding of money illustrate?</p>",
    alternativer=[
        R("Capital accumulation and investment"),
        F("Risk transfer, risk pricing and risk management",
          "That role is about taking over and pricing clients' risks, not about the money held in the "
          "meantime."),
        F("Pooling, which spreads each client's loss over all clients",
          "Pooling is how the insurer spreads losses across clients. It does not explain why premiums are "
          "invested."),
        F("Reinsurance, which divides large risks among several insurers",
          "Nothing is passed on to another insurer here."),
    ],
    kort="<p><b>Capital accumulation and investment.</b> Premiums come in before claims go out. The insurer "
         "invests them in the meantime, which makes it a large asset manager.</p>",
    full="<p><b>Two roles.</b> Lecture 12 gives insurers two roles. The first is risk transfer, risk pricing and "
         "risk management: by combining the risks of many clients in a pool, the insurer spreads the financial "
         "impact of a loss over all of them. The second is capital accumulation and investment: premiums are paid "
         "before claims. The money is invested until it is needed.</p>"
         "<p><b>The case.</b> The question is about the money held between the premium and the claim. Investing it "
         "in bonds, shares and property is the second role.</p>"
         "<p><b>Why it matters for sustainability.</b> The assets behind the technical provisions make insurers "
         "large asset managers, asset owners in the investment chain of lecture 8. That is why the lecture adds "
         "the material issues of the insurer's investments to SASB's list.</p>"
         "<p><b>Remember:</b> premiums first, claims later: the gap is invested.</p>",
)

statisk(
    "ins-s02", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the two kinds of insurance in lecture 12 and how predictable each one is.",
        "Lecture 12 compares life insurance (death, disability, retirement) with non-life insurance (natural "
        "catastrophes, accidents, fire, liability) on how easy their claims are to predict.",
        "<p><b>Step 1: sort each insurer as life or non-life.</b></p>"
        "<p><b>Step 2: recall which kind the lecture calls fairly stable and which more diverse.</b></p>"
        "<p><b>Step 3: check whether book size or contract length changes that comparison.</b></p>",
    ),
    q="<p>Two Nordic insurers have equally large books. Livsforsikring sells life, disability and pension policies. "
      "Skadeforsikring sells cover for storms, floods, fire and liability. Following lecture 12, which insurer "
      "faces the harder job of predicting its claims and why?</p>",
    alternativer=[
        R("Skadeforsikring, since non-life risks are more diverse and harder to model"),
        F("Livsforsikring, since death and disability strike each client at random",
          "Single events are random, but across a large pool life claims are fairly stable."),
        F("Both equally, since equal book sizes make claims equally predictable",
          "Book size helps pooling but does not make different kinds of risk equally easy to model."),
        F("Livsforsikring, since pension promises run for decades",
          "Long horizons do not make life claims the harder ones in the lecture's comparison."),
    ],
    kort="<p><b>Skadeforsikring, the non-life insurer.</b> Life insurance is fairly stable and easier to predict. "
         "Non-life risks such as natural catastrophes are more diverse and harder to model. That is also where "
         "climate change bites.</p>",
    full="<p><b>Two kinds of insurance.</b> Life insurance covers death, disability and retirement. It is fairly "
         "stable and easier to predict. Non-life insurance covers natural catastrophes, accidents, fire and "
         "liability. It is more diverse and more difficult to model (lecture 12).</p>"
         "<p><b>The case.</b> Skadeforsikring writes storms, floods, fire and liability: non-life. Its claims "
         "depend on rare events that can hit many clients at once, the hardest part to model.</p>"
         "<p><b>The usual mix-up.</b> Thinking long-term promises must be the hardest to predict. In the lecture's "
         "comparison, life claims are the stable ones. The difficulty lies in catastrophes.</p>"
         "<p><b>Why it matters for climate.</b> Natural catastrophes, where climate change bites, sit on the "
         "non-life side, which is already the harder side to model.</p>"
         "<p><b>Remember:</b> life is stable; non-life is hard to model.</p>",
)

# ---------------------------------------------------------------------------
# Balansen: avsetninger, egenkapital og VaR
# ---------------------------------------------------------------------------
statisk(
    "ins-s03", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about which part of an insurer's balance sheet absorbs which kind of claims.",
        "Technical provisions are sized for expected claims. Equity is the buffer for unexpected claims. Ask "
        "which of the two the model update has changed.",
        "<p><b>Step 1: has the expected (average) claim changed?</b></p>"
        "<p><b>Step 2: what has changed instead?</b> Think about the rare, extreme years.</p>"
        "<p><b>Step 3: which buffer, or which outside help, deals with that?</b></p>",
    ),
    q="<p>Hav Forsikring updates its flood model. Its average yearly claims are unchanged, but a rare flood that "
      "would hit most of its coastal clients at once is now judged more likely and more severe.</p>"
      "<p>Following the logic of the insurer's balance sheet, what does this change mainly call for?</p>",
    alternativer=[
        R("More equity or more risk sharing, since the tail has grown while the average has not"),
        F("Higher technical provisions, since provisions are the insurer's buffer against floods",
          "Provisions are sized for expected claims, which are unchanged."),
        F("Higher premiums only, since every rise in risk must be priced into the average claim",
          "The average is unchanged in the case."),
        F("Nothing, since pooling many coastal clients spreads the flood loss across them",
          "Pooling cannot spread a loss that hits most of the clients at the same time."),
    ],
    kort="<p><b>More equity or more risk sharing.</b> Provisions cover expected claims, which have not changed. A "
         "fatter tail is unexpected loss: the job of equity, reinsurance and cat bonds.</p>",
    full="<p><b>Two buffers.</b> On a typical insurer's balance sheet, technical provisions cover expected claims "
         "and equity covers unexpected claims. Pooling makes the average claim predictable, so it is priced into "
         "premiums and held as provisions. Pooling cannot remove the bad year when one event hits a whole "
         "region.</p>"
         "<p><b>The case.</b> The average is the same, so premiums and provisions need not change. What has grown "
         "is the rare, extreme flood that hits most clients at once: the tail. That calls for more equity or for "
         "sharing the risk with reinsurers and bond investors.</p>"
         "<p><b>The usual mix-up.</b> Thinking any rise in risk means higher provisions. A risk that raises the "
         "average (more frequent heavy rain) calls for higher premiums and provisions. A risk that fattens the "
         "tail calls for equity or risk sharing.</p>"
         "<p><b>Remember:</b> average up: provisions. Tail up: equity or risk sharing.</p>",
)

statisk(
    "ins-s04", tema="forsikring", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the two buffers on an insurer's balance sheet and which kind of risk each one answers.",
        "Check each statement against the lecture's balance sheet of a typical insurer. Ask whether a change raises "
        "the expected claims or the unexpected ones.",
        "<p><b>Step 1: which buffer is sized for the claims the insurer expects?</b></p>"
        "<p><b>Step 2: does more frequent heavy rain raise the average claim or only the rare extreme year?</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements from lecture 12.</p>"
      "<p>I. On a typical insurer's balance sheet, technical provisions cover expected claims while equity covers "
      "unexpected claims.<br>"
      "II. A risk that raises average yearly claims, such as more frequent heavy rain, calls mainly for more "
      "equity.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: a higher average is expected loss, which belongs in premiums and "
                     "provisions."),
        F("Both I and II", "Statement II fails: equity is the buffer for unexpected claims, not for a higher "
                           "average."),
        F("Neither I nor II", "Look again at statement I: which buffer is sized for the claims the insurer "
                              "expects?"),
    ],
    kort="<p><b>Only I.</b> Provisions cover expected claims and equity unexpected ones. More frequent heavy rain "
         "raises the average, so it calls for higher premiums and provisions, not mainly for equity.</p>",
    full="<p><b>Statement I.</b> The funding side of a typical insurer's balance sheet has two buffers. Technical "
         "provisions cover expected claims. Equity covers unexpected claims. The statement is correct.</p>"
         "<p><b>Statement II.</b> More frequent heavy rain raises the average claim. That is expected loss: the "
         "insurer prices it into premiums and holds provisions for it. Equity is for the rare, extreme year that "
         "pooling cannot remove. The statement is false.</p>"
         "<p><b>How it maps onto VaR.</b> On the lecture's loss distribution, VaR = EL + UL. A higher average moves "
         "EL, the provisions' job. A fatter tail moves UL, the job of equity and risk sharing.</p>"
         "<p><b>Remember:</b> average up: premiums and provisions. Tail up: equity or risk sharing.</p>",
)

statisk(
    "ins-s15", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about what an insurer can do when its unexpected loss outgrows its equity.",
        "Provisions cover expected claims and equity unexpected ones. When a risk is too big for one insurer, the "
        "lecture describes layers of risk sharing that come in a set order.",
        "<p><b>Step 1: which part of the loss has outgrown its buffer?</b></p>"
        "<p><b>Step 2: strike responses that change the measure rather than the risk.</b></p>"
        "<p><b>Step 3: of the responses left, which layer of risk sharing comes first?</b></p>",
    ),
    q="<p>Vestland Forsikring's 99.5% value at risk on its storm portfolio has grown larger than its equity can "
      "bear. Expected losses are fully covered by its technical provisions. Which response fits lecture 12 "
      "best?</p>",
    alternativer=[
        R("Pass part of the tail to others through reinsurance or a catastrophe bond"),
        F("Raise technical provisions, since they are the buffer for storm claims",
          "Provisions are sized for expected claims, which are already covered."),
        F("Ask the government programme to take the risk before reinsurers do",
          "Government programmes step in when insurance and reinsurance do not suffice. They are not the first "
          "layer."),
        F("Report VaR at a lower confidence level, so that equity covers it",
          "A lower confidence level changes the number, not the storms."),
    ],
    kort="<p><b>Share the tail through reinsurance or a cat bond.</b> Unexpected loss beyond what equity can carry "
         "is what the lecture's layers of risk sharing are for.</p>",
    full="<p><b>The buffers.</b> Technical provisions cover expected claims; equity covers unexpected claims. VaR "
         "equals expected loss plus unexpected loss. When VaR grows beyond what provisions plus equity can carry, "
         "the insurer needs more equity or less risk on its books.</p>"
         "<p><b>Sharing the risk.</b> Lecture 12 gives three layers for catastrophes too big for one insurer: "
         "dividing the risk among insurers and reinsurers, government programmes that cover part when insurance "
         "and reinsurance do not suffice (the US NFIP) and catastrophe bonds, which let the issuer skip or defer "
         "scheduled payments if a catastrophic loss occurs.</p>"
         "<p><b>The case.</b> Reinsurance or a cat bond moves part of the tail off Vestland's balance sheet. "
         "Raising equity would also help, but it is not among the options.</p>"
         "<p><b>The usual mix-up.</b> Treating government programmes as the first call. They are a backstop for "
         "large catastrophes.</p>"
         "<p><b>Remember:</b> provisions for the mean; equity and risk sharing for the tail.</p>",
)

# ---------------------------------------------------------------------------
# Vesentlige temaer
# ---------------------------------------------------------------------------
statisk(
    "ins-s05", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the parts of an insurer's business that sustainability issues can reach.",
        "An insurer collects premiums, pays claims and invests the money in between. The P&amp;L shows premium "
        "income plus investment income minus claims and expenses.",
        "<p><b>Step 1: which side of the balance sheet has Kyst acted on?</b> Underwriting decides which claims "
        "it may have to pay.</p>"
        "<p><b>Step 2: what is left on the other side?</b></p>"
        "<p><b>Step 3: pick the reply that covers what Kyst has not dealt with.</b></p>",
    ),
    q="<p>Kyst Forsikring has stopped insuring coal plants and has tightened its underwriting in flood zones. Its "
      "investment portfolio, which backs its technical provisions, still holds large positions in coal mining "
      "bonds. A board member says the insurer has now dealt with climate risk.</p>"
      "<p>What is the best reply, following lecture 12?</p>",
    alternativer=[
        R("Climate risk sits on the asset side too: its investments carry material issues"),
        F("The board member is right, since an insurer's climate risk sits only in its claims",
          "Lecture 12 adds the material issues of the insurer's investments to the claims-side issues."),
        F("The board member is right, since technical provisions are never invested",
          "The assets behind the provisions are invested. That is what makes insurers asset managers."),
        F("Climate risk sits mainly in the insurer's own offices and operations",
          "Lecture 12 locates the issues in claims and investments, not in the insurer's own operations."),
    ],
    kort="<p><b>The asset side carries climate risk too.</b> The assets behind the provisions make insurers large "
         "asset managers, so the material issues of their investments count as well.</p>",
    full="<p><b>Both sides.</b> An insurer meets sustainability issues on two sides. On the liability side they sit "
         "in the claims it pays. On the asset side they sit in the investments behind its technical provisions. Lecture 12 adds the "
         "material issues related to the insurer's investments to SASB's list. Gatzert, Reichel &amp; Zitzmann "
         "(2020) map sustainability risks and opportunities on the asset side, on the liability side and from a "
         "broader corporate perspective.</p>"
         "<p><b>The case.</b> Kyst has acted on the liability side only. Its coal bonds still expose it to "
         "climate risk through the asset side.</p>"
         "<p><b>The usual mix-up.</b> Thinking of an insurer only as a payer of claims. Premiums are invested "
         "until claims fall due, so insurers are asset owners in the investment chain of lecture 8.</p>"
         "<p><b>Remember:</b> an insurer has climate risk on both sides of its balance sheet.</p>",
)

statisk(
    "ins-s06", tema="forsikring", type="fakta",
    hjelp=hjelp3(
        "This is about the main messages of Gatzert, Reichel &amp; Zitzmann's map of sustainability in "
        "insurance.",
        "The study has two messages for insurers: one about how broad their approach should be, one about what "
        "holds them back.",
        "<p><b>Step 1: recall what the authors say about climate change compared with other sustainability "
        "factors.</b></p>"
        "<p><b>Step 2: recall what they name as a key barrier.</b></p>"
        "<p><b>Step 3: check the regulation option against what lecture 12 says about EU rules.</b></p>",
    ),
    q="<p>Gatzert, Reichel &amp; Zitzmann (2020) map sustainability risks and opportunities in insurance. An insurer "
      "wants to act on their findings. What do the authors identify as a key barrier?</p>",
    alternativer=[
        R("A lack of data and knowledge"),
        F("A lack of capital, since sustainability investments tie up equity",
          "The authors do not name capital as the key barrier."),
        F("Regulation that forbids insurers to consider sustainability",
          "EU rules now require insurers to integrate sustainability, not forbid it."),
        F("The fact that climate change is the only sustainability risk worth modelling",
          "The authors say climate change is important but by far not the only factor."),
    ],
    kort="<p><b>A lack of data and knowledge.</b> The authors also stress that climate change is important but by "
         "far not the only factor, so insurers should take a broader approach.</p>",
    full="<p><b>The study.</b> Gatzert, Reichel &amp; Zitzmann (2020) map sustainability risks and opportunities in "
         "insurance on the asset side, on the liability side and from a broader corporate perspective.</p>"
         "<p><b>Two messages.</b> First, climate change is an important factor but by far not the only one, so "
         "insurers should take a broader approach. Second, a key barrier is a lack of data and knowledge.</p>"
         "<p><b>The usual mix-up.</b> Reading the study as a call to focus on climate alone. Its message is the "
         "opposite: broaden the view and build the data to do it.</p>"
         "<p><b>Where it fits.</b> The study frames the rest of lecture 12: material issues on both sides of the "
         "balance sheet, risk modelling and regulation that since August 2022 asks insurers to integrate "
         "sustainability risks.</p>"
         "<p><b>Remember:</b> climate matters but is not all; the barrier is data and knowledge.</p>",
)

statisk(
    "ins-s07", tema="forsikring", type="begrep",
    hjelp=hjelp3(
        "This is about how SASB's material issues differ between commercial banks and insurers.",
        "Lecture 11 and lecture 12 each show SASB's list for their kind of institution. Some issues appear on "
        "both lists.",
        "<p><b>Step 1: strike the issues that appear on both lists.</b></p>"
        "<p><b>Step 2: of the rest, ask which list each one is on.</b></p>"
        "<p><b>Step 3: think about which institution pays out directly when a natural disaster strikes.</b></p>",
    ),
    q="<p>An analyst compares SASB's materiality maps for commercial banks and for insurers. Which material issue "
      "appears on the insurers' list but not on the banks' list?</p>",
    alternativer=[
        R("Physical impacts of climate change"),
        F("Systemic risk management", "Systemic risk management is on both lists."),
        F("Product design and lifecycle management", "Product design is on both lists."),
        F("Data security", "Data security is on the banks' list, not the insurers'."),
    ],
    kort="<p><b>Physical impacts of climate change.</b> An insurer pays the claims when climate events hit, so the "
         "issue is direct. A bank's list has no environmental issue; its climate exposure sits in its loans.</p>",
    full="<p><b>The two lists.</b> SASB's map for commercial banks: data security, access and affordability, product "
         "design and lifecycle management, business ethics and systemic risk management. For insurers: selling "
         "practices and product labelling, product design and lifecycle management, physical impacts of climate "
         "change and systemic risk management.</p>"
         "<p><b>Why the difference.</b> Climate events reach an insurer directly through the claims it pays. A "
         "bank's climate issues sit in its clients' activities, so they are indirect material issues: its credits "
         "and investments.</p>"
         "<p><b>The usual mix-up.</b> Concluding that banks face no climate risk because SASB lists none for them. "
         "Lecture 11 says the opposite: credit risk is indirectly all risks a counterparty faces.</p>"
         "<p><b>Remember:</b> insurers carry physical climate risk directly; banks carry it through their "
         "borrowers.</p>",
)

# ---------------------------------------------------------------------------
# Risikomodellering og katastrofemodellen
# ---------------------------------------------------------------------------
statisk(
    "ins-s08", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the tools lecture 12 lists for assessing the risks an insurer is exposed to.",
        "The lecture names risk modelling, scenario analysis and catastrophe modelling. VaR is one way to "
        "quantify catastrophe risk.",
        "<p><b>Step 1: is the team looking at one kind of catastrophic event or at several possible futures?</b></p>"
        "<p><b>Step 2: does it compare good and bad outcomes for its risk exposure?</b></p>"
        "<p><b>Step 3: strike options that share risk rather than assess it.</b></p>",
    ),
    q="<p>An insurer's risk team estimates its claims under several futures: one where warming stays near 1.5 °C, "
      "one where it reaches 3.5 °C and one with faster adaptation that lowers damage. It compares the good and "
      "bad outcomes for its risk exposure.</p>"
      "<p>Which of the lecture's risk assessment tools is the team using?</p>",
    alternativer=[
        R("Scenario analysis"),
        F("Catastrophe modelling",
          "Catastrophe modelling estimates the losses from catastrophic events such as floods or hurricanes. The "
          "team is comparing whole futures."),
        F("Value at risk", "VaR is a single cut-off on one loss distribution, not a comparison of several futures."),
        F("Reinsurance", "Reinsurance shares risk with other companies. It is not a way to assess risk."),
    ],
    kort="<p><b>Scenario analysis.</b> It evaluates the impact of a range of possible outcomes, positive and "
         "negative, on the insurer's risk exposure. The DNB (2017) study is the lecture's example.</p>",
    full="<p><b>Three tools.</b> Lecture 12 lists risk modelling (mathematical models that estimate potential "
         "losses in various scenarios), scenario analysis (the impact of a range of possible outcomes, both "
         "positive and negative, on the insurer's risk exposure) and catastrophe modelling (the potential losses "
         "from events such as earthquakes, hurricanes and floods).</p>"
         "<p><b>The case.</b> The team compares several futures, good and bad. That is scenario analysis. The "
         "lecture's example is DNB (2017), De Nederlandsche Bank's projection of Dutch homeowner claims under "
         "1.5 °C and 3.5 °C.</p>"
         "<p><b>The usual mix-up.</b> Calling any climate analysis a catastrophe model. A catastrophe model chains "
         "hazard, vulnerability, exposure and financial loss for catastrophic events. Scenario analysis compares "
         "whole futures.</p>"
         "<p><b>Remember:</b> a range of futures, good and bad: scenario analysis.</p>",
)

statisk(
    "ins-s09", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the five components of the catastrophe model and where a change enters it.",
        "The components are hazard, vulnerability, exposure, financial loss and the platform. Each describes a "
        "different part of how an event becomes a loss.",
        "<p><b>Step 1: strike what the case says has not changed.</b> The storms and the buildings.</p>"
        "<p><b>Step 2: of the components left, which one describes what the case says has grown?</b></p>"
        "<p><b>Step 3: check that the platform is a part that could change at all.</b></p>",
    ),
    q="<p>Over ten years, a coastal region gets many new homes, more valuable furniture and equipment inside them "
      "and new factories whose shutdown would cost far more. The storms themselves are no stronger and the "
      "buildings are no weaker.</p>"
      "<p>In the catastrophe model, which component has changed?</p>",
    alternativer=[
        R("Exposure: the building, contents and business interruption values"),
        F("Hazard: the extent and intensity of the catastrophe", "The case says the storms are no stronger."),
        F("Vulnerability: the relative damage the storm does to the assets",
          "The case says the buildings are no weaker, so the same storm does the same relative damage."),
        F("Platform: the part of the model that integrates the other components",
          "The platform combines the components. It does not change because more value is in the way."),
    ],
    kort="<p><b>Exposure.</b> More homes, contents and factories mean more value in the way. Exposure is split "
         "between building values, contents values and business interruption values.</p>",
    full="<p><b>The catastrophe model.</b> Schoenmaker &amp; Schramade (2019) build it from five components in "
         "order: hazard (extent and intensity of the event), vulnerability (relative damage to the assets), "
         "exposure (building, contents and business interruption values), financial loss (the physical damage "
         "turned into money before insurance) and the platform that integrates them.</p>"
         "<p><b>The case.</b> The storms and the buildings are unchanged, so hazard and vulnerability are too. "
         "What has grown is the value in the storm's path: exposure.</p>"
         "<p><b>The usual mix-up.</b> Blaming every rise in losses on climate change. Climate change works on "
         "hazard, building codes on vulnerability and development on exposure. Losses can rise with no change in "
         "the weather at all.</p>"
         "<p><b>Remember:</b> stronger storm: hazard. Weaker house: vulnerability. More value in the way: "
         "exposure.</p>",
)

statisk(
    "ins-s10", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the five components of the catastrophe model and what each one does.",
        "The components, in order, are hazard, vulnerability, exposure, financial loss and the platform.",
        "<p><b>Step 1: list what the modeller already has.</b> How strong the hurricane is and the share of each "
        "building it destroys.</p>"
        "<p><b>Step 2: what is she producing now?</b> A physical measure, a value at stake, a money figure or the "
        "integration of all parts?</p>"
        "<p><b>Step 3: match that output to a component.</b></p>",
    ),
    q="<p>A modeller has estimated how strongly a hurricane would hit a city and what share of each building it "
      "would destroy. She now converts the physical damage into a total amount in euros, before any deductibles, "
      "limits or reinsurance are applied.</p>"
      "<p>Which component of the catastrophe model is she working on?</p>",
    alternativer=[
        R("Financial loss"),
        F("Exposure", "Exposure is the value at stake, an input she already uses."),
        F("Vulnerability", "Vulnerability is the share of each building destroyed, which she has already "
                           "estimated."),
        F("Platform", "The platform integrates the components. She is working on one of them."),
    ],
    kort="<p><b>Financial loss.</b> This component translates the physical damage into total monetary loss before "
         "the application of insurance.</p>",
    full="<p><b>The order.</b> The catastrophe model runs from hazard (how strong the event is) to vulnerability "
         "(the relative damage to the assets) to exposure (the values at stake) to financial loss, which turns "
         "physical damage into a total monetary loss before insurance is applied. The platform integrates the "
         "four.</p>"
         "<p><b>The case.</b> She has the strength of the hurricane and the share of each building destroyed. "
         "Turning that into euros before deductibles, limits or reinsurance is the financial loss component.</p>"
         "<p><b>The usual mix-up.</b> Thinking the model's loss is what the insurer pays. The financial loss comes "
         "before insurance. What the insurer itself pays depends on the policy terms and on the risk it has "
         "passed on (general background).</p>"
         "<p><b>Remember:</b> financial loss is the money value of the damage, before insurance.</p>",
)

statisk(
    "ins-s11", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about where a change enters the catastrophe model.",
        "The model has five components: hazard, vulnerability, exposure, financial loss and the platform. Each "
        "describes a different part of how an event becomes a loss.",
        "<p><b>Step 1: for each change, ask what it alters.</b> The event itself, how badly a given event hits each "
        "asset, the value at stake or the money calculation?</p>"
        "<p><b>Step 2: keep the change that alters how badly a given flood hits each asset.</b></p>",
    ),
    q="<p>An insurer's catastrophe modeller lists four items for her next update of a river valley model. Which one belongs under "
      "vulnerability in Schoenmaker &amp; Schramade's catastrophe model?</p>",
    alternativer=[
        R("Homes in the flood zone get raised floors and water-resistant walls"),
        F("Rainfall in the valley becomes heavier as the climate warms",
          "Heavier rain changes the event itself: its extent and intensity."),
        F("Firms in the valley store more costly equipment on their ground floors",
          "More valuable contents mean more value at stake, not more damage per asset."),
        F("The modeller turns the estimated damage into euros before deductibles",
          "Putting a money figure on the damage is a later step in the model."),
    ],
    kort="<p><b>Raised floors and water-resistant walls.</b> Vulnerability is the relative damage to the assets. "
         "Flood-proofing lowers the damage that the same flood does to each home.</p>",
    full="<p><b>The five components.</b> Hazard: the extent and intensity of the catastrophe. Vulnerability: the "
         "relative damage to the assets. Exposure: building, contents and business interruption values. Financial "
         "loss: the physical damage turned into money before insurance. Platform: integrates the four.</p>"
         "<p><b>The four changes.</b> Heavier rain works on hazard. Raised floors and water-resistant walls work on "
         "vulnerability: the same flood does less damage. More costly equipment raises contents values, which is "
         "exposure. Turning damage into euros is the financial loss step.</p>"
         "<p><b>The usual mix-up.</b> Putting flood-proofing under exposure. Exposure counts what is in the way; "
         "vulnerability measures how badly it is hit.</p>"
         "<p><b>Remember:</b> event: hazard. Resistance: vulnerability. Value: exposure. Money: financial loss.</p>",
)

statisk(
    "ins-s12", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about where two different changes enter the catastrophe model.",
        "Each of the first three components answers its own question: how strong is the event, how badly is each "
        "asset hit and how much value is in the way?",
        "<p><b>Step 1: does the climate scenario alter the storm, the homes' resistance or the value of what is in "
        "the way?</b></p>"
        "<p><b>Step 2: ask the same about the building rules.</b></p>"
        "<p><b>Step 3: find the option that gets both right.</b></p>",
    ),
    q="<p>A modeller reruns a storm model for western Norway with two changes. A new climate scenario makes autumn "
      "storms more intense. New building rules require stronger roofs on all homes, so the same wind tears off "
      "fewer of them.</p>"
      "<p>Which components of the catastrophe model do the two changes work on?</p>",
    alternativer=[
        R("The climate scenario works on hazard, the building rules on vulnerability"),
        F("The climate scenario works on exposure, the building rules on hazard",
          "Exposure is the value at stake, which neither change touches. Building rules do not make storms "
          "weaker."),
        F("Both work on vulnerability, since both change the damage per home",
          "A more intense storm changes the event itself, not how well a home resists a given storm."),
        F("The climate scenario works on hazard, the building rules on exposure",
          "Stronger roofs do not change the value at stake."),
    ],
    kort="<p><b>Hazard and vulnerability.</b> Climate change works on the event: more intense storms. Stricter "
         "building rules work on the damage a given storm does to a home.</p>",
    full="<p><b>Where changes enter.</b> Hazard is the extent and intensity of the catastrophe. Vulnerability is "
         "the relative damage to the assets. Exposure is the values at stake. Lecture 12's illustration: climate "
         "change works on hazard, stricter building codes on vulnerability and more homes on a flood plain on "
         "exposure.</p>"
         "<p><b>The case.</b> More intense storms: hazard. Stronger roofs that resist the same wind: "
         "vulnerability.</p>"
         "<p><b>The usual mix-up.</b> Putting building rules under exposure. Exposure counts what is in the way; "
         "vulnerability measures how badly it is hit. A stronger roof leaves the value of the house unchanged but "
         "lowers the damage.</p>"
         "<p><b>Remember:</b> climate on hazard, codes on vulnerability, development on exposure.</p>",
)

# ---------------------------------------------------------------------------
# Å måle katastroferisiko: AAL, VaR og returperiode
# ---------------------------------------------------------------------------
statisk(
    "ins-s13", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about how lecture 12 says catastrophe risk should be measured.",
        "The lecture lists three ways to quantify catastrophe risk: average annual loss with its standard "
        "deviation, exceedance frequency with the return period loss plus VaR.",
        "<p><b>Step 1: how often does the event behind this portfolio's losses happen? How much does one cost?</b></p>"
        "<p><b>Step 2: what does an average spread over many years hide about such an event?</b></p>"
        "<p><b>Step 3: check the other options against what the average includes and which buffer it belongs "
        "to.</b></p>",
    ),
    q="<p>A small insurer covers homes on a river plain. Its actuary reports the average annual loss and says the "
      "insurer is safe as long as premiums cover that figure. Nearly all of the portfolio's expected loss comes from "
      "one kind of event: a major flood, expected about once in a few generations.</p>"
      "<p>What is wrong with the actuary's reasoning?</p>",
    alternativer=[
        R("One flood year would cost many years of average losses at once, so the tail needs its own buffer"),
        F("The average annual loss leaves out the rare flood, since it is computed from normal years only",
          "The average does include the flood, spread thinly over all the years."),
        F("The average annual loss belongs in equity, while premiums must be set from the worst year",
          "This swaps the jobs of the buffers."),
        F("The average annual loss suits only life insurance, whose claims are stable from year to year",
          "The measure is one of the lecture's tools for catastrophe risk, which sits on the non-life side."),
    ],
    kort="<p><b>The tail needs its own buffer.</b> One flood year can cost many years of expected losses. The average "
         "belongs in premiums and provisions; the tail needs equity or risk sharing, measured with the return period "
         "loss and VaR.</p>",
    full="<p><b>Measuring catastrophe risk.</b> Catastrophes are low-probability but high-impact events. Lecture 12 "
         "quantifies them three ways: average annual loss and its standard deviation, exceedance frequency and return "
         "period loss plus value at risk (VaR).</p>"
         "<p><b>An illustration with made-up numbers.</b> A portfolio has a 1% chance each year of a flood costing 500 "
         "and no other losses. The average annual loss is 5, but the 1-in-100-year loss is 500. One flood year costs "
         "a hundred years of expected losses (the definitions of these measures are general background).</p>"
         "<p><b>The case.</b> Premiums that cover the average keep the insurer afloat in normal years only. The rare "
         "flood needs equity or risk sharing.</p>"
         "<p><b>The usual mix-up.</b> Thinking the average captures the risk because it includes the flood. It does "
         "include it, but spread thin over many years.</p>"
         "<p><b>Remember:</b> for catastrophes, look at the tail, not only the mean.</p>",
)

statisk(
    "ins-s14", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about what value at risk does and does not tell an insurer.",
        "On the lecture's loss distribution, VaR is a cut-off at a chosen confidence level. Ask what lies to the "
        "right of the cut-off.",
        "<p><b>Step 1: where on the loss distribution does the VaR sit?</b></p>"
        "<p><b>Step 2: how much probability is left beyond it?</b></p>"
        "<p><b>Step 3: check what the VaR is made of.</b> Does it already include the expected loss?</p>",
    ),
    q="<p>At a board meeting, Nordkapp Forsikring's chief financial officer presents the 99.5% value at risk on its "
      "storm portfolio. A board member concludes: «So that is the most we can ever lose in a year.»</p>"
      "<p>Following the loss distribution in lecture 12, what is wrong with this conclusion?</p>",
    alternativer=[
        R("Losses beyond the VaR still occur, with a probability of 100% minus the confidence level"),
        F("Nothing, since VaR is defined as the largest loss the insurer can suffer",
          "VaR is a cut-off on the distribution at a chosen confidence level, not the end of it."),
        F("VaR measures only the expected loss, so the worst case is twice as large",
          "VaR includes the unexpected loss as well. No fixed multiple gives the worst case."),
        F("VaR measures only the unexpected loss, so the expected loss must be added",
          "On the lecture's figure, VaR already includes the expected loss."),
    ],
    kort="<p><b>VaR is not the worst case.</b> At 99.5%, losses exceed the VaR in about one year in two hundred. "
         "VaR = EL + UL marks a cut-off, not the end of the tail.</p>",
    full="<p><b>VaR on the lecture's figure.</b> On the loss distribution, VaR at a chosen confidence level equals "
         "expected loss (EL) plus unexpected loss (UL). Only the tail, with probability 100% minus the confidence "
         "level, lies beyond it.</p>"
         "<p><b>The case.</b> At 99.5% there is a 0.5% chance each year that storm losses exceed the VaR. Over a "
         "long enough period that will happen. The VaR says how large a loss the insurer should be ready for at "
         "that confidence level, not how large a loss can get.</p>"
         "<p><b>The usual mix-up.</b> Reading VaR as the largest possible loss, or as the unexpected loss alone. "
         "Both are false.</p>"
         "<p><b>Remember:</b> VaR = EL + UL; the tail beyond it is still there.</p>",
)

statisk(
    "ins-s16", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the exceedance frequency and the return period loss, two of lecture 12's measures of "
        "catastrophe risk.",
        "The exceedance frequency is the yearly probability that losses exceed a given amount. The return period is "
        "its inverse.",
        "<p><b>Step 1: turn the return period into a yearly probability.</b></p>"
        "<p><b>Step 2: ask whether that probability makes the amount a maximum, an average, a timetable or a "
        "threshold.</b></p>"
        "<p><b>Step 3: pick the reading that matches.</b></p>",
    ),
    q="<p>A reinsurer tells Fjord Forsikring that its 1-in-100-year flood loss is EUR 2 billion. Two directors read "
      "this differently. Which reading is correct?</p>",
    alternativer=[
        R("Each year carries a 1% probability that flood losses go above EUR 2 billion"),
        F("Flood losses of EUR 2 billion are due once a century, so another one soon after is unlikely",
          "A return period is the inverse of a yearly probability, not a timetable."),
        F("Flood losses cannot exceed EUR 2 billion, since the 1-in-100-year event is the model's worst case",
          "Losses can be larger. The figure is exceeded with a small yearly probability."),
        F("Flood losses average EUR 2 billion a year, the expected loss that premiums must cover",
          "The average annual loss is the expected yearly loss, a far smaller number for a rare event."),
    ],
    kort="<p><b>A 1% yearly chance of exceeding EUR 2 billion.</b> The return period is the inverse of the annual "
         "exceedance probability, not a schedule and not a cap.</p>",
    full="<p><b>The measure.</b> Lecture 12 lists exceedance frequency and return period loss among the ways to "
         "quantify catastrophe risk. The exceedance frequency is the annual probability that losses exceed a given "
         "amount; the return period is its inverse. A loss with a 1% annual chance of being exceeded is the "
         "1-in-100-year loss (the definitions are general background, not from the slides).</p>"
         "<p><b>The case.</b> EUR 2 billion is exceeded with a 1% probability in any given year.</p>"
         "<p><b>The usual mix-up.</b> Reading «1 in 100 years» as a timetable. Each year carries the same chance, so "
         "two such floods can come close together. Another mix-up is treating it as the maximum or as the average: "
         "it is a threshold in the tail. The average annual loss is far smaller.</p>"
         "<p><b>Remember:</b> a 1-in-100-year loss is exceeded with a 1% chance each year.</p>",
)

# ---------------------------------------------------------------------------
# Risikodeling
# ---------------------------------------------------------------------------
statisk(
    "ins-s17", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about how a catastrophe bond differs from an ordinary corporate bond.",
        "Lecture 12 defines cat bonds by what the issuer is allowed to do when a catastrophic loss occurs.",
        "<p><b>Step 1: when does an ordinary bond stop paying?</b></p>"
        "<p><b>Step 2: what extra event can affect the cat bond's payments?</b></p>"
        "<p><b>Step 3: who carries the loss in that event: the insurer or the bondholder?</b></p>",
    ),
    q="<p>An investor compares two bonds from the same insurer with the same maturity. One is an ordinary "
      "corporate bond. The other is a catastrophe bond. Following the definition in lecture 12, what extra risk "
      "does the cat bond carry?</p>",
    alternativer=[
        R("Its scheduled payments can be skipped or deferred after a catastrophic loss"),
        F("The investor must pay extra money to the insurer if a catastrophe occurs",
          "A bondholder never pays in more than the price of the bond."),
        F("The bond's payments rise after a catastrophe, which makes its value hard to predict",
          "Payments do not rise after a catastrophe. That reverses who carries the loss."),
        F("None beyond default, since payments can only be skipped if the insurer goes bankrupt",
          "That would make it an ordinary bond."),
    ],
    kort="<p><b>Payments can be skipped or deferred after a catastrophe.</b> The cat bond moves part of the "
         "insurer's tail risk to bond investors.</p>",
    full="<p><b>The definition.</b> Lecture 12 defines catastrophe bonds as corporate bonds that allow the issuer "
         "to skip or defer scheduled payments if a catastrophic loss occurs. They are one of three layers of risk "
         "sharing, next to reinsurance and government programmes.</p>"
         "<p><b>The comparison.</b> The ordinary bond stops paying only if the insurer defaults. The cat bond can "
         "stop or delay payments when a catastrophe hits, even if the insurer stays solvent. The bondholders "
         "absorb part of the loss. In return they get a higher coupon (general background, not from the "
         "lecture).</p>"
         "<p><b>The usual mix-up.</b> Thinking investors gain from a disaster or must pay in after one. The issuer "
         "may skip or defer payments, so the investor carries part of the loss.</p>"
         "<p><b>Remember:</b> a cat bond lets the issuer skip or defer payments after a catastrophe.</p>",
)

statisk(
    "ins-s18", tema="forsikring", type="paastand",
    hjelp=hjelp3(
        "This is about the three layers lecture 12 describes for sharing catastrophe risk.",
        "The layers are insurers and reinsurers, government programmes and catastrophe bonds. Check what each "
        "statement says about when a layer steps in and who carries the loss.",
        "<p><b>Step 1: for each statement, name the layer it describes.</b></p>"
        "<p><b>Step 2: check the direction.</b> Who pays whom and when?</p>"
        "<p><b>Step 3: check whether the layers replace each other or come on top of each other.</b></p>",
    ),
    q="<p>Which statement about how catastrophe risk is shared, as described in lecture 12, is correct?</p>",
    alternativer=[
        R("Government programmes may cover part of large catastrophes when insurance and reinsurance fall short"),
        F("Government programmes such as the US NFIP replace reinsurance, so insurers no longer need reinsurers",
          "The programmes are not a substitute for reinsurance in the lecture's layers."),
        F("Cat bond investors receive extra payments after a disaster, which is what attracts them to the bonds",
          "After a catastrophic loss the issuer may skip or defer payments. Investors carry part of the loss."),
        F("A catastrophe too big for one insurer must stay with it, since such a risk cannot be divided up",
          "The lecture's first layer is to divide such a risk among insurers and reinsurers."),
    ],
    kort="<p><b>Government programmes are a backstop.</b> They may cover part of the risk in large catastrophes "
         "when insurance and reinsurance do not suffice, as the US NFIP does.</p>",
    full="<p><b>Three layers.</b> First, a catastrophe too big for one insurer is divided among insurers and "
         "reinsurers. Second, government programmes may cover part of the risk in large catastrophes when "
         "insurance and reinsurance do not suffice, for example the US National Flood Insurance Programme. Third, "
         "catastrophe bonds let the issuer skip or defer scheduled payments if a catastrophic loss occurs.</p>"
         "<p><b>Why the statement is right.</b> It describes the second layer as the lecture does: a backstop, not "
         "a substitute.</p>"
         "<p><b>The usual mix-ups.</b> «Government programmes replace reinsurance» is false. «Cat bond investors "
         "receive extra payments after a disaster» is false: payments to them may be skipped or deferred, so they "
         "absorb part of the loss.</p>"
         "<p><b>Remember:</b> divide among insurers and reinsurers; the state steps in when that is not enough; "
         "cat bonds move part of the tail to bond investors.</p>",
)

# ---------------------------------------------------------------------------
# Klimaendringer og forsikring
# ---------------------------------------------------------------------------
statisk(
    "ins-s19", tema="forsikring", type="begrep",
    hjelp=hjelp3(
        "This is about the natural hazards that Schoenmaker &amp; Schramade say climate change intensifies.",
        "The list has seven hazards. Ask for each option whether a warmer climate can make it more frequent or "
        "more intense.",
        "<p><b>Step 1: recall the seven hazards on the list.</b></p>"
        "<p><b>Step 2: strike each option that is on the list.</b></p>"
        "<p><b>Step 3: check that what is left is a hazard with a cause other than the climate.</b></p>",
    ),
    q="<p>Schoenmaker &amp; Schramade (2019) list seven natural hazards that climate change intensifies. An insurer "
      "reviews its portfolio against that list. Which hazard is not on it?</p>",
    alternativer=[
        R("Volcanic eruptions"),
        F("Hurricanes (tropical cyclones)", "Hurricanes are on the list."),
        F("Landslides", "Landslides are on the list."),
        F("Heat waves", "Heat waves, as temperature change, are on the list."),
    ],
    kort="<p><b>Volcanic eruptions.</b> The seven are temperature change (heat waves), sea-level rise, droughts, "
         "hurricanes, heavy rainfall, flooding and landslides.</p>",
    full="<p><b>The list.</b> Schoenmaker &amp; Schramade (2019) name seven natural hazards that climate change "
         "intensifies: temperature change (heat waves), sea-level rise, droughts, hurricanes (tropical cyclones), "
         "heavy rainfall, flooding and landslides.</p>"
         "<p><b>The case.</b> Volcanic eruptions are geological, not driven by the climate. They are not on "
         "the list. Earthquakes are not on it either, although catastrophe modelling covers them.</p>"
         "<p><b>Why it matters.</b> Climate change works on the hazard component of the catastrophe model. A "
         "hazard on the list can become more frequent or more intense as the planet warms. The IPCC projections on "
         "the slide show warming and sea-level rise far higher under the highest emission scenario than under the "
         "most stringent reduction scenario.</p>"
         "<p><b>The usual mix-up.</b> Assuming every natural catastrophe is climate-related.</p>"
         "<p><b>Remember:</b> heat, sea level, drought, hurricanes, heavy rain, floods, landslides.</p>",
)

statisk(
    "ins-s20", tema="forsikring", type="fakta",
    hjelp=hjelp3(
        "This is about the direction of the projections in the lecture's insurance scenario analysis and what drives "
        "them.",
        "Check two things: do claims rise or fall at the lower warming level? Which type of claim drives the "
        "change?",
        "<p><b>Step 1: recall whether claims rise or fall in each warming scenario.</b></p>"
        "<p><b>Step 2: recall which parts of the climate-related claims grow and which stay flat.</b> Storm, rain "
        "or hail?</p>"
        "<p><b>Step 3: strike every statement that gets either point wrong.</b></p>",
    ),
    q="<p>Lecture 12's scenario analysis, DNB (2017), projects climate-related claims on homeowner's insurance to 2085 "
      "under two levels of warming. Which statement matches its results?</p>",
    alternativer=[
        R("Claims rise in both scenarios, more at 3.5 °C, with the rise coming from rain and hail"),
        F("Claims stay at today's level at 1.5 °C and start to rise only once warming passes 2 °C",
          "Claims rise even in the lower warming scenario."),
        F("Claims rise in both scenarios, with storm damage driving the whole increase",
          "The storm component stays the same in every estimate."),
        F("Claims fall at 1.5 °C, since adaptation then outpaces the warming",
          "The projections do not fall in either scenario."),
    ],
    kort="<p><b>Claims rise in both scenarios, driven by rain and hail.</b> Climate-related claims rise 10% to 52% by "
         "2085 at 1.5 °C and 25% to 131% at 3.5 °C. Storm claims stay flat.</p>",
    full="<p><b>The study.</b> «DNB (2017)», shown via the NGFS, is the Waterproof report of De Nederlandsche Bank, the "
         "Dutch central bank (general background). It projects climate-related claims on Dutch homeowner's "
         "policies.</p>"
         "<p><b>The numbers.</b> In 2016 climate-related claims were EUR 409 million (storm 187, hail 108, rain 114). "
         "By 2085 they rise to 450 to 623 at 1.5 °C (+10% to +52%) and to 513 to 945 at 3.5 °C (+25% to "
         "+131%).</p>"
         "<p><b>What to take from it.</b> Claims rise even at 1.5 °C and much more at 3.5 °C. The storm component "
         "stays at 187 in every estimate: the increase comes from rain and hail. Premiums must rise or margins "
         "shrink.</p>"
         "<p><b>Remember:</b> claims rise in both scenarios, driven by rain and hail, not storms.</p>",
)

statisk(
    "ins-s21", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about what a projected rise in climate-related claims means for an insurer's profit and loss.",
        "An insurer's result is premium income plus investment income minus claims and expenses. Expected claims "
        "belong in premiums and provisions.",
        "<p><b>Step 1: hold premiums fixed and raise claims.</b> What happens to what is left for costs and "
        "profit?</p>"
        "<p><b>Step 2: ask whether the rise is expected or unexpected.</b> Which buffer is meant for it?</p>"
        "<p><b>Step 3: strike options that send an expected rise to the wrong place.</b></p>",
    ),
    q="<p>A Dutch home insurer reads the DNB (2017) projections. Climate-related claims were about 13% of its 2016 "
      "premiums. In the high 3.5 °C estimate for 2085 they would be about 31% of 2016 premiums.</p>"
      "<p>If the insurer keeps its premiums at the 2016 level, what follows?</p>",
    alternativer=[
        R("Its margins shrink, since more of each premium goes to climate-related claims"),
        F("Nothing changes, since technical provisions absorb any rise in claims",
          "Provisions are set aside for expected claims and are funded by premiums. A rise in expected claims "
          "has to be paid for."),
        F("Its margins grow, since higher claims show that clients value the cover more",
          "Higher claims with unchanged premiums leave less for costs and profit, not more."),
        F("Its equity must cover the rise, since equity is the buffer for climate risk",
          "Equity covers unexpected claims. A projected rise in average claims is expected."),
    ],
    kort="<p><b>Margins shrink.</b> With premiums frozen, climate-related claims take a larger share of each euro. "
         "That is why the lecture concludes that premiums must rise or margins shrink.</p>",
    full="<p><b>The numbers.</b> In 2016 Dutch homeowner's policies brought in EUR 3,096 million in premiums, of "
         "which 409 went to climate-related claims: 13%. In the high 3.5 °C estimate for 2085, climate-related "
         "claims reach 945, about 31% of 2016 premiums (DNB 2017, De Nederlandsche Bank).</p>"
         "<p><b>The logic.</b> Premiums pay for claims, other costs and the profit margin. If the climate part of "
         "claims grows while premiums stay put, something else must give.</p>"
         "<p><b>The usual mix-up.</b> Sending a projected rise to equity. A rise in the average is expected loss: "
         "it belongs in premiums and provisions. Equity is for the unexpected.</p>"
         "<p><b>Remember:</b> higher expected claims mean higher premiums or thinner margins.</p>",
)

# ---------------------------------------------------------------------------
# UN Principles for Sustainable Insurance
# ---------------------------------------------------------------------------
statisk(
    "ins-s22", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about matching an insurer's action to one of UNEP FI's four Principles for Sustainable "
        "Insurance.",
        "The four principles run outwards: the insurer's own decisions, its clients and partners, society at "
        "large and finally reporting on progress.",
        "<p><b>Step 1: who is the insurer working with?</b> Clients, business partners or public bodies?</p>"
        "<p><b>Step 2: how wide is the intended effect?</b> One client or the whole country?</p>"
        "<p><b>Step 3: match that to the principle.</b></p>",
    ),
    q="<p>A Norwegian insurer joins forces with the national building authority and several municipalities to push "
      "for rules that stop new homes being built on flood plains across the country. Which of the four Principles "
      "for Sustainable Insurance does this put into practice?</p>",
    alternativer=[
        R("Principle 3: working with governments and regulators to promote action across society"),
        F("Principle 1: embedding ESG issues in its own decision-making",
          "Nothing changes in the insurer's own decision-making."),
        F("Principle 2: working with clients and business partners to manage risk and find solutions",
          "Building authorities and municipalities are not clients or business partners."),
        F("Principle 4: disclosing its progress in implementing the principles",
          "Nothing is being disclosed or reported."),
    ],
    kort="<p><b>Principle 3.</b> The insurer works with governments, regulators and other key stakeholders to "
         "promote widespread action across society on ESG issues.</p>",
    full="<p><b>The PSI.</b> UNEP FI's Principles for Sustainable Insurance are four. 1: embed in decision-making "
         "the ESG issues relevant to the insurance business. 2: work with clients and business partners to raise "
         "awareness, manage risk and develop solutions. 3: work with governments, regulators and other key "
         "stakeholders to promote widespread action across society. 4: demonstrate accountability and "
         "transparency by regularly disclosing progress. The order runs outwards: own decisions, clients and "
         "partners, society, reporting.</p>"
         "<p><b>The case.</b> A building authority and municipalities are public bodies. The goal is a rule for the "
         "whole country: action across society.</p>"
         "<p><b>The usual mix-up.</b> Choosing principle 2 because flood-proofing helps clients. Principle 2 is "
         "about clients and business partners; principle 3 about governments, regulators and society.</p>"
         "<p><b>Remember:</b> own decisions, clients, society, reporting.</p>",
)

statisk(
    "ins-s23", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about which of the four PSI principles an internal change at an insurer belongs to.",
        "Principle 1 concerns the insurer's own decisions, 2 its clients and partners, 3 governments and society "
        "and 4 public reporting.",
        "<p><b>Step 1: who takes part in the change?</b> Only the insurer, or others as well?</p>"
        "<p><b>Step 2: is anything shared with clients, public bodies or the public?</b></p>"
        "<p><b>Step 3: match the change to the principle.</b></p>",
    ),
    q="<p>An insurer rewrites its underwriting guidelines so that every new commercial policy is checked for the "
      "client's exposure to climate and pollution risks before it is priced and accepted. Nothing is published "
      "and no outside party is involved. Which PSI principle does this implement?</p>",
    alternativer=[
        R("Principle 1: embedding relevant ESG issues in its own decision-making"),
        F("Principle 2: working together with clients and business partners on ESG risks",
          "Checking a client before accepting it is a decision the insurer makes alone, not joint work."),
        F("Principle 3: working with governments and regulators across society",
          "No public body is involved."),
        F("Principle 4: disclosing progress in implementing the principles",
          "The case says nothing is published."),
    ],
    kort="<p><b>Principle 1.</b> Building ESG checks into underwriting embeds the ESG issues relevant to the "
         "insurance business in the insurer's own decisions.</p>",
    full="<p><b>The PSI.</b> UNEP FI's four Principles for Sustainable Insurance run outwards: embed ESG issues in "
         "decision-making, work with clients and business partners, work with governments, regulators and other "
         "stakeholders and disclose progress regularly.</p>"
         "<p><b>The case.</b> Underwriting is the insurer's core decision: which risks to accept and at what price. "
         "Adding climate and pollution checks to it embeds ESG in its own decision-making. No client works with "
         "it, no public body is involved and nothing is disclosed.</p>"
         "<p><b>The usual mix-up.</b> Choosing principle 2 because the checks concern clients. Principle 2 is joint "
         "work with clients and partners, such as raising awareness or developing solutions together. Assessing a "
         "client before accepting it is the insurer's own decision.</p>"
         "<p><b>Remember:</b> principle 1 is about the insurer's own decisions.</p>",
)

statisk(
    "ins-s24", tema="forsikring", type="paastand",
    hjelp=hjelp3(
        "This is about what UNEP FI's Principles for Sustainable Insurance are and what they ask.",
        "Check each description on three points: are the PSI voluntary or law? Whom are they written for? In what "
        "order do the four principles come?",
        "<p><b>Step 1: who issues the PSI and are they binding?</b></p>"
        "<p><b>Step 2: recall what principle 1 and principle 4 ask.</b></p>"
        "<p><b>Step 3: recall which framework for investors the PSI are the counterpart of.</b></p>",
    ),
    q="<p>Which description of the Principles for Sustainable Insurance (PSI) is correct?</p>",
    alternativer=[
        R("Voluntary UNEP FI principles: own decisions, then clients and partners, then society, then disclosure"),
        F("Binding EU principles in force since 2 August 2022: own decisions, clients, regulators, then disclosure",
          "The sustainability amendments of 2 August 2022 are to Solvency II and the IDD. The PSI are not EU law."),
        F("Voluntary UNEP FI principles: disclosure first, then society, then clients, with own decisions last",
          "This reverses the order of the principles."),
        F("Voluntary principles shared with banks and applied project by project, like the Equator Principles",
          "The PSI are written for insurers. The Equator Principles are a banking benchmark for risk in projects."),
    ],
    kort="<p><b>Voluntary UNEP FI principles that start with the insurer's own decisions.</b> Then come clients and "
         "partners, governments and society and finally disclosure of progress. They are the insurance counterpart "
         "of the PRI.</p>",
    full="<p><b>What the PSI are.</b> UNEP FI's Principles for Sustainable Insurance were launched with a keynote by "
         "UNEP Executive Director Achim Steiner. They are voluntary principles for insurers, the counterpart to the "
         "UN PRI for investors (lecture 8) and to the Principles for Responsible Banking (lecture 11).</p>"
         "<p><b>The four principles.</b> 1: embed ESG issues in decision-making. 2: work with clients and business "
         "partners. 3: work with governments, regulators and other stakeholders. 4: disclose progress regularly. The "
         "order runs outwards and ends with reporting.</p>"
         "<p><b>The usual mix-ups.</b> Confusing the PSI with EU law: the sustainability amendments to Solvency II and "
         "the IDD from 2 August 2022 are regulation, while the PSI are voluntary. Confusing them with the Equator "
         "Principles, which are a banking benchmark for risk in projects.</p>"
         "<p><b>Remember:</b> PSI: four voluntary principles, from own decisions to reporting.</p>",
)

# ---------------------------------------------------------------------------
# Regulering: Solvens II, IDD og EYs pakke
# ---------------------------------------------------------------------------
statisk(
    "ins-s25", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the EU rules that brought sustainability into insurance regulation.",
        "Lecture 12 names four EU rules for insurers in EY's package. Each has its own focus: capital, product "
        "design and distribution, disclosure or classification.",
        "<p><b>Step 1: what is the insurer doing?</b> Holding capital, selling a product to a customer, "
        "disclosing or classifying activities?</p>"
        "<p><b>Step 2: match that activity to the rule whose focus it is.</b></p>",
    ),
    q="<p>Since August 2022, an EU insurer that sells a savings product with insurance cover must take "
      "sustainability into account when it assesses whether the product suits the customer in front of it. Which "
      "rule does this requirement come from?</p>",
    alternativer=[
        R("The IDD"),
        F("Solvency II",
          "Solvency II's primary focus is capital requirements. Suitability assessments are not where its "
          "sustainability amendments apply."),
        F("The SFDR", "The SFDR is a disclosure regulation. It does not govern the suitability assessment."),
        F("The EU Taxonomy", "The taxonomy classifies economic activities. It does not regulate how products are "
                             "sold."),
    ],
    kort="<p><b>The IDD.</b> Since 2 August 2022 the Insurance Distribution Directive integrates sustainability into "
         "insurers' product governance and suitability assessments.</p>",
    full="<p><b>Two EU rules.</b> Solvency II codifies and harmonises EU insurance regulation, with a primary focus "
         "on capital requirements. Since 2 August 2022, two delegated acts integrate sustainability risks and "
         "factors into insurers' risk management, rules of conduct and product governance. The Insurance "
         "Distribution Directive (IDD) regulates how insurance products are designed and distributed. Since the "
         "same date it integrates sustainability into product governance and suitability assessments (EY).</p>"
         "<p><b>The case.</b> Checking whether a product suits the customer, with sustainability taken into "
         "account, is a suitability assessment: the IDD.</p>"
         "<p><b>The usual mix-up.</b> Choosing Solvency II because it also changed in 2022. Its focus is capital "
         "and risk management. The SFDR and the taxonomy are disclosure and classification rules from lectures 7 "
         "and 8.</p>"
         "<p><b>Remember:</b> Solvency II: capital. IDD: product design, distribution and suitability.</p>",
)

statisk(
    "ins-s26", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the EU rules that changed for insurers on the same date and what each one covers.",
        "Lecture 12 compares two EU rules for insurers: one with a primary focus on capital requirements and one "
        "on how products are designed and distributed.",
        "<p><b>Step 1: which part of the insurer does the change reach?</b> Its risk management, its sales or its "
        "disclosures?</p>"
        "<p><b>Step 2: match that to the rule.</b></p>"
        "<p><b>Step 3: strike any option that is not an EU rule for insurers.</b></p>",
    ),
    q="<p>An EU insurer's risk management function must now include sustainability risks, such as the effect of "
      "floods on its claims and of a carbon price on its investments, in its regular risk assessment. The "
      "requirement came with delegated acts that took effect on 2 August 2022.</p>"
      "<p>Which rule is this?</p>",
    alternativer=[
        R("Solvency II"),
        F("The IDD", "The IDD's changes concern product governance and suitability assessments, not the risk "
                     "management function."),
        F("The SFDR", "The SFDR is a disclosure regulation. It does not set requirements for the risk management "
                      "function."),
        F("The Equator Principles", "These are a voluntary banking benchmark for risk in projects, not an EU rule "
                                    "for insurers."),
    ],
    kort="<p><b>Solvency II.</b> Its delegated acts from 2 August 2022 integrate sustainability risks and factors "
         "into insurers' risk management, rules of conduct and product governance.</p>",
    full="<p><b>Solvency II.</b> The EU directive that codifies and harmonises insurance regulation, with a primary "
         "focus on capital requirements. On 2 August 2022, two major delegated acts came into force that "
         "integrate sustainability risks and factors into insurers' risk management, rules of conduct and product "
         "governance obligations.</p>"
         "<p><b>The case.</b> The change concerns the risk management function and the insurer's regular risk "
         "assessment. That is Solvency II.</p>"
         "<p><b>The usual mix-up.</b> Choosing the IDD because it changed on the same date. The IDD regulates how "
         "products are designed and distributed and added sustainability to product governance and suitability "
         "assessments. In EY's package, the SFDR is the rule that applies only to life insurance.</p>"
         "<p><b>Remember:</b> risk management and capital: Solvency II.</p>",
)

statisk(
    "ins-s27", tema="forsikring", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about EY's sustainable finance package for insurers and which rule applies to which insurers.",
        "EY groups four rules: Solvency II, the IDD, the EU Taxonomy and the SFDR. One of the four applies to "
        "only one kind of insurance.",
        "<p><b>Step 1: recall which of the four rules applies to only one kind of insurer.</b></p>"
        "<p><b>Step 2: ask what that kind of insurance sells that the other does not.</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements about EY's sustainable finance package for insurers in lecture 12.</p>"
      "<p>I. The SFDR applies to a non-life insurer's home and motor policies.<br>"
      "II. Solvency II, the IDD and the EU Taxonomy apply to both life and non-life insurers.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Statement I fails: in EY's package the SFDR applies only to life insurance."),
        R("Only II"),
        F("Both I and II", "Statement I fails: home and motor cover is non-life, which the SFDR does not "
                           "reach."),
        F("Neither I nor II", "Look again at statement II: which three rules does EY apply to both kinds of "
                              "insurer?"),
    ],
    kort="<p><b>Only II.</b> Solvency II, the IDD and the Taxonomy apply to life and non-life insurers. The SFDR "
         "applies only to life insurance, where clients save and invest.</p>",
    full="<p><b>Statement II.</b> EY groups four rules into a sustainable finance package for insurers. Solvency II, "
         "the IDD and the EU Taxonomy apply to life and non-life insurers alike. The statement is correct.</p>"
         "<p><b>Statement I.</b> The SFDR applies only to life insurance, the savings and investment side. Home "
         "and motor policies are non-life cover, so the SFDR does not reach them. The statement is false.</p>"
         "<p><b>Why the split.</b> The SFDR is a disclosure regulation for financial products that invest money "
         "for clients (lectures 7 and 8). Life insurance includes savings and investments; home and motor cover "
         "does not.</p>"
         "<p><b>Remember:</b> Solvency II, IDD and Taxonomy for all insurers; SFDR for life only.</p>",
)

# ---------------------------------------------------------------------------
# Mikroforsikring, resultat og pooling
# ---------------------------------------------------------------------------
statisk(
    "ins-s28", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about what microinsurance is, who supplies it and what the lecture says about its impact.",
        "Lecture 12 describes microinsurance by its clients, the risks it covers, its three kinds of supplier and "
        "its economic and social impact.",
        "<p><b>Step 1: is the product aimed at low-income people?</b> What risks does it cover?</p>"
        "<p><b>Step 2: check each statement's claim about suppliers, risks covered and profitability.</b></p>"
        "<p><b>Step 3: keep the statement with no wrong claim.</b></p>",
    ),
    q="<p>In a rural district, a microfinance institution starts selling cheap crop and health insurance to "
      "smallholder farmers who already borrow from it. A farmer whose harvest fails is paid enough to avoid "
      "selling her land. Which statement about this fits lecture 12?</p>",
    alternativer=[
        R("It is microinsurance: cover against shocks that helps poor people avoid the poverty trap"),
        F("It is not microinsurance, since only commercial insurers can supply it",
          "The lecture names three kinds of supplier. Commercial insurers are only one of them."),
        F("It is microinsurance, which the lecture calls easy to sustain and make profitable",
          "The lecture says the opposite about the economic side."),
        F("It is microinsurance, but only its crop cover counts, since it covers property risks only",
          "Microinsurance covers health risks as well as property risks."),
    ],
    kort="<p><b>Microinsurance.</b> Financial protection of low-income people and micro-enterprises against health "
         "and property risks. Microfinance institutions are one of its three kinds of supplier.</p>",
    full="<p><b>The definition.</b> Microinsurance is financial protection of low-income people and "
         "micro-enterprises (Schoenmaker &amp; Schramade 2019). It covers health risks (illness, injury, death) "
         "and property risks (damage or loss), for example as crop and health insurance. It helps people deal "
         "with unexpected shocks and avoid the poverty trap.</p>"
         "<p><b>Suppliers and impact.</b> Suppliers are commercial insurers, community-based organisations and "
         "cooperatives plus microfinance institutions. Economically, microinsurance firms are difficult to sustain "
         "and make profitable. Socially, they improve access to healthcare and reduce catastrophic "
         "expenditures.</p>"
         "<p><b>The case.</b> A microfinance institution insures poor farmers against crop failure and illness. "
         "The payout lets the farmer keep her land after a shock.</p>"
         "<p><b>The usual mix-up.</b> Assuming a good social effect means a good business. The lecture says the "
         "economic side is the weak one.</p>"
         "<p><b>Remember:</b> socially valuable, hard to make profitable.</p>",
)

statisk(
    "ins-s29", tema="forsikring", type="tolkning",
    hjelp=hjelp3(
        "This is about the value drivers in a typical insurer's profit and loss account.",
        "Lecture 12 lists two income lines and two cost lines in the insurer's P&amp;L. The balance sheet holds "
        "the buffers.",
        "<p><b>Step 1: name the two income lines.</b></p>"
        "<p><b>Step 2: if one of them only covers the costs, where must the profit come from?</b></p>"
        "<p><b>Step 3: strike options that treat a balance sheet item as income.</b></p>",
    ),
    q="<p>In a normal year, Fjordsikring's premiums just cover its policyholders' claims and its expenses. Yet the "
      "insurer reports a solid profit. Following the value drivers in lecture 12, where does the profit come "
      "from?</p>",
    alternativer=[
        R("Investment income on the premiums it holds until claims are paid"),
        F("Technical provisions, which count as income when they are set aside",
          "Provisions are a liability set aside for expected claims, not income."),
        F("Equity raised from shareholders, which is booked as income in the year it is raised",
          "New equity is funding on the balance sheet, not income in the profit and loss account."),
        F("Reinsurers, who pay the insurer a fee for taking on its risks",
          "It is the other way round: an insurer pays reinsurers to take on part of its risks."),
    ],
    kort="<p><b>Investment income.</b> The P&amp;L is premium income plus investment income, minus claims and "
         "expenses. Premiums are invested until claims fall due.</p>",
    full="<p><b>The value drivers.</b> Lecture 12 shows a typical insurer's profit and loss account: premium income "
         "plus investment income, minus policyholders' claims and expenses. On the balance sheet, technical "
         "provisions cover expected claims and equity covers unexpected claims.</p>"
         "<p><b>The case.</b> Premiums cover claims and expenses, so the insurance side breaks even. The profit "
         "comes from investing the money between the premium and the claim.</p>"
         "<p><b>Why it matters for sustainability.</b> Because so much money is invested, insurers are large asset "
         "managers. Their investments carry their own material issues, which the lecture adds to SASB's list for "
         "insurers.</p>"
         "<p><b>The usual mix-up.</b> Treating provisions or new equity as income. Both sit on the funding side of "
         "the balance sheet.</p>"
         "<p><b>Remember:</b> premiums plus investment income, minus claims and expenses.</p>",
)

statisk(
    "ins-s30", tema="forsikring", type="paastand",
    hjelp=hjelp3(
        "This is about what pooling does for an insurer and where it stops working.",
        "Pooling combines the risks of many clients. Lecture 12 keeps it apart from the insurer's other role, "
        "capital accumulation and investment.",
        "<p><b>Step 1: what does spreading a loss over many clients make predictable?</b></p>"
        "<p><b>Step 2: is there a kind of loss that spreading cannot help with?</b></p>"
        "<p><b>Step 3: strike statements that describe the other role or deny that losses are shared.</b></p>",
    ),
    q="<p>Which statement about pooling in insurance, as lecture 12 describes it, is correct?</p>",
    alternativer=[
        R("It makes the average predictable but cannot remove a year when one event hits many clients"),
        F("It removes all risk once the pool is large enough, so no equity is needed for claims",
          "Size does not help when one event hits a whole region at once."),
        F("It is the insurer's investment role: premiums are pooled and invested until claims fall due",
          "Investing premiums is the other role, capital accumulation and investment."),
        F("It means each client pays for her own losses, so the insurer carries none of the risk",
          "Pooling spreads each loss over all the clients in the pool."),
    ],
    kort="<p><b>The average yes, the bad year no.</b> Pooling spreads each loss over many clients, so the average "
         "claim becomes predictable. One storm that hits a whole region at once is not spread away: that is what "
         "equity is for.</p>",
    full="<p><b>Pooling.</b> By combining the risks of many clients in a pool, the insurer spreads the financial "
         "impact of a loss over all of them (lecture 12). With many separate risks the average claim becomes "
         "predictable, so it can be priced into premiums and held as technical provisions.</p>"
         "<p><b>Its limit.</b> Pooling cannot remove the bad year when one storm hits a whole region at once. "
         "Those losses arrive together. That is why equity covers unexpected claims and why catastrophe risk is "
         "shared with reinsurers, government programmes and cat bond investors.</p>"
         "<p><b>The usual mix-ups.</b> Pooling is not the investment role: investing premiums until claims fall "
         "due is capital accumulation. Nor does pooling leave each client with her own losses; it spreads "
         "them.</p>"
         "<p><b>Remember:</b> pooling tames the average, not the catastrophe.</p>",
)
