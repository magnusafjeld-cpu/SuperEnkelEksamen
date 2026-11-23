# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: tvillingfirma og kapitalkostnaden (skribent 1).

   ov-tvi1  prosjekt utenfor kjernevirksomheten priset med en tvilling, ikke med
            firmaets egen WACC (forelesning 8 lysbilde 12–15, H2024 E5)
   ov-tvi2  to tvillinger: r_U for hver, snittet, relevering, verdi og pris per aksje
            (forelesning 8 lysbilde 12, «could easily be in the exam»)
   ov-tvi3  egen gearing endres: β_U, lovet rente mot forventet avkastning på ny gjeld,
            β_E og r_E etter, WACC før og etter (V2024 P2 d, forelesning 10, kj8)

   Konvensjonene (docs/fie402-trening-spek.md § 3b): β_U og r_U uten skatt i vektene
   (konstant D/V), netto gjeld, r_D er forventet avkastning (y − p × L), fire desimaler.
   Mellomtallene vises med fire desimaler og kjeden regnes videre fra de viste tallene.
   T.verdi er den eksakte verdien, og _sjekk avviser varianten når de to spriker.
"""
from ov_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------- hjelpere
def _sjekk(vist, eksakt, rel=0.0015):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner for langt fra eksakt."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-12):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _pr(x):
    """Rente som brøk → prosenttekst med så få desimaler som trengs (4.5%, 4.75%)."""
    for d in (0, 1, 2, 3):
        if abs(x * 100 - rund(x * 100, d)) < 1e-9:
            return prosent_tekst(x * 100, d)
    return prosent_tekst(x * 100, 4)


def _pen(*renter):
    """Avvis når en gitt rente får mer enn to desimaler i prosent (4.825% ser ikke ut som eksamen)."""
    for x in renter:
        if abs(x * 1e4 - round(x * 1e4)) > 1e-6:
            raise Avvis("rente med for mange desimaler")


def _b(x):
    """Gitt beta med to desimaler (1.40), eller flere når det trengs."""
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


# =====================================================================================
# ov-tvi1 · Prosjekt utenfor kjernevirksomheten
# =====================================================================================
# Firma med kjernevirksomhet og prosjekt med tvilling. Lav risiko i kjernen og høy i prosjektet,
# eller omvendt, så prosjektet er risikablere eller tryggere enn kjernen.
KJERNE_TRYGG = [("Nordlys Nett ASA", "a regional power-grid company"), ("Fjordkost ASA", "a grocery chain"),
                ("Bergen Fjernvarme AS", "a district-heating company"), ("Kystvann AS", "a water utility"),
                ("Vestland Bompenger AS", "a toll-road operator")]
PROSJEKT_RISIKO = [("a game-development studio", "Pixelfjord Games ASA"),
                   ("a chip-design unit", "Halvleder Design ASA"),
                   ("an offshore-drilling service unit", "Kvitebjørn Drilling ASA"),
                   ("a luxury-hotel chain", "Grand Fjordhotell ASA"),
                   ("a fashion web shop", "Moteriket Online ASA")]
KJERNE_RISIKO = [("Arktis Seismikk ASA", "a seismic-survey company"), ("Skybro Airlines ASA", "an airline"),
                 ("Kodekraft ASA", "a software company"), ("Havdrill ASA", "an offshore-drilling company"),
                 ("Lysverk Halvleder ASA", "a semiconductor maker")]
PROSJEKT_TRYGG = [("a chain of parking garages", "Parkhus Norge ASA"),
                  ("a cold-storage warehouse business", "Kjølelager Nord ASA"),
                  ("a toll-road operator with a long concession", "Bompenge Drift ASA"),
                  ("a district-heating network", "Varmenett Øst ASA"),
                  ("a grocery wholesaler", "Dagligvare Engros ASA")]


@oppgave("ov-tvi1", tema="tvilling", tittel="A project outside the core business", antall=12,
         sjanger="tvilling", kilde="Lecture 8 slides 12–15, H2024 E5")
def _(r):
    risikabel = r.random() < 0.5
    if risikabel:
        (fi, kjerne), (prosjekt, tw) = r.choice(KJERNE_TRYGG), r.choice(PROSJEKT_RISIKO)
    else:
        (fi, kjerne), (prosjekt, tw) = r.choice(KJERNE_RISIKO), r.choice(PROSJEKT_TRYGG)
        if kjerne.split()[-1].split("-")[0] in prosjekt:
            raise Avvis("kjerne og prosjekt for like")
    kr = r.choice(["NOK", "NOK", "$"])
    rf = r.choice([0.03, 0.035, 0.04, 0.045])
    mrp = r.choice([0.05, 0.055, 0.06])
    gi_rm = r.random() < 0.5                         # gi E[R_m] i stedet for premien
    tau = r.choice([0.22, 0.25])
    bE_t = r.choice([1.40, 1.50, 1.60, 1.70, 1.80] if risikabel else [0.60, 0.70, 0.75, 0.80, 0.90])
    bD_t = r.choice([0.10, 0.15, 0.20, 0.25])
    rD_t = rf + bD_t * mrp
    form = r.choice(["de", "dv", "mv"])
    if form == "de":
        de_t = r.choice([0.25, 0.50, 1.00])
        wD_t = de_t / (1 + de_t)
        lev = f"a debt-to-equity ratio D/E of {tall(de_t, 2)}"
    elif form == "dv":
        wD_t = r.choice([0.20, 0.25, 0.30, 0.40])
        de_t = wD_t / (1 - wD_t)
        lev = f"a debt-to-value ratio D/V of {tall(wD_t, 2)}"
    else:
        wD_t = r.choice([0.20, 0.25, 0.40])
        E_t = r.choice([600, 900, 1200, 1500, 2400])
        D_t = E_t * wD_t / (1 - wD_t)
        if abs(D_t - round(D_t)) > 1e-9:
            raise Avvis("tvillingens gjeld er ikke et helt tall")
        D_t = round(D_t)
        de_t = D_t / E_t
        lev = f"equity worth {_m(E_t, kr, 0)} and debt worth {_m(D_t, kr, 0)} (market values)"
    w = r.choice([0.20, 0.25, 0.30, 0.40])
    if abs(w - wD_t) < 0.04:
        raise Avvis("egen gearing for lik tvillingens")
    bD = r.choice([0.10, 0.15, 0.20])
    rD = rf + bD * mrp
    if abs(rD - rD_t) < 1e-9:
        raise Avvis("lik gjeldsrente for tvilling og firma")
    _pen(rD_t, rD)

    # (a)
    bU = (1 - wD_t) * bE_t + wD_t * bD_t
    bU4 = rund(bU, 4)
    rU = rf + bU * mrp
    rU4 = rund(rf + bU4 * mrp, 6)
    _sjekk(rU4, rU)
    # (b)
    DE = w / (1 - w)
    rE = rU + DE * (rU - rD)
    rE4 = rund(rU4 + DE * (rU4 - rD), 6)
    wacc = (1 - w) * rE + w * rD * (1 - tau)
    wacc4 = rund((1 - w) * rE4 + w * rD * (1 - tau), 6)
    _sjekk(rE4, rE)
    _sjekk(wacc4, wacc)
    # (c) firmaets egen WACC og kontantstrømmen
    delta = r.choice([0.015, 0.02, 0.025, 0.03])
    fw = rund(wacc + (-delta if risikabel else delta), 3)
    if fw < 0.045:
        raise Avvis("firmaets WACC for lav")
    typ = r.choice(["ann", "perp"])
    if typ == "ann":
        fcf = r.choice([40, 50, 60, 75, 90, 120])
        n = r.choice([8, 10, 12, 15])
        g = 0.0

        def pv(rate):
            return fcf * _ann(rate, n)
    else:
        fcf = r.choice([30, 40, 50, 60, 80])
        g = r.choice([0.01, 0.015, 0.02, 0.025])
        n = None
        if min(wacc, fw) - g < 0.03:
            raise Avvis("for nær vekstraten")

        def pv(rate):
            return fcf / (rate - g)
    pv_c, pv_w = pv(wacc), pv(fw)
    steg = 10 if max(pv_c, pv_w) > 300 else 5
    inv = round((pv_c + pv_w) / 2 / steg) * steg
    npv_c, npv_w = pv_c - inv, pv_w - inv
    if risikabel and not (npv_c < -0.04 * inv and npv_w > 0.04 * inv):
        raise Avvis("fortegnene snur ikke tydelig")
    if not risikabel and not (npv_c > 0.04 * inv and npv_w < -0.04 * inv):
        raise Avvis("fortegnene snur ikke tydelig")
    pv_c4 = pv(wacc4)
    npv_c4 = pv_c4 - inv
    fac4 = rund(_ann(wacc4, n), 4) if typ == "ann" else None
    fac_w4 = rund(_ann(fw, n), 4) if typ == "ann" else None
    pv_w4 = fcf * fac_w4 if typ == "ann" else pv_w
    dpv = abs(pv(wacc + 1e-6) - pv(wacc - 1e-6)) / 2e-6
    tol_c = max(0.05, dpv * 0.00003)
    if abs(npv_c4 - npv_c) > tol_c * 0.8:
        raise Avvis("avrundingen flytter NPV for mye")

    # ---------------- feller
    # (a)
    f_bd0 = (1 - wD_t) * bE_t
    f_de = ((1 - de_t) * bE_t + de_t * bD_t) if form == "de" and de_t < 1 else None
    Ds = wD_t * (1 - tau)
    f_skatt = (1 - wD_t) / (1 - wD_t + Ds) * bE_t + Ds / (1 - wD_t + Ds) * bD_t
    f_rUe = rf + bE_t * mrp
    rm = rf + mrp
    f_rUm = rf + bU4 * rm
    # (b)
    f_tw = rU4 + de_t * (rU4 - rD)
    f_dv = rU4 + w * (rU4 - rD)
    f_rdt = rU4 + DE * (rU4 - rD_t)
    f_ingen = (1 - w) * rE4 + w * rD
    f_dvw = (1 - w) * f_dv + w * rD * (1 - tau)
    # (c)
    if typ == "ann":
        f_perp_c = fcf / wacc4 - inv
        f_perp_w = fcf / fw - inv
        f_vekst_c = None
    else:
        f_perp_c = fcf / wacc4 - inv          # glemt veksten
        f_perp_w = fcf / fw - inv
        f_vekst_c = fcf * (1 + g) / (wacc4 - g) - inv
    f_rU_c = pv(rU4) - inv

    # ---------------- tekster
    if gi_rm:
        mtekst = f"the expected return on the market portfolio is {_pr(rm)}"
        mrp_steg = (f"The market risk premium is {_pr(rm)} − {_pr(rf)} = {_pr(mrp)}. ")
    else:
        mtekst = f"the market risk premium is {_pr(mrp)}"
        mrp_steg = ""
    if typ == "ann":
        kstr = f"a free cash flow of {_m(fcf, kr, 0)} a year at the end of each of the next {n} years"
    else:
        kstr = (f"a free cash flow of {_m(fcf, kr, 0)} next year, growing at {_pr(g)} a year forever")
    case = (f"<p>{fi} is {kjerne}. It is considering {prosjekt}, a business outside its core. The project costs "
            f"{_m(inv, kr, 0)} today and is expected to generate {kstr}. {tw} is a listed pure play in the "
            f"project's business. Market data for {tw}: equity beta {_b(bE_t)}; {lev}. Its debt has an "
            f"expected return of {_pr(rD_t)}.</p>"
            f"<p>{fi} will finance the project at its target debt-to-value ratio D/V of {tall(w, 2)}, borrowing at "
            f"an expected return of {_pr(rD)}. {gen(fi)} own after-tax WACC, computed for its existing business "
            f"with the same D/V and cost of debt, is {_pr(fw)}. The risk-free rate is {_pr(rf)}, {mtekst} and the "
            f"corporate tax rate is {_pr(tau)}.</p>"
            f"<p>Use market values and unlever without taxes, since leverage is kept constant. Give betas with four "
            f"decimals, rates in percent with four decimals (as in 9.1234%) and amounts in {kr} million with two "
            f"decimals.</p>")

    # (a)
    if form == "de":
        vekt = (f"D/E = {tall(de_t, 2)} gives D/V = {tall(de_t, 2)}/{tall(1 + de_t, 2)} = {tall(wD_t, 4)} and "
                f"E/V = {tall(1 - wD_t, 4)}.")
    elif form == "dv":
        vekt = f"D/V = {tall(wD_t, 2)} is given, so E/V = {tall(1 - wD_t, 2)}."
    else:
        vekt = (f"V = {tall(E_t, 0)} + {tall(D_t, 0)} = {tall(E_t + D_t, 0)}, so E/V = {tall(1 - wD_t, 4)} and "
                f"D/V = {tall(wD_t, 4)}.")
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>Find the unlevered beta β<sub>U</sub> of the project's business from {tw} and the project's "
           f"unlevered cost of capital r<sub>U</sub>.</p>"),
        svar=[T("β<sub>U</sub>", bU), T("r<sub>U</sub>", rU * 100, "%")],
        kort=(f"<p><b>β<sub>U</sub> = {tall(bU4, 4)}, r<sub>U</sub> = {pst(rU4, 4)}.</b> β<sub>D</sub> = "
              f"({_pr(rD_t)} − {_pr(rf)})/{_pr(mrp)} = {tall(bD_t, 2)}; β<sub>U</sub> = {tall(1 - wD_t, 4)} × "
              f"{_b(bE_t)} + {tall(wD_t, 4)} × {tall(bD_t, 2)}.</p>"),
        losning=(f"<p>The project is not {gen(fi)} usual business, so its risk must come from a firm that does only "
                 f"this: the pure play {tw}. Its equity beta mixes business risk with its own leverage, so you "
                 f"unlever it first.</p>"
                 f"<p><b>Step 1: weights.</b> {vekt}</p>"
                 f"<p><b>Step 2: the twin's debt beta.</b> {mrp_steg}The CAPM backwards on the expected return of "
                 f"the debt: β<sub>D</sub> = ({_pr(rD_t)} − {_pr(rf)})/{_pr(mrp)} = {tall(bD_t, 2)}.</p>"
                 f"<p><b>Step 3: unlever.</b> β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = "
                 f"{tall(1 - wD_t, 4)} × {_b(bE_t)} + {tall(wD_t, 4)} × {tall(bD_t, 2)} = <b>{tall(bU4, 4)}</b>.</p>"
                 f"<p><b>Step 4: CAPM.</b> r<sub>U</sub> = {_pr(rf)} + {tall(bU4, 4)} × {_pr(mrp)} = "
                 f"<b>{pst(rU4, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The twin's pre-tax WACC must give the same rate. Its r<sub>E</sub> is "
                 f"{_pr(rf)} + {_b(bE_t)} × {_pr(mrp)} = {pst(rf + bE_t * mrp, 4)}, so {tall(1 - wD_t, 4)} × "
                 f"{pst(rf + bE_t * mrp, 4)} + {tall(wD_t, 4)} × {_pr(rD_t)} = "
                 f"{pst((1 - wD_t) * (rf + bE_t * mrp) + wD_t * rD_t, 4)}. It matches up to rounding. Both routes share the weights, "
                 f"so the check catches a wrong debt beta and arithmetic slips, not misread weights.</p>"
                 f"<p><b>Remember:</b> the project's risk comes from the pure play, unlevered with its own weights "
                 f"and without taxes.</p>"),
        feller=_filtrer([
            Felle(f_bd0, f"You set the twin's debt beta to zero. Its debt earns {_pr(rD_t)}, above r<sub>f</sub>, "
                         f"so it carries part of the asset risk."),
            Felle(f_de, f"You used D/E = {tall(de_t, 2)} as the debt weight. The weights are D/V and E/V.") if f_de else None,
            Felle(f_skatt, "You used after-tax weights D(1 − τ<sub>c</sub>). With constant leverage the course "
                           "unlevers without taxes."),
            Felle(f_rUe * 100, "This is the twin's cost of equity: you put its equity beta into the CAPM, not "
                               "β<sub>U</sub>.", i=1),
            Felle(f_rUm * 100, f"You multiplied β<sub>U</sub> by the market return {_pr(rm)}. The CAPM uses the "
                               f"premium over r<sub>f</sub>.", i=1) if gi_rm else None,
        ], [bU, rU * 100]),
    )

    # (b)
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Find the project's cost of equity r<sub>E</sub> and its after-tax WACC r<sub>wacc</sub> when it "
           f"is financed at {gen(fi)} target D/V.</p>"),
        gitt=f"<p>From (a): β<sub>U</sub> = {tall(bU4, 4)} and r<sub>U</sub> = {pst(rU4, 4)}.</p>",
        svar=[T("r<sub>E</sub>", rE * 100, "%"), T("r<sub>wacc</sub>", wacc * 100, "%")],
        kort=(f"<p><b>r<sub>E</sub> = {pst(rE4, 4)}, r<sub>wacc</sub> = {pst(wacc4, 4)}.</b> D/E = "
              f"{tall(DE, 4)}: r<sub>E</sub> = {pst(rU4, 4)} + {tall(DE, 4)} × ({pst(rU4, 4)} − {_pr(rD)}); "
              f"r<sub>wacc</sub> = {tall(1 - w, 2)} × {pst(rE4, 4)} + {tall(w, 2)} × {_pr(rD)} × {tall(1 - tau, 2)}.</p>"),
        losning=(f"<p>The business risk is the twin's, the financing is {gen(fi)}. Relever with {gen(fi)} own D/E "
                 f"and own cost of debt, then build the after-tax WACC.</p>"
                 f"<p><b>Step 1: D/E.</b> D/V = {tall(w, 2)} gives D/E = {tall(w, 2)}/{tall(1 - w, 2)} = "
                 f"{tall(DE, 4)}.</p>"
                 f"<p><b>Step 2: MM II.</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = "
                 f"{pst(rU4, 4)} + {tall(DE, 4)} × ({pst(rU4, 4)} − {_pr(rD)}) = <b>{pst(rE4, 4)}</b>.</p>"
                 f"<p><b>Step 3: WACC.</b> r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = "
                 f"{tall(1 - w, 2)} × {pst(rE4, 4)} + {tall(w, 2)} × {_pr(rD)} × {tall(1 - tau, 2)} = "
                 f"<b>{pst(wacc4, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = "
                 f"{pst(rU4, 4)} − {tall(w, 2)} × {tall(tau, 2)} × {_pr(rD)} = {pst(rU4 - w * tau * rD, 4)}, the WACC above up to rounding. "
                 f"This is an identity once r<sub>E</sub> came from MM II, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> MM II multiplies by D/E. The WACC uses your own weights and your own "
                 f"r<sub>D</sub>.</p>"),
        feller=_filtrer([
            Felle(f_tw * 100, f"You relevered with the twin's D/E ({tall(de_t, 4)}). The project carries "
                              f"{gen(fi)} financing.", i=0),
            Felle(f_dv * 100, "You used D/V instead of D/E in MM II.", i=0),
            Felle(f_rdt * 100, f"You used the twin's cost of debt ({_pr(rD_t)}). {fi} borrows at {_pr(rD)}.", i=0),
            Felle(f_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax WACC.", i=1),
            Felle(f_dvw * 100, "This WACC is built on an r<sub>E</sub> relevered with D/V instead of D/E.", i=1),
        ], [rE * 100, wacc * 100]),
    )

    # (c)
    if typ == "ann":
        metode = (f"The cash flow is a {n}-year annuity, so PV = FCF × A(n; r) with the annuity factor "
                  f"A(n; r) = [1 − (1 + r)<sup>−n</sup>]/r.")
        pv_cv, pv_wv = rund(fcf * fac4, 2), rund(pv_w4, 2)
        steg1 = (f"A({n}; {pst(wacc4, 4)}) = {tall(fac4, 4)}, so PV = {tall(fcf, 0)} × {tall(fac4, 4)} = "
                 f"{tall(pv_cv, 2)}")
        steg2 = (f"A({n}; {_pr(fw)}) = {tall(fac_w4, 4)}, so PV = {tall(fcf, 0)} × {tall(fac_w4, 4)} = "
                 f"{tall(pv_wv, 2)}")
        kort_pv = f"{tall(fcf, 0)} × A({n}; r)"
        npv_c_vist = pv_cv - inv
        npv_w_vist = pv_wv - inv
    else:
        metode = "The cash flow is a growing perpetuity from next year: PV = FCF<sub>1</sub>/(r − g)."
        pv_cv, pv_wv = rund(pv_c4, 2), rund(pv_w, 2)
        steg1 = (f"PV = {tall(fcf, 0)}/({pst(wacc4, 4)} − {_pr(g)}) = {tall(pv_cv, 2)}")
        steg2 = (f"PV = {tall(fcf, 0)}/({_pr(fw)} − {_pr(g)}) = {tall(pv_w, 2)}")
        kort_pv = f"{tall(fcf, 0)}/(r − {_pr(g)})"
        npv_c_vist = pv_cv - inv
        npv_w_vist = pv_wv - inv
    c = tall_del(
        "c", poeng=5,
        q=(f"<p>Find the project's NPV today. The CFO proposes to discount the project's cash flows at "
           f"{gen(fi)} own WACC of {_pr(fw)} instead. What NPV does that give?</p>"),
        gitt=f"<p>From (b): r<sub>wacc</sub> = {pst(wacc4, 4)}.</p>",
        svar=[T("NPV at the project's WACC", npv_c, kr + " million", rel=STD_REL, abs=tol_c),
              T("NPV at the firm's WACC", npv_w, kr + " million", rel=STD_REL, abs=0.05)],
        kort=(f"<p><b>NPV = {_m(npv_c_vist, kr)} at {pst(wacc4, 4)}; {_m(npv_w_vist, kr)} at {_pr(fw)}.</b> "
              f"NPV = {kort_pv} − {tall(inv, 0)}, with r = {pst(wacc4, 4)} and r = {_pr(fw)}.</p>"),
        losning=(f"<p>The WACC method discounts the project's free cash flow at a rate that matches the project's "
                 f"risk. {metode}</p>"
                 f"<p><b>Step 1: at the project's own WACC.</b> {steg1}. NPV = {tall(npv_c_vist + inv, 2)} − "
                 f"{tall(inv, 0)} = <b>{_m(npv_c_vist, kr)}</b>.</p>"
                 f"<p><b>Step 2: at {gen(fi)} WACC.</b> {steg2}. NPV = {tall(npv_w_vist + inv, 2)} − "
                 f"{tall(inv, 0)} = <b>{_m(npv_w_vist, kr)}</b>.</p>"
                 f"<p><b>First check.</b> The two rates differ by {tall(abs(wacc4 - fw) * 100, 2)} percentage points "
                 f"and the sign of the NPV flips. A {'lower' if risikabel else 'higher'} rate must give a "
                 f"{'higher' if risikabel else 'lower'} value. It does.</p>"
                 f"<p><b>Remember:</b> NPV subtracts the investment. The discount rate belongs to the project, not "
                 f"to the firm that owns it.</p>"),
        feller=_filtrer([
            Felle(npv_c_vist + inv, "This is the present value of the cash flows. The NPV subtracts the "
                                    f"investment of {tall(inv, 0)}.", i=0),
            Felle(f_rU_c, "You discounted at r<sub>U</sub>. That leaves out the tax shield of the project's debt.", i=0),
            Felle(f_perp_c, ("You valued the cash flow as a perpetuity. It lasts "
                             f"{n} years." if typ == "ann" else "You left out the growth: divide by r − g."), i=0),
            Felle(f_vekst_c, "You grew the cash flow one year too many. It is already next year's cash flow.", i=0)
            if f_vekst_c is not None else None,
            Felle(pv_w, "This is the present value at the CFO's rate. The NPV subtracts the investment.", i=1),
            Felle(f_perp_w, ("You valued the cash flow as a perpetuity. It lasts "
                             f"{n} years." if typ == "ann" else "You left out the growth: divide by r − g."), i=1),
        ], [npv_c, npv_w], abs_=[tol_c, 0.05]),
    )

    # (d)
    if risikabel:
        beslutning = f"{fi} should not invest"
        kort_d = (f"<p>{fi} should not invest: at the project's own cost of capital ({pst(wacc4, 4)}) the NPV is "
                  f"{_m(npv_c_vist, kr)}. The discount rate must reflect the risk of the project's cash flows, "
                  f"which the pure play measures, not the risk of {kjerne}. The project is riskier than the core "
                  f"business, so the company-wide WACC of {_pr(fw)} is too low and makes a value-destroying project "
                  f"look profitable. A firm that uses one WACC for everything over-invests in risky projects and "
                  f"under-invests in safe ones.</p>")
        kriterier = [
            f"Says {fi} should not invest: at the project's own WACC the NPV is negative ({_m(npv_c_vist, kr)}) (1 p)",
            "Explains that the discount rate must match the risk of the project's cash flows, measured by the pure "
            f"play, not the risk of {gen(fi)} existing business (1 p)",
            f"Notes that the project is riskier than the core business, so {_pr(fw)} is too low and overvalues it: "
            "the CFO would accept a negative-NPV project (1 p)",
            "Concludes that one company-wide WACC makes a firm over-invest in risky projects and under-invest in "
            "safe ones (1 p)",
        ]
    else:
        beslutning = f"{fi} should invest"
        kort_d = (f"<p>{fi} should invest: at the project's own cost of capital ({pst(wacc4, 4)}) the NPV is "
                  f"{_m(npv_c_vist, kr)}. The discount rate must reflect the risk of the project's cash flows, "
                  f"which the pure play measures, not the risk of {kjerne}. The project is safer than the core "
                  f"business, so the company-wide WACC of {_pr(fw)} is too high and makes a value-creating project "
                  f"look unprofitable. A firm that uses one WACC for everything under-invests in safe projects and "
                  f"over-invests in risky ones.</p>")
        kriterier = [
            f"Says {fi} should invest: at the project's own WACC the NPV is positive ({_m(npv_c_vist, kr)}) (1 p)",
            "Explains that the discount rate must match the risk of the project's cash flows, measured by the pure "
            f"play, not the risk of {gen(fi)} existing business (1 p)",
            f"Notes that the project is safer than the core business, so {_pr(fw)} is too high and undervalues it: "
            "the CFO would reject a positive-NPV project (1 p)",
            "Concludes that one company-wide WACC makes a firm under-invest in safe projects and over-invest in "
            "risky ones (1 p)",
        ]
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Should {fi} invest in the project? Explain why the CFO's rate gives the wrong answer here and what "
           f"a firm that uses one company-wide WACC for every project ends up doing.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) and (c): the project's WACC is {pst(wacc4, 4)} and its NPV is {_m(npv_c_vist, kr)}. "
              f"At {gen(fi)} WACC of {_pr(fw)} the NPV is {_m(npv_w_vist, kr)}.</p>"),
        kort=kort_d,
        losning=(f"<p>The cost of capital is a property of the cash flows, not of the owner. Investors could buy the "
                 f"same risk by holding {tw}, so they require the return that {tw} offers for that risk, whoever runs "
                 f"the project. {gen(fi)} WACC prices {kjerne}, a {'safer' if risikabel else 'riskier'} business, so "
                 f"it is the wrong yardstick here.</p>"
                 f"<p>That is why the decision is: {beslutning}. The two rates differ by "
                 f"{tall(abs(wacc4 - fw) * 100, 2)} percentage points, enough to flip the sign of the NPV.</p>"
                 f"<p>Across many projects the error is systematic. A single hurdle rate is too low for risky projects "
                 f"and too high for safe ones, so the firm accepts too many risky projects and too few safe ones. "
                 f"Over time it drifts into riskier businesses and destroys value.</p>"
                 f"<p><b>Typical mistakes:</b> saying the firm's WACC is right because the firm pays for the project "
                 f"or finances it. Another is forgetting that the financing (D/V and r<sub>D</sub>) is the same in both "
                 f"rates, so only business risk separates them.</p>"
                 f"<p><b>Remember:</b> each project is discounted at the rate of its own risk.</p>"),
        kriterier=kriterier,
    )
    return ovelse(case, [a, b, c, d])


# =====================================================================================
# ov-tvi2 · To tvillinger og snittet av r_U
# =====================================================================================
FIRMA2 = ["Solvang Bakeri AS", "Hamarøy Laks AS", "Fjellvind Energi AS", "Bryggen Logistikk AS",
          "Tindefjell Maskin AS", "Sjøbris Ferjer AS", "Nordkapp Turisme AS", "Grenland Plast AS"]
TVILLINGPAR = [("Brødhuset ASA", "Kornmo ASA"), ("Laksefjord ASA", "Havsalt Seafood ASA"),
               ("Vindkraft Vest ASA", "Kraftfjell ASA"), ("Havnelogistikk ASA", "Fraktruta ASA"),
               ("Verkstedgruppen ASA", "Stålkam Industri ASA"), ("Fjordferjer ASA", "Kystrute ASA"),
               ("Reiseliv Nord ASA", "Polarferie ASA"), ("Plastindustri ASA", "Polymer Norge ASA")]


@oppgave("ov-tvi2", tema="tvilling", tittel="Two twins: average, relever and value a share", antall=12,
         sjanger="tvilling", kilde="Lecture 8 slide 12, PS2 E7")
def _(r):
    i = r.randrange(len(FIRMA2))
    fi = FIRMA2[i]
    A, B = TVILLINGPAR[i] if r.random() < 0.5 else TVILLINGPAR[i][::-1]
    kr = r.choice(["NOK", "NOK", "$"])
    tau = r.choice([0.22, 0.25])
    # tvilling A: renter og gjeldsgrad
    rEA = r.choice([0.10, 0.105, 0.11, 0.115, 0.12, 0.125, 0.13, 0.135, 0.14])
    rDA = r.choice([0.045, 0.05, 0.055, 0.06])
    formA = r.choice(["de", "dv"])
    if formA == "de":
        deA = r.choice([0.25, 0.50, 1.00])
        wA = deA / (1 + deA)
        levA = f"a debt-to-equity ratio D/E of {tall(deA, 2)}"
    else:
        wA = r.choice([0.20, 0.25, 0.40, 0.50])
        deA = wA / (1 - wA)
        levA = f"a debt-to-value ratio D/V of {tall(wA, 2)}"
    # tvilling B: markedsverdier med overskuddskasse, gearing klart ulik As
    wB = r.choice([x for x in (0.20, 0.25, 0.40, 0.50) if abs(x - wA) >= 0.15])
    deB = wB / (1 - wB)
    EB = r.choice([600, 900, 1200, 1500, 1800])
    DnB = round(EB * wB / (1 - wB))
    CB = r.choice([50, 100, 150])
    DgB = DnB + CB
    rDB = r.choice([0.045, 0.05, 0.055, 0.06])
    rUA = (1 - wA) * rEA + wA * rDA
    mål = rUA + r.choice([-1, 1]) * r.choice([0.001, 0.002, 0.003, 0.004, 0.005, 0.006])
    rEB = rund(mål + deB * (mål - rDB), 4)
    if abs(rEB * 2000 - round(rEB * 2000)) > 1e-9:
        rEB = round(rEB * 2000) / 2000
    rUB = (1 - wB) * rEB + wB * rDB
    if not 0.001 <= abs(rUA - rUB) <= 0.010:
        raise Avvis("tvillingene ligger for tett eller for langt fra hverandre")
    if abs(rEA - rEB) < abs(rUA - rUB) + 0.005:
        raise Avvis("egenkapitalkostnadene skiller seg ikke nok")
    if not 0.08 <= rEB <= 0.20:
        raise Avvis("urimelig egenkapitalkostnad")
    # eget firma
    d = r.choice([0.25, 0.30, 0.40, 0.50])
    rD = r.choice([0.045, 0.05, 0.055, 0.06])
    fcf = r.choice([40, 60, 75, 80, 100, 120])
    g = r.choice([0.01, 0.015, 0.02, 0.025, 0.03])
    n = r.choice([10, 20, 25, 40, 50])

    # eksakt
    rU = (rUA + rUB) / 2
    DE = d / (1 - d)
    rE = rU + DE * (rU - rD)
    wacc = (1 - d) * rE + d * rD * (1 - tau)
    if wacc - g < 0.035:
        raise Avvis("WACC for nær vekstraten")
    V = fcf / (wacc - g)
    E = (1 - d) * V
    P = E / n
    # vist (fire desimaler i prosent)
    rUA6, rUB6 = rund(rUA, 6), rund(rUB, 6)
    rU6 = rund((rUA6 + rUB6) / 2, 6)
    rE6 = rund(rU6 + DE * (rU6 - rD), 6)
    wacc6 = rund((1 - d) * rE6 + d * rD * (1 - tau), 6)
    V2 = rund(fcf / (wacc6 - g), 2)
    D2 = rund(d * V2, 2)
    E2 = rund(V2 - D2, 2)
    P2 = E2 / n
    for vist, eks in ((rU6, rU), (rE6, rE), (wacc6, wacc), (V2, V), (P2, P)):
        _sjekk(vist, eks, 0.001)

    # feller
    f_A_de = ((1 - deA) * rEA + deA * rDA) if formA == "de" and deA < 1 else None
    f_A_skatt = (1 - wA) * rEA + wA * rDA * (1 - tau)
    wBg = DgB / (EB + DgB)
    f_B_brutto = (1 - wBg) * rEB + wBg * rDB
    f_B_skatt = (1 - wB) * rEB + wB * rDB * (1 - tau)
    f_snittE = (rEA + rEB) / 2
    f_dv = rU6 + d * (rU6 - rD)
    f_ingen = (1 - d) * rE6 + d * rD
    f_VU = fcf / (rU6 - g)
    f_ingenvekst = fcf / wacc6
    f_vekst = fcf * (1 + g) / (wacc6 - g)
    f_P_V = V2 / n
    f_P_de = (V2 - DE * V2) / n

    case = (f"<p>{fi} is unlisted. Its owners want to know what a share is worth before a listing. Two listed "
            f"firms have the same business risk as {fi}:</p>"
            f"<ul><li>{A}: cost of equity {_pr(rEA)}, expected return on its debt {_pr(rDA)} and {levA}.</li>"
            f"<li>{B}: equity worth {_m(EB, kr, 0)}, debt worth {_m(DgB, kr, 0)} and excess cash of "
            f"{_m(CB, kr, 0)} (market values), cost of equity {_pr(rEB)} and expected return on its debt "
            f"{_pr(rDB)}.</li></ul>"
            f"<p>{fi} keeps a constant debt-to-value ratio D/V of {tall(d, 2)} and borrows at an expected return of "
            f"{_pr(rD)}. It expects a free cash flow of {_m(fcf, kr, 0)} next year, growing at {_pr(g)} a year "
            f"forever. It has {tall(n, 0)} million shares. The corporate tax rate is {_pr(tau)}.</p>"
            f"<p>Use market values and net debt, give the two twins equal weight and unlever without taxes, since "
            f"leverage is constant. Give rates in percent with four decimals and amounts with two decimals.</p>")

    if formA == "de":
        vA = (f"D/E = {tall(deA, 2)} gives D/V = {tall(deA, 2)}/{tall(1 + deA, 2)} = {tall(wA, 4)} and E/V = "
              f"{tall(1 - wA, 4)}.")
    else:
        vA = f"D/V = {tall(wA, 2)}, so E/V = {tall(1 - wA, 2)}."
    a = tall_del(
        "a", poeng=4,
        q=f"<p>Find the unlevered cost of capital r<sub>U</sub> of each twin.</p>",
        svar=[T(f"r<sub>U</sub> of {A}", rUA * 100, "%"), T(f"r<sub>U</sub> of {B}", rUB * 100, "%")],
        kort=(f"<p><b>{A}: {pst(rUA6, 4)}. {B}: {pst(rUB6, 4)}.</b> Pre-tax WACC of each, with {B} weighted on net "
              f"debt {tall(DgB, 0)} − {tall(CB, 0)} = {tall(DnB, 0)}.</p>"),
        losning=(f"<p>r<sub>U</sub> is the return on the assets alone: the pre-tax WACC, the value-weighted average of "
                 f"what the shareholders and the lenders expect. No tax term enters, because r<sub>U</sub> describes "
                 f"the business, not its financing.</p>"
                 f"<p><b>Step 1: {A}.</b> {vA} r<sub>U</sub> = {tall(1 - wA, 4)} × {_pr(rEA)} + {tall(wA, 4)} × "
                 f"{_pr(rDA)} = <b>{pst(rUA6, 4)}</b>.</p>"
                 f"<p><b>Step 2: {gen(B)} net debt.</b> Excess cash is a safe asset that offsets debt: D = "
                 f"{tall(DgB, 0)} − {tall(CB, 0)} = {tall(DnB, 0)}, so V = {tall(EB, 0)} + {tall(DnB, 0)} = "
                 f"{tall(EB + DnB, 0)}, E/V = {tall(1 - wB, 4)} and D/V = {tall(wB, 4)}.</p>"
                 f"<p><b>Step 3: {B}.</b> r<sub>U</sub> = {tall(1 - wB, 4)} × {_pr(rEB)} + {tall(wB, 4)} × "
                 f"{_pr(rDB)} = <b>{pst(rUB6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> Each r<sub>U</sub> must lie between that twin's r<sub>D</sub> and its "
                 f"r<sub>E</sub>, since it is a weighted average of the two. Both do. The check catches a weight "
                 f"above 1 or a tax term, not a misread weight.</p>"
                 f"<p><b>Remember:</b> pre-tax weights, market values and net debt.</p>"),
        feller=_filtrer([
            Felle(f_A_de * 100 if f_A_de else None, f"You used D/E = {tall(deA, 2)} as the debt weight for {A}. "
                                                    f"Convert to D/V first.", i=0) if f_A_de else None,
            Felle(f_A_skatt * 100, f"You took {gen(A)} debt after tax. That is an after-tax WACC, not "
                                   f"r<sub>U</sub>.", i=0),
            Felle(f_B_brutto * 100, f"You used {gen(B)} gross debt ({tall(DgB, 0)}). Excess cash offsets debt, so "
                                    f"use net debt.", i=1),
            Felle(f_B_skatt * 100, f"You took {gen(B)} debt after tax. That is an after-tax WACC, not "
                                   f"r<sub>U</sub>.", i=1),
        ], [rUA * 100, rUB * 100]),
    )

    b = tall_del(
        "b", poeng=5,
        q=(f"<p>Find {gen(fi)} unlevered cost of capital as the simple average of the two twins, its cost of equity "
           f"r<sub>E</sub> and its after-tax WACC r<sub>wacc</sub>.</p>"),
        gitt=f"<p>From (a): r<sub>U</sub> is {pst(rUA6, 4)} for {A} and {pst(rUB6, 4)} for {B}.</p>",
        svar=[T("r<sub>U</sub>", rU * 100, "%"), T("r<sub>E</sub>", rE * 100, "%"),
              T("r<sub>wacc</sub>", wacc * 100, "%")],
        kort=(f"<p><b>r<sub>U</sub> = {pst(rU6, 4)}, r<sub>E</sub> = {pst(rE6, 4)}, r<sub>wacc</sub> = "
              f"{pst(wacc6, 4)}.</b> D/E = {tall(DE, 4)}; r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − "
              f"{_pr(rD)}).</p>"),
        losning=(f"<p>Both twins estimate the same business risk, so their average is a less noisy estimate of "
                 f"{gen(fi)} r<sub>U</sub>. Then {gen(fi)} own leverage goes back in.</p>"
                 f"<p><b>Step 1: average.</b> r<sub>U</sub> = ({pst(rUA6, 4)} + {pst(rUB6, 4)})/2 = "
                 f"<b>{pst(rU6, 4)}</b>.</p>"
                 f"<p><b>Step 2: MM II.</b> D/V = {tall(d, 2)} gives D/E = {tall(d, 2)}/{tall(1 - d, 2)} = "
                 f"{tall(DE, 4)}. r<sub>E</sub> = {pst(rU6, 4)} + {tall(DE, 4)} × ({pst(rU6, 4)} − {_pr(rD)}) = "
                 f"<b>{pst(rE6, 4)}</b>.</p>"
                 f"<p><b>Step 3: WACC.</b> r<sub>wacc</sub> = {tall(1 - d, 2)} × {pst(rE6, 4)} + {tall(d, 2)} × "
                 f"{_pr(rD)} × {tall(1 - tau, 2)} = <b>{pst(wacc6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {pst(rU6, 4)} − "
                 f"{tall(d, 2)} × {tall(tau, 2)} × {_pr(rD)} = {pst(rU6 - d * tau * rD, 4)}, the WACC above up to rounding. This is an identity once "
                 f"r<sub>E</sub> came from MM II, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> average the unlevered rates, then relever with your own D/E.</p>"),
        feller=_filtrer([
            Felle(f_snittE * 100, "You averaged the twins' costs of equity. Each carries its own twin's leverage.", i=0),
            Felle(f_dv * 100, "You used D/V instead of D/E in MM II.", i=1),
            Felle(f_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax WACC.", i=2),
        ], [rU * 100, rE * 100, wacc * 100]),
    )

    c = tall_del(
        "c", poeng=4,
        q=f"<p>Find {gen(fi)} value V<sup>L</sup> by the WACC method and the value of one share.</p>",
        gitt=f"<p>From (b): r<sub>wacc</sub> = {pst(wacc6, 4)}.</p>",
        svar=[T("V<sup>L</sup>", V, kr + " million"), T("value per share", P, kr + " per share")],
        kort=(f"<p><b>V<sup>L</sup> = {_m(V2, kr)}, {penger(P2, 2, kr)} per share.</b> V<sup>L</sup> = "
              f"{tall(fcf, 0)}/({pst(wacc6, 4)} − {_pr(g)}); E = {tall(1 - d, 2)} × V<sup>L</sup>.</p>"),
        losning=(f"<p>The WACC already contains the tax benefit of the debt, so discounting the free cash flow at it "
                 f"gives the value of the whole firm. The shareholders own what is left after the lenders.</p>"
                 f"<p><b>Step 1: value.</b> A growing perpetuity from next year: V<sup>L</sup> = FCF<sub>1</sub>/"
                 f"(r<sub>wacc</sub> − g) = {tall(fcf, 0)}/({pst(wacc6, 4)} − {_pr(g)}) = <b>{_m(V2, kr)}</b>.</p>"
                 f"<p><b>Step 2: equity.</b> With D/V = {tall(d, 2)} the debt is {tall(d, 2)} × {tall(V2, 2)} = "
                 f"{tall(D2, 2)}, so E = {tall(V2, 2)} − {tall(D2, 2)} = {tall(E2, 2)}.</p>"
                 f"<p><b>Step 3: per share.</b> {tall(E2, 2)}/{tall(n, 0)} = <b>{penger(P2, 2, kr)}</b>.</p>"
                 f"<p><b>First check.</b> E/V = {tall(E2, 2)}/{tall(V2, 2)} = {tall(E2 / V2, 4)}, which is 1 − D/V. "
                 f"An identity, so it only confirms the split.</p>"
                 f"<p><b>Remember:</b> V<sup>L</sup> is the firm. Subtract the debt before you divide by the "
                 f"shares.</p>"),
        feller=_filtrer([
            Felle(f_VU, "You discounted at r<sub>U</sub>. That is the unlevered value, without the tax shield.", i=0),
            Felle(f_ingenvekst, "You left out the growth: a growing perpetuity divides by r<sub>wacc</sub> − g.", i=0),
            Felle(f_vekst, "You grew the cash flow one year too many. It is already next year's cash flow.", i=0),
            Felle(f_P_V, "You divided the value of the whole firm by the shares. The lenders own part of it.", i=1),
            Felle(f_P_de, f"You took the debt as D/E × V<sup>L</sup>. The debt is D/V × V<sup>L</sup> = "
                          f"{tall(d, 2)} × V<sup>L</sup>.", i=1) if d != 0.5 else None,
        ], [V, P]),
    )

    sp = abs(rEA - rEB)
    d_ = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why you average the twins' unlevered costs of capital rather than their costs of equity. "
           f"Why are the two r<sub>U</sub> so close when the twins' costs of equity differ by "
           f"{tall(sp * 100, 2)} percentage points?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a): r<sub>U</sub> is {pst(rUA6, 4)} for {A} and {pst(rUB6, 4)} for {B}.</p>"),
        kort=(f"<p>Each twin's r<sub>E</sub> contains its own financial risk, so averaging r<sub>E</sub> mixes two "
              f"capital structures that have nothing to do with {fi}. Unlevering removes the leverage and leaves the "
              f"business risk, which the twins share with {fi}, so you average r<sub>U</sub> and then relever with "
              f"{gen(fi)} own D/E. The costs of equity differ mainly because the twins' leverage differs "
              f"(MM II); once unlevered, the gap shrinks to {tall(abs(rUA6 - rUB6) * 100, 2)} percentage points of "
              f"estimation noise, which averaging two twins reduces.</p>"),
        losning=(f"<p>MM II says r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>): the same "
                 f"assets give a higher r<sub>E</sub> the more debt sits in front of the equity. {A} has D/V = "
                 f"{tall(wA, 2)} and {B} has D/V = {tall(wB, 2)} on net debt, so their costs of equity differ even if "
                 f"their businesses are identical.</p>"
                 f"<p>Unlevering undoes that. What is left, r<sub>U</sub>, is the required return on the assets, "
                 f"which is what {fi} shares with the twins. Averaging r<sub>U</sub> (or β<sub>U</sub>) and relevering "
                 f"with {gen(fi)} own D/E gives {fi} its own financial risk on top of the shared business risk.</p>"
                 f"<p>The remaining gap between the two r<sub>U</sub> is estimation noise: betas and expected returns "
                 f"are measured with error. Averaging two twins reduces it. Kurbatov: with two comparable firms "
                 f"there should be no issues: you should almost do it in your head. A large gap would be a "
                 f"warning that one firm is not a real twin.</p>"
                 f"<p><b>Typical mistakes:</b> averaging r<sub>E</sub> or β<sub>E</sub>. Another is weighting each twin by "
                 f"its size. Equal weights are the course default unless the question says otherwise.</p>"
                 f"<p><b>Remember:</b> unlever each twin, average, then relever.</p>"),
        kriterier=[
            "States that each twin's r<sub>E</sub> carries its own leverage, so averaging costs of equity mixes "
            f"capital structures unrelated to {fi} (1 p)",
            "Explains that r<sub>U</sub> measures business risk only, which the twins share with the firm, so you "
            "average r<sub>U</sub> and then relever with the firm's own D/E (1 p)",
            "Explains that the costs of equity differ mainly because the twins' leverage differs (MM II), so the gap "
            "shrinks once leverage is removed (1 p)",
            "Notes that averaging two twins reduces estimation noise in r<sub>U</sub>; a large remaining gap "
            "would question whether a firm is a good twin (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d_])


# =====================================================================================
# ov-tvi3 · Egen gearing endres: lovet rente mot forventet avkastning
# =====================================================================================
FIRMA3 = ["Torvik Treforedling ASA", "Helgeland Mekaniske ASA", "Sognekraft Holding ASA", "Lofotmat ASA",
          "Vestby Emballasje ASA", "Jærbuen Landbruk ASA", "Ofoten Gruve ASA", "Romsdal Tekstil ASA"]


@oppgave("ov-tvi3", tema="tvilling", tittel="More leverage: the new debt's yield, beta and the cost of equity",
         antall=12, sjanger="tvilling", kilde="V2024 P2 (d), Lecture 10 promised yield")
def _(r):
    fi = r.choice(FIRMA3)
    rf = r.choice([0.03, 0.035, 0.04])
    mrp = r.choice([0.05, 0.055, 0.06])
    gi_rm = r.random() < 0.4
    tau = r.choice([0.22, 0.25])
    bE0 = r.choice([0.90, 1.00, 1.10, 1.20, 1.30])
    form = r.choice(["de", "dv"])
    if form == "de":
        de0 = r.choice([0.25, 0.50])
        w0 = de0 / (1 + de0)
        lev0 = f"a debt-to-equity ratio D/E of {tall(de0, 2)}"
    else:
        w0 = r.choice([0.10, 0.20, 0.25])
        de0 = w0 / (1 - w0)
        lev0 = f"a debt-to-value ratio D/V of {tall(w0, 2)}"
    bD0 = r.choice([0.0, 0.05, 0.10])
    rD0 = rf + bD0 * mrp
    w1 = r.choice([x for x in (0.40, 0.45, 0.50, 0.60) if x - w0 >= 0.15])
    DE1 = w1 / (1 - w1)
    bD1 = r.choice([0.20, 0.25, 0.30, 0.40])
    rD1 = rf + bD1 * mrp
    p = r.choice([0.02, 0.03, 0.04, 0.05])
    L = r.choice([0.30, 0.40, 0.50, 0.60])
    y = rD1 + p * L
    _pen(rD0, rD1, y)

    # eksakt
    bU = (1 - w0) * bE0 + w0 * bD0
    rU = rf + bU * mrp
    bE1 = bU + DE1 * (bU - bD1)
    rE1 = rf + bE1 * mrp
    rE0 = rf + bE0 * mrp
    wacc0 = (1 - w0) * rE0 + w0 * rD0 * (1 - tau)
    wacc1 = (1 - w1) * rE1 + w1 * rD1 * (1 - tau)
    # vist
    bU4 = rund(bU, 4)
    rU6 = rund(rf + bU4 * mrp, 6)
    bD14 = rund(bD1, 4)
    bE14 = rund(bU4 + DE1 * (bU4 - bD14), 4)
    rE16 = rund(rf + bE14 * mrp, 6)
    wacc06 = rund((1 - w0) * rE0 + w0 * rD0 * (1 - tau), 6)
    wacc16 = rund((1 - w1) * rE16 + w1 * rD1 * (1 - tau), 6)
    for vist, eks in ((rU6, rU), (bE14, bE1), (rE16, rE1), (wacc16, wacc1)):
        _sjekk(vist, eks, 0.001)

    # feller
    f_bd0 = (1 - w0) * bE0 if bD0 > 0 else None
    f_de = ((1 - de0) * bE0 + de0 * bD0) if form == "de" else None
    Ds = w0 * (1 - tau)
    f_skatt = (1 - w0) / (1 - w0 + Ds) * bE0 + Ds / (1 - w0 + Ds) * bD0
    rm = rf + mrp
    f_rUe = rE0
    f_rUm = rf + bU4 * rm
    f_y = y
    f_yp = y - p
    f_1p = (1 - p) * y
    f_bDy = (y - rf) / mrp
    f_bD1p = (f_1p - rf) / mrp
    f_bE_rf = bU4 * (1 + DE1)
    f_bE_old = bU4 + DE1 * (bU4 - bD0)
    f_bE_dv = bU4 + w1 * (bU4 - bD14)
    f_bE_y = bU4 + DE1 * (bU4 - f_bDy)
    f_w0_ingen = (1 - w0) * rE0 + w0 * rD0
    f_w1_y = (1 - w1) * rE16 + w1 * y * (1 - tau)
    f_w1_ingen = (1 - w1) * rE16 + w1 * rD1

    if gi_rm:
        mtekst = f"the expected return on the market portfolio is {_pr(rm)}"
        mrp_steg = f"The market risk premium is {_pr(rm)} − {_pr(rf)} = {_pr(mrp)}. "
    else:
        mtekst = f"the market risk premium is {_pr(mrp)}"
        mrp_steg = ""
    gjeld0 = ("Its current debt is risk-free." if bD0 == 0 else
              f"Its current debt has an expected return of {_pr(rD0)}.")
    case = (f"<p>{fi} is listed. Its equity beta is {_b(bE0)} and it has {lev0} in market values. {gjeld0} The "
            f"risk-free rate is {_pr(rf)}, {mtekst} and the corporate tax rate is {_pr(tau)}.</p>"
            f"<p>The board plans a leveraged recapitalisation: {fi} will borrow and buy back shares until its "
            f"debt-to-value ratio D/V is {tall(w1, 2)}. It will keep D/V at that level afterwards. The old debt is "
            f"refinanced, so after the change all the debt carries the new terms. Banks quote a promised yield of "
            f"{_pr(y)} on the new debt. Analysts put the annual probability of default at {_pr(p)} and the loss "
            f"given default at {_pr(L)} of face value. Use r<sub>D</sub> = y − p × L for the expected return on "
            f"the new debt. The firm's assets do not change.</p>"
            f"<p>Unlever without taxes, since D/V is kept constant. Give betas with four decimals and rates in "
            f"percent with four decimals.</p>")

    if form == "de":
        vekt = (f"D/E = {tall(de0, 2)} gives D/V = {tall(de0, 2)}/{tall(1 + de0, 2)} = {tall(w0, 4)} and "
                f"E/V = {tall(1 - w0, 4)}.")
    else:
        vekt = f"D/V = {tall(w0, 2)}, so E/V = {tall(1 - w0, 2)}."
    bD0_txt = ("The current debt is risk-free, so β<sub>D</sub> = 0." if bD0 == 0 else
               f"β<sub>D</sub> = ({_pr(rD0)} − {_pr(rf)})/{_pr(mrp)} = {tall(bD0, 2)}.")
    a = tall_del(
        "a", poeng=3,
        q=f"<p>Find {gen(fi)} unlevered beta β<sub>U</sub> and its unlevered cost of capital r<sub>U</sub>.</p>",
        svar=[T("β<sub>U</sub>", bU), T("r<sub>U</sub>", rU * 100, "%")],
        kort=(f"<p><b>β<sub>U</sub> = {tall(bU4, 4)}, r<sub>U</sub> = {pst(rU6, 4)}.</b> β<sub>U</sub> = "
              f"{tall(1 - w0, 4)} × {_b(bE0)} + {tall(w0, 4)} × {tall(bD0, 2)}.</p>"),
        losning=(f"<p>β<sub>U</sub> is the risk of the assets. A recapitalisation changes who carries that risk, not "
                 f"the risk itself, so β<sub>U</sub> and r<sub>U</sub> are the fixed points of the whole exercise. "
                 f"Kurbatov's advice for any change in leverage: go from the levered numbers to r<sub>U</sub>, then "
                 f"from r<sub>U</sub> to the new levered numbers.</p>"
                 f"<p><b>Step 1: weights.</b> {vekt}</p>"
                 f"<p><b>Step 2: debt beta today.</b> {mrp_steg}{bD0_txt}</p>"
                 f"<p><b>Step 3: unlever.</b> β<sub>U</sub> = {tall(1 - w0, 4)} × {_b(bE0)} + {tall(w0, 4)} × "
                 f"{tall(bD0, 2)} = <b>{tall(bU4, 4)}</b>.</p>"
                 f"<p><b>Step 4: CAPM.</b> r<sub>U</sub> = {_pr(rf)} + {tall(bU4, 4)} × {_pr(mrp)} = "
                 f"<b>{pst(rU6, 4)}</b>.</p>"
                 f"<p><b>First check.</b> β<sub>U</sub> lies between β<sub>D</sub> = {tall(bD0, 2)} and "
                 f"β<sub>E</sub> = {_b(bE0)}, as a weighted average must.</p>"
                 f"<p><b>Remember:</b> unlever with today's weights and today's debt beta.</p>"),
        feller=_filtrer([
            Felle(f_bd0, f"You set today's debt beta to zero. The debt earns {_pr(rD0)}, above r<sub>f</sub>.")
            if f_bd0 else None,
            Felle(f_de, f"You used D/E = {tall(de0, 2)} as the debt weight. The weights are D/V and E/V.")
            if f_de else None,
            Felle(f_skatt, "You used after-tax weights D(1 − τ<sub>c</sub>). With constant D/V the course unlevers "
                           "without taxes."),
            Felle(f_rUe * 100, "This is today's cost of equity: you put β<sub>E</sub> into the CAPM, not "
                               "β<sub>U</sub>.", i=1),
            Felle(f_rUm * 100, f"You multiplied β<sub>U</sub> by the market return {_pr(rm)}. The CAPM uses the "
                               f"premium.", i=1) if gi_rm else None,
        ], [bU, rU * 100]),
    )

    b = tall_del(
        "b", poeng=4,
        q=f"<p>Find the expected return r<sub>D</sub> on the new debt and its beta β<sub>D</sub>.</p>",
        selvstendig=True,
        svar=[T("r<sub>D</sub>", rD1 * 100, "%"), T("β<sub>D</sub>", bD1)],
        kort=(f"<p><b>r<sub>D</sub> = {pst(rD1, 4)}, β<sub>D</sub> = {tall(bD14, 4)}.</b> r<sub>D</sub> = "
              f"{_pr(y)} − {_pr(p)} × {_pr(L)}; β<sub>D</sub> = ({pst(rD1, 4)} − {_pr(rf)})/{_pr(mrp)}.</p>"),
        losning=(f"<p>The promised yield is what the lenders get if {fi} never defaults. On average they get less: "
                 f"the expected loss p × L comes off the yield. What is left above r<sub>f</sub> is the risk premium. "
                 f"Only that part says anything about the debt's beta.</p>"
                 f"<p><b>Step 1: expected return.</b> r<sub>D</sub> = y − p × L = {_pr(y)} − {_pr(p)} × {_pr(L)} = "
                 f"{_pr(y)} − {pst(p * L, 4)} = <b>{pst(rD1, 4)}</b>.</p>"
                 f"<p><b>Step 2: beta.</b> {mrp_steg}The CAPM backwards: β<sub>D</sub> = (r<sub>D</sub> − "
                 f"r<sub>f</sub>)/MRP = ({pst(rD1, 4)} − {_pr(rf)})/{_pr(mrp)} = <b>{tall(bD14, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>f</sub> &lt; r<sub>D</sub> &lt; y: {_pr(rf)} &lt; {pst(rD1, 4)} &lt; "
                 f"{_pr(y)}. The spread y − r<sub>f</sub> = {pst(y - rf, 4)} splits into expected loss "
                 f"{pst(p * L, 4)} and risk premium {pst(rD1 - rf, 4)}.</p>"
                 f"<p><b>Remember:</b> the yield is promised, r<sub>D</sub> is expected. Only "
                 f"r<sub>D</sub> − r<sub>f</sub> enters β<sub>D</sub>.</p>"),
        feller=_filtrer([
            Felle(f_y * 100, "This is the promised yield. With a chance of default the lenders expect less.", i=0),
            Felle(f_yp * 100, "You subtracted the default probability alone. The expected loss is p × L: in default "
                              "the lenders lose only part of the face value.", i=0),
            Felle(f_1p * 100, "You multiplied the yield by (1 − p). The formula in the case subtracts the expected "
                              "loss p × L.", i=0),
            Felle(f_bDy, "You took the beta from the whole spread y − r<sub>f</sub>. Part of it is expected loss, not "
                         "a reward for systematic risk.", i=1),
            Felle(0.0, "Risky debt has a positive beta when its expected return lies above r<sub>f</sub>.", i=1),
        ], [rD1 * 100, bD1]),
    )

    c = tall_del(
        "c", poeng=4,
        q=f"<p>Find {gen(fi)} equity beta β<sub>E</sub> and cost of equity r<sub>E</sub> after the recapitalisation.</p>",
        gitt=(f"<p>From (a) and (b): β<sub>U</sub> = {tall(bU4, 4)} and the new debt has β<sub>D</sub> = "
              f"{tall(bD14, 4)}.</p>"),
        svar=[T("β<sub>E</sub>", bE1), T("r<sub>E</sub>", rE1 * 100, "%")],
        kort=(f"<p><b>β<sub>E</sub> = {tall(bE14, 4)}, r<sub>E</sub> = {pst(rE16, 4)}.</b> D/E = {tall(DE1, 4)}: "
              f"β<sub>E</sub> = {tall(bU4, 4)} + {tall(DE1, 4)} × ({tall(bU4, 4)} − {tall(bD14, 4)}).</p>"),
        losning=(f"<p>The assets are unchanged, so β<sub>U</sub> is too. The same risk now sits on a thinner layer of "
                 f"equity, while the riskier debt carries more of it than before.</p>"
                 f"<p><b>Step 1: D/E.</b> D/V = {tall(w1, 2)} gives D/E = {tall(w1, 2)}/{tall(1 - w1, 2)} = "
                 f"{tall(DE1, 4)}.</p>"
                 f"<p><b>Step 2: relever with the new debt beta.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)"
                 f"(β<sub>U</sub> − β<sub>D</sub>) = {tall(bU4, 4)} + {tall(DE1, 4)} × ({tall(bU4, 4)} − "
                 f"{tall(bD14, 4)}) = <b>{tall(bE14, 4)}</b>.</p>"
                 f"<p><b>Step 3: CAPM.</b> r<sub>E</sub> = {_pr(rf)} + {tall(bE14, 4)} × {_pr(mrp)} = "
                 f"<b>{pst(rE16, 4)}</b>.</p>"
                 f"<p><b>Check 2.</b> (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {tall(1 - w1, 2)} × {tall(bE14, 4)} + "
                 f"{tall(w1, 2)} × {tall(bD14, 4)} = {tall((1 - w1) * bE14 + w1 * bD14, 4)} = β<sub>U</sub> up to "
                 f"rounding. It holds by construction, so it catches arithmetic slips, not a stale debt beta.</p>"
                 f"<p><b>Remember:</b> relever with the new D/E and the new debt beta, never the old ones.</p>"),
        feller=_filtrer([
            Felle(f_bE_rf, "You relevered as if the new debt were risk-free: β<sub>U</sub>(1 + D/E) leaves out "
                           "β<sub>D</sub>.", i=0),
            Felle(f_bE_old, f"You used today's debt beta ({tall(bD0, 2)}). After the change all the debt has the new "
                            f"beta.", i=0) if abs(bD0 - bD1) > 1e-9 and bD0 > 0 else None,
            Felle(f_bE_dv, "You used D/V instead of D/E in the relevering formula.", i=0),
            Felle(f_bE_y, "You used a debt beta taken from the promised yield. That beta includes the expected "
                          "loss.", i=0),
            Felle((rf + f_bE_rf * mrp) * 100, "This cost of equity treats the new debt as risk-free.", i=1),
            Felle((rf + f_bE_dv * mrp) * 100, "This cost of equity is built on D/V instead of D/E.", i=1),
            Felle(rU6 * 100, "This is r<sub>U</sub>, the cost of capital of the assets, not of the levered "
                             "equity.", i=1),
        ], [bE1, rE1 * 100]),
    )

    d = tall_del(
        "d", poeng=3,
        q=f"<p>Find {gen(fi)} after-tax WACC before and after the recapitalisation.</p>",
        gitt=(f"<p>From (b) and (c): r<sub>D</sub> = {pst(rD1, 4)} on the new debt and r<sub>E</sub> = "
              f"{pst(rE16, 4)} after the recapitalisation.</p>"),
        svar=[T("r<sub>wacc</sub> before", wacc0 * 100, "%"), T("r<sub>wacc</sub> after", wacc1 * 100, "%")],
        kort=(f"<p><b>Before {pst(wacc06, 4)}, after {pst(wacc16, 4)}.</b> Before: {tall(1 - w0, 4)} × "
              f"{pst(rE0, 4)} + {tall(w0, 4)} × {_pr(rD0)} × {tall(1 - tau, 2)}. After: {tall(1 - w1, 2)} × "
              f"{pst(rE16, 4)} + {tall(w1, 2)} × {pst(rD1, 4)} × {tall(1 - tau, 2)}.</p>"),
        losning=(f"<p>The WACC uses expected returns: r<sub>E</sub> and the expected return on debt, after tax. "
                 f"Today's r<sub>E</sub> comes from today's β<sub>E</sub>.</p>"
                 f"<p><b>Step 1: before.</b> r<sub>E</sub> = {_pr(rf)} + {_b(bE0)} × {_pr(mrp)} = {pst(rE0, 4)}. "
                 f"r<sub>wacc</sub> = {tall(1 - w0, 4)} × {pst(rE0, 4)} + {tall(w0, 4)} × {_pr(rD0)} × "
                 f"{tall(1 - tau, 2)} = <b>{pst(wacc06, 4)}</b>.</p>"
                 f"<p><b>Step 2: after.</b> r<sub>wacc</sub> = {tall(1 - w1, 2)} × {pst(rE16, 4)} + {tall(w1, 2)} × "
                 f"{pst(rD1, 4)} × {tall(1 - tau, 2)} = <b>{pst(wacc16, 4)}</b>.</p>"
                 f"<p><b>First check.</b> r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>: "
                 f"{pst(rU6, 4)} − {tall(w0, 4)} × {tall(tau, 2)} × {_pr(rD0)} = {pst(rU6 - w0 * tau * rD0, 4)} and "
                 f"{pst(rU6, 4)} − {tall(w1, 2)} × {tall(tau, 2)} × {pst(rD1, 4)} = {pst(rU6 - w1 * tau * rD1, 4)}. "
                 f"Both match up to rounding; the WACC falls only because more of the firm is financed with "
                 f"tax-deductible debt.</p>"
                 f"<p><b>Remember:</b> the WACC takes the expected return on debt, never the promised yield.</p>"),
        feller=_filtrer([
            Felle(f_w0_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax "
                                    "WACC.", i=0),
            Felle(f_w1_y * 100, f"You put the promised yield {_pr(y)} into the WACC. The WACC needs the expected "
                                f"return on the debt.", i=1),
            Felle(f_w1_ingen * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. That is the pre-tax "
                                    "WACC.", i=1),
            Felle(wacc0 * 100, "This is the WACC before the change. More tax-deductible debt lowers it.", i=1),
        ], [wacc0 * 100, wacc1 * 100]),
    )

    # Dekomponering: først ny D/E med dagens gjeldsbeta, så ny gjeldsbeta ved ny D/E.
    bE_mid = rund(bU4 + DE1 * (bU4 - bD0), 4)
    eff_lev = rund(bE_mid - bE0, 4)
    eff_beta = rund(bE14 - bE_mid, 4)
    e = tekst_del(
        "e", poeng=4,
        q=(f"<p>The CFO makes two claims. First: «Our new debt costs {_pr(y)}, so that is the cost of debt in our "
           f"WACC.» Second: «The new debt is riskier, so our equity will be in an even riskier state.» Comment on "
           f"the first claim. For the second, explain which part of the change in β<sub>E</sub> comes from the "
           f"higher leverage and which from the higher debt beta.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): before the change β<sub>E</sub> = {_b(bE0)} at D/E = {_b(de0)} with "
              f"β<sub>D</sub> = {tall(bD0, 2)}; after it β<sub>E</sub> = {tall(bE14, 4)} at D/E = {tall(DE1, 4)} "
              f"with β<sub>D</sub> = {tall(bD14, 4)} and r<sub>D</sub> = {pst(rD1, 4)}; β<sub>U</sub> = "
              f"{tall(bU4, 4)}.</p>"),
        kort=(f"<p>The first claim is wrong: {_pr(y)} is the promised yield, earned only if {fi} never defaults; "
              f"the expected return is lower by the expected loss, r<sub>D</sub> = {pst(rD1, 4)}; a cost of "
              f"capital is an expected return, so the WACC uses r<sub>D</sub>. Leverage drives the rise: with "
              f"today's debt beta of {tall(bD0, 2)}, moving D/E from {_b(de0)} to {tall(DE1, 4)} would lift "
              f"β<sub>E</sub> from {_b(bE0)} to {tall(bE_mid, 4)} (+{tall(eff_lev, 4)}), because the same asset risk "
              f"sits on less equity. The higher debt beta pulls the other way at the new D/E: β<sub>D</sub> rising to "
              f"{tall(bD14, 4)} moves part of the asset risk to the lenders and lowers β<sub>E</sub> by "
              f"{tall(-eff_beta, 4)} to {tall(bE14, 4)}.</p>"),
        losning=(f"<p><b>The yield.</b> A promised yield assumes every payment arrives. With default probability "
                 f"{_pr(p)} and a loss of {_pr(L)} in default, the lenders expect {pst(p * L, 4)} less: "
                 f"r<sub>D</sub> = {pst(rD1, 4)}. The WACC and MM II are built on expected returns, so they need "
                 f"r<sub>D</sub>. The yield overstates what the debt costs in expectation.</p>"
                 f"<p><b>The equity risk.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>). "
                 f"Two things change at once, so split the change in two steps. Leverage first, with today's debt "
                 f"beta: {tall(bU4, 4)} + {tall(DE1, 4)} × ({tall(bU4, 4)} − {tall(bD0, 2)}) = {tall(bE_mid, 4)}, up "
                 f"{tall(eff_lev, 4)} from {_b(bE0)}: the same asset risk sits on a thinner equity layer. Then the "
                 f"new debt beta at the new D/E: {tall(bE14, 4)} − {tall(bE_mid, 4)} = −{tall(-eff_beta, 4)} = "
                 f"−{tall(DE1, 4)} × ({tall(bD14, 4)} − {tall(bD0, 2)}) up to rounding. The lenders now bear part of "
                 f"the swings in asset value, so the term (β<sub>U</sub> − β<sub>D</sub>) shrinks. In total "
                 f"β<sub>E</sub> rises by {tall(eff_lev, 4)} − {tall(-eff_beta, 4)} = {tall(eff_lev + eff_beta, 4)}."
                 f"</p>"
                 f"<p><b>How to read the claim.</b> Kurbatov put it this way in class (PS1 E3 (c)): if debt becomes "
                 f"riskier, then the equity is in an even riskier state. That holds for the equity's total risk when "
                 f"the firm takes on more debt that is also riskier, as here. Holding D/E fixed, a higher "
                 f"β<sub>D</sub> alone dampens the rise. A full answer names both effects.</p>"
                 f"<p><b>Typical mistakes:</b> putting the yield into the WACC. Another is mixing up the two effects: "
                 f"the rise comes from leverage, while the higher β<sub>D</sub> on its own dampens it.</p>"
                 f"<p><b>Remember:</b> promised is not expected. Leverage drives β<sub>E</sub> up; a higher "
                 f"β<sub>D</sub> at a given D/E dampens the rise.</p>"),
        kriterier=[
            f"States that {_pr(y)} is the promised yield, earned only without default; the expected return is "
            f"lower by the expected loss p × L (1 p)",
            "Says the WACC needs the expected return r<sub>D</sub>, since a cost of capital is an expected return, "
            "so the first claim is wrong (1 p)",
            "Explains that β<sub>E</sub> and r<sub>E</sub> rise because D/E rises: the same asset risk sits on less "
            "equity (1 p)",
            "Explains that at a given D/E the higher debt beta takes part of the asset risk off the shareholders and "
            "dampens the rise: β<sub>E</sub> is lower than it would be with today's debt beta (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d, e])
