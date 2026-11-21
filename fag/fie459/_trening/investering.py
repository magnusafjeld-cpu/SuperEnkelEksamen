# -*- coding: utf-8 -*-
"""FIE459 eksamenstrening · investering (forelesning 8, Investing for long-term value creation).

   Kilder: manualkapittel 8 (fag/fie459/_fragmenter/k8.html), foilene
   FIE459_H26_8_Investing_for_LTVC i _tekst/ og docs/fie459-forfatterspek.md § 5
   (k8). Alfa-fortegnet på foil 67 er feil; alfa forklares med ord i esg_priser.py.

   Statiske spørsmål inv-s01 … inv-s30. id-ene er lagringsnøkler og endres aldri.
"""
from trening_lib import *  # noqa: F401,F403

# ---------------------------------------------------------------------------
# Porteføljevalg med en ESG-skranke
# ---------------------------------------------------------------------------

statisk(
    "inv-s01", tema="investering", type="begrep",
    hjelp=hjelp3(
        "This is about modern portfolio theory: the trade-off between expected return and risk.",
        "Risk-averse investors want as much expected return as possible for the risk they take. Diversification "
        "lowers portfolio risk and pushes the attainable combinations outwards. Some feasible portfolios are "
        "beaten by others with the same risk.",
        "<p><b>Step 1: picture every portfolio</b> on a chart of risk against expected return.</p>"
        "<p><b>Step 2: for each level of risk,</b> which portfolio would a risk-averse investor pick?</p>"
        "<p><b>Step 3: join those choices up.</b> What does the curve show?</p>",
    ),
    q="<p>An investor uses Markowitz's (1952) portfolio selection to choose among many risky portfolios. What does "
      "the efficient frontier show her?</p>",
    alternativer=[
        R("The highest expected return she can get for each level of risk"),
        F("Every portfolio she can form from the available assets",
          "That is the feasible set: all portfolios, good and bad. The frontier is a much smaller group."),
        F("The single portfolio with the lowest possible volatility",
          "That is one point. The frontier is a whole curve of portfolios."),
        F("The portfolios with the best ESG score for each level of return",
          "Markowitz's frontier uses only expected return and risk. ESG enters with the ESG-efficient frontier of "
          "Pedersen, Fitzgibbons and Pomorski."),
    ],
    kort="<p><b>The highest expected return for each level of risk.</b> A portfolio below the frontier is beaten by "
         "one with the same risk and a higher return.</p>",
    full="<p><b>Modern portfolio theory.</b> Markowitz (1952) frames investing as a trade-off: risk-averse investors "
         "maximise expected return for a given level of risk. Combining assets that are not perfectly correlated "
         "lowers risk, so diversification pushes the attainable combinations outwards.</p>"
         "<p><b>The efficient frontier.</b> Of all feasible portfolios, the efficient ones offer the maximum "
         "expected return for each level of risk. Any portfolio below the curve is beaten by one on the curve with "
         "the same risk and more return.</p>"
         "<p><b>The lecture's point.</b> Lecture 8 writes the problem as an optimisation: maximise the weighted "
         "return subject to a risk tolerance. Adding an emission tolerance is just one more constraint. Pedersen, "
         "Fitzgibbons and Pomorski (2021) trace the result: the ESG-efficient frontier.</p>"
         "<p><b>The traps.</b> The feasible set is every portfolio. The minimum-variance portfolio is a single "
         "point.</p>"
         "<p><b>Remember:</b> efficient means that no other portfolio gives more return for the same risk.</p>",
)

statisk(
    "inv-s02", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the difference between using ESG information as a constraint and using it in the "
        "forecasts.",
        "Adding a constraint to an optimisation can only keep or shrink the set of portfolios to choose from. "
        "Information that helps predict returns improves the inputs to the optimisation instead.",
        "<p><b>Step 1: what does a cap do to her menu of portfolios?</b></p>"
        "<p><b>Step 2: what can a smaller menu do to her best Sharpe ratio?</b></p>"
        "<p><b>Step 3: where does a view about returns belong</b> in the optimisation?</p>",
    ),
    q="<p>A portfolio manager believes that firms with low emissions will earn higher returns than the market "
      "expects. To profit from this view, she adds a hard cap on portfolio emissions to her mean-variance "
      "optimisation. What does lecture 8 suggest?</p>",
    alternativer=[
        R("Put the view into her return forecasts, since a cap only shrinks her menu"),
        F("The cap is the right tool, since it will raise her highest Sharpe ratio",
          "A constraint removes choices. The best portfolio on a smaller menu cannot beat the best on the full "
          "menu."),
        F("Loosen the cap until it no longer binds, so it captures the view for free",
          "A cap that does not bind changes nothing, so it cannot express her view either."),
        F("Swap the cap for an exclusion of the top emitters, which expresses the view",
          "An exclusion is just another constraint on the menu. It does not put her return view into the "
          "forecasts."),
    ],
    kort="<p><b>Put the view in the forecasts.</b> A constraint can never raise the best attainable Sharpe ratio. "
         "If low emissions predict returns, that belongs in expected returns: ESG integration.</p>",
    full="<p><b>Constraints shrink the menu.</b> A constrained investor chooses from a smaller set of portfolios. "
         "The best item on a smaller menu cannot beat the best on the full menu. If the cap does not bind, it costs "
         "nothing. If it binds, it costs return or adds risk. Either way, the highest Sharpe ratio cannot rise. "
         "That is the logic of the ESG-efficient frontier (Pedersen, Fitzgibbons and Pomorski 2021).</p>"
         "<p><b>Here.</b> The manager's belief is about returns: low emitters will do better than the market "
         "expects. A cap does not use that belief. It forces low emissions whether or not the price already "
         "reflects them. The belief belongs in her return forecasts, so the optimiser can weigh it against risk. "
         "Lecture 9 calls this ESG integration.</p>"
         "<p><b>The trap.</b> «ESG is good for returns, so an ESG constraint raises the Sharpe ratio» mixes up a "
         "view and a restriction.</p>"
         "<p><b>Remember:</b> a return view goes in the forecasts; a values choice goes in the constraints.</p>",
)

statisk(
    "inv-s03", tema="investering", type="fakta",
    hjelp=hjelp3(
        "This is about the frontier that adds ESG to Markowitz's trade-off between return and risk.",
        "Markowitz's frontier gives the best return for each level of risk. The ESG version adds portfolio ESG as "
        "a third dimension and sums up return and risk in one risk-adjusted number.",
        "<p><b>Step 1: what is on each axis?</b> One axis is the portfolio's ESG level.</p>"
        "<p><b>Step 2: what is the best an investor can do</b> at each ESG level, in risk-adjusted terms?</p>"
        "<p><b>Step 3: rule out</b> answers about past returns, screens or pricing lines.</p>",
    ),
    q="<p>What do Pedersen, Fitzgibbons and Pomorski (2021) trace out with their ESG-efficient frontier?</p>",
    alternativer=[
        R("The best attainable Sharpe ratio for each level of portfolio ESG"),
        F("The extra return that high-ESG stocks have earned over low-ESG stocks",
          "That is a performance spread between two groups of stocks. The frontier describes optimal portfolios."),
        F("The set of stocks that pass an exclusion screen at each ESG score",
          "A screen produces a list of stocks, not a frontier of optimal portfolios."),
        F("The expected return the CAPM requires for each level of ESG score",
          "The CAPM's required return depends on beta, not on an ESG score. The frontier is not a pricing line."),
    ],
    kort="<p><b>The best Sharpe ratio for each level of portfolio ESG.</b> The curve shows what an investor gives "
         "up, if anything, by demanding a given ESG level.</p>",
    full="<p><b>From Markowitz to ESG.</b> Markowitz's efficient frontier shows the highest expected return for each "
         "level of risk. Lecture 8 adds emissions to the same problem: the weighted emissions of the portfolio must "
         "stay below a tolerance. That is one more constraint.</p>"
         "<p><b>The ESG-efficient frontier.</b> Pedersen, Fitzgibbons and Pomorski (2021), «Responsible Investing: "
         "The ESG-Efficient Frontier», trace out the best attainable Sharpe ratio for each level of portfolio ESG. "
         "Where an ESG requirement does not bind, nothing is lost. Where it binds, the Sharpe ratio falls.</p>"
         "<p><b>The traps.</b> The frontier is about optimal portfolios. It is not a record of past returns on ESG "
         "stocks, a screen or a pricing line such as the SML.</p>"
         "<p><b>Remember:</b> the ESG-efficient frontier is the best Sharpe ratio for each ESG level; an ESG "
         "requirement cannot lift it above the unconstrained best.</p>",
)

