"""«Må kunne», type wacc-apv (skribent W1): alle tall regnes her.

Kjør fra prosjektroten:  python3 -I fag/fie402/_mk/w1_regn.py

Oppdraget står i docs/fie402-mk-spek.md (raden wacc-apv). Tre hele oppgaver på 20 poeng:

  mk-wacc-apv-1  Orvelle Appliances (€): formen fra forelesning 08 (prosjekteksemplet).
                 Prosjekt over tre år: FCF fra salg, kostnader, lanseringskostnad med
                 skattebesparelse i år 0 og lineær avskrivning (a), WACC med netto gjeld
                 (kontanter som negativ gjeld) (b), NPV med WACC (c), gjeldskapasitet år 0–2
                 baklengs (d, konstruksjonsleddet), r_U, V^U, PV(TS) med r_U og NPV med APV (e),
                 halen: r_wacc mot r_U (f).
  mk-wacc-apv-2  Corliss Markets ($): formen fra H2024 E5 med to sammenlignbare firmaer som i
                 forelesning 09 (ett med D/E og beta_D = 0, ett med D/V og beta_D > 0).
                 beta_U for hvert (a), snitt → r_U og r_E med D/V → D/E (b), WACC (c),
                 V^L som voksende evigrente (d), gjeld i dag og om ett år, PV(TS) med
                 r_U − g og APV (e, konstruksjonsleddet), halen: firmaets egen WACC (f).
  mk-wacc-apv-3  Brandholm Toys (DKK): varslet tillegg. Tall for hele firmaet oppgis, men
                 prosjektet skal verdsettes: r_E og WACC fra firmaet (a), prosjektets FCF med
                 sunk cost, kannibalisering og ΔNWC (b, konstruksjonsleddet), NPV (ikke PV)
                 med WACC (c), gjeld i dag og gjeldsjustering i år 1 (d), APV (e),
                 halen: renter trukket fra i FCF (f).

Konvensjoner (forfatterspek § 4): beta_U vektet uten skatt, skjoldet diskontert med r_U ved
konstant D/V (eller D/E), renter på gjelden ved årets start (D_{t−1}), D_t = d·V^L_t der V^L_t er
verdien av kontantstrømmene etter år t.

Skriptet asserter: WACC = APV i alle tre, r_wacc = r_U − d·τ·r_D, r_wacc < r_U,
beta_U fra betaer = r_U fra avkastninger, vektede beta_E og beta_D gir beta_U, MM II gir
pre-tax WACC = r_U (identitet), FTE-identiteten for prosjektgjelden, fortegnet på
gjeldsendringene, retningen i halene, at fellene ligger utenfor toleransen, at viste ledd
summerer til vist total, at hvert tall i svar-dataene står i løsningsteksten, poengene,
ordtellingen og skrivereglene. Er alt rent, skrives w1.json og w1_svar.json i samme mappe.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
MINUS = "−"


# ------------------------------------------------------------------ hjelpere
def F(x, d=4):
    """Engelsk tallformat med tusenskille og ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return (MINUS if r < 0 else "") + s


def N(x, dmax=4):
    """Tall uten overflødige nuller (for eksakte tall som 28.5 og 35.25)."""
    r = round(x, dmax)
    assert abs(r - x) < 1e-9, x
    s = f"{abs(r):,.{dmax}f}".rstrip("0").rstrip(".")
    return (MINUS if r < 0 else "") + s


def P(x, d=2):
    """Rente som prosent med d desimaler (asserter at det er eksakt nok)."""
    return F(100 * x, d) + "%"


def PP(x):
    """Prosent: 2 desimaler når det er eksakt, ellers 4."""
    v = 100 * x
    return (F(v, 2) if abs(v - round(v, 2)) < 1e-10 else F(v, 4)) + "%"


def R(x):
    """Rente som brøk: 4 desimaler når det er eksakt, ellers 6."""
    return F(x, 4) if abs(x - round(x, 4)) < 1e-12 else F(x, 6)


def RP(x):
    return f"{R(x)} ({PP(x)})"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol * max(1.0, abs(a), abs(b))


def summ(ledd, total, d0=4, start=None, maks=4):
    """«a + b = t» der de viste leddene summerer nøyaktig til vist total.
    Øker antall desimaler til summen av de avrundede leddene er lik den avrundede totalen,
    men aldri forbi maks (oppgaven ber om fire desimaler)."""
    for d in range(d0, maks + 1):
        vist = sum(round(x, d) for x in ledd)
        if abs(vist - round(total, d)) < 0.5 * 10 ** (-d - 2):
            break
    else:
        raise AssertionError((ledd, total))
    assert near(sum(ledd), total, 1e-9), (ledd, total)
    s = F(ledd[0], d) if start is None else start
    for x in ledd[1:]:
        s += (f" {MINUS} " if round(x, d) < 0 else " + ") + F(abs(x), d)
    return s, F(total, d)


def summN(ledd, total):
    """Som summ, for eksakte tall: skrives uten overflødige nuller (N)."""
    assert near(sum(ledd), total, 1e-12)
    s = N(ledd[0])
    for x in ledd[1:]:
        s += (f" {MINUS} " if x < 0 else " + ") + N(abs(x))
    return s, N(total)


def USD(x):
    """Dollarbeløp med minustegn foran valutategnet."""
    return (MINUS if x < 0 else "") + "$" + N(abs(x))


SVAR = {}


def tall(navn, verdi, enhet, feller=(), alt=None, tolmax=0.01, drift=(), tol=None, abs_=None):
    """Ett tall i svar-dataene. Toleransen velges så ingen felle havner innenfor
    (spek 6b.1), og så avrunding alltid godtas: verdien rundet til to desimaler og
    verdiene i drift (en student som runder underveis) må ligge innenfor. tol overstyrer.
    alt er svarene bygd på reserveverdien oppgaven gir; ingen felle får ligge innenfor dem."""
    t = {"navn": navn, "verdi": verdi, "enhet": enhet}
    if abs_ is not None:                               # verdier ved 0: absolutt toleranse
        t["abs"] = abs_
        for f in feller:
            assert abs(f - verdi) > abs_, (navn, f)
        alt = [a for a in (alt or []) if abs(a - verdi) > abs_]
        if alt:
            t["alt"] = alt
        return t
    if tol is None:
        tol = tolmax
        if feller:
            m = min(abs(f - verdi) / abs(verdi) for f in feller)
            tol = min(tolmax, m / 2.5)
        if tol < 0.01:
            tol = int(tol * 1e4) / 1e4                 # rundet ned til fire desimaler
    assert tol >= 0.0004, (navn, verdi, feller, tol)
    for f in feller:
        assert abs(f - verdi) > tol * abs(verdi), (navn, f)
        for a in (alt or []):
            assert abs(f - a) > tol * abs(a), (navn, "felle innenfor alt", f, a)
    alt = [a for a in (alt or []) if abs(a - verdi) > tol * abs(verdi)]   # alt innenfor svaret er overflødig
    for x in list(drift) + ([round(verdi, 2)] if abs(verdi) >= 0.1 else []):
        assert abs(x - verdi) <= tol * abs(verdi), (navn, "avrunding faller utenfor", x, tol)
    if tol < 0.01:
        t["tol"] = tol
    if alt:
        t["alt"] = alt
    return t


def svar(key, typ, tallene=None, merknad=None, tallPoeng=None, tekstLedd=None):
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


def disk(cf, r, t0=1):
    """Liste med nåverdier av cf[i] diskontert t0 + i perioder."""
    return [c / (1 + r) ** (t0 + i) for i, c in enumerate(cf)]


def frac_terms(cf, rate_txt, t0=1):
    out = []
    for i, c in enumerate(cf):
        t = t0 + i
        out.append(f"{N(c)}/{rate_txt}" + (f"<sup>{t}</sup>" if t > 1 else ""))
    return " + ".join(out)


def backward(cf, r):
    """V_t for t = 0..T der V_T = 0 og V_{t−1} = (cf_t + V_t)/(1 + r). cf[0] er år 1."""
    T = len(cf)
    V = [0.0] * (T + 1)
    for t in range(T, 0, -1):
        V[t - 1] = (cf[t - 1] + V[t]) / (1 + r)
    return V


def tr(*celler, th=False):
    tag = "th" if th else "td"
    ut = "<tr>"
    for i, c in enumerate(celler):
        if th or i == 0:
            ut += f"<{tag}>{c}</{tag}>"
        else:
            ut += f"<td class=\"n\">{c}</td>"
    return ut + "</tr>"


def student_apv(F0, cf, w, rU, d, tau, rD):
    """NPV med APV slik en student får den når hvert mellomtall rundes til fire desimaler."""
    r4 = lambda x: round(x, 4)
    w, rU = r4(w), r4(rU)
    V = [0.0] * (len(cf) + 1)
    for t in range(len(cf), 0, -1):
        V[t - 1] = r4((cf[t - 1] + V[t]) / (1 + w))
    D = [r4(d * v) for v in V]
    VU = sum(r4(c / (1 + rU) ** (i + 1)) for i, c in enumerate(cf))
    TS = [r4(tau * rD * D[t]) for t in range(len(cf))]
    PVTS = sum(r4(x / (1 + rU) ** (i + 1)) for i, x in enumerate(TS))
    return F0 + VU + PVTS


UT = {}

# ============================================================ OPPGAVE 1: forelesning 08-formen
# Orvelle Appliances, €, prosjekt over tre år, netto gjeld, lanseringskostnad i år 0.
E1, D1g, C1 = 540.0, 385.0, 25.0
rE1, rD1, tau1 = 0.11, 0.05, 0.25
sales1 = [60.0, 90.0, 70.0]
cogs1 = [24.0, 36.0, 28.0]
opex1 = 12.0
launch1 = 8.0
capex1 = 45.0
dep1 = capex1 / 3

nd1 = D1g - C1
V1firm = E1 + nd1
d1 = nd1 / V1firm
de1 = nd1 / E1
assert near(d1, 0.4) and near(de1, 2 / 3)
w1 = (1 - d1) * rE1 + d1 * rD1 * (1 - tau1)
rU1 = (1 - d1) * rE1 + d1 * rD1
assert near(w1, rU1 - d1 * tau1 * rD1) and w1 < rU1
assert near(rE1, rU1 + de1 * (rU1 - rD1))                   # MM II tilbake (identitet)

ebit0_1 = -launch1
nopat0_1 = ebit0_1 * (1 - tau1)
F0_1 = nopat0_1 - capex1
ebit1 = [s - c - opex1 - dep1 for s, c in zip(sales1, cogs1)]
tax1 = [tau1 * e for e in ebit1]
nopat1 = [e - t for e, t in zip(ebit1, tax1)]
FCF1 = [n + dep1 for n in nopat1]
assert near(F0_1, -51) and [round(x, 4) for x in FCF1] == [21.75, 35.25, 26.25]

pvw1 = disk(FCF1, w1)
V_1 = backward(FCF1, w1)
PV1 = V_1[0]
NPV1 = F0_1 + PV1
assert near(PV1, sum(pvw1))
Dc1 = [d1 * v for v in V_1]                                    # D_0..D_3
assert Dc1[3] == 0 and Dc1[0] > Dc1[1] > Dc1[2] > 0          # nedbetaling hvert år
chg1 = [Dc1[t] - Dc1[t - 1] for t in (1, 2, 3)]
assert all(c < 0 for c in chg1)
pvU1 = disk(FCF1, rU1)
VU1 = sum(pvU1)
TS1 = [tau1 * rD1 * Dc1[t] for t in (0, 1, 2)]
pvTS1 = disk(TS1, rU1)
PVTS1 = sum(pvTS1)
NPVa1 = F0_1 + VU1 + PVTS1
assert near(NPVa1, NPV1, 1e-12)                                # WACC = APV
# FTE-identiteten for prosjektets egenkapital år for år
for t in (1, 2, 3):
    Eprev = (1 - d1) * V_1[t - 1]
    Enext = (1 - d1) * V_1[t]
    fcfe = FCF1[t - 1] - (1 - tau1) * rD1 * Dc1[t - 1] + (Dc1[t] - Dc1[t - 1])
    assert near(Eprev * (1 + rE1), fcfe + Enext, 1e-12)
gap1 = rU1 - w1
assert near(gap1, 0.005)
# reserveverdi i (c): r_wacc = 7,5 % (ikke svaret); svarene bygd på den blir alt i (c), (d) og (e)
w1_fb = 0.075
assert not near(w1_fb, w1, 1e-3)
V_1fb = backward(FCF1, w1_fb)
NPV1_fb = F0_1 + V_1fb[0]
Dc1_fb = [d1 * v for v in V_1fb]
PVTS1_fb = sum(disk([tau1 * rD1 * Dc1_fb[t] for t in (0, 1, 2)], rU1))
NPVa1_fb = F0_1 + VU1 + PVTS1_fb

# feller
w1_brutto = (E1 / (E1 + D1g)) * rE1 + (D1g / (E1 + D1g)) * rD1 * (1 - tau1)
NPV1_rU = F0_1 + VU1
NPV1_brutto = F0_1 + sum(disk(FCF1, w1_brutto))
VU1_V = backward(FCF1, rU1)
D1_VU = [d1 * v for v in VU1_V]
D1_DE = [de1 * v for v in V_1]
PVTS1_rD = sum(disk(TS1, rD1))
PVTS1_w = sum(disk(TS1, w1))
PVTS1_Dt = sum(disk([tau1 * rD1 * Dc1[t] for t in (1, 2, 3)], rU1))

s_pvw1, t_pvw1 = summ([F0_1] + pvw1, NPV1)
s_pvU1, t_pvU1 = summ(pvU1, VU1)
s_pvTS1, t_pvTS1 = summ(pvTS1, PVTS1)
s_apv1, t_apv1 = summ([F0_1, VU1, PVTS1], NPVa1)

tab1 = ("<table class=\"data\">" + tr("€ million", "Year 0", "Year 1", "Year 2", "Year 3", th=True)
        + tr("Sales", "", *[N(x) for x in sales1])
        + tr("Cost of goods sold", "", *[N(x) for x in cogs1])
        + tr("Operating expenses", "", *[N(opex1)] * 3)
        + tr("Launch costs", N(launch1), "", "", "")
        + tr("Equipment purchase", N(capex1), "", "", "")
        + "</table>")

