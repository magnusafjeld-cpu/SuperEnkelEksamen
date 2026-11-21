# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: bærekraft i bank (tema «bank», forelesning 11 og
   DNB-gjesteforelesningen 13. oktober 2026).

   Statiske spørsmål bnk-s01 … bnk-s30:
     s01 til s03  bankens rolle: screening mot ugunstig utvalg, costly state
                  verification og likviditetsrisiko fra lange lån og korte innskudd
     s04, s29     indirekte vesentlige temaer: Schoenmaker og Schramades
                  sammenligning og kredittrisiko som «alle motpartens risikoer»
     s05, s06     Cramer og Østergaard, Schindele og Vale
     s07 til s09, s28  risk-based mot value-based banking (eksklusjon,
                  ESG-integrasjon, impact-utlån)
     s10 til s13  kanalene inn i kredittrisiko, kredittskåren i fire trinn,
                  Weber (2010) og GABV-tallene
     s14 til s16, s30  grønne lån, SLL og DNBs tre lånetyper
     s17, s18     Equator Principles og UN Principles for Responsible Banking
     s19 til s21  EUs fire pilarer og Pillar 3 (overgangsrisiko, GAR og BTAR)
     s22 til s27  DNB: ESG-risikovurderingen, avoided emissions, de fem fasene,
                  dilemmaene og hvorfor bankene bør bry seg

   Kilder: fag/fie459/_fragmenter/k11.html, foilene til forelesning 11
   (_tekst/FIE459_H26_11_Banking.txt) og DNB-foilene
   (_tekst/26_10_13_DNB_at_NHH_Sustainable_Finance.txt).
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# Bankens rolle og forretningsmodell
# ---------------------------------------------------------------------------
statisk(
    "bnk-s01", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the information problems a bank handles when it lends and the tool it uses at each stage.",
        "Lecture 11 ties each tool to a stage of the loan: one before the loan is granted, one while the project "
        "runs and one after a borrower fails to pay.",
        "<p><b>Step 1: has any loan been granted yet?</b> Look at when the advisers act.</p>"
        "<p><b>Step 2: name the information problem that exists at that stage.</b></p>"
        "<p><b>Step 3: strike options that describe the bank's funding rather than its lending.</b></p>",
    ),
    q="<p>Sparebank Vest receives loan applications from fifty small firms for new projects. Before deciding, its "
      "advisers study each business plan, the owners' track record and the sector's sustainability trends. They "
      "turn down the weakest applicants.</p>"
      "<p>Which problem does this step mainly guard against?</p>",
    alternativer=[
        R("Adverse selection, by screening projects before the loan is granted"),
        F("Moral hazard, by monitoring the borrower during the project",
          "Moral hazard is opportunistic behaviour after the loan is granted. No loan has been granted yet."),
        F("Costly state verification, by auditing borrowers who fail to pay",
          "Verification comes when a borrower fails to meet its obligations. Nobody has borrowed yet."),
        F("Liquidity risk, by keeping enough cash for depositors who withdraw",
          "Liquidity risk is about the bank's funding, not about choosing borrowers."),
    ],
    kort="<p><b>Adverse selection.</b> Screening before the loan narrows the information gap between the bank and "
         "the applicants, so weak projects are weeded out before any money is lent.</p>",
    full="<p><b>The bank's core skill.</b> A bank handles asymmetric information: the borrower knows more about the "
         "project than the bank. Lecture 11 names three tools. Screening projects before a loan prevents adverse "
         "selection. Monitoring after the loan is granted prevents moral hazard, opportunistic behaviour during "
         "the project. Costly state verification means auditing borrowers who fail to pay.</p>"
         "<p><b>The case.</b> No loan has been granted. The advisers compare applicants and reject the weakest: "
         "screening against adverse selection. Analysing sector-wide sustainability trends is also part of the "
         "bank's information role in the lecture.</p>"
         "<p><b>The usual mix-up.</b> Swapping the timing. Adverse selection is a problem before the contract, "
         "moral hazard after it.</p>"
         "<p><b>Remember:</b> screen before, monitor during, verify after a failure to pay.</p>",
)

statisk(
    "bnk-s02", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the tools a bank uses against asymmetric information and when each one applies.",
        "Screening comes before the loan, monitoring while the project runs and verification once the borrower "
        "fails to meet its obligations.",
        "<p><b>Step 1: at what stage of the loan are we?</b> The loan was granted some time ago.</p>"
        "<p><b>Step 2: what has the borrower done that triggers the bank's action?</b></p>"
        "<p><b>Step 3: match the bank's response to the tool for that situation.</b></p>",
    ),
    q="<p>A fish farmer stops paying interest on its loan from Kystbanken, claiming that a sea-lice outbreak has "
      "wiped out its income. Kystbanken sends its own auditors to go through the farmer's accounts and stock "
      "records before agreeing to any new terms.</p>"
      "<p>Which part of the bank's role does this illustrate?</p>",
    alternativer=[
        R("Costly state verification: auditing a borrower that fails to meet its obligations"),
        F("Screening: checking projects before the loan is granted to avoid adverse selection",
          "The loan was granted long ago."),
        F("Monitoring: following the borrower during the project to prevent moral hazard",
          "Monitoring is the routine follow-up while the borrower pays. Something more specific has happened "
          "here."),
        F("Funding: lending long while borrowing short from depositors",
          "That is how the bank finances its loans. It says nothing about checking a borrower's claim."),
    ],
    kort="<p><b>Costly state verification.</b> When a borrower fails to meet its obligations, the bank pays to "
         "verify the borrower's true state before it renegotiates.</p>",
    full="<p><b>Three tools against asymmetric information.</b> Lecture 11 lists screening before a loan (against "
         "adverse selection), monitoring after it is granted (against moral hazard) and costly state "
         "verification: auditing borrowers who fail to meet their contractual obligations.</p>"
         "<p><b>The case.</b> The farmer has stopped paying and claims its income is gone. The bank cannot take "
         "the claim at face value, so it pays for its own audit before it renegotiates. That is costly state "
         "verification.</p>"
         "<p><b>The usual mix-up.</b> Calling every check monitoring. Monitoring is routine follow-up while the "
         "project runs. Verification is triggered by a failure to pay. It is costly because the bank must dig "
         "into the borrower's real situation.</p>"
         "<p><b>Remember:</b> a borrower that stops paying triggers costly state verification.</p>",
)

statisk(
    "bnk-s03", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the risks in a bank's business model and which one a wave of withdrawals turns acute.",
        "Lecture 11 lists market, credit, liquidity, operational, reputational and political risk. Banks provide "
        "long-term loans funded by short-term deposits.",
        "<p><b>Step 1: what are the depositors doing?</b></p>"
        "<p><b>Step 2: why is that a problem for a bank whose assets are long-term loans?</b></p>"
        "<p><b>Step 3: tell the cause of the trouble from the risk that has become acute.</b></p>",
    ),
    q="<p>Rumours spread that Nordfjord Bank has large losses on loans to fossil fuel firms. Within days many "
      "depositors move their savings to other banks. Most of Nordfjord's assets are long-term mortgages and "
      "business loans that cannot be sold quickly.</p>"
      "<p>Which of the bank's risks has now become acute?</p>",
    alternativer=[
        R("Liquidity risk, since deposits are withdrawn while the loans they fund are long-term"),
        F("Political risk, since governments may tighten rules on fossil fuel lending",
          "No rule has changed. The pressure comes from depositors."),
        F("Operational risk, since the bank's own systems and processes may fail",
          "Nothing in the case concerns the bank's systems or processes."),
        F("Market risk, since higher interest rates lower the value of the mortgages",
          "The case mentions no change in interest rates."),
    ],
    kort="<p><b>Liquidity risk.</b> Banks provide long-term loans funded by short-term deposits. When depositors "
         "withdraw at once, the bank cannot turn its loans into cash fast enough.</p>",
    full="<p><b>The business model.</b> A bank's balance sheet is mostly loans, funded by deposits and debt with a "
         "thin layer of equity. The lecture's summary: banks provide long-term loans funded by short-term "
         "deposits. Profit comes mainly from the spread between lending and deposit rates.</p>"
         "<p><b>The risks.</b> Lecture 11 lists macroeconomic and market risk, credit risk, liquidity risk "
         "(depositors withdraw), operational, reputational and political risk.</p>"
         "<p><b>The case.</b> The trigger is news about credit losses, but what bites now is the withdrawal. "
         "Deposits leave in days while the mortgages run for years. That mismatch is liquidity risk.</p>"
         "<p><b>The usual mix-up.</b> Naming the cause instead of the risk that has become acute. The rumour "
         "concerns credit risk and spreads through reputation. The bank's immediate problem is funding.</p>"
         "<p><b>Remember:</b> long-term loans funded by short-term deposits: withdrawals are liquidity risk.</p>",
)