statisk(
    "inv-s11", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about why an investor might accept a lower Sharpe ratio for a sustainability constraint.",
        "A binding constraint keeps or lowers the best attainable Sharpe ratio. Lecture 8 shows that demand for "
        "SRI is driven by more than expected returns: chapter 1's split between value and values.",
        "<p><b>Step 1: does she gain financially from the cap?</b> She already knows it binds.</p>"
        "<p><b>Step 2: if not, what else could she be getting</b> from the portfolio she holds?</p>"
        "<p><b>Step 3: which study in lecture 8</b> points to motives of that kind?</p>",
    ),
    q="<p>An investor knows that the emission cap in her portfolio binds and costs her some Sharpe ratio. She keeps "
      "it anyway, because she does not want to own heavy polluters. Which explanation from lecture 8 fits her "
      "choice best?</p>",
    alternativer=[
        R("She acts on values, not only on value, like many SRI investors"),
        F("She must be mistaken, since a binding cap raises the Sharpe ratio over time",
          "A binding constraint lowers or keeps the best Sharpe ratio. It does not raise it, now or later."),
        F("She is obliged to cap emissions by SFDR, whatever her own wishes",
          "SFDR sets disclosure rules for funds. It imposes no emission cap on investors."),
        F("She has no reason at all, since no study finds non-financial motives",
          "Lecture 8 shows a study that does find non-financial motives behind SRI holdings."),
    ],
    kort="<p><b>Values as well as value.</b> She pays a known cost for a portfolio that matches her preferences. "
         "Riedl and Smeets (2017) link SRI holdings to social preferences and signalling.</p>",
    full="<p><b>The cost.</b> A binding emission cap removes portfolios she would otherwise choose, so her best "
         "Sharpe ratio falls (the ESG-efficient frontier of Pedersen, Fitzgibbons and Pomorski 2021). She knows "
         "this.</p>"
         "<p><b>The reason.</b> Lecture 8 asks why investors buy SRI. Riedl and Smeets (2017) find that social "
         "preferences and signalling drive holdings of socially responsible funds. Hartzmark and Sussman (2019) "
         "find that fund flows respond to sustainability ratings. Much of the demand is about values, not only "
         "value: the split from chapter 1. An investor who does not want to own polluters, whatever the return, is "
         "acting on values.</p>"
         "<p><b>The traps.</b> The cap does not secretly raise her Sharpe ratio, SFDR does not impose it and the "
         "lecture does show non-financial motives.</p>"
         "<p><b>Remember:</b> a binding ESG constraint has a cost; paying it is a values choice.</p>",
)

# ---------------------------------------------------------------------------
# Investeringsbransjen: kjeden, forretningsmodellen og vesentlighet
# ---------------------------------------------------------------------------

statisk(
    "inv-s04", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the links in the investment chain from savers to companies.",
        "The chain has four links: beneficiaries, asset owners, asset managers and companies. Each link hands money "
        "or a mandate to the next one.",
        "<p><b>Step 1: place the nurse, the outside firm and the listed companies</b> in the chain.</p>"
        "<p><b>Step 2: which link is left for the fund?</b> Check it against who hires whom.</p>",
    ),
    q="<p>A nurse pays into an occupational pension fund. The fund hires an outside firm to run a global equity "
      "portfolio on its behalf. That firm buys shares in listed companies. In lecture 8's investment chain, which "
      "role does the pension fund play?</p>",
    alternativer=[
        R("Asset owner: it owns assets for its beneficiaries"),
        F("Asset manager: it runs a portfolio on behalf of someone else",
          "In this chain the outside firm runs the portfolio for the fund. The fund hires the manager."),
        F("Beneficiary: it owns a proportionate share of the assets",
          "The beneficiary is the nurse, who owns a share of what the fund holds."),
        F("Company: it issues the shares that the portfolio buys",
          "The companies are the listed firms at the end of the chain."),
    ],
    kort="<p><b>Asset owner.</b> The pension fund owns the assets for its members and hires an asset manager to run "
         "them. The nurse is the beneficiary.</p>",
    full="<p><b>The investment chain.</b> Money reaches companies through a chain. Beneficiaries or clients own a "
         "proportionate share of the assets held by asset owners: pension funds, insurers and investment funds. "
         "Asset owners hire asset managers to manage portfolios on their behalf. The managers buy the shares and "
         "bonds of companies.</p>"
         "<p><b>Here.</b> The nurse is the beneficiary. The pension fund is the asset owner. The outside firm is the "
         "asset manager. The listed firms are the companies.</p>"
         "<p><b>Why it matters.</b> Every link is a principal-agent relationship with its own horizon and "
         "incentives. Lecture 8 names long investment chains as one of three barriers to integrating sustainability. Keeping the chain short is one of the six conditions for long-term value creation. "
         "NBIM alone has 111 external mandates.</p>"
         "<p><b>Remember:</b> beneficiary, asset owner, asset manager, company: the owner hires the manager.</p>",
)

statisk(
    "inv-s05", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the business model and value drivers of an investment company.",
        "An investment company's P&amp;L shows fee-based income on top and expenses such as staff, distribution, "
        "marketing and technology below. Ask what most of those fees are charged on.",
        "<p><b>Step 1: what is a management fee a percentage of?</b></p>"
        "<p><b>Step 2: what does that mean for growth in income?</b> Does the firm earn more when its funds grow "
        "or when its holdings improve the world?</p>",
    ),
    q="<p>An asset management firm earns management, performance, distribution and advisory fees. Its main costs "
      "are staff, distribution, marketing and technology. In lecture 8's view of the investment company, what does "
      "its income grow with?</p>",
    alternativer=[
        R("The size of the assets it manages"),
        F("The value its portfolio firms create in the real economy",
          "Fees are charged on the money managed. Nothing in them pays for real-economy value."),
        F("The interest margin on loans it grants to companies",
          "That is a bank's business model. An investment company lives on fees."),
        F("The ESG ratings of the companies it holds",
          "Ratings do not enter the fee income. A fund with poor ratings can earn the same fees."),
    ],
    kort="<p><b>The assets under management.</b> Fees are charged on the money managed, so income grows with AUM, "
         "not with what the investments achieve in the real economy.</p>",
    full="<p><b>The business model.</b> An investment company lives on fees: management, performance, distribution, "
         "transaction, advisory and others. Its costs are mainly staff, distribution, marketing and technology. "
         "Most fees are charged as a share of the money managed, so income grows with assets under management.</p>"
         "<p><b>Why it matters for sustainability.</b> Nothing in this model pays the firm for value created in the "
         "real economy. That helps explain the material issues of asset managers: selling practices and product "
         "labelling, product design, business ethics and systemic risk management. A firm paid on AUM has a reason "
         "to gather assets, for example through attractive labels.</p>"
         "<p><b>The link.</b> Two of lecture 8's six conditions for long-term value creation push against a model "
         "that rewards size: performance analysis of value added in the real economy and long-term alignment of "
         "mandates.</p>"
         "<p><b>Remember:</b> an asset manager's income follows its assets under management.</p>",
)

statisk(
    "inv-s06", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the material issues of asset management as lecture 8 lists them.",
        "Lecture 8 groups the material issues of asset managers into social capital, human capital, business model "
        "and innovation plus leadership and governance. On top come the issues of the firms in the portfolio.",
        "<p><b>Step 1: what did the manager change?</b> The holdings, the staff or the names?</p>"
        "<p><b>Step 2: who is affected?</b> Think of the clients who buy a fund because of its name.</p>",
    ),
    q="<p>An asset manager renames dozens of existing funds with words such as «sustainable» and «climate» to "
      "attract inflows, without changing what the funds hold. Which material issue for asset managers in lecture 8 "
      "does this raise most directly?</p>",
    alternativer=[
        R("Selling practices and product labelling"),
        F("Employee engagement, diversity and inclusion",
          "This issue concerns the firm's own staff. Nothing here involves employees."),
        F("Systemic risk management",
          "Systemic risk is about the firm's role in market-wide stability. Renaming funds does not change that."),
        F("The material issues of the firms in its portfolio",
          "The holdings are unchanged, so the portfolio firms' issues are the same as before."),
    ],
    kort="<p><b>Selling practices and product labelling.</b> Names that promise more than the holdings deliver "
         "mislead clients. This is the greenwashing risk behind the fund labels in SFDR.</p>",
    full="<p><b>Material issues for asset managers.</b> Lecture 8 lists them by area. Social capital: selling "
         "practices and product labelling. Human capital: employee engagement, diversity and inclusion. Business "
         "model and innovation: product design and lifecycle management. Leadership and governance: business ethics "
         "and systemic risk management. On top come the material issues of every company it holds, so its "
         "materiality depends on the portfolio.</p>"
         "<p><b>Here.</b> The funds hold the same assets as before. Only the names changed, to attract money. That "
         "is a labelling and selling issue: clients buy a promise the product does not keep.</p>"
         "<p><b>Why it is material.</b> The business model explains it. Income grows with assets under management, "
         "so labels that pull in money pay. The recent mass reclassification of funds from Article 9 to Article 8 "
         "under SFDR, to avoid accusations of greenwashing, shows that the risk is real.</p>"
         "<p><b>Remember:</b> a green label on unchanged holdings is a selling-practices and labelling "
         "problem.</p>",
)