body1 = (
    "<p>Orvelle Appliances, a European kitchen-appliance maker, considers a countertop steam oven "
    "that it will sell for three years. Today is Year 0 and the project has the same risk as the "
    "firm. In market values Orvelle has equity of €540 million, debt of €385 million and excess "
    "cash of €25 million. It measures leverage with net debt (debt minus cash) and keeps its net "
    "debt-to-equity ratio constant, also with the project. Its cost of equity is 11%, its cost of "
    "debt 5% and the tax rate 25%.</p>"
    + tab1 +
    "<p>The launch costs are expensed in Year 0 and lower Orvelle's tax bill that year. The "
    "equipment is depreciated straight-line to zero over Years 1 to 3. There is no working capital. "
    "Use 4 decimal places.</p>"
)

tabsol1 = ("<table class=\"data\">" + tr("€ million", "Year 0", "Year 1", "Year 2", "Year 3", th=True)
           + tr("Sales", "", *[N(x) for x in sales1])
           + tr(f"{MINUS} Cost of goods sold", "", *[N(-x) for x in cogs1])
           + tr(f"{MINUS} Operating expenses", "", *[N(-opex1)] * 3)
           + tr(f"{MINUS} Launch costs", N(-launch1), "", "", "")
           + tr(f"{MINUS} Depreciation", "", *[N(-dep1)] * 3)
           + tr("EBIT", N(ebit0_1), *[N(x) for x in ebit1])
           + tr(f"{MINUS} Tax (25%)", N(-tau1 * ebit0_1), *[N(-x) for x in tax1])
           + tr("EBIT(1 − τ)", N(nopat0_1), *[N(x) for x in nopat1])
           + tr("+ Depreciation", "", *[N(dep1)] * 3)
           + tr(f"{MINUS} CapEx", N(-capex1), "", "", "")
           + tr("<b>FCF</b>", f"<b>{N(F0_1)}</b>", *[f"<b>{N(x)}</b>" for x in FCF1])
           + "</table>")

ex1_a = del_(
    "a", 3,
    "<p>Find the free cash flow of the project in each year.</p>",
    "<p>Use the formula-sheet definition FCF = EBIT(1 − τ) + Depreciation − CapEx − ΔNWC. The free "
    "cash flow is unlevered: no interest is subtracted, even though Orvelle has debt. The financing "
    "enters later, through the discount rate (WACC) or the tax shield (APV).</p>"
    f"<p><b>Step 1. Depreciation.</b> {N(capex1)}/3 = <b>{N(dep1)}</b> per year in Years 1 to 3.</p>"
    f"<p><b>Step 2. Year 0.</b> The launch costs give EBIT = {N(ebit0_1)}. Because Orvelle is profitable "
    f"elsewhere, its tax bill falls by 0.25 × {N(launch1)} = {N(tau1 * launch1)}, so the after-tax cost is "
    f"{N(launch1)}(1 − 0.25) = {N(-nopat0_1)}. With the equipment: FCF<sub>0</sub> = {N(nopat0_1)} "
    f"{MINUS} {N(capex1)} = <b>{N(F0_1)}</b>.</p>"
    "<p><b>Step 3. Years 1 to 3.</b></p>" + tabsol1 +
    f"<p>FCF<sub>0</sub> = <b>{N(F0_1)}</b>, FCF<sub>1</sub> = <b>{N(FCF1[0])}</b>, FCF<sub>2</sub> = "
    f"<b>{N(FCF1[1])}</b>, FCF<sub>3</sub> = <b>{N(FCF1[2])}</b> (€ million).</p>",
    [
        "FCF is unlevered: no interest is subtracted. The lecturer warns against subtracting interest again and again (lectures 08 and 18).",
        "Year 0: the launch costs lower the tax bill, so the after-tax cost is 8(1 − 0.25) = 6 and FCF_0 = −6 − 45 = −51. Writing −53 forgets the tax saving.",
        f"Depreciation of 15 per year is subtracted before tax and added back after tax. Forgetting to add it back gives {N(nopat1[0])}, {N(nopat1[1])} and {N(nopat1[2])}.",
        f"FCF = {N(FCF1[0])}, {N(FCF1[1])} and {N(FCF1[2])} in Years 1 to 3. Show the calculation.",
    ],
)
svar("mk-wacc-apv-1:1:a", "tall", [
    tall("FCF<sub>0</sub>", F0_1, "€ m", feller=[-launch1 - capex1]),
    tall("FCF<sub>1</sub>", FCF1[0], "€ m", feller=[nopat1[0]]),
    tall("FCF<sub>2</sub>", FCF1[1], "€ m", feller=[nopat1[1]]),
    tall("FCF<sub>3</sub>", FCF1[2], "€ m", feller=[nopat1[2]]),
])

ex1_b = del_(
    "b", 3,
    "<p>Find Orvelle's after-tax WACC.</p>",
    f"<p><b>Step 1. Net debt.</b> Cash is negative debt: D = {N(D1g)} {MINUS} {N(C1)} = <b>{N(nd1)}</b>. "
    f"Then V = E + D = {N(E1)} + {N(nd1)} = {N(V1firm)}, so D/V = {N(nd1)}/{N(V1firm)} = <b>{R(d1)}</b> and "
    f"E/V = <b>{R(1 - d1)}</b> (D/E = {N(nd1)}/{N(E1)} = {F(de1)}).</p>"
    "<p><b>Step 2. After-tax WACC.</b></p>"
    f"<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ) = {R(1 - d1)}({R(rE1)}) + "
    f"{R(d1)}({R(rD1)})(1 − 0.25)<br>= {R((1 - d1) * rE1)} + {R(d1 * rD1 * (1 - tau1))} = "
    f"<b>{RP(w1)}</b></p>",
    [
        "Nets the excess cash against the debt (cash is negative debt): D = 385 − 25 = 360, V = 900, D/V = 0.4.",
        f"Using the gross debt of 385 gives D/V = {F(D1g / (E1 + D1g))} and r_wacc = {P(w1_brutto)}, which loses a point.",
        "Applies (1 − τ) to r_D only, never to r_E.",
        "r_wacc = 0.6(11%) + 0.4(5%)(0.75) = 8.10%.",
    ],
)
svar("mk-wacc-apv-1:1:b", "tall", [
    tall("r<sub>wacc</sub>", 100 * w1, "%", feller=[100 * w1_brutto, 100 * rU1]),
], merknad=f"Fellene er brutto gjeld ({P(w1_brutto)}) og r_U uten skatt ({P(rU1)}).")

ex1_c = del_(
    "c", 2,
    "<p>Find the NPV of the project using the WACC method. (If you could not solve (b), use "
    "r<sub>wacc</sub> = 7.5% here and in (d).)</p>",
    "<p>Discount the free cash flows at r<sub>wacc</sub>. FCF<sub>0</sub> is paid today and is not "
    "discounted. The tax shield is already in the discount rate, so nothing is added.</p>"
    f"<p>NPV = {N(F0_1)} + {frac_terms(FCF1, '1.081')}<br>= {s_pvw1} = <b>€{t_pvw1} million</b></p>"
    f"<p>The present value of the future cash flows is {F(PV1)}. The question asks for the NPV, so the "
    f"investment of {N(-F0_1)} must be subtracted.</p>"
    f"<p>With the fallback r<sub>wacc</sub> = 7.5%, the NPV is {F(NPV1_fb)}.</p>",
    [
        "Discounts at r_wacc = 8.10% with the right powers and does not discount FCF_0.",
        f"Gives the NPV, {F(NPV1)}, not the PV of the future cash flows ({F(PV1)}). Stopping at the PV loses a point.",
        f"Full marks with the fallback 7.5%: NPV = {F(NPV1_fb)}.",
        "Does not add a tax shield on top: the WACC already contains it.",
    ],
)
svar("mk-wacc-apv-1:1:c", "tall", [
    tall("NPV (WACC)", NPV1, "€ m", feller=[NPV1_rU, NPV1_brutto, PV1], alt=[NPV1_fb]),
], merknad=f"Fellene er NPV med r_U ({F(NPV1_rU)}), med WACC fra brutto gjeld og PV uten investeringen. "
           f"alt ({F(NPV1_fb)}) er svaret med reserveverdien r_wacc = 7.5 %.")

ex1_d = del_(
    "d", 4,
    "<p>Find the project's debt capacity (the extra net debt Orvelle must hold) at the end of Years "
    "0, 1 and 2. Does Orvelle borrow or repay in Years 1 to 3?</p>",
    "<p>To keep its ratio constant Orvelle must hold debt equal to d = D/V = 0.4 of the project's "
    "value at every date: D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>. V<sup>L</sup><sub>t</sub> is "
    "the value at date t of the cash flows that are still to come, so solve backwards at "
    "r<sub>wacc</sub>.</p>"
    "<p><b>Step 1. Values.</b></p>"
    f"<p>V<sup>L</sup><sub>3</sub> = 0<br>"
    f"V<sup>L</sup><sub>2</sub> = {N(FCF1[2])}/1.081 = <b>{F(V_1[2])}</b><br>"
    f"V<sup>L</sup><sub>1</sub> = ({N(FCF1[1])} + {F(V_1[2])})/1.081 = <b>{F(V_1[1])}</b><br>"
    f"V<sup>L</sup><sub>0</sub> = ({N(FCF1[0])} + {F(V_1[1])})/1.081 = <b>{F(V_1[0])}</b></p>"
    "<p><b>Step 2. Debt capacity.</b></p>"
    "<table class=\"data\">" + tr("€ million", "Year 0", "Year 1", "Year 2", "Year 3", th=True)
    + tr("V<sup>L</sup><sub>t</sub>", *[F(v) for v in V_1])
    + tr("D<sub>t</sub> = 0.4 × V<sup>L</sup><sub>t</sub>", *[f"<b>{F(x)}</b>" for x in Dc1])
    + tr("Change in debt", "", *[F(c) for c in chg1]) + "</table>"
    + f"<p>Orvelle borrows <b>€{F(Dc1[0])} million</b> today because of the project. It then "
    f"<b>repays</b> {F(-chg1[0])} in Year 1, {F(-chg1[1])} in Year 2 and the last {F(-chg1[2])} in "
    "Year 3. The project's value falls as its cash flows are paid out, so the debt that keeps the "
    "ratio constant falls too.</p>"
    f"<p>Note that D<sub>0</sub> is based on the value of the future cash flows ({F(V_1[0])}), not on "
    f"the NPV or the investment (0.4 × {N(-F0_1)} = {N(-d1 * F0_1)}): once the {N(-F0_1)} has "
    "been spent, the future cash flows are what the project adds to the value of Orvelle's assets, as "
    "in the lecture example.</p>"
    f"<p>With the fallback r<sub>wacc</sub> = 7.5%: D<sub>0</sub> = {F(Dc1_fb[0])}, D<sub>1</sub> = "
    f"{F(Dc1_fb[1])}, D<sub>2</sub> = {F(Dc1_fb[2])}.</p>",
    [
        "Uses D_t = d × V^L_t with d = D/V = 0.4. Multiplying by D/E = 0.6667 is the classic slip.",
        f"V^L_t is the value of the cash flows still to come, found backwards at r_wacc: V^L_2 = {F(V_1[2])}, V^L_1 = {F(V_1[1])}, V^L_0 = {F(V_1[0])}.",
        f"D_0 = {F(Dc1[0])}, D_1 = {F(Dc1[1])}, D_2 = {F(Dc1[2])} (and D_3 = 0). Basing D_0 on the NPV (giving {F(d1 * NPV1)}), on the investment (0.4 × 51 = {N(-d1 * F0_1)}) or on V^U is wrong. With the fallback 7.5%: {F(Dc1_fb[0])}, {F(Dc1_fb[1])} and {F(Dc1_fb[2])}.",
        "Says that Orvelle repays debt in every year from Year 1 to Year 3 as the project winds down.",
    ],
)
svar("mk-wacc-apv-1:1:d", "blandet", [
    tall("D<sub>0</sub>", Dc1[0], "€ m", feller=[D1_VU[0], d1 * NPV1, D1_DE[0], -d1 * F0_1], alt=[Dc1_fb[0]]),
    tall("D<sub>1</sub>", Dc1[1], "€ m", feller=[D1_VU[1], D1_DE[1], d1 * (FCF1[0] + V_1[1])], alt=[Dc1_fb[1]]),
    tall("D<sub>2</sub>", Dc1[2], "€ m", feller=[D1_VU[2], D1_DE[2], d1 * (FCF1[1] + V_1[2])], alt=[Dc1_fb[2]]),
], tallPoeng=3, tekstLedd="Does Orvelle borrow or repay in Years 1 to 3?",
    merknad="Toleransen er stram fordi gjeld regnet fra V^U (diskontert med r_U) ligger under 1 % unna. "
            "Tekstdelen: Orvelle betaler ned gjeld hvert år. alt er gjelden med reserveverdien r_wacc = 7.5 %.")

