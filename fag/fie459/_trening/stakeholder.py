# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: shareholder mot stakeholder theory (tema «stakeholder»).

   Statiske spørsmål stk-s01 … stk-s30. Kilder: manualkapittel k4
   (fag/fie459/_fragmenter/k4.html), foilene til forelesning 4
   (FIE459_H26_4_Shareholder_vs_Stakeholder_Theory.txt) og Hart og Zingales
   (2017), hart_zingales_shareholder_welfare.txt. Skribent B.

   Dekning: Friedman og grensen hans, Business Roundtable og de fire kritikkene,
   ansvarlighetsproblemet, Accountable Capitalism Act, medbestemmelse i Tyskland
   og Norge, Klarna-lærdommen, Hart og Zingales (separerbart mot ikke-separerbart,
   regjeringsargumentet, ren-eller-skitten-eksempelet, amoral drift, avstemning,
   invest and engage, at de ikke er interessentteoretikere), Edmans, forelesningens
   egen konklusjon, de ansatte og leverandørkjeden.
"""
from trening_lib import *  # noqa: F401,F403


statisk(
    "stk-s01", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about what Friedman's shareholder view actually allows a manager to do in the pursuit of profit.",
        "Friedman: the social responsibility of business is to increase its profits. Read his full sentence, as Hart "
        "and Zingales quote it: it says what the profit must be made within.",
        "<p><b>Step 1: what does the plan do?</b> Does it earn profit inside the rules of society or by breaking "
        "one of them?</p>"
        "<p><b>Step 2: check the full sentence.</b> Does Friedman treat the law as a boundary or as a cost to be "
        "weighed against profit?</p>",
    ),
    q="<p>The CEO of Nordvik Ferries wants to skip a safety inspection that the law requires, because paying the "
      "fine if caught is cheaper. He says: \"Friedman (1970) taught us that our only responsibility is to increase "
      "profits.\" Does Friedman's view support the plan?</p>",
    alternativer=[
        R("No: Friedman asked for profit while conforming to the basic rules of society, law and ethical custom"),
        F("Yes: under the shareholder view anything that raises expected profit is allowed, even if it means paying fines",
          "Friedman's own sentence sets a boundary on how the profit is made. A plan that depends on breaking the law "
          "falls outside it."),
        F("No: Friedman held that firms must give employees and the community the same weight as owners",
          "Giving other groups the same weight as owners is stakeholder theory (Freeman), not Friedman."),
        F("Yes: Friedman left ethics to individuals, so only the size of the fine matters to the firm",
          "Friedman left social causes such as charity to the owners. He did not let the firm break the law to earn "
          "more."),
    ],
    kort="<p><b>No.</b> Friedman's sentence carries its own limit: make as much money as possible \"while conforming "
         "to the basic rules of the society\", both law and ethical custom. Breaking a safety law for profit is "
         "outside it.</p>",
    full="<p><b>The shareholder view.</b> Friedman (1970) argued that the social responsibility of business is to "
         "increase its profits. Managers are employees of the owners and should make decisions that maximise "
         "shareholder value.</p>"
         "<p><b>The limit.</b> Hart and Zingales quote the full sentence: managers should make as much money as "
         "possible \"while conforming to the basic rules of the society, both those embodied in law and those "
         "embodied in ethical custom\". The rules are a boundary, not a price to be paid when profit is high "
         "enough.</p>"
         "<p><b>Here.</b> Skipping a legally required inspection and budgeting for the fine breaks the law on "
         "purpose. Friedman's view does not cover the plan.</p>"
         "<p><b>The usual mix-up.</b> Reading Friedman as \"profit at any price\", or confusing him with stakeholder "
         "theory. He leaves social causes such as charity to the owners, but he never lets the firm break the rules "
         "of society. A statement that the shareholder view permits breaking the law is false.</p>"
         "<p><b>Remember:</b> Friedman means profit within law and ethical custom.</p>",
)

statisk(
    "stk-s02", tema="stakeholder", type="paastand",
    hjelp=hjelp3(
        "This is about the Business Roundtable statement: who signed it, how they argued for it and what its critics "
        "said.",
        "About two hundred chief executives signed it. Read the signatories' quotes in lecture 4: what reason do "
        "they give for serving workers, communities and customers?",
        "<p><b>Step 1: who signed?</b> Check whether each statement gets the signatories right.</p>"
        "<p><b>Step 2: what was the argument?</b> A moral duty, a legal duty or a business case?</p>"
        "<p><b>Step 3: what did the critics say?</b> Did they think it made managers more or less accountable?</p>",
    ),
    q="<p>Which statement about the 2019 Business Roundtable statement on the purpose of a corporation is correct?</p>",
    alternativer=[
        R("Its signatories argued that serving all stakeholders is the way to create long-term value"),
        F("It was signed by about 200 institutional investors, who pledged to accept lower returns",
          "The signatories were chief executives and none of them pledged lower returns."),
        F("It changed Delaware law, so that directors there now owe their fiduciary duty to all stakeholders",
          "The statement is not law. The Harvard Law School Forum's point was that Delaware directors owe their "
          "duty to the shareholders."),
        F("Its critics welcomed it for making managers easier to hold to account",
          "The critics argued the reverse: a stakeholder purpose makes managers harder to hold to account."),
    ],
    kort="<p><b>The signatories made a long-term value case.</b> Jamie Dimon called investing in workers and "
         "communities \"the only way to be successful over the long term\".</p>",
    full="<p><b>The statement.</b> In 2019 about 200 CEOs of large US companies signed the Business Roundtable "
         "statement that a corporation's purpose is to serve all its stakeholders: customers, employees, suppliers, "
         "communities and shareholders.</p>"
         "<p><b>How they argued.</b> Read the quotes in lecture 4. Dimon (JPMorgan) said investing in workers and "
         "communities is the only way to succeed over the long term. Others spoke of \"long-term value\" and \"the "
         "most promising way to build long-term value\". The case was made in business terms, not as a sacrifice of "
         "returns.</p>"
         "<p><b>The critics.</b> They said the opposite of what the last statement claims. Jensen, Mehrotra and Morck "
         "and Bebchuk and Tallarita argued that a stakeholder purpose leaves managers less accountable. The Harvard "
         "Law School Forum called it legally incorrect, since Delaware directors owe their duty to shareholders. "
         "Others saw hypocrisy in signatories that fund fossil fuel development.</p>"
         "<p><b>The usual mix-up.</b> Thinking the statement changed the law. It was a voluntary declaration by "
         "chief executives.</p>"
         "<p><b>Remember:</b> CEOs signed it and justified it with long-term value.</p>",
)

statisk(
    "stk-s03", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the criticisms of the Business Roundtable statement. You need the one that fits a gap between "
        "words and deeds.",
        "The lecture shows four lines of criticism: hypocrisy of some signatories, agency costs (Jensen; Mehrotra and "
        "Morck; Bebchuk and Tallarita) and the legal analysis of the Harvard Law School Forum.",
        "<p><b>Step 1: what is the shareholder group's complaint?</b> Is it about how the objective is measured, "
        "about the law or about what the bank actually does?</p>"
        "<p><b>Step 2: match it to a critic.</b> Which criticism compares a signatory's pledge with its "
        "business?</p>",
    ),
    q="<p>Fjordbank signs a public pledge to serve all its stakeholders. The same year it becomes one of the largest "
      "lenders to new oil and gas fields. A shareholder group says the pledge is hard to take seriously. Which "
      "criticism of the Business Roundtable statement does this mirror?</p>",
    alternativer=[
        R("The hypocrisy charge: signatories that fund major fossil fuel development contradict their own pledge"),
        F("Jensen's warning that a stakeholder objective lets managers design their own objective function",
          "Jensen's point is about an objective that cannot be measured, not about a pledge that clashes with the "
          "bank's lending."),
        F("The Harvard Law School Forum's view that the statement is legally incorrect under Delaware company law",
          "The legal analysis is about directors' fiduciary duty. It does not compare the pledge with what the "
          "signatory does."),
        F("Bebchuk and Tallarita's point that stakeholderists offer no method to aggregate interests",
          "That critique concerns the missing method to weigh groups, not a gap between the pledge and the "
          "lending."),
    ],
    kort="<p><b>The hypocrisy critique.</b> As a shareholder adviser put it in the lecture, some signatories fund "
         "major fossil fuel development, which is hard to reconcile with a commitment to stakeholders.</p>",
    full="<p><b>The criticism.</b> Lecture 4 quotes Sanford Lewis, an attorney who advised shareholder petitioners: "
         "some of the companies that signed the statement fund major amounts of fossil fuel development, so it is "
         "hard to see how they reconcile their commitment to stakeholders with being major financiers of climate "
         "change. The charge is hypocrisy: the words and the business point in different directions.</p>"
         "<p><b>Here.</b> Fjordbank pledges to serve all stakeholders and at the same time expands its lending to "
         "new oil and gas fields. That is exactly the gap the criticism describes.</p>"
         "<p><b>The other critiques.</b> Jensen, Mehrotra and Morck and Bebchuk and Tallarita attack the stakeholder "
         "objective itself: it is hard to measure, so it raises agency costs and reduces accountability. The "
         "Harvard Law School Forum argues from Delaware law and the business judgement rule. None of them is about "
         "whether a signatory lives up to its pledge.</p>"
         "<p><b>Remember:</b> words against deeds is the hypocrisy critique; vague objectives is the agency-cost "
         "critique.</p>",
)

statisk(
    "stk-s04", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about matching a critique of the stakeholder view to its author.",
        "Each critic has a signature phrase: one says managers design their own objective function, one contrasts a "
        "bright line with an ill-defined charge, one lists three gaps (who counts, trade-offs, aggregation), one "
        "argues from Delaware law.",
        "<p><b>Step 1: find the key phrase.</b> What exactly does the director say managers could do?</p>"
        "<p><b>Step 2: match it.</b> Which critic's argument is about replacing a measurable objective with a less "
        "measurable one?</p>",
    ),
    q="<p>At a board meeting of Lysaker Retail, a director objects to replacing the target \"maximise shareholder "
      "value\" with \"create value for all stakeholders\". He argues that management could then design its own "
      "objective function and run the firm in its own interest, since the new target is far harder to measure. "
      "Whose critique is he repeating?</p>",
    alternativer=[
        R("Jensen (2002)"),
        F("Mehrotra and Morck (2017)",
          "Their critique is phrased as a bright line against an ill-defined charge that invites private benefits. "
          "The director uses another author's words."),
        F("Bebchuk and Tallarita (2020)",
          "Their critique centres on three gaps: which groups count, the trade-offs and the missing method to weigh "
          "them."),
        F("The Harvard Law School Forum",
          "The Forum argued from Delaware law and the business judgement rule, not from how measurable the target "
          "is."),
    ],
    kort="<p><b>Jensen (2002).</b> A stakeholder orientation lets managers design their own objective function. "
         "Replacing a measurable objective with a less measurable one can raise agency costs.</p>",
    full="<p><b>The critique.</b> Jensen (2002) argues that stakeholder theory allows managers to design their own "
         "objective functions and run firms in their own interests. Shareholder value can be measured; stakeholder "
         "value is far harder to pin down. Swapping the first for the second can raise agency costs.</p>"
         "<p><b>Why it matters.</b> An objective disciplines a manager only if some outcome can show it was missed. "
         "If almost any decision can be presented as good for some stakeholder, nobody can show that management "
         "failed.</p>"
         "<p><b>The other three.</b> Mehrotra and Morck (2017) call shareholder value a \"bright line\" and stakeholder "
         "welfare an \"ill-defined charge\" that gives insiders scope to extract private benefits. Bebchuk and "
         "Tallarita (2020) say stakeholderists avoid deciding who counts, overlook trade-offs and give no method to "
         "aggregate interests. The Harvard Law School Forum calls the statement legally incorrect and unnecessary.</p>"
         "<p><b>Remember:</b> own objective function, measurable against less measurable: Jensen.</p>",
)

statisk(
    "stk-s05", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about matching a critique of the Business Roundtable statement to its authors.",
        "One critique lists three things stakeholderists leave to the discretion of corporate leaders: which groups "
        "count, the trade-offs with long-term shareholder value and how to aggregate the interests.",
        "<p><b>Step 1: count the gaps in the report.</b> How many does it name and what are they?</p>"
        "<p><b>Step 2: check each option's description.</b> Is the author right and is the description of that "
        "author's argument the right way round?</p>",
    ),
    q="<p>A proxy adviser reviews a firm's new stakeholder charter. Its report notes that the charter never says "
      "which groups count as stakeholders, ignores the many decisions where some stakeholders gain at the expense of "
      "long-term shareholder value and offers no way to weigh one group against another. All three choices are left "
      "to the CEO. Which critics made this argument?</p>",
    alternativer=[
        R("Bebchuk and Tallarita, who conclude it insulates management from shareholders"),
        F("Jensen, who warns that managers would design their own objective function",
          "Jensen's argument is about a measurable objective replaced by a less measurable one. The report lists "
          "three specific gaps that come from another critique."),
        F("Mehrotra and Morck, who call stakeholder welfare a bright line for judging performance",
          "This reverses their phrase: the bright line is shareholder value and stakeholder welfare is the "
          "ill-defined charge."),
        F("Edward Freeman, who sees all stakeholders as equally important to the firm",
          "Freeman is the founder of stakeholder theory, not one of its critics."),
    ],
    kort="<p><b>Bebchuk and Tallarita (2020).</b> Stakeholderists avoid saying who counts, overlook trade-offs and "
         "give no method to aggregate interests, leaving all three to corporate leaders and insulating them from "
         "shareholders.</p>",
    full="<p><b>The three gaps.</b> Bebchuk and Tallarita (2020) say stakeholderists have avoided deciding which groups "
         "count as stakeholders, have overlooked how often stakeholder interests trade off against long-term "
         "shareholder value and have given no method to aggregate or balance the interests of different groups. All "
         "three are left to the discretion of corporate leaders.</p>"
         "<p><b>Their conclusion.</b> A stakeholder orientation insulates management from shareholders, reduces "
         "accountability by weakening financial performance as a disciplining mechanism and harms economic "
         "performance. The lecture adds: this may lead to more agency issues.</p>"
         "<p><b>Here.</b> The report names exactly the three gaps and notes that the CEO decides them. That is "
         "Bebchuk and Tallarita.</p>"
         "<p><b>The usual mix-ups.</b> Jensen makes a related but shorter point about measurability. Mehrotra and "
         "Morck's bright line is shareholder value, not stakeholder welfare. Freeman is on the other side of the "
         "debate.</p>"
         "<p><b>Remember:</b> who counts, trade-offs, no aggregation: Bebchuk and Tallarita.</p>",
)

statisk(
    "stk-s06", tema="stakeholder", type="paastand",
    hjelp=hjelp3(
        "This is about the legal analysis of the Business Roundtable statement published by the Harvard Law School "
        "Forum on Corporate Governance.",
        "The Forum asked whether the statement is legally correct and whether it is necessary. Its answer rests on "
        "directors' fiduciary duty under Delaware law and on the business judgement rule.",
        "<p><b>Step 1: whose duty?</b> Under Delaware law, to whom do directors owe their fiduciary duty?</p>"
        "<p><b>Step 2: what does the business judgement rule already allow?</b> Could directors pursue the "
        "statement's aims without it?</p>"
        "<p><b>Step 3: discard arguments that belong to other critics.</b></p>",
    ),
    q="<p>Which pair of claims did the Harvard Law School Forum on Corporate Governance make about the Business "
      "Roundtable statement?</p>",
    alternativer=[
        R("Legally incorrect, as directors owe their duty to shareholders; unnecessary, as the business judgement "
          "rule already lets them pursue its aims"),
        F("Legally required, as Delaware law obliges directors to serve all stakeholders; overdue, as boards had "
          "long ignored them",
          "This reverses the Forum's reading of Delaware law, where directors' fiduciary duty runs to the "
          "shareholders."),
        F("Legally correct but harmful, as replacing a measurable objective with a vaguer one raises agency costs",
          "The agency-cost argument is Jensen's. The Forum's objection was legal."),
        F("Unnecessary, as markets already price the harm done to stakeholders; legally sound, as boards may serve "
          "anyone",
          "The Forum did not argue from market prices and it did not find the statement legally sound."),
    ],
    kort="<p><b>Legally incorrect and unnecessary.</b> Delaware directors owe a fiduciary duty to shareholders and "
         "the business judgement rule already protects decisions taken with care and loyalty.</p>",
    full="<p><b>Legally incorrect.</b> Many US public companies are incorporated in Delaware. There the business of "
         "the company is entrusted to the board and directors have a fiduciary duty to act in the best interests "
         "of the shareholders, who own the company. To say that a corporation will further the interests of other "
         "groups is therefore legally incorrect, in the Forum's words.</p>"
         "<p><b>Unnecessary.</b> Directors' decisions are generally protected by the business judgement rule and "
         "presumed to be in the interests of the corporation and its shareholders, as long as directors meet their "
         "duties of care and loyalty. So directors can already do what the statement intends. Changing the "
         "principles would only cause confusion.</p>"
         "<p><b>The usual mix-up.</b> Attributing the agency-cost critique to the Forum. That is Jensen, Mehrotra and "
         "Morck and Bebchuk and Tallarita. The Forum's argument is legal.</p>"
         "<p><b>Remember:</b> Harvard Law School Forum: Delaware duty to shareholders, so incorrect; business "
         "judgement rule, so unnecessary.</p>",
)

statisk(
    "stk-s07", tema="stakeholder", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about two critiques of the Business Roundtable statement. Check each statement on its own.",
        "Mehrotra and Morck contrast shareholder value with stakeholder welfare. The Harvard Law School Forum asks "
        "whether the statement is legally correct and whether it is necessary.",
        "<p><b>Step 1: statement I.</b> Which objective do Mehrotra and Morck call a bright line and which an "
        "ill-defined charge?</p>"
        "<p><b>Step 2: statement II.</b> What does the business judgement rule already let directors do?</p>"
        "<p><b>Step 3: combine.</b> Pick the option that matches your two verdicts.</p>",
    ),
    q="<p>Consider two statements about the critics of the Business Roundtable statement.</p>"
      "<p>I. Mehrotra and Morck (2017) call shareholder value maximisation a \"bright line\" for judging "
      "performance.</p>"
      "<p>II. The Harvard Law School Forum argues that, under current business judgement principles, directors can "
      "already accomplish what the statement intends.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        F("Only I", "Statement II needs a second look: recall the Forum's argument about whether the statement was "
                    "necessary."),
        F("Only II", "Statement I needs a second look: recall which objective Mehrotra and Morck call a bright "
                     "line."),
        R("Both I and II"),
        F("Neither I nor II", "At least one of the statements matches a critic's own argument."),
    ],
    kort="<p><b>Both I and II.</b> Mehrotra and Morck call shareholder value a bright line. The Forum says the business "
         "judgement rule already lets directors do what the statement intends, so it is unnecessary.</p>",
    full="<p><b>Statement I.</b> Mehrotra and Morck (2017): shareholder value maximisation constitutes a \"bright line\" "
         "to evaluate performance, whereas stakeholder welfare maximisation is an \"ill-defined charge\" that gives "
         "self-interested insiders broader scope to extract private benefits. The statement is correct.</p>"
         "<p><b>Statement II.</b> The Harvard Law School Forum argues that the statement is legally incorrect, because "
         "Delaware directors owe their fiduciary duty to shareholders and also unnecessary. Decisions taken with "
         "care and loyalty are protected by the business judgement rule, so under current principles directors can "
         "accomplish what the statement intends without the confusion it brings. The statement is correct.</p>"
         "<p><b>The usual mix-up.</b> Swapping the bright line and the ill-defined charge, or thinking the Forum "
         "supported the statement. It criticised it on both counts.</p>"
         "<p><b>Remember:</b> bright line is Mehrotra and Morck; legally incorrect and unnecessary is the Harvard Law "
         "School Forum.</p>",
)

statisk(
    "stk-s08", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about why a stakeholder objective without a list of groups or weights makes managers harder to hold "
        "to account.",
        "An objective disciplines a manager only if some outcome could show that it was missed. Ask what a mandate "
        "with no list and no weights allows a CEO to say about any decision.",
        "<p><b>Step 1: look at the two decisions.</b> Each favours a different group. Could the CEO defend the "
        "opposite choice just as easily?</p>"
        "<p><b>Step 2: ask who can check him.</b> Is there any result that would prove he failed?</p>",
    ),
    q="<p>Under a new \"serve all stakeholders\" mandate, the CEO of Brattvoll Industries cuts the dividend one year, "
      "saying it protects jobs. The next year he freezes wages, saying it protects shareholders. The mandate names no "
      "list of stakeholders and no weights. Why does the course see this as an accountability problem?</p>",
    alternativer=[
        R("Almost any decision can be defended, so no outcome can show the CEO missed the objective"),
        F("The CEO breaks Delaware law each time he favours a group other than shareholders",
          "The case is about whether anyone can check the CEO, not about a breach of law. The business judgement "
          "rule protects most such decisions."),
        F("The mandate creates amoral drift, since small shareholders feel no responsibility",
          "Amoral drift concerns dispersed shareholders tendering to a bidder (Hart and Zingales), not a CEO's "
          "discretion."),
        F("A stakeholder mandate takes away the shareholders' right to vote on the board at the annual meeting",
          "Voting rights are unchanged by the mandate."),
    ],
    kort="<p><b>Every choice becomes defensible.</b> With no list and no weights, a lower dividend helps employees and a "
         "lower wage helps owners, so no result can show the CEO failed. Agency costs can rise.</p>",
    full="<p><b>The mechanism.</b> An objective disciplines a manager only if some outcome can show it was missed. "
         "\"Maximise shareholder value\" can be checked against the share price. \"Serve all stakeholders\", with no "
         "list of who counts and no weights, can justify almost any decision.</p>"
         "<p><b>Here.</b> The CEO cuts the dividend for the workers' sake and then freezes wages for the owners' sake. "
         "Both moves fit the mandate and so would their opposites. When every choice is defensible, nobody is "
         "accountable. Stakeholders' interests may be misaligned, as lecture 4 notes and the mandate gives no rule "
         "for the trade-off.</p>"
         "<p><b>Who said it.</b> This is the core of the critics' case: Jensen (managers design their own objective "
         "function), Mehrotra and Morck (bright line against ill-defined charge) and Bebchuk and Tallarita (no "
         "method to aggregate). It is the principal-agent problem of lecture 5, made worse.</p>"
         "<p><b>The usual mix-up.</b> Thinking the problem is legal. It is about monitoring.</p>"
         "<p><b>Remember:</b> no list and no weights means no accountability.</p>",
)

statisk(
    "stk-s09", tema="stakeholder", type="paastand",
    hjelp=hjelp3(
        "This is about the US proposal to write stakeholder duties into corporate law.",
        "The Accountable Capitalism Act would require very large American corporations to obtain a federal charter "
        "with stakeholder duties for directors, worker-elected directors, limits on insiders' share sales, a "
        "supermajority rule for political spending and a power to revoke the charter.",
        "<p><b>Step 1: is it a proposal or a law in force?</b></p>"
        "<p><b>Step 2: check the details of each option.</b> Which group elects board members and what does the "
        "supermajority rule cover?</p>"
        "<p><b>Step 3: discard features that belong to other countries or other authors.</b></p>",
    ),
    q="<p>Which statement about the Accountable Capitalism Act proposal in the United States is correct?</p>",
    alternativer=[
        R("It would oblige directors of very large corporations to consider all stakeholders and let workers elect at "
          "least 40% of the board"),
        F("It would let shareholders vote on the broad outlines of corporate policy, as Hart and Zingales propose",
          "A shareholder vote on policy is Hart and Zingales's remedy, not one of the proposal's charter rules."),
        F("It would give workers half of the supervisory board in every firm with more than 2,000 employees",
          "Half the supervisory board above 2,000 employees is the German codetermination rule."),
        F("It is already in force and requires 75% of workers to approve any plant closure",
          "It is a proposal. Its 75% rule concerns approval of political spending by directors and shareholders."),
    ],
    kort="<p><b>Stakeholder duties and worker-elected directors.</b> The proposal requires a federal charter that obliges "
         "directors to consider all stakeholders and lets workers elect at least 40% of the board.</p>",
    full="<p><b>The proposal.</b> Some want stakeholder duties written into law rather than left to voluntary "
         "statements. The Accountable Capitalism Act would require very large American corporations to obtain a "
         "federal charter as a \"United States corporation\". The charter:</p>"
         "<ul><li>obliges directors to consider the interests of all corporate stakeholders;</li>"
         "<li>lets workers elect at least 40% of the board;</li>"
         "<li>restricts share sales by directors and officers;</li>"
         "<li>requires approval by 75% of directors and shareholders for political spending;</li>"
         "<li>lets the federal government revoke the charter after repeated and egregious illegal conduct.</li></ul>"
         "<p><b>The usual mix-ups.</b> The German rule gives workers one-third or half of the supervisory board "
         "depending on size; that is existing law in Germany, not the US proposal. A shareholder vote on policy is "
         "Hart and Zingales's idea, which keeps shareholders as the principal. The 75% threshold is about political "
         "spending, not plant closures.</p>"
         "<p><b>Remember:</b> Accountable Capitalism Act: federal charter, stakeholder duties, workers elect at least "
         "40% of the board.</p>",
)

statisk(
    "stk-s10", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about codetermination: how German law gives workers seats on the supervisory board as a firm grows.",
        "Germany: in firms with more than 500 employees, one-third of the supervisory board are worker "
        "representatives; in firms with more than 2,000 employees, half are.",
        "<p><b>Step 1: place the firm before the change.</b> Which band does it fall in?</p>"
        "<p><b>Step 2: place it after.</b> Has it crossed a threshold?</p>"
        "<p><b>Step 3: check each option's source.</b> Discard any share that comes from another country's rule or from a US proposal.</p>",
    ),
    q="<p>Rheinwerk GmbH, a German manufacturer, grows from 1,200 to 2,400 employees. Under the German worker "
      "representation rules shown in lecture 4, what happens to the share of its supervisory board made up of worker "
      "representatives?</p>",
    alternativer=[
        R("It rises from one-third to one-half of the board"),
        F("It stays at one-third, since a German firm must be far larger before half the seats go to workers",
          "This misplaces the German threshold. The higher share applies to firms well below the size this option "
          "assumes."),
        F("It rises from zero to one-third, since worker seats only start at this size",
          "German worker seats start at a much smaller size, so the firm already had them before it grew."),
        F("It rises to 40%, the share the Accountable Capitalism Act sets for boards",
          "The 40% figure comes from a US proposal, not from German law."),
    ],
    kort="<p><b>From one-third to one-half.</b> Above 500 employees one-third of a German supervisory board are worker "
         "representatives and above 2,000 half are. Rheinwerk crosses the second threshold.</p>",
    full="<p><b>Codetermination.</b> Parts of Europe already write stakeholder representation into law. In Germany, "
         "worker representation laws mandate employee members on the supervisory board. Firms with more than 500 "
         "employees must give one-third of the seats to worker representatives. Firms with more than 2,000 must give "
         "half.</p>"
         "<p><b>Here.</b> With 1,200 employees Rheinwerk is above the first threshold, so one-third of its supervisory "
         "board are worker representatives. At 2,400 it is above the second, so the share rises to one-half.</p>"
         "<p><b>Compare.</b> In Norway employees may elect board representatives in firms with more than 30 employees "
         "and it becomes mandatory above 200 unless the firm has a corporate assembly. Sweden has its Board "
         "Representation (Private Sector Employees) Act. The US Accountable Capitalism Act, a proposal, would let "
         "workers elect at least 40% of the board.</p>"
         "<p><b>Why it matters.</b> Codetermination is the strongest legal form of the stakeholder view: workers sit "
         "where decisions are made.</p>"
         "<p><b>Remember:</b> Germany: one-third above 500, half above 2,000.</p>",
)

statisk(
    "stk-s11", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about employee representation on boards under the Norwegian Companies Acts, as lecture 4 presents "
        "it.",
        "Norway: employees may elect board representatives in firms with more than 30 employees. It becomes mandatory "
        "in firms with more than 200 employees, unless the firm has a corporate assembly.",
        "<p><b>Step 1: count the employees.</b> Which of the two thresholds has the firm passed?</p>"
        "<p><b>Step 2: right or obligation?</b> Decide whether representation is something employees may choose or "
        "something the firm must have.</p>",
    ),
    q="<p>Fjellbakeri AS, a Norwegian bakery chain, has 120 employees and no corporate assembly. Under the Norwegian "
      "rules shown in lecture 4, what applies to employee representation on its board?</p>",
    alternativer=[
        R("Employees may elect board representatives, but it is not yet mandatory"),
        F("Employees have no right to board representatives at this size",
          "The right to elect board representatives starts well below this size."),
        F("Employee representation on the board is already mandatory for a firm of this size",
          "The firm is too small for the obligation; at this size representation is still a choice for employees."),
        F("Workers elect half the board, as in large German firms",
          "Half the seats is the German rule for very large firms and it applies to a supervisory board."),
    ],
    kort="<p><b>A right, not yet an obligation.</b> Above 30 employees, employees may elect board representatives. It "
         "becomes mandatory only above 200 and Fjellbakeri has 120.</p>",
    full="<p><b>The Norwegian rule.</b> Under the Companies Acts (aksjeloven and allmennaksjeloven), employees may elect "
         "board representatives in firms with more than 30 employees. Representation becomes mandatory in companies "
         "with more than 200 employees, unless a corporate assembly exists.</p>"
         "<p><b>Here.</b> Fjellbakeri has 120 employees: above the first threshold, below the second. Its employees "
         "may elect board members if they want to, but the law does not yet require it.</p>"
         "<p><b>Compare.</b> Germany has two size thresholds as well, for the supervisory board: one-third worker "
         "representatives above 500 employees and half above 2,000. Sweden has a separate act for board "
         "representation of private-sector employees.</p>"
         "<p><b>Why it matters.</b> Codetermination is the legal answer some countries give to \"on whose behalf "
         "should a company be run?\". Workers get a voice on the board itself, not just through bargaining.</p>"
         "<p><b>Remember:</b> Norway: may elect above 30, mandatory above 200 unless there is a corporate "
         "assembly.</p>",
)

statisk(
    "stk-s12", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the lecture's reading of Klarna's AI workforce decision and its reversal.",
        "A shareholder-value view asks whether automation raises profit. A stakeholder view also weighs the "
        "employees who lose their jobs. Ask which group the reversal brings into the picture.",
        "<p><b>Step 1: why did the firm reverse?</b> Who was hurt by the change and how?</p>"
        "<p><b>Step 2: what does that say about the premise?</b> Did the AI really do the job just as well?</p>",
    ),
    q="<p>Sørlandet Energi replaces most of its customer-service staff with an AI assistant that management says does "
      "the job just as well. A year later complaints pile up because customers cannot reach a person. The firm "
      "starts rehiring. Read as the lecture reads the similar Klarna case, what does the reversal add?</p>",
    alternativer=[
        R("The premise of equal quality failed for another stakeholder group, the customers"),
        F("It proves that automation always destroys shareholder value, so the shareholder view was wrong",
          "Too strong. A shareholder-value view says automate if it raises profit and one reversal does not show "
          "that automation always destroys value."),
        F("It shows that only the employees who lost their jobs count as stakeholders in such decisions",
          "Employees are one stakeholder group. The complaints come from a different one."),
        F("It shows that codetermination law forced the firm to take back the dismissed staff",
          "Nothing in the case involves worker directors or a court."),
    ],
    kort="<p><b>The customers.</b> The decision was justified by \"just as well\" and that premise failed for another "
         "stakeholder group. The firm itself changed course, as Klarna did in May 2025.</p>",
    full="<p><b>The Klarna case.</b> In February 2024 Klarna's AI assistant handled two-thirds of customer-service chats "
         "and the CEO said it did the work of 700 agents. The workforce shrank from about 5,000 towards 3,000 "
         "through attrition and a hiring freeze. In May 2025 the CEO said \"we went too far\": cost had been weighted "
         "too heavily over quality and Klarna began rehiring so customers could always reach a person.</p>"
         "<p><b>Two readings.</b> A shareholder-value view says automate if it raises profit. A stakeholder view also "
         "weighs the employees who lose their jobs.</p>"
         "<p><b>The third point.</b> The reversal shows that the premise \"the AI does the job just as well\" failed "
         "for another stakeholder group, the customers. Sørlandet Energi shows the same pattern: complaints rise "
         "and the firm changes course on its own.</p>"
         "<p><b>The usual mix-up.</b> Drawing a sweeping conclusion that automation always destroys value. The case "
         "shows a failed premise, not a general law.</p>"
         "<p><b>Remember:</b> employees and customers are both stakeholders and a cost case built on a false premise "
         "can reverse.</p>",
)

statisk(
    "stk-s13", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the objective Hart and Zingales propose for a firm whose owners care about more than money.",
        "Hart and Zingales keep shareholders as the principal but argue that shareholder welfare and market value are "
        "not the same thing. Ask which of the two the firm should maximise.",
        "<p><b>Step 1: what does Ingrid care about?</b> Only money, or also the pollution?</p>"
        "<p><b>Step 2: whose objective is each option?</b> Friedman, stakeholder theory or Hart and Zingales?</p>"
        "<p><b>Step 3: test each option against Hart and Zingales.</b> Do they keep the owners as the principal? Do they think owners care only about money?</p>",
    ),
    q="<p>Ingrid owns shares in a paper mill. In her own life she pays extra for fair-trade coffee and drives an electric "
      "car to cut pollution. She asks why the mill should not also accept a small cut in profit to pollute less. "
      "Which objective do Hart and Zingales (2017) say the mill should pursue?</p>",
    alternativer=[
        R("Shareholder welfare, which covers owners' social concerns as well as money"),
        F("Market value, leaving Ingrid free to spend her dividends on cutting pollution herself",
          "That is Friedman's separation, which Hart and Zingales accept only when the activity is separable, as "
          "with charity."),
        F("The welfare of all stakeholders, weighed by the mill's management",
          "That is stakeholder theory. Hart and Zingales keep the shareholders as the principal."),
        F("Profit, with pollution left entirely to the government to regulate",
          "Leaving externalities to government is Friedman's second argument, which Hart and Zingales doubt when "
          "politics is inefficient."),
    ],
    kort="<p><b>Shareholder welfare, not market value.</b> Owners care about money and about the harm the firm does, so "
         "the firm should follow their preferences, including the social ones.</p>",
    full="<p><b>The argument.</b> Hart and Zingales (2017) follow Friedman in taking shareholder welfare as the right "
         "objective. They reject one step: equating shareholder welfare with market value. Shareholders are ordinary "
         "people who care about money, but not only about money. In private life they internalise externalities: "
         "they buy electric cars and fair-trade coffee. If someone is willing to spend $100 to reduce pollution by "
         "$120, why would she not want a company she owns to do the same?</p>"
         "<p><b>Here.</b> Ingrid is exactly that shareholder. Pollution from a paper mill is tied to its production, so "
         "she cannot undo it with her dividends. Hart and Zingales would have the mill follow her preferences.</p>"
         "<p><b>The usual mix-ups.</b> Market value with dividends for good causes is Friedman's separation, which "
         "works only for separable activities such as charity. Balancing all stakeholders is stakeholder theory, "
         "which Hart and Zingales do not adopt.</p>"
         "<p><b>Remember:</b> Hart and Zingales: maximise shareholder welfare, money and values, not market "
         "value.</p>",
)

statisk(
    "stk-s14", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the difference between separable and non-separable activities in Hart and Zingales.",
        "An activity is separable when shareholders could do it themselves just as well with the profit paid out. It "
        "is non-separable when profit and damage are tied together by the firm's technology, so owners cannot undo "
        "the damage.",
        "<p><b>Step 1: for each option, ask where the harm or the good comes from.</b> From how the firm produces and "
        "sells, or from what it does with profit already earned?</p>"
        "<p><b>Step 2: ask whether owners could do the same with dividends.</b></p>",
    ),
    q="<p>Hart and Zingales agree with Friedman that the firm should simply maximise profit when the social activity is "
      "separable from money-making. Which of these is the separable case?</p>",
    alternativer=[
        R("A software firm decides how much of its profit to give to a children's charity"),
        F("A cement maker chooses between a cheap kiln process that emits more and a costly cleaner one",
          "The emissions come from the firm's own production technology. Shareholders cannot undo them as cheaply as "
          "the firm can avoid them."),
        F("A supermarket chain decides whether to keep selling a product it sees as dangerous to the public",
          "This mirrors their Walmart example: the harm is tied to the sale itself."),
        F("A clothing brand picks a cheaper supplier that dumps dye into a local river",
          "The pollution is bound to how the product is made. Owners cannot reverse it with their dividends."),
    ],
    kort="<p><b>The charity donation.</b> Paying the profit out and letting shareholders give it to charity is as good "
         "as the firm giving it. That is the separable case, where Friedman is right.</p>",
    full="<p><b>Separable.</b> Friedman's answer to social concerns is separation: let companies make money and let "
         "individuals and governments deal with the rest. Hart and Zingales accept this when the social activity is "
         "separable from money-making. Charity is their example: if the firm pays out the profit, shareholders can "
         "donate it themselves just as well.</p>"
         "<p><b>Non-separable.</b> It fails when profit and damage are tied together by the firm's technology. The "
         "firm can avoid the harm; individuals cannot cheaply undo it. Their example is Walmart selling "
         "high-capacity magazines of the kind used in mass killings. Giving shareholders the profit to spend on gun "
         "control might not be as efficient as not selling the magazines at all.</p>"
         "<p><b>Here.</b> The kiln emissions, the dangerous product and the river pollution all arise from how the "
         "firm produces or sells. Only the donation is a use of profit already earned.</p>"
         "<p><b>Remember:</b> charity is separable, so Friedman holds; harm built into production is not.</p>",
)

statisk(
    "stk-s15", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about why Hart and Zingales reject Friedman's separation argument in some cases.",
        "Separation works when owners can do the good, or undo the harm, themselves with the profit paid out. It "
        "fails when the harm is tied to the firm's own production technology.",
        "<p><b>Step 1: where does the toxin come from?</b> From a use of profit or from the production process?</p>"
        "<p><b>Step 2: who can prevent it most efficiently?</b> The firm, or shareholders spending dividends after "
        "the fact?</p>",
    ),
    q="<p>Kjemi Nord can use a process that raises profit but releases a toxin into a river and only the firm's choice "
      "of process can prevent it. A shareholder says: \"Choose the cheap process and pay us the extra profit. Those "
      "of us who care can spend it on the river.\" Why do Hart and Zingales reject this argument here?</p>",
    alternativer=[
        R("The damage is tied to the firm's technology, so owners cannot undo it as efficiently as the firm can avoid "
          "it"),
        F("Shareholders care only about money, so none of them would spend the profit on the river",
          "Hart and Zingales assume the opposite: shareholders care about more than money."),
        F("Firms must serve all stakeholders equally, whatever their owners want",
          "That is stakeholder theory. Hart and Zingales keep the owners' preferences at the centre."),
        F("Paying the extra profit out to shareholders would be illegal under Delaware law",
          "Paying out profit is legal; the law is not their objection."),
    ],
    kort="<p><b>The harm is non-separable.</b> Profit and damage are tied together by the firm's process, so owners "
         "spending dividends cannot undo the harm as efficiently as the firm can avoid it.</p>",
    full="<p><b>Separation.</b> The shareholder is making Friedman's case: let the firm maximise profit and let "
         "individuals deal with externalities. Hart and Zingales accept this for separable activities such as "
         "charity, where the owners can do the good themselves just as well.</p>"
         "<p><b>Why it fails here.</b> The toxin comes from the firm's own choice of process. Profit and damage are "
         "inextricably connected by the technology. The firm can avoid the damage at the source; shareholders would "
         "need a project that reverses it and such a reverse project rarely exists or is far more costly. Hart and "
         "Zingales make the point with Walmart's high-capacity magazines: funding gun control with the profit is "
         "not as efficient as not selling them.</p>"
         "<p><b>Their conclusion.</b> When activities are non-separable and government has not internalised the "
         "externality, shareholder welfare and market value differ. The firm should then follow the owners' "
         "preferences, for example through a vote.</p>"
         "<p><b>Remember:</b> harm built into production cannot be bought back with dividends.</p>",
)

statisk(
    "stk-s16", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about Friedman's second argument, that externalities should be left to government and Hart and "
        "Zingales's reply.",
        "Hart and Zingales give two reasons why leaving it to government can fail: the political process may be "
        "inefficient and some goals are hard to write into a regulation even when politics works.",
        "<p><b>Step 1: what is the shareholders' goal?</b> Is it easy to turn into a precise rule?</p>"
        "<p><b>Step 2: which option uses Hart and Zingales's reasoning?</b> Discard options that belong to other "
        "views.</p>",
    ),
    q="<p>Shareholders of a warehouse operator want it to treat its workers with dignity, even at some cost to profit. "
      "A director replies: \"Externalities and working conditions are for the government to regulate, not for us.\" "
      "Which reply from Hart and Zingales fits best?</p>",
    alternativer=[
        R("Even if politics works well, a goal like treating workers with dignity is hard to write into a "
          "regulation"),
        F("Regulation always internalises externalities fully, so the director is right",
          "Hart and Zingales doubt that the political process is that efficient."),
        F("The firm should drop profit as a goal and serve its workers first",
          "That is a stakeholder objective. Hart and Zingales keep the shareholders' preferences as the guide."),
        F("Working conditions are separable from production, so owners can fix them with their dividends",
          "How workers are treated is part of how the firm operates. Owners cannot buy dignity for them with "
          "dividends."),
    ],
    kort="<p><b>Some goals are hard to regulate.</b> Hart and Zingales doubt the political process and add that even an "
         "efficient one might struggle to write a rule that firms must treat workers with dignity.</p>",
    full="<p><b>Friedman's second argument.</b> Besides separation, Friedman's followers say externalities should be "
         "left to government: firms make money, lawmakers correct the side effects.</p>"
         "<p><b>The reply.</b> Hart and Zingales are not sanguine about the efficiency of the political process. And "
         "even if politics is efficient, it might be very difficult to write a regulation that says companies "
         "should treat their workers with dignity. It may be better to leave that goal to shareholders, who can "
         "express it through the firm.</p>"
         "<p><b>Here.</b> The director uses Friedman's second argument. The shareholders' goal is exactly the kind "
         "Hart and Zingales name as hard to regulate.</p>"
         "<p><b>The usual mix-ups.</b> Treating Hart and Zingales as stakeholder theorists who put workers first. "
         "They put the owners' preferences first; here the owners happen to care about workers. And working "
         "conditions are not a separable use of profit.</p>"
         "<p><b>Remember:</b> Friedman's \"leave it to government\" fails when politics is inefficient or the goal "
         "cannot be written into a rule.</p>",
)

statisk(
    "stk-s17", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about Hart and Zingales's clean-or-dirty example: what a market-value maximiser picks and what "
        "society prefers.",
        "A market-value maximiser compares profit only. Social surplus is profit minus the damage done to others.",
        "<p><b>Step 1: compute social surplus for each plant.</b> Subtract the damage from the profit.</p>"
        "<p><b>Step 2: find the market-value choice.</b> Which plant has the higher profit?</p>"
        "<p><b>Step 3: compare the two answers.</b></p>",
    ),
    q="<p>A firm can run a clean plant (profit 80, no damage to others) or a dirty plant (profit 120, damage of 50 to "
      "people who live nearby). Which statement is correct?</p>",
    alternativer=[
        R("A market-value maximiser picks dirty, but society is better off with clean"),
        F("A market-value maximiser picks clean, since its social surplus is higher",
          "A market-value maximiser looks only at profit and the dirty plant earns more."),
        F("Society is better off with dirty, since its profit is higher",
          "Social surplus subtracts the damage to others from the profit."),
        F("Society is indifferent, since the extra profit of dirty just offsets its damage",
          "Compare the extra profit of the dirty plant with the damage it causes: they are not equal."),
    ],
    kort="<p><b>Dirty for market value, clean for society.</b> Profit favours dirty (120 against 80), but social surplus "
         "favours clean (80 against 120 − 50 = 70).</p>",
    full="<p><b>The setup.</b> Hart and Zingales use a simple example: clean earns 100 with no damage, dirty earns 150 "
         "but does 60 of damage, so dirty's social surplus is 90. A market-value maximiser picks dirty; society "
         "prefers clean.</p>"
         "<p><b>Here.</b> Clean: profit 80, social surplus 80. Dirty: profit 120, damage 50, social surplus 70. A firm "
         "that maximises market value compares 120 with 80 and picks dirty. Society is better off with clean, since "
         "80 is more than 70.</p>"
         "<p><b>Where shareholders come in.</b> A shareholder who puts weight λ on the damage she feels responsible "
         "for votes clean if 80 &gt; 120 − 50λ, that is if λ is above 0.8. Prosocial owners can therefore prefer "
         "clean even though it earns less.</p>"
         "<p><b>The separable case.</b> If clean's profit were lower by exactly the damage it avoids, as with a "
         "donation to charity, every shareholder would vote dirty. That is Friedman's result.</p>"
         "<p><b>Remember:</b> market value counts profit; social surplus counts profit minus damage.</p>",
)

statisk(
    "stk-s18", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about why, in Hart and Zingales's model, prosocial but dispersed owners can end up accepting a "
        "change most of them oppose.",
        "In the model, people weigh damage only when they feel responsible for it and they feel responsible when "
        "their choice might decide the outcome.",
        "<p><b>Step 1: how much does one small owner's choice matter?</b> Could her decision to tender decide "
        "whether the bid succeeds?</p>"
        "<p><b>Step 2: does a vote take place?</b> Check whether each option describes the mechanism in the "
        "case.</p>",
    ),
    q="<p>A bidder offers a premium for Vestkyst Kraft, a clean utility owned by thousands of small shareholders. "
      "The bidder announces that it will switch to cheaper, dirtier generation. Most owners would vote against the switch if "
      "asked, yet most of them tender their shares. What do Hart and Zingales call this pattern and what drives "
      "it?</p>",
    alternativer=[
        R("Amoral drift: each small owner is almost never pivotal, so none feels responsible for the switch"),
        F("Amoral drift: prosocial owners are outvoted at the annual meeting by selfish ones",
          "No vote takes place and most owners here are prosocial. They decide one by one whether to tender."),
        F("Adverse selection: the owners who tender know the firm is worth less than the bid",
          "Nothing is hidden: the bidder announces its plan openly."),
        F("Pie-splitting: owners see the bidder's premium as value taken from the people living near the plant",
          "Pie-splitting is Edmans's mindset that value is fixed between groups. It does not explain why owners act "
          "against their own views."),
    ],
    kort="<p><b>Amoral drift.</b> A small owner is almost never pivotal, so she does not feel responsible and tenders, "
         "even if a majority would have voted against the switch.</p>",
    full="<p><b>The mechanism.</b> In Hart and Zingales's model, people put weight on damage only when they feel "
         "responsible for it. A shareholder who might be pivotal feels responsible. One of thousands of small "
         "owners knows her decision to tender almost never decides the bid, so the damage barely enters her choice. "
         "She compares the price offered with what she would get otherwise and tenders.</p>"
         "<p><b>The result.</b> The bid succeeds even if a majority would have voted against making the firm dirty. "
         "The reverse deal does not happen: a prosocial buyer who pays the market price for a dirty firm and cleans "
         "it up takes a loss. Unrestricted, public firms drift towards putting little weight on their "
         "externalities. Hart and Zingales call this amoral drift.</p>"
         "<p><b>The fix.</b> A vote. A voter who might be pivotal feels responsible, so prosocial owners vote "
         "clean.</p>"
         "<p><b>The usual mix-up.</b> Thinking the selfish owners outvote the prosocial ones. There is no vote in the "
         "tender and the drift happens even when most owners are prosocial.</p>"
         "<p><b>Remember:</b> not pivotal, so not responsible, so the firm drifts towards dirty.</p>",
)

statisk(
    "stk-s19", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the remedy Hart and Zingales's model points to when dispersed owners would accept a harmful "
        "takeover one by one.",
        "In the model an owner feels responsible for an outcome when her choice might be pivotal. Ask which "
        "safeguard puts each owner in that position.",
        "<p><b>Step 1: why would the bid succeed today?</b> Think about how each small owner sees her own "
        "choice.</p>"
        "<p><b>Step 2: which safeguard changes that?</b> Check whether each option keeps the owners' preferences at "
        "the centre.</p>",
    ),
    q="<p>The board of Havbris Seafood fears that a bidder could buy up its small shareholders' stakes and switch the "
      "firm to a cheaper, more polluting process that most owners oppose. Which safeguard follows from Hart and "
      "Zingales's model?</p>",
    alternativer=[
        R("Require a shareholder vote on such a change, since an owner who might be pivotal feels responsible"),
        F("Have the prosocial owners sell their shares first, so that the price falls and the bidder is deterred",
          "Selling hands the shares to less prosocial investors and does not change who decides."),
        F("Let management balance all stakeholders' interests without asking the owners",
          "That is a stakeholder mandate, which critics say leaves managers unaccountable and it ignores what the "
          "owners want."),
        F("Pay out all profit as dividends, so owners can fund the clean-up themselves",
          "Paying out profit is Friedman's separation, which fails when the pollution is tied to the firm's "
          "process."),
    ],
    kort="<p><b>A shareholder vote.</b> In a vote each owner might be pivotal and so feels responsible. Prosocial owners "
         "then reject the switch they would have accepted one by one in a tender.</p>",
    full="<p><b>The problem.</b> In a tender offer each small owner is almost never pivotal, feels no responsibility and "
         "sells. That is amoral drift: the firm can be turned dirty even if most owners oppose it.</p>"
         "<p><b>The remedy.</b> A vote changes the owner's reasoning. If her vote might decide the outcome, she feels "
         "responsible for it, so a prosocial owner votes clean. Hart and Zingales note that poison pills in practice "
         "force a bidder to hold a vote, which avoids the problem. More generally, they propose letting shareholders "
         "vote on the broad outlines of corporate policy.</p>"
         "<p><b>Why not the others.</b> Selling the shares moves them to less prosocial owners. A stakeholder mandate "
         "hands the choice to management. Paying out profit assumes the harm is separable and pollution from the "
         "firm's process is not.</p>"
         "<p><b>Their own caveat.</b> If owners' social preferences are too heterogeneous for a vote to aggregate, "
         "market value may survive as a second-best objective.</p>"
         "<p><b>Remember:</b> amoral drift is fixed by a vote, because voters feel responsible.</p>",
)

statisk(
    "stk-s20", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about when Hart and Zingales's shareholder vote gives the same answer as Friedman.",
        "The vote returns Friedman's outcome in three cases: the activity is separable, the government has already "
        "internalised the externality or the shareholders are not prosocial.",
        "<p><b>Step 1: what does the new tax do?</b> After it, is any part of the damage left uncovered?</p>"
        "<p><b>Step 2: what is left for prosocial owners to weigh?</b> Compare the firm's choice with what a "
        "market-value maximiser would do.</p>",
    ),
    q="<p>Shareholders of Bjørkli Chemicals vote on whether to keep using a solvent that harms groundwater. Just before "
      "the vote, the government introduces a tax on the solvent that fully covers the damage it causes. What do Hart "
      "and Zingales expect the vote to produce?</p>",
    alternativer=[
        R("The same choice as maximising market value, since the externality is already internalised"),
        F("A vote to drop the solvent whatever its cost, since prosocial owners reject any harm",
          "Prosocial owners weigh uncovered damage against profit. They do not reject every harm at any cost."),
        F("No meaningful result, since a shareholder vote cannot aggregate shareholders' preferences at all",
          "Too strong. Hart and Zingales raise aggregation only as a caveat when preferences are very "
          "heterogeneous."),
        F("A choice that ignores the tax, since taxes are separable from production",
          "A tax on the solvent changes the firm's own profit from using it, so the vote cannot ignore it."),
    ],
    kort="<p><b>Friedman's outcome.</b> Once the tax covers the damage, the firm's profit already reflects it, so owners "
         "vote as a market-value maximiser would choose.</p>",
    full="<p><b>The vote.</b> Hart and Zingales propose letting shareholders vote on the broad outlines of corporate "
         "policy. They stress that the vote does not always overturn Friedman. If profit-making and damage are "
         "separable, if government has internalised the externality or if shareholders are not prosocial, the vote "
         "yields the Friedman outcome: owners favour value maximisation.</p>"
         "<p><b>Here.</b> The tax makes the firm pay for the full damage. The cost now sits in the firm's own profit, "
         "so maximising market value already accounts for it. Prosocial owners have no uncovered harm left to "
         "weigh and the vote lands where a market-value maximiser would.</p>"
         "<p><b>Why it matters.</b> Hart and Zingales are not against profit. Their point is narrower: when damage is "
         "non-separable and not internalised, welfare and value part ways. Only then does the vote change the "
         "answer.</p>"
         "<p><b>The usual mix-up.</b> Thinking prosocial owners always vote against harm. They weigh damage they feel "
         "responsible for and here the tax has dealt with it.</p>"
         "<p><b>Remember:</b> separable, internalised or selfish owners: the vote gives Friedman's answer.</p>",
)

statisk(
    "stk-s21", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about Hart and Zingales's view on divesting from a polluting firm compared with staying invested.",
        "Ask what other, less concerned investors do when prosocial investors sell and who ends up owning the "
        "shares. The answer depends on how much wealth the prosocial investors hold.",
        "<p><b>Step 1: the fund sells.</b> What happens to the price and who is tempted to buy?</p>"
        "<p><b>Step 2: after the trade.</b> Who now owns the miner and how much do they care about its "
        "externalities?</p>",
    ),
    q="<p>The members of Nordlys Pensjon, a pension fund, want it to sell its shares in a coal miner to push up the "
      "miner's cost of capital. Prosocial investors like the fund hold only a small part of total market wealth. What "
      "do Hart and Zingales predict?</p>",
    alternativer=[
        R("Other investors buy the shares and restore the price, so the stock ends up with the least prosocial owners"),
        F("The miner's cost of capital rises permanently, forcing it to cut coal output",
          "This needs prosocial wealth to vastly exceed the wealth of other investors, which the case rules out."),
        F("Selling is the fund's only tool, since shareholders have no say in a listed firm",
          "Shareholders can vote and engage, which is what Hart and Zingales prefer."),
        F("The miner switches to cleaner production at once, since it can no longer raise equity",
          "A small group of sellers cannot shut a listed firm out of the equity market."),
    ],
    kort="<p><b>The price recovers and the shares go to less prosocial owners.</b> Unless prosocial investors hold vastly "
         "more wealth, divestment has no lasting effect. Hart and Zingales prefer invest and engage.</p>",
    full="<p><b>Why divestment fails.</b> If prosocial investors sell and the price falls, investors who do not care "
         "about the miner's externalities are attracted by the higher expected return and buy. The price goes back "
         "towards its old level. Unless the wealth of prosocial investors vastly exceeds that of the others, "
         "divestment cannot have a persistent effect on prices or the cost of capital.</p>"
         "<p><b>Worse.</b> If divestment did move prices, the controversial stock would end up with the least "
         "prosocial investors, who are the least likely to curb the externality.</p>"
         "<p><b>Invest and engage.</b> Hart and Zingales therefore prefer staying invested and using the vote to push "
         "the firm. They note that this works only if moral issues are regularly brought to a shareholder vote.</p>"
         "<p><b>Here.</b> The fund's prosocial investors hold little of total wealth, so the cost-of-capital plan "
         "would fail.</p>"
         "<p><b>Remember:</b> divest and the shares go to those who care least; invest and engage keeps a voice.</p>",
)

statisk(
    "stk-s22", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about what Hart and Zingales mean by maximising shareholder welfare and how it differs from "
        "stakeholder theory.",
        "Ask who the principal is in their model and whose preferences the firm follows. Then compare with "
        "stakeholder theory, where management balances all groups.",
        "<p><b>Step 1: who decides in Hart and Zingales?</b> Management weighing groups, or the owners?</p>"
        "<p><b>Step 2: what do the owners want?</b> Only money, or more than money?</p>"
        "<p><b>Step 3: compare with stakeholder theory.</b> In stakeholder theory management balances all groups. Is that what the column describes?</p>",
    ),
    q="<p>A newspaper column states: \"Hart and Zingales want managers to weigh employees, suppliers and local "
      "communities equally with shareholders. That is what maximising shareholder welfare means.\" What is wrong "
      "with this reading?</p>",
    alternativer=[
        R("They keep shareholders as the principal and widen what shareholders want to include social preferences"),
        F("Nothing: shareholder welfare is simply their name for the welfare of all stakeholders",
          "Shareholder welfare means the owners' welfare, money and values. Balancing all groups is stakeholder "
          "theory."),
        F("They actually want market value maximised in every case, as Friedman did",
          "They reject equating shareholder welfare with market value, though they agree with Friedman for "
          "separable activities."),
        F("They want employees rather than shareholders to elect the board",
          "Worker-elected boards belong to codetermination and the Accountable Capitalism Act, not to Hart and "
          "Zingales."),
    ],
    kort="<p><b>They are not stakeholder theorists.</b> Shareholders remain the principal. \"Shareholder welfare\" means "
         "following the owners' preferences, including their social ones, not balancing all groups.</p>",
    full="<p><b>Their position.</b> Hart and Zingales keep Friedman's premise that the firm should serve its "
         "shareholders. What they widen is the description of what shareholders want: money and values. If owners "
         "care about pollution or about how workers are treated, the firm should take that into account, ideally "
         "through a shareholder vote.</p>"
         "<p><b>What they do not say.</b> They do not ask managers to weigh every group equally. That is stakeholder "
         "theory, which leaves management to balance interests with no list and no weights and which critics say "
         "makes managers less accountable. In Hart and Zingales, owners decide.</p>"
         "<p><b>Nor do they reject Friedman outright.</b> For separable activities such as corporate charity they "
         "agree with him.</p>"
         "<p><b>Here.</b> The column turns shareholder welfare into stakeholder welfare. That is the trap the "
         "lecture warns about.</p>"
         "<p><b>Remember:</b> Hart and Zingales widen what shareholders want; they do not replace shareholders with "
         "stakeholders.</p>",
)

statisk(
    "stk-s23", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about Edmans's two mentalities about how a firm's value relates to what its stakeholders get.",
        "Edmans contrasts treating value as a fixed amount to be divided with believing that firms can enlarge it, "
        "delivering both purpose and profit.",
        "<p><b>Step 1: what does the CFO assume about value?</b> Is the total fixed or can it grow?</p>"
        "<p><b>Step 2: match the assumption to a mentality.</b> Discard concepts from other authors.</p>",
    ),
    q="<p>The CFO of Granli Hotels argues against a training programme for staff: \"Every krone we spend on employees is "
      "a krone taken from our shareholders.\" In Edmans's (2020) terms, which mentality does this reflect?</p>",
    alternativer=[
        R("Pie-splitting: value is fixed, so staff gain only what owners lose"),
        F("Pie-growing: the firm can deliver purpose and profit together, so both sides gain",
          "The CFO denies that the programme could add value for both groups."),
        F("Shareholder welfare: owners' social preferences come first",
          "That is Hart and Zingales's objective, not Edmans's mentality and the CFO mentions no social "
          "preferences."),
        F("Amoral drift: nobody feels responsible for the decision",
          "Amoral drift concerns small owners tendering to a bidder. Here a manager states a view about value."),
    ],
    kort="<p><b>Pie-splitting.</b> The CFO treats value as a fixed pie: whatever employees gain, shareholders lose. Edmans "
         "argues that firms can grow the pie instead.</p>",
    full="<p><b>Grow the pie.</b> Edmans (2020) contrasts two mentalities. Under <b>pie-splitting</b>, value is fixed, so "
         "any gain for stakeholders is a loss for shareholders. Under <b>pie-growing</b>, companies can deliver both "
         "purpose and profit, because investing in stakeholders can enlarge the total.</p>"
         "<p><b>Here.</b> \"Every krone for employees is a krone taken from shareholders\" assumes the pie cannot grow. "
         "The CFO does not ask whether better-trained staff might raise service quality and profit.</p>"
         "<p><b>Do not overstate it.</b> The lecture's own position is careful: shareholder, stakeholder and ethical "
         "perspectives sometimes reinforce each other but often involve trade-offs. Pie-growing is a possibility to "
         "look for, not a guarantee.</p>"
         "<p><b>The usual mix-up.</b> Confusing Edmans with Hart and Zingales. Edmans is about how managers see "
         "value; Hart and Zingales are about whose preferences the firm should follow.</p>"
         "<p><b>Remember:</b> fixed pie, one side's gain is the other's loss: pie-splitting.</p>",
)

statisk(
    "stk-s24", tema="stakeholder", type="begrep",
    hjelp=hjelp3(
        "This is about Edmans's definition of a central concept in Grow the pie.",
        "Edmans answers one question with this concept: what the world gains because the company exists. Compare it "
        "with business model and sustainability tools from lecture 6.",
        "<p><b>Step 1: read the CEO's question.</b> Is it about customers, about issues, about a list of groups or "
        "about why the firm exists?</p>"
        "<p><b>Step 2: match it to the concept Edmans uses.</b></p>",
    ),
    q="<p>At a strategy workshop, the CEO of Solvik Health asks her team one question: \"How is the world a better place "
      "by our company being here?\" Which concept is she asking them to define, as Edmans (2020) uses it?</p>",
    alternativer=[
        R("The company's purpose"),
        F("The customer value proposition",
          "The value proposition is the customer's job that the product does, a business model element in lecture 6. "
          "Her question is about the world."),
        F("The company's material ESG issues",
          "Materiality ranks issues by their effect on the firm or of the firm. It does not ask what the world gains "
          "from the firm's existence."),
        F("The company's stakeholder impact map",
          "An impact map lists stakeholders and how the firm helps or hurts each one. It is a tool, not this single "
          "question."),
    ],
    kort="<p><b>Purpose.</b> Edmans defines purpose as the answer to \"how is the world a better place by your company "
         "being here?\"</p>",
    full="<p><b>The definition.</b> In Grow the pie, Edmans (2020) defines a company's purpose as the answer to one "
         "question: how is the world a better place by your company being here? A firm with a clear purpose knows "
         "how it creates value for society, which is the basis for growing the pie rather than splitting it.</p>"
         "<p><b>Here.</b> The CEO asks exactly Edmans's question.</p>"
         "<p><b>Related tools.</b> Lecture 6 starts its sustainability analysis with purpose too: the company's "
         "raison d'être, how it creates value for society and how it gets paid for it. Then come the stakeholder "
         "analysis, with the stakeholder impact map and the materiality analysis. The customer value proposition "
         "is part of the business model: the job the product does for customers that alternatives do not.</p>"
         "<p><b>The usual mix-up.</b> Treating purpose as a customer pitch. Purpose is about society; the value "
         "proposition is about customers.</p>"
         "<p><b>Remember:</b> purpose answers \"how is the world better because we exist?\"</p>",
)

statisk(
    "stk-s25", tema="stakeholder", type="paastand",
    hjelp=hjelp3(
        "This is about the position lecture 4 itself takes after presenting Friedman, stakeholder theory, Hart and "
        "Zingales and Edmans.",
        "The lecture defines sustainable finance by the perspectives it uses to analyse business decisions and it "
        "says how often those perspectives agree.",
        "<p><b>Step 1: how many perspectives?</b> Count the ones the lecture names.</p>"
        "<p><b>Step 2: do they always agree?</b> Discard options that are too strong in either direction.</p>"
        "<p><b>Step 3: check the source.</b> Is the option the lecture's own view, or the position of one side of the debate?</p>",
    ),
    q="<p>Which statement matches lecture 4's own conclusion about how sustainable finance looks at business "
      "decisions?</p>",
    alternativer=[
        R("It analyses them from the perspective of shareholders, other stakeholders and ethics, which sometimes "
          "reinforce each other but often involve trade-offs"),
        F("It analyses them from the shareholders' perspective only, since stakeholder claims cannot be measured "
          "or compared",
          "Too narrow. The lecture adds other stakeholders and ethics."),
        F("It assumes that shareholder and stakeholder interests always align in the long run, so trade-offs "
          "disappear",
          "Too strong: the lecture sees such alignment only some of the time."),
        F("It replaces shareholder value with the welfare of all stakeholders, as the Business Roundtable statement "
          "did",
          "The lecture keeps shareholders as one of several perspectives. It does not adopt the statement."),
    ],
    kort="<p><b>Three perspectives, often in tension.</b> Sustainable finance analyses decisions from the view of "
         "shareholders, other stakeholders and ethics. They sometimes overlap and reinforce each other but often "
         "involve trade-offs.</p>",
    full="<p><b>The lecture's position.</b> After the debate between Friedman, stakeholder theory, Hart and Zingales and "
         "Edmans, lecture 4 states its own view: sustainable finance means analysing business decisions from the "
         "perspective of shareholders, other stakeholders and ethics. These sometimes overlap and reinforce each "
         "other, but often involve trade-offs.</p>"
         "<p><b>Why it is balanced.</b> It does not side with Friedman, since it brings in stakeholders and ethics. "
         "It does not adopt stakeholder theory either, since shareholders remain one of the perspectives and the "
         "critics' accountability concerns stand. And it is more careful than a simple win-win story: Edmans's "
         "pie-growing is possible, but trade-offs are common.</p>"
         "<p><b>The usual mix-up.</b> Overstating the harmony. A statement that shareholder and stakeholder interests "
         "always align is too strong. The Klarna case is a reminder: the cost saving hurt employees and, in the "
         "end, customers.</p>"
         "<p><b>Remember:</b> shareholders, stakeholders and ethics: sometimes aligned, often in tension.</p>",
)

statisk(
    "stk-s26", tema="stakeholder", type="paastand",
    hjelp=hjelp3(
        "This is about where each view of the firm's objective breaks down, as the course summarises it.",
        "Friedman fails in one kind of situation, stakeholder theory on accountability and Hart and Zingales on one "
        "caveat they raise themselves. Match each view to its own weakness.",
        "<p><b>Step 1: for each option, name the view.</b></p>"
        "<p><b>Step 2: ask whether the stated weakness belongs to that view.</b> Watch for weaknesses moved from "
        "one view to another and for cases where a view actually holds.</p>",
    ),
    q="<p>Which pairing of a view of the firm's objective with where it breaks down is correct?</p>",
    alternativer=[
        R("Hart and Zingales: when owners' social preferences are too heterogeneous for a vote to aggregate"),
        F("Friedman: whenever a firm gives part of its profit to charity",
          "Charity is the separable case, where Hart and Zingales agree with Friedman."),
        F("Stakeholder theory: when damage is non-separable and government does not internalise it",
          "Non-separable damage that government leaves alone is where Friedman's view fails. Stakeholder theory "
          "fails on accountability."),
        F("Hart and Zingales: when the social activity is separable from money-making",
          "With separable activities their vote simply returns Friedman's answer. That is agreement, not "
          "breakdown."),
    ],
    kort="<p><b>Hart and Zingales's own caveat.</b> If owners' social preferences are too heterogeneous for a vote to "
         "aggregate, market value may survive as a second-best objective.</p>",
    full="<p><b>Three views, three weak points.</b></p>"
         "<ul><li><b>Friedman</b> (profit within law and ethical custom) breaks down when damage is non-separable "
         "and government does not internalise it.</li>"
         "<li><b>Stakeholder theory</b> (value for all stakeholders) breaks down on accountability: no list and no "
         "weights, so managers escape scrutiny (Jensen; Bebchuk and Tallarita).</li>"
         "<li><b>Hart and Zingales</b> (shareholder welfare, money and values) break down if preferences are too "
         "heterogeneous for a vote to aggregate. They raise this caveat themselves, drawing on the social choice "
         "literature and accept that market value might then survive as a second-best objective.</li></ul>"
         "<p><b>The traps.</b> Charity does not break Friedman's view: it is the separable case where he is right. "
         "Separable activities do not break Hart and Zingales's view either: their vote then gives Friedman's "
         "answer. Non-separable damage is Friedman's weak point, not stakeholder theory's.</p>"
         "<p><b>Remember:</b> Friedman fails on non-separable harm, stakeholder theory on accountability, Hart and "
         "Zingales on heterogeneous preferences.</p>",
)

statisk(
    "stk-s27", tema="stakeholder", type="fakta",
    hjelp=hjelp3(
        "This is about the field experiment on job applicants shown in the employees part of lecture 4.",
        "Applicants stated the wage they wanted for the same job, either in a group told about the firm's social "
        "responsibility or in a control group. Ask which group bid higher and what that means for the firm's costs.",
        "<p><b>Step 1: the direction.</b> In which group was the mean wage bid higher?</p>"
        "<p><b>Step 2: the implication.</b> If applicants accept a different wage, who gains: the firm's owners or "
        "its competitors?</p>",
    ),
    q="<p>In the field experiment shown in lecture 4, job applicants bid the wage they wanted for the same job. One "
      "group was told that the employer is socially responsible; a control group was not. How did the bids compare "
      "and what does it imply?</p>",
    alternativer=[
        R("Bids were lower in the CSR group, so a social cause can lower a cost that owners bear"),
        F("Bids were higher in the CSR group, since applicants expect a responsible firm to share more of its profits",
          "This reverses the result: the mean bid was higher in the control group."),
        F("Bids did not differ, so social responsibility has no effect on hiring costs",
          "The two distributions were statistically different."),
        F("Bids were lower in the CSR group, which shows that responsible firms exploit their staff",
          "The applicants chose their own bids; the lecture reads the gap as willingness, not exploitation."),
    ],
    kort="<p><b>Lower bids at the responsible firm.</b> Applicants are willing to be paid less for the same job at a "
         "socially responsible firm, so serving a social cause can lower the wage bill.</p>",
    full="<p><b>The experiment.</b> Job applicants bid the wage they wanted for the same job. One group was told about "
         "the firm's social responsibility (the CSR treatment group); the control group was not. The distributions "
         "of bids were statistically different and the mean bid was significantly higher in the control group.</p>"
         "<p><b>The reading.</b> Applicants are willing to be paid less to take the same job at a socially "
         "responsible firm. The lecture uses this to show that stakeholders, here employees, respond to what the "
         "firm stands for.</p>"
         "<p><b>Why it matters for the debate.</b> Serving a social cause need not be pure cost for shareholders. If "
         "it lowers the wage needed to hire, it can raise profit as well. This is one route to Edmans's "
         "pie-growing and it shows how shareholder and stakeholder interests can overlap.</p>"
         "<p><b>The usual mix-up.</b> Reversing the direction. The higher bids came from the control group, not the "
         "CSR group.</p>"
         "<p><b>Remember:</b> people accept lower pay to work for a responsible firm.</p>",
)

statisk(
    "stk-s28", tema="stakeholder", type="fakta",
    hjelp=hjelp3(
        "This is about how a climate shock at one firm travels along the supply chain, as the evidence in lecture 4 "
        "shows.",
        "The lecture shows that a firm's performance suffers when its exposure to heat increases. Ask whether the "
        "effect stops at that firm or reaches its trading partners.",
        "<p><b>Step 1: the supplier.</b> What happens to a firm when its exposure to heat rises?</p>"
        "<p><b>Step 2: the customers.</b> Does the shock stay with the supplier, or does it travel down the "
        "chain?</p>",
    ),
    q="<p>A heatwave hits the region where Solbakken Components, a supplier of car parts, has its factories. What does "
      "the supply-chain evidence in lecture 4 suggest?</p>",
    alternativer=[
        R("The supplier's performance suffers and so does its customers' operating income"),
        F("Only the supplier suffers, since its customers can switch at no cost",
          "The evidence shows that the shock does not stay with the supplier."),
        F("The customers gain, since the supplier must cut its prices to keep their business",
          "Nothing in the evidence points to a gain for customers."),
        F("Neither is affected, since heat is a risk that insurers carry for them",
          "The evidence shows that performance falls when exposure to heat rises."),
    ],
    kort="<p><b>The shock travels.</b> A firm's performance suffers when its exposure to heat rises and its customers' "
         "operating income drops too.</p>",
    full="<p><b>Supply chains as stakeholders.</b> Lecture 4 ends with stakeholders along the supply chain. The point is "
         "that problems travel along the chain: what happens to a supplier does not stay with the supplier.</p>"
         "<p><b>The heat evidence.</b> Firm performance suffers when exposure to heat increases and the customers of "
         "those firms see their operating income drop as well. A physical climate shock at one link becomes a "
         "financial problem further down.</p>"
         "<p><b>Here.</b> The heatwave hurts Solbakken's output and the car makers that rely on its parts feel it in "
         "their own income.</p>"
         "<p><b>The same logic elsewhere.</b> After environmental and social incidents at foreign suppliers, US firms "
         "cut their imports by around 30% (Bisetti et al. 2024). Nestlé stopped buying Brazilian soy from Cargill "
         "when it could not be traced to specific plantations. The lecture points to the EU Corporate Sustainability "
         "Due Diligence Directive as the regulatory answer.</p>"
         "<p><b>Remember:</b> supply-chain shocks hit the supplier and its customers.</p>",
)

statisk(
    "stk-s29", tema="stakeholder", type="fakta",
    hjelp=hjelp3(
        "This is about the finding of Bisetti et al. on how US firms react to incidents at their foreign suppliers.",
        "The study measures the number of containers US firms receive from a foreign supplier before and after the "
        "supplier has an environmental or social incident.",
        "<p><b>Step 1: the direction.</b> Do US firms import more, the same or less from such a supplier?</p>"
        "<p><b>Step 2: discard options that describe a different action than trade.</b></p>"
        "<p><b>Step 3: think about the buyer's risk.</b> An incident at a supplier is also a risk to the buyer's own reputation and supply. How would a buyer protect itself?</p>",
    ),
    q="<p>A US retailer learns that its main foreign supplier has had a serious environmental and social incident. What "
      "did Bisetti et al. (2024) find that US firms typically do in this situation?</p>",
    alternativer=[
        R("They cut their imports from the supplier, by around 30%"),
        F("They raise their imports, since the supplier offers lower prices after the incident",
          "The study finds the opposite direction."),
        F("They keep their imports unchanged, since contracts lock in the volumes",
          "The study finds a clear change in the containers received."),
        F("They buy the supplier in order to fix its practices from inside",
          "The finding is about trade volumes, not takeovers."),
    ],
    kort="<p><b>They cut imports.</b> After environmental and social incidents at foreign suppliers, US firms cut their "
         "imports from them by around 30% (Bisetti et al. 2024).</p>",
    full="<p><b>The finding.</b> Bisetti et al. (2024) track the relative number of containers US firms receive from a "
         "foreign supplier. After an environmental or social incident at the supplier, US firms cut their imports "
         "from it by around 30%.</p>"
         "<p><b>Why it matters.</b> Customers are stakeholders of the supplier and they react. An incident is not "
         "just a reputational problem for the supplier: it loses business. For the US buyer, the incident is a "
         "risk to its own reputation and supply, which it manages by buying less.</p>"
         "<p><b>The wider point of lecture 4.</b> Problems travel along supply chains. A heat shock at a supplier "
         "also lowers its customers' operating income. Nestlé stopped buying soy from Cargill that could not be "
         "traced to specific plantations. The regulatory answer the lecture points to is the EU Corporate "
         "Sustainability Due Diligence Directive.</p>"
         "<p><b>The usual mix-up.</b> Assuming long contracts make buyers stick with the supplier. The evidence shows "
         "they do not.</p>"
         "<p><b>Remember:</b> E&amp;S incidents at a supplier lead customers to cut their orders.</p>",
)

statisk(
    "stk-s30", tema="stakeholder", type="tolkning",
    hjelp=hjelp3(
        "This is about the EU rule that lecture 4 links to environmental and social problems in companies' supply "
        "chains.",
        "Several EU rules appear in the course: one defines which activities are environmentally sustainable, one "
        "governs disclosure by asset managers, pension funds and insurers and one deals with companies' due "
        "diligence along their chains.",
        "<p><b>Step 1: what is the problem in the case?</b> Disclosure by investors, the classification of "
        "activities or what happens at suppliers?</p>"
        "<p><b>Step 2: discard rules that are not EU rules or do not address that problem.</b></p>",
    ),
    q="<p>A chocolate maker stops buying cocoa from a trader after a review cannot trace the beans back to specific "
      "farms, raising fears they come from cleared rainforest. Which EU rule does lecture 4 point to as the "
      "regulatory answer to problems like this?</p>",
    alternativer=[
        R("The Corporate Sustainability Due Diligence Directive"),
        F("The Sustainable Finance Disclosure Regulation (SFDR)",
          "The SFDR sets disclosure rules for asset managers, pension funds and insurers, not duties for firms' "
          "supply chains."),
        F("The EU Taxonomy of sustainable activities",
          "The Taxonomy defines which economic activities count as environmentally sustainable. It does not deal "
          "with what happens at a firm's suppliers."),
        F("The Accountable Capitalism Act",
          "That is a US proposal about corporate charters and boards, not an EU rule."),
    ],
    kort="<p><b>The Corporate Sustainability Due Diligence Directive.</b> Lecture 4 ends its supply-chain section with the "
         "EU directive on corporate sustainability due diligence as the regulatory answer.</p>",
    full="<p><b>The case.</b> The chocolate maker repeats what Nestlé did in lecture 4: Nestlé, aiming to eliminate "
         "deforestation from its supply chain, stopped buying Brazilian soybeans from Cargill after a review could "
         "not trace them to specific plantations, raising concerns that they were grown on converted land.</p>"
         "<p><b>The problem.</b> Supply-chain harm sits at suppliers the buyer does not control and it can travel "
         "back to the buyer through lawsuits, lost customers or cuts in trade. US firms cut imports by around 30% "
         "after incidents at foreign suppliers (Bisetti et al. 2024).</p>"
         "<p><b>The regulatory answer.</b> The lecture closes the section with the EU Corporate Sustainability Due "
         "Diligence Directive, which addresses companies' responsibility along their chains.</p>"
         "<p><b>The usual mix-ups.</b> The SFDR is about disclosure by financial market participants and the EU "
         "Taxonomy classifies sustainable activities; both belong to lecture 7. The Accountable Capitalism Act is a "
         "US proposal about boards.</p>"
         "<p><b>Remember:</b> supply-chain due diligence in the EU: the CSDDD.</p>",
)
