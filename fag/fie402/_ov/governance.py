# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: governance og de verbale M&A-spørsmålene (skribent 5).

   Fire teorioppgaver i Kurbatovs format (H2024 E2, H2025 E2): et kort scenario, deloppgaver
   med setningsbudsjett og poeng per punkt, bare tekstdeler. Hver oppgave har tolv vignetter
   (selskap, situasjon, tall i teksten), én per variant, og kriteriene følger vignetten. Bare
   ov-gov3 har litt regning i tekstdelene (en brøk per del), slik Kurbatov leser
   sannsynligheter ut av markedspriser.

   ov-gov1  styret som overvåker: gratispassasjerproblemet, svakheter i styret (CEO som
            styreleder, innsidere og grå, fanget styre, størrelse, travle styremedlemmer,
            forskjøvne valg, tidligere CEO som styreleder, informasjon, møtehyppighet, lang
            fartstid) og avveiningen ved for hard overvåking.
   ov-gov2  lønn og KPI-er: målet eller kontrakten som får lederen til å flytte tallet i stedet
            for verdien (ROIC og avviste prosjekter, ROE og gjeld, vekst og oppkjøp, arbeidskapital,
            justert EBITDA, engangsgevinst, kostnadsmål, kursen på én dato, opsjoner og risiko,
            ESG-mål), hvorfor et høyere mål ikke hjelper, og «jeg gjorde bare det kontrakten betalte
            meg for»: styrets ansvar og grensen mot overvåking som gjør lederen passiv.
   ov-gov3  aktivisten og markedets dom: kursoppgangen når posten blir kjent (implisitt
            sannsynlighet for planen), forsvaret og den oppgitte grunnen målt mot kursfallet og
            Kurbatovs vilkår (NOL-pille og Ford, giftpille og Twitter, forskjøvne valg og
            kreftmedisinen, gyllen fallskjerm, A- og B-aksjer, hvit væpner), og hvem som avgjør
            avstemningen (institusjonenes andel av stemmene, ISS og Glass Lewis).
   ov-gov4  motivene for M&A (ikke synergier, ikke skattemessige underskudd), aksjonærer mot
            interessenter.

   Hver vignett har ett navn, og detaljene (beløp, fond, rådgiver, by) er låst til navnet. Da gir
   hver vignett bare én tekst, byggeren avviser like tekster, og de tolv variantene blir tolv ulike
   vignetter.

   Governance er generell (Kurbatovs ramme er amerikansk): ingen ASA, ingen norsk aksjelov.
   Kurbatov omtales ved navn. Lederen omtales som «the CEO», aldri med he/his.
