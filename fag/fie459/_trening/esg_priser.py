# -*- coding: utf-8 -*-
"""FIE459 eksamenstrening · esg-priser (forelesning 9, ESG integration and asset prices).

   Kilder: manualkapittel 9 (fag/fie459/_fragmenter/k9.html), foilene
   FIE459_H26_9_ESG_Integration_and_Asset_Prices i _tekst/ og
   docs/fie459-forfatterspek.md § 5 (k9). Alfa-fortegnet i formelen på foil 20
   (og forelesning 8 foil 67) er feil, så alfa forklares med ord.

   Statiske spørsmål esg-s01 … esg-s30. id-ene er lagringsnøkler og endres aldri.
"""
from trening_lib import *  # noqa: F401,F403

# ---------------------------------------------------------------------------
# To kanaler fra ESG til verdi
# ---------------------------------------------------------------------------

statisk(
    "esg-s01", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the two channels through which ESG issues reach firm value in a DCF.",
        "Firm value is the present value of free cash flows discounted at the cost of capital. One channel runs "
        "through revenues, costs including litigation, capital expenditures and stranded assets. The other runs "
        "through the discount rate.",
        "<p><b>Step 1: what did she change in the model?</b> Cash flows, the discount rate or both?</p>"
        "<p><b>Step 2: which item in the two lists</b> describes plants that close early?</p><p><b>Step 3: check</b> that the channel you pick matches what she changed.</p>",
    ),
    q="<p>An analyst expects a utility's coal plants to close ten years early because of climate policy. She cuts the "
      "cash flows those plants were expected to produce in later years and keeps the discount rate unchanged. "
      "Through which channel does this ESG issue reach her valuation?</p>",
    alternativer=[
        R("The cash-flow channel, through stranded assets"),
        F("The cost-of-capital channel, through a higher discount rate",
          "The discount rate is unchanged in her model. Only the cash flows moved."),
        F("Mispricing, since the plants now have a negative alpha",
          "Alpha compares a stock's expected return with what its beta requires. Her model is a valuation, not a "
          "test of mispricing."),
        F("A systematic ESG factor, priced through the APT",
          "Nothing in her model adds a factor or a premium. She changes cash flows."),
    ],
    kort="<p><b>The cash-flow channel, through stranded assets.</b> Plants that close early produce fewer future cash "
         "flows. She leaves the discount rate alone.</p>",
    full="<p><b>Two channels.</b> Lecture 9 shows how externalities, intangibles and material ESG issues reach firm "
         "value. The cash-flow channel runs through revenues, costs (including litigation), capital expenditures "
         "and stranded assets. The cost-of-capital channel runs through the discount rate. In a DCF, value is the "
         "present value of free cash flows discounted at the cost of capital. Integration means asking which value "
         "driver each issue moves.</p>"
         "<p><b>Here.</b> Coal plants that close a decade early are stranded assets: they stop producing cash flows "
         "before the end of their planned life. The analyst cuts those cash flows and keeps the discount rate. That "
         "is the cash-flow channel.</p>"
         "<p><b>The mix-up.</b> «Risky coal» tempts you to say cost of capital. That would mean changing the "
         "discount rate, which she did not do. Alpha and factors belong to asset pricing tests, not to this "
         "valuation step.</p>"
         "<p><b>Remember:</b> stranded assets hit cash flows; the cost-of-capital channel works through the "
         "discount rate.</p>",
)

statisk(
    "esg-s02", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the cost-of-capital channel and the direction in which it moves value.",
        "In a DCF, value is the present value of free cash flows discounted at the cost of capital. The cost of "
        "capital is the return investors require on the money they provide.",
        "<p><b>Step 1: what changed?</b> The cash flows or the required return?</p>"
        "<p><b>Step 2: discount the same cash flows at a lower rate.</b> Is the present value higher or lower?</p><p><b>Step 3: name the channel and the direction.</b></p>",
    ),
    q="<p>After a firm improves its environmental risk management, its lenders and shareholders accept a lower return "
      "on the capital they provide. Its forecast cash flows stay the same. Which channel is at work and what happens "
      "to the firm's value?</p>",
    alternativer=[
        R("Cost-of-capital channel: the lower discount rate raises the value"),
        F("Cash-flow channel: lower risk raises the forecast cash flows",
          "The case keeps the forecast cash flows unchanged. Only the required return moves."),
        F("Cost-of-capital channel: a lower discount rate lowers value",
          "This gets the direction wrong. The same cash flows discounted at a lower rate are worth more."),
        F("Neither channel: value moves only when cash flows change",
          "In a DCF the discount rate matters as much as the cash flows. A change in either one moves value."),
    ],
    kort="<p><b>Cost-of-capital channel: value rises.</b> Investors require less, so the discount rate falls. The "
         "same cash flows are then worth more. Sharfman and Fernando (2008) link better environmental risk "
         "management to a lower cost of capital.</p>",
    full="<p><b>The channel.</b> The cost-of-capital channel runs through the discount rate. If investors see a firm "
         "as less risky, they accept a lower return. The same cash flows are then discounted less, so value "
         "rises.</p>"
         "<p><b>The evidence.</b> Lecture 9 lists four studies that point one way. Firms with better CSR scores have "
         "a lower implied cost of capital (El Ghoul, Guedhami, Kwok and Mishra 2011). Good CSR performers see their "
         "cost of capital fall after they start disclosing CSR activities (Dhaliwal, Li, Tsang and Yang 2011). "
         "Superior CSR performance brings better access to finance (Cheng, Ioannou and Serafeim 2014). Better "
         "environmental risk management goes with a lower cost of capital, a shift from equity to debt and larger "
         "tax benefits (Sharfman and Fernando 2008).</p>"
         "<p><b>The trap.</b> «Lower» and «discount rate» together tempt a «lower value» answer. A lower rate means "
         "a higher present value.</p>"
         "<p><b>Remember:</b> a lower cost of capital means a higher value for the firm and a lower expected return "
         "for the investor.</p>",
)

statisk(
    "esg-s03", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about linking a material ESG issue to the value driver it moves in a valuation.",
        "Schoenmaker and Schramade's value drivers in a DCF: sales growth, margins, capital expenditures and the "
        "cost of capital.",
        "<p><b>Step 1: is the effect on revenue, on profit per unit, on investment spending or on risk?</b></p>"
        "<p><b>Step 2: pick the driver</b> that captures the first and most direct effect described in the "
        "case.</p>",
    ),
    q="<p>In the materiality table for a cement producer, an analyst notes that a new low-carbon product line will "
      "let the firm win more public tenders that favour green building materials. Which value driver does this "
      "issue affect most directly?</p>",
    alternativer=[
        R("Sales growth"),
        F("Margins",
          "Margins are profit per unit of sales. The case is about winning more sales, not earning more on each "
          "one."),
        F("Capital expenditures",
          "Capex is spending on plant and equipment. The issue here works on the revenue side."),
        F("Cost of capital",
          "The cost of capital is the return investors require. Nothing in the case changes the firm's risk or its "
          "investors."),
    ],
    kort="<p><b>Sales growth.</b> Winning more tenders means more revenue: the low-carbon line is a competitive "
         "advantage that works through the top line.</p>",
    full="<p><b>Value drivers.</b> Lecture 9 uses four: sales growth, margins, capital expenditures and the cost of "
         "capital. The materiality table asks, for each material ESG issue, how the company performs on it, whether "
         "it gives a competitive advantage or disadvantage and which value driver it affects. Part 2 of the group "
         "project asks for exactly this.</p>"
         "<p><b>Here.</b> The low-carbon line is a competitive advantage in tenders that favour green materials. Its "
         "first effect is more contracts: sales growth.</p>"
         "<p><b>The nuance.</b> The same issue could later touch other drivers. A price premium would show up in margins. Developing the line may need capex. The question asks for the most direct effect "
         "described.</p>"
         "<p><b>Remember:</b> name the driver the issue moves first: more sales is growth, more profit per sale is "
         "margins, more investment is capex, less risk is the cost of capital.</p>",
)

