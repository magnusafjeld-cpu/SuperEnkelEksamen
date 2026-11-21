# -*- coding: utf-8 -*-
"""FIE459 eksamenstrening · rapportering (forelesning 7 og PwC-gjesteforelesningen).

   Kilder: manualkapittel 7 (fag/fie459/_fragmenter/k7.html), foilene
   FIE459_H26_7_Metrics_and_Reporting og PwC-foilene i _tekst/, og
   docs/fie459-forfatterspek.md § 5 (k7). TCFD er stavet «TFCD» på foilene,
   og artikkelen foilen kaller «Kotsantonis» er Kotsantonis og Serafeim (2019).

   Statiske spørsmål rep-s01 … rep-s30. id-ene er lagringsnøkler og endres aldri.
"""
from trening_lib import *  # noqa: F401,F403

# ---------------------------------------------------------------------------
# Rammeverkene: hvem rapporten er for
# ---------------------------------------------------------------------------

statisk(
    "rep-s01", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about matching a report to the voluntary framework built for its readers and its lens.",
        "Ask who the report is for. Investors want to know how sustainability affects the firm's cash flows and "
        "risk: financial materiality, outside-in. All stakeholders want to know how the firm affects people and "
        "planet: impact materiality, inside-out.",
        "<p><b>Step 1: who reads the report?</b> Investors, or a wider group of stakeholders?</p>"
        "<p><b>Step 2: which direction?</b> The world's effect on the firm, or the firm's effect on the world?</p>"
        "<p><b>Step 3: pick the framework</b> whose reader and lens match both answers.</p>",
    ),
    q="<p>A paper mill's water use and emissions worry a river-basin NGO, local residents and the mill's own "
      "employees. They want a report on how the mill affects the region's water, air and people. Nobody is asking "
      "how these issues affect the mill's cash flows. Which voluntary framework is built for this report?</p>",
    alternativer=[
        R("GRI, which reports a firm's impacts on the economy, environment and people"),
        F("ISSB standards, which report sustainability information that matters to investors",
          "ISSB is written for investors and asks how sustainability affects the firm. These readers want the "
          "opposite direction: the mill's effect on the region."),
        F("TCFD, which reports climate-related risks and opportunities in financial filings",
          "TCFD uses a financial lens: how climate affects the firm. It also covers climate only, while these "
          "readers ask about water, air and people."),
        F("SASB standards, which report the issues that move a firm's financial results",
          "SASB is outside-in: it looks for issues that affect the firm's financial results. Nobody here asks about "
          "the mill's cash flows."),
    ],
    kort="<p><b>GRI.</b> The readers are stakeholders and they ask how the mill affects the world. That is impact "
         "materiality. GRI is the framework built for it.</p>",
    full="<p><b>One question sorts the frameworks.</b> Who is the report for? Investors want to know how "
         "sustainability issues affect the firm's cash flows and risk. That is financial materiality, or "
         "outside-in. Stakeholders such as neighbours, employees and NGOs want to know how the firm affects people "
         "and planet. That is impact materiality, or inside-out.</p>"
         "<p><b>Here.</b> The readers are stakeholders and the question runs from the mill to the region. GRI "
         "reports impacts on the economy, environment and people, topic by topic (for example GRI 305 Emissions), "
         "for all stakeholders.</p>"
         "<p><b>The usual mix-up.</b> SASB, ISSB and TCFD all look the other way: what sustainability does to the "
         "firm, for investors. TCFD is also limited to climate. CSRD in the EU asks for both directions at once, "
         "which is double materiality.</p>"
         "<p><b>Remember:</b> stakeholders and impact on the world means GRI; investors and impact on the firm "
         "means SASB, ISSB or TCFD.</p>",
)

statisk(
    "rep-s02", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about two things at once: the direction of the question (the lens) and the framework built for "
        "that lens.",
        "Financial materiality asks how sustainability issues affect the firm (outside-in). Impact materiality asks "
        "how the firm affects people and planet (inside-out). Each voluntary framework is built for one lens and "
        "one main reader.",
        "<p><b>Step 1: the direction.</b> Does the issue act on the brewery, or does the brewery act on the "
        "world?</p>"
        "<p><b>Step 2: the reader.</b> Who will read this report?</p>"
        "<p><b>Step 3: match</b> the lens and the reader to a framework.</p>",
    ),
    q="<p>A brewery's investor relations team prepares a report for shareholders on how water scarcity could raise "
      "the brewery's costs and threaten its future production. Which lens is this and which voluntary framework "
      "is built for it?</p>",
    alternativer=[
        R("Financial materiality, reported under ISSB standards"),
        F("Impact materiality, reported under the GRI standards",
          "The question runs from water scarcity to the brewery's costs, not from the brewery to the world. That "
          "is not impact materiality."),
        F("Financial materiality, reported under the GRI standards",
          "GRI is built for impact materiality and all stakeholders. It is not the investor framework."),
        F("Impact materiality, reported under the ISSB standards",
          "This pairs an investor framework with the stakeholder lens. ISSB standards are not built for impact "
          "materiality."),
    ],
    kort="<p><b>Financial materiality under ISSB.</b> Water scarcity acting on the brewery's costs is outside-in. "
         "The readers are shareholders. ISSB is the investor-focused standard, aligned with TCFD.</p>",
    full="<p><b>The lens.</b> Financial materiality asks how a sustainability issue affects the firm's cash flows, "
         "risk and value. It runs outside-in. Impact materiality asks how the firm affects people and the "
         "environment. It runs inside-out.</p>"
         "<p><b>Here.</b> Water scarcity is an issue in the world that acts on the brewery: higher costs, less "
         "production. The readers are shareholders. That is financial materiality. The ISSB standards under "
         "IFRS are built for exactly this: investor-focused sustainability disclosure, aligned with TCFD.</p>"
         "<p><b>The trap.</b> The same topic can be material in both directions. If the brewery's water use dried "
         "out local wells, that impact would be a GRI topic. The direction of the question decides the lens, not "
         "the topic.</p>"
         "<p><b>Remember:</b> ask which way the arrow points. Issue to firm is financial materiality (ISSB, SASB, "
         "TCFD). Firm to world is impact materiality (GRI).</p>",
)

statisk(
    "rep-s03", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about what makes a topic material under the EU's CSRD.",
        "CSRD companies report under ESRS on their impacts, risks and opportunities (IROs). A topic is material if "
        "it is material from the impact side, the financial side or both: double materiality.",
        "<p><b>Step 1: the financial side.</b> Does the topic move the retailer's cash flows or risk?</p>"
        "<p><b>Step 2: the impact side.</b> Does the retailer's business affect people or the environment through "
        "this topic?</p>"
        "<p><b>Step 3: apply CSRD's rule</b> for when one side is enough.</p>",
    ),
    q="<p>An EU fashion retailer within the scope of CSRD finds that low wages at its suppliers' factories have "
      "little effect on its own cash flows, but a large effect on the workers. Must it report on this topic?</p>",
    alternativer=[
        R("Yes, since CSRD's double materiality also counts impacts on people"),
        F("No, since only topics that affect cash flows are material under CSRD",
          "That is financial materiality alone. CSRD uses both lenses, so an impact can be material on its own."),
        F("No, since workers at suppliers lie outside the firm's own reporting",
          "CSRD and ESRS cover impacts in the value chain too. PwC's slide lists a standard for workers in the "
          "value chain."),
        F("Yes, but only if an ESG rating agency flags the topic as material",
          "Materiality under CSRD comes from the firm's own assessment of impacts, risks and opportunities, not "
          "from a rater."),
    ],
    kort="<p><b>Yes.</b> CSRD rests on double materiality. A large impact on workers in the value chain makes the "
         "topic material even when the financial effect is small.</p>",
    full="<p><b>Double materiality.</b> CSRD companies report under the European Sustainability Reporting Standards "
         "(ESRS). They assess their IROs: impacts, risks and opportunities. A topic is material if it matters in "
         "either direction: how sustainability affects the firm (financial materiality) or how the firm affects "
         "people and planet (impact materiality). One side is enough.</p>"
         "<p><b>Here.</b> The financial effect is small, but the impact on factory workers is large. On the impact "
         "side the topic is material, so the retailer must report on it. PwC showed that the ESRS structure has "
         "social standards for the firm's own workforce and for workers in the value chain.</p>"
         "<p><b>The mix-up.</b> ISSB, SASB and TCFD use financial materiality only. Under those, this topic could "
         "drop out. CSRD is the regime that adds the impact lens on top.</p>"
         "<p><b>Remember:</b> under CSRD, material on either side means reportable.</p>",
)

# ---------------------------------------------------------------------------
# Integrated Reporting og de seks kapitalene
# ---------------------------------------------------------------------------

