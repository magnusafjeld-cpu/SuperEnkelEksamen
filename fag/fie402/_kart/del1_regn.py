#!/usr/bin/env python3
"""FIE402 kartlegging del 1: regner ut hvert tall i del1.js.

For hvert tallledd regnes riktig svar og hvert feilsvar fra sin navngitte feil.
Skriptet laster del1.js via node og assert-er at alternativene, fasiten og
rekkefolgen stemmer. Verbale ledd sjekkes bare for fasitposisjon og diag-lengde.

Kjor:  python3 fag/fie402/_kart/del1_regn.py
"""
import json
import math
import os
import subprocess

HER = os.path.dirname(os.path.abspath(__file__))
MINUS = "−"


def pct(x, d=2):
    """0.0880 -> '8.80%' (minus som U+2212)."""
    s = f"{x * 100:.{d}f}%"
    return s.replace("-", MINUS)


def num(x, d=2):
    x = x + math.copysign(1e-9, x)                   # runder 64.615 opp, ikke ned
    s = f"{x:,.{d}f}".replace(",", "")
    return s.replace("-", MINUS)


def beta(x):
    return f"{x:.4f}"


E = {}  # (oppgave, ledd) -> dict(options=[...], answer=i, values=[...])


def tall(key, verdier, riktig, fmt):
    """verdier: liste av (verdi, er_riktig). Sorteres stigende, formateres."""
    vs = sorted(verdier)
    assert riktig in vs
    opts = [fmt(v) for v in vs]
    assert len(set(opts)) == 4, (key, opts)
    E[key] = dict(options=opts, answer=vs.index(riktig), values=vs)


def verbal(key, answer):
    E[key] = dict(options=None, answer=answer)


# ---------------------------------------------------------------- 1 tid
# a) voksende annuitet: forste betaling 2.4 i ar 1, vekst 3%, 15 ar, r = 8%
C, g, r, T = 2.4, 0.03, 0.08, 15
riktig = C / (r - g) * (1 - ((1 + g) / (1 + r)) ** T)
evig = C / (r - g)                                   # glemte at strommen stopper
flat = C * (1 - (1 + r) ** -T) / r                   # ignorerte veksten
hale = C / (r - g) * (1 - (1 + r) ** -T)             # halen uten (1+g)^T
tall((1, "a"), [riktig, evig, flat, hale], riktig, lambda v: num(v))
assert abs(riktig - 24.43) < 0.005

# b) forsinket start: investering 40 i dag, CF 5.0 fra ar 3, vekst 2%, r = 9%
I, C, g, r = 40.0, 5.0, 0.02, 0.09
P2 = C / (r - g)                                     # verdi pa dato 2
riktig = P2 / (1 + r) ** 2 - I
udisk = P2 - I                                       # glemte a diskontere verdien pa dato 2
en = P2 / (1 + r) - I                                # diskonterte en periode
rg = P2 / (1 + r - g) ** 2 - I                       # diskonterte med r - g
tall((1, "b"), [riktig, udisk, en, rg], riktig, lambda v: num(v))

# ---------------------------------------------------------------- 2 fcf
EBIT, tau, Dep, Capex = 120.0, 0.22, 40.0, 55.0
S0, S1, nwc, rente = 750.0, 800.0, 0.15, 18.0
dNWC = nwc * (S1 - S0)
riktig = EBIT * (1 - tau) + Dep - Capex - dNWC
med_rente = (EBIT - rente) * (1 - tau) + Dep - Capex - dNWC   # trakk fra renter etter skatt
ebitda_skatt = (EBIT + Dep) * (1 - tau) - Capex - dNWC         # skattla EBITDA (dep ikke fradrag)
uten_dep = EBIT * (1 - tau) - Capex - dNWC                     # glemte a legge til dep
tall((2, "a"), [riktig, med_rente, ebitda_skatt, uten_dep], riktig, lambda v: num(v))
assert abs(riktig - 71.10) < 1e-9 and abs(med_rente - riktig + rente * (1 - tau)) < 1e-9

verbal((2, "b"), 0)

