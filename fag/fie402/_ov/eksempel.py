# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: referanseeksempelet (koordinatoren).

   ov-eks1  tvillingfirma → β_U → β_E og r_E → WACC og verdi → intuisjon om
            hvorfor WACC ligger under r_U. Bygd etter H2024 E5 og H2025 E4.

   Dette er formen og kvalitetsnivået alle oppgavene skal ha (docs/fie402-ov-spek.md):
   - alle tall i casen, fasiten, løsningen og fellene kommer fra de samme variablene
   - mellomtallene vises med fire desimaler, og kjeden regnes videre fra de viste
     tallene, så løsningen summerer. Svaret (T.verdi) er den eksakte verdien, og
     oppgaven avviser varianten hvis de to ligger lenger fra hverandre enn toleransen
   - gitt gir tallene en deloppgave trenger når den vises alene
   - hver felle er én navngitt feil, regnet ut i hver variant
"""
from ov_lib import *  # noqa: F401,F403

TVILLINGER = ["Brattli Automation ASA", "Kvamsøy Robotics ASA", "Hellevik Systems ASA", "Rognstad Industri ASA",
              "Tveit Maskin ASA", "Ulvøy Teknikk ASA"]
FIRMA = ["Fjellheim Robotics AS", "Sandnes Automasjon AS", "Lyngvær Motion AS", "Botnen Drives AS",
         "Eikrem Controls AS", "Haugsdal Precision AS"]


def _sjekk(vist, eksakt, rel=0.002):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner utenfor toleransen."""
    if abs(vist - eksakt) > rel * abs(eksakt):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


@oppgave("ov-eks1", tema="tvilling", tittel="Twin firm to WACC and firm value", antall=12,
         sjanger="tvilling", kilde="H2024 E5, H2025 E4")