statisk(
    "esg-s04", tema="esg-priser", type="begrep",
    hjelp=hjelp3(
        "This is about the materiality table that lecture 9 uses to bring ESG into a valuation.",
        "The table works issue by issue. It starts from how well the company handles the issue, asks what that "
        "means against competitors and ends in the valuation model.",
        "<p><b>Step 1: the table is a valuation tool.</b> Rule out sets that come from ratings or from "
        "regulation.</p>"
        "<p><b>Step 2: which set ends in a number in the model?</b> Check that it also compares the firm with "
        "its rivals.</p>",
    ),
    q="<p>For each of a company's most material ESG factors, the materiality table in lecture 9 asks the analyst to "
      "fill in three things. Which three?</p>",
    alternativer=[
        R("Its performance, competitive edge or handicap and value driver affected"),
        F("Its ESG rating, its peer group and the average score in its sector",
          "These are inputs to an ESG rating. The table is about how an issue enters the valuation."),
        F("Its impact on people, its impact on the planet and its impact on profit",
          "This is a triple-bottom-line checklist. The lecture's table is built to feed a valuation."),
        F("Its SFDR article, its Taxonomy objective and its TCFD pillar",
          "These are labels from reporting rules. The table is an analyst's valuation tool."),
    ],
    kort="<p><b>Performance, competitive (dis)advantage and value driver.</b> The table asks how the company performs "
         "on each material factor, whether that gives it an edge or a handicap and which value driver it "
         "moves.</p>",
    full="<p><b>The table.</b> Lecture 9 asks: what are the most material ESG factors, the issues most critical to the "
         "success of the company's business model? For each, fill in (i) how the company performs on it, (ii) "
         "whether the company derives a competitive advantage or disadvantage from it and (iii) how it might affect "
         "the value drivers: sales growth, margins, capital expenditures and the cost of capital.</p>"
         "<p><b>Why this order.</b> Performance alone says little. What matters for value is performance relative to competitors. Then comes the line in the model it changes. That is how ESG integration moves from a score "
         "to a number.</p>"
         "<p><b>The traps.</b> Ratings, peer groups and regulatory labels all appear in the course, but they are not "
         "the columns of this table.</p>"
         "<p><b>Remember:</b> performance, competitive position, value driver: three steps from an ESG issue to a "
         "valuation.</p>",
)

statisk(
    "esg-s05", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about what makes an analysis ESG integration rather than ESG decoration.",
        "ESG integration finds the material ESG issues and builds them into the valuation, through the value "
        "drivers: sales growth, margins, capital expenditures and the cost of capital.",
        "<p><b>Step 1: did any number in the model change?</b></p>"
        "<p><b>Step 2: does the rating's source or presence matter</b> if the valuation and so the decision are the same as before?</p>",
    ),
    q="<p>An analyst values a mining company with a standard DCF. She then adds a box to her report showing the "
      "company's ESG rating, without changing any number in the model. Is this ESG integration in the sense of "
      "lecture 9?</p>",
    alternativer=[
        R("No: the ESG work has to change the forecasts or the discount rate"),
        F("Yes: the ESG rating now sits in the investment report next to the DCF",
          "Showing a rating next to the model leaves the valuation untouched. Integration changes the numbers."),
        F("Yes, as long as the rating comes from a major ESG data provider",
          "The source of the rating does not matter. The valuation is still unchanged."),
        F("No: integration means excluding firms with low ESG ratings",
          "Excluding firms is screening. Integration excludes nothing by itself."),
    ],
    kort="<p><b>No.</b> Integration puts each material issue into a specific line of the model, as in the CESGA "
         "example. A rating beside an unchanged valuation is not integration.</p>",
    full="<p><b>What integration means.</b> Lecture 9's CESGA example takes an ordinary five-year forecast and "
         "corrects three lines: revenues for litigation and then for better products, taxes for tax avoidance and "
         "capex for battery development. The ESG-adjusted value is 16 per share instead of 20. Each ESG issue lands "
         "in a specific line of the model.</p>"
         "<p><b>Here.</b> The analyst's model is unchanged. The ESG rating sits beside it as information, but the "
         "valuation and so the buy or sell decision are the same as without it. That is not integration.</p>"
         "<p><b>The trap on the other side.</b> Integration is not exclusion either. It excludes nothing by itself: "
         "a low-ESG firm can still be a buy if its price is low enough.</p>"
         "<p><b>Remember:</b> if the ESG work does not change a number in the model, it is not integration.</p>",
)

# ---------------------------------------------------------------------------
# Kapitalkostnaden og gåten
# ---------------------------------------------------------------------------

statisk(
    "esg-s06", tema="esg-priser", type="fakta",
    hjelp=hjelp3(
        "This is about the cost-of-capital evidence in lecture 9 and one study on environmental risk management.",
        "All four cost-of-capital studies in lecture 9 point the same way for better CSR or environmental "
        "performance. This one also says something about the mix of debt and equity and about tax benefits.",
        "<p><b>Step 1: which way do the lecture's cost-of-capital studies point?</b></p>"
        "<p><b>Step 2: tax benefits come from debt.</b> Which way would the financing mix move if the firm can "
        "carry more of it?</p>",
    ),
    q="<p>What do Sharfman and Fernando (2008) find for firms with better environmental risk management?</p>",
    alternativer=[
        R("A lower cost of capital and a shift from equity to debt financing"),
        F("A higher cost of capital, since investors fear the cost of green projects",
          "The finding goes the other way: the cost of capital is lower."),
        F("No change in the cost of capital, only higher cash flows",
          "The study does find an effect on the cost of capital: it is lower."),
        F("A shift from debt to equity, since lenders avoid such firms",
          "This reverses the financing shift. The firms move from equity towards debt."),
    ],
    kort="<p><b>A lower cost of capital and a shift from equity to debt.</b> The firms can also add more debt and so "
         "gain larger tax benefits.</p>",
    full="<p><b>The study.</b> Sharfman and Fernando (2008) find that firms with better environmental risk management "
         "have a lower cost of capital, shift from equity to debt financing and have higher tax benefits because "
         "they can add more debt.</p>"
         "<p><b>The other three.</b> El Ghoul, Guedhami, Kwok and Mishra (2011): better CSR scores, lower implied "
         "cost of capital. Dhaliwal, Li, Tsang and Yang (2011): good CSR performers' cost of capital falls after "
         "they start disclosing CSR. Cheng, Ioannou and Serafeim (2014): superior CSR performance, better access to "
         "finance.</p>"
         "<p><b>Why the debt shift fits.</b> Lower environmental risk makes lenders more comfortable. The firm can "
         "then carry more debt, whose interest is tax-deductible.</p>"
         "<p><b>The puzzle it sets up.</b> A lower cost of capital means investors demand a lower return. So ESG "
         "stocks should not be expected to beat the market, which leads to the expected-versus-realised "
         "distinction.</p>"
         "<p><b>Remember:</b> better environmental risk management, cheaper capital, more debt.</p>",
)

statisk(
    "esg-s07", tema="esg-priser", type="fakta",
    hjelp=hjelp3(
        "This is about what happens to the cost of capital when a firm starts disclosing its CSR activities.",
        "Lecture 9's cost-of-capital studies all point one way for firms with better CSR. One of them looks at the "
        "moment a firm initiates CSR disclosure. Its finding holds for firms whose CSR performance is good.",
        "<p><b>Step 1: does the firm in the case have good CSR performance?</b></p>"
        "<p><b>Step 2: which way do the lecture's cost-of-capital studies point</b> for such firms once investors "
        "can see their record?</p>",
    ),
    q="<p>A firm with strong CSR performance publishes its first CSR report. Based on Dhaliwal, Li, Tsang and Yang "
      "(2011), what should happen to its cost of capital?</p>",
    alternativer=[
        R("It should fall, since good performers gain from disclosing"),
        F("It should rise, since disclosure reveals new risks to investors",
          "The finding goes the other way for firms with good CSR performance."),
        F("It should stay the same, since prices already hold all information",
          "This assumes that disclosure tells investors nothing new. The study finds an effect."),
        F("It should fall for any firm that discloses, whatever its CSR record",
          "Too strong. The finding is about firms with better CSR performance."),
    ],
    kort="<p><b>It should fall.</b> Dhaliwal, Li, Tsang and Yang (2011) find that firms with better CSR performance "
         "enjoy a lower cost of capital after they start disclosing CSR activities.</p>",
    full="<p><b>The finding.</b> Dhaliwal, Li, Tsang and Yang (2011): firms with better CSR performance enjoy a "
         "reduction in their cost of capital after initiating disclosure of CSR activities. Disclosure lets "
         "investors see the good performance, so the required return falls.</p>"
         "<p><b>The conditions matter.</b> The result is for good performers. A firm with a weak record has less to "
         "gain from showing it. Reading the study as «any disclosure lowers the cost of capital» overstates it.</p>"
         "<p><b>In context.</b> It is one of four studies in lecture 9 that point the same way: a lower implied cost "
         "of capital with better CSR scores (El Ghoul et al. 2011), better access to finance (Cheng, Ioannou and "
         "Serafeim 2014) and a lower cost of capital with better environmental risk management (Sharfman and "
         "Fernando 2008).</p>"
         "<p><b>Remember:</b> good CSR performance plus disclosure means a lower cost of capital.</p>",
)

