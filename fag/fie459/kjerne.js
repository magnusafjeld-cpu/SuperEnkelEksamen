/* ===================== FIE459 · KJERNEPENSUM =====================
   Det viktigste i faget på én kveld: en kort gjennomgang av det som kommer på
   eksamen, organisert etter eksamensblokkene og ikke etter kapitlene. Hver del
   har raske sjekker (flervalg med forklaring) og en kort minicase i
   eksamensformat. Teksten er en nedkorting av manualen, ikke nytt stoff.

   id-ene (kjN, kjN-sM, kjN-m1) er lagringsnøkler. De må aldri endres; en del
   eller et spørsmål som skrives om, får ny id (fallgruve 7s).

   BYGGET FIL — ikke rediger her. Delene ligger i _kjerne/kjN.js, og settes
   sammen med: python3 tools/bygg-kjerne.py fie459
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.kjerne = [];

/* kj0 · The exam on one page */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "The exam on one page",
  chapters: [0],
  html: `
<p class="lead-in">FIE459 is graded on a closed-book exam (70%) and a group report (30%). This page sets out what the exam looks like, how its true/false statements are built and where each exam theme is covered in the core parts.</p>

<h3>The format</h3>
<ul>
<li>3-hour digital school exam, <b>closed book</b>, 16 December 2026.</li>
<li><b>Multiple-choice and true/false</b> questions, answered in English.</li>
<li>There are no past exams, so nobody knows the exact mix. Nothing in the course material says a wrong answer costs points; this app scores without negative marking.</li>
</ul>

<h3>What the lecturer asks for</h3>
<p>Jiaying Li puts the focus on «economic intuition, not calculation» and warns: «Memorizing definitions is not the best strategy!» Read for the mechanism (such as why a polluting market makes too much) and for the line between two concepts that sound alike. For every concept, ask what it is most easily confused with and what separates the two.</p>

<h3>How a true/false statement is built</h3>
<p>A false statement is usually correct except for one element:</p>
<ul>
<li><b>Swapped concepts:</b> the wrong side of a distinction, such as outside-in for inside-out or action for measurement.</li>
<li><b>A lost condition:</b> «a stakeholder focus creates shareholder value» where the course says it «can help firms create shareholder value».</li>
<li><b>The wrong direction:</b> a price too high where it is too low.</li>
<li><b>Absolute words:</b> «always», «never» or «only» where the course says «can».</li>
</ul>

<h3>The core parts</h3>
<table>
<tr><th>Part</th><th>What it covers</th></tr>
<tr><td>kj1</td><td>CSR, SRI and ESG; value versus values; finance as usual to SF 3.0</td></tr>
<tr><td>kj2</td><td>Ethical theories, externalities and integrated value</td></tr>
<tr><td>kj3</td><td>Shareholder versus stakeholder view; governance, voice and exit</td></tr>
<tr><td>kj4</td><td>Business models, materiality, reporting and ESG ratings</td></tr>
<tr><td>kj5</td><td>Investment strategies, ESG integration and asset prices</td></tr>
<tr><td>kj6</td><td>Bonds, banks and insurers</td></tr>
</table>
<p>The manual's chapter on governments and the transition (k13) is left out until its lecture has been held.</p>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>A true/false statement is false if any one part of it is false: read every clause.</li>
<li>Look for the swapped concept, the dropped condition, the reversed direction and the absolute word.</li>
<li>«Always», «never» and «only» make a statement suspect; «can» usually makes it true.</li>
<li>In multiple choice, each wrong option is usually one familiar confusion: name the distinction being tested before you read the options.</li>
<li>The exam rewards mechanisms and distinctions, not recalled definitions or numbers.</li></ul></div>
`,
  checks: [
    {
      id: "kj0-s1",
      q: "A true/false statement has three clauses. Two match the course exactly; the third says «always» where the course says «can». How should you mark it?",
      options: [
        "True, because most of the statement matches the course",
        "True, because «always» and «can» describe the same tendency",
        "False only if the «always» clause is the main claim of the statement",
        "False, because one wrong clause makes the whole statement false",
      ],
      answer: 3,
      explanation: "A statement is true only if every part of it is true, so one overstated clause is enough to make it false. The tempting reading is that a statement that is mostly right is right; true/false items on this course are built exactly that way, correct except for one element.",
    },
    {
      id: "kj0-s2",
      q: "The lecturer stresses «economic intuition, not calculation» and says memorising definitions is not the best strategy. Which way of preparing fits best?",
      options: [
        "For each concept, learn what it is most easily confused with and what separates the two",
        "Learn the definitions word for word, since a closed-book exam rewards those who recall them exactly",
        "Practise the carbon-charge and NPV calculations until you can do them quickly",
        "Memorise the numbers in each table, since true/false items are built on them",
      ],
      answer: 0,
      explanation: "The exam tests distinctions and mechanisms, so knowing what separates a concept from its nearest neighbour is what answers both formats. Word-for-word definitions are exactly what the lecturer warns against. Closed book does not change that: the questions ask you to apply a concept, not recite it.",
    },
  ],
});

