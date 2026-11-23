"""Deleksamener del 1, «Mest forventet» 3 til 5 (skribent S1): alle tall regnes her.

Kjør fra prosjektroten:  python3 -I fag/fie402/_del/s1_regn.py

Oppdraget står i docs/fie402-deleksamen-spek.md. Hvert sett har to oppgaver:
  n 1 (18 p): formen fra H2025 E4, WACC og APV over to år, 9 × 2 p,
              gjeldsjustering ved utgangen av år 1.
  n 2 (20 p): formen fra H2024 E5, tvilling → r_U, beta_E og r_E, WACC, V^L,
              APV med gjelden fra WACC, verbal hale.

Variasjonen mellom settene:
  del1-f3  E1 Utvær Decommissioning: D/V gitt direkte, fallende FCF (stor nedbetaling).
           E2 Hitra Feed: én tvilling med risikabel gjeld og D/E; målet har D/V = 0,5.
           Halen: tvillingens beta_E brukt direkte (over- eller undervurdering).
  del1-f4  E1 Kolvik Data Centres: beta_D og r_E gitt (CAPM begge veier), D/E gitt,
           flat FCF. Halen: en kollega som diskonterte skjoldet med r_D.
           E2 Torvet Logistics: to sammenlignbare firmaer (ett med D/V, ett med D/E) med
           tydelig ulik gjeld og beta_U (1,10 og 0,85), snitt av beta_U. Halen (verbal):
           hvorfor snitte unlevered beta og ikke equity beta. Asserter at ett firma alene og
           snitt av beta_E havner mer enn 2,5 % unna i r_U og V^L (blindkontrollen 23.11.2026).
  del1-f5  E1 Brennmoen Solar: høy gjeldsgrad, negativ FCF i år 1, gjelden øker i år 1.
           Halen: virker WACC med fast gjeld? (nei, konstant D/V kreves)
           E2 Maple Ridge Dental: voksende evigrente, tvilling med beta_D > 0.
           Halen: en kollegas beta_U på 1,05 (gjeldsbetaen utelatt), for høy eller for lav verdi.

Konvensjoner (forfatterspek § 4): beta_U vektet uten skatt, skjoldet diskontert med r_U
ved konstant D/V, renter på gjelden ved årets start (D_{t−1}), D_t = d·V^L_t.

Skriptet asserter:
  WACC = APV (alle seks), r_wacc = r_U − d·tau·r_D, r_wacc < r_U,
  beta_U fra betaer = r_U fra avkastninger (CAPM), MM II gir samme r_E som CAPM på beta_E,
  vektede beta_E og beta_D gir beta_U, FTE-identiteten E_0(1 + r_E) = FCFE_1 + E_1,
  retningen i halene (over- eller undervurdering, høyere eller lavere, PV(TS) større),
  fortegnet på gjeldsjusteringen, at feller ligger utenfor toleransen, at avrunding til
  fire desimaler holder seg innenfor, at viste ledd summerer til vist total, at hvert tall
  i svar-dataene står i løsningsteksten, poengene og skrivereglene.
Er alt rent, skrives s1.json og s1_svar.json i samme mappe.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))


# ------------------------------------------------------------------ hjelpere
def F(x, d=4):
    """Engelsk tallformat med tusenskille og ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def R(x):
    """Rente som brøk: 4 desimaler når det er eksakt, ellers 6."""
    return F(x, 4) if abs(x - round(x, 4)) < 1e-12 else F(x, 6)


def P(x):
    """Rente som prosent: 2 desimaler når det er eksakt, ellers 4."""
    v = 100 * x
    return (F(v, 2) if abs(v - round(v, 2)) < 1e-10 else F(v, 4)) + "%"


def RP(x):
    return f"{R(x)} ({P(x)})"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))


def summ(ledd, total, d=4):
    """«a + b = t» der de viste leddene summerer til vist total."""
    vist = sum(round(x, d) for x in ledd)
    assert abs(vist - round(total, d)) <= 1.01 * 10 ** (-d), (ledd, total, vist)
    s = F(ledd[0], d)
    for x in ledd[1:]:
        s += (" − " if round(x, d) < 0 else " + ") + F(abs(x), d)
    return s + " = " + F(total, d)


def sm(ledd, total, d=4):
    """Som summ, men uten totalen (den skrives i fet skrift etterpå)."""
    return summ(ledd, total, d).rsplit(" = ", 1)[0]


def B(x):
    """Beta: 4 desimaler når det er eksakt, ellers 6."""
    return F(x, 4) if abs(x - round(x, 4)) < 1e-12 else F(x, 6)


SVAR = {}
MERKNAD_FELLER = {}


def tall(navn, verdi, enhet, feller=(), drift=0.0, alt=None, tolmax=0.01):
    """Ett tall i svar-dataene. Toleransen velges så ingen felle havner innenfor
    (spek 6b.1), og så avrunding til fire desimaler alltid godtas."""
    t = {"navn": navn, "verdi": verdi, "enhet": enhet}
    tol = tolmax
    if feller:
        m = min(abs(f - verdi) / abs(verdi) for f in feller)
        tol = min(tolmax, m / 2.5)
    assert tol >= 0.00005, (navn, verdi, feller)
    assert abs(drift) <= 0.5 * tol * abs(verdi), (navn, drift, tol)
    for f in feller:
        assert abs(f - verdi) > tol * abs(verdi), (navn, f)
    if tol < 0.01:
        t["tol"] = round(tol, 4) if tol >= 0.001 else round(tol, 5)
    if alt:
        t["alt"] = alt
    return t


def svar(key, typ, tallene, merknad=None, tallPoeng=None, tekstLedd=None):
    assert key not in SVAR, key
    e = {"type": typ}
    if tallene:
        e["tall"] = tallene
    if tallPoeng is not None:
        e["tallPoeng"] = tallPoeng
    if tekstLedd:
        e["tekstLedd"] = tekstLedd
    if merknad:
        e["merknad"] = merknad
    SVAR[key] = e


def del_(label, points, body, solution, criteria):
    return {"label": label, "points": points, "body": body, "solution": solution, "criteria": criteria}


# ============================================================ OPPGAVE 1: H2025 E4-formen
def regn_e1(p):
    """Tall for WACC og APV over to år med konstant D/V."""
    c = dict(p)
    rf, rm, tau, F1, F2 = p["rf"], p["rm"], p["tau"], p["F1"], p["F2"]
    mrp = rm - rf
    if "DV" in p:
        d = p["DV"]
    else:
        d = p["DE"] / (1 + p["DE"])
    if "rD" in p:
        rD = p["rD"]
        bD = (rD - rf) / mrp
    else:
        bD = p["bD"]
        rD = rf + bD * mrp
    if "bE" in p:
        bE = p["bE"]
        rE = rf + bE * mrp
    else:
        rE = p["rE"]
        bE = (rE - rf) / mrp
    rU = (1 - d) * rE + d * rD
    bU = (1 - d) * bE + d * bD
    assert near(rf + bU * mrp, rU)                     # betaveien = avkastningsveien
    w = (1 - d) * rE + d * rD * (1 - tau)
    assert near(w, rU - d * tau * rD)                  # snarveien
    assert w < rU
    V0 = F1 / (1 + w) + F2 / (1 + w) ** 2
    V1 = F2 / (1 + w)
    D0, D1 = d * V0, d * V1
    adj = D1 - D0
    VU = F1 / (1 + rU) + F2 / (1 + rU) ** 2
    TS1, TS2 = tau * rD * D0, tau * rD * D1
    PVTS = TS1 / (1 + rU) + TS2 / (1 + rU) ** 2
    VLa = VU + PVTS
    assert near(VLa, V0, 1e-12)                        # WACC = APV
    # FTE-identiteten (gjelder eksakt med konstant D/V)
    E0, E1 = (1 - d) * V0, (1 - d) * V1
    FCFE1 = F1 - (1 - tau) * rD * D0 + (D1 - D0)
    assert near(E0 * (1 + rE), FCFE1 + E1, 1e-12)
    FCFE2 = F2 - (1 - tau) * rD * D1 - D1
    assert near(E1 * (1 + rE), FCFE2, 1e-12)
    # feller
    feller = {}
    wR = round(w, 4)
    feller["drift_V0"] = F1 / (1 + wR) + F2 / (1 + wR) ** 2 - V0
    rUR = round(rU, 4)
    feller["drift_VU"] = F1 / (1 + rUR) + F2 / (1 + rUR) ** 2 - VU
    if "DE" in p and p["DE"] < 1:
        dd = p["DE"]
        w_feil = (1 - dd) * rE + dd * rD * (1 - tau)
        feller["V0_DEvekt"] = F1 / (1 + w_feil) + F2 / (1 + w_feil) ** 2
        feller["rU_DEvekt"] = (1 - dd) * rE + dd * rD
        feller["w_DEvekt"] = w_feil
    feller["V0_med_rU"] = VU
    feller["VU_med_w"] = V0
    feller["adj_med_F1"] = d * (F1 + V1) - D0
    feller["adj_med_VU"] = d * (F2 / (1 + rU)) - d * VU
    feller["drift_adj"] = d * (F2 / (1 + wR)) - d * (F1 / (1 + wR) + F2 / (1 + wR) ** 2) - (D1 - D0)
    pv_rD = TS1 / (1 + rD) + TS2 / (1 + rD) ** 2
    feller["PVTS_rD"] = pv_rD
    feller["VL_rD"] = VU + pv_rD
    feller["PVTS_Dt"] = tau * rD * D1 / (1 + rU)
    feller["rU_skatt"] = w
    c.update(d=d, mrp=mrp, rD=rD, bD=bD, rE=rE, bE=bE, rU=rU, bU=bU, w=w, V0=V0, V1=V1,
             D0=D0, D1=D1, adj=adj, VU=VU, TS1=TS1, TS2=TS2, PVTS=PVTS, VLa=VLa,
             E0=E0, E1=E1, FCFE1=FCFE1, feller=feller)
    return c