statisk(
    "esg-s08", tema="esg-priser", type="paastand",
    hjelp=hjelp3(
        "This is about what a firm's cost of capital means from the investor's side.",
        "The cost of capital is the return investors require on the money they provide. In equilibrium, the "
        "expected return on a share equals its required return.",
        "<p><b>Step 1: from the firm's side,</b> a lower cost of capital is cheaper money.</p>"
        "<p><b>Step 2: from the investor's side,</b> what is the same number? Is it a cost or a return?</p>",
    ),
    q="<p>Studies in lecture 9 find that firms with better CSR have a lower cost of capital. What does this imply for "
      "investors who buy these firms' shares at today's prices?</p>",
    alternativer=[
        R("A lower expected return than on comparable firms with weaker CSR"),
        F("A higher expected return, since better firms are better investments",
          "A good firm and a good investment are not the same thing. The lower cost of capital is the lower return "
          "investors require."),
        F("The same expected return, since CSR does not affect share prices",
          "The studies show that CSR does affect the cost of capital and so prices."),
        F("A positive alpha, since a low cost of capital signals underpricing",
          "A low cost of capital is a low required return, not a sign of mispricing. Alpha compares the expected "
          "with the required return."),
    ],
    kort="<p><b>A lower expected return.</b> The firm's cost of capital is the investor's required return. Cheaper "
         "capital for the firm means a lower expected return for the shareholder.</p>",
    full="<p><b>Two sides of one number.</b> For the firm, the cost of capital is what its money costs. For the "
         "investor, it is the return required to hold the shares. If better CSR lowers the cost of capital, "
         "investors accept a lower expected return on these shares.</p>"
         "<p><b>The puzzle.</b> Lecture 9 then asks: if ESG lowers the cost of capital, how can headlines claim that "
         "ESG stocks outperform? The answer, from Pástor, Stambaugh and Taylor (2022), is that realised returns can "
         "beat expected returns when demand shifts unexpectedly towards green. That is a surprise, not a higher "
         "expected return.</p>"
         "<p><b>The traps.</b> «Better firm, better investment» ignores that the price already reflects the quality. "
         "A low required return is not a positive alpha: alpha is a gap between the expected and the required "
         "return.</p>"
         "<p><b>Remember:</b> a lower cost of capital means a lower expected return for the investor.</p>",
)

# ---------------------------------------------------------------------------
# Forventet mot realisert avkastning (Pástor, Stambaugh og Taylor 2022)
# ---------------------------------------------------------------------------

statisk(
    "esg-s09", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about one of the two reasons Pástor, Stambaugh and Taylor give for green assets' expected returns.",
        "Investors care about when an asset pays off. An asset that pays off in bad times protects the rest of the "
        "portfolio.",
        "<p><b>Step 1: when does the green stock pay off?</b></p>"
        "<p><b>Step 2: would investors pay extra for that, or demand extra?</b></p>"
        "<p><b>Step 3: turn a higher price</b> into an expected return.</p>",
    ),
    q="<p>Green stocks tend to do well when climate risk worsens, just when many other assets do badly. In Pástor, "
      "Stambaugh and Taylor (2022), what does this hedging property imply for green stocks' expected return?</p>",
    alternativer=[
        R("It is lower, since an asset that hedges climate risk is safer to hold"),
        F("It is higher, since green firms are more exposed to climate news",
          "A hedge pays off in bad times. Investors pay for that protection rather than demand a premium for it."),
        F("It is unaffected, since only market beta can carry a premium",
          "That holds only in a one-factor world. The paper treats the climate hedge as one reason for a lower "
          "expected return."),
        F("It is higher, since investors must be paid to hold a hedge",
          "This gets the hedge backwards. An asset that pays off in bad times is worth more, not less."),
    ],
    kort="<p><b>Lower.</b> Green assets hedge climate risk, so they are safer to hold. Investors accept a lower return "
         "on safer assets: the «risk premium» reason in Pástor, Stambaugh and Taylor (2022).</p>",
    full="<p><b>Two reasons for lower expected returns.</b> Pástor, Stambaugh and Taylor (2022), «Dissecting green "
         "returns», argue that green assets should have lower expected returns than brown ones. Taste premium: "
         "investors like green assets. The extra demand pushes prices up and returns down. Risk premium: greener "
         "assets are a better hedge against climate risk, so they are safer. Safer assets earn lower returns.</p>"
         "<p><b>Here.</b> A stock that does well when climate risk worsens protects the rest of the portfolio. "
         "Investors value that, bid its price up and accept a lower expected return.</p>"
         "<p><b>The trap.</b> «Climate exposure means a higher premium» gets it backwards for a hedge. An asset that "
         "pays in bad times works like insurance. Insurance earns less, not more.</p>"
         "<p><b>Remember:</b> a hedge is safe, safe assets earn less, so green should earn less in "
         "expectation.</p>",
)

statisk(
    "esg-s10", tema="esg-priser", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the difference between expected and realised returns on green assets.",
        "Realised return equals expected return plus surprise. A statement about one of them says nothing on its "
        "own about the other.",
        "<p><b>Step 1: statement I</b> is about expected returns. What does extra demand do to price and expected "
        "return?</p>"
        "<p><b>Step 2: statement II</b> is about realised returns. What does an unexpected shift do to "
        "prices?</p>",
    ),
    q="<p>Two statements about green assets, following Pástor, Stambaugh and Taylor (2022):</p>"
      "<p>I. Because investors like green assets, they bid up green prices, which lowers green assets' expected returns.<br>"
      "II. When climate concerns rise by more than investors expected, green assets earn higher realised returns than brown ones.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I",
          "Statement II also holds: an unexpected shift towards green raises green prices and so realised "
          "returns."),
        F("Only II",
          "Statement I also holds: the taste premium is one of the two reasons for lower expected returns."),
        R("Both I and II"),
        F("Neither I nor II",
          "Both hold at once. One is about expected returns, the other about realised returns."),
    ],
    kort="<p><b>Both I and II.</b> Taste lowers green assets' expected returns, while an unexpected rise in climate "
         "concerns can still give them high realised returns. The two hold at once.</p>",
    full="<p><b>The key distinction.</b> Pástor, Stambaugh and Taylor (2022) separate expected from realised returns. "
         "Expected: green assets should earn less than brown ones, because investors like them (taste premium) and "
         "because they hedge climate risk (risk premium). Realised: green assets can still earn more when demand "
         "shifts unexpectedly towards green.</p>"
         "<p><b>Two kinds of shift.</b> Investors may want more green assets, which lifts their prices directly. Or "
         "consumers may want more green products, for example because of regulation, which lifts green firms' "
         "profits and so their prices. Eventually a correction happens: once the shift is priced, green earns its "
         "lower expected return again.</p>"
         "<p><b>Here.</b> Statement I is the taste premium. Statement II is the surprise. They do not contradict "
         "each other.</p>"
         "<p><b>Remember:</b> realised return = expected return + surprise, so a low expected return and a high "
         "realised return can go together.</p>",
)

statisk(
    "esg-s11", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the ways in which green demand can shift and what a shift does to returns.",
        "Realised return equals expected return plus surprise. Ask whether the price jump comes from what investors "
        "expected or from news. Also ask whose demand changed.",
        "<p><b>Step 1: was the ban expected?</b></p>"
        "<p><b>Step 2: whose demand changed first,</b> investors' demand for the shares or customers' demand for the products?</p><p><b>Step 3: is this a statement about realised or about expected returns?</b></p>",
    ),
    q="<p>A government suddenly bans fossil-fuel boilers in new buildings. Demand for heat pumps jumps. So do the "
      "profits and share price of a listed heat-pump maker. In Pástor, Stambaugh and Taylor's (2022) framework, what "
      "is this?</p>",
    alternativer=[
        R("A surprise shift in consumer demand that lifts realised returns"),
        F("Evidence that heat-pump makers carry a higher expected return than others",
          "One surprise says nothing about the expected return. After the jump, the shares cost more for the same "
          "cash flows."),
        F("A taste premium, since investors prefer to hold green shares",
          "The shift came through customers buying heat pumps, not through investors' taste for the shares."),
        F("A risk premium earned for bearing extra climate risk",
          "Green assets hedge climate risk. The price jump comes from a surprise, not from a premium for risk."),
    ],
    kort="<p><b>A surprise shift in consumer demand.</b> Regulation raised demand for green products, so the green "
         "firm's profits and price rose. That lifts realised returns, not expected returns.</p>",
    full="<p><b>Two ways demand can shift.</b> Pástor, Stambaugh and Taylor (2022) describe two. Investors' demand for "
         "green assets can rise, driving up green prices directly. Or consumers' demand for green products can "
         "strengthen, for example because of environmental regulation, driving up green firms' profits and so their "
         "stock prices. Falling demand for brown assets or products works the same way.</p>"
         "<p><b>Here.</b> The ban is a surprise that raises demand for heat pumps. Profits rise and the share price "
         "jumps. That is the consumer channel. It gives a high realised return.</p>"
         "<p><b>The traps.</b> A taste premium is about investors' preferences for green shares. It lowers expected "
         "returns. A risk premium would require green firms to be riskier, while the paper says they hedge climate "
         "risk. Neither explains a sudden jump.</p>"
         "<p><b>Remember:</b> surprises move realised returns; they are not evidence of higher expected "
         "returns.</p>",
)