/* kj1 · What sustainable finance is */
window.EDU_DATA.kjerne.push({
  id: "kj1",
  num: 1,
  title: "What sustainable finance is",
  chapters: [1],
  html: `
<div class="callout kort"><span class="h">In short</span>Sustainable finance uses the tools of ordinary finance but counts social and environmental effects too and looks further ahead. Firms act (CSR), investors act (SRI) and ESG scores try to measure the results. Investors want ESG for two different reasons: because it affects risk and return (value) or because they care about something besides return (values). Schoenmaker and Schramade's ladder, from finance as usual to SF 3.0, sorts objectives by what they maximise.</div>

<p class="lead-in">The lecture expects you to place a short case in the right box: CSR, SRI or ESG; value or values; SF 1.0, 2.0 or 3.0. Each box sits next to one it is easily confused with, which is exactly what a true/false statement tests.</p>

<h3>What sustainable finance is</h3>
<p>Schoenmaker &amp; Schramade (2019): sustainable finance «looks at how Finance (investing and lending) interacts with economic, social, and environmental issues». The European Commission stresses the process: taking environmental, social and governance (ESG) considerations into account in investment decisions, leading to more long-term investment in sustainable activities. The logic of finance stays; what changes is what counts as value and how long the horizon is. Sustainable finance aims at stakeholder welfare rather than shareholder value alone and sometimes accepts less diversification for good reasons, such as avoiding «sin stocks». No free lunch still holds: meet any claim that ESG is a free source of extra return with suspicion.</p>

<h3>CSR, SRI and ESG</h3>
<p>Starks (2023) notes there is no clear consensus on what these acronyms mean. The lecture fixes their relation in a chain.</p>
<div class="callout mech"><span class="h">From sustainability to measurement</span>Sustainability requires that the interests of the firm's stakeholders are taken care of → <b>stakeholder management</b> → put into practice through <b>CSR</b> (corporate social responsibility, the firm's side) and <b>SRI</b> (socially responsible investing, the investor's side) → the outcomes, stakeholder welfare, are what <b>ESG metrics</b> try to measure. CSR and SRI are actions; ESG is measurement. Most empirical difficulties arise at the measurement step, where raters can score the same firm very differently (kj4).</div>

<h3>Value versus values</h3>
<p>Starks (2023) argues that most confusion about ESG comes from mixing two motives:</p>
<ul>
<li><b>Value:</b> ESG matters because it is financially material. It sheds light on risks (such as reputation, litigation, regulatory and climate risk) and return opportunities. Value investors use it in stock selection and engage management to lower risk or raise returns.</li>
<li><b>Values:</b> nonpecuniary preferences. The investor will not finance or profit from objectionable products or conduct, or wants to back firms that reflect their own values.</li>
</ul>
<p>Many investors hold both. Giglio et al. (2025) asked roughly 30,000 Vanguard clients for their main motive: 48% saw no reason at all to invest in ESG, 24% named ethical considerations, 22% climate hedging and 6% return expectations. On average they expected ESG investments to <i>underperform</i> by around 2% a year. Demand is driven far more by values than by expected value.</p>
<div class="callout mech"><span class="h">Why «does ESG pay?» has no single answer</span>Studies of ESG funds lump together funds with different objectives. A values fund may knowingly give up return; a value fund aims to earn more. The average describes neither, so performance cannot be judged until the motives are separated. The same split explains why ESG ratings can disappoint: most are designed for value investors and assess business processes and risk management, while values investors care about outcomes for the environment and communities.</div>

<h3>From finance as usual to SF 3.0</h3>
<p>Schoenmaker &amp; Schramade classify finance by how it ranks financial (F), social (S) and environmental (E) value.</p>
<table>
<tr><th>Typology</th><th>Value created</th><th>Objective</th><th>Horizon</th></tr>
<tr><td>Finance as usual</td><td>Shareholder value</td><td>Max F</td><td>Short term</td></tr>
<tr><td>SF 1.0</td><td>Refined shareholder value</td><td>Max F subject to S and E</td><td>Short term</td></tr>
<tr><td>SF 2.0</td><td>Stakeholder value (triple bottom line)</td><td>Optimise integrated value I = F + S + E</td><td>Medium term</td></tr>
<tr><td>SF 3.0</td><td>Common good value</td><td>Optimise S and E subject to F</td><td>Long term</td></tr>
</table>
<p>Read it as a shift in the objective. <b>SF 1.0</b> still maximises F; S and E enter only as constraints, such as excluding the worst offenders. <b>SF 2.0</b> counts a unit of S or E like a unit of F, so a less profitable project can win if it creates more S and E. <b>SF 3.0</b> reverses the ranking: it optimises S and E, subject to earning enough F. Later in the course, exclusionary screening maps to SF 1.0, ESG integration to SF 2.0 and impact investing to SF 3.0.</p>

<div class="callout warn"><span class="h">Where the points go</span><ul>
<li><b>ESG is not something you do.</b> A firm cutting emissions does CSR; a fund excluding coal does SRI; a rating agency's score of either is ESG.</li>
<li><b>ESG investing does not imply sacrificing return.</b> Only part of Starks's spectrum accepts lower returns. A value investor uses ESG to improve risk and return.</li>
<li><b>Negative screening is not proof of values.</b> It is the main tool of values investors, but value investors can use it too.</li>
<li><b>SF 1.0 is still profit maximisation</b>, only with constraints. SF 3.0 still requires enough F.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>CSR (the firm's side) and SRI (the investor's side) are actions; ESG metrics measure the outcomes. Most empirical problems arise at the measurement step.</li>
<li>Starks (2023): value investors use ESG because it is financially material; values investors have nonpecuniary preferences. Many hold both.</li>
<li>The average ESG fund cannot show whether ESG pays: it mixes funds that knowingly give up return with funds that aim to earn more.</li>
<li>Schoenmaker and Schramade: finance as usual maximises F; SF 1.0 maximises F subject to S and E; SF 2.0 optimises I = F + S + E; SF 3.0 optimises S and E subject to F.</li>
<li>Giglio et al. (2025): 48% of about 30,000 Vanguard clients see no reason to invest in ESG; on average they expect ESG to underperform by about 2% a year.</li></ul></div>
`,
  checks: [
    {
      id: "kj1-s1",
      q: "Which statement about CSR, SRI and ESG matches the lecture's concept chain?",
      options: [
        "ESG is the investor-side counterpart of the firm's CSR",
        "SRI measures the stakeholder outcomes that CSR produces",
        "CSR and SRI are actions; ESG metrics try to measure the outcomes",
        "ESG is the broad action of which CSR and SRI are the firm-level and investor-level measures",
      ],
      answer: 2,
      explanation: "CSR (firms) and SRI (investors) are the two ways stakeholder management is put into practice, while ESG metrics try to measure the resulting stakeholder welfare. Calling ESG the investor-side counterpart confuses it with SRI: the investor's action is SRI, while ESG is measurement.",
    },
    {
      id: "kj1-s2",
      q: "Starks (2023) argues that comparing the average ESG fund with the market cannot settle whether ESG pays. Why?",
      options: [
        "ESG ratings disagree, so studies classify different funds as ESG funds",
        "Values investors never accept lower returns, so the average overstates performance",
        "ESG funds charge higher fees, which hide the true effect of ESG on returns",
        "The average mixes funds that knowingly give up return with funds that aim to earn more",
      ],
      answer: 3,
      explanation: "Funds with values motives may accept lower returns, while value funds use ESG to earn more, so an average over both describes neither. Rating disagreement is a real problem, but it is a measurement problem, not the reason Starks gives; and values investors are precisely the group that may accept lower returns.",
    },
    {
      id: "kj1-s3",
      q: "A foundation's mandate: fund the projects with the largest environmental benefit, provided each one earns at least its cost of capital. Where does this sit in Schoenmaker and Schramade's framework?",
      options: [
        "SF 2.0, because F, S and E all enter the decision",
        "SF 1.0, because the financial floor is a constraint on the choice",
        "SF 3.0, because it optimises E subject to earning enough F",
        "Finance as usual, because it still requires a return on capital",
      ],
      answer: 2,
      explanation: "The foundation maximises environmental value and treats financial return as a floor, which is SF 3.0: optimise S and E subject to F. SF 1.0 is the mirror image, maximising F with S and E as constraints; SF 2.0 would add F, S and E with equal weight rather than rank E first.",
    },
  ],
  case: {
    id: "kj1-m1",
    topic: "Two funds, one brewery",
    minutes: 8,
    body: `<p>Fjordlys Capital runs two equity funds. <b>Fund One</b> overweights firms with strong water management. Its analysts expect such firms to face lower costs and less regulatory risk. The fund aims to beat the market. Its managers take no view on whether its holdings are good for society. <b>Fund Two</b> was set up for a church foundation. It maximises return but holds no alcohol or gambling stocks. The foundation has said it will accept a somewhat lower return for that.</p>
<p>A brewery in Fund One's portfolio has sharply cut its water use per litre. A data vendor has since raised the brewery's environmental score.</p>`,
    ledd: [
      {
        id: "kj1-m1a",
        points: 3,
        q: `<p>In Starks's (2023) terms, which motives drive the two funds?</p>`,
        options: [
          "Both are values funds, since both let something other than price decide what they hold",
          "Fund One is driven by value, Fund Two by values",
          "Fund One is driven by values, Fund Two by value",
          "Both are value funds, since both use ESG information to select stocks",
        ],
        answer: 1,
        solution: `<p>Fund One uses water management because it expects lower costs and risk and takes no view on social good: a <b>value</b> motive, ESG as financially material information. Fund Two excludes stocks that conflict with its client's beliefs and accepts a lower return for it: a <b>values</b> motive, a nonpecuniary preference.</p>`,
        traps: [
          "Treats any use of ESG in stock selection as a values motive, although Fund One uses it only for risk and return.",
          null,
          "Swaps the two motives: the return-seeking fund is the value fund.",
          "Treats negative screening as a value tool here, although Fund Two screens for its client's beliefs and accepts a lower return.",
        ],
      },
      {
        id: "kj1-m1b",
        points: 3,
        q: `<p>In the lecture's concept chain (CSR, SRI, ESG), which element of the case is ESG?</p>`,
        options: [
          "The data vendor's environmental score of the brewery",
          "The brewery's cut in water use per litre",
          "Fund Two's exclusion of alcohol and gambling stocks",
          "Fund One's decision to overweight firms with strong water management",
        ],
        answer: 0,
        solution: `<p>In the chain, CSR and SRI are actions and <b>ESG metrics measure the outcomes</b>. The vendor's score is the only measurement in the case. The brewery's water cut is CSR; both funds' portfolio choices are investor actions on the SRI side.</p>`,
        traps: [
          null,
          "Calls the firm's own action ESG; a firm cutting its water use does CSR.",
          "Calls an investor's exclusion ESG; screening is an investor action on the SRI side.",
          "Takes an investment decision that uses ESG information for ESG itself; the decision is an investor action, not the measurement.",
        ],
      },
      {
        id: "kj1-m1c",
        points: 2,
        q: `<p>True or false? Because the foundation accepts a lower return, Fund Two's objective belongs in SF 3.0 in Schoenmaker and Schramade's framework.</p>`,
        options: ["True", "False"],
        answer: 1,
        solution: `<p>False. Fund Two still maximises return and treats the exclusions as a constraint: max F subject to S and E, which is <b>SF 1.0</b>. Accepting a lower return describes the client's motive (values), not what the fund optimises. SF 3.0 would optimise S and E, subject only to earning enough F.</p>`,
        traps: [
          "Treats willingness to accept a lower return as if it made social and environmental value the objective.",
          null,
        ],
      },
    ],
  },
});

