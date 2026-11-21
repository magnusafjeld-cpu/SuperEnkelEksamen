# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: gjesteforelesningene som ikke dekkes av en
   forelesning (tema «gjest»). PwC hører til forelesning 7 og DNB til
   forelesning 11.

   Statiske spørsmål gst-s01 … gst-s24, åtte per gjesteforelesning:
     s01-s08  Folketrygdfondet (Tine Fossland, 29. september): finansiell
              tilnærming til ESG, eierskap framfor salg, valgkomiteer, materialitet,
              kontantstrøm mot diskonteringsrente, Edmans (2023), mandatet
     s09-s16  Fondsfinans (Melanie Brooks, oktober): ESG mot bærekraft,
              ratingsvakheter, dobbel og dynamisk materialitet, passiv investor
              og aktiv eier, SFDR 6/8/9, artikkel 9 og alvorlige kontroverser,
              «er det priset?», fysisk klimarisiko
     s17-s24  Heidelberg Materials (Pia Prestmo, 27. oktober, Brevik CCS):
              kalsinering, Langskip og Gates, kvotesystemet som internalisering,
              påvirkning før lov, scope 3, offentlige innkjøp, Brevik, kostnad per
              kilo CO2

   Gjesteforelesningene ble ikke tatt opp og står ikke i manualen. Spørsmålene
   holder seg til hovedpoengene foilene selv gjør tydelige, og tester koblingen
   til kursbegrepene (verdi mot verdier, eierskap, materialitet, SFDR, fysisk og
   overgangsrisiko, internalisering, koalisjoner og myndighetenes rolle).
   Kilder: _tekst/Guest_lecture_NHH_Sustainable_Finance_TF_September_26.txt,
   _tekst/M_Brooks_NHH_okt_2026.txt, _tekst/20261027_NHH_Sustainable_Finance.txt
   og bildefoilene i PDF-ene.