statisk(
    "esg-s12", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the difference between past outperformance and future expected returns.",
        "Realised return equals expected return plus surprise. Ask what a large past surprise does to today's "
        "price.",
        "<p><b>Step 1: why did green beat brown?</b> A high expected return or a surprise?</p>"
        "<p><b>Step 2: after the price has jumped,</b> what does a new buyer pay for the same cash flows?</p>"
        "<p><b>Step 3: what does that mean</b> for the return from here?</p>",
    ),
    q="<p>A fund's brochure says: «Our green portfolio beat brown stocks by a wide margin over the last decade, so it "
      "will keep doing so.» Based on lecture 9, what is the main flaw?</p>",
    alternativer=[
        R("The gain came from a repricing, which lowers future expected returns"),
        F("None: realised returns are the best estimate of expected returns",
          "A decade can be dominated by one surprise. Lecture 9's key point is that realised and expected returns "
          "can differ."),
        F("It ignores that green stocks carry more climate risk, which is what earned the premium",
          "Green stocks hedge climate risk; they are safer, not riskier. No risk premium explains the gain."),
        F("The horizon: a decade is too short to see a taste premium",
          "The problem is not the length of the window but what drove the returns in it."),
    ],
    kort="<p><b>The outperformance came from a repricing.</b> Climate concerns rose by surprise and lifted green "
         "prices. That raised past returns and lowered expected returns from here.</p>",
    full="<p><b>The evidence.</b> In Pástor, Stambaugh and Taylor (2022), a green-minus-brown portfolio earned a "
         "cumulative 174%. Purged of the unanticipated rise in climate concerns, its counterfactual return is "
         "essentially flat. Green did not beat brown because it carries a higher expected return. It beat brown "
         "because of a surprise.</p>"
         "<p><b>Why the future looks different.</b> The repricing itself lowers future expected returns, since the "
         "same cash flows now cost more. Unless climate concerns keep rising faster than expected, a buyer today "
         "should expect green to earn less than brown, not more.</p>"
         "<p><b>The traps.</b> Treating realised returns as expected returns is the error the lecture warns about. "
         "Green stocks are a hedge, so «more climate risk» is backwards. This is also part 5 of the group project: "
         "is the sustainability story already priced?</p>"
         "<p><b>Remember:</b> high past returns are not high expected returns.</p>",
)

statisk(
    "esg-s13", tema="esg-priser", type="fakta",
    hjelp=hjelp3(
        "This is about the counterfactual test in «Dissecting green returns».",
        "The authors compute an ex-post estimate of the green-minus-brown expected return by purging unanticipated "
        "shocks from its average realised return.",
        "<p><b>Step 1: which way did the climate shocks push green returns?</b></p>"
        "<p><b>Step 2: remove that push.</b> What is left if the shocks drove the outperformance?</p><p><b>Step 3: compare</b> what is left with the realised gap.</p>",
    ),
    q="<p>Pástor, Stambaugh and Taylor (2022) strip the effect of unanticipated shocks to climate concerns out of the "
      "realised green-minus-brown return. What is left?</p>",
    alternativer=[
        R("A counterfactual return that is essentially flat"),
        F("A green premium about as large as before",
          "The purge removes the part of the return that came from climate surprises. That part was most of it."),
        F("A large brown premium, with brown far ahead of green",
          "The purge removes the green surprise. It does not create a brown advantage of the same size."),
        F("A gap twice as large as the realised one",
          "Removing positive surprises cannot make the green return larger."),
    ],
    kort="<p><b>Essentially flat.</b> Without the strengthening of climate concerns, green stocks would not have "
         "outperformed brown ones.</p>",
    full="<p><b>The test.</b> Green-minus-brown (GMB) earned a cumulative realised return of 174%, with a monthly "
         "Sharpe ratio of 0.33 against 0.30 for the stock market in the same bull market. Pástor, Stambaugh and "
         "Taylor (2022) then estimate what GMB was expected to earn, by purging unanticipated shocks to climate "
         "concerns from the realised return.</p>"
         "<p><b>The result.</b> The counterfactual GMB is essentially flat. Green would not have beaten brown "
         "without strengthening climate concerns. In bonds the same pattern appears: the greenium widened.</p>"
         "<p><b>Why it matters.</b> This is the evidence behind the lecture's key distinction. The outperformance "
         "was a surprise, not a reward that green stocks can be expected to earn.</p>"
         "<p><b>The traps.</b> A surviving premium, a large brown premium or a bigger gap all misread what removing "
         "positive green surprises does.</p>"
         "<p><b>Remember:</b> strip out the climate surprises and green's outperformance disappears.</p>",
)

statisk(
    "esg-s14", tema="esg-priser", type="begrep",
    hjelp=hjelp3(
        "This is about the greenium on bonds and what it means when it widens.",
        "The greenium is the yield gap between a green bond and a comparable conventional bond. Bond prices and "
        "yields move in opposite directions.",
        "<p><b>Step 1: which bond has the lower yield</b> when there is a greenium?</p>"
        "<p><b>Step 2: what does a wider gap mean</b> for green bond yields and prices?</p><p><b>Step 3: translate</b> the price change into realised returns.</p>",
    ),
    q="<p>Pástor, Stambaugh and Taylor (2022) report that the greenium in bonds widened as climate concerns grew. "
      "What does that mean?</p>",
    alternativer=[
        R("Green bonds' yield discount to comparable bonds grew"),
        F("Green bonds' yields rose above those of comparable bonds",
          "A greenium is a lower yield on green bonds. A yield above comparable bonds would be the opposite."),
        F("Green bond issuers had to pay higher coupons to attract buyers",
          "A wider greenium means buyers accept less, not more, from green issuers."),
        F("Green bonds earned lower realised returns than comparable bonds",
          "A widening greenium means green bond prices rose relative to others, which lifts their realised "
          "returns."),
    ],
    kort="<p><b>The yield gap grew.</b> Green bonds' yields fell further below those of comparable bonds, so their "
         "prices rose relative to others: the bond version of the green repricing.</p>",
    full="<p><b>The greenium.</b> Investors who like green assets accept a lower yield on a green bond than on a "
         "comparable conventional bond. That yield discount is the greenium.</p>"
         "<p><b>Here.</b> As climate concerns grew, the gap widened: green bond yields fell further below comparable "
         "yields. Lower yields mean higher prices, so green bonds gained in price relative to others. That is the "
         "same pattern as in stocks: a surprise shift towards green raised green prices and realised returns.</p>"
         "<p><b>The link.</b> A wider greenium also means a lower expected return for whoever buys the green bond "
         "now, just as for green stocks after a repricing. For the issuer it means cheaper funding: the "
         "cost-of-capital channel.</p>"
         "<p><b>The traps.</b> The greenium is a lower yield, not a higher one. Its widening lifts green bonds' "
         "realised returns.</p>"
         "<p><b>Remember:</b> greenium = lower yield on green bonds; a wider greenium means green bonds got "
         "pricier.</p>",
)

# ---------------------------------------------------------------------------
# CAPM, alfa, APT og ESG som faktor
# ---------------------------------------------------------------------------

statisk(
    "esg-s15", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about alpha and the security market line in the CAPM. The slide formula gets the sign of alpha "
        "wrong, so reason in words.",
        "The SML gives the expected return an asset should have for its beta: R<sub>f</sub> + β(E(R<sub>m</sub>) − "
        "R<sub>f</sub>). Alpha is how far the asset's expected return lies above or below that line. Prices adjust "
        "until assets are back on the line.",
        "<p><b>Step 1: is the expected return too high or too low for the risk?</b></p>"
        "<p><b>Step 2: what would investors do</b> with a stock that pays more than its risk requires?</p>"
        "<p><b>Step 3: what does that do to the price and the expected return?</b></p>",
    ),
    q="<p>An analyst estimates that a wind-turbine maker's expected return is well above what the security market "
      "line requires for its beta. In the CAPM, what does this mean and what should happen next?</p>",
    alternativer=[
        R("Underpriced with a positive alpha; its price rises until it is back on the line"),
        F("Overpriced with a negative alpha; its price falls until it is back on the line",
          "This describes a stock below the line, whose expected return is too low for its beta."),
        F("Fairly priced, since a high expected return is the reward for its beta",
          "The reward for beta is what the line requires. Anything above that is not a reward for market risk."),
        F("Underpriced with a positive alpha; its expected return keeps on rising",
          "As the price rises, the expected return falls back. It does not keep rising."),
    ],
    kort="<p><b>Underpriced, positive alpha; the price rises.</b> Too much expected return for the risk attracts "
         "buyers. That pushes the price up and the expected return down to the line.</p>",
    full="<p><b>The SML.</b> In the CAPM, the expected return an asset should earn is R<sub>f</sub> + "
         "β(E(R<sub>m</sub>) − R<sub>f</sub>). Plotted against beta, that is the security market line. Alpha is the "
         "gap between an asset's expected return and the line.</p>"
         "<p><b>Above the line.</b> An asset that offers more expected return than its beta requires is a bargain: "
         "underpriced, α &gt; 0. Investors buy, the price rises and the expected return falls until the asset is "
         "back on the line. Below the line the logic runs the other way: too little return for the risk, "
         "overpriced, α &lt; 0, the price falls.</p>"
         "<p><b>A warning about the slides.</b> The formula on the slides in lectures 8 and 9 writes alpha with the "
         "wrong sign. Trust the words: too low a return for the risk means overpriced and negative alpha.</p>"
         "<p><b>Remember:</b> above the SML is underpriced (α &gt; 0); below is overpriced (α &lt; 0); prices move "
         "to close the gap.</p>",
)