# ---------------------------------------------------------------------------
# Indirekte vesentlige temaer
# ---------------------------------------------------------------------------
statisk(
    "bnk-s04", tema="bank", type="paastand",
    hjelp=hjelp3(
        "This is about how Schoenmaker &amp; Schramade say a financial institution differs from an ordinary "
        "company.",
        "They compare the two on four points: what each focuses on, who its stakeholders are, how free it is and "
        "where its ESG issues sit.",
        "<p><b>Step 1: for each statement, decide which kind of firm it really describes.</b></p>"
        "<p><b>Step 2: think about what a bank manages day to day and how tightly it is regulated.</b></p>"
        "<p><b>Step 3: keep the statement that describes the financial institution correctly.</b></p>",
    ),
    q="<p>Schoenmaker &amp; Schramade (2019) contrast an ordinary company with a financial institution. Which "
      "statement about the financial institution matches their comparison?</p>",
    alternativer=[
        R("Its ESG issues sit mostly in its clients' activities, so they reach it only indirectly"),
        F("It focuses on its P&amp;L, while an ordinary company focuses on its balance sheet",
          "This swaps the two. Think about what a bank manages day to day."),
        F("It has no formal limits on its ownership or strategy, unlike an ordinary company",
          "It is the other way round: a bank's capital structure, ownership and risk taking are regulated."),
        F("It has little public interest beyond its products, just like an ordinary company",
          "Banks have «everyone» as stakeholders: they are part of society's infrastructure."),
    ],
    kort="<p><b>ESG reaches a bank indirectly, through its clients.</b> An ordinary company's ESG issues sit in its "
         "products and processes. A bank's sit primarily in the activities it finances.</p>",
    full="<p><b>The comparison.</b> Schoenmaker &amp; Schramade (2019) set the two side by side. Focus: an "
         "ordinary company watches its P&amp;L, a financial institution its balance sheet, interest exposure and "
         "asset-liability management. Stakeholders: limited public interest against «everyone», since banks are "
         "part of society's infrastructure. Freedom: no formal limits against a regulated capital structure, "
         "ownership and risk taking. ESG: products and processes against primarily the clients' activities.</p>"
         "<p><b>Why it matters.</b> This explains why the SASB map for commercial banks lists data security, "
         "access and affordability, product design, business ethics and systemic risk management, but no "
         "environmental issue. The bank's big ESG issues are its indirect material issues: its credits and "
         "investments.</p>"
         "<p><b>The usual mix-up.</b> Concluding that climate is immaterial for banks because their own footprint "
         "is small.</p>"
         "<p><b>Remember:</b> a bank's ESG sits in what it finances.</p>",
)

# ---------------------------------------------------------------------------
# Den sosiale siden: Cramer og Østergaard, Schindele og Vale
# ---------------------------------------------------------------------------
statisk(
    "bnk-s05", tema="bank", type="fakta",
    hjelp=hjelp3(
        "This is about what Cramer's study of bank branches in India implies for policies that widen access to "
        "banks.",
        "The study follows employment, savings accounts, hospital credit and household health in the districts "
        "that got more branches.",
        "<p><b>Step 1: recall the direction of each effect in the study.</b> Did each outcome improve, worsen or "
        "stay the same?</p>"
        "<p><b>Step 2: ask whether the effects stop at firms or reach households.</b></p>"
        "<p><b>Step 3: keep the option that matches every effect.</b></p>",
    ),
    q="<p>A government considers a rule that pushes banks to open branches in districts that have few of them. An "
      "adviser cites Cramer's study of a 2005 Reserve Bank of India policy that did the same. What does that study "
      "suggest the rule could achieve?</p>",
    alternativer=[
        R("Social gains beyond finance: more jobs, more savings accounts and better household health"),
        F("Gains for firms only: more credit for small businesses but no change for households",
          "Cramer finds effects on households: employment, savings accounts and health."),
        F("Worse health care, since new branches would draw credit away from local hospitals",
          "Cramer finds that hospitals used more credit and that health improved."),
        F("More savings accounts only: households would bank more but their work and health would not change",
          "Employment and health improved too."),
    ],
    kort="<p><b>Social gains beyond finance.</b> In Cramer's study household employment and savings accounts rose, "
         "hospitals used more credit and households became less likely to suffer non-chronic illness.</p>",
    full="<p><b>The finding.</b> A 2005 Reserve Bank of India policy gave treatment districts 27 more bank branches "
         "after five years. Household employment and access to savings accounts rose and hospitals used more "
         "credit. Six years after the policy, households were 19 percentage points less likely to suffer "
         "non-chronic illness in a given month.</p>"
         "<p><b>What it implies.</b> Bank access is not only a matter of credit for small firms. It can reach "
         "household welfare, which is why lecture 11 puts the study on the social side of banking.</p>"
         "<p><b>The usual mix-up.</b> Treating banks as a firm-level story only. Lecture 11 stresses that banks "
         "matter most for SMEs, but Cramer's effects reach households and their health.</p>"
         "<p><b>Remember:</b> more bank branches, better household health (Cramer).</p>",
)

statisk(
    "bnk-s06", tema="bank", type="fakta",
    hjelp=hjelp3(
        "This is about what the study of Norwegian savings banks implies about stakeholder governance.",
        "Compare the two kinds of bank in the finding. Who governs each? Did social capital help both?",
        "<p><b>Step 1: name the kind of bank that gained from social capital.</b></p>"
        "<p><b>Step 2: ask what that says about stakeholder governance in a competitive market.</b> A weakness, "
        "a strength or irrelevant?</p>"
        "<p><b>Step 3: strike options that contradict the difference between the two kinds of bank.</b></p>",
    ),
    q="<p>Østergaard, Schindele &amp; Vale study Norwegian banks after deregulation. Savings banks, governed by their "
      "stakeholders, were more likely to survive in communities with high social capital, while commercial banks "
      "showed no such effect. What does the finding suggest?</p>",
    alternativer=[
        R("A stakeholder-governed bank's roots in its community can help it survive when competition sharpens"),
        F("Stakeholder governance makes a bank fragile, since no single owner disciplines its managers",
          "The finding points the other way for savings banks in communities with high social capital."),
        F("Ownership form stops mattering once a market is deregulated, since all banks then face the same rules",
          "The effect differs between savings banks and commercial banks, so ownership form matters."),
        F("Local trust helps every bank equally, so a commercial bank gains as much as a savings bank",
          "Commercial banks showed no such effect."),
    ],
    kort="<p><b>Community roots can be a strength.</b> Savings banks governed by their stakeholders gained from local "
         "social capital after deregulation. Commercial banks did not.</p>",
    full="<p><b>The study.</b> Østergaard, Schindele &amp; Vale look at Norwegian banks after deregulation. Savings "
         "banks are governed by their stakeholders rather than by shareholders alone.</p>"
         "<p><b>The finding.</b> In communities with high social capital, savings banks were more likely to "
         "survive. Commercial banks showed no such effect.</p>"
         "<p><b>What it suggests.</b> How a bank is governed and how it is tied to its community can matter for its "
         "own survival once competition opens up. The study belongs to the social side of banking in lecture 11, "
         "next to Cramer.</p>"
         "<p><b>The usual mix-up.</b> Assuming social capital helps every bank alike, or that stakeholder "
         "governance must be a weakness. The finding is specific to the stakeholder-governed banks.</p>"
         "<p><b>Remember:</b> high social capital helped savings banks survive, not commercial banks.</p>",
)

# ---------------------------------------------------------------------------
# Risk-based mot value-based banking
# ---------------------------------------------------------------------------
statisk(
    "bnk-s07", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about where a bank's exclusion policy sits in Schoenmaker &amp; Schramade's typology of bank "
        "loans.",
        "The typology applies the ladder from lecture 1 to bank loans. Each rung is either risk-based or "
        "value-based, depending on what the bank does with the loan.",
        "<p><b>Step 1: what does the bank do?</b> Does it refuse borrowers, price their ESG risk or fund projects "
        "for their impact?</p>"
        "<p><b>Step 2: find that action on the ladder and read off the approach.</b> Ignore what the commentator "
        "calls it.</p>",
    ),
    q="<p>Elvebank announces that it will no longer lend to coal miners or to producers of controversial weapons. "
      "A commentator calls this «value-based banking», since the bank is acting on its values. In Schoenmaker "
      "&amp; Schramade's typology of bank loans, where does the policy belong?</p>",
    alternativer=[
        R("Risk-based banking: exclusion, the first step on the sustainable finance ladder"),
        F("Value-based banking: the bank creates social value by refusing harmful clients",
          "In the typology, value-based banking means lending to create value. Refusing clients is a different "
          "rung."),
        F("Risk-based banking: ESG integration, since the bank prices the risk of coal",
          "Integration builds ESG into the risk premium. Elvebank does not price these clients; it turns them "
          "away."),
        F("Value-based banking: impact lending, since the bank changes where its money goes",
          "Impact lending means lending for impact. Stopping some loans funds nothing new."),
    ],
    kort="<p><b>Risk-based: exclusion (SF 1.0).</b> In the typology, exclusion and ESG integration are risk-based. "
         "Only impact lending and microfinance, at SF 3.0, are value-based.</p>",
    full="<p><b>The typology.</b> Schoenmaker &amp; Schramade (2019) apply the ladder of lecture 1 to bank loans. "
         "SF 1.0 is exclusion and SF 2.0 is ESG integration, both risk-based. SF 3.0 is impact lending and "
         "microfinance, which is value-based.</p>"
         "<p><b>The case.</b> Elvebank refuses certain sectors. That is exclusion, the first rung, whatever motive "
         "the bank states.</p>"
         "<p><b>The usual mix-up.</b> Reading «value-based» as «based on values». In the typology the word refers "
         "to creating value: the bank lends to create social and environmental value and needs only enough "
         "financial return to stay viable. In risk-based banking a borrower with poor ESG management pays more or "
         "is excluded. Refusing a borrower is the second of those, so it is risk-based.</p>"
         "<p><b>Remember:</b> exclusion and integration are risk-based; only lending for impact is value-based.</p>",
)

