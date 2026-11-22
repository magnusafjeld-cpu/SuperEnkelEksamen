# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: corporate governance og de verbale M&A-spørsmålene
   (tema «governance»).

   Familier (regnespørsmål med tallsvar):
     gov-fri1  gratispassasjerproblemet: minste andel som gjør overvåking lønnsom,
               og nettogevinsten for en blokkeier
     gov-eps1  EPS-mål og tilbakekjøp: EPS etter et tilbakekjøp som ikke skaper
               verdi (D14)

   Statiske spørsmål: gov-s01 (flyttet uendret fra eksempel.py) og gov-s02 …
   gov-s37 om agentkonflikten, styret, lønn og KPI-er, aksjonærtiltak,
   aktivister og proxy contest, gratispassasjerproblemet, stemmerådgivere,
   forsvarstiltak, markedet for selskapskontroll, aksjonærer mot
   interessenter, regulering, M&A-motiver utover synergier og tre spørsmål på
   eksamensnivå (H2024 E1, H2024 E2, H2025 E2).

   Generell ramme (forelesningsnotatet A7): norsk aksjelov bare når
   spørsmålet sier ASA. Kilder: kj11, forelesning 12 og 13 (lecture_12.pdf,
   lecture_13.pdf), Kurbatovs nøkler til H2024 og H2025 og
   docs/fie402-forelesninger-2026.md (B11, B12, D14).
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# gov-s01 · EPS-mål i lederlønnen og tilbakekjøp (forelesning 14, D14 i
# docs/fie402-forelesninger-2026.md)
# ---------------------------------------------------------------------------
statisk(
    "gov-s01", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about pay and KPIs: how a bonus tied to an accounting number changes what the manager does close "
        "to the deadline.",
        "EPS = earnings / number of shares. An action can raise EPS by raising earnings or by cutting the number of "
        "shares. In a perfect market a change in leverage alone does not change the value of the firm.",
        "<p><b>Step 1: take each action in turn.</b> What does it do to this year's earnings? What does it do to "
        "the number of shares?</p>"
        "<p><b>Step 2: strike what works against the target.</b> An action that lowers EPS this year is not what a "
        "manager chasing the bonus would pick.</p>"
        "<p><b>Step 3: ask whether what is left creates value.</b> If it lifts the KPI without creating value, "
        "that is the governance problem.</p>",
    ),
    q="<p>The CEO of a listed firm earns a large bonus if earnings per share (EPS) reach a target this year. With "
      "one quarter left, EPS is just below the target. The firm has no new projects with a positive NPV.</p>"
      "<p>Which action does this pay contract encourage and why is that a governance problem?</p>",
    alternativer=[
        R("A buyback financed with debt, which lifts EPS by cutting the share count while creating no value"),
        F("Cutting the dividend to keep the cash, which lifts EPS because retained cash is booked as earnings",
          "Retained cash is not earnings. Cutting the dividend leaves this year's EPS where it was, so it does "
          "nothing for the target."),
        F("Issuing new shares to fund growth, which lifts EPS because the firm has more capital to work with",
          "An issue adds shares. With no profitable projects to fund, it lowers EPS in the short run and works "
          "against the target."),
        F("Spending more on R&amp;D, which lifts EPS this year because investors reward spending on innovation",
          "R&amp;D is expensed, so it lowers this year's earnings. A manager chasing an EPS target is more likely "
          "to cut it."),
    ],
    kort="<p><b>A debt-financed buyback.</b> Fewer shares lift EPS even when nothing real has changed. The bonus "
         "pays for the number, not for value: the short-termism KPIs can create.</p>",
    full="<p><b>What the problem is.</b> Pay is meant to tie the manager's interests to the shareholders'. A bonus "
         "on an accounting number does that only if the number moves with value. EPS can be moved without "
         "creating any.</p>"
         "<p><b>Why the buyback works for the CEO.</b> EPS is earnings divided by the number of shares. Say "
         "earnings are 100 and there are 50 shares, so EPS is 2.00. Borrowing to buy back 10 shares costs some "
         "interest, so earnings fall a little, to 96. EPS is now 96/40 = 2.40. The target is reached.</p>"
         "<p><b>Why it creates no value.</b> In a perfect market the recapitalisation leaves the firm value "
         "unchanged (MM I). The higher EPS is riskier, so r<sub>E</sub> rises and the P/E ratio falls. The "
         "shareholders are no better off. With taxes or distress costs it can even destroy value.</p>"
         "<p><b>Why the other actions fail.</b> A dividend cut does not change earnings. An issue adds shares. "
         "More R&amp;D lowers this year's earnings. None of them helps the CEO reach the target.</p>"
         "<p><b>The remedy.</b> Pay that follows long-run value: shares that vest over several years, targets "
         "measured against peers and clawbacks.</p>"
         "<p><b>Remember:</b> a KPI the manager can move without creating value will be moved.</p>",
)


FIRMA_G = ["Skarsvåg Fiskeri", "Bremnes Media", "Hammerfjell Industri", "Sundal Retail", "Tofte Shipping",
           "Lyngstad Pharma", "Vikøy Software", "Rognan Energi"]


def _p(x, d=2):
    return pst(x, d)


# ---------------------------------------------------------------------------
# gov-fri1 · Gratispassasjerproblemet: når lønner overvåking seg?
# ---------------------------------------------------------------------------
HJ_FRI = {
    "alfa": hjelp3(
        "This is the free-rider problem among shareholders. The one who acts pays the whole cost and gets only his "
        "share of the gain. You need the stake at which acting pays.",
        "Act if α × q × ΔV &gt; C, so the break-even stake is α* = C/(q × ΔV). α is your stake, ΔV the rise in "
        "equity value if the campaign works, q the chance it works, C its full cost.",
        "<p><b>Step 1: the gain to all shareholders.</b> The rise in equity value if the campaign succeeds.</p>"
        "<p><b>Step 2: the expected gain.</b> Multiply by the probability of success.</p>"
        "<p><b>Step 3: the break-even stake.</b> The cost divided by the expected gain to all holders.</p>"
        "<p><b>Watch out:</b> ΔV is the improvement, not the whole equity value.</p>"),
    "netto": hjelp3(
        "This is the free-rider problem from the point of view of one blockholder: does a campaign pay for him?",
        "Your expected net gain = α × q × ΔV − C, with α your stake, ΔV the rise in equity value if the campaign "
        "works, q the chance it works and C the full cost, which you bear alone.",
        "<p><b>Step 1: the gain to all shareholders</b> if the campaign succeeds.</p>"
        "<p><b>Step 2: your share of the expected gain.</b> Your stake times the probability times the gain.</p>"
        "<p><b>Step 3: subtract the whole cost.</b> You pay it alone.</p>"),
}


@familie("gov-fri1", tema="governance", antall=5, tittel="The free-rider problem: when does monitoring pay?",
         hjelp=HJ_FRI["alfa"])
def _(r):
    navn = r.choice(FIRMA_G)
    E = r.choice([2000, 3000, 4000, 5000, 6000])
    g = r.choice([0.04, 0.05, 0.06, 0.08, 0.10])
    dV = E * g
    C = r.choice([10, 12, 15, 18, 20, 24])
    q = r.choice([0.5, 0.6, 0.75, 0.8])
    typ = r.choice(["alfa", "alfa", "netto"])
    q_tekst = (f"<p>The chief executive of {navn} is shirking. The firm's equity is worth NOK {tall(E)} million. A campaign "
               f"to replace him would cost NOK {C} million, all paid by the shareholder who runs it. It succeeds with "
               f"probability {tall(q, 2)}, in which case the equity value rises by {_p(g, 0)}.</p>")
    if typ == "alfa":
        a = C / (q * dV)
        if not 0.01 <= a <= 0.15:
            raise Avvis("andelen er urimelig")
        f1, f2, f3 = C / dV, q * C / dV, C / (q * E)
        ulike(a, f1, f2, f3, rel=0.02)
        q_tekst += ("<p>What is the smallest stake, in per cent of the shares, at which running the campaign pays for a "
                    "single shareholder?</p>")
        alt = [R(_p(a), a),
               F(_p(f1), f"The probability of success left out: {C}/{tall(dV, 0)}. The gain arrives only if the campaign "
                         f"works, so the expected gain is smaller and the stake must be larger.", f1),
               F(_p(f2), f"The probability multiplied in instead of divided: {tall(q, 2)} × {C}/{tall(dV, 0)}. A lower "
                         f"chance of success makes acting less attractive, so it must raise the stake needed.", f2),
               F(_p(f3), f"The whole equity value used instead of the improvement: {C}/({tall(q, 2)} × {tall(E)}). The holder "
                         f"gains only from the rise in value, not from what the firm is already worth.", f3)]
        tall_ut = tallsvar(skala=100, enhet="%")
        kort = (f"<p><b>{_p(a)}.</b> ΔV = {_p(g, 0)} × {tall(E)} = {tall(dV, 0)}. α* = {C}/({tall(q, 2)} × {tall(dV, 0)}) = "
                f"{C}/{tall(q * dV, 2)} = {_p(a)}.</p>")
        midt = (f"<p><b>Step 1: the gain to all shareholders.</b> ΔV = {_p(g, 0)} × {tall(E)} = {tall(dV, 0)}.</p>"
                f"<p><b>Step 2: the expected gain.</b> {tall(q, 2)} × {tall(dV, 0)} = {tall(q * dV, 2)}.</p>"
                f"<p><b>Step 3: the break-even stake.</b> α × {tall(q * dV, 2)} = {C} gives α* = <b>{_p(a)}</b>. A "
                f"holder above that stake gains from acting; one below free-rides.</p>"
                f"<p><b>First check.</b> At {_p(a)} the holder's expected gain is {tall(a, 4)} × {tall(q * dV, 2)} = "
                f"{tall(a * q * dV, 2)}, the cost. It runs the definition backwards, so it catches arithmetic slips "
                f"only.</p>")
    else:
        s = r.choice([0.05, 0.06, 0.07, 0.08, 0.10])
        net = s * q * dV - C
        if abs(net) < 1:
            raise Avvis("for nær null")
        f1, f2, f3 = s * dV - C, s * q * dV, q * dV - C
        ulike(net, f1, f2, f3, rel=0.02)
        q_tekst += (f"<p>You hold {_p(s, 0)} of the shares. What is your expected net gain from running the campaign "
                    f"yourself, in NOK million?</p>")
        alt = [R(f"NOK {tall(net, 2)} million", net),
               F(f"NOK {tall(f1, 2)} million", f"The probability of success left out: {_p(s, 0)} × {tall(dV, 0)} − {C}. "
                                               f"The rise in value arrives only if the campaign works.", f1),
               F(f"NOK {tall(f2, 2)} million", f"The cost left out. You pay the whole NOK {C} million yourself.", f2),
               F(f"NOK {tall(f3, 2)} million", f"The expected gain to all shareholders minus the cost. You own only "
                                               f"{_p(s, 0)}; the rest of the gain goes to holders who did nothing.", f3)]
        tall_ut = tallsvar(enhet="NOK million", rel=0.001, abs=0.01)
        kort = (f"<p><b>NOK {tall(net, 2)} million.</b> {_p(s, 0)} × {tall(q, 2)} × {tall(dV, 0)} − {C} = "
                f"{tall(s * q * dV, 2)} − {C} = {tall(net, 2)}"
                + (": the campaign pays.</p>" if net > 0 else ": you free-ride.</p>"))
        midt = (f"<p><b>Step 1: the gain to all shareholders.</b> ΔV = {_p(g, 0)} × {tall(E)} = {tall(dV, 0)}.</p>"
                f"<p><b>Step 2: your expected share.</b> {_p(s, 0)} × {tall(q, 2)} × {tall(dV, 0)} = "
                f"{tall(s * q * dV, 2)}.</p>"
                f"<p><b>Step 3: net of the cost.</b> {tall(s * q * dV, 2)} − {C} = <b>{tall(net, 2)}</b>"
                + (", so you act. The other holders get "
                   f"{tall((1 - s) * q * dV, 2)} in expectation for nothing.</p>" if net > 0 else
                   f", so you do nothing, although the campaign would add {tall(q * dV - C, 2)} for all shareholders "
                   f"together.</p>")
                + f"<p><b>First check.</b> The break-even stake is {C}/{tall(q * dV, 2)} = {_p(C / (q * dV))}; your "
                f"{_p(s, 0)} is " + ("above" if net > 0 else "below") + " it ✓. A different route to the same decision, "
                "so it can catch a slip.</p>")
    full = (
        f"<p><b>The free-rider problem.</b> Monitoring a manager is a public good among shareholders. The one who acts "
        f"pays the whole cost, but the higher share price goes to every holder in proportion to his stake. A small "
        f"holder rationally does nothing, which is why dispersed owners monitor too little and why blockholders "
        f"matter.</p>"
        + midt +
        f"<p><b>Why 5–10% is interesting.</b> A holder of that size can be above the break-even stake, so voice pays, "
        f"but he cannot win a vote alone and selling a block that size moves the price.</p>"
        f"<p><b>Remember:</b> act if α × q × ΔV &gt; C. Everyone below α* free-rides.</p>"
    )
    return sporsmal(q_tekst, alt, kort, full, hjelp=HJ_FRI[typ], tall=tall_ut)


