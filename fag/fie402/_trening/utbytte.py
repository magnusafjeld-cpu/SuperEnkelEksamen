# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: utbyttepolitikk (tema «utbytte»).

   Skribent 2 (kapitalstruktur). Spesifikasjonen er docs/fie402-trening-spek.md.
   Kildene er forelesning 5 (MM-irrelevans, utbytte med nye aksjer, tilbakekjøp
   via likningssystemet, skatt, klienteller, kontanter, klebrig utbytte,
   timing), PS1 E10, E12 og E13, oppsummeringen (D8) og kjernepensum kj2.

   Familier (tallsvar):
     utb-rep1  aksjer kjøpt tilbake med overskuddskasse (PS1 E13b)
     utb-sys1  tilbakekjøp med årets kontantstrøm: P1 fra likningssystemet (forelesning 5 s. 13)
     utb-iss1  utbytte finansiert med nye aksjer: emisjonskursen (forelesning 5 s. 9–12, PS1 E12)
     utb-tim1  timing av tilbakekjøp med asymmetrisk informasjon (PS1 E10)
   Statiske: utb-s01 … utb-s22.
"""
from trening_lib import *  # noqa: F401,F403


def _p(x, d=2):
    return pst(x, d)


NAVN = ["Nordvik Media", "Askeland Retail", "Berge Instruments", "Haugland Foods", "Isdal Chemicals",
        "Kolstad Energy", "Lunde Logistics", "Mjøsa Paper", "Oterhals Bioscience", "Rognes Engineering"]


def _hel(x):
    return abs(x - round(x)) < 1e-9


def _dx(x, maks=4):
    """Desimalene et mellomtall trenger: 0 for heltall, ellers mellom 2 og maks."""
    if _hel(rund(x, maks)):
        return 0
    t = f"{rund(x, maks):.{maks}f}".rstrip("0")
    return max(2, len(t.split(".")[1]))


def _a(x, maks=4):
    return tall(x, _dx(x, maks))


def _m(x, val, d=None):
    return penger(x, _dx(x) if d is None else d, val) + NBSP + "million"


def _des(*verdier):
    """Felles desimaler for prisene i ett spørsmål: 2 når alle er hele i øre, ellers 4."""
    return 2 if all(abs(v * 100 - round(v * 100)) < 1e-7 for v in verdier) else 4


def _mn(x):
    return tall(x, 4) + NBSP + "million"


# ---------------------------------------------------------------------------
# utb-rep1 · Aksjer kjøpt tilbake med overskuddskasse (PS1 E13b)
# ---------------------------------------------------------------------------
@familie("utb-rep1", tema="utbytte", antall=5, tittel="Shares bought back with excess cash",
         hjelp=hjelp3(
             "This is payout under MM. A firm uses its excess cash to buy back shares instead of paying a "
             "dividend. You need the number of shares it buys.",
             "Cum-dividend price = cash per share + PV(future dividends per share). The buyback is at that price. "
             "Shares bought = cash / P<sub>cum</sub>.",
             "<p><b>Step 1: the value of the future.</b> The perpetuity of future dividends per share at "
             "r<sub>E</sub>.</p>"
             "<p><b>Step 2: the price today.</b> Add the cash per share: the shares carry it until it is paid "
             "out.</p>"
             "<p><b>Step 3: shares bought.</b> Divide the cash by that price.</p>"
             "<p><b>Watch out:</b> the price before any payout is the cum price, not the ex-dividend price.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N = r.choice([5, 8, 10, 20, 25])
    Pex = r.choice([16, 20, 24, 25, 30, 40, 50])
    rE = r.choice([0.08, 0.10, 0.12, 0.15])
    dpsf = Pex * rE
    if not _hel(dpsf * 100):
        raise Avvis("stygt utbytte")
    c = r.choice([1.00, 2.00, 2.50, 3.00, 4.00, 5.00])
    F_ = dpsf * N
    C = c * N
    Pcum = c + Pex
    n = C / Pcum

    f_ex = C / Pex                                         # kjøpt til ex-kursen
    f_igjen = N - n                                        # aksjene som er igjen
    f_dobbel = C / (Pcum + c)                              # kassen telt to ganger i kursen
    ulike(n, f_ex, f_igjen, f_dobbel, rel=0.02)

    q = (f"<p>{navn} has no debt and {N} million shares. It holds excess cash of {_m(C, val)}. From next year on it "
         f"will generate free cash flow of {_m(F_, val)} a year forever and pay all of it out as dividends. Its "
         f"equity cost of capital is {_p(rE, 0)}. Markets are perfect.</p>"
         f"<p>Instead of paying out the excess cash as a dividend today, the board uses it to buy back shares at "
         f"the market price today. How many shares does {navn} buy back, in millions?</p>")

    alternativer = [
        R(_mn(n), n),
        F(_mn(f_ex),
          f"Shares bought at {penger(Pex, 2, val)}, the value of the future dividends alone. That is the "
          f"ex-dividend price, but the buyback takes place before any payout.", f_ex),
        F(_mn(f_igjen),
          "This is the number of shares left after the buyback, not the number bought.", f_igjen),
        F(_mn(f_dobbel),
          f"Shares bought at {penger(Pcum + c, 2, val)}, with the cash per share counted twice in the "
          f"price.", f_dobbel),
    ]

    kort = (f"<p><b>{_mn(n)} shares.</b> P<sub>cum</sub> = {_a(c)} + {_a(dpsf)}/{_p(rE, 0)} = "
            f"{penger(Pcum, 2, val)}. Shares bought = {_a(C)}/{_a(Pcum)} = {tall(n, 4)} million.</p>")

    N1 = N - n
    ny_dps = F_ / N1
    full = (
        f"<p><b>Dividend or buyback.</b> In a perfect market the firm can hand out its cash either way and every "
        f"shareholder ends up equally rich (lecture 5, PS1 Exercise 13). With a dividend the price drops to the "
        f"ex-dividend price. With a buyback the price stays at the cum price and fewer shares share the future "
        f"dividends.</p>"
        f"<p><b>Step 1: the value of the future.</b> Future dividends per share: {_a(F_)}/{N} = {penger(dpsf, 2, val)} "
        f"a year forever, worth {_a(dpsf)}/{_p(rE, 0)} = {penger(Pex, 2, val)}.</p>"
        f"<p><b>Step 2: the price today.</b> Each share also carries {_a(C)}/{N} = {penger(c, 2, val)} of cash: "
        f"P<sub>cum</sub> = {_a(c)} + {_a(Pex)} = {penger(Pcum, 2, val)}.</p>"
        f"<p><b>Step 3: shares bought.</b> {_a(C)}/{_a(Pcum)} = <b>{tall(n, 4)} million</b>, leaving "
        f"{tall(N1, 4)} million.</p>"
        f"<p><b>First check.</b> The remaining shares share {_a(F_)} a year: {_a(F_)}/{tall(N1, 4)} = "
        f"{penger(ny_dps, 4, val)} per share, worth {penger(ny_dps, 4, val)}/{_p(rE, 0)} = "
        f"{penger(ny_dps / rE, 2, val)}, the cum price. This check can fail: shares bought at the wrong price "
        f"would not leave the price at {penger(Pcum, 2, val)}.</p>"
        f"<p><b>Remember:</b> a buyback before the payout happens at the cum price. The price does not move and "
        f"the future dividend per share rises.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet="million shares"))


# ---------------------------------------------------------------------------
# utb-sys1 · Tilbakekjøp med årets kontantstrøm: P1 fra likningssystemet (forelesning 5 s. 13)
# ---------------------------------------------------------------------------
@familie("utb-sys1", tema="utbytte", antall=5, tittel="A buyback instead of a dividend: two equations",
         hjelp=hjelp3(
             "This is the repurchase example from lecture 5. A firm uses the year's cash flow to buy back shares "
             "instead of paying a dividend. You need the number of shares it buys.",
             "Two equations in the year-end price P<sub>1</sub> and the shares bought N: N × P<sub>1</sub> = the "
             "cash spent. (N<sub>0</sub> − N) × P<sub>1</sub> = the value of the future dividends.",
             "<p><b>Step 1: the value of what is left.</b> At the end of the year the firm still owns all the "
             "future cash flows. Value them as a growing perpetuity.</p>"
             "<p><b>Step 2: the price.</b> Add the two equations: N<sub>0</sub> × P<sub>1</sub> = cash + future "
             "value.</p>"
             "<p><b>Step 3: the shares.</b> Divide the cash by P<sub>1</sub>.</p>"
             "<p><b>Watch out:</b> the shares are bought at the year-end price, which you solve for. It is neither "
             "today's price nor an ex-dividend price.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N0 = r.choice([1, 2, 4, 5, 10])
    rE = r.choice([0.08, 0.09, 0.10, 0.11, 0.12])
    g = r.choice([0.02, 0.03, 0.04])
    if rE - g < 0.05:
        raise Avvis("for liten r − g")
    P0 = r.choice([20, 25, 40, 50, 60, 80])
    V0 = P0 * N0
    F1 = V0 * (rE - g)
    P1 = P0 * (1 + rE)
    V1ex = F1 * (1 + g) / (rE - g)
    n = F1 / P1
    if n < 0.1:
        raise Avvis("for få aksjer til fire desimaler")

    f_p0 = F1 / P0                                         # kjøpt til dagens kurs
    f_ex = F1 / (P0 * (1 + g))                             # kjøpt til ex-kursen ved vanlig utbytte
    f_igjen = N0 - n                                       # aksjene som er igjen
    ulike(n, f_p0, f_ex, f_igjen, rel=0.02)

    q = (f"<p>{navn} has no debt and {N0} million shares trading at {penger(P0, 2, val)}. It will generate free "
         f"cash flow of {_m(F1, val)} at the end of this year, growing by {_p(g, 0)} a year forever after that. It "
         f"has always paid all of it out as dividends. Its equity cost of capital is {_p(rE, 0)}. Markets are "
         f"perfect.</p>"
         f"<p>This year only, the board will use the year-end cash flow to buy back shares at the market price "
         f"instead of paying a dividend. From next year it pays out everything as dividends again. How many shares "
         f"does it buy back at the end of this year, in millions?</p>")

    alternativer = [
        R(_mn(n), n),
        F(_mn(f_p0),
          f"Shares bought at today's price of {penger(P0, 2, val)}. A share that pays no dividend this year earns "
          f"its whole return as a rise in the price, so it costs more at the end of the year.", f_p0),
        F(_mn(f_ex),
          f"Shares bought at the usual ex-dividend price, {_a(P0)} × {tall(1 + g, 2)}. No dividend is paid this "
          f"year, so the price has no dividend to drop by.", f_ex),
        F(_mn(f_igjen),
          "This is the number of shares left after the buyback, not the number bought.", f_igjen),
    ]

    kort = (f"<p><b>{_mn(n)} shares.</b> {N0} × P<sub>1</sub> = {_a(F1)} + {_a(V1ex)}, so P<sub>1</sub> = "
            f"{penger(P1, 2, val)}. N = {_a(F1)}/{_a(P1)} = {tall(n, 4)} million.</p>")

    full = (
        f"<p><b>The idea.</b> A buyback is a payout to those who sell. In a perfect market it leaves the value of "
        f"the firm and today's price unchanged (lecture 5, slide 13). The firm buys at the year-end price. Since "
        f"no dividend is paid, that price includes the whole year's return.</p>"
        f"<p><b>Step 1: the value of what is left.</b> At the end of the year the dividends from next year on are "
        f"worth {_a(F1)} × {tall(1 + g, 2)}/({_p(rE, 0)} − {_p(g, 0)}) = {_m(V1ex, val)}.</p>"
        f"<p><b>Step 2: the two equations.</b> N × P<sub>1</sub> = {_a(F1)} and ({N0} − N) × P<sub>1</sub> = "
        f"{_a(V1ex)}. Add them: {N0} × P<sub>1</sub> = {_a(F1 + V1ex)}, so P<sub>1</sub> = "
        f"{penger(P1, 2, val)}.</p>"
        f"<p><b>Step 3: the shares.</b> N = {_a(F1)}/{_a(P1)} = <b>{tall(n, 4)} million</b>.</p>"
        f"<p><b>First check.</b> Today's price is next year's price discounted, since no dividend comes in between: "
        f"{_a(P1)}/{tall(1 + rE, 2)} = {penger(P1 / (1 + rE), 2, val)}, the price today. P<sub>1</sub> = "
        f"P<sub>0</sub>(1 + r<sub>E</sub>) is a short cut to step 2. This check can fail: a wrong P<sub>1</sub> "
        f"would not return today's price.</p>"
        f"<p><b>Remember:</b> a buyback in place of a dividend keeps the share on its cum-dividend path. The firm "
        f"buys at P<sub>0</sub>(1 + r<sub>E</sub>) and today's price does not move.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet="million shares"))


# ---------------------------------------------------------------------------
# utb-iss1 · Utbytte finansiert med nye aksjer: emisjonskursen (forelesning 5 s. 9–12, PS1 E12)
# ---------------------------------------------------------------------------
@familie("utb-iss1", tema="utbytte", antall=5, tittel="A dividend paid for with new shares",
         hjelp=hjelp3(
             "This is MM dividend irrelevance with a dividend raised above the free cash flow. The extra cash comes "
             "from new shares. You need the price at which the new shares are sold.",
             "The new shareholders pay a fair price for a claim on the future dividends. P<sub>1</sub> = (value of "
             "future dividends − cash raised) / old shares. New shares = cash raised / P<sub>1</sub>.",
             "<p><b>Step 1: the future.</b> Value the dividends from next year on, at the end of this year.</p>"
             "<p><b>Step 2: the new shareholders' claim.</b> They pay the extra cash and get a slice of that value "
             "worth exactly what they paid.</p>"
             "<p><b>Step 3: what is left for the old shares.</b> Divide by the old share count.</p>"
             "<p><b>Watch out:</b> the cash raised is paid straight out, so it does not stay in the firm. Count the "
             "dilution once.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N0 = r.choice([1, 2, 4, 5])
    rE = r.choice([0.08, 0.10, 0.12])
    g = r.choice([0.0, 0.02, 0.03, 0.05])
    if rE - g < 0.05:
        raise Avvis("for liten r − g")
    F1 = r.choice([1, 2, 3, 4])
    X = F1 * r.choice([0.5, 1.0, 1.5, 2.0, 3.0])
    if (N0, F1, g, rE, X) == (1, 1, 0.05, 0.10, 3.0):
        raise Avvis("Nilpoj-tallene fra PS1 E12")
    V1ex = F1 * (1 + g) / (rE - g)
    P1 = (V1ex - X) / N0
    nn = X / P1

    f_udil = V1ex / N0                                     # utvanningen glemt
    f_kasse = (V1ex + X) / N0                              # kassen blir værende
    f_dobbel = (V1ex - 2 * X) / N0                         # de nye eiernes krav trukket fra to ganger
    if f_dobbel <= 0:
        raise Avvis("negativ felle")
    ulike(P1, f_udil, f_kasse, f_dobbel, rel=0.02)
    dd = _des(P1, f_udil, f_kasse, f_dobbel)

    vekst = (f"growing by {_p(g, 0)} a year forever after that" if g > 0 else "the same amount every year forever")
    q = (f"<p>{navn} has no debt and {N0} million shares. It expects free cash flow of {_m(F1, val)} at the end of "
         f"this year, {vekst}. It pays all free cash flow out as dividends. Its equity cost of capital is "
         f"{_p(rE, 0)}. Markets are perfect.</p>"
         f"<p>The board announces that the dividend at the end of this year will be {_m(F1 + X, val)} instead. The "
         f"extra {_m(X, val)} is raised at the end of the year by selling new shares that do not carry the right to "
         f"this year's dividend. At what price per share are the new shares sold?</p>")

    alternativer = [
        R(penger(P1, dd, val), P1),
        F(penger(f_udil, dd, val),
          f"The ex-dividend price under the old policy, {_a(V1ex)}/{N0}. It ignores the new shareholders, who "
          f"will also share the future dividends.", f_udil),
        F(penger(f_kasse, dd, val),
          f"The {_a(X)} raised counted as staying in the firm. It is paid out at once as part of the dividend.",
          f_kasse),
        F(penger(f_dobbel, dd, val),
          f"The new investors' claim taken out twice: ({_a(V1ex)} − 2 × {_a(X)})/{N0}. Their money buys one "
          f"claim, not two.", f_dobbel),
    ]

    vekstfaktor = f" × {tall(1 + g, 2)}" if g > 0 else ""
    kort = (f"<p><b>{penger(P1, dd, val)}.</b> Future dividends at the end of the year: {_a(F1)}{vekstfaktor}/"
            f"({_p(rE, 0)} − {_p(g, 0)}) = {_a(V1ex)}. The new shareholders take {_a(X)} of it, leaving "
            f"{_a(V1ex - X)} for {N0} million old shares: {penger(P1, dd, val)}.</p>")

    dps1 = (F1 + X) / N0
    P0 = F1 / (rE - g) / N0
    full = (
        f"<p><b>Why the extra dividend is worth nothing.</b> With investment fixed, a higher dividend must be "
        f"paid for by new financing. The new shareholders pay a fair price, so they take a slice of the future "
        f"worth exactly what they paid. The old shareholders get more cash now and less later. In a perfect "
        f"market the two cancel (lecture 5, slides 9 to 12, PS1 Exercise 12).</p>"
        f"<p><b>Step 1: the future.</b> At the end of the year the dividends from next year on are worth "
        f"{_a(F1)}{vekstfaktor}/({_p(rE, 0)} − {_p(g, 0)}) = {_m(V1ex, val)} in total.</p>"
        f"<p><b>Step 2: the new shareholders' claim.</b> They pay {_a(X)} and receive a claim worth {_a(X)} on "
        f"that value.</p>"
        f"<p><b>Step 3: the old shares.</b> ({_a(V1ex)} − {_a(X)})/{N0} = <b>{penger(P1, dd, val)}</b>. The firm "
        f"sells {_a(X)}/{_a(P1)} = {tall(nn, 4)} million new shares at that price.</p>"
        f"<p><b>First check.</b> Today's price must be unchanged. The old shares get {_a(F1 + X)}/{N0} = "
        f"{penger(dps1, 4, val)} at the end of the year and are then worth {penger(P1, 4, val)}: "
        f"({_a(dps1)} + {_a(P1)})/{tall(1 + rE, 2)} = {penger((dps1 + P1) / (1 + rE), 4, val)}, the same as "
        f"{_a(F1)}/({_p(rE, 0)} − {_p(g, 0)})/{N0} = {penger(P0, 4, val)} under the old policy. This check can fail: "
        f"a wrong P<sub>1</sub> would move today's price.</p>"
        f"<p><b>Remember:</b> a dividend financed by new shares moves value from later to now. P<sub>0</sub> does "
        f"not change.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} per share"))


# ---------------------------------------------------------------------------
# utb-tim1 · Timing av tilbakekjøp med asymmetrisk informasjon (PS1 E10, forelesning 5 s. 24)
# ---------------------------------------------------------------------------
@familie("utb-tim1", tema="utbytte", antall=5, tittel="Timing a buyback around news",
         hjelp=hjelp3(
             "This is the timing of a buyback when news is coming. The firm buys back shares before the market "
             "learns the news. You need the share price after the news.",
             "Before the news: P<sub>0</sub> = (enterprise value + cash) / N, shares bought = cash / P<sub>0</sub>. "
             "After the news the remaining shares own the new enterprise value and no cash.",
             "<p><b>Step 1: the price before the news.</b> The shares own the business and the cash.</p>"
             "<p><b>Step 2: the buyback.</b> The cash buys shares at that price.</p>"
             "<p><b>Step 3: after the news.</b> Divide the new enterprise value by the shares left.</p>"
             "<p><b>Watch out:</b> the cash is gone after the buyback, so it is not in the value any more.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    EV0 = r.choice([300, 400, 500, 600, 800])
    C = r.choice([50, 100, 150, 200])
    if C / EV0 > 0.3:
        raise Avvis("for mye kontanter")
    N = r.choice([5, 10, 20, 25])
    opp = EV0 * r.choice([1.25, 1.5])
    ned = EV0 * r.choice([0.5, 0.75])
    god = r.random() < 0.5
    EVs = opp if god else ned
    P0 = (EV0 + C) / N
    n = C / P0
    P = EVs / (N - n)

    f_etter = (EVs + C) / N                                # ventet til etter nyheten
    f_ukasse = EVs / N                                     # kassen glemt, ingen tilbakekjøp
    f_dobbel = (EVs + C) / (N - n)                         # kassen telt to ganger
    ulike(P, f_etter, f_ukasse, f_dobbel, rel=0.02)
    dd = _des(P, f_etter, f_ukasse, f_dobbel)

    nyhet = "good: the enterprise value rises" if god else "bad: the enterprise value falls"
    q = (f"<p>{navn} has an enterprise value of {_m(EV0, val)}, excess cash of {_m(C, val)}, no debt and {N} "
         f"million shares. It will use all of the cash to buy back shares at the market price. Shortly after, news "
         f"will come out that changes the enterprise value to either {_m(opp, val)} or {_m(ned, val)}.</p>"
         f"<p>The firm buys back the shares before the news comes out. The news turns out to be {nyhet}. What is "
         f"the share price after the news?</p>")

    alternativer = [
        R(penger(P, dd, val), P),
        F(penger(f_etter, dd, val),
          f"This is the price if the firm waits and buys back after the news: ({_a(EVs)} + {_a(C)})/{N}. Here the "
          f"buyback happened first.", f_etter),
        F(penger(f_ukasse, dd, val),
          f"The new enterprise value over the old share count, {_a(EVs)}/{N}. The buyback has retired some "
          f"shares with the cash.", f_ukasse),
        F(penger(f_dobbel, dd, val),
          "The cash counted twice: still in the firm's value although it was spent on the shares retired.",
          f_dobbel),
    ]

    kort = (f"<p><b>{penger(P, dd, val)}.</b> P<sub>0</sub> = ({_a(EV0)} + {_a(C)})/{N} = {penger(P0, 2, val)}. "
            f"Shares bought = {_a(C)}/{_a(P0)} = {tall(n, 4)} million. After the news: {_a(EVs)}/{tall(N - n, 4)} = "
            f"{penger(P, dd, val)}.</p>")

    vinner = ("the shareholders who kept their shares gain at the expense of those who sold before the good news"
              if god else "the shareholders who sold before the bad news gain at the expense of those who kept "
                          "their shares")
    full = (
        f"<p><b>Why timing matters.</b> A buyback at the market price is fair only to the extent that the price "
        f"reflects what managers know. If they buy before news the market has not seen, value moves between the "
        f"shareholders who sell and those who stay (PS1 Exercise 10, lecture 5, slide 24).</p>"
        f"<p><b>Step 1: before the news.</b> The shares own the business and the cash: P<sub>0</sub> = "
        f"({_a(EV0)} + {_a(C)})/{N} = {penger(P0, 2, val)}.</p>"
        f"<p><b>Step 2: the buyback.</b> {_a(C)}/{_a(P0)} = {tall(n, 4)} million shares, leaving "
        f"{tall(N - n, 4)} million. The cash is gone.</p>"
        f"<p><b>Step 3: after the news.</b> The enterprise value is {_a(EVs)}: {_a(EVs)}/{tall(N - n, 4)} = "
        f"<b>{penger(P, dd, val)}</b>. Had the firm waited, the price would be ({_a(EVs)} + {_a(C)})/{N} = "
        f"{penger(f_etter, 2, val)}.</p>"
        f"<p><b>First check.</b> The shareholders as a group get the same either way: {tall(N - n, 4)} × "
        f"{_a(P)} + {_a(C)} paid to the sellers = {_a((N - n) * P + C)} = {_a(EVs)} + {_a(C)}. The price was "
        f"computed from the same numbers, so this is an identity that catches arithmetic slips only. What it "
        f"shows is that only the split changes: {vinner}.</p>"
        f"<p><b>Remember:</b> managers who know more buy back before good news and after bad news. That is why "
        f"the market reads a buyback as a sign that the shares are cheap.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} per share"))


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

# utb-s01 · MM-irrelevansen for utbytte (forelesning 5 s. 8)
statisk(
    "utb-s01", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is the benchmark for payout policy: what MM says about dividends and buybacks in a perfect market.",
        "The sources-and-uses identity: internal funds + new funds = investment + payout. In a perfect "
        "market new securities sell at fair prices.",
        "<p><b>Step 1: fix investment.</b> If the projects do not change, where does a larger payout come from?</p>"
        "<p><b>Step 2: price the financing.</b> In a perfect market new securities sell at fair prices.</p>"
        "<p><b>Step 3: test each statement.</b> Does it hold investment fixed, or does it smuggle in a "
        "friction?</p>",
    ),
    q="<p>Which statement is the MM dividend irrelevance proposition?</p>",
    alternativer=[
        R("Holding investment fixed, payout policy does not change today's share price in a perfect market"),
        F("A higher dividend raises the price, because investors value cash now above uncertain future gains",
          "This is the bird-in-the-hand argument. With investment fixed, a higher dividend today means less later "
          "or new shares sold. The present value is the same."),
        F("A buyback raises the price, because fewer shares are left to share the earnings",
          "Fewer shares share the earnings, but the firm paid fair value for the shares it retired. The price per "
          "share does not move."),
        F("Payout is irrelevant only for firms that have no profitable projects to fund",
          "The proposition holds investment fixed, whatever it is. Profitable projects get funded either way. "
          "Payout only changes how they are financed."),
    ],
    kort="<p><b>Payout policy is irrelevant, holding investment fixed.</b> A larger payout must come from new "
         "securities or less cash kept. In a perfect market those are zero-NPV (lecture 5, slide 8).</p>",
    full="<p><b>The proposition.</b> In a perfect capital market, holding the firm's investment policy fixed, the "
         "choice of dividend policy does not affect the initial share price (lecture 5, slide 8).</p>"
         "<p><b>Step 1: the identity.</b> Every period, internal funds + new funds = investment + payout. With "
         "investment fixed, paying out more means raising more or keeping less cash.</p>"
         "<p><b>Step 2: why that is worth nothing.</b> New shares or debt are sold at fair prices, so they are "
         "zero-NPV. Cash kept in the firm earns its fair return. Shifting cash between today and later at fair "
         "terms leaves the present value unchanged.</p>"
         "<p><b>Step 3: the lecture example.</b> A firm earns 1M a year forever at 10% and has 100 000 shares at "
         "100. Raising next year's dividend from 10 to 15 per share with 0.5M of new shares gives P<sub>1</sub> = "
         "95 and P<sub>0</sub> = (95 + 15)/1.1 = 100. A buyback instead gives P<sub>1</sub> = 110 and P<sub>0</sub> "
         "= 110/1.1 = 100.</p>"
         "<p><b>Remember:</b> in a perfect market payout policy is irrelevant. To make it matter you need a "
         "friction: taxes, signals, agency costs or issue costs.</p>",
)

# utb-s02 · Hjemmelaget tilbakekjøp: reinvester utbyttet (kj2)
statisk(
    "utb-s02", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is a homemade buyback: an investor who wants no cash reinvests a dividend in the same shares.",
        "Under MM the price falls by the dividend on the ex-date: P<sub>ex</sub> = P<sub>cum</sub> − Div. Shares "
        "bought = cash received / P<sub>ex</sub>.",
        "<p><b>Step 1: the cash.</b> Shares held times the dividend per share.</p>"
        "<p><b>Step 2: the price you pay.</b> You buy after the ex-date, so the share no longer carries the "
        "dividend.</p>"
        "<p><b>Step 3: divide.</b> The answer is the number bought, not the new holding.</p>",
    ),
    q="<p>A share trades at NOK 40 the day before it goes ex-dividend on a dividend of NOK 2. Markets are perfect. "
      "You own 2 000 shares and want no cash, so you reinvest the whole dividend in the same shares right after "
      "the ex-date.</p>"
      "<p>How many shares do you buy?</p>",
    alternativer=[
        R("105.2632 shares", 4000 / 38),
        F("100.0000 shares",
          "Bought at the cum-dividend price of NOK 40. After the ex-date the share costs less, because it no longer "
          "carries the dividend.", 100.0),
        F("95.2381 shares",
          "Bought at NOK 42, the cum price plus the dividend. On the ex-date the price falls by the dividend, it "
          "does not rise.", 4000 / 42),
        F("2 105.2632 shares",
          "This is your holding after reinvesting, not the number of shares you buy.", 2000 + 4000 / 38),
    ],
    kort="<p><b>105.2632 shares.</b> Cash 2 000 × 2 = NOK 4 000. The ex price is 40 − 2 = 38. 4 000/38 = "
         "105.2632.</p>",
    full="<p><b>Why this matters.</b> Under MM an investor can undo any payout policy. A dividend she did not want "
         "can be turned into the equivalent of a buyback by reinvesting it. So she will not pay more for a firm "
         "because of the way it pays out.</p>"
         "<p><b>Step 1: the cash.</b> 2 000 shares × NOK 2 = NOK 4 000.</p>"
         "<p><b>Step 2: the price.</b> The share goes ex-dividend and falls by the dividend: 40 − 2 = NOK 38.</p>"
         "<p><b>Step 3: shares bought.</b> 4 000/38 = <b>105.2632</b>, so she ends with 2 105.2632 shares.</p>"
         "<p><b>First check.</b> Her wealth after reinvesting: 2 105.2632 × 38 = NOK 80 000, the same as 2 000 × 40 "
         "before. This check can fail: bought at NOK 40, the holding would be worth only 2 100 × 38 = 79 800.</p>"
         "<p><b>Remember:</b> reinvest a dividend at the ex price, sell shares at the cum price to make a dividend "
         "yourself. Either way your wealth is unchanged.</p>",
    tall=tallsvar(enhet="shares"),
)

# utb-s03 · Hjemmelaget utbytte (PS1 E13, kj2)
statisk(
    "utb-s03", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is a homemade dividend: an investor who wants cash from a firm that buys back shares instead of "
        "paying a dividend.",
        "Under a dividend she ends with her shares at the ex-dividend price plus cash. Under a buyback the price "
        "stays at the cum-dividend level. Compare the two positions: cash, shares and risk.",
        "<p><b>Step 1: the dividend world.</b> What does she hold after the ex-date?</p>"
        "<p><b>Step 2: the buyback world.</b> What is each share worth? Who gets cash?</p>"
        "<p><b>Step 3: copy the dividend world.</b> Which trade leaves her with the same cash and the same value "
        "in shares?</p>"
        "<p><b>Watch out:</b> the same total wealth is not enough. Her mix of cash, shares and debt must match "
        "too.</p>",
    ),
    q="<p>A firm in a perfect market stops its dividend and uses the same cash to buy back shares at the market "
      "price. One shareholder relied on the dividend for her spending.</p>"
      "<p>What should she do to get the same cash and end up exactly where the dividend would have left her?</p>",
    alternativer=[
        R("Sell shares worth the dividend she would have received"),
        F("Hold her shares: the buyback pays her the cash she would have had",
          "Only those who sell into the buyback receive cash. A holder who tenders nothing gets none."),
        F("Borrow the dividend's amount against her shares and keep them all",
          "She gets the cash and her wealth is the same, but she now holds more shares and a loan. Her position "
          "is riskier than the one the dividend would have left her with."),
        F("Buy more shares, since the buyback has lifted the price per share",
          "A fair buyback leaves the price where it was. Buying shares also takes cash from her rather than "
          "giving it."),
    ],
    kort="<p><b>Sell shares worth the dividend.</b> The buyback leaves the price at its cum level. Selling a "
         "slice of her holding at that price gives her the dividend's cash and the same value in shares as the "
         "ex-dividend holding: a homemade dividend.</p>",
    full="<p><b>Why the payout form does not matter.</b> Investors can create the payout they want on their own. "
         "That is half of the MM payout argument: a firm cannot add value by choosing the form of payout "
         "investors prefer, because they can make it themselves.</p>"
         "<p><b>Step 1: the dividend world.</b> She owns 1 000 shares at NOK 50. The firm would have paid NOK 2 "
         "per share. She would end with 1 000 shares at 48, worth NOK 48 000, plus NOK 2 000 in cash.</p>"
         "<p><b>Step 2: the buyback world.</b> The price stays at NOK 50. She sells 2 000/50 = 40 shares and has "
         "NOK 2 000 in cash plus 960 × 50 = NOK 48 000 in shares: the same cash and the same value in shares.</p>"
         "<p><b>Step 3: why not borrow.</b> Borrowing NOK 2 000 against her shares gives the cash. Her wealth is "
         "also NOK 50 000. But she now holds NOK 50 000 in shares and a NOK 2 000 loan, a riskier position than "
         "the dividend would leave her with.</p>"
         "<p><b>First check.</b> Cash plus shares is NOK 50 000 in both worlds. This can fail: if she sold at the "
         "ex-dividend price of 48, she would need 41.67 shares and end with less.</p>"
         "<p><b>Remember:</b> sell shares to make a dividend, reinvest a dividend to make a buyback.</p>",
)

# utb-s04 · Utbyttekutt som signal (forelesning 5 s. 21–22)
statisk(
    "utb-s04", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is dividend signalling: what a cut in a long-stable dividend tells the market.",
        "Signalling: managers know more than investors, so investors read each payout decision for what it "
        "says about future cash flows. How managers normally set dividends decides what a change can reveal.",
        "<p><b>Step 1: how dividends are set.</b> Are they reset every year or kept steady?</p>"
        "<p><b>Step 2: what a cut implies.</b> When would a manager who smooths cut?</p>"
        "<p><b>Step 3: test the other stories.</b> Does the cash kept change value under MM? Do taxes favour "
        "dividends?</p>",
    ),
    q="<p>A firm that has paid a stable, slowly rising dividend for twenty years cuts it in half. Its share price "
      "falls by 10% on the news.</p>"
      "<p>What is the signalling explanation?</p>",
    alternativer=[
        R("Managers cut a smoothed dividend only when they expect a lasting fall in earnings"),
        F("The cash kept inside the firm is worth less to shareholders than cash paid out",
          "Under MM the cash kept is worth the same inside the firm. The price fell because of what the cut "
          "reveals, not because the cash stayed."),
        F("Dividends are taxed more lightly than gains, so the cut costs shareholders a tax benefit",
          "Dividends are not taxed more lightly than gains: the rates are equal today in the US and Norway. "
          "Dividends used to be taxed more. A cut costs no tax benefit."),
        F("A lower dividend raises the cost of equity, which pushes the share price down",
          "The payout does not change the risk of the firm's assets, so r<sub>E</sub> does not move. The fall "
          "comes from news about future cash flows."),
    ],
    kort="<p><b>The cut reveals bad news.</b> Dividends are smoothed and sticky, so managers cut only when they "
         "expect lower cash flows for a long time. The market reads the cut as that forecast.</p>",
    full="<p><b>The signal.</b> Managers know more about future earnings than investors do. Because they smooth "
         "dividends and treat them as a commitment, a change in the dividend tells investors what managers "
         "expect (lecture 5, slides 21 and 22).</p>"
         "<p><b>Step 1: how dividends are set.</b> Firms keep long-run payout targets and adjust slowly. A "
         "dividend raised is hard to reverse.</p>"
         "<p><b>Step 2: what a cut says.</b> A manager who smooths cuts only when he cannot sustain the old level. "
         "So a cut is a forecast that earnings will stay low. The price falls by the value of that news.</p>"
         "<p><b>Step 3: the other stories.</b> The cash kept is not lost: under MM it is worth the same in the "
         "firm. Taxes, if anything, favour lower dividends. The cost of equity depends on the assets, not on the "
         "payout.</p>"
         "<p><b>Exam angle.</b> «Stopping a dividend to buy back shares instead» changes nothing under MM, but in "
         "practice it risks the same bad signal, which is why firms rarely do it.</p>"
         "<p><b>Remember:</b> dividend increases are good news, cuts are very bad news, because dividends are "
         "sticky.</p>",
)

# utb-s05 · Klebrig utbytte: GM (forelesning 5 s. 22–23, D8)
statisk(
    "utb-s05", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is about how firms set dividends over time compared with how their earnings move.",
        "A firm with a long-run target payout ratio can pay that share of earnings every year or move towards it "
        "gradually. Compare how much EPS and DPS move in the figure.",
        "<p><b>Step 1: earnings.</b> How much do a firm's earnings swing from year to year?</p>"
        "<p><b>Step 2: dividends.</b> Do managers pass those swings on, or absorb them?</p>"
        "<p><b>Step 3: commitment.</b> What does a raised dividend promise?</p>"
        "<p><b>Watch out:</b> a long-run target payout ratio is not the same as paying a fixed share of each "
        "year's earnings.</p>",
    ),
    q="<p>Lecture 5 plots General Motors' dividends per share against its earnings per share from 1985 to "
      "2008.</p>"
      "<p>Which pattern is typical of dividend policy?</p>",
    alternativer=[
        R("Dividends move much less than earnings and are rarely cut"),
        F("Dividends follow earnings closely, as a fixed payout ratio would",
          "Firms have long-run target payout ratios, but they smooth the dividend around them. Earnings swing far "
          "more than dividends."),
        F("Dividends move more than earnings, as windfalls are paid out at once",
          "In the figure earnings swing far more than dividends. Managers treat a dividend as a commitment, so "
          "they do not pass windfalls straight on."),
        F("Dividends are reset each year with no regard to their past level",
          "Dividends are sticky. Raising one is a commitment the firm is expected to keep."),
    ],
    kort="<p><b>Dividends move much less than earnings and are rarely cut.</b> Managers raise them slowly, avoid "
         "cuts and treat a higher dividend as a commitment. That is why a cut is very bad news (lecture 5, slides "
         "21 to 23).</p>",
    full="<p><b>What the GM picture shows.</b> Earnings per share swing widely from year to year, with large losses "
         "in some years. Dividends per share move in slow steps and stay flat through many bad years. Lecture 5 "
         "calls dividend policy «very sticky».</p>"
         "<p><b>Step 1: why smooth?</b> A dividend increase or initiation is a commitment to pay out cash in the "
         "future. Managers raise it only when they are confident they can keep it up.</p>"
         "<p><b>Step 2: why avoid cuts?</b> Because investors know dividends are smoothed, a cut signals that "
         "managers expect lasting trouble. Managers avoid that signal unless forced.</p>"
         "<p><b>Step 3: the contrast with buybacks.</b> Buybacks are flexible. A firm can skip a buyback "
         "programme without the same penalty, which is one reason buybacks have grown since the 1980s.</p>"
         "<p><b>Exam angle.</b> The wrap-up lecture names sticky dividends (the GM example) as part of a likely "
         "theory question on the four uses of free cash flow.</p>"
         "<p><b>Remember:</b> dividends are sticky, buybacks are flexible.</p>",
)

# utb-s06 · Tilbakekjøp som signal (forelesning 5 s. 24, forelesning 4 s. 27)
statisk(
    "utb-s06", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is about why a buyback announcement moves the share price when markets are not perfect.",
        "A buyback at the market price is a fair trade only if the price reflects what managers know. In a "
        "perfect market a fair buyback leaves the share price unchanged.",
        "<p><b>Step 1: who knows more.</b> Managers or investors?</p>"
        "<p><b>Step 2: when managers buy.</b> When does a buyback help the shareholders who stay?</p>"
        "<p><b>Step 3: test the other stories.</b> EPS, premiums and taxes: which of them survives?</p>"
        "<p><b>Watch out:</b> an explanation that would also hold in a perfect market cannot explain a price reaction.</p>",
    ),
    q="<p>Share prices tend to rise when a firm announces a buyback programme.</p>"
      "<p>Which explanation fits the course?</p>",
    alternativer=[
        R("Managers know more and tend to buy back when they think the shares are cheap"),
        F("Fewer shares raise EPS, which pushes the share price up",
          "That is the EPS fallacy. A fair buyback leaves the price unchanged in a perfect market. EPS rises "
          "because the shares are riskier."),
        F("The firm pays a premium over the market price, which the shareholders gain",
          "A premium paid to the sellers comes out of the firm's cash, so it costs the shareholders who stay. It "
          "is a transfer, not a gain to the shareholders as a group."),
        F("Buybacks save tax compared with dividends, which the market prices in",
          "The saving depends on the rates. In the US in 2024 dividends and gains were taxed alike, yet prices "
          "still rise on buyback news. The course reads that reaction as a signal."),
    ],
    kort="<p><b>The undervaluation signal.</b> Managers buy back when they believe the shares are cheap, so the "
         "announcement tells the market they are (lecture 5, slide 24, PS1 Exercise 10).</p>",
    full="<p><b>The mechanism.</b> A buyback at the market price is fair only if the price reflects what managers "
         "know. Managers who know the shares are undervalued can transfer value to the shareholders who stay by "
         "buying from those who sell. Investors know this, so they read a buyback as a sign of "
         "undervaluation.</p>"
         "<p><b>Step 1: the evidence.</b> Event studies show positive price reactions to leverage increases, "
         "buybacks and dividend increases (lecture 4, slide 27).</p>"
         "<p><b>Step 2: timing.</b> In PS1 Exercise 10 managers who expect good news buy back before it comes out "
         "and those who expect bad news wait. That is exactly why the market reads a buyback as good news.</p>"
         "<p><b>Step 3: the weaker signal.</b> An open-market programme commits to nothing, so it is a weaker "
         "signal than a dividend increase or a fixed-price tender offer.</p>"
         "<p><b>Remember:</b> a buyback signals undervaluation. EPS, premiums and taxes do not explain the "
         "reaction in a perfect market.</p>",
)

# utb-s07 · Klienteller (forelesning 5 s. 18, A10)
statisk(
    "utb-s07", tema="utbytte", type="fakta",
    hjelp=hjelp3(
        "This is the clientele effect: which kinds of investors prefer dividends and which prefer buybacks.",
        "Preferences follow effective tax rates, which differ by income, jurisdiction, horizon and account type. "
        "Firms can choose a payout policy to attract a clientele.",
        "<p><b>Step 1: individuals.</b> How are their dividends taxed compared with their gains?</p>"
        "<p><b>Step 2: corporations.</b> Do they pay much tax on dividends they receive from other firms?</p>"
        "<p><b>Step 3: institutions.</b> Pension funds and the like often pay no tax at all.</p>",
    ),
    q="<p>Investors face different taxes on dividends and on capital gains, so they prefer different payout "
      "policies.</p>"
      "<p>According to lecture 5, which pattern is typical?</p>",
    alternativer=[
        R("Individuals prefer buybacks, corporations prefer dividends, institutions are indifferent"),
        F("Individuals prefer dividends, corporations prefer buybacks, institutions are indifferent",
          "Individuals and corporations are swapped. Individuals pay more tax on dividends than on gains. Many "
          "corporations pay little tax on dividends they receive."),
        F("Individuals and corporations prefer buybacks, while institutions prefer dividends",
          "Corporations often pay little tax on dividends received, so they lean to dividends. Tax-exempt "
          "institutions are indifferent."),
        F("Individuals prefer buybacks, corporations are indifferent, institutions prefer dividends",
          "Corporations often pay little tax on dividends received, so they lean to dividends. Tax-exempt "
          "institutions pay no tax either way and are indifferent."),
    ],
    kort="<p><b>Individuals: buybacks. Corporations: dividends. Institutions: indifferent.</b> Firms can pick a "
         "payout policy to attract one of these clienteles (lecture 5, slide 18).</p>",
    full="<p><b>Why clienteles form.</b> The tax cost of a dividend relative to a capital gain differs across "
         "investors: by income, tax jurisdiction, investment horizon and type of account. Each group gravitates "
         "to firms whose payout suits it (lecture 5, slide 18).</p>"
         "<p><b>Step 1: individuals.</b> They used to pay more tax on dividends than on gains. Today the rates are "
         "equal in the US and Norway, but they can still defer gains by not selling. They prefer buybacks.</p>"
         "<p><b>Step 2: corporations.</b> A firm holding shares in another firm is often taxed lightly on "
         "dividends received. It prefers dividends.</p>"
         "<p><b>Step 3: institutions.</b> Pension funds and other tax-exempt holders pay no tax either way and "
         "are indifferent.</p>"
         "<p><b>What follows.</b> Once each clientele holds the firms that suit it, the marginal investor is "
         "indifferent. A firm cannot raise its value by switching policy to serve a clientele that is already "
         "served.</p>"
         "<p><b>Remember:</b> individuals prefer buybacks, corporations dividends, institutions are "
         "indifferent.</p>",
)

# utb-s08 · Skatteulempen ved utbytte (forelesning 5 s. 15)
statisk(
    "utb-s08", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is the tax side of payout policy: which route hands the tax authority less when dividends are "
        "taxed more than gains.",
        "Tax on a dividend = τ<sub>d</sub> × the amount received. Tax on a sale = τ<sub>g</sub> × (price − "
        "purchase price), paid only when the gain is realised.",
        "<p><b>Step 1: who pays tax.</b> All holders, or only some?</p>"
        "<p><b>Step 2: on what.</b> The whole payment, or only the gain over the purchase price?</p>"
        "<p><b>Step 3: at which rate.</b> Then compare.</p>"
        "<p><b>Watch out:</b> holding the cash is not a tax shelter. The ex-date drop does not undo the tax either.</p>",
    ),
    q="<p>In a country where dividends are taxed at a higher rate than capital gains, a firm wants to pay out its "
      "excess cash. Ignore signalling.</p>"
      "<p>What should it do?</p>",
    alternativer=[
        R("Buy back shares: only sellers pay tax, only on their gains, at the lower rate"),
        F("Pay a dividend: a dividend is taxed once, while a buyback is taxed twice",
          "A buyback is taxed only through the capital gains of those who sell. Nothing is taxed twice."),
        F("Keep the cash: cash held inside the firm escapes personal tax for good",
          "Lecture 5 lists no tax advantage from holding cash. The cash is taxed when it is paid out. In the "
          "meantime its interest is taxed in the firm."),
        F("It does not matter: the ex-dividend drop offsets the tax on the dividend",
          "With a higher dividend tax the price drops by less than the dividend. The gap is value lost to tax."),
    ],
    kort="<p><b>Buy back shares.</b> A buyback is taxed only through the sellers' gains at τ<sub>g</sub>. A "
         "dividend is taxed in full for every holder at τ<sub>d</sub>. If dividends are taxed more, firms gain by "
         "repurchasing (lecture 5, slide 15).</p>",
    full="<p><b>The tax disadvantage of dividends.</b> Shareholders pay tax on dividends when received and on "
         "capital gains when they sell. Dividends used to be taxed more. Today the rates are equal in the US and "
         "Norway (Kurbatov, lecture 5). Gains can also be deferred. So with τ<sub>d</sub> above τ<sub>g</sub>, paying out through buybacks saves tax and "
         "raises firm value (lecture 5, slide 15).</p>"
         "<p><b>Step 1: who pays.</b> A dividend reaches every holder and is taxed for all of them. A buyback "
         "reaches only those who choose to sell.</p>"
         "<p><b>Step 2: on what.</b> The dividend is taxed in full. The seller in a buyback is taxed only on the "
         "price minus what she paid for the share.</p>"
         "<p><b>Step 3: when.</b> Holders who do not sell pay nothing now, so the tax on their gains is "
         "deferred.</p>"
         "<p><b>Caution.</b> Check the rates. In the US in 2024 dividends and long-term gains were taxed at the "
         "same rates. In Norway the effective rate on dividends is 37.84%. Gains are taxed the same way.</p>"
         "<p><b>Remember:</b> lower rate, smaller base, later payment: three tax reasons for buybacks. Where the "
         "rates are equal, deferral is the edge that remains.</p>",
)

# utb-s10 · Effektiv utbytteskatt i Norge (forelesning 5 s. 15, B14)
statisk(
    "utb-s10", tema="utbytte", type="fakta",
    hjelp=hjelp3(
        "This is the effective Norwegian tax rate on dividends to a personal shareholder, which lecture 5 quotes.",
        "Effective rate = nominal rate × gross-up factor, applied to the dividend above the risk-free allowance.",
        "<p><b>Step 1: the base.</b> The dividend is multiplied by the gross-up factor.</p>"
        "<p><b>Step 2: the tax.</b> The nominal rate on that base.</p>"
        "<p><b>Step 3: per krone of dividend.</b> Divide by the dividend, which is the same as multiplying the "
        "rate by the factor.</p>",
    ),
    q="<p>A Norwegian personal shareholder receives a dividend above her risk-free allowance. The dividend is "
      "multiplied by 1.72 and the result is taxed at 22%.</p>"
      "<p>What is the effective tax rate on the dividend?</p>",
    alternativer=[
        R("37.84%", 0.22 * 1.72),
        F("22.00%",
          "The nominal rate without the gross-up. The taxable amount is 1.72 times the dividend.", 0.22),
        F("51.52%",
          "This stacks the 22% corporate tax on top: it is the combined rate on the firm's pre-tax profit, not the "
          "shareholder's tax on the dividend.", 0.22 + 0.78 * 0.22 * 1.72),
        F("39.16%",
          "22% applied twice in a row, 1 − 0.78 × 0.78. The gross-up enlarges the base once. It is not a second "
          "tax.", 1 - 0.78 * 0.78),
    ],
    kort="<p><b>37.84%.</b> 0.22 × 1.72 = 0.3784 per krone of dividend (lecture 5, slide 15).</p>",
    full="<p><b>The Norwegian rule.</b> A personal shareholder pays tax on dividends above a risk-free allowance. "
         "The taxable amount is the dividend times 1.72, taxed at the ordinary 22%. Per krone of dividend that is "
         "0.22 × 1.72 = <b>37.84%</b>, the figure in lecture 5.</p>"
         "<p><b>Step 1: the base.</b> NOK 100 of dividend gives a taxable amount of 172.</p>"
         "<p><b>Step 2: the tax.</b> 22% of 172 = NOK 37.84.</p>"
         "<p><b>Step 3: the rate.</b> 37.84/100 = 37.84%.</p>"
         "<p><b>Why it matters for payout.</b> Realised gains are taxed by the same rule, so in Norway "
         "τ<sub>d</sub> = τ<sub>g</sub>. What remains of the buyback's tax advantage is "
         "the smaller base (only the gain is taxed) and the deferral for those who do not sell.</p>"
         "<p><b>Remember:</b> 22% × 1.72 = 37.84% on the shareholder. Stacked on the 22% corporate tax the "
         "combined rate is 51.52%, which is a different number for a different question.</p>",
    tall=tallsvar(skala=100, enhet="%"),
)

# utb-s11 · Fire måter å bruke fri kontantstrøm (D8)
statisk(
    "utb-s11", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is the likely theory question from the wrap-up lecture: the four uses of free cash flow and which "
        "one destroys value in practice.",
        "Under MM all four uses are worth the same. In practice look for the friction each one carries: "
        "taxes, signals, issue costs or the conflict between managers and shareholders.",
        "<p><b>Step 1: the benchmark.</b> Under MM none of the four creates or destroys value.</p>"
        "<p><b>Step 2: the friction.</b> Who decides how the cash is used? In whose interest?</p>"
        "<p><b>Step 3: test each use.</b> Which one, without good projects, is spent on growth for its own "
        "sake?</p>",
    ),
    q="<p>A mature firm generates free cash flow beyond what its positive-NPV projects need. It can pay a "
      "dividend, buy back shares, hold the cash or reinvest it. Under MM all four are worth the same.</p>"
      "<p>Which one most often destroys value in practice?</p>",
    alternativer=[
        R("Reinvesting it, which without positive-NPV projects means empire building"),
        F("Holding it as cash, since cash earns less than the cost of equity",
          "Cash earns a return fit for its low risk, so holding it is zero-NPV in itself. The danger is what "
          "managers may do with it."),
        F("Paying a dividend, since the share price falls on the ex-date",
          "The price falls by exactly the dividend, so the shareholders' wealth is unchanged."),
        F("Buying back shares, since the firm hands its equity back to investors",
          "A buyback at a fair price is zero-NPV. It may even signal that the shares are cheap."),
    ],
    kort="<p><b>Reinvesting without good projects.</b> Spare cash tempts managers to grow the firm for its own "
         "sake (Jensen, lecture 4). Paying it out, or borrowing so that it must be paid out, removes the "
         "temptation.</p>",
    full="<p><b>The four uses.</b> The wrap-up lecture lists them: pay a dividend, buy back shares, hold the cash, "
         "reinvest. Under MM they are worth the same. In practice each comes with its own frictions.</p>"
         "<p><b>Reinvest.</b> Worth it only with positive-NPV projects. Without them it is empire building: "
         "acquisitions and expansion that serve the manager. This is the free cash flow problem (Jensen 1986, "
         "lecture 4).</p>"
         "<p><b>Dividend.</b> Sticky: once raised it is hard to cut (GM), so it commits the cash. A cut is bad "
         "news.</p>"
         "<p><b>Buyback.</b> Flexible and tax-efficient where gains are taxed less. Signals that managers think "
         "the shares are cheap.</p>"
         "<p><b>Hold cash.</b> Avoids issue costs, lowers distress risk and eases asymmetric information. But it "
         "has no tax advantage and makes discipline harder (lecture 5, slide 20).</p>"
         "<p><b>Remember:</b> name all four, say MM makes them equal, then explain the friction behind each. "
         "Reinvesting without good projects is where value is destroyed.</p>",
)

# utb-s12 · Stoppe utbyttet og kjøpe tilbake i stedet (D8)
statisk(
    "utb-s12", tema="utbytte", type="tolkning",
    hjelp=hjelp3(
        "This is a firm that swaps its regular dividend for buybacks of the same size. Judge it under MM and in "
        "practice.",
        "Under MM, payout form does not change wealth. In practice investors read every payout decision for what "
        "managers know. Taxes on dividends and on gains may also differ.",
        "<p><b>Step 1: under MM.</b> Does the cash still reach the shareholders?</p>"
        "<p><b>Step 2: the dividend side.</b> What does ending a long-standing dividend tell the market?</p>"
        "<p><b>Step 3: the buyback side.</b> What does choosing to buy back shares tell the market?</p>"
        "<p><b>Watch out:</b> under MM there are no taxes, so a tax saving cannot be the MM answer.</p>",
    ),
    q="<p>A firm announces that it will stop its regular dividend for good and use the same cash every year to buy "
      "back shares instead.</p>"
      "<p>What happens under MM? What is likely in practice?</p>",
    alternativer=[
        R("No effect under MM. In practice signals pull both ways: a cut is bad news, a buyback good"),
        F("Under MM the price falls, since the shareholders lose their dividends",
          "Under MM the cash still goes to the shareholders, through the buyback. Their wealth is unchanged."),
        F("Under MM the price rises, since the buyback raises EPS for the shareholders who stay on",
          "That is the EPS fallacy: higher EPS from fewer shares does not raise the price in a perfect market."),
        F("Both under MM and in practice the price rises from the tax saving on buybacks",
          "There are no taxes under MM. In practice a tax saving is possible, but it is not the whole story: "
          "dropping a dividend also sends a signal."),
    ],
    kort="<p><b>No effect under MM, signals both ways in practice.</b> The cash reaches the shareholders either "
         "way. Dropping a sticky dividend reads as bad news, while a buyback signals that managers think the "
         "shares are cheap.</p>",
    full="<p><b>Under MM.</b> The payout is the same size and goes to the same shareholders. Those who want cash "
         "sell into the buyback, the rest hold. Payout form is irrelevant, so nothing happens to the price.</p>"
         "<p><b>In practice: the dividend signal.</b> Investors know dividends are smoothed and cut only under "
         "pressure. Ending one may be read as managers doubting they can keep paying. An open-market buyback "
         "programme commits to nothing, so it does not replace that commitment.</p>"
         "<p><b>In practice: the buyback signal.</b> Managers buy back when they think the shares are cheap, so a "
         "buyback is read as a sign of undervaluation (lecture 5, slide 24). That pulls the other way. Kurbatov's "
         "verdict: the same under MM, signals in both directions in practice.</p>"
         "<p><b>In practice: tax and clientele.</b> Where dividends are taxed more than gains, the switch saves "
         "tax. Where the rates are equal (the US in 2024, Norway) the saving is small. Holders who wanted "
         "dividends, often corporations, may sell.</p>"
         "<p><b>Remember:</b> answer MM first, then the frictions: both signals, tax and clientele.</p>",
)

# utb-s13 · Timing ved dårlige nyheter (PS1 E10d)
statisk(
    "utb-s13", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is the timing of a buyback when managers know news the market does not.",
        "Value per remaining share after the news = (enterprise value after the news + cash left in the "
        "firm) / shares left. Work it out for a buyback before the news and for one after it.",
        "<p><b>Step 1: the price now.</b> Too high or too low, given the coming news?</p>"
        "<p><b>Step 2: who gains.</b> If the firm buys at that price, do the sellers or the holders win?</p>"
        "<p><b>Step 3: pick the timing</b> that favours the shareholders who stay.</p>",
    ),
    q="<p>Management knows that bad news about the business will come out next month. The market does not. The "
      "firm plans to buy back shares with its excess cash.</p>"
      "<p>When should it buy them back to serve the shareholders who stay?</p>",
    alternativer=[
        R("After the news, when the shares are cheaper"),
        F("Before the news, while the price is still high",
          "Buying before bad news pays the sellers more than their shares are worth, at the expense of those who "
          "stay."),
        F("It does not matter: a buyback at the market price is a fair trade",
          "That holds only when the price reflects what managers know. With private news, timing moves value "
          "between sellers and holders."),
        F("Not at all: pay a dividend instead, which treats all holders alike",
          "A dividend treats all holders alike, but so does a buyback after the news is out, at a fair price. The "
          "question is when the buyback serves those who stay."),
    ],
    kort="<p><b>After the news.</b> Before bad news the price is too high, so a buyback pays sellers too much. With "
         "good news coming, managers would buy first (PS1 Exercise 10).</p>",
    full="<p><b>The setting.</b> PS1 Exercise 10: a firm with excess cash can buy back before or after news that "
         "moves its enterprise value up or down. The shareholders as a group get the same either way. Only the "
         "split between sellers and holders changes.</p>"
         "<p><b>Step 1: the price now.</b> With bad news coming, today's price is above what the shares will be "
         "worth.</p>"
         "<p><b>Step 2: buying now.</b> The firm hands sellers that inflated price. The holders own a business "
         "that is about to fall in value with less cash behind it. In PS1 the price after bad news is $25 if the "
         "firm bought first and $30 if it waited.</p>"
         "<p><b>Step 3: buying after.</b> Once the news is out the price is fair. Nobody gains at anyone's "
         "expense.</p>"
         "<p><b>The other side.</b> With good news coming, buying first helps the holders ($75 against $70 in "
         "PS1). Investors who know this read a buyback announcement as a sign of good news. The price "
         "rises.</p>"
         "<p><b>Remember:</b> buy back before good news, after bad news. That is why buybacks signal "
         "undervaluation.</p>",
)

# utb-s14 · Kontantbeholdning: fordeler og ulemper (forelesning 5 s. 19–20)
statisk(
    "utb-s14", tema="utbytte", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the pros and cons of holding cash instead of paying it out.",
        "Under MM cash is negative debt and holding it is irrelevant. Lecture 5 lists the frictions on each side.",
        "<p><b>Step 1: the pros.</b> What costs does a cash buffer let the firm avoid?</p>"
        "<p><b>Step 2: the cons.</b> Is there a tax gain from holding cash? What does spare cash do to "
        "managers?</p>"
        "<p><b>Step 3: judge each statement</b> on its own.</p>",
    ),
    q="<p>I. Holding cash lets a firm avoid the costs of raising new capital and makes financial distress less "
      "likely.<br>II. Holding cash gives the firm a tax advantage over paying it out.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II is false: lecture 5 lists no tax advantage from holding cash. Statement I is one of the "
          "benefits it lists."),
        F("Both I and II",
          "Statement II is false: there is no tax advantage from holding cash."),
        F("Neither I nor II",
          "Statement I holds: cash avoids issue costs and distress, which is why smaller and riskier firms hold "
          "more."),
    ],
    kort="<p><b>Only I.</b> Cash avoids issue costs, distress and asymmetric-information costs. But it has no tax "
         "advantage and makes manager discipline harder (lecture 5, slide 20).</p>",
    full="<p><b>The benchmark.</b> Under MM holding cash is irrelevant: cash is negative debt (lecture 5, slide "
         "19). The frictions decide.</p>"
         "<p><b>For holding cash.</b> It avoids the transaction costs of raising new capital. It makes distress "
         "less likely. It avoids the asymmetric-information costs of external financing, since the firm need not "
         "issue shares the market may underprice.</p>"
         "<p><b>Against holding cash.</b> There is no tax advantage. With high cash holdings it is harder to "
         "keep managers disciplined. They may also overinvest. Payouts can also play a signalling role that cash "
         "kept cannot.</p>"
         "<p><b>Evidence.</b> Firms hold more cash if they are smaller, riskier or have strong growth "
         "opportunities. Cash mostly comes from accumulated internal cash flow, not from issuing securities.</p>"
         "<p><b>Statement I</b> is true. <b>Statement II</b> is false.</p>"
         "<p><b>Remember:</b> cash is a buffer against frictions, not a tax shelter. It can also feed empire "
         "building.</p>",
)

# utb-s15 · Metoder for tilbakekjøp: nederlandsk auksjon (forelesning 5 s. 7)
statisk(
    "utb-s15", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is about the methods a firm can use to buy back its own shares.",
        "Open market, fixed-price tender offer, Dutch auction, greenmail and selling put options. They differ in "
        "who sets the price and whether the firm commits to a quantity.",
        "<p><b>Step 1: who names the price?</b> The firm, the market or the shareholders?</p>"
        "<p><b>Step 2: how is the final price set?</b> One price for all, or each seller's own?</p>"
        "<p><b>Step 3: match the description</b> to the method.</p>"
        "<p><b>Watch out:</b> a fixed-price tender also buys from many holders at one price, but the firm names that price itself.</p>",
    ),
    q="<p>In one repurchase method the firm states how many shares it wants and a price range. Shareholders submit "
      "the lowest prices at which they will sell. The firm then pays everyone the lowest single price that gets it "
      "all the shares it wants.</p>"
      "<p>Which method is this?</p>",
    alternativer=[
        R("A Dutch auction"),
        F("A fixed-price tender offer",
          "In a fixed-price tender the firm names one price in advance and shareholders decide whether to sell at "
          "it. They do not submit prices."),
        F("An open market repurchase",
          "In an open market repurchase the firm buys on the exchange like any other investor, at the market "
          "price. No one submits bids to the firm."),
        F("Greenmail",
          "Greenmail is a negotiated purchase from one large shareholder, usually an activist threatening the "
          "firm."),
    ],
    kort="<p><b>A Dutch auction.</b> Shareholders bid the prices at which they will sell. The firm pays all "
         "sellers the lowest price that fills its target (lecture 5, slide 7).</p>",
    full="<p><b>The methods in lecture 5.</b> A firm can buy back its shares in five ways.</p>"
         "<p><b>Open market repurchase.</b> The firm buys on the exchange like an ordinary investor. Most common, "
         "flexible and commits to nothing.</p>"
         "<p><b>Fixed-price tender offer.</b> The firm offers a stated price, usually at a premium, for a stated "
         "number of shares over a set period. Oversubscribed offers are filled pro rata.</p>"
         "<p><b>Dutch auction.</b> The firm states the number of shares and a price range. Shareholders submit "
         "bids. The price is the lowest that gets the firm all the shares it wants. Everyone who sells is "
         "paid that price. The premium is usually smaller than in a fixed-price tender.</p>"
         "<p><b>Greenmail.</b> A negotiated purchase from one large holder, usually an activist, often at a "
         "premium the other shareholders pay for.</p>"
         "<p><b>Selling put options.</b> The firm sells shareholders the right to sell their shares to it at a "
         "set price.</p>"
         "<p><b>Remember:</b> in a Dutch auction the shareholders bid and one clearing price is paid to all "
         "sellers.</p>",
)

# utb-s16 · Utbyttekronologien (forelesning 5 s. 4–5)
statisk(
    "utb-s16", tema="utbytte", type="fakta",
    hjelp=hjelp3(
        "This is the calendar of a cash dividend: the dates between the board's decision and the payment.",
        "Declaration date, last cum-dividend date, ex-dividend date, record date, payment date. Only one of them "
        "decides whether a buyer gets the dividend.",
        "<p><b>Step 1: the decision.</b> When is the dividend announced?</p>"
        "<p><b>Step 2: the cut-off.</b> On which day does a buyer stop getting the dividend?</p>"
        "<p><b>Step 3: the paperwork.</b> Which dates only record holders or send the money?</p>"
        "<p><b>Watch out:</b> the record date comes after the ex-date, because trades take time to settle.</p>",
    ),
    q="<p>Which date is the first on which a share trades without the right to the next dividend?</p>",
    alternativer=[
        R("The ex-dividend date"),
        F("The record date",
          "The record date is when the firm records who will be paid, usually about two days after the ex-date. "
          "By then the shares have already traded without the dividend."),
        F("The declaration date",
          "The declaration date is when the board authorises the dividend. The shares still trade with the "
          "dividend for some time after it."),
        F("The payment date",
          "The payment date is when the money is sent. The right to it was settled earlier."),
    ],
    kort="<p><b>The ex-dividend date.</b> Buy before it and you get the dividend (cum). Buy on or after it and you "
         "do not (ex). The price drops by about the dividend on that date.</p>",
    full="<p><b>The dividend calendar</b> (lecture 5, slide 5).</p>"
         "<p><b>Declaration date.</b> The board authorises the dividend.</p>"
         "<p><b>Last cum-dividend date.</b> The last day the shares trade with the right to the dividend.</p>"
         "<p><b>Ex-dividend date.</b> The first day the shares trade without it. This is the date that matters "
         "for prices: under MM the price drops by the dividend here.</p>"
         "<p><b>Record date.</b> The firm records who will be paid, usually about two days after the ex-date "
         "because trades take time to settle.</p>"
         "<p><b>Payment date.</b> The money is sent out.</p>"
         "<p><b>Other terms in lecture 5.</b> A special dividend is a one-off payment, usually much larger than a "
         "regular one. A stock dividend pays in new shares. The dividend yield is DPS over the price. The payout "
         "ratio is DPS over EPS.</p>"
         "<p><b>Remember:</b> the ex-date is the cut-off and the date of the price drop.</p>",
)

# utb-s17 · Utbyttegrad og direkteavkastning (forelesning 5 s. 4)
statisk(
    "utb-s17", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is about two payout ratios from lecture 5: the dividend yield and the payout ratio.",
        "Dividend yield = DPS / share price. Payout ratio = DPS / EPS.",
        "<p><b>Step 1: read the question.</b> Which ratio does it ask for?</p>"
        "<p><b>Step 2: pick the denominator.</b> The price, or the earnings per share?</p>"
        "<p><b>Step 3: divide</b> and give the answer in percent.</p>"
        "<p><b>Watch out:</b> the dividend yield and the earnings yield both divide by the price.</p>",
    ),
    q="<p>A share trades at NOK 80. The firm expects earnings per share of NOK 5 and pays a dividend of NOK 2 per "
      "share.</p>"
      "<p>What is the payout ratio?</p>",
    alternativer=[
        R("40.00%", 0.40),
        F("2.50%",
          "This is the dividend yield, DPS over the price: 2/80. The payout ratio divides by EPS.", 0.025),
        F("6.25%",
          "This is the earnings yield, EPS over the price: 5/80. The payout ratio compares the dividend with the "
          "earnings.", 0.0625),
        F("250.00%",
          "EPS over DPS, 5/2: the ratio turned upside down. The payout ratio is the share of earnings paid out.",
          2.5),
    ],
    kort="<p><b>40.00%.</b> Payout ratio = DPS/EPS = 2/5 = 40%. The dividend yield would be 2/80 = 2.5%.</p>",
    full="<p><b>Two ratios that are easy to mix up.</b> Lecture 5 defines both.</p>"
         "<p><b>Payout ratio.</b> DPS divided by EPS: the share of earnings paid out as dividends. Here 2/5 = "
         "<b>40%</b>. The other 60% is retained, or paid out in other ways such as buybacks.</p>"
         "<p><b>Dividend yield.</b> DPS divided by the share price: the cash return from dividends alone. Here "
         "2/80 = 2.5%.</p>"
         "<p><b>The link.</b> Dividend yield = payout ratio × EPS/P = 40% × 5/80 = 2.5%. Consistent.</p>"
         "<p><b>Why it matters.</b> Firms keep long-run target payout ratios but smooth the dividend around them. "
         "A payout ratio far above 100% cannot last unless earnings recover.</p>"
         "<p><b>Under MM.</b> Neither ratio says anything about value in a perfect market: a firm can pay out more "
         "or less and its shareholders are equally rich.</p>"
         "<p><b>Remember:</b> payout ratio over EPS, dividend yield over price.</p>",
    tall=tallsvar(skala=100, enhet="%"),
)

# utb-s18 · Kritikken av tilbakekjøp (forelesning 5 s. 25–26)
statisk(
    "utb-s18", tema="utbytte", type="tolkning",
    hjelp=hjelp3(
        "This is the political critique of buybacks from lecture 5, judged against MM.",
        "Sources and uses: internal funds + new funds = investment + payout. MM's payout result holds the "
        "investment side fixed.",
        "<p><b>Step 1: the claim.</b> Buybacks starve investment.</p>"
        "<p><b>Step 2: the MM answer.</b> Is the money for a good project ever missing in a perfect market?</p>"
        "<p><b>Step 3: where the critique could bite.</b> Which frictions would make a buyback crowd out "
        "investment?</p>",
    ),
    q="<p>Critics such as Elizabeth Warren argue that buybacks give firms a short-run sugar high and starve "
      "investment in the future.</p>"
      "<p>What does MM say about this argument?</p>",
    alternativer=[
        R("Under MM a buyback crowds out no good project: those can always be financed"),
        F("MM agrees: each krone paid out is a krone less for the firm to invest",
          "MM holds investment fixed. A firm with positive-NPV projects can raise the money in a perfect market "
          "whatever it pays out."),
        F("MM says buybacks lift the price in the short run and push it down later",
          "Under MM a fair buyback moves the price neither now nor later."),
        F("MM says buybacks create value because they cut the number of shares in issue",
          "Fewer shares share the same cash flows, but the firm paid fair value for them. No value is created."),
    ],
    kort="<p><b>No crowding out under MM.</b> Investment and payout are separate decisions: good projects can be "
         "financed at fair prices whatever the payout. The critique needs a friction, such as costly or "
         "underpriced issues, or managers with short horizons.</p>",
    full="<p><b>The critique.</b> Lecture 5 quotes Warren («a sugar high») and Lazonick: S&amp;P 500 firms spent "
         "54% of earnings on buybacks and 37% on dividends in 2003 to 2012, leaving little for investment.</p>"
         "<p><b>The MM answer.</b> In a perfect market a firm with positive-NPV projects can always raise the "
         "money at fair prices. Paying out cash does not stop it from investing. Payout and investment are "
         "separate decisions. Payout is irrelevant once investment is fixed.</p>"
         "<p><b>Where the critique could bite.</b> With frictions, a buyback can crowd out investment: issuing "
         "new securities is costly (about 7% for an SEO). Asymmetric information makes equity look underpriced "
         "to managers. Pay tied to EPS or the share price can make managers prefer buybacks over long-run "
         "projects (lecture 13 on KPIs).</p>"
         "<p><b>The other side.</b> Paying out cash a firm has no good use for is the cure for empire building, "
         "not a disease.</p>"
         "<p><b>Remember:</b> start with MM (no effect), then name the friction that would make the critique "
         "right.</p>",
)

# utb-s19 · Tilbakekjøp flytter verdi mellom aksjonærer (forelesning 5 s. 24)
statisk(
    "utb-s19", tema="utbytte", type="tolkning",
    hjelp=hjelp3(
        "This is about how a buyback moves value between shareholders when managers know more than the market.",
        "A buyback at the market price is a fair exchange only if the price is right. If the shares are "
        "underpriced, the firm buys them for less than they are worth.",
        "<p><b>Step 1: the price.</b> Managers are right: the shares are worth more than the market price.</p>"
        "<p><b>Step 2: the sellers.</b> What do they receive compared with what they give up?</p>"
        "<p><b>Step 3: the holders.</b> Who ends up owning the difference?</p>",
    ),
    q="<p>A firm's managers believe its shares are undervalued and buy back shares at the market price. They turn "
      "out to be right.</p>"
      "<p>Who gains from the buyback?</p>",
    alternativer=[
        R("The shareholders who keep their shares, at the expense of those who sell"),
        F("The shareholders who sell, because they receive cash at once",
          "They receive the market price for shares worth more. Getting cash early does not make up for selling "
          "too cheaply."),
        F("All shareholders in proportion, since any of them can tender",
          "Only those who sell take part. The undervaluation moves value from them to those who hold."),
        F("Nobody, since a buyback at the market price is zero-NPV",
          "Only if the price is right. Here it is too low, so the remaining shareholders buy out the sellers "
          "cheaply."),
    ],
    kort="<p><b>The holders gain, the sellers lose.</b> Payout policy can transfer wealth between investor types: "
         "buybacks help long-term holders when the firm is undervalued (lecture 5, slide 24).</p>",
    full="<p><b>The mechanism.</b> The firm pays the market price. If the true value is higher, each share bought "
         "is bought cheaply. The gain does not vanish: it lands on the shareholders who still own the firm.</p>"
         "<p><b>An example.</b> 10 million shares trade at 50 but are worth 60, so the equity is worth 600. The "
         "firm buys back 2 million shares at 50 with 100 of cash. The remaining 8 million shares own 600 − 100 = "
         "500, or 62.50 each once the truth is known. Sellers got 50 for shares worth 60.</p>"
         "<p><b>First check.</b> The two groups together: 2 × 50 + 8 × 62.50 = 600, the true equity value. The "
         "total is fixed. The buyback only splits it.</p>"
         "<p><b>Why it matters.</b> Lecture 5 notes that payout policy lets the firm transfer wealth between "
         "investor types. Long-term holders gain from buybacks when the shares are undervalued. Investors know "
         "this, so a buyback announcement tends to raise the price.</p>"
         "<p><b>Remember:</b> with private information a buyback is not zero-NPV for each group, only for the "
         "shareholders as a whole.</p>",
)

# utb-s20 · Utbytte finansiert med emisjon der de nye også får utbyttet (PS1 E13c)
statisk(
    "utb-s20", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is a dividend larger than the firm's cash, paid for with new shares that also receive it. You need "
        "the dividend per share today.",
        "New shares are sold at the cum price. Shares outstanding = old + raised / P<sub>cum</sub>. Dividend per "
        "share = total dividend / shares outstanding.",
        "<p><b>Step 1: the cum price.</b> Cash per share plus the value of the future dividends per share.</p>"
        "<p><b>Step 2: the new shares.</b> The amount raised divided by that price.</p>"
        "<p><b>Step 3: the dividend.</b> The whole payout spread over old and new shares.</p>",
    ),
    q="<p>An all-equity firm has 5 million shares and NOK 10 million of excess cash. From next year on it will "
      "generate free cash flow of NOK 30 million a year forever, all paid out as dividends. Its cost of equity is "
      "10%. Markets are perfect.</p>"
      "<p>The board wants to pay a dividend of NOK 30 million in total today. It uses the excess cash and raises "
      "the rest by selling new shares today at the market price. The new shareholders receive the dividend too. "
      "What is the dividend per share today?</p>",
    alternativer=[
        R("NOK 5.6364", 30 / (5 + 20 / 62)),
        F("NOK 6.0000",
          "The new shares ignored: 30/5. The new shareholders receive the dividend too, so it is shared by more "
          "shares.", 6.0),
        F("NOK 2.0000",
          "Only the excess cash paid out: 10/5. The board pays NOK 30 million in total, part of it raised from new "
          "shares.", 2.0),
        F("NOK 4.0000",
          "Only the new money per old share, 20/5. The dividend is the whole NOK 30 million, shared by old and new "
          "shares alike.", 4.0),
    ],
    kort="<p><b>NOK 5.6364.</b> P<sub>cum</sub> = 10/5 + 30/(0.10 × 5) = 2 + 60 = 62. New shares = 20/62 = 0.3226 "
         "million. Dividend = 30/5.3226 = 5.6364.</p>",
    full="<p><b>The setting.</b> The last part of PS1 Exercise 13: a firm pays out more than its cash by issuing shares. The "
         "new shareholders join in the dividend they help fund. Under MM nobody gains: the price stays at the cum "
         "price.</p>"
         "<p><b>Step 1: the cum price.</b> Cash per share 10/5 = 2. Future dividends per share 30/5 = 6 a year, "
         "worth 6/0.10 = 60. P<sub>cum</sub> = 62.</p>"
         "<p><b>Step 2: the new shares.</b> The firm needs 30 − 10 = 20 million: 20/62 = 0.3226 million shares, "
         "giving 5.3226 million in total.</p>"
         "<p><b>Step 3: the dividend.</b> 30/5.3226 = <b>NOK 5.6364</b> per share today. Since every year's NOK 30 "
         "million is now shared by 5.3226 million shares, it is also the dividend from next year on.</p>"
         "<p><b>First check.</b> The cum price after the issue: 5.6364 today plus 5.6364/0.10 = 56.3636 for the "
         "future gives 62.0000, the price before. This check can fail: a wrong share count would not return "
         "62.</p>"
         "<p><b>Remember:</b> the extra dividend today is paid for by smaller dividends later. Under MM the "
         "trade-off is exact.</p>",
    tall=tallsvar(enhet="NOK per share"),
)

# utb-s21 · Utbytte som forpliktelse og disiplin (forelesning 4 s. 22, forelesning 5)
statisk(
    "utb-s21", tema="utbytte", type="begrep",
    hjelp=hjelp3(
        "This is the agency side of payout policy: why the form of payout can discipline managers who hold spare "
        "cash.",
        "Free cash flow theory: managers with more cash than good projects tend to overinvest. A payout "
        "disciplines them only to the extent that it is hard to reverse.",
        "<p><b>Step 1: the problem.</b> What do managers do with cash left inside the firm?</p>"
        "<p><b>Step 2: the commitment.</b> Which payout is hard to stop once started?</p>"
        "<p><b>Step 3: test the other stories.</b> Taxes, lenders and the cost of equity.</p>"
        "<p><b>Watch out:</b> the discipline works through what managers are left with, not through taxes or the cost of equity.</p>",
    ),
    q="<p>Why can a regular dividend discipline managers better than an open-market buyback programme of the same "
      "size?</p>",
    alternativer=[
        R("A dividend is sticky: cutting it is costly, so it commits the cash in advance"),
        F("Dividends are taxed less than buybacks, so investors reward the firms that pay them",
          "Dividends are not taxed less: the rates are equal today in the US and Norway. Dividends used to be "
          "taxed more. The discipline comes from the commitment, not from "
          "tax."),
        F("A buyback has to be approved by the lenders, while a dividend does not",
          "Neither needs the lenders' approval unless a covenant says so. Covenants restrict dividends at least "
          "as often."),
        F("A dividend lowers the cost of equity, which makes managers pick better projects",
          "Payout does not change the risk of the assets, so r<sub>E</sub> does not move. The effect works "
          "through the cash left to managers."),
    ],
    kort="<p><b>Commitment.</b> Managers smooth dividends and are punished for cuts, so a dividend binds future "
         "cash. An open-market buyback can be dropped quietly. Debt binds even harder (lecture 4).</p>",
    full="<p><b>The agency problem.</b> Managers with more cash than good projects tend to spend it on empire "
         "building and poor acquisitions (Jensen 1986, lecture 4, slide 23). Paying the cash out removes the "
         "temptation, but only if the payout is hard to reverse.</p>"
         "<p><b>Step 1: the dividend.</b> Dividends are sticky. A raised dividend is a promise investors expect "
         "kept. A cut is read as very bad news. So a regular dividend commits future cash to the "
         "shareholders.</p>"
         "<p><b>Step 2: the buyback.</b> An open-market programme commits to nothing. The firm can slow it or "
         "stop it without much penalty, so it binds managers less.</p>"
         "<p><b>Step 3: debt.</b> Debt commits harder still. Missing a dividend is costly, missing an interest "
         "payment hands control to the lenders (lecture 4, slide 22).</p>"
         "<p><b>Where it matters.</b> Mature, cash-rich firms with few growth options, where cutting waste beats "
         "growth.</p>"
         "<p><b>Remember:</b> the stickier the payout, the stronger the discipline: debt, then dividends, then "
         "buybacks.</p>",
)

# utb-s22 · Tilbakekjøp ved salg av salgsopsjoner (forelesning 5 s. 7)
statisk(
    "utb-s22", tema="utbytte", type="fakta",
    hjelp=hjelp3(
        "This is about the repurchase methods in lecture 5 and what does not count as a repurchase.",
        "A repurchase ends with the firm paying cash for its own shares, so the share count falls. For each "
        "option, ask whether shareholders can end up selling shares to the firm for cash.",
        "<p><b>Step 1: the test.</b> Does the action end with the firm buying shares back?</p>"
        "<p><b>Step 2: check each option.</b> Does it reduce the share count or raise it?</p>"
        "<p><b>Step 3: match</b> with the list in lecture 5.</p>"
        "<p><b>Watch out:</b> a stock dividend and a split change the number of shares without any cash changing hands.</p>",
    ),
    q="<p>Lecture 5 lists ways in which a firm can repurchase its own shares.</p>"
      "<p>Which of these is one of them?</p>",
    alternativer=[
        R("Selling shareholders put options that let them sell shares back to the firm"),
        F("Paying a stock dividend, which hands shareholders new shares in place of cash",
          "A stock dividend raises the number of shares. Nothing is bought back."),
        F("Issuing convertible bonds that shareholders can later turn into new shares",
          "Convertibles can turn into new shares, so they add to the share count rather than reduce it."),
        F("Splitting each share into two, which halves the price of every share",
          "A split doubles the share count and halves the price. Nothing is bought back."),
    ],
    kort="<p><b>Selling put options.</b> The firm sells shareholders the right to sell their shares to it at a set "
         "price. When they exercise, the firm buys back shares (lecture 5, slide 7).</p>",
    full="<p><b>The list in lecture 5.</b> Open market repurchase, fixed-price tender offer, Dutch auction, "
         "greenmail and selling put options.</p>"
         "<p><b>Selling puts.</b> The firm writes put options on its own shares and sells them to shareholders. "
         "A shareholder who exercises sells shares to the firm at the strike price. The firm collects the option "
         "premium up front and buys back shares if the price falls below the strike.</p>"
         "<p><b>Why the others are not repurchases.</b> A stock dividend and a split create new shares without "
         "any cash changing hands. A convertible bond can turn into new shares. All three raise the share count "
         "or leave the firm's value untouched. None of them buys anything back.</p>"
         "<p><b>Under MM.</b> None of these changes value in a perfect market. A split or a stock dividend only "
         "relabels the same equity. A fairly priced put is a zero-NPV trade.</p>"
         "<p><b>Remember:</b> five repurchase methods. Selling puts is the unusual one: the shareholders decide "
         "whether to sell.</p>",
)