statisk(
    "bnk-s08", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about telling risk-based from value-based banking in Schoenmaker &amp; Schramade's typology.",
        "Risk-based banking uses sustainability to manage credit risk. Value-based banking uses lending to create "
        "something. Ask what drives the bank's choice of borrowers.",
        "<p><b>Step 1: why does the bank pick these borrowers?</b></p>"
        "<p><b>Step 2: how much profit does it aim for?</b> As much as possible, or enough to stay viable?</p>"
        "<p><b>Step 3: match the motive to the approach.</b></p>",
    ),
    q="<p>Grønnbank lends to housing cooperatives that build homes for low-income families and to small farms "
      "converting to organic production. It sets its rates to cover costs and risk with a modest margin. Its "
      "stated goal is the social and environmental value of the projects, with just enough profit to stay "
      "viable.</p>"
      "<p>Which approach does this illustrate?</p>",
    alternativer=[
        R("Value-based banking, the top rung of the ladder"),
        F("Risk-based banking with ESG integration, since the bank prices risk into its rates",
          "Pricing risk is not what drives these loans. Ask what the bank is lending for."),
        F("Risk-based banking with exclusion, since the bank avoids conventional borrowers",
          "The bank does not turn sectors away. It seeks out particular projects."),
        F("Finance as usual, since the bank still charges a margin",
          "Earning enough to stay viable is part of the approach here. Finance as usual maximises financial "
          "value only."),
    ],
    kort="<p><b>Value-based banking (SF 3.0).</b> The bank lends to create social and environmental value and needs "
         "only enough return to stay viable, as in impact lending.</p>",
    full="<p><b>Two approaches.</b> In risk-based banking (SF 1.0 and 2.0), sustainability enters credit risk "
         "management: weak ESG means a higher premium or exclusion. In value-based banking (SF 3.0), the bank "
         "lends to create social and environmental value and needs only enough financial return to stay viable "
         "(Schoenmaker &amp; Schramade 2019). Impact lending and microfinance are the examples.</p>"
         "<p><b>The case.</b> Grønnbank picks projects for their social and environmental value and aims for "
         "viability, not maximum profit. That is impact lending: value-based.</p>"
         "<p><b>The usual mix-up.</b> Thinking any bank that charges for risk is risk-based. Every viable bank "
         "covers its costs and risk. The question is what drives the lending decision: avoiding risk or creating "
         "value.</p>"
         "<p><b>Remember:</b> lending for impact with just enough return to stay viable: value-based.</p>",
)

statisk(
    "bnk-s09", tema="bank", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the two approaches in Schoenmaker &amp; Schramade's typology of bank loans.",
        "Each rung of the ladder for bank loans is risk-based or value-based. What decides it is the bank's aim "
        "with the loan, not how risky the borrower is.",
        "<p><b>Step 1: where does a higher risk premium for weak ESG management sit on the ladder?</b></p>"
        "<p><b>Step 2: where does microfinance sit? Does a borrower's high credit risk move it?</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements from lecture 11.</p>"
      "<p>I. A bank that adds a sustainability score to its credit model, so that weak ESG management raises the "
      "risk premium, practises risk-based banking.<br>"
      "II. Microfinance is risk-based banking, since small borrowers without collateral carry a high credit "
      "risk.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: in the typology microfinance is value-based, at the top of the ladder."),
        F("Both I and II", "Statement II fails: microfinance sits with impact lending, not with risk-based "
                           "banking."),
        F("Neither I nor II", "Look again at statement I: where does a higher risk premium for weak ESG sit in "
                              "the typology?"),
    ],
    kort="<p><b>Only I.</b> An ESG score in the credit model is ESG integration (SF 2.0), which is risk-based. "
         "Microfinance is value-based (SF 3.0): the bank lends to create value, whatever the borrowers' risk.</p>",
    full="<p><b>Statement I.</b> In risk-based banking, sustainability criteria are integrated into credit risk "
         "management and show up in the risk premium. A sustainability score that raises the premium for weak ESG "
         "management is ESG integration, SF 2.0. The statement is correct.</p>"
         "<p><b>Statement II.</b> In Schoenmaker &amp; Schramade's typology, microfinance sits with impact lending at "
         "SF 3.0: value-based banking. The bank lends to create social and environmental value with just enough "
         "return to stay viable. Small borrowers may well be risky, but the approach is set by the bank's aim, not "
         "by the borrower's risk. The statement is false.</p>"
         "<p><b>The usual mix-up.</b> Thinking that lending to risky borrowers makes a bank risk-based. Risk-based "
         "means that sustainability enters the credit risk premium or leads to exclusion.</p>"
         "<p><b>Remember:</b> ESG in the risk premium is risk-based; impact lending and microfinance are "
         "value-based.</p>",
)

statisk(
    "bnk-s28", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about placing a bank's lending policy on Schoenmaker &amp; Schramade's ladder for bank loans.",
        "Exclusion refuses borrowers. ESG integration builds sustainability criteria into credit risk "
        "management. Lending for impact funds projects for the value they create.",
        "<p><b>Step 1: does the bank still lend to the affected firms?</b></p>"
        "<p><b>Step 2: if it does, what changes in the terms it offers? Why?</b></p>"
        "<p><b>Step 3: name the rung and the approach it belongs to.</b></p>",
    ),
    q="<p>Kystbanken keeps lending to firms in every sector. For firms whose business model depends on fossil "
      "fuels, however, its credit department now shortens loan maturities and asks for more collateral, since "
      "its analysis shows that their credit risk rises as climate policy tightens.</p>"
      "<p>Where does this policy sit in Schoenmaker &amp; Schramade's typology of bank loans?</p>",
    alternativer=[
        R("ESG integration: risk-based banking that builds sustainability into credit risk management"),
        F("Exclusion: risk-based banking that refuses fossil fuel firms",
          "The bank still lends to these firms. It changes the terms, not the client list."),
        F("Impact lending: value-based banking that steers money to the transition",
          "The bank is not funding projects for their impact. It is protecting itself against credit risk."),
        F("Microfinance: value-based banking for borrowers without access to credit",
          "Nothing in the case concerns small borrowers who lack access to credit."),
    ],
    kort="<p><b>ESG integration (SF 2.0), risk-based.</b> The bank keeps lending but builds climate risk into its "
         "credit terms. Sustainability enters credit risk management.</p>",
    full="<p><b>The ladder for bank loans.</b> Schoenmaker &amp; Schramade (2019): SF 1.0 is exclusion, SF 2.0 is "
         "ESG integration, both risk-based. SF 3.0 is impact lending and microfinance, which is value-based.</p>"
         "<p><b>The case.</b> No sector is refused, so it is not exclusion. The bank changes maturities and "
         "collateral because its analysis shows a higher credit risk. That is sustainability criteria integrated "
         "into credit risk management: ESG integration. In the lecture this usually shows up in the risk premium; "
         "shorter maturities and more collateral are other ways to price the same risk.</p>"
         "<p><b>The usual mix-up.</b> Calling any climate-motivated policy value-based. The test is the motive in "
         "the credit decision. Here the bank manages risk; it does not lend to create value.</p>"
         "<p><b>Remember:</b> keep lending but price the ESG risk: ESG integration, risk-based.</p>",
)

# ---------------------------------------------------------------------------
# ESG inn i kredittrisiko: kanaler, kredittskår, Weber, GABV
# ---------------------------------------------------------------------------
statisk(
    "bnk-s10", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the two channels through which ESG factors reach a bank's credit risk.",
        "ESG can change how able the borrower is to pay, or what the assets securing the loan are worth.",
        "<p><b>Step 1: has the borrowers' ability to pay changed?</b> Look at their incomes and payments.</p>"
        "<p><b>Step 2: if not, what else in the case has changed?</b></p>"
        "<p><b>Step 3: check whether the climate risk in the case comes from events or from policy.</b></p>",
    ),
    q="<p>Havbank holds mortgages on holiday homes along a low-lying coast. The owners' incomes are stable and none "
      "has missed a payment. New flood maps show rising flood risk for many of the homes. Buyers start to avoid "
      "the area.</p>"
      "<p>Through which channel does this ESG factor raise Havbank's credit risk?</p>",
    alternativer=[
        R("The collateral: the homes securing the loans are worth less"),
        F("The borrowers' creditworthiness: the owners are now less able to pay",
          "The case says incomes are stable and payments are made."),
        F("The bank's liquidity: depositors will withdraw as flood risk rises",
          "Nothing in the case concerns depositors. The question is about the loans."),
        F("Transition risk: the homes will lose value under stricter energy rules",
          "Flooding is a physical climate risk, not a risk from policy or technology."),
    ],
    kort="<p><b>The collateral.</b> ESG reaches a credit decision through the borrower's creditworthiness and "
         "through the value of the collateral. Here only the second has moved.</p>",
    full="<p><b>Two channels.</b> In lecture 11, ESG factors change a borrower's creditworthiness, which moves the "
         "credit risk indicators the bank prices on. They also change the collateral value, for example of real "
         "estate (Schoenmaker &amp; Schramade 2019).</p>"
         "<p><b>The case.</b> The owners pay as before, so creditworthiness has not changed. But the homes that "
         "secure the mortgages are worth less as flood risk rises. If a borrower ever defaults, the bank recovers "
         "less.</p>"
         "<p><b>The usual mix-up.</b> Thinking ESG matters to a lender only if the borrower's cash flow suffers. "
         "Collateral is a separate channel. The flood risk is physical climate risk; transition risk comes from "
         "policy or technology, such as stricter energy rules.</p>"
         "<p><b>Remember:</b> ESG reaches credit risk through creditworthiness and through collateral.</p>",
)