# ---------------------------------------------------------------------------
# gov-eps1 · EPS-mål og tilbakekjøp
# ---------------------------------------------------------------------------
@familie("gov-eps1", tema="governance", antall=5, tittel="An EPS target and a buyback that creates no value",
         hjelp=hjelp3(
             "This is a KPI problem. A bonus on EPS can be earned by cutting the share count rather than by "
             "creating value. You need EPS after a buyback.",
             "EPS = earnings / shares. After the buyback: earnings fall by the interest the cash earned or the new "
             "debt costs. Shares fall by the amount spent divided by the price. In a perfect market the price does "
             "not change.",
             "<p><b>Step 1: the shares bought back.</b> Amount spent divided by the share price.</p>"
             "<p><b>Step 2: the new earnings.</b> Subtract the interest lost on the cash, or the interest paid on the "
             "new debt.</p>"
             "<p><b>Step 3: EPS.</b> New earnings over the shares left.</p>"
             "<p><b>Watch out:</b> both the numerator and the denominator change.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA_G)
    N = r.choice([100, 150, 200, 250])
    eps0 = r.choice([2.0, 2.5, 3.0, 4.0])
    P = r.choice([25, 30, 40, 50])
    pe = P / eps0
    if not 8 <= pe <= 16:
        raise Avvis("P/E er urimelig")
    X = eps0 * N
    gjeld = r.random() < 0.6
    B = r.choice([200, 300, 400, 500, 600])
    rr = r.choice([0.04, 0.05, 0.06]) if gjeld else r.choice([0.02, 0.03, 0.04])
    n = B / P
    if n > 0.4 * N:
        raise Avvis("for stort tilbakekjøp")
    eps1 = (X - rr * B) / (N - n)
    if eps1 <= eps0 * 1.02:
        raise Avvis("EPS stiger for lite")
    mal = rund((eps0 + eps1) / 2, 2)
    f1, f2, f3 = X / (N - n), (X - rr * B) / N, eps0
    ulike(eps1, f1, f2, f3, rel=0.02)
    if gjeld:
        finans = (f"borrow NOK {B} million at {_p(rr, 0)} and use it all to buy back shares at the market price")
        rente = f"the interest on the new debt, {_p(rr, 0)} × {B} = {tall(rr * B, 2)}"
        rf_tekst = "the interest on the new debt"
    else:
        finans = (f"use NOK {B} million of cash, which earns {_p(rr, 0)} and is included in the earnings, to buy back "
                  f"shares at the market price")
        rente = f"the interest the cash no longer earns, {_p(rr, 0)} × {B} = {tall(rr * B, 2)}"
        rf_tekst = "the interest the cash earned"
    q = (f"<p>{navn} has {N} million shares at NOK {P} and earnings of NOK {tall(X, 0)} million a year, so EPS is NOK "
         f"{tall(eps0, 2)}. The chief executive gets a large bonus if EPS reaches NOK {tall(mal, 2)} this year. The firm "
         f"has no new projects. He proposes to {finans}. Assume perfect capital markets and no taxes.</p>"
         f"<p>What is EPS after the buyback, in NOK? Give four decimals.</p>")
    alt = [R(f"NOK {tall(eps1, 4)}", eps1),
           F(f"NOK {tall(f1, 4)}", f"The earnings left unchanged at {tall(X, 0)}. The buyback costs {rf_tekst}, so "
                                   f"earnings fall.", f1),
           F(f"NOK {tall(f2, 4)}", f"The share count left at {N} million. The point of the buyback is that {tall(n, 2)} "
                                   f"million shares disappear.", f2),
           F(f"NOK {tall(f3, 4)}", "EPS assumed unchanged. Both earnings and the number of shares change. They do "
                                   "not change in proportion.", f3)]
    kort = (f"<p><b>NOK {tall(eps1, 4)}.</b> Shares bought {B}/{P} = {tall(n, 2)} million. Earnings {tall(X, 0)} − "
            f"{tall(rr * B, 2)} = {tall(X - rr * B, 2)}. EPS = {tall(X - rr * B, 2)}/{tall(N - n, 2)} = "
            f"{tall(eps1, 4)}, above the target of {tall(mal, 2)}.</p>")
    full = (
        f"<p><b>Why this is a governance problem.</b> Pay is supposed to tie the manager to the owners. A bonus on EPS "
        f"does so only if EPS moves with value. A buyback raises EPS whenever the earnings yield, here "
        f"{tall(eps0, 2)}/{P} = {_p(eps0 / P)}, exceeds the interest rate on the money spent, {_p(rr, 0)}. No value "
        f"needs to be created.</p>"
        f"<p><b>Step 1: the shares bought.</b> {B}/{P} = {tall(n, 2)} million, leaving {tall(N - n, 2)} million.</p>"
        f"<p><b>Step 2: the new earnings.</b> Subtract {rente}: {tall(X, 0)} − {tall(rr * B, 2)} = "
        f"{tall(X - rr * B, 2)}.</p>"
        f"<p><b>Step 3: EPS.</b> {tall(X - rr * B, 2)}/{tall(N - n, 2)} = <b>{tall(eps1, 4)}</b>, above the target "
        f"of {tall(mal, 2)}. The bonus is paid.</p>"
        f"<p><b>What happened to value.</b> In a perfect market the buyback is a pure financing move, so the share "
        f"price stays at {P} (MM). The P/E falls from {tall(pe, 2)} to {tall(P / eps1, 2)}: the higher EPS is "
        + ("riskier, so r<sub>E</sub> rises." if gjeld else "now earned without the safe cash, so the equity is "
           "riskier.") +
        f" The owners are no better off. With distress costs they could be worse off.</p>"
        f"<p><b>The remedy.</b> Pay that follows long-run value: shares that vest over several years, targets measured "
        f"against peers and clawbacks.</p>"
        f"<p><b>Remember:</b> a KPI the manager can move without creating value will be moved.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ===========================================================================
# Statiske spørsmål gov-s02 … gov-s37
# ===========================================================================

statisk(
    "gov-s02", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about naming the agency problem between a manager and the shareholders from what the manager does.",
        "The usual names: shirking (too little effort), perks (private benefits), empire building (size for its own "
        "sake), entrenchment (making himself hard to replace), short-termism.",
        "<p><b>Step 1: what does he do with the firm's money or power?</b></p>"
        "<p><b>Step 2: whose interests conflict?</b> Manager against shareholders, or shareholders against "
        "creditors?</p>",
    ),
    q="<p>A chief executive runs a mature firm with large free cash flow and no good projects. He uses the cash to buy "
      "three unrelated firms at full prices. His pay and prestige rise with the size of the firm. Which agency problem "
      "is this?</p>",
    alternativer=[
        R("Empire building: growth that benefits the manager at the shareholders' expense"),
        F("Entrenchment: the manager makes himself harder to replace by the board or by a bidder",
          "Entrenchment is about protecting his job, through defences or a captive board. Here he spends the cash on "
          "size."),
        F("Shirking: the manager puts in too little effort",
          "He is busy, not idle. The problem is where the effort and the money go."),
        F("Risk shifting: the shareholders gamble at the creditors' expense",
          "Risk shifting is a conflict between shareholders and creditors. Here the manager and the shareholders "
          "disagree."),
    ],
    kort="<p><b>Empire building.</b> Free cash flow without good projects lets the manager buy size that pays him "
         "and destroys value for the owners.</p>",
    full="<p><b>The conflict.</b> Shareholders want value. The manager also wants pay, prestige and power, which grow "
         "with the size of the firm. When the firm has more cash than good projects, he can buy growth with the "
         "owners' money. That is empire building.</p>"
         "<p><b>Why it destroys value.</b> Unrelated firms bought at full prices add no synergies, so the "
         "acquisitions have a zero or negative NPV. The owners could have received the cash and invested it "
         "themselves.</p>"
         "<p><b>The other names.</b> Shirking is too little effort. Perks are private benefits such as jets and "
         "offices. Entrenchment is making himself hard to remove. Short-termism is chasing this year's numbers. "
         "Risk shifting is a different conflict: shareholders against creditors.</p>"
         "<p><b>The remedies.</b> Pay out the free cash flow (dividends or buybacks, which Kurbatov lists among the "
         "four uses of free cash flow), add debt so that interest takes the cash, tie pay to value rather than size "
         "and keep the market for corporate control open.</p>"
         "<p><b>Remember:</b> spare cash plus no projects plus pay for size equals empire building.</p>",
)

statisk(
    "gov-s03", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about the lecture's four tools for aligning managers with shareholders. You need the tool a "
        "particular measure uses.",
        "The four: better monitoring, better contracts, shareholder action and regulation.",
        "<p><b>Step 1: who imposes the measure?</b> The board, the owners or the state?</p>"
        "<p><b>Step 2: does it apply to one firm or to all?</b></p>",
    ),
    q="<p>A law requires every listed firm to have an audit committee made up only of independent directors. Which of "
      "the lecture's four tools for aligning managers with shareholders does this use?</p>",
    alternativer=[
        R("Regulation: the state sets a rule that applies to every listed firm"),
        F("Better contracts: the firm writes new terms into the manager's pay package",
          "Contracts are agreed between the firm and the manager, such as pay. Here a law applies to every firm."),
        F("Shareholder action: the owners vote to change the board's committees",
          "No shareholder acts. The rule comes from the state, whatever the owners would have voted."),
        F("Better monitoring: the shareholders hire their own auditor to watch the manager",
          "The measure does strengthen monitoring, but its source is a law. The tool is regulation."),
    ],
    kort="<p><b>Regulation.</b> The state imposes a rule on all listed firms. It supports monitoring, as "
         "Sarbanes-Oxley did with independent audits.</p>",
    full="<p><b>The four tools.</b> Lecture 13 asks how to align managers' interests with the owners' and lists four "
         "tools.</p>"
         "<p><b>Better monitoring.</b> Someone watches the manager: the board, large shareholders, lenders, employees, "
         "the authorities or external monitors such as the market for corporate control.</p>"
         "<p><b>Better contracts.</b> Pay that ties the manager's wealth to value: stock, options, performance "
         "targets, golden parachutes.</p>"
         "<p><b>Shareholder action.</b> The owners use their rights: voting, putting items on the agenda, "
         "coordinated voting, activist campaigns, proxy contests.</p>"
         "<p><b>Regulation.</b> The state sets rules for all firms. After Enron, Sarbanes-Oxley required independent "
         "auditors, more disclosure and corporate responsibility. Dodd-Frank added independent compensation "
         "committees. In the lecture's words, government facilitates monitoring by passing supportive "
         "legislation.</p>"
         "<p><b>Here.</b> The independent audit committee strengthens monitoring, but the tool is regulation because "
         "a law imposes it on every firm.</p>"
         "<p><b>Remember:</b> monitoring, contracts, shareholder action and regulation. Name the tool and the "
         "problem it solves.</p>",
)

statisk(
    "gov-s04", tema="governance", type="fakta",
    hjelp=hjelp3(
        "This is about who chooses the directors who are supposed to monitor the CEO, as the lecture puts it.",
        "The board hires the executives, sets their pay and takes major decisions. Shareholders elect the directors "
        "at the general meeting, from candidates someone has nominated.",
        "<p><b>Step 1: who proposes the candidates in most firms?</b></p>"
        "<p><b>Step 2: what does that mean for independence?</b></p>",
    ),
    q="<p>According to the lecture, who in practice determines the composition of the board in most companies?</p>",
    alternativer=[
        R("The board itself, which nominates the candidates the shareholders then vote on"),
        F("The shareholders, who choose freely among competing candidates at every annual meeting",
          "The shareholders vote, but usually on a single slate the board has put forward. Contested elections are "
          "rare."),
        F("The chief executive, who appoints the directors through their employment contracts",
          "Directors are elected, not employed by the CEO. His influence is indirect, through the nomination "
          "process."),
        F("The regulator, which must approve every director before the general meeting",
          "Regulators set rules on independence, not the names on the board."),
    ],
    kort="<p><b>The board itself, with exceptions.</b> It nominates the candidates, so a board close to the CEO can "
         "reproduce itself. That is why independence matters.</p>",
    full="<p><b>What the board does.</b> Most companies have a board of directors. It hires the executives, "
         "determines their pay and takes the major decisions. It is the monitor with the strongest tools.</p>"
         "<p><b>Who chooses the board.</b> The lecture's answer: the board itself, with exceptions. The board "
         "nominates candidates and the shareholders vote on that slate. A contested election, a proxy contest, is "
         "the exception.</p>"
         "<p><b>Why it matters.</b> If the CEO has influence over the board, he can shape who will monitor him. The "
         "result can be a captive board. The lecture's list of potential issues: insiders on the board, a captive "
         "board, a CEO who is also chair, a staggered board that is hard to replace, a large board and busy "
         "directors.</p>"
         "<p><b>The counterweights.</b> Independent directors, nomination committees, large shareholders who can "
         "nominate their own candidates and, as a last resort, a proxy contest.</p>"
         "<p><b>Remember:</b> the board largely chooses itself, so its independence cannot be taken for granted.</p>",
)

statisk(
    "gov-s05", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the classification of directors in the lecture: insiders, grey and independent.",
        "Insider: works for the firm. Grey: an outsider with business or personal ties to the firm or the CEO. "
        "Independent: no such ties.",
        "<p><b>Step 1: is she employed by the firm?</b></p>"
        "<p><b>Step 2: does she have ties that could make her reluctant to challenge the CEO?</b></p>",
    ),
    q="<p>A director is the firm's outside lawyer and has billed the firm for fifteen years. She is not an employee. "
      "How does the lecture's classification describe her?</p>",
    alternativer=[
        R("Grey: an outsider whose ties to the firm may stop her from challenging the CEO"),
        F("Independent: she is not employed by the firm, so she is free to monitor the chief executive",
          "Not being employed is not enough. Her income from the firm depends on staying on good terms with "
          "management."),
        F("Insider: she works for the firm, so she reports to the CEO",
          "She is not an employee. Insiders are executives who sit on the board."),
        F("Captive: she was appointed by the CEO and must follow his instructions",
          "Captive describes a whole board under the CEO's control, not a type of director."),
    ],
    kort="<p><b>Grey.</b> She is not an employee, but her business with the firm makes her less willing to confront "
         "the CEO than a truly independent director.</p>",
    full="<p><b>Three kinds of director.</b> Insiders are executives of the firm. Grey directors are outsiders with "
         "ties to the firm or to the CEO: former executives, relatives, the firm's lawyer, banker or consultant. "
         "Independent directors have no such ties.</p>"
         "<p><b>Why it matters.</b> The board's job is to monitor the CEO. A director whose income or career "
         "depends on the CEO's goodwill is a weak monitor. The lecture's point: an independent board is better at "
         "monitoring.</p>"
         "<p><b>Here.</b> The lawyer has earned fees from the firm for fifteen years. Voting against the CEO could "
         "cost her the client. She is grey.</p>"
         "<p><b>What follows for an exam answer.</b> When asked how to improve monitoring, replacing insider and grey "
         "directors with independent ones is an accepted action (Kurbatov's key to H2025 E2: make the board more "
         "independent by replacing insider directors).</p>"
         "<p><b>Remember:</b> independence is about ties, not about the job title.</p>",
)