ex1_e = del_(
    "e", 5,
    "<p>Find r<sub>U</sub>. Then, with the debt from (d), find the unlevered value of the project's "
    "future cash flows, the present value of the tax shields and the NPV using APV. Compare with (c).</p>",
    "<p><b>Step 1. r<sub>U</sub>.</b> Under a constant ratio the pre-tax WACC is r<sub>U</sub>:</p>"
    f"<p>r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = {R(1 - d1)}({R(rE1)}) + {R(d1)}({R(rD1)}) = "
    f"{R((1 - d1) * rE1)} + {R(d1 * rD1)} = <b>{RP(rU1)}</b></p>"
    "<p><b>Step 2. Unlevered value.</b> The same free cash flows, discounted at r<sub>U</sub>:</p>"
    f"<p>V<sup>U</sup><sub>0</sub> = {frac_terms(FCF1, '1.086')} = {s_pvU1} = <b>{t_pvU1}</b></p>"
    "<p><b>Step 3. Tax shields.</b> TS<sub>t</sub> = τ × r<sub>D</sub> × D<sub>t−1</sub>, with the debt "
    "from (d):</p>"
    f"<p>TS<sub>1</sub> = 0.25 × 0.05 × {F(Dc1[0])} = {F(TS1[0])}<br>"
    f"TS<sub>2</sub> = 0.25 × 0.05 × {F(Dc1[1])} = {F(TS1[1])}<br>"
    f"TS<sub>3</sub> = 0.25 × 0.05 × {F(Dc1[2])} = {F(TS1[2])}</p>"
    "<p>Orvelle keeps its ratio constant, so the debt moves with the project's value and the tax "
    "shields are as risky as the project. Discount them at <b>r<sub>U</sub></b>, not at r<sub>D</sub>:</p>"
    f"<p>PV(TS) = {F(TS1[0])}/1.086 + {F(TS1[1])}/1.086<sup>2</sup> + {F(TS1[2])}/1.086<sup>3</sup> = "
    f"{s_pvTS1} = <b>{t_pvTS1}</b></p>"
    "<p><b>Step 4. APV.</b></p>"
    f"<p>NPV = FCF<sub>0</sub> + V<sup>U</sup><sub>0</sub> + PV(TS) = {s_apv1} = <b>€{t_apv1} million</b></p>"
    f"<p><b>Check.</b> The WACC method in (c) gave {F(NPV1)} and APV gives {F(NPVa1)}. They match. "
    "This is a fixed point rather than two independent estimates, because the debt in APV came from "
    "the WACC values, but it catches the wrong rate on the tax shield and slips in the arithmetic.</p>"
    f"<p>With the debt from the fallback r<sub>wacc</sub> = 7.5%: PV(TS) = {F(PVTS1_fb)} and NPV = "
    f"{F(NPVa1_fb)}. It no longer equals (c) exactly, because the fallback is not the true WACC.</p>",
    [
        "r_U = pre-tax WACC = 0.6(11%) + 0.4(5%) = 8.60%. Putting (1 − τ) here gives the WACC, not r_U.",
        f"V^U_0 = {F(VU1)}: the same FCF discounted at r_U.",
        f"TS_t = τ × r_D × D_(t−1): {F(TS1[0])}, {F(TS1[1])} and {F(TS1[2])}. Using D_t instead of D_(t−1) is a slip.",
        f"Discounts the tax shields at r_U: PV(TS) = {F(PVTS1)}; at r_D it would be {F(PVTS1_rD)}. Bonus, not required: saying why (under a constant ratio the debt moves with the project's value and the shield with it).",
        f"NPV = −51 + {F(VU1)} + {F(PVTS1)} = {F(NPVa1)}, the same as in (c). With the fallback 7.5%: PV(TS) = {F(PVTS1_fb)} and NPV = {F(NPVa1_fb)}.",
    ],
)
svar("mk-wacc-apv-1:1:e", "tall", [
    tall("r<sub>U</sub>", 100 * rU1, "%", feller=[100 * w1]),
    tall("V<sup>U</sup><sub>0</sub>", VU1, "€ m", feller=[PV1]),
    tall("PV(TS)", PVTS1, "€ m", feller=[PVTS1_rD, PVTS1_Dt], alt=[PVTS1_fb]),
    tall("NPV (APV)", NPVa1, "€ m", feller=[NPV1_rU, PV1, F0_1 + VU1 + PVTS1_rD], tol=0.001,
         drift=[student_apv(F0_1, FCF1, w1, rU1, d1, tau1, rD1)], alt=[NPVa1_fb]),
], merknad=f"Diskonteres skjoldet med r_D, blir NPV {F(F0_1 + VU1 + PVTS1_rD)}, "
           f"{100 * (PVTS1_rD - PVTS1) / NPV1:.2f} % unna, så toleransen på NPV er 0.1 %. PV(TS) med r_D "
           f"({F(PVTS1_rD)} mot {F(PVTS1)}) avvises med standardtoleransen. PV(TS) diskontert med r_wacc "
           f"({F(PVTS1_w)}) ligger innenfor 1 % og godtas. alt er svarene med reserveverdien r_wacc = 7.5 %.")

ex1_f = del_(
    "f", 3,
    "<p>Compare r<sub>wacc</sub> from (b) with r<sub>U</sub> from (e). Where does the difference come "
    "from? What happens to it if Orvelle chooses a higher target leverage? Explain briefly.</p>",
    f"<p>r<sub>wacc</sub> = {PP(w1)} is lower than r<sub>U</sub> = {PP(rU1)}. The gap is "
    f"(D/V)τr<sub>D</sub> = 0.4 × 0.25 × 0.05 = {R(gap1)}, or half a percentage point.</p>"
    "<p>The two formulas differ only by the factor (1 − τ) on the cost of debt. Interest is tax "
    "deductible, so debt is cheaper after tax than its 5%. The WACC method puts this tax saving into "
    "the discount rate. APV discounts at r<sub>U</sub> (business risk only) and adds the tax shields "
    "as a separate value. Both give the same NPV.</p>"
    "<p>With a higher target leverage r<sub>U</sub> stays the same, because the business risk does not "
    "change, while D/V rises. The gap (D/V)τr<sub>D</sub> widens and r<sub>wacc</sub> falls: more of the "
    "financing earns the tax deduction. Without corporate taxes the two rates would be equal.</p>"
    "<p>Also accepted: a WACC above r<sub>U</sub> would be an alarm bell for an error, as the lecturer "
    "pointed out in lecture 09.</p>",
    [
        "States that r_wacc = 8.10% is below r_U = 8.60%, a gap of (D/V)τr_D = 0.5 percentage points.",
        "Explains the source: the only difference between the formulas is (1 − τ) on r_D, because interest is tax deductible, so the WACC holds the tax shield inside the rate while APV adds it separately.",
        "Higher target leverage: r_U is unchanged (business risk), the gap widens and r_wacc falls. Saying r_U rises with leverage loses this point.",
        "1 to 3 sentences per point are enough; no new calculation is needed.",
    ],
)
svar("mk-wacc-apv-1:1:f", "tekst")

UT["mk-wacc-apv-1"] = {
    "n": 1, "title": "Valuation with leverage", "points": 20, "topic": "WACC and APV",
    "chapters": [2, 4, 17, 18, 19],
    "merke": "Samme form som prosjekteksemplet i forelesning 08 (WACC, deretter APV)",
    "body": body1,
    "parts": [ex1_a, ex1_b, ex1_c, ex1_d, ex1_e, ex1_f],
}

# ============================================================ OPPGAVE 2: H2024 E5-formen, to sammenlignbare
# Corliss Markets, $, divisjon med voksende evigrente, to sammenlignbare firmaer.
rf2, rm2 = 0.045, 0.10
mrp2 = rm2 - rf2
c1_de, c1_bD, c1_bE = 0.6, 0.0, 1.6           # Cratewell
c2_dv, c2_bD, c2_bE = 0.25, 0.36, 1.48        # Mealmont
d2, rD2, tau2 = 0.40, 0.06, 0.21
FCF2_1, g2 = 26.0, 0.025
own_w2 = 0.062

c1_dv = c1_de / (1 + c1_de)
bU_c1 = (1 - c1_dv) * c1_bE + c1_dv * c1_bD
bU_c2 = (1 - c2_dv) * c2_bE + c2_dv * c2_bD
assert near(bU_c1, 1.0) and near(bU_c2, 1.2)
bU2 = (bU_c1 + bU_c2) / 2
rU2 = rf2 + bU2 * mrp2
# samme svar via avkastninger (CAPM er lineær)
rU_c1 = (1 - c1_dv) * (rf2 + c1_bE * mrp2) + c1_dv * (rf2 + c1_bD * mrp2)
rU_c2 = (1 - c2_dv) * (rf2 + c2_bE * mrp2) + c2_dv * (rf2 + c2_bD * mrp2)
assert near((rU_c1 + rU_c2) / 2, rU2)
de2 = d2 / (1 - d2)
rE2 = rU2 + de2 * (rU2 - rD2)
assert near((1 - d2) * rE2 + d2 * rD2, rU2)                     # pre-tax WACC = r_U (identitet)
bD2 = (rD2 - rf2) / mrp2
bE2 = (rE2 - rf2) / mrp2
assert near((1 - d2) * bE2 + d2 * bD2, bU2)                      # vektede betaer gir beta_U
w2 = (1 - d2) * rE2 + d2 * rD2 * (1 - tau2)
assert near(w2, rU2 - d2 * tau2 * rD2) and w2 < rU2
VL2 = FCF2_1 / (w2 - g2)
VL2_1 = VL2 * (1 + g2)
assert near(VL2_1, FCF2_1 * (1 + g2) / (w2 - g2))
D2_0 = d2 * VL2
D2_1 = d2 * VL2_1
TS2_1 = tau2 * rD2 * D2_0
TS2_2 = tau2 * rD2 * D2_1
assert near(TS2_2, TS2_1 * (1 + g2))
VU2 = FCF2_1 / (rU2 - g2)
PVTS2 = TS2_1 / (rU2 - g2)
VLa2 = VU2 + PVTS2
assert near(VLa2, VL2, 1e-12)                                    # WACC = APV
VL2_own = FCF2_1 / (own_w2 - g2)
assert own_w2 < w2 and VL2_own > VL2                             # halen: overvurdering
# reserveverdi i (c): r_U = 10 % (ikke svaret); svarene bygd på den blir alt i (c), (d) og (e)
rU2_fb = 0.10
assert not near(rU2_fb, rU2, 1e-3)
w2_fb = rU2_fb - d2 * tau2 * rD2
assert near(w2_fb, (1 - d2) * (rU2_fb + de2 * (rU2_fb - rD2)) + d2 * rD2 * (1 - tau2))
VL2_fb = FCF2_1 / (w2_fb - g2)
D2_0fb, D2_1fb = d2 * VL2_fb, d2 * VL2_fb * (1 + g2)
PVTS2_fb = tau2 * rD2 * D2_0fb / (rU2_fb - g2)
assert near(FCF2_1 / (rU2_fb - g2) + PVTS2_fb, VL2_fb)

# feller
bU_c1_DE = (1 - c1_de) * c1_bE
bU_c2_utenD = (1 - c2_dv) * c2_bE
rU2_c1 = rf2 + bU_c1 * mrp2
rU2_c2 = rf2 + bU_c2 * mrp2
rU2_bE = rf2 + (c1_bE + c2_bE) / 2 * mrp2
rE2_DV = rU2 + d2 * (rU2 - rD2)
w2_DE = (1 - de2) * rE2 + de2 * rD2 * (1 - tau2)
VL2_nog = FCF2_1 / w2
PVTS2_nog = TS2_1 / rU2
PVTS2_rD = TS2_1 / (rD2 - g2)
PVTS2_w = TS2_1 / (w2 - g2)

s_rU2, _ = summ([rf2, bU2 * mrp2], rU2)
tab2 = ("<table class=\"data\">" + tr("", "Cratewell", "Mealmont", th=True)
        + tr("Leverage", f"D/E = {N(c1_de)}", f"D/V = {N(c2_dv)}")
        + tr("Debt beta", "0", F(c2_bD, 2))
        + tr("Equity beta", F(c1_bE, 2), F(c2_bE, 2)) + "</table>")

body2 = (
    "<p>Corliss Markets, a US supermarket chain, plans a new division that will sell meal kits by "
    "subscription. The division's free cash flow is expected to be $26 million next year and to grow "
    "by 2.5% per year forever. The division will keep a constant debt-to-value ratio of 40% and its "
    "cost of debt is 6%. Meal kits carry very different risk from supermarkets, but two listed "
    "meal-kit companies have the same business risk as the division. Both keep their leverage ratios "
    "constant:</p>"
    + tab2 +
    "<p>Use the average of the two unlevered betas. The tax rate is 21%, the risk-free rate is 4.5% "
    "and the expected return on the market portfolio is 10%. Use 4 decimal places.</p>"
)

ex2_a = del_(
    "a", 3,
    "<p>Find the unlevered beta of each comparable.</p>",
    "<p>The comparables have different leverage, so their equity betas cannot be compared directly. "
    "Strip out the leverage with the formula-sheet weighting (without taxes): β<sub>U</sub> = "
    "(E/V)β<sub>E</sub> + (D/V)β<sub>D</sub>.</p>"
    f"<p><b>Cratewell.</b> D/E = {N(c1_de)}, so D/V = {N(c1_de)}/{N(1 + c1_de)} = <b>{R(c1_dv)}</b> and "
    f"E/V = <b>{R(1 - c1_dv)}</b>. Its debt beta is zero:<br>"
    f"β<sub>U</sub> = {R(1 - c1_dv)} × {F(c1_bE, 2)} + {R(c1_dv)} × 0 = <b>{F(bU_c1)}</b></p>"
    f"<p><b>Mealmont.</b> D/V = {F(c2_dv, 2)} is already a weight:<br>"
    f"β<sub>U</sub> = {F(1 - c2_dv, 2)} × {F(c2_bE, 2)} + {F(c2_dv, 2)} × {F(c2_bD, 2)} = "
    f"{F((1 - c2_dv) * c2_bE)} + {F(c2_dv * c2_bD)} = <b>{F(bU_c2)}</b></p>",
    [
        "Converts Cratewell's D/E = 0.6 into D/V = 0.375 before weighting. Using 0.6 as the debt weight gives 0.64.",
        "Cratewell: beta_U = 0.625 × 1.60 + 0.375 × 0 = 1.0000.",
        f"Mealmont: beta_U = 0.75 × {F(c2_bE, 2)} + 0.25 × {F(c2_bD, 2)} = {F(bU_c2)}. Dropping the debt beta gives {F(bU_c2_utenD)} and understates the asset risk.",
        "Weights without taxes, as on the formula sheet.",
    ],
)
svar("mk-wacc-apv-2:1:a", "tall", [
    tall("β<sub>U</sub> Cratewell", bU_c1, "", feller=[bU_c1_DE, c1_bE]),
    tall("β<sub>U</sub> Mealmont", bU_c2, "", feller=[bU_c2_utenD, c2_bE]),
])

ex2_b = del_(
    "b", 4,
    "<p>Find the unlevered cost of capital and the cost of equity of the division.</p>",
    f"<p><b>Step 1. Average.</b> β<sub>U</sub> = ({F(bU_c1)} + {F(bU_c2)})/2 = <b>{F(bU2)}</b></p>"
    f"<p><b>Step 2. CAPM.</b> The market risk premium is 10% {MINUS} 4.5% = {P(mrp2)}.<br>"
    f"r<sub>U</sub> = {R(rf2)} + {F(bU2)} × {R(mrp2)} = {s_rU2} = <b>{RP(rU2)}</b></p>"
    f"<p><b>Step 3. Relever at the division's leverage.</b> MM II needs D/E, not D/V: D/E = "
    f"{N(d2)}/{N(1 - d2)} = <b>{F(de2)}</b>.</p>"
    f"<p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = {R(rU2)} + {F(de2)}"
    f"({R(rU2)} − {R(rD2)})<br>= {R(rU2)} + {F(de2)} × {R(rU2 - rD2)} = {R(rU2)} + {R(de2 * (rU2 - rD2))} = "
    f"<b>{RP(rE2)}</b></p>"
    f"<p>Identity, not a check that can fail: the pre-tax WACC returns r<sub>U</sub>: "
    f"{N(1 - d2)}({R(rE2)}) + {N(d2)}({R(rD2)}) = {R(rU2)}.</p>",
    [
        f"Averages the unlevered betas ({F(bU2)}), not the equity betas. Averaging the equity betas gives {F((c1_bE + c2_bE) / 2)} and mixes in the comparables' leverage.",
        "r_U = 4.5% + 1.1 × 5.5% = 10.55%. Using the full market return of 10% as the premium is the trap.",
        f"Converts the division's D/V = 0.40 into D/E = 0.6667 before MM II. Plugging in 0.40 gives {PP(rE2_DV)}.",
        "r_E = 10.55% + 0.6667(10.55% − 6%) = 13.5833%.",
    ],
)
svar("mk-wacc-apv-2:1:b", "tall", [
    tall("r<sub>U</sub>", 100 * rU2, "%", feller=[100 * rU2_c1, 100 * rU2_c2, 100 * rU2_bE]),
    tall("r<sub>E</sub>", 100 * rE2, "%", feller=[100 * rE2_DV]),
])