statisk(
    "bnk-s11", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the order of Schoenmaker &amp; Schramade's four-step sustainability credit score.",
        "The steps move from the sector as a whole to the single firm and end with one overall credit "
        "assessment.",
        "<p><b>First, note what the analyst has already finished.</b></p>"
        "<p><b>Then ask whom she is describing now:</b> the sector, an average firm in it or this particular "
        "salmon farmer with its own strengths and weaknesses?</p>"
        "<p><b>Finally, place that task in the sequence.</b></p>",
    ),
    q="<p>A credit analyst at Fjordbank applies Schoenmaker &amp; Schramade's four-step sustainability credit score "
      "to a salmon farmer. She has finished her analysis of the aquaculture industry. Now she sketches how an "
      "average firm in the sector would fare under business as usual, as a sustainable business and as a future "
      "sustainable business.</p>"
      "<p>Which step is she at?</p>",
    alternativer=[
        R("Step 2: sketching paths for the average company"),
        F("Step 3: determining the firm's material ESG issues",
          "That step looks at this firm's own vulnerabilities and opportunities. She is still describing an "
          "average firm."),
        F("Step 4: weighting the issues into an overall credit assessment",
          "Nothing has been weighted or combined yet."),
        F("Step 1: analysing the company's industry", "The case says the industry analysis is finished."),
    ],
    kort="<p><b>Step 2: paths for the average company.</b> Business as usual, sustainable business and future "
         "sustainable business describe the sector, before she turns to the firm's own material issues.</p>",
    full="<p><b>The four steps.</b> Schoenmaker &amp; Schramade propose a sustainability credit score in four "
         "steps: (1) analyse the company's industry; (2) sketch paths for the average company (business as usual, "
         "sustainable business, future sustainable business); (3) determine the material ESG issues, with the "
         "firm's vulnerabilities and opportunities; (4) weight them and combine them into an overall credit "
         "assessment.</p>"
         "<p><b>The case.</b> The industry analysis is done and she now describes the three paths for an average "
         "firm. That is step 2.</p>"
         "<p><b>The usual mix-up.</b> Jumping to the firm's own issues. Step 2 is still about the average company. "
         "Step 3 is where this salmon farmer's own vulnerabilities and opportunities come in.</p>"
         "<p><b>Remember:</b> industry, paths, material issues, weighting.</p>",
)

statisk(
    "bnk-s12", tema="bank", type="fakta",
    hjelp=hjelp3(
        "This is about the evidence lecture 11 gives that sustainability criteria improve credit assessment.",
        "Several studies appear in lectures 10 and 11. Ask what each one measures: credit models, bank returns, "
        "rating agencies or household outcomes.",
        "<p><b>Step 1: what exactly does the committee doubt?</b> That sustainability criteria improve its own "
        "credit rating process.</p>"
        "<p><b>Step 2: for each option, ask what the study measures.</b></p>"
        "<p><b>Step 3: keep the one that tests the committee's doubt directly.</b></p>",
    ),
    q="<p>Fjellbank's credit committee doubts that adding sustainability criteria to its credit rating process does "
      "anything beyond public relations. Which finding speaks most directly against the committee?</p>",
    alternativer=[
        R("Weber (2010): sustainability criteria help predict how a debtor will perform financially"),
        F("GABV data: values-based banks earned a clearly higher ROE than the global banks did",
          "The GABV data show a similar ROE. They also compare banks, not credit models."),
        F("Attig et al. (2013): banks give cheaper loans to firms with strong social performance",
          "Attig et al. study credit rating agencies, not bank loan pricing."),
        F("Cramer: more bank branches lowered loan losses in the treated districts",
          "Cramer studies employment, savings and health, not loan losses."),
    ],
    kort="<p><b>Weber (2010).</b> Sustainability criteria can predict a debtor's financial performance and improve "
         "the predictive validity of the credit rating process. They are information, not decoration.</p>",
    full="<p><b>The finding.</b> Weber (2010) concludes that sustainability criteria can be used to predict a "
         "debtor's financial performance and that they improve the predictive validity of the credit rating "
         "process. The sustainability a firm shows influences its creditworthiness as part of its financial "
         "performance.</p>"
         "<p><b>The case.</b> The committee thinks the criteria add nothing to credit quality. Weber shows that "
         "they add predictive power. This is evidence for risk-based banking at SF 2.0: ESG belongs in credit "
         "risk management because it carries information about the borrower's financial performance.</p>"
         "<p><b>The usual mix-up.</b> Citing evidence about something else. The GABV data compare values-based "
         "banks with global banks. Attig et al. study rating agencies. Cramer studies bank access and health.</p>"
         "<p><b>Remember:</b> Weber (2010): sustainability criteria sharpen credit ratings.</p>",
)

statisk(
    "bnk-s13", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about reading the GABV comparison of values-based banks with global banks.",
        "Return on equity equals return on assets times the ratio of assets to equity.",
        "<p><b>Step 1: write the return on equity in terms of the return on assets and leverage.</b></p>"
        "<p><b>Step 2: if the return on assets is higher but the return on equity lower, what must be true of "
        "assets over equity?</b></p>"
        "<p><b>Step 3: check the other options against the balance sheet shares in the data.</b></p>",
    ),
    q="<p>In the GABV data cited by Schoenmaker &amp; Schramade (2019), values-based banks earned a higher return "
      "on assets than global systemically important banks over 2006 to 2015, but a slightly lower return on "
      "equity. What explains this combination?</p>",
    alternativer=[
        R("They held more equity per unit of assets, so they were less leveraged"),
        F("They held fewer loans than global banks, so each unit of their assets earned less",
          "Loans were a larger share of their assets. And a higher return on assets means their assets earned "
          "more."),
        F("They took more risk, so their returns swung more from year to year",
          "Their ROE was less volatile, not more. Risk does not explain the gap between ROA and ROE."),
        F("They relied less on deposits, so their funding cost them more",
          "Deposits were a larger share of their funding, not a smaller one."),
    ],
    kort="<p><b>Lower leverage.</b> ROE is ROA times assets over equity. With more equity per unit of assets, a "
         "higher ROA can still give a lower ROE.</p>",
    full="<p><b>The data.</b> GABV (2016), cited by Schoenmaker &amp; Schramade (2019), compare values-based banks "
         "(VBBs) with global systemically important banks. VBBs: loans 76.8% of assets, deposits 81.7%, equity "
         "8.1% (2015); ROA 0.65% and ROE 8.3% over 2006 to 2015, with a standard deviation of ROE of 4.9%. Global "
         "banks: 41.6%, 52.2%, 7.3%, 0.53%, 8.7% and 7.7%.</p>"
         "<p><b>The identity.</b> Return on equity equals return on assets times assets divided by equity "
         "(general background). A bank with a thinner equity layer turns the same ROA into a higher ROE.</p>"
         "<p><b>The case.</b> VBBs had the higher equity share, so lower leverage. That is how a higher ROA goes "
         "with a slightly lower ROE.</p>"
         "<p><b>The usual mix-up.</b> Reading the lower ROE as a sacrifice for the mission. The ROE is similar, "
         "with lower leverage, a higher ROA and much lower volatility: VBBs are more stable.</p>"
         "<p><b>Remember:</b> similar ROE, higher ROA, less leverage, less volatility.</p>",
)

# ---------------------------------------------------------------------------
# Grønne lån, SLL og DNBs lånetyper
# ---------------------------------------------------------------------------
statisk(
    "bnk-s14", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about telling a green loan from a sustainability-linked loan and from an unlabelled loan.",
        "Ask what the loan ties to sustainability: the use of the money, its price or nothing at all.",
        "<p><b>Step 1: may the cooperative spend the money on anything it likes?</b> Read the loan agreement.</p>"
        "<p><b>Step 2: does the margin move with any target?</b></p>"
        "<p><b>Step 3: is one tied feature enough for a label? Which label?</b> Ignore who owns the borrower.</p>",
    ),
    q="<p>A dairy cooperative borrows NOK 80 million from Fjordbank. The agreement restricts the money to biogas "
      "plants that turn manure into energy. Fjordbank follows each payout to the plants. The margin is the same for "
      "the whole life of the loan.</p>"
      "<p>How should the loan be classified?</p>",
    alternativer=[
        R("A green loan: what is tied to sustainability is the use of the money"),
        F("A sustainability-linked loan: what is tied to sustainability is the borrower's performance",
          "The margin never changes, so nothing depends on the cooperative's performance."),
        F("A social loan: what is tied to sustainability is the benefit to the farmer members",
          "The label depends on what the money funds, not on who owns the borrower."),
        F("No labelled loan: without a margin tied to targets, a loan carries no sustainability label",
          "A margin tied to targets is one way to earn a label, not the only one."),
    ],
    kort="<p><b>A green loan.</b> The money is earmarked for biogas and its use is tracked. That defines a green loan, "
         "whatever the margin does.</p>",
    full="<p><b>Two loan products.</b> Lecture 11 separates green loans, whose proceeds are tracked and allocated to "
         "green projects, from sustainability-linked loans (SLLs), whose interest rate is linked to the borrower's "
         "ESG score or sustainability KPIs while the money is not earmarked. Both follow market principles from LMA, "
         "LSTA and APLMA.</p>"
         "<p><b>The case.</b> The money can only fund biogas plants and the bank follows each payout. The margin is "
         "fixed. That is a green loan.</p>"
         "<p><b>The usual mix-up.</b> Thinking a loan needs a margin tied to targets to carry a label. A green loan "
         "ties the use of proceeds; its price need not depend on the borrower. DNB's green loans offer a possible "
         "margin benefit while the green criteria are met, but the defining feature is still the earmarking.</p>"
         "<p><b>Remember:</b> green loan: the money is tied. SLL: the price is tied.</p>",
)

