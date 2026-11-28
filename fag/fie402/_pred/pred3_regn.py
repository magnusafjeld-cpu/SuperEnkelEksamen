"""Prediksjon 3 for FIE402: ny runde på det som gikk galt i prediksjon 1.

Kjør fra hvor som helst:  python3 -I fag/fie402/_pred/pred3_regn.py

Oppdraget står i docs/fie402-prediksjon-spek.md («Pred3 og videre»). Seks oppgaver,
10 · 10 · 20 · 20 · 20 · 20 poeng, 180 minutter:

- E1 (10) Governance, ny vinkel: et fiendtlig bud møtt med giftpille og forskjøvet styre i et
  biotekselskap der grunnleggeren er både CEO og styreleder. Fire spørsmål; poengene for
  argumentene krever at de knyttes til fakta i casen (der Magnus tapte i pred1 E1).
- E2 (10) Utbetaling verbalt (opptak 05, 12:17 og opptak 18, 39:15): de fire måtene å bruke
  fri kontantstrøm, vurdert og rangert for et modent japansk selskap med en engangsgevinst.
- E3 (20) IPO med uinformerte og informerte investorer (opptak 07, 1:05:12), sannsynligheter
  40/60: tildeling, avkastning ved en gitt kurs, nullpunktkurs, gjennomsnittlig
  førstedagsavkastning, kostnaden for grunnleggerne, hale om «gratis lunsj».
- E4 (20) NY RUNDE på fri kontantstrøm (pred1 E4 a): prosjekt over tre år der avskrivningen
  (90 i året) ikke er lik investeringen (270 ved t = 0, 0 senere), ΔNWC med frigjøring, r_U fra
  to sammenlignbare, NPV uten gjeld, fast låneplan med PV(TS) diskontert med r_D, APV, hale om
  hvilken rente og om WACC-metoden.
- E5 (20) NY RUNDE på ρ fra et omsatt verdipapir (pred1 E5 b): utvidelsesopsjon i en
  litiumgruve, ρ fra noterte litiumkoblede sertifikater som betaler i ti år fra t = 1, så S_u og
  S_d må ta med betalingen ved t = 1. Rekkefølgen er en annen enn i pred1: utvidelsen ved t = 1
  først (den starter t = 2 og hjelper ikke på konstruksjonen), så ρ, statisk NPV, opsjonen,
  likegyldig X og hale.
- E6 (20) M&A med aksjebytte og formelarkets formler: premie, y, NPV for partene, maks
  bytteforhold, endring i markedsverdi og implisitte synergier, kontant mot aksjer og en hale
  om verdiskaping, hvem som betaler for mye og motiv. (Først tenkt som ny runde på pred1 E6 d
  og e, men de var besvart og fikk fullt.)

Skriptet regner hvert tall, asserter sjekkene (også at hver kjent felle faller utenfor
toleransen og at riktige svar med avrundede mellomtall faller innenfor) og skriver pred3.json og
pred3_svar.json i samme mappe. Er noe galt, skrives ingenting.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "pred3.json")
UT_SVAR = os.path.join(HER, "pred3_svar.json")
SID = "pred3"


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def sg(x, d=4):
    """Med fortegn: +1.2345 eller −1.2345."""
    return ("+" if round(x, d) > 0 else "") + f(x, d)


def pc(x, d=4):
    """Andel som prosent: 0.078067 -> 7.8067%."""
    return f(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def P(*avsnitt):
    return "".join(f"<p>{a}</p>" for a in avsnitt)


def tabell(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = ""
    for rad in rader:
        celler = []
        for i, x in enumerate(rad):
            celler.append(f'<td class="n">{x}</td>' if i > 0 else f"<td>{x}</td>")
        r += "<tr>" + "".join(celler) + "</tr>"
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


def tall(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


def ann(n, r):
    """Annuitetsfaktor: n betalinger, første om ett år."""
    return (1 - (1 + r) ** -n) / r


SVAR = {}


def svar(n, label, d):
    SVAR[f"{SID}:{n}:{label}"] = d


# ================================================================== E3: IPO med informerte investorer
PG, VG, VB = 0.40, 26.0, 16.0          # sannsynlighet for godt firma, verdi per aksje
MG, MB = 8.0, 2.5                       # overtegning i gode og dårlige IPO-er
ORDRE = 1200.0                          # aksjer bestilt i hver IPO
P_B = 19.0                              # tegningskurs i (b)
NS = 3.5                                # millioner aksjer grunnleggerne selger
EV3 = PG * VG + (1 - PG) * VB
assert near(EV3, 20.0)
AG, AB = ORDRE / MG, ORDRE / MB         # tildelte aksjer
assert near(AG, 150) and near(AB, 480)
SH_G, SH_B = PG * AG, (1 - PG) * AB     # aksjer per gjennomsnittlig IPO
SH = SH_G + SH_B
VERDI = SH_G * VG + SH_B * VB
RET_B = VERDI / (SH * P_B) - 1
P_STAR = VERDI / SH
assert near(P_STAR, (5 * VG + 24 * VB) / 29)
assert P_STAR < P_B < EV3                # (b) er under rettferdig verdi, men over nullpunktet
assert RET_B < 0
assert near(SH_G / SH, 5 / 29)           # bare 5 av 29 tildelte aksjer er i et godt firma
RET_SNITT = PG * (VG / P_STAR - 1) + (1 - PG) * (VB / P_STAR - 1)
assert near(RET_SNITT, EV3 / P_STAR - 1)
RET_INF = VG / P_STAR - 1
RET_DAARLIG = VB / P_STAR - 1
assert near((SH_G * VG + SH_B * VB) / (SH * P_STAR) - 1, 0)   # uinformert går i null
GRUNN_G = NS * (P_STAR - VG)
GRUNN_B = NS * (P_STAR - VB)
KOST3 = -(PG * GRUNN_G + (1 - PG) * GRUNN_B)
assert near(KOST3, NS * (EV3 - P_STAR)) and GRUNN_G < 0 < GRUNN_B
# feller
RET_B_FELLE = EV3 / P_B - 1                         # tildelingen glemt
RET_B_FELLE2 = PG * (VG / P_B - 1) + (1 - PG) * (VB / P_B - 1)   # snitt per IPO, samme tall
assert near(RET_B_FELLE, RET_B_FELLE2)
P_STAR_FELLE = EV3                                  # rettferdig verdi som nullpunkt
P_STAR_FELLE_VEKT = (AG * VG + AB * VB) / (AG + AB)  # tildelingen uten sannsynlighetene
RET_SNITT_FELLE = EV3 / P_B - 1                      # kursen fra (b) i stedet for (c)

# ================================================================== E4: prosjekt, fast låneplan, APV
RF4, RM4 = 0.034, 0.089
MRP4 = RM4 - RF4
BE1, DV1 = 1.15, 0.25                   # Brenta: risikofri gjeld
BE2, DE2, RD2 = 1.45, 0.5, 0.046        # Garda
BU1 = (1 - DV1) * BE1 + DV1 * 0.0
RU1 = RF4 + BU1 * MRP4
BD2 = (RD2 - RF4) / MRP4
WD2 = DE2 / (1 + DE2)
BU2 = (1 - WD2) * BE2 + WD2 * BD2
RU2 = RF4 + BU2 * MRP4
RE2 = RF4 + BE2 * MRP4
assert near((1 - WD2) * RE2 + WD2 * RD2, RU2)        # samme r_U gjennom avkastninger
RU4 = (RU1 + RU2) / 2
BU4 = (BU1 + BU2) / 2
assert near(RU4, RF4 + BU4 * MRP4)                    # snitt av r_U = r_U av snitt-beta

KAPEX0, REV, KOST, AVS, TAU4 = 270.0, 205.0, 0.40, 90.0, 0.24
NWC = [15.0, 21.0, 21.0, 0.0]
assert near(AVS * 3, KAPEX0)                          # lineær avskrivning til null over tre år
EBITDA = REV * (1 - KOST)
EBIT = EBITDA - AVS
SKATT = TAU4 * EBIT
NOPAT = EBIT - SKATT
DNWC = [NWC[0]] + [NWC[t] - NWC[t - 1] for t in (1, 2, 3)]
FCF = [-KAPEX0 - NWC[0]] + [NOPAT + AVS - DNWC[t] for t in (1, 2, 3)]
assert near(EBITDA, 123) and near(EBIT, 33) and near(NOPAT, 25.08)
assert [round(x, 6) for x in FCF] == [-285.0, 109.08, 115.08, 136.08]
for t in (1, 2, 3):                                   # EBITDA-veien: EBITDA(1 − τ) + τ·Dep
    assert near(EBITDA * (1 - TAU4) + TAU4 * AVS - DNWC[t], FCF[t])
SKJOLD_AVS = TAU4 * AVS
# feller i (a)
FCF_FELLE_EBITDA = [EBITDA * (1 - TAU4) - DNWC[t] for t in (1, 2, 3)]   # Magnus' formel fra pred1
FCF_FELLE_UTENAVS = [NOPAT - DNWC[t] for t in (1, 2, 3)]                # Dep strøket mot CapEx
FCF_FELLE_NIVAA = [NOPAT + AVS - NWC[t] for t in (1, 2, 3)]             # nivået i stedet for deltaen
FCF0_FELLE = -KAPEX0                                                    # arbeidskapitalen glemt


def vu(ru, fcf=FCF):
    return sum(fcf[t] / (1 + ru) ** t for t in (1, 2, 3))


VU4 = vu(RU4)
NPV_U = VU4 + FCF[0]
assert 0 < NPV_U < 25
VU_T = [VU4]                                           # V^U ved t = 1 og 2 (til D/V-kommentaren)
VU_T.append(FCF[2] / (1 + RU4) + FCF[3] / (1 + RU4) ** 2)
VU_T.append(FCF[3] / (1 + RU4))
assert near(VU_T[0], (FCF[1] + VU_T[1]) / (1 + RU4))

LAAN0, RD4 = 150.0, 0.05
GJELD = [150.0, 100.0, 50.0, 0.0]
assert near(GJELD[0], LAAN0) and all(near(GJELD[t - 1] - GJELD[t], 50) for t in (1, 2, 3))
TS = [None] + [TAU4 * RD4 * GJELD[t - 1] for t in (1, 2, 3)]
PVTS = sum(TS[t] / (1 + RD4) ** t for t in (1, 2, 3))
NPV_APV = NPV_U + PVTS
PVTS_T = [PVTS, TS[2] / (1 + RD4) + TS[3] / (1 + RD4) ** 2, TS[3] / (1 + RD4)]
VL_T = [VU_T[t] + PVTS_T[t] for t in range(3)]
DV_T = [GJELD[t] / VL_T[t] for t in range(3)]
assert DV_T[0] > DV_T[1] > DV_T[2]                     # gjeldsgraden faller hvert år
# feller i (d)
PVTS_FELLE_RU = sum(TS[t] / (1 + RU4) ** t for t in (1, 2, 3))
PVTS_FELLE_TAUD = TAU4 * LAAN0
PVTS_FELLE_RENTE = sum(RD4 * GJELD[t - 1] / (1 + RD4) ** t for t in (1, 2, 3))
NPV_APV_FELLE_RU = NPV_U + PVTS_FELLE_RU
# feller i (b)
RU_FELLE_BD0 = (RU1 + RF4 + (1 - WD2) * BE2 * MRP4) / 2           # β_D = 0 for Garda
RU_FELLE_DE = (RU1 + RF4 + ((1 - DE2) * BE2 + DE2 * BD2) * MRP4) / 2   # D/E brukt som D/V
RU_FELLE_RM = (RF4 + BU1 * RM4 + RF4 + BU2 * RM4) / 2              # E[R_M] i stedet for premien


def bu_perm(dv, be, bd):
    """β_U med D(1 − τ) i vektene (permanent gjeld): gjelder ikke her."""
    d_ = dv * (1 - TAU4)
    return ((1 - dv) * be + d_ * bd) / ((1 - dv) + d_)


RU_FELLE_PERM = (RF4 + bu_perm(DV1, BE1, 0.0) * MRP4 + RF4 + bu_perm(WD2, BE2, BD2) * MRP4) / 2
# annuitetslån med like store terminbeløp (fjernet tvetydighet, men sjekkes)
TERMIN = LAAN0 / ann(3, RD4)
SALDO_ANN = [LAAN0, LAAN0 * (1 + RD4) - TERMIN]
SALDO_ANN.append(SALDO_ANN[1] * (1 + RD4) - TERMIN)
PVTS_FELLE_ANN = sum(TAU4 * RD4 * SALDO_ANN[t - 1] / (1 + RD4) ** t for t in (1, 2, 3))
# følgefeil fra Magnus' FCF-formel (vises i løsningen)
NPV_U_FELLE = vu(RU4, [FCF[0]] + FCF_FELLE_EBITDA) + FCF[0]
assert NPV_U_FELLE < 0 < NPV_U                         # fellen snur beslutningen
# avrundede mellomtall
RU4_RUND = round(RU4, 4)
NPV_U_RUND = vu(RU4_RUND) + FCF[0]
PVTS_RUND = sum(round(TS[t], 4) / round((1 + RD4) ** t, 4) for t in (1, 2, 3))
NPV_APV_RUND = NPV_U_RUND + PVTS_RUND

# ================================================================== E5: utvidelsesopsjon, ρ fra et sertifikat
R5 = 0.06
A9, A10 = ann(9, R5), ann(10, R5)
assert near(A10, (1 + A9) / (1 + R5))
I5, CU, CD = 280.0, 60.0, 20.0
K5, ANDEL = 150.0, 0.5
S0, NU, ND = 23.50, 5.00, 2.00
# (a) utvidelsen ved t = 1: 50 % mer fra år 2 til år 10
UTV_U = ANDEL * CU * A9
UTV_D = ANDEL * CD * A9
NPV1_U = UTV_U - K5
NPV1_D = UTV_D - K5
assert NPV1_U > 0 > NPV1_D
NPV1_FELLE_A10 = ANDEL * CU * A10 - K5                 # ti betalinger
NPV1_FELLE_MED1 = ANDEL * CU * (1 + A9) - K5           # betaling ved t = 1 tatt med
# (b) ρ
SU, SD = NU * (1 + A9), ND * (1 + A9)
RHO = ((1 + R5) * S0 - SD) / (SU - SD)
assert 0 < RHO < 1
assert near((RHO * SU + (1 - RHO) * SD) / (1 + R5), S0)          # identitet
assert near(S0, A10 * (RHO * NU + (1 - RHO) * ND))                # veien ved t = 0
RHO_FELLE = ((1 + R5) * S0 - ND * A9) / (NU * A9 - ND * A9)     # betalingen ved t = 1 glemt
RHO_FELLE2 = (S0 - ND * A9) / (NU * A9 - ND * A9)               # og uten (1 + r_f)
assert 0 < RHO_FELLE < 1 and 0 < RHO_FELLE2 < 1
RHO_RUND = round(RHO, 4)
# (c) gruven uten utvidelse
VG_U, VG_D = CU * (1 + A9), CD * (1 + A9)
PV_GRUVE = (RHO * VG_U + (1 - RHO) * VG_D) / (1 + R5)
assert near(PV_GRUVE, A10 * (RHO * CU + (1 - RHO) * CD))
NPV_STAT = PV_GRUVE - I5
assert NPV_STAT < 0
NPV_STAT_FELLE_HALV = A10 * (CU + CD) / 2 - I5                     # 50/50
NPV_STAT_FELLE_EKS = (RHO * CU * A9 + (1 - RHO) * CD * A9) / (1 + R5) - I5   # uten t = 1
NPV_STAT_FELLE_RHO = A10 * (RHO_FELLE * CU + (1 - RHO_FELLE) * CD) - I5     # fellen fra (b)
assert NPV_STAT_FELLE_HALV > 0                                       # 50/50 snur fortegnet
# (d) med opsjonen


def med_opsjon(rho, k=K5):
    opsjon = (rho * max(UTV_U - k, 0) + (1 - rho) * max(UTV_D - k, 0)) / (1 + R5)
    stat = A10 * (rho * CU + (1 - rho) * CD) - I5
    return stat, opsjon, stat + opsjon


_, OPSJON, NPV_MED = med_opsjon(RHO)
assert NPV_MED > 0 > NPV_STAT                          # opsjonen snur beslutningen
FORPLIKT = (RHO * NPV1_U + (1 - RHO) * NPV1_D) / (1 + R5)    # utvide i begge tilstander
assert FORPLIKT < 0
NPV_MED_FELLE_BEGGE = NPV_STAT + FORPLIKT
# (e) likegyldig X = kontantstrømmen i den lave tilstanden (med opsjonen). Veldefinert for
# enhver ρ i (0, 1): NPV er lineær i X med positivt stigningstall A10(1 − ρ), og opsjonen
# avhenger ikke av X så lenge linjen ikke legges til i den lave tilstanden.
X_GRENSE = K5 / (ANDEL * A9)                            # over dette legges linjen til i lav


def x_likegyldig(rho, med=True):
    ops = med_opsjon(rho)[1] if med else 0.0
    x = (I5 - ops - A10 * rho * CU) / (A10 * (1 - rho))
    assert x < X_GRENSE                                  # lav tilstand avvises fortsatt
    if med:                                              # NPV med opsjonen er 0 i X
        assert near(A10 * (rho * CU + (1 - rho) * x) - I5 + ops, 0, 1e-9)
    return x


X_STAR = x_likegyldig(RHO)
assert near(X_STAR, CD - NPV_MED / (A10 * (1 - RHO)))   # snarveien fra (d)
assert 0 < X_STAR < CD
X_FELLE_UTEN = x_likegyldig(RHO, med=False)             # opsjonen glemt
X_FELLE_RHO = x_likegyldig(RHO_FELLE)                   # følgefeil fra fellen i (b)
X_FELLE_RHO2 = x_likegyldig(RHO_FELLE2)
X_RUND = x_likegyldig(RHO_RUND)
# lav volatilitet (halen): begge tilstander nær snittet 40
UTV_SNITT = ANDEL * (CU + CD) / 2 * A9
assert UTV_SNITT < K5

# ================================================================== E6: aksjebytte
NA, PA0, NT, PT0 = 150.0, 36.00, 66.0, 25.00
ER, S6 = 0.86, 470.0
PA1 = 34.50
PT1 = round(ER * PA1, 2)
assert near(PT1, ER * PA1)                              # målet handles til budet: avtalen sikker
A6, T6 = NA * PA0, NT * PT0
TILBUD = ER * PA0
PREMIE = TILBUD / PT0 - 1
X6 = ER * NT
Y6 = X6 / (NA + X6)
V6 = A6 + T6 + S6
NPVA = (1 - Y6) * V6 - A6
NPVT = Y6 * V6 - T6
assert near(NPVA + NPVT, S6)
ER_MAX = (T6 + S6) / A6 * NA / NT
assert near(ER_MAX, PT0 / PA0 * (1 + S6 / T6)) and ER < ER_MAX
assert near((NA / (NA + ER_MAX * NT)) * V6 - A6, 0, 1e-9)       # NPV_A = 0 ved maks
DVA = NA * (PA1 - PA0)
DVT = NT * (PT1 - PT0)
SM = DVA + DVT
assert DVA < 0 < SM < DVT
assert near((NA + X6) * PA1, A6 + T6 + SM)              # kombinert verdi = A + T + S
assert near((1 - Y6) * (A6 + T6 + SM) - A6, DVA)         # NPV_A ved markedets S = ΔV_A
KONTANT = 30.00
NPVA_KONT = SM - (KONTANT * NT - T6)
NPVA_AKS = (1 - Y6) * (A6 + T6 + SM) - A6
NPVT_KONT = KONTANT * NT - T6
NPVT_AKS = Y6 * (A6 + T6 + SM) - T6
assert NPVA_KONT < NPVA_AKS < 0
ER_MAX_SM = (T6 + SM) / A6 * NA / NT
assert ER_MAX_SM < ER                                   # med markedets synergier betaler A for mye
NPVA_KONT_LEDELSE = S6 - (KONTANT * NT - T6)
# feller
Y6_FELLE = X6 / NA                                      # andel av de gamle aksjene
NPVA_FELLE_Y = (1 - Y6_FELLE) * V6 - A6
ER_MAX_FELLE = PT0 / PA0                                # uten synergier
PREMIE_FELLE = TILBUD / PT1 - 1                         # premie over dagens kurs

# ================================================================== tekstene
# ---------------------------------------------------------------- E1
e1 = {
    "n": 1,
    "title": "Governance",
    "points": 10,
    "topic": "Corporate governance",
    "chapters": [26, 27],
    "merke": "Ny vinkel: et fiendtlig bud møtt med forsvarstiltak · governance som teori 90 %, "
             "denne vinkelen 15 %",
    "body": P(
        "Tallowood Therapeutics is a widely held Delaware biotech company listed on Nasdaq. Its "
        "founder is both CEO and chair of a board of 13. Six of the other directors are former "
        "executives or old friends of the founder. Directors serve staggered "
        "three-year terms. The share price has fallen 40% in two years; Tallowood's only "
        "late-stage drug is in a trial that reports in 18 months.",
        "A larger rival has made a hostile cash bid at a 25% premium; the same night the board "
        "adopted a poison pill. Your pension fund owns 7% of Tallowood.",
        "Answer in 2–3 sentences each, using the facts about Tallowood.",
    ) + (
        "<ol><li>How do the poison pill and the staggered board together block or delay the "
        "bid? (2 points)</li>"
        "<li>Give one argument that the defences serve Tallowood's shareholders here. "
        "(3 points)</li>"
        "<li>Give one argument that they harm them here. (3 points)</li>"
        "<li>What would you push for as a 7% owner to keep the benefit from 2 but limit the "
        "harm from 3? (2 points)</li></ol>"
    ),
    "solution": P(
        "<b>Model answer (2–3 sentences per question).</b>",
        "<b>1. How the two defences work together (2 points).</b> Once a bidder buys more than "
        "a threshold, the poison pill lets every other shareholder buy new shares at a deep "
        "discount, so buying control without the board's consent becomes prohibitively "
        "expensive and the bidder is forced to negotiate (recording 17, 29:47 to 30:22). The "
        "usual way around a pill is to win a proxy fight and let a new board remove it, but with "
        "staggered terms the rival can win only four or five of the 13 seats at one annual "
        "meeting and needs two meetings, more than a year, to control the board (recording 17, "
        "32:58 to 33:50).",
        "<b>2. An argument that the defences serve the shareholders (3 points).</b> Tallowood's "
        "value hangs on a trial that reports in 18 months, so the 40% fall may reflect "
        "uncertainty the market cannot yet resolve; the rival may be trying to buy the drug "
        "cheaply before the results are known. The pill buys time and bargaining power: the "
        "board can wait for the data, look for other bidders and push the price up, while "
        "owners who believe in the long-run plan keep the upside, as in the lecture's firm "
        "seven years into a ten-year plan to cure cancer (recording 17, 1:08:27 to 1:10:26).",
        "<b>3. An argument that they harm the shareholders (3 points).</b> The board is captive: "
        "the founder chairs the body that should monitor the founder as CEO, while half of the "
        "other directors are former executives or friends, so the defences may protect the "
        "founder's job rather than the owners' wealth (entrenchment; recording 17, 32:40 and "
        "40:41). The 40% fall may also reflect weak management. Blocking a 25% premium "
        "without letting the owners decide removes the outside discipline of the market for "
        "corporate control; the market punished Ford's pill when it was seen as entrenching "
        "management (recording 17, 1:15:33).",
        "<b>4. What to push for (2 points).</b> Ask that the pill be put to a shareholder vote "
        "or given a sunset clause that ends it soon after the trial reports. A committee of "
        "independent directors with its own advisers should evaluate the bid. Over time, "
        "push to declassify the board and to split the roles of CEO and chair, so the defences "
        "can be used to bargain for a higher price but not to block every bid.",
        "<b>Also accepted.</b> For 2: time to find a white knight or run an auction; the bid "
        "exploits temporary undervaluation; the pill protects a research team that a buyer "
        "might break up. For 3: the founder's pay and private benefits depend on staying; a "
        "captive board will not weigh the bid for the owners; a staggered board makes it hard "
        "even for a 7% holder to change the board. For 4: vote against the directors up for "
        "election and rally the other institutions; a shareholder proposal to redeem the pill "
        "or to declassify the board; proxy access in the bylaws to nominate independent "
        "directors; an independent chair and a board of about 7 to 11 with a majority of "
        "independent directors.",
    ),
    "criteria": [
        "Question 1 (2 points): the pill makes buying control without the board's consent "
        "prohibitively expensive, so the bidder must negotiate; the staggered board delays "
        "removing the pill through a proxy fight to at least two annual meetings. 1 point each.",
        "Questions 2 and 3 (3 points each): 1 for the argument and 2 for tying it to "
        "Tallowood's facts. An argument that would read the same for any firm («defences "
        "entrench managers», «defences give bargaining power») earns at most 1.",
        "Facts that earn the situation points. For 2: the trial that reports in 18 months and "
        "the 40% fall (temporary undervaluation, time and bargaining power). For 3: the founder "
        "as CEO and chair, the six insider or friendly directors, the staggered board and the "
        "25% premium the owners are not allowed to consider (entrenchment, a captive board).",
        "Question 4 (2 points): a concrete measure that keeps the bargaining benefit but limits "
        "entrenchment (a shareholder vote on the pill, a sunset clause, an independent committee "
        "that evaluates the bid, declassifying the board, splitting CEO and chair), with the "
        "reason it fits. «Remove the pill» alone earns 1, since it also removes the benefit "
        "from 2.",
        "Board size: an argument for about 7 to 11 directors is accepted; «a smaller board works "
        "better» alone is not.",
        "Each answer is 2–3 sentences. Length is not rewarded.",
    ],
}
svar(1, "", {"type": "tekst"})

# ---------------------------------------------------------------- E2
e2 = {
    "n": 2,
    "title": "Payout Policy",
    "points": 10,
    "topic": "Payout policy",
    "chapters": [11, 15, 16],
    "merke": "Teorispørsmålet varslet i forelesning 5 (12:17) og i wrap-up (39:15) · utbetaling "
             "verbalt 35 %",
    "body": P(
        "Shirakaba Bearings, a Tokyo-listed bearings maker with little debt, is in a mature "
        "market: flat sales, a stable free cash flow of about JPY 12 billion a year and no "
        "positive-NPV projects in its industry. This year it also sold an old factory site for "
        "a one-off JPY 60 billion. The CEO wants to use the cash to buy a restaurant chain “to "
        "find growth”.",
        "Name the four ways a firm can use its free cash flow and explain in 1–2 sentences "
        "whether each suits Shirakaba (2 points each). Then say which use suits the stable JPY "
        "12 billion and which suits the one-off 60 billion, with a reason (2 points).",
    ),
    "solution": P(
        "<b>1. Invest the cash, if there are good investment opportunities.</b> Investing "
        "creates value only in positive-NPV projects, which Shirakaba lacks in its own industry "
        "(recording 05, 14:34 to 14:51). A restaurant chain gives its owners diversification "
        "they could buy themselves; a cash pile without projects invites empire building "
        "(recording 18, 40:47).",
        "<b>2. Buy back shares.</b> A buyback pays only the owners who want to sell and sets no "
        "expectation for next year, so it suits the one-off JPY 60 billion. It can also signal "
        "that management sees the shares as undervalued (recording 05, 1:27:11); taxes matter "
        "little, since dividends and capital gains are taxed about alike and holders who do not "
        "sell only defer their tax (recording 05, 1:14:36 to 1:16:12).",
        "<b>3. Pay a dividend.</b> Dividends are sticky: a cut sends a strongly negative signal, "
        "so a firm should raise its regular dividend only with cash flow it expects to keep "
        "(recording 05, 1:22:15 to 1:24:13). Shirakaba's stable JPY 12 billion a year suits a "
        "higher regular dividend; the one-off gain does not, unless it is paid as a clearly "
        "labelled special dividend.",
        "<b>4. Keep the cash.</b> Cash is a safety cushion and spares the firm costly outside "
        "financing for future projects (recording 05, 1:19:22 to 1:20:54). But with little "
        "debt, stable cash flow and no projects, a large pile mainly gives the CEO room for "
        "wasteful spending such as the restaurant chain (recording 05, 1:21:04), so Shirakaba "
        "should keep only a buffer.",
        "<b>Which use for which cash (2 points).</b> The stable JPY 12 billion a year suits a "
        "higher regular dividend, because a sticky dividend should rest on cash flow the firm "
        "expects to keep. The one-off JPY 60 billion suits a buyback (or a special dividend), "
        "because it should not create an expectation that it will be repeated; neither amount "
        "should go to the restaurant chain, since there are no positive-NPV projects.",
        "<b>Also accepted.</b> A steady buyback programme for the stable cash flow, if the "
        "answer argues for flexibility; a special dividend for the one-off; keeping part of the "
        "one-off if the answer names a concrete need (debt that matures, a downturn in demand). "
        "In a perfect capital market the choice would not matter (MM); the arguments above are "
        "the frictions.",
    ),
    "criteria": [
        "Four ways, 2 points each: 1 for naming it with its mechanism and 1 for whether it suits "
        "Shirakaba, using the facts (mature, no positive-NPV projects, stable FCF of JPY 12 "
        "billion, a one-off JPY 60 billion, little debt, the restaurant chain).",
        "Invest: the point needs the condition «if there are good investment opportunities» "
        "(recording 05, 14:43). Here there are none; the restaurant chain points to empire "
        "building or to diversification the owners can do themselves.",
        "Dividend: stickiness, so the regular dividend follows the stable cash flow and not the "
        "one-off. Buyback: flexible, no commitment, a possible undervaluation signal; it fits "
        "the one-off.",
        "Keep the cash: both the benefit (a buffer, no costly outside financing) and the cost "
        "(agency cost of free cash flow, empire building) are needed for the point.",
        "Which use for which cash (2 points): a use for the stable JPY 12 billion and one for the "
        "one-off JPY 60 billion, each with a reason (stickiness, flexibility, no positive-NPV "
        "projects). The natural answer is a regular dividend for the stable flow and a buyback "
        "or special dividend for the one-off; any alternative with a reason based on "
        "Shirakaba's facts is accepted. Putting either amount into the restaurant chain without "
        "addressing the lack of positive-NPV projects earns at most 1.",
        "Taxes are not the main argument: «dividends are taxed more» is not accepted as a "
        "general claim. Mentioning that holders who do not sell defer their tax is fine.",
    ],
}
svar(2, "", {"type": "tekst"})

# ---------------------------------------------------------------- E3
e3_body = P(
    "In many small Spanish IPOs the founders sell existing shares at an offer price set by "
    "the underwriter."
    f" Each firm is good with probability {pc(PG, 0)}, independently of the others. "
    f"A share is worth EUR {f(VG, 2)} in a good firm and EUR {f(VB, 2)} in a bad one, which "
    "becomes known at the end of the first trading day.",
    f"You cannot tell good firms from bad, so you order {f(ORDRE, 0)} shares in every IPO. An "
    "IPO oversubscribed k times fills every order at 1/k. Ignore discounting over the first "
    "day.",
)

e3a = {
    "label": "a", "points": 3,
    "body": P("If nobody knew which firms are good, all IPOs would attract the same demand. At "
              "what offer price would you break even? What would the average first-day return "
              "be?"),
    "solution": P(
        "With the same demand everywhere, every order is filled in the same proportion, so the "
        "shares you receive are spread over good and bad firms like the IPOs themselves.",
        f"Break-even price = expected value per share = {f(PG, 2)} × {f(VG, 2)} + {f(1 - PG, 2)} "
        f"× {f(VB, 2)} = {f(PG * VG, 2)} + {f((1 - PG) * VB, 2)} = <b>EUR {f(EV3, 2)}</b>.",
        f"Average first-day return at {f(EV3, 2)}: good firms gain {pc(VG / EV3 - 1, 0)} and bad "
        f"firms lose {pc(1 - VB / EV3, 0)}, so {f(PG, 2)} × {pc(VG / EV3 - 1, 0)} − "
        f"{f(1 - PG, 2)} × {pc(1 - VB / EV3, 0)} = <b>0%</b>. This is the lecture's baseline "
        "(recording 07, 1:07:05 to 1:08:50).",
    ),
    "criteria": [
        f"Break-even price = expected value = 0.4 × 26 + 0.6 × 16 = {f(EV3, 2)}.",
        "Average first-day return at that price = 0%.",
        "Uses the 40/60 probabilities, not 50/50.",
    ],
}
svar(3, "a", {"type": "tall", "tall": [
    tall("Break-even offer price", EV3, "EUR"),
    tall("Average first-day return", 0.0, "%", abs=0.05),
]})

e3b = {
    "label": "b", "points": 4,
    "body": P(f"Now informed investors order only in good IPOs, so good IPOs are oversubscribed "
              f"{f(MG, 0)} times and bad ones {f(MB, 1)} times. At an offer price of EUR "
              f"{f(P_B, 2)}, what is your average return on the money you invest?"),
    "solution": P(
        f"<b>Step 1. Allocation.</b> Good IPO: {f(ORDRE, 0)}/{f(MG, 0)} = <b>{f(AG, 0)} "
        f"shares</b>. Bad IPO: {f(ORDRE, 0)}/{f(MB, 1)} = <b>{f(AB, 0)} shares</b>.",
        f"<b>Step 2. Weight by what you actually get.</b> Per average IPO you receive "
        f"{f(PG, 2)} × {f(AG, 0)} = {f(SH_G, 0)} shares in good firms and {f(1 - PG, 2)} × "
        f"{f(AB, 0)} = {f(SH_B, 0)} in bad firms, {f(SH, 0)} in all. "
        + tabell(["Per average IPO", "Shares", "Value at day end (EUR)", "Cost at 19.00 (EUR)"], [
            ["Good firms", f(SH_G, 0), f(SH_G * VG, 2), f(SH_G * P_B, 2)],
            ["Bad firms", f(SH_B, 0), f(SH_B * VB, 2), f(SH_B * P_B, 2)],
            ["<b>Total</b>", f(SH, 0), f(VERDI, 2), f(SH * P_B, 2)],
        ]),
        f"Average return = {f(VERDI, 2)}/{f(SH * P_B, 2)} − 1 = <b>{pc(RET_B)}</b>.",
        f"<b>Why it is negative although {f(P_B, 2)} &lt; {f(EV3, 2)}.</b> You get many shares "
        f"where nobody else wants them and few where the informed investors crowd in: only "
        f"{f(SH_G, 0)} of every {f(SH, 0)} shares you receive are in good firms, although "
        f"{pc(PG, 0)} of the IPOs are good. Ignoring the allocation gives {f(EV3, 2)}/{f(P_B, 2)} "
        f"− 1 = {pc(RET_B_FELLE)}, which is wrong (recording 07, 1:11:02 to 1:13:38).",
    ),
    "criteria": [
        f"Allocation: {f(ORDRE, 0)}/{f(MG, 0)} = {f(AG, 0)} in a good IPO and {f(ORDRE, 0)}/{f(MB, 1)} = "
        f"{f(AB, 0)} in a bad IPO.",
        "Weights the values by the shares actually received (and the probabilities): "
        f"value {f(VERDI, 2)} against cost {f(SH * P_B, 2)} per average IPO.",
        f"Average return = {pc(RET_B)}. A per-IPO average that ignores the allocation "
        f"({pc(RET_B_FELLE, 2)}) is the trap.",
        "Any equivalent count (for example per 100 IPOs) is accepted.",
    ],
}
svar(3, "b", {"type": "tall", "tall": [
    tall("Average return on the money invested", 100 * RET_B, "%"),
], "merknad": f"Fellen uten tildeling ({100 * RET_B_FELLE:.4f} %) har motsatt fortegn og avvises."})

e3c = {
    "label": "c", "points": 4,
    "body": P("With the same oversubscription as in (b), what is the highest offer price at "
              "which you still break even?"),
    "solution": P(
        "<b>Step 1. Break-even condition.</b> At the offer price P the money paid must equal the "
        f"value received: {f(SH, 0)} × P = {f(SH_G, 0)} × {f(VG, 2)} + {f(SH_B, 0)} × "
        f"{f(VB, 2)} = {f(VERDI, 2)}.",
        f"<b>Step 2. Solve.</b> P* = {f(VERDI, 2)}/{f(SH, 0)} = <b>EUR {f(P_STAR)}</b>. It is the "
        f"value of an average share you receive: ({f(SH_G, 0)}/{f(SH, 0)}) × {f(VG, 2)} + "
        f"({f(SH_B, 0)}/{f(SH, 0)}) × {f(VB, 2)}.",
        f"<b>Check.</b> At {f(P_STAR)} you pay {f(SH, 0)} × {f(P_STAR)} = {f(SH * P_STAR, 2)} "
        f"and receive {f(VERDI, 2)}: a return of 0% ✓. The fair value {f(EV3, 2)} is not the "
        "answer: at that price an uninformed investor loses and stays away (recording 07, 1:14:09 "
        "to 1:15:12).",
    ),
    "criteria": [
        "Sets the allocation-weighted value equal to the price paid (or the return from (b) "
        "equal to zero).",
        f"P* = {f(VERDI, 2)}/{f(SH, 0)} = {f(P_STAR)}.",
        f"The fair value {f(EV3, 2)} ignores the allocation and is the trap; so is "
        f"({f(AG, 0)} × 26 + {f(AB, 0)} × 16)/{f(AG + AB, 0)} = {f(P_STAR_FELLE_VEKT)}, which "
        "drops the probabilities.",
    ],
}
svar(3, "c", {"type": "tall", "tall": [
    tall("Break-even offer price", P_STAR, "EUR"),
], "merknad": f"Fellene {EV3:.4f} (rettferdig verdi) og {P_STAR_FELLE_VEKT:.4f} "
              "(tildeling uten sannsynligheter) avvises."})

e3d = {
    "label": "d", "points": 3,
    "body": P("Every IPO is priced at your answer to (c). What is the average first-day return "
              "across IPOs? What first-day return do the informed investors earn on the IPOs "
              "they buy?"),
    "solution": P(
        f"<b>Across IPOs</b> (each IPO counts once): good firms rise {f(VG, 2)}/{f(P_STAR)} − 1 = "
        f"{pc(RET_INF)} and bad firms fall {f(VB, 2)}/{f(P_STAR)} − 1 = {pc(RET_DAARLIG)}. "
        f"Average: {f(PG, 2)} × {pc(RET_INF)} + {f(1 - PG, 2)} × ({pc(RET_DAARLIG)}) = "
        f"<b>{pc(RET_SNITT)}</b>, the same as {f(EV3, 2)}/{f(P_STAR)} − 1.",
        f"<b>Informed investors</b> buy only good IPOs, so each IPO they buy rises "
        f"<b>{pc(RET_INF)}</b>. The uninformed earn 0% by construction.",
        "So the statistics show large average underpricing while the uninformed investor, who "
        "buys everything, earns nothing (recording 07, 1:15:12 to 1:16:51).",
    ),
    "criteria": [
        f"Average first-day return across IPOs = {f(EV3, 2)}/{f(P_STAR)} − 1 = {pc(RET_SNITT)} "
        "(equally weighted IPOs, not weighted by your allocation).",
        f"Informed investors, on the good IPOs they buy: {f(VG, 2)}/{f(P_STAR)} − 1 = "
        f"{pc(RET_INF)}. Averaging it over all IPOs ({pc(PG * RET_INF)}) answers a different "
        "question.",
        f"Using the price {f(P_B, 2)} from (b) instead of (c) gives {pc(RET_SNITT_FELLE)} and is "
        "wrong.",
    ],
}
svar(3, "d", {"type": "tall", "tall": [
    tall("Average first-day return across IPOs", 100 * RET_SNITT, "%"),
    tall("First-day return of informed investors on the IPOs they buy", 100 * RET_INF, "%"),
]})

e3e = {
    "label": "e", "points": 3,
    "body": P(f"Each firm's founders sell {f(NS, 1)} million shares at that price. How much do the "
              "founders of a good and of a bad firm gain or lose against the true value? What is "
              "their expected cost per IPO?"),
    "solution": P(
        f"Good firm: {f(NS, 1)} × ({f(P_STAR)} − {f(VG, 2)}) = <b>EUR {f(GRUNN_G)} million</b> "
        "(a loss).",
        f"Bad firm: {f(NS, 1)} × ({f(P_STAR)} − {f(VB, 2)}) = <b>EUR {sg(GRUNN_B)} million</b> "
        "(a gain: the shares are sold above their value).",
        f"Expected cost per IPO: {f(PG, 2)} × {f(-GRUNN_G)} − {f(1 - PG, 2)} × {f(GRUNN_B)} = "
        f"<b>EUR {f(KOST3)} million</b>, the same as {f(NS, 1)} × ({f(EV3, 2)} − {f(P_STAR)}). "
        "The cost of keeping the uninformed investors in the market falls on the founders, "
        "mostly on those of good firms.",
    ),
    "criteria": [
        f"Good firm: {f(NS, 1)} × ({f(P_STAR)} − 26) = {f(GRUNN_G)}; bad firm: {f(NS, 1)} × ({f(P_STAR)} − 16) = "
        f"{sg(GRUNN_B)}.",
        f"Expected cost = {f(NS, 1)} × (20 − {f(P_STAR)}) = {f(KOST3)} million per IPO.",
        f"The sign is read from the wording: a cost of {f(KOST3, 2)} or a change of {f(-KOST3, 2)} are both "
        "accepted.",
    ],
}
svar(3, "e", {"type": "tall", "tall": [
    tall("Gain (+) or loss (−) for the founders of a good firm", GRUNN_G, "EUR m"),
    tall("Gain (+) or loss (−) for the founders of a bad firm", GRUNN_B, "EUR m"),
    tall("Expected cost per IPO", KOST3, "EUR m", alt=[-KOST3]),
], "merknad": "alt: kostnaden skrevet som negativ endring godtas."})

e3f = {
    "label": "f", "points": 3,
    "body": P("A newspaper sees the average return from (d) and concludes that buying every IPO "
              "is a free lunch and that underwriters cheat the founders. Comment briefly."),
    "solution": P(
        "<b>No free lunch.</b> An uninformed investor who buys in every IPO earns 0% on average, "
        "because the allocation is tilted towards the bad IPOs: the investor gets two fifths of "
        "the order in the IPOs the informed avoid and only an eighth in the good ones (the "
        f"winner's curse). The {pc(RET_SNITT, 2)} average is earned only by those who get large "
        f"allocations in good IPOs, the informed investors ({pc(RET_INF, 2)}).",
        "<b>Not cheating.</b> The underpricing is the price of keeping uninformed investors in "
        "the market. At a fair price they would lose and stay away; the IPOs could not be "
        "sold (recording 07, 1:13:38 to 1:18:15). The founders pay this cost, but it is a "
        "consequence of asymmetric information, not of the underwriter favouring friends.",
    ),
    "criteria": [
        "Uninformed investors earn about 0% because they receive more shares in bad IPOs and fewer "
        "in good ones (allocation, winner's curse); the name is not required.",
        "The average first-day return goes to the informed investors, who buy only good IPOs.",
        "Underpricing keeps the uninformed in the market and is a cost for the founders, not "
        "evidence of cheating. A mechanism is needed; «IPOs are risky» alone earns nothing.",
    ],
}
svar(3, "f", {"type": "tekst"})

e3 = {
    "n": 3, "title": "IPO", "points": 20, "topic": "Initial public offerings",
    "chapters": [12, 14],
    "merke": "Som IPO-eksemplet i forelesning 7 (1:05:12), med sannsynligheter som ikke er "
             "50/50 · IPO 25 %",
    "body": e3_body, "parts": [e3a, e3b, e3c, e3d, e3e, e3f],
}

# ---------------------------------------------------------------- E4
e4_body = P(
    "Orobica Pasta is evaluating a production line for a three-year contract. "
    f"The line costs EUR {f(KAPEX0, 0)} million today (t = 0), is depreciated straight-line to "
    "zero over three years for tax and has no value after Year 3; no other capital expenditure "
    f"is needed. Revenue is EUR {f(REV, 0)} million a year in Years 1 to 3 and operating costs "
    f"(excluding depreciation) are {pc(KOST, 0)} of revenue. Net working capital is EUR "
    f"{f(NWC[0], 0)} million at t = 0, {f(NWC[1], 0)} million at t = 1 and t = 2 and 0 at t = 3. "
    f"The tax rate is {pc(TAU4, 0)}.",
    f"To finance the line, Orobica borrows EUR {f(LAAN0, 0)} million from a bank at t = 0 and "
    f"repays EUR {f(GJELD[0] - GJELD[1], 0)} million of principal at t = 1, 2 and 3. Interest "
    f"is {pc(RD4, 0)} on the balance at the start of each year. The schedule is fixed whatever "
    "the line turns out to be worth.",
    "Two listed firms with the same business risk as the line keep their debt-to-value ratios "
    "constant: "
    f"Brenta Alimentari (equity beta {f(BE1, 2)}, debt-to-value ratio {pc(DV1, 0)}, risk-free "
    f"debt) and Garda Foods (equity beta {f(BE2, 2)}, debt-to-equity ratio {f(DE2, 1)}, cost "
    f"of debt {pc(RD2, 1)}). The risk-free rate is {pc(RF4, 1)} and the expected market return "
    f"{pc(RM4, 1)}.",
)

e4a = {
    "label": "a", "points": 4,
    "body": P("Find the line's free cash flow at t = 0, 1, 2 and 3."),
    "solution": P(
        "<b>Step 1. From revenue to FCF.</b> " + tabell(
            ["EUR million", "t = 0", "t = 1", "t = 2", "t = 3"], [
                ["Revenue", "", f(REV, 2), f(REV, 2), f(REV, 2)],
                [f"Operating costs ({pc(KOST, 0)})", "", f(-REV * KOST, 2), f(-REV * KOST, 2),
                 f(-REV * KOST, 2)],
                ["Depreciation (270/3)", "", f(-AVS, 2), f(-AVS, 2), f(-AVS, 2)],
                ["EBIT", "", f(EBIT, 2), f(EBIT, 2), f(EBIT, 2)],
                [f"Taxes ({pc(TAU4, 0)} of EBIT)", "", f(-SKATT, 2), f(-SKATT, 2), f(-SKATT, 2)],
                ["EBIT × (1 − τ)", "", f(NOPAT, 2), f(NOPAT, 2), f(NOPAT, 2)],
                ["+ Depreciation", "", f(AVS, 2), f(AVS, 2), f(AVS, 2)],
                ["− Capital expenditure", f(-KAPEX0, 2), "0.00", "0.00", "0.00"],
                ["− ΔNWC", f(-DNWC[0], 2), f(-DNWC[1], 2), f(-DNWC[2], 2), f(-DNWC[3], 2)],
                ["<b>FCF</b>", f"<b>{f(FCF[0], 2)}</b>", f"<b>{f(FCF[1], 2)}</b>",
                 f"<b>{f(FCF[2], 2)}</b>", f"<b>{f(FCF[3], 2)}</b>"],
            ]),
        f"So FCF<sub>0</sub> = <b>{f(FCF[0], 2)}</b>, FCF<sub>1</sub> = <b>{f(FCF[1], 2)}</b>, "
        f"FCF<sub>2</sub> = <b>{f(FCF[2], 2)}</b> and FCF<sub>3</sub> = <b>{f(FCF[3], 2)}</b> "
        f"(EUR million). ΔNWC is {f(NWC[1], 0)} − {f(NWC[0], 0)} = {f(DNWC[1], 0)} at t = 1, 0 at "
        f"t = 2 and 0 − {f(NWC[2], 0)} = {f(DNWC[3], 0)} at t = 3, when the working capital comes "
        "back: «one of the biggest fallacies would be forgetting the delta» (recording 18, "
        "12:44).",
        "<b>Step 2. What depreciation does.</b> Depreciation is not a cash outflow, but it is "
        "deducted before tax: it is subtracted to find taxable profit and added back after tax "
        f"(recording 18, 13:21 to 14:14). Its only cash effect is the tax it saves, "
        f"τ × Dep = {f(TAU4, 2)} × {f(AVS, 0)} = {f(SKJOLD_AVS, 2)} a year. The same FCF from "
        f"EBITDA: {f(EBITDA, 2)} × {f(1 - TAU4, 2)} + {f(SKJOLD_AVS, 2)} − {f(DNWC[1], 2)} = "
        f"{f(FCF[1], 2)} at t = 1 ✓. The investment is a cash outflow at t = 0 only; depreciation "
        "and capital expenditure are different numbers in every year, so they cannot be netted "
        "against each other.",
        f"<b>The traps.</b> Taxing EBITDA without the depreciation deduction gives "
        f"{f(FCF_FELLE_EBITDA[0], 2)}, {f(FCF_FELLE_EBITDA[1], 2)} and "
        f"{f(FCF_FELLE_EBITDA[2], 2)}; leaving depreciation out altogether gives "
        f"{f(FCF_FELLE_UTENAVS[0], 2)} at t = 1; subtracting the level of working capital "
        f"instead of the change gives {f(FCF_FELLE_NIVAA[0], 2)} at t = 1.",
    ),
    "criteria": [
        "FCF = EBIT(1 − τ) + Dep − CapEx − ΔNWC (the formula sheet), with taxes on EBIT after "
        "the depreciation of 90 is deducted and depreciation added back.",
        f"FCF_0 = −270 − 15 = {f(FCF[0], 2)}; FCF_1 = {f(FCF[1], 2)}; FCF_2 = {f(FCF[2], 2)}; "
        f"FCF_3 = {f(FCF[3], 2)} with the working capital of {f(NWC[2], 0)} recovered.",
        f"ΔNWC, not the level: +6 at t = 1, 0 at t = 2, −21 at t = 3.",
        f"EBITDA × (1 − τ) − ΔNWC (taxes on EBITDA, so the tax saved by depreciation is lost: "
        f"{f(FCF_FELLE_EBITDA[0], 2)} at t = 1) is the classic error and earns no points for the "
        "number.",
        "Show the calculation (a table is fine).",
    ],
}
svar(4, "a", {"type": "tall", "tall": [
    tall("FCF<sub>0</sub>", FCF[0], "EUR m", alt=[-FCF[0]]),
    tall("FCF<sub>1</sub>", FCF[1], "EUR m"),
    tall("FCF<sub>2</sub>", FCF[2], "EUR m"),
    tall("FCF<sub>3</sub>", FCF[3], "EUR m"),
], "merknad": "alt: FCF_0 skrevet som utlegg (285) godtas. Fellen EBITDA(1 − τ) − ΔNWC "
              f"({FCF_FELLE_EBITDA[0]:.2f}, {FCF_FELLE_EBITDA[1]:.2f}, {FCF_FELLE_EBITDA[2]:.2f}) "
              "avvises i hvert år."})

e4b = {
    "label": "b", "points": 4,
    "body": P("Find the unlevered cost of capital (r<sub>U</sub>) of each comparable firm and "
              "use their average as the line's r<sub>U</sub>."),
    "solution": P(
        f"The market risk premium is {pc(RM4, 1)} − {pc(RF4, 1)} = {pc(MRP4, 1)}.",
        f"<b>Brenta.</b> The debt is risk-free, so β<sub>D</sub> = 0: β<sub>U</sub> = "
        f"{f(1 - DV1, 2)} × {f(BE1, 2)} + {f(DV1, 2)} × 0 = {f(BU1)}. Then r<sub>U</sub> = "
        f"{pc(RF4, 1)} + {f(BU1)} × {pc(MRP4, 1)} = <b>{pc(RU1)}</b>.",
        f"<b>Garda.</b> Debt beta from the CAPM: β<sub>D</sub> = ({pc(RD2, 1)} − {pc(RF4, 1)})/"
        f"{pc(MRP4, 1)} = {f(BD2)}. D/E = {f(DE2, 1)} means D/V = {f(DE2, 1)}/{f(1 + DE2, 1)} = "
        f"{f(WD2)}: β<sub>U</sub> = {f(1 - WD2)} × {f(BE2, 2)} + {f(WD2)} × {f(BD2)} = "
        f"{f((1 - WD2) * BE2)} + {f(WD2 * BD2)} = {f(BU2)}. Then r<sub>U</sub> = {pc(RF4, 1)} + "
        f"{f(BU2)} × {pc(MRP4, 1)} = <b>{pc(RU2)}</b>.",
        f"<b>The line.</b> r<sub>U</sub> = ({pc(RU1)} + {pc(RU2)})/2 = <b>{pc(RU4)}</b>. "
        f"Averaging the betas gives the same: β<sub>U</sub> = {f(BU4)} and {pc(RF4, 1)} + "
        f"{f(BU4)} × {pc(MRP4, 1)} = {pc(RU4)} ✓. Both comparables keep a constant D/V, so "
        "their tax shields carry asset risk and r<sub>U</sub> is the plain weighted average, "
        "with no tax in it.",
    ),
    "criteria": [
        f"Brenta: β_D = 0, β_U = {f(1 - DV1, 2)} × {f(BE1, 2)} = {f(BU1)}, r_U = {pc(RU1)}.",
        f"Garda: β_D = (4.6% − 3.4%)/5.5% = {f(BD2)}; D/E = 0.5 converted to D/V = 1/3; "
        f"β_U = {f(BU2)}, r_U = {pc(RU2)}. Through returns: r_E = {pc(RE2)} and "
        f"(2/3) × {pc(RE2)} + (1/3) × 4.6% gives the same.",
        f"Line: r_U = {pc(RU4)}. Setting Garda's β_D = 0 ({pc(RU_FELLE_BD0)}), weighting with "
        f"D/E as if it were D/V ({pc(RU_FELLE_DE)}) or using 8.9% instead of the premium "
        f"({pc(RU_FELLE_RM)}) are the traps. The weights with D(1 − τ) for permanent debt "
        f"({pc(RU_FELLE_PERM)}) do not apply, since the comparables keep D/V constant.",
    ],
}
svar(4, "b", {"type": "tall", "tall": [
    tall("r<sub>U</sub> of Brenta", 100 * RU1, "%"),
    tall("r<sub>U</sub> of Garda", 100 * RU2, "%"),
    tall("r<sub>U</sub> of the line", 100 * RU4, "%", tol=0.005),
], "merknad": f"tol 0,5 % på linjens r_U: β_D = 0 for Garda gir {100 * RU_FELLE_BD0:.4f}, D/E "
              f"som vekt {100 * RU_FELLE_DE:.4f}; begge avvises."})

e4c = {
    "label": "c", "points": 3,
    "body": P("What is the NPV of the line if it were financed with equity only?"),
    "solution": P(
        "Discount the FCF from (a) at r<sub>U</sub>:",
        f"V<sup>U</sup><sub>0</sub> = {f(FCF[1], 2)}/{f(1 + RU4, 6)} + {f(FCF[2], 2)}/"
        f"{f(1 + RU4, 6)}<sup>2</sup> + {f(FCF[3], 2)}/{f(1 + RU4, 6)}<sup>3</sup> = "
        f"{f(FCF[1] / (1 + RU4))} + {f(FCF[2] / (1 + RU4) ** 2)} + {f(FCF[3] / (1 + RU4) ** 3)} "
        f"= {f(VU4)}",
        f"NPV = {f(VU4)} − {f(-FCF[0], 2)} = <b>EUR {f(NPV_U)} million</b>. The question asks "
        "for the NPV of the line, so the outlay at t = 0, working capital included, is "
        "subtracted (recording 18, 6:41 to 7:13).",
        f"With the FCF of the classic error in (a), the NPV would be {f(NPV_U_FELLE, 2)} and the "
        "line would be rejected: the tax saved by depreciation is worth about "
        f"{f(vu(RU4, [0, SKJOLD_AVS, SKJOLD_AVS, SKJOLD_AVS]), 2)} today.",
    ),
    "criteria": [
        "Discounts FCF_1 to FCF_3 at r_U (no tax shield yet).",
        f"V^U = {f(VU4)} and NPV = V^U − 285 = {f(NPV_U)}.",
        f"Reporting the PV ({f(VU4, 2)}) instead of the NPV, or subtracting only the 270, loses the "
        "point for the NPV.",
    ],
}
svar(4, "c", {"type": "tall", "tall": [
    tall("NPV, all-equity financed", NPV_U, "EUR m"),
], "merknad": f"r_U rundet til {RU4_RUND} gir {NPV_U_RUND:.4f} og godtas; PV ({VU4:.4f}) og "
              f"NPV med bare maskinen ({VU4 - KAPEX0:.4f}) avvises."})

e4d = {
    "label": "d", "points": 5,
    "body": P("Find the present value of the interest tax shields. What is the line's NPV with "
              "the APV method?"),
    "solution": P(
        "<b>Step 1. Debt and interest.</b> The loan falls by 50 a year: 150 during Year 1, 100 "
        "during Year 2 and 50 during Year 3. The interest is paid on the amount outstanding at "
        "the start of each year.",
        tabell(["Year", "Debt at start", f"Interest ({pc(RD4, 0)})", f"Tax shield ({pc(TAU4, 0)} of "
                "interest)"], [
            [str(t), f(GJELD[t - 1], 0), f(RD4 * GJELD[t - 1], 2), f"<b>{f(TS[t], 2)}</b>"]
            for t in (1, 2, 3)
        ]),
        f"<b>Step 2. Which rate.</b> The debt follows a fixed schedule, so the shields are known "
        "in advance and are as risky as the debt itself: discount them at r<sub>D</sub> = 5% "
        "(recording 09, 1:11:58 to 1:12:52).",
        f"PV(TS) = {f(TS[1], 2)}/1.05 + {f(TS[2], 2)}/1.05<sup>2</sup> + {f(TS[3], 2)}/"
        f"1.05<sup>3</sup> = {f(TS[1] / 1.05)} + {f(TS[2] / 1.05 ** 2)} + {f(TS[3] / 1.05 ** 3)} "
        f"= <b>EUR {f(PVTS)} million</b>",
        f"<b>Step 3. APV.</b> NPV = NPV with equity only + PV(TS) = {f(NPV_U)} + {f(PVTS)} = "
        f"<b>EUR {f(NPV_APV)} million</b>. The line is worth doing.",
        f"<b>The traps.</b> Discounting the shields at r<sub>U</sub> gives {f(PVTS_FELLE_RU)} "
        f"(NPV {f(NPV_APV_FELLE_RU)}); that rate belongs to debt that is rebalanced to a constant "
        f"D/V. τD = {f(PVTS_FELLE_TAUD, 0)} holds only for permanent debt; this loan is gone "
        "after three years. The shield is τ times the interest, not the interest itself.",
        "The tax shields per year are shown for the method; only PV(TS) and the NPV are asked "
        "for.",
    ),
    "criteria": [
        f"Tax shields τ × r_D × D on the debt at the start of each year: {f(TS[1], 2)}, "
        f"{f(TS[2], 2)} and {f(TS[3], 2)}.",
        f"PV(TS) discounted at r_D = 5% because the debt schedule is fixed: {f(PVTS)}.",
        f"APV NPV = {f(NPV_U)} + {f(PVTS)} = {f(NPV_APV)}.",
        f"Discounting at r_U ({f(PVTS_FELLE_RU)}) or using τD = 36 are the traps.",
        "Show the calculation.",
    ],
}
svar(4, "d", {"type": "tall", "tall": [
    tall("PV(TS)", PVTS, "EUR m", tol=0.005),
    tall("NPV with the APV method", NPV_APV, "EUR m", tol=0.003),
], "merknad": f"tol 0,5 % på PV(TS): skjoldet med r_U ({PVTS_FELLE_RU:.4f}) og et annuitetslån "
              f"({PVTS_FELLE_ANN:.4f}) avvises. tol 0,3 % på "
              f"NPV: med r_U ({NPV_APV_FELLE_RU:.4f}) avvises, avrundede mellomtall "
              f"({NPV_APV_RUND:.4f}) godtas."})

e4e = {
    "label": "e", "points": 4,
    "body": P("Which rate did you use for the tax shield in (d)? Why would it differ if Orobica "
              "kept a constant debt-to-value ratio? Could a single r<sub>wacc</sub> value this "
              "line?"),
    "solution": P(
        "<b>Which rate: r<sub>D</sub>.</b> The rate must match the risk of the shields. Here the debt (and so "
        "the interest and the shields) is fixed in advance and does not move with the value of "
        "the line; their only risk is the risk of the debt itself, so r<sub>D</sub> is the right "
        "rate (recording 09, 1:11:58 to 1:12:52). When the debt is rebalanced to a constant D/V, "
        "it rises and falls with the value of the assets, so the shields carry the assets' risk "
        "and are discounted at r<sub>U</sub>.",
        "<b>WACC.</b> No. The WACC method «only works when this ratio is constant» (recording "
        f"08, 55:08). Here D/V<sup>L</sup> is {f(GJELD[0], 0)}/{f(VL_T[0], 2)} = {f(DV_T[0], 2)} "
        f"at t = 0, {f(GJELD[1], 0)}/{f(VL_T[1], 2)} = {f(DV_T[1], 2)} at t = 1 and "
        f"{f(GJELD[2], 0)}/{f(VL_T[2], 2)} = {f(DV_T[2], 2)} at t = 2, so the right "
        "r<sub>wacc</sub> would change every year. APV handles any fixed schedule directly, "
        "which is why it is the method for predetermined debt (recording 09, 1:15:20 to "
        "1:17:31).",
    ),
    "criteria": [
        "Fixed schedule: the shields do not depend on the line's value and are as risky as the "
        "debt, so the right rate is r_D (2 points). A student who used r_U in (d) still earns "
        "these points by explaining correctly which rate is right.",
        "Constant D/V: the debt moves with the value of the assets, so the shields carry asset "
        "risk and r_U is used. Naming both cases is needed for full points on the first "
        "question.",
        "WACC: no, a single r_wacc requires a constant D/V and here the ratio falls each year "
        "as the loan is repaid (2 points). The D/V numbers are a bonus.",
    ],
}
svar(4, "e", {"type": "tekst"})

e4 = {
    "n": 4, "title": "Valuation", "points": 20, "topic": "Valuation with leverage",
    "chapters": [2, 3, 4, 17, 18, 19],
    "merke": "Ny runde: fri kontantstrøm fra prediksjon 1 · prosjekt over tre år med fast "
             "låneplan og to sammenlignbare · verdsetting 90 %, FCF-bygging 30 %",
    "body": e4_body, "parts": [e4a, e4b, e4c, e4d, e4e],
}

# ---------------------------------------------------------------- E5
e5_body = P(
    f"Kenogami Lithium can open a lithium mine in Quebec for CAD {f(I5, 0)} million today "
    "(t = 0). At t = 1 the lithium market settles for good in one of two states. From Year 1 "
    f"to Year 10 the mine earns CAD {f(CU, 0)} million a year in the high state and CAD "
    f"{f(CD, 0)} million in the low state; once the state is known, these cash flows are "
    f"certain. The risk-free rate is {pc(R5, 0)} a year and does not change.",
    "If the mine is open, Kenogami can add a second processing line at t = 1 (and only then), "
    f"after it learns the state. The line costs CAD {f(K5, 0)} million at t = 1 and raises the "
    f"mine's cash flow by {pc(ANDEL, 0)} from Year 2 to Year 10.",
    "Nobody knows the probabilities of the states. Default-free lithium-linked notes trade at "
    f"CAD {f(S0, 2)} today. A note pays at the end of each year from Year 1 to Year 10 "
    f"(nothing after Year 10): CAD {f(NU, 2)} a year in the high state and CAD {f(ND, 2)} in "
    "the low state.",
)

e5a = {
    "label": "a", "points": 3,
    "body": P("Suppose the mine is open. What is the NPV at t = 1 of adding the second line in "
              "each state? In which state is it added?"),
    "solution": P(
        f"The line adds {pc(ANDEL, 0)} of the mine's cash flow for nine years, Years 2 to 10, "
        f"starting one year after the payment at t = 1: annuity factor A(9, 6%) = "
        f"[1 − 1.06<sup>−9</sup>]/0.06 = {f(A9)}.",
        tabell(["State at t = 1", "Extra cash flow a year", "Value at t = 1", "NPV at t = 1"], [
            ["High", f(ANDEL * CU, 0), f"{f(ANDEL * CU, 0)} × {f(A9)} = {f(UTV_U)}",
             f"<b>{sg(NPV1_U)}</b>"],
            ["Low", f(ANDEL * CD, 0), f"{f(ANDEL * CD, 0)} × {f(A9)} = {f(UTV_D)}",
             f"<b>{sg(NPV1_D)}</b>"],
        ]),
        "Kenogami adds the line <b>only in the high state</b>. In the low state it does not, so "
        f"the payoff there is 0, not {f(NPV1_D, 2)}.",
    ),
    "criteria": [
        f"Nine extra cash flows (Years 2 to 10) valued at t = 1 with A(9, 6%) = {f(A9)}.",
        f"High: 30 × {f(A9)} − 150 = {sg(NPV1_U)}; low: 10 × {f(A9)} − 150 = {sg(NPV1_D)}.",
        "Adds the line only in the high state.",
        f"Ten cash flows ({sg(NPV1_FELLE_A10, 2)} in the high state) or a cash flow at t = 1 "
        f"({sg(NPV1_FELLE_MED1, 2)}) is wrong: the line starts producing in Year 2.",
    ],
}
svar(5, "a", {"type": "tall", "tall": [
    tall("NPV at t = 1, high state", NPV1_U, "CAD m"),
    tall("NPV at t = 1, low state", NPV1_D, "CAD m"),
]})

e5b = {
    "label": "b", "points": 5,
    "body": P("What is the risk-neutral probability of the high state?"),
    "solution": P(
        "<b>Step 1. One traded claim, three values.</b> Risk-neutral valuation needs a traded "
        "asset with a price today and a value at t = 1 in each state, all for the same claim. "
        f"The note is that asset. Its price today, S<sub>0</sub> = {f(S0, 2)}, buys the payments "
        "from Year 1 to Year 10. At t = 1 the holder receives the Year-1 payment and keeps a "
        "claim on the nine payments from Year 2 to Year 10:",
        f"S<sub>u</sub> = {f(NU, 2)} + {f(NU, 2)} × A(9, 6%) = {f(NU, 2)} + {f(NU * A9)} = "
        f"<b>{f(SU)}</b><br>"
        f"S<sub>d</sub> = {f(ND, 2)} + {f(ND, 2)} × A(9, 6%) = {f(ND, 2)} + {f(ND * A9)} = "
        f"<b>{f(SD)}</b>",
        f"<b>Step 2. The formula sheet.</b> ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − "
        f"S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = (1.06 × {f(S0, 2)} − {f(SD)})/"
        f"({f(SU)} − {f(SD)}) = ({f((1 + R5) * S0)} − {f(SD)})/{f(SU - SD)} = "
        f"{f((1 + R5) * S0 - SD)}/{f(SU - SD)} = <b>{f(RHO)}</b> ({f(RHO, 6)} before rounding), so 1 − ρ = {f(1 - RHO)}.",
        f"<b>Check.</b> [{f(RHO)} × {f(SU)} + {f(1 - RHO)} × {f(SD)}]/1.06 = {f(S0, 2)} returns "
        "today's price. This cannot fail once ρ came from the same note, so it only catches "
        "slips; the real safeguard is step 1.",
        f"<b>An equivalent route at t = 0.</b> Value each stream today: {f(S0, 2)} = A(10, 6%) × "
        f"[{f(NU, 2)}ρ + {f(ND, 2)}(1 − ρ)] = {f(A10)} × ({f(ND, 2)} + {f(NU - ND, 2)}ρ), so "
        f"ρ = ({f(S0 / A10)} − {f(ND, 2)})/{f(NU - ND, 2)} = {f(RHO)}, the same answer, because "
        "A(10, 6%) = [1 + A(9, 6%)]/1.06.",
        f"<b>The trap.</b> Values at t = 1 without the Year-1 payment ({f(NU * A9)} and "
        f"{f(ND * A9)}) together with 1.06 × S<sub>0</sub> give ρ = {f(RHO_FELLE)}; without "
        f"the factor 1.06 they give {f(RHO_FELLE2)}. Both lie between 0 and 1, so only the rule catches "
        "them: the value at t = 1 includes the payment made then, as with the lecture's annuity "
        "that «pays us $1,000 yearly, so including year one» (recording 14, 1:10:26).",
    ),
    "criteria": [
        f"S_u and S_d are values at t = 1 including the payment made then: {f(SU)} and {f(SD)}. "
        f"S_0 = {f(S0, 2)} is the price of the same claim (Years 1 to 10).",
        f"ρ = (1.06 × 23.50 − {f(SD)})/({f(SU)} − {f(SD)}) = {f(RHO)}.",
        f"The t = 0 route 23.50 = {f(A10)} × (2 + 3ρ) gives the same {f(RHO)} and is equally "
        f"accepted. {f(RHO_FELLE)} comes from combining 1.06 × S_0 with the values without the "
        f"Year-1 payment; {f(1 - RHO)} is 1 − ρ. Both are wrong.",
        "This part is the construction step: show the three values of the traded note and the "
        "formula.",
    ],
}
svar(5, "b", {"type": "tall", "tall": [
    tall("ρ (high state)", 100 * RHO, "%"),
], "merknad": f"Fellene uten betalingen ved t = 1 ({RHO_FELLE:.4f} og {RHO_FELLE2:.4f}) og "
              f"1 − ρ ({1 - RHO:.4f}) avvises."})

e5c = {
    "label": "c", "points": 3,
    "body": P("What is the NPV today of opening the mine if the line could never be added?"),
    "solution": P(
        f"<b>Step 1. The mine at t = 1.</b> Including the Year-1 cash flow, the mine is worth "
        f"{f(CU, 0)} × [1 + A(9, 6%)] = {f(VG_U)} in the high state and {f(CD, 0)} × "
        f"{f(1 + A9)} = {f(VG_D)} in the low state.",
        f"<b>Step 2. Value today with ρ.</b> [{f(RHO, 6)} × {f(VG_U)} + {f(1 - RHO, 6)} × "
        f"{f(VG_D)}]/1.06 = ({f(RHO * VG_U)} + {f((1 - RHO) * VG_D)})/1.06 = {f(PV_GRUVE)}. "
        f"Shortcut: A(10, 6%) × [{f(RHO, 6)} × {f(CU, 0)} + {f(1 - RHO, 6)} × {f(CD, 0)}] = {f(A10)} × "
        f"{f(RHO * CU + (1 - RHO) * CD)} = {f(PV_GRUVE)}.",
        f"<b>Step 3. NPV.</b> {f(PV_GRUVE)} − {f(I5, 0)} = <b>CAD {f(NPV_STAT)} million</b>. "
        "Without the option, Kenogami would not open the mine.",
        f"Using 50/50 instead of ρ gives {sg(NPV_STAT_FELLE_HALV, 2)} and has no basis: the "
        "probabilities are unknown and ρ is what the market prices with.",
    ),
    "criteria": [
        "Values the ten cash flows (Years 1 to 10) with ρ and discounts at r_f.",
        f"PV = {f(PV_GRUVE)} and NPV = {f(NPV_STAT)}; negative, so the mine alone is not "
        "worth opening.",
        f"50/50 ({sg(NPV_STAT_FELLE_HALV, 2)}) or leaving out the Year-1 cash flow "
        f"({f(NPV_STAT_FELLE_EKS, 2)}) is wrong.",
    ],
}
svar(5, "c", {"type": "tall", "tall": [
    tall("NPV without the second line", NPV_STAT, "CAD m"),
]})

e5d = {
    "label": "d", "points": 3,
    "body": P("What is the NPV today of opening the mine with the option to add the line? What "
              "is the option worth? Does Kenogami open the mine?"),
    "solution": P(
        f"<b>Step 1. The option.</b> At t = 1 it pays {f(NPV1_U)} in the high state and 0 in the "
        f"low state (from (a)). Today: {f(RHO, 6)} × {f(NPV1_U)}/1.06 = {f(RHO * NPV1_U)}/1.06 = "
        f"<b>CAD {f(OPSJON)} million</b>.",
        f"<b>Step 2. NPV with the option.</b> {f(NPV_STAT)} + {f(OPSJON)} = <b>CAD "
        f"{sg(NPV_MED)} million</b>.",
        "<b>Decision: open the mine.</b> The mine alone has a negative NPV, but opening it also "
        "buys the right to expand if the market turns out well. That right is worth more "
        "than the loss.",
        f"Letting the low state count with {f(NPV1_D, 2)} (adding the line in both states) gives "
        f"{f(NPV_MED_FELLE_BEGGE, 2)} and is the trap: Kenogami is not forced to expand.",
    ),
    "criteria": [
        f"Option value = ρ × {f(NPV1_U, 2)}/1.06 = {f(OPSJON)}, with 0 in the low state "
        f"(never {f(NPV1_D, 2)}).",
        f"NPV with the option = {f(NPV_STAT)} + {f(OPSJON)} = {sg(NPV_MED)}.",
        "Decision: open, because the option turns the negative NPV positive.",
    ],
}
svar(5, "d", {"type": "blandet", "tall": [
    tall("NPV with the option", NPV_MED, "CAD m", tol=0.005),
    tall("Value of the option", OPSJON, "CAD m"),
], "tallPoeng": 2, "tekstLedd": "Does Kenogami open the mine?",
    "merknad": f"tol 0,5 % på NPV: ρ rundet til {RHO_RUND} gir "
               f"{med_opsjon(RHO_RUND)[2]:.4f} og godtas."})

e5e = {
    "label": "e", "points": 3,
    "body": P("Let X be the mine's yearly cash flow in the low state. For which X is Kenogami "
              "indifferent today between opening the mine (option included) and not opening "
              "it?"),
    "solution": P(
        f"<b>Step 1. NPV as a function of X.</b> As long as {f(ANDEL, 1)} × X × A(9, 6%) &lt; "
        f"{f(K5, 0)}, that is X &lt; {f(X_GRENSE, 2)}, the line is still added only in the high "
        f"state, so the option keeps its value of {f(OPSJON)} from (d):<br>"
        f"NPV(X) = A(10, 6%) × [ρ × {f(CU, 0)} + (1 − ρ)X] − {f(I5, 0)} + {f(OPSJON)}",
        f"<b>Step 2. Set it to 0.</b> X = ({f(I5 - OPSJON)} − {f(A10)} × {f(RHO, 6)} × "
        f"{f(CU, 0)})/({f(A10)} × {f(1 - RHO, 6)}) = ({f(I5 - OPSJON)} − {f(A10 * RHO * CU)})/"
        f"{f(A10 * (1 - RHO))} = <b>CAD {f(X_STAR)} million</b> a year.",
        f"<b>Check.</b> {f(X_STAR, 2)} &lt; {f(X_GRENSE, 2)}, as step 1 assumed. Quick route: at "
        f"X = {f(CD, 0)} the NPV is {f(NPV_MED)} from (d); each unit of X adds "
        f"A(10, 6%)(1 − ρ) = {f(A10 * (1 - RHO))}, so X = {f(CD, 0)} − {f(NPV_MED)}/"
        f"{f(A10 * (1 - RHO))} = {f(X_STAR)} ✓. The low state can fall only to about "
        f"{f(X_STAR, 2)} a year before the mine is not worth opening.",
    ),
    "criteria": [
        "Writes the NPV of opening as a function of X and keeps the option value from (d), "
        "since the line is still not added in the low state.",
        f"Solves for X = {f(X_STAR)}.",
        f"Leaving out the option gives {f(X_FELLE_UTEN, 2)} and is wrong. Checking that "
        f"X < {f(X_GRENSE, 2)} is a bonus.",
    ],
}
svar(5, "e", {"type": "tall", "tall": [
    tall("X", X_STAR, "CAD m"),
], "merknad": f"Uten opsjonen ({X_FELLE_UTEN:.4f}) avvises; følgefeilen fra fellene i (b) gir "
              f"{X_FELLE_RHO:.4f} og {X_FELLE_RHO2:.4f} (veldefinert, men utenfor); ρ rundet til "
              f"{RHO_RUND} gir {X_RUND:.4f} og godtas."})

e5f = {
    "label": "f", "points": 3,
    "body": P("A colleague says the option is worthless because adding the line in both states "
              "has a negative NPV today. Is the colleague right? Explain briefly."),
    "solution": P(
        f"<b>No.</b> Committing today to add the line in both states would indeed be worth "
        f"[{f(RHO, 6)} × {f(NPV1_U, 2)} + {f(1 - RHO, 6)} × ({f(NPV1_D, 2)})]/1.06 = {f(FORPLIKT, 2)}. "
        "But Kenogami does not have to commit: it decides at t = 1 once it knows the state "
        f"and adds the line only in the high state. The low state then gives 0, not "
        f"{f(NPV1_D, 2)}, so the right is worth {f(OPSJON, 2)} today.",
        "<b>Where the value comes from.</b> Uncertainty combined with the right, but not the "
        "obligation, to act once it is resolved: the firm keeps the upside and walks away from "
        "the downside. The wider apart the two states, the more the option is worth. If both "
        "states gave close to the average of 40 a year, the line would be worth "
        f"{f(UTV_SNITT, 2)} &lt; 150 in either state and the option would be worth nothing "
        "(recording 14, 1:13:40 to 1:14:09).",
    ),
    "criteria": [
        "No (2 points): the decision is made after the state is known, so the low state gives 0 "
        "and the option has positive value even though committing in both states has a "
        "negative NPV.",
        "The explanation names where the value comes from (1 point): uncertainty plus the "
        "right, not the obligation, to act later, keeping the upside and avoiding the "
        "downside.",
        "Bonus: the option is worth more the more the states differ (volatility); the "
        f"commitment value {f(FORPLIKT, 2)} is not required.",
    ],
}
svar(5, "f", {"type": "tekst"})

e5 = {
    "n": 5, "title": "Real Options", "points": 20, "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 25],
    "merke": "Ny runde: ρ fra et omsatt verdipapir fra prediksjon 1 · utvidelse av en gruve, "
             "med et notert sertifikat som betaler i ti år · realopsjon 85 %, ρ fra et omsatt "
             "verdipapir 30 %",
    "body": e5_body, "parts": [e5a, e5b, e5c, e5d, e5e, e5f],
}

# ---------------------------------------------------------------- E6
e6_body = P(
    "Banksia Foodstores, an Australian supermarket chain, has offered to buy Yarrabee Wines: "
    f"each Yarrabee share will be exchanged for {f(ER, 2)} new Banksia "
    f"shares. Banksia's management expects synergies of AUD {f(S6, 0)} million.",
) + tabell(["", "Banksia", "Yarrabee"], [
    ["Shares outstanding (million)", f(NA, 0), f(NT, 0)],
    ["Share price before the news (AUD)", f(PA0, 2), f(PT0, 2)],
]) + P("Treat the prices before the news as the stand-alone values of the two firms.")

e6a = {
    "label": "a", "points": 2,
    "body": P("What is the offer worth per Yarrabee share at the prices before the news? What "
              "premium does it offer?"),
    "solution": P(
        f"Offer value: {f(ER, 2)} × {f(PA0, 2)} = <b>AUD {f(TILBUD, 2)}</b> per Yarrabee share.",
        f"Premium: {f(TILBUD, 2)}/{f(PT0, 2)} − 1 = <b>{pc(PREMIE, 2)}</b>.",
    ),
    "criteria": [
        f"Offer value = {f(ER, 2)} × {f(PA0, 2)} = {f(TILBUD, 2)}.",
        f"Premium = {f(TILBUD, 2)}/25.00 − 1 = {pc(PREMIE, 2)}.",
    ],
}
svar(6, "a", {"type": "tall", "tall": [
    tall("Offer value per Yarrabee share", TILBUD, "AUD"),
    tall("Premium", 100 * PREMIE, "%"),
]})

e6b = {
    "label": "b", "points": 4,
    "body": P("Assume management's synergies. What fraction of the combined firm will "
              "Yarrabee's former shareholders own? What is the NPV of the deal for Banksia's "
              "and for Yarrabee's shareholders?"),
    "solution": P(
        f"<b>Step 1. New shares and y.</b> Banksia issues x = {f(ER, 2)} × {f(NT, 0)} = "
        f"{f(X6, 2)} million shares, so y = x/(N<sub>A</sub> + x) = {f(X6, 2)}/{f(NA + X6, 2)} = "
        f"<b>{f(Y6)} ({pc(Y6)})</b>.",
        f"<b>Step 2. The formula sheet.</b> A = {f(NA, 0)} × {f(PA0, 2)} = {f(A6, 0)}, T = "
        f"{f(NT, 0)} × {f(PT0, 2)} = {f(T6, 0)}, so A + T + S = {f(V6, 0)}.<br>"
        f"Acquirer NPV = (1 − y)(A + T + S) − A = {f(1 - Y6, 6)} × {f(V6, 0)} − {f(A6, 0)} = "
        f"<b>AUD {f(NPVA)} million</b><br>"
        f"Target NPV = y(A + T + S) − T = {f(Y6, 6)} × {f(V6, 0)} − {f(T6, 0)} = <b>AUD "
        f"{f(NPVT)} million</b>",
        f"<b>Check.</b> {f(NPVA)} + {f(NPVT)} = {f(NPVA + NPVT, 2)} = S ✓: the two NPVs split "
        "the synergies. Yarrabee gets the larger part.",
    ),
    "criteria": [
        f"y = {f(X6, 2)}/{f(NA + X6, 2)} = {pc(Y6)}. Dividing by the old 150 million shares ({pc(Y6_FELLE, 2)}) is "
        "the trap.",
        f"Acquirer NPV = (1 − y)({f(V6, 0)}) − {f(A6, 0)} = {f(NPVA)}; target NPV = y({f(V6, 0)}) − {f(T6, 0)} = "
        f"{f(NPVT)}.",
        "The check that the NPVs sum to S is a bonus.",
    ],
}
svar(6, "b", {"type": "tall", "tall": [
    tall("Fraction owned by Yarrabee's former shareholders", 100 * Y6, "%"),
    tall("NPV for Banksia's shareholders", NPVA, "AUD m"),
    tall("NPV for Yarrabee's shareholders", NPVT, "AUD m"),
]})

e6c = {
    "label": "c", "points": 3,
    "body": P("With management's synergies, what is the highest exchange ratio Banksia's "
              "shareholders should accept?"),
    "solution": P(
        "Banksia's NPV is zero when the shares it gives away are worth exactly T + S. The formula "
        "sheet gives:",
        f"ER &lt; [(T + S)/A] × N<sub>A</sub>/N<sub>T</sub> = [({f(T6, 0)} + {f(S6, 0)})/"
        f"{f(A6, 0)}] × {f(NA, 0)}/{f(NT, 0)} = {f((T6 + S6) / A6)} × {f(NA / NT, 5)} = "
        f"<b>{f(ER_MAX)}</b>",
        f"Equivalently (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T) = ({f(PT0, 2)}/{f(PA0, 2)}) × "
        f"{f(1 + S6 / T6, 2)} = {f(ER_MAX)} (recording 16, 52:25). The offer of {f(ER, 2)} is "
        "below it, so with management's synergies Banksia gains, as in (b).",
    ),
    "criteria": [
        f"Highest ER = [(T + S)/A](N_A/N_T) = {f(ER_MAX)}.",
        f"Leaving out the synergies (25/36 = {f(ER_MAX_FELLE)}) is wrong.",
    ],
}
svar(6, "c", {"type": "tall", "tall": [
    tall("Highest exchange ratio", ER_MAX, ""),
]})

e6d = {
    "label": "d", "points": 4,
    "body": P(f"On the announcement day Banksia fell to AUD {f(PA1, 2)} and Yarrabee rose to AUD "
              f"{f(PT1, 2)}; the market sees the deal as certain. How much did each firm's market "
              "value change? What synergies does the market expect?"),
    "solution": P(
        f"Banksia: {f(NA, 0)} × ({f(PA1, 2)} − {f(PA0, 2)}) = <b>AUD {f(DVA, 2)} million</b>.<br>"
        f"Yarrabee: {f(NT, 0)} × ({f(PT1, 2)} − {f(PT0, 2)}) = <b>AUD {sg(DVT, 2)} million</b>.",
        f"With the deal certain, the two changes together are the value the deal creates: "
        f"S = {f(DVA, 2)} + {f(DVT, 2)} = <b>AUD {f(SM, 2)} million</b> (recording 16, 53:53 to "
        "54:19).",
        f"<b>Check.</b> Yarrabee trades at the offer, {f(ER, 2)} × {f(PA1, 2)} = {f(PT1, 2)}. "
        f"The combined firm is worth ({f(NA, 0)} + {f(X6, 2)}) × {f(PA1, 2)} = "
        f"{f((NA + X6) * PA1, 2)} = {f(A6, 0)} + {f(T6, 0)} + {f(SM, 2)} ✓.",
    ),
    "criteria": [
        f"Changes in market value: Banksia {f(DVA, 2)}, Yarrabee {sg(DVT, 2)} (price change × "
        "shares).",
        f"Market's synergies = the sum = {f(SM, 2)}, far below management's {f(S6, 0)}.",
        "The combined-value check is a bonus.",
    ],
}
svar(6, "d", {"type": "tall", "tall": [
    tall("Change in Banksia's market value", DVA, "AUD m"),
    tall("Change in Yarrabee's market value", DVT, "AUD m"),
    tall("Synergies the market expects", SM, "AUD m"),
]})

e6e = {
    "label": "e", "points": 3,
    "body": P(f"Banksia had also considered paying AUD {f(KONTANT, 2)} per Yarrabee share in "
              "cash. With the synergies the market expects, what is Banksia's NPV with that cash "
              "offer and with the share offer?"),
    "solution": P(
        f"<b>Cash.</b> Banksia pays {f(KONTANT, 2)} × {f(NT, 0)} = {f(KONTANT * NT, 0)} for a firm "
        f"worth {f(T6, 0)}: NPV<sub>A</sub> = S − (P − T) = {f(SM, 2)} − {f(KONTANT * NT - T6, 0)} "
        f"= <b>AUD {f(NPVA_KONT, 2)} million</b>.",
        f"<b>Shares.</b> NPV<sub>A</sub> = (1 − y)(A + T + S) − A = {f(1 - Y6, 6)} × "
        f"{f(A6 + T6 + SM, 2)} − {f(A6, 0)} = <b>AUD {f(NPVA_AKS, 2)} million</b>, the fall in "
        "Banksia's market value from (d).",
        f"With cash, Banksia's shareholders bear the whole shortfall in synergies; with shares, "
        f"Yarrabee's former owners bear {pc(Y6, 2)} of it (Yarrabee's NPV falls from "
        f"{f(NPVT, 2)} to {f(NPVT_AKS, 2)}), so shares protect the acquirer when the synergies are "
        "uncertain (recording 16, 45:24 to 46:48).",
    ),
    "criteria": [
        f"Cash: NPV_A = {f(SM, 2)} − ({f(KONTANT * NT, 0)} − {f(T6, 0)}) = {f(NPVA_KONT, 2)}.",
        f"Shares: NPV_A = (1 − y)({f(A6 + T6 + SM, 2)}) − {f(A6, 0)} = {f(NPVA_AKS, 2)}.",
        f"Using management's {f(S6, 0)} instead of the market's synergies is wrong here.",
    ],
}
svar(6, "e", {"type": "tall", "tall": [
    tall("NPV for Banksia, cash offer", NPVA_KONT, "AUD m"),
    tall("NPV for Banksia, share offer", NPVA_AKS, "AUD m"),
], "merknad": f"Med ledelsens synergier ville kontant gitt {NPVA_KONT_LEDELSE:.2f}; avvises."})

e6f = {
    "label": "f", "points": 4,
    "body": P("Does the market expect the deal to create or destroy value? Who pays too much? "
              "Give one motive other than synergies that fits these price reactions. Explain "
              "briefly."),
    "solution": P(
        f"<b>Create, but little.</b> The combined value rises by {f(SM, 2)} million, so the "
        "market expects the deal to create some value.",
        f"<b>Banksia's shareholders pay too much.</b> They lose {f(-DVA, 2)} million while "
        f"Yarrabee's shareholders gain {f(DVT, 2)} million: the premium Yarrabee receives is "
        f"larger than all the synergies the market expects. At the market's synergies the "
        f"highest exchange ratio Banksia should accept is [({f(T6, 0)} + {f(SM, 2)})/{f(A6, 0)}] × {f(NA / NT, 5)} = "
        f"{f(ER_MAX_SM)}, below the {f(ER, 2)} it offered.",
        f"<b>Motive: managerial hubris.</b> Banksia's managers expect synergies of {f(S6, 0)} million, "
        "more than five times what the market sees. They set the exchange ratio on that belief. The "
        "market does not share it, so Banksia's price falls while Yarrabee's owners, who receive "
        "the premium, gain.",
        "<b>Also accepted.</b> Empire building (a supermarket chain growing by buying a "
        "winemaker); diversification the owners could get more cheaply themselves; managers "
        "reducing the risk to their own jobs. Each must fit Banksia down and Yarrabee up. "
        "«Value creation» without a mechanism earns nothing.",
    ),
    "criteria": [
        f"Uses the changes from (d): combined {sg(SM, 2)}, so value is created, but Banksia "
        f"{f(DVA, 2)} and Yarrabee {sg(DVT, 2)} (1 point).",
        "Banksia's shareholders pay too much: the premium exceeds the synergies; Yarrabee's "
        "shareholders capture more than the whole gain (1 point).",
        "One motive other than synergies, with its mechanism, that fits the acquirer falling "
        "and the target rising: hubris or overconfidence, empire building, diversification, "
        "managers' own interests (2 points).",
        "Synergies or «value creation» alone earn nothing for the motive.",
    ],
}
svar(6, "f", {"type": "tekst"})

e6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions",
    "chapters": [26],
    "merke": "Aksjebytte og kontantbud med formlene på formelarket · M&A med regning 65 %",
    "body": e6_body, "parts": [e6a, e6b, e6c, e6d, e6e, e6f],
}

SETT = {
    "id": SID,
    "kind": "mock",
    "fane": "pred",
    "nr": 3,
    "label": "Prediksjon 3",
    "minutes": 180,
    "points": 100,
    "format": "6 oppgaver · 100 poeng · ingen flervalg",
    "note": ("To av regneoppgavene er nye runder på det som gikk galt i prediksjon 1. Resten er "
             "temaer de to første settene ikke dekket: forsvar mot et fiendtlig bud, utbetaling, "
             "IPO og aksjebytte. "
             "Ta den på tid med penn og papir."),
    "facts": [
        "Prediction exam in Kurbatov's format: 6 exercises, 100 points, 180 minutes, no multiple "
        "choice, calculator and one bilingual dictionary permitted.",
        "Points per exercise: 10 · 10 · 20 · 20 · 20 · 20. Two verbal exercises with sentence "
        "budgets, then four computational exercises.",
        "The formula sheet is handed out.",
        "Recommended precision: 4 decimal places. An error carried forward is not penalised again "
        "in later parts.",
        "Written for this app from the prediction of the 2026 exam. Every number in the solutions "
        "is computed in a script.",
    ],
    "exercises": [e1, e2, e3, e4, e5, e6],
}

# ================================================================== kontroller
feil = []


def ren(t):
    return re.sub(r"</?(sub|sup|b|i|em|strong)>", "", str(t))


def regler(hvor, t):
    r = ren(t)
    if "—" in r:
        feil.append(f"{hvor}: tankestrek")
    if re.search(r",\s+and\b", r):
        m = re.search(r",\s+and\b", r)
        feil.append(f"{hvor}: komma før and: …{r[max(0, m.start() - 50):m.end() + 10]}…")
    if re.search(r",\s+og\b", r):
        feil.append(f"{hvor}: komma før og")
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"{hvor}: pronomen om Kurbatov")
    if re.search(r"\b(he|his|him|himself|she|her|hers)\b", re.sub(r"<[^>]+>", " ", r)):
        feil.append(f"{hvor}: kjønnet pronomen")
    if re.search(r"\d\s-\s\d|\(-\d|=\s-\d", re.sub(r"<[^>]+>", " ", r)):
        feil.append(f"{hvor}: bindestrek brukt som minus")


for t in [SETT["note"], SETT["label"], *SETT["facts"]]:
    regler("sett", t)
assert sum(e["points"] for e in SETT["exercises"]) == 100
assert [e["points"] for e in SETT["exercises"]] == [10, 10, 20, 20, 20, 20]
for e in SETT["exercises"]:
    hvor = f"E{e['n']}"
    for k in ("title", "body", "solution", "merke"):
        if k in e:
            regler(hvor, e[k])
    for c in e.get("criteria", []):
        regler(hvor, c)
    if re.search(r"<[a-zA-Z/]", e["merke"]):
        feil.append(f"{hvor}: markup i merke")
    if e.get("parts"):
        assert sum(p["points"] for p in e["parts"]) == e["points"], hvor
        assert 4 <= len(e["parts"]) <= 9, hvor
        for p in e["parts"]:
            for k in ("body", "solution"):
                regler(f"{hvor}{p['label']}", p[k])
            for c in p["criteria"]:
                regler(f"{hvor}{p['label']}", c)
        # siste del er en verbal hale på 3 til 5 poeng
        siste = e["parts"][-1]
        assert SVAR[f"{SID}:{e['n']}:{siste['label']}"]["type"] == "tekst", hvor
        assert 3 <= siste["points"] <= 5, hvor

# tallene i svar-dataene skal stå i løsningsteksten (samme logikk som tools/sjekk-svar.js)


def tall_i(tekst):
    t = re.sub(r"<[^>]*>", " ", str(tekst)).replace("&minus;", "−").replace("&nbsp;", " ")
    t = re.sub(r"&[a-z]+;", " ", t).replace("−", "-").replace("–", "-")
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


for e in SETT["exercises"]:
    deler = e.get("parts") or [dict(e, label="")]
    for p in deler:
        k = f"{SID}:{e['n']}:{p['label']}"
        if k not in SVAR:
            feil.append(f"{k}: mangler svar-data")
            continue
        d = SVAR[k]
        if d["type"] == "blandet":
            assert 0 < d["tallPoeng"] < p["points"], k
        if d["type"] in ("tall", "blandet"):
            kilde = " ".join([p.get("solution", ""), " ".join(p.get("criteria", []))])
            nums = tall_i(kilde)
            for t in d["tall"]:
                if not any(innenfor(n, t["verdi"], t) or (t["enhet"] == "%" and innenfor(n * 100, t["verdi"], t))
                           for n in nums):
                    feil.append(f"{k} {t['navn']}: hovedverdien {t['verdi']} står ikke i løsningen")
for k in SVAR:
    if not any(k == f"{SID}:{e['n']}:{p['label']}" for e in SETT["exercises"]
               for p in (e.get("parts") or [dict(e, label="")])):
        feil.append(f"{k}: svar-data uten oppgave")

# feller og avrunding mot den effektive toleransen max(abs, tol × |v|) (prediksjon-spek, «Toleranser»)


def godtas(nokkel, navn, v):
    t = next(x for x in SVAR[nokkel]["tall"] if x["navn"] == navn)
    return any(abs(v - c) <= max(t.get("abs", 0), t.get("tol", 0.01) * abs(c))
               for c in [t["verdi"], *t.get("alt", [])])


K3, K4, K5_, K6 = f"{SID}:3:", f"{SID}:4:", f"{SID}:5:", f"{SID}:6:"
FELLER = [  # (nøkkel, felt, galt svar)
    (K3 + "b", "Average return on the money invested", 100 * RET_B_FELLE),
    (K3 + "c", "Break-even offer price", P_STAR_FELLE),
    (K3 + "c", "Break-even offer price", P_STAR_FELLE_VEKT),
    (K3 + "c", "Break-even offer price", P_B),
    (K3 + "d", "Average first-day return across IPOs", 100 * RET_SNITT_FELLE),
    (K3 + "d", "Average first-day return across IPOs", 100 * RET_INF),
    (K3 + "e", "Expected cost per IPO", NS * (EV3 - P_B)),
    (K3 + "d", "First-day return of informed investors on the IPOs they buy", 100 * PG * RET_INF),
    # E4: fri kontantstrøm (ny runde)
    (K4 + "a", "FCF<sub>0</sub>", FCF0_FELLE),
    *[(K4 + "a", f"FCF<sub>{t}</sub>", FCF_FELLE_EBITDA[t - 1]) for t in (1, 2, 3)],
    *[(K4 + "a", f"FCF<sub>{t}</sub>", FCF_FELLE_UTENAVS[t - 1]) for t in (1, 2, 3)],
    *[(K4 + "a", f"FCF<sub>{t}</sub>", FCF_FELLE_NIVAA[t - 1]) for t in (1, 2)],
    (K4 + "a", "FCF<sub>3</sub>", NOPAT + AVS),                          # frigjøringen glemt
    (K4 + "a", "FCF<sub>1</sub>", NOPAT + AVS),                          # ΔNWC glemt
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU_FELLE_BD0),
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU_FELLE_DE),
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU_FELLE_RM),
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU1),
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU2),
    (K4 + "b", "r<sub>U</sub> of Garda", 100 * (RF4 + (1 - WD2) * BE2 * MRP4)),
    (K4 + "c", "NPV, all-equity financed", VU4),
    (K4 + "c", "NPV, all-equity financed", VU4 - KAPEX0),
    (K4 + "c", "NPV, all-equity financed", NPV_U_FELLE),
    (K4 + "d", "PV(TS)", PVTS_FELLE_RU),
    (K4 + "d", "PV(TS)", PVTS_FELLE_ANN),                              # annuitetslån
    (K4 + "b", "r<sub>U</sub> of the line", 100 * RU_FELLE_PERM),      # D(1 − τ)-vekter
    (K4 + "d", "PV(TS)", PVTS_FELLE_TAUD),
    (K4 + "d", "PV(TS)", PVTS_FELLE_RENTE),
    (K4 + "d", "NPV with the APV method", NPV_APV_FELLE_RU),
    (K4 + "d", "NPV with the APV method", NPV_U + PVTS_FELLE_TAUD),
    # E5: ρ fra et omsatt verdipapir (ny runde)
    (K5_ + "a", "NPV at t = 1, high state", NPV1_FELLE_A10),
    (K5_ + "a", "NPV at t = 1, high state", NPV1_FELLE_MED1),
    (K5_ + "b", "ρ (high state)", 100 * RHO_FELLE),
    (K5_ + "b", "ρ (high state)", 100 * RHO_FELLE2),
    (K5_ + "b", "ρ (high state)", 100 * (1 - RHO)),
    (K5_ + "b", "ρ (high state)", 50.0),
    (K5_ + "c", "NPV without the second line", NPV_STAT_FELLE_HALV),
    (K5_ + "c", "NPV without the second line", NPV_STAT_FELLE_EKS),
    (K5_ + "d", "NPV with the option", NPV_MED_FELLE_BEGGE),
    (K5_ + "d", "Value of the option", FORPLIKT),
    (K5_ + "d", "Value of the option", RHO * NPV1_U),              # ikke diskontert
    (K5_ + "e", "X", X_FELLE_UTEN),
    (K5_ + "e", "X", X_FELLE_RHO),
    (K5_ + "e", "X", X_FELLE_RHO2),
    (K5_ + "e", "X", CD),
    # E6
    (K6 + "a", "Premium", 100 * PREMIE_FELLE),
    (K6 + "b", "Fraction owned by Yarrabee's former shareholders", 100 * Y6_FELLE),
    (K6 + "b", "NPV for Banksia's shareholders", NPVA_FELLE_Y),
    (K6 + "c", "Highest exchange ratio", ER_MAX_FELLE),
    (K6 + "c", "Highest exchange ratio", ER_MAX_SM),
    (K6 + "e", "NPV for Banksia, cash offer", NPVA_KONT_LEDELSE),
    (K6 + "e", "NPV for Banksia, share offer", (1 - Y6) * V6 - A6),
]
RIKTIGE = [  # (nøkkel, felt, riktig svar med avrundede mellomtall)
    (K3 + "c", "Break-even offer price", round(VERDI / SH, 2)),
    (K3 + "d", "Average first-day return across IPOs", 100 * (EV3 / round(P_STAR, 2) - 1)),
    (K3 + "d", "First-day return of informed investors on the IPOs they buy", 100 * (VG / round(P_STAR, 2) - 1)),
    (K3 + "e", "Expected cost per IPO", -KOST3),
    (K3 + "e", "Gain (+) or loss (−) for the founders of a good firm", NS * (round(P_STAR, 2) - VG)),
    (K4 + "a", "FCF<sub>0</sub>", -FCF[0]),
    (K4 + "b", "r<sub>U</sub> of the line", 100 * (RF4 + round(BU4, 4) * MRP4)),
    (K4 + "b", "r<sub>U</sub> of Garda", 100 * (RF4 + round(BU2, 4) * MRP4)),
    (K4 + "c", "NPV, all-equity financed", NPV_U_RUND),
    (K4 + "d", "PV(TS)", PVTS_RUND),
    (K4 + "d", "NPV with the APV method", NPV_APV_RUND),
    (K5_ + "b", "ρ (high state)", 100 * RHO_RUND),
    (K5_ + "c", "NPV without the second line", A10 * (RHO_RUND * CU + (1 - RHO_RUND) * CD) - I5),
    (K5_ + "c", "NPV without the second line",
     round(A10, 4) * (RHO_RUND * CU + (1 - RHO_RUND) * CD) - I5),
    (K5_ + "d", "NPV with the option", med_opsjon(RHO_RUND)[2]),
    (K5_ + "d", "Value of the option", med_opsjon(RHO_RUND)[1]),
    (K5_ + "e", "X", X_RUND),
    (K6 + "b", "Fraction owned by Yarrabee's former shareholders", round(100 * Y6, 2)),
    (K6 + "b", "NPV for Banksia's shareholders", round(1 - Y6, 4) * V6 - A6),
    (K6 + "b", "NPV for Yarrabee's shareholders", round(Y6, 4) * V6 - T6),
    (K6 + "e", "NPV for Banksia, share offer", round(1 - Y6, 4) * (A6 + T6 + SM) - A6),
]
for k, navn, v in FELLER:
    if godtas(k, navn, v):
        feil.append(f"{k} {navn}: fellen {v:.4f} godtas")
for k, navn, v in RIKTIGE:
    if not godtas(k, navn, v):
        feil.append(f"{k} {navn}: riktig svar {v:.4f} avvises")
# hovedfellene i de to nye rundene skal ligge godt utenfor (minst 5 %)
assert abs(RHO_FELLE - RHO) / RHO > 0.05 and abs(RHO_FELLE2 - RHO) / RHO > 0.05
assert all(abs(FCF_FELLE_EBITDA[t - 1] - FCF[t]) / FCF[t] > 0.05 for t in (1, 2, 3))
assert all(abs(FCF_FELLE_UTENAVS[t - 1] - FCF[t]) / FCF[t] > 0.05 for t in (1, 2, 3))

# ingen reserveverdier (prediksjon-spek, «Ingen reserveverdier»)
for e in SETT["exercises"]:
    for p in [e, *e.get("parts", [])]:
        for felt in ("body", "solution"):
            if re.search(r"could not solve|reserve", str(p.get(felt, "")), re.I):
                feil.append(f"E{e['n']}{p.get('label', '')}: reserveverdi i {felt}")
        if any(re.search(r"reserve", c, re.I) for c in p.get("criteria", [])):
            feil.append(f"E{e['n']}{p.get('label', '')}: reserveverdi i kriteriene")
for k, d in SVAR.items():
    if "reserve" in d.get("merknad", ""):
        feil.append(f"{k}: reserve i merknad")

# svar som lekker: hovedverdien skal ikke stå i oppgaveteksten eller i en tidligere del
LOV = set()
for e in SETT["exercises"]:
    tekst_for = re.sub(r"<[^>]+>", " ", e["body"])
    for p in e.get("parts", []):
        tekst_for += " " + re.sub(r"<[^>]+>", " ", p["body"])
        d = SVAR[f"{SID}:{e['n']}:{p['label']}"]
        for t in d.get("tall", []):
            if (f"{SID}:{e['n']}:{p['label']}", t["navn"]) in LOV:
                continue
            v = t["verdi"]
            if abs(v) < 10 and abs(v - round(v)) < 1e-9:
                continue
            for s in {f"{abs(v):.2f}", f"{abs(v):.4f}", f"{abs(v):,.2f}"} | ({f"{abs(v):.0f}", f"{abs(v):,.0f}"} if abs(v - round(v)) < 1e-9 else set()):
                if re.search(r"(?<![\d.,])" + re.escape(s) + r"(?![\d])", tekst_for):
                    feil.append(f"{SID}:{e['n']}:{p['label']} {t['navn']}: {s} står i oppgaveteksten")

# feltnavnene røper ikke retningen (mk-spek, lærdommer)
for k, d in SVAR.items():
    for t in d.get("tall", []):
        if re.search(r"\b(gain|loss|saving|benefit)\b", t["navn"], re.I) and "(+) or" not in t["navn"]:
            feil.append(f"{k}: feltnavnet «{t['navn']}» røper retningen")

if feil:
    for x in feil:
        print("FEIL", x)
    sys.exit("skriver ingenting")

# ord i oppgaveteksten og antall leveranser
ord_ = 0
lev = 0
for e in SETT["exercises"]:
    ord_ += len(re.sub(r"<[^>]+>", " ", e["body"]).split())
    for p in e.get("parts", []):
        ord_ += len(re.sub(r"<[^>]+>", " ", p["body"]).split())
for k, d in SVAR.items():
    lev += len(d.get("tall", [])) + (1 if d["type"] in ("tekst", "blandet") else 0)

json.dump(SETT, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

print(f"Skrev {UT} og {UT_SVAR}")
print(f"Ord i oppgaveteksten: {ord_}, leveranser: {lev}, svar-oppføringer: {len(SVAR)}")
print(f"E3: E[V] {EV3:.2f}, tildeling {AG:.0f}/{AB:.0f}, avkastning ved 19 {RET_B:.6f} (felle {RET_B_FELLE:.6f}), "
      f"P* {P_STAR:.4f}, snitt {RET_SNITT:.6f}, informert {RET_INF:.6f}, grunnleggere {GRUNN_G:.4f}/{GRUNN_B:.4f}, kost {KOST3:.4f}")
print(f"E4: FCF {[round(x, 4) for x in FCF]} (felle {[round(x, 2) for x in FCF_FELLE_EBITDA]}), r_U {RU1:.6f}/{RU2:.6f}/{RU4:.6f}, "
      f"V^U {VU4:.4f}, NPV_U {NPV_U:.4f} (felle {NPV_U_FELLE:.4f}), TS {[round(x, 2) for x in TS[1:]]}, PV(TS) {PVTS:.4f} "
      f"(r_U {PVTS_FELLE_RU:.4f}), APV {NPV_APV:.4f}, D/V {[round(x, 4) for x in DV_T]}")
print(f"E5: A9 {A9:.6f}, A10 {A10:.6f}, utvid {NPV1_U:.4f}/{NPV1_D:.4f}, S_u {SU:.4f}, S_d {SD:.4f}, ρ {RHO:.6f} "
      f"(feller {RHO_FELLE:.4f}, {RHO_FELLE2:.4f}), statisk {NPV_STAT:.4f}, opsjon {OPSJON:.4f}, med {NPV_MED:.4f}, "
      f"X* {X_STAR:.4f} (uten opsjon {X_FELLE_UTEN:.4f}, felle-ρ {X_FELLE_RHO:.4f}), forplikt {FORPLIKT:.4f}")
print(f"E6: tilbud {TILBUD:.2f}, premie {PREMIE:.6f}, y {Y6:.6f}, NPV {NPVA:.4f}/{NPVT:.4f}, ER max {ER_MAX:.6f}, "
      f"ΔV {DVA:.2f}/{DVT:.2f}, S_m {SM:.2f}, kontant {NPVA_KONT:.2f}, aksjer {NPVA_AKS:.2f}, ER max (S_m) {ER_MAX_SM:.6f}")