statisk(
    "inv-s07", tema="investering", type="paastand",
    hjelp=hjelp3(
        "This is about what makes an issue material for an asset manager or asset owner.",
        "Lecture 8 lists the asset manager's own material issues, then adds a second group of issues that comes "
        "with the investments themselves.",
        "<p><b>Step 1: list the issues that come from running the firm</b>, such as how it sells its funds.</p>"
        "<p><b>Step 2: ask what else changes when the portfolio changes.</b> Does a fund that buys oil producers "
        "take on new issues?</p>",
    ),
    q="<p>Which statement about materiality for an asset manager is correct, according to lecture 8?</p>",
    alternativer=[
        R("On top of its own issues, it takes on the material issues of the firms it holds"),
        F("Its materiality is that of any office business, since it produces nothing physical",
          "Lecture 8 adds the issues of every portfolio company, so the office view leaves out the largest part."),
        F("Only its fee levels are material, since its income comes from fees",
          "Lecture 8 lists several material issues, from product labelling to systemic risk management."),
        F("Its portfolio firms' issues matter only for passive index funds",
          "The lecture applies the portfolio firms' issues to every asset manager or owner, active or passive."),
    ],
    kort="<p><b>It takes on the material issues of the firms it holds.</b> An asset manager's materiality depends on "
         "the composition of its portfolio, on top of its own issues such as product labelling.</p>",
    full="<p><b>Two layers.</b> Lecture 8 gives the material issues of asset management in two layers. The first "
         "comes from running the firm: selling practices and product labelling, employee engagement and diversity, "
         "product design, business ethics and systemic risk management. The second comes from what it owns: any "
         "material issue of the companies in which the asset manager or owner has invested. So its materiality "
         "depends on the composition of its portfolio.</p>"
         "<p><b>An example.</b> A manager with large stakes in oil producers takes on their climate transition "
         "issues. A manager that holds apparel firms takes on their supply-chain labour issues. The lecture showed "
         "materiality matrices from UBS and Santander.</p>"
         "<p><b>The traps.</b> «Office business» and «only fees» see only the first layer. «Only passive funds» "
         "invents a limit the lecture does not set.</p>"
         "<p><b>Remember:</b> an asset manager's materiality is its own issues plus its portfolio's.</p>",
)

# ---------------------------------------------------------------------------
# SFDR og SRI
# ---------------------------------------------------------------------------

statisk(
    "inv-s08", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the two fund categories in the EU's Sustainable Finance Disclosure Regulation (SFDR).",
        "One article covers funds that promote environmental or social characteristics among other "
        "characteristics. The other covers funds whose objective is sustainable investment, with no significant "
        "harm and good governance.",
        "<p><b>Step 1: is sustainability one feature among others, or the fund's objective?</b></p>"
        "<p><b>Step 2: does engagement decide the category?</b> Check which of the two articles it appears in.</p><p><b>Step 3: decide</b> from the objective alone.</p>",
    ),
    q="<p>A fund's stated objective is sustainable investment in companies whose products improve access to clean "
      "water. Every holding must do no significant harm to other goals and follow good governance practices. It "
      "engages actively with the firms it owns. Which SFDR category fits?</p>",
    alternativer=[
        R("Article 9, since sustainable investment is its objective"),
        F("Article 8, since it promotes an environmental characteristic",
          "Article 8 funds promote environmental or social characteristics among others. Here sustainability is "
          "the objective itself."),
        F("Article 8, since it uses active engagement with its holdings",
          "Engagement appears in both articles. It does not decide the category."),
        F("Neither, since SFDR applies only to companies' own reports",
          "SFDR applies to asset managers, pension funds and insurers. Company reporting is CSRD."),
    ],
    kort="<p><b>Article 9.</b> The fund has sustainable investment as its objective, with no significant harm and "
         "good governance. That is the Article 9 definition; Article 8 only promotes characteristics.</p>",
    full="<p><b>SFDR.</b> The Sustainable Finance Disclosure Regulation is the investor-side counterpart to CSRD. "
         "Article 8 funds promote, «among other characteristics», environmental or social characteristics. Their "
         "typical strategies are exclusions, ESG integration and engagement. Article 9 funds have sustainable "
         "investment as their objective: companies whose products contribute positively, that do no significant "
         "harm and follow good governance. Most have a thematic or impact focus aligned with the SDGs, often with "
         "active engagement.</p>"
         "<p><b>Here.</b> The objective is sustainable investment in clean-water products, with no significant harm "
         "and good governance. That is Article 9. The thematic focus fits the typical Article 9 profile.</p>"
         "<p><b>The traps.</b> Engagement is common to both, so it cannot decide. And SFDR is about funds, not "
         "company reports.</p>"
         "<p><b>Remember:</b> Article 8 promotes characteristics; Article 9 has sustainability as its "
         "objective.</p>",
)

statisk(
    "inv-s09", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about what kind of regulation SFDR is and what an article label says.",
        "SFDR is a disclosure regulation. Article 8 funds promote environmental or social characteristics among "
        "others; Article 9 funds claim sustainable investment as their objective.",
        "<p><b>Step 1: what did not change?</b> The portfolio stayed exactly the same.</p>"
        "<p><b>Step 2: what does an SFDR label describe,</b> if not the portfolio? Think about what a disclosure "
        "regulation regulates.</p>",
    ),
    q="<p>A fund moves from Article 9 to Article 8 under SFDR without selling or buying a single holding. What has "
      "changed?</p>",
    alternativer=[
        R("Its claim: the fund no longer says sustainability is its objective"),
        F("Its ambition: Article 8 is the stricter of the two labels",
          "Article 9 is the stricter label. Moving to 8 lowers the claim."),
        F("Its regulator: Article 8 funds fall under CSRD instead of SFDR",
          "Both articles are part of SFDR. CSRD covers companies' reporting, not funds."),
        F("Its holdings' ratings, which SFDR resets on reclassification",
          "SFDR does not rate holdings. The holdings and their ratings are the same as before."),
    ],
    kort="<p><b>Its claim.</b> SFDR is a disclosure regulation, so the article reflects what the fund says about "
         "itself. Moving from 9 to 8 drops the claim that sustainability is the objective.</p>",
    full="<p><b>A disclosure regulation.</b> SFDR does not tell a fund what to buy. It tells it what to disclose. The article reflects what the fund claims. Article 9 is the stronger claim: sustainable investment is "
         "the objective. Article 8 is weaker: the fund promotes environmental or social characteristics among "
         "others.</p>"
         "<p><b>Here.</b> The holdings are identical, so the portfolio did not change. What changed is the claim. "
         "The fund now says less about itself.</p>"
         "<p><b>Why funds did this.</b> Lecture 8 notes a recent mass reclassification from Article 9 to Article 8 "
         "to avoid accusations of greenwashing. An objective is a harder claim to defend than a characteristic, so "
         "downgrading the label lowers the risk.</p>"
         "<p><b>The traps.</b> Article 8 is not the stricter label. Both articles sit in SFDR, which covers funds, not companies.</p>"
         "<p><b>Remember:</b> an SFDR article is a claim about the fund, so a downgrade can happen without a single "
         "trade.</p>",
)

statisk(
    "inv-s10", tema="investering", type="paastand",
    hjelp=hjelp3(
        "This is about how lecture 8 defines sustainable and responsible investing and where it is used.",
        "SRI seeks to consider both financial return and social or environmental good, to bring about positive "
        "change. It encourages practices such as environmental stewardship and human rights and avoids «sin» "
        "industries.",
        "<p><b>Step 1: does SRI give up on financial return?</b></p>"
        "<p><b>Step 2: which asset classes did the lecture list?</b> Only shares, or more?</p>"
        "<p><b>Step 3: who does most of it?</b> Retail savers or institutions?</p>",
    ),
    q="<p>Which statement about sustainable and responsible investing (SRI) is correct, as lecture 8 describes "
      "it?</p>",
    alternativer=[
        R("It spans asset classes, from listed shares to green bonds and forests"),
        F("It is limited to listed equity, since only shares carry voting rights",
          "SRI spans public and private equity and debt, infrastructure, real estate and real assets."),
        F("It ignores financial return and pursues social or environmental good only",
          "SRI considers both financial return and social or environmental good."),
        F("It is mostly done by retail savers rather than institutional investors",
          "Lecture 8 says SRI is mostly done by institutional investors."),
    ],
    kort="<p><b>It spans asset classes.</b> SRI covers public and private equity and debt (including green and "
         "sustainability-linked bonds), infrastructure, real estate and real assets such as forests.</p>",
    full="<p><b>The definition.</b> Lecture 8 defines SRI as an investment strategy that considers both financial "
         "return and social or environmental good to bring about positive change. It encourages practices such as "
         "environmental stewardship, consumer protection, human rights and diversity. It avoids «sin» industries "
         "such as tobacco, gambling, weapons and fossil fuels.</p>"
         "<p><b>The asset classes.</b> Public and private equity; public and private debt, including green, social, "
         "sustainability and sustainability-linked bonds; infrastructure such as renewable energy; real estate such "
         "as green buildings and affordable housing; commodities and real assets such as forests and land.</p>"
         "<p><b>Who and how much.</b> SRI is mostly done by institutional investors. Global ESG assets passed USD 30 "
         "trillion in 2022 (Bloomberg Intelligence).</p>"
         "<p><b>The traps.</b> SRI does not give up on return. Nor is it an equity-only idea.</p>"
         "<p><b>Remember:</b> SRI weighs return and social good across all asset classes, mostly through "
         "institutions.</p>",
)