statisk(
    "bnk-s15", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about whether a carbon-intensive firm can hold a labelled loan and which label fits.",
        "Green and transition loans earmark the money. A sustainability-linked loan leaves the money free and ties "
        "the margin to targets. Ask what the loan principles say about the borrower's sector.",
        "<p><b>Step 1: is the money earmarked?</b></p>"
        "<p><b>Step 2: what moves the margin?</b></p>"
        "<p><b>Step 3: ask whether the principles restrict the borrower's sector.</b> The lecture's data on which "
        "sectors take such loans can help.</p>",
    ),
    q="<p>An oil and gas producer borrows money it may spend as it likes. Its interest margin is cut if flaring and "
      "methane intensity fall below levels agreed at signing. It is raised if they do not. An environmental group "
      "says no oil company can hold a sustainability-labelled loan.</p>"
      "<p>Which assessment is correct?</p>",
    alternativer=[
        R("A sustainability-linked loan: the margin follows targets and the sector does not bar it"),
        F("A green loan: the targets are environmental, so the loan counts as green whatever it funds",
          "A green loan earmarks the money for green projects. This money may be spent on anything."),
        F("A transition loan: the margin rewards the producer for cutting its own emissions",
          "In DNB's definition a transition loan earmarks its proceeds. This loan earmarks nothing."),
        F("No labelled loan: the loan principles admit only borrowers from low-carbon sectors",
          "The SLL principles do not restrict the borrower's sector. The UN PRI data show SLLs in oil and "
          "petroleum among other sectors."),
    ],
    kort="<p><b>A sustainability-linked loan.</b> The money is free and the margin follows targets. Nothing in the "
         "principles excludes an oil company with credible targets.</p>",
    full="<p><b>The product.</b> A sustainability-linked loan links the interest rate to the improvement of the "
         "borrower's ESG score or sustainability KPIs. The money is not earmarked. In DNB's description the margin "
         "is tied to pre-agreed sustainability targets and rises or falls with performance, in line with the LMA "
         "Sustainability-Linked Loan Principles.</p>"
         "<p><b>The case.</b> Free use of the money and a margin that moves with flaring and methane targets: an "
         "SLL. The UN PRI chart in lecture 11 shows SLLs spread across many sectors, oil and petroleum among "
         "them.</p>"
         "<p><b>The usual mix-up.</b> Reading the label as a verdict on how green the borrower is. The label tells "
         "you what is tied. An SLL can go to an oil company with credible targets, just as a green loan can go to a "
         "polluter for one clean project.</p>"
         "<p><b>Remember:</b> the label says what is tied, not how green the borrower is.</p>",
)

statisk(
    "bnk-s16", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the three loan types DNB presented in its guest lecture.",
        "DNB describes each product by three features: what the proceeds may fund, which LMA document it follows "
        "and how the margin works.",
        "<p><b>Step 1: for each product, recall what the money may be used for.</b></p>"
        "<p><b>Step 2: recall how the margin works for each.</b></p>"
        "<p><b>Step 3: find the feature that the first two share and the third lacks.</b></p>",
    ),
    q="<p>DNB Corporate Banking offers three loan types: green loans, transition loans and sustainability-linked "
      "loans. A client asks what green loans and transition loans have in common that sustainability-linked "
      "loans lack. What should the adviser answer?</p>",
    alternativer=[
        R("Their money is earmarked for specific investments, while an SLL may fund general purposes"),
        F("Their margin rises or falls with pre-agreed targets, while an SLL's margin is fixed",
          "That swaps the products: the SLL is the one whose margin moves with targets."),
        F("They follow the LMA Sustainability-Linked Loan Principles, while an SLL follows ICMA's rules",
          "Green loans follow the LMA Green Loan Principles and transition loans an LMA guide of their own."),
        F("They are open only to borrowers whose whole business already has a green rating",
          "Nothing in DNB's definitions sets a requirement on the borrower's overall rating."),
    ],
    kort="<p><b>Earmarked proceeds.</b> Green loans fund investments with an environmental benefit and transition "
         "loans investments that aim to cut emissions. An SLL has no use-of-proceeds requirement.</p>",
    full="<p><b>DNB's three products.</b> Green loans: proceeds earmarked for investments with an environmental "
         "benefit, in line with the LMA Green Loan Principles, with a possible margin benefit while the criteria "
         "are met. Transition loans: proceeds earmarked for investments that aim to cut emissions, in line with "
         "the LMA guide for transition loans, with the same possible margin benefit. Sustainability-linked loans: "
         "no requirement on the use of proceeds, in line with the LMA Sustainability-Linked Loan Principles, with "
         "a margin that rises or falls with pre-agreed targets.</p>"
         "<p><b>The answer.</b> The first two are financing earmarked for specific investments; the SLL is "
         "financing for general operations.</p>"
         "<p><b>The usual mix-up.</b> Thinking a transition loan works like an SLL because both concern emissions. "
         "A transition loan still earmarks the money; only the SLL ties the margin to targets.</p>"
         "<p><b>Remember:</b> green and transition loans: tied money. SLL: tied margin.</p>",
)

statisk(
    "bnk-s30", tema="bank", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the market principles behind sustainable loans and who can take a sustainability-linked "
        "loan.",
        "Check statement I against who writes the loan principles. Check statement II against what an SLL ties "
        "to sustainability and whom it is open to.",
        "<p><b>Step 1: recall which organisations publish the Green Loan Principles and the Sustainability-Linked "
        "Loan Principles.</b></p>"
        "<p><b>Step 2: recall what an SLL ties to sustainability and whether the principles restrict the borrower's sector.</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements about sustainable loans in lecture 11.</p>"
      "<p>I. Green loans and sustainability-linked loans follow market principles from the loan market "
      "associations LMA, LSTA and APLMA.<br>"
      "II. A sustainability-linked loan can go to an oil company, since what it ties to sustainability is the "
      "margin, not the borrower's sector.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Look again at statement II: does an SLL's label depend on the borrower's sector or on "
                    "what is tied?"),
        F("Only II", "Look again at statement I: who writes the Green Loan Principles?"),
        R("Both I and II"),
        F("Neither I nor II", "Check statement I against who publishes the loan principles and statement II "
                              "against what an SLL ties."),
    ],
    kort="<p><b>Both I and II.</b> Both products follow loan market principles from LMA, LSTA and APLMA. An SLL ties "
         "its margin to targets, so an oil company with credible targets can take one.</p>",
    full="<p><b>Statement I.</b> The loan market associations LMA, LSTA and APLMA publish the Green Loan "
         "Principles, the Sustainability-Linked Loan Principles and, for social purposes, the Social Loan "
         "Principles. They are the loan counterparts of ICMA's bond principles in lecture 10. The statement is "
         "correct.</p>"
         "<p><b>Statement II.</b> An SLL links the interest rate to the improvement of the company's ESG score or "
         "sustainability KPIs; the money is not earmarked. The label says what is tied, not how green the "
         "borrower is. The UN PRI chart in lecture 11 shows SLLs spread across many sectors, oil and petroleum "
         "among them. The statement is correct.</p>"
         "<p><b>The usual mix-up.</b> Reading a loan label as a verdict on the borrower, or assuming that every "
         "labelled loan must fund green projects. Only the use-of-proceeds products earmark the money.</p>"
         "<p><b>Remember:</b> green loan: tracked proceeds. SLL: a margin tied to targets, open to any sector.</p>",
)