statisk(
    "esg-s16", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the two ways ESG could affect stock prices in lecture 9: through risk or through mispricing.",
        "Risk: better-ESG stocks may be less exposed to market risk, or ESG may be a separate systematic factor. "
        "Mispricing: better-ESG stocks may be overpriced (negative alpha) or underpriced (positive alpha).",
        "<p><b>Step 1: study X.</b> Is a lower beta a statement about risk or about a gap from the line?</p>"
        "<p><b>Step 2: study Y.</b> Is a return above what beta justifies a reward for risk or an alpha?</p>",
    ),
    q="<p>Study X finds that firms with high ESG scores have lower market betas. Study Y finds that high-ESG firms earn "
      "returns above what their betas justify. In lecture 9's terms, which explanation does each study point "
      "to?</p>",
    alternativer=[
        R("X points to risk and Y to mispricing"),
        F("X points to mispricing and Y to risk",
          "This swaps the two. Ask which study is about beta itself and which about returns beyond it."),
        F("Both point to risk, since both studies use beta",
          "Mentioning beta is not enough. Ask whether the return is explained by risk or left over after it."),
        F("Both point to mispricing, since both find an ESG effect",
          "Finding an ESG effect is not enough. One effect works through the amount of risk."),
    ],
    kort="<p><b>X points to risk and Y to mispricing.</b> A lower beta means less market risk. A return beyond what "
         "beta justifies is a positive alpha: underpricing.</p>",
    full="<p><b>Two explanations.</b> Lecture 9 asks how ESG characteristics affect stock pricing. Through risk: are "
         "stocks with better ESG less risky, for example with less market risk, or is ESG a separate systematic risk "
         "factor? Through mispricing: are better-ESG stocks overpriced (α &lt; 0) or underpriced (α &gt; 0)? Either "
         "way, measuring ESG is the first challenge.</p>"
         "<p><b>Here.</b> Study X is about how much market risk the firms carry: lower beta, so a lower required "
         "return. That is the risk explanation. Study Y finds returns beyond what beta justifies: a positive alpha, "
         "the mispricing explanation.</p>"
         "<p><b>Why it matters.</b> The two imply different futures. If ESG lowers risk, high-ESG stocks should earn "
         "less, as a fair reward. If they are underpriced, they should earn more until prices correct.</p>"
         "<p><b>Remember:</b> beta is risk; alpha is mispricing.</p>",
)

statisk(
    "esg-s17", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about which risks earn a premium in the arbitrage pricing theory (APT).",
        "In the APT, expected return is the risk-free rate plus, for each systematic factor, the asset's "
        "sensitivity (β) times the factor's premium (λ).",
        "<p><b>Step 1: is the spill risk linked to any systematic factor?</b></p>"
        "<p><b>Step 2: what happens to it in a diversified portfolio?</b></p>"
        "<p><b>Step 3: would investors be paid for bearing it?</b></p>",
    ),
    q="<p>A firm faces the risk of a one-off local spill with no link to the market or to any other systematic factor. "
      "Investors can diversify it away by holding many stocks. In the APT, does this risk earn a premium in "
      "expected return?</p>",
    alternativer=[
        R("No, since only systematic factor risk earns a premium"),
        F("Yes, since the spill raises the volatility of the firm's own stock",
          "Firm-specific volatility washes out in a diversified portfolio, so investors are not paid for bearing it."),
        F("Yes, if the spill would be large relative to the firm",
          "Size does not matter for pricing if the risk can be diversified away. It may still matter for expected "
          "cash flows."),
        F("No, since the risk is already priced through the firm's market beta",
          "The spill has no link to the market, so beta does not capture it."),
    ],
    kort="<p><b>No.</b> In the APT only undiversifiable, systematic risk earns a premium. A one-off firm-specific "
         "spill can be diversified away, so it carries none.</p>",
    full="<p><b>The APT.</b> The arbitrage pricing theory generalises the CAPM to several systematic factors. "
         "Expected return is the risk-free rate plus, for each factor, the asset's sensitivity to it (β) times the "
         "factor's premium (λ). Only undiversifiable risk earns a premium.</p>"
         "<p><b>Here.</b> The spill risk is specific to one firm and unrelated to any factor. In a portfolio of many "
         "stocks it washes out, so investors are not paid for bearing it. It can still matter for the firm's "
         "expected cash flows: an analyst should build the expected cost of a spill into the forecast, which is the "
         "cash-flow channel.</p>"
         "<p><b>The open question.</b> Lecture 9 asks whether ESG is a separate systematic risk factor. The evidence is mixed and the debate is open. This particular risk, though, is not systematic and is not part of beta either.</p>"
         "<p><b>Remember:</b> diversifiable risk earns no premium; only systematic factor risk does.</p>",
)

statisk(
    "esg-s18", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the three tests Research Affiliates sets for calling something a factor.",
        "A factor needs a solid research base. It must also hold up when you change two things: how you measure it "
        "and where you test it.",
        "<p><b>Step 1: what did the researcher change</b> between the tests?</p>"
        "<p><b>Step 2: which test is about that change?</b> The measure stayed the same.</p><p><b>Step 3: match</b> the change to one of the three tests.</p>",
    ),
    q="<p>A researcher finds an ESG long-short premium in US stocks, but it disappears when she repeats the test in "
      "Europe and Asia. Which of Research Affiliates' three tests for a factor does ESG fail here?</p>",
    alternativer=[
        R("Robust across geographies"),
        F("Robust across definitions",
          "That test asks whether the premium survives different ways of measuring ESG. Here the measure is the "
          "same; the markets differ."),
        F("Grounded in a long and deep academic literature",
          "That test is about the research base behind the factor, not about where it works."),
        F("Priced by the market beta in the CAPM",
          "This is not one of the three tests. A factor premium must come on top of what market beta explains."),
    ],
    kort="<p><b>Robust across geographies.</b> A premium that exists in only one market fails the test that a factor "
         "should hold across regions.</p>",
    full="<p><b>The three tests.</b> Research Affiliates says a factor should be (1) grounded in a long and deep "
         "academic literature, (2) robust across definitions and (3) robust across geographies.</p>"
         "<p><b>Here.</b> The definition is the same; only the market changes. The premium survives in the US and "
         "vanishes in Europe and Asia. That fails test 3.</p>"
         "<p><b>Does ESG pass?</b> Not clearly. Some studies find that ESG adds to returns (Clark, Feiner and Viehs "
         "2015; Friede, Busch and Bassen 2015; Khan, Serafeim and Yoon 2016). Others find that it detracts "
         "(Brammer, Brooks and Pavelin 2006; Fabozzi, Ma and Oliphant 2008; Hong and Kacperczyk 2009). There is no "
         "agreed risk-based or behavioural explanation. Research Affiliates' own long-short tests in Europe found no "
         "significant premium.</p>"
         "<p><b>Remember:</b> literature, definitions, geographies: a factor must pass all three. ESG does not clearly do so.</p>",
)

statisk(
    "esg-s19", tema="esg-priser", type="paastand",
    hjelp=hjelp3(
        "This is about the state of the research on whether ESG earns a return premium.",
        "Lecture 9 lists one group of studies finding that ESG is additive to returns and another finding that it "
        "detracts. It also asks whether there is a risk-based or behavioural explanation.",
        "<p><b>Step 1: do the two groups of studies agree?</b></p>"
        "<p><b>Step 2: is there an accepted explanation?</b></p>"
        "<p><b>Step 3: how did the lecture describe the debate?</b> Is it settled or still open?</p>",
    ),
    q="<p>Which statement best sums up the evidence on ESG as a return factor in lecture 9?</p>",
    alternativer=[
        R("Studies disagree on whether ESG adds to returns or detracts from them"),
        F("Studies agree that ESG adds to returns, for behavioural reasons",
          "The studies disagree. No behavioural explanation is agreed either."),
        F("Studies agree that ESG detracts from returns, for risk reasons",
          "The studies disagree. No risk-based explanation is agreed either."),
        F("ESG passes the tests for a factor, though its premium is small",
          "ESG does not clearly pass the tests for a factor. The lecture calls the debate ongoing."),
    ],
    kort="<p><b>The studies disagree.</b> Some find that ESG adds to returns, others that it detracts. No risk-based or "
         "behavioural explanation is agreed. The debate is ongoing.</p>",
    full="<p><b>The evidence.</b> Research Affiliates find little agreement on whether ESG robustly earns a return "
         "premium. Clark, Feiner and Viehs (2015), Friede, Busch and Bassen (2015) and Khan, Serafeim and Yoon "
         "(2016) find that ESG adds to returns. Brammer, Brooks and Pavelin (2006), Fabozzi, Ma and Oliphant (2008) "
         "and Hong and Kacperczyk (2009) find that it detracts. Nor is there evidence for a risk-based or "
         "behavioural explanation of an ESG factor.</p>"
         "<p><b>Their own test.</b> Long-short strategies in Europe from July 2009 to June 2020: ESG −0.1% a year, "
         "environmental 2.2%, social −0.9%, governance −1.9%. None is statistically significant.</p>"
         "<p><b>The lecture's conclusion.</b> «There is still an ongoing debate in academia!»</p>"
         "<p><b>The traps.</b> Any option that says the studies agree, in either direction, or that ESG passes as a factor overstates the evidence.</p>"
         "<p><b>Remember:</b> on ESG as a factor, the evidence is mixed and the debate is open.</p>",
)