ex2_c = del_(
    "c", 2,
    "<p>Find the division's after-tax WACC. (If you could not solve (b), use r<sub>U</sub> = 10% here "
    "and below.)</p>",
    f"<p>r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ) = {N(1 - d2)}({R(rE2)}) + "
    f"{N(d2)}({R(rD2)})(1 − 0.21)<br>= {R((1 - d2) * rE2)} + {R(d2 * rD2 * (1 - tau2))} = <b>{RP(w2)}</b></p>"
    f"<p>Cross-check: r<sub>U</sub> − (D/V)τr<sub>D</sub> = {R(rU2)} − 0.4 × 0.21 × 0.06 = {R(rU2)} − "
    f"{R(d2 * tau2 * rD2)} = {R(w2)}.</p>"
    f"<p>With the fallback r<sub>U</sub> = 10%: r<sub>wacc</sub> = 0.10 − 0.00504 = {RP(w2_fb)}.</p>",
    [
        "Uses the division's own weights E/V = 0.6 and D/V = 0.4, with (1 − τ) on r_D only.",
        "r_wacc = 0.6 × 13.5833% + 0.4 × 6% × 0.79 = 10.0460%.",
        "The shortcut r_U − (D/V)τr_D gives the same number and is a quick cross-check.",
        f"Full marks with the fallback r_U = 10%: r_wacc = {PP(w2_fb)}.",
    ],
)
svar("mk-wacc-apv-2:1:c", "tall", [
    tall("r<sub>wacc</sub>", 100 * w2, "%", feller=[100 * rU2, 100 * w2_DE], alt=[100 * w2_fb]),
], merknad=f"alt ({PP(w2_fb)}) er svaret med reserveverdien r_U = 10 %.")

ex2_d = del_(
    "d", 3,
    "<p>What is the levered value of the division using the WACC method?</p>",
    "<p>The free cash flow is a growing perpetuity that starts next year:</p>"
    f"<p>V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) = {N(FCF2_1)}/({R(w2)} − {R(g2)}) = "
    f"{N(FCF2_1)}/{R(w2 - g2)} = <b>${F(VL2)} million</b></p>"
    "<p>The tax shield is inside the WACC, so nothing is added.</p>"
    f"<p>With the fallback r<sub>U</sub> = 10%: V<sup>L</sup> = 26/({R(w2_fb)} − 0.025) = {F(VL2_fb)}.</p>",
    [
        "Uses the growing-perpetuity formula with the after-tax WACC: 26/(0.10046 − 0.025).",
        f"V^L = {F(VL2)}. Leaving out the growth gives {F(VL2_nog)}.",
        "Does not add a tax shield on top of the WACC value.",
        f"Full marks with the fallback r_U = 10%: V^L = {F(VL2_fb)}.",
    ],
)
svar("mk-wacc-apv-2:1:d", "tall", [
    tall("V<sup>L</sup> (WACC)", VL2, "$ m", feller=[VU2, VL2_nog], alt=[VL2_fb]),
], merknad=f"Fellene er V^U ({F(VU2)}) og verdien uten vekst. alt er svaret med reserveverdien r_U = 10 %.")

ex2_e = del_(
    "e", 5,
    "<p>How much debt will the division carry today and one year from now? Use this debt to find the "
    "present value of the interest tax shields and the levered value of the division with the APV method. "
    "Compare with (d).</p>",
    "<p><b>Step 1. Debt.</b> D<sub>t</sub> = 0.4 × V<sup>L</sup><sub>t</sub>. One year from now the "
    "division is worth the perpetuity that then starts with FCF<sub>2</sub> = 26 × 1.025. Its value "
    "has grown by 2.5% and the debt grows with it:</p>"
    f"<p>D<sub>0</sub> = 0.4 × {F(VL2)} = <b>${F(D2_0)} million</b><br>"
    f"V<sup>L</sup><sub>1</sub> = {N(FCF2_1 * (1 + g2))}/{R(w2 - g2)} = {F(VL2_1)}, so "
    f"D<sub>1</sub> = 0.4 × {F(VL2_1)} = <b>${F(D2_1)} million</b></p>"
    "<p>A value-creating, growing division forces the firm to borrow more every year to keep the "
    "ratio constant.</p>"
    "<p><b>Step 2. Tax shields.</b> TS<sub>1</sub> = τ × r<sub>D</sub> × D<sub>0</sub> = 0.21 × 0.06 × "
    f"{F(D2_0)} = <b>{F(TS2_1)}</b>. The shields grow at 2.5% with the debt (TS<sub>2</sub> = "
    f"{F(TS2_2)}). Under a constant D/V the shields carry the division's business risk, so they are "
    "discounted at r<sub>U</sub>:</p>"
    f"<p>PV(TS) = TS<sub>1</sub>/(r<sub>U</sub> − g) = 0.21 × 0.06 × {F(D2_0)}/({R(rU2)} − {R(g2)}) = "
    f"<b>{F(PVTS2)}</b></p>"
    "<p><b>Step 3. APV.</b></p>"
    f"<p>V<sup>U</sup> = {N(FCF2_1)}/({R(rU2)} − {R(g2)}) = {N(FCF2_1)}/{R(rU2 - g2)} = <b>{F(VU2)}</b><br>"
    f"V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {F(VU2)} + {F(PVTS2)} = <b>${F(VLa2)} million</b></p>"
    f"<p><b>Check.</b> The WACC method in (d) gave {F(VL2)}. The two methods agree. The debt came "
    "from the WACC value, so this is a fixed point, but it catches the wrong rate or the wrong growth "
    "on the tax shield.</p>"
    f"<p>With the fallback r<sub>U</sub> = 10%: D<sub>0</sub> = {F(D2_0fb)}, D<sub>1</sub> = {F(D2_1fb)}, "
    f"PV(TS) = {F(PVTS2_fb)} and V<sup>L</sup> = {F(VL2_fb)}.</p>",
    [
        f"D_0 = 0.4 × {F(VL2)} = {F(D2_0)} and D_1 = {F(D2_1)}: the debt grows with the value at 2.5%. Keeping D_1 = D_0 breaks the constant ratio.",
        f"TS_1 = 0.21 × 0.06 × {F(D2_0)} = {F(TS2_1)}, growing at 2.5%.",
        f"Discounts the shields at r_U and with growth: PV(TS) = 0.21 × 0.06 × {F(D2_0)}/(0.1055 − 0.025) = {F(PVTS2)}. Without growth {F(PVTS2_nog)}, at r_D {F(PVTS2_rD)}. Bonus, not required: saying why (under a constant D/V the shield moves with the value).",
        f"V^U = 26/0.0805 = {F(VU2)} and V^L = {F(VU2)} + {F(PVTS2)} = {F(VLa2)}.",
        "Notes that APV equals the WACC value in (d).",
        f"Full marks with the fallback r_U = 10%: D_0 = {F(D2_0fb)}, D_1 = {F(D2_1fb)}, PV(TS) = {F(PVTS2_fb)}, V^L = {F(VL2_fb)}.",
    ],
)
svar("mk-wacc-apv-2:1:e", "tall", [
    tall("D<sub>0</sub>", D2_0, "$ m", feller=[d2 * VU2, de2 * VL2], alt=[D2_0fb]),
    tall("D<sub>1</sub>", D2_1, "$ m", feller=[D2_0, d2 * VU2 * (1 + g2)], alt=[D2_1fb]),
    tall("PV(TS)", PVTS2, "$ m", feller=[PVTS2_nog, PVTS2_rD, PVTS2_w], alt=[PVTS2_fb]),
    tall("V<sup>L</sup> (APV)", VLa2, "$ m", feller=[VU2 + PVTS2_nog, VU2], alt=[VL2_fb]),
], merknad="Fellene for D_1 er gjeld holdt fast (D_1 = D_0) og gjeld fra V^U. alt er svarene med "
           "reserveverdien r_U = 10 %.")

ex2_f = del_(
    "f", 3,
    f"<p>Corliss's own after-tax WACC is {P(own_w2, 1)}. The CFO suggests discounting the division's free "
    "cash flows at this rate instead. Would that overvalue or undervalue the division? Explain briefly "
    "why the comparables are used, without new calculations.</p>",
    f"<p><b>It would overvalue the division.</b> {P(own_w2, 1)} is well below the division's own WACC of "
    f"{PP(w2)}. A lower rate gives a higher value.</p>"
    "<p>The discount rate must match the risk of the cash flows being valued, not the risk of the firm "
    "that owns them. Corliss's WACC reflects a supermarket chain, a stable business, while meal kits by "
    "subscription carry more systematic risk. Used for every project, the firm's own rate makes risky "
    "projects look better than they are, so Corliss could accept projects with a negative NPV at the "
    "correct rate.</p>"
    "<p>The comparables are pure meal-kit companies, so their betas show the division's business risk. "
    "Their leverage differs from the division's, so they are unlevered first and the average "
    "β<sub>U</sub> is relevered at the division's own D/V of 40%.</p>",
    [
        f"Overvalue: 6.2% is below the division's r_wacc of {PP(w2)}. A lower rate gives a higher value.",
        "Why: the rate must reflect the risk of the division's cash flows (meal kits), not of the firm that owns them (supermarkets).",
        "Why comparables: pure plays in the same business show the business risk. They are unlevered because their leverage differs, then relevered at the division's D/V.",
        "Bonus, not required: the consequence, that Corliss could take on negative-NPV projects.",
        "No new calculation is needed. 1 to 2 sentences per point are enough.",
    ],
)
svar("mk-wacc-apv-2:1:f", "tekst")

UT["mk-wacc-apv-2"] = {
    "n": 1, "title": "Valuation", "points": 20, "topic": "WACC and APV",
    "chapters": [3, 4, 17, 18],
    "merke": "Samme form som H2024 E5, med to sammenlignbare firmaer som i forelesning 09",
    "body": body2,
    "parts": [ex2_a, ex2_b, ex2_c, ex2_d, ex2_e, ex2_f],
}

# ============================================================ OPPGAVE 3: varslet tillegg
# Brandholm Toys, DKK, firmatall oppgitt, toårig prosjekt med ΔNWC, sunk cost og kannibalisering.
rf3, rm3, tau3 = 0.025, 0.075, 0.22
firmFCF3 = 230.0
E3, D3 = 1680.0, 720.0
bE3, rD3 = 1.30, 0.05
sunk3 = 3.0
capex3 = 60.0
dep3 = capex3 / 2
sales3 = [140.0, 160.0]
costshare3 = 0.65
cann3 = 7.0
nwc3 = [14.0, 16.0, 0.0]

d3 = D3 / (E3 + D3)
assert near(d3, 0.30)
assert all(abs(x - round(x, 4)) < 1e-12 for x in (d3, (1 - d3) * (rf3 + bE3 * (rm3 - rf3))))
rE3 = rf3 + bE3 * (rm3 - rf3)
w3 = (1 - d3) * rE3 + d3 * rD3 * (1 - tau3)
rU3 = (1 - d3) * rE3 + d3 * rD3
assert near(w3, rU3 - d3 * tau3 * rD3) and w3 < rU3

ebitda3 = [(1 - costshare3) * s for s in sales3]
inc3 = [e - cann3 for e in ebitda3]
ebit3 = [x - dep3 for x in inc3]
tax3 = [tau3 * x for x in ebit3]
nopat3 = [x - t for x, t in zip(ebit3, tax3)]
dnwc3 = [nwc3[0]] + [nwc3[t] - nwc3[t - 1] for t in (1, 2)]
F0_3 = -capex3 - dnwc3[0]
FCF3 = [nopat3[i] + dep3 - dnwc3[i + 1] for i in range(2)]
assert near(F0_3, -74) and [round(x, 4) for x in FCF3] == [37.36, 60.82]

pvw3 = disk(FCF3, w3)
V_3 = backward(FCF3, w3)
PV3 = V_3[0]
NPV3 = F0_3 + PV3
D3_0, D3_1 = d3 * V_3[0], d3 * V_3[1]
adj3 = D3_1 - D3_0
assert adj3 < 0                                                 # nedbetaling i år 1
pvU3 = disk(FCF3, rU3)
VU3 = sum(pvU3)
TS3 = [tau3 * rD3 * D3_0, tau3 * rD3 * D3_1]
pvTS3 = disk(TS3, rU3)
PVTS3 = sum(pvTS3)
NPVa3 = F0_3 + VU3 + PVTS3
assert near(NPVa3, NPV3, 1e-12)                                 # WACC = APV
# FTE for prosjektets egenkapital
for t, Dprev, Dnext in ((1, D3_0, D3_1), (2, D3_1, 0.0)):
    fcfe = FCF3[t - 1] - (1 - tau3) * rD3 * Dprev + (Dnext - Dprev)
    assert near((1 - d3) * V_3[t - 1] * (1 + rE3), fcfe + (1 - d3) * V_3[t], 1e-12)
# halen: renter trukket fra FCF og diskontert med WACC gir for lav NPV
renter3 = [(1 - tau3) * rD3 * D3_0, (1 - tau3) * rD3 * D3_1]
NPV3_kollega = F0_3 + sum(disk([f - r for f, r in zip(FCF3, renter3)], w3))
fall3 = NPV3 - NPV3_kollega
assert NPV3_kollega < NPV3
s_fall3, t_fall3 = summ(disk(renter3, w3), fall3)

# feller
F0_3_sunk = F0_3 - sunk3
FCF3_nivaa = [nopat3[i] + dep3 - nwc3[i + 1] for i in range(2)]
FCF3_utenkann = [(ebitda3[i] - dep3) * (1 - tau3) + dep3 - dnwc3[i + 1] for i in range(2)]
FCF3_utenNWC = [nopat3[i] + dep3 for i in range(2)]
NPV3_rU = F0_3 + VU3
NPV3_rE = F0_3 + sum(disk(FCF3, rE3))
NPV3_sunk = NPV3 - sunk3
w3_DE = (1 - D3 / E3) * rE3 + (D3 / E3) * rD3 * (1 - tau3)
V3_U = backward(FCF3, rU3)
adj3_VU = d3 * V3_U[1] - d3 * V3_U[0]
adj3_medF = d3 * (FCF3[0] + V_3[1]) - D3_0
PVTS3_rD = sum(disk(TS3, rD3))
PVTS3_Dt = sum(disk([tau3 * rD3 * D3_1, 0.0], rU3))