statisk(
    "rep-s04", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the six capitals that Integrated Reporting uses to show how a firm creates value.",
        "The six capitals are financial, manufactured, intellectual, human and natural capital, plus social and "
        "relationship capital. Each is defined by what it consists of and where it sits.",
        "<p><b>Step 1: is it money, a physical object or neither?</b></p>"
        "<p><b>Step 2: if neither, does it stay with the firm when an employee leaves?</b></p>"
        "<p><b>Step 3: name the capital</b> that fits.</p>",
    ),
    q="<p>A software company's integrated report describes its patents, the source code it owns and the internal "
      "procedures that let it ship updates quickly. Under &lt;IR&gt;, which of the six capitals is this?</p>",
    alternativer=[
        R("Intellectual capital: knowledge-based intangibles"),
        F("Human capital: people's skills, experience and motivation",
          "Human capital sits in the employees. Patents, owned code and procedures belong to the firm and stay "
          "when people leave."),
        F("Manufactured capital: physical objects used in production",
          "Manufactured capital is buildings, equipment and infrastructure. Nothing here is physical."),
        F("Financial capital: funds such as equity, debt and grants",
          "Financial capital is money available to the firm. Patents and code are not funds."),
    ],
    kort="<p><b>Intellectual capital.</b> Patents, owned software and procedures are knowledge-based intangibles "
         "that belong to the firm, not to its people.</p>",
    full="<p><b>Six capitals.</b> Firms usually report on two capitals: financial and manufactured. Integrated "
         "Reporting (&lt;IR&gt;) widens the view to six, so that one report shows everything the firm uses to "
         "create value: financial, manufactured, intellectual, human and natural capital, plus social and "
         "relationship capital.</p>"
         "<p><b>Here.</b> Patents, owned source code and internal procedures are knowledge-based intangibles: "
         "intellectual capital. The firm owns them and keeps them when an engineer leaves.</p>"
         "<p><b>The mix-up.</b> Human capital is the competencies, experience and motivation of the people "
         "themselves. The engineers' skills are human capital; the code they wrote and the firm owns is "
         "intellectual capital. Nothing here is physical (manufactured) or money (financial).</p>"
         "<p><b>Remember:</b> knowledge the firm owns is intellectual capital; knowledge that walks out of the "
         "door with a person is human capital.</p>",
)

statisk(
    "rep-s05", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the six capitals in Integrated Reporting and the two that are easiest to mix up for a "
        "resource company.",
        "Financial capital is funds, manufactured capital is physical objects, intellectual capital is "
        "knowledge-based intangibles, human capital is people's competencies and natural capital is environmental "
        "resources and processes. One more capital covers ties within and between communities and stakeholders.",
        "<p><b>Step 1: what exactly is the asset described?</b> A resource, a skill, a piece of knowledge or a "
        "tie with people outside the firm?</p>"
        "<p><b>Step 2: match it</b> to the capital defined by that kind of asset.</p>",
    ),
    q="<p>A mining company's integrated report describes the trust it has built with the communities and "
      "indigenous groups near its mines. Without that trust, it says, it would lose its informal licence to "
      "operate. Under &lt;IR&gt;, which capital is this?</p>",
    alternativer=[
        R("Social and relationship capital"),
        F("Natural capital",
          "Natural capital is environmental resources and processes, such as land, water and ore. Trust with "
          "communities is not an environmental resource."),
        F("Human capital",
          "Human capital is the competencies and motivation of the firm's own people. The trust here sits in "
          "relationships with outsiders."),
        F("Intellectual capital",
          "Intellectual capital is knowledge-based intangibles such as patents and procedures. Trust with "
          "communities is not knowledge the firm owns."),
    ],
    kort="<p><b>Social and relationship capital.</b> Trust with local communities is a relationship with "
         "stakeholders outside the firm, which is what this capital covers.</p>",
    full="<p><b>The capital.</b> Social and relationship capital is the relationships within and between "
         "communities and stakeholders, including the trust that lets a firm keep operating. &lt;IR&gt; asks firms "
         "to report on it next to the usual financial and manufactured capital.</p>"
         "<p><b>Here.</b> The miner's asset is trust with local communities and indigenous groups. Without it, "
         "protests or lost permits can stop the mines. That is a relationship, so it is social and relationship "
         "capital.</p>"
         "<p><b>The mix-up.</b> Because mining is about land and ore, natural capital is tempting. Natural capital "
         "is the environmental resources and processes themselves: the ore body, the water, the land. Human "
         "capital is the skills and motivation of the firm's own staff, not ties with outsiders.</p>"
         "<p><b>Remember:</b> resources from nature are natural capital; trust and ties with people outside the "
         "firm are social and relationship capital.</p>",
)

statisk(
    "rep-s06", tema="rapportering", type="paastand",
    hjelp=hjelp3(
        "This is about the evidence in lecture 7 on whether Integrated Reporting pays off, compared with three "
        "other ways of reporting.",
        "&lt;IR&gt; shows in one report how the firm creates value with six capitals. The evidence compares firms "
        "that use it with firms in each of the other three groups, one comparison at a time.",
        "<p><b>Step 1: compare &lt;IR&gt; with no ESG reporting.</b></p>"
        "<p><b>Step 2: compare it with ESG pages in the annual report.</b></p>"
        "<p><b>Step 3: ask what a firm with a dedicated ESG report gains</b> by repackaging the same "
        "information.</p>",
    ),
    q="<p>Lecture 7 sorts firms into four groups: no ESG reporting, a stand-alone ESG report, ESG reporting in the "
      "annual report and Integrated Reporting (&lt;IR&gt;). Which statement matches the evidence it presents?</p>",
    alternativer=[
        R("&lt;IR&gt; beats annual-report ESG pages but adds nothing to a stand-alone ESG report"),
        F("&lt;IR&gt; beats all three other groups, a stand-alone ESG report included",
          "Too strong. Firms that already publish a stand-alone ESG report do not benefit from switching."),
        F("Firms gain the most by moving from a stand-alone ESG report to &lt;IR&gt;",
          "This reverses the finding for stand-alone reporters. Their switch is the one that brings no benefit."),
        F("&lt;IR&gt; does no better than having no ESG reporting at all",
          "The evidence says the opposite: &lt;IR&gt; is superior to no ESG reporting."),
    ],
    kort="<p><b>&lt;IR&gt; beats no ESG reporting and ESG in the annual report, but switching from a stand-alone "
         "ESG report adds nothing.</b> A dedicated report already puts the information in front of users.</p>",
    full="<p><b>The finding.</b> Lecture 7 sorts firms into four groups: no ESG reporting, stand-alone ESG "
         "reporting, ESG reporting in the annual report and &lt;IR&gt;. &lt;IR&gt; is superior to no ESG reporting "
         "and to ESG reporting in the annual report. But firms do not benefit from a switch from stand-alone ESG "
         "reporting to &lt;IR&gt;.</p>"
         "<p><b>One reading.</b> A dedicated ESG report already puts the sustainability information in front of "
         "the people who want it. Repackaging the same content into an integrated report adds little. ESG pages "
         "tucked into an annual report, or no ESG reporting at all, leave more to gain.</p>"
         "<p><b>The trap.</b> It is tempting to read the evidence as a ranking with &lt;IR&gt; at the top on every "
         "count. It is not: against the stand-alone report, there is no gain.</p>"
         "<p><b>Remember:</b> &lt;IR&gt; beats no ESG reporting and beats ESG in the annual report; it does not "
         "beat a stand-alone ESG report.</p>",
)

# ---------------------------------------------------------------------------
# TCFD og CDP
# ---------------------------------------------------------------------------

statisk(
    "rep-s07", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the four pillars of the TCFD recommendations and which one a given disclosure belongs to.",
        "Governance: who oversees climate issues. Strategy: what climate means for the business and its plans. "
        "Risk management: the process for handling climate risks. Metrics and targets: the numbers tracked and "
        "the goals set.",
        "<p><b>Step 1: what is being disclosed?</b> Who oversees, how risks are handled, what climate does to the "
        "business, or which numbers are tracked?</p>"
        "<p><b>Step 2: watch the trap.</b> Ask whether the disclosure describes a process or tests whether the "
        "business plan holds up.</p>",
    ),
    q="<p>A shipping company tests how its fleet plan and earnings would hold up if the world follows a 2°C pathway "
      "with steeply rising carbon prices. It publishes the results. Under which TCFD pillar does this disclosure "
      "belong?</p>",
    alternativer=[
        R("Strategy"),
        F("Risk management",
          "Risk management describes the process for identifying, assessing and managing climate risks. Testing "
          "whether the business plan holds up under climate scenarios is another pillar."),
        F("Metrics and targets",
          "Metrics and targets covers the numbers the firm tracks, such as emissions, plus its targets. A scenario "
          "test of the business plan is not a metric."),
        F("Governance",
          "Governance is the board's oversight and management's role. Nothing here is about who oversees climate "
          "risk."),
    ],
    kort="<p><b>Strategy.</b> The strategy pillar covers the impact of climate risks and opportunities on the "
         "business and financial planning, including resilience under scenarios such as 2°C or lower.</p>",
    full="<p><b>The four pillars.</b> The Task Force on Climate-related Financial Disclosures (TCFD, 2017; the "
         "slides spell it «TFCD») asks firms to disclose in four pillars. Governance: the board's oversight of "
         "climate risks and opportunities and management's role. Strategy: their actual and potential impact on "
         "the business, strategy and financial planning over the short, medium and long term, plus the resilience "
         "of the strategy under different climate scenarios, including a 2°C or lower scenario. Risk management: "
         "how climate risks are identified, assessed and managed. Metrics and targets: Scope 1, Scope 2 and, if "
         "appropriate, Scope 3 emissions plus targets.</p>"
         "<p><b>Here.</b> Testing whether the fleet plan and earnings survive a 2°C pathway is scenario analysis "
         "of the strategy's resilience. That sits under strategy.</p>"
         "<p><b>The trap.</b> Scenario work sounds like risk management. But risk management describes the "
         "process, not whether the business plan holds up.</p>"
         "<p><b>Remember:</b> scenarios test the strategy, so scenario analysis is a strategy disclosure.</p>",
)

