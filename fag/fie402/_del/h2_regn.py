"""Skribent H2: «Hintet i forelesning», settene hint2-1 og hint2-2 i FIE402.

Kjør fra hvor som helst:  python3 -I h2_regn.py

Spesifikasjonen står i docs/fie402-hint-spek.md (og docs/fie402-deleksamen-spek.md). Hver oppgave
bygger på et eksempel Kurbatov pekte ut i forelesning, med egen historie og egne tall:

  hint2-1
    n 1 (10 p)  MM mot virkeligheten, verbalt                       03 Capital Structure II, 11:45
    n 2 (10 p)  SEO med kursfall på 12 %, verbalt                   18 Wrap-up, 48:05
    n 3 (20 p)  Winner's curse i IPO-er (vri: 40/60, ikke 50/50)    07 Security Issues, 1:05:12 til 1:26:00
    n 4 (20 p)  Gjeldsoverheng med reforhandling                    04 (33:44 til 49:46), 06 PS1, 18 (29:40)
                (vri: intervallet av pålydender alle godtar, ikke ett gitt pålydende)
  hint2-2
    n 1 (10 p)  Fire måter å bruke fri kontantstrøm, verbalt        05 Payout policy, 12:12; 18 (39:15)
    n 2 (10 p)  Kostnader ved financial distress, verbalt           04 Capital Structure III, 26:24 og 29:37
    n 3 (20 p)  Rentenes skatteskjold på et annuitetslån, gjeldsfinansiert tilbakekjøp
                og utbytte mot tilbakekjøp i MM uten skatt          03 (32:56 til 1:05:35), 05 (1:08:38, 1:14:10)
                (vri: annuitetslån i stedet for rentene som annuitet og hovedstol til slutt)
    n 4 (20 p)  Gambling for resurrection med brannsalg ved konkurs 04 (55:46 til 1:15:00), 18 (28:00, 35:39)

Skriptet regner hvert tall i oppgavetekst, løsning og kriterier og sjekker med assert:
  IPO: forventet verdi, tap for uinformerte, break-even-prisen (fortjenesten er null der),
       snittavkastningen = E[V]/P − 1, informertes avkastning.
  Overheng: D + E = V i hver tilstand, andelen x gir nye investorer null NPV, lederen avslår,
       kreditorenes gevinst + lederens tap + 0 = NPV, intervallet ligger der den nye gjelden er sikker,
       og et rutenett over pålydender bekrefter grensene.
  Skatteskjold: annuitetsplanen går i null, PV(betalinger) = lånet, bare renter gir skjold, kursen
       ved kunngjøring, likningssystemet for tilbakekjøpet, selger = blir, og utbytte = tilbakekjøp uten skatt.
  Gambling: D + E + forventet brannsalgstap = E[eiendeler] for hver strategi, ΔE + ΔD = ΔV,
       effektivitetstapet = lavere eiendelsverdi + høyere brannsalgstap, lederen bytter, uten gjeld ikke.
Til slutt sjekkes poeng, skrivereglene og at hvert tall i svar-dataene står i løsningsteksten.
Er noe galt, skrives ingenting.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "h2.json")
UT_SVAR = os.path.join(HER, "h2_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def pc(x, d=None):
    return (g(100 * x) if d is None else f(100 * x, d)) + "%"


def sg(x):
    """Med fortegn: +6 eller −6."""
    return ("+" if x > 0 else "") + g(x)


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def tab(head, rows):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in head) + "</tr>"
    b = ""
    for r in rows:
        b += "<tr>" + "".join(
            (f'<td class="n">{c[1:]}</td>' if isinstance(c, str) and c.startswith("#") else f"<td>{c}</td>")
            for c in r) + "</tr>"
    return f'<table class="data">{h}{b}</table>'


SETT = {"hint2-1": [], "hint2-2": []}
SVAR = {}


def T(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


# ======================================================================
# hint2-1 · oppgave 1: MM mot virkeligheten (verbal, 10 p)
# ======================================================================
ex = {
    "n": 1, "title": "Capital Structure", "points": 10,
    "topic": "MM in perfect markets and market frictions", "chapters": [6, 7, 8, 11, 12],
    "merke": ("Forelesning 03 (Capital Structure II), 11:45: «So this could be an exam question, by the way. "
              "This could be like the question one»"),
    "body": ("<p>At the annual general meeting of Hamnvik Kjøkken ASA, a kitchen manufacturer, a shareholder "
             "takes the floor: «Modigliani and Miller proved that the mix of debt and equity does not affect firm "
             "value. The board should stop spending time on the capital structure.»</p>"
             "<p>How does the world in which the Modigliani-Miller propositions hold differ from real life? Give at "
             "least three examples and spend one or two sentences on each. For each example, name the difference "
             "and say why it makes the choice between debt and equity matter. (10 points)</p>"),
    "solution": (
        "<p><b>Model answer (three examples, as the question asks).</b></p>"
        "<p><b>1. Taxes.</b> The MM world has no taxes. In reality interest is paid before corporate tax, so debt "
        "creates an interest tax shield and V<sup>L</sup> = V<sup>U</sup> + PV(TS): the creditors are paid before "
        "the tax authority, which makes debt cheaper than equity after tax.</p>"
        "<p><b>2. Costs of financial distress.</b> In the MM world default costs nothing: the creditors take over "
        "and the firm runs exactly as before. In reality a firm in distress pays lawyers and advisers, loses "
        "customers and suppliers and may have to sell specialised assets in a fire sale far below their value, so "
        "too much debt destroys value.</p>"
        "<p><b>3. Asymmetric information.</b> MM assumes that managers and investors know the same. In reality "
        "managers know more, so an equity issue suggests that the shares are overvalued and the price falls on "
        "the announcement; firms therefore use internal funds first, then debt, with equity as the last resort "
        "(the pecking order).</p>"
        "<p><b>Also accepted as an example.</b> Agency costs and benefits of debt: with high leverage the firm may "
        "forgo positive-NPV projects (debt overhang) or gamble with the creditors' money, while moderate debt "
        "disciplines managers who would otherwise waste free cash flow. Transaction costs and search frictions: "
        "raising money takes time and costs fees, which are higher for an equity issue than for a loan, while MM "
        "assumes all financing is free and instant. Mispricing and market timing: MM assumes prices are always "
        "right, but in inefficient markets shares can be over- or underpriced, so the firm can gain by issuing "
        "equity when it is dear and borrowing or buying back when it is cheap. Personal taxes on "
        "interest, dividends and capital gains. Investors who cannot borrow on the same terms as the firm, so "
        "homemade leverage does not undo the firm's choice.</p>"
        "<p><b>Not accepted on its own.</b> «Uncertainty» or «risk»: outcomes are uncertain in the MM world too, "
        "so this names no difference. «Costs» or «frictions» without saying which. «Markets are not "
        "perfect» only repeats the question.</p>"),
    "criteria": [
        "Three distinct differences, 3 points each: 1 for naming the difference and 2 for one or two sentences on how real life differs from the MM world and why that makes debt and equity differ. A name without an explanation earns 1 point.",
        "The tenth point: at least one example is tied explicitly to the MM result it breaks, for example taxes to V^L = V^U + PV(TS) or distress to default no longer being costless.",
        "«Uncertainty» or «risk» alone earns nothing: the MM world has uncertainty too. Kurbatov called it ambiguous when students suggested it (recording 03, 11:15). The same for «costs» or «imperfections» without naming which.",
        "Counting: two close arguments count as one. Legal fees and fire sales are both costs of financial distress; debt overhang and gambling with the creditors' money are both agency costs of debt. The disciplining benefit of debt is a separate example.",
        "Taxes need the mechanism: interest is deductible, so debt shields income from tax. «Debt is cheaper» without the reason earns 1 of 3.",
    ],
}
SETT["hint2-1"].append(ex)
SVAR["hint2-1:1:"] = {"type": "tekst"}


# ======================================================================
# hint2-1 · oppgave 2: SEO med kursfall på 12 % (verbal, 10 p)
# ======================================================================
FALL = 0.12
ex = {
    "n": 2, "title": "Security issues", "points": 10,
    "topic": "Seasoned equity offerings", "chapters": [12, 13, 14],
    "merke": ("Forelesning 18 (Wrap-up), 48:05: «Again, could be one of the first two theoretical questions in "
              "the exam»"),
    "body": (f"<p>Tverrdal Retail Inc., a listed grocery chain with stable cash flows and little debt, announces a "
             f"seasoned equity offering (SEO) to finance a new distribution centre. On the announcement day its "
             f"share price falls by {pc(FALL)} while the market is flat.</p>"
             f"<p>What are the potential reasons for the fall? What signal does the announcement send to the "
             f"market? What would have been a better way to finance the distribution centre? Why? (10 points: "
             f"reasons 4, signal 3, alternative 3. About five sentences should typically be enough.)</p>"),
    "solution": (
        "<p><b>Model answer in five sentences.</b></p>"
        "<p><b>Reasons (4 points).</b> The main reason is asymmetric information: managers know more than outside "
        "investors and are most willing to sell new shares when they believe the shares are overvalued, so "
        "investors mark the price down. Smaller reasons: the issue may reveal that internal cash is short or that "
        "management wants money for empire building; issue costs such as underwriting fees take a few percent of "
        "the amount raised.</p>"
        f"<p><b>The signal (3 points).</b> The announcement tells the market «our managers think the shares are "
        f"worth less than the market price» (the lemons problem); the {pc(FALL)} is a revision of the value of the "
        f"whole firm, not a verdict on the distribution centre, which may well have a positive NPV.</p>"
        "<p><b>A better alternative (3 points).</b> Follow the pecking order: internal funds first, then debt, "
        "which Tverrdal can raise cheaply with stable cash flows and little debt. Neither depends much on what the "
        "managers know, so they send a much weaker signal than equity (and debt adds an interest tax shield).</p>"
        f"<p><b>Also accepted.</b> Myers-Majluf by name; the point that issue costs are far too small to explain "
        f"a {pc(FALL)} fall in the value of the whole company; a credible way to share the information (an "
        f"audited forecast or a certification) that would shrink the discount. <b>Not accepted on its own:</b> "
        f"«earnings per share are diluted». New shares sold at a fair price dilute nobody; the problem only "
        f"arises because the price may be wrong.</p>"),
    "criteria": [
        "Reasons (4 points): 2 for asymmetric information with the mechanism, managers issue equity when they believe it is overvalued, so investors revise the price down. 1 point each for two further reasons: a cash shortfall revealed, fear of a value-destroying use of the money (empire building), issue costs.",
        "Signal (3 points): the market infers that management thinks the shares are overvalued. Full marks add that the fall is about the existing assets, not proof that the distribution centre has a negative NPV.",
        "Alternative (3 points): internal funds or debt, with the reason that they reveal little or nothing about the value of the shares (pecking order). Debt justified only by the tax shield earns 2 of 3: true, but it misses the signal.",
        f"«Dilution of earnings per share» alone earns nothing. Blaming the {pc(FALL)} on fees alone is the classic error: fees are a few percent of the amount raised, not of the whole market value.",
        "Answers longer than five sentences are not penalised, but a repeated argument earns nothing extra.",
    ],
}
SETT["hint2-1"].append(ex)
SVAR["hint2-1:2:"] = {"type": "tekst"}


# ======================================================================
# hint2-1 · oppgave 3: IPO-er og uinformerte investorer (20 p)
# ======================================================================
VG, VB, pG = 60.0, 35.0, 0.40
pB = 1 - pG
ORDRE, aG, aB = 100, 20, 80
EV = pG * VG + pB * VB
rG0, rB0 = VG / EV - 1, VB / EV - 1
ret_a = pG * rG0 + pB * rB0
assert near(EV, 45) and near(ret_a, 0)
# (b) pris = EV, tildeling 20/80
profG, profB = aG * (VG - EV), aB * (VB - EV)
Eprof = pG * profG + pB * profB
Eshares = pG * aG + pB * aB
Einv = Eshares * EV
ret_b = Eprof / Einv
assert near(Eprof, -360) and near(Einv, 2520) and near(ret_b, -1 / 7)
assert near(100 * Eprof, -36000)
# (c) break-even
Pbe = (pG * aG * VG + pB * aB * VB) / (pG * aG + pB * aB)
assert near(pG * aG * (VG - Pbe) + pB * aB * (VB - Pbe), 0)
assert near(Pbe, 2160 / 56)
wG, wB = pG * aG / Eshares, pB * aB / Eshares
assert near(wG * VG + wB * VB, Pbe)
gainG, lossB = pG * aG * (VG - Pbe), pB * aB * (VB - Pbe)
assert near(gainG + lossB, 0)
# (d)
rG, rB = VG / Pbe - 1, VB / Pbe - 1
avg_ret = pG * rG + pB * rB
assert near(avg_ret, EV / Pbe - 1)
ret_inf = rG
ret_un = (pG * aG * (VG - Pbe) + pB * aB * (VB - Pbe)) / (Eshares * Pbe)
assert near(ret_un, 0)
assert Pbe < EV and VB < Pbe < VG
# feller ligger ikke innenfor 1 % av svarene
assert abs(EV - Pbe) / Pbe > 0.05
assert abs(ret_b) > 0.05

ex = {
    "n": 3, "title": "Security issues", "points": 20,
    "topic": "Initial public offerings", "chapters": [14],
    "merke": ("Forelesning 07 (Security Issues), 1:16:58: «this is what I will try to incorporate in the exam, say "
              "a similar exercise»"),
    "body": (f"<p>Next year a large number of small technology firms will go public, one IPO at a time. Each firm is "
             f"either good or bad, which you cannot tell in advance. A good firm's shares will be "
             f"worth ${g(VG)} once trading starts, a bad firm's shares ${g(VB)}. {pc(pG)} of the firms are good and "
             f"{pc(pB)} are bad. The true value is revealed at the end of the first "
             f"trading day. Everyone is risk neutral and you can ignore discounting within the day. Use 4 decimal "
             f"places.</p><p>You are an uninformed investor and you order {ORDRE} shares in every IPO.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": ("<p>Suppose first that no investor knows more than you and every IPO is priced at the expected value of "
             "its shares. What is the issue price? What is the expected first-day return of an IPO?</p>"),
    "solution": (
        f"<p><b>Step 1. Expected value.</b> P = {g(pG)} × {g(VG)} + {g(pB)} × {g(VB)} = {g(pG * VG)} + "
        f"{g(pB * VB)} = <b>${g(EV)} per share</b>.</p>"
        f"<p><b>Step 2. First-day return.</b> A good IPO rises to {g(VG)}, a return of {g(VG)}/{g(EV)} − 1 = "
        f"{pc(rG0, 4)}. A bad one falls to {g(VB)}, a return of {pc(rB0, 4)}. Expected return = {g(pG)} × "
        f"{pc(rG0, 4)} + {g(pB)} × ({pc(rB0, 4)}) = {pc(pG * rG0, 4)} − {pc(-pB * rB0, 4)} = <b>{pc(ret_a)}</b>.</p>"
        "<p>With nobody informed, every investor gets the same allocation in good and bad IPOs, so the uninformed "
        "investor also earns 0% on average. This is the benchmark.</p>"),
    "criteria": [
        f"Expected value {g(pG)} × {g(VG)} + {g(pB)} × {g(VB)} = ${g(EV)}. Using 50/50 weights (${g((VG + VB) / 2)}) is the classic error.",
        f"Expected first-day return 0%: +{pc(rG0, 2)} with probability {g(pG)} and {pc(rB0, 2)} with probability {g(pB)}. «The price is fair, so 0%» with the price is accepted.",
        "Show the calculation.",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": (f"<p>Now some investors are informed: they know each firm's type and order shares only in good IPOs. "
             f"Good IPOs are therefore heavily oversubscribed and you receive only {aG} of the {ORDRE} shares you "
             f"order; in bad IPOs you receive {aB}. The issue price is still the one from (a). What is your expected "
             f"profit per IPO? What is your average return per share you receive, that is your total expected profit "
             f"divided by the total amount you expect to invest? Will you take part?</p>"),
    "solution": (
        f"<p><b>Step 1. Profit in each type.</b> Good: {aG} shares × ({g(VG)} − {g(EV)}) = <b>+${g(profG)}</b>. "
        f"Bad: {aB} shares × ({g(VB)} − {g(EV)}) = <b>−${g(-profB)}</b>.</p>"
        f"<p><b>Step 2. Expected profit per IPO.</b> {g(pG)} × {g(profG)} + {g(pB)} × ({g(profB)}) = "
        f"{g(pG * profG)} − {g(-pB * profB)} = <b>−${g(-Eprof)}</b>.</p>"
        f"<p><b>Step 3. Average return per share received.</b> Expected number of shares received = {g(pG)} × {aG} + "
        f"{g(pB)} × {aB} = {g(Eshares)}, costing {g(Eshares)} × {g(EV)} = ${g(Einv)}. Return = −{g(-Eprof)} / "
        f"{g(Einv)} = <b>{pc(ret_b, 4)}</b>.</p>"
        "<p><b>Decision.</b> The uninformed investor loses money on average and <b>does not take part</b>. The "
        "first-day return averaged over IPOs is still 0%, but your money is not spread evenly: you get few shares "
        "when the IPO is good and many when it is bad.</p>"),
    "criteria": [
        f"Profit per type uses the shares actually received: {aG} × ({g(VG)} − {g(EV)}) = +{g(profG)} and {aB} × ({g(VB)} − {g(EV)}) = −{g(-profB)}. Using the order of {ORDRE} shares in both is the classic error and gives 0.",
        f"Expected profit per IPO −${g(-Eprof)}.",
        f"Average return per share received {pc(ret_b, 4)}: total expected profit over the expected amount invested, {g(Einv)}. Averaging the two first-day returns over IPOs gives 0% and earns no points for this step.",
        "Decision: does not take part, because the expected profit is negative.",
        "Show the calculation.",
    ],
}
pc_ = {
    "label": "c", "points": 5,
    "body": (f"<p>At a lower issue price you still receive {aG} shares in good IPOs and {aB} in bad ones. What is "
             f"the highest issue price at which you are still willing to take part in every IPO?</p>"),
    "solution": (
        "<p><b>Step 1. The participation condition.</b> At the highest acceptable price P your expected profit is "
        "zero, using the shares you actually receive:</p>"
        f"<p>{g(pG)} × {aG} × ({g(VG)} − P) + {g(pB)} × {aB} × ({g(VB)} − P) = 0<br>"
        f"{g(pG * aG)}({g(VG)} − P) + {g(pB * aB)}({g(VB)} − P) = 0<br>"
        f"{g(pG * aG * VG)} + {g(pB * aB * VB)} = {g(Eshares)}P<br>"
        f"P = {g(pG * aG * VG + pB * aB * VB)} / {g(Eshares)} = <b>${f(Pbe)}</b></p>"
        f"<p>The price is the average value weighted by the shares you receive: {g(pG * aG)}/{g(Eshares)} on the "
        f"good type and {g(pB * aB)}/{g(Eshares)} on the bad type, not {g(pG)} and {g(pB)}.</p>"
        f"<p><b>Check.</b> Good: {g(pG * aG)} × ({g(VG)} − {f(Pbe, 6)}) = +{f(gainG)}. Bad: {g(pB * aB)} × "
        f"({g(VB)} − {f(Pbe, 6)}) = −{f(-lossB)}. The sum is 0 ✓. The price lies {pc((EV - Pbe) / EV, 4)} below the "
        f"expected value of ${g(EV)}, the same 1/7 as the loss rate in (b). That is no coincidence: the loss rate "
        f"at a price of ${g(EV)} equals ({f(Pbe)} − {g(EV)})/{g(EV)}.</p>"),
    "criteria": [
        f"Sets up the break-even condition with the allocated shares: {g(pG)} × {aG} × ({g(VG)} − P) + {g(pB)} × {aB} × ({g(VB)} − P) = 0.",
        f"Solves for P = {g(pG * aG * VG + pB * aB * VB)}/{g(Eshares)} = ${f(Pbe)}.",
        f"Answering ${g(EV)} (the unweighted expected value) or using the order of {ORDRE} in both types is the classic error.",
        "Optional but valued: the check that profits in the two types cancel, or that P is the allocation-weighted average value.",
        "Show the calculation.",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": ("<p>Suppose every IPO is priced as in (c). What is the average first-day return across IPOs? What return "
             "do the informed investors earn? What do you earn?</p>"),
    "solution": (
        f"<p><b>Step 1. Average first-day return.</b> Good: {g(VG)}/{f(Pbe, 6)} − 1 = {pc(rG, 4)}. Bad: {g(VB)}/"
        f"{f(Pbe, 6)} − 1 = {pc(rB, 4)}. Average over IPOs = {g(pG)} × {pc(rG, 6)} + {g(pB)} × ({pc(rB, 6)}) = "
        f"{pc(pG * rG, 6)} − {pc(-pB * rB, 6)} = {pc(avg_ret, 6)} ≈ <b>{pc(avg_ret, 4)}</b> (the same as "
        f"{g(EV)}/{f(Pbe, 6)} − 1).</p>"
        f"<p><b>Step 2. Informed investors</b> buy only good IPOs and earn <b>{pc(rG, 4)}</b>.</p>"
        f"<p><b>Step 3. You</b> earn <b>0%</b>: the price was set so that your gains in good IPOs exactly offset "
        f"your losses in bad ones, (c).</p>"),
    "criteria": [
        f"Average first-day return {pc(avg_ret, 4)}, from the two returns {pc(rG, 2)} and {pc(rB, 2)} weighted {g(pG)} and {g(pB)}.",
        f"Informed investors {pc(rG, 4)}, because they buy only good IPOs.",
        "Uninformed 0%, by construction of the price in (c).",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Explain the intuition. Why must IPOs be underpriced on average? Why can an ordinary investor not earn "
             "the average first-day return by subscribing to every IPO? (Two to four sentences.)</p>"),
    "solution": (
        f"<p>Uninformed investors face a winner's curse: when an IPO is good the informed crowd in and the "
        f"uninformed are rationed to {aG} shares; when it is bad they are without the informed investors and get {aB}. Their allocation is "
        f"tilted toward the bad firms, so at a fair price of ${g(EV)} they lose on average. To keep them in the "
        f"market the issuer must price below the expected value, at the level where they just break even "
        f"(${f(Pbe)}). The average first-day return of {pc(avg_ret, 2)} is an average over IPOs, but the uninformed "
        f"investor's money sits mostly in the bad ones, so the uninformed earn 0%; the informed investors collect the "
        f"underpricing.</p>"
        "<p><b>Also accepted.</b> The underwriter prefers a lower price as insurance against a failed issue. "
        "<b>Not enough on its own:</b> «underwriters underprice to please their friends at hedge funds». It may "
        "happen at the margin, but the model explains underpricing without anyone cheating.</p>"),
    "criteria": [
        "2 points for the allocation mechanism: rationed in good IPOs, filled in bad ones, because only the informed avoid the bad ones.",
        "1 point: the price must be set so that the uninformed break even, which is below the expected value (underpricing).",
        "1 point: the average return across IPOs is not the return on the shares you receive; the informed earn it.",
        "Collusion between underwriters and hedge funds alone earns nothing: Kurbatov's answer to that story was no (recording 07, 1:05:12). The insurance argument is accepted as an extra reason.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["hint2-1"].append(ex)
SVAR["hint2-1:3:a"] = {"type": "tall", "tall": [T("Issue price", EV, "$ per share"),
                                                T("Expected first-day return", 0.0, "%", abs=0.05)]}
SVAR["hint2-1:3:b"] = {"type": "blandet", "tall": [T("Expected profit per IPO", Eprof, "$"),
                                                  T("Average return per share received", 100 * ret_b, "%")],
                       "tallPoeng": 4, "tekstLedd": "Will you take part?"}
SVAR["hint2-1:3:c"] = {"type": "tall", "tall": [T("Highest issue price", Pbe, "$ per share")]}
SVAR["hint2-1:3:d"] = {"type": "tall", "tall": [T("Average first-day return", 100 * avg_ret, "%"),
                                                T("Informed investors' return", 100 * ret_inf, "%"),
                                                T("Your return", 0.0, "%", abs=0.05)]}
SVAR["hint2-1:3:e"] = {"type": "tekst"}


# ======================================================================
# hint2-1 · oppgave 4: gjeldsoverheng med reforhandling (20 p)
# ======================================================================
H, L, p = 220.0, 70.0, 0.5
F0 = 120.0
I, G = 28.0, 40.0
assert L < F0 < H
D0 = p * F0 + (1 - p) * min(L, F0)
E0 = p * max(H - F0, 0) + (1 - p) * max(L - F0, 0)
V0 = p * H + (1 - p) * L
assert near(D0 + E0, V0) and near(D0, 95) and near(E0, 50)
NPV = -I + G
assert NPV > 0
H1, L1 = H + G, L + G
assert L1 < F0                     # fortsatt mislighold i dårlig tilstand
E1tot = p * max(H1 - F0, 0) + (1 - p) * max(L1 - F0, 0)
D1 = p * min(H1, F0) + (1 - p) * min(L1, F0)
assert near(E1tot + D1, p * H1 + (1 - p) * L1)
x = I / E1tot
mgr = (1 - x) * E1tot
assert near(x, 0.4) and near(mgr, 42)
assert mgr < E0                    # lederen avslår
dD, dM, dN = D1 - D0, mgr - E0, x * E1tot - I
assert near(dN, 0) and near(dD + dM + dN, NPV)          # sjekk: gevinster summerer til NPV
assert dD > 0                      # kreditorene vil ha prosjektet
# (e) reforhandling: nytt pålydende K, prosjektet finansieres med ny EK


def etter_reforhandling(K):
    Dk = p * min(H1, K) + (1 - p) * min(L1, K)
    Ek = p * max(H1 - K, 0) + (1 - p) * max(L1 - K, 0)
    return Dk, Ek - I               # kreditorene, lederen (nye investorer får I)


Klo = D0                                        # kreditorene: K ≥ D0 når gjelden er sikker
Khi = p * H1 + (1 - p) * L1 - I - E0            # lederen: 185 − K − 28 ≥ 50 når gjelden er sikker
assert near(Klo, 95) and near(Khi, 107)
assert Khi <= L1                                # gjelden er sikker i hele intervallet
assert near(Khi - Klo, NPV)
for K in (Klo, Khi):
    Dk, Mk = etter_reforhandling(K)
    assert Dk >= D0 - 1e-9 and Mk >= E0 - 1e-9
# rutenett: hvem godtar for K fra 60 til 130
ok = [K / 10 for K in range(600, 1301) if (lambda r: r[0] >= D0 - 1e-9 and r[1] >= E0 - 1e-9)(etter_reforhandling(K / 10))]
assert near(min(ok), Klo) and near(max(ok), Khi)
Kmid = 100.0
Dm, Mm = etter_reforhandling(Kmid)
assert near(Dm - D0, 5) and near(Mm - E0, 7)
Eeq_mid = p * (H1 - Kmid) + (1 - p) * (L1 - Kmid)
# felle: tror at kreditorenes utgangspunkt er 120 eller 115
assert Klo != F0 and Klo != D1

ex = {
    "n": 4, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt, investment and renegotiation", "chapters": [10],
    "merke": ("Forelesning 18 (Wrap-up), 29:40: «most likely I will tell you yes there is this firm there is this "
              "project, check whether the manager wants this project»"),
    "body": (f"<p>Vardhøgda Alpine AS runs a ski resort. Its only debt is a zero-coupon loan with a face value of "
             f"€{g(F0)} million due in one year. Next year the resort will be worth €{g(H)} million if the winter is "
             f"good and €{g(L)} million if it is poor, each with probability {pc(p)}. If the firm cannot repay in "
             f"full, the creditors take over the resort at no extra cost. The manager, Ingrid Vold, owns all the "
             f"shares. Investors are risk neutral, the risk-free rate is 0% and there are no taxes.</p>"
             f"<p>Ingrid can install a snowmaking system that costs €{g(I)} million today and raises the value of "
             f"the resort next year by €{g(G)} million whatever the winter.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>Without the snowmaking system, what are the values of the debt and the equity today?</p>",
    "solution": (
        "<p>The creditors get min(value, 120) and the shares get max(value − 120, 0) in each state:</p>"
        + tab(["Winter", "Probability", "Resort", "Debt", "Equity"], [
            ["Good", f"#{pc(p)}", f"#{g(H)}", f"#{g(F0)}", f"#{g(H - F0)}"],
            ["Poor", f"#{pc(p)}", f"#{g(L)}", f"#{g(L)}", "#0"],
        ])
        + f"<p>D = {g(p)} × {g(F0)} + {g(p)} × {g(L)} = <b>€{g(D0)} million</b> and E = {g(p)} × {g(H - F0)} = "
          f"<b>€{g(E0)} million</b>.</p><p><b>Check.</b> D + E = {g(D0)} + {g(E0)} = {g(V0)} = {g(p)} × {g(H)} + "
          f"{g(p)} × {g(L)} ✓</p>"),
    "criteria": [
        f"Debt valued state by state: {g(p)} × {g(F0)} + {g(p)} × {g(L)} = €{g(D0)}M. Using the face value of €{g(F0)}M is the classic error.",
        f"Equity {g(p)} × ({g(H)} − {g(F0)}) = €{g(E0)}M.",
        f"The check D + E = €{g(V0)}M is a bonus.",
    ],
}
pb = {
    "label": "b", "points": 2,
    "body": "<p>What is the NPV of the snowmaking system?</p>",
    "solution": (f"<p>The system adds €{g(G)}M for sure and costs €{g(I)}M, with no discounting: NPV = −{g(I)} + "
                 f"{g(G)} = <b>€{g(NPV)} million</b>. From the point of view of the firm as a whole it should be "
                 f"installed.</p>"),
    "criteria": [f"NPV = −{g(I)} + {g(G)} = €{g(NPV)}M.", "States that the project is good for the firm as a whole."],
}
pc_ = {
    "label": "c", "points": 6,
    "body": ("<p>The firm has no cash, so the system must be financed by selling new shares to outside investors in "
             "a competitive market. What fraction of the equity must the new investors receive? What is Ingrid's "
             "payoff if she issues the shares and installs the system? Will she do it? Would the creditors like the "
             "system to be installed?</p>"),
    "solution": (
        f"<p><b>Step 1. Payoffs with the system.</b> The resort is worth {g(H1)} in a good winter and {g(L1)} in a "
        f"poor one. Since {g(L1)} &lt; {g(F0)}, the firm still defaults in a poor winter:</p>"
        + tab(["Winter", "Resort", "Debt", "All equity"], [
            ["Good", f"#{g(H1)}", f"#{g(F0)}", f"#{g(H1 - F0)}"],
            ["Poor", f"#{g(L1)}", f"#{g(L1)}", "#0"],
        ])
        + f"<p>All equity together is worth {g(p)} × {g(H1 - F0)} = {g(E1tot)}.</p>"
          f"<p><b>Step 2. The new investors' fraction.</b> In a competitive market they pay €{g(I)}M for a fraction x "
          f"worth exactly that: x × {g(E1tot)} = {g(I)}, so <b>x = {pc(x)}</b>.</p>"
          f"<p><b>Step 3. Ingrid's payoff.</b> She keeps {pc(1 - x)} × {g(E1tot)} = <b>€{g(mgr)} million</b>, "
          f"against €{g(E0)} million without the system. <b>She does not install it.</b></p>"
          f"<p><b>Step 4. The creditors.</b> With the system the debt is worth {g(p)} × {g(F0)} + {g(p)} × {g(L1)} = "
          f"€{g(D1)}M instead of €{g(D0)}M. <b>The creditors would very much like the system</b>: they receive the "
          f"whole €{g(G)}M in a poor winter.</p>"),
    "criteria": [
        f"Recognises that the firm still defaults in a poor winter ({g(L1)} &lt; {g(F0)}), so equity is worth {g(p)} × {g(H1 - F0)} = {g(E1tot)}.".replace("&lt;", "<"),
        f"New investors' fraction from x × {g(E1tot)} = {g(I)}: x = {pc(x)}.",
        f"Ingrid's payoff {pc(1 - x)} × {g(E1tot)} = €{g(mgr)}M, compared with €{g(E0)}M without the system: she does not install it.",
        f"Creditors: debt rises from {g(D0)} to {g(D1)}, so they want the project.",
        "Answers both questions: the manager's decision and the creditors' view.",
        "Show the calculation.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": ("<p>Who gains and who loses if the system is installed as in (c)? Check that the gains and losses add up "
             "to the NPV. Explain briefly what this means for the firm.</p>"),
    "solution": (
        tab(["Claimholder", "Without the system", "With the system as in (c)", "Change"], [
            ["Creditors", f"#{g(D0)}", f"#{g(D1)}", f"#{sg(dD)}"],
            ["Ingrid", f"#{g(E0)}", f"#{g(mgr)}", f"#{sg(dM)}"],
            ["New shareholders", "#0", f"#{g(x * E1tot)} for {g(I)} paid", "#0"],
        ])
        + f"<p><b>Check.</b> {sg(dD)} + ({sg(dM)}) + 0 = <b>{sg(dD + dM + dN)}</b> = the NPV ✓</p>"
          f"<p><b>What it means.</b> The project is a wealth transfer from the shareholder to the creditors: the "
          f"creditors are senior, so in a poor winter the whole €{g(G)}M goes to repay their claim, while Ingrid "
          f"pays for the system by giving up {pc(x)} of the firm. Because the creditors take more than the whole NPV, "
          f"<b>the firm forgoes a positive-NPV project</b>. This is debt overhang.</p>"),
    "criteria": [
        f"Creditors {sg(dD)}, Ingrid {sg(dM)}, new shareholders 0.",
        f"Check: {sg(dD)} − {g(-dM)} + 0 = {g(NPV)} = NPV.",
        "Key sentence (about half the marks for the explanation, as Kurbatov said in recording 04, 44:31): the firm forgoes a positive-NPV project.",
        "Mechanism: the existing debt is senior, so the creditors capture the project's payoff in the bad state; a wealth transfer from the shareholder to the creditors. Naming debt overhang without the mechanism earns half.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>Ingrid offers the creditors to replace their loan with a new zero-coupon loan with a lower face "
             "value. After that, the system is financed with new shares as in (c). For which face values do both the "
             "creditors and Ingrid accept? Why may the creditors agree to write down their claim?</p>"),
    "solution": (
        f"<p><b>Step 1. The creditors' outside option.</b> If they refuse, nothing changes: their claim stays worth "
        f"€{g(D0)}M, from (a).</p>"
        f"<p><b>Step 2. A new face value K.</b> With the system the resort is worth at least {g(L1)}. If K ≤ "
        f"{g(L1)} the new loan is paid in full in both winters, so it is worth K. The creditors accept if "
        f"<b>K ≥ {g(D0)}</b>.</p>"
        f"<p><b>Step 3. Ingrid.</b> All equity is worth {g(p)}({g(H1)} − K) + {g(p)}({g(L1)} − K) = "
        f"{g(p * H1 + (1 - p) * L1)} − K. The new investors take €{g(I)}M of it, so Ingrid keeps "
        f"{g(p * H1 + (1 - p) * L1 - I)} − K. She accepts if {g(p * H1 + (1 - p) * L1 - I)} − K ≥ {g(E0)}, that is "
        f"<b>K ≤ {g(Khi)}</b>.</p>"
        f"<p><b>Step 4. Verify.</b> {g(Khi)} ≤ {g(L1)}, so the new loan is indeed safe in the whole range and the "
        f"formula in Step 2 holds. <b>Both accept any face value from €{g(Klo)} million to €{g(Khi)} million.</b> "
        f"The width of the range, {g(Khi)} − {g(Klo)} = {g(Khi - Klo)}, is the NPV: the two sides share it. For "
        f"example K = {g(Kmid)} gives the creditors {sg(Dm - D0)} and Ingrid {sg(Mm - E0)}.</p>"
        f"<p><b>Why the creditors agree.</b> Their current claim of {g(F0)} is worth only {g(D0)}, because they get "
        f"{g(L)} in a poor winter. A smaller claim that is paid in full is worth more than a larger claim that "
        f"defaults half the time. The write-down makes the project worthwhile for Ingrid while the creditors keep a "
        f"share of its NPV. Without it the NPV is lost for everyone.</p>"),
    "criteria": [
        f"Lower bound from the creditors: their outside option is {g(D0)} (the value of the old debt), so K ≥ {g(D0)}. Using {g(F0)} or {g(D1)} as the creditors' benchmark is the classic error.",
        f"Upper bound from Ingrid: {g(p * H1 + (1 - p) * L1 - I)} − K ≥ {g(E0)}, so K ≤ {g(Khi)}.",
        f"Checks that K ≤ {g(L1)} in the range, so the new debt is safe.",
        f"The range €{g(Klo)}M to €{g(Khi)}M. Noting that its width equals the NPV of {g(NPV)} is a bonus.",
        "Explanation: a smaller safe claim is worth more than a larger risky one. The write-down removes the overhang so the creditors share the NPV instead of blocking it.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["hint2-1"].append(ex)
SVAR["hint2-1:4:a"] = {"type": "tall", "tall": [T("Debt", D0, "€ m"), T("Equity", E0, "€ m")]}
SVAR["hint2-1:4:b"] = {"type": "tall", "tall": [T("NPV", NPV, "€ m")]}
SVAR["hint2-1:4:c"] = {"type": "blandet", "tall": [T("New investors' fraction x", 100 * x, "%"),
                                                  T("Ingrid's payoff", mgr, "€ m")],
                       "tallPoeng": 3, "tekstLedd": "Will Ingrid install the system? Would the creditors like it installed?"}
SVAR["hint2-1:4:d"] = {"type": "blandet", "tall": [T("Creditors' gain", dD, "€ m"), T("Ingrid's gain", dM, "€ m"),
                                                  T("New shareholders' gain", 0.0, "€ m", abs=0.01)],
                       "tallPoeng": 2, "tekstLedd": "Explain briefly what this means for the firm."}
SVAR["hint2-1:4:e"] = {"type": "blandet", "tall": [T("Lowest face value", Klo, "€ m"), T("Highest face value", Khi, "€ m")],
                       "tallPoeng": 3, "tekstLedd": "Why may the creditors agree to write down their claim?"}


# ======================================================================
# hint2-2 · oppgave 1: fire måter å bruke fri kontantstrøm (verbal, 10 p)
# ======================================================================
FCF1 = 900.0
ex = {
    "n": 1, "title": "Payout policy", "points": 10,
    "topic": "Payout policy", "chapters": [15, 16, 11],
    "merke": ("Forelesning 05 (Payout policy), 12:12: «this could be an exam question, I could ask you please list "
              "four things that the company can do with the cash»"),
    "body": (f"<p>Lauvhaug Nett ASA owns and runs the electricity grid in a rural region. The grid is regulated and "
             f"already built out, demand barely grows and the cash flows are stable. This year the company expects a "
             f"free cash flow of NOK {g(FCF1)} million.</p>"
             f"<p>List four things the company can do with the free cash flow. Rank them for Lauvhaug, from the one "
             f"you would prefer as a shareholder to the one you would like least. Justify your ranking. "
             f"(10 points. One or two sentences per alternative should typically be enough.)</p>"),
    "solution": (
        "<p><b>Model answer (one defensible ranking for a mature firm).</b></p>"
        "<p><b>1. Repurchase shares.</b> It returns the cash without a promise to repeat it: shareholders who want "
        "cash sell while the others defer their capital gains tax. If management thinks the shares are cheap, a "
        "repurchase also signals that.</p>"
        "<p><b>2. Pay a dividend.</b> Stable regulated cash flows can carry a regular dividend that keeps the cash "
        "away from managers who might waste it. Dividends are sticky, though: a later cut is punished by the "
        "market, so the level must be one Lauvhaug can hold.</p>"
        "<p><b>3. Retain the cash.</b> A buffer lowers the risk of distress in a bad year and lets the firm fund "
        "future projects without issuing securities. But idle cash invites empire building and works like "
        "negative debt, so it lowers the tax shield.</p>"
        "<p><b>4. Invest it.</b> Investing is the best use only if the firm has good investment opportunities "
        "(positive-NPV projects). A built-out grid with flat demand has few, so «investing» here would likely mean "
        "acquisitions outside the core business; a young growth firm would rank this alternative first.</p>"
        "<p><b>Also accepted.</b> Dividend before repurchase (investors who live on a steady income, a credible "
        "commitment that disciplines management); retaining cash last. In a perfect capital market the first "
        "three alternatives are equivalent (MM), so the ranking comes from the frictions; saying so is a "
        "bonus.</p>"),
    "criteria": [
        "Four distinct alternatives: dividend, share repurchase, retain the cash, invest. 2 points each for the alternative with a reason for its place in the ranking.",
        "«Invest» earns 1 point for naming it and the second only with the condition: if there are good (positive-NPV) investment opportunities. Kurbatov gave this split for the same question (recording 05, 14:34). Ranking «invest» first for Lauvhaug without the condition loses the ranking points.",
        "Ranking (2 points): any order is accepted if the reasons support it and fit a mature firm with stable cash flows. Generic pros and cons that ignore the company earn half.",
        "Do not claim that dividends are generally taxed more heavily: the tax rates are equal today in the US and Norway. The advantage of a repurchase is that the tax is deferred until the shareholder sells.",
        "A cash dividend and a special dividend are one alternative, not two; an open-market repurchase and a tender offer likewise.",
        "Also accepted as one of the four: paying down debt, with a reason (lower risk of distress against a smaller tax shield). An acquisition counts as investing, not as a separate alternative.",
    ],
}
SETT["hint2-2"].append(ex)
SVAR["hint2-2:1:"] = {"type": "tekst"}


# ======================================================================
# hint2-2 · oppgave 2: kostnader ved financial distress (verbal, 10 p)
# ======================================================================
ex = {
    "n": 2, "title": "Capital Structure", "points": 10,
    "topic": "Costs of financial distress", "chapters": [8],
    "merke": ("Forelesning 04 (Capital Structure III), 26:24: «an example question, like one of the first two "
              "questions, could be name some of those costs»"),
    "body": ("<p>Kvalsund Subsea AS owns a fleet of specialised offshore construction vessels. After two weak years it "
             "is unlikely to be able to make a large bond payment due in four months.</p>"
             "<p>(1) Name one direct and one indirect cost of financial distress that Kvalsund may face. Explain each "
             "in three to four sentences. (6 points)<br>(2) Why do the indirect costs usually matter more than the "
             "direct ones? (2 points)<br>(3) What can happen if Kvalsund cannot make the payment? Name two possible "
             "outcomes, one sentence each. (2 points)</p>"),
    "solution": (
        "<p><b>(1) A direct cost: legal and administrative costs.</b> If Kvalsund defaults, it must pay its own "
        "and the creditors' lawyers, financial advisers and court fees, often for years while the claims are sorted "
        "out. For a large firm these fees are a few percent of firm value; for a small "
        "one they can be a quarter of it. They are paid out of the firm's assets and reduce what is left for the "
        "investors.</p>"
        "<p><b>An indirect cost: fire sales.</b> To raise cash fast, Kvalsund may have to sell vessels in a hurry. "
        "Specialised vessels have few buyers, they may have to be moved to another market and the buyers know the "
        "seller is desperate, so they pay far below fair value. The gap is value lost for good, borne by the "
        "creditors and, through the price of the debt, by the shareholders. (Other indirect costs that are "
        "accepted: customers who stop signing long contracts with a firm that may not exist next year; suppliers "
        "who demand cash up front; key employees who leave; competitors who take market share; management time "
        "spent negotiating with creditors; debt overhang, where the firm forgoes positive-NPV projects.)</p>"
        "<p><b>(2) Why indirect costs matter more.</b> Direct costs are paid only if the firm actually goes "
        "bankrupt and they are modest, so the expected direct cost (a small probability times a modest cost) is "
        "tiny. Indirect costs start as soon as the firm is in distress, whether or not it ends in bankruptcy. "
        "They hit the business itself: lost customers, lost market share and assets sold below value. They are much "
        "larger and hard to reverse.</p>"
        "<p><b>(3) What can happen.</b> Kvalsund can renegotiate with the bondholders, for example extend the bond "
        "or pay less now and more later, possibly with new money from the owners. If that fails, it enters formal "
        "bankruptcy: either liquidation, where the vessels are sold and the proceeds go to the creditors, or "
        "reorganisation, where the payments are frozen while management proposes a plan the creditors must "
        "approve. (Also accepted: sell assets or cut investment and costs to meet the payment.)</p>"),
    "criteria": [
        "Direct cost (3 points): a correct example (legal, advisory, court or administrative costs of bankruptcy) and three to four sentences on what it is and why it reduces value, for example who pays it or how large it is.",
        "Indirect cost (3 points): a correct example (fire sales, lost customers or suppliers, employees leaving, competitors taking market share, management distraction, debt overhang) with the mechanism, why distress causes it and why value is lost. A fire sale needs the reason the price is low: few buyers for specialised assets and a seller who must sell fast.",
        "Why indirect costs matter more (2 points): the expected direct cost is a small probability times a modest cost, while indirect costs arise in distress even without bankruptcy and damage the business itself.",
        "What can happen (2 points): two of renegotiating or restructuring the debt, raising new capital, selling assets or cutting costs and investment, liquidation, reorganisation. Liquidation and reorganisation count as two.",
        "A fire sale classified as a direct cost earns at most half for that example: Kurbatov treats inefficient liquidation as an indirect cost (recording 04, 29:58; recording 18, 34:13).",
    ],
}
SETT["hint2-2"].append(ex)
SVAR["hint2-2:2:"] = {"type": "tekst"}


# ======================================================================
# hint2-2 · oppgave 3: skatteskjold på annuitetslån, tilbakekjøp, utbytte (20 p)
# ======================================================================
N0, P0, tau = 125.0, 36.0, 0.22
VU = N0 * P0
Dl, rD, Tn = 1261.0, 0.05, 3
ann = Dl * rD / (1 - (1 + rD) ** -Tn)
assert near(ann, 463.05, 1e-9)
bal, rente, avdrag, saldo_start = Dl, [], [], []
for t in range(Tn):
    saldo_start.append(bal)
    it = rD * bal
    rente.append(it)
    avdrag.append(ann - it)
    bal -= ann - it
assert near(bal, 0, 1e-9)                               # lånet er nedbetalt
assert near(sum(ann / (1 + rD) ** (t + 1) for t in range(Tn)), Dl)
assert [round(v, 2) for v in rente] == [63.05, 43.05, 22.05]
assert [round(v, 2) for v in avdrag] == [400.0, 420.0, 441.0]
TS = [tau * v for v in rente]
PVts_t = [TS[t] / (1 + rD) ** (t + 1) for t in range(Tn)]
PVts = sum(PVts_t)
assert near(PVts, tau * (Dl - sum(avdrag[t] / (1 + rD) ** (t + 1) for t in range(Tn))))   # bare renter
feil_tauD = tau * Dl                         # permanent gjeld eller med avdraget
feil_udiskontert = tau * sum(rente)
assert abs(feil_udiskontert - PVts) / PVts > 0.05 and feil_tauD > 5 * PVts
# (b) kunngjøring
VL = VU + PVts
P1 = VL / N0
assert P1 > P0
# (c) to likninger: n·P1 = D og (N0 − n)·P1 = VL − D
nb = Dl / P1
N1 = N0 - nb
E1 = VL - Dl
assert near(N1 * P1, E1)
assert near(nb * P1 + N1 * P1, VL)
nb_feil = Dl / P0
assert abs(nb_feil - nb) / nb > 0.005
# (d) selger = blir
gain_ps = P1 - P0
assert near(gain_ps * N0, PVts)
# (e) uten skatt
hold = 10000
P_ns = VU / N0
nb_ns = Dl / P_ns
dps = Dl / N0
Pex = (VU - Dl) / N0
W_buy = hold * P_ns
W_div = hold * dps + hold * Pex
assert near(W_buy, W_div) and near(W_buy, 360000)
assert near(P_ns, P0) and near(dps, 10.088) and near(Pex, 25.912)
selg = hold * dps / P_ns                       # hjemmelaget utbytte
assert near((hold - selg) * P_ns, hold * Pex)

ex = {
    "n": 3, "title": "Capital Structure", "points": 20,
    "topic": "Interest tax shield, repurchase and payout", "chapters": [7, 15],
    "merke": "Forelesning 03 (Capital Structure II), 32:56: «Again, this could be... Part A of your exam question»",
    "body": (f"<p>Steinsvær Packaging ASA has no debt, {g(N0)} million shares outstanding and a share price of NOK "
             f"{g(P0)}. The corporate tax rate is {pc(tau)}. Apart from corporate taxes, capital markets are "
             f"perfect.</p>"
             f"<p>The board decides to borrow NOK {g(Dl)} million today as a three-year annuity loan at "
             f"r<sub>D</sub> = {pc(rD)} and to use all of it to repurchase shares right away. The loan is repaid in "
             f"three equal annual payments of NOK {g(ann)} million, each covering interest and repayment of "
             f"principal. Only interest is tax deductible; repayments of principal are not. The loan is risk-free and "
             f"Steinsvær will always have enough taxable income to use the interest deductions. Use 4 decimal "
             f"places.</p>"),
}
rows = []
for t in range(Tn):
    rows.append([f"{t + 1}", f"#{g(saldo_start[t])}", f"#{g(rente[t])}", f"#{g(avdrag[t])}",
                 f"#{f(TS[t], 3)}", f"#{f(PVts_t[t], 6)}"])
pa = {
    "label": "a", "points": 5,
    "body": ("<p>What is the interest payment in each of the three years? By how much does the interest tax shield "
             "increase the value of Steinsvær?</p>"),
    "solution": (
        f"<p><b>Step 1. Split each payment.</b> Interest is {pc(rD)} of the balance at the start of the year; the "
        f"rest of the NOK {g(ann)} million repays principal.</p>"
        + tab(["Year", "Balance at start", "Interest", "Principal", "Tax shield τ × interest", "PV at 5%"], rows)
        + f"<p>Year 1: {g(rD)} × {g(Dl)} = {g(rente[0])}, principal {g(ann)} − {g(rente[0])} = {g(avdrag[0])}. "
          f"Year 2: {g(rD)} × {g(saldo_start[1])} = {g(rente[1])}. Year 3: {g(rD)} × {g(saldo_start[2])} = "
          f"{g(rente[2])}. The last principal payment of {g(avdrag[2])} clears the loan.</p>"
          f"<p><b>Step 2. Only interest is deductible.</b> Repaying principal is not an expense, so it creates no tax "
          f"shield. The shields are as safe as the loan, so they are discounted at r<sub>D</sub> = {pc(rD)}:</p>"
          f"<p>PV(TS) = {f(TS[0], 3)}/1.05 + {f(TS[1], 3)}/1.05<sup>2</sup> + {f(TS[2], 3)}/1.05<sup>3</sup> = "
          f"{f(PVts_t[0], 6)} + {f(PVts_t[1], 6)} + {f(PVts_t[2], 6)} = {f(PVts, 6)} ≈ <b>NOK {f(PVts)} million</b></p>"
          f"<p><b>Check.</b> The loan is paid off: the principal payments {g(avdrag[0])} + {g(avdrag[1])} + "
          f"{g(avdrag[2])} sum to {g(sum(avdrag))}, the amount borrowed. τD = {g(tau)} × {g(Dl)} = {g(feil_tauD)} would assume permanent debt (or count the principal), "
          f"far too much for a loan that is gone in three years.</p>"),
    "criteria": [
        f"Interest {g(rente[0])}, {g(rente[1])} and {g(rente[2])} from the declining balance. Using the whole payment of {g(ann)} as interest is the classic error.",
        f"Tax shield = τ × interest only: {f(TS[0], 3)}, {f(TS[1], 3)}, {f(TS[2], 3)}. Including the principal repayments (or using τD = {g(feil_tauD)}) loses most of the points.",
        f"Discounts at r_D = {pc(rD)} because the shields are as safe as the loan: PV(TS) = NOK {f(PVts)}M. Forgetting to discount ({f(feil_udiskontert)}) loses 1 point.",
        "Show the calculation.",
    ],
}
pb = {
    "label": "b", "points": 3,
    "body": "<p>What happens to the share price when the plan is announced? Find the new share price.</p>",
    "solution": (
        f"<p>In a perfect market apart from taxes the price reacts at once, before any money is borrowed. The "
        f"market adds the tax shield to the value of the firm:</p>"
        f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {g(N0)} × {g(P0)} + {f(PVts)} = {g(VU)} + {f(PVts)} = "
        f"{f(VL)}</p>"
        f"<p>All of it still belongs to the {g(N0)} million shares, so the price <b>rises</b> to {f(VL)} / {g(N0)} = "
        f"<b>NOK {f(P1)}</b>, up by PV(TS)/N = {f(gain_ps)} per share.</p>"),
    "criteria": [
        f"V^U = {g(N0)} × {g(P0)} = NOK {g(VU)}M and V^L = V^U + PV(TS) = {f(VL)}.",
        f"The price rises on the announcement, not when the shares are bought back: NOK {f(P1)}.",
        f"Saying the price is unchanged at {g(P0)} (MM without taxes) or adding the loan to the firm value are the classic errors.",
        f"Adding τ × principal (for example τD = {g(feil_tauD)}) to the value is an error: repayments of principal are not deductible, so they create no tax shield.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": ("<p>How many shares does Steinsvær repurchase? How many remain outstanding? What is the market value of the "
             "equity after the repurchase?</p>"),
    "solution": (
        "<p><b>Two equations.</b> The repurchase spends the whole loan at the new price. The remaining shares "
        "are worth the equity that is left:</p>"
        f"<p>n × P = {g(Dl)}<br>(125 − n) × P = V<sup>L</sup> − D = {f(VL)} − {g(Dl)} = {f(E1)}</p>"
        f"<p>Adding them gives 125 × P = {f(VL)}, so P = {f(P1)} as in (b). Then</p>"
        f"<p>n = {g(Dl)} / {f(P1, 6)} = <b>{f(nb)} million shares repurchased</b>, leaving {g(N0)} − {f(nb)} = "
        f"<b>{f(N1)} million shares</b>.</p>"
        f"<p>Equity after the repurchase: <b>NOK {f(E1)} million</b>.</p>"
        f"<p><b>Check.</b> {f(N1, 6)} × {f(P1, 6)} = {f(N1 * P1)} ✓. The price does not move when the shares are bought "
        f"back: the firm pays a fair price.</p>"),
    "criteria": [
        f"Uses the new price: n = {g(Dl)}/{f(P1, 6)} = {f(nb)} million. Dividing by the old price of {g(P0)} ({f(nb_feil)} million) is the classic error.",
        f"Remaining shares {f(N1)} million.",
        f"Equity after = V^L − D = {f(VL)} − {g(Dl)} = NOK {f(E1)}M. Check: {f(N1, 6)} × {f(P1, 6)} ≈ {f(E1)}.",
        "Uses the post-announcement price (n = D/P or the two-equation system).",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": ("<p>Compare a shareholder who sells her shares in the repurchase with one who keeps his shares. Who is "
             "better off? Explain briefly.</p>"),
    "solution": (
        f"<p>The seller receives <b>NOK {f(P1)}</b> in cash per share. The one who stays holds a share worth "
        f"<b>NOK {f(P1)}</b>. Both started from NOK {g(P0)} and both gain {f(gain_ps)} per share, their part of "
        f"the tax shield. <b>Neither is better off.</b></p>"
        "<p>The repurchase price already contains the tax shield, so selling is a fair trade. If one group were "
        "better off, nobody would want to be in the other and the price could not be right. (In real life tax on "
        "capital gains or different horizons can make investors prefer one side; the model has neither.)</p>"),
    "criteria": [
        f"Seller: NOK {f(P1)} in cash per share; the one who stays: a share worth NOK {f(P1)}.",
        f"Both gain PV(TS)/N = {f(gain_ps)} per share; neither is better off.",
        "Reason: the repurchase happens at the fair post-announcement price, so the gain from the tax shield is shared equally. A finding that one side is better off signals a calculation error.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": (f"<p>Now suppose instead that there are no taxes at all, so markets are perfect. Steinsvær borrows the same "
             f"NOK {g(Dl)} million and either (i) repurchases shares or (ii) pays the money out at once as a special "
             f"dividend. Consider a shareholder who owns {hold:,} shares and sells none. Compare, with numbers, her "
             f"wealth under (i) and (ii). Does the choice between a repurchase and a dividend matter for her?</p>"),
    "solution": (
        f"<p><b>Step 1. No tax shield.</b> Without taxes PV(TS) = 0, so firm value stays at {g(VU)} and the price "
        f"stays at NOK {g(P_ns)} on the announcement.</p>"
        f"<p><b>(i) Repurchase.</b> The firm buys {g(Dl)} / {g(P_ns)} = {f(nb_ns)} million shares at {g(P_ns)}. The "
        f"remaining shares are worth ({g(VU)} − {g(Dl)}) / ({g(N0)} − {f(nb_ns, 6)}) = {g(P_ns)}. Her wealth: "
        f"{hold:,} × {g(P_ns)} = <b>NOK {g(W_buy)}</b>.</p>"
        f"<p><b>(ii) Dividend.</b> Dividend per share {g(Dl)} / {g(N0)} = {g(dps)}. Afterwards the equity is worth "
        f"{g(VU)} − {g(Dl)} = {g(VU - Dl)}, so the ex-dividend price is {g(VU - Dl)} / {g(N0)} = {g(Pex)}. Her "
        f"wealth: {hold:,} × {g(dps)} + {hold:,} × {g(Pex)} = {g(hold * dps)} + {g(hold * Pex)} = <b>NOK "
        f"{g(W_div)}</b>.</p>"
        f"<p><b>Conclusion.</b> Her wealth is the same, NOK {g(W_buy)}, so <b>the choice does not matter</b>: in a "
        f"perfect market payout policy is irrelevant (MM). Only the form differs. If she wants the cash from (ii) "
        f"under (i), she sells {g(hold * dps)} / {g(P_ns)} = {f(selg, 2)} shares herself; the remaining "
        f"{f(hold - selg, 2)} shares are worth about {g((hold - selg) * P_ns)}, exactly as in (ii) (a homemade "
        f"dividend).</p>"),
    "criteria": [
        f"No taxes, so the price stays at NOK {g(P_ns)}; under (i) she keeps {hold:,} shares worth {g(W_buy)}.",
        f"Under (ii): dividend {g(dps)} per share and ex-dividend price {g(Pex)}, so {g(hold * dps)} + {g(hold * Pex)} = {g(W_div)}.",
        "Conclusion: equal wealth, so the choice is irrelevant in a perfect market.",
        f"Bonus: the homemade dividend, selling {f(selg, 1)} shares under (i) replicates (ii).",
        "Show the calculation. Stating MM irrelevance without numbers earns at most 1 point.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["hint2-2"].append(ex)
SVAR["hint2-2:3:a"] = {"type": "tall", "tall": [T("Interest, year 1", rente[0], "NOK m"), T("Interest, year 2", rente[1], "NOK m"),
                                                T("Interest, year 3", rente[2], "NOK m"), T("PV(TS)", PVts, "NOK m")]}
SVAR["hint2-2:3:b"] = {"type": "tall", "tall": [T("Share price after the announcement", P1, "NOK per share")]}
SVAR["hint2-2:3:c"] = {"type": "tall", "tall": [T("Shares repurchased", nb, "m shares"), T("Shares remaining", N1, "m shares"),
                                                T("Equity after the repurchase", E1, "NOK m")]}
SVAR["hint2-2:3:d"] = {"type": "blandet", "tall": [T("Seller's payoff per share", P1, "NOK per share"),
                                                  T("Value per share for the one who stays", P1, "NOK per share")],
                       "tallPoeng": 1, "tekstLedd": "Who is better off? Explain briefly."}
SVAR["hint2-2:3:e"] = {"type": "blandet", "tall": [T("Wealth with the repurchase", W_buy, "NOK"),
                                                  T("Wealth with the dividend", W_div, "NOK")],
                       "tallPoeng": 2, "tekstLedd": "Does the choice between a repurchase and a dividend matter for her?"}


# ======================================================================
# hint2-2 · oppgave 4: gambling for resurrection med brannsalg (20 p)
# ======================================================================
Fd, phi = 80.0, 0.60
plan = ([0.4, 0.6], [90.0, 50.0])
agg = ([0.2, 0.8], [140.0, 45.0])


def krav(strat):
    ps, xs = strat
    D = sum(pi * (Fd if xi >= Fd else phi * xi) for pi, xi in zip(ps, xs))
    E = sum(pi * max(xi - Fd, 0) for pi, xi in zip(ps, xs))
    BC = sum(pi * ((1 - phi) * xi if xi < Fd else 0) for pi, xi in zip(ps, xs))
    A = sum(pi * xi for pi, xi in zip(ps, xs))
    Pdef = sum(pi for pi, xi in zip(ps, xs) if xi < Fd)
    return D, E, BC, A, Pdef


Dp, Ep, BCp, Ap, Pdp = krav(plan)
Da, Ea, BCa, Aa, Pda = krav(agg)
for (D_, E_, BC_, A_) in ((Dp, Ep, BCp, Ap), (Da, Ea, BCa, Aa)):
    assert near(D_ + E_ + BC_, A_)                      # D + E + brannsalgstap = E[eiendeler]
assert near(Dp, 50) and near(Ep, 4) and near(BCp, 12) and near(Ap, 66)
assert near(Da, 37.6) and near(Ea, 12) and near(BCa, 14.4) and near(Aa, 64)
dA = Aa - Ap
assert dA < 0                                           # negativ NPV
assert Ea > Ep                                          # lederen bytter
assert Aa < Ap                                          # uten gjeld: ikke bytte (V = E[eiendeler])
dE_, dD_ = Ea - Ep, Da - Dp
dV = (Da + Ea) - (Dp + Ep)
assert near(dE_ + dD_, dV)
transfer = dE_
eff = -dV
assert near(eff, -dA + (BCa - BCp))                     # effektivitetstap = lavere eiendeler + mer brannsalg
assert near(-dD_, transfer + eff)
assert near(transfer, 8) and near(eff, 4.4) and near(-dA, 2) and near(BCa - BCp, 2.4)
assert Pda > Pdp
# (e) ex ante: långiver betaler Da; eierne bærer kostnaden
eier_aggr = Da + Ea
eier_plan = Dp + Ep
assert near(eier_aggr, Aa - BCa) and near(eier_plan, Ap - BCp)
assert near(Ap - eier_aggr, -dA + BCa)

ex = {
    "n": 4, "title": "Debt and risk", "points": 20,
    "topic": "Financial distress, fire sales and risk taking", "chapters": [8, 9],
    "merke": "Forelesning 18 (Wrap-up), 28:00: «And we might see such an exercise»",
    "body": (f"<p>Rossvik Yards Inc. builds specialised ships. Its only debt is a zero-coupon loan with a face value of "
             f"${g(Fd)} million due in one year. Under its current plan the firm's assets will be worth "
             f"${g(plan[1][0])} million next year with probability {pc(plan[0][0])} and ${g(plan[1][1])} million with "
             f"probability {pc(plan[0][1])}. If the firm cannot repay the loan in full, it goes bankrupt: the assets "
             f"are sold in a fire sale that recovers only {pc(phi)} of their value and the creditors receive the "
             f"proceeds. Everyone is risk neutral, the risk-free rate is 0% and there are no taxes. The manager acts "
             f"in the interest of the shareholders.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What are the values of the debt and the equity today? What is the expected loss from the fire sale?</p>",
    "solution": (
        tab(["State", "Probability", "Assets", "Debt", "Equity", "Fire-sale loss"], [
            ["Good", f"#{pc(plan[0][0])}", f"#{g(plan[1][0])}", f"#{g(Fd)}", f"#{g(plan[1][0] - Fd)}", "#0"],
            ["Bad (bankrupt)", f"#{pc(plan[0][1])}", f"#{g(plan[1][1])}", f"#{g(phi)} × {g(plan[1][1])} = {g(phi * plan[1][1])}",
             "#0", f"#{g((1 - phi) * plan[1][1])}"],
        ])
        + f"<p>D = {g(plan[0][0])} × {g(Fd)} + {g(plan[0][1])} × {g(phi * plan[1][1])} = <b>${g(Dp)} million</b>. "
          f"E = {g(plan[0][0])} × {g(plan[1][0] - Fd)} = <b>${g(Ep)} million</b>. Expected fire-sale loss = "
          f"{g(plan[0][1])} × {g((1 - phi) * plan[1][1])} = <b>${g(BCp)} million</b>.</p>"
          f"<p><b>Check.</b> D + E + expected loss = {g(Dp)} + {g(Ep)} + {g(BCp)} = {g(Ap)} = {g(plan[0][0])} × "
          f"{g(plan[1][0])} + {g(plan[0][1])} × {g(plan[1][1])}, the expected value of the assets ✓</p>"),
    "criteria": [
        f"In the bad state the creditors get {g(phi)} × {g(plan[1][1])} = {g(phi * plan[1][1])}, not {g(plan[1][1])}: D = ${g(Dp)}M.",
        f"Equity {g(plan[0][0])} × {g(plan[1][0] - Fd)} = ${g(Ep)}M.",
        f"Expected fire-sale loss {g(plan[0][1])} × {g((1 - phi) * plan[1][1])} = ${g(BCp)}M.",
    ],
}
pb = {
    "label": "b", "points": 3,
    "body": (f"<p>The manager can switch at no cost to an aggressive strategy, bidding for one very large and risky "
             f"contract. The assets would then be worth ${g(agg[1][0])} million with probability {pc(agg[0][0])} and "
             f"${g(agg[1][1])} million with probability {pc(agg[0][1])}. By how much does the switch change the "
             f"expected value of the assets? Would the firm switch if it had no debt?</p>"),
    "solution": (
        f"<p>Expected assets under the aggressive strategy: {g(agg[0][0])} × {g(agg[1][0])} + {g(agg[0][1])} × "
        f"{g(agg[1][1])} = {g(agg[0][0] * agg[1][0])} + {g(agg[0][1] * agg[1][1])} = {g(Aa)}, against {g(Ap)} "
        f"today. The switch changes the expected value by <b>−${g(-dA)} million</b>: it has a negative NPV.</p>"
        f"<p>Without debt there is no default and no fire sale, so the owners get the whole expected value: "
        f"{g(Aa)} &lt; {g(Ap)}. <b>An unlevered firm would not switch.</b></p>"),
    "criteria": [
        f"Expected assets {g(Aa)} against {g(Ap)}: a change of {g(dA)}.",
        "Without debt the owners bear the whole loss, so the firm would not switch.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": "<p>What are the values of the debt and the equity under the aggressive strategy? Will the manager switch?</p>",
    "solution": (
        tab(["State", "Probability", "Assets", "Debt", "Equity", "Fire-sale loss"], [
            ["Good", f"#{pc(agg[0][0])}", f"#{g(agg[1][0])}", f"#{g(Fd)}", f"#{g(agg[1][0] - Fd)}", "#0"],
            ["Bad (bankrupt)", f"#{pc(agg[0][1])}", f"#{g(agg[1][1])}", f"#{g(phi)} × {g(agg[1][1])} = {g(phi * agg[1][1])}",
             "#0", f"#{g((1 - phi) * agg[1][1])}"],
        ])
        + f"<p>D = {g(agg[0][0])} × {g(Fd)} + {g(agg[0][1])} × {g(phi * agg[1][1])} = {g(agg[0][0] * Fd)} + "
          f"{g(agg[0][1] * phi * agg[1][1])} = <b>${g(Da)} million</b>. E = {g(agg[0][0])} × {g(agg[1][0] - Fd)} = "
          f"<b>${g(Ea)} million</b>.</p>"
          f"<p><b>The manager switches</b>, because the shares are worth {g(Ea)} instead of {g(Ep)}. With limited "
          f"liability the shareholders get nothing in the bad state either way, so they only care about the good "
          f"state: a {pc(agg[0][0])} chance of {g(agg[1][0] - Fd)} beats a {pc(plan[0][0])} chance of "
          f"{g(plan[1][0] - Fd)}. This is gambling for resurrection.</p>"
          f"<p><b>Check.</b> {g(Da)} + {g(Ea)} + {g(agg[0][1])} × {g((1 - phi) * agg[1][1])} = {g(Da)} + {g(Ea)} + "
          f"{g(BCa)} = {g(Aa)} ✓</p>"),
    "criteria": [
        f"Debt {g(agg[0][0])} × {g(Fd)} + {g(agg[0][1])} × {g(phi * agg[1][1])} = ${g(Da)}M, with the fire-sale recovery in the bad state.",
        f"Equity {g(agg[0][0])} × {g(agg[1][0] - Fd)} = ${g(Ea)}M.",
        f"The manager switches because {g(Ea)} > {g(Ep)}, with the reason: limited liability, so the shareholders keep the upside and the creditors bear the downside.",
    ],
}
pd = {
    "label": "d", "points": 5,
    "body": ("<p>Split the change in the value of the debt into a wealth transfer to the shareholders and a loss of "
             "efficiency. Where does the efficiency loss come from?</p>"),
    "solution": (
        tab(["", "Current plan", "Aggressive", "Change"], [
            ["Debt", f"#{g(Dp)}", f"#{g(Da)}", f"#{sg(dD_)}"],
            ["Equity", f"#{g(Ep)}", f"#{g(Ea)}", f"#{sg(dE_)}"],
            ["Debt + equity", f"#{g(Dp + Ep)}", f"#{g(Da + Ea)}", f"#{sg(dV)}"],
            ["Expected fire-sale loss", f"#{g(BCp)}", f"#{g(BCa)}", f"#{sg(BCa - BCp)}"],
            ["Expected assets", f"#{g(Ap)}", f"#{g(Aa)}", f"#{sg(dA)}"],
        ])
        + f"<p><b>Split.</b> The creditors lose {g(-dD_)}. Of this, <b>{g(transfer)} is a wealth transfer</b> to the "
          f"shareholders (their gain) and <b>{g(eff)} is an efficiency loss</b> that nobody receives: {g(-dD_)} = "
          f"{g(transfer)} + {g(eff)}. Put differently, the creditors' {g(Dp)} becomes {g(Da)} kept + {g(transfer)} "
          f"transferred + {g(eff)} lost.</p>"
          f"<p><b>Where the efficiency loss comes from.</b> {g(-dA)} comes from the lower expected asset value of "
          f"the aggressive strategy (b). Another {g(BCa - BCp)} comes because bankruptcy becomes more likely ({pc(Pda)} instead "
          f"of {pc(Pdp)}), so the expected fire-sale loss rises from {g(BCp)} to {g(BCa)}: {g(-dA)} + "
          f"{g(BCa - BCp)} = {g(eff)}.</p>"
          f"<p><b>Check.</b> ΔE + ΔD = {sg(dE_)} + ({sg(dD_)}) = {sg(dV)} = {sg(dA)} − {g(BCa - BCp)} ✓</p>"),
    "criteria": [
        f"Creditors lose {g(-dD_)}: {g(transfer)} transferred to the shareholders and {g(eff)} lost.",
        f"Efficiency loss {g(eff)} = {g(-dA)} lower expected assets + {g(BCa - BCp)} higher expected fire-sale loss. Stopping at {g(-dA)} misses the bankruptcy cost and earns at most 3 of 5.",
        f"The reason the fire-sale loss rises: bankruptcy becomes more likely, {pc(Pda)} instead of {pc(Pdp)}.",
        f"Check ΔE + ΔD = {g(dV)}.",
    ],
}
pe = {
    "label": "e", "points": 3,
    "body": ("<p>Suppose the loan were only being arranged today, before the manager chooses a strategy, with the "
             "proceeds paid out to the shareholders at once. The lender "
             "correctly anticipates the fire-sale losses and the manager's choice. How much would the lender pay for "
             "the loan? Who bears the expected cost of the fire sales and of the aggressive strategy?</p>"),
    "solution": (
        f"<p>The lender foresees the switch and pays what the loan will be worth: <b>${g(Da)} million</b> for a "
        f"promise of {g(Fd)}.</p>"
        f"<p><b>The shareholders bear the costs.</b> They raise only {g(Da)} and keep equity worth {g(Ea)}, in total "
        f"{g(eier_aggr)} = {g(Aa)} − {g(BCa)}. If they could commit to the current plan, the lender would pay "
        f"{g(Dp)} and they would hold {g(Dp)} + {g(Ep)} = {g(eier_plan)}. Rational creditors price the expected "
        f"fire-sale loss and the gamble into the loan, so the cost ends up with the shareholders, through a lower "
        f"price for the debt (a higher promised yield).</p>"),
    "criteria": [
        f"Lender pays ${g(Da)}M, the value of the debt given the switch.",
        f"The shareholders bear the cost ex ante: {g(Da)} + {g(Ea)} = {g(eier_aggr)}, less than {g(eier_plan)} under a commitment to the current plan.",
        "Reason: creditors are rational and price the expected losses into the debt. «The creditors bear it» earns credit only for the ex post view and at most 1 point.",
    ],
}
pf = {
    "label": "f", "points": 2,
    "body": ("<p>Name one measure the creditors could use to protect themselves against such a switch. Explain briefly "
             "how it works.</p>"),
    "solution": (
        "<p><b>A covenant</b> in the loan agreement that forbids large changes to the business plan, such as "
        "bidding for contracts above a set size, without the lender's consent. Breaking it gives the lender the "
        "right to demand repayment, so the switch is no longer available to the manager.</p>"
        "<p><b>Also accepted.</b> Convertible debt: the creditors can convert into shares and take part in the "
        "upside, so the gamble no longer transfers wealth to the shareholders. Collateral or secured debt, short "
        "maturities with close monitoring, or renegotiating the loan when the firm is close to repaying, so that it "
        "survives without gambling.</p>"),
    "criteria": [
        "One measure (1 point): covenant, convertible debt, collateral, short maturity or monitoring, renegotiation.",
        "How it works (1 point): it removes the option to switch or the shareholders' gain from switching.",
        "Covenants: the basic answer (they block the switch ex post) earns the point. Full insight adds that they also make the debt cheaper ex ante.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe, pf]
SETT["hint2-2"].append(ex)
SVAR["hint2-2:4:a"] = {"type": "tall", "tall": [T("Debt", Dp, "$ m"), T("Equity", Ep, "$ m"),
                                                T("Expected fire-sale loss", BCp, "$ m")]}
SVAR["hint2-2:4:b"] = {"type": "blandet", "tall": [T("Change in expected asset value", dA, "$ m")],
                       "tallPoeng": 2, "tekstLedd": "Would the firm switch if it had no debt?"}
SVAR["hint2-2:4:c"] = {"type": "blandet", "tall": [T("Debt", Da, "$ m"), T("Equity", Ea, "$ m")],
                       "tallPoeng": 3, "tekstLedd": "Will the manager switch?"}
SVAR["hint2-2:4:d"] = {"type": "blandet", "tall": [T("Wealth transfer, size", transfer, "$ m", alt=[-transfer]),
                                                  T("Efficiency loss, size", eff, "$ m", alt=[-eff])],
                       "tallPoeng": 2, "tekstLedd": "Where does the efficiency loss come from?",
                       "merknad": "alt med negativt fortegn: begge delene er tap for kreditorene, så −8 og −4,4 godtas."}
SVAR["hint2-2:4:e"] = {"type": "blandet", "tall": [T("Price the lender pays", Da, "$ m")],
                       "tallPoeng": 1, "tekstLedd": "Who bears the expected cost of the fire sales and of the aggressive strategy?"}
SVAR["hint2-2:4:f"] = {"type": "tekst"}


# ======================================================================
# Kontroller: poeng, skriveregler, tall i løsningen
# ======================================================================
def tekster(ex):
    for k in ("title", "body", "solution", "merke"):
        yield ex.get(k, "")
    yield from ex.get("criteria", [])
    for p in ex.get("parts", []):
        for k in ("body", "solution"):
            yield p.get(k, "")
        yield from p.get("criteria", [])


def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")


def tall_i(tekst):
    t = re.sub(r"&[a-z]+;", " ", ren(tekst)).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", m.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


feil = []
ord_tot = {}
for sid, liste in SETT.items():
    assert [e["n"] for e in liste] == [1, 2, 3, 4], sid
    assert [e["points"] for e in liste] == [10, 10, 20, 20], sid
    assert sum(e["points"] for e in liste) == 60, sid
    for ex in liste:
        for k in ("title", "points", "topic", "chapters", "body", "merke"):
            assert k in ex, (sid, ex["n"], k)
        assert ex["merke"].startswith("Forelesning "), ex["merke"]
        if re.search(r",\s+og\b", ex["merke"]):
            feil.append(f"{sid}:{ex['n']} komma før og i merket")
        deler = ex.get("parts", [])
        if deler:
            assert sum(p["points"] for p in deler) == ex["points"], (sid, ex["n"])
            ordtall = len(ren(ex["body"]).split()) + sum(len(ren(p["body"]).split()) for p in deler)
        else:
            assert ex.get("solution") and ex.get("criteria"), (sid, ex["n"])
            ordtall = len(ren(ex["body"]).split())
        ord_tot[f"{sid}:{ex['n']}"] = ordtall
        for t in tekster(ex):
            r = ren(t)
            if "—" in r:
                feil.append(f"{sid}:{ex['n']} tankestrek: {r[:80]}")
            m = re.search(r",\s+and\b", r)
            if m:
                feil.append(f"{sid}:{ex['n']} komma før and: …{r[max(0, m.start() - 50):m.end() + 10]}…")
            if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
                feil.append(f"{sid}:{ex['n']} pronomen om Kurbatov")
            if re.search(r"\d-\d|\s-\d", r):
                feil.append(f"{sid}:{ex['n']} bindestrek som minus? {r[:60]}")
        crit = list(ex.get("criteria", [])) + [c for p in deler for c in p["criteria"]]
        for c in crit:
            if "<" in c and "&lt;" not in c and re.search(r"<[a-z/]", c):
                feil.append(f"{sid}:{ex['n']} markup i criteria: {c[:60]}")
        if not deler:
            k = f"{sid}:{ex['n']}:"
            if SVAR.get(k, {}).get("type") != "tekst":
                feil.append(f"mangler tekst-svar {k}")
        for p in deler:
            k = f"{sid}:{ex['n']}:{p['label']}"
            d = SVAR.get(k)
            if d is None:
                feil.append(f"mangler svar {k}")
                continue
            if d["type"] == "tekst":
                continue
            if d["type"] == "blandet":
                assert 0 < d["tallPoeng"] < p["points"], k
            assert 1 <= len(d["tall"]) <= 5, k
            kilde = " ".join([p["solution"], " ".join(p["criteria"])])
            nums = tall_i(kilde)
            for t in d["tall"]:
                v = t["verdi"]
                tol = max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)
                ok = any(abs(n - v) <= tol for n in nums)
                if not ok and t["enhet"] == "%":
                    ok = any(abs(n * 100 - v) <= tol or abs(n - v / 100) <= tol / 100 for n in nums)
                if not ok:
                    feil.append(f"{k}: {t['navn']} = {v} finnes ikke i løsningen")
                assert abs(v) > 1e-6 or "abs" in t, k
alle = set()
for s, l in SETT.items():
    for e in l:
        if e.get("parts"):
            alle |= {f"{s}:{e['n']}:{p['label']}" for p in e["parts"]}
        else:
            alle.add(f"{s}:{e['n']}:")
assert set(SVAR) == alle, set(SVAR) ^ alle

for x_ in feil:
    print("FEIL", x_)
if feil:
    raise SystemExit("skriver ingenting: rett feilene først")

print("Ord i oppgaveteksten (Kurbatov: rundt 11 per poeng):")
for k, v in ord_tot.items():
    print(f"   {k:10} {v}")
for sid, liste in SETT.items():
    for ex in liste:
        deler = " / ".join(f"{p['label']} {p['points']}" for p in ex.get("parts", [])) or "verbal"
        print(f"{sid}:{ex['n']}  {ex['title']} ({ex['topic']}), {ex['points']} p: {deler}")

json.dump(SETT, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("skrev", UT, "og", UT_SVAR)
