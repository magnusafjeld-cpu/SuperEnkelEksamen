# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402, tema «tvilling» (prefiks tvi-): tvillingfirmaet,
   unlevering og relevering, CAPM begge veier, gjeldsbeta, netto gjeld og
   flere tvillinger. Skribent 1 (verdsettingskjeden). Kontrakten er
   docs/fie402-trening-spek.md.

   Familier (regnespørsmål med tallsvar)
     tvi-unl1   r_E fra en tvilling med gjeldsbeta på begge sider
                (flyttet uendret fra eksempel.py)
     tvi-bu1    tvillingens r_U fra β_E og forventet r_D (CAPM baklengs på gjelden)
     tvi-rf1    r_E med risikofri gjeld på begge sider, uten skatt i vektene
     tvi-wac1   hele kjeden til WACC etter skatt (H2024 E5 a–c)
     tvi-net1   netto gjeld: bare overskuddskassen trekkes fra (B3, PS2 E7)
     tvi-fler1  flere tvillinger, likt eller med 1/avstand (B14, forelesning 7–8)
     tvi-dbt1   gjeldsbeta fra forventet avkastning, ikke lovet rente (H2025 E4 a)

   Statiske: tvi-s01 … tvi-s14 (mekanismen bak tallene og vanlige feil).

   Konvensjoner (Kurbatov 2026): β_U uten skatt i vektene ved konstant D/V,
   netto gjeld i vektene, diskret diskontering, fire desimaler i mellomtall.