w3r, rU3r = round(w3, 4), round(rU3, 4)                    # student med fire desimaler
V3r = backward(FCF3, w3r)
TS3r = [tau3 * rD3 * d3 * V3r[0], tau3 * rD3 * d3 * V3r[1]]
NPV3_drift = F0_3 + sum(disk(FCF3, rU3r)) + sum(disk(TS3r, rU3r))
NPV3_2des = F0_3 + sum(round(x, 2) for x in disk(FCF3, rU3)) + sum(round(x, 2) for x in disk(TS3, rU3))
s_pvw3, t_pvw3 = summ([F0_3] + pvw3, NPV3)
dV3 = V_3[1] - V_3[0]
assert near(d3 * dV3, adj3)
# reserveverdi i (c): FCF = −75, 36, 62 (ikke svaret); svarene bygd på den blir alt i (c), (d) og (e)
F0_3fb, FCF3_fb = -75.0, [36.0, 62.0]
V_3fb = backward(FCF3_fb, w3)
NPV3_fb = F0_3fb + V_3fb[0]
D3_0fb, D3_1fb = d3 * V_3fb[0], d3 * V_3fb[1]
adj3_fb = D3_1fb - D3_0fb
VU3_fb = sum(disk(FCF3_fb, rU3))
PVTS3_fb = sum(disk([tau3 * rD3 * D3_0fb, tau3 * rD3 * D3_1fb], rU3))
NPVa3_fb = F0_3fb + VU3_fb + PVTS3_fb
assert near(NPVa3_fb, NPV3_fb, 1e-12)
s_pvU3, t_pvU3 = summ(pvU3, VU3)
s_pvTS3, t_pvTS3 = summ(pvTS3, PVTS3)
assert near(tau3 * rD3, 0.011)
s_apv3, t_apv3 = summ([F0_3, VU3, PVTS3], NPVa3)

body3 = (
    "<p>Brandholm Toys, a listed Danish toy maker, earns a free cash flow of DKK 230 million per year "
    f"from its existing business. Its equity is worth DKK {N(E3)} million and its debt DKK {N(D3)} million. "
    f"Brandholm keeps this debt-to-value ratio constant, also for new projects. Its equity beta is {F(bE3, 2)} "
    "and its cost of debt 5%. "
    "The risk-free rate is 2.5%, the expected market return 7.5% and the tax rate 22%.</p>"
    "<p>Brandholm holds a two-year licence for toys based on an animated series, a project with the "
    "same risk as the existing business. Today is Year 0. In DKK million:</p><ul>"
    "<li>A design agency has already been paid 3 for the designs.</li>"
    "<li>Moulds cost 60 today, are depreciated straight-line to zero over Years 1 and 2 and are "
    "worthless afterwards.</li>"
    "<li>Sales are 140 in Year 1 and 160 in Year 2. Costs other than depreciation are 65% of sales.</li>"
    "<li>Lost sales of Brandholm's own range cut the EBITDA of the existing business by 7 in each of "
    "Years 1 and 2.</li>"
    "<li>The project's net working capital is 14 at the end of Year 0, 16 at the end of Year 1 and zero "
    "at the end of Year 2.</li></ul>"
    "<p>Use 4 decimal places.</p>"
)

ex3_a = del_(
    "a", 3,
    "<p>Find Brandholm's cost of equity and its after-tax WACC.</p>",
    f"<p><b>Step 1. CAPM.</b> r<sub>E</sub> = {R(rf3)} + {F(bE3, 2)} × ({R(rm3)} − {R(rf3)}) = {R(rf3)} + "
    f"{R(bE3 * (rm3 - rf3))} = <b>{RP(rE3)}</b></p>"
    f"<p><b>Step 2. Weights from market values.</b> V = {N(E3)} + {N(D3)} = {N(E3 + D3)}, so D/V = "
    f"{N(D3)}/{N(E3 + D3)} = <b>{R(d3)}</b> and E/V = <b>{R(1 - d3)}</b>. The free cash flow of the existing "
    "business is not needed.</p>"
    f"<p><b>Step 3. WACC.</b> r<sub>wacc</sub> = {R(1 - d3)}({R(rE3)}) + {R(d3)}({R(rD3)})(1 − 0.22) = "
    f"{R((1 - d3) * rE3)} + {R(d3 * rD3 * (1 - tau3))} = <b>{RP(w3)}</b></p>",
    [
        f"r_E = 2.5% + {F(bE3, 2)} × 5% = {PP(rE3)}, with the market risk premium of 5%, not 7.5%.",
        f"Weights from market values: D/V = {N(D3)}/{N(E3 + D3)} = {N(d3)}. Using D/E = {F(D3 / E3)} as a weight is wrong.",
        f"r_wacc = {N(1 - d3)} × {PP(rE3)} + {N(d3)} × 5% × 0.78 = {PP(w3)}, with (1 − τ) on r_D only.",
    ],
)
svar("mk-wacc-apv-3:1:a", "tall", [
    tall("r<sub>E</sub>", 100 * rE3, "%", feller=[100 * (rf3 + bE3 * rm3)]),
    tall("r<sub>wacc</sub>", 100 * w3, "%", feller=[100 * rU3, 100 * w3_DE]),
])

tabsol3 = ("<table class=\"data\">" + tr("DKK million", "Year 0", "Year 1", "Year 2", th=True)
           + tr("Sales", "", *[N(x) for x in sales3])
           + tr(f"{MINUS} Costs (65% of sales)", "", *[N(-costshare3 * s) for s in sales3])
           + tr(f"{MINUS} Lost EBITDA, existing range", "", *[N(-cann3)] * 2)
           + tr("Incremental EBITDA", "", *[N(x) for x in inc3])
           + tr(f"{MINUS} Depreciation", "", *[N(-dep3)] * 2)
           + tr("EBIT", "", *[N(x) for x in ebit3])
           + tr(f"{MINUS} Tax (22%)", "", *[N(-x) for x in tax3])
           + tr("EBIT(1 − τ)", "", *[N(x) for x in nopat3])
           + tr("+ Depreciation", "", *[N(dep3)] * 2)
           + tr(f"{MINUS} CapEx", N(-capex3), "", "")
           + tr("NWC (level)", *[N(x) for x in nwc3])
           + tr(f"{MINUS} ΔNWC", *[N(-x) for x in dnwc3])
           + tr("<b>FCF</b>", f"<b>{N(F0_3)}</b>", *[f"<b>{N(x)}</b>" for x in FCF3])
           + "</table>")

ex3_b = del_(
    "b", 5,
    "<p>Find the free cash flow of the project in Years 0, 1 and 2.</p>",
    "<p>Value the project, not the firm: only the incremental cash flows count. The DKK 230 million "
    "from the existing business is irrelevant. The DKK 3 million paid to the design agency is sunk: it is "
    "gone whether or not Brandholm makes the toys. The lost EBITDA on the existing range is an indirect "
    "effect of the project and is subtracted. No interest is subtracted.</p>"
    "<p>FCF = EBIT(1 − τ) + Depreciation − CapEx − ΔNWC, with depreciation 60/2 = 30 per year and "
    "ΔNWC the <i>change</i> in working capital, not its level:</p>"
    + tabsol3 +
    f"<p>FCF<sub>0</sub> = <b>{N(F0_3)}</b>, FCF<sub>1</sub> = <b>{N(FCF3[0])}</b>, FCF<sub>2</sub> = "
    f"<b>{N(FCF3[1])}</b>. In Year 2 the working capital of 16 is released, which is a cash inflow.</p>",
    [
        "Leaves out the 230 of the existing business and the sunk 3 for the designs. Including the sunk cost gives FCF_0 = −77.",
        "Subtracts the lost EBITDA of 7 per year before tax: incremental EBITDA = 42 and 49.",
        "Depreciation of 30 per year is subtracted before tax and added back after tax.",
        "Uses ΔNWC, not the level: −14 in Year 0, −2 in Year 1 and +16 in Year 2. Using the levels ('forgetting the delta') gives 23.36 and 44.82.",
        "FCF = −74, 37.36 and 60.82. Show the calculation.",
    ],
)
svar("mk-wacc-apv-3:1:b", "tall", [
    tall("FCF<sub>0</sub>", F0_3, "DKK m", feller=[F0_3_sunk]),
    tall("FCF<sub>1</sub>", FCF3[0], "DKK m", feller=[FCF3_nivaa[0], FCF3_utenkann[0], FCF3_utenNWC[0]]),
    tall("FCF<sub>2</sub>", FCF3[1], "DKK m", feller=[FCF3_nivaa[1], FCF3_utenkann[1], FCF3_utenNWC[1]]),
], merknad="Fellene er sunk cost tatt med, NWC-nivå i stedet for endring, kannibaliseringen utelatt og "
           f"ΔNWC utelatt. FCF_2 med nivå og uten ΔNWC er samme tall ({N(FCF3_nivaa[1])}).")

ex3_c = del_(
    "c", 2,
    "<p>Find the NPV of the project using the WACC method. (If you could not solve (b), use FCF = "
    "−75, 36 and 62 here and below.)</p>",
    f"<p>NPV = {N(F0_3)} + {frac_terms(FCF3, R(1 + w3))}<br>= {s_pvw3} = <b>DKK {t_pvw3} million</b></p>"
    f"<p>The present value of the future cash flows is {F(PV3)}, but the question asks for the NPV, so "
    "the outlay of 74 today is included. The NPV is positive, so the project is worth doing.</p>"
    f"<p>With the fallback cash flows: NPV = −75 + 36/{R(1 + w3)} + 62/{R(1 + w3)}<sup>2</sup> = "
    f"{F(NPV3_fb)}.</p>",
    [
        f"Discounts the project's FCF at r_wacc = {PP(w3)} and includes FCF_0 undiscounted.",
        f"NPV = {F(NPV3)}. Stopping at the PV ({F(PV3)}) answers a different question and loses a point.",
        "Values the project, not the firm: a firm value built on the 230 earns nothing here.",
        f"Full marks with the fallback cash flows: NPV = {F(NPV3_fb)}.",
    ],
)
svar("mk-wacc-apv-3:1:c", "tall", [
    tall("NPV (WACC)", NPV3, "DKK m", feller=[NPV3_rU, NPV3_rE, PV3, NPV3_sunk], alt=[NPV3_fb]),
], merknad=f"Fellene er NPV med r_U ({F(NPV3_rU)}), med r_E, PV uten investeringen og sunk cost tatt med. "
           f"alt ({F(NPV3_fb)}) er svaret med reservekontantstrømmene.")

ex3_d = del_(
    "d", 3,
    "<p>Find the project's debt capacity today and the debt adjustment at the end of Year 1. Does "
    "Brandholm borrow or repay?</p>",
    f"<p>To keep D/V = {N(d3)}, the project must carry debt D<sub>t</sub> = {N(d3)} × V<sup>L</sup><sub>t</sub>, "
    "where V<sup>L</sup><sub>t</sub> is the value of the cash flows still to come.</p>"
    f"<p>V<sup>L</sup><sub>1</sub> = {N(FCF3[1])}/{R(1 + w3)} = {F(V_3[1])}, so D<sub>1</sub> = {N(d3)} × "
    f"{F(V_3[1])} = <b>{F(D3_1)}</b><br>"
    f"V<sup>L</sup><sub>0</sub> = ({N(FCF3[0])} + {F(V_3[1])})/{R(1 + w3)} = {F(V_3[0])}, so "
    f"D<sub>0</sub> = {N(d3)} × {F(V_3[0])} = <b>{F(D3_0)}</b></p>"
    f"<p>Brandholm raises <b>DKK {F(D3_0)} million</b> of debt today: {N(d3)} of the value of the future "
    f"cash flows, not {N(d3)} of the outlay ({N(d3)} × 74 = {N(-d3 * F0_3)}). At the end of Year 1 the "
    f"adjustment is D<sub>1</sub> − D<sub>0</sub> = {N(d3)} × ({F(V_3[1])} − {F(V_3[0])}) = {N(d3)} × "
    f"({F(dV3)}) = <b>{F(adj3)}</b>: Brandholm <b>repays</b> DKK {F(-adj3)} million, "
    f"because the value of what is left of the project falls once FCF<sub>1</sub> has been paid out. The "
    f"rest, {F(D3_1)}, is repaid at the end of Year 2.</p>"
    f"<p>With the fallback cash flows: D<sub>0</sub> = {F(D3_0fb)} and the adjustment is {F(adj3_fb)}.</p>",
    [
        f"D_t = {N(d3)} × V^L_t, with V^L_t the value of the cash flows still to come, discounted at r_wacc.",
        f"D_0 = {N(d3)} × {F(V_3[0])} = {F(D3_0)}. Basing it on the outlay ({N(d3)} × 74 = {N(-d3 * F0_3)}), on the NPV or on V^U is wrong.",
        f"V^L_1 = 60.82/{R(1 + w3)} = {F(V_3[1])}, so D_1 = {F(D3_1)} and the adjustment is {F(adj3)}. Leaving FCF_1 inside V^L_1 is the classic mistake.",
        "Says in words that Brandholm repays debt at the end of Year 1.",
        f"Full marks with the fallback cash flows: D_0 = {F(D3_0fb)}, adjustment {F(adj3_fb)}.",
    ],
)
svar("mk-wacc-apv-3:1:d", "blandet", [
    tall("D<sub>0</sub>", D3_0, "DKK m", feller=[d3 * V3_U[0], d3 * NPV3, (D3 / E3) * V_3[0], -d3 * F0_3],
         alt=[D3_0fb]),
    tall("Debt adjustment, Year 1", adj3, "DKK m", feller=[adj3_VU, adj3_medF, -adj3_VU, -adj3_medF],
         alt=[-adj3, adj3_fb, -adj3_fb]),
], tallPoeng=2, tekstLedd="Does Brandholm borrow or repay?",
    merknad="Begge fortegn godtas for justeringen (D_1 − D_0 eller D_0 − D_1). Retningen (nedbetaling) "
            "rettes i tekstdelen. Toleransen er stram fordi tallene regnet fra V^U ligger under 1 % unna. "
            f"0.3 × 74 = {N(-d3 * F0_3)} (gjeld fra utlegget) er en felle. Resten av alt er svarene med "
            "reservekontantstrømmene.")