statisk(
    "gov-s06", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about a CEO who also chairs the board, which the lecture lists as a potential issue.",
        "The board monitors, pays and can dismiss the CEO. The chair sets the board's agenda and controls what "
        "information it gets.",
        "<p><b>Step 1: whose job is it to monitor the CEO?</b></p>"
        "<p><b>Step 2: what happens if the CEO leads that body?</b></p>",
    ),
    q="<p>Why does the lecture flag a chief executive who also chairs the board as a potential problem?</p>",
    alternativer=[
        R("The board monitors the CEO, so as chair he would lead the body that monitors him"),
        F("The chair has a casting vote, which gives the CEO a majority on every decision the board takes",
          "A casting vote matters only in a tie. The problem is control over the board's agenda and information."),
        F("Holding both roles doubles his pay, which raises the firm's agency costs",
          "The concern is not his pay but the weakening of monitoring."),
        F("Combining the roles is illegal in every country, so the firm risks sanctions",
          "Many countries allow it, the US among them. Norway's ASA rules are a local exception. The problem is "
          "incentives, not legality."),
    ],
    kort="<p><b>He would chair his own monitor.</b> As chair the CEO sets the board's agenda and controls its "
         "information, which weakens the board's ability to check him.</p>",
    full="<p><b>The board's role.</b> The board hires, pays and can fire the CEO and approves major decisions. It "
         "depends on information, much of which comes from management.</p>"
         "<p><b>The problem.</b> The chair runs the board: sets the agenda, leads the meetings and shapes what "
         "the directors see. A CEO who is also chair controls the body that is supposed to monitor him. "
         "Criticism is harder to raise and the board is closer to being captive.</p>"
         "<p><b>In the general framework.</b> The combination is common, for example in US firms and the lecture "
         "lists it as a potential issue together with a captive board. Remedies are an independent chair or a lead "
         "independent director. Only if the question names a Norwegian ASA do local rules apply: there the CEO "
         "cannot sit on the board at all.</p>"
         "<p><b>Remember:</b> the monitor should not be led by the person it monitors.</p>",
)

statisk(
    "gov-s07", tema="governance", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about a staggered board as a defence and whether the answer depends on the jurisdiction.",
        "Staggered board: only a fraction of the directors stand for election each year. Company law decides when and "
        "how shareholders can remove directors between elections. It differs between countries.",
        "<p><b>Step 1: statement I.</b> With a third of the seats up each year, how many meetings does a new "
        "majority owner need to control the board?</p>"
        "<p><b>Step 2: statement II.</b> Recall what Norwegian company law lets the general meeting do with "
        "directors before their term ends.</p>",
    ),
    q="<p>Consider two statements about a staggered board, where a third of the directors stand for election each "
      "year.</p>"
      "<p>I. A bidder who buys a majority of the shares still needs two annual meetings to control the board.</p>"
      "<p>II. In a Norwegian ASA, staggered terms delay a new majority owner in the same way.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: in an ASA the general meeting can remove directors at any time, so "
                     "staggered terms do not hold a new owner back the way they do under US-style rules."),
        F("Both I and II", "Statement II fails: Norwegian company law lets the general meeting remove directors at any "
                           "time, so the terms themselves do not bind."),
        F("Neither", "Count the seats: if a third are elected each year, how many elections does a new owner need to "
                     "hold a majority of them?"),
    ],
    kort="<p><b>Only I.</b> With staggered terms a bidder needs two elections to win a majority of the board. In an ASA "
         "the general meeting can remove directors at any time, so the delay is only the time it takes to call a "
         "meeting.</p>",
    full="<p><b>Statement I, the general framework.</b> With a third of the seats up each year, a bidder who wins the "
         "shares wins a third of the board at the next annual meeting and a majority only at the one after. "
         "Meanwhile the old directors keep defences such as a poison pill that only they can remove. The lecture: "
         "a staggered board makes it much harder to replace incumbent members. Combined with a pill it can block "
         "a bid.</p>"
         "<p><b>Statement II, the Norwegian exception.</b> In an ASA the general meeting can remove the directors it "
         "has elected at any time (allmennaksjeloven § 6-7). A new majority owner can demand an extraordinary "
         "general meeting and replace them, so staggered terms do not delay him the way they do under US-style "
         "rules. Some delay remains: the meeting must be called with notice, directors elected by the employees "
         "stay. In firms with a corporate assembly (bedriftsforsamling) it is the assembly that elects the "
         "board.</p>"
         "<p><b>Exam rule.</b> Answer in the general framework of the lectures, where staggered boards and pills "
         "work as described. Bring in Norwegian law only when the question names an ASA or Norway (Kurbatov's "
         "exams name no jurisdiction).</p>"
         "<p><b>Remember:</b> staggered boards entrench under US-style rules. Governance claims are jurisdiction "
         "claims.</p>",
)

statisk(
    "gov-s08", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about pay contracts: what stock options in the CEO's pay do to his incentives.",
        "An option pays max(S − K, 0). Its value rises with the share price and with volatility. Stock-based pay "
        "ties the manager's wealth to the share price.",
        "<p><b>Step 1: what does the option reward?</b> A higher share price.</p>"
        "<p><b>Step 2: what else raises an option's value?</b> Think about risk.</p>",
    ),
    q="<p>A board replaces part of the chief executive's salary with stock options. What does this do, according to "
      "the course?</p>",
    alternativer=[
        R("It ties his wealth to the share price but can also tempt him to take risk, since options gain from "
          "volatility"),
        F("It removes the agency problem, since through his options he now owns a large part of the firm he runs",
          "Options give him upside, not ownership. He still bears little of the downside and the cost of his perks."),
        F("It lowers the risk he bears, so he becomes more willing to invest in projects with a positive NPV",
          "Options make his pay riskier, not safer. And they reward volatility, not only NPV."),
        F("It has no effect on his behaviour, since the options pay off only if the share price rises anyway",
          "That is exactly the effect: he now gains when the price rises, so he has a reason to raise it."),
    ],
    kort="<p><b>Alignment with a side effect.</b> Options reward a higher share price, but their value also rises with "
         "risk, so they can push the manager towards gambles. Designing a perfect contract is not trivial.</p>",
    full="<p><b>Why stock-based pay.</b> A manager on a fixed salary bears little of the cost of shirking or of a bad "
         "acquisition. Pay in shares or options makes part of his wealth move with the share price, which aligns "
         "his interests with the owners'.</p>"
         "<p><b>The side effect.</b> An option pays max(S − K, 0): the holder gains from the upside and loses at most "
         "the option. Its value rises with volatility. A manager paid in options can therefore gain from risky "
         "projects even when they lower the firm's value, the same logic as risk shifting by shareholders against "
         "creditors.</p>"
         "<p><b>Other limits.</b> Options also reward market-wide rises the manager did nothing for and short "
         "vesting invites short-termism. Remedies: restricted shares that vest over several years, performance "
         "measured against peers, clawbacks.</p>"
         "<p><b>The lecture's question.</b> Is it possible to design a perfect contract? Performance metrics, "
         "stock-based pay and golden parachutes each fix one problem and create another. The summary: designing an "
         "optimal contract is not trivial.</p>"
         "<p><b>Remember:</b> options align on the upside and reward risk.</p>",
)

statisk(
    "gov-s09", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about golden parachutes: payments to a manager who loses his job, typically in a takeover.",
        "A manager resists a takeover if he loses more personally than he gains. A payment on dismissal changes "
        "that calculation.",
        "<p><b>Step 1: why might a manager resist a bid that is good for the owners?</b></p>"
        "<p><b>Step 2: what does a payment on dismissal do to that resistance?</b></p>"
        "<p><b>Step 3: what is the risk?</b></p>",
    ),
    q="<p>A board promises the chief executive a large payment if he loses his job after a takeover. Which reading of "
      "this golden parachute is consistent with the lecture?</p>",
    alternativer=[
        R("It can make him accept a good bid he would resist, but it can also reward poor management"),
        F("It mainly entrenches him, since it pays out as long as he blocks the bids, though it also raises his pay",
          "It pays him when a bid succeeds and he leaves, so it reduces his reason to block bids, not the reverse."),
        F("It has little governance effect, since it is paid only after he leaves, though it does raise his total pay",
          "The promise affects what he does before he leaves: whether he fights or accepts a bid."),
        F("It works mainly as a defence, since it can make a bid too costly, unless the bidder is very large",
          "It raises the cost of a bid somewhat, but its size is small relative to the deal. It does not block bids."),
    ],
    kort="<p><b>Two readings.</b> It reduces the manager's personal cost of losing a takeover, so he resists less. But "
         "it also rewards failure and can be a perk that entrenched managers grant themselves.</p>",
    full="<p><b>The problem it addresses.</b> A takeover often costs the target's CEO his job. If the bid is good for the "
         "shareholders, he may still fight it to keep his position: entrenchment.</p>"
         "<p><b>The case for.</b> A golden parachute compensates him for losing his job, so he loses less from a "
         "successful bid and has less reason to resist one that creates value. Seen this way it aligns his "
         "interests with the owners'.</p>"
         "<p><b>The case against.</b> It pays the manager most when he is pushed out, which can reward poor "
         "management. Parachutes granted by a friendly board can be a private benefit in their own right. The "
         "lecture lists golden parachutes both under compensation and among the anti-takeover defences and asks "
         "the key question: are such measures good for firm value, or do they entrench management and signal poor "
         "governance?</p>"
         "<p><b>In an exam.</b> Name both readings and say what evidence would separate them.</p>"
         "<p><b>Remember:</b> a golden parachute can buy cooperation with a bid or reward failure.</p>",
)

statisk(
    "gov-s10", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about relative performance evaluation: paying the manager on how the firm does compared with its "
        "peers.",
        "Share price return = market and industry effect + the manager's own contribution + noise. Peers in the same "
        "industry face the same market and industry effect.",
        "<p><b>Step 1: what moves the firm's share price that the manager does not control?</b></p>"
        "<p><b>Step 2: what happens to each part of the return when you subtract the peers' return?</b></p>",
    ),
    q="<p>Why can pay based on performance relative to peers be better than pay based on the firm's own share "
      "price?</p>",
    alternativer=[
        R("It filters out market and industry moves he does not control, so pay rewards his own contribution"),
        F("It raises his pay in bad years, so he is less likely to leave when the firm struggles",
          "Relative pay can fall in a good year and rise in a bad one. The point is to measure his contribution, not "
          "to stabilise his pay."),
        F("It guarantees that he is paid the industry average every year, which keeps his pay fair and competitive",
          "It pays more for beating peers and less for trailing them. That is the opposite of an average."),
        F("It removes his incentive to take risk, since peers take the same risks",
          "It does not remove risk-taking. It removes rewards for luck that hits the whole industry."),
    ],
    kort="<p><b>It filters out luck.</b> A rising market lifts every firm. Comparing with peers removes that common "
         "part, so the manager is paid for what he adds.</p>",
    full="<p><b>The problem with absolute pay.</b> A share price moves for many reasons: the market, the industry, "
         "oil prices, interest rates. A CEO paid on his own share price gets rich in a bull market and poor in a "
         "crash, whatever he does. That weakens the link between effort and pay and loads him with risk he cannot "
         "control.</p>"
         "<p><b>Relative performance evaluation.</b> Measure performance against a peer group. The common movements "
         "cancel and what is left is closer to the manager's own contribution. The incentive becomes sharper at the "
         "same cost in risk.</p>"
         "<p><b>Limits.</b> Peer groups can be chosen to flatter. A manager may also gain by hurting rivals rather "
         "than by improving his own firm.</p>"
         "<p><b>Where it fits.</b> It is one of the remedies for the short-termism that simple KPIs create, together "
         "with long vesting and clawbacks. In an exam answer on redesigning pay, name it with the mechanism: it "
         "makes shirking costly to the manager himself.</p>"
         "<p><b>Remember:</b> pay for performance should pay for the manager's performance, not the market's.</p>",
)

