# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: verdsetting med gjeld, WACC, APV og FTE (skribent 1).

   ov-wac1  WACC og APV på samme firma over tre år med konstant D/E, gjeldsjustering og
            Check 1 (H2025 E4, H2024 E5, forelesning 7)
   ov-wac2  APV for et prosjekt med lån som betales ned i like avdrag: skjoldet med r_D
            (V2023 P2, forelesning 3 lysbilde 11–12)
   ov-wac3  FCF fra EBIT, avskrivning, CapEx og ΔNWC over tre år, terminalverdi, WACC-verdi og
            høyeste pris per aksje (V2022 P3, forelesning 7, PS2 E7)
   ov-wac4  gjeldskapasitet D_t = d × V^L_t og flow to equity for et prosjekt
            (forelesning 7 og 8, PS2 E3)

   Konvensjonene (docs/fie402-trening-spek.md § 3b): r_U uten skatt i vektene, netto gjeld,
   skjoldet med r_U ved konstant D/V og med r_D ved fast plan, renter på gjelden ved
   årets start (D_{t−1}), fire desimaler. Mellomtallene vises med fire desimaler og kjeden
   regnes videre fra de viste tallene. T.verdi er den eksakte verdien.
"""
import math

from ov_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------- hjelpere
def _sjekk(vist, eksakt, rel=0.001):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner for langt fra eksakt."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-12):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _pr(x):
    """Gitt rente som brøk → prosenttekst med så få desimaler som trengs (4%, 4.5%, 4.75%)."""
    for d in (0, 1, 2, 3):
        if abs(x * 100 - rund(x * 100, d)) < 1e-9:
            return prosent_tekst(x * 100, d)
    return prosent_tekst(x * 100, 4)


def _b(x):
    return tall(x, 2) if abs(x - rund(x, 2)) < 1e-12 else tall(x, 4)


def _m(x, kr, d=2):
    return f"{penger(x, d, kr)} million"


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


def _sum(ledd):
    """«a + b + c» med ekte minus for negative ledd."""
    ut = ""
    for i, x in enumerate(ledd):
        if i == 0:
            ut = x
        elif x.startswith("−"):
            ut += " − " + x[1:]
        else:
            ut += " + " + x
    return ut


# =====================================================================================
# ov-wac1 · WACC og APV over tre år (Check 1)
# =====================================================================================
FIRMA1 = ["Lyngen Fjellhotell AS", "Stadt Havbruk AS", "Rjukan Kraftlag AS", "Senja Gruve AS",
          "Hardanger Fruktlager AS", "Vesterålen Seismikk AS", "Kvinesdal Kalkverk AS", "Trysil Skiheis AS"]
VARE1 = ["a hotel lease that ends in three years", "a fish-farming licence that expires in three years",
         "a power-purchase contract that runs for three years", "a mine with three years of reserves left",
         "a storage contract that ends in three years", "a survey contract that runs for three years",
         "a quarry with three years of permitted extraction left", "a ski-lift concession that ends in three years"]


@oppgave("ov-wac1", tema="wacc-apv", tittel="WACC and APV over three years", antall=12,
         sjanger="wacc-apv", kilde="H2025 E4, H2024 E5")
def _(r):
    i = r.randrange(len(FIRMA1))
    fi, vare = FIRMA1[i], VARE1[i]
    kr = r.choice(["$", "NOK"])
    k = r.choice([0.25, 0.60, 1.00, 1.50])                 # D/E
    d = k / (1 + k)
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    mrp = r.choice([0.05, 0.06])
    rm = rf + mrp
    rD = rf + r.choice([0.005, 0.01, 0.015, 0.02, 0.03])
    bE = r.choice([1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 2.4])
    tau = r.choice([0.22, 0.25, 0.30, 0.40])
    F = [r.choice([30, 40, 50, 60, 70, 80])]
    form = r.choice(["opp", "ned", "salg"])
    if form == "opp":
        F += [F[0] + r.choice([5, 10, 15]), F[0] + r.choice([20, 25, 30])]
    elif form == "ned":
        F += [F[0] - r.choice([5, 10]), F[0] - r.choice([15, 20])]
    else:
        F += [F[0] + r.choice([0, 5, 10]), F[0] * r.choice([2, 3]) + r.choice([0, 10])]
    if min(F) <= 5:
        raise Avvis("kontantstrøm for liten")

    # eksakt
    rE = rf + bE * mrp
    rU = (1 - d) * rE + d * rD
    wacc = (1 - d) * rE + d * rD * (1 - tau)
    if wacc >= rU or rU - rD < 0.01:
        raise Avvis("urimelige renter")
    V2 = F[2] / (1 + wacc)
    V1 = (F[1] + V2) / (1 + wacc)
    V0 = (F[0] + V1) / (1 + wacc)
    if not V0 > V1 > V2:
        raise Avvis("verdien skal falle mot slutten")
    D0, D1, D2 = d * V0, d * V1, d * V2
    VU = sum(F[t] / (1 + rU) ** (t + 1) for t in range(3))
    TS = [tau * rD * x for x in (D0, D1, D2)]
    PVTS = sum(TS[t] / (1 + rU) ** (t + 1) for t in range(3))
    assert abs(VU + PVTS - V0) < 1e-9

    # vist (fire desimaler)
    rE6 = rund(rE, 6)
    rU6 = rund((1 - d) * rE6 + d * rD, 6)
    w6 = rund((1 - d) * rE6 + d * rD * (1 - tau), 6)
    V2v = rund(F[2] / (1 + w6), 4)
    V1v = rund((F[1] + V2v) / (1 + w6), 4)
    V0v = rund((F[0] + V1v) / (1 + w6), 4)
    D0v, D1v, D2v = rund(d * V0v, 4), rund(d * V1v, 4), rund(d * V2v, 4)
    pvF = [rund(F[t] / (1 + rU6) ** (t + 1), 4) for t in range(3)]
    VUv = rund(sum(pvF), 4)
    TSv = [rund(tau * rD * x, 4) for x in (D0v, D1v, D2v)]
    pvTS = [rund(TSv[t] / (1 + rU6) ** (t + 1), 4) for t in range(3)]
    PVTSv = rund(sum(pvTS), 4)
    for vist, eks in ((V0v, V0), (D0v, D0), (D1v, D1), (D2v, D2), (VUv, VU), (PVTSv, PVTS)):
        _sjekk(vist, eks, 0.0008)

    # feller
    f_rE_m = rf + bE * rm
    f_rU_de = ((1 - k) * rE6 + k * rD) if k < 1 else None
    f_rU_skatt = (1 - d) * rE6 + d * rD * (1 - tau)
    f_w_ingen = (1 - d) * rE6 + d * rD
    f_w_de = ((1 - k) * rE6 + k * rD * (1 - tau)) if k < 1 else None
    f_V0_rU = VU
    f_V0_rE = sum(F[t] / (1 + rE6) ** (t + 1) for t in range(3))
    f_D_de = [k * x for x in (V0v, V1v, V2v)]
    f_D1_cum = d * (F[0] + V1v)
    f_D2_cum = d * (F[1] + V2v)
    f_VU_w = V0v
    f_PVTS_rD = sum(TSv[t] / (1 + rD) ** (t + 1) for t in range(3))
    f_PVTS_slutt = sum(tau * rD * x / (1 + rU6) ** (t + 1) for t, x in enumerate((D1v, D2v, 0.0)))
    f_PVTS_perm = tau * D0v

    years = "Years 1, 2 and 3"
    case = (f"<p>Your task is to value {fi}, which owns {vare}. The company maintains a debt-to-equity ratio of "
            f"{tall(k, 2)}, rebalanced at the end of every year. It will exist for three years. Right now we are in "
            f"Year 0. The company generates free cash flows of {_m(F[0], kr, 0)}, {_m(F[1], kr, 0)} and "
            f"{_m(F[2], kr, 0)} at the end of {years}; after Year 3 it is wound up with nothing left.</p>"
            f"<p>The yearly risk-free rate is {_pr(rf)} and will stay the same. The cost of debt (the expected "
            f"return on the company's debt) is {_pr(rD)}. Interest is paid each year on the debt outstanding at "
            f"the start of the year. The tax rate is {_pr(tau)}. The market portfolio has an expected return of "
            f"{_pr(rm)}. The equity beta of the company is {_b(bE)}.</p>"
            f"<p>Recommended precision is four decimals: rates in percent as in 12.3456% and amounts as in "
            f"123.4567.</p>")

    a = tall_del(
        "a", poeng=3,
        q="<p>Find the company's cost of equity r<sub>E</sub> and its unlevered cost of capital r<sub>U</sub>.</p>",
        svar=[T("r<sub>E</sub>", rE * 100, "%"), T("r<sub>U</sub>", rU * 100, "%")],
        kort=(f"<p><b>r<sub>E</sub> = {pst(rE6, 4)}, r<sub>U</sub> = {pst(rU6, 4)}.</b> D/V = {tall(k, 2)}/"
              f"{tall(1 + k, 2)} = {tall(d, 4)}; r<sub>U</sub> = {tall(1 - d, 4)} × {pst(rE6, 4)} + {tall(d, 4)} × "
              f"{_pr(rD)}.</p>"),
        losning=(f"<p>r<sub>E</sub> comes from the CAPM. r<sub>U</sub> is the return on the assets: the pre-tax "
                 f"WACC, which leaves taxes out because it describes the business, not its financing.</p>"
                 f"<p><b>Step 1: CAPM.</b> The market risk premium is {_pr(rm)} − {_pr(rf)} = {_pr(mrp)}. "
                 f"r<sub>E</sub> = {_pr(rf)} + {_b(bE)} × {_pr(mrp)} = <b>{pst(rE6, 4)}</b>.</p>"
                 f"<p><b>Step 2: weights.</b> D/E = {tall(k, 2)} gives D/V = {tall(k, 2)}/{tall(1 + k, 2)} = "
                 f"{tall(d, 4)} and E/V = {tall(1 - d, 4)}.</p>"
                 f"<p><b>Step 3: unlever.</b> r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = "
                 f"{tall(1 - d, 4)} × {pst(rE6, 4)} + {tall(d, 4)} × {_pr(rD)} = <b>{pst(rU6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> Through betas: β<sub>D</sub> = ({_pr(rD)} − {_pr(rf)})/{_pr(mrp)} = "
                 f"{tall((rD - rf) / mrp, 4)} and β<sub>U</sub> = {tall(1 - d, 4)} × {_b(bE)} + {tall(d, 4)} × "
                 f"{tall((rD - rf) / mrp, 4)} = {tall((1 - d) * bE + d * (rD - rf) / mrp, 4)}, so r<sub>U</sub> = "
                 f"{_pr(rf)} + {tall((1 - d) * bE + d * (rD - rf) / mrp, 4)} × {_pr(mrp)} = "
                 f"{pst(rf + ((1 - d) * bE + d * (rD - rf) / mrp) * mrp, 4)}. The same, as it must be.</p>"
                 f"<p><b>Remember:</b> D/E = {tall(k, 2)} is not a weight. Convert to D/V first. Keep taxes "
                 f"out of r<sub>U</sub>.</p>"),
        feller=_filtrer([
            Felle(f_rE_m * 100, f"You multiplied the beta by the market return {_pr(rm)}. The CAPM uses the premium "
                                f"over r<sub>f</sub>.", i=0),
            Felle(f_rU_de * 100, f"You used D/E = {tall(k, 2)} as the debt weight. Convert to D/V first.", i=1)
            if f_rU_de is not None else None,
            Felle(f_rU_skatt * 100, "You took the debt after tax. That is the after-tax WACC: r<sub>U</sub> leaves "
                                    "taxes out.", i=1),
            Felle(rE6 * 100, "This is r<sub>E</sub>. The unlevered rate also weights in the cheaper debt.", i=1),
        ], [rE * 100, rU * 100]),
    )

    b = tall_del(
        "b", poeng=4,
        q="<p>Find the after-tax WACC and the levered value of the company today using the WACC method.</p>",
        gitt=f"<p>From (a): r<sub>E</sub> = {pst(rE6, 4)}.</p>",
        svar=[T("r<sub>wacc</sub>", wacc * 100, "%"), T("V<sup>L</sup><sub>0</sub>", V0, kr + " million")],
        kort=(f"<p><b>r<sub>wacc</sub> = {pst(w6, 4)}, V<sup>L</sup><sub>0</sub> = {_m(V0v, kr, 4)}.</b> "
              f"V<sup>L</sup><sub>0</sub> = {tall(F[0], 0)}/{tall(1 + w6, 6)} + {tall(F[1], 0)}/{tall(1 + w6, 6)}² + "
              f"{tall(F[2], 0)}/{tall(1 + w6, 6)}³.</p>"),
        losning=(f"<p>The WACC method discounts the free cash flow at the after-tax WACC. The tax benefit of debt "
                 f"is inside the rate, so nothing is added afterwards.</p>"
                 f"<p><b>Step 1: WACC.</b> r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − "
                 f"τ<sub>c</sub>) = {tall(1 - d, 4)} × {pst(rE6, 4)} + {tall(d, 4)} × {_pr(rD)} × {tall(1 - tau, 2)} = "
                 f"<b>{pst(w6, 4)}</b>.</p>"
                 f"<p><b>Step 2: roll the value back.</b> V<sup>L</sup><sub>2</sub> = {tall(F[2], 0)}/"
                 f"{tall(1 + w6, 6)} = {tall(V2v, 4)}. V<sup>L</sup><sub>1</sub> = ({tall(F[1], 0)} + "
                 f"{tall(V2v, 4)})/{tall(1 + w6, 6)} = {tall(V1v, 4)}. V<sup>L</sup><sub>0</sub> = ({tall(F[0], 0)} + "
                 f"{tall(V1v, 4)})/{tall(1 + w6, 6)} = <b>{_m(V0v, kr, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = "
                 f"{pst(rU6, 4)} − {tall(d, 4)} × {tall(tau, 2)} × {_pr(rD)} = {pst(rU6 - d * tau * rD, 4)}, the WACC above up to rounding. An "
                 f"identity under the course's convention, so it catches arithmetic slips only. The WACC lies below "
                 f"r<sub>U</sub>, as it must with taxes.</p>"
                 f"<p><b>Remember:</b> keep the values V<sup>L</sup><sub>1</sub> and V<sup>L</sup><sub>2</sub>: the "
                 f"debt schedule needs them.</p>"),
        feller=_filtrer([
            Felle(f_w_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax WACC, "
                                   "r<sub>U</sub>.", i=0),
            Felle(f_w_de * 100, f"You used D/E = {tall(k, 2)} as the debt weight.", i=0) if f_w_de is not None else None,
            Felle(f_V0_rU, "You discounted at r<sub>U</sub>. That is the unlevered value, without the tax shield.", i=1),
            Felle(f_V0_rE, "You discounted the firm's free cash flow at r<sub>E</sub>. That rate belongs to the "
                           "equity's cash flow.", i=1),
            Felle(sum(F), "You added the cash flows without discounting them.", i=1),
        ], [wacc * 100, V0]),
    )

    c = tall_del(
        "c", poeng=4,
        q="<p>Find the debt the company holds at the end of Years 0, 1 and 2.</p>",
        gitt=(f"<p>From (b): V<sup>L</sup><sub>0</sub> = {tall(V0v, 4)}, V<sup>L</sup><sub>1</sub> = "
              f"{tall(V1v, 4)} and V<sup>L</sup><sub>2</sub> = {tall(V2v, 4)}, each measured after that year's free "
              f"cash flow has been paid out.</p>"),
        svar=[T("D<sub>0</sub>", D0, kr + " million"), T("D<sub>1</sub>", D1, kr + " million"),
              T("D<sub>2</sub>", D2, kr + " million")],
        kort=(f"<p><b>D<sub>0</sub> = {tall(D0v, 4)}, D<sub>1</sub> = {tall(D1v, 4)}, D<sub>2</sub> = "
              f"{tall(D2v, 4)}.</b> D<sub>t</sub> = (D/V) × V<sup>L</sup><sub>t</sub> with D/V = {tall(d, 4)}.</p>"),
        losning=(f"<p>A constant D/E means the debt is a fixed fraction of the firm's value at every date: "
                 f"D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>, with d = D/V. The value at each date is what the "
                 f"remaining cash flows are worth after that year's cash flow has gone out.</p>"
                 f"<p><b>Step 1: d.</b> D/V = {tall(k, 2)}/{tall(1 + k, 2)} = {tall(d, 4)}.</p>"
                 f"<p><b>Step 2: the schedule.</b> D<sub>0</sub> = {tall(d, 4)} × {tall(V0v, 4)} = "
                 f"<b>{tall(D0v, 4)}</b>. D<sub>1</sub> = {tall(d, 4)} × {tall(V1v, 4)} = <b>{tall(D1v, 4)}</b>. "
                 f"D<sub>2</sub> = {tall(d, 4)} × {tall(V2v, 4)} = <b>{tall(D2v, 4)}</b>. D<sub>3</sub> = 0.</p>"
                 f"<p><b>Step 3: what it means.</b> The value falls as the cash flows are paid out, so the company "
                 f"{'repays' if D1v < D0v else 'borrows'} {tall(abs(D1v - D0v), 4)} at the end of Year 1 and "
                 f"{'repays' if D2v < D1v else 'borrows'} {tall(abs(D2v - D1v), 4)} at the end of Year 2, then "
                 f"repays the last {tall(D2v, 4)} at the end of Year 3.</p>"
                 f"<p><b>First check.</b> D<sub>t</sub>/V<sup>L</sup><sub>t</sub> = {tall(d, 4)} at each date and "
                 f"the implied D/E is {tall(D0v / (V0v - D0v), 4)}, the target. This checks the arithmetic only.</p>"
                 f"<p><b>Remember:</b> D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>, where V<sup>L</sup><sub>t</sub> "
                 f"excludes the cash flow just paid.</p>"),
        feller=_filtrer([
            Felle(f_D_de[0], f"You multiplied the value by D/E = {tall(k, 2)}. The debt is D/V × V<sup>L</sup>.", i=0)
            if k != 1 else None,
            Felle(f_D_de[1], f"You multiplied the value by D/E = {tall(k, 2)}. The debt is D/V × V<sup>L</sup>.", i=1)
            if k != 1 else None,
            Felle(D0v, "You kept the debt at its opening level. A constant D/E makes the debt follow the value.", i=1),
            Felle(f_D1_cum, f"You included the Year-1 cash flow of {tall(F[0], 0)} in the value at Year 1. It has "
                            f"already been paid out.", i=1),
            Felle(f_D2_cum, f"You included the Year-2 cash flow of {tall(F[1], 0)} in the value at Year 2. It has "
                            f"already been paid out.", i=2),
        ], [D0, D1, D2]),
    )

    d_ = tall_del(
        "d", poeng=4,
        q=("<p>Value the company with the APV method: find the unlevered value V<sup>U</sup> and the present value "
           "of the interest tax shields PV(TS).</p>"),
        gitt=(f"<p>From (a) and (c): r<sub>U</sub> = {pst(rU6, 4)}; D<sub>0</sub> = {tall(D0v, 4)}, "
              f"D<sub>1</sub> = {tall(D1v, 4)} and D<sub>2</sub> = {tall(D2v, 4)}.</p>"),
        svar=[T("V<sup>U</sup>", VU, kr + " million"), T("PV(TS)", PVTS, kr + " million")],
        kort=(f"<p><b>V<sup>U</sup> = {tall(VUv, 4)}, PV(TS) = {tall(PVTSv, 4)}.</b> TS<sub>t</sub> = "
              f"{tall(tau, 2)} × {_pr(rD)} × D<sub>t−1</sub> = {tall(TSv[0], 4)}, {tall(TSv[1], 4)}, "
              f"{tall(TSv[2], 4)}, all at r<sub>U</sub>.</p>"),
        losning=(f"<p>APV splits the value in two: the business as if it had no debt, plus the tax saved on "
                 f"interest. Both pieces are discounted at r<sub>U</sub> here, because the debt follows the "
                 f"company's value and so does the shield.</p>"
                 f"<p><b>Step 1: V<sup>U</sup>.</b> {tall(F[0], 0)}/{tall(1 + rU6, 6)} + {tall(F[1], 0)}/"
                 f"{tall(1 + rU6, 6)}² + {tall(F[2], 0)}/{tall(1 + rU6, 6)}³ = {_sum([tall(x, 4) for x in pvF])} = "
                 f"<b>{tall(VUv, 4)}</b>.</p>"
                 f"<p><b>Step 2: the shields.</b> Interest is paid on the debt at the start of each year: "
                 f"TS<sub>1</sub> = {tall(tau, 2)} × {_pr(rD)} × {tall(D0v, 4)} = {tall(TSv[0], 4)}, "
                 f"TS<sub>2</sub> = {tall(tau, 2)} × {_pr(rD)} × {tall(D1v, 4)} = {tall(TSv[1], 4)}, "
                 f"TS<sub>3</sub> = {tall(tau, 2)} × {_pr(rD)} × {tall(D2v, 4)} = {tall(TSv[2], 4)}.</p>"
                 f"<p><b>Step 3: PV(TS) at r<sub>U</sub>.</b> {_sum([tall(x, 4) for x in pvTS])} = "
                 f"<b>{tall(PVTSv, 4)}</b>.</p>"
                 f"<p><b>Check 1.</b> V<sup>U</sup> + PV(TS) = {tall(VUv, 4)} + {tall(PVTSv, 4)} = "
                 f"{tall(VUv + PVTSv, 4)}, the WACC value {tall(V0v, 4)} up to rounding. It is a fixed point, since "
                 f"the debt came from the WACC values, but it would expose shields discounted at r<sub>D</sub> "
                 f"({tall(f_PVTS_rD, 4)}) and slips in the arithmetic.</p>"
                 f"<p><b>Remember:</b> constant D/E means shields at r<sub>U</sub>, with interest on "
                 f"D<sub>t−1</sub>.</p>"),
        feller=_filtrer([
            Felle(f_VU_w, "You discounted at the WACC. That is V<sup>L</sup>: the WACC already contains the shield.",
                  i=0),
            Felle(f_PVTS_rD, "You discounted the shields at r<sub>D</sub>. With a constant D/E the debt follows the "
                             "value, so the shields carry asset risk: use r<sub>U</sub>.", i=1),
            Felle(f_PVTS_slutt, "You charged interest on the debt at the end of each year. Interest in year t is paid "
                                "on D<sub>t−1</sub>.", i=1),
            Felle(f_PVTS_perm, "You used τ<sub>c</sub>D, the formula for fixed permanent debt. This debt is repaid "
                               "over three years.", i=1),
        ], [VU, PVTS]),
    )

    pv_fast = rund(sum(TSv[t] / (1 + rD) ** (t + 1) for t in range(3)), 4)
    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>Compare V<sup>U</sup> + PV(TS) with your answer in (b) and explain why the two agree. Why are the tax "
           f"shields discounted at r<sub>U</sub> here? What would change if the debt schedule D<sub>0</sub>, "
           f"D<sub>1</sub>, D<sub>2</sub> from (c) were instead fixed today as a contract, whatever happens to the "
           f"company's value?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) to (d): V<sup>L</sup><sub>0</sub> = {tall(V0v, 4)}; D<sub>0</sub> = {tall(D0v, 4)}, "
              f"D<sub>1</sub> = {tall(D1v, 4)} and D<sub>2</sub> = {tall(D2v, 4)}; the shields are "
              f"{tall(TSv[0], 4)}, {tall(TSv[1], 4)} and {tall(TSv[2], 4)}; V<sup>U</sup> = {tall(VUv, 4)} and "
              f"PV(TS) = {tall(PVTSv, 4)}.</p>"),
        kort=(f"<p>{tall(VUv, 4)} + {tall(PVTSv, 4)} = {tall(VUv + PVTSv, 4)} equals the WACC value (Check 1): both "
              f"methods value the same free cash flow and the same tax shield, once inside the rate and once as a "
              f"separate cash flow; APV used the debt from the WACC values. With a constant D/E the debt (and so "
              f"each shield) moves with the company's value, so the shields carry asset risk and r<sub>U</sub>. With "
              f"the schedule fixed today the shields would be the same amounts but known in advance, so they would be "
              f"discounted at r<sub>D</sub>: PV(TS) = {tall(pv_fast, 4)} instead of {tall(PVTSv, 4)}, so the value "
              f"rises; D/E would drift whenever the value moves, so APV is the method to use.</p>"),
        losning=(f"<p><b>Why they agree.</b> The WACC lowers the discount rate by (D/V)τ<sub>c</sub>r<sub>D</sub>; APV "
                 f"adds the same shields as cash flows. With D<sub>t</sub> taken from the WACC values the two are "
                 f"algebraically the same number, a fixed point rather than two independent estimates. Kurbatov's "
                 f"exam wording is to value with both methods, make sure they match and interpret.</p>"
                 f"<p><b>Why r<sub>U</sub>.</b> Next year's debt is d × next year's value. A good year raises the "
                 f"value, the debt and the interest; a bad year lowers all three. The shield is as risky as the "
                 f"assets.</p>"
                 f"<p><b>A fixed schedule.</b> Locking D<sub>0</sub> = {tall(D0v, 4)}, D<sub>1</sub> = {tall(D1v, 4)} "
                 f"and D<sub>2</sub> = {tall(D2v, 4)} as a contract keeps the shields at {tall(TSv[0], 4)}, "
                 f"{tall(TSv[1], 4)} and {tall(TSv[2], 4)} but makes them known today. They are then as safe as the "
                 f"debt and are discounted at r<sub>D</sub>: PV(TS) = {tall(pv_fast, 4)} against {tall(PVTSv, 4)}, "
                 f"so the company is worth {tall(pv_fast - PVTSv, 4)} more. The debt no longer follows the value, so "
                 f"D/E drifts whenever the value moves away from plan and a single WACC no longer applies.</p>"
                 f"<p><b>Typical mistakes:</b> calling the agreement an independent check, or discounting the shields "
                 f"at r<sub>D</sub> while the firm keeps D/E constant.</p>"
                 f"<p><b>Remember:</b> the debt policy sets the rate on the shield.</p>"),
        kriterier=[
            "States that V<sup>U</sup> + PV(TS) equals the WACC value (Check 1): the same cash flows and the same "
            "shield, once in the rate and once as a cash flow (1 p)",
            "Notes that the agreement is a fixed point, since APV took the debt from the WACC values; it catches a "
            "wrong shield rate and slips, not wrong inputs (1 p)",
            "Explains r<sub>U</sub>: with a constant D/E the debt and the shields move with the company's value, so "
            "they carry asset risk (1 p)",
            "Says that a schedule fixed today gives the same shields but known in advance, discounted at r<sub>D</sub>, "
            "so PV(TS) and the value rise; D/E then drifts, so APV is the method (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d_, e])


# =====================================================================================
# ov-wac2 · APV for et prosjekt med fast nedbetalingsplan
# =====================================================================================
FIRMA2 = [("Austevoll Notbøteri AS", "a new net-cleaning vessel"), ("Brønnøy Kalk AS", "a second crushing line"),
          ("Gausdal Meieri AS", "a cheese-ripening hall"), ("Karmøy Verft AS", "a new dry dock gate"),
          ("Namsos Sagbruk AS", "a drying kiln"), ("Odda Smelteverk AS", "a heat-recovery unit"),
          ("Stord Elektro AS", "a cable-testing lab"), ("Tynset Trelast AS", "a pellet press")]


@oppgave("ov-wac2", tema="wacc-apv", tittel="APV with a fixed repayment schedule", antall=12,
         sjanger="wacc-apv", kilde="V2023 P2, Lecture 3 slides 11–12")
def _(r):
    fi, prosjekt = r.choice(FIRMA2)
    kr = r.choice(["NOK", "NOK", "$"])
    tau = r.choice([0.21, 0.22, 0.25, 0.30])
    # balansen i markedsverdier
    dv = r.choice([0.25, 0.30, 0.40, 0.50])
    E = r.choice({0.25: [600, 750, 900, 1200], 0.30: [700, 1400, 2100], 0.40: [600, 750, 900, 1200],
                  0.50: [600, 750, 800, 900, 1200]}[dv])
    Dn = E * dv / (1 - dv)
    if abs(Dn - round(Dn)) > 1e-9:
        raise Avvis("netto gjeld er ikke et helt tall")
    Dn = round(Dn)
    C = r.choice([0, 0, 50, 100])
    Dg = Dn + C
    rE = r.choice([0.10, 0.11, 0.12, 0.13, 0.14])
    rD = r.choice([0.05, 0.06, 0.07])
    rU = (1 - dv) * rE + dv * rD
    # prosjektet
    n = r.choice([3, 4])
    inv = r.choice([150, 200, 240, 300])
    form = r.choice(["flat", "ned", "opp"])
    if form == "flat":
        base = [1.0] * n
    elif form == "ned":
        base = [1.0 - 0.15 * t for t in range(n)]
    else:
        base = [0.85 + 0.15 * t for t in range(n)]
    pv_base = sum(base[t] / (1 + rU) ** (t + 1) for t in range(n))
    scen = r.choice(["A", "B"])            # A: negativ NPV uten gjeld, men positiv APV. B: begge positive
    x = r.choice([-0.005, -0.01, -0.015, -0.02] if scen == "A" else [0.01, 0.02, 0.03])
    skala = inv * (1 + x) / pv_base
    F = [round(skala * x) for x in base]
    if min(F) <= 0:
        raise Avvis("negativ kontantstrøm")
    L = r.choice({3: [90, 120, 150, 180], 4: [80, 120, 160, 200]}[n])
    if L > 0.8 * inv:
        raise Avvis("lånet er for stort i forhold til prosjektet")
    avdrag = L / n

    # eksakt
    VU = sum(F[t] / (1 + rU) ** (t + 1) for t in range(n))
    npvU = VU - inv
    Dstart = [L - avdrag * t for t in range(n)]
    rente = [rD * x for x in Dstart]
    TS = [tau * x for x in rente]
    PVTS = sum(TS[t] / (1 + rD) ** (t + 1) for t in range(n))
    apv = npvU + PVTS
    if abs(npvU) < 0.3:
        raise Avvis("NPV for nær null")
    if apv <= 0.5:
        raise Avvis("APV ikke klart positiv")
    if (scen == "A") != (npvU < 0):
        raise Avvis("avrundingen snudde fortegnet")
    # vist
    rU6 = rund(rU, 6)
    pvF = [rund(F[t] / (1 + rU6) ** (t + 1), 4) for t in range(n)]
    VUv = rund(sum(pvF), 4)
    npvUv = rund(VUv - inv, 4)
    TSv = [rund(x, 4) for x in TS]
    pvTS = [rund(TSv[t] / (1 + rD) ** (t + 1), 4) for t in range(n)]
    PVTSv = rund(sum(pvTS), 4)
    apvv = rund(npvUv + PVTSv, 4)
    tolN = 0.05

    # feller
    wg = Dg / (E + Dg)
    f_rU_brutto = (1 - wg) * rE + wg * rD if C else None
    f_rU_skatt = (1 - dv) * rE + dv * rD * (1 - tau)
    wacc = f_rU_skatt
    f_npv_pv = VU
    f_npv_wacc = sum(F[t] / (1 + wacc) ** (t + 1) for t in range(n)) - inv
    f_npv_rE = sum(F[t] / (1 + rE) ** (t + 1) for t in range(n)) - inv
    f_ts_rente = rente[0]
    f_ts_tauL = tau * L
    f_ts_slutt = tau * rD * Dstart[1]
    f_pvts_rU = sum(TSv[t] / (1 + rU6) ** (t + 1) for t in range(n))
    f_pvts_perm = tau * L
    f_pvts_slutt = sum(tau * rD * (Dstart[t] - avdrag) / (1 + rD) ** (t + 1) for t in range(n))
    f_apv_rU = npvUv + f_pvts_rU
    f_apv_pv = VUv + PVTSv

    kol = "".join(f"<th>{t}</th>" for t in range(n + 1))
    rad = "".join(f"<td>{tall(x, 0)}</td>" for x in [-inv] + F)
    rad = rad.replace(f"<td>{tall(-inv, 0)}</td>", f"<td>{MINUS}{tall(inv, 0)}</td>", 1)
    tabell = (f"<table><tr><th>Year</th>{kol}</tr><tr><td>Free cash flow ({kr} million)</td>{rad}</tr></table>")
    kasse = (f" The balance sheet also shows {_m(C, kr, 0)} of excess cash." if C else "")
    case = (f"<p>{fi} is considering {prosjekt}. The project has the same risk as the firm's existing business and "
            f"generates these free cash flows:</p>{tabell}"
            f"<p>{gen(fi)} market-value balance sheet shows debt of {_m(Dg, kr, 0)} and equity of {_m(E, kr, 0)}."
            f"{kasse} Its cost of debt is {_pr(rD)} and its cost of equity is {_pr(rE)}. The corporate tax rate is "
            f"{_pr(tau)}. The firm's existing debt is kept at a constant D/V, so unlever without taxes. Use market values and net debt "
            f"(debt minus excess cash).</p>"
            f"<p>To fund the project, {fi} borrows {_m(L, kr, 0)} today at {_pr(rD)}. The loan is repaid in {n} "
            f"equal instalments at the end of Years 1 to {n}. Interest is paid each year on the balance "
            f"outstanding at the start of the year. The schedule is fixed today and does not depend on how the "
            f"project turns out. Interest is tax deductible; the repayments are not.</p>"
            f"<p>Give rates in percent with four decimals and amounts with four decimals.</p>")

    a = tall_del(
        "a", poeng=3,
        q=f"<p>What is {gen(fi)} unlevered cost of capital r<sub>U</sub>?</p>",
        svar=[T("r<sub>U</sub>", rU * 100, "%")],
        kort=(f"<p><b>r<sub>U</sub> = {pst(rU6, 4)}.</b> Net debt {tall(Dn, 0)}, V = {tall(E + Dn, 0)}: "
              f"r<sub>U</sub> = {tall(1 - dv, 4)} × {_pr(rE)} + {tall(dv, 4)} × {_pr(rD)}.</p>"),
        losning=(f"<p>r<sub>U</sub> is the return the assets must earn whatever their financing: the pre-tax WACC. "
                 f"The project has the firm's risk, so it inherits the firm's r<sub>U</sub>.</p>"
                 + (f"<p><b>Step 1: net debt.</b> Excess cash offsets debt: {tall(Dg, 0)} − {tall(C, 0)} = "
                    f"{tall(Dn, 0)}.</p>" if C else
                    f"<p><b>Step 1: debt.</b> There is no excess cash, so D = {tall(Dn, 0)}.</p>")
                 + f"<p><b>Step 2: weights.</b> V = {tall(E, 0)} + {tall(Dn, 0)} = {tall(E + Dn, 0)}, so E/V = "
                 f"{tall(1 - dv, 4)} and D/V = {tall(dv, 4)}.</p>"
                 f"<p><b>Step 3: pre-tax WACC.</b> r<sub>U</sub> = {tall(1 - dv, 4)} × {_pr(rE)} + {tall(dv, 4)} × "
                 f"{_pr(rD)} = <b>{pst(rU6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>U</sub> = r<sub>D</sub> + (E/V)(r<sub>E</sub> − r<sub>D</sub>) = "
                 f"{_pr(rD)} + {tall(1 - dv, 4)} × ({_pr(rE)} − {_pr(rD)}) = {pst(rD + (1 - dv) * (rE - rD), 4)}. "
                 f"The same weights in another order, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> no tax term in r<sub>U</sub>; that would be the after-tax WACC.</p>"),
        feller=_filtrer([
            Felle(f_rU_brutto * 100, f"You used gross debt ({tall(Dg, 0)}). Excess cash offsets debt, so use net "
                                     f"debt.") if f_rU_brutto else None,
            Felle(f_rU_skatt * 100, "You took the debt after tax. That is the after-tax WACC, not r<sub>U</sub>."),
            Felle(rE * 100, "This is the cost of equity. The assets are financed by debt as well."),
        ], [rU * 100]),
    )

    b = tall_del(
        "b", poeng=3,
        q="<p>What is the project's NPV if it were financed entirely with equity (the unlevered NPV)?</p>",
        gitt=f"<p>From (a): r<sub>U</sub> = {pst(rU6, 4)}.</p>",
        svar=[T("unlevered NPV", npvU, kr + " million", rel=STD_REL, abs=tolN)],
        kort=(f"<p><b>NPV = {_m(npvUv, kr, 4)}.</b> V<sup>U</sup> = {_sum([tall(x, 4) for x in pvF])} = "
              f"{tall(VUv, 4)}, minus {tall(inv, 0)}.</p>"),
        losning=(f"<p>APV starts from the project as if it had no debt: its free cash flow discounted at "
                 f"r<sub>U</sub>. The financing comes afterwards, as a separate piece. Keeping the two apart is the "
                 f"point of APV when the debt is a given schedule rather than a ratio.</p>"
                 f"<p><b>Step 1: discount the cash flows.</b> "
                 + "; ".join(f"{tall(F[t], 0)}/{tall(1 + rU6, 6)}{'' if t == 0 else ('²' if t == 1 else ('³' if t == 2 else '⁴'))} = {tall(pvF[t], 4)}"
                             for t in range(n))
                 + f". V<sup>U</sup> = {tall(VUv, 4)}.</p>"
                 f"<p><b>Step 2: subtract the investment.</b> NPV = {tall(VUv, 4)} − {tall(inv, 0)} = "
                 f"<b>{_m(npvUv, kr, 4)}</b>.</p>"
                 f"<p><b>First check.</b> V<sup>U</sup> = {tall(VUv, 4)} lies below the undiscounted sum of "
                 f"{tall(sum(F), 0)}, as it must with a positive rate. The NPV is small relative to the outlay of "
                 f"{tall(inv, 0)}: the project is "
                 f"{'barely unprofitable on an all-equity basis, so the financing will decide' if npvUv < 0 else 'only just profitable on an all-equity basis'}.</p>"
                 f"<p><b>Remember:</b> the unlevered NPV uses r<sub>U</sub> and subtracts the investment.</p>"),
        feller=_filtrer([
            Felle(f_npv_pv, "This is the present value of the cash flows. The NPV subtracts the investment."),
            Felle(f_npv_wacc, "You discounted at the after-tax WACC. That puts the tax benefit of debt into the "
                              "unlevered NPV."),
            Felle(f_npv_rE, "You discounted at the cost of equity. The project's assets earn r<sub>U</sub>."),
        ], [npvU], abs_=[tolN]),
    )

    tsrad = "; ".join(f"TS<sub>{t + 1}</sub> = {tall(tau, 2)} × {_pr(rD)} × {tall(Dstart[t], 0)} = {tall(TSv[t], 4)}"
                      for t in range(n))
    c = tall_del(
        "c", poeng=4,
        q="<p>Find the interest tax shield in Year 1 and the present value of all the interest tax shields.</p>",
        selvstendig=True,
        svar=[T("TS<sub>1</sub>", TS[0], kr + " million"), T("PV(TS)", PVTS, kr + " million")],
        kort=(f"<p><b>TS<sub>1</sub> = {tall(TSv[0], 4)}, PV(TS) = {tall(PVTSv, 4)}.</b> Balances "
              f"{', '.join(tall(x, 0) for x in Dstart)}; TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × "
              f"D<sub>t−1</sub>, discounted at {_pr(rD)}.</p>").replace(", ", ", ", 1),
        losning=(f"<p>The tax shield is the tax saved on each year's interest. The schedule is fixed in advance, so "
                 f"the shields are as safe as the debt itself and are discounted at r<sub>D</sub>.</p>"
                 f"<p><b>Step 1: the balances.</b> {tall(L, 0)} is repaid in {n} instalments of {tall(avdrag, 0)}. "
                 f"The balance at the start of Years 1 to {n} is {', '.join(tall(x, 0) for x in Dstart[:-1])} and "
                 f"{tall(Dstart[-1], 0)}.</p>"
                 f"<p><b>Step 2: the shields.</b> {tsrad}.</p>"
                 f"<p><b>Step 3: discount at r<sub>D</sub>.</b> "
                 + " + ".join(f"{tall(TSv[t], 4)}/{tall(1 + rD, 2)}{'' if t == 0 else ('²' if t == 1 else ('³' if t == 2 else '⁴'))}"
                              for t in range(n))
                 + f" = {_sum([tall(x, 4) for x in pvTS])} = <b>{tall(PVTSv, 4)}</b>.</p>"
                 f"<p><b>First check.</b> Factor out τ<sub>c</sub>r<sub>D</sub>: {tall(tau * rD, 4)} × "
                 f"({' + '.join(f'{tall(Dstart[t], 0)}/{tall(1 + rD, 2)}<sup>{t + 1}</sup>' for t in range(n))}) = "
                 f"{tall(tau * rD * sum(Dstart[t] / (1 + rD) ** (t + 1) for t in range(n)), 4)}, the same up to "
                 f"rounding. The repayments themselves create no shield.</p>"
                 f"<p><b>Remember:</b> a fixed schedule means shields at r<sub>D</sub>, on the balance at the start of "
                 f"each year.</p>"),
        feller=_filtrer([
            Felle(f_ts_rente, "This is the interest itself. The shield is the tax saved: τ<sub>c</sub> × interest.",
                  i=0),
            Felle(f_ts_tauL, "You multiplied the whole loan by the tax rate. Only the interest is deductible.", i=0),
            Felle(f_ts_slutt, "You charged interest on the balance after the first repayment. Year-1 interest is "
                              "paid on the opening balance.", i=0),
            Felle(f_pvts_rU, "You discounted at r<sub>U</sub>. A schedule fixed in advance makes the shields as safe "
                             "as the debt: use r<sub>D</sub>.", i=1),
            Felle(f_pvts_perm, f"This is τ<sub>c</sub> times the loan. You either used τ<sub>c</sub>D, the formula "
                               f"for permanent debt, or let the repayments create a shield too (at r<sub>D</sub> the "
                               f"interest and the repayments are together worth the loan). This loan is repaid over "
                               f"{n} years. Repaying principal is not tax deductible.", i=1),
            Felle(f_pvts_slutt, "You charged interest on the balance at the end of each year. Interest is paid on "
                                "the balance at the start.", i=1),
        ], [TS[0], PVTS]),
    )

    if scen == "A":
        kort_d = (f"<p><b>APV NPV = {_m(apvv, kr, 4)}.</b> {tall(npvUv, 4)} + {tall(PVTSv, 4)}. Take the project: "
                  f"its NPV with the financing is positive. All of its value comes from the tax shields (it loses "
                  f"{tall(-npvUv, 4)} all-equity), so it pays only if {fi} can use the deductions.</p>")
        krit_d = [
            f"Says {fi} should take the project, since the NPV including the financing is positive (1 p)",
            "Notes that the project loses value on an all-equity basis, so its value comes entirely from the tax "
            "shields, which needs taxable profits to use the deductions (1 p)",
        ]
    else:
        kort_d = (f"<p><b>APV NPV = {_m(apvv, kr, 4)}.</b> {tall(npvUv, 4)} + {tall(PVTSv, 4)}. {fi} should take "
                  f"the project, since its NPV with the financing is positive. It creates value on its own "
                  f"({tall(npvUv, 4)}); the loan adds {tall(PVTSv, 4)} of tax shield on top.</p>")
        krit_d = [
            f"Says {fi} should take the project, since the NPV including the financing is positive (1 p)",
            "Notes that the project creates value even on an all-equity basis and that the loan adds PV(TS) on "
            "top, so the decision does not hinge on the financing (1 p)",
        ]
    d = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>What is the project's NPV with this financing, using the APV method? Should {fi} take the project? "
           f"Comment briefly on where its value comes from.</p>"),
        tekst_ledd=f"Should {fi} take the project? Where does its value come from?",
        setninger="Answer in at most two sentences.",
        gitt=f"<p>From (b) and (c): the unlevered NPV is {tall(npvUv, 4)} and PV(TS) = {tall(PVTSv, 4)}.</p>",
        svar=[T("NPV with financing (APV)", apv, kr + " million", rel=STD_REL, abs=tolN)],
        kort=kort_d,
        losning=(f"<p>APV adds the value of the financing to the value of the project as if all-equity: "
                 f"NPV<sub>APV</sub> = NPV<sub>U</sub> + PV(TS). The decision follows the total, because the loan "
                 f"comes with the project: without the project there is no loan and no shield.</p>"
                 f"<p><b>Step 1: add.</b> {tall(npvUv, 4)} + {tall(PVTSv, 4)} = <b>{_m(apvv, kr, 4)}</b>.</p>"
                 f"<p><b>Step 2: decide.</b> The NPV with the financing is positive, so the project adds value to "
                 f"{gen(fi)} shareholders. {'The operations alone would destroy value; the loan turns the sign.' if scen == 'A' else 'The operations add value on their own; the loan adds more.'} "
                 f"The share of the value that comes from the financing is "
                 f"{tall(min(PVTSv / apvv, 9.99) * 100, 0) if scen == 'B' else 'all of it'}"
                 f"{'%' if scen == 'B' else ''}.</p>"
                 f"<p><b>First check.</b> PV(TS) is positive and smaller than τ<sub>c</sub> × {tall(L, 0)} = "
                 f"{tall(tau * L, 2)}, the most a permanent loan of that size could be worth.</p>"
                 f"<p><b>Remember:</b> the tax shield is real value only if the firm pays enough tax to use the "
                 f"deductions.</p>"),
        kriterier=krit_d,
        feller=_filtrer([
            Felle(f_apv_rU, "This adds shields discounted at r<sub>U</sub>. The schedule is fixed, so use "
                            "r<sub>D</sub>."),
            Felle(f_apv_pv, "You added PV(TS) to the present value of the cash flows. The NPV subtracts the "
                            "investment."),
            Felle(npvUv, "This is the unlevered NPV. The loan's tax shields are missing."),
        ], [apv], abs_=[tolN]),
    )

    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>Explain why you discounted the tax shields at r<sub>D</sub> and not at r<sub>U</sub>. A board member "
           f"proposes to borrow far more for the same project, to raise PV(TS). What does the APV model say? Why "
           f"might it be wrong?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (c): PV(TS) = {tall(PVTSv, 4)} for a loan of {tall(L, 0)}.</p>",
        kort=(f"<p>The repayment schedule is fixed in advance, so the interest and the shields are known amounts as "
              f"safe as the debt: they are discounted at r<sub>D</sub>, whereas debt kept at a constant D/V would move "
              f"with the project's value and its shields would take r<sub>U</sub>. PV(TS) rises roughly in "
              f"proportion to the loan, so the APV model on its own says to borrow as much as possible. That ignores "
              f"the costs of debt: more borrowing raises the probability and expected costs of financial distress "
              f"(fire sales, lost customers), adds agency costs and needs taxable income to use the deductions. The "
              f"trade-off theory puts the optimum where the marginal shield equals the marginal cost.</p>"),
        losning=(f"<p><b>The rate.</b> A shield is τ<sub>c</sub> × interest. When the debt schedule is a contract, "
                 f"each year's interest is known today, up to default risk, which r<sub>D</sub> prices. When the "
                 f"firm instead rebalances to a target ratio, the debt next year depends on next year's value and "
                 f"the shield moves with the assets, so r<sub>U</sub>.</p>"
                 f"<p><b>More debt.</b> Doubling the loan doubles every balance and every shield, so PV(TS) doubles "
                 f"to about {tall(2 * PVTSv, 2)}. Nothing in V<sup>L</sup> = V<sup>U</sup> + PV(TS) pushes back. "
                 f"That is the limit of the model, not advice.</p>"
                 f"<p><b>What is missing.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs). Direct "
                 f"bankruptcy costs are small, but indirect costs (fire sales, customers and suppliers leaving, "
                 f"management time) grow with leverage. Agency costs (debt overhang, risk shifting) grow too. Finally, "
                 f"the shield is worth τ<sub>c</sub> per krone of interest only if there is taxable income to "
                 f"absorb it.</p>"
                 f"<p><b>Typical mistakes:</b> saying the shields are safe because the debt is risk-free (the rate "
                 f"follows the debt policy). Another is stopping at the model's answer without naming the trade-off.</p>"
                 f"<p><b>Remember:</b> fixed schedule, r<sub>D</sub>; target ratio, r<sub>U</sub>; and every extra "
                 f"krone of debt must earn more shield than it adds in distress costs.</p>").replace(
                     "; and every", ". Every"),
        kriterier=[
            "Explains that the schedule is fixed in advance, so the interest and the shields are known amounts as "
            "safe as the debt: discount at r<sub>D</sub> (1 p)",
            "Contrasts with a constant D/V, where the debt and the shields move with the project's value and are "
            "discounted at r<sub>U</sub> (1 p)",
            "Says PV(TS) rises roughly in proportion to the loan, so the APV model alone says borrow as much as "
            "possible (1 p)",
            "Names the costs the model leaves out: expected distress costs (fire sales), agency costs or unusable "
            "deductions, so the optimum is interior (trade-off) (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d, e])


# =====================================================================================
# ov-wac3 · FCF fra resultatregnskapet, terminalverdi og pris per aksje
# =====================================================================================
MAL3 = [("Rondane Sport AS", "chain of sports shops"), ("Fjordbakst AS", "industrial bakery"),
        ("Sunnmøre Møbler AS", "furniture maker"), ("Telemark Trykk AS", "printing house"),
        ("Valdres Vannverk AS", "bottled-water producer"), ("Lofoten Reiser AS", "tour operator"),
        ("Østfold Emballasje AS", "packaging maker"), ("Hallingdal Hytteservice AS", "cabin-maintenance firm")]


@oppgave("ov-wac3", tema="wacc-apv", tittel="Free cash flow, terminal value and the price per share", antall=12,
         sjanger="wacc-apv", kilde="V2022 P3, PS2 E7, Lecture 7 slides 6–7")
def _(r):
    mal, bransje = r.choice(MAL3)
    kr = r.choice(["NOK", "NOK", "$"])
    tau = r.choice([0.22, 0.25])
    R1 = r.choice([200, 240, 300, 400])
    g1, g2 = r.choice([0.05, 0.10, 0.15]), r.choice([0.05, 0.10])
    R = [R1, round(R1 * (1 + g1)), round(R1 * (1 + g1) * (1 + g2))]
    c = r.choice([0.60, 0.65, 0.70])
    C = [round(c * x) for x in R]
    dep0 = r.choice([20, 25, 30])
    Dep = [dep0, dep0 + r.choice([0, 5]), dep0 + r.choice([5, 10])]
    Cap = [x + r.choice([0, 5, 10, 15]) for x in Dep]
    nwc0 = r.choice([50, 60, 70, 80])
    dN = [r.choice([-10, -5, 5, 10]), r.choice([-5, 5, 10]), r.choice([5, 10])]
    NWC = [nwc0, nwc0 + dN[0], nwc0 + dN[0] + dN[1], nwc0 + sum(dN)]
    if min(NWC) <= 10:
        raise Avvis("negativ arbeidskapital")
    Dold = r.choice([150, 200, 250, 300])
    rold = r.choice([0.05, 0.06, 0.08])
    rente = round(Dold * rold)
    Cold = r.choice([0, 20, 40, 50])
    sunk = r.choice([2, 3, 4, 5])
    n = r.choice([5, 8, 10, 20])
    g = r.choice([0.02, 0.025, 0.03])
    rf = r.choice([0.03, 0.035, 0.04])
    mrp = r.choice([0.05, 0.055, 0.06])
    bU = r.choice([0.8, 0.9, 1.0, 1.1, 1.2])
    d = r.choice([0.25, 0.30, 0.40, 0.50])
    rD = rf + r.choice([0.01, 0.015, 0.02])

    EBIT = [R[t] - C[t] - Dep[t] for t in range(3)]
    if min(EBIT) <= 0:
        raise Avvis("negativ EBIT")
    dNWC = [NWC[t + 1] - NWC[t] for t in range(3)]
    FCF = [EBIT[t] * (1 - tau) + Dep[t] - Cap[t] - dNWC[t] for t in range(3)]
    if min(FCF) <= 5:
        raise Avvis("for liten kontantstrøm")
    rU = rf + bU * mrp
    DE = d / (1 - d)
    rE = rU + DE * (rU - rD)
    wacc = (1 - d) * rE + d * rD * (1 - tau)
    if wacc - g < 0.035:
        raise Avvis("WACC for nær vekstraten")
    TV = FCF[2] * (1 + g) / (wacc - g)
    V0 = FCF[0] / (1 + wacc) + FCF[1] / (1 + wacc) ** 2 + (FCF[2] + TV) / (1 + wacc) ** 3
    ND = Dold - Cold
    P = (V0 - ND) / n
    if P <= 5:
        raise Avvis("for lav pris")
    # Honoraret skal være stort nok til at fella «trakk fra sunk cost» ligger minst 0.6 % fra prisen.
    sunk = max(sunk, math.ceil(0.006 * (V0 - ND)))
    # vist
    rU6 = rund(rU, 6)
    rE6 = rund(rU6 + DE * (rU6 - rD), 6)
    w6 = rund((1 - d) * rE6 + d * rD * (1 - tau), 6)
    FCF4v = rund(FCF[2] * (1 + g), 4)
    TVv = rund(FCF4v / (w6 - g), 2)
    pv = [rund(FCF[0] / (1 + w6), 2), rund(FCF[1] / (1 + w6) ** 2, 2), rund((FCF[2] + TVv) / (1 + w6) ** 3, 2)]
    V0v = rund(sum(pv), 2)
    Pv = (V0v - ND) / n
    for vist, eks in ((TVv, TV), (V0v, V0), (Pv, P)):
        _sjekk(vist, eks, 0.0008)

    # feller
    f_rente = [FCF[t] - (1 - tau) * rente for t in range(3)]
    f_niva = [FCF[t] + dNWC[t] - NWC[t + 1] for t in range(3)]
    f_dep = FCF[0] - Dep[0]
    f_fortegn = FCF[0] + 2 * dNWC[0]
    rm = rf + mrp
    f_rU_m = rf + bU * rm
    f_w_ingen = rU6
    f_w_de = ((1 - DE) * rE6 + DE * rD * (1 - tau)) if DE < 1 else None
    f_TV_ikkevekst = FCF[2] / (w6 - g)
    f_TV_rU = FCF4v / (rU6 - g)
    f_TV_null = FCF[2] / w6
    f_V_4 = pv[0] + pv[1] + FCF[2] / (1 + w6) ** 3 + TVv / (1 + w6) ** 4
    f_V_utenTV = pv[0] + pv[1] + FCF[2] / (1 + w6) ** 3
    f_V_rU = (FCF[0] / (1 + rU6) + FCF[1] / (1 + rU6) ** 2 + (FCF[2] + f_TV_rU) / (1 + rU6) ** 3)
    f_P_V = V0v / n
    f_P_brutto = (V0v - Dold) / n
    f_P_sunk = (V0v - ND - sunk) / n
    f_P_mal = (V0v - d * V0v) / n

    def rad(navn, xs, start=None):
        celler = [f"<td>{'' if start is None else tall(start, 0)}</td>"] + [f"<td>{tall(x, 0)}</td>" for x in xs]
        return f"<tr><td>{navn}</td>{''.join(celler)}</tr>"
    tabell = ("<table><tr><th></th><th>Year 0</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr>"
              + rad("Revenue", R) + rad("Operating costs (excluding depreciation)", C) + rad("Depreciation", Dep)
              + rad("Capital expenditure", Cap) + rad("Net working capital (end of year)", NWC[1:], NWC[0])
              + rad("Interest on today's debt", [rente] * 3) + "</table>")
    kasse = (f" and excess cash of {_m(Cold, kr, 0)}" if Cold else "")
    case = (f"<p>A private-equity fund considers buying {mal}, an unlisted {bransje}. The fund has already paid "
            f"{_m(sunk, kr, 0)} for a due-diligence report. Its projections ({kr} million):</p>{tabell}"
            f"<p>From Year 4 on, free cash flow grows at {_pr(g)} a year forever: FCF<sub>4</sub> = FCF<sub>3</sub> × "
            f"(1 + g). Listed peers in the same business have an asset beta of {_b(bU)}. The risk-free rate is "
            f"{_pr(rf)}, the market risk premium is {_pr(mrp)} and the corporate tax rate is {_pr(tau)}.</p>"
            f"<p>After the purchase the fund will keep a constant debt-to-value ratio D/V of {tall(d, 2)} and borrow "
            f"at an expected return of {_pr(rD)}. Today {mal} has debt of {_m(Dold, kr, 0)}{kasse}, which the "
            f"fund takes over with the firm. {mal} has {tall(n, 0)} million shares.</p>"
            f"<p>Give rates in percent with four decimals and amounts with two decimals.</p>")

    def fcf_txt(t):
        dn = dNWC[t]
        dn_txt = (f"− {tall(dn, 0)}" if dn > 0 else f"+ {tall(-dn, 0)}")
        return (f"Year {t + 1}: EBIT = {tall(R[t], 0)} − {tall(C[t], 0)} − {tall(Dep[t], 0)} = {tall(EBIT[t], 0)}; "
                f"FCF = {tall(EBIT[t], 0)} × {tall(1 - tau, 2)} + {tall(Dep[t], 0)} − {tall(Cap[t], 0)} {dn_txt} = "
                f"<b>{tall(FCF[t], 2)}</b>")
    a = tall_del(
        "a", poeng=5,
        q=f"<p>Find {gen(mal)} free cash flow in Years 1, 2 and 3.</p>",
        svar=[T("FCF<sub>1</sub>", FCF[0], kr + " million"), T("FCF<sub>2</sub>", FCF[1], kr + " million"),
              T("FCF<sub>3</sub>", FCF[2], kr + " million")],
        kort=(f"<p><b>FCF = {tall(FCF[0], 2)}, {tall(FCF[1], 2)} and {tall(FCF[2], 2)}.</b> FCF = EBIT(1 − "
              f"τ<sub>c</sub>) + Dep − CapEx − ΔNWC, with ΔNWC = {', '.join(tall(x, 0) for x in dNWC)}; interest "
              f"stays out.</p>"),
        losning=(f"<p>Free cash flow is the cash the assets throw off before any financing: tax is charged on EBIT "
                 f"as if there were no debt. Interest never enters; the cost of debt and its tax shield live in the "
                 f"WACC.</p>"
                 f"<p><b>Step 1: ΔNWC.</b> Working capital ties up cash only when it changes: ΔNWC = "
                 f"{tall(NWC[1], 0)} − {tall(NWC[0], 0)}, {tall(NWC[2], 0)} − {tall(NWC[1], 0)}, {tall(NWC[3], 0)} − "
                 f"{tall(NWC[2], 0)} = {', '.join(tall(x, 0) for x in dNWC)}. A fall releases cash.</p>"
                 f"<p><b>Step 2: FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC.</b> {fcf_txt(0)}. "
                 f"{fcf_txt(1)}. {fcf_txt(2)}.</p>"
                 f"<p><b>First check.</b> EBITDA(1 − τ<sub>c</sub>) + τ<sub>c</sub> × Dep − CapEx − ΔNWC for Year 1: "
                 f"{tall(R[0] - C[0], 0)} × {tall(1 - tau, 2)} + {tall(tau, 2)} × {tall(Dep[0], 0)} − "
                 f"{tall(Cap[0], 0)} {'−' if dNWC[0] > 0 else '+'} {tall(abs(dNWC[0]), 0)} = "
                 f"{tall((R[0] - C[0]) * (1 - tau) + tau * Dep[0] - Cap[0] - dNWC[0], 2)}. The same: depreciation "
                 f"is worth only its tax saving.</p>"
                 f"<p><b>Remember:</b> no interest, the change in NWC and depreciation added back.</p>"),
        feller=_filtrer([
            Felle(f_rente[0], f"You subtracted the interest of {tall(rente, 0)} after tax. Interest is financing: the "
                              f"WACC accounts for it.", i=0),
            Felle(f_rente[1], f"You subtracted the interest of {tall(rente, 0)} after tax. Interest is financing.", i=1),
            Felle(f_rente[2], f"You subtracted the interest of {tall(rente, 0)} after tax. Interest is financing.", i=2),
            Felle(f_niva[0], "You subtracted the level of net working capital. Only the change ties up cash.", i=0),
            Felle(f_niva[1], "You subtracted the level of net working capital. Only the change ties up cash.", i=1),
            Felle(f_niva[2], "You subtracted the level of net working capital. Only the change ties up cash.", i=2),
            Felle(f_dep, "You forgot to add back depreciation. It reduced the tax, but no cash left the firm.", i=0),
            Felle(f_fortegn, "You got the sign of ΔNWC wrong. More working capital uses cash; less releases it.", i=0),
        ], FCF),
    )

    b = tall_del(
        "b", poeng=3,
        q=("<p>Find the unlevered cost of capital r<sub>U</sub> and the after-tax WACC r<sub>wacc</sub> after the "
           "purchase.</p>"),
        selvstendig=True,
        svar=[T("r<sub>U</sub>", rU * 100, "%"), T("r<sub>wacc</sub>", wacc * 100, "%")],
        kort=(f"<p><b>r<sub>U</sub> = {pst(rU6, 4)}, r<sub>wacc</sub> = {pst(w6, 4)}.</b> r<sub>E</sub> = "
              f"{pst(rU6, 4)} + {tall(DE, 4)} × ({pst(rU6, 4)} − {_pr(rD)}) = {pst(rE6, 4)}.</p>"),
        losning=(f"<p>The peers' asset beta measures the business risk. The fund's own leverage then sets "
                 f"r<sub>E</sub> and the WACC. The debt the firm has today and its interest are irrelevant here: the "
                 f"cash flows will be financed at the fund's target D/V.</p>"
                 f"<p><b>Step 1: r<sub>U</sub>.</b> {_pr(rf)} + {_b(bU)} × {_pr(mrp)} = <b>{pst(rU6, 4)}</b>.</p>"
                 f"<p><b>Step 2: r<sub>E</sub>.</b> D/E = {tall(d, 2)}/{tall(1 - d, 2)} = {tall(DE, 4)}: "
                 f"r<sub>E</sub> = {pst(rU6, 4)} + {tall(DE, 4)} × ({pst(rU6, 4)} − {_pr(rD)}) = {pst(rE6, 4)}.</p>"
                 f"<p><b>Step 3: WACC.</b> {tall(1 - d, 2)} × {pst(rE6, 4)} + {tall(d, 2)} × {_pr(rD)} × "
                 f"{tall(1 - tau, 2)} = <b>{pst(w6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {pst(rU6, 4)} − "
                 f"{tall(d, 2)} × {tall(tau, 2)} × {_pr(rD)} = {pst(rU6 - d * tau * rD, 4)}, the WACC above up to rounding: an identity that catches "
                 f"arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> the WACC uses the fund's target leverage, not the debt the firm has today.</p>"),
        feller=_filtrer([
            Felle(f_rU_m * 100, f"You multiplied β<sub>U</sub> by {_pr(rm)}, the market return. The CAPM uses the "
                                f"premium of {_pr(mrp)}.", i=0),
            Felle(f_w_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax WACC, "
                                   "r<sub>U</sub>.", i=1),
            Felle(f_w_de * 100, f"You used D/E = {tall(DE, 4)} as the debt weight.", i=1) if f_w_de else None,
        ], [rU * 100, wacc * 100]),
    )

    c = tall_del(
        "c", poeng=4,
        q=(f"<p>Find the terminal value at the end of Year 3 and the value of the firm V<sup>L</sup> today, using "
           f"the WACC method.</p>"),
        gitt=(f"<p>From (a) and (b): FCF<sub>1</sub> = {tall(FCF[0], 2)}, FCF<sub>2</sub> = {tall(FCF[1], 2)}, "
              f"FCF<sub>3</sub> = {tall(FCF[2], 2)} and r<sub>wacc</sub> = {pst(w6, 4)}.</p>"),
        svar=[T("TV<sub>3</sub>", TV, kr + " million"), T("V<sup>L</sup><sub>0</sub>", V0, kr + " million")],
        kort=(f"<p><b>TV<sub>3</sub> = {tall(TVv, 2)}, V<sup>L</sup><sub>0</sub> = {_m(V0v, kr)}.</b> TV<sub>3</sub> = "
              f"{tall(FCF[2], 2)} × {tall(1 + g, 3)}/({pst(w6, 4)} − {_pr(g)}); discount it three years with "
              f"FCF<sub>3</sub>.</p>"),
        losning=(f"<p>The terminal value is the value at the end of Year 3 of all cash flows from Year 4 on, a "
                 f"growing perpetuity that starts with FCF<sub>4</sub>. It sits at Year 3, so it is discounted three "
                 f"years, like FCF<sub>3</sub>.</p>"
                 f"<p><b>Step 1: FCF<sub>4</sub>.</b> {tall(FCF[2], 2)} × {tall(1 + g, 3)} = {tall(FCF4v, 4)}.</p>"
                 f"<p><b>Step 2: TV<sub>3</sub>.</b> {tall(FCF4v, 4)}/({pst(w6, 4)} − {_pr(g)}) = "
                 f"<b>{tall(TVv, 2)}</b>.</p>"
                 f"<p><b>Step 3: discount.</b> {tall(FCF[0], 2)}/{tall(1 + w6, 6)} = {tall(pv[0], 2)}; "
                 f"{tall(FCF[1], 2)}/{tall(1 + w6, 6)}² = {tall(pv[1], 2)}; ({tall(FCF[2], 2)} + {tall(TVv, 2)})/"
                 f"{tall(1 + w6, 6)}³ = {tall(pv[2], 2)}. V<sup>L</sup><sub>0</sub> = <b>{_m(V0v, kr)}</b>.</p>"
                 f"<p><b>First check.</b> Roll back one year at a time: V<sub>2</sub> = ({tall(FCF[2], 2)} + "
                 f"{tall(TVv, 2)})/{tall(1 + w6, 6)} = {tall((FCF[2] + TVv) / (1 + w6), 2)}, V<sub>1</sub> = "
                 f"({tall(FCF[1], 2)} + V<sub>2</sub>)/{tall(1 + w6, 6)} = "
                 f"{tall((FCF[1] + (FCF[2] + TVv) / (1 + w6)) / (1 + w6), 2)}, V<sub>0</sub> = ({tall(FCF[0], 2)} + "
                 f"V<sub>1</sub>)/{tall(1 + w6, 6)} = {tall((FCF[0] + (FCF[1] + (FCF[2] + TVv) / (1 + w6)) / (1 + w6)) / (1 + w6), 2)}. "
                 f"The discounted terminal value, {tall(TVv / (1 + w6) ** 3, 2)}, is "
                 f"{tall(TVv / (1 + w6) ** 3 / V0v * 100, 0)}% of the value, so g and the WACC matter most.</p>"
                 f"<p><b>Remember:</b> TV<sub>3</sub> uses FCF<sub>4</sub> and is discounted three years.</p>"),
        feller=_filtrer([
            Felle(f_TV_ikkevekst, "You used FCF<sub>3</sub> in the numerator. The perpetuity starts with "
                                  "FCF<sub>4</sub> = FCF<sub>3</sub>(1 + g).", i=0),
            Felle(f_TV_rU, "You discounted at r<sub>U</sub>, which leaves out the tax shield of the fund's debt.", i=0),
            Felle(f_TV_null, "You left out the growth: a growing perpetuity divides by r<sub>wacc</sub> − g.", i=0),
            Felle(f_V_4, "You discounted the terminal value four years. It is a value at Year 3.", i=1),
            Felle(f_V_utenTV, "You left out the terminal value. The firm lives on after Year 3.", i=1),
            Felle(f_V_rU, "You discounted at r<sub>U</sub>. That is the unlevered value, without the tax shield.", i=1),
        ], [TV, V0]),
    )

    netto_txt = (f"Net debt is {tall(Dold, 0)} − {tall(Cold, 0)} = {tall(ND, 0)}: excess cash comes with the firm."
                 if Cold else f"The firm has no excess cash, so net debt is the debt of {tall(Dold, 0)}.")
    d_ = tall_del(
        "d", poeng=3,
        q=f"<p>What is the most the fund should pay per share for {mal}?</p>",
        gitt=f"<p>From (c): V<sup>L</sup><sub>0</sub> = {tall(V0v, 2)}.</p>",
        svar=[T("price per share", P, kr + " per share")],
        kort=(f"<p><b>{penger(Pv, 2, kr)} per share.</b> ({tall(V0v, 2)} − {tall(ND, 0)})/{tall(n, 0)}; the "
              f"due-diligence fee is sunk.</p>"),
        losning=(f"<p>The fund buys the equity. It is worth the firm's value minus the net debt the fund takes over "
                 f"with it. How the fund relevers afterwards is a separate, zero-NPV deal with its lenders.</p>"
                 f"<p><b>Step 1: net debt.</b> {netto_txt}</p>"
                 f"<p><b>Step 2: equity.</b> {tall(V0v, 2)} − {tall(ND, 0)} = {tall(V0v - ND, 2)}.</p>"
                 f"<p><b>Step 3: per share.</b> {tall(V0v - ND, 2)}/{tall(n, 0)} = <b>{penger(Pv, 2, kr)}</b>. The "
                 f"{tall(sunk, 0)} already paid for the report is sunk: it is spent whatever the fund decides.</p>"
                 f"<p><b>First check.</b> At this price the fund's NPV is V<sup>L</sup> − net debt − price × shares "
                 f"= {tall(V0v, 2)} − {tall(ND, 0)} − {tall(Pv * n, 2)} = 0, the break-even it should be.</p>"
                 f"<p><b>Remember:</b> equity = V<sup>L</sup> − net debt; ignore sunk costs.</p>"),
        feller=_filtrer([
            Felle(f_P_V, "You divided the whole firm value by the shares. The lenders' claim comes first.", i=0),
            Felle(f_P_brutto, f"You subtracted the gross debt of {tall(Dold, 0)}. The excess cash comes with the "
                              f"firm.", i=0) if Cold else None,
            Felle(f_P_sunk, "You subtracted the due-diligence fee. It is sunk: paid whatever the fund decides.", i=0),
            Felle(f_P_mal, f"You subtracted the debt the fund will carry after the purchase ({tall(d, 2)} × "
                           f"V<sup>L</sup>). The sellers hand over the firm with today's net debt.", i=0),
        ], [P]),
    )

    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>A junior analyst subtracts the interest of {tall(rente, 0)} when computing free cash flow, subtracts "
           f"the level of net working capital rather than its change and subtracts the due-diligence fee from the "
           f"value of the equity. Explain what is wrong with each step. Why is depreciation added back to free cash "
           f"flow?</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>Free cash flow is the cash the assets generate as if all-equity; the cost of debt and its tax "
              f"shield are in the WACC, so subtracting interest counts the financing twice and undervalues the firm. "
              f"Only the change in net working capital ties up or releases cash, since the level today was paid for "
              f"long ago. The due-diligence fee is sunk: it is paid whatever the fund decides, so it changes neither "
              f"the value nor the price the fund can pay. Depreciation is not a cash payment: it is subtracted only to "
              f"compute the tax and then added back, so its effect on FCF is the tax saving τ<sub>c</sub> × Dep.</p>"),
        losning=(f"<p><b>Interest.</b> Kurbatov: the biggest mistake is reinventing the FCF formula under stress. The "
                 f"WACC already charges r<sub>D</sub>(1 − τ<sub>c</sub>) on the debt; taking interest out of the cash "
                 f"flow as well charges the lenders twice. Here that would cut each FCF by "
                 f"{tall((1 - tau) * rente, 2)}.</p>"
                 f"<p><b>Working capital.</b> FCF counts cash that leaves or enters the firm in the year. A stock of "
                 f"inventory and receivables that was already there costs nothing new; only an increase does. A "
                 f"decrease releases cash. Forgetting the delta is one of the most common exam errors.</p>"
                 f"<p><b>Sunk cost.</b> The fee is gone whether the fund buys or not, so it is irrelevant for the "
                 f"decision and for the maximum price.</p>"
                 f"<p><b>Depreciation.</b> It spreads an old capital expenditure over time. It lowers taxable "
                 f"income, so it saves tax, but no cash leaves when it is booked. The equivalent form "
                 f"EBITDA(1 − τ<sub>c</sub>) + τ<sub>c</sub>Dep − CapEx − ΔNWC shows this directly.</p>"
                 f"<p><b>Remember:</b> FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC, with no interest and no "
                 f"sunk costs.</p>"),
        kriterier=[
            "Explains that interest is financing: the WACC already contains the cost of debt and its tax shield, so "
            "subtracting it counts it twice and undervalues the firm (1 p)",
            "Explains that only the change in net working capital ties up or releases cash, not the level (1 p)",
            "Identifies the due-diligence fee as a sunk cost that does not affect the value or the price (1 p)",
            "Explains that depreciation is not a cash flow: it lowers taxes and is added back, so it adds only its "
            "tax saving (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d_, e])


# =====================================================================================
# ov-wac4 · Gjeldskapasitet og flow to equity for et prosjekt
# =====================================================================================
FIRMA4 = [("Vardø Fiskemottak ASA", "a new filleting line"), ("Hadeland Glassverk ASA", "a recycling furnace"),
          ("Ringerike Betong ASA", "a precast-element plant"), ("Molde Mekaniske ASA", "a robot welding cell"),
          ("Narvik Havn ASA", "a container crane"), ("Kragerø Båtbygg ASA", "a composite-hull mould shop"),
          ("Sauda Smelteverk ASA", "an energy-recovery unit"), ("Alta Skifer ASA", "a new cutting hall")]


@oppgave("ov-wac4", tema="wacc-apv", tittel="Debt capacity and flow to equity for a project", antall=12,
         sjanger="wacc-apv", kilde="Lecture 7 slides 21–22, Lecture 8 slides 3–10, PS2 E3")
def _(r):
    fi, prosjekt = r.choice(FIRMA4)
    kr = r.choice(["NOK", "NOK", "$"])
    tau = r.choice([0.22, 0.25, 0.30])
    dv = r.choice([0.25, 0.40, 0.50])
    E = r.choice([600, 900, 1200, 1500])
    Dn = round(E * dv / (1 - dv))
    C = r.choice([0, 30, 50, 100])
    Dg = Dn + C
    rE = r.choice([0.10, 0.11, 0.12, 0.13, 0.14])
    rD = r.choice([0.05, 0.06, 0.07])
    inv = r.choice([100, 120, 150, 200])
    F = [round(inv * x) for x in (r.choice([0.35, 0.40, 0.45]), r.choice([0.40, 0.45, 0.50]),
                                  r.choice([0.40, 0.50, 0.55]))]

    wacc = (1 - dv) * rE + dv * rD * (1 - tau)
    V = [0.0] * 4
    for t in (2, 1, 0):
        V[t] = (F[t] + V[t + 1]) / (1 + wacc)
    npv = V[0] - inv
    if not 0.05 * inv <= npv <= 0.40 * inv:
        raise Avvis("NPV utenfor rimelig område")
    D = [dv * V[t] for t in range(4)]
    if D[0] >= inv:
        raise Avvis("gjeldskapasiteten dekker hele investeringen")
    FCFE = [D[0] - inv] + [F[t - 1] - (1 - tau) * rD * D[t - 1] + (D[t] - D[t - 1]) for t in (1, 2, 3)]
    npvE = FCFE[0] + sum(FCFE[t] / (1 + rE) ** t for t in (1, 2, 3))
    assert abs(npvE - npv) < 1e-8
    # vist
    w6 = rund(wacc, 6)
    Vv = [0.0] * 4
    for t in (2, 1, 0):
        Vv[t] = rund((F[t] + Vv[t + 1]) / (1 + w6), 4)
    npvv = rund(Vv[0] - inv, 4)
    Dv = [rund(dv * x, 4) for x in Vv]
    rentev = [rund(rD * Dv[t], 4) for t in range(3)]
    FCFEv = [rund(Dv[0] - inv, 4)] + [rund(F[t - 1] - (1 - tau) * rentev[t - 1] + (Dv[t] - Dv[t - 1]), 4)
                                      for t in (1, 2, 3)]
    pvE = [rund(FCFEv[t] / (1 + rE) ** t, 4) for t in (1, 2, 3)]
    npvEv = rund(FCFEv[0] + sum(pvE), 4)
    for vist, eks in ((Vv[0], V[0]), (Dv[1], D[1]), (FCFEv[1], FCFE[1])):
        _sjekk(vist, eks, 0.0008)
    if abs(npvEv - npv) > max(0.002 * abs(npv), 0.05):
        raise Avvis("FTE-kjeden spriker")

    # feller
    f_w_brutto = ((E / (E + Dg)) * rE + Dg / (E + Dg) * rD * (1 - tau)) if C else None
    f_w_ingen = (1 - dv) * rE + dv * rD
    f_V_rE = sum(F[t] / (1 + rE) ** (t + 1) for t in range(3))
    f_npv_rU = sum(F[t] / (1 + f_w_ingen) ** (t + 1) for t in range(3)) - inv
    f_D_inv = dv * inv
    f_D1_cum = dv * (F[0] + Vv[1])
    f_D_de = [dv / (1 - dv) * x for x in Vv]
    f_E0_fcf0 = -inv
    f_E1_uten = F[0] - (1 - tau) * rentev[0]
    f_E1_pretax = F[0] - rentev[0] + (Dv[1] - Dv[0])
    f_E1_pluss = F[0] - (1 - tau) * rentev[0] - (Dv[1] - Dv[0])
    f_npvE_w = FCFEv[0] + sum(FCFEv[t] / (1 + w6) ** t for t in (1, 2, 3))
    f_npvE_uten = -inv + sum((F[t - 1] - (1 - tau) * rentev[t - 1]) / (1 + rE) ** t for t in (1, 2, 3))

    kol = "".join(f"<th>{t}</th>" for t in range(4))
    rad = f"<td>{MINUS}{tall(inv, 0)}</td>" + "".join(f"<td>{tall(x, 0)}</td>" for x in F)
    tabell = f"<table><tr><th>Year</th>{kol}</tr><tr><td>Free cash flow ({kr} million)</td>{rad}</tr></table>"
    kasse = (f" It also holds {_m(C, kr, 0)} of excess cash." if C else "")
    case = (f"<p>{fi} has equity with a market value of {_m(E, kr, 0)} and debt of {_m(Dg, kr, 0)}.{kasse} Its cost of "
            f"equity is {_pr(rE)} and its cost of debt is {_pr(rD)}. The corporate tax rate is {_pr(tau)}. {fi} keeps "
            f"its debt-to-value ratio (on net debt) constant, rebalancing at the end of every year. It will do "
            f"the same for new projects.</p>"
            f"<p>The firm considers {prosjekt}, which has the same risk as the firm. Its free cash flows are:</p>"
            f"{tabell}<p>After Year 3 the project ends with nothing left. Interest on the project's debt is paid "
            f"each year on the debt at the start of the year. Give rates in percent with four decimals and amounts "
            f"with four decimals.</p>")

    a = tall_del(
        "a", poeng=3,
        q=f"<p>Find {gen(fi)} after-tax WACC r<sub>wacc</sub>, which is also the project's.</p>",
        svar=[T("r<sub>wacc</sub>", wacc * 100, "%")],
        kort=(f"<p><b>r<sub>wacc</sub> = {pst(w6, 4)}.</b> Net debt {tall(Dn, 0)}, D/V = {tall(dv, 2)}: "
              f"{tall(1 - dv, 2)} × {_pr(rE)} + {tall(dv, 2)} × {_pr(rD)} × {tall(1 - tau, 2)}.</p>"),
        losning=(f"<p>The project has the firm's risk and is financed with the firm's ratio, so the firm's WACC is "
                 f"its discount rate. Weights use market values and net debt. Had the project a different risk, a "
                 f"twin would be needed instead.</p>"
                 + (f"<p><b>Step 1: net debt.</b> {tall(Dg, 0)} − {tall(C, 0)} = {tall(Dn, 0)}.</p>" if C else
                    f"<p><b>Step 1: debt.</b> No excess cash, so D = {tall(Dn, 0)}.</p>")
                 + f"<p><b>Step 2: weights.</b> V = {tall(E, 0)} + {tall(Dn, 0)} = {tall(E + Dn, 0)}, so D/V = "
                 f"{tall(dv, 2)} and E/V = {tall(1 - dv, 2)}.</p>"
                 f"<p><b>Step 3: WACC.</b> {tall(1 - dv, 2)} × {_pr(rE)} + {tall(dv, 2)} × {_pr(rD)} × "
                 f"{tall(1 - tau, 2)} = <b>{pst(w6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The pre-tax WACC is {pst(f_w_ingen, 4)} = r<sub>U</sub>. The after-tax "
                 f"WACC lies below it by (D/V)τ<sub>c</sub>r<sub>D</sub> = {pst(dv * tau * rD, 4)}.</p>"
                 f"<p><b>Remember:</b> net debt in the weights and (1 − τ<sub>c</sub>) on the cost of debt only.</p>"),
        feller=_filtrer([
            Felle(f_w_brutto * 100, f"You used gross debt ({tall(Dg, 0)}). Excess cash offsets debt.")
            if f_w_brutto else None,
            Felle(f_w_ingen * 100, "You left out (1 − τ<sub>c</sub>). That is the pre-tax WACC, r<sub>U</sub>."),
        ], [wacc * 100]),
    )

    b = tall_del(
        "b", poeng=4,
        q="<p>Find the project's levered value V<sup>L</sup><sub>0</sub> today and its NPV.</p>",
        gitt=f"<p>From (a): r<sub>wacc</sub> = {pst(w6, 4)}.</p>",
        svar=[T("V<sup>L</sup><sub>0</sub>", V[0], kr + " million"), T("NPV", npv, kr + " million")],
        kort=(f"<p><b>V<sup>L</sup><sub>0</sub> = {tall(Vv[0], 4)}, NPV = {_m(npvv, kr, 4)}.</b> Roll back: "
              f"V<sup>L</sup><sub>2</sub> = {tall(Vv[2], 4)}, V<sup>L</sup><sub>1</sub> = {tall(Vv[1], 4)}.</p>"),
        losning=(f"<p>Discount the project's free cash flow at the WACC, one year at a time from the end. The WACC "
                 f"already contains the tax benefit of the debt the project supports, so the result is the levered "
                 f"value. The values at each date are needed again for the debt. Kurbatov: evaluating the project "
                 f"means its NPV, not its value and not the new value of the firm.</p>"
                 f"<p><b>Step 1.</b> V<sup>L</sup><sub>2</sub> = {tall(F[2], 0)}/{tall(1 + w6, 6)} = {tall(Vv[2], 4)}.</p>"
                 f"<p><b>Step 2.</b> V<sup>L</sup><sub>1</sub> = ({tall(F[1], 0)} + {tall(Vv[2], 4)})/{tall(1 + w6, 6)} "
                 f"= {tall(Vv[1], 4)}.</p>"
                 f"<p><b>Step 3.</b> V<sup>L</sup><sub>0</sub> = ({tall(F[0], 0)} + {tall(Vv[1], 4)})/"
                 f"{tall(1 + w6, 6)} = <b>{tall(Vv[0], 4)}</b>. NPV = {tall(Vv[0], 4)} − {tall(inv, 0)} = "
                 f"<b>{_m(npvv, kr, 4)}</b>.</p>"
                 f"<p><b>First check.</b> Discounting directly: {tall(F[0], 0)}/{tall(1 + w6, 6)} + "
                 f"{tall(F[1], 0)}/{tall(1 + w6, 6)}² + {tall(F[2], 0)}/{tall(1 + w6, 6)}³ = "
                 f"{tall(sum(F[t] / (1 + w6) ** (t + 1) for t in range(3)), 4)}, the same value.</p>"
                 f"<p><b>Remember:</b> the project's NPV subtracts the investment; the value does not.</p>"),
        feller=_filtrer([
            Felle(f_V_rE, "You discounted the project's free cash flow at r<sub>E</sub>. FCF belongs with the "
                          "WACC.", i=0),
            Felle(sum(F[t] / (1 + f_w_ingen) ** (t + 1) for t in range(3)), "You discounted at the pre-tax WACC, "
                  "r<sub>U</sub>. That leaves out the tax shield.", i=0),
            Felle(Vv[0], "This is the value of the project. The NPV subtracts the investment.", i=1),
            Felle(f_npv_rU, "You discounted at r<sub>U</sub>. That is the NPV without the tax shield.", i=1),
        ], [V[0], npv]),
    )

    c = tall_del(
        "c", poeng=4,
        q="<p>Find the project's debt capacity at the end of Years 0, 1 and 2.</p>",
        gitt=(f"<p>From (b): V<sup>L</sup><sub>0</sub> = {tall(Vv[0], 4)}, V<sup>L</sup><sub>1</sub> = "
              f"{tall(Vv[1], 4)} and V<sup>L</sup><sub>2</sub> = {tall(Vv[2], 4)}.</p>"),
        svar=[T("D<sub>0</sub>", D[0], kr + " million"), T("D<sub>1</sub>", D[1], kr + " million"),
              T("D<sub>2</sub>", D[2], kr + " million")],
        kort=(f"<p><b>D<sub>0</sub> = {tall(Dv[0], 4)}, D<sub>1</sub> = {tall(Dv[1], 4)}, D<sub>2</sub> = "
              f"{tall(Dv[2], 4)}.</b> D<sub>t</sub> = {tall(dv, 2)} × V<sup>L</sup><sub>t</sub>.</p>"),
        losning=(f"<p>Debt capacity is the debt the firm must carry because of the project to keep its D/V at "
                 f"{tall(dv, 2)}: D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>. It is set by the project's value, "
                 f"not by its cost.</p>"
                 f"<p><b>Step 1.</b> D<sub>0</sub> = {tall(dv, 2)} × {tall(Vv[0], 4)} = <b>{tall(Dv[0], 4)}</b>.</p>"
                 f"<p><b>Step 2.</b> D<sub>1</sub> = {tall(dv, 2)} × {tall(Vv[1], 4)} = <b>{tall(Dv[1], 4)}</b>.</p>"
                 f"<p><b>Step 3.</b> D<sub>2</sub> = {tall(dv, 2)} × {tall(Vv[2], 4)} = <b>{tall(Dv[2], 4)}</b>. "
                 f"D<sub>3</sub> = 0 when the project ends.</p>"
                 f"<p><b>First check.</b> The debt falls with the value, so the firm repays "
                 f"{tall(Dv[0] - Dv[1], 4)}, {tall(Dv[1] - Dv[2], 4)} and {tall(Dv[2], 4)} at the ends of Years 1 to "
                 f"3, which sums to D<sub>0</sub> = {tall(Dv[0], 4)}.</p>"
                 f"<p><b>Remember:</b> d × value, not d × investment: a positive-NPV project supports more debt than "
                 f"d × {tall(inv, 0)} = {tall(dv * inv, 2)}.</p>"),
        feller=_filtrer([
            Felle(f_D_inv, f"You took D/V times the investment. Debt capacity follows the project's value.", i=0),
            Felle(f_D_de[0], f"You multiplied by D/E instead of D/V.", i=0) if dv != 0.5 else None,
            Felle(f_D_de[1], f"You multiplied by D/E instead of D/V.", i=1) if dv != 0.5 else None,
            Felle(Dv[0], "You kept the debt at its opening level. The firm rebalances as the value falls.", i=1),
            Felle(f_D1_cum, f"You included the Year-1 cash flow of {tall(F[0], 0)} in the value at Year 1.", i=1),
        ], [D[0], D[1], D[2]]),
    )

    def fcfe_txt(t):
        dd = Dv[t] - Dv[t - 1]
        return (f"FCFE<sub>{t}</sub> = {tall(F[t - 1], 0)} − {tall(1 - tau, 2)} × {_pr(rD)} × {tall(Dv[t - 1], 4)} "
                f"{'−' if dd < 0 else '+'} {tall(abs(dd), 4)} = {tall(FCFEv[t], 4)}")
    d = tall_del(
        "d", poeng=4,
        q=(f"<p>Value the project from the shareholders' point of view (flow to equity). Find the free cash flow "
           f"to equity in Years 0 and 1 and the NPV to {gen(fi)} shareholders. The project has the firm's cost of "
           f"equity.</p>"),
        gitt=(f"<p>From (c): D<sub>0</sub> = {tall(Dv[0], 4)}, D<sub>1</sub> = {tall(Dv[1], 4)} and D<sub>2</sub> = "
              f"{tall(Dv[2], 4)}.</p>"),
        svar=[T("FCFE<sub>0</sub>", FCFE[0], kr + " million"), T("FCFE<sub>1</sub>", FCFE[1], kr + " million"),
              T("NPV to shareholders", npv, kr + " million")],
        kort=(f"<p><b>FCFE<sub>0</sub> = {tall(FCFEv[0], 4)}, FCFE<sub>1</sub> = {tall(FCFEv[1], 4)}, NPV = "
              f"{tall(npvEv, 4)}.</b> FCFE = FCF − (1 − τ<sub>c</sub>) × interest + ΔD, discounted at "
              f"{_pr(rE)}.</p>"),
        losning=(f"<p>Flow to equity follows the cash to and from the shareholders after the lenders have been "
                 f"served: FCFE<sub>t</sub> = FCF<sub>t</sub> − (1 − τ<sub>c</sub>) × interest<sub>t</sub> + "
                 f"(D<sub>t</sub> − D<sub>t−1</sub>). The after-tax interest carries the tax shield with it, so no "
                 f"separate term is needed. Discount at r<sub>E</sub>.</p>"
                 f"<p><b>Step 1: Year 0.</b> The investment is paid partly with new debt: FCFE<sub>0</sub> = "
                 f"−{tall(inv, 0)} + {tall(Dv[0], 4)} = <b>{tall(FCFEv[0], 4)}</b>.</p>"
                 f"<p><b>Step 2: Years 1 to 3.</b> {fcfe_txt(1)}; {fcfe_txt(2)}; {fcfe_txt(3)}.</p>"
                 f"<p><b>Step 3: discount at r<sub>E</sub>.</b> {tall(FCFEv[0], 4)} + {tall(FCFEv[1], 4)}/"
                 f"{tall(1 + rE, 2)} + {tall(FCFEv[2], 4)}/{tall(1 + rE, 2)}² + {tall(FCFEv[3], 4)}/"
                 f"{tall(1 + rE, 2)}³ = {_sum([tall(FCFEv[0], 4)] + [tall(x, 4) for x in pvE])} = "
                 f"<b>{tall(npvEv, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The NPV to shareholders equals the project NPV from (b), "
                 f"{tall(npvv, 4)}, up to rounding. Like WACC = APV this is a fixed point, since the debt came "
                 f"from the WACC values, but it catches a missing ΔD or interest taken before tax.</p>"
                 f"<p><b>Remember:</b> net borrowing in with a plus, after-tax interest out and r<sub>E</sub> as the "
                 f"rate.</p>"),
        feller=_filtrer([
            Felle(f_E0_fcf0, "You left out the new debt at Year 0. The debt capacity pays part of the "
                             "investment.", i=0),
            Felle(f_E1_uten, "You left out the net borrowing: the repayment of debt at Year 1 is paid by the "
                             "shareholders.", i=1),
            Felle(f_E1_pretax, "You subtracted the interest before tax. The shareholders pay it after the tax "
                               "saving.", i=1),
            Felle(f_E1_pluss, "You got the sign of the debt change wrong. Repaying debt takes cash from the "
                              "shareholders.", i=1),
            Felle(f_npvE_w, "You discounted the flows to equity at the WACC. They take r<sub>E</sub>.", i=2),
            Felle(f_npvE_uten, "You left out the debt flows. Without the borrowing and the repayments the flows are "
                               "not the shareholders'.", i=2),
        ], [FCFE[0], FCFE[1], npv]),
    )

    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>The CFO says: «The shareholders must put up {tall(-FCFEv[0], 2)} today while the lenders put up only "
           f"{tall(Dv[0], 2)}, so the project cannot be good for the shareholders.» Explain why the CFO is wrong, how "
           f"the project is financed today and who captures the NPV.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) to (d): NPV = {tall(npvv, 4)}, D<sub>0</sub> = {tall(Dv[0], 4)}, FCFE<sub>0</sub> = "
              f"{tall(FCFEv[0], 4)} and the NPV to shareholders is {tall(npvEv, 4)}.</p>"),
        kort=(f"<p>A negative FCFE<sub>0</sub> is an investment, not a loss: the debt capacity of {tall(Dv[0], 2)} covers "
              f"only part of the {tall(inv, 0)}, so the shareholders fund the rest. Their later flows, net of "
              f"after-tax interest and repayments, are worth more than that at r<sub>E</sub>: flow to equity gives "
              f"them an NPV of {tall(npvEv, 2)}, the project's NPV. The lenders get a fair, zero-NPV loan, so the "
              f"whole NPV goes to the shareholders. The firm borrows against the project's value, d × "
              f"V<sup>L</sup><sub>0</sub>, not its cost, which is why a value-creating project supports more debt "
              f"than d × {tall(inv, 0)}.</p>"),
        losning=(f"<p><b>Financing today.</b> The project costs {tall(inv, 0)}. Keeping D/V at {tall(dv, 2)} means "
                 f"borrowing {tall(Dv[0], 4)} against the project's value. The shareholders put in the remaining "
                 f"{tall(-FCFEv[0], 4)}. The Alcatel exercise in problem set 2 shows the same pattern: a negative FCFE at year 0 "
                 f"with a large positive NPV.</p>"
                 f"<p><b>Who gains.</b> The lenders lend at a fair rate, so their NPV is zero. Everything the project "
                 f"adds lands on the equity: the shareholders' NPV by flow to equity is {tall(npvEv, 4)}, equal to "
                 f"the project's NPV.</p>"
                 f"<p><b>Why the debt is larger than d × cost.</b> With a target ratio the firm's borrowing follows "
                 f"value. The project raises the firm's value by {tall(Vv[0], 4)}, so it supports "
                 f"{tall(Dv[0], 4)} of debt, more than d × {tall(inv, 0)} = {tall(dv * inv, 2)}, even if the cash is "
                 f"not needed.</p>"
                 f"<p><b>Typical mistakes:</b> reading a negative FCFE<sub>0</sub> as a negative NPV. Another is "
                 f"thinking the lenders share the NPV.</p>"
                 f"<p><b>Remember:</b> the shareholders fund I − D<sub>0</sub> and receive the whole NPV.</p>"),
        kriterier=[
            "Explains that FCFE<sub>0</sub> is negative because the debt capacity covers only part of the investment; "
            "the shareholders fund the rest as an investment, not a loss (1 p)",
            "States that the later flows to equity are worth more than that at r<sub>E</sub>: the NPV to shareholders "
            "equals the project's NPV (1 p)",
            "Says the lenders get a fair, zero-NPV loan, so the whole NPV goes to the shareholders (1 p)",
            "Explains that with a constant D/V the firm borrows against the project's value (d × V<sup>L</sup>), not "
            "its cost (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d, e])
