# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402, tema «wacc-apv» (prefiks wac-): fri kontantstrøm,
   WACC-metoden, APV, FTE, gjeldskapasitet, gjeldsjustering, permanent gjeld og
   konstant rentedekning. Skribent 1 (verdsettingskjeden). Kontrakten er
   docs/fie402-trening-spek.md.

   Familier (regnespørsmål med tallsvar)
     wac-fcf1   FCF fra EBIT med ΔNWC, renter som avledning (D5)
     wac-fcf2   inkrementell FCF: sunk cost, kannibalisering, alternativkost,
                frigjøring av arbeidskapital (D5)
     wac-wm1    WACC-metoden til pris per aksje, med overskuddskasse (D4, D10)
     wac-apv1   APV med voksende evigrente og konstant D/V, skjold med r_U
     wac-2p1    to perioder med WACC-metoden (H2025 E4 e)
     wac-adj1   gjeldsjusteringen mellom år 1 og 2 (H2025 E4 f)
     wac-ts2    PV(TS) over to perioder med D_t = d·V_t^L og r_U (H2025 E4 h)
     wac-fte1   FTE: FCFE = FCF − (1 − τ)·renter + nettoopplåning (PS2 E6 h)
     wac-perm1  permanent gjeld: r_wacc = r_U(1 − τD/V^L) (A2, PS2 E9)
     wac-perm2  permanent gjeld: D(1 − τ)-vekter og r_E med (1 − τ) (A1)
     wac-ic1    konstant rentedekning: V^L = (1 + τk)V^U (B1, PS2 E5)
     wac-cap1   gjeldskapasitet og finansieringen av et prosjekt (B2)

   Statiske: wac-s01 … wac-s15.

   Konvensjoner (Kurbatov 2026): skatteskjoldet diskonteres med r_U ved
   konstant D/V og med r_D ved fast gjeld; D_t = d·V_t^L; renten i år t på
   D_{t−1}; diskret diskontering også for brøkdeler av år; fire desimaler i
   mellomtallene, og fasiten regnes fra de avrundede tallene den viser.
