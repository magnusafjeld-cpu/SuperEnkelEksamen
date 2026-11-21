# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: governance and behaviour (tema «governance»).

   Statiske spørsmål gov-s01 … gov-s30. Kilder: manualkapittel k5
   (fag/fie459/_fragmenter/k5.html) og foilene til forelesning 5
   (FIE459_H26_5_Governance.txt). Skribent B. Ikke forveksle med
   fag/fie402/_trening/governance.py, som er et annet fag.

   Dekning: agentkostnader og hvorfor agentproblemet oppstår, konfliktene mellom
   CEO og aksjonærer, adverse selection mot moral hazard (lemons, debt overhang,
   asset substitution, tidstesten), definisjonen av corporate governance, voice og
   exit, praksisene (styre, lønn, aksjonærrettigheter, kultur), kakaosaken,
   gevinstene av å styre bærekraft, finance as usual og kreftene som holder den
   på plass, EMH mot AMH, utfordringene i SF 1.0 og SF 2.0, Schoenmaker og
   Schramades retningslinjer, ESG-koblet lønn og Starbucks, og konklusjonen om
   fokus mot mål.
"""
from trening_lib import *  # noqa: F401,F403


statisk(
    "gov-s01", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the costs an owner bears once someone else runs her firm.",
        "In a principal-agent relationship the owner (principal) delegates authority to a manager (agent). Lecture 5 "
        "names the costs principals incur to make sure their agents act in their interest.",
        "<p><b>Step 1: why does she spend the money?</b> Because of something before hiring, after hiring or "
        "outside the firm?</p>"
        "<p><b>Step 2: who bears the cost?</b> The owner herself or outsiders?</p>",
    ),
    q="<p>The founder of Lofoten Tours hands day-to-day control to a hired CEO. She then pays for an external audit, "
      "sets up a board to monitor him and designs a bonus tied to the firm's results. In lecture 5's terms, what are "
      "these outlays?</p>",
    alternativer=[
        R("Agency costs: what the owner spends to make the manager act in her interest"),
        F("Transaction costs of selling her shares to a new owner",
          "She keeps her shares. The outlays arise because someone else now runs her firm."),
        F("Externalities, since the costs of the audit and the board fall on parties outside the firm",
          "The owner pays these costs herself. Nothing falls on outsiders."),
        F("Adverse selection costs of screening CEOs before hiring one",
          "The audit, board and bonus come after the CEO is hired and are aimed at what he does."),
    ],
    kort="<p><b>Agency costs.</b> Separating ownership from control creates a principal-agent problem and monitoring "
         "and incentive pay are what the owner spends to keep the agent working for her.</p>",
    full="<p><b>Separation of ownership and control.</b> Corporate governance issues arise when owners hand control to "
         "managers. The owner is the principal; the manager is the agent who acts on her behalf.</p>"
         "<p><b>Agency costs.</b> Lecture 5 defines them as the costs principals incur to make sure their agents make "
         "decisions consistent with the principals' interests. An external audit and a monitoring board watch what "
         "the CEO does. A bonus tied to results gives him a reason to do what she wants.</p>"
         "<p><b>Why they are needed.</b> The agent often knows more than the principal, chooses his behaviour after "
         "the contract is set and cannot be monitored efficiently or costlessly.</p>"
         "<p><b>The usual mix-ups.</b> Adverse selection is about hidden information before a deal, such as choosing "
         "among CEOs; the outlays here come after the hire. Externalities are costs that fall on third parties, "
         "while these fall on the owner herself.</p>"
         "<p><b>Remember:</b> agency costs are what owners pay to keep managers acting for them.</p>",
)

statisk(
    "gov-s02", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about why the principal-agent problem arises. You need the reason the case shows most directly.",
        "Lecture 5 gives three reasons: the agent often has superior information and expertise; the agent chooses "
        "her behaviour after the contract is set and can often conceal the outcome; the agent cannot be monitored "
        "efficiently or costlessly.",
        "<p><b>Step 1: when does the manager decide how hard to work?</b> Before or after signing?</p>"
        "<p><b>Step 2: what can the owner see?</b> Her effort, or only a result that also depends on luck?</p>",
    ),
    q="<p>A shipowner hires a manager to run his fleet. After the contract is signed, she decides how hard to work and "
      "the owner only sees the year's result, which also depends on freight rates. Which reason for the principal-agent "
      "problem does this case show most directly?</p>",
    alternativer=[
        R("The agent chooses her behaviour after the contract is set and can conceal what she did"),
        F("The agent was hired because she has superior information and expertise",
          "Nothing in the case is about what she knows; it is about what she does once hired."),
        F("Adverse selection: the owner could not tell a good manager from a bad one before hiring",
          "Adverse selection is about hidden information before the contract. The case starts after signing."),
        F("Short-termism: the manager cares more about this year than the owner does",
          "Nothing suggests that her horizon is shorter than the owner's."),
    ],
    kort="<p><b>Hidden action after the contract.</b> The manager picks her effort once she is hired and a result that "
         "also depends on freight rates lets her conceal how hard she worked.</p>",
    full="<p><b>Three reasons.</b> Lecture 5 says the principal-agent problem arises because (1) the agent often has "
         "superior information and expertise, which may be why she was hired; (2) the agent chooses her behaviour "
         "after the contract has been established, so she is often able to conceal the outcome; (3) the agent cannot "
         "be monitored efficiently or costlessly.</p>"
         "<p><b>Here.</b> The manager decides her effort after signing. The owner only sees the year's result and "
         "freight rates also move it, so a bad year can be blamed on the market. That is reason (2): hidden "
         "action.</p>"
         "<p><b>The usual mix-up.</b> Calling it adverse selection because information is asymmetric. Adverse "
         "selection is hidden information before the contract; this is about behaviour after it, which is where moral "
         "hazard lives.</p>"
         "<p><b>The fix.</b> Align interests: pay in stocks or options, or condition pay on a measure such as "
         "EBIT.</p>"
         "<p><b>Remember:</b> after the contract plus unobservable effort equals hidden action.</p>",
)

statisk(
    "gov-s03", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the conflicts between a CEO and the shareholders that lecture 5 lists.",
        "Lecture 5 lists three: effort is privately costly to the CEO; the CEO may use company resources for personal "
        "benefit, such as private jets; the CEO may be more short-termist than the shareholders.",
        "<p><b>Step 1: what does the CEO gain?</b> Less work, private perks or a better near-term result?</p>"
        "<p><b>Step 2: what do shareholders lose?</b> Look at what happens to the firm's future.</p>",
    ),
    q="<p>Two years before retiring, the CEO of Tindvik Pharma cuts the research budget sharply. Earnings rise and so "
      "does his bonus, but the pipeline of new drugs dries up. Which of the CEO-shareholder conflicts listed in "
      "lecture 5 is this?</p>",
    alternativer=[
        R("The CEO is more short-termist than the shareholders"),
        F("Effort is privately costly to the CEO, so he works too little",
          "Cutting a budget is an active choice, not a lack of effort."),
        F("The CEO uses company resources for personal benefit, such as a private jet",
          "No company resources go to his private consumption."),
        F("Adverse selection: the board hired a CEO it could not assess",
          "Adverse selection is hidden information before the contract. The cut is a decision made long after he "
          "was hired."),
    ],
    kort="<p><b>Short-termism.</b> The CEO boosts near-term earnings and his bonus while the firm's long-term value "
         "falls. Shareholders care about the pipeline; he will be gone.</p>",
    full="<p><b>The three conflicts.</b> Lecture 5 lists how CEO and shareholder interests can be misaligned: effort is "
         "privately costly to the CEO; the CEO may use company resources for personal benefit, such as private jets; "
         "and the CEO may be more short-termist than shareholders.</p>"
         "<p><b>Here.</b> Cutting research raises this year's earnings and the bonus, but the drugs that would have "
         "paid off later are lost. A CEO about to retire captures the first and escapes the second. That is a "
         "shorter horizon than the owners'.</p>"
         "<p><b>The solution.</b> Align interests: pay in stocks or options, so the CEO shares the long-term value. "
         "Schoenmaker and Schramade go further: longer horizons for executives, for example paying chief executives "
         "in shares they must hold after they leave.</p>"
         "<p><b>The usual mix-up.</b> Calling it shirking. He is not idle; he chooses a cut that pays him and hurts "
         "the firm later.</p>"
         "<p><b>Remember:</b> near-term gain for the CEO, long-term loss for owners: short-termism.</p>",
)

statisk(
    "gov-s04", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's standard solution to the conflict between a CEO and the shareholders.",
        "The lecture's solution is to align the interests. Ask which measure makes the CEO's own wealth depend on "
        "the value of the firm.",
        "<p><b>Step 1: for each option, ask what happens to the CEO's wealth when firm value rises.</b></p>"
        "<p><b>Step 2: check the option against the lecture's list of governance practices.</b> Does it strengthen "
        "or weaken monitoring and shareholder rights?</p>",
    ),
    q="<p>The board of Kystlink wants its new CEO to care about the firm's value rather than her own comfort. Which "
      "measure is the lecture's standard solution?</p>",
    alternativer=[
        R("Pay her partly in shares or options, so her wealth moves with the firm's value"),
        F("Pay her a fixed salary only, so that she carries none of the firm's risk herself",
          "A fixed salary does not tie her wealth to value, so it leaves the conflict in place."),
        F("Let her also chair the board, so that the firm has one clear leader",
          "Combining CEO and chair weakens board monitoring; the lecture recommends against it."),
        F("Issue dual-class shares, so that short-term investors cannot pressure her",
          "The lecture lists avoiding dual-class shares among the shareholder rights practices."),
    ],
    kort="<p><b>Equity pay.</b> Shares or options tie the CEO's wealth to the firm's value, which aligns her interests "
         "with the shareholders'.</p>",
    full="<p><b>The conflict.</b> The CEO bears a private cost of effort, may enjoy perks at the firm's expense and may "
         "be more short-termist than the owners.</p>"
         "<p><b>The solution.</b> Lecture 5: align the interests. Give the CEO stocks or options, so her wealth rises "
         "and falls with the firm's value. An alternative is to condition pay on a measure such as EBIT. "
         "Compensation policies with stock- and option-based executive pay are one of the lecture's governance "
         "practices.</p>"
         "<p><b>The limits.</b> Governance should ease the conflict without unduly burdening managers with the firm's "
         "risk, so the answer is partly in equity, not all of it.</p>"
         "<p><b>Why not the others.</b> A fixed salary removes the link to value. A CEO who also chairs the board "
         "monitors herself; the lecture wants the roles split or a lead independent director. Dual-class shares "
         "shield management from owners and the lecture says to avoid them.</p>"
         "<p><b>Remember:</b> align interests with equity pay, but do not load all the risk on the manager.</p>",
)

statisk(
    "gov-s05", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying a market problem caused by asymmetric information and saying when it arises.",
        "Adverse selection: asymmetric information exploited before the transaction; Akerlof's lemons problem is "
        "the classic example. Moral hazard: behaviour changes after the transaction; debt overhang and asset "
        "substitution are examples.",
        "<p><b>Step 1: when does the problem arise?</b> Before any bike is sold, or after?</p>"
        "<p><b>Step 2: what is hidden?</b> Information about quality, or an action taken later?</p>"
        "<p><b>Step 3: follow the mechanism.</b> If buyers pay only an average price, which sellers are most willing to stay in the market?</p>",
    ),
    q="<p>On a website for used e-bikes, buyers cannot tell well-kept bikes from worn ones, so they will only pay an "
      "average price. Owners of good bikes stop listing them and the bikes on offer get worse. What is this and when "
      "does the problem arise?</p>",
    alternativer=[
        R("Adverse selection, the lemons problem: hidden information before the sale"),
        F("Moral hazard: sellers neglect the bikes once they have been sold",
          "The bikes get worse on offer because of what sellers know before any sale."),
        F("Asset substitution: sellers swap good parts for worse ones once they have been paid",
          "Asset substitution is shareholders of a levered firm switching to riskier assets after borrowing."),
        F("Debt overhang: sellers cannot afford to repair their bikes",
          "Debt overhang is a heavily indebted firm passing up good projects because creditors would take the gain."),
    ],
    kort="<p><b>Adverse selection, the lemons problem.</b> Sellers know the quality before the sale and buyers do not, so "
         "only an average price is paid and good bikes leave the market.</p>",
    full="<p><b>Adverse selection.</b> Asymmetric information is exploited before the transaction: those who gain most "
         "at the others' expense are the keenest to take part. The lecture's examples are the borrowers most likely to "
         "default being the most eager to borrow and Akerlof's (1970) lemons problem.</p>"
         "<p><b>The lemons mechanism.</b> Buyers who cannot tell good from bad pay an average price. For owners of good "
         "bikes that price is too low, so they withdraw. The average quality on offer falls and so does the "
         "price.</p>"
         "<p><b>Here.</b> Exactly that happens on the e-bike site. The problem exists before any bike changes "
         "hands.</p>"
         "<p><b>Moral hazard, for contrast.</b> A party alters its behaviour after the transaction because others bear "
         "the cost of its risk-taking. Debt overhang and asset substitution are the lecture's examples. These explain "
         "behaviour after a loan, not hidden quality before a sale.</p>"
         "<p><b>Remember:</b> hidden information before the deal is adverse selection; hidden action after it is moral "
         "hazard.</p>",
)

statisk(
    "gov-s06", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the two moral hazard examples in lecture 5. You need to tell them apart.",
        "Moral hazard is behaviour that changes after a transaction because others bear the cost. The lecture's "
        "examples are debt overhang and asset substitution. One is about skipping good projects, the other about "
        "taking on more risk.",
        "<p><b>Step 1: before or after the loan?</b> Decide between adverse selection and moral hazard.</p>"
        "<p><b>Step 2: what do the owners do?</b> Reject a good project or switch to riskier assets?</p>",
    ),
    q="<p>Vardø Shipping is so deep in debt that most of the gain from a new, profitable vessel would go to its "
      "creditors. The shareholders vote against buying it. Which concept is this?</p>",
    alternativer=[
        R("Debt overhang, a form of moral hazard"),
        F("Asset substitution, a form of moral hazard",
          "Asset substitution means switching to riskier assets. Here the owners pass up a good project."),
        F("The lemons problem, a form of adverse selection",
          "The lemons problem is about hidden quality before a sale, not an investment decision under heavy debt."),
        F("Adverse selection, because the creditors lent first",
          "The decision comes after the loan. Adverse selection is hidden information when the loan was granted."),
    ],
    kort="<p><b>Debt overhang.</b> A heavily indebted firm passes up a profitable project because much of the gain would "
         "go to creditors. It is moral hazard: behaviour after the loan shaped by who bears the cost.</p>",
    full="<p><b>Moral hazard.</b> After a transaction, a party alters its behaviour because others bear the consequences. "
         "Lecture 5 gives two examples: debt overhang and asset substitution.</p>"
         "<p><b>Debt overhang.</b> When debt is very high, a profitable project mostly pays off the creditors. "
         "Shareholders put up the money but keep little of the gain, so they reject a project that would raise total "
         "firm value. That is what Vardø's owners do.</p>"
         "<p><b>Asset substitution.</b> The opposite move: shareholders of a levered firm switch to riskier assets, "
         "keeping the upside while creditors bear the downside.</p>"
         "<p><b>The usual mix-up.</b> Calling a debt problem adverse selection because creditors lent first. The test "
         "is timing: adverse selection is hidden information before the contract, moral hazard is behaviour after "
         "it.</p>"
         "<p><b>Remember:</b> too much debt, good project rejected: debt overhang; more risk taken: asset "
         "substitution.</p>",
)

statisk(
    "gov-s07", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying two borrower problems as adverse selection or moral hazard.",
        "The test is timing. Adverse selection is hidden information before the contract. Moral hazard is hidden "
        "action after it. Asymmetric information is present in both, so it cannot decide.",
        "<p><b>Step 1: Borrower 1.</b> Does the problem arise before or after signing?</p>"
        "<p><b>Step 2: Borrower 2.</b> Same question.</p>"
        "<p><b>Step 3: label each one.</b></p>"
        "<p><b>Step 4: check that your labels follow the timing alone.</b> Other features of the cases do not decide the classification.</p>",
    ),
    q="<p>Two borrowers apply to Nordfjord Sparebank. Before signing, Borrower 1 hides that its largest customer is about "
      "to leave. After signing, Borrower 2 moves the loan into a far riskier venture than agreed. How should each case "
      "be classified?</p>",
    alternativer=[
        R("Borrower 1 is adverse selection and Borrower 2 is moral hazard"),
        F("Borrower 1 is moral hazard and Borrower 2 is adverse selection",
          "Moral hazard is about behaviour after the contract, yet Borrower 1's problem arises before signing."),
        F("Both are adverse selection, since information is asymmetric in both",
          "Asymmetric information is present in both cases, so it cannot be the test."),
        F("Both are moral hazard, since both borrowers act in bad faith",
          "Bad faith does not decide the label."),
    ],
    kort="<p><b>Borrower 1 adverse selection, Borrower 2 moral hazard.</b> Hidden information before the contract against "
         "hidden action after it. Borrower 2 is asset substitution.</p>",
    full="<p><b>The timing test.</b> Both concepts involve asymmetric information, so that cannot tell them apart. What "
         "does is when the problem arises.</p>"
         "<p><b>Adverse selection.</b> Before the transaction, a party exploits what it knows and the other does not. "
         "Borrower 1 hides bad news when applying. The bank prices the loan for a better borrower than it gets.</p>"
         "<p><b>Moral hazard.</b> After the transaction, a party changes its behaviour because others bear the cost "
         "of its risk-taking. Borrower 2 moves the money into a riskier venture once the loan is granted, keeping the "
         "upside while the bank carries the downside. That is asset substitution, one of the lecture's two moral "
         "hazard examples next to debt overhang.</p>"
         "<p><b>The usual mix-up.</b> Calling every information problem adverse selection. A switch to riskier "
         "projects after a loan is moral hazard, even though information is asymmetric in both cases.</p>"
         "<p><b>Remember:</b> before the contract, hidden information; after it, hidden action.</p>",
)

statisk(
    "gov-s08", tema="governance", type="paastand",
    hjelp=hjelp3(
        "This is about how lecture 5 defines corporate governance and what it says governance should and should not "
        "do.",
        "The lecture describes governance as a system aimed at the conflict between managers (agents) and investors "
        "(principals). It also says what governance must avoid and whether good governance adds or costs value.",
        "<p><b>Step 1: whose conflict is governance about?</b> Managers and investors, or all stakeholders?</p>"
        "<p><b>Step 2: does good governance add value?</b> Discard options that contradict the lecture on this "
        "point or on how much risk managers should bear.</p>",
    ),
    q="<p>Which statement matches lecture 5's description of corporate governance?</p>",
    alternativer=[
        R("A system of controls, regulations and incentives to minimise agency costs and prevent corporate fraud"),
        F("A set of rules that shifts all of the firm's risk onto managers, so they act as owners would",
          "Governance should not load the firm's risk onto managers; it trades costs against benefits."),
        F("A legal duty for directors to maximise the welfare of all stakeholders equally",
          "No such duty appears in the definition. Governance targets the conflict between managers and investors."),
        F("A cost that lowers firm value but is needed to satisfy regulators and the law",
          "The lecture says good governance is value enhancing."),
    ],
    kort="<p><b>Controls, regulations and incentives.</b> Corporate governance is the system designed to minimise agency "
         "costs between managers and investors and to prevent corporate fraud.</p>",
    full="<p><b>The definition.</b> Lecture 5: corporate governance is the system of controls, regulations and incentives "
         "designed to minimise agency costs between managers (agents) and investors (principals) and to prevent "
         "corporate fraud.</p>"
         "<p><b>Its role.</b> It should mitigate the conflict of interest that comes from the separation of ownership "
         "and control without unduly burdening managers with the risk of the firm. It is a system of checks and "
         "balances that trades off costs and benefits. Good governance is value enhancing, something investors "
         "should strive for.</p>"
         "<p><b>The OECD's version.</b> The purpose is to help build an environment of trust, transparency and "
         "accountability for long-term investment, financial stability and business integrity.</p>"
         "<p><b>The usual mix-ups.</b> Thinking governance means loading all risk on managers; the lecture says the "
         "opposite. Thinking governance is a pure cost; the lecture says it adds value. And governance is not a "
         "duty to serve all stakeholders equally.</p>"
         "<p><b>Remember:</b> governance minimises agency costs and prevents fraud, without overloading managers "
         "with risk.</p>",
)

statisk(
    "gov-s09", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about a principle in lecture 5's description of what a governance system should achieve and what "
        "it should avoid.",
        "Governance should mitigate the conflict of interest from the separation of ownership and control and the "
        "lecture adds a limit on how it may do so. It trades off costs and benefits.",
        "<p><b>Step 1: what does the proposal do to the CEO's risk?</b> Compare it with ordinary equity pay.</p>"
        "<p><b>Step 2: which part of the lecture's description does that conflict with?</b></p>"
        "<p><b>Step 3: weigh costs and benefits.</b> Governance trades them off. What does a risk-averse manager demand for carrying that much risk?</p>",
    ),
    q="<p>A board member at Fjordkraft Nett proposes paying the CEO only in options, with no salary at all, so that her "
      "wealth depends entirely on the share price. Which part of the lecture's view of corporate governance does the "
      "proposal ignore?</p>",
    alternativer=[
        R("Governance should ease the agency conflict without unduly burdening managers with the firm's risk"),
        F("Executive pay should never be linked to the share price, since that invites short-termism",
          "The lecture recommends stock and option pay to align interests. The problem is the extreme design."),
        F("The CEO should also chair the board, so that pay and oversight sit in one place",
          "The lecture advises against combining the roles."),
        F("Pay should follow stakeholder value rather than shareholder value",
          "The proposal is not about whose value counts."),
    ],
    kort="<p><b>Do not overload managers with risk.</b> Option pay aligns interests, but pay made up only of options puts "
         "all of the firm's risk on the CEO. Governance should mitigate the conflict without that burden.</p>",
    full="<p><b>The principle.</b> The role of the governance system is to mitigate the conflict of interest from the "
         "separation of ownership and control without unduly burdening managers with the risk of the firm. It is a "
         "system of checks and balances that trades off costs and benefits.</p>"
         "<p><b>Here.</b> Equity pay is the lecture's own solution, so some options are fine. But options only, with "
         "no salary, make the CEO's whole income depend on a share price she only partly controls. A risk-averse "
         "manager carries a large burden for that and the firm pays for it in the end.</p>"
         "<p><b>The usual mix-up.</b> Reading \"align interests\" as \"the more equity, the better\". Alignment has a "
         "cost and governance weighs it against the benefit.</p>"
         "<p><b>Why not the others.</b> The lecture does recommend equity pay, it wants CEO and chair separated and "
         "the proposal says nothing about stakeholder value.</p>"
         "<p><b>Remember:</b> align interests, but without unduly burdening managers with the firm's risk.</p>",
)

statisk(
    "gov-s10", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's guidelines for governing sustainable finance and how they differ "
        "from shareholders' direct action.",
        "The five guidelines: company perspective; lengthening executive and investor horizons; investor engagement "
        "with corporates; market efficiency and liquidity; supervisory treatment.",
        "<p><b>Step 1: who acts?</b> Investors, a board or a regulator?</p>"
        "<p><b>Step 2: how do they act?</b> By selling, by challenging a market theory or by pressing companies "
        "together?</p>"
        "<p><b>Step 3: check that the option is one of the five guidelines.</b> Direct action by shareholders is a different list.</p>",
    ),
    q="<p>Twelve pension funds form a coalition to press oil producers to cut methane leaks, meeting their boards "
      "together and filing joint shareholder resolutions. Which of Schoenmaker and Schramade's guidelines does this "
      "put into practice?</p>",
    alternativer=[
        R("Investor engagement with corporates, through coalitions on environmental issues"),
        F("Exit, since the funds signal that they will sell if the producers do not act",
          "The funds stay invested and press the producers. Exit is selling and it is not one of the five "
          "guidelines."),
        F("Supervisory treatment, since the funds take over the role of the regulator",
          "Supervisory treatment concerns how regulators treat financial institutions."),
        F("Market efficiency and liquidity, since the funds challenge the efficient markets hypothesis",
          "That guideline is about replacing the EMH with the adaptive markets hypothesis, not about meeting "
          "boards."),
    ],
    kort="<p><b>Investor engagement.</b> The third guideline: investor coalitions for long-term value creation and "
         "engagement on social and environmental issues.</p>",
    full="<p><b>The five guidelines.</b> Schoenmaker and Schramade's guidelines for governing sustainable finance:</p>"
         "<ul><li><b>Company perspective:</b> from shareholder to stakeholder focus, striving for long-term value "
         "creation, reflected in executive contracts.</li>"
         "<li><b>Longer horizons:</b> longer-term reporting and incentives, transparent social and environmental "
         "reporting.</li>"
         "<li><b>Investor engagement:</b> investor coalitions for long-term value creation and engagement on social "
         "and environmental issues.</li>"
         "<li><b>Market efficiency and liquidity:</b> challenge the EMH with the adaptive markets hypothesis.</li>"
         "<li><b>Supervisory treatment:</b> less focus on liquid assets, room for buy-and-hold, carbon stress "
         "tests.</li></ul>"
         "<p><b>Here.</b> Pension funds acting together, meeting boards and filing resolutions on methane is "
         "investor engagement through a coalition. In the language of direct action it is voice, not exit.</p>"
         "<p><b>Remember:</b> investors pressing companies together on E and S issues is the engagement "
         "guideline.</p>",
)

statisk(
    "gov-s11", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the forms of direct action shareholders can take against a company's management.",
        "Lecture 5 names two: one where shareholders stay and use their rights, through voting or engagement and "
        "one where they leave by selling. Board practices and regulation are not shareholders' direct action.",
        "<p><b>Step 1: does the fund keep its shares?</b></p>"
        "<p><b>Step 2: what does it do with them?</b> Vote, talk or sell?</p>"
        "<p><b>Step 3: separate direct action from other tools.</b> Practices inside the board and rules from the state are not something an outside shareholder does itself.</p>",
    ),
    q="<p>Fjellheim Capital is unhappy with how a retailer handles labour abuses at its suppliers. It votes against the "
      "board's pay report at the annual meeting and holds a series of meetings with the chair to press for a "
      "whistleblowing procedure. Which form of shareholder direct action is it using?</p>",
    alternativer=[
        R("Voice: voting and engagement, also called jawboning"),
        F("Exit: selling the shares to push down the price",
          "Fjellheim keeps its shares throughout."),
        F("Board monitoring: overseeing management from inside the board",
          "Board monitoring is a governance practice carried out by directors, not direct action by an outside "
          "shareholder."),
        F("Regulation: asking the state to impose new rules on the retailer",
          "Fjellheim deals with the company itself; no rule-maker is involved."),
    ],
    kort="<p><b>Voice.</b> Voting at the annual meeting and engaging with the company (jawboning) are the voice side of "
         "shareholder direct action. Exit would mean selling.</p>",
    full="<p><b>Direct action by shareholders.</b> Lecture 5 gives two mechanisms.</p>"
         "<ul><li><b>Voice:</b> voting in shareholder annual meetings and engagement with companies, nicknamed "
         "jawboning.</li>"
         "<li><b>Exit:</b> selling the shares. If the manager destroys value, selling pushes down the price and hurts "
         "the manager ex post; ex ante, the threat of exit induces the manager to maximise value.</li></ul>"
         "<p><b>Here.</b> Fjellheim votes against the pay report and meets the chair repeatedly. It stays invested and "
         "uses its rights. That is voice.</p>"
         "<p><b>The usual mix-ups.</b> Board monitoring (CEO not chair, independence, committees) is a governance "
         "practice inside the firm, not something an outside shareholder does. Regulation comes from the state.</p>"
         "<p><b>Link.</b> A passive investor who must hold the stock cannot credibly exit, so voice is its main "
         "tool (lecture 8).</p>"
         "<p><b>Remember:</b> stay and speak is voice; sell is exit.</p>",
)

statisk(
    "gov-s12", tema="governance", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about how exit disciplines managers and who can use it. Check each statement on its own.",
        "If a manager destroys value, selling pushes down the price and hurts the manager ex post. Ex ante, the "
        "threat of exit induces the manager to maximise value. A threat works only if the investor is free to carry "
        "it out.",
        "<p><b>Step 1: statement I.</b> Does exit discipline through the sale itself or through the expected price "
        "fall?</p>"
        "<p><b>Step 2: statement II.</b> Can a fund that must hold every stock in its index credibly threaten to "
        "sell?</p>",
    ),
    q="<p>Consider two statements about exit as a governance mechanism.</p>"
      "<p>I. Exit can discipline a manager even if no shareholder ends up selling.</p>"
      "<p>II. An index fund that must hold every stock in its index can discipline managers through the threat of "
      "exit.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II needs a second look: ask whether a fund bound to its index can carry out the "
                     "threat."),
        F("Both I and II", "Statement II needs a second look: a threat disciplines only if the investor is free to "
                           "carry it out."),
        F("Neither I nor II", "At least one of the statements describes how exit works ex ante."),
    ],
    kort="<p><b>Only I.</b> The threat of exit disciplines ex ante, so nobody needs to sell. An index fund cannot "
         "credibly threaten to sell, so it relies on voice.</p>",
    full="<p><b>Statement I is correct.</b> If the manager destroys value, shareholders can sell, pushing down the price "
         "and hurting the manager ex post. Knowing this, the manager has a reason to maximise value ex ante. Exit "
         "disciplines through the expected price fall, so it can work even when nobody ends up selling.</p>"
         "<p><b>Statement II is false.</b> A threat works only if it can be carried out. A fund that must hold every "
         "stock in its index cannot sell one company it dislikes, so its threat to exit is not credible. It keeps "
         "voice: voting and engagement. Lecture 8 returns to this for passive investors.</p>"
         "<p><b>The usual mix-up.</b> Thinking exit requires an actual sale, or that any large holder can use it. "
         "The sale is the punishment; the threat is the discipline and only a free seller has it.</p>"
         "<p><b>Remember:</b> exit disciplines ex ante through the threat and an index fund cannot make that "
         "threat.</p>",
)

statisk(
    "gov-s13", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about sorting measures into the categories of governance practice in lecture 5.",
        "The categories: board monitoring (leadership, independence, diversity, committees); compensation policies "
        "(stock- and option-based pay); shareholder rights (no dual-class shares, right to propose resolutions); "
        "corporate culture; transparency and accountability.",
        "<p><b>Step 1: what do the three measures have in common?</b> Do they concern the board, pay, voting rights "
        "or how people behave inside the firm?</p>"
        "<p><b>Step 2: match them to one category.</b></p>",
    ),
    q="<p>After a bribery scandal, Brønnøy Telecom adopts a compliance and ethics policy, an anti-bribery and corruption "
      "policy and a whistleblowing procedure. Which category of governance practice in lecture 5 do these measures "
      "belong to?</p>",
    alternativer=[
        R("Corporate culture"),
        F("Board monitoring",
          "Board monitoring covers the board's leadership, independence, diversity and committees."),
        F("Shareholder rights",
          "Shareholder rights cover avoiding dual-class shares and the right to propose resolutions."),
        F("Compensation policies",
          "Compensation covers stock- and option-based pay for executives."),
    ],
    kort="<p><b>Corporate culture.</b> Compliance and ethics policies, anti-bribery and corruption policies and a "
         "whistleblowing procedure are the lecture's corporate culture practices.</p>",
    full="<p><b>The practices in lecture 5.</b></p>"
         "<ul><li><b>Board monitoring:</b> CEO not chair (otherwise a lead independent director), board independence and "
         "diversity, remuneration, audit and nominating committees.</li>"
         "<li><b>Compensation policies:</b> stock- and option-based executive pay.</li>"
         "<li><b>Shareholder rights:</b> avoid dual-class shares, the right to propose resolutions.</li>"
         "<li><b>Corporate culture:</b> compliance and ethics policies, anti-bribery and corruption policies, a "
         "whistleblowing procedure.</li>"
         "<li><b>Transparency and accountability:</b> reporting, covered in lecture 7.</li></ul>"
         "<p><b>Here.</b> All three of Brønnøy's measures shape how people inside the firm behave and how wrongdoing "
         "is caught. They are corporate culture.</p>"
         "<p><b>Why it matters.</b> The same practices are the lecture's answer to the cocoa case: board oversight, "
         "compliance and ethics policies, whistleblowing and transparency can prevent abuses from occurring.</p>"
         "<p><b>Remember:</b> compliance, anti-bribery and whistleblowing are corporate culture.</p>",
)

statisk(
    "gov-s14", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about which governance practice a plan to split voting power between share classes affects.",
        "The practices in lecture 5: board monitoring, compensation policies, shareholder rights, corporate culture "
        "and transparency. One of them lists what to avoid about how votes are attached to shares.",
        "<p><b>Step 1: what does the plan change?</b> The board, pay, voting power or internal policies?</p>"
        "<p><b>Step 2: which category deals with that?</b></p>"
        "<p><b>Step 3: think about voice.</b> If one class of shares holds most of the votes, what happens to the outside owners' ability to discipline management?</p>",
    ),
    q="<p>The founder of Vindel AI plans to list the company with two share classes: his own shares carry ten votes each, "
      "those sold to the public one vote each. Which governance practice from lecture 5 does this plan go against?</p>",
    alternativer=[
        R("Shareholder rights, which include avoiding dual-class shares"),
        F("Board monitoring, which calls for a lead independent director",
          "Board monitoring concerns how the board is led and composed, not how votes are split between share "
          "classes."),
        F("Compensation policies, which call for option-based pay",
          "The plan concerns voting power, not pay."),
        F("Corporate culture, which calls for a whistleblowing procedure",
          "Culture covers compliance, anti-bribery and whistleblowing, not voting rights."),
    ],
    kort="<p><b>Shareholder rights.</b> Lecture 5 lists avoiding dual-class shares and the right to propose resolutions, "
         "as shareholder rights practices.</p>",
    full="<p><b>Dual-class shares.</b> With two share classes, an insider can control the votes while owning a small part "
         "of the cash-flow rights. Outside shareholders then lose much of their voice: a vote they cannot win does "
         "not discipline anyone.</p>"
         "<p><b>The practice.</b> Lecture 5 lists shareholder rights as a governance practice: avoid dual-class shares "
         "and give shareholders the right to propose resolutions. Vindel AI's plan does the opposite.</p>"
         "<p><b>Why it matters for agency costs.</b> Voice is one of the two forms of shareholder direct action. When "
         "votes are concentrated in the founder's class, voice is weakened and outside owners are left mainly with "
         "exit.</p>"
         "<p><b>The usual mix-up.</b> Filing voting power under board monitoring. Board monitoring is about the "
         "board itself: CEO not chair, independence, diversity and committees.</p>"
         "<p><b>Remember:</b> avoid dual-class shares is a shareholder rights practice.</p>",
)

statisk(
    "gov-s15", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the benefits of governing sustainability issues that lecture 5 lists.",
        "Lecture 5 lists three benefits: better decision making, risk mitigation and improved capital flow. Each "
        "works through a different channel: the quality of decisions, controversies and penalties, or the terms of "
        "finance.",
        "<p><b>Step 1: what does the first chain avoid?</b> Look at what the second chain suffers.</p>"
        "<p><b>Step 2: which benefit is about that?</b> Discard options that are not on the lecture's list or "
        "contradict it.</p>",
    ),
    q="<p>Two clothing chains source from the same region. One has board oversight of human rights and audits its "
      "suppliers; the other does not. When forced labour is uncovered, only the second faces a lawsuit and fines. "
      "Which benefit of governing sustainability does the first chain illustrate?</p>",
    alternativer=[
        R("Risk mitigation: fewer controversies and less exposure to penalties or legal action"),
        F("Improved capital flow: easier access to capital and a lower cost of capital",
          "Nothing in the case concerns banks, investors or funding costs."),
        F("Lower agency costs, since a stakeholder objective makes the managers more accountable to owners",
          "The lecture warns that a stakeholder objective can raise agency costs."),
        F("Pie-growing, since both owners and the workers at the farms gain equally",
          "Pie-growing is Edmans's mindset, not one of the governance benefits and the case is about avoiding a "
          "penalty."),
    ],
    kort="<p><b>Risk mitigation.</b> Governing sustainability makes a firm less likely to be involved in controversies, "
         "which in severe cases bring penalties or legal action.</p>",
    full="<p><b>Three benefits.</b> Lecture 5 lists why governing sustainability issues pays:</p>"
         "<ul><li><b>Better decision making:</b> understanding stakeholders, risks and opportunities leads to better "
         "decisions and, all else equal, higher firm value.</li>"
         "<li><b>Risk mitigation:</b> the company is less likely to be involved in controversies, which in the most "
         "severe cases lead to penalties or legal action.</li>"
         "<li><b>Improved capital flow:</b> banks and investors gain confidence from risk management and public "
         "reporting, which may improve access to capital and lower its cost.</li></ul>"
         "<p><b>Here.</b> The first chain's oversight keeps it out of the lawsuit and fines that hit the second. The "
         "benefit shows up as harm avoided: risk mitigation.</p>"
         "<p><b>The usual mix-up.</b> Reading every good outcome as better decision making. The case points to a "
         "specific channel: a controversy and its legal cost.</p>"
         "<p><b>Remember:</b> fewer controversies, fewer penalties: risk mitigation.</p>",
)

statisk(
    "gov-s16", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the governance practices that lecture 5 says can prevent human rights abuses in a supply "
        "chain.",
        "The practices: board monitoring, compensation policies, shareholder rights, corporate culture (compliance, "
        "anti-bribery, whistleblowing) and transparency. Some designs strengthen the incentive to abuse rather than "
        "curb it.",
        "<p><b>Step 1: for each option, ask whether it helps someone see and stop abuse.</b></p>"
        "<p><b>Step 2: check it against the lecture's list.</b> Does the lecture recommend it or warn against "
        "it?</p>",
    ),
    q="<p>Investors in Kakaohuset, a chocolate maker, learn that child labour is used on farms in its supply chain. "
      "Which set of governance practices from lecture 5 would best help prevent such cases?</p>",
    alternativer=[
        R("Board oversight, compliance and ethics policies, a whistleblowing procedure and transparent reporting"),
        F("Dual-class shares, so management can act without pressure from short-term investors",
          "The lecture advises avoiding dual-class shares; they shield management from its owners."),
        F("An annual bonus for the CEO tied to cutting purchasing costs",
          "A bonus for lower costs strengthens the incentive to buy from cheap, abusive suppliers."),
        F("Combining the CEO and chair roles, so one person is clearly responsible",
          "Combining the roles weakens board monitoring; the lecture recommends separating them."),
    ],
    kort="<p><b>Oversight, culture and transparency.</b> Board oversight, compliance and ethics policies, whistleblowing "
         "and reporting are the practices the lecture applies to the cocoa case.</p>",
    full="<p><b>The cocoa case.</b> Lecture 5 discusses a child-labour lawsuit against Nestlé and Cargill. The chapter "
         "applies the lecture to it in four steps.</p>"
         "<ul><li><b>Incentive:</b> cheap labour lowers costs and a long supply chain spreads responsibility "
         "thin.</li>"
         "<li><b>Direct action:</b> shareholders can use voice or exit.</li>"
         "<li><b>Prevention:</b> board oversight, compliance and ethics policies, whistleblowing and "
         "transparency.</li>"
         "<li><b>Financial value:</b> litigation and reputation.</li></ul>"
         "<p><b>Here.</b> The question asks for prevention. Oversight lets the board see the risk, the policies set "
         "the rules, whistleblowing lets abuses surface and reporting makes the firm answerable.</p>"
         "<p><b>Why not the others.</b> Dual-class shares weaken owners' voice. A bonus for cheaper purchasing pays "
         "managers to look away. A CEO who also chairs the board is monitored by herself.</p>"
         "<p><b>Remember:</b> prevention means oversight, compliance, whistleblowing and transparency.</p>",
)

statisk(
    "gov-s17", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the ways a human rights case can affect a company's financial value, as the cocoa discussion "
        "in lecture 5 shows.",
        "The chapter names two channels from such a case to financial value. Ask whether either depends on the "
        "plaintiffs winning in court.",
        "<p><b>Step 1: what did the court decide and on what ground?</b></p>"
        "<p><b>Step 2: which costs arise whatever the court decides?</b> Check each option against that.</p>"
        "<p><b>Step 3: separate the legal outcome from the business outcome.</b> Ask what the case costs a firm even if it wins.</p>",
    ),
    q="<p>In the lecture's cocoa case, a US judge found that the plaintiffs lacked standing because they had not shown "
      "a \"traceable connection\" between the defendants and the plantations. A director at another chocolate maker "
      "concludes: \"So such cases pose no threat to our financial value.\" Why is that conclusion too quick?</p>",
    alternativer=[
        R("Litigation is costly in itself and the damage to reputation remains, whatever the ruling on standing"),
        F("A lack of traceability guarantees that the buyer will lose the next case",
          "The ruling shows the opposite can happen: the missing traceable connection helped these defendants in "
          "court."),
        F("Shareholders must sell their shares once a lawsuit is filed",
          "No rule forces shareholders to sell. Exit is a choice."),
        F("The defendants admitted using forced labour in their court papers",
          "The defendants said they strongly condemn forced labour."),
    ],
    kort="<p><b>Litigation and reputation.</b> A case costs money to defend and harms the brand even if it is dismissed "
         "on standing. Those are the channels to financial value.</p>",
    full="<p><b>The case.</b> In the lecture's quotes, a US district judge found that the plaintiffs in a proposed class "
         "action lacked standing, since they had not shown a \"traceable connection\" between the seven defendants "
         "and the plantations where they worked. The defendants said they \"strongly condemn the use of forced "
         "labor\".</p>"
         "<p><b>Financial value.</b> The chapter names two channels: litigation and reputation. Defending a lawsuit "
         "costs money and management time and being named in a child-labour case hurts the brand with customers, "
         "investors and staff, whatever the outcome on standing.</p>"
         "<p><b>The twist.</b> The lack of traceability that helped in court is the same problem that made Nestlé "
         "stop buying soy from Cargill (lecture 4). Untraceable supply is a business risk even when it is a legal "
         "defence.</p>"
         "<p><b>Prevention.</b> Board oversight, compliance and ethics policies, whistleblowing and transparency "
         "lower the chance of such cases.</p>"
         "<p><b>Remember:</b> a dismissed case can still cost money and reputation.</p>",
)

statisk(
    "gov-s18", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the three benefits of governing sustainability issues in lecture 5.",
        "Better decision making works through the quality of decisions. Risk mitigation works through fewer "
        "controversies and penalties. The third benefit, about capital, works through the confidence of banks and "
        "investors.",
        "<p><b>Step 1: who responds in the case?</b> The firm's managers, regulators or its lenders?</p>"
        "<p><b>Step 2: what changes?</b> Decisions, penalties or the terms of finance?</p>"
        "<p><b>Step 3: match the channel to one benefit.</b> Each benefit works through a different group or mechanism.</p>",
    ),
    q="<p>After Hamar Bygg improves its risk management and starts publishing a detailed sustainability report, two banks "
      "compete to lend to it and offer lower rates than before. Which benefit of governing sustainability is this?</p>",
    alternativer=[
        R("Improved capital flow"),
        F("Risk mitigation",
          "Risk mitigation is about avoiding controversies and penalties. The case is about the terms of finance."),
        F("Better decision making",
          "Better decisions come from understanding stakeholders, risks and opportunities. The case is about how "
          "lenders respond."),
        F("Exit by shareholders",
          "Exit is shareholders selling and no shareholder sells here."),
    ],
    kort="<p><b>Improved capital flow.</b> Banks and investors gain confidence from risk management and public reporting, "
         "which can improve access to capital and lower its cost.</p>",
    full="<p><b>The benefit.</b> Lecture 5: the company may experience more confidence from banks and investors due to "
         "its risk management and public reporting. This may improve access to capital and reduce the cost of "
         "capital. That is improved capital flow.</p>"
         "<p><b>Here.</b> Better risk management and a detailed sustainability report make Hamar Bygg easier to "
         "assess. Banks compete to lend and cut their rates. Lower borrowing costs are a lower cost of capital.</p>"
         "<p><b>The other two.</b> Better decision making: understanding stakeholders, risks and opportunities leads "
         "to better decisions and, all else equal, higher firm value. Risk mitigation: fewer controversies, which in "
         "severe cases bring penalties or legal action.</p>"
         "<p><b>Link.</b> Reporting is the transparency and accountability practice and lecture 7 covers it. The "
         "same logic returns in banking, where lenders price sustainability risk.</p>"
         "<p><b>Remember:</b> lenders and investors gain confidence, capital gets cheaper: improved capital "
         "flow.</p>",
)

statisk(
    "gov-s19", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the challenges of finance as usual, the model that maximises shareholder value alone.",
        "Lecture 5 names three: business ethics (room for morally dubious decisions), public policy (externalities "
        "not fully in public policy) and contractual issues (contracts cannot cover every circumstance).",
        "<p><b>Step 1: where is the gap in the case?</b> In a manager's morals, in policy or in a contract?</p>"
        "<p><b>Step 2: match it to one challenge.</b></p>"
        "<p><b>Step 3: read only what the case states.</b> Do not add problems the case does not mention.</p>",
    ),
    q="<p>Askøy Oil's loan agreement with its banks runs to many pages but says nothing about the damage its emissions "
      "could cause, because the parties could not foresee and list every circumstance that might arise. Which "
      "challenge of finance as usual does this illustrate?</p>",
    alternativer=[
        R("Contractual issues: no contract can cover every circumstance, externalities included"),
        F("Business ethics: a narrow focus on shareholder value leaves room for morally dubious decisions",
          "The case is about what a contract can foresee, not about a manager's moral choices."),
        F("Public policy: major externalities are not fully incorporated in public policy",
          "No policy is mentioned. The gap lies in what the parties could write down."),
        F("Adverse selection: the banks could not tell good borrowers from bad ones",
          "Nothing suggests the bank was misled about the borrower's quality."),
    ],
    kort="<p><b>Contractual issues.</b> It is impossible to write every circumstance into a contract, externalities "
         "included. That is one of the three challenges of finance as usual.</p>",
    full="<p><b>Finance as usual.</b> Shareholder value maximisation, with three governance challenges:</p>"
         "<ul><li><b>Business ethics:</b> a narrow focus on shareholder value can give managers scope for morally "
         "dubious decisions.</li>"
         "<li><b>Public policy:</b> major externalities are not fully incorporated in public policy.</li>"
         "<li><b>Contractual issues:</b> it is impossible to incorporate all possible circumstances in contracts, "
         "including externalities.</li></ul>"
         "<p><b>Here.</b> The loan agreement is silent on emission damage because nobody could foresee and list every "
         "circumstance. That is an incomplete contract.</p>"
         "<p><b>What keeps the model in place.</b> Lobbying by incumbent companies, agency problems between companies "
         "and investors and investors' behavioural biases such as chasing returns and herding. The lecture also "
         "shows data on climate change litigation.</p>"
         "<p><b>The usual mix-up.</b> Reading any unpriced externality as a public policy failure. Here nothing is "
         "said about policy; the gap is in the contract.</p>"
         "<p><b>Remember:</b> ethics, policy and contracts are the three challenges of finance as usual.</p>",
)

statisk(
    "gov-s20", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the forces that keep finance as usual in place, according to lecture 5.",
        "Lecture 5 names three forces that push towards the status quo: lobbying by incumbent companies, agency "
        "problems between companies and investors and behavioural biases of investors.",
        "<p><b>Step 1: who is acting in the case?</b> A company, its managers or an investor?</p>"
        "<p><b>Step 2: why does that person act as they do?</b> Self-interest, a conflict with owners or a bias?</p>",
    ),
    q="<p>A fund manager believes a coal producer's carbon risk is not in its price, but keeps buying the stock because "
      "other funds hold it and it was last year's best performer. Which force that keeps finance as usual in place "
      "does this show?</p>",
    alternativer=[
        R("Behavioural biases of investors, such as herding and chasing returns"),
        F("Lobbying by incumbent companies against new rules",
          "Nobody lobbies here; the manager follows other funds and past returns."),
        F("Agency problems between companies and their investors",
          "No conflict between the coal producer's managers and its owners appears in the case."),
        F("The adaptive markets hypothesis, which says carbon risk can never be priced",
          "The AMH explains why new risks may not yet be fully priced. It is not one of the forces and it does not "
          "say carbon cannot be priced."),
    ],
    kort="<p><b>Behavioural biases.</b> Buying because others hold it is herding; buying last year's winner is chasing "
         "returns. Both keep money flowing to finance as usual.</p>",
    full="<p><b>From understanding to acting.</b> Lecture 5 asks how to go from identifying externalities to "
         "internalising them and names three forces that maintain the status quo:</p>"
         "<ul><li>lobbying by incumbent companies;</li>"
         "<li>agency problems between companies and investors;</li>"
         "<li>behavioural biases of investors, such as chasing returns and herding.</li></ul>"
         "<p><b>Here.</b> The manager sees the risk but follows the crowd and last year's returns. That is herding and "
         "return chasing, a behavioural bias. It keeps capital in the coal producer even though he thinks the price "
         "is wrong.</p>"
         "<p><b>The usual mix-up.</b> Bringing in the adaptive markets hypothesis. The AMH explains why a new risk "
         "such as carbon may not yet be fully priced: efficiency depends on the number and nature of market "
         "participants. Herding is one reason such a mispricing can persist, but the AMH is not one of the three "
         "forces.</p>"
         "<p><b>Remember:</b> lobbying, agency problems and investor biases keep finance as usual in place.</p>",
)

statisk(
    "gov-s21", tema="governance", type="paastand",
    hjelp=hjelp3(
        "This is about the two views of market efficiency in lecture 5 and what each implies for carbon risk.",
        "One view says prices incorporate all relevant information. The other says efficiency depends on how "
        "individuals adapt to a changing environment, so prices reflect as much information as the number and "
        "nature of market participants allow.",
        "<p><b>Step 1: classify Analyst 1.</b> Does she think every relevant risk is already priced?</p>"
        "<p><b>Step 2: classify Analyst 2.</b> Does he think pricing depends on who trades?</p>"
        "<p><b>Step 3: check that each view carries its own author.</b></p>",
    ),
    q="<p>Two analysts discuss a utility's carbon risk. Analyst 1: \"All relevant information, carbon included, is "
      "already in the share price, so carbon cannot help me pick stocks.\" Analyst 2: \"Few groups of investors "
      "analyse carbon yet, so the market may not price it until they adapt.\" Which pairing is correct?</p>",
    alternativer=[
        R("Analyst 1 holds the efficient markets hypothesis (Fama); Analyst 2 the adaptive markets hypothesis (Lo)"),
        F("Analyst 1 holds the adaptive markets hypothesis (Lo); Analyst 2 the efficient markets hypothesis (Fama)",
          "The adaptive markets hypothesis does not claim that every risk is already priced, so it cannot be "
          "Analyst 1's view."),
        F("Both hold the efficient markets hypothesis, since both expect prices to adjust to information",
          "One analyst says prices may lag because few investor groups analyse the risk. That is not the EMH."),
        F("Both hold the adaptive markets hypothesis, since both talk about a new risk",
          "One analyst says carbon is already fully in the price, which the AMH does not assume."),
    ],
    kort="<p><b>Analyst 1 is the EMH, Analyst 2 the AMH.</b> Under the EMH carbon is already priced; under the AMH a new "
         "risk with few investor groups may not be fully priced yet.</p>",
    full="<p><b>Efficient markets hypothesis (Fama 1970).</b> Stock prices incorporate all relevant information and on "
         "average reflect long-term fundamental value. The price is the indicator for asset selection and investor "
         "performance. Carbon risk, if relevant, is already in the price, so it gives no edge in picking stocks. That "
         "is Analyst 1.</p>"
         "<p><b>Adaptive markets hypothesis (Lo 2017).</b> The degree of efficiency depends on individuals adapting to "
         "a changing environment. Prices reflect as much information as the number and nature of distinct groups of "
         "market participants allow. With few groups, or a new risk, the market is less efficient. That explains why "
         "carbon may not yet be fully priced. That is Analyst 2.</p>"
         "<p><b>Why it matters.</b> Schoenmaker and Schramade's fourth guideline asks to challenge the EMH with the "
         "AMH, which better reflects newly recognised risks.</p>"
         "<p><b>Remember:</b> EMH, Fama: already priced. AMH, Lo: priced as markets adapt.</p>",
)

statisk(
    "gov-s22", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the governance challenges of the sustainable finance models in lecture 5. You need the model "
        "and its challenge.",
        "Finance as usual maximises financial value F. The refined shareholder model maximises F subject to social "
        "and environmental limits. The stakeholder model optimises integrated value I = F + S + E. Each has its own "
        "challenges.",
        "<p><b>Step 1: classify the board's mandate.</b> Is profit the goal with limits around it, or is the goal a "
        "sum of values?</p>"
        "<p><b>Step 2: what do the directors complain about?</b> Match it to that model's challenges.</p>",
    ),
    q="<p>The board of Stavanger Seafood tells management to maximise profit subject to limits on emissions, fish welfare "
      "and local employment. A year later, directors complain that they cannot tell whether management did well, "
      "since it points to success on whichever goal looks best. Which model is the firm using and which challenge has it hit?</p>",
    alternativer=[
        R("The refined shareholder model (SF 1.0): several objectives at once leave managers unaccountable"),
        F("Finance as usual: a narrow focus on shareholder value leaves room for morally dubious decisions",
          "Finance as usual maximises profit alone, without limits on emissions, welfare or employment."),
        F("The stakeholder model (SF 2.0): the firm must measure integrated value I = F + S + E",
          "The board sets limits around a profit goal; it does not ask management to optimise a sum of values."),
        F("Amoral drift: the firm's small shareholders do not feel responsible for the outcome",
          "Amoral drift concerns tender offers in Hart and Zingales's model, not how a board judges its "
          "managers."),
    ],
    kort="<p><b>SF 1.0, unaccountable managers.</b> Maximising profit subject to social and environmental limits means "
         "optimising several objectives at once, which is hard to measure and control.</p>",
    full="<p><b>The models.</b> In Schoenmaker and Schramade's typology, finance as usual maximises F; the refined "
         "shareholder model (SF 1.0) maximises F subject to S and E; the stakeholder model (SF 2.0) optimises I = F + "
         "S + E. Each step broadens the objective and each brings its own governance problem.</p>"
         "<p><b>SF 1.0's challenges.</b> It leaves managers unaccountable, since simultaneously optimising several "
         "objectives is difficult to measure and control. It fails to resolve many conflicts between shareholders "
         "and stakeholders. And social and environmental value are hard to measure.</p>"
         "<p><b>Here.</b> Profit with limits on emissions, welfare and jobs is SF 1.0. Management claims success on "
         "whichever goal looks best, so the board cannot hold it to account.</p>"
         "<p><b>SF 2.0 for contrast.</b> How to balance all stakeholders, increased subjectivity with potential for "
         "higher agency costs and how to measure integrated value.</p>"
         "<p><b>Remember:</b> the broader the objective, the harder it is to check whether managers met it.</p>",
)

statisk(
    "gov-s23", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the governance challenges of the sustainable finance models. You need the challenge and the "
        "model it belongs to.",
        "Finance as usual maximises F. The refined shareholder model maximises F subject to S and E. The stakeholder "
        "model optimises integrated value I = F + S + E. Each broader objective brings its own governance "
        "challenges.",
        "<p><b>Step 1: what is the firm's new objective?</b> Which model does it match?</p>"
        "<p><b>Step 2: what are the auditors asking?</b> Is it about measuring, about hidden information or about "
        "contracts?</p>",
    ),
    q="<p>Ålesund Energi rewrites its objective as maximising integrated value, the sum of financial, social and "
      "environmental value. Its auditors ask how a tonne of avoided emissions and a krone of lost profit are to be "
      "added together. Which governance challenge does this raise and for which model?</p>",
    alternativer=[
        R("Measuring integrated value, a challenge of the stakeholder model (SF 2.0)"),
        F("Measuring integrated value, a challenge of finance as usual",
          "Finance as usual measures financial value only, so it has no integrated value to measure."),
        F("Hidden information, an adverse selection challenge of the refined shareholder model (SF 1.0)",
          "The problem is how to add values together, not hidden information before a contract."),
        F("Incomplete contracts, a challenge of the stakeholder model (SF 2.0)",
          "The auditors' question is about measuring, not about what a contract can foresee."),
    ],
    kort="<p><b>Measuring integrated value, SF 2.0.</b> Optimising F + S + E requires putting social and environmental "
         "value on the same scale as profit, which is one of the stakeholder model's challenges.</p>",
    full="<p><b>The stakeholder model (SF 2.0).</b> The firm optimises integrated value I = F + S + E. Lecture 5 lists its "
         "governance challenges: how to balance the interests of all stakeholders; increased subjectivity, with the "
         "potential to raise agency costs; and how to measure integrated value.</p>"
         "<p><b>Here.</b> The auditors ask how to add a tonne of avoided emissions to a krone of profit. Without an "
         "agreed way to measure S and E in the same units as F, integrated value cannot be computed or checked.</p>"
         "<p><b>Why it is a governance problem.</b> If nobody can measure the objective, nobody can tell whether "
         "managers met it. Subjectivity gives room for manipulation and greenwashing, which is why the lecture "
         "concludes that a stakeholder objective can raise agency costs.</p>"
         "<p><b>The usual mix-up.</b> SF 1.0 also struggles to measure social and environmental value, but integrated "
         "value as the objective belongs to SF 2.0. Finance as usual measures F only.</p>"
         "<p><b>Remember:</b> SF 2.0: balance everyone, more subjectivity, measure I.</p>",
)

statisk(
    "gov-s24", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the conclusion of lecture 5: the difference between a stakeholder focus and a stakeholder "
        "objective.",
        "The lecture concludes in three steps: a focus on stakeholder value can help create shareholder value; "
        "defining the objective as stakeholder value maximisation can increase agency costs; governance must be "
        "rethought to protect shareholders.",
        "<p><b>Step 1: what does Firm A do?</b> Use stakeholder insight inside a shareholder-value strategy, or "
        "change its objective?</p>"
        "<p><b>Step 2: what does Firm B do?</b> And who decides what its objective means?</p>",
    ),
    q="<p>Firm A studies its stakeholders and cuts a pollutant before regulators act, to protect future profits. Firm B "
      "rewrites its objective as \"maximise stakeholder value\", with management deciding what that means. Which "
      "reading matches the conclusion of lecture 5?</p>",
    alternativer=[
        R("A's stakeholder focus can create shareholder value, while B's objective can raise agency costs"),
        F("Both raise agency costs, since any attention to stakeholders adds subjectivity",
          "Too broad. The lecture separates using stakeholder insight from making stakeholder value the "
          "objective."),
        F("Both create shareholder value, since stakeholder and shareholder value are the same thing",
          "The lecture warns that a stakeholder objective adds room for manipulation."),
        F("B's objective protects shareholders better, since managers must answer to more groups",
          "Answering to many groups with no weights makes managers harder to hold to account."),
    ],
    kort="<p><b>Focus helps, objective risks.</b> Internalising externalities ex ante can create shareholder value. Making "
         "stakeholder value the objective adds subjectivity and room for moral hazard and greenwashing.</p>",
    full="<p><b>The conclusion of lecture 5.</b></p>"
         "<ul><li>Focusing on stakeholder value can help firms create shareholder value, for example by internalising "
         "externalities ex ante.</li>"
         "<li>Defining the objective of the firm as stakeholder value maximisation can increase agency costs, by "
         "increasing subjectivity and room for manipulation (moral hazard, greenwashing).</li>"
         "<li>The transition requires careful rethinking of governance practices to ensure shareholder "
         "protection.</li></ul>"
         "<p><b>Here.</b> Firm A uses what it learns about stakeholders to act before a rule arrives and protect "
         "future profits. That is a focus that serves shareholder value. Firm B makes a vague goal its objective and "
         "lets management define it. That is the agency problem of the stakeholder model.</p>"
         "<p><b>Link.</b> This is the critique of Jensen and of Bebchuk and Tallarita from lecture 4, seen from the "
         "governance side.</p>"
         "<p><b>Remember:</b> a stakeholder focus can create shareholder value; a stakeholder objective can raise "
         "agency costs.</p>",
)

statisk(
    "gov-s25", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's guidelines for governing sustainable finance. You need the one a "
        "pay rule follows.",
        "The five guidelines: the company perspective; longer horizons for executives and investors; investor "
        "engagement with corporates; market efficiency and liquidity; how supervisors treat financial institutions.",
        "<p><b>Step 1: who sets the rule and for whom?</b> A board for its CEO, investors for companies or a "
        "regulator for banks?</p>"
        "<p><b>Step 2: what does the rule change?</b> Think about the time span the CEO cares about.</p>",
    ),
    q="<p>The board of Nordhavn Logistics requires its CEO to keep a large block of shares for several years after she "
      "leaves the company. Which of Schoenmaker and Schramade's guidelines for governing sustainable finance does this "
      "follow?</p>",
    alternativer=[
        R("Lengthening executive and investor horizons"),
        F("Investor engagement with corporates",
          "Engagement is about investors pressing companies, often in coalitions. Here the board sets pay terms."),
        F("Supervisory treatment",
          "Supervisory treatment concerns how regulators treat financial institutions."),
        F("Market efficiency and liquidity",
          "That guideline concerns challenging the EMH with the adaptive markets hypothesis."),
    ],
    kort="<p><b>Lengthening horizons.</b> The guideline asks for longer-term incentives, with the example of paying chief "
         "executives in shares they must hold after they leave.</p>",
    full="<p><b>The guideline.</b> Schoenmaker and Schramade's second guideline is lengthening executive and investor "
         "horizons: longer-term reporting and incentive structures, transparent social and environmental reporting "
         "and longer-term investment performance reporting. Their example: \"pay chief executives with shares that "
         "they must hold after they leave\".</p>"
         "<p><b>Here.</b> Nordhavn's rule means the CEO still owns the consequences of her decisions years after she "
         "is gone. That removes the reward for short-term moves that look good until she leaves.</p>"
         "<p><b>The link to agency.</b> Lecture 5 lists short-termism as one of the CEO-shareholder conflicts. Equity "
         "pay aligns interests; equity that must be held after leaving aligns horizons too.</p>"
         "<p><b>The other guidelines.</b> Engagement is investors pressing companies. Supervisory treatment is about "
         "regulators, buy-and-hold and carbon stress tests. Market efficiency is about the AMH.</p>"
         "<p><b>Remember:</b> shares held after leaving lengthen the CEO's horizon.</p>",
)

statisk(
    "gov-s26", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's guidelines for governing sustainable finance. You need the one a "
        "regulator follows.",
        "The five guidelines: the company perspective; longer horizons for executives and investors; investor "
        "engagement with corporates; market efficiency and liquidity; how supervisors treat financial institutions.",
        "<p><b>Step 1: who acts?</b> A company, an investor or a supervisor of financial institutions?</p>"
        "<p><b>Step 2: which guideline is written for that actor?</b></p>"
        "<p><b>Step 3: check both measures.</b> The right guideline covers stress tests and the treatment of liquid assets.</p>",
    ),
    q="<p>A financial regulator starts stress-testing banks' exposure to carbon-intensive assets under alternative climate "
      "scenarios and eases rules that favour holding only liquid, listed assets. Which of Schoenmaker and Schramade's "
      "guidelines is it following?</p>",
    alternativer=[
        R("Supervisory treatment"),
        F("Investor engagement with corporates",
          "Engagement is investors pressing the companies they own. The actor here is a regulator."),
        F("Lengthening executive and investor horizons",
          "That guideline is about incentives and reporting for executives and investors, not rules for banks."),
        F("Company perspective",
          "The company perspective is about firms moving to a stakeholder focus and long-term value creation."),
    ],
    kort="<p><b>Supervisory treatment.</b> Reduce regulators' focus on liquid, listed assets, allow buy-and-hold "
         "investment and stress-test financial institutions' exposure to carbon-intensive assets.</p>",
    full="<p><b>The guideline.</b> Schoenmaker and Schramade's fifth guideline, supervisory treatment, has two parts:</p>"
         "<ul><li>reduce regulators' focus on \"liquid\" (listed) assets in financial institutions and allow for "
         "buy-and-hold investments;</li>"
         "<li>introduce stress-testing of financial institutions' exposure to carbon-intensive assets using "
         "alternative climate scenarios.</li></ul>"
         "<p><b>Here.</b> The regulator does both. Carbon stress tests make banks see the transition risk in their "
         "books. Easing the preference for liquid assets makes room for long-term, buy-and-hold investment, which "
         "fits long-term value creation.</p>"
         "<p><b>The others.</b> Company perspective is about firms; longer horizons about executive and investor "
         "incentives; investor engagement about coalitions pressing companies; market efficiency and liquidity about "
         "replacing the EMH with the AMH.</p>"
         "<p><b>Remember:</b> regulators, buy-and-hold and carbon stress tests: supervisory treatment.</p>",
)

statisk(
    "gov-s27", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's concerns with linking executive pay to ESG or climate targets.",
        "Lecture 5 lists three concerns: a concentration on tactical, short-term targets rather than strategic, "
        "long-term goals; vague discretionary measures of progress; and a lack of transparency.",
        "<p><b>Step 1: is the target specific and disclosed?</b> That rules out some concerns.</p>"
        "<p><b>Step 2: is it tactical or strategic?</b> Compare what it measures with the firm's main sustainability "
        "issue.</p>",
    ),
    q="<p>Bergen Cement links part of its CEO's annual bonus to sustainability. The only target, published in full, is a "
      "cut in energy use in the company's head office. Which concern about ESG-linked pay does this design illustrate "
      "most clearly?</p>",
    alternativer=[
        R("A tactical, short-term target such as operational efficiency instead of a strategic goal like cutting "
          "emissions"),
        F("A vague discretionary measure of progress, such as \"improving sustainability\"",
          "The target is specific and measurable: energy use in one building."),
        F("A lack of transparency about which targets are used",
          "The case says the target is published in full."),
        F("A breach of directors' fiduciary duty under Delaware law",
          "The lecture does not treat ESG-linked pay as a legal breach. Its concerns are about how targets are "
          "designed."),
    ],
    kort="<p><b>Tactical and short-term.</b> Head-office energy use is operational efficiency on an annual bonus. For a "
         "cement producer the strategic, long-term goal is cutting emissions.</p>",
    full="<p><b>The concerns.</b> Lecture 5 is sceptical of linking pay to climate performance. The evidence shows a weak "
         "correlation between ESG pay and ESG performance and it is not causal. The criticisms:</p>"
         "<ul><li>a concentration on tactical, short-term targets, such as operational efficiency, rather than more "
         "strategic, long-term goals such as emissions reductions;</li>"
         "<li>vague discretionary measures, such as \"improving sustainability\", sometimes mixed with other "
         "qualitative goals;</li>"
         "<li>a lack of transparency.</li></ul>"
         "<p><b>Here.</b> The target is clear and published, so it is neither vague nor hidden. But energy use in a "
         "head office is a tactical efficiency target on an annual bonus. A cement producer's material climate issue "
         "is the emissions from making cement and the bonus ignores it.</p>"
         "<p><b>The fix.</b> Tie pay to strategic, long-term goals and move it into long-term pay, as Starbucks did "
         "with a three-year modifier on equity awards.</p>"
         "<p><b>Remember:</b> short-term, vague and opaque are the three concerns with ESG-linked pay.</p>",
)

statisk(
    "gov-s28", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's concerns with linking executive pay to ESG or climate targets.",
        "Lecture 5 lists three concerns: tactical, short-term targets rather than strategic, long-term goals; vague "
        "discretionary measures of progress; and too little transparency.",
        "<p><b>Step 1: are the targets specific?</b> Read what the board actually uses.</p>"
        "<p><b>Step 2: what can an outsider see?</b> Compare what the board knows with what the report shows.</p>"
        "<p><b>Step 3: name the gap.</b> Is the problem the design of the targets or what shareholders are told?</p>",
    ),
    q="<p>The board of Tromsø Shipping ties executive pay to three specific emissions-reduction targets. Its annual "
      "report, however, never says what the targets are, how they are weighted or whether they were met. Which concern "
      "about ESG-linked pay does this show?</p>",
    alternativer=[
        R("A lack of transparency"),
        F("Vague discretionary measures of progress",
          "The board uses specific targets. The problem lies in what outsiders can see."),
        F("Tactical, short-term targets instead of strategic ones",
          "Emissions reductions are the strategic, long-term kind of goal the lecture asks for."),
        F("Pay that is too long-term to motivate executives",
          "The lecture's concern runs the other way: targets that are too short-term."),
    ],
    kort="<p><b>Lack of transparency.</b> The targets may be good, but shareholders cannot see them, their weights or "
         "whether they were met, so they cannot judge the pay.</p>",
    full="<p><b>The three concerns.</b> Lecture 5 lists the criticisms of ESG-linked pay: tactical, short-term targets "
         "such as operational efficiency rather than strategic goals such as emissions reductions; vague "
         "discretionary measures such as \"improving sustainability\"; and a lack of transparency.</p>"
         "<p><b>Here.</b> Tromsø Shipping's targets are specific and strategic, since they concern emissions. The "
         "problem is that none of it is disclosed. Shareholders cannot check whether the targets are demanding, how "
         "much of the pay depends on them or whether the executives actually met them.</p>"
         "<p><b>Why it matters for governance.</b> Pay is meant to align managers with owners. If owners cannot see "
         "the terms, they cannot use voice on them and the pay may reward little. Transparency and accountability "
         "is one of the lecture's governance practices, covered further in lecture 7.</p>"
         "<p><b>The usual mix-up.</b> Calling undisclosed targets vague. Vague means the measure itself is fuzzy; "
         "here the measure is clear but hidden.</p>"
         "<p><b>Remember:</b> good targets that nobody can see are a transparency problem.</p>",
)

statisk(
    "gov-s29", tema="governance", type="paastand",
    hjelp=hjelp3(
        "This is about what the evidence in lecture 5 shows about linking executive pay to ESG targets.",
        "The lecture shows survey and data on ESG-linked pay and it is careful about what the link between ESG pay "
        "and ESG performance can and cannot tell you. Think about correlation against causation.",
        "<p><b>Step 1: how strong is the link?</b></p>"
        "<p><b>Step 2: does the evidence show that ESG pay causes better ESG performance?</b></p>"
        "<p><b>Step 3: discard options that contradict the lecture's concerns.</b></p>"
        "<p><b>Step 4: think about other explanations.</b> Could something else make firms both adopt ESG pay and score well on ESG?</p>",
    ),
    q="<p>Which statement about linking executive pay to ESG targets matches the evidence in lecture 5?</p>",
    alternativer=[
        R("The correlation between ESG-linked pay and ESG performance is weak and not causal"),
        F("Firms that link pay to ESG targets have been shown to improve their ESG performance as a result",
          "That claims causality, which the evidence does not show."),
        F("ESG-linked pay works best with discretionary targets, since boards can then reward real effort",
          "Vague discretionary measures are one of the lecture's concerns."),
        F("Linking pay to ESG is barred for US firms by the business judgement rule",
          "The business judgement rule protects directors' decisions. It bans no pay design."),
    ],
    kort="<p><b>Weak and not causal.</b> Firms with ESG pay do only slightly better on ESG and the link does not show "
         "that the pay caused it.</p>",
    full="<p><b>The evidence.</b> Lecture 5 shows a PwC (2021) survey on linking executive compensation to climate "
         "performance and data on ESG pay and ESG performance. The slide's message: weak correlation between ESG pay "
         "and ESG performance, not causal.</p>"
         "<p><b>Why \"not causal\" matters.</b> Firms that already care about ESG may both adopt ESG pay and perform "
         "better. A correlation then says nothing about what adding ESG pay would do to a firm that has not.</p>"
         "<p><b>The concerns.</b> Targets concentrate on tactical, short-term goals such as operational efficiency "
         "rather than strategic, long-term ones such as emissions reductions. They rely on vague discretionary "
         "measures. And they lack transparency.</p>"
         "<p><b>What helps.</b> Moving sustainability into long-term pay, as Starbucks did with a three-year "
         "modifier on equity awards, matches the guideline to lengthen horizons.</p>"
         "<p><b>The usual mix-up.</b> Reading \"firms with ESG pay score better\" as \"ESG pay works\". A statement "
         "that ESG pay has been shown to improve ESG performance overstates the evidence.</p>"
         "<p><b>Remember:</b> ESG pay and ESG performance: weak correlation, no proof of causation.</p>",
)

statisk(
    "gov-s30", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about how a change in the design of ESG-linked pay answers one of the lecture's concerns.",
        "The lecture's three concerns: tactical, short-term targets; vague discretionary measures; lack of "
        "transparency. Schoenmaker and Schramade also ask for longer horizons in executive incentives.",
        "<p><b>Step 1: what moved and from where to where?</b> Compare the time span of the two pay elements.</p>"
        "<p><b>Step 2: which concern is about that time span?</b> Check whether the change itself does anything about "
        "the other concerns.</p>",
    ),
    q="<p>Starbucks removed sustainability from its executives' short-term annual bonus and made it a three-year modifier "
      "of their performance-based equity awards. Which concern about ESG-linked pay does this change address most "
      "directly?</p>",
    alternativer=[
        R("The focus on the short term, by moving sustainability incentives into long-term pay"),
        F("The lack of transparency, by publishing every target and its weight in detail",
          "The change is about the horizon of the pay, not about what is disclosed."),
        F("The weak evidence, by proving that ESG pay causes better ESG performance",
          "A change in pay design cannot by itself prove causality."),
        F("Reliance on stock pay, by moving sustainability out of equity awards",
          "It moves sustainability out of the annual bonus, not out of equity awards."),
    ],
    kort="<p><b>The short-term focus.</b> Moving sustainability from the annual bonus to a three-year equity modifier "
         "shifts the incentive from short-term to long-term compensation.</p>",
    full="<p><b>The change.</b> Starbucks removed sustainability from the short-term annual bonus and introduced it as a "
         "three-year modifier of executives' performance-based equity awards. In the lecture's words, this shifts "
         "sustainability incentives from short-term to long-term compensation.</p>"
         "<p><b>Which concern.</b> The first of the lecture's three: concentration on tactical, short-term targets "
         "rather than strategic, long-term goals. A three-year horizon on equity awards rewards results that last, "
         "not one good year.</p>"
         "<p><b>What it does not settle.</b> The change by itself says nothing about whether the measures are vague "
         "or how transparent they are. And no single firm's design can prove that ESG pay causes better ESG "
         "performance; the lecture's evidence shows only a weak, non-causal correlation.</p>"
         "<p><b>The link.</b> It is the direction Schoenmaker and Schramade's second guideline asks for: lengthen "
         "executive horizons through longer-term incentive structures.</p>"
         "<p><b>Remember:</b> Starbucks moved sustainability from the annual bonus into long-term equity pay.</p>",
)