ex3_e = del_(
    "e", 4,
    "<p>Find r<sub>U</sub>, the present value of the tax shields and the NPV using the APV method. "
    "Compare with (c).</p>",
    f"<p><b>Step 1. r<sub>U</sub>.</b> r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = {R(1 - d3)}"
    f"({R(rE3)}) + {R(d3)}({R(rD3)}) = {R((1 - d3) * rE3)} + {R(d3 * rD3)} = <b>{RP(rU3)}</b></p>"
    f"<p><b>Step 2. Unlevered value.</b> V<sup>U</sup><sub>0</sub> = {frac_terms(FCF3, R(1 + rU3))} = "
    f"{s_pvU3} = <b>{t_pvU3}</b></p>"
    "<p><b>Step 3. Tax shields</b> on the debt from (d), paid on the debt at the start of each year:</p>"
    f"<p>TS<sub>1</sub> = 0.22 × 0.05 × {F(D3_0)} = {F(TS3[0])}<br>"
    f"TS<sub>2</sub> = 0.22 × 0.05 × {F(D3_1)} = {F(TS3[1])}</p>"
    "<p>The debt follows the project's value, so the shields carry the project's risk and are "
    "discounted at r<sub>U</sub>:</p>"
    f"<p>PV(TS) = 0.011 × {F(D3_0)}/{R(1 + rU3)} + 0.011 × {F(D3_1)}/{R(1 + rU3)}<sup>2</sup> = {s_pvTS3} = "
    f"<b>{t_pvTS3}</b> (0.011 = 0.22 × 0.05)</p>"
    f"<p><b>Step 4. APV.</b> NPV = FCF<sub>0</sub> + V<sup>U</sup><sub>0</sub> + PV(TS) = {s_apv3} = "
    f"<b>DKK {t_apv3} million</b></p>"
    f"<p><b>Check.</b> The WACC method in (c) gave {F(NPV3)}. The two NPVs agree, as they must when the "
    "debt follows D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub>.</p>"
    f"<p>With the fallback cash flows: PV(TS) = {F(PVTS3_fb)} and NPV = {F(NPVa3_fb)}.</p>",
    [
        f"r_U = {N(1 - d3)} × {PP(rE3)} + {N(d3)} × 5% = {PP(rU3)}, without (1 − τ).",
        f"V^U_0 = {F(VU3)}, TS_1 = {F(TS3[0])} and TS_2 = {F(TS3[1])}, based on D_0 and D_1 from (d).",
        f"Discounts the tax shields at r_U: PV(TS) = {F(PVTS3)}. At r_D it would be {F(PVTS3_rD)}. Bonus, not required: saying why (the debt is rebalanced to a constant D/V).",
        f"NPV = −74 + {F(VU3)} + {F(PVTS3)} = {F(NPVa3)}, the same as in (c). The answer is an NPV, so FCF_0 is included. With the fallback cash flows: PV(TS) = {F(PVTS3_fb)}, NPV = {F(NPVa3_fb)}.",
    ],
)
svar("mk-wacc-apv-3:1:e", "tall", [
    tall("r<sub>U</sub>", 100 * rU3, "%", feller=[100 * w3]),
    tall("PV(TS)", PVTS3, "DKK m", feller=[PVTS3_rD, PVTS3_Dt], alt=[PVTS3_fb]),
    tall("NPV (APV)", NPVa3, "DKK m", feller=[NPV3_rU, VU3 + PVTS3, F0_3 + VU3 + PVTS3_rD], tol=0.001,
         drift=[NPV3_drift, student_apv(F0_3, FCF3, w3, rU3, d3, tau3, rD3), NPV3_2des], alt=[NPVa3_fb]),
], merknad=f"Diskonteres skjoldet med r_D, blir NPV {100 * (PVTS3_rD - PVTS3) / NPV3:.2f} % høyere, så "
           f"toleransen på NPV er 0.1 % (hver nåverdi rundet til to desimaler gir {F(NPV3_2des, 2)}, innenfor). "
           f"PV(TS) ({F(PVTS3_rD)} mot {F(PVTS3)}) avviser r_D med standardtoleransen. alt er svarene med "
           "reservekontantstrømmene.")

ex3_f = del_(
    "f", 3,
    "<p>A colleague subtracts the after-tax interest on the project's debt from each FCF and discounts "
    "at the WACC from (a). Is this right? Is the colleague's NPV too high or too low? Explain briefly.</p>",
    "<p><b>It is not right. The NPV is too low.</b> The WACC method discounts unlevered free cash "
    "flows. The cost of debt, after tax, is already inside r<sub>wacc</sub> through the term "
    "(D/V)r<sub>D</sub>(1 − τ). Subtracting the interest from the cash flows as well counts the cost of "
    "debt twice, so every cash flow is too small and the NPV is understated.</p>"
    f"<p>For illustration (not required): with the debt from (d) the after-tax interest is "
    f"{F(renter3[0])} in Year 1 and {F(renter3[1])} in Year 2, so the colleague's NPV is lower by "
    f"{F(renter3[0])}/{R(1 + w3)} + {F(renter3[1])}/{R(1 + w3)}<sup>2</sup> = {s_fall3} = {t_fall3}.</p>"
    "<p>Cash flows after interest belong to the flow-to-equity method, which also adds net borrowing "
    "and discounts at r<sub>E</sub> to value the equity. The lecturer called subtracting interest from "
    "EBIT a big mistake people make in the exam (lecture 18).</p>",
    [
        "Not right: the WACC method uses unlevered free cash flows, with no interest subtracted.",
        "The after-tax cost of debt is already in r_wacc through (D/V)r_D(1 − τ), so subtracting interest counts it twice.",
        "The colleague's NPV is too low.",
        "Bonus, not required: flows after interest belong to the flow-to-equity method (plus net borrowing, discounted at r_E).",
    ],
)
svar("mk-wacc-apv-3:1:f", "tekst")

UT["mk-wacc-apv-3"] = {
    "n": 1, "title": "Valuation with leverage", "points": 20, "topic": "WACC and APV",
    "chapters": [2, 3, 4, 17, 18, 19],
    "merke": "Samme form som H2025 E4 og prosjekteksemplet i forelesning 08",
    "body": body3,
    "parts": [ex3_a, ex3_b, ex3_c, ex3_d, ex3_e, ex3_f],
}



# ============================================================ IPO: vinnerens forbannelse (tier 2)
def ipo_ret(nH, nL, H, L, P):
    """Avkastning per aksje for en uinformert som får nH aksjer i gode og nL i dårlige IPO-er."""
    return (nH * (H - P) + nL * (L - P)) / ((nH + nL) * P)


def ipo_be(nH, nL, H, L):
    """Prisen der den uinformerte går i null: tildelingsvektet snitt av verdiene."""
    return (nH * H + nL * L) / (nH + nL)


# ------------------------------------------------ mk-ipo-1: forelesningsformen (€, 50/50, 5× og 2×)
H1, L1, q1 = 55.0, 34.0, 0.5
ord1, k1H, k1L, nIPO1 = 100.0, 5.0, 2.0, 100
EV1 = q1 * H1 + (1 - q1) * L1
aH1, aL1 = ord1 / k1H, ord1 / k1L
sH1, sL1 = q1 * nIPO1 * aH1, (1 - q1) * nIPO1 * aL1            # aksjer totalt i gode og dårlige
r1_EV = ipo_ret(sH1, sL1, H1, L1, EV1)
prof1 = sH1 * (H1 - EV1) + sL1 * (L1 - EV1)
inv1 = (sH1 + sL1) * EV1
X1 = ipo_be(sH1, sL1, H1, L1)
assert near(X1, 40) and near(EV1, 44.5) and near(ipo_ret(sH1, sL1, H1, L1, X1), 0)
gH1, gL1 = H1 / X1 - 1, L1 / X1 - 1
avg1 = q1 * gH1 + (1 - q1) * gL1
assert near(avg1, EV1 / X1 - 1) and avg1 > 0 and r1_EV < 0
# reserveverdier: (c) 25 og 50 aksjer, (d) pris €41
aH1fb, aL1fb, X1fb = 25.0, 40.0, 42.0
X1_alt = ipo_be(aH1fb, aL1fb, H1, L1)
assert not near(X1_alt, X1, 1e-3) and not near(X1fb, X1, 1e-3)
avg1fb, inf1fb = EV1 / X1fb - 1, H1 / X1fb - 1
you1fb = ipo_ret(sH1, sL1, H1, L1, X1fb)
s_prof1, t_prof1 = summN([sH1 * (H1 - EV1), sL1 * (L1 - EV1)], prof1)
# feller
X1_lik = ipo_be(aH1, aL1, H1, L1) * 0 + (aH1 * H1 + aL1 * L1) / (2 * ord1)

ex_i1 = {
    "n": 1, "title": "Security issues", "points": 20, "topic": "Initial public offerings",
    "chapters": [14],
    "merke": "Samme form som IPO-eksemplet i forelesning 07",
    "body": (
        "<p>Over the next year 100 small European tech firms will go public, one IPO at a time. The firms "
        "are independent and look identical to you. A firm's shares are worth either €55 (a good firm) or "
        "€34 (a bad firm) at the end of the first trading day, with equal probability. You are an "
        "uninformed investor and order 100 shares in every IPO. Oversubscribed IPOs are allocated pro "
        "rata. Everyone is risk neutral; ignore discounting within the day. Use 4 decimal places.</p>"
    ),
    "parts": [
        del_("a", 3,
             "<p>Suppose no investor knows more than you. At what price will the shares be sold? What is your "
             "expected first-day return?</p>",
             f"<p>All investors see the same thing, so the fair price is the expected value:</p>"
             f"<p>P = 0.5 × {N(H1)} + 0.5 × {N(L1)} = <b>€{N(EV1)}</b></p>"
             f"<p>Half the IPOs rise to {N(H1)} ({PP(H1 / EV1 - 1)}) and half fall to {N(L1)} "
             f"({PP(L1 / EV1 - 1)}), so the expected first-day return is <b>0%</b>. Every IPO is the same "
             "for you and you receive the same allocation in all of them.</p>",
             [f"Price = expected value = 0.5 × 55 + 0.5 × 34 = €{N(EV1)}.",
              "Expected first-day return 0%: the price is fair and nobody has better information.",
              "«The price is fair, so the expected return is 0%» earns full marks for the return."]),
        del_("b", 4,
             "<p>Now some investors know each firm's type and order shares only in good IPOs. Good IPOs become "
             "5 times oversubscribed and bad IPOs 2 times. Each IPO is still priced at the expected value of a "
             "share. How many shares do you receive in a good and in a bad IPO? What is your average return "
             "per share you receive?</p>",
             f"<p><b>Step 1. Allocation.</b> Good IPO: 100/5 = <b>{N(aH1)}</b> shares. Bad IPO: 100/2 = "
             f"<b>{N(aL1)}</b> shares.</p>"
             f"<p><b>Step 2. Over all 100 IPOs.</b> You expect 50 good and 50 bad IPOs, so you receive 50 × "
             f"{N(aH1)} = {N(sH1)} good shares and 50 × {N(aL1)} = {N(sL1)} bad shares.</p>"
             f"<p>Profit = {N(sH1)} × ({N(H1)} − {N(EV1)}) + {N(sL1)} × ({N(L1)} − {N(EV1)}) = {s_prof1} = "
             f"{t_prof1}<br>Invested = {N(sH1 + sL1)} × {N(EV1)} = {N(inv1)}</p>"
             f"<p>Return = {N(prof1)}/{N(inv1)} = <b>{PP(r1_EV)}</b></p>"
             "<p>Even though half the IPOs are good, most of your shares are in bad ones. At this price you "
             "lose money and would stay away.</p>",
             [f"Allocations 100/5 = {N(aH1)} and 100/2 = {N(aL1)} shares.",
              f"Weights the returns by the shares actually received: ({N(sH1)} × 10.5 − {N(sL1)} × 10.5)/{N(inv1)} = {PP(r1_EV)}.",
              "Using the order of 100 shares in both types gives 0% and misses the point of the exercise.",
              "Show the calculation."]),
        del_("c", 5,
             "<p>The allocations stay as in (b). At what issue price do you just break even, so that you are "
             "still willing to take part in every IPO? (If you could not solve (b), use 25 shares in good IPOs "
             "and 40 in bad.)</p>",
             "<p>Call the price X. Your expected profit over all IPOs must be zero:</p>"
             f"<p>{N(sH1)} × ({N(H1)} − X) + {N(sL1)} × ({N(L1)} − X) = 0<br>"
             f"{N(sH1 * H1)} + {N(sL1 * L1)} = {N(sH1 + sL1)}X<br>"
             f"X = {N(sH1 * H1 + sL1 * L1)}/{N(sH1 + sL1)} = <b>€{N(X1)}</b></p>"
             f"<p>The break-even price is the average value weighted by your allocations: ({N(aH1)} × {N(H1)} + "
             f"{N(aL1)} × {N(L1)})/({N(aH1)} + {N(aL1)}) = {N(X1)}, below the expected value of {N(EV1)}.</p>"
             f"<p>With the fallback allocations (25 and 40): X = (25 × 55 + 40 × 34)/65 = {F(X1_alt)}.</p>",
             ["Sets up the break-even condition with the shares actually received, as the lecturer wrote it on the board.",
              f"X = {N(sH1 * H1 + sL1 * L1)}/{N(sH1 + sL1)} = €{N(X1)}. Using equal weights brings back the expected value of €{N(EV1)}.",
              f"Full marks with the fallback allocations: X = €{F(X1_alt)}.",
              "Show the calculation."]),
        del_("d", 4,
             "<p>Suppose every IPO is priced as in (c). What is the average first-day return across all IPOs? "
             "What return do the informed investors earn? What do you earn? (If you could not solve (c), use "
             "€42.)</p>",
             f"<p>A good IPO rises from {N(X1)} to {N(H1)}: {PP(gH1)}. A bad IPO falls to {N(L1)}: {PP(gL1)}.</p>"
             f"<p>Average first-day return = 0.5 × {PP(gH1)} + 0.5 × ({PP(gL1)}) = <b>{PP(avg1)}</b> "
             f"(the same as {N(EV1)}/{N(X1)} − 1).</p>"
             f"<p>The informed investors buy only good IPOs: <b>{PP(gH1)}</b>. You break even: <b>0%</b>, "
             "because the price was set to make you indifferent.</p>"
             f"<p>With the fallback €42: average {PP(avg1fb)} and informed {PP(inf1fb)}. You earn "
             f"{PP(you1fb)} with the allocations from (b).</p>",
             [f"Average first-day return {PP(avg1)}, the equal-weighted average of {PP(gH1)} and {PP(gL1)}.",
              f"Informed investors earn {PP(gH1)} because they buy only good IPOs.",
              "You earn 0%: the price is your break-even price.",
              f"Full marks with the fallback €42: {PP(avg1fb)}, {PP(inf1fb)} and {PP(you1fb)}."]),
        del_("e", 4,
             "<p>A journalist writes: «IPOs rise sharply on the first day on average, so ordinary investors "
             "should buy every IPO. The underpricing shows that banks favour their hedge-fund clients.» Comment "
             "briefly on both claims.</p>",
             "<p><b>First claim: wrong.</b> The average first-day return is earned by an investor who holds "
             "the same number of shares in every IPO. An uninformed investor cannot do that: in good IPOs the "
             "informed investors crowd in and you are rationed, while in bad IPOs nobody else bids and you get "
             "a large allocation. Your shares are tilted towards the bad IPOs, so you earn only 0%, not "
             f"{PP(avg1)}. This is the winner's curse.</p>"
             "<p><b>Second claim: not needed.</b> The underpricing follows from asymmetric information alone. "
             "Issuers need the uninformed investors, so they set the price where these just break even, below "
             "the expected value. The informed investors earn the gain, but the bank does not have to favour "
             "anyone. A conflict of interest at the bank is a possible extra explanation, but the lecturer's "
             "answer was that it is not the main one.</p>",
             ["2 points: the uninformed are rationed in good IPOs and filled in bad ones, so they cannot earn the average first-day return; they earn 0% at this price.",
              "2 points: underpricing arises even with an honest bank, because the price must let the uninformed break even (asymmetric information, the winner's curse).",
              "Bonus, not required: mentioning the bank-conflict or insurance explanations as possible extra causes.",
              "2 to 4 sentences are enough."]),
    ],
}
UT["mk-ipo-1"] = ex_i1
svar("mk-ipo-1:1:a", "tall", [
    tall("Price", EV1, "€", feller=[X1]),
    tall("Expected first-day return", 0.0, "%", abs_=0.05),
])
svar("mk-ipo-1:1:b", "tall", [
    tall("Shares, good IPO", aH1, "", feller=[ord1]),
    tall("Shares, bad IPO", aL1, "", feller=[ord1]),
    tall("Average return per share", 100 * r1_EV, "%"),
])
svar("mk-ipo-1:1:c", "tall", [
    tall("Break-even price", X1, "€", feller=[EV1, X1_lik], alt=[X1_alt]),
], merknad=f"alt ({F(X1_alt)}) er svaret med reserveallokeringene 25 og 40.")
svar("mk-ipo-1:1:d", "tall", [
    tall("Average first-day return", 100 * avg1, "%", feller=[0.0], alt=[100 * avg1fb]),
    tall("Informed investors' return", 100 * gH1, "%", feller=[100 * avg1], alt=[100 * inf1fb]),
    tall("Your return", 0.0, "%", abs_=0.05, alt=[100 * you1fb]),
], merknad=f"alt er svarene med reserveprisen 42 ({PP(avg1fb)}, {PP(inf1fb)} og {PP(you1fb)} for deg "
           "med allokeringene fra (b)).")