/* kj2 · Ethics and externalities */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Ethics and externalities",
  chapters: [2, 3],
  html: `
<div class="callout kort"><span class="h">In short</span>Ethics first: some theories judge an act by its consequences, others by the principle behind it, so one act can pass one test and fail the other. Then externalities: when a cost lands on someone outside the deal, the price leaves it out and the market makes too much. Internalisation makes the polluter pay; firms dodge it by relocating, greenwashing or lobbying. Integrated value, I = F + S + E, is what a firm would be worth if every externality were charged to it.</div>

<p class="lead-in">The ethics half asks you to name the theory, stage or tactic behind a quoted argument. The externality half tests directions: which way price and quantity are wrong, who bears the cost and why internalisation stalls. Both are built from distinctions that make natural true/false statements.</p>

<h3>Ethics: outcomes, principles and how people decide</h3>
<p><b>Normative</b> ethical theories say what is right. The first split is <b>ethical absolutism</b> (eternal, universal principles) versus <b>ethical relativism</b> (morality depends on context). Absolutist theories split again by what they judge:</p>
<table>
<tr><th>Type</th><th>Theory</th><th>Judges an act by</th></tr>
<tr><td>Consequentialist</td><td>Ethical egoism</td><td>Its outcome for one's own interests</td></tr>
<tr><td>Consequentialist</td><td>Utilitarianism</td><td>The best total outcome for all affected (act or rule)</td></tr>
<tr><td>Non-consequentialist</td><td>Ethics of duty</td><td>Kant's categorical imperative: act only on principles that could become universal law</td></tr>
<tr><td>Non-consequentialist</td><td>Rights and justice</td><td>Universal rules of justice; respect for human dignity</td></tr>
</table>
<p>Under relativism the lecture groups four contemporary theories: virtue ethics (character), ethics of care (relationships), discourse ethics (honest, open argument) and postmodern ethics (moral impulse, specific to context).</p>
<div class="callout mech"><span class="h">One act, two verdicts</span>A utilitarian judges Tesla's 2020 factory reopening against state orders by adding up benefits (output, jobs) and the harms the orders were meant to prevent. A Kantian asks whether the rule «a firm may ignore orders it disagrees with» could hold for every firm. It could not, so the act is wrong whatever the outcome.</div>
<p><b>Descriptive</b> theories explain how people actually decide. In the course's four-stage model (Crane et al. 2019, based on Rest 1986 and Jones 1991), a person must recognise the moral issue, make a moral judgement, establish moral intent and engage in moral behaviour. Individual and situational factors act on every stage; a person can fail at any link. <b>Individual</b> factors include cognitive moral development (Kohlberg), locus of control, personal values and integrity. <b>Situational</b> factors are issue-related (moral intensity, moral framing) or context-related (such as rewards, authority and organisational culture). <b>Rationalisation tactics</b> redescribe an act so it no longer looks wrong: denial of responsibility, denial of injury («no one actually lost money»), denial of victim («they knew the risks»), social weighting, appeal to higher loyalties and the metaphor of the ledger.</p>
<p>Bénabou and Tirole (2010) give three economic views of CSR: <b>win-win</b> (CSR pays for itself), <b>delegated philanthropy</b> (the firm acts on its stakeholders' values) and <b>insider-initiated philanthropy</b> (managers spend other people's money on their own values, an agency problem; kj3).</p>

<h3>Externalities: why the market makes too much</h3>
<p>An <b>externality</b> is a positive or negative effect on agents who are not involved in producing or consuming the product. The price leaves it out, a market failure: resources are allocated at a level that is not socially optimal.</p>
<table>
<tr><th></th><th>Negative</th><th>Positive</th></tr>
<tr><td>Production</td><td>Pollution</td><td>R&amp;D</td></tr>
<tr><td>Consumption</td><td>Smoking</td><td>Vaccines</td></tr>
</table>
<div class="callout mech"><span class="h">Why the free market overproduces</span>With a negative production externality, the marginal societal cost (MSC) lies above supply, the marginal production cost (MPC). The market settles where demand meets MPC (Q<sub>e</sub>, P<sub>e</sub>); the social optimum is where demand meets MSC (Q<sub>so</sub>, P<sub>so</sub>). The producer prices only its own cost, so the good is too cheap (P<sub>e</sub> &lt; P<sub>so</sub>) and buyers take too much (Q<sub>e</sub> &gt; Q<sub>so</sub>). Root cause: waste and the use of natural, social and human capital are not physically embodied in the product, so its price leaves them out.</div>

<h3>Internalisation and why it stalls</h3>
<p><b>Internalisation</b> brings external costs or benefits into the decisions and prices of the parties involved, so that those responsible bear them. Government (taxes, quotas, subsidies), media, investors, corporates and consumers can all push it. It is a spectrum, from an unrecognised externality through voluntary initiatives and taxes or fines to a legislative ban (Unerman, Bebbington &amp; O'Dwyer 2018). Three limitations hold it back:</p>
<table>
<tr><th>Limitation</th><th>Mechanism</th><th>Evidence</th></tr>
<tr><td>Territoriality of jurisdiction</td><td>Firms shift production to regions with weaker regulation</td><td>Production and GHG emissions moved to other states after California's 2013 cap-and-trade (Bartram, Hou &amp; Kim 2022)</td></tr>
<tr><td>Information asymmetry: greenwashing</td><td>Outsiders cannot verify how green a firm is</td><td>Public firms sell polluting assets to less monitored private firms (Duchin, Gao &amp; Xu 2024)</td></tr>
<tr><td>Political frictions</td><td>Policy uncertainty and lobbying</td><td>Average firm: USD 277k a year on anti-climate, USD 185k on pro-climate lobbying (Leippold, Sautner &amp; Yu 2024)</td></tr>
</table>

<h3>Integrated value and stranded assets</h3>
<p>Schoenmaker &amp; Schramade measure a process by its <b>integrated value</b>, I = F + S + E, where external costs enter S and E as negative numbers. Optimising I is the SF 2.0 objective (kj1).</p>
<div class="worked"><span class="wh">Example: from financial value to integrated value</span>
<p>Original process: F 15, S −3, E −3, so I = 15 − 3 − 3 = 9. Optimised process: F 14, S −1, E −1, so I = 12. Switching lowers financial value by 1 and raises integrated value by 3.</p></div>
<div class="callout mech"><span class="h">Why a firm would give up financial value</span>Read I as what the firm would be worth if every externality were charged to it. Once government, employees or the public make it pay, the old process becomes obsolete and its assets become <b>stranded assets</b>. Internalising early protects against that.</div>
<p>In the Air France-KLM case, a carbon charge (carbon price × emissions) of about EUR 3.3 billion at EUR 100 per tonne is 2.3 times 2017 EBIT. The more the airline passes on through fares, the smaller the EBIT hit.</p>

<div class="callout warn"><span class="h">Where the points go</span><ul>
<li><b>Egoism is consequentialist;</b> it differs from utilitarianism only in whose outcomes count. Kant judges the principle, not the outcome.</li>
<li><b>Moral intensity and moral framing are situational</b> (issue-related), not individual factors.</li>
<li><b>Negative production externality: price too low, quantity too high,</b> because someone else pays part of the cost.</li>
<li><b>An externality falls outside the transaction.</b> A cost borne by the firm or its own customers is not one.</li>
<li><b>A greener firm is not a greener planet.</b> Selling or relocating a polluting plant moves emissions rather than cutting them.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Egoism and utilitarianism judge outcomes; the ethics of duty (Kant) and theories of rights and justice judge the principle. One act can pass one test and fail the other.</li>
<li>Rest/Jones: recognise, judge, intend, act; each stage can fail. Moral intensity and framing are situational, not individual, factors.</li>
<li>With a negative production externality, the free market's price is too low and its quantity too high compared with the social optimum.</li>
<li>Internalisation stalls through territoriality (relocation), greenwashing and political frictions (lobbying).</li>
<li>Integrated value I = F + S + E: giving up F to raise I protects against stranded assets once externalities are charged to the firm.</li></ul></div>
`,
  checks: [
    {
      id: "kj2-s1",
      q: "A board member argues: «We must disclose the defect even if disclosure costs us more than it saves anyone, because we could not want every firm to hide its defects.» Which normative theory is she using?",
      options: [
        "Utilitarianism, because she weighs the effect of disclosure on everyone it touches, including the firm",
        "Ethics of duty, because she asks whether the rule could hold as universal law",
        "Ethical egoism, because disclosure protects the firm's own reputation",
        "Virtue ethics, because honesty is a trait of good character",
      ],
      answer: 1,
      explanation: "Asking whether every firm could follow the rule is Kant's categorical imperative. She also sets aside costs and benefits explicitly. That is what rules out utilitarianism: she says disclosure is right even if the outcome is worse, so she is not adding up welfare.",
    },
    {
      id: "kj2-s2",
      q: "Which of these is a negative consumption externality?",
      options: [
        "Smoke from a cement plant harming nearby residents",
        "Vaccinated people protecting those who are not vaccinated",
        "A firm's research that rivals copy without paying for it",
        "Exhaust from people's cars harming pedestrians",
      ],
      answer: 3,
      explanation: "The harm comes from using a product (driving) and falls on people outside the transaction, so it is negative and on the consumption side, like the lecture's smoking example. The cement plant is the tempting answer, but its smoke comes from making the product: a negative production externality.",
    },
    {
      id: "kj2-s3",
      q: "A firm switches to a cleaner process that lowers its financial value F but raises its integrated value I = F + S + E. Which reasoning from the course supports the switch?",
      options: [
        "Once the externality is charged to the firm, the old process becomes obsolete and a stranded asset",
        "External costs are already in the product's price, so cutting them raises the firm's revenue",
        "Integrated value is what shareholders are paid, so it should come before F",
        "Markets price S and E fully, so the switch raises the share price at once",
      ],
      answer: 0,
      explanation: "Integrated value shows what the firm would be worth if its externalities were charged to it; when government, employees or the public make it pay, the old process loses value. The claim that external costs are already in the price gets the root cause backwards: they are left out of the price because they are not embodied in the product.",
    },
  ],
  case: {
    id: "kj2-m1",
    topic: "A fertiliser plant and a fjord",
    minutes: 8,
    body: `<p>Brattli Fertiliser ASA, a listed producer, runs a plant whose discharges pollute a fjord. Local salmon farmers, who neither buy from nor sell to Brattli, lose fish as a result. The government has proposed a tax on the discharges. The industry association Brattli belongs to has spent heavily on lobbying against the tax.</p>
<p>Brattli's board is comparing two processes, in the same value units: the current one (F 30, S −5, E −10) and a cleaner one (F 26, S −2, E −3). The board expects the tax to be adopted within a few years.</p>`,
    ledd: [
      {
        id: "kj2-m1a",
        points: 3,
        q: `<p>Which limitation of internalisation does the industry association's spending illustrate?</p>`,
        options: [
          "Territoriality of jurisdiction",
          "Political frictions",
          "Information asymmetry (greenwashing)",
          "Moral muteness",
        ],
        answer: 1,
        solution: `<p>Lobbying against the tax is a <b>political friction</b>: policy uncertainty and lobbying slow down internalisation, as in Leippold, Sautner &amp; Yu (2024). Nothing in the case moves production to a weaker regime or misleads outsiders about how green Brattli is.</p>`,
        traps: [
          "Confuses lobbying with relocation; territoriality is about shifting production to regions with weaker rules.",
          null,
          "Confuses lobbying with greenwashing, which is about outsiders being unable to verify how green a firm is.",
          "Takes an ethics concept (managers avoiding moral language) for a limitation of internalisation.",
        ],
      },
      {
        id: "kj2-m1b",
        points: 3,
        q: `<p>Which reasoning fits the integrated value approach?</p>`,
        options: [
          "Keep the current process until the tax is actually adopted, since its financial value is 4 higher today",
          "Switch: integrated value rises from 15 to 21 while the current plant risks becoming a stranded asset",
          "Switch, since the cleaner process also has the higher financial value",
          "Keep the current process: its integrated value is 45, against 31 for the cleaner one",
        ],
        answer: 1,
        solution: `<p>Integrated value I = F + S + E is 30 − 5 − 10 = 15 for the current process and 26 − 2 − 3 = 21 for the cleaner one. Switching gives up 4 of F but gains 6 of I. With the tax expected, the current process is likely to become obsolete and its assets <b>stranded</b>, so internalising early protects value.</p>`,
        traps: [
          "Ranks the processes on F alone, which is finance as usual and ignores the coming charge.",
          null,
          "Misreads the numbers: the cleaner process has the lower F (26 against 30).",
          "Adds the external costs as if they were positive values instead of subtracting them.",
        ],
      },
      {
        id: "kj2-m1c",
        points: 2,
        q: `<p>True or false? When Brattli's CEO says «The fjord recovers within a few years, so no one is really harmed», he is using the rationalisation tactic called denial of the victim.</p>`,
        options: ["True", "False"],
        answer: 1,
        solution: `<p>False. Claiming that no real harm is done is <b>denial of injury</b>. Denial of the victim does not deny the harm; it says the harmed party accepted the risk, as in «they knew the risks when they signed».</p>`,
        traps: [
          "Confuses denial of injury (no real harm) with denial of the victim (the harmed party accepted the risk).",
          null,
        ],
      },
    ],
  },
});