"""
from trening_lib import *  # noqa: F401,F403


NAVN = ["Hordafjord Industries", "Vestbris Marine", "Sognefoss Energy", "Lindevik Foods", "Torvmyr Logistics",
        "Kalvøy Seafood", "Bjørkeli Software", "Steinvik Cement", "Ravnås Retail", "Nordkapp Telecom",
        "Fjordline Media", "Helgøy Robotics"]


# ---------------------------------------------------------------- tallformat
def _pct(x, d):
    """Brøk til prosent med d desimaler, uten flyttallsstøy: 0.17625 → «17.63%»."""
    return tall(round(x * 100, 9), d) + "%"


def _ep(x, mind=0, maxd=4):
    """Rente som brøk i prosent i kortest eksakte form: 0.045 → «4.5%» (høyst maxd desimaler)."""
    for d in range(mind, maxd + 1):
        if abs(rund(x * 100, d) - x * 100) < 1e-7:
            return _pct(x, d)
    return _pct(x, maxd)


def _et(x, mind=0, maxd=6):
    """Tall i kortest eksakte form med minst mind desimaler (høyst maxd)."""
    for d in range(mind, maxd + 1):
        if abs(rund(x, d) - x) < 1e-9:
            return tall(x, d)
    return tall(x, maxd)


def _vp(x, eks=None):
    """Svaret som prosent med så få desimaler (2–4) at det ligger godt innenfor toleransen."""
    e = x if eks is None else eks
    for d in (2, 3, 4):
        if abs(rund(round(x * 100, 9), d) - e * 100) <= 0.0008 * abs(e * 100):
            return _pct(x, d)
    return _pct(x, 4)


def _vt(x, eks=None):
    """Svaret som tall med to desimaler, eller fire når to blir for grovt."""
    e = x if eks is None else eks
    for d in (2, 4):
        if abs(rund(x, d) - e) <= 0.0008 * max(abs(e), 1e-9):
            return tall(x, d)
    return tall(x, 4)


def _t4(x):
    return tall(x, 4)


def _velg(r, kandidater, n=3, rel=0.02):
    """Velg n feller (tekst, felle, verdi) som ligger minst rel unna hverandre og
       unna svaret (første element). Avvis når det ikke finnes nok."""
    svar, rest = kandidater[0], list(kandidater[1:])
    r.shuffle(rest)
    valgt = []
    for k in rest:
        if all(not nær(k[2], v[2], rel) for v in [svar] + valgt):
            valgt.append(k)
        if len(valgt) == n:
            return valgt
    raise Avvis("for få feller som skiller seg fra svaret")


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


# ---------------------------------------------------------------------------
# wac-fcf1 · Fri kontantstrøm fra EBIT med endring i arbeidskapital
# ---------------------------------------------------------------------------
@familie("wac-fcf1", tema="wacc-apv", antall=6, tittel="Free cash flow from EBIT with working capital",
         hjelp=hjelp3(
             "This is free cash flow: the cash the operations produce for all investors together, as if the firm "
             "had no debt. You need one year's FCF.",
             "FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC, with ΔNWC = NWC<sub>t</sub> − NWC<sub>t−1</sub>. "
             "Interest never enters FCF.",
             "<p><b>Step 1: tax on EBIT.</b> Charge tax on the full EBIT, as if there were no debt.</p>"
             "<p><b>Step 2: add back depreciation</b>, which is not a cash payment and subtract capital "
             "expenditure.</p>"
             "<p><b>Step 3: working capital.</b> Subtract the change, not the level. A fall in working capital "
             "releases cash.</p>"
             "<p><b>Watch out:</b> the interest expense is there to tempt you. Financing enters through the "
             "discount rate or the tax shield.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    EBIT = r.choice([120, 150, 180, 200, 240, 300])
    tau = r.choice([0.22, 0.25, 0.40])
    Dep = r.choice([20, 25, 30, 40, 50])
    Cap = r.choice([30, 35, 45, 60, 70])
    Int = r.choice([10, 12, 15, 18, 24])
    form = r.choice(["niva", "salg", "niva"])
    if form == "niva":
        N0 = r.choice([60, 80, 100, 120])
        N1 = N0 + r.choice([-20, -10, 10, 15, 20, 30])
        nwc_q = (f"Net working capital is NOK {N0} million at the end of last year and NOK {N1} million at the end "
                 f"of this year.")
        nwc_t = f"ΔNWC = {N1} − {N0} = {_et(N1 - N0)}"
    else:
        k = r.choice([0.10, 0.12, 0.15, 0.20])
        S0 = r.choice([500, 600, 800, 1000])
        S1 = S0 + r.choice([-100, 100, 150, 200])
        N0, N1 = k * S0, k * S1
        nwc_q = (f"Net working capital is kept at {_ep(k)} of sales. Sales were NOK {tall(S0)} million last year "
                 f"and are NOK {tall(S1)} million this year.")
        nwc_t = (f"NWC goes from {_ep(k)} × {tall(S0)} = {_et(N0)} to {_ep(k)} × {tall(S1)} = {_et(N1)}, so "
                 f"ΔNWC = {_et(N1 - N0)}")
    dN = N1 - N0
    nopat = EBIT * (1 - tau)
    fcf = nopat + Dep - Cap - dN

    f_int = (EBIT - Int) * (1 - tau) + Dep - Cap - dN
    f_lvl = nopat + Dep - Cap - N1
    f_dep = nopat - Cap - dN
    f_sign = nopat + Dep - Cap + dN
    f_ebitda = (EBIT + Dep) * (1 - tau) - Cap - dN
    kand = [("R", None, fcf),
            (_vt(f_int), f"The interest of {Int} deducted before tax. Interest is a payment to lenders: its cost "
                         f"sits in the discount rate and its tax saving in the WACC or in PV(TS).", f_int),
            (_vt(f_lvl), f"The level of working capital, {_et(N1)}, subtracted instead of the change. Only the "
                         f"change ties up or releases cash this year.", f_lvl),
            (_vt(f_dep), f"Depreciation of {Dep} not added back. It was deducted to compute EBIT but is not a cash "
                         f"payment.", f_dep),
            (_vt(f_sign), "The change in working capital added with the wrong sign. More working capital ties up "
                          "cash, less releases it.", f_sign),
            (_vt(f_ebitda), f"Tax charged on EBITDA: ({EBIT} + {Dep}) × (1 − {_ep(tau)}). Depreciation is "
                            f"deductible, so it saves τ<sub>c</sub> × Dep in tax.", f_ebitda)]
    if abs(dN) < 1e-9:
        raise Avvis("ingen endring i arbeidskapital")
    feller = _velg(r, kand)

    q = (f"<p>{navn} reports the following for this year, in NOK million: EBIT of {EBIT}, depreciation of {Dep}, "
         f"capital expenditure of {Cap} and interest expense of {Int}. {nwc_q} The corporate tax rate is "
         f"{_ep(tau)}.</p><p>What is {gen(navn)} free cash flow this year, in NOK million?</p>")

    dn_t = f"− {_et(dN)}" if dN > 0 else f"+ {_et(-dN)}"
    kort = (f"<p><b>{_vt(fcf)}.</b> FCF = {EBIT} × (1 − {_ep(tau)}) + {Dep} − {Cap} {dn_t} = "
            f"{_et(nopat)} + {Dep} − {Cap} {dn_t} = {_et(fcf)}. The interest stays out.</p>")
    full = (
        f"<p><b>What FCF is.</b> Free cash flow is what the operations generate for debt and equity holders "
        f"together. It is computed as if the firm had no debt, so the same number can be discounted by WACC, APV "
        f"or adjusted for FTE. The financing is handled in the discount rate or in PV(TS), never in the cash "
        f"flow.</p>"
        f"<p><b>Step 1: tax on EBIT.</b> {EBIT} × (1 − {_ep(tau)}) = {_et(nopat)}.</p>"
        f"<p><b>Step 2: depreciation and investment.</b> Add back the {Dep} of depreciation, which is a non-cash "
        f"charge and subtract the {Cap} of capital expenditure.</p>"
        f"<p><b>Step 3: working capital.</b> {nwc_t}. "
        + ("An increase ties up cash, so it is subtracted." if dN > 0 else
           "A fall releases cash, so subtracting a negative change adds it.")
        + f"</p><p><b>Step 4: add up.</b> {_et(nopat)} + {Dep} − {Cap} {dn_t} = <b>{_et(fcf)}</b>. The "
        f"interest of {Int} plays no part.</p>"
        f"<p><b>First check: the EBITDA route.</b> ({EBIT} + {Dep}) × (1 − {_ep(tau)}) + {_ep(tau)} × {Dep} − {Cap} "
        f"{dn_t} = {_et((EBIT + Dep) * (1 - tau))} + {_et(tau * Dep)} − {Cap} {dn_t} = {_et(fcf)}. The "
        f"two forms differ only in where depreciation enters, so this catches a missing add-back, not a wrong "
        f"sign on ΔNWC.</p>"
        f"<p><b>Remember:</b> tax on full EBIT, add back depreciation, subtract CapEx and the change in NWC. No "
        f"interest.</p>"
    )
    return sporsmal(q, _alt(_vt(fcf), fcf, feller), kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# wac-fcf2 · Inkrementell kontantstrøm: sunk cost, kannibalisering,
# alternativkost og frigjøring av arbeidskapital
# ---------------------------------------------------------------------------
@familie("wac-fcf2", tema="wacc-apv", antall=5, tittel="Incremental free cash flow: what belongs to the project",
         hjelp=hjelp3(
             "This is incremental free cash flow: the difference the project makes to the firm's cash flow. You "
             "need the project's FCF in one year.",
             "FCF = (incremental EBITDA − Dep)(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC. Include lost sales on other "
             "products and income given up. Leave out costs already paid.",
             "<p><b>Step 1: incremental EBITDA.</b> Start from the new product's EBITDA, subtract the margin lost "
             "on existing products and any income the firm gives up to run the project.</p>"
             "<p><b>Step 2: tax and depreciation.</b> Tax the incremental EBIT, then add depreciation back.</p>"
             "<p><b>Step 3: working capital.</b> Only the change counts. At the end the working capital comes "
             "back.</p>"
             "<p><b>Watch out:</b> a cost paid in the past is sunk whatever you decide now, however the "
             "accountants allocate it.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    T = r.choice([3, 4, 5])
    aar = r.choice(["siste", "midt"])
    t = T if aar == "siste" else r.randint(2, T - 1)
    X = r.choice([80, 100, 120, 150])
    C = r.choice([10, 15, 20, 25])
    Dep = r.choice([20, 25, 30, 40])
    W = r.choice([15, 20, 24, 30])
    S = r.choice([8, 10, 12, 15])
    s = r.choice([3, 4, 5])
    leie = r.random() < 0.5
    R_ = r.choice([5, 6, 8]) if leie else 0
    tau = r.choice([0.22, 0.25])

    ebitda = X - C - R_
    ebit = ebitda - Dep
    rel = W if aar == "siste" else 0
    fcf = ebit * (1 - tau) + Dep + rel

    f_sunk = fcf - s * (1 - tau)
    f_cann = fcf + C * (1 - tau)
    kand = [("R", None, fcf),
            (_vt(f_sunk), f"The {s} of the study charged to the project as an expense, {s} × (1 − {_ep(tau)}) after "
                          f"tax. The study was paid last year whatever you decide now: it is a sunk cost.", f_sunk),
            (_vt(f_cann), f"The {C} lost on the existing product left out. Those sales disappear only because of "
                          f"the project, so the loss is part of its cash flow.", f_cann)]
    if leie:
        f_opp = fcf + R_ * (1 - tau)
        kand.append((_vt(f_opp), f"The rent of {R_} the firm gives up left out. Using its own building is not "
                                 f"free: the lost rent is an opportunity cost.", f_opp))
    if aar == "siste":
        kand.append((_vt(fcf - W), f"The working capital of {W} not released. In the last year it comes back as "
                                   f"cash.", fcf - W))
        kand.append((_vt(fcf - 2 * W), f"The release of {W} subtracted as if working capital were built up. A fall "
                                       f"in working capital is an inflow.", fcf - 2 * W))
    feller = _velg(r, kand)

    leie_q = (f"The project uses a building the firm owns, which it could otherwise rent out for NOK {R_} million a "
              f"year. " if leie else "")
    slutt = (f"Year {t} is the last year: the working capital of NOK {W} million tied up in the project is "
             f"released at the end of it and there is no capital expenditure that year." if aar == "siste" else
             f"In year {t} working capital stays at NOK {W} million and there is no capital expenditure.")
    q = (f"<p>{navn} is launching a product line that runs for {T} years. In year {t} the new product earns EBITDA "
         f"of NOK {X} million. It will take sales from an existing product, whose EBITDA falls by NOK {C} million a "
         f"year. {leie_q}Depreciation on the new equipment is NOK {Dep} million a year. Last year the firm paid NOK "
         f"{S} million for a market study and the controller wants to charge NOK {s} million of it to the project "
         f"each year. {slutt} The corporate tax rate is {_ep(tau)}.</p>"
         f"<p>What is the project's incremental free cash flow in year {t}, in NOK million?</p>")

    leie_k = f" − {R_}" if leie else ""
    kort = (f"<p><b>{_vt(fcf)}.</b> EBIT = {X} − {C}{leie_k} − {Dep} = {ebit}. FCF = {ebit} × (1 − {_ep(tau)}) + "
            f"{Dep}" + (f" + {W}" if rel else "") + f" = {_et(fcf)}. The study is sunk.</p>")
    full = (
        f"<p><b>The rule.</b> A project's cash flow is the difference between the firm's cash flow with the project "
        f"and without it. Anything that happens either way stays out. Anything that happens only because of the "
        f"project goes in, even when it shows up in another part of the firm.</p>"
        f"<p><b>Step 1: incremental EBITDA.</b> The new product earns {X}. The existing product loses {C} "
        f"(cannibalisation)" + (f" and the firm gives up {R_} of rent (an opportunity cost)" if leie else "")
        + f": {X} − {C}{leie_k} = {ebitda}.</p>"
        f"<p><b>Step 2: tax.</b> EBIT = {ebitda} − {Dep} = {ebit}, so EBIT(1 − τ<sub>c</sub>) = "
        f"{_et(ebit * (1 - tau))}. Add back depreciation: {_et(ebit * (1 - tau))} + {Dep} = "
        f"{_et(ebit * (1 - tau) + Dep)}.</p>"
        + (f"<p><b>Step 3: working capital.</b> It falls from {W} to 0, so ΔNWC = −{W} and FCF rises by {W}: "
           f"<b>{_et(fcf)}</b>.</p>" if rel else
           f"<p><b>Step 3: working capital.</b> It does not change in year {t}, so FCF = <b>{_et(fcf)}</b>.</p>")
        + f"<p><b>What stays out.</b> The market study of {S} was paid last year. Whether or not the project goes "
          f"ahead, that money is gone, so the {s} a year the controller allocates is not a cash flow of the "
          f"project.</p>"
          f"<p><b>First check.</b> Ask of every item: does it happen only if the project goes ahead? Lost sales: "
          f"yes. " + ("Lost rent: yes. " if leie else "") + "The study: no.</p>"
          f"<p><b>Remember:</b> include cannibalisation and opportunity costs, ignore sunk costs and let working "
          f"capital come back at the end.</p>"
    )
    return sporsmal(q, _alt(_vt(fcf), fcf, feller), kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# wac-wm1 · WACC-metoden til pris per aksje, med netto gjeld i vektene (B3)
# ---------------------------------------------------------------------------
@familie("wac-wm1", tema="wacc-apv", antall=6, tittel="The WACC method to a share price with net debt",
         hjelp=hjelp3(
             "This is the WACC method on a growing firm whose target ratio is set on net debt, then the step from "
             "firm value to a price per share. You need the share price today.",
             "r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) with D net debt. "
             "V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g). E = V<sup>L</sup> − D<sub>net</sub>. Price = "
             "E/N.",
             "<p><b>Step 1: the after-tax WACC</b> at the target weights. Convert D/E to D/V first.</p>"
             "<p><b>Step 2: the firm value.</b> Use next year's free cash flow in the growing perpetuity. If you are "
             "given this year's, grow it one year.</p>"
             "<p><b>Step 3: from firm to equity.</b> Subtract the net debt at the target ratio and divide by the "
             "number of shares.</p>"
             "<p><b>Watch out:</b> net debt is debt minus the excess cash. The cash is already inside it.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    g = r.choice([0.02, 0.025, 0.03])
    rE = r.choice([0.10, 0.11, 0.12, 0.125, 0.13, 0.14])
    rD = r.choice([0.04, 0.05, 0.06, 0.07])
    form = r.choice(["dv", "de"])
    if form == "dv":
        d = r.choice([0.20, 0.25, 0.30, 0.40])
        de = d / (1 - d)
        lev_q = f"keeps its net debt, debt minus excess cash, at {_ep(d)} of firm value"
    else:
        de = r.choice([0.25, 0.50, 1.00])
        d = de / (1 + de)
        lev_q = f"keeps its net debt, debt minus excess cash, at {_et(de, 2)} times the value of its equity"
    tau = r.choice([0.22, 0.25, 0.40])
    C = r.choice([50, 80, 100, 150])
    N = r.choice([20, 25, 40, 50])
    naa = r.random() < 0.5                                 # oppgir årets FCF i stedet for neste års
    F = r.choice([40, 50, 60, 80, 100])
    F1 = F * (1 + g) if naa else F

    wacc = (1 - d) * rE + d * rD * (1 - tau)
    rU = (1 - d) * rE + d * rD
    if wacc - g < 0.04:
        raise Avvis("for liten avstand mellom WACC og vekst")
    V_x = F1 / (wacc - g)
    P_x = V_x * (1 - d) / N
    V = rund(V_x, 4)
    D = rund(d * V, 4)
    E = rund(V - D, 4)
    P = E / N

    f_cash = (V_x * (1 - d) + C) / N
    f_nod = V_x / N
    Vu = F1 / (rU - g)
    f_pre = Vu * (1 - d) / N
    kand = [("R", None, P),
            (_vt(f_cash), f"The excess cash of {C} added on top. The ratio is set on net debt, so the cash is "
                          f"already netted out of the debt you subtract: adding it again counts it twice.", f_cash),
            (_vt(f_nod), "The net debt not subtracted: this divides the whole firm, not the equity, by the shares.",
             f_nod),
            (_vt(f_pre), f"The pre-tax WACC of {_ep(rU)} used, which is r<sub>U</sub>. It gives the unlevered value "
                         f"and leaves out the interest tax shield.", f_pre)]
    if naa:
        V0 = F / (wacc - g)
        f_g = V0 * (1 - d) / N
        kand.append((_vt(f_g), f"This year's free cash flow of {F} put in the perpetuity. The formula needs next "
                               f"year's: {F} × (1 + {_ep(g)}).", f_g))
    if form == "de":
        w_de = (1 - de) * rE + de * rD * (1 - tau)
        if w_de - g > 0.01:
            V_de = F1 / (w_de - g)
            f_de = V_de * (1 - d) / N
            kand.append((_vt(f_de), f"D/E = {_et(de, 2)} used as the debt weight in the WACC. The weights are D/V "
                                    f"and E/V.", f_de))
    feller = _velg(r, kand)

    fcf_q = (f"Its free cash flow this year was NOK {F} million" if naa else
             f"Its free cash flow next year is expected to be NOK {F} million")
    q = (f"<p>{navn} {lev_q} and rebalances every year. {fcf_q} "
         f"and will grow at {_ep(g)} a year forever. Its cost of equity is {_ep(rE)}, its cost of debt is "
         f"{_ep(rD)} and the corporate tax rate is {_ep(tau)}. The firm holds NOK {C} million of excess cash "
         f"that its operations do not need. It has {N} million shares outstanding.</p>"
         f"<p>Using the WACC method, what is the price per share today, in NOK?</p>")

    dv_t = (f"D/V = {_et(de, 2)}/{_et(1 + de, 2)} = {_et(d, 2, 4)}. " if form == "de" else "")
    f1_t = (f"FCF<sub>1</sub> = {F} × {_et(1 + g, 2)} = {_et(F1)}. " if naa else "")
    kort = (f"<p><b>{_vt(P, P_x)}.</b> {dv_t}r<sub>wacc</sub> = {_ep(wacc)}. {f1_t}V<sup>L</sup> = {_et(F1)}/"
            f"({_ep(wacc)} − {_ep(g)}) = {_t4(V)}. E = {_t4(V)} − {_t4(D)} = {_t4(E)}, so P = {_t4(E)}/{N} = "
            f"{_vt(P, P_x)}. No cash on top: it is inside the net debt.</p>")
    full = (
        f"<p><b>The method.</b> The WACC method discounts free cash flow at the after-tax WACC. The (1 − "
        f"τ<sub>c</sub>) on r<sub>D</sub> puts the interest tax shield into the rate, so nothing is added on top. "
        f"Kurbatov weights with net debt (lecture 7: 320 − 20 = 300): excess cash is negative debt. So V = E + "
        f"D<sub>net</sub> and the target ratio already accounts for the cash.</p>"
        f"<p><b>Step 1: the WACC.</b> {dv_t}r<sub>wacc</sub> = {_et(1 - d, 2, 4)} × {_ep(rE)} + {_et(d, 2, 4)} × "
        f"{_ep(rD)} × (1 − {_ep(tau)}) = {_ep((1 - d) * rE)} + {_ep(d * rD * (1 - tau))} = {_ep(wacc)}.</p>"
        f"<p><b>Step 2: the firm value.</b> {f1_t}V<sup>L</sup> = {_et(F1)}/({_ep(wacc)} − {_ep(g)}) = "
        f"{_t4(V)}.</p>"
        f"<p><b>Step 3: the equity.</b> Net debt at the target ratio is D<sub>net</sub> = {_et(d, 2, 4)} × "
        f"{_t4(V)} = {_t4(D)}. E = {_t4(V)} − {_t4(D)} = {_t4(E)}.</p>"
        f"<p><b>Step 4: the price.</b> {_t4(E)}/{N} = <b>{_vt(P, P_x)}</b> per share.</p>"
        f"<p><b>First check: gross debt.</b> The firm's gross debt is D<sub>net</sub> + {C} = {_t4(D + C)}. "
        f"Subtract it and add the cash back: {_t4(V)} − {_t4(D + C)} + {C} = {_t4(E)}, the same equity. Adding the "
        f"cash a second time on top of the net-debt answer would count it twice. The rate itself: r<sub>U</sub> − "
        f"(D/V)τ<sub>c</sub>r<sub>D</sub> = {_ep(rU)} − {_ep(d * rD * tau)} = {_ep(wacc)}, an identity that "
        f"catches slips only.</p>"
        f"<p><b>Remember:</b> with a net-debt ratio, price = (V<sup>L</sup> − D<sub>net</sub>)/N. The cash is "
        f"already in D<sub>net</sub>.</p>"
    )
    return sporsmal(q, _alt(_vt(P, P_x), P, feller), kort, full,
                    tall=tallsvar(verdi=P_x, enhet="NOK per share"))


# ---------------------------------------------------------------------------
# wac-apv1 · APV med voksende evigrente og konstant D/V
# ---------------------------------------------------------------------------
@familie("wac-apv1", tema="wacc-apv", antall=5, tittel="APV when the debt grows with the firm",
         hjelp=hjelp3(
             "This is APV for a firm that keeps a constant debt ratio. You value the business without debt, then "
             "add the tax shield. You need the levered firm value.",
             "V<sup>L</sup> = V<sup>U</sup> + PV(TS). V<sup>U</sup> = FCF<sub>1</sub>/(r<sub>U</sub> − g). With "
             "constant D/V the shield grows with the firm and carries asset risk: PV(TS) = τ<sub>c</sub>r<sub>D</sub>"
             "D<sub>0</sub>/(r<sub>U</sub> − g).",
             "<p><b>Step 1: the unlevered value</b> at r<sub>U</sub>.</p>"
             "<p><b>Step 2: next year's shield.</b> τ<sub>c</sub> times the interest on today's debt.</p>"
             "<p><b>Step 3: the rate on the shield.</b> Name the debt policy. A constant ratio makes the shield "
             "grow with the firm and as risky as the assets.</p>"
             "<p><b>Step 4: add.</b></p>"
             "<p><b>Watch out:</b> τ<sub>c</sub>D is the shortcut for fixed permanent debt only.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    F1 = r.choice([40, 50, 60, 72, 90])
    g = r.choice([0.02, 0.025, 0.03])
    rU = r.choice([0.09, 0.10, 0.11, 0.12])
    D0 = r.choice([150, 200, 250, 300])
    rD = r.choice([0.04, 0.05, 0.06, 0.07])
    tau = r.choice([0.22, 0.25, 0.40])
    if rD - g < 0.015:
        raise Avvis("r_D for nær vekstraten")

    Vu_x = F1 / (rU - g)
    TS1 = tau * rD * D0
    pv_x = TS1 / (rU - g)
    VL_x = Vu_x + pv_x
    Vu, pv = rund(Vu_x, 4), rund(pv_x, 4)
    VL = Vu + pv
    if D0 / VL_x > 0.6:
        raise Avvis("for mye gjeld")

    f_rd = Vu_x + TS1 / (rD - g)
    f_tD = Vu_x + tau * D0
    f_lev = Vu_x + TS1 / rU
    kand = [("R", None, VL),
            (_vt(f_rd), f"The shield discounted at r<sub>D</sub> = {_ep(rD)}, as if the debt were fixed. This debt "
                        f"moves with firm value, so the shield carries the firm's risk.", f_rd),
            (_vt(f_tD), f"τ<sub>c</sub>D = {_ep(tau)} × {D0} used for the shield. That shortcut holds only for a "
                        f"fixed amount of permanent debt.", f_tD),
            (_vt(f_lev), "The shield treated as a level perpetuity. The debt grows with the firm, so the shield "
                         "grows too.", f_lev)]
    feller = _velg(r, kand)

    q = (f"<p>{navn} expects free cash flow of NOK {F1} million next year, growing at {_ep(g)} a year forever. Its "
         f"unlevered cost of capital is {_ep(rU)}. It has NOK {D0} million of debt today at r<sub>D</sub> = "
         f"{_ep(rD)} and keeps its debt at a constant fraction of firm value, so the debt also grows at {_ep(g)} a "
         f"year. The corporate tax rate is {_ep(tau)}.</p>"
         f"<p>Using APV, what is the levered value of the firm, in NOK million?</p>")

    d_x = D0 / VL_x
    wacc_x = rU - d_x * tau * rD
    kort = (f"<p><b>{_vt(VL, VL_x)}.</b> V<sup>U</sup> = {F1}/({_ep(rU)} − {_ep(g)}) = {_t4(Vu)}. TS<sub>1</sub> = "
            f"{_ep(tau)} × {_ep(rD)} × {D0} = {_et(TS1)}, at r<sub>U</sub>: PV(TS) = {_t4(pv)}. V<sup>L</sup> = "
            f"{_t4(VL)}.</p>")
    full = (
        f"<p><b>APV in two pieces.</b> APV values the business as if it had no debt, then adds the value the debt "
        f"creates through the tax deduction. Only the rate on the shield needs judgement and it follows from the "
        f"debt policy.</p>"
        f"<p><b>Step 1: the unlevered value.</b> V<sup>U</sup> = {F1}/({_ep(rU)} − {_ep(g)}) = {_t4(Vu)}.</p>"
        f"<p><b>Step 2: the shield.</b> Next year's interest is {_ep(rD)} × {D0} = {_et(rD * D0)}, so TS<sub>1</sub> "
        f"= {_ep(tau)} × {_et(rD * D0)} = {_et(TS1)}. The debt grows at {_ep(g)}, so the shield does too.</p>"
        f"<p><b>Step 3: the rate.</b> The firm keeps D/V constant, so next year's debt depends on next year's "
        f"value. The shield rises and falls with the business and is discounted at r<sub>U</sub>: PV(TS) = "
        f"{_et(TS1)}/({_ep(rU)} − {_ep(g)}) = {_t4(pv)}.</p>"
        f"<p><b>Step 4: add.</b> V<sup>L</sup> = {_t4(Vu)} + {_t4(pv)} = <b>{_t4(VL)}</b>.</p>"
        f"<p><b>Check 1: WACC = APV.</b> D/V = {D0}/{_t4(VL)} = {tall(d_x, 6)}, so r<sub>wacc</sub> = {_ep(rU)} − "
        f"{tall(d_x, 6)} × {_ep(tau)} × {_ep(rD)} = {_ep(wacc_x)} and {F1}/({_ep(wacc_x)} − {_ep(g)}) = "
        f"{_et(F1 / (wacc_x - g), 2, 2)}. The weight came from the APV answer, so this is a fixed point, not a "
        f"second valuation. It still catches the wrong rate on the shield: at r<sub>D</sub> the two methods "
        f"disagree.</p>"
        f"<p><b>Remember:</b> constant D/V, shield at r<sub>U</sub>. Fixed debt, shield at r<sub>D</sub>.</p>"
    )
    return sporsmal(q, _alt(_vt(VL, VL_x), VL, feller), kort, full,
                    tall=tallsvar(verdi=VL_x, enhet="NOK million"))


# ---------------------------------------------------------------------------
# Felles oppsett for de tre to-periode-familiene (H2025 E4)
# ---------------------------------------------------------------------------
def _to_perioder(r):
    """Trekker et firma som lever i to år med konstant D/E, slik H2025 E4 gjør.
       Returnerer en ordbok med alt de tre familiene trenger, avrundet slik
       fasiten viser det (fire desimaler)."""
    navn = r.choice(NAVN)
    F1 = r.choice([40, 50, 60, 80, 100])
    F2 = r.choice([50, 60, 70, 90, 120])
    tau = r.choice([0.30, 0.35, 0.40])
    type_ = r.choice(["rE", "rU"])
    form = r.choice(["de", "dv"])
    if form == "de":
        de = r.choice([0.25, 0.50, 1.00])
        d = de / (1 + de)
        lev_q = f"a debt-to-equity ratio of {_ep(de)}"
    else:
        d = r.choice([0.20, 0.25, 0.30, 0.40])
        de = d / (1 - d)
        lev_q = f"a debt-to-value ratio of {_ep(d)}"
    rD = r.choice([0.06, 0.07, 0.08, 0.10])
    if type_ == "rE":
        rE = r.choice([0.12, 0.14, 0.15, 0.16, 0.18])
        rU = (1 - d) * rE + d * rD
        rate_q = f"Its cost of equity is {_ep(rE)} and its cost of debt is {_ep(rD)}."
    else:
        rU = r.choice([0.10, 0.11, 0.12, 0.13, 0.14])
        rE = rU + de * (rU - rD)
        rate_q = f"Its unlevered cost of capital is {_ep(rU)} and its cost of debt is {_ep(rD)}."
    if rU - rD < 0.02:
        raise Avvis("r_U for nær r_D")
    wacc = rU - d * tau * rD                               # eksakt, = (E/V)r_E + (D/V)r_D(1 − τ)
    V1_x = F2 / (1 + wacc)
    V0_x = (F1 + V1_x) / (1 + wacc)
    V1 = rund(V1_x, 4)
    V0 = rund((F1 + V1) / (1 + wacc), 4)
    D0, D1 = rund(d * V0, 4), rund(d * V1, 4)
    valuta = r.choice(["$", "NOK"])
    enh = "$ million" if valuta == "$" else "NOK million"
    pen = (lambda x: f"${x}M") if valuta == "$" else (lambda x: f"NOK {x} million")
    q0 = (f"<p>You are valuing {navn}. It keeps {lev_q} and rebalances at every year-end. It will exist for two "
          f"years and generates free cash flows of {pen(F1)} at the end of year 1 and {pen(F2)} at the end of year "
          f"2, after which it is wound up with nothing left. {rate_q} The corporate tax rate is {_ep(tau)}. Interest "
          f"in each year is paid on the debt outstanding at the start of that year. Use four decimals.</p>")
    return dict(navn=navn, F1=F1, F2=F2, tau=tau, type=type_, form=form, de=de, d=d, rD=rD, rE=rE, rU=rU,
                wacc=wacc, V1_x=V1_x, V0_x=V0_x, V1=V1, V0=V0, D0=D0, D1=D1, enh=enh, q0=q0)


def _wacc_tekst(s):
    """Steget som finner r_wacc, i fasitens tall."""
    d, de, rE, rD, tau, rU = s["d"], s["de"], s["rE"], s["rD"], s["tau"], s["rU"]
    konv = (f"D/V = {_ep(de)}/(1 + {_ep(de)}) = {_et(d, 2, 4)}. " if s["form"] == "de" else
            f"D/E = {_et(d, 2)}/{_et(1 - d, 2)}. ")
    if s["type"] == "rE":
        return (f"{konv}r<sub>wacc</sub> = {_et(1 - d, 2, 4)} × {_ep(rE)} + {_et(d, 2, 4)} × {_ep(rD)} × "
                f"(1 − {_ep(tau)}) = {_ep((1 - d) * rE)} + {_ep(d * rD * (1 - tau))} = {_ep(s['wacc'])}.")
    return (f"{konv}r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {_ep(rU)} − "
            f"{_et(d, 2, 4)} × {_ep(tau)} × {_ep(rD)} = {_ep(s['wacc'])}.")


def _verdi_tekst(s):
    w = s["wacc"]
    return (f"V<sup>L</sup><sub>1</sub> = {s['F2']}/{_et(1 + w, 1, 6)} = {_t4(s['V1'])}. V<sup>L</sup><sub>0</sub> = "
            f"({s['F1']} + {_t4(s['V1'])})/{_et(1 + w, 1, 6)} = {_t4(s['V0'])}.")


_HJ_TO = ("This is the two-period valuation Kurbatov builds step by step, with a constant debt ratio. ",
          "r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − "
          "(D/V)τ<sub>c</sub>r<sub>D</sub>. V<sup>L</sup><sub>1</sub> = FCF<sub>2</sub>/(1 + r<sub>wacc</sub>), "
          "V<sup>L</sup><sub>0</sub> = (FCF<sub>1</sub> + V<sup>L</sup><sub>1</sub>)/(1 + r<sub>wacc</sub>). "
          "D<sub>t</sub> = (D/V) × V<sup>L</sup><sub>t</sub>.")


# ---------------------------------------------------------------------------
# wac-2p1 · Verdien med WACC-metoden over to perioder (H2025 E4 e)
# ---------------------------------------------------------------------------
@familie("wac-2p1", tema="wacc-apv", antall=6, tittel="Two periods: the value by the WACC method",
         hjelp=hjelp3(
             _HJ_TO[0] + "You need the levered value today by the WACC method.",
             _HJ_TO[1],
             "<p><b>Step 1: the weights.</b> Convert D/E to D/V if needed.</p>"
             "<p><b>Step 2: the after-tax WACC.</b> If you have r<sub>U</sub> rather than r<sub>E</sub>, use "
             "r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>.</p>"
             "<p><b>Step 3: roll back.</b> Value at date 1 first, then add the date-1 cash flow and discount once "
             "more.</p>"
             "<p><b>Watch out:</b> the tax shield is inside the rate. Do not add PV(TS) on top.</p>",
         ))
def _(r):
    s = _to_perioder(r)
    F1, F2, d, rU, rE, rD, tau, w = s["F1"], s["F2"], s["d"], s["rU"], s["rE"], s["rD"], s["tau"], s["wacc"]
    V0 = s["V0"]

    f_ru = F1 / (1 + rU) + F2 / (1 + rU) ** 2
    f_re = F1 / (1 + rE) + F2 / (1 + rE) ** 2
    pvts = tau * rD * d * s["V0_x"] / (1 + rU) + tau * rD * d * s["V1_x"] / (1 + rU) ** 2
    f_dbl = s["V0_x"] + pvts
    kand = [("R", None, V0),
            (_vt(f_ru), f"Discounted at r<sub>U</sub> = {_ep(rU)}, the pre-tax WACC. That is the unlevered value: "
                        f"the interest tax shield is missing.", f_ru),
            (_vt(f_re), f"Discounted at r<sub>E</sub> = {_ep(rE)}. The cost of equity goes with the cash flow to "
                        f"equity, not with free cash flow.", f_re),
            (_vt(f_dbl), "The tax shield counted twice: the after-tax WACC already contains it and PV(TS) was "
                         "added on top.", f_dbl)]
    f_rull = F1 / (1 + w) + s["V1_x"]
    kand.append((_vt(f_rull), "V<sup>L</sup><sub>1</sub> added to the date-0 value without discounting it. Rolling "
                              "back means discounting FCF<sub>1</sub> + V<sup>L</sup><sub>1</sub> together.", f_rull))
    if s["form"] == "de" and s["de"] < 1:
        if s["type"] == "rE":
            w_de = (1 - s["de"]) * rE + s["de"] * rD * (1 - tau)
        else:
            w_de = rU - s["de"] * tau * rD
        f_de = F1 / (1 + w_de) + F2 / (1 + w_de) ** 2
        kand.append((_vt(f_de), f"D/E = {_ep(s['de'])} used as the debt weight in the WACC. Convert it: D/V = "
                                f"(D/E)/(1 + D/E).", f_de))
    # Fellene står nærmere enn de vanlige 2 %: skjoldet er lite i to perioder, så V^U og
    # et dobbelttelt skjold ligger bare 0.9–1.6 % fra V^L. Alle er langt utenfor
    # toleransen på 0.1 %, og alternativene er lett å skille med to desimaler.
    feller = _velg(r, kand, rel=0.008)

    q = s["q0"] + (f"<p>What is the levered value of {s['navn']} today using the WACC method, in "
                   f"{s['enh']}?</p>")
    kort = (f"<p><b>{_vt(V0, s['V0_x'])}.</b> r<sub>wacc</sub> = {_ep(w)}. {_verdi_tekst(s)}</p>")
    full = (
        f"<p><b>The method.</b> The WACC method discounts free cash flow at the after-tax WACC. The firm "
        f"rebalances to a constant D/V, so one rate works for both years. Roll the value back from the last date: "
        f"you need V<sup>L</sup> at every date anyway, because the debt follows it.</p>"
        f"<p><b>Step 1: the rate.</b> {_wacc_tekst(s)}</p>"
        f"<p><b>Step 2: date 1.</b> After the year-1 cash flow is paid out, only the year-2 flow is left: "
        f"V<sup>L</sup><sub>1</sub> = {F2}/{_et(1 + w, 1, 6)} = {_t4(s['V1'])}.</p>"
        f"<p><b>Step 3: date 0.</b> V<sup>L</sup><sub>0</sub> = ({F1} + {_t4(s['V1'])})/{_et(1 + w, 1, 6)} = "
        f"<b>{_t4(V0)}</b>.</p>"
        f"<p><b>First check.</b> Discount directly: {F1}/{_et(1 + w, 1, 6)} + {F2}/{_et(1 + w, 1, 6)}² = "
        f"{_t4(F1 / (1 + w))} + {_t4(F2 / (1 + w) ** 2)} = {_t4(F1 / (1 + w) + F2 / (1 + w) ** 2)}. The same "
        f"arithmetic, so it catches slips only. Check 1 (WACC = APV) is the one the examiner runs: V<sup>U</sup> at "
        f"r<sub>U</sub> plus the shields at r<sub>U</sub> must give the same value. Once APV takes its debt from "
        f"this value path it is a fixed point, but it still catches a shield discounted at the wrong rate.</p>"
        f"<p><b>Remember:</b> FCF at r<sub>wacc</sub>, rolled back one date at a time. No PV(TS) on top.</p>"
    )
    return sporsmal(q, _alt(_vt(V0, s["V0_x"]), V0, feller), kort, full,
                    tall=tallsvar(verdi=s["V0_x"], enhet=s["enh"]))


# ---------------------------------------------------------------------------
# wac-adj1 · Gjeldsjusteringen ved utgangen av år 1 (H2025 E4 f)
# ---------------------------------------------------------------------------
@familie("wac-adj1", tema="wacc-apv", antall=5, tittel="Two periods: the debt adjustment after year 1",
         hjelp=hjelp3(
             _HJ_TO[0] + "You need the change in debt at the end of year 1.",
             _HJ_TO[1],
             "<p><b>Step 1: the value path</b> by the WACC method, at date 1 and date 0.</p>"
             "<p><b>Step 2: the debt at each date.</b> Multiply each value by D/V.</p>"
             "<p><b>Step 3: the difference.</b> Debt at date 0 minus debt at date 1 is what the firm repays.</p>"
             "<p><b>Watch out:</b> at date 1 the year-1 cash flow has already been paid out. V<sup>L</sup><sub>1</sub> "
             "is the value of what is left.</p>",
         ))
def _(r):
    s = _to_perioder(r)
    F1, F2, d, rU, tau, w = s["F1"], s["F2"], s["d"], s["rU"], s["tau"], s["wacc"]
    V0, V1, D0, D1 = s["V0"], s["V1"], s["D0"], s["D1"]
    adj = D0 - D1
    adj_x = d * (s["V0_x"] - s["V1_x"])
    if adj <= 0:
        raise Avvis("ingen nedbetaling")

    f_cum = D0 - d * (F1 + V1)
    f_zero = 0.0
    f_d1 = D1
    Vu1 = F2 / (1 + rU)
    Vu0 = (F1 + Vu1) / (1 + rU)
    f_vu = d * (Vu0 - Vu1)
    kand = [("R", None, adj),
            (_vt(f_cum), f"D<sub>1</sub> computed on {F1} + V<sup>L</sup><sub>1</sub>, the value before the year-1 "
                         f"cash flow is paid out. After the payout the firm is worth only V<sup>L</sup><sub>1</sub>.",
             f_cum),
            ("0.00", "The debt held at its date-0 level. A constant D/V forces the debt down when the value "
                     "falls.", f_zero),
            (_vt(f_d1), "This is the debt outstanding after the adjustment, D<sub>1</sub>, which is repaid at the "
                        "end of year 2. The question asks for the change at the end of year 1.", f_d1)]
    if not nær(f_vu, adj, 0.02):
        kand.append((_vt(f_vu), f"The debt set on the unlevered values at r<sub>U</sub> = {_ep(rU)}. The ratio "
                                f"applies to the levered value from the WACC method.", f_vu))
    if s["form"] == "de" and s["de"] < 1:
        f_de = s["de"] * (V0 - V1)
        kand.append((_vt(f_de), f"D/E = {_ep(s['de'])} used as the fraction of value held as debt. The fraction is "
                                f"D/V.", f_de))
    feller = _velg(r, kand)

    q = s["q0"] + (f"<p>By how much must {s['navn']} reduce its debt at the end of year 1 to keep its debt ratio, in "
                   f"{s['enh']}?</p>")
    kort = (f"<p><b>{_vt(adj, adj_x)}.</b> V<sup>L</sup><sub>0</sub> = {_t4(V0)} and V<sup>L</sup><sub>1</sub> = "
            f"{_t4(V1)}, so D<sub>0</sub> = {_t4(D0)} and D<sub>1</sub> = {_t4(D1)}. The firm repays {_t4(D0)} − "
            f"{_t4(D1)} = {_t4(adj)}.</p>")
    full = (
        f"<p><b>Why the debt moves.</b> A firm that keeps a constant D/V must hold D<sub>t</sub> = (D/V) × "
        f"V<sup>L</sup><sub>t</sub> at every date. Here the firm is running down towards its end, so its value "
        f"falls and the debt must fall with it. H2025 Exercise 4(f) asked for exactly this step.</p>"
        f"<p><b>Step 1: the rate.</b> {_wacc_tekst(s)}</p>"
        f"<p><b>Step 2: the value path.</b> {_verdi_tekst(s)}</p>"
        f"<p><b>Step 3: the debt.</b> D<sub>0</sub> = {_et(d, 2, 4)} × {_t4(V0)} = {_t4(D0)}. D<sub>1</sub> = "
        f"{_et(d, 2, 4)} × {_t4(V1)} = {_t4(D1)}.</p>"
        f"<p><b>Step 4: the adjustment.</b> {_t4(D0)} − {_t4(D1)} = <b>{_t4(adj)}</b> repaid at the end of year 1. "
        f"The shareholders fund it: in a flow-to-equity valuation it enters FCFE<sub>1</sub> with a minus sign. "
        f"The remaining {_t4(D1)} is repaid at the end of year 2.</p>"
        f"<p><b>First check.</b> D<sub>1</sub>/V<sup>L</sup><sub>1</sub> = {_t4(D1)}/{_t4(V1)} = "
        f"{_et(D1 / V1, 2, 4)}, the target ratio. An identity, but it catches D<sub>1</sub> computed on the value "
        f"before the payout, which would give a ratio far below target.</p>"
        f"<p><b>Remember:</b> when V<sup>L</sup> falls, the firm repays (D/V) × the fall in value.</p>"
    )
    return sporsmal(q, _alt(_vt(adj, adj_x), adj, feller), kort, full,
                    tall=tallsvar(verdi=adj_x, enhet=s["enh"]))


# ---------------------------------------------------------------------------
# wac-ts2 · PV(TS) over to perioder med D_t = d·V_t og r_U (H2025 E4 h)
# ---------------------------------------------------------------------------
@familie("wac-ts2", tema="wacc-apv", antall=5, tittel="Two periods: the tax shields and their present value",
         hjelp=hjelp3(
             _HJ_TO[0] + "You need the present value of the interest tax shields.",
             _HJ_TO[1] + " TS<sub>t</sub> = τ<sub>c</sub>r<sub>D</sub>D<sub>t−1</sub>.",
             "<p><b>Step 1: the debt path.</b> Value the firm by WACC at both dates and multiply by D/V.</p>"
             "<p><b>Step 2: the shields.</b> Each year's interest is charged on the debt at the start of that "
             "year.</p>"
             "<p><b>Step 3: the rate.</b> Name the debt policy before you discount.</p>"
             "<p><b>Watch out:</b> r<sub>D</sub> is the rate for a fixed debt schedule. This debt follows the "
             "firm's value.</p>",
         ))
def _(r):
    s = _to_perioder(r)
    d, rU, rD, tau = s["d"], s["rU"], s["rD"], s["tau"]
    D0, D1 = s["D0"], s["D1"]
    TS1, TS2 = rund(tau * rD * D0, 4), rund(tau * rD * D1, 4)
    p1, p2 = rund(TS1 / (1 + rU), 4), rund(TS2 / (1 + rU) ** 2, 4)
    pv = p1 + p2
    D0x, D1x = d * s["V0_x"], d * s["V1_x"]
    pv_x = tau * rD * (D0x / (1 + rU) + D1x / (1 + rU) ** 2)

    f_rd = tau * rD * (D0x / (1 + rD) + D1x / (1 + rD) ** 2)
    f_dt = tau * rD * D1x / (1 + rU)
    f_fix = tau * rD * D0x * (1 / (1 + rU) + 1 / (1 + rU) ** 2)
    kand = [("R", None, pv),
            (_t4(f_rd), f"Discounted at r<sub>D</sub> = {_ep(rD)}. That rate fits a fixed debt schedule. Here the "
                        f"debt is reset to a fraction of value every year, so the shields carry asset risk.", f_rd),
            (_t4(f_dt), "Interest charged on the closing balances, D<sub>1</sub> in year 1 and nothing in year 2. "
                        "The interest in year t is paid on D<sub>t−1</sub>.", f_dt),
            (_t4(f_fix), "The debt held at D<sub>0</sub> in both years. The ratio is constant, so the debt falls "
                         "with the value.", f_fix)]
    if s["form"] == "de" and s["de"] < 1:
        f_de = f_rd * 0 + tau * rD * s["de"] * (s["V0_x"] / (1 + rU) + s["V1_x"] / (1 + rU) ** 2)
        kand.append((_t4(f_de), f"D/E = {_ep(s['de'])} used as the fraction of value held as debt. The fraction is "
                                f"D/V.", f_de))
    feller = _velg(r, kand)

    ru_t = (f"r<sub>U</sub> is the pre-tax WACC: {_et(1 - d, 2, 4)} × {_ep(s['rE'])} + {_et(d, 2, 4)} × {_ep(rD)} = "
            f"{_ep(rU)}. " if s["type"] == "rE" else f"r<sub>U</sub> = {_ep(rU)}. ")
    u1, u2 = rund(s["F1"] / (1 + rU), 4), rund(s["F2"] / (1 + rU) ** 2, 4)
    Vu = u1 + u2
    q = s["q0"] + (f"<p>Find the interest tax shield in each year and their present value PV(TS) today, in "
                   f"{s['enh']}. Give PV(TS).</p>")
    kort = (f"<p><b>{_t4(pv)}.</b> D<sub>0</sub> = {_t4(D0)}, D<sub>1</sub> = {_t4(D1)}. TS<sub>1</sub> = {_t4(TS1)}, "
            f"TS<sub>2</sub> = {_t4(TS2)}, both at r<sub>U</sub> = {_ep(rU)}: {_t4(p1)} + {_t4(p2)} = "
            f"{_t4(pv)}.</p>")
    full = (
        f"<p><b>What PV(TS) is.</b> Interest is tax-deductible, so each year the firm pays τ<sub>c</sub> × "
        f"interest less tax. APV adds the present value of those savings to the unlevered value. Which rate "
        f"discounts them depends on the debt policy.</p>"
        f"<p><b>Step 1: the debt path.</b> {_wacc_tekst(s)} {_verdi_tekst(s)} D<sub>0</sub> = {_t4(D0)} and "
        f"D<sub>1</sub> = {_t4(D1)}.</p>"
        f"<p><b>Step 2: the shields.</b> TS<sub>1</sub> = {_ep(tau)} × {_ep(rD)} × {_t4(D0)} = {_t4(TS1)}. "
        f"TS<sub>2</sub> = {_ep(tau)} × {_ep(rD)} × {_t4(D1)} = {_t4(TS2)}.</p>"
        f"<p><b>Step 3: the rate.</b> The firm rebalances to a constant ratio, so its debt moves with the value "
        f"of its assets. So does the shield. The shields are discounted at r<sub>U</sub>, not at r<sub>D</sub>. "
        + ru_t + f"PV(TS) = {_t4(TS1)}/{_et(1 + rU, 1, 6)} + {_t4(TS2)}/{_et(1 + rU, 1, 6)}² = {_t4(p1)} + "
        f"{_t4(p2)} = <b>{_t4(pv)}</b>.</p>"
        f"<p><b>Check 1: WACC = APV.</b> V<sup>U</sup> = {s['F1']}/{_et(1 + rU, 1, 6)} + {s['F2']}/"
        f"{_et(1 + rU, 1, 6)}² = {_t4(u1)} + {_t4(u2)} = {_t4(Vu)}. Adding PV(TS) gives {_t4(Vu)} + {_t4(pv)} = "
        f"{_t4(Vu + pv)}, the WACC value {_t4(s['V0'])} up to rounding in the fourth decimal. It is a fixed point, since the debt came from the "
        f"WACC path, but at r<sub>D</sub> the two routes would disagree.</p>"
        f"<p><b>Remember:</b> TS<sub>t</sub> = τ<sub>c</sub>r<sub>D</sub>D<sub>t−1</sub>, discounted at "
        f"r<sub>U</sub> when the firm keeps a constant ratio.</p>"
    )
    return sporsmal(q, _alt(_t4(pv), pv, feller), kort, full, tall=tallsvar(verdi=pv_x, enhet=s["enh"]))


# ---------------------------------------------------------------------------
# wac-fte1 · Flow to equity med voksende evigrente (PS2 E6 h)
# ---------------------------------------------------------------------------
@familie("wac-fte1", tema="wacc-apv", antall=5, tittel="Flow to equity with growing debt",
         hjelp=hjelp3(
             "This is the flow-to-equity method: value the equity directly from the cash the shareholders receive. "
             "You need the value of the equity.",
             "FCFE = FCF − (1 − τ<sub>c</sub>) × interest + net borrowing. E = FCFE<sub>1</sub>/(r<sub>E</sub> − g). "
             "With a constant ratio the debt grows at g, so net borrowing next year is g × D<sub>0</sub>.",
             "<p><b>Step 1: free cash flow.</b> EBIT after tax, plus depreciation, minus investment.</p>"
             "<p><b>Step 2: the lenders' share.</b> Subtract the interest after its tax saving.</p>"
             "<p><b>Step 3: net borrowing.</b> New debt raised next year goes to the shareholders.</p>"
             "<p><b>Step 4: discount at r<sub>E</sub></b> with the growing perpetuity.</p>"
             "<p><b>Watch out:</b> FTE gives the equity, not the firm.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    EBIT = r.choice([200, 300, 400, 500, 600])
    tau = r.choice([0.25, 0.30, 0.40])
    D0 = r.choice([800, 1000, 1500, 2000])
    rD = r.choice([0.04, 0.05, 0.06])
    g = r.choice([0.02, 0.03])
    rE = r.choice([0.10, 0.11, 0.12, 0.13, 0.15])
    F1 = EBIT * (1 - tau)
    rente = rD * D0
    nb = g * D0
    fcfe = F1 - (1 - tau) * rente + nb
    if fcfe <= 0 or D0 / (D0 + fcfe / (rE - g)) > 0.6:
        raise Avvis("urimelig gjeldsgrad")
    E_x = fcfe / (rE - g)

    f_tax = (F1 - rente + nb) / (rE - g)
    f_nb = (F1 - (1 - tau) * rente) / (rE - g)
    f_fcf = F1 / (rE - g)
    f_sign = (F1 - (1 - tau) * rente - nb) / (rE - g)
    kand = [("R", None, E_x),
            (_vt(f_tax), f"The full interest of {_et(rente)} subtracted. Interest is deductible, so it costs the "
                         f"shareholders only {_et(rente)} × (1 − {_ep(tau)}).", f_tax),
            (_vt(f_nb), f"The net borrowing of {_et(nb)} left out. The debt grows with the firm and the new debt "
                        f"raised each year goes to the shareholders.", f_nb),
            (_vt(f_fcf), "Free cash flow discounted at r<sub>E</sub>. That counts the lenders' cash flow as the "
                         "shareholders'.", f_fcf),
            (_vt(f_sign), "The net borrowing subtracted. Raising new debt brings cash in for the shareholders.",
             f_sign)]
    feller = _velg(r, kand)

    q = (f"<p>Next year {navn} will earn EBIT of NOK {EBIT} million. Capital expenditure equals depreciation and "
         f"working capital does not change. The corporate tax rate is {_ep(tau)}. The firm has NOK {tall(D0)} "
         f"million of debt at {_ep(rD)}. It keeps a constant debt-to-equity ratio, so its debt grows at {_ep(g)} a "
         f"year like its cash flows and any new borrowing is paid out to the shareholders. Its cost of equity is "
         f"{_ep(rE)}.</p><p>What is the equity worth by the flow-to-equity method, in NOK million?</p>")

    V = E_x + D0
    wacc = (E_x / V) * rE + (D0 / V) * rD * (1 - tau)
    kort = (f"<p><b>{_vt(E_x)}.</b> FCFE = {_et(F1)} − (1 − {_ep(tau)}) × {_et(rente)} + {_et(nb)} = {_et(fcfe)}. "
            f"E = {_et(fcfe)}/({_ep(rE)} − {_ep(g)}) = {_vt(E_x)}.</p>")
    full = (
        f"<p><b>The method.</b> Flow to equity follows the cash that actually reaches the shareholders and "
        f"discounts it at their own rate, r<sub>E</sub>. The interest leaves after tax, so the tax shield arrives as "
        f"cash and needs no separate term. New borrowing is cash the shareholders receive.</p>"
        f"<p><b>Step 1: FCF.</b> {EBIT} × (1 − {_ep(tau)}) = {_et(F1)}, since CapEx equals depreciation and NWC is "
        f"flat.</p>"
        f"<p><b>Step 2: interest after tax.</b> {_ep(rD)} × {tall(D0)} = {_et(rente)}, which costs {_et(rente)} × "
        f"(1 − {_ep(tau)}) = {_et((1 - tau) * rente)}.</p>"
        f"<p><b>Step 3: net borrowing.</b> The debt grows at {_ep(g)}: {_ep(g)} × {tall(D0)} = {_et(nb)}.</p>"
        f"<p><b>Step 4: FCFE and E.</b> {_et(F1)} − {_et((1 - tau) * rente)} + {_et(nb)} = {_et(fcfe)}. E = "
        f"{_et(fcfe)}/({_ep(rE)} − {_ep(g)}) = <b>{_vt(E_x)}</b>.</p>"
        f"<p><b>First check: the WACC route.</b> V<sup>L</sup> = {_vt(E_x)} + {tall(D0)} = {_vt(V)}. r<sub>wacc</sub> "
        f"= ({_vt(E_x)}/{_vt(V)}) × {_ep(rE)} + ({tall(D0)}/{_vt(V)}) × {_ep(rD)} × (1 − {_ep(tau)}) = "
        f"{_pct(wacc, 4)} and {_et(F1)}/({_pct(wacc, 4)} − {_ep(g)}) gives back {_vt(V)} up to rounding. Like "
        f"WACC = APV this is a fixed point, but it fails if net borrowing is left out.</p>"
        f"<p><b>Remember:</b> FCFE = FCF − (1 − τ<sub>c</sub>) × interest + net borrowing, discounted at "
        f"r<sub>E</sub>. Add the debt to get the firm.</p>"
    )
    return sporsmal(q, _alt(_vt(E_x), E_x, feller), kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# wac-perm1 · Permanent gjeld: WACC-en som stemmer med APV (A2, PS2 E9)
# ---------------------------------------------------------------------------
@familie("wac-perm1", tema="wacc-apv", antall=5, tittel="Permanent debt: the WACC that matches APV",
         hjelp=hjelp3(
             "This is a firm with a fixed amount of permanent debt and no growth. You need the after-tax WACC that "
             "values it correctly.",
             "APV: V<sup>L</sup> = FCF/r<sub>U</sub> + τ<sub>c</sub>D. Then r<sub>wacc</sub> = r<sub>U</sub>(1 − "
             "τ<sub>c</sub>D/V<sup>L</sup>), which is the same as FCF/V<sup>L</sup>.",
             "<p><b>Step 1: APV first.</b> The unlevered value at r<sub>U</sub>, plus the shield of fixed permanent "
             "debt.</p>"
             "<p><b>Step 2: the matching rate.</b> Measure the debt against the levered value and use the formula "
             "for permanent debt.</p>"
             "<p><b>Watch out:</b> the shortcut r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> assumes the shield "
             "is as risky as the assets. Permanent debt has a safe shield.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    FCF = r.choice([6, 8, 9, 10, 12, 20, 40])
    rU = r.choice([0.09, 0.10, 0.11, 0.12])
    Vu_x = FCF / rU
    d0 = r.choice([0.25, 0.30, 0.40, 0.50])
    D = round(Vu_x * d0)
    if D < 5:
        raise Avvis("for lite gjeld")
    rD = r.choice([0.04, 0.05, 0.06])
    tau = r.choice([0.22, 0.25, 0.40])
    VL_x = Vu_x + tau * D
    w_x = rU * (1 - tau * D / VL_x)
    Vu = rund(Vu_x, 4)
    VL = Vu + tau * D
    w = rU * (1 - tau * D / VL)

    f_short = rU - (D / VL_x) * tau * rD
    f_vu = rU * (1 - tau * D / Vu_x)
    f_ru = FCF / (Vu_x + tau * rD * D / rU)
    kand = [("R", None, w),
            (_vp(f_short), "The constant-ratio shortcut r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>. It treats "
                           "the shield as being as risky as the assets. A fixed, permanent shield is as safe as "
                           "the debt.", f_short),
            (_vp(f_vu), f"The debt measured against V<sup>U</sup> = {_et(Vu, 0, 4)} instead of the levered value. The "
                        f"ratio in the formula is D/V<sup>L</sup>.", f_vu),
            (_vp(f_ru), "The shield discounted at r<sub>U</sub>. A fixed, permanent shield is as safe as the "
                        "interest and is discounted at r<sub>D</sub>, which gives τ<sub>c</sub>D.", f_ru),
            (_vp(rU), "r<sub>U</sub> used as the WACC. That values the firm as if it had no debt and leaves the "
                      "tax shield out.", rU)]
    feller = _velg(r, kand)

    q = (f"<p>{navn} has free cash flow of NOK {FCF} million a year forever, with no growth. Its unlevered cost of "
         f"capital is {_ep(rU)}. It has NOK {D} million of permanent debt at r<sub>D</sub> = {_ep(rD)}, an amount it "
         f"will never change. The corporate tax rate is {_ep(tau)}.</p>"
         f"<p>Which after-tax WACC values this firm correctly, in percent?</p>")

    kort = (f"<p><b>{_vp(w, w_x)}.</b> V<sup>L</sup> = {FCF}/{_ep(rU)} + {_ep(tau)} × {D} = {_et(Vu, 0, 4)} + "
            f"{_et(tau * D)} = {_et(VL, 0, 4)}. r<sub>wacc</sub> = {_ep(rU)} × (1 − {_ep(tau)} × {D}/{_et(VL, 0, 4)}) = "
            f"{_pct(w, 4)}.</p>")
    full = (
        f"<p><b>Why APV comes first.</b> With a fixed, permanent amount of debt the shield τ<sub>c</sub>r<sub>D</sub>D "
        f"is a level perpetuity as safe as the interest. Discounted at r<sub>D</sub> it is worth τ<sub>c</sub>D. "
        f"Nothing grows, so D/V stays constant and the WACC method still works, but with its own rate (PS2 "
        f"Exercise 9, BDM eq. 18.21).</p>"
        f"<p><b>Step 1: APV.</b> V<sup>U</sup> = {FCF}/{_ep(rU)} = {_et(Vu, 0, 4)}. PV(TS) = {_ep(tau)} × {D} = "
        f"{_et(tau * D)}. V<sup>L</sup> = {_et(VL, 0, 4)}.</p>"
        f"<p><b>Step 2: the matching WACC.</b> r<sub>wacc</sub> = r<sub>U</sub>(1 − τ<sub>c</sub>D/V<sup>L</sup>) = "
        f"{_ep(rU)} × (1 − {_ep(tau)} × {D}/{_et(VL, 0, 4)}) = <b>{_pct(w, 4)}</b>.</p>"
        f"<p><b>First check.</b> Forwards: {FCF}/{_pct(w, 4)} = {_et(FCF / w, 2, 2)}, the APV value. That is an "
        f"identity, since r<sub>U</sub>(1 − τ<sub>c</sub>D/V<sup>L</sup>) = FCF/V<sup>L</sup> here. The contrast is "
        f"what teaches: the shortcut r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {_pct(f_short, 4)} would "
        f"value the firm at {_et(FCF / f_short, 2, 2)}, below APV, because it discounts a safe shield as if it "
        f"were risky.</p>"
        f"<p><b>Remember:</b> permanent debt without growth: r<sub>wacc</sub> = r<sub>U</sub>(1 − "
        f"τ<sub>c</sub>D/V<sup>L</sup>), solved together with V<sup>L</sup> = FCF/r<sub>wacc</sub>.</p>"
    )
    return sporsmal(q, _alt(_vp(w, w_x), w, feller), kort, full, tall=tallsvar(verdi=w_x * 100, skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# wac-perm2 · Permanent gjeld: D(1 − τ)-vekter og r_E med (1 − τ) (A1)
# ---------------------------------------------------------------------------
_HJ_PERM_A = hjelp3(
    "This is unlevering a twin whose debt is a fixed, permanent amount. You need its unlevered cost of capital.",
    "With fixed permanent debt: r<sub>U</sub> = [E r<sub>E</sub> + D(1 − τ<sub>c</sub>) r<sub>D</sub>]/[E + D(1 − "
    "τ<sub>c</sub>)]. The shield τ<sub>c</sub>D is safe, so the risky assets are worth E + D(1 − τ<sub>c</sub>).",
    "<p><b>Step 1: the debt weight.</b> Multiply the debt by (1 − τ<sub>c</sub>).</p>"
    "<p><b>Step 2: the weighted average.</b> Weight r<sub>E</sub> by E and r<sub>D</sub> by D(1 − τ<sub>c</sub>), "
    "then divide by E + D(1 − τ<sub>c</sub>).</p>"
    "<p><b>Watch out:</b> the tax factor goes on the weight, not on r<sub>D</sub>. Plain weights belong to a "
    "constant ratio.</p>")
_HJ_PERM_B = hjelp3(
    "This is MM II with a fixed, permanent amount of debt. You need the cost of equity.",
    "Fixed permanent debt: r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − "
    "r<sub>D</sub>). With a constant ratio the (1 − τ<sub>c</sub>) drops out.",
    "<p><b>Step 1: D/E.</b> Use market values and turn D/V into D/E if needed.</p>"
    "<p><b>Step 2: the spread.</b> r<sub>U</sub> − r<sub>D</sub>, before tax.</p>"
    "<p><b>Step 3: scale by D/E and by (1 − τ<sub>c</sub>)</b> and add to r<sub>U</sub>.</p>"
    "<p><b>Watch out:</b> the tax factor belongs here only because the debt is fixed and permanent.</p>")


@familie("wac-perm2", tema="wacc-apv", antall=5, tittel="Permanent debt: D(1 − τ) in the weights",
         hjelp=_HJ_PERM_A)
def _(r):
    navn = r.choice(NAVN)
    tau = r.choice([0.20, 0.25, 0.40])
    rD = r.choice([0.04, 0.05, 0.06])
    type_ = r.choice(["A", "B"])
    if type_ == "A":
        E = r.choice([400, 500, 600, 750, 900])
        D = r.choice([200, 300, 400, 500])
        rE = r.choice([0.10, 0.11, 0.12, 0.13, 0.14])
        Dt = D * (1 - tau)
        svar = (E * rE + Dt * rD) / (E + Dt)
        f_plain = (E * rE + D * rD) / (E + D)
        f_both = (E * rE + Dt * rD * (1 - tau)) / (E + Dt)
        f_wacc = (E * rE + D * rD * (1 - tau)) / (E + D)
        kand = [("R", None, svar),
                (_vp(f_plain), "Plain market-value weights E/V and D/V. They assume a target ratio. This debt is "
                               "fixed, so its shield is safe and the debt enters as D(1 − τ<sub>c</sub>).", f_plain),
                (_vp(f_both), "The tax factor put on both the weight and the rate. Only the weight changes: the "
                              "lenders still earn r<sub>D</sub> before tax.", f_both),
                (_vp(f_wacc), "This is the after-tax WACC, the rate for the levered firm. r<sub>U</sub> is the rate "
                              "for the assets alone.", f_wacc)]
        feller = _velg(r, kand)
        q = (f"<p>{navn} is listed. Its equity is worth NOK {E} million and it has NOK {D} million of permanent, "
             f"risk-free debt at {_ep(rD)}, an amount it never changes. Its cost of equity is {_ep(rE)}. The "
             f"corporate tax rate is {_ep(tau)}.</p><p>What is {gen(navn)} unlevered cost of capital, in "
             f"percent?</p>")
        kort = (f"<p><b>{_vp(svar)}.</b> D(1 − τ<sub>c</sub>) = {D} × {_et(1 - tau, 2)} = {_et(Dt)}. r<sub>U</sub> = "
                f"({E} × {_ep(rE)} + {_et(Dt)} × {_ep(rD)})/({E} + {_et(Dt)}) = {_pct(svar, 4)}.</p>")
        Vu = E + Dt
        full = (
            f"<p><b>Why the weights change.</b> The levered firm holds the risky assets and the tax shield. With a "
            f"fixed, permanent amount of debt the shield is worth τ<sub>c</sub>D and is as safe as the debt. Take it "
            f"out and the risky assets are worth V<sup>U</sup> = E + D − τ<sub>c</sub>D = E + D(1 − "
            f"τ<sub>c</sub>). That is why Kurbatov weights the debt by D(1 − τ<sub>c</sub>) here (lecture 8, slide "
            f"18).</p>"
            f"<p><b>Step 1: the weight.</b> D(1 − τ<sub>c</sub>) = {D} × {_et(1 - tau, 2)} = {_et(Dt)}, so "
            f"V<sup>U</sup> = {E} + {_et(Dt)} = {_et(Vu)}.</p>"
            f"<p><b>Step 2: r<sub>U</sub>.</b> ({E} × {_ep(rE)} + {_et(Dt)} × {_ep(rD)})/{_et(Vu)} = "
            f"({_et(E * rE)} + {_et(Dt * rD)})/{_et(Vu)} = <b>{_pct(svar, 4)}</b>.</p>"
            f"<p><b>First check: the returns in money.</b> Investors in the levered firm expect {E} × {_ep(rE)} + "
            f"{D} × {_ep(rD)} = {_et(E * rE)} + {_et(D * rD)} = {_et(E * rE + D * rD)} a year. The safe shield, "
            f"worth τ<sub>c</sub>D = {_et(tau * D)}, earns r<sub>D</sub>: {_et(tau * D * rD)}. The rest, "
            f"{_et(E * rE + D * rD - tau * D * rD)}, is earned by the risky assets, worth V<sup>U</sup> = "
            f"V<sup>L</sup> − τ<sub>c</sub>D = {_et(E + D)} − {_et(tau * D)} = {_et(Vu)}: "
            f"{_et(E * rE + D * rD - tau * D * rD)}/{_et(Vu)} = {_pct(svar, 4)}. This rearranges the same formula, "
            f"so it confirms the arithmetic. Only the word permanent tells you to use these weights.</p>"
            f"<p><b>Remember:</b> fixed permanent debt enters the weights as D(1 − τ<sub>c</sub>). A target ratio "
            f"keeps the plain weights.</p>"
        )
        hj = _HJ_PERM_A
    else:
        rU = r.choice([0.09, 0.10, 0.11, 0.12])
        form = r.choice(["de", "dv"])
        if form == "de":
            de = r.choice([0.25, 0.50, 0.60, 1.00])
            dv = de / (1 + de)
            lev = f"a debt-to-equity ratio of {_et(de, 2)} at market values"
        else:
            dv = r.choice([0.20, 0.375, 0.50])
            de = dv / (1 - dv)
            lev = f"a debt-to-value ratio of {_et(dv, 2)} at market values"
        svar = rU + de * (1 - tau) * (rU - rD)
        f_notax = rU + de * (rU - rD)
        f_dv = rU + dv * (1 - tau) * (rU - rD)
        f_rdt = rU + de * (rU - rD * (1 - tau))
        kand = [("R", None, svar),
                (_vp(f_notax), "MM II without the tax factor. That form fits a firm that keeps a constant ratio. "
                               "With fixed permanent debt the shield is safe and the premium shrinks by (1 − "
                               "τ<sub>c</sub>).", f_notax),
                (_vp(f_dv), "D/V used where MM II needs D/E.", f_dv),
                (_vp(f_rdt), "The after-tax cost of debt put into the spread. The spread is r<sub>U</sub> − "
                             "r<sub>D</sub> before tax. The tax factor multiplies D/E.", f_rdt)]
        feller = _velg(r, kand)
        q = (f"<p>{navn} has an unlevered cost of capital of {_ep(rU)}. It has issued a fixed amount of permanent "
             f"debt at r<sub>D</sub> = {_ep(rD)}, an amount it will never change. It currently has {lev}. The "
             f"corporate tax rate is {_ep(tau)}.</p><p>What is {gen(navn)} cost of equity, in percent?</p>")
        de_t = (f"D/E = {_et(dv, 2)}/{_et(1 - dv, 2)} = {_et(de, 2, 4)}. " if form == "dv" else "")
        kort = (f"<p><b>{_vp(svar)}.</b> {de_t}r<sub>E</sub> = {_ep(rU)} + {_et(de, 2, 4)} × (1 − {_ep(tau)}) × "
                f"({_ep(rU)} − {_ep(rD)}) = {_pct(svar, 4)}.</p>")
        full = (
            f"<p><b>Why the tax factor appears.</b> With fixed permanent debt the tax shield is a safe asset worth "
            f"τ<sub>c</sub>D. Part of the firm's value is then riskless, so less risk is left for the shareholders "
            f"than under a target ratio. MM II becomes r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − "
            f"τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>), the same relation as the D(1 − τ<sub>c</sub>) weights "
            f"(lecture 8, slide 18).</p>"
            f"<p><b>Step 1: D/E.</b> {de_t or 'D/E = ' + _et(de, 2) + '. '}</p>"
            f"<p><b>Step 2: the premium.</b> {_et(de, 2, 4)} × (1 − {_ep(tau)}) × ({_ep(rU)} − {_ep(rD)}) = "
            f"{_pct(de * (1 - tau) * (rU - rD), 4)}.</p>"
            f"<p><b>Step 3: r<sub>E</sub>.</b> {_ep(rU)} + {_pct(de * (1 - tau) * (rU - rD), 4)} = "
            f"<b>{_pct(svar, 4)}</b>.</p>"
            f"<p><b>First check.</b> Unlever back with D(1 − τ<sub>c</sub>) weights per unit of equity: "
            f"[{_pct(svar, 4)} + {_et(de, 2, 4)} × {_et(1 - tau, 2)} × {_ep(rD)}]/(1 + {_et(de, 2, 4)} × "
            f"{_et(1 - tau, 2)}) = {_pct((svar + de * (1 - tau) * rD) / (1 + de * (1 - tau)), 4)} = r<sub>U</sub>. An "
            f"identity: it confirms the arithmetic, not the choice of formula.</p>"
            f"<p><b>Remember:</b> (1 − τ<sub>c</sub>) in MM II only when the question says the debt is fixed and "
            f"permanent.</p>"
        )
        hj = _HJ_PERM_B
    return sporsmal(q, _alt(_vp(svar), svar, feller), kort, full, hjelp=hj,
                    tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# wac-ic1 · Konstant rentedekning: V^L = (1 + τk)V^U (B1, PS2 E5)
# ---------------------------------------------------------------------------
@familie("wac-ic1", tema="wacc-apv", antall=5, tittel="Constant interest coverage",
         hjelp=hjelp3(
             "This is a debt policy where interest is set as a fixed share of free cash flow each year. You need "
             "the levered value.",
             "Interest<sub>t</sub> = k × FCF<sub>t</sub>. The shield τ<sub>c</sub>k × FCF<sub>t</sub> is a slice of "
             "FCF with the same risk, so PV(TS) = τ<sub>c</sub>k × V<sup>U</sup> and V<sup>L</sup> = (1 + "
             "τ<sub>c</sub>k)V<sup>U</sup>.",
             "<p><b>Step 1: the unlevered value</b> at r<sub>U</sub>, as a growing perpetuity.</p>"
             "<p><b>Step 2: scale it up.</b> Multiply by one plus τ<sub>c</sub> times k.</p>"
             "<p><b>Watch out:</b> k is interest divided by FCF, not debt divided by FCF. The shield moves with FCF, "
             "so it takes the rate of FCF.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    F1 = r.choice([2.5, 4, 5, 6, 8, 10])
    g = r.choice([0.02, 0.03, 0.04])
    rU = r.choice([0.09, 0.095, 0.10, 0.11])
    k = r.choice([0.20, 0.25, 0.30, 0.40])
    rD = r.choice([0.05, 0.06])
    tau = r.choice([0.22, 0.25, 0.40])
    if rD - g < 0.015:
        raise Avvis("r_D for nær g")
    Vu_x = F1 / (rU - g)
    VL_x = (1 + tau * k) * Vu_x
    Vu = rund(Vu_x, 4)
    VL = (1 + tau * k) * Vu

    f_rd = Vu_x + tau * k * F1 / (rD - g)
    Dp = k * F1 / rD
    f_perm = Vu_x + tau * Dp
    f_nt = (1 + k) * Vu_x
    kand = [("R", None, VL),
            (_vt(f_rd), f"The growing shield discounted at r<sub>D</sub> = {_ep(rD)}. It is a slice of FCF and as "
                        f"risky as FCF.", f_rd),
            (_vt(f_perm), f"The debt treated as permanent: D = {_et(k * F1)}/{_ep(rD)} = {_et(Dp, 0, 4)} and "
                          f"τ<sub>c</sub>D added. This debt grows with the cash flow.", f_perm),
            (_vt(f_nt), "The tax rate left out: (1 + k)V<sup>U</sup>. Only the tax saved on the interest adds "
                        "value, not the interest itself.", f_nt)]
    feller = _velg(r, kand)

    q = (f"<p>An expansion by {navn} will produce free cash flow of NOK {_et(F1)} million next year, growing at "
         f"{_ep(g)} a year forever. Its unlevered cost of capital is {_ep(rU)}. The firm sets its interest payments "
         f"each year at {_ep(k)} of the expansion's free cash flow and borrows at r<sub>D</sub> = {_ep(rD)}. The "
         f"corporate tax rate is {_ep(tau)}.</p><p>What is the levered value of the expansion, in NOK million?</p>")
    kort = (f"<p><b>{_vt(VL, VL_x)}.</b> V<sup>U</sup> = {_et(F1)}/({_ep(rU)} − {_ep(g)}) = {_t4(Vu)}. "
            f"V<sup>L</sup> = (1 + {_ep(tau)} × {_ep(k)}) × {_t4(Vu)} = {_et(1 + tau * k, 2)} × {_t4(Vu)} = "
            f"{_t4(VL)}.</p>")
    D1 = k * F1 / rD
    d_x = D1 / VL_x
    w_x = rU - d_x * tau * rD
    full = (
        f"<p><b>The policy.</b> Constant interest coverage (lecture 8, slide 17) sets the interest each year at a "
        f"share k of free cash flow. The tax saving is then τ<sub>c</sub>k × FCF<sub>t</sub>, a fixed slice of FCF. "
        f"A fixed slice of a cash flow has the same risk as the cash flow, so it is worth the same slice of its "
        f"value: PV(TS) = τ<sub>c</sub>k × V<sup>U</sup>. No circularity: you never need V<sup>L</sup> to find "
        f"the debt.</p>"
        f"<p><b>Step 1: V<sup>U</sup>.</b> {_et(F1)}/({_ep(rU)} − {_ep(g)}) = {_t4(Vu)}.</p>"
        f"<p><b>Step 2: the shield.</b> PV(TS) = {_ep(tau)} × {_ep(k)} × {_t4(Vu)} = {_t4(tau * k * Vu)}.</p>"
        f"<p><b>Step 3: V<sup>L</sup>.</b> {_t4(Vu)} + {_t4(tau * k * Vu)} = <b>{_t4(VL)}</b>.</p>"
        f"<p><b>Check 1: the WACC route.</b> Next year's interest is {_ep(k)} × {_et(F1)} = {_et(k * F1)}, so the "
        f"debt is {_et(k * F1)}/{_ep(rD)} = {_et(D1, 0, 4)} and D/V = {tall(d_x, 6)}. r<sub>wacc</sub> = {_ep(rU)} − "
        f"{tall(d_x, 6)} × {_ep(tau)} × {_ep(rD)} = {_pct(w_x, 4)} and {_et(F1)}/({_pct(w_x, 4)} − {_ep(g)}) = "
        f"{_et(F1 / (w_x - g), 2, 2)}. The debt grows with FCF, so D/V is constant. The weight came from the "
        f"answer, so this confirms the rate on the shield and the arithmetic, not the policy.</p>"
        f"<p><b>Remember:</b> interest = k × FCF gives V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup>.</p>"
    )
    return sporsmal(q, _alt(_vt(VL, VL_x), VL, feller), kort, full,
                    tall=tallsvar(verdi=VL_x, enhet="NOK million"))


# ---------------------------------------------------------------------------
# wac-cap1 · Gjeldskapasitet og finansieringen av et prosjekt (B2, forelesning 7)
# ---------------------------------------------------------------------------
@familie("wac-cap1", tema="wacc-apv", antall=5, tittel="Debt capacity: how a project is financed",
         hjelp=hjelp3(
             "This is a project's debt capacity: the debt the firm must add to keep its debt ratio once the project "
             "is on its books. You need the new borrowing.",
             "Debt capacity D<sub>0</sub> = d × V<sup>L</sup><sub>0</sub>, with V<sup>L</sup> the project's value "
             "by the WACC method. Excess cash is negative debt, so spending it raises net debt one for one.",
             "<p><b>Step 1: the project's value</b> at the WACC.</p>"
             "<p><b>Step 2: the debt capacity.</b> The target ratio times the value, not times the cost or the "
             "NPV.</p>"
             "<p><b>Step 3: the new borrowing.</b> Net debt must rise by the debt capacity. The cash the firm spends "
             "covers part of it.</p>"
             "<p><b>Watch out:</b> the debt follows value, not what the project cost.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    F1 = r.choice([3, 4, 5, 6, 8])
    g = r.choice([0.0, 0.02, 0.03])
    w = r.choice([0.08, 0.09, 0.10, 0.11])
    d = r.choice([0.40, 0.50, 0.60])
    I = r.choice([20, 25, 28, 30, 40])
    C = r.choice([10, 15, 20])
    V_x = F1 / (w - g)
    V = rund(V_x, 4)
    npv = V - I
    if npv <= 5 or d * V <= C + 3:
        raise Avvis("prosjektet må ha positiv NPV og gi ny gjeld")
    if nær(d * V, I, 0.05):
        # Kapasitet lik kostnaden: da gir «kostnad − kasse» også riktig tall.
        raise Avvis("gjeldskapasiteten er nesten lik kostnaden")
    cap = rund(d * V, 4)
    B = cap - C
    B_x = d * V_x - C
    utb = cap - I

    f_noc = cap
    f_npv = d * npv - C
    f_cost = d * I - C
    f_full = I - C
    kand = [("R", None, B),
            (_vt(f_noc), f"The {C} of excess cash ignored. Spending the cash raises net debt as much as borrowing "
                         f"does.", f_noc),
            (_vt(f_npv), "The ratio applied to the NPV. Debt capacity follows the project's whole value, which "
                         "includes what it cost.", f_npv),
            (_vt(f_cost), f"The ratio applied to the cost of {I}. The debt a project supports follows its value, "
                          f"not its price tag.", f_cost),
            (_vt(f_full), f"Only the cost not covered by cash borrowed: {I} − {C}. That ignores the target ratio, "
                          f"which ties the debt to the project's value.", f_full)]
    feller = _velg(r, kand)

    vekst = "forever, with no growth" if g == 0 else f"growing at {_ep(g)} a year forever"
    q = (f"<p>{navn} considers a project that costs NOK {I} million today and produces free cash flow of NOK {F1} "
         f"million from next year, {vekst}. The firm's after-tax WACC is {_ep(w)} and it keeps its net debt at "
         f"{_ep(d)} of the value of its assets, rebalancing as values change. To finance the project it will use "
         f"NOK {C} million of excess cash and borrow whatever else it needs to keep that ratio. Any gap or surplus "
         f"is settled with the shareholders.</p>"
         f"<p>How much new debt does {navn} raise today, in NOK million?</p>")
    kort = (f"<p><b>{_vt(B, B_x)}.</b> V<sup>L</sup> = {F1}/({_ep(w)}" + (f" − {_ep(g)}" if g else "")
            + f") = {_t4(V)}. Debt capacity = {_ep(d)} × {_t4(V)} = {_t4(cap)}. New debt = {_t4(cap)} − {C} = "
              f"{_t4(B)}.</p>")
    full = (
        f"<p><b>What debt capacity is.</b> A firm that keeps a target ratio must carry debt in proportion to the "
        f"value of everything it owns. A new project adds V<sup>L</sup> of value, so the firm must add (D/V) × "
        f"V<sup>L</sup> of net debt: the project's debt capacity (lecture 7, PS2 Exercise 3). Excess cash is "
        f"negative debt, so spending it counts towards that increase.</p>"
        f"<p><b>Step 1: the project's value.</b> V<sup>L</sup> = {F1}/({_ep(w)}" + (f" − {_ep(g)}" if g else "")
        + f") = {_t4(V)}. NPV = {_t4(V)} − {I} = {_t4(npv)}.</p>"
        f"<p><b>Step 2: the debt capacity.</b> {_ep(d)} × {_t4(V)} = {_t4(cap)}.</p>"
        f"<p><b>Step 3: the financing.</b> Net debt must rise by {_t4(cap)}. The {C} of cash covers part, so the "
        f"firm borrows {_t4(cap)} − {C} = <b>{_t4(B)}</b>.</p>"
        f"<p><b>Check 3: who gets the NPV.</b> The firm raises {C} + {_t4(B)} = {_t4(cap)} and spends {I}"
        + (f", so {_t4(utb)} is paid out to the shareholders today" if utb > 0 else
           f", so the shareholders must put in {_t4(-utb)} today")
        + f". Their equity rises by {_t4(V)} − {_t4(cap)} = {_t4(V - cap)}. Together: {_t4(V - cap)} "
          f"{'+' if utb >= 0 else '−'} {_t4(abs(utb))} = {_t4(V - cap + utb)} = NPV. The lenders pay a fair price "
          f"and gain nothing.</p>"
          f"<p><b>Remember:</b> debt capacity = (D/V) × V<sup>L</sup> of the project, never of its cost.</p>"
    )
    return sporsmal(q, _alt(_vt(B, B_x), B, feller), kort, full, tall=tallsvar(verdi=B_x, enhet="NOK million"))


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

statisk(
    "wac-s01", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about why the after-tax WACC sits below the unlevered cost of capital.",
        "r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = r<sub>U</sub> − "
        "(D/V)τ<sub>c</sub>r<sub>D</sub>. Without taxes the pre-tax WACC equals r<sub>U</sub>.",
        "<p><b>Step 1:</b> set the tax rate to zero. What is left of the gap?</p>"
        "<p><b>Step 2:</b> ask what cheap debt does to the cost of equity.</p>"
        "<p><b>Watch out:</b> cheaper debt alone lowers nothing, because the equity becomes riskier. The answer must name taxes.</p>",
    ),
    q="<p>A firm keeps a constant D/V. Its after-tax WACC is below its unlevered cost of capital r<sub>U</sub>. "
      "What explains the gap?</p>",
    alternativer=[
        R("Interest is tax-deductible, so each unit of debt costs the firm only r<sub>D</sub>(1 − τ<sub>c</sub>)"),
        F("Debt is cheaper than equity, so shifting weight towards debt lowers the average cost",
          "Cheaper debt makes the equity riskier: r<sub>E</sub> rises just enough to keep the pre-tax WACC at "
          "r<sub>U</sub>. Without taxes there is no gap."),
        F("Lenders accept a lower return because the firm's equity absorbs the default risk",
          "That is why r<sub>D</sub> is below r<sub>E</sub>, but it is offset by a higher r<sub>E</sub>. It does not "
          "lower the average."),
        F("Leverage lowers the business risk of the assets, so r<sub>U</sub> overstates the risk",
          "Leverage does not touch the assets. r<sub>U</sub> is the same whatever the financing."),
    ],
    kort="<p><b>The interest tax deduction.</b> r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>. "
         "Set τ<sub>c</sub> = 0 and the gap disappears.</p>",
    full="<p><b>Two effects that cancel and one that does not.</b> Debt is cheaper than equity, but using more of it "
         "makes the equity riskier. Under MM the higher r<sub>E</sub> exactly offsets the cheaper debt, so the "
         "pre-tax WACC stays at r<sub>U</sub> under the course's target-ratio convention.</p>"
         "<p><b>What taxes add.</b> Interest is deductible, dividends are not. Each krone of interest saves "
         "τ<sub>c</sub> in tax, so the after-tax cost of debt is r<sub>D</sub>(1 − τ<sub>c</sub>). The WACC method "
         "puts that saving into the rate: r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>.</p>"
         "<p><b>A worked line.</b> D/V = 0.40, r<sub>E</sub> = 13%, r<sub>D</sub> = 5%, τ<sub>c</sub> = 25%: "
         "r<sub>U</sub> = 0.60 × 13% + 0.40 × 5% = 9.80% and r<sub>wacc</sub> = 9.80% − 0.40 × 25% × 5% = "
         "9.30%.</p>"
         "<p><b>On the exam.</b> Kurbatov's wrap-up asks you to compute r<sub>wacc</sub> and explain why it is lower "
         "than r<sub>U</sub>. The answer is the tax shield, in one sentence.</p>"
         "<p><b>Remember:</b> the WACC falls with leverage only because interest is deductible.</p>",
)

statisk(
    "wac-s02", tema="wacc-apv", type="formel",
    hjelp=hjelp3(
        "This is about pairing each valuation method with its cash flow and its rate.",
        "WACC: FCF at r<sub>wacc</sub>. APV: FCF at r<sub>U</sub> plus PV(TS). FTE: FCFE at r<sub>E</sub>.",
        "<p><b>Step 1:</b> whose cash flow is it: all investors or the shareholders only?</p>"
        "<p><b>Step 2:</b> is the tax shield in the rate, in the cash flow or added separately?</p>"
        "<p><b>Step 3:</b> check that the shield enters exactly once. <b>Watch out:</b> free cash flow never contains interest.</p>",
    ),
    q="<p>Which pairing of method, cash flow and discount rate is correct?</p>",
    alternativer=[
        R("APV: free cash flow at r<sub>U</sub>, with PV(TS) added separately"),
        F("WACC: free cash flow after interest at r<sub>wacc</sub>",
          "Free cash flow never contains interest. Taking interest out and discounting at r<sub>wacc</sub> charges "
          "the lenders twice."),
        F("FTE: free cash flow at r<sub>E</sub>",
          "FTE discounts the cash flow to equity, FCFE, which nets out the lenders' share. FCF at r<sub>E</sub> "
          "counts the lenders' cash as the shareholders'."),
        F("APV: free cash flow at r<sub>wacc</sub>, with PV(TS) added separately",
          "r<sub>wacc</sub> already contains the tax shield. Adding PV(TS) on top counts it twice."),
    ],
    kort="<p><b>APV: FCF at r<sub>U</sub> plus PV(TS).</b> WACC: FCF at r<sub>wacc</sub>. FTE: FCFE at "
         "r<sub>E</sub>.</p>",
    full="<p><b>One set of cash flows, three ways to split them.</b> Free cash flow belongs to all investors and is "
         "computed as if the firm had no debt. The methods differ in where they put the tax benefit of debt.</p>"
         "<p><b>WACC.</b> FCF at r<sub>wacc</sub>. The (1 − τ<sub>c</sub>) on r<sub>D</sub> puts the shield into the "
         "rate.</p>"
         "<p><b>APV.</b> FCF at r<sub>U</sub> gives V<sup>U</sup>. The shield is valued on its own and added: "
         "V<sup>L</sup> = V<sup>U</sup> + PV(TS).</p>"
         "<p><b>FTE.</b> FCFE = FCF − (1 − τ<sub>c</sub>) × interest + net borrowing, at r<sub>E</sub>. It values the "
         "equity, so add the debt to compare with the other two.</p>"
         "<p><b>A rule of thumb from the wrap-up.</b> Given r<sub>wacc</sub>, expect the WACC method. Given "
         "r<sub>U</sub>, expect APV.</p>"
         "<p><b>Remember:</b> each cash flow has its own rate. The shield enters exactly once.</p>",
)

statisk(
    "wac-s03", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about deducting interest in the cash flow and also discounting at the after-tax WACC.",
        "FCF = EBIT(1 − τ<sub>c</sub>) + Dep − CapEx − ΔNWC, with no interest. r<sub>wacc</sub> already charges for "
        "debt.",
        "<p><b>Step 1:</b> how much smaller is the numerator when after-tax interest comes out?</p>"
        "<p><b>Step 2:</b> is the cost of debt still in the rate?</p>"
        "<p><b>Step 3:</b> compare the two effects in size. <b>Watch out:</b> the shield counted twice pushes the "
        "value up, but by far less than the full after-tax interest pushes it down.</p>",
    ),
    q="<p>An analyst values a levered firm as follows. He starts from its net income, adds back depreciation and "
      "subtracts CapEx and the change in working capital. He then discounts the result at the after-tax WACC. How "
      "does his value compare with the correct WACC value?</p>",
    alternativer=[
        R("Too low: the lenders' return is charged in his cash flow and again in his rate"),
        F("Too high: the tax saving on interest now appears in both the cash flow and the rate",
          "The tax saving is counted twice, but the after-tax interest he takes out of the cash flow is far "
          "larger."),
        F("Correct: the right cash flow is what the firm keeps after paying its lenders",
          "That is the cash flow to equity. It belongs with r<sub>E</sub>, not with the WACC."),
        F("Correct as long as the debt is risk-free",
          "Risk-free or not, the WACC already contains the cost of debt. Charging it again lowers the value."),
    ],
    kort="<p><b>Too low.</b> Net income is after interest. His cash flow is FCF − (1 − τ<sub>c</sub>) × interest, "
         "while r<sub>wacc</sub> still charges for the debt.</p>",
    full="<p><b>Where financing belongs.</b> The WACC method discounts the cash flow to all investors at the average "
         "return they require. The lenders' return is in the rate, as (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>). The cash "
         "flow must therefore be the one before any payment to lenders: FCF starts from EBIT(1 − τ<sub>c</sub>), not "
         "from net income.</p>"
         "<p><b>What the analyst does.</b> Net income is after interest and after its tax saving, so his cash flow is "
         "FCF − (1 − τ<sub>c</sub>) × interest. The rate still charges for the same debt. The lenders are paid twice, "
         "so the value is too low.</p>"
         "<p><b>The tempting answer.</b> The tax saving on interest now shows up in the cash flow and in the rate, so "
         "it is counted twice. That pushes the value up a little, far less than the full after-tax interest pushes "
         "it down.</p>"
         "<p><b>The consistent alternative.</b> A cash flow after interest, plus net borrowing, is FCFE and belongs "
         "with r<sub>E</sub>: the flow-to-equity method.</p>"
         "<p><b>Remember:</b> FCF never contains interest.</p>",
)

statisk(
    "wac-s04", tema="wacc-apv", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the rate on the interest tax shield under two debt policies.",
        "Constant D/V or D/E: shield at r<sub>U</sub>. Fixed amounts known today, permanent or on a schedule: shield "
        "at r<sub>D</sub>.",
        "<p><b>Step 1:</b> for each policy, is next year's debt known today?</p>"
        "<p><b>Step 2:</b> a known amount is as safe as the debt. An amount tied to firm value is as risky as the "
        "firm.</p>"
        "<p><b>Watch out:</b> fixed permanent debt is the special case of a fixed plan that never ends.</p>",
    ),
    q="<p>I. A firm that rebalances to a constant debt-to-equity ratio should discount its interest tax shields at "
      "r<sub>U</sub>.</p>"
      "<p>II. A firm that repays a loan on a fixed schedule should discount its interest tax shields at "
      "r<sub>D</sub>.</p>"
      "<p>Which statements follow the course's rules?</p>",
    alternativer=[
        F("Only I", "Statement II also holds: a fixed schedule makes every shield a known amount, as safe as the "
                    "debt."),
        F("Only II", "Statement I also holds: under a constant ratio the debt tracks the value of the "
                     "assets. So does the shield."),
        R("Both I and II"),
        F("Neither I nor II", "Both are the rule you must be able to state cold: r<sub>U</sub> under a constant "
                              "ratio, r<sub>D</sub> under fixed debt."),
    ],
    kort="<p><b>Both.</b> Constant ratio: the shield moves with firm value, so r<sub>U</sub>. Fixed schedule: every "
         "shield is known today, so r<sub>D</sub>.</p>",
    full="<p><b>The rule.</b> The rate on a cash flow reflects its risk. The tax shield is τ<sub>c</sub>r<sub>D</sub>"
         "D<sub>t−1</sub>, so its risk is the risk of the future debt level.</p>"
         "<p><b>Statement I.</b> With a constant ratio, D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>. Next year's "
         "debt rises if the business does well and falls if it does badly, so the shield carries the risk of the "
         "assets. Discount at r<sub>U</sub>. This is what H2024 Exercise 5 and H2025 Exercise 4 test.</p>"
         "<p><b>Statement II.</b> With a fixed schedule every future balance is in the contract. The only risk in "
         "the shield is that the firm cannot pay, the same risk as the debt. Discount at r<sub>D</sub>, or at "
         "r<sub>f</sub> if the debt is risk-free. Fixed permanent debt is the special case PV(TS) = "
         "τ<sub>c</sub>D.</p>"
         "<p><b>Remember:</b> name the debt policy in one sentence before you discount the shield.</p>",
)

statisk(
    "wac-s05", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about the order of the steps when a firm keeps a target debt ratio.",
        "D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>. r<sub>wacc</sub> needs only d, r<sub>E</sub>, r<sub>D</sub> "
        "and τ<sub>c</sub>.",
        "<p><b>Step 1:</b> what do you need to know to compute the tax shield each year?</p>"
        "<p><b>Step 2:</b> which method gives that without knowing it first?</p>"
        "<p><b>Step 3:</b> list the order of the steps. <b>Watch out:</b> the agreement between the two methods is a fixed point once APV borrows its debt from the WACC path.</p>",
    ),
    q="<p>A firm keeps D/V constant. Why do exam questions ask for the value by the WACC method before the value by "
      "APV?</p>",
    alternativer=[
        R("APV needs the debt in each year, which is d × V<sup>L</sup>, so the WACC value has to come first"),
        F("The WACC method is more accurate, so APV is only a rough check on it",
          "Done right, the two give the same value. Neither is more accurate."),
        F("APV ignores the tax shield, so it needs the WACC value to add it back",
          "APV values the tax shield explicitly. It just needs the debt levels to do so."),
        F("The WACC method does not need r<sub>U</sub>, while APV cannot be done without the WACC",
          "APV needs r<sub>U</sub> and the debt path, not the WACC itself. The point is the debt path."),
    ],
    kort="<p><b>The debt depends on the value.</b> Under a target ratio D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>. "
         "The WACC needs only d, so you value first and read the debt off.</p>",
    full="<p><b>The circularity.</b> APV adds PV(TS) and every shield needs the debt at the start of the year. "
         "Under a target ratio the debt is d × V<sup>L</sup><sub>t</sub>: it depends on the very value you are "
         "computing.</p>"
         "<p><b>How the WACC method escapes it.</b> r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − "
         "τ<sub>c</sub>) needs only the ratio d, which the question gives. So you roll the value back with the WACC, "
         "write V<sup>L</sup><sub>t</sub> at every date and set D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>.</p>"
         "<p><b>Then APV.</b> With the debt path in hand, compute the shields, discount them at r<sub>U</sub> and add "
         "them to V<sup>U</sup>. The result equals the WACC value (check 1), which is a fixed point because APV "
         "used the WACC debt path. It still catches the wrong rate on the shield.</p>"
         "<p><b>Remember:</b> constant ratio: WACC first, then the debt path, then APV.</p>",
)

statisk(
    "wac-s06", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about what a constant debt ratio means when the firm's value falls.",
        "D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>, so ΔD<sub>t</sub> = d(V<sup>L</sup><sub>t</sub> − "
        "V<sup>L</sup><sub>t−1</sub>). FCFE = FCF − (1 − τ<sub>c</sub>) × interest + ΔD.",
        "<p><b>Step 1:</b> what sign does the change in value have?</p>"
        "<p><b>Step 2:</b> who provides the cash when debt is repaid?</p>"
        "<p><b>Step 3:</b> put the change in debt into FCFE with its sign. <b>Watch out:</b> only the fraction D/V "
        "of the fall in value is debt.</p>",
    ),
    q="<p>A firm keeps D/V = 0.40 by rebalancing at every year-end. Its levered value is 800 at date 1 and falls to "
      "650 at date 2 as its licence runs down. What happens to its debt at date 2 and who pays for it?</p>",
    alternativer=[
        R("It repays 60, funded by the shareholders through a lower FCFE"),
        F("The firm borrows 60 more and pays it out to the shareholders",
          "The size is right but the sign is not: the value fell, so the debt must fall too."),
        F("Nothing happens: the debt stays at 320 until the licence expires",
          "That abandons the target ratio. The debt must track the value."),
        F("The firm repays 150 to the lenders, the whole fall in value",
          "Only the fraction d of the fall is debt. The rest of the fall is borne by the equity."),
    ],
    kort="<p><b>Repay 60, paid by the shareholders.</b> D<sub>1</sub> = 0.40 × 800 = 320, D<sub>2</sub> = 0.40 × 650 = "
         "260, so ΔD = −60, which enters FCFE with a minus sign.</p>",
    full="<p><b>The rule.</b> A constant D/V means D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub> at every date. When "
         "the value falls, the debt must fall in proportion.</p>"
         "<p><b>Step 1: the debt.</b> D<sub>1</sub> = 0.40 × 800 = 320 and D<sub>2</sub> = 0.40 × 650 = 260.</p>"
         "<p><b>Step 2: the change.</b> ΔD = 260 − 320 = −60: a repayment of 60.</p>"
         "<p><b>Step 3: who pays.</b> The cash to repay the lenders comes out of what would otherwise go to the "
         "shareholders. In flow to equity, FCFE = FCF − (1 − τ<sub>c</sub>) × interest + ΔD, with ΔD = −60.</p>"
         "<p><b>On the exam.</b> H2025 Exercise 4(f) asked for exactly this adjustment in a firm that winds down. It "
         "is the step that is most often got wrong: either the debt is held fixed or the value at date 1 still "
         "includes the year-1 cash flow.</p>"
         "<p><b>Remember:</b> ΔD takes the sign of the change in value.</p>",
)

statisk(
    "wac-s07", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about what the WACC = APV check can and cannot catch.",
        "APV takes D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub> from the WACC path. With r<sub>wacc</sub> = "
        "r<sub>U</sub> − d × r<sub>D</sub> × τ<sub>c</sub>, both routes are built on the same r<sub>U</sub>.",
        "<p><b>Step 1:</b> for each error, ask which route it touches.</p>"
        "<p><b>Step 2:</b> an error in a shared input moves both routes by the same amount.</p>"
        "<p><b>Step 3:</b> sort the errors into those that touch one route and those that touch a shared input. "
        "<b>Watch out:</b> agreement proves less than it seems.</p>",
    ),
    q="<p>You value a firm that keeps a constant D/V by the WACC method and by APV, taking the APV debt levels from "
      "the WACC value path. Which of these slips would the check WACC = APV <i>not</i> reveal?</p>",
    alternativer=[
        R("The twin's book equity used in place of its market equity when you unlevered"),
        F("The tax shields discounted at r<sub>D</sub> instead of r<sub>U</sub>",
          "That changes PV(TS) but not the WACC value, so the two routes would disagree."),
        F("Each year's shield computed on the debt at the end of the year instead of the start",
          "That changes the shields in APV only, so the routes would disagree."),
        F("The unlevered value discounted at r<sub>wacc</sub> instead of r<sub>U</sub>",
          "That inflates the APV value only: the shield ends up counted twice and the routes disagree."),
    ],
    kort="<p><b>The book equity in the unlevering.</b> It gives a wrong β<sub>U</sub> and r<sub>U</sub>, which feed "
         "both routes alike, so they still agree.</p>",
    full="<p><b>What the check is.</b> Consistency check 1 says the WACC value equals the APV value. When APV takes "
         "its debt levels from the WACC path, the agreement is a fixed point: with r<sub>wacc</sub> = r<sub>U</sub> "
         "− d × r<sub>D</sub> × τ<sub>c</sub>, the sum V<sup>U</sup> + PV(TS) collapses back to V<sup>L</sup> "
         "algebraically.</p>"
         "<p><b>What it catches.</b> Errors that touch one route only: the shield at r<sub>D</sub>, a shield on the "
         "wrong year's debt, V<sup>U</sup> at the wrong rate, arithmetic slips.</p>"
         "<p><b>What it misses.</b> Errors in the shared inputs. Book equity in the twin's weights gives a wrong "
         "β<sub>U</sub>, so a wrong r<sub>U</sub>, which flows into r<sub>E</sub>, r<sub>wacc</sub>, V<sup>U</sup> and "
         "the shields. Both routes move together and still agree.</p>"
         "<p><b>The defence.</b> Guard the inputs separately: market values in every weight. Compute the twin's "
         "r<sub>U</sub> from its returns as well as from its betas.</p>"
         "<p><b>Remember:</b> WACC = APV catches the wrong shield rate and slips, not a wrong r<sub>U</sub>.</p>",
)

statisk(
    "wac-s08", tema="wacc-apv", type="tolkning",
    hjelp=hjelp3(
        "This is about reading what a valuation question asks for: a value or an NPV, the project or the firm, the "
        "firm or the equity.",
        "NPV = value − cost. Equity = V<sup>L</sup> − D + excess cash. Price = equity/N.",
        "<p><b>Step 1:</b> underline the noun in the question: value, NPV, equity, price.</p>"
        "<p><b>Step 2:</b> ask whether the cost has already been paid.</p>"
        "<p><b>Step 3:</b> subtract what the firm pays from what it gets. <b>Watch out:</b> the value of the project and the gain from doing it are different numbers.</p>",
    ),
    q="<p>A project costs NOK 100 million today. By the WACC method its future free cash flows are worth NOK 130 "
      "million today. The firm pays the NOK 100 million out of cash it already holds and changes nothing else. By "
      "how much does taking the project raise the value of the firm's equity today, in NOK million?</p>",
    alternativer=[
        R("NOK 30 million, the NPV", 30),
        F("NOK 130 million, the present value of the cash flows",
          "130 is what the project is worth before you pay for it. The firm gives up 100 of cash to get it.", 130),
        F("NOK 100 million, the cost of the project",
          "The cost is what the firm gives up, not what it gains.", 100),
        F("NOK 230 million, the cost plus the value",
          "This adds what the firm pays to what it receives, instead of subtracting it.", 230),
    ],
    kort="<p><b>NOK 30 million.</b> The firm gives up cash of 100 for assets worth 130, so its equity rises by 130 − "
         "100 = 30, the NPV.</p>",
    full="<p><b>Value or NPV.</b> The present value of a project's cash flows is what the project is worth. Its NPV "
         "is that value minus what it costs. Kurbatov's wrap-up stresses reading which one the question wants: "
         "«the value of the project» is 130, «the gain from undertaking it» is 30.</p>"
         "<p><b>Step 1: the value.</b> The cash flows are worth 130 today.</p>"
         "<p><b>Step 2: the cost.</b> The firm pays 100 today.</p>"
         "<p><b>Step 3: the increase.</b> Assets worth 130 replace cash of 100. Nothing else changes, so the equity is "
         "worth 30 more.</p>"
         "<p><b>The same care elsewhere.</b> Firm or equity: the WACC method values the firm, FTE the equity. "
         "Equity or price: divide by the shares. Project or firm: a project's debt capacity follows its own value.</p>"
         "<p><b>Remember:</b> read the noun: value, NPV, equity or price.</p>",
    tall=tallsvar(verdi=30, enhet="NOK million"),
)

statisk(
    "wac-s09", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about which items belong in a project's incremental cash flow.",
        "Incremental cash flow = the firm's cash flow with the project minus without it. Sunk costs are the same in "
        "both, opportunity costs and cannibalisation are not.",
        "<p><b>Step 1:</b> for each item, ask whether it happens only if the project goes ahead.</p>"
        "<p><b>Step 2:</b> keep exactly those items.</p>"
        "<p><b>Step 3:</b> strike anything that happens either way. <b>Watch out:</b> costs already paid, overhead paid anyway and interest all stay out.</p>",
    ),
    q="<p>A firm evaluates a new product. Which list contains only items that belong in the project's incremental "
      "free cash flow?</p>",
    alternativer=[
        R("Lost margin on an existing product, rent given up on a building the project uses, working capital"),
        F("A market study paid last year, lost margin on an existing product, working capital",
          "The study was paid whatever you decide now. It is a sunk cost and stays out."),
        F("Rent given up on a building the project uses, interest on the loan that funds it, working capital",
          "Interest is financing. It enters through the discount rate or PV(TS), never the free cash flow."),
        F("Head-office overhead allocated to the product, rent given up, lost margin on an existing product",
          "Overhead that is paid with or without the project is not incremental, however it is allocated."),
    ],
    kort="<p><b>Cannibalisation, the opportunity cost and working capital.</b> Each happens only if the project goes "
         "ahead. Sunk costs, allocated overhead and interest stay out.</p>",
    full="<p><b>The test.</b> A project's cash flow is the difference it makes. Compare the firm with the project and "
         "without it and keep only what differs.</p>"
         "<p><b>What goes in.</b> Lost margin on existing products (cannibalisation): those sales disappear because "
         "of the project. Rent the firm gives up by using its own building: an opportunity cost. Working capital "
         "tied up and released at the end.</p>"
         "<p><b>What stays out.</b> Money already spent, such as last year's market study: it is gone either way. "
         "Overhead that is paid anyway, however the accountants allocate it. Interest: financing is handled in the "
         "rate or in PV(TS).</p>"
         "<p><b>On the exam.</b> Kurbatov's wrap-up lists ΔNWC, the depreciation add-back, sunk costs and "
         "cannibalisation as the free-cash-flow points to get right.</p>"
         "<p><b>Remember:</b> with versus without, never before versus after.</p>",
)

statisk(
    "wac-s10", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about leaving net borrowing out of the cash flow to equity and the direction of the error.",
        "FCFE = FCF − (1 − τ<sub>c</sub>) × interest + ΔD. E = PV of FCFE at r<sub>E</sub>.",
        "<p><b>Step 1:</b> what sign does ΔD have for a firm that repays?</p>"
        "<p><b>Step 2:</b> dropping a negative term makes FCFE larger or smaller?</p>"
        "<p><b>Step 3:</b> the equity value moves by minus the present value of the dropped term. <b>Watch out:</b> the direction of the error follows the sign of net borrowing.</p>",
    ),
    q="<p>A firm keeps a constant debt ratio while its value falls each year, so it repays debt every year. A "
      "flow-to-equity valuation leaves out net borrowing. The equity value comes out…</p>",
    alternativer=[
        R("too high, because the repayments the shareholders fund are left out"),
        F("too low, because the shareholders lose the new debt they would have received",
          "This firm repays rather than borrows. Its net borrowing is negative, so dropping it adds cash."),
        F("correct, because borrowing and repaying are zero-NPV transactions",
          "They are zero-NPV for the firm, but in FTE they are cash flows to or from the shareholders and must be "
          "counted."),
        F("too high or too low depending on the tax rate",
          "The sign of the error follows the sign of net borrowing, not the tax rate."),
    ],
    kort="<p><b>Too high.</b> Net borrowing is negative for a repaying firm. Leaving it out adds back cash the "
         "shareholders in fact pay to the lenders.</p>",
    full="<p><b>The cash to equity.</b> FCFE = FCF − (1 − τ<sub>c</sub>) × interest + ΔD. When the firm borrows, the "
         "new debt is cash for the shareholders. When it repays, the shareholders fund the repayment.</p>"
         "<p><b>The error.</b> Dropping ΔD shifts the equity value by minus the present value of ΔD at "
         "r<sub>E</sub>. For a firm that repays, ΔD is negative, so the equity is overstated. For a firm that "
         "borrows, it is understated. The error runs against the sign of net borrowing.</p>"
         "<p><b>A check that catches it.</b> Add the debt to the FTE equity and compare with the WACC value. FTE on "
         "the same debt path is a fixed point like WACC = APV, but it fails when ΔD is missing.</p>"
         "<p><b>Remember:</b> net borrowing belongs in FCFE, with its sign.</p>",
)

statisk(
    "wac-s11", tema="wacc-apv", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about when the WACC method works for a firm with a fixed amount of permanent debt.",
        "The WACC method needs a constant D/V. Permanent debt without growth: r<sub>wacc</sub> = r<sub>U</sub>(1 − "
        "τ<sub>c</sub>D/V<sup>L</sup>). APV: V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D.",
        "<p><b>Step 1:</b> with no growth, does D/V move over time?</p>"
        "<p><b>Step 2:</b> with growth, what happens to D/V when D is fixed?</p>"
        "<p><b>Step 3:</b> a single WACC needs D/V to stay put. <b>Watch out:</b> when the ratio drifts over time, use APV.</p>",
    ),
    q="<p>Two firms have a fixed amount of permanent debt.</p>"
      "<p>I. Firm X has level free cash flow with no growth. It can be valued by the WACC method with a single "
      "rate.</p>"
      "<p>II. Firm Y has free cash flow growing at 3% a year. It can be valued by the WACC method with a single "
      "rate.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: Y's value grows while its debt stays fixed, so D/V drifts down."),
        F("Both I and II", "Statement II fails: one WACC needs a constant D/V and Y's ratio falls every year."),
        F("Neither I nor II", "Statement I holds: with no growth V<sup>L</sup> is constant, so D/V is too (PS2 "
                              "Exercise 9)."),
    ],
    kort="<p><b>Only I.</b> With no growth D/V stays constant, so r<sub>wacc</sub> = r<sub>U</sub>(1 − "
         "τ<sub>c</sub>D/V<sup>L</sup>) works. With growth the fixed debt shrinks relative to value: use APV.</p>",
    full="<p><b>What the WACC method needs.</b> One rate for every year requires the same D/V every year.</p>"
         "<p><b>Statement I.</b> True. Level FCF forever and permanent debt give a constant V<sup>L</sup> and a "
         "constant D, so D/V is constant. Kurbatov's PS2 Exercise 9: FCF 2 a year, r<sub>U</sub> = 11%, D = 12, "
         "τ<sub>c</sub> = 25%. APV gives 18.18 + 3.00 = 21.18 and r<sub>wacc</sub> = 0.11 × (1 − 0.25 × 12/21.18) "
         "= 9.44% gives the same value. The shortcut r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> would be wrong "
         "here, because the shield is safe.</p>"
         "<p><b>Statement II.</b> False. Y's value grows at 3% while D is fixed, so D/V falls every year and so "
         "would the right WACC. There is no single rate. APV handles it: V<sup>U</sup> at r<sub>U</sub> plus "
         "τ<sub>c</sub>D.</p>"
         "<p><b>Remember:</b> fixed debt plus growth: APV only.</p>",
)

statisk(
    "wac-s12", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about what the number k means in the constant-interest-coverage policy.",
        "Interest<sub>t</sub> = k × FCF<sub>t</sub>, so V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup>. The debt "
        "follows from the interest: D = interest/r<sub>D</sub>.",
        "<p><b>Step 1:</b> read what is set equal to a share of FCF: the interest or the debt?</p>"
        "<p><b>Step 2:</b> check the units of the formula.</p>"
        "<p><b>Step 3:</b> recall the value formula for this policy. <b>Watch out:</b> a constant debt ratio and a debt multiple of FCF are different policies.</p>",
    ),
    q="<p>A firm follows a policy of constant interest coverage with k = 0.25. What does k = 0.25 mean?</p>",
    alternativer=[
        R("Each year's interest payment is 25% of that year's free cash flow"),
        F("The debt outstanding is 25% of the firm's value each year",
          "That is a constant debt ratio, d = 0.25. Interest coverage ties the interest to free cash flow."),
        F("The debt outstanding is 25% of next year's free cash flow",
          "That ties the debt, not the interest, to FCF. Under coverage the interest is the share of FCF."),
        F("Free cash flow covers the interest four times, so the firm's debt is risk-free",
          "Coverage of four is a statement about cash flows, not about default risk. The shield still moves with "
          "FCF."),
    ],
    kort="<p><b>Interest = 0.25 × FCF each year.</b> The shield τ<sub>c</sub> × 0.25 × FCF is a slice of FCF, so "
         "V<sup>L</sup> = (1 + 0.25τ<sub>c</sub>)V<sup>U</sup>.</p>",
    full="<p><b>The policy.</b> Under constant interest coverage the firm sets its interest payments, not its debt, "
         "as a share k of free cash flow: interest<sub>t</sub> = k × FCF<sub>t</sub> (lecture 8, slide 17). The "
         "debt follows: D = interest/r<sub>D</sub>.</p>"
         "<p><b>Why it is convenient.</b> The tax shield τ<sub>c</sub>k × FCF<sub>t</sub> is a fixed slice of FCF, so "
         "it has the same risk and is worth the same slice of V<sup>U</sup>: V<sup>L</sup> = (1 + "
         "τ<sub>c</sub>k)V<sup>U</sup>. You never need V<sup>L</sup> to find the debt.</p>"
         "<p><b>Not to be confused with.</b> A constant debt ratio (D = d × V<sup>L</sup>) or debt as a multiple of "
         "FCF. Both are valid policies, but they are different numbers with different formulas.</p>"
         "<p><b>Example.</b> PS2 Exercise 5: FCF 2.5 growing at 4%, r<sub>U</sub> = 10%, τ<sub>c</sub> = 40%, k = 20%: "
         "V<sup>U</sup> = 41.67 and V<sup>L</sup> = 1.08 × 41.67 = 45.00.</p>"
         "<p><b>Remember:</b> k is interest over FCF.</p>",
)

statisk(
    "wac-s13", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about where excess cash enters a valuation by the WACC method.",
        "V<sup>L</sup> = PV of FCF at r<sub>wacc</sub> values the operations. E = V<sup>L</sup> − D + excess cash.",
        "<p><b>Step 1:</b> does the excess cash produce any of the free cash flow?</p>"
        "<p><b>Step 2:</b> what is a risk-free pile of cash worth today?</p>"
        "<p><b>Step 3:</b> decide where the cash enters, before or after discounting. <b>Watch out:</b> only cash the operations do not need is treated this way.</p>",
    ),
    q="<p>A firm holds NOK 200 million of cash its operations do not need. You value its operations by discounting "
      "free cash flow at the WACC. How do you treat the excess cash?</p>",
    alternativer=[
        R("Add it at face value after discounting, when you go from the operations to the equity"),
        F("Include the interest it earns in free cash flow and discount it at the WACC",
          "Discounting a risk-free return at the WACC undervalues the cash. Keep it out of FCF and add it at face "
          "value."),
        F("Ignore it, because it is already reflected in the share price",
          "You are computing the share price. Leaving the cash out undervalues the equity."),
        F("Subtract it from the firm value, because it lowers the return on capital",
          "Cash is an asset the shareholders own. It adds to the equity value."),
    ],
    kort="<p><b>Add it at face value at the end.</b> FCF covers the operations only. The cash is worth what it is, "
         "so E = V<sup>L</sup> − D + excess cash.</p>",
    full="<p><b>Two separate assets.</b> The firm owns its operations and a pile of cash. The WACC method values the "
         "operations from the free cash flow they produce. The excess cash produces none of that cash flow, so it "
         "is not in V<sup>L</sup>.</p>"
         "<p><b>What the cash is worth.</b> Cash is worth its face value. Add it when you move from the operations "
         "to the equity: E = V<sup>L</sup> − D + excess cash and the price is E/N.</p>"
         "<p><b>Which cash.</b> Only cash the operations do not need. Operating cash is part of working capital and "
         "already in FCF.</p>"
         "<p><b>Net debt.</b> If the target ratio is set on net debt, d × V<sup>L</sup> is already net of the cash. "
         "Then subtract it and add no cash.</p>"
         "<p><b>Remember:</b> operations at the WACC, excess cash at face value.</p>",
)

statisk(
    "wac-s14", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about comparing a project that starts later with one that starts now.",
        "NPV<sub>0</sub> = NPV<sub>1</sub>/(1 + r). Compare both options at the same date.",
        "<p><b>Step 1:</b> find the NPV of the later project at the date it starts.</p>"
        "<p><b>Step 2:</b> bring it back to today before comparing.</p>"
        "<p><b>Step 3:</b> compare both NPVs at today's date. <b>Watch out:</b> both the value and the cost of the later project arrive at its own start date.</p>",
    ),
    q="<p>Project A costs NOK 100 million today and is worth NOK 125 million today. Project B is the same plant built "
      "one year later: it costs NOK 100 million at date 1 and is then worth NOK 128 million at date 1. The cost of "
      "capital is 10%. The firm can do only one. What is the NPV today of project B, in NOK million?</p>",
    alternativer=[
        R("25.45, so B is better", 28 / 1.1),
        F("28.00, so B is better",
          "That is B's NPV at date 1. A krone at date 1 is worth less than a krone today, so it must be "
          "discounted before you compare.", 28),
        F("16.36, so A is better",
          "This discounts B's value but not its cost. Both arrive at date 1, so both are discounted.",
          128 / 1.1 - 100),
        F("3.00, so B is better",
          "This compares the two values without the costs and without discounting.", 3),
    ],
    kort="<p><b>25.45, so B is better.</b> B's NPV at date 1 is 128 − 100 = 28, worth 28/1.10 = 25.45 today. A's "
         "NPV today is 125 − 100 = 25.00.</p>",
    full="<p><b>The rule.</b> Two alternatives can only be compared at the same date. A project that starts later "
         "has its NPV measured at its own start date, so bring it back to today first. Kurbatov's wrap-up names "
         "this case: a project that starts in year 2 against an alternative now.</p>"
         "<p><b>Step 1: A today.</b> NPV<sub>A</sub> = 125 − 100 = 25.00.</p>"
         "<p><b>Step 2: B at date 1.</b> NPV<sub>B</sub> at date 1 = 128 − 100 = 28.00.</p>"
         "<p><b>Step 3: B today.</b> 28.00/1.10 = <b>25.45</b>. B beats A by 0.45 today, so the firm should wait "
         "and build B.</p>"
         "<p><b>First check.</b> Compare at date 1 instead: A's NPV grown one year is 25.00 × 1.10 = 27.50, below "
         "B's 28.00. The ranking is the same, as it must be, since this only rescales both by 1.10.</p>"
         "<p><b>Why the traps tempt.</b> 28.00 compares numbers at different dates. Discounting only B's value and "
         "not its cost treats the 100 paid at date 1 as if it were paid today.</p>"
         "<p><b>Remember:</b> move every NPV to the same date before you rank them.</p>",
    tall=tallsvar(verdi=28 / 1.1, enhet="NOK million"),
)

statisk(
    "wac-s15", tema="wacc-apv", type="begrep",
    hjelp=hjelp3(
        "This is about discounting a cash flow that arrives after a fraction of a year, with an annual rate.",
        "PV = C/(1 + r)<sup>T</sup> with T in years, also when T is not a whole number. Half a year is the square "
        "root of (1 + r).",
        "<p><b>Step 1:</b> write the timing in years.</p>"
        "<p><b>Step 2:</b> raise one plus the annual rate to that power.</p>"
        "<p><b>Step 3:</b> divide the payment by that factor.</p>"
        "<p><b>Watch out:</b> r × T is simple interest, which the course does not use.</p>",
    ),
    q="<p>A project pays NOK 50 million in 30 months. The cost of capital is 12% a year with annual compounding. What "
      "is the payment worth today, in NOK million?</p>",
    alternativer=[
        R("37.66", 50 / 1.12 ** 2.5),
        F("38.46", "Simple interest: 50/(1 + 0.12 × 2.5). The course discounts with (1 + r)<sup>T</sup>, also for "
                   "fractions of a year.", 50 / 1.3),
        F("39.86", "Discounted over two full years only. 30 months is 2.5 years.", 50 / 1.12 ** 2),
        F("35.59", "Discounted over three full years. Use the exact time, 2.5 years.", 50 / 1.12 ** 3),
    ],
    kort="<p><b>37.66.</b> 1.12<sup>2.5</sup> = 1.327532, so 50/1.327532 = 37.66.</p>",
    full="<p><b>The rule.</b> An annual rate r compounds: after T years one krone has grown to (1 + r)<sup>T</sup>. "
         "That holds for fractions of a year too, so a payment C at time T is worth C/(1 + r)<sup>T</sup> today. "
         "Kurbatov's wrap-up names 1.5 years, half a year (the square root) and months to years as things that can "
         "come up.</p>"
         "<p><b>Step 1: the timing.</b> 30 months = 2.5 years.</p>"
         "<p><b>Step 2: the factor.</b> 1.12<sup>2.5</sup> = 1.12² × √1.12 = 1.2544 × 1.058301 = 1.327532.</p>"
         "<p><b>Step 3: discount.</b> 50/1.327532 = <b>37.66</b>.</p>"
         "<p><b>First check.</b> The answer must lie between two years of discounting (39.86) and three years "
         "(35.59). It does, close to the middle, as 2.5 years should be.</p>"
         "<p><b>Related.</b> A monthly rate is (1 + r)<sup>1/12</sup> − 1 = 1.12<sup>1/12</sup> − 1 = 0.9489%, not "
         "r/12 = 1%.</p>"
         "<p><b>Remember:</b> (1 + r)<sup>T</sup> with T in years, never 1 + rT.</p>",
    tall=tallsvar(verdi=50 / 1.12 ** 2.5, enhet="NOK million"),
)