def bygg_e1(sid, c, tekst):
    """Bygger oppgave 1. `tekst` har body, a- og b-ledd, f-hale og i-hale for settet."""
    cur, M = c["cur"], c["enhet"]
    d, rf, rm, mrp, tau = c["d"], c["rf"], c["rm"], c["mrp"], c["tau"]
    rD, bD, rE, bE, rU, bU, w = c["rD"], c["bD"], c["rE"], c["bE"], c["rU"], c["bU"], c["w"]
    F1, F2, V0, V1, D0, D1, adj = c["F1"], c["F2"], c["V0"], c["V1"], c["D0"], c["D1"], c["adj"]
    VU, TS1, TS2, PVTS = c["VU"], c["TS1"], c["TS2"], c["PVTS"]
    fl = c["feller"]
    k = lambda lab: f"{sid}:1:{lab}"
    parts = []

    # ---- a og b (settet bestemmer retningen på CAPM)
    parts.append(del_("a", 2, tekst["a_body"], tekst["a_sol"], tekst["a_crit"]))
    svar(k("a"), "tall", [tekst["a_tall"]])
    parts.append(del_("b", 2, tekst["b_body"], tekst["b_sol"], tekst["b_crit"]))
    svar(k("b"), "tall", [tekst["b_tall"]])

    # ---- c: r_U
    if "DE" in c:
        vekt = (f"<p><b>Step 1. Weights.</b> D/E = {F(c['DE'], 2)}, so D/V = {F(c['DE'], 2)}/{F(1 + c['DE'], 2)} "
                f"= <b>{F(d)}</b> and E/V = <b>{F(1 - d)}</b>.</p>")
        if c["DE"] < 1:
            vekt_crit = (f"Converts D/E = {F(c['DE'], 2)} into D/V = {F(d)} and E/V = {F(1 - d)}. "
                         f"Using {F(c['DE'], 2)} and {F(1 - c['DE'], 2)} as weights is the trap.")
        else:
            vekt_crit = (f"Converts D/E = {F(c['DE'], 2)} into D/V = {F(d)} and E/V = {F(1 - d)}. "
                         f"A ratio above 1 cannot be a weight, so the conversion is required.")
    else:
        vekt = (f"<p><b>Step 1. Weights.</b> The debt-to-value ratio is given directly: D/V = <b>{F(d, 2)}</b>, "
                f"so E/V = <b>{F(1 - d, 2)}</b>. No conversion is needed here.</p>")
        vekt_crit = (f"Uses D/V = {F(d, 2)} and E/V = {F(1 - d, 2)} directly as weights. "
                     f"Converting a ratio that is already D/V is an error.")
    a1, a2 = (1 - d) * rE, d * rD
    b1, b2 = (1 - d) * bE, d * bD
    c_sol = (vekt +
             f"<p><b>Step 2. Weight the returns (pre-tax WACC = r<sub>U</sub>).</b><br>"
             f"r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = {F(1 - d)}({R(rE)}) + {F(d)}({R(rD)}) "
             f"= {summ([a1, a2], rU, 6)}, so <b>r<sub>U</sub> = {P(rU)}</b></p>"
             f"<p><b>Or through betas.</b> β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = "
             f"{F(1 - d)}({F(bE)}) + {F(d)}({F(bD)}) = {summ([b1, b2], bU, 6)}. Then "
             f"r<sub>U</sub> = {R(rf)} + {F(bU, 6)} × {R(mrp)} = <b>{R(rU)}</b>. Same answer.</p>"
             f"<p>r<sub>U</sub> does not take taxes into account: it is the return on the assets as if the "
             f"company had no debt. The tax rate enters only in the after-tax WACC in (d).</p>")
    c_crit = [vekt_crit,
              f"r_U = {P(rU)}, either by weighting the returns or by weighting the betas "
              f"(β_U = {F(bU)}, not required).",
              "r_U does not take taxes into account. Multiplying r_D by (1 − τ) here gives the WACC "
              "instead of r_U and loses the points.",
              "Show the calculation."]
    parts.append(del_("c", 2, "<p>Find the unlevered cost of capital of the company.</p>", c_sol, c_crit))
    trap_rU = [fl["rU_skatt"] * 100] + ([fl["rU_DEvekt"] * 100] if "rU_DEvekt" in fl else [])
    svar(k("c"), "tall", [tall("r<sub>U</sub>", rU * 100, "%", trap_rU)],
         merknad="Fellen er r_U med skatt (= WACC)" + (" og D/E brukt som vekt." if "rU_DEvekt" in fl else "."))

    # ---- d: WACC
    w1, w2 = (1 - d) * rE, d * rD * (1 - tau)
    d_sol = (f"<p>The tax shield enters through the after-tax cost of debt:</p>"
             f"<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ) = {F(1 - d)}({R(rE)}) + "
             f"{F(d)}({R(rD)})(1 − {F(tau, 2)})<br>= {sm([w1, w2], w, 6)} = <b>{RP(w)}</b></p>"
             f"<p><b>Check.</b> The shortcut r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τr<sub>D</sub> = {R(rU)} − "
             f"{F(d)}({F(tau, 2)})({R(rD)}) = <b>{R(w)}</b> ✓. And r<sub>wacc</sub> &lt; r<sub>U</sub>, as it must "
             f"be: the only difference between the two is the (1 − τ) on r<sub>D</sub>.</p>")
    d_crit = ["Applies (1 − τ) to r_D only, never to r_E.",
              f"r_wacc = {P(w)}.",
              f"Same weights as in (c): E/V = {F(1 - d)}, D/V = {F(d)}.",
              "Bonus, not required: the shortcut r_U − (D/V)τ·r_D as a check. r_wacc above r_U would signal an error."]
    parts.append(del_("d", 2, "<p>Find the after-tax WACC of the company.</p>", d_sol, d_crit))
    trap_w = [rU * 100] + ([fl["w_DEvekt"] * 100] if "w_DEvekt" in fl else [])
    svar(k("d"), "tall", [tall("r<sub>wacc</sub>", w * 100, "%", trap_w)])

    # ---- e: V^L med WACC
    e1, e2 = F1 / (1 + w), F2 / (1 + w) ** 2
    e_sol = (f"<p>Discount the free cash flows at the after-tax WACC. The tax shield is already in the rate, "
             f"so it is not added separately.</p>"
             f"<p>V<sup>L</sup><sub>0</sub> = {F(F1, 0)}/{R(1 + w)} + {F(F2, 0)}/{R(1 + w)}<sup>2</sup> = "
             f"{sm([e1, e2], V0)} = <b>{cur}{F(V0)} million</b></p>")
    e_crit = [f"Discounts both cash flows at r_wacc = {P(w)}, the year-2 flow twice.",
              f"V^L_0 = {F(V0)}.",
              "Does not add a tax shield on top: the WACC already contains it. Doing both is double counting."]
    if F1 < 0:
        e_crit.insert(1, f"Keeps the sign of the negative year-1 flow ({F(F1, 0)}).")
    parts.append(del_("e", 2, "<p>Find the levered value of the company today using the WACC method.</p>",
                      e_sol, e_crit))
    fe = [fl["V0_med_rU"]] + ([fl["V0_DEvekt"]] if "V0_DEvekt" in fl else [])
    svar(k("e"), "tall", [tall("V<sup>L</sup><sub>0</sub> (WACC)", V0, M, fe, fl["drift_V0"])],
         merknad="Toleransen er satt så V^U (diskontert med r_U)" +
                 (" og D/E brukt som vekt" if "V0_DEvekt" in fl else "") + " faller utenfor.")

    # ---- f: gjeldsjustering
    retning = "borrows" if adj > 0 else "repays"
    f_sol = (f"<p>The company keeps D/V = {F(d)} at all times, so D<sub>t</sub> = (D/V) × V<sup>L</sup><sub>t</sub>.</p>"
             f"<p><b>Year 0:</b> D<sub>0</sub> = {F(d)} × {F(V0)} = <b>{F(D0)}</b></p>"
             f"<p><b>Year 1:</b> after the year-1 cash flow is paid out, only the year-2 flow is left: "
             f"V<sup>L</sup><sub>1</sub> = {F(F2, 0)}/{R(1 + w)} = <b>{F(V1)}</b>, so "
             f"D<sub>1</sub> = {F(d)} × {F(V1)} = <b>{F(D1)}</b></p>"
             f"<p><b>Debt adjustment:</b> D<sub>1</sub> − D<sub>0</sub> = {F(D1)} − {F(D0)} = <b>{F(adj)}</b>. "
             + tekst["f_ord"] + "</p>")
    f_crit = [f"D_t = (D/V)·V^L_t at both dates, with D/V = {F(d)}.",
              f"V^L_1 = {F(V1)}: the value after the year-1 cash flow, so only the year-2 flow. "
              f"Including the year-1 flow ({F(F1, 0)}) is the classic mistake.",
              f"D_0 = {F(D0)}, D_1 = {F(D1)}, adjustment {F(abs(adj))}.",
              f"Says in words that the company {retning} " +
              ("more" if adj > 0 else "part of the debt") + " to keep the ratio constant. "
              "Kurbatov's H2025 key ends the same part with that sentence."] + tekst.get("f_crit_extra", [])
    parts.append(del_("f", 2, "<p>Find the debt adjustment at the end of Year 1. Does the company borrow or repay?</p>",
                      f_sol, f_crit))
    svar(k("f"), "blandet",
         [tall("Debt adjustment", adj, M, [fl["adj_med_F1"], fl["adj_med_VU"]], fl["drift_adj"], alt=[-adj],
               tolmax=0.002)],
         tallPoeng=1.5, tekstLedd="Does the company borrow or repay?",
         merknad="Begge fortegn godtas for tallet (D1 − D0 eller D0 − D1). Retningen rettes i tekstdelen. "
                 "Toleransen er høyst 0,2 % fordi justeringen regnet med V^U ligger under 1 % unna.")

    # ---- g: V^U
    g1, g2 = F1 / (1 + rU), F2 / (1 + rU) ** 2
    g_sol = (f"<p>The APV method starts from the same free cash flows as if the company had no debt, "
             f"discounted at r<sub>U</sub> = {P(rU)}:</p>"
             f"<p>V<sup>U</sup><sub>0</sub> = {F(F1, 0)}/{R(1 + rU)} + {F(F2, 0)}/{R(1 + rU)}<sup>2</sup> = "
             f"{sm([g1, g2], VU)} = <b>{cur}{F(VU)} million</b></p>"
             f"<p>V<sup>U</sup> is below V<sup>L</sup> from (e). The gap is the value of the tax shield, found in (h).</p>")
    g_crit = [f"Discounts the same free cash flows at r_U = {P(rU)}, not at the WACC.",
              f"V^U = {F(VU)}.",
              "No change to the cash flows themselves: they are already unlevered."]
    parts.append(del_("g", 2, "<p>Find the unlevered value of the company using the APV method.</p>", g_sol, g_crit))
    svar(k("g"), "tall", [tall("V<sup>U</sup><sub>0</sub>", VU, M, [fl["VU_med_w"]], fl["drift_VU"])],
         merknad="Toleransen er satt så V^L (diskontert med WACC) faller utenfor.")

    # ---- h: skatteskjold
    h1, h2 = TS1 / (1 + rU), TS2 / (1 + rU) ** 2
    h_sol = (f"<p><b>Step 1. The shields.</b> The tax shield in year t is τ × r<sub>D</sub> × D<sub>t−1</sub>, "
             f"on the debt outstanding at the start of the year (from (f)):</p>"
             f"<p>TS<sub>1</sub> = {F(tau, 2)} × {R(rD)} × {F(D0)} = <b>{F(TS1)}</b><br>"
             f"TS<sub>2</sub> = {F(tau, 2)} × {R(rD)} × {F(D1)} = <b>{F(TS2)}</b></p>"
             f"<p><b>Step 2. The rate.</b> The company rebalances to a constant D/V, so its debt moves with the "
             f"value of the assets and the tax shield moves with it. The shield carries asset risk and is discounted "
             f"at <b>r<sub>U</sub> = {P(rU)}</b>, not at r<sub>D</sub>.</p>"
             f"<p>PV(TS) = {F(TS1)}/{R(1 + rU)} + {F(TS2)}/{R(1 + rU)}<sup>2</sup> = {sm([h1, h2], PVTS)} = "
             f"<b>{cur}{F(PVTS)} million</b></p>")
    h_crit = [f"TS_t = τ·r_D·D_(t−1): TS_1 = {F(TS1)} on D_0 and TS_2 = {F(TS2)} on D_1.",
              f"Discounts the shields at r_U. Using r_D gives {F(fl['PVTS_rD'])} and loses the point.",
              f"PV(TS) = {F(PVTS)}.",
              "Bonus, not required: saying why r_U (constant D/V makes the debt move with firm value).",
              "Carries 4 decimals through the chain."]
    parts.append(del_("h", 2, "<p>Find the interest tax shield in each year and its present value.</p>", h_sol, h_crit))
    svar(k("h"), "tall",
         [tall("TS<sub>1</sub>", TS1, M), tall("TS<sub>2</sub>", TS2, M),
          tall("PV(TS)", PVTS, M, [fl["PVTS_rD"], fl["PVTS_Dt"]])])

    # ---- i: APV og hale
    i_sol = (f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {sm([VU, PVTS], c['VLa'])} = "
             f"<b>{cur}{F(c['VLa'])} million</b></p>"
             f"<p><b>Check.</b> The WACC method in (e) gave {F(V0)}, so the two methods agree. "
             + ("" if tekst.get("i_hvorfor") else "They are the same valuation, with the tax shield counted once "
                "in the discount rate and once as a separate cash flow. ") +
             f"The check is not independent (the debt in (f) came from the WACC value), but it catches a wrong "
             f"rate on the shield and arithmetic slips.</p>" + tekst["i_ord"])
    i_crit = [f"V^L = V^U + PV(TS) = {F(c['VLa'])}.",
              f"States that this equals the WACC value from (e). A gap of about 0.001 is rounding, "
              f"about 0.05 is an error (the H2025 key, part (i))."] + tekst["i_crit"]
    parts.append(del_("i", 2, tekst["i_body"], i_sol, i_crit))
    svar(k("i"), "blandet",
         [tall("V<sup>L</sup><sub>0</sub> (APV)", c["VLa"], M, [fl["VL_rD"]], fl["drift_V0"])],
         tallPoeng=1, tekstLedd=tekst["i_ledd"],
         merknad="Toleransen er satt så skjoldet diskontert med r_D faller utenfor.")

    return {"n": 1, "title": "Valuation with leverage", "points": 18, "topic": "WACC and APV",
            "chapters": [3, 4, 17, 18, 19], "merke": "Som H2025 E4: WACC og APV over to år",
            "body": tekst["body"], "parts": parts}