/* kj3 · Shareholders, stakeholders and keeping managers in check */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Shareholders, stakeholders and keeping managers in check",
  chapters: [4, 5],
  html: `
<div class="callout kort"><span class="h">In short</span>A company is owned by shareholders but run by managers. Whose interests should the firm serve: the owners' profits, everyone the firm affects or the owners' wider wishes? And how do owners make managers do their job? One idea ties the two together: the broader and vaguer the goal you give managers, the harder it is to check whether they met it.</div>

<p class="lead-in">Lecture 4 sets Friedman against stakeholder theory and offers Hart and Zingales's way out; lecture 5 turns the same tension into the agency problem. Good true/false material: who made which critique, when Friedman's argument holds and whether a case is adverse selection or moral hazard.</p>

<h3>Shareholder versus stakeholder</h3>
<p><b>Friedman (1970)</b>: the social responsibility of business is to increase its profits. Managers maximise shareholder value "while conforming to the basic rules of the society", both law and ethical custom. <b>Stakeholder theory</b> (Freeman) holds the firm responsible also to employees, creditors, customers, suppliers, the community and the environment. In 2019 about 200 CEOs signed the <b>Business Roundtable</b> statement that a corporation's purpose is to serve all its stakeholders.</p>
<p>The critics attack accountability:</p>
<table>
<tr><th>Critic</th><th>Argument</th></tr>
<tr><td>Jensen (2002)</td><td>Managers get to design their own objective function; replacing a measurable goal with a less measurable one can raise agency costs</td></tr>
<tr><td>Mehrotra &amp; Morck (2017)</td><td>Shareholder value is a "bright line"; stakeholder welfare is an "ill-defined charge"</td></tr>
<tr><td>Bebchuk &amp; Tallarita (2020)</td><td>No answer to which groups count, the trade-offs or how to aggregate them, so management is insulated from shareholders</td></tr>
<tr><td>Harvard Law School Forum</td><td>Under Delaware law directors owe a fiduciary duty to shareholders, so the statement is legally incorrect; the business judgement rule makes it unnecessary</td></tr>
</table>

<div class="callout mech"><span class="h">Why a vaguer objective raises agency costs</span>An objective disciplines a manager only if some outcome can show it was missed, as the share price can for shareholder value. "Serve all stakeholders", with no list and no weights, can justify almost any decision: a lower dividend helps employees, a lower wage helps shareholders. When every choice is defensible, nobody is accountable.</div>

<h3>Hart and Zingales: shareholder welfare, not market value</h3>
<p>Hart &amp; Zingales (2017) keep shareholders as the principal but refuse to equate their <i>welfare</i> with market <i>value</i>: shareholders care about money but not only about money. Friedman's reply is <b>separation</b>: firms make money while shareholders and governments deal with externalities. That works when the social activity is <b>separable</b> from money-making, as with charity. It fails when profit and damage are <b>non-separable</b> (tied together by the firm's technology, so shareholders cannot undo the damage themselves) and government does not internalise the damage.</p>

<div class="worked"><span class="wh">Example: the clean-or-dirty vote</span><p>Clean gives profit 100 and no damage. Dirty gives profit 150 and damage of 60 to others, a social surplus of 90. A market-value maximiser picks dirty; society is better off with clean. A shareholder who puts weight λ on the damage votes clean if 100 &gt; 150 − 60λ, that is if λ &gt; 5/6.</p></div>

<p>Without a vote, public firms suffer <b>amoral drift</b>: a small shareholder is almost never pivotal in a tender offer, so he feels no responsibility and sells to a bidder who will make a clean firm dirty. The remedy is a shareholder <b>vote on the broad outlines of corporate policy</b>; they also prefer invest and engage to divestment. <b>Edmans (2020)</b> contrasts pie-splitting, where stakeholders gain only at shareholders' expense, with pie-growing, where firms deliver both purpose and profit.</p>

<h3>Keeping managers in check</h3>
<p>Governance problems come from the <b>separation of ownership and control</b>. The owner (principal) delegates to a manager (agent) who knows more, acts after the contract is set and is costly to monitor. <b>Agency costs</b> are what owners incur to keep the agent acting in their interest. <b>Adverse selection</b> is hidden information before the contract (the lemons problem). <b>Moral hazard</b> is hidden action after it (debt overhang, asset substitution). Governance practices include board monitoring (CEO not also chair), stock-based pay, shareholder rights (no dual-class shares) and whistleblowing procedures.</p>
<p>Shareholders act directly through <b>voice</b> (voting and engagement) or <b>exit</b> (selling).</p>

<div class="callout mech"><span class="h">Why exit works even when nobody sells</span>A manager who destroys value knows shareholders will sell and the falling price will hurt him, so the threat disciplines him ex ante. Exit works through the price, not through the sale itself. A passive investor who cannot sell keeps only voice.</div>

<p>Each step along the SF typology (kj1) widens the objective and weakens accountability. Under SF 1.0, several objectives at once are hard to measure and control; SF 2.0 must balance all stakeholders and adds subjectivity that can raise agency costs. Finance as usual leans on the efficient markets hypothesis (Fama 1970), where carbon risk is already priced; under the adaptive markets hypothesis (Lo 2017) a new risk may not yet be.</p>
<p>The lecture is sceptical of ESG-linked executive pay: the correlation between ESG pay and ESG performance is weak and not causal. Targets tend to be short-term, vague ("improving sustainability") and opaque. Starbucks moved sustainability from the annual bonus into a three-year modifier on equity awards, the longer horizon Schoenmaker and Schramade ask for.</p>

<div class="callout warn"><span class="h">Confusions that cost points</span><ul>
<li>Hart and Zingales are not stakeholder theorists. They widen what shareholders want; for separable activities such as charity they agree with Friedman.</li>
<li>Timing decides adverse selection versus moral hazard: a riskier project chosen after the loan is moral hazard.</li>
<li>ESG-linked pay has not been shown to improve ESG performance.</li>
<li>A stakeholder <i>focus</i> can create shareholder value; stakeholder value as the <i>objective</i> can raise agency costs.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span><ul>
<li>Friedman: maximise profit within law and ethical custom. Stakeholder theory: serve all stakeholders, which critics such as Jensen and Bebchuk &amp; Tallarita say leaves managers unaccountable.</li>
<li>Hart &amp; Zingales maximise shareholder welfare, not market value. Friedman's separation holds for separable activities such as charity and fails for non-separable damage that government does not internalise.</li>
<li>Adverse selection is hidden information before the contract; moral hazard is hidden action after it.</li>
<li>Voice is voting and engagement. Exit is selling; its threat disciplines managers ex ante through the share price.</li>
<li>ESG-linked pay shows only a weak, non-causal link to ESG performance; its targets are often short-term, vague and opaque.</li>
</ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "In which situation do Hart and Zingales accept Friedman's argument that firms should simply maximise profit and leave social goals to shareholders?",
      options: [
        "When the damage is tied to the firm's technology, so shareholders cannot undo it themselves",
        "When the social activity, such as charity, is separable from how the firm makes money",
        "Whenever shareholders are prosocial, since they can then donate the profit themselves",
        "Never, since they replace shareholder value with the value of all stakeholders",
      ],
      answer: 1,
      explanation: "With a separable activity such as charity, paying out the profit for shareholders to donate is as good as the firm donating, so Friedman's separation works. Damage tied to the firm's technology is the non-separable case where it fails. Hart and Zingales keep shareholders as the principal, so they are not stakeholder theorists.",
    },
    {
      id: "kj3-s2",
      q: "After a bank grants a loan, the borrowing firm shifts the money into a much riskier project, keeping the upside while the bank bears most of the downside. What is this?",
      options: [
        "Adverse selection, because the firm knows more than the bank",
        "The lemons problem, because the bank cannot tell good borrowers from bad",
        "Debt overhang, because the bank captures most of the gain",
        "Moral hazard, because the hidden action comes after the contract",
      ],
      answer: 3,
      explanation: "Moral hazard is hidden action after the contract; this switch is asset substitution. Information is asymmetric here too, which tempts the adverse selection answer, but adverse selection is hidden information before the contract. Debt overhang is passing up good projects, not taking riskier ones.",
    },
    {
      id: "kj3-s3",
      q: "A board ties part of the CEO's annual bonus to \"improving sustainability\", judged by the board. What does the course say about this kind of pay?",
      options: [
        "It is a strong tool, since ESG-linked pay has been shown to cause better ESG performance",
        "It lengthens the CEO's horizon, since sustainability is a long-term goal",
        "It breaches directors' fiduciary duty to shareholders under Delaware law",
        "It has the flaws the lecture flags: a vague, discretionary and short-term target",
      ],
      answer: 3,
      explanation: "The lecture's concerns are short-term tactical targets, vague discretionary measures and low transparency. The link between ESG pay and ESG performance is weak and not causal. An annual bonus is short-term pay whatever it rewards; Starbucks fixed this by moving sustainability into a three-year modifier on equity awards. The Delaware argument belongs to the critique of the stakeholder statement, not to pay.",
    },
  ],
  case: {
    id: "kj3-m1",
    topic: "Shareholder welfare, stakeholder accountability and exit at a mining company",
    minutes: 8,
    body: `<p>Brekke Minerals ASA is a listed mining company with thousands of small shareholders. Management plans to switch to a cheaper method of disposing of mine waste in a nearby fjord. The switch raises profit but harms local fishermen and the fjord. Current regulation neither prevents nor taxes it. Shareholders cannot undo the damage on their own.</p>
<p>The CEO defends the plan: "We serve all our stakeholders: employees, customers, the local community and owners. Management will balance their interests." A group of shareholders proposes a shareholder vote on whether to adopt the new method, arguing that many owners would accept a lower profit to keep the fjord clean. An active fund that owns 3% threatens to sell its shares if the switch goes ahead. An index fund that tracks an index containing Brekke owns 4%.</p>`,
    ledd: [
      {
        id: "kj3-m1a",
        points: 3,
        q: `<p>Which view of the firm's objective does the shareholder group's proposal express?</p>`,
        options: [
          "Friedman's view: maximise profit and let owners deal with the fjord privately",
          "Stakeholder theory, since the fishermen's interests are to be balanced with the owners'",
          "Edmans's pie-growing, since cleaning up will raise profit as well",
          "Hart and Zingales: maximise shareholder welfare, with a vote on broad policy",
        ],
        answer: 3,
        solution: `<p>The proposal keeps shareholders as the decision-makers and asks the firm to follow their preferences, including their concern for the fjord. That is Hart and Zingales's shareholder welfare. Their vote fits because the damage is non-separable and not internalised by regulation, so Friedman's separation fails.</p>`,
        traps: [
          "Misses that the damage is non-separable, so owners cannot handle it privately as Friedman's separation assumes.",
          "Mistakes Hart and Zingales for stakeholder theorists; the owners decide here, not management balancing groups.",
          "Applies pie-growing where the case states a trade-off: the clean method costs profit.",
          null,
        ],
      },
      {
        id: "kj3-m1b",
        points: 3,
        q: `<p>What is the main concern the course raises about the CEO's statement?</p>`,
        options: [
          "It breaks Norwegian law, which requires workers on the board of all listed firms",
          "With no list of who counts and no weights, managers become harder to hold to account",
          "It produces amoral drift, since small shareholders will tender their shares to a bidder",
          "It is adverse selection, since the CEO knew more than shareholders when he was hired",
        ],
        answer: 1,
        solution: `<p>This is the accountability critique of stakeholder theory (Jensen; Bebchuk &amp; Tallarita). A goal with no list of stakeholders and no weights cannot show that it was missed, so managers can justify their own choices and agency costs can rise.</p>`,
        traps: [
          "Invents a legal rule: codetermination gives workers board seats in larger firms; it does not forbid a stakeholder purpose.",
          null,
          "Borrows amoral drift, which is about tender offers in Hart and Zingales's model, not about a CEO's stated objective.",
          "Confuses the stakeholder critique with adverse selection, which concerns hidden information before a contract.",
        ],
      },
      {
        id: "kj3-m1c",
        points: 2,
        q: `<p>True or false? Unlike the active fund, the index fund cannot use the threat of exit to discipline Brekke's management, so its direct tools are voting and engagement.</p>`,
        options: ["True", "False"],
        answer: 0,
        solution: `<p>True. An index fund must hold the stocks in its index, so it cannot credibly threaten to sell. Exit disciplines through the expected fall in the share price, which only an investor free to sell can trigger. The index fund keeps voice: voting and engagement.</p>`,
        traps: [null, "Treats exit as open to any shareholder, missing that a fund tracking an index must hold Brekke."],
      },
    ],
  },
});