statisk(
    "rep-s08", tema="rapportering", type="paastand",
    hjelp=hjelp3(
        "This is about what the TCFD recommendations ask for: the four pillars, the lens and where the disclosure "
        "goes.",
        "TCFD has four pillars. Governance covers oversight and roles, strategy the impact on the business, risk "
        "management the process and metrics and targets the numbers. Check the lens and the place of disclosure "
        "too.",
        "<p><b>Step 1: for each pillar statement,</b> ask whether the item is about people and roles or about "
        "numbers.</p>"
        "<p><b>Step 2: for the other statements,</b> ask which reader TCFD serves and where its disclosures "
        "go.</p>",
    ),
    q="<p>Which statement about the TCFD recommendations is correct?</p>",
    alternativer=[
        R("Scope 1 and 2 emissions go under metrics and targets, Scope 3 if appropriate"),
        F("Management's role in assessing climate risk goes under metrics and targets",
          "Management's role is part of the governance pillar, together with the board's oversight."),
        F("TCFD asks firms to report their impact on society, using impact materiality",
          "TCFD uses financial materiality, consistent with how firms judge the materiality of other "
          "information."),
        F("TCFD disclosures belong in a stand-alone report, kept apart from financial filings",
          "TCFD asks for disclosure in the annual financial filings, not in a separate report."),
    ],
    kort="<p><b>Scope 1 and 2 under metrics and targets, Scope 3 if appropriate.</b> Management's role is "
         "governance, the lens is financial and the disclosure goes in the annual financial filings.</p>",
    full="<p><b>What TCFD asks for.</b> TCFD (2017) is a voluntary framework for climate-related financial "
         "disclosure, aimed at investors and companies. It uses financial materiality, «consistent with how "
         "companies determine the materiality of other information». It asks for disclosure in the annual "
         "financial filings.</p>"
         "<p><b>The pillars.</b> Governance covers the board's oversight and management's role. Strategy covers "
         "the impact on the business and scenario resilience. Risk management covers how climate risks are "
         "identified, assessed and managed. Metrics and targets covers the metrics used: Scope 1 and Scope 2 "
         "emissions, Scope 3 if appropriate, as well as targets and performance against them.</p>"
         "<p><b>The traps.</b> Management's role sounds operational, but it is governance. And TCFD is not an "
         "impact framework: that is GRI.</p>"
         "<p><b>Remember:</b> governance is who, strategy is what it means for the business, risk management is "
         "how, metrics and targets is how much.</p>",
)

statisk(
    "rep-s09", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about TCFD's seven principles for effective disclosure and which one a reporting habit breaks.",
        "The seven principles cover what is reported (relevance, completeness), how it reads (clarity, balance), "
        "how far it can be trusted (reliability), when it comes (timeliness) and how it lines up with other "
        "figures, both with peers and with the firm's own past.",
        "<p><b>Step 1: what can the reader not do?</b> Compare the firm with its peers, or compare it with its own "
        "earlier years?</p>"
        "<p><b>Step 2: pick the principle</b> that protects exactly that comparison.</p>",
    ),
    q="<p>A food producer changes the method it uses to calculate its emissions every year and never restates "
      "earlier years. Readers cannot tell whether its own emissions are rising or falling. Which of TCFD's seven "
      "principles for effective disclosure does this break most directly?</p>",
    alternativer=[
        R("Consistent over time"),
        F("Comparable within a sector, industry or portfolio",
          "Comparability is about setting one firm against its peers. The problem here is comparing the firm with "
          "itself across years."),
        F("Timely",
          "Timeliness is about when the information arrives. The figures may arrive on time and still not line up "
          "from year to year."),
        F("Relevant",
          "Emissions are relevant to a food producer. The problem is not what is reported but that the method "
          "keeps changing."),
    ],
    kort="<p><b>Consistent over time.</b> A method that changes every year without restatement makes the firm's own "
         "figures impossible to compare from year to year.</p>",
    full="<p><b>The principles.</b> TCFD lists seven principles for effective disclosure: relevant; specific and "
         "complete; clear, balanced and understandable; consistent over time; comparable within a sector, industry "
         "or portfolio; reliable, verifiable and objective; timely.</p>"
         "<p><b>Here.</b> Each of the producer's figures may be relevant and on time. But because the method "
         "changes every year, this year's number cannot be compared with last year's. That breaks consistency over "
         "time. Restating earlier years under the new method would fix it.</p>"
         "<p><b>The mix-up.</b> Consistency and comparability sound alike. Consistency is about the same firm "
         "across time. Comparability is about the firm against others in its sector, industry or portfolio.</p>"
         "<p><b>Remember:</b> consistent means comparable with your own past; comparable means comparable with "
         "your peers.</p>",
)

statisk(
    "rep-s10", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about which voluntary climate framework also takes reports from bodies other than companies.",
        "The voluntary frameworks differ in reader and in who reports. Some are built for companies reporting to "
        "investors. One collects carbon, water and forest data through an online platform from a wider range of "
        "reporters.",
        "<p><b>Step 1: who is reporting?</b> A company or a public body?</p>"
        "<p><b>Step 2: what data and where?</b> Emissions and water, on a shared platform rather than in a "
        "financial filing.</p>"
        "<p><b>Step 3: pick the framework</b> whose reporters include public bodies.</p>",
    ),
    q="<p>A regional government wants to disclose its greenhouse gas emissions and its water data on a platform that "
      "investors also use. Which framework from lecture 7 is built for this?</p>",
    alternativer=[
        R("CDP, through its online reporting platform"),
        F("TCFD, through disclosure in annual financial filings",
          "TCFD asks companies to disclose in their financial filings, for investors and companies. A regional "
          "government is not among its users."),
        F("ISSB, through its investor-focused IFRS standards",
          "ISSB standards are for companies reporting to investors. They are not built for governments."),
        F("&lt;IR&gt;, through one integrated report on six capitals",
          "&lt;IR&gt; shows how a firm creates value. It is a company report, not a platform for regions."),
    ],
    kort="<p><b>CDP.</b> CDP collects GHG, water, forest and supply-chain data through its online platform. Unlike "
         "TCFD, it takes reports from cities, states and regions as well as from companies.</p>",
    full="<p><b>CDP.</b> The Carbon Disclosure Project runs an online platform where reporters disclose greenhouse "
         "gas emissions, water, forests and supply chains. It is aligned with TCFD. Its users are investors, "
         "companies, cities, states and regions.</p>"
         "<p><b>Here.</b> The reporter is a regional government and the data are emissions and water. CDP is the "
         "framework in lecture 7 that takes reports from regions.</p>"
         "<p><b>The mix-up.</b> TCFD and CDP are often named together. CDP is even aligned with TCFD. The "
         "difference is who reports and where: TCFD asks companies to disclose in their annual financial filings, "
         "while CDP collects data on its own platform and covers public bodies too. ISSB and &lt;IR&gt; are "
         "company reports.</p>"
         "<p><b>Remember:</b> a city, state or region reporting its climate data points to CDP.</p>",
)

# ---------------------------------------------------------------------------
# EU: taksonomien, CSRD, NFRD, SFDR og Omnibus
# ---------------------------------------------------------------------------

statisk(
    "rep-s11", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the three tests an activity must pass to be aligned with the EU Taxonomy.",
        "Test 1: a substantial contribution to at least one of six environmental objectives. Test 2: do no "
        "significant harm (DNSH) to the other five. Test 3: minimum safeguards (the OECD Guidelines and the UN "
        "Guiding Principles). Technical screening criteria measure the tests.",
        "<p><b>Step 1: test 1.</b> Which objective does the project serve? Is it one of the six?</p>"
        "<p><b>Step 2: tests 2 and 3.</b> Are they passed?</p>"
        "<p><b>Step 3: are all three passed?</b> Then decide.</p>",
    ),
    q="<p>A port operator builds flood barriers that make a substantial contribution to climate change adaptation. "
      "The project does no significant harm to the other five environmental objectives and meets the minimum "
      "safeguards. It does nothing to cut emissions. Is the activity taxonomy-aligned?</p>",
    alternativer=[
        R("Yes: one substantial contribution is enough when the other tests are met"),
        F("No: every aligned activity must contribute to climate change mitigation",
          "Mitigation is one of six objectives, not a requirement for all. Adaptation is an objective in its own "
          "right."),
        F("No: an aligned activity must contribute to all six objectives",
          "The first test asks for a substantial contribution to at least one objective, not to all six."),
        F("Only partly: alignment rises with the number of objectives served",
          "Alignment is a pass or fail on three tests. Serving more objectives does not make an activity more "
          "aligned."),
    ],
    kort="<p><b>Yes.</b> The Taxonomy asks for a substantial contribution to at least one of six objectives. "
         "Adaptation counts on its own. The project also passes DNSH and the minimum safeguards.</p>",
    full="<p><b>The three tests.</b> An activity is taxonomy-aligned only if it passes all three: (1) a substantial "
         "contribution to at least one of six environmental objectives, (2) no significant harm (DNSH) to any of "
         "the other five and (3) the minimum safeguards, which are the OECD Guidelines for Multinational "
         "Enterprises and the UN Guiding Principles on Business and Human Rights. Technical screening criteria per "
         "activity and objective measure the tests.</p>"
         "<p><b>The six objectives.</b> Climate change mitigation, climate change adaptation, water and marine "
         "resources, circular economy, pollution prevention and control, biodiversity and ecosystems.</p>"
         "<p><b>Here.</b> Flood barriers contribute to adaptation. The project passes DNSH and the safeguards, so "
         "it is aligned, even though it cuts no emissions.</p>"
         "<p><b>The trap.</b> Mitigation is the best-known objective, but it is one of six. Contributing to more "
         "objectives does not make an activity more aligned.</p>"
         "<p><b>Remember:</b> at least one objective, harm to none, safeguards met.</p>",
)