"""
from trening_lib import *  # noqa: F401,F403

T = "gjest"

# ===========================================================================
# Folketrygdfondet
# ===========================================================================

statisk(
    "gst-s01", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about why Folketrygdfondet uses ESG, read through Starks' distinction between two motives for "
        "sustainable investing.",
        "Starks: one motive is financial, ESG matters because it is material to risk and return. The "
        "other is nonpecuniary, the investor does not want to profit from conduct it finds objectionable.",
        "<p><b>Step 1: what goal does the fund state?</b></p>"
        "<p><b>Step 2: why does it integrate sustainability?</b> Because of what it does to value, or because of "
        "preferences that hold whatever the return?</p>",
    ),
    q="<p>Folketrygdfondet manages a state pension fund under a mandate from the Ministry of Finance. In its "
      "guest lecture it explained why it integrates sustainability into its company analysis. Using Starks' "
      "(2023) distinction, how should you classify Folketrygdfondet's reason for using "
      "ESG?</p>",
    alternativer=[
        R("Value: ESG is used because it is financially material to risk and return"),
        F("Values: as a state fund it avoids firms that clash with its values, whatever the return",
          "The fund states one goal, the highest possible return over time. That is a financial reason, not a "
          "nonpecuniary one."),
        F("Impact investing: it aims first at measurable social and environmental outcomes",
          "Impact investing puts intentional social or environmental outcomes first. Folketrygdfondet calls its "
          "approach financial."),
        F("SF 3.0: it ranks social and environmental value above financial return",
          "SF 3.0 puts S and E ahead of F. Folketrygdfondet's single goal is financial return."),
    ],
    kort="<p><b>Value.</b> The fund's goal is the highest possible return over time and it uses ESG because "
         "material issues affect value. That is Starks' value motive.</p>",
    full="<p><b>Starks' distinction.</b> Starks (2023) separates two motives. Value: ESG matters because it is "
         "financially material, shedding light on risks and return opportunities. Values: nonpecuniary "
         "preferences, such as not wanting to profit from objectionable products or conduct.</p>"
         "<p><b>Folketrygdfondet.</b> The fund manages the Government Pension Fund Norway under a mandate from the "
         "Ministry of Finance. Its single goal is the highest possible return over time. Its own summary of its "
         "approach starts with «financial approach to ESG», with ESG integrated into the investment process. It "
         "backs this with research showing that firms investing in material ESG issues outperform.</p>"
         "<p><b>Here.</b> The stated reason for using ESG is its effect on value, so the motive is value.</p>"
         "<p><b>A nuance.</b> The fund's toolbox also includes ethical exclusions. Starks notes that many "
         "investors hold both motives. But the lecture presents ESG as a financial matter.</p>"
         "<p><b>The usual mix-up.</b> A state-owned fund sounds like a values investor. Ownership does not decide "
         "the motive. The stated goal does.</p>"
         "<p><b>Remember:</b> ESG used because it is material to return is value, not values.</p>",
)

statisk(
    "gst-s02", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about how Folketrygdfondet prefers to act as an owner when a company it holds has an ESG "
        "weakness.",
        "Folketrygdfondet's summary of its approach: a financial approach to ESG, ESG integrated in the "
        "investment process, priority to engagement, promoting minority shareholders' interests and "
        "contributing to well-functioning markets through clear expectations.",
        "<p><b>Step 1: how large an owner is the fund here?</b> What does that give it?</p>"
        "<p><b>Step 2: which tool does its approach put first?</b> Voice or exit?</p>",
    ),
    q="<p>Folketrygdfondet is the second-largest owner of a listed Norwegian industrial company. The company's "
      "business is sound, but its climate targets are vague and its climate reporting is weak. Which response "
      "fits the approach Folketrygdfondet described in its guest lecture best?</p>",
    alternativer=[
        R("Raise the issue in dialogue with the company, based on the fund's published expectations"),
        F("Sell the stake at once, since weak climate reporting is a clear reason to exit",
          "The fund says it prioritises engagement: it knows the companies and they know it. Selling first gives "
          "up its voice as a large owner."),
        F("Do nothing, since a financial approach to ESG leaves climate risk out of the company analysis",
          "The fund's expectations to companies cover climate. Climate and environment are also a regular topic in "
          "its company dialogues."),
        F("Cut the holding to the benchmark weight and wait for the company to improve",
          "The fund said it prioritises engagement. Changing the weight leaves the weak targets untouched."),
    ],
    kort="<p><b>Engage through dialogue.</b> Folketrygdfondet prioritises engagement and publishes expectations "
         "to companies, including on climate. As a large owner it has a voice to use before any exit.</p>",
    full="<p><b>The approach.</b> Folketrygdfondet summed up its approach to ESG in five points: a financial "
         "approach, ESG integrated into the investment process, priority to engagement («we know the companies "
         "and they know us»), promoting the interests of minority shareholders and contributing to "
         "well-functioning markets through clear expectations for companies.</p>"
         "<p><b>Here.</b> The fund is the second-largest owner of a sound business with weak climate targets. Its "
         "expectations document covers climate. Climate and environment is also one of the topics in its dialogue "
         "meetings. The natural first step is dialogue, backed by its expectations.</p>"
         "<p><b>The link to the course.</b> This is voice rather than exit (lecture 5). A large owner can "
         "influence the company directly. Selling would hand the problem to another owner and give up that "
         "influence.</p>"
         "<p><b>The usual mix-up.</b> «Financial approach» does not mean ignoring climate. It means climate is "
         "treated as a factor that can affect long-term value.</p>"
         "<p><b>Remember:</b> Folketrygdfondet engages first. Its size gives it a voice.</p>",
)

statisk(
    "gst-s03", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Folketrygdfondet's active ownership tools and which one a seat in a company's nomination "
        "process represents.",
        "Folketrygdfondet named six tools it uses actively: expectations, company dialogue, voting, nomination "
        "committees, ethical exclusions and contributing to well-functioning markets.",
        "<p><b>Step 1: when in the process does the portfolio manager act?</b> Before the general meeting or at "
        "it?</p>"
        "<p><b>Step 2: what is decided in that step?</b> Match it to a tool.</p>",
    ),
    q="<p>A Folketrygdfondet portfolio manager sits on the committee that proposes candidates for the board of a "
      "listed Norwegian company to its general meeting. Which of Folketrygdfondet's active ownership tools is "
      "this and what does it influence most directly?</p>",
    alternativer=[
        R("Nomination committees, which shape the composition and expertise of the board"),
        F("Voting, which shapes the board through the fund's votes at the general meeting",
          "Voting happens at the general meeting itself. Here the portfolio manager acts earlier, when the "
          "candidates are chosen."),
        F("Ethical exclusions, which remove companies whose boards break ethical norms",
          "Exclusion means not owning a company. Here the fund helps choose a company's board."),
        F("Expectations, which set out the fund's general demands to all listed companies",
          "Expectations are a public document addressed to all companies. Here a fund employee works inside one "
          "company's process."),
    ],
    kort="<p><b>Nomination committees.</b> Folketrygdfondet sits on the nomination committees of a number of "
         "Norwegian companies, where board candidates are chosen. Boards need strong expertise and "
         "composition.</p>",
    full="<p><b>The tool.</b> In Norwegian listed companies, a nomination committee proposes candidates for the "
         "board to the general meeting. Folketrygdfondet's portfolio managers and leaders sit on such committees "
         "in a number of companies, among them Equinor, Norsk Hydro, Orkla, Yara and TOMRA. Its slide put the "
         "purpose plainly: boards need strong expertise and composition.</p>"
         "<p><b>Here.</b> The portfolio manager helps choose who is proposed. That influences the board's "
         "composition and skills before any vote takes place.</p>"
         "<p><b>The link to the course.</b> The board monitors management, so its quality is central to "
         "governance (lecture 5). Folketrygdfondet's qualitative company analysis lists the composition of the "
         "board under corporate governance. A seat on the nomination committee is a direct way to act on it.</p>"
         "<p><b>The usual mix-up.</b> Voting and nomination are separate tools. The committee shapes the list of "
         "candidates. Voting decides on that list at the general meeting.</p>"
         "<p><b>Remember:</b> nomination committees let a large owner shape the board before the vote.</p>",
)

statisk(
    "gst-s04", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about why Folketrygdfondet treats active ownership as part of its management, given its single "
        "goal.",
        "Folketrygdfondet's slide said active ownership contributes to long-term value creation and named two "
        "things that are crucial for its return.",
        "<p><b>Step 1: what does a large, long-term owner of the whole market depend on?</b> Think about the "
        "companies and about the market itself.</p>"
        "<p><b>Step 2: drop options that are not about the fund's long-term return.</b></p>",
    ),
    q="<p>Folketrygdfondet's single goal is the highest possible return over time. According to its guest "
      "lecture, why is active ownership built into its management rather than run as a separate activity?</p>",
    alternativer=[
        R("Its return depends on the companies doing well over time and on efficient, well-functioning "
          "markets"),
        F("Active ownership is mainly a way to express the values of its owner, the Norwegian state",
          "The fund presents ownership as part of how it earns its return, not as a matter of its owner's "
          "values."),
        F("Engagement lets it hold a few concentrated positions instead of following a benchmark",
          "The fund manages against a benchmark index within risk limits. The reason it gave is what its return "
          "depends on."),
        F("Its large stakes rule out ESG integration, so active ownership is its only ESG tool",
          "The fund also integrates ESG into its company and portfolio analysis. Active ownership comes in "
          "addition."),
    ],
    kort="<p><b>Good companies and good markets.</b> Folketrygdfondet's return depends on the companies "
         "delivering good results over time and on markets being efficient and well-functioning.</p>",
    full="<p><b>The argument.</b> Folketrygdfondet has one goal: the highest possible return over time. It "
         "pursues it through active management and by being a responsible owner and creditor. Ownership is "
         "integrated into its management because it is crucial for its return that:</p>"
         "<ul><li>the companies it has invested in deliver good results over time;</li>"
         "<li>the markets are efficient and well-functioning.</li></ul>"
         "<p><b>Why this fits Folketrygdfondet.</b> It is the largest institutional investor at the Oslo Stock "
         "Exchange and among the top three owners of many Norwegian companies. As a very large owner in its home "
         "market, it gains when that market works well. That is why contributing to "
         "well-functioning markets and promoting minority shareholders' interests are among its tools.</p>"
         "<p><b>The link to the course.</b> This is the value case for stewardship (lecture 8): engagement is a "
         "way to raise long-term returns, not a cost paid for values.</p>"
         "<p><b>Remember:</b> active ownership is part of how Folketrygdfondet earns its return.</p>",
)

statisk(
    "gst-s05", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about materiality and the research Folketrygdfondet cited on which ESG investments go with "
        "better future performance.",
        "Folketrygdfondet called materiality a prerequisite for financial value creation. The research it cited "
        "(Serafeim and co-authors, as in Khan, Serafeim and Yoon from lecture 6) separates issues that matter for a "
        "business from issues that do not.",
        "<p><b>Step 1: does her score separate important issues from unimportant ones?</b></p>"
        "<p><b>Step 2: what does the research say predicts performance?</b></p>",
    ),
    q="<p>An analyst at a Nordic fund scores every company on the same 40 ESG items with equal weights, whatever "
      "its industry. She wants the score to help predict returns. Folketrygdfondet cited research by Serafeim "
      "and co-authors on which ESG investments go with better future stock performance and growth. What "
      "should she change?</p>",
    alternativer=[
        R("Focus on the ESG issues that are material for each company's industry"),
        F("Add more items, since a broader score captures more of each company's risk",
          "More items dilute the score with issues that do not matter for the business. The research points to "
          "selecting, not adding."),
        F("Drop ESG from her analysis, since the research finds no link with returns",
          "The research does find a link with future performance. The question is which issues carry it."),
        F("Score only governance items, since governance matters in every industry",
          "Governance is one set of issues. The research sorts issues by whether they matter for each business. "
          "That differs by industry."),
    ],
    kort="<p><b>Focus on material issues.</b> The research finds that firms investing in material ESG issues "
         "outperform. Equal weights on all items mix the material with the immaterial.</p>",
    full="<p><b>The research.</b> Folketrygdfondet quoted Serafeim and co-authors: firms making investments on "
         "material ESG issues outperform their peers in risk-adjusted stock performance, sales growth and margin "
         "growth. Lecture 6 gives the same result from Khan, Serafeim and Yoon (2016): performance on material "
         "issues predicts outperformance, while performance on immaterial issues does not matter.</p>"
         "<p><b>Here.</b> The analyst treats water use, data privacy and labour safety the same way for a bank, a "
         "miner and a software firm. Most of her items are immaterial for any given company, so they add noise. "
         "Selecting the issues that are material for each industry, as the SASB Materiality Map does, is the "
         "fix.</p>"
         "<p><b>The usual mix-up.</b> «Good ESG pays» is too broad. Only performance on material issues is linked "
         "to outperformance. And materiality can shift over time, so the selection needs review.</p>"
         "<p><b>Remember:</b> material issues predict performance, immaterial ones do not. Select before you "
         "score.</p>",
)

statisk(
    "gst-s06", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the two channels through which ESG can enter a valuation, as in the survey "
        "Folketrygdfondet showed.",
        "A value is expected cash flows discounted at a required return. Effects on revenues, costs and fines "
        "change the cash flows. A view that the company has become riskier changes the discount rate.",
        "<p><b>Step 1: what does she expect to happen to the company's costs?</b> Which part of the valuation "
        "does that change?</p>"
        "<p><b>Step 2: does she add anything for extra risk?</b> Then classify the adjustment.</p>",
    ),
    q="<p>Folketrygdfondet showed a survey of how analysts in the Norwegian market adjust their valuations of "
      "companies with weak environmental and sustainability performance. An analyst values a fish farmer with a "
      "poor record on escapes. She expects stricter rules to bring fines and higher costs over the next years. "
      "She judges these costs to be predictable and adds nothing to the required return. How does the survey "
      "classify her adjustment?</p>",
    alternativer=[
        R("Through the cash flows only"),
        F("Through the discount rate only",
          "She adds nothing to the required return, so the discount rate is unchanged."),
        F("Both through the cash flows and through the discount rate",
          "She deliberately leaves the required return unchanged. Only one part of the valuation moves."),
        F("No adjustment, since fines are not a sustainability issue",
          "Fines tied to a poor environmental record are exactly the kind of effect the survey asks about."),
    ],
    kort="<p><b>Through the cash flows only.</b> Fines and higher costs lower the expected cash flows. She "
         "leaves the required return unchanged, so the discount rate is not used.</p>",
    full="<p><b>The survey.</b> Folketrygdfondet showed results from a survey of the risk premium in the "
         "Norwegian market (PwC and Finance Society Norway). Analysts were asked how they adjust for companies "
         "with weak environmental and sustainability performance: through the cash flows, through the discount "
         "rate, through both or not at all.</p>"
         "<p><b>The link to the course.</b> Lecture 9 makes the same split. ESG reaches value through the "
         "cash-flow channel (revenues, costs including fines and litigation, capital expenditure, stranded "
         "assets) and through the cost-of-capital channel (the discount rate).</p>"
         "<p><b>Here.</b> Fines and higher costs reduce the expected cash flows. She sees no extra risk beyond "
         "that, so she leaves the discount rate alone. Had she also judged the company riskier and raised the "
         "required return, the adjustment would go through both.</p>"
         "<p><b>A caution.</b> A known, predictable cost belongs in the cash flows. Putting it into the discount "
         "rate as well would count the same effect twice and undervalue the company.</p>"
         "<p><b>Remember:</b> costs and fines go in the cash flows, extra risk goes in the discount rate.</p>",
)

statisk(
    "gst-s07", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about the quote from Edmans that Folketrygdfondet used near the end of its guest lecture.",
        "Edmans argues about whether ESG investing should be seen as a separate kind of investing. Read "
        "the quote literally: what does it say considering long-term factors is?",
        "<p><b>Step 1: what does the quote say ESG investing is not?</b></p>"
        "<p><b>Step 2: what does it say it is instead?</b> Pick the option that matches both halves.</p>",
    ),
    q="<p>Near the end of its guest lecture, Folketrygdfondet showed a quote from Edmans (2023), «The end of ESG»: "
      "«Considering long-term factors when valuing a company isn't ESG investing; it's investing.» Which view "
      "does the quote express?</p>",
    alternativer=[
        R("Long-term factors that affect value belong in ordinary investment analysis, not in a separate ESG "
          "category"),
        F("ESG investing has ended because it underperformed, so investors should drop ESG factors",
          "The quote does not tell anyone to drop long-term factors. It says considering them is simply "
          "investing."),
        F("ESG investing means accepting a lower return to express values, unlike ordinary investing",
          "The quote treats long-term factors as part of valuing a company, which is about value, not "
          "values."),
        F("Only investors with an ESG mandate should consider long-term factors when valuing a company",
          "The quote says the opposite: considering long-term factors is what any investor does when valuing a "
          "company."),
    ],
    kort="<p><b>ESG factors that matter for value are just part of investing.</b> Edmans argues that looking at "
         "long-term factors is ordinary valuation, not a special ESG activity.</p>",
    full="<p><b>The quote.</b> Edmans (2023), «The end of ESG», argues that ESG should not be treated as a "
         "separate category. Long-term factors that affect a company's value, such as how it treats employees "
         "or handles climate risk, belong in any careful valuation.</p>"
         "<p><b>How Folketrygdfondet used it.</b> The fund showed an ESG hype cycle: ESG moved from risk management "
         "to integration, then to claims that ESG means excess return, then to greenwashing, a disclosure "
         "avalanche and talk of the end of ESG. What is left, in its view, are questions of financial "
         "materiality, credible transition plans and real-world outcomes. Edmans' quote fits its own financial "
         "approach to ESG.</p>"
         "<p><b>The link to the course.</b> This is Starks' value motive (lecture 1): ESG used because it is "
         "material. Lecture 11 also frames «End of ESG?» as a recalibration towards what is financially "
         "material.</p>"
         "<p><b>The usual mix-up.</b> «The end of ESG» does not mean dropping sustainability. It means dropping "
         "the label and keeping what matters for value.</p>"
         "<p><b>Remember:</b> material long-term factors are not ESG investing, they are investing.</p>",
)

statisk(
    "gst-s08", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about Folketrygdfondet's role, mandate and position in the market, as the guest lecture "
        "presented them.",
        "The Ministry of Finance gives mandates for two government funds to two different managers. "
        "Folketrygdfondet's equity holdings are in Norway and the Nordics, with a benchmark index and risk "
        "limits.",
        "<p><b>Step 1: which fund does Folketrygdfondet manage and which does it not?</b></p>"
        "<p><b>Step 2: check each option against its size, mandate and preferred tools.</b></p>",
    ),
    q="<p>Which statement about Folketrygdfondet, as presented in its guest lecture, is correct?</p>",
    alternativer=[
        R("It manages the Government Pension Fund Norway, not the Government Pension Fund Global"),
        F("It manages the Government Pension Fund Global and invests mainly outside the Nordic region",
          "The global fund is managed by Norges Bank Investment Management. Folketrygdfondet's equities are "
          "Norwegian and Nordic."),
        F("It is a small owner at the Oslo Stock Exchange, so it relies on exclusion rather than dialogue",
          "It presented itself as the largest institutional investor at the Oslo Stock Exchange. It "
          "prioritises engagement."),
        F("It has no benchmark index, so it can invest wherever it expects the best return",
          "It manages the fund against a benchmark index and within set risk limits."),
    ],
    kort="<p><b>The Government Pension Fund Norway.</b> Folketrygdfondet manages it. Norges Bank Investment "
         "Management manages the Government Pension Fund Global. Both mandates come from the Ministry of "
         "Finance.</p>",
    full="<p><b>Two funds, two managers.</b> The Government Pension Fund has two parts. The Ministry of Finance "
         "gives the mandate for the Government Pension Fund Norway (GPFN) to Folketrygdfondet and the mandate for "
         "the Government Pension Fund Global (GPFG) to Norges Bank Investment Management. Folketrygdfondet also "
         "manages the Government Fund Tromsø.</p>"
         "<p><b>Folketrygdfondet's position.</b> GPFN invests in Norwegian and Nordic equities and bonds, against "
         "a benchmark index and within risk limits. It is the largest institutional investor at the Oslo Stock "
         "Exchange and among the three largest owners in many Norwegian companies. It holds hundreds of meetings with companies and issuers each year.</p>"
         "<p><b>Why it matters for its approach.</b> A large, concentrated owner in its home market has a strong "
         "voice. That is why Folketrygdfondet prioritises engagement, sits on nomination committees and "
         "publishes expectations for companies.</p>"
         "<p><b>Remember:</b> Folketrygdfondet runs the Norwegian fund. Its size at home is why it engages "
         "first.</p>",
)

# ===========================================================================
# Fondsfinans
# ===========================================================================

statisk(
    "gst-s09", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the difference Fondsfinans drew between ESG and sustainability.",
        "ESG relates to how a company is run and is usually scored against companies in the same industry. "
        "Whether a company is sustainable also depends on what its products or services contribute, often "
        "measured against the SDGs, the Paris Agreement or the EU Taxonomy.",
        "<p><b>Step 1: what does the ESG score compare the firm with?</b></p>"
        "<p><b>Step 2: what does the score leave out that sustainability needs?</b></p>",
    ),
    q="<p>An oil producer has the best ESG score in its industry: few accidents, strong governance and efficient "
      "use of resources. A client asks whether a fund can therefore call it a sustainable company. Based on the "
      "distinction in the Fondsfinans guest lecture, what is the best answer?</p>",
    alternativer=[
        R("Not necessarily: the score rates how it is run, not what its products contribute"),
        F("Yes: the best ESG score in an industry shows that a company is sustainable",
          "ESG scores are usually relative to the same industry. Being best among oil producers describes how the "
          "firm is run, not what it sells."),
        F("No: an oil company cannot have an ESG score, since ESG applies only to green firms",
          "Every company has ESG considerations. The lecture says there is no such thing as an «ESG company»."),
        F("Not necessarily: ESG scores rate whole industries, not single companies",
          "ESG scores rate individual companies, usually against peers in the same industry. The problem lies "
          "elsewhere."),
    ],
    kort="<p><b>Not necessarily.</b> ESG describes how a company is run, scored against its industry. "
         "Sustainability also depends on whether its products contribute to sustainable outcomes.</p>",
    full="<p><b>The distinction.</b> Fondsfinans warned that «ESG» and «sustainability» are often used as if they "
         "were the same, but they are not. ESG relates to how a company is run: resource use, health and safety, "
         "governance. Every company has ESG considerations, so there is no such thing as an «ESG company». ESG "
         "performance is usually scored relative to companies in the same industry.</p>"
         "<p><b>Sustainability.</b> Whether a company is sustainable also depends on whether its products or "
         "services contribute to sustainable outcomes for society or the environment. That is often measured "
         "against the SDGs, the Paris Agreement or the EU Taxonomy.</p>"
         "<p><b>Here.</b> The oil producer is the best-run firm in its industry, which is what the score says. It "
         "says nothing about whether oil contributes to sustainable outcomes.</p>"
         "<p><b>The link to the course.</b> This echoes Starks (lecture 1): most ratings are built for value "
         "investors and assess processes and risk management, while values investors care about outcomes.</p>"
         "<p><b>Remember:</b> ESG is how a firm is run. Sustainability is also what it sells.</p>",
)

statisk(
    "gst-s10", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about the weaknesses of off-the-shelf ESG ratings that Fondsfinans asked users to be aware "
        "of.",
        "The lecture, drawing on «Aggregate Confusion» by Berg, Kölbel and Rigobon, listed weaknesses in the "
        "data, the methods, the coverage, the agreement between providers and the link to sustainability.",
        "<p><b>Step 1: for each option, ask which weakness it concerns.</b></p>"
        "<p><b>Step 2: check the direction.</b> Is the data forward- or backward-looking? Which firms get the "
        "positive bias?</p>",
    ),
    q="<p>Which statement about off-the-shelf ESG ratings matches the Fondsfinans guest lecture?</p>",
    alternativer=[
        R("Correlations between rating providers are low, so one firm can get very different scores"),
        F("The ratings rest mainly on audited, forward-looking data that is standardised across firms",
          "The lecture describes the data as mostly self-reported, not standardised and backward-looking."),
        F("The ratings favour small companies in emerging markets, which tend to score too well",
          "This reverses the bias the lecture describes, which favours large companies in developed markets."),
        F("A high rating shows that a firm's products contribute to sustainable outcomes",
          "The lecture lists a weak link between company ESG scores and sustainability as a problem."),
    ],
    kort="<p><b>Providers disagree.</b> Correlations between ESG rating providers are low and inconsistent, the "
         "«aggregate confusion» Berg, Kölbel and Rigobon describe.</p>",
    full="<p><b>The weaknesses.</b> Fondsfinans noted that investors increasingly use off-the-shelf ratings from "
         "external data providers and listed what users should be aware of:</p>"
         "<ul><li>data mostly self-reported, not standardised and backward-looking;</li>"
         "<li>opaque methodologies that rely on models and estimates;</li>"
         "<li>limited coverage and a positive scoring bias towards large companies and developed markets;</li>"
         "<li>low and inconsistent correlations between providers;</li>"
         "<li>an insufficient link between company ESG scores and sustainability.</li></ul>"
         "<p><b>The source.</b> Berg, Kölbel and Rigobon, «Aggregate Confusion: The Divergence of ESG Ratings» "
         "(Review of Finance, 2022).</p>"
         "<p><b>The link to the course.</b> Lecture 7 makes the same point: ESG data providers disagree a lot and "
         "benchmarking largely decides a company's ranking. An investor who relies on one rating is relying on "
         "one provider's choices.</p>"
         "<p><b>Remember:</b> ESG ratings disagree, look backwards and favour large firms in developed "
         "markets.</p>",
)

statisk(
    "gst-s11", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the ways of thinking about materiality in the Fondsfinans guest lecture.",
        "Fondsfinans named three: financial materiality (how ESG factors affect the company), materiality for "
        "the environment or society (how the company affects them) and a combined view that also looks at how "
        "materiality changes over time.",
        "<p><b>Step 1: is there an effect on society today?</b></p>"
        "<p><b>Step 2: is there an effect on the company, now or later?</b> Then pick the lens that covers "
        "everything in the case.</p>",
    ),
    q="<p>A chip maker uses large volumes of water in a region with growing water stress. Its water use already "
      "harms local farmers, but so far it has not affected the company's costs. Analysts expect water "
      "restrictions within a few years. Which way of thinking about materiality from the Fondsfinans guest "
      "lecture captures this best?</p>",
    alternativer=[
        R("Double and dynamic materiality"),
        F("Financial materiality only",
          "That lens asks only how the issue affects the company. It misses the harm to the farmers today."),
        F("Materiality for society and the environment only",
          "That lens sees the harm to the farmers but leaves out the expected effect on the company's costs."),
        F("Not material, since the company's costs are unaffected so far",
          "Unaffected costs today do not make an issue immaterial. Look at the farmers and at the years "
          "ahead."),
    ],
    kort="<p><b>Double and dynamic materiality.</b> The company harms society now (inside-out) and the issue is "
         "expected to hit its costs later (outside-in). Materiality changes over time.</p>",
    full="<p><b>Three lenses.</b> Fondsfinans set out several ways to think about materiality:</p>"
         "<ul><li>Financial materiality: how ESG factors affect the company, creating risks and opportunities "
         "and shaping its valuation.</li>"
         "<li>Material for the environment or society: what the company's activities do to others, even if not "
         "directly financially material to it.</li>"
         "<li>Double and dynamic materiality: both directions at once and how they change over time as new "
         "factors become material. Impacts on society can in turn come back to the company.</li></ul>"
         "<p><b>Here.</b> The water use harms farmers today, which is impact. Expected restrictions would raise "
         "the company's costs later, which is financial. The issue is moving from one to both. The lecture used "
         "water as its own example of a double material risk.</p>"
         "<p><b>The link to the course.</b> Lectures 1, 6 and 7 present double materiality as outside-in plus "
         "inside-out. Lecture 6 adds that materiality moves over time.</p>"
         "<p><b>Remember:</b> both directions and over time: double and dynamic.</p>",
)

statisk(
    "gst-s12", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about what a passive investor can and cannot do about a company it holds, as Fondsfinans "
        "presented it.",
        "Fondsfinans sorted ESG activities by whether active investors, passive investors or both mostly use "
        "them. It added a reminder that being passive in portfolio construction does not decide how you behave "
        "as an owner.",
        "<p><b>Step 1: which tool does an index fund lose?</b> It must hold every stock.</p>"
        "<p><b>Step 2: which tools does it keep?</b></p>",
    ),
    q="<p>An index fund must hold every stock in its benchmark at the benchmark weight. Its manager is unhappy "
      "with the board of one of the largest holdings. According to the Fondsfinans guest lecture, what can the "
      "manager still do?</p>",
    alternativer=[
        R("Vote at the general meeting and engage with the company, although the fund cannot sell"),
        F("Nothing, since a passive fund has no tools to influence the companies it holds",
          "Passive describes how the portfolio is built, not how the fund behaves as an owner."),
        F("Sell the stake to send a signal, since exit is the main tool of every investor",
          "An index fund must hold the stock at its benchmark weight. Exit is the tool it gives up."),
        F("Tilt the portfolio weights towards better-run firms, since a tilt is a passive fund's only ESG tool",
          "The fund must hold the benchmark weights, so a tilt is ruled out here. Nor is it the only tool open to "
          "passive investors."),
    ],
    kort="<p><b>Vote and engage.</b> «You can be a passive investor but active owner»: the fund cannot sell, but "
         "it can still use its voice.</p>",
    full="<p><b>The reminder.</b> Fondsfinans showed a table of ESG activities for asset owners and managers and "
         "marked which are used mostly by active investors, mostly by passive investors or by both. Voting and "
         "engagement are open to both. The slide added: «Remember you can be a passive investor but active "
         "owner.»</p>"
         "<p><b>Here.</b> The index fund must hold the stock at its benchmark weight, so it can neither sell nor "
         "underweight it. It can vote against board candidates, support shareholder proposals, engage with the "
         "company and collaborate with other investors.</p>"
         "<p><b>The link to the course.</b> Lectures 5 and 8 make the same point. Exit disciplines managers "
         "through the share price, but a passive investor cannot exit. It keeps voice. Coalitions (lecture 13) "
         "help such investors engage together.</p>"
         "<p><b>The usual mix-up.</b> «Passive» describes the investment style, not the ownership style.</p>"
         "<p><b>Remember:</b> passive in what you buy, active in how you own.</p>",
)

statisk(
    "gst-s13", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about how SFDR classifies funds, as Fondsfinans explained it for its own funds.",
        "Under SFDR, the lowest of the three articles covers funds that integrate sustainability risk only. The "
        "middle one adds promoting environmental or social characteristics. The highest has sustainable "
        "investment as the fund's objective.",
        "<p><b>Step 1: rank the three funds by what they claim.</b></p>"
        "<p><b>Step 2: match each rank to an article number.</b></p>",
    ),
    q="<p>A Nordic manager runs three funds. Fund One integrates sustainability risk but does not promote "
      "environmental or social characteristics. Fund Two integrates sustainability risk and promotes "
      "environmental and social characteristics. Fund Three has sustainable investment as its objective. How are "
      "they classified under SFDR, as explained in the Fondsfinans guest lecture?</p>",
    alternativer=[
        R("Fund One Article 6, Fund Two Article 8, Fund Three Article 9"),
        F("Fund One Article 8, Fund Two Article 9, Fund Three Article 6",
          "A fund with sustainable investment as its objective is not in the lowest category, which only "
          "integrates sustainability risk."),
        F("Fund One Article 6, Fund Two Article 9, Fund Three Article 8",
          "This swaps the two higher articles. Promoting characteristics claims less than having sustainable "
          "investment as the objective."),
        F("All three Article 8, since all three integrate sustainability risk",
          "Integrating sustainability risk is common to all three articles. What separates them is what the "
          "fund claims beyond that."),
    ],
    kort="<p><b>6, 8 and 9.</b> Article 6 integrates sustainability risk only. Article 8 also promotes "
         "environmental or social characteristics. Article 9 has sustainable investment as its objective.</p>",
    full="<p><b>SFDR.</b> The EU Sustainable Finance Disclosure Regulation classifies funds by what they claim. "
         "Fondsfinans explained the three categories for its own funds:</p>"
         "<ul><li>Article 6: integrates sustainability risk without promoting environmental or social "
         "characteristics.</li>"
         "<li>Article 8: integrates sustainability risk and promotes environmental and social "
         "characteristics.</li>"
         "<li>Article 9: integrates sustainability risk and has sustainable investment as its objective.</li></ul>"
         "<p>Its renewable energy fund, Fondsfinans Fornybar Energi, is Article 9. Its other equity and bond funds "
         "are Article 8.</p>"
         "<p><b>The link to the course.</b> Lecture 8 stresses that Article 9 is the stricter one: sustainability "
         "is the objective, not one characteristic among others. A fund moving from 9 to 8 lowers its claim. "
         "SFDR is a disclosure rule, so the article reflects what the fund says about itself.</p>"
         "<p><b>Remember:</b> 6 integrates risk, 8 promotes characteristics, 9 has a sustainable objective.</p>",
)

statisk(
    "gst-s14", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the hard constraints an Article 9 fund faces, from the Fondsfinans case on social risk at "
        "a cleantech leader.",
        "Under Article 9, every holding must contribute to the sustainable objective, do no significant harm and "
        "follow good governance. Fondsfinans added that a severe controversy can make a stock ineligible.",
        "<p><b>Step 1: is a large climate contribution enough on its own under Article 9?</b></p>"
        "<p><b>Step 2: does a small direct cost settle the question?</b> Look beyond the fine.</p>",
    ),
    q="<p>An electric-car maker makes a large contribution to cutting emissions. Authorities find that workers "
      "hired through a contractor to build its new plant were held in slavery-like conditions. The settlement "
      "is small relative to the company's size. What does the Fondsfinans guest lecture say this means for an "
      "Article 9 fund?</p>",
    alternativer=[
        R("The stock can become ineligible, whatever its climate contribution"),
        F("The climate contribution outweighs the controversy, since Article 9 is about the objective",
          "Under Article 9, contribution is only one of the conditions. A severe controversy is not offset by "
          "it."),
        F("The issue is immaterial, since the settlement is small relative to the company's size",
          "The direct cost is small, but licence to operate, market access and eligibility are also at "
          "stake."),
        F("The issue does not count, since the workers were hired by a contractor, not the company",
          "The lecture looks for due diligence on contractors and the supply chain, not just policies for own "
          "employees."),
    ],
    kort="<p><b>It can become ineligible.</b> Article 9 adds hard constraints: contribution, do no significant "
         "harm and good governance. A severe controversy can rule a stock out whatever its climate "
         "contribution.</p>",
    full="<p><b>The case.</b> Fondsfinans used BYD: workers building its plant in Brazil, hired through a "
         "contractor, were found in slavery-like conditions. The direct cost was small relative to BYD's size, "
         "but the case touched licence to operate, market access and eligibility.</p>"
         "<p><b>The rule.</b> Article 9 adds hard constraints: every holding must contribute to the sustainable "
         "objective, do no significant harm and follow good governance. Fondsfinans' framework says a severe "
         "controversy can make a stock ineligible, whatever its climate contribution. Its takeaway: know your "
         "hard constraints, since Article 9 rules can override an attractive valuation.</p>"
         "<p><b>Here.</b> The climate contribution is large, but forced-labour conditions in the supply chain "
         "can breach do no significant harm and the minimum safeguards. For an Article 9 fund that can be "
         "decisive.</p>"
         "<p><b>The usual mix-ups.</b> Netting good against bad or stopping at the size of the fine. Article 9 "
         "is a set of conditions, not a score to be averaged.</p>"
         "<p><b>Remember:</b> under Article 9, contribution does not buy an exemption from do no significant "
         "harm.</p>",
)

statisk(
    "gst-s15", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the four questions Fondsfinans asks to take an ESG issue to an investment decision.",
        "The four questions come in a fixed order. The first asks whether the issue matters for the business. "
        "The second asks how it reaches the numbers. The last decides what to do with the position.",
        "<p><b>Step 1: which of the four questions has she already answered?</b></p>"
        "<p><b>Step 2: which question is left before the last one, where she chooses an action?</b></p>",
    ),
    q="<p>A portfolio manager has found that a wind-turbine maker's reliance on steel is financially material. "
      "It works through the company's margins, since turbine orders are priced well ahead of delivery. "
      "Following the four questions Fondsfinans asks in every case, what should she do next, before she "
      "decides what to do with the position?</p>",
    alternativer=[
        R("Compare her margin view with consensus estimates and the stock's valuation multiple"),
        F("Ask management to engage on steel sourcing and recycled content before anything else",
          "Engaging is one of the actions in the last step. Something must be settled before she chooses an "
          "action."),
        F("Set a watch trigger and plan to exit if steel prices rise further",
          "A watch trigger is one of the actions in the last step. Something must be settled before she "
          "chooses an action."),
        F("Check whether the company contributes to one of the Sustainable Development Goals",
          "SDG contribution is a separate test for a fund's sustainable objective. The four questions follow one "
          "issue into the investment case."),
    ],
    kort="<p><b>Check whether it is priced.</b> After materiality and the channel, she compares her view with consensus and the "
         "valuation multiple. Only a view the market does not share can justify a position.</p>",
    full="<p><b>The four questions.</b> Fondsfinans takes an ESG issue to an investment decision in four "
         "steps:</p>"
         "<ul><li>Is it material? Does it touch cash flows, assets or licence to operate, not just "
         "reputation?</li>"
         "<li>Which channel? Revenue, margins, capex, working capital, cost of capital or market access.</li>"
         "<li>Is it priced? Compare our view with consensus estimates and the valuation multiple.</li>"
         "<li>What do we do? Position size, engage, diversify, set a watch trigger or exit.</li></ul>"
         "<p><b>Here.</b> Materiality and channel are settled. Before sizing the position she must know whether "
         "the market already reflects the steel price risk. The slide's warning: hidden risks are cheap to own until "
         "they are not.</p>"
         "<p><b>The link to the course.</b> Lecture 9: a risk that is already in the price gives no excess return. "
         "Only a view that differs from the market's can justify over- or underweighting.</p>"
         "<p><b>Remember:</b> material, channel, priced, action. In that order.</p>",
)

statisk(
    "gst-s16", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the kind of climate risk in one of the Fondsfinans cases and how the company's cost "
        "structure affects it.",
        "Physical climate risk comes from climate and weather events. Transition risk comes from the adjustment "
        "to a low-carbon economy. With high fixed costs, a small fall in revenue cuts earnings by more in "
        "percentage terms.",
        "<p><b>Step 1: where does the problem come from?</b> Weather or the low-carbon transition?</p>"
        "<p><b>Step 2: what do the fixed costs do to the effect on earnings?</b></p>",
    ),
    q="<p>A company collects used cooking oil and animal fats and sells them as feedstock for renewable diesel. "
      "Its climate profile is strong. Hotter summers make the raw material spoil faster, so yields fall. The "
      "company has a large fixed cost base. What does the Fondsfinans case on this kind of company show?</p>",
    alternativer=[
        R("A green business can carry physical climate risk that high fixed costs magnify in earnings"),
        F("A company that helps cut emissions faces no material climate risk",
          "A strong climate profile says nothing about exposure to hot weather."),
        F("The heat problem is a transition risk, since it arises in the market for renewable fuels",
          "Transition risk comes from the adjustment to a low-carbon economy: policy, technology and prices. "
          "Spoiling in hot weather has a different source."),
        F("A small yield loss has a small effect on earnings, since costs fall with volume",
          "The fixed costs do not fall when yields drop. Think about what that does to earnings."),
    ],
    kort="<p><b>Physical risk at a green company, magnified by operating leverage.</b> Heat spoils the raw "
         "material and high fixed costs make a small yield loss hit earnings hard.</p>",
    full="<p><b>The case.</b> Fondsfinans used Darling Ingredients, which collects animal by-products and used "
         "cooking oil as feedstock for renewable diesel. Its own filings flag that warm weather lowers raw "
         "material quality and yields, because the material deteriorates faster.</p>"
         "<p><b>The mechanism.</b> Heat means less sellable fat and protein from the same intake and more cost for "
         "collection and cooling. With high fixed costs, small yield losses hit earnings disproportionately. The "
         "slide's illustrative sensitivity: a 3% yield loss plus one point of extra cost cuts EBITDA by about a quarter.</p>"
         "<p><b>The link to the course.</b> This is physical risk (lecture 13, Bank of England): climate and "
         "weather events, as opposed to transition risk from the move to low carbon. The PwC lecture made the "
         "same point: a small carbon footprint says nothing about physical exposure.</p>"
         "<p><b>The usual mix-up.</b> Green does not mean safe. A company can help the transition and still be "
         "exposed to the climate.</p>"
         "<p><b>Remember:</b> physical risk can hit green firms. Operating leverage magnifies it.</p>",
)

# ===========================================================================
# Heidelberg Materials (Brevik CCS)
# ===========================================================================

statisk(
    "gst-s17", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about where the CO<sub>2</sub> from cement production comes from, as Heidelberg Materials "
        "explained it.",
        "Cement emissions have two main sources: the energy used to heat the kiln and the chemical reaction that "
        "turns limestone into lime. The lecture showed which is larger.",
        "<p><b>Step 1: which source would a switch to renewable energy remove?</b></p>"
        "<p><b>Step 2: which source would remain and how large is it?</b></p>",
    ),
    q="<p>Heidelberg Materials showed that cement makes up a small share of concrete's weight but most of its "
      "CO<sub>2</sub>. It also showed where a cement plant's CO<sub>2</sub> comes from. Why can a switch to "
      "renewable energy not decarbonise cement on its own?</p>",
    alternativer=[
        R("Most of the CO<sub>2</sub> is released by the raw material itself, whatever the energy source"),
        F("Renewable energy is not available at the scale a cement plant needs",
          "The lecture's point is not energy supply. Even with clean energy, a large part of the emissions would "
          "remain."),
        F("Fuel causes most of the plant's emissions, so switching it would cost too much",
          "Fuel is the smaller of the two main sources in the lecture's breakdown."),
        F("Cement is a small share of concrete, so its emissions hardly matter",
          "Cement is a small share by weight but the main source of concrete's CO<sub>2</sub>."),
    ],
    kort="<p><b>The raw material releases the CO<sub>2</sub>.</b> Calcination, the larger source, comes from the "
         "chemistry of turning limestone into lime. Clean energy cannot remove it, so it has to be "
         "captured.</p>",
    full="<p><b>The numbers in the lecture.</b> Concrete is by far the most produced material in the world. "
         "Cement is a small share of concrete by weight but causes most of its CO<sub>2</sub>. The cement "
         "industry accounts for about 8% of global emissions.</p>"
         "<p><b>Where the CO<sub>2</sub> comes from.</b> About 64% comes from calcination: heating limestone "
         "(CaCO<sub>3</sub>) splits it into lime (CaO) and CO<sub>2</sub>. About 34% comes from fuel. These are "
         "process emissions: they come from the raw material, not from the energy.</p>"
         "<p><b>Why it matters.</b> Replacing coal with renewable energy can only address the fuel part. The "
         "calcination part remains whatever powers the kiln. That is why Heidelberg Materials turned to carbon "
         "capture and storage at Brevik.</p>"
         "<p><b>The link to the course.</b> For an investor this is a hard-to-abate sector: the usual fix, "
         "cleaner energy, is not enough. Its exposure to carbon pricing (lecture 3) depends on capture.</p>"
         "<p><b>Remember:</b> most cement CO<sub>2</sub> comes from chemistry, not fuel. Hence capture.</p>",
)

statisk(
    "gst-s18", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about why the state funds a project like Longship, using Bill Gates's reasons why government "
        "policies matter from lecture 13.",
        "Gates's reasons cover public money for new technology, a carbon price at its true cost, non-market "
        "barriers, outdated policy, help for communities hit by the change, R&amp;D on breakthroughs and pulling "
        "technology, policy and markets together.",
        "<p><b>Step 1: what kind of support does the state give?</b> Money, a price signal or a change of "
        "rules?</p>"
        "<p><b>Step 2: for what?</b> A new technology, a community or a market?</p>",
    ),
    q="<p>Longship is the Norwegian state's carbon capture and storage chain. CO<sub>2</sub> is captured at "
      "industrial sources, including the Brevik cement plant, shipped to Øygarden and piped to storage under "
      "the North Sea. The state supports the installation and ten years of operation with funding. Which of Bill Gates's reasons "
      "why government policies matter (lecture 13) does the state funding fit best?</p>",
    alternativer=[
        R("Mind the investment gap"),
        F("Stay up to date",
          "That reason is about outdated government policy being the barrier. Here the state adds money. It does "
          "not remove a rule."),
        F("Level the playing field",
          "That reason is about raising the carbon price towards its true cost. Funding one project directly is "
          "a different tool."),
        F("Plan for a just transition",
          "A just transition supports communities that lose from the change. The funding here goes to a capture "
          "and storage chain."),
    ],
    kort="<p><b>Mind the investment gap.</b> Brevik is the world's first industrial-scale carbon capture at a "
         "cement plant. Gates says government financing is needed above all where new zero-carbon technology "
         "must be developed.</p>",
    full="<p><b>Longship.</b> The Heidelberg Materials lecture presented Longship as a full chain: carbon capture "
         "at industrial sources including Brevik, ship transport to Øygarden and a pipeline to storage under the "
         "North Sea (Northern Lights). It is supported by state funding for installation and ten years of "
         "operation. Brevik CCS is the world's first industrial-scale carbon capture facility at a cement "
         "plant.</p>"
         "<p><b>Gates's reason.</b> «Mind the investment gap»: government policies and financing are needed to "
         "close the gap, especially in areas where new zero-carbon technologies must be invented. A first-of-its-"
         "kind plant carries costs and risks that a private firm will not take alone.</p>"
         "<p><b>A close relative.</b> «Do the hard stuff too», more R&amp;D on breakthroughs in physical "
         "infrastructure, points the same way. It is not among the options.</p>"
         "<p><b>The usual mix-up.</b> Level the playing field is about the carbon price, which works on all "
         "emitters at once. Here the state pays for one specific chain. Stay up to date is about removing old "
         "rules, not adding money.</p>"
         "<p><b>Remember:</b> public money for a technology the market will not fund alone is the investment "
         "gap.</p>",
)

statisk(
    "gst-s19", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about what the phase-out of free emission allowances means for a cement producer, in the terms "
        "of lecture 3 on externalities.",
        "Internalisation brings the cost of an externality into the decisions and prices of those who cause it. "
        "Free allowances shield an emitter from paying for part of its emissions.",
        "<p><b>Step 1: who pays for the emissions while allowances are free? Who pays afterwards?</b></p>"
        "<p><b>Step 2: what is a tonne of captured CO<sub>2</sub> then worth to the plant?</b></p>",
    ),
    q="<p>Heidelberg Materials showed how the free allowances that cement producers receive under the EU "
      "Emissions Trading System are phased out between 2026 and 2034, while the Carbon Border Adjustment "
      "Mechanism is phased in. In the terms of lecture 3, what does the phase-out of free allowances mean for a "
      "cement plant?</p>",
    alternativer=[
        R("More of the CO<sub>2</sub> externality is internalised, so each tonne captured saves more"),
        F("The carbon price on cement is removed, so carbon capture becomes less attractive",
          "It is the free allowances that are removed, not the carbon price. The producer ends up paying for "
          "more of its emissions, not fewer."),
        F("Cement producers receive a subsidy, since their emissions are a positive externality",
          "CO<sub>2</sub> emissions harm others, so they are a negative externality. Free allowances shield the "
          "producer from paying for them."),
        F("The cost of the emissions moves from the producers to the government",
          "Without free allowances the producer must buy them itself. The government does not take over the "
          "cost."),
    ],
    kort="<p><b>More internalisation.</b> As free allowances fall away, the plant pays for more of its "
         "CO<sub>2</sub>. Every tonne it captures is a tonne it no longer has to pay for.</p>",
    full="<p><b>Internalisation.</b> Lecture 3 defines it as bringing the costs of external effects into the "
         "decisions and prices of those responsible. Governments do it with taxes, quotas and subsidies. The EU "
         "Emissions Trading System is a quota system: emitters need an allowance for each tonne.</p>"
         "<p><b>Free allowances.</b> Cement producers have received many allowances for free, which shields them "
         "from much of the carbon price. The chart in the lecture shows these free allowances phasing out over "
         "the coming years while the Carbon Border Adjustment Mechanism (CBAM) phases in.</p>"
         "<p><b>Here.</b> As free allowances disappear, the plant pays for more of its emissions: the externality "
         "is internalised step by step. Each tonne captured and stored is a tonne the plant need not buy an "
         "allowance for, so the value of carbon capture rises.</p>"
         "<p><b>The link to transition risk.</b> For a cement producer without capture plans, the same phase-out "
         "is a growing transition risk (lecture 13).</p>"
         "<p><b>Remember:</b> fewer free allowances, more internalisation, higher value of capture.</p>",
)

statisk(
    "gst-s20", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about how private and public action relate in lecture 13, applied to Heidelberg Materials' "
        "policy work in Germany.",
        "Lecture 13 says private and public action reinforce each other. It describes one direction where "
        "private action comes first and one where public action comes first.",
        "<p><b>Step 1: what came first, the company's input or the law?</b></p>"
        "<p><b>Step 2: which direction of the link does that order show?</b></p>",
    ),
    q="<p>Heidelberg Materials told the class that it had given input to carbon capture and storage policy in "
      "Germany for many years. The German government then adopted a carbon management strategy and a draft law "
      "on CO<sub>2</sub> storage meant to facilitate such projects. Which idea from lecture 13 does this "
      "illustrate?</p>",
    alternativer=[
        R("Private action can pave the way for public rules"),
        F("Free riding on the policy work of other firms",
          "Heidelberg Materials did the policy work itself. A free rider enjoys a benefit without "
          "contributing."),
        F("Backcasting from a long-term vision to actions for now",
          "Backcasting is a planning method. The case is about how a firm's input relates to new public "
          "rules."),
        F("The peer effect among cement producers",
          "The peer effect explains joining a coalition because rivals have joined. No coalition or rival is "
          "involved here."),
    ],
    kort="<p><b>Private action paved the way.</b> Years of input from the company preceded the German law. Private "
         "and public action reinforce each other.</p>",
    full="<p><b>The idea.</b> Lecture 13 says private and public action reinforce each other. Private action can "
         "pave the way for public rules and taxes, while public endorsement can strengthen private "
         "initiatives.</p>"
         "<p><b>Here.</b> Heidelberg Materials presented «9 years of intensive advocacy in Germany» that paid off "
         "when the government adopted its carbon management strategy and a draft law on CO<sub>2</sub> storage. The "
         "company's input came first. The public rules followed.</p>"
         "<p><b>Why a firm does this.</b> A capture project needs rules for storage and transport and a stable "
         "carbon price to be worth building. Clearer policy reduces uncertainty about future asset values, the "
         "same logic as the collective advocacy motive for joining a coalition.</p>"
         "<p><b>The usual mix-up.</b> The two directions are easy to swap. If the firm or coalition acts first "
         "and the law follows, private action paved the way. If government backs an existing initiative, public "
         "endorsement strengthens it.</p>"
         "<p><b>Remember:</b> private input first, public rule later: private action paves the way.</p>",
)

statisk(
    "gst-s21", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the scopes used to classify a company's greenhouse gas emissions in climate reporting.",
        "Scope 1 covers a company's own direct emissions. Scope 2 covers emissions from the energy it buys. "
        "Scope 3 covers other indirect emissions in its value chain.",
        "<p><b>Step 1: who burns the fuel or runs the process that makes steel and concrete?</b></p>"
        "<p><b>Step 2: how does the buyer then report those emissions?</b></p>",
    ),
    q="<p>Heidelberg Materials showed the greenhouse gas inventory of Bane NOR, which manages Norway's railway "
      "infrastructure. Following guidance from its owner, Bane NOR gives its direct emissions the highest "
      "priority, yet they make up about 1% of its inventory. About 90% comes from procurement of goods and "
      "services, with steel and concrete as the largest sources. Where do most of Bane NOR's emissions sit?</p>",
    alternativer=[
        R("Scope 3: indirect emissions in the value chain, such as purchased materials"),
        F("Scope 1: direct emissions from its own vehicles, machines and sites",
          "Scope 1 is the owner's own direct emissions, the small part that gets the highest priority."),
        F("Scope 2: emissions from the electricity and heat it buys",
          "Scope 2 covers purchased energy. Steel and concrete are purchased goods."),
        F("Nowhere, since emissions from materials belong to the producers, not to the buyer",
          "A buyer does report emissions from what it purchases, as a separate category in its own "
          "inventory."),
    ],
    kort="<p><b>Scope 3.</b> Emissions from purchased steel and concrete are indirect emissions in the value "
         "chain. A target focused on direct emissions misses most of the footprint.</p>",
    full="<p><b>The scopes.</b> Scope 1 is a company's own direct emissions. Scope 2 is emissions from purchased "
         "electricity and heat. Scope 3 is other indirect emissions in the value chain, including purchased "
         "goods and services. Lecture 7 lists Scope 1, 2 and, if appropriate, Scope 3 under the TCFD's metrics "
         "and targets.</p>"
         "<p><b>Here.</b> Bane NOR's priority is its direct emissions, around 1% of its inventory. Procurement of "
         "goods and services, about 90%, is Scope 3, with steel and concrete as the largest sources.</p>"
         "<p><b>Heidelberg's point.</b> If public buyers are measured on their direct emissions, they have little "
         "reason to pay for low-carbon materials, where most of the emissions are. Heidelberg therefore asked "
         "for overall project emissions to be measured, with indirect emissions included.</p>"
         "<p><b>The usual mix-up.</b> The cement plant's emissions are Scope 1 for Heidelberg Materials, but "
         "Scope 3 for the buyer. The same tonne shows up in both inventories in different scopes.</p>"
         "<p><b>Remember:</b> purchased materials are Scope 3. For builders that is most of the "
         "footprint.</p>",
)

statisk(
    "gst-s22", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about why a cement producer that has invested in carbon capture cares about public "
        "procurement rules.",
        "Heidelberg Materials listed a clear market signal among the key political actions it needs. The EU "
        "proposal it showed aims to create lead markets for low-carbon materials.",
        "<p><b>Step 1: whom do procurement rules act on?</b> Producers or buyers?</p>"
        "<p><b>Step 2: what does that do for a product that costs more to make?</b></p>",
    ),
    q="<p>Norway's revised public procurement law requires public buyers to give climate and environmental "
      "considerations a weight of at least 30% when they choose between bids. The EU's proposed Industrial "
      "Accelerator Act would add low-carbon requirements for cement in public procurement. Why does Heidelberg "
      "Materials, which has invested in carbon capture, push for such rules?</p>",
    alternativer=[
        R("They create a market in which low-carbon cement wins bids, rewarding the investment"),
        F("They put a price on the plant's own emissions, as the EU Emissions Trading System does",
          "Procurement rules govern what public buyers choose. The price on the plant's own emissions comes from "
          "elsewhere."),
        F("They lower the cost of producing low-carbon cement below that of ordinary cement",
          "Procurement rules act on buyers, not on the cost of making cement."),
        F("They are voluntary pledges by a coalition of public buyers, with no legal force",
          "The Norwegian rule is a law with a mandatory weighting, not a voluntary pledge."),
    ],
    kort="<p><b>They create demand.</b> Public buyers who must weigh climate create a lead market for low-carbon "
         "cement, the clear market signal Heidelberg asks for.</p>",
    full="<p><b>The rules.</b> Norway's revised procurement law makes a climate and environmental weighting of at "
         "least 30% mandatory and says public buyers shall reduce the overall climate footprint of what they "
         "buy. The EU's Industrial Accelerator Act proposes low-carbon requirements for steel, cement and "
         "aluminium in public procurement to create lead markets.</p>"
         "<p><b>Why a producer cares.</b> Capturing CO<sub>2</sub> is a large investment. It pays off only if "
         "someone values the lower-carbon product. Public infrastructure projects use a lot of concrete, so "
         "rules that make public buyers weigh climate create demand. Heidelberg's list of key political actions "
         "ends with a clear market signal.</p>"
         "<p><b>The link to the course.</b> The Fondsfinans lecture asked who pays the green premium: customer, "
         "regulator or shareholder. Procurement rules put part of it on public customers. Lecture 13 lists "
         "deciding on laws and regulations that shape behaviour among the roles of government.</p>"
         "<p><b>The usual mix-up.</b> A procurement rule is not a carbon price. The ETS prices the producer's "
         "emissions. Procurement rules shape what buyers choose.</p>"
         "<p><b>Remember:</b> procurement rules create demand for low-carbon products.</p>",
)

statisk(
    "gst-s23", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about the main facts of Brevik CCS as Heidelberg Materials presented them.",
        "Brevik CCS is the capture step at the cement plant in the Longship chain. The lecture gave the amount "
        "captured, the share of the plant's emissions and what limits that share. It also described where the "
        "CO<sub>2</sub> goes.",
        "<p><b>Step 1: does Brevik capture all or part of the plant's CO<sub>2</sub>?</b> What sets the "
        "limit?</p>"
        "<p><b>Step 2: where is the captured CO<sub>2</sub> stored? Who funds the chain?</b></p>",
    ),
    q="<p>Which statement about Brevik CCS, as presented in the Heidelberg Materials guest lecture, is "
      "correct?</p>",
    alternativer=[
        R("It captures about half of the plant's CO<sub>2</sub>, limited by the waste heat available"),
        F("It captures all of the plant's CO<sub>2</sub>, so the plant has no emissions left",
          "The capture covers only part of the plant's emissions. Something limits the share."),
        F("It stores the captured CO<sub>2</sub> in rock under the Brevik plant itself",
          "The CO<sub>2</sub> is shipped from Brevik to Øygarden and piped to storage under the North Sea."),
        F("It is a commercial project with no public funding, unlike the rest of Longship",
          "Brevik is part of Longship, which the state supports with funding for installation and "
          "operation."),
    ],
    kort="<p><b>About half, limited by waste heat.</b> Brevik captures 400 000 tonnes a year, about 50% of the "
         "plant's CO<sub>2</sub>, because capture runs on the waste heat the plant can recover.</p>",
    full="<p><b>Brevik CCS.</b> Heidelberg Materials called it the world's first and only industrial-scale carbon "
         "capture facility in a cement plant. It captures about 400 000 tonnes of CO<sub>2</sub> a year, roughly "
         "50% of the plant's emissions. The limit is the available waste heat: the capture process runs on heat "
         "recovered from the kiln and the CO<sub>2</sub> compressor.</p>"
         "<p><b>Where the CO<sub>2</sub> goes.</b> As part of Longship, it is shipped to the receiving terminal at "
         "Øygarden and piped to storage under the North Sea (Northern Lights). The state supports Longship with "
         "funding for installation and ten years of operation.</p>"
         "<p><b>What comes next.</b> Capture lets Heidelberg Materials sell evoZero, which it calls the world's "
         "first near-zero cement at scale. It plans larger projects such as Padeswood in the UK, with EU Innovation Fund grants for "
         "several others.</p>"
         "<p><b>The usual mix-ups.</b> Brevik does not make the plant emission-free. The CO<sub>2</sub> is not "
         "stored on site.</p>"
         "<p><b>Remember:</b> Brevik captures about half, shipped to Øygarden, stored under the North Sea, with "
         "state support.</p>",
)

statisk(
    "gst-s24", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the criteria Heidelberg Materials asked politicians and public buyers to use when they "
        "choose between climate measures.",
        "Heidelberg Materials started from political obligations (the Paris Agreement and the EU) and asked how "
        "to reach the targets in time at the least cost. Its key political actions included measuring overall "
        "emissions and comparing cost per kilo of CO<sub>2</sub>.",
        "<p><b>Step 1: which emissions should count?</b> Only those on the site or also those in the "
        "materials?</p>"
        "<p><b>Step 2: how should the two measures be compared?</b></p>",
    ),
    q="<p>A public road agency has a fixed climate budget for a new bridge. It can pay for electric machines on "
      "the building site, which cut the site's direct emissions, or for low-carbon concrete, which cuts the "
      "emissions in the materials. What do the key political actions Heidelberg Materials asked for imply for "
      "this choice?</p>",
    alternativer=[
        R("Compare both by euros per kilo of CO<sub>2</sub> cut over the project's overall emissions"),
        F("Choose the electric machines, since the site's direct emissions are what the agency controls",
          "Heidelberg asked for overall project emissions to be measured, indirect ones included."),
        F("Choose whichever measure uses the newest technology, since innovation matters most",
          "Heidelberg asked for technology neutrality. The test is cost per kilo of CO<sub>2</sub>, not how new "
          "the technology is."),
        F("Choose the low-carbon concrete in any case, since concrete is the largest emission source",
          "Heidelberg asked for cost efficiency and technology neutrality, not a fixed preference for one "
          "product. The comparison decides."),
    ],
    kort="<p><b>Compare by cost per kilo of CO<sub>2</sub>, materials included.</b> Measure overall project emissions and "
         "compare measures by cost per kilo of CO<sub>2</sub>, whatever the technology.</p>",
    full="<p><b>Heidelberg's chain of reasoning.</b> Governments have political obligations under the Paris "
         "Agreement and EU rules. The question is how to reach the targets in time and for the least amount of "
         "budget euros. The key political actions it listed: measure overall project emissions with indirect "
         "emissions included, compare cost efficiency in euros per kilo of CO<sub>2</sub>, keep technology and "
         "competition neutrality and send a clear market signal.</p>"
         "<p><b>Here.</b> Electric machines cut direct emissions on site. Low-carbon concrete cuts emissions in "
         "the materials. With overall emissions as the measure, both count. With cost per kilo as the test, the "
         "agency funds whichever cuts more CO<sub>2</sub> per euro. Heidelberg argued that CO<sub>2</sub>-reduced "
         "concrete is among the most cost-effective ways to cut large volumes of emissions, since concrete is "
         "about a quarter of the construction industry's CO<sub>2</sub> footprint.</p>"
         "<p><b>The usual mix-ups.</b> Counting only what happens on the site leaves out where most of the "
         "emissions are. Picking a product in advance skips the comparison that the criteria ask for, even when "
         "the product is low-carbon concrete.</p>"
         "<p><b>Remember:</b> count all emissions, then buy the cheapest tonne.</p>",
)