/* kj4 · Business models, materiality and reporting */
window.EDU_DATA.kjerne.push({
  id: "kj4",
  num: 4,
  title: "Business models, materiality and reporting",
  chapters: [6, 7],
  html: `
<div class="callout kort"><span class="h">In short</span>To judge how sustainability affects a company, first understand how it makes money. Then ask which sustainability issues matter: materiality. There are two lenses. Financial materiality asks how sustainability affects the firm. Impact materiality asks how the firm affects people and the planet. Reporting frameworks differ mainly in which lens they use and who the report is for. ESG ratings try to sum it all up in one score but disagree a lot.</div>

<p class="lead-in">Lecture 6 works through one company, Oatly, from business model to impact; lecture 7 and the PwC guest lecture ask who a report is for. The distinctions that suit true/false are financial versus impact materiality, which framework uses which lens, the three Taxonomy tests and why ESG ratings disagree.</p>

<h3>Can the cash flows last?</h3>
<p>The goal is to assess a company's ability to <b>sustainably generate free cash flows</b>. Start with the <b>business model</b>, how the firm creates, delivers and captures value (Osterwalder and Pigneur 2010), built from a customer value proposition, a profit formula and key resources and processes (Johnson et al. 2008). Then the <b>competitive position</b> (Porter 1985): can the firm keep those profits against rivals? Oatly had a strong brand and a head start in oat milk, then lost market share as competition grew fierce: a head start lasts only while switching costs, scale or access keep rivals out.</p>
<p>Much of what sustainability changes, such as brand trust, employee motivation and know-how, consists of <b>intangible resources</b> (e.g. human capital), which are not on the balance sheet. <b>Intangible assets</b> (e.g. goodwill) are, so the accounts alone miss the resources.</p>
<p>The value drivers are sales growth, margins, return on invested capital, the cost of capital and cash flow. DuPont splits ROE into net profit margin × asset turnover × financial leverage.</p>

<div class="worked"><span class="wh">Case: Oatly's ROE in 2022 (USD billion)</span><p>−0.4/0.7 × 0.7/1.2 × 1.2/0.8 = −57% × 0.58 × 1.5 = −50%. The middle term, 0.58, is <b>asset turnover</b>: sales per dollar of assets, with no profit in it. Return on assets is net profit / assets = −0.4/1.2 = −33%. With a negative margin, higher turnover and leverage make ROE <i>more</i> negative, so the margin is the root problem.</p></div>

<h3>Materiality: which issues count</h3>
<table>
<tr><th></th><th>Financial materiality</th><th>Impact materiality</th></tr>
<tr><td>Direction</td><td>Outside-in: how sustainability affects the firm</td><td>Inside-out: how the firm affects the economy, environment and people</td></tr>
<tr><td>Definition</td><td>SASB: "reasonably likely to be important to investors in making investment decisions"</td><td>GRI: affects the ability to create, preserve or erode value for the firm, its stakeholders and society</td></tr>
<tr><td>Reader</td><td>Investors</td><td>All stakeholders</td></tr>
<tr><td>Frameworks</td><td>SASB, ISSB, TCFD</td><td>GRI</td></tr>
</table>
<p><b>Double materiality</b> looks through both lenses: an issue can be material because it moves the firm's cash flows, because of the firm's effect on the world or both. Why bother? <b>Khan, Serafeim and Yoon (2016)</b> find that firms performing well on <i>material</i> sustainability issues outperform, while performance on <i>immaterial</i> issues does not matter. Materiality also moves (Rogers and Serafeim's pathways), so firms keep reviewing their assessments. A stakeholder impact map that shows the firm hurting a powerful stakeholder flags a likely candidate for internalisation (kj2) and so a candidate material issue.</p>
<p>The impact step scores a company's impact on three criteria: <b>material</b> (relevant to its value drivers), <b>intentional</b> (a deliberate part of strategy and purpose) and <b>transformational</b> (drives major change through its business model, technology, scale or standards).</p>

<h3>Reporting: who is the report for?</h3>
<div class="callout mech"><span class="h">One question sorts the frameworks</span>Ask who the reader is. If it is investors, the framework asks how sustainability affects the firm's cash flows and risk: financial materiality (SASB, ISSB, TCFD). If it is all stakeholders, it asks how the firm affects people and planet: impact materiality (GRI). The EU's CSRD requires both lenses at once.</div>
<p><b>TCFD</b> (2017) asks for climate disclosure in four pillars: governance, strategy, risk management plus metrics and targets (Scope 1, Scope 2 and, if appropriate, Scope 3).</p>
<p>In the EU, the <b>CSRD</b> (about 50,000 companies) replaced the NFRD (about 12,000). Companies report under the <b>ESRS</b>, based on double materiality and on their IROs: impacts, risks and opportunities. The <b>Omnibus</b> package (26 February 2025) narrows the scope from financial year 2027 to at least 1,000 employees and net turnover above EUR 450m; the Commission estimates that 80% of the companies previously covered fall outside. The <b>EU Taxonomy</b> defines which activities are environmentally sustainable. An activity is taxonomy-aligned only if it passes all three tests:</p>
<ol>
<li><b>Substantial contribution</b> to at least one of six environmental objectives.</li>
<li><b>Do no significant harm</b> (DNSH) to any of the other five.</li>
<li><b>Minimum safeguards:</b> the OECD Guidelines for Multinational Enterprises and the UN Guiding Principles on Business and Human Rights.</li>
</ol>

<h3>Ratings, greenwashing and the trust gap</h3>
<p>ESG data providers disagree a lot (Kotsantonis 2019). Companies report in inconsistent ways; the choice of peers (<b>benchmarking</b>) largely decides a firm's ranking. The disagreement <b>increases</b> with the quantity of public information, since raters have more to interpret differently. An entirely voluntary approach facilitates greenwashing; a combination of voluntary and mandatory elements is proposed to prevent it.</p>
<p>PwC's guest lecture adds three points. The trust gap: 94% of investors think corporate reporting contains unsupported sustainability claims (PwC Global Investor Survey 2023). Reporting pays only when it feeds strategy, as data move from reporting (what has happened?) through monitoring to steering (what will happen?). Climate risk is a today issue. A firm's carbon footprint is irrelevant to its exposure: physical risk arrives through own operations, supply chains and customer markets.</p>

<div class="callout warn"><span class="h">Confusions that cost points</span><ul>
<li>Asset turnover (sales / assets) is not a return and does not measure profitability.</li>
<li>Financial materiality is outside-in (SASB, ISSB, TCFD); impact materiality is inside-out (GRI). Swapping the directions is the classic trap.</li>
<li>"Good ESG pays" is too broad: only performance on material issues is linked to outperformance.</li>
<li>The Taxonomy needs a contribution to at least one objective, not all six, plus no significant harm to any other.</li>
<li>More disclosure does not make ESG ratings converge. Purely voluntary reporting facilitates greenwashing.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span><ul>
<li>Financial materiality (SASB, ISSB, TCFD) asks how sustainability affects the firm; impact materiality (GRI) asks how the firm affects people and planet; CSRD under ESRS requires both, which is double materiality.</li>
<li>Firms that perform well on material sustainability issues outperform, while performance on immaterial issues does not matter (Khan, Serafeim and Yoon 2016).</li>
<li>An activity is taxonomy-aligned only with a substantial contribution to at least one of six objectives, no significant harm to the other five and minimum safeguards.</li>
<li>ESG ratings disagree, the disagreement grows with more public information and benchmarking largely decides a firm's ranking.</li>
<li>Intangible assets such as goodwill are on the balance sheet; intangible resources such as human capital are not. In DuPont, sales / assets is asset turnover, not a return.</li>
</ul></div>
`,
  checks: [
    {
      id: "kj4-s1",
      q: "Two rating agencies give the same company very different ESG scores. The company then doubles the sustainability information it publishes. What does the evidence in the course lead you to expect?",
      options: [
        "The scores converge, since both raters now work from the same data",
        "No change, since ESG ratings are driven by emissions alone",
        "The disagreement may grow, since there is more to interpret differently",
        "Both scores rise, since raters reward firms that publish more information",
      ],
      answer: 2,
      explanation: "Kotsantonis (2019) finds that disagreement between ESG data providers increases with the quantity of publicly available information: more data gives raters more to weigh and interpret differently. The convergence answer is the intuitive trap. Benchmarking choices also drive rankings, so ratings rest on far more than emissions.",
    },
    {
      id: "kj4-s2",
      q: "A firm improves sharply on several sustainability issues that are immaterial for its industry. What do Khan, Serafeim and Yoon (2016) suggest about its future stock performance?",
      options: [
        "No outperformance should be expected from these improvements",
        "Outperformance, since any ESG improvement lowers risk",
        "Underperformance, since spending on immaterial issues destroys value",
        "Outperformance, as long as the firm reports the improvements under CSRD",
      ],
      answer: 0,
      explanation: "Only performance on material sustainability issues is linked to outperformance; performance on immaterial issues does not matter. That is \"does not matter\", not \"destroys value\", so the underperformance answer overstates the finding. Materiality can change over time, which is why firms review their assessments.",
    },
    {
      id: "kj4-s3",
      q: "Which pairing of framework and materiality lens is correct?",
      options: [
        "GRI: financial materiality, written for investors",
        "ISSB: impact materiality, written for all stakeholders",
        "TCFD: impact materiality, since it covers the firm's effect on the climate",
        "CSRD under ESRS: double materiality, covering impacts, risks and opportunities",
      ],
      answer: 3,
      explanation: "CSRD requires reporting under ESRS based on double materiality and on impacts, risks and opportunities (IROs). GRI is the impact lens for all stakeholders, while ISSB and TCFD are investor-focused and use financial materiality. TCFD asks how climate risks and opportunities affect the firm, not how the firm affects the climate.",
    },
  ],
  case: {
    id: "kj4-m1",
    topic: "Materiality, ratings and physical risk at a clothing company",
    minutes: 8,
    body: `<p>Kvernes Tekstil ASA is a listed clothing company with 4,000 employees and annual net turnover of EUR 900m, reporting under the CSRD. It outsources all production, so its own greenhouse gas emissions are low. Its draft materiality assessment lists two issues:</p>
<p>(i) Repeated droughts in the regions where its cotton is grown are raising input costs and squeezing its gross margin.</p>
<p>(ii) Wastewater from dye houses in its supply chain pollutes rivers that local communities depend on. The cost falls on the communities; nothing suggests it will affect Kvernes's own cash flows.</p>
<p>Two ESG rating agencies cover Kvernes. One ranks it among the leaders in its industry, the other near the bottom.</p>`,
    ledd: [
      {
        id: "kj4-m1a",
        points: 3,
        q: `<p>The CFO proposes leaving issue (ii) out of the sustainability statement, since it is unlikely to affect Kvernes's cash flows. Is the CFO right?</p>`,
        options: [
          "Yes: CSRD uses SASB's investor-focused definition, so only issues that affect cash flows count",
          "No: CSRD rests on double materiality, so a significant impact on people or the environment suffices",
          "No, but only because TCFD's metrics and targets pillar requires the firm to report all supply-chain emissions",
          "Yes: only issues that fail the EU Taxonomy's tests have to be reported",
        ],
        answer: 1,
        solution: `<p>CSRD companies report under ESRS on the basis of double materiality. Issue (ii) is material through the impact lens (inside-out), as in GRI, even if it is not financially material, so the CFO is wrong.</p>`,
        traps: [
          "Gives CSRD the financial lens of SASB and ISSB, when CSRD requires both lenses.",
          null,
          "Brings in TCFD, an investor-focused climate framework, while the issue is water pollution with no effect on cash flows.",
          "Confuses the Taxonomy, which classifies activities as sustainable, with the materiality test for what to report.",
        ],
      },
      {
        id: "kj4-m1b",
        points: 3,
        q: `<p>An analyst asks why the two rating agencies disagree so sharply about Kvernes. Which explanation fits the evidence in the course?</p>`,
        options: [
          "One agency must have made an error, since full disclosure under CSRD makes ratings converge",
          "Kvernes's low own emissions guarantee a top rating, so the low score must be outdated",
          "Raters choose different peer groups and interpret the data differently; more disclosure can widen the gap",
          "The ratings disagree because only one of the two agencies applies the EU Taxonomy's do-no-significant-harm test",
        ],
        answer: 2,
        solution: `<p>Kotsantonis (2019): companies report inconsistently, benchmarking (the choice of peers) largely decides a ranking and disagreement increases with the quantity of public information. Wide disagreement is normal, not proof of an error.</p>`,
        traps: [
          "Assumes more disclosure makes ratings converge, when disagreement increases with more public information.",
          "Treats a low carbon footprint as the whole of ESG, ignoring benchmarking and the other issues raters weigh.",
          null,
          "Mixes up ESG ratings with the Taxonomy's tests for classifying activities.",
        ],
      },
      {
        id: "kj4-m1c",
        points: 2,
        q: `<p>True or false? Although Kvernes's own emissions are low, the droughts in issue (i) are a physical climate risk that is financially material to Kvernes.</p>`,
        options: ["True", "False"],
        answer: 0,
        solution: `<p>True. The droughts raise input costs and squeeze the margin, so the issue runs outside-in: financial materiality. As PwC stressed, a firm's carbon footprint is irrelevant to its exposure, because physical risk arrives through own operations, supply chains and customer markets.</p>`,
        traps: [null, "Assumes a low carbon footprint means low climate risk, or reads an effect on the firm's margin as impact materiality."],
      },
    ],
  },
});

