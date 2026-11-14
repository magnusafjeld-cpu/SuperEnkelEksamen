"""Prøveeksamen 11 i FIE402 («bredden», runde 3): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove11_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove11). To teorioppgaver (tre påstander om
kapitalstruktur vurdert under MM og med én friksjon hver; governance: långivere, ansatte og
myndigheter og markedet for selskapskontroll), deretter tilbakekjøp under asymmetrisk informasjon
(PS1 E10-typen med ujevne sannsynligheter, formuesoverføringen mellom selgere og de som blir, og
rasjonelle forventninger som i PS2 E1), full verdsetting i H2025-rytmen 9 × 2 med FCF bygd fra
regnskapstall (lagerreduksjon, rentefelle), tvilling med risikabel gjeld og terminalverdi, en
realopsjon med søksmålstreet (PS3 E9-typen med ujevn betinget sannsynlighet, likegyldig p og
delvis gjenvinning ved salg) og M&A med aksjebytte over 6 måneder og avstemning blant kjøperens
eiere.

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker
konsistenskontrollene med assert. Kontroller som kan feile ved en typisk feil: forventet kurs
etter tilbakekjøpet = kursen før (feiler ved feil kjøpskurs eller glemt kasse), at ledelsen med
dårlig nyhet ikke vil etterligne (kontroll 5, rasjonelle forventninger), og at likegyldig p gir
like NPV-er. Identiteter (merket slik i løsningene, bare regnekontroll): selgernes tap =
de gjenværendes gevinst, betaveien mot avkastningsveien til r_U, r_wacc = r_U − dτr_D, WACC = APV
(fastpunkt, forfatterspek § 9.2b), P_A ved suksess fra A- og B-kursen og dekomponeringen av
ventingens verdi.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria, ingen røpende ord i facts og note), poengene (12/12/18/18/20/20, rytmen fra planen) og
lengden (oppgaveteksten 1 000–1 250 ord). Er alt rent, skrives prove11.json og
prove11_oppgave.md (bare oppgaveteksten) i samme mappe. Er noe galt, skrives ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (beta_U vektet uten skatt,
skatteskjoldet diskontert med r_U ved konstant D/V, TS_t = τ·r_D·D_{t−1}, diskret diskontering
også for brøkdeler av år, ingen BS-regning, governance i generell ramme) følger
docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove11.json")
UT_MD = os.path.join(HER, "prove11_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def fd(x, d):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    """Kortest eksakte form med høyst 3 desimaler, ellers 4 desimaler."""
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return fd(x, d)
    return fd(x, 4)


def f(x, d=4):
    """4 desimaler (kortere når tallet er eksakt), eller d desimaler når d er oppgitt."""
    return g(x) if d == 4 else fd(x, d)


def pc(x):
    """Rente som prosent: eksakt kort form (10%, 10.75%) eller 4 desimaler (10.6010%)."""
    return g(100 * x) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vist_sum(deler, total, d, d_tot=None):
    """Avrundede mellomtall som vises med d desimaler, må summere til summen slik
    den vises med d_tot desimaler (forfatterspek § 9.5). Feiler hvis ikke."""
    d_tot = d if d_tot is None else d_tot
    s = sum(round(p, d) for p in deler)
    assert f"{s:.{d_tot}f}" == f"{total:.{d_tot}f}", (deler, total, s)


def ledd(terms, total=None):
    """Skriver a + b − c med så mange desimaler (4, 5 eller 6) at de viste leddene summerer
    til summen vist med 4 desimaler (forfatterspek § 9.5). Eksakte tall vises kort."""
    total = sum(terms) if total is None else total
    assert near(sum(terms), total)
    for d in (4, 5, 6):
        vist = [round(t, 0 if near(t, round(t)) else d) for t in terms]
        if abs(round(sum(vist), 4) - round(total, 4)) < 1e-9:
            break
    else:
        raise AssertionError(terms)
    ut = ""
    for i, t in enumerate(terms):
        tekst = g(abs(t)) if (near(t, round(t, 3)) or d == 4) else fd(abs(t), d)
        if i == 0:
            ut = ("−" if t < 0 else "") + tekst
        else:
            ut += (" − " if t < 0 else " + ") + tekst
    return ut


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:28} {v}")


# ============================== Oppgave 3: tilbakekjøp under asymmetrisk informasjon
N3 = 40.0                  # millioner aksjer
C3 = 200.0                 # overskuddskasse, NOK mill.
EVg, EVb = 2000.0, 1000.0  # virksomhetsverdi ved god og dårlig nyhet
q3 = 0.40                  # markedets sannsynlighet for god nyhet

# a) kurs i dag
EV0 = q3 * EVg + (1 - q3) * EVb
E3_0 = EV0 + C3
P3_0 = E3_0 / N3
assert near(EV0, 1400) and near(E3_0, 1600) and near(P3_0, 40)
feil_uten_kasse = EV0 / N3                            # glemt kassen
# b) tilbakekjøp nå, før nyheten
n_naa = C3 / P3_0
N_naa = N3 - n_naa
Pg_naa, Pb_naa = EVg / N_naa, EVb / N_naa
assert near(n_naa, 5) and near(N_naa, 35)
assert near(q3 * Pg_naa + (1 - q3) * Pb_naa, P3_0)    # ekte kontroll: rettferdig kjøp, kurs uendret i forventning
vist_sum([q3 * Pg_naa, (1 - q3) * Pb_naa], P3_0, 4)
feil_kasse_igjen = (EVg + C3) / N_naa                 # glemt at kassen er brukt
# c) tilbakekjøp etter nyheten
Pg_etter, Pb_etter = (EVg + C3) / N3, (EVb + C3) / N3
n_g, n_b = C3 / Pg_etter, C3 / Pb_etter
assert near(Pg_etter, 55) and near(Pb_etter, 30)
assert near(EVg / (N3 - n_g), Pg_etter) and near(EVb / (N3 - n_b), Pb_etter)   # identitet
assert near(q3 * Pg_etter + (1 - q3) * Pb_etter, P3_0)
# d) ledelsens valg og overføringen
assert Pg_naa > Pg_etter and Pb_etter > Pb_naa        # kjøp nå ved god, vent ved dårlig nyhet
tap_selgere = n_naa * (Pg_etter - P3_0)
gev_blir = N_naa * (Pg_naa - Pg_etter)
feil_referanse = n_naa * (Pg_naa - P3_0)               # tap målt mot å beholde aksjen: feil
assert near(feil_referanse, 600 / 7)
assert near(tap_selgere, gev_blir) and near(tap_selgere, 75)   # identitet: ren overføring
gev_selg_b = n_naa * (P3_0 - Pb_etter)
tap_blir_b = N_naa * (Pb_etter - Pb_naa)
assert near(gev_selg_b, tap_blir_b) and near(gev_selg_b, 50)
# e) markedet leser signalet
P_kunngj = Pg_etter                                   # kunngjøring = god nyhet
kunngj_avk = P_kunngj / P3_0 - 1
n_kunngj = C3 / P_kunngj
N_kunngj = N3 - n_kunngj
Pg_kunngj, Pb_kunngj = EVg / N_kunngj, EVb / N_kunngj
assert near(Pg_kunngj, Pg_etter)                      # god type tjener ikke lenger på det
assert Pb_kunngj < Pb_etter                           # ekte kontroll 5: dårlig type etterligner ikke
assert near(Pb_kunngj, 27.5) and near(kunngj_avk, 0.375)
vis("Oppgave 3", EV0=EV0, P0=P3_0, n_naa=n_naa, Pg_naa=Pg_naa, Pb_naa=Pb_naa, Pg_etter=Pg_etter,
    Pb_etter=Pb_etter, n_g=n_g, n_b=n_b, overforing=tap_selgere, overforing_b=gev_selg_b,
    Pb_kunngj=Pb_kunngj, kunngj_avk=kunngj_avk, feil=(feil_uten_kasse, feil_kasse_igjen))

# ======================================= Oppgave 4: full verdsetting, 9 × 2
rf4, rm4, tau4, g4 = 0.04, 0.10, 0.22, 0.02
mrp4 = rm4 - rf4
inntekt = [400.0, 440.0, 470.0]
vkost = [250.0, 268.0, 280.0]          # varekostnad
sga = [50.0, 52.0, 55.0]               # salgs- og adm.kostnader
avskr = [40.0, 40.0, 40.0]
capex = [50.0, 45.0, 40.0]
lager = [120.0, 105.0, 95.0, 95.0]     # ved utgangen av år 0, 1, 2, 3
renter_gml = 18.0                      # renter på dagens lån (felle)
EBIT4 = [inntekt[t] - vkost[t] - sga[t] - avskr[t] for t in range(3)]
NOPAT4 = [e * (1 - tau4) for e in EBIT4]
dLager = [lager[t + 1] - lager[t] for t in range(3)]
FCF4 = [NOPAT4[t] + avskr[t] - capex[t] - dLager[t] for t in range(3)]
assert [round(x, 6) for x in EBIT4] == [60, 80, 95]
assert [round(x, 6) for x in FCF4] == [51.8, 67.4, 74.1]
assert near(sum(dLager), lager[3] - lager[0])         # summen av endringene = endringen i nivå
feil_renter = [FCF4[t] - renter_gml * (1 - tau4) for t in range(3)]
feil_fortegn = [FCF4[t] + 2 * dLager[t] for t in range(3)]   # trekker frigjøringen fra

# b) tvilling
bE_tw, de_tw, rD_tw = 1.3, 0.5, 0.055
dv_tw = de_tw / (1 + de_tw)
bD_tw = (rD_tw - rf4) / mrp4
bU4 = (1 - dv_tw) * bE_tw + dv_tw * bD_tw
rU4 = rf4 + bU4 * mrp4
assert near(bD_tw, 0.25) and near(bU4, 0.95) and near(rU4, 0.097)
vist_sum([(1 - dv_tw) * bE_tw, dv_tw * bD_tw], bU4, 4)
rE_tw = rf4 + bE_tw * mrp4
assert near((1 - dv_tw) * rE_tw + dv_tw * rD_tw, rU4)    # identitet (CAPM er lineær)
vist_sum([(1 - dv_tw) * rE_tw, dv_tw * rD_tw], rU4, 6, 4)
bU4_feil = (1 - dv_tw) * bE_tw                        # β_D = 0
rU4_feil = rf4 + bU4_feil * mrp4

# c) Rondane: D/V = 0,4, r_D = 6 %
d4, rD4 = 0.40, 0.06
de4 = d4 / (1 - d4)
rE4 = rU4 + de4 * (rU4 - rD4)
w4 = (1 - d4) * rE4 + d4 * rD4 * (1 - tau4)
assert near(w4, rU4 - d4 * tau4 * rD4)                # identitet: r_wacc = r_U − dτr_D
assert near(w4, 0.09172)
vist_sum([(1 - d4) * rE4, d4 * rD4 * (1 - tau4)], w4, 6, 5)
bE4 = (rE4 - rf4) / mrp4
bD4 = (rD4 - rf4) / mrp4
assert near((1 - d4) * bE4 + d4 * bD4, bU4)            # β-sjekk (identitet her)

# d) terminalverdi og e) V^L_0
FCF4_4 = FCF4[2] * (1 + g4)
VL = [0.0] * 4
VL[3] = FCF4_4 / (w4 - g4)
for t in (2, 1, 0):
    VL[t] = (FCF4[t] + VL[t + 1]) / (1 + w4)
VL0_sum = sum(FCF4[t] / (1 + w4) ** (t + 1) for t in range(3)) + VL[3] / (1 + w4) ** 3
assert near(VL0_sum, VL[0])
assert near(VL[1], VL[0] * (1 + w4) - FCF4[0])
pv_w = [FCF4[0] / (1 + w4), FCF4[1] / (1 + w4) ** 2, (FCF4[2] + VL[3]) / (1 + w4) ** 3]
assert near(sum(pv_w), VL[0])
VL3_feil_rU = FCF4_4 / (rU4 - g4)
# f) gjeld og justering
D4 = [d4 * v for v in VL]
justering = D4[1] - D4[0]
assert justering > 0                                  # verdien vokser: Rondane låner mer
# g) V^U
VU3 = FCF4_4 / (rU4 - g4)
pv_u = [FCF4[0] / (1 + rU4), FCF4[1] / (1 + rU4) ** 2, (FCF4[2] + VU3) / (1 + rU4) ** 3]
VU0 = sum(pv_u)
# h) skatteskjold
TS4 = [tau4 * rD4 * D4[t] for t in range(4)]          # TS_1..TS_4 = τ r_D D_0..D_3
TV_TS = TS4[3] / (rU4 - g4)
pv_ts = [TS4[0] / (1 + rU4), TS4[1] / (1 + rU4) ** 2, (TS4[2] + TV_TS) / (1 + rU4) ** 3]
PVTS4 = sum(pv_ts)
# i) APV
APV4 = VU0 + PVTS4
assert near(APV4, VL[0], 1e-8)                        # WACC = APV (fastpunkt, § 9.2b)
# feil rente på skjoldet: r_D
TV_TS_rD = TS4[3] / (rD4 - g4)
PVTS4_rD = TS4[0] / (1 + rD4) + TS4[1] / (1 + rD4) ** 2 + (TS4[2] + TV_TS_rD) / (1 + rD4) ** 3
assert abs(VU0 + PVTS4_rD - VL[0]) > 20               # kontrollen fanger feil rente
vis("Oppgave 4", EBIT=EBIT4, FCF=FCF4, feil_renter=feil_renter, feil_fortegn=feil_fortegn,
    bU=bU4, rU=rU4, rE_tw=rE_tw, rE=rE4, wacc=w4, FCF4=FCF4_4, VL=VL, pv_w=pv_w, D=D4,
    justering=justering, VU3=VU3, pv_u=pv_u, VU0=VU0, TS=TS4, TV_TS=TV_TS, pv_ts=pv_ts,
    PVTS=PVTS4, APV=APV4, PVTS_rD=PVTS4_rD, feil_bD0=(bU4_feil, rU4_feil), VL3_feil_rU=VL3_feil_rU)

# ======================================== Oppgave 5: søksmålstreet
I5, CM5, CH5 = 240.0, 48.0, 120.0      # investering, CF uten søksmål, CF ved avvist søksmål
qban = 0.60                            # domstolen stanser gruvedriften
r5 = 0.08
p5 = 0.10


def npv_naa(p):
    return -I5 + (p * (1 - qban) * CH5 + (1 - p) * CM5) / r5


def npv_vent(p):
    npv_h = max(CH5 / r5 - I5, 0.0)
    npv_m = max(CM5 / r5 - I5, 0.0)
    return (p * (1 - qban) * npv_h + (1 - p) * npv_m + p * qban * 0.0) / (1 + r5)


ECF5 = p5 * (1 - qban) * CH5 + (1 - p5) * CM5
NPV5a = npv_naa(p5)
assert near(ECF5, 48) and near(NPV5a, 360)
assert near(npv_naa(0.3), npv_naa(0.1))               # forventet CF uavhengig av p
NPVh1, NPVm1 = CH5 / r5 - I5, CM5 / r5 - I5
assert near(NPVh1, 1260) and near(NPVm1, 360)
NPV5b = npv_vent(p5)
assert near(NPV5b, 374.4 / 1.08) and NPV5b < NPV5a
spart = p5 * qban * I5                                 # sparer investeringen ved forbud
utsatt = r5 * NPV5a                                    # kostnaden ved å utsette NPV-en ett år
assert near(NPV5b - NPV5a, (spart - utsatt) / (1 + r5))   # dekomponering (identitet)
feil_udiskontert = NPV5b * (1 + r5)
# c) likegyldig p: (NPV + p·qban·I)/(1+r) = NPV
p_star = r5 * NPV5a / (qban * I5)
assert near(p_star, 0.2)
assert near(npv_vent(p_star), npv_naa(p_star))        # ekte kontroll
assert npv_vent(p_star + 0.01) > npv_naa(p_star + 0.01)
# d) salgsrett og p = 30 %
p5d, S5 = 0.30, 180.0
assert CM5 / r5 > S5 and CH5 / r5 > S5                 # selger bare ved forbud
NPV5d_uten = npv_naa(p5d)
NPV5d_vent = npv_vent(p5d)
salg_verdi = p5d * qban * S5 / (1 + r5)
NPV5d = NPV5d_uten + salg_verdi
assert near(salg_verdi, 30) and near(NPV5d, 390) and near(NPV5d_vent, 403.2 / 1.08)
assert NPV5d_vent > NPV5d_uten and NPV5d > NPV5d_vent  # salgsretten snur beslutningen
mot_beste = NPV5d - NPV5d_vent
vis("Oppgave 5", ECF=ECF5, NPV_naa=NPV5a, NPV_vent=NPV5b, spart=spart, utsatt=utsatt,
    feil_udisk=feil_udiskontert, p_star=p_star, d=(NPV5d_uten, NPV5d_vent, salg_verdi, NPV5d),
    mot_beste=mot_beste)

# ===================================================== Oppgave 6: aksjebytte og avstemning
ER6 = 0.8                               # 4 A-aksjer for 5 B-aksjer
nA, nB = 4, 5
PA0, PB0, PA1, PB1 = 50.0, 30.0, 52.0, 39.0
rf6, T6 = 0.04, 0.5
k6 = (1 + rf6) ** T6
# a) budverdi
bud0, bud1 = ER6 * PA0, ER6 * PB0 * 0 + ER6 * PA1
premie0 = bud0 / PB0 - 1
spread1 = bud1 - PB1
assert near(bud0, 40) and near(bud1, 41.6) and near(spread1, 2.6)
# b) long-short per 5 B-aksjer
kost = nB * PB1                         # betalt for B
short = nA * PA1                        # inntekt fra short, investert risikofritt
suksess = short * k6
fiasko = short * k6 - nA * PA0 + nB * PB0
ce6 = kost * k6
p6 = (ce6 - fiasko) / (suksess - fiasko)
assert near(p6 * suksess + (1 - p6) * fiasko, ce6)
assert near(suksess - fiasko, nA * PA0 - nB * PB0)
p6_per = 1 - (ER6 * PA1 - PB1) * k6 / (ER6 * PA0 - PB0)
assert near(p6, p6_per)
p6_feil_100 = (kost - fiasko) / (suksess - fiasko)     # «plug 195»
k6_aar = 1 + rf6
p6_feil_aar = (kost * k6_aar - (short * k6_aar - nA * PA0 + nB * PB0)) / (nA * PA0 - nB * PB0)
assert 0 < p6 < 1 and p6_feil_100 < p6
k6_enkel = 1 + rf6 * T6                                # enkel rente: godtas
p6_enkel = 1 - (ER6 * PA1 - PB1) * k6_enkel / (ER6 * PA0 - PB0)
assert abs(p6_enkel - p6) < 0.0005
p6_naiv = (PB1 * k6 - PB0) / (ER6 * PA1 - PB0)        # dagens A-kurs som verdi ved suksess: feil
assert abs(p6_naiv - p6) > 0.05
# c) A-kursen ved suksess
PAS = (PA1 * k6 - (1 - p6) * PA0) / p6
PAS_B = (PB1 * k6 - (1 - p6) * PB0) / (p6 * ER6)
assert near(PAS, PAS_B)                                # identitet: p kom fra begge kursene
assert PAS > PA0                                       # avtalen tjener A: stem for
gevinst_A = PAS - PA0
PAS_pv = PAS / k6                                      # nåverdi i stedet for verdi ved gjennomføring: feil
# d) etter avstemningen, 5 måneder igjen
PA2, PB2 = 53.0, 42.0
T6d = 5 / 12
k6d = (1 + rf6) ** T6d
bud2 = ER6 * PA2
spread2 = bud2 - PB2
p6d = 1 - spread2 * k6d / (ER6 * PA0 - PB0)
assert p6d > p6 and spread2 < spread1
PAS_d = (PA2 * k6d - (1 - p6d) * PA0) / p6d
assert PAS_d > PA0
vis("Oppgave 6", k=k6, bud=(bud0, bud1), premie0=premie0, spread1=spread1,
    spread1_pct=spread1 / PB1, suksess=suksess, fiasko=fiasko, ce=ce6, p=p6,
    feil=(p6_feil_100, p6_feil_aar), PAS=PAS, gevinst_A=gevinst_A, bud2=bud2, spread2=spread2,
    spread2_pct=spread2 / PB2, k6d=k6d, p6d=p6d, PAS_d=PAS_d)


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "Capital Structure", "points": 12,
    "topic": "MM in perfect markets and market frictions", "chapters": [6, 7, 8],
    "body": (
        "<p>The CFO of a listed car-parts maker makes three claims:</p>"
        "<p>(i) «If we borrow to buy back 20% of our shares, earnings per share will rise. Higher "
        "EPS means a higher share price, so the buyback creates value.»</p>"
        "<p>(ii) «Our profits swing with the price of steel. Hedging the steel price with futures "
        "will make the company more valuable.»</p>"
        "<p>(iii) «Our debt costs 5% and our equity 11%. Replacing equity with debt will lower our "
        "cost of capital.»</p>"
        "<p>For each claim: is it right in a perfect capital market? Name one market imperfection "
        "that could make it right and explain how (2-3 sentences per claim, 4 points each).</p>"
    ),
    "solution": (
        "<p>Three claims, 2-3 sentences each, 4 points each: about half for the verdict under MM "
        "with its mechanism and half for an imperfection with its mechanism.</p>"
        "<p><b>(i) Debt-financed buyback.</b> <b>Wrong under MM:</b> EPS rises because the "
        "earnings after interest are shared by fewer shares, but the debt makes the remaining "
        "equity riskier, so r<sub>E</sub> rises and the P/E ratio falls by just enough to leave "
        "the price unchanged (the EPS fallacy). <b>Corporate taxes</b> can make the price rise: "
        "interest is deductible, so the new debt adds an interest tax shield (τD for permanent "
        "debt) that the market capitalises on the announcement. The value then comes from the "
        "tax saving, not from the higher EPS.</p>"
        "<p><b>(ii) Hedging.</b> <b>Wrong under MM:</b> futures are fairly priced, so hedging "
        "changes the spread of the cash flows but not their present value; investors can hedge "
        "or diversify steel-price risk themselves. <b>Costs of financial distress</b> can make it "
        "right: a steel-price spike could push the firm towards default, with fire sales, lost "
        "customers and cancelled investments. Hedging lowers the probability of those costs, so "
        "the firm is worth more by their expected present value.</p>"
        "<p><b>(iii) Debt is cheaper.</b> <b>Wrong under MM:</b> debt has a lower required return "
        "because it is safer, but replacing equity with debt makes the remaining equity riskier, "
        "so r<sub>E</sub> rises (MM II) and the WACC stays at r<sub>U</sub>. <b>Corporate "
        "taxes</b> make it partly right: interest is deductible, so the after-tax cost of debt is "
        "r<sub>D</sub>(1 − τ) and the after-tax WACC falls with leverage, r<sub>wacc</sub> = "
        "r<sub>U</sub> − (D/V)τr<sub>D</sub>. This holds only until expected distress and agency "
        "costs outweigh the tax saving (the trade-off theory).</p>"
        "<p><b>Other imperfections that score.</b> (i): signalling (management buys back when it "
        "believes the shares are undervalued); free cash flow (cash paid out and debt service "
        "committed cannot be spent by an empire-building CEO). (ii): costly external finance or "
        "debt overhang (hedging keeps internal funds for positive-NPV projects, as in the pecking "
        "order); tax shields that would be lost in loss years; management pay tied to noisy "
        "profits. (iii): subsidised or guaranteed debt that is priced below its risk.</p>"
        "<p><b>Bonus thought.</b> In (ii), if the firm already has risky debt, part of the gain "
        "from hedging goes to the creditors, whose debt becomes safer. The shareholders gain only "
        "if the distress costs saved exceed that transfer.</p>"
    ),
    "criteria": [
        "Three claims, 4 points each: about 2 for the verdict under MM with its mechanism and 2 "
        "for an imperfection with its mechanism. A verdict or an imperfection named without a "
        "mechanism earns at most 1 point.",
        "(i) Under MM the price is unchanged: EPS rises, but so do the risk of equity and r_E, "
        "so the P/E falls (the EPS fallacy). Imperfection: the interest tax shield; signalling "
        "of undervaluation or less free cash flow for the CEO also score. «Higher EPS» is never "
        "the mechanism.",
        "(ii) Under MM hedging at fair prices has zero NPV and investors can hedge or diversify "
        "themselves. Imperfection: costs of financial distress (fire sales, lost customers, "
        "underinvestment); costly external finance, debt overhang or lost tax shields also score.",
        "(iii) Under MM r_E rises with leverage (MM II) and the WACC stays at r_U. Imperfection: "
        "corporate taxes (after-tax cost of debt r_D(1 − τ)), limited by distress costs; "
        "subsidised debt also scores.",
        "The same imperfection may serve two claims (taxes in (i) and (iii)) if the mechanism is "
        "explained each time.",
        "«Hedging reduces risk, so investors pay more» and «debt is cheaper because r_D < r_E» "
        "are the errors the exercise targets: they earn nothing for the MM half.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance",
    "chapters": [27, 26],
    "body": (
        "<p>Westbrook Foods Inc. is a listed company with dispersed ownership: no shareholder owns "
        "more than 1%. The board, mostly picked by the CEO, has approved all his proposals. The "
        "CEO uses the company jet for private trips and has moved the head office into an "
        "expensive new tower. Profits have twice been restated after questions about how revenue "
        "was booked. The shares trade about 25% below analysts' estimate of what the business "
        "would be worth under better management.</p>"
        "<p>The shareholders are too dispersed to act and the board will not. Explain how each of "
        "the following could discipline the CEO and give one limitation: (a) the company's "
        "lenders, (b) employees or regulators, (c) the market for corporate control (2-3 "
        "sentences each, 4 points each).</p>"
    ),
    "solution": (
        "<p>Three monitors, 2-3 sentences each, 4 points each: about half for how it can "
        "discipline this CEO and half for one limitation. In (b) one actor explained well "
        "(employees or regulators) earns full marks.</p>"
        "<p><b>(a) Lenders.</b> Banks and bondholders write covenants that limit new borrowing, "
        "acquisitions and payouts and require regular reports; a breach hands them control. The "
        "fixed interest and repayments also take cash out of the CEO's hands before it reaches "
        "the jet or the tower. <i>Limitation:</i> lenders care about being repaid, not about the "
        "value of equity, so they stop monitoring once their loan is safe.</p>"
        "<p><b>(b) Employees or regulators.</b> Employees see first how revenue is booked and "
        "can blow the whistle: the Sarbanes-Oxley Act protects whistleblowers, requires "
        "independent auditors and audit committees and makes the CEO and CFO personally certify "
        "the accounts, which regulators such as the SEC enforce. <i>Limitation:</i> these rules "
        "target fraud and false reporting, not legal but wasteful spending such as the jet.</p>"
        "<p><b>(c) The market for corporate control.</b> A share price 25% below the value under "
        "better management invites a bidder (a rival or a private-equity fund) to buy control, "
        "replace the CEO and the board and keep the gain; the threat of a bid alone disciplines "
        "managers. <i>Limitation:</i> defences such as a poison pill or a staggered board can "
        "block the bid.</p>"
        "<p><b>Other limitations and channels that score.</b> (a): covenants loosened when the "
        "firm refinances; lenders who prefer too little risk; the threat of not rolling over a "
        "loan as a channel. (b): employees who fear retaliation; compliance costs; auditors, the "
        "stock exchange or the press and Dodd-Frank's independent compensation committees as "
        "channels. (c): takeovers are costly and slow; target shareholders free-ride by holding "
        "out for the post-takeover value; a leveraged buyout as the channel. Activism, proxy "
        "fights and proxy access are shareholder actions, which the exercise rules out.</p>"
    ),
    "criteria": [
        "Three monitors, 4 points each: about 2 for how it disciplines the CEO and 2 for one "
        "limitation. A monitor described without a mechanism earns at most 1 point.",
        "(a) Lenders: covenants (limits on borrowing, acquisitions and payouts; reporting), "
        "control after a breach, interest and repayments that take free cash flow away from the "
        "CEO. Limitation: lenders care about repayment, not equity value; they stop once safe, "
        "prefer low risk or renegotiate.",
        "(b) One actor explained well earns full marks: employees as whistleblowers protected by "
        "SOX, or regulators (SOX auditor independence, audit committees, CEO/CFO certification, "
        "SEC enforcement). Limitation: aimed at fraud rather than wasteful but legal spending; "
        "compliance costs; fear of retaliation.",
        "(c) Market for corporate control: the 25% discount makes a hostile bid profitable; the "
        "bidder replaces management; the threat alone disciplines. Limitation: cost, takeover "
        "defences (poison pill, staggered board), free-riding target shareholders, disruption.",
        "What separates a strong answer: it uses the facts (the restatements in (b), the jet and "
        "the tower in (a), the 25% discount in (c)). A generic but correct answer still earns "
        "the points, as in Kurbatov's keys.",
        "Activism, proxy fights and voting are shareholder actions, which the exercise excludes; "
        "they earn nothing as one of the three monitors.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
ex3 = {
    "n": 3, "title": "Asymmetric information", "points": 18,
    "topic": "Asymmetric information, share repurchases", "chapters": [13, 15, 16],
    "body": (
        f"<p>Brekke Sensor ASA has {g(N3)} million shares, no debt and NOK {g(C3)} million of "
        "excess cash. Contract news will arrive shortly. If it is good, the value of "
        f"Brekke's business (its enterprise value) will be NOK {g(EVg)} million; if it is bad, NOK "
        f"{g(EVb)} million. Investors put the probability of good news at {pc(q3)} and value the "
        "business at its expected value. Management already knows the news. All the excess cash "
        "will be used to repurchase shares at the market price, either now or after the news. "
        "Ignore taxes and discounting. Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is Brekke's share price today?</p>",
            "solution": (
                f"<p><b>Step 1. Enterprise value.</b> EV = {g(q3)} × {g(EVg)} + {g(1 - q3)} × "
                f"{g(EVb)} = {g(q3 * EVg)} + {g((1 - q3) * EVb)} = <b>NOK {g(EV0)} million</b></p>"
                f"<p><b>Step 2. Equity and price.</b> Equity = EV + cash − debt = {g(EV0)} + "
                f"{g(C3)} − 0 = <b>{g(E3_0)}</b>, so P<sub>0</sub> = {g(E3_0)}/{g(N3)} = "
                f"<b>NOK {g(P3_0)}</b></p>"
            ),
            "criteria": [
                f"Expected enterprise value {g(EV0)} from the investors' 40/60 probabilities.",
                f"Adds the excess cash: equity = {g(EV0)} + {g(C3)} = {g(E3_0)}. Forgetting it "
                f"gives NOK {g(feil_uten_kasse)}.",
                f"P_0 = {g(E3_0)}/{g(N3)} = NOK {g(P3_0)}.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>Brekke repurchases shares now, before the news; investors do not yet read "
                "anything into the timing. How many shares does it buy? What is the share price "
                "after good news and after bad news?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The repurchase.</b> At NOK {g(P3_0)} the {g(C3)} buys "
                f"{g(C3)}/{g(P3_0)} = <b>{g(n_naa)} million shares</b>; {g(N_naa)} million remain "
                "and the cash is gone.</p>"
                f"<p><b>Step 2. After the news.</b> The shares are now a claim on the business "
                f"alone:<br>Good: {g(EVg)}/{g(N_naa)} = <b>NOK {f(Pg_naa)}</b><br>"
                f"Bad: {g(EVb)}/{g(N_naa)} = <b>NOK {f(Pb_naa)}</b></p>"
                f"<p><b>Check.</b> With the investors' probabilities the expected price is "
                f"{g(q3)} × {f(Pg_naa)} + {g(1 - q3)} × {f(Pb_naa)} = {f(q3 * Pg_naa)} + "
                f"{f((1 - q3) * Pb_naa)} = {g(P3_0)} ✓, the price today. A repurchase at the market "
                "price leaves the expected value per share unchanged; the check fails if the "
                f"shares are bought at a wrong price or the cash is left in (that gives "
                f"{f(feil_kasse_igjen)} in the good case). The spread of the outcomes widens "
                "because the riskless cash has left the firm.</p>"
            ),
            "criteria": [
                f"{g(n_naa)} million shares bought at NOK {g(P3_0)}; {g(N_naa)} million remain.",
                f"Good news: {g(EVg)}/{g(N_naa)} = NOK {f(Pg_naa)}. Bad news: {g(EVb)}/{g(N_naa)} = "
                f"NOK {f(Pb_naa)}.",
                "The cash is gone after the repurchase, so it is not added back after the news.",
                "(bonus) The check that the expected price is still NOK 40.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Brekke instead repurchases after the news is out. What is the share price after "
                "the repurchase in each case?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The news first.</b> Before the repurchase the firm still holds the "
                f"cash:<br>Good: ({g(EVg)} + {g(C3)})/{g(N3)} = <b>NOK {g(Pg_etter)}</b><br>"
                f"Bad: ({g(EVb)} + {g(C3)})/{g(N3)} = <b>NOK {g(Pb_etter)}</b></p>"
                "<p><b>Step 2. The repurchase at the new price.</b> Now everyone knows the value, so "
                "the shares are bought at a fair price and the price does not move:<br>"
                f"Good: {g(C3)}/{g(Pg_etter)} = {f(n_g)} million shares bought, "
                f"{g(EVg)}/{f(N3 - n_g)} = <b>NOK {g(Pg_etter)}</b><br>"
                f"Bad: {g(C3)}/{g(Pb_etter)} = {f(n_b)} million shares bought, "
                f"{g(EVb)}/{f(N3 - n_b)} = <b>NOK {g(Pb_etter)}</b></p>"
                f"<p><b>Check.</b> {g(q3)} × {g(Pg_etter)} + {g(1 - q3)} × {g(Pb_etter)} = "
                f"{g(q3 * Pg_etter)} + {g((1 - q3) * Pb_etter)} = {g(P3_0)} ✓. The price after the "
                "repurchase equals the price before it (an identity once the price is fair).</p>"
            ),
            "criteria": [
                f"Price after the news includes the cash: ({g(EVg)} + {g(C3)})/{g(N3)} = {g(Pg_etter)} "
                f"and ({g(EVb)} + {g(C3)})/{g(N3)} = {g(Pb_etter)}.",
                f"The repurchase is at that fair price, so the price stays at NOK {g(Pg_etter)} or "
                f"NOK {g(Pb_etter)}.",
                f"Share counts ({f(n_g)} and {f(n_b)} million) are not asked for; showing that the "
                "price is unchanged after buying them is a good way to explain why.",
                "(bonus) Says why the price does not move: a repurchase at a fair price creates or "
                "moves no value.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Management acts for the shareholders who keep their shares. When does it "
                "repurchase if the news is good? When if it is bad? If the news is good, who gains "
                "and who loses from this choice? How much?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Compare b) and c).</b></p>"
                "<table class=\"data\"><tr><th>News</th><th>Repurchase now</th><th>Repurchase "
                "after the news</th><th>Choice</th></tr>"
                f"<tr><td>Good</td><td class=\"n\">{f(Pg_naa)}</td><td class=\"n\">{g(Pg_etter)}</td>"
                "<td>now</td></tr>"
                f"<tr><td>Bad</td><td class=\"n\">{f(Pb_naa)}</td><td class=\"n\">{g(Pb_etter)}</td>"
                "<td>after</td></tr></table>"
                "<p>With good news management <b>repurchases now</b>, while the shares are "
                "undervalued; with bad news it <b>waits</b>, so it does not buy overvalued "
                "shares.</p>"
                "<p><b>Step 2. Who gains and who loses with good news.</b> The shareholders who "
                f"sell get NOK {g(P3_0)} for shares worth NOK {g(Pg_etter)} once the news is out: "
                f"they lose {g(n_naa)} × ({g(Pg_etter)} − {g(P3_0)}) = <b>NOK {g(tap_selgere)} "
                f"million</b>. The {g(N_naa)} million shares that stay gain {g(N_naa)} × "
                f"({f(Pg_naa)} − {g(Pg_etter)}) = <b>NOK {g(gev_blir)} million</b>.</p>"
                "<p>The two are equal by construction (an identity): the repurchase creates no "
                "value, it moves value from the uninformed sellers to the shareholders who stay. "
                f"With bad news, buying now would move NOK {g(gev_selg_b)} million the other way, "
                "which is why management waits.</p>"
            ),
            "criteria": [
                f"Good news: repurchase now ({f(Pg_naa)} > {g(Pg_etter)}). Bad news: wait "
                f"({g(Pb_etter)} > {f(Pb_naa)}).",
                f"Sellers lose {g(n_naa)} × ({g(Pg_etter)} − {g(P3_0)}) = NOK {g(tap_selgere)} "
                f"million; the remaining shareholders gain the same {g(gev_blir)}.",
                "Names the mechanism: a transfer from selling to remaining shareholders, not value "
                "creation; the firm buys shares it knows are undervalued.",
                f"Measuring the sellers' loss against keeping the share, {g(n_naa)} × ({f(Pg_naa)} − "
                f"{g(P3_0)}) = {f(feil_referanse)}, is the wrong benchmark: the alternative to "
                f"management's choice is a repurchase after the news at {g(Pg_etter)}.",
                f"(bonus) Buying now with bad news would transfer NOK {g(gev_selg_b)} million to "
                "the sellers.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Now investors know how management times repurchases. What happens to the share "
                "price when Brekke announces an immediate repurchase? Given this reaction, would "
                "management announce one if the news were bad? (3-4 sentences.)</p>"
            ),
            "solution": (
                "<p><b>Model answer.</b> Only a firm with good news repurchases before the news, so "
                "investors read the announcement as good news and the price jumps to the "
                f"good-news value of NOK {g(P_kunngj)} (+{pc(kunngj_avk)}). Management with bad "
                f"news would then have to buy at {g(P_kunngj)}: it would retire only "
                f"{f(n_kunngj)} million shares and the price after the bad news would be "
                f"{g(EVb)}/{f(N_kunngj)} = NOK {g(Pb_kunngj)}, below the {g(Pb_etter)} it gets by "
                "waiting, so it does not mimic. The investors' reading is therefore consistent "
                "with what management does: the beliefs are rational. The gain from the "
                f"repurchase disappears, since a good-news firm now also buys at {g(P_kunngj)}.</p>"
                "<p><b>Bonus thoughts.</b> A firm that does not announce is read as having bad "
                f"news, so its price falls towards NOK {g(Pb_etter)}. This is why buyback "
                "announcements are followed by price rises in practice: the market treats them as "
                "a sign that management thinks the shares are undervalued.</p>"
            ),
            "criteria": [
                f"The price rises on the announcement, towards the good-news value of NOK "
                f"{g(P_kunngj)}: the repurchase reveals that management expects good news.",
                f"No: bad-news management would have to buy at {g(P_kunngj)}, which transfers value "
                f"to the sellers and leaves NOK {g(Pb_kunngj)} against {g(Pb_etter)} from waiting. "
                "Either the number or the argument in words earns the points.",
                "Answering no with this reason is the consistency check: the market's reading "
                "matches what management does. The words «rational beliefs» are not required; "
                "naming them is a bonus.",
                "(bonus) Once the market reads the signal, the transfer to the remaining "
                "shareholders disappears; no announcement is read as bad news.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
tab_rader = [
    ("Revenue", inntekt), ("Cost of goods sold", vkost),
    ("Other operating costs", sga), ("Depreciation", avskr),
    ("Capital expenditure", capex), ("Inventory at year end (Year 0: 120)", lager[1:]),
    ("Interest on the current loan", [renter_gml] * 3),
]
tabell4 = "<table class=\"data\"><tr><th>NOK million</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr>"
for navn, rad in tab_rader:
    tabell4 += f"<tr><td>{navn}</td>" + "".join(f"<td class=\"n\">{g(x)}</td>" for x in rad) + "</tr>"
tabell4 += "</table>"

fcf_tab = ("<table class=\"data\"><tr><th>NOK million</th><th>Year 1</th><th>Year 2</th>"
           "<th>Year 3</th></tr>")
for navn, rad in [
    ("EBIT = revenue − COGS − other costs − depreciation", EBIT4),
    (f"NOPAT = EBIT × (1 − {g(tau4)})", NOPAT4),
    ("+ Depreciation", avskr),
    ("− Capital expenditure", [-c for c in capex]),
    ("− Increase in inventory (a cut is +)", [-x for x in dLager]),
]:
    fcf_tab += f"<tr><td>{navn}</td>" + "".join(f"<td class=\"n\">{g(x)}</td>" for x in rad) + "</tr>"
fcf_tab += ("<tr><td><b>FCF</b></td>" + "".join(f"<td class=\"n\"><b>{g(x)}</b></td>" for x in FCF4)
            + "</tr></table>")
for t in range(3):
    vist_sum([NOPAT4[t], avskr[t], -capex[t], -dLager[t]], FCF4[t], 3)

w_txt = f(1 + w4, 5)          # 1.09172
u_txt = g(1 + rU4)            # 1.097
ex4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18,
    "topic": "Free cash flow, WACC and APV", "chapters": [2, 4, 17, 18, 19, 20],
    "body": (
        "<p>A private-equity fund asks you to value Rondane Sport AS, an unlisted chain of sports "
        "shops, which it will buy now (Year 0). The fund will cut inventory; other working "
        f"capital stays constant. The tax rate is {pc(tau4)}. Projections:</p>"
        + tabell4 +
        f"<p>From Year 4 on, free cash flow grows by {pc(g4)} a year forever. After the purchase "
        f"Rondane will keep debt at {pc(d4)} of firm value (rebalanced yearly) and "
        f"borrow at {pc(rD4)}. Fjellsport ASA, a listed retailer with the same business risk, has "
        f"an equity beta of {g(bE_tw)}, a constant debt-to-equity ratio of {g(de_tw)} and a cost "
        f"of debt of {pc(rD_tw)}. The risk-free rate is {pc(rf4)} and the expected market return "
        f"{pc(rm4)}.</p>"
        "<p>Each question is worth 2 points. Recommended precision is 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": "<p>Find Rondane's free cash flow in Years 1 to 3.</p>",
            "solution": (
                "<p>FCF = EBIT(1 − τ) + depreciation − capital expenditure − ΔNWC. Only the "
                "<i>change</i> in inventory is a cash flow; a cut releases cash:</p>"
                + fcf_tab +
                f"<p>The interest of {g(renter_gml)} is left out: free cash flow belongs to all "
                "investors; the financing enters through the discount rate or the tax shield. "
                "The current loan will in any case be replaced by the new debt policy.</p>"
            ),
            "criteria": [
                f"FCF = {g(FCF4[0])}, {g(FCF4[1])} and {g(FCF4[2])}.",
                f"Uses the change in inventory ({g(-dLager[0])}, {g(-dLager[1])}, 0) as a cash "
                "inflow. Using the levels («forgetting the delta») or subtracting the cut "
                f"(giving {g(feil_fortegn[0])} and {g(feil_fortegn[1])}) is the error.",
                f"No interest deducted. Subtracting the after-tax interest gives {g(feil_renter[0])}, "
                f"{g(feil_renter[1])} and {g(feil_renter[2])} and mixes financing into FCF.",
            ],
        },
        {
            "label": "b", "points": 2,
            "body": "<p>Find Fjellsport's asset beta and Rondane's unlevered cost of capital.</p>",
            "solution": (
                f"<p><b>Step 1. Debt beta.</b> Fjellsport's debt costs more than r<sub>f</sub>, so "
                f"β<sub>D</sub> = ({pc(rD_tw)} − {pc(rf4)})/{pc(mrp4)} = <b>{g(bD_tw)}</b>.</p>"
                f"<p><b>Step 2. Unlever.</b> D/E = {g(de_tw)} means D/V = {g(de_tw)}/{g(1 + de_tw)} = "
                f"1/3 and E/V = 2/3:<br>β<sub>U</sub> = (2/3)({g(bE_tw)}) + (1/3)({g(bD_tw)}) = "
                f"{f((1 - dv_tw) * bE_tw)} + {f(dv_tw * bD_tw)} = <b>{g(bU4)}</b></p>"
                f"<p><b>Step 3. CAPM.</b> r<sub>U</sub> = {pc(rf4)} + {g(bU4)} × {pc(mrp4)} = "
                f"<b>{pc(rU4)}</b>. Same business risk, so this is Rondane's r<sub>U</sub>.</p>"
                f"<p>Through returns: r<sub>E</sub> = {pc(rf4)} + {g(bE_tw)} × {pc(mrp4)} = "
                f"{pc(rE_tw)} and r<sub>U</sub> = (2/3)({pc(rE_tw)}) + (1/3)({pc(rD_tw)}) = "
                f"{fd(100 * (1 - dv_tw) * rE_tw, 6)}% + {fd(100 * dv_tw * rD_tw, 6)}% = {pc(rU4)} "
                "(the same, since CAPM is linear).</p>"
            ),
            "criteria": [
                f"β_D = ({pc(rD_tw)} − {pc(rf4)})/{pc(mrp4)} = {g(bD_tw)}; treating the debt as "
                f"riskless gives β_U = {f(bU4_feil)} and r_U = {pc(rU4_feil)}, too low.",
                f"Weights from D/E = {g(de_tw)}: D/V = 1/3, not {g(de_tw)}.",
                f"β_U = {g(bU4)} and r_U = {pc(rU4)}, without taxes in the weights.",
            ],
        },
        {
            "label": "c", "points": 2,
            "body": "<p>Find Rondane's after-tax WACC.</p>",
            "solution": (
                f"<p><b>Step 1. Cost of equity at Rondane's leverage.</b> D/V = {g(d4)}, so "
                f"D/E = {g(d4)}/{g(1 - d4)} = {f(de4)}:<br>r<sub>E</sub> = r<sub>U</sub> + "
                f"(D/E)(r<sub>U</sub> − r<sub>D</sub>) = {pc(rU4)} + {f(de4)} × ({pc(rU4)} − "
                f"{pc(rD4)}) = <b>{pc(rE4)}</b></p>"
                f"<p><b>Step 2. WACC.</b> r<sub>wacc</sub> = {g(1 - d4)} × {pc(rE4)} + {g(d4)} × "
                f"{pc(rD4)} × (1 − {g(tau4)}) = {pc((1 - d4) * rE4)} + "
                f"{pc(d4 * rD4 * (1 - tau4))} = <b>{pc(w4)}</b></p>"
                f"<p>The shortcut r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τr<sub>D</sub> = {pc(rU4)} − "
                f"{g(d4)} × {g(tau4)} × {pc(rD4)} = {pc(w4)} gives the same (the same formula "
                "rearranged, so it catches only arithmetic slips).</p>"
            ),
            "criteria": [
                f"r_E = {pc(rU4)} + {f(de4)} × ({pc(rU4)} − {pc(rD4)}) = {pc(rE4)}, with Rondane's "
                "own D/E, not Fjellsport's.",
                f"r_wacc = {g(1 - d4)} × {pc(rE4)} + {g(d4)} × {pc(rD4)} × {g(1 - tau4)} = {pc(w4)}.",
                "(1 − τ) on r_D only; the shortcut r_U − dτr_D is equally accepted.",
            ],
        },
        {
            "label": "d", "points": 2,
            "body": (
                "<p>Find Rondane's terminal value at the end of Year 3 (WACC method).</p>"
            ),
            "solution": (
                f"<p>FCF<sub>4</sub> = {g(FCF4[2])} × {g(1 + g4)} = {g(FCF4_4)}, growing at {pc(g4)} "
                "forever:<br>"
                f"V<sup>L</sup><sub>3</sub> = {g(FCF4_4)}/({pc(w4)} − {pc(g4)}) = "
                f"{g(FCF4_4)}/{fd(w4 - g4, 5)} = <b>NOK {f(VL[3])} million</b></p>"
            ),
            "criteria": [
                f"Grows the Year-3 flow one year: FCF_4 = {g(FCF4_4)}. Using {g(FCF4[2])} as the "
                "numerator is the classic slip.",
                f"Discounts at r_wacc − g = {fd(w4 - g4, 5)}: V^L_3 = {f(VL[3])}.",
                f"Using r_U here gives {f(VL3_feil_rU)}, which is V^U_3, not the levered value.",
            ],
        },
        {
            "label": "e", "points": 2,
            "body": "<p>Find Rondane's levered value today (WACC method).</p>",
            "solution": (
                f"<p>V<sup>L</sup><sub>0</sub> = {g(FCF4[0])}/{w_txt} + {g(FCF4[1])}/{w_txt}"
                f"<sup>2</sup> + ({g(FCF4[2])} + {f(VL[3])})/{w_txt}<sup>3</sup><br>"
                f"= {ledd(pv_w)} = <b>NOK {f(VL[0])} million</b></p>"
            ),
            "criteria": [
                f"Discounts the three flows and the terminal value at {pc(w4)}; the terminal value "
                "is discounted three years, together with FCF_3.",
                f"V^L_0 = {f(VL[0])}.",
                "No tax shield added: the WACC already contains it.",
            ],
        },
        {
            "label": "f", "points": 2,
            "body": (
                "<p>Find Rondane's debt at the end of Years 0 and 1. How much debt is issued or "
                "repaid at the end of Year 1?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Values.</b> V<sup>L</sup><sub>2</sub> = ({g(FCF4[2])} + "
                f"{f(VL[3])})/{w_txt} = {f(VL[2])} and V<sup>L</sup><sub>1</sub> = ({g(FCF4[1])} + "
                f"{f(VL[2])})/{w_txt} = <b>{f(VL[1])}</b> (equivalently {f(VL[0])} × {w_txt} − "
                f"{g(FCF4[0])}).</p>"
                f"<p><b>Step 2. Debt capacity D<sub>t</sub> = {g(d4)} × V<sup>L</sup><sub>t</sub>.</b>"
                f"<br>D<sub>0</sub> = {g(d4)} × {f(VL[0])} = <b>{f(D4[0])}</b><br>"
                f"D<sub>1</sub> = {g(d4)} × {f(VL[1])} = <b>{f(D4[1])}</b></p>"
                f"<p><b>Step 3.</b> {f(D4[1])} − {f(D4[0])} = <b>NOK {f(justering)} million of new "
                "debt is issued</b> at the end of Year 1. The firm's value grows with its cash "
                "flows, so it must borrow more to keep D/V constant.</p>"
            ),
            "criteria": [
                f"V^L_1 = {f(VL[1])}: the value after the Year-1 cash flow has been paid out.",
                f"D_0 = {f(D4[0])}, D_1 = {f(D4[1])}.",
                f"Adjustment {f(justering)}, stated as new borrowing, not repayment.",
            ],
        },
        {
            "label": "g", "points": 2,
            "body": "<p>Find Rondane's unlevered value today.</p>",
            "solution": (
                f"<p>Discount the same FCF at r<sub>U</sub> = {pc(rU4)}, with the terminal value at "
                f"r<sub>U</sub> too:<br>V<sup>U</sup><sub>3</sub> = {g(FCF4_4)}/({pc(rU4)} − "
                f"{pc(g4)}) = {f(VU3)}<br>"
                f"V<sup>U</sup><sub>0</sub> = {g(FCF4[0])}/{u_txt} + {g(FCF4[1])}/{u_txt}<sup>2</sup> + "
                f"({g(FCF4[2])} + {f(VU3)})/{u_txt}<sup>3</sup> = {ledd(pv_u)} = <b>NOK "
                f"{f(VU0)} million</b></p>"
            ),
            "criteria": [
                f"Terminal value at r_U: {f(VU3)}.",
                f"V^U_0 = {f(VU0)}.",
                "Same FCF as in a); only the rate changes.",
            ],
        },
        {
            "label": "h", "points": 2,
            "body": (
                "<p>Find the interest tax shields in Years 1 to 4 and the present value of all tax "
                "shields.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Debt and shields.</b> TS<sub>t</sub> = τ × r<sub>D</sub> × "
                f"D<sub>t−1</sub> = {g(tau4 * rD4)} × D<sub>t−1</sub>. With D<sub>2</sub> = {g(d4)} × "
                f"{f(VL[2])} = {f(D4[2])} and D<sub>3</sub> = {g(d4)} × {f(VL[3])} = {f(D4[3])}:</p>"
                "<table class=\"data\"><tr><th>Year t</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>"
                "<tr><td>D<sub>t−1</sub></td>" + "".join(f"<td class=\"n\">{f(x)}</td>" for x in D4)
                + "</tr><tr><td>TS<sub>t</sub></td>"
                + "".join(f"<td class=\"n\">{f(x)}</td>" for x in TS4) + "</tr></table>"
                f"<p><b>Step 2. The rate.</b> Debt is rebalanced to {pc(d4)} of value, so the shields "
                f"have the risk of the assets: discount at r<sub>U</sub> = {pc(rU4)}. From Year 4 "
                f"the debt and the shields grow with the firm at {pc(g4)}:<br>"
                f"value at Year 3 of TS<sub>4</sub> onwards = {f(TS4[3])}/({pc(rU4)} − {pc(g4)}) = "
                f"{f(TV_TS)}</p>"
                f"<p>PV(TS) = {f(TS4[0])}/{u_txt} + {f(TS4[1])}/{u_txt}<sup>2</sup> + ({f(TS4[2])} + "
                f"{f(TV_TS)})/{u_txt}<sup>3</sup> = {ledd(pv_ts)} = <b>{f(PVTS4)}</b></p>"
            ),
            "criteria": [
                f"Uses the debt at the start of each year: TS = {f(TS4[0])}, {f(TS4[1])}, "
                f"{f(TS4[2])} and {f(TS4[3])}.",
                f"Includes the shields after Year 3 as a growing perpetuity ({f(TV_TS)} at Year 3).",
                f"Discounts at r_U = {pc(rU4)}: PV(TS) = {f(PVTS4)}. Discounting at r_D gives "
                f"{f(PVTS4_rD)}.",
                "(bonus) Says why r_U: with constant D/V the shields move with firm value.",
            ],
        },
        {
            "label": "i", "points": 2,
            "body": (
                "<p>Find Rondane's levered value today by APV and compare with e).</p>"
            ),
            "solution": (
                f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {ledd([VU0, PVTS4])} = <b>NOK "
                f"{f(APV4)} million</b>, the same as the WACC value in e) ✓.</p>"
                "<p>The two methods value the same tax shields, once inside the discount rate and "
                "once as a separate cash flow. Because the debt levels came from the WACC values, "
                "the agreement is a fixed point rather than an independent estimate; it still "
                f"catches the wrong rate on the shields (r<sub>D</sub> would give {f(VU0 + PVTS4_rD)}) "
                "and arithmetic slips. A gap of about 0.001 is rounding; a gap of 0.05 is an "
                "error.</p>"
            ),
            "criteria": [
                f"V^L = {ledd([VU0, PVTS4])} = {f(APV4)}.",
                "States that it equals the WACC value in e).",
                "Drift of about 0.001 from rounding is acceptable (Kurbatov's H2025 key); 0.05 "
                "is not.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Real Options", "points": 20, "topic": "Real options", "chapters": [25],
    "body": (
        f"<p>Djuphav Mineral AS can buy a seabed-mining vessel for NOK {g(I5)} million. Its cash "
        "flows start one year after the purchase and depend on a court case. With probability "
        f"p = {pc(p5)}, an environmental group sues this year to stop seabed mining. If it "
        f"sues, the court then stops all mining with probability {pc(qban)} (cash flows 0 "
        "forever); otherwise the case is dismissed and the industry expands (NOK "
        f"{g(CH5)} million per year forever). If nobody sues, the cash flows are NOK {g(CM5)} "
        "million per year forever. The outcome is known before the first cash flow. Discount all "
        f"cash flows at {pc(r5)}.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is the NPV of buying the vessel today?</p>",
            "solution": (
                "<p><b>Step 1. The three outcomes.</b></p>"
                "<table class=\"data\"><tr><th>Outcome</th><th>Probability</th><th>Cash flow per "
                "year</th></tr>"
                f"<tr><td>Lawsuit, mining stopped</td><td class=\"n\">{g(p5)} × {g(qban)} = "
                f"{g(p5 * qban)}</td><td class=\"n\">0</td></tr>"
                f"<tr><td>Lawsuit, dismissed</td><td class=\"n\">{g(p5)} × {g(1 - qban)} = "
                f"{g(p5 * (1 - qban))}</td><td class=\"n\">{g(CH5)}</td></tr>"
                f"<tr><td>No lawsuit</td><td class=\"n\">{g(1 - p5)}</td><td class=\"n\">{g(CM5)}"
                "</td></tr></table>"
                f"<p><b>Step 2. Expected perpetuity.</b> E[CF] = {g(p5 * (1 - qban))} × {g(CH5)} + "
                f"{g(1 - p5)} × {g(CM5)} = {g(p5 * (1 - qban) * CH5)} + {g((1 - p5) * CM5)} = "
                f"<b>{g(ECF5)}</b> a year from Year 1.<br>NPV = −{g(I5)} + {g(ECF5)}/{g(r5)} = "
                f"−{g(I5)} + {g(ECF5 / r5)} = <b>NOK {g(NPV5a)} million</b></p>"
            ),
            "criteria": [
                f"Three outcomes with probabilities {g(p5 * qban)}, {g(p5 * (1 - qban))} and "
                f"{g(1 - p5)}.",
                f"Expected cash flow {g(ECF5)} a year, valued as a perpetuity: {g(ECF5 / r5)}.",
                f"NPV = {g(NPV5a)}.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                f"<p>Instead, Djuphav can wait one year, learn the outcome and then decide whether to "
                f"buy for the same NOK {g(I5)} million (cash flows then start in Year 2). What is the NPV today of waiting? "
                "Is it better or worse than buying today? Explain the intuition.</p>"
            ),
            "solution": (
                "<p><b>Step 1. Decide in Year 1, outcome by outcome.</b><br>"
                f"Mining stopped: −{g(I5)} + 0 &lt; 0, so do not buy: <b>0</b><br>"
                f"Dismissed: −{g(I5)} + {g(CH5)}/{g(r5)} = −{g(I5)} + {g(CH5 / r5)} = <b>{g(NPVh1)}"
                "</b><br>"
                f"No lawsuit: −{g(I5)} + {g(CM5)}/{g(r5)} = <b>{g(NPVm1)}</b></p>"
                f"<p><b>Step 2. Back to today.</b><br>NPV<sub>wait</sub> = ({g(p5 * (1 - qban))} × "
                f"{g(NPVh1)} + {g(1 - p5)} × {g(NPVm1)} + {g(p5 * qban)} × 0)/{g(1 + r5)} = "
                f"{g(p5 * (1 - qban) * NPVh1 + (1 - p5) * NPVm1)}/{g(1 + r5)} = "
                f"<b>NOK {f(NPV5b)} million</b></p>"
                f"<p><b>Worse</b> than buying today ({f(NPV5b)} &lt; {g(NPV5a)}): buy the vessel "
                "now.</p>"
                "<p><b>Intuition.</b> Waiting has one benefit: you avoid buying the vessel in the "
                f"outcome where mining is stopped, which saves {g(I5)} with probability "
                f"{g(p5 * qban)}. Its cost is that in every other outcome the cash flows start a "
                f"year later. With a {pc(p5)} lawsuit risk the information is worth less than the "
                "delay.</p>"
                f"<p><b>Decomposition (not required).</b> NPV<sub>wait</sub> − NPV<sub>now</sub> = "
                f"({g(p5 * qban)} × {g(I5)} − {g(r5)} × {g(NPV5a)})/{g(1 + r5)} = ({g(spart)} − "
                f"{g(utsatt)})/{g(1 + r5)} = {f(NPV5b - NPV5a)} ✓: the saved outlay against the "
                "cost of receiving the NPV one year later.</p>"
            ),
            "criteria": [
                f"Year-1 NPVs: 0 when mining is stopped (you do not buy), {g(NPVh1)} when the case is "
                f"dismissed, {g(NPVm1)} with no lawsuit.",
                f"NPV_wait = ({g(p5 * (1 - qban))} × {g(NPVh1)} + {g(1 - p5)} × {g(NPVm1)})/"
                f"{g(1 + r5)} = {f(NPV5b)}. Forgetting the extra year of discounting gives "
                f"{f(feil_udiskontert)}.",
                f"Concludes: worse than buying today ({g(NPV5a)}), so buy now.",
                "Intuition: waiting avoids the bad outcome but loses a year of cash flows; at a "
                "low lawsuit risk the information is not worth the delay.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": (
                "<p>At which probability p of a lawsuit (all else unchanged) are you indifferent "
                "between buying today and waiting?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Buying today as a function of p.</b><br>"
                f"E[CF] = p × {g(1 - qban)} × {g(CH5)} + (1 − p) × {g(CM5)} = "
                f"{g((1 - qban) * CH5)}p + {g(CM5)} − {g(CM5)}p = <b>{g(CM5)}</b> for every p.<br>"
                f"So NPV<sub>now</sub> = <b>{g(NPV5a)}</b> whatever p is: a lawsuit spreads the "
                "outcomes without changing the expected cash flow.</p>"
                "<p><b>Step 2. Waiting as a function of p.</b><br>"
                f"NPV<sub>wait</sub> = [p × {g(1 - qban)} × {g(NPVh1)} + (1 − p) × {g(NPVm1)}]/"
                f"{g(1 + r5)} = ({g(NPVm1)} + {g((1 - qban) * NPVh1 - NPVm1)}p)/{g(1 + r5)}</p>"
                f"<p><b>Step 3. Set them equal.</b><br>{g(NPV5a)} × {g(1 + r5)} = {g(NPVm1)} + "
                f"{g((1 - qban) * NPVh1 - NPVm1)}p<br>{g(NPV5a * (1 + r5))} − {g(NPVm1)} = "
                f"{g((1 - qban) * NPVh1 - NPVm1)}p<br><b>p = {g(NPV5a * (1 + r5) - NPVm1)}/"
                f"{g((1 - qban) * NPVh1 - NPVm1)} = {g(p_star)} ({pc(p_star)})</b></p>"
                f"<p><b>Check.</b> At p = {g(p_star)}: NPV<sub>wait</sub> = ({g(NPVm1)} + "
                f"{g(((1 - qban) * NPVh1 - NPVm1) * p_star)})/{g(1 + r5)} = {g(npv_vent(p_star))} = "
                f"NPV<sub>now</sub> ✓. Above {pc(p_star)} waiting is better, below it buying "
                "today.</p>"
            ),
            "criteria": [
                f"Recognises that NPV_now = {g(NPV5a)} does not depend on p (expected cash flow "
                f"stays {g(CM5)}). A student who carries p through and simplifies correctly earns "
                "the same.",
                f"Writes NPV_wait(p) = ({g(NPVm1)} + {g((1 - qban) * NPVh1 - NPVm1)}p)/{g(1 + r5)}.",
                f"p = {g(p_star)}, i.e. {pc(p_star)}.",
                "Show the calculation; the indifference equation is what earns the points.",
                "(bonus) Above this p waiting wins; the check at p = 0.2 takes one line.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                f"<p>From now on p = {pc(p5d)}. If Djuphav buys today, it can "
                f"sell the vessel at the end of Year 1 for NOK {g(S5)} million in any state, giving "
                "up all later cash flows. What is the NPV of buying today? Do you buy today or "
                "wait?</p>"
            ),
            "solution": (
                "<p><b>Step 1. When would you sell?</b> At the end of Year 1 the outcome is known. "
                f"Continuing is worth {g(CH5 / r5)} (dismissed) or {g(CM5 / r5)} (no lawsuit), both "
                f"above {g(S5)}, so you sell only if mining is stopped, with probability {g(p5d)} × "
                f"{g(qban)} = {g(p5d * qban)}.</p>"
                "<p><b>Step 2. Buying today.</b> The expected cash flow is still "
                f"{g(CM5)}, so without the resale NPV<sub>now</sub> = {g(NPV5d_uten)}. The resale "
                f"adds {g(p5d * qban)} × {g(S5)}/{g(1 + r5)} = {g(salg_verdi)}:<br>"
                f"NPV<sub>now</sub> = {g(NPV5d_uten)} + {g(salg_verdi)} = <b>NOK {g(NPV5d)} "
                "million</b></p>"
                f"<p><b>Step 3. Waiting at p = {g(p5d)}.</b> You never buy in the bad outcome, so the "
                "resale right is worth nothing to a firm that waits:<br>"
                f"NPV<sub>wait</sub> = ({g(p5d * (1 - qban))} × {g(NPVh1)} + {g(1 - p5d)} × "
                f"{g(NPVm1)})/{g(1 + r5)} = {g(p5d * (1 - qban) * NPVh1 + (1 - p5d) * NPVm1)}/"
                f"{g(1 + r5)} = <b>{f(NPV5d_vent)}</b></p>"
                f"<p><b>Decision: buy today</b> ({g(NPV5d)} &gt; {f(NPV5d_vent)}). Without the "
                f"resale right waiting would win ({f(NPV5d_vent)} &gt; {g(NPV5d_uten)}); the right "
                "turns the decision around.</p>"
                f"<p><b>Bonus.</b> Against the best alternative without it (waiting), the right "
                f"is worth {g(NPV5d)} − {f(NPV5d_vent)} = {f(mot_beste)}.</p>"
            ),
            "criteria": [
                f"Sells only when mining is stopped (continuation values {g(CH5 / r5)} and "
                f"{g(CM5 / r5)} exceed {g(S5)}).",
                f"NPV_now = {g(NPV5d_uten)} + {g(p5d * qban)} × {g(S5)}/{g(1 + r5)} = {g(NPV5d)}.",
                f"NPV_wait at p = {g(p5d)}: {f(NPV5d_vent)}, with no value from the resale right.",
                "Decision: buy today.",
                "(bonus) Notes that without the right the decision would be to wait.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Explain the intuition behind c) and d): how do the probability of a lawsuit and "
                "the right to sell the vessel affect the advantage of waiting over buying today? "
                "(2-3 sentences.)</p>"
            ),
            "solution": (
                f"<p><b>Model answer.</b> A higher p spreads the outcomes (more chance of both the "
                "ban and the boom) without changing the expected cash flow, so buying today is worth "
                "the same while waiting lets you skip the bad branch: like any option, the option to "
                "wait is worth more when the outcomes are more volatile. The right to sell the "
                "vessel is itself an option that caps the loss in the bad branch if you buy today: "
                f"it raises the value of buying today ({g(NPV5d_uten)} → {g(NPV5d)}) and leaves "
                f"waiting unchanged ({f(NPV5d_vent)}). It protects against the same downside as "
                "waiting, so the advantage of waiting shrinks while buying today keeps the early "
                "cash flows.</p>"
            ),
            "criteria": [
                "Higher p means more dispersion (volatility) with the same expected cash flow; the "
                "option to wait gains value, buying today does not.",
                f"The resale right is an abandonment option that limits the downside of buying "
                f"today ({g(NPV5d_uten)} → {g(NPV5d)}) and does nothing for waiting: a substitute "
                "for waiting. «It makes buying today more valuable» and «it reduces the value of "
                "waiting relative to buying» are the same point; both readings earn full marks.",
                "Linking both to option logic (value from avoiding the bad outcome) earns full "
                "marks; numbers are not needed.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
k_txt = f(k6)
ex6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions",
    "chapters": [22, 26],
    "body": (
        "<p>Havstad Seafood ASA (A) has made a surprise offer for Smoltvik ASA (B): "
        f"{nA} A shares for every {nB} B shares. The deal will be completed or fail in exactly "
        "6 months; if it fails, both share prices return to their pre-announcement levels. Before "
        f"the announcement P<sub>A,0</sub> = NOK {fd(PA0, 2)} and P<sub>B,0</sub> = NOK "
        f"{fd(PB0, 2)}; just after it P<sub>A,1</sub> = NOK {fd(PA1, 2)} and P<sub>B,1</sub> = "
        f"NOK {fd(PB1, 2)}. The risk-free rate is {pc(rf6)} a year. Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 4,
            "body": (
                "<p>What is the offer worth per B share at the old and at the new prices? Why does B "
                "trade below the offer?</p>"
            ),
            "solution": (
                f"<p><b>Exchange ratio.</b> {nA} A shares for {nB} B shares is {g(ER6)} A share per "
                "B share.</p>"
                f"<p>At the pre-announcement prices: {g(ER6)} × {g(PA0)} = <b>NOK {g(bud0)}</b>, a "
                f"premium of {pc(premie0)} over B's {g(PB0)}.<br>At the new prices: {g(ER6)} × "
                f"{g(PA1)} = <b>NOK {g(bud1)}</b>.</p>"
                f"<p><b>Why B trades at {g(PB1)}, below {g(bud1)}.</b> The deal may fail; B then "
                f"falls back to {g(PB0)}. If completion were certain, {nB} B shares would be the "
                f"same as {nA} A shares and B would trade at exactly {g(bud1)}; the spread of "
                f"{g(spread1)} ({pc(spread1 / PB1)} of B's price) is the market's compensation for "
                "bearing the risk that the deal breaks.</p>"
            ),
            "criteria": [
                f"Exchange ratio {g(ER6)}: offer worth NOK {g(bud0)} at the old prices and NOK "
                f"{g(bud1)} at the new ones.",
                f"B trades below {g(bud1)} because the deal may fail and B would then return to "
                f"{g(PB0)}.",
                "The spread is compensation for deal risk: with certain completion B would equal "
                f"{g(ER6)} × P_A.",
                f"(bonus) The premium of {pc(premie0)} at the old prices.",
            ],
        },
        {
            "label": "b", "points": 8,
            "body": (
                "<p>Calculate the probability of completion perceived by the market. (Hint: use a "
                "long-short strategy.)</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The position, at the new prices.</b> Buy {nB} B shares, short "
                f"{nA} A shares and invest the short-sale proceeds at the risk-free rate for "
                "6 months:</p>"
                "<table class=\"data\"><tr><th>Leg</th><th>Action</th><th>Cash flow today</th></tr>"
                f"<tr><td>Long target</td><td>Buy {nB} B at {g(PB1)}</td><td class=\"n\">"
                f"−{g(kost)}</td></tr>"
                f"<tr><td>Short acquirer</td><td>Short {nA} A at {g(PA1)}</td><td class=\"n\">"
                f"+{g(short)}</td></tr>"
                f"<tr><td>Risk-free</td><td>Invest {g(short)} for 6 months</td><td class=\"n\">"
                f"−{g(short)}</td></tr>"
                f"<tr><td><b>Net outlay</b></td><td></td><td class=\"n\"><b>−{g(kost)}</b></td></tr>"
                "</table>"
                f"<p>The 6-month growth factor is {g(1 + rf6)}<sup>0.5</sup> = {k_txt}.</p>"
                f"<p><b>Step 2. Payoff if the deal goes through.</b> The {nB} B shares become "
                f"{nA} A shares that close the short; the bond is left:<br>{g(short)} × {k_txt} = "
                f"<b>{f(suksess)}</b></p>"
                f"<p><b>Step 3. Payoff if it fails.</b> Prices return to {g(PA0)} and {g(PB0)}: "
                f"buy back {nA} A at {g(PA0)} and sell {nB} B at {g(PB0)}:<br>{f(suksess)} − "
                f"{g(nA * PA0)} + {g(nB * PB0)} = <b>{f(fiasko)}</b></p>"
                f"<p><b>Step 4. Certainty equivalent of the outlay.</b> {g(kost)} today is worth "
                f"{g(kost)} × {k_txt} = <b>{f(ce6)}</b> in 6 months. Setting the expected payoff "
                f"equal to {g(kost)} is the classic error.</p>"
                f"<p><b>Step 5. Solve.</b><br>{f(ce6)} = p × {f(suksess)} + (1 − p) × {f(fiasko)}"
                f"<br>p = ({f(ce6)} − {f(fiasko)})/({f(suksess)} − {f(fiasko)}) = "
                f"<b>{f(p6)} ({fd(100 * p6, 2)}%)</b></p>"
                f"<p><b>Same position per B share</b> (long 1 B, short {g(ER6)} A): p = 1 − "
                f"({g(ER6)} × {g(PA1)} − {g(PB1)}) × {k_txt}/({g(ER6)} × {g(PA0)} − {g(PB0)}) = 1 − "
                f"{g(spread1)} × {k_txt}/{g(ER6 * PA0 - PB0)} = {f(p6_per)} ✓ (the same trade "
                "scaled down, so it catches arithmetic slips only).</p>"
            ),
            "criteria": [
                f"Long {nB} B, short {nA} A (or per share: long 1 B, short {g(ER6)} A); short "
                "proceeds invested at r_f. Other self-consistent constructions are equally good.",
                f"Six months: factor {g(1 + rf6)}^0.5 = {k_txt}, not {g(1 + rf6)}. Using a full year "
                f"gives p = {f(p6_feil_aar)}.",
                f"Success payoff {f(suksess)}; failure payoff {f(fiasko)} at the pre-announcement "
                "prices.",
                f"Certainty equivalent {g(kost)} × {k_txt} = {f(ce6)}. Plugging in {g(kost)} gives "
                f"{f(p6_feil_100)}.",
                f"p = {f(p6)}; accept 0.7340 to 0.7355 for rounding. Simple interest (factor "
                f"{g(k6_enkel)}) gives {f(p6_enkel)} and is accepted.",
                f"The shortcut {g(PB1)} × {k_txt} = p × {g(ER6)} × {g(PA1)} + (1 − p) × {g(PB0)} gives "
                f"{f(p6_naiv)} and is wrong: it treats today's A price as the value of the offer at "
                "completion; the long-short hedges A's price out.",
                "This part carries 8 points: show the position, both payoffs, the certainty "
                "equivalent and the equation.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>A's shareholders vote on the deal. Using P<sub>A,1</sub> and p from b), what "
                "will an A share be worth at completion if the deal goes through? How do you vote "
                "as a shareholder of A? Briefly explain.</p>"
            ),
            "solution": (
                "<p><b>Step 1. Price A like the long-short.</b> In 6 months A is worth "
                f"P<sub>A</sub><sup>S</sup> if the deal goes through and {g(PA0)} if it fails. With "
                "the market's probability:<br>"
                f"{g(PA1)} × {fd(k6, 6)} = p × P<sub>A</sub><sup>S</sup> + (1 − p) × {g(PA0)}<br>"
                f"{fd(PA1 * k6, 6)} = {fd(p6, 6)} × P<sub>A</sub><sup>S</sup> + {fd(1 - p6, 6)} × {g(PA0)}<br>"
                f"P<sub>A</sub><sup>S</sup> = ({fd(PA1 * k6, 6)} − {fd((1 - p6) * PA0, 6)})/{fd(p6, 6)} = "
                f"<b>NOK {f(PAS)}</b></p>"
                f"<p><b>Step 2. Vote.</b> {f(PAS)} &gt; {g(PA0)}: completion leaves an A share about "
                f"NOK {fd(gevinst_A, 2)} better off than without the deal, so <b>vote for</b>. A's "
                f"rise from {g(PA0)} to {g(PA1)} on the announcement tells the same story: the market "
                "expects the deal to create value for A's shareholders, not only for B's.</p>"
                f"<p><b>Check (identity).</b> B's price gives the same: ({g(PB1)} × {fd(k6, 6)} − "
                f"{fd(1 - p6, 6)} × {g(PB0)})/({fd(p6, 6)} × {g(ER6)}) = {f(PAS_B)}, since p was built "
                "from both prices. (p is shown with 6 decimals; p = 0.7349 gives 54.1227, within "
                "rounding.)</p>"
            ),
            "criteria": [
                f"Equation {g(PA1)} × {k_txt} = p × P_A^S + (1 − p) × {g(PA0)}, using p from b).",
                f"P_A^S = {f(PAS)}, a value at completion. Reporting its present value {f(PAS_pv)} "
                f"(= {f(PAS)}/{k_txt}) is the error: the {g(PA0)} it is compared with is also a value "
                "in 6 months.",
                f"Votes for, because {f(PAS)} exceeds the stand-alone {g(PA0)}. The vote must follow "
                "from the number.",
                "(bonus) Notes that A's positive announcement return points the same way.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>One month after the announcement the vote result is published: A now trades at "
                f"NOK {fd(PA2, 2)} and B at NOK {fd(PB2, 2)}, with the deal still decided at the "
                "6-month date. What was the outcome of the vote? What do the prices tell you about "
                "the probability of completion? (3-4 sentences; no full calculation needed.)</p>"
            ),
            "solution": (
                "<p><b>Model answer.</b> The vote passed: a rejection would have ended the deal and "
                f"sent the prices back to {g(PA0)} and {g(PB0)}, but B rose towards the offer "
                f"instead. The offer is now worth {g(ER6)} × {g(PA2)} = {g(bud2)} against B's "
                f"{g(PB2)}, so the spread has shrunk from {g(spread1)} ({pc(spread1 / PB1)}) to "
                f"{g(spread2)} ({fd(100 * spread2 / PB2, 2)}%): the market now sees completion as "
                "much more likely than before. The small remaining spread prices the risk that is "
                "left, such as the competition authority. A's further rise fits a deal that adds value "
                "for A's shareholders.</p>"
                f"<p><b>Bonus calculation.</b> With 5 months left the factor is "
                f"{g(1 + rf6)}<sup>5/12</sup> = {f(k6d)}. The per-share version of b) gives "
                f"p = 1 − ({g(bud2)} − {g(PB2)}) × {f(k6d)}/({g(ER6)} × {g(PA0)} − {g(PB0)}) = "
                f"<b>{f(p6d)}</b>, up from {f(p6)}.</p>"
            ),
            "criteria": [
                f"Reads the outcome from the prices: approved, since a rejection would send them "
                f"back to {g(PA0)} and {g(PB0)}.",
                f"Spread falls from {g(spread1)} to {g(spread2)}: the market's probability of "
                "completion has risen sharply (close to 1); the small remaining spread prices the "
                "risk that is left, such as regulatory approval.",
                f"(bonus) Recomputes p with 5 months left: about {fd(p6d, 2)}.",
            ],
        },
    ],
}

SETT = {
    "id": "prove11",
    "kind": "mock",
    "label": "Mock exam 11",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format, with the exercise order of the autumn 2025 "
        "paper: two verbal exercises, then a share repurchase, a full valuation, a real option and "
        "a merger. New firms and numbers throughout. Not an official exam: the course has not "
        "checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations, three of them ending with a "
        "short verbal question.",
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
RYTME = {3: [3, 3, 4, 4, 4], 4: [2] * 9, 5: [3, 5, 5, 4, 3], 6: [4, 8, 4, 4]}
for ex in SETT["exercises"]:
    if ex["n"] in RYTME and [d["points"] for d in ex["parts"]] != RYTME[ex["n"]]:
        feil.append(f"oppgave {ex['n']}: rytmen avviker fra planen")
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
        feil.append(f"mulig norsk desimalkomma i {sti}: {re.search(r'.{20}\\d,\\d{1,2}(?!\\d).{0,5}', t)}")
    if "nan" in t.split() or "inf" in t.split():
        feil.append(f"nan/inf i {sti}")
    if t.count("<p>") != t.count("</p>") or t.count("<b>") != t.count("</b>"):
        feil.append(f"ubalanserte tagger i {sti}")
    if t.count("<table") != t.count("</table>") or t.count("<i>") != t.count("</i>"):
        feil.append(f"ubalansert tabell eller kursiv i {sti}")
# facts og note vises før start: ingen formler eller mekanismenavn som røper svar
for sti, t in alle_tekster({"note": SETT["note"], "facts": SETT["facts"]}):
    for ord_ in ("signal", "fallacy", "EPS", "timing", "undervalu", "transfer", "rational",
                 "terminal", "PV(TS)", "=", "reversib", "resale", "abandon", "volatil",
                 "hedg", "covenant", "whistle", "takeover", "vote", "long-short", "probabil"):
        if ord_.lower() in t.lower():
            feil.append(f"røpende ord «{ord_}» i {sti}")
# senere deloppgaver skal ikke røpe tidligere svar: ingen av hovedtallene i deloppgavetekstene
svar_tall = {"P0": P3_0, "Pg_naa": Pg_naa, "Pg_etter": Pg_etter, "VL0": VL[0], "rU": rU4,
             "wacc": w4, "NPV5a": NPV5a, "p_star": p_star, "p6": p6, "PAS": PAS}
for ex in SETT["exercises"]:
    for d in ex.get("parts", []):
        for navn, x in svar_tall.items():
            for vist in {g(x), f(x), pc(x)}:
                if re.search(r"(?<![\d.,])" + re.escape(vist) + r"(?![\d])", d["body"]):
                    if not (navn == "P0" and ex["n"] == 6):
                        feil.append(f"oppgave {ex['n']}{d['label']} røper {navn} = {vist}")


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


# Lengde målt som for H2025 (1 149 ord) og H2024 (1 027): oppgave- og deltekstene uten tagger
def _ord(h):
    return len(re.sub(r"&[a-z]+;", " ", re.sub(r"<[^>]+>", " ", h)).split())


ord_sett = sum(_ord(ex["body"]) + sum(_ord(d["body"]) for d in ex.get("parts", []))
               for ex in SETT["exercises"])
ren = " ".join(re.sub(r"<[^>]+>", " ", ex["body"]) + " " +
               " ".join(re.sub(r"<[^>]+>", " ", d["body"]) for d in ex.get("parts", []))
               for ex in SETT["exercises"])
spm = ren.count("?") + len(re.findall(r"\b(Find|Calculate|Explain|Give)\b", ren))
print(f"\nOrd i oppgaveteksten: {ord_sett} (md med overskrifter: {len(md_tekst.split())}); "
      f"spørsmål og «Find/Calculate/Explain/Give»: {spm}")
for ex in SETT["exercises"]:
    print(f"   oppgave {ex['n']}: {_ord(ex['body']) + sum(_ord(d['body']) for d in ex.get('parts', []))} ord")
if not 1000 <= ord_sett <= 1250:
    feil.append(f"oppgaveteksten er {ord_sett} ord (mål 1 000–1 250)")

if feil:
    print("\nFEIL, prove11.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