statisk(
    "inv-s12", tema="investering", type="paastand",
    hjelp=hjelp3(
        "This is about the studies in lecture 8 on why investors buy sustainable funds and the study on the "
        "ESG-efficient frontier.",
        "Lecture 8 shows one study on motives for holding SRI funds, one natural experiment on fund ratings and "
        "fund flows, one global survey of investors' use of ESG information and one study of optimal portfolios "
        "with ESG.",
        "<p><b>Step 1: for each pairing,</b> ask whether the finding even fits the type of study.</p>"
        "<p><b>Step 2: check the direction</b> of each finding: many or few, respond or ignore, raise or "
        "lower.</p>",
    ),
    q="<p>Which pairing of study and finding matches lecture 8?</p>",
    alternativer=[
        R("Riedl and Smeets (2017): social preferences and signalling explain SRI holdings"),
        F("Amel-Zadeh and Serafeim (2018): few investors consider ESG information at all",
          "In their survey a large majority, 82.1%, say they consider ESG information."),
        F("Hartzmark and Sussman (2019): fund flows ignore sustainability ratings",
          "They find the opposite: fund flows respond to Morningstar's sustainability ratings."),
        F("Pedersen, Fitzgibbons and Pomorski (2021): ESG constraints raise the best Sharpe ratio",
          "On their ESG-efficient frontier, a binding ESG requirement lowers the best Sharpe ratio. It never "
          "raises it."),
    ],
    kort="<p><b>Riedl and Smeets (2017).</b> They link holdings of socially responsible funds to social preferences "
         "and signalling. The other three pairings reverse their study's finding.</p>",
    full="<p><b>Why investors buy SRI.</b> Riedl and Smeets (2017) ask why investors hold socially responsible "
         "mutual funds and point to social preferences and signalling. Hartzmark and Sussman (2019), «Do investors "
         "value sustainability?», use Morningstar's sustainability ratings as a natural experiment and find that "
         "fund flows respond to them. In the global survey of Amel-Zadeh and Serafeim (2018), 82.1% of investors "
         "say they consider ESG information in investment decisions.</p>"
         "<p><b>The portfolio side.</b> Pedersen, Fitzgibbons and Pomorski (2021) trace the ESG-efficient frontier: "
         "the best Sharpe ratio for each level of portfolio ESG. A binding ESG requirement can only lower it.</p>"
         "<p><b>The pattern.</b> Much of the demand for SRI is about values, not only value: chapter 1's split. "
         "Flows that respond to labels also explain why product labelling is a material issue for asset "
         "managers.</p>"
         "<p><b>Remember:</b> Riedl and Smeets on motives, Hartzmark and Sussman on flows, Amel-Zadeh and Serafeim "
         "on the survey.</p>",
)

# ---------------------------------------------------------------------------
# De seks SRI-strategiene
# ---------------------------------------------------------------------------

statisk(
    "inv-s13", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the six SRI strategies and what separates exclusion from the others.",
        "The strategies differ in how they act: removing a set of investments by rule, ranking firms within "
        "sectors, picking a theme, adjusting valuations, using voice or targeting measured impact.",
        "<p><b>Step 1: what does the fund do?</b> Remove, rank, value, vote or measure?</p>"
        "<p><b>Step 2: is it one firm at a time or a whole sector by rule?</b></p>"
        "<p><b>Step 3: does the motive change the method?</b></p>",
    ),
    q="<p>A pension fund drops every thermal-coal miner from its portfolio. It gives no ethical reason; it fears that "
      "coal reserves will become stranded assets. Which strategy is this?</p>",
    alternativer=[
        R("Negative screening, here to avoid a risk-prone sector"),
        F("ESG integration, since the motive is financial risk",
          "Integration builds material ESG issues into each firm's forecasts and discount rate. It does not drop a "
          "whole sector by rule."),
        F("Best-in-class screening, since coal miners score worst",
          "Best-in-class ranks firms within each sector and keeps the leaders. Here the whole sector goes."),
        F("Stewardship, since the fund acts on its climate concerns",
          "Stewardship uses voice: voting and engagement. Here the fund leaves without using its voice."),
    ],
    kort="<p><b>Negative screening.</b> Excluding a whole sector by rule is screening, whatever the motive. The CFA "
         "definition includes avoiding risk-prone sectors such as fossil fuels with stranded assets.</p>",
    full="<p><b>Negative screening.</b> It applies rules based on «undesirable» criteria that decide which "
         "investments are not permitted. The exclusions can rest on ethics or norms. But the CFA Institute "
         "definition in lecture 8 adds a second reason: avoiding sectors that are more prone to risks, such as "
         "regulatory risk in tobacco or stranded assets in fossil fuels.</p>"
         "<p><b>Here.</b> The fund removes a whole sector by rule. Its motive is financial, but the method is "
         "exclusion: negative screening. BlackRock would call it «avoid».</p>"
         "<p><b>The mix-up.</b> «Financial motive» tempts you to say ESG integration. Integration works firm by "
         "firm: it builds material ESG issues into cash-flow forecasts and the cost of capital. It excludes nothing by itself. A low-ESG firm can still be bought if its price is low enough. Best-in-class keeps the "
         "leaders inside each sector; it does not remove sectors.</p>"
         "<p><b>Remember:</b> a sector removed by rule is negative screening, whether the reason is ethics or "
         "risk.</p>",
)

statisk(
    "inv-s14", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about telling the screening strategies apart and spotting a fund that uses more than one.",
        "The six SRI strategies: negative screening, best-in-class screening, thematic investing, ESG integration, "
        "stewardship and impact investing. Each step of a fund's process can use a different one.",
        "<p><b>Step 1: what does the first step do?</b> Remove or rank?</p>"
        "<p><b>Step 2: what does the second step do?</b> Within which group of firms?</p>"
        "<p><b>Step 3: name both steps</b> in the order the fund takes them.</p>",
    ),
    q="<p>An ETF first removes producers of controversial weapons and tobacco from a global index. From what is "
      "left, it keeps only the companies with the highest ESG ratings in each sector. How is its approach best "
      "described?</p>",
    alternativer=[
        R("Negative screening combined with best-in-class screening"),
        F("Thematic investing chosen top-down from a long-term trend",
          "Thematic funds pick assets top-down from a trend such as clean water. This ETF screens and ranks "
          "instead."),
        F("ESG integration into each firm's cash-flow forecasts",
          "Integration adjusts valuations. This ETF uses rules and ratings, not forecasts."),
        F("Impact investing with targets for measured social outcomes",
          "Impact investing sets and measures impact targets, mostly in private markets. Nothing here is "
          "measured."),
    ],
    kort="<p><b>Negative plus best-in-class screening.</b> Step one excludes by «undesirable» criteria; step two "
         "keeps the ESG leaders within each sector. Lecture 8's iShares MSCI World SRI example combines the "
         "two.</p>",
    full="<p><b>Two screens.</b> Negative or exclusionary screening removes investments that meet «undesirable» "
         "criteria, here controversial weapons and tobacco. Positive or best-in-class screening admits only firms "
         "that clear an ESG ranking hurdle within their own sector, usually scored with ESG ratings.</p>"
         "<p><b>Here.</b> The ETF does both, in that order. Lecture 8's example of exactly this design is "
         "BlackRock's iShares MSCI World SRI UCITS ETF, shown as negative plus positive screening.</p>"
         "<p><b>The mix-up.</b> Best-in-class works inside each sector, so it can keep the best oil producer. It is "
         "the negative screen that removes whole sectors. Neither screen changes any valuation (integration), "
         "follows a trend (thematic) or measures impact.</p>"
         "<p><b>Remember:</b> exclude by rule, then rank within sectors: negative plus best-in-class.</p>",
)

statisk(
    "inv-s15", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the line between investing by theme and impact investing.",
        "A theme-based strategy builds a portfolio top-down from medium- to long-term trends. Impact investing intends "
        "positive, measurable social or environmental impact alongside a financial return and measures it.",
        "<p><b>Step 1: how are the holdings chosen?</b> From a trend, a ranking, a valuation or an impact "
        "goal?</p>"
        "<p><b>Step 2: is impact measured?</b> If not, which strategy is ruled out?</p>",
    ),
    q="<p>A listed-equity fund buys companies it expects to gain from the shift to renewable energy, such as turbine "
      "makers and grid operators. It sets no impact targets and measures no impact. Which strategy is this?</p>",
    alternativer=[
        R("Thematic investing"),
        F("Impact investing",
          "Impact investing needs the intention to create positive, measurable impact and actual measurement. This "
          "fund measures none."),
        F("Best-in-class screening",
          "Best-in-class ranks firms by ESG score within each sector. This fund starts from a trend, not a "
          "ranking."),
        F("ESG integration",
          "Integration adjusts each firm's valuation for material ESG issues. This fund selects by theme."),
    ],
    kort="<p><b>Thematic investing.</b> The fund selects from a long-term trend. Without intended and measured "
         "impact, it is not impact investing, however green the theme.</p>",
    full="<p><b>Thematic investing.</b> The CFA Institute definition in lecture 8: a portfolio of assets chosen "
         "through a top-down process, expected to benefit from specific medium- to long-term trends such as clean "
         "technology, sustainable agriculture or climate change mitigation. Lecture 8's example is a clean water "
         "and sanitation ETF.</p>"
         "<p><b>Impact investing.</b> Investing with the intention to generate positive, measurable social or "
         "environmental impact alongside a financial return. The impact is actively measured. It is usually done "
         "through private equity, with concentrated ownership and a long horizon.</p>"
         "<p><b>Here.</b> The fund starts from the renewable-energy trend and buys firms expected to gain from it. "
         "It measures nothing, so it is thematic.</p>"
         "<p><b>The mix-up.</b> A green theme is not the same as impact. Without intention and measurement there is "
         "no impact investing.</p>"
         "<p><b>Remember:</b> trend plus selection is thematic; intended and measured impact is impact "
         "investing.</p>",
)

