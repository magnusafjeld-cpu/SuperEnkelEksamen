# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: utbyttepolitikk (tema «utbytte»). Skribent 2 (kapitalstruktur).

   ov-utb1  utbytte mot tilbakekjøp ved t = 1: likningssystemet, cum/ex og hjemmelaget utbytte
            (forelesning 5 s. 9–13, PS1 E13, H2025 E3 e)
   ov-utb2  utbytte finansiert med nye aksjer, med emisjonskostnad som friksjon
            (forelesning 5 s. 9–12, PS1 E12 Nilpoj, forelesning 6 lysbilde 13)
   ov-utb3  overskuddskasse: utbytte, tilbakekjøp før eller etter nyheten, skatt og klienteller
            (forelesning 5 s. 15, 18 og 24, PS1 E10 AMC)

   Byttet mot forslaget i spesifikasjonen § 5: τ_d*-regningen (kursfallet med personlig skatt)
   er ikke i Kurbatovs lysbilder eller på formelarket, og Kurbatov sier at utbytte og
   kursgevinst i dag skattlegges likt i USA og Norge. Skatt og klienteller er derfor med som
   tekstdel i ov-utb3 med Kurbatovs argument (utsatt skatt), og regnedelen er tilbakekjøp med
   timing (PS1 E10, forelesning 5 s. 24).