"""
import random as _random

from ov_lib import *  # noqa: F401,F403


def _fast(navn):
    """Tilfeldighetsgenerator låst til selskapsnavnet: detaljene i teksten følger navnet."""
    return _random.Random("gov:" + navn)


def _krit(tekst, p=1):
    """Ett kriterium med poeng til slutt: «… (1 p)»."""
    ps = f"{p:g}"
    return f"{tekst} ({ps} p)"


def _stor(t):
    return t[0].upper() + t[1:]


def _liten(t):
    return t[0].lower() + t[1:]


def _liten_trygg(t):
    """Liten forbokstav bare når første ord ikke er et navn (Kurbatov, et selskap)."""
    forste = t.split(" ", 1)[0]
    if forste in ("The", "With", "No", "Unlike", "Dual-class", "Money", "Tax", "A", "An"):
        return _liten(t)
    return t


# ---------------------------------------------------------------------------
# ov-gov1 · Styret som overvåker
# ---------------------------------------------------------------------------
SVAKHET = {
    "chair": ("the CEO also chairs the board",
              "the CEO then sets the agenda and controls the information of the body that is meant to monitor, pay "
              "and if necessary fire the CEO"),
    "insiders": ("insiders and gray directors",
                 "executives report to the CEO in their day jobs, while directors with ties to the firm (a former "
                 "executive, its lawyer, banker, auditor or consultant, or family) have a personal reason not to "
                 "confront the CEO"),
    "captive": ("a captive board",
                "directors who owe their seats to the CEO pay a personal price for voting against the CEO, so they "
                "are independent on paper but not in fact"),
    "large": ("the board is too large",
              "with so many seats each director expects the others to do the work, which is free riding inside the "
              "board; Kurbatov's range is about 7 to 11"),
    "small": ("the board is too small",
              "a handful of directors cannot staff independent audit and pay committees or cover the business, so "
              "the board lacks capacity"),
    "busy": ("busy directors",
             "directors with many other boards or poor attendance have little time to read the reports and question "
             "the CEO"),
    "staggered": ("staggered terms",
                  "with a third of the seats up each year, owners need two annual meetings to replace a majority, "
                  "which shields the incumbent directors"),
    "graychair": ("a former CEO chairs the board",
                  "a chair who ran the firm until recently is tied to the people and decisions under review, so the "
                  "board's leader is not independent"),
    "info": ("the CEO controls the board's information",
             "the CEO's office writes the board papers and sets the agenda, so the board sees only what the CEO wants "
             "it to see"),
    "seldom": ("the board meets too seldom",
               "a board that meets twice a year cannot follow the business closely enough to question the CEO in "
               "time"),
    "tenure": ("directors who have served for many years",
               "long-serving directors grow close to management and stop questioning it, so they are independent in "
               "name only"),
    "expertise": ("directors without knowledge of the industry",
                  "directors who do not understand the business cannot judge the CEO's proposals and must rely on what "
                  "management tells them"),
    "nocommittee": ("no independent committees",
                    "without independent audit and pay committees nobody on the board digs into the accounts or the "
                    "CEO's pay"),
}

STYRE1 = [
    dict(navn="Fenmore Logistics Inc.", bransje="logistics", maks=1.5,
         resultat="Over three years its share price has lagged its peers by 25%, while the CEO's pay has doubled.",
         styre=("The board has 10 directors. The CEO also chairs it and chairs the nominating committee, which has "
                "proposed every director who joined in the last ten years. Three of the directors are former business "
                "partners of the CEO."),
         svak=["chair", "captive", "insiders"], valg=["chair", "captive"],
         tiltak=("appoint an independent chair and let a nominating committee of independent directors or of the "
                 "largest shareholders propose new candidates")),
    dict(navn="Ostley Devices Inc.", bransje="medical-device", maks=2,
         resultat="Its return on assets has fallen four years in a row, while the CEO's bonus has been paid in full.",
         styre=("The board has 17 directors, 13 of them independent. An independent director chairs it. Six of the "
                "independent directors sit on five or more other boards. Board meetings rarely discuss the CEO's "
                "proposals in depth."),
         svak=["large", "busy"], valg=["large", "busy"],
         tiltak=("cut the board to about 9 directors and cap outside seats (for example at three other boards), so "
                 "each director has the time and the responsibility to monitor")),
    dict(navn="Thistlewood Snacks Inc.", bransje="food", maks=0.8,
         resultat="Margins have trailed the industry for five years.",
         styre=("The board has 5 directors: the CEO, who also chairs it, two other executives and two independent "
                "directors."),
         svak=["chair", "insiders", "small"], valg=["chair", "insiders"],
         tiltak=("add independent directors until they are a clear majority, with an independent chair and "
                 "independent audit and pay committees")),
    dict(navn="Galloway Power Inc.", bransje="energy", maks=1.2,
         resultat="The company has made three acquisitions outside its core business. The share price fell on each.",
         styre=("The board has 11 directors. Eight are formally independent, but six of those were invited by the CEO "
                "and are long-time friends of the CEO. The CEO also chairs the board, which has not rejected a single "
                "proposal from the CEO in eight years."),
         svak=["captive", "chair"], valg=["captive", "chair"],
         tiltak=("let a nominating committee of independent directors (or of the largest shareholders) propose "
                 "candidates and appoint an independent chair")),
    dict(navn="Quarrington Software Inc.", bransje="software", maks=2.5,
         resultat="Sales growth has slowed to half the industry's rate while costs keep rising.",
         styre=("The board has 9 directors. All except the CEO are independent. An independent director chairs it. "
                "Most directors were proposed by the CEO. They serve staggered three-year terms, so a third are "
                "elected each year. In the last five years the board has approved every acquisition the CEO proposed "
                "and raised its own fees by 60%."),
         svak=["staggered", "captive"], valg=["staggered", "captive"],
         tiltak=("elect all directors every year and let a nominating committee of the largest shareholders propose "
                 "candidates")),
    dict(navn="Delacroix Stores Inc.", bransje="retail", maks=1,
         resultat="Same-store sales have fallen for three years, yet the CEO's pay keeps rising.",
         styre=("The board has 9 directors. The CEO also chairs it. Five of the independent directors each sit on six "
                "other boards. The board meets four times a year."),
         svak=["chair", "busy"], valg=["chair", "busy"],
         tiltak="appoint an independent chair and cap the number of outside board seats, with more frequent meetings"),
    dict(navn="Ravensmoor Chemicals Inc.", bransje="chemicals", maks=1.8,
         resultat="Two large investments in the last three years have been written down.",
         styre=("The board has 19 directors, including 6 executives and 2 former executives, with an independent "
                "chair. On average a director attends 70% of the board meetings."),
         svak=["large", "insiders", "busy"], valg=["large", "insiders"],
         tiltak=("shrink the board to 7 to 11 directors with a clear independent majority and stop re-nominating "
                 "directors who miss meetings")),
    dict(navn="Hollinsworth Media Inc.", bransje="media", maks=3,
         resultat="Its audience and its share price have both fallen by a third over four years.",
         styre=("The board has 10 directors. The founder is CEO and chairs the board. Two of the founder's children "
                "and the founder's personal lawyer are directors. The founder proposes every new candidate."),
         svak=["chair", "insiders", "captive"], valg=["captive", "chair"],
         tiltak="appoint an independent chair and move the nomination of directors to independent directors"),
    dict(navn="Clearbrook Utilities Inc.", bransje="water-utility", maks=1,
         resultat="Costs and customer complaints have risen for three years in a row.",
         styre=("The board has 8 directors. The former CEO, who retired last year, chairs it. The other seven are the "
                "CEO, the CFO, the COO and four outside directors, two of whom retired from senior jobs at the company "
                "last year."),
         svak=["graychair", "insiders"], valg=["graychair", "insiders"],
         tiltak=("appoint an independent chair and replace the executives and the recently retired employees with "
                 "independent directors")),
    dict(navn="Kingsmere Shipping Inc.", bransje="shipping", maks=2,
         resultat="Its freight margins have trailed the peers' for four years.",
         styre=("The board has 9 directors. All except the CEO are independent. An independent director chairs it. "
                "The board has no committees of its own: the CEO's office writes all board papers and sets the "
                "agenda with the chair. The board meets twice a year."),
         svak=["info", "seldom", "nocommittee"], valg=["info", "seldom"],
         tiltak=("set up independent audit and pay committees with direct access to the auditors and staff; the board "
                 "should also meet at least six times a year")),
    dict(navn="Aldergrove Insurance Inc.", bransje="insurance", maks=1.4,
         resultat="Its claims costs have been the highest in the industry for five years.",
         styre=("The board has 7 directors. The CEO also chairs it. The other six are independent, but the CEO "
                "proposed all six and four of them have served for more than fifteen years."),
         svak=["chair", "captive", "tenure"], valg=["chair", "tenure"],
         tiltak=("appoint an independent chair and limit terms, with new directors proposed by an independent "
                 "nominating committee")),
    dict(navn="Northcliff Mining Inc.", bransje="mining", maks=1.6,
         resultat="Two mine accidents and a cost overrun of 40% on its newest mine have hit the share price.",
         styre=("The board has 6 directors. The CEO also chairs it; the other five are independent. None of the five "
                "has worked in mining, so the board relies on the CEO's staff for every technical judgement."),
         svak=["chair", "expertise", "small"], valg=["chair", "expertise"],
         tiltak=("appoint an independent chair and add directors with mining experience, so the board can judge "
                 "technical risks itself")),
]



@oppgave("ov-gov1", tema="governance", tittel="The board as the monitor of the CEO", antall=12,
         sjanger="d3-overvaking", kilde="H2024 E2, lecture 13 (the board), lecture 13 recording")
def _(r):
    v = r.choice(STYRE1)
    fi = v["navn"]
    maks = v["maks"]
    beløp = _fast(fi).choice(["$1 million", "$2 million", "$500 000"])
    mstr = tall(maks, 1) if maks != int(maks) else tall(maks, 0)
    navn_svak = [SVAKHET[k][0] for k in v["svak"]]
    liste = "; ".join(navn_svak)
    s1, s2 = v["valg"]
    case = (f"<p>{fi} is a listed {v['bransje']} company with dispersed ownership: no shareholder owns more than "
            f"{mstr}% of the shares. {v['resultat']}</p><p>{v['styre']}</p>")

    # ---------------- (a)
    a = tekst_del(
        "a", poeng=4,
        q=(f"<p>Why do {gen(fi)} shareholders not monitor the CEO themselves? Why does that make the board so "
           f"important?</p>"),
        setninger="Answer in at most three sentences.",
        kort=(f"<p>With no holder above {mstr}%, each shareholder would bear the full cost of monitoring but get at most "
              f"{mstr}% of the gain, so each free-rides on the others. Monitoring is therefore delegated to the board, "
              f"which the owners elect to act for them. The board is the body that hires and fires the CEO, sets the "
              f"CEO's pay and approves major decisions, so its independence decides whether the CEO is monitored at "
              f"all.</p>"),
        losning=(f"<p><b>The mechanism.</b> Ownership and control are separated: the owners bear the cost of the CEO's "
                 f"shirking, empire building or perks, but the CEO runs the firm. Monitoring is a public good among "
                 f"shareholders. A holder of {mstr}% who spends 10 on monitoring that raises firm value by 100 keeps only "
                 f"{mstr}, so nobody acts: the free-rider problem.</p>"
                 f"<p><b>Why the board.</b> The owners delegate monitoring to directors they elect. The board has the "
                 f"strongest tools in the system: it hires and fires the CEO, sets pay through its compensation "
                 f"committee, approves budgets, acquisitions and financing and oversees the accounts through its "
                 f"audit committee. Kurbatov calls an independent board «one of the first check marks».</p>"
                 f"<p><b>Other monitors.</b> Lenders (covenants and the threat of calling the loan), auditors, analysts "
                 f"and regulators help too. SOX (2002) made auditors more independent and makes the CEO and CFO answer "
                 f"for the accounts; Dodd-Frank (2010) required independent pay committees. None of them can fire the "
                 f"CEO, which is why the board matters most.</p>"
                 f"<p><b>Typical mistakes:</b> defining governance and stopping there; saying small shareholders are "
                 f"lazy instead of naming the free-rider problem; naming the board without its tools.</p>"
                 f"<p><b>Remember:</b> a monitor needs both a reason to watch and a tool to act. Dispersed owners have "
                 f"tools but no reason; the board is meant to have both.</p>"),
        kriterier=[
            _krit("Names the free-rider problem: a small holder would bear the full cost of monitoring but get only "
                  "its share of the gain"),
            _krit(f"Uses the case: with no holder above {mstr}%, nobody captures enough of the gain to act alone"),
            _krit("Explains that monitoring is delegated to the board, which the owners elect to act for them"),
            _krit("Names the board's tools: it hires and fires the CEO, sets pay and approves major decisions"),
        ],
    )

    # ---------------- (b)
    n1, m1 = SVAKHET[s1]
    n2, m2 = SVAKHET[s2]
    b = tekst_del(
        "b", poeng=4,
        q=(f"<p>A director of {fi} says: «Our board has every tool it needs: it can fire the CEO, set the CEO's pay "
           f"and veto any deal.» Explain why the tools may still go unused: name two features of this board and how "
           f"each weakens the monitoring of the CEO.</p>"),
        setninger="Answer in at most two sentences per feature.",
        selvstendig=True,
        kort=(f"<p>First, {n1}: {m1}. That makes it unlikely the board acts on the poor results. Second, {n2}: {m2}. "
              f"Either way the board has the tools on paper but is unlikely to use them.</p>"),
        losning=(f"<p><b>What the case shows.</b> {gen(fi)} board has these weaknesses: {liste}. Any two, each with its "
                 f"mechanism, earn full marks.</p>"
                 f"<p><b>The checklist from lecture 13.</b> Directors are insiders (executives), gray (ties to the firm: "
                 f"former executives, its lawyer, banker or consultant) or independent; only the independent ones "
                 f"monitor well. A CEO who chairs the board is the red flag; a CEO who merely sits on it is fine "
                 f"(Kurbatov: «The only red flag is if the CEO is also chair of the board»). A captive board owes its "
                 f"seats to the CEO. Size: about 7 to 11, since a small board lacks capacity and a large one invites "
                 f"free riding. Busy directors have no time. Staggered terms make the incumbents hard to replace. A "
                 f"board that depends on the CEO for its papers and meets rarely cannot follow the business.</p>"
                 f"<p><b>Typical mistakes:</b> calling the CEO's seat on the board a weakness when the CEO does not chair "
                 f"it; listing a weakness without saying how it stops the board from acting; two weaknesses that are "
                 f"the same thing in different words.</p>"
                 f"<p><b>Remember:</b> name the weakness, then the mechanism: who on the board will not or cannot "
                 f"confront the CEO and why.</p>"),
        kriterier=[
            _krit(f"Names a first weak feature that is present in the case ({liste})"),
            _krit("Explains how the first feature weakens monitoring of the CEO"),
            _krit("Names a second, different weak feature from the case"),
            _krit("Explains how the second feature weakens monitoring of the CEO"),
        ],
    )

    # ---------------- (c)
    c = tekst_del(
        "c", poeng=4,
        q=(f"<p>At the annual meeting a shareholder proposes that the board must approve every decision above "
           f"{beløp} and fire the CEO after any quarter in which profits fall. Comment on the proposal and propose a "
           f"better change to {gen(fi)} board.</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>The proposal goes too far: a CEO who can be fired after one weak quarter will avoid risky projects "
              f"with positive NPV, so too much monitoring makes the manager passive (Kurbatov: «Monitor someone too "
              f"harshly, they will be just not doing anything»). It also costs board time, while directors know less "
              f"about the business than the CEO and cannot run it from the boardroom. A better change is to "
              f"{v['tiltak']}. That gives the board the independence or the time to monitor where it is weak today "
              f"while leaving the CEO room to take good risks.</p>"),
        losning=("<p><b>The trade-off.</b> Monitoring is not free. It costs directors' time and money. It also changes "
                 "what the CEO does. A failure that costs the CEO the job hurts the CEO far more than a success helps, so "
                 "a CEO punished for every visible failure prefers doing nothing to doing something good but risky. "
                 "Kurbatov's summary slide frames the choice as freedom for the manager against tight control.</p>"
                 "<p><b>A better fix.</b> Aim at the weakness, not at the CEO's day-to-day decisions. Independent "
                 "directors, a separate chair, a sensible size and directors with time make the board willing and able "
                 "to act on poor results, which is what the owners need.</p>"
                 "<p><b>Typical mistakes:</b> agreeing that more monitoring is always better; a remedy that does not "
                 "match a weakness in the case; a remedy without saying how it works.</p>"
                 "<p><b>Remember:</b> good governance monitors more only while the agency cost it removes exceeds what "
                 "it costs, including a passive CEO.</p>"),
        kriterier=[
            _krit("Says the proposal goes too far: a CEO punished for every weak quarter avoids risky positive-NPV "
                  "projects, so too much monitoring makes the manager passive"),
            _krit("Names a direct cost or limit: board time and money, or directors knowing less than the CEO"),
            _krit(f"Proposes a better change that targets a weakness of this board (for example: {v['tiltak']})"),
            _krit("Explains how the change improves monitoring: who gains the independence, power or time to act"),
        ],
    )
    return ovelse(case, [a, b, c])


# ---------------------------------------------------------------------------
# ov-gov2 · Lønn og KPI-er
# ---------------------------------------------------------------------------
LONN2 = [
    dict(navn="Wardlow Chemicals Inc.", bransje="chemicals",
         kpi="the return on invested capital (ROIC) stays above 18%",
         hendelse=("The company's cost of capital is 9%. The CEO turned down two expansion projects expected to earn 13% "
                   "a year, because they would have pulled the average ROIC below 18%. ROIC stayed at 19% and the bonus "
                   "was paid. Two years later a rival built similar plants and took a third of the market."),
         tiltak="rejecting the two projects", maal="ROIC",
         qa="Name the problem. Explain why rejecting the two projects kept ROIC high while destroying value.",
         hvordan="Explains how rejecting the two projects kept the average ROIC above the target",
         problem="a ratio target that rewards a high average return instead of value",
         mek=("Projects earning 13% against a cost of capital of 9% have a positive NPV, but they would have lowered the "
              "average return. Turning them down kept ROIC high while the owners lost the projects' NPV."),
         bevis="the rival that built the plants and took a third of the market shows the value that was given up",
         forslag=("pay the bonus on economic profit (the return above the cost of capital times the capital invested) "
                  "over three years"),
         bakside="economic profit needs an agreed cost of capital, which the CEO can argue about.",
         stopp="the board must see every project above a size limit that management turns down, with its NPV",
         virker="Directors who see the projects' positive NPV could approve them despite the lower ratio.",
         type="ratio"),
    dict(navn="Corvanne Air Inc.", bransje="airline",
         kpi="return on equity (ROE) reaches 15%",
         hendelse=("ROE was heading for 12%. The CEO borrowed $800 million and used it to buy back 20% of the shares. "
                   "ROE ended at 15.6% and the bonus was paid. A year later a fall in demand pushed the airline close "
                   "to breaching its loan covenants."),
         tiltak="the debt-financed buyback", maal="ROE",
         problem="an ROE target: ROE rises with leverage, which adds risk rather than value",
         mek=("Debt shrinks the equity base, so ROE rises even if operations do not improve at all. The higher return "
              "only compensates for the higher risk to the shareholders (MM II); a cyclical airline also faces "
              "expected distress costs."),
         bevis="the covenant scare a year later shows the extra risk",
         forslag=("pay the bonus on return on assets or on the total shareholder return relative to other airlines, "
                  "measured over three years"),
         bakside="relative pay can reward a CEO whose airline merely loses less than its peers in a downturn.",
         stopp="the board sets a target debt ratio and must approve any change in leverage",
         virker="A debt-financed buyback would then need the consent of directors who see that it raises risk, not value.",
         type="roe"),
    dict(navn="Halsted Retail Inc.", bransje="retail",
         kpi="revenue grows by at least 10% a year",
         hendelse=("Organic growth was 4%. The CEO bought two smaller chains at premiums of 35% over their market "
                   "prices. Revenue grew by 12% and the bonus was paid, but the share price fell about 6% on each "
                   "announcement."),
         tiltak="the two acquisitions", maal="revenue growth",
         problem="a growth target that invites empire building: revenue can be bought, value cannot",
         mek=("Paying a premium above what the chains are worth hands value to their shareholders, so the owners lose "
              "while revenue grows. The bigger firm also brings the CEO more pay, status and security."),
         bevis="the 6% fall on each announcement shows the market saw the deals destroy value",
         forslag=("tie the bonus to economic profit or to the share price relative to peers over several years, so "
                  "growth bought at a loss does not pay"),
         bakside=("economic profit rests on an estimated cost of capital the CEO can argue about; pay tied to the share "
                  "price also loads undiversified risk on the CEO."),
         stopp=("acquisitions above a size limit need the shareholders' approval, with the board meeting the largest "
                "institutions before the vote"),
         virker="Owners who see the premium paid could block deals that only buy revenue.",
         type="vekst"),
    dict(navn="Dunholm Distribution Inc.", bransje="wholesale",
         kpi="free cash flow for the year exceeds $300 million",
         hendelse=("With a month left, free cash flow was heading for $280 million. The CEO delayed payments to "
                   "suppliers by sixty days and let inventories run down. Free cash flow ended at $305 million and the "
                   "bonus was paid. The next year suppliers raised their prices and empty shelves cost the company "
                   "sales."),
         tiltak="the delayed payments and the lower inventories", maal="free cash flow",
         problem="a one-year cash-flow target that rewards moving cash between years",
         mek=("Paying suppliers later and running down stock lowered net working capital, so this year's free cash flow "
              "rose while next year's will fall by as much: nothing was created. The higher prices and lost sales that "
              "followed made the move cost value."),
         bevis="the higher supplier prices and lost sales show that value was destroyed",
         forslag="measure free cash flow over three years, so a change in working capital that reverses does not pay",
         bakside="a three-year window can still be gamed at its end.",
         stopp=("the audit committee tracks working capital and supplier terms each quarter and adjusts the bonus for "
                "changes that reverse"),
         virker="A sudden fall in working capital would then be visible before the bonus is paid.",
         type="tid"),
    dict(navn="Pellucid Data Inc.", bransje="data-services",
         kpi="the share price is above $50 on 31 December",
         hendelse=("In early December the share price was $48. The CEO delayed announcing that a large contract had "
                   "been lost until January and bought back shares in December. The price closed the year at $50.40 "
                   "and fell 12% when the loss was announced in January."),
         tiltak="the delayed news and the December buyback", maal="the year-end share price",
         problem=("a target on the share price on a single date, which rewards managing the price on that day rather "
                  "than the value of the firm"),
         mek=("Hiding bad news and timing a buyback pushed the price above $50 for a few weeks, while the value of the "
              "business did not change. Buying back shares at a price that is too high also moves wealth from the "
              "owners who stay to those who sell."),
         bevis="the 12% fall in January shows the year-end price was propped up",
         forslag=("pay in shares that vest over several years and measure the share price as an average over a long "
                  "period, not on one date"),
         bakside="shares load firm-specific risk on a CEO who cannot diversify, which can make the CEO too cautious.",
         stopp="independent directors decide when material news is released and must approve every buyback",
         virker="The CEO could then neither delay the bad news nor time a buyback to the bonus date.",
         type="kurs",
         c_ansvar=("Only partly: the target created the incentive, so the board that designed it shares the blame; but "
                   "holding back material news is manipulation of reporting and can breach disclosure duties, so the "
                   "CEO is not free of blame."),
         c_krit=("Splits the blame: the board designed the incentive, but holding back material news is the CEO's own "
                 "manipulation of reporting and can breach disclosure duties"),
         feil=("<p><b>Typical mistakes:</b> stopping at «the CEO broke the rules». Holding back material news is "
               "manipulation of reporting (one of the agency problems on Kurbatov's list) and can breach disclosure "
               "duties, but the exam point is the incentive the target created. Naming short-termism without the "
               "mechanism also loses points.</p>")),
    dict(navn="Rothwell Services Inc.", bransje="business-services",
         kpi="adjusted EBITDA, before one-off restructuring costs, exceeds $500 million",
         hendelse=("For the third year in a row the CEO booked about $60 million of ordinary IT and staff costs as "
                   "restructuring. Adjusted EBITDA reached $510 million and the bonus was paid, while the cash the "
                   "business produced did not change. Analysts now ignore the company's adjusted figures and its shares "
                   "trade at a discount to its peers."),
         tiltak="booking ordinary costs as restructuring", maal="adjusted EBITDA",
         problem="a target on an adjusted number whose definition the CEO controls",
         mek=("Moving ordinary costs into an excluded category raises the measured number without changing the cash the "
              "business produces. The owners pay a bonus for a relabelling, while trust in the accounts falls."),
         bevis="the discount to peers after analysts stopped trusting the adjusted figures shows the cost",
         forslag=("measure cash flow or EBITDA after all costs over three years, with the audit committee deciding what "
                  "may count as one-off"),
         bakside="any definition leaves some room; strict rules can also punish a real restructuring the firm needs.",
         stopp="the audit committee, with the auditors, decides which costs may be left out of the bonus measure",
         virker="Ordinary costs could then no longer be moved out of the measure.",
         type="regnskap"),
    dict(navn="Fairhaven Brands Inc.", bransje="consumer-goods",
         kpi="quarterly earnings beat the analysts' forecast",
         hendelse=("In the last quarter the CEO cut the marketing budget by 40% and delayed a product launch to the "
                   "following quarter. Earnings beat the forecast by two cents. Over the next year the company lost "
                   "market share."),
         tiltak="the marketing cut and the delayed launch", maal="quarterly earnings",
         problem="a quarterly earnings target that makes the CEO short-termist",
         mek=("Cutting marketing and delaying a launch raise this quarter's earnings by lowering future sales. Nothing "
              "was created: costs and sales were only moved in time, at a loss."),
         bevis="the lost market share shows the cost of the cuts",
         forslag="replace the quarterly bonus with a three-year target on market share and cash flow, paid partly in shares",
         bakside="market share can be bought with price cuts that destroy value, so the new target can be gamed too.",
         stopp=("the board approves the marketing budget and the launch plan, while the firm stops giving quarterly "
                "earnings guidance"),
         virker="Without a quarterly number to beat and with the budget set by the board, the cut would not pay.",
         type="tid"),
    dict(navn="Granmoor Engineering Inc.", bransje="engineering",
         kpi="EPS reaches $4.00",
         hendelse=("EPS was heading for $3.70. The CEO sold the company's most profitable division at a fair price "
                   "to book a one-off accounting gain. EPS ended at $4.10 and the bonus was paid. The next year's "
                   "EPS fell to $3.20."),
         tiltak="the sale of the division", maal="EPS",
         problem="an EPS target that can be hit with a one-off gain",
         mek=("A sale at a fair price creates no value: the firm swaps a division for cash of equal value. The "
              "accounting gain lifts this year's EPS once, while the lost earnings lower EPS in every later year."),
         bevis="the fall in next year's EPS to $3.20 shows the gain was a one-off, not new value",
         forslag="measure EPS before one-off gains and pay part of the bonus in shares that vest over three years",
         bakside="the CEO may relabel ordinary items as one-off; shares also load undiversified risk on the CEO.",
         stopp=("the board must approve asset sales above a size limit, with its audit committee reporting earnings "
                "before one-off gains"),
         virker="Directors would see that the sale only moves this year's EPS and could refuse it.",
         type="regnskap"),
    dict(navn="Tarnwick Mining Inc.", bransje="mining",
         kpi="operating costs come in at least 5% below budget",
         hendelse=("Halfway through the year costs were on budget. The CEO cut safety training and postponed the "
                   "replacement of worn equipment. Costs ended 6% below budget and the bonus was paid. Early the next "
                   "year an accident closed the largest mine for two months."),
         tiltak="the cuts in safety training and equipment", maal="the cost saving",
         problem="a cost target that rewards cuts which only move costs and risks into the future",
         mek=("Skipping training and replacement lowers this year's costs but raises the risk of accidents and repairs "
              "later, so the saving is borrowed from the future. The cost of the closed mine is far larger than what "
              "was saved."),
         bevis="the two-month closure after the accident shows the cuts destroyed value",
         forslag=("replace the cost target with a three-year bonus on cash flow and safety, paid partly in shares and "
                  "with a clawback"),
         bakside="safety numbers can be gamed by under-reporting incidents; a three-year target also still has an end date.",
         stopp="the board's safety committee, with independent inspectors, must approve cuts in training and maintenance",
         virker="Cuts whose only effect is to hit the bonus would then need the consent of people who see the risk.",
         type="tid"),
    dict(navn="Brightline Broadband Inc.", bransje="broadband",
         kpi="the company adds 200 000 new subscribers in the year",
         hendelse=("To reach the target the CEO offered new customers the first year for free. The company added "
                   "210 000 subscribers and the bonus was paid. Most of them left after the free year and margins "
                   "fell."),
         tiltak="the free first year", maal="the number of new subscribers",
         problem="a volume target that rewards growth bought at a loss",
         mek=("Giving the service away wins customers who are worth less than they cost, so the subscriber count rises "
              "while value falls. The target measures how many customers sign up, not what they are worth."),
         bevis="the customers who left after the free year and the lower margins show the growth destroyed value",
         forslag="pay the bonus on customer profitability or cash flow over three years instead of the number of sign-ups",
         bakside="profit measures can be pushed up in the short run by cutting service quality, so they need a long horizon too.",
         stopp="the board must approve large price campaigns and gets a report on how many new customers stay after a year",
         virker="A campaign that buys customers at a loss would then be visible and could be stopped.",
         type="vekst"),
    dict(navn="Silvermoor Biotech Inc.", bransje="biotech",
         lonn=("Most of the CEO's pay is a large grant of stock options with a strike price 30% above today's share "
               "price, expiring in three years."),
         hendelse=("The CEO dropped a portfolio of safer projects and put most of the company's cash into one high-risk "
                   "drug. The share price became very volatile. Two years later the drug failed and the share price "
                   "fell by 40%."),
         tiltak="the single high-risk bet", maal="the value of the CEO's options",
         problem=("an options-heavy contract that rewards risk itself, because the CEO gains from the upside and loses "
                  "nothing below the strike"),
         mek=("An option is worth more when volatility rises, so a bet that makes the firm riskier raises the value of "
              "the CEO's options even if its NPV is lower than that of the safer projects. The owners bear the "
              "downside, while the CEO's payoff stops at zero."),
         bevis="the 40% fall when the drug failed shows the owners carried the cost of the gamble",
         forslag=("replace most of the options with restricted shares that vest over several years plus a golden "
                  "parachute: the shares make the CEO share the downside, while the parachute protects a CEO whose good "
                  "but risky project fails"),
         bakside="a generous parachute rewards failure; shares still load firm-specific risk on the CEO.",
         b_feil="agreeing that a higher strike fixes it; «pay the CEO more»; shares alone, which can make the CEO avoid good risks",
         stopp=("the board's research committee, with outside scientists, must approve putting most of the research "
                "budget into one project"),
         virker="Experts who do not hold the options could judge whether the bet has a positive NPV.",
         type="opsjon",
         qb=("<p>A director proposes to keep the option grants but set an even higher strike price next year. Explain "
             "why this does not solve the problem. Then propose a better design that does not scare the CEO away from "
             "good but risky projects.</p>"),
         b_avvis=("A higher strike does not solve the problem: the options would still pay only on the upside. Further "
                  "out of the money they pay off only after a large rise, which mainly a big gamble can deliver, so the "
                  "pull towards risk gets stronger."),
         b_problem="The problem is the shape of the payoff, not where the strike is set.",
         b_hvorfor=("<p><b>Why a higher strike fails.</b> An option pays only above the strike, so the CEO gains from "
                    "the upside of any risk and loses nothing below it. With a higher strike the options pay off only "
                    "after a large rise. A safe project rarely delivers that; a big gamble sometimes does. The "
                    "incentive to gamble gets stronger.</p>"),
         b_krit1=("Explains why a higher strike does not solve the problem: the options still pay only on the upside; "
                  "deeper out of the money a big gamble becomes even more attractive"),
         b_krit2="Says the problem is the shape of the payoff (upside only), not the level of the strike"),
    dict(navn="Harwood Cement Inc.", bransje="cement",
         kpi="the company's carbon emissions per tonne of cement fall by 20% within the year",
         hendelse=("Instead of investing in cleaner kilns, the CEO sold the company's oldest and most polluting plant at "
                   "a discount to a private buyer, who kept running it. Emissions per tonne fell by 22% and the bonus "
                   "was paid. Two years later the buyer resold the plant for twice the price."),
         tiltak="the sale of the old plant", maal="the emissions measure",
         qa=("Name the problem. Explain why the sale of the old plant met the emissions target without cutting "
             "emissions or creating value."),
         hvordan="Explains how the sale met the target: the plant's emissions moved to another owner",
         problem="a target on one measured number, which the CEO can hit without delivering what the number stands for",
         mek=("Selling the plant moved its emissions to another owner, so the firm's number fell while no emissions "
              "were cut. Selling at a discount also handed value to the buyer."),
         bevis="the resale at twice the price shows the owners lost value on the sale",
         forslag=("tie the ESG bonus to emissions cut in the plants the firm keeps, measured over three years, with any "
                  "plant sale judged separately"),
         bakside=("even ESG pay, which Kurbatov calls «much less abusable than, let's say, EPS», can be gamed, as this "
                  "case shows; long-run targets are also harder to set."),
         stopp="the board must approve sales of plants above a size limit, with an outside valuation",
         virker="A sale at a discount whose only effect is to hit the bonus would then be visible and could be stopped.",
         type="esg"),
]

_LEKSJON2 = {
    "roe": ("<p><b>The fallacy behind it.</b> Leverage raises ROE and EPS whenever the firm earns more on its assets "
            "than it pays in interest, just as MM II says r<sub>E</sub> rises with D/E: the higher return is pay for "
            "higher risk. A firm with 10 shares and earnings of 10 has EPS of 1.00. Borrowing to buy back 2 shares at "
            "a fair price with interest of 1.2 gives EPS = (10 − 1.2)/8 = 1.10, but under MM the share price is "
            "unchanged: the number is higher and riskier, not more valuable (lecture 2).</p>"),
    "vekst": ("<p><b>The lesson.</b> Growth creates value only when the money spent earns more than the cost of "
              "capital. Growth bought with premiums or free offers destroys it.</p>"),
    "kurs": ("<p><b>The lesson.</b> A price on one day can be moved by timing news and buybacks. Value over several "
             "years cannot.</p>"),
    "opsjon": ("<p><b>The lesson.</b> Options reward the upside only, so they push the CEO towards risk of any kind, "
               "bad bets included. Shares make the CEO share both sides; a golden parachute can then protect a CEO who "
               "takes a good risk that fails.</p>"),
    "esg": ("<p><b>The lesson.</b> Even a target that measures something good can be met by moving the number instead "
            "of the thing it stands for. Kurbatov calls ESG pay «much less abusable than, let's say, EPS», not "
            "impossible to abuse.</p>"),
    "tid": ("<p><b>The lesson.</b> Costs, sales and cash can be moved between periods. A one-period target rewards the "
            "move, not the value.</p>"),
    "ratio": ("<p><b>The lesson.</b> A ratio can be raised by doing less: turning down projects that earn more than the "
              "cost of capital but less than the current average. Value is NPV, not the average return.</p>"),
    "regnskap": ("<p><b>The lesson.</b> Accounting numbers can move without cash or value moving: one-off gains, costs "
                 "moved between categories, changed definitions. Value depends on the cash the business will "
                 "produce.</p>"),
}
_B_FEIL = "agreeing that a harder target fixes it; «pay the CEO more»; a design the action in the case could still move"
_FEIL2 = {
    "roe": "saying the buyback created value because ROE rose; forgetting that the higher return is the price of more risk",
    "vekst": "treating revenue or customer growth as value; ignoring the premium or the cost per customer",
    "opsjon": ("saying the CEO broke the contract; saying all risk-taking is bad for the owners (a good risky project is "
               "welcome; the problem is a bet with a lower NPV)"),
    "esg": "concluding that ESG targets are useless; ignoring the discount on the sale",
    "tid": "saying the cut saved money; forgetting what it cost later",
    "ratio": "saying a high ROIC means high value; forgetting the cost of capital",
    "regnskap": "calling it fraud, although it may be within the rules; treating the reported number as cash",
}


@oppgave("ov-gov2", tema="governance", tittel="Paying the CEO: targets and short-termism", antall=12,
         sjanger="d3-eierverktoy", kilde="Lecture 13 (contracts, the owner template), lecture 14 wrap-up (KPIs)")
def _(r):
    v = r.choice(LONN2)
    fi = v["navn"]
    bonus = _fast(fi).choice(["twice the salary", "one and a half times the salary", "$2 million", "$3 million"])
    lonn = v.get("lonn") or f"The CEO receives a fixed salary plus a cash bonus of {bonus} if {v['kpi']}."
    case = (f"<p>{fi} is a listed {v['bransje']} company with dispersed ownership. {lonn}</p><p>{v['hendelse']}</p>")
    qa = v.get("qa") or f"Name the problem. Explain why {v['tiltak']} raised {v['maal']} without creating value."
    hvordan = v.get("hvordan") or f"Explains how {v['tiltak']} raised {v['maal']}"
    feil = v.get("feil") or f"<p><b>Typical mistakes:</b> {_FEIL2[v['type']]}.</p>"

    # ---------------- (a)
    a = tekst_del(
        "a", poeng=4,
        q=f"<p>{qa}</p>",
        setninger="Answer in at most three sentences.",
        kort=f"<p>The problem is {v['problem']}. {v['mek']}</p>",
        losning=(f"<p><b>The mechanism.</b> Pay changes what the CEO wants: the CEO maximises what the contract "
                 f"rewards. A reward tied to a number that can move without the firm becoming more valuable invites the "
                 f"CEO to move the number. Kurbatov's wrap-up: targets and KPIs make the manager short-termist, for "
                 f"example buybacks to hit an EPS target.</p>"
                 f"<p><b>In this case.</b> {v['mek']}</p>"
                 + _LEKSJON2[v["type"]]
                 + feil
                 + "<p><b>Remember:</b> name the problem, then show why the number moved while the value did not.</p>"),
        kriterier=[
            _krit(f"Names the problem: {v['problem']}"),
            _krit(hvordan),
            _krit("Explains why no value was created (or value was destroyed) in this case"),
            _krit(f"Uses the evidence in the case: {v['bevis']}"),
        ],
    )

    # ---------------- (b)
    qb = v.get("qb") or ("<p>A director proposes to keep the bonus scheme but make the target harder to reach next "
                         "year. Explain why this does not solve the problem. Then propose a better design that does "
                         "not scare the CEO away from good but risky projects.</p>")
    avvis = v.get("b_avvis") or (f"A harder target does not solve the problem: the CEO could still move {v['maal']} "
                                 f"without creating value. With a higher bar the honest path reaches the bonus less "
                                 f"often, so the trick becomes more tempting, not less.")
    problem_b = v.get("b_problem") or "The problem is what is measured and over what horizon, not how high the bar is."
    hvorfor_b = v.get("b_hvorfor") or ("<p><b>Why a harder target fails.</b> A bonus paid when a number passes a "
                                       "threshold rewards whatever moves the number past it. A higher threshold leaves "
                                       "every trick in place; when the honest path falls short more often, more of "
                                       "the bonus depends on tricks. Kurbatov on contracts: «if there is something to "
                                       "abuse, people will try to abuse it».</p>")
    b = tekst_del(
        "b", poeng=4,
        q=qb,
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>{avvis} {problem_b} A better design is to {v['forslag']}; a good long-term project still pays off "
              f"for the CEO through it, so the CEO is not scared away from good risks.</p>"),
        losning=(hvorfor_b
                 + "<p><b>What a good design does.</b> It measures something only real value moves (value per share, "
                   "relative total shareholder return, economic profit, a long-term or ESG measure), over a horizon "
                   "long enough that tricks reverse, with clawbacks for gains that later disappear. Kurbatov on ESG "
                   "pay: «much less abusable than, let's say, EPS».</p>"
                   "<p><b>«Without scaring».</b> Kurbatov's owner template, tried in class, asks for measures that make "
                   "the manager act for the shareholders «but not scare them too much». Shares with long vesting keep "
                   "the upside; harsher penalties alone make the CEO avoid risk. In an R&amp;D-heavy firm a golden "
                   "parachute makes sure «the CEO will not be afraid to take those risks».</p>"
                 + f"<p><b>In this case.</b> A better design: {v['forslag']}. Its weak spot: {v['bakside']}</p>"
                 + f"<p><b>Typical mistakes:</b> {v.get('b_feil') or _B_FEIL}.</p>"
                   "<p><b>Remember:</b> a contract is a measuring stick. Fix what it measures, not how high the bar "
                   "is.</p>"),
        kriterier=[
            _krit(v.get("b_krit1") or ("Explains why a harder target does not solve the problem: the CEO can still "
                                       "move the number without creating value; a higher bar makes the trick more "
                                       "tempting, not less")),
            _krit(v.get("b_krit2") or "Says the problem is what is measured and over what horizon, not the level of "
                                      "the target"),
            _krit(f"Proposes a better design that the action in the case could not move (for example: {v['forslag']})"),
            _krit("Explains why the design does not scare the CEO away from good risky projects: the CEO keeps the "
                  "upside of good long-term projects (shares or a long-term measure rather than harsher penalties; a "
                  "golden parachute in an R&amp;D-heavy firm)"),
        ],
    )

    # ---------------- (c)
    ansvar = v.get("c_ansvar") or ("Largely yes: the CEO responded to the incentive the board designed, as agency "
                                   "theory predicts, so the main responsibility lies with the board, which writes the "
                                   "contract and watches what moves the number.")
    c = tekst_del(
        "c", poeng=4,
        q=("<p>The CEO defends the action: «I only did what my contract paid me to do.» Is the CEO right that the "
           "problem lies in the contract? Say what the board should have done before the action without making the "
           "CEO passive.</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>{ansvar} Before the action the board should have used its own tools: {v['stopp']}. {v['virker']} "
              f"It should approve the big actions that can move the CEO's pay, not every decision, since a CEO who "
              f"is second-guessed on everything turns passive.</p>"),
        losning=("<p><b>Why the contract.</b> The CEO is an agent who maximises what the contract rewards. Designing "
                 "the contract and watching what it does is the board's job, through an independent compensation "
                 "committee. Kurbatov: a good contract «will not be one page», since every loophole needs its own "
                 "clause.</p>"
                 "<p><b>Tools that score.</b> Kurbatov graded the owner template live: an independent board is «one "
                 "of the first check marks»; a suggestion to get shareholders to vote earned «my question is how», so "
                 "say how: meet the largest institutions before the annual meeting. Better communication and "
                 "transparency, such as separate reporting of one-off items, Kurbatov called «good». Other monitors: "
                 "the auditors; lenders, whose covenants can limit buybacks, debt and asset sales; large shareholders "
                 "voting on pay; analysts and the press. SOX (2002) made auditors more independent and makes the CEO "
                 "and CFO answer for the accounts; Dodd-Frank (2010) required independent pay committees.</p>"
                 "<p><b>The limit.</b> Kurbatov: «Monitor someone too harshly, they will be just not doing anything». "
                 "Approve the big actions that can move the CEO's pay, not every decision: the aim is a CEO watched "
                 "closely enough not to abuse the contract, but not so tightly that the CEO stops taking risks.</p>"
                 "<p><b>Typical mistakes:</b> blaming only the CEO, which misses the incentive; «monitor everything», "
                 "which makes the CEO passive; a tool that could not have stopped the action in the case.</p>"
                 "<p><b>Remember:</b> the board designs the incentives and owns the result.</p>"),
        kriterier=[
            _krit(v.get("c_krit") or ("Agrees that the main problem lies in the contract and with the board: the CEO "
                                      "responded to the incentives the board designed, as agency theory predicts")),
            _krit(f"Names a board tool that would have stopped the action (for example: {v['stopp']})"),
            _krit("Explains how that tool would have stopped the action"),
            _krit("Explains how to avoid a passive CEO: approve the big actions that can move the CEO's pay rather "
                  "than every decision, since monitoring too harshly makes the CEO do only the bare minimum"),
        ],
    )
    return ovelse(case, [a, b, c])


# ---------------------------------------------------------------------------
# ov-gov3 · Aktivister, oppkjøpsforsvar og stemmerådgivere
# ---------------------------------------------------------------------------
FORSVAR3 = {
    "nolpill": dict(
        tekst=("adopts, without a shareholder vote, a poison pill that is triggered if anyone's stake rises above 4.9% "
               "or if a holder already above that level, such as the fund, buys more: every other shareholder may "
               "then buy new shares at half price"),
        mek=("The pill dilutes anyone whose stake rises above 4.9% and any holder above that level who buys more, so "
             "the fund cannot add to its stake and other investors cannot build large stakes to back it"),
        tekst_l=("<p><b>When it is credible.</b> Tax losses are an asset that a change of owners can erase, so a "
                 "low-threshold pill can protect them. Kurbatov's condition: a firm with «nice managers, very "
                 "transparent, no multi-class share structure» and big losses. Ford's pill failed the test: the family "
                 "held 40% of the votes with 3% of the equity, so the losses were hardly at risk. Kurbatov: the pill "
                 "was «just entrenching the inefficient management»; the market punished Ford hard.</p>")),
    "pillkultur": dict(
        tekst=("adopts, without a shareholder vote, a poison pill that is triggered if anyone buys more than {t}% of "
               "the shares: every other shareholder may then buy new shares at half price"),
        mek=("The pill dilutes anyone who buys more than {t}% of the shares, so the fund cannot build a larger stake "
             "and no one can buy control without the board's consent"),
        troverdig=("the owners' approval and a short sunset, or a pill that lapses for a fully financed offer to all "
                   "shareholders, so that it buys time to bargain without blocking the owners"),
        tekst_l=("<p><b>When it is credible.</b> In Kurbatov's Twitter example the board adopted a pill overnight to "
                 "protect its culture; it forced the bidder to the table and a better deal followed. That is the "
                 "bargaining reading. It needs a bidder: against an owner who wants a new strategy, a pill only "
                 "protects the board. The owners' approval and a sunset make the bargaining reading credible.</p>")),
    "staggered": dict(
        tekst="asks the annual meeting to stagger the board, so that only a third of the directors are elected each year",
        mek=("With a third of the seats up each year, the fund would need two annual meetings to win a majority of the "
             "board, which delays its plan by years"),
        tekst_l=("<p><b>When it is credible.</b> Kurbatov's exception: protection can create value in a firm with an "
                 "«absolutely crystal clear reputation, very transparent long-term vision» and stable owners, such as "
                 "year 7 of 10 towards a cancer cure, where the owners may ratify the defence themselves. Otherwise a "
                 "staggered board mainly protects weak managers: «we cannot just kick them because now the board is "
                 "staggered».</p>")),
    "fallskjerm": dict(
        tekst=("gives the CEO a payment of three times annual pay if the CEO loses the job after the fund or a bidder "
               "gains control of the board"),
        mek=("The payment makes it more expensive for the fund or a bidder to replace the CEO after winning control, "
             "which weakens the threat the campaign relies on"),
        troverdig=("an R&amp;D-heavy firm that needs bold risks, with a payment the owners approve in advance rather "
                   "than one granted in the middle of a fight"),
        tekst_l=("<p><b>When it is credible.</b> Kurbatov: in an R&amp;D-heavy firm a golden parachute makes sure «the "
                 "CEO will not be afraid to take those risks». In «a super well established business where you don't "
                 "want to take risks» it does not belong. Granted in the middle of a fight, it raises the cost of "
                 "replacing the CEO and shows a board that protects the CEO.</p>")),
    "dualclass": dict(
        tekst=("proposes to turn the founding family's shares into B shares with ten votes each, which would give the "
               "family most of the votes"),
        mek="With ten votes per B share the family would hold most of the votes, so the fund could not change the board without the family",
        troverdig=("B shares issued when the firm raises capital from investors who know the terms, with a sunset, for "
                   "a family whose record and plan the owners trust"),
        tekst_l=("<p><b>When it is credible.</b> Kurbatov on dual-class shares: «not a completely stupid measure. It "
                 "also has its benefits», since Ford raised capital while the family kept control. Set up when "
                 "investors buy in knowing the terms, they can protect a founder's long-term plan. Imposed on existing "
                 "owners during a fight, they switch off the vote and the takeover threat.</p>")),
    "hvitvenn": dict(
        tekst=("sells new preferred shares carrying 15% of the votes to {venn}, a friendly investor that agrees to vote "
               "with the board for five years"),
        mek=("{venn} gets 15% of the votes and has promised to vote with the board, so the fund needs a much larger "
             "share of the remaining votes, while the other owners are diluted"),
        troverdig="shares sold on market terms to investors who vote freely, or an issue the owners approve",
        tekst_l=("<p><b>When it is credible.</b> A friendly investor that buys a block with votes and sides with the "
                 "board is called a white squire. If the shares are sold below their value, the other owners also "
                 "lose wealth. The test is whether the firm needed the money on these terms or the board needed the "
                 "votes.</p>")),
}

AKTIV3 = [
    dict(navn="Harrowfield Motors Inc.", bransje="automotive", lag=30, aar=5, fond="Arncliffe Capital", andel=6,
         ekstra=("The company has $6 billion of tax losses from past years that it can deduct from future profits, "
                 "but it has made a loss in each of the last five years and does not expect a taxable profit for at "
                 "least a decade."),
         krav="cancel a $4 billion plant for a model that dealers say they cannot sell", G=20,
         P0=40.00, p=0.30, p2=0.10, R=30, forsvar="nolpill",
         grunn="the pill protects the $6 billion of tax losses, which the company could lose if large new owners bought in",
         hvorfor=("Tax losses that cannot be used for a decade are worth far less than their face value, so the pill "
                  "protects little; adopted without a vote right after the fund's demands, it reads as a shield for "
                  "the board."),
         troverdig=("large losses the company expects to use soon, transparent managers and no dual-class shares "
                    "(Kurbatov's conditions for an NOL pill), ideally with the owners' approval")),
    dict(navn="Brindlemoor Air Inc.", bransje="airline", lag=25, aar=4, fond="Brantwood Partners", andel=7,
         ekstra=("The company has $2.5 billion of tax losses from loss-making years that it can deduct from future "
                 "profits. It has one class of shares."),
         krav="retire its oldest planes and drop the routes that have lost money for five years", G=24,
         P0=25.00, p=0.25, p2=0.10, R=25, forsvar="nolpill",
         grunn=("the pill protects the $2.5 billion of tax losses, which the company could lose if large new owners "
                "bought in"),
         hvorfor=("The losses are real and there is one class of shares, but a pill adopted without a vote right after "
                  "the fund's demands, with a trigger that also caps the fund, tells the market that it mainly "
                  "protects the board."),
         troverdig=("the owners' approval, a sunset and a trigger that does not catch shareholders who merely vote "
                    "together, so the pill protects the losses without blocking the campaign")),
    dict(navn="Calderbrook Software Inc.", bransje="software", lag=20, aar=3, fond="Cobalt Ridge Capital", andel=5,
         ekstra="", krav="stop spending $1 billion a year on a hardware venture that has never made money", G=15,
         P0=60.00, p=0.40, p2=0.20, R=20, forsvar="pillkultur", t=10,
         grunn="the pill protects the company's culture and engineers from an owner who does not understand software",
         hvorfor=("No one is bidding, so there is no bidder to bring to the table as in Kurbatov's Twitter example; the "
                  "pill mainly caps the fund's stake and shields the board from its own owners.")),
    dict(navn="Dorrington Media Inc.", bransje="media", lag=35, aar=5, fond="Dunlin Partners", andel=6,
         ekstra="", krav="split the roles of CEO and chair and tie the CEO's pay to total shareholder return", G=25,
         P0=32.00, p=0.35, p2=0.15, R=35, forsvar="pillkultur", t=12,
         grunn="the pill protects the independence and culture of the company's newsrooms",
         hvorfor=("The fund asks for an independent chair and pay tied to returns, which threatens no newsroom; with "
                  "no bidder to bring to the table, the pill mainly shields the board from its own owners.")),
    dict(navn="Elsworth Pharma Inc.", bransje="pharmaceutical", lag=28, aar=4, fond="Elmhurst Capital", andel=8,
         ekstra="Its ten-year programme for a new heart drug is in year six and has missed its last two milestones.",
         krav="license the heart-drug programme to a larger partner instead of funding it alone", G=18,
         P0=50.00, p=0.30, p2=0.10, R=30, forsvar="staggered",
         grunn="the company needs a stable board to complete the ten-year programme",
         hvorfor=("Unlike Kurbatov's cancer-drug firm, on track in year 7 of 10 with owners «100% on board», this "
                  "programme has missed two milestones and an 8% owner wants another plan: the owners are not on "
                  "board."),
         troverdig=("a programme on track with milestones the owners can check, owners who back the plan and a sunset "
                    "on the staggered board")),
    dict(navn="Fernleigh Paper Inc.", bransje="paper", lag=22, aar=6, fond="Fallowfield Partners", andel=5,
         ekstra="", krav="close its two oldest mills, which have lost money for five years", G=12.5,
         P0=80.00, p=0.40, p2=0.25, R=20, forsvar="fallskjerm",
         grunn="the CEO must not be afraid to take the risks needed to grow the business",
         hvorfor=("Kurbatov's case for a golden parachute is an R&amp;D-heavy firm that needs breakthrough after "
                  "breakthrough, not a mature paper business; granted in the middle of the fight, the payment mainly "
                  "makes the CEO harder to replace.")),
    dict(navn="Glenwood Brewing Inc.", bransje="brewing", lag=26, aar=4, fond="Greywater Capital", andel=6,
         ekstra="The founding family owns 12% of the shares.",
         krav="stop the expansion into spirits and add two independent directors", G=20,
         P0=15.00, p=0.50, p2=0.20, R=25, F=12, forsvar="dualclass",
         grunn="the family's long-term vision must be protected from short-term investors",
         hvorfor=("Dual-class shares can help when they let a founder raise capital and keep control, as at Ford, but "
                  "created now, in answer to an activist after years of lagging returns, they would mainly shield "
                  "the incumbents.")),
    dict(navn="Hexham Engineering Inc.", bransje="engineering", lag=24, aar=5, fond="Hawkridge Capital", andel=5,
         ekstra="",
         krav=("end a $200 million-a-year contract with a supplier owned by the CEO's brother and put the work out to "
               "tender"), G=20,
         P0=45.00, p=0.25, p2=0.05, R=35, forsvar="fallskjerm",
         grunn="the CEO must not be afraid to take the risks the business needs",
         hvorfor=("Kurbatov's case for a golden parachute is an R&amp;D-heavy firm that needs breakthrough after "
                  "breakthrough, not a mature engineering firm; granted right after the fund questioned the contract "
                  "with the CEO's brother, the payment protects the CEO the owners want to hold to account.")),
    dict(navn="Inglesby Retail Inc.", bransje="retail", lag=32, aar=5, fond="Inchmore Partners", andel=7,
         ekstra="", krav="close 150 loss-making stores and move more of its sales online", G=25,
         P0=36.00, p=0.20, p2=0.05, R=25, forsvar="hvitvenn", venn="Norland Holdings",
         grunn="the company needs the money to modernise its stores",
         hvorfor=("Money can be raised without handing a friend 15% of the votes and a promise to vote with the board, "
                  "so an issue right after the fund's demands looks like buying votes, not raising money.")),
    dict(navn="Jarrow Shipping Inc.", bransje="shipping", lag=18, aar=3, fond="Jetty Point Capital", andel=6,
         ekstra="", krav="stop ordering new ships at the top of the market", G=10,
         P0=70.00, p=0.60, p2=0.30, R=20, forsvar="hvitvenn", venn="Saltire Holdings",
         grunn="the company needs the money for its fleet plan",
         hvorfor=("The fleet plan is the very spending the fund wants to stop; money could be raised without handing a "
                  "friend 15% of the votes and a voting promise, so the issue looks like buying votes for the "
                  "board.")),
    dict(navn="Kittering Telecom Inc.", bransje="telecom", lag=30, aar=4, fond="Kinloch Partners", andel=6,
         ekstra="The founding family owns 15% of the shares.",
         krav="stop bidding for spectrum at prices above the company's own valuation", G=25,
         P0=28.00, p=0.40, p2=0.15, R=35, F=15, forsvar="dualclass",
         grunn="the family's long-term vision must be protected from short-term investors",
         hvorfor=("Unlike at Ford, no capital is raised; B shares created in answer to an activist after years of "
                  "lagging returns would mainly shield the incumbents from the vote and from takeovers.")),
    dict(navn="Lambourne Hotels Inc.", bransje="hotel", lag=20, aar=4, fond="Larchmont Capital", andel=5,
         ekstra="Its five-year renovation programme is two years behind schedule.",
         krav="replace two directors who also sit on the boards of the company's main suppliers", G=20,
         P0=55.00, p=0.30, p2=0.10, R=20, forsvar="staggered",
         grunn="the company needs a stable board to finish its five-year renovation programme",
         hvorfor=("Kurbatov's exception needs an «absolutely crystal clear reputation», a transparent long-term vision "
                  "and owners who back the plan; a programme two years late and an owner asking for change point the "
                  "other way."),
         troverdig=("a programme on schedule with milestones the owners can check, owners who back the plan and a "
                    "sunset on the staggered board")),
]


def _usd(x):
    return f"${x:,.2f}"


@oppgave("ov-gov3", tema="governance", tittel="An activist, a defence and the vote", antall=12,
         sjanger="d3-eierverktoy",
         kilde=("Lecture 13 (shareholder action, proxy advisers, entrenchment, the NOL pill), lecture 12 (hostile "
                "takeovers, the Twitter pill, implied probabilities)"))
def _(r):
    v = r.choice(AKTIV3)
    fi = v["navn"]
    fond = v["fond"]
    radgiver = _fast(fi).choice(["ISS", "Glass Lewis"])
    rad_gen = radgiver + "'s"
    f = FORSVAR3[v["forsvar"]]
    par = dict(t=v.get("t", 10), venn=v.get("venn", ""))
    forsvar_tekst = f["tekst"].format(**par)
    mek = f["mek"].format(**par)
    troverdig = v.get("troverdig") or f["troverdig"]
    andel, G, R = v["andel"], v["G"], v["R"]
    P0, p, p2 = v["P0"], v["p"], v["p2"]
    gain = round(G / 100 * P0, 2)
    P1 = round(P0 + p * gain, 2)
    P2 = round(P0 + p2 * gain, 2)
    if abs((P1 - P0) / gain - p) > 1e-9 or abs((P2 - P0) / gain - p2) > 1e-9:
        raise ValueError(f"{fi}: prisene gir ikke sannsynlighetene eksakt")
    G_t = f"{G:g}%"
    # Stemmene per 100 stemmer: småaksjonærer, institusjoner og en eventuell blokk som stemmer fullt
    # (familien med sine aksjer, eller den hvite væpneren med 15 % av stemmene etter emisjonen).
    if v.get("F"):
        B, blokk = v["F"], "the family"
    elif v["forsvar"] == "hvitvenn":
        B, blokk = 15, v["venn"]
    else:
        B, blokk = 0, ""
    I = 100 - R - B
    Rv = round(R * 0.30, 2)
    Iv = round(I * 0.78, 2)
    tot = round(Rv + Iv + B, 2)
    x = Iv / tot
    if R >= B + Iv:
        raise ValueError(f"{fi}: småaksjonærene kan avgjøre alene")
    if v.get("F"):
        stemmer = (f"Retail investors own {R}% of the shares and institutions {I}%; the family owns the remaining "
                   f"{B}% and votes all of it. About 30% of the retail shares are usually voted, against about 78% of "
                   f"the institutional shares.")
    elif B:
        stemmer = (f"After the issue, {blokk} holds 15% of the votes, retail investors {R}% and institutions {I}%. "
                   f"About 30% of the retail votes are usually cast, against about 78% of the institutional votes; "
                   f"{blokk} casts all of its votes.")
    else:
        stemmer = (f"Retail investors own {R}% of the shares and institutions the rest. About 30% of the retail shares "
                   f"are usually voted, against about 78% of the institutional shares.")
    ledd = [f"institutions cast {I} × 0.78 = {Iv:g}", f"retail investors {R} × 0.30 = {Rv:g}"]
    if B:
        ledd.append(f"{blokk} {B}")
    ledd_tekst = ", ".join(ledd[:-1]) + " and " + ledd[-1]
    ekstra = f" {v['ekstra']}" if v["ekstra"] else ""
    case = (f"<p>{fi} is a listed {v['bransje']} company with dispersed ownership. Its shares have lagged its peers by "
            f"{v['lag']}% over {v['aar']} years.{ekstra}</p>"
            f"<p>The share price was {_usd(P0)} when {fond}, an activist fund, disclosed that it had bought {andel}% "
            f"of the shares. The fund demands that the board {v['krav']}. It estimates that its plan, if carried out, "
            f"would raise the value of {fi} by {G_t}. The share price rose to {_usd(P1)} that day.</p>"
            f"<p>The board refuses and {forsvar_tekst}. The board's stated reason is that {v['grunn']}. The share "
            f"price fell to {_usd(P2)} on the announcement.</p>"
            f"<p>At the coming annual meeting the fund will nominate two directors. {stemmer} Many institutions "
            f"follow the proxy adviser {radgiver}.</p>")

    # ---------------- (a)
    a = tekst_del(
        "a", poeng=4,
        q=(f"<p>Why did the share price rise from {_usd(P0)} to {_usd(P1)} on the day the stake was disclosed, "
           f"although nothing had changed at {fi} yet? If the rise reflects only the chance that the fund's plan is "
           f"carried out, what probability does the market assign to it? What does your answer say about "
           f"{gen(fi)} managers?</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>The price is the present value of expected cash flows, so the market prices at once the chance that "
              f"a large, active owner forces changes that raise value. The gain if the plan works is {G_t} × "
              f"{_usd(P0)} = {_usd(gain)}, so the probability is ({_usd(P1)} − {_usd(P0)})/{_usd(gain)} = {p:.4f}. "
              f"The market accepts that the managers leave about {G_t} of the value on the table, an agency cost, but "
              f"expects the board to resist, so only {p * 100:.0f}% of the gain is in the price.</p>"),
        losning=(f"<p><b>Why the price moves at once.</b> A share price is the present value of the cash flows "
                 f"investors expect. When an owner with a large stake and a plan arrives, investors add the value of "
                 f"the changes it may force, weighted by the chance it succeeds. Nothing has to change at the firm "
                 f"first: the expectation changes. Kurbatov: active shareholders «play a huge role, especially if "
                 f"they're institutions».</p>"
                 f"<p><b>Step 1: the gain if the plan works.</b> {G_t} × {_usd(P0)} = {_usd(gain)} per share.</p>"
                 f"<p><b>Step 2: the probability.</b> If the rise reflects only the plan, P<sub>1</sub> = P<sub>0</sub> "
                 f"+ p × gain, so p = ({_usd(P1)} − {_usd(P0)})/{_usd(gain)} = {p:.4f}. The same logic gives the "
                 f"market's implied probability that a merger closes (lecture 12).</p>"
                 f"<p><b>What it says.</b> The market accepts that the managers leave value on the table: the agency "
                 f"cost that governance is about. A probability of {p:.4f} says it also expects resistance from a board "
                 f"that refuses, from defences and from a vote the fund may lose. The split rests on the fund's "
                 f"estimate of the gain: if investors think the plan is worth less, the implied probability is "
                 f"higher.</p>"
                 f"<p><b>First check.</b> The probability must lie between 0 and 1. A rise larger than the gain would "
                 f"mean the market prices something else too, such as a takeover bid.</p>"
                 f"<p><b>Typical mistakes:</b> explaining the rise by the fund's own buying (the price jumped when the "
                 f"news came out); dividing by the new price instead of by the gain; reading the probability as the "
                 f"chance that the plan is good rather than the chance that it is carried out.</p>"
                 f"<p><b>Remember:</b> price change = probability × gain.</p>"),
        kriterier=[
            _krit("Explains the rise: the price reflects expected future cash flows, so the market prices at once the "
                  "chance that a large active owner forces changes that raise value"),
            _krit(f"Finds the probability: ({_usd(P1)} − {_usd(P0)})/({G_t} × {_usd(P0)}) = {p:.4f}"),
            _krit(f"Says what the {G_t} gain implies: the market believes the managers leave value on the table (an "
                  f"agency cost)"),
            _krit("Interprets the probability below one: the market expects resistance from the board or a lost vote, "
                  "so only part of the gain is in the price"),
        ],
    )

    # ---------------- (b)
    b = tekst_del(
        "b", poeng=4,
        q=(f"<p>When the board announced its response, the share price fell to {_usd(P2)}. Explain how the response "
           f"works against the fund. With the same assumption as in (a), what does the fall imply for the probability "
           f"that the plan is carried out? Does the market seem to believe the board's stated reason? What would have "
           f"made it credible?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (a): the market assigned a probability of {p:.4f} to the fund's plan.</p>",
        kort=(f"<p>{mek}. The probability is now ({_usd(P2)} − {_usd(P0)})/{_usd(gain)} = {p2:.4f}, down from "
              f"{p:.4f}, so the market reads the response mainly as a shield against the fund. {v['hvorfor']} What "
              f"would have made the reason credible: {troverdig}.</p>"),
        losning=(f"<p><b>How it works.</b> {mek}. Defences slow down or switch off the market for corporate control, "
                 f"which Kurbatov calls «one of the strongest forms of monitoring for corporate managers». Many also "
                 f"weaken the vote.</p>"
                 f"<p><b>Step 1: the new probability.</b> With the same assumption as in (a), p = (P<sub>2</sub> − "
                 f"P<sub>0</sub>)/gain = ({_usd(P2)} − {_usd(P0)})/{_usd(gain)} = {p2:.4f}. The response cut the "
                 f"market's estimate of the chance that the plan is carried out from {p:.4f} to {p2:.4f}.</p>"
                 f"<p><b>Step 2: the stated reason.</b> Had the market believed that the benefit the board names "
                 f"outweighs the cost to the owners, the price would not have fallen. {v['hvorfor']}</p>"
                 + f["tekst_l"]
                 + "<p><b>Typical mistakes:</b> measuring from the price after the disclosure instead of from the "
                   "undisturbed price (that gives the change in the probability, not its new level); accepting the "
                   "board's reason without testing it against the case; calling every defence illegal; a one-sided "
                   "answer.</p>"
                   "<p><b>Remember:</b> a price that falls on a defence says the market sees a shield for the board, "
                   "not a benefit for the owners.</p>"),
        kriterier=[
            _krit(f"Explains how the response works against the fund: {_liten_trygg(mek)}"),
            _krit(f"Finds the new probability: ({_usd(P2)} − {_usd(P0)})/{_usd(gain)} = {p2:.4f}, down from {p:.4f}"),
            _krit(f"Concludes that the market does not believe the stated reason and explains why with the case: "
                  f"{_liten_trygg(v['hvorfor']).rstrip('.')}"),
            _krit(f"Says what would have made the reason credible: {troverdig}"),
        ],
    )

    # ---------------- (c)
    c = tekst_del(
        "c", poeng=4,
        q=(f"<p>What share of the votes cast do the institutions hold? What does that mean for how {fond} should "
           f"campaign before the meeting? What is the risk when many institutions follow {rad_gen} guidelines?</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>Per 100 votes, {ledd_tekst}, so the institutions hold {Iv:g}/{tot:g} = {x:.4f} of the votes cast; "
              f"even if every retail vote were cast for the fund, it would still need the institutions to win. {fond} "
              f"must therefore campaign where the votes "
              f"are: meet the largest institutions and {radgiver} before the meeting with its plan and its two "
              f"candidates. The risk is that {radgiver} applies one-size-fits-all guidelines that miss facts specific "
              f"to {fi} and may cater to the largest institutions, while many holders simply follow it, so the vote "
              f"may turn on a checklist rather than on the plan's value.</p>"),
        losning=(f"<p><b>Step 1: votes cast per 100 votes.</b> Retail: {R} × 0.30 = {Rv:g}. Institutions: {I} × "
                 f"0.78 = {Iv:g}."
                 + (f" {_stor(blokk)}: {B}, since it casts all its votes." if B else "")
                 + f" Total: {tot:g}.</p>"
                 f"<p><b>Step 2: the institutions' share.</b> {Iv:g}/{tot:g} = {x:.4f}. Even if every retail vote were "
                 f"cast for the fund, that is only {R} of {R + B + Iv:g} votes: the fund still needs the institutions."
                 + (f" With {gen(blokk)} {B} votes {'likely ' if v.get('F') else ''}on the board's side, it needs a "
                    f"clear majority of them." if B else "")
                 + f" The figures "
                 f"are Kurbatov's from Broadridge's report: retail investors own about 30% of shares and only about 30% "
                 f"of them vote, while 22% of institutional shares were not voted in 2024, so «institutions can easily "
                 f"overpower them».</p>"
                 f"<p><b>How to campaign.</b> Go where the votes are: meet the largest institutions and the proxy "
                 f"advisers, publish the plan and nominate candidates whose independence and skills the institutions can "
                 f"check. Kurbatov's advice to owners who want institutions to vote is the same: invite them to "
                 f"meetings at the headquarters, since small retail holders are hard to reach.</p>"
                 f"<p><b>The risk.</b> The advisers' guidelines are «one size fits all»: they omit facts that set a firm "
                 f"apart. There is also some evidence that the advice caters to the bigger institutions. Many investors "
                 f"simply follow it. Index funds hold the stock because it is in the index and have little reason to "
                 f"study the campaign. Kurbatov's advice: use the guidelines, but «think with your own brain».</p>"
                 f"<p><b>Typical mistakes:</b> using votes held instead of votes cast (retail investors hold {R}% of "
                 f"the votes but cast only {Rv / tot * 100:.1f}% of the votes cast); blaming the adviser without saying what "
                 f"the fund can do; a risk with no mechanism.</p>"
                 f"<p><b>Remember:</b> count votes cast, not shares owned; then campaign where the votes are.</p>"),
        kriterier=[
            _krit(f"Finds the institutions' share of the votes cast: {Iv:g}/{tot:g} = {x:.4f}"),
            _krit("Concludes that the retail votes cannot decide: even if every retail vote were cast for the fund, it "
                  "would still need the institutions"),
            _krit("Says how the fund should campaign: meet the largest institutions and the proxy adviser before the "
                  "meeting with its plan and candidates, or another concrete step aimed at the institutions"),
            _krit("Names the risk: one-size-fits-all guidelines that miss firm-specific facts, advice that may cater to "
                  "the largest institutions or holders who follow without analysis, so the vote may not reflect the "
                  "plan's value"),
        ],
    )
    return ovelse(case, [a, b, c])


# ---------------------------------------------------------------------------
# ov-gov4 · Motivene for M&A, aksjonærer mot interessenter
# ---------------------------------------------------------------------------
GODE_MOTIV = {
    "disiplin": "a disciplinary takeover (replacing weak managers)",
    "fotfeste": "a foothold in a new market",
    "patent": "patents, technology or skilled people",
    "ressurs": "scarce resources",
    "makt": "market power",
    "verdi": "buying an undervalued target with better information",
    "vertikal": "removing a supplier's margin or hold-up (vertical integration)",
}

MOTIV4 = [
    dict(navn="Easterby Group Inc.", bransje="industrial", maal="Bellamy Foods", by="Midvale", eget=[],
         sitat="The deal makes us safer: food and machinery move differently, so our combined cash flows will be far "
               "less volatile.",
         kort=("No: shareholders can diversify on their own at almost no cost, while only systematic risk is priced, "
               "so lower total risk does not lower the cost of capital or add value for them. The lower default risk "
               "of the combined firm makes its existing debt safer, so there is a wealth transfer from the "
               "shareholders to the creditors (coinsurance). With a premium of {prem}% on top, the shareholders lose "
               "unless real gains exceed the premium."),
         mek=("diversification creates no value for shareholders; the lower risk means a wealth transfer to the "
              "creditors (coinsurance)"),
         pluss="a disciplinary takeover: buying a badly run target and replacing its managers lets the same assets "
               "earn more",
         minus="the winner's curse: in an auction the winning bidder is the one who overestimated the target most"),
    dict(navn="Elmbridge Communications Inc.", bransje="telecom", maal="Westrock Cable", by="Kerrington", eget=[],
         sitat="Westrock trades at 10 times earnings and we trade at 20, so paying in our shares raises our EPS by "
               "12% from day one.",
         kort=("No: buying a low-P/E firm with high-P/E shares raises EPS mechanically, but without real gains the "
               "combined firm is worth only the sum of the parts, so its P/E falls and the share price does not "
               "rise. Kurbatov lists this EPS manipulation among the inefficient motives for M&A. With a premium of "
               "{prem}%, the shareholders lose value unless real gains exceed it."),
         mek="EPS bootstrapping: EPS rises mechanically while value does not",
         pluss="a foothold in a new market: buying a firm with local people and customer relationships is faster and "
               "cheaper than starting from scratch",
         minus="hubris and overpayment: a confident CEO overestimates the target and pays a premium the gains do not "
               "cover"),
    dict(navn="Rexford Logistics Inc.", bransje="logistics", maal="Saltmarsh Haulage", by="Port Ellis", eget=["makt"],
         sitat="With Saltmarsh we become the largest freight company in the country.",
         kort=("Size alone creates no value for shareholders: being larger raises the CEO's pay, prestige and job "
               "security more than it raises returns, which is empire building. Value comes only if the larger firm "
               "earns more through lower costs or market power; market power may also be blocked by the competition "
               "authorities. With a premium of {prem}%, the shareholders gain only if those effects exceed it."),
         mek="size is not value; empire building serves the CEO",
         pluss="access to patents and skilled engineers the acquirer could not build itself, as Disney gained Pixar's "
               "people and technology",
         minus="a clash of corporate cultures that drives away key staff, the very people the deal was meant to buy"),
    dict(navn="Corley Retail Inc.", bransje="retail", maal="Ludlow Outlet", by="Brookhaven", eget=[],
         sitat="Ludlow has $300 million of tax losses carried forward, which we can use to cut our own tax bill.",
         kort=("No: in this course tax losses are not a motive, because they are erased when the target changes owner "
               "(Kurbatov: «You cannot buy a company to just abuse the losses»). So the deal must be judged on what "
               "Ludlow's business is worth to the acquirer. Paying a premium of {prem}% for losses that cannot be "
               "used transfers value to Ludlow's shareholders."),
         mek="tax losses are erased on a change of ownership",
         pluss="a disciplinary takeover: replacing the target's weak managers lets the same assets earn more",
         minus="paying in shares that are undervalued, which hands part of the acquirer to the target's owners "
               "too cheaply"),
    dict(navn="Vellum Biotech Inc.", bransje="biotech", maal="Ardent Labs", by="Larkhill", eget=["patent"],
         sitat="Ardent owns three patents and a research team it would take us five years to build.",
         kort=("Yes, potentially: patents and a skilled team are scarce resources the acquirer cannot easily copy, so "
               "owning them can raise future cash flows (as Disney gained Pixar's people and technology). The "
               "shareholders gain only if that value exceeds the {prem}% premium and the researchers stay after the "
               "deal."),
         mek="patents and human capital are scarce resources that can raise cash flows",
         pluss="industry consolidation: fewer competitors can mean higher prices, although regulators may block it",
         minus="empire building: a CEO whose pay and prestige grow with size buys firms that do not raise value"),
    dict(navn="Fedje Foods Inc.", bransje="food", maal="Svea Livs", by="Jönköping", eget=["fotfeste"],
         sitat="Svea gives us an immediate foothold in Sweden, a market we have tried to enter for years.",
         kort=("Yes, potentially: buying a firm with local staff, brands and retail contacts can be faster and cheaper "
               "than building a presence from scratch. The shareholders gain only if Svea is worth more to them than "
               "the price, so the {prem}% premium must be smaller than the cost and time of building the business "
               "themselves."),
         mek="a foothold in a new market can be cheaper than starting from scratch",
         pluss="a disciplinary takeover: buying a badly run target and replacing its managers",
         minus="the winner's curse: the winning bid comes from the bidder who overestimated the target most"),
    dict(navn="Brennan Steel Inc.", bransje="steel", maal="Ironvale Mining", by="Coldwater", eget=["vertikal", "ressurs"],
         sitat="Ironvale is our main supplier of iron ore. Owning it removes its margin and the risk that it holds us "
               "up when ore is scarce.",
         kort=("Yes, potentially: vertical integration removes a supplier's margin and the hold-up problem, which can "
               "lower costs (Kurbatov's supply-chain motive). It also ties the acquirer to one source of ore; the gain "
               "is real only if it exceeds the {prem}% premium. A long-term supply contract might give much of the "
               "benefit without buying the firm."),
         mek="vertical integration removes the supplier's margin and hold-up",
         pluss="a disciplinary takeover: replacing weak managers so the same assets earn more",
         minus="overpaying in a bidding contest through hubris or the winner's curse"),
    dict(navn="Albion Hotels Inc.", bransje="hotel", maal="Seaview Resorts", by="Seabrook", eget=["disiplin"],
         sitat="Seaview owns excellent hotels but is badly run. We will replace its managers and run the hotels as "
               "well as our own.",
         kort=("Yes, potentially: a disciplinary takeover replaces weak managers, so the same assets earn more, a "
               "change of corporate control that is a motive in its own right. Seaview's owners will capture much of "
               "the gain through the {prem}% premium, so the acquirer's shareholders gain only if the improvement is "
               "larger than the premium. The threat of such bids is also what disciplines managers elsewhere."),
         mek="changing corporate control lets better managers run the same assets",
         pluss="a foothold in a new market through the target's local presence",
         minus="damage to the target's corporate culture and the loss of staff who made the hotels work"),
    dict(navn="Wexford Games Inc.", bransje="video-game", maal="Pixelmoor Studios", by="Lake Morton", eget=[],
         sitat="We must win this auction. Pixelmoor is worth more to us than to anyone else, so we can afford to "
               "outbid every rival.",
         kort=("Only if the gains are real and larger than the price: winning an auction is itself bad news, because "
               "the winner is the bidder who overestimated the target most (the winner's curse). A CEO set on winning "
               "risks hubris; the {prem}% premium may also hand all of the gain to Pixelmoor's owners. A bidder should "
               "pay at most the value if it wins minus the value if a rival wins."),
         mek="the winner's curse and hubris: the winning bidder tends to be the one who overestimated most",
         pluss="access to the target's technology and developers, which the acquirer could not build quickly itself",
         minus="empire building: a bigger firm raises the CEO's pay and status whether or not value rises"),
    dict(navn="Highmoor Cement Inc.", bransje="cement", maal="Stonebridge Cement", by="Stonebridge", eget=["makt"],
         sitat="Stonebridge is our largest rival in the region. Together we can raise prices.",
         kort=("Yes for the shareholders, potentially: fewer competitors can mean higher prices, which is Kurbatov's "
               "consolidation and market power motive. The gain comes from customers, so the competition authorities "
               "may block the deal. With a premium of {prem}%, the shareholders gain only if the extra margin exceeds "
               "the premium."),
         mek="market power: fewer competitors can raise prices, at the customers' expense",
         pluss="a foothold in a new market, faster than building one from scratch",
         minus="the winner's curse in a contested deal: the winner is the bidder who overestimated most"),
    dict(navn="Merriman Industries Inc.", bransje="industrial", maal="Tolland Engineering", by="Riverton", eget=["verdi"],
         sitat="Our analysts believe the market badly undervalues Tolland because it misreads Tolland's order book.",
         kort=("Possibly: if the acquirer really knows something the market does not, buying below true value creates "
               "a gain for its shareholders. But the market price already reflects public information; managers "
               "who believe a target is cheap are often simply overconfident (hubris). Paying a premium of {prem}% "
               "also hands much of any undervaluation to Tolland's owners."),
         mek="buying an undervalued target creates value only with better information; the premium shares any gain",
         pluss="a disciplinary takeover: replacing weak managers so the same assets earn more",
         minus="hubris: managers who believe targets are cheap often overpay"),
    dict(navn="Corbridge Tech Inc.", bransje="technology", maal="Lumen Analytics", by="Westbury", eget=[],
         sitat="We have $3 billion of cash earning almost nothing. Buying Lumen puts that cash to work.",
         kort=("Not by itself: idle cash is a reason to invest only if the investment has a positive NPV; otherwise it "
               "should be paid out to the owners. Spending free cash flow on acquisitions is a classic agency cost, "
               "empire building with the owners' money. With a premium of {prem}%, the deal must create more than the "
               "premium before the shareholders gain."),
         mek="idle cash is no reason to buy; spending free cash flow on deals is an agency cost",
         pluss="patents and skilled people that the acquirer could not build itself",
         minus="empire building with free cash flow: the CEO grows the firm with cash that should have been paid out"),
]



@oppgave("ov-gov4", tema="governance", tittel="Why buy another firm? Motives and stakeholders", antall=12,
         sjanger="d3-motiver", kilde="H2024 E1, lecture 12 (motives), lecture 1 and 13 (shareholders or stakeholders)")
def _(r):
    v = r.choice(MOTIV4)
    fi = v["navn"]
    rl = _fast(fi)
    prem = rl.choice([25, 30, 35, 40])
    jobber = rl.choice([300, 450, 600, 800])
    pris = rl.choice(["$1.2 billion", "$2.5 billion", "$800 million", "$4 billion"])
    by = v["by"]
    kort_a = v["kort"].format(prem=prem)
    andre = "; ".join(t for k, t in GODE_MOTIV.items() if k not in v["eget"])
    # Eksempelet i løsningen må ikke være motivet fra (a), som ikke teller som «et annet» motiv.
    if "fotfeste" in v["eget"]:
        eksempel = ("«A disciplinary takeover: replacing a badly run target's managers lets the same assets earn "
                    "more.»")
    else:
        eksempel = "«A foothold in a new market: buying a firm with local staff and customers is faster than building one.»"
    case = (f"<p>{fi} is a listed {v['bransje']} company. Its CEO proposes to buy {v['maal']} for {pris}, a premium of "
            f"{prem}% over {gen(v['maal'])} market value. The CEO's main argument: «{v['sitat']}» The CEO adds that the "
            f"deal will protect {jobber} jobs at {gen(v['maal'])} main site in {by} and help the local community.</p>")

    # ---------------- (a)
    a = tekst_del(
        "a", poeng=4,
        q=(f"<p>Evaluate the CEO's main argument. Will it create value for {gen(fi)} shareholders? Explain the "
           f"mechanism.</p>"),
        setninger="Answer in at most three sentences.",
        kort=f"<p>{kort_a}</p>",
        losning=(f"<p><b>The key.</b> {_stor(v['mek'])}. Kurbatov does not accept «value creation» as an answer: give "
                 f"the mechanism.</p>"
                 f"<p><b>The price.</b> The acquirer's shareholders gain only S − (P − T): the value the deal creates "
                 f"minus the premium paid over the target's stand-alone value. A good motive with a {prem}% premium "
                 f"can still destroy value for {gen(fi)} owners. On average targets earn about 15% abnormal return at "
                 f"the announcement, while acquirers earn about 1% and lose in about half of the deals (Kurbatov, "
                 f"lecture 12).</p>"
                 f"<p><b>Kurbatov's motive list.</b> Economies of scale and scope, supply-chain optimisation and "
                 f"complementary goods (the synergies); consolidation and market power; changes in corporate control; "
                 f"EPS manipulation; manager ambitions. Not in this course: tax losses, which are erased on a change "
                 f"of owner. Diversification is not a value motive for shareholders.</p>"
                 f"<p><b>Typical mistakes:</b> «it creates value» without a mechanism; ignoring the premium; treating "
                 f"lower total risk as a gain for shareholders.</p>"
                 f"<p><b>Remember:</b> motive, mechanism, then price.</p>"),
        kriterier=[
            _krit("Gives a verdict on the argument that matches the course (whether this motive can create value for "
                  "the shareholders)"),
            _krit(f"Explains the mechanism: {v['mek']}"),
            _krit(f"Brings in the price: the shareholders gain only if the value created exceeds the {prem}% premium"),
            _krit("Says who gains instead or what must hold for the deal to pay (creditors, the CEO, the target's "
                  "owners, staff who stay)"),
        ],
    )

    # ---------------- (b)
    b = tekst_del(
        "b", poeng=3,
        q=(f"<p>Give one other motive, not synergies, that could make an acquisition good for {gen(fi)} shareholders. "
           f"Then give one reason an acquisition can be bad for them.</p>"),
        setninger="Answer in one to two sentences per reason.",
        selvstendig=True,
        kort=f"<p>One good motive is {v['pluss']}. One bad reason is {v['minus']}.</p>",
        losning=("<p><b>What counts.</b> H2024 Exercise 1 banned synergies and accepted any reasonable reason with an "
                 "explanation. Kurbatov's key listed market power, buying a competitor and supply-chain reasons for "
                 "the acquirer; empire building against it. In class Kurbatov accepted a foothold in a new market, "
                 "innovation and human capital, patents (Pixar and Disney), scarce resources and taking the "
                 "middleman's margin.</p>"
                 "<p><b>Bad for the acquirer.</b> Overpayment through hubris or the winner's curse; empire building; "
                 "paying with undervalued shares; culture clashes that drive away key people; coinsurance that moves "
                 "value to creditors.</p>"
                 "<p><b>Not accepted.</b> «Value creation» without a mechanism. Nor tax losses: «as soon as Ford gets "
                 "transferred to Google, the losses get erased». The CEO's own motive from (a) does not count as "
                 "«another» motive.</p>"
                 "<p><b>How to write it.</b> One sentence for the motive, one for the mechanism that reaches value: "
                 + eksempel + "</p>"
                 "<p><b>Remember:</b> one reason per box, each with its mechanism.</p>"),
        kriterier=[
            _krit(f"Gives a valid motive other than synergies and other than the CEO's motive in (a), with its "
                  f"mechanism (for example {andre})", 1.5),
            _krit("Gives a valid reason the deal can hurt the acquirer's shareholders (overpayment, hubris or the "
                  "winner's curse, empire building, undervalued shares as payment, culture clash) with its mechanism",
                  1.5),
        ],
    )

    # ---------------- (c)
    c = tekst_del(
        "c", poeng=3,
        q=(f"<p>Should {gen(fi)} board give weight to the {jobber} jobs in {by} when it decides? Give one argument for "
           f"the shareholder view and one for the stakeholder view.</p>"),
        setninger="Answer in at most three sentences.",
        selvstendig=True,
        kort=(f"<p>Shareholder view: the managers spend the owners' money, so a deal that destroys value to save jobs is "
              f"a hidden tax on the owners (Friedman); a CEO accountable to many missions is accountable to none, since "
              f"any deal can be defended by pointing to some group. Stakeholder view: employees and local communities "
              f"make investments in the firm that no contract protects; most executives also say their interests "
              f"matter (89% in the Stanford survey), so ignoring them can lower long-run value. Here the jobs argument "
              f"should not rescue a deal that fails on value, since it can easily cover the CEO's own motives.</p>"),
        losning=("<p><b>The debate in lecture 1 and 13.</b> Most governance tools hold managers to account to the "
                 "shareholders. Friedman (1970) argued that a manager pursuing «social responsibility» spends the "
                 "owners' money on goals they did not choose. The criticism of the stakeholder view on Kurbatov's "
                 "slide: too many missions and conflicting interests.</p>"
                 "<p><b>For stakeholders.</b> Employees invest in firm-specific skills; suppliers and towns build around "
                 "the firm. The Stanford 2019 survey: 89% of CEOs and CFOs say stakeholder interests are important, only "
                 "23% say shareholders are clearly more important. Employees count most. Kurbatov presented the "
                 "debate as open and shaped by culture.</p>"
                 "<p><b>Applied.</b> Stated stakeholder benefits are cheap to claim. Ask whether the deal creates value; "
                 "if it does not, the jobs argument can be cover for empire building.</p>"
                 "<p><b>Remember:</b> one argument each way, then apply it to the case.</p>"),
        kriterier=[
            _krit("Argument for the shareholder view: managers spend the owners' money (Friedman), or many missions "
                  "make the manager unaccountable"),
            _krit("Argument for the stakeholder view: employees and communities make firm-specific investments that "
                  "contracts do not protect, or long-run value depends on them"),
            _krit("Applies it to the case: the jobs argument can cover a deal that fails on value or the CEO's own "
                  "motives"),
        ],
    )
    return ovelse(case, [a, b, c])
