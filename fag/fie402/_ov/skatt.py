# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: skatt, skatteskjoldet og avveiningen (skribent 1).

   ov-skt1  rekapitalisering med skatt og permanent gjeld: τ_c D, kurshopp ved kunngjøringen,
            aksjer kjøpt tilbake til ny kurs, nytt utbytte og ny r_E fra utbytte over kurs
            (forelesning 3 lysbilde 16–18, PS1 E4 c–d, V2022 P1)
   ov-skt2  permanent gjeld τ_c D mot forventede konkurskostnader: beste gjeldsnivå, kursen ved
            kunngjøringen og hvem som bærer kostnadene (forelesning 4, A8, D6)
   ov-skt3  lån med bare renter i N år mot permanent gjeld og gjeld som følger verdien:
            skjoldet som annuitet med r_D, τ_c D og τ_c r_D D/r_U (forelesning 3 lysbilde 11–13, B8)

   Konvensjonene (docs/fie402-trening-spek.md § 3b): bare renter gir skjold, aldri hovedstolen,
   permanent gjeld gir τ_c D, fast plan diskonteres med r_D og gjeld som følger verdien med r_U.
   Kostnaden for egenkapitalen ved permanent gjeld regnes som utbytte over kurs (ikke med
   formelen r_U + (D/E)(1 − τ)(r_U − r_D), som er hjemmeoppgavestoff).