statisk(
    "rep-s12", tema="rapportering", type="paastand",
    hjelp=hjelp3(
        "This is about what the EU Taxonomy classifies and where social issues fit into it.",
        "The Taxonomy defines which economic activities count as environmentally sustainable, using three tests: "
        "substantial contribution, do no significant harm and minimum safeguards.",
        "<p><b>Step 1: what is being classified?</b> Activities or companies?</p>"
        "<p><b>Step 2: what kind of objectives are the six?</b></p>"
        "<p><b>Step 3: where do the OECD Guidelines and the UN Guiding Principles come in?</b></p>",
    ),
    q="<p>Which statement about the EU Taxonomy is correct?</p>",
    alternativer=[
        R("Human rights enter through the minimum safeguards, not the six objectives"),
        F("Its six objectives include social goals such as fair wages and labour rights",
          "All six objectives are environmental, from climate change mitigation to biodiversity and ecosystems."),
        F("It rates whole companies from leaders to laggards, much like an ESG rating",
          "The Taxonomy classifies economic activities, not companies. It has no rating scale."),
        F("It is a voluntary standard that firms may pick instead of GRI",
          "Lecture 7 places the Taxonomy among the EU's mandatory instruments, next to CSRD and SFDR."),
    ],
    kort="<p><b>Human rights enter through the minimum safeguards.</b> The six objectives are all environmental. "
         "The safeguards add the OECD Guidelines and the UN Guiding Principles on Business and Human Rights.</p>",
    full="<p><b>What the Taxonomy is.</b> The EU Taxonomy gives companies, investors and policymakers a common "
         "definition of which economic activities count as environmentally sustainable. Its goals include meeting "
         "the EU's 2030 climate and energy targets, protecting investors from greenwashing and shifting investment "
         "to where it is most needed. It sits with CSRD and SFDR among the EU's mandatory instruments.</p>"
         "<p><b>Where social issues fit.</b> The six objectives are all environmental: mitigation, adaptation, "
         "water and marine resources, circular economy, pollution and biodiversity. Social issues enter through the "
         "third test, the minimum safeguards, which build on the OECD Guidelines for Multinational Enterprises and "
         "the UN Guiding Principles on Business and Human Rights.</p>"
         "<p><b>The traps.</b> The Taxonomy classifies activities, not whole firms. It does not grade them like "
         "an ESG rating either. An activity either passes all three tests or it does not.</p>"
         "<p><b>Remember:</b> environmental objectives, social safeguards, activities not companies.</p>",
)

statisk(
    "rep-s13", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the practical challenges PwC saw in the first years of CSRD reporting.",
        "PwC listed factors that may affect the quality of sustainability reporting. Ask whether the problems in "
        "the case come from the topic, from the standard, from the firm's legal status or from the firm's own "
        "processes.",
        "<p><b>Step 1: list what went wrong</b>: definitions, tools, documentation.</p>"
        "<p><b>Step 2: is any of it caused by the topic or by the standard itself?</b> Or by how the firm "
        "works?</p>",
    ),
    q="<p>During a first CSRD audit, the auditor cannot recreate a firm's reported water figures. Several units "
      "built them in manual spreadsheets, each with its own definition of «water use». Nobody kept the "
      "workings. How did the PwC guest lecture describe problems like these?</p>",
    alternativer=[
        R("Typical data-quality pitfalls of immature reporting processes"),
        F("Signs that water is not a material topic for the firm",
          "Whether a topic is material is decided in the materiality assessment. Poor data says nothing about "
          "it."),
        F("Proof that double materiality makes reporting impossible to audit",
          "PwC did not blame double materiality. The causes here are definitions, spreadsheets and missing "
          "documentation."),
        F("Issues that only affect firms reporting voluntarily under CSRD",
          "Nothing limits these pitfalls to voluntary reporters. They follow from weak processes and systems."),
    ],
    kort="<p><b>Data-quality pitfalls.</b> Unclear definitions, many contributors, manual spreadsheets and missing "
         "documentation are the pitfalls PwC listed for immature sustainability reporting processes.</p>",
    full="<p><b>The weak spot.</b> PwC said that immature sustainability reporting processes and weak technology "
         "support give this type of reporting a greater inherent risk. Its list of pitfalls: unclear definitions "
         "of each indicator and which data to use; little standardisation and different measurement methods across "
         "borders; many contributors and decentralised responsibility; fragmented systems; weak control over master "
         "data; little experience with internal controls; manual spreadsheets; missing documentation, which limits "
         "traceability and makes calculations hard to recreate and validate.</p>"
         "<p><b>Here.</b> Different definitions, manual spreadsheets and no workings: three pitfalls from the list. "
         "The auditor cannot validate the figures.</p>"
         "<p><b>The fix.</b> PwC's advice: keep financial and sustainability reporting consistent from the start, "
         "focus on material matters, use digital tools critically and build multidisciplinary teams.</p>"
         "<p><b>Remember:</b> in the first CSRD years, the problem was less the standard than the data behind "
         "it.</p>",
)

statisk(
    "rep-s14", tema="rapportering", type="begrep",
    hjelp=hjelp3(
        "This is about the three mandatory EU instruments in lecture 7 and the job each one does.",
        "The EU has three instruments: one defines which activities are environmentally sustainable, one sets what "
        "companies report (it replaced an older directive) and one sets disclosure rules for asset managers, "
        "pension funds and insurers.",
        "<p><b>Step 1: is the task to classify activities, to require company reports or to require fund "
        "disclosures?</b> The banks disagree about a label, not about what to report.</p>"
        "<p><b>Step 2: match the task</b> to the instrument built for it.</p>",
    ),
    q="<p>Three banks give the same hydropower project three different labels: «green», «transition» and «not "
      "sustainable». EU policymakers want one shared answer to which economic activities may be called "
      "environmentally sustainable, partly to protect investors from greenwashing. Which EU instrument provides "
      "it?</p>",
    alternativer=[
        R("The EU Taxonomy for sustainable activities"),
        F("The Corporate Sustainability Reporting Directive",
          "CSRD sets what large companies must report and how. It does not define which activities are "
          "sustainable."),
        F("The Sustainable Finance Disclosure Regulation",
          "SFDR is a disclosure regulation for asset managers, pension funds and insurers. It does not classify "
          "activities."),
        F("The Non-Financial Reporting Directive",
          "NFRD was the earlier reporting directive, now replaced by CSRD. It did not classify activities "
          "either."),
    ],
    kort="<p><b>The EU Taxonomy.</b> It defines which economic activities count as environmentally sustainable. Its "
         "goals include protecting investors from greenwashing and shifting investment to where it is most "
         "needed.</p>",
    full="<p><b>Three instruments, three jobs.</b> The EU Taxonomy defines which economic activities count as "
         "environmentally sustainable. CSRD, which replaced NFRD and widened its reach from about 12,000 to about "
         "50,000 companies, sets what companies must report, under ESRS and double materiality. SFDR sets "
         "disclosure rules for asset managers, pension funds and insurers, which is where Article 8 and Article 9 "
         "funds come from.</p>"
         "<p><b>Here.</b> The problem is a classification: which activities may be called sustainable. That is the "
         "Taxonomy's job. Its stated goals include meeting the EU's 2030 climate and energy targets, protecting "
         "investors from greenwashing, helping companies become more climate-friendly and shifting investment to "
         "where it is most needed.</p>"
         "<p><b>The mix-up.</b> CSRD and SFDR are about disclosure: who must report what. A CSRD report contains "
         "Taxonomy disclosures, but CSRD does not define the Taxonomy.</p>"
         "<p><b>Remember:</b> the Taxonomy classifies, CSRD makes companies report, SFDR makes funds "
         "disclose.</p>",
)