statisk(
    "esg-s20", tema="esg-priser", type="fakta",
    hjelp=hjelp3(
        "This is about what Research Affiliates' long-short tests of ESG in Europe showed.",
        "A factor premium must be distinguishable from zero and robust. An average that is positive or negative in "
        "one sample can still be noise.",
        "<p><b>Step 1: look past the sign of each average.</b> Was any of them reliably different from zero?</p>"
        "<p><b>Step 2: what does that mean</b> for calling ESG, or any single pillar, a factor?</p>",
    ),
    q="<p>Research Affiliates ran long-short strategies in Europe on a combined ESG score and on each of the E, S "
      "and G pillars. Some average returns came out positive, others negative. What did the tests show?</p>",
    alternativer=[
        R("None of the strategies earned a premium distinguishable from zero"),
        F("The environmental strategy proved a robust factor, unlike the others",
          "Its average was the highest of the four, but it was not statistically significant. One sample does not "
          "make a robust factor."),
        F("Governance carried a reliable negative premium that investors should avoid",
          "The governance average was negative, but not significant. It is not a reliable premium in either "
          "direction."),
        F("The combined ESG strategy earned a reliable premium once the pillars were pooled",
          "The combined ESG strategy averaged close to zero and was not significant either."),
    ],
    kort="<p><b>None was distinguishable from zero.</b> Positive or negative, no average was statistically "
         "significant, so the tests give no reliable ESG premium in Europe.</p>",
    full="<p><b>The test.</b> Research Affiliates ran long-short strategies in Europe from July 2009 to June 2020. "
         "Average returns per year: ESG −0.1%, environmental 2.2%, social −0.9%, governance −1.9%. None is "
         "statistically significant.</p>"
         "<p><b>What it means.</b> The signs differ, which tempts you to pick a winner or a loser. But an "
         "insignificant average can come from luck in one sample. A factor also has to pass Research Affiliates' "
         "tests: a long and deep literature, robustness across definitions and robustness across geographies. One "
         "insignificant European sample passes none of them.</p>"
         "<p><b>The bigger picture.</b> The academic evidence is mixed: some studies find ESG adds to returns, "
         "others that it detracts. The lecture concludes that the debate is ongoing.</p>"
         "<p><b>Remember:</b> an average that is not significant is not a factor, whatever its sign.</p>",
)

# ---------------------------------------------------------------------------
# Fra investormål til strategi
# ---------------------------------------------------------------------------

statisk(
    "esg-s21", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's four investor objectives and the strategy and typology each maps "
        "to.",
        "FV is financial value, SEV social and environmental value, IV integrated value. The objectives differ in "
        "what is maximised and what is only a constraint: FV alone, FV with a floor on SEV, the sum of both, or SEV "
        "with a floor on FV.",
        "<p><b>Step 1: what does the mandate maximise?</b></p>"
        "<p><b>Step 2: does social value enter as a goal, an equal term or a limit?</b></p>"
        "<p><b>Step 3: match</b> the objective to its strategy and typology.</p>",
    ),
    q="<p>A state fund's mandate says: maximise financial return, but never hold companies that make cluster munitions "
      "or earn most of their revenue from thermal coal. In Schoenmaker and Schramade's scheme, which objective, "
      "strategy and typology fit?</p>",
    alternativer=[
        R("Max FV s.t. minimum SEV: exclusionary screening, SF 1.0"),
        F("Max IV = FV + SEV: ESG integration, SF 2.0",
          "The mandate does not weigh social and environmental value equally with return. It only sets limits."),
        F("Max SEV s.t. minimum FV: impact investing, SF 3.0",
          "The goal here is financial return. Social value enters only as a limit, not as the goal."),
        F("Max FV: risk/return optimisation, finance as usual",
          "Finance as usual has no social or environmental limit at all. This mandate has one."),
    ],
    kort="<p><b>Max FV subject to a minimum SEV: exclusionary screening, SF 1.0.</b> Return is the goal; the bans set "
         "a floor on social value.</p>",
    full="<p><b>The four objectives.</b> Schoenmaker and Schramade turn investor preferences into four objectives. Max "
         "FV: risk/return optimisation, finance as usual. Max FV subject to SEV ≥ a minimum: exclusionary screening, "
         "SF 1.0. Max IV = FV + SEV: ESG integration, SF 2.0. Max SEV subject to FV ≥ a minimum: impact investing, "
         "SF 3.0.</p>"
         "<p><b>Here.</b> The fund maximises financial return. The bans on cluster munitions and coal are limits it "
         "must respect, not a goal it pursues. That is Max FV subject to a minimum SEV: exclusionary screening, SF "
         "1.0, the same logic as the emission-capped portfolio in lecture 8.</p>"
         "<p><b>The ladder.</b> Down the ladder, social and environmental value moves from a constraint, to an equal "
         "term, to the goal. Financial value moves from the goal to a constraint.</p>"
         "<p><b>Remember:</b> a return goal with a list of bans is SF 1.0 exclusionary screening.</p>",
)

statisk(
    "esg-s22", tema="esg-priser", type="paastand",
    hjelp=hjelp3(
        "This is about the sustainable finance ladder applied to portfolio objectives.",
        "Exclusionary screening: Max FV subject to a minimum SEV. ESG integration: Max IV = FV + SEV. Impact "
        "investing: Max SEV subject to a minimum FV.",
        "<p><b>Step 1: in each objective,</b> is SEV what is maximised, part of what is maximised or a limit?</p>"
        "<p><b>Step 2: read the three in order</b> and describe how the role of SEV changes.</p>",
    ),
    q="<p>Moving from exclusionary screening to ESG integration to impact investing in Schoenmaker and Schramade's "
      "scheme, how does the role of social and environmental value (SEV) change?</p>",
    alternativer=[
        R("It moves from a constraint, to an equal term, to the goal"),
        F("It moves from the goal, to an equal term, to a constraint",
          "This runs the ladder backwards. In screening, financial value is the goal."),
        F("It stays a constraint throughout, while its floor rises",
          "In two of the three steps, SEV is more than a constraint."),
        F("It is absent in screening and becomes a constraint in impact investing",
          "Screening already sets a floor on SEV. Impact investing does more than set a floor."),
    ],
    kort="<p><b>From a constraint, to an equal term, to the goal.</b> Screening puts a floor under SEV, integration "
         "adds it to FV and impact investing maximises it. Financial value moves the other way.</p>",
    full="<p><b>The ladder.</b> This is chapter 1's typology applied to a portfolio. SF 1.0 maximises F subject to S "
         "and E: here Max FV subject to a minimum SEV, exclusionary screening. SF 2.0 optimises integrated value: "
         "Max IV = FV + SEV, ESG integration. SF 3.0 optimises S and E subject to F: Max SEV subject to a minimum "
         "FV, impact investing.</p>"
         "<p><b>The pattern.</b> Down the ladder, social and environmental value moves from a constraint, to an "
         "equal term, to the goal. Financial value moves the other way: from the goal, to an equal term, to a "
         "constraint.</p>"
         "<p><b>Why it matters.</b> Classifying a strategy is about what the investor puts first and what it only "
         "protects. A screener protects a floor on harm while chasing return. An impact investor chases impact "
         "while protecting a floor on return. Part 1 of the group project asks which objective your strategy "
         "serves.</p>"
         "<p><b>Remember:</b> SEV climbs from constraint to equal term to goal; FV goes the other way.</p>",
)

