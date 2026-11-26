"""Skribent W5: «Må kunne» for FIE402 (docs/fie402-mk-spek.md), tier 1.

Kjør fra hvor som helst:  python3 -I fag/fie402/_mk/w5_regn.py

Seks oppgaver på 20 poeng, tre per type:

gjeldsoverheng (forelesning 04, 33:41 til 49:46; PS1 E6 i forelesning 06, 55:52 til 1:15:48;
forelesning 18, 29:31 «check whether the manager wants this project»):
- mk-gjeldsoverheng-1: PS1 E6-formen i samme rekkefølge. Fiskeforedling i Lofoten, NOK, 50/50,
  eier-leder eier alt, ny egenkapital (andel x), eieren avslår, reforhandling til et oppgitt
  pålydende (146) som begge godtar, verbal hale om «the firm forgoes positive-NPV projects» og
  formuesoverføring.
- mk-gjeldsoverheng-2: samme form, spurt i stilen til H2024 E4 c («Is there a value of debt for
  which …? If it exists, find it»). Aluminiumsverk, USD, spredt eierskap, prosjektet gir mest i
  den dårlige tilstanden. Konstruksjonsledd: pålydendet F* = L + NPV/(1 − p) der eierne er
  likegyldige. Hale: ny junior gjeld hjelper ikke (forelesning 04, 49:46).
- mk-gjeldsoverheng-3: varslet tillegg (06, 56:57; 04, 45:12): sannsynligheter 40/60 og ny senior
  gjeld som løsning. Lager eid av et oppkjøpsfond, EUR, r_f = 5 %, eieren skyter inn kapitalen
  selv ((1 − x)E1 = E1 − I), laveste sannsynlighet som får eieren med, senior lån som er
  risikofritt (pålydende 40 × 1,05 = 42). Hale: covenants mot ny senior gjeld (ex post og ex ante).

cds (forelesning 13, 17:42 til 40:06; V2024 P3; forelesning 18, 1:00:51). ρ er alltid den
risikonøytrale sannsynligheten for mislighold og står i nederste gren:
- mk-cds-1: forelesningens rekkefølge. To ettårige nullkupongobligasjoner (USD), pris, forventet
  avkastning, ρ, CDS, λ = pålydende × LGD kontrakter (spurt tydelig), hvorfor ρ > p.
- mk-cds-2: V2024 P3-formen med put på eiendelene (D = PV(F) − P). NOK, pålydende 1 000 per
  obligasjon, gjenvinningen oppgitt som eiendelenes verdi ved mislighold (330 av 600).
- mk-cds-3: varslet tillegg: løpetid 18 måneder, (1 + r)^1.5, årlig forventet avkastning,
  sikring av en beholdning, hale om at ρ og CDS-prisen ikke endres når den reelle p endres.

Skriptet regner hvert tall, asserter sjekkene og fellene og skriver w5.json og w5_svar.json.
Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som lekker i oppgaveteksten),
skrives ingenting.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "w5.json")
UT_SVAR = os.path.join(HER, "w5_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    """Kort tall: heltall uten desimaler, ellers så få desimaler som trengs (maks 4)."""
    if abs(x - round(x)) < 1e-9:
        return f(x, 0)
    for d in (1, 2, 3, 4):
        if abs(x - round(x, d)) < 1e-9:
            return f(x, d)
    return f(x, 4)


def sg(x):
    """Med fortegn: +6 eller −14."""
    return ("+" if round(x, 4) > 0 else "") + g(x)


def pc(x, d=2):
    return f(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def rel(a, b):
    return abs(a - b) / abs(b)


def tab(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = "".join("<tr>" + "".join(f'<td class="n">{c}</td>' if i else f"<td>{c}</td>" for i, c in enumerate(rad))
                + "</tr>" for rad in rader)
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


def gjeld(v, fv):
    return min(v, fv)


def ek(v, fv):
    return max(v - fv, 0.0)


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:26} {v}")


# ======================================================================
#  mk-gjeldsoverheng-1: Skarvholmen Sjømat AS (PS1 E6-formen)
# ======================================================================
p1, H1, L1, F1, I1, d1 = 0.5, 290.0, 110.0, 170.0, 42.0, 56.0
K1 = 146.0                                          # nytt pålydende som Sigurd tilbyr banken
D1_0 = p1 * gjeld(H1, F1) + (1 - p1) * gjeld(L1, F1)
E1_0 = p1 * ek(H1, F1) + (1 - p1) * ek(L1, F1)
assert near(D1_0, 140) and near(E1_0, 60) and near(D1_0 + E1_0, p1 * H1 + (1 - p1) * L1)
NPV1 = d1 - I1
assert near(NPV1, 14)
# c) ny egenkapital: firmaet misligholder fortsatt i lav tilstand
assert L1 + d1 < F1 < H1
E1_med = p1 * ek(H1 + d1, F1) + (1 - p1) * ek(L1 + d1, F1)
x1 = I1 / E1_med
eier1 = (1 - x1) * E1_med
D1_med = p1 * gjeld(H1 + d1, F1) + (1 - p1) * gjeld(L1 + d1, F1)
assert near(E1_med, 88) and near(eier1, E1_med - I1) and near(eier1, 46)
assert eier1 < E1_0                                 # Sigurd avslår
assert near((D1_med - D1_0) + (eier1 - E1_0), NPV1)  # +28 − 14 = 14
x1_felle_hoy = I1 / ek(H1 + d1, F1)                # glemt sannsynligheten
x1_felle_snitt = I1 / (p1 * (H1 + d1) + (1 - p1) * (L1 + d1) - F1)  # trekker pålydende fra snittet
assert rel(x1_felle_hoy, x1) > 0.05 and rel(x1_felle_snitt, x1) > 0.01
# d) reforhandling til 146: trygt med linjen
assert K1 <= L1 + d1
D1_ny = p1 * gjeld(H1 + d1, K1) + (1 - p1) * gjeld(L1 + d1, K1)
E1_ny = p1 * ek(H1 + d1, K1) + (1 - p1) * ek(L1 + d1, K1)
x1_ny = I1 / E1_ny
eier1_ny = E1_ny - I1
assert near(D1_ny, K1) and near(E1_ny, 110) and near(eier1_ny, 68)
gev1_bank, gev1_eier = D1_ny - D1_0, eier1_ny - E1_0
assert gev1_bank > 0 and gev1_eier > 0 and near(gev1_bank + gev1_eier, NPV1)
V1_med = p1 * (H1 + d1) + (1 - p1) * (L1 + d1)     # 256
K1_maks = V1_med - I1 - E1_0                        # Sigurd godtar K ≤ 154
assert near(K1_maks, 154) and D1_0 <= K1 <= K1_maks
vis("gjeldsoverheng-1", D0=D1_0, E0=E1_0, NPV=NPV1, E_med=E1_med, x=x1, eier=eier1, D_med=D1_med,
    x_felle_hoy=x1_felle_hoy, x_felle_snitt=x1_felle_snitt, D_ny=D1_ny, E_ny=E1_ny, x_ny=x1_ny,
    eier_ny=eier1_ny, gev_bank=gev1_bank, gev_eier=gev1_eier, K_maks=K1_maks)

# ======================================================================
#  mk-gjeldsoverheng-2: Brannock Aluminum Inc. (H2024 E4 c-stilen)
# ======================================================================
p2, H2, L2, F2, I2, a2, b2 = 0.5, 230.0, 80.0, 125.0, 30.0, 18.0, 60.0
D2_0 = p2 * gjeld(H2, F2) + (1 - p2) * gjeld(L2, F2)
E2_0 = p2 * ek(H2, F2) + (1 - p2) * ek(L2, F2)
assert near(D2_0, 102.5) and near(E2_0, 52.5)
NPV2 = p2 * a2 + (1 - p2) * b2 - I2
assert near(NPV2, 9)
# b) med systemet blir obligasjonene trygge
assert L2 + b2 >= F2
E2_med = p2 * ek(H2 + a2, F2) + (1 - p2) * ek(L2 + b2, F2)
x2 = I2 / E2_med
gml2 = E2_med - I2
D2_med = p2 * gjeld(H2 + a2, F2) + (1 - p2) * gjeld(L2 + b2, F2)
assert near(E2_med, 69) and near(gml2, 39) and gml2 < E2_0
gev2_obl, gev2_eier = D2_med - D2_0, gml2 - E2_0
assert near(gev2_obl, 22.5) and near(gev2_eier, -13.5) and near(gev2_obl + gev2_eier, NPV2)
# d) pålydendet der eierne er likegyldige: F* = L + NPV/(1 − p), må ligge i (L, L + b]
Fs2 = L2 + NPV2 / (1 - p2)
assert near(Fs2, 98) and L2 < Fs2 <= L2 + b2


def eiergev2(F):
    uten = p2 * ek(H2, F) + (1 - p2) * ek(L2, F)
    med = p2 * ek(H2 + a2, F) + (1 - p2) * ek(L2 + b2, F) - I2
    return med - uten


assert near(eiergev2(Fs2), 0)
for F in (0, 40, 80, 90, 97.9):
    assert eiergev2(F) > 0                           # installerer under F*
for F in (98.1, 110, 125, 140, 160, 200, 229):
    assert eiergev2(F) < 0                           # avslår over F*
assert near(eiergev2(160), p2 * a2 - I2)             # over L + b får eierne bare 0,5 × 18
uten2_Fs = p2 * ek(H2, Fs2)
assert near(uten2_Fs, 66)
Fs2_felle = L2 + NPV2                                 # glemt 1/(1 − p)
assert rel(Fs2_felle, Fs2) > 0.05
# e) junior lån: J fra 0,5 J + 0,5 × 15 = 30, eierne får det samme som med nye aksjer
rest2_lav = ek(L2 + b2, F2)                          # 15 til juniorlåneren når kraften er dyr
J2 = (I2 - (1 - p2) * rest2_lav) / p2
assert J2 >= rest2_lav and J2 <= H2 + a2 - F2
assert near(p2 * min(J2, H2 + a2 - F2) + (1 - p2) * min(J2, rest2_lav), I2)
eier2_junior = p2 * ek(H2 + a2 - F2, J2)
assert near(eier2_junior, gml2) and near(J2, 45)
vis("gjeldsoverheng-2", D0=D2_0, E0=E2_0, NPV=NPV2, E_med=E2_med, x=x2, gml=gml2, D_med=D2_med,
    gev_obl=gev2_obl, gev_eier=gev2_eier, Fstjerne=Fs2, Fs_felle=Fs2_felle, J=J2, eier_junior=eier2_junior)

# ======================================================================
#  mk-gjeldsoverheng-3: Rheinfeld Logistik GmbH og Altmark Capital (40/60, senior gjeld)
# ======================================================================
p3, H3, L3, F3, I3, d3, rf3 = 0.4, 300.0, 110.0, 180.0, 40.0, 63.0, 0.05
R3 = 1 + rf3
D3_0 = (p3 * gjeld(H3, F3) + (1 - p3) * gjeld(L3, F3)) / R3
E3_0 = (p3 * ek(H3, F3) + (1 - p3) * ek(L3, F3)) / R3
V3_0 = (p3 * H3 + (1 - p3) * L3) / R3
assert near(D3_0 + E3_0, V3_0)
NPV3 = d3 / R3 - I3
assert near(NPV3, 20)
# b) Altmark skyter inn 40 selv; misligholder fortsatt uten fornyelse
assert L3 + d3 < F3
E3_med = (p3 * ek(H3 + d3, F3) + (1 - p3) * ek(L3 + d3, F3)) / R3
netto3 = E3_med - I3
D3_med = (p3 * gjeld(H3 + d3, F3) + (1 - p3) * gjeld(L3 + d3, F3)) / R3
endr3_eier, endr3_bank = netto3 - E3_0, D3_med - D3_0
assert near(endr3_eier, -16) and near(endr3_bank, 36) and near(endr3_eier + endr3_bank, NPV3)
D3_0_50 = (0.5 * gjeld(H3, F3) + 0.5 * gjeld(L3, F3)) / R3   # felle: 50/50
assert rel(D3_0_50, D3_0) > 0.01
D3_0_udisk = p3 * gjeld(H3, F3) + (1 - p3) * gjeld(L3, F3)  # felle: glemt diskonteringen
assert rel(D3_0_udisk, D3_0) > 0.01
# c) laveste sannsynlighet: p × 63/1,05 ≥ 40
ps3 = I3 * R3 / d3
assert near(ps3, 2 / 3)


def eiergev3(p):
    uten = p * ek(H3, F3) / R3
    med = (p * ek(H3 + d3, F3) + (1 - p) * ek(L3 + d3, F3)) / R3 - I3
    return med - uten


assert near(eiergev3(ps3), 0) and eiergev3(0.66) < 0 < eiergev3(0.67) and eiergev3(p3) < 0
ps3_felle = I3 / d3                                   # glemt diskonteringen: 63,49 %
assert rel(ps3_felle, ps3) > 0.01
# d) nytt senior lån, risikofritt fordi 173 dekker det
Fsen3 = I3 * R3
assert L3 + d3 >= Fsen3
D3_sen = (p3 * min(H3 + d3 - Fsen3, F3) + (1 - p3) * min(L3 + d3 - Fsen3, F3)) / R3
E3_sen = (p3 * ek(H3 + d3 - Fsen3, F3) + (1 - p3) * ek(L3 + d3 - Fsen3, F3)) / R3
assert near(Fsen3, 42) and E3_sen > E3_0 and D3_sen > D3_0
assert near((D3_sen - D3_0) + (E3_sen - E3_0), NPV3)
assert near(E3_sen - E3_0, p3 * NPV3) and near(D3_sen - D3_0, (1 - p3) * NPV3)
bank3_lav_sen = L3 + d3 - Fsen3                       # 131
vis("gjeldsoverheng-3", D0=D3_0, E0=E3_0, V0=V3_0, NPV=NPV3, E_med=E3_med, netto=netto3, D_med=D3_med,
    endr_eier=endr3_eier, endr_bank=endr3_bank, D0_50=D3_0_50, pstjerne=ps3, ps_felle=ps3_felle,
    Fsen=Fsen3, D_sen=D3_sen, E_sen=E3_sen)

# ======================================================================
#  mk-cds-1: Kettering Paper Mills Inc. (forelesning 13)
# ======================================================================
rfA, yA, pA, RA, FA = 0.04, 0.085, 0.07, 65.0, 100.0
P1A = FA / (1 + rfA)
P2A = FA / (1 + yA)
EpA = (1 - pA) * FA + pA * RA
ErA = EpA / P2A - 1
assert rfA < ErA < yA and ErA < 0.20
FVA = P2A * (1 + rfA)
tapA = FA - RA
rhoA = (FA - FVA) / tapA
assert near(((1 - rhoA) * FA + rhoA * RA) / (1 + rfA), P2A, 1e-12)
assert pA < rhoA < 1 and rhoA / pA < 4
cdsA = rhoA / (1 + rfA)
cdsA_felle = (1 - rhoA) / (1 + rfA)                 # overlevelse
cdsA_sann = pA / (1 + rfA)                          # reell sannsynlighet
cdsA_udisk = rhoA                                   # ikke diskontert
cdsA_reserve = 0.10 / (1 + rfA)                     # med reserveverdien ρ = 0,10
for felle in (cdsA_felle, cdsA_sann, cdsA_udisk):
    assert rel(felle, cdsA) > 0.01
assert rel(1 - rhoA, rhoA) > 0.01 and rel(0.10, rhoA) > 0.05
nA = tapA                                           # λ = pålydende × LGD
kostA = nA * cdsA
posA = P2A + kostA
assert near(posA, P1A, 1e-12) and near(kostA, P1A - P2A, 1e-12)
posA_sann = P2A + nA * cdsA_sann                    # arbitrasje med 7 %
assert posA_sann < P1A - 1
posA_100 = P2A + FA * cdsA                          # felle: 100 kontrakter
assert rel(posA_100, P1A) > 0.01
vis("cds-1", P1=P1A, P2=P2A, Ep=EpA, Er=ErA, FV=FVA, rho=rhoA, rho_p=rhoA / pA, cds=cdsA,
    cds_felle=cdsA_felle, cds_sann=cdsA_sann, cds_reserve=cdsA_reserve, kost=kostA, pos=posA,
    pos_sann=posA_sann)

# ======================================================================
#  mk-cds-2: Oksfjord Havbruk ASA (V2024 P3 med put på eiendelene)
# ======================================================================
rfB, yB, pB, FB, FtotB, VdB = 0.025, 0.08, 0.04, 1000.0, 600.0, 330.0
RB = FB * VdB / FtotB                               # 550 per obligasjon
nobB = FtotB * 1e6 / FB                             # 600 000 obligasjoner
P1B = FB / (1 + rfB)
P2B = FB / (1 + yB)
EpB = (1 - pB) * FB + pB * RB
ErB = EpB / P2B - 1
assert near(RB, 550) and rfB < ErB < yB
FVB = P2B * (1 + rfB)
rhoB = (FB - FVB) / (FB - RB)
assert near(((1 - rhoB) * FB + rhoB * RB) / (1 + rfB), P2B, 1e-12)
assert pB < rhoB < 1 and rhoB / pB < 4
cdsB = rhoB / (1 + rfB)
cdsB_felle = (1 - rhoB) / (1 + rfB)
cdsB_sann = pB / (1 + rfB)
assert rel(cdsB_felle, cdsB) > 0.01 and rel(cdsB_sann, cdsB) > 0.01
ErB_felle = ((1 - pB) * FB + pB * VdB) / P2B - 1    # 330 per obligasjon
assert rel(ErB_felle, ErB) > 0.01
putB = (FtotB - VdB) * cdsB                         # NOK millioner
rfutstB = FtotB / (1 + rfB)
utstB = FtotB / (1 + yB)
assert near(utstB, nobB * P2B / 1e6, 1e-9)
assert near(putB, rfutstB - utstB, 1e-9)            # D = PV(F) − P
putB_per = (FB - RB) * cdsB                         # per obligasjon
assert near(putB_per, P1B - P2B, 1e-9)
putB_reserve = (FtotB - VdB) * 0.09
assert rel(0.09, cdsB) > 0.05
vis("cds-2", R=RB, P1=P1B, P2=P2B, Ep=EpB, Er=ErB, Er_felle=ErB_felle, rho=rhoB, rho_p=rhoB / pB,
    cds=cdsB, cds_felle=cdsB_felle, cds_sann=cdsB_sann, put=putB, rfutst=rfutstB, utst=utstB,
    put_per=putB_per, put_reserve=putB_reserve)

# ======================================================================
#  mk-cds-3: Vellmar Autoteile AG (18 måneder)
# ======================================================================
rfC, yC, pC, RC, FC, TC = 0.03, 0.075, 0.055, 60.0, 100.0, 1.5
gC = (1 + rfC) ** TC
hC = (1 + yC) ** TC
P1C = FC / gC
P2C = FC / hC
P1C_enkel = FC / (1 + rfC * TC)
P2C_enkel = FC / (1 + yC * TC)
assert rel(P1C_enkel, P1C) > 0.0002 and rel(P2C_enkel, P2C) > 0.001   # avvises med tol 0,02 % og 0,1 %
# b) replikasjon først: forsikringsselskapet med pålydende 30 millioner, tap 40 % ved mislighold.
#    Obligasjonene pluss kontraktene betaler 30 sikkert, så de må være verdt 30/1,03^1,5.
HC = 30.0                                           # € millioner
nC = HC * (FC - RC) / FC                            # millioner kontrakter
obligC = HC / FC * P2C                              # verdien av obligasjonene, € millioner
statC = HC / gC                                     # sikret beholdning = statsobligasjoner
kostC = statC - obligC                              # kontraktene totalt
assert near(nC, 12)
statC_enkel = HC / (1 + rfC * TC)                   # felle: enkel rente på r_f
kostC_enkel = statC_enkel - obligC
kostC_helenkel = statC_enkel - HC / FC * P2C_enkel  # felle: enkel rente overalt
assert rel(statC_enkel, statC) > 0.0002
assert rel(kostC_enkel, kostC) > 0.003 and rel(kostC_helenkel, kostC) > 0.003   # avvises med tol 0,3 %
# c) CDS-prisen og ρ fra kostnaden
cdsC = kostC / nC
rhoC = cdsC * gC
FVC = P2C * gC
assert near(rhoC, (FC - FVC) / (FC - RC), 1e-12)   # samme ρ som risikonøytral prising av obligasjonen
assert near(((1 - rhoC) * FC + rhoC * RC) / gC, P2C, 1e-12)
assert pC < rhoC < 1 and rhoC / pC < 4
cdsC_enkel = kostC_enkel / nC                        # felle: enkel rente på r_f
rhoC_enkel = cdsC_enkel * (1 + rfC * TC)
rhoC_helenkel = (FC - P2C_enkel * (1 + rfC * TC)) / (FC - RC)   # enkel rente overalt
cdsC_helenkel = rhoC_helenkel / (1 + rfC * TC)
rhoC_ettaar = (FC - P2C * (1 + rfC)) / (FC - RC)   # felle: ett år
assert rel(rhoC_ettaar, rhoC) > 0.05
assert rel(rhoC_enkel, rhoC) > 0.002 and rel(cdsC_enkel, cdsC) > 0.002   # avvises med tol 0,2 %
assert rel(rhoC_helenkel, rhoC) > 0.01 and rel(cdsC_helenkel, cdsC) > 0.01
kostC_reserve = 1.5                                  # reserveverdi i (c)
cdsC_reserve = kostC_reserve / nC
rhoC_reserve = cdsC_reserve * gC
assert rel(kostC_reserve, kostC) > 0.05
# d) forventet årlig avkastning med analytikernes 5,5 %
EpC = (1 - pC) * FC + pC * RC
avkC = EpC / P2C - 1                                # over 1,5 år
ErC = (EpC / P2C) ** (1 / TC) - 1
ErC_delt = avkC / TC                                # felle: delt på 1,5
assert rfC < ErC < yC and rel(ErC_delt, ErC) > 0.005 and rel(avkC, ErC) > 0.05
# e) analytikerne hever p til 8 %, prisen står stille
pC2 = 0.08
EpC2 = (1 - pC2) * FC + pC2 * RC
ErC2 = (EpC2 / P2C) ** (1 / TC) - 1
assert rfC < ErC2 < ErC and pC2 < rhoC
cdsC_ny_sann = pC2 / gC                             # felle i e)
vis("cds-3", g=gC, h=hC, P1=P1C, P2=P2C, P1_enkel=P1C_enkel, P2_enkel=P2C_enkel, n=nC, oblig=obligC,
    stat=statC, kost=kostC, kost_enkel=kostC_enkel, kost_helenkel=kostC_helenkel, cds=cdsC, rho=rhoC,
    rho_p=rhoC / pC, FV=FVC, rho_enkel=rhoC_enkel, cds_enkel=cdsC_enkel, rho_helenkel=rhoC_helenkel,
    cds_helenkel=cdsC_helenkel, rho_ettaar=rhoC_ettaar, cds_reserve=cdsC_reserve, rho_reserve=rhoC_reserve,
    Ep=EpC, avk=avkC, Er=ErC, Er_delt=ErC_delt, Ep2=EpC2, Er2=ErC2)


# ======================================================================
#  mk-risikoskifting-1: Vikebygd Gartneri AS (forelesning 04, 55:46 til 1:03:12)
# ======================================================================
K4, A4, p4, H4, L4 = 260.0, 220.0, 0.5, 340.0, 60.0     # sikker verdi 220 mot pålydende 260
D4_0, E4_0 = gjeld(A4, K4), ek(A4, K4)
assert near(D4_0, A4) and near(E4_0, 0)              # sikkert mislighold
V4_r = p4 * H4 + (1 - p4) * L4
NPV4 = V4_r - A4
assert near(V4_r, 200) and NPV4 < 0
D4_r = p4 * gjeld(H4, K4) + (1 - p4) * gjeld(L4, K4)
E4_r = p4 * ek(H4, K4) + (1 - p4) * ek(L4, K4)
assert near(D4_r + E4_r, V4_r) and E4_r > E4_0       # lederen bytter
dD4 = D4_r - D4_0
overf4 = E4_r - E4_0
tap4 = -NPV4
assert near(-dD4, overf4 + tap4)                      # −60 = 40 + 20
# e) bare 5 % sjanse
p4e = 0.05
D4_e = p4e * gjeld(H4, K4) + (1 - p4e) * gjeld(L4, K4)
E4_e = p4e * ek(H4, K4) + (1 - p4e) * ek(L4, K4)
V4_e = p4e * H4 + (1 - p4e) * L4
assert E4_e > 0 and near(D4_e + E4_e, V4_e)
vis("risikoskifting-1", D0=D4_0, E0=E4_0, V_r=V4_r, NPV=NPV4, D_r=D4_r, E_r=E4_r, dD=dD4, overf=overf4,
    tap=tap4, D_e=D4_e, E_e=E4_e, V_e=V4_e)

# ======================================================================
#  mk-risikoskifting-2: Cardwell Industries Inc. (PS1 E8, utskilling)
# ======================================================================
p5, F5 = 0.5, 145.0
U5 = {"Equipment": (190.0, 50.0), "Services": (140.0, 100.0)}   # før utskillingen, (boom, bust)
s5 = 10.0                                            # tapt synergi per selskap per tilstand
H5 = sum(v[0] for v in U5.values())
L5 = sum(v[1] for v in U5.values())
assert L5 >= F5                                       # gjelden er trygg i dag
D5_0 = p5 * gjeld(H5, F5) + (1 - p5) * gjeld(L5, F5)
E5_0 = p5 * ek(H5, F5) + (1 - p5) * ek(L5, F5)
V5_0 = p5 * H5 + (1 - p5) * L5
assert near(D5_0, F5) and near(E5_0, 95)


def spin5(s, med):
    """Gjeld og samlet egenkapital når hele gjelden legges på selskapet «med»."""
    D = E = 0.0
    for navn, (h, l) in U5.items():
        h, l = h - s, l - s
        if navn == med:
            D += p5 * gjeld(h, F5) + (1 - p5) * gjeld(l, F5)
            E += p5 * ek(h, F5) + (1 - p5) * ek(l, F5)
        else:
            E += p5 * h + (1 - p5) * l
    return D, E


D5_eq, E5_eq = spin5(s5, "Equipment")
D5_sv, E5_sv = spin5(s5, "Services")
assert E5_eq > E5_sv and E5_eq > E5_0                 # gjelden på Equipment, og splittelsen lønner seg
V5_1 = V5_0 - 2 * s5
assert near(D5_eq + E5_eq, V5_1) and near(D5_sv + E5_sv, V5_1)
dD5, overf5, tap5 = D5_eq - D5_0, E5_eq - E5_0, V5_0 - V5_1
assert near(-dD5, overf5 + tap5)                      # 52,5 = 32,5 + 20
# d) største synergitap der splittelsen fortsatt lønner seg: 142,5 − 1,5s = 95
ss5 = (p5 * (U5["Equipment"][0] - F5) + p5 * sum(U5["Services"]) - E5_0) / (p5 + 1)
assert near(spin5(ss5, "Equipment")[1], E5_0)
assert U5["Equipment"][0] - ss5 >= F5 and U5["Equipment"][1] - ss5 >= 0   # regionen holder
assert spin5(ss5, "Services")[1] < E5_0              # det andre valget er verre ved s*
assert spin5(ss5 - 0.01, "Equipment")[1] > E5_0 > spin5(ss5 + 0.01, "Equipment")[1]
vis("risikoskifting-2", H=H5, L=L5, D0=D5_0, E0=E5_0, V0=V5_0, D_eq=D5_eq, E_eq=E5_eq, D_sv=D5_sv, E_sv=E5_sv,
    dD=dD5, overf=overf5, tap=tap5, s_stjerne=ss5)

# ======================================================================
#  mk-risikoskifting-3: Ashworth Precision plc (brannsalg ved konkurs)
# ======================================================================
F6, phi6 = 140.0, 0.70                                # pålydende; brannsalg gir 70 % av verdien
q6, H6, L6 = 0.70, 170.0, 90.0                        # dagens plan
r6, Hr6, Lr6 = 0.30, 260.0, 60.0                      # den risikable planen


def krav6(q, h, l, F):
    """(gjeld, egenkapital, forventet brannsalgstap) når konkurs gir phi av verdien."""
    D = E = tap = 0.0
    for pr, v in ((q, h), (1 - q, l)):
        if v >= F:
            D += pr * F
            E += pr * (v - F)
        else:
            D += pr * phi6 * v
            tap += pr * (1 - phi6) * v
    return D, E, tap


assert L6 < F6 <= H6 and Lr6 < F6 <= Hr6
D6_0, E6_0, T6_0 = krav6(q6, H6, L6, F6)
V6_0 = q6 * H6 + (1 - q6) * L6
assert near(D6_0 + E6_0 + T6_0, V6_0)
V6_r = r6 * Hr6 + (1 - r6) * Lr6
D6_r, E6_r, T6_r = krav6(r6, Hr6, Lr6, F6)
assert V6_r < V6_0 and E6_r > E6_0                    # negativ NPV, men lederen bytter
dD6, overf6, tapV6, tapB6 = D6_r - D6_0, E6_r - E6_0, V6_0 - V6_r, T6_r - T6_0
assert near(-dD6, overf6 + tapV6 + tapB6) and tapB6 > 0
D6_0_uten = q6 * F6 + (1 - q6) * L6                   # felle: glemt brannsalget
assert rel(D6_0_uten, D6_0) > 0.01
# d) lånet ordnes i dag: banken låner ut 100 som betales ut som utbytte
X6 = 100.0
Fr6 = (X6 - (1 - r6) * phi6 * Lr6) / r6               # banken venter at lederen bytter
Fc6 = (X6 - (1 - q6) * phi6 * L6) / q6                # covenant binder firmaet til dagens plan
assert Lr6 < Fr6 <= Hr6 and L6 < Fc6 <= H6
assert near(krav6(r6, Hr6, Lr6, Fr6)[0], X6) and near(krav6(q6, H6, L6, Fc6)[0], X6)
assert krav6(r6, Hr6, Lr6, Fr6)[1] > krav6(q6, H6, L6, Fr6)[1]   # ved Fr velger lederen den risikable planen
assert krav6(r6, Hr6, Lr6, Fc6)[1] > krav6(q6, H6, L6, Fc6)[1]   # uten covenant ville lederen byttet ved Fc
Er6_ex = krav6(r6, Hr6, Lr6, Fr6)[1]
Ec6_ex = krav6(q6, H6, L6, Fc6)[1]
gev6 = Ec6_ex - Er6_ex
assert near(gev6, tapV6 + tapB6)                      # eierne bærer hele effektivitetstapet på forhånd
vis("risikoskifting-3", D0=D6_0, E0=E6_0, T0=T6_0, V0=V6_0, V_r=V6_r, D_r=D6_r, E_r=E6_r, T_r=T6_r, dD=dD6,
    overf=overf6, tapV=tapV6, tapB=tapB6, D0_uten=D6_0_uten, F_risk=Fr6, F_cov=Fc6, E_risk=Er6_ex,
    E_cov=Ec6_ex, gevinst=gev6)


# ======================================================================
#                              TEKSTENE
# ======================================================================
OPPG = {}

# ---------------------------------------------------------------- gjeldsoverheng-1
OPPG["mk-gjeldsoverheng-1"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt, investment and renegotiation", "chapters": [10],
    "merke": "Samme form som PS1 E6 (MXK), regnet i forelesning 06",
    "body": (
        "<p>Skarvholmen Sjømat AS runs a salmon processing plant in Lofoten. Its only debt is a zero-coupon "
        f"bank loan with a face value of NOK {g(F1)} million, due in one year. Next year the firm will be worth "
        f"NOK {g(H1)} million if salmon prices are high and NOK {g(L1)} million if they are low, each with "
        "probability 50%. If the firm cannot repay in full, the bank takes over the firm at no extra cost. The "
        "manager, Sigurd Brekmo, owns all the shares. Everyone is risk neutral, there is no discounting and "
        "there are no taxes.</p>"
        f"<p>Sigurd can install a new filleting line that costs NOK {g(I1)} million today and raises the firm's "
        f"value next year by NOK {g(d1)} million whatever the salmon price. The firm has no cash.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Without the new line, what are the bank loan and the equity worth today?</p>",
         "solution": (
             f"<p>The bank gets min(value, {g(F1)}) and Sigurd gets max(value − {g(F1)}, 0) in each state:</p>"
             + tab(["Salmon price", "Probability", "Firm", "Loan", "Equity"],
                   [["High", "50%", g(H1), g(gjeld(H1, F1)), g(ek(H1, F1))],
                    ["Low", "50%", g(L1), g(gjeld(L1, F1)), g(ek(L1, F1))]])
             + f"<p>Loan = 0.5 × {g(F1)} + 0.5 × {g(L1)} = <b>NOK {g(D1_0)} million</b> and equity = "
               f"0.5 × {g(ek(H1, F1))} + 0.5 × 0 = <b>NOK {g(E1_0)} million</b>.</p>"
               f"<p><b>Check.</b> {g(D1_0)} + {g(E1_0)} = {g(D1_0 + E1_0)} = 0.5 × {g(H1)} + 0.5 × {g(L1)} ✓</p>"),
         "criteria": [
             f"Loan valued state by state: 0.5 × {g(F1)} + 0.5 × {g(L1)} = NOK {g(D1_0)} million. Using the face "
             f"value of {g(F1)} is the classic error.",
             f"Equity 0.5 × ({g(H1)} − {g(F1)}) = NOK {g(E1_0)} million.",
             f"The check D + E = {g(D1_0 + E1_0)} = the expected value of the firm is a bonus."]},
        {"label": "b", "points": 2,
         "body": "<p>What is the NPV of the filleting line?</p>",
         "solution": (
             f"<p>The line adds {g(d1)} in both states and costs {g(I1)}, with no discounting: NPV = −{g(I1)} + "
             f"{g(d1)} = <b>NOK {g(NPV1)} million</b>. For the firm as a whole it is a good project.</p>"),
         "criteria": [
             f"NPV = −{g(I1)} + {g(d1)} = NOK {g(NPV1)} million.",
             "No discounting is needed: everyone is risk neutral and the rate is zero.",
             "States that the line creates value for the firm as a whole."]},
        {"label": "c", "points": 6,
         "body": (
             "<p>The line can only be financed by selling new shares to outside investors in a competitive "
             "market. What fraction of the equity must the new investors receive? What is Sigurd's payoff if he "
             "issues the shares and installs the line? Will he do it? Would the bank like the line to be "
             "installed?</p>"),
         "solution": (
             f"<p><b>Step 1. Payoffs with the line.</b> The firm is worth {g(H1)} + {g(d1)} = {g(H1 + d1)} if prices "
             f"are high and {g(L1)} + {g(d1)} = {g(L1 + d1)} if they are low. Since {g(L1 + d1)} is below "
             f"{g(F1)}, the firm still defaults when prices are low:</p>"
             + tab(["Salmon price", "Firm", "Loan", "All equity"],
                   [["High", g(H1 + d1), g(gjeld(H1 + d1, F1)), g(ek(H1 + d1, F1))],
                    ["Low", g(L1 + d1), g(gjeld(L1 + d1, F1)), g(ek(L1 + d1, F1))]])
             + f"<p>All the equity together is worth 0.5 × {g(ek(H1 + d1, F1))} + 0.5 × 0 = {g(E1_med)}.</p>"
               f"<p><b>Step 2. The new investors' fraction.</b> In a competitive market they pay {g(I1)} for a stake "
               f"worth exactly {g(I1)}: x × {g(E1_med)} = {g(I1)}, so <b>x = {g(I1)}/{g(E1_med)} = {pc(x1)}</b>.</p>"
               f"<p><b>Step 3. Sigurd's payoff.</b> He keeps {pc(1 - x1)} × {g(E1_med)} = <b>NOK {g(eier1)} "
               f"million</b> (the same as {g(E1_med)} − {g(I1)}), against {g(E1_0)} without the line. <b>He does "
               "not install it.</b></p>"
               f"<p><b>Step 4. The bank.</b> With the line the loan is worth 0.5 × {g(F1)} + 0.5 × {g(L1 + d1)} = "
               f"{g(D1_med)} instead of {g(D1_0)}. <b>The bank would like the line</b>: it receives the whole "
               f"{g(d1)} when prices are low.</p>"),
         "criteria": [
             f"Recognises that the firm still defaults when prices are low ({g(L1 + d1)} is below {g(F1)}), so all "
             f"equity is worth 0.5 × {g(ek(H1 + d1, F1))} = {g(E1_med)}.",
             f"Fraction from x × {g(E1_med)} = {g(I1)}: x = {pc(x1)}. Using the high-state payoff alone "
             f"({g(I1)}/{g(ek(H1 + d1, F1))} = {pc(x1_felle_hoy)}) forgets the probability.",
             f"Sigurd's payoff (1 − x) × {g(E1_med)} = {g(eier1)}, compared with {g(E1_0)} without the line: he "
             "does not install it.",
             f"The bank: the loan rises from {g(D1_0)} to {g(D1_med)}, so the bank wants the line.",
             "Show the calculation."]},
        {"label": "d", "points": 5,
         "body": (
             "<p>Sigurd offers the bank to replace its loan with a new zero-coupon loan with a face value of "
             f"NOK {g(K1)} million. If the bank accepts, the line is financed with new shares as in (c). If it "
             "refuses, the old loan stays in place. Will the bank accept? Will Sigurd go ahead? How much does each "
             "of them gain or lose compared with (a)?</p>"),
         "solution": (
             "<p><b>Step 1. The bank's outside option.</b> If the bank refuses, the old loan stays and Sigurd does "
             f"not install the line, from (c). The bank keeps a claim worth {g(D1_0)}, from (a).</p>"
             f"<p><b>Step 2. The new loan with the line.</b> The firm is worth at least {g(L1 + d1)}, which is above "
             f"{g(K1)}, so the new loan is paid in full in both states:</p>"
             + tab(["Salmon price", "Firm", "New loan", "All equity"],
                   [["High", g(H1 + d1), g(K1), g(ek(H1 + d1, K1))],
                    ["Low", g(L1 + d1), g(K1), g(ek(L1 + d1, K1))]])
             + f"<p>The new loan is worth {g(K1)} for sure. {g(K1)} is more than {g(D1_0)}, so <b>the bank "
               f"accepts</b>: it gains <b>{sg(gev1_bank)}</b>.</p>"
               f"<p><b>Step 3. Sigurd.</b> All equity is worth 0.5 × {g(ek(H1 + d1, K1))} + 0.5 × "
               f"{g(ek(L1 + d1, K1))} = {g(E1_ny)}. The new investors need x × {g(E1_ny)} = {g(I1)}, so x = "
               f"{pc(x1_ny)}. Sigurd keeps {pc(1 - x1_ny)} × {g(E1_ny)} = {g(eier1_ny)} (= {g(E1_ny)} − "
               f"{g(I1)}). {g(eier1_ny)} is more than {g(E1_0)}, so <b>Sigurd goes ahead</b>: he gains "
               f"<b>{sg(gev1_eier)}</b>.</p>"
               f"<p><b>Check.</b> Bank {sg(gev1_bank)}, Sigurd {sg(gev1_eier)}, new shareholders 0 (they pay "
               f"{g(I1)} for {g(I1)}): {sg(gev1_bank)} + {g(gev1_eier)} + 0 = {g(NPV1)} = the NPV ✓. With a safe "
               f"new face value K, Sigurd keeps {g(V1_med)} − K − {g(I1)} = {g(V1_med - I1)} − K, so both accept "
               f"any K from {g(D1_0)} (the bank's floor) to {g(K1_maks)} (where Sigurd keeps {g(E1_0)}). {g(K1)} "
               "lies inside.</p>"),
         "criteria": [
             f"The bank's benchmark is its claim without the deal, {g(D1_0)} from (a). Comparing with the face "
             f"value of {g(F1)}, or with {g(D1_med)} from (c), is the classic error: without the write-down the "
             "line is not installed.",
             f"Recognises that the new loan of {g(K1)} is safe ({g(L1 + d1)} is above {g(K1)}), so it is worth "
             f"{g(K1)} and the bank gains {g(gev1_bank)}.",
             f"New fraction x = {g(I1)}/{g(E1_ny)} = {pc(x1_ny)}; Sigurd keeps {g(eier1_ny)}, a gain of "
             f"{g(gev1_eier)} over {g(E1_0)}, so he goes ahead.",
             f"Bonus: the check {g(gev1_bank)} + {g(gev1_eier)} = {g(NPV1)} = the NPV (the new shareholders break "
             f"even), or the whole range {g(D1_0)} to {g(K1_maks)}."]},
        {"label": "e", "points": 4,
         "body": (
             "<p>Explain briefly Sigurd's decision in (c) and the bank's decision in (d). Who captures the value "
             "that the filleting line creates in each case?</p>"),
         "solution": (
             f"<p><b>In (c).</b> The line has a positive NPV, but Sigurd rejects it: <b>the firm forgoes a "
             "positive-NPV project</b>. This is debt overhang. The bank's loan is senior, so when prices are low "
             f"the whole {g(d1)} from the line goes to the bank (its payoff rises from {g(L1)} to {g(L1 + d1)}), "
             f"while Sigurd pays for the line by giving away {pc(x1)} of the equity. The line is a <b>wealth "
             f"transfer</b> from Sigurd to the bank: the bank gains {g(D1_med)} − {g(D1_0)} = "
             f"{sg(D1_med - D1_0)}, Sigurd loses {g(eier1)} − {g(E1_0)} = {g(eier1 - E1_0)} and "
             f"{sg(D1_med - D1_0)} − {g(-(eier1 - E1_0))} = {g(NPV1)} is the NPV. The bank takes more than the "
             "whole NPV, so Sigurd says no.</p>"
             f"<p><b>In (d).</b> The bank's claim of {g(F1)} is worth only {g(D1_0)}, because it gets {g(L1)} when "
             "prices are low. A smaller claim that is paid in full in both states is worth more than a larger "
             f"claim that defaults half the time. With the face value at {g(K1)} the firm no longer defaults, so "
             f"Sigurd keeps the payoff of the line above the new face value and the NPV is shared: "
             f"{sg(gev1_bank)} to the bank and {sg(gev1_eier)} to Sigurd. Without the write-down the NPV of "
             f"{g(NPV1)} is lost for everyone.</p>"),
         "criteria": [
             "Key sentence (about half the marks, as Kurbatov said in recording 04, 44:31): the firm forgoes a "
             "positive-NPV project because of its debt.",
             "Mechanism: the existing loan is senior, so the bank captures the payoff of the line when prices are "
             f"low; a wealth transfer from Sigurd to the bank (bank {sg(D1_med - D1_0)}, Sigurd "
             f"{g(eier1 - E1_0)}, sum {g(NPV1)}).",
             f"Renegotiation: a smaller safe claim ({g(K1)}) is worth more to the bank than a larger risky one "
             f"({g(F1)}, worth {g(D1_0)}), so the bank gives up face value to gain value.",
             "The write-down removes default, so Sigurd keeps the payoff of the line and the NPV is shared instead "
             "of lost. Naming debt overhang without the mechanism earns half."]},
    ],
}

# ---------------------------------------------------------------- gjeldsoverheng-2
OPPG["mk-gjeldsoverheng-2"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt and investment", "chapters": [10],
    "merke": "Formen fra PS1 E6 med et konstruksjonsledd i stilen til H2024 E4 c",
    "body": (
        "<p>Brannock Aluminum Inc. runs a smelter in Ohio. Its only debt is a zero-coupon bond issue with a "
        f"face value of ${g(F2)} million, due in one year. Next year the smelter will be worth ${g(H2)} million "
        f"if power prices are low and ${g(L2)} million if they are high, each with probability 50%. If Brannock "
        "cannot repay in full, the bondholders take over the smelter at no extra cost. The manager acts in the "
        "best interests of Brannock's shareholders. All investors are risk neutral, there is no discounting and "
        "there are no taxes.</p>"
        f"<p>A heat-recovery system costs ${g(I2)} million today. It cuts power use, so it raises the smelter's "
        f"value next year by ${g(a2)} million if power prices are low and by ${g(b2)} million if they are "
        "high.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Without the system, what are Brannock's bonds and equity worth today?</p>",
         "solution": (
             tab(["Power prices", "Probability", "Smelter", "Bonds", "Equity"],
                 [["Low", "50%", g(H2), g(gjeld(H2, F2)), g(ek(H2, F2))],
                  ["High", "50%", g(L2), g(gjeld(L2, F2)), g(ek(L2, F2))]])
             + f"<p>Bonds = 0.5 × {g(F2)} + 0.5 × {g(L2)} = <b>${g(D2_0)} million</b> and equity = 0.5 × "
               f"{g(ek(H2, F2))} = <b>${g(E2_0)} million</b>.</p>"
               f"<p><b>Check.</b> {g(D2_0)} + {g(E2_0)} = {g(D2_0 + E2_0)} = 0.5 × {g(H2)} + 0.5 × {g(L2)} ✓</p>"),
         "criteria": [
             f"Bonds valued state by state: 0.5 × {g(F2)} + 0.5 × {g(L2)} = ${g(D2_0)} million. Using the face "
             f"value of {g(F2)} is the classic error.",
             f"Equity 0.5 × ({g(H2)} − {g(F2)}) = ${g(E2_0)} million.",
             f"The check D + E = {g(D2_0 + E2_0)} is a bonus."]},
        {"label": "b", "points": 6,
         "body": (
             "<p>What is the NPV of the system? Brannock has no cash, so the system must be financed by selling "
             "new shares at a fair price. What fraction of the equity must the new shareholders receive? What are "
             "the existing shareholders' shares then worth? Will the manager install the system?</p>"),
         "solution": (
             f"<p><b>Step 1. NPV.</b> The system adds {g(a2)} or {g(b2)} with probability 50% each: NPV = 0.5 × "
             f"{g(a2)} + 0.5 × {g(b2)} − {g(I2)} = {g(p2 * a2 + (1 - p2) * b2)} − {g(I2)} = <b>${g(NPV2)} "
             "million</b>.</p>"
             f"<p><b>Step 2. Payoffs with the system.</b> The smelter is worth {g(H2 + a2)} if power is cheap and "
             f"{g(L2 + b2)} if it is expensive. Since {g(L2 + b2)} is above {g(F2)}, the bonds are now paid in full "
             "in both states:</p>"
             + tab(["Power prices", "Smelter", "Bonds", "All equity"],
                   [["Low", g(H2 + a2), g(gjeld(H2 + a2, F2)), g(ek(H2 + a2, F2))],
                    ["High", g(L2 + b2), g(gjeld(L2 + b2, F2)), g(ek(L2 + b2, F2))]])
             + f"<p>All equity is worth 0.5 × {g(ek(H2 + a2, F2))} + 0.5 × {g(ek(L2 + b2, F2))} = {g(E2_med)}.</p>"
               f"<p><b>Step 3. The new shareholders.</b> x × {g(E2_med)} = {g(I2)}, so <b>x = {pc(x2)}</b>. The "
               f"existing shareholders keep {pc(1 - x2)} × {g(E2_med)} = <b>${g(gml2)} million</b> (= "
               f"{g(E2_med)} − {g(I2)}), against {g(E2_0)} without the system.</p>"
               "<p><b>Decision.</b> <b>The manager does not install the system</b>, although its NPV is "
               "positive: the firm forgoes a positive-NPV project because of its debt.</p>"),
         "criteria": [
             f"NPV = 0.5 × {g(a2)} + 0.5 × {g(b2)} − {g(I2)} = ${g(NPV2)} million, with the probabilities on the "
             "state-dependent gains.",
             f"Payoffs with the system {g(H2 + a2)} and {g(L2 + b2)}; the bonds become safe, so all equity is worth "
             f"0.5 × {g(ek(H2 + a2, F2))} + 0.5 × {g(ek(L2 + b2, F2))} = {g(E2_med)}.",
             f"Fraction x = {g(I2)}/{g(E2_med)} = {pc(x2)}.",
             f"Existing shareholders: {g(E2_med)} − {g(I2)} = {g(gml2)}, below {g(E2_0)}, so the manager, acting "
             "for them, does not install the system.",
             "Bonus: says that the firm forgoes a positive-NPV project because of its debt (Kurbatov's key "
             "sentence).",
             "Show the calculation."]},
        {"label": "c", "points": 4,
         "body": (
             "<p>Who gains and who loses if the system is installed as in (b)? Check that the gains and losses "
             "add up to the NPV. Would the bondholders like the system to be installed? Explain briefly.</p>"),
         "solution": (
             tab(["Claimholder", "Without the system", "With the system as in (b)", "Change"],
                 [["Bondholders", g(D2_0), g(D2_med), sg(gev2_obl)],
                  ["Existing shareholders", g(E2_0), g(gml2), sg(gev2_eier)],
                  ["New shareholders", "0", f"{g(I2)} for {g(I2)} paid", "0"]])
             + f"<p><b>Check.</b> {sg(gev2_obl)} − {g(-gev2_eier)} + 0 = <b>{sg(NPV2)}</b> = the NPV ✓</p>"
               "<p><b>The bondholders would like the system</b>: it makes their bonds safe. Their payoff when power "
               f"is expensive rises from {g(L2)} to {g(F2)}, so they capture {g(gev2_obl)} of value while the "
               f"shareholders pay the full ${g(I2)} million. The system pays most in the state where the "
               "shareholders get nothing, which is why the bondholders gain more than the whole NPV.</p>"),
         "criteria": [
             f"Bondholders {sg(gev2_obl)} ({g(D2_0)} to {g(D2_med)}), existing shareholders {g(gev2_eier)} "
             f"({g(E2_0)} to {g(gml2)}), new shareholders 0.",
             f"Check: {sg(gev2_obl)} − {g(-gev2_eier)} + 0 = {g(NPV2)} = the NPV.",
             "The bondholders want the system: it removes their default risk.",
             "Calls it a wealth transfer from the shareholders to the bondholders, in Kurbatov's key words."]},
        {"label": "d", "points": 4,
         "body": (
             "<p>Suppose instead that the bonds had a face value of F, with everything else unchanged. Is there a "
             "value of F at which the shareholders are indifferent between installing the system (financed as in "
             "(b)) and not installing it? If it exists, find it. For which face values will the manager install "
             "the system?</p>"),
         "solution": (
             f"<p><b>Step 1. Where can F lie?</b> If F ≤ {g(L2)}, the bonds are safe with or without the system, so "
             f"the shareholders receive the whole NPV and install it. If F is above {g(L2 + b2)}, the firm defaults "
             "when power is expensive even with the system, so the shareholders get only the "
             f"{g(a2)} in the cheap-power state: 0.5 × {g(a2)} = {g(p2 * a2)} is less than the {g(I2)} they pay "
             f"and they never install it. Indifference must lie between {g(L2)} and {g(L2 + b2)}, where the system "
             "makes the bonds safe.</p>"
             f"<p><b>Step 2. Set the two equity values equal for {g(L2)} &lt; F ≤ {g(L2 + b2)}.</b></p>"
             f"<p>Without the system: 0.5({g(H2)} − F)<br>With the system, after paying {g(I2)}: 0.5({g(H2 + a2)} "
             f"− F) + 0.5({g(L2 + b2)} − F) − {g(I2)} = {g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2)} − F</p>"
             f"<p>0.5({g(H2)} − F) = {g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2)} − F ⇒ {g(p2 * H2)} − 0.5F "
             f"= {g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2)} − F ⇒ 0.5F = "
             f"{g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2 - p2 * H2)} ⇒ <b>F = ${g(Fs2)} million</b></p>"
             f"<p><b>Check.</b> F = {g(Fs2)} lies between {g(L2)} and {g(L2 + b2)} ✓. Without the system the "
             f"shareholders get 0.5 × {g(H2 - Fs2)} = {g(uten2_Fs)}; with it 0.5 × {g(H2 + a2 - Fs2)} + 0.5 × "
             f"{g(L2 + b2 - Fs2)} − {g(I2)} = {g(uten2_Fs)} ✓. At F = {g(Fs2)} the bondholders' gain, 0.5 × "
             f"({g(Fs2)} − {g(L2)}) = {g(NPV2)}, is exactly the NPV.</p>"
             f"<p><b>Range.</b> The shareholders' gain from the system, {g(NPV2)} − 0.5(F − {g(L2)}), falls as F "
             f"rises. <b>The manager installs the system if F ≤ ${g(Fs2)} million</b> and rejects it above that. "
             "The more debt, the larger the share of the NPV that goes to the bondholders.</p>"),
         "criteria": [
             "Equity values as functions of F in the region where the system makes the bonds safe: "
             f"0.5({g(H2)} − F) without and {g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2)} − F with the system, "
             f"net of the {g(I2)}.",
             f"Solves 0.5({g(H2)} − F) = {g(p2 * (H2 + a2) + (1 - p2) * (L2 + b2) - I2)} − F to get F = "
             f"${g(Fs2)} million.",
             f"Checks that {g(Fs2)} lies in the assumed region (between {g(L2)} and {g(L2 + b2)}) or that both "
             f"equity values equal {g(uten2_Fs)}.",
             f"Range: the manager installs the system for F up to {g(Fs2)} and rejects it above; the bondholders' "
             f"gain 0.5(F − {g(L2)}) grows with F until it exceeds the NPV.",
             "Concluding that no such F exists (by assuming default when power is expensive in both cases) is the "
             f"classic error. So is F = {g(Fs2_felle)} (forgetting the probability)."]},
        {"label": "e", "points": 3,
         "body": (
             f"<p>Return to a face value of ${g(F2)} million. Would the manager's decision change if the ${g(I2)} "
             "million were borrowed from a competitive new lender on a loan that is junior to the bonds? The lender "
             "prices the loan fairly. Explain briefly.</p>"),
         "solution": (
             "<p><b>No.</b> A junior lender is paid only after the bondholders. Fairly priced, the new loan must "
             f"still be worth ${g(I2)} million to the lender, so the existing shareholders bear the whole cost, as "
             "with new shares, while the bondholders still capture the gain in the expensive-power state. For "
             f"example, a junior loan with face value J pays min(J, {g(H2 + a2 - F2)}) if power is cheap and "
             f"min(J, {g(rest2_lav)}) if it is expensive; 0.5J + 0.5 × {g(rest2_lav)} = {g(I2)} gives J = "
             f"{g(J2)}. The shareholders then keep 0.5 × ({g(H2 + a2)} − {g(F2)} − {g(J2)}) = {g(eier2_junior)}, "
             "exactly as in (b).</p>"
             "<p>Junior money never removes the problem, because the existing senior claim still takes the "
             "project's payoff first. Money that is senior to the bonds, or a renegotiation of their face value, "
             "could help.</p>"),
         "criteria": [
             "Answers no: the decision is the same as with new shares.",
             "Reason: the junior lender is paid after the bondholders and must break even, so the shareholders "
             "still pay the full cost while the bondholders keep their gain.",
             f"Showing that the shareholders keep {g(eier2_junior)} again (junior face value {g(J2)}) is a bonus.",
             "Bonus: senior debt or a renegotiation of the face value could solve the problem (Kurbatov, recording "
             "04, 45:12 to 50:13)."]},
    ],
}

# ---------------------------------------------------------------- gjeldsoverheng-3
tall3_til_eier = p3 * ek(H3 + d3, F3)                # 73.2
tall3_uten_eier = p3 * ek(H3, F3)                    # 48
OPPG["mk-gjeldsoverheng-3"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt, investment and new financing", "chapters": [10, 11],
    "merke": "Som eksemplet i forelesning 04 (33:41) og PS1 E6, med sannsynligheter som ikke er 50/50 og en "
             "ny finansieringsmåte",
    "body": (
        "<p>Rheinfeld Logistik GmbH, a warehouse operator near Hamburg, is wholly owned by the private equity fund "
        "Altmark Capital. Its only debt is a zero-coupon bank loan with "
        f"a face value of €{g(F3)} million, due in one year. Next year Rheinfeld will be worth €{g(H3)} million "
        f"if its largest customer renews its contract (probability {pc(p3, 0)}) and €{g(L3)} million if not "
        f"(probability {pc(1 - p3, 0)}). If Rheinfeld cannot repay in full, the bank takes over the company at "
        f"no extra cost. All investors are risk neutral, the risk-free rate is {pc(rf3, 0)} and there are no "
        "taxes. Use 4 decimal places.</p>"
        f"<p>Solar panels on the warehouse roofs would cost €{g(I3)} million today and raise Rheinfeld's value "
        f"next year by €{g(d3)} million whether or not the contract is renewed.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Without the panels, what are the bank loan and Altmark's equity worth today?</p>",
         "solution": (
             tab(["Contract", "Probability", "Rheinfeld", "Loan", "Equity"],
                 [["Renewed", pc(p3, 0), g(H3), g(gjeld(H3, F3)), g(ek(H3, F3))],
                  ["Not renewed", pc(1 - p3, 0), g(L3), g(gjeld(L3, F3)), g(ek(L3, F3))]])
             + f"<p>Loan = ({g(p3)} × {g(F3)} + {g(1 - p3)} × {g(L3)})/{g(R3)} = "
               f"{g(p3 * F3 + (1 - p3) * L3)}/{g(R3)} = <b>€{f(D3_0)} million</b><br>"
               f"Equity = {g(p3)} × {g(ek(H3, F3))}/{g(R3)} = {g(tall3_uten_eier)}/{g(R3)} = <b>€{f(E3_0)} "
               "million</b></p>"
               f"<p><b>Check.</b> {f(D3_0)} + {f(E3_0)} = {f(V3_0)} = ({g(p3)} × {g(H3)} + {g(1 - p3)} × "
               f"{g(L3)})/{g(R3)} ✓</p>"),
         "criteria": [
             f"Loan valued state by state with the {pc(p3, 0)}/{pc(1 - p3, 0)} probabilities: ({g(p3)} × {g(F3)} + "
             f"{g(1 - p3)} × {g(L3)})/{g(R3)} = {f(D3_0)}.",
             f"Equity {g(p3)} × {g(ek(H3, F3))}/{g(R3)} = {f(E3_0)}.",
             f"Discounts at the risk-free {pc(rf3, 0)}. Using 50/50 probabilities ({f(D3_0_50)} for the loan) or "
             f"forgetting to discount ({g(D3_0_udisk)}) is the classic error."]},
        {"label": "b", "points": 5,
         "body": (
             f"<p>What is the NPV of the panels? Rheinfeld has no cash, but Altmark can pay for the panels by "
             f"injecting €{g(I3)} million of new equity. How much would Altmark and the bank each gain or lose "
             "compared with (a)? "
             "Will Altmark install the panels?</p>"),
         "solution": (
             f"<p><b>Step 1. NPV.</b> NPV = −{g(I3)} + {g(d3)}/{g(R3)} = −{g(I3)} + {g(d3 / R3)} = <b>€{g(NPV3)} "
             "million</b>.</p>"
             f"<p><b>Step 2. Payoffs with the panels.</b> Rheinfeld is worth {g(H3 + d3)} if the contract is renewed "
             f"and {g(L3 + d3)} if not. {g(L3 + d3)} is below {g(F3)}, so the company still defaults without "
             "renewal:</p>"
             + tab(["Contract", "Rheinfeld", "Loan", "Equity"],
                   [["Renewed", g(H3 + d3), g(gjeld(H3 + d3, F3)), g(ek(H3 + d3, F3))],
                    ["Not renewed", g(L3 + d3), g(gjeld(L3 + d3, F3)), g(ek(L3 + d3, F3))]])
             + f"<p><b>Step 3. Gains and losses.</b> Altmark's equity is worth {g(p3)} × {g(ek(H3 + d3, F3))}/"
               f"{g(R3)} = {f(E3_med)}; net of the {g(I3)} it injects, Altmark has {f(netto3)} against {f(E3_0)} "
               f"without the panels: a change of <b>−€{g(-endr3_eier)} million</b>. The loan is worth ({g(p3)} × "
               f"{g(F3)} + {g(1 - p3)} × {g(L3 + d3)})/{g(R3)} = {f(D3_med)} against {f(D3_0)}: a change of "
               f"<b>+€{g(endr3_bank)} million</b>.</p>"
               f"<p><b>Check.</b> {g(endr3_eier)} + {g(endr3_bank)} = {g(NPV3)} = the NPV ✓</p>"
               f"<p><b>Decision.</b> <b>Altmark does not install the panels.</b> It pays the whole €{g(I3)} million, "
               "but it receives the payoff of the panels only if the contract is renewed. Without renewal the whole "
               f"{g(d3)} goes to the bank. <b>The firm forgoes a positive-NPV project</b> because of its debt.</p>"),
         "criteria": [
             f"NPV = {g(d3)}/{g(R3)} − {g(I3)} = €{g(NPV3)} million.",
             f"Recognises that the company still defaults without renewal ({g(L3 + d3)} is below {g(F3)}).",
             f"Altmark: {g(p3)} × {g(ek(H3 + d3, F3))}/{g(R3)} − {g(I3)} = {f(netto3)} against {f(E3_0)}, a loss of "
             f"{g(-endr3_eier)}. Bank: {f(D3_med)} against {f(D3_0)}, a gain of {g(endr3_bank)}.",
             "Altmark does not install the panels: the bank captures more than the whole NPV, a wealth transfer "
             "from the owner to the bank. Saying that the firm forgoes a positive-NPV project because of its debt "
             "is Kurbatov's key sentence.",
             f"The check {g(endr3_eier)} + {g(endr3_bank)} = {g(NPV3)} is a bonus."]},
        {"label": "c", "points": 3,
         "body": (
             "<p>For which probabilities of renewal would Altmark install the panels when it pays for them as in "
             "(b)? The values of Rheinfeld in the two states are unchanged.</p>"),
         "solution": (
             f"<p>Without renewal the company defaults with or without the panels ({g(L3 + d3)} is below "
             f"{g(F3)} whatever the probability), so Altmark receives the extra {g(d3)} only if the contract is "
             f"renewed. With a renewal probability p, the panels raise Altmark's equity by p × {g(d3)}/{g(R3)} = "
             f"{g(d3 / R3)}p and cost {g(I3)}. Altmark installs them if</p>"
             f"<p>{g(d3 / R3)}p ≥ {g(I3)} ⇒ <b>p ≥ 2/3 = {pc(ps3)}</b></p>"
             f"<p>At p = {pc(p3, 0)} the owner's share of the payoff, {g(p3)} × {g(d3 / R3)} = "
             f"{g(p3 * d3 / R3)}, is far below the cost. The owner invests only when the good state is likely "
             "enough for the owner's part of the payoff to cover the whole cost.</p>"),
         "criteria": [
             "Recognises that Altmark gains from the panels only if the contract is renewed, because the company "
             "still defaults otherwise.",
             f"Condition p × {g(d3)}/{g(R3)} ≥ {g(I3)}, or equivalently equal equity values with and without the "
             "panels for a general p.",
             f"Answer: p of at least 2/3 ({pc(ps3)}). Forgetting to discount gives {pc(ps3_felle)}."]},
        {"label": "d", "points": 6,
         "body": (
             f"<p>Return to a probability of {pc(p3, 0)}. The loan agreement allows a new loan that is senior to the "
             "bank's. Altmark considers financing the panels with a one-year zero-coupon senior loan from a "
             "competitive new lender, who prices the loan fairly, instead of new equity. What face value must that loan have? What are "
             "the bank loan and Altmark's equity then worth? Will Altmark install the panels? Is the bank better "
             "or worse off than in (a)?</p>"),
         "solution": (
             f"<p><b>Step 1. The new loan's face value.</b> Without renewal Rheinfeld is worth {g(L3 + d3)} with the "
             "panels, far above what the new lender is owed. The new lender is also paid first, so the new loan "
             f"is risk-free: its face value is {g(I3)} × {g(R3)} = <b>€{g(Fsen3)} million</b>.</p>"
             "<p><b>Step 2. Payoffs.</b></p>"
             + tab(["Contract", "Rheinfeld", "New loan", "Bank", "Equity"],
                   [["Renewed", g(H3 + d3), g(Fsen3), g(min(H3 + d3 - Fsen3, F3)), g(ek(H3 + d3 - Fsen3, F3))],
                    ["Not renewed", g(L3 + d3), g(Fsen3), g(min(L3 + d3 - Fsen3, F3)),
                     g(ek(L3 + d3 - Fsen3, F3))]])
             + f"<p>Bank loan = ({g(p3)} × {g(F3)} + {g(1 - p3)} × {g(bank3_lav_sen)})/{g(R3)} = "
               f"{g(p3 * F3 + (1 - p3) * bank3_lav_sen)}/{g(R3)} = <b>€{f(D3_sen)} million</b><br>"
               f"Altmark's equity = {g(p3)} × {g(ek(H3 + d3 - Fsen3, F3))}/{g(R3)} = "
               f"{g(p3 * ek(H3 + d3 - Fsen3, F3))}/{g(R3)} = <b>€{f(E3_sen)} million</b></p>"
               f"<p><b>Step 3. Decisions.</b> Altmark's equity rises from {f(E3_0)} to {f(E3_sen)} "
               f"({sg(E3_sen - E3_0)}) without any injection, so <b>Altmark installs the panels</b>. The bank's "
               f"loan rises from {f(D3_0)} to {f(D3_sen)} ({sg(D3_sen - D3_0)}), so <b>the bank is better off than "
               "in (a)</b>, even though a new claim now stands ahead of it.</p>"
               f"<p><b>Check.</b> {sg(E3_sen - E3_0)} + {g(D3_sen - D3_0)} = {g(NPV3)} = the NPV ✓. The new lender "
               "breaks even. The senior loan is repaid first in both states: out of Altmark's payoff if the "
               "contract is renewed and out of the bank's if not. Each side now pays for the panels in the state "
               f"where it receives their payoff, so the NPV is split by the probabilities: {g(p3)} × {g(NPV3)} = "
               f"{g(p3 * NPV3)} and {g(1 - p3)} × {g(NPV3)} = {g((1 - p3) * NPV3)}.</p>"),
         "criteria": [
             f"The senior loan is risk-free ({g(L3 + d3)} covers it), so its face value is {g(I3)} × {g(R3)} = "
             f"€{g(Fsen3)} million. A face value of {g(I3)} forgets the interest.",
             f"Bank: ({g(p3)} × {g(F3)} + {g(1 - p3)} × {g(bank3_lav_sen)})/{g(R3)} = {f(D3_sen)}.",
             f"Equity: {g(p3)} × ({g(H3 + d3)} − {g(Fsen3)} − {g(F3)})/{g(R3)} = {f(E3_sen)}, above {f(E3_0)}, so "
             "Altmark installs the panels.",
             f"The bank is better off than in (a): {f(D3_sen)} against {f(D3_0)}.",
             f"The check {sg(E3_sen - E3_0)} + {g(D3_sen - D3_0)} = {g(NPV3)} = the NPV is a bonus."]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Most loan agreements forbid new debt that is senior to the existing loan. Why do lenders insist on "
             "this covenant? Is it always bad for the owners? Explain briefly.</p>"),
         "solution": (
             "<p><b>Why lenders insist.</b> If a firm could freely issue new senior debt, every new loan would push "
             "the existing lender further back in the queue. The owner could borrow senior to pay a dividend or to "
             "fund a bad project. The new lender would then be paid out of the assets the existing lender counted "
             "on. Lenders who expect this would refuse to lend or demand a much higher rate. Senior debt used for a "
             "safe positive-NPV project, as in (d), can help both sides; used for a risky project or a payout, it "
             "takes value from the existing lender.</p>"
             "<p><b>Is the covenant bad for the owners?</b> Ex post it can be: here it would block a positive-NPV "
             "project unless the bank waives it or renegotiates. Ex ante it is good for them: by promising not to "
             "dilute the lender, the owners can borrow on better terms, so they bear less of the agency cost of "
             "debt.</p>"),
         "criteria": [
             "Lenders want the covenant because new senior debt would dilute their claim: the owner could keep "
             "issuing claims ahead of them (Kurbatov, recording 04, 46:24 to 47:49).",
             "Bonus: senior debt for a risky project or a payout would transfer wealth from the bank.",
             "Basic answer accepted: ex post the covenant can block a positive-NPV project, as here, unless the "
             "bank waives it.",
             "Full marks also give the ex ante view: the covenant makes the debt cheaper when it is issued, so the "
             "owners benefit."]},
    ],
}

# ---------------------------------------------------------------- cds-1
OPPG["mk-cds-1"] = {
    "n": 1, "title": "Credit risk", "points": 20,
    "topic": "Risky debt and credit default swaps", "chapters": [5, 22, 24],
    "merke": "Samme form som CDS-eksemplet i forelesning 13",
    "body": (
        "<p>Consider two one-year zero-coupon bonds, each with a face value of $100. Bond 1 is a US Treasury bill "
        f"with a yield to maturity of {pc(rfA, 0)}, the risk-free rate. Bond 2 is issued by Kettering Paper Mills "
        f"Inc. and has a promised yield to maturity of {pc(yA, 1)}. Analysts estimate that Kettering defaults with "
        f"probability {pc(pA, 0)}. Default can only happen at maturity. In default a holder of bond 2 receives "
        f"${g(RA)} instead of $100.</p>"
        "<p>A credit default swap (CDS) contract on Kettering pays $1 at maturity if Kettering defaults and "
        "nothing otherwise. It is paid for today. Let ρ denote the risk-neutral probability that Kettering "
        "defaults. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What are the prices of bond 1 and bond 2 today?</p>",
         "solution": (
             "<p>Each bond promises $100 in one year.</p>"
             f"<p>Bond 1 = 100/{g(1 + rfA)} = <b>${f(P1A)}</b><br>Bond 2 = 100/{g(1 + yA)} = <b>${f(P2A)}</b></p>"
             "<p>The price of bond 2 comes from its promised payment and its promised yield. It says nothing yet "
             "about the chance of default.</p>"),
         "criteria": [
             f"Bond 1 priced at the risk-free rate: 100/{g(1 + rfA)} = {f(P1A)}.",
             f"Bond 2 priced from the promised payment and the promised yield: 100/{g(1 + yA)} = {f(P2A)}.",
             "Putting the default probability or the recovery into the price of bond 2 is an error: the yield "
             "already gives the market price."]},
        {"label": "b", "points": 3,
         "body": "<p>What is the expected return on bond 2? Why does it differ from the promised yield?</p>",
         "solution": (
             "<p>The expected return uses the analysts' probability:</p>"
             f"<p>E[payoff] = {g(1 - pA)} × 100 + {g(pA)} × {g(RA)} = {g((1 - pA) * FA)} + {g(pA * RA)} = "
             f"{g(EpA)}<br>Expected return = {g(EpA)}/{f(P2A)} − 1 = <b>{pc(ErA, 4)}</b></p>"
             f"<p>The promised yield of {pc(yA, 1)} is earned only if Kettering does not default. With a "
             f"{pc(pA, 0)} chance of receiving {g(RA)} instead of 100, the expected return is lower. It is still "
             f"above the risk-free {pc(rfA, 0)}: the {f(100 * (ErA - rfA), 2)} points are a risk premium, because "
             "Kettering is most likely to default when the economy is weak.</p>"),
         "criteria": [
             f"Expected payoff {g(1 - pA)} × 100 + {g(pA)} × {g(RA)} = {g(EpA)} with the analysts' probability.",
             f"Expected return {g(EpA)}/{f(P2A)} − 1 = {pc(ErA)}.",
             f"Lower than the {pc(yA, 1)} yield because the yield is the promised return, earned only without "
             "default.",
             f"Bonus: above the risk-free {pc(rfA, 0)} because default risk is systematic, so bondholders earn a "
             "risk premium."]},
        {"label": "c", "points": 4,
         "body": "<p>What risk-neutral probability of default ρ does the price of bond 2 imply?</p>",
         "solution": (
             "<p><b>Draw the tree.</b> ρ is the risk-neutral probability of <b>default</b>, so it goes on the "
             "bottom branch:</p>"
             + tab(["Branch", "Probability", "Bond 2", "CDS"],
                   [["No default", "1 − ρ", "100", "0"], ["Default", "ρ", g(RA), "1"]])
             + "<p><b>Price bond 2 risk-neutrally.</b> The expected payoff under ρ, discounted at the risk-free rate, "
               "must equal the market price:</p>"
               f"<p>{f(P2A)} × {g(1 + rfA)} = (1 − ρ) × 100 + ρ × {g(RA)}<br>{f(FVA)} = 100 − {g(tapA)}ρ<br>"
               f"ρ = {f(FA - FVA)}/{g(tapA)} = <b>{f(rhoA)}</b> ({pc(rhoA)})</p>"
               f"<p><b>The trap.</b> Writing ρ × 100 + (1 − ρ) × {g(RA)} gives {f(1 - rhoA)}, the probability of "
               "<i>survival</i>. Either convention works if it is kept to the end, but here ρ is defined as the "
               "default probability.</p>"),
         "criteria": [
             "Pricing condition: the expected payoff under risk-neutral probabilities, discounted at the risk-free "
             f"rate, equals the market price: {f(P2A)} × {g(1 + rfA)} = (1 − ρ)100 + {g(RA)}ρ.",
             f"ρ = {f(FA - FVA)}/{g(tapA)} = {f(rhoA)} as the probability of default.",
             f"Discounts at the risk-free {pc(rfA, 0)}, not at the promised yield (which would give ρ = 0).",
             f"Confusing ρ and 1 − ρ ({f(1 - rhoA)}) is the error Kurbatov singled out (recording 13, 27:31)."]},
        {"label": "d", "points": 3,
         "body": "<p>What is the price of one CDS contract? (If you could not solve (c), use ρ = 0.10.)</p>",
         "solution": (
             "<p>The CDS pays 1 only in the default branch. Price it with the same ρ and the risk-free rate:</p>"
             f"<p>CDS = [(1 − ρ) × 0 + ρ × 1]/{g(1 + rfA)} = {f(rhoA)}/{g(1 + rfA)} = <b>${f(cdsA)}</b> per "
             f"contract ({f(cdsA, 6)} unrounded)</p>"
             f"<p>With the fallback ρ = 0.10 the price would be 0.10/{g(1 + rfA)} = {f(cdsA_reserve)}. Using the "
             f"survival probability gives {f(cdsA_felle)} and using the analysts' {pc(pA, 0)} gives "
             f"{f(cdsA_sann)}; both are wrong.</p>"),
         "criteria": [
             f"CDS = ρ/{g(1 + rfA)} = {f(cdsA)}.",
             f"Uses the risk-neutral ρ and the risk-free rate. The analysts' {pc(pA, 0)} gives {f(cdsA_sann)}.",
             f"Keeps ρ as the default probability: the CDS pays in the default branch. Using {f(1 - rhoA)} gives "
             f"{f(cdsA_felle)}.",
             f"With the fallback ρ = 0.10, the answer 0.10/{g(1 + rfA)} = {f(cdsA_reserve)} earns full marks."]},
        {"label": "e", "points": 4,
         "body": (
             "<p>An investor holds one bond 2. How many CDS contracts must the investor buy so that the position "
             "pays the same amount whether or not Kettering defaults? What do the contracts cost and what is the "
             "bond together with the contracts worth today? Compare with the price of bond 1.</p>"),
         "solution": (
             f"<p>In default the holder receives {g(RA)} instead of the promised 100, a loss of {g(tapA)}. Each "
             f"contract pays 1 in default, so the investor needs <b>{g(nA)} contracts</b> (face value × loss given "
             f"default = 100 × {pc(tapA / FA, 0)}, Kurbatov's λ).</p>"
             f"<p>Cost of the contracts = {g(nA)} × {f(cdsA, 6)} = <b>${f(kostA)}</b><br>Bond plus contracts = "
             f"{f(P2A)} + {f(kostA)} = <b>${f(posA)}</b></p>"
             f"<p>The position pays 100 without default and {g(RA)} + {g(nA)} = 100 with default, so it is a "
             "risk-free claim on 100: <b>it costs exactly as much as bond 1</b> ✓. The contracts cost the gap "
             f"between the two bond prices, {f(P1A)} − {f(P2A)} = {f(P1A - P2A)}. With the fallback CDS price from (d) "
             f"the contracts would cost {g(nA)} × {f(cdsA_reserve)} = {f(nA * cdsA_reserve)}.</p>"),
         "criteria": [
             f"Number of contracts = the loss in default: 100 − {g(RA)} = {g(nA)} (face value × loss given "
             "default).",
             f"Cost {g(nA)} × {f(cdsA)} = {f(kostA)}.",
             f"Bond plus contracts = {f(P2A)} + {f(kostA)} = {f(posA)}, equal to the price of bond 1, because the "
             "position pays 100 in both states.",
             "Buying 100 contracts (one per dollar of face value) is the classic error."]},
        {"label": "f", "points": 3,
         "body": (
             f"<p>Compare ρ with the analysts' {pc(pA, 0)}. Why is there a difference? Which of the two should be "
             "used to price the CDS?</p>"),
         "solution": (
             f"<p>ρ = {pc(rhoA)} is about {f(rhoA / pA, 1)} times the analysts' {pc(pA, 0)}, which is the real "
             "probability. Kettering is most likely to default when the economy is weak, when a dollar is worth "
             "more to investors, so they demand a risk premium for holding the bond. Risk-neutral valuation keeps "
             "the risk-free rate in the denominator and moves that premium into the probabilities instead, which "
             "puts more weight on the default state. ρ is the probability at which the market price makes "
             "sense.</p>"
             "<p>The CDS is a traded claim on the same default event, so it must be priced with ρ and the risk-free "
             f"rate. With the real {pc(pA, 0)} the CDS would cost {f(cdsA_sann)}. Bond 2 plus {g(nA)} contracts "
             f"would then cost {f(P2A)} + {g(nA)} × {f(cdsA_sann)} = {f(posA_sann)}, less than bond 1 for the same "
             "risk-free payoff of 100: an arbitrage.</p>"),
         "criteria": [
             f"States that ρ ({pc(rhoA)}) is higher than the real {pc(pA, 0)}.",
             "Explains why: default happens in bad times, so investors demand a risk premium, which risk-neutral "
             "valuation puts into the probability instead of the discount rate.",
             "Says that the CDS is priced with ρ and the risk-free rate, not with the real probability.",
             f"Bonus: with {pc(pA, 0)} the hedged bond would cost less than bond 1, an arbitrage."]},
    ],
}

# ---------------------------------------------------------------- cds-2
OPPG["mk-cds-2"] = {
    "n": 1, "title": "Credit risk", "points": 20,
    "topic": "Risky debt, credit default swaps and put options", "chapters": [5, 22, 24],
    "merke": "Samme form som V2024 Problem 3",
    "body": (
        "<p>Oksfjord Havbruk ASA, a salmon farmer, has one bond issue: zero-coupon bonds with a total face value of "
        f"NOK {g(FtotB)} million, due in one year and split into bonds of NOK {g(FB)} each. The bonds trade at a "
        f"promised yield to maturity of {pc(yB, 0)}. Default can only happen at maturity. If Oksfjord defaults, the "
        f"bondholders take over its assets, which will then be worth NOK {g(VdB)} million. Rating analysts estimate "
        f"the probability of default at {pc(pB, 0)}. One-year government zero-coupon bonds yield {pc(rfB, 1)}, the "
        "risk-free rate.</p>"
        "<p>A CDS contract on Oksfjord pays NOK 1 at maturity if Oksfjord defaults and nothing otherwise. It is "
        "paid for today. Let ρ denote the risk-neutral probability that Oksfjord defaults. Use 4 decimal "
        "places.</p>"),
    "parts": [
        {"label": "a", "points": 4,
         "body": (
             f"<p>What are the prices today of a government bond and an Oksfjord bond, both with face value NOK "
             f"{g(FB)}? What is the expected return on an Oksfjord bond?</p>"),
         "solution": (
             f"<p>Government bond = {g(FB)}/{g(1 + rfB)} = <b>NOK {f(P1B)}</b><br>Oksfjord bond = {g(FB)}/"
             f"{g(1 + yB)} = <b>NOK {f(P2B)}</b></p>"
             f"<p>In default the assets of NOK {g(VdB)} million are shared by bonds with a face value of NOK "
             f"{g(FtotB)} million, so a bond of NOK {g(FB)} receives {g(FB)} × {g(VdB)}/{g(FtotB)} = {g(RB)}.</p>"
             f"<p>E[payoff] = {g(1 - pB)} × {g(FB)} + {g(pB)} × {g(RB)} = {g((1 - pB) * FB)} + {g(pB * RB)} = "
             f"{g(EpB)}<br>Expected return = {g(EpB)}/{f(P2B)} − 1 = <b>{pc(ErB, 4)}</b></p>"
             f"<p>The expected return lies between the risk-free {pc(rfB, 1)} and the promised {pc(yB, 0)}: below "
             "the yield because of the expected loss in default, above the risk-free rate because default risk is "
             "systematic.</p>"),
         "criteria": [
             f"Government bond {g(FB)}/{g(1 + rfB)} = {f(P1B)}; Oksfjord bond {g(FB)}/{g(1 + yB)} = {f(P2B)}.",
             f"Recovery per bond {g(FB)} × {g(VdB)}/{g(FtotB)} = {g(RB)}.",
             f"Expected payoff {g(1 - pB)} × {g(FB)} + {g(pB)} × {g(RB)} = {g(EpB)} and expected return "
             f"{g(EpB)}/{f(P2B)} − 1 = {pc(ErB)}.",
             f"Using {g(VdB)} per bond as the recovery (expected return {pc(ErB_felle)}) is the classic error."]},
        {"label": "b", "points": 6,
         "body": "<p>What is ρ, as implied by the bond prices? What is the price of one CDS contract?</p>",
         "solution": (
             tab(["Branch", "Probability", "Oksfjord bond", "CDS"],
                 [["No default", "1 − ρ", g(FB), "0"], ["Default", "ρ", g(RB), "1"]])
             + f"<p><b>ρ from the bond price.</b> {f(P2B)} × {g(1 + rfB)} = (1 − ρ) × {g(FB)} + ρ × {g(RB)}<br>"
               f"{f(FVB)} = {g(FB)} − {g(FB - RB)}ρ<br>ρ = {f(FB - FVB)}/{g(FB - RB)} = <b>{f(rhoB)}</b> "
               f"({pc(rhoB)})</p>"
               f"<p><b>The CDS.</b> CDS = [(1 − ρ) × 0 + ρ × 1]/{g(1 + rfB)} = {f(rhoB, 6)}/{g(1 + rfB)} = "
               f"<b>NOK {f(cdsB)}</b> per contract ({f(cdsB, 6)} unrounded)</p>"
               f"<p>ρ is the default probability, on the bottom branch. The survival probability, {f(1 - rhoB)}, "
               f"would give a CDS price of {f(cdsB_felle)}, far too high for insurance that pays only in "
               "default.</p>"),
         "criteria": [
             "Pricing condition with risk-neutral probabilities and the risk-free rate: "
             f"{f(P2B)} × {g(1 + rfB)} = (1 − ρ){g(FB)} + {g(RB)}ρ.",
             f"ρ = {f(FB - FVB)}/{g(FB - RB)} = {f(rhoB)} as the probability of default.",
             f"CDS = ρ/{g(1 + rfB)} = {f(cdsB)}.",
             f"Confusing ρ and 1 − ρ ({f(1 - rhoB)}) or using the analysts' {pc(pB, 0)} ({f(cdsB_sann)}) is the "
             "classic error.",
             "Show the calculation."]},
        {"label": "c", "points": 6,
         "body": (
             f"<p>Consider a European put option on Oksfjord's assets with a strike price of NOK {g(FtotB)} million "
             "that expires when the bonds mature. What is it worth today? Compare it with the difference between "
             "the value of an otherwise identical risk-free bond issue and the market value of Oksfjord's bond "
             "issue. (If you could not solve (b), use a CDS price of 0.09.)</p>"),
         "solution": (
             "<p><b>The put's payoff.</b> Oksfjord defaults exactly when its assets are worth less than the face "
             f"value of {g(FtotB)}. Then the assets are worth {g(VdB)} and the put pays {g(FtotB)} − {g(VdB)} = "
             f"{g(FtotB - VdB)} (NOK million). Without default the assets are worth more than {g(FtotB)} and the "
             f"put pays nothing. So the put pays {g(FtotB - VdB)} in the default branch: it is worth "
             f"{g(FtotB - VdB)} million CDS contracts.</p>"
             f"<p>Put = {g(FtotB - VdB)} × {f(cdsB, 6)} = <b>NOK {f(putB)} million</b></p>"
             f"<p><b>The two bond issues.</b> Risk-free issue = {g(FtotB)}/{g(1 + rfB)} = <b>NOK {f(rfutstB)} "
             f"million</b>. Oksfjord's issue = {f(nobB, 0)} bonds × {f(P2B)} = {g(FtotB)}/{g(1 + yB)} = <b>NOK "
             f"{f(utstB)} million</b>. Difference = {f(rfutstB)} − {f(utstB)} = <b>{f(rfutstB - utstB)}</b>, the "
             "value of the put ✓</p>"
             f"<p>Per bond the same holds: {f(P1B)} − {f(P2B)} = {f(P1B - P2B)} = ({g(FB)} − {g(RB)}) × CDS. With "
             f"the fallback CDS price of 0.09, the put would be worth {g(FtotB - VdB)} × 0.09 = "
             f"{f(putB_reserve, 2)}.</p>"),
         "criteria": [
             f"The put pays {g(FtotB)} − {g(VdB)} = {g(FtotB - VdB)} million in default and nothing otherwise.",
             f"Put = {g(FtotB - VdB)} × CDS = {g(FtotB - VdB)} × {f(cdsB)} = NOK {f(putB, 2)} million (or ρ × "
             f"{g(FtotB - VdB)}/{g(1 + rfB)}).",
             f"Risk-free issue {g(FtotB)}/{g(1 + rfB)} = {f(rfutstB)}; market value of the issue "
             f"{g(FtotB)}/{g(1 + yB)} = {f(utstB)}.",
             f"The difference, {f(rfutstB - utstB)}, equals the put: risky debt = PV(face value) − put. A student on "
             f"the fallback CDS price (put {f(putB_reserve, 2)}) gets these points for saying that the two should be "
             "equal.",
             f"A per-bond answer ({f(putB_per)} per bond of {g(FB)}) earns the points only if it is scaled to the "
             "whole issue."]},
        {"label": "d", "points": 4,
         "body": (
             "<p>Explain the comparison in (c). In effect, who holds this put and what right does it represent? "
             "What would happen to the value of Oksfjord's bonds if its assets became riskier while the face value "
             "stayed the same?</p>"),
         "solution": (
             f"<p><b>Why the gap is the put.</b> The bondholders receive min(V, {g(FtotB)}) = {g(FtotB)} − "
             f"max({g(FtotB)} − V, 0): the face value minus the payoff of a put on the assets with strike "
             f"{g(FtotB)}. So Oksfjord's debt = PV({g(FtotB)}) − put, or in Kurbatov's words a risk-free debt plus a "
             "written put on the assets. The bonds are worth less than risk-free bonds by exactly the value of "
             "that put.</p>"
             "<p><b>Who holds the put.</b> The shareholders. Limited liability gives them the right to default: if "
             f"the assets are worth less than {g(FtotB)}, they hand the assets ({g(VdB)}) to the bondholders instead "
             f"of paying {g(FtotB)}. Buying {g(FtotB - VdB)} million CDS contracts would buy that put back and make "
             "the bonds risk-free.</p>"
             "<p><b>Riskier assets.</b> A put is worth more when the underlying is more volatile. With riskier "
             "assets and the same face value, the shareholders' option to default is worth more, so the bonds are "
             "worth less and the equity more: a wealth transfer from the bondholders to the shareholders.</p>"),
         "criteria": [
             f"Payoff to the bondholders min(V, {g(FtotB)}) = {g(FtotB)} − max({g(FtotB)} − V, 0), so the debt is "
             "worth PV(face value) − put (a risk-free debt plus a written put on the assets).",
             "The shareholders hold the put: limited liability gives them the right to default and hand over the "
             "assets instead of paying the face value.",
             "Riskier assets raise the value of the put, so the bonds lose value and the equity gains.",
             "The sign error, risk-free debt plus a bought put, is wrong: the bondholders have written the put, so "
             "debt = PV(F) − P."]},
    ],
}

# ---------------------------------------------------------------- cds-3
OPPG["mk-cds-3"] = {
    "n": 1, "title": "Credit risk", "points": 20,
    "topic": "Risky debt and credit default swaps", "chapters": [5, 22, 24],
    "merke": "Som CDS-eksemplet i forelesning 13, med løpetid 18 måneder og sikringen først",
    "body": (
        "<p>Vellmar Autoteile AG, a German car-parts supplier, has issued zero-coupon bonds with a face value of "
        f"€{g(FC)} that mature in 18 months. They trade at a promised yield to maturity of {pc(yC, 1)} a year. "
        f"German government zero-coupon bonds with the same maturity yield {pc(rfC, 0)} a year, the risk-free rate. "
        "Default can only happen at maturity. Analysts put the probability that Vellmar defaults before the bonds "
        f"are repaid at {pc(pC, 1)} (over the whole 18 months, not per year). In default a bondholder receives "
        f"€{g(RC)} per bond.</p>"
        "<p>A CDS contract on Vellmar pays €1 at maturity if Vellmar defaults and nothing otherwise. It is paid "
        "for today. Let ρ denote the risk-neutral probability that Vellmar defaults. All rates are annually "
        "compounded; use (1 + r)<sup>T</sup> also for a fraction of a year. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": (
             f"<p>What are the prices today of a government bond and a Vellmar bond, each with face value "
             f"€{g(FC)}?</p>"),
         "solution": (
             f"<p>Both bonds pay €{g(FC)} in 1.5 years. Discount with (1 + r)<sup>1.5</sup>:</p>"
             f"<p>Government bond = 100/{g(1 + rfC)}<sup>1.5</sup> = 100/{f(gC, 6)} = <b>€{f(P1C)}</b><br>"
             f"Vellmar bond = 100/{g(1 + yC)}<sup>1.5</sup> = 100/{f(hC, 6)} = <b>€{f(P2C)}</b></p>"
             "<p>Simple interest, 100/(1 + 1.5 × r), is not the convention here.</p>"),
         "criteria": [
             f"Discounts over 1.5 years with (1 + r) raised to 1.5: 100/{g(1 + rfC)}^1.5 = {f(P1C)}.",
             f"Vellmar bond 100/{g(1 + yC)}^1.5 = {f(P2C)}.",
             f"Discounting one year only ({f(FC / (1 + rfC))} and {f(FC / (1 + yC))}) or using simple interest "
             f"({f(P1C_enkel)} and {f(P2C_enkel)}) is an error."]},
        {"label": "b", "points": 4,
         "body": (
             f"<p>An insurance company holds Vellmar bonds with a total face value of €{g(HC)} million and wants to "
             "remove all default risk with CDS contracts. How many contracts must it buy? Without using any "
             "probability, what must the bonds together with the contracts be worth today? What must the "
             "contracts then cost in total?</p>"),
         "solution": (
             f"<p><b>Number of contracts.</b> A bond with face €100 loses 100 − {g(RC)} = {g(FC - RC)} in default, "
             f"{pc((FC - RC) / FC, 0)} of the face value. The holding has a face value of €{g(HC)} million, so the "
             f"insurer loses {g(HC)} × {pc((FC - RC) / FC, 0)} = €{g(nC)} million in default and needs <b>{g(nC)} "
             "million contracts</b> (face value × loss given default, Kurbatov's λ).</p>"
             f"<p><b>Value of the hedged holding.</b> Without default the bonds pay {g(HC)} million and the contracts "
             f"nothing; with default the bonds pay {g(HC)} × {pc(RC / FC, 0)} = {g(HC * RC / FC)} million and the "
             f"contracts {g(nC)} million. The holding pays €{g(HC)} million in 1.5 years in both states, so it is "
             "worth as much as government bonds with the same face value:</p>"
             f"<p>Hedged holding = {g(HC)}/{g(1 + rfC)}<sup>1.5</sup> = <b>€{f(statC)} million</b></p>"
             f"<p><b>Cost of the contracts.</b> The bonds are worth {f(HC * 1e6 / FC, 0)} × {f(P2C)} = "
             f"€{f(obligC)} million, so the contracts must cost {f(statC)} − {f(obligC)} = <b>€{f(kostC)} "
             "million</b>. If they cost less, buying the bonds and the contracts and selling government bonds "
             "would be an arbitrage.</p>"),
         "criteria": [
             f"Contracts = face value × loss given default = {g(HC)} million × {pc((FC - RC) / FC, 0)} = {g(nC)} "
             f"million. Buying {g(HC)} million (one per euro of face value) is the classic error.",
             f"The hedged holding pays {g(HC)} million in both states, so it is worth {g(HC)}/{g(1 + rfC)}^1.5 = "
             f"€{f(statC)} million, the value of government bonds with the same face value.",
             f"Contracts in total: {f(statC)} − {f(obligC)} = €{f(kostC)} million.",
             "No probability is needed: the answer follows from the absence of arbitrage."]},
        {"label": "c", "points": 5,
         "body": (
             "<p>What is the price of one CDS contract? What risk-neutral probability of default ρ does it imply? "
             "Check that the same ρ prices the Vellmar bond. (If you could not solve (b), use a total cost of "
             f"€{g(kostC_reserve)} million.)</p>"),
         "solution": (
             f"<p><b>One contract.</b> CDS = {f(kostC, 6)}/{g(nC)} = <b>€{f(cdsC)}</b> ({f(cdsC, 6)} unrounded)</p>"
             f"<p><b>ρ.</b> The CDS pays €1 in 1.5 years in the default branch, so CDS = ρ/{g(1 + rfC)}<sup>1.5</sup> "
             f"and ρ = {f(cdsC, 6)} × {f(gC, 6)} = <b>{f(rhoC)}</b> ({pc(rhoC)}), the probability of default over "
             "the whole 1.5 years.</p>"
             + tab(["Branch", "Probability", "Vellmar bond", "CDS"],
                   [["No default", "1 − ρ", g(FC), "0"], ["Default", "ρ", g(RC), "1"]])
             + f"<p><b>Check.</b> [(1 − ρ) × 100 + ρ × {g(RC)}]/{g(1 + rfC)}<sup>1.5</sup> = (100 − {g(FC - RC)} × "
               f"{f(rhoC)})/{f(gC, 6)} = {f(FVC)}/{f(gC, 6)} = {f(P2C)} ✓, the price from (a).</p>"
               f"<p>With the fallback cost of €{g(kostC_reserve)} million, CDS = {f(cdsC_reserve)} and ρ = "
               f"{f(rhoC_reserve)}. Simple interest on the risk-free rate gives a CDS price of {f(cdsC_enkel)} and "
               f"ρ = {f(rhoC_enkel)}; simple interest everywhere gives {f(cdsC_helenkel)} and {f(rhoC_helenkel)}. "
               f"Discounting one year only gives ρ = {f(rhoC_ettaar)}.</p>"),
         "criteria": [
             f"CDS = total cost / number of contracts = {f(kostC)}/{g(nC)} = {f(cdsC)}.",
             f"ρ = CDS × {g(1 + rfC)}^1.5 = {f(rhoC)}, the probability of default over the life of the bond.",
             f"Check: (1 − ρ)100 + {g(RC)}ρ discounted over 1.5 years at the risk-free rate returns {f(P2C)}.",
             "Keeps ρ as the default probability: confusing ρ and 1 − ρ is the classic error.",
             f"With the fallback €{g(kostC_reserve)} million, {f(cdsC_reserve)} and {f(rhoC_reserve)} earn full "
             "marks."]},
        {"label": "d", "points": 4,
         "body": (
             "<p>What is the expected annual return on a Vellmar bond, using the analysts' probability? Compare it "
             "with the promised yield and with the risk-free rate.</p>"),
         "solution": (
             f"<p>E[payoff] = {g(1 - pC)} × 100 + {g(pC)} × {g(RC)} = {g((1 - pC) * FC)} + {g(pC * RC)} = "
             f"{g(EpC)} in 1.5 years.<br>Return over the 1.5 years = {g(EpC)}/{f(P2C)} − 1 = {pc(avkC, 4)}<br>"
             f"Expected annual return = ({g(EpC)}/{f(P2C)})<sup>1/1.5</sup> − 1 = <b>{pc(ErC, 4)}</b></p>"
             f"<p>The promised yield of {pc(yC, 1)} a year is earned only if Vellmar does not default, so the "
             f"expected return is lower. It stays above the risk-free {pc(rfC, 0)}: the difference is the risk "
             "premium for default risk that is systematic. That premium is also why ρ from (c) is higher than the "
             f"analysts' {pc(pC, 1)}. Dividing {pc(avkC, 4)} by 1.5 ({pc(ErC_delt, 4)}) does not give the annual "
             "rate.</p>"),
         "criteria": [
             f"Expected payoff {g(1 - pC)} × 100 + {g(pC)} × {g(RC)} = {g(EpC)} with the analysts' probability.",
             f"Annualises correctly: ({g(EpC)}/{f(P2C)})^(1/1.5) − 1 = {pc(ErC)} a year. Reporting the 1.5-year "
             f"return of {pc(avkC)}, or dividing it by 1.5, is the classic error.",
             f"Below the {pc(yC, 1)} promised yield because the yield is earned only without default.",
             f"Above the risk-free {pc(rfC, 0)} because default risk is systematic, so bondholders earn a risk "
             "premium."]},
        {"label": "e", "points": 4,
         "body": (
             f"<p>The analysts raise their estimate of the default probability from {pc(pC, 1)} to {pc(pC2, 0)}, but "
             "the price of the Vellmar bond does not move. What happens to ρ, to the CDS price and to the expected "
             "return on the bond? Explain briefly.</p>"),
         "solution": (
             "<p><b>ρ and the CDS price do not change.</b> ρ comes from the market price of the bond, the risk-free "
             f"rate, the face value and the recovery. None of these has moved, so ρ stays at {f(rhoC)} and the CDS "
             f"at €{f(cdsC)}. The CDS is priced from traded prices, not from the analysts' estimate.</p>"
             f"<p><b>The expected return falls.</b> With {pc(pC2, 0)}, E[payoff] = {g(1 - pC2)} × 100 + {g(pC2)} × "
             f"{g(RC)} = {g(EpC2)} and the expected annual return is ({g(EpC2)}/{f(P2C)})<sup>1/1.5</sup> − 1 = "
             f"{pc(ErC2)}, against {pc(ErC)} before. It is still above the risk-free {pc(rfC, 0)}, but the risk "
             "premium is smaller: the same price now buys a riskier claim. ρ stays above the real probability "
             "because the market still demands compensation for losses that come in bad times.</p>"),
         "criteria": [
             "ρ and the CDS price are unchanged: they depend only on the bond price, the risk-free rate, the face "
             "value and the recovery, not on the real probability.",
             f"The expected return falls (to about {pc(ErC2)} a year) because more of the promised payment is "
             "expected to be lost; the risk premium over the risk-free rate shrinks.",
             f"Recomputing the CDS with the new real probability ({pc(pC2, 0)} gives {f(cdsC_ny_sann)}) is the "
             "classic error."]},
    ],
}

# ---------------------------------------------------------------- risikoskifting-1
OPPG["mk-risikoskifting-1"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt and risk taking", "chapters": [9],
    "merke": "Samme form som eksemplet i forelesning 04 (55:46 til 1:03:12)",
    "body": (
        "<p>Vikebygd Gartneri AS grows vegetables in greenhouses on a supply contract with a supermarket chain. Its "
        f"only debt is a zero-coupon bank loan with a face value of NOK {g(K4)} million, due in one year. If "
        f"Vikebygd keeps the contract, its assets will be worth NOK {g(A4)} million next year for sure. If Vikebygd "
        "cannot repay in full, the bank takes over the assets at no extra cost. The manager acts in the interests of "
        "the shareholders. Everyone is risk neutral, there is no discounting and there are no taxes.</p>"
        "<p>At no cost, the manager can drop the contract and grow an exotic crop for export at spot prices. The "
        f"assets would then be worth NOK {g(H4)} million next year with probability 50% and NOK {g(L4)} million "
        "with probability 50%.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>If Vikebygd keeps the contract, what are the bank loan and the shares worth today?</p>",
         "solution": (
             f"<p>The assets will be worth {g(A4)}, which is below the face value of {g(K4)}, so Vikebygd defaults "
             f"for sure. The bank takes the whole {g(A4)} and the shareholders get nothing.</p>"
             f"<p>Bank loan = <b>NOK {g(D4_0)} million</b> and shares = <b>NOK 0</b>.</p>"
             f"<p><b>Check.</b> {g(D4_0)} + 0 = {g(A4)}, the value of the assets ✓</p>"),
         "criteria": [
             f"Recognises certain default: {g(A4)} is below the face value of {g(K4)}.",
             f"Loan worth {g(D4_0)}, not the face value of {g(K4)}; shares worth 0.",
             "Limited liability: the shareholders cannot be worth less than zero."]},
        {"label": "b", "points": 2,
         "body": (
             "<p>What are the assets expected to be worth with the export strategy? Would Vikebygd switch if it "
             "had no debt?</p>"),
         "solution": (
             f"<p>Expected value = 0.5 × {g(H4)} + 0.5 × {g(L4)} = <b>NOK {g(V4_r)} million</b>, against {g(A4)} "
             f"with the contract. The switch lowers the value by {g(-NPV4)}: its NPV is {g(NPV4)}. <b>Without debt "
             "Vikebygd would not switch</b>, because the shareholders would own all the assets and bear the whole "
             "loss.</p>"),
         "criteria": [
             f"Expected value 0.5 × {g(H4)} + 0.5 × {g(L4)} = {g(V4_r)}.",
             f"Compares with {g(A4)}: the switch has a negative NPV of {g(NPV4)}.",
             "Without debt the firm would keep the contract."]},
        {"label": "c", "points": 5,
         "body": "<p>What are the bank loan and the shares worth today if the manager switches? Will the manager switch?</p>",
         "solution": (
             tab(["Outcome", "Probability", "Assets", "Bank loan", "Shares"],
                 [["Good", "50%", g(H4), g(gjeld(H4, K4)), g(ek(H4, K4))],
                  ["Bad", "50%", g(L4), g(gjeld(L4, K4)), g(ek(L4, K4))]])
             + f"<p>Bank loan = 0.5 × {g(K4)} + 0.5 × {g(L4)} = <b>NOK {g(D4_r)} million</b><br>Shares = 0.5 × "
               f"{g(ek(H4, K4))} + 0.5 × 0 = <b>NOK {g(E4_r)} million</b></p>"
               f"<p><b>Check.</b> {g(D4_r)} + {g(E4_r)} = {g(V4_r)} ✓</p>"
               f"<p><b>The manager switches</b>: the shares are worth {g(E4_r)} instead of 0. Keeping the contract "
               "means certain default, while the export strategy gives the firm a chance to survive.</p>"),
         "criteria": [
             "Values the claims state by state: the bank gets min(assets, face value), the shares max(assets − face "
             "value, 0).",
             f"Bank loan 0.5 × {g(K4)} + 0.5 × {g(L4)} = {g(D4_r)}.",
             f"Shares 0.5 × ({g(H4)} − {g(K4)}) = {g(E4_r)}.",
             f"The manager switches, because {g(E4_r)} is more than 0, even though the firm loses value.",
             "Show the calculation."]},
        {"label": "d", "points": 4,
         "body": (
             "<p>By how much does the switch change the value of the bank loan? Split the change into a wealth "
             "transfer to the shareholders and a loss of value.</p>"),
         "solution": (
             f"<p>The bank loan falls from {g(D4_0)} to {g(D4_r)}: a change of <b>{g(dD4)}</b>.</p>"
             + tab(["Part of the bank's loss", "Amount", "Why"],
                   [["Wealth transfer to the shareholders", g(overf4),
                     f"the shares rise from 0 to {g(E4_r)}"],
                    ["Loss of value", g(tap4), f"the assets are worth {g(V4_r)} instead of {g(A4)}"],
                    ["Total", g(-dD4), ""]])
             + f"<p><b>Check.</b> {g(overf4)} + {g(tap4)} = {g(-dD4)} ✓. In other words, the {g(A4)} the bank "
               f"would have received splits into {g(D4_r)} it still expects, {g(overf4)} that goes to the "
               f"shareholders and {g(tap4)} that disappears. The bank pays for both the transfer and the "
               "inefficiency.</p>"),
         "criteria": [
             f"Change in the loan: {g(D4_r)} − {g(D4_0)} = {g(dD4)}.",
             f"Wealth transfer to the shareholders: {g(overf4)}.",
             f"Loss of value: {g(A4)} − {g(V4_r)} = {g(tap4)}.",
             f"The parts add up: {g(overf4)} + {g(tap4)} = {g(-dD4)}."]},
        {"label": "e", "points": 3,
         "body": (
             f"<p>Suppose the probability of the good outcome were only {pc(p4e, 0)}, with the two values "
             "unchanged. Would the manager still switch? What would the bank loan, the shares and the assets then "
             "be worth?</p>"),
         "solution": (
             f"<p>Shares = {g(p4e)} × {g(ek(H4, K4))} = <b>NOK {g(E4_e)} million</b>, still more than 0, so <b>the "
             "manager still switches</b>.<br>"
             f"Bank loan = {g(p4e)} × {g(K4)} + {g(1 - p4e)} × {g(L4)} = {g(p4e * K4)} + {g((1 - p4e) * L4)} = <b>NOK "
             f"{g(D4_e)} million</b><br>Assets = {g(p4e)} × {g(H4)} + {g(1 - p4e)} × {g(L4)} = <b>NOK {g(V4_e)} "
             "million</b></p>"
             f"<p>The strategy now destroys {g(A4)} − {g(V4_e)} = {g(A4 - V4_e)} of value to give the shareholders "
             f"{g(E4_e)}. The manager gambles however small the chance, because the shareholders have nothing to "
             "lose.</p>"),
         "criteria": [
             f"Shares {g(p4e)} × {g(ek(H4, K4))} = {g(E4_e)}, above 0, so the manager still switches.",
             f"Bank loan {g(p4e)} × {g(K4)} + {g(1 - p4e)} × {g(L4)} = {g(D4_e)}; assets {g(V4_e)}.",
             "Notes that any positive chance of survival is enough for the manager."]},
        {"label": "f", "points": 3,
         "body": (
             "<p>Explain briefly why the manager switches even when the chance of success is small. If the bank "
             "had foreseen this behaviour when it made the loan, who would in the end bear the cost?</p>"),
         "solution": (
             "<p><b>Why the manager gambles.</b> With limited liability the shareholders get zero whether the firm "
             "defaults with the contract or fails with the export strategy. They keep every krone above the face "
             "value but lose nothing extra below it, so any chance of survival is worth taking. The bank bears the "
             "downside: the switch is a wealth transfer from the bank to the shareholders plus a loss of value. "
             "Kurbatov calls this gambling for resurrection.</p>"
             "<p><b>Who bears the cost in the end.</b> A rational bank that foresees the switch lends less for the "
             "same face value, or demands a higher face value for the same loan. The shareholders then receive less "
             "when the loan is made, so they bear the expected cost of the gamble: the cost is absorbed by the "
             "shareholders.</p>"),
         "criteria": [
             "Limited liability: the shareholders get zero in default either way, so they only care about the "
             "chance of a positive payoff (gambling for resurrection).",
             "The bank bears the downside: a wealth transfer from the bank to the shareholders plus a loss of value.",
             "Ex ante: a bank that foresees it prices the loan accordingly, so the shareholders bear the cost "
             "(Kurbatov, recording 04, 52:41 to 55:33)."]},
    ],
}

# ---------------------------------------------------------------- risikoskifting-2
OPPG["mk-risikoskifting-2"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Risky debt, spin-offs and covenants", "chapters": [9],
    "merke": "Samme form som PS1 E8 (Hillton), regnet i forelesning 06",
    "body": (
        "<p>Cardwell Industries Inc. has two divisions. Next year each division will be worth the following "
        "($ million), with a boom and a bust equally likely:</p>"
        + tab(["Division", "Boom", "Bust"], [[k, g(v[0]), g(v[1])] for k, v in U5.items()])
        + f"<p>Cardwell's only debt is a zero-coupon bond issue with a face value of ${g(F5)} million, due in one "
          "year. The CEO acts in the best interests of the shareholders. Investors are risk neutral, there is no "
          "discounting and there are no taxes. Use 4 decimal places.</p>"
          "<p>The CEO can split Cardwell into two companies with one division each. The split costs synergies: "
          f"each division would then be worth ${g(s5)} million less in both states. The bond contract allows the "
          "whole bond issue to be assigned to either company; the other company would have no debt.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Without the split, what are Cardwell's bonds and shares worth today?</p>",
         "solution": (
             f"<p>Cardwell is worth {g(H5)} in a boom and {g(L5)} in a bust. Both are above {g(F5)}, so the bonds "
             f"are safe: bonds = <b>${g(D5_0)} million</b>.<br>Shares = 0.5 × ({g(H5)} − {g(F5)}) + 0.5 × "
             f"({g(L5)} − {g(F5)}) = 0.5 × {g(H5 - F5)} + 0.5 × {g(L5 - F5)} = <b>${g(E5_0)} million</b></p>"
             f"<p><b>Check.</b> {g(D5_0)} + {g(E5_0)} = {g(V5_0)} = 0.5 × {g(H5)} + 0.5 × {g(L5)} ✓</p>"),
         "criteria": [
             f"Adds the divisions: {g(H5)} in a boom and {g(L5)} in a bust.",
             f"The bonds are safe ({g(L5)} is above {g(F5)}), so they are worth {g(D5_0)}.",
             f"Shares 0.5 × {g(H5 - F5)} + 0.5 × {g(L5 - F5)} = {g(E5_0)}."]},
        {"label": "b", "points": 6,
         "body": (
             "<p>If Cardwell is split, which company should get the bonds to maximise the value of the shares? "
             "For each choice, find the value of the bonds and of all the shares in the two companies together. "
             "Will the CEO split the firm?</p>"),
         "solution": (
             "<p>After the split the divisions are worth:</p>"
             + tab(["Company", "Boom", "Bust", "Expected"],
                   [[k, g(v[0] - s5), g(v[1] - s5), g(p5 * (v[0] - s5) + (1 - p5) * (v[1] - s5))]
                    for k, v in U5.items()])
             + f"<p><b>Bonds on Equipment.</b> Equipment pays {g(F5)} in a boom and only "
               f"{g(U5['Equipment'][1] - s5)} in a bust. Bonds = 0.5 × {g(F5)} + 0.5 × {g(U5['Equipment'][1] - s5)} "
               f"= <b>{g(D5_eq)}</b>. Equipment's shares = 0.5 × {g(U5['Equipment'][0] - s5 - F5)} = "
               f"{g(spin5(s5, 'Equipment')[1] - (p5 * sum(U5['Services']) - s5))}. The debt-free Services is "
               f"worth {g(p5 * sum(U5['Services']) - s5)}. All shares = <b>{g(E5_eq)}</b>.</p>"
               f"<p><b>Bonds on Services.</b> Services is worth {g(U5['Services'][0] - s5)} or "
               f"{g(U5['Services'][1] - s5)}, both below {g(F5)}, so the bondholders take all of it: bonds = "
               f"<b>{g(D5_sv)}</b>. The debt-free Equipment is worth {g(p5 * sum(U5['Equipment']) - s5)}, so all "
               f"shares = <b>{g(E5_sv)}</b>.</p>"
               f"<p><b>Decision.</b> The shares are worth most with the bonds on Equipment, the volatile division: "
               f"{g(E5_eq)} against {g(E5_sv)} and against {g(E5_0)} without the split. <b>The CEO splits the firm "
               "and puts the bonds on Equipment.</b></p>"),
         "criteria": [
             f"Division values after the split: Equipment {g(U5['Equipment'][0] - s5)}/{g(U5['Equipment'][1] - s5)} "
             f"and Services {g(U5['Services'][0] - s5)}/{g(U5['Services'][1] - s5)}.",
             f"Bonds on Equipment: bonds {g(D5_eq)}, all shares {g(E5_eq)} (Equipment's shares plus the debt-free "
             "Services).",
             f"Bonds on Services: bonds {g(D5_sv)}, all shares {g(E5_sv)}.",
             f"The CEO splits and puts the bonds on Equipment, because {g(E5_eq)} is more than {g(E5_sv)} and "
             f"{g(E5_0)}.",
             "Show the calculation."]},
        {"label": "c", "points": 4,
         "body": (
             "<p>Split the change in the value of the bonds caused by the CEO's choice into a wealth transfer to "
             "the shareholders and a loss of value. Explain briefly where the loss of value comes from.</p>"),
         "solution": (
             tab(["Claim", "Before the split", "After the split", "Change"],
                 [["Bonds", g(D5_0), g(D5_eq), g(dD5)], ["Shares", g(E5_0), g(E5_eq), sg(overf5)],
                  ["Cardwell in total", g(V5_0), g(V5_1), g(V5_1 - V5_0)]])
             + f"<p>The bonds lose {g(-dD5)}: <b>{g(overf5)}</b> is a wealth transfer to the shareholders and "
               f"<b>{g(tap5)}</b> is a loss of value. <b>Check.</b> {g(overf5)} + {g(tap5)} = {g(-dD5)} ✓</p>"
               f"<p>The loss of value is the lost synergies, {g(s5)} in each division in both states: 2 × {g(s5)} = "
               f"{g(tap5)}. The bonds were safe because the stable division covered the bust; after the split they "
               "carry all of Equipment's bust risk. This is risk shifting: the shareholders gain although the firm is "
               "worth less.</p>"),
         "criteria": [
             f"Change in the bonds {g(D5_eq)} − {g(D5_0)} = {g(dD5)}.",
             f"Wealth transfer to the shareholders {g(overf5)} ({g(E5_0)} to {g(E5_eq)}); loss of value {g(tap5)}.",
             f"The parts add up: {g(overf5)} + {g(tap5)} = {g(-dD5)}.",
             "The loss of value is the lost synergies; the bonds lose the protection of the stable division."]},
        {"label": "d", "points": 4,
         "body": (
             "<p>Suppose instead that the split lowers the value of each division by s in both states. The CEO "
             "assigns the bonds as in (b). What is the largest s at which the CEO would still split the firm?</p>"),
         "solution": (
             f"<p>With the bonds on Equipment, Equipment pays the bonds in full in a boom as long as "
             f"{g(U5['Equipment'][0])} − s ≥ {g(F5)}. It defaults in a bust. All shares are worth</p>"
             f"<p>0.5({g(U5['Equipment'][0])} − s − {g(F5)}) + [0.5({g(U5['Services'][0])} − s) + "
             f"0.5({g(U5['Services'][1])} − s)] = {g(p5 * (U5['Equipment'][0] - F5) + p5 * sum(U5['Services']))} − "
             "1.5s</p>"
             f"<p>The CEO splits if this is at least {g(E5_0)}:<br>"
             f"{g(p5 * (U5['Equipment'][0] - F5) + p5 * sum(U5['Services']))} − 1.5s ≥ {g(E5_0)} ⇒ s ≤ "
             f"{g(p5 * (U5['Equipment'][0] - F5) + p5 * sum(U5['Services']) - E5_0)}/1.5 = <b>${f(ss5)} "
             "million</b></p>"
             f"<p><b>Check.</b> At s = {f(ss5)} Equipment is worth {f(U5['Equipment'][0] - ss5)} in a boom (above "
             f"{g(F5)}) and {f(U5['Equipment'][1] - ss5)} in a bust, so the assumed region holds ✓. Putting the "
             f"bonds on Services would give only {f(spin5(ss5, 'Services')[1])}. The shareholders would accept "
             f"destroying up to 2 × {f(ss5)} = {f(2 * ss5)} of value, because the bondholders pay for it.</p>"),
         "criteria": [
             f"Share value with the bonds on Equipment as a function of s: "
             f"{g(p5 * (U5['Equipment'][0] - F5) + p5 * sum(U5['Services']))} − 1.5s (both divisions lose s).",
             f"Sets it equal to {g(E5_0)} and finds s = {f(ss5)}.",
             f"Checks that Equipment still pays the bonds in a boom at that s ({f(U5['Equipment'][0] - ss5)} is above "
             f"{g(F5)}).",
             "Bonus: notes that up to twice that amount of value would be destroyed at the bondholders' expense."]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Would a covenant in the bond contract that forbids assigning the bonds to only part of the group "
             "be good or bad for Cardwell's shareholders? Explain briefly.</p>"),
         "solution": (
             f"<p><b>Ex post it is bad for them.</b> Once the bonds are issued, the covenant blocks a split that "
             f"would move {g(overf5)} from the bondholders to the shareholders.</p>"
             "<p><b>Ex ante it is good for them.</b> Bondholders are not naive. If the contract allowed such a "
             "split, they would expect it and pay less for the bonds or demand a higher face value, so the "
             f"shareholders would bear the expected cost, including the {g(tap5)} of lost synergies. By giving up "
             "the option to shift risk, the shareholders can borrow on better terms. The covenant protects value "
             "that would otherwise be destroyed.</p>"),
         "criteria": [
             "Basic answer accepted: ex post the covenant is bad for the shareholders, because it blocks a wealth "
             "transfer from the bondholders.",
             "Better answer: ex ante bondholders anticipate the split and price the bonds accordingly, so the "
             "shareholders bear the cost; the covenant makes the debt cheaper.",
             "Full marks give both views (Kurbatov, recording 06, 1:28:13 to 1:31:10)."]},
    ],
}

# ---------------------------------------------------------------- risikoskifting-3
OPPG["mk-risikoskifting-3"] = {
    "n": 1, "title": "Debt and risk", "points": 20,
    "topic": "Fire sales and risk taking", "chapters": [8, 9],
    "merke": "Som eksemplet i forelesning 04, med konkurs der bare en del av verdien gjenvinnes (forelesning 18, "
             "28:00)",
    "body": (
        f"<p>Ashworth Precision plc makes specialised machine tools. Its only debt is a zero-coupon bank loan with "
        f"a face value of £{g(F6)} million, due in one year. Under its current plan its assets will be worth "
        f"£{g(H6)} million next year if orders are strong (probability {pc(q6, 0)}) and £{g(L6)} million if they "
        f"are weak (probability {pc(1 - q6, 0)}). If Ashworth cannot repay in full, it goes bankrupt and the bank "
        f"receives what a fire sale of the machines raises: only {pc(phi6, 0)} of their value. The manager acts in "
        "the interests of the shareholders. Everyone is risk neutral, there is no "
        "discounting and there are no taxes. Use 4 decimal places.</p>"
        "<p>At no cost, the manager can instead bet the firm on one large order from a new customer. The assets "
        f"would then be worth £{g(Hr6)} million with probability {pc(r6, 0)} and £{g(Lr6)} million with probability "
        f"{pc(1 - r6, 0)}.</p>"),
    "parts": [
        {"label": "a", "points": 4,
         "body": (
             "<p>Under the current plan, what are the bank loan and the shares worth today? What is the expected "
             "loss from the fire sale?</p>"),
         "solution": (
             tab(["Orders", "Probability", "Assets", "Bank loan", "Shares", "Fire-sale loss"],
                 [["Strong", pc(q6, 0), g(H6), g(F6), g(H6 - F6), "0"],
                  ["Weak", pc(1 - q6, 0), g(L6), f"{g(phi6)} × {g(L6)} = {g(phi6 * L6)}", "0",
                   g((1 - phi6) * L6)]])
             + f"<p>Bank loan = {g(q6)} × {g(F6)} + {g(1 - q6)} × {g(phi6 * L6)} = {g(q6 * F6)} + "
               f"{g((1 - q6) * phi6 * L6)} = <b>£{g(D6_0)} million</b><br>Shares = {g(q6)} × {g(H6 - F6)} = "
               f"<b>£{g(E6_0)} million</b><br>Expected fire-sale loss = {g(1 - q6)} × {g((1 - phi6) * L6)} = "
               f"<b>£{g(T6_0)} million</b></p>"
               f"<p><b>Check.</b> {g(D6_0)} + {g(E6_0)} + {g(T6_0)} = {g(V6_0)} = {g(q6)} × {g(H6)} + {g(1 - q6)} × "
               f"{g(L6)}, the expected value of the assets ✓</p>"),
         "criteria": [
             f"In the weak state the bank receives only {g(phi6)} × {g(L6)} = {g(phi6 * L6)}.",
             f"Bank loan {g(q6)} × {g(F6)} + {g(1 - q6)} × {g(phi6 * L6)} = {g(D6_0)}. Ignoring the fire sale "
             f"({g(D6_0_uten)}) is the classic error.",
             f"Shares {g(q6)} × {g(H6 - F6)} = {g(E6_0)}.",
             f"Expected fire-sale loss {g(1 - q6)} × {g((1 - phi6) * L6)} = {g(T6_0)}."]},
        {"label": "b", "points": 4,
         "body": (
             "<p>What are the assets expected to be worth with the large order? What are the bank loan and the "
             "shares then worth? Will the manager switch?</p>"),
         "solution": (
             f"<p>Expected assets = {g(r6)} × {g(Hr6)} + {g(1 - r6)} × {g(Lr6)} = {g(r6 * Hr6)} + "
             f"{g((1 - r6) * Lr6)} = <b>£{g(V6_r)} million</b>, against {g(V6_0)} with the current plan.</p>"
             f"<p>In the bad state Ashworth is bankrupt and the fire sale raises {g(phi6)} × {g(Lr6)} = "
             f"{g(phi6 * Lr6)}.<br>Bank loan = {g(r6)} × {g(F6)} + {g(1 - r6)} × {g(phi6 * Lr6)} = {g(r6 * F6)} + "
             f"{g((1 - r6) * phi6 * Lr6)} = <b>£{g(D6_r)} million</b><br>Shares = {g(r6)} × {g(Hr6 - F6)} = "
             f"<b>£{g(E6_r)} million</b> (expected fire-sale loss {g(1 - r6)} × {g((1 - phi6) * Lr6)} = "
             f"{g(T6_r)})</p>"
             f"<p><b>The manager switches</b>: the shares rise from {g(E6_0)} to {g(E6_r)}, although the assets "
             f"lose {g(tapV6)} of expected value.</p>"),
         "criteria": [
             f"Expected assets {g(r6)} × {g(Hr6)} + {g(1 - r6)} × {g(Lr6)} = {g(V6_r)}, below {g(V6_0)}: a "
             "negative-NPV switch.",
             f"Bank loan {g(r6)} × {g(F6)} + {g(1 - r6)} × {g(phi6)} × {g(Lr6)} = {g(D6_r)}, with the fire sale.",
             f"Shares {g(r6)} × {g(Hr6 - F6)} = {g(E6_r)}, more than {g(E6_0)}, so the manager switches."]},
        {"label": "c", "points": 4,
         "body": (
             "<p>Split the change in the value of the bank loan into a wealth transfer to the shareholders and a "
             "loss of value. How much of the loss of value comes from the fire sale?</p>"),
         "solution": (
             f"<p>The bank loan falls from {g(D6_0)} to {g(D6_r)}: a change of <b>{g(dD6)}</b>.</p>"
             + tab(["Part of the bank's loss", "Amount"],
                   [["Wealth transfer to the shareholders", f"{g(E6_r)} − {g(E6_0)} = {g(overf6)}"],
                    ["Lower expected value of the assets", f"{g(V6_0)} − {g(V6_r)} = {g(tapV6)}"],
                    ["Higher expected fire-sale loss", f"{g(T6_r)} − {g(T6_0)} = {g(tapB6)}"],
                    ["Total", g(-dD6)]])
             + f"<p>The loss of value is <b>{g(tapV6 + tapB6)}</b>, of which <b>{g(tapB6)}</b> comes from the fire "
               f"sale: bankruptcy becomes more likely ({pc(1 - r6, 0)} instead of {pc(1 - q6, 0)}), so more value is "
               f"lost in fire sales. <b>Check.</b> {g(overf6)} + {g(tapV6)} + {g(tapB6)} = {g(-dD6)} ✓</p>"),
         "criteria": [
             f"Change in the loan {g(D6_r)} − {g(D6_0)} = {g(dD6)}.",
             f"Wealth transfer to the shareholders {g(overf6)}.",
             f"Loss of value {g(tapV6 + tapB6)}: {g(tapV6)} from the lower asset value and {g(tapB6)} from the "
             "higher expected fire-sale loss.",
             f"The parts add up: {g(overf6)} + {g(tapV6)} + {g(tapB6)} = {g(-dD6)}."]},
        {"label": "d", "points": 5,
         "body": (
             f"<p>Suppose instead that the loan is made today: the bank lends £{g(X6)} million, which is paid out to the "
             "shareholders. The asset values are unchanged. The bank prices the loan fairly and foresees the "
             "manager's choice. What face value must the loan have? What face value would do if a covenant bound "
             "Ashworth to its current plan? What are the shares worth in each case?</p>"),
         "solution": (
             "<p><b>Without a covenant.</b> Suppose the bank expects the manager to take the large order. It then "
             "needs</p>"
             f"<p>{g(r6)}F + {g(1 - r6)} × {g(phi6 * Lr6)} = {g(X6)} ⇒ F = ({g(X6)} − {g((1 - r6) * phi6 * Lr6)})/"
             f"{g(r6)} = <b>£{f(Fr6)} million</b></p>"
             f"<p>Check: this face value is above {g(H6)}, so the current plan would leave the shareholders nothing, "
             f"while the large order gives them {g(r6)} × ({g(Hr6)} − {f(Fr6)}) = {g(Er6_ex)}. The manager does "
             "switch, so the bank's expectation is right ✓.</p>"
             f"<p><b>With the covenant.</b> {g(q6)}F + {g(1 - q6)} × {g(phi6 * L6)} = {g(X6)} ⇒ F = "
             f"({g(X6)} − {g((1 - q6) * phi6 * L6)})/{g(q6)} = <b>£{f(Fc6)} million</b>. Without the covenant this "
             f"face value would not hold: the large order would give the shares {g(r6)} × ({g(Hr6)} − {f(Fc6)}) = "
             f"{f(krav6(r6, Hr6, Lr6, Fc6)[1])}, more than {g(Ec6_ex)}, so the manager would switch.</p>"
             f"<p><b>Shares.</b> Without the covenant {g(r6)} × ({g(Hr6)} − {f(Fr6)}) = <b>£{g(Er6_ex)} million</b>; "
             f"with it {g(q6)} × ({g(H6)} − {f(Fc6)}) = <b>£{g(Ec6_ex)} million</b>. The shareholders receive the "
             f"same £{g(X6)} million today in both cases, so the covenant makes them {g(gev6)} better off. That is "
             f"exactly the loss of value from (c), {g(tapV6)} + {g(tapB6)} = {g(tapV6 + tapB6)}: when the bank "
             "anticipates the switch, the shareholders bear its whole cost.</p>"),
         "criteria": [
             f"Recognises that without a covenant the manager will switch (and checks it at the new face value), "
             f"so the bank values the loan under the large order: {g(r6)}F + {g(1 - r6)} × {g(phi6 * Lr6)} = {g(X6)}, F = {f(Fr6)}.",
             f"With the covenant: {g(q6)}F + {g(1 - q6)} × {g(phi6 * L6)} = {g(X6)}, F = {f(Fc6)}. Pricing the loan "
             f"without the fire sale ({f((X6 - (1 - r6) * Lr6) / r6)} and {f((X6 - (1 - q6) * L6) / q6)}) is the "
             "classic error.",
             f"Shares {g(Er6_ex)} without and {g(Ec6_ex)} with the covenant.",
             f"Bonus: the difference, {g(gev6)}, equals the loss of value in (c), so the shareholders bear the cost "
             "ex ante."]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Does the fire-sale discount affect the manager's choice in (b)? Who bears the expected fire-sale "
             "losses, after the loan is made and before? Explain briefly.</p>"),
         "solution": (
             "<p><b>No.</b> The shareholders get nothing in bankruptcy, however much the fire sale raises, so the "
             f"discount does not enter their payoff: {g(E6_0)} against {g(E6_r)} for any recovery rate. The manager "
             "ignores the cost of the fire sale.</p>"
             "<p><b>Who bears it.</b> Once the loan has been made, the bank does: its recovery in bankruptcy falls. "
             "Before the loan is made, a bank that prices fairly demands a higher face value, as in (d), so the "
             "shareholders bear the expected fire-sale losses. This is one reason why firms with specialised assets "
             "that sell badly in distress borrow less.</p>"),
         "criteria": [
             "No: the shareholders get zero in bankruptcy whatever the fire sale raises, so the discount does not "
             "affect the manager's choice.",
             "After the loan is made, the bank bears the fire-sale losses through a lower recovery.",
             "Before it is made, the bank prices them in, so the shareholders bear them; firms with assets that sell "
             "badly in distress should borrow less (Kurbatov, recording 18, 26:46 to 28:35)."]},
    ],
}


# ======================================================================
#                              SVAR-DATA
# ======================================================================
def t(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


SVAR = {
    # gjeldsoverheng-1
    "mk-gjeldsoverheng-1:1:a": {"type": "tall", "tall": [
        t("Bank loan", D1_0, "NOK m"), t("Equity", E1_0, "NOK m")],
        "merknad": f"Pålydende {g(F1)} for lånet er fellen; da blir egenkapitalen {g(p1 * H1 + (1 - p1) * L1 - F1)}."},
    "mk-gjeldsoverheng-1:1:b": {"type": "tall", "tall": [t("NPV", NPV1, "NOK m")]},
    "mk-gjeldsoverheng-1:1:c": {"type": "blandet", "tall": [
        t("Fraction to new investors x", 100 * x1, "%"), t("Sigurd's payoff", eier1, "NOK m")],
        "tallPoeng": 4, "tekstLedd": "Will Sigurd do it? Would the bank like the line to be installed?",
        "merknad": f"Fellene: {g(I1)}/{g(ek(H1 + d1, F1))} = {pc(x1_felle_hoy)} (bare høy tilstand) og "
                   f"{pc(x1_felle_snitt)} (pålydende trukket fra forventet verdi) faller utenfor toleransen."},
    "mk-gjeldsoverheng-1:1:d": {"type": "blandet", "tall": [
        t("Change for the bank", gev1_bank, "NOK m"), t("Change for Sigurd", gev1_eier, "NOK m")],
        "tallPoeng": 3, "tekstLedd": "Will the bank accept? Will Sigurd go ahead?",
        "merknad": f"Bankens målestokk er {g(D1_0)} fra (a), ikke {g(F1)} eller {g(D1_med)}."},
    "mk-gjeldsoverheng-1:1:e": {"type": "tekst"},
    # gjeldsoverheng-2
    "mk-gjeldsoverheng-2:1:a": {"type": "tall", "tall": [
        t("Bonds", D2_0, "$ m"), t("Equity", E2_0, "$ m")]},
    "mk-gjeldsoverheng-2:1:b": {"type": "blandet", "tall": [
        t("NPV", NPV2, "$ m"), t("Fraction to new shareholders x", 100 * x2, "%"),
        t("Value of the existing shareholders' shares", gml2, "$ m")],
        "tallPoeng": 4, "tekstLedd": "Will the manager install the system?"},
    "mk-gjeldsoverheng-2:1:c": {"type": "blandet", "tall": [
        t("Change for bondholders", gev2_obl, "$ m"), t("Change for existing shareholders", gev2_eier, "$ m")],
        "tallPoeng": 2, "tekstLedd": "Would the bondholders like the system to be installed? Explain briefly."},
    "mk-gjeldsoverheng-2:1:d": {"type": "blandet", "tall": [t("F (if it exists)", Fs2, "$ m")],
                                "tallPoeng": 2, "tekstLedd": "For which face values will the manager install the system?",
                                "merknad": f"Fellen L + NPV = {g(Fs2_felle)} (glemt 1/(1 − p)) avvises."},
    "mk-gjeldsoverheng-2:1:e": {"type": "tekst"},
    # gjeldsoverheng-3
    "mk-gjeldsoverheng-3:1:a": {"type": "tall", "tall": [
        t("Bank loan", D3_0, "€ m"), t("Altmark's equity", E3_0, "€ m")],
        "merknad": f"50/50 gir {f(D3_0_50)} og udiskontert {g(D3_0_udisk)} for lånet; begge avvises."},
    "mk-gjeldsoverheng-3:1:b": {"type": "blandet", "tall": [
        t("NPV", NPV3, "€ m"), t("Change for Altmark", endr3_eier, "€ m"),
        t("Change for the bank", endr3_bank, "€ m")],
        "tallPoeng": 3, "tekstLedd": "Will Altmark install the panels?"},
    "mk-gjeldsoverheng-3:1:c": {"type": "tall", "tall": [t("Probability threshold p", 100 * ps3, "%")],
                                "merknad": f"Svaret er p ≥ 2/3. Udiskontert gir {pc(ps3_felle)}; det avvises."},
    "mk-gjeldsoverheng-3:1:d": {"type": "blandet", "tall": [
        t("Face value of the new senior loan", Fsen3, "€ m"), t("Bank loan", D3_sen, "€ m"),
        t("Altmark's equity", E3_sen, "€ m")],
        "tallPoeng": 4, "tekstLedd": "Will Altmark install the panels? Is the bank better or worse off than in (a)?",
        "merknad": f"Pålydende {g(I3)} (glemt renten) avvises."},
    "mk-gjeldsoverheng-3:1:e": {"type": "tekst"},
    # cds-1
    "mk-cds-1:1:a": {"type": "tall", "tall": [t("Price of bond 1", P1A, "$"), t("Price of bond 2", P2A, "$")]},
    "mk-cds-1:1:b": {"type": "blandet", "tall": [t("Expected return on bond 2", 100 * ErA, "%")], "tallPoeng": 2,
                     "tekstLedd": "Why does it differ from the promised yield?"},
    "mk-cds-1:1:c": {"type": "tall", "tall": [t("Risk-neutral default probability ρ", rhoA, "")],
                     "merknad": f"Overlevelsessannsynligheten {f(1 - rhoA)} er fellen og avvises."},
    "mk-cds-1:1:d": {"type": "tall", "tall": [t("Price of one CDS contract", cdsA, "$", alt=[cdsA_reserve])],
                     "merknad": f"alt er svaret med reserveverdien ρ = 0,10. Fellene {f(cdsA_felle)} (overlevelse), "
                                f"{f(cdsA_sann)} (reell p) og {f(cdsA_udisk)} (udiskontert) avvises."},
    "mk-cds-1:1:e": {"type": "blandet", "tall": [
        t("Number of CDS contracts", nA, ""), t("Cost of the contracts", kostA, "$", alt=[nA * cdsA_reserve]),
        t("Bond plus contracts", posA, "$")],
        "tallPoeng": 3, "tekstLedd": "Compare with the price of bond 1.",
        "merknad": f"100 kontrakter er fellen; da blir posisjonen {f(posA_100)}. alt for kostnaden er svaret med "
                   f"CDS-prisen fra reserveverdien i (d) ({f(nA * cdsA_reserve)}); posisjonen med den "
                   f"({f(P2A + nA * cdsA_reserve)}) ligger innenfor toleransen."},
    "mk-cds-1:1:f": {"type": "tekst"},
    # cds-2
    "mk-cds-2:1:a": {"type": "tall", "tall": [
        t("Price of a government bond", P1B, "NOK"), t("Price of an Oksfjord bond", P2B, "NOK"),
        t("Expected return on an Oksfjord bond", 100 * ErB, "%")],
        "merknad": f"Gjenvinning {g(VdB)} per obligasjon gir {pc(ErB_felle)}; det avvises."},
    "mk-cds-2:1:b": {"type": "tall", "tall": [
        t("Risk-neutral default probability ρ", rhoB, ""), t("Price of one CDS contract", cdsB, "NOK")],
        "merknad": f"Overlevelse {f(1 - rhoB)} og CDS {f(cdsB_felle)} med den avvises, det samme gjør reell p "
                   f"({f(cdsB_sann)})."},
    "mk-cds-2:1:c": {"type": "blandet", "tall": [
        t("Value of the put", putB, "NOK m", alt=[putB_reserve]),
        t("Risk-free issue minus Oksfjord's issue", rfutstB - utstB, "NOK m")],
        "tallPoeng": 4, "tekstLedd": "Compare the put with the difference between the two issue values.",
        "merknad": f"alt for putten er svaret med reserveverdien 0,09 ({f(putB_reserve, 2)}). Per obligasjon er "
                   f"putten {f(putB_per)}; den teller bare skalert til hele utstedelsen."},
    "mk-cds-2:1:d": {"type": "tekst"},
    # cds-3
    "mk-cds-3:1:a": {"type": "tall", "tall": [
        t("Price of a government bond", P1C, "€", tol=0.0002), t("Price of a Vellmar bond", P2C, "€", tol=0.001)],
        "merknad": f"Stram toleranse (0,02 % og 0,1 %) så enkel rente ({f(P1C_enkel)} og {f(P2C_enkel)}) avvises."},
    "mk-cds-3:1:b": {"type": "tall", "tall": [
        t("Number of CDS contracts", nC, "m contracts"),
        t("Value of bonds plus contracts", statC, "€ m", tol=0.0002),
        t("Total cost of the contracts", kostC, "€ m", tol=0.003)],
        "merknad": f"Stram toleranse så enkel rente avvises: sikret verdi {f(statC_enkel)}, kostnad {f(kostC_enkel)} "
                   f"(bare r_f) eller {f(kostC_helenkel)} (overalt). {g(HC)} millioner kontrakter er fellen."},
    "mk-cds-3:1:c": {"type": "tall", "tall": [
        t("Price of one CDS contract", cdsC, "€", tol=0.002, alt=[cdsC_reserve]),
        t("Risk-neutral default probability ρ", rhoC, "", tol=0.002, alt=[rhoC_reserve])],
        "merknad": f"alt er svarene med reserveverdien €{g(kostC_reserve)} millioner. Toleranse 0,2 % så enkel rente "
                   f"avvises: på r_f alene CDS {f(cdsC_enkel)} og ρ {f(rhoC_enkel)}, overalt {f(cdsC_helenkel)} og "
                   f"{f(rhoC_helenkel)}. Ett år gir ρ = {f(rhoC_ettaar)}."},
    "mk-cds-3:1:d": {"type": "blandet", "tall": [t("Expected annual return", 100 * ErC, "%", tol=0.005)],
                     "tallPoeng": 2, "tekstLedd": "Compare it with the promised yield and with the risk-free rate.",
                     "merknad": f"Toleranse 0,5 % så avkastningen over 1,5 år delt på 1,5 ({pc(ErC_delt, 4)}) avvises."},
    "mk-cds-3:1:e": {"type": "tekst"},
    # risikoskifting-1
    "mk-risikoskifting-1:1:a": {"type": "tall", "tall": [
        t("Bank loan", D4_0, "NOK m"), t("Shares", E4_0, "NOK m", abs=0.01)],
        "merknad": f"Pålydende {g(K4)} for lånet er fellen."},
    "mk-risikoskifting-1:1:b": {"type": "blandet", "tall": [t("Expected value of the assets", V4_r, "NOK m")],
                                "tallPoeng": 1, "tekstLedd": "Would Vikebygd switch if it had no debt?"},
    "mk-risikoskifting-1:1:c": {"type": "blandet", "tall": [
        t("Bank loan", D4_r, "NOK m"), t("Shares", E4_r, "NOK m")],
        "tallPoeng": 3, "tekstLedd": "Will the manager switch?"},
    "mk-risikoskifting-1:1:d": {"type": "tall", "tall": [
        t("Change in the value of the loan", dD4, "NOK m"), t("Wealth transfer to the shareholders", overf4, "NOK m"),
        t("Loss of value", tap4, "NOK m")]},
    "mk-risikoskifting-1:1:e": {"type": "blandet", "tall": [
        t("Bank loan", D4_e, "NOK m"), t("Shares", E4_e, "NOK m"), t("Expected value of the assets", V4_e, "NOK m")],
        "tallPoeng": 2, "tekstLedd": "Would the manager still switch?"},
    "mk-risikoskifting-1:1:f": {"type": "tekst"},
    # risikoskifting-2
    "mk-risikoskifting-2:1:a": {"type": "tall", "tall": [t("Bonds", D5_0, "$ m"), t("Shares", E5_0, "$ m")]},
    "mk-risikoskifting-2:1:b": {"type": "blandet", "tall": [
        t("Bonds, if assigned to Equipment", D5_eq, "$ m"), t("All shares, if the bonds are on Equipment", E5_eq, "$ m"),
        t("Bonds, if assigned to Services", D5_sv, "$ m"), t("All shares, if the bonds are on Services", E5_sv, "$ m")],
        "tallPoeng": 4, "tekstLedd": "Which company should get the bonds? Will the CEO split the firm?",
        "merknad": f"Uten synergitapet blir obligasjonene på Equipment {g(p5 * F5 + (1 - p5) * U5['Equipment'][1])}; "
                   "det avvises."},
    "mk-risikoskifting-2:1:c": {"type": "blandet", "tall": [
        t("Change in the value of the bonds", dD5, "$ m"), t("Wealth transfer to the shareholders", overf5, "$ m"),
        t("Loss of value", tap5, "$ m")],
        "tallPoeng": 3, "tekstLedd": "Where does the loss of value come from?"},
    "mk-risikoskifting-2:1:d": {"type": "tall", "tall": [t("Largest s", ss5, "$ m")],
                                "merknad": "Svaret er s ≤ 95/3. Å trekke s bare fra Equipment gir 95, utenfor regionen."},
    "mk-risikoskifting-2:1:e": {"type": "tekst"},
    # risikoskifting-3
    "mk-risikoskifting-3:1:a": {"type": "tall", "tall": [
        t("Bank loan", D6_0, "£ m"), t("Shares", E6_0, "£ m"), t("Expected fire-sale loss", T6_0, "£ m")],
        "merknad": f"Uten brannsalget blir lånet {g(D6_0_uten)}; det avvises."},
    "mk-risikoskifting-3:1:b": {"type": "blandet", "tall": [
        t("Expected value of the assets", V6_r, "£ m"), t("Bank loan", D6_r, "£ m"), t("Shares", E6_r, "£ m")],
        "tallPoeng": 3, "tekstLedd": "Will the manager switch?"},
    "mk-risikoskifting-3:1:c": {"type": "tall", "tall": [
        t("Change in the value of the loan", dD6, "£ m"), t("Wealth transfer to the shareholders", overf6, "£ m"),
        t("Loss of value", tapV6 + tapB6, "£ m"), t("Part of the loss from the fire sale", tapB6, "£ m")]},
    "mk-risikoskifting-3:1:d": {"type": "tall", "tall": [
        t("Face value without a covenant", Fr6, "£ m"), t("Face value with the covenant", Fc6, "£ m"),
        t("Shares without a covenant", Er6_ex, "£ m"), t("Shares with the covenant", Ec6_ex, "£ m")],
        "merknad": f"Uten brannsalg blir pålydendene {f((X6 - (1 - r6) * Lr6) / r6)} og {f((X6 - (1 - q6) * L6) / q6)}; "
                   f"begge avvises. Antar man at lederen beholder planen uten covenant, blir pålydendet {f(Fc6)}."},
    "mk-risikoskifting-3:1:e": {"type": "tekst"},
}


# ======================================================================
#                              KONTROLL
# ======================================================================
feil = []


def ren(h):
    s = re.sub(r"<[^>]*>", " ", str(h)).replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<")
    return re.sub(r"&[a-z]+;", " ", s)


def tall_i(tekst):
    s = ren(tekst).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", s):
        x = float(re.sub(r"[, ](?=\d{3}\b)", "", m.group(0)))
        ut += [x, abs(x)]
    return ut


def innenfor(n, v, d):
    return abs(n - v) <= max(d.get("abs", 0), d.get("tol", 0.01) * abs(v), 1e-9)


def funnet(tt, nums):
    for v in [tt["verdi"]] + tt.get("alt", []):
        if not any(innenfor(n, v, tt) or (tt["enhet"] == "%" and innenfor(n * 100, v, tt)) for n in nums):
            return False
    return True


TYPER = ("gjeldsoverheng", "cds", "risikoskifting")
for typ in TYPER:
    for nr in (1, 2, 3):
        if f"mk-{typ}-{nr}" not in OPPG:
            feil.append(f"mangler mk-{typ}-{nr}")

for sid, ex in OPPG.items():
    hvor = sid
    for k in ("n", "title", "points", "topic", "chapters", "body", "merke", "parts"):
        if k not in ex:
            feil.append(f"{hvor}: mangler {k}")
    if ex["n"] != 1:
        feil.append(f"{hvor}: n skal være 1")
    deler = ex["parts"]
    if ex["points"] != 20 or sum(p["points"] for p in deler) != 20:
        feil.append(f"{hvor}: poengene summerer ikke til 20")
    if not 4 <= len(deler) <= 7:
        feil.append(f"{hvor}: {len(deler)} deler")
    if deler[0]["points"] > 4:
        feil.append(f"{hvor}: del a er tung")
    if not 3 <= deler[-1]["points"] <= 5 or SVAR.get(f"{sid}:1:{deler[-1]['label']}", {}).get("type") != "tekst":
        feil.append(f"{hvor}: siste del skal være en verbal hale på 3–5 poeng")
    for p in deler:
        if not 3 <= len(p["criteria"]) <= 7 and p["points"] > 2:
            feil.append(f"{hvor}{p['label']}: {len(p['criteria'])} kriterier")
        if not 2 <= len(p["criteria"]) <= 7:
            feil.append(f"{hvor}{p['label']}: {len(p['criteria'])} kriterier")
        for c in p["criteria"]:
            if re.search(r"[<>]|&[a-z#0-9]+;", c):
                feil.append(f"{hvor}{p['label']}: markup eller < > i kriterium")
        k = f"{sid}:1:{p['label']}"
        if k not in SVAR:
            feil.append(f"mangler svar-data {k}")
            continue
        d = SVAR[k]
        if d["type"] not in ("tall", "tekst", "blandet"):
            feil.append(f"{k}: ukjent type")
        if d["type"] == "blandet" and not 0 < d["tallPoeng"] < p["points"]:
            feil.append(f"{k}: tallPoeng")
        if d["type"] == "tekst" and "tall" in d:
            feil.append(f"{k}: tekst med tall")
        if d["type"] in ("tall", "blandet") and not 1 <= len(d.get("tall", [])) <= 5:
            feil.append(f"{k}: antall tall")
        kilde = " ".join([p["solution"], " ".join(p["criteria"])])
        nums = tall_i(kilde)
        for tt in d.get("tall", []):
            if not funnet(tt, nums) and not tt.get("regnet"):
                feil.append(f"{k}: {tt['navn']} = {tt['verdi']} står ikke i løsningen")
            if abs(tt["verdi"]) < 1e-6 and "abs" not in tt:
                feil.append(f"{k}: verdien er 0 uten abs")
            if not isinstance(tt["enhet"], str):
                feil.append(f"{k}: enhet mangler")

gyldige = {f"{sid}:1:{p['label']}" for sid, ex in OPPG.items() for p in ex["parts"]}
for k in SVAR:
    if k not in gyldige:
        feil.append(f"svar-data uten oppgave: {k}")

# lekkasje: svarene skal ikke stå i oppgaveteksten til samme oppgave
# Unntak: lånet ved sikkert mislighold er verdien av eiendelene, og trygg gjeld er pålydendet.
LEKK_OK = {("mk-risikoskifting-1:1:a", "Bank loan"), ("mk-risikoskifting-2:1:a", "Bonds")}
for sid, ex in OPPG.items():
    tekst = ren(ex["body"]) + " " + " ".join(ren(p["body"]) for p in ex["parts"])
    tall_tekst = tall_i(tekst)
    for p in ex["parts"]:
        for tt in SVAR[f"{sid}:1:{p['label']}"].get("tall", []):
            v = tt["verdi"]
            if (f"{sid}:1:{p['label']}", tt["navn"]) in LEKK_OK:
                continue
            if abs(v) > 1e-6 and any(abs(n - v) <= 1e-4 * abs(v) for n in tall_tekst):
                feil.append(f"{sid}:{p['label']}: svaret {v} står i oppgaveteksten")

# fellene skal ligge utenfor toleransen
def utenfor(svar_k, i, felle):
    tt = SVAR[svar_k]["tall"][i]
    if innenfor(felle, tt["verdi"], tt):
        feil.append(f"{svar_k}: fellen {felle} er innenfor toleransen")


utenfor("mk-gjeldsoverheng-1:1:c", 0, 100 * x1_felle_hoy)
utenfor("mk-gjeldsoverheng-1:1:c", 0, 100 * x1_felle_snitt)
utenfor("mk-gjeldsoverheng-1:1:a", 0, F1)
utenfor("mk-gjeldsoverheng-2:1:d", 0, Fs2_felle)
utenfor("mk-gjeldsoverheng-3:1:a", 0, D3_0_50)
utenfor("mk-gjeldsoverheng-3:1:a", 0, D3_0_udisk)
utenfor("mk-gjeldsoverheng-3:1:c", 0, 100 * ps3_felle)
utenfor("mk-gjeldsoverheng-3:1:d", 0, I3)
utenfor("mk-cds-1:1:c", 0, 1 - rhoA)
for x in (cdsA_felle, cdsA_sann, cdsA_udisk):
    utenfor("mk-cds-1:1:d", 0, x)
utenfor("mk-cds-1:1:e", 0, FA)
utenfor("mk-cds-2:1:a", 2, 100 * ErB_felle)
utenfor("mk-cds-2:1:b", 1, cdsB_felle)
utenfor("mk-cds-2:1:b", 1, cdsB_sann)
utenfor("mk-cds-3:1:a", 0, P1C_enkel)
utenfor("mk-cds-3:1:a", 1, P2C_enkel)
utenfor("mk-cds-3:1:b", 0, HC)
utenfor("mk-cds-3:1:b", 1, statC_enkel)
utenfor("mk-cds-3:1:b", 2, kostC_enkel)
utenfor("mk-cds-3:1:b", 2, kostC_helenkel)
utenfor("mk-cds-3:1:c", 0, cdsC_enkel)
utenfor("mk-cds-3:1:c", 0, cdsC_helenkel)
utenfor("mk-cds-3:1:c", 1, rhoC_enkel)
utenfor("mk-cds-3:1:c", 1, rhoC_helenkel)
utenfor("mk-cds-3:1:c", 1, rhoC_ettaar)
utenfor("mk-cds-3:1:d", 0, 100 * ErC_delt)
utenfor("mk-cds-3:1:d", 0, 100 * avkC)
utenfor("mk-risikoskifting-1:1:a", 0, K4)
utenfor("mk-risikoskifting-2:1:b", 0, p5 * F5 + (1 - p5) * U5["Equipment"][1])
utenfor("mk-risikoskifting-3:1:a", 0, D6_0_uten)
utenfor("mk-risikoskifting-3:1:d", 0, (X6 - (1 - r6) * Lr6) / r6)
utenfor("mk-risikoskifting-3:1:d", 1, (X6 - (1 - q6) * L6) / q6)
utenfor("mk-risikoskifting-3:1:d", 0, Fc6)
# reserveverdiene skal ikke ligge nær det riktige svaret
for k, i in (("mk-cds-1:1:d", 0), ("mk-cds-2:1:c", 0), ("mk-cds-3:1:c", 0), ("mk-cds-3:1:c", 1)):
    tt = SVAR[k]["tall"][i]
    for a in tt.get("alt", []):
        if innenfor(a, tt["verdi"], tt):
            feil.append(f"{k}: reserveverdien gir et svar innenfor toleransen")


def alle(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from alle(v)
    elif isinstance(o, list):
        for v in o:
            yield from alle(v)


for s in list(alle(OPPG)) + list(alle(SVAR)):
    r = re.sub(r"</?(sub|sup|b|i)>", "", s)
    if "—" in r or "&mdash;" in r:
        feil.append(f"tankestrek: {r[:60]}")
    if re.search(r",\s+and\b", r):
        feil.append(f"komma før and: {r[max(0, re.search(r',\s+and', r).start() - 40):][:70]}")
    if re.search(r",\s+og\b", r):
        feil.append(f"komma før og: {r[:70]}")
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"pronomen om Kurbatov: {r[:60]}")
    if s.count("<p>") != s.count("</p>") or s.count("<b>") != s.count("</b>") or s.count("<tr>") != s.count("</tr>"):
        feil.append(f"ubalanserte tagger: {s[:60]}")
    if s.count("<i>") != s.count("</i>") or s.count("<sup>") != s.count("</sup>"):
        feil.append(f"ubalanserte tagger: {s[:60]}")
    if re.search(r"\b(nan|inf)\b", s):
        feil.append(f"nan/inf: {s[:60]}")
    if re.search(r"<[^a-z/!]", s.replace("&lt;", "")):
        feil.append(f"rå < i tekst: {s[:60]}")
# bindestrek brukt som minus foran tall
for sid, ex in OPPG.items():
    for s in alle(ex):
        for m in re.finditer(r"(?:^|[\s(=])-\d", ren(s)):
            feil.append(f"{sid}: bindestrek som minus: …{ren(s)[max(0, m.start() - 30):m.end() + 10]}…")

# lengde: rundt 11 ord oppgavetekst per poeng
print("\nOrd i oppgaveteksten:")
for sid, ex in OPPG.items():
    ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex["parts"])).split())
    print(f"   {sid}: {ord_} ord ({ord_ / ex['points']:.1f} per poeng)")
    if not 170 <= ord_ <= 320:
        feil.append(f"{sid}: {ord_} ord")

if feil:
    print("\nFEIL, ingenting ble skrevet:")
    for x in feil:
        print("  ", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(OPPG, fh, ensure_ascii=False, indent=1)
with open(UT_SVAR, "w", encoding="utf-8") as fh:
    json.dump(SVAR, fh, ensure_ascii=False, indent=1)
print(f"\nSkrev {UT} og {UT_SVAR}: {len(OPPG)} oppgaver, {len(SVAR)} svar-oppføringer.")