# ---------------------------------------------------------------------------
# Prinsipper for banker
# ---------------------------------------------------------------------------
statisk(
    "bnk-s17", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about what the Equator Principles cover compared with the other frameworks for banks.",
        "Lecture 11 presents frameworks at three levels: single projects, the bank's whole strategy and the "
        "bank's disclosures. Loan labels have their own principles.",
        "<p><b>Step 1: for each task, ask which level it works at.</b> A single project, the whole bank, a "
        "disclosure or one loan's label?</p>"
        "<p><b>Step 2: recall which level the Equator Principles are written for.</b></p>",
    ),
    q="<p>Nordbank has adopted the Equator Principles. Which of the following tasks do they give the framework "
      "for?</p>",
    alternativer=[
        R("Assessing and managing a new dam's environmental and social risks"),
        F("Reporting the bank's green asset ratio in its Pillar 3 ESG disclosure",
          "Pillar 3 is EU prudential disclosure for listed banks, set by the EBA."),
        F("Setting bank-wide targets aligned with the Paris Agreement",
          "Bank-wide alignment and target setting belong to the UN Principles for Responsible Banking."),
        F("Checking that a green loan follows the Green Loan Principles",
          "Those are loan market principles from LMA, LSTA and APLMA."),
    ],
    kort="<p><b>The dam's environmental and social risks.</b> The Equator Principles are a financial industry "
         "benchmark for determining, assessing and managing environmental and social risk in projects.</p>",
    full="<p><b>The Equator Principles.</b> They are «a financial industry benchmark for determining, assessing and "
         "managing environmental and social risk in projects». As of March 2021, 116 financial institutions in 37 "
         "countries had adopted them. Their ten principles follow the project cycle, from review and "
         "categorisation and an environmental and social assessment to covenants, independent monitoring and "
         "public reporting.</p>"
         "<p><b>The case.</b> Financing a dam is a project. Categorising it, assessing its environmental and "
         "social impact, writing covenants and arranging monitoring is what the Equator Principles cover.</p>"
         "<p><b>The usual mix-up.</b> Mixing the bank frameworks. The UN Principles for Responsible Banking cover "
         "the bank's whole strategy: alignment, impact and target setting. Pillar 3 is what the bank discloses. "
         "The Green Loan Principles define a loan label.</p>"
         "<p><b>Remember:</b> Equator Principles: risk in projects. PRB: the bank's strategy. Pillar 3: "
         "disclosure.</p>",
)

statisk(
    "bnk-s18", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the voluntary frameworks for financial institutions and which one covers a bank's overall "
        "strategy.",
        "Lecture 11 presents one framework for risk in single projects and one for the bank as a whole. Lecture "
        "12 has the counterpart for insurers. Disclosure rules are a separate matter.",
        "<p><b>Step 1: does the commitment cover one project or the whole bank?</b></p>"
        "<p><b>Step 2: is it a disclosure rule or a voluntary commitment?</b></p>"
        "<p><b>Step 3: check that the framework is written for banks.</b></p>",
    ),
    q="<p>Sjøbank's board commits to align its strategy with the Sustainable Development Goals and the Paris "
      "Agreement. It will first analyse where its portfolio has its largest positive and negative impacts, then "
      "set targets for those areas and report on progress.</p>"
      "<p>Which framework is Sjøbank following?</p>",
    alternativer=[
        R("The UN Principles for Responsible Banking"),
        F("The Equator Principles",
          "These manage environmental and social risk in individual projects, not the bank's overall strategy."),
        F("The UNEP FI Principles for Sustainable Insurance", "These are principles for insurers."),
        F("The EBA's Pillar 3 ESG disclosures",
          "Pillar 3 sets what listed banks must disclose. It does not ask a bank to align its strategy or set "
          "targets."),
    ],
    kort="<p><b>The UN Principles for Responsible Banking.</b> Alignment with the SDGs and Paris, then the three "
         "steps signatories follow: impact analysis, target setting and reporting.</p>",
    full="<p><b>The PRB.</b> The UN Principles for Responsible Banking (UNEP FI, 2019) are six: alignment (with the "
         "SDGs and the Paris Agreement), impact and target setting, clients and customers, stakeholders, "
         "governance and culture, transparency and accountability. Signatories follow three steps: impact "
         "analysis, target setting and reporting.</p>"
         "<p><b>The case.</b> Strategic alignment with the SDGs and Paris, an impact analysis, targets and "
         "reporting: the PRB.</p>"
         "<p><b>The usual mix-up.</b> Choosing the Equator Principles because they are also a voluntary banking "
         "framework. They work project by project. The PRB set the direction for the whole bank. The insurance "
         "counterpart is the PSI (lecture 12) and the investor counterpart the PRI (lecture 8).</p>"
         "<p><b>Remember:</b> PRB: align, analyse impact, set targets, report.</p>",
)

# ---------------------------------------------------------------------------
# Regulering: EUs fire pilarer og Pillar 3
# ---------------------------------------------------------------------------
statisk(
    "bnk-s19", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the headings of the EBA's Pillar 3 ESG disclosures for banks.",
        "Pillar 3 asks for risk disclosures (transition and physical), mitigating actions, the green asset ratio "
        "and its extension plus qualitative disclosures.",
        "<p><b>Step 1: is the bank reporting an exposure, a green share or an action that helps clients?</b></p>"
        "<p><b>Step 2: if it is an exposure, does it come from climate events or from the move to a low-carbon "
        "economy?</b></p>"
        "<p><b>Step 3: use the location of the homes in the case.</b></p>",
    ),
    q="<p>Most of Vestbank's mortgages are on older homes with poor energy labels. The homes lie inland, far from "
      "flood or storm zones. In its Pillar 3 ESG disclosure, where does this concentration belong?</p>",
    alternativer=[
        R("Transition risk: real estate exposures by the energy performance of the collateral"),
        F("Physical risk: exposures to acute and chronic climate events",
          "The homes are far from flood and storm zones. Poor energy labels are not about climate events."),
        F("Mitigating actions: loans that support clients' transition without meeting taxonomy criteria",
          "Nothing here supports a transition. The bank is reporting an exposure."),
        F("The green asset ratio: the share of exposures financing taxonomy-aligned activities",
          "The green asset ratio measures green lending, which these homes would hardly count towards."),
    ],
    kort="<p><b>Transition risk.</b> Pillar 3 asks banks to disclose real estate exposures by the energy "
         "performance of the collateral. Homes with poor labels are exposed to the move towards a low-carbon "
         "economy.</p>",
    full="<p><b>Pillar 3.</b> The EBA's implementing technical standards on Pillar 3 are the prudential ESG "
         "disclosures of listed banks, one of the EU's four pillars next to the taxonomy, SFDR and CSRD. They ask "
         "for risk disclosures, mitigating actions, the green asset ratio (GAR), the banking book taxonomy "
         "alignment ratio (BTAR) and qualitative disclosures.</p>"
         "<p><b>Two kinds of risk.</b> Transition risk: exposures to fossil fuel companies and real estate by the "
         "collateral's energy performance. Physical risk: exposures to chronic and acute climate events, by sector "
         "and geography.</p>"
         "<p><b>The case.</b> The concentration is in energy-inefficient homes, not in exposed locations. It is a "
         "transition risk disclosure.</p>"
         "<p><b>The usual mix-up.</b> Thinking all climate risk on real estate is physical. Where the home is "
         "decides its physical risk; how much energy it uses decides its transition risk.</p>"
         "<p><b>Remember:</b> energy label: transition risk. Flood zone: physical risk.</p>",
)

statisk(
    "bnk-s20", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the taxonomy alignment ratios in the EBA's Pillar 3 ESG disclosures.",
        "One ratio covers exposures to retail clients and to large corporates under the old reporting directive. "
        "A second ratio extends the scope.",
        "<p><b>Step 1: are the borrowers inside or outside the scope of the old directive?</b></p>"
        "<p><b>Step 2: which ratio reaches them?</b></p>"
        "<p><b>Step 3: strike options that measure something other than taxonomy alignment.</b></p>",
    ),
    q="<p>Lofotbank lends mostly to small local firms that fall outside the scope of the old Non-Financial "
      "Reporting Directive (NFRD). It wants to show how much of this lending finances taxonomy-aligned "
      "activities. Which Pillar 3 measure extends taxonomy alignment to firms like these?</p>",
    alternativer=[
        R("The banking book taxonomy alignment ratio (BTAR)"),
        F("The green asset ratio (GAR)",
          "The GAR covers exposures to large NFRD corporates and retail. These firms fall outside it."),
        F("The share of loans in total assets, as in the GABV data",
          "That is a balance sheet ratio. It says nothing about taxonomy alignment."),
        F("The disclosure of mitigating actions",
          "Mitigating actions are loans that support transition or adaptation without meeting taxonomy "
          "criteria."),
    ],
    kort="<p><b>The BTAR.</b> The green asset ratio covers large (NFRD) corporates and retail. The banking book "
         "taxonomy alignment ratio extends it to non-NFRD corporates.</p>",
    full="<p><b>Two ratios.</b> The green asset ratio (GAR) is the share of exposures to large (NFRD) corporates and "
         "retail that finances taxonomy-aligned activities. The banking book taxonomy alignment ratio (BTAR) "
         "extends this to non-NFRD corporates. Both are part of the EBA's Pillar 3 ESG disclosures.</p>"
         "<p><b>The case.</b> Lofotbank's borrowers are small firms outside the NFRD. Their alignment shows up in "
         "the BTAR, not in the GAR.</p>"
         "<p><b>The usual mix-up.</b> Treating the GAR as the measure of all green lending. It has a defined "
         "scope. Loans that help clients transition or adapt without meeting taxonomy criteria go under mitigating "
         "actions instead.</p>"
         "<p><b>Remember:</b> GAR: large NFRD corporates and retail. BTAR: adds non-NFRD corporates.</p>",
)