# ---------------------------------------------------------------- del1-f3 oppgave 1
c3 = regn_e1(dict(cur="NOK ", enhet="NOK m", DV=0.35, rf=0.04, rm=0.09, rD=0.065, bE=1.7, tau=0.22,
                  F1=84.0, F2=36.0))
assert c3["adj"] < 0
t3 = {
    "body": ("<p>Your task is to value Utvær Decommissioning, which removes two old offshore platforms under a "
             "fixed-price contract. The company maintains a debt-to-value ratio of 35%. "
             "It will exist for 2 years: today is Year 0 and the company generates free cash flows of "
             "NOK 84 million at the end of Year 1 and NOK 36 million at the end of Year 2. The risk-free rate is 4% per year and will stay the same. The cost of debt is 6.5%. "
             "The tax rate is 22%. The market portfolio has an expected return of 9%. The equity beta of "
             "the company is 1.7.</p>"
             "<p>Each question is worth 2 points. Use 4 decimal places (1.2345, not 1.23).</p>"),
    "a_body": "<p>Find the debt beta of the company.</p>",
    "a_sol": (f"<p>The debt is risky (r<sub>D</sub> = 6.5% &gt; r<sub>f</sub> = 4%), so its beta is positive. "
              f"Invert the CAPM for the debt. The market risk premium is 0.09 − 0.04 = {R(c3['mrp'])}.</p>"
              f"<p>β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
              f"(0.065 − 0.04)/0.05 = <b>{F(c3['bD'])}</b></p>"),
    "a_crit": ["CAPM in reverse on the debt: β_D = (r_D − r_f)/(E[R_Mkt] − r_f).",
               "Market risk premium 9% − 4% = 5%, not 9%.",
               f"β_D = {F(c3['bD'])}. Setting β_D = 0 because 'debt is safe' contradicts r_D = 6.5%."],
    "a_tall": tall("β<sub>D</sub>", c3["bD"], ""),
    "b_body": "<p>Find the cost of equity of the company.</p>",
    "b_sol": (f"<p>CAPM on the equity: r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>Mkt</sub>] − r<sub>f</sub>) "
              f"= 0.04 + 1.7 × 0.05 = <b>{RP(c3['rE'])}</b></p>"),
    "b_crit": ["Plugs β_E = 1.7 into the CAPM with the 5% premium.",
               f"r_E = {P(c3['rE'])}. Using 9% as the premium (19.30%) is the trap."],
    "b_tall": tall("r<sub>E</sub>", c3["rE"] * 100, "%"),
    "f_ord": ("The company <b>repays</b> debt at the end of Year 1. Most of its value is paid out as the large "
              "year-1 cash flow, so the value that remains and the debt it can carry at 35% fall sharply."),
    "i_body": ("<p>Find the levered value using the APV method. Compare with (e) and explain in one sentence "
               "why you get this result.</p>"),
    "i_ord": ("<p><b>Why.</b> Both methods value the same cash flows with the same debt policy (constant D/V); "
              "WACC puts the tax shield into a lower discount rate, APV adds it as a separate cash flow "
              "discounted at r<sub>U</sub>, so they must give the same value.</p>"),
    "i_crit": ["One sentence on why: the same tax shield under the same debt policy, counted in the rate "
               "(WACC) or as a separate cash flow (APV). 'Anything reasonable' about the two being one "
               "valuation earns the point."],
    "i_ledd": "Compare with (e) and explain in one sentence.",
    "i_hvorfor": True,
}
E1_F3 = bygg_e1("del1-f3", c3, t3)


# ---------------------------------------------------------------- del1-f4 oppgave 1
c4 = regn_e1(dict(cur="$", enhet="$ m", DE=0.5, rf=0.035, rm=0.085, bD=0.3, rE=0.13, tau=0.25,
                  F1=55.0, F2=55.0))
