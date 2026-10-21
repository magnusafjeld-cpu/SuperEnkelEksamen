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