/* kj5 · Investing: strategies, ESG integration and asset prices */
window.EDU_DATA.kjerne.push({
  id: "kj5",
  num: 5,
  title: "Investing: strategies, ESG integration and asset prices",
  chapters: [8, 9],
  html: `
<div class="callout kort"><span class="h">In short</span>This part moves from companies to the investors who own them. A sustainable investor can screen firms out, pick the best within each sector, follow a theme, build ESG into the valuation, use its voice as an owner or aim for measurable impact. ESG reaches share prices through expected cash flows and the discount rate. The idea that holds it together: if investors like green assets, green assets cost more and so should earn less in expectation. They can still have earned more in the past, because demand for green rose by surprise.</div>

<p class="lead-in">Lectures 8 and 9 cover what investors do with ESG and what ESG does to prices. Expect short fund descriptions to classify by strategy or SFDR article. The distinction to master is expected versus realised returns, where one swapped word flips a true/false answer.</p>

<h3>Six strategies and two SFDR articles</h3>
<p>The lecture uses the CFA Institute and GSIA definitions; BlackRock groups them into <b>avoid</b> (screen out) and <b>advance</b> (ESG, thematic, impact).</p>
<table>
<tr><th>Strategy</th><th>What it does</th><th>Avoid or advance</th></tr>
<tr><td><b>Negative / exclusionary screening</b></td><td>Excludes investments that meet «undesirable» criteria set by ethics or norms, or risk-prone sectors such as fossil stranded assets</td><td>Avoid</td></tr>
<tr><td><b>Positive / best-in-class</b></td><td>Admits only firms that clear an ESG ranking hurdle <i>within their own sector</i></td><td>Advance</td></tr>
<tr><td><b>Thematic</b></td><td>Top-down: picks assets expected to benefit from long-term trends such as clean technology</td><td>Advance</td></tr>
<tr><td><b>ESG integration</b></td><td>Judges which ESG information is material and feeds it into cash-flow forecasts and the cost of capital</td><td>Advance</td></tr>
<tr><td><b>Stewardship</b></td><td>Uses owner rights (engagement, voting) to protect and enhance long-term value</td><td>Neither: voice, not selection</td></tr>
<tr><td><b>Impact</b></td><td>Intends positive, measurable social or environmental impact alongside a financial return and measures it; mostly private equity</td><td>Advance</td></tr>
</table>
<p>Adding an ESG constraint such as an emissions cap gives the <b>ESG-efficient frontier</b> (Pedersen, Fitzgibbons &amp; Pomorski 2021). A smaller menu cannot offer a better best choice, so the maximum Sharpe ratio falls or stays the same; it stays the same if the constraint does not bind.</p>
<p>The EU <b>SFDR</b> is a disclosure regulation for funds. An <b>Article 8</b> fund promotes environmental or social characteristics among others, typically through exclusions, ESG integration and engagement. An <b>Article 9</b> fund has sustainable investment as its <i>objective</i>: firms that contribute positively, do no significant harm and follow good governance. Many funds moved from Article 9 to 8 to avoid greenwashing accusations.</p>

<h3>Long-term value creation and what blocks it</h3>
<p>Schoenmaker &amp; Schramade name three barriers. <b>Overreliance on market metrics:</b> the efficient market hypothesis says everything is priced, CAPM measures risk by past volatility and performance is benchmarked to an index, so any deviation for sustainability counts as relative risk. A passive investor can vote but cannot exit, because it must hold the index. <b>Long investment chains:</b> beneficiaries, asset owners, asset managers and companies, each link a principal–agent relationship. <b>Limits of ESG tools:</b> ratings are add-ons that give little weight to materiality, rely on reported data and are industry-neutral.</p>
<p>Investing for <b>long-term value creation</b> (LTVC) is SF 2.0 against traditional SF 1.0: Max IV = F + S + E rather than Max F, a concentrated rather than an extremely diversified portfolio, deep dialogue with firms and a horizon of years rather than 12 months. Its six conditions answer the barriers: long horizons, active management in a concentrated portfolio, effective engagement, performance measured as value added in the real economy, long-term alignment of mandates between owner and manager and a short chain.</p>
<p>The same ladder maps objectives to strategies: Max FV is finance as usual; Max FV subject to a minimum SEV is exclusionary screening (SF 1.0); Max IV = FV + SEV is ESG integration (SF 2.0); Max SEV subject to a minimum FV is impact investing (SF 3.0).</p>

<h3>ESG and asset prices</h3>
<p>ESG reaches firm value through the <b>cash-flow channel</b> (revenues, costs including litigation, capex, stranded assets) and the <b>cost-of-capital channel</b>. Integration places each material issue in a line of the DCF. Firms with better CSR have a lower cost of capital (El Ghoul et al. 2011), so investors demand a lower return from them. How, then, can ESG stocks have outperformed?</p>
<div class="callout mech"><span class="h">Lower expected return, higher realised return</span>Pástor, Stambaugh &amp; Taylor (2022): green assets should have <b>lower expected returns</b>, because investors like them (taste premium) and because they hedge climate risk. They can still have <b>higher realised returns</b> when demand shifts towards green <i>unexpectedly</i>, from investors or from consumers. Realised return = expected return + surprise. The repricing lowers future expected returns, since the same cash flows now cost more. A green-minus-brown portfolio earned 174% cumulatively; purged of the unanticipated rise in climate concerns, it is essentially flat.</div>
<div class="worked"><span class="wh">Illustration: one repricing, two answers (made-up numbers)</span>
<p>A green stock pays 5 a year forever, discounted at 10%: price 50. Climate concerns rise and investors now accept 8%: price 62.5. That year's realised return is (62.5 − 50 + 5) / 50 = 35%. From then on the expected return is 8%, below the 10% on a comparable brown stock.</p></div>
<p><b>Alpha</b> is the gap between an asset's expected return and the return the security market line requires for its beta. An asset whose expected return is too low for its risk lies below the line: its alpha is negative and it is <b>overpriced</b>, so its price should fall until the expected return is back on the line. Whether ESG is a priced factor is unsettled: some studies find it adds to returns, others that it detracts. None of Research Affiliates' European long-short ESG strategies was significant.</p>

<h3>Engage or divest</h3>
<p>Gollier &amp; Pouget (2014) contrast <b>voting with your feet</b>, where avoiding polluters raises their cost of capital, with <b>activism</b>. Their «washing machine»: a large activist can earn positive abnormal returns by buying non-responsible firms and making them responsible, which removes the discount. It needs a long horizon and a credible pro-social orientation. Exit has limits: Cohen, Gurun &amp; Nguyen (2020) find that oil, gas and energy firms, often excluded from ESG funds, produce more and higher-quality green patents, so blanket exclusion may starve the main green innovators of capital. Only screening can run on scores, so a passive investor is essentially limited to screening.</p>

<div class="callout warn"><span class="h">Where true/false catches you</span><ul>
<li><b>Best-in-class is not exclusion.</b> It ranks within sectors, so the best oil producer can make the cut.</li>
<li><b>ESG integration excludes nothing by itself.</b> A low-ESG firm can be bought if its price is low enough.</li>
<li><b>Article 9 is the stricter claim.</b> Moving from 9 to 8 lowers it.</li>
<li><b>«Green outperformed, so green has a higher expected return»</b> is false. So is «ESG lowers the cost of capital, so ESG stocks should earn more».</li>
<li><b>An ESG constraint never raises the best Sharpe ratio</b>, but lowers it only if it binds.</li>
<li><b>Negative alpha means overpriced</b>, not underpriced.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>Exclusion removes sectors or firms; best-in-class ranks within each sector; ESG integration puts material ESG into cash flows and the discount rate; stewardship uses voice; impact targets measured impact.</li>
<li>SFDR Article 8 funds promote E or S characteristics; Article 9 funds have sustainable investment as their objective. Moving from 9 to 8 lowers the claim.</li>
<li>Green assets should have lower expected returns (taste premium, climate hedge) but had higher realised returns because climate concerns rose unexpectedly (Pástor, Stambaugh &amp; Taylor 2022).</li>
<li>Negative alpha: expected return too low for the asset's beta, so the asset is overpriced and its price should fall.</li>
<li>A passive investor can vote but cannot exit. Gollier &amp; Pouget's washing machine needs a large investor, a long horizon and credible pro-social intent.</li></ul></div>
`,
  checks: [
    {
      id: "kj5-s1",
      q: "A green-minus-brown portfolio earned a cumulative return of 174%, yet Pástor, Stambaugh and Taylor (2022) argue green stocks have lower expected returns. How do both hold?",
      options: [
        "Green stocks carry more climate risk than brown stocks, so their expected return is higher than the theory assumes",
        "An unexpected shift in demand towards green repriced the stocks upwards and lowered their future expected return",
        "Green firms have a higher cost of capital, so investors earned a premium for holding them",
        "The outperformance was a taste premium that green investors receive every year",
      ],
      answer: 1,
      explanation: "Realised return is expected return plus surprise. Climate concerns rose more than anyone anticipated, so green prices jumped; once the shift is priced, the same cash flows cost more and expected returns are lower. The taste premium works the other way: liking green pushes prices up and expected returns down, it is not a yearly bonus.",
    },
    {
      id: "kj5-s2",
      q: "An analyst finds that a stock's expected return is lower than the security market line requires for its beta. What follows?",
      options: [
        "Positive alpha: the stock is underpriced and its price should rise",
        "Negative alpha: the stock is underpriced and its price should rise",
        "Negative alpha: the stock is overpriced and its price should fall",
        "Zero alpha: a low expected return just reflects a low beta",
      ],
      answer: 2,
      explanation: "Alpha is the gap between the expected return and what the line requires for the beta. Too little return for the risk means the price is too high: negative alpha, overpriced. The price falls until the expected return is back on the line. Calling it underpriced flips the sign. Zero alpha would need the return to lie on the line, which it does not.",
    },
    {
      id: "kj5-s3",
      q: "A fund adds a cap on portfolio emissions to its mean-variance optimisation. What happens to the highest Sharpe ratio it can reach?",
      options: [
        "It rises, because low-emission firms are less exposed to climate risk",
        "It always falls, because every constraint costs return",
        "It falls or stays the same: unchanged if the cap does not bind",
        "It stays the same, because diversification offsets any constraint",
      ],
      answer: 2,
      explanation: "A constraint shrinks the menu. The best choice on a smaller menu cannot beat the best on the full one. If the cap does not bind, the optimal portfolio already meets it and nothing is lost. «Always falls» drops that condition. If ESG information helps predict returns, it belongs in the forecasts (ESG integration), not in a constraint.",
    },
    {
      id: "kj5-s4",
      q: "A large investor buys a polluting firm, engages for years and turns it into a responsible one. What do Gollier and Pouget (2014) predict?",
      options: [
        "It can earn positive abnormal returns, given a long horizon and credible pro-social intent",
        "It must accept lower returns, since responsible firms have lower expected returns from the start",
        "It earns abnormal returns only by selling, since exit raises the polluter's cost of capital",
        "It gains nothing, since one investor cannot move a firm's cost of capital",
      ],
      answer: 0,
      explanation: "This is the washing machine: the polluter trades cheaply because of its higher cost of capital. Making it responsible removes the reason for the discount, so the price rises. The gain is a realised return from a repricing the investor causes. Selling is the other channel, voting with your feet, which pressures the polluter but does not earn the activist the repricing gain.",
    },
  ],
  case: {
    id: "kj5-m1",
    topic: "Classify a fund's strategies and read its returns",
    minutes: 8,
    body: `<p>Skarvik Asset Management runs the Skarvik Nordic Transition Fund, which holds listed European equities. The fund excludes thermal coal and tobacco. For every remaining stock, analysts identify the material ESG issues and adjust the valuation: they cut revenue forecasts for a chemicals firm facing pollution lawsuits and raise the discount rate for a shipping firm exposed to carbon pricing. The fund also owns 4% of a steelmaker with low ESG scores. It has engaged with the board for three years and has now filed a shareholder resolution asking for a decarbonisation plan.</p>
<p>The prospectus says the fund promotes environmental characteristics but does not have sustainable investment as its objective. Over the past five years the fund's renewable-energy holdings beat the market by a wide margin, as climate concerns rose much faster than investors had anticipated.</p>`,
    ledd: [
      {
        id: "kj5-m1a",
        points: 3,
        q: `<p>Which combination of SRI strategies does the fund use?</p>`,
        options: [
          "Exclusionary screening, ESG integration and stewardship",
          "Best-in-class screening, ESG integration and impact investing",
          "Exclusionary screening, thematic investing and stewardship",
          "Exclusionary screening, best-in-class screening and stewardship",
        ],
        answer: 0,
        solution: `<p>Removing thermal coal and tobacco is exclusionary screening. Placing material ESG issues in revenue forecasts and the discount rate is ESG integration. Engaging with the steelmaker's board and filing a resolution is stewardship (active ownership).</p>`,
        traps: [
          null,
          "Confuses excluding whole sectors with ranking firms within a sector and mistakes engagement for impact investing, which targets measured impact mostly in private markets.",
          "Mistakes adjusting forecasts and discount rates for thematic investing, which picks assets top-down from a trend.",
          "Mistakes valuation adjustments for an ESG ranking hurdle; the fund ranks nothing within sectors.",
        ],
      },
      {
        id: "kj5-m1b",
        points: 3,
        q: `<p>Under the EU's SFDR, which classification fits the fund as its prospectus describes it?</p>`,
        options: [
          "Article 8, because it promotes environmental characteristics without a sustainable investment objective",
          "Article 9, because exclusions, ESG integration and engagement make up the typical Article 9 toolkit",
          "Article 9, because its renewable holdings have beaten the market",
          "None, because the SFDR governs companies' sustainability reports, not funds",
        ],
        answer: 0,
        solution: `<p>Article 8 covers funds that promote environmental or social characteristics among others, typically with exclusions, ESG integration and engagement. Article 9 requires sustainable investment as the fund's objective, which the prospectus explicitly disclaims. The SFDR is a disclosure regulation, so the article follows what the fund claims.</p>`,
        traps: [
          null,
          "Exclusions, integration and engagement are the typical Article 8 combination; Article 9 is defined by a sustainable investment objective.",
          "Confuses past performance with the fund's declared objective; the article reflects what the fund claims, not what it earned.",
          "Confuses the SFDR, which sets disclosure duties for funds and other financial market participants, with corporate reporting rules.",
        ],
      },
      {
        id: "kj5-m1c",
        points: 2,
        q: `<p>True or false? The renewable holdings' strong five-year performance shows that they carry a higher expected return than comparable brown stocks, so an investor buying them today should expect the outperformance to continue.</p>`,
        options: ["True", "False"],
        answer: 1,
        solution: `<p>False. The outperformance is a realised return driven by a surprise: climate concerns rose faster than anticipated and green stocks were repriced upwards. After the repricing the same cash flows cost more, so expected returns are lower, in line with the taste premium and the climate hedge (Pástor, Stambaugh &amp; Taylor 2022). A buyer today gets the lower expected return.</p>`,
        traps: [
          "Confuses realised with expected return: past outperformance came from an unexpected shift that is now in the price.",
          null,
        ],
      },
    ],
  },
});