assert c4["adj"] < 0
assert c4["feller"]["VL_rD"] > c4["VLa"]                 # skjold med r_D gir høyere verdi
t4 = {
    "body": ("<p>Kolvik Data Centres has leased its whole server hall to one cloud provider for the next "
             "two years. Then the company will be wound up. The lease gives free "
             "cash flows of $55 million at the end of Year 1 and $55 million at the end of Year 2. Kolvik "
             "keeps a debt-to-equity ratio of 0.5 throughout. Its debt has a beta of 0.3 and investors expect "
             "a return of 13% on its equity. The risk-free rate is 3.5% per year and will stay the same. The "
             "expected return on the market portfolio is 8.5% and the tax rate is 25%.</p>"
             "<p>Each question is worth 2 points. Use 4 decimal places (1.2345, not 1.23).</p>"),
    "a_body": "<p>Find the cost of debt of the company.</p>",
    "a_sol": (f"<p>CAPM on the debt, with the debt beta given. The market risk premium is "
              f"0.085 − 0.035 = {R(c4['mrp'])}.</p>"
              f"<p>r<sub>D</sub> = r<sub>f</sub> + β<sub>D</sub>(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
              f"0.035 + 0.3 × 0.05 = <b>{RP(c4['rD'])}</b></p>"
              f"<p>The debt is risky, so r<sub>D</sub> is above r<sub>f</sub>.</p>"),
    "a_crit": ["CAPM on the debt: r_D = r_f + β_D(E[R_Mkt] − r_f).",
               "Market risk premium 8.5% − 3.5% = 5%.",
               f"r_D = {P(c4['rD'])}. Using r_D = r_f because 'debt is safe' ignores the given beta of 0.3."],
    "a_tall": tall("r<sub>D</sub>", c4["rD"] * 100, "%"),
    "b_body": "<p>Find the equity beta of the company.</p>",
    "b_sol": (f"<p>This time the CAPM runs backwards, from the expected return to the beta:</p>"
              f"<p>β<sub>E</sub> = (r<sub>E</sub> − r<sub>f</sub>)/(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
              f"(0.13 − 0.035)/0.05 = <b>{F(c4['bE'])}</b></p>"),
    "b_crit": ["Inverts the CAPM on the equity.",
               f"β_E = {F(c4['bE'])}. Dividing by 8.5% instead of the 5% premium is the trap."],
    "b_tall": tall("β<sub>E</sub>", c4["bE"], ""),
    "f_ord": ("The company <b>repays</b> debt. The cash flows are flat, but after Year 1 only one of them "
              "is left, so the value falls and the debt must fall with it to keep D/E at 0.5."),
    "i_body": ("<p>Find the levered value using the APV method and compare with (e). A colleague discounted "
               f"the tax shields at the cost of debt and got ${F(c4['feller']['VL_rD'])} million. Is the "
               "colleague right? Explain briefly.</p>"),
    "i_ord": (f"<p><b>The colleague.</b> No. With r<sub>D</sub> = {P(c4['rD'])} the shields are worth "
              f"{F(c4['feller']['PVTS_rD'])} instead of {F(c4['PVTS'])}, so the value is too high. Kolvik keeps a "
              f"constant D/E, so its debt and the tax shield move with the value of the assets and carry asset "
              f"risk: r<sub>U</sub> is the right rate. r<sub>D</sub> fits only a debt schedule fixed in advance.</p>"),
    "i_crit": ["Says the colleague is wrong (the value is too high).",
               "Why: with a constant D/E the debt follows firm value, so the shield has the risk of the assets "
               "and is discounted at r_U. r_D fits only debt fixed in advance."],
    "i_ledd": "Is the colleague who discounted the tax shields at r_D right?",
}
E1_F4 = bygg_e1("del1-f4", c4, t4)


# ---------------------------------------------------------------- del1-f5 oppgave 1
c5 = regn_e1(dict(cur="€", enhet="€ m", DE=1.5, rf=0.04, rm=0.08, rD=0.06, bE=2.2, tau=0.25,
                  F1=-12.0, F2=160.0))
assert c5["adj"] > 0                                     # gjelden øker i år 1
assert c5["V1"] > c5["V0"]
# Med fast gjeld D0 gjennom år 2 ville D/V ved utgangen av år 1 bli en annen enn 0,6:
D_fast = c5["D0"]
VU1 = c5["F2"] / (1 + c5["rU"])
V1_fast = VU1 + c5["tau"] * c5["rD"] * D_fast / (1 + c5["rD"])
dv1_fast = D_fast / V1_fast
assert abs(dv1_fast - c5["d"]) > 0.05
t5 = {
    "body": ("<p>Brennmoen Solar will finish a solar park next year and "
             "sell it the year after. It keeps a debt-to-equity ratio of 1.5 throughout. The free cash flow is "
             "−€12 million at the end of Year 1 (last construction costs) "
             "and €160 million at the end of Year 2 (including the sale of the park). The company is "
             "then closed. The cost of debt is 6% and the equity beta is 2.2. The risk-free rate "
             "is 4% per year and will stay the same, the market portfolio has an expected return of 8% and "
             "the tax rate is 25%.</p>"
             "<p>Each question is worth 2 points. Use 4 decimal places (1.2345, not 1.23).</p>"),
    "a_body": "<p>Find the debt beta of the company.</p>",
    "a_sol": (f"<p>The debt is risky (r<sub>D</sub> = 6% &gt; r<sub>f</sub> = 4%). The market risk premium is "
              f"0.08 − 0.04 = {R(c5['mrp'])}.</p>"
              f"<p>β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
              f"(0.06 − 0.04)/0.04 = <b>{F(c5['bD'])}</b></p>"),
    "a_crit": ["CAPM in reverse on the debt.",
               "Market risk premium 8% − 4% = 4%, not 8%.",
               f"β_D = {F(c5['bD'])}."],
    "a_tall": tall("β<sub>D</sub>", c5["bD"], ""),
    "b_body": "<p>Find the cost of equity of the company.</p>",
    "b_sol": (f"<p>r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = "
              f"0.04 + 2.2 × 0.04 = <b>{RP(c5['rE'])}</b></p>"
              f"<p>The equity beta is high because the company is highly levered (D/E = 1.5).</p>"),
    "b_crit": ["CAPM on the equity with the 4% premium.",
               f"r_E = {P(c5['rE'])}. Using 8% as the premium (21.60%) is the trap."],
    "b_tall": tall("r<sub>E</sub>", c5["rE"] * 100, "%"),
    "f_ord": ("The company <b>borrows</b> more at the end of Year 1. Its value rises from Year 0 to Year 1, "
              "because the year-1 cash flow is negative and the large year-2 flow comes one year closer, so "
              "the company needs more debt to keep D/E at 1.5. The new borrowing also helps fund the negative "
              "year-1 cash flow."),
    "f_crit_extra": ["The sign is the point of this part: here the debt goes up, not down. "
                     "Assuming a repayment by habit (as in a declining project) loses the text point."],
    "i_body": ("<p>Find the levered value using the APV method and compare with (e). Could a single WACC as in "
               "(e) still be used if Brennmoen kept its debt fixed at the Year-0 amount? Explain briefly.</p>"),
    "i_ord": (f"<p><b>Fixed debt.</b> No. A single r<sub>wacc</sub> assumes a constant D/V. With the debt fixed at "
              f"D<sub>0</sub> = {F(c5['D0'])}, the ratio would drift (to about {F(dv1_fast, 2)} at the end of Year 1 "
              f"instead of {F(c5['d'], 2)}), so r<sub>E</sub> and the WACC would change from year to year. The "
              f"company should then use APV, with the tax shields of the fixed schedule discounted at "
              f"r<sub>D</sub>.</p>"),
    "i_crit": ["Says no: one constant WACC works only with a constant debt ratio. With fixed debt D/V changes "
               "as the value changes. 'Not with one constant WACC; it would have to change every year' earns "
               "full points.",
               "Bonus, not required: naming APV with the shields of the fixed debt discounted at r_D, or the "
               "drifting ratio (about " + F(dv1_fast, 2) + ")."],
    "i_ledd": "Could a single WACC as in (e) still be used with the debt fixed at the Year-0 amount?",
}
E1_F5 = bygg_e1("del1-f5", c5, t5)


# ============================================================ OPPGAVE 2: H2024 E5-formen
def regn_e2(p):
    c = dict(p)
    rf, rm, tau, FCF, g = p["rf"], p["rm"], p["tau"], p["FCF"], p.get("g", 0.0)
    mrp = rm - rf
    tw = []
    for t in p["tvillinger"]:
        dt = t["DV"] if "DV" in t else t["DE"] / (1 + t["DE"])
        bUt = (1 - dt) * t["bE"] + dt * t["bD"]
        tw.append(dict(t, d=dt, bU=bUt))
    bU = sum(t["bU"] for t in tw) / len(tw)
    rU = rf + bU * mrp
    d = p["DV"] if "DV" in p else p["DE"] / (1 + p["DE"])
    DE = d / (1 - d)
    rD = p["rD"]
    bD = (rD - rf) / mrp
    bE = bU + DE * (bU - bD)
    rE = rf + bE * mrp
    assert near(rE, rU + DE * (rU - rD))                 # MM II = CAPM på relevert beta
    assert near((1 - d) * bE + d * bD, bU)               # vektede betaer gir beta_U (identitet)
    assert near((1 - d) * rE + d * rD, rU)               # førskatt-WACC = r_U (identitet)
    w = (1 - d) * rE + d * rD * (1 - tau)
    assert near(w, rU - d * tau * rD) and w < rU
    VL = FCF / (w - g)
    VU = FCF / (rU - g)
    D = d * VL
    TS = tau * rD * D
    PVTS = TS / (rU - g)
    assert near(VU + PVTS, VL, 1e-12)                    # WACC = APV
    E = VL - D
    assert near(E * (rE - g), FCF - (1 - tau) * rD * D + g * D, 1e-12)   # FTE
    fl = {}
    # feller
    fl["rU_vektfeil_per"] = []                         # én tvilling med feil form på gjeldsgraden
    for i, t in enumerate(tw):
        if "DE" in t:
            dd = t["DE"]                                  # D/E brukt som vekt
        else:
            dd = t["DV"] / (1 + t["DV"])                  # D/V lest som D/E
        b = [x["bU"] for x in tw]
        b[i] = (1 - dd) * t["bE"] + dd * t["bD"]
        fl["rU_vektfeil_per"].append(rf + sum(b) / len(b) * mrp)
    fl["rU_vektfeil"] = fl["rU_vektfeil_per"][0]
    fl["rU_bD0"] = rf + sum((1 - t["d"]) * t["bE"] for t in tw) / len(tw) * mrp
    fl["rE_DVsomDE"] = rU + d * (rU - rD)
    fl["VL_rU"] = VU
    fl["PVTS_rD"] = TS / (rD - g)
    fl["VL_rD"] = VU + fl["PVTS_rD"]
    fl["drift_VL"] = FCF / (round(w, 4) - g) - VL
    fl["drift_VU"] = FCF / (round(rU, 4) - g) - VU
    c.update(mrp=mrp, tw=tw, bU=bU, rU=rU, d=d, DE=DE, rD=rD, bD=bD, bE=bE, rE=rE, w=w, VL=VL,
             VU=VU, D=D, TS=TS, PVTS=PVTS, E=E, g=g, feller=fl)
    return c