statisk(
    "rep-s15", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about how CSRD changes the sustainability part of the management report.",
        "CSRD companies report under the European Sustainability Reporting Standards (ESRS), based on double "
        "materiality and on their impacts, risks and opportunities. ESRS 2 holds the general disclosures; topical "
        "standards follow.",
        "<p><b>Step 1: is CSRD reporting voluntary or mandatory?</b></p>"
        "<p><b>Step 2: who sets the format,</b> the firm or common standards?</p>"
        "<p><b>Step 3: how wide is the coverage?</b> Climate only, or more?</p>",
    ),
    q="<p>For years, a manufacturer's management report said only: «Our emissions stay within the limits set by the "
      "authorities.» The firm now falls under CSRD. According to the PwC guest lecture, what replaces lines like "
      "this?</p>",
    alternativer=[
        R("A standardised set of disclosures under the mandatory ESRS standards"),
        F("A short sustainability summary that the firm writes in its own format",
          "CSRD moves reporting away from each firm's own wording and format. A self-written summary keeps the "
          "old problem."),
        F("A voluntary GRI content index that the firm may add if it wishes",
          "CSRD reporting is mandatory and follows ESRS, not a voluntary GRI index."),
        F("A climate section only, since ESRS covers climate change alone",
          "ESRS has general disclosures plus environmental, social and governance standards, for example S1 Own "
          "workforce and G1 Business conduct."),
    ],
    kort="<p><b>A standardised structure under mandatory ESRS.</b> PwC showed the shift from vague one-liners to "
         "general disclosures (ESRS 2) plus environmental, social and governance standards and the Taxonomy "
         "disclosures.</p>",
    full="<p><b>The change.</b> Before CSRD, a management report could get away with vague lines such as «we do not "
         "pollute more than the norm in our industry». PwC showed what replaces them: a sustainability statement "
         "with a set structure based on mandatory standards, the ESRS. It starts with general disclosures (ESRS 2), "
         "then environmental standards (for example E1 Climate change), social standards (for example S1 Own "
         "workforce) and governance (G1 Business conduct), plus the disclosures required by the Taxonomy "
         "Regulation.</p>"
         "<p><b>Why.</b> The structure rests on double materiality and on the firm's impacts, risks and "
         "opportunities (IROs). Each material topic gets disclosures on how it is managed and on metrics and "
         "targets, so reports can be compared and assured.</p>"
         "<p><b>The traps.</b> CSRD is not a voluntary add-on like a GRI index. ESRS is also far wider than "
         "climate.</p>"
         "<p><b>Remember:</b> CSRD swaps the firm's own wording for a standard structure under ESRS.</p>",
)

statisk(
    "rep-s16", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the narrower CSRD scope after the EU's Omnibus simplification package, as PwC presented it.",
        "After the Omnibus package, CSRD scope rests on two size tests: one for the number of employees and one "
        "for net turnover. Both must be met.",
        "<p><b>Step 1: check the staff test.</b> Does the group pass it?</p>"
        "<p><b>Step 2: check the turnover test.</b> Does it pass that one?</p>"
        "<p><b>Step 3: apply the rule</b> for how the two tests combine. Earlier waves do not matter.</p>",
    ),
    q="<p>An unlisted industrial group has far more employees than the post-Omnibus staff threshold, but its net "
      "turnover is well below the new turnover threshold. Before the Omnibus package it was due to report under "
      "CSRD in wave 2. Under the scope PwC presented, what happens to it?</p>",
    alternativer=[
        R("It falls outside, since it fails the turnover test"),
        F("It stays in, since meeting the staff test alone is enough",
          "The new scope needs both tests at once: enough employees and enough turnover."),
        F("It stays in, since firms already in scope keep their duty",
          "The Omnibus package changed the scope itself. Firms that no longer meet it fall out, whatever their "
          "earlier wave."),
        F("It falls outside, since only listed firms remain in scope",
          "The new scope is set by size, employees and turnover, not by listing."),
    ],
    kort="<p><b>It falls outside.</b> The post-Omnibus scope needs both enough employees and enough net turnover. The "
         "group passes the staff test but fails the turnover test.</p>",
    full="<p><b>The Omnibus package.</b> On 26 February 2025 the European Commission adopted the Omnibus "
         "simplification package. PwC called it a drastic change in the scope of CSRD. Before it, three waves were "
         "to bring in large public-interest companies first, then large companies meeting two of three size "
         "criteria, then listed SMEs. After it, a company or group reports only if it is large on both counts: at "
         "least 1,000 employees and net turnover above EUR 450 million, from financial year 2027. The Commission "
         "estimates that 80% of the companies previously covered fall outside.</p>"
         "<p><b>Here.</b> The group clears the staff test but not the turnover test. Both must hold, so it falls "
         "outside.</p>"
         "<p><b>The traps.</b> The old wave 2 used «two of three» criteria, which is why «one test is enough» "
         "sounds familiar. The new scope uses size, not listing. Earlier waves give no protection. The rules are "
         "still moving; this is the state PwC presented in September 2026.</p>"
         "<p><b>Remember:</b> after Omnibus, a firm must be large on staff and on turnover at the same time.</p>",
)

statisk(
    "rep-s17", tema="rapportering", type="paastand",
    hjelp=hjelp3(
        "This is about the order and the job of the EU's reporting rules: NFRD, CSRD, SFDR and the Omnibus "
        "package.",
        "Three instruments plus one amendment: an older reporting directive, its successor for companies, a "
        "disclosure regulation for investors and a simplification package.",
        "<p><b>Step 1: put the two company directives in order.</b> Which came first? Which covers more "
        "firms?</p>"
        "<p><b>Step 2: who does SFDR cover?</b></p>"
        "<p><b>Step 3: did the Omnibus package widen or narrow the scope?</b></p>",
    ),
    q="<p>Which statement about the EU's sustainability reporting rules is correct?</p>",
    alternativer=[
        R("CSRD reaches more firms than NFRD did, though Omnibus has since cut its reach"),
        F("SFDR is the directive that tells listed companies how to report under the ESRS",
          "SFDR is for asset managers, pension funds and insurers. Companies report under ESRS because of CSRD."),
        F("The Omnibus package widened CSRD to cover more listed SMEs",
          "The Omnibus package narrowed the scope sharply, to large firms only."),
        F("NFRD replaced CSRD and cut the number of reporters to about 12,000",
          "This reverses the order of the two directives."),
    ],
    kort="<p><b>CSRD replaced NFRD and widened its scope; the Omnibus package then narrowed it.</b> NFRD covered "
         "about 12,000 companies and CSRD was to cover about 50,000. After Omnibus only very large firms "
         "remain.</p>",
    full="<p><b>The sequence.</b> The Non-Financial Reporting Directive (NFRD) covered about 12,000 companies. The "
         "Corporate Sustainability Reporting Directive (CSRD) replaced it and was to cover about 50,000, reporting "
         "under ESRS with double materiality. In February 2025 the Omnibus package narrowed the scope again: from "
         "financial year 2027, only firms with at least 1,000 employees and net turnover above EUR 450 million. The "
         "Commission estimates that 80% of those previously covered fall out.</p>"
         "<p><b>The investor side.</b> SFDR is not a company directive. It sets disclosure rules for asset "
         "managers, pension funds and insurers, which is where the Article 8 and Article 9 fund labels come from "
         "(lecture 8).</p>"
         "<p><b>The traps.</b> Swapping the order of NFRD and CSRD, putting SFDR on companies and reading "
         "«simplification» as a wider scope.</p>"
         "<p><b>Remember:</b> NFRD, then CSRD (wider), then Omnibus (much narrower); SFDR is for investors.</p>",
)

# ---------------------------------------------------------------------------
# Virker rapportering? HBR, grønnvasking og ESG-ratinger
# ---------------------------------------------------------------------------

statisk(
    "rep-s18", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the problems and the remedy in the HBR article on sustainability reporting that lecture 7 "
        "discusses.",
        "The article lists problems with reporting (such as no mandates or auditing, complexity and confusing "
        "information) and with sustainable investing (such as unreliable ratings and lack of comparability). Its "
        "first remedy is «measure less, better».",
        "<p><b>Step 1: does the proposal add frameworks or cut them?</b></p>"
        "<p><b>Step 2: does it add an external check or remove it?</b></p>"
        "<p><b>Step 3: compare both answers</b> with the article's remedy.</p>",
    ),
    q="<p>A business lobby proposes that firms be free to pick among even more ESG frameworks, with no external "
      "audit, so that each firm can use the standard that suits it best. How does the HBR article «Overselling "
      "Sustainability Reporting», discussed in lecture 7, judge a proposal like this?</p>",
    alternativer=[
        R("It runs against the article's remedy: fewer frameworks, mandated and audited"),
        F("It fits the remedy, since more choice gives investors more comparable data",
          "The article lists lack of comparability as a problem. More frameworks to choose from make firms harder "
          "to compare, not easier."),
        F("It fits the remedy, since audits are a burden that reporting should avoid",
          "The article lists the lack of mandates and auditing among the problems. Dropping audits makes it "
          "worse."),
        F("It is outside the article, which criticises only sustainable investors",
          "The article lists problems with reporting as well as with sustainable investing."),
    ],
    kort="<p><b>It runs against the remedy.</b> The article's answer is «measure less, better»: fewer frameworks, "
         "with reports mandated and audited by an empowered referee.</p>",
    full="<p><b>The article.</b> «Overselling Sustainability Reporting» (HBR) lists what goes wrong. For reporting: "
         "no mandates or auditing, specious targets, opaque supply chains, complexity, confusing information and "
         "inattention to developing countries. For sustainable investing: unhelpful definitions of «sustainable», "
         "unreliable ratings, lack of comparability and difficulty judging and scaling real impact.</p>"
         "<p><b>The remedy.</b> It starts with «measure less, better». The many authorities and frameworks are "
         "unwieldy, confusing and burdensome for companies. Reports must be mandated and audited by an empowered "
         "referee.</p>"
         "<p><b>Here.</b> The proposal adds frameworks and drops audits. It moves in the opposite direction on both "
         "counts and makes comparison harder.</p>"
         "<p><b>The trap.</b> «Freedom to choose» sounds like it lowers the burden. The article's point is that the "
         "plethora of frameworks is itself the burden.</p>"
         "<p><b>Remember:</b> measure less, better: fewer frameworks, mandatory and audited.</p>",
)