statisk(
    "gov-s11", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about why a 'just vote no' campaign against directors so seldom changes the result.",
        "A protest vote changes the result only if enough shares are voted against the directors. Holders differ in "
        "whether and how they decide how to vote.",
        "<p><b>Step 1: who holds the shares?</b> Small private holders and large institutions.</p>"
        "<p><b>Step 2: for each kind of holder, ask what it costs to study the vote and who does that work.</b></p>",
    ),
    q="<p>Activists sometimes urge shareholders to 'just vote no' on the directors up for election. Why does this rarely "
      "change the outcome?</p>",
    alternativer=[
        R("Many small holders do not vote and many institutions follow proxy advisers, so dissent rarely adds up"),
        F("Votes against directors are not counted in most firms, so a 'no' vote has no legal effect on the election",
          "Votes against are counted and published. The problem is getting enough of them."),
        F("The chief executive can veto the result of any vote on the board's composition",
          "Shareholders, not the CEO, elect the board. The obstacle is turnout and coordination."),
        F("Directors are appointed for life, so there is nothing to vote on at the meeting",
          "Directors stand for election, all at once or in staggered groups. The vote takes place; the dissent "
          "rarely wins."),
    ],
    kort="<p><b>Turnout and delegation.</b> Retail holders vote few of their shares and institutions largely follow "
         "ISS or Glass Lewis, so a protest vote rarely reaches a majority.</p>",
    full="<p><b>The idea.</b> Shareholders can protest without a full proxy contest by withholding votes from directors "
         "or voting against the pay report. It is cheap, which is its appeal.</p>"
         "<p><b>Why it rarely wins.</b> The lecture's reading (with Broadridge's ProxyPulse and the Microsoft vote "
         "results as illustration): retail investors vote only a small share of their shares and institutions often "
         "delegate the decision to proxy advisers. A campaign must therefore persuade the advisers or the largest "
         "institutions. Without them, protest votes stay a minority.</p>"
         "<p><b>Why it can still matter.</b> Directors care about their reputations. A large protest vote, even a "
         "losing one, signals that the board has lost support and can push it to act. Say-on-pay votes work the same "
         "way: usually advisory, but visible.</p>"
         "<p><b>The free-rider link.</b> Each small holder bears his own cost of studying the issue and gains little "
         "from his vote, so many do not vote at all.</p>"
         "<p><b>Remember:</b> a vote is only as strong as the turnout behind it.</p>",
)

statisk(
    "gov-s12", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about shareholder proposals: adding an item to the agenda of the general meeting.",
        "Shareholders who meet the requirements can put a proposal on the agenda. The meeting then discusses it and "
        "votes. Many proposals are advisory.",
        "<p><b>Step 1: what does the proposal force to happen?</b></p>"
        "<p><b>Step 2: what does it not do on its own?</b></p>",
    ),
    q="<p>What does a shareholder proposal achieve?</p>",
    alternativer=[
        R("It puts a specific item on the agenda and forces a recorded vote, even if the board opposes it"),
        F("It replaces the board at once if it gets a majority of the votes cast",
          "Replacing directors needs an election, as in a proxy contest. A proposal on its own changes the agenda."),
        F("It gives the shareholder who files it a seat on the board",
          "Filing a proposal does not make anyone a director."),
        F("It obliges the board to carry out the proposal whatever the result of the vote at the general meeting",
          "Many proposals are advisory and none binds the board unless the meeting adopts it."),
    ],
    kort="<p><b>An item and a recorded vote.</b> The owners can force discussion and a public vote on a specific "
         "change. A strong vote puts pressure on the board even when it is not binding.</p>",
    full="<p><b>The tool.</b> The lecture lists ways shareholders can act: 'just vote no', adding items to the agenda, "
         "coordinated voting, activist campaigns and proxy contests. A shareholder proposal is the second: owners "
         "who meet the requirements put an item on the agenda of the general meeting.</p>"
         "<p><b>What it does.</b> It forces a discussion and a recorded vote on something the board may prefer to "
         "avoid: declassifying a staggered board, removing a poison pill, changing pay, splitting the chair and CEO "
         "roles. The lecture shows a real meeting agenda as an example.</p>"
         "<p><b>Its limits.</b> Many proposals are advisory. A board can ignore one that passes, at a cost to its "
         "reputation. Proposals also need other holders' votes, so the free-rider problem bites.</p>"
         "<p><b>Exam use.</b> In Kurbatov's key to H2024 E2 shareholders can request materials and submit items to "
         "ballots; if management ignores them, they can start activist campaigns and proxy fights.</p>"
         "<p><b>Remember:</b> a proposal sets the agenda. It persuades rather than commands.</p>",
)

statisk(
    "gov-s13", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about the proxy contest, one of the forms of shareholder action in the lecture.",
        "Proxy: the right to vote someone else's shares at the meeting. A contest is a competition for those votes "
        "between the board and a dissident.",
        "<p><b>Step 1: what does the dissident want to change?</b> The people on the board.</p>"
        "<p><b>Step 2: how does he get the votes?</b></p>",
    ),
    q="<p>What distinguishes a proxy contest from other forms of shareholder activism?</p>",
    alternativer=[
        R("The dissident nominates its own directors and asks the other shareholders to vote for them"),
        F("The dissident buys a majority of the shares through an offer made directly to the shareholders",
          "That is a tender offer, a takeover. A proxy contest wins votes, not shares."),
        F("The dissident sues the directors for breach of their duties to the shareholders",
          "Litigation is a separate tool. A proxy contest is fought at the general meeting."),
        F("The dissident sells its stake to push the share price down and pressure the board",
          "Selling is exit. A proxy contest is voice: it uses the votes of the shares."),
    ],
    kort="<p><b>A fight for votes.</b> The dissident runs its own slate of directors and solicits the other owners' "
         "votes. A new board can then replace the CEO without buying the firm.</p>",
    full="<p><b>The mechanism.</b> In a proxy contest a dissident shareholder, often an activist fund, nominates its "
         "own candidates for the board and campaigns for the votes of the other shareholders. If it wins, the new "
         "directors can replace the CEO and change strategy. It changes control without buying the firm.</p>"
         "<p><b>Its strength.</b> It goes over the head of the current board. Kurbatov's key to H2024 E2 lists it: if "
         "management ignores the shareholders, they can start activist campaigns and proxy fights.</p>"
         "<p><b>Its limits.</b> It is expensive and the dissident bears the whole cost while all holders share the "
         "gain (the free-rider problem). It needs the support of institutions, which often follow ISS or Glass "
         "Lewis. A staggered board can delay its effect.</p>"
         "<p><b>Related tools.</b> An activist campaign may stop short of a contest: public letters, private "
         "engagement, shareholder proposals. A takeover buys the shares instead of the votes.</p>"
         "<p><b>Remember:</b> a proxy contest replaces directors by winning votes, not by buying shares.</p>",
)

statisk(
    "gov-s14", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the free-rider problem among dispersed shareholders.",
        "Monitoring pays for one holder only if α × ΔV &gt; C, with α his stake, ΔV the gain to the firm and C the "
        "cost he bears alone.",
        "<p><b>Step 1: who pays for monitoring?</b></p>"
        "<p><b>Step 2: who gets the gain?</b></p>"
        "<p><b>Step 3: what does a holder with a tiny stake conclude?</b></p>",
    ),
    q="<p>Why do dispersed shareholders monitor managers too little?</p>",
    alternativer=[
        R("Each bears the full cost of monitoring but gets only his share of the gain, so it rarely pays"),
        F("Managers are allowed by law to refuse information to shareholders who own little",
          "Information rights are not the obstacle. Even with full information, a small holder gains too little to "
          "pay for acting."),
        F("Monitoring would break insider trading rules, since shareholders would learn private information",
          "Monitoring through the board and the general meeting is legal. The obstacle is incentives."),
        F("Small shareholders cannot vote, so monitoring by them would have no effect",
          "Every share normally carries a vote. The problem is that using it well costs more than it returns to a "
          "small holder."),
    ],
    kort="<p><b>A public good.</b> Monitoring benefits every shareholder, but the one who does it pays alone. Below "
         "the break-even stake C/ΔV it does not pay, so everyone waits for someone else.</p>",
    full="<p><b>The logic.</b> Suppose monitoring would raise the firm's value by ΔV and cost C. A holder with stake α "
         "gains α × ΔV and pays C. He acts only if α × ΔV &gt; C, that is if α &gt; C/ΔV. With dispersed ownership "
         "almost nobody passes that threshold, even when monitoring would create far more value than it costs for "
         "the shareholders together.</p>"
         "<p><b>The consequence.</b> Managers of widely held firms are monitored too little. The lecture lists "
         "dispersed ownership that leads to free-riding as one of the costs of being public.</p>"
         "<p><b>The answers.</b> Large blockholders, who internalise enough of the gain. Institutional investors and "
         "activists, who specialise in monitoring. Proxy advisers, who spread the cost of analysis over many "
         "clients. The board, paid to monitor on everyone's behalf. Regulation that lowers the cost of acting.</p>"
         "<p><b>Exam use.</b> In H2025 E2 the 5–10% stake is the point: large enough for monitoring to pay, too small "
         "to win a vote alone.</p>"
         "<p><b>Remember:</b> the one who monitors pays alone and shares the gain with everyone.</p>",
)

statisk(
    "gov-s15", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is the free-rider problem in takeovers: why a raider must pay small shareholders nearly all of the "
        "improvement he brings.",
        "A small holder takes the outcome of the bid as given: his own shares cannot decide it. Compare his two "
        "choices, tender or hold, in the case where the bid succeeds.",
        "<p><b>Step 1: what is a share worth after a successful takeover?</b></p>"
        "<p><b>Step 2: what does the holder get if he tenders? What if he holds?</b></p>"
        "<p><b>Step 3: strike the options that need a rule, a rival or a worse raider to work.</b></p>",
    ),
    q="<p>A raider bids for a badly run firm whose shares would be worth 60 instead of 40 under new management. Why "
      "does each small shareholder refuse to sell for much less than 60?</p>",
    alternativer=[
        R("If the bid succeeds without his shares, he keeps a share worth 60, so selling for less loses him money"),
        F("He expects the board to find a higher bidder before long, so he waits for a better offer to arrive",
          "The argument works with no other bidder at all. It rests on what his share is worth if this bid "
          "succeeds."),
        F("The law requires every bid to be made at the value the shares will have after the takeover",
          "No such rule is needed. Each holder's own calculation pushes the price up."),
        F("The raider's management will be worse than the current one, so he prefers to keep his shares under the old "
          "managers",
          "The raider's plan raises the value. The holder refuses to sell cheaply precisely because he believes "
          "that."),
    ],
    kort="<p><b>He free-rides on the raider.</b> His single share does not decide the bid. If it succeeds, he keeps a "
         "share worth 60, so he tenders only at about 60 and the raider earns little.</p>",
    full="<p><b>The setting.</b> Shares trade at 40 under the current managers. A raider can raise the value to 60. "
         "Each shareholder owns too little to decide whether the bid succeeds.</p>"
         "<p><b>Each holder's reasoning.</b> If the bid succeeds and I did not sell, my share is worth 60. If I sell, "
         "I get the bid. So any bid below 60 is worse than holding out. Every holder reasons the same way, so a bid "
         "below 60 fails.</p>"
         "<p><b>The consequence.</b> The raider must pay nearly the whole improvement to the target's owners and is "
         "left with little gain. This helps explain the evidence: targets earn about 15% at announcements and "
         "acquirers about 1%.</p>"
         "<p><b>The escapes.</b> Buy a toehold stake secretly before announcing, so the gain on those shares is the "
         "raider's. Or make holding out unattractive, for example by squeezing out the remaining holders after the "
         "takeover.</p>"
         "<p><b>Remember:</b> in a takeover, small holders free-ride on the bidder's improvement, which pushes the "
         "price towards the post-takeover value.</p>",
)