def vl_fra_bU(c, bUx):
    """V^L for målet hvis beta_U hadde vært bUx (til feller nedover i kjeden)."""
    rUx = c["rf"] + bUx * c["mrp"]
    rEx = rUx + c["DE"] * (rUx - c["rD"])
    wx = (1 - c["d"]) * rEx + c["d"] * c["rD"] * (1 - c["tau"])
    return rUx, c["FCF"] / (wx - c["g"])


def relever_tekst(c, navn):
    d, DE, rU, rD, bU, bD, bE, rE, rf, mrp = (c[x] for x in ("d", "DE", "rU", "rD", "bU", "bD", "bE", "rE", "rf", "mrp"))
    if "DV" in c:
        lev = (f"<p><b>Step 1. {navn}'s leverage as D/E.</b> D/V = {F(d, 2)}, so E/V = {F(1 - d, 2)} and "
               f"D/E = {F(d, 2)}/{F(1 - d, 2)} = <b>{F(DE)}</b>.</p>")
    else:
        lev = (f"<p><b>Step 1. {navn}'s leverage.</b> D/E = {F(DE, 2)} is given, so D/V = {F(DE, 2)}/{F(1 + DE, 2)} = "
               f"<b>{F(d)}</b>.</p>")
    s = (lev +
         f"<p><b>Step 2. {navn}'s debt beta</b> from its cost of debt: β<sub>D</sub> = ({R(rD)} − {R(rf)})/{R(mrp)} = "
         f"<b>{F(bD)}</b>.</p>"
         f"<p><b>Step 3. Relever.</b> Rearranging β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>:</p>"
         f"<p>β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>) = {B(bU)} + {F(DE)}({B(bU)} − {B(bD)}) "
         f"= <b>{F(bE)}</b></p>"
         f"<p>r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = {R(rf)} + "
         f"{F(bE)} × {R(mrp)} = <b>{RP(rE)}</b></p>"
         f"<p><b>Same answer with MM II.</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = "
         f"{R(rU)} + {F(DE)}({R(rU)} − {R(rD)}) = <b>{R(rE)}</b> ✓ (an identity once the CAPM holds, not an "
         f"independent check).</p>")
    return s


def wacc_tekst(c, navn):
    d, rE, rD, tau, w, rU = (c[x] for x in ("d", "rE", "rD", "tau", "w", "rU"))
    a1, a2 = (1 - d) * rE, d * rD * (1 - tau)
    return (f"<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ) = {F(1 - d)}({R(rE)}) + "
            f"{F(d)}({R(rD)})(1 − {F(tau, 2)})<br>= {sm([a1, a2], w, 6)} = <b>{RP(w)}</b></p>"
            f"<p><b>Check.</b> r<sub>U</sub> − (D/V)τr<sub>D</sub> = {R(rU)} − {F(d)}({F(tau, 2)})({R(rD)}) = "
            f"<b>{R(w)}</b> ✓, below r<sub>U</sub> as it must be.</p>")


def wacc_crit(c):
    return ["Applies (1 − τ) to r_D only.",
            f"Uses the target's own weights, E/V = {F(1 - c['d'])} and D/V = {F(c['d'])}.",
            f"r_wacc = {P(c['w'])}."]


# ---------------------------------------------------------------- del1-f3 oppgave 2
h3 = regn_e2(dict(cur="NOK ", enhet="NOK m", FCF=310.0, DV=0.5, rD=0.05, tau=0.22, rf=0.03, rm=0.08,
                  tvillinger=[dict(navn="Smøla Nutrition", DE=0.4, bD=0.2, bE=1.3)]))
tw = h3["tw"][0]
# halen: tvillingens beta_E brukt direkte
rE_feil = h3["rf"] + tw["bE"] * h3["mrp"]
w_feil = (1 - h3["d"]) * rE_feil + h3["d"] * h3["rD"] * (1 - h3["tau"])
VL_halefeil = h3["FCF"] / w_feil
assert tw["d"] < h3["d"] and tw["bE"] < h3["bE"] and VL_halefeil > h3["VL"]   # overvurdering

def bygg_e2_f3():
    c, fl = h3, h3["feller"]
    k = lambda lab: f"del1-f3:2:{lab}"
    body = ("<p>A private equity fund is considering buying the unlisted fish-feed producer Hitra Feed and "
            "asks you to value it. Hitra Feed is expected to generate a free cash flow of NOK 310 million per "
            "year forever, starting next year, with no growth. It maintains a constant debt-to-value ratio of "
            "50% and its cost of debt is 5%. The listed company Smøla Nutrition makes the same products for the "
            "same customers, so its business risk is the same as Hitra Feed's. Smøla Nutrition maintains a "
            "debt-to-equity ratio of 0.4. Its debt has a beta of 0.2 and its equity has a beta of 1.3. The tax "
            "rate is 22%, the risk-free rate is 3% and the expected return on the market portfolio is 8%.</p>")
    a1, a2 = (1 - tw["d"]) * tw["bE"], tw["d"] * tw["bD"]
    a_sol = (f"<p>Hitra Feed has no market data of its own, but Smøla Nutrition has the same business risk. The "
             f"two firms have different leverage, so their equity betas differ. What transfers is the "
             f"<b>unlevered</b> beta.</p>"
             f"<p><b>Step 1. Smøla's weights.</b> D/E = 0.4, so D/V = 0.4/1.4 = <b>{F(tw['d'])}</b> and "
             f"E/V = 1/1.4 = <b>{F(1 - tw['d'])}</b>.</p>"
             f"<p><b>Step 2. Unlever Smøla</b> (without taxes, the course convention):<br>"
             f"β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {F(1 - tw['d'])}(1.3) + {F(tw['d'])}(0.2) = "
             f"{sm([a1, a2], c['bU'])} = <b>{F(c['bU'])}</b></p>"
             f"<p><b>Step 3. CAPM.</b> The market risk premium is 0.08 − 0.03 = {R(c['mrp'])}.<br>"
             f"r<sub>U</sub> = 0.03 + {B(c['bU'])} × 0.05 = <b>{RP(c['rU'])}</b></p>"
             f"<p><b>Step 4. Transfer.</b> Same business risk, so Hitra Feed's r<sub>U</sub> is also {P(c['rU'])}. "
             f"Hitra Feed's own leverage plays no part yet.</p>")
    a_crit = ["Uses the unlevered beta, not the equity beta, of Smøla Nutrition. Bonus, not required: saying "
              "why (same business risk but different leverage).",
              f"Converts Smøla's D/E = 0.4 into D/V = {F(tw['d'])}. Using 0.4 and 0.6 as weights is the trap "
              f"(r_U = {P(fl['rU_vektfeil'])}).",
              f"Includes Smøla's debt beta of 0.2: β_U = {F(c['bU'])}, weighted without taxes.",
              f"r_U = {P(c['rU'])}.",
              "Does not use Hitra Feed's 50% here."]
    b_sol = relever_tekst(c, "Hitra Feed")
    b_crit = [f"Converts Hitra Feed's D/V = 0.5 into D/E = {F(c['DE'], 2)}. Plugging 0.5 into MM II as D/E gives "
              f"r_E = {P(fl['rE_DVsomDE'])} and is the trap.",
              f"Finds Hitra Feed's own debt beta from r_D = 5%: β_D = {F(c['bD'])}. Using Smøla's 0.2 is an error.",
              f"β_E = {F(c['bE'])} and r_E = {P(c['rE'])}.",
              "Either route (relevered beta in the CAPM, or MM II) earns full points."]
    d_sol = (f"<p>A level perpetuity starting next year, discounted at the after-tax WACC:</p>"
             f"<p>V<sup>L</sup> = FCF/r<sub>wacc</sub> = 310/{R(c['w'])} = <b>NOK {F(c['VL'])} million</b></p>")
    d_crit = [f"V^L = 310/{R(c['w'])} = {F(c['VL'])}.",
              "No separate tax shield: the WACC already contains it."]
    VUp, PVp = c["VU"], c["PVTS"]
    e_sol = (f"<p><b>Step 1. Unlevered value.</b> V<sup>U</sup> = 310/{R(c['rU'])} = <b>{F(VUp)}</b></p>"
             f"<p><b>Step 2. Debt from the WACC value.</b> D = 0.5 × {F(c['VL'])} = <b>{F(c['D'])}</b></p>"
             f"<p><b>Step 3. Tax shield per year.</b> Interest = 0.05 × {F(c['D'])} = {F(c['rD'] * c['D'])}; "
             f"TS = 0.22 × {F(c['rD'] * c['D'])} = <b>{F(c['TS'])}</b> per year, forever.</p>"
             f"<p><b>Step 4. The rate.</b> Hitra Feed keeps a constant D/V, so the debt moves with firm value and "
             f"the tax shield carries asset risk: discount at r<sub>U</sub> = {P(c['rU'])}.<br>"
             f"PV(TS) = {F(c['TS'])}/{R(c['rU'])} = <b>{F(PVp)}</b></p>"
             f"<p><b>Step 5.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {sm([VUp, PVp], VUp + PVp)} = "
             f"<b>NOK {F(VUp + PVp)} million</b></p>"
             f"<p><b>Check.</b> Equal to the WACC value in (d). Not independent, since D came from (d), but it "
             f"catches a wrong rate on the shield: r<sub>D</sub> would give {F(fl['VL_rD'])}.</p>")
    e_crit = [f"V^U = {F(VUp)}, the same FCF discounted at r_U.",
              f"D = 0.5 × V^L from (d) = {F(c['D'])}, as the question instructs.",
              f"TS = τ·r_D·D = {F(c['TS'])} per year.",
              f"Discounts the shield at r_U. r_D gives V^L = {F(fl['VL_rD'])} and loses the points. Bonus, not "
              f"required: saying why (constant D/V).",
              f"PV(TS) = {F(PVp)} and V^L = {F(VUp + PVp)}, equal to (d)."]
    f_sol = (f"<p><b>Overvalue.</b> Smøla Nutrition has less leverage (D/V = {F(tw['d'], 2)}) than Hitra Feed (0.50), "
             f"so its equity beta of 1.3 is lower than Hitra Feed's {F(c['bE'], 2)}. Using 1.3 understates Hitra "
             f"Feed's cost of equity and WACC. A lower discount rate gives too high a value. An equity beta "
             f"carries the firm's own financial risk, so it does not transfer between firms with different "
             f"leverage.</p>"
             f"<p>For reference (not required): with β<sub>E</sub> = 1.3 the WACC would be {P(w_feil)} and the value "
             f"NOK {F(VL_halefeil, 1)} million.</p>")
    f_crit = ["Says overvalue.",
              "Mechanism: Smøla is less levered, so its equity beta is lower; the cost of equity and WACC come out "
              "too low and the value too high.",
              "Says that the equity beta includes financial risk from the firm's own leverage, so only the "
              "unlevered beta transfers. Two sentences are enough."]
    parts = [
        del_("a", 5, "<p>What is the unlevered cost of capital for Hitra Feed?</p>", a_sol, a_crit),
        del_("b", 4, "<p>Find the equity beta and the cost of equity of Hitra Feed.</p>", b_sol, b_crit),
        del_("c", 2, "<p>What is the after-tax WACC of Hitra Feed?</p>", wacc_tekst(c, "Hitra Feed"), wacc_crit(c)),
        del_("d", 2, "<p>What is the levered value of Hitra Feed using the WACC method?</p>", d_sol, d_crit),
        del_("e", 5, "<p>Using the debt implied by the WACC method, find the levered value of Hitra Feed using "
                     "the APV method.</p>", e_sol, e_crit),
        del_("f", 2, "<p>A colleague suggests skipping the unlevering and simply using Smøla Nutrition's equity "
                     "beta of 1.3 for Hitra Feed. Would that overvalue or undervalue Hitra Feed? Explain briefly, "
                     "without new calculations.</p>", f_sol, f_crit),
    ]
    svar(k("a"), "tall", [tall("r<sub>U</sub>", c["rU"] * 100, "%", [fl["rU_vektfeil"] * 100])])
    svar(k("b"), "tall", [tall("β<sub>E</sub>", c["bE"], ""),
                          tall("r<sub>E</sub>", c["rE"] * 100, "%", [fl["rE_DVsomDE"] * 100])])
    svar(k("c"), "tall", [tall("r<sub>wacc</sub>", c["w"] * 100, "%", [c["rU"] * 100])])
    svar(k("d"), "tall", [tall("V<sup>L</sup> (WACC)", c["VL"], c["enhet"], [fl["VL_rU"]], fl["drift_VL"])])
    svar(k("e"), "tall", [tall("V<sup>L</sup> (APV)", VUp + PVp, c["enhet"], [fl["VL_rD"]], fl["drift_VL"])],
         merknad="Bare V^L er spurt etter. Skjoldet med r_D gir en verdi utenfor toleransen.")
    svar(k("f"), "tekst", None)
    return {"n": 2, "title": "Valuation", "points": 20, "topic": "WACC and APV", "chapters": [3, 4, 17, 18],
            "merke": "Som H2024 E5: verdsetting med en tvilling", "body": body, "parts": parts}


