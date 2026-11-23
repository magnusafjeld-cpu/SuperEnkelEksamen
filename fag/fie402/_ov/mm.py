# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: Modigliani-Miller (tema «mm»). Skribent 2 (kapitalstruktur).

   ov-mm1  gjeldsfinansiert tilbakekjøp: r_U, kursen ved kunngjøringen, r_E etter og EPS
           (H2024 E3, PS1 E3 Mercer og E1 Yerba, forelesning 2 s. 24)
   ov-mm2  hjemmelaget gearing og arbitrasje (PS1 E2, forelesning 2 s. 14)
   ov-mm3  MM II med risikabel gjeld: β_U, β_E og r_E med β_D (forelesning 2 s. 22–23, HA1 E1)
   ov-mm4  EPS i tilstander og break-even-EBIT (forelesning 2 s. 21 og 24, PS1 E1)

   Spesifikasjonen er docs/fie402-ov-spek.md. Formen følger referanseeksempelet
   (eksempel.py): alle tall kommer fra de samme variablene, mellomtall vises med
   fire desimaler og kjeden regnes videre fra de viste tallene. Svaret (T.verdi)
   er den eksakte verdien, og varianten avvises når de to ligger for langt fra
   hverandre.
"""
from ov_lib import *  # noqa: F401,F403

NOK_NAVN = ["Brekke Industrier ASA", "Sjøholt Logistikk ASA", "Aurland Næring ASA", "Velde Systemer ASA",
            "Torvik Marine ASA", "Holmen Programvare ASA", "Kvinesdal Metall ASA", "Hareid Elektronikk ASA"]
USD_NAVN = ["Northbay Industries", "Ashford Components", "Redfield Logistics", "Carrow Media",
            "Bexley Tools", "Marlowe Foods", "Pellham Systems", "Stanmore Chemicals"]


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
# ov-mm1 · Gjeldsfinansiert tilbakekjøp uten skatt: r_U, kunngjøringen, r_E og EPS
# ===========================================================================
@oppgave("ov-mm1", tema="mm", tittel="A debt-financed buyback: price, cost of equity and EPS", antall=12,
         sjanger="mm", kilde="H2024 E3, PS1 E3 and E1")
def _(r):
    navn, val = _firma(r)
    V = r.choice([800, 1000, 1200, 1600, 2000, 2400, 3200])
    wD0 = r.choice([0.10, 0.125, 0.15, 0.20, 0.25])
    D0 = wD0 * V
    if not _hel(D0):
        raise Avvis("gammel gjeld er ikke et helt tall")
    D0 = round(D0)
    E0 = V - D0
    kand = [k for k in (10, 12, 14, 15, 16, 20, 24, 25, 28, 30, 35, 40, 50) if _hel(E0 / k) and 20 <= E0 / k <= 150]
    if not kand:
        raise Avvis("ingen pen aksjekurs")
    N0 = r.choice(kand)
    P0 = round(E0 / N0)
    rD0 = r.choice([0.03, 0.035, 0.04, 0.045, 0.05])
    rE0 = r.choice([x for x in (0.08, 0.085, 0.09, 0.095, 0.10, 0.11, 0.12) if x - rD0 >= 0.035 - 1e-9])
    rU = (E0 * rE0 + D0 * rD0) / V
    if not _hel(rU * 1e6, 1e-6):
        raise Avvis("r_U har mer enn fire desimaler i prosent")
    rU = rund(rU, 6)
    X = E0 * rE0 + D0 * rD0                                     # forventet EBIT = r_U × V
    w1 = r.choice([w for w in (0.30, 0.35, 0.40, 0.45, 0.50) if w >= wD0 + 0.15 - 1e-9])
    D1 = w1 * V
    if not _hel(D1 * 2, 1e-7):
        raise Avvis("ny gjeld er ikke et pent tall")
    rD1 = rund(rD0 + r.choice([x for x in (0, 0, 0.005, 0.01, 0.015) if rU - rD0 - x >= 0.02 - 1e-9] or [0]), 4)
    if rU - rD1 < 0.015:
        raise Avvis("ny r_D for nær r_U")
    maal = r.choice(["belop", "andel"])
    E1 = V - D1
    n = (D1 - D0) / P0
    N1 = N0 - n
    DE = D1 / E1
    rE1 = rU + DE * (rU - rD1)
    eps0 = (X - rD0 * D0) / N0
    eps1 = (X - rD1 * D1) / N1
    pe0 = P0 / eps0
    pe1 = P0 / eps1
    if eps1 <= eps0:
        raise Avvis("EPS skal stige i denne oppgaven")

    # viste mellomtall og kjeden fra dem
    n4 = rund(n, 4)
    N1_4 = rund(N0 - n4, 4)
    DE4 = rund(DE, 4)
    rE1v = rund(rU + DE4 * (rU - rD1), 6)
    _sjekk(rE1v, rE1)
    eps0v = rund(eps0, 4)
    eps1v = rund(eps1, 4)                                       # vist fra eksakt aksjetall
    pe0v = rund(pe0, 4)
    pe1v = rund(pe1, 4)
    vekst = eps1 / eps0 - 1
    e0t, e1t = _psg([eps0, eps1], val)                          # felles desimaler

    wE, wD = E0 / V, D0 / V
    risiko = (f"The new debt is riskier: lenders expect a return of {_r(rD1)} on it."
              if rD1 > rD0 else f"The new debt is also risk-free, with an expected return of {_r(rD1)}.")
    plan = (f"borrow {_m(D1, val)} of new debt" if maal == "belop" else
            f"borrow enough new debt to bring its debt-to-value ratio D/V to {tall(w1, 2)}")
    case = (f"<p>{navn} has {N0} million shares trading at {_ps(P0, val)} and debt with a market value of "
            f"{_m(D0, val)}. The debt is risk-free with an expected return of {_r(rD0)}. The cost of equity is "
            f"{_r(rE0)}. The assets produce an expected EBIT of {_m(X, val)} a year forever. Markets are perfect: no "
            f"taxes, no distress or issuance costs and the same information for everyone. All earnings are paid out "
            f"as dividends.</p>"
            f"<p>The board announces a recapitalisation. The firm will {plan}, use it first to repay all of the "
            f"existing debt and then buy back shares at the market price. {risiko} Treat the expected interest as "
            f"r<sub>D</sub> × D.</p>"
            f"<p>Give rates in percent with two decimals, share counts in millions and EPS with four decimals.</p>")

    # ---------------- (a) r_U
    fa = [
        Felle(rE0 * 100, f"This is the cost of equity. r<sub>U</sub> is the return on all of the assets, "
                         f"{_m(D0, val)} of which are financed with debt."),
        Felle((rE0 + rD0) / 2 * 100, "You weighted equity and debt equally. The weights are the market values "
                                     "E/V and D/V."),
        Felle((wD * rE0 + wE * rD0) * 100, "You swapped the weights: r<sub>E</sub> goes with E/V and r<sub>D</sub> "
                                           "with D/V."),
        Felle((rE0 - D0 / E0 * (rE0 - rD0)) * 100, "You inverted MM II with D/E. Solved for r<sub>U</sub> it reads "
                                                   "r<sub>U</sub> = r<sub>E</sub> − (D/V)(r<sub>E</sub> − r<sub>D</sub>)."),
    ]
    sa = [T("r<sub>U</sub>", rU * 100, "%")]
    a = tall_del(
        "a", poeng=3,
        q=f"<p>What is {gen(navn)} unlevered cost of capital r<sub>U</sub> before the recapitalisation?</p>",
        svar=sa,
        kort=(f"<p><b>r<sub>U</sub> = {_r(rU)}.</b> V = {_a(E0)} + {_a(D0)} = {_a(V)}: r<sub>U</sub> = {_w(wE)} × "
              f"{_r(rE0)} + {_w(wD)} × {_r(rD0)}.</p>"),
        losning=(f"<p>r<sub>U</sub> is the expected return on the firm's assets. Without taxes it equals the pre-tax "
                 f"WACC whatever the financing, because the two claims together own exactly the assets (MM II read "
                 f"backwards).</p>"
                 f"<p><b>Step 1: market values.</b> E = {N0} × {_a(P0)} = {_a(E0)} and D = {_a(D0)}, so "
                 f"V = {_a(V)}.</p>"
                 f"<p><b>Step 2: weights.</b> E/V = {_a(E0)}/{_a(V)} = {_w(wE)} and D/V = {_w(wD)}.</p>"
                 f"<p><b>Step 3: pre-tax WACC.</b> r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = {_w(wE)} × "
                 f"{_r(rE0)} + {_w(wD)} × {_r(rD0)} = {_r(wE * rE0, 6)} + {_r(wD * rD0, 6)} = <b>{_r(rU)}</b>.</p>"
                 f"<p><b>First check.</b> The cash-flow side gives the same rate: expected EBIT over the value of the "
                 f"assets is {_a(X)}/{_a(V)} = {_r(X / V)}. It uses other inputs from the case, so it catches a slip "
                 f"in the weights.</p>"
                 f"<p><b>Remember:</b> without taxes r<sub>U</sub> is the pre-tax WACC with market-value weights. It "
                 f"belongs to the assets, so a recapitalisation does not change it.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) kunngjøringen og antall aksjer
    Pdiv = E1 / N0
    fb = [
        Felle(Pdiv, f"You took the payout out of the equity at the announcement: {_a(E1)}/{N0}. Nothing has been "
                    f"paid yet. A buyback at the market price does not move the price anyway.", i=0),
        Felle(P0 + (D1 - D0) / N0, "You added the extra debt (D<sub>1</sub> − D<sub>0</sub>) per share to the price, as "
                                   "if debt created value. "
                                   "Without taxes it does not.", i=0),
        Felle(D1 / P0, f"You used all of the new debt for the buyback. The first {_a(D0)} repays the old debt.", i=1),
        Felle((D1 - D0) / Pdiv, f"You bought the shares at {_ps(Pdiv, val, 4)}, the price after a cash payout. The "
                                f"buyback happens at the market price, which stays at {_ps(P0, val)}.", i=1),
    ]
    sb = [T("P", P0, _u(val, "per share")), T("n", n, "million shares")]
    D1tekst = (f"D<sub>1</sub> = {_a(D1)}" if maal == "belop" else
               f"D<sub>1</sub> = {tall(w1, 2)} × {_a(V)} = {_a(D1)}")
    b = blandet_del(
        "b", poeng=4, tall_poeng=2,
        q=(f"<p>What happens to the share price when the plan is announced? How many shares does {navn} buy "
           f"back?</p>"),
        svar=sb,
        tekst_ledd="Explain why the price does or does not react to the announcement.",
        selvstendig=True,
        kort=(f"<p><b>P stays at {_ps(P0, val)}; n = {_a(n4)} million shares.</b> No taxes, so the plan only "
              f"re-slices the same cash flow (MM I). {D1tekst}; ({_a(D1)} − {_a(D0)})/{_a(P0)} = {_a(n4)}.</p>"),
        losning=(f"<p>In a perfect market the value of the firm is the value of its assets. Borrowing to buy back "
                 f"shares changes who holds the claims, not the cash flow behind them, so there is nothing new for "
                 f"the market to price at the announcement.</p>"
                 f"<p><b>Step 1: the price.</b> V stays at {_a(V)} (MM I), so the price stays at "
                 f"<b>{_ps(P0, val)}</b>. A buyback at that price is a fair swap of cash for shares.</p>"
                 f"<p><b>Step 2: the new debt.</b> {D1tekst}. The first {_a(D0)} repays the old debt, so "
                 f"{_a(D1)} − {_a(D0)} = {_a(D1 - D0)} is left for the buyback.</p>"
                 f"<p><b>Step 3: the shares.</b> n = {_a(D1 - D0)}/{_a(P0)} = <b>{_a(n4)} million</b>, leaving "
                 f"{_a(N1_4)} million.</p>"
                 f"<p><b>First check.</b> E after = V − D<sub>1</sub> = {_a(V)} − {_a(D1)} = {_a(E1)}. Spread over "
                 f"{_a(N1_4)} million shares that is {_ps(E1 / N1_4, val, 2)}, the unchanged price up to rounding.</p>"
                 f"<p><b>Remember:</b> only the money left after repaying the old debt buys shares. It buys them at "
                 f"the unchanged price. Write the reason: no taxes and no costs, so MM I holds.</p>"),
        kriterier=[
            f"States that the price stays at {_ps(P0, val)} because without taxes or other frictions the plan only "
            f"changes how the same cash flow is split between creditors and shareholders (MM I) (1 p)",
            "Adds that the announcement reveals nothing about the assets and that a buyback at the market price is a "
            "fair swap, so neither sellers nor holders gain (1 p)",
        ],
        feller=_ff(sb, fb),
    )

    # ---------------- (c) D/E og ny r_E
    fc = [
        Felle(w1, "This is D/V. MM II uses debt per unit of equity, D/E.", i=0),
        Felle((D1 - D0) / E1, f"You counted only the extra debt. After the recapitalisation the firm owes all "
                              f"{_a(D1)}.", i=0),
        Felle((rU + w1 * (rU - rD1)) * 100, "You used D/V instead of D/E in MM II.", i=1),
        Felle((rE0 + DE * (rE0 - rD1)) * 100, "You put the old r<sub>E</sub> where r<sub>U</sub> belongs. MM II "
                                              "starts from the return on the assets.", i=1),
    ]
    if E0 > D1 + 50:
        Dfeil = D1 / (E0 - D1)
        fc.append(Felle(Dfeil, f"You took the new debt out of the old equity ({_a(E0)} − {_a(D1)}) and forgot that "
                               f"the old debt is repaid. Equity after is V − D<sub>1</sub>.", i=0))
        fc.append(Felle((rU + Dfeil * (rU - rD1)) * 100, f"This r<sub>E</sub> is built on equity of {_a(E0)} − "
                                                         f"{_a(D1)}. The old debt is repaid, so E = V − D<sub>1</sub> = "
                                                         f"{_a(E1)}.", i=1))
    if rD1 > rD0:
        fc.append(Felle((rU + DE * (rU - rD0)) * 100, f"You kept the old cost of debt. The new debt is riskier and "
                                                      f"its lenders expect {_r(rD1)}.", i=1))
    sc = [T("D/E", DE), T("r<sub>E</sub>", rE1 * 100, "%")]
    c = tall_del(
        "c", poeng=4,
        q="<p>Find the debt-to-equity ratio D/E after the recapitalisation and the new cost of equity r<sub>E</sub>.</p>",
        gitt=f"<p>From (a): r<sub>U</sub> = {_r(rU)}.</p>",
        svar=sc,
        kort=(f"<p><b>D/E = {_b(DE4)}, r<sub>E</sub> = {_r(rE1v, 2)}.</b> E = {_a(V)} − {_a(D1)} = {_a(E1)}: "
              f"r<sub>E</sub> = {_r(rU)} + {_b(DE4)} × ({_r(rU)} − {_r(rD1)}).</p>"),
        losning=(f"<p>The assets and r<sub>U</sub> are unchanged. What changes is the split: more of the same risk "
                 f"now sits on a smaller equity base, so the shareholders require more (MM II). The new debt has its "
                 f"own expected return, so use it.</p>"
                 f"<p><b>Step 1: equity after.</b> E = V − D<sub>1</sub> = {_a(V)} − {_a(D1)} = {_a(E1)}.</p>"
                 f"<p><b>Step 2: D/E.</b> {_a(D1)}/{_a(E1)} = <b>{_b(DE4)}</b>.</p>"
                 f"<p><b>Step 3: MM II.</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = "
                 f"{_r(rU)} + {_b(DE4)} × ({_r(rU)} − {_r(rD1)}) = <b>{_r(rE1v, 2)}</b>.</p>"
                 f"<p><b>First check.</b> The pre-tax WACC after is {_w(1 - w1)} × {_r(rE1v, 2)} + {_w(w1)} × "
                 f"{_r(rD1)} ≈ {_r((1 - w1) * rE1v + w1 * rD1, 2)} = r<sub>U</sub>. This is an identity once r<sub>E</sub> "
                 f"comes from MM II, so it catches arithmetic slips only. The check that can fail comes in (d): "
                 f"r<sub>E</sub> must equal expected EPS over the price.</p>"
                 f"<p><b>Remember:</b> use the total debt after the deal, E = V − D<sub>1</sub> and the new "
                 f"r<sub>D</sub>. MM II takes D/E, never D/V.</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) EPS før og etter, P/E
    fd = [
        Felle(X / N0, f"You left out the interest on the old debt: {_r(rD0)} × {_a(D0)} goes to the lenders first.", i=0),
        Felle((X - rD1 * D1) / N0, f"You divided by the old {N0} million shares. The buyback retired {_a(n4)} "
                                   f"million of them.", i=1),
        Felle(X / N1, "You left out the interest on the new debt. The lenders are paid before the shareholders.", i=1),
        Felle((X - rD1 * (D1 - D0)) / N1, f"You charged interest only on the extra debt. After the deal all "
                                          f"{_a(D1)} carries {_r(rD1)}.", i=1),
        Felle(pe0, "This is the P/E before the recapitalisation. EPS has changed and the price has not.", i=2),
        Felle(eps1 / P0, "You divided EPS by the price. That is the earnings yield E/P, not the P/E ratio.", i=2),
    ]
    if rD1 > rD0:
        fd.append(Felle((X - rD0 * D1) / N1, f"You charged the old rate {_r(rD0)} on the new debt. Its lenders "
                                             f"expect {_r(rD1)}.", i=1))
    sd = [T("EPS before", eps0, _u(val, "per share")), T("EPS after", eps1, _u(val, "per share")),
          T("P/E after", pe1)]
    d = tall_del(
        "d", poeng=4,
        q="<p>Find the expected earnings per share before and after the recapitalisation and the P/E ratio after it.</p>",
        gitt=(f"<p>From (b): the price stays at {_ps(P0, val)} and the firm buys back {_a(n4)} million shares, "
              f"leaving {_a(N1_4)} million.</p>"),
        svar=sd,
        kort=(f"<p><b>EPS {e0t} → {e1t}, P/E = {tall(pe1v, 4)}.</b> Before: "
              f"({_a(X)} − {_a(rD0 * D0)})/{N0}. After: ({_a(X)} − {_a(rD1 * D1)})/{_a(N1_4)}.</p>"),
        losning=(f"<p>Earnings per share is what is left for the shareholders after the lenders, divided by the "
                 f"shares. A leveraged buyback changes both: more interest, fewer shares.</p>"
                 f"<p><b>Step 1: before.</b> Interest {_r(rD0)} × {_a(D0)} = {_a(rD0 * D0)}. EPS = ({_a(X)} − "
                 f"{_a(rD0 * D0)})/{N0} = <b>{e0t}</b>.</p>"
                 f"<p><b>Step 2: after.</b> Interest {_r(rD1)} × {_a(D1)} = {_a(rD1 * D1)}. EPS = ({_a(X)} − "
                 f"{_a(rD1 * D1)})/{_a(N1_4)} = <b>{e1t}</b>, up {tall(vekst * 100, 2)}%.</p>"
                 f"<p><b>Step 3: P/E.</b> {_a(P0)}/{_a(eps1v)} = <b>{tall(pe1v, 4)}</b>, down from "
                 f"{_a(P0)}/{_a(eps0v)} = {tall(pe0v, 4)}.</p>"
                 f"<p><b>First check.</b> All earnings are paid out and nothing grows, so EPS/P must equal "
                 f"r<sub>E</sub>: {_a(eps1v)}/{_a(P0)} = {_r(eps1v / P0, 2)}, the cost of equity from MM II in (c). "
                 f"This check can fail: it ties the earnings side to the return side.</p>"
                 f"<p><b>Remember:</b> divide by the shares left after the buyback and charge interest on all the "
                 f"debt. A higher EPS at the same price means a lower P/E.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) intuisjon
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>The CFO says: \"EPS rises by {tall(vekst * 100, 1)}% and our new debt at {_r(rD1)} is cheaper than "
           f"equity at {_r(rE0)}, so the recapitalisation makes our shareholders richer.\" Comment.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (c) and (d): r<sub>E</sub> rises from {_r(rE0)} to {_r(rE1v, 2)}, EPS from "
              f"{e0t} to {e1t} and the P/E falls from {tall(pe0v, 4)} to "
              f"{tall(pe1v, 4)}.</p>"),
        kort=(f"<p>The CFO is wrong. Without taxes or other frictions the price stays at {_ps(P0, val)} (MM I), so "
              f"neither the sellers nor the holders gain. EPS rises only because each share now carries more risk: "
              f"r<sub>E</sub> rises to {_r(rE1v, 2)} and the P/E falls by just enough. Debt only looks cheap: the "
              f"higher r<sub>E</sub> offsets it, so the pre-tax WACC stays at r<sub>U</sub> = {_r(rU)}.</p>"),
        losning=(f"<p>The CFO makes two classic mistakes. The <b>EPS fallacy</b>: EPS is higher, but the earnings "
                 f"behind it are riskier, because the shareholders now stand behind {_a(D1)} of debt. Investors "
                 f"discount riskier earnings at a higher rate, so the price, EPS/r<sub>E</sub>, does not move. In bad "
                 f"years the levered EPS falls further than the unlevered one.</p>"
                 f"<p>The <b>cheap-debt fallacy</b>: replacing equity at {_r(rE0)} with debt at {_r(rD1)} seems to "
                 f"lower the cost of capital, but every unit of debt raises r<sub>E</sub> on the remaining equity "
                 f"(MM II). The average stays at r<sub>U</sub>, so V does not change.</p>"
                 f"<p>Value could change only through a friction: interest tax shields, distress costs or a signal. "
                 f"The case rules them out.</p>"
                 f"<p><b>Typical mistakes:</b> agreeing because EPS rises, or saying the shareholders lose because "
                 f"r<sub>E</sub> rose. A higher required return is pay for more risk, not a loss.</p>"
                 f"<p><b>Remember:</b> in a perfect market a recapitalisation re-slices the pie. EPS, r<sub>E</sub> "
                 f"and the P/E move together and the price stays put.</p>"),
        kriterier=[
            f"Concludes that the shareholders are not richer: the price stays at {_ps(P0, val)} because without "
            f"taxes or frictions V is unchanged (MM I) (1 p)",
            "Explains that EPS rises because equity is riskier: r<sub>E</sub> rises and the P/E falls, so the higher "
            "EPS is compensation for risk (1 p)",
            "Explains that cheap debt does not lower the cost of capital: the higher r<sub>E</sub> offsets it and the "
            "pre-tax WACC stays at r<sub>U</sub> (MM II) (1 p)",
        ],
    )
    return _ovelse("ov-mm1", case, [a, b, c, d, e])


# ===========================================================================
# ov-mm2 · Hjemmelaget gearing og arbitrasje (PS1 E2, forelesning 2 s. 14)
# ===========================================================================
PAR = [("Fjellstad Kraft", "Vassbotn Kraft"), ("Alder Shipping", "Birch Shipping"), ("Nordheim Mølle", "Sørheim Mølle"),
       ("Eastfield Power", "Westfield Power"), ("Kvam Havbruk", "Os Havbruk"), ("Hillcrest Brewing", "Dalewood Brewing")]


@oppgave("ov-mm2", tema="mm", tittel="Homemade leverage and the arbitrage behind MM I", antall=12,
         sjanger="mm", kilde="PS1 E2, lecture 2 slides 12 to 14")
def _(r):
    U, L = r.choice(PAR)
    val = r.choice(["NOK", "$"])
    VU = r.choice([200, 250, 400, 500, 800, 1000])
    rU = r.choice([0.08, 0.09, 0.10, 0.11, 0.12])              # E[CF]/V_U − 1 på et realistisk nivå
    EX = VU * (1 + rU)
    if not _hel(EX * 2, 1e-7):
        raise Avvis("stygg forventning")
    p = r.choice([0.4, 0.5, 0.6])
    S = rund(EX * r.choice([0.3, 0.4, 0.5]) / 10, 0) * 10       # spennet mellom boom og bust
    XH = EX + (1 - p) * S
    XL = EX - p * S
    if not (_hel(XH * 2, 1e-7) and _hel(XL * 2, 1e-7)):
        raise Avvis("stygge kontantstrømmer")
    rf = r.choice([x for x in (0.03, 0.04, 0.05) if x <= rU - 0.03 + 1e-9])
    K = VU * r.choice([0.3, 0.4, 0.5])
    if K * (1 + rf) >= XL * 0.9:
        raise Avvis("gjelden er ikke trygt risikofri")
    Ef = VU - K
    gap = rund(Ef * r.choice([0.05, 0.08, 0.10]), 0)
    if gap < 4:
        raise Avvis("for lite avvik")
    billig = r.random() < 0.5
    Em = Ef - gap if billig else Ef + gap
    alfa = r.choice([0.05, 0.10, 0.20])
    rep = K * (1 + rf)                                     # L betaler långiverne ved t = 1
    yH, yL = XH - rep, XL - rep                            # Ls egenkapital i hver tilstand
    gevinst = alfa * gap * (1 + rf)
    rE = (p * yH + (1 - p) * yL) / Ef - 1
    if rE > 0.17:
        raise Avvis("urealistisk høy egenkapitalavkastning")
    rEv = rund(rE, 6)
    _sjekk(rEv, rE)

    def pr(x):
        return _r(x)

    case = (f"<p>{U} and {L} own identical assets. At t = 1 each will produce a cash flow of {_m(XH, val)} with "
            f"probability {tall(p, 1)} or {_m(XL, val)} with probability {tall(1 - p, 1)}. Then both close. {U} has no "
            f"debt. Its equity trades at {_m(VU, val)}. {L} has borrowed {_m(K, val)} risk-free at {pr(rf)}, to be "
            f"repaid with interest at t = 1. {gen(L)} equity trades at {_m(Em, val)}.</p>"
            f"<p>Investors and firms can borrow and lend at the risk-free rate of {pr(rf)}. There are no taxes, "
            f"transaction costs or short-sale limits. An investor wants a stake equal to {tall(alfa * 100, 0)}% of "
            f"{gen(L)} equity. Give amounts in millions.</p>")

    # ---------------- (a) utbetalingene og rettferdig verdi
    fa = [
        Felle(XH - K, f"You repaid the lenders without interest. They get {_a(K)} × {tall(1 + rf, 2)} = {_a(rep)}.", i=0),
        Felle(XL - K, f"You repaid the lenders without interest. They get {_a(K)} × {tall(1 + rf, 2)} = {_a(rep)}.", i=1),
        Felle(VU - rep, f"You subtracted the repayment at t = 1, {_a(rep)}, from a value today. Today the debt is "
                        f"worth what was borrowed, {_a(K)}.", i=2),
        Felle(Em, f"This is the market price of {gen(L)} equity. The question asks what it should be worth if MM I "
                  f"holds.", i=2),
    ]
    sa = [T("boom", yH, _u(val, "million")), T("bust", yL, _u(val, "million")),
          T("E<sub>L</sub>", Ef, _u(val, "million"))]
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>What do {gen(L)} shareholders receive at t = 1 in each state? What should {gen(L)} equity be worth "
           f"today if MM I holds?</p>"),
        svar=sa,
        kort=(f"<p><b>{_a(yH)} or {_a(yL)}; E<sub>L</sub> = {_m(Ef, val)}.</b> The lenders get {_a(K)} × "
              f"{tall(1 + rf, 2)} = {_a(rep)} first. MM I: E<sub>L</sub> = V<sub>U</sub> − D = {_a(VU)} − "
              f"{_a(K)}.</p>"),
        losning=(f"<p>Equity is the residual claim: the shareholders get the cash flow after the lenders. MM I says "
                 f"the two firms must be worth the same, since their assets are identical. So {gen(L)} debt plus "
                 f"equity must be worth {_a(VU)}.</p>"
                 f"<p><b>Step 1: the lenders.</b> They are owed {_a(K)} × {tall(1 + rf, 2)} = {_a(rep)} at t = 1, "
                 f"which both states can pay, so the debt is risk-free.</p>"
                 f"<p><b>Step 2: the shareholders.</b> Boom: {_a(XH)} − {_a(rep)} = <b>{_a(yH)}</b>. Bust: "
                 f"{_a(XL)} − {_a(rep)} = <b>{_a(yL)}</b>.</p>"
                 f"<p><b>Step 3: MM I.</b> The risk-free debt is worth what was lent, {_a(K)}. So "
                 f"E<sub>L</sub> = {_a(VU)} − {_a(K)} = <b>{_m(Ef, val)}</b>, against a market price of "
                 f"{_a(Em)}.</p>"
                 f"<p><b>First check.</b> Discounting the repayment gives the same debt value: {_a(rep)}/"
                 f"{tall(1 + rf, 2)} = {_a(K)}. Adding the claims, {_a(K)} + {_a(Ef)} = {_a(VU)} = V<sub>U</sub>.</p>"
                 f"<p><b>Remember:</b> the lenders are paid principal plus interest at t = 1, while the debt is worth "
                 f"the principal today. Never mix a t = 1 amount with a value today.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) hjemmelaget gearing
    fb = [
        Felle(alfa * Em, f"You bought {tall(alfa * 100, 0)}% of {gen(L)} shares at their market price. The point is "
                         f"to build the same payoff from {gen(U)} shares.", i=0),
        Felle(alfa * rep, f"You borrowed the amount to be repaid at t = 1. Borrow {_a(alfa * K)} today and repay "
                          f"{_a(alfa * rep)} later.", i=1),
        Felle(alfa * VU, f"You left out the personal loan. Borrowing {_a(alfa * K)} cuts the money you put in.", i=2),
        Felle(alfa * Em, f"This is what {tall(alfa * 100, 0)}% of {gen(L)} equity costs in the market, not what the "
                         f"homemade copy costs.", i=2),
    ]
    sb = [T(f"in {U}", alfa * VU, _u(val, "million")), T("borrowed", alfa * K, _u(val, "million")),
          T("net cost", alfa * Ef, _u(val, "million"))]
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Show how the investor can get exactly the payoff of {tall(alfa * 100, 0)}% of {gen(L)} equity "
           f"without buying {gen(L)} shares. How much does she invest in {gen(U)} shares, how much does she borrow "
           f"and what does the position cost her?</p>"),
        selvstendig=True,
        svar=sb,
        kort=(f"<p><b>Buy {_m(alfa * VU, val)} of {gen(U)} equity, borrow {_m(alfa * K, val)}: net "
              f"{_m(alfa * Ef, val)}.</b> At t = 1: {tall(alfa, 2)} × cash flow − {_a(alfa * rep)}, the same as "
              f"{tall(alfa * 100, 0)}% of {gen(L)} equity.</p>"),
        losning=(f"<p>This is homemade leverage. {gen(L)} shareholders own the assets with a loan in front of them. "
                 f"An investor can build the same thing herself: own the same fraction of the unlevered assets and "
                 f"borrow the same fraction of the debt on her own account.</p>"
                 f"<p><b>Step 1: the assets.</b> Buy {tall(alfa * 100, 0)}% of {gen(U)} equity: {tall(alfa, 2)} × "
                 f"{_a(VU)} = <b>{_a(alfa * VU)}</b>.</p>"
                 f"<p><b>Step 2: the loan.</b> Borrow {tall(alfa, 2)} × {_a(K)} = <b>{_a(alfa * K)}</b> at "
                 f"{pr(rf)}. She repays {_a(alfa * rep)} at t = 1.</p>"
                 f"<p><b>Step 3: the cost.</b> {_a(alfa * VU)} − {_a(alfa * K)} = <b>{_a(alfa * Ef)}</b>.</p>"
                 f"<p><b>First check.</b> At t = 1 she gets {tall(alfa, 2)} × {_a(XH)} − {_a(alfa * rep)} = "
                 f"{_a(alfa * yH)} in a boom and {tall(alfa, 2)} × {_a(XL)} − {_a(alfa * rep)} = {_a(alfa * yL)} in a "
                 f"bust: {tall(alfa * 100, 0)}% of what {gen(L)} shareholders get in each state. This check can fail: "
                 f"borrow the wrong amount and the payoffs differ.</p>"
                 f"<p><b>Remember:</b> leverage you can make yourself is worth nothing extra when a firm makes it for "
                 f"you. That is the arbitrage argument behind MM I.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) arbitrasjen
    if billig:
        handel = (f"buy {tall(alfa * 100, 0)}% of {gen(L)} equity for {_a(alfa * Em)}, sell {tall(alfa * 100, 0)}% "
                  f"of {gen(U)} equity short for {_a(alfa * VU)} and lend the difference, {_a(alfa * (VU - Em))}")
        t1 = (f"{gen(L)} shares pay {tall(alfa, 2)} × (cash flow − {_a(rep)}), the loan pays "
              f"{_a(alfa * (VU - Em))} × {tall(1 + rf, 2)} = {_a(alfa * (VU - Em) * (1 + rf))} and closing the short "
              f"costs {tall(alfa, 2)} × cash flow")
        retning = (f"{gen(L)} equity is too cheap ({_a(Em)} against {_a(Ef)}), so you buy it and sell the "
                   f"replica: short {gen(U)} equity and lend")
    else:
        handel = (f"sell {tall(alfa * 100, 0)}% of {gen(L)} equity short for {_a(alfa * Em)}, buy "
                  f"{tall(alfa * 100, 0)}% of {gen(U)} equity for {_a(alfa * VU)} and borrow the difference, "
                  f"{_a(alfa * (VU - Em))}")
        t1 = (f"{gen(U)} shares pay {tall(alfa, 2)} × cash flow, the loan costs {_a(alfa * (VU - Em))} × "
              f"{tall(1 + rf, 2)} = {_a(alfa * (VU - Em) * (1 + rf))} and closing the short costs {tall(alfa, 2)} × "
              f"(cash flow − {_a(rep)})")
        retning = (f"{gen(L)} equity is too expensive ({_a(Em)} against {_a(Ef)}), so you sell it short and buy the "
                   f"replica: {gen(U)} equity and a personal loan")
    fc = [
        Felle(alfa * gap, f"This is the gain measured today. With zero cost today the gain arrives at t = 1, after "
                          f"{_r(rf)} interest on the loan.", i=0),
        Felle(gap * (1 + rf), f"This is the gain on all of {gen(L)} equity. The stake is {tall(alfa * 100, 0)}%.", i=0),
        Felle(alfa * (gap * (1 + rf) + (K * rf if billig else -K * rf)),
              f"You left the interest out of the lenders' claim, so {gen(L)} shares paid cash flow − {_a(K)} in "
              f"your sum. The lenders get {_a(rep)}, so the shares pay cash flow − {_a(rep)}.", i=0),
    ]
    sc = [T("payoff at t = 1", gevinst, _u(val, "million"))]
    c = blandet_del(
        "c", poeng=4, tall_poeng=2,
        q=(f"<p>Construct an arbitrage on the scale of the investor's stake that costs nothing today. What is its "
           f"riskless payoff at t = 1?</p>"),
        gitt=(f"<p>From (a): E<sub>L</sub> = {_m(Ef, val)} if MM I holds. From (b): {tall(alfa * 100, 0)}% of "
              f"{gen(L)} equity can be copied with {_a(alfa * VU)} in {gen(U)} shares and a loan of "
              f"{_a(alfa * K)}.</p>"),
        svar=sc,
        tekst_ledd="Say what you buy, what you sell short and whether you borrow or lend.",
        kort=(f"<p><b>{_m(gevinst, val)} at t = 1.</b> {retning[0].upper() + retning[1:]}. Payoff: "
              f"{tall(alfa, 2)} × {_a(gap)} × {tall(1 + rf, 2)}.</p>"),
        losning=(f"<p>An arbitrage buys the cheap version of a payoff and sells the dear one, so the risky parts "
                 f"cancel and a certain profit is left. Here the two versions are {gen(L)} equity and the homemade "
                 f"copy from (b).</p>"
                 f"<p><b>Step 1: the trade today.</b> {retning[0].upper() + retning[1:]}: {handel}. Net cost "
                 f"zero.</p>"
                 f"<p><b>Step 2: t = 1.</b> {t1}. The cash flow terms cancel in both states.</p>"
                 f"<p><b>Step 3: what is left.</b> {tall(alfa, 2)} × ({_a(Ef)} − {_a(Em)}) "
                 f"× {tall(1 + rf, 2)} in absolute value = <b>{_m(gevinst, val)}</b>, in both states.</p>"
                 f"<p><b>First check.</b> The gain is the mispricing on the stake, {tall(alfa, 2)} × {_a(gap)} = "
                 f"{_a(alfa * gap)}, carried one year at {_r(rf)}. At the fair price {_a(Ef)} the same trade pays "
                 f"exactly 0, so this check can fail.</p>"
                 f"<p><b>Remember:</b> an arbitrage needs zero money and zero risk. Simply buying the cheap share is "
                 f"not one.</p>"),
        kriterier=[
            ("Buys " + gen(L) + " equity (too cheap) and sells " + gen(U) + " equity short (1 p)" if billig else
             "Sells " + gen(L) + " equity short (too expensive) and buys " + gen(U) + " equity (1 p)"),
            ("Lends the cash left over at the risk-free rate, so the net cost today is zero (1 p)" if billig else
             "Borrows the rest at the risk-free rate (homemade leverage), so the net cost today is zero (1 p)"),
        ],
        feller=_ff(sc, fc),
    )

    # ---------------- (d) MM II i avkastninger
    rEm = (p * yH + (1 - p) * yL) / Em - 1
    fd = [
        Felle(rEm * 100, f"You used the market price {_a(Em)}. At that price there is an arbitrage. Use the "
                         f"MM price {_a(Ef)}.", i=1),
        Felle((rU + K / VU * (rU - rf)) * 100, "You used D/V instead of D/E in MM II.", i=1),
        Felle(((p * XH + (1 - p) * XL) / VU) * 100, "You forgot to subtract 1: this is the gross return.", i=0),
    ]
    sd = [T("r<sub>U</sub>", rU * 100, "%"), T("r<sub>E</sub>", rE * 100, "%")]
    d = tall_del(
        "d", poeng=3,
        q=(f"<p>At the MM price, what is the expected return r<sub>U</sub> on {gen(U)} equity? What is the "
           f"expected return r<sub>E</sub> on {gen(L)} equity?</p>"),
        gitt=(f"<p>From (a): {gen(L)} shareholders get {_a(yH)} or {_a(yL)}. E<sub>L</sub> = "
              f"{_m(Ef, val)}.</p>"),
        svar=sd,
        kort=(f"<p><b>r<sub>U</sub> = {_r(rU)}, r<sub>E</sub> = {_r(rEv, 2)}.</b> E[CF] = {_a(EX)}: "
              f"{_a(EX)}/{_a(VU)} − 1. E[payoff to {L}] = {_a(EX - rep)}: {_a(EX - rep)}/{_a(Ef)} − 1.</p>"),
        losning=(f"<p>The expected return is the expected payoff over the price, minus one. Leverage does not change "
                 f"the assets, but it puts their risk on a smaller equity base, so {gen(L)} shareholders expect "
                 f"more (MM II).</p>"
                 f"<p><b>Step 1: {U}.</b> E[CF] = {tall(p, 1)} × {_a(XH)} + {tall(1 - p, 1)} × {_a(XL)} = {_a(EX)}. "
                 f"r<sub>U</sub> = {_a(EX)}/{_a(VU)} − 1 = <b>{_r(rU)}</b>.</p>"
                 f"<p><b>Step 2: {L}.</b> E[payoff] = {tall(p, 1)} × {_a(yH)} + {tall(1 - p, 1)} × {_a(yL)} = "
                 f"{_a(EX - rep)}. r<sub>E</sub> = {_a(EX - rep)}/{_a(Ef)} − 1 = <b>{_r(rEv, 2)}</b>.</p>"
                 f"<p><b>First check.</b> MM II with D/E = {_a(K)}/{_a(Ef)} = {_b(K / Ef)}: {_r(rU)} + "
                 f"{_b(K / Ef)} × ({_r(rU)} − {_r(rf)}) = {_r(rU + rund(K / Ef, 4) * (rU - rf), 2)}. It comes from "
                 f"another route, so it catches a slip in either step.</p>"
                 f"<p><b>Remember:</b> returns are computed at the MM price. A mispriced share has a misleading "
                 f"expected return.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) forutsetningene
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>What does the arbitrage in (c) show about MM I? Name two assumptions it relies on and one real-world "
           f"friction that could let {gen(L)} value differ from {gen(U)}.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (c): the arbitrage pays {_m(gevinst, val)} at t = 1 with no money down and no risk.</p>",
        kort=(f"<p>Because investors can copy {gen(L)} equity with {gen(U)} shares and a personal loan, the two "
              f"firms must be worth the same: V<sup>L</sup> = V<sup>U</sup> (MM I). That needs investors to borrow "
              f"and lend at the same rate as firms and to trade without costs or short-sale limits. In practice "
              f"taxes (the interest tax shield) or distress costs make leverage matter, so {gen(L)} value can "
              f"differ.</p>"),
        losning=(f"<p>The argument is the law of one price. Two positions with the same payoff in every state must "
                 f"cost the same. Otherwise everyone buys the cheap one and sells the dear one until the gap "
                 f"closes. Since anyone can make leverage at home, nobody pays a premium for a firm's leverage. Nor "
                 f"will a levered firm trade at a discount.</p>"
                 f"<p>The proof leans on the perfect-market assumptions (lecture 2): investors borrow and lend on "
                 f"the same terms as firms; there are no taxes, transaction costs or issuance costs; short sales are "
                 f"possible; financing does not change the cash flows or reveal information.</p>"
                 f"<p>Drop one and leverage can matter: the interest tax shield makes debt valuable; distress "
                 f"costs and agency costs make too much of it costly; asymmetric information makes the financing "
                 f"choice a signal.</p>"
                 f"<p><b>Typical mistakes:</b> calling it an arbitrage to buy the cheap share alone, or naming "
                 f"\"uncertainty\" as the friction. MM allows uncertainty.</p>"
                 f"<p><b>Remember:</b> MM I is an arbitrage result. It fails only through a friction you can "
                 f"name.</p>"),
        kriterier=[
            "States that the same payoff must have the same price, so the levered and unlevered firms are worth the "
            "same: V<sup>L</sup> = V<sup>U</sup> (MM I) (1 p)",
            "Names two assumptions, for example investors borrow at the same rate as firms, no transaction costs or "
            "short-sale limits, no taxes (1 p)",
            "Names a friction that breaks it with its mechanism, for example the tax shield makes debt valuable or "
            "distress costs make it costly. Uncertainty alone does not count (1 p)",
        ],
    )
    return _ovelse("ov-mm2", case, [a, b, c, d, e])


# ===========================================================================
# ov-mm3 · MM II med risikabel gjeld: β_U, β_E og r_E med β_D
# (forelesning 2 s. 22–23, HA1 E1, PS1 E3 c og intuisjonen om risikabel gjeld)
# ===========================================================================
@oppgave("ov-mm3", tema="mm", tittel="MM II with risky debt: betas before and after a recapitalisation", antall=12,
         sjanger="mm", kilde="HA1 E1, PS1 E3 (c), lecture 2 slides 22 to 23")
def _(r):
    navn, val = _firma(r)
    V = r.choice([1000, 1200, 1600, 2000, 2400])
    opp = r.random() < 0.67                                  # gire opp (ellers ned)
    w0 = r.choice([0.20, 0.25, 0.30] if opp else [0.30, 0.40, 0.50])
    D0 = w0 * V
    E0 = V - D0
    bE0 = r.choice([1.20, 1.30, 1.40, 1.50, 1.60])
    bD0 = r.choice([0.05, 0.10, 0.15, 0.20] if opp else [0.15, 0.20, 0.25])
    rf = r.choice([0.03, 0.035, 0.04, 0.045])
    mrp = r.choice([0.05, 0.055, 0.06])
    form = r.choice(["DV", "DE"])
    if form == "DV":
        w1 = r.choice([w for w in (0.10, 0.15, 0.20, 0.40, 0.45, 0.50, 0.55, 0.60)
                       if (w >= w0 + 0.15 - 1e-9 if opp else w <= w0 - 0.10 + 1e-9)] or [None])
        if w1 is None:
            raise Avvis("ingen passende mål")
        k1 = w1 / (1 - w1)
    else:
        k1 = r.choice([k for k in (0.125, 0.25, 0.60, 0.75, 1.00, 1.25, 1.50)
                       if (k / (1 + k) >= w0 + 0.15 - 1e-9 if opp else k / (1 + k) <= w0 - 0.10 + 1e-9)] or [None])
        if k1 is None:
            raise Avvis("ingen passende mål")
        w1 = k1 / (1 + k1)
    if opp:
        bD1 = rund(bD0 + r.choice([0.05, 0.10, 0.15]), 2)
    else:
        bD1 = rund(max(0.0, bD0 - r.choice([0.10, 0.15])), 2)
    if k1 * abs(bD1 - bD0) < 0.03:
        raise Avvis("for liten virkning av den nye gjeldsbetaen")
    bU = (1 - w0) * bE0 + w0 * bD0
    bU = rund(bU, 6)
    rU = rf + bU * mrp
    bE1 = bU + k1 * (bU - bD1)
    rE1 = rf + bE1 * mrp
    rD0 = rf + bD0 * mrp
    rD1 = rf + bD1 * mrp
    bEx = bU + k1 * (bU - bD0)                                  # om gjelden beholdt den gamle betaen
    rEx = rf + bEx * mrp
    rE0 = rf + bE0 * mrp
    if bE1 <= bU or bD1 >= bU:
        raise Avvis("urimelige betaer")

    # viste mellomtall
    bU4 = rund(bU, 4)
    rU4 = rund(rU, 6)
    k4 = rund(k1, 4)
    bE14 = rund(bE1, 4)                                     # viste tall regnes fra eksakte verdier
    rE14 = rund(rE1, 6)
    bEx4 = rund(bEx, 4)
    rEx4 = rund(rEx, 6)

    gire = "raise" if opp else "lower"
    if form == "DV":
        maaltekst = f"a debt-to-value ratio D/V of {tall(w1, 2)}"
        ktekst = f"D/E = {tall(w1, 2)}/{tall(1 - w1, 2)} = {_b(k4)}"
    else:
        maaltekst = f"a debt-to-equity ratio D/E of {tall(k1, max(2, _dx(k1, 3)))}"
        ktekst = f"D/E = {tall(k1, max(2, _dx(k1, 3)))} as given"
    if opp:
        hvordan = ("repay all of the existing debt at its market value, issue new debt to reach the target and use "
                   "the rest of the money to buy back shares at the market price")
        nygj = (f"Because the firm will be more levered, the new debt is riskier than the old: its beta is "
                f"{tall(bD1, 2)}.")
    else:
        hvordan = ("repay all of the existing debt at its market value, paying for it with new debt sized to the "
                   "target and an issue of new shares at the market price")
        nygj = (f"Because the firm will be less levered, the new debt is safer than the old: its beta is "
                f"{tall(bD1, 2)}.")
    case = (f"<p>{navn} has equity with a market value of {_m(E0, val)} and debt with a market value of "
            f"{_m(D0, val)}. Its equity beta is {tall(bE0, 2)} and its debt beta is {tall(bD0, 2)}. The risk-free "
            f"rate is {_r(rf)} and the market risk premium is {_r(mrp)}. Markets are perfect, with no taxes.</p>"
            f"<p>The board wants to {gire} leverage to {maaltekst}. It will {hvordan}. The firm's assets and their "
            f"risk do not change. {nygj}</p>"
            f"<p>Give betas with four decimals and rates in percent with two decimals.</p>")

    # ---------------- (a) β_U og r_U
    fa = [
        Felle((1 - w0) * bE0, f"You set the debt beta to zero. The debt is risky (β<sub>D</sub> = {tall(bD0, 2)}), so "
                              f"it carries part of the asset risk.", i=0),
        Felle(w0 * bE0 + (1 - w0) * bD0, "You swapped the weights: β<sub>E</sub> goes with E/V and β<sub>D</sub> with "
                                         "D/V.", i=0) if abs(w0 - 0.5) > 1e-9 else None,
        Felle(bE0 - D0 / E0 * (bE0 - bD0), "You solved the relevering formula with D/E. Backwards it reads "
                                            "β<sub>U</sub> = β<sub>E</sub> − (D/V)(β<sub>E</sub> − β<sub>D</sub>).", i=0),
        Felle(rE0 * 100, "This is r<sub>E</sub>: you put the equity beta into the CAPM. r<sub>U</sub> uses "
                         "β<sub>U</sub>.", i=1),
        Felle((rf + (1 - w0) * bE0 * mrp) * 100, "This r<sub>U</sub> is built on a β<sub>U</sub> that sets the debt "
                                                 "beta to zero.", i=1),
    ]
    sa = [T("β<sub>U</sub>", bU), T("r<sub>U</sub>", rU * 100, "%")]
    a = tall_del(
        "a", poeng=3,
        q=f"<p>Find {gen(navn)} unlevered (asset) beta β<sub>U</sub> and its unlevered cost of capital r<sub>U</sub>.</p>",
        svar=sa,
        kort=(f"<p><b>β<sub>U</sub> = {_b(bU4)}, r<sub>U</sub> = {_r(rU4)}.</b> E/V = {_w(1 - w0)}: β<sub>U</sub> = "
              f"{_w(1 - w0)} × {tall(bE0, 2)} + {_w(w0)} × {tall(bD0, 2)}; r<sub>U</sub> = {_r(rf)} + {_b(bU4)} × "
              f"{_r(mrp)}.</p>"),
        losning=(f"<p>The equity beta mixes business risk with financing risk. The asset beta is the risk of the "
                 f"assets alone: the value-weighted average of the betas of all the claims on them. It does not "
                 f"depend on how the assets are financed.</p>"
                 f"<p><b>Step 1: weights.</b> V = {_a(E0)} + {_a(D0)} = {_a(V)}, so E/V = {_w(1 - w0)} and "
                 f"D/V = {_w(w0)}.</p>"
                 f"<p><b>Step 2: asset beta.</b> β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {_w(1 - w0)} "
                 f"× {tall(bE0, 2)} + {_w(w0)} × {tall(bD0, 2)} = <b>{_b(bU4)}</b>.</p>"
                 f"<p><b>Step 3: CAPM.</b> r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub> × MRP = {_r(rf)} + {_b(bU4)} × "
                 f"{_r(mrp)} = <b>{_r(rU4)}</b>.</p>"
                 f"<p><b>First check.</b> β<sub>U</sub> must lie between β<sub>D</sub> = {tall(bD0, 2)} and "
                 f"β<sub>E</sub> = {tall(bE0, 2)}. It does. The same weights on the returns give r<sub>U</sub> = "
                 f"{_w(1 - w0)} × {_r(rE0, 4)} + {_w(w0)} × {_r(rD0, 4)} = {_r((1 - w0) * rE0 + w0 * rD0, 4)}, a second "
                 f"route to the same number.</p>"
                 f"<p><b>Remember:</b> a risky debt beta belongs in the weights. Leaving it out understates "
                 f"β<sub>U</sub>.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) β_E og r_E etter
    fb = [
        Felle(bU + w1 * (bU - bD1), "You used D/V instead of D/E in the relevering formula.", i=0),
        Felle(bEx, f"You used the old debt beta {tall(bD0, 2)}. The new debt has a beta of {tall(bD1, 2)}.", i=0),
        Felle(bE0, "This is the equity beta before the change. The new leverage changes it.", i=0),
        Felle(bU * (1 + k1), "You relevered as if the debt were risk-free: β<sub>U</sub>(1 + D/E) leaves out "
                             "β<sub>D</sub>.", i=0) if bD1 > 0 else None,
        Felle((rf + (bU + w1 * (bU - bD1)) * mrp) * 100, "This r<sub>E</sub> is built on a β<sub>E</sub> relevered "
                                                         "with D/V instead of D/E.", i=1),
        Felle(rEx * 100, "This r<sub>E</sub> uses the old debt beta. The new debt has a different beta.", i=1),
        Felle(rE0 * 100, "This is the cost of equity before the change. The new leverage changes it.", i=1),
    ]
    sb = [T("β<sub>E</sub>", bE1), T("r<sub>E</sub>", rE1 * 100, "%")]
    b = tall_del(
        "b", poeng=4,
        q="<p>Find the equity beta β<sub>E</sub> and the cost of equity r<sub>E</sub> after the change.</p>",
        gitt=f"<p>From (a): β<sub>U</sub> = {_b(bU4)} and r<sub>U</sub> = {_r(rU4)}.</p>",
        svar=sb,
        kort=(f"<p><b>β<sub>E</sub> = {_b(bE14)}, r<sub>E</sub> = {_r(rE14, 2)}.</b> {ktekst}: β<sub>E</sub> = "
              f"{_b(bU4)} + {_b(k4)} × ({_b(bU4)} − {tall(bD1, 2)}).</p>"),
        losning=(f"<p>β<sub>U</sub> stays at {_b(bU4)}: the assets have not changed. The relevering formula splits "
                 f"that risk between the new debt and the new equity, using the new D/E and the new debt beta "
                 f"(MM II in betas).</p>"
                 f"<p><b>Step 1: D/E.</b> {ktekst}.</p>"
                 f"<p><b>Step 2: relever.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>) = "
                 f"{_b(bU4)} + {_b(k4)} × ({_b(bU4)} − {tall(bD1, 2)}) = <b>{_b(bE14)}</b>.</p>"
                 f"<p><b>Step 3: CAPM.</b> r<sub>E</sub> = {_r(rf)} + {_b(bE14)} × {_r(mrp)} = <b>{_r(rE14, 2)}</b>. "
                 f"MM II gives the same: r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) with r<sub>D</sub> = "
                 f"{_r(rf)} + {tall(bD1, 2)} × {_r(mrp)} = {_r(rD1)}.</p>"
                 f"<p><b>Check 2.</b> (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {_w(1 - w1) if form == 'DV' else _b(1 - w1)} × "
                 f"{_b(bE14)} + {_w(w1) if form == 'DV' else _b(w1)} × {tall(bD1, 2)} = "
                 f"{_b((1 - w1) * bE14 + w1 * bD1)}, which is β<sub>U</sub> up to rounding. It is an identity here, "
                 f"because β<sub>E</sub> was built from β<sub>U</sub>, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> relever with the new D/E and the new debt beta. D/E, never D/V.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) r_D etter og r_E med gammel β_D, med kommentar
    fc = [
        Felle(rD0 * 100, f"This is the cost of debt before the change. The debt beta is now {tall(bD1, 2)}.", i=0),
        Felle(bD1 * mrp * 100, "You left out the risk-free rate: r<sub>D</sub> = r<sub>f</sub> + β<sub>D</sub> × MRP.", i=0),
        Felle(rE1 * 100, "This is the cost of equity with the new debt beta, the answer to (b). The question asks "
                         f"what it would be if the new debt had the old beta of {tall(bD0, 2)}.", i=1),
        Felle((rf + (bU + w1 * (bU - bD0)) * mrp) * 100, "This uses D/V instead of D/E.", i=1),
    ]
    sc = [T("r<sub>D</sub> after", rD1 * 100, "%"), T("r<sub>E</sub> with old β<sub>D</sub>", rEx * 100, "%")]
    if opp:
        ledd = "Is the riskier debt the reason why r<sub>E</sub> rises? Explain."
        krit = [
            f"States that r<sub>E</sub> rises because D/E rises: more of the unchanged asset risk sits on each unit of "
            f"equity (1 p)",
            f"Explains that the riskier debt works the other way: the lenders now bear more of the risk, so "
            f"r<sub>E</sub> rises less ({_r(rE14, 2)} against {_r(rEx4, 2)} with the old debt beta) (1 p)",
        ]
        modell = (f"No. r<sub>E</sub> rises because D/E rises. The riskier debt takes part of the asset risk off "
                  f"the shareholders, so r<sub>E</sub> rises less than the {_r(rEx4, 2)} it would reach with the old "
                  f"debt beta.")
    else:
        ledd = "Does the safer debt make r<sub>E</sub> fall more or less? Explain."
        krit = [
            f"States that r<sub>E</sub> falls because D/E falls: each unit of equity carries less of the unchanged "
            f"asset risk (1 p)",
            f"Explains that the safer debt leaves more of the risk with the shareholders, so r<sub>E</sub> falls less "
            f"({_r(rE14, 2)} against {_r(rEx4, 2)} with the old debt beta) (1 p)",
        ]
        modell = (f"Less. r<sub>E</sub> falls because D/E falls, but the safer debt hands risk back to the "
                  f"shareholders, so r<sub>E</sub> ends at {_r(rE14, 2)} instead of the {_r(rEx4, 2)} it would reach "
                  f"with the old debt beta.")
    c = blandet_del(
        "c", poeng=5, tall_poeng=3,
        q=(f"<p>Find the cost of debt r<sub>D</sub> after the change. Then find what the cost of equity would be after "
           f"the change if the new debt had the same beta as the old debt, {tall(bD0, 2)}.</p>"),
        gitt=(f"<p>From (a): β<sub>U</sub> = {_b(bU4)}. From (b): β<sub>E</sub> = {_b(bE14)} and r<sub>E</sub> = "
              f"{_r(rE14, 2)}.</p>"),
        svar=sc,
        tekst_ledd=ledd,
        kort=(f"<p><b>r<sub>D</sub> = {_r(rD1)}; r<sub>E</sub> = {_r(rEx4, 2)} with the old β<sub>D</sub>.</b> "
              f"{modell}</p>"),
        losning=(f"<p>MM II says what moves r<sub>E</sub>: D/E and the gap between the asset risk and the debt risk. "
                 f"With the assets fixed, any risk the lenders take on is risk the shareholders no longer bear.</p>"
                 f"<p><b>Step 1: the new cost of debt.</b> r<sub>D</sub> = {_r(rf)} + {tall(bD1, 2)} × {_r(mrp)} = "
                 f"<b>{_r(rD1)}</b>, against {_r(rD0)} before.</p>"
                 f"<p><b>Step 2: the comparison.</b> With β<sub>D</sub> = {tall(bD0, 2)}: β<sub>E</sub> = {_b(bU4)} + "
                 f"{_b(k4)} × ({_b(bU4)} − {tall(bD0, 2)}) = {_b(bEx4)}, so r<sub>E</sub> = {_r(rf)} + {_b(bEx4)} × "
                 f"{_r(mrp)} = <b>{_r(rEx4, 2)}</b>.</p>"
                 f"<p><b>Step 3: read it.</b> {modell}</p>"
                 f"<p><b>First check.</b> The two equity betas must differ by (D/E) × (change in β<sub>D</sub>) "
                 f"= {_b(k4)} × {tall(abs(bD1 - bD0), 2)} = {_b(k4 * abs(bD1 - bD0))}. They do: {_b(bEx4)} against "
                 f"{_b(bE14)}, a gap of {_b(abs(bEx4 - bE14))} up to rounding.</p>"
                 + (f"<p><b>Typical mistake:</b> saying r<sub>E</sub> rises because the debt became riskier. With "
                    f"r<sub>U</sub> fixed, riskier debt dampens the rise in r<sub>E</sub>.</p>" if opp else
                    f"<p><b>Typical mistake:</b> saying r<sub>E</sub> falls because the debt became safer. With "
                    f"r<sub>U</sub> fixed, safer debt dampens the fall in r<sub>E</sub>.</p>") +
                 f"<p><b>Remember:</b> D/E drives r<sub>E</sub>. The debt beta decides how much of the asset risk the "
                 f"lenders take.</p>"),
        kriterier=krit,
        feller=_ff(sc, fc),
    )

    # ---------------- (d) intuisjon: er aksjonærene verre stilt?
    ord_ = "rises" if opp else "falls"
    if opp:
        paastand = (f"\"Our cost of equity rises from {_r(rE0, 2)} to {_r(rE14, 2)}, so the recapitalisation makes "
                    f"our shares less valuable.\"")
    else:
        paastand = (f"\"Our cost of equity falls from {_r(rE0, 2)} to {_r(rE14, 2)}, so the recapitalisation makes "
                    f"our shares more valuable.\"")
    d = tekst_del(
        "d", poeng=3,
        q=f"<p>A shareholder says: {paastand} Comment.</p>",
        setninger="Answer in at most three sentences.",
        gitt=(f"<p>From (a) and (b): r<sub>U</sub> = {_r(rU4)}; r<sub>E</sub> {ord_} from {_r(rE0, 2)} to "
              f"{_r(rE14, 2)}.</p>"),
        kort=(f"<p>Wrong: r<sub>E</sub> is the return the shareholders require for the risk they bear, which "
              f"{ord_} with D/E. The expected payoff per unit of equity changes in step, so the share price is "
              f"unchanged. With no taxes the firm is worth the same (MM I) and the WACC stays at r<sub>U</sub> = "
              f"{_r(rU4)}.</p>"),
        losning=(f"<p>The mistake is to treat the discount rate as if it moved on its own. In a perfect market "
                 f"r<sub>E</sub> changes only because the risk of the equity changes. The expected payoff to the "
                 f"equity changes with it. Value is expected payoff over the required return, so the two moves "
                 f"cancel.</p>"
                 f"<p>The firm as a whole is unchanged: same assets, same cash flow, same β<sub>U</sub>. So V is the "
                 f"same (MM I) and the pre-tax WACC stays at r<sub>U</sub> = {_r(rU4)}. Shares bought or sold in "
                 f"the deal change hands at a fair price.</p>"
                 f"<p><b>Typical mistakes:</b> saying the shareholders lose because r<sub>E</sub> rises, or gain "
                 f"because it falls. Also wrong: saying the WACC changes because the weights change.</p>"
                 f"<p><b>Remember:</b> a higher required return is payment for more risk, not a loss of value.</p>"),
        kriterier=[
            "Rejects the claim: the share price and firm value are unchanged in a perfect market without taxes (MM I) (1 p)",
            f"Explains that r<sub>E</sub> {ord_} because the equity's risk changes with D/E. The expected payoff "
            f"per unit of equity changes with it (1 p)",
            "States that the WACC stays at r<sub>U</sub>, since the assets and their risk are unchanged (1 p)",
        ],
    )
    return _ovelse("ov-mm3", case, [a, b, c, d])


# ===========================================================================
# ov-mm4 · EPS i tilstander og break-even-EBIT (forelesning 2 s. 21 og 24, PS1 E1)
# ===========================================================================
@oppgave("ov-mm4", tema="mm", tittel="EPS across states and the break-even EBIT", antall=12,
         sjanger="mm", kilde="Lecture 2 slides 21 and 24, PS1 E1")
def _(r):
    navn, val = _firma(r)
    N = r.choice([10, 20, 25, 40, 50])
    P = r.choice([8, 10, 12, 15, 20, 25])
    V = N * P
    rM = r.choice([0.10, 0.12, 0.125, 0.15])                  # avkastningen på eiendelene i et normalår
    XM = rM * V
    aL = r.choice([0.4, 0.5, 0.6])
    aH = r.choice([0.3, 0.4, 0.5, 0.6])
    qL, qM, qH = r.choice([(0.3, 0.5, 0.2), (0.2, 0.5, 0.3), (0.25, 0.45, 0.3), (0.3, 0.45, 0.25),
                           (0.2, 0.6, 0.2), (0.25, 0.5, 0.25)])
    XL, XH = XM * (1 - aL), XM * (1 + aH)
    if not all(_hel(x * 100, 1e-6) for x in (XL, XM, XH)):
        raise Avvis("stygge EBIT-tall")
    EX = qL * XL + qM * XM + qH * XH
    if abs(EX - XM) < 0.02 * XM:
        raise Avvis("forventningen faller sammen med normalåret")
    rU = EX / V
    kand = [x for x in (0.04, 0.05, 0.06, 0.07, 0.08)
            if x <= rU - 0.015 + 1e-9 and XL < x * V * 0.97 and x * V < XM * 0.97]
    if not kand:
        raise Avvis("ingen rente gir resesjon under break-even")
    rD = r.choice(kand)
    f = r.choice([0.2, 0.25, 0.3, 0.4, 0.5])
    D = f * V
    n = f * N
    if not (_hel(D * 4, 1e-7) and _hel(n * 4, 1e-7)):
        raise Avvis("stygge beløp")
    BE = rD * V                                                 # break-even EBIT
    if not XL < BE * 0.97:
        raise Avvis("resesjonen skal ligge under break-even")
    if not BE < XM:
        raise Avvis("break-even skal ligge under normal EBIT")
    form = r.choice(["laan", "aksjer"])
    N1 = N - n
    I = rD * D
    eL0, eM0, eH0 = XL / N, XM / N, XH / N
    eL1, eM1, eH1 = (XL - I) / N1, (XM - I) / N1, (XH - I) / N1
    Ee0 = EX / N
    Ee1 = (EX - I) / N1
    rE1 = Ee1 / P
    pe1 = P / Ee1
    DE = D / (V - D)
    tL0, tM0, tH0, tL1, tM1, tH1, tE0, tE1 = _psg([eL0, eM0, eH0, eL1, eM1, eH1, Ee0, Ee1], val)

    navn_t = {"L": "recession", "M": "normal year", "H": "boom"}
    plan = (f"borrow {_m(D, val)} at {_r(rD)} and use all of it to buy back shares at the market price"
            if form == "laan" else
            f"buy back {tall(f * 100, 0)}% of its shares at the market price, financed entirely with new debt at "
            f"{_r(rD)}")
    tab = (f"<table><tr><th>State</th><th>Probability</th><th>EBIT ({val} million)</th></tr>"
           f"<tr><td>Recession</td><td>{tall(qL, 2)}</td><td>{_a(XL)}</td></tr>"
           f"<tr><td>Normal year</td><td>{tall(qM, 2)}</td><td>{_a(XM)}</td></tr>"
           f"<tr><td>Boom</td><td>{tall(qH, 2)}</td><td>{_a(XH)}</td></tr></table>")
    case = (f"<p>{navn} is financed entirely with equity: {N} million shares at {_ps(P, val)}. Its EBIT next year "
            f"depends on the economy:</p>{tab}"
            f"<p>The same distribution applies every year forever. There are no taxes, all earnings are paid out "
            f"and markets are perfect. The CFO proposes to {plan}. The debt is risk-free and permanent.</p>"
            f"<p>Give EPS with four decimals, amounts in millions and rates in percent with two decimals.</p>")

    # ---------------- (a) EPS i hver tilstand uten gjeld
    fa = [Felle(q * x / N, f"You weighted the {navn_t[k]} EBIT by its probability. EPS in a state is that state's "
                           f"EBIT per share.", i=i)
          for i, (k, q, x) in enumerate((("L", qL, XL), ("M", qM, XM), ("H", qH, XH)))]
    fa += [Felle(x / V, "You divided EBIT by the market value of the equity. That is the return on the "
                              "assets as a ratio, not earnings per share.", i=i)
           for i, x in enumerate((XL, XM, XH)) if abs(x / V - x / N) > 0.01 * x / N]
    sa = [T("EPS recession", eL0, _u(val, "per share")), T("EPS normal", eM0, _u(val, "per share")),
          T("EPS boom", eH0, _u(val, "per share"))]
    a = tall_del(
        "a", poeng=3,
        q=f"<p>What is {gen(navn)} EPS in each state today, before any debt is issued?</p>",
        svar=sa,
        kort=(f"<p><b>{tL0}, {tM0} and {tH0}.</b> No debt and no taxes, so EPS = "
              f"EBIT/{N}.</p>"),
        losning=(f"<p>Earnings per share is what the shareholders earn divided by the number of shares. With no debt "
                 f"and no taxes all of EBIT belongs to the shareholders. The share count is the same in every state, "
                 f"so EPS moves exactly in step with EBIT.</p>"
                 f"<p><b>Step 1: recession.</b> {_a(XL)}/{N} = <b>{tL0}</b>.</p>"
                 f"<p><b>Step 2: normal year.</b> {_a(XM)}/{N} = <b>{tM0}</b>.</p>"
                 f"<p><b>Step 3: boom.</b> {_a(XH)}/{N} = <b>{tH0}</b>.</p>"
                 f"<p><b>First check.</b> Expected EPS = {tall(qL, 2)} × {_a(eL0)} + {tall(qM, 2)} × {_a(eM0)} + "
                 f"{tall(qH, 2)} × {_a(eH0)} = {_a(Ee0)}. Divided by the price: {_a(Ee0)}/{_a(P)} = {_r(rU)}, the "
                 f"return on the assets r<sub>U</sub>, as it must be for an all-equity firm that pays out "
                 f"everything.</p>"
                 f"<p><b>Remember:</b> EPS is per state and per share. The probabilities only enter when you want "
                 f"the expected EPS.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) aksjer kjøpt og EPS etter i resesjon og boom
    fb = [
        Felle((XL - I) / N, f"You divided by the old {N} million shares. The buyback retires {_a(n)} million.", i=1),
        Felle(XL / N1, f"You left out the interest of {_a(I)}. The lenders are paid before the shareholders.", i=1),
        Felle((XH - I) / N, f"You divided by the old {N} million shares. The buyback retires {_a(n)} million.", i=2),
        Felle(XH / N1, f"You left out the interest of {_a(I)}. The lenders are paid before the shareholders.", i=2),
        Felle((XL - D) / N1, "You subtracted the whole loan. Only the interest is paid each year; the debt is "
                             "permanent.", i=1) if XL - D > 0 else None,
    ]
    if form == "aksjer":
        fb.append(Felle(D, "This is the amount borrowed in millions, not the number of shares.", i=0))
    else:
        fb.append(Felle(D / (P * (1 + rD)), "You bought the shares at a price grossed up by the interest rate. The "
                                            "price stays at the market price.", i=0))
    sb = [T("n", n, "million shares"), T("EPS recession", eL1, _u(val, "per share")),
          T("EPS boom", eH1, _u(val, "per share"))]
    ntekst = (f"n = {_a(D)}/{_a(P)} = {_a(n)} million" if form == "laan" else
              f"n = {tall(f, 2)} × {N} = {_a(n)} million, paid with D = {_a(n)} × {_a(P)} = {_a(D)}")
    b = tall_del(
        "b", poeng=4,
        q=("<p>How many shares does the firm buy back? What is EPS after the buyback in a recession and in a "
           "boom?</p>"),
        selvstendig=True,
        svar=sb,
        kort=(f"<p><b>n = {_a(n)} million; EPS {tL1} in a recession and {tH1} in a boom.</b> "
              f"Interest {_r(rD)} × {_a(D)} = {_a(I)}: ({_a(XL)} − {_a(I)})/{_a(N1)} and ({_a(XH)} − {_a(I)})/"
              f"{_a(N1)}.</p>"),
        losning=(f"<p>After the buyback the lenders take a fixed {_a(I)} a year and the rest of EBIT is shared by "
                 f"fewer shares. The fixed claim makes EPS swing more than EBIT does.</p>"
                 f"<p><b>Step 1: the shares.</b> The price stays at {_ps(P, val)} (MM I), so {ntekst}, leaving "
                 f"{_a(N1)} million.</p>"
                 f"<p><b>Step 2: the interest.</b> {_r(rD)} × {_a(D)} = {_a(I)} a year.</p>"
                 f"<p><b>Step 3: EPS.</b> Recession: ({_a(XL)} − {_a(I)})/{_a(N1)} = <b>{tL1}</b>, "
                 f"against {tL0} without debt. Boom: ({_a(XH)} − {_a(I)})/{_a(N1)} = "
                 f"<b>{tH1}</b>, against {tH0}. A normal year gives ({_a(XM)} − {_a(I)})/"
                 f"{_a(N1)} = {tM1}.</p>"
                 f"<p><b>First check.</b> Without debt EPS moves by {_a(eH0 - eL0)} from recession to boom. With "
                 f"debt it moves by {_a(eH1 - eL1)}, which is {_a(eH0 - eL0)} × {_a(N)}/{_a(N1)}: the same EBIT swing "
                 f"spread over fewer shares. It can fail if the interest is charged in only one state.</p>"
                 f"<p><b>Remember:</b> interest, not principal, is paid each year. Divide by the shares left after "
                 f"the buyback.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) break-even
    fc = [
        Felle(I, f"This is the interest bill. At that EBIT the levered firm earns nothing for its shareholders, while "
                 f"the unlevered firm still earns {_ps(I / N, val)} per share.", i=0),
        Felle(rD * P, "This is EPS at the break-even point, a figure per share. The question asks for the firm's "
                      "EBIT.", i=0),
        Felle(BE - I, "These are the earnings left for the shareholders at the break-even point, not EBIT.", i=0),
    ]
    if abs(BE - 2 * I) < 1e-9:                                  # halvparten lånt: rentene = eiernes resultat ved BE
        fc[0] = Felle(I, "This is the interest bill, which here also equals the shareholders' earnings at the "
                         "break-even point. Neither is the firm's EBIT.", i=0)
        fc.pop(2)
    sc = [T("EBIT", BE, _u(val, "million"))]
    c = tall_del(
        "c", poeng=3,
        q="<p>At what level of EBIT is EPS the same with and without the buyback?</p>",
        gitt=f"<p>From (b): the firm buys back {_a(n)} million shares and pays {_a(I)} of interest a year.</p>",
        svar=sc,
        kort=(f"<p><b>EBIT = {_m(BE, val)}.</b> EBIT/{N} = (EBIT − {_a(I)})/{_a(N1)} gives EBIT × {_a(n)} = "
              f"{_a(I)} × {N}.</p>"),
        losning=(f"<p>Leverage helps EPS only when the assets earn more than the debt costs. The break-even EBIT is "
                 f"where the return on the assets equals the interest rate.</p>"
                 f"<p><b>Step 1: equate.</b> EBIT/{N} = (EBIT − {_a(I)})/{_a(N1)}.</p>"
                 f"<p><b>Step 2: cross-multiply.</b> {_a(N1)} × EBIT = {N} × EBIT − {N} × {_a(I)}, so {_a(n)} × EBIT "
                 f"= {_a(N * I)}.</p>"
                 f"<p><b>Step 3: solve.</b> EBIT = {_a(N * I)}/{_a(n)} = <b>{_m(BE, val)}</b>.</p>"
                 f"<p><b>First check.</b> A short cut gives the same: EBIT = r<sub>D</sub> × V = {_r(rD)} × "
                 f"{_a(V)} = {_a(BE)}, the EBIT at which the assets earn exactly r<sub>D</sub>. At that EBIT both "
                 f"capital structures give EPS = {_ps(BE / N, val)}. The recession EBIT {_a(XL)} lies below it, so "
                 f"debt lowers EPS there. The normal and boom EBIT lie above it.</p>"
                 f"<p><b>Remember:</b> the answer is a level of EBIT for the whole firm, not EPS and not the "
                 f"shareholders' earnings.</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) forventet EPS, r_E og P/E etter
    rE1v = rund(rE1, 6)                                        # viste tall regnes fra eksakte verdier
    pe1v = rund(pe1, 4)
    fd = [
        Felle((EX - I) / N, f"You divided by the old {N} million shares.", i=0),
        Felle(Ee0, "This is expected EPS before the buyback.", i=0),
        Felle((rU + f * (rU - rD)) * 100, "You used D/V instead of D/E in MM II.", i=1),
        Felle(rU * 100, "This is r<sub>U</sub>, the cost of capital without debt. The equity is now levered.", i=1),
        Felle(1 / rU, "This is the P/E before the buyback. EPS has changed and the price has not.", i=2),
    ]
    sd = [T("E[EPS]", Ee1, _u(val, "per share")), T("r<sub>E</sub>", rE1 * 100, "%"), T("P/E", pe1)]
    d = tall_del(
        "d", poeng=4,
        q="<p>Find the expected EPS after the buyback, the new cost of equity r<sub>E</sub> and the P/E ratio.</p>",
        gitt=(f"<p>From (b): {_a(N1)} million shares remain and the interest is {_a(I)} a year. EPS is "
              f"{tL1} in a recession and {tH1} in a boom.</p>"),
        svar=sd,
        kort=(f"<p><b>E[EPS] = {tE1}, r<sub>E</sub> = {_r(rE1v, 2)}, P/E = {tall(pe1v, 4)}.</b> "
              f"E[EPS] = ({_a(EX)} − {_a(I)})/{_a(N1)}; r<sub>E</sub> = E[EPS]/P since everything is paid out.</p>"),
        losning=(f"<p>With no growth and full payout, a share is a perpetuity of its expected EPS, so P = "
                 f"E[EPS]/r<sub>E</sub>. The price is unchanged (MM I), so the higher expected EPS must come with a "
                 f"higher r<sub>E</sub>.</p>"
                 f"<p><b>Step 1: expected EPS.</b> E[EBIT] = {tall(qL, 2)} × {_a(XL)} + {tall(qM, 2)} × {_a(XM)} + "
                 f"{tall(qH, 2)} × {_a(XH)} = {_a(EX)}. E[EPS] = ({_a(EX)} − {_a(I)})/{_a(N1)} = "
                 f"<b>{tE1}</b>, up from {tE0}.</p>"
                 f"<p><b>Step 2: r<sub>E</sub>.</b> {_a(rund(Ee1, 4))}/{_a(P)} = <b>{_r(rE1v, 2)}</b>.</p>"
                 f"<p><b>Step 3: P/E.</b> {_a(P)}/{_a(rund(Ee1, 4))} = <b>{tall(pe1v, 4)}</b>, down from "
                 f"{_a(P)}/{_a(Ee0)} = {tall(1 / rU, 4)}.</p>"
                 f"<p><b>First check.</b> MM II with D/E = {_a(D)}/{_a(V - D)} = {_b(DE)}: {_r(rU)} + {_b(DE)} × "
                 f"({_r(rU)} − {_r(rD)}) = {_r(rU + rund(DE, 4) * (rU - rD), 2)}. The earnings route and the MM II "
                 f"route agree. They use different inputs, so the check can fail.</p>"
                 f"<p><b>Remember:</b> higher expected EPS at the same price means a higher r<sub>E</sub> and a lower "
                 f"P/E. It is pay for risk.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) intuisjon
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>The CFO argues that the buyback is good for the shareholders because expected EPS rises. Use your "
           f"results to explain what the buyback does to the shareholders' risk and why the share price does not "
           f"change.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (d): EPS goes from {tL0} to {tL1} in a recession and from "
              f"{tH0} to {tH1} in a boom; the break-even EBIT is {_a(BE)}; r<sub>E</sub> rises "
              f"from {_r(rU)} to {_r(rE1v, 2)}.</p>"),
        kort=(f"<p>Leverage magnifies the swings: EPS falls further in a recession ({tL0} → "
              f"{tL1}, since EBIT is below the break-even {_a(BE)}) and rises further in a boom. Expected "
              f"EPS rises only as pay for that extra risk, so r<sub>E</sub> rises to {_r(rE1v, 2)} and the P/E falls. "
              f"The price stays at {_ps(P, val)} (MM I): any shareholder could have created the same leverage by "
              f"borrowing on her own account.</p>"),
        losning=(f"<p>Debt adds a fixed claim of {_a(I)} a year in front of the shareholders. When EBIT is high the "
                 f"fixed claim takes a small share and the rest goes to fewer shares, so EPS rises. When EBIT is low "
                 f"the fixed claim takes a large share, so EPS falls below the unlevered level. The break-even EBIT "
                 f"of {_a(BE)} is where the two cross.</p>"
                 f"<p>So the shareholders bear more risk per share. They demand a higher return, which is why "
                 f"r<sub>E</sub> rises from {_r(rU)} to {_r(rE1v, 2)} and the P/E falls. Price = E[EPS]/r<sub>E</sub> "
                 f"stays at {_ps(P, val)}. An investor who wanted more risk could have borrowed herself and bought "
                 f"more shares (homemade leverage), so the firm adds nothing by doing it for her.</p>"
                 f"<p><b>Typical mistakes:</b> saying the price rises because EPS rises (the EPS fallacy), or "
                 f"saying it falls because r<sub>E</sub> rises. Both halves move together.</p>"
                 f"<p><b>Remember:</b> leverage is a lever on EPS in both directions. In a perfect market it moves "
                 f"risk, not value.</p>"),
        kriterier=[
            "Explains that debt magnifies EPS in both directions: EPS falls further in a recession (EBIT below the "
            "break-even) and rises further in a boom (1 p)",
            "Concludes that the higher expected EPS is compensation for more risk: r<sub>E</sub> rises and the P/E "
            "falls (1 p)",
            "States that the price is unchanged (MM I), for example because shareholders can create the same leverage "
            "themselves (homemade leverage) (1 p)",
        ],
    )
    return _ovelse("ov-mm4", case, [a, b, c, d, e])