statisk(
    "bnk-s21", tema="bank", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the EU's four pillars and what the Pillar 3 disclosures count where.",
        "Lecture 11 shows four pillars of EU sustainable finance regulation. Pillar 3 has separate headings for "
        "risks, mitigating actions, the green asset ratio and qualitative disclosures.",
        "<p><b>Step 1: what does the green asset ratio count? Where do loans that miss the taxonomy criteria "
        "go?</b></p>"
        "<p><b>Step 2: list the four pillars and check statement II against your list.</b></p>"
        "<p><b>Step 3: judge each statement on its own.</b></p>",
    ),
    q="<p>Consider two statements about EU regulation in lecture 11.</p>"
      "<p>I. The green asset ratio includes loans that help clients adapt, such as flood barriers, even when they "
      "miss the taxonomy criteria.<br>"
      "II. EU sustainable finance regulation rests on four pillars: the taxonomy, SFDR, CSRD and the EBA's "
      "implementing technical standards on Pillar 3.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Statement I fails: loans that miss the taxonomy criteria go under mitigating actions, not into "
                    "the green asset ratio."),
        R("Only II"),
        F("Both I and II", "Statement I fails: the green asset ratio counts only taxonomy-aligned exposures."),
        F("Neither I nor II", "Look again at statement II: count the pillars on the Sia Partners slide."),
    ],
    kort="<p><b>Only II.</b> The four pillars are the taxonomy, SFDR, CSRD and the EBA ITS on Pillar 3. Support for "
         "adaptation that misses the taxonomy criteria is a mitigating action, not part of the GAR.</p>",
    full="<p><b>Statement I.</b> The green asset ratio (GAR) is the share of exposures to large (NFRD) corporates and "
         "retail that finances taxonomy-aligned activities. Pillar 3 reports support for clients' transition or "
         "adaptation that does not meet taxonomy criteria, such as renovation loans or flood barriers, separately "
         "as mitigating actions. The statement is false.</p>"
         "<p><b>Statement II.</b> Lecture 11 (Sia Partners) shows four pillars: the taxonomy, SFDR, CSRD and the "
         "EBA's implementing technical standards (ITS) on Pillar 3, the prudential ESG disclosures of listed banks. "
         "The statement is correct.</p>"
         "<p><b>The usual mix-up.</b> Treating the GAR as a measure of everything a bank does for the climate. It "
         "counts taxonomy alignment only; good intentions that miss the criteria have their own heading.</p>"
         "<p><b>Remember:</b> GAR: taxonomy-aligned. Mitigating actions: helpful but not aligned.</p>",
)

# ---------------------------------------------------------------------------
# Kredittrisiko som indirekte risiko
# ---------------------------------------------------------------------------
statisk(
    "bnk-s29", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about which of a bank's risks a climate problem at a borrower turns into.",
        "Lecture 11 lists market, credit, liquidity, operational, reputational and political risk. Credit risk is "
        "indirectly all the risks a counterparty faces.",
        "<p><b>Step 1: whose business is hit by the shorter winters?</b> The bank's or the borrower's?</p>"
        "<p><b>Step 2: how does the borrower's problem reach the bank?</b></p>"
        "<p><b>Step 3: strike risks that concern the bank's own funding, systems or rules.</b></p>",
    ),
    q="<p>Fjellbank has lent heavily to ski resorts in low-lying valleys. Warmer winters are shortening their "
      "seasons and cutting their income. The bank itself runs no ski slopes and its own operations emit very "
      "little.</p>"
      "<p>Through which of the bank's risks does the warming reach Fjellbank?</p>",
    alternativer=[
        R("Credit risk: the resorts' own climate risk becomes the risk that they cannot repay"),
        F("Operational risk: the bank's own processes are exposed to the warmer climate",
          "The bank's own processes are not what the warmer winters hit."),
        F("Liquidity risk: depositors withdraw because the resorts earn less",
          "Nothing in the case concerns depositors."),
        F("None: the bank's own emissions are low, so climate is not material to it",
          "A low own footprint does not protect the bank from what happens to its borrowers."),
    ],
    kort="<p><b>Credit risk.</b> Credit risk is indirectly all the risks a counterparty faces. The resorts' climate "
         "risk becomes the bank's risk through their loans.</p>",
    full="<p><b>Credit risk is indirect.</b> Lecture 11 describes credit risk as counterparty default risk and adds: "
         "indirectly all risks a counterparty faces. That is why a bank's big ESG issues are its indirect material "
         "issues, its credits and investments.</p>"
         "<p><b>The case.</b> Warmer winters hurt the resorts' income. Lower income makes it harder for them to "
         "repay, so the climate risk sits in Fjellbank's loan book even though its own operations emit little.</p>"
         "<p><b>The usual mix-up.</b> Judging a bank's climate exposure by its own footprint. The SASB map for "
         "commercial banks lists no environmental issue, but the clients' activities carry it. Schoenmaker &amp; "
         "Schramade make the same point: for a financial institution, ESG sits primarily in the clients' "
         "activities.</p>"
         "<p><b>Remember:</b> a borrower's climate risk is the bank's credit risk.</p>",
)

# ---------------------------------------------------------------------------
# DNB-gjesteforelesningen
# ---------------------------------------------------------------------------
statisk(
    "bnk-s22", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the four subjects DNB uses to assess a corporate client's ESG risk.",
        "The four subjects are goal achievement, action plans, responsible business conduct and compliance. Each "
        "asks a different question about the client.",
        "<p><b>Step 1: is the adviser looking at results so far, at plans, at controversies or at rules?</b></p>"
        "<p><b>Step 2: notice what she compares the client with.</b></p>"
        "<p><b>Step 3: match that to the subject.</b></p>",
    ),
    q="<p>A DNB client adviser reviews a shipping client. She compares how far the client has come on its own "
      "emission targets with what its peers and the industry's best performers have achieved.</p>"
      "<p>Which subject of DNB's ESG risk assessment is she working on?</p>",
    alternativer=[
        R("Goal achievement"),
        F("Action plans", "Action plans look forward, at plans and the capacity to deliver them."),
        F("Responsible business conduct",
          "That subject looks at controversies and at how the client works with and reports on ESG."),
        F("Compliance", "Compliance is about existing law and readiness for upcoming regulation."),
    ],
    kort="<p><b>Goal achievement.</b> To what degree the client delivers on its ESG targets, compared with peers "
         "and industry best practice.</p>",
    full="<p><b>DNB's ESG risk assessment.</b> As part of its risk management, DNB assesses a client's inherent ESG "
         "risks and how well it mitigates them along four subjects. Goal achievement: is the client delivering on "
         "its ESG targets, compared with peers and best practice? Action plans: which ESG plans exist? Is there "
         "knowledge and capacity to deliver them? Responsible business conduct: what level of controversy can be "
         "seen? How does the client work with and report on ESG? Compliance: does the client follow current law "
         "and is it prepared for upcoming regulation?</p>"
         "<p><b>The case.</b> Comparing progress on targets with peers is goal achievement.</p>"
         "<p><b>The usual mix-up.</b> Confusing goal achievement with action plans. Goal achievement measures "
         "delivery so far; action plans look at what is planned and whether the client can carry it out.</p>"
         "<p><b>Remember:</b> results, plans, conduct, compliance.</p>",
)

statisk(
    "bnk-s23", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the four subjects in DNB's ESG risk assessment of corporate clients.",
        "The four subjects are goal achievement, action plans, responsible business conduct and compliance.",
        "<p><b>Step 1: what is the adviser checking: delivery on targets, plans, controversies or rules?</b></p>"
        "<p><b>Step 2: notice both halves of the check.</b> One half looks at today, the other ahead.</p>"
        "<p><b>Step 3: find the subject that covers both.</b></p>",
    ),
    q="<p>Before renewing a credit line, a DNB adviser checks whether a fish processing client holds all the "
      "permits that current law requires. She also asks whether the client is preparing for an EU rule that will "
      "apply to it from next year.</p>"
      "<p>Which subject of DNB's ESG risk assessment is this?</p>",
    alternativer=[
        R("Compliance"),
        F("Goal achievement",
          "Goal achievement compares delivery on ESG targets with peers. No target is being measured here."),
        F("Action plans", "Action plans concern the client's ESG plans and its capacity to deliver them."),
        F("Responsible business conduct",
          "That subject looks at controversies and at how the client works with and reports on ESG."),
    ],
    kort="<p><b>Compliance.</b> Does the client adhere to existing laws and regulations? Is it aware of and "
         "prepared for upcoming regulation?</p>",
    full="<p><b>The subject.</b> In DNB's ESG risk assessment, compliance asks two questions: does the client "
         "adhere to existing laws and regulations? Is there awareness of and preparedness for upcoming "
         "regulation?</p>"
         "<p><b>The case.</b> Checking today's permits answers the first question. Asking about next year's EU rule "
         "answers the second. Both are compliance.</p>"
         "<p><b>The other three subjects.</b> Goal achievement: delivery on ESG targets against peers. Action "
         "plans: which plans exist and whether the client can deliver them. Responsible business conduct: the "
         "level of controversy and how the client works with and reports on ESG.</p>"
         "<p><b>Why it matters to a bank.</b> The speakers placed the assessment in DNB's risk management: it "
         "judges the client's inherent ESG risks and how well it mitigates them.</p>"
         "<p><b>Remember:</b> law today and rules tomorrow: compliance.</p>",
)