statisk(
    "rep-s19", tema="rapportering", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what a review of greenwashing research finds about voluntary and mandatory reporting.",
        "The review makes one finding about purely voluntary reporting and one proposal for a better regime. Check "
        "each statement against them on its own.",
        "<p><b>Step 1: statement I.</b> What does the review say happens when reporting is left entirely to "
        "firms?</p>"
        "<p><b>Step 2: statement II.</b> Does the review want voluntary reporting kept alone, dropped or combined "
        "with something?</p>"
        "<p><b>Step 3: combine</b> your two verdicts.</p>",
    ),
    q="<p>A review of greenwashing research in lecture 7 reaches a conclusion about reporting regimes.</p>"
      "<p>I. Leaving CSR reporting wholly to firms' own discretion helps greenwashing spread.<br>"
      "II. A mix of voluntary and mandatory elements is a better defence against greenwashing than voluntary "
      "reporting alone.</p>"
      "<p>Which statements match the review?</p>",
    alternativer=[
        F("Only I",
          "Statement II also holds: the review proposes combining voluntary and mandatory elements."),
        F("Only II",
          "Statement I also holds: the review finds that an entirely voluntary approach facilitates "
          "greenwashing."),
        R("Both I and II"),
        F("Neither I nor II",
          "Both statements restate the review in other words: its finding and its proposal."),
    ],
    kort="<p><b>Both I and II.</b> The review finds that an entirely voluntary approach facilitates greenwashing. "
         "It proposes a combination of voluntary and mandatory elements instead.</p>",
    full="<p><b>The review.</b> Lecture 7 shows a review of greenwashing research. Its finding: an entirely "
         "voluntary CSR approach facilitates the diffusion of greenwashing. Firms can say what they like, in the "
         "format they like. Nobody checks. Its proposal: greenwashing could be better prevented with a combination "
         "of voluntary and mandatory aspects.</p>"
         "<p><b>Statement I</b> is the finding in other words. <b>Statement II</b> is the proposal in other words. "
         "Both match.</p>"
         "<p><b>The trap.</b> It is easy to read the proposal as «make everything mandatory». The review asks for a "
         "mix, not for mandatory rules alone. The EU's set-up follows the same idea: mandatory CSRD reporting under "
         "ESRS, while voluntary frameworks such as GRI and TCFD stay in use. Krueger, Sautner, Tang and Zhong "
         "(2021), also in the lecture, study the effects of mandatory ESG disclosure.</p>"
         "<p><b>Remember:</b> purely voluntary invites greenwashing; the cure is a mix, not mandatory alone.</p>",
)

statisk(
    "rep-s20", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about the problems with ESG data listed by Kotsantonis and Serafeim, shown in lecture 7.",
        "They list three problems: companies report in varied and inconsistent ways; benchmarking against a chosen "
        "peer group is crucial for a firm's ranking; data providers disagree a lot, more so when more information "
        "is public.",
        "<p><b>Step 1: what changed?</b> The firm, its reports, the amount of information or the group it is "
        "compared with?</p>"
        "<p><b>Step 2: match</b> the one thing that changed to the problem on the list.</p>",
    ),
    q="<p>An ESG data provider moves a packaging firm from its «chemicals» peer group to «containers and "
      "packaging». Nothing about the firm or its reports changes, yet its ESG ranking jumps from the bottom third "
      "to the top third. Which problem with ESG data does this illustrate, as Kotsantonis and Serafeim (2019) "
      "describe it?</p>",
    alternativer=[
        R("The choice of peers largely decides a company's ranking"),
        F("Disagreement between raters grows with more public information",
          "The amount of public information did not change here, so this cannot explain the jump."),
        F("Companies report the same facts in varied and inconsistent ways",
          "The firm's reporting did not change at all, so inconsistent reporting cannot explain the jump."),
        F("Raters ignore what companies themselves disclose",
          "This is not one of the problems listed. The firm's disclosure did not change anyway."),
    ],
    kort="<p><b>The choice of peers decides the ranking.</b> Only the peer group changed, yet the rank moved from "
         "bottom to top. Benchmarking, not performance, drove the result.</p>",
    full="<p><b>What no one tells you about ESG data.</b> Kotsantonis and Serafeim (2019; the slide says only "
         "«Kotsantonis») list the problems: companies report in varied and inconsistent ways; benchmarking, the "
         "choice of peer group, is crucial in deciding a company's ranking; ESG data providers disagree a lot, "
         "more so as more information becomes public.</p>"
         "<p><b>Here.</b> The firm and its reports are unchanged. Only the peer group changed, yet the ranking "
         "flipped. Against chemicals firms it looked bad; against packaging firms it looks good. That is the "
         "benchmarking problem.</p>"
         "<p><b>The mix-up.</b> Rater disagreement and inconsistent reporting are real problems too, but each needs "
         "something to change: more information or different reporting. Here neither did.</p>"
         "<p><b>Remember:</b> an ESG ranking is relative, so whoever chooses the peers shapes the result.</p>",
)

statisk(
    "rep-s21", tema="rapportering", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what lecture 7 says about how reliable ESG ratings are.",
        "Kotsantonis and Serafeim list inconsistent company reporting, the weight of benchmarking and large "
        "disagreement between providers. They also say how that disagreement moves when more information becomes "
        "public.",
        "<p><b>Step 1: statement I.</b> Does more public information give raters less or more to interpret "
        "differently?</p>"
        "<p><b>Step 2: statement II.</b> Does it match the tone of the quotes on ratings in the lecture?</p><p><b>Step 3: combine</b> your two verdicts.</p>",
    ),
    q="<p>Two statements about ESG ratings:</p>"
      "<p>I. Disagreement among ESG data providers shrinks as firms publish more information.<br>"
      "II. A critique quoted in lecture 7 calls the ratings too subjective and says the industry overpromises and "
      "underdelivers.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I",
          "Statement I is false: disagreement increases with the quantity of public information. Statement II "
          "holds."),
        R("Only II"),
        F("Both I and II",
          "Statement I reverses the finding: more public information brings more disagreement, not less."),
        F("Neither I nor II",
          "Statement II holds: the critique in the lecture says exactly this."),
    ],
    kort="<p><b>Only II.</b> Disagreement among providers increases with more public information (Kotsantonis and "
         "Serafeim 2019). The critique in the lecture does call the ratings too subjective.</p>",
    full="<p><b>Statement I is the classic trap.</b> It sounds logical that more information brings ratings "
         "together. Kotsantonis and Serafeim (2019) find the opposite: disagreement among data providers increases "
         "with the quantity of publicly available information. More data gives raters more to weigh, select and "
         "interpret in their own way.</p>"
         "<p><b>Statement II</b> matches a critique quoted in the lecture: the size of the ESG market is confusing, "
         "the ratings are too subjective and the industry overpromises and underdelivers. The same quotes call for "
         "mandatory regulation of material ESG disclosures.</p>"
         "<p><b>Why it matters.</b> If two providers rate the same firm very differently, an investor who relies on "
         "one rating gets a noisy signal. This is also why lecture 8 counts ESG ratings among the limits of ESG "
         "tools.</p>"
         "<p><b>Remember:</b> more disclosure means more rater disagreement, not less.</p>",
)

# ---------------------------------------------------------------------------
# PwC: tillit, strategi, mål, styring og klimarisiko
# ---------------------------------------------------------------------------

statisk(
    "rep-s22", tema="rapportering", type="fakta",
    hjelp=hjelp3(
        "This is about the trust gap PwC described and what in the new EU rules is meant to close it.",
        "Investors distrust claims that each firm words in its own way and that nobody has checked. Ask which two "
        "features of CSRD reporting would make a claim harder to fake.",
        "<p><b>Step 1: why would an investor distrust a claim?</b> Who wrote it, in what format and who checked it?</p>"
        "<p><b>Step 2: which features of CSRD answer each of those worries?</b></p>",
    ),
    q="<p>PwC's Global Investor Survey found that a large majority of investors think corporate reporting contains unsupported sustainability claims. According to the PwC guest lecture, what is meant to close this trust "
      "gap?</p>",
    alternativer=[
        R("Mandatory reporting under common standards, checked by an outside auditor"),
        F("Longer voluntary reports with more case stories, photos and quotes",
          "More voluntary content of the same kind is what investors already distrust. Nothing in it is "
          "checked."),
        F("Replacing company data with scores bought from ESG raters",
          "Ratings rest on company data and disagree with each other. PwC did not present them as the fix."),
        F("Removing all sustainability claims from the management report",
          "CSRD puts more sustainability information into the management report, not less."),
    ],
    kort="<p><b>Mandatory, assured reporting.</b> CSRD replaces self-chosen claims with reporting under common "
         "mandatory standards that an auditor checks, which is what the trust gap calls for.</p>",
    full="<p><b>The trust gap.</b> PwC opened with a striking number: 94% of investors in its Global Investor Survey "
         "2023 think corporate reporting contains unsupported sustainability claims, in other words greenwashing. "
         "Claims written in each firm's own format and checked by nobody are easy to make and hard to trust.</p>"
         "<p><b>The answer.</b> CSRD makes sustainability reporting mandatory for firms in scope, sets a common "
         "structure under ESRS and adds assurance: an auditor attests the sustainability statement. One of PwC's "
         "speakers came from assurance. The slides showed which audit firms assured the first Norwegian CSRD "
         "reporters.</p>"
         "<p><b>The link to lecture 7.</b> This is the same diagnosis as the greenwashing review (purely voluntary "
         "reporting invites greenwashing) and the HBR remedy (reports mandated and audited by an empowered "
         "referee).</p>"
         "<p><b>Remember:</b> trust comes from mandatory standards plus an independent check.</p>",
)

