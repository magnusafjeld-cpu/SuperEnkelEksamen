"""Prøveeksamen 9 i FIE402 («gjeldspolitikk og firmaet i et binomialtre»): alle tall regnes her,
og settet bygges herfra.

Kjør:  python3 -I prove9_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove9). To teorioppgaver (utbyttet kuttes til
fordel for tilbakekjøp, og aktivisme fram til proxy contest), deretter gjeldsoverheng med
reforhandling og seniorgjeld, verdsetting av et oppkjøp med permanent gjeld (APV, WACC og
unlevering av en tvilling med D(1 − τ)-vekter), firmaets eiendeler i et binomialtre (egenkapital
som call, gjeld som risikofri gjeld minus put med paritet, kredittspread og risikonøytral
misligholdssannsynlighet, risikoskifting) og en ventopsjon med en konkurrent.

Avvik fra planen: halen i oppgave 3 er seniorgjeld og covenants (lecture_4 s13) i stedet for
«gambling for resurrection». Risikoskiftingen regnes i oppgave 5d, og samme mekanisme ville
ellers blitt spurt om to ganger i samme sett.

Kildene gir typen, tallene og vriene er nye: PS1 E6 (MXK 150/50, F = 100, I = 24) og prove2/prove6
er ikke gjentatt; PS2 E9 (FCF 2, r_U 11 %, D 12, τ 25 %) er ikke gjentatt; 2022 P4 (1000 → 1600/800,
K = 1050) og prove3 E5 (62 → 80/50, K = 68) er ikke gjentatt; PS3 E9 (søksmål) og prove5 E5 er ikke
gjentatt.

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker
konsistenskontrollene med assert: D + E = V tilstand for tilstand, (1 − x)E = E − I, gevinstene
summerer til NPV (identiteter, merket som det), r_E fra FCFE/E = r_E fra MM II med (1 − τ) (ekte:
feiler med vanlig MM II), WACC = APV, unlevering av tvillingen med D(1 − τ)-vekter gir r_U (ekte:
feiler med vanlige vekter), replikering = ρ, put direkte med ρ = put fra paritet (ekte), q fra
gjeldsprisen = 1 − ρ, og likegyldighetssannsynligheten gir like verdier.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria), poengene (12/12/18/18/20/20, deloppgavene summerer), lengden (1 000–1 250 ord og
30–40 leveranser i oppgaveteksten) og at ingen oppgavetekst røper et svar i samme oppgave.
Er alt rent, skrives prove9.json og prove9_oppgave.md (bare oppgaveteksten) i samme mappe.
Er noe galt, skrives ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (D(1 − τ)-vekter ved fast permanent
gjeld, skatteskjoldet diskontert med r_D ved fast gjeld og r_U ved konstant D/V, diskret
diskontering, reelle sannsynligheter med r_f bare når risikoen ikke er systematisk, ingen
BS-regning, exit og avslag sammenlignes med 0) følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove9.json")
UT_MD = os.path.join(HER, "prove9_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn.
    Avrunder halv opp (ikke bankavrunding), slik en kalkulator gjør."""
    q = Decimal(repr(float(x))).quantize(Decimal(1).scaleb(-d), rounding=ROUND_HALF_UP)
    if q == 0:
        q = abs(q)
    s = f"{abs(q):,.{d}f}"
    return ("−" if q < 0 else "") + s


def g(x):
    """Kortest eksakte form med høyst 3 desimaler, ellers 4 desimaler."""
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def pc(x):
    """Rente som prosent: eksakt kort form (10%, 10.75%) eller 4 desimaler (10.6010%)."""
    return g(100 * x) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def r4(x):
    return float(Decimal(repr(float(x))).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP))


def vist_sum(deler, total, fortegn=None):
    """Avrundede mellomtall (4 desimaler) med fortegn må gi summen slik den vises
    (forfatterspek § 9.5). Feiler hvis ikke."""
    fortegn = fortegn or [1] * len(deler)
    s = sum(t * r4(p) for t, p in zip(fortegn, deler))
    assert f(s) == f(total), (deler, total, s)


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:28} {v}")


# ============================================ Oppgave 3: gjeldsoverheng (Sandøy Rederi)
p3 = 0.40                              # høye fraktrater
H3, L3 = 250.0, 90.0                   # eiendeler ved t = 1 uten prosjekt
F3 = 150.0                             # pålydende banklån, forfaller t = 1
I3, dV3 = 30.0, 45.0                   # ombygging i dag, økning i begge tilstander
assert L3 < F3 < H3
# a) i dag uten prosjekt
D3a = p3 * min(F3, H3) + (1 - p3) * min(F3, L3)
E3a = p3 * max(H3 - F3, 0) + (1 - p3) * max(L3 - F3, 0)
V3a = p3 * H3 + (1 - p3) * L3
assert near(D3a + E3a, V3a)                          # identitet
assert near(D3a, 114) and near(E3a, 40) and near(V3a, 154)
feil_E3a = V3a - F3                                  # trekker pålydende fra forventet verdi
# b) prosjektet finansiert med nye aksjer til rettferdig pris
H3p, L3p = H3 + dV3, L3 + dV3
assert L3p < F3                                      # fortsatt mislighold i lav tilstand
E3p = p3 * max(H3p - F3, 0) + (1 - p3) * max(L3p - F3, 0)
D3p = p3 * min(F3, H3p) + (1 - p3) * min(F3, L3p)
V3p = p3 * H3p + (1 - p3) * L3p
assert near(D3p + E3p, V3p) and near(V3p, 199)
x3 = I3 / E3p
gml3 = (1 - x3) * E3p
assert near(gml3, E3p - I3)                          # identitet: å betale selv gir det samme
assert near(E3p, 58) and near(gml3, 28) and gml3 < E3a
feil_x3 = I3 / E3a                                   # bruker egenkapitalen uten prosjekt
# c) NPV og hvem som vinner
NPV3 = dV3 - I3
dD3 = D3p - D3a
dE3 = gml3 - E3a
ny3 = x3 * E3p - I3                                  # nye aksjonærer: null
assert near(NPV3, 15) and near(D3p, 141) and near(dD3, 27) and near(dE3, -12) and near(ny3, 0)
assert near(dD3 + dE3 + ny3, NPV3)                   # dekomponering (identitet)
assert near(dD3, (1 - p3) * dV3)                     # banken får hele økningen i lav tilstand
eier_andel = p3 * dV3                                # eierne får 0.4 × 45 = 18 av 45
assert near(eier_andel - I3, dE3)
# d) reforhandling: pålydende 125
F3r = 125.0
assert F3r <= L3p                                    # lånet blir risikofritt
D3r = p3 * min(F3r, H3p) + (1 - p3) * min(F3r, L3p)
E3r = p3 * max(H3p - F3r, 0) + (1 - p3) * max(L3p - F3r, 0)
assert near(D3r, F3r) and near(D3r + E3r, V3p) and near(E3r, 74)
E3r_hoy, E3r_lav = p3 * (H3p - F3r), (1 - p3) * (L3p - F3r)
assert near(E3r_hoy, 68) and near(E3r_lav, 6)
x3r = I3 / E3r
gml3r = (1 - x3r) * E3r
assert near(gml3r, E3r - I3) and near(gml3r, 44) and gml3r > E3a
gD3r, gE3r = D3r - D3a, gml3r - E3a
assert near(gD3r, 11) and near(gE3r, 4) and near(gD3r + gE3r, NPV3)
feil_E3r = E3r_hoy                                   # glemmer 10 til eierne i lav tilstand
# forhandlingsrommet (bonus): høyeste F' eierne godtar, laveste banken godtar
F3max = V3p - I3 - E3a                               # gyldig når F3max <= L3p
F3min = D3a
assert near(F3max, 129) and F3max <= L3p and near(F3max - F3min, NPV3)
for Fx in (126.0, 129.0, 129.5, 135.0, 140.0, 150.0):   # sjekk grensen stykkevis
    Ex = p3 * max(H3p - Fx, 0) + (1 - p3) * max(L3p - Fx, 0)
    assert ((Ex - I3) >= E3a - 1e-9) == (Fx <= F3max + 1e-9)
# e) seniorgjeld i stedet for nye aksjer
S3 = I3
assert L3p - S3 >= 0                                 # seniorlånet er risikofritt, pålydende 30
D3s = p3 * min(F3, H3p - S3) + (1 - p3) * min(F3, L3p - S3)
E3s = p3 * max(H3p - S3 - F3, 0) + (1 - p3) * max(L3p - S3 - F3, 0)
assert near(D3s + E3s + S3, V3p)                     # identitet
assert near(D3s, 123) and near(E3s, 46)
gD3s, gE3s = D3s - D3a, E3s - E3a
assert near(gD3s, 9) and near(gE3s, 6) and near(gD3s + gE3s, NPV3)
bank_lav_s = L3p - S3
assert near(bank_lav_s, 105)
assert D3r > D3s                                     # banken foretrekker reforhandlingen i d)
# ubegrenset frafall (bonus): lån så mye seniorgjeld som er risikofri, utbetal resten
S3max = L3p                                          # 135 er risikofri med ombyggingen
utbet3 = S3max - I3
D3u = p3 * min(F3, H3p - S3max) + (1 - p3) * min(F3, L3p - S3max)
E3u = p3 * max(H3p - S3max - F3, 0) + (1 - p3) * max(L3p - S3max - F3, 0)
assert near(utbet3, 105) and near(D3u, 60) and near(E3u, 4) and near(D3u + E3u + S3max, V3p)
feil_D3s = p3 * F3 + (1 - p3) * min(F3, L3p)         # glemmer at seniorlånet betales først
vis("Oppgave 3", D=D3a, E=E3a, V=V3a, Ep=E3p, x=x3, gml=gml3, NPV=NPV3, dD=dD3, dE=dE3,
    Dr=D3r, Er=E3r, xr=x3r, gml_r=gml3r, gevinst_r=(gD3r, gE3r), Fmax=F3max,
    Ds=D3s, Es=E3s, gevinst_s=(gD3s, gE3s), feil_x=feil_x3, feil_Ds=feil_D3s)

