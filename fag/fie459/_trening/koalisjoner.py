# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: koalisjoner, myndigheter og overgangsstyring
   (tema «koalisjoner», forelesning 13).

   Statiske spørsmål coa-s01 … coa-s31:
     s01-s04  de seks motivene for å bli med i en koalisjon
     s05-s08  Dimson, Karakaş & Li (2015 og 2020): samarbeid, suksess, hvem leder
     s09-s15  gratispassasjerer og Ostroms designprinsipper
     s16-s18  Table 4.3: dekning mot ambisjon, håndheving, prinsipper som strammes
     s19-s23  myndighetenes rolle, privat og offentlig handling, Table 3.1
     s24-s26  Gates: hvorfor politikk betyr noe
     s27-s31  Bank of England, backcasting, S-kurven, transition management

   Kilder: fag/fie459/_fragmenter/k13.html og foilteksten
   FIE459_H26_13_Coalitions_transition_management.txt. Casene er nye: quiz.js
   (q13-*), kj7.js og f13.js er brukt for å unngå samme case og formulering.
"""
from trening_lib import *  # noqa: F401,F403

T = "koalisjoner"

# ===========================================================================
# De seks motivene
# ===========================================================================

statisk(
    "coa-s01", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the six motives for joining a coalition. You need the one that matches who is pushing "
        "the firm.",
        "Schoenmaker &amp; Schramade list six motives: collective advocacy, reputation, peer effect, outside "
        "pressure, risk avoidance and collective engagement. Each has its own driver: policy, image, rivals, "
        "outsiders, stranded assets or engagement success.",
        "<p><b>Step 1: who wants the bank in the coalition?</b> The bank itself, its rivals, outsiders or a "
        "government?</p>"
        "<p><b>Step 2: match that driver to the motive whose definition names it.</b></p>",
    ),
    q="<p>Several large corporate clients tell a Nordic bank that they will move their accounts unless it signs "
      "up to a banking sustainability coalition. An environmental NGO runs a campaign against the bank at the "
      "same time. The bank joins the next month. Which motive for joining a coalition does this illustrate "
      "best?</p>",
    alternativer=[
        R("Outside pressure"),
        F("Peer effect",
          "The peer effect comes from rival banks that are already members. No competitor is mentioned here."),
        F("Reputation",
          "Reputation is the firm's own wish to be seen as a sustainability leader. This bank joins because "
          "others demand it, not to stand out."),
        F("Collective advocacy",
          "Collective advocacy means lobbying governments together for clearer policy. Nothing here is about "
          "policy."),
    ],
    kort="<p><b>Outside pressure.</b> Clients and an NGO push the bank to join. The motive is defined by pressure "
         "from consumers, investors and NGOs, not by rivals or by the bank's own wish for a green image.</p>",
    full="<p><b>The motive.</b> Lecture 13 lists six reasons why organisations join a coalition for sustainable "
         "finance. Outside pressure is the one where the push comes from outside the firm: consumers, investors, "
         "NGOs and similar groups want the firm to align with the coalition.</p>"
         "<p><b>Here.</b> The bank did not plan to join. Clients threaten to leave and an NGO campaigns against it. "
         "The decision is a response to these outsiders, so outside pressure is the best fit.</p>"
         "<p><b>The usual mix-up.</b> The peer effect also involves others, but they are rivals: once peers are "
         "members, staying out risks a competitive disadvantage. Reputation is the firm's own wish to be seen as "
         "a leader and sometimes becomes little more than marketing. Ask who is pushing: rivals, outsiders or the "
         "firm itself.</p>"
         "<p><b>Remember:</b> clients, investors or NGOs pushing the firm means outside pressure. Rivals already "
         "inside means peer effect.</p>",
)

statisk(
    "coa-s02", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the six motives for joining a coalition. Look at the reason the director gives, not at "
        "who else is involved.",
        "The six motives: collective advocacy, reputation, peer effect, outside pressure, risk avoidance and "
        "collective engagement. Some are pushed from outside the firm, others come from the firm's own goals.",
        "<p><b>Step 1: is anyone outside the firm asking it to join?</b> Read what she says about clients and "
        "rivals.</p>"
        "<p><b>Step 2: what does she expect the firm to gain?</b> Match that gain to a motive.</p>",
    ),
    q="<p>The marketing director of an insurer proposes joining a well-known sustainability coalition. «No "
      "client or competitor is asking us to,» she says, «but the coalition's logo on our website will mark us "
      "out as a leader in sustainable insurance.» Which motive does her argument express best?</p>",
    alternativer=[
        R("Reputation"),
        F("Outside pressure",
          "Outside pressure needs consumers, investors or NGOs pushing the firm. She says nobody is asking."),
        F("Peer effect",
          "The peer effect is joining because rivals are already members. She rules competitors out."),
        F("Risk avoidance",
          "Risk avoidance is about avoiding the risk of stranded assets. Her argument is about how the insurer "
          "is seen, not about its assets."),
    ],
    kort="<p><b>Reputation.</b> She wants the insurer to be identified as a sustainability leader. Nobody is "
         "pushing and no rival has joined, so the motive is the firm's own image.</p>",
    full="<p><b>The motive.</b> Reputation is one of the six motives in lecture 13: being identified as a leader "
         "in sustainability. The lecture adds a warning: membership sometimes becomes a marketing operation.</p>"
         "<p><b>Here.</b> The director rules out clients and competitors as the reason. What she wants is the "
         "logo and the image of leadership that comes with it. That is the reputation motive.</p>"
         "<p><b>The usual mix-up.</b> Outside pressure and the peer effect also lead firms into coalitions, but "
         "both start with someone else: outsiders such as clients and NGOs in the first case, rivals that are "
         "already members in the second. Here the initiative is internal.</p>"
         "<p><b>A warning sign.</b> A firm that joins mainly for the logo is a candidate free rider: it wants the "
         "benefit of the label, which is why coalition design (monitoring and sanctions) matters.</p>"
         "<p><b>Remember:</b> joining to be seen as a leader is reputation. Ask whether the push is internal or "
         "external.</p>",
)

statisk(
    "coa-s03", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the six motives for joining a coalition. Ask what the pension fund wants to achieve that "
        "it could not achieve alone.",
        "Each motive has its own driver: lobbying for policy, image, rivals, outside groups, stranded assets or "
        "the success rate of engagements. Two of them involve influencing someone together: one targets "
        "governments, the other targets companies.",
        "<p><b>Step 1: whom does the fund want to influence?</b> A government or a company it owns?</p>"
        "<p><b>Step 2: why does it need the coalition for that?</b> Match the answer to a motive.</p>",
    ),
    q="<p>A small pension fund holds 0.2% of a large chemicals company. For two years it has asked the company "
      "to set emission targets and got nowhere. It now joins an investor coalition so that it can press the "
      "company together with dozens of other shareholders. Which motive for joining does this illustrate "
      "best?</p>",
    alternativer=[
        R("Collective engagement"),
        F("Collective advocacy",
          "Advocacy is lobbying governments for clearer policy. The fund wants to change a company it owns."),
        F("Peer effect",
          "Nothing suggests that rival funds joined first. The fund joins to get a result it could not get "
          "alone."),
        F("Reputation",
          "The fund wants a change at the company, not a better image for itself."),
    ],
    kort="<p><b>Collective engagement.</b> Alone the fund failed. In a coalition it engages together with other "
         "shareholders. Coalitions raise the success rate of engagements.</p>",
    full="<p><b>The motive.</b> Collective engagement is the sixth motive in lecture 13: coalitions increase the "
         "success rate of engagements. A small owner has little voice on its own. Many owners speaking together "
         "carry more weight with management.</p>"
         "<p><b>Here.</b> The fund holds a tiny stake and has failed alone for two years. It joins so that dozens "
         "of shareholders can raise the same demand together. That is collective engagement.</p>"
         "<p><b>The evidence.</b> Dimson, Karakaş &amp; Li (2015) find that collaboration among activists is "
         "instrumental in raising the success rate of environmental and social engagements. Their 2020 paper "
         "shows how such coalitions work, with lead investors backed by supporting investors.</p>"
         "<p><b>The usual mix-up.</b> Collective advocacy also means acting together, but towards governments: a "
         "coalition lobbies for clearer policy, which reduces uncertainty about future asset values. Engagement "
         "is aimed at the companies investors own.</p>"
         "<p><b>Remember:</b> together towards companies is collective engagement. Together towards governments "
         "is collective advocacy.</p>",
)

statisk(
    "coa-s04", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about what drives each of the six motives for joining a coalition. Check each pairing against "
        "the lecture's definition.",
        "The drivers in the lecture: lobbying for policy, being identified as a leader, peers already being "
        "members, pressure from consumers, investors and NGOs, avoiding stranded assets and raising the success "
        "rate of engagements.",
        "<p><b>Step 1: read the motive in each option.</b> Recall its driver from the lecture.</p>"
        "<p><b>Step 2: compare.</b> Three options give a real driver but attach it to the wrong motive.</p>",
    ),
    q="<p>Which pairing of a motive for joining a coalition with what drives it is correct?</p>",
    alternativer=[
        R("Collective advocacy: lobbying for clearer policy reduces uncertainty about future asset values"),
        F("Risk avoidance: a coalition lobbies governments more effectively than a single firm",
          "Risk avoidance is about avoiding the risk of stranded assets (Litterman 2015). Lobbying governments "
          "belongs to another motive."),
        F("Peer effect: consumers, investors and NGOs push the firm to align itself with the coalition's aims",
          "The peer effect comes from rivals that are already members. Pressure from consumers and NGOs defines a "
          "different motive."),
        F("Collective engagement: members are identified as leaders in sustainability",
          "Collective engagement is about raising the success rate of engagements with companies. Being seen as "
          "a leader is a different motive."),
    ],
    kort="<p><b>Collective advocacy and clearer policy.</b> A coalition lobbies governments better than one "
         "firm. Clearer policy reduces uncertainty about what assets will be worth (Skancke 2016).</p>",
    full="<p><b>The six motives and their drivers.</b></p>"
         "<ul><li>Collective advocacy: lobbying for policy. Clearer policy reduces uncertainty about future asset "
         "values (Skancke 2016).</li>"
         "<li>Reputation: being identified as a sustainability leader.</li>"
         "<li>Peer effect: peers are members, so staying out is a competitive disadvantage.</li>"
         "<li>Outside pressure: consumers, investors and NGOs push the firm.</li>"
         "<li>Risk avoidance: avoiding the risk of stranded assets (Litterman 2015).</li>"
         "<li>Collective engagement: coalitions raise the success rate of engagements.</li></ul>"
         "<p><b>Why the others fail.</b> Each wrong option takes a real driver and attaches it to the wrong "
         "motive: lobbying to risk avoidance, outside pressure to the peer effect and reputation to collective "
         "engagement.</p>"
         "<p><b>A close call.</b> Advocacy and risk avoidance both concern future asset values. The difference is "
         "the channel: advocacy works through policy, risk avoidance through the firm's own exposure to stranded "
         "assets.</p>"
         "<p><b>Remember:</b> name the driver first, then the motive.</p>",
)

# ===========================================================================
# Dimson, Karakaş & Li
# ===========================================================================

statisk(
    "coa-s05", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Dimson, Karakaş &amp; Li's paper on active ownership and which features of a target firm "
        "make an engagement more likely to succeed.",
        "The paper studies corporate social responsibility engagements with US public companies. It links "
        "success to two features of the target: how much it cares about its reputation and how able it is to "
        "implement changes.",
        "<p><b>Step 1: describe each firm on the two features.</b> Reputation and capacity.</p>"
        "<p><b>Step 2: which way do the features push the odds?</b> Higher or lower success?</p>",
    ),
    q="<p>A group of investors plans an environmental engagement and can target one of two firms. North sells "
      "branded consumer goods, cares about its public image and has the staff and cash to change its practices "
      "quickly. South is a little-known supplier with thin margins and few resources. What do Dimson, Karakaş "
      "&amp; Li (2015) imply?</p>",
    alternativer=[
        R("Success is more likely at North, which has reputational concerns and the capacity to change"),
        F("Success is more likely at South, because a firm with few resources depends more on its owners",
          "This reverses the finding. Engagements succeed more often where the firm can afford to make the "
          "changes."),
        F("The odds are equal, because success depends only on the size of the investors' stakes",
          "The paper finds that features of the target firm matter for success, so the two firms do not have "
          "the same odds."),
        F("Success is more likely at South, because a firm few people know has less to defend",
          "This reverses the finding. A firm that cares about its image is more likely to respond, not less."),
    ],
    kort="<p><b>North.</b> Dimson, Karakaş &amp; Li (2015) find that engagements are more likely to succeed when "
         "the target has reputational concerns and a higher capacity to implement changes.</p>",
    full="<p><b>The study.</b> Dimson, Karakaş &amp; Li (2015), «Active ownership», follow corporate social "
         "responsibility engagements with US public companies. They ask when engagements succeed and what "
         "happens afterwards.</p>"
         "<p><b>When success is likely.</b> Success is more likely when the target firm has reputational concerns "
         "and a higher capacity to implement changes. A firm with a valuable brand has more to lose from bad "
         "publicity. A firm with staff and cash can actually deliver what the investors ask for.</p>"
         "<p><b>Here.</b> North has both features. South has neither: few people watch it and it lacks the "
         "resources to change. North is the more promising target.</p>"
         "<p><b>The usual mix-up.</b> It is tempting to think a weak firm is easier to push. The paper points the "
         "other way. Note also the second finding: collaboration among activists raises the success rate of "
         "environmental and social engagements, which is why coalitions help.</p>"
         "<p><b>Remember:</b> reputational concerns and capacity to change make an engagement more likely to "
         "succeed.</p>",
)

statisk(
    "coa-s06", tema=T, type="fakta", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what Dimson, Karakaş &amp; Li find, in their paper on active ownership, after successful "
        "and unsuccessful engagements.",
        "The paper compares firms where the engagement succeeded with firms where it failed. It looks at "
        "abnormal stock returns and at accounting performance, governance and ownership afterwards.",
        "<p><b>Step 1: statement I.</b> What changes at a firm after a successful engagement?</p>"
        "<p><b>Step 2: statement II.</b> Recall the sign of the abnormal return after a failed engagement. Is it "
        "positive, zero or negative?</p>",
    ),
    q="<p>Consider two statements about Dimson, Karakaş &amp; Li (2015), who study corporate social "
      "responsibility engagements with US public companies.</p>"
      "<p>I. After a successful engagement, target firms show better accounting performance and governance and "
      "attract more institutional ownership.</p>"
      "<p>II. Unsuccessful engagements are followed by negative abnormal returns, so a failed engagement destroys "
      "shareholder value.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II overstates the finding: after a failed engagement the paper finds no abnormal return, "
          "positive or negative."),
        F("Both I and II",
          "Statement II fails: failed engagements are followed by zero abnormal returns, not negative ones."),
        F("Neither",
          "Statement I describes what the paper finds at firms after a successful engagement. Check it again."),
    ],
    kort="<p><b>Only I.</b> Successful engagements are followed by positive abnormal returns and better "
         "performance, governance and institutional ownership. Failed ones are followed by zero abnormal returns, "
         "not negative ones.</p>",
    full="<p><b>The findings.</b> Dimson, Karakaş &amp; Li (2015) split engagements into successful and "
         "unsuccessful ones and follow the targets afterwards.</p>"
         "<ul><li>Successful engagements are followed by positive abnormal returns.</li>"
         "<li>Unsuccessful engagements are followed by zero abnormal returns.</li>"
         "<li>After success, firms show better accounting performance and governance and attract more "
         "institutional ownership.</li>"
         "<li>Collaboration among activists raises the success rate of environmental and social "
         "engagements.</li></ul>"
         "<p><b>Statement I</b> is the third finding, so it is correct. <b>Statement II</b> turns «zero» into "
         "«negative». The paper does not find that a failed engagement destroys value. It finds that nothing "
         "measurable happens to the share price.</p>"
         "<p><b>Why it matters.</b> If failure costs nothing in returns while success adds value, engagement looks "
         "like a good bet for an investor. Working in a coalition raises the chance of success.</p>"
         "<p><b>Remember:</b> success brings positive abnormal returns, failure brings zero.</p>",
)

statisk(
    "coa-s07", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Dimson, Karakaş &amp; Li's paper on coordinated engagements and which investor is more "
        "likely to take the lead role.",
        "The paper names two features that make an investor more likely to lead: the size of its stake in "
        "the target and whether the target is in the investor's home country.",
        "<p><b>Step 1: compare the stakes.</b> Do they differ?</p>"
        "<p><b>Step 2: compare where each fund is based relative to the target.</b> Which feature then decides "
        "who leads?</p>",
    ),
    q="<p>A British retailer is the target of a coordinated climate engagement. A British pension fund and a "
      "Norwegian pension fund each own 2% of the retailer. Both are of similar total size and both want the "
      "engagement to succeed. According to Dimson, Karakaş &amp; Li (2020), which fund is more likely to take "
      "the lead?</p>",
    alternativer=[
        R("The British fund, because the target is a domestic company for it"),
        F("The Norwegian fund, because foreign investors are seen as more independent",
          "This reverses the finding. In the paper, leads tend to be investors for whom the target is domestic."),
        F("Neither, because a lead is chosen by the target company's board",
          "In a coordinated engagement the investors organise themselves into leads and supporters. The board "
          "does not choose."),
        F("Either one, because only the size of the stake decides who leads",
          "Stake size is one of two features. With equal stakes, the other feature decides."),
    ],
    kort="<p><b>The British fund.</b> An investor is more likely to lead when its stake is higher and the target "
         "is domestic. The stakes are equal, so home country decides.</p>",
    full="<p><b>The study.</b> Dimson, Karakaş &amp; Li (2020), «Coordinated engagements», study engagements "
         "where several investors act together in a two-tier strategy: lead investors talk to the company, "
         "backed by supporting investors.</p>"
         "<p><b>Who leads.</b> An investor is more likely to lead when its stake in the target is higher and the "
         "target is domestic. Intuitively, a domestic investor is closer to the company and its "
         "management.</p>"
         "<p><b>Here.</b> Both funds own 2%, so the stake does not separate them. The retailer is domestic for the "
         "British fund, so that fund is the likely lead. The Norwegian fund fits the supporting role.</p>"
         "<p><b>The usual mix-up.</b> The paper also finds that success rates are highest when the leads are "
         "domestic and the supporters international. Students sometimes swap these roles."
         "</p>"
         "<p><b>Remember:</b> a higher stake and a domestic target make an investor a likely lead.</p>",
)

statisk(
    "coa-s08", tema=T, type="fakta",
    hjelp=hjelp3(
        "This is about how Dimson, Karakaş &amp; Li describe a coordinated engagement and what they find it "
        "achieves.",
        "In a coordinated engagement investors split the work. Some talk to the company. Others back them. The "
        "paper names this structure and follows what happens to the engagement goals and to the target "
        "firm.",
        "<p><b>Step 1: name the structure in the case.</b> How many roles are there?</p>"
        "<p><b>Step 2: recall the result.</b> Does the structure reach its goals? What happens to the target "
        "afterwards?</p>",
    ),
    q="<p>In a coordinated engagement with a mining company, two asset managers hold the meetings with the board. "
      "Thirty other investors sign the joint letter and back the demands at the annual general meeting. What do "
      "Dimson, Karakaş &amp; Li (2020) call this structure and what do they find?</p>",
    alternativer=[
        R("A two-tier strategy, which achieves the engagement goals and then improves target performance"),
        F("Free riding by the supporters, which lowers the success rate of the engagement",
          "The paper treats the supporters as part of the strategy, not as free riders. Their backing adds "
          "weight."),
        F("A proxy contest, which replaces the board before the engagement goals are reached",
          "Nobody tries to replace the board. The investors hold meetings and back demands."),
        F("A two-tier strategy, which reaches its goals but leaves target performance unchanged",
          "The name is right, but the paper finds that target performance improves after the goals are "
          "achieved."),
    ],
    kort="<p><b>A two-tier strategy.</b> Lead investors backed by supporting investors achieve the engagement "
         "goals. Target performance improves afterwards (Dimson, Karakaş &amp; Li 2020).</p>",
    full="<p><b>The structure.</b> Dimson, Karakaş &amp; Li (2020) study coordinated engagements. They "
         "describe a two-tier strategy: one or a few lead investors carry the "
         "dialogue, while supporting investors back them.</p>"
         "<p><b>The finding.</b> The two-tier strategy achieves the engagement goals and then improves target "
         "performance. Success is most likely when the leads are domestic, the supporters international and the "
         "coalition influential.</p>"
         "<p><b>Here.</b> Two managers lead the meetings and thirty investors support them. That is the two-tier "
         "structure.</p>"
         "<p><b>The usual mix-up.</b> Supporters who do less work look like free riders. In the paper they are "
         "not: their stakes and votes give the leads weight. Free riding in lecture 13 means enjoying the "
         "benefits of membership without observing the coalition's rules.</p>"
         "<p><b>Remember:</b> leads plus supporters is the two-tier strategy. It works.</p>",
)

# ===========================================================================
# Gratispassasjerer og Ostroms prinsipper
# ===========================================================================

statisk(
    "coa-s09", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the main risk a coalition faces once members have joined.",
        "Schoenmaker &amp; Schramade name one risk as the most obvious for a coalition and use Ostrom's design "
        "principles to assess how well each coalition guards against it.",
        "<p><b>Step 1: separate joining from behaving.</b> Is the problem why the bank joined or what it does as a "
        "member?</p>"
        "<p><b>Step 2: what does the bank get and what does it give?</b> Name the problem.</p>",
    ),
    q="<p>A bank joined a banking coalition three years ago. Its annual reports and advertising show the "
      "coalition's logo, but it has never applied the coalition's principles to its lending and nobody in the "
      "coalition has checked. Which problem for coalitions does this illustrate?</p>",
    alternativer=[
        R("Free riding: it enjoys the benefits of membership without observing the rules"),
        F("The peer effect: it joined only because its main rivals were already members of the coalition",
          "The case says nothing about why the bank joined. The problem is what it does after joining."),
        F("Outside pressure: clients and NGOs forced it to join against its will",
          "No outsider is mentioned. Even if one were, that would explain joining, not ignoring the rules."),
        F("A boundaries problem: the coalition covers too small a share of its sector",
          "Coverage says nothing about whether a given member follows the rules."),
    ],
    kort="<p><b>Free riding.</b> The bank uses the label but ignores the principles. Schoenmaker &amp; Schramade "
         "call this the most obvious risk for a coalition.</p>",
    full="<p><b>The problem.</b> Free riding means a member enjoys (part of) the benefits of membership without "
         "observing the coalition's principles and rules. Schoenmaker &amp; Schramade call it the most obvious "
         "risk for a coalition.</p>"
         "<p><b>Why it happens.</b> Each member bears its own cost of complying, while the benefits, such as "
         "reputation and a stable policy climate, are shared by all. Signing up and then shirking is "
         "individually rational. If enough members do it, the label loses its value.</p>"
         "<p><b>Here.</b> The bank enjoys the logo in its reports and advertising, but it has never applied the "
         "principles. Nobody checks, so the shirking goes unnoticed.</p>"
         "<p><b>The usual mix-up.</b> The motives (peer effect, outside pressure and so on) explain why a firm "
         "joins. Free riding is about how a member behaves after joining. A firm can join for any motive and "
         "still free ride.</p>"
         "<p><b>Remember:</b> the label without the rules is free riding. Ostrom's design principles, above all "
         "monitoring and sanctions, are the defence.</p>",
)

statisk(
    "coa-s10", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Ostrom's design principles as applied to coalitions. You need the feature that is missing "
        "here, not one the coalition already has.",
        "Two features work against free riding in different ways. One makes shirking visible: progress is "
        "reported and assessed. The other makes shirking costly: violations are punished and compliance is "
        "rewarded.",
        "<p><b>Step 1: list what the coalition already does.</b> Is shirking already visible?</p>"
        "<p><b>Step 2: what is still missing?</b> Which feature would change a member's payoff from "
        "shirking?</p>",
    ),
    q="<p>A coalition's members file a progress report every year and the secretariat publishes an assessment "
      "of each one. Year after year the same members miss their targets. Nothing happens to them. Which of "
      "Ostrom's design features should the coalition strengthen to make shirking costly?</p>",
    alternativer=[
        R("Sanctions and rewards"),
        F("Monitoring",
          "The coalition already monitors: reports are filed and assessed. Shirking is visible, it just has no "
          "consequence."),
        F("Clearly defined boundaries",
          "Boundaries concern how much of the sector the coalition covers. They do nothing about members that "
          "miss targets."),
        F("Collective-choice arrangements",
          "Collective choice lets members help change the rules. The problem here is that the existing rules "
          "carry no consequence."),
    ],
    kort="<p><b>Sanctions and rewards.</b> Monitoring already makes shirking visible. What is missing is a cost: "
         "punishing violations and rewarding compliance.</p>",
    full="<p><b>The framework.</b> Schoenmaker &amp; Schramade apply Ostrom's (1990) design principles for "
         "governing common resources to coalitions. Two of them target free riding directly:</p>"
         "<ul><li>Monitoring: is progress towards the rules reported and assessed? It makes shirking "
         "visible.</li>"
         "<li>Sanctions and rewards: how are violations punished and compliance rewarded? They make shirking "
         "costly.</li></ul>"
         "<p><b>Here.</b> Reports are filed and assessed, so monitoring works. But members who miss their targets "
         "face no consequence. A member that compares its cost of complying with its cost of shirking finds "
         "shirking cheap. Sanctions change that calculation.</p>"
         "<p><b>In Table 4.3.</b> Enforcement is the weak spot. Most coalitions have no sanctions for members. "
         "Only WBCSD can end a membership for non-adherence.</p>"
         "<p><b>The usual mix-up.</b> Reporting alone does give some incentive, so monitoring is not useless. "
         "But visible is not the same as costly.</p>"
         "<p><b>Remember:</b> monitoring makes shirking visible, sanctions make it costly.</p>",
)

statisk(
    "coa-s11", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Ostrom's six design features as applied to coalitions. You need the one this rule puts "
        "into practice.",
        "The six features answer six questions: how much of the sector is covered, how ambitious the rules are, "
        "who can change the rules, whether progress is reported and assessed, how violations are punished and "
        "how disputes are settled.",
        "<p><b>Step 1: what does the rule let members do?</b> Report, punish, settle disputes or shape the "
        "rules?</p>"
        "<p><b>Step 2: find the feature whose question the rule answers.</b></p>",
    ),
    q="<p>A coalition of asset managers revises its principles every three years. Any member can sit on the "
      "working group that drafts the new version. Members bound by a proposed rule can demand that it be "
      "amended before the final vote. Which of Ostrom's design features does this put into practice?</p>",
    alternativer=[
        R("Collective-choice arrangements"),
        F("Monitoring",
          "Monitoring asks whether progress towards the rules is reported and assessed. Drafting the rules is a "
          "different activity."),
        F("Conflict-resolution mechanism",
          "Conflict resolution provides arenas to settle disputes between members. Here members write the rules "
          "before any dispute arises."),
        F("Membership rules restricting the use of the common good",
          "That feature concerns how ambitious the rules are (SF 1.0 to 3.0), not who gets to shape them."),
    ],
    kort="<p><b>Collective-choice arrangements.</b> Those affected by the rules can take part in changing "
         "them.</p>",
    full="<p><b>The feature.</b> Collective-choice arrangements ask whether those affected by the rules can help "
         "change them. It is one of the six features Schoenmaker &amp; Schramade take from Ostrom (1990).</p>"
         "<p><b>Why it matters.</b> Members who helped write a rule are more likely to accept it and comply. Rules "
         "imposed from above invite shirking. In Table 4.3, coalitions such as PRI, the Equator Principles, GABV "
         "and WBCSD have formal principles, while FCLT Global and WEF have only a collective goal or "
         "mission.</p>"
         "<p><b>Here.</b> Any member can join the drafting group and members bound by a rule can demand changes "
         "before the vote. That is collective choice.</p>"
         "<p><b>The usual mix-up.</b> Membership rules are about the content and ambition of the rules, scored "
         "from SF 1.0 to 3.0. Collective choice is about who gets a say. Conflict resolution comes in only when "
         "members disagree over how the rules apply.</p>"
         "<p><b>Remember:</b> a say in changing the rules is collective choice.</p>",
)

statisk(
    "coa-s12", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Ostrom's six design features as applied to coalitions. You need the one that a dispute "
        "panel puts into practice.",
        "The six features answer six questions: coverage of the sector, ambition of the rules, who can change "
        "the rules, whether progress is reported, how violations are punished and whether there are rapid, "
        "low-cost arenas for disputes.",
        "<p><b>Step 1: what does the panel do?</b> Write rules, check reports, punish or settle "
        "disagreements?</p>"
        "<p><b>Step 2: match the activity to the feature.</b></p>",
    ),
    q="<p>Two members of a banking coalition disagree on whether a loan to a gas power plant breaks the "
      "coalition's principles. Instead of going to court, they bring the case to a small panel that the "
      "coalition has set up for such disputes. The panel rules within a month at little cost. Which of Ostrom's "
      "design features is this?</p>",
    alternativer=[
        R("Conflict-resolution mechanism"),
        F("Sanctions and rewards",
          "Sanctions punish a member that has broken the rules. Here the question is first whether a rule was "
          "broken at all."),
        F("Monitoring",
          "Monitoring is the routine reporting and assessment of progress. A panel that settles one disagreement "
          "is something else."),
        F("Collective-choice arrangements",
          "Collective choice concerns changing the rules. The members here disagree about how an existing rule "
          "applies."),
    ],
    kort="<p><b>Conflict-resolution mechanism.</b> The coalition offers a rapid, low-cost arena to settle a "
         "dispute between members.</p>",
    full="<p><b>The feature.</b> Ostrom's last design feature asks whether there are rapid, low-cost arenas to "
         "resolve conflicts. Without one, disputes drag on, cost money and can split the coalition.</p>"
         "<p><b>Here.</b> Two members disagree on how a principle applies to one loan. A dedicated panel decides "
         "quickly and cheaply. That is a conflict-resolution mechanism.</p>"
         "<p><b>In Table 4.3.</b> This is the rarest feature. Only WBCSD has even a partial mechanism, in the form "
         "of crisis management. The other coalitions have none.</p>"
         "<p><b>The usual mix-up.</b> Sanctions come after a violation has been established. Monitoring is the "
         "routine check on all members. Collective choice is about changing the rules. Conflict resolution "
         "settles disagreements about how the rules apply.</p>"
         "<p><b>Remember:</b> a quick, cheap way to settle disputes is the conflict-resolution mechanism. "
         "Almost no coalition has one.</p>",
)

statisk(
    "coa-s13", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Ostrom's design features as Schoenmaker &amp; Schramade measure them in Table 4.3. Ask "
        "which feature the analyst's number captures.",
        "In Table 4.3 each feature is turned into a question. One of them is measured as members' assets or "
        "revenues as a share of the relevant group.",
        "<p><b>Step 1: what does the analyst's number describe?</b> The rules, the members' behaviour or the "
        "coalition's reach?</p>"
        "<p><b>Step 2: find the feature that Table 4.3 measures this way.</b></p>",
    ),
    q="<p>An analyst assessing a banking coalition with Schoenmaker &amp; Schramade's framework computes the "
      "members' total assets as a share of global banking assets. Which of Ostrom's design features is she "
      "measuring?</p>",
    alternativer=[
        R("Clearly defined boundaries"),
        F("Membership rules restricting the use of the common good",
          "In Table 4.3 membership rules are scored by ambition, SF 1.0 to 3.0, not by how much of the sector the "
          "members hold."),
        F("Monitoring",
          "Monitoring asks whether members report and are assessed. A share of global assets says nothing about "
          "that."),
        F("Sanctions and rewards",
          "Sanctions concern what happens to members that break the rules. Market share is unrelated."),
    ],
    kort="<p><b>Clearly defined boundaries.</b> Table 4.3 measures boundaries as coverage: members' assets as a "
         "share of global banking assets for banks.</p>",
    full="<p><b>The feature.</b> Clearly defined boundaries is the first of the six features. Schoenmaker &amp; "
         "Schramade turn it into a question: what share of the relevant sector does the coalition cover?</p>"
         "<p><b>How it is measured.</b> In Table 4.3 coverage is members' assets as a share of global assets under "
         "management for asset managers, of global banking assets for banks and members' revenues as a share of "
         "Fortune 500 revenues for corporates. PRI covers 38%, the Equator Principles 30%, GABV 0.07%.</p>"
         "<p><b>Here.</b> The analyst computes members' assets over global banking assets. That is the boundaries "
         "feature.</p>"
         "<p><b>The usual mix-up.</b> Membership rules sound similar, but in the table they measure ambition: how "
         "far the coalition's vision goes, from SF 1.0 to 3.0. Coverage and ambition turn out to be inversely "
         "related.</p>"
         "<p><b>Remember:</b> boundaries means coverage. Membership rules means ambition.</p>",
)

statisk(
    "coa-s14", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Ostrom's design features as Schoenmaker &amp; Schramade measure them in Table 4.3. Ask "
        "what the analyst's score describes.",
        "Table 4.3 links one of the features to the course's typology from finance as usual to SF 3.0. That "
        "feature asks how ambitious the coalition's vision is.",
        "<p><b>Step 1: what is being scored?</b> Reach, reporting, enforcement or ambition?</p>"
        "<p><b>Step 2: find the feature that Table 4.3 scores on the SF scale.</b></p>",
    ),
    q="<p>An analyst reads the principles of an impact investing network and asks one question: do they require "
      "members to put social and environmental value ahead of financial return, or only to consider them? She "
      "scores the answer on the scale from SF 1.0 to SF 3.0. Which of Ostrom's design features is she "
      "assessing?</p>",
    alternativer=[
        R("Membership rules restricting the use of the common good"),
        F("Clearly defined boundaries",
          "Boundaries are measured as coverage, the share of the sector the members hold. The analyst is reading "
          "the content of the principles."),
        F("Collective-choice arrangements",
          "Collective choice asks who can change the rules, not how ambitious they are."),
        F("Monitoring",
          "Monitoring asks whether members report on their progress. She is scoring what the principles demand, "
          "not whether anyone reports."),
    ],
    kort="<p><b>Membership rules.</b> In Table 4.3 this feature is scored by how ambitious the coalition's vision "
         "is, from SF 1.0 to SF 3.0.</p>",
    full="<p><b>The feature.</b> The second of Ostrom's features is membership rules restricting the use of the "
         "common good. Here the common good is the coalition's label. Schoenmaker &amp; Schramade score it by "
         "ambition, using the typology from lecture 1.</p>"
         "<p><b>The scale.</b> SF 1.0 still maximises financial value, with S and E as minor "
         "constraints. SF 2.0 optimises integrated value (I = F + S + E). SF 3.0 optimises S and E, subject to "
         "earning enough F. Coalitions that include S and E without ranking them above profit sit at "
         "1.0/2.0. GIIN, the impact investing network, is scored SF 3.0.</p>"
         "<p><b>Here.</b> The analyst asks whether the rules put S and E ahead of financial return. That is the "
         "ambition of the membership rules.</p>"
         "<p><b>The usual mix-up.</b> Boundaries are about reach (coverage), membership rules about ambition. The "
         "two run in opposite directions in Table 4.3.</p>"
         "<p><b>Remember:</b> the SF score in Table 4.3 measures the membership rules.</p>",
)

statisk(
    "coa-s15", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about how Table 4.3 assesses the Equator Principles on monitoring and sanctions. Then ask what "
        "that means for free riding.",
        "Monitoring asks whether progress is reported and assessed. Sanctions ask how violations are punished. "
        "The lecture adds that reporting alone already gives some incentive, even without sanctions.",
        "<p><b>Step 1: is there monitoring in the lecture's sense?</b> Reporting that is checked, even if the "
        "content is not verified?</p>"
        "<p><b>Step 2: are there sanctions?</b> Then ask what that leaves room for.</p>",
    ),
    q="<p>The Equator Principles Association requires member banks to report and checks that they do so, but it "
      "does not verify what the reports say. Compliance is left to each member's own responsibility. Which "
      "reading is correct?</p>",
    alternativer=[
        R("It has a form of monitoring but no sanctions, so reporting gives some incentive and free riding "
          "remains possible"),
        F("It has no monitoring at all, because a report whose content is not verified does not count",
          "Table 4.3 counts the Equator Principles as monitored: members must report and their reporting is "
          "assessed, even though the content is not verified."),
        F("It has strong sanctions, because a bank that stops reporting is expelled at once",
          "The table records no sanctions: compliance is left to the members' own responsibility."),
        F("Free riding is ruled out, because every member must file a report each year",
          "Filing a report is not the same as following the principles. Without sanctions, a member can report "
          "and still shirk."),
    ],
    kort="<p><b>Monitoring without sanctions.</b> Reporting is required and checked, which gives some incentive. "
         "But content is not verified and there are no sanctions, so free riding is still possible.</p>",
    full="<p><b>What Table 4.3 says.</b> For the Equator Principles: monitoring yes (members must report, "
         "compliance with reporting is assessed, the content is not verified), sanctions no (compliance is the "
         "members' own responsibility), conflict resolution no.</p>"
         "<p><b>What follows.</b> The lecture notes that reporting alone already gives incentives, even without "
         "sanctions: a bank that has to describe what it did is less likely to do nothing. But with no "
         "verification and no punishment, a bank can report and still not apply the principles. That gap is the "
         "free-rider risk.</p>"
         "<p><b>The usual mix-ups.</b> One is to treat unverified reporting as no monitoring at all. The table "
         "counts it. The other is to treat membership as enforcement: joining a coalition does not guarantee "
         "compliance. Only WBCSD in the table can end a membership for non-adherence.</p>"
         "<p><b>Remember:</b> reporting gives some discipline and sanctions give real discipline. Most "
         "coalitions have only the first.</p>",
)

# ===========================================================================
# Table 4.3
# ===========================================================================

statisk(
    "coa-s16", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about what Schoenmaker &amp; Schramade's Table 4.3 shows about coverage, monitoring and "
        "enforcement in the main coalitions.",
        "Three readings of Table 4.3: size and ambition are inversely related, principles tighten over time and "
        "enforcement is the weak spot. Sanctions and conflict resolution are rare.",
        "<p><b>Step 1: for each option, find the coalition and the feature.</b></p>"
        "<p><b>Step 2: check it against the table.</b> Which coalitions have sanctions, verified reports or wide "
        "coverage?</p>",
    ),
    q="<p>Which statement about the coalitions in Schoenmaker &amp; Schramade's Table 4.3 is correct?</p>",
    alternativer=[
        R("WBCSD is the only one that can end a membership for non-adherence"),
        F("PRI expels signatories whose assessment reports show weak progress",
          "PRI monitors through assessment reports, but its sanctions apply only to its board, not to "
          "signatories."),
        F("The Equator Principles verify the content of member banks' reports",
          "The Equator Principles check that banks report. The content is not verified."),
        F("GIIN combines the widest coverage with the most ambitious principles",
          "GIIN is scored SF 3.0 but covers about 0.05% of assets. Size and ambition run in opposite directions."),
    ],
    kort="<p><b>Only WBCSD can expel.</b> Its council reviews members' sustainability reports and membership ends "
         "on non-adherence. Enforcement is the weak spot of the other coalitions.</p>",
    full="<p><b>What Table 4.3 shows (end 2016).</b></p>"
         "<ul><li>PRI: 38% coverage, SF 1.0/2.0, monitoring through assessment reports, sanctions only for the "
         "board.</li>"
         "<li>Equator Principles: 30%, SF 1.0/2.0, reporting assessed but content not verified, no "
         "sanctions.</li>"
         "<li>GIIN: 0.05%, SF 3.0, no monitoring or sanctions.</li>"
         "<li>WBCSD: 18.9%, SF 1.0/2.0, a council reviews members' reports, membership ends on non-adherence and "
         "a partial conflict-resolution mechanism.</li></ul>"
         "<p><b>The reading.</b> Enforcement is the weak spot. Only WBCSD threatens to expel members that miss its "
         "conditions and it alone has some conflict resolution.</p>"
         "<p><b>The usual mix-ups.</b> Monitoring is not sanctioning: PRI and the Equator Principles monitor but "
         "do not punish members. And the widest coalitions are not the most ambitious: the SF 3.0 coalitions "
         "cover less than 1%.</p>"
         "<p><b>Remember:</b> many coalitions monitor, almost none sanction. WBCSD is the exception.</p>",
)

statisk(
    "coa-s17", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the link in Table 4.3 between how much of a sector a coalition covers and how ambitious "
        "its principles are.",
        "The table places each coalition on two dimensions: coverage of its group and SF type, from the least to "
        "the most ambitious. The lecture reads a clear pattern across the coalitions.",
        "<p><b>Step 1: recall the pattern.</b> Do the large coalitions sit at high or low SF types?</p>"
        "<p><b>Step 2: ask why.</b> What must a coalition accept in order to sign up a large share of its "
        "sector?</p>",
    ),
    q="<p>A group of founders plans a new climate coalition for asset managers. Their goal is to sign up "
      "managers holding 40% of global assets under management within two years. Given the pattern in Table 4.3, "
      "which kind of membership rules is the coalition most likely to end up with?</p>",
    alternativer=[
        R("SF 1.0/2.0: social and environmental factors included but not ranked above profit"),
        F("SF 3.0: social and environmental value first, with profit only as a constraint",
          "In Table 4.3 the SF 3.0 coalitions cover less than 1% of their group. A target of 40% is out of reach "
          "with such rules."),
        F("SF 2.0/3.0, like GABV, with a strong focus on the triple bottom line",
          "GABV sits at 2.0/3.0 but covers about 0.07% of banking assets. Wide coverage has not come with that "
          "ambition."),
        F("Rules that ignore social and environmental factors, since members want profit alone",
          "A coalition for sustainable finance exists to pursue sustainable practices. Every coalition in Table "
          "4.3 includes social and environmental factors in some form."),
    ],
    kort="<p><b>SF 1.0/2.0.</b> In Table 4.3 the coalitions that cover 20 to 40% of their group all sit at SF "
         "1.0/2.0. Wide coverage requires accepting members that still put profit first.</p>",
    full="<p><b>The pattern.</b> One of the three readings of Table 4.3 is that size and ambition are inversely "
         "related. PRI, WEF and the Equator Principles cover 30 to 38% of their groups and sit between SF 1.0 "
         "and 2.0: they include social and environmental factors but do not rank them above profit. GIIN (SF 3.0) "
         "and GABV (2.0/3.0) cover less than 1%.</p>"
         "<p><b>Why.</b> To sign up a large share of a sector, a coalition must accept members that still put "
         "profit first. Demanding that members rank S and E above F would shrink the coalition.</p>"
         "<p><b>Here.</b> A target of 40% of global assets puts the new coalition in PRI's size class. If the "
         "pattern holds, its rules will look like PRI's: SF 1.0/2.0.</p>"
         "<p><b>The usual mix-up.</b> Big and influential sounds like ambitious. The table says the opposite. "
         "Principles can tighten over time, but the starting point for a broad coalition is modest.</p>"
         "<p><b>Remember:</b> wide coverage, modest ambition. High ambition, small club.</p>",
)

statisk(
    "coa-s18", tema=T, type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the readings Schoenmaker &amp; Schramade draw from Table 4.3 on how coalition principles "
        "develop and how coverage relates to ambition.",
        "The lecture draws three readings from the table: one about size and ambition, one about how principles "
        "change over time and one about enforcement.",
        "<p><b>Step 1: statement I.</b> What do members do with the principles in later versions?</p>"
        "<p><b>Step 2: statement II.</b> In the table, do the coalitions with the widest coverage have the most "
        "or the least advanced SF type?</p>",
    ),
    q="<p>Consider two statements about Schoenmaker &amp; Schramade's assessment of sustainability coalitions, "
      "as presented in lecture 13.</p>"
      "<p>I. Coalition principles tend to tighten over time, as members strengthen them in later versions.</p>"
      "<p>II. The coalitions with the widest coverage of their sector apply the most advanced, SF 3.0, "
      "principles.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II reverses the table: the coalitions covering 30 to 38% sit at SF 1.0/2.0, while SF 3.0 "
          "coalitions cover under 1%."),
        F("Both I and II",
          "Statement II fails: in the table, wider coverage goes with a less ambitious SF type."),
        F("Neither",
          "Statement I is one of the lecture's readings of the table, a kind of virtuous cycle. Check it "
          "again."),
    ],
    kort="<p><b>Only I.</b> Principles tighten over time in a kind of virtuous cycle. But size and ambition are "
         "inversely related, so the widest coalitions are not SF 3.0.</p>",
    full="<p><b>Three readings of Table 4.3.</b></p>"
         "<ul><li>Size and ambition are inversely related. The large coalitions, covering 20 to 40% of their "
         "group, sit between SF 1.0 and 2.0. The SF 3.0 coalitions cover less than 1%.</li>"
         "<li>Principles tighten over time. Members strengthen them in later versions, a kind of virtuous cycle. "
         "PRI and WBCSD have well-defined, monitored principles and are closer to SF 2.0 than FCLT Global, the "
         "Equator Principles and WEF.</li>"
         "<li>Enforcement is the weak spot. Only WBCSD can expel members.</li></ul>"
         "<p><b>The statements.</b> Statement I is the second reading, so it is correct. Statement II turns the "
         "first reading upside down.</p>"
         "<p><b>Why both can hold.</b> A broad coalition starts with modest rules to attract members. Once inside, "
         "members can agree to raise the bar step by step. Tightening over time does not mean that the broadest "
         "coalitions are already the most ambitious.</p>"
         "<p><b>Remember:</b> principles tighten over time, but breadth still costs ambition.</p>",
)

# ===========================================================================
# Myndighetene, privat og offentlig handling, Table 3.1
# ===========================================================================

statisk(
    "coa-s19", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker &amp; Schramade's Table 3.1 of the five players in sustainability and what "
        "limits government in particular.",
        "Table 3.1 gives each player a horizon, mechanisms, example forums and selected threats. Government has "
        "the strongest tools, but one entry in its row is unlike any other player's.",
        "<p><b>Step 1: what stops the minister?</b> Lack of tools, lack of information or something about "
        "time?</p>"
        "<p><b>Step 2: compare government's horizon with how long climate change plays out.</b></p>",
    ),
    q="<p>A finance minister says: «A carbon price that rises every year until 2050 would help the climate. But "
      "the costs land on voters now, the benefits come decades later and the next election is in three years.» "
      "Which feature of government in Schoenmaker &amp; Schramade's Table 3.1 does this illustrate?</p>",
    alternativer=[
        R("A horizon of up to four years, while climate change plays out over decades"),
        F("Weak tools, since government can only act through the media and through social capital",
          "Media and social capital are civil society's mechanisms. Government has the strongest tools, "
          "taxation and regulation."),
        F("Single-issue focus and fragmentation across many separate campaigns",
          "Those are civil society's threats. The minister's problem is timing, not focus."),
        F("A long investment chain between the savers and the companies",
          "The long investment chain is a threat listed for investors, not for government."),
    ],
    kort="<p><b>A horizon of up to four years.</b> Government has the strongest tools but the only capped horizon "
         "of the five players, which makes dealing with future generations a threat.</p>",
    full="<p><b>Table 3.1.</b> Schoenmaker &amp; Schramade list five players: government, civil society, "
         "corporates, investors and households. For each they give a horizon, mechanisms, example forums and "
         "selected threats.</p>"
         "<p><b>Government's row.</b> Horizon up to four years. Mechanisms: a strong leadership role through "
         "taxation and regulation. Forum: the UN (COP). Threats: shortfall of efforts, free-rider behaviour and "
         "dealing with future generations.</p>"
         "<p><b>Here.</b> The minister has the tool, a carbon price, but the electoral cycle is short while the "
         "benefits arrive over decades. That mismatch between horizon and problem is the point of the "
         "table.</p>"
         "<p><b>The usual mix-up.</b> It is tempting to think government, which must care for future generations, "
         "has the longest horizon. The table lists future generations as a threat, not a strength. The other "
         "players work over the medium or short to long term.</p>"
         "<p><b>Remember:</b> government has the strongest tools and the shortest horizon.</p>",
)

statisk(
    "coa-s20", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about how private and public action relate to each other in lecture 13.",
        "The lecture says private and public action reinforce each other. It gives two directions. In one, "
        "private action comes first and leads to public rules. In the other, public action supports what "
        "private actors have built.",
        "<p><b>Step 1: does the government pass a new rule or back something that already exists?</b></p>"
        "<p><b>Step 2: which direction of the link does that show?</b></p>",
    ),
    q="<p>A voluntary coalition of banks has worked on climate standards for years. The finance minister now "
      "praises it in a speech, asks the state-owned banks to sign up and invites the coalition to advise on "
      "future regulation. No new law is passed. Which idea from lecture 13 does the government's move "
      "illustrate?</p>",
    alternativer=[
        R("Public endorsement can strengthen a private coalition"),
        F("Private action paved the way for public rules",
          "No rule has been made. The government backs an existing coalition instead."),
        F("Free-rider behaviour by the government",
          "The government does something to support the coalition. A free rider enjoys a benefit without "
          "contributing."),
        F("Government's horizon of up to four years",
          "Nothing in the case turns on the electoral cycle. The point is how the government relates to the "
          "coalition."),
    ],
    kort="<p><b>Public endorsement strengthens a private coalition.</b> The government backs an existing "
         "voluntary coalition without passing a rule. Private and public action reinforce each other.</p>",
    full="<p><b>The idea.</b> Lecture 13 says private and public action reinforce each other. Private action can "
         "pave the way for public rules and taxes. Public endorsement can strengthen private coalitions.</p>"
         "<p><b>Here.</b> The coalition existed before the government acted. The minister praises it, brings "
         "state-owned banks in and gives it a voice in future regulation. No rule is passed, so this is "
         "endorsement, not law. It gives the coalition more members and more weight.</p>"
         "<p><b>A limit.</b> Endorsement is not enforcement. Without a rule, the coalition still depends on its "
         "own monitoring and sanctions to keep members from free riding.</p>"
         "<p><b>The usual mix-up.</b> The two directions are easy to swap. Ask what the government does. If it "
         "turns a voluntary standard into a mandatory rule, private action paved the way. If it backs an "
         "existing coalition without a new rule, public endorsement strengthens it.</p>"
         "<p><b>Remember:</b> backing a coalition is endorsement. Writing its standard into law is the other "
         "direction.</p>",
)

statisk(
    "coa-s21", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the five players in Schoenmaker &amp; Schramade's Table 3.1 and the threats listed for "
        "each.",
        "Table 3.1 lists government, civil society, corporates, investors and households, each with its own "
        "mechanisms and selected threats. Find the row whose mechanism and threat match the case.",
        "<p><b>Step 1: which player are the NGOs?</b></p>"
        "<p><b>Step 2: which threat in that row describes campaigns that do not coordinate?</b></p>",
    ),
    q="<p>Five environmental NGOs in one country each run their own campaign: one on plastic, one on forests, one "
      "on air quality, one on fisheries and one on palm oil. They compete for the same media attention and never "
      "coordinate. None of them gets a policy change. Which player and listed threat in Table 3.1 does this "
      "fit?</p>",
    alternativer=[
        R("Civil society: single issue and fragmentation"),
        F("Households: free-rider behaviour and aversion to change",
          "Households act through buying decisions and elections. The actors here are NGOs."),
        F("Government: shortfall of efforts and free-rider behaviour",
          "The government is not the actor here. The campaigns are run by NGOs."),
        F("Corporates: lobbying for the status quo",
          "No firm is lobbying. The problem is NGOs that each pursue their own issue."),
    ],
    kort="<p><b>Civil society: single issue and fragmentation.</b> NGOs work through their public voice. "
         "Table 3.1 lists single-issue focus and fragmentation as their threats.</p>",
    full="<p><b>Civil society's row.</b> In Table 3.1, civil society has a medium to long horizon and works "
         "through the public voice of NGOs: media and social capital. Example forums are Oxfam, Greenpeace and "
         "WWF. The selected threats are single issue and fragmentation.</p>"
         "<p><b>Here.</b> Each NGO pushes its own topic and they compete instead of coordinating. Their voice is "
         "split into five weak voices. That is exactly the single-issue and fragmentation threat.</p>"
         "<p><b>The other rows.</b> Government: taxation and regulation, horizon up to four years, threats "
         "including shortfall of efforts and free-rider behaviour. Corporates: procurement and production, "
         "threats such as short-termism and lobbying for the status quo. Investors: investment and engagement, "
         "threats such as a long investment chain. Households: buying and voting, threats such as free-rider "
         "behaviour and aversion to change.</p>"
         "<p><b>Remember:</b> NGOs bring a public voice, but single issues and fragmentation weaken it.</p>",
)

statisk(
    "coa-s22", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the five players in Schoenmaker &amp; Schramade's Table 3.1 and the threats listed for "
        "each.",
        "Two players share short-termism as a threat. What separates them are the other threats in their rows: "
        "one row adds lobbying and relocation, the other adds features of how money is managed.",
        "<p><b>Step 1: who are the actors in the case?</b></p>"
        "<p><b>Step 2: which row lists the other problems in the case, beside short-termism?</b></p>",
    ),
    q="<p>A pension fund with savers who will retire in 40 years hands its money to external asset managers. "
      "The managers are judged on quarterly returns against a benchmark. Their holdings are valued at "
      "market prices every day. The fund's long-term climate goals get lost along the way. Which player and "
      "listed threats in Table 3.1 does this fit?</p>",
    alternativer=[
        R("Investors: short-termism, a long investment chain and marking to market"),
        F("Corporates: short-termism, lobbying for the status quo and relocating production",
          "Corporates share short-termism, but the actors here are a pension fund and asset managers, not firms "
          "that produce goods."),
        F("Households: lack of trust in government and aversion to change",
          "The savers are households, but the problem arises in how their money is managed, not in their own "
          "choices."),
        F("Government: a horizon of up to four years and dealing with future generations",
          "No government is involved. The short horizon here comes from how managers are judged."),
    ],
    kort="<p><b>Investors.</b> The chain from savers to managers is long, managers are judged quarterly and "
         "holdings are marked to market daily. Table 3.1 lists all three as threats for investors.</p>",
    full="<p><b>Investors' row.</b> In Table 3.1, investors have a short to long horizon and work through "
         "investment and lending strategy and engagement. Forums include PRI, FCLT Global, GIIN, GABV and the "
         "Equator Principles. Selected threats: short-termism, a long investment chain and marking to "
         "market.</p>"
         "<p><b>Here.</b> All three threats appear. The money passes from savers to a fund to external managers "
         "(long chain). Managers are judged each quarter (short-termism). Holdings are valued at market prices "
         "every day (marking to market). Together they push decisions towards the short term, against the "
         "savers' 40-year horizon.</p>"
         "<p><b>The usual mix-up.</b> Corporates also face short-termism, but their other threats are lobbying "
         "for the status quo and relocating production. The investment chain and marking to market belong to "
         "investors.</p>"
         "<p><b>Remember:</b> long chain, quarterly judgement and daily marking to market are the investor "
         "threats.</p>",
)

statisk(
    "coa-s23", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about a threat that Table 3.1 lists for governments and what lecture 13 says is needed to deal "
        "with it.",
        "Table 3.1 lists free-rider behaviour as a threat for two of the five players. The lecture draws a "
        "conclusion from this about what kind of agreements and coalitions are needed.",
        "<p><b>Step 1: who pays and who benefits in the case?</b> Name the behaviour of the country that does "
        "nothing.</p>"
        "<p><b>Step 2: what kind of arrangement binds countries to act together?</b></p>",
    ),
    q="<p>Country A cuts its emissions at a high cost. A more stable climate benefits every country, including "
      "Country B, which keeps its emissions unchanged and saves the cost. Which threat in Table 3.1 is this and "
      "what does lecture 13 say it calls for?</p>",
    alternativer=[
        R("Free-rider behaviour by governments, which calls for supranational agreements and coalitions"),
        F("Short-termism by governments, which calls for handing climate policy to investors",
          "Short-termism is listed for corporates and investors. Country B is not short-sighted: it enjoys a "
          "shared benefit without paying for it."),
        F("Fragmentation by governments, which calls for more NGO campaigns in Country B",
          "Fragmentation is a threat listed for civil society. NGO campaigns cannot bind a country."),
        F("Free-rider behaviour by households, which calls for higher consumer prices in Country A",
          "The free rider here is a country, not households. Raising prices in Country A punishes the one that "
          "already acts."),
    ],
    kort="<p><b>Free riding by governments.</b> Country B shares the benefit without the cost. Free-rider "
         "behaviour threatens governments and households, which is why supranational agreements are "
         "needed.</p>",
    full="<p><b>The threat.</b> Table 3.1 lists free-rider behaviour as a threat for both governments and "
         "households. A stable climate is a shared benefit: no country can be excluded from it. Each country "
         "bears its own cost of cutting emissions, so doing nothing while others act is individually "
         "rational.</p>"
         "<p><b>The response.</b> The lecture concludes that free-rider behaviour is why supranational agreements "
         "and coalitions are needed. Governments form supranational coalitions such as the IPCC and act via the "
         "UN (COP), the OECD and initiatives such as the Paris Agreement.</p>"
         "<p><b>The link to coalitions.</b> The logic is the same as inside a private coalition: the cost is "
         "private, the benefit is shared, so rules, monitoring and sanctions are needed. Ostrom's principles "
         "apply to countries as well as firms.</p>"
         "<p><b>The usual mix-up.</b> Free riding is not only a household problem. Governments are on the list "
         "too.</p>"
         "<p><b>Remember:</b> shared benefit, private cost, free riding. The answer is a binding agreement.</p>",
)

statisk(
    "coa-s31", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the roles lecture 13 gives to governments, supranational bodies and associations.",
        "The lecture lists four roles: research to understand the challenges, cooperation across borders, "
        "decisions on priorities, laws, taxes and carbon prices and, once rules exist, checking that they are "
        "followed and punishing breaches.",
        "<p><b>Step 1: has the rule been decided already?</b> Read when the law was passed.</p>"
        "<p><b>Step 2: what is the authority doing now?</b> Match that activity to one of the four roles.</p>",
    ),
    q="<p>A country passed a law on emissions reporting several years ago. This year its environment agency "
      "audits the figures that firms have reported, finds that a shipping company under-reported and fines it. "
      "Which role of governments in lecture 13 is the agency carrying out?</p>",
    alternativer=[
        R("Monitoring and sanctioning deviations"),
        F("Deciding on laws and regulations",
          "The law was decided years ago. The agency is now checking compliance with it."),
        F("Understanding sustainability challenges through research",
          "Research builds knowledge about the challenges. An audit that ends in a fine does something "
          "else."),
        F("Forming supranational coalitions such as the IPCC",
          "Supranational coalitions bring several countries together. This is one national agency acting on one "
          "firm."),
    ],
    kort="<p><b>Monitoring and sanctioning deviations.</b> The rule exists. The agency checks whether firms follow "
         "it and punishes the one that does not.</p>",
    full="<p><b>The four roles.</b> Lecture 13 lists what governments, supranational bodies and associations "
         "do:</p>"
         "<ul><li>understand national and global sustainability challenges through research;</li>"
         "<li>form supranational coalitions such as the IPCC and act via the UN, the OECD and the Paris "
         "Agreement;</li>"
         "<li>decide on resource priorities, laws and regulations, taxation and carbon pricing;</li>"
         "<li>monitor and sanction deviations.</li></ul>"
         "<p><b>Here.</b> The law was passed years ago, so the deciding is done. The agency now audits reports and "
         "fines a firm that under-reported. That is monitoring and sanctioning.</p>"
         "<p><b>The link to coalitions.</b> Monitoring and sanctions are also Ostrom design features. Voluntary "
         "coalitions often lack sanctions. Governments have the power to impose them, which is one reason "
         "public rules can succeed where coalitions stall.</p>"
         "<p><b>Remember:</b> passing the law is deciding. Checking and fining is monitoring and "
         "sanctioning.</p>",
)

# ===========================================================================
# Gates: hvorfor politikk betyr noe
# ===========================================================================

statisk(
    "coa-s24", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Bill Gates's seven reasons why government policies matter, from How to Avoid a Climate "
        "Disaster.",
        "The seven reasons cover public money for new technology, a carbon price at its true cost, non-market "
        "barriers, outdated policy, help for communities hit by the change, R&amp;D on breakthroughs and pulling "
        "technology, policy and markets together.",
        "<p><b>Step 1: who receives the support?</b> A technology, a market or a group of people?</p>"
        "<p><b>Step 2: what is the support meant to do?</b> Match it to the reason whose description names "
        "it.</p>",
    ),
    q="<p>A government closes its last coal mines. It gives the mining towns funding and technical advice and "
      "connects them with other regions that have been through the same change, so they can share what has "
      "worked. Which of Bill Gates's reasons why government policies matter does this fit best?</p>",
    alternativer=[
        R("Plan for a just transition"),
        F("Mind the investment gap",
          "The investment gap is about public financing for new zero-carbon technology. Here the money goes to "
          "communities, not to technology."),
        F("Stay up to date",
          "That reason is about outdated government policy that blocks decarbonisation. No old rule is "
          "involved."),
        F("Overcome non-market barriers",
          "Non-market barriers hold back a low-carbon choice through missing information, personnel or "
          "incentives. Here the support goes to communities that lose from the change."),
    ],
    kort="<p><b>Plan for a just transition.</b> Funding, technical advice and connecting affected communities so "
         "they can share what works is how Gates describes it.</p>",
    full="<p><b>The reason.</b> Gates argues that government can help communities hit by the move away from "
         "fossil fuels, as part of an overall plan for getting to zero: by providing funding and technical advice "
         "and by connecting communities with similar problems so they can share what works.</p>"
         "<p><b>Here.</b> The coal towns lose their main employer. The government funds them, advises them and "
         "links them with regions that have been through the same change. That matches the description "
         "closely.</p>"
                  "<p><b>The usual mix-up.</b> The investment gap is also about public money, but for inventing and "
         "scaling new zero-carbon technology. Non-market barriers concern information, trained personnel and "
         "incentives. Ask who the money is for.</p>"
         "<p><b>Remember:</b> support for those who lose from the change is the just transition.</p>",
)

statisk(
    "coa-s25", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about Bill Gates's seven reasons why government policies matter. Identify what stops the "
        "households.",
        "Gates separates obstacles that come from prices, from old policy and from other things. One reason "
        "covers barriers that exist mainly because of a lack of information, trained personnel or incentives.",
        "<p><b>Step 1: is price the obstacle?</b> Read what the case says about price.</p>"
        "<p><b>Step 2: if not price, what is missing?</b> Match it to the reason that names it.</p>",
    ),
    q="<p>Households in a country want heat pumps. The price is competitive with oil boilers. Yet sales are "
      "slow: there are too few trained installers and most homeowners do not know which grants exist. Which of "
      "Gates's reasons why government policies matter fits best?</p>",
    alternativer=[
        R("Overcome non-market barriers"),
        F("Level the playing field",
          "That reason is about pricing carbon towards its true cost. The case says price is not the "
          "obstacle."),
        F("Work on technology, policy and markets at the same time",
          "That reason is about pulling three levers together. Here one specific obstacle holds sales "
          "back. It is neither technology nor price."),
        F("Plan for a just transition",
          "A just transition supports communities that lose from the change. Nobody here is losing out."),
    ],
    kort="<p><b>Overcome non-market barriers.</b> The obstacle is not price but a lack of trained personnel and "
         "information, which Gates names as non-market barriers.</p>",
    full="<p><b>The reason.</b> Gates says barriers to decarbonisation exist mainly because of a lack of "
         "information, trained personnel or incentives, all areas where the right government policies can make "
         "a big difference. These are non-market barriers: the price may be right, but the market still does not "
         "deliver.</p>"
         "<p><b>Here.</b> Heat pumps are competitive on price, but installers are scarce and homeowners lack "
         "information about grants. Both are on Gates's list. Training programmes and information campaigns are "
         "the policy answer.</p>"
         "<p><b>The usual mix-up.</b> Level the playing field is about price: raising the carbon price towards "
         "its true cost so the zero-carbon option is no longer more expensive. Stay up to date is about old "
         "government policy being the problem. Ask first whether price is the obstacle. If it is not, look at "
         "information, people and incentives.</p>"
         "<p><b>Remember:</b> right price but no installers or information means non-market barriers.</p>",
)

statisk(
    "coa-s26", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about the content of Bill Gates's seven reasons why government policies matter.",
        "Each reason has a short name and a specific claim. The wrong statements keep the name but change the "
        "claim: they reverse a direction or move the barrier to the wrong place.",
        "<p><b>Step 1: for each statement, recall what Gates means by the name.</b></p>"
        "<p><b>Step 2: look for the reversal.</b> Same time or one at a time? Old tools or new breakthroughs? "
        "Consumers or government as the barrier?</p>",
    ),
    q="<p>Which statement about Bill Gates's reasons why government policies matter, as presented in lecture 13, "
      "is correct?</p>",
    alternativer=[
        R("Level the playing field means raising the carbon price progressively towards its true cost"),
        F("Do the hard stuff too means relying only on the low-carbon tools that are already deployed",
          "This reverses the point. Gates means investing more in R&amp;D on breakthroughs, beyond the tools "
          "already in use."),
        F("Work on technology, policy and markets means pulling one lever at a time, technology first",
          "Gates says the three levers must be pulled at the same time and in the same direction."),
        F("Stay up to date means updating consumers' awareness of how climate change works",
          "Gates says the barrier is sometimes not consumer awareness at all, but government policies "
          "themselves."),
    ],
    kort="<p><b>Level the playing field.</b> A carbon price that rises towards its true cost nudges producers and "
         "consumers towards efficient decisions and encourages innovation that reduces Green Premiums.</p>",
    full="<p><b>The seven reasons.</b></p>"
         "<ul><li>Mind the investment gap: public financing, above all for new zero-carbon technologies.</li>"
         "<li>Level the playing field: raise the carbon price progressively towards its true cost.</li>"
         "<li>Overcome non-market barriers: information, trained personnel, incentives.</li>"
         "<li>Stay up to date: sometimes old government policy is the barrier.</li>"
         "<li>Plan for a just transition: funding, advice and connecting communities.</li>"
         "<li>Do the hard stuff too: more R&amp;D on breakthroughs, much of it in physical infrastructure.</li>"
         "<li>Work on technology, policy and markets at the same time and in the same direction.</li></ul>"
         "<p><b>The link to the course.</b> Levelling the playing field is internalisation of the climate "
         "externality (lecture 3): once carbon carries its true cost, the low-carbon option stops being "
         "artificially expensive. Green Premiums are the extra cost of the zero-carbon option.</p>"
         "<p><b>Remember:</b> Gates wants all three levers at once, new breakthroughs as well as old tools and a "
         "rising carbon price.</p>",
)

# ===========================================================================
# Bank of England, backcasting, S-kurven, transition management
# ===========================================================================

statisk(
    "coa-s27", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the Bank of England emission paths in lecture 13 and which kind of climate risk each path "
        "brings.",
        "Physical risks come from climate and weather-related events. Transition risks come from the adjustment "
        "towards a low-carbon economy. The lecture says the two move in opposite directions across the "
        "paths.",
        "<p><b>Step 1: which path brings big changes in policy, technology and prices?</b></p>"
        "<p><b>Step 2: which loans in the case are most exposed to those changes?</b></p>",
    ),
    q="<p>A bank lends to coal-fired power plants and to farms in a drought-prone region. It compares two of the "
      "Bank of England (2018) emission paths: one where the world cuts emissions fast and one where emissions "
      "keep rising. Which statement fits the lecture?</p>",
    alternativer=[
        R("On the fast-cut path, transition risk dominates, above all for the coal loans"),
        F("On the fast-cut path, physical risk dominates, above all for the farm loans",
          "This swaps the paths. Fast cuts bring the costs of adjusting the economy, not more extreme "
          "weather."),
        F("On the rising path, transition risk dominates, above all for the coal loans",
          "On a high-emission path the economy does not adjust much, so the cost of moving to low carbon stays "
          "small."),
        F("On the rising path, both risks are lowest, since no policy change is needed",
          "A rising path means more warming and more climate and weather events. One of the two risks grows "
          "large."),
    ],
    kort="<p><b>Transition risk on the fast-cut path, hitting coal.</b> Low-emission paths bring transition risks, "
         "high-emission paths bring physical risks. The less of one, the more of the other.</p>",
    full="<p><b>The chart.</b> The Bank of England (2018) shows global CO<sub>2</sub> emission paths to 2100, "
         "ending anywhere from below 2°C to below 6°C of warming.</p>"
         "<ul><li>High-emission paths bring physical risks: climate and weather-related events.</li>"
         "<li>Low-emission paths bring transition risks: the adjustment towards a low-carbon economy.</li></ul>"
         "<p>The less of one, the more of the other.</p>"
         "<p><b>Here.</b> On the fast-cut path, carbon prices, regulation and new technology move quickly. Coal "
         "plants lose value and may become stranded, so the coal loans carry the transition risk. On the rising "
         "path, the farms in the drought-prone region face growing physical risk.</p>"
         "<p><b>The usual mix-up.</b> Swapping the paths: thinking that cutting emissions fast brings more "
         "physical damage. It is the reverse. A bank cannot avoid both risks at once. It can only choose which "
         "one it is more exposed to and plan for it, for example by backcasting.</p>"
         "<p><b>Remember:</b> low emissions bring transition risk, high emissions bring physical risk.</p>",
)

statisk(
    "coa-s28", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the order of the steps in backcasting, as shown in lecture 13 (adapted from Loorbach "
        "2010).",
        "Backcasting goes «from long-term thinking to short-term action» in three steps: a vision for the end "
        "point, pathways with stepping stones and concrete actions.",
        "<p><b>Step 1: which steps has the bank already done?</b></p>"
        "<p><b>Step 2: which step is left?</b></p>",
    ),
    q="<p>A bank has written down its vision of a net-zero loan book in 2050. It has also drawn pathways with "
      "stepping stones for 2030 and 2040. Following backcasting as shown in lecture 13, what is its next "
      "step?</p>",
    alternativer=[
        R("Formulate concrete actions for now, such as this year's lending criteria"),
        F("Extrapolate current lending trends to see where the loan book will end up",
          "That is forecasting, which starts from today's trends. Backcasting does not switch to it after the "
          "destination is set."),
        F("Describe the vision and ambitions for the end point it wants to reach",
          "The bank has already done this. It is the first step, not the next one."),
        F("Move the end point further out, to around 2100, to allow more time",
          "Backcasting fixes the end point and works back from it. Moving the destination starts the process "
          "again."),
    ],
    kort="<p><b>Concrete actions for now.</b> Backcasting runs from the vision, through pathways with stepping "
         "stones, to concrete actions for today. The bank has done the first two.</p>",
    full="<p><b>Backcasting.</b> Lecture 13 shows Schoenmaker &amp; Schramade's Figure 12.2, adapted from "
         "Loorbach (2010): planning «from long-term thinking to short-term action» in three steps:</p>"
         "<ul><li>describe the vision and ambitions for the end point (around 2050 in the figure);</li>"
         "<li>create pathways with stepping stones from today to that point;</li>"
         "<li>formulate concrete actions for now.</li></ul>"
         "<p><b>Here.</b> The bank has its 2050 vision and milestones for 2030 and 2040. What is missing is the "
         "link to today: what it will do this year, for example which loans it will and will not make.</p>"
         "<p><b>The usual mix-up.</b> Forecasting starts from today and extrapolates current trends. Backcasting "
         "fixes the destination first and works back. Students also reverse the order and start with the "
         "actions.</p>"
         "<p><b>Remember:</b> vision, pathways, actions now. In that order.</p>",
)

statisk(
    "coa-s29", tema=T, type="tolkning",
    hjelp=hjelp3(
        "This is about the shape of the transition path in the backcasting figure shown in lecture 13.",
        "The figure does not draw the transition as a straight line. Its path has a specific shape, with "
        "different speeds at different stages.",
        "<p><b>Step 1: what does a straight line assume about the speed of change?</b></p>"
        "<p><b>Step 2: how does the speed change along the path in the figure?</b> Early, middle and "
        "late.</p>",
    ),
    q="<p>An analyst models the energy transition as a straight line: the same share of fossil capacity is "
      "replaced every year from now until 2050. Which feature of the transition in the lecture's backcasting "
      "figure does this model ignore?</p>",
    alternativer=[
        R("The S-curve: change is slow at first, then steep, then levels off"),
        F("The order of the steps: actions for now come before the long-term vision",
          "Backcasting starts with the vision, not the actions. And the analyst's problem is the shape of the "
          "path, not the planning steps."),
        F("A single jump: nothing changes until 2050, when everything shifts at once",
          "The figure shows a change that builds up over time, not one sudden shift."),
        F("Steady acceleration: change keeps speeding up every year until the end",
          "The path in the figure does not keep speeding up all the way to the end."),
    ],
    kort="<p><b>The S-curve.</b> In the figure the transition is slow at first, then steep, then levels off. A "
         "straight line misses both the slow start and the rapid middle.</p>",
    full="<p><b>The figure.</b> In the backcasting figure in lecture 13 (Schoenmaker &amp; Schramade, adapted from "
         "Loorbach 2010), the transition follows an S-curve. Change is slow at first, then steep, then levels "
         "off.</p>"
         "<p><b>Here.</b> A straight line assumes the same amount of change every year. It overstates change in "
         "the early years and understates it in the steep middle phase.</p>"
         "<p><b>Why it matters for finance.</b> If the shift is slow and then fast, asset values can hold up for "
         "years and then fall quickly once the transition takes off. An investor who extrapolates the slow start "
         "may be caught out when the curve turns steep. That is the stranded-asset risk from lecture 3.</p>"
         "<p><b>The usual mix-up.</b> The S-curve is about the shape of the transition. The three backcasting "
         "steps (vision, pathways, actions) are about how to plan it. Do not mix the two.</p>"
         "<p><b>Remember:</b> transitions follow an S-curve: slow, steep, then level.</p>",
)

statisk(
    "coa-s30", tema=T, type="paastand",
    hjelp=hjelp3(
        "This is about transition management as lecture 13 presents it, through Derk Loorbach.",
        "The lecture presents transition management through Loorbach, director of DRIFT at Erasmus University "
        "Rotterdam, who co-founded the approach. It is paired with integrated thinking.",
        "<p><b>Step 1: is it a prediction method or a way of steering change?</b></p>"
        "<p><b>Step 2: who takes part?</b> One actor or several?</p>",
    ),
    q="<p>Which statement about transition management, as presented in lecture 13, is correct?</p>",
    alternativer=[
        R("It is a form of governance for sustainable development that works with government, business, civil "
          "society and science"),
        F("It is a forecasting method that extrapolates current trends to predict when a transition will happen",
          "Extrapolating trends is forecasting. Transition management is a way of steering change, not a way of "
          "predicting it."),
        F("It is a task for government alone, since only governments have taxation and regulation as tools",
          "Loorbach's approach brings several groups of actors together. Government has strong tools but does "
          "not act alone."),
        F("It was set out by Bill Gates as the last of his seven reasons why government policies matter",
          "Gates's seven reasons are a separate part of the lecture. The approach is presented through Derk "
          "Loorbach."),
    ],
    kort="<p><b>A form of governance for sustainable development.</b> Loorbach co-founded it and works with "
         "government, business, civil society and science on concrete transitions.</p>",
    full="<p><b>Transition management.</b> Lecture 13 presents it through Derk Loorbach, director of DRIFT and "
         "professor of socio-economic transitions at Erasmus University Rotterdam. He co-founded the approach as "
         "a new form of governance for sustainable development and works with government, business, civil "
         "society and science on concrete transitions.</p>"
         "<p><b>How it fits the lecture.</b> Backcasting (adapted from Loorbach 2010) gives the planning logic: "
         "vision, pathways, actions now. Transition management is about steering the actual change with many "
         "actors. The lecture pairs it with integrated thinking, which ties back to integrated value "
         "(I = F + S + E).</p>"
         "<p><b>The usual mix-ups.</b> Transition management is not forecasting: it does not extrapolate trends. "
         "It is not a government monopoly either. The whole lecture argues that no single player can manage the "
         "transition, which is why coalitions and cooperation between the five players matter.</p>"
         "<p><b>Remember:</b> transition management is governance with many actors, not a forecast.</p>",
)
