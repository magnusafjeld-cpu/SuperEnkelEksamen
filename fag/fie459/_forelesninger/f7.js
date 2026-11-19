/* FIE459 · Forelesning 7: Metrics and reporting (med PwC-gjesteforelesningen).
   Kilder: manualkapittel 7 (k7.html), foilene FIE459_H26_7 og PwC-foilene. */
window.EDU_DATA.forelesninger.push({
  nr: 7,
  kapittel: 7,
  tittel: "Metrics and reporting: who is the report for?",
  minutter: 13,
  krok: "94% of investors suspect greenwashing in corporate reports. Who is a sustainability report actually for?",
  steg: [
    { id: "f7-krok", type: "krok", tittel: "More reporting, more trust?",
      tekst: "<p>Companies publish more sustainability data than ever. Yet 94% of investors in PwC's Global Investor Survey 2023 think corporate reporting contains unsupported sustainability claims. And the more a company discloses, the <i>more</i> ESG raters disagree about it.</p><p>The lecture sorts the frameworks with one question: <b>who is the report for?</b></p>" },

    { id: "f7-gjett-gri-issb", type: "gjett",
      sporsmal: "<p>GRI and the ISSB both publish voluntary sustainability standards. What mainly separates them?</p>",
      alternativer: [
        "GRI takes an impact lens; ISSB takes a financial lens",
        "GRI is mandatory in the EU; ISSB is voluntary everywhere",
        "GRI covers only climate; ISSB covers all ESG topics",
        "GRI is written for investors; ISSB for all stakeholders",
      ],
      svar: 0,
      feil: [
        null,
        "Both are voluntary; the mandatory EU standards are the ESRS under CSRD.",
        "GRI has standards topic by topic, from emissions to people.",
        "This swaps the two readers around.",
      ],
      forklaring: "<p>GRI serves all stakeholders and asks how the firm affects the economy, environment and people: impact materiality. ISSB serves investors and asks how sustainability affects the firm's cash flows and risk: financial materiality.</p>" },

    { id: "f7-ide-linse", type: "ide", tittel: "One question sorts the frameworks",
      tekst: "<p>Reader is an <b>investor</b>: the framework asks how sustainability hits the firm's cash flows and risk. That is financial materiality, outside-in: <b>SASB, ISSB and TCFD</b>.</p><p>Reader is <b>every stakeholder</b>: it asks how the firm affects people and planet. That is impact materiality, inside-out: <b>GRI</b>, with standards topic by topic such as GRI 305 Emissions.</p><p>The EU's <b>CSRD</b> asks for both at once: double materiality.</p>" },

    { id: "f7-sorter-linse", type: "sorter", tittel: "Which lens?",
      tekst: "<p>Place each report by the lens it uses.</p>",
      grupper: ["Financial materiality", "Impact materiality", "Double materiality"],
      kort: [
        { t: "Climate risks in the annual financial filings (TCFD)", g: 0 },
        { t: "Investor-focused standards aligned with TCFD (ISSB)", g: 0 },
        { t: "A topic standard on the firm's emissions (GRI 305)", g: 1 },
        { t: "ESRS reporting on impacts, risks and opportunities (CSRD)", g: 2 },
        { t: "Disclosure judged by what matters to investors (SASB)", g: 0 },
      ],
      forklaring: "<p>TCFD, ISSB and SASB are written for investors. GRI asks how the firm affects the world. CSRD's ESRS combine both through IROs: impacts on the world plus risks and opportunities for the firm.</p>" },

    { id: "f7-gjett-ir", type: "gjett",
      sporsmal: "<p>Integrated Reporting (&lt;IR&gt;) shows in one report how a firm creates value with six capitals. Firm X has ESG pages in its annual report; firm Y a stand-alone ESG report. Who gains from switching to &lt;IR&gt;?</p>",
      alternativer: [
        "Only firm X, with ESG pages in its annual report",
        "Only firm Y, with the stand-alone ESG report",
        "Both, since &lt;IR&gt; beats every other format",
        "Neither, since &lt;IR&gt; adds nothing to any format",
      ],
      svar: 0,
      feil: [
        null,
        "Repackaging a stand-alone report is found to add nothing.",
        "One of the two firms gains nothing by switching.",
        "The evidence does find formats that &lt;IR&gt; beats.",
      ],
      forklaring: "<p>&lt;IR&gt; beats no ESG reporting and ESG pages in the annual report, but switching from a stand-alone ESG report brings no benefit: a dedicated report already puts the information in front of users.</p>" },

    { id: "f7-avdekk-kapitaler", type: "avdekk", tittel: "The six capitals of &lt;IR&gt;",
      tekst: "<p>Firms usually report on two capitals, financial and manufactured. &lt;IR&gt; widens the view to six.</p>",
      rader: [
        { t: "Financial", d: "Funds available to the firm: debt, equity, grants, retained earnings." },
        { t: "Manufactured", d: "Physical objects used in production: buildings, equipment, infrastructure." },
        { t: "Intellectual", d: "Knowledge-based intangibles: patents, copyrights, software, systems, procedures." },
        { t: "Human", d: "People's competencies, capabilities, experience and motivation to innovate." },
        { t: "Social and relationship", d: "Relationships within and between communities and stakeholders." },
        { t: "Natural", d: "Renewable and non-renewable environmental resources and processes." },
      ] },

    { id: "f7-avdekk-tcfd", type: "avdekk", tittel: "TCFD: four pillars of climate disclosure",
      tekst: "<p>The Task Force on Climate-related Financial Disclosures (2017; the slides spell it “TFCD”) wants climate information in the annual financial filings. CDP, aligned with TCFD, also covers cities, states and regions.</p>",
      rader: [
        { t: "Governance", d: "How the board oversees climate-related risks and opportunities. Management's role." },
        { t: "Strategy", d: "Impacts on the business, strategy and financial planning over the short, medium and long term. Resilience under climate scenarios, including 2°C or lower." },
        { t: "Risk management", d: "How climate risks are identified, assessed and managed within overall risk management." },
        { t: "Metrics and targets", d: "Scope 1, Scope 2 and, if appropriate, Scope 3 emissions. Targets and performance against them." },
      ] },

    { id: "f7-gjett-taksonomi", type: "gjett",
      sporsmal: "<p>The EU Taxonomy defines which activities count as environmentally sustainable. An electric-bus factory contributes substantially to climate change mitigation and harms none of the other five objectives. But it breaches the UN Guiding Principles on Business and Human Rights. Is it taxonomy-aligned?</p>",
      alternativer: [
        "Yes: a substantial contribution to one objective is enough",
        "No: it fails the minimum safeguards on human rights",
        "No: it must contribute to all six objectives",
        "Yes: human rights belong under CSRD, not the Taxonomy",
      ],
      svar: 1,
      feil: [
        "A contribution is only the first of three tests.",
        null,
        "One substantial contribution is enough if the rest suffer no significant harm.",
        "The Taxonomy has its own social test, separate from CSRD.",
      ],
      forklaring: "<p>Alignment needs all three tests. The factory passes the first two but fails the minimum safeguards: the OECD Guidelines and the UN Guiding Principles.</p>" },

    { id: "f7-ide-taksonomi", type: "ide", tittel: "Three tests, all required",
      tekst: "<p>Taxonomy-aligned means passing all three, measured by technical screening criteria. The aim includes protecting investors from greenwashing.</p><ul><li><b>Substantial contribution</b> to at least one of six objectives: climate change mitigation, climate change adaptation, water and marine resources, circular economy, pollution prevention and control, biodiversity and ecosystems.</li><li><b>Do no significant harm</b> (DNSH) to the other five.</li><li><b>Minimum safeguards</b> (OECD Guidelines, UN Guiding Principles).</li></ul>",
      husk: "One strong contribution cannot buy off significant harm elsewhere." },

    { id: "f7-sant-ett-mal", type: "sant",
      pastand: "<p>A flood-defence project contributes substantially to climate change adaptation but to none of the other five objectives. If it harms none of them significantly and meets the minimum safeguards, it is taxonomy-aligned.</p>",
      svar: true,
      forklaring: "<p>The first test asks for a substantial contribution to <b>at least one</b> objective, not to all six. The other five only need to suffer no significant harm.</p>" },

    { id: "f7-ide-csrd", type: "ide", tittel: "CSRD and ESRS",
      tekst: "<p>The <b>CSRD</b> (about 50,000 companies) replaced the NFRD (about 12,000). Companies report under the <b>ESRS</b>, based on double materiality and on their <b>IROs</b>: impacts, risks and opportunities. The report gets a set structure: general disclosures (ESRS 2), environmental, social and governance standards, plus the Taxonomy disclosures. Vague lines about not polluting more than the industry norm no longer pass. Investors' version, the SFDR, comes in lecture 8.</p>" },

    { id: "f7-sant-omnibus", type: "sant",
      pastand: "<p>The Omnibus package of 26 February 2025 widens CSRD, because listed small and medium-sized companies are added in a later wave.</p>",
      svar: false,
      forklaring: "<p>It narrows CSRD. Listed SMEs were wave 3 in the pre-Omnibus plan. From financial year 2027 the scope is at least 1,000 employees and net turnover above EUR 450m. The Commission estimates that 80% of the companies previously covered fall outside.</p>" },

    { id: "f7-gjett-frivillig", type: "gjett",
      sporsmal: "<p>A review of greenwashing research asks which reporting regime best prevents greenwashing. What does it propose?</p>",
      alternativer: [
        "Keep reporting voluntary so firms compete on trust",
        "A combination of voluntary and mandatory reporting elements",
        "Mandatory rules only, with voluntary reports dropped",
        "Let ESG rating agencies police the claims",
      ],
      svar: 1,
      feil: [
        "A purely voluntary approach is found to facilitate greenwashing.",
        null,
        "The review keeps a role for voluntary reporting.",
        "The review looks to reporting rules, not to raters.",
      ],
      forklaring: "<p>An entirely voluntary CSR approach facilitates greenwashing, so the review proposes a mix. The HBR article “Overselling Sustainability Reporting” also rejects a purely voluntary regime: <b>measure less, better</b>, with reports mandated and audited by an empowered referee.</p>" },

    { id: "f7-gjett-benchmark", type: "gjett",
      sporsmal: "<p>Two data providers rate the same bank from the same report. One ranks it among the leaders, the other near the bottom. According to Kotsantonis and Serafeim (2019), what can largely explain the gap?</p>",
      alternativer: [
        "Each provider benchmarks the bank against different peers",
        "The bank disclosed too little for the ratings to agree",
        "One provider erred, since ratings of one report converge",
        "The bank's report used an impact lens, not a financial one",
      ],
      svar: 0,
      feil: [
        null,
        "Disagreement grows with more public information, not with less.",
        "Large disagreement among providers is the norm, not an error.",
        "Both read the same report, so its lens cannot explain a gap.",
      ],
      forklaring: "<p><b>Benchmarking</b>, the choice of peers, largely decides a company's ranking. The same facts can land at the top of one peer group and near the bottom of another.</p>" },

    { id: "f7-felle-rating", type: "felle", tittel: "More disclosure does not make ratings agree",
      tekst: "<p>It sounds logical that more public information brings ESG ratings closer together. Kotsantonis and Serafeim (2019) find the opposite: disagreement <b>increases</b> with the quantity of public information, since raters have more to interpret differently. Critics call the ratings too subjective. Open-data initiatives such as OS-Climate and the Terravera Foundation are among the new developments.</p>" },

    { id: "f7-sant-pwc-tilnaerming", type: "sant",
      pastand: "<p>PwC treats reporting- and compliance-driven sustainability work as just as important as strategy-driven and transformation-driven work.</p>",
      svar: true,
      forklaring: "<p>PwC calls the three approaches “all equally important”. The work must run all the way from strategy to reporting, because reporting alone is not the goal: “It's really not about the reporting.”</p>" },

    { id: "f7-ide-pwc", type: "ide", tittel: "PwC: put sustainability in the strategy",
      tekst: "<p>Mandatory, assured CSRD reporting is meant to close the <b>trust gap</b> behind the 94%. Sustainability belongs in the <b>core strategy</b>, not in a separate strategy beside it. “Fluffy” targets no longer stand: a target needs a <b>base year</b> and a <b>long-term target state</b>. CSRD also makes the requirements for a climate transition plan more explicit.</p>" },

    { id: "f7-avdekk-stige", type: "avdekk", tittel: "You can't manage what you don't measure",
      tekst: "<p>PwC's ladder for ESG data (the slide credits the title to Peter Drucker).</p>",
      rader: [
        { t: "Reporting", d: "What has happened? Backward-looking, for regulatory compliance." },
        { t: "Monitoring", d: "What happens right now? Data for operational decisions." },
        { t: "Steering", d: "What will happen? Forward-looking data for strategic decisions." },
        { t: "The payoff", d: "Firms that find reporting most valuable tend to be those that use it to inform other business operations." },
      ] },

    { id: "f7-sant-fotavtrykk", type: "sant",
      pastand: "<p>A bank with a small carbon footprint of its own has, for that reason, little exposure to physical climate risk.</p>",
      svar: false,
      forklaring: "<p>PwC: a firm's carbon footprint is irrelevant to its exposure. Physical risk arrives through own operations, supply chains and customer markets. It is a today issue, not a 2050 one: natural-disaster losses were estimated at USD 417 billion in 2024.</p>" },

    { id: "f7-ide-forste-ar", type: "ide", tittel: "First years of CSRD",
      tekst: "<p>Material topics differ across sectors: the materiality assessment made reports relevant for their sector. Data quality is the weak spot: unclear definitions, fragmented systems, manual spreadsheets. PwC's advice: keep financial and sustainability reporting consistent, focus on material matters and build multidisciplinary teams. The goal is a just transition, not the statement itself.</p>" },
  ],
  kunne: [
    "Sort a reporting framework by its reader and lens: GRI (impact), SASB, ISSB and TCFD (financial), CSRD (double).",
    "Name the six capitals of Integrated Reporting and explain what the evidence says about switching to &lt;IR&gt; from each starting point.",
    "Name the four TCFD pillars and place a disclosure in the right one.",
    "Apply the three EU Taxonomy tests to a case and explain why one strong contribution cannot offset significant harm.",
    "Explain how CSRD replaced NFRD and how the Omnibus package narrows its scope.",
    "Explain why ESG ratings disagree and why more public information does not make them converge.",
    "Explain why PwC ties reporting to strategy and why a low carbon footprint does not mean low physical climate risk.",
  ],
});