# ======================================= Oppgave 4: permanent gjeld (Nordvarme AS)
EBIT4, tau4, rU4 = 60.0, 0.22, 0.08
rf4, rm4 = 0.04, 0.09
mrp4 = rm4 - rf4
D4 = 250.0
rD4 = rf4                                            # risikofri gjeld
# a)
FCF4 = EBIT4 * (1 - tau4)
VU4 = FCF4 / rU4
assert near(FCF4, 46.8) and near(VU4, 585)
# b) APV
int4 = rD4 * D4
TS4 = tau4 * int4
PVTS4 = TS4 / rD4
assert near(PVTS4, tau4 * D4) and near(PVTS4, 55) and near(TS4, 2.2)
VL4 = VU4 + PVTS4
E4 = VL4 - D4
assert near(VL4, 640) and near(E4, 390)
PVTS4_feil = TS4 / rU4                               # diskontert med r_U: feil her
VL4_feil_b = VU4 + PVTS4_feil
assert near(PVTS4_feil, 27.5) and near(VL4_feil_b, 612.5)
# c) r_E, WACC og WACC-metoden
FCFE4 = FCF4 - (1 - tau4) * int4                     # ingen netto opplåning
etter_rente4 = (1 - tau4) * int4
rE4_cf = FCFE4 / E4
rE4 = rU4 + (D4 / E4) * (1 - tau4) * (rU4 - rD4)
assert near(rE4, rE4_cf) and near(rE4, 0.10) and near(FCFE4, 39)   # ekte kontroll
tillegg4 = (D4 / E4) * (1 - tau4) * (rU4 - rD4)
assert near(tillegg4, 0.02)
rw4 = (E4 * rE4 + D4 * rD4 * (1 - tau4)) / VL4
assert near(E4 * rE4, 39) and near(D4 * rD4 * (1 - tau4), 7.8)
assert near(rw4, rU4 * (1 - tau4 * D4 / VL4)) and near(rw4, 0.073125)
assert near(FCF4 / rw4, VL4)                         # WACC = APV
# PS2 E9-veien: løs V = FCF/(r_U(1 − τD/V)) uten APV først
VL4_sys = FCF4 / rU4 + tau4 * D4
assert near(VL4_sys, VL4) and near(VL4_sys, FCF4 / (rU4 * (1 - tau4 * D4 / VL4_sys)))
# vanlig MM II uten (1 − τ): feil, og kontrollen feiler
rE4_feil = rU4 + (D4 / E4) * (rU4 - rD4)
rw4_feil = (E4 * rE4_feil + D4 * rD4 * (1 - tau4)) / VL4
VL4_feil = FCF4 / rw4_feil
assert abs(rE4_feil - rE4_cf) > 0.004 and abs(VL4_feil - VL4) > 20
# d) tvillingen Fjordvarme ASA med fast permanent gjeld
Ec4, Dc4, bEc4 = 1040.0, 500.0, 1.1
rEc4 = rf4 + bEc4 * mrp4
Dnet4 = Dc4 * (1 - tau4)
rUc4 = (Ec4 * rEc4 + Dnet4 * rD4) / (Ec4 + Dnet4)
bUc4 = Ec4 / (Ec4 + Dnet4) * bEc4
assert near(rEc4, 0.095) and near(Dnet4, 390) and near(Ec4 + Dnet4, 1430)
assert near(Ec4 * rEc4, 98.8) and near(Dnet4 * rD4, 15.6)
assert near(rUc4, rU4) and near(bUc4, 0.8) and near(rf4 + bUc4 * mrp4, rU4)   # ekte kontroll
rUc4_feil = (Ec4 * rEc4 + Dc4 * rD4) / (Ec4 + Dc4)
assert near(Dc4 * rD4, 20) and abs(rUc4_feil - rU4) > 0.002
# tvillingens verdi er konsistent: V^U = E + D(1 − τ) når skjoldet er τD
assert near(Ec4 + Dc4 - tau4 * Dc4, Ec4 + Dnet4)
# e) konstant D/V (bonus): skjoldet diskonteres med r_U
d4 = D4 / VL4
rw4_dv = rU4 - d4 * tau4 * rD4
VL4_dv = FCF4 / rw4_dv
PVTS4_dv = VL4_dv - VU4
assert PVTS4_dv < PVTS4
assert near(rw4_dv, rw4_feil) and near(VL4_dv, VL4_feil)   # vanlig MM II = konstant D/V
vis("Oppgave 4", FCF=FCF4, VU=VU4, TS=TS4, PVTS=PVTS4, VL=VL4, E=E4, FCFE=FCFE4, rE=rE4,
    rw=rw4, rE_feil=rE4_feil, rw_feil=rw4_feil, VL_feil=VL4_feil, rEc=rEc4, rUc=rUc4, bUc=bUc4,
    rUc_feil=rUc4_feil, d=d4, rw_dv=rw4_dv, VL_dv=VL4_dv, PVTS_dv=PVTS4_dv)

# ============================== Oppgave 5: firmaet i et binomialtre (Havgløtt Vind AS)
V5, Vu5, Vd5 = 500.0, 620.0, 400.0
rf5, K5, p5 = 0.04, 450.0, 0.65
assert Vd5 < K5 < Vu5 and Vd5 < (1 + rf5) * V5 < Vu5
# a) ρ
rho5 = ((1 + rf5) * V5 - Vd5) / (Vu5 - Vd5)
assert near(rho5, 6 / 11)
assert near((rho5 * Vu5 + (1 - rho5) * Vd5) / (1 + rf5), V5)       # identitet (definisjonen)
EV5_real = p5 * Vu5 + (1 - p5) * Vd5
er5_real = EV5_real / V5 - 1
assert near(EV5_real, 543) and near(er5_real, 0.086) and rho5 < p5
# b) egenkapital som call ved replikering
Eu5, Ed5 = max(Vu5 - K5, 0), max(Vd5 - K5, 0)
assert near(Eu5, 170) and near(Ed5, 0)
Delta5 = (Eu5 - Ed5) / (Vu5 - Vd5)
B5 = (Ed5 - Delta5 * Vd5) / (1 + rf5)
E5 = Delta5 * V5 + B5
assert near(Delta5 * Vu5 + B5 * (1 + rf5), Eu5) and near(Delta5 * Vd5 + B5 * (1 + rf5), Ed5)
E5_rho = (rho5 * Eu5 + (1 - rho5) * Ed5) / (1 + rf5)
assert near(E5, E5_rho)                                             # ekte kontroll
vist_sum([Delta5 * V5, -B5], E5, [1, -1])
D5 = V5 - E5
PVK5 = K5 / (1 + rf5)
P5 = E5 + PVK5 - V5                                                 # paritet
D5_put = PVK5 - P5
assert near(D5, D5_put)                                             # identitet
P5_rho = (rho5 * max(K5 - Vu5, 0) + (1 - rho5) * max(K5 - Vd5, 0)) / (1 + rf5)
assert near(P5, P5_rho)                                             # ekte kontroll
D5_rho = (rho5 * min(K5, Vu5) + (1 - rho5) * min(K5, Vd5)) / (1 + rf5)
assert near(D5, D5_rho)
vist_sum([V5, E5], D5, [1, -1])
vist_sum([E5, PVK5, V5], P5, [1, 1, -1])
vist_sum([PVK5, P5], D5, [1, -1])
feil_P5_K = E5 + K5 - V5                                            # K udiskontert i pariteten
feil_E5_real = p5 * Eu5 / (1 + rf5)                                 # reell sannsynlighet med r_f
# c) yield, spread, q, forventet avkastning
y5 = K5 / D5 - 1
spread5 = y5 - rf5
q5 = (K5 - D5 * (1 + rf5)) / (K5 - Vd5)
assert near(q5, 1 - rho5)                                           # ekte: gjelden misligholder i lav tilstand
D5_fv = D5 * (1 + rf5)
ED5 = p5 * K5 + (1 - p5) * Vd5
erD5 = ED5 / D5 - 1
assert near(ED5, 432.5) and rf5 < erD5 < y5
tap5 = y5 - erD5                                                    # forventet misligholdstap
premie5 = erD5 - rf5                                                # risikopremie
assert near(tap5 + premie5, spread5)
vist_sum([y5 * 100, erD5 * 100], tap5 * 100, [1, -1])
vist_sum([tap5 * 100, premie5 * 100], spread5 * 100)
erE5 = p5 * Eu5 / E5 - 1
LGD5 = (K5 - Vd5) / K5
q5_tilnaerm = spread5 / LGD5                         # snarvei spread ≈ q × LGD
assert near(q5, (1 - (1 + rf5) / (1 + y5)) / LGD5) and q5_tilnaerm > q5
# d) mer risiko, lavere verdi: ny ρ
V5n, Vu5n, Vd5n = 490.0, 700.0, 300.0
assert Vd5n < (1 + rf5) * V5n < Vu5n and Vd5n < K5 < Vu5n
rho5n = ((1 + rf5) * V5n - Vd5n) / (Vu5n - Vd5n)
assert near(rho5n, 0.524)
E5n = (rho5n * max(Vu5n - K5, 0) + (1 - rho5n) * max(Vd5n - K5, 0)) / (1 + rf5)
D5n = V5n - E5n
D5n_rho = (rho5n * min(K5, Vu5n) + (1 - rho5n) * min(K5, Vd5n)) / (1 + rf5)
assert near(D5n, D5n_rho)                                           # ekte kontroll
dE5, dD5 = E5n - E5, D5n - D5
assert dE5 > 0 and dD5 < 0 and near(dE5 + dD5, V5n - V5)
vist_sum([E5n, E5], dE5, [1, -1])
vist_sum([D5n, D5], dD5, [1, -1])
# felles tilstandspriser fra det opprinnelige treet (godtatt alternativ): samme to tilstander
pi_u5, pi_d5 = rho5 / (1 + rf5), (1 - rho5) / (1 + rf5)
V5alt = pi_u5 * Vu5n + pi_d5 * Vd5n
E5alt = pi_u5 * max(Vu5n - K5, 0)
D5alt = pi_u5 * K5 + pi_d5 * Vd5n
assert near(E5alt + D5alt, V5alt) and V5alt > V5n
dE5alt, dD5alt = E5alt - E5, D5alt - D5
assert dE5alt > 0 and dD5alt < 0                     # samme konklusjon
P5n = PVK5 - D5n
P5n_rho = (1 - rho5n) * (K5 - Vd5n) / (1 + rf5)
assert near(P5n, P5n_rho) and P5n > P5
E5n_feil = rho5 * max(Vu5n - K5, 0) / (1 + rf5)                     # gammel ρ
vis("Oppgave 5", rho=rho5, EV_real=EV5_real, er_real=er5_real, Delta=Delta5, B=B5, E=E5, D=D5,
    PVK=PVK5, P=P5, y=y5, spread=spread5, q=q5, ED=ED5, erD=erD5, tap=tap5, premie=premie5,
    erE=erE5, rho_n=rho5n, En=E5n, Dn=D5n, dE=dE5, dD=dD5, Pn=P5n, En_feil=E5n_feil,
    feil_P_K=feil_P5_K, feil_E_real=feil_E5_real)