"""
from ov_lib import *  # noqa: F401,F403

NOK_NAVN = ["Lysefjord Kraft ASA", "Bremnes Sjømat ASA", "Tysnes Verft ASA", "Ulsteinvik Teknologi ASA",
            "Fana Eiendom ASA", "Nordkapp Fiskeri ASA", "Stryn Energi ASA", "Hamnøy Logistikk ASA"]
USD_NAVN = ["Calloway Utilities", "Hartwell Brands", "Ridgeway Mining", "Thornbury Pharma",
            "Westcliff Telecom", "Larkspur Foods", "Maplewood Rail", "Osgood Chemicals"]
INVESTOR = [("Mona", "f"), ("Erik", "m"), ("Sara", "f"), ("Jonas", "m"), ("Ingrid", "f"), ("Ola", "m"),
            ("Hanna", "f"), ("Lars", "m")]


# ---------------------------------------------------------------- hjelpere
def _firma(r):
    val = r.choice(["NOK", "$"])
    return r.choice(NOK_NAVN if val == "NOK" else USD_NAVN), val


def _hel(x, eps=1e-9):
    return abs(x - round(x)) < eps


def _dx(x, maks=4):
    """Desimalene et tall trenger: 0 for heltall, ellers 2 til maks."""
    v = rund(x, maks)
    if _hel(v):
        return 0
    t = f"{v:.{maks}f}".rstrip("0")
    return max(2, len(t.split(".")[1]))


def _a(x, maks=4):
    """Et beløp eller tall uten valuta, med de desimalene det trenger: 1 600, 187.50, 1.6667."""
    return tall(x, _dx(x, maks))


def _m(x, val, d=None):
    """Et beløp i millioner med valuta: «NOK 1 350 million», «$187.50 million»."""
    return penger(x, _dx(x) if d is None else d, val) + NBSP + "million"


def _ps(x, val, d=None):
    """En pris per aksje: to desimaler når beløpet er helt i øre, ellers fire."""
    if d is None:
        d = 2 if _hel(x * 100, 1e-7) else 4
    return penger(x, d, val)


def _pp(x, val):
    """En pris per aksje med to til fire desimaler: «$105.00», «$20.3125»."""
    return penger(x, max(2, _dx(x, 4)), val)


def _r(x, maks=4):
    """En rente gitt som brøk, vist i prosent med 2 til maks desimaler: 0.080625 → «8.0625%»."""
    p = x * 100
    return prosent_tekst(p, max(2, _dx(p, maks)))


def _w(x):
    """En vekt med de desimalene den trenger, høyst seks og minst to: 0.84375 → «0.84375»."""
    return tall(x, max(2, _dx(x, 6)))


def _b(x):
    """En beta med fire desimaler."""
    return tall(x, 4)


def _sjekk(vist, eksakt, rel=0.001):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner for langt fra den eksakte."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-12):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _ff(svar, feller):
    """Rydder fellene til en tall- eller blandetdel. Dropper None og rene duplikater (samme tekst).
       Avviser varianten når en felle tilfeldigvis treffer et godtatt svar, eller når to feller med
       ulik tekst gir samme tall (innenfor 2 × toleransen): da kan ikke studenten få riktig forklaring."""
    ut = []
    for f in feller:
        if f is None:
            continue
        t = svar[f.i]
        rel = t.rel if t.rel is not None else (None if t.abs is not None else STD_REL)
        for mål in [t.verdi] + list(t.alt):
            tol = max(t.abs or 0, (rel or 0) * abs(mål))
            if abs(f.verdi - mål) <= 2 * tol + 1e-12:
                raise Avvis(f"fella «{str(f.tekst)[:40]}» treffer svaret")
        dobbel = False
        for g in ut:
            if g.i != f.i:
                continue
            tol = max(t.abs or 0, (rel or 0) * abs(g.verdi))
            if abs(g.verdi - f.verdi) <= 2 * tol + 1e-12:
                if str(g.tekst) != str(f.tekst):
                    raise Avvis(f"to feller gir samme tall: «{str(g.tekst)[:30]}» og «{str(f.tekst)[:30]}»")
                dobbel = True
        if not dobbel:
            ut.append(f)
    return ut


_SETT = {}


def _ovelse(oid, case, deler):
    """ovelse(), men avviser en variant med samme svarvektor som en tidligere variant av oppgaven."""
    v = tuple(float(f"{t.verdi:.6g}") for d in deler for t in (d.get("svar") or []))
    sett = _SETT.setdefault(oid, set())
    if v in sett:
        raise Avvis("samme svar som en tidligere variant")
    sett.add(v)
    return ovelse(case, deler)


def _psg(verdier, val):
    """Priser per aksje i samme liste med felles desimaler: to når alle er hele i øre, ellers fire."""
    d = 2 if all(_hel(x * 100, 1e-7) for x in verdier) else 4
    return [penger(x, d, val) for x in verdier]


def _u(val, hva):
    """Enheten ved feltet: «NOK million», «$ per share»."""
    return f"{val} {hva}"


# ===========================================================================
# ov-utb1 · Utbytte mot tilbakekjøp ved t = 1: likningssystemet og hjemmelaget utbytte
# (forelesning 5 s. 9–13, PS1 E13 Genron, H2025 E3 e)
# ===========================================================================
@oppgave("ov-utb1", tema="utbytte", tittel="Dividend or buyback next year: the two equations", antall=12,
         sjanger="mm", kilde="Lecture 5 slides 9 to 13, PS1 E13, H2025 E3 (e)")
def _(r):
    navn, val = _firma(r)
    inv, kj = r.choice(INVESTOR)
    hun, hennes = ("she", "her") if kj == "f" else ("he", "his")       # pronomenet følger navnet
    Hun = hun.capitalize()
    N = r.choice([4, 5, 8, 10, 20, 25])
    P0 = r.choice([20, 25, 40, 50, 60, 80, 100])
    rE = r.choice([0.08, 0.09, 0.10, 0.12])
    g = r.choice([0.0, 0.0, 0.02, 0.03])
    X = P0 * N * (rE - g)                                       # FCF ved t = 1
    if not _hel(X * 100, 1e-6):
        raise Avvis("stygg kontantstrøm")
    s = r.choice([100, 200, 400, 500, 1000])
    V0 = X / (rE - g)
    V1ex = X * (1 + g) / (rE - g)
    DPS1 = X / N
    P1ex = V1ex / N
    P1 = (X + V1ex) / N                                          # kjøpskursen ved t = 1 (cum)
    n = X / P1
    N1 = N - n
    DPS2b = X * (1 + g) / N1                                     # utbytte per aksje fra t = 2 etter tilbakekjøpet
    DPS2d = X * (1 + g) / N
    P0b = P1 / (1 + rE)
    m = s * DPS1 / P1                                            # aksjer hun må selge
    rest = (s - m) * P1
    # viste mellomtall
    n4 = rund(n, 4)
    N14 = rund(N - n4, 4)
    DPS2v = rund(DPS2b, 4)                                       # vist fra eksakt aksjetall
    m4 = rund(m, 4)
    restv = rund(rest, 4)

    vekst = (f", growing at {_r(g)} a year forever" if g > 0 else ", the same amount every year forever")
    case = (f"<p>{navn} has no debt and {N} million shares. It produces a free cash flow of {_m(X, val)} at the end "
            f"of next year (t = 1){vekst}, and pays it all out as dividends. Its cost of equity is {_r(rE)}. This "
            f"year's dividend has just been paid. Markets are perfect: no taxes, no transaction costs and no "
            f"private information.</p>"
            f"<p>The board considers a change for next year only. At t = 1 it would use the whole free cash flow to "
            f"buy back shares in the open market instead of paying the dividend. From t = 2 on, all free cash flow "
            f"is paid out as dividends again.</p>"
            f"<p>{inv} owns {s} shares. Give prices per share with two decimals and share counts in millions with "
            f"four decimals.</p>")
    case = case.replace(f"{vekst}, and pays", f"{vekst}. It pays")

    # ---------------- (a) P0, DPS1 og ex-kursen ved t = 1 under utbyttepolitikken
    fa = [
        Felle(P0 * (1 + rE), f"This is the price at t = 1 just before the dividend (cum). Today the dividend is a "
                             f"year away, so discount it.", i=0),
        Felle(P1, f"This is the price at t = 1 with the dividend still attached (cum dividend). Ex dividend the "
                  f"share has lost the {_ps(DPS1, val)} payout.", i=2),
    ]
    if g > 0:
        fa += [
            Felle(X / rE / N, "You left out the growth: a growing perpetuity divides by r<sub>E</sub> − g.", i=0),
            Felle(X * (1 + g) / (rE - g) / N, "You grew the cash flow one year too many. The cash flow at t = 1 is "
                                              "already next year's.", i=0),
            Felle(P0, "You assumed the ex-dividend price at t = 1 equals today's price. With growth the remaining "
                      "dividends are larger, so the price grows by g.", i=2),
        ]
    sa = [T("P<sub>0</sub>", P0, _u(val, "per share")), T("DPS<sub>1</sub>", DPS1, _u(val, "per share")),
          T("P<sub>1</sub> ex", P1ex, _u(val, "per share"))]
    vtekst = f"{_a(X)}/({_r(rE)} − {_r(g)})" if g > 0 else f"{_a(X)}/{_r(rE)}"
    v1tekst = (f"{_a(X)} × {tall(1 + g, 2)}/({_r(rE)} − {_r(g)})" if g > 0 else f"{_a(X)}/{_r(rE)}")
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>Under the current policy, what is the share price today, the dividend per share at t = 1 and the "
           f"share price at t = 1 just after that dividend has been paid (ex dividend)?</p>"),
        svar=sa,
        kort=(f"<p><b>P<sub>0</sub> = {_ps(P0, val)}, DPS<sub>1</sub> = {_ps(DPS1, val)}, P<sub>1</sub> ex = "
              f"{_ps(P1ex, val)}.</b> V<sub>0</sub> = {vtekst} = {_a(V0)}; at t = 1 the remaining dividends are worth "
              f"{v1tekst} = {_a(V1ex)}.</p>"),
        losning=(f"<p>Without debt the shares own the whole free cash flow, so a share is worth its future "
                 f"dividends. Ex dividend means the share no longer carries the dividend just paid.</p>"
                 f"<p><b>Step 1: today.</b> V<sub>0</sub> = {vtekst} = {_a(V0)}, so P<sub>0</sub> = {_a(V0)}/{N} = "
                 f"<b>{_ps(P0, val)}</b>.</p>"
                 f"<p><b>Step 2: the dividend.</b> DPS<sub>1</sub> = {_a(X)}/{N} = <b>{_ps(DPS1, val)}</b>.</p>"
                 f"<p><b>Step 3: ex dividend at t = 1.</b> The share now carries the dividends from t = 2: "
                 f"{v1tekst} = {_a(V1ex)}, so P<sub>1</sub> ex = <b>{_ps(P1ex, val)}</b>.</p>"
                 f"<p><b>First check.</b> Holding the share for a year must earn r<sub>E</sub>: (DPS<sub>1</sub> + "
                 f"P<sub>1</sub> ex)/P<sub>0</sub> − 1 = ({_a(DPS1)} + {_a(P1ex)})/{_a(P0)} − 1 = "
                 f"{_r((DPS1 + P1ex) / P0 - 1)}. It can fail: a wrong ex price breaks it.</p>"
                 f"<p><b>Remember:</b> just before the dividend the share is worth the dividend plus the ex price. "
                 f"On the ex date it falls by exactly the dividend.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) tilbakekjøpet: kurs og antall
    fb = [
        Felle(P0, "This is today's price. The buyback happens at t = 1, at the price on that date.", i=0),
        Felle(P1ex, f"This is the ex-dividend price. Under the buyback no dividend is paid at t = 1, so the share "
                    f"still carries the {_a(X)} of cash.", i=0),
        Felle(X / P0, "You divided the cash by today's price. The buyback happens at t = 1, at the price on that "
                      "date. That is the biggest mistake on this exercise.", i=1),
        Felle(X / P1ex, "You bought at the ex-dividend price. The cash is still in the firm when the shares are "
                        "bought.", i=1),
    ]
    if g == 0:                                                    # P0 = P1 ex: én felle per tall
        fb = [
            Felle(P0, f"This is today's price, which with no growth is also the ex-dividend price. Under the buyback "
                      f"no dividend is paid at t = 1, so the share still carries the {_a(X)} of cash.", i=0),
            Felle(X / P0, "You divided the cash by today's price (with no growth also the ex-dividend price). The "
                          "buyback happens at t = 1, while the cash is still in the firm, at the price on that date. "
                          "That is the biggest mistake on this exercise.", i=1),
        ]
    sb = [T("P<sub>1</sub>", P1, _u(val, "per share")), T("n", n, "million shares")]
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Now consider the buyback. At what price does {navn} buy back its shares at t = 1? How many "
           f"shares does it buy?</p>"),
        gitt=(f"<p>From (a): at t = 1 the dividends from t = 2 on are worth {_m(V1ex, val)} in total.</p>"),
        svar=sb,
        kort=(f"<p><b>P<sub>1</sub> = {_ps(P1, val)}, n = {tall(n4, 4)} million.</b> n × P<sub>1</sub> = {_a(X)} and "
              f"(N − n) × P<sub>1</sub> = {_a(V1ex)}. Adding: {N} × P<sub>1</sub> = {_a(X + V1ex)}.</p>"),
        losning=(f"<p>A repurchase gives two unknowns, the price on the buyback date and the number of shares, so "
                 f"it always takes two equations (lecture 5, slide 13). The firm pays a fair price, so the shares "
                 f"left over must be worth what the firm is worth after the cash has gone out.</p>"
                 f"<p><b>Step 1: the cash.</b> n × P<sub>1</sub> = {_a(X)}.</p>"
                 f"<p><b>Step 2: what is left.</b> After the buyback the firm owns the dividends from t = 2: "
                 f"(N − n) × P<sub>1</sub> = {_a(V1ex)}.</p>"
                 f"<p><b>Step 3: solve.</b> Add the two: N × P<sub>1</sub> = {_a(X)} + {_a(V1ex)} = {_a(X + V1ex)}, "
                 f"so P<sub>1</sub> = <b>{_ps(P1, val)}</b>. Then n = {_a(X)}/{_a(P1)} = <b>{tall(n4, 4)} million</b>.</p>"
                 f"<p><b>First check.</b> {tall(N14, 4)} million shares × {_a(P1)} = {_a(rund(N14 * P1, 1))}, the value "
                 f"of the dividends from t = 2, up to rounding. P<sub>1</sub> is the cum-dividend price: {_a(DPS1)} + "
                 f"{_a(P1ex)} = {_a(P1)}.</p>"
                 f"<p><b>Remember:</b> never divide the buyback cash by today's price. Solve the two equations for "
                 f"the price on the buyback date.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) DPS fra t = 2 og prisen i dag under tilbakekjøpet
    fc = [
        Felle(DPS2d, f"This is the dividend per share without the buyback. The same cash flow is now shared by "
                     f"{tall(N14, 4)} million shares.", i=0),
        Felle(P1, "You did not discount. P<sub>1</sub> is the price at t = 1; today it is worth P<sub>1</sub>/"
                  "(1 + r<sub>E</sub>).", i=1),
        Felle(P1ex / (1 + rE), "You discounted the ex-dividend price. Under the buyback there is no dividend at "
                               "t = 1, so the share is worth P<sub>1</sub> then.", i=1),
    ]
    if g > 0:
        fc.append(Felle(X / N1, f"You left out the growth: the cash flow at t = 2 is {_a(X)} × {tall(1 + g, 2)}.", i=0))
    sc = [T("DPS<sub>2</sub>", DPS2b, _u(val, "per share")), T("P<sub>0</sub>", P0b, _u(val, "per share"))]
    X2 = X * (1 + g)
    nevner = f"({_r(rE)} − {_r(g)})" if g > 0 else _r(rE)
    c = tall_del(
        "c", poeng=4,
        q=(f"<p>With the buyback, what dividend per share do the remaining shareholders receive at t = 2? What is "
           f"the share price today under the buyback plan?</p>"),
        gitt=(f"<p>From (b): the firm buys back {tall(n4, 4)} million shares at {_ps(P1, val)}, leaving {tall(N14, 4)} "
              f"million.</p>"),
        svar=sc,
        kort=(f"<p><b>DPS<sub>2</sub> = {_ps(DPS2v, val)}, P<sub>0</sub> = {_ps(P0b, val)}.</b> {_a(X2)}/{tall(N14, 4)}; "
              f"no dividend at t = 1, so P<sub>0</sub> = {_a(P1)}/{tall(1 + rE, 2)}.</p>"),
        losning=(f"<p>The buyback replaces the dividend at t = 1 with fewer shares afterwards. Each remaining share "
                 f"gets a larger slice of every later dividend.</p>"
                 + (f"<p><b>Step 1: the cash flow at t = 2.</b> {_a(X)} × {tall(1 + g, 2)} = {_a(X2)}.</p>" if g > 0
                    else f"<p><b>Step 1: the cash flow at t = 2.</b> Unchanged at {_a(X2)}.</p>") +
                 f"<p><b>Step 2: per share.</b> {_a(X2)}/{tall(N14, 4)} = <b>{_ps(DPS2v, val)}</b>, against "
                 f"{_ps(DPS2d, val)} without the buyback.</p>"
                 f"<p><b>Step 3: today.</b> The share pays nothing at t = 1 and is worth P<sub>1</sub> = {_a(P1)} "
                 f"then, so P<sub>0</sub> = {_a(P1)}/{tall(1 + rE, 2)} = <b>{_ps(P0b, val)}</b>, the same as under the "
                 f"dividend policy.</p>"
                 f"<p><b>First check.</b> Just after the buyback the share is worth its dividends from t = 2: "
                 f"{_a(DPS2v)}/{nevner} = {_ps(DPS2v / (rE - g), val)} = P<sub>1</sub> up to rounding. "
                 f"The buyback at a fair price leaves the price where it was.</p>"
                 f"<p><b>Remember:</b> with investment fixed the payout method does not change today's price "
                 f"(lecture 5, slide 13).</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) hjemmelaget utbytte
    fd = [
        Felle(s * DPS1 / P0, f"You sold at today's price. The buyback and {hennes} sale happen at t = 1, at "
                             f"{_ps(P1, val)}.", i=0),
        Felle(s * DPS1 / P1ex, "You sold at the ex-dividend price. Under the buyback the share still carries the "
                               "cash at t = 1.", i=0),
        Felle(s * P1, f"This is the value if {hun} keeps all {hennes} shares. {Hun} sells some to get the cash.", i=1),
        Felle((s - m) * P1ex, f"You valued the shares {hun} keeps at the ex-dividend price. Under the buyback they "
                              f"are worth {_ps(P1, val)} at t = 1.", i=1),
    ]
    if g == 0:                                                    # P0 = P1 ex: én felle med begge forklaringene
        fd[0] = Felle(s * DPS1 / P0, f"You sold at today's price, which with no growth is also the ex-dividend "
                                     f"price. Under the buyback the share still carries the cash at t = 1, so "
                                     f"{hun} sells at {_ps(P1, val)}.", i=0)
        fd.pop(1)
    sd = [T("shares sold", m, ""), T("value kept", rest, val)]
    d = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>{inv} would rather have the dividend. Under the buyback plan, how many of {hennes} {s} shares must "
           f"{hun} sell at t = 1 to get the same cash as the dividend would have paid? What are the shares {hun} "
           f"keeps worth at t = 1, in {val}?</p>"),
        gitt=(f"<p>From (a): DPS<sub>1</sub> = {_ps(DPS1, val)} and P<sub>1</sub> ex = {_ps(P1ex, val)}. From (b): "
              f"the buyback price is {_ps(P1, val)}.</p>"),
        svar=sd,
        tekst_ledd=f"Is {inv} better or worse off under the buyback than under the dividend? Comment.",
        kort=(f"<p><b>{Hun} sells {_a(m4)} shares and keeps shares worth {penger(rest, 2, val)}.</b> "
              f"{s} × {_a(DPS1)}/{_a(P1)} = {_a(m4)}. {Hun} ends with {penger(s * DPS1, 2, val)} in cash plus "
              f"{penger(rest, 2, val)}, exactly as under the dividend. Payout policy is irrelevant (MM).</p>"),
        losning=(f"<p>A homemade dividend: an investor who wants cash can sell shares. A perfect market lets "
                 f"investors undo any payout choice the firm makes, so they cannot care which one it picks.</p>"
                 f"<p><b>Step 1: the cash {hun} wants.</b> {s} × {_a(DPS1)} = {penger(s * DPS1, 2, val)}.</p>"
                 f"<p><b>Step 2: shares to sell.</b> At {_ps(P1, val)}: {penger(s * DPS1, 2, val)}/{_a(P1)} = "
                 f"<b>{_a(m4)}</b> shares.</p>"
                 f"<p><b>Step 3: what {hun} keeps.</b> ({s} − {_a(m4)}) × {_a(P1)} = <b>{penger(rest, 2, val)}</b>.</p>"
                 f"<p><b>First check.</b> Under the dividend {hun} would hold {s} shares at {_ps(P1ex, val)}: {s} × "
                 f"{_a(P1ex)} = {penger(s * P1ex, 2, val)}, plus the same cash. Equal, as it must be.</p>"
                 f"<p><b>Comment.</b> {Hun} is neither better nor worse off. A shareholder who wanted no cash could "
                 f"just as well undo a dividend by reinvesting it at the ex price. Only frictions such as taxes, "
                 f"transaction costs or signals could make the choice matter.</p>"
                 f"<p><b>Remember:</b> the dividend changes the form of {hennes} wealth, not its size.</p>"),
        kriterier=[
            f"Concludes that {inv} is equally well off: cash plus shares give the same wealth at t = 1 under both "
            f"plans ({penger(s * P1, 2, val)}) (1 p)",
            f"Explains the mechanism: {hun} can create the dividend {'herself' if kj == 'f' else 'himself'} by "
            f"selling shares at a fair price "
            "(homemade dividend), so in a perfect market the payout method is irrelevant (MM) (1 p)",
        ],
        feller=_ff(sd, fd),
    )
    return _ovelse("ov-utb1", case, [a, b, c, d])


# ===========================================================================
# ov-utb2 · Utbytte finansiert med nye aksjer (forelesning 5 s. 9–12, PS1 E12 Nilpoj),
# med emisjonskostnad som friksjon (forelesning 6 lysbilde 13: 5.3 % til banken og 1.7 % annet)
# ===========================================================================
@oppgave("ov-utb2", tema="utbytte", tittel="A bigger dividend paid for with new shares", antall=12,
         sjanger="mm", kilde="PS1 E12, lecture 5 slides 9 to 12")
def _(r):
    navn, val = _firma(r)
    N = r.choice([1, 2, 4, 5, 10])
    P0 = r.choice([20, 25, 40, 50, 80, 100])
    rE = r.choice([0.08, 0.10, 0.12])
    g = r.choice([x for x in (0.0, 0.02, 0.03, 0.05) if rE - x >= 0.05 - 1e-9])
    V0 = P0 * N
    X1 = (rE - g) * V0
    k = r.choice([0.5, 1.0, 1.5, 2.0, 3.0])
    Y = k * X1
    if not (_hel(X1 * 100, 1e-6) and _hel(Y * 100, 1e-6)):
        raise Avvis("stygge beløp")
    f = r.choice([0.05, 0.06, 0.07])
    V1ex = X1 * (1 + g) / (rE - g)
    P1ex = V1ex / N
    P1 = (V1ex - Y) / N
    m = Y / P1
    DPS1 = (X1 + Y) / N
    P0n = (DPS1 + P1) / (1 + rE)
    andel = m / (N + m)
    brutto = Y / (1 - f)
    fall = (brutto - Y) / N / (1 + rE)
    if P1 <= 0.3 * P1ex:
        raise Avvis("for stor utvanning")
    m4 = rund(m, 4)

    vekst = f", growing at {_r(g)} a year forever after that" if g > 0 else ", the same amount every year forever"
    case = (f"<p>{navn} has no debt and {N} million shares worth {_m(V0, val)} in total. It expects a free cash "
            f"flow of {_m(X1, val)} at the end of this year (t = 1){vekst}. It pays all free cash flow out as "
            f"dividends. Markets are perfect.</p>"
            f"<p>The board announces that the dividend at t = 1 will be {_m(X1 + Y, val)} instead. The extra "
            f"{_m(Y, val)} is raised at t = 1 by selling new shares at a fair price. The new shares do not carry the "
            f"dividend paid at t = 1. Investment and all later free cash flows are unchanged.</p>"
            f"<p>Give rates in percent with two decimals, prices per share with two decimals and share counts in "
            f"millions with four decimals.</p>")

    # ---------------- (a) r_E og ex-kursen ved t = 1 under den gamle politikken
    fa = [
        Felle((X1 + V1ex) / N, "This is the price at t = 1 just before the dividend (cum). Ex dividend the share no "
                               "longer carries it.", i=1),
    ]
    if g > 0:
        fa += [
            Felle(X1 / V0 * 100, "You left out the growth. For a growing perpetuity r<sub>E</sub> = "
                                 "DIV<sub>1</sub>/P<sub>0</sub> + g.", i=0),
            Felle((X1 * (1 + g) / V0 + g) * 100, "You grew the cash flow one year too many. The cash flow at t = 1 "
                                                 "is already next year's.", i=0),
            Felle(P0, "You assumed the ex price at t = 1 equals today's price. With growth the dividends from t = 2 "
                      "are larger, so the price grows by g.", i=1),
        ]
    sa = [T("r<sub>E</sub>", rE * 100, "%"), T("P<sub>1</sub> ex", P1ex, _u(val, "per share"))]
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>Under the old policy, what is {gen(navn)} cost of equity r<sub>E</sub>, and what will a share be worth "
           f"at t = 1 just after the dividend has been paid?</p>").replace("r<sub>E</sub>, and", "r<sub>E</sub>? And"),
        svar=sa,
        kort=(f"<p><b>r<sub>E</sub> = {_r(rE)}, P<sub>1</sub> ex = {_ps(P1ex, val)}.</b> r<sub>E</sub> = "
              f"{_a(X1)}/{_a(V0)}" + (f" + {_r(g)}" if g > 0 else "") +
              f"; V<sub>1</sub> = {_a(X1 * (1 + g))}/" + (f"({_r(rE)} − {_r(g)})" if g > 0 else _r(rE)) +
              f" = {_a(V1ex)}.</p>"),
        losning=(f"<p>A firm that pays out all its free cash flow is a (growing) perpetuity for its shareholders, so "
                 f"the price pins down the return they require.</p>"
                 f"<p><b>Step 1: the cost of equity.</b> V<sub>0</sub> = DIV<sub>1</sub>/(r<sub>E</sub> − g), so "
                 f"r<sub>E</sub> = {_a(X1)}/{_a(V0)}" + (f" + {_r(g)}" if g > 0 else "") + f" = <b>{_r(rE)}</b>.</p>"
                 f"<p><b>Step 2: the firm at t = 1.</b> Just after the dividend the shares carry the dividends from "
                 f"t = 2: {_a(X1 * (1 + g))}/" + (f"({_r(rE)} − {_r(g)})" if g > 0 else _r(rE)) +
                 f" = {_a(V1ex)}.</p>"
                 f"<p><b>Step 3: per share.</b> {_a(V1ex)}/{N} = <b>{_ps(P1ex, val)}</b>.</p>"
                 f"<p><b>First check.</b> (DIV<sub>1</sub> + P<sub>1</sub>)/P<sub>0</sub> − 1 = ({_a(X1 / N)} + "
                 f"{_a(P1ex)})/{_a(P0)} − 1 = {_r((X1 / N + P1ex) / P0 - 1)}, the cost of equity. It can fail.</p>"
                 f"<p><b>Remember:</b> r<sub>E</sub> = DIV<sub>1</sub>/P<sub>0</sub> + g, with next year's "
                 f"dividend.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) emisjonskursen og antall nye aksjer
    fb = [
        Felle(P1ex, "This is the ex price under the old policy. The new shareholders will also share the later "
                    "dividends, so the old shares are worth less.", i=0),
        Felle((V1ex + Y) / N, f"You counted the {_a(Y)} raised as staying in the firm. It is paid straight out as "
                              f"part of the dividend.", i=0),
        Felle((V1ex - 2 * Y) / N, "You took the new shareholders' claim out twice. Their money buys one claim.", i=0)
        if V1ex > 2 * Y else None,
        Felle(Y / P1ex, "You sold the new shares at the old ex price. After the issue each share is worth less.", i=1),
        Felle(Y / P0, "You sold the new shares at today's price. They are sold at t = 1, ex dividend.", i=1)
        if g > 0 else None,
    ]
    if g == 0:                                                    # P0 = P1 ex under den gamle politikken
        fb[-2] = Felle(Y / P1ex, "You sold the new shares at the old price (today's price, which with no growth is "
                                 "also the old ex price). After the issue each old share is worth less.", i=1)
    sb = [T("P<sub>1</sub>", P1, _u(val, "per share")), T("new shares", m, "million shares")]
    b = tall_del(
        "b", poeng=4,
        q="<p>At what price are the new shares sold at t = 1, and how many new shares must be sold?</p>"
          .replace("t = 1, and how", "t = 1? How"),
        gitt=f"<p>From (a): just after the dividend the dividends from t = 2 are worth {_m(V1ex, val)} in total.</p>",
        svar=sb,
        kort=(f"<p><b>P<sub>1</sub> = {_ps(P1, val)}, {tall(m4, 4)} million new shares.</b> The new shareholders "
              f"take {_a(Y)} of the {_a(V1ex)}: ({_a(V1ex)} − {_a(Y)})/{N}; {_a(Y)}/{_a(P1)}.</p>"),
        losning=(f"<p>With investment fixed, a higher dividend must be paid for with new money. The new shareholders "
                 f"pay a fair price, so they receive a claim on the later dividends worth exactly what they pay "
                 f"(lecture 5, slides 10 to 11).</p>"
                 f"<p><b>Step 1: the two equations.</b> m × P<sub>1</sub> = {_a(Y)} and (N + m) × P<sub>1</sub> = "
                 f"{_a(V1ex)}.</p>"
                 f"<p><b>Step 2: the price.</b> Subtract: N × P<sub>1</sub> = {_a(V1ex)} − {_a(Y)} = "
                 f"{_a(V1ex - Y)}, so P<sub>1</sub> = {_a(V1ex - Y)}/{N} = <b>{_ps(P1, val)}</b>.</p>"
                 f"<p><b>Step 3: the shares.</b> m = {_a(Y)}/{_a(P1)} = <b>{tall(m4, 4)} million</b>.</p>"
                 f"<p><b>First check.</b> ({N} + {tall(m4, 4)}) × {_a(P1)} = {_a(rund((N + m4) * P1, 1))} = "
                 f"V<sub>1</sub> up to rounding: old and new shares together own the later dividends.</p>"
                 f"<p><b>Remember:</b> the cash raised leaves the firm at once as dividend. Count the new claim "
                 f"once.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) utbytte per gammel aksje, nye eieres andel og P0
    fc = [
        Felle(X1 / N, "This is the dividend under the old policy. The board pays out the extra cash too.", i=0),
        Felle((X1 + Y) / (N + m), "You gave the new shares the dividend at t = 1. They are sold ex dividend.", i=0),
        Felle(m / N, f"You divided by the old {N} million shares. Ownership is measured over all shares after the "
                     f"issue.", i=1),
        Felle((DPS1 + P1ex) / (1 + rE), "You used the old ex price. After the issue each old share owns less of the "
                                        "later dividends.", i=2),
        Felle(DPS1 + P1, "You did not discount. Both the dividend and the price are at t = 1.", i=2),
    ]
    sc = [T("DPS<sub>1</sub>", DPS1, _u(val, "per share")), T("new owners' share", andel),
          T("P<sub>0</sub>", P0n, _u(val, "per share"))]
    c = tall_del(
        "c", poeng=4,
        q=(f"<p>Under the new policy, find the dividend per old share at t = 1, the fraction of {navn} that the new "
           f"shareholders own after t = 1, and today's price of an old share.</p>").replace(
            " after t = 1, and today's", " after t = 1 and today's"),
        gitt=(f"<p>From (a): r<sub>E</sub> = {_r(rE)}. From (b): P<sub>1</sub> = {_ps(P1, val)} and {tall(m4, 4)} "
              f"million new shares are sold.</p>"),
        svar=sc,
        kort=(f"<p><b>DPS<sub>1</sub> = {_ps(DPS1, val)}, {tall(andel, 4)} of the firm, P<sub>0</sub> = "
              f"{_ps(P0n, val)}.</b> ({_a(DPS1)} + {_a(P1)})/{tall(1 + rE, 2)} = {_ps(P0n, val)}, unchanged.</p>"),
        losning=(f"<p>The old shareholders get more now and less later. The question is whether the two cancel. "
                 f"Value each piece at t = 1 and discount it once.</p>"
                 f"<p><b>Step 1: the dividend.</b> ({_a(X1)} + {_a(Y)})/{N} = <b>{_ps(DPS1, val)}</b> per old share, "
                 f"against {_ps(X1 / N, val)} under the old policy.</p>"
                 f"<p><b>Step 2: the new owners.</b> {tall(m4, 4)}/({N} + {tall(m4, 4)}) = <b>{tall(andel, 4)}</b>. "
                 f"The old shareholders keep {tall(1 - andel, 4)} of all later dividends.</p>"
                 f"<p><b>Step 3: today.</b> P<sub>0</sub> = ({_a(DPS1)} + {_a(P1)})/{tall(1 + rE, 2)} = "
                 f"<b>{_ps(P0n, val)}</b>, the same as the {_ps(P0, val)} under the old policy.</p>"
                 f"<p><b>First check.</b> The new owners' fraction is also {_a(Y)}/{_a(V1ex)} = "
                 f"{tall(Y / V1ex, 4)}: they paid {_a(Y)} for a slice of a firm worth {_a(V1ex)}. Two routes, one "
                 f"number.</p>"
                 f"<p><b>Remember:</b> changing the dividend is a zero-NPV financing move. P<sub>0</sub> does not "
                 f"change (lecture 5, slide 12).</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) emisjonskostnaden
    fd = [
        Felle(Y * f / N / (1 + rE), f"You charged the cost on the {_a(Y)} paid out. To pay out {_a(Y)} the firm "
                                    f"must raise {_a(Y)}/(1 − {_r(f, 2)}), so the cost is larger.", i=0),
        Felle((brutto - Y) / N, "You did not discount. The cost is paid at t = 1.", i=0),
        Felle((brutto - Y) / (N + Y / P1) / (1 + rE), "You spread the cost over the new shares too. The new "
                                                      "shareholders pay a fair price, so the old ones bear it all.", i=0),
    ]
    sd = [T("fall in P<sub>0</sub>", fall, _u(val, "per share"))]
    d = tall_del(
        "d", poeng=3,
        q=(f"<p>Suppose instead that selling the new shares costs {_r(f, 2)} of the gross proceeds in fees and other "
           f"costs. To pay the same dividend, the firm must raise more. By how much does the new policy then lower "
           f"today's share price?</p>"),
        gitt=(f"<p>From (a): r<sub>E</sub> = {_r(rE)}. From (c): without issue costs P<sub>0</sub> stays at "
              f"{_ps(P0, val)}.</p>"),
        svar=sd,
        kort=(f"<p><b>{_ps(fall, val, 4)} per share.</b> Gross issue {_a(Y)}/(1 − {_r(f, 2)}) = {_a(brutto)}; cost "
              f"{_a(brutto - Y)} at t = 1: {_a(brutto - Y)}/{N}/{tall(1 + rE, 2)}.</p>"),
        losning=(f"<p>Issue costs are a friction: they leave the firm and go to the bank and other advisers. The new "
                 f"shareholders still pay a fair price for what they get, so the whole cost falls on the old "
                 f"shareholders.</p>"
                 f"<p><b>Step 1: the gross issue.</b> To net {_a(Y)}: {_a(Y)}/(1 − {_r(f, 2)}) = {_a(brutto)}.</p>"
                 f"<p><b>Step 2: the cost.</b> {_a(brutto)} − {_a(Y)} = {_a(brutto - Y)} at t = 1, or "
                 f"{_a(brutto - Y)}/{N} = {_ps((brutto - Y) / N, val, 4)} per old share.</p>"
                 f"<p><b>Step 3: today.</b> {_ps((brutto - Y) / N, val, 4)}/{tall(1 + rE, 2)} = "
                 f"<b>{_ps(fall, val, 4)}</b>.</p>"
                 f"<p><b>First check.</b> Directly: P<sub>1</sub> = ({_a(V1ex)} − {_a(brutto)})/{N} = "
                 f"{_ps((V1ex - brutto) / N, val, 4)} and P<sub>0</sub> = ({_a(DPS1)} + {_a((V1ex - brutto) / N)})/"
                 f"{tall(1 + rE, 2)} = {_ps((DPS1 + (V1ex - brutto) / N) / (1 + rE), val, 4)}, which is "
                 f"{_ps(P0, val)} − {_ps(fall, val, 4)}. It uses another route, so it can fail.</p>"
                 f"<p><b>Remember:</b> Kurbatov's figure for issue costs is about 7% (5.3% to the bank, 1.7% other). "
                 f"Paying a dividend with new shares throws that away.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) intuisjon
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>The CFO argues that the larger dividend makes the shareholders better off because they get more "
           f"cash now. Comment, and say why firms in practice rarely issue shares to pay dividends.</p>")
        .replace("now. Comment, and say", "now. Comment. Also say"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (c) and (d): the old shareholders get {_ps(DPS1, val)} instead of {_ps(X1 / N, val)} at t = 1 "
              f"but keep only {tall(1 - andel, 4)} of the later dividends; with issue costs P<sub>0</sub> falls by "
              f"{_ps(fall, val, 4)}.</p>"),
        kort=(f"<p>Wrong in a perfect market: the old shareholders get more now but give up {tall(andel, 4)} of every "
              f"later dividend to the new shareholders, and the two cancel, so P<sub>0</sub> stays at "
              f"{_ps(P0, val)}. A shareholder who wants cash can sell shares herself (homemade dividend). In practice "
              f"issue costs (about 7%) make the policy cost {_ps(fall, val, 4)} per share and an equity issue is read "
              f"as bad news.</p>").replace("shareholders, and the two cancel", "shareholders. The two cancel"),
        losning=(f"<p>MM's dividend irrelevance: with investment fixed, every extra unit of dividend must be raised "
                 f"from new investors, who take a fair share of the future in return. The old shareholders swap "
                 f"later dividends for earlier ones at a fair rate. No value is created (lecture 5, slide 12).</p>"
                 f"<p>Investors do not need the firm for this. One who wants more cash can sell some shares; one who "
                 f"wants less can reinvest the dividend at the ex price.</p>"
                 f"<p>In practice the policy destroys value. Issue costs are real money ({_ps(fall, val, 4)} per "
                 f"share here). An equity issue signals that managers think the shares are overvalued, so the price "
                 f"tends to fall when one is announced. A higher dividend is also a commitment that is costly to cut "
                 f"later, since dividends are sticky.</p>"
                 f"<p><b>Typical mistakes:</b> agreeing with the CFO, or forgetting that the new shareholders take a "
                 f"share of all later dividends.</p>"
                 f"<p><b>Remember:</b> more dividend now means less later. In a perfect market the two are worth the "
                 f"same; with frictions the swap costs money.</p>"),
        kriterier=[
            "Rejects the claim: the extra cash now is offset by giving the new shareholders part of all later "
            "dividends, so P<sub>0</sub> is unchanged in a perfect market (1 p)",
            "Explains that shareholders can create or undo dividends themselves (homemade dividends), so the policy "
            "adds nothing (1 p)",
            "Names a real-world reason to avoid it with its mechanism: issue costs, the negative signal of an equity "
            "issue or the commitment of a higher dividend (1 p)",
        ],
    )
    return _ovelse("ov-utb2", case, [a, b, c, d, e])


# ===========================================================================
# ov-utb3 · Overskuddskasse: utbytte, tilbakekjøp før eller etter nyheten, skatt og klienteller
# (PS1 E10 AMC, forelesning 5 s. 15, 18 og 24)
# ===========================================================================
@oppgave("ov-utb3", tema="utbytte", tittel="Excess cash: timing a buyback around news", antall=12,
         sjanger="mm", kilde="PS1 E10, lecture 5 slides 15, 18 and 24")
def _(r):
    navn, val = _firma(r)
    N = r.choice([10, 20, 25, 40, 50])
    EV = r.choice([300, 400, 500, 600, 800, 1000])
    C = r.choice([x for x in (50, 100, 150, 200) if x / EV <= 0.3])
    uH = r.choice([0.25, 0.5])
    uL = r.choice([0.25, 0.5])
    EVH, EVL = EV * (1 + uH), EV * (1 - uL)
    P0 = (EV + C) / N
    Pex = EV / N
    n = C / P0
    N1 = N - n
    PHn, PLn = EVH / N1, EVL / N1                       # kjøpt tilbake før nyheten
    PHv, PLv = (EVH + C) / N, (EVL + C) / N             # venter til etter nyheten
    gH = PHn - PHv
    gL = PLv - PLn
    if not _hel(P0 * 100, 1e-6):
        raise Avvis("stygg kurs")
    n4 = rund(n, 4)
    N14 = rund(N - n4, 4)
    PHn4 = rund(EVH / N14, 4)
    PLn4 = rund(EVL / N14, 4)
    _sjekk(PHn4, PHn)
    _sjekk(PLn4, PLn)

    case = (f"<p>{navn} has no debt and {N} million shares. Its operating business is worth {_m(EV, val)} (the "
            f"enterprise value) and it holds {_m(C, val)} of excess cash. The board will pay out all of the cash. "
            f"Shortly, news will come out that moves the enterprise value to either {_m(EVH, val)} or "
            f"{_m(EVL, val)}. Management will know the news before the market does. Until then the shares trade on "
            f"today's values.</p>"
            f"<p>Apart from management's private information, markets are perfect. Buybacks happen at the market "
            f"price on the day. Give prices per share with two decimals and share counts in millions with four "
            f"decimals.</p>")

    # ---------------- (a) kursen i dag og ex-kursen ved et ekstrautbytte
    fa = [
        Felle(EV / N, "You left out the cash. The shareholders own the business and the cash.", i=0),
        Felle(P0, f"This is the price before the payout. A special dividend of {_pp(C / N, val)} per share takes the "
                  f"cash out of the share.", i=1),
        Felle((EV - C) / N, "You took the cash out twice: the enterprise value does not include the cash.", i=1),
    ]
    sa = [T("P<sub>0</sub>", P0, _u(val, "per share")), T("P<sub>ex</sub>", Pex, _u(val, "per share"))]
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>What is the share price today? What would the share price be right after a special dividend of all "
           f"the cash, before the news?</p>"),
        svar=sa,
        kort=(f"<p><b>P<sub>0</sub> = {_pp(P0, val)}, P<sub>ex</sub> = {_pp(Pex, val)}.</b> ({_a(EV)} + {_a(C)})/{N} "
              f"and {_a(EV)}/{N}: the price falls by the dividend of {_pp(C / N, val)}.</p>"),
        losning=(f"<p>Equity is worth the enterprise value plus the cash minus any debt. A dividend moves the cash "
                 f"from the firm to the shareholders, so the price falls by exactly the dividend per share.</p>"
                 f"<p><b>Step 1: equity today.</b> {_a(EV)} + {_a(C)} = {_a(EV + C)}.</p>"
                 f"<p><b>Step 2: per share.</b> {_a(EV + C)}/{N} = <b>{_pp(P0, val)}</b>.</p>"
                 f"<p><b>Step 3: ex dividend.</b> The dividend is {_a(C)}/{N} = {_pp(C / N, val)} per share, so "
                 f"P<sub>ex</sub> = {_pp(P0, val)} − {_pp(C / N, val)} = <b>{_pp(Pex, val)}</b>, which is "
                 f"{_a(EV)}/{N}.</p>"
                 f"<p><b>First check.</b> A shareholder with one share has {_pp(Pex, val)} + {_pp(C / N, val)} = "
                 f"{_pp(P0, val)} after the dividend, the same as before. A dividend changes the form of wealth, not "
                 f"its size.</p>"
                 f"<p><b>Remember:</b> excess cash belongs in the equity value. It leaves the share price when it "
                 f"leaves the firm.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) tilbakekjøp nå
    fb = [
        Felle(C / Pex, "You bought at the price without the cash. Before the payout the shares still carry it.", i=0),
        Felle((EVH + C) / N1, "You counted the cash twice: it was spent on the buyback, so it is no longer in the "
                              "firm.", i=1),
        Felle(EVH / N, f"You divided by the old {N} million shares. The buyback retired {tall(n4, 4)} million.", i=1),
        Felle((EVL + C) / N1, "You counted the cash twice: it was spent on the buyback, so it is no longer in the "
                              "firm.", i=2),
        Felle(EVL / N, f"You divided by the old {N} million shares. The buyback retired {tall(n4, 4)} million.", i=2),
    ]
    sb = [T("n", n, "million shares"), T("P good news", PHn, _u(val, "per share")),
          T("P bad news", PLn, _u(val, "per share"))]
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Suppose {navn} buys back shares with all the cash now, before the news. How many shares does it buy? "
           f"What is the share price after good news and after bad news?</p>"),
        gitt=f"<p>From (a): P<sub>0</sub> = {_pp(P0, val)}.</p>",
        svar=sb,
        kort=(f"<p><b>n = {tall(n4, 4)} million; {_pp(PHn, val)} or {_pp(PLn, val)}.</b> {_a(C)}/{_a(P0)} = "
              f"{tall(n4, 4)}; then {_a(EVH)}/{tall(N14, 4)} or {_a(EVL)}/{tall(N14, 4)}.</p>"),
        losning=(f"<p>Bought before the news, the shares change hands at today's price. Afterwards the remaining "
                 f"shares own the business alone, so they carry all of the news. The cash has left the firm and no "
                 f"longer dampens the swing.</p>"
                 f"<p><b>Step 1: the buyback.</b> n = {_a(C)}/{_a(P0)} = <b>{tall(n4, 4)} million</b>, leaving "
                 f"{tall(N14, 4)} million and no cash.</p>"
                 f"<p><b>Step 2: good news.</b> {_a(EVH)}/{tall(N14, 4)} = <b>{_pp(PHn, val)}</b>.</p>"
                 f"<p><b>Step 3: bad news.</b> {_a(EVL)}/{tall(N14, 4)} = <b>{_pp(PLn, val)}</b>.</p>"
                 f"<p><b>First check.</b> Right after the buyback, before the news, the price is still "
                 f"{_a(EV)}/{tall(N14, 4)} = {_pp(P0, val)} = P<sub>0</sub>: a buyback at a fair price does not move "
                 f"the price. The news then scales it with the enterprise value: {_a(P0)} × {_a(EVH)}/{_a(EV)} = "
                 f"{_pp(PHn, val)}, a route without the rounded share count.</p>"
                 f"<p><b>Remember:</b> after the buyback the cash is gone. Divide the new enterprise value by the "
                 f"shares that are left.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) vent til etter nyheten
    fc = [
        Felle(PHn, "This is the price if the firm buys back before the news. Here it waits.", i=0),
        Felle(EVH / N, "You left out the cash. Before the buyback the shares still own it.", i=0),
        Felle(PLn, "This is the price if the firm buys back before the news. Here it waits.", i=1),
        Felle(EVL / N, "You left out the cash. Before the buyback the shares still own it.", i=1),
    ]
    sc = [T("P good news", PHv, _u(val, "per share")), T("P bad news", PLv, _u(val, "per share"))]
    c = tall_del(
        "c", poeng=3,
        q=("<p>Suppose instead the firm waits until the news is out and then buys back shares with all the cash. "
           "What is the share price after good news and after bad news?</p>"),
        selvstendig=True,
        svar=sc,
        kort=(f"<p><b>{_pp(PHv, val)} or {_pp(PLv, val)}.</b> ({_a(EVH)} + {_a(C)})/{N} or ({_a(EVL)} + "
              f"{_a(C)})/{N}. The buyback at that price does not change it.</p>"),
        losning=(f"<p>Now the market learns the news while the cash is still in the firm. The price adjusts first, "
                 f"then the buyback happens at the new, fair price.</p>"
                 f"<p><b>Step 1: good news.</b> ({_a(EVH)} + {_a(C)})/{N} = <b>{_pp(PHv, val)}</b>.</p>"
                 f"<p><b>Step 2: bad news.</b> ({_a(EVL)} + {_a(C)})/{N} = <b>{_pp(PLv, val)}</b>.</p>"
                 f"<p><b>Step 3: the buyback.</b> At {_pp(PHv, val)} the cash buys {_a(C)}/{_a(PHv)} = "
                 f"{tall(C / PHv, 4)} million shares. The remaining shares are worth {_a(EVH)}/{tall(N - C / PHv, 4)} "
                 f"= {_pp(EVH / (N - C / PHv), val)}: unchanged.</p>"
                 f"<p><b>First check.</b> The spread between good and bad news is {_pp(PHv - PLv, val)} here against "
                 f"{_pp(PHn - PLn, val)} when the firm buys back first. Cash is a safe asset, so keeping it through "
                 f"the news dampens the swing.</p>"
                 f"<p><b>Remember:</b> a buyback at a fair price never moves the price. What matters is whether the "
                 f"price is fair when the shares are bought.</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) timing og signal
    fd = [
        Felle(PHn - P0, "You compared with today's price. Compare the two timings after the same good news.", i=0),
        Felle(P0 - PLv, "You measured the fall from today's price to the price after bad news when the firm waits. "
                        "Compare the two timings after the same bad news.", i=1),
        Felle(gH * N1, "This is the gain for all the remaining shares together. The question asks per share.", i=0),
    ]
    sd = [T("gain, good news", gH, _u(val, "per share")), T("gain, bad news", gL, _u(val, "per share"))]
    d = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>Management acts for the shareholders who keep their shares. If it knows the news is good, which timing "
           f"does it choose and how much more is a kept share worth than under the other timing? Answer the same if "
           f"it knows the news is bad.</p>"),
        gitt=(f"<p>From (b): buying back now gives {_pp(PHn, val)} or {_pp(PLn, val)}. From (c): waiting gives "
              f"{_pp(PHv, val)} or {_pp(PLv, val)}.</p>"),
        svar=sd,
        tekst_ledd=("Who gains and who loses from the timing, and what should a buyback announcement do to the share "
                    "price?").replace("timing, and what", "timing? What"),
        kort=(f"<p><b>Good news: buy now, {_pp(gH, val)} more per kept share. Bad news: wait, {_pp(gL, val)} "
              f"more.</b> Management buys when the shares are cheap, at the sellers' expense, so a buyback "
              f"announcement signals undervaluation and the price should rise.</p>"),
        losning=(f"<p>Management knows more than the market. A buyback at today's price is a good deal for the firm "
                 f"when the price is too low, which is exactly when good news is coming (lecture 5, slide 24).</p>"
                 f"<p><b>Step 1: good news.</b> Buy now: {_pp(PHn, val)} against {_pp(PHv, val)} by waiting, a gain "
                 f"of <b>{_pp(gH, val)}</b> per kept share.</p>"
                 f"<p><b>Step 2: bad news.</b> Wait: {_pp(PLv, val)} against {_pp(PLn, val)} by buying now, a gain "
                 f"of <b>{_pp(gL, val)}</b> per kept share.</p>"
                 f"<p><b>Step 3: who pays.</b> Total equity value does not depend on the timing. What the remaining "
                 f"shareholders gain, the sellers lose: before good news they sell at {_pp(P0, val)}, below what the "
                 f"shares are worth. It is a wealth transfer between shareholders, not value creation.</p>"
                 f"<p><b>First check.</b> Good news, buy now: {tall(N14, 4)} × {_a(PHn)} + {_a(C)} paid to sellers = "
                 f"{_a(rund(N14 * PHn + C, 1))}. Wait: {N} × {_a(PHv)} = {_a(N * PHv)}. The same total.</p>"
                 f"<p><b>The signal.</b> If investors know managers time buybacks like this, an announced buyback says "
                 f"the shares are cheap, so the price should rise. The signal works only if it is credible.</p>"
                 f"<p><b>Remember:</b> buy back before good news, wait through bad news.</p>"),
        kriterier=[
            "Says that the remaining shareholders gain at the expense of those who sell: buying before good news "
            "transfers wealth from the sellers, so it is a transfer, not value creation (1 p)",
            "Concludes that a buyback announcement signals that management sees the shares as undervalued, so the "
            "price should rise (if the signal is credible) (1 p)",
        ],
        feller=_ff(sd, fd),
    )

    # ---------------- (e) skatt og klienteller
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>Leave the news aside. The board asks whether to pay the cash out as a special dividend or as a "
           f"buyback. Which would individual investors, corporate shareholders and tax-exempt institutions prefer, and "
           f"why? What is the tax argument for buybacks today?</p>").replace(
            "prefer, and why?", "prefer? Why?"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=("<p>Individual investors prefer buybacks: they pay tax only if and when they sell, while a dividend is "
              "taxed for every holder at once. Corporate shareholders prefer dividends, which companies receive lightly "
              "taxed; tax-exempt institutions are indifferent, so each firm attracts the clientele its payout suits. "
              "Today dividends and capital gains are taxed at the same rate in the US and Norway, so the remaining tax "
              "advantage of buybacks is deferral.</p>"),
        losning=("<p>In a perfect market the two payouts are equivalent. Taxes are the obvious friction that can make "
                 "the choice matter (lecture 5, slides 14 to 15).</p>"
                 "<p><b>The tax argument.</b> Historically dividends were taxed at a higher rate than capital gains, so "
                 "a buyback saved taxes and could raise firm value. Kurbatov's point for today: in the US and in "
                 "Norway dividends and capital gains are now taxed at the same rate (Norway: an effective 37.84% on "
                 "both). What is left is deferral. A dividend taxes every shareholder this year. A buyback taxes only "
                 "those who sell. They pay only on their gain.</p>"
                 "<p><b>Clienteles</b> (slide 18). Effective tax rates differ across investors, so preferences differ: "
                 "individuals typically prefer buybacks, corporate shareholders prefer dividends and institutions are "
                 "indifferent. A firm cannot please everyone. It attracts the clientele its policy suits. Investors "
                 "who dislike the policy hold other shares.</p>"
                 "<p><b>Typical mistakes:</b> writing that dividends are taxed more heavily today (outdated), or "
                 "forgetting that the tax argument does not apply to tax-exempt investors.</p>"
                 "<p><b>Remember:</b> the buyback's tax edge today is timing: only sellers pay and only when they "
                 "sell.</p>"),
        kriterier=[
            "Individual investors prefer buybacks because the tax is deferred until they sell (or because gains were "
            "historically taxed less) (1 p)",
            "Corporate shareholders prefer dividends and tax-exempt institutions are indifferent, so firms attract a "
            "clientele (1 p)",
            "States that dividends and capital gains are taxed alike today (US and Norway), so the remaining tax "
            "advantage of buybacks is deferral (1 p)",
        ],
    )
    return _ovelse("ov-utb3", case, [a, b, c, d, e])