/* kj6 · Beyond equity: bonds, banks and insurers */
window.EDU_DATA.kjerne.push({
  id: "kj6",
  num: 6,
  title: "Beyond equity: bonds, banks and insurers",
  chapters: [10, 11, 12],
  html: `
<div class="callout kort"><span class="h">In short</span>This part takes sustainable finance to bonds, loans and insurance. A lender gets at most what it was promised, so ESG enters debt as credit risk. Labelled bonds and loans come in two families: the money is earmarked for projects, or the price depends on sustainability targets. Banks and insurers meet climate risk mostly through the borrowers they lend to and the clients they insure. The idea that holds it together: their risk and impact sit in what they finance and insure.</div>

<p class="lead-in">Lectures 10 to 12 apply the course to bonds, banks and insurers, with distinctions that suit true/false: proceeds versus KPIs, risk-based versus value-based banking, physical versus transition risk and expected versus unexpected claims.</p>

<h3>Bonds: ESG as credit risk</h3>
<p>A bond's price is its cash flows discounted at the yield to maturity. The yield reflects risk, summarised in a credit rating. Debt holders care about the downside: default risk and loss given default. Attig et al. (2013) find that rating agencies tend to give relatively high ratings to firms with good social performance. For countries the issues differ: corruption, rule of law and natural disasters are mostly sovereign (Schoenmaker and Schramade 2019).</p>
<p>Bonds matter for sustainability because the bond market is larger than the equity market, issuers must return to refinance (a moment for engagement), investors can short «bad» bonds and a labelled bond is a signal.</p>
<div class="callout mech"><span class="h">Why a green bond is a signal</span>Flammer (2021) finds that share prices rise when a firm announces a green bond, more so for first-time issuers and certified bonds. Issuers then improve environmentally (better ratings, lower CO<sub>2</sub> emissions) and attract long-term and green owners. Issuing a green bond credibly signals commitment to the environment.</div>

<h3>Labelled bonds and loans</h3>
<p>ICMA's voluntary principles cover green, social, sustainability and sustainability-linked bonds; the EU adds the European Green Bond Standard as regulation. The Green Bond Principles have four components: <b>use of proceeds</b> (exclusively green projects), project evaluation and selection, management of proceeds (a tracked sub-account) and reporting.</p>
<table>
<tr><th></th><th>Green, social or sustainability bond; green loan</th><th>Sustainability-linked bond or loan</th></tr>
<tr><td>Tied to sustainability</td><td>Where the money goes: green projects, social projects or a mix</td><td>The price: the rate moves with an ESG score or KPI targets</td></tr>
<tr><td>Use of the money</td><td>Tracked and allocated to eligible projects</td><td>Not earmarked; the firm as a whole must improve</td></tr>
</table>
<p>Labelled issuance peaked at USD 1,162 billion in 2021 and was USD 904 billion in 2025, with green bonds the largest group (World Bank). For the greenium, the lower yield on green bonds, see k9.</p>
<p>Green buildings are certified under BREEAM or LEED. Derivatives include emissions trading, catastrophe and weather derivatives and swaps whose rate moves with the client's ESG score (ING and SBM Offshore, 2019).</p>

<h3>Banks: risk-based or value-based</h3>
<p>Banks finance the economy and are particularly important for small and medium-sized firms. They screen borrowers (against adverse selection), monitor them (against moral hazard) and earn the spread between lending and deposit rates. Credit risk is indirectly all the risks a borrower faces, so a bank's indirect material issues sit in its credits and investments. The EBA's Pillar 3 ESG disclosures split them: <b>transition risk</b> is exposure to carbon-intensive sectors and to real estate by energy performance; <b>physical risk</b> is exposure to acute and chronic climate events by sector and geography.</p>
<table>
<tr><th>Typology</th><th>Bank loans</th><th>Approach</th></tr>
<tr><td>SF 1.0</td><td>Exclusion</td><td>Risk-based</td></tr>
<tr><td>SF 2.0</td><td>ESG integration</td><td>Risk-based</td></tr>
<tr><td>SF 3.0</td><td>Impact lending, microfinance</td><td>Value-based</td></tr>
</table>
<p>Risk-based banking puts sustainability criteria into credit risk management, so they show up in the risk premium; Weber (2010) finds they can help predict a debtor's financial performance. Value-based banks lend for impact. In GABV data their ROE was close to global banks' (8.3% against 8.7%) but was less volatile (standard deviation 4.9% against 7.7%). Voluntary frameworks include the Equator Principles for projects and the UN Principles for Responsible Banking.</p>

<h3>Insurers: climate risk on both sides</h3>
<p>Insurers transfer, price and manage risk by pooling many clients. Life insurance is easier to predict than non-life (catastrophes, accidents, fire, liability). <b>Technical provisions cover expected claims; equity covers unexpected claims.</b> Premiums are invested until claims are paid, so insurers are asset managers. Climate risk hits both sides: physical impacts raise claims while the investments carry their own material issues.</p>
<div class="callout mech"><span class="h">Pricing and sharing catastrophe risk</span>A catastrophe model chains hazard, vulnerability (damage to assets), exposure (building, contents and business interruption values), financial loss and a platform that combines them. It yields average annual loss and value at risk (expected plus unexpected loss). A risk too big for one insurer goes to reinsurers, government programmes such as the US National Flood Insurance Programme, or investors via catastrophe bonds, which let the issuer skip or defer payments after a catastrophe. The stakes: climate-related claims on Dutch homeowner policies could rise 10% to 52% by 2085 at 1.5°C and 25% to 131% at 3.5°C (DNB 2017).</div>
<p>When cover becomes unaffordable or is withdrawn, losses go uninsured: less than half of Europe's natural disaster losses were insured in 2024 (ECB, in the FT). Responses include climate consulting to keep clients insurable, the UN Principles for Sustainable Insurance, sustainability rules in Solvency II (since 2022) and microinsurance for the poor.</p>

<div class="callout warn"><span class="h">Mix-ups that cost points</span><ul>
<li>Green bond or loan: the money is earmarked. Sustainability-linked: targets set the rate and the money is free.</li>
<li>ESG integration in credit pricing is <i>risk-based</i> banking (SF 2.0). Value-based means impact lending or microfinance (SF 3.0).</li>
<li>Physical risk is exposure to climate events; transition risk is exposure to carbon-intensive sectors. A low-carbon borrower in a flood zone still carries physical risk.</li>
<li>Technical provisions cover <i>expected</i> claims; equity absorbs the <i>unexpected</i>.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span><ul>
<li>Debt holders care about the downside, so ESG enters bonds and loans as credit risk.</li>
<li>A green bond earmarks its proceeds for green projects; a sustainability-linked bond or loan ties its rate to KPI or ESG targets instead.</li>
<li>Flammer (2021): green bond announcements lift share prices and issuers then improve environmentally, a credible signal.</li>
<li>In Schoenmaker and Schramade's bank typology, exclusion (SF 1.0) and ESG integration (SF 2.0) are risk-based; impact lending and microfinance (SF 3.0) are value-based.</li>
<li>Insurers face climate risk on both sides: physical risk raises claims and their investments carry climate risk too.</li>
</ul></div>
`,
  checks: [
    {
      id: "kj6-s1",
      q: "A utility issues a bond. It may spend the money on anything, but the coupon rises if it misses its 2030 emission-intensity target. What kind of bond is it?",
      options: [
        "A green bond, because the target is environmental",
        "A sustainability bond, because it mixes green and general purposes",
        "A sustainability-linked bond, because a KPI target sets the coupon",
        "A social bond, because cleaner power benefits society",
      ],
      answer: 2,
      explanation: "What is tied to sustainability here is the price (the coupon via a KPI target), not where the money goes, which is the mark of a sustainability-linked bond. A green bond would earmark the proceeds for eligible green projects; an environmental target alone does not make a bond green.",
    },
    {
      id: "kj6-s2",
      q: "A bank adds borrowers' ESG scores to its credit model, so weaker ESG means a higher risk premium. Where does this sit in Schoenmaker and Schramade's banking typology?",
      options: [
        "Risk-based banking: ESG integration (SF 2.0)",
        "Value-based banking: impact lending (SF 3.0)",
        "Value-based banking: exclusion (SF 1.0)",
        "Risk-based banking: microfinance (SF 3.0)",
      ],
      answer: 0,
      explanation: "Building sustainability criteria into credit risk management, reflected in the risk premium, is ESG integration. The slides group it with exclusion as risk-based. Value-based banking (SF 3.0) means lending for impact, such as impact lending and microfinance; pricing ESG as risk does not make a bank value-based.",
    },
    {
      id: "kj6-s3",
      q: "A hurricane season is far worse than the insurer's models expected. Claims exceed the expected level. Which part of the insurer's balance sheet is meant to absorb the excess?",
      options: [
        "Technical provisions, because they are set aside for claims",
        "Investment income, because premiums are invested before claims",
        "Equity, because provisions cover only the expected claims",
        "The policyholders, because the contracts can be repriced next year",
      ],
      answer: 2,
      explanation: "Technical provisions are sized for expected claims; equity is the buffer for unexpected claims, the gap between expected loss and value at risk. Provisions are the tempting answer, but the excess is by definition the part they were not sized for.",
    },
  ],
  case: {
    id: "kj6-m1",
    topic: "A savings bank's green bond, loans and climate exposures",
    minutes: 8,
    body: `<p>Fjordvik Sparebank is a Norwegian savings bank. This year it:</p>
<ul>
<li>issued a bond whose proceeds go to a tracked sub-account that funds mortgages on BREEAM-certified buildings, with an annual report on how the money was used;</li>
<li>gave a fish farmer a loan with no restriction on how the money is used, where the interest margin falls if the farmer meets targets for fewer fish escapes and lower sea-lice levels;</li>
<li>prepared its first Pillar 3 ESG disclosure, which lists (1) loans to fossil-fuel firms, (2) mortgages broken down by the energy performance of the homes, (3) the share of taxonomy-aligned lending and (4) mortgages on homes in coastal areas exposed to flooding and storms.</li>
</ul>
<p>The regional insurer has announced that it will stop renewing flood cover for the homes closest to the shore, where many of Fjordvik's mortgages are.</p>`,
    ledd: [
      {
        id: "kj6-m1a",
        points: 3,
        q: `<p>Which labels fit the bond and the fish-farm loan?</p>`,
        options: [
          "Green bond; sustainability-linked loan",
          "Sustainability-linked bond; green loan",
          "Sustainability bond; social loan",
          "Green bond; green loan",
        ],
        answer: 0,
        solution: `<p>The bond earmarks its proceeds for green buildings, tracks them in a sub-account and reports on their use: a use-of-proceeds green bond under the Green Bond Principles. The loan's money is free to use and its margin depends on KPI targets, so it is a sustainability-linked loan.</p>`,
        traps: [
          null,
          "Swaps the two families: the bond's proceeds are earmarked and the loan's are not.",
          "A sustainability bond funds a mix of green and social projects; nothing in the loan is earmarked for social projects.",
          "Treats any loan with environmental targets as green, although a green loan needs earmarked proceeds.",
        ],
      },
      {
        id: "kj6-m1b",
        points: 3,
        q: `<p>Which item in Fjordvik's Pillar 3 disclosure is a <b>physical</b> climate risk exposure?</p>`,
        options: [
          "Loans to fossil-fuel firms",
          "Mortgages broken down by the energy performance of the homes",
          "The share of taxonomy-aligned lending",
          "Mortgages on homes in coastal areas exposed to flooding and storms",
        ],
        answer: 3,
        solution: `<p>Physical risk is exposure to acute and chronic climate events by sector and geography, which is what flood- and storm-exposed coastal mortgages are. Loans to fossil-fuel firms and mortgages sorted by energy performance are transition risk disclosures; the taxonomy-aligned share is the green asset ratio.</p>`,
        traps: [
          "Exposure to carbon-intensive sectors is transition risk: it loses value as policy and technology move away from fossil fuels.",
          "Energy performance of the collateral is a transition risk measure; it says how a home fares under stricter energy rules, not under floods.",
          "This is the green asset ratio, a measure of green lending, not a risk exposure.",
          null,
        ],
      },
      {
        id: "kj6-m1c",
        points: 2,
        q: `<p>True or false? The insurer's decision does not remove the flood risk on the shore-side homes: more of it now falls on the homeowners and, through their mortgages, on Fjordvik's credit risk.</p>`,
        options: ["True", "False"],
        answer: 0,
        solution: `<p>True. When cover is withdrawn, the loss is not priced away but left uninsured, as with European natural disaster losses, of which less than half were insured in 2024. A bank's credit risk is indirectly all the risks its borrowers face, so uninsured flood damage to homes it lends against becomes Fjordvik's problem too.</p>`,
        traps: [null, "Thinks that once the insurer stops covering a risk the risk is gone, or that a bank's climate risk is limited to its own operations."],
      },
    ],
  },
});