# ============================ Oppgave 6: vente med konkurrent (ladeknutepunkt)
I6, CH6, CL6, p6, r6 = 60.0, 6.0, 2.7, 0.5, 0.06
s6, q6 = 0.70, 0.30                    # andel av kontantstrømmen hvis rivalen kommer, sannsynlighet
EC6 = p6 * CH6 + (1 - p6) * CL6
NPV6_na = -I6 + EC6 / r6
assert near(EC6, 4.35) and near(EC6 / r6, 72.5) and near(NPV6_na, 12.5)
# b) vente ett år uten rival
NPV6_H = -I6 + CH6 / r6
NPV6_L = -I6 + CL6 / r6
assert near(NPV6_H, 40) and near(NPV6_L, -15)
W6 = (p6 * max(NPV6_H, 0) + (1 - p6) * max(NPV6_L, 0)) / (1 + r6)
flex6 = W6 - NPV6_na
assert W6 > NPV6_na
feil_W6 = (p6 * NPV6_H + (1 - p6) * NPV6_L) / (1 + r6)             # sammenligner med −15, ikke 0
assert feil_W6 < NPV6_na                                            # gir feil beslutning
vist_sum([W6, NPV6_na], flex6, [1, -1])
# c) rival med sannsynlighet 30 %
CH6c, CL6c = s6 * CH6, s6 * CL6
NPV6_Hc = -I6 + CH6c / r6
NPV6_Lc = -I6 + CL6c / r6
assert near(CH6c, 4.2) and near(CL6c, 1.89) and near(NPV6_Hc, 10) and near(NPV6_Lc, -28.5)
W6c = (p6 * max(NPV6_Hc, 0) + (1 - p6) * max(NPV6_Lc, 0)) / (1 + r6)
W6q = (1 - q6) * W6 + q6 * W6c
flex6q = W6q - NPV6_na
assert W6q > NPV6_na
vist_sum([(1 - q6) * W6, q6 * W6c], W6q)
vist_sum([W6q, NPV6_na], flex6q, [1, -1])
feil_W6q = (1 - q6) * W6                                            # verdi 0 når rivalen kommer
# d) likegyldig sannsynlighet
qstar6 = (W6 - NPV6_na) / (W6 - W6c)
assert near(qstar6, 0.45)
assert near((1 - qstar6) * W6 + qstar6 * W6c, NPV6_na)
vist_sum([W6, NPV6_na], W6 - NPV6_na, [1, -1])
vist_sum([W6, W6c], W6 - W6c, [1, -1])
vist_sum([(1 - qstar6) * W6, qstar6 * W6c], NPV6_na)
feil_qstar6 = 1 - NPV6_na / W6                                      # med 0 i rivaltilfellet
assert near(feil_qstar6, 0.3375)
# e) retten varer to år: ingen ny informasjon i år 2
NPV6_H_vent = NPV6_H / (1 + r6)                                     # bygge ved t = 2, verdi ved t = 1
assert NPV6_H_vent < NPV6_H and NPV6_L < 0
W6_toar = W6                                                        # det ekstra året brukes aldri
vis("Oppgave 6", NPV_na=NPV6_na, NPV_H=NPV6_H, NPV_L=NPV6_L, W=W6, flex=flex6, feil_W=feil_W6,
    NPV_Hc=NPV6_Hc, Wc=W6c, Wq=W6q, flex_q=flex6q, qstar=qstar6, feil_qstar=feil_qstar6,
    H_vent=NPV6_H_vent)


# ======================================================================
#                              TEKSTENE
# ======================================================================
TR = "<tr>"
td = lambda x: f"<td class=\"n\">{x}</td>"