statisk(
    "esg-s23", tema="esg-priser", type="fakta",
    hjelp=hjelp3(
        "This is about how investors say they use ESG information, according to the global survey shown in lecture "
        "9.",
        "The survey compares engagement, full integration into stock valuation, negative screening and thematic "
        "investment with not using ESG information at all.",
        "<p><b>Step 1: which method is the oldest and best known?</b> Did it come first?</p>"
        "<p><b>Step 2: where did the methods that need work on each firm rank?</b> Think of engagement and "
        "valuation.</p>",
    ),
    q="<p>Amel-Zadeh and Serafeim's (2018) global survey asked investors how they use ESG information. Which pattern "
      "did the ranking of methods show?</p>",
    alternativer=[
        R("Engagement and full integration into valuation both ranked above negative screening"),
        F("Negative screening, the oldest strategy, ranked first by a wide margin",
          "Negative screening was widely used, but it did not come first."),
        F("Thematic investment ranked first, ahead of engagement and integration",
          "Thematic investment was among the less common methods in the survey."),
        F("Investors who ignore ESG information outnumbered those who engage",
          "Only a minority said they do not use ESG information, far fewer than those who engage."),
    ],
    kort="<p><b>Engagement and full integration came ahead of negative screening.</b> Engagement was the most common "
         "method, with integration close behind. Screening, the best-known strategy, came third.</p>",
    full="<p><b>The survey.</b> Amel-Zadeh and Serafeim (2018), «Why and how investors use ESG information», asked "
         "investors worldwide. In lecture 8, 82.1% said they consider ESG information. In lecture 9 the methods are "
         "ranked: engagement 37.1%, full integration into stock valuation 34.4%, negative screening 30.0%, thematic "
         "investment 20.8%; 16.6% do not use ESG information at all.</p>"
         "<p><b>The pattern.</b> Negative screening is the oldest and best-known strategy, so many expect it to come "
         "first. In this survey engagement and integration come ahead of it. Both need work on each firm: "
         "engagement needs knowledge of the company, integration needs a valuation model.</p>"
         "<p><b>The link.</b> Lecture 9 also counts overlay or portfolio tilt and risk factor investing as variants "
         "of thematic investing.</p>"
         "<p><b>Remember:</b> in the survey, engagement and integration lead and negative screening follows.</p>",
)

statisk(
    "esg-s24", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about how lecture 9 groups the ESG strategies that adjust a portfolio's exposure to ESG criteria.",
        "Lecture 9 sorts strategies into screening (meeting pre-defined criteria or not), a broad thematic group "
        "(adjusting exposure to ESG criteria, with three variants), ESG integration, engagement and impact "
        "investing.",
        "<p><b>Step 1: is anything screened out?</b></p>"
        "<p><b>Step 2: is any firm valued?</b></p>"
        "<p><b>Step 3: what is left</b> when a manager only adjusts weights? Think of the variants in the broad thematic group.</p>",
    ),
    q="<p>A quantitative manager keeps an index's sectors and stocks but shifts the weights a little towards stocks "
      "with high ESG scores and away from those with low scores. No stock is removed. How does lecture 9 classify "
      "this?</p>",
    alternativer=[
        R("Overlay or portfolio tilt, a variant of thematic investing"),
        F("Best-in-class screening, since low scorers lose weight in each sector",
          "Best-in-class admits only firms that clear a hurdle within their sector. Here no stock is removed."),
        F("ESG integration, since ESG scores enter the portfolio",
          "Integration puts material ESG issues into each firm's valuation. Here scores shift index weights without "
          "any valuation."),
        F("Impact investing, since it raises the portfolio's ESG",
          "Impact investing intends and measures real-world impact. A higher portfolio score is neither."),
    ],
    kort="<p><b>Overlay or portfolio tilt.</b> Shifting weights towards high ESG scores without removing stocks "
         "adjusts exposure to ESG criteria. Lecture 9 counts it as a variant of thematic investing.</p>",
    full="<p><b>The grouping.</b> Lecture 9 lists the strategies as follows. Screening, based on whether companies meet "
         "pre-defined ESG criteria: negative or exclusionary, positive or best-in-class. Thematic investing, which "
         "adjusts exposure to pre-defined ESG criteria, with three variants: thematic investing itself, overlay or "
         "portfolio tilt and risk factor or risk premium investing. ESG integration into fundamental valuation. "
         "Engagement or active ownership. Impact investing.</p>"
         "<p><b>Here.</b> Nothing is screened out and nothing is valued. The manager tilts index weights towards "
         "high scores. That is an overlay or portfolio tilt, in the thematic group.</p>"
         "<p><b>The traps.</b> A tilt is not a screen, because every stock stays. It is not integration, because no "
         "cash flow or discount rate changes. A higher portfolio score is not measured real-world impact.</p>"
         "<p><b>Remember:</b> tilting weights by ESG score is an overlay, which lecture 9 files under thematic "
         "investing.</p>",
)

# ---------------------------------------------------------------------------
# Engasjere eller selge? Vaskemaskinen og nedsalg
# ---------------------------------------------------------------------------

statisk(
    "esg-s25", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the first of the two ways investors can change firms in Gollier and Pouget's work.",
        "Investors can change firms by voting with their feet, refusing to hold them, or by activism. Fewer willing "
        "buyers for a firm's securities mean it must offer them a higher expected return.",
        "<p><b>Step 1: if many investors refuse a stock,</b> what happens to its price for given cash flows?</p>"
        "<p><b>Step 2: what does that mean for the return the firm must offer</b> on new capital?</p>",
    ),
    q="<p>Many responsible investors refuse to hold shares in a chemicals firm that pollutes heavily. According to "
      "Gollier and Pouget (2014), through what channel can this «voting with their feet» put pressure on the "
      "firm?</p>",
    alternativer=[
        R("It raises the polluter's cost of capital"),
        F("It lowers the polluter's cost of capital",
          "This gets the direction wrong. Fewer willing investors make capital dearer, not cheaper."),
        F("It gives the investors votes at the general meeting",
          "Investors who do not hold the shares have no votes to cast."),
        F("It obliges the firm to report under the CSRD",
          "Who owns the shares does not decide whether a firm must report under CSRD."),
    ],
    kort="<p><b>It raises the polluter's cost of capital.</b> With fewer willing investors, the firm's shares trade "
         "cheaper relative to its cash flows, so new capital is dearer.</p>",
    full="<p><b>Two channels.</b> Gollier and Pouget (2014) contrast two ways investors can change firms. They can vote "
         "with their feet: responsible investors avoid polluters, which raises the polluters' cost of capital. Or "
         "they can use activism: buy, engage and change the firm.</p>"
         "<p><b>Here.</b> The responsible investors avoid the chemicals firm. With fewer buyers, its shares trade at "
         "a lower price for the same cash flows. The expected return rises and with it the firm's cost of capital. "
         "Expanding becomes more expensive, which is the pressure.</p>"
         "<p><b>The flip side.</b> The higher cost of capital also means the polluter's shares offer a higher "
         "expected return to those who do hold them. That is what the «washing machine» exploits: a large activist "
         "buys the cheap polluter, makes it responsible and earns the repricing.</p>"
         "<p><b>Remember:</b> avoiding a polluter raises its cost of capital; buying and reforming it is the washing "
         "machine.</p>",
)

statisk(
    "esg-s26", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the conditions under which Gollier and Pouget's «washing machine» strategy works.",
        "The washing machine: a large activist investor can earn positive abnormal returns by buying "
        "non-responsible companies and turning them into responsible ones. It works only under two conditions "
        "about the investor.",
        "<p><b>Step 1: how long does it take to turn a polluter into a responsible firm?</b></p>"
        "<p><b>Step 2: why would the market believe this fund</b> will see the change through?</p><p><b>Step 3: check this fund</b> against both answers.</p>",
    ),
    q="<p>A hedge fund with a six-month horizon and no record of caring about social goals buys a polluter and "
      "promises to clean it up. Based on Gollier and Pouget's (2014) «washing machine», why is it unlikely to earn "
      "the abnormal return?</p>",
    alternativer=[
        R("The strategy needs a long horizon and a credible pro-social orientation"),
        F("The strategy only works for passive investors who hold the whole index",
          "Passive investors are the least able to do this. The washing machine needs a large activist."),
        F("Abnormal returns come from shorting polluters, not from buying them",
          "The washing machine buys non-responsible firms. Shorting is not part of it."),
        F("Polluters trade at a premium, so there is no discount to remove",
          "Polluters trade cheaply because their cost of capital is higher. That discount is what the strategy "
          "targets."),
    ],
    kort="<p><b>It needs a long horizon and a credible pro-social orientation.</b> A six-month fund with no record "
         "cannot convince the market that the firm will change, so the discount stays.</p>",
    full="<p><b>The washing machine.</b> Gollier and Pouget (2014): a large activist investor can generate positive "
         "abnormal returns by investing in non-responsible companies and turning them into responsible ones. It "
         "works only with a long horizon and a credible pro-social orientation.</p>"
         "<p><b>Why it pays.</b> A polluter has a higher cost of capital, so it trades cheaply relative to its cash "
         "flows. An activist who buys it and makes it responsible removes the reason for the discount. The price "
         "then rises. The gain is a realised return from a repricing that the investor itself causes.</p>"
         "<p><b>Here.</b> Reform takes years. The price rises only when the market believes the change is real. A "
         "fund with a six-month horizon and no pro-social record fails both conditions.</p>"
         "<p><b>The traps.</b> The strategy buys polluters because they are cheap. It does not short them. Passive investors cannot run it.</p>"
         "<p><b>Remember:</b> the washing machine needs a large, patient and credible activist.</p>",
)