F5, g, rw = 90.0, 0.03, 0.085
TV5 = F5 * (1 + g) / (rw - g)
riktig = TV5 / (1 + rw) ** 5
ikke_vekst = F5 / (rw - g) / (1 + rw) ** 5          # brukte FCF5 i stedet for FCF6
seks = TV5 / (1 + rw) ** 6                           # diskonterte seks ar
uten_g = F5 * (1 + g) / rw / (1 + rw) ** 5           # r i stedet for r - g i nevneren
tall((2, "c"), [riktig, ikke_vekst, seks, uten_g], riktig, lambda v: num(v))
assert abs(TV5 - 1685.4545) < 1e-3

# ---------------------------------------------------------------- 3 capm
rf, Rm = 0.03, 0.09
corr, si, sm = 0.60, 0.36, 0.16
b = corr * si / sm
riktig = rf + b * (Rm - rf)
uten_rf = b * (Rm - rf)                              # glemte rf
Rm_som_premie = rf + b * Rm                          # brukte E[Rm] som premie
total = rf + (si / sm) * (Rm - rf)                   # total risiko i stedet for beta
tall((3, "a"), [riktig, uten_rf, Rm_som_premie, total], riktig, lambda v: pct(v))
assert abs(b - 1.35) < 1e-12 and abs(riktig - 0.111) < 1e-12

bX, bY = 0.70, 1.30
assert abs(0.5 * bX + 0.5 * bY - 1.00) < 1e-12
verbal((3, "b"), 3)

# ---------------------------------------------------------------- 4 tvilling
rf, Rm = 0.03, 0.08
mrp = Rm - rf
rE_t, DE_t, bD_t = 0.115, 0.50, 0.35
DE_o, bD_o, tau = 0.80, 0.45, 0.22

bE_t = (rE_t - rf) / mrp
tall((4, "a"), [bE_t, (rE_t - rf) / Rm, rE_t / Rm, rE_t / mrp], bE_t, beta)
assert abs(bE_t - 1.70) < 1e-12

EV, DV = 1 / (1 + DE_t), DE_t / (1 + DE_t)
bEh = 1.60                                        # hypotetisk, ikke svaret pa 4a
bU = EV * bEh + DV * bD_t
bU_bd0 = EV * bEh
bU_skatt = (bEh + DE_t * (1 - tau) * bD_t) / (1 + DE_t * (1 - tau))
bU_DE = (1 - DE_t) * bEh + DE_t * bD_t
tall((4, "b"), [bU, bU_bd0, bU_skatt, bU_DE], bU, beta)
assert abs(bU - 1.183333) < 1e-6
bU_ekte = EV * 1.70 + DV * bD_t                   # tvillingens faktiske beta_U
assert abs(bU_ekte - 1.25) < 1e-12

bUh = 1.20                                        # hypotetisk, ikke svaret pa 4b
bE_o = bUh + DE_o * (bUh - bD_o)
bE_skatt = bUh + (1 - tau) * DE_o * (bUh - bD_o)
bE_tvillingbD = bUh + DE_o * (bUh - bD_t)
bE_bd0 = bUh * (1 + DE_o)
tall((4, "c"), [bE_o, bE_skatt, bE_tvillingbD, bE_bd0], bE_o, beta)
assert abs(bE_o - 1.80) < 1e-12
bE_o_ekte = 1.25 + DE_o * (1.25 - bD_o)           # med tvillingens faktiske beta_U
assert abs(bE_o_ekte - 1.89) < 1e-12

rU = rf + 1.25 * mrp
rD = rf + bD_o * mrp
assert abs(rU - 0.0925) < 1e-12 and abs(rD - 0.0525) < 1e-12
rE = rU + DE_o * (rU - rD)
DV_o = DE_o / (1 + DE_o)
rE_DV = rU + DV_o * (rU - rD)
rE_skatt = rU + DE_o * (1 - tau) * (rU - rD)
tall((4, "d"), [rE, rU, rE_DV, rE_skatt], rE, lambda v: pct(v))
assert abs(rE - (rf + bE_o_ekte * mrp)) < 1e-12       # MM II = CAPM pa relevert beta