ex1 = {
    "n": 1, "title": "Payout policy", "points": 12, "topic": "Payout policy", "chapters": [15, 16],
    "body": (
        "<p>Hestnes Byggevarer, a mature listed company, has paid a dividend of NOK 10 per "
        "share for twelve years. It now cuts the dividend to NOK 4 and will spend the cash saved "
        "on share buybacks every year. Investment plans and earnings forecasts are unchanged.</p>"
        "<p>a) In perfect capital markets, is a shareholder who lives on the NOK 10 dividend worse "
        "off and why?</p>"
        "<p>b) The CFO expects the price to rise, since buybacks signal undervaluation; the CEO "
        "fears a fall. Who is more likely to be right and why?</p>"
        "<p>c) In this exercise the shareholders are individuals (taxed 35% on dividends, 20% on "
        "realised gains), tax-exempt pension funds and companies taxed lightly on dividends "
        "received but fully on gains. Which group gains, which loses and which does not care? How "
        "does the shareholder base change?</p>"
        "<p>2-3 sentences per part, 4 points each.</p>"
    ),
    "solution": (
        "<p>Three parts, 2-3 sentences each, 4 points each.</p>"
        "<p><b>a) She is not worse off:</b> in perfect markets a buyback at a fair price leaves the "
        "share price unchanged, so after the payout each share is worth NOK 6 more than after a "
        "NOK 10 dividend. By selling shares worth NOK 6 for each share she owns (or tendering her "
        "pro rata part) she has NOK 10 per share in cash as before (a homemade dividend) and "
        "keeps her fraction of the firm because the firm retires the same fraction of its "
        "shares.</p>"
        "<p><b>b) The CEO's fear is the more likely outcome.</b> Dividends are sticky: managers "
        "smooth them and cut them only when they expect lower cash flows for a long time "
        "(Kurbatov's GM example), so the first cut in twelve years is read as bad news about "
        "future earnings, whatever the board says. A buyback can signal that management thinks "
        "the shares are undervalued, but it commits the firm to nothing and can be stopped at any "
        "time, so it is a weaker signal than the cut and the price is likely to fall unless the "
        "board makes the undervaluation case credible (for example with insiders buying "
        "shares).</p>"
        "<p><b>c) Taxes and clienteles.</b> The individuals gain: NOK 6 of every NOK 10 now arrives "
        "as a capital gain taxed at 20% instead of a dividend taxed at 35%; the tax is also due "
        "only when they sell. The other companies lose, because they pay little tax on dividends but "
        "full tax on gains, while the tax-exempt pension funds do not care. Over time the "
        "companies (and investors who want a steady dividend) sell to taxable individuals: the "
        "change attracts a new clientele (Kurbatov: individuals prefer buybacks, companies prefer "
        "dividends, institutions are indifferent).</p>"
        "<p><b>Also accepted.</b> In b), the CFO can be right if investors trust the unchanged "
        "earnings forecasts and read the buyback as undervaluation: full marks when both signals "
        "are explained and the conclusion is reasoned. In a), noting that an investor who does "
        "not need cash simply keeps her shares and owns a larger fraction of the firm.</p>"
        "<p><b>Not accepted.</b> «Dividends are better because they are cash in hand» (the "
        "bird-in-the-hand argument): in a perfect market the NOK 6 in the share price is worth "
        "the same as NOK 6 in cash.</p>"
    ),
    "criteria": [
        "Three parts, 4 points each, graded separately. 2-3 sentences per part; a label without "
        "the mechanism earns at most half of a part.",
        "a) Not worse off: a fair buyback leaves the price unchanged, so the share keeps NOK 6 more "
        "of value; she sells shares worth NOK 6 per share (homemade dividend). «MM says payout is "
        "irrelevant» without how she gets her NOK 10 earns 2 of 4.",
        "a) (bonus) Selling her pro rata part keeps her fraction of the firm unchanged.",
        "b) The cut is bad news because dividends are sticky and smoothed (GM); the CFO's buyback "
        "signal is real but commits to nothing, so it is the weaker signal. A reasoned conclusion "
        "either way earns full marks when both arguments are weighed.",
        "c) Individuals gain (20% instead of 35% and the tax is deferred), companies lose (little "
        "tax on dividends, full tax on gains), pension funds do not care: 1 point each.",
        "c) 1 point for the clientele effect: the shareholder base shifts towards investors who "
        "prefer buybacks.",
        "No calculations are needed and none earn extra points.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "body": (
        "<p>Pemberton Foods Inc., a US-listed firm with dispersed ownership, has lagged its peers "
        "for five years. An activist hedge fund with 4% of the shares believes that selling a "
        "loss-making division and paying out the proceeds would raise the firm's value by about "
        "20%. The CEO refuses.</p>"
        "<p>a) Describe the fund's steps from its first contact with the board to a proxy "
        "contest.</p>"
        "<p>b) Who pays for a proxy contest on each side and why does that favour the "
        "incumbents?</p>"
        "<p>c) Every shareholder gains if the campaign succeeds. Explain the resulting free-rider "
        "problem and one way the fund can still make the campaign pay.</p>"
        "<p>2-3 sentences per part, 4 points each.</p>"
    ),
    "solution": (
        "<p>Three parts, 2-3 sentences each, 4 points each.</p>"
        "<p><b>a) The steps escalate.</b> The fund first writes to and meets the CEO and the board "
        "in private, with its analysis and its plan for the division. If the board refuses, it "
        "goes public with an open letter and a presentation, seeks the support of other "
        "institutions and of the proxy advisors (ISS, Glass Lewis) and can put a shareholder "
        "proposal on the agenda. As the last step it nominates its own candidates for some or all "
        "board seats and asks the other shareholders for their proxies, so that the annual meeting "
        "decides: the proxy contest, which is often settled before the vote with a few seats for "
        "the fund.</p>"
        "<p><b>b) Who pays.</b> The fund pays all its own costs (lawyers, proxy solicitors, "
        "mailings, advertising and research, often several million dollars) and gets them back "
        "only if it wins and the new board agrees to reimburse it. The incumbents defend "
        "themselves with the company's money, so every shareholder, the fund included, pays for "
        "management's campaign. Together with management's control of the meeting and the proxy "
        "materials and the many small shareholders who do not vote or vote with management, this "
        "tilts the contest towards the incumbents: most campaigns settle or fail.</p>"
        "<p><b>c) The free-rider problem.</b> The fund bears the whole cost of the campaign but "
        "receives only 4% of the gain, while the other 96% goes to shareholders who did nothing; "
        "since every small shareholder reasons the same way, none of them starts a campaign and "
        "there is too little monitoring. The fund can still make it pay by building its stake "
        "quietly before it must disclose it (in the US at 5%), so that it buys at the pre-campaign "
        "price and earns the price jump on every share it bought.</p>"
        "<p><b>Also accepted.</b> In a): a «just vote no» campaign against the directors, "
        "coordinated voting, or a tender offer as the last step. In b): staggered boards or "
        "supermajority rules that make it slower to replace the board. In c): the free-rider "
        "problem in voting (small holders do not vote at all); targeting firms where the gain is "
        "large relative to the cost; coordinating with institutions so that a vote can be won "
        "cheaply; settling early for board seats; winning the proxy advisors' support.</p>"
        "<p><b>Not accepted.</b> «Sell the shares» as the way to make the campaign pay: selling "
        "ends the campaign.</p>"
    ),
    "criteria": [
        "Three parts, 4 points each, graded separately; 2-3 sentences per part.",
        "a) At least three distinct escalating steps: private engagement with management and the "
        "board; going public (open letter, other institutions, proxy advisors, shareholder "
        "proposal); nominating directors and soliciting proxies (the proxy contest). Noting that "
        "most contests settle with board seats is a plus.",
        "b) The activist pays its own costs and is reimbursed at most if it wins; management "
        "fights with the company's money, so all shareholders, the activist included, pay for the "
        "defence. 2 points for the two sides, 2 points for why this favours the incumbents (cost "
        "asymmetry, control of the meeting, passive or loyal small holders).",
        "c) Free-rider problem: the fund bears all the costs but gets only its 4% of the gain, so "
        "small shareholders never act and there is too little activism. 2 points.",
        "c) One way to make it pay, with the mechanism, 2 points: buy the stake before disclosure "
        "at the pre-campaign price; coordinate with institutions; settle for board seats; win the "
        "proxy advisors' support.",
        "Any reasonable step, cost or remedy with an explanation is accepted, as in Kurbatov's "
        "keys.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
def tab3(rader, hoder):
    s = "<table class=\"data\"><tr>" + "".join(f"<th>{h}</th>" for h in hoder) + "</tr>"
    for r in rader:
        s += f"<tr><td>{r[0]}</td>" + "".join(td(x) for x in r[1:]) + "</tr>"
    return s + "</table>"


ex3 = {
    "n": 3, "title": "Debt and risk", "points": 18,
    "topic": "Risky debt, investment and renegotiation", "chapters": [9, 10],
    "body": (
        f"<p>Sandøy Rederi AS owns one bulk carrier and no cash. Its bank loan, face value NOK "
        f"{g(F3)} million, is due at t = 1, when the assets will be worth NOK {g(H3)} million if "
        f"freight rates are high (probability {pc(p3)}) and NOK {g(L3)} million if low; if Sandøy "
        "cannot repay in full, the bank takes the assets. Investors are risk neutral, the risk-free "
        "rate is 0% and management acts for the existing shareholders.</p>"
        f"<p>A retrofit costing NOK {g(I3)} million today would raise the value of the assets at "
        f"t = 1 by NOK {g(dV3)} million in both states.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": "<p>Find the values of the loan and the equity today, without the retrofit.</p>",
            "solution": (
                f"<p><b>Step 1. Payoffs at t = 1.</b> The bank gets min(V, {g(F3)}) and the "
                f"shareholders max(V − {g(F3)}, 0):</p>"
                + tab3([["High", pc(p3), g(H3), g(F3), g(H3 - F3)],
                        ["Low", pc(1 - p3), g(L3), g(L3), "0"]],
                       ["State", "Prob.", "Assets", "Loan", "Equity"]) +
                f"<p><b>Step 2. Values today</b> (risk neutral and r<sub>f</sub> = 0%, so value = "
                f"expected payoff):<br>D = {g(p3)} × {g(F3)} + {g(1 - p3)} × {g(L3)} = "
                f"{g(p3 * F3)} + {g((1 - p3) * L3)} = <b>NOK {g(D3a)} million</b><br>"
                f"E = {g(p3)} × {g(H3 - F3)} + {g(1 - p3)} × 0 = <b>NOK {g(E3a)} million</b></p>"
                f"<p><b>Check.</b> D + E = {g(D3a + E3a)} = {g(p3)} × {g(H3)} + {g(1 - p3)} × "
                f"{g(L3)}, the value of the assets (an identity: it catches arithmetic slips only). "
                f"The loan promises {g(F3)} but is worth {g(D3a)}: it is risky, which is what makes "
                "the rest of the exercise possible.</p>"
            ),
            "criteria": [
                f"D = {g(p3)} × {g(F3)} + {g(1 - p3)} × {g(L3)} = {g(D3a)} and E = {g(p3)} × "
                f"{g(H3 - F3)} = {g(E3a)}, NOK million, from the payoffs state by state.",
                f"Subtracting the face value from the expected asset value ({g(V3a)} − {g(F3)} = "
                f"{g(feil_E3a)}) is the classic error: limited liability makes the equity worth "
                f"{g(E3a)}.",
                f"The check D + E = {g(V3a)} is optional.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                f"<p>The {g(I3)} can only be raised with new shares sold at a fair price, giving "
                "new investors a fraction x of the equity. Find x. Will the "
                "existing shareholders approve the retrofit?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Payoffs with the retrofit.</b> The assets become {g(H3p)} or "
                f"{g(L3p)}. The loan still defaults in the low state ({g(L3p)} &lt; {g(F3)}):</p>"
                + tab3([["High", pc(p3), g(H3p), g(F3), g(H3p - F3)],
                        ["Low", pc(1 - p3), g(L3p), g(L3p), "0"]],
                       ["State", "Prob.", "Assets", "Loan", "Equity"]) +
                f"<p>Total equity with the retrofit: E′ = {g(p3)} × {g(H3p - F3)} = <b>{g(E3p)}</b>.</p>"
                f"<p><b>Step 2. The new shareholders' fraction.</b> They pay {g(I3)} for a fraction x "
                f"of equity worth {g(E3p)}: x × {g(E3p)} = {g(I3)}, so x = {g(I3)}/{g(E3p)} = "
                f"<b>{f(x3)}</b> ({f(100 * x3, 2)}%).</p>"
                f"<p><b>Step 3. The existing shareholders.</b> They keep (1 − x) × {g(E3p)} = "
                f"<b>NOK {g(gml3)} million</b>, against {g(E3a)} without the retrofit. <b>They "
                "reject it</b>, although its NPV is positive (part c).</p>"
                f"<p><b>Check.</b> (1 − x)E′ = E′ − I = {g(E3p)} − {g(I3)} = {g(E3p - I3)}: selling "
                f"fairly priced shares costs the existing shareholders exactly as much as paying the "
                f"{g(I3)} themselves (an identity). Paying it themselves would not change the "
                "decision.</p>"
            ),
            "criteria": [
                f"Equity with the retrofit = {g(p3)} × ({g(H3p)} − {g(F3)}) = {g(E3p)}; the loan still "
                "defaults in the low state.",
                f"x from the fair-price condition x × {g(E3p)} = {g(I3)}: x = {f(x3)}.",
                f"Existing shareholders keep (1 − x) × {g(E3p)} = {g(gml3)} < {g(E3a)}, so they "
                f"reject. The comparison with {g(E3a)}, not with 0, earns the decision point.",
                f"Using the equity without the retrofit (x = {g(I3)}/{g(E3a)} = {f(feil_x3)}) is the "
                "classic error.",
                f"(bonus) Paying the {g(I3)} themselves gives the same {g(E3p)} − {g(I3)} = "
                f"{g(gml3)}.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Find the NPV of the retrofit and its effect on the values of the loan and of "
                "the existing shareholders' stake. Who gains and why?</p>"
            ),
            "solution": (
                f"<p><b>NPV.</b> −{g(I3)} + {g(dV3)} = <b>NOK {g(NPV3)} million</b> (the extra "
                f"{g(dV3)} arrives for sure and r<sub>f</sub> = 0%).</p>"
                f"<p><b>Changes in value.</b> Loan: {g(p3)} × {g(F3)} + {g(1 - p3)} × {g(L3p)} = "
                f"{g(D3p)}, up <b>{g(dD3)}</b> from {g(D3a)}. Existing shareholders: {g(gml3)} − "
                f"{g(E3a)} = <b>{g(dE3)}</b>. The new shareholders pay {g(I3)} for shares worth "
                f"{g(x3 * E3p)} and gain nothing.</p>"
                f"<p><b>Who gains and why.</b> The bank gains more than the whole NPV and the existing "
                f"shareholders lose. In the low state (probability {pc(1 - p3)}) the extra {g(dV3)} "
                f"only raises what the bank recovers, from {g(L3)} to {g(L3p)}, so the bank captures "
                f"{g(1 - p3)} × {g(dV3)} = {g(dD3)} without paying anything; the shareholders pay the "
                f"full {g(I3)} but receive only {g(p3)} × {g(dV3)} = {g(eier_andel)} of the payoff. "
                "This is debt overhang: risky debt makes the shareholders turn down a positive-NPV "
                "project because most of its value goes to the creditors.</p>"
                f"<p><b>Check.</b> {g(dD3)} − {abs(dE3):g} + 0 = {g(NPV3)} = NPV: the project's value is "
                "split between the three groups (a decomposition: it catches slips only).</p>"
            ),
            "criteria": [
                f"NPV = {g(dV3)} − {g(I3)} = {g(NPV3)}.",
                f"Loan rises from {g(D3a)} to {g(D3p)} (+{g(dD3)}); existing shareholders fall from "
                f"{g(E3a)} to {g(gml3)} ({g(dE3)}).",
                f"Explanation: in the low state the extra value goes to the bank, so the bank "
                f"captures {g(dD3)} > NPV while the shareholders bear the whole cost: a wealth "
                "transfer to the creditors (debt overhang). Naming the effect without the "
                "mechanism earns at most half of the explanation.",
                f"(bonus) The decomposition {g(dD3)} − {abs(dE3):g} = {g(NPV3)}.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                f"<p>The bank offers to cut the face value to {g(F3r)} if the retrofit goes ahead, "
                "financed as in b). Do the existing shareholders approve? What do they and the "
                "bank gain compared with a)?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Payoffs with face value {g(F3r)}.</b> {g(L3p)} ≥ {g(F3r)}, so the "
                f"loan is now paid in full in both states: it is risk-free and worth <b>{g(D3r)}</b>. "
                f"Equity: {g(p3)} × ({g(H3p)} − {g(F3r)}) + {g(1 - p3)} × ({g(L3p)} − {g(F3r)}) = "
                f"{g(E3r_hoy)} + {g(E3r_lav)} = <b>{g(E3r)}</b>.</p>"
                f"<p><b>Step 2. Decision.</b> The new shareholders need x = {g(I3)}/{g(E3r)} = "
                f"{f(x3r)}; the existing shareholders keep {g(E3r)} − {g(I3)} = <b>{g(gml3r)} &gt; "
                f"{g(E3a)}</b>, so <b>they now approve the retrofit</b>.</p>"
                f"<p><b>Step 3. Gains compared with a).</b> Bank: {g(D3r)} − {g(D3a)} = "
                f"<b>+{g(gD3r)}</b>. Existing shareholders: {g(gml3r)} − {g(E3a)} = <b>+{g(gE3r)}</b>. "
                f"Both gain: the bank gives up {g(F3 - F3r)} of face value, but its claim is worth "
                "more because the smaller promise is now kept in both states.</p>"
                f"<p><b>Check.</b> {g(gD3r)} + {g(gE3r)} = {g(NPV3)} = NPV (a decomposition). "
                f"<b>Beyond the question.</b> The shareholders approve as long as {g(V3p)} − F′ − "
                f"{g(I3)} ≥ {g(E3a)}, so F′ ≤ {g(F3max)}; the bank accepts any F′ ≥ {g(F3min)}: "
                f"the bargaining range is {g(F3max)} − {g(F3min)} = {g(F3max - F3min)}, exactly the "
                "NPV.</p>"
            ),
            "criteria": [
                f"Loan risk-free at {g(F3r)} ({g(L3p)} ≥ {g(F3r)}); equity {g(p3)} × "
                f"{g(H3p - F3r)} + {g(1 - p3)} × {g(L3p - F3r)} = {g(E3r)}. 2 points. Forgetting the "
                f"low-state equity gives {g(feil_E3r)} and is the classic slip.",
                f"Existing shareholders: {g(E3r)} − {g(I3)} = {g(gml3r)} > {g(E3a)}, so they approve. "
                "1 point.",
                f"Gains: bank +{g(gD3r)}, existing shareholders +{g(gE3r)}. 1 point.",
                "(bonus) Why the bank accepts a lower face value: its claim becomes safe and is "
                "worth more.",
                f"(bonus) The gains sum to the NPV; the range {g(F3min)} ≤ F′ ≤ {g(F3max)}.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                f"<p>Return to the face value of {g(F3)}. If the bank waived its covenant against "
                f"senior debt, Sandøy could borrow the {g(I3)} from a new senior lender. Would the shareholders then retrofit and would "
                "the bank agree? Why do loan contracts contain such covenants?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The senior loan.</b> The lowest asset value with the retrofit is "
                f"{g(L3p)} ≥ {g(S3)}, so a senior loan of {g(S3)} is risk-free: Sandøy borrows "
                f"{g(S3)} with a face value of {g(S3)}. The bank's loan now ranks second.</p>"
                + tab3([["High", pc(p3), g(H3p), g(S3), g(F3), g(H3p - S3 - F3)],
                        ["Low", pc(1 - p3), g(L3p), g(S3), g(bank_lav_s), "0"]],
                       ["State", "Prob.", "Assets", "Senior", "Bank", "Equity"]) +
                f"<p>Bank: {g(p3)} × {g(F3)} + {g(1 - p3)} × {g(bank_lav_s)} = <b>{g(D3s)}</b> "
                f"(+{g(gD3s)} against {g(D3a)}). Equity: {g(p3)} × {g(H3p - S3 - F3)} = "
                f"<b>{g(E3s)}</b> (+{g(gE3s)} against {g(E3a)}). <b>The shareholders carry out the "
                "retrofit and the bank gains too</b>, so it would agree to waive the covenant for "
                f"this loan ({g(gD3s)} + {g(gE3s)} = {g(NPV3)} = NPV, an identity). An equally good "
                f"answer: the bank prefers the renegotiation in d), where its loan is worth "
                f"{g(D3r)} &gt; {g(D3s)}, so it may refuse the waiver and offer d) instead.</p>"
                "<p><b>Why such covenants exist.</b> Without them the shareholders could issue new "
                "senior debt at any time to pay themselves a dividend or to fund a risky project, "
                "diluting the existing creditors' claim. Lenders anticipate this and would charge a "
                "higher rate when they lend, so a covenant that forbids senior debt lowers the cost "
                "of borrowing ex ante; the price is that it can block good projects later, as here, "
                "unless the lender waives it, which is easy with one bank and hard with dispersed "
                "bondholders.</p>"
                f"<p><b>Beyond the question.</b> An unlimited waiver would be dangerous for the bank: "
                f"Sandøy could borrow {g(S3max)} senior (still risk-free), spend {g(I3)} on the "
                f"retrofit and pay out {g(utbet3)}, which leaves the bank's loan worth {g(p3)} × "
                f"{g(F3)} = {g(D3u)}.</p>"
            ),
            "criteria": [
                f"The senior loan is risk-free ({g(L3p)} ≥ {g(S3)}), so the {g(S3)} is borrowed at "
                f"face value {g(S3)}.",
                f"Bank (now junior): {g(p3)} × {g(F3)} + {g(1 - p3)} × {g(bank_lav_s)} = {g(D3s)}; "
                f"equity: {g(p3)} × {g(H3p - S3 - F3)} = {g(E3s)}. Shareholders carry out the "
                f"retrofit ({g(E3s)} > {g(E3a)}) and the bank agrees ({g(D3s)} > {g(D3a)}). «The "
                f"bank prefers the renegotiation in d)» ({g(D3r)} > {g(D3s)}) is equally correct.",
                f"Giving the bank {g(L3p)} in the low state (forgetting that the senior lender is "
                f"paid first, D = {g(feil_D3s)}) is the classic error.",
                "Covenants: without them shareholders could dilute existing creditors with new "
                "senior debt (to fund payouts or risky projects); lenders would price this in, so "
                "the covenant lowers the cost of debt ex ante. About 2 points; any reasonable "
                "explanation of claim dilution is accepted.",
                "(bonus) The cost of the covenant is lost flexibility; an unlimited waiver would let "
                f"the shareholders borrow {g(S3max)} senior and pay out {g(utbet3)}, leaving the bank "
                f"{g(D3u)}.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
ex4 = {
    "n": 4, "title": "Valuation", "points": 18,
    "topic": "Permanent debt, APV and WACC", "chapters": [4, 7, 18, 19],
    "body": (
        f"<p>A private-equity fund plans to buy Nordvarme AS, an unlisted district-heating firm "
        f"with EBIT of NOK {g(EBIT4)} million a year forever; capital expenditure equals "
        f"depreciation and working capital is constant. The tax rate is {pc(tau4)} and the fund's "
        f"analysts put the unlevered cost of capital at {pc(rU4)}. After the purchase "
        f"Nordvarme will have NOK {g(D4)} million of permanent, risk-free debt at {pc(rf4)}, the "
        f"risk-free rate. The expected market return is {pc(rm4)}. Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": (
                "<p>Find Nordvarme's free cash flow and its all-equity value.</p>"
            ),
            "solution": (
                f"<p><b>Free cash flow.</b> Capital expenditure equals depreciation and working "
                f"capital is constant, so FCF = EBIT(1 − τ) = {g(EBIT4)} × {g(1 - tau4)} = <b>NOK "
                f"{g(FCF4)} million</b> a year. Interest is not deducted: FCF belongs to all "
                "investors.</p>"
                f"<p><b>Unlevered value.</b> A perpetuity without growth at r<sub>U</sub>: "
                f"V<sup>U</sup> = {g(FCF4)}/{g(rU4)} = <b>NOK {g(VU4)} million</b>.</p>"
            ),
            "criteria": [
                f"FCF = {g(EBIT4)} × (1 − {g(tau4)}) = {g(FCF4)}, with no interest deducted.",
                f"V^U = {g(FCF4)}/{g(rU4)} = {g(VU4)}, a perpetuity without growth.",
                "Discounting EBIT before tax, or using a WACC here, is the error: V^U is the "
                "all-equity value at r_U.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                "<p>Find the present value of the interest tax shield, stating the rate and why. "
                "Find Nordvarme's levered value by APV and the value of its equity.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The tax shield each year.</b> Interest = {pc(rD4)} × {g(D4)} = "
                f"{g(int4)}; tax shield = {pc(tau4)} × {g(int4)} = <b>{g(TS4)}</b> a year "
                "forever.</p>"
                f"<p><b>Step 2. Discount at r<sub>D</sub> = {pc(rD4)}.</b> The debt is a fixed, "
                "permanent amount, so the interest and the tax saving are as certain as the debt "
                "payments themselves (given taxable profits): they do not move with Nordvarme's "
                f"business risk. PV(TS) = {g(TS4)}/{g(rD4)} = <b>NOK {g(PVTS4)} million</b> = τD = "
                f"{g(tau4)} × {g(D4)}.</p>"
                f"<p><b>Step 3. APV.</b> V<sup>L</sup> = {g(VU4)} + {g(PVTS4)} = <b>NOK {g(VL4)} "
                f"million</b>; E = {g(VL4)} − {g(D4)} = <b>NOK {g(E4)} million</b>.</p>"
                f"<p>Discounting the tax shield at r<sub>U</sub> would give {g(TS4)}/{g(rU4)} = "
                f"{g(PVTS4_feil)} and V<sup>L</sup> = {g(VL4_feil_b)}: that is the treatment for "
                "debt that moves with firm value (part e), not for a fixed amount.</p>"
            ),
            "criteria": [
                f"Tax shield {g(tau4)} × {g(rD4)} × {g(D4)} = {g(TS4)} a year; PV(TS) = "
                f"{g(TS4)}/{g(rD4)} = {g(PVTS4)} = τD. 1 point.",
                f"Rate r_D = {pc(rD4)} with the reason: a fixed permanent amount of debt makes the "
                "tax shields as safe as the interest payments. 1 point, only with the reason.",
                f"V^L = {g(VU4)} + {g(PVTS4)} = {g(VL4)} and E = {g(VL4)} − {g(D4)} = {g(E4)}. 1 point "
                "each.",
                f"Discounting the tax shield at r_U (PV {g(PVTS4_feil)}, V^L {g(VL4_feil_b)}) loses the "
                "rate point; later parts are graded on the student's own numbers.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Find Nordvarme's cost of equity and after-tax WACC and value it with the WACC "
                "method.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Cost of equity.</b> The shareholders receive FCF minus after-tax "
                f"interest; the debt is constant, so there is no net borrowing: FCFE = {g(FCF4)} − "
                f"(1 − {g(tau4)}) × {g(int4)} = {g(FCF4)} − {g(etter_rente4)} = {g(FCFE4)}. As a "
                f"perpetuity, r<sub>E</sub> = FCFE/E = {g(FCFE4)}/{g(E4)} = <b>{pc(rE4)}</b>.<br>"
                f"The same from MM II with permanent debt: r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − "
                f"τ)(r<sub>U</sub> − r<sub>D</sub>) = {pc(rU4)} + ({g(D4)}/{g(E4)})({g(1 - tau4)})"
                f"({pc(rU4 - rD4)}) = {pc(rU4)} + {pc(tillegg4)} = {pc(rE4)}.</p>"
                f"<p><b>Step 2. WACC.</b> r<sub>wacc</sub> = [E × r<sub>E</sub> + D × r<sub>D</sub>(1 − "
                f"τ)]/V<sup>L</sup> = ({g(E4)} × {pc(rE4)} + {g(D4)} × {pc(rD4)} × {g(1 - tau4)})/"
                f"{g(VL4)} = ({g(E4 * rE4)} + {g(D4 * rD4 * (1 - tau4))})/{g(VL4)} = "
                f"<b>{pc(rw4)}</b>.<br>Equivalently r<sub>wacc</sub> = r<sub>U</sub>(1 − "
                f"τD/V<sup>L</sup>) = {pc(rU4)} × (1 − {g(PVTS4)}/{g(VL4)}) = {pc(rw4)}, as in PS2 "
                "E9.</p>"
                f"<p><b>Step 3. WACC method.</b> V<sup>L</sup> = {g(FCF4)}/{f(rw4, 6)} = <b>NOK "
                f"{g(FCF4 / rw4)} million</b>, the APV value.</p>"
                f"<p><b>Check.</b> The two routes to r<sub>E</sub> must agree; that check can "
                f"fail: MM II without (1 − τ), r<sub>E</sub> = {pc(rU4)} + ({g(D4)}/{g(E4)})"
                f"({pc(rU4 - rD4)}) = {pc(rE4_feil)}, gives r<sub>wacc</sub> = {pc(rw4_feil)} and "
                f"V<sup>L</sup> = {f(VL4_feil)}, which misses the APV value. If r<sub>E</sub> was "
                f"taken as FCFE/E, the agreement of the WACC value with APV is an identity (both rest "
                f"on E = {g(E4)}). With no growth the fixed debt keeps D/V at {g(D4)}/{g(VL4)} "
                "forever, which is why a single WACC works here; solving V<sup>L</sup> = "
                "FCF/[r<sub>U</sub>(1 − τD/V<sup>L</sup>)] without APV gives V<sup>L</sup> = "
                f"FCF/r<sub>U</sub> + τD = {g(VL4_sys)}.</p>"
            ),
            "criteria": [
                f"r_E = {pc(rE4)}, from FCFE/E = {g(FCFE4)}/{g(E4)} or from r_U + (D/E)(1 − τ)(r_U − "
                "r_D). Either route earns full marks.",
                f"r_wacc = ({g(E4 * rE4)} + {g(D4 * rD4 * (1 - tau4))})/{g(VL4)} = {pc(rw4)}, or "
                f"r_U(1 − τD/V^L) = {pc(rU4)} × (1 − {g(PVTS4)}/{g(VL4)}).",
                f"V^L = {g(FCF4)}/{f(rw4, 6)} = {g(VL4)}, the same as APV.",
                f"Classic error: MM II without (1 − τ) gives r_E = {pc(rE4_feil)} and V^L = "
                f"{f(VL4_feil)} ≠ {g(VL4)}; reporting the mismatch without fixing it loses the r_E "
                "point.",
                "Deducting interest from FCF before discounting at r_wacc counts the tax shield "
                "twice.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Fjordvarme ASA, a listed firm with the same business risk and tax rate, also "
                "has a fixed, "
                f"permanent amount of risk-free debt: equity NOK {g(Ec4)} million, debt NOK "
                f"{g(Dc4)} million, equity beta {g(bEc4)}. Estimate the unlevered cost of capital "
                f"from these data. Is the analysts' {pc(rU4)} consistent with it?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Fjordvarme's cost of equity.</b> r<sub>E</sub> = {pc(rf4)} + "
                f"{g(bEc4)} × ({pc(rm4)} − {pc(rf4)}) = <b>{pc(rEc4)}</b>.</p>"
                f"<p><b>Step 2. Unlever with D(1 − τ) weights.</b> Fjordvarme's debt is fixed and "
                "permanent, so its tax shield τD is as safe as the debt: from V<sup>U</sup> + τD = "
                "E + D, the unlevered assets equal E + D(1 − τ) (Kurbatov, lecture 8, slide 18). With "
                f"D(1 − τ) = {g(Dc4)} × {g(1 - tau4)} = {g(Dnet4)}:<br>"
                f"r<sub>U</sub> = ({g(Ec4)} × {pc(rEc4)} + {g(Dnet4)} × {pc(rD4)})/({g(Ec4)} + "
                f"{g(Dnet4)}) = ({g(Ec4 * rEc4)} + {g(Dnet4 * rD4)})/{g(Ec4 + Dnet4)} = "
                f"<b>{pc(rUc4)}</b><br>(or β<sub>U</sub> = ({g(Ec4)}/{g(Ec4 + Dnet4)}) × {g(bEc4)} = "
                f"{g(bUc4)} and r<sub>U</sub> = {pc(rf4)} + {g(bUc4)} × {pc(mrp4)} = {pc(rUc4)}).</p>"
                f"<p><b>Conclusion.</b> <b>The analysts' {pc(rU4)} is consistent</b> with "
                "Fjordvarme's market data.</p>"
                f"<p><b>Classic error.</b> The usual weights E/V and D/V give "
                f"({g(Ec4 * rEc4)} + {g(Dc4 * rD4)})/{g(Ec4 + Dc4)} = {pc(rUc4_feil)}, which would "
                f"wrongly suggest that {pc(rU4)} is too high. Those weights assume debt that is "
                "rebalanced with firm value; they do not fit a fixed amount of debt. The β route and "
                "the return route are the same calculation (CAPM is linear), so doing both is not a "
                "check.</p>"
            ),
            "criteria": [
                f"r_E = {pc(rf4)} + {g(bEc4)} × {pc(mrp4)} = {pc(rEc4)} for Fjordvarme.",
                f"Weights with D(1 − τ) because the debt is fixed and permanent: r_U = "
                f"({g(Ec4 * rEc4)} + {g(Dnet4 * rD4)})/{g(Ec4 + Dnet4)} = {pc(rUc4)}, or β_U = "
                f"{g(bUc4)}. Consistent with {pc(rU4)}.",
                f"Using E/V and D/V ({pc(rUc4_feil)}) and concluding that {pc(rU4)} is too high is "
                "the classic error: at most 2 of 4 if the arithmetic is right.",
                "One phrase of reason: the tax shield of fixed debt is safe, so the equity's risk "
                "depends on the debt net of the tax shield.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Suppose Nordvarme instead kept debt at a constant fraction of firm value, "
                "rebalanced yearly. Without calculations, would the tax shield be worth more or less "
                "than in b) and why?</p>"
            ),
            "solution": (
                "<p><b>Less.</b> With a fixed, permanent amount of debt the interest and the tax "
                f"shields are known in advance and as safe as the debt, so they are discounted at "
                f"r<sub>D</sub> = {pc(rD4)}. If Nordvarme keeps its debt at a constant fraction of firm "
                "value, the debt and the tax shields rise and fall with the value of the business: "
                f"they carry the firm's business risk and are discounted at r<sub>U</sub> = {pc(rU4)}. "
                "The same expected tax savings are then worth less.</p>"
                f"<p><b>Beyond the question.</b> Starting from the same debt of {g(D4)} and "
                f"discounting its tax shield at r<sub>U</sub>: {g(TS4)}/{g(rU4)} = {g(PVTS4_feil)}. "
                f"Keeping instead D/V = {g(D4)}/{g(VL4)} = {f(d4)}: "
                f"r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τr<sub>D</sub> = {pc(rU4)} − {f(d4)} × "
                f"{g(tau4)} × {pc(rD4)} = {pc(rw4_dv)}, V<sup>L</sup> = {g(FCF4)}/{f(rw4_dv, 7)} = "
                f"{f(VL4_dv)} and PV(TS) = {f(PVTS4_dv)} against {g(PVTS4)}. This is the number "
                "from the classic error in c): MM II without (1 − τ) is the formula for debt kept at "
                "a constant D/V.</p>"
            ),
            "criteria": [
                "Answer: less (1 point).",
                f"Reason: fixed debt makes the tax shields as safe as the debt (r_D); debt kept at a "
                "constant D/V moves with firm value, so the tax shields carry business risk and are "
                f"discounted at r_U = {pc(rU4)} > r_D (3 points).",
                "«More, because the debt grows with the firm» is wrong: there is no growth, so "
                "expected debt stays the same.",
                f"(bonus) PV(TS) = {g(PVTS4_feil)} (the same {g(D4)} of debt with r_U) or "
                f"{f(PVTS4_dv)} (the same initial D/V), against {g(PVTS4)}. Both are accepted.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Options", "points": 20,
    "topic": "Debt and equity as options, binomial model", "chapters": [5, 9, 21, 22, 24],
    "body": (
        f"<p>Havgløtt Vind AS owns one offshore wind farm, worth NOK {g(V5)} million today and NOK "
        f"{g(Vu5)} million (high power prices) or NOK {g(Vd5)} million (low) in one year. Its only "
        f"debt is a one-year zero-coupon bond with face value NOK {g(K5)} million; no dividend "
        f"is paid before it matures. The risk-free rate is {pc(rf5)}. Treat the farm as a traded "
        f"asset in a perfect market. Analysts put the probability of high prices at {pc(p5)}. Use "
        "4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>Find the risk-neutral probability of the high state. How does it compare with "
                f"the analysts' {pc(p5)} and why?</p>"
            ),
            "solution": (
                f"<p><b>Risk-neutral probability.</b> ρ makes the farm earn the risk-free rate in "
                f"expectation: {g(V5)} = [ρ × {g(Vu5)} + (1 − ρ) × {g(Vd5)}]/{g(1 + rf5)}, so<br>"
                f"ρ = ({g(1 + rf5)} × {g(V5)} − {g(Vd5)})/({g(Vu5)} − {g(Vd5)}) = "
                f"{g((1 + rf5) * V5 - Vd5)}/{g(Vu5 - Vd5)} = <b>{f(rho5)}</b>.</p>"
                f"<p><b>Comparison.</b> ρ is <b>lower than the analysts' {pc(p5)}</b>. With "
                f"{pc(p5)} the farm's expected value next year is {g(p5)} × {g(Vu5)} + {g(1 - p5)} × "
                f"{g(Vd5)} = {g(EV5_real)}, an expected return of {pc(er5_real)}: investors demand a "
                "risk premium for the farm's market risk, so its price is below the expected payoff "
                "discounted at r<sub>f</sub>. ρ moves weight to the low state until discounting at "
                f"r<sub>f</sub> gives the market price; the analysts' {pc(p5)} would need the "
                f"risk-adjusted rate of {pc(er5_real)} instead.</p>"
            ),
            "criteria": [
                f"ρ = ({g(1 + rf5)} × {g(V5)} − {g(Vd5)})/({g(Vu5)} − {g(Vd5)}) = {f(rho5)}.",
                f"ρ < {g(p5)} because investors are risk averse: the risk premium is built into ρ, "
                "which puts more weight on the bad state.",
                f"(bonus) The real expected return {g(EV5_real)}/{g(V5)} − 1 = {pc(er5_real)} against "
                f"{pc(rf5)} under ρ.",
                f"Valuing with {pc(p5)} and r_f is the error to avoid in the rest of the exercise.",
            ],
        },
        {
            "label": "b", "points": 8,
            "body": (
                "<p>Value the equity as a call on the farm by replicating its payoff with the farm "
                "and risk-free bonds. Then value the debt as farm minus equity and as risk-free debt "
                "minus a put on the farm, priced by put-call parity.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Payoffs.</b> The equity is a call on the farm with strike K = "
                f"{g(K5)}, the face value: max(V − {g(K5)}, 0) = <b>{g(Eu5)}</b> in the high state "
                "and <b>0</b> in the low state.</p>"
                f"<p><b>Step 2. Replicate the equity.</b> Hold Δ of the farm and B in risk-free "
                f"bonds:<br>Δ × {g(Vu5)} + {g(1 + rf5)}B = {g(Eu5)} and Δ × {g(Vd5)} + "
                f"{g(1 + rf5)}B = 0<br>Δ = ({g(Eu5)} − 0)/({g(Vu5)} − {g(Vd5)}) = <b>{f(Delta5)}</b>; "
                f"B = −{f(Delta5)} × {g(Vd5)}/{g(1 + rf5)} = <b>{f(B5)}</b> (borrow {f(-B5)} at "
                f"{pc(rf5)}).<br>E = Δ × {g(V5)} + B = {f(Delta5 * V5)} − {f(-B5)} = <b>NOK "
                f"{f(E5)} million</b>.</p>"
                f"<p><b>Check.</b> With ρ: E = {f(rho5)} × {g(Eu5)}/{g(1 + rf5)} = {f(E5_rho)} ✓. "
                "Replication and ρ are the same model in two forms, so this is an identity that "
                "catches arithmetic slips only.</p>"
                f"<p><b>Step 3. Debt as farm minus equity.</b> D = V − E = {g(V5)} − {f(E5)} = "
                f"<b>NOK {f(D5)} million</b>.</p>"
                f"<p><b>Step 4. Debt as risk-free debt minus a put.</b> PV(K) = {g(K5)}/{g(1 + rf5)} "
                f"= {f(PVK5)}. Put-call parity on the farm, C + PV(K) = V + P, with C = E:<br>"
                f"P = {f(E5)} + {f(PVK5)} − {g(V5)} = <b>{f(P5)}</b><br>"
                f"D = PV(K) − P = {f(PVK5)} − {f(P5)} = <b>{f(D5_put)}</b>, the same as in Step 3.</p>"
                "<p><b>Check.</b> The agreement of Steps 3 and 4 is an identity (parity says V = C + "
                "PV(K) − P), so it catches slips only. The check that can fail is to price the put "
                f"directly: it pays {g(K5)} − {g(Vd5)} = {g(K5 - Vd5)} in the low state, so P = "
                f"(1 − {f(rho5)}) × {g(K5 - Vd5)}/{g(1 + rf5)} = {f(P5_rho)} ✓.</p>"
                f"<p><b>Interpretation.</b> The creditors hold a risk-free claim on {g(K5)} and have "
                "sold the shareholders a put on the farm: the right to hand over the assets instead "
                f"of paying, which is limited liability. It is worth {f(P5)}, the difference between "
                "risk-free and risky debt.</p>"
            ),
            "criteria": [
                f"Equity payoffs {g(Eu5)} and 0: a call with strike {g(K5)}. 1 point.",
                f"Δ = {g(Eu5)}/{g(Vu5 - Vd5)} = {f(Delta5)} and B = {f(B5)} (borrowing), from the two "
                "replication equations. 2 points.",
                f"E = {f(Delta5)} × {g(V5)} − {f(-B5)} = {f(E5)}. 1 point. Pricing with ρ alone "
                "earns this point but not the replication points the question asks for.",
                f"D = {g(V5)} − {f(E5)} = {f(D5)}. 1 point.",
                f"Parity: P = C + PV(K) − V = {f(P5)} with PV(K) = {g(K5)}/{g(1 + rf5)} = "
                f"{f(PVK5)}; D = PV(K) − P = {f(D5_put)}. 3 points.",
                "(bonus) What the put is: the shareholders' option to default, sold by the "
                "creditors.",
                f"Using K = {g(K5)} undiscounted in parity (P = {f(feil_P5_K)}), or the analysts' "
                f"{pc(p5)} with r_f (E = {f(feil_E5_real)}), is the classic error.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": (
                "<p>Find the promised yield, the credit spread and the default probability implied "
                "by the debt's price. Find the expected return on the debt under the analysts' "
                "probabilities and explain the gap to the yield.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Promised yield and spread.</b> The debt costs {f(D5)} and promises "
                f"{g(K5)}: y = {g(K5)}/{f(D5)} − 1 = <b>{pc(y5)}</b>. Credit spread = {pc(y5)} − "
                f"{pc(rf5)} = <b>{f(100 * spread5)} percentage points</b> (about "
                f"{f(10000 * spread5, 0)} basis points).</p>"
                f"<p><b>Step 2. Implied (risk-neutral) default probability.</b> The debt defaults "
                f"only in the low state, where the creditors get the farm worth {g(Vd5)}. Solve "
                f"{f(D5)} = [(1 − q) × {g(K5)} + q × {g(Vd5)}]/{g(1 + rf5)}: q = ({g(K5)} − "
                f"{f(D5_fv)})/{g(K5 - Vd5)} = <b>{f(q5)}</b> ({f(100 * q5, 2)}%), which is 1 − ρ, as "
                "it must be. The shortcut spread ≈ q × LGD, with LGD = "
                f"{g(K5 - Vd5)}/{g(K5)} = {f(100 * LGD5, 2)}%, gives q ≈ {f(100 * spread5)}%/"
                f"{f(100 * LGD5, 2)}% = {f(q5_tilnaerm)}: close but too high, because it ignores that "
                f"the exact relation is 1 + y = (1 + r<sub>f</sub>)/(1 − q × LGD).</p>"
                f"<p><b>Step 3. Expected return.</b> Under the analysts' probabilities the expected "
                f"payoff is {g(p5)} × {g(K5)} + {g(1 - p5)} × {g(Vd5)} = {g(ED5)}, so the expected "
                f"return on the debt is {g(ED5)}/{f(D5)} − 1 = <b>{pc(erD5)}</b>.</p>"
                f"<p><b>The gap.</b> The promised {pc(y5)} is earned only if Havgløtt does not "
                f"default; on average the creditors earn {pc(erD5)}. Of the spread of "
                f"{f(100 * spread5)} points, {f(100 * tap5)} points compensate for the expected loss "
                f"in default and {f(100 * premie5)} points are a risk premium, because the debt loses "
                "in the low state, when power prices and the market are bad. The same premium is why "
                f"the implied default probability ({f(100 * q5, 2)}%) exceeds the analysts' "
                f"{pc(1 - p5)}: risk-neutral probabilities include it.</p>"
            ),
            "criteria": [
                f"Yield {g(K5)}/{f(D5)} − 1 = {pc(y5)}, spread {f(100 * spread5)} points over "
                f"{pc(rf5)}.",
                f"Implied default probability from the debt price: q = {f(q5)} (= 1 − ρ). Writing "
                "1 − ρ directly, with the reason that default happens exactly in the low state, is "
                f"accepted. The shortcut spread/LGD = {f(q5_tilnaerm)} is accepted when it is "
                "called an approximation.",
                f"Expected return on the debt: {g(ED5)}/{f(D5)} − 1 = {pc(erD5)}.",
                "Explanation: the promised yield exceeds the expected return because of expected "
                "default losses; the rest of the spread is a risk premium. 1-2 sentences.",
                f"(bonus) The implied {f(100 * q5, 2)}% exceeds the real {pc(1 - p5)} because "
                "risk-neutral probabilities carry the risk premium.",
                "Calling the promised yield the expected return on the debt is the classic error.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Management can cancel the farm's fixed-price power contract for a fee and sell "
                "at spot prices. Treat the switched farm as a new traded asset, worth NOK "
                f"{g(V5n)} million after the fee and NOK {g(Vu5n)} million or NOK {g(Vd5n)} million in "
                "one year. Find the new values of "
                "equity and debt. Would the shareholders want the switch and why?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. A new tree means a new ρ.</b> ρ′ = ({g(1 + rf5)} × {g(V5n)} − "
                f"{g(Vd5n)})/({g(Vu5n)} − {g(Vd5n)}) = {g((1 + rf5) * V5n - Vd5n)}/{g(Vu5n - Vd5n)} = "
                f"<b>{f(rho5n)}</b>, from the new asset's price as the exercise instructs.</p>"
                f"<p><b>Step 2. New values.</b> The equity pays {g(Vu5n)} − {g(K5)} = "
                f"{g(Vu5n - K5)} or 0: E′ = {f(rho5n)} × {g(Vu5n - K5)}/{g(1 + rf5)} = <b>NOK "
                f"{f(E5n)} million</b>. Debt: D′ = {g(V5n)} − {f(E5n)} = <b>NOK {f(D5n)} "
                f"million</b> (directly: ({f(rho5n)} × {g(K5)} + {f(1 - rho5n)} × {g(Vd5n)})/"
                f"{g(1 + rf5)} = {f(D5n_rho)} ✓).</p>"
                "<table class=\"data\"><tr><th>NOK million</th><th>Before</th><th>After</th>"
                "<th>Change</th></tr>"
                f"<tr><td>Farm</td>{td(g(V5))}{td(g(V5n))}{td(g(V5n - V5))}</tr>"
                f"<tr><td>Equity</td>{td(f(E5))}{td(f(E5n))}{td('+' + f(dE5))}</tr>"
                f"<tr><td>Debt</td>{td(f(D5))}{td(f(D5n))}{td(f(dD5))}</tr></table>"
                f"<p><b>Step 3. The shareholders want the switch</b>, although it destroys NOK "
                f"{g(V5 - V5n)} million of value. Equity is a call on the farm; a call is worth "
                "more when the underlying is riskier: the shareholders keep the extra upside while "
                "limited liability caps their loss at zero. The creditors are short the put, which "
                f"rises from {f(P5)} to {f(PVK5)} − {f(D5n)} = {f(P5n)}, so they lose {f(-dD5)}, "
                "more than the fall in firm value: risk shifting from the creditors to the "
                "shareholders.</p>"
                "<p><b>Also accepted.</b> Both trees have the same two states (high and low power "
                "prices), so a student may instead use the state prices of the original tree "
                f"(ρ = {f(rho5)}): the switched farm is then worth {f(V5alt)} before the fee, with "
                f"E′ = {f(E5alt)} and D′ = {f(D5alt)}. The shareholders gain {f(dE5alt)} and the "
                f"creditors lose {f(-dD5alt)}: the same conclusion. The exercise tells you to treat "
                f"the farm as a new asset worth {g(V5n)}, so the main answer uses ρ′.</p>"
            ),
            "criteria": [
                f"ρ′ = {f(rho5n)} from the new asset worth {g(V5n)}, as instructed. Using the "
                f"original state prices (ρ = {f(rho5)}: E′ = {f(E5alt)}, D′ = {f(D5alt)}) is "
                "accepted when the student says why (the same two states).",
                f"E′ = {f(rho5n)} × {g(Vu5n - K5)}/{g(1 + rf5)} = {f(E5n)} and D′ = {g(V5n)} − "
                f"{f(E5n)} = {f(D5n)}.",
                f"Yes: the shareholders gain {f(dE5)} although the firm loses {g(V5 - V5n)}; the "
                f"creditors lose {f(-dD5)}.",
                "Why, with the option view: equity is a call that gains from volatility (limited "
                "liability); the creditors are short a put that becomes more valuable. Any correct "
                "statement of the mechanism (risk shifting to the creditors) earns the points.",
                f"(bonus) The put rises from {f(P5)} to {f(P5n)}.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
ex6 = {
    "n": 6, "title": "Real Options", "points": 20, "topic": "Real options", "chapters": [25],
    "body": (
        "<p>You hold an exclusive right to build a truck-charging hub for NOK "
        f"{g(I6)} million. From one year after it is built, it pays NOK {g(CH6)} million a year "
        f"forever if demand is high and NOK {g(CL6)} million if low (equal probability). Demand is revealed at the end of Year 1 whether you have built or not "
        "and never changes. Demand risk is not systematic: discount at the risk-free rate of "
        f"{pc(r6)}. You can build now or at the end of Year 1; then the right expires. Use 4 "
        "decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is the NPV of building now?</p>",
            "solution": (
                f"<p>Built now, the hub pays from the end of Year 1 and the expected cash flow is "
                f"{g(p6)} × {g(CH6)} + {g(1 - p6)} × {g(CL6)} = {g(EC6)} a year forever:<br>"
                f"NPV = −{g(I6)} + {g(EC6)}/{g(r6)} = −{g(I6)} + {g(EC6 / r6)} = <b>NOK "
                f"{g(NPV6_na)} million</b>.</p>"
                "<p>Building now is profitable, but a positive NPV does not yet say that now is the "
                "best time to build (part b).</p>"
            ),
            "criteria": [
                f"Expected cash flow {g(EC6)} a year; NPV = −{g(I6)} + {g(EC6)}/{g(r6)} = "
                f"{g(NPV6_na)}.",
                f"Discount at r_f = {pc(r6)} because the demand risk is not systematic, as the "
                "exercise states.",
                "A positive NPV alone does not settle the timing.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                "<p>Find the NPV today of waiting a year to decide and the value of this "
                "flexibility over building now. Do you build now or wait?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The decision at the end of Year 1.</b> Building then gives a "
                f"perpetuity from Year 2, valued at Year 1:<br>High demand: −{g(I6)} + "
                f"{g(CH6)}/{g(r6)} = <b>{g(NPV6_H)}</b>: build.<br>Low demand: −{g(I6)} + "
                f"{g(CL6)}/{g(r6)} = <b>{g(NPV6_L)}</b>: do not build, so the value is 0, not "
                f"{g(NPV6_L)}.</p>"
                f"<p><b>Step 2. NPV of waiting today.</b> ({g(p6)} × {g(NPV6_H)} + {g(1 - p6)} × "
                f"0)/{g(1 + r6)} = <b>NOK {f(W6)} million</b>.</p>"
                f"<p><b>Step 3. Value of the flexibility.</b> {f(W6)} − {g(NPV6_na)} = <b>NOK "
                f"{f(flex6)} million</b>. <b>Wait.</b> Waiting costs one year of cash flow (expected "
                f"{g(EC6)}) and delays the project, but it lets you avoid building into low demand, "
                f"where the hub is worth {g(NPV6_L)}.</p>"
            ),
            "criteria": [
                f"NPV at the end of Year 1: {g(NPV6_H)} with high demand; {g(NPV6_L)} with low "
                "demand, where you do not build (value 0).",
                f"NPV of waiting = {g(p6)} × {g(NPV6_H)}/{g(1 + r6)} = {f(W6)}.",
                f"Value of the flexibility = {f(W6)} − {g(NPV6_na)} = {f(flex6)}; decision: wait.",
                f"Keeping {g(NPV6_L)} in the low state gives {f(feil_W6)} < {g(NPV6_na)} and the "
                "wrong decision: the classic error (compare with 0).",
                "Discounting the Year-1 values twice, or not at all, loses 1 point.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>If you have not built by the end of Year 1, a rival opens next to you then with "
                f"probability {pc(q6)} (independent of demand), before you decide; your cash flows "
                f"would then fall to {pc(s6)}. Building now keeps the rival out. What is the "
                "NPV of waiting? Do you build now or wait?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. If the rival enters.</b> Your cash flows become {g(CH6c)} or "
                f"{g(CL6c)}. At the end of Year 1: high demand −{g(I6)} + {g(CH6c)}/{g(r6)} = "
                f"<b>{g(NPV6_Hc)}</b>: still build; low demand −{g(I6)} + {g(CL6c)}/{g(r6)} = "
                f"{g(NPV6_Lc)}: do not build. Value today: {g(p6)} × {g(NPV6_Hc)}/{g(1 + r6)} = "
                f"<b>{f(W6c)}</b>.</p>"
                f"<p><b>Step 2. NPV of waiting.</b> {g(1 - q6)} × {f(W6)} + {g(q6)} × {f(W6c)} = "
                f"{f((1 - q6) * W6)} + {f(q6 * W6c)} = <b>NOK {f(W6q)} million</b>.</p>"
                f"<p><b>Step 3. Decision.</b> {f(W6q)} &gt; {g(NPV6_na)}, so <b>you wait</b>, "
                f"but the flexibility is now worth only {f(W6q)} − {g(NPV6_na)} = {f(flex6q)}.</p>"
            ),
            "criteria": [
                f"With the rival: {g(NPV6_Hc)} at Year 1 in the high state (still build), nothing "
                f"in the low state; value today {f(W6c)}.",
                f"NPV of waiting = {g(1 - q6)} × {f(W6)} + {g(q6)} × {f(W6c)} = {f(W6q)}.",
                f"Decision: wait ({f(W6q)} > {g(NPV6_na)}).",
                f"Setting the value to 0 when the rival enters (you could still build with high "
                f"demand) gives {f(feil_W6q)}: still wait, but it loses 1 point.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>For which entry probability are you indifferent between building now and "
                "waiting? Why does the rival make waiting less attractive?</p>"
            ),
            "solution": (
                f"<p><b>Indifference.</b> (1 − q) × {f(W6)} + q × {f(W6c)} = {g(NPV6_na)} gives<br>"
                f"q = ({f(W6)} − {g(NPV6_na)})/({f(W6)} − {f(W6c)}) = {f(W6 - NPV6_na)}/"
                f"{f(W6 - W6c)} = <b>{f(qstar6, 2)}</b> ({pc(qstar6)}). Above it you build now.</p>"
                f"<p><b>Check.</b> {f(1 - qstar6, 2)} × {f(W6)} + {f(qstar6, 2)} × {f(W6c)} = "
                f"{f((1 - qstar6) * W6)} + {f(qstar6 * W6c)} = {f(NPV6_na)} ✓.</p>"
                "<p><b>Why the rival makes waiting less attractive.</b> Entry is a cost of waiting "
                "only: it takes value from the project if you have not yet built, like a dividend "
                "that the holder of a call misses and that makes early exercise attractive. Building "
                "now gives up the option but secures the whole market.</p>"
            ),
            "criteria": [
                f"Equation (1 − q) × {f(W6)} + q × {f(W6c)} = {g(NPV6_na)} set up correctly.",
                f"q = {f(qstar6, 2)}; above it you build now.",
                "Explanation: entry is a cost of waiting only (building now avoids it), like a "
                "dividend that makes early exercise of a call attractive. 1-2 sentences.",
                f"A student who used 0 for the rival case in c) gets q = {f(feil_qstar6)} and keeps "
                "full marks for the method.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Ignore the rival. If your right lasted two years, would it be worth more, less "
                "or the same? Explain briefly (2-4 sentences).</p>"
            ),
            "solution": (
                "<p><b>The same; the extra year is never used.</b> All the uncertainty is resolved "
                "at the end of Year 1, so the second year brings no new information: with high "
                f"demand, building at the end of Year 1 is worth {g(NPV6_H)} while waiting another "
                f"year is worth only {g(NPV6_H)}/{g(1 + r6)} = {f(NPV6_H_vent)} at that date (a year "
                f"of cash flow is lost); with low demand the NPV stays {g(NPV6_L)}, so you never "
                f"build. The right is still worth {f(W6_toar)}. A longer right can never be "
                "worth less, just as an American option is worth at least as much as a European "
                "one, but it is worth more only when waiting longer brings information; here the "
                "lost cash flows work like a dividend that makes «exercising» at the end of Year 1 "
                "optimal.</p>"
            ),
            "criteria": [
                f"Answer: the same value ({f(W6)}); the extra year is never used. 1 point.",
                f"Reason: no new information arrives in Year 2; with high demand waiting another "
                f"year loses a year of cash flow ({g(NPV6_H)} at Year 1 against {f(NPV6_H_vent)}), "
                "with low demand you never build. 2 points.",
                "A longer right is never worth less (American against European option); it is "
                "worth more only when more uncertainty is resolved. 1 point.",
                "«More, because a longer option is always worth more» without noting that no "
                "information arrives earns 1 point.",
            ],
        },
    ],
}

SETT = {
    "id": "prove9",
    "kind": "mock",
    "label": "Mock exam 9",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format. Two verbal exercises, then a shipowner with a "
        "risky bank loan, a buyout valued with a fixed amount of debt, a wind farm's debt and "
        "equity in a binomial tree and a decision on when to build. New firms and numbers "
        "throughout. Not an official exam: the course has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations that end with a short verbal "
        "question.",
        "The formula sheet is handed out. Show every calculation and carry 4 decimals where the "
        "exercise asks for it. Answer in English.",
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
# rytmen fra planen
RYTME = {3: [2, 4, 4, 4, 4], 4: [2, 4, 4, 4, 4], 5: [3, 8, 5, 4], 6: [3, 5, 4, 4, 4]}
for ex in SETT["exercises"]:
    if ex["n"] in RYTME and [d["points"] for d in ex["parts"]] != RYTME[ex["n"]]:
        feil.append(f"oppgave {ex['n']}: rytmen følger ikke planen")
# minst én konstruksjonsdel på 8–12 poeng og del a lett (høyst 4 poeng)
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
    if t.count("<table") != t.count("</table>"):
        feil.append(f"ubalansert tabell i {sti}")

# facts og note vises før start: ingen mekanismenavn eller formler som røper svar
FORBUDT = ["overhang", "covenant", "senior", "D(1", "τD", "put-call", "parity", "risk shifting",
           "free-rider", "homemade", "clientele", "sticky", "r_wacc", "APV", "WACC", "risk-neutral",
           "limited liability", "dilut"]
for t in [SETT["note"]] + SETT["facts"]:
    for w in FORBUDT:
        if w.lower() in t.lower():
            feil.append(f"facts/note røper «{w}»")


# ------------------------------------------- lekkasje: svar som står i oppgaveteksten
def ren(h):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h).replace("&lt;", "<").replace("&gt;", ">"))


SVAR = {
    3: [g(D3a), f(x3), g(D3p), g(D3s), g(E3p), g(E3r)],
    4: [g(FCF4), g(VU4), g(PVTS4), g(VL4), g(E4), pc(rE4), pc(rw4), pc(rEc4), f(VL4_dv)],
    5: [f(rho5), f(E5), f(D5), f(P5), pc(y5), f(q5), pc(erD5), f(E5n), f(D5n), f(rho5n)],
    6: [g(NPV6_na), f(W6), f(flex6), f(W6c), f(W6q), f(qstar6, 2), pc(qstar6)],
}
for ex in SETT["exercises"]:
    tekster = [ren(ex["body"])] + [ren(d["body"]) for d in ex.get("parts", [])]
    for s in SVAR.get(ex["n"], []):
        mønster = r"(?<![\d.,])" + re.escape(s) + r"(?![\d])"
        for t in tekster:
            if re.search(mønster, t):
                feil.append(f"oppgave {ex['n']}: svaret {s} står i oppgaveteksten")


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


HODE = [f"# FIE402 Corporate Finance · {SETT['label']}", "",
        "180 minutes · 100 points · 6 exercises · no multiple choice · calculator and one "
        "bilingual dictionary permitted. The formula sheet is handed out. Show every calculation.", ""]
md = []
for ex in SETT["exercises"]:
    del_md = [f"## Exercise {ex['n']}: {ex['title']} ({ex['points']} points)", "", til_md(ex["body"]), ""]
    for d in ex.get("parts", []):
        del_md += [f"**{d['label']}) ({d['points']} points)** " + til_md(d["body"]), ""]
    t = "\n".join(del_md)
    print(f"   oppgave {ex['n']}: {len(t.split())} ord, {t.count('?')} spørsmål")
    md += del_md
kropp_md = "\n".join(md).rstrip() + "\n"
md_tekst = "\n".join(HODE) + "\n" + kropp_md
if "—" in md_tekst or re.search(r",\s+and\b", md_tekst):
    feil.append("skriveregel brutt i oppgaveteksten (md)")

# lengde og leveranser, målt som for prove4–prove8: ord etter hodet, spørsmål og imperativer
ord_n = len(kropp_md.split())
sporsmal = len(re.findall(r"\?", kropp_md))
imperativ = len(re.findall(
    r"(?:^|[.)?]\s+|\*\*\s)(Find|Explain|Give|Set up|Name|Recalculate|Verify|Propose|Show|"
    r"Describe|Compare|Value|Split|Estimate|Use the|Use Fjordvarme|Calculate|Comment|State)\b",
    kropp_md))
leveranser = sporsmal + imperativ
print(f"\nOppgavetekst: {ord_n} ord, {sporsmal} spørsmål + {imperativ} imperativer = {leveranser} "
      "leveranser")
if not 1000 <= ord_n <= 1250:
    feil.append(f"oppgaveteksten har {ord_n} ord (skal være 1 000–1 250)")
if not 30 <= leveranser <= 40:
    feil.append(f"{leveranser} leveranser (skal være 30–40)")

if feil:
    print("\nFEIL, prove9.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