def _(r):
    tw, fi = r.choice(TVILLINGER), r.choice(FIRMA)
    bE_t = r.choice([1.20, 1.25, 1.30, 1.35, 1.40, 1.50])
    E_t = r.choice([1200, 1500, 1800, 2400])
    wD_t = r.choice([0.20, 0.25, 0.30])
    Dn_t = E_t * wD_t / (1 - wD_t)                       # netto gjeld
    if abs(Dn_t - round(Dn_t)) > 1e-9:
        raise Avvis("netto gjeld er ikke et helt tall")
    Dn_t = round(Dn_t)
    C_t = r.choice([0, 0, 50, 100, 150])                  # overskuddskasse
    Dg_t = Dn_t + C_t                                     # brutto gjeld
    bD_t = r.choice([0.10, 0.15, 0.20])
    w = r.choice([0.30, 0.35, 0.40, 0.45, 0.50])          # Fjellheims mål for D/V
    if abs(w - wD_t) < 0.05:
        raise Avvis("egen gearing for lik tvillingens")
    bD = r.choice([0.15, 0.20, 0.25, 0.30])
    rf = r.choice([0.030, 0.035, 0.040, 0.045])
    mrp = r.choice([0.050, 0.055, 0.060])
    tau = 0.22
    fcf = r.choice([80, 95, 120, 150])
    g = r.choice([0.015, 0.020, 0.025])

    # (a) eksakt og vist
    V_t = E_t + Dn_t
    bU = E_t / V_t * bE_t + Dn_t / V_t * bD_t
    bU4 = rund(bU, 4)
    # (b)
    DE = w / (1 - w)
    bE = bU + DE * (bU - bD)
    bE4 = rund(bU4 + DE * (bU4 - bD), 4)
    rE = rf + bE * mrp
    rE4 = rund(rf + bE4 * mrp, 4)
    _sjekk(bE4, bE)
    _sjekk(rE4, rE)
    # (c)
    rD = rf + bD * mrp
    wacc = (1 - w) * rE + w * rD * (1 - tau)
    wacc4 = rund((1 - w) * rE4 + w * rD * (1 - tau), 4)
    if wacc - g < 0.03:
        raise Avvis("WACC for nær vekstraten")
    V = fcf / (wacc - g)
    V4 = fcf / (wacc4 - g)
    _sjekk(wacc4, wacc)
    _sjekk(V4, V)
    rU = rf + bU * mrp
    rU4 = rund(rf + bU4 * mrp, 4)
    gap = w * tau * rD

    # feller (a)
    f_bd0 = E_t / V_t * bE_t
    Vg = E_t + Dg_t
    f_brutto = E_t / Vg * bE_t + Dg_t / Vg * bD_t
    Ds = Dn_t * (1 - tau)
    f_skatt = E_t / (E_t + Ds) * bE_t + Ds / (E_t + Ds) * bD_t
    # feller (b), regnet fra β_U slik den ble vist
    f_tw = bU4 + Dn_t / E_t * (bU4 - bD)                 # tvillingens D/E
    f_dv = bU4 + w * (bU4 - bD)                          # D/V i stedet for D/E
    f_nb = bU4 * (1 + DE)                                # glemt β_D
    # feller (c)
    f_ingenskatt = (1 - w) * rE4 + w * rD                # glemt (1 − τ)
    f_rf = (1 - w) * rE4 + w * rf * (1 - tau)            # r_D = r_f
    f_VrU = fcf / (rU - g)
    f_Vingen = fcf / wacc4
    f_Vvekst = fcf * (1 + g) / (wacc4 - g)

    kasse = (f" It also holds excess cash of {penger(C_t, 0, 'NOK')} million." if C_t else "")
    case = (f"<p>{fi} is not listed and wants to estimate its cost of capital. {tw} is listed and has the same "
            f"business risk. Market data for {tw}: equity beta {tall(bE_t, 2)}, market value of equity "
            f"{penger(E_t, 0, 'NOK')} million and debt of {penger(Dg_t, 0, 'NOK')} million with a debt beta of "
            f"{tall(bD_t, 2)}.{kasse}</p>"
            f"<p>{fi} will keep a constant debt-to-value ratio D/V of {tall(w, 2)}. Its debt has a beta of "
            f"{tall(bD, 2)}. The risk-free rate is {prosent_tekst(rf * 100, 1)}, the market risk premium is "
            f"{prosent_tekst(mrp * 100, 1)} and the corporate tax rate is 22%. {fi} expects a free cash flow of "
            f"{penger(fcf, 0, 'NOK')} million next year, growing at {prosent_tekst(g * 100, 1)} a year forever.</p>"
            f"<p>Use market values and net debt (debt minus excess cash). Follow the course default: unlever "
            f"without taxes, since D/V is constant. "
            f"Give betas with four decimals and rates in percent with two decimals.</p>")

    netto = (f"Net debt is debt minus excess cash: {tall(Dg_t, 0)} − {tall(C_t, 0)} = {tall(Dn_t, 0)}. "
             if C_t else f"{tw} holds no excess cash, so net debt is the debt, {tall(Dn_t, 0)}. ")
    a = tall_del(
        "a", poeng=4,
        q=f"<p>Find the unlevered (asset) beta β<sub>U</sub> of {tw}.</p>",
        svar=[T("β<sub>U</sub>", bU)],
        kort=(f"<p><b>β<sub>U</sub> = {tall(bU4, 4)}.</b> E/V = {tall(E_t, 0)}/{tall(V_t, 0)} = {tall(E_t / V_t, 4)}: "
              f"β<sub>U</sub> = {tall(E_t / V_t, 4)} × {tall(bE_t, 2)} + {tall(Dn_t / V_t, 4)} × {tall(bD_t, 2)}.</p>"),
        losning=(f"<p>The twin's equity beta mixes business risk with the twin's own financing. Unlevering removes the "
                 f"financing and leaves the risk of the assets, which {fi} shares.</p>"
                 f"<p><b>Step 1: net debt.</b> {netto}Cash is a safe asset that offsets debt, so it belongs in the "
                 f"weights with a minus sign.</p>"
                 f"<p><b>Step 2: weights.</b> V = {tall(E_t, 0)} + {tall(Dn_t, 0)} = {tall(V_t, 0)}, so "
                 f"E/V = {tall(E_t / V_t, 4)} and D/V = {tall(Dn_t / V_t, 4)}.</p>"
                 f"<p><b>Step 3: unlever.</b> β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = "
                 f"{tall(E_t / V_t, 4)} × {tall(bE_t, 2)} + {tall(Dn_t / V_t, 4)} × {tall(bD_t, 2)} = <b>{tall(bU4, 4)}</b>.</p>"
                 f"<p><b>First check.</b> β<sub>U</sub> must lie between β<sub>D</sub> = {tall(bD_t, 2)} and "
                 f"β<sub>E</sub> = {tall(bE_t, 2)}, since it is a weighted average of the two. It does.</p>"
                 f"<p><b>Remember:</b> unlever with net debt and market values, without taxes when D/V is constant.</p>"),
        feller=[F for F in [
            Felle(f_bd0, f"You set the debt beta to zero: β<sub>U</sub> = (E/V)β<sub>E</sub> = {tall(f_bd0, 4)}. "
                         f"The debt is risky (β<sub>D</sub> = {tall(bD_t, 2)}), so it carries part of the asset risk."),
            Felle(f_brutto, f"You used gross debt ({tall(Dg_t, 0)}) in the weights. Excess cash offsets debt, so use "
                            f"net debt.") if C_t else None,
            Felle(f_skatt, f"You used after-tax weights D(1 − τ<sub>c</sub>). Those belong to fixed permanent debt. "
                           f"With constant D/V the course unlevers without taxes."),
        ] if F is not None],
    )

    b = tall_del(
        "b", poeng=4,
        q=f"<p>Relever to {fi}'s capital structure. Find {fi}'s equity beta β<sub>E</sub> and its cost of equity r<sub>E</sub>.</p>",
        gitt=f"<p>From (a): β<sub>U</sub> = {tall(bU4, 4)}.</p>",
        svar=[T("β<sub>E</sub>", bE), T("r<sub>E</sub>", rE * 100, "%")],
        kort=(f"<p><b>β<sub>E</sub> = {tall(bE4, 4)}, r<sub>E</sub> = {pst(rE4, 2)}.</b> D/E = {tall(w, 2)}/{tall(1 - w, 2)} = "
              f"{tall(DE, 4)}: β<sub>E</sub> = {tall(bU4, 4)} + {tall(DE, 4)} × ({tall(bU4, 4)} − {tall(bD, 2)}).</p>"),
        losning=(f"<p>Same business risk, different financing. More debt per unit of equity concentrates the asset "
                 f"risk on the shareholders, so β<sub>E</sub> rises with D/E (MM II in betas).</p>"
                 f"<p><b>Step 1: {fi}'s D/E.</b> D/V = {tall(w, 2)} gives D/E = {tall(w, 2)}/{tall(1 - w, 2)} = {tall(DE, 4)}.</p>"
                 f"<p><b>Step 2: relever with {fi}'s own debt beta.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>) = "
                 f"{tall(bU4, 4)} + {tall(DE, 4)} × ({tall(bU4, 4)} − {tall(bD, 2)}) = <b>{tall(bE4, 4)}</b>.</p>"
                 f"<p><b>Step 3: CAPM.</b> r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub> × MRP = {prosent_tekst(rf * 100, 1)} + "
                 f"{tall(bE4, 4)} × {prosent_tekst(mrp * 100, 1)} = <b>{pst(rE4, 2)}</b>.</p>"
                 f"<p><b>Check 2.</b> (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {tall(1 - w, 2)} × {tall(bE4, 4)} + "
                 f"{tall(w, 2)} × {tall(bD, 2)} = {tall((1 - w) * bE4 + w * bD, 4)}, which is β<sub>U</sub> up to rounding.</p>"
                 f"<p><b>Remember:</b> relever with your own D/E and your own debt beta, never the twin's.</p>"),
        feller=[
            Felle(f_tw, f"You relevered with the twin's D/E ({tall(Dn_t / E_t, 4)}). The equity beta must reflect "
                        f"{fi}'s own financing.", i=0),
            Felle(f_dv, "You used D/V instead of D/E in the relevering formula. The ratio is debt per unit of equity.", i=0),
            Felle(f_nb, "You relevered as if the debt were risk-free: β<sub>U</sub>(1 + D/E) leaves out β<sub>D</sub>.", i=0),
            Felle((rf + f_tw * mrp) * 100, "This cost of equity is built on a β<sub>E</sub> relevered with the twin's D/E.", i=1),
            Felle((rf + f_dv * mrp) * 100, "This cost of equity is built on a β<sub>E</sub> relevered with D/V instead of D/E.", i=1),
            Felle(rU4 * 100, "This is r<sub>U</sub>: you put β<sub>U</sub> into the CAPM, not the relevered β<sub>E</sub>.", i=1),
        ],
    )

    c = tall_del(
        "c", poeng=5,
        q=f"<p>Find {fi}'s after-tax WACC r<sub>wacc</sub> and the value of the firm V<sup>L</sup> today.</p>",
        gitt=f"<p>From (b): β<sub>E</sub> = {tall(bE4, 4)} and r<sub>E</sub> = {pst(rE4, 2)}.</p>",
        svar=[T("r<sub>wacc</sub>", wacc * 100, "%"), T("V<sup>L</sup>", V, "NOK million")],
        kort=(f"<p><b>r<sub>wacc</sub> = {pst(wacc4, 2)}, V<sup>L</sup> = {penger(V4, 1, 'NOK')} million.</b> "
              f"r<sub>D</sub> = {pst(rD, 2)}; r<sub>wacc</sub> = {tall(1 - w, 2)} × {pst(rE4, 2)} + {tall(w, 2)} × {pst(rD, 2)} × 0.78; "
              f"V<sup>L</sup> = {tall(fcf, 0)}/({pst(wacc4, 2)} − {prosent_tekst(g * 100, 1)}).</p>"),
        losning=(f"<p>The WACC discounts the free cash flow, which is computed as if the firm had no debt. The tax "
                 f"benefit of debt enters through the (1 − τ<sub>c</sub>) on the cost of debt.</p>"
                 f"<p><b>Step 1: cost of debt.</b> r<sub>D</sub> = r<sub>f</sub> + β<sub>D</sub> × MRP = {prosent_tekst(rf * 100, 1)} + "
                 f"{tall(bD, 2)} × {prosent_tekst(mrp * 100, 1)} = {pst(rD, 2)}. This is the expected return on the debt, "
                 f"not a promised yield.</p>"
                 f"<p><b>Step 2: WACC.</b> r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>) = "
                 f"{tall(1 - w, 2)} × {pst(rE4, 2)} + {tall(w, 2)} × {pst(rD, 2)} × 0.78 = <b>{pst(wacc4, 2)}</b>.</p>"
                 f"<p><b>Step 3: value.</b> A growing perpetuity from next year's cash flow: V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) = "
                 f"{tall(fcf, 0)}/({pst(wacc4, 2)} − {prosent_tekst(g * 100, 1)}) = <b>{penger(V4, 1, 'NOK')} million</b>.</p>"
                 f"<p><b>First check.</b> r<sub>U</sub> = {prosent_tekst(rf * 100, 1)} + {tall(bU4, 4)} × {prosent_tekst(mrp * 100, 1)} = "
                 f"{pst(rU4, 2)}. The WACC lies below r<sub>U</sub> by (D/V)τ<sub>c</sub>r<sub>D</sub> = {tall(w, 2)} × 0.22 × {pst(rD, 2)} = "
                 f"{tall(gap * 100, 2)} percentage points, the tax shield and nothing else.</p>"
                 f"<p><b>Remember:</b> the WACC uses the expected return on debt after tax. The perpetuity starts from FCF<sub>1</sub>.</p>"),
        feller=[
            Felle(f_ingenskatt * 100, "You left out (1 − τ<sub>c</sub>) on the cost of debt. Without it the WACC is the pre-tax WACC, "
                                      "which with constant D/V is r<sub>U</sub> up to rounding.", i=0),
            Felle(f_rf * 100, "You used the risk-free rate as the cost of debt. The debt is risky, so r<sub>D</sub> comes from its beta.", i=0),
            Felle(f_VrU, "You discounted at r<sub>U</sub>. That is the unlevered value V<sup>U</sup>, without the tax shield.", i=1),
            Felle(f_Vingen, "You left out the growth: a growing perpetuity divides by r<sub>wacc</sub> − g.", i=1),
            Felle(f_Vvekst, "You grew the cash flow one year too many. FCF<sub>1</sub> is already next year's cash flow.", i=1),
        ],
    )

    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why {fi}'s WACC is below its unlevered cost of capital r<sub>U</sub>. What would happen to the "
           f"WACC if {fi} raised its target D/V, everything else equal?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (c): r<sub>wacc</sub> = {pst(wacc4, 2)}. With β<sub>U</sub> = {tall(bU4, 4)} from (a), "
              f"r<sub>U</sub> = {pst(rU4, 2)}.</p>"),
        kort=(f"<p>With constant D/V the pre-tax WACC equals r<sub>U</sub>, so cheap debt alone does not lower the cost of "
              f"capital: r<sub>E</sub> rises to offset it (MM II). The WACC is lower only because interest is tax deductible: "
              f"r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>, here {tall(gap * 100, 2)} percentage points. "
              f"A higher D/V widens that gap and lowers the WACC further. In practice r<sub>D</sub> and expected distress "
              f"costs rise with leverage, so the gain stops (trade-off theory).</p>"),
        losning=(f"<p>The mechanism is MM with taxes. Without taxes, r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> for any "
                 f"D/V: debt looks cheap, but every unit of debt makes equity riskier and r<sub>E</sub> rises exactly enough "
                 f"to keep the average at r<sub>U</sub>. So the gap to r<sub>U</sub> cannot come from cheap debt.</p>"
                 f"<p>With taxes the government pays τ<sub>c</sub> of every interest payment. Subtracting the after-tax "
                 f"cost of debt gives r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>: here {pst(rU4, 2)} − "
                 f"{tall(w, 2)} × 0.22 × {pst(rD, 2)} ≈ {pst(wacc4, 2)}. The gap is the value of the interest tax shield, expressed as a rate.</p>"
                 f"<p>Raising D/V raises (D/V)τ<sub>c</sub>r<sub>D</sub>, so in this model the WACC keeps falling. That is the "
                 f"limit of the model, not advice: with more debt r<sub>D</sub> rises, the tax shield becomes less certain and "
                 f"expected distress costs (including fire sales) grow. The trade-off theory puts the optimum where the "
                 f"marginal tax benefit equals the marginal distress cost.</p>"
                 f"<p><b>Typical mistakes:</b> saying debt is cheaper than equity and therefore lowers the WACC (the cheap-debt "
                 f"fallacy), or naming the tax shield without saying why it lowers the rate.</p>"
                 f"<p><b>Remember:</b> only the tax shield separates the WACC from r<sub>U</sub>.</p>"),
        kriterier=[
            "States that with constant D/V the pre-tax WACC equals r<sub>U</sub>: cheaper debt is offset by a higher r<sub>E</sub> (MM II) (1 p)",
            "Explains that the gap comes from the interest tax shield: r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub>, or the same in words (1 p)",
            "Says that a higher D/V lowers the WACC further in this model, because more of the firm is financed with tax-deductible debt (1 p)",
            "Names the limit: r<sub>D</sub> and expected distress costs rise with leverage, so the gain does not continue forever (trade-off) (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d])