statisk(
    "rep-s23", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about where PwC thinks sustainability belongs in a company's strategy work.",
        "PwC says the work must run all the way from strategy to reporting. It treats reporting, strategy and "
        "transformation as equally important.",
        "<p><b>Step 1: where does the firm put its high focus?</b> On the core business.</p>"
        "<p><b>Step 2: where does the separate sustainability strategy sit</b> compared with that focus?</p>"
        "<p><b>Step 3: what change would move sustainability to where the focus is?</b></p>",
    ),
    q="<p>A retail chain has a core business strategy set by its executive team. Beside it runs a separate "
      "sustainability strategy, owned by a small team with its own targets and little say over the core business. "
      "What would the PwC guest lecture recommend?</p>",
    alternativer=[
        R("Build sustainability into the core strategy, not beside it"),
        F("Keep the tracks apart, so the sustainability team stays independent",
          "PwC argued against sustainability as something separate beside the strategy. Independence is not the "
          "goal."),
        F("Drop the strategy work and put all effort into compliant CSRD reports",
          "PwC's message was «it's really not about the reporting». Reporting alone does not steer the business."),
        F("Give the sustainability team more staff but keep its targets separate",
          "More staff on a side track leaves the core business untouched. The problem is the separation itself."),
    ],
    kort="<p><b>Build it into the core strategy.</b> PwC argued that sustainability should be part of the strategy "
         "for the core business, not a separate strategy beside it.</p>",
    full="<p><b>PwC's view.</b> «It's really not about the reporting.» PwC treats three approaches as equally "
         "important: reporting and compliance, strategy and transformation. The work must run all the way from "
         "strategy to reporting. Their slide contrasted two set-ups. In one, a separate sustainability strategy sits "
         "beside the core business strategy. In the other, there is one sustainable strategy for the core business.</p>"
         "<p><b>Here.</b> The chain has the first set-up. The core business gets the high focus, while "
         "sustainability sits on a side track with its own targets and little power. PwC would merge them, so that "
         "sustainability shapes the decisions that matter.</p>"
         "<p><b>The traps.</b> More staff or more independence keeps the side track. Putting all effort into "
         "reporting misses PwC's point that reporting is only one of three equally important approaches.</p>"
         "<p><b>Remember:</b> sustainability belongs in the core strategy, not next to it.</p>",
)

statisk(
    "rep-s24", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about what PwC says a credible sustainability target needs.",
        "Stakeholders want specific goals and actions, not «we have a focus on sustainability». A target can only "
        "be checked if progress can be measured from a known starting point to a stated end point.",
        "<p><b>Step 1: from where?</b> Does the statement say what the reduction is measured from?</p>"
        "<p><b>Step 2: to where?</b> Does it say where emissions should end up and by when?</p>"
        "<p><b>Step 3: what is missing</b> to make the promise checkable?</p>",
    ),
    q="<p>A ferry operator's sustainability report says: «We are committed to significantly reducing our emissions "
      "over time.» Using PwC's point that «fluffy» targets no longer stand, what is missing?</p>",
    alternativer=[
        R("A base year and a long-term target state to measure against"),
        F("The names of the board members who approved the commitment",
          "Approval says who stands behind the target. It does not make the target measurable."),
        F("An ESG rating confirming that the commitment is credible",
          "A rating does not turn a vague promise into a measurable target."),
        F("A statement that its emissions are within the norm for the industry",
          "That is the kind of vague line CSRD replaces. It sets no target at all."),
    ],
    kort="<p><b>A base year and a long-term target state.</b> Without a starting point and an end point, "
         "«significantly over time» cannot be measured, which is what PwC means by a fluffy target.</p>",
    full="<p><b>Fluffy targets.</b> PwC said that stakeholders, from regulators and banks to employees and "
         "consumers, now expect more than «we have a focus on sustainability». They want specific goals and "
         "actions. A target that can be checked needs a base year (the point progress is measured from) and a "
         "long-term target state (the point it should reach).</p>"
         "<p><b>Here.</b> «Significantly» and «over time» name neither. Nobody can say in five years whether the "
         "operator has kept its promise. A base year and a stated emission level for a target year would make it "
         "checkable. CSRD has also made the requirements for a climate transition plan more explicit.</p>"
         "<p><b>The traps.</b> Board approval and ratings add authority but not measurability. «Within the industry "
         "norm» is exactly the kind of vague line CSRD replaces.</p>"
         "<p><b>Remember:</b> a target without a base year and an end state is fluff.</p>",
)

statisk(
    "rep-s25", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about PwC's ladder for using ESG data, from looking back to looking ahead.",
        "PwC's ladder has three levels: one answers «what has happened?», one «what happens right now?» and one "
        "«what will happen?». They run from regulatory compliance through operational decisions to strategic "
        "decisions.",
        "<p><b>Step 1: which way does the firm look?</b> Back at last year, at the present or years ahead?</p>"
        "<p><b>Step 2: what is the data used for?</b> Compliance, operational decisions or strategic decisions such as the product range?</p>",
    ),
    q="<p>A food company simulates how replacing palm oil across its product range would affect costs, emissions and "
      "margins over the next five years. It uses the results to decide which products to keep. On PwC's ladder "
      "from reporting to steering, which level is this?</p>",
    alternativer=[
        R("Steering: data used to decide what will happen"),
        F("Reporting: data on what has happened, for compliance",
          "Reporting looks back and serves regulatory requirements. This firm is looking ahead to choose "
          "products."),
        F("Monitoring: data on what is happening right now",
          "Monitoring tracks the present, such as incidents or target against actual. The simulation looks years "
          "ahead."),
        F("Assurance: data checked by an auditor for accuracy",
          "Assurance checks reported figures. It is not a level of use on PwC's ladder."),
    ],
    kort="<p><b>Steering.</b> Simulating how a product change affects future costs, emissions and margins, then "
         "choosing products from the results, is using data to decide what will happen.</p>",
    full="<p><b>The ladder.</b> «You can't manage what you don't measure» (the slide credits Peter Drucker). PwC "
         "showed three levels of ESG data use. Reporting answers what has happened: regular external reporting "
         "where auditability is crucial. Monitoring answers what happens right now: continuous internal reporting, "
         "tracking incidents or target against actual. Steering answers what will happen: ESG built into "
         "operational and strategic decisions, such as portfolio simulations or a re-evaluation of the product "
         "range. Added value rises as you move up.</p>"
         "<p><b>Here.</b> The food company simulates the future and uses the results to choose its products. That "
         "is steering, at the strategic end.</p>"
         "<p><b>The mix-up.</b> Every level uses the same data. What separates them is the question asked of the "
         "data and the decision it serves.</p>"
         "<p><b>Remember:</b> reporting looks back, monitoring looks at now, steering looks ahead.</p>",
)

statisk(
    "rep-s26", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about when sustainability reporting creates value for the firm itself, according to a PwC survey.",
        "PwC's survey found a clear correlation between two things: how valuable firms find the reporting process "
        "and what they use it for. PwC summed it up as «integration is key».",
        "<p><b>Step 1: what differs between the two firms?</b> Not the report, which is equally complete.</p>"
        "<p><b>Step 2: link that difference</b> to what the survey says goes with seeing the process as valuable.</p>",
    ),
    q="<p>Two firms publish equally complete sustainability reports. Firm X files its report and moves on. Firm Y "
      "feeds the same data into its procurement and investment decisions. What does PwC's Global Sustainability "
      "Reporting Survey suggest about the two?</p>",
    alternativer=[
        R("Firm Y is more likely to find the reporting process valuable"),
        F("Both get the same value, since their reports are equally complete",
          "The survey links value to how the data are used, not to how complete the report is."),
        F("Firm X is more likely to find it valuable, since it sticks to compliance",
          "The survey links value to using the reporting process in other business operations. Keeping it to "
          "compliance points the other way."),
        F("Neither gains, since reporting is a pure compliance cost",
          "The survey finds that the reporting process provides value for companies, so «pure cost» is too "
          "strong."),
    ],
    kort="<p><b>Firm Y.</b> The survey finds a clear correlation between firms that see reporting as highly "
         "valuable and firms that use it to inform other business operations.</p>",
    full="<p><b>The survey.</b> PwC's Global Sustainability Reporting Survey shows that the reporting process "
         "provides value for companies. But the value is not spread evenly. There is a clear correlation between "
         "companies that see the process as highly valuable and those that use it to inform other business "
         "operations. PwC's summary: integration is key.</p>"
         "<p><b>Here.</b> The two reports are equally complete. The difference is use. Firm X treats reporting as a "
         "filing. Firm Y feeds the data into procurement and investment, which is the integration the survey links "
         "to value.</p>"
         "<p><b>The link.</b> This is PwC's ladder in practice. Reporting what has happened is compliance, while "
         "using the same data in decisions moves the firm towards monitoring and steering, where the added value "
         "is higher.</p>"
         "<p><b>Remember:</b> the value of reporting comes from using the data, not from filing the report.</p>",
)