statisk(
    "gov-s16", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about proxy advisers such as ISS and Glass Lewis and the question the lecture raises about them.",
        "Proxy advisers distribute proxy materials and issue voting recommendations. Many investors just follow "
        "them.",
        "<p><b>Step 1: why do institutions use them?</b> Think of the cost of analysing thousands of votes.</p>"
        "<p><b>Step 2: what is the risk if most votes follow a few advisers?</b></p>",
    ),
    q="<p>Many institutional investors vote as ISS or Glass Lewis recommend. What is the main concern the lecture "
      "raises about this?</p>",
    alternativer=[
        R("Blind following hands great influence to a few firms with standard policies and little firm knowledge"),
        F("Proxy advisers are paid by the managers of the firms they cover, so their advice always supports the board",
          "Advisers are paid by the investors who buy their research and they often recommend votes against "
          "boards."),
        F("Their recommendations bind investors by law, so institutions have no say over their own votes",
          "The recommendations are advice. The concern is that so many investors follow them without their own "
          "analysis."),
        F("They vote the shares themselves on behalf of the shareholders, who thus lose their voting rights",
          "Advisers recommend. The shareholders or the fund managers still cast the votes."),
    ],
    kort="<p><b>Is following them optimal?</b> Delegating saves costs, but if most institutions vote the same way on a "
         "few advisers' standard policies, those advisers shape the outcome without owning anything.</p>",
    full="<p><b>What proxy advisers do.</b> ISS and Glass Lewis distribute proxy materials and issue recommendations "
         "on every resolution and director at thousands of meetings. Institutions that hold shares in many firms use "
         "them to vote at a fraction of the cost of their own analysis.</p>"
         "<p><b>Why it helps.</b> It eases the free-rider problem: the cost of studying each vote is spread over many "
         "clients. A campaign that wins the advisers' support can win the vote.</p>"
         "<p><b>The concern.</b> The lecture notes that many investors just follow the recommendations and asks: is "
         "that optimal? The advisers apply one-size policies, have limited knowledge of each firm and own no shares "
         "themselves. A great deal of influence sits with a few firms. The lecture's reading includes ISS's US voting "
         "guidelines, the kind of standard policy that is then applied across thousands of firms.</p>"
         "<p><b>Exam use.</b> In a question on what a blockholder can do, winning over the proxy advisers is a "
         "concrete step with a clear mechanism.</p>"
         "<p><b>Remember:</b> proxy advisers lower the cost of voting and concentrate influence.</p>",
)

statisk(
    "gov-s17", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the poison pill, a charter-based takeover defence.",
        "Defences on the lecture's list act on different things: the bidder's stake, the board's terms, the votes a "
        "merger needs, the target's assets or the managers' pay. A pill is a right attached to the target's shares.",
        "<p><b>Step 1: match each option to a defence on the list.</b></p>"
        "<p><b>Step 2: for the pill, ask what crossing a set stake does to the value of the bidder's shares.</b></p>",
    ),
    q="<p>How does a poison pill deter a hostile bidder?</p>",
    alternativer=[
        R("Past a trigger stake, the other holders may buy shares cheaply, which dilutes the bidder"),
        F("It forces the bidder to pay a fixed premium that the board has set in advance in the charter",
          "A pill sets no price. It makes crossing the trigger so costly that the bidder must negotiate with the "
          "board."),
        F("It lets the target sell the assets the bidder wants before the bid can close",
          "That is a scorched-earth defence, selling the crown jewels."),
        F("It pays the chief executive a large sum if he loses his job after a takeover",
          "That is a golden parachute."),
    ],
    kort="<p><b>Dilution of the bidder.</b> Above the trigger, everyone except the bidder can buy cheap shares. Only the "
         "board can redeem the pill, so the bidder must deal with the board or replace it.</p>",
    full="<p><b>The mechanism.</b> A poison pill is a right attached to the shares. If a bidder buys more than a set "
         "stake without the board's approval, all other shareholders may buy new shares at a deep discount. The "
         "bidder's stake and the value of each of its shares are diluted, so crossing the trigger becomes very "
         "costly. The board can redeem the pill, so in practice a bidder must negotiate with the board.</p>"
         "<p><b>With a staggered board.</b> A bidder could try to replace the board to remove the pill, but with "
         "staggered terms that takes two annual meetings. The two together can block a bid.</p>"
         "<p><b>Two readings.</b> Shareholder bargaining: the pill makes the board a single tough negotiator that can "
         "extract a higher premium. Entrenchment: it gives the people the bid would displace a veto. The lecture's "
         "key question: are defensive measures good for firm value, or do they entrench management?</p>"
         "<p><b>In the general framework.</b> Board-adopted pills belong to US-style rules. In a Norwegian ASA a "
         "board may not take defensive steps against a notified bid without the general meeting's authority.</p>"
         "<p><b>Remember:</b> a pill dilutes the bidder and hands the decision to the board.</p>",
)

statisk(
    "gov-s18", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is one of the defences on the lecture's list: the white knight.",
        "Defences either make the target less attractive, make control harder to win, buy off the bidder or bring "
        "in someone else.",
        "<p><b>Step 1: which defence brings in another party?</b></p>"
        "<p><b>Step 2: what is that party's role?</b></p>",
    ),
    q="<p>What is a white knight defence?</p>",
    alternativer=[
        R("The target invites a friendlier buyer to make a competing bid"),
        F("The target buys back the raider's stake at a premium so that it goes away",
          "That is greenmail, a targeted repurchase of a block."),
        F("The target sells or destroys the asset the bidder wants most",
          "That is a scorched-earth defence."),
        F("The charter requires a large majority of the votes to approve a merger",
          "That is a supermajority rule, a charter provision."),
    ],
    kort="<p><b>A friendlier buyer.</b> The target's board finds another bidder it prefers. The firm is still sold, but "
         "to someone the managers choose.</p>",
    full="<p><b>The defence.</b> Faced with a hostile bid, the target's board invites a different buyer, the white "
         "knight, to make a competing offer on friendlier terms: keeping the management, the strategy or the "
         "workforce.</p>"
         "<p><b>Two readings.</b> For the shareholders it can be good: a second bidder creates an auction and can "
         "raise the price. It can also serve the managers: they pick the buyer that keeps them in place, possibly "
         "at a lower price than the hostile bidder would have paid.</p>"
         "<p><b>The lecture's list of defences.</b> Corporate charter provisions (poison pills, staggered boards, "
         "supermajority rules), scorched-earth policies (sell or destroy the asset of interest), white knights, "
         "greenmail (a targeted block repurchase), regulatory barriers and golden parachutes. The key question for "
         "each: is it good for firm value, or does it entrench management?</p>"
         "<p><b>Remember:</b> a white knight is a friendlier competing bidder. Ask whether it raises the price or "
         "protects the managers.</p>",
)

statisk(
    "gov-s19", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is greenmail, one of the defences on the lecture's list.",
        "Each defence on the lecture's list involves a different party: the bidder, a friendly buyer, a raider, the "
        "managers or the charter.",
        "<p><b>Step 1: for each option, ask who pays and who receives.</b></p>"
        "<p><b>Step 2: which one is a payment by the target to someone threatening it?</b></p>",
    ),
    q="<p>What is greenmail?</p>",
    alternativer=[
        R("The target buys back a raider's block at a premium so that the raider goes away"),
        F("A payment to the chief executive if he loses his job after a takeover",
          "That is a golden parachute."),
        F("A charter rule that requires two thirds of the votes to approve a merger",
          "That is a supermajority rule."),
        F("A bidder's secret purchase of a small stake in the target before it announces its bid",
          "That is a toehold, which the bidder builds. Greenmail is paid by the target."),
    ],
    kort="<p><b>A targeted buyback.</b> The firm pays the raider a premium for his block. The raider gains, the "
         "managers keep their jobs and the other shareholders pay the premium.</p>",
    full="<p><b>The defence.</b> A raider buys a block of shares and threatens a takeover or a proxy contest. The "
         "target's managers buy the block back at a premium that is not offered to the other shareholders. The "
         "raider leaves with a profit. The lecture lists it as greenmail, a targeted block stock repurchase.</p>"
         "<p><b>Who wins and who loses.</b> The raider gains the premium. The managers keep their jobs. The remaining "
         "shareholders pay the premium with their firm's cash and lose the takeover that might have improved the "
         "firm. It is hard to read greenmail as anything but entrenchment.</p>"
         "<p><b>The broader point.</b> Each defence on the lecture's list raises the same question: does it help "
         "the shareholders bargain for a better price, or does it protect managers from the market for corporate "
         "control? For greenmail the answer leans clearly one way.</p>"
         "<p><b>Remember:</b> greenmail pays a raider to leave with the other owners' money.</p>",
)

statisk(
    "gov-s20", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about a charter provision that changes what it takes to approve a merger. Name the defence and its "
        "effect.",
        "A simple majority is more than half of the votes cast. Defences on the lecture's list work through dilution, "
        "through the board's terms, through the votes needed or through pay.",
        "<p><b>Step 1: what decision does the 80% rule cover?</b></p>"
        "<p><b>Step 2: which of the four channels does it use?</b></p>",
    ),
    q="<p>A firm's charter requires 80% of the votes to approve a merger. What kind of defence is this and what does it "
      "do?</p>",
    alternativer=[
        R("A supermajority rule: a bidder needs far more than half the votes to complete a merger"),
        F("A poison pill: shareholders other than the bidder may buy shares cheaply",
          "A pill dilutes a bidder who crosses a trigger. This rule raises the share of votes a merger needs."),
        F("A staggered board: only a fraction of the directors stand for election each year",
          "Staggering is about the board's terms. This rule is about the vote on the merger itself."),
        F("A golden parachute: the managers receive a large payment if the merger goes through and they leave",
          "A parachute pays the managers. This rule makes the merger harder to approve."),
    ],
    kort="<p><b>A supermajority rule.</b> With 80% required, a bidder who wins a simple majority, or even 75%, still "
         "cannot approve the merger. A minority can block it.</p>",
    full="<p><b>The defence.</b> A supermajority rule is a corporate charter provision that requires a larger "
         "majority than usual, here 80%, for decisions such as a merger or changes to the board. A bidder must "
         "persuade or buy almost all of the shareholders.</p>"
         "<p><b>Two readings.</b> It can protect minority holders against a coercive bid that a bare majority would "
         "accept. It can also let a small group, often insiders, block a bid that most shareholders want: "
         "entrenchment.</p>"
         "<p><b>Its place on the list.</b> The lecture's charter provisions are poison pills, staggered boards and "
         "supermajority rules. Together they can make a hostile takeover very hard, which weakens the market for "
         "corporate control as a monitor.</p>"
         "<p><b>Remember:</b> a supermajority rule lets a minority veto a merger. Ask whose minority it is.</p>",
)

statisk(
    "gov-s21", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about a defence that works by changing what the target owns. Match the action to its name on the "
        "lecture's list.",
        "The lecture's list: charter provisions (poison pills, staggered boards, supermajority rules), scorched-earth "
        "policies, white knights, greenmail, regulatory barriers and golden parachutes. Each acts on something "
        "different.",
        "<p><b>Step 1: what does each defence act on?</b> The bidder's stake, the buyer, the raider or the assets.</p>"
        "<p><b>Step 2: who pays for a defence that acts on the assets?</b></p>",
    ),
    q="<p>Faced with a hostile bid, a target sells the division the bidder wanted most, at a low price. What is this "
      "defence called?</p>",
    alternativer=[
        R("Scorched earth: the target sells or destroys the asset of interest"),
        F("White knight: the target invites a friendlier buyer to bid",
          "A white knight buys the whole firm. Here the target gets rid of what the bidder wants."),
        F("Greenmail: the target buys back the raider's block of shares at a premium",
          "Greenmail pays the raider to leave. Here the target sells its own assets."),
        F("Poison pill: the bidder's stake is diluted by cheap new shares",
          "A pill dilutes the bidder's shares. Here the target's assets are sold."),
    ],
    kort="<p><b>Scorched earth.</b> The target destroys its own attraction. The bid may go away, but the shareholders "
         "lose value on the sale.</p>",
    full="<p><b>The defence.</b> A scorched-earth policy makes the target less attractive by selling or destroying the "
         "asset of interest. Selling the 'crown jewels' at a low price, or taking on obligations a bidder would not "
         "want, can make the bid pointless.</p>"
         "<p><b>Who pays.</b> The shareholders. The firm gives up valuable assets, often cheaply, to defeat a bid "
         "that offered them a premium. Unlike a pill, which can be used to bargain for a higher price, this defence "
         "destroys value deliberately. It is hard to defend as anything but entrenchment.</p>"
         "<p><b>The lecture's list.</b> Charter provisions (pills, staggered boards, supermajority rules), "
         "scorched-earth policies, white knights, greenmail, regulatory barriers and golden parachutes. The key "
         "question: are defensive measures good for firm value or signs of poor governance?</p>"
         "<p><b>Remember:</b> scorched earth defeats the bid by destroying what made the firm worth bidding for.</p>",
)