# e) retning: bD = 0 for tvillingen
bU_feil = EV * 1.70
rU_feil = rf + bU_feil * mrp
assert bU_feil < 1.25 and rU_feil < rU
assert abs(bU_feil - 1.1333) < 5e-5 and abs(rU_feil - 0.086667) < 5e-7
dv_o = DV_o
rw_rett = rU - dv_o * tau * rD
rw_feil = rU_feil - dv_o * tau * rD
assert rw_feil < rw_rett                          # lavere WACC, hoyere verdi
bE_o_feil = bU_feil + DE_o * (bU_feil - bD_o)     # om egen bD beholdes
assert bE_o_feil < bE_o_ekte                      # r_E blir ogsa lavere, ikke hoyere
verbal((4, "e"), 0)

# ---------------------------------------------------------------- 5 gjeld
rf, mrp = 0.032, 0.05
F, P, n = 1000.0, 807.21, 3
y = (F / P) ** (1 / n) - 1
enkel = (F / P - 1) / n
logr = math.log(F / P) / n
rabatt = (1 - P / F) / n
assert abs(y - 0.0740) < 5e-5
par = sorted([(y, True), (enkel, False), (logr, False), (rabatt, False)])
opts = [f"y = {pct(v)}, spread = {pct(v - rf)}" for v, _ in par]
E[(5, "a")] = dict(options=opts, answer=[k for k, (_, ok) in enumerate(par) if ok][0])

y, p, R = 0.069, 0.03, 0.35                       # en annen obligasjon enn i 5a
L = 1 - R
rD = y - p * L
tall((5, "b"), [rD, y - p, y - p * R, y], rD, lambda v: pct(v))
assert abs(rD - 0.0495) < 1e-12

rD, y = 0.0595, 0.071                              # hypotetisk, ikke svarene i 5a/5b
bD = (rD - rf) / mrp
tall((5, "c"), [bD, rD / (rf + mrp), (y - rf) / mrp, rD / mrp], bD, beta)
assert abs(bD - 0.55) < 1e-12

# ---------------------------------------------------------------- 6 wacc
rE, rD, yH, dv, tau = 0.109, 0.05, 0.059, 0.30, 0.22
ev = 1 - dv
rw = ev * rE + dv * rD * (1 - tau)
pre = ev * rE + dv * rD
med_y = ev * rE + dv * yH * (1 - tau)
alt_skatt = pre * (1 - tau)
tall((6, "a"), [rw, pre, med_y, alt_skatt], rw, lambda v: pct(v))
assert abs(rw - 0.088) < 1e-12

F0, g, rw, rUh = 48.0, 0.025, 0.086, 0.091         # hypotetiske satser, ikke svaret pa 6a
VL = F0 * (1 + g) / (rw - g)
tall((6, "b"), [VL, F0 / (rw - g), F0 * (1 + g) / rw, F0 * (1 + g) / (rUh - g)], VL, lambda v: num(v))
assert abs(VL - 806.56) < 0.005

VLc, Dc, cash, N = 820.0, 246.0, 40.0, 20.0
assert abs(Dc - 0.30 * VLc) < 0.01
pris = (VLc - Dc + cash) / N
tall((6, "c"), [pris, (VLc - Dc) / N, (VLc - Dc - cash) / N, (VLc + cash) / N], pris, lambda v: num(v))

F1, F2, g, rw = 30.0, 34.0, 0.03, 0.084
TV2 = F2 * (1 + g) / (rw - g)
V0 = F1 / (1 + rw) + (F2 + TV2) / (1 + rw) ** 2
V0_ikkevekst = F1 / (1 + rw) + (F2 + F2 / (rw - g)) / (1 + rw) ** 2
V0_tre = F1 / (1 + rw) + F2 / (1 + rw) ** 2 + TV2 / (1 + rw) ** 3
V0_r = F1 / (1 + rw) + (F2 + F2 * (1 + g) / rw) / (1 + rw) ** 2
tall((6, "d"), [V0, V0_ikkevekst, V0_tre, V0_r], V0, lambda v: num(v))