E2_F3 = bygg_e2_f3()


# ---------------------------------------------------------------- del1-f4 oppgave 2
h4 = regn_e2(dict(cur="$", enhet="$ m", FCF=75.0, DE=0.6, rD=0.06, tau=0.25, rf=0.04, rm=0.10,
                  tvillinger=[dict(navn="Kaia Freight", DV=0.6, bD=0.3, bE=2.3),
                              dict(navn="Lossi Transport", DE=0.25, bD=0.05, bE=1.05)]))
ka4, lo4 = h4["tw"]
# Feil som må havne klart utenfor (blindkontrollen 23.11.2026): bare ett av firmaene,
# eller snitt av beta_E (og av gjeldsgrad og beta_D) før unlevering, eller snitt av beta_E rett inn.
snitt_d = (ka4["d"] + lo4["d"]) / 2
snitt_bE = (ka4["bE"] + lo4["bE"]) / 2
snitt_bD = (ka4["bD"] + lo4["bD"]) / 2
bU_snittfeil = (1 - snitt_d) * snitt_bE + snitt_d * snitt_bD
F4_FEIL_BU = {"bare Kaia": ka4["bU"], "bare Lossi": lo4["bU"], "snitt av inndata": bU_snittfeil,
              "snitt av beta_E": snitt_bE}
F4_FEIL = {n: vl_fra_bU(h4, b) for n, b in F4_FEIL_BU.items()}
for n, (rUx, VLx) in F4_FEIL.items():
    assert abs(rUx - h4["rU"]) / h4["rU"] > 0.025, n
    assert abs(VLx - h4["VL"]) / h4["VL"] > 0.025, n
assert abs(ka4["bU"] - lo4["bU"]) > 0.2