statisk(
    "gov-s22", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is the debate about takeover defences: do they help shareholders bargain or do they entrench managers? "
        "You need the evidence that points to entrenchment.",
        "Bargaining: defences raise the price a bidder pays. Entrenchment: defences protect managers from being "
        "replaced, so bids are deterred.",
        "<p><b>Step 1: what would each view predict?</b> About premiums, about the number of bids, about what happens "
        "to managers.</p>"
        "<p><b>Step 2: pick the observation only entrenchment predicts.</b></p>",
    ),
    q="<p>Which observation points to entrenchment rather than bargaining as the effect of takeover defences?</p>",
    alternativer=[
        R("Firms with defences receive fewer bids and their managers keep their jobs after poor results"),
        F("Firms with defences that are sold fetch higher premiums than firms without them",
          "That is what the bargaining view predicts: the board uses the defence to hold out for more."),
        F("The board negotiates a clearly higher price from the bidder before it agrees to remove the pill",
          "That is bargaining in action: the defence buys the owners a better price."),
        F("Bidders raise their offers after the target's board rejects the first one",
          "A higher offer after a rejection fits the bargaining view."),
    ],
    kort="<p><b>Fewer bids, safe managers.</b> If defences deter bids and protect poor managers, they serve the "
         "managers. Higher premiums for defended firms would point to bargaining instead.</p>",
    full="<p><b>Two views.</b> The lecture ends its list of defences with the key question: are defensive measures good "
         "for firm value, or do they entrench management and signal poor governance?</p>"
         "<p><b>Bargaining.</b> A defence makes the board a single strong negotiator. Bidders must deal with it and "
         "it can hold out for a higher premium. Prediction: defended firms that are sold fetch more.</p>"
         "<p><b>Entrenchment.</b> A defence gives the managers whom the bid would displace a veto. Prediction: "
         "defended firms receive fewer bids, are less often taken over and keep managers who perform poorly. The "
         "market for corporate control loses its force.</p>"
         "<p><b>Why both can be true.</b> A defence can raise the premium in the deals that happen and still deter "
         "many deals that would have happened. What matters for the owners is the total effect.</p>"
         "<p><b>Exam use.</b> When a question asks whether a defence is good, name both readings and the evidence "
         "that would separate them.</p>"
         "<p><b>Remember:</b> higher premiums suggest bargaining; fewer bids and protected managers suggest "
         "entrenchment.</p>",
)

statisk(
    "gov-s23", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the market for corporate control, which the lecture calls external monitoring.",
        "The market for corporate control is where control of firms is bought and sold. A threat can discipline even "
        "if it is never carried out.",
        "<p><b>Step 1: what is a badly run firm worth to someone who could run it better?</b></p>"
        "<p><b>Step 2: why does that matter to managers who have not received a bid?</b></p>",
    ),
    q="<p>How does the market for corporate control discipline managers even when no bid is ever made?</p>",
    alternativer=[
        R("The threat that a buyer will take over a badly run firm and replace its managers"),
        F("Managers must report to the stock exchange every quarter, which reveals any shirking",
          "Disclosure is regulation. The market for corporate control works through the threat of a takeover."),
        F("Bidders pay a premium, so managers earn more when their firm is bought",
          "Managers of a target usually lose their jobs. That is what makes the threat discipline them."),
        F("Competitors copy the firm's strategy, so managers must keep improving",
          "That is product market competition, a different force."),
    ],
    kort="<p><b>The threat of a takeover.</b> Poor management lowers the share price and invites a bidder who would "
         "replace the managers. Fearing that, managers work for value.</p>",
    full="<p><b>The mechanism.</b> A badly run firm trades below what it would be worth under better management. A "
         "bidder can buy control, install new managers and keep the gain. The lecture calls this external "
         "monitoring: if the firm does not perform, it can be acquired by a competitor who installs a more "
         "efficient management (Kurbatov's key to H2024 E2).</p>"
         "<p><b>Why the threat works.</b> Managers know that a low share price can cost them their jobs. The lecture: "
         "even the threat of a takeover might discipline current management. Hostile takeovers can bring new "
         "management, new ideas and better performance.</p>"
         "<p><b>What weakens it.</b> Takeover defences (pills, staggered boards, supermajority rules), dual-class "
         "shares, regulatory barriers and the free-rider problem in takeovers, which forces bidders to pay away most "
         "of the gain. The lecture warns that takeover threats can also lead to more entrenchment.</p>"
         "<p><b>Exam use.</b> For a blockholder, inviting a bidder and offering the stake as a toehold is an action "
         "through this channel. Kurbatov's key to H2025 E2 accepts finding a good acquirer or an LBO.</p>"
         "<p><b>Remember:</b> the market for corporate control disciplines through the threat of being bought.</p>",
)

statisk(
    "gov-s24", tema="governance", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is the debate on shareholders against stakeholders, with Friedman's argument and the Stanford survey "
        "from the lecture.",
        "Friedman: the social responsibility of business is to increase its profits. The Stanford survey asked "
        "CEOs and CFOs how they weigh shareholders against other stakeholders.",
        "<p><b>Step 1: statement I.</b> What was Friedman's objection to managers pursuing social goals?</p>"
        "<p><b>Step 2: statement II.</b> Recall how many said shareholders are clearly more important.</p>",
    ),
    q="<p>Consider two statements.</p>"
      "<p>I. Friedman (1970) argued that a manager who spends the owners' money on social goals acts against the "
      "people who employ him.</p>"
      "<p>II. In the Stanford survey shown in the lecture, most CEOs and CFOs said shareholders' interests are clearly "
      "more important than those of other stakeholders.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: only about a quarter said shareholders are clearly more important."),
        F("Both I and II", "Statement II fails: most respondents said stakeholder interests matter and only about a "
                           "quarter put shareholders clearly first."),
        F("Neither", "Recall what Friedman said about a manager who spends the owners' money on his own idea of the "
                     "social good."),
    ],
    kort="<p><b>Only I.</b> Friedman saw social responsibility spending as spending the owners' money. In the Stanford "
         "survey 89% said stakeholder interests are important and only 23% put shareholders clearly first.</p>",
    full="<p><b>Statement I.</b> Milton Friedman argued in 1970 that the social responsibility of business is to "
         "increase its profits. A manager is the owners' employee. Spending their money on social goals he chooses "
         "is in effect a tax he imposes without a mandate. The owners can give to causes themselves.</p>"
         "<p><b>Statement II.</b> The Stanford survey of CEOs and CFOs that the lecture shows points the other way: "
         "about 89% said it is important to take stakeholder interests into account, only about 23% said "
         "shareholders' interests are clearly more important and employees were named as the most important "
         "stakeholder.</p>"
         "<p><b>The lecture's question.</b> Shareholders or stakeholders? The stakeholder view adds employees, "
         "customers and society. Its critics see too many missions with conflicting interests, which leaves "
         "managers accountable to no one. Corporate governance in the course mainly deals with holding managers to "
         "account to the owners.</p>"
         "<p><b>Remember:</b> Friedman put the owners first; most managers in the survey say they weigh "
         "stakeholders too.</p>",
)

statisk(
    "gov-s25", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is the objection to making managers serve all stakeholders, as the lecture puts it.",
        "Governance aims to hold managers to account. Accountability needs a goal against which their decisions "
        "can be measured.",
        "<p><b>Step 1: how many goals does the stakeholder view give a manager?</b></p>"
        "<p><b>Step 2: what happens to accountability when the goals conflict?</b></p>",
    ),
    q="<p>What is the main objection to telling managers to serve all stakeholders equally, as the lecture puts it?</p>",
    alternativer=[
        R("Too many missions with conflicting interests leave no clear goal, so almost any decision can be "
          "justified"),
        F("Stakeholders other than shareholders have no legal rights, so serving them breaks the law",
          "Employees, customers and creditors have contracts and legal rights. The objection is about goals, not "
          "legality."),
        F("Serving stakeholders always lowers profits, so firms that do it go bankrupt",
          "Treating employees and customers well often raises profits. The objection is about accountability."),
        F("Stakeholders already control the board, so managers need not consider them",
          "In most firms shareholders elect the board. The objection is that a manager with many masters answers "
          "to none."),
    ],
    kort="<p><b>Too many missions.</b> Goals that conflict give no yardstick. A manager who answers to everyone can "
         "explain any decision by pointing to some stakeholder, so he answers to no one.</p>",
    full="<p><b>The stakeholder view.</b> Firms should weigh the interests of employees, customers, suppliers, "
         "communities and society, not only those of shareholders. Corporate social responsibility belongs here.</p>"
         "<p><b>The objection.</b> The lecture's summary of the critique: too many missions and conflicting "
         "interests. Higher wages, lower prices and higher returns cannot all be maximised at once. Without a single "
         "measurable goal, the owners cannot tell whether a manager is doing well and he can justify almost "
         "anything, including his own perks and projects, by pointing to some stakeholder. Accountability weakens, "
         "which is exactly what governance tries to prevent.</p>"
         "<p><b>The other side.</b> Long-run value often requires treating stakeholders well and the Stanford survey "
         "shows most executives say they weigh stakeholders. The disagreement is about what managers answer for.</p>"
         "<p><b>Remember:</b> a manager with many masters answers to none.</p>",
)

statisk(
    "gov-s26", tema="governance", type="fakta",
    hjelp=hjelp3(
        "This is about the Sarbanes-Oxley Act (SOX), the regulatory response to the accounting scandals of the early "
        "2000s.",
        "The lecture: the landmark case was Enron, about $11 billion in shareholder losses. The response was SOX "
        "and later Dodd-Frank. Each act has its own set of provisions.",
        "<p><b>Step 1: what failed at Enron?</b> The accounts and the auditor.</p>"
        "<p><b>Step 2: which provisions target that?</b></p>",
    ),
    q="<p>What did the Sarbanes-Oxley Act introduce after the Enron scandal?</p>",
    alternativer=[
        R("Independent auditors, more disclosure and personal responsibility of executives for the accounts"),
        F("Say-on-pay votes and the right of large shareholders to nominate directors",
          "Those belong to Dodd-Frank (2010), the later act."),
        F("Sanctions focused on punishing insiders who trade on private information",
          "That was the Insider Trading Sanctions Act of 1984."),
        F("A ban on staggered boards and poison pills in all listed firms",
          "Neither act banned takeover defences."),
    ],
    kort="<p><b>Audit, disclosure, responsibility.</b> SOX targeted the failure behind Enron: captured auditors and "
         "misleading accounts. Executives must personally stand behind the figures.</p>",
    full="<p><b>The background.</b> The early 2000s brought several cases of managerial abuse and fraud. The landmark "
         "case was Enron, with about $11 billion in shareholder losses. The regulatory response came in two acts: "
         "Sarbanes-Oxley (2002) and later Dodd-Frank (2010).</p>"
         "<p><b>SOX.</b> The lecture summarises it as independent auditors, enhanced disclosure and corporate "
         "responsibility. In practice: the CEO and CFO personally certify the accounts, management and the auditor "
         "report on internal controls, the audit committee must be independent and auditors are restricted from "
         "selling consulting services to the same client.</p>"
         "<p><b>Dodd-Frank.</b> Many provisions aimed at financial stability and for governance an independent "
         "compensation committee and a route for large shareholders to nominate board members.</p>"
         "<p><b>Why it is governance.</b> Monitors need reliable information. SOX strengthens the information the "
         "board and the market rely on. In the lecture's words, government facilitates monitoring by passing "
         "supportive legislation.</p>"
         "<p><b>Remember:</b> SOX is about the accounts and the auditor. Dodd-Frank is about pay and "
         "nominations.</p>",
)

statisk(
    "gov-s27", tema="governance", type="fakta",
    hjelp=hjelp3(
        "This is about the governance provisions of the Dodd-Frank Act, as the lecture summarises them.",
        "The lecture names two waves of regulation after scandals: Sarbanes-Oxley (2002) and Dodd-Frank (2010), plus "
        "the earlier Insider Trading Sanctions Act. Each targeted a different failure.",
        "<p><b>Step 1: which failure did each act respond to?</b></p>"
        "<p><b>Step 2: match the provisions to the act.</b></p>",
    ),
    q="<p>Which statement matches the lecture's summary of the Dodd-Frank Act?</p>",
    alternativer=[
        R("It brought independent compensation committees and a route for large shareholders to nominate directors"),
        F("It required independent auditors, more disclosure and personal responsibility for the accounts",
          "That is the lecture's summary of Sarbanes-Oxley, the response to Enron in 2002."),
        F("It focused on punishing insiders who trade on private information about their own firms",
          "That was the Insider Trading Sanctions Act of 1984, the first item in the lecture's timeline."),
        F("It banned staggered boards and poison pills in all listed firms to protect the market for control",
          "Neither act banned takeover defences. They remain charter provisions that firms choose."),
    ],
    kort="<p><b>Pay committees and nominations.</b> Besides many provisions aimed at financial stability, the lecture "
         "lists independent compensation committees and the right of large shareholders to nominate board "
         "members.</p>",
    full="<p><b>The background.</b> The early 2000s brought several cases of managerial abuse and fraud, with Enron as "
         "the landmark case. The lecture lists the regulatory response: Sarbanes-Oxley and later Dodd-Frank (2010). "
         "An earlier step was the Insider Trading Sanctions Act of 1984.</p>"
         "<p><b>Dodd-Frank in the lecture.</b> Multiple provisions designed to boost financial stability. For "
         "governance: an independent compensation committee and the possibility for large shareholders to nominate "
         "board members. Both target the board's control over itself: who sets the CEO's pay and who chooses the "
         "directors.</p>"
         "<p><b>Sarbanes-Oxley in the lecture.</b> Independent auditors, enhanced disclosure and corporate "
         "responsibility: it targets the accounts.</p>"
         "<p><b>A detail beyond the lecture.</b> The SEC's general rule giving large shareholders access to the "
         "company's ballot (proxy access) was struck down by a US court in 2011. Proxy access then spread firm by "
         "firm, often after shareholder proposals. On the exam the lecture's summary is enough.</p>"
         "<p><b>Remember:</b> SOX is about the accounts and the auditor. Dodd-Frank, for governance, is about pay "
         "committees and nominations.</p>",
)