statisk(
    "bnk-s24", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about choosing the reference scenario when avoided emissions are calculated.",
        "In the WBCSD definition, avoided emissions compare full life-cycle emissions in a scenario where the "
        "solution is used with those in a reference scenario where it is not.",
        "<p><b>Step 1: for each maker, ask whether anyone would actually buy the ship it compares with.</b></p>"
        "<p><b>Step 2: ask whether the definition leaves the reference open or pins it down.</b></p>"
        "<p><b>Step 3: strike options that compare the maker with itself.</b></p>",
    ),
    q="<p>Two makers of electric ferries report «avoided emissions» for the same route. Maker one compares its "
      "ferry's full life-cycle emissions with those of a modern diesel ferry, the type the operator would otherwise "
      "have bought. Maker two compares with an old coal-fired steamship that no operator would buy today, which "
      "gives a much larger figure.</p>"
      "<p>Using the WBCSD definition the DNB speakers presented, whose claim holds up?</p>",
    alternativer=[
        R("Maker one's, since the reference must be the most likely alternative without the solution"),
        F("Maker two's, since avoided emissions are measured against the dirtiest option available",
          "The definition does not ask for the dirtiest option."),
        F("Both, since any reference scenario is allowed as long as the maker discloses it",
          "The definition does not leave the reference open."),
        F("Neither, since avoided emissions compare the ferry with the maker's own past emissions",
          "Avoided emissions compare a solution with a reference scenario, not a firm with its own past."),
    ],
    kort="<p><b>Maker one's.</b> The reference scenario is the most likely alternative without the solution. A ship "
         "nobody would buy inflates the figure.</p>",
    full="<p><b>The definition.</b> The DNB speakers used the WBCSD definition: avoided emissions are the estimated "
         "difference in full life-cycle greenhouse gas emissions between a scenario where a solution is used and a "
         "reference scenario where it is not. The reference scenario is the most likely alternative without the "
         "solution.</p>"
         "<p><b>The case.</b> Without the electric ferry the operator would most likely buy a modern diesel ferry. "
         "That is maker one's reference. Maker two picks a ship nobody would buy, so its figure overstates what the "
         "product changes.</p>"
         "<p><b>Why it matters to a bank.</b> A client's avoided emissions can support its case for green finance. "
         "The bank should check the reference, since the choice of alternative drives the number.</p>"
         "<p><b>The usual mix-up.</b> Treating avoided emissions as a cut in the maker's own emissions. They measure "
         "the product against what it replaces.</p>"
         "<p><b>Remember:</b> avoided emissions: the most likely alternative minus the solution, full life "
         "cycle.</p>",
)

statisk(
    "bnk-s25", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about how the DNB speakers read the current phase of sustainable finance and what it asks of a "
        "bank.",
        "The speakers ended their hype curve with a phase they called «End of ESG?», with a question mark. They "
        "paired it with two questions for firms and banks.",
        "<p><b>Step 1: which events opened the latest phase?</b></p>"
        "<p><b>Step 2: did the speakers declare ESG dead, or ask what should come after the hype?</b></p>"
        "<p><b>Step 3: pick the response that keeps the work but changes its focus.</b></p>",
    ),
    q="<p>After Northvolt's bankruptcy filing and the suspension of Net Zero Asset Managers, a bank's chief executive "
      "says ESG is over and the bank can drop ESG from its lending. Which response matches the DNB speakers' reading "
      "of this phase?</p>",
    alternativer=[
        R("It may be a healthy recalibration: focus on what is financially material and on transition plans"),
        F("It marks a return to finance as usual, so banks can drop ESG from their credit process",
          "The speakers put a question mark after «End of ESG?». They did not call for dropping ESG."),
        F("It calls for more labelled products, since investors are rushing into ESG funds and green firms",
          "The rush of ESG funds and green firms belongs to the earlier hype, not to the current phase."),
        F("It calls for a return to exclusion lists, the tool of the first phase from 1987",
          "Exclusion belongs to the first phase. The speakers' open questions point elsewhere."),
    ],
    kort="<p><b>A possible healthy recalibration.</b> The speakers asked: what is financially material? What is our "
         "transition plan? ESG work changes focus; it does not disappear.</p>",
    full="<p><b>The hype curve.</b> The DNB speakers traced five phases: exclusion (1987 to 2001), ethics and active "
         "ownership (2002 to 2014), green competitiveness (2015 to 2019), regulation (2020 to 2024, when SFDR "
         "passed, CSRD entered the Accounting Act and ESG requirements reached SMEs through banks' credit process) "
         "and «End of ESG?» from 2025, after Northvolt's bankruptcy filing and the suspension of Net Zero Asset "
         "Managers.</p>"
         "<p><b>The reading.</b> They framed the latest phase as a question: is this a healthy recalibration? Their "
         "questions were what is financially material and what the transition plan is.</p>"
         "<p><b>For a bank.</b> ESG requirements already run through banks' credit process and through rules such as "
         "SFDR and CSRD. The speakers' questions point to a sharper focus, not to dropping the work.</p>"
         "<p><b>Remember:</b> «End of ESG?» is a question; the speakers point to recalibration.</p>",
)

statisk(
    "bnk-s26", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the dilemmas the DNB speakers said banks must handle responsibly.",
        "Each dilemma sets two goods against each other. Find the two goods that clash in the case.",
        "<p><b>Step 1: what is gained and what is lost if the mine goes ahead?</b></p>"
        "<p><b>Step 2: what is gained and what is lost if it does not?</b> Where would the minerals come from "
        "then?</p>"
        "<p><b>Step 3: name the dilemma that pairs those two outcomes.</b></p>",
    ),
    q="<p>A Norwegian company plans a mine for battery minerals and asks DNB for financing. Local groups oppose it. "
      "Without the mine, the same minerals would be imported from a country with no human rights protection for "
      "its miners.</p>"
      "<p>Which of the dilemmas presented by the DNB speakers is this?</p>",
    alternativer=[
        R("Local mineral extraction or import from countries with no human rights protection"),
        F("Democracy against pace", "The case turns on where the minerals come from, not on the speed of "
                                    "decisions."),
        F("Security of supply against lower greenhouse gas emissions", "No energy supply is at stake in the "
                                                                       "case."),
        F("Build new or retrofit", "Nothing existing could be retrofitted in place of the mine."),
    ],
    kort="<p><b>Local mineral extraction or import.</b> Saying no to the local mine moves the harm to miners abroad "
         "who have no human rights protection. Neither choice is clean.</p>",
    full="<p><b>The dilemmas.</b> The DNB speakers listed dilemmas a bank must handle responsibly: renewable energy "
         "against biodiversity and preserving land, democracy against pace, affordable energy or social unrest, "
         "build new or retrofit, security of supply against lower emissions and local mineral extraction or "
         "import from countries with no human rights protection.</p>"
         "<p><b>The case.</b> The choice is between a local mine with local costs and imports that rely on miners "
         "without human rights protection. That is the last dilemma on the list.</p>"
         "<p><b>Why it matters for a bank.</b> The speakers asked how far a bank's responsibility goes and whether "
         "it should hold clients to higher standards than the law requires. There is no clean answer: refusing "
         "the loan does not by itself remove the need for the minerals.</p>"
         "<p><b>Remember:</b> a dilemma has a cost on both sides; the bank must weigh them.</p>",
)

statisk(
    "bnk-s27", tema="bank", type="tolkning",
    hjelp=hjelp3(
        "This is about the reasons the DNB speakers gave for why banks should care about ESG.",
        "They gave four reasons, each about a different thing: the bank's people and funding, its markets, the "
        "risk in its loans and its acceptance in society.",
        "<p><b>Step 1: who is asking about ESG in each observation?</b></p>"
        "<p><b>Step 2: what does the bank need from these people?</b></p>"
        "<p><b>Step 3: find the reason that covers both observations at once.</b></p>",
    ),
    q="<p>A bank's HR director notes that top graduates now ask about the bank's climate policy in job interviews. "
      "Its treasurer adds that investors in the bank's own bonds want ESG data before they buy.</p>"
      "<p>Which of the DNB speakers' reasons why banks should care about ESG do both observations point to?</p>",
    alternativer=[
        R("Attract talent and capital"),
        F("New growth opportunities in green products", "Neither observation is about new products or markets."),
        F("Risk mitigation", "Neither observation is about lowering the risk in the bank's loans."),
        F("License to operate",
          "Nothing in the case threatens the bank's acceptance in society or its permission to do business."),
    ],
    kort="<p><b>Attract talent and capital.</b> Graduates and the bank's own investors both ask about ESG, so a "
         "credible ESG profile helps the bank hire and fund itself.</p>",
    full="<p><b>Four reasons.</b> The DNB speakers gave four reasons banks should care about ESG: to attract talent "
         "and capital, for new growth opportunities, for risk mitigation and for their license to operate. A "
         "fifth box, «other?», was left open for discussion.</p>"
         "<p><b>The case.</b> Graduates are the talent; the investors in the bank's bonds are the capital. Both "
         "ask about ESG.</p>"
         "<p><b>The usual mix-up.</b> Folding everything into risk mitigation. Risk mitigation is about the risk in "
         "what the bank finances, the theme of lecture 11's credit risk discussion. Talent and capital are about "
         "the bank's own inputs: people and funding.</p>"
         "<p><b>Remember:</b> talent and capital, growth, risk, license to operate.</p>",
)