"""
from trening_lib import *  # noqa: F401,F403


# Fiktive selskaper: (ditt selskap, tvillingen).
PAR = [("Skarvik Logistics", "Brennholm Freight"), ("Lysefjord Foods", "Ramsund Seafood"),
       ("Kvalnes Robotics", "Tindheim Automation"), ("Austvik Energy", "Norheim Power"),
       ("Sandvær Shipping", "Hellevik Carriers"), ("Moldfjell Retail", "Grønnsund Stores")]

# Flere fiktive børsnoterte selskaper til familiene som bare trenger ett navn.
NAVN = ["Brennholm Freight", "Ramsund Seafood", "Tindheim Automation", "Norheim Power",
        "Hellevik Carriers", "Grønnsund Stores", "Fjellvang Cement", "Solvik Packaging",
        "Brakstad Media", "Orrevik Chemicals", "Kvernes Timber", "Lundeby Telecom"]


def _p(x, d=2):
    """En rente som brøk vist i prosent med d desimaler: 0.13325 → «13.33%»."""
    return pst(x, d)


def _pct(x, d):
    """Brøk til prosent med d desimaler, uten flyttallsstøy: 0.17625 → «17.63%»."""
    return tall(round(x * 100, 9), d) + "%"


def _ep(x, mind=0, maxd=4):
    """Rente som brøk i prosent i kortest eksakte form: 0.045 → «4.5%», 0.0403125 → «4.0313%»
       (rundes til maxd desimaler når tallet ikke er eksakt)."""
    for d in range(mind, maxd + 1):
        if abs(rund(x * 100, d) - x * 100) < 1e-7:
            return _pct(x, d)
    return _pct(x, maxd)


def _et(x, mind=0, maxd=6):
    """Tall i kortest eksakte form med minst mind desimaler: 1.2 → «1.20» (mind=2)."""
    for d in range(mind, maxd + 1):
        if abs(rund(x, d) - x) < 1e-9:
            return tall(x, d)
    return tall(x, maxd)


def _vp(x, eks=None):
    """Svaret som prosent med så få desimaler (2–4) at det ligger godt innenfor
       toleransen til det eksakte svaret."""
    e = x if eks is None else eks
    for d in (2, 3, 4):
        if abs(rund(round(x * 100, 9), d) - e * 100) <= 0.0008 * abs(e * 100):
            return _pct(x, d)
    return _pct(x, 4)


def _vt(x, eks=None):
    """Svaret som tall med to desimaler, eller fire når to blir for grovt."""
    e = x if eks is None else eks
    for d in (2, 4):
        if abs(rund(x, d) - e) <= 0.0008 * abs(e):
            return tall(x, d)
    return tall(x, 4)


_TALLTEKST = __import__("re").compile(r"^[−-]?\d{1,3}(?:\u00a0\d{3})*(?:\.(\d+))?(%?)$")


def _alt(svartekst, svar, feller):
    """Alternativene: fasiten først, så fellene. Er fasiten et rent tall eller en
       prosent, vises fellene med like mange desimaler som fasiten."""
    m = _TALLTEKST.match(svartekst)
    ut = [R(svartekst, svar)]
    for t, f, v in feller:
        if m and _TALLTEKST.match(t):
            d = len(m.group(1) or "")
            t = _pct(v, d) if m.group(2) else tall(v, d)
        ut.append(F(t, f, v))
    return ut


def _velg(r, kandidater, n=3, rel=0.02):
    """Velg n feller (tekst, felle, verdi) i tilfeldig rekkefølge som ligger
       minst rel unna hverandre og unna svaret (første element i kandidater er
       svaret). Avvis når det ikke finnes nok."""
    svar, rest = kandidater[0], list(kandidater[1:])
    r.shuffle(rest)
    valgt = []
    for k in rest:
        if all(not nær(k[2], v[2], rel) for v in [svar] + valgt):
            valgt.append(k)
        if len(valgt) == n:
            return valgt
    raise Avvis("for få feller som skiller seg fra svaret")


# ---------------------------------------------------------------------------
# tvi-unl1 · Kostnaden på egenkapitalen fra en tvilling, med gjeldsbeta
# (flyttet uendret fra eksempel.py)
# ---------------------------------------------------------------------------
@familie("tvi-unl1", tema="tvilling", antall=8, tittel="Cost of equity from a twin with debt betas",
         hjelp=hjelp3(
             "This is the twin-firm routine. The twin has the same business risk as your firm, so its asset beta "
             "is yours. You need your own firm's cost of equity.",
             "β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> with the twin's market values. "
             "β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>) with your own D/E and your own "
             "debt beta. r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub> × market risk premium.",
             "<p><b>Step 1: unlever the twin.</b> Weight the twin's equity beta and debt beta by the twin's own "
             "market-value weights E/V and D/V. The result is the asset beta, which both firms share.</p>"
             "<p><b>Step 2: relever at your leverage.</b> If you are given D/V, turn it into D/E first. Use your own "
             "debt beta, not the twin's.</p>"
             "<p><b>Step 3: the CAPM.</b> Add the risk-free rate to the equity beta times the market risk "
             "premium.</p>"
             "<p><b>Watch out:</b> the twin's equity beta reflects the twin's leverage, not yours. Stopping at the "
             "asset beta gives r<sub>U</sub>, not r<sub>E</sub>.</p>",
         ))
def _(r):
    eget, tvilling = r.choice(PAR)
    V_t = r.choice([800, 1000, 1200, 1500])
    dv_t = r.choice([0.20, 0.25, 0.30, 0.35, 0.40])
    D_t = round(V_t * dv_t)
    E_t = V_t - D_t
    bE_t = r.choice([1.20, 1.25, 1.30, 1.40, 1.50])
    bD_t = r.choice([0.10, 0.15, 0.20])
    dv = r.choice([0.20, 0.25, 0.40, 0.50])               # din D/V
    bD = r.choice([0.10, 0.20, 0.25, 0.30])
    rf = r.choice([0.03, 0.035, 0.04, 0.045])
    mrp = r.choice([0.05, 0.055, 0.06])
    oppgitt_de = r.random() < 0.5                          # D/E eller D/V i oppgaven

    # Fire desimaler i hvert mellomtall, som Kurbatov. Da summerer tallene i
    # fasiten til det fasiten viser (forfatterspek § 9.5).
    wE, wD = E_t / V_t, D_t / V_t
    de = rund(dv / (1 - dv), 4)
    bU = rund(wE * bE_t + wD * bD_t, 4)
    bE = rund(bU + de * (bU - bD), 4)
    rE = rf + bE * mrp

    bU0 = rund(wE * bE_t, 4)                               # gjeldsbeta satt til 0 på begge sider
    bE0 = rund(bU0 * (1 + de), 4)
    f_bd0 = rf + bE0 * mrp
    f_tvilling = rf + bE_t * mrp                           # tvillingens egenkapitalbeta rett inn
    f_ru = rf + bU * mrp                                   # stoppet ved r_U
    ulike(rE, f_bd0, f_tvilling, f_ru, rel=0.02)

    # Kontroll 2 med dine egne vekter. Med avrundet D/E kan den bomme i fjerde desimal.
    kontroll = rund((1 - dv) * bE + dv * bD, 4)
    if kontroll != bU:
        raise Avvis("kontrollen treffer ikke β_U i fjerde desimal")

    rent_de = oppgitt_de and de in (0.25, 1.0)              # D/E oppgis bare når det er et rent tall
    gjeld = f"a debt-to-equity ratio of {tall(de, 2)}" if rent_de else f"a debt-to-value ratio of {_p(dv, 0)}"
    q = (f"<p>You need the cost of equity for {eget}, a private firm. Its listed twin, {tvilling}, has the same "
         f"business risk. {tvilling} has equity worth NOK {E_t} million and debt worth NOK {D_t} million, both at "
         f"market value. Its equity beta is {tall(bE_t, 2)} and its debt beta is {tall(bD_t, 2)}. {eget} will keep "
         f"{gjeld} and its debt beta is {tall(bD, 2)}. Both firms keep their leverage constant. The risk-free rate "
         f"is {_p(rf, 1)} and the market risk premium is {_p(mrp, 1)}.</p>"
         f"<p>What is {gen(eget)} cost of equity?</p>")

    alternativer = [
        R(_p(rE), rE),
        F(_p(f_bd0),
          f"Debt betas set to 0 on both sides: β<sub>U</sub> = {tall(wE, 2)} × {tall(bE_t, 2)} = {tall(bU0, 4)}, "
          f"relevered to {tall(bE0, 4)}. Both debts are risky, so dropping β<sub>D</sub> misstates the asset beta "
          f"and the relevering.", f_bd0),
        F(_p(f_tvilling),
          f"The twin's equity beta of {tall(bE_t, 2)} used directly. It carries the twin's leverage, not "
          f"{gen(eget)}: unlever and relever first.", f_tvilling),
        F(_p(f_ru),
          "This is r<sub>U</sub>, the return on the assets. You stopped after unlevering. Your shareholders also "
          "carry the financial risk of your firm's debt, so relever before the CAPM.", f_ru),
    ]

    de_tekst = f"D/E = {tall(de, 2)}" if rent_de else f"D/E = {tall(dv, 2)}/{tall(1 - dv, 2)} = {tall(de, 4)}"
    kort = (f"<p><b>{_p(rE)}.</b> β<sub>U</sub> = {tall(wE, 2)} × {tall(bE_t, 2)} + {tall(wD, 2)} × "
            f"{tall(bD_t, 2)} = {tall(bU, 4)}. With {de_tekst}: β<sub>E</sub> = {tall(bU, 4)} + {tall(de, 4)} × "
            f"({tall(bU, 4)} − {tall(bD, 2)}) = {tall(bE, 4)}. r<sub>E</sub> = {_p(rf, 1)} + {tall(bE, 4)} × "
            f"{_p(mrp, 1)} = {_p(rE)}.</p>")

    full = (
        f"<p><b>What the twin is for.</b> {eget} has no share price, so you cannot estimate its beta directly. "
        f"{tvilling} runs the same business, so its <i>assets</i> carry the same risk. Its equity beta, though, also "
        f"reflects how much debt {tvilling} uses. You strip that financing out (unlever), keep the asset beta and "
        f"put {gen(eget)} own financing back in (relever).</p>"
        f"<p><b>Step 1: unlever the twin.</b> The twin's firm value is {E_t} + {D_t} = {V_t}, so E/V = "
        f"{tall(wE, 2)} and D/V = {tall(wD, 2)}. β<sub>U</sub> = {tall(wE, 2)} × {tall(bE_t, 2)} + "
        f"{tall(wD, 2)} × {tall(bD_t, 2)} = {tall(bU, 4)}.</p>"
        f"<p><b>Step 2: relever at your own leverage.</b> {de_tekst}. With your own debt beta: β<sub>E</sub> = "
        f"{tall(bU, 4)} + {tall(de, 4)} × ({tall(bU, 4)} − {tall(bD, 2)}) = {tall(bE, 4)}.</p>"
        f"<p><b>Step 3: the CAPM.</b> r<sub>E</sub> = {_p(rf, 1)} + {tall(bE, 4)} × {_p(mrp, 1)} = "
        f"<b>{_p(rE)}</b>.</p>"
        f"<p><b>Check 2.</b> Weight your own betas by your own weights: {tall(1 - dv, 2)} × {tall(bE, 4)} + "
        f"{tall(dv, 2)} × {tall(bD, 2)} = {tall(kontroll, 4)}, which is β<sub>U</sub> again. Because β<sub>E</sub> "
        f"was built from β<sub>U</sub>, this check is an identity: it catches a slip in the relevering, not a "
        f"wrong β<sub>U</sub>.</p>"
        f"<p><b>Remember:</b> unlever with the twin's weights and debt beta, relever with yours, then use the "
        f"CAPM.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-bu1 · Tvillingens r_U fra β_E og forventet avkastning på gjelden
# (CAPM baklengs for gjeldsbetaen, så unlevering og CAPM forlengs)
# ---------------------------------------------------------------------------
@familie("tvi-bu1", tema="tvilling", antall=7, tittel="The twin's unlevered cost of capital with risky debt",
         hjelp=hjelp3(
             "This is the first half of the twin-firm routine: strip the twin's financing out of its betas. You "
             "need the return on the twin's assets, r<sub>U</sub>.",
             "β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>). "
             "β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> with market values and no tax term. "
             "r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>).",
             "<p><b>Step 1: the weights.</b> Turn D/E into D/V = (D/E)/(1 + D/E), or price the equity at the "
             "market: shares times price, never book equity.</p>"
             "<p><b>Step 2: the debt beta.</b> Run the CAPM backwards on the expected return on the debt. Check "
             "whether you were given the market return or the premium.</p>"
             "<p><b>Step 3: unlever, then the CAPM.</b> Weight the two betas by E/V and D/V and put β<sub>U</sub> "
             "into the CAPM.</p>"
             "<p><b>Watch out:</b> the tax rate has no place in r<sub>U</sub>. Risky debt has a positive beta.</p>",
         ))
def _(r):
    tw = r.choice(NAVN)
    bE = r.choice([1.10, 1.20, 1.25, 1.30, 1.40, 1.50, 1.60])
    bD = r.choice([0.10, 0.15, 0.20, 0.25, 0.30, 0.40])
    rf = r.choice([0.03, 0.035, 0.04, 0.045, 0.05])
    mrp = r.choice([0.05, 0.06])
    rD = rf + bD * mrp
    Rm = rf + mrp
    tau = r.choice([0.22, 0.25, 0.30, 0.40])
    marked = r.random() < 0.5                              # markedsavkastningen i stedet for premien
    form = r.choice(["de", "mv"])
    de = r.choice([0.25, 0.60, 1.00, 1.50])                # vekter som blir eksakte
    if form == "de":
        wD = de / (1 + de)
        wE = 1 - wD
        lev = f"It keeps a debt-to-equity ratio of {tall(de, 2)}, measured at market values."
        E = D = book = None
    else:
        N, P = r.choice([(20, 30), (25, 40), (40, 45), (50, 24), (30, 50), (16, 75)])
        E = N * P
        D = round(E * de)
        if abs(D - E * de) > 1e-9:
            raise Avvis("gjelden blir ikke et helt tall")
        book = round(E * r.choice([0.35, 0.45, 0.55]))
        wE, wD = E / (E + D), D / (E + D)
        lev = (f"It has {N} million shares trading at NOK {P} and debt with a market value of NOK {tall(D)} "
               f"million. The book value of its equity is NOK {tall(book)} million.")

    bU = wE * bE + wD * bD
    rU = rf + bU * mrp
    rE = rf + bE * mrp

    # Feller, hver regnet ut av feilen den beskriver
    f_bd0 = rf + wE * bE * mrp
    f_tax = wE * rE + wD * rD * (1 - tau)
    kand = [("R", None, rU),
            (_vp(f_bd0), f"The debt treated as risk-free: β<sub>U</sub> = {_et(wE, 2)} × {tall(bE, 2)} = "
                         f"{_et(wE * bE, 2)}. The debt pays more than r<sub>f</sub>, so its beta is positive and the "
                         f"term (D/V)β<sub>D</sub> belongs in the asset beta.", f_bd0),
            (_vp(f_tax), f"The debt's return taken after tax: {_et(wE, 2)} × {_ep(rE)} + {_et(wD, 2)} × {_ep(rD)} × "
                         f"(1 − {_ep(tau)}). That is an after-tax WACC. The assets earn their return before any "
                         f"interest deduction, so r<sub>U</sub> has no tax term.", f_tax)]
    if marked:
        bD_m = (rD - rf) / Rm
        f_mkt = rf + (wE * bE + wD * bD_m) * Rm
        kand.append((_vp(f_mkt), f"The market return of {_ep(Rm)} used as the premium, both in β<sub>D</sub> and in "
                                 f"the CAPM. The premium is E[R<sub>mkt</sub>] − r<sub>f</sub>.", f_mkt))
    if form == "mv":
        wEb = book / (book + D)
        f_book = rf + (wEb * bE + (1 - wEb) * bD) * mrp
        kand.append((_vp(f_book), f"Book equity of {tall(book)} used in the weights: E/V = {tall(book)}/"
                                  f"{tall(book + D)}. Weights are market values: shares times price.", f_book))
    if form == "de" and de < 1:
        f_de = rf + ((1 - de) * bE + de * bD) * mrp
        kand.append((_vp(f_de), f"D/E = {tall(de, 2)} used as the debt weight, with E/V = 1 − {tall(de, 2)}. The "
                                f"weights are D/V = (D/E)/(1 + D/E) and E/V = 1 − D/V.", f_de))
    f_re = rE
    kand.append((_vp(f_re), f"This is the twin's cost of equity, r<sub>f</sub> + {tall(bE, 2)} × {_ep(mrp)}. It "
                            f"still carries the twin's leverage: weight in the debt to get r<sub>U</sub>.", f_re))
    feller = _velg(r, kand)

    if form == "de":
        vekt = (f"D/V = {tall(de, 2)}/{_et(1 + de, 2)} = {_et(wD, 2)} and E/V = {_et(wE, 2)}")
    else:
        vekt = (f"E = {N} × {P} = {tall(E)}, V = {tall(E)} + {tall(D)} = {tall(E + D)}, so E/V = {_et(wE, 2)} "
                f"and D/V = {_et(wD, 2)}")
    prem = (f"The premium is {_ep(Rm)} − {_ep(rf)} = {_ep(mrp)}. " if marked else "")
    t1, t2 = wE * bE, wD * bD

    q = (f"<p>{tw} is listed and keeps its leverage constant. {lev} Its equity beta is {tall(bE, 2)}. Its debt is "
         f"risky: the expected return on the debt is {_ep(rD)}. "
         + (f"The risk-free rate is {_ep(rf)} and the expected return on the market portfolio is {_ep(Rm)}. "
            if marked else f"The risk-free rate is {_ep(rf)} and the market risk premium is {_ep(mrp)}. ")
         + f"The corporate tax rate is {_ep(tau)}.</p>"
         f"<p>What is {gen(tw)} unlevered cost of capital r<sub>U</sub>, in percent?</p>")

    alternativer = _alt(_vp(rU), rU, feller)

    kort = (f"<p><b>{_vp(rU)}.</b> {prem}β<sub>D</sub> = ({_ep(rD)} − {_ep(rf)})/{_ep(mrp)} = {_et(bD, 2)}. "
            f"β<sub>U</sub> = {_et(wE, 2)} × {tall(bE, 2)} + {_et(wD, 2)} × {_et(bD, 2)} = {_et(bU, 2)}. "
            f"r<sub>U</sub> = {_ep(rf)} + {_et(bU, 2)} × {_ep(mrp)} = {_ep(rU)}.</p>")

    full = (
        f"<p><b>What r<sub>U</sub> is.</b> r<sub>U</sub> is the return investors require on the business itself, "
        f"as if it had no debt. A firm is a portfolio of its equity and its debt, so the asset beta is the "
        f"value-weighted average of the two betas. Debt that pays more than r<sub>f</sub> carries systematic "
        f"risk, so its beta is positive and must stay in the average.</p>"
        f"<p><b>Step 1: the weights.</b> {vekt}.</p>"
        f"<p><b>Step 2: the debt beta.</b> {prem}Run the CAPM backwards on the debt: β<sub>D</sub> = "
        f"({_ep(rD)} − {_ep(rf)})/{_ep(mrp)} = {_et(bD, 2)}.</p>"
        f"<p><b>Step 3: unlever.</b> β<sub>U</sub> = {_et(wE, 2)} × {tall(bE, 2)} + {_et(wD, 2)} × {_et(bD, 2)} = "
        f"{_et(t1, 2)} + {_et(t2, 2)} = {_et(bU, 2)}.</p>"
        f"<p><b>Step 4: the CAPM.</b> r<sub>U</sub> = {_ep(rf)} + {_et(bU, 2)} × {_ep(mrp)} = <b>{_ep(rU)}</b>. "
        f"The tax rate of {_ep(tau)} plays no part: it belongs in the after-tax WACC, not in the return on the "
        f"assets.</p>"
        f"<p><b>First check: the same r<sub>U</sub> through the returns.</b> r<sub>E</sub> = {_ep(rf)} + "
        f"{tall(bE, 2)} × {_ep(mrp)} = {_ep(rE)}. Then {_et(wE, 2)} × {_ep(rE)} + {_et(wD, 2)} × {_ep(rD)} = "
        f"{_ep(wE * rE)} + {_ep(wD * rD)} = {_ep(rU)}, the pre-tax WACC. The two routes are the same arithmetic in "
        f"different units, so this check catches slips only, not a wrong weight.</p>"
        f"<p><b>Remember:</b> β<sub>D</sub> from the expected return on the debt, market-value weights and no "
        f"tax term in r<sub>U</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-rf1 · Relevering med risikofri gjeld på begge sider, uten skatt i vektene
# ---------------------------------------------------------------------------
@familie("tvi-rf1", tema="tvilling", antall=7, tittel="Relevering with risk-free debt on both sides",
         hjelp=hjelp3(
             "This is the twin-firm routine when both firms borrow risk-free. You move the twin's asset beta to your "
             "own firm and need your own cost of equity.",
             "With β<sub>D</sub> = 0: β<sub>U</sub> = (E/V)β<sub>E</sub> = β<sub>E</sub>/(1 + D/E) for the twin, "
             "then β<sub>E</sub> = β<sub>U</sub>(1 + D/E) with your own D/E. No tax term when the firms keep their "
             "leverage constant. r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub> × premium.",
             "<p><b>Step 1: unlever the twin.</b> Divide the twin's equity beta by one plus the twin's D/E.</p>"
             "<p><b>Step 2: relever at your leverage.</b> If you are given D/V, convert it: D/E = (D/V)/(1 − D/V). "
             "Multiply β<sub>U</sub> by one plus your D/E.</p>"
             "<p><b>Step 3: the CAPM.</b> Add r<sub>f</sub> to β<sub>E</sub> times the market risk premium.</p>"
             "<p><b>Watch out:</b> the tax rate tempts you into the textbook formula with (1 − τ<sub>c</sub>). It "
             "belongs to a fixed, permanent amount of debt, not to a constant ratio.</p>",
         ))
def _(r):
    eget, tw = r.choice(PAR)
    bE_t = r.choice([1.20, 1.25, 1.30, 1.40, 1.50, 1.60, 1.80])
    de_t = r.choice([0.25, 0.60, 1.00, 1.50])
    form = "dv" if r.random() < 0.6 else "de"
    if form == "dv":
        dv = r.choice([0.20, 0.50, 0.60])
        de = dv / (1 - dv)
        lev = f"a debt-to-value ratio of {_et(dv, 2)}"
    else:
        de = r.choice([0.25, 0.60, 1.00, 1.50])
        dv = de / (1 + de)
        lev = f"a debt-to-equity ratio of {_et(de, 2)}"
    if abs(de - de_t) < 1e-9:
        raise Avvis("samme gjeldsgrad som tvillingen")
    rf = r.choice([0.03, 0.035, 0.04, 0.045])
    mrp = r.choice([0.05, 0.055, 0.06, 0.065])
    tau = r.choice([0.22, 0.25, 0.40])

    bU = bE_t / (1 + de_t)
    bE = bU * (1 + de)
    rE = rf + bE * mrp
    rU = rf + bU * mrp

    f_ru = rU
    f_tw = rf + bE_t * mrp
    bU_h = bE_t / (1 + (1 - tau) * de_t)
    bE_h = bU_h * (1 + (1 - tau) * de)
    f_ham = rf + bE_h * mrp
    kand = [("R", None, rE),
            (_vp(f_ru), "This is r<sub>U</sub>: you stopped after unlevering. Your shareholders carry your firm's "
                        "financial risk on top of the business risk, so relever before the CAPM.", f_ru),
            (_vp(f_tw), f"The twin's equity beta of {tall(bE_t, 2)} used directly. It reflects the twin's D/E of "
                        f"{tall(de_t, 2)}, not your leverage.", f_tw),
            (_vp(f_ham), f"The textbook formula with taxes, β<sub>U</sub> = β<sub>E</sub>/[1 + (1 − τ<sub>c</sub>)D/E], "
                         f"used both ways: β<sub>U</sub> = {_et(bU_h, 2, 4)} and β<sub>E</sub> = {_et(bE_h, 2, 4)}. "
                         f"Both firms keep their leverage constant, so the course weights carry no tax term.", f_ham)]
    if form == "dv":
        bE_dv = bU * (1 + dv)
        f_dv = rf + bE_dv * mrp
        kand.append((_vp(f_dv), f"D/V = {_et(dv, 2)} used where the formula needs D/E: β<sub>E</sub> = "
                                f"{_et(bU, 2, 4)} × (1 + {_et(dv, 2)}) = {_et(bE_dv, 2, 4)}.", f_dv))
    feller = _velg(r, kand)

    q = (f"<p>{eget} is unlisted. {tw} is listed and has the same business risk. {tw} has an equity beta of "
         f"{tall(bE_t, 2)} and keeps a debt-to-equity ratio of {tall(de_t, 2)}. {eget} will keep {lev}. Both firms "
         f"borrow at the risk-free rate, so their debt betas are 0. Both keep their leverage constant. The "
         f"risk-free rate is {_ep(rf)}, the market risk premium is {_ep(mrp)} and the corporate tax rate is "
         f"{_ep(tau)}.</p><p>What is {gen(eget)} cost of equity, in percent?</p>")

    alternativer = _alt(_vp(rE), rE, feller)
    de_tekst = (f"D/E = {_et(dv, 2)}/{_et(1 - dv, 2)} = {_et(de, 2)}" if form == "dv" else f"D/E = {_et(de, 2)}")

    kort = (f"<p><b>{_vp(rE)}.</b> β<sub>U</sub> = {tall(bE_t, 2)}/{_et(1 + de_t, 2)} = {_et(bU, 2, 7)}. "
            f"{de_tekst}, so β<sub>E</sub> = {_et(bU, 2, 7)} × {_et(1 + de, 2)} = {_et(bE, 2, 7)}. r<sub>E</sub> = "
            f"{_ep(rf)} + {_et(bE, 2, 7)} × {_ep(mrp)} = {_ep(rE)}.</p>")

    full = (
        f"<p><b>The idea.</b> {tw} has the same business risk as {eget}, so the two share an asset beta. Each "
        f"firm's equity beta is that asset beta scaled up by its own leverage. With risk-free debt the debt "
        f"carries no market risk, so all the business risk lands on the equity: β<sub>E</sub> = "
        f"β<sub>U</sub>(1 + D/E).</p>"
        f"<p><b>Step 1: unlever the twin.</b> β<sub>U</sub> = {tall(bE_t, 2)}/(1 + {tall(de_t, 2)}) = "
        f"{_et(bU, 2, 7)}.</p>"
        f"<p><b>Step 2: relever at your leverage.</b> {de_tekst}. β<sub>E</sub> = {_et(bU, 2, 7)} × "
        f"(1 + {_et(de, 2)}) = {_et(bE, 2, 7)}.</p>"
        f"<p><b>Step 3: the CAPM.</b> r<sub>E</sub> = {_ep(rf)} + {_et(bE, 2, 7)} × {_ep(mrp)} = "
        f"<b>{_ep(rE)}</b>.</p>"
        f"<p><b>Why no tax term.</b> The course weights without taxes because a firm with a target ratio "
        f"rebalances its debt, so the tax shield moves with the assets. The (1 − τ<sub>c</sub>) version is for a "
        f"fixed, permanent amount of debt.</p>"
        f"<p><b>First check.</b> r<sub>U</sub> = {_ep(rf)} + {_et(bU, 2, 7)} × {_ep(mrp)} = {_ep(rU)}. MM II "
        f"gives {_ep(rU)} + {_et(de, 2)} × ({_ep(rU)} − {_ep(rf)}) = {_ep(rE)} again. Both use the same "
        f"β<sub>U</sub>, so this catches arithmetic slips only.</p>"
        f"<p><b>Remember:</b> divide by (1 + D/E) with the twin's ratio, multiply by (1 + D/E) with yours.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-wac1 · Hele kjeden: tvilling → β_U → r_U → r_E → WACC etter skatt
# (H2024 E5 a–c)
# ---------------------------------------------------------------------------
@familie("tvi-wac1", tema="tvilling", antall=7, tittel="From a twin to your after-tax WACC",
         hjelp=hjelp3(
             "This is the full chain the valuation exercise opens with: the twin gives the business risk, your firm "
             "adds its own leverage. You need your firm's after-tax WACC.",
             "β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> for the twin. r<sub>U</sub> = r<sub>f</sub> + "
             "β<sub>U</sub> × premium. r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) with "
             "your D/E. r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) with your "
             "weights.",
             "<p><b>Step 1: unlever the twin</b> with the twin's weights and debt beta.</p>"
             "<p><b>Step 2: r<sub>U</sub></b> by the CAPM. Only β<sub>U</sub> and r<sub>U</sub> cross from the twin "
             "to your firm.</p>"
             "<p><b>Step 3: relever with MM II</b> at your own D/E and your own r<sub>D</sub>.</p>"
             "<p><b>Step 4: the after-tax WACC</b> with your own weights. The tax factor touches r<sub>D</sub> "
             "only.</p>"
             "<p><b>Watch out:</b> D/V converts to D/E before MM II. A quick check: r<sub>wacc</sub> = "
             "r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>.</p>",
         ))
def _(r):
    eget, tw = r.choice(PAR)
    de_t = r.choice([0.25, 0.60, 1.00])
    wD_t = de_t / (1 + de_t)
    wE_t = 1 - wD_t
    bE_t = r.choice([1.20, 1.25, 1.30, 1.35, 1.40, 1.50, 1.60])
    bD_t = r.choice([0.0, 0.0, 0.10, 0.15, 0.20])
    rf = r.choice([0.03, 0.035, 0.04, 0.045, 0.05])
    mrp = r.choice([0.05, 0.06])
    Rm = rf + mrp
    d = r.choice([0.20, 0.25, 0.30, 0.40])
    if abs(d - wD_t) < 1e-9:
        raise Avvis("samme D/V som tvillingen")
    rD = rf + r.choice([0.005, 0.01, 0.015, 0.02])
    tau = r.choice([0.22, 0.25, 0.40])

    bU = wE_t * bE_t + wD_t * bD_t
    rU = rf + bU * mrp
    de = d / (1 - d)
    rE = rU + de * (rU - rD)
    t1 = rU - d * rD                                       # (1 − d)·r_E, eksakt
    t2 = d * rD * (1 - tau)
    wacc = t1 + t2

    f_pre = rU
    f_tw = rU - wD_t * tau * rD
    rE_dv = rU + d * (rU - rD)
    f_dv = (1 - d) * rE_dv + d * rD * (1 - tau)
    f_all = rU * (1 - tau)
    kand = [("R", None, wacc),
            (_vp(f_pre), "The tax factor left out: (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> is the pre-tax WACC, "
                         "which under a target ratio is just r<sub>U</sub>. The interest deduction lowers the rate.",
             f_pre),
            (_vp(f_tw), f"The twin's leverage used for your firm: D/V = {_et(wD_t, 2, 4)} instead of your "
                        f"{_et(d, 2)}. Only β<sub>U</sub> and r<sub>U</sub> cross from the twin.", f_tw),
            (_vp(f_dv), f"D/V = {_et(d, 2)} used in MM II where D/E belongs: r<sub>E</sub> comes out at "
                        f"{_ep(rE_dv)}, too low.", f_dv),
            (_vp(f_all), f"The tax factor put on the whole WACC: {_ep(rU)} × (1 − {_ep(tau)}). Only interest is "
                         f"deductible, so (1 − τ<sub>c</sub>) touches r<sub>D</sub> alone.", f_all)]
    if bD_t > 0:
        rU0 = rf + wE_t * bE_t * mrp
        f_bd0 = rU0 - d * tau * rD
        kand.append((_vp(f_bd0), f"The twin's debt beta of {_et(bD_t, 2)} dropped: β<sub>U</sub> = "
                                 f"{_et(wE_t * bE_t, 2, 5)} understates the business risk and every rate built "
                                 f"on it.", f_bd0))
    feller = _velg(r, kand)

    gjeld_t = ("Its debt is risk-free." if bD_t == 0 else f"Its debt beta is {_et(bD_t, 2)}.")
    q = (f"<p>{eget} is unlisted. {tw} makes a very similar product and has the same business risk. {tw} keeps a "
         f"debt-to-equity ratio of {tall(de_t, 2)} and its equity beta is {tall(bE_t, 2)}. {gjeld_t} {eget} will "
         f"keep a constant debt-to-value ratio of {_et(d, 2)} and borrows at an expected return of {_ep(rD)}. The "
         f"risk-free rate is {_ep(rf)}, the expected return on the market portfolio is {_ep(Rm)} and the corporate "
         f"tax rate is {_ep(tau)}.</p><p>What is {gen(eget)} after-tax WACC, in percent?</p>")

    alternativer = _alt(_vp(wacc), wacc, feller)

    bu_tekst = (f"β<sub>U</sub> = {_et(wE_t, 2, 4)} × {tall(bE_t, 2)}"
                + (f" + {_et(wD_t, 2, 4)} × {_et(bD_t, 2)}" if bD_t > 0 else "") + f" = {_et(bU, 2, 7)}")
    kort = (f"<p><b>{_vp(wacc)}.</b> {bu_tekst}, r<sub>U</sub> = {_ep(rU)}. r<sub>E</sub> = {_ep(rU)} + "
            f"({_et(d, 2)}/{_et(1 - d, 2)}) × ({_ep(rU)} − {_ep(rD)}) = {_ep(rE)}. r<sub>wacc</sub> = "
            f"{_ep(rU)} − {_et(d, 2)} × {_ep(tau)} × {_ep(rD)} = {_ep(wacc)}.</p>")

    full = (
        f"<p><b>The chain.</b> {eget} has no market data, so you borrow the business risk from {tw}. Only the "
        f"asset beta and r<sub>U</sub> cross over. Everything after that uses {gen(eget)} own leverage and own "
        f"cost of debt.</p>"
        f"<p><b>Step 1: unlever the twin.</b> D/E = {tall(de_t, 2)} gives D/V = {_et(wD_t, 2, 4)} and E/V = "
        f"{_et(wE_t, 2, 4)}. {bu_tekst}.</p>"
        f"<p><b>Step 2: r<sub>U</sub>.</b> The premium is {_ep(Rm)} − {_ep(rf)} = {_ep(mrp)}. r<sub>U</sub> = "
        f"{_ep(rf)} + {_et(bU, 2, 7)} × {_ep(mrp)} = {_ep(rU)}.</p>"
        f"<p><b>Step 3: relever with MM II.</b> Your D/E = {_et(d, 2)}/{_et(1 - d, 2)}. r<sub>E</sub> = "
        f"{_ep(rU)} + ({_et(d, 2)}/{_et(1 - d, 2)}) × ({_ep(rU)} − {_ep(rD)}) = {_ep(rE)}.</p>"
        f"<p><b>Step 4: the after-tax WACC.</b> r<sub>wacc</sub> = {_et(1 - d, 2)} × {_ep(rE)} + {_et(d, 2)} × "
        f"{_ep(rD)} × (1 − {_ep(tau)}) = {_ep(t1)} + {_ep(t2)} = <b>{_ep(wacc)}</b>.</p>"
        f"<p><b>First check.</b> r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {_ep(rU)} − "
        f"{_et(d, 2)} × {_ep(tau)} × {_ep(rD)} = {_ep(wacc)}. This is the same formula rearranged, so it catches "
        f"arithmetic slips after r<sub>U</sub>, not a wrong unlevering. The gap to r<sub>U</sub> is the tax "
        f"saving on interest and nothing else.</p>"
        f"<p><b>Remember:</b> the twin gives β<sub>U</sub>, your firm gives D/E, r<sub>D</sub> and the "
        f"weights.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-net1 · Netto gjeld: bare overskuddskassen trekkes fra gjelden
# (forelesning 7 lysbilde 19, PS2 E7)
# ---------------------------------------------------------------------------
@familie("tvi-net1", tema="tvilling", antall=7, tittel="Net debt in the weights: only excess cash comes off",
         hjelp=hjelp3(
             "This is unlevering a twin that holds cash. Kurbatov weights with net debt. You need the unlevered "
             "cost of capital of the twin's operations.",
             "D<sub>net</sub> = D − (cash − cash the operations need). V = E + D<sub>net</sub>. β<sub>U</sub> = "
             "[E/V]β<sub>E</sub> + [D<sub>net</sub>/V]β<sub>D</sub>, with β<sub>D</sub> = 0 for risk-free debt. "
             "r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub> × premium.",
             "<p><b>Step 1: market value of equity.</b> Shares times price.</p>"
             "<p><b>Step 2: net debt.</b> Only the excess cash comes off the debt. Cash the operations need to run "
             "stays part of the business.</p>"
             "<p><b>Step 3: unlever on V = E + D<sub>net</sub></b> and put β<sub>U</sub> into the CAPM.</p>"
             "<p><b>Watch out:</b> gross debt overstates leverage. Netting all the cash, the operating cash too, "
             "goes too far the other way.</p>",
         ))
def _(r):
    tw = r.choice(NAVN)
    N, P = r.choice([(15, 80), (20, 60), (25, 48), (30, 40), (12, 100), (40, 35)])
    E = N * P
    D = r.choice([300, 400, 500, 600])
    C = r.choice([100, 150, 200, 250])
    Cop = r.choice([25, 40, 50])
    exc = C - Cop
    Dn = D - exc
    if Dn <= 0:
        raise Avvis("netto gjeld må være positiv")
    bE = r.choice([0.90, 1.00, 1.10, 1.15, 1.20, 1.25, 1.30])
    rf = r.choice([0.03, 0.035, 0.04, 0.045])
    mrp = r.choice([0.05, 0.055, 0.06])
    marked = r.random() < 0.5
    Rm = rf + mrp

    bU_x = E * bE / (E + Dn)
    bU = rund(bU_x, 4)
    rU = rf + bU * mrp
    rU_x = rf + bU_x * mrp

    b_gross = E * bE / (E + D)
    b_all = E * bE / (E + D - C)
    b_add = E * bE / (E + D + exc)
    kand = [("R", None, rU),
            (_vp(rf + b_gross * mrp), f"Gross debt of {D} in the weights: β<sub>U</sub> = ({tall(E)}/{tall(E + D)}) × "
                                      f"{tall(bE, 2)} = {tall(b_gross, 4)}. Excess cash is negative debt, so leverage "
                                      f"is overstated.", rf + b_gross * mrp),
            (_vp(rf + b_all * mrp), f"All {C} of cash netted, the {Cop} the operations need too: β<sub>U</sub> = "
                                    f"{tall(b_all, 4)}. Operating cash is part of the business.", rf + b_all * mrp),
            (_vp(rf + b_add * mrp), f"The excess cash added to the debt instead of subtracted: β<sub>U</sub> = "
                                    f"({tall(E)}/{tall(E + D + exc)}) × {tall(bE, 2)} = {tall(b_add, 4)}.",
             rf + b_add * mrp),
            (_vp(rf + bE * mrp), f"The equity beta of {tall(bE, 2)} used as the asset beta. That is the twin's "
                                 f"cost of equity, which still carries its leverage.", rf + bE * mrp)]
    feller = _velg(r, kand)

    q = (f"<p>{tw} is listed with {N} million shares trading at NOK {P}. Its debt has a market value of NOK {D} "
         f"million and is risk-free. It holds NOK {C} million of cash, of which NOK {Cop} million is needed to run "
         f"its operations. Its equity beta is {tall(bE, 2)}. "
         + (f"The risk-free rate is {_ep(rf)} and the expected market return is {_ep(Rm)}."
            if marked else f"The risk-free rate is {_ep(rf)} and the market risk premium is {_ep(mrp)}.")
         + f"</p><p>Using net debt, as the course does, what is the unlevered cost of capital of {gen(tw)} "
           f"operations, in percent?</p>")

    alternativer = _alt(_vp(rU, rU_x), rU, feller)
    prem = f"The premium is {_ep(Rm)} − {_ep(rf)} = {_ep(mrp)}. " if marked else ""

    kort = (f"<p><b>{_vp(rU, rU_x)}.</b> E = {tall(E)}. D<sub>net</sub> = {D} − ({C} − {Cop}) = {Dn}, V = {tall(E + Dn)}. "
            f"β<sub>U</sub> = ({tall(E)}/{tall(E + Dn)}) × {tall(bE, 2)} = {tall(bU, 4)}. r<sub>U</sub> = {_ep(rf)} + "
            f"{tall(bU, 4)} × {_ep(mrp)} = {_ep(rU)}.</p>")

    full = (
        f"<p><b>Why net debt.</b> Excess cash is a risk-free asset with a beta of 0. It drags the equity beta "
        f"down. It also cancels an equal amount of risk-free debt. So the business's leverage is the debt net of "
        f"the excess cash. Cash the operations need to run is part of the business, so it stays.</p>"
        f"<p><b>Step 1: equity at market value.</b> E = {N} × {P} = NOK {tall(E)} million.</p>"
        f"<p><b>Step 2: net debt.</b> Excess cash = {C} − {Cop} = {exc}. D<sub>net</sub> = {D} − {exc} = {Dn}, "
        f"so V = {tall(E)} + {Dn} = {tall(E + Dn)}.</p>"
        f"<p><b>Step 3: unlever.</b> The debt is risk-free, so β<sub>U</sub> = ({tall(E)}/{tall(E + Dn)}) × "
        f"{tall(bE, 2)} = {tall(bU, 4)}.</p>"
        f"<p><b>Step 4: the CAPM.</b> {prem}r<sub>U</sub> = {_ep(rf)} + {tall(bU, 4)} × {_ep(mrp)} = "
        f"<b>{_ep(rU)}</b>.</p>"
        f"<p><b>First check: the bounds.</b> Netting none of the cash gives β<sub>U</sub> = {tall(b_gross, 4)} and "
        f"netting all of it gives {tall(b_all, 4)}. The answer must lie between them. {tall(bU, 4)} does. "
        f"This check can fail: adding the cash to the debt lands below both bounds.</p>"
        f"<p><b>Remember:</b> net debt = debt minus excess cash, never minus the cash the operations need.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(verdi=rU_x * 100, skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-fler1 · Flere tvillinger: snitt av r_U, likt eller med 1/avstand
# (forelesning 8 lysbilde 12, tavle forelesning 7)
# ---------------------------------------------------------------------------
_PAR_LIN = [(1, 3), (2, 3), (1, 4), (2, 6), (3, 2), (4, 1)]      # 1/avstand gir eksakte vekter
_PAR_KV = [(1, 2), (1, 3), (2, 6), (3, 1), (2, 1)]               # 1/avstand² gir eksakte vekter


@familie("tvi-fler1", tema="tvilling", antall=7, tittel="Several twins: averaging the unlevered cost of capital",
         hjelp=hjelp3(
             "This is the twin-firm routine with more than one comparable. You turn each twin into an unlevered "
             "cost of capital and average them with the weights the question gives.",
             "r<sub>U,i</sub> = (E/V)<sub>i</sub>r<sub>E,i</sub> + (D/V)<sub>i</sub>r<sub>D,i</sub> for each twin. "
             "r<sub>U</sub> = Σ w<sub>i</sub>r<sub>U,i</sub>. Weighting by closeness: w<sub>i</sub> = "
             "(1/dist<sub>i</sub>)/Σ(1/dist<sub>j</sub>), or with squared distances.",
             "<p><b>Step 1: each twin's r<sub>U</sub>.</b> Convert D/E to D/V first. No tax term.</p>"
             "<p><b>Step 2: the weights.</b> Take one over the distance (or over its square), then divide by the "
             "sum so the weights add up to one. Equal weights when no distance is given.</p>"
             "<p><b>Step 3: the weighted average.</b></p>"
             "<p><b>Watch out:</b> average r<sub>U</sub>, never r<sub>E</sub>, since each r<sub>E</sub> carries "
             "its own twin's leverage. The closer twin gets the larger weight.</p>",
         ))
def _(r):
    a, b = r.sample(NAVN, 2)
    regel = r.choice(["lik", "lin", "kv"])
    tau = r.choice([0.22, 0.25])

    def tvilling():
        rE = r.choice([0.095, 0.10, 0.105, 0.11, 0.115, 0.12, 0.125, 0.13, 0.14])
        rD = r.choice([0.04, 0.045, 0.05, 0.055, 0.06])
        if r.random() < 0.5:
            de = r.choice([0.25, 0.60, 1.00])
            return dict(rE=rE, rD=rD, de=de, wD=de / (1 + de),
                        lev=f"a debt-to-equity ratio of {tall(de, 2)}")
        dv = r.choice([0.20, 0.25, 0.30, 0.40, 0.50])
        return dict(rE=rE, rD=rD, de=None, wD=dv, lev=f"a debt-to-value ratio of {_et(dv, 2)}")
    A, B = tvilling(), tvilling()
    for T in (A, B):
        T["rU"] = (1 - T["wD"]) * T["rE"] + T["wD"] * T["rD"]
    if nær(A["rU"], B["rU"], 0.03):
        raise Avvis("tvillingene ligger for tett")

    if regel == "lik":
        dA = dB = None
        wA = 0.5
    else:
        dA, dB = r.choice(_PAR_LIN if regel == "lin" else _PAR_KV)
        p = 1 if regel == "lin" else 2
        iA, iB = 1 / dA ** p, 1 / dB ** p
        wA = iA / (iA + iB)
    wB = 1 - wA
    rU = wA * A["rU"] + wB * B["rU"]

    kand = [("R", None, rU)]
    f_re = wA * A["rE"] + wB * B["rE"]
    kand.append((_vp(f_re), "The twins' costs of equity averaged instead of their r<sub>U</sub>. Each r<sub>E</sub> "
                            "carries its own twin's leverage.", f_re))
    rUa_t = (1 - A["wD"]) * A["rE"] + A["wD"] * A["rD"] * (1 - tau)
    rUb_t = (1 - B["wD"]) * B["rE"] + B["wD"] * B["rD"] * (1 - tau)
    f_tax = wA * rUa_t + wB * rUb_t
    kand.append((_vp(f_tax), f"Each twin's debt taken after tax, r<sub>D</sub>(1 − {_ep(tau)}). That builds an "
                             f"after-tax WACC, not r<sub>U</sub>.", f_tax))
    if regel != "lik":
        f_eq = 0.5 * (A["rU"] + B["rU"])
        kand.append((_vp(f_eq), "Equal weights, although the two twins lie at different distances from your "
                                "firm. The closer twin deserves more weight.", f_eq))
        if regel == "lin":
            wA_d = dA / (dA + dB)
        else:
            wA_d = dA ** 2 / (dA ** 2 + dB ** 2)
        f_d = wA_d * A["rU"] + (1 - wA_d) * B["rU"]
        kand.append((_vp(f_d), ("Weighted by the distance instead of one over the distance" if regel == "lin" else
                                "Weighted by the squared distance instead of one over the squared distance")
                     + ", which favours the twin that is furthest away.", f_d))
    if regel == "kv":
        iA, iB = 1 / dA, 1 / dB
        wA_l = iA / (iA + iB)
        f_l = wA_l * A["rU"] + (1 - wA_l) * B["rU"]
        kand.append((_vp(f_l), "Weighted by one over the distance, not one over the squared distance the "
                               "question asks for.", f_l))
    de_tw = [(T, navn) for T, navn in ((A, a), (B, b)) if T["de"] is not None]
    if de_tw and all(T["de"] < 1 for T, _ in de_tw):
        def ru_de(T):
            return ((1 - T["de"]) * T["rE"] + T["de"] * T["rD"]) if T["de"] is not None else T["rU"]
        f_de = wA * ru_de(A) + wB * ru_de(B)
        hvem = (f"{gen(de_tw[0][1])} D/E of {tall(de_tw[0][0]['de'], 2)} used as its debt weight" if len(de_tw) == 1
                else "Both twins' D/E used as their debt weights")
        kand.append((_vp(f_de), f"{hvem}. Convert first: D/V = (D/E)/(1 + D/E).", f_de))
    feller = _velg(r, kand)

    if regel == "lik":
        vekt_q = "You give the two twins equal weight."
    elif regel == "lin":
        vekt_q = (f"Measured on size and Tobin's Q, {a} lies at distance {dA} from your firm and {b} at distance "
                  f"{dB}. You weight each twin by one over its distance.")
    else:
        vekt_q = (f"Measured on size and Tobin's Q, {a} lies at distance {dA} from your firm and {b} at distance "
                  f"{dB}. You weight each twin by one over its squared distance.")
    q = (f"<p>You estimate the unlevered cost of capital of an unlisted firm from two listed twins with the same "
         f"business risk. Both keep their leverage constant. {a} has a cost of equity of {_ep(A['rE'])}, an "
         f"expected return on its debt of {_ep(A['rD'])} and {A['lev']}. {b} has a cost of equity of "
         f"{_ep(B['rE'])}, an expected return on its debt of {_ep(B['rD'])} and {B['lev']}. {vekt_q} The "
         f"corporate tax rate is {_ep(tau)}.</p><p>What unlevered cost of capital do you use, in percent?</p>")

    alternativer = _alt(_vp(rU), rU, feller)

    def ru_tekst(T, navn):
        konv = (f"D/V = {tall(T['de'], 2)}/{_et(1 + T['de'], 2)} = {_et(T['wD'], 2, 4)}. " if T["de"] is not None else "")
        return (f"{konv}r<sub>U</sub> = {_et(1 - T['wD'], 2, 4)} × {_ep(T['rE'])} + {_et(T['wD'], 2, 4)} × "
                f"{_ep(T['rD'])} = {_ep((1 - T['wD']) * T['rE'])} + {_ep(T['wD'] * T['rD'])} = {_ep(T['rU'])}")
    if regel == "lik":
        vekt_t = "Equal weights: 0.5 each."
    elif regel == "lin":
        vekt_t = (f"1/{dA} and 1/{dB}, divided by their sum: w = {_et(wA, 1, 4)} for {a} and {_et(wB, 1, 4)} for "
                  f"{b}.")
    else:
        vekt_t = (f"1/{dA}² and 1/{dB}², divided by their sum: w = {_et(wA, 1, 4)} for {a} and {_et(wB, 1, 4)} "
                  f"for {b}.")

    kort = (f"<p><b>{_vp(rU)}.</b> r<sub>U</sub> is {_ep(A['rU'])} for {a} and {_ep(B['rU'])} for {b}. "
            f"{_et(wA, 1, 4)} × {_ep(A['rU'])} + {_et(wB, 1, 4)} × {_ep(B['rU'])} = {_ep(rU)}.</p>")

    full = (
        f"<p><b>Why several twins.</b> One comparable gives a noisy estimate of the business risk. Kurbatov turns "
        f"each twin into r<sub>U</sub> with its own weights and averages them. Lecture 8 takes a simple average. On "
        f"the board in lecture 7 he weights each twin by one over its distance to your firm, or one over the squared "
        f"distance. Average r<sub>U</sub> or β<sub>U</sub>, never r<sub>E</sub>: each twin's r<sub>E</sub> still "
        f"carries its own leverage.</p>"
        f"<p><b>Step 1: {gen(a)} r<sub>U</sub>.</b> {ru_tekst(A, a)}.</p>"
        f"<p><b>Step 2: {gen(b)} r<sub>U</sub>.</b> {ru_tekst(B, b)}.</p>"
        f"<p><b>Step 3: the weights.</b> {vekt_t}</p>"
        f"<p><b>Step 4: the average.</b> {_et(wA, 1, 4)} × {_ep(A['rU'])} + {_et(wB, 1, 4)} × {_ep(B['rU'])} = "
        f"{_ep(wA * A['rU'])} + {_ep(wB * B['rU'])} = <b>{_ep(rU)}</b>. The tax rate plays no part.</p>"
        f"<p><b>First check.</b> The average must lie between the two twins' r<sub>U</sub> and nearer the one with "
        f"the larger weight. It does. The check fails on reversed weights, but not on a wrong r<sub>U</sub> for one "
        f"twin.</p>"
        f"<p><b>Remember:</b> one r<sub>U</sub> per twin, then a weighted average with weights that sum to one.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# tvi-dbt1 · Gjeldsbeta fra forventet avkastning på gjelden (H2025 E4 a)
# ---------------------------------------------------------------------------
@familie("tvi-dbt1", tema="tvilling", antall=6, tittel="The debt beta from the expected return on debt",
         hjelp=hjelp3(
             "This is the CAPM run backwards on a firm's debt. You need the debt beta, the number you weight into "
             "the asset beta.",
             "β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>mkt</sub>] − r<sub>f</sub>), where "
             "r<sub>D</sub> is the expected return on the debt. The promised yield is higher than r<sub>D</sub>: "
             "the gap is the expected loss from default.",
             "<p><b>Step 1: the premium.</b> Subtract r<sub>f</sub> from the expected market return.</p>"
             "<p><b>Step 2: the debt's excess return.</b> Subtract r<sub>f</sub> from the expected return on the "
             "debt, not from the promised yield.</p>"
             "<p><b>Step 3: divide</b> the debt's excess return by the premium.</p>"
             "<p><b>Watch out:</b> a yield includes compensation for expected default losses, which is not "
             "systematic risk. Use it and β<sub>D</sub> comes out too high.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    mrp = r.choice([0.04, 0.05, 0.06, 0.07])
    Rm = rf + mrp
    spread_e = r.choice([0.005, 0.008, 0.01, 0.012, 0.015, 0.02, 0.025, 0.03, 0.04])
    rD = rf + spread_e
    y = rD + r.choice([0.01, 0.015, 0.02, 0.025])
    bE = r.choice([1.30, 1.50, 1.80, 2.00, 2.40])
    bD = spread_e / mrp
    if bD > 0.6:
        raise Avvis("urealistisk høy gjeldsbeta")

    f_y = (y - rf) / mrp
    f_rm = spread_e / Rm
    f_norf = rD / mrp
    kand = [("R", None, bD),
            (_vt(f_y), f"The promised yield of {_ep(y)} used instead of the expected return. The yield includes "
                       f"the expected loss from default, which is not market risk.", f_y),
            (_vt(f_rm), f"Divided by the market return of {_ep(Rm)} instead of the premium "
                        f"E[R<sub>mkt</sub>] − r<sub>f</sub>.", f_rm),
            (_vt(f_norf), f"r<sub>f</sub> not subtracted from the debt's return: {_ep(rD)}/{_ep(mrp)}. Beta prices "
                          f"the excess return over r<sub>f</sub>.", f_norf)]
    feller = _velg(r, kand)

    q = (f"<p>{navn} has bonds outstanding with a promised yield to maturity of {_ep(y)}. Because the bonds may "
         f"default, investors expect a return of only {_ep(rD)} on them. The firm's equity beta is {tall(bE, 2)}. "
         f"The risk-free rate is {_ep(rf)} and the expected return on the market portfolio is {_ep(Rm)}.</p>"
         f"<p>What is the debt beta of {navn}? Give four decimals.</p>")

    alternativer = [R(tall(bD, 4), bD)] + [F(tall(v, 4), f, v) for t, f, v in feller]

    kort = (f"<p><b>{tall(bD, 4)}.</b> β<sub>D</sub> = ({_ep(rD)} − {_ep(rf)})/({_ep(Rm)} − {_ep(rf)}) = "
            f"{_ep(spread_e)}/{_ep(mrp)} = {tall(bD, 4)}.</p>")

    full = (
        f"<p><b>Why debt has a beta.</b> Debt is risk-free only if it is repaid in every state. Firms default more "
        f"often in bad times, so risky debt loses value when the market falls. That systematic part is priced, so "
        f"the expected return on the debt sits above r<sub>f</sub> and the CAPM gives a positive beta.</p>"
        f"<p><b>Step 1: the premium.</b> {_ep(Rm)} − {_ep(rf)} = {_ep(mrp)}.</p>"
        f"<p><b>Step 2: the debt's excess return.</b> {_ep(rD)} − {_ep(rf)} = {_ep(spread_e)}. Use the expected "
        f"return. The yield of {_ep(y)} is what investors are promised. The gap of {_ep(y - rD)} is the "
        f"expected loss from default.</p>"
        f"<p><b>Step 3: divide.</b> β<sub>D</sub> = {_ep(spread_e)}/{_ep(mrp)} = <b>{tall(bD, 4)}</b>. The equity "
        f"beta of {tall(bE, 2)} plays no part here.</p>"
        f"<p><b>First check.</b> Forwards: {_ep(rf)} + {tall(bD, 4)} × {_ep(mrp)} = {_ep(rf + rund(bD, 4) * mrp)}, "
        f"the expected return you started from, up to rounding. It is the same equation, so it catches slips "
        f"only. The bound is a better test: β<sub>D</sub> is positive and well below β<sub>E</sub>.</p>"
        f"<p><b>Remember:</b> β<sub>D</sub> from the expected return on the debt, divided by the premium. Setting "
        f"it to 0 for risky debt understates β<sub>U</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar())


# ===========================================================================
# Statiske spørsmål: mekanismen bak tallene og de vanlige feilene
# ===========================================================================

statisk(
    "tvi-s01", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about the debt beta in the unlevering step and the direction of the error when it is left out.",
        "β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>. β<sub>D</sub> = (r<sub>D</sub> − "
        "r<sub>f</sub>)/premium. A lower discount rate gives a higher value.",
        "<p><b>Step 1:</b> ask what happens to β<sub>U</sub> when a positive term disappears.</p>"
        "<p><b>Step 2:</b> follow the change through r<sub>U</sub> and the WACC.</p>"
        "<p><b>Step 3:</b> a discount rate that is too low makes the value too high or too low?</p>",
    ),
    q="<p>You unlever a listed twin whose bonds are expected to return well above the risk-free rate, but you "
      "treat its debt as risk-free. You then relever correctly with your own firm's debt beta. In which direction "
      "are your β<sub>U</sub>, your WACC and your firm value wrong?</p>",
    alternativer=[
        R("β<sub>U</sub> and the WACC too low, the firm value too high"),
        F("β<sub>U</sub> and the WACC too high, the firm value too low",
          "Dropping the term (D/V)β<sub>D</sub> removes something positive from the average, so β<sub>U</sub> "
          "falls, it does not rise."),
        F("β<sub>U</sub> too low, but the WACC and the value are right because you relever with your own debt beta",
          "Relevering starts from the understated β<sub>U</sub>, so every rate built on it is too low."),
        F("None of them, because the twin's debt beta cancels out when you relever",
          "It cancels only if your leverage and debt beta match the twin's. In general the understated "
          "β<sub>U</sub> carries through."),
    ],
    kort="<p><b>Too low rates, too high value.</b> Dropping the positive term (D/V)β<sub>D</sub> understates "
         "β<sub>U</sub>, r<sub>U</sub> and the WACC. A discount rate that is too low overvalues the firm.</p>",
    full="<p><b>The mechanism.</b> A firm is a portfolio of its equity and its debt. The asset beta is their "
         "value-weighted average, β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>. When the debt pays more "
         "than r<sub>f</sub>, part of its default risk is systematic and β<sub>D</sub> is positive.</p>"
         "<p><b>Step 1: the asset beta.</b> Setting β<sub>D</sub> = 0 deletes a positive term. β<sub>U</sub> comes "
         "out too low: the business looks safer than it is.</p>"
         "<p><b>Step 2: the rates.</b> r<sub>U</sub> = r<sub>f</sub> + β<sub>U</sub> × premium is too low. So is "
         "every rate built on it: your relevered r<sub>E</sub> and the WACC.</p>"
         "<p><b>Step 3: the value.</b> Discounting the same cash flows at a lower rate gives a higher value. The firm "
         "is overvalued.</p>"
         "<p><b>A check that catches it.</b> Compute the twin's r<sub>U</sub> a second way, from its returns: "
         "(E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>. With β<sub>D</sub> = 0 the beta route lands below this one.</p>"
         "<p><b>Remember:</b> risky debt has a positive beta. Leaving it out overvalues the firm.</p>",
)

statisk(
    "tvi-s02", tema="tvilling", type="tolkning",
    hjelp=hjelp3(
        "This is about which firm's numbers go into which step of the twin-firm routine.",
        "Unlever: β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>. Relever: β<sub>E</sub> = β<sub>U</sub> + "
        "(D/E)(β<sub>U</sub> − β<sub>D</sub>). Only the asset beta is shared between the firms.",
        "<p><b>Step 1:</b> the twin's equity beta reflects the twin's own financing. Which weights strip that "
        "out?</p>"
        "<p><b>Step 2:</b> your shareholders carry your firm's financing. Which leverage and debt beta put it "
        "back?</p>"
        "<p><b>Watch out:</b> relevering with the twin's own ratio gives back the twin's equity beta, which tells you nothing new about your firm.</p>",
    ),
    q="<p>You unlever a listed twin and relever for your own firm. Your firm has more debt than the twin and "
      "borrows at a higher rate. Which numbers belong in each step?</p>",
    alternativer=[
        R("Twin's weights and debt beta to unlever, your own D/E and debt beta to relever"),
        F("Unlever and relever with the twin's weights, since the twin has the market data",
          "Relevering with the twin's D/E gives back the twin's equity beta. Your shareholders carry your leverage, "
          "not the twin's."),
        F("Unlever with your own weights, then relever with the twin's to match the market",
          "This runs the routine backwards. The twin's equity beta contains the twin's leverage, so the twin's "
          "weights must strip it out."),
        F("Unlever with the twin's weights, relever with your own D/E but the twin's debt beta",
          "Your firm borrows at a higher rate, so its debt carries more systematic risk. Use your own debt beta "
          "when you relever."),
    ],
    kort="<p><b>Twin's numbers to unlever, yours to relever.</b> Only β<sub>U</sub> crosses between the firms. "
         "Everything about financing comes from the firm it describes.</p>",
    full="<p><b>What is shared and what is not.</b> Two firms in the same business share the risk of their "
         "assets, β<sub>U</sub>. They do not share their financing. The twin's equity beta mixes the business risk "
         "with the twin's leverage. Your equity beta must mix it with yours.</p>"
         "<p><b>Step 1: unlever with the twin's numbers.</b> β<sub>U</sub> = (E/V)β<sub>E</sub> + "
         "(D/V)β<sub>D</sub>, all at the twin's market values and with the twin's debt beta. This removes exactly "
         "the leverage that is in the twin's equity beta.</p>"
         "<p><b>Step 2: relever with your numbers.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − "
         "β<sub>D</sub>) with your D/E and your β<sub>D</sub>. A firm that borrows at a higher rate has a higher "
         "β<sub>D</sub>, so the lenders carry more of the business risk.</p>"
         "<p><b>Step 3: your WACC</b> uses your weights and your r<sub>D</sub> as well.</p>"
         "<p><b>Remember:</b> the twin lends you β<sub>U</sub> and nothing else.</p>",
)

statisk(
    "tvi-s03", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about what makes a listed firm usable as a twin for the cost of capital.",
        "β<sub>U</sub> measures the systematic risk of the assets. The twin-firm routine assumes the two firms "
        "share β<sub>U</sub> and lets their financing differ.",
        "<p><b>Step 1:</b> ask what the routine removes (financing) and what it keeps (business risk).</p>"
        "<p><b>Step 2:</b> whatever is removed may differ between the firms. What is kept must be the same.</p>"
        "<p><b>Watch out:</b> features that the routine adjusts for, or that investors diversify away, do not need to match.</p>",
    ),
    q="<p>You need a cost of capital for an unlisted firm and look for a listed twin. Which requirement matters "
      "for the twin-firm routine?</p>",
    alternativer=[
        R("Its assets must carry the same systematic risk as yours, whatever its leverage"),
        F("It must have the same debt-to-equity ratio as your firm, or the betas cannot be compared",
          "The routine exists to handle different leverage: you unlever the twin and relever at yours."),
        F("It must have the same total volatility of returns as your firm",
          "Only systematic risk is priced. Two firms can differ in firm-specific risk and still share a beta."),
        F("It must be about the same size as your firm, measured by the book value of its equity",
          "Size can help pick between twins, but book equity says nothing about business risk. The routine needs "
          "the same asset risk."),
    ],
    kort="<p><b>The same business risk.</b> The routine strips leverage out and puts yours back, so leverage may "
         "differ. What must match is the systematic risk of the assets.</p>",
    full="<p><b>What the twin lends you.</b> The twin-firm routine takes one number from the twin: the asset beta "
         "β<sub>U</sub>, the market risk of the business with the financing stripped out. Everything else comes "
         "from your own firm.</p>"
         "<p><b>Why leverage may differ.</b> Unlevering removes the twin's leverage and relevering adds yours. "
         "That is the whole point of the routine, so a twin with a different D/E is fine.</p>"
         "<p><b>Why total volatility does not matter.</b> Firm-specific risk disappears in a diversified "
         "portfolio, so investors are not paid to bear it. Only the co-movement with the market, measured by beta, "
         "enters the cost of capital.</p>"
         "<p><b>What does matter.</b> The twin's assets must react to the market as yours do: the same product, the "
         "same customers, the same cyclicality. With several candidates, Kurbatov weights the closer ones more "
         "(lecture 8), but each must be a fair proxy for your business.</p>"
         "<p><b>Remember:</b> a twin shares your business risk, not your financing.</p>",
)

statisk(
    "tvi-s04", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about net debt: which cash Kurbatov subtracts from the debt before weighting.",
        "D<sub>net</sub> = D − excess cash. Excess cash = cash − cash the operations need. Cash has a beta of 0.",
        "<p><b>Step 1:</b> sort the cash into what the business needs and what it does not.</p>"
        "<p><b>Step 2:</b> only cash outside the business works as negative debt.</p>"
        "<p><b>Step 3:</b> subtract only the excess cash from the debt. <b>Watch out:</b> cash that keeps the business running stays inside the business.</p>",
    ),
    q="<p>A twin firm has debt of 500 and holds 180 of cash. Its operations need 30 of that cash to run. Using "
      "the course's net-debt rule, which debt figure goes into the weights?</p>",
    alternativer=[
        R("350, the debt minus the 150 of cash the operations do not need", 350),
        F("320, the debt minus all the cash, since all cash is risk-free",
          "The 30 the operations need is part of the business. Only the excess cash is negative debt.", 320),
        F("500, the gross debt, since cash belongs on the asset side",
          "Kurbatov weights with net debt. Excess cash cancels risk-free debt, so leaving it in overstates "
          "leverage.", 500),
        F("470, the debt minus the 30 the operations need",
          "This subtracts the wrong part of the cash. The operating cash stays, the excess comes off.", 470),
    ],
    kort="<p><b>350.</b> Excess cash = 180 − 30 = 150. D<sub>net</sub> = 500 − 150 = 350.</p>",
    full="<p><b>Why net debt.</b> Excess cash is a risk-free asset with a beta of 0. Holding it is the same as "
         "having repaid an equal amount of risk-free debt, so it works as negative debt. Kurbatov weights with "
         "net debt (lecture 7: 320 − 20 = 300).</p>"
         "<p><b>Which cash.</b> PS2 Exercise 7 makes the rule explicit: only the cash the operations do not need "
         "comes off. Cash that keeps the business running is part of the business and shares its risk.</p>"
         "<p><b>Step 1: excess cash.</b> 180 − 30 = 150.</p>"
         "<p><b>Step 2: net debt.</b> 500 − 150 = 350.</p>"
         "<p><b>The direction of the errors.</b> Gross debt (500) overstates leverage and understates "
         "β<sub>U</sub>. Netting all the cash (320) understates leverage and overstates β<sub>U</sub>.</p>"
         "<p><b>Remember:</b> net debt = debt minus excess cash.</p>",
    tall=tallsvar(verdi=350),
)

statisk(
    "tvi-s05", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about combining several twins into one estimate of the business risk.",
        "Each twin gives r<sub>U,i</sub> with its own weights. r<sub>U</sub> = Σ w<sub>i</sub>r<sub>U,i</sub>, "
        "with w<sub>i</sub> proportional to one over the distance to your firm.",
        "<p><b>Step 1:</b> which rate is free of each twin's financing?</p>"
        "<p><b>Step 2:</b> which twin should count more?</p>"
        "<p><b>Step 3:</b> turn the distances into weights that sum to one. <b>Watch out:</b> averaging the twins' costs of equity mixes their different leverage levels.</p>",
    ),
    q="<p>You have three listed twins with different leverage. One of them is much closer to your firm in size "
      "and Tobin's Q than the other two. How do you combine them?</p>",
    alternativer=[
        R("Unlever each twin with its own weights, then average the r<sub>U</sub> values with more weight on the "
          "closest twin"),
        F("Average the three costs of equity with equal weights, then unlever once with the average leverage",
          "Each r<sub>E</sub> carries its own twin's leverage. Unlever each twin first, then average."),
        F("Average the three r<sub>U</sub> values with more weight on the twin that is furthest away",
          "The weights run the other way: the closer a twin is to your firm, the more it says about your "
          "business."),
        F("Use the closest twin alone, since averaging mixes firms with different leverage",
          "Averaging r<sub>U</sub> is safe because leverage is gone. Using one twin throws away information."),
    ],
    kort="<p><b>Unlever each, then a weighted average of r<sub>U</sub>.</b> Closer twins get more weight, for "
         "example in proportion to one over their distance.</p>",
    full="<p><b>Why average.</b> One comparable gives a noisy estimate of the business risk. Several twins give "
         "a better one, as long as you average something they share.</p>"
         "<p><b>What to average.</b> The twins share business risk, not financing. So each twin is unlevered with "
         "its own market-value weights first, giving r<sub>U,i</sub> or β<sub>U,i</sub>. An average of the costs of "
         "equity would mix three different leverage levels.</p>"
         "<p><b>How to weight.</b> Lecture 8 takes a simple average of the twins. On the board in lecture 7 Kurbatov "
         "measures how close each twin is to your firm, for example on size and Tobin's Q. He then weights by one "
         "over the distance or by one over the squared distance, which tilts even more toward the closest twin. The "
         "weights are divided by their sum so they add up to one.</p>"
         "<p><b>Remember:</b> unlever each twin, then average r<sub>U</sub> with more weight on the closer twins.</p>",
)

statisk(
    "tvi-s06", tema="tvilling", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what consistency check 2 can and cannot catch after you relever.",
        "Check 2: (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = β<sub>U</sub>. Relevering is the same equation solved "
        "for β<sub>E</sub>.",
        "<p><b>Step 1:</b> if β<sub>E</sub> was built from β<sub>U</sub>, can re-weighting it ever miss "
        "β<sub>U</sub>?</p>"
        "<p><b>Step 2:</b> which errors happen before relevering and pass through untouched?</p>"
        "<p><b>Watch out:</b> a check is only worth something if a wrong answer could make it fail. Say so when it cannot.</p>",
    ),
    q="<p>You relevered β<sub>U</sub> to your own D/E and found β<sub>E</sub>. Weighting your own β<sub>E</sub> "
      "and β<sub>D</sub> by your own E/V and D/V gives β<sub>U</sub> back exactly.</p>"
      "<p>I. This shows that β<sub>U</sub> was estimated correctly from the twin.</p>"
      "<p>II. This shows only that the relevering arithmetic is consistent.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Re-weighting returns whatever β<sub>U</sub> you started from, right or wrong. It cannot test "
                    "the twin step."),
        R("Only II"),
        F("Both I and II", "Statement I is false: a wrong β<sub>U</sub> passes this check just as well."),
        F("Neither I nor II", "Statement II is true: the check does catch a slip in the relevering arithmetic."),
    ],
    kort="<p><b>Only II.</b> Relevering is the weighting identity solved for β<sub>E</sub>, so re-weighting returns "
         "the β<sub>U</sub> you started from, even a wrong one.</p>",
    full="<p><b>What check 2 is.</b> The course's consistency check 2 says the weighted betas of the claims equal "
         "the asset beta: (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = β<sub>U</sub>.</p>"
         "<p><b>Why it cannot fail here.</b> The relevering formula β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> "
         "− β<sub>D</sub>) is that same equation solved for β<sub>E</sub>. Put the result back in and you get "
         "β<sub>U</sub> by construction. So the check catches a slip in the relevering, such as D/V used for D/E, "
         "but it is an identity with respect to β<sub>U</sub>.</p>"
         "<p><b>What it misses.</b> A wrong β<sub>U</sub> from the twin step: the twin's book values, a dropped "
         "debt beta or the wrong weights. Those pass straight through.</p>"
         "<p><b>A check that can fail.</b> Compute the twin's r<sub>U</sub> twice, once from its betas and once from "
         "its returns. A β<sub>D</sub> that contradicts the twin's r<sub>D</sub> shows up there.</p>"
         "<p><b>Remember:</b> say when a check is an identity. It catches arithmetic, not assumptions.</p>",
)

statisk(
    "tvi-s07", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about how a large pile of excess cash changes the relation between the equity beta and the "
        "beta of the operations.",
        "E × β<sub>E</sub> = (value of operations) × β<sub>ops</sub> + cash × 0 for a firm without debt.",
        "<p><b>Step 1:</b> the equity owns the operations and the cash.</p>"
        "<p><b>Step 2:</b> mixing in an asset with a beta of 0 pulls the average up or down?</p>"
        "<p><b>Watch out:</b> cash works as negative debt. The usual ranking of the equity beta above the asset beta can turn around.</p>",
    ),
    q="<p>A firm has no debt, but a third of its market value is excess cash. How does its equity beta compare "
      "with the beta of its operations?</p>",
    alternativer=[
        R("The equity beta is below the beta of the operations, because the cash has a beta of 0"),
        F("The equity beta equals the beta of the operations, because the firm has no debt",
          "With no debt there is no leverage, but the cash still sits inside the equity and dilutes its beta."),
        F("The equity beta is above the beta of the operations, because equity is always riskier than assets",
          "That holds with net debt. With net cash it runs the other way: the asset beta lies above the equity "
          "beta."),
        F("It cannot be said without knowing the firm's debt beta",
          "The firm has no debt, so there is no debt beta. The cash alone settles the direction."),
    ],
    kort="<p><b>Below.</b> The equity is a portfolio of operations and cash. Cash has a beta of 0, so it pulls "
         "the equity beta below the beta of the operations.</p>",
    full="<p><b>The mechanism.</b> A shareholder in this firm owns two things: the operating business and a pile "
         "of cash. Betas add with value weights, so β<sub>E</sub> = (operations/E) × β<sub>ops</sub> + (cash/E) × "
         "0.</p>"
         "<p><b>In numbers.</b> Equity of 300 with 100 of cash and β<sub>E</sub> = 0.80 gives β<sub>ops</sub> = "
         "0.80 × 300/200 = 1.20. The business is riskier than the shares suggest.</p>"
         "<p><b>Cash is negative debt.</b> This is the net-debt rule seen from the other side. Debt pushes "
         "β<sub>E</sub> above β<sub>U</sub>. Net cash pushes it below. So the claim that β<sub>U</sub> is always "
         "below β<sub>E</sub> is false.</p>"
         "<p><b>In a valuation.</b> Discount the operations at the rate for β<sub>ops</sub> and add the cash at face "
         "value at the end.</p>"
         "<p><b>Remember:</b> strip excess cash out before you read a twin's beta as business risk.</p>",
)

statisk(
    "tvi-s08", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about which values go into the weights E/V and D/V.",
        "E = share price × number of shares. D = the market value of the debt, net of excess cash. V = E + D.",
        "<p><b>Step 1:</b> the weights measure what investors hold today.</p>"
        "<p><b>Step 2:</b> which numbers in the question are prices and which are accounting entries?</p>"
        "<p><b>Step 3:</b> divide the debt by the sum of the two market values. <b>Watch out:</b> debt over equity is D/E, a different ratio.</p>",
    ),
    q="<p>A twin has 30 million shares trading at NOK 50, debt with a market value of NOK 500 million and book "
      "equity of NOK 400 million. Which D/V do you use when you unlever its beta?</p>",
    alternativer=[
        R("0.2500, from E = 1 500 at market value and V = 2 000", 0.25),
        F("0.5556, from book equity: 500/(400 + 500)",
          "Book equity is an accounting figure. Betas are measured on market prices, so the weights must be "
          "too.", 500 / 900),
        F("0.3333, the debt divided by the market value of the equity",
          "Debt over equity is D/E, the ratio MM II needs. The weight is D/V = D/(E + D).", 1 / 3),
        F("1.2500, the debt divided by book equity",
          "This mixes a market value with a book value and gives D/E, not D/V.", 1.25),
    ],
    kort="<p><b>0.2500.</b> E = 30 × 50 = 1 500, V = 1 500 + 500 = 2 000, D/V = 500/2 000.</p>",
    full="<p><b>Why market values.</b> A beta is estimated from market returns, so it describes the risk of the "
         "securities at their market prices. The weights that combine the betas must be the same market values. "
         "Book equity records what shareholders once put in plus retained earnings and says nothing about what "
         "the shares are worth today.</p>"
         "<p><b>Step 1: equity.</b> 30 million × NOK 50 = NOK 1 500 million.</p>"
         "<p><b>Step 2: firm value.</b> 1 500 + 500 = 2 000.</p>"
         "<p><b>Step 3: the weight.</b> D/V = 500/2 000 = 0.2500 and E/V = 0.7500.</p>"
         "<p><b>Two common slips.</b> 500/1 500 = 0.3333 is D/E, the ratio MM II needs, not a weight. Using book "
         "equity gives 0.5556 and overstates leverage.</p>"
         "<p><b>Remember:</b> every weight is a market value: price times shares for equity.</p>",
    tall=tallsvar(verdi=0.25),
)

statisk(
    "tvi-s09", tema="tvilling", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what a leveraged recapitalisation changes in the cost of capital and what it leaves alone.",
        "r<sub>U</sub> belongs to the assets. r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). "
        "r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> under a target ratio.",
        "<p><b>Step 1:</b> did the assets change?</p>"
        "<p><b>Step 2:</b> which formula has D/V or D/E in it?</p>"
        "<p><b>Step 3:</b> write down what happens to β<sub>E</sub>, to the pre-tax WACC and to the after-tax WACC in turn. <b>Watch out:</b> a weighted average of two rising returns can still fall when the weights shift.</p>",
    ),
    q="<p>A firm with corporate taxes issues debt and buys back shares, moving to a higher constant D/V. Its "
      "assets do not change.</p>"
      "<p>I. Its unlevered cost of capital r<sub>U</sub> rises, because the firm now carries more risk.</p>"
      "<p>II. Its after-tax WACC falls, even though r<sub>E</sub> and r<sub>D</sub> both rise.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "r<sub>U</sub> is the return on the assets, which did not change. Leverage moves risk between "
                    "the claims without creating any."),
        R("Only II"),
        F("Both I and II", "Statement I is false: r<sub>U</sub> stays where it was."),
        F("Neither I nor II", "Statement II is true: r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> "
                              "falls as D/V and r<sub>D</sub> rise."),
    ],
    kort="<p><b>Only II.</b> r<sub>U</sub> stays with the assets. r<sub>wacc</sub> = r<sub>U</sub> − "
         "(D/V)τ<sub>c</sub>r<sub>D</sub>. Both D/V and r<sub>D</sub> rise, so the WACC falls.</p>",
    full="<p><b>What leverage does.</b> Leverage changes who carries the business risk, not how much of it there "
         "is. β<sub>U</sub> and r<sub>U</sub> describe the assets, so they stay put.</p>"
         "<p><b>Statement I.</b> False. The equity is riskier because the same business risk sits on a smaller "
         "equity base, so β<sub>E</sub> and r<sub>E</sub> rise. The average over all claims, the pre-tax WACC, "
         "stays at r<sub>U</sub> under the course's target-ratio convention.</p>"
         "<p><b>Statement II.</b> True. The after-tax WACC is r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>. A "
         "higher D/V and a higher r<sub>D</sub> both enlarge the subtracted term. The weights shift toward debt, "
         "whose cost is cut by the tax deduction.</p>"
         "<p><b>Check 2.</b> Weight the new β<sub>E</sub> and β<sub>D</sub> by the new weights and you get the "
         "old β<sub>U</sub>: risk moved, nothing was created.</p>"
         "<p><b>Remember:</b> r<sub>U</sub> is fixed by the business. Only the tax shield moves the WACC.</p>",
)

statisk(
    "tvi-s10", tema="tvilling", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about when the unlevering weights carry a tax term.",
        "Default: β<sub>U</sub> = [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub>. Fixed permanent debt: weights E/(E + "
        "D(1 − τ<sub>c</sub>)) and D(1 − τ<sub>c</sub>)/(E + D(1 − τ<sub>c</sub>)).",
        "<p><b>Step 1:</b> what makes a tax shield as safe as the debt?</p>"
        "<p><b>Step 2:</b> what makes it as risky as the assets?</p>"
        "<p><b>Step 3:</b> match each statement to its debt policy. <b>Watch out:</b> the tax term appears only when the question says the amount of debt is fixed and permanent.</p>",
    ),
    q="<p>Consider two listed twins.</p>"
      "<p>I. A twin that keeps its debt at a constant fraction of its value is unlevered with plain market-value "
      "weights, without taxes.</p>"
      "<p>II. A twin with a fixed amount of permanent debt is unlevered with the debt weighted as D(1 − "
      "τ<sub>c</sub>).</p>"
      "<p>Which statements follow the course's conventions?</p>",
    alternativer=[
        F("Only I", "Statement II is also the course rule: Kurbatov (lecture 8, slide 18) uses D(1 − τ<sub>c</sub>) "
                    "when the debt is fixed."),
        F("Only II", "Statement I is the default on the formula sheet: under a target ratio the weights carry no "
                     "tax term."),
        R("Both I and II"),
        F("Neither I nor II", "Both are course rules. The debt policy decides which weights apply."),
    ],
    kort="<p><b>Both.</b> A target ratio gives plain weights. Fixed permanent debt has a safe shield τ<sub>c</sub>D, "
         "so the risky assets are E + D(1 − τ<sub>c</sub>) and the debt is weighted as D(1 − τ<sub>c</sub>).</p>",
    full="<p><b>Why the debt policy matters.</b> With taxes the levered firm holds the assets and the tax shield. "
         "How risky the shield is depends on the debt policy.</p>"
         "<p><b>Statement I: target ratio.</b> The firm rebalances, so next year's debt is a fraction of next year's "
         "value. The shield moves with the assets and carries their risk. Then E + D is a portfolio with the asset "
         "beta and the plain weights apply. This is the formula-sheet default.</p>"
         "<p><b>Statement II: fixed permanent debt.</b> The shield τ<sub>c</sub>D is as safe as the debt. Take it "
         "out and the risky assets are worth V<sup>U</sup> = E + D − τ<sub>c</sub>D = E + D(1 − τ<sub>c</sub>). So "
         "r<sub>U</sub> = [E r<sub>E</sub> + D(1 − τ<sub>c</sub>)r<sub>D</sub>]/[E + D(1 − τ<sub>c</sub>)]. The "
         "same weights unlever betas (lecture 8, slide 18). Rearranged it is r<sub>E</sub> = r<sub>U</sub> + "
         "(D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>).</p>"
         "<p><b>Remember:</b> plain weights for a target ratio, D(1 − τ<sub>c</sub>) only when the question says "
         "the debt is fixed and permanent.</p>",
)

statisk(
    "tvi-s11", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about which return on debt the CAPM uses to find a debt beta.",
        "β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/premium with r<sub>D</sub> the expected return. Promised "
        "yield = expected return + expected loss from default.",
        "<p><b>Step 1:</b> what does the yield include that the expected return does not?</p>"
        "<p><b>Step 2:</b> is that extra part a reward for market risk?</p>"
        "<p><b>Watch out:</b> beta is backed out of the expected return. Anything in the number that is not a reward for market risk pushes beta the wrong way.</p>",
    ),
    q="<p>A colleague computes a twin's debt beta from the promised yield to maturity on its bonds instead of the "
      "expected return on the debt. The bonds carry a real chance of default. What does this do to the debt "
      "beta?</p>",
    alternativer=[
        R("It overstates the debt beta, because the yield also pays for the expected loss from default"),
        F("It understates the debt beta, because the yield ignores the chance of default",
          "The yield is what investors receive if nothing goes wrong. It sits above the expected return, not "
          "below."),
        F("Nothing, because the yield and the expected return are the same for traded bonds",
          "They coincide only for risk-free debt. With default risk the promised yield is higher."),
        F("It overstates the debt beta, because the yield includes the risk-free rate twice",
          "The yield includes r<sub>f</sub> once. The excess over r<sub>D</sub> is the expected default loss."),
    ],
    kort="<p><b>It overstates β<sub>D</sub>.</b> Yield = expected return + expected loss. The expected loss is not "
         "a premium for market risk, so only the expected return belongs in the CAPM.</p>",
    full="<p><b>Two returns on one bond.</b> The promised yield is what you earn if every payment arrives. The "
         "expected return averages over default as well, so it is lower. The gap is the expected loss from "
         "default, roughly the default probability times the loss rate.</p>"
         "<p><b>What the CAPM prices.</b> The CAPM gives the expected return as r<sub>f</sub> plus beta times the "
         "premium. So beta must be backed out of the expected return: β<sub>D</sub> = (r<sub>D</sub> − "
         "r<sub>f</sub>)/premium.</p>"
         "<p><b>The error.</b> Putting the yield in the numerator adds the expected loss to the excess return. "
         "β<sub>D</sub> comes out too high. So does every rate built on it.</p>"
         "<p><b>On the exam.</b> Kurbatov calls r<sub>D</sub> the cost of debt or the expected return on debt "
         "(H2025 Exercise 4 gives r<sub>D</sub> = 10% and asks for β<sub>D</sub>). Read which one you are given.</p>"
         "<p><b>Remember:</b> β<sub>D</sub> from the expected return, never from the promised yield.</p>",
)

statisk(
    "tvi-s12", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about why the cost of capital depends on beta and not on total volatility.",
        "r = r<sub>f</sub> + β(E[R<sub>mkt</sub>] − r<sub>f</sub>). β = Cov(R<sub>i</sub>, R<sub>mkt</sub>)/"
        "Var(R<sub>mkt</sub>). Firm-specific risk diversifies away.",
        "<p><b>Step 1:</b> which part of a stock's risk survives in a diversified portfolio?</p>"
        "<p><b>Step 2:</b> which part are investors paid to bear?</p>"
        "<p><b>Step 3:</b> compare the betas, not the volatilities. <b>Watch out:</b> the CAPM is an equilibrium result that assumes diversified investors.</p>",
    ),
    q="<p>Two listed firms in the same industry have the same asset beta. One has returns that are twice as "
      "volatile, because of large firm-specific shocks. Both are all-equity. What does the CAPM say about their "
      "costs of capital?</p>",
    alternativer=[
        R("They are the same, because firm-specific risk can be diversified away and is not priced"),
        F("The more volatile firm has the higher cost of capital, because investors dislike volatility",
          "Investors who hold the market bear only the volatility that moves with the market. The firm-specific "
          "part washes out."),
        F("The more volatile firm has the lower cost of capital, because its shocks offset the market",
          "Firm-specific shocks are unrelated to the market, so they neither raise nor lower beta."),
        F("They cannot be compared without the correlation between the two firms",
          "With equal betas the CAPM needs nothing else: equal betas give equal required returns."),
    ],
    kort="<p><b>The same.</b> Only systematic risk is priced. Equal betas give equal costs of capital whatever "
         "the total volatility.</p>",
    full="<p><b>Why only beta matters.</b> A well-diversified investor holds many stocks. Firm-specific shocks "
         "in one stock are offset by shocks in others, so they disappear from the portfolio at no cost. Nobody "
         "is paid to bear a risk that can be removed for free.</p>"
         "<p><b>What survives.</b> The part of a stock's return that moves with the market cannot be diversified "
         "away. Beta measures it: β = Cov(R<sub>i</sub>, R<sub>mkt</sub>)/Var(R<sub>mkt</sub>). The CAPM prices "
         "only that part.</p>"
         "<p><b>The consequence for the twin.</b> A twin may have far more firm-specific noise than your firm and "
         "still be a good twin, as long as its assets have the same beta. That is why the routine moves "
         "β<sub>U</sub>, not volatility.</p>"
         "<p><b>A caveat.</b> The CAPM rests on assumptions: investors hold diversified, mean-variance efficient "
         "portfolios. It is an equilibrium result, not an arbitrage result.</p>"
         "<p><b>Remember:</b> required return depends on beta, not on total risk.</p>",
)

statisk(
    "tvi-s13", tema="tvilling", type="begrep",
    hjelp=hjelp3(
        "This is about relevering after a large change in leverage and which input must move with it.",
        "r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). At higher leverage the debt is "
        "riskier, so r<sub>D</sub> and β<sub>D</sub> rise.",
        "<p><b>Step 1:</b> what happens to default risk when leverage rises a lot?</p>"
        "<p><b>Step 2:</b> do the standard checks look at the input you forgot?</p>"
        "<p><b>Watch out:</b> check 2 and the pre-tax WACC are the MM II equation rearranged. They hold for any cost of debt you feed in.</p>",
    ),
    q="<p>Your firm moves from little debt to a high D/E. You relever with MM II but keep the old, low cost of "
      "debt. Check 2 and pre-tax WACC = r<sub>U</sub> both pass. What is wrong?</p>",
    alternativer=[
        R("r<sub>D</sub> should rise with leverage. The old rate overstates r<sub>E</sub> while both checks still "
          "pass"),
        F("Nothing: if both checks pass, the inputs must be consistent",
          "Both checks hold by construction for any r<sub>D</sub> once r<sub>E</sub> comes from MM II. They verify "
          "algebra, not assumptions."),
        F("r<sub>D</sub> should fall with leverage, because the firm now borrows more and gets volume discounts",
          "Lenders demand more, not less, as the chance of default rises."),
        F("r<sub>U</sub> should be recomputed at the new leverage, since the business is now riskier",
          "r<sub>U</sub> belongs to the assets, which did not change. It is r<sub>D</sub> that must move."),
    ],
    kort="<p><b>Reprice r<sub>D</sub>.</b> More leverage makes the debt riskier. A stale low r<sub>D</sub> puts too "
         "much of the business risk on equity. The checks cannot see it.</p>",
    full="<p><b>What moves with leverage.</b> The assets stay the same, so r<sub>U</sub> stays. The debt does not: "
         "at a high D/E it is more likely to default in bad times, so β<sub>D</sub> and r<sub>D</sub> rise.</p>"
         "<p><b>The error.</b> MM II says r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). With a "
         "stale low r<sub>D</sub> the spread r<sub>U</sub> − r<sub>D</sub> is too wide, so r<sub>E</sub> is "
         "overstated: the equity is charged for risk the lenders now carry.</p>"
         "<p><b>Why the checks pass.</b> Check 2 and pre-tax WACC = r<sub>U</sub> are the MM II equation "
         "rearranged. They return r<sub>U</sub> for any r<sub>D</sub> you feed in, so they catch arithmetic, not "
         "a wrong input. After a recapitalisation, reprice r<sub>D</sub> before anything else.</p>"
         "<p><b>Remember:</b> when leverage changes, update r<sub>D</sub> and β<sub>D</sub> before you relever.</p>",
)

statisk(
    "tvi-s14", tema="tvilling", type="formel",
    hjelp=hjelp3(
        "This is about recognising the relevering formula when the debt is risky and the firm keeps a constant "
        "ratio.",
        "The weighting identity is β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>. Solve it for "
        "β<sub>E</sub>.",
        "<p><b>Step 1:</b> multiply the identity by V/E.</p>"
        "<p><b>Step 2:</b> collect the terms in β<sub>U</sub> and β<sub>D</sub>.</p>"
        "<p><b>Step 3:</b> use V/E = 1 + D/E. <b>Watch out:</b> the tax term belongs to a fixed amount of debt. The multiplier is never D/V.</p>",
    ),
    q="<p>Your firm keeps a constant debt-to-equity ratio and its debt is risky. Which formula gives its equity "
      "beta from the asset beta?</p>",
    alternativer=[
        R("β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>)"),
        F("β<sub>E</sub> = β<sub>U</sub> + (D/V)(β<sub>U</sub> − β<sub>D</sub>)",
          "Solving the identity divides by E/V, which turns D/V into D/E. The multiplier is D/E."),
        F("β<sub>E</sub> = β<sub>U</sub>[1 + (1 − τ<sub>c</sub>)D/E]",
          "This is the textbook version for fixed debt with β<sub>D</sub> = 0. The firm keeps a constant ratio and "
          "its debt is risky."),
        F("β<sub>E</sub> = β<sub>U</sub>(1 + D/E) + (D/E)β<sub>D</sub>",
          "The debt beta enters with a minus sign: the lenders carry part of the business risk, which lowers the "
          "equity beta."),
    ],
    kort="<p><b>β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>).</b> The weighting identity "
         "solved for β<sub>E</sub>. With β<sub>D</sub> = 0 it is β<sub>U</sub>(1 + D/E).</p>",
    full="<p><b>Where it comes from.</b> A firm is a portfolio of its equity and its debt: β<sub>U</sub> = "
         "(E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>. Multiply by V/E: (V/E)β<sub>U</sub> = β<sub>E</sub> + "
         "(D/E)β<sub>D</sub>. Since V/E = 1 + D/E, β<sub>E</sub> = β<sub>U</sub> + (D/E)β<sub>U</sub> − "
         "(D/E)β<sub>D</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>).</p>"
         "<p><b>What it says.</b> The equity carries the business risk plus a premium for financial risk. The "
         "premium grows with D/E and shrinks as the lenders carry more of the risk (a higher β<sub>D</sub>).</p>"
         "<p><b>The same in rates.</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>), MM II, "
         "which is on the formula sheet.</p>"
         "<p><b>Not this course's default.</b> The (1 − τ<sub>c</sub>) version assumes a fixed amount of debt. A "
         "firm with a constant ratio uses the plain form.</p>"
         "<p><b>Remember:</b> multiply by D/E, subtract β<sub>D</sub>, no tax term for a constant ratio.</p>",
)