Em, Dm, F1, rw, rEe = 630.0, 270.0, 54.0, 0.087, 0.109
V = Em + Dm
assert abs(Dm / V - 0.30) < 1e-12
g_rett = rw - F1 / V
g_E = rw - F1 / Em
g_F0 = (rw * V - F1) / (V + F1)
g_rE = rEe - F1 / V
tall((6, "e"), [g_rett, g_E, g_F0, g_rE], g_rett, lambda v: pct(v))
assert abs(g_rett - 0.027) < 1e-12

# ---------------------------------------------------------------- 7 apv
F1, g, rU, rD, tau, d = 42.0, 0.02, 0.09, 0.05, 0.25, 0.40
rw = rU - d * tau * rD
assert abs(rw - 0.085) < 1e-12
VU = F1 / (rU - g)
tall((7, "a"), [VU, F1 / rU, F1 * (1 + g) / (rU - g), F1 + VU], VU, lambda v: num(v))

VL = F1 / (rw - g)
D0 = round(d * VL, 2)
assert abs(D0 - 258.46) < 1e-9
TS1 = tau * rD * D0
pvts = TS1 / (rU - g)
tall((7, "b"), [pvts, TS1 / (rD - g), tau * D0, TS1 / rU], pvts, lambda v: num(v))
assert abs(VU + pvts - VL) < 0.01                 # forste kontroll: WACC = APV

Dp = 200.0
TSp = tau * rD * Dp
tall((7, "c"), [tau * Dp, TSp / rU, TSp / (rU - g), TSp / (rD - g)], tau * Dp, lambda v: num(v))

verbal((7, "d"), 3)

# ---------------------------------------------------------------- 8 Senja (apv e, fte a)
FCF, rU, rD, tau, d = 60.0, 0.10, 0.05, 0.25, 0.40
rE = rU + d / (1 - d) * (rU - rD)
rw = (1 - d) * rE + d * rD * (1 - tau)
assert abs(rw - (rU - d * tau * rD)) < 1e-12
VL = FCF / rw
D = d * VL
VU = FCF / rU
TS = tau * rD * D
apv = VU + TS / rU
assert abs(apv - VL) < 1e-9
assert abs(round(VL, 2) - 631.58) < 1e-9 and abs(round(D, 2) - 252.63) < 1e-9
Dg = 252.63
TSg = tau * rD * Dg
riktig = TSg / rU                                 # 8a spor na etter PV(TS)
ett_ar = TSg / (1 + rU)
med_rE = TSg / rE
med_rD = TSg / rD
assert abs(TSg / rD - tau * Dg) < 1e-9          # rD-diskontering = tau*D ved evig, flat gjeld
tall((8, "a"), [riktig, ett_ar, med_rE, med_rD], riktig, lambda v: num(v))
assert abs(VU + riktig - 631.58) < 0.005          # forste kontroll (fast punkt)

Eg = 631.58 - 252.63
FCFE = FCF - (1 - tau) * rD * Dg
Eq = FCFE / rE
dobbel = (FCFE + TSg) / rE                        # la til skjoldet i FCFE en gang til
tall((8, "b"), [Eq, FCF / rE, FCFE / rU, dobbel], Eq, lambda v: num(v))
assert abs(Eq - Eg) < 0.01                        # FTE gir samme egenkapital som WACC

# ---------------------------------------------------------------- 9 FTE gjeldsjustering
F1, F2, rU, rD, tau, d = 80.0, 90.0, 0.11, 0.06, 0.22, 0.50
rw = rU - d * tau * rD
V1 = F2 / (1 + rw)
V0 = (F1 + V1) / (1 + rw)
V0r, V1r = round(V0, 2), round(V1, 2)
assert (V0r, V1r) == (146.43, 81.57), (V0r, V1r)
D0, D1 = d * V0r, d * V1r
dD = D1 - D0
renteE = (1 - tau) * rD * D0
riktig = F1 - renteE + dD
uten_dD = F1 - renteE
feil_fortegn = F1 - renteE - dD
rente_D1 = F1 - (1 - tau) * rD * D1 + dD
full_rente = F1 - rD * D0 + dD
assert full_rente < riktig                         # derfor ikke med (vil ha riktig forst)
tall((9, "a"), [riktig, uten_dD, feil_fortegn, rente_D1], riktig, lambda v: num(v))