svar("mk-ipo-1:1:e", "tekst")

# ------------------------------------------------ mk-ipo-2: etterspørsel i aksjer, full tegning (NOK)
H2i, L2i, q2i = 124.0, 72.0, 0.5
S2i, U2i, I2i = 2.0, 2.5, 1.5                  # millioner aksjer: tilbud, uinformert og informert etterspørsel
EV2i = q2i * H2i + (1 - q2i) * L2i
kH2, kL2 = (U2i + I2i) / S2i, U2i / S2i
fH2, fL2 = S2i / (U2i + I2i), S2i / U2i
assert near(kH2, 2) and near(kL2, 1.25) and near(fH2, 0.5) and near(fL2, 0.8) and I2i < S2i
uH2, uL2 = q2i * fH2 * U2i, (1 - q2i) * fL2 * U2i        # uinformerte aksjer per IPO i snitt (mill.)
uH2p, uL2p = fH2 * U2i, fL2 * U2i                        # per par av én god og én dårlig
r2_EV = ipo_ret(uH2p, uL2p, H2i, L2i, EV2i)
P2 = ipo_be(uH2p, uL2p, H2i, L2i)
assert near(P2, 92) and near(EV2i, 98)
lt_g, lt_b = S2i * (H2i - P2), S2i * (L2i - P2)
lt_avg = q2i * lt_g + (1 - q2i) * lt_b
assert near(lt_avg, S2i * (EV2i - P2))
avg2 = EV2i / P2 - 1
# reserveverdier: (b) fyllingsgrader 40 % og 75 %, (d) pris NOK 90
fH2fb, fL2fb, P2fb = 0.40, 0.75, 90.0
r2_fb = ipo_ret(fH2fb * U2i, fL2fb * U2i, H2i, L2i, EV2i)
P2_alt = ipo_be(fH2fb * U2i, fL2fb * U2i, H2i, L2i)
lt_gfb, lt_bfb = S2i * (H2i - P2fb), S2i * (L2i - P2fb)
lt_avgfb, avg2fb = S2i * (EV2i - P2fb), EV2i / P2fb - 1
prof2 = uH2p * (H2i - EV2i) + uL2p * (L2i - EV2i)
inv2 = (uH2p + uL2p) * EV2i
s_prof2, t_prof2 = summN([uH2p * (H2i - EV2i), uL2p * (L2i - EV2i)], prof2)
# feller
P2_byttet = ipo_be(uL2p, uH2p, H2i, L2i)

ex_i2 = {
    "n": 1, "title": "Security issues", "points": 20, "topic": "Initial public offerings",
    "chapters": [14],
    "merke": "Samme form som IPO-eksemplet i forelesning 07, med etterspørselen oppgitt i aksjer",
    "body": (
        "<p>A Norwegian bank arranges a series of IPOs of small firms. Each IPO sells 2 million new shares. "
        "A firm is good or bad with equal probability. Its shares are worth NOK 124 (good) or NOK 72 (bad) "
        "at the end of the first trading day. Informed investors know each firm's type: together they "
        "order 1.5 million shares in every good IPO and none in bad ones. Uninformed investors cannot tell "
        "the types apart and together order 2.5 million shares in every IPO. All IPOs have the same price "
        "and oversubscribed IPOs are allocated pro rata. Everyone is risk neutral. Use 4 decimal places.</p>"
    ),
    "parts": [
        del_("a", 3,
             "<p>How many times is a good and a bad IPO oversubscribed? What fraction of an uninformed order is "
             "filled in each?</p>",
             f"<p><b>Good IPO.</b> Demand = 2.5 + 1.5 = 4 million against 2 million shares: <b>{N(kH2)}</b> times "
             f"oversubscribed, so each order is filled 2/4 = <b>{P(fH2, 0)}</b>.</p>"
             f"<p><b>Bad IPO.</b> Only the uninformed bid: 2.5/2 = <b>{N(kL2)}</b> times oversubscribed, filled "
             f"2/2.5 = <b>{P(fL2, 0)}</b>.</p>",
             ["Good IPOs: demand 4 million, 2 times oversubscribed, fill rate 50%.",
              "Bad IPOs: demand 2.5 million (the informed stay away), 1.25 times oversubscribed, fill rate 80%.",
              "Leaving the informed demand out of the good IPOs gives the same fill rate in both and loses the points."]),
        del_("b", 4,
             "<p>Every IPO is priced at the expected value of a share. What is the uninformed investors' average "
             "return on the shares they receive? (If you could not solve (a), use fill rates of 40% and 75%.)</p>",
             f"<p>Expected value: 0.5 × 124 + 0.5 × 72 = NOK {N(EV2i)}.</p>"
             f"<p>Per pair of one good and one bad IPO the uninformed receive 0.5 × 2.5 = {N(uH2p)} million good "
             f"shares and 0.8 × 2.5 = {N(uL2p)} million bad shares.</p>"
             f"<p>Profit = {N(uH2p)} × (124 − 98) + {N(uL2p)} × (72 − 98) = {s_prof2} = {t_prof2} (NOK million)<br>"
             f"Invested = {N(uH2p + uL2p)} × 98 = {N(inv2)}</p>"
             f"<p>Return = {N(prof2)}/{N(inv2)} = <b>{PP(r2_EV)}</b></p>"
             f"<p>With the fallback fill rates (40% and 75%): {PP(r2_fb)}.</p>",
             [f"Price = expected value NOK {N(EV2i)}.",
              f"Weights by the shares actually received ({N(uH2p)} and {N(uL2p)} million per pair): return {PP(r2_EV)}.",
              f"Full marks with the fallback fill rates: {PP(r2_fb)}.",
              "Show the calculation."]),
        del_("c", 4,
             "<p>The bank wants every IPO to be fully subscribed. What is the highest price at which this "
             "happens?</p>",
             "<p>The informed investors order only 1.5 million shares and only in good IPOs, so every IPO needs "
             "the uninformed. They take part only if they at least break even, which pins down the price P:</p>"
             f"<p>{N(uH2p)} × (124 − P) + {N(uL2p)} × (72 − P) = 0<br>"
             f"{N(uH2p * H2i)} + {N(uL2p * L2i)} = {N(uH2p + uL2p)}P<br>"
             f"P = {N(uH2p * H2i + uL2p * L2i)}/{N(uH2p + uL2p)} = <b>NOK {N(P2)}</b></p>"
             "<p>At any higher price the uninformed stay away: bad IPOs get no orders and good IPOs only 1.5 of "
             "the 2 million shares.</p>"
             f"<p>With the fallback fill rates: P = (1 × 124 + 1.875 × 72)/2.875 = {F(P2_alt)}.</p>",
             ["Sees that full subscription needs the uninformed, because informed demand is too small and absent from bad IPOs.",
              f"Sets the uninformed break-even condition with their allocations: P = {N(uH2p * H2i + uL2p * L2i)}/{N(uH2p + uL2p)} = NOK {N(P2)}.",
              f"Full marks with the fallback fill rates: NOK {F(P2_alt)}.",
              f"Swapping the fill rates gives NOK {N(P2_byttet)}, above the expected value: a sign that something is wrong."]),
        del_("d", 5,
             "<p>Suppose every IPO is priced as in (c). How much do the original owners leave on the table in a "
             "good and in a bad IPO (the first-day value of the shares sold minus the proceeds)? What is the "
             "average per IPO? What is the average first-day return? (If you could not solve (c), use NOK "
             "90.)</p>",
             f"<p>Good IPO: 2 × (124 − 92) = <b>NOK {N(lt_g)} million</b>. The buyers gain what the owners give up.</p>"
             f"<p>Bad IPO: 2 × (72 − 92) = <b>{N(lt_b)}</b>: the owners of a bad firm receive NOK {N(-lt_b)} million "
             "more than their shares are worth.</p>"
             f"<p>Average per IPO: 0.5 × {N(lt_g)} + 0.5 × ({N(lt_b)}) = <b>NOK {N(lt_avg)} million</b> (also "
             f"2 × (98 − 92) = {N(lt_avg)}).</p><p>Average first-day return = 98/92 − 1 = <b>{PP(avg2)}</b>.</p>"
             f"<p>With the fallback NOK 90: {N(lt_gfb)}, {N(lt_bfb)}, average {N(lt_avgfb)} and {PP(avg2fb)}.</p>",
             [f"Good IPO: 2 × (124 − 92) = {N(lt_g)}, so NOK {N(lt_g)} million is left on the table.",
              f"Bad IPO: {N(lt_b)}, a gain of NOK {N(-lt_b)} million for the owners. Either sign is accepted if it is explained.",
              f"Average NOK {N(lt_avg)} million per IPO = 2 × (98 − 92); average first-day return {PP(avg2)}.",
              f"Full marks with the fallback NOK 90: {N(lt_gfb)}, {N(lt_bfb)}, {N(lt_avgfb)} and {PP(avg2fb)}."]),
        del_("e", 4,
             "<p>Why can the bank not price every IPO at the expected value and sell only to the informed "
             "investors? Who bears the cost of the underpricing? Who gains? Explain briefly.</p>",
             "<p>The informed investors want only 1.5 million shares and only in good IPOs. The bank cannot "
             "tell the firms apart, so it needs the uninformed to fill every issue. The uninformed know they "
             "will be rationed in the good IPOs and filled in the bad ones, so they take part only at a price "
             "below the expected value, where they just break even.</p>"
             f"<p>The cost falls on the issuing firms' original owners, who sell for NOK {N(lt_avg)} million less "
             "than the shares are worth on average. The informed investors gain: they buy good IPOs at 92 and "
             "own shares worth 124. The uninformed only break even.</p>",
             ["2 points: informed demand is too small and absent from bad IPOs, so the uninformed are needed. They take part only at their break-even price below the expected value (the winner's curse).",
              "1 point: the cost falls on the original owners (money left on the table).",
              "1 point: the informed investors gain; the uninformed break even.",
              "2 to 4 sentences are enough."]),
    ],
}
UT["mk-ipo-2"] = ex_i2
svar("mk-ipo-2:1:a", "tall", [
    tall("Oversubscription, good IPO", kH2, "", feller=[kL2]),
    tall("Oversubscription, bad IPO", kL2, "", feller=[kH2]),
    tall("Fill rate, good IPO", 100 * fH2, "%", feller=[100 * fL2]),
    tall("Fill rate, bad IPO", 100 * fL2, "%", feller=[100 * fH2, 100.0]),
])
svar("mk-ipo-2:1:b", "tall", [
    tall("Uninformed return", 100 * r2_EV, "%", alt=[100 * r2_fb]),
], merknad=f"alt ({PP(r2_fb)}) er svaret med reservefyllingsgradene 40 % og 75 %.")
svar("mk-ipo-2:1:c", "tall", [
    tall("Price", P2, "NOK", feller=[EV2i, P2_byttet], alt=[P2_alt]),
], merknad=f"alt ({F(P2_alt)}) er svaret med reservefyllingsgradene.")
svar("mk-ipo-2:1:d", "tall", [
    tall("Left on the table, good IPO", lt_g, "NOK m", alt=[lt_gfb]),
    tall("Left on the table, bad IPO", lt_b, "NOK m", alt=[-lt_b, lt_bfb, -lt_bfb]),
    tall("Average per IPO", lt_avg, "NOK m", alt=[lt_avgfb]),
    tall("Average first-day return", 100 * avg2, "%", alt=[100 * avg2fb]),
], merknad="Begge fortegn godtas for den dårlige IPO-en (forklaringen rettes av teksten). alt inneholder også "
           "svarene med reserveprisen 90.")
svar("mk-ipo-2:1:e", "tekst")

