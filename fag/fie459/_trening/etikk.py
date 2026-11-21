# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: forretningsetikk (tema «etikk», forelesning 2).

   Statiske spørsmål eti-s01 … eti-s32: normative teorier (absolutisme og
   relativisme, konsekvensetikk og pliktetikk, de fire samtidige teoriene, én
   handling med to dommer), deskriptive teorier (Schwartz, Rest og Jones'
   fire trinn), individuelle faktorer og Kohlbergs stige, situasjonsfaktorer
   (moral intensitet, framing, moral muteness), rasjonaliseringstaktikker,
   Bénabou og Tirole om CSR og Telenor i Myanmar.

   Kilder: fag/fie459/_fragmenter/k2.html, foilteksten til forelesning 2
   (FIE459_H26_2_Business_Ethics.txt), bildene av Crane et al. (2019) i
   foilene og docs/fie459-forfatterspek.md § 5 (k2). «Bird & Walters» i foilen
   er Bird & Waters (1989).
"""
from trening_lib import *  # noqa: F401,F403

ABS = ("Consequentialist theories judge outcomes: ethical egoism (one's own interests) and utilitarianism (the best "
       "total outcome for all affected). Non-consequentialist theories judge principles: ethics of duty (Kant: act "
       "only on rules that could become universal law) and rights and the nature of justice (human dignity).")
REL = ("The lecture's contemporary theories: virtue ethics (character: strive to be a good person), ethics of care "
       "(our first responsibility is to our significant relationships), discourse ethics (resolve conflicts by "
       "honest, open argument) and postmodern ethics (moral impulse, specific to context and individual).")
REST = ("Crane et al., based on Rest and Jones: recognise the moral issue, make a moral judgement, establish moral "
        "intent, engage in moral behaviour. Individual and situational factors influence every stage.")
KOHL = ("Kohlberg: pre-conventional (1 obedience and punishment, 2 instrumental purpose and exchange), conventional "
        "(3 interpersonal accord and conformity, 4 social accord and system maintenance), post-conventional (5 social "
        "contract and individual rights, 6 universal ethical principles).")
JONES = ("Jones: moral intensity varies with magnitude of consequences, social consensus, probability of effect, "
         "temporal immediacy, proximity and concentration of effect.")
TAKT = ("Rationalisation tactics: denial of responsibility (no choice), denial of injury (no real harm), denial of "
        "victim (they deserved it or chose it), social weighting (condemn the critics, others are worse), appeal to "
        "higher loyalties (a higher-order value), metaphor of the ledger (accrued credits).")
BT = ("Bénabou and Tirole: win-win (CSR pays for itself), delegated philanthropy (stakeholders use the firm to act on "
      "their own values) and insider-initiated philanthropy (management spends other people's money on its own "
      "values).")

# ---------------------------------------------------------------------------
# Normative teorier
# ---------------------------------------------------------------------------
statisk(
    "eti-s01", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an argument by the normative theory behind it.",
        ABS,
        "<p><b>Step 1: does he judge by outcomes or by a principle?</b></p>"
        "<p><b>Step 2: if outcomes, whose outcomes count?</b> His own, or everyone's? The fact that he does the "
        "decent thing does not tell you why.</p>",
    ),
    q="<p>A purchasing manager turns down a bribe from a supplier. Asked why, he says: «If it ever came out, I would "
      "lose my job and my pension. Saying no is simply what is best for me.»</p>"
      "<p>Which normative theory does his reasoning reflect?</p>",
    alternativer=[
        R("Ethical egoism"),
        F("Utilitarianism",
          "A utilitarian adds up the outcome for everyone affected. He counts only what happens to him."),
        F("Ethics of duty",
          "Kant asks whether a rule could hold for everyone, whatever the outcome. He reasons only from "
          "consequences."),
        F("Virtue ethics",
          "Virtue ethics asks what a person of good character would do. He never mentions character."),
    ],
    kort="<p><b>Ethical egoism.</b> He judges the act by its consequences for himself alone. A right act can rest on a "
         "self-interested reason.</p>",
    full="<p><b>The theory.</b> Ethical egoism is a consequentialist theory: an act is right if it maximises one's own "
         "desires or interests. Utilitarianism is also consequentialist but counts the outcome for all affected. The "
         "two differ only in whose outcomes count.</p>"
         "<p><b>Here.</b> The manager does the right thing, but his reason is the cost to himself: his job and pension. "
         "He judges by outcomes and counts only his own.</p>"
         "<p><b>The usual confusion.</b> Assuming that refusing a bribe must rest on a principle. Kant would refuse "
         "because «take bribes when it pays» could not be a universal law, whatever the risk of being caught. A "
         "utilitarian would count the harm to the firm, rival suppliers and customers. The verdict is the same; the "
         "reason differs. Exam questions classify the reason, not the act.</p>"
         "<p><b>Remember:</b> egoism is consequentialist, with oneself as the only one who counts.</p>",
)

statisk(
    "eti-s02", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an argument by the normative theory behind it.",
        ABS + " Ethics of care puts our significant relationships first.",
        "<p><b>Step 1: does the head of data weigh the profit against anything?</b></p>"
        "<p><b>Step 2: what is the basis for the refusal?</b> An outcome, a relationship or something each person is "
        "entitled to?</p>",
    ),
    q="<p>A data team proposes selling customers' location histories to advertisers. It would raise profit and most "
      "customers would never notice. The head of data refuses: «Every customer has a right to privacy. That right is "
      "not ours to trade, whatever it earns.»</p>"
      "<p>Which normative theory is she using?</p>",
    alternativer=[
        R("Rights and justice"),
        F("Utilitarianism",
          "She explicitly refuses to weigh the gain against the harm. A utilitarian would add up both."),
        F("Ethical egoism",
          "She does not ask what is best for herself; she gives up a gain for the firm."),
        F("Ethics of care",
          "Care centres on one's significant relationships. She appeals to something every customer is owed, "
          "known or not."),
    ],
    kort="<p><b>Rights and justice.</b> She appeals to an entitlement every customer has, which no gain can "
         "override: a non-consequentialist argument.</p>",
    full="<p><b>The theory.</b> Theories of rights and justice are non-consequentialist. They hold that people have "
         "rights grounded in human dignity and that universalisable rules of justice must be respected whatever the "
         "outcome. Ethics of duty (Kant) is the other non-consequentialist theory in the lecture.</p>"
         "<p><b>Here.</b> The head of data sets aside the profit and the fact that customers would not notice. Her "
         "reason is that each customer has a right that the firm may not trade away. That is a rights argument.</p>"
         "<p><b>The usual confusion.</b> Utilitarianism would ask whether the gain outweighs the harm. It might even "
         "approve if nobody noticed. Ethics of care would centre on particular relationships. Her appeal is to an "
         "entitlement everyone holds.</p>"
         "<p><b>Remember:</b> «they have a right to it, whatever it costs» points to rights and justice; «the total "
         "gain outweighs the harm» points to utilitarianism.</p>",
)

statisk(
    "eti-s03", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an argument by the normative theory behind it.",
        REL + " Ethics of duty (Kant) asks whether a rule could become universal law.",
        "<p><b>Step 1: what question does she ask herself?</b> About a rule, an outcome, a relationship or herself "
        "as a person?</p>"
        "<p><b>Step 2: match that question to a theory.</b> Several theories can reach the same verdict, so "
        "classify the form of her question, not the value she protects.</p>",
    ),
    q="<p>A new chief executive must decide whether to tell investors about a costly delay before the quarterly report. "
      "She asks herself: «What would an honest and courageous leader do here? That is the kind of person I want to "
      "be.»</p>"
      "<p>Which normative theory does her question reflect?</p>",
    alternativer=[
        R("Virtue ethics"),
        F("Ethics of duty",
          "Kant asks whether a rule could hold for everyone. She asks about the kind of person she wants to be."),
        F("Utilitarianism",
          "She does not weigh the outcomes for those affected."),
        F("Discourse ethics",
          "Discourse ethics resolves conflicts through open argument between parties. She is reflecting alone on "
          "her own character."),
    ],
    kort="<p><b>Virtue ethics.</b> Her test is character: what an honest and courageous person would do. Virtue "
         "ethics focuses on being a good person.</p>",
    full="<p><b>The theory.</b> Virtue ethics is one of the contemporary theories the lecture groups under relativism. "
         "Its focus is character: strive to be a good person and learn virtuous traits, such as honesty and courage, "
         "to lead a good life. The question is not «which rule?» or «which outcome?» but «what would a good person "
         "do?»</p>"
         "<p><b>Here.</b> The chief executive frames the choice around the traits she wants to have. That is the "
         "virtue question.</p>"
         "<p><b>The usual confusion.</b> Honesty also fits Kant, who would ask whether «hide bad news when "
         "convenient» could be a universal law. But she does not reason about a universal rule; she reasons about "
         "herself as a person. Classify by the form of the argument, not by the value it ends up protecting.</p>"
         "<p><b>Remember:</b> character points to virtue ethics, rules for everyone point to duty and summed outcomes "
         "point to utilitarianism.</p>",
)

statisk(
    "eti-s04", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an argument by the normative theory behind it.",
        REL + " Utilitarianism adds up outcomes for everyone affected.",
        "<p><b>Step 1: whom does the manager mention?</b> Everyone affected, herself, or particular people?</p>"
        "<p><b>Step 2: why do they count for her?</b> Look at the words she uses about them and ask whether "
        "she weighs them against anyone else.</p>",
    ),
    q="<p>A factory manager in a small town keeps an unprofitable production line running for another year. She "
      "explains: «I have worked beside these people for twenty years. My first responsibility is to them.»</p>"
      "<p>Which normative theory best describes her reasoning?</p>",
    alternativer=[
        R("Ethics of care"),
        F("Utilitarianism",
          "She does not add up outcomes for everyone affected, such as shareholders or customers. She puts "
          "particular people first."),
        F("Ethical egoism",
          "Keeping a losing line open does nothing for her own interests."),
        F("Virtue ethics",
          "She does not reason about her own character. She reasons from her bond with specific people."),
    ],
    kort="<p><b>Ethics of care.</b> She grounds the decision in her relationship with particular people: «my first "
         "responsibility is to them».</p>",
    full="<p><b>The theory.</b> Ethics of care, one of the contemporary theories in lecture 2, focuses on "
         "relationships. Its tenet is that our first responsibility is to our significant relationships. People are "
         "seen as relational and interdependent, not as anonymous units in a sum.</p>"
         "<p><b>Here.</b> The manager does not compute total welfare. She points to the people she has worked beside "
         "for twenty years and says she owes them first. That is the care perspective.</p>"
         "<p><b>The usual confusion.</b> Treating any concern for workers as utilitarian. A utilitarian would count "
         "everyone affected, including shareholders who lose money on the line and other workers elsewhere. "
         "It might well close it. Care gives special weight to the relationships one is part of.</p>"
         "<p><b>Remember:</b> «my first responsibility is to the people close to me» is ethics of care.</p>",
)

statisk(
    "eti-s05", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying an approach to an ethical conflict by the normative theory behind it.",
        REL + " Rights and the nature of justice centres on what everyone is entitled to.",
        "<p><b>Step 1: how is the conflict settled?</b> By a calculation, a principle or a process?</p>"
        "<p><b>Step 2: what does that process require of the parties?</b> Ask whether the answer is fixed "
        "before the talks start or emerges from them.</p>",
    ),
    q="<p>A mining company and a reindeer-herding community disagree about where a new mine road should run. They agree "
      "to a series of meetings where each side sets out its arguments openly and honestly. They keep talking until "
      "both can accept a route.</p>"
      "<p>Which normative theory does this approach reflect?</p>",
    alternativer=[
        R("Discourse ethics"),
        F("Ethics of care",
          "Care rests on one's own significant relationships. Here two parties settle a conflict through "
          "argument."),
        F("Rights and justice",
          "Neither side appeals to an entitlement that settles the matter. The outcome comes from the "
          "exchange."),
        F("Utilitarianism",
          "Nobody adds up total welfare to pick the route. The parties reason together until both accept it."),
    ],
    kort="<p><b>Discourse ethics.</b> The conflict is resolved through honest, open exchange and argument until the "
         "parties agree.</p>",
    full="<p><b>The theory.</b> Discourse ethics is one of the contemporary theories in lecture 2. Its focus is "
         "deliberation: conflicts are resolved through honest, open exchange and discussion. It sees people as "
         "rational individuals who can settle their differences by a process of argumentation.</p>"
         "<p><b>Here.</b> The right route is not computed or deduced in advance. It is whatever both sides can accept "
         "after an open, honest exchange. The process is the ethical test.</p>"
         "<p><b>The usual confusion.</b> Rights and care can both appear in such talks, since the herders may claim "
         "rights and the parties may value their relationship. But the case describes how the conflict is resolved: "
         "by argument until agreement. That defines discourse ethics.</p>"
         "<p><b>Remember:</b> resolving a conflict by honest, open argument is discourse ethics.</p>",
)

statisk(
    "eti-s06", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about classifying a view of how to decide hard cases by the normative theory behind it.",
        REL + " Ethics of duty (Kant) relies on rules that could become universal law.",
        "<p><b>Step 1: does he rely on rules, outcomes or something else?</b></p>"
        "<p><b>Step 2: where does his guidance come from?</b> From outside him or from within? Does it change "
        "with the situation?</p>",
    ),
    q="<p>Asked how he decides hard cases, a fund manager says: «No rulebook fits every situation. In each case I go "
      "by my own inner sense of what is right here and now.»</p>"
      "<p>Which normative theory does his view reflect?</p>",
    alternativer=[
        R("Postmodern ethics"),
        F("Virtue ethics",
          "Virtue ethics is about developing a good character over a life. He describes a judgement that "
          "depends on the case and comes from within."),
        F("Ethics of duty",
          "Kant demands rules that could hold for everyone. He rejects any rule that fits every situation."),
        F("Ethical egoism",
          "He does not say he picks what serves his own interests."),
    ],
    kort="<p><b>Postmodern ethics.</b> Ethics is specific to the context and the individual, guided by an innate inner "
         "sense, the moral impulse.</p>",
    full="<p><b>The theory.</b> Postmodern ethics is the last of the contemporary theories in lecture 2. Its focus is "
         "the moral impulse: ethics is context and individual specific. People have an innate internal guide to "
         "what is right. It rejects the idea of one rulebook for all cases.</p>"
         "<p><b>Here.</b> The manager rejects universal rules and relies on his own inner sense, case by case. Both "
         "elements point to postmodern ethics.</p>"
         "<p><b>The usual confusion.</b> Virtue ethics also looks inward, but at character built over time: «what "
         "would a good person do?». Kant is the opposite pole: act only on rules that could be universal law.</p>"
         "<p><b>A related idea.</b> Schwartz's intuitionist perspective also stresses intuition, but it is a "
         "descriptive account of how people actually decide, not a normative theory of what is right.</p>"
         "<p><b>Remember:</b> «no rulebook, my inner sense in this case» is postmodern ethics.</p>",
)

statisk(
    "eti-s07", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the first split among normative theories in lecture 2.",
        "Absolutism holds that there are eternal, universally applicable moral principles. Relativism holds that "
        "morality is context-dependent and subjective. Absolutist theories then split into consequentialist and "
        "non-consequentialist ones.",
        "<p><b>Step 1: does the code apply one standard everywhere?</b></p>"
        "<p><b>Step 2: what makes the act right or wrong in the code?</b> A universal principle, an outcome or the "
        "local setting?</p>",
    ),
    q="<p>A multinational's code of conduct says: «Gifts to officials are wrong in Norway but acceptable in countries "
      "where they are customary. What is right depends on the local context.»</p>"
      "<p>Which position does the code take on the first split of normative ethical theories?</p>",
    alternativer=[
        R("Ethical relativism"),
        F("Ethical absolutism",
          "Absolutism holds that moral principles apply everywhere. The code says the answer changes from country "
          "to country."),
        F("Consequentialism",
          "The code does not judge gifts by their outcomes. It judges them by local custom."),
        F("Non-consequentialism",
          "Non-consequentialist theories rest on principles that hold universally, such as Kant's. The code rejects "
          "a universal answer."),
    ],
    kort="<p><b>Ethical relativism.</b> The code makes right and wrong depend on the local context instead of on "
         "universal principles.</p>",
    full="<p><b>The first split.</b> Lecture 2 starts by asking whether morality is universal. Ethical absolutism "
         "says there are eternal, universally applicable moral principles. Ethical relativism says morality is "
         "context-dependent and subjective. Only after this split do the absolutist theories divide into "
         "consequentialist (egoism, utilitarianism) and non-consequentialist (duty, rights and justice).</p>"
         "<p><b>Here.</b> The code says the same gift is wrong in one country and acceptable in another, because "
         "local custom decides. That is relativism.</p>"
         "<p><b>The usual confusion.</b> Treating consequentialism as an alternative to absolutism. In the lecture's "
         "map, both consequentialist and non-consequentialist theories sit inside absolutism: a utilitarian applies "
         "the same welfare test everywhere.</p>"
         "<p><b>Remember:</b> one standard everywhere is absolutism; «it depends on the context» is "
         "relativism.</p>",
)

statisk(
    "eti-s08", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about how consequentialist and non-consequentialist theories can reach different verdicts on one act.",
        ABS,
        "<p><b>Step 1: apply the utilitarian test.</b> Add up the benefits and harms for everyone affected.</p>"
        "<p><b>Step 2: apply Kant's test.</b> Could the rule behind the act hold as a universal law, whatever the "
        "outcome?</p>",
    ),
    q="<p>A drug company could get a vaccine approved months sooner if it did not tell a small group of trial "
      "participants about a known side effect. Approval months sooner would save many lives in total.</p>"
      "<p>Which pair of verdicts fits the two main absolutist traditions?</p>",
    alternativer=[
        R("A utilitarian could approve it; a Kantian would reject it"),
        F("A Kantian could approve it; a utilitarian would reject it",
          "Kant does not judge by the lives saved. And saving many lives is exactly what a utilitarian counts."),
        F("Both would approve it, since many lives are saved",
          "Lives saved are an outcome. Only one of the two traditions judges by outcomes."),
        F("Both would reject it, since the outcome is uncertain",
          "The Kantian verdict does not depend on how certain the outcome is."),
    ],
    kort="<p><b>A utilitarian could approve; a Kantian would reject.</b> One adds up the lives saved; the other asks "
         "whether «deceive participants when it pays» could be a universal law.</p>",
    full="<p><b>Outcomes or principles.</b> Consequentialist theories judge an act by its results. Utilitarianism "
         "looks for the best total outcome for all affected. Non-consequentialist theories judge the principle behind "
         "the act. Kant's categorical imperative says: act only on rules that could become universal law.</p>"
         "<p><b>Here.</b> A utilitarian adds the many lives saved and sets them against the harm to the deceived "
         "participants. If the total is positive, the act can pass. A Kantian asks whether «firms may deceive trial "
         "participants when it saves time» could hold for every firm. It could not, so the act is wrong whatever the "
         "outcome.</p>"
         "<p><b>The usual confusion.</b> Expecting every theory to agree. The lecture's Tesla case shows the same "
         "split: one act can pass one test and fail the other.</p>"
         "<p><b>Remember:</b> the utilitarian counts outcomes; Kant tests the rule.</p>",
)

# ---------------------------------------------------------------------------
# Deskriptive teorier: Schwartz og Rest/Jones
# ---------------------------------------------------------------------------
statisk(
    "eti-s09", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about Schwartz's two descriptive perspectives on how ethical decisions are made.",
        "Rationalist perspective: a logical reasoning approach, like a calculation, comes before the ethical "
        "judgement. Intuitionist or sentimentalist perspective: intuition, emotion and especially quick moral "
        "intuitions play the central role.",
        "<p><b>Step 1: what came first for her, the reaction or the reasoning?</b></p>"
        "<p><b>Step 2: what role do the later reasons play?</b> Did they produce the judgement or follow it? "
        "Classify by what drove the judgement.</p>",
    ),
    q="<p>A compliance officer reviews a proposed deal. Before doing any analysis, she has an immediate gut reaction "
      "that something is wrong. Only afterwards does she look for reasons to support it.</p>"
      "<p>Which of Schwartz's (2016) perspectives describes how she reached her judgement?</p>",
    alternativer=[
        R("The intuitionist perspective, in which quick moral intuitions come first"),
        F("The rationalist perspective, in which reasoning like a calculation comes first",
          "Her judgement came before any analysis. The reasoning followed it."),
        F("The rationalist perspective, since she ends up with reasons for her view",
          "Having reasons afterwards does not make the process rationalist. The order matters."),
        F("Neither, since descriptive theories cover only individual factors",
          "Descriptive theories explain how decisions are actually made, including the role of intuition."),
    ],
    kort="<p><b>The intuitionist perspective.</b> Her quick gut reaction produced the judgement; the reasons came "
         "after.</p>",
    full="<p><b>Descriptive, not normative.</b> Descriptive theories explain how ethical decisions are actually made. "
         "Schwartz (2016) contrasts two perspectives. The rationalist perspective, the common assumption, sees "
         "decision making as logical reasoning, like a calculation, before a judgement. The intuitionist or "
         "sentimentalist perspective stresses intuition, emotion and above all quick moral intuitions.</p>"
         "<p><b>Here.</b> The officer feels that something is wrong before she analyses anything. The reasons she "
         "finds later support a judgement she had already made. That is the intuitionist account.</p>"
         "<p><b>The usual confusion.</b> Calling the process rationalist because reasons appear at some point. What "
         "matters is what drives the judgement. Postmodern ethics also speaks of an inner moral impulse, but it is a "
         "normative theory about what is right, not a description of the process.</p>"
         "<p><b>Remember:</b> calculation first is rationalist; intuition first is intuitionist.</p>",
)

statisk(
    "eti-s10", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the four-stage model of ethical decision-making and where a person can fail.",
        REST,
        "<p><b>Step 1: did he see the issue as a moral one at all?</b> Read what he said afterwards.</p>"
        "<p><b>Step 2: if a stage failed, the later stages never started.</b> Find the first one that failed.</p>",
    ),
    q="<p>A loan officer approves mortgages for clients who clearly cannot afford them. Asked later, he says he never "
      "thought of it as an ethical question: «It was just about hitting my targets.»</p>"
      "<p>At which stage of the Rest and Jones model did his decision-making break down?</p>",
    alternativer=[
        R("Recognising the moral issue"),
        F("Making a moral judgement",
          "A judgement requires first seeing a moral question. He says he never saw one."),
        F("Establishing moral intent",
          "Intent comes after a judgement that something is right or wrong. He never got that far."),
        F("Engaging in moral behaviour",
          "This stage fails when someone intends to act but does not follow through. He had no such "
          "intention."),
    ],
    kort="<p><b>Recognising the moral issue.</b> He never saw the loans as an ethical question, so the later stages "
         "never started.</p>",
    full="<p><b>The model.</b> The course's framework (Crane et al., based on Rest and Jones) has four stages: "
         "recognise the moral issue, make a moral judgement, establish moral intent and engage in moral behaviour. "
         "Individual and situational factors act on every stage. A person can fail at any link.</p>"
         "<p><b>Here.</b> The officer says he never thought of the loans as an ethical question. He saw only targets. "
         "The process failed at the first stage, so there was no judgement, intent or behaviour to fail later.</p>"
         "<p><b>Why it happens.</b> Situational factors such as rewards (his targets) can frame an issue as purely "
         "commercial. Low moral intensity and moral muteness work the same way.</p>"
         "<p><b>The usual confusion.</b> Assuming that a bad act shows a bad judgement. Many failures happen earlier: "
         "the person never sees the moral side.</p>"
         "<p><b>Remember:</b> recognise, judge, intend, act. Find the first stage that failed.</p>",
)

statisk(
    "eti-s11", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the four-stage model of ethical decision-making and where a person can fail.",
        REST,
        "<p><b>Step 1: did she see the issue?</b> <b>Did she judge it?</b> Tick off the stages she passed.</p>"
        "<p><b>Step 2: what did she decide to do after judging?</b> Separate deciding to act from failing to act on "
        "a decision.</p>",
    ),
    q="<p>An auditor concludes that a client's early booking of revenue is wrong. She then decides that objecting is "
      "not worth the risk to her promotion and signs off the accounts.</p>"
      "<p>At which stage of the Rest and Jones model did her decision-making break down?</p>",
    alternativer=[
        R("Establishing moral intent"),
        F("Recognising the moral issue",
          "She saw the problem: she concluded the booking was wrong."),
        F("Making a moral judgement",
          "She judged correctly that the booking was wrong."),
        F("Engaging in moral behaviour",
          "This stage fails when someone intends to act and then does not. She never formed the intention to "
          "object."),
    ],
    kort="<p><b>Establishing moral intent.</b> She judged correctly but chose her promotion over acting on the "
         "judgement.</p>",
    full="<p><b>The model.</b> Recognise the moral issue, make a moral judgement, establish moral intent, engage in "
         "moral behaviour. Each stage can fail even when the earlier ones succeed.</p>"
         "<p><b>Here.</b> The auditor recognised the issue and judged the booking wrong. The break came next: she "
         "decided not to object because it might cost her a promotion. A competing interest won over the moral "
         "judgement, so no moral intent was formed.</p>"
         "<p><b>The usual confusion.</b> The intent and behaviour stages are easy to mix up. Behaviour fails when "
         "someone intends to act but does not follow through, like a risk manager who decides to speak at a meeting "
         "and then stays silent. The auditor never intended to object.</p>"
         "<p><b>Which factors.</b> Rewards and authority are situational factors with strong evidence behind them. "
         "They act here on the intent stage.</p>"
         "<p><b>Remember:</b> judging right but deciding not to act is a failure of intent.</p>",
)

statisk(
    "eti-s12", tema="etikk", type="begrep",
    hjelp=hjelp3(
        "This is about the order of the stages in the course's framework for ethical decision-making.",
        "The four stages, listed here out of order: establish moral intent, engage in moral behaviour, make a moral "
        "judgement, recognise the moral issue. Each stage builds on the one before it.",
        "<p><b>Step 1: what must happen before anyone can judge?</b> You cannot judge an issue you have not "
        "seen.</p>"
        "<p><b>Step 2: what links a judgement to an act?</b> Something must stand between knowing what is right and "
        "doing it.</p>",
    ),
    q="<p>Which sequence matches the four stages of the ethical decision-making framework in Crane et al. (2019), based "
      "on Rest (1986) and Jones (1991)?</p>",
    alternativer=[
        R("Recognise the issue, make a judgement, establish intent, engage in behaviour"),
        F("Make a judgement, recognise the issue, establish intent, engage in behaviour",
          "A judgement needs an issue to judge. The first two stages are swapped."),
        F("Recognise the issue, establish intent, make a judgement, engage in behaviour",
          "Intent to act follows a judgement about what is right. The middle two stages are swapped."),
        F("Establish intent, recognise the issue, make a judgement, engage in behaviour",
          "Intent cannot come before the issue has been seen and judged."),
    ],
    kort="<p><b>Recognise, judge, intend, act.</b> Each stage builds on the one before. Each can fail.</p>",
    full="<p><b>The framework.</b> The course's model of ethical decision-making (Crane et al. 2019, based on Rest "
         "1986 and Jones 1991) runs: recognise the moral issue, make a moral judgement, establish moral intent, engage "
         "in moral behaviour. Individual factors (such as personal values or cognitive moral development) and "
         "situational factors (such as moral intensity, rewards or culture) act on every stage.</p>"
         "<p><b>Why the order matters.</b> It tells you where a decision broke down. Someone who never saw the moral "
         "side failed at recognition. Someone who saw it and judged it wrong but chose not to act failed at intent. "
         "Someone who meant to act but did not failed at behaviour.</p>"
         "<p><b>A caveat from the lecture.</b> The model is a relatively simple way to present a complex process, not "
         "a definitive account. The stages are related and interdependent.</p>"
         "<p><b>Remember:</b> recognise, judge, intend, act.</p>",
)

# ---------------------------------------------------------------------------
# Individuelle og situasjonsbestemte faktorer
# ---------------------------------------------------------------------------
statisk(
    "eti-s13", tema="etikk", type="fakta",
    hjelp=hjelp3(
        "This is about the evidence Crane et al. summarise on individual factors in ethical decision-making.",
        "Individual factors in lecture 2: age and gender, national and cultural characteristics, education and "
        "employment, cognitive moral development, locus of control, personal values, personal integrity and moral "
        "imagination. The evidence ranges from significant to mixed or untested.",
        "<p><b>Step 1: for each option, recall what the evidence says.</b> Significant, small, limited, mixed or "
        "untested?</p>"
        "<p><b>Step 2: pick the one the lecture's table calls significant with a positive relationship.</b></p>",
    ),
    q="<p>A researcher wants to predict managers' ethical decisions from a single individual factor. She wants the "
      "factor with the strongest support in the evidence summarised by Crane et al. (2019).</p>"
      "<p>Which should she choose?</p>",
    alternativer=[
        R("Personal values"),
        F("Age and gender",
          "The evidence on age and gender is very mixed, with unclear associations."),
        F("Moral imagination",
          "Moral imagination is a relatively new idea with potential but is largely untested."),
        F("Locus of control",
          "Locus of control has at most a limited effect on decisions, though it matters for how blame is "
          "apportioned."),
    ],
    kort="<p><b>Personal values.</b> Crane et al. find a significant influence, with empirical evidence of a positive "
         "relationship.</p>",
    full="<p><b>The evidence.</b> Lecture 2 shows Crane et al.'s (2019) table of individual factors. National and "
         "cultural characteristics and personal values have significant effects. Cognitive moral development has a "
         "small but significant effect. Personal integrity is likely significant but rarely included in models. "
         "Education and employment are somewhat unclear. Locus of control has at most a limited effect but can matter "
         "for blame. Age and gender give very mixed evidence. Moral imagination is new and largely untested.</p>"
         "<p><b>Here.</b> Among the options, only personal values has significant support.</p>"
         "<p><b>The usual confusion.</b> Assuming that demographic factors such as age or gender must predict ethics. "
         "The evidence on them is the weakest kind: mixed.</p>"
         "<p><b>Why it matters.</b> For a firm or an investor judging a management team, values and culture matter "
         "more than demographics.</p>"
         "<p><b>Remember:</b> values and culture are significant; age and gender are mixed; moral imagination is "
         "untested.</p>",
)

statisk(
    "eti-s14", tema="etikk", type="begrep",
    hjelp=hjelp3(
        "This is about sorting influences on ethical decisions into individual and situational factors, with the "
        "situational ones in two kinds.",
        "Individual factors are what the person brings. Situational factors are issue-related (moral intensity, moral "
        "framing) or context-related (rewards, authority, bureaucracy, work roles, organisational culture, national "
        "context).",
        "<p><b>Step 1: strike the factors that belong to the person.</b></p>"
        "<p><b>Step 2: of the rest, ask whether it belongs to the issue itself or to the setting around the "
        "decision.</b></p>",
    ),
    q="<p>In Crane et al.'s (2019) framework, which of these is a context-related situational factor?</p>",
    alternativer=[
        R("A bonus scheme in the firm that rewards sales volume"),
        F("The manager's locus of control",
          "Locus of control is how far a person believes she controls events in her life: an individual "
          "factor."),
        F("The manager's stage of cognitive moral development",
          "Cognitive moral development is something the person brings: an individual factor."),
        F("The moral intensity of the issue",
          "Moral intensity is situational, but it belongs to the issue itself, not to the setting."),
    ],
    kort="<p><b>The bonus scheme.</b> Rewards are part of the setting: a context-related situational factor, with "
         "strong evidence of influence.</p>",
    full="<p><b>Two kinds of factor.</b> Crane et al. (2019) split influences into individual factors, which the "
         "person brings (values, integrity, cognitive moral development, locus of control) and situational factors. "
         "The situational ones are issue-related, belonging to the problem itself (moral intensity, moral framing), "
         "or context-related, belonging to the setting (rewards, authority, bureaucracy, work roles, organisational "
         "culture, national context).</p>"
         "<p><b>Here.</b> A bonus scheme is part of the setting the manager works in. It is a reward, so it is a "
         "context-related situational factor. The lecture notes strong evidence for rewards, authority and "
         "organisational culture.</p>"
         "<p><b>The usual confusion.</b> Calling moral intensity an individual factor, or lumping all situational "
         "factors together. Intensity is situational but issue-related; a bonus is situational but "
         "context-related.</p>"
         "<p><b>Remember:</b> the person (individual), the issue (issue-related) or the setting "
         "(context-related).</p>",
)

statisk(
    "eti-s15", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about issue-related situational factors: why the same people react differently to the same act.",
        "Issue-related factors: moral intensity (how much harm, how likely, how soon, how close, how concentrated, "
        "how widely agreed) and moral framing (how the issue is described; moral language is more likely to trigger "
        "moral thinking).",
        "<p><b>Step 1: what stays the same between the two meetings?</b> The people, the plan and its effects.</p>"
        "<p><b>Step 2: what changes?</b> Name the factor that covers only that change. Check that the "
        "other options would need something else to change too.</p>",
    ),
    q="<p>A bank's tax team discusses the same plan to shift profits to a low-tax country in two meetings. In the "
      "first, the plan is presented as «tax optimisation» and nobody objects. In the second, with the same people "
      "present, one of them calls it «dodging tax» and several others raise concerns. The plan and its effects are "
      "unchanged.</p>"
      "<p>Which factor best explains the change?</p>",
    alternativer=[
        R("Moral framing"),
        F("Moral intensity",
          "The plan and its effects are unchanged, so the harm, its likelihood and who bears it are the same."),
        F("Personal values",
          "The same team sits in both meetings. Their values did not change between them."),
        F("Locus of control",
          "Nothing in the case concerns how far the team members believe they control events."),
    ],
    kort="<p><b>Moral framing.</b> The same act described in moral language («dodging tax») triggers moral thinking "
         "that «tax optimisation» did not.</p>",
    full="<p><b>The factor.</b> Moral framing is an issue-related situational factor. The same problem can be "
         "perceived very differently depending on how it is framed. Language matters: moral language is more likely "
         "to trigger moral thinking. The lecture's own example is «tax optimisation» against «dodging tax».</p>"
         "<p><b>Here.</b> Nothing changes except the words. The team's values, the plan and its effects are the "
         "same. Once the plan is described in moral terms, people start to see a moral issue.</p>"
         "<p><b>The usual confusion.</b> Moral intensity also belongs to the issue, but it is about the issue's real "
         "features: how much harm, how likely, how soon, how close. Framing is about how the issue is described.</p>"
         "<p><b>The flip side.</b> Moral muteness (Bird and Waters 1989) is managers avoiding moral language "
         "altogether, which keeps issues from being seen as moral.</p>"
         "<p><b>Remember:</b> same act, new words, new reaction: moral framing.</p>",
)

statisk(
    "eti-s16", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about placing a person's reasoning on Kohlberg's ladder of cognitive moral development.",
        KOHL,
        "<p><b>Step 1: whose expectations does the manager follow?</b> His own interest, his immediate peers, "
        "society at large, or principles beyond any group?</p>"
        "<p><b>Step 2: match that to a stage.</b> Check the level first, then the stage within it.</p>",
    ),
    q="<p>A branch manager says: «Customers, the media and society at large now expect banks to stop dirty money. So I "
      "run checks that go beyond what my colleagues bother with.»</p>"
      "<p>Which stage of cognitive moral development does his reasoning reflect?</p>",
    alternativer=[
        R("Stage 4: social accord and system maintenance"),
        F("Stage 3: interpersonal accord and conformity",
          "Stage 3 follows what immediate peers expect. He goes beyond his colleagues."),
        F("Stage 5: social contract and individual rights",
          "Stage 5 goes beyond others' expectations to basic rights and contracts. He follows what society "
          "expects."),
        F("Stage 2: instrumental purpose and exchange",
          "Stage 2 is about one's own interests and fair deals. He mentions no gain for himself."),
    ],
    kort="<p><b>Stage 4.</b> He follows what society more broadly expects, not just his immediate peers: social accord "
         "and system maintenance, at the conventional level.</p>",
    full="<p><b>The ladder.</b> Kohlberg's cognitive moral development has three levels of two stages. What changes is "
         "what defines right. At the pre-conventional level it is rewards and punishment (stages 1 and 2). At the "
         "conventional level it is others' expectations: first immediate peers (stage 3), then society more broadly "
         "(stage 4). At the post-conventional level it is principles: basic rights and contracts (stage 5), then "
         "self-chosen universal principles (stage 6).</p>"
         "<p><b>Here.</b> The manager points to customers, the media and society at large. He goes further than "
         "his colleagues. His standard is the wider society's expectations. That is stage 4.</p>"
         "<p><b>The usual confusion.</b> Stage 3 against stage 4: both follow expectations, but stage 3 looks to the "
         "people around you and stage 4 to society in general. Stage 5 would go beyond what anyone expects, to "
         "rights.</p>"
         "<p><b>Remember:</b> peers is stage 3; society at large is stage 4.</p>",
)

statisk(
    "eti-s17", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the levels of Kohlberg's cognitive moral development and what defines right at each level.",
        KOHL,
        "<p><b>Step 1: list what the engineer does not rely on.</b> Law, colleagues, customers.</p>"
        "<p><b>Step 2: what does she rely on instead?</b> Match that source of «right» to a level: rewards, "
        "expectations or principles.</p>",
    ),
    q="<p>An engineer refuses to approve a product design that would disadvantage a minority group. The design is "
      "legal, her colleagues support it and customers would not object. She says she follows principles of justice "
      "and equality that she believes everyone should live by.</p>"
      "<p>At which level of cognitive moral development is her reasoning?</p>",
    alternativer=[
        R("Post-conventional: right is defined by principles"),
        F("Conventional: right is what society at large expects",
          "The law and the customers would accept the design. She goes against what society expects."),
        F("Pre-conventional: right is what avoids punishment",
          "She mentions no reward or punishment. Her reason is a principle."),
        F("Conventional: right is what one's immediate peers expect",
          "Her colleagues support the design and she refuses anyway."),
    ],
    kort="<p><b>Post-conventional.</b> She sets aside law, peers and customers and acts on principles of justice and "
         "equality she holds for everyone.</p>",
    full="<p><b>What the levels measure.</b> Kohlberg's levels differ in what defines right. Pre-conventional: rewards "
         "and punishment. Conventional: the expectations of peers (stage 3) and of society (stage 4). "
         "Post-conventional: principles, either the basic rights and contracts of society (stage 5) or self-chosen "
         "universal ethical principles such as justice and equality (stage 6).</p>"
         "<p><b>Here.</b> Nobody around the engineer expects her to refuse: the design is legal, colleagues back it and "
         "customers would not mind. She refuses because of principles of justice and equality that she thinks "
         "everyone should follow. That is post-conventional reasoning, in its description close to stage 6.</p>"
         "<p><b>The usual confusion.</b> Equating «doing the right thing» with the conventional level. Conventional "
         "people do what others expect. Going against everyone's expectations for a principle is the mark of the top "
         "level.</p>"
         "<p><b>Remember:</b> rewards, then expectations, then principles.</p>",
)

statisk(
    "eti-s18", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about placing a person's reasoning on Kohlberg's ladder of cognitive moral development.",
        KOHL,
        "<p><b>Step 1: what makes the deal right in his eyes?</b> A rule from authority, a fair exchange that serves "
        "him, what peers expect or a principle?</p>"
        "<p><b>Step 2: match that to a stage.</b></p>",
    ),
    q="<p>A procurement manager gives a contract to a supplier who has promised to steer business his way in return. "
      "«You help me, I help you. That is a fair deal,» he says.</p>"
      "<p>Which stage of cognitive moral development does his reasoning reflect?</p>",
    alternativer=[
        R("Stage 2: instrumental purpose and exchange"),
        F("Stage 1: obedience and punishment",
          "Stage 1 defines right by what authority rewards or punishes. He talks about a deal, not about "
          "authority."),
        F("Stage 3: interpersonal accord and conformity",
          "Stage 3 follows what immediate peers expect. He follows his own interest in a trade."),
        F("Stage 6: universal ethical principles",
          "Stage 6 acts on principles one believes everyone should follow. He is serving himself."),
    ],
    kort="<p><b>Stage 2.</b> Right is what serves his immediate interests through a fair exchange: «you help me, I "
         "help you».</p>",
    full="<p><b>The stage.</b> Stage 2, instrumental purpose and exchange, sits at the pre-conventional level. People "
         "are concerned with their own immediate interests and define right by whether there is fairness in the "
         "exchanges or deals they make to achieve them. The lecture's illustration is reciprocity of the «you scratch "
         "my back, I'll scratch yours» kind.</p>"
         "<p><b>Here.</b> The manager calls the arrangement fair because each side gets something. His standard is the "
         "deal that serves him, not a rule, the views of others or a principle.</p>"
         "<p><b>The usual confusion.</b> Stage 1 is also pre-conventional, but there right is set by authority's "
         "rewards and punishments. Stage 2 adds the idea of a fair trade between equals.</p>"
         "<p><b>Remember:</b> «you help me, I help you» is stage 2; «I'd get caught» is stage 1.</p>",
)

statisk(
    "eti-s19", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about moral intensity: which feature of an issue makes it less likely to be seen as a moral one.",
        "Jones names six factors. Two concern the harm itself: how big it would be (magnitude of consequences) and "
        "how likely it is to occur at all. The others: social consensus, temporal immediacy, proximity and "
        "concentration of effect.",
        "<p><b>Step 1: go through the six factors.</b> Mark each as high, low or not mentioned.</p>"
        "<p><b>Step 2: which one does the case make low?</b> Be careful to separate how bad the harm is from how "
        "likely it is.</p>",
    ),
    q="<p>A drug has a rare side effect that can be severe. The chance that any given patient is affected is extremely "
      "small. The company's managers do not see marketing the drug as raising a moral question.</p>"
      "<p>Which moral intensity factor is low here?</p>",
    alternativer=[
        R("Probability of effect"),
        F("Magnitude of consequences",
          "The side effect can be severe, so the size of the harm is high."),
        F("Temporal immediacy",
          "The case says nothing about how soon the harm would occur."),
        F("Social consensus",
          "The case says nothing about how widely people agree it is wrong."),
    ],
    kort="<p><b>Probability of effect.</b> The harm is severe but very unlikely, which lowers moral intensity and makes "
         "the issue easier to overlook.</p>",
    full="<p><b>Moral intensity.</b> Jones (1991) proposes that the intensity of a moral issue varies with six "
         "factors: magnitude of consequences, social consensus, probability of effect, temporal immediacy, proximity "
         "and concentration of effect. The more intense the issue, the more likely people are to see it as moral and "
         "act on it.</p>"
         "<p><b>Here.</b> The harm would be serious, so magnitude is high. But the chance that it happens to any "
         "patient is tiny. Low probability pulls intensity down, which helps explain why managers do not see a moral "
         "question.</p>"
         "<p><b>The usual confusion.</b> Mixing magnitude and probability. Magnitude asks how bad the harm would be; "
         "probability asks how likely it is to happen at all.</p>"
         "<p><b>Why it matters.</b> Moral intensity is an issue-related situational factor. It works mostly on the "
         "first stage of the Rest model: recognising the issue.</p>"
         "<p><b>Remember:</b> how bad is magnitude; how likely is probability.</p>",
)

statisk(
    "eti-s20", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about moral intensity: which feature of an issue makes managers react strongly in one place and "
        "weakly in another.",
        JONES,
        "<p><b>Step 1: what is the same in the two places?</b> The kind of harm and who suffers it.</p>"
        "<p><b>Step 2: what differs?</b> Name the factor that captures only that difference.</p>",
    ),
    q="<p>A clothing retailer's managers react strongly when they find unsafe conditions in their own warehouse. They pay "
      "little attention to similar conditions at a supplier's factory on another continent.</p>"
      "<p>Which moral intensity factor best explains the difference?</p>",
    alternativer=[
        R("Proximity"),
        F("Magnitude of consequences",
          "The conditions are similar in both places, so the size of the harm is about the same."),
        F("Concentration of effect",
          "In both places the harm falls on a group of identifiable workers."),
        F("Social consensus",
          "People agree as widely that unsafe conditions are wrong in both places."),
    ],
    kort="<p><b>Proximity.</b> The warehouse workers are close to the managers; the supplier's workers are far away, so "
         "the same harm feels less intense.</p>",
    full="<p><b>The factor.</b> Proximity asks how close the people affected are to the decision maker. Closeness can "
         "be physical, social, cultural or psychological. The closer they are, the more intense the issue feels and "
         "the more likely it is to be treated as a moral one.</p>"
         "<p><b>Here.</b> The harm is similar in both places. What differs is distance: the managers see their own "
         "warehouse every day, while the supplier's factory is on another continent. Low proximity lowers the "
         "intensity of the distant case.</p>"
         "<p><b>The usual confusion.</b> Concentration of effect asks whether harm falls heavily on a few or thinly on "
         "many. In both places it falls on a group of identifiable workers, so concentration does not separate them.</p>"
         "<p><b>Why it matters.</b> Low proximity is one reason climate harm feels morally weak: those affected are "
         "distant.</p>"
         "<p><b>Remember:</b> far away feels less moral: low proximity.</p>",
)

statisk(
    "eti-s21", tema="etikk", type="paastand",
    hjelp=hjelp3(
        "This is about linking moral intensity to the four-stage model of ethical decision-making.",
        JONES + " " + REST,
        "<p><b>Step 1: which stage needs an issue to feel moral before anything else can happen?</b></p>"
        "<p><b>Step 2: check each statement's account of intensity.</b> Is intensity about the person or the issue? "
        "Is low intensity the same as small harm?</p>",
    ),
    q="<p>Lecture 2 suggests that low moral intensity helps explain why negative externalities such as emissions "
      "persist even among well-meaning managers. Which statement captures the reasoning?</p>",
    alternativer=[
        R("Low-intensity issues are less likely to be recognised as moral issues in the first place"),
        F("Low intensity lets managers judge correctly but makes them lose the intent to act",
          "Intensity works first on whether the issue is seen as moral at all, before any judgement is made."),
        F("Low intensity is an individual factor that well-meaning managers happen to lack",
          "Moral intensity belongs to the issue: it is a situational, issue-related factor."),
        F("Low intensity means the harm is small, so ignoring the emissions is in fact right",
          "Low intensity can come from distance, delay or spread, even when total harm is large."),
    ],
    kort="<p><b>They are less likely to be recognised as moral.</b> Emissions score low on immediacy, proximity and "
         "concentration, so the first stage of the Rest model often fails.</p>",
    full="<p><b>The mechanism.</b> One firm's emissions score low on temporal immediacy (harm decades away), "
         "proximity (distant people) and concentration of effect (spread thinly over millions). The link to any "
         "specific harm is uncertain too. Low intensity means the issue is less likely to be recognised as moral at "
         "all, which is the first stage of the Rest and Jones model.</p>"
         "<p><b>Why it matters.</b> If the first stage fails, good values never get the chance to act: there is no "
         "judgement, intent or behaviour to follow. That is one reason externalities (lecture 3) persist even among "
         "managers who mean well.</p>"
         "<p><b>The usual confusion.</b> Reading low intensity as low harm. Total climate harm can be very large; it "
         "only feels weak because it is distant, delayed and spread out. Another confusion is calling intensity an "
         "individual factor; it describes the issue.</p>"
         "<p><b>Remember:</b> low intensity hits the first stage: the issue is not seen as moral.</p>",
)

# ---------------------------------------------------------------------------
# Moral muteness og rasjonaliseringstaktikker
# ---------------------------------------------------------------------------
TAKT_KORT = ("Six tactics. Responsibility: «I had no choice». Injury: «no one was really harmed». Victim: «they deserved it» "
             "or «they chose it». Social weighting: condemn the critics or say others are worse. Higher loyalties: a "
             "higher-order value. Ledger: credits earned by past effort.")

statisk(
    "eti-s22", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about why managers often keep quiet about the moral side of a decision.",
        "Moral language is more likely to trigger moral thinking. Bird and Waters describe why managers often avoid "
        "it: they see moral talk as a threat to harmony, to efficiency and to their image of power and "
        "effectiveness.",
        "<p><b>Step 1: do the managers see the moral issue?</b> Read what they think privately.</p>"
        "<p><b>Step 2: what do they do with it in the meeting? Why?</b> Compare their reasons with the ones in "
        "the rule.</p>",
    ),
    q="<p>At a planning meeting, managers discuss cutting safety inspections only in terms of «efficiency gains». "
      "Several privately think the cut is wrong but say nothing in moral terms. They fear they would sound preachy, "
      "slow the meeting down and look weak.</p>"
      "<p>Which concept from lecture 2 describes this?</p>",
    alternativer=[
        R("Moral muteness"),
        F("Denial of injury",
          "Nobody claims the cut harms no one. Several managers privately think it is wrong."),
        F("Moral imagination",
          "Moral imagination is a sense of the possibilities and moral consequences of decisions. The problem here "
          "is silence, not a lack of insight."),
        F("Social weighting",
          "Nobody condemns critics or compares the firm with worse rivals."),
    ],
    kort="<p><b>Moral muteness.</b> The managers see the issue but avoid moral language, fearing for harmony, "
         "efficiency and their image of power (Bird and Waters 1989).</p>",
    full="<p><b>The concept.</b> Moral framing says the way an issue is described shapes whether it is seen as moral; "
         "moral language triggers moral thinking. Moral muteness (Bird and Waters 1989; the foil spells it «Walters») "
         "is managers avoiding moral talk. They see it as a threat to harmony, to efficiency and to their image of "
         "power and effectiveness.</p>"
         "<p><b>Here.</b> The managers privately see a moral problem. In the meeting they use only the language of "
         "efficiency and keep their concerns to themselves, for exactly the three reasons Bird and Waters give.</p>"
         "<p><b>Why it matters.</b> When nobody names the moral side, others may never recognise it, the first stage "
         "of the Rest model. Muteness spreads the failure.</p>"
         "<p><b>The usual confusion.</b> Thinking muteness means not noticing the issue. Not noticing is a failure of "
         "recognition. Muteness is about talk: the issue is seen but not voiced.</p>"
         "<p><b>Remember:</b> moral muteness is seeing it but not saying it.</p>",
)

statisk(
    "eti-s23", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the rationalisation tactic in a quote.",
        TAKT_KORT,
        "<p><b>Step 1: what does the banker point to in order to excuse himself?</b> The victim, the harm, someone "
        "else, a higher cause or his own record?</p>"
        "<p><b>Step 2: match that to the tactic.</b></p>",
    ),
    q="<p>A senior banker books private dinners as client entertainment. Challenged, he says: «After all the unpaid "
      "evenings and weekends I've given this bank, I'm owed a little slack.»</p>"
      "<p>Which rationalisation tactic is he using?</p>",
    alternativer=[
        R("Metaphor of the ledger"),
        F("Denial of injury",
          "He does not claim that nobody is harmed. He claims he has earned the right."),
        F("Appeal to higher loyalties",
          "He serves no higher cause or group. He serves himself."),
        F("Social weighting",
          "He does not attack his critics or compare himself with worse colleagues."),
    ],
    kort="<p><b>Metaphor of the ledger.</b> He argues that past effort has earned him credit he can now spend on "
         "deviant behaviour.</p>",
    full="<p><b>The tactic.</b> Rationalisation tactics redescribe an act so it no longer looks wrong (Crane et al. "
         "2019). In the metaphor of the ledger, people argue that they are entitled to deviant behaviour because of "
         "credits they have built up, in time and effort, in their jobs. The lecture's example: using the internet "
         "for personal reasons at work is fine «after all, I do overtime».</p>"
         "<p><b>Here.</b> The banker sets his unpaid evenings against the private dinners, as if on a balance sheet. "
         "That is the ledger.</p>"
         "<p><b>The usual confusion.</b> Denial of injury would say nobody is hurt by a few dinners. Appeal to higher "
         "loyalties would claim the act served a group or a higher value. He claims neither; he claims he is owed.</p>"
         "<p><b>Why it matters.</b> Tactics like these let people act against their own judgement without feeling "
         "guilty, which is why the lecture places them under moral framing.</p>"
         "<p><b>Remember:</b> «I've earned it» is the metaphor of the ledger.</p>",
)

statisk(
    "eti-s24", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the rationalisation tactic in a quote.",
        TAKT_KORT,
        "<p><b>Step 1: does the manager deny the harm?</b> Read the case carefully: the leak is real and he does "
        "not dispute it.</p>"
        "<p><b>Step 2: whom does he point to instead?</b> Match that move to the tactic.</p>",
    ),
    q="<p>A plant manager whose site keeps leaking solvent into a stream says: «I asked for new seals three times and "
      "was turned down every time. What can I do? I have no say over the budget.»</p>"
      "<p>Which rationalisation tactic is he using?</p>",
    alternativer=[
        R("Denial of responsibility"),
        F("Denial of injury",
          "He does not say the leak harms no one."),
        F("Denial of victim",
          "He does not say those affected deserved it or chose it."),
        F("Metaphor of the ledger",
          "He does not claim past effort entitles him to anything."),
    ],
    kort="<p><b>Denial of responsibility.</b> He presents himself as having no other choice: the decision lies with "
         "others.</p>",
    full="<p><b>The tactic.</b> In denial of responsibility, people see themselves as having no other choice than to "
         "take part in the wrongdoing. The lecture's examples: «What can I do? My arm is being twisted» and «It is "
         "none of my business what the corporation does».</p>"
         "<p><b>Here.</b> The manager admits the leak but shifts the blame to those who control the budget. «What can I "
         "do?» is the signature of the tactic.</p>"
         "<p><b>The usual confusion.</b> Each denial targets something different. Denial of injury targets the harm "
         "(«no one was really harmed»). Denial of victim targets the harmed party («they deserved it» or «they chose "
         "to participate»). Denial of responsibility targets the actor: «it was not up to me».</p>"
         "<p><b>A caution.</b> His requests may well be real. The tactic is not in the facts but in using them to "
         "close the moral question while the leak goes on.</p>"
         "<p><b>Remember:</b> «I had no choice» is denial of responsibility.</p>",
)

statisk(
    "eti-s25", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the rationalisation tactic in a quote.",
        TAKT_KORT,
        "<p><b>Step 1: what reason does the director give for hiding the results?</b> Himself, the victims, his "
        "critics or someone he is loyal to?</p>"
        "<p><b>Step 2: match that to the tactic.</b></p>",
    ),
    q="<p>A sales director hides test results showing a product defect from a regulator. «If this comes out, three "
      "hundred colleagues could lose their jobs,» she says. «My loyalty is to them.»</p>"
      "<p>Which rationalisation tactic is she using?</p>",
    alternativer=[
        R("Appeal to higher loyalties"),
        F("Denial of responsibility",
          "She does not say she had no choice or that others decided."),
        F("Social weighting",
          "She does not attack the regulator or compare the firm with worse rivals."),
        F("Denial of injury",
          "She does not claim the defect harms no one."),
    ],
    kort="<p><b>Appeal to higher loyalties.</b> She justifies breaking a norm by a higher-order value: loyalty to her "
         "colleagues.</p>",
    full="<p><b>The tactic.</b> In an appeal to higher loyalties, people argue that their violation of norms is due to "
         "their attempt to realise a higher-order value. The lecture's examples: «We answered to a more important "
         "cause» and «I would not report it because of my loyalty to my boss».</p>"
         "<p><b>Here.</b> The director admits hiding the results but presents it as loyalty to three hundred "
         "colleagues. The loyalty is offered as the reason the act is acceptable.</p>"
         "<p><b>The usual confusion.</b> Ethics of care also gives weight to close relationships, so the quote can "
         "sound like a normative argument. The question asks which rationalisation she uses to excuse a violation. "
         "That is the appeal to higher loyalties. Social weighting is different: it condemns the condemner or "
         "points to others who are worse.</p>"
         "<p><b>Remember:</b> «I did it for the team» or «for a greater cause» is an appeal to higher loyalties.</p>",
)

statisk(
    "eti-s26", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about naming the rationalisation tactic in a quote.",
        TAKT_KORT,
        "<p><b>Step 1: does the landlord deny that the tenants are harmed?</b> Check whether he disputes the "
        "complaints themselves.</p>"
        "<p><b>Step 2: what does he say about the tenants themselves?</b> Match that to the tactic.</p>",
    ),
    q="<p>A landlord rents out flats with damp and mould. Asked about tenants' health complaints, he says: «They viewed "
      "the flats before signing. They chose to live there.»</p>"
      "<p>Which rationalisation tactic is he using?</p>",
    alternativer=[
        R("Denial of victim"),
        F("Denial of injury",
          "He does not claim the mould harms no one. He says the tenants accepted it."),
        F("Denial of responsibility",
          "He does not say he had no choice or that someone else decided."),
        F("Social weighting",
          "He does not attack the critics or say other landlords are worse."),
    ],
    kort="<p><b>Denial of victim.</b> He does not deny the harm; he says the tenants chose it, so they have no claim "
         "on him.</p>",
    full="<p><b>The tactic.</b> In denial of victim, people counter blame by arguing that the violated party deserved "
         "whatever happened or chose to participate. The lecture's examples: «They deserved it» and «They chose to "
         "participate».</p>"
         "<p><b>Here.</b> The landlord accepts that the tenants suffer from the mould, but says they chose the flats "
         "with open eyes. The harm is real; the victim is recast as responsible.</p>"
         "<p><b>The usual confusion.</b> Denial of injury denies the harm itself: «No one was really harmed» or «It "
         "could have been worse». Here the harm is not denied. That is the line that separates the two.</p>"
         "<p><b>Why it works on the mind.</b> If the victims chose their fate, the act no longer feels like harming "
         "someone. That is how rationalisation removes the moral problem without changing the act.</p>"
         "<p><b>Remember:</b> «they chose it» or «they deserved it» is denial of victim; «nobody was hurt» is denial "
         "of injury.</p>",
)

# ---------------------------------------------------------------------------
# Bénabou og Tirole: tre syn på CSR
# ---------------------------------------------------------------------------
statisk(
    "eti-s27", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about Bénabou and Tirole's three economic views of CSR: whose values drive it and whose money pays.",
        BT,
        "<p><b>Step 1: why does the brewery do it?</b> Look at what management expects to get back.</p>"
        "<p><b>Step 2: would it continue if it stopped paying?</b> That tells you whether anyone's values are "
        "needed.</p>",
    ),
    q="<p>A brewery pays for water-saving equipment at the farms that supply its barley. Management expects lower input "
      "costs, a steadier supply and easier hiring of staff who want a responsible employer. It says it would drop the "
      "scheme if it stopped paying off.</p>"
      "<p>Which of Bénabou and Tirole's (2010) views of CSR fits best?</p>",
    alternativer=[
        R("Win-win: CSR that pays for itself in the long run"),
        F("Delegated philanthropy: CSR for stakeholders' values",
          "No customer, employee or shareholder asked the firm to act on their values. The scheme is meant to pay."),
        F("Insider-initiated philanthropy: CSR for managers' values",
          "Management is not spending owners' money on its own values; it expects a return."),
        F("Greenwashing: green claims without real change",
          "The brewery changes something real: it pays for equipment that saves water."),
    ],
    kort="<p><b>Win-win.</b> The scheme is expected to pay for itself through costs, supply and hiring. No ethical "
         "tension: it is long-run value maximisation.</p>",
    full="<p><b>Three views.</b> Bénabou and Tirole (2010) ask who wants the CSR and whose money pays. Win-win: CSR "
         "pays for itself through reputation, employee retention or lower risk, so the firm is simply maximising "
         "long-run value. Delegated philanthropy: stakeholders with prosocial preferences use the firm to act on "
         "their values. Insider-initiated corporate philanthropy: management spends other people's money on its own "
         "values, an agency problem.</p>"
         "<p><b>Here.</b> The brewery expects lower costs, steadier supply and better hiring. It would stop if the "
         "scheme did not pay. Nobody's values are needed to justify it. That is win-win.</p>"
         "<p><b>The usual confusion.</b> Assuming that anything good for the environment must be philanthropy. Win-win "
         "matches Starks' value motive; delegated philanthropy matches the values motive.</p>"
         "<p><b>Remember:</b> if it pays for itself, it is win-win.</p>",
)

statisk(
    "eti-s28", tema="etikk", type="paastand",
    hjelp=hjelp3(
        "This is about what separates Bénabou and Tirole's three views of CSR.",
        BT,
        "<p><b>Step 1: imagine the same donation under each view.</b> What changes from one view to the next?</p>"
        "<p><b>Step 2: strike the options that would be the same under all three views.</b></p>",
    ),
    q="<p>A firm donates to a reforestation charity. According to Bénabou and Tirole (2010), what determines which of "
      "their three views of CSR the donation reflects?</p>",
    alternativer=[
        R("Whose values drive it and who ends up paying for it"),
        F("How large the donation is relative to the firm's profit",
          "A donation of any size can fit any of the three views. The size does not separate them."),
        F("Whether the cause is environmental or social",
          "The three views apply to any cause. The topic does not separate them."),
        F("Whether the donation is disclosed in the firm's ESG report",
          "Disclosure says nothing about why the firm gives or who bears the cost."),
    ],
    kort="<p><b>Whose values and whose money.</b> The same donation is win-win if it pays, delegated if stakeholders "
         "want it and insider-initiated if only management wants it while shareholders pay.</p>",
    full="<p><b>The question behind the views.</b> Bénabou and Tirole (2010) classify CSR by who wants it and whose "
         "money pays for it. That makes the views about motives and incentives, not about the cause.</p>"
         "<p><b>One donation, three readings.</b> If the donation lifts the brand enough to pay for itself, it is "
         "win-win. If customers, employees or shareholders want the firm to give on their behalf, it is delegated "
         "philanthropy. If only the chief executive wants it and shareholders bear the cost, it is insider-initiated "
         "corporate philanthropy: spending other people's money, an agency problem.</p>"
         "<p><b>The usual confusion.</b> Classifying CSR by its topic or size. A small social donation and a large "
         "environmental one can both be any of the three.</p>"
         "<p><b>Where it returns.</b> The agency view returns in lectures 4 and 5 on shareholder and stakeholder "
         "theory.</p>"
         "<p><b>Remember:</b> ask who wants it and who pays.</p>",
)

statisk(
    "eti-s29", tema="etikk", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about how Bénabou and Tirole characterise their three views of CSR.",
        "The three views differ in whose values drive the CSR and whose money pays for it: the firm's own long-run "
        "profit, its stakeholders' prosocial preferences or management's own values.",
        "<p><b>Step 1: statement I.</b> Whose values does the firm act on under delegated philanthropy? Who "
        "asks it to?</p>"
        "<p><b>Step 2: statement II.</b> Under win-win, is anyone's values needed to justify the CSR?</p>",
    ),
    q="<p>Consider two statements about Bénabou and Tirole (2010).</p>"
      "<p>I. Under delegated philanthropy, the firm acts as an agent for the prosocial preferences of its customers, "
      "employees or shareholders.</p>"
      "<p>II. Under the win-win view, CSR is justified by managers' own values rather than by its effect on "
      "profit.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II gives win-win the wrong justification: under that view no one's values are needed."),
        F("Both I and II",
          "Statement II gives win-win the wrong justification: under that view no one's values are needed."),
        F("Neither I nor II",
          "Ask whose values a firm serves when its stakeholders use it to act on their preferences."),
    ],
    kort="<p><b>Only I.</b> Delegated philanthropy acts on stakeholders' values. Win-win needs no one's values: CSR pays "
         "for itself. CSR driven by managers' own values is insider-initiated philanthropy.</p>",
    full="<p><b>Statement I.</b> True. Under delegated philanthropy, stakeholders (customers, employees, shareholders) "
         "have prosocial preferences and use the firm as the vehicle to act on them. The firm is an agent for others' "
         "values. This matches Starks' values motive.</p>"
         "<p><b>Statement II.</b> False. Under the win-win view CSR pays for itself through reputation, employee "
         "retention or lower risk, so the firm is simply maximising long-run value. There is no ethical tension and "
         "no one's values are needed to justify it. CSR driven by managers' own values, paid for by shareholders, is "
         "the third view: insider-initiated corporate philanthropy, which the lecture calls an agency problem.</p>"
         "<p><b>The usual confusion.</b> Mixing up who wants the CSR. Ask two questions: whose values drive it and "
         "whose money pays.</p>"
         "<p><b>Remember:</b> win-win pays for itself, delegated serves stakeholders' values and insider-initiated "
         "serves managers' values.</p>",
)

# ---------------------------------------------------------------------------
# Telenor, moral imagination og normativ mot deskriptiv
# ---------------------------------------------------------------------------
statisk(
    "eti-s30", tema="etikk", type="fakta",
    hjelp=hjelp3(
        "This is about the Telenor case in lecture 2 and what it teaches about exit as an ethical choice.",
        "Exit ends a firm's own role, but the activity may continue under a new owner. Ask what happens to the "
        "people affected after the sale, not only to the seller.",
        "<p><b>Step 1: what did Telenor hand over with the business?</b> Think about the network and what it "
        "holds.</p>"
        "<p><b>Step 2: to whom?</b> Then ask whether the harm Telenor wanted to avoid ends with the sale.</p>",
    ),
    q="<p>Telenor entered Myanmar in 2014 with a mission to help build society. After the military coup in February "
      "2021 it said it could no longer operate in line with its values and sold its Myanmar business to a company "
      "closely linked to the junta.</p>"
      "<p>Why did critics call the exit «irresponsible disengagement»?</p>",
    alternativer=[
        R("The sale could hand the network and its user data to the junta's side, so the harm could go on"),
        F("Telenor broke a promise to its shareholders to stay in Myanmar for at least ten years",
          "No such promise appears in the case. The criticism concerns the people left behind, not the "
          "shareholders."),
        F("Kant's ethics of duty forbids any firm from ever leaving a country it has entered",
          "No normative theory in the lecture forbids exit as such. The criticism is about how and to whom Telenor "
          "left."),
        F("The price was too low, so Telenor's shareholders lost value on the sale",
          "The criticism concerns users' safety and data, not the price."),
    ],
    kort="<p><b>The harm could go on.</b> Telenor was accused of sharing user data with the junta and sold to a "
         "junta-linked buyer. Exit is not automatically responsible if the buyer continues the harm.</p>",
    full="<p><b>The case.</b> Telenor launched in Myanmar in 2014 and expanded fast: in 2012 fewer than one in ten "
         "people had a mobile phone. By 2021 the whole population had access. After the coup in February 2021 it "
         "faced surveillance pressure. In August 2021 it sold, saying it could not operate according to its values "
         "and international laws and standards.</p>"
         "<p><b>The criticism.</b> Telenor was accused of sharing sensitive user data with the junta after the coup "
         "and of selling to a company closely linked to it. Leaving ended Telenor's own role, but the network and its "
         "data could now serve the junta.</p>"
         "<p><b>The lesson.</b> Exit is not automatically responsible if the buyer continues the harm. The same logic "
         "returns in lecture 3: public firms that sell polluting assets to less monitored private owners get greener "
         "while total emissions need not fall.</p>"
         "<p><b>Remember:</b> judge an exit by what happens to those affected afterwards, not only by the seller's "
         "clean hands.</p>",
)

statisk(
    "eti-s31", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the individual factors that influence ethical decision-making, as Crane et al. list them.",
        "Individual factors include cognitive moral development, locus of control (how far you believe you control "
        "events), personal values, personal integrity and moral imagination (a sense of the possibilities and moral "
        "consequences of your decisions). Moral framing is situational.",
        "<p><b>Step 1: is the trait something the manager brings, or part of the issue or setting?</b></p>"
        "<p><b>Step 2: what exactly does she do before the launch?</b> Match that to a definition in the rule.</p>",
    ),
    q="<p>Before launching a lending app, a product manager maps out how different groups of users could be harmed by "
      "it and sketches other designs that would avoid those harms.</p>"
      "<p>Which individual factor in Crane et al.'s (2019) framework does this show?</p>",
    alternativer=[
        R("Moral imagination"),
        F("Locus of control",
          "Locus of control is how far a person believes she controls events in her life. The case is about "
          "foreseeing consequences and alternatives."),
        F("Moral framing",
          "Moral framing is how an issue is described, a situational factor. The question asks about something the "
          "manager brings."),
        F("Personal integrity",
          "Integrity shows most clearly in acting on one's principles, as in whistleblowing. She is foreseeing "
          "consequences and designing alternatives."),
    ],
    kort="<p><b>Moral imagination.</b> She has a sense of the possible consequences of her decision and of the "
         "alternatives open to her.</p>",
    full="<p><b>The factor.</b> Moral imagination is an individual factor in Crane et al. (2019): a sense of the "
         "variety of possibilities and moral consequences of one's decisions. The evidence on it is new: it has "
         "potential but is largely untested.</p>"
         "<p><b>Here.</b> The manager imagines how different users could be harmed and looks for designs that avoid "
         "the harm. That is moral imagination at work: seeing consequences and options that others might miss.</p>"
         "<p><b>The usual confusion.</b> Personal integrity is about acting on one's principles, shown most clearly in "
         "whistleblowing, which is protected for example by the Sarbanes-Oxley requirement of anonymous reporting "
         "channels. Moral framing is about how an issue is described and belongs to the situation, not the "
         "person.</p>"
         "<p><b>Why it matters.</b> Moral imagination helps at the first stage of the Rest model: you cannot recognise "
         "a harm you cannot imagine.</p>"
         "<p><b>Remember:</b> foreseeing consequences and alternatives is moral imagination.</p>",
)

statisk(
    "eti-s32", tema="etikk", type="tolkning",
    hjelp=hjelp3(
        "This is about the two broad kinds of ethical theory in lecture 2.",
        "Normative theories set out what is right: absolutist ones (consequentialist and non-consequentialist) and "
        "relativist ones. Descriptive theories explain how ethical decisions are actually made and what influences "
        "them.",
        "<p><b>Step 1: is the researcher asking what employees ought to do?</b></p>"
        "<p><b>Step 2: or is she asking what they actually do and why?</b> Match her question to the kind of "
        "theory.</p>",
    ),
    q="<p>A researcher surveys bank employees to find out how they actually decide whether to report misconduct and "
      "which factors push them one way or the other. She takes no position on whether reporting is right.</p>"
      "<p>Which kind of ethical theory is she working with?</p>",
    alternativer=[
        R("Descriptive theory"),
        F("Normative, absolutist theory",
          "Normative theories say what is right. She explicitly takes no position on that."),
        F("Normative, relativist theory",
          "Relativist theories still say what is right, only relative to context. She does not say what is right "
          "at all."),
        F("Consequentialist theory",
          "Consequentialism judges acts by their outcomes, a normative stance. She only describes how people "
          "decide."),
    ],
    kort="<p><b>Descriptive theory.</b> She explains how decisions are actually made and what influences them, "
         "without saying what is right.</p>",
    full="<p><b>Two kinds of theory.</b> Lecture 2 has two halves. Normative theories say what is morally right: "
         "absolutist theories (egoism, utilitarianism, duty, rights and justice) and relativist ones (virtue, care, "
         "discourse, postmodern). Descriptive theories explain how ethical decisions are actually made in business "
         "and which factors influence the process and its outcomes.</p>"
         "<p><b>Here.</b> The researcher studies how employees really decide and what pushes them. She takes no "
         "position on what they should do. That is descriptive work. Its tools are the Rest and Jones stages and the "
         "individual and situational factors.</p>"
         "<p><b>The usual confusion.</b> Relativism sounds descriptive because it says morality depends on context. "
         "But it is still a claim about what is right, so it is normative.</p>"
         "<p><b>Why it matters.</b> The lecture's opening questions about Tesla use both: was the decision right "
         "(normative) and what influenced it (descriptive)?</p>"
         "<p><b>Remember:</b> «what is right?» is normative; «how do people decide?» is descriptive.</p>",
)