statisk(
    "gov-s28", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is the trade-off in monitoring that the lecture stresses: freedom for the manager or tight control.",
        "Monitoring has a benefit (less shirking and waste) and a cost. Good projects are often risky.",
        "<p><b>Step 1: what does tight control punish?</b></p>"
        "<p><b>Step 2: what will a manager do to avoid punishment?</b></p>",
    ),
    q="<p>A new board requires its approval for every project above a small limit and announces that it will replace "
      "the chief executive after any quarter with a loss. What does the lecture warn about?</p>",
    alternativer=[
        R("A manager monitored too strongly becomes too passive and avoids good but risky projects"),
        F("Tight control always raises value, since every agency problem is then removed",
          "Monitoring has costs. Too much of it creates a new problem: excessive caution."),
        F("The chief executive will take more risk to avoid losses, gambling for resurrection",
          "Gambling for resurrection is a shareholder-creditor problem near default. Here the threat makes the "
          "manager avoid risk."),
        F("The board will become captive, since it now depends on the chief executive's information",
          "A captive board is too weak, not too strong. Here the board is very strict."),
    ],
    kort="<p><b>Too passive.</b> Punish every loss and the manager stops taking risks, including good ones. The "
         "lecture: freedom for the manager or tight control?</p>",
    full="<p><b>The trade-off.</b> Monitoring reduces shirking, perks and empire building. But it is not free. The "
         "lecture's point in the section on entrenchment: a manager who is monitored too strongly will be too "
         "passive. And in the summary: freedom for the manager or tight control?</p>"
         "<p><b>Why.</b> Good projects are often risky. If every loss can cost the manager his job and every decision "
         "needs approval, the safest course for him is to avoid risk and initiative. The firm then passes up "
         "positive-NPV projects, an agency cost of a different kind.</p>"
         "<p><b>What follows.</b> Good governance balances monitoring against discretion. Pay that rewards long-run "
         "value, judging performance over several years and against peers and boards that engage rather than "
         "micromanage all reduce the problem.</p>"
         "<p><b>Exam use.</b> When you propose stricter monitoring, add its limitation: it costs money and can make "
         "the manager too cautious.</p>"
         "<p><b>Remember:</b> too little monitoring invites shirking; too much invites passivity.</p>",
)

statisk(
    "gov-s29", tema="governance", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is diversification as a motive for a merger: what it does to risk and whether it creates value for "
        "the shareholders.",
        "σ<sub>A+B</sub> = √(σ<sub>A</sub>² + σ<sub>B</sub>² + 2ρσ<sub>A</sub>σ<sub>B</sub>), with ρ the correlation "
        "between the two cash flows. Without synergies the merged firm's cash flow is the sum of the two.",
        "<p><b>Step 1: statement I.</b> Compare σ<sub>A+B</sub> with σ<sub>A</sub> + σ<sub>B</sub> when ρ is "
        "below 1.</p>"
        "<p><b>Step 2: statement II.</b> Ask what an investor who held both shares before the merger gets from "
        "it.</p>",
    ),
    q="<p>Two firms in unrelated industries, whose cash flows are not perfectly correlated, merge. There are no "
      "synergies.</p>"
      "<p>I. Relative to its size, the merged firm is less risky than the two firms were on their own: the volatility "
      "of the combined cash flow is below the sum of the two volatilities.</p>"
      "<p>II. That reduction in risk creates value for the shareholders.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: shareholders can diversify by holding both shares, so they will not pay "
                     "for diversification inside the firm."),
        F("Both I and II", "Statement II fails: lower firm risk is something investors can create themselves at no "
                           "cost. With risky debt it even moves value to the creditors."),
        F("Neither", "Compare the volatility of a sum with the sum of the volatilities when the two parts do not move "
                     "perfectly together."),
    ],
    kort="<p><b>Only I.</b> σ<sub>A+B</sub> &lt; σ<sub>A</sub> + σ<sub>B</sub> when ρ &lt; 1, so risk relative to "
         "size falls. But shareholders could diversify themselves, so no value is created. With risky debt the merger "
         "even moves value from shareholders to creditors (coinsurance).</p>",
    full="<p><b>Statement I.</b> Without synergies the merged firm's cash flow is simply the sum of the two, so the "
         "cash flows themselves do not change. What changes is risk relative to size: σ<sub>A+B</sub> = "
         "√(σ<sub>A</sub>² + σ<sub>B</sub>² + 2ρσ<sub>A</sub>σ<sub>B</sub>), which is below σ<sub>A</sub> + "
         "σ<sub>B</sub> whenever ρ &lt; 1. Per krone of value, the merged firm is less volatile than the two were on "
         "their own.</p>"
         "<p><b>Statement II.</b> Investors can hold both shares in their own portfolio and get exactly the same "
         "reduction in risk at almost no cost. The risk that disappears is diversifiable and was never priced. The "
         "merged firm is worth the sum of the two, so the shareholders will not pay a premium for diversification the "
         "firm does for them.</p>"
         "<p><b>Worse with debt.</b> If the firms have risky debt, the merger makes the debt safer (coinsurance). "
         "With total value fixed, the creditors' gain is the shareholders' loss.</p>"
         "<p><b>Who might want it.</b> The managers: a steadier firm protects their jobs and their undiversified "
         "wealth. Diversification is therefore often a sign of an agency problem, close to empire building.</p>"
         "<p><b>Exam use.</b> In a question like H2024 E1, diversification would be a valid answer for a reason that "
         "is bad for the acquirer's shareholders, explained by the argument above.</p>"
         "<p><b>Remember:</b> diversification lowers risk relative to size but not value. Shareholders can "
         "diversify themselves.</p>",
)

statisk(
    "gov-s30", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is about the motives for mergers on the lecture's list and which of them are synergies.",
        "Synergy: the merged firm earns more or spends less than the two separately, so A + T + S exceeds A + T "
        "because the businesses fit together.",
        "<p><b>Step 1: for each motive, ask where the gain comes from.</b> Better use of the combined business, or "
        "something else?</p>"
        "<p><b>Step 2: pick the motive whose gain comes from combining operations.</b></p>",
    ),
    q="<p>The lecture's list of motives for mergers includes the four below. Which of them is a source of synergies?</p>",
    alternativer=[
        R("Supply chain optimisation: one firm buys its supplier and coordinates production"),
        F("EPS manipulation: buying a firm with a lower P/E to raise earnings per share",
          "EPS rises by arithmetic, not because the businesses fit together. No value is created."),
        F("Managerial ambition: the chief executive wants to run a larger company",
          "That is an agency motive. It can destroy value for the acquirer's shareholders."),
        F("Change of corporate control: a buyer replaces a target's poor management",
          "The gain comes from better management of the target, which a buyer could achieve without merging the "
          "businesses. It is a governance gain, not a synergy."),
    ],
    kort="<p><b>Supply chain optimisation.</b> Coordinating production with a supplier makes the combined business "
         "earn more. The other three are arithmetic, agency or governance.</p>",
    full="<p><b>The lecture's list.</b> Economies of scale and scope, supply chain optimisation, complementary goods, "
         "industry consolidation and market power, changes in corporate control, EPS manipulation and manager "
         "ambitions.</p>"
         "<p><b>Synergies.</b> The first three are synergies: the combined business is worth more because the parts "
         "fit together. Lower unit costs, coordinated production along the value chain, products that sell better "
         "together.</p>"
         "<p><b>Not synergies.</b> Market power raises value at the customers' expense. A change of control replaces "
         "poor managers: the gain comes from better management. EPS manipulation is arithmetic. Manager ambitions "
         "are an agency motive and often destroy value.</p>"
         "<p><b>Why this matters.</b> H2024 E1 banned synergies as an answer. Kurbatov's key still accepted economies "
         "of scale for the target, but the safest answers explain a mechanism other than \"the two firms are worth "
         "more together\": a disciplinary takeover, empire building, the premium, damage to the corporate "
         "culture.</p>"
         "<p><b>Remember:</b> a synergy comes from combining the businesses. Name the other motives by their "
         "mechanism.</p>",
)

statisk(
    "gov-s31", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is about hostile takeovers: the benefits and costs the lecture lists.",
        "The lecture weighs hostile takeovers: what they can bring the firm and what they can damage, including "
        "things that do not show up in the accounts.",
        "<p><b>Step 1: sort the options into benefits, costs and claims that are simply wrong.</b></p>"
        "<p><b>Step 2: pick the cost.</b></p>",
    ),
    q="<p>Which cost of hostile takeovers does the lecture mention?</p>",
    alternativer=[
        R("They can disrupt operations and endanger soft assets such as the corporate culture"),
        F("They always lower the target's share price, since the bidder pays below market value",
          "Hostile bids usually carry a premium over the market price. Target shareholders gain."),
        F("They can never discipline management, since bids come too rarely to matter",
          "The lecture says the opposite: even the threat of a takeover can discipline managers."),
        F("They raise the acquirer's tax bill, since the premium is taxed as profit",
          "Taxes are not on the lecture's list of costs of hostile takeovers."),
    ],
    kort="<p><b>Disruption and culture.</b> A hostile deal can upset operations and damage soft assets such as the "
         "culture. Takeover threats can also push managers to entrench themselves.</p>",
    full="<p><b>The benefits.</b> The lecture: hostile takeovers can benefit the firm by bringing in new management, "
         "new ideas and new blood, improving performance. Even the threat of a takeover might discipline current "
         "management.</p>"
         "<p><b>The costs.</b> A takeover can disrupt the company's operations. Soft assets such as the corporate "
         "culture may be endangered; the lecture uses Twitter as an example. And takeover threats might result in "
         "more entrenchment, as managers adopt defences.</p>"
         "<p><b>Exam use.</b> In H2024 E1, damage to the corporate culture, the loss of a unique management vision "
         "and long-term plans bent towards immediate returns are Kurbatov's examples of reasons a deal can be bad "
         "for the target. Kurbatov repeated in the wrap-up that costs such as corporate culture are worth "
         "knowing.</p>"
         "<p><b>Remember:</b> hostile takeovers discipline managers but can disrupt the firm and damage what is hard "
         "to measure.</p>",
)

statisk(
    "gov-s32", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is an exam-level question in the style of H2024 E1: four reasons for and against an acquisition, one "
        "per box, synergies excluded.",
        "A reason earns the box if it names a mechanism other than synergy and fits the side and the direction: "
        "good or bad, for the acquirer or for the target.",
        "<p><b>Step 1: check each box in turn.</b> Is the reason really good or bad for that side?</p>"
        "<p><b>Step 2: check for synergies in disguise and for value that is not created.</b></p>",
    ),
    q="<p>An exam asks for one reason each why an acquisition can be good for the acquirer, bad for the acquirer, good "
      "for the target and bad for the target, synergies excluded. Which set of four earns all four boxes?</p>",
    alternativer=[
        R("Good for acquirer: replacing the target's poor managers. Bad for acquirer: empire building. Good for target: "
          "the premium. Bad for target: damage to its culture"),
        F("Good for acquirer: diversification lowers its risk. Bad for acquirer: empire building. Good for target: the "
          "premium. Bad for target: damage to its culture",
          "Diversification does not help the acquirer's shareholders: they can diversify themselves and with risky "
          "debt it moves value to the creditors."),
        F("Good for acquirer: replacing the target's poor managers. Bad for acquirer: empire building. Good for target: "
          "the premium. Bad for target: it gets cash instead of shares",
          "Cash is not in itself bad for the target's owners. It is certain, while shares in an overvalued acquirer "
          "would be the risk."),
        F("Good for acquirer: a higher EPS from buying a low-P/E firm. Bad for acquirer: empire building. Good for "
          "target: the premium. Bad for target: damage to its culture",
          "EPS accretion from a lower P/E is arithmetic, not value. The share price does not rise with it."),
    ],
    kort="<p><b>Discipline, empire building, the premium, culture.</b> Each names a mechanism other than synergy and "
         "fits its box.</p>",
    full="<p><b>The question.</b> H2024 E1 asked for four reasons, one per box, synergies banned, one or two sentences "
         "each. Three points per box.</p>"
         "<p><b>Good for the acquirer.</b> A disciplinary takeover: buy a badly run firm at a price that reflects its "
         "poor management and replace the managers. Others that work: market power or removing a competitor, "
         "supply-chain gains (Kurbatov's key), undervaluation with better information. Not the target's tax "
         "losses: Kurbatov says they are erased when ownership changes.</p>"
         "<p><b>Bad for the acquirer.</b> Empire building or hubris: the CEO buys size or overestimates the target "
         "and overpays. Also coinsurance moving value to creditors and overpayment through the winner's curse.</p>"
         "<p><b>Good for the target.</b> The premium: the bidder must pay above the market price and the free-rider "
         "problem pushes it up. Kurbatov's key also lists better management and access to larger markets.</p>"
         "<p><b>Bad for the target.</b> Damage to the corporate culture or the loss of a unique management vision "
         "(Kurbatov's examples). Also payment in overvalued acquirer shares, or entrenched managers who block a good "
         "offer.</p>"
         "<p><b>Why the others fail.</b> Diversification and EPS accretion create no value for the shareholders. Cash "
         "is not a cost to the target.</p>"
         "<p><b>Remember:</b> one mechanism per box and never \"the firms are worth more together\".</p>",
)