# ------------------------------------------------ mk-ipo-3: sannsynligheter som ikke er 50/50 ($)
H3i, L3i, q3i = 30.0, 18.0, 0.75
ord3, nIPO3, fH3, fL3 = 100.0, 100, 0.10, 0.60
EV3i = q3i * H3i + (1 - q3i) * L3i
sH3, sL3 = q3i * nIPO3 * fH3 * ord3, (1 - q3i) * nIPO3 * fL3 * ord3
assert near(sH3, 750) and near(sL3, 1500) and near(EV3i, 27)
andel3 = sL3 / (sH3 + sL3)
prof3 = sH3 * (H3i - EV3i) + sL3 * (L3i - EV3i)
inv3 = (sH3 + sL3) * EV3i
r3_EV = prof3 / inv3
P3 = ipo_be(sH3, sL3, H3i, L3i)
assert near(P3, 22)
avg3, inf3 = EV3i / P3 - 1, H3i / P3 - 1
# halen: færre gode aksjer (5 %) gir lavere pris
P3_hale = ipo_be(sH3 / 2, sL3, H3i, L3i)
assert P3_hale < P3
# reserveverdier: (b) 800 og 1 200 aksjer
sH3fb, sL3fb = 800.0, 1200.0
andel3fb = sL3fb / (sH3fb + sL3fb)
prof3fb = sH3fb * (H3i - EV3i) + sL3fb * (L3i - EV3i)
r3fb = prof3fb / ((sH3fb + sL3fb) * EV3i)
P3fb = ipo_be(sH3fb, sL3fb, H3i, L3i)
avg3fb, inf3fb = EV3i / P3fb - 1, H3i / P3fb - 1
s_prof3, t_prof3 = summN([sH3 * (H3i - EV3i), sL3 * (L3i - EV3i)], prof3)
# feller
P3_utenq = ipo_be(fH3, fL3, H3i, L3i)
P3_5050 = ipo_be(0.5 * fH3, 0.5 * fL3, H3i, L3i)
avg3_5050 = (0.5 * H3i + 0.5 * L3i) / P3 - 1
andel3_utenq = fL3 / (fH3 + fL3)

ex_i3 = {
    "n": 1, "title": "Security issues", "points": 20, "topic": "Initial public offerings",
    "chapters": [14],
    "merke": "Samme form som IPO-eksemplet i forelesning 07, med sannsynligheter som ikke er 50/50",
    "body": (
        "<p>You plan to take part in the IPOs of 100 US biotech firms next year and order 100 shares in each. "
        "Each firm is good with probability 75% and bad with probability 25%, independently of the others. A "
        "good firm's shares are worth $30 at the end of the first trading day, a bad firm's $18. Informed "
        "investors bid only in good IPOs, so you receive 10% of the shares you order in a good IPO and 60% "
        "in a bad one. All IPOs have the same price. Everyone is risk neutral. Use 4 decimal places.</p>"
    ),
    "parts": [
        del_("a", 3,
             "<p>How many shares do you expect to receive in total in good IPOs and in bad IPOs?</p>",
             f"<p>Good IPOs: 0.75 × 100 = 75 IPOs × 10 shares = <b>{N(sH3)}</b> shares.<br>"
             f"Bad IPOs: 0.25 × 100 = 25 IPOs × 60 shares = <b>{N(sL3)}</b> shares.</p>",
             [f"75 good IPOs × 10 shares = {N(sH3)}; 25 bad IPOs × 60 shares = {N(sL3)}.",
              "Using 50 IPOs of each kind ignores the probabilities and loses the points."]),
        del_("b", 4,
             "<p>What fraction of the shares you receive is in bad IPOs? Compare it with the fraction of IPOs "
             "that are bad and explain the difference in one sentence. (If you could not solve (a), use 800 "
             "shares in good IPOs and 1,200 in bad IPOs here and below.)</p>",
             f"<p>Fraction in bad IPOs = {N(sL3)}/({N(sH3)} + {N(sL3)}) = {N(sL3)}/{N(sH3 + sL3)} = "
             f"<b>{PP(andel3)}</b>, against only 25% of the IPOs.</p>"
             "<p>You are rationed hard in good IPOs, where the informed investors crowd in. In bad IPOs you bid "
             "almost alone and are largely filled. Getting a large allocation is itself bad news.</p>"
             f"<p>With the fallback numbers: 1,200/2,000 = {PP(andel3fb)}.</p>",
             [f"Fraction {N(sL3)}/{N(sH3 + sL3)} = {PP(andel3)} of your shares are in bad IPOs, against 25% of the IPOs.",
              "One sentence on why: rationing in good IPOs (informed demand) and full allocation in bad ones.",
              f"Full marks with the fallback numbers: {PP(andel3fb)}."]),
        del_("c", 4,
             "<p>Every IPO is priced at the expected value of a share. What is your total expected profit? What "
             "is your return on the money you invest?</p>",
             f"<p>Expected value: 0.75 × 30 + 0.25 × 18 = ${N(EV3i)}.</p>"
             f"<p>Profit = {N(sH3)} × (30 − 27) + {N(sL3)} × (18 − 27) = {s_prof3} = <b>{USD(prof3)}</b><br>"
             f"Invested = {N(sH3 + sL3)} × 27 = {USD(inv3)}</p>"
             f"<p>Return = {N(prof3)}/{N(inv3)} = <b>{PP(r3_EV)}</b></p>"
             f"<p>With the fallback numbers: profit {USD(prof3fb)} and return {PP(r3fb)}.</p>",
             [f"Price = expected value 0.75 × 30 + 0.25 × 18 = ${N(EV3i)}, not the 50/50 average of $24.",
              f"Profit = {N(sH3)} × 3 − {N(sL3)} × 9 = {USD(prof3)}; return {PP(r3_EV)}.",
              f"Full marks with the fallback numbers: {USD(prof3fb)} and {PP(r3fb)}."]),
        del_("d", 5,
             "<p>At what price do you just break even? At that price, what is the average first-day return "
             "across IPOs? What return do the informed investors earn?</p>",
             f"<p><b>Step 1. Break-even.</b> {N(sH3)} × (30 − P) + {N(sL3)} × (18 − P) = 0, so<br>"
             f"P = ({N(sH3 * H3i)} + {N(sL3 * L3i)})/{N(sH3 + sL3)} = <b>${N(P3)}</b></p>"
             "<p>Equivalently, P is the value weighted by your shares: "
             f"{PP(1 - andel3)} × 30 + {PP(andel3)} × 18 = {N(P3)}.</p>"
             f"<p><b>Step 2. Returns.</b> Average first-day return = 0.75 × (30/22 − 1) + 0.25 × (18/22 − 1) = "
             f"27/22 − 1 = <b>{PP(avg3)}</b>. Informed investors: 30/22 − 1 = <b>{PP(inf3)}</b>.</p>"
             f"<p>With the fallback numbers: P = (800 × 30 + 1,200 × 18)/2,000 = {N(P3fb)}, average "
             f"{PP(avg3fb)} and informed {PP(inf3fb)}.</p>",
             [f"Break-even price ${N(P3)}, from the shares actually received. Ignoring the probabilities gives ${F(P3_utenq)}.",
              f"Average first-day return with the true probabilities 0.75 and 0.25: {PP(avg3)}. Using 50/50 gives {PP(avg3_5050)}.",
              f"Informed investors {PP(inf3)}.",
              f"Full marks with the fallback numbers: ${N(P3fb)}, {PP(avg3fb)} and {PP(inf3fb)}.",
              "Show the calculation."]),
        del_("e", 4,
             "<p>More investors become informed. You now receive only 5% of your order in good IPOs (still "
             "60% in bad ones). Does your break-even price rise or fall? Who loses from the change and who "
             "gains? Explain briefly, without new calculations.</p>",
             "<p><b>It falls.</b> With fewer good shares and as many bad ones, an even larger part of your "
             "shares is in bad IPOs, so you need a bigger discount to break even.</p>"
             "<p>The issuing firms' original owners lose: to keep the uninformed in the market they must sell "
             "at a lower price and leave more money on the table. The informed investors gain, because they "
             "buy good IPOs at the lower price. You still break even.</p>"
             f"<p>For illustration (not required): {N(sH3 / 2)} good and {N(sL3)} bad shares give P = "
             f"{N(P3_hale)}.</p>",
             ["2 points: the price falls, because the winner's curse gets worse (more of your shares in bad IPOs).",
              "1 point: the original owners lose (more underpricing, more money left on the table).",
              "1 point: the informed investors gain; the uninformed still only break even.",
              "No calculation is needed."]),
    ],
}
UT["mk-ipo-3"] = ex_i3
svar("mk-ipo-3:1:a", "tall", [
    tall("Shares received, good IPOs", sH3, "", feller=[0.5 * nIPO3 * fH3 * ord3]),
    tall("Shares received, bad IPOs", sL3, "", feller=[0.5 * nIPO3 * fL3 * ord3]),
])
svar("mk-ipo-3:1:b", "blandet", [
    tall("Fraction of your shares in bad IPOs", 100 * andel3, "%", feller=[25.0, 100 * andel3_utenq],
         alt=[100 * andel3fb]),
], tallPoeng=2, tekstLedd="Compare with the fraction of IPOs that are bad and explain the difference.",
    merknad=f"alt ({PP(andel3fb)}) er svaret med reservetallene 800 og 1 200.")
svar("mk-ipo-3:1:c", "tall", [
    tall("Total expected profit", prof3, "$", alt=[prof3fb]),
    tall("Return", 100 * r3_EV, "%", alt=[100 * r3fb]),
], merknad="alt er svarene med reservetallene 800 og 1 200.")
svar("mk-ipo-3:1:d", "tall", [
    tall("Break-even price", P3, "$", feller=[EV3i, P3_utenq, P3_5050], alt=[P3fb]),
    tall("Average first-day return", 100 * avg3, "%", feller=[100 * avg3_5050], alt=[100 * avg3fb]),
    tall("Informed investors' return", 100 * inf3, "%", alt=[100 * inf3fb]),
], merknad="alt er svarene med reservetallene 800 og 1 200.")
svar("mk-ipo-3:1:e", "tekst")
assert len({round(x, 4) for x in (X1, P2, P3)}) == 3 and len({round(x, 4) for x in (r1_EV, r2_EV, r3_EV)}) == 3


# ============================================================ kontroller
def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")


def tall_i(tekst):
    t = re.sub(r"[−–]", "-", ren(tekst))
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = m.group(0).replace(",", "")
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
for sid, ex in UT.items():
    assert ex["n"] == 1 and ex["points"] == 20
    assert 4 <= len(ex["parts"]) <= 7
    assert sum(p["points"] for p in ex["parts"]) == ex["points"], sid
    assert ex["parts"][0]["points"] <= 3                       # del a er lett
    assert 3 <= ex["parts"][-1]["points"] <= 5                 # verbal hale
    assert SVAR[f"{sid}:1:{ex['parts'][-1]['label']}"]["type"] == "tekst"
    for t in tekster(ex):
        r = ren(t)
        if "—" in r:
            feil.append(f"{sid} tankestrek: {r[:80]}")
        m = re.search(r",\s+and\b", r)
        if m:
            feil.append(f"{sid} komma før and: {r[max(0, m.start() - 50):][:90]}")
        m = re.search(r",\s+og\b", r)
        if m:
            feil.append(f"{sid} komma før og: {r[max(0, m.start() - 50):][:90]}")
        if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
            feil.append(f"{sid} pronomen om Kurbatov")
        if re.search(r"\b(he|his|him|she|her)\b", r) and "lecturer" in r:
            feil.append(f"{sid} mulig pronomen om foreleseren: {r[:80]}")
        if re.search(r"(?<![\w(/])-\d", r):
            feil.append(f"{sid} bindestrek som minus: {r[:80]}")
    for c in (c for p in ex["parts"] for c in p["criteria"]):
        if "<" in c:
            feil.append(f"{sid} markup i criteria: {c[:60]}")
    for p in ex["parts"]:
        key = f"{sid}:1:{p['label']}"
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
    # et senere ledd skal ikke røpe et tidligere svar: ingen svar-tall i senere deloppgavetekster
    tidligere = []
    for p in ex["parts"]:
        bt = tall_i(p["body"])
        for (lab, t) in tidligere:
            if abs(t["verdi"]) > 1.5 and any(innenfor(n, t["verdi"], t) for n in bt):
                feil.append(f"{sid}:{p['label']} røper {lab} {t['navn']}")
        tidligere += [(p["label"], t) for t in SVAR[f"{sid}:1:{p['label']}"].get("tall", [])]
    ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex["parts"])).split())
    print(f"{sid}: {ord_} ord, {ex['points']} p ({ord_ / ex['points']:.1f} ord per poeng), "
          f"deler {[p['points'] for p in ex['parts']]}")

assert set(SVAR) == {f"{s}:1:{p['label']}" for s, ex in UT.items() for p in ex["parts"]}

# De tre oppgavene skal være ulike: ingen felles hovedtall (NPV/verdi, r_wacc, r_U)
hoved = [(NPV1, w1, rU1), (VL2, w2, rU2), (NPV3, w3, rU3)]
for i in range(3):
    for j in range(i + 1, 3):
        for a, b in zip(hoved[i], hoved[j]):
            assert not near(a, b, 1e-3), (i, j, a, b)

if feil:
    for f_ in feil:
        print("FEIL", f_)
    raise SystemExit("skriver ingenting")

json.dump(UT, open(os.path.join(HER, "w1.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(os.path.join(HER, "w1_svar.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Oversikt over hovedtallene (til søk etter gjenbruk og til rapporten)
print(f"E1: d {d1} w {w1:.6f} rU {rU1:.6f} FCF {F0_1} {FCF1} PV {PV1:.4f} NPV {NPV1:.4f} "
      f"D {[round(x, 4) for x in Dc1]} VU {VU1:.4f} PVTS {PVTS1:.4f}")
print(f"E2: bU {bU_c1:.4f} {bU_c2:.4f} rU {rU2:.6f} rE {rE2:.6f} w {w2:.6f} VL {VL2:.4f} "
      f"D0 {D2_0:.4f} D1 {D2_1:.4f} TS1 {TS2_1:.4f} PVTS {PVTS2:.4f} VU {VU2:.4f}")
print(f"E3: rE {rE3:.6f} w {w3:.6f} rU {rU3:.6f} FCF {F0_3} {FCF3} PV {PV3:.4f} NPV {NPV3:.4f} "
      f"D0 {D3_0:.4f} D1 {D3_1:.4f} adj {adj3:.4f} VU {VU3:.4f} PVTS {PVTS3:.4f} fall {fall3:.4f}")
print("skrev w1.json og w1_svar.json:", len(SVAR), "svar-oppføringer")