def bygg_e2_f4():
    c, fl = h4, h4["feller"]
    k = lambda lab: f"del1-f4:2:{lab}"
    ka, lo = ka4, lo4
    body = ("<p>You are valuing Torvet Logistics, an unlisted company that runs refrigerated warehouses for "
            "grocery chains, ahead of a possible stock-market listing. Torvet expects a free cash flow of "
            "$75 million per year forever, starting next year, with no growth. It keeps a constant "
            "debt-to-equity ratio of 0.6 and its cost of debt is 6%. Two listed companies run the same type of "
            "business and have the same business risk:</p>"
            "<table class=\"data\"><tr><th></th><th>Kaia Freight</th><th>Lossi Transport</th></tr>"
            "<tr><td>Leverage</td><td class=\"n\">D/V = 0.6</td><td class=\"n\">D/E = 0.25</td></tr>"
            "<tr><td>Debt beta</td><td class=\"n\">0.30</td><td class=\"n\">0.05</td></tr>"
            "<tr><td>Equity beta</td><td class=\"n\">2.30</td><td class=\"n\">1.05</td></tr></table>"
            "<p>Use the average of the two unlevered betas. The tax rate is 25%, the risk-free rate is 4% and "
            "the expected return on the market portfolio is 10%.</p>")
    k1, k2 = (1 - ka["d"]) * ka["bE"], ka["d"] * ka["bD"]
    l1, l2 = (1 - lo["d"]) * lo["bE"], lo["d"] * lo["bD"]
    a_sol = (f"<p>Neither comparable has Torvet's leverage, so unlever each one, average the unlevered betas "
             f"and only then use the CAPM. The two leverage figures are given in different forms.</p>"
             f"<p><b>Kaia Freight.</b> D/V = 0.6 is given directly, so E/V = 0.4.<br>"
             f"β<sub>U</sub> = 0.4(2.30) + 0.6(0.30) = {summ([k1, k2], ka['bU'])}</p>"
             f"<p><b>Lossi Transport.</b> D/E = 0.25, so D/V = 0.25/1.25 = {F(lo['d'])} and E/V = {F(1 - lo['d'])}.<br>"
             f"β<sub>U</sub> = {F(1 - lo['d'])}(1.05) + {F(lo['d'])}(0.05) = {summ([l1, l2], lo['bU'])}</p>"
             f"<p><b>Average.</b> β<sub>U</sub> = ({F(ka['bU'])} + {F(lo['bU'])})/2 = <b>{B(c['bU'])}</b></p>"
             f"<p><b>CAPM.</b> The market risk premium is 0.10 − 0.04 = {R(c['mrp'])}.<br>"
             f"r<sub>U</sub> = 0.04 + {B(c['bU'])} × 0.06 = <b>{RP(c['rU'])}</b></p>"
             f"<p>The same business risk means Torvet's r<sub>U</sub> is {P(c['rU'])}. The two firms' equity betas "
             f"differ a lot (2.30 and 1.05), but most of the gap is leverage: their unlevered betas are "
             f"{F(ka['bU'], 2)} and {F(lo['bU'], 2)}.</p>")
    a_crit = ["Unlevers each comparable separately and averages the unlevered betas (or the two r_U, which gives "
              "the same answer).",
              f"Kaia: uses D/V = 0.6 directly, β_U = {F(ka['bU'])}. Reading 0.6 as D/E gives r_U = "
              f"{P(fl['rU_vektfeil_per'][0])}.",
              f"Lossi: converts D/E = 0.25 into D/V = {F(lo['d'])}, β_U = {F(lo['bU'])}. Using 0.25 as the weight "
              f"gives r_U = {P(fl['rU_vektfeil_per'][1])}.",
              f"Uses both firms. Kaia alone gives r_U = {P(F4_FEIL['bare Kaia'][0])}, Lossi alone "
              f"{P(F4_FEIL['bare Lossi'][0])}. Averaging the equity betas, leverage and debt betas first and "
              f"unlevering once gives {P(F4_FEIL['snitt av inndata'][0])}.",
              f"Average β_U = {F(c['bU'])} and r_U = {P(c['rU'])}."]
    b_sol = relever_tekst(c, "Torvet") + (
        f"<p><b>Identity.</b> (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {F(1 - c['d'])}({F(c['bE'])}) + "
        f"{F(c['d'])}({F(c['bD'])}) = {F(c['bU'])} = β<sub>U</sub> ✓. It holds by construction here, so it "
        f"catches arithmetic slips only.</p>")
    b_crit = [f"Uses Torvet's own D/E = 0.6 (D/V = {F(c['d'])}).",
              f"Finds Torvet's debt beta from r_D = 6%: β_D = {F(c['bD'])}.",
              f"β_E = {F(c['bE'])} and r_E = {P(c['rE'])}. MM II gives the same r_E."]
    d_sol = (f"<p>V<sup>L</sup> = FCF/r<sub>wacc</sub> = 75/{R(c['w'])} = <b>${F(c['VL'])} million</b></p>")
    d_crit = [f"V^L = 75/{R(c['w'])} = {F(c['VL'])}.", "No separate tax shield on top."]
    VUp, PVp = c["VU"], c["PVTS"]
    e_sol = (f"<p><b>Step 1.</b> V<sup>U</sup> = 75/{R(c['rU'])} = <b>{F(VUp)}</b></p>"
             f"<p><b>Step 2. Debt from the WACC value.</b> D = (D/V) × V<sup>L</sup> = {F(c['d'])} × {F(c['VL'])} = "
             f"<b>{F(c['D'])}</b></p>"
             f"<p><b>Step 3.</b> TS = τ × r<sub>D</sub> × D = 0.25 × 0.06 × {F(c['D'])} = <b>{F(c['TS'])}</b> per year.</p>"
             f"<p><b>Step 4.</b> Constant D/E: the debt follows firm value, so the shield is discounted at "
             f"r<sub>U</sub>. PV(TS) = {F(c['TS'])}/{R(c['rU'])} = <b>${F(PVp)} million</b></p>"
             f"<p><b>Step 5.</b> V<sup>L</sup> = {sm([VUp, PVp], VUp + PVp)} = <b>${F(VUp + PVp)} million</b>, the "
             f"same as (d) ✓.</p>")
    e_crit = [f"V^U = {F(VUp)}.",
              f"D = {F(c['d'])} × V^L = {F(c['D'])}: D/V, not D/E, times the value. Using 0.6 × V^L is the trap.",
              f"TS = {F(c['TS'])}, discounted at r_U. Bonus, not required: the reason (constant D/E).",
              f"PV(TS) = {F(PVp)} and V^L = {F(VUp + PVp)}, equal to (d)."]
    f_sol = (f"<p>An equity beta measures business risk <i>plus</i> the financial risk from the firm's own "
             f"leverage. Kaia (D/V = 0.6) and Lossi (D/V = {F(lo['d'], 1)}) have very different leverage, so most of "
             f"the gap between their equity betas (2.30 and 1.05) is financial risk that has nothing to do with "
             f"Torvet. An average of the equity betas would describe neither firm's capital structure, let alone "
             f"Torvet's. The unlevered beta strips out each firm's own leverage and leaves the business risk, which "
             f"all three firms share. Averaging two estimates of that same number reduces the noise in each; "
             f"Torvet's own leverage is then added back when relevering in (b).</p>"
             f"<p>For reference (not required): averaging the equity betas, the leverage and the debt betas first "
             f"and unlevering once gives r<sub>U</sub> = {P(F4_FEIL['snitt av inndata'][0])} instead of "
             f"{P(c['rU'])}.</p>")
    f_crit = ["The equity beta contains financial risk from the firm's own leverage; the unlevered beta is business "
              "risk only.",
              "The two firms have very different leverage, so their equity betas are not comparable, while their "
              "unlevered betas measure the same business risk as Torvet's.",
              "Torvet's own leverage is added back when relevering; averaging two unlevered betas reduces the "
              "estimation noise of one firm. Any two of these three points, each with its mechanism, earn full "
              "points."]
    parts = [
        del_("a", 6, "<p>Find the unlevered cost of capital for Torvet Logistics.</p>", a_sol, a_crit),
        del_("b", 3, "<p>Find Torvet's equity beta and cost of equity.</p>", b_sol, b_crit),
        del_("c", 2, "<p>Find Torvet's after-tax WACC.</p>", wacc_tekst(c, "Torvet"), wacc_crit(c)),
        del_("d", 2, "<p>What is the levered value of Torvet using the WACC method?</p>", d_sol, d_crit),
        del_("e", 4, "<p>Using the debt implied by the WACC method, find the present value of the interest tax "
                     "shields and the levered value of Torvet using the APV method.</p>", e_sol, e_crit),
        del_("f", 3, "<p>Why should the two comparables be combined through their unlevered betas and not through "
                     "their equity betas? Explain briefly, without new calculations.</p>", f_sol, f_crit),
    ]
    feller_rU = [x * 100 for x in fl["rU_vektfeil_per"]] + [v[0] * 100 for v in F4_FEIL.values()]
    svar(k("a"), "tall", [tall("r<sub>U</sub>", c["rU"] * 100, "%", feller_rU)],
         merknad="Fellene er feil form på gjeldsgraden for ett av firmaene, bare ett firma og snitt av beta_E.")
    svar(k("b"), "tall", [tall("β<sub>E</sub>", c["bE"], ""),
                          tall("r<sub>E</sub>", c["rE"] * 100, "%", [fl["rE_DVsomDE"] * 100])])
    svar(k("c"), "tall", [tall("r<sub>wacc</sub>", c["w"] * 100, "%", [c["rU"] * 100])])
    svar(k("d"), "tall", [tall("V<sup>L</sup> (WACC)", c["VL"], c["enhet"],
                               [fl["VL_rU"]] + [v[1] for v in F4_FEIL.values()], fl["drift_VL"])])
    D_feil = 0.6 * c["VL"]
    PVTS_Dfeil = c["tau"] * c["rD"] * D_feil / c["rU"]
    svar(k("e"), "tall", [tall("PV(TS)", PVp, c["enhet"], [fl["PVTS_rD"], PVTS_Dfeil]),
                          tall("V<sup>L</sup> (APV)", VUp + PVp, c["enhet"], [fl["VL_rD"], VUp + PVTS_Dfeil],
                               fl["drift_VL"])],
         merknad="Fellene er skjoldet med r_D og D = 0,6 × V^L.")
    svar(k("f"), "tekst", None)
    return {"n": 2, "title": "Valuation", "points": 20, "topic": "WACC and APV", "chapters": [3, 4, 17, 18],
            "merke": "Som H2024 E5: verdsetting med to sammenlignbare firmaer", "body": body, "parts": parts}


E2_F4 = bygg_e2_f4()


# ---------------------------------------------------------------- del1-f5 oppgave 2
h5 = regn_e2(dict(cur="$", enhet="$ m", FCF=24.0, g=0.02, DV=0.45, rD=0.056, tau=0.21, rf=0.035, rm=0.085,
                  tvillinger=[dict(navn="Cedar Point Dental", DV=0.25, bD=0.2, bE=1.4)]))
tw5 = h5["tw"][0]
# halen: tvillingens gjeld behandlet som risikofri
bU_feil = (1 - tw5["d"]) * tw5["bE"]
rU_feil = h5["rf"] + bU_feil * h5["mrp"]
rE_feil5 = rU_feil + h5["DE"] * (rU_feil - h5["rD"])
w_feil5 = (1 - h5["d"]) * rE_feil5 + h5["d"] * h5["rD"] * (1 - h5["tau"])
VL_feil5 = h5["FCF"] / (w_feil5 - h5["g"])
assert bU_feil < h5["bU"] and VL_feil5 > h5["VL"]          # overvurdering
# uten vekst ville verdien vært mye lavere (felle i d)
VL_uten_g = h5["FCF"] / h5["w"]