"""
from ov_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------- hjelpere
def _sjekk(vist, eksakt, rel=0.001):
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-12):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _pr(x):
    for d in (0, 1, 2, 3):
        if abs(x * 100 - rund(x * 100, d)) < 1e-9:
            return prosent_tekst(x * 100, d)
    return prosent_tekst(x * 100, 4)


def _b(x):
    return tall(x, 2) if abs(x - rund(x, 2)) < 1e-12 else tall(x, 4)


def _m(x, kr, d=2):
    return f"{penger(x, d, kr)} million"


def _a(x):
    """Beløp med to desimaler bare når de trengs: 1 000 og 1 033.75."""
    return tall(x, 0) if abs(x - round(x)) < 1e-9 else tall(x, 2)


def _x(x):
    """To desimaler når de holder (143.00), ellers fire (102.2727)."""
    return tall(x, 2) if abs(x * 100 - round(x * 100)) < 1e-6 else tall(x, 4)


def _filtrer(feller, svar, rel=0.004, abs_=None):
    """Feller for tallene i svar (spek § 2). Ligger en felle innenfor 0.4 % av svaret (eller innenfor
       svarets absolutte toleranse), godtas en gal metode eller et svar avvises uten forklaring: da
       avvises hele varianten. Appen kjenner igjen en felle innenfor 0.2 % (eller den absolutte
       toleransen), så bare feller så nær hverandre slås sammen til én tekst med én innledning.
       Feller lenger fra hverandre beholdes hver for seg."""
    ut, tekster = [], []
    for f in feller:
        if f is None:
            continue
        v = svar[f.i]
        tol_abs = (abs_[f.i] or 0) if abs_ else 0
        if abs(f.verdi - v) <= max(rel * abs(v), tol_abs):
            raise Avvis(f"fella «{str(f.tekst)[:50]}» ligger for nær svaret")
        for k, g in enumerate(ut):
            if g.i == f.i and abs(g.verdi - f.verdi) <= max(0.002 * max(abs(g.verdi), 1e-9), tol_abs):
                tekster[k].append(f.tekst)
                break
        else:
            ut.append(f)
            tekster.append([f.tekst])
    for g, ts in zip(ut, tekster):
        if len(ts) > 1:
            antall = {2: "Two", 3: "Three"}.get(len(ts), "Several")
            g.tekst = f"{antall} slips give this number. " + " ".join(f"({k}) {t}" for k, t in enumerate(ts, 1))
    return ut


def _ann(r, n):
    return (1 - (1 + r) ** -n) / r


def _verdi(r):
    """Trekk EBIT, skatt og r_U slik at V^U blir et rundt tall."""
    tau = r.choice([0.22, 0.25, 0.30, 0.40])
    rf = r.choice([0.03, 0.035, 0.04, 0.045, 0.05])
    mrp = r.choice([0.05, 0.055, 0.06])
    bU = r.choice([0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4])
    rU = rf + bU * mrp
    EBIT = r.randrange(50, 401, 10)
    VU = EBIT * (1 - tau) / rU
    if abs(VU / 10 - round(VU / 10)) > 1e-9 or not 400 <= VU <= 4000:
        raise Avvis("V^U er ikke et rundt tall")
    VU = round(VU)
    return tau, rf, mrp, bU, rU, EBIT, VU


# =====================================================================================
# ov-skt1 · Rekapitalisering med skatt
# =====================================================================================
FIRMA1 = ["Hallingdal Sement ASA", "Nordfôr ASA", "Kvitfjell Kraft ASA", "Sognefjord Bryggeri ASA",
          "Ålesund Isfabrikk ASA", "Mjøsa Mølle ASA", "Tromsø Kjøl ASA", "Agder Asfalt ASA"]


@oppgave("ov-skt1", tema="skatt", tittel="A recapitalisation with taxes", antall=12,
         sjanger="wacc-apv", kilde="Lecture 3 slides 16–18, PS1 E4 (c–d), V2022 P1")
def _(r):
    fi = r.choice(FIRMA1)
    kr = r.choice(["NOK", "NOK", "$"])
    tau, rf, mrp, bU, rU, EBIT, VU = _verdi(r)
    N = r.choice([20, 25, 40, 50, 80])
    P0 = VU / N
    if abs(P0 * 100 - round(P0 * 100)) > 1e-6 or P0 < 8:
        raise Avvis("startkursen er ikke pen")
    gi_rm = r.random() < 0.4
    rD = rf + r.choice([0.0, 0.0, 0.005, 0.01])
    mal = r.random() < 0.35                               # gjeld satt som mål for D/V etter rekapen
    if mal:
        d = r.choice([0.25, 0.30, 0.40])
        D = d * VU / (1 - d * tau)
    else:
        D = round(r.choice([0.2, 0.3, 0.4, 0.5]) * VU / 10) * 10
        d = None
    if (EBIT - rD * D) <= 0.3 * EBIT:
        raise Avvis("for lite overskudd etter renter")
    PVTS = tau * D
    VL = VU + PVTS
    P1 = VL / N
    n = D / P1
    N1 = N - n
    E1 = VL - D
    div = (EBIT - rD * D) * (1 - tau) / N1
    rE = div / P1
    # vist
    Dv = rund(D, 4)
    PVTSv = rund(tau * Dv, 4)
    P1v = rund((VU + PVTSv) / N, 4)
    nv = rund(Dv / P1v, 4)
    N1v = rund(N - nv, 4)
    E1v = rund(VU + PVTSv - Dv, 4)
    nettov = rund((EBIT - rD * Dv) * (1 - tau), 4)
    divv = rund(nettov / N1v, 4)
    rEv = rund(divv / P1v, 6)
    for vist, eks in ((P1v, P1), (nv, n), (E1v, E1), (divv, div), (rEv, rE)):
        _sjekk(vist, eks, 0.0008)

    # feller
    rm = rf + mrp
    f_VU_uten = EBIT / rU
    f_P0_uten = f_VU_uten / N
    f_P0_rm = EBIT * (1 - tau) / (rf + bU * rm) / N
    f_ts_ett = tau * rD * Dv
    f_ts_rU = tau * rD * Dv / rU
    f_P1_uendret = P0
    f_P1_etter = (VU + PVTSv) / (N - Dv / P0)
    f_P1_kasse = (VU + Dv) / N
    f_ts_dVU = tau * d * VU if mal else None
    f_P1_dVU = (VU + tau * d * VU) / N if mal else None
    f_n_gammel = Dv / P0
    f_E1_utenTS = VU - Dv
    f_E1_VL = VU + PVTSv
    f_div_utenrente = EBIT * (1 - tau) / N1v
    f_div_utenskatt = (EBIT - rD * Dv) / N1v
    f_rE_mm2 = rU + Dv / E1v * (rU - rD)
    f_rE_P0 = divv / P0

    marked = (f"the expected return on the market portfolio is {_pr(rm)}" if gi_rm else
              f"the market risk premium is {_pr(mrp)}")
    gjeld = ("risk-free" if rD == rf else f"with an expected return of {_pr(rD)}")
    if mal:
        plan = (f"borrow permanent debt ({gjeld}) so that debt will be {tall(d, 2)} of the firm's value after the "
                f"transaction. It will keep that amount of debt outstanding forever and use all of it to buy back "
                f"shares")
    else:
        plan = (f"borrow {_m(Dv, kr, 0)} of permanent debt ({gjeld}). It will keep that amount outstanding forever "
                f"and use all of it to buy back shares")
    rente_txt = "the risk-free rate" if rD == rf else _pr(rD)
    case = (f"<p>{fi} is financed entirely with equity and has {tall(N, 0)} million shares. It expects EBIT of "
            f"{_m(EBIT, kr, 0)} every year forever. Capital expenditure equals depreciation, working capital is "
            f"constant and all earnings are paid out as dividends at the end of each year. Its equity beta is "
            f"{_b(bU)}. The risk-free rate is {_pr(rf)}, {marked} and the corporate tax rate is {_pr(tau)}. Markets "
            f"are perfect apart from corporate taxes.</p>"
            f"<p>The board announces, as a surprise, that {fi} will {plan}. Interest is paid at "
            f"{rente_txt} at the end of each year. The shares are bought back at the market price after the "
            f"announcement.</p>"
            f"<p>Give amounts in {kr} million with two decimals. Give prices per share and rates in percent with "
            f"four decimals.</p>")

    mrp_txt = f"The market risk premium is {_pr(rm)} − {_pr(rf)} = {_pr(mrp)}. " if gi_rm else ""
    a = tall_del(
        "a", poeng=3,
        q=f"<p>What are {gen(fi)} value V<sup>U</sup> and its share price before the announcement?</p>",
        svar=[T("V<sup>U</sup>", VU, kr + " million"), T("share price", P0, kr + " per share")],
        kort=(f"<p><b>V<sup>U</sup> = {_m(VU, kr, 0)}, {penger(P0, 2, kr)} per share.</b> r<sub>U</sub> = "
              f"{pst(rU, 4)}; V<sup>U</sup> = {tall(EBIT, 0)} × {tall(1 - tau, 2)}/{pst(rU, 4)}.</p>"),
        losning=(f"<p>An all-equity firm is worth its free cash flow discounted at r<sub>U</sub>. With capital "
                 f"expenditure equal to depreciation and constant working capital, FCF = EBIT(1 − τ<sub>c</sub>), a "
                 f"level perpetuity. This is the value before anyone knows about the debt, the baseline the "
                 f"recapitalisation is measured against.</p>"
                 f"<p><b>Step 1: r<sub>U</sub>.</b> {mrp_txt}The firm has no debt, so β<sub>U</sub> = "
                 f"{_b(bU)}: r<sub>U</sub> = {_pr(rf)} + {_b(bU)} × {_pr(mrp)} = {pst(rU, 4)}.</p>"
                 f"<p><b>Step 2: value.</b> FCF = {tall(EBIT, 0)} × {tall(1 - tau, 2)} = {_a(EBIT * (1 - tau))}; "
                 f"V<sup>U</sup> = {_a(EBIT * (1 - tau))}/{pst(rU, 4)} = <b>{_m(VU, kr, 0)}</b>.</p>"
                 f"<p><b>Step 3: price.</b> {tall(VU, 0)}/{tall(N, 0)} = <b>{penger(P0, 2, kr)}</b>.</p>"
                 f"<p><b>First check.</b> The dividend per share is {_a(EBIT * (1 - tau))}/{tall(N, 0)} = "
                 f"{tall(EBIT * (1 - tau) / N, 4)}; {tall(EBIT * (1 - tau) / N, 4)}/{pst(rU, 4)} = "
                 f"{tall(P0, 2)}. The same calculation per share, so it checks the arithmetic only.</p>"
                 f"<p><b>Remember:</b> tax is charged on EBIT even without debt.</p>"),
        feller=_filtrer([
            Felle(f_VU_uten, "You left out the corporate tax. The shareholders receive EBIT(1 − τ<sub>c</sub>).", i=0),
            Felle(f_P0_uten, "This price ignores the corporate tax on EBIT.", i=1),
            Felle(f_P0_rm, f"You multiplied the beta by the market return {_pr(rm)}. The CAPM uses the premium.", i=1)
            if gi_rm else None,
        ], [VU, P0]),
    )

    if mal:
        d_steg = (f"<p><b>Step 1: the debt.</b> Debt is {tall(d, 2)} of the value after the transaction. That "
                  f"value includes the shield: D = {tall(d, 2)} × (V<sup>U</sup> + τ<sub>c</sub>D), so D = "
                  f"{tall(d, 2)} × {tall(VU, 0)}/(1 − {tall(d, 2)} × {tall(tau, 2)}) = {_x(Dv)}.</p>")
        gitt_c = f"<p>From (b): D = {_x(Dv)} and the price after the announcement is {penger(P1v, 4, kr)}.</p>"
    else:
        d_steg = ""
        gitt_c = f"<p>From (b): the price after the announcement is {penger(P1v, 4, kr)}.</p>"
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Find the present value of the interest tax shield PV(TS) and the share price just after the "
           f"announcement.</p>"),
        gitt=f"<p>From (a): V<sup>U</sup> = {tall(VU, 0)} and the price before the announcement is "
             f"{penger(P0, 2, kr)}.</p>",
        svar=[T("PV(TS)", PVTS, kr + " million"), T("price after the announcement", P1, kr + " per share")],
        kort=(f"<p><b>PV(TS) = {_x(PVTSv)}, {penger(P1v, 4, kr)} per share.</b> Permanent debt: "
              f"τ<sub>c</sub>D = {tall(tau, 2)} × {_x(Dv)}; ({tall(VU, 0)} + {_x(PVTSv)})/{tall(N, 0)}.</p>"),
        losning=(f"<p>Permanent debt gives a tax saving of τ<sub>c</sub> × interest every year forever, as safe as the "
                 f"interest itself. Discounted at r<sub>D</sub> it is worth τ<sub>c</sub>D. The market prices it the "
                 f"moment the plan is announced, before any debt is issued, so the gain lands on today's "
                 f"shareholders.</p>"
                 f"{d_steg}"
                 f"<p><b>Step {2 if mal else 1}: the shield.</b> PV(TS) = τ<sub>c</sub> × r<sub>D</sub>D/r<sub>D</sub> = "
                 f"τ<sub>c</sub>D = {tall(tau, 2)} × {_x(Dv)} = <b>{_x(PVTSv)}</b>.</p>"
                 f"<p><b>Step {3 if mal else 2}: the announcement.</b> V<sup>L</sup> = {tall(VU, 0)} + {_x(PVTSv)} "
                 f"= {_x(VU + PVTSv)}, still all equity on {tall(N, 0)} million shares: "
                 f"<b>{penger(P1v, 4, kr)}</b>, a rise of {tall(P1v - P0, 4)} per share.</p>"
                 f"<p><b>First check.</b> The rise times the shares is {tall((P1v - P0) * N, 2)} = PV(TS) up to "
                 f"rounding: the whole shield goes to the existing shareholders.</p>"
                 f"<p><b>Remember:</b> permanent debt means τ<sub>c</sub>D at once. The price moves at the "
                 f"announcement.</p>"),
        feller=_filtrer([
            Felle(f_ts_ett, "This is one year's tax saving. Permanent debt saves it every year forever.", i=0),
            Felle(f_ts_rU, "You discounted the shield at r<sub>U</sub>. A fixed, permanent amount of debt gives a "
                           "shield as safe as the debt.", i=0),
            Felle(f_P1_uendret, "The price does not stay put: with taxes the shield is new value, priced at the "
                                "announcement.", i=1),
            Felle(f_P1_etter, "You divided by the shares left after the buyback. At the announcement no shares "
                              "have been bought yet.", i=1),
            Felle(f_P1_kasse, "You added the borrowed cash to the value. It goes straight back out in the buyback; "
                              "only the shield is new value.", i=1),
            Felle(f_ts_dVU, f"You set the debt to {tall(d, 2)} × V<sup>U</sup>. The value after the transaction "
                            f"includes the shield, so D = {tall(d, 2)} × (V<sup>U</sup> + τ<sub>c</sub>D).", i=0)
            if mal else None,
            Felle(f_P1_dVU, f"This price uses debt of {tall(d, 2)} × V<sup>U</sup>. The target is a share of the "
                            f"value after the transaction, which includes the shield.", i=1) if mal else None,
        ], [PVTS, P1]),
    )

    c = tall_del(
        "c", poeng=4,
        q="<p>How many shares does the firm buy back? What is the market value of its equity after the buyback?</p>",
        gitt=gitt_c,
        svar=[T("shares bought back", n, "million shares"), T("equity after the buyback", E1, kr + " million")],
        kort=(f"<p><b>{tall(nv, 4)} million shares; E = {f"{penger(E1v, 4 if abs(E1v * 100 - round(E1v * 100)) > 1e-6 else 2, kr)} million"}.</b> {_x(Dv)}/{tall(P1v, 4)}; "
              f"E = {_x(VU + PVTSv)} − {_x(Dv)}.</p>"),
        losning=(f"<p>The buyback happens at the price after the announcement: nobody sells for less. Buying at the "
                 f"old price is the mistake Kurbatov calls the biggest one in this exercise. The equity then shrinks by "
                 f"exactly the cash paid out, while the shield stays in the firm.</p>"
                 f"<p><b>Step 1: shares.</b> {_x(Dv)}/{tall(P1v, 4)} = <b>{tall(nv, 4)} million</b>, leaving "
                 f"{tall(N, 0)} − {tall(nv, 4)} = {tall(N1v, 4)} million.</p>"
                 f"<p><b>Step 2: equity.</b> E = V<sup>L</sup> − D = {_x(VU + PVTSv)} − {_x(Dv)} = "
                 f"<b>{f"{penger(E1v, 4 if abs(E1v * 100 - round(E1v * 100)) > 1e-6 else 2, kr)} million"}</b>.</p>"
                 f"<p><b>First check.</b> {_x(E1v)}/{tall(N1v, 4)} = {tall(E1v / N1v, 4)}, the announcement "
                 f"price: the buyback itself does not move the price. Bought at the old {tall(P0, 2)} instead, the "
                 f"firm would retire {tall(Dv / P0, 4)} million shares and imply a price of "
                 f"{tall(E1v / (N - Dv / P0), 2)}: two prices for one share.</p>"
                 f"<p><b>Remember:</b> shares bought back = cash / new price.</p>"),
        feller=_filtrer([
            Felle(f_n_gammel, f"You bought back at the old price of {tall(P0, 2)}. The sellers demand the price "
                              f"after the announcement.", i=0),
            Felle(f_E1_utenTS, "You left out the tax shield: equity is V<sup>U</sup> + PV(TS) − D.", i=1),
            Felle(f_E1_VL, "You forgot to subtract the debt. The equity is what is left after the lenders.", i=1),
        ], [n, E1]),
    )

    d_ = tall_del(
        "d", poeng=3,
        q=(f"<p>What is the expected dividend per share at the end of next year? What is {gen(fi)} new cost of "
           f"equity?</p>"),
        gitt=(f"<p>From (b) and (c): the price is {penger(P1v, 4, kr)}, D = {_x(Dv)} and {tall(N1v, 4)} million "
              f"shares remain.</p>"),
        svar=[T("dividend per share", div, kr + " per share"), T("r<sub>E</sub>", rE * 100, "%")],
        kort=(f"<p><b>{penger(divv, 4, kr)} per share; r<sub>E</sub> = {pst(rEv, 4)}.</b> "
              f"({tall(EBIT, 0)} − {_pr(rD)} × {_x(Dv)}) × {tall(1 - tau, 2)}/{tall(N1v, 4)}; "
              f"r<sub>E</sub> = dividend/price.</p>"),
        losning=(f"<p>All earnings are still paid out, so each share is a level perpetuity. Its cost of equity is "
                 f"the dividend divided by the price. This is the course's route with permanent debt: the "
                 f"formula-sheet MM II assumes a constant D/V and does not apply here.</p>"
                 f"<p><b>Step 1: earnings after interest and tax.</b> ({tall(EBIT, 0)} − {_pr(rD)} × {_x(Dv)}) × "
                 f"{tall(1 - tau, 2)} = {tall(nettov, 4)}.</p>"
                 f"<p><b>Step 2: per share.</b> {tall(nettov, 4)}/{tall(N1v, 4)} = <b>{penger(divv, 4, kr)}</b>, up "
                 f"from {tall(EBIT * (1 - tau) / N, 4)} before.</p>"
                 f"<p><b>Step 3: cost of equity.</b> r<sub>E</sub> = {tall(divv, 4)}/{tall(P1v, 4)} = "
                 f"<b>{pst(rEv, 4)}</b>, above r<sub>U</sub> = {pst(rU, 4)}: the equity now carries financial "
                 f"risk.</p>"
                 f"<p><b>First check.</b> The after-tax WACC, (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − "
                 f"τ<sub>c</sub>) = ({_x(E1v)} × {pst(rEv, 4)} + {_x(Dv)} × {_pr(rD)} × {tall(1 - tau, 2)})/"
                 f"{_x(VU + PVTSv)} = {pst((E1v * rEv + Dv * rD * (1 - tau)) / (VU + PVTSv), 4)}, must turn the "
                 f"FCF of {_a(EBIT * (1 - tau))} into V<sup>L</sup>: {_a(EBIT * (1 - tau))}/"
                 f"{pst((E1v * rEv + Dv * rD * (1 - tau)) / (VU + PVTSv), 4)} = "
                 f"{tall(EBIT * (1 - tau) / ((E1v * rEv + Dv * rD * (1 - tau)) / (VU + PVTSv)), 2)}. It does. This is an "
                 f"identity once r<sub>E</sub> came from the dividend, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> with permanent debt, r<sub>E</sub> = equity cash flow / equity value.</p>"),
        feller=_filtrer([
            Felle(f_div_utenrente, "You left out the interest. The lenders are paid before the shareholders.", i=0),
            Felle(f_div_utenskatt, "You left out the corporate tax on the earnings after interest.", i=0),
            Felle(f_rE_mm2 * 100, "You used the formula-sheet MM II. It assumes the firm rebalances to a constant "
                                  "D/V; with permanent debt, divide the dividend by the price.", i=1),
            Felle(f_rE_P0 * 100, f"You divided by the old price of {tall(P0, 2)}. The share now trades at "
                                 f"{tall(P1v, 4)}.", i=1),
        ], [div, rE * 100]),
    )

    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>After the buyback the market value of the equity has fallen from {tall(VU, 0)} to {_x(E1v)}. A "
           f"shareholder who kept her shares says the recapitalisation made the owners poorer. Is she right? Who "
           f"gains, how much and when?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): V<sup>U</sup> = {tall(VU, 0)}, PV(TS) = {_x(PVTSv)}, the price rose from "
              f"{tall(P0, 2)} to {tall(P1v, 4)} and the equity after the buyback is {_x(E1v)}.</p>"),
        kort=(f"<p>She is wrong: the equity fell because {_x(Dv)} of cash went to the shareholders who sold, so "
              f"the owners hold {_x(E1v)} + {_x(Dv)} = {_x(E1v + Dv)}, more than {tall(VU, 0)}. The "
              f"gain is PV(TS) = τ<sub>c</sub>D = {_x(PVTSv)}, taxes the government no longer collects. It is "
              f"captured at the announcement, when the price jumps from {tall(P0, 2)} to {tall(P1v, 4)}, so sellers "
              f"and keepers gain the same {tall(P1v - P0, 4)} per share. The lenders pay a fair price and gain "
              f"nothing; the buyback itself does not move the price.</p>"),
        losning=(f"<p><b>Wealth, not equity value.</b> A buyback swaps shares for cash. Counting both, the original "
                 f"shareholders own {_x(E1v)} of equity plus {_x(Dv)} of cash: {_x(E1v + Dv)}.</p>"
                 f"<p><b>Where the gain comes from.</b> Taxes add a third claimant, the government. Interest is paid "
                 f"before tax, so permanent debt shrinks the government's slice by τ<sub>c</sub>D in present value. "
                 f"Nothing in the operations changed.</p>"
                 f"<p><b>When and to whom.</b> The market prices the shield as soon as the plan is credible, so the "
                 f"price jumps at the announcement and the buyback is done at the new price. Everyone who held a "
                 f"share at the announcement gains {tall(P1v - P0, 4)}, whether she sells or keeps it. Kurbatov's "
                 f"sanity check: sellers and keepers must come out equal.</p>"
                 f"<p><b>Typical mistakes:</b> reading the fall in equity value as a loss. Another is saying the "
                 f"lenders share the gain.</p>"
                 f"<p><b>Remember:</b> with taxes alone, every krone of permanent debt adds τ<sub>c</sub> to the "
                 f"shareholders' wealth.</p>"),
        kriterier=[
            "Says she is wrong: the equity fell because cash was paid out to the sellers; equity plus the cash paid "
            "out exceeds V<sup>U</sup> (1 p)",
            "Identifies the gain as PV(TS) = τ<sub>c</sub>D, taxes the government no longer collects (1 p)",
            "States that the gain arrives at the announcement, when the price jumps, so sellers and keepers gain the "
            "same per share (1 p)",
            "Notes that the lenders pay a fair price and gain nothing; the buyback itself does not move the "
            "price (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d_, e])


# =====================================================================================
# ov-skt2 · Skatteskjold mot forventede konkurskostnader: beste gjeldsnivå
# =====================================================================================
FIRMA2 = [("Stryn Robotikk AS", "a small maker of specialised robots"),
          ("Vigra Flyteknikk AS", "an aircraft-maintenance firm"),
          ("Nesna Havbruksutstyr AS", "a maker of fish-farm equipment"),
          ("Røros Smie AS", "a forge with custom machinery"),
          ("Bømlo Subsea AS", "a subsea-equipment maker"),
          ("Lesja Laboratorier AS", "a contract laboratory"),
          ("Vefsn Verktøy AS", "a tool maker with specialised plants"),
          ("Frøya Fôrteknikk AS", "a maker of feeding systems")]


@oppgave("ov-skt2", tema="skatt", tittel="The tax shield against expected distress costs", antall=12,
         sjanger="mm", kilde="Lecture 4 slides 8–9, PS1 E5, Lecture 3 slide 13")
def _(r):
    fi, beskr = r.choice(FIRMA2)
    kr = r.choice(["NOK", "NOK", "$"])
    tau, rf, mrp, bU, rU, EBIT, VU = _verdi(r)
    N = r.choice([10, 20, 25, 40, 50])
    P0 = VU / N
    if abs(P0 * 100 - round(P0 * 100)) > 1e-6 or P0 < 8:
        raise Avvis("startkursen er ikke pen")
    c = r.choice([0.20, 0.25, 0.30])                     # kostnad ved finansielle problemer, andel av V^U
    C = c * VU
    mål = r.choice([0.06, 0.08, 0.10, 0.12])            # økning i sannsynlighet som gjør et steg nøytralt
    steg = round(mål * C / tau / 10) * 10
    if steg < 30 or 4 * steg > 0.8 * VU:
        raise Avvis("urimelige steg")
    terskel = tau * steg / C
    kstar = r.choice([1, 2, 3])
    inc = []
    for k in range(1, 5):
        f = r.uniform(0.25, 0.75) if k <= kstar else r.uniform(1.4, 2.6)
        inc.append(f * terskel)
    inc.sort()
    p = [0.0]
    for x in inc:
        p.append(p[-1] + x)
    p = [rund(x, 2) for x in p]
    if any(p[k + 1] <= p[k] for k in range(4)) or p[4] > 0.6:
        raise Avvis("sannsynlighetene stiger ikke pent")
    Dk = [k * steg for k in range(5)]
    Vk = [VU + tau * Dk[k] - p[k] * C for k in range(5)]
    best = max(range(5), key=lambda k: Vk[k])
    if best in (0, 4):
        raise Avvis("optimum på randen")
    andre = sorted(Vk[k] for k in range(5) if k != best)
    if Vk[best] - andre[-1] < 0.004 * VU:
        raise Avvis("optimum ikke tydelig")
    Dst, Vst = Dk[best], Vk[best]
    if Vst - VU < 0.006 * VU:
        raise Avvis("gevinsten er for liten: uendret kurs ligger for nær svaret")
    P1 = Vst / N
    n = Dst / P1
    Pv = rund(P1, 4)
    nv = rund(Dst / Pv, 4)
    _sjekk(nv, n, 0.0005)

    # feller
    f_D_maks = Dk[4]
    Vfull = [VU + tau * Dk[k] - (C if p[k] > 0 else 0) for k in range(5)]
    f_D_full = Dk[max(range(5), key=lambda k: Vfull[k])]
    f_V_uten = VU + tau * Dst
    f_V_full = VU + tau * Dst - C
    f_V_maks = Vk[4]
    f_P_uten = (VU + tau * Dst) / N
    f_n_gammel = Dst / P0
    f_n_uten = Dst / f_P_uten

    def rad(navn, xs, fmt):
        return f"<tr><td>{navn}</td>" + "".join(f"<td>{fmt(x)}</td>" for x in xs) + "</tr>"
    tabell = ("<table>" + rad(f"Permanent debt D ({kr} million)", Dk, lambda x: tall(x, 0))
              + rad("Probability of financial distress", p, lambda x: _pr(x)) + "</table>")
    case = (f"<p>{fi} is {beskr}. It is financed entirely with equity and has {tall(N, 0)} million shares. It "
            f"expects EBIT of {_m(EBIT, kr, 0)} every year forever; capital expenditure equals depreciation and "
            f"working capital is constant. Its unlevered cost of capital is {pst(rU, 2)} and the corporate tax rate "
            f"is {_pr(tau)}.</p>"
            f"<p>The board considers issuing permanent debt and using all of it to buy back shares at the market "
            f"price after the announcement. More debt raises the risk of financial distress. Analysts estimate:</p>"
            f"{tabell}"
            f"<p>If distress occurs, it costs {_pr(c)} of the unlevered value in present value, mostly from fire "
            f"sales of the specialised assets and lost customers. Treat the present value of the expected distress "
            f"costs as the probability times that cost. Treat the tax shield of permanent debt as "
            f"τ<sub>c</sub>D.</p>"
            f"<p>Give amounts in {kr} million and the share price with four decimals.</p>")

    a = tall_del(
        "a", poeng=3,
        q=f"<p>What are {gen(fi)} unlevered value V<sup>U</sup> and its share price today?</p>",
        svar=[T("V<sup>U</sup>", VU, kr + " million"), T("share price", P0, kr + " per share")],
        kort=(f"<p><b>V<sup>U</sup> = {_m(VU, kr, 0)}, {penger(P0, 2, kr)} per share.</b> {tall(EBIT, 0)} × "
              f"{tall(1 - tau, 2)}/{pst(rU, 2)}.</p>"),
        losning=(f"<p>Without debt the firm is worth its free cash flow, EBIT(1 − τ<sub>c</sub>), as a perpetuity at "
                 f"r<sub>U</sub>. Capital expenditure equal to depreciation and constant working capital mean nothing "
                 f"else is deducted. Every debt level in the table is compared with this value: debt adds the tax "
                 f"shield and subtracts the expected distress costs.</p>"
                 f"<p><b>Step 1: FCF.</b> {tall(EBIT, 0)} × {tall(1 - tau, 2)} = {_a(EBIT * (1 - tau))}.</p>"
                 f"<p><b>Step 2: value.</b> {_a(EBIT * (1 - tau))}/{pst(rU, 2)} = <b>{_m(VU, kr, 0)}</b>.</p>"
                 f"<p><b>Step 3: price.</b> {tall(VU, 0)}/{tall(N, 0)} = <b>{penger(P0, 2, kr)}</b>.</p>"
                 f"<p><b>First check.</b> The value is {tall(VU / (EBIT * (1 - tau)), 2)} times the after-tax cash "
                 f"flow, which is 1/r<sub>U</sub> = 1/{pst(rU, 2)}. It checks the division only.</p>"
                 f"<p><b>Remember:</b> V<sup>U</sup> is the starting point of the trade-off: V<sup>L</sup> = "
                 f"V<sup>U</sup> + PV(TS) − PV(distress costs).</p>"),
        feller=_filtrer([
            Felle(EBIT / rU, "You left out the corporate tax. Without debt the firm still pays tax on EBIT.", i=0),
            Felle(EBIT / rU / N, "This price ignores the corporate tax on EBIT.", i=1),
        ], [VU, P0]),
    )

    linjer = "; ".join(f"D = {tall(Dk[k], 0)}: {tall(VU, 0)} + {tall(tau * Dk[k], 2)} − {tall(p[k] * C, 2)} = "
                       f"{tall(Vk[k], 2)}" for k in range(1, 5))
    b = tall_del(
        "b", poeng=5,
        q=("<p>Which debt level in the table maximises the value of the firm? Give that debt level and the value of "
           "the firm V<sup>L</sup> at that level.</p>"),
        gitt=f"<p>From (a): V<sup>U</sup> = {tall(VU, 0)}.</p>",
        svar=[T("best debt level D", Dst, kr + " million"), T("V<sup>L</sup> at that level", Vst, kr + " million")],
        kort=(f"<p><b>D = {tall(Dst, 0)}, V<sup>L</sup> = {_m(Vst, kr)}.</b> V<sup>L</sup> = V<sup>U</sup> + "
              f"τ<sub>c</sub>D − p × {tall(C, 0)} for each level; the next step adds {tall(tau * steg, 2)} of shield "
              f"but {tall((p[best + 1] - p[best]) * C, 2)} of expected distress cost.</p>"),
        losning=(f"<p>Trade-off theory: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs). The shield rises "
                 f"in a straight line with D; the expected distress costs rise faster and faster as the probability "
                 f"of distress climbs. The best level is where the next step adds more cost than shield.</p>"
                 f"<p><b>Step 1: the cost if distress occurs.</b> {_pr(c)} × {tall(VU, 0)} = {tall(C, 0)}.</p>"
                 f"<p><b>Step 2: value at each level.</b> D = 0: {tall(VU, 0)}. {linjer}.</p>"
                 f"<p><b>Step 3: pick the maximum.</b> D = <b>{tall(Dst, 0)}</b> with V<sup>L</sup> = "
                 f"<b>{_m(Vst, kr)}</b>.</p>"
                 f"<p><b>First check, at the margin.</b> Each step of {tall(steg, 0)} adds τ<sub>c</sub> × "
                 f"{tall(steg, 0)} = {tall(tau * steg, 2)} of shield. The step up to {tall(Dst, 0)} adds "
                 f"{tall((p[best] - p[best - 1]) * C, 2)} of expected cost, less than the shield; the step beyond adds "
                 f"{tall((p[best + 1] - p[best]) * C, 2)}, more. Comparing margins gives the same answer as comparing "
                 f"levels; it fails if a value was miscomputed.</p>"
                 f"<p><b>Remember:</b> borrow while the marginal shield exceeds the marginal expected distress "
                 f"cost.</p>"),
        feller=_filtrer([
            Felle(f_D_maks, "You ignored the distress costs. With the tax shield alone, more debt always looks "
                            "better.", i=0),
            Felle(f_D_full, "You subtracted the full cost of distress without weighting it by the probability.", i=0),
            Felle(f_V_uten, "This value leaves out the expected distress costs at that level.", i=1),
            Felle(f_V_full, "You subtracted the full cost of distress, not the probability times the cost.", i=1),
            Felle(f_V_maks, f"This is the value at the highest debt level, {tall(Dk[4], 0)}. Distress costs make it "
                            f"lower than at the best level.", i=1),
        ], [Dst, Vst]),
    )

    c_ = tall_del(
        "c", poeng=4,
        q=(f"<p>{fi} announces that it will borrow the amount you found in (b) and buy back shares. What is the share "
           f"price just after the announcement? How many shares does it buy back?</p>"),
        gitt=(f"<p>From (b): D = {tall(Dst, 0)} and V<sup>L</sup> = {tall(Vst, 2)} at that level. Before the "
              f"announcement the price is {penger(P0, 2, kr)}.</p>"),
        svar=[T("price after the announcement", P1, kr + " per share"), T("shares bought back", n, "million shares")],
        kort=(f"<p><b>{penger(Pv, 4, kr)} per share; {tall(nv, 4)} million shares.</b> {tall(Vst, 2)}/{tall(N, 0)}; "
              f"{tall(Dst, 0)}/{tall(Pv, 4)}.</p>"),
        losning=(f"<p>At the announcement the market prices both the tax shield and the expected distress costs. "
                 f"The shareholders receive the net gain, V<sup>L</sup> − V<sup>U</sup> = {tall(Vst - VU, 2)}, through "
                 f"the price. The lenders will pay a fair price for the debt, with the expected distress losses taken "
                 f"into account, so the shareholders bear those costs from the start.</p>"
                 f"<p><b>Step 1: price.</b> All of V<sup>L</sup> is still equity on {tall(N, 0)} million shares: "
                 f"{tall(Vst, 2)}/{tall(N, 0)} = <b>{penger(Pv, 4, kr)}</b>, up {tall(Pv - P0, 4)}.</p>"
                 f"<p><b>Step 2: buyback.</b> The shares are bought at the new price: {tall(Dst, 0)}/{tall(Pv, 4)} = "
                 f"<b>{tall(nv, 4)} million</b>.</p>"
                 f"<p><b>First check.</b> After the buyback E = {tall(Vst, 2)} − {tall(Dst, 0)} = "
                 f"{tall(Vst - Dst, 2)} on {tall(N - nv, 4)} million shares, {tall((Vst - Dst) / (N - n), 4)} per "
                 f"share up to rounding: the price does not move again.</p>"
                 f"<p><b>Remember:</b> the expected distress costs are in the price from day one.</p>"),
        feller=_filtrer([
            Felle(f_P_uten, "This price counts the tax shield but not the expected distress costs.", i=0),
            Felle(P0, "The price moves at the announcement: the net gain of the plan is priced at once.", i=0),
            Felle(f_n_gammel, f"You bought back at the old price of {tall(P0, 2)}.", i=1),
            Felle(f_n_uten, "This share count uses a price that ignores the expected distress costs.", i=1),
        ], [P1, n]),
    )

    dk = best + 1
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>The CFO says: «Bankruptcy costs are tiny: legal fees are about 3% of firm value and the probability "
           f"of bankruptcy is below 1% a year. We should borrow {tall(Dk[4], 0)}, the most in the table.» Explain what "
           f"is wrong with this argument, why the best debt level is {tall(Dst, 0)} and who bears the expected "
           f"distress costs.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b): the best level is D = {tall(Dst, 0)}. Going on to {tall(Dk[dk], 0)} adds "
              f"{tall(tau * steg, 2)} of tax shield and {tall((p[dk] - p[best]) * C, 2)} of expected distress "
              f"costs.</p>"),
        kort=(f"<p>Direct costs such as legal fees are small in expectation, but the indirect costs (fire sales of "
              f"specialised assets, lost customers, suppliers and staff) are large and start before any formal "
              f"bankruptcy; that is the {_pr(c)} in the case. Each step of debt adds {tall(tau * steg, 2)} of shield "
              f"but raises the probability of distress faster and faster: going beyond {tall(Dst, 0)} adds "
              f"{tall((p[dk] - p[best]) * C, 2)} of expected cost, more than the shield, so value falls (trade-off "
              f"theory). The shareholders bear these costs today: lenders price the expected losses into the debt, "
              f"so they reach the share price at the announcement.</p>"),
        losning=(f"<p><b>Direct against indirect.</b> Kurbatov's numbers: direct costs of 3–4% of value for large "
                 f"firms and 20–25% for small ones, times an annual bankruptcy probability under 1%, are tiny in "
                 f"expectation. The costs that matter are indirect: fire sales (specialised assets go for scrap "
                 f"value), customers and suppliers walking away and management time. They arise in distress, long "
                 f"before a court is involved.</p>"
                 f"<p><b>The margin.</b> The shield grows in a straight line: τ<sub>c</sub> × {tall(steg, 0)} = "
                 f"{tall(tau * steg, 2)} per step. The expected distress cost grows with the probability, which "
                 f"rises faster at high leverage. Past {tall(Dst, 0)} the next step costs "
                 f"{tall((p[dk] - p[best]) * C, 2)}, so the firm stops there.</p>"
                 f"<p><b>Who pays.</b> Ex post the losses fall on the lenders, who own the assets in default. Ex ante "
                 f"the lenders foresee them and pay less for the debt, so the shareholders bear them when the debt is "
                 f"issued.</p>"
                 f"<p><b>Typical mistakes:</b> counting the transfer to creditors in default as a cost (only value "
                 f"lost to everyone counts). Another is comparing total gains instead of the gain from the next step.</p>"
                 f"<p><b>Remember:</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs), maximised at the "
                 f"margin.</p>"),
        kriterier=[
            "Says direct costs are small in expectation, but indirect costs (fire sales, lost customers or suppliers) "
            "are large and arise before formal bankruptcy (1 p)",
            "Explains the trade-off at the margin: each step adds a fixed shield, while expected distress costs rise "
            "faster as the probability climbs (1 p)",
            f"Uses the numbers: beyond {tall(Dst, 0)} the extra expected distress cost exceeds the extra shield, so "
            f"value falls (1 p)",
            "States that the shareholders bear the expected distress costs today, because lenders price them into "
            "the debt (1 p)",
        ],
    )
    return ovelse(case, [a, b, c_, d])


# =====================================================================================
# ov-skt3 · Lån med bare renter, permanent gjeld og gjeld som følger verdien
# =====================================================================================
FIRMA3 = ["Drammen Fjernvarme AS", "Bodø Havnelager AS", "Hamar Kornsilo AS", "Florø Forsyningsbase AS",
          "Kongsberg Testsenter AS", "Mosjøen Aluminiumsstøp AS", "Egersund Fiskeindustri AS", "Lillehammer Hotelldrift AS"]


@oppgave("ov-skt3", tema="skatt", tittel="An interest-only loan against permanent and rebalanced debt", antall=12,
         sjanger="wacc-apv", kilde="Lecture 3 slides 11–13, PS2 E9")
def _(r):
    fi = r.choice(FIRMA3)
    kr = r.choice(["NOK", "NOK", "$"])
    D = r.choice([200, 400, 500, 800, 1000, 1500, 2000])
    rD = r.choice([0.04, 0.05, 0.06, 0.07])
    IP = rD * D
    if abs(IP - round(IP)) > 1e-9:
        raise Avvis("renten er ikke et helt beløp")
    IP = round(IP)
    n = r.choice([5, 10, 15, 20, 30])
    tau = r.choice([0.22, 0.25, 0.30, 0.35])
    rU = rD + r.choice([0.02, 0.03, 0.04, 0.05, 0.06])
    M = r.choice([20, 25, 40, 50, 100])

    TS = tau * IP
    A = _ann(rD, n)
    PVA = TS * A
    dP = PVA / M
    PVperm = tau * D
    PVreb = TS / rU
    if abs(PVA - PVreb) < 0.05 * min(PVA, PVreb):
        raise Avvis("lånet og gjelden som følger verdien er for like")
    # vist
    A4 = rund(A, 4)
    PVAv = rund(TS * A4, 4)
    dPv = rund(PVAv / M, 4)
    PVrebv = rund(TS / rU, 4)
    _sjekk(PVAv, PVA, 0.0005)

    # feller
    f_rD_etter = rD * (1 - tau)
    f_TS_IP = IP
    f_TS_1m = (1 - tau) * IP
    f_TS_D = tau * D
    f_PVA_perm = tau * D
    f_PVA_sum = TS * n
    f_PVA_rU = TS * _ann(rU, n)
    f_dP_perm = tau * D / M
    f_dP_sum = TS * n / M
    f_perm_ett = TS
    f_reb_rD = tau * D
    f_reb_ann = TS * _ann(rU, n)

    rangering = sorted([("permanent debt", PVperm), ("the interest-only loan", PVA), ("rebalanced debt", PVreb)],
                       key=lambda x: -x[1])
    rang_txt = " > ".join(f"{navn} ({tall(v, 2)})" for navn, v in rangering)
    lån_størst = PVA > PVreb

    case = (f"<p>{fi} pays corporate tax at {_pr(tau)} and has ample taxable profits. It borrows "
            f"{_m(D, kr, 0)} today on an interest-only loan: it pays interest of {_m(IP, kr, 0)} at the end of each "
            f"year for {n} years and repays the whole principal at the end of Year {n}. The interest rate equals the "
            f"lenders' required return on this debt. Only interest is tax deductible; repaying principal is not.</p>"
            f"<p>{gen(fi)} unlevered cost of capital is {_pr(rU)}. It has {tall(M, 0)} million shares. The loan "
            f"proceeds will be paid out to the shareholders, so the tax shield is the only effect on their wealth. "
            f"The firm does not grow.</p>"
            f"<p>Give rates in percent and amounts with four decimals.</p>")

    a = tall_del(
        "a", poeng=3,
        q="<p>What is the interest rate on the loan? What is the interest tax shield each year?</p>",
        svar=[T("r<sub>D</sub>", rD * 100, "%"), T("tax shield per year", TS, kr + " million")],
        kort=(f"<p><b>r<sub>D</sub> = {pst(rD, 4)}, TS = {tall(TS, 4)} a year.</b> {tall(IP, 0)}/{tall(D, 0)}; "
              f"{tall(tau, 2)} × {tall(IP, 0)}.</p>"),
        losning=(f"<p>Interest is paid before tax, so every krone of interest saves τ<sub>c</sub> in tax. That saving "
                 f"is the interest tax shield. In effect the government pays τ<sub>c</sub> of the interest, which is "
                 f"why debt is cheaper after tax than before.</p>"
                 f"<p><b>Step 1: the rate.</b> Interest over face value: {tall(IP, 0)}/{tall(D, 0)} = "
                 f"<b>{pst(rD, 4)}</b>. Kurbatov: this can be part (a) on its own.</p>"
                 f"<p><b>Step 2: the shield.</b> TS = τ<sub>c</sub> × interest = {tall(tau, 2)} × {tall(IP, 0)} = "
                 f"<b>{tall(TS, 4)}</b> a year, for {n} years.</p>"
                 f"<p><b>First check.</b> The after-tax interest is {tall(IP, 0)} − {tall(TS, 4)} = "
                 f"{tall(IP - TS, 4)} = (1 − τ<sub>c</sub>) × {tall(IP, 0)}: the firm pays only "
                 f"{pst(rD * (1 - tau), 4)} after tax. Mixing τ and 1 − τ is the slip to avoid.</p>"
                 f"<p><b>Remember:</b> the shield is τ<sub>c</sub> times the interest, never times the "
                 f"principal.</p>"),
        feller=_filtrer([
            Felle(f_rD_etter * 100, "This is the after-tax cost of debt. The interest rate on the loan is before "
                                    "tax.", i=0),
            Felle(f_TS_IP, "This is the interest itself. The shield is the tax saved on it.", i=1),
            Felle(f_TS_1m, "You multiplied the interest by (1 − τ<sub>c</sub>). That is the after-tax interest, "
                           "not the tax saved.", i=1),
            Felle(f_TS_D, "You multiplied the principal by the tax rate. Only interest is deductible.", i=1),
        ], [rD * 100, TS]),
    )

    b = tall_del(
        "b", poeng=5,
        q=(f"<p>What is the present value of the loan's interest tax shields? By how much does {gen(fi)} share "
           f"price rise when the loan is announced?</p>"),
        gitt=f"<p>From (a): r<sub>D</sub> = {pst(rD, 4)} and the tax shield is {tall(TS, 4)} a year.</p>",
        svar=[T("PV(TS)", PVA, kr + " million"), T("rise in the share price", dP, kr + " per share")],
        kort=(f"<p><b>PV(TS) = {tall(PVAv, 4)}; the price rises by {penger(dPv, 4, kr)}.</b> {tall(TS, 4)} × "
              f"A({n}; {pst(rD, 4)}) = {tall(TS, 4)} × {tall(A4, 4)}; divided by {tall(M, 0)}.</p>"),
        losning=(f"<p>The shields are fixed amounts for {n} years, as safe as the interest payments, so they are "
                 f"discounted at r<sub>D</sub> as an annuity. The annuity formula is not on the formula sheet: "
                 f"A(n; r) = [1 − (1 + r)<sup>−n</sup>]/r.</p>"
                 f"<p><b>Step 1: annuity factor.</b> A({n}; {pst(rD, 4)}) = [1 − {tall(1 + rD, 2)}<sup>−{n}</sup>]/"
                 f"{tall(rD, 2)} = {tall(A4, 4)}.</p>"
                 f"<p><b>Step 2: PV(TS).</b> {tall(TS, 4)} × {tall(A4, 4)} = <b>{tall(PVAv, 4)}</b>. The principal "
                 f"repaid in Year {n} adds nothing: it is not deductible.</p>"
                 f"<p><b>Step 3: the share price.</b> The shareholders own the firm when the loan is announced, so "
                 f"they capture the whole shield: {tall(PVAv, 4)}/{tall(M, 0)} = <b>{penger(dPv, 4, kr)}</b> per "
                 f"share.</p>"
                 f"<p><b>First check.</b> The loan is worth {tall(D, 0)}. Its principal is worth {tall(D, 0)}/"
                 f"{tall(1 + rD, 2)}<sup>{n}</sup> = {tall(D / (1 + rD) ** n, 4)}, so the interest is worth "
                 f"{tall(D - D / (1 + rD) ** n, 4)}. Then τ<sub>c</sub> × {tall(D - D / (1 + rD) ** n, 4)} = "
                 f"{tall(tau * (D - D / (1 + rD) ** n), 4)}. The same, by a different route.</p>"
                 f"<p><b>Remember:</b> a fixed schedule means shields at r<sub>D</sub>, for as long as interest is "
                 f"paid.</p>"),
        feller=_filtrer([
            Felle(f_PVA_perm, f"You used τ<sub>c</sub>D: the value for permanent debt, which is also what the "
                              f"shields give as a perpetuity. This loan is repaid after {n} years, so the shields stop "
                              f"then.", i=0),
            Felle(f_PVA_sum, "You added the shields without discounting them.", i=0),
            Felle(f_PVA_rU, "You discounted at r<sub>U</sub>. The shields of a fixed loan are as safe as the debt: "
                            "use r<sub>D</sub>.", i=0),
            Felle(f_dP_perm, "This rise treats the loan as permanent debt.", i=1),
            Felle(f_dP_sum, "This rise is built on shields that were not discounted.", i=1),
        ], [PVA, dP]),
    )

    c = tall_del(
        "c", poeng=4,
        q=(f"<p>Find the present value of the tax shields if, instead, {fi} (i) keeps exactly {tall(D, 0)} of debt "
           f"forever, or (ii) keeps its debt at a constant fraction of its value, rebalancing every year, so that the "
           f"debt is expected to stay at {tall(D, 0)} forever. The interest rate is {pst(rD, 4)} in both cases.</p>"),
        selvstendig=True,
        svar=[T("PV(TS), permanent debt", PVperm, kr + " million"),
              T("PV(TS), rebalanced debt", PVreb, kr + " million")],
        kort=(f"<p><b>(i) {tall(PVperm, 4)}; (ii) {tall(PVrebv, 4)}.</b> (i) τ<sub>c</sub>D = {tall(tau, 2)} × "
              f"{tall(D, 0)}. (ii) {tall(TS, 4)}/{_pr(rU)}.</p>"),
        losning=(f"<p>Both policies give the same expected shield, τ<sub>c</sub>r<sub>D</sub>D = {tall(TS, 4)}, every "
                 f"year forever. They differ in risk and so in the rate.</p>"
                 f"<p><b>Step 1: permanent debt.</b> The amount is fixed, so each shield is as safe as the interest: "
                 f"PV(TS) = τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D = {tall(tau, 2)} × "
                 f"{tall(D, 0)} = <b>{tall(PVperm, 4)}</b>. Kurbatov: permanent debt means τD at once.</p>"
                 f"<p><b>Step 2: rebalanced debt.</b> Next year's debt is a fraction of next year's value, so the "
                 f"shield moves with the assets and takes r<sub>U</sub>: {tall(TS, 4)}/{_pr(rU)} = "
                 f"<b>{tall(PVrebv, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The ratio of the two is r<sub>D</sub>/r<sub>U</sub> = {_pr(rD)}/{_pr(rU)} = "
                 f"{tall(rD / rU, 4)}; {tall(PVrebv, 4)}/{tall(PVperm, 4)} = {tall(PVrebv / PVperm, 4)}.</p>"
                 f"<p><b>Remember:</b> the debt policy sets the rate on the shield: fixed amounts at r<sub>D</sub>, "
                 f"amounts that follow the value at r<sub>U</sub>.</p>"),
        feller=_filtrer([
            Felle(f_perm_ett, "This is one year's shield. Permanent debt saves tax every year forever.", i=0),
            Felle(PVreb, "You discounted the permanent shields at r<sub>U</sub>. A fixed amount of debt gives shields "
                         "as safe as the debt.", i=0),
            Felle(f_reb_rD, "You discounted at r<sub>D</sub>. Debt that follows the firm's value gives shields with "
                            "the firm's risk: use r<sub>U</sub>.", i=1),
            Felle(f_reb_ann, f"You stopped the shields after {n} years. The rebalanced debt is kept forever.", i=1),
            Felle(f_perm_ett, "This is one year's shield, not the value of all of them.", i=1),
        ], [PVperm, PVreb]),
    )

    if lån_størst:
        hvorfor = (f"Here the loan beats the rebalanced debt: {n} years of shields at the low rate r<sub>D</sub> are "
                   f"worth more than shields forever at r<sub>U</sub> = {_pr(rU)}.")
    else:
        hvorfor = (f"Here the rebalanced debt beats the loan: shields forever at r<sub>U</sub> are worth more than "
                   f"only {n} years of shields at r<sub>D</sub>.")
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Rank the three debt policies by the value of their tax shields and explain the ranking. Why does the "
           f"loan's tax shield end when the principal is repaid in Year {n}?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) and (c): PV(TS) is {tall(PVAv, 4)} for the interest-only loan, {tall(PVperm, 4)} for "
              f"permanent debt and {tall(PVrebv, 4)} for rebalanced debt.</p>"),
        kort=(f"<p>The ranking is {rang_txt}: permanent debt is worth most because its shields last forever and are "
              f"as safe as the debt, so they are discounted at r<sub>D</sub>. Rebalanced debt also lasts forever, but its shields move with "
              f"the firm's value and are discounted at the higher r<sub>U</sub>, while the loan gives shields for only "
              f"{n} years. {hvorfor} The loan's shield ends in Year {n} because the repayment removes the debt: no "
              f"debt, no interest and no shield, while the repayment itself saves no tax.</p>"),
        losning=(f"<p><b>Two things set the value of a shield:</b> how long it lasts and how risky it is. Permanent "
                 f"debt wins on both: forever, at r<sub>D</sub>, giving τ<sub>c</sub>D, the most debt of this size "
                 f"can be worth.</p>"
                 f"<p><b>Rebalanced debt</b> lasts forever too, but a good year raises the firm's value, the debt and "
                 f"the interest; a bad year lowers them. So the shield carries asset risk and is discounted at "
                 f"r<sub>U</sub>: {tall(PVrebv, 4)}. <b>The loan</b> is as safe as permanent debt but stops after "
                 f"{n} years: {tall(PVAv, 4)}. {hvorfor}</p>"
                 f"<p><b>The principal.</b> In the standard model only interest is deductible. Repaying "
                 f"{tall(D, 0)} in Year {n} removes the debt, so there is no more interest and no more shield; the "
                 f"repayment itself saves no tax. "
                 f"Kurbatov once said in class that both components play a role; on the exam compute the interest "
                 f"shield and add one line that the repayment is not deductible.</p>"
                 f"<p><b>Typical mistakes:</b> using τ<sub>c</sub>D for every kind of debt. Another is discounting "
                 f"rebalanced shields at r<sub>D</sub>.</p>"
                 f"<p><b>Remember:</b> length and risk decide the value of the shield.</p>"),
        kriterier=[
            "Says permanent debt gives the most, τ<sub>c</sub>D: the shields last forever and are as safe as the "
            "debt, so r<sub>D</sub> (1 p)",
            "Explains that rebalanced debt gives shields that move with the firm's value, discounted at the higher "
            "r<sub>U</sub>, so they are worth less than τ<sub>c</sub>D (1 p)",
            f"Explains that the loan's shields stop in Year {n} because repaying the principal removes the debt and "
            f"so the interest; the repayment itself is not deductible (1 p)",
            f"States the ranking for these numbers ({rang_txt.replace(' > ', ', then ')}) with the reason: length "
            f"against rate (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d])