statisk(
    "inv-s16", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the SRI strategy defined by intention and measurement.",
        "Check three features: is there a financial return, is there an intended social or environmental outcome "
        "and is that outcome measured? Also note the asset class.",
        "<p><b>Step 1: what does the fund measure</b> besides money?</p>"
        "<p><b>Step 2: which strategy is the only one defined by that kind of measurement?</b> Rule out the ones "
        "that select by trend, rank or rule.</p>",
    ),
    q="<p>A private equity fund invests in young off-grid solar companies in East Africa. It sets targets for the "
      "number of households connected to power, measures them and reports them to its investors every year "
      "alongside its financial returns. Which strategy is this?</p>",
    alternativer=[
        R("Impact investing"),
        F("Thematic investing",
          "Thematic funds pick assets expected to benefit from a trend. They do not set and measure impact "
          "targets."),
        F("Best-in-class screening",
          "Nothing is ranked against sector peers. The fund chooses firms for the outcome it can measure."),
        F("Negative screening",
          "Nothing is excluded by rule. The fund seeks out a positive, measured outcome."),
    ],
    kort="<p><b>Impact investing.</b> The fund intends a positive social outcome, measures it and reports it "
         "alongside its returns, through private equity with a long horizon.</p>",
    full="<p><b>Impact investing.</b> Lecture 8 defines it as investing with the intention to generate positive, "
         "measurable social or environmental impact alongside a financial return. The impact is actively measured. "
         "Typical fields are renewable energy, basic services such as housing, healthcare and education, "
         "microfinance and sustainable agriculture. It is usually done through private equity, with concentrated "
         "ownership and a long investment horizon, though it can also use bonds, real assets or listed equity. "
         "Lecture 8's example is Vital Capital.</p>"
         "<p><b>Here.</b> Intention (households connected), measurement and reporting are all present, through "
         "private equity. That is impact investing.</p>"
         "<p><b>The mix-up.</b> Thematic investing also likes renewable energy. The difference is that a thematic "
         "fund picks firms expected to benefit from a trend and measures no impact.</p>"
         "<p><b>Remember:</b> intention plus measurement equals impact investing.</p>",
)

statisk(
    "inv-s17", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about what ESG integration does with ESG information, compared with screening.",
        "ESG integration seeks out ESG information, judges its materiality and builds the material part into the "
        "investment analysis, for example as inputs to cash-flow forecasts or cost-of-capital estimates.",
        "<p><b>Step 1: where did the ESG issues go?</b> Into the model, or into a list of exclusions?</p>"
        "<p><b>Step 2: after that, what decides whether she buys?</b> Compare the value she found with the "
        "price.</p>",
    ),
    q="<p>After building expected litigation costs and higher capital expenditure into her cash-flow forecasts, an "
      "analyst finds that a low-ESG chemicals firm is still worth more than its share price. She buys it. Is this "
      "consistent with ESG integration?</p>",
    alternativer=[
        R("Yes: integration changes the valuation and by itself excludes no firm"),
        F("No: integration means removing firms with low ESG scores",
          "Removing firms by score is screening. Integration excludes nothing by itself."),
        F("No: ESG issues belong in a separate score next to the valuation",
          "A score beside the valuation is what integration is not. Each material issue goes into a line of the "
          "model."),
        F("Yes, provided the firm also clears an ESG ranking hurdle within its sector",
          "No sector ranking is needed. A hurdle within the sector is best-in-class screening, not integration."),
    ],
    kort="<p><b>Yes.</b> Integration puts material ESG issues into the forecasts and the discount rate. If the stock "
         "is still cheap after that, buying it is consistent with integration.</p>",
    full="<p><b>ESG integration.</b> Lecture 8 defines it as seeking out ESG information, assessing its materiality "
         "and integrating the material part into investment analysis and decisions: for example as inputs into "
         "cash-flow forecasts and cost-of-capital estimates. BlackRock's process was the lecture's example.</p>"
         "<p><b>Here.</b> The analyst did exactly that: litigation costs and higher capex went into the forecast. "
         "The firm's ESG problems lower its value, but the price is lower still. Buying a cheap stock after pricing "
         "its ESG risk is integration at work.</p>"
         "<p><b>The trap.</b> Integration is often confused with screening. Screening excludes by rule; integration "
         "excludes nothing by itself. A low-ESG firm can still be bought if its price is low enough. Placing an ESG "
         "score beside the valuation, without changing the model, is not integration either.</p>"
         "<p><b>Remember:</b> integration changes the numbers in the valuation, not the list of what you may "
         "own.</p>",
)

# ---------------------------------------------------------------------------
# Stewardship og eierskap
# ---------------------------------------------------------------------------

statisk(
    "inv-s18", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about stewardship and how an engagement escalates when it fails, as in LGIM's case with Glencore.",
        "LGIM's escalation had stages: engagement from 2016, a specific request, a shareholder resolution in 2023, "
        "a judgement that progress was insufficient and then a consequence in 2024.",
        "<p><b>Step 1: which stages has the pension fund already passed?</b></p>"
        "<p><b>Step 2: what came after these stages for LGIM?</b></p>"
        "<p><b>Step 3: why would the threat of that step matter</b> during the engagement itself?</p>",
    ),
    q="<p>A pension fund has engaged with a cement maker on its climate plan for five years and has co-filed a "
      "shareholder resolution. It judges progress insufficient. Following the logic of LGIM's stewardship of "
      "Glencore in lecture 8, what is the next step and why does it matter?</p>",
    alternativer=[
        R("Divest from selected funds: a credible exit threat gives voice its force"),
        F("Keep engaging, since selling would hand the shares to less engaged owners",
          "LGIM did not stop at more engagement after a resolution failed. This option skips the escalation the "
          "case is about."),
        F("Divest first and engage afterwards, since exit should come before voice",
          "This reverses the order of the escalation. Once it has sold, the fund has no voice left to use."),
        F("Move the stake into an index fund, so engagement is no longer needed",
          "An index fund still holds the firm and cannot exit. This does not escalate anything."),
    ],
    kort="<p><b>Divest from selected funds.</b> LGIM moved from engagement to a resolution to exit. Exit is the final escalation. Its threat is what gives voice its force.</p>",
    full="<p><b>The LGIM case.</b> Legal &amp; General Investment Management engaged with the miner Glencore on "
         "climate from 2016, asking for transparency on thermal coal and alignment with net zero. In 2023 it filed "
         "a shareholder resolution asking how Glencore's projected thermal-coal production aligned with the Paris "
         "goals. LGIM judged progress insufficient. In 2024 Glencore went on the divestment list of selected LGIM "
         "funds, around GBP 176 billion.</p>"
         "<p><b>The lesson.</b> Voice first, then shareholder rights such as a resolution, then exit as the final "
         "escalation. The threat of exit gives voice its force (chapter 5): a manager that will never sell can be "
         "ignored.</p>"
         "<p><b>Here.</b> The pension fund has done the first two stages and seen too little progress. The next "
         "step in the LGIM logic is to divest, at least from some funds.</p>"
         "<p><b>Remember:</b> engage, escalate, then exit; the credible exit is what makes engagement work.</p>",
)

statisk(
    "inv-s19", tema="investering", type="fakta",
    hjelp=hjelp3(
        "This is about the research on active ownership that lecture 8 shows next to the stewardship cases.",
        "Lecture 8 shows two papers by the same three authors: one on active ownership and one on engagements that "
        "investors coordinate among themselves.",
        "<p><b>Step 1: what is the case about?</b> Motives, fund flows, portfolio choice or engagement?</p>"
        "<p><b>Step 2: which authors did the lecture show</b> under active ownership and engagement, right after "
        "the LGIM case?</p>",
    ),
    q="<p>Five pension funds agree to run one joint engagement campaign with a utility, with a lead investor "
      "speaking for the group. Which research shown in lecture 8 studies engagement of this kind?</p>",
    alternativer=[
        R("Dimson, Karakaş and Li, on active ownership and coordinated engagements"),
        F("Hartzmark and Sussman on fund flows and ratings",
          "Their study is about how fund flows respond to sustainability ratings, not about engagement."),
        F("Pedersen, Fitzgibbons and Pomorski on the frontier",
          "Their study traces the ESG-efficient frontier of portfolios, not engagement."),
        F("Riedl and Smeets on why investors hold SRI funds",
          "Their study is about investors' motives for holding SRI funds, not about engagement."),
    ],
    kort="<p><b>Dimson, Karakaş and Li.</b> Lecture 8 shows their papers on active ownership (2015) and on "
         "coordinated engagements (2020) under stewardship.</p>",
    full="<p><b>Active ownership research.</b> Under stewardship, lecture 8 shows two papers by Dimson, Karakaş and "
         "Li: «Active ownership» (Review of Financial Studies, 2015) and «Coordinated engagements» (2020). The "
         "first is about engagement by investors with the companies they own. The second is about engagements that "
         "several investors coordinate, as in this case.</p>"
         "<p><b>Stewardship.</b> Lecture 8 defines it as the use of investor rights and influence to protect and "
         "enhance long-term value for clients and beneficiaries, including the shared economic, social and "
         "environmental assets their interests depend on. Engagement and voting are its main tools.</p>"
         "<p><b>The other studies.</b> The rest of the lecture's research is about demand for SRI (Riedl and "
         "Smeets; Hartzmark and Sussman) and about portfolio choice (Pedersen, Fitzgibbons and Pomorski).</p>"
         "<p><b>Remember:</b> the engagement research in lecture 8 is Dimson, Karakaş and Li.</p>",
)