def bygg_e2_f5():
    c, fl = h5, h5["feller"]
    k = lambda lab: f"del1-f5:2:{lab}"
    body = ("<p>Maple Ridge Dental runs a chain of dental clinics and is owned by its founders, who have asked "
            "you to value it. Next year's free cash flow is expected to be $24 million. Free cash flow will "
            "then grow by 2% per year forever. Maple Ridge keeps a constant debt-to-value ratio of 45% and its "
            "cost of debt is 5.6%. Cedar Point Dental, a listed chain with the same business risk, keeps a "
            "debt-to-value ratio of 25%. Cedar Point's debt has a beta of 0.2 and its equity has a beta of 1.4. "
            "The tax rate is 21%, the risk-free rate is 3.5% and the expected return on the market portfolio "
            "is 8.5%.</p>")
    a1, a2 = (1 - tw5["d"]) * tw5["bE"], tw5["d"] * tw5["bD"]
    a_sol = (f"<p>Cedar Point has the same business risk but different leverage, so unlever its equity beta "
             f"and transfer the unlevered beta.</p>"
             f"<p><b>Step 1. Unlever Cedar Point.</b> D/V = 0.25 is given, so E/V = 0.75:<br>"
             f"β<sub>U</sub> = 0.75(1.4) + 0.25(0.2) = {summ([a1, a2], c['bU'])}</p>"
             f"<p><b>Step 2. CAPM.</b> The market risk premium is 0.085 − 0.035 = {R(c['mrp'])}.<br>"
             f"r<sub>U</sub> = 0.035 + {B(c['bU'])} × 0.05 = <b>{RP(c['rU'])}</b></p>"
             f"<p><b>Step 3.</b> Same business risk, so Maple Ridge's r<sub>U</sub> = {P(c['rU'])}. Growth does not "
             f"change the cost of capital.</p>")
    a_crit = ["Transfers the unlevered beta rather than the equity beta. Bonus, not required: saying why.",
              f"Includes Cedar Point's debt beta: β_U = {F(c['bU'])}. Dropping it gives r_U = {P(fl['rU_bD0'])}.",
              "Uses D/V = 0.25 directly as the weight; weights without taxes.",
              f"r_U = {P(c['rU'])}."]
    b_sol = relever_tekst(c, "Maple Ridge")
    b_crit = [f"Converts D/V = 0.45 into D/E = {F(c['DE'])}. Plugging 0.45 in as D/E gives r_E = "
              f"{P(fl['rE_DVsomDE'])}.",
              f"Maple Ridge's own debt beta from r_D = 5.6%: β_D = {F(c['bD'])}.",
              f"β_E = {F(c['bE'])} and r_E = {P(c['rE'])}."]
    d_sol = (f"<p>The free cash flow is a growing perpetuity, starting next year:</p>"
             f"<p>V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) = 24/({R(c['w'])} − 0.02) = "
             f"24/{R(c['w'] - c['g'])} = <b>${F(c['VL'])} million</b></p>")
    d_crit = [f"Growing perpetuity with FCF_1 = 24 and g = 2%: V^L = {F(c['VL'])}.",
              f"Forgetting the growth gives {F(VL_uten_g)} and loses the points.",
              "No separate tax shield."]
    VUp, PVp = c["VU"], c["PVTS"]
    e_sol = (f"<p><b>Step 1. Unlevered value.</b> V<sup>U</sup> = 24/({R(c['rU'])} − 0.02) = <b>${F(VUp)} million</b></p>"
             f"<p><b>Step 2. Debt today</b> from the WACC value: D<sub>0</sub> = 0.45 × {F(c['VL'])} = <b>{F(c['D'])}</b></p>"
             f"<p><b>Step 3. The shield grows.</b> The company keeps D/V constant while its value grows at 2%, so "
             f"the debt grows at 2% and the tax shield grows with it. Next year's shield is on D<sub>0</sub>:<br>"
             f"TS<sub>1</sub> = 0.21 × 0.056 × {F(c['D'])} = <b>{F(c['TS'])}</b></p>"
             f"<p><b>Step 4.</b> Constant D/V: the shield carries asset risk, so discount at r<sub>U</sub>, as a "
             f"growing perpetuity:<br>PV(TS) = {F(c['TS'])}/({R(c['rU'])} − 0.02) = <b>${F(PVp)} million</b></p>"
             f"<p><b>Step 5.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {sm([VUp, PVp], VUp + PVp)} = "
             f"<b>${F(VUp + PVp)} million</b>, equal to (d) ✓. With the shield at r<sub>D</sub> (also growing) the "
             f"value would be {F(fl['VL_rD'])}, so the check would fail.</p>")
    e_crit = [f"V^U = 24/(r_U − g) = {F(VUp)}.",
              f"D_0 = 0.45 × V^L = {F(c['D'])} and TS_1 = {F(c['TS'])}.",
              "Recognises that the shield grows at 2% with the debt and values it as a growing perpetuity. "
              "Treating it as a level perpetuity is the trap of this part.",
              f"Discounts at r_U: PV(TS) = {F(PVp)}. Bonus, not required: the reason (constant D/V).",
              f"V^L = {F(VUp + PVp)}, equal to (d)."]
    PVTS_nog = c["TS"] / c["rU"]
    f_sol = (f"<p><b>Where 1.0500 comes from.</b> 0.75 × 1.4 = {F(bU_feil)}: the colleague weighted only the equity "
             f"beta and set Cedar Point's debt beta to zero, as if its debt were risk-free. The correct value is "
             f"{F(c['bU'])}, because Cedar Point's debt beta of 0.2 says its debt bears some of the business risk.</p>"
             f"<p><b>Too high.</b> Dropping the positive term (D/V)β<sub>D</sub> understates β<sub>U</sub>, r<sub>U</sub>, "
             f"Maple Ridge's r<sub>E</sub> and its WACC. A lower discount rate gives a higher value: the "
             f"colleague overvalued Maple Ridge.</p>"
             f"<p>For reference (not required): the colleague's value would be about ${F(VL_feil5, 1)} million.</p>")
    f_crit = ["Explains 1.0500 as 0.75 × 1.4: the debt beta was set to zero (debt treated as risk-free).",
              "Says the colleague's value is too high.",
              "Mechanism: a missing positive term makes β_U, r_U and the WACC too low and the value too high. "
              "Two sentences are enough; the number is not required."]
    parts = [
        del_("a", 5, "<p>What is the unlevered cost of capital for Maple Ridge Dental?</p>", a_sol, a_crit),
        del_("b", 4, "<p>Find Maple Ridge's equity beta and cost of equity.</p>", b_sol, b_crit),
        del_("c", 2, "<p>Find Maple Ridge's after-tax WACC.</p>", wacc_tekst(c, "Maple Ridge"), wacc_crit(c)),
        del_("d", 3, "<p>What is the levered value of Maple Ridge using the WACC method?</p>", d_sol, d_crit),
        del_("e", 4, "<p>Using the debt implied by the WACC method, find the unlevered value, the present value "
                     "of the interest tax shields and the levered value of Maple Ridge using the APV method.</p>",
             e_sol, e_crit),
        del_("f", 2, f"<p>A colleague who valued Maple Ridge last week used an unlevered beta of {F(bU_feil)} for "
                     "Cedar Point. Explain where that number comes from. Is the colleague's value of Maple Ridge too "
                     "high, too low or right? Explain briefly, without new calculations.</p>", f_sol, f_crit),
    ]
    svar(k("a"), "tall", [tall("r<sub>U</sub>", c["rU"] * 100, "%", [fl["rU_bD0"] * 100])])
    svar(k("b"), "tall", [tall("β<sub>E</sub>", c["bE"], ""),
                          tall("r<sub>E</sub>", c["rE"] * 100, "%", [fl["rE_DVsomDE"] * 100])])
    svar(k("c"), "tall", [tall("r<sub>wacc</sub>", c["w"] * 100, "%", [c["rU"] * 100])])
    svar(k("d"), "tall", [tall("V<sup>L</sup> (WACC)", c["VL"], c["enhet"], [fl["VL_rU"], VL_uten_g], fl["drift_VL"])])
    svar(k("e"), "tall", [tall("V<sup>U</sup>", VUp, c["enhet"], [c["VL"]], fl["drift_VU"]),
                          tall("PV(TS)", PVp, c["enhet"], [fl["PVTS_rD"], PVTS_nog]),
                          tall("V<sup>L</sup> (APV)", VUp + PVp, c["enhet"], [fl["VL_rD"], VUp + PVTS_nog],
                               fl["drift_VL"])],
         merknad="Fellene er skjoldet med r_D og skjoldet som flat evigrente.")
    svar(k("f"), "tekst", None)
    return {"n": 2, "title": "Valuation", "points": 20, "topic": "WACC and APV", "chapters": [3, 4, 17, 18],
            "merke": "Som H2024 E5: verdsetting med en tvilling", "body": body, "parts": parts}


E2_F5 = bygg_e2_f5()

UT = {"del1-f3": [E1_F3, E2_F3], "del1-f4": [E1_F4, E2_F4], "del1-f5": [E1_F5, E2_F5]}


# ============================================================ kontroller
def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")


def tall_i(tekst):
    t = re.sub(r"[−–]", "-", ren(tekst))
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", m.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


def innenfor(n, v, t):
    return abs(n - v) <= max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)


def tekster(ex):
    for k in ("title", "body", "merke"):
        yield ex[k]
    for p in ex["parts"]:
        yield p["body"]
        yield p["solution"]
        yield from p["criteria"]


feil = []
for sid, liste in UT.items():
    assert [e["n"] for e in liste] == [1, 2]
    assert [e["points"] for e in liste] == [18, 20]
    assert sum(e["points"] for e in liste) == 38
    for ex in liste:
        assert sum(p["points"] for p in ex["parts"]) == ex["points"], (sid, ex["n"])
        if ex["n"] == 1:
            assert [p["points"] for p in ex["parts"]] == [2] * 9
        for t in tekster(ex):
            r = ren(t)
            if "—" in r:
                feil.append(f"{sid}:{ex['n']} tankestrek: {r[:80]}")
            if re.search(r",\s+and\b", r):
                feil.append(f"{sid}:{ex['n']} komma før and: {r[max(0, re.search(r',\s+and', r).start() - 50):][:90]}")
            if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
                feil.append(f"{sid}:{ex['n']} pronomen om Kurbatov")
            if re.search(r"(?<![\w(/])-\d", r):
                feil.append(f"{sid}:{ex['n']} bindestrek som minus: {r[:80]}")
        for c in (c for p in ex["parts"] for c in p["criteria"]):
            if "<" in c:
                feil.append(f"{sid}:{ex['n']} markup i criteria: {c[:60]}")
        for p in ex["parts"]:
            key = f"{sid}:{ex['n']}:{p['label']}"
            if key not in SVAR:
                feil.append(f"mangler svar {key}")
                continue
            e = SVAR[key]
            if e["type"] == "blandet":
                assert 0 < e["tallPoeng"] < p["points"], key
            nums = tall_i(p["solution"] + " " + " ".join(p["criteria"]))
            for t in e.get("tall", []):
                kand = [t["verdi"]] + t.get("alt", [])
                ok = any(innenfor(n, v, t) or (t["enhet"] == "%" and innenfor(n * 100, v, t))
                         for v in kand for n in nums)
                if not ok:
                    feil.append(f"{key}: {t['navn']} = {t['verdi']} står ikke i løsningen")
    # ordtelling (rundt 11 ord per poeng)
    for ex in liste:
        ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex["parts"])).split())
        print(f"{sid} oppgave {ex['n']}: {ord_} ord, {ex['points']} p ({ord_ / ex['points']:.1f} ord per poeng)")

assert set(SVAR) == {f"{s}:{e['n']}:{p['label']}" for s, l in UT.items() for e in l for p in e["parts"]}

if feil:
    for f_ in feil:
        print("FEIL", f_)
    raise SystemExit("skriver ingenting")

json.dump(UT, open(os.path.join(HER, "s1.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(os.path.join(HER, "s1_svar.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Oversikt over hovedtallene (til søk etter gjenbruk og til rapporten)
for navn, c in (("f3 E1", c3), ("f4 E1", c4), ("f5 E1", c5)):
    print(f"{navn}: rU {c['rU']:.6f} w {c['w']:.6f} V0 {c['V0']:.4f} adj {c['adj']:.4f} VU {c['VU']:.4f} PVTS {c['PVTS']:.4f}")
for navn, c in (("f3 E2", h3), ("f4 E2", h4), ("f5 E2", h5)):
    print(f"{navn}: rU {c['rU']:.6f} bE {c['bE']:.4f} rE {c['rE']:.6f} w {c['w']:.6f} VL {c['VL']:.4f} PVTS {c['PVTS']:.4f}")
print("skrev s1.json og s1_svar.json:", len(SVAR), "svar-oppføringer")