statisk(
    "rep-s27", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about PwC's message on physical climate risk and the myths it wanted to bust.",
        "PwC listed climate myths to bust, among them that the risk is ages away, that it will happen somewhere "
        "else and that the financial impact will be immaterial. It also described how fast physical impacts will "
        "deteriorate.",
        "<p><b>Step 1: the timing.</b> Is the risk in the future only, or already here?</p>"
        "<p><b>Step 2: the shape.</b> Does a straight line fit how PwC expects impacts to develop?</p>"
        "<p><b>Step 3: pick the option</b> that the CFO's view contradicts.</p>",
    ),
    q="<p>A CFO extrapolates the last decade's storm and flood losses in a straight line and concludes that physical "
      "climate risk is a 2050 issue for the firm. Which point from the PwC guest lecture does this conclusion "
      "contradict?</p>",
    alternativer=[
        R("Climate risk is already here and its impacts will worsen exponentially"),
        F("Physical risk depends mainly on the size of the firm's own carbon footprint",
          "PwC said the opposite: a firm's carbon footprint is irrelevant to its exposure to physical risk."),
        F("Losses will rise steadily in a straight line, so planning can wait",
          "This repeats the CFO's own reasoning. PwC rejected both the straight line and the waiting."),
        F("Physical impacts come through supply chains rather than asset values",
          "PwC said financial impacts hit both the balance sheet (assets) and the P&amp;L (supply "
          "chains)."),
    ],
    kort="<p><b>Climate risk is already here and its impacts will worsen exponentially.</b> PwC called it a today "
         "issue and expects physical and financial impacts to grow exponentially, not linearly.</p>",
    full="<p><b>PwC's message.</b> Climate change has already happened. Its impacts will be felt for decades, "
         "whatever the pace of decarbonisation. Global losses from natural disasters were estimated at USD 417 "
         "billion in 2024. The conditions for bigger events in more places are already in place: a today issue, "
         "not a 2050 issue. Deterioration in physical impacts will be exponential rather than linear. So will the "
         "financial impacts, which hit both the balance sheet (assets) and the P&amp;L (supply chains).</p>"
         "<p><b>Here.</b> The CFO makes two errors at once: a straight-line extrapolation and a distant date. PwC "
         "listed «it is ages away, I think I heard 2050» among the myths to bust.</p>"
         "<p><b>Also remember.</b> A small carbon footprint does not mean low exposure. Physical risk arrives "
         "through own operations, supply chains and customer markets.</p>"
         "<p><b>Remember:</b> physical climate risk is a today issue that grows exponentially.</p>",
)

statisk(
    "rep-s28", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about what PwC learned from the first CSRD reports about the materiality assessment.",
        "Under CSRD each firm decides which topics to report through its own double materiality assessment of "
        "impacts, risks and opportunities.",
        "<p><b>Step 1: if each firm assesses its own materiality,</b> would a bank and an energy firm end up with "
        "the same topics?</p>"
        "<p><b>Step 2: is a difference between sectors then a failure or the assessment at work?</b></p>",
    ),
    q="<p>PwC compared the first CSRD reports across sectors. Banks, energy firms and retailers ended up reporting "
      "quite different material topics. How did PwC read this?</p>",
    alternativer=[
        R("As a sign that the materiality assessment made reports fit their sector"),
        F("As a sign that firms applied ESRS inconsistently and need one fixed topic list",
          "A fixed topic list would undo what double materiality is for. PwC did not call for one."),
        F("As evidence that double materiality should give way to financial materiality alone",
          "PwC did not question double materiality. Different topics by sector do not argue against it."),
        F("As the result of voluntary reporters skipping parts of the standard",
          "Voluntary reports were a separate finding. Nothing ties them to the sector differences."),
    ],
    kort="<p><b>The assessment did its job.</b> PwC found a clear distinction between material topics across sectors "
         "and read it as the materiality assessment making reports relevant for their sector.</p>",
    full="<p><b>The finding.</b> PwC's review of the first 250 CSRD reports showed a clear distinction between "
         "material topics across sectors. The double materiality assessment had done its job: it made each report "
         "relevant for its sector instead of a one-size-fits-all checklist.</p>"
         "<p><b>Other lessons from the first years.</b> About 30% of the CSRD reports were voluntary, issued from "
         "countries that had not transposed the directive or had delayed it. Norwegian cost estimates (NOU "
         "2023:15) pointed to significant costs. Data quality was the practical weak spot.</p>"
         "<p><b>The traps.</b> Calling the differences inconsistency, or a reason to drop the impact lens, misreads "
         "what the assessment is for. Each firm reports what is material for its own business.</p>"
         "<p><b>Remember:</b> double materiality makes CSRD reports differ by sector. PwC saw that as a strength.</p>",
)

statisk(
    "rep-s29", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about PwC's four best-practice points for sustainability reporting.",
        "PwC's four points: consistent reporting from the start, the big picture, digital tools used wisely and "
        "multidisciplinary teams. Each one answers a typical mistake.",
        "<p><b>Step 1: what did the firm do first?</b> It collected data.</p>"
        "<p><b>Step 2: what should come before collecting data under CSRD?</b> Think of double materiality.</p>"
        "<p><b>Step 3: which point warns against that mistake?</b></p>",
    ),
    q="<p>A first-time CSRD reporter starts by collecting several hundred data points from every business unit, "
      "before it has decided which topics are material. Which of PwC's best-practice points does this ignore most "
      "directly?</p>",
    alternativer=[
        R("Remember the big picture and focus on the material matters"),
        F("Use digital tools critically and know their weaknesses",
          "The problem is not the tools but the order: data before materiality."),
        F("Keep financial and sustainability reporting consistent from the start",
          "Consistency between the two reports is a separate point. The error is collecting everything before "
          "knowing what matters."),
        F("Build multidisciplinary teams with a common language",
          "Team set-up is a separate point. The error here is the order of the work."),
    ],
    kort="<p><b>Remember the big picture.</b> PwC warned that companies dive straight into the details instead of "
         "focusing on the material matters. Under CSRD, materiality decides which data you need.</p>",
    full="<p><b>PwC's best practice.</b> Four points. Ensure consistent reporting: financial and sustainability "
         "reporting must be consistent from the start. Remember the big picture: companies tend to dive straight "
         "into the details and not focus on the material matters. Use digital tools wisely: be critical and aware "
         "of their weaknesses. Establish multidisciplinary teams: to ensure a common understanding and "
         "language.</p>"
         "<p><b>Here.</b> Collecting hundreds of data points before the materiality assessment is the textbook case "
         "of diving into details. Under CSRD the double materiality assessment comes first. It decides which "
         "topics the firm must cover. Those topics decide which data points it needs.</p>"
         "<p><b>Why it matters.</b> Data quality was the practical weak spot in the first years: unclear "
         "definitions, many contributors, manual spreadsheets. Collecting data that is not material adds to that "
         "burden. PwC closed with the reminder that a just transition is the common goal, not the sustainability "
         "statement in itself.</p>"
         "<p><b>Remember:</b> materiality first, data second.</p>",
)

statisk(
    "rep-s30", tema="rapportering", type="tolkning",
    hjelp=hjelp3(
        "This is about how PwC ranked the different approaches to sustainability work.",
        "PwC showed three approaches: reporting- and compliance-driven, strategy-driven and transformation-driven. "
        "Its headline was «it's really not about the reporting».",
        "<p><b>Step 1: how many approaches did PwC name?</b> Did it rank them?</p>"
        "<p><b>Step 2: how should they relate</b> to each other, in time and in substance?</p>"
        "<p><b>Step 3: compare</b> with a board that only reports.</p>",
    ),
    q="<p>A firm's board treats sustainability as a reporting exercise that the finance department runs once a year. "
      "What view did PwC present in its guest lecture?</p>",
    alternativer=[
        R("Reporting, strategy and transformation matter equally and must connect"),
        F("Reporting is the core of the work, so strategy and change can follow later",
          "PwC's line was «it's really not about the reporting». Reporting is one of three approaches, not the "
          "core."),
        F("Strategy matters most, so the reporting can be left to the auditors",
          "PwC did not put strategy above the other approaches. Reporting stays the firm's own job."),
        F("Transformation must be finished before any reporting starts",
          "PwC did not describe a sequence in which reporting waits for transformation."),
    ],
    kort="<p><b>The three approaches matter equally and must connect.</b> PwC treats reporting, strategy and "
         "transformation as equally important, with the work running all the way from strategy to "
         "reporting.</p>",
    full="<p><b>Three approaches.</b> PwC showed three approaches to sustainability: reporting- and "
         "compliance-driven, strategy-driven and transformation-driven, the last covering operations and "
         "innovation. Its slide called them «all equally important». A second slide made the same point: a holistic "
         "perspective on sustainability work, all the way from strategy to reporting.</p>"
         "<p><b>Here.</b> A board that treats sustainability as a yearly reporting exercise has only one of the "
         "three. PwC's headline, «it's really not about the reporting», is aimed at exactly this firm.</p>"
         "<p><b>The traps.</b> Each wrong answer ranks the approaches or puts them in a sequence. PwC did neither: "
         "they carry equal weight and must connect. The just transition, not the sustainability statement in "
         "itself, is the goal.</p>"
         "<p><b>Remember:</b> reporting, strategy and transformation are equally important and belong together.</p>",
)