# kontroll: FTE med D_t = d*V_t gir E0 = V0 - D0 (fast punkt)
rE = rU + d / (1 - d) * (rU - rD)
D0x, D1x = d * V0, d * V1
FCFE1 = F1 - (1 - tau) * rD * D0x + (D1x - D0x)
FCFE2 = F2 - (1 - tau) * rD * D1x + (0 - D1x)
E0 = FCFE1 / (1 + rE) + FCFE2 / (1 + rE) ** 2
assert abs(E0 - (V0 - D0x)) < 1e-9

verbal((9, "b"), 0)

# ---------------------------------------------------------------- utskrift
for k in sorted(E):
    print(k, E[k]["answer"], E[k]["options"])

# ---------------------------------------------------------------- sjekk mot del1.js
js = os.path.join(HER, "del1.js")
if not os.path.exists(js):
    print("\n(del1.js finnes ikke enna)")
    raise SystemExit(0)
kode = (
    "global.window={};require(process.argv[1]);"
    "process.stdout.write(JSON.stringify(window.EDU_KART.del1))"
)
data = json.loads(subprocess.check_output(["node", "-e", kode, js]))

posisjoner = [0, 0, 0, 0]
antall = 0
poeng = 0
for ex in data["exercises"]:
    assert ex["points"] == sum(p["points"] for p in ex["parts"]), ex["n"]
    for p in ex["parts"]:
        key = (ex["n"], p["label"])
        assert key in E, key
        forv = E[key]
        assert len(p["options"]) == 4 and len(p["diag"]) == 4, key
        assert p["answer"] == forv["answer"], (key, p["answer"], forv["answer"])
        assert p["diag"][p["answer"]] is None, key
        assert all(x for i, x in enumerate(p["diag"]) if i != p["answer"]), key
        if forv["options"] is not None:
            assert p["options"] == forv["options"], (key, p["options"], forv["options"])
        for t in p["options"] + [p["body"], p["solution"]]:
            assert "—" not in t, key
        for t in p["diag"]:
            if t:
                assert "—" not in t and ", og" not in t, (key, t)
                assert len(t.split()) < 20, (key, t)
        posisjoner[p["answer"]] += 1
        antall += 1
        poeng += p["points"]
assert antall == len(E) == 28 and poeng == data["points"] == 28

# Lekkasje: hele delen vises pa en side. Et ledds riktige tallsvar skal ikke sta i
# noen casetekst, stamme eller alternativ i et annet ledd, og heller ikke i
# losningen til et tidligere ledd.
import re


def varianter(tekst):
    ut = {tekst}
    for m in re.finditer(r"(\d+\.\d+)(%?)", tekst):
        v = float(m.group(1))
        if m.group(2):
            ut |= {f"{v / 100:.4f}", f"{v:.2f}%"}
        else:
            ut |= {f"{v:.2f}", f"{v:.4f}"}
    return ut


ledd = [(ex, p) for ex in data["exercises"] for p in ex["parts"]]
lekk = []
for i, (ex, p) in enumerate(ledd):
    if E[(ex["n"], p["label"])]["options"] is None:
        continue
    svar = p["options"][p["answer"]]
    for v in varianter(svar):
        mønster = re.compile(r"(?<![\d.])" + re.escape(v) + r"(?![\d])")
        for j, (ex2, p2) in enumerate(ledd):
            tekster = []
            if j != i:
                tekster += [("stamme", p2["body"])] + [("alternativ", o) for o in p2["options"]]
                if j < i:
                    tekster.append(("løsning", p2["solution"]))
            for hva, t in tekster:
                if mønster.search(t):
                    lekk.append((ex["n"], p["label"], v, ex2["n"], p2["label"], hva))
    for ex2 in data["exercises"]:
        if re.search(r"(?<![\d.])" + re.escape(svar) + r"(?![\d])", ex2["body"]):
            lekk.append((ex["n"], p["label"], svar, ex2["n"], "case", "casetekst"))
for l in lekk:
    print("LEKKASJE:", l)
assert not lekk
assert sorted(E) == sorted((ex["n"], p["label"]) for ex in data["exercises"] for p in ex["parts"])
print("\nOK: alle", antall, "ledd stemmer. Fasitposisjon A/B/C/D:", posisjoner)