statisk(
    "gov-s33", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is an exam-level question in the style of H2024 E2: two distinct ways to monitor the CEO, saying who "
        "monitors and with which tools.",
        "Full marks need two different monitors, each with its tools. Two versions of the same channel count once. "
        "A monitor without tools earns half.",
        "<p><b>Step 1: are the two monitors distinct?</b></p>"
        "<p><b>Step 2: does each come with concrete tools?</b></p>",
    ),
    q="<p>An exam asks for two distinct ways to monitor the chief executive, who performs the monitoring and with which "
      "tools, in 3–4 sentences each. Which outline earns full marks?</p>",
    alternativer=[
        R("The board, which hires, fires and pays the CEO; and large shareholders, which vote, file proposals and run "
          "proxy contests"),
        F("The board, which reviews the accounts; and the audit committee, which also reviews the accounts",
          "The audit committee is part of the board and both do the same thing. That is one channel, not two."),
        F("Large shareholders, which vote at the meeting; and institutional investors, which also vote at the meeting",
          "Both are shareholders voting. Two versions of the same channel count once."),
        F("The board, because independent directors are the best monitors; and shareholders, because they own the "
          "firm",
          "The answer names the monitors but not their tools. The question asks for both."),
    ],
    kort="<p><b>Two monitors, each with its tools.</b> The board with hiring, firing and pay; large shareholders with "
         "votes, proposals and proxy contests.</p>",
    full="<p><b>What the question asks.</b> Two distinct ways, who monitors and with which tools. Each method needs the "
         "monitor and its tools; an answer that names only the mechanism loses half.</p>"
         "<p><b>Method 1, the board.</b> Elected by the shareholders to act for them. It hires and fires the CEO, sets "
         "his pay, takes the key decisions and has the best access to reports and files. Independent directors are "
         "the best monitors.</p>"
         "<p><b>Method 2, the shareholders.</b> Especially large ones and institutions, which overcome the free-rider "
         "problem. They can request materials, submit items to the ballot, vote and if management ignores them, "
         "start activist campaigns and proxy fights.</p>"
         "<p><b>Other channels Kurbatov's key accepts.</b> The government through legislation and monitoring systems "
         "such as anti-fraud services. External monitoring: a firm that performs badly can be acquired by a "
         "competitor who installs better management. As long as two groups are described in enough detail, full "
         "points.</p>"
         "<p><b>Remember:</b> two different monitors, each with concrete tools.</p>",
)

statisk(
    "gov-s34", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is an exam-level question in the style of H2025 E2: three actions for a holder of 5–10% when "
        "management shirks. You need the weakest set.",
        "A strong answer takes three actions from different channels: the board, votes and meetings, pay, the market "
        "for corporate control, legal action, exit. Each with its mechanism.",
        "<p><b>Step 1: list the channel each action uses.</b></p>"
        "<p><b>Step 2: find the set where the actions overlap.</b></p>",
    ),
    q="<p>You hold 7% of a listed firm whose managers shirk and enjoy private benefits. An exam asks for three actions, "
      "2–3 sentences each, four points each. Which set of three is the weakest answer?</p>",
    alternativer=[
        R("Vote against the directors, ask other holders to vote against them and vote against the pay report"),
        F("Engage the board to replace insider directors, push for long-vesting pay and look for a buyer for the firm",
          "This set uses three channels: the board, the contract and the market for corporate control."),
        F("Run a proxy contest with your own slate, demand a payout of the idle cash and sue if there is evidence",
          "This set uses three channels: votes, the free cash flow and legal action."),
        F("Press for a new pay contract, start a public activist campaign and sell your shares if nothing changes",
          "This set uses three channels: the contract, shareholder action and exit, which Kurbatov's key rewards as "
          "creative."),
    ],
    kort="<p><b>Three votes are one channel.</b> All three actions work through the vote, so they overlap. Take "
         "actions from different channels.</p>",
    full="<p><b>Why 5–10% matters.</b> At that stake monitoring can pay, since you internalise 5–10% of any gain, but "
         "you cannot win a vote alone and selling moves the price. Every action must persuade others or change "
         "incentives.</p>"
         "<p><b>Why the voting set is weakest.</b> Voting against directors, asking others to do the same and voting "
         "against the pay report all work through the same channel. They add little to each other and leave out the "
         "board, the contract and the market for corporate control.</p>"
         "<p><b>What Kurbatov's key accepts.</b> Any reasonable action with an explanation: active monitoring, an "
         "activist campaign, making the board more independent by replacing insiders, a better pay contract, "
         "pressure to fire the manager, an LBO, finding an acquirer, legal action with good evidence and as a bonus "
         "for creativity, exit by selling the shares.</p>"
         "<p><b>The format.</b> For each action: what you do, the mechanism that reaches the CEO and, for a strong "
         "answer, a limitation. Three actions from three channels.</p>"
         "<p><b>Remember:</b> three different channels, each with action, mechanism and limitation.</p>",
)

statisk(
    "gov-s35", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the agency view of debt: how borrowing can discipline managers.",
        "Free cash flow is cash beyond what good projects need. Creditors have a contract, not a vote.",
        "<p><b>Step 1: what does debt do to the cash managers control?</b></p>"
        "<p><b>Step 2: what happens to the managers if the firm cannot pay?</b></p>"
        "<p><b>Step 3: strike the options that rest on the tax shield or on MM.</b></p>",
    ),
    q="<p>How can debt discipline managers, according to the agency view?</p>",
    alternativer=[
        R("Interest payments take away free cash flow managers could waste and default threatens their jobs"),
        F("Debt holders vote at the general meeting, so they can replace managers who waste money",
          "Creditors do not vote at the general meeting. They discipline through the contract and the threat of "
          "default."),
        F("Debt raises the share price under MM, so managers' options become worth more",
          "Under MM debt does not change the firm's value. The agency argument does not rest on the share price."),
        F("Debt lowers the tax bill, so the managers' bonus based on profits rises",
          "The tax shield is the trade-off argument. The agency argument is about the cash managers control."),
    ],
    kort="<p><b>Less cash, more pressure.</b> Interest commits the free cash flow to the creditors and the threat of "
         "default puts managers' jobs at risk. Both curb empire building.</p>",
    full="<p><b>The problem debt solves.</b> A mature firm with large free cash flow and few good projects lets its "
         "managers spend on perks and empire building. Promising to pay dividends is cheap talk; dividends can be "
         "cut.</p>"
         "<p><b>The commitment.</b> Debt binds the firm to pay out cash as interest and principal. Money that goes to "
         "creditors cannot be wasted. If managers fail to generate the cash, the firm defaults and they are likely "
         "to lose their jobs. The lecture also notes that debt lets managers own a larger share of the equity, "
         "which aligns their interests.</p>"
         "<p><b>Its limits.</b> Debt creates its own agency costs between shareholders and creditors (risk shifting, "
         "debt overhang) and brings distress costs. Moderate debt disciplines; too much invites excessive risk.</p>"
         "<p><b>Exam use.</b> For a shirking CEO, demanding a payout or a leveraged recapitalisation removes the "
         "free cash flow that funds his perks. Name the limitation: distress and debt-agency costs.</p>"
         "<p><b>Remember:</b> debt takes the free cash flow out of managers' hands.</p>",
)

statisk(
    "gov-s36", tema="governance", type="begrep",
    hjelp=hjelp3(
        "This is the leveraged buyout (LBO) as a governance mechanism, one of the actions Kurbatov's key accepts.",
        "In an LBO a buyer, often a private equity firm, takes a listed firm private and pays mostly with borrowed "
        "money.",
        "<p><b>Step 1: compare the owners before and after.</b> Who gains from monitoring?</p>"
        "<p><b>Step 2: compare the cash the managers control.</b></p>"
        "<p><b>Step 3: strike the options that describe side effects rather than incentives.</b></p>",
    ),
    q="<p>Why can a leveraged buyout improve the governance of a badly run public firm?</p>",
    alternativer=[
        R("Concentrated owners have reason to monitor, heavy debt removes free cash flow and managers often get large "
          "stakes"),
        F("The firm leaves the stock exchange, so it no longer has to publish any accounts at all",
          "Fewer disclosure duties are a side effect, not the governance gain. The gain is in incentives."),
        F("The debt is tax-deductible, so the firm's taxes fall and its managers work harder",
          "The tax shield adds value, but it is not a governance mechanism."),
        F("The buyers pay a premium, so the old shareholders are compensated for the managers' waste",
          "The premium is a transfer to the old owners. The governance gain comes from the new structure."),
    ],
    kort="<p><b>Owners, debt and stakes.</b> An LBO ends the free-rider problem with a few large owners, takes the free "
         "cash flow through interest and makes the managers owners.</p>",
    full="<p><b>What an LBO is.</b> A buyer, often a private equity firm, buys out the public shareholders using mostly "
         "borrowed money. The firm becomes private, with a few large owners and heavy debt.</p>"
         "<p><b>Why governance improves.</b> First, concentrated ownership: the new owners capture most of any "
         "improvement, so monitoring pays and the free-rider problem disappears. Second, debt: interest payments "
         "take the free cash flow that managers could have wasted and default threatens their jobs. Third, managers "
         "typically receive large equity stakes, which aligns their pay with value.</p>"
         "<p><b>Its limits.</b> Heavy debt brings distress costs and the debt-agency problems of risk shifting and "
         "debt overhang. The buyers pay a premium, so the old owners capture much of the gain.</p>"
         "<p><b>The lecture's example.</b> ISS A/S was bought out in 2005 by EQT and Goldman Sachs and relisted in "
         "2014: a secondary IPO.</p>"
         "<p><b>Exam use.</b> Kurbatov's key to H2025 E2 accepts trying to buy out the company in an LBO and replace "
         "the manager.</p>"
         "<p><b>Remember:</b> an LBO combines concentrated owners, debt discipline and managerial ownership.</p>",
)

statisk(
    "gov-s37", tema="governance", type="tolkning",
    hjelp=hjelp3(
        "This is exit, selling your shares, as a governance action. Kurbatov's key to H2025 E2 rewards it as "
        "creative.",
        "Exit is the alternative to voice. A blockholder's trade is large compared with normal trading in the share.",
        "<p><b>Step 1: what does a large sale do to the market?</b></p>"
        "<p><b>Step 2: who is affected by that? How does it reach the CEO?</b></p>",
    ),
    q="<p>Kurbatov's key to the question on a 5–10% holder gives a bonus for creativity to exiting the firm by selling "
      "the shares. How can exit discipline a shirking chief executive?</p>",
    alternativer=[
        R("Selling a large block pushes the price down, which hurts a CEO paid in shares and can invite a bidder"),
        F("The CEO must buy the shares himself, which costs him money he would otherwise spend on perks",
          "Nobody forces the CEO to buy. The effect works through the price."),
        F("Selling removes the holder's votes, which shrinks the board's majority behind the CEO",
          "The votes pass to the buyers. The discipline comes from the price, not from the votes."),
        F("The firm must repay the holder's original investment, which drains the CEO's cash",
          "Shares are sold to other investors, not redeemed by the firm."),
    ],
    kort="<p><b>The threat of exit.</b> A blockholder who sells moves the price, which costs a CEO paid in shares and "
         "makes the firm a cheaper target. The threat alone can discipline.</p>",
    full="<p><b>Exit as voice.</b> Governance usually means voice: votes, proposals, campaigns. Exit, selling the "
         "shares (the 'Wall Street walk'), looks like giving up. But a 5–10% block is large enough to move the price "
         "when it is sold.</p>"
         "<p><b>The mechanism.</b> A lower price hurts a CEO whose pay and wealth are tied to the shares. It also "
         "signals to other investors that a well-informed holder has lost confidence and it makes the firm a "
         "cheaper target for a bidder who would replace management. The credible threat of exit can discipline "
         "before any shares are sold.</p>"
         "<p><b>Its limits.</b> Selling a large block costs the seller through the price impact and once he has "
         "sold he no longer benefits from any improvement. If the CEO is not paid in shares, the price fall reaches "
         "him only through the takeover threat.</p>"
         "<p><b>Exam use.</b> Kurbatov's key to H2025 E2 lists exit as a bonus answer. Explain the mechanism; just "
         "writing \"sell\" earns nothing.</p>"
         "<p><b>Remember:</b> exit disciplines through the share price and the takeover threat.</p>",
)
