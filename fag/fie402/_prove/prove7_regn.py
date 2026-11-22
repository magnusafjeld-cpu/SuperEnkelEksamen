"""Prøveeksamen 7 i FIE402 («firmaet som opsjon og informasjon»): alle tall regnes her, og
settet bygges herfra.

Kjør:  python3 -I prove7_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove7). To teorioppgaver (opsjonsintuisjon:
amerikansk mot europeisk, risikabel gjeld som risikofri gjeld minus put, volatilitet og
formuesoverføring; governance: forskansning med forskjøvet styre og kvalifisert flertall),
deretter Myers-Majluf per aksje med kursfallet ved kunngjøring og et lån med covenant-kostnad
(PS1 E9-logikken), finansiering av debt capacity med overskuddskasse og ny gjeld (L7 s17-22,
s27-29; PS2 E3-E4, E7), senior og junior gjeld fra noterte opsjoner over 15 måneder (L10
s12-15; PS3 E6 er typen, nytt firma og nye tall) og M&A med kontanter, aksjer, overpriset
kjøperaksje og budkamp (L12 s15-18, s24-26; PS4 E2-E3).

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker med assert:
- E3: begge typer mot troen i hvert ledd (troen er konsistent bare i likevekten), at nye
  investorer går i null i snitt ved samlet pris, og at ingen type vil etterligne den andre når
  lånet finnes.
- E4: APV = WACC (fastpunkt, forfatterspek § 9.2b: D_t kommer fra WACC-verdiene, så likheten
  følger algebraisk; den fanger likevel feil rente på skatteskjoldet og regnefeil) og at eiernes
  gevinst = NPV (identitet). Begge er merket som det de er i løsningen.
- E5: no-arbitrasje i kursene (fallende og konveks i strike, nedre grense, put-call-paritet),
  gjelden verdsatt med put lik gjelden verdsatt med call (ekte kontroll fra uavhengige kurser),
  rekkefølgen på rentene og fortegnet i (d) (juniorgjelden faller ved høyere volatilitet; sjekket
  med en intern Black-Scholes som aldri vises i oppgaven).
- E6: summen av NPV-ene = synergiene (identitet), NPV for A regnet to veier (fra kursen per
  aksje og fra andelen) og betalingsviljene i budkampen.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria), poengene (12/12/18/18/20/20, deloppgavene summerer, del a lett, minst én
konstruksjonsdel på 8-12 poeng) og lengden (oppgaveteksten 1 000-1 250 ord). Er alt rent,
skrives prove7.json og prove7_oppgave.md (bare oppgaveteksten) i samme mappe. Er noe galt,
skrives ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (netto gjeld i vektene, r_U som
WACC før skatt, skatteskjoldet diskontert med r_U ved konstant D/V, diskret diskontering også for
brøkdel av år, ingen BS-regning i oppgaven) følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys
from math import erf, exp, log, sqrt

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove7.json")
UT_MD = os.path.join(HER, "prove7_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    """Kortest eksakte form med høyst 3 desimaler, ellers 4 desimaler."""
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def pc(x):
    """Rente som prosent: eksakt kort form (10%, 7.14%) eller 4 desimaler (9.8869%)."""
    return g(100 * x) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vist_sum(deler, total, d, d_tot=None):
    """Avrundede mellomtall som vises med d desimaler, må summere til summen slik den vises."""
    d_tot = d if d_tot is None else d_tot
    s = sum(round(p, d) for p in deler)
    assert f"{s:.{d_tot}f}" == f"{total:.{d_tot}f}", (deler, total, s)


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:28} {v}")


# ====================================== Oppgave 3: Myers-Majluf per aksje
N3 = 40.0                     # millioner aksjer
VH, VL, pH = 1050.0, 700.0, 0.4
I3, X3, c3 = 180.0, 200.0, 10.0
NPV3 = X3 - I3
EV3 = pH * VH + (1 - pH) * VL
assert near(EV3, 840) and near(NPV3, 20)
# a) samlet pris
P_pool = (EV3 + NPV3) / N3
n_pool = I3 / P_pool
a_pool = n_pool / (N3 + n_pool)
assert near(P_pool, 21.5) and near(a_pool, I3 / (EV3 + X3))
assert near((EV3 + X3) / (N3 + n_pool), P_pool)          # prisen = verdien per aksje etter, gitt troen
feil_uten_prosjekt = EV3 / N3                              # 21.00: glemt prosjektet
# b) sann verdi per gammel aksje
sH, sL = VH / N3, VL / N3
vH_pool, vL_pool = (VH + X3) / (N3 + n_pool), (VL + X3) / (N3 + n_pool)
assert vH_pool < sH and vL_pool > sL                       # bare lav type utsteder
tapH = a_pool * (VH - EV3)
gevL = a_pool * (EV3 - VL)
assert tapH > NPV3
assert near(N3 * vH_pool, VH + NPV3 - tapH) and near(N3 * vL_pool, VL + NPV3 + gevL)  # dekomponering
assert near(pH * tapH, (1 - pH) * gevL)                    # nye investorer går i null i snitt (konstruksjon)
# c) likevekt
P_sep = (VL + NPV3) / N3
n_sep = I3 / P_sep
vL_sep, vH_sep = (VL + X3) / (N3 + n_sep), (VH + X3) / (N3 + n_sep)
assert near(P_sep, 18) and near(n_sep, 10)
assert near(vL_sep, P_sep) and vL_sep > sL and vH_sep < sH  # troen bekreftes av begge typer
P_for = pH * sH + (1 - pH) * P_sep
endr_c = P_sep / P_for - 1
endr_ikke = sH / P_for - 1
assert near(P_for, 21.3)
assert near(pH * (1 + endr_ikke) + (1 - pH) * (1 + endr_c), 1.0)   # rettferdig spill (konstruksjon)
feil_fra_pool = P_sep / P_pool - 1
tap_forv = pH * NPV3
# d) lån med covenant-kostnad
vH_lan = (VH + NPV3 - c3) / N3
vL_lan = (VL + NPV3 - c3) / N3
assert vH_lan > sH > vH_sep                                 # høy type låner
assert P_sep > vL_lan > sL                                  # lav type utsteder aksjer
P_for_d = pH * vH_lan + (1 - pH) * P_sep
endr_lan = vH_lan / P_for_d - 1
endr_emi = P_sep / P_for_d - 1
assert near(P_for_d, 21.4)
tap_forv_d = pH * c3
assert tap_forv_d < tap_forv
vis("Oppgave 3", P_pool=P_pool, n_pool=n_pool, a_pool=a_pool, vH_pool=vH_pool, vL_pool=vL_pool,
    tapH=tapH, gevL=gevL, P_sep=P_sep, n_sep=n_sep, vH_sep=vH_sep, P_for=P_for, endr_c=endr_c,
    endr_ikke=endr_ikke, feil_fra_pool=feil_fra_pool, vH_lan=vH_lan, vL_lan=vL_lan,
    P_for_d=P_for_d, endr_lan=endr_lan, endr_emi=endr_emi)

# =========================== Oppgave 4: debt capacity og finansieringen av den
E4m, Dg4, C4, Cop4 = 500.0, 820.0, 100.0, 30.0
rE4, rD4, tau4 = 0.12, 0.05, 0.22
xc4 = C4 - Cop4
D4 = Dg4 - xc4
V4 = E4m + D4
d4 = D4 / V4
assert near(xc4, 70) and near(D4, 750) and near(V4, 1250) and near(d4, 0.6)
rw4 = (1 - d4) * rE4 + d4 * (1 - tau4) * rD4
rU4 = (1 - d4) * rE4 + d4 * rD4
assert near(rw4, 0.0714) and near(rU4, 0.078)
vist_sum([(1 - d4) * rE4, d4 * (1 - tau4) * rD4], rw4, 4)
d_br = Dg4 / (E4m + Dg4)
rw_br = (1 - d_br) * rE4 + d_br * (1 - tau4) * rD4
d_alt = (Dg4 - C4) / (E4m + Dg4 - C4)
rw_alt = (1 - d_alt) * rE4 + d_alt * (1 - tau4) * rD4
I4 = 90.0
F4 = [50.0, 65.0, 70.0]
VL4 = [0.0] * 4
for t in (2, 1, 0):
    VL4[t] = (F4[t] + VL4[t + 1]) / (1 + rw4)
ledd4 = [F4[k] / (1 + rw4) ** (k + 1) for k in range(3)]
assert near(sum(ledd4), VL4[0])                            # baklengs = direkte (samme sum)
NPV4 = VL4[0] - I4
D_t = [d4 * v for v in VL4]
nedbet = [D_t[k] - D_t[k + 1] for k in range(3)]
ny_gjeld = D_t[0] - xc4
utbet = D_t[0] - I4
assert ny_gjeld > 0 and utbet > 0
EV_etter = V4 + VL4[0]
ND_etter = D4 + D_t[0]
E_etter = EV_etter - ND_etter
assert near(ND_etter, d4 * EV_etter)                       # D/V holdt konstant
dE4 = E_etter - E4m
gevinst4 = dE4 + utbet
assert near(gevinst4, NPV4)                                # identitet: gjelden er fritt priset
# e) APV
ledd_U = [F4[k] / (1 + rU4) ** (k + 1) for k in range(3)]
VU4 = sum(ledd_U)
rente4 = [rD4 * D_t[k] for k in range(3)]
TS4 = [tau4 * x for x in rente4]
ledd_TS = [TS4[k] / (1 + rU4) ** (k + 1) for k in range(3)]
PVTS4 = sum(ledd_TS)
assert near(VU4 + PVTS4, VL4[0])                           # fastpunkt (§ 9.2b), ikke to uavhengige veier
PVTS4_rD = sum(TS4[k] / (1 + rD4) ** (k + 1) for k in range(3))
assert abs(VU4 + PVTS4_rD - VL4[0]) > 0.005                # feil rente gir avvik
vis("Oppgave 4", rw=rw4, rU=rU4, rw_brutto=(d_br, rw_br), rw_allcash=(d_alt, rw_alt), ledd=ledd4,
    VL=VL4, NPV=NPV4, D_t=D_t, nedbet=nedbet, ny_gjeld=ny_gjeld, utbet=utbet, E_etter=E_etter,
    dE=dE4, ledd_U=ledd_U, VU=VU4, rente=rente4, TS=TS4, PVTS=PVTS4, PVTS_rD=PVTS4_rD)

# ========================== Oppgave 5: senior og junior gjeld fra noterte opsjoner
N5, S5, rf5, T5 = 0.4, 90.0, 0.03, 1.25    # milliarder aksjer, USD, år
V5 = N5 * S5
K_tot, K_S, K_J = 30.0, 20.0, 10.0          # USD milliarder
kT, kS = K_tot / N5, K_S / N5
assert near(V5, 36) and near(kT, 75) and near(kS, 50)
# strike: (call bid, call ask, put bid, put ask)
KURS = {
    45: (46.82, 47.02, 0.24, 0.34),
    50: (42.31, 42.51, 0.55, 0.65),
    55: (37.98, 38.18, 1.03, 1.13),
    70: (26.49, 26.69, 4.00, 4.10),
    75: (23.24, 23.44, 5.57, 5.67),
    80: (20.30, 20.50, 7.45, 7.55),
}
Cm = {k: (v[0] + v[1]) / 2 for k, v in KURS.items()}
Pm = {k: (v[2] + v[3]) / 2 for k, v in KURS.items()}
PVk = lambda K: K / (1 + rf5) ** T5
ks = sorted(KURS)
for a, b in zip(ks, ks[1:]):
    assert Cm[a] > Cm[b] and Pm[a] < Pm[b]                  # monoton i strike
for a, b, c in ((45, 50, 55), (70, 75, 80)):
    assert Cm[a] - 2 * Cm[b] + Cm[c] > 0                    # konveks
for k in ks:
    assert Cm[k] > S5 - PVk(k) and Pm[k] > 0                # nedre grense
    assert abs(Cm[k] - Pm[k] - (S5 - PVk(k))) <= 0.005      # put-call-paritet på midtkursene


def _bs_intern(S, K, T, r, s):
    """Bare for kontroll av kursene og fortegnet i (d). Vises aldri i oppgaven (ingen BS-regning)."""
    rc = log(1 + r)
    N = lambda x: 0.5 * (1 + erf(x / sqrt(2)))
    d1 = (log(S / K) + (rc + s * s / 2) * T) / (s * sqrt(T))
    return S * N(d1) - K * exp(-rc * T) * N(d1 - s * sqrt(T))


for k in ks:
    assert abs(_bs_intern(S5, k, T5, rf5, 0.35) - Cm[k]) < 0.006   # kursene henger sammen
VIS_K = [45, 50, 75, 80]                                   # radene som vises i oppgaven
hell = [(Cm[b] - Cm[a]) / (b - a) for a, b in zip(VIS_K, VIS_K[1:])]
assert all(h1 < h2 for h1, h2 in zip(hell, hell[1:]))      # de viste kursene er også konvekse
E5v = N5 * Cm[kT]
D5 = V5 - E5v
D5_put = PVk(K_tot) - N5 * Pm[kT]
assert abs(D5 - D5_put) < 0.002                            # ekte kontroll: call og put gir samme gjeld
y5 = (K_tot / D5) ** (1 / T5) - 1
spr5 = y5 - rf5
y5_feil_enkel = (K_tot / D5 - 1) / T5
y5_feil_15 = K_tot / D5 - 1
DS5 = V5 - N5 * Cm[kS]
DS5_put = PVk(K_S) - N5 * Pm[kS]
assert abs(DS5 - DS5_put) < 0.002                          # samme kontroll for senior
DJ5 = V5 - DS5 - E5v
assert near(DJ5, N5 * (Cm[kS] - Cm[kT]))
assert near(DS5 + DJ5, D5)                                 # identitet: egenkapitalen er samme call
assert abs(N5 * (PVk(K_J / N5) - (Pm[kT] - Pm[kS])) - DJ5) < 0.002   # junior = obligasjon − put-spread
yS5 = (K_S / DS5) ** (1 / T5) - 1
yJ5 = (K_J / DJ5) ** (1 / T5) - 1
y5_put = (K_tot / D5_put) ** (1 / T5) - 1                  # put-veien godtas i b)
DJ5_put = D5_put - DS5_put                                 # put-veien hele veien i c)
assert near(DJ5_put, N5 * (PVk(K_J / N5) - (Pm[kT] - Pm[kS])))
yJ5_put = (K_J / DJ5_put) ** (1 / T5) - 1
DJ5_lav, DJ5_hoy = 7.628, 7.630                            # godtatt intervall (call- og put-veien)
yJ5_lav, yJ5_hoy = 0.2417, 0.2419
assert DJ5_lav - 1e-9 <= min(DJ5, DJ5_put) and max(DJ5, DJ5_put) <= DJ5_hoy + 1e-9
assert yJ5_lav - 1e-4 <= min(yJ5, yJ5_put) and max(yJ5, yJ5_put) <= yJ5_hoy + 1e-4
assert rf5 < yS5 < y5 < yJ5
assert DS5 < PVk(K_S) and DJ5 < PVk(K_J)
# fortegn i (d): høyere volatilitet, samme V
cS_l, cT_l = _bs_intern(S5, kS, T5, rf5, 0.35), _bs_intern(S5, kT, T5, rf5, 0.35)
cS_h, cT_h = _bs_intern(S5, kS, T5, rf5, 0.45), _bs_intern(S5, kT, T5, rf5, 0.45)
assert cT_h > cT_l                                         # egenkapital opp
assert V5 - N5 * cS_h < V5 - N5 * cS_l                     # senior ned
assert N5 * (cS_h - cT_h) < N5 * (cS_l - cT_l)             # junior ned her
vis("Oppgave 5", Cm=(Cm[kS], Cm[kT]), Pm=(Pm[kS], Pm[kT]), E=E5v, D=D5, D_put=D5_put,
    PV30=PVk(K_tot), y=y5, spread=spr5, y_feil=(y5_feil_enkel, y5_feil_15), DS=DS5, DS_put=DS5_put,
    PV20=PVk(K_S), DJ=DJ5, yS=yS5, yJ=yJ5, juniorendring=N5 * ((cS_h - cT_h) - (cS_l - cT_l)))

# ============================== Oppgave 6: kontanter, aksjer og budkamp
NA, PA, NT, PT, S6 = 60.0, 75.0, 25.0, 36.0, 300.0
A6, T6 = NA * PA, NT * PT
assert near(A6, 4500) and near(T6, 900)
pris_c = 46.0
P6 = NT * pris_c
NPVA_c = S6 - (P6 - T6)
NPVT_c = P6 - T6
assert near(NPVA_c, 50) and near(NPVT_c, 250) and near(NPVA_c + NPVT_c, S6)
PA_c = (A6 + NPVA_c) / NA
ER6 = 0.6
X6 = ER6 * NT
y6 = X6 / (NA + X6)
VAB = A6 + T6 + S6
NPVA_s = (1 - y6) * VAB - A6
NPVT_s = y6 * VAB - T6
assert near(y6, 0.2) and near(NPVA_s, 60) and near(NPVT_s, 240) and near(NPVA_s + NPVT_s, S6)
P_ny = VAB / (NA + X6)
assert near(NA * (P_ny - PA), NPVA_s)                      # to veier til NPV_A
per_T_s = ER6 * P_ny
assert per_T_s < pris_c                                   # kontant er bedre for Lundar
ER_maks = (PT / PA) * (1 + S6 / T6)
assert near(ER_maks, 0.64)
# c) Vestby mener egen aksje er verdt 66
PA_s = 66.0
A_s = NA * PA_s
NPVA_c_s = (A_s + T6 + S6 - P6) - A_s
NPVA_s_s = (1 - y6) * (A_s + T6 + S6) - A_s
NPVT_s_s = y6 * (A_s + T6 + S6) - T6
assert near(NPVA_c_s, NPVA_c) and near(NPVA_s_s, 168) and near(NPVT_s_s, 132)
assert NPVA_s_s > NPVA_c_s
assert near(NPVA_s_s - NPVA_s, y6 * (A6 - A_s))           # dekomponering: overført til Lundar
# d) budkamp
tap_A, S_R, tap_R = 150.0, 200.0, 150.0
maks_A = VAB - (A6 - tap_A)
maks_R = T6 + S_R + tap_R
assert near(maks_A, 1350) and near(maks_R, 1250) and maks_A > maks_R
maks_A_ps, maks_R_ps = maks_A / NT, maks_R / NT
maks_A_status = T6 + S6                                   # mot status quo
pris_d = maks_R
assert VAB - pris_d > A6 - tap_A                          # Vestby byr så høyt (ekte kontroll)
assert maks_A_status < maks_R                             # uten tapet ville Nordkyst vunnet
# e) hvem vinner og taper
endr_A = (VAB - pris_d) - A6
endr_A_ps = endr_A / NA
mot_tap = (VAB - pris_d) - (A6 - tap_A)
gev_T = pris_d - T6
assert near(endr_A, -50) and near(mot_tap, 100) and near(gev_T, 350)
assert near(endr_A + gev_T - tap_R, S6 - tap_R)           # identitet: summen = netto verdiskaping
vis("Oppgave 6", NPV_kontant=(NPVA_c, NPVT_c), PA_c=PA_c, y=y6, NPV_aksje=(NPVA_s, NPVT_s),
    P_ny=P_ny, per_T=per_T_s, ER_maks=ER_maks, sann=(NPVA_c_s, NPVA_s_s, NPVT_s_s),
    maks=(maks_A, maks_R, maks_A_ps, maks_R_ps), endr_A=(endr_A, endr_A_ps), mot_tap=mot_tap,
    gev_T=(gev_T, gev_T / T6))


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "Options", "points": 12, "topic": "Options",
    "chapters": [21, 23, 24],
    "body": (
        "<p>Kvitholmen Shipping ASA has assets worth V and one zero-coupon bond with face value K "
        "due in three years. It pays no dividends. Answer without calculations: 2-3 sentences per "
        "question, 4 points each.</p>"
        "<p>a) Would American call and put options on Kvitholmen's shares be worth more, less or "
        "the same as European ones with the same strike and maturity? Answer for both.</p>"
        "<p>b) Why can the bond be viewed as a risk-free bond minus a put? Name the underlying and "
        "the strike and say what the put means for the shareholders.</p>"
        "<p>c) Kvitholmen replaces its long-term charters with spot-market trading. Its assets "
        "become more volatile, but V is unchanged. What happens to the equity and to the bond? "
        "Who wins and who loses?</p>"
    ),
    "solution": (
        "<p>Three answers, 2-3 sentences each, 4 points each.</p>"
        "<p><b>a) The American call is worth the same; the American put is worth more.</b> On a "
        "share without dividends a call is always worth at least S − PV(K) &gt; S − K, so "
        "exercising early never pays and the extra right is worthless. A put can never pay more "
        "than K, so when the share has fallen far it pays to take K now and earn interest on it; "
        "that right has value (with a zero interest rate it would vanish).</p>"
        "<p><b>b) Debt as a risk-free bond minus a put.</b> At maturity the bondholders receive "
        "min(V<sub>T</sub>, K) = K − max(K − V<sub>T</sub>, 0): a risk-free payment of K minus the "
        "payoff of a put on the firm's assets with strike K, so D = PV(K) − P. The put belongs to "
        "the shareholders: with limited liability they can hand the assets to the bondholders "
        "instead of paying K, so the put is their option to default and the credit spread is its "
        "price.</p>"
        "<p><b>c) The equity rises and the bond falls by the same amount.</b> The equity is a call "
        "on V with strike K and the bond is PV(K) minus a put; more volatility raises both option "
        "values while V stays the same. The shareholders gain exactly what the bondholders lose, "
        "a wealth transfer rather than new value, which is why levered shareholders like risky "
        "strategies (risk shifting).</p>"
        "<p><b>Also accepted.</b> In a): the American option is worth at least as much as the "
        "European because it gives an extra right. This basic direction is the level Kurbatov said "
        "the exam asks for (wrap-up: only European options are calculated; American options appear "
        "only as «up or down?»). In b): the "
        "equivalent form D = V − C (assets minus a call), if the put form is also explained. In c): "
        "the vega argument stated for both claims.</p>"
    ),
    "criteria": [
        "Three answers graded separately, 4 points each; within each, about half for the direction "
        "and half for the reason. A direction without a reason earns at most 1 point.",
        "a) Call: same value as the European, because early exercise of a call on a non-dividend "
        "share is never optimal (worth at least S − PV(K), more than S − K). Put: worth more, "
        "because early exercise can be optimal deep in the money. Both options must be answered. "
        "Minimal accepted answer: «at least as much, because the American option contains the "
        "European plus a right to exercise early» for both, which earns 2 of the 4 points.",
        "b) Payoff min(V, K) = K − max(K − V, 0); underlying = the firm's assets, strike = face "
        "value K; the put is the shareholders' option to default (limited liability). Naming the "
        "credit spread as the price of the put is a bonus.",
        "c) Equity (a call) rises, debt (risk-free debt minus a put) falls by the same amount, V "
        "unchanged: shareholders win, bondholders lose. Naming it a wealth transfer uses Kurbatov's "
        "key words.",
        "c) Saying that firm value rises, or that both claims gain, is the error. Linking the "
        "transfer to risk shifting earns credit.",
        "«The American option gives an extra right» and «early exercise» count as one argument, "
        "not two.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance",
    "chapters": [26, 27],
    "body": (
        "<p>Larkspur Logistics Inc. has dispersed ownership. Its shares have lagged its peers for "
        "four years; last spring a private equity fund approached the board about a takeover. The "
        "board now asks the annual meeting to approve two charter changes:</p>"
        "<p>(1) a staggered board: three-year terms, with one third of the seats up for election "
        "each year;<br>(2) a merger or the removal of a director needs the votes of 75% of all "
        "shares outstanding.</p>"
        "<p>The CEO supports both: «A manager who must fear for the job every quarter cannot invest "
        "for the long run.»</p>"
        "<p>a) How does change (1) protect the managers and what does it cost the shareholders?<br>"
        "b) The same for change (2).<br>c) When can protecting managers from monitoring raise firm "
        "value? How would you vote and how should the share price react if both changes pass?</p>"
        "<p>4 points per question; 2-3 sentences each.</p>"
    ),
    "solution": (
        "<p><b>a) The staggered board.</b> With one third of the seats up each year, a bidder or "
        "activist who wins a vote gets only a third of the board and needs a second annual meeting, "
        "more than a year later, to control it; the incumbents are much harder to replace. That "
        "delay makes a hostile bid or a proxy contest slow and costly, so the private equity fund is "
        "less likely to return and the shareholders lose the takeover premium and the discipline "
        "that the threat of a takeover puts on underperforming managers.</p>"
        "<p><b>b) The 75% supermajority.</b> A block of just over 25% (the managers' own shares, an "
        "employee plan, friendly holders) can veto any merger or removal. With dispersed owners "
        "who often do not vote, 75% of all shares outstanding is close to unanimity even when a "
        "clear majority of the votes cast want the change. The board can then block bids "
        "that the majority of shareholders would accept, so managers are entrenched against the "
        "owners themselves, not only against outsiders.</p>"
        "<p><b>c) The trade-off and the vote.</b> The CEO has a point: a manager who is monitored "
        "too strongly becomes passive and short-termist, cutting long-term investment to avoid a "
        "bad quarter; some protection (with the bargaining power it gives the board to extract a "
        "higher premium) can raise value. Here the case is weak: the shares have lagged for four "
        "years, the changes come right after a bid and protect the people who would be replaced, "
        "so I vote against. If both pass, the share price should fall, because the market loses "
        "part of the value of a future takeover and expects weaker discipline.</p>"
        "<p><b>Also accepted.</b> A vote for with a clear condition (an independent board, a sunset "
        "clause, a shareholder vote on any bid); other mechanisms in a) and b) such as the link to "
        "a poison pill (a pill plus a staggered board is very hard to beat) or golden parachutes as "
        "a related protection.</p>"
    ),
    "criteria": [
        "Three answers graded separately, 4 points each; within each, the mechanism and the "
        "consequence for shareholders are about 2 points each.",
        "a) Mechanism: only a third of the seats per election, so control takes two annual "
        "meetings. Consequence: fewer hostile bids and proxy contests, lost premium, weaker "
        "discipline.",
        "b) Mechanism: a minority of just over 25% (or the non-voting owners) blocks a merger or a "
        "removal. Consequence: entrenchment against the majority of owners, not only against "
        "bidders.",
        "c) One argument for protection (a passive or short-termist manager when monitoring is too "
        "strong; bargaining power for a higher premium), a stated vote and a direction for the "
        "price with a reason. Any reasoned vote is accepted.",
        "In c), «long-term investment» and «avoiding short-termism» count as one argument; "
        "bargaining power is a second, distinct one.",
        "If a) and b) give the same consequence (lost takeover premium), b) must add what is "
        "specific to the supermajority (a minority blocks the majority) for full marks.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
tab3b = (
    "<table class=\"data\"><tr><th>Type</th><th>Value after the issue</th><th>Per share, "
    f"{f(N3 + n_pool)} million shares</th><th>Per share without the project</th><th>Issues?</th></tr>"
    f"<tr><td>High</td><td class=\"n\">{g(VH)} + {g(X3)} = {g(VH + X3)}</td><td class=\"n\">"
    f"{f(vH_pool)}</td><td class=\"n\">{g(VH)}/{g(N3)} = {g(sH)}</td><td>No</td></tr>"
    f"<tr><td>Low</td><td class=\"n\">{g(VL)} + {g(X3)} = {g(VL + X3)}</td><td class=\"n\">"
    f"{f(vL_pool)}</td><td class=\"n\">{g(VL)}/{g(N3)} = {f(sL, 2)}</td><td>Yes</td></tr></table>"
)
tab3d = (
    "<table class=\"data\"><tr><th>Type (value per share)</th><th>No project</th>"
    f"<th>Shares at {f(P_sep, 2)}</th><th>Loan</th></tr>"
    f"<tr><td>High</td><td class=\"n\">{g(sH)}</td><td class=\"n\">{f(vH_sep, 2)}</td>"
    f"<td class=\"n\">({g(VH)} + {g(NPV3)} − {g(c3)})/{g(N3)} = <b>{f(vH_lan, 2)}</b></td></tr>"
    f"<tr><td>Low</td><td class=\"n\">{f(sL, 2)}</td><td class=\"n\"><b>{f(P_sep, 2)}</b></td>"
    f"<td class=\"n\">({g(VL)} + {g(NPV3)} − {g(c3)})/{g(N3)} = {f(vL_lan, 2)}</td></tr></table>"
)
ex3 = {
    "n": 3, "title": "Security issues", "points": 18,
    "topic": "Seasoned equity offerings", "chapters": [12, 13, 14],
    "body": (
        f"<p>Brattholm Salmon ASA has {g(N3)} million shares and no debt. At t = 1 its existing "
        f"assets will be worth NOK {g(VH)} million (high type) or NOK {g(VL)} million (low type). "
        f"The CEO knows the type; investors only know that the high type has probability {pc(pH)}. "
        f"Brattholm can invest NOK {g(I3)} million now in a plant that pays a certain NOK {g(X3)} "
        "million at t = 1, or lose the chance. Investors know about the plant. Unless stated "
        "otherwise, it must be financed by selling new shares at the market price to competitive, "
        "risk-neutral investors. The CEO maximises the value of the existing shares once the type "
        "is known. The risk-free rate is 0%. Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>Suppose investors believe that both types issue. At what price are the new "
                "shares sold and how many are issued?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. What investors think the old shares are worth.</b> E[V] = {g(pH)} × "
                f"{g(VH)} + {g(1 - pH)} × {g(VL)} = {g(pH * VH)} + {g((1 - pH) * VL)} = {g(EV3)}. The "
                f"plant adds its NPV of {g(X3)} − {g(I3)} = {g(NPV3)}, so the existing shares are "
                f"worth {g(EV3 + NPV3)} in total: <b>NOK {f(P_pool, 2)} per share</b>. Competitive "
                "investors pay exactly this for a new share.</p>"
                f"<p><b>Step 2. Shares issued.</b> {g(I3)}/{f(P_pool, 2)} = <b>{f(n_pool)} million new "
                f"shares</b>, so {f(N3 + n_pool)} million in total and the new investors own "
                f"{f(n_pool)}/{f(N3 + n_pool)} = {pc(round(a_pool, 6))} of the firm.</p>"
                f"<p><b>Check.</b> Under the belief the firm is worth {g(EV3)} + {g(X3)} = {g(EV3 + X3)} "
                f"after the issue, or {g(EV3 + X3)}/{f(N3 + n_pool)} = {f(P_pool, 4)} per share, the "
                "issue price: the new investors break even given what they believe. (This holds by "
                "construction of the price; it checks the arithmetic, not the belief.)</p>"
            ),
            "criteria": [
                f"Expected value of the existing assets {g(pH)} × {g(VH)} + {g(1 - pH)} × {g(VL)} = "
                f"{g(EV3)}, plus the NPV of {g(NPV3)}: {g(EV3 + NPV3)} for the existing shares.",
                f"Issue price {g(EV3 + NPV3)}/{g(N3)} = NOK {f(P_pool, 2)} per share.",
                f"New shares {g(I3)}/{f(P_pool, 2)} = {f(n_pool)} million (the new investors own "
                f"{f(100 * a_pool, 2)}%).",
                f"Pricing at {g(EV3)}/{g(N3)} = {f(feil_uten_prosjekt, 2)} leaves out the plant: after "
                f"the issue a share is worth {f(P_pool, 2)}, so the new investors would gain.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>On these terms, what is an existing share worth to each type if Brattholm "
                "issues? Which type or types issue?</p>"
            ),
            "solution": (
                "<p>The existing shareholders care about the <i>true</i> value after the issue, "
                f"spread over {f(N3 + n_pool)} million shares, compared with the value per share if "
                "the firm does not issue and loses the plant.</p>"
                + tab3b +
                f"<p><b>Only the low type issues.</b> The high type sells shares worth {f(vH_pool)} for "
                f"{f(P_pool, 2)}: in total it hands {f(a_pool, 6)} × ({g(VH)} − {g(EV3)}) = "
                f"<b>{f(tapH)}</b> to the new investors, more than the NPV of {g(NPV3)}. The low type "
                f"sells overpriced shares and gains {f(a_pool, 6)} × ({g(EV3)} − {g(VL)}) = {f(gevL)} on "
                "top of the NPV.</p>"
                f"<p><b>Check.</b> High: {g(VH)} + {g(NPV3)} − {f(tapH)} = {f(VH + NPV3 - tapH)} = "
                f"{g(N3)} × {f(vH_pool)} ✓. The transfers balance on average, {g(pH)} × {f(tapH)} = "
                f"{g(1 - pH)} × {f(gevL)} = {f(pH * tapH)}, as they must at a price set by the prior. "
                "Both are decompositions of the same numbers, so they catch slips, not a wrong "
                "model.</p>"
            ),
            "criteria": [
                f"Values an existing share at the TRUE value after the issue: (V + {g(X3)})/"
                f"{f(N3 + n_pool)} per share, not at the investors' {f(P_pool, 2)}.",
                f"High: {f(vH_pool)} below {g(sH)}, so it does not issue. Low: {f(vL_pool)} above "
                f"{f(sL, 2)}, so it issues.",
                f"Compares with V/{g(N3)} (the plant is lost without the issue), not with (V + "
                f"{g(NPV3)})/{g(N3)}.",
                f"Explains why: the high type's transfer of {f(tapH)} to the new investors exceeds the "
                f"NPV of {g(NPV3)}.",
                "Deviations below 0.01 from rounding the share count are accepted.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Find the equilibrium issue price. Before the announcement investors know about "
                "the plant but not the type. By how much, in percent, does the share price change "
                "when Brattholm announces a share issue?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The belief in a) fails.</b> It assumed both types issue, but only the low "
                "type does. Rational investors therefore treat an issuer as the low type: price = "
                f"({g(VL)} + {g(NPV3)})/{g(N3)} = <b>NOK {f(P_sep, 2)}</b>, so {g(I3)}/{f(P_sep, 2)} = "
                f"{g(n_sep)} million new shares.</p>"
                f"<p><b>Step 2. Check both types at {f(P_sep, 2)}</b> ({g(N3 + n_sep)} million shares). "
                f"Low: {g(VL + X3)}/{g(N3 + n_sep)} = {f(vL_sep, 2)} &gt; {f(sL, 2)}, issues ✓. High: "
                f"{g(VH + X3)}/{g(N3 + n_sep)} = {f(vH_sep, 2)} &lt; {g(sH)}, stays out ✓. Both act as "
                "the belief assumes: a <b>separating equilibrium</b>. This check can fail: it failed "
                "for the belief in a).</p>"
                "<p><b>Step 3. The price before the announcement.</b> Investors expect the high type "
                f"(probability {pc(pH)}) to pass up the plant, worth {g(sH)} per share, while the low "
                f"type issues, worth {f(P_sep, 2)}:<br>P = {g(pH)} × {g(sH)} + {g(1 - pH)} × {f(P_sep, 2)} = "
                f"{g(pH * sH)} + {g((1 - pH) * P_sep)} = <b>NOK {f(P_for, 2)}</b></p>"
                f"<p><b>Step 4. The announcement.</b> {f(P_sep, 2)}/{f(P_for, 2)} − 1 = "
                f"<b>{f(100 * endr_c)}%</b>. Had the firm announced that it will not invest, the price "
                f"would have jumped to {g(sH)} ({'+' if endr_ikke > 0 else ''}{f(100 * endr_ikke)}%).</p>"
                f"<p><b>Check.</b> {g(pH)} × ({f(100 * endr_ikke)}%) + {g(1 - pH)} × ({f(100 * endr_c)}%) "
                "= 0: the expected announcement return is zero, as it must be for risk-neutral "
                "investors (true by construction of the price before). The cost of the information "
                f"problem: the high type forgoes the NPV, an expected loss of {g(pH)} × {g(NPV3)} = "
                f"{g(tap_forv)}.</p>"
            ),
            "criteria": [
                f"Recognises that the belief in a) is inconsistent with b) and reprices an issuer as "
                f"the low type: ({g(VL)} + {g(NPV3)})/{g(N3)} = {f(P_sep, 2)}, {g(n_sep)} million new "
                "shares.",
                f"Checks both types: low {f(vL_sep, 2)} above {f(sL, 2)} (issues), high {f(vH_sep, 2)} "
                f"below {g(sH)} (stays out). Separating equilibrium.",
                f"Price before = {g(pH)} × {g(sH)} + {g(1 - pH)} × {f(P_sep, 2)} = {f(P_for, 2)}: "
                "investors already expect the low type to issue.",
                f"Change = {f(P_sep, 2)}/{f(P_for, 2)} − 1 = {f(100 * endr_c)}%. Measuring from the "
                f"pooling price of {f(P_pool, 2)} ({f(100 * feil_fra_pool)}%) uses a price that is "
                "not an equilibrium and is the error.",
                f"(bonus) Names the loss: the high type forgoes the NPV, {g(pH)} × {g(NPV3)} = "
                f"{g(tap_forv)} in expectation.",
            ],
        },
        {
            "label": "d", "points": 5,
            "body": (
                f"<p>Instead, a bank offers a risk-free loan of NOK {g(I3)} million whose covenants "
                f"cost the existing shareholders NOK {g(c3)} million (present value) for either type. "
                "Investors know about the offer. What does each type do now? By how much, in percent, does the share price change "
                "on each possible announcement?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Each type's best choice</b>, with a share issue priced as in c) "
                "(a loan is risk-free, so its terms do not depend on beliefs):</p>"
                + tab3d +
                "<p><b>The high type borrows; the low type issues shares.</b> The low type gets the "
                "full NPV from a fairly priced issue and avoids the covenant cost; the high type pays "
                f"{g(c3)} to avoid selling shares worth {f(vH_sep, 2)} for {f(P_sep, 2)}. Neither "
                f"gains by copying the other ({f(vL_lan, 2)} &lt; {f(P_sep, 2)} and {f(vH_sep, 2)} "
                f"&lt; {f(vH_lan, 2)}), so a borrower is read as high and an issuer as low.</p>"
                f"<p><b>Step 2. Prices.</b> Before: {g(pH)} × {f(vH_lan, 2)} + {g(1 - pH)} × "
                f"{f(P_sep, 2)} = <b>{f(P_for_d, 2)}</b>. Loan: {f(vH_lan, 2)}/{f(P_for_d, 2)} − 1 = "
                f"<b>+{f(100 * endr_lan)}%</b>. Share issue: {f(P_sep, 2)}/{f(P_for_d, 2)} − 1 = "
                f"<b>{f(100 * endr_emi)}%</b>.</p>"
                "<p>Both types now invest: the expected loss falls from "
                f"{g(tap_forv)} to the covenant cost {g(pH)} × {g(c3)} = {g(tap_forv_d)}. The choice "
                "of financing itself reveals the type: debt is good news, equity is bad news.</p>"
            ),
            "criteria": [
                f"Compares three options per type: high {g(sH)} (no project), {f(vH_sep, 2)} (shares), "
                f"{f(vH_lan, 2)} (loan); low {f(sL, 2)}, {f(P_sep, 2)}, {f(vL_lan, 2)}.",
                "High borrows, low issues shares: each picks the best of its three options, so neither "
                "wants to copy the other.",
                f"Price before = {f(P_for_d, 2)} (not {f(P_for, 2)}: the high type now invests).",
                f"Loan announcement +{f(100 * endr_lan)}%, share issue {f(100 * endr_emi)}%.",
                "Assuming that the low type also borrows (to look like the high type) is the error: a "
                "risk-free loan is priced the same for both, so copying only costs the covenants.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Use your results to explain why share prices fall on average when firms announce "
                "equity issues, even for positive-NPV projects. Which financing should a high-type "
                "firm arrange before its next project? (3-4 sentences)</p>"
            ),
            "solution": (
                "<p><b>Model answer (4 sentences).</b> Build up internal funds (retained earnings or "
                "cash held back from payouts) or unused, cheap debt capacity before the project "
                "comes: internal funds need no outside investor to value the firm, so the high type "
                "invests without selling underpriced shares or paying covenant costs. That is the "
                "pecking order: internal funds first, then safe debt, equity last. Equity is the "
                "claim most sensitive to what the managers know, so firms that know they are worth "
                "more avoid it and those that issue are disproportionately the overvalued ones. "
                f"Investors know this and revise the value down on the announcement ({f(100 * endr_c, 2)}% "
                "in c)); the fall is news about the existing assets, not about the project, which has "
                "a positive NPV.</p>"
                "<p><b>Also accepted.</b> Credible certification of the assets before an issue; a "
                "rights offer to the existing shareholders, which leaves no outsider to take the "
                "transfer if they all take up their rights.</p>"
            ),
            "criteria": [
                "A concrete better alternative with the reason: internal funds (cash, retained "
                "earnings) or safe debt avoid the mispricing; certification or a rights offer are "
                "also accepted.",
                "States the order of financing: internal funds, then debt, then equity. The point is "
                "given with or without the name; naming it the pecking order is a bonus.",
                "Explains the price fall by adverse selection: issuers are more likely to be "
                "overvalued, so the announcement is bad news about the existing assets.",
                "Notes that the fall is not about the project (its NPV is positive) and links it to "
                "the numbers in c) or d).",
                "Keep to 3-4 sentences.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
tab4c = (
    "<table class=\"data\"><tr><th>Year t</th><th class=\"n\">0</th><th class=\"n\">1</th>"
    "<th class=\"n\">2</th><th class=\"n\">3</th></tr>"
    f"<tr><td>FCF</td><td class=\"n\">−{g(I4)}</td>"
    + "".join(f"<td class=\"n\">{g(x)}</td>" for x in F4) + "</tr>"
    "<tr><td>V<sup>L</sup><sub>t</sub></td>"
    + "".join(f"<td class=\"n\">{f(x) if x else '0'}</td>" for x in VL4) + "</tr>"
    "<tr><td>D<sub>t</sub> = 0.6 V<sup>L</sup><sub>t</sub></td>"
    + "".join(f"<td class=\"n\">{f(x) if x else '0'}</td>" for x in D_t) + "</tr></table>"
)
tab4e = (
    "<table class=\"data\"><tr><th>Year t</th><th class=\"n\">1</th><th class=\"n\">2</th>"
    "<th class=\"n\">3</th></tr>"
    "<tr><td>Debt at the start, D<sub>t−1</sub></td>"
    + "".join(f"<td class=\"n\">{f(D_t[k])}</td>" for k in range(3)) + "</tr>"
    f"<tr><td>Interest, {pc(rD4)} × D<sub>t−1</sub></td>"
    + "".join(f"<td class=\"n\">{f(x)}</td>" for x in rente4) + "</tr>"
    f"<tr><td>Tax shield, {pc(tau4)} × interest</td>"
    + "".join(f"<td class=\"n\">{f(x)}</td>" for x in TS4) + "</tr></table>"
)
ex4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18,
    "topic": "Project valuation and financing", "chapters": [4, 17, 18, 19],
    "body": (
        f"<p>Saltstraum Kraft ASA has a market capitalisation of NOK {g(E4m)} million and NOK "
        f"{g(Dg4)} million of debt costing {pc(rD4)}. It holds NOK {g(C4)} million in cash, of which "
        f"NOK {g(Cop4)} million is needed in operations. Its cost of equity is {pc(rE4)} and its "
        f"tax rate {pc(tau4)}. It keeps its debt-to-value ratio constant.</p>"
        f"<p>A plant upgrade costs NOK {g(I4)} million today and gives free cash flows of NOK "
        f"{g(F4[0])}, {g(F4[1])} and {g(F4[2])} million at the end of years 1 to 3, with the firm's "
        "risk. Saltstraum will fund it with its excess cash and new debt, keeping the "
        "debt-to-value ratio constant; any cash left over goes to the shareholders. Use 4 decimal "
        "places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is Saltstraum's WACC?</p>",
            "solution": (
                f"<p><b>Step 1. Net debt.</b> Only the excess cash is subtracted: {g(C4)} − {g(Cop4)} "
                f"= {g(xc4)}, so D = {g(Dg4)} − {g(xc4)} = <b>{g(D4)}</b> and V = {g(E4m)} + {g(D4)} = "
                f"{g(V4)}. Weights: D/V = {g(d4)}, E/V = {g(1 - d4)}.</p>"
                f"<p><b>Step 2. WACC.</b><br>r<sub>wacc</sub> = {g(1 - d4)} × {pc(rE4)} + {g(d4)} × "
                f"(1 − {g(tau4)}) × {pc(rD4)} = {pc((1 - d4) * rE4)} + {pc(d4 * (1 - tau4) * rD4)} = "
                f"<b>{pc(rw4)}</b></p>"
            ),
            "criteria": [
                f"Net debt = {g(Dg4)} − ({g(C4)} − {g(Cop4)}) = {g(D4)}: only the excess cash is "
                f"netted. D/V = {g(d4)}.",
                f"r_wacc = {g(1 - d4)} × {pc(rE4)} + {g(d4)} × {g(1 - tau4)} × {pc(rD4)} = {pc(rw4)}.",
                f"Gross debt (D/V = {f(d_br)}, WACC {pc(round(rw_br, 6))}) or all cash netted "
                f"(D/V = {f(d_alt)}, WACC {pc(round(rw_alt, 6))}) is the error.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": "<p>What are the value and the NPV of the upgrade?</p>",
            "solution": (
                f"<p>Discount the free cash flows at r<sub>wacc</sub> = {pc(rw4)}:<br>"
                f"V<sup>L</sup><sub>0</sub> = {g(F4[0])}/{g(1 + rw4)} + {g(F4[1])}/{g(1 + rw4)}<sup>2</sup> "
                f"+ {g(F4[2])}/{g(1 + rw4)}<sup>3</sup> = {f(ledd4[0])} + {f(ledd4[1])} + {f(ledd4[2])} = "
                f"<b>NOK {f(VL4[0])} million</b></p>"
                f"<p>NPV = {f(VL4[0])} − {g(I4)} = <b>NOK {f(NPV4)} million</b>. The question asks about "
                "the upgrade, so this is the project's NPV, not the value of the firm.</p>"
            ),
            "criteria": [
                f"Discounts at r_wacc = {pc(rw4)} (the project has the firm's risk and leverage).",
                f"V_0 = {f(ledd4[0])} + {f(ledd4[1])} + {f(ledd4[2])} = {f(VL4[0])}.",
                f"NPV = {f(VL4[0])} − {g(I4)} = {f(NPV4)}. Giving the value without subtracting the "
                "cost, or the firm's value, does not answer the question.",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": "<p>What is the upgrade's debt capacity at t = 0, 1, 2 and 3?</p>",
            "solution": (
                "<p>The debt capacity is D<sub>t</sub> = (D/V) × V<sup>L</sup><sub>t</sub>, where "
                "V<sup>L</sup><sub>t</sub> is the value of the cash flows still to come, found "
                "backwards: V<sup>L</sup><sub>t</sub> = (FCF<sub>t+1</sub> + V<sup>L</sup><sub>t+1</sub>)/"
                f"{g(1 + rw4)}.<br>V<sup>L</sup><sub>2</sub> = {g(F4[2])}/{g(1 + rw4)} = {f(VL4[2])}; "
                f"V<sup>L</sup><sub>1</sub> = ({g(F4[1])} + {f(VL4[2])})/{g(1 + rw4)} = {f(VL4[1])}; "
                f"V<sup>L</sup><sub>0</sub> = ({g(F4[0])} + {f(VL4[1])})/{g(1 + rw4)} = {f(VL4[0])}.</p>"
                + tab4c +
                f"<p>The debt is repaid as the upgrade nears its end: {f(nedbet[0])} in year 1, "
                f"{f(nedbet[1])} in year 2 and {f(nedbet[2])} in year 3.</p>"
            ),
            "criteria": [
                "Uses the continuation value at each date (the cash flows still to come), not the "
                "original value or the cash flow of the year.",
                f"V_t = {f(VL4[0])}, {f(VL4[1])}, {f(VL4[2])}, 0.",
                f"D_t = {g(d4)} × V_t = {f(D_t[0])}, {f(D_t[1])}, {f(D_t[2])}, 0.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>How much new debt does Saltstraum issue today and how much is paid out? By how "
                "much are the shareholders better off?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Funding.</b> Net debt must rise by the debt capacity, "
                f"<b>{f(D_t[0])}</b>. Spending the excess cash of {g(xc4)} raises net debt by "
                f"{g(xc4)}, so new debt = {f(D_t[0])} − {g(xc4)} = <b>NOK {f(ny_gjeld)} million</b>. "
                f"Of the {f(D_t[0])} raised, {g(I4)} pays for the upgrade and <b>NOK {f(utbet)} "
                "million</b> is paid out (dividend or buyback).</p>"
                f"<p><b>Step 2. The shareholders.</b> After the upgrade V = {g(V4)} + {f(VL4[0])} = "
                f"{f(EV_etter)} and net debt = {g(D4)} + {f(D_t[0])} = {f(ND_etter)} = {g(d4)} × "
                f"{f(EV_etter)} ✓, so the equity is worth {f(E_etter)}, up {f(dE4)} from {g(E4m)}. With "
                f"the payout of {f(utbet)} the shareholders are better off by {f(dE4)} + {f(utbet)} = "
                f"<b>NOK {f(gevinst4)} million</b>: the upgrade's NPV.</p>"
                "<p><b>Note.</b> Gain = NPV is an identity here: the new debt is sold at its fair value, "
                "so the lenders get exactly what they pay for and the whole NPV ends with the "
                "shareholders. It checks the bookkeeping, not the valuation.</p>"
            ),
            "criteria": [
                f"Net debt rises by the debt capacity {f(D_t[0])}; the excess cash of {g(xc4)} covers "
                f"part, new debt = {f(ny_gjeld)}.",
                f"Payout = {f(D_t[0])} − {g(I4)} = {f(utbet)}.",
                f"Shareholders: equity up {f(dE4)} (to {f(E_etter)}) plus the payout {f(utbet)} = "
                f"{f(gevinst4)} = NPV.",
                "Counting only the rise in equity, or only the payout, misses half of the gain.",
            ],
        },
        {
            "label": "e", "points": 5,
            "body": (
                "<p>Value the upgrade with APV and compare with b). Which rate did you use for the "
                "tax shields and why? (1-2 sentences)</p>"
            ),
            "solution": (
                f"<p><b>Step 1. r<sub>U</sub></b> (pre-tax WACC): {g(1 - d4)} × {pc(rE4)} + {g(d4)} × "
                f"{pc(rD4)} = <b>{pc(rU4)}</b>.</p>"
                f"<p><b>Step 2. V<sup>U</sup>.</b> {g(F4[0])}/{g(1 + rU4)} + {g(F4[1])}/{g(1 + rU4)}"
                f"<sup>2</sup> + {g(F4[2])}/{g(1 + rU4)}<sup>3</sup> = {f(ledd_U[0])} + {f(ledd_U[1])} + "
                f"{f(ledd_U[2])} = <b>{f(VU4)}</b></p>"
                "<p><b>Step 3. Tax shields</b> on the debt capacity from c):</p>"
                + tab4e +
                f"<p>PV(TS) = {f(TS4[0])}/{g(1 + rU4)} + {f(TS4[1])}/{g(1 + rU4)}<sup>2</sup> + "
                f"{f(TS4[2])}/{g(1 + rU4)}<sup>3</sup> = <b>{f(PVTS4)}</b></p>"
                f"<p><b>Step 4. APV</b> = {f(VU4)} + {f(PVTS4)} = <b>{f(VU4 + PVTS4)}</b>, the same as "
                f"b) ✓. This is a fixed point, not an independent route: the debt levels come from the "
                "WACC values, so with r<sub>wacc</sub> = r<sub>U</sub> − d·τ·r<sub>D</sub> the two must "
                "agree. It still catches the two errors that happen: a wrong rate on the tax shields "
                f"(r<sub>D</sub> gives {f(VU4 + PVTS4_rD)}) and arithmetic slips.</p>"
                "<p><b>Why r<sub>U</sub>.</b> The debt is reset to 60% of the upgrade's value every "
                "year, so future debt, interest and tax shields rise and fall with the project's cash "
                "flows; they carry the risk of the assets, so they are discounted at r<sub>U</sub>, "
                "the same rate that the WACC method uses implicitly.</p>"
            ),
            "criteria": [
                f"r_U = {pc(rU4)} without taxes; V_U = {f(VU4)}.",
                f"Interest on last year's debt capacity: {f(rente4[0])}, {f(rente4[1])}, "
                f"{f(rente4[2])}; tax shields {f(TS4[0])}, {f(TS4[1])}, {f(TS4[2])}.",
                f"PV(TS) at r_U = {f(PVTS4)}; APV = {f(VU4 + PVTS4)} = the WACC value. Deviations of "
                "about 0.001 are rounding. The match is a fixed point (the debt comes from the WACC "
                "values), not an independent confirmation.",
                f"Why r_U: constant D/V makes the tax shields as risky as the cash flows. With r_D the "
                f"APV is {f(VU4 + PVTS4_rD)}, the classic error.",
                "Interest computed on this year's debt (D_t instead of D_t−1) is an error.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
tab5 = (
    "<table class=\"data\"><tr><th>Strike (USD)</th><th>Call bid</th><th>Call ask</th>"
    "<th>Put bid</th><th>Put ask</th></tr>"
    + "".join(
        f"<tr><td class=\"n\">{k}</td>" + "".join(f"<td class=\"n\">{v:.2f}</td>" for v in KURS[k])
        + "</tr>" for k in VIS_K)
    + "</table>"
)
ex5 = {
    "n": 5, "title": "Options", "points": 20,
    "topic": "Options and corporate debt", "chapters": [23, 24],
    "body": (
        f"<p>Ridgeline Software Inc. has {g(N5 * 1000)} million shares at USD {g(S5)} and no debt. "
        f"The risk-free rate is {pc(rf5)} a year and markets are perfect. Ridgeline considers "
        f"issuing zero-coupon debt with face value USD {g(K_tot)} billion due in 15 months and "
        "paying the proceeds out to its shareholders at once. Below are quotes for European "
        "options on its shares expiring in 15 months; treat them as options on its assets per "
        "share. Give yields as annual rates. Use 4 decimal places.</p>" + tab5
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What would the equity be worth after the debt issue? Explain which quote you use.</p>",
            "solution": (
                f"<p><b>Step 1. The claim.</b> In 15 months the debt is owed {g(K_tot)} billion, or "
                f"{g(K_tot)}/{g(N5)} = <b>USD {g(kT)} per share</b>. A share then pays max(V<sub>T</sub>/N − "
                f"{g(kT)}, 0): the payoff of a call on the assets per share with strike {g(kT)}. "
                "Equity is a call on the firm's assets with the face value of the debt as strike.</p>"
                f"<p><b>Step 2. Value.</b> Use the mid quote of the {g(kT)} call: ({KURS[kT][0]:.2f} + "
                f"{KURS[kT][1]:.2f})/2 = {Cm[kT]:.2f}. E = {g(N5 * 1000)} million × {Cm[kT]:.2f} = "
                f"<b>USD {g(E5v)} billion</b>.</p>"
            ),
            "criteria": [
                f"Strike per share = {g(K_tot)} billion/{g(N5 * 1000)} million = {g(kT)}.",
                "Explains that the equity pays max(V − K, 0): a call on the assets with strike equal "
                "to the face value.",
                f"Mid quote {Cm[kT]:.2f}; E = {g(N5)} × {Cm[kT]:.2f} = {g(E5v)} billion.",
                "Using the bid or the ask instead of the mid costs a little; a call with another "
                "strike is the error.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                "<p>Value the debt once with a call and once with a put. What yield would Ridgeline "
                "pay?</p>"
            ),
            "solution": (
                f"<p><b>With the call.</b> D = V − E = {g(V5)} − {g(E5v)} = <b>USD {g(D5)} billion</b>, "
                f"with V = {g(N5 * 1000)} million × {g(S5)} = {g(V5)}.</p>"
                "<p><b>With the put.</b> Risky debt is risk-free debt minus a put: D = PV(K) − N × "
                f"P({g(kT)}). PV(K) = {g(K_tot)}/{g(1 + rf5)}<sup>1.25</sup> = {f(PVk(K_tot))}; put mid "
                f"({KURS[kT][2]:.2f} + {KURS[kT][3]:.2f})/2 = {Pm[kT]:.2f}, so N × P = {g(N5 * Pm[kT])}:<br>"
                f"D = {f(PVk(K_tot))} − {g(N5 * Pm[kT])} = <b>{f(D5_put)}</b> ✓. The two values differ by "
                f"{f(abs(D5 - D5_put))} because the quotes are rounded to cents. This is a real check: "
                "it uses different market prices, linked only by put-call parity.</p>"
                f"<p><b>Yield.</b> ({g(K_tot)}/{g(D5)})<sup>12/15</sup> − 1 = <b>{f(100 * y5)}%</b> per "
                f"year, a credit spread of {f(100 * y5)}% − {pc(rf5)} = {f(100 * spr5)}%.</p>"
            ),
            "criteria": [
                f"D = {g(V5)} − {g(E5v)} = {g(D5)} billion.",
                f"Put route: {f(PVk(K_tot))} − {g(N5)} × {Pm[kT]:.2f} = {f(D5_put)}, the same up to "
                "rounding of the quotes. PV(K) discounted over 1.25 years, not one year.",
                f"Yield = ({g(K_tot)}/{g(D5)})^(12/15) − 1 = {f(100 * y5)}% per year; from the put "
                f"value, {f(100 * y5_put)}%, also accepted.",
                f"Annualising by simple division ({f(100 * y5_feil_enkel)}%) or giving the 15-month "
                f"return ({f(100 * y5_feil_15)}%) is the error.",
            ],
        },
        {
            "label": "c", "points": 8,
            "body": (
                f"<p>Suppose instead the debt is split into USD {g(K_S)} billion senior and USD "
                f"{g(K_J)} billion junior, both zero-coupon and due in 15 months. Find the value of "
                "each and the yield on the junior debt.</p>"
            ),
            "solution": (
                "<p><b>Step 1. Senior debt: pretend it is the only debt.</b> Its face value is "
                f"{g(K_S)}/{g(N5)} = USD {g(kS)} per share; seniority means the junior debt does not "
                f"change what the senior holders get. Call mid ({KURS[kS][0]:.2f} + {KURS[kS][1]:.2f})/2 "
                f"= {Cm[kS]:.2f}:<br>D<sub>S</sub> = V − N × C({g(kS)}) = {g(V5)} − {g(N5 * Cm[kS])} = "
                f"<b>USD {g(DS5)} billion</b></p>"
                "<p><b>Step 2. Equity is unchanged.</b> The shareholders still come after "
                f"{g(K_tot)} billion of debt in total, so E = N × C({g(kT)}) = {g(E5v)} as in a).</p>"
                f"<p><b>Step 3. Junior debt is the rest.</b> D<sub>J</sub> = {g(V5)} − {g(DS5)} − "
                f"{g(E5v)} = <b>USD {g(DJ5)} billion</b>, the same as N × [C({g(kS)}) − C({g(kT)})] = "
                f"{g(N5)} × ({Cm[kS]:.2f} − {Cm[kT]:.2f}).</p>"
                f"<p><b>Step 4. Yields.</b> Junior: ({g(K_J)}/{g(DJ5)})<sup>12/15</sup> − 1 = "
                f"<b>{f(100 * yJ5)}%</b>. For comparison, senior: ({g(K_S)}/{g(DS5)})<sup>12/15</sup> − 1 "
                f"= {f(100 * yS5)}%, against {f(100 * y5)}% on the single issue in b).</p>"
                f"<p><b>Check.</b> With the {g(kS)} put: {g(K_S)}/{g(1 + rf5)}<sup>1.25</sup> − {g(N5)} × "
                f"{Pm[kS]:.2f} = {f(PVk(K_S))} − {g(N5 * Pm[kS])} = {f(DS5_put)} ✓ (rounding of the quotes). "
                f"D<sub>S</sub> + D<sub>J</sub> = {g(DS5 + DJ5)} = D from b): an identity, since the equity "
                f"is the same call. The yields line up as they must: senior {f(100 * yS5, 2)}% &lt; "
                f"single issue {f(100 * y5, 2)}% &lt; junior {f(100 * yJ5, 2)}%. Valued with puts "
                f"throughout, the junior debt is {f(D5_put)} − {f(DS5_put)} = {f(DJ5_put)} with a yield "
                f"of {f(100 * yJ5_put)}%; the gap is the rounding of the quotes and both are accepted.</p>"
            ),
            "criteria": [
                f"Senior: strike {g(kS)} per share; D_S = {g(V5)} − {g(N5)} × {Cm[kS]:.2f} = {g(DS5)}.",
                f"Equity unchanged at {g(E5v)} (call with strike {g(kT)}), because the shareholders "
                f"still come after {g(K_tot)} billion in total.",
                f"Junior = {g(V5)} − {g(DS5)} − {g(E5v)} = {g(DJ5)}; yield ({g(K_J)}/{g(DJ5)})^(12/15) "
                f"− 1 = {f(100 * yJ5)}%.",
                f"The put route is accepted: it gives {f(DJ5_put)} and {f(100 * yJ5_put)}%. Any junior "
                f"value from {f(DJ5_lav, 3)} to {f(DJ5_hoy, 3)} and yield from {f(100 * yJ5_lav, 2)}% to "
                f"{f(100 * yJ5_hoy, 2)}% earns full marks.",
                f"Valuing the junior debt with the strike {g(K_J)}/{g(N5)} = {g(K_J / N5)} call ignores "
                "seniority and is the error.",
                f"(bonus) Senior yield {f(100 * yS5)}% or the put check {f(DS5_put)}.",
                "This part carries 8 points: the senior step, the unchanged equity and the residual "
                "junior value are each needed.",
            ],
        },
        {
            "label": "d", "points": 5,
            "body": (
                "<p>Write the junior holders' payoff at maturity with options and explain it. If the "
                "volatility of Ridgeline's assets rose with their value unchanged, what would happen "
                "to the value of the junior debt? (3-4 sentences)</p>"
            ),
            "solution": (
                f"<p><b>Model answer (4 sentences).</b> Per share the junior holders get nothing below "
                f"{g(kS)}, everything between {g(kS)} and {g(kT)} and a fixed {g(kT - kS)} above {g(kT)}: "
                f"max(V/N − {g(kS)}, 0) − max(V/N − {g(kT)}, 0), a long call with strike {g(kS)} and a "
                f"short call with strike {g(kT)}. More volatility raises the value of both calls, so the "
                "two legs pull in opposite directions and the sign depends on where the assets are. "
                f"Here they are worth {g(S5)} per share, above the whole junior range, so the junior "
                "claim behaves like risky debt: the short call gains more than the long call and the "
                "junior debt loses value. The loss goes to the shareholders, whose call is worth more: "
                "the risk-shifting transfer from exercise 1.</p>"
                "<p><b>Also accepted.</b> «Junior: ambiguous in general, depends on where the assets "
                "are relative to the two strikes», with that reason; the junior claim as "
                f"a risk-free bond paying {g(kT - kS)} minus a put spread (a put at {g(kT)} minus a put at {g(kS)}).</p>"
            ),
            "criteria": [
                f"Payoff split into a long call ({g(kS)}) minus a short call ({g(kT)}), with the payoff "
                "explained by range: about half of the points.",
                "Junior: falls here because the firm is well above the junior range, or ambiguous in "
                "general with the reason (long and short call react in opposite directions). «Rises» "
                "without that argument is wrong.",
                "(bonus) Says where the value goes: to the shareholders, as in exercise 1c.",
                "Keep to 3-4 sentences; no calculation is needed.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
ex6 = {
    "n": 6, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions", "chapters": [26],
    "body": (
        f"<p>Vestby Group ASA ({g(NA)} million shares at NOK {g(PA)}) wants to acquire Lundar Foods "
        f"ASA ({g(NT)} million shares at NOK {g(PT)}). Both prices are from before any bid and "
        f"reflect stand-alone values. Vestby expects synergies with a present value of NOK {g(S6)} "
        "million. Amounts are in NOK million unless given per share.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                f"<p>Vestby offers NOK {g(pris_c)} in cash per Lundar share. What is the deal's NPV for "
                "each group of shareholders?</p>"
            ),
            "solution": (
                f"<p>A = {g(NA)} × {g(PA)} = {g(A6)}, T = {g(NT)} × {g(PT)} = {g(T6)}, price P = {g(NT)} × "
                f"{g(pris_c)} = {g(P6)}.</p>"
                f"<p>NPV<sub>Vestby</sub> = S − (P − T) = {g(S6)} − ({g(P6)} − {g(T6)}) = <b>NOK "
                f"{g(NPVA_c)} million</b><br>NPV<sub>Lundar</sub> = P − T = <b>NOK {g(NPVT_c)} "
                f"million</b> (a premium of {pc(pris_c / PT - 1)})</p>"
                f"<p>The two add up to the synergies, {g(S6)}, as they must (an identity). Vestby's "
                f"share price should rise to ({g(A6)} + {g(NPVA_c)})/{g(NA)} = {f(PA_c, 2)} if the "
                "market believes the synergies.</p>"
            ),
            "criteria": [
                f"T = {g(T6)}, P = {g(P6)}.",
                f"NPV_Vestby = {g(S6)} − {g(P6 - T6)} = {g(NPVA_c)}; NPV_Lundar = {g(NPVT_c)}.",
                "Uses the formula sheet's cash-offer NPVs; the sum equals S.",
                "Show the calculation.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                f"<p>Alternatively, Vestby offers {g(ER6)} new Vestby shares per Lundar share. What "
                "are the two NPVs?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Shares.</b> New shares X = {g(ER6)} × {g(NT)} = {g(X6)} million; Lundar's "
                f"owners get y = {g(X6)}/({g(NA)} + {g(X6)}) = {g(y6)} of the merged firm, worth "
                f"A + T + S = {g(VAB)}.</p>"
                f"<p><b>Step 2. NPVs.</b><br>NPV<sub>Vestby</sub> = (1 − y)(A + T + S) − A = {g(1 - y6)} × "
                f"{g(VAB)} − {g(A6)} = <b>{g(NPVA_s)}</b><br>NPV<sub>Lundar</sub> = y(A + T + S) − T = "
                f"{g(y6)} × {g(VAB)} − {g(T6)} = <b>{g(NPVT_s)}</b></p>"
                f"<p><b>Comparison (not required).</b> A Vestby share is worth {g(VAB)}/{g(NA + X6)} = "
                f"{g(P_ny)} after the deal, so the share offer is worth {g(ER6)} × {g(P_ny)} = "
                f"{f(per_T_s, 2)} per Lundar share against {g(pris_c)} in cash; Lundar's shareholders "
                f"should prefer the cash ({g(NPVT_c)} &gt; {g(NPVT_s)}), all the more since with "
                "shares they also bear part of the risk that the synergies fall short.</p>"
                f"<p><b>Check.</b> Vestby's NPV per share: {g(NA)} × ({g(P_ny)} − {g(PA)}) = "
                f"{g(NA * (P_ny - PA))} ✓, the same number by another route (an identity that catches "
                "slips). The two NPVs add up to S, also an identity.</p>"
            ),
            "criteria": [
                f"X = {g(X6)} million, y = {g(y6)}.",
                f"NPV_Vestby = {g(1 - y6)} × {g(VAB)} − {g(A6)} = {g(NPVA_s)}; NPV_Lundar = {g(NPVT_s)}.",
                f"Valuing Lundar's new shares at the old price ({g(ER6)} × {g(PA)} × {g(NT)} = "
                f"{g(ER6 * PA * NT)}, NPV {g(ER6 * PA * NT - T6)}) ignores the synergies Lundar shares in.",
                "Both NPVs must be shown; the sum equals S.",
                f"(bonus) Notes that the share offer is worth {g(ER6)} × {g(P_ny)} = {f(per_T_s, 2)} per "
                f"Lundar share against {g(pris_c)} in cash; shares also leave Lundar exposed to the "
                "synergy risk.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                f"<p>Vestby's managers think their shares are worth only NOK {g(PA_s)}. By their "
                "valuation, which offer do they prefer? How will the market react to a share "
                "offer?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. True values.</b> A = {g(NA)} × {g(PA_s)} = {g(A_s)}; A + T + S = "
                f"{g(A_s + T6 + S6)}.<br>Cash: NPV<sub>Vestby</sub> = S − (P − T) = <b>{g(NPVA_c_s)}</b> "
                f"(unchanged: a cash price does not depend on Vestby's own value).<br>Shares: "
                f"NPV<sub>Vestby</sub> = {g(1 - y6)} × {g(A_s + T6 + S6)} − {g(A_s)} = <b>{g(NPVA_s_s)}</b>."
                f"</p><p><b>They prefer shares:</b> Lundar's owners get {pc(y6)} of a firm that, by the "
                f"managers' valuation, the market overvalues by {g(A6 - A_s)}, so they really receive {g(y6)} × ({g(A6)} − "
                f"{g(A_s)}) = {g(NPVA_s_s - NPVA_s)} less than the offer seems worth; that amount stays "
                f"with Vestby's old shareholders ({g(NPVA_s_s)} − {g(NPVA_s)}). Lundar's true NPV falls "
                f"to {g(NPVT_s_s)} (the sum is still {g(S6)}).</p>"
                "<p><b>Market reaction.</b> Investors know that a bidder who thinks its shares are "
                "overvalued prefers to pay with them, so a share offer is read as a signal of "
                "overvaluation and Vestby's share price falls on the announcement: the same "
                "mechanism as an equity issue in exercise 3.</p>"
            ),
            "criteria": [
                f"Cash NPV unchanged at {g(NPVA_c_s)}; share NPV at true values {g(NPVA_s_s)}.",
                "Prefers shares, with the reason: overvalued shares are a cheap currency.",
                "Market reaction: a share offer signals overvaluation, Vestby's price falls (adverse "
                "selection, as in Myers-Majluf).",
                f"(bonus) Lundar's true gain falls to {g(NPVT_s_s)}; the sum stays {g(S6)}.",
            ],
        },
        {
            "label": "d", "points": 5,
            "body": (
                f"<p>From now on NOK {g(PA)} is the correct value of a Vestby share. A rival, Nordkyst "
                f"ASA, has synergies of NOK {g(S_R)} million with Lundar. If Nordkyst buys Lundar, Vestby "
                f"loses NOK {g(tap_A)} million in value; if Vestby buys it, Nordkyst loses NOK "
                f"{g(tap_R)} million. What is the highest cash price per Lundar share each bidder will "
                "pay? Who wins and at roughly what price?</p>"
            ),
            "solution": (
                "<p>Bidding depends on the alternative: the most a bidder pays is its value if it "
                "wins minus its value if the rival wins.</p>"
                f"<p><b>Vestby.</b> Win: {g(A6)} + {g(T6)} + {g(S6)} − P. Lose: {g(A6)} − {g(tap_A)} = "
                f"{g(A6 - tap_A)}. Highest P = {g(VAB)} − {g(A6 - tap_A)} = {g(maks_A)}: "
                f"<b>NOK {f(maks_A_ps, 2)} per share</b> (against {g(maks_A_status)}, or "
                f"{f(maks_A_status / NT, 2)}, if the alternative were no deal).</p>"
                f"<p><b>Nordkyst.</b> Highest P = T + S<sub>N</sub> + loss avoided = {g(T6)} + {g(S_R)} + "
                f"{g(tap_R)} = {g(maks_R)}: <b>NOK {f(maks_R_ps, 2)} per share</b>.</p>"
                f"<p><b>Vestby wins</b> at just above Nordkyst's limit, <b>about NOK {f(maks_R_ps, 2)} per "
                f"share</b> ({g(pris_d)} in total), the second-highest valuation.</p>"
                f"<p><b>Check.</b> At {g(pris_d)} Vestby is worth {g(VAB)} − {g(pris_d)} = "
                f"{g(VAB - pris_d)} if it wins against {g(A6 - tap_A)} if it lets Nordkyst win, so it "
                f"does bid that high; Nordkyst would need to pay more than its limit of {g(maks_R)} "
                "to top the bid. This can fail: with no loss from the rival winning, Vestby's limit "
                f"would be {g(maks_A_status)} and Nordkyst would win.</p>"
            ),
            "criteria": [
                "Highest price = value if you win minus value if the rival wins.",
                f"Vestby: {g(VAB)} − {g(A6 - tap_A)} = {g(maks_A)}, NOK {f(maks_A_ps, 2)} per share.",
                f"Nordkyst: {g(T6)} + {g(S_R)} + {g(tap_R)} = {g(maks_R)}, NOK {f(maks_R_ps, 2)} per "
                "share.",
                f"Vestby wins at about Nordkyst's limit, NOK {f(maks_R_ps, 2)} (paying its own limit of "
                f"{f(maks_A_ps, 2)} is accepted with a comment).",
                f"Using only T + S ({g(maks_A_status)}) for Vestby ignores the loss if the rival wins.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Are Vestby's shareholders better or worse off than before Vestby made any bid? Why do "
                "target shareholders capture most of the gains from acquisitions? (3-4 "
                "sentences)</p>"
            ),
            "solution": (
                f"<p><b>Model answer (4 sentences).</b> At a price of {g(pris_d)} Vestby is worth "
                f"{g(VAB)} − {g(pris_d)} = {g(VAB - pris_d)}, which is {g(-endr_A)} less than its "
                f"{g(A6)} before any bid ({f(endr_A_ps, 2)} per share), so its shareholders are "
                f"<b>worse off</b>, yet {g(mot_tap)} better off than if Nordkyst had won. Lundar's "
                f"shareholders gain {g(gev_T)} ({pc(round(gev_T / T6, 4))}), more than the whole synergy "
                f"of {g(S6)}, because the threat of a rival pushes the price up to the rival's limit. "
                "In general targets capture most of the gains because a firm can be sold only once and "
                "competing bidders, a board that shops the firm and shareholders who refuse to tender "
                "below the post-deal value bid the premium up, while overconfident bidders tend to "
                "overpay. This fits the evidence: targets earn about 15% on the announcement, "
                "acquirers about 1% on average and negative in about half the deals.</p>"
                f"<p><b>Check.</b> Vestby −{g(-endr_A)}, Lundar +{g(gev_T)}, Nordkyst −{g(tap_R)}: the "
                f"sum is {g(endr_A + gev_T - tap_R)} = S − Nordkyst's loss (an identity).</p>"
            ),
            "criteria": [
                f"Vestby: {g(VAB)} − {g(pris_d)} = {g(VAB - pris_d)} against {g(A6)}, worse off by "
                f"{g(-endr_A)}; credit for noting it is {g(mot_tap)} better than losing the contest. A "
                f"comparison with the cash offer in a) (NPV {g(NPVA_c)}, so {g(NPVA_c - endr_A)} worse) is "
                "accepted if stated as such.",
                f"Lundar gains {g(gev_T)}, more than S = {g(S6)}.",
                "General reason with a mechanism: competition among bidders, the free-rider problem "
                "in tender offers, or overpayment (hubris, winner's curse). One mechanism explained "
                "well earns full credit; two labels for the same mechanism count as one.",
                "Keep to 3-4 sentences.",
            ],
        },
    ],
}

SETT = {
    "id": "prove7",
    "kind": "mock",
    "label": "Mock exam 7",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format (H2024, H2025), round two of the 2026 "
        "prediction. Two verbal exercises on options and governance, then four calculations: an "
        "equity issue when managers know more than investors, the financing of a project in a "
        "levered firm, corporate debt priced from option quotes and a takeover with a choice of "
        "payment and a rival bidder. New firms and numbers throughout. Not an official exam: the "
        "course has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations that end with a short verbal "
        "question.",
        "The formula sheet is handed out. Results from the lectures that are not on it must be "
        "known by heart.",
        "Show every calculation and carry 4 decimals where the exercise asks for it. Answer in "
        "English.",
        "Written for practice in this app, not an official exam. The course has not checked the "
        "solutions.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}


# ======================================================================
#                         KONTROLL AV SETTET
# ======================================================================
def alle_tekster(o, sti="sett"):
    if isinstance(o, str):
        yield sti, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from alle_tekster(v, f"{sti}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from alle_tekster(v, f"{sti}[{i}]")


feil = []
POENG = [12, 12, 18, 18, 20, 20]
assert sum(POENG) == SETT["points"]
for ex, p in zip(SETT["exercises"], POENG):
    if ex["points"] != p:
        feil.append(f"oppgave {ex['n']}: {ex['points']} poeng, skal være {p}")
    if "parts" in ex:
        s = sum(d["points"] for d in ex["parts"])
        if s != ex["points"]:
            feil.append(f"oppgave {ex['n']}: deloppgavene summerer til {s}")
        if not 3 <= len(ex["parts"]) <= 9:
            feil.append(f"oppgave {ex['n']}: {len(ex['parts'])} deloppgaver")
        for d in ex["parts"]:
            if not 2 <= d["points"] <= 12:
                feil.append(f"oppgave {ex['n']}{d['label']}: {d['points']} poeng")
            if not 3 <= len(d["criteria"]) <= 7:
                feil.append(f"oppgave {ex['n']}{d['label']}: {len(d['criteria'])} kriterier")
    else:
        if not 3 <= len(ex["criteria"]) <= 7:
            feil.append(f"oppgave {ex['n']}: {len(ex['criteria'])} kriterier")
deler = [d for ex in SETT["exercises"] for d in ex.get("parts", [])]
if not any(8 <= d["points"] <= 12 for d in deler):
    feil.append("ingen konstruksjonsdel på 8–12 poeng")
for ex in SETT["exercises"]:
    if "parts" in ex and ex["parts"][0]["points"] > 4:
        feil.append(f"oppgave {ex['n']}a er tung ({ex['parts'][0]['points']} poeng)")

for sti, t in alle_tekster(SETT):
    if "—" in t or "&mdash;" in t:
        feil.append(f"tankestrek i {sti}")
    for m in re.finditer(r",\s+and\b", t):
        feil.append(f"komma foran «and» i {sti}: …{t[max(0, m.start() - 40):m.end() + 10]}…")
    if ".criteria" in sti and (re.search(r"<[a-zA-Z/!]", t) or re.search(r"&[a-z#0-9]+;", t)):
        feil.append(f"markup eller entitet i kriterium {sti}")
    if re.search(r"\d,\d{1,2}(?!\d)", t):
        feil.append(f"mulig norsk desimalkomma i {sti}")
    if "nan" in t.split() or "inf" in t.split():
        feil.append(f"nan/inf i {sti}")
    if t.count("<p>") != t.count("</p>") or t.count("<b>") != t.count("</b>"):
        feil.append(f"ubalanserte tagger i {sti}")
# note og facts vises før start: ingen formler
for sti, t in alle_tekster({"note": SETT["note"], "facts": SETT["facts"]}):
    if re.search(r"[=<>]|<sub>|<sup>", t):
        feil.append(f"formel i {sti}")


# ------------------------------------------------- oppgaveteksten som Markdown
def til_md(h):
    """Enkel HTML til Markdown for oppgaveteksten (p, b, i, br, sub, sup, tabeller)."""
    def tabell(m):
        rader = re.findall(r"<tr>(.*?)</tr>", m.group(0), re.S)
        ut = []
        for i, r in enumerate(rader):
            celler = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S)
            ut.append("| " + " | ".join(c.strip() for c in celler) + " |")
            if i == 0:
                ut.append("|" + "---|" * len(celler))
        return "\n\n" + "\n".join(ut) + "\n\n"
    s = re.sub(r"<table[^>]*>.*?</table>", tabell, h, flags=re.S)
    s = re.sub(r"<b>(.*?)</b>", r"**\1**", s, flags=re.S)
    s = re.sub(r"<i>(.*?)</i>", r"*\1*", s, flags=re.S)
    s = re.sub(r"<sub>(.*?)</sub>", r"_\1", s)
    s = re.sub(r"<sup>(.*?)</sup>", r"^\1", s)
    s = s.replace("<br>", "  \n").replace("<p>", "").replace("</p>", "\n\n")
    s = s.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")
    assert not re.search(r"<[a-zA-Z/]", s), s
    return re.sub(r"\n{3,}", "\n\n", s).strip()


md = [f"# FIE402 Corporate Finance · {SETT['label']}", "",
      "180 minutes · 100 points · 6 exercises · no multiple choice · calculator and one "
      "bilingual dictionary permitted. The formula sheet is handed out. Show every calculation.", ""]
for ex in SETT["exercises"]:
    md += [f"## Exercise {ex['n']}: {ex['title']} ({ex['points']} points)", "", til_md(ex["body"]), ""]
    for d in ex.get("parts", []):
        md += [f"**{d['label']}) ({d['points']} points)** " + til_md(d["body"]), ""]
md_tekst = "\n".join(md).rstrip() + "\n"
if "—" in md_tekst or re.search(r",\s+and\b", md_tekst):
    feil.append("skriveregel brutt i oppgaveteksten (md)")
# lengde målt som H2025 (1 149 ord) og H2024 (1 027): ren tekst i body og deloppgaver
ren = re.sub(r"<[^>]+>", " ", "".join(ex["body"] + "".join(d["body"] for d in ex.get("parts", []))
                                      for ex in SETT["exercises"]))
ord_ren, spm = len(ren.split()), ren.count("?")
print(f"\nOppgaveteksten: {ord_ren} ord (ren tekst), {len(md_tekst.split())} ord i md (wc -w), "
      f"{spm} spørsmålstegn, {len(deler)} deloppgaver")
if not 1000 <= ord_ren <= 1250:
    feil.append(f"oppgaveteksten har {ord_ren} ord, skal være 1 000–1 250")

if feil:
    print("\nFEIL, prove7.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