statisk(
    "esg-s27", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about the evidence in lecture 9 on whether blanket divestment from energy firms helps green "
        "innovation.",
        "The study compares firms' ESG scores with their green patents. The question is whether firms with low ESG "
        "scores, often excluded from ESG funds, are poor or strong green innovators.",
        "<p><b>Step 1: recall what the study found</b> about green patents in oil, gas and energy firms.</p>"
        "<p><b>Step 2: what happens to that innovation</b> if these firms lose access to capital?</p>",
    ),
    q="<p>A climate fund excludes every oil, gas and energy company, hoping to speed up green innovation by cutting "
      "their access to capital. What does «The ESG-Innovation Disconnect» by Cohen, Gurun and Nguyen (2020) "
      "suggest?</p>",
    alternativer=[
        R("It may starve key green innovators; rewards may work better"),
        F("It helps, since these firms produce few and weak green patents",
          "The finding is the opposite: these firms produce more and higher-quality green patents."),
        F("It has no effect, since energy firms do not innovate at all",
          "The study finds that energy firms are key green innovators."),
        F("It helps, since low ESG scores reliably flag poor innovators",
          "The study's point is that low ESG scores and strong green innovation go together in these firms."),
    ],
    kort="<p><b>It may cut capital from key green innovators.</b> Oil, gas and energy firms, with low ESG scores and "
         "often excluded, produce more and higher-quality green patents. Reward-based incentives may work "
         "better.</p>",
    full="<p><b>The study.</b> Cohen, Gurun and Nguyen (2020), «The ESG-Innovation Disconnect», find that oil, gas and "
         "energy firms, which have low ESG scores and are often excluded from ESG funds, are key green innovators. "
         "They produce more and higher-quality green patents.</p>"
         "<p><b>The implication.</b> Blanket exclusion may cut capital from the firms that do the most green "
         "innovation. Reward-based incentives may work better than exclusion.</p>"
         "<p><b>The link.</b> This is the lecture's answer to «Divestment: does it work?». Voting with your feet "
         "raises a firm's cost of capital (Gollier and Pouget 2014). But if the firm is also a green innovator, "
         "that pressure can slow the very innovation the investor wants.</p>"
         "<p><b>The trap.</b> A low ESG score does not mean low green innovation. The two can point in different "
         "directions: that is the «disconnect» in the title.</p>"
         "<p><b>Remember:</b> excluding energy firms wholesale can starve green innovation.</p>",
)

# ---------------------------------------------------------------------------
# Hvilken metode passer hvilken investor?
# ---------------------------------------------------------------------------

statisk(
    "esg-s28", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about which sustainability methods suit fundamental, quant and passive equity investors.",
        "Schoenmaker and Schramade rate six methods for three investor types. Methods that need fundamental "
        "analysis of each firm suit fundamental investors; methods that can run on scores also suit the others.",
        "<p><b>Step 1: what can a quant fund do?</b> Work with scores and data, not firm-by-firm analysis.</p>"
        "<p><b>Step 2: which methods need fundamental analysis?</b> Rule them out and pick the best of what is left.</p>",
    ),
    q="<p>A quantitative fund picks stocks only from factors computed in large data sets and does no "
      "company-by-company analysis. According to Schoenmaker and Schramade's table of methods by investor type, "
      "which sustainability method suits it best?</p>",
    alternativer=[
        R("Exclusionary screening, since it can be run on ESG scores"),
        F("ESG integration, since its factor model can absorb ESG scores",
          "Integration needs fundamental analysis of each firm. The table rates it very low for quant investors."),
        F("Impact investing, since impact can be expressed as a score",
          "Impact investing needs fundamental analysis. The table rates it very low for quant investors."),
        F("Active ownership, since a quant fund holds many companies",
          "Engagement needs knowledge of each firm. The table rates it low for quant investors."),
    ],
    kort="<p><b>Exclusionary screening.</b> It can run on ESG scores, so the table rates it medium to high for quant "
         "investors. Integration and impact investing need fundamental analysis and rate very low.</p>",
    full="<p><b>The table.</b> Schoenmaker and Schramade rate each method for fundamental, quant and passive "
         "investors. Exclusionary screening: high, medium to high, medium to high. Best in class: high, medium, "
         "medium to low. Thematic investing: high, medium, low. Active ownership: high, low, low. Impact investing: "
         "high, very low, very low. ESG integration: high, very low, not at all.</p>"
         "<p><b>The logic.</b> Only screening can run on scores; everything else needs fundamental analysis. A quant "
         "fund works with data and factors, so screening is the natural fit. Best in class and thematic investing "
         "come next at medium.</p>"
         "<p><b>The trap.</b> «Scores can go into a factor model» sounds like integration. But integration in this "
         "course means building material issues into a firm's own valuation, which needs fundamental work.</p>"
         "<p><b>Remember:</b> the less firm-by-firm analysis an investor does, the more it is limited to "
         "screening.</p>",
)

statisk(
    "esg-s29", tema="esg-priser", type="tolkning",
    hjelp=hjelp3(
        "This is about how suitable active ownership is for a passive investor, in Schoenmaker and Schramade's "
        "table.",
        "Active ownership is rated high for fundamental investors and low for quant and passive investors, because "
        "it needs fundamental analysis. The table adds a remark on how a passive investor can still do it.",
        "<p><b>Step 1: does the fund have the analysis that engagement needs?</b></p>"
        "<p><b>Step 2: if it buys that analysis from outside,</b> what might be lost compared with doing it itself? Check the remark in the table.</p>",
    ),
    q="<p>A passive index fund wants to engage with its portfolio companies but has no analysts of its own. It hires an "
      "outside engagement service. How does Schoenmaker and Schramade's table of methods judge this?</p>",
    alternativer=[
        R("Possible, but bought-in engagement comes with a loss of quality"),
        F("Ideal, since the table rates active ownership high for passive funds",
          "The table rates active ownership low for passive investors, because it needs fundamental analysis."),
        F("Impossible, since passive funds hold no voting rights",
          "Passive funds own shares and can vote."),
        F("Unnecessary, since screening gives the same results as engagement",
          "Screening decides what to hold. Engagement tries to change the firm. They are not substitutes."),
    ],
    kort="<p><b>Possible, with a loss of quality.</b> Active ownership needs fundamental analysis. It can be bought "
         "externally, but the table notes that this comes with a loss of quality.</p>",
    full="<p><b>The table.</b> Active ownership rates high for fundamental investors and low for quant and passive "
         "ones, because it needs fundamental analysis. The table's remark: it can be bought externally, with loss of "
         "quality.</p>"
         "<p><b>Here.</b> The index fund has no analysts, so it hires an engagement service. That is allowed. One "
         "reason for the loss of quality: an outside provider that engages for many clients knows each firm less "
         "well than an owner who analyses it.</p>"
         "<p><b>The link to lecture 8.</b> Passive investors can vote, their room to engage is uncertain and they "
         "cannot exit. Buying engagement in is one way to use voice without the tools a fundamental investor "
         "has.</p>"
         "<p><b>The traps.</b> Passive funds do vote, so «impossible» is wrong. Screening and engagement are "
         "different tools: one picks holdings, the other changes them.</p>"
         "<p><b>Remember:</b> passive funds can outsource engagement, but at a loss of quality.</p>",
)

statisk(
    "esg-s30", tema="esg-priser", type="paastand",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's table of sustainability methods by investor type.",
        "The table rates six methods for fundamental, quant and passive investors. Only one kind of method can run "
        "on scores; the rest need fundamental analysis of each firm.",
        "<p><b>Step 1: which investor type can do fundamental analysis?</b></p>"
        "<p><b>Step 2: which methods are left</b> for an investor that only holds an index? Check each statement against that, one at a time.</p>",
    ),
    q="<p>Which statement matches Schoenmaker and Schramade's table of sustainability methods by investor type?</p>",
    alternativer=[
        R("Fundamental investors can use all six; passive ones mostly screen"),
        F("A passive investor suits ESG integration best, since it holds every firm",
          "The table rates ESG integration «not at all» for passive investors."),
        F("A quant investor suits impact investing best, since impact is measured",
          "The table rates impact investing very low for quant investors."),
        F("Only screening needs fundamental analysis; the rest can run on scores",
          "This reverses the table: screening is the one method that can run on scores."),
    ],
    kort="<p><b>Fundamental investors can use all six methods; passive ones are mostly limited to screening.</b> Only "
         "screening can run on scores.</p>",
    full="<p><b>The table.</b> Public equity investors come in three types: fundamental (choose on business "
         "fundamentals), quant (choose on quantitative factors) and passive (choose an index). Schoenmaker and "
         "Schramade rate six methods for each. The fundamental investor rates high on all six. The passive investor "
         "rates medium to high only on exclusionary screening, lower on best in class and low or worse on the rest. "
         "ESG integration does not suit it at all.</p>"
         "<p><b>The logic.</b> Only screening can run on scores. Everything else needs fundamental analysis, which a "
         "passive investor does not do. For impact investing the lecture points to the Global Impact Investing "
         "Network (GIIN).</p>"
         "<p><b>The traps.</b> Holding every firm does not make integration possible; it needs a valuation of each "
         "one. Measured impact does not make impact investing a quant method.</p>"
         "<p><b>Remember:</b> fundamental can do everything; passive is essentially limited to screening.</p>",
)