statisk(
    "inv-s30", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the SRI strategy that works through an investor's rights and influence rather than through "
        "selection.",
        "Some strategies decide what to hold or how to value it. One uses the rights that come with holding. Ask "
        "which kind the manager is using.",
        "<p><b>Step 1: did the manager change what it holds?</b> Check the size of its stake.</p>"
        "<p><b>Step 2: what tools did it use instead?</b> Look at what it did at the general meeting and in "
        "meetings with management.</p>",
    ),
    q="<p>An asset manager keeps its full stake in a steel maker that lacks a climate plan. It votes against two "
      "directors at the general meeting and meets management twice a year to press for emission targets. Which "
      "strategy is this?</p>",
    alternativer=[
        R("Stewardship"),
        F("ESG integration",
          "Integration changes forecasts and valuations. Here the manager tries to change the company."),
        F("Negative screening",
          "Nothing is excluded. The manager keeps its full stake."),
        F("Impact investing",
          "No impact targets are set or measured. The holding is a listed steel maker, not a private impact "
          "deal."),
    ],
    kort="<p><b>Stewardship.</b> Voting and engagement while keeping the stake is active ownership: using investor "
         "rights and influence to protect and enhance long-term value.</p>",
    full="<p><b>Stewardship.</b> Lecture 8 defines it as the use of investor rights and influence to protect and "
         "enhance overall long-term value for clients and beneficiaries, including the common economic, social and "
         "environmental assets on which their interests depend. Its tools are voting and engagement: voice rather "
         "than selection.</p>"
         "<p><b>Here.</b> The manager keeps its stake, votes against directors and presses management for targets. "
         "Nothing is screened out, revalued or measured for impact. That is stewardship.</p>"
         "<p><b>The link.</b> In the LGIM and Glencore case, stewardship ran from engagement to a shareholder "
         "resolution and, when progress stalled, to exit from selected funds. Dimson, Karakaş and Li study active "
         "ownership and coordinated engagements.</p>"
         "<p><b>The trap.</b> Stewardship is the one strategy that works after you have bought. The others decide "
         "what to buy or how to value it.</p>"
         "<p><b>Remember:</b> vote and engage while holding: stewardship.</p>",
)

# ---------------------------------------------------------------------------
# Tre barrierer
# ---------------------------------------------------------------------------

statisk(
    "inv-s20", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the three barriers to integrating sustainability that Schoenmaker and Schramade name.",
        "The three barriers: overreliance on market metrics (pricing, allocation and performance measurement), long "
        "investment chains and the limits of ESG tools such as ratings and indices.",
        "<p><b>Step 1: what does the risk model use as its measure of risk?</b></p>"
        "<p><b>Step 2: is that a market metric, a feature of the chain or an ESG tool?</b></p>"
        "<p><b>Step 3: name the barrier.</b></p>",
    ),
    q="<p>A fund's risk model measures each stock's risk only by the volatility of its past returns. A utility with "
      "large coal assets has had a calm share price, so the model rates it as low risk, though new climate rules "
      "could strand those assets. Which barrier to integrating sustainability does this illustrate?</p>",
    alternativer=[
        R("Overreliance on market metrics, here risk as past volatility"),
        F("Long investment chains, since the model sits far from the savers",
          "Nothing in the case concerns the chain of owners and managers. The problem is how risk is measured."),
        F("Limits of ESG tools, since ESG ratings overlook stranded assets",
          "The model uses no ESG rating at all. The problem lies in the market-based risk measure."),
        F("Fund labels, since Article 8 funds may not hold coal assets",
          "SFDR does not ban coal holdings in Article 8 funds. The case is about risk measurement."),
    ],
    kort="<p><b>Overreliance on market metrics.</b> Measuring risk by past volatility, as modern portfolio theory and "
         "the CAPM do, cannot see a risk that has not yet shown up in prices.</p>",
    full="<p><b>The first barrier.</b> Schoenmaker and Schramade argue that current practice leaves no role for E "
         "and S, through three layers that reinforce each other. Pricing: the efficient market hypothesis says all "
         "relevant information is in prices. Allocation: modern portfolio theory and the CAPM measure risk by the "
         "volatility of past returns, which implies diversification and passive investing. Performance "
         "measurement: benchmarking against a market index.</p>"
         "<p><b>Here.</b> The risk model uses past volatility only. A coal utility with a calm price history looks "
         "safe, even though climate rules could strand its assets. The risk lies in the future and has not shown up "
         "in past returns. That is the allocation layer of the market-metrics barrier.</p>"
         "<p><b>The mix-up.</b> No ESG rating and no chain of agents is involved. The problem is a market-based "
         "risk measure that looks backwards.</p>"
         "<p><b>Remember:</b> past volatility cannot see a stranded asset that has not yet hit the price.</p>",
)

statisk(
    "inv-s21", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the three layers of the first barrier, overreliance on market metrics.",
        "The barrier has a pricing layer, an allocation layer and a performance-measurement layer. Each rests on a "
        "different idea from mainstream finance.",
        "<p><b>Step 1: what is the CIO's argument about?</b> What prices contain, how risk is measured or how "
        "managers are judged?</p>"
        "<p><b>Step 2: separate his reason from his conclusion.</b> Holding the index is what he does; why does "
        "he do it?</p>",
    ),
    q="<p>A fund's chief investment officer says: «All relevant information is already in prices. Arbitrage keeps them right. Sustainability research cannot pay, so we invest passively.» Which layer of the barrier "
      "«overreliance on market metrics» does this illustrate?</p>",
    alternativer=[
        R("Pricing: the efficient market hypothesis says it is all in prices"),
        F("Allocation: modern portfolio theory measures risk by past volatility",
          "The CIO says nothing about how risk is measured. His argument is about information in prices."),
        F("Performance measurement: managers are judged against an index",
          "Holding the index is the conclusion he draws. His reason is about prices, which is a different "
          "layer."),
        F("Long investment chains: each link has its own horizon",
          "That is a different barrier. Nothing in the quote concerns the chain of owners and managers."),
    ],
    kort="<p><b>Pricing.</b> The efficient market hypothesis says all information is in prices and arbitrage keeps "
         "them right, so superior insight cannot pay and everyone should invest passively.</p>",
    full="<p><b>Three layers.</b> Schoenmaker and Schramade's first barrier, overreliance on market metrics, has "
         "three layers. Pricing: the efficient market hypothesis (EMH) says all relevant information is "
         "incorporated into prices and arbitrage keeps them correct. Allocation: modern portfolio theory and the "
         "CAPM measure risk by past volatility. Performance measurement: managers are benchmarked against a market "
         "index.</p>"
         "<p><b>Here.</b> The CIO's argument is the EMH almost word for word: everything is priced, so insight "
         "cannot pay. Lecture 8 draws the same conclusion from it: the EMH suggests that everyone should invest "
         "passively. That is the pricing layer.</p>"
         "<p><b>Why it blocks sustainability.</b> Active investing means holding a different view on risks or cash "
         "flows than the market. A sustainability view is such a view. If you believe nothing can beat the price, "
         "you never act on it. Anomalies challenge the EMH, yet it still dominates thinking.</p>"
         "<p><b>Remember:</b> «it is all in the price» is the pricing layer of the market-metrics barrier.</p>",
)

