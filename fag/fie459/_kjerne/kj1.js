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