statisk(
    "inv-s22", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the three barriers to integrating sustainability that Schoenmaker and Schramade name.",
        "The three barriers: overreliance on market metrics, long investment chains and the limits of ESG tools "
        "such as ratings and indices.",
        "<p><b>Step 1: what is the case mostly about?</b> Prices, structure or tools?</p>"
        "<p><b>Step 2: count the links</b> between the saver and the companies. Whose horizon does each one serve? Who reviews whom?</p>",
    ),
    q="<p>A saver's money goes to a pension fund, which hires a fund of funds, which in turn hires several external "
      "managers. Each link has its own horizon and pay. The managers are reviewed on quarterly results. Which "
      "barrier to integrating sustainability does this illustrate?</p>",
    alternativer=[
        R("Long investment chains, where each link is a principal-agent relationship"),
        F("Overreliance on market metrics, since prices hold all information",
          "Nothing in the case is about what prices contain. The problem is the number of links and their "
          "incentives."),
        F("Limits of ESG tools, since ratings rely on reported data",
          "No rating appears in the case. The problem is the structure of the chain."),
        F("Passive investing, since index funds cannot exit a holding",
          "No index fund appears in the case. The managers are active."),
    ],
    kort="<p><b>Long investment chains.</b> Every link is a principal-agent relationship with its own horizon and "
         "incentives, so the saver's long-term interest gets lost on the way.</p>",
    full="<p><b>The barrier.</b> The stylised investment chain looks simple: beneficiary, asset owner, asset manager, "
         "company. In practice it is long. Every link is a principal-agent relationship with its own horizon "
         "and incentives (chapter 5). The saver wants value over decades; a manager reviewed each quarter wants "
         "this quarter's numbers. NBIM alone has 111 external mandates, including BNY Mellon and BlackRock.</p>"
         "<p><b>Here.</b> Saver, pension fund, fund of funds, external managers: four links before the companies, "
         "each with its own pay and horizon, ending in quarterly reviews.</p>"
         "<p><b>The fix.</b> Two of the six conditions for long-term value creation target this barrier: keep the "
         "investment chain short and align the mandate between asset owner and asset manager for the long "
         "term.</p>"
         "<p><b>The mix-up.</b> Quarterly reviews also sound like market metrics. But the root here is the chain of "
         "agents, each passing a short horizon down the line.</p>"
         "<p><b>Remember:</b> more links mean more agents and shorter horizons.</p>",
)

statisk(
    "inv-s23", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the limits of ESG ratings and indices that lecture 8 lists as the third barrier.",
        "By design, ESG tools give little weight to materiality, rely on reported data and policies only, are "
        "industry-neutral and look at one part of the business rather than another. They also favour large "
        "companies, produce intuitively wrong scores and miss material weaknesses.",
        "<p><b>Step 1: what drives the cigarette maker's high score?</b> The factories or the cigarettes?</p>"
        "<p><b>Step 2: which design feature</b> would let that happen? Check each wrong option against the list "
        "too.</p>",
    ),
    q="<p>An ESG rating ranks a cigarette maker above a producer of medical equipment, mainly because the cigarette "
      "maker's factories use less energy and water per unit produced. Which limitation of ESG tools, as Schoenmaker "
      "and Schramade list them, does this illustrate?</p>",
    alternativer=[
        R("A focus on operations rather than on what the products do"),
        F("A bias towards small firms with few reporting resources",
          "The lecture says ratings favour large companies, not small ones. Size plays no role in this case."),
        F("Too much weight on the materiality of each issue",
          "The lecture says the opposite: by design, ratings give little weight to materiality."),
        F("A design that is too specific to each industry",
          "The lecture says ratings are industry-neutral, not tailored to each industry."),
    ],
    kort="<p><b>A focus on operations rather than products.</b> Efficient factories lift the score, while the harm "
         "done by the product itself is left out. The result is an intuitively wrong ranking.</p>",
    full="<p><b>The third barrier.</b> Schoenmaker and Schramade argue that ESG ratings and indices are add-ons that "
         "do not address core issues. By design they give little weight to materiality, rely on reported data and "
         "policies only, are industry-neutral and focus on operations rather than products. They also favour large "
         "companies, produce intuitively wrong scores and miss material weaknesses.</p>"
         "<p><b>Here.</b> The rating rewards how efficiently the factories run and ignores what the factories make. "
         "A product that harms its users can still earn a high score. That is the operations-not-products limitation. The ranking is also the kind of intuitively wrong score the lecture warns about.</p>"
         "<p><b>The traps.</b> Each wrong option flips a listed limitation: ratings favour large firms, give little "
         "weight to materiality and are industry-neutral.</p>"
         "<p><b>Remember:</b> an ESG score can say how clean the factory is and nothing about whether the product "
         "does good.</p>",
)

statisk(
    "inv-s24", tema="investering", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the governance tools that active and passive investors have, as lecture 8 compares them.",
        "Lecture 8 compares three tools: voting, engagement and exit (voting with your feet, the «Wall Street "
        "Walk»). Active investors have all three. For passive investors one is a yes, one is uncertain and one is "
        "a no.",
        "<p><b>Step 1: what must an index fund hold?</b></p>"
        "<p><b>Step 2: which tool does that rule out?</b></p>"
        "<p><b>Step 3: which tool comes with owning the shares at all?</b> Combine your verdicts.</p>",
    ),
    q="<p>A large passive index fund disagrees with a portfolio company's climate strategy.</p>"
      "<p>I. It can sell the shares if its engagement fails.<br>"
      "II. It can vote against the board at the general meeting.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I",
          "Statement I is false: a passive fund must hold the index, so it cannot exit. Statement II holds."),
        R("Only II"),
        F("Both I and II",
          "Statement I is false: exit, the «Wall Street Walk», is not open to a fund that must hold the index."),
        F("Neither I nor II",
          "Statement II holds: passive investors can vote."),
    ],
    kort="<p><b>Only II.</b> A passive fund can vote, but it cannot exit, because it must hold the index. Its room to "
         "engage is uncertain.</p>",
    full="<p><b>Voice and exit.</b> Lecture 8 compares the governance tools of active and passive investors. Voting: "
         "yes for both. Engagement: yes for active investors, uncertain for passive ones. Exit, voting with your "
         "feet or the «Wall Street Walk»: yes for active investors, no for passive ones.</p>"
         "<p><b>Here.</b> Statement I fails: a fund that tracks an index must hold the company as long as it is in "
         "the index, so selling is not an option. Statement II holds: as a shareholder it can vote against the "
         "board.</p>"
         "<p><b>Why it matters.</b> Exit gives voice its force. A passive investor that can never sell has a weaker "
         "threat behind its engagement, which is one reason the lecture says passive investing sidelines "
         "sustainability. The shift of money from active to passive funds makes this more pressing.</p>"
         "<p><b>Remember:</b> passive investors can vote, may engage, cannot exit.</p>",
)

# ---------------------------------------------------------------------------
# Langsiktig verdiskaping (LTVC) og UN PRI
# ---------------------------------------------------------------------------

statisk(
    "inv-s25", tema="investering", type="begrep",
    hjelp=hjelp3(
        "This is about the market framework behind investing for long-term value creation (LTVC).",
        "In the traditional view, social and environmental factors are either irrelevant or already priced. The "
        "LTVC view replaces the efficient markets hypothesis with one in which markets change as participants "
        "change.",
        "<p><b>Step 1: what does the efficient markets view say about S and E?</b></p>"
        "<p><b>Step 2: what changes if markets adapt</b> as participants learn? Think about when an issue gets "
        "into the price.</p>",
    ),
    q="<p>In Schoenmaker and Schramade's comparison, investing for long-term value creation (LTVC) rests on the "
      "adaptive markets hypothesis instead of the efficient markets hypothesis. What does this imply for social and "
      "environmental factors?</p>",
    alternativer=[
        R("They become priced as market participants learn about them"),
        F("They are already fully priced, so analysing them cannot pay",
          "That is the traditional view under the efficient markets hypothesis."),
        F("They are irrelevant to prices, since only financial value counts",
          "That is the other half of the traditional view: S and E are irrelevant. LTVC rejects it."),
        F("They are priced in full the moment a firm first discloses them",
          "Instant pricing on disclosure is the efficient-markets view. The adaptive view has the market learn over "
          "time."),
    ],
    kort="<p><b>They become priced as participants learn.</b> Under the adaptive markets view, S and E are not yet "
         "fully in prices, so an investor who analyses them early can gain as the market catches up.</p>",
    full="<p><b>The comparison.</b> Schoenmaker and Schramade contrast traditional investing (SF 1.0) with investing "
         "for long-term value creation (SF 2.0). Traditional: efficient markets hypothesis; S and E are irrelevant "
         "or already priced; maximise F; judged on information ratio, Sharpe ratio and alpha over 12 months. LTVC: "
         "adaptive markets hypothesis; S and E are priced as market participants learn; maximise integrated value, "
         "IV = F + S + E; judged by a DCF with scenarios for internalisation over years or a decade.</p>"
         "<p><b>Why it matters.</b> If S and E are already priced, analysing them cannot pay. If the market learns "
         "over time, an investor who understands an issue before others can gain as prices adjust. That is the "
         "room for active, long-term investing.</p>"
         "<p><b>The traps.</b> «Already priced» and «irrelevant» are the traditional view. «Priced at once on disclosure» is the efficient-markets view again.</p>"
         "<p><b>Remember:</b> LTVC assumes that markets learn, so S and E get priced over time.</p>",
)

statisk(
    "inv-s26", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's table contrasting traditional investing with investing for "
        "long-term value creation.",
        "The table compares the market framework, the pricing of S and E, what is maximised, the value indicator, "
        "the length of the investment chain, portfolio concentration, dialogue with companies and the performance "
        "horizon.",
        "<p><b>Step 1: sort each fund's features</b>: number of holdings, horizon, how it is judged, "
        "dialogue.</p>"
        "<p><b>Step 2: which column of the table does each set match?</b> Check concentration, horizon and dialogue in turn.</p>",
    ),
    q="<p>Fund X holds 1,500 stocks, is judged every 12 months against an index on its information ratio and rarely "
      "talks to companies. Fund Y holds 30 stocks for a decade or more, values them with DCF scenarios in which "
      "externalities get internalised and engages deeply. How do they map onto Schoenmaker and Schramade's "
      "comparison?</p>",
    alternativer=[
        R("X is traditional (SF 1.0) and Y is LTVC (SF 2.0)"),
        F("X is LTVC, since wide diversification protects long-term value",
          "An extremely diversified portfolio, a 12-month horizon and little dialogue are the traditional "
          "profile."),
        F("Both are LTVC, since both funds invest in listed stocks",
          "Asset class does not decide. X's horizon, diversification and lack of dialogue are traditional."),
        F("X is SF 2.0 and Y is SF 3.0, since Y engages more deeply",
          "Deep engagement does not make a fund SF 3.0. And X's profile is not SF 2.0 at all."),
    ],
    kort="<p><b>X is traditional (SF 1.0) and Y is LTVC (SF 2.0).</b> X is extremely diversified and judged over 12 "
         "months on its information ratio with little dialogue. Y is concentrated, long-horizon, DCF-based and "
         "engaged.</p>",
    full="<p><b>The table.</b> Traditional investing (SF 1.0): efficient markets; S and E irrelevant or already "
         "priced; maximise F; information ratio, Sharpe ratio and alpha as value indicators; a long and complicated "
         "chain; an extremely diversified portfolio; limited dialogue; a 12-month horizon. Long-term value creation "
         "(SF 2.0): adaptive markets; S and E priced as participants learn; maximise IV = F + S + E; a DCF with "
         "scenarios for internalisation; a short and simple chain; a more concentrated portfolio; deep dialogue; "
         "years or a decade.</p>"
         "<p><b>Here.</b> Fund X matches the traditional column on every feature given. Fund Y matches the LTVC "
         "column on every feature.</p>"
         "<p><b>The trap.</b> Diversification sounds prudent and long-term. In this table, extreme diversification "
         "goes with the traditional view: an investor who holds everything cannot know each firm well or engage "
         "deeply.</p>"
         "<p><b>Remember:</b> LTVC is concentrated, long-horizon, DCF-based and engaged.</p>",
)

statisk(
    "inv-s27", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's six conditions for investing for long-term value creation.",
        "The six conditions concern the horizon, the portfolio, engagement, how performance is analysed, the "
        "mandate between owner and manager and the length of the chain.",
        "<p><b>Step 1: what did the owner change?</b> The chain, the portfolio, the dialogue or the "
        "yardstick?</p>"
        "<p><b>Step 2: match that change</b> to the condition that covers it. Ignore conditions that would need other changes.</p>",
    ),
    q="<p>An asset owner stops judging its manager only by returns relative to an index. It now also measures how "
      "much the portfolio firms cut emissions and add jobs. Which of the six conditions for long-term value "
      "creation does this meet most directly?</p>",
    alternativer=[
        R("Performance analysis of value added in the real economy"),
        F("Keep the investment chain from owner to firms short",
          "The number of links between owner and companies is unchanged. Only the yardstick changed."),
        F("Active management in a concentrated portfolio",
          "Nothing changes in how many stocks are held or how actively they are chosen."),
        F("Effective engagement with the portfolio companies",
          "No dialogue with the companies is described. The change is in how performance is measured."),
    ],
    kort="<p><b>Performance analysis of value added in the real economy.</b> The owner now judges results by what "
         "the firms achieve, not only by relative return.</p>",
    full="<p><b>The six conditions.</b> Schoenmaker and Schramade list what investing for long-term value creation "
         "needs: (1) long investment horizons; (2) active management in a concentrated portfolio; (3) effective "
         "engagement; (4) performance analysis of value added in the real economy; (5) long-term alignment of the "
         "mandate between asset owner and asset manager; (6) keep the investment chain short. They answer the "
         "barriers. Conditions 1, 2 and 4 counter the reliance on market metrics. Condition 3 restores voice. "
         "Conditions 5 and 6 fix the chain.</p>"
         "<p><b>Here.</b> Judging only on returns against an index is the performance-measurement layer of the "
         "market-metrics barrier. Measuring emission cuts and jobs moves the yardstick to the real economy: "
         "condition 4.</p>"
         "<p><b>The trap.</b> Several conditions sound related because they all push towards the long term. Ask "
         "what actually changed: here, only the yardstick.</p>"
         "<p><b>Remember:</b> judging by real-economy value added, not only by benchmark returns, is condition "
         "4.</p>",
)

statisk(
    "inv-s28", tema="investering", type="tolkning",
    hjelp=hjelp3(
        "This is about the six conditions for long-term value creation and which one a contract change meets.",
        "The six conditions concern the horizon, the portfolio, engagement, how performance is analysed, the "
        "mandate between owner and manager and the length of the chain. Two of them target the investment chain.",
        "<p><b>Step 1: what changed?</b> The contract, not the chain or the portfolio.</p>"
        "<p><b>Step 2: rule out the conditions</b> that would need something else to change, such as fewer links "
        "or more dialogue.</p>",
    ),
    q="<p>A pension fund rewrites its contract with an external manager. Fees and reviews will now depend on "
      "five-year results, matching the fund's own long horizon, instead of on the latest quarter. The manager and "
      "the number of links in the chain stay the same. Which of the six conditions for long-term value creation "
      "does this meet most directly?</p>",
    alternativer=[
        R("Long-term alignment of the mandate with the manager"),
        F("Keep the investment chain between owner and firms short",
          "The case says the chain keeps the same links. Shortening it would mean cutting out intermediaries."),
        F("Effective engagement with the companies in the portfolio",
          "Nothing in the contract concerns dialogue with the companies."),
        F("Performance analysis of value added in the real economy",
          "The reviews still look at financial results, only over a longer period."),
    ],
    kort="<p><b>Long-term alignment of the mandate.</b> The contract now ties the manager's pay and reviews to the "
         "owner's long horizon. The chain itself is as long as before.</p>",
    full="<p><b>The mandate.</b> Between asset owner and asset manager sits a mandate: the contract that sets what "
         "the manager must do and how it is judged and paid. If the owner thinks in decades but pays for quarters, "
         "the manager will think in quarters. That is the principal-agent problem in the investment chain.</p>"
         "<p><b>Here.</b> The pension fund keeps the same manager and the same links, so the chain is not shorter. "
         "What changes is the mandate: fees and reviews now follow five-year results, matching the owner's horizon. "
         "That is condition 5, long-term alignment of the mandate between asset owner and asset manager.</p>"
         "<p><b>The trap.</b> Conditions 5 and 6 both fix the chain, so they are easy to swap. Condition 6 removes "
         "links; condition 5 repairs the incentives along a link that stays.</p>"
         "<p><b>Remember:</b> change the contract and you align the mandate; cut the intermediaries and you shorten "
         "the chain.</p>",
)

statisk(
    "inv-s29", tema="investering", type="begrep",
    hjelp=hjelp3(
        "This is about the role of the UN Principles for Responsible Investment, shown at the end of lecture 8.",
        "The PRI is built around a set of Principles that investors adopt. It does not make law, classify "
        "activities or rate funds.",
        "<p><b>Step 1: rule out the jobs that belong to other bodies</b>: EU law, the EU Taxonomy and rating "
        "firms.</p>"
        "<p><b>Step 2: what is left</b> for an organisation built around Principles? Think of what stands in the "
        "way of a sustainable financial system.</p>",
    ),
    q="<p>According to lecture 8, how does the UN Principles for Responsible Investment (PRI) work towards its goal "
      "of a sustainable global financial system?</p>",
    alternativer=[
        R("By promoting its Principles and tackling obstacles in the market"),
        F("By defining which economic activities count as environmentally sustainable",
          "That is the EU Taxonomy's job, not the PRI's."),
        F("By making sustainability reporting mandatory for large companies",
          "Mandatory reporting comes from law, such as the EU's CSRD. The PRI is not a lawmaker."),
        F("By rating each fund's sustainability for fund buyers",
          "Fund sustainability ratings come from providers such as Morningstar, not from the PRI."),
    ],
    kort="<p><b>By promoting its Principles and tackling obstacles.</b> The PRI encourages adoption of and "
         "collaboration on its Principles, fosters governance and accountability and addresses obstacles in market "
         "practices, structures and regulation.</p>",
    full="<p><b>The PRI.</b> Lecture 8 ends with the UN Principles for Responsible Investment. Its aim is a "
         "sustainable global financial system. It works towards it by encouraging adoption of its Principles and "
         "collaboration on their implementation and by fostering good governance, integrity and accountability. It "
         "also addresses obstacles to a sustainable financial system that lie within market practices, structures "
         "and regulation.</p>"
         "<p><b>Who does what.</b> The PRI promotes principles. The EU Taxonomy defines which activities are "
         "environmentally sustainable. CSRD makes reporting mandatory for companies in scope. SFDR sets fund "
         "disclosure. Morningstar rates funds. Hartzmark and Sussman (2019) show that fund flows respond to "
         "those ratings.</p>"
         "<p><b>One reading.</b> The barriers in lecture 8 are partly structural: long chains, market metrics, weak "
         "tools. The PRI's focus on obstacles in market practices and structures aims at the same kind of "
         "problem.</p>"
         "<p><b>Remember:</b> the PRI promotes principles and tackles obstacles; it does not legislate, classify or "
         "rate.</p>",
)
