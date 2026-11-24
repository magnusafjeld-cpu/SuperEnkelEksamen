"""Skribent H3: «Hintet i forelesning» for FIE402 (docs/fie402-hint-spek.md).

Kjør fra hvor som helst:  python3 -I fag/fie402/_del/h3_regn.py

Fem oppgaver, hver bygd på et forelesningseksempel Kurbatov pekte ut, med egen historie og egne tall:

- hint3-1 n3 (20 p): dealsannsynlighet ved aksjebytte (Mannesmann, opptak 16, 1:02:41 til 1:23:00).
  Rykter før budet, T = 9 måneder og (1 + r_f)^0.75, bytteforhold 1,6. Vri: B faller ikke helt
  tilbake ved fiasko (62 i stedet for 58). Verbal hale: gjennomføringen utsettes ett år.
- hint3-1 n4 (20 p): CDS (opptak 13, 17:42 til 40:06). ρ er sannsynligheten for mislighold og står i
  den nederste grenen; CDS-en betaler 1 ved mislighold. Vri: obligasjonen har kupong 7 % som betales
  ved forfall, så tapet ved mislighold er 107 − 45 = 62, ikke 100 − 45.
- hint3-3 n1 (10 p): realopsjoner verbalt (opptak 14, 8:49 til 46:24): tre eksempler, kostnaden ved
  å vente og volatiliteten i sammenlignbare firmaer.
- hint3-3 n2 (20 p): opsjonen til å avvikle med månedlige kontantstrømmer (opptak 14, 1:16:17 og
  opptak 18, 1:06:01 til 1:09:30). Exit sammenlignes med 0. Vri: et oppsigelsesgebyr (Kurbatov:
  «or even like with a small fee», opptak 18, 1:06:47).
- hint3-3 n3 (20 p): budkamp der betalingsviljen avhenger av alternativet (bank D, opptak 16,
  1:26:04) og fusjon av to belånte firmaer uten synergi (coinsurance, 1:28:19 til 1:31:43). Vri:
  ulike synergier, så den med minst synergi vinner.

Skriptet regner hvert tall, asserter sjekkene og skriver h3.json og h3_svar.json i samme mappe.
Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som lekker i oppgaveteksten),
skrives ingenting.
"""
import json
import math
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "h3.json")
UT_SVAR = os.path.join(HER, "h3_svar.json")


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


def pc(x, d=2):
    return f(100 * x, d) + "%"


def kr(x):
    return f(x, 0)


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def A(n, r):
    """Annuitetsfaktor: n betalinger, den første om én periode."""
    return (1 - (1 + r) ** -n) / r


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:26} {v}")


def tab(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = "".join("<tr>" + "".join(f'<td class="n">{c}</td>' if i else f"<td>{c}</td>" for i, c in enumerate(rad))
                + "</tr>" for rad in rader)
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


# ======================================================================
#  hint3-1 n3: Hvalstad Data (A) og Lomsdal Systemer (B), dealsannsynlighet
# ======================================================================
PA0, PB0, PA1, PB1 = 45.00, 58.00, 47.50, 71.20     # før ryktene og i dag
ER3, rf3, T3 = 1.6, 0.045, 0.75                    # 1 B blir 1,6 A; 9 måneder
g3 = (1 + rf3) ** T3
tilbud3 = ER3 * PA1                                # tilbudet per B-aksje i dag
premie3 = tilbud3 / PB0 - 1
spread3 = tilbud3 - PB1
assert near(tilbud3, 76.0) and near(spread3, 4.8)
# b) posisjonen: kjøp 1 B, selg 1,6 A short, sett 76 i banken
suk3 = tilbud3 * g3                                # suksess: B blir A, shorten lukkes
gap3 = ER3 * PA0 - PB0                             # 72 − 58 = 14
feil3 = suk3 - ER3 * PA0 + PB0                     # fiasko: selg B til 58, kjøp tilbake 1,6 A til 45
assert near(suk3 - feil3, gap3) and near(gap3, 14.0)
# c) sikkerhetsekvivalent og sannsynlighet
SE3 = PB1 * g3
p3 = (SE3 - feil3) / (suk3 - feil3)
assert 0 < p3 < 1 and near(p3 * suk3 + (1 - p3) * feil3, SE3, 1e-12)
assert PB0 < PB1 < tilbud3                          # B mellom frittstående verdi og tilbudet
# Kurbatovs selvfinansierte variant (opptak 16, 1:14): koster 0, samme p
selv_suk3 = spread3 * g3
selv_feil3 = selv_suk3 + PB0 - ER3 * PA0
p3_selv = -selv_feil3 / (selv_suk3 - selv_feil3)
assert near(p3_selv, p3, 1e-12)
assert near(p3, 1 - spread3 * g3 / gap3, 1e-12)
# fellene
p3_felle = (PB1 - feil3) / (suk3 - feil3)          # 71,20 i stedet for sikkerhetsekvivalenten
g3_helaar = 1 + rf3
p3_helaar = 1 - spread3 * g3_helaar / gap3          # helårsfaktor
p3_enkel = 1 - spread3 * (1 + rf3 * T3) / gap3     # enkel rente
assert abs(p3_felle - p3) > 0.1
assert abs(p3_helaar / p3 - 1) > 0.005              # faller utenfor toleransen 0,4 %
assert abs(p3_enkel / p3 - 1) < 0.001               # tilnærming som godtas
# d) B faller bare til 62 ved fiasko
PB0_d = 62.00
feil3d = suk3 - ER3 * PA0 + PB0_d
p3d = (SE3 - feil3d) / (suk3 - feil3d)
assert 0 < p3d < p3                                 # mindre smertefull fiasko gir lavere p
p3d_felle = (PB1 - feil3d) / (suk3 - feil3d)
# e) utsatt ett år. Spreaden er nåverdien av det forventede fiaskotapet: spread = (1 − p) × 14/(1 + r_f)^T.
T3e = T3 + 1
g3e = (1 + rf3) ** T3e
assert near(spread3, (1 - p3) * gap3 / g3, 1e-12)
spread3e = (1 - p3) * gap3 / g3e                   # uendret p: tapet på 14 kommer senere, spreaden krymper
assert spread3e < spread3
p3e = 1 - spread3 * g3e / gap3                     # sannsynligheten som holder spreaden på 4,80
assert p3e < p3
assert near((1 - p3e) * gap3 / g3e, spread3, 1e-12)
vis("hint3-1 n3", g=g3, tilbud=tilbud3, premie=premie3, spread=spread3, suk=suk3, feil=feil3, SE=SE3, p=p3,
    selv_suk=selv_suk3, selv_feil=selv_feil3, p_felle=p3_felle, p_helaar=p3_helaar, p_enkel=p3_enkel,
    feil_d=feil3d, p_d=p3d, p_d_felle=p3d_felle, g_e=g3e, spread_e=spread3e, p_e=p3e)

# ======================================================================
#  hint3-1 n4: Gimsøy Rederi, CDS med kupongobligasjon
# ======================================================================
F4, kup4, P4, R4, pD4, rf4 = 100.0, 0.07, 96.80, 45.0, 0.06, 0.04
lov4 = F4 * (1 + kup4)                              # lovet betaling 107
assert near(lov4, 107.0)
y4 = lov4 / P4 - 1
y4_felle = F4 / P4 - 1                              # glemt kupongen
rfverdi4 = lov4 / (1 + rf4)
gap4 = rfverdi4 - P4
assert y4_felle < rf4 < y4
# b) forventet avkastning med analytikernes 6 %
Epay4 = (1 - pD4) * lov4 + pD4 * R4
Er4 = Epay4 / P4 - 1
assert rf4 < Er4 < y4 and Er4 < 0.20
# c) ρ = risikonøytral sannsynlighet for mislighold (nederste gren)
FV4 = P4 * (1 + rf4)
tap4 = lov4 - R4                                    # 62
rho4 = (lov4 - FV4) / tap4
assert near(((1 - rho4) * lov4 + rho4 * R4) / (1 + rf4), P4, 1e-12)
assert pD4 < rho4 < 1 and rho4 / pD4 < 4
CDS4 = rho4 / (1 + rf4)
CDS4_felle = (1 - rho4) / (1 + rf4)                 # overlevelse brukt som mislighold
CDS4_sann = pD4 / (1 + rf4)
rho4_utenkup = (F4 - FV4) / (F4 - R4)               # glemt kupongen: negativ
assert rho4_utenkup < 0
# d) sikring: 62 kontrakter per obligasjon
nCDS4 = tap4
kost4 = nCDS4 * CDS4
sikret4 = P4 + kost4
assert near(nCDS4, 62.0)
assert near(sikret4, rfverdi4, 1e-12)                # obligasjon + CDS = risikofri krav på 107
assert near(kost4, gap4, 1e-12)                       # beskyttelsen = verdien av misligholdsrisikoen
sikret4_55 = P4 + (F4 - R4) * CDS4                   # fellen: 55 kontrakter
assert abs(sikret4_55 - rfverdi4) > 0.5
sikret4_felle = P4 + nCDS4 * CDS4_felle
sikret4_sann = P4 + nCDS4 * CDS4_sann                # med 6 %: billigere enn risikofritt, arbitrasje
assert sikret4_sann < rfverdi4 - 1
vis("hint3-1 n4", lov=lov4, y=y4, y_felle=y4_felle, rfverdi=rfverdi4, gap=gap4, Epay=Epay4, Er=Er4,
    FV=FV4, rho=rho4, rho_over_p=rho4 / pD4, CDS=CDS4, CDS_felle=CDS4_felle, CDS_sann=CDS4_sann,
    rho_utenkup=rho4_utenkup, kost=kost4, sikret=sikret4, sikret_55=sikret4_55, sikret_felle=sikret4_felle,
    sikret_sann=sikret4_sann)

# ======================================================================
#  hint3-3 n2: innendørsgolf i Mo i Rana, exit etter 18 måneder
# ======================================================================
I2, drift2, inn_g2, inn_b2, p2, ra2, N2 = 1_800_000.0, 105_000.0, 130_000.0, 85_000.0, 0.40, 0.05, 18
rm2 = (1 + ra2) ** (1 / 12) - 1
rm2_nom = ra2 / 12                                   # fellen: 5 %/12
cg2, cb2 = inn_g2 - drift2, inn_b2 - drift2
assert cg2 == 25_000 and cb2 == -20_000
Ec2 = p2 * cg2 + (1 - p2) * cb2
assert near(Ec2, -2_000)
# a) bundet for alltid
PVE2 = Ec2 / rm2
NPV2_uten = PVE2 - I2
assert NPV2_uten < 0
NPV2_nom = Ec2 / rm2_nom - I2
# b) exit etter 18 måneder i den dårlige tilstanden
PVg2 = cg2 / rm2
NPV2_g = PVg2 - I2
A18 = A(N2, rm2)
tap18 = -cb2 * A18
NPV2_b = -I2 - tap18
NPV2_exit = p2 * NPV2_g + (1 - p2) * NPV2_b
assert NPV2_g > 0 > NPV2_b and NPV2_exit > 0
bli2 = -cb2 / rm2                                    # verdien ved måned 18 av tapene ved å bli
assert bli2 > 0
NPV2_g_nom = cg2 / rm2_nom - I2
NPV2_exit_nom = p2 * NPV2_g_nom + (1 - p2) * (cb2 * A(N2, rm2_nom) - I2)
# c) verdien av klausulen: mot 0, ikke mot den negative NPV-en
verdi2 = NPV2_exit - max(NPV2_uten, 0)
feil2 = NPV2_exit - NPV2_uten
vekst18 = (1 + rm2) ** N2
assert near(vekst18, (1 + ra2) ** 1.5, 1e-12)
hale2 = (1 - p2) * bli2 / vekst18
assert near(feil2, hale2, 1e-6)                      # klausulen verdt for en som er bundet
# d) høyeste oppsigelsesgebyr (betales bare i den dårlige tilstanden, ved måned 18)
Fmax2 = verdi2 * vekst18 / (1 - p2)
assert near(NPV2_exit - (1 - p2) * Fmax2 / vekst18, 0, 1e-6)
assert Fmax2 < bli2                                  # det lønner seg fortsatt å stenge
Fmax2_begge = verdi2 * vekst18                        # fellen: gebyr i begge tilstander
Fmax2_udisk = verdi2 / (1 - p2)                       # fellen: ikke diskontert
assert abs(Fmax2_begge / Fmax2 - 1) > 0.1 and abs(Fmax2_udisk / Fmax2 - 1) > 0.05
# e) den dårlige tilstanden uten klausul
NPV2_b_uten = -I2 + cb2 / rm2
vis("hint3-3 n2", rm=rm2, PVE=PVE2, NPV_uten=NPV2_uten, NPV_nom=NPV2_nom, PVg=PVg2, NPV_g=NPV2_g, A18=A18,
    tap18=tap18, NPV_b=NPV2_b, NPV_exit=NPV2_exit, NPV_exit_nom=NPV2_exit_nom, bli=bli2, verdi=verdi2,
    feil=feil2, vekst18=vekst18, Fmax=Fmax2, Fmax_begge=Fmax2_begge, Fmax_udisk=Fmax2_udisk, NPV_b_uten=NPV2_b_uten)

# ======================================================================
#  hint3-3 n3: budkamp om grossist D, deretter coinsurance
# ======================================================================
alene = {"A": 250, "B": 200, "C": 160, "D": 120}
syn = {"A": 50, "B": 40, "C": 30}
tapt = {"A": 5, "B": 10, "C": 30}                     # tap hvis en rival får D
kjoper = ["A", "B", "C"]
med = {k: {j: (alene[j] + alene["D"] + syn[j] if j == k else alene[j] - tapt[j]) for j in kjoper} for k in kjoper}
assert med["A"] == {"A": 420, "B": 190, "C": 130}
assert med["B"] == {"A": 245, "B": 360, "C": 130}
assert med["C"] == {"A": 245, "B": 190, "C": 310}
# a) maksbud mot alternativet (en rival vinner), ikke mot frittstående verdi
alt3 = {j: [med[k][j] for k in kjoper if k != j] for j in kjoper}
assert all(len(set(v)) == 1 for v in alt3.values())   # samme alternativ uansett hvilken rival
maks3 = {j: med[j][j] - alt3[j][0] for j in kjoper}
maks3_felle = {j: med[j][j] - alene[j] for j in kjoper}
assert maks3 == {"A": 175, "B": 170, "C": 180}
assert maks3_felle == {"A": 170, "B": 160, "C": 150}
# b) stigende auksjon: vinneren betaler nest høyeste maksbud
vinner3 = max(maks3, key=maks3.get)
pris3 = sorted(maks3.values())[-2]
assert vinner3 == "C" and pris3 == 175
assert max(maks3_felle, key=maks3_felle.get) == "A"   # fellen gir feil vinner
endr3 = {"D": pris3 - alene["D"]}
for j in kjoper:
    endr3[j] = med[vinner3][j] - (pris3 if j == vinner3 else 0) - alene[j]
assert endr3 == {"D": 55, "A": -5, "B": -10, "C": -25}
bransje3 = sum(med[vinner3].values()) - sum(alene.values())
assert sum(endr3.values()) == bransje3 == 15
assert med[vinner3][vinner3] - pris3 > alt3[vinner3][0]   # C har det bedre enn om A vant
# c) coinsurance: Gjesvær (eksport) og Vangen (import); sterk krone 0,4, svak 0,6
q = (0.4, 0.6)
VG, VV = (30, 140), (90, 25)
FG, FV_ = 65, 40


def gjeld(v, fv):
    return sum(qq * min(x, fv) for qq, x in zip(q, v))


def ek(v, fv):
    return sum(qq * max(x - fv, 0) for qq, x in zip(q, v))


DG, EG, DV, EV = gjeld(VG, FG), ek(VG, FG), gjeld(VV, FV_), ek(VV, FV_)
assert near(DG, 51) and near(EG, 45) and near(DV, 31) and near(EV, 20)
assert near(DG + EG, sum(qq * x for qq, x in zip(q, VG))) and near(DV + EV, sum(qq * x for qq, x in zip(q, VV)))
assert VG[0] < FG < VG[1] and VV[1] < FV_ < VV[0]      # hvert firma misligholder i sin dårlige tilstand
# d) sammenslått, ingen synergier
VM = tuple(a + b for a, b in zip(VG, VV))
FM = FG + FV_
assert min(VM) > FM                                      # gjelden blir risikofri
DM, EM = gjeld(VM, FM), ek(VM, FM)
assert near(DM, FM) and near(EM, 42)
assert near(DM + EM, DG + EG + DV + EV)                  # ingen verdi skapt
EG_etter = EG / (EG + EV) * EM
EV_etter = EM - EG_etter
dEG, dEV = EG_etter - EG, EV_etter - EV
dDG, dDV = FG - DG, FV_ - DV
overf3 = dDG + dDV
assert near(overf3, -(dEG + dEV), 1e-12) and near(overf3, 23)
assert dEG < 0 and dEV < 0
# betingelsen i e: ingen gevinst for kreditorene samlet når det ikke finnes noen tilstand der ett firma
# misligholder mens det andre har egenkapital igjen (her misligholder begge i samme tilstand)
VG_k, VV_k = (30, 140), (25, 90)
assert near(gjeld(tuple(a + b for a, b in zip(VG_k, VV_k)), FM), gjeld(VG_k, FG) + gjeld(VV_k, FV_))
# moteksempel (blindkontrollen): perfekt korrelert, men ett firma har egenkapital igjen når det andre
# misligholder, så kreditorene samlet får 100 mot 90 i den dårlige tilstanden
mot_V1, mot_V2, mot_F1, mot_F2 = (100, 50), (100, 50), 40, 80   # samme gode og dårlige tilstand
mot_for = min(mot_V1[1], mot_F1) + min(mot_V2[1], mot_F2)          # dårlig tilstand før: 40 + 50
mot_etter = min(mot_V1[1] + mot_V2[1], mot_F1 + mot_F2)            # etter: 100
assert mot_for == 90 and mot_etter == 100 and mot_V1[1] > mot_F1   # firma 1 har egenkapital igjen
vis("hint3-3 n3", maks=maks3, maks_felle=maks3_felle, vinner=vinner3, pris=pris3, endr=endr3, bransje=bransje3,
    DG=DG, EG=EG, DV=DV, EV=EV, VM=VM, FM=FM, DM=DM, EM=EM, EG_etter=EG_etter, EV_etter=EV_etter, dEG=dEG,
    dEV=dEV, dDG=dDG, dDV=dDV, overf=overf3)


# ======================================================================
#                              TEKSTENE
# ======================================================================
X = "×"

# ---------------------------------------------------------------- hint3-1 n3
ex_31_3 = {
    "n": 3, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Forelesning 16 (M&A), 1:11:07: «it can literally be an exam question and it has been»",
    "body": (
        "<p>In March, rumours spread that Hvalstad Data ASA (A) would bid for Lomsdal Systemer ASA (B). "
        "Before the rumours the share prices were P<sub>A,0</sub> = NOK 45.00 and "
        "P<sub>B,0</sub> = NOK 58.00. Today A has made a formal offer: if the deal goes through, each share "
        "of B will be exchanged for 1.6 new shares of A. The deal will be completed or will fail in exactly "
        "9 months. Today's prices are P<sub>A,1</sub> = NOK 47.50 and P<sub>B,1</sub> = NOK 71.20.</p>"
        "<p>The risk-free rate is 4.5% per year. Short selling is allowed. If the deal fails, assume that "
        "both prices return to their levels before the rumours. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": (
             "<p>What is A's offer worth per share of B at today's prices? What premium, in percent, is that "
             "over B's price before the rumours? What is the spread in NOK between the offer and B's price "
             "today?</p>"),
         "solution": (
             "<p>Each B share becomes 1.6 A shares, so at today's price of A:</p>"
             f"<p>Offer = 1.6 {X} 47.50 = <b>NOK {f(tilbud3, 2)}</b> per B share<br>"
             f"Premium over the pre-rumour price = {f(tilbud3, 2)}/58.00 − 1 = <b>{pc(premie3)}</b> "
             f"(NOK {f(tilbud3 - PB0, 2)} per share)<br>"
             f"Spread = {f(tilbud3, 2)} − 71.20 = <b>NOK {f(spread3, 2)}</b> ({pc(spread3 / PB1)} of today's "
             "price)</p>"
             "<p>B trades below the offer because the deal may fail; if it does, B falls back towards 58. Parts "
             "(b) and (c) turn the size of this spread into a probability.</p>"),
         "criteria": [
             f"Offer = 1.6 {X} 47.50 = {f(tilbud3, 2)} per B share, valued at A's price today. 1.6 {X} 45 = 72 is the value if the deal fails, not the offer.",
             f"Premium = {f(tilbud3, 2)}/58.00 − 1 = {pc(premie3)} over the pre-rumour price.",
             f"Spread = {f(tilbud3, 2)} − 71.20 = {f(spread3, 2)} ({pc(spread3 / PB1)} of today's price).",
             "Bonus: explains that B trades below the offer because the deal may fail.",
         ]},
        {"label": "b", "points": 5,
         "body": (
             "<p>Build a position that profits from the spread: buy one share of B, short-sell the A shares it "
             "would be exchanged for and invest the proceeds at the risk-free rate. What is the position worth "
             "in 9 months if the deal goes through? What is it worth if the deal fails?</p>"),
         "solution": (
             "<p><b>Step 1. The 9-month factor.</b> Discrete compounding for 0.75 of a year: "
             f"(1.045)<sup>0.75</sup> = <b>{f(g3, 6)}</b>.</p>"
             "<p><b>Step 2. The position today.</b></p>"
             + tab(["Leg", "Action", "Cash flow today"],
                   [["Long target", "Buy 1 share of B at 71.20", f(-PB1)],
                    ["Short acquirer", "Short-sell 1.6 shares of A at 47.50", "+" + f(tilbud3)],
                    ["Risk-free", f"Invest the {f(tilbud3, 2)} for 9 months", f(-tilbud3)],
                    ["<b>Net outlay</b>", "", f"<b>{f(-PB1)}</b>"]])
             + "<p><b>Step 3. Success.</b> The B share is exchanged for exactly the 1.6 A shares needed to "
             f"close the short. You keep the deposit: {f(tilbud3, 2)} {X} {f(g3, 6)} = <b>{f(suk3)}</b>.</p>"
             "<p><b>Step 4. Failure.</b> Prices return to 45 and 58. You sell the B share for 58, buy back "
             f"1.6 A shares for 1.6 {X} 45 = 72 and keep the deposit: {f(suk3)} + 58 − 72 = "
             f"<b>{f(feil3)}</b>.</p>"
             f"<p>The two payoffs differ by 72 − 58 = {f(gap3, 0)}, the gap between the two pre-rumour "
             "values of one B share.</p>"),
         "criteria": [
             f"Uses discrete compounding for 9 months: 1.045^0.75 = {f(g3, 6)}, not 1.045.",
             f"Long 1 B, short 1.6 A (the exchange ratio) and the proceeds of {f(tilbud3, 2)} invested at the risk-free rate; the net outlay is B's price, 71.20. Other consistent constructions are accepted, for example Kurbatov's self-financed version (buy B with the short proceeds and deposit the remaining {f(spread3, 2)}), whose payoffs are {f(selv_suk3)} and {f(selv_feil3)}.",
             f"Success: the B share converts into the A shares that close the short, so the position is worth the deposit, {f(tilbud3, 2)} {X} {f(g3, 6)} = {f(suk3)}.",
             f"Failure: {f(suk3)} + 58 − 72 = {f(feil3)}, using the pre-rumour prices for both shares.",
             "Shows the construction and both payoffs, not only the numbers.",
         ]},
        {"label": "c", "points": 5,
         "body": "<p>What probability of completion do today's prices imply?</p>",
         "solution": (
             "<p><b>Step 1. Certainty equivalent.</b> The position costs 71.20 today. Without arbitrage, its "
             "risk-neutral expected value in 9 months is that cost grown at the risk-free rate: "
             f"71.20 {X} {f(g3, 6)} = <b>{f(SE3)}</b>. Plugging in 71.20 itself is the classic error.</p>"
             f"<p><b>Step 2. Solve.</b> {f(SE3)} = p {X} {f(suk3)} + (1 − p) {X} {f(feil3)}<br>"
             f"p = ({f(SE3)} − {f(feil3)})/({f(suk3)} − {f(feil3)}) = {f(SE3 - feil3)}/{f(gap3)} = "
             f"<b>{f(p3)}</b> ({pc(p3)})</p>"
             "<p><b>Check.</b> Kurbatov's self-financed version gives the same: short 1.6 A for 76.00, buy B "
             f"for 71.20 and deposit the {f(spread3, 2)}. It costs 0 today and is worth {f(spread3, 2)} {X} "
             f"{f(g3, 6)} = {f(selv_suk3)} on success and {f(selv_suk3)} + 58 − 72 = {f(selv_feil3)} on "
             f"failure. Then 0 = p {X} {f(selv_suk3)} + (1 − p) {X} ({f(selv_feil3)}) gives p = "
             f"{f(-selv_feil3)}/{f(gap3)} = {f(p3_selv)} ✓. The two constructions share their inputs, so "
             "the check catches arithmetic slips, not a wrong reversion assumption.</p>"
             f"<p><b>The traps.</b> Using 71.20 instead of the certainty equivalent gives {f(p3_felle)}. The "
             f"full-year factor 1.045 gives {f(p3_helaar)}. Simple interest, 1 + 0.045 {X} 0.75, gives "
             f"{f(p3_enkel)}: close enough, but the course uses (1 + r<sub>f</sub>)<sup>T</sup>.</p>"),
         "criteria": [
             f"Certainty equivalent: 71.20 {X} {f(g3, 6)} = {f(SE3)}. Plugging in 71.20 gives {f(p3_felle)}, which is wrong (Kurbatov's H2025 key: very important not to just plug in the price).",
             f"Sets up {f(SE3)} = p({f(suk3)}) + (1 − p)({f(feil3)}) and solves p = {f(SE3 - feil3)}/14 = {f(p3)}.",
             f"Uses (1 + r_f)^T with T = 0.75. The full-year factor 1.045 gives {f(p3_helaar)}; reasonable approximations of the 9-month factor are fine.",
             f"Bonus: confirms p with the self-financed construction (cost 0, payoffs {f(selv_suk3)} and {f(selv_feil3)}).",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>Why might B's price not fall all the way back to 58 if the deal fails? Suppose B would then "
             "trade at NOK 62.00, while A still returns to NOK 45.00. What probability of completion do "
             "today's prices imply now? Explain the direction of the change.</p>"),
         "solution": (
             "<p><b>Why B may not fall back.</b> The bid can reveal that B is worth more than the market "
             "thought: A has studied B closely and is willing to pay a premium. It can also attract other "
             "bidders. And B keeps operating for 9 months, so news about its business moves its fall-back "
             "value away from the old 58.</p>"
             f"<p><b>New failure payoff:</b> {f(suk3)} + 62 − 72 = {f(feil3d)}. The success payoff "
             f"({f(suk3)}) and the certainty equivalent ({f(SE3)}) are unchanged.</p>"
             f"<p>p = ({f(SE3)} − {f(feil3d)})/({f(suk3)} − {f(feil3d)}) = {f(SE3 - feil3d)}/"
             f"{f(suk3 - feil3d)} = <b>{f(p3d)}</b></p>"
             f"<p><b>Direction.</b> The probability falls from {f(p3)} to {f(p3d)}. B's price of 71.20 is a "
             "risk-neutral average of what B is worth on success and on failure. If failure costs less, a "
             "lower chance of success is enough to explain the same price. Assuming full reversion when B "
             "would in fact stay higher therefore overstates the market's probability.</p>"),
         "criteria": [
             "Gives a reason why B need not fall back: the bid reveals that B is undervalued, it may attract other bidders, or B's business changes over the 9 months.",
             f"New failure payoff {f(suk3)} + 62 − 72 = {f(feil3d)}; success {f(suk3)} and certainty equivalent {f(SE3)} unchanged.",
             f"p = {f(SE3 - feil3d)}/{f(suk3 - feil3d)} = {f(p3d)}.",
             "Explains the direction: a less costly failure needs a lower probability of success to justify B's price, so the full-reversion assumption overstates p.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Suppose instead that the completion date is postponed by one year, to 21 months from today. "
             "Assume first that the market's probability of completion is unchanged. What happens to the "
             "spread? Why might the market nevertheless revise the probability? What would that do to the "
             "spread? Briefly explain.</p>"),
         "solution": (
             "<p><b>Unchanged probability: the spread narrows slightly.</b> Kurbatov's self-financed position "
             "shows what the spread pays for. You receive the spread today and deposit it; on failure you "
             "also lose 72 − 58 = 14. Priced risk-neutrally, 0 = spread × (1 + r<sub>f</sub>)<sup>T</sup> − "
             "(1 − p) × 14, so spread = (1 − p) × 14/(1 + r<sub>f</sub>)<sup>T</sup>. Today: "
             f"{f(1 - p3, 6)} × 14/{f(g3, 6)} = {f(spread3)} ✓. With T = 1.75 and p unchanged: "
             f"{f(1 - p3, 6)} × 14/{f(g3e, 6)} = <b>{f(spread3e)}</b>. The loss on failure comes later and is "
             "discounted more, so a smaller spread is enough.</p>"
             "<p><b>Why the probability may change.</b> A longer wait usually means more can go wrong: "
             "regulators may block the deal, financing or A's shareholders may turn, or bad news may hit B. If "
             "the market lowers p, the spread widens again. It ends above today's 4.80 only if p falls below "
             f"{f(p3e)}, the probability that keeps the spread at 4.80 with T = 1.75: the deposited spread "
             "now grows for longer, so a higher probability of failure is needed to offset it.</p>"
             "<p>Kurbatov raised this kind of tail in the wrap-up (recording 18, 5:29): «What if we can delay "
             "this M&amp;A by one year? How would you treat it?» An intuition-based answer is what is "
             "expected.</p>"
             "<p><b>Also accepted.</b> The reversion assumption becomes weaker, since pre-rumour prices are a "
             "poorer guide to failure prices 21 months later. As a practical point outside the model, "
             "arbitrageurs' capital is tied up longer in a position that is not risk-free (limits to "
             "arbitrage).</p>"),
         "criteria": [
             f"With p unchanged the spread narrows slightly, to (1 − p) × 14/1.045^1.75 = {f(spread3e)}, because the loss of 14 on failure comes later and is discounted more. The direction with this reason earns the point; the number is not required.",
             "Explains why the market may revise p downwards: more can go wrong over a longer horizon (regulators, financing, A's shareholders, news about B).",
             f"A lower p widens the spread; it ends above today's 4.80 only if p falls below {f(p3e)}.",
             "Also accepted for one of the points: the reversion assumption becomes weaker after 21 months. Tied-up arbitrage capital counts only as a practical limit to arbitrage. Claiming that time value alone widens the spread is wrong for a stock swap.",
         ]},
    ]}

# ---------------------------------------------------------------- hint3-1 n4
ex_31_4 = {
    "n": 4, "title": "Credit Risk", "points": 20,
    "topic": "Risky debt and credit default swaps", "chapters": [5, 22, 24],
    "merke": "Forelesning 13 (Options II), 18:06: «a very similar example could be in the exam»",
    "body": (
        "<p>Gimsøy Rederi ASA has issued one-year bonds with a face value of NOK 100 and a coupon of 7%. The "
        "coupon is paid at maturity together with the face value. A bond trades today at NOK 96.80. Default "
        "can only happen at maturity. If Gimsøy defaults, a bondholder receives NOK 45 per bond and no "
        "coupon. Rating analysts estimate the probability of default at 6%. The one-year risk-free rate "
        "is 4%.</p>"
        "<p>A credit default swap (CDS) contract on Gimsøy pays NOK 1 at the end of the year if Gimsøy "
        "defaults and nothing otherwise. Its price is paid today. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": (
             "<p>What is the bond's promised yield to maturity? What would the bond be worth today if its "
             "payments were risk-free?</p>"),
         "solution": (
             f"<p>The bond promises 100 + 7 = <b>{f(lov4, 0)}</b> in one year.</p>"
             f"<p>Promised yield = {f(lov4, 0)}/96.80 − 1 = <b>{pc(y4)}</b><br>"
             f"Risk-free value = {f(lov4, 0)}/1.04 = <b>NOK {f(rfverdi4)}</b></p>"
             f"<p>The gap, {f(rfverdi4)} − 96.80 = {f(gap4)}, is what the default risk costs a bondholder "
             "today. It comes back in (d).</p>"),
         "criteria": [
             f"Promised payment 100 + 7 = {f(lov4, 0)}, not 100.",
             f"Promised yield {f(lov4, 0)}/96.80 − 1 = {pc(y4)}. Using 100 gives {pc(y4_felle)}, below the risk-free rate, a sign that the coupon is missing.",
             f"Risk-free value {f(lov4, 0)}/1.04 = {f(rfverdi4)}.",
         ]},
        {"label": "b", "points": 4,
         "body": (
             "<p>What is the expected return on the bond? Compare it with the promised yield and the "
             "risk-free rate. Explain briefly.</p>"),
         "solution": (
             "<p>The expected return uses the payment the bond is expected to make with the analysts' "
             "probability, not the promised one:</p>"
             f"<p>E[payoff] = 0.94 {X} 107 + 0.06 {X} 45 = {f(0.94 * lov4, 2)} + {f(0.06 * R4, 2)} = "
             f"<b>{f(Epay4, 2)}</b><br>"
             f"Expected return = {f(Epay4, 2)}/96.80 − 1 = <b>{pc(Er4)}</b></p>"
             f"<p>The yield of {pc(y4)} is earned only if Gimsøy does not default, so the expected return "
             f"is lower: {pc(y4)} − {pc(Er4)} = {f(100 * (y4 - Er4), 2)} points is the expected default loss. "
             f"The expected return is still above the risk-free 4%, by {f(100 * (Er4 - rf4), 2)} points. That "
             "is a risk premium: Gimsøy is most likely to default in a shipping slump, which tends to come in "
             "bad times for the whole economy, so the default risk is systematic.</p>"),
         "criteria": [
             f"Expected payoff 0.94 {X} 107 + 0.06 {X} 45 = {f(Epay4, 2)} with the analysts' probability.",
             f"Expected return {f(Epay4, 2)}/96.80 − 1 = {pc(Er4)}.",
             f"Below the {pc(y4)} yield: the yield is the promised return, earned only if Gimsøy does not default.",
             f"Above the risk-free 4%: default risk is systematic (defaults cluster in bad times), so bondholders earn a risk premium of {f(100 * (Er4 - rf4), 2)} points.",
         ]},
        {"label": "c", "points": 6,
         "body": (
             "<p>What is the risk-neutral probability that Gimsøy defaults, as implied by the bond price? "
             "What is the price of one CDS contract?</p>"),
         "solution": (
             "<p><b>Step 1. The tree.</b> Let ρ be the risk-neutral probability of <b>default</b> and put it "
             "in the bottom branch. No default (1 − ρ): the bond pays 107 and the CDS 0. Default (ρ): the bond "
             "pays 45 and the CDS 1.</p>"
             "<p><b>Step 2. Price the bond risk-neutrally.</b> The expected payoff under ρ, discounted at the "
             "risk-free rate, must equal the market price:</p>"
             f"<p>[(1 − ρ) {X} 107 + ρ {X} 45]/1.04 = 96.80<br>"
             f"107 − 62ρ = 96.80 {X} 1.04 = {f(FV4)}<br>"
             f"ρ = {f(lov4 - FV4)}/62 = <b>{f(rho4)}</b> ({pc(rho4)})</p>"
             "<p><b>Step 3. Price the CDS</b> with the same ρ and the risk-free rate. It pays 1 only in the "
             "default branch:</p>"
             f"<p>CDS = [(1 − ρ) {X} 0 + ρ {X} 1]/1.04 = {f(rho4, 6)}/1.04 = <b>NOK {f(CDS4)}</b> per "
             f"contract ({f(CDS4, 6)} unrounded)</p>"
             "<p><b>The traps.</b> Writing ρ × 107 + (1 − ρ) × 45 makes ρ the survival probability "
             f"({f(1 - rho4)}). Carrying that number into the CDS as if it were the default probability gives "
             f"{f(CDS4_felle)}, almost nine times too much. Either convention works if it is kept to the end. "
             f"Forgetting the coupon (100 instead of 107) gives ρ = {f(rho4_utenkup)}, which is impossible. "
             f"Using the analysts' 6% with the risk-free rate gives {f(CDS4_sann)}, which underprices the "
             "protection.</p>"),
         "criteria": [
             "States the pricing condition: the expected payoff under risk-neutral probabilities, discounted at the risk-free rate, equals the market price.",
             f"Sets up [(1 − rho)(107) + rho(45)]/1.04 = 96.80 and finds rho = {f(lov4 - FV4)}/62 = {f(rho4)} as the probability of default.",
             "Discounts at the risk-free 4%, not at the promised yield.",
             f"CDS = rho/1.04 = {f(CDS4)} per contract.",
             f"Keeps rho as the default probability to the end: the survival probability {f(1 - rho4)} in the CDS gives {f(CDS4_felle)}, which is wrong. Kurbatov (Options II recording, 27:31 to 32:24) said more than half of a class lost points on exactly this.",
             f"Uses the risk-neutral probability, not the analysts' 6% (which would give {f(CDS4_sann)}).",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>How many CDS contracts must the holder of one bond buy to make the bond risk-free? What do the "
             "contracts cost? What is the bond together with the contracts worth today? Compare with your "
             "answer in (a).</p>"),
         "solution": (
             "<p>In default the bondholder receives 45 instead of the promised 107, a loss of 107 − 45 = 62. "
             f"Each contract pays 1, so the holder needs <b>{f(nCDS4, 0)} contracts</b> per bond (Kurbatov's "
             "λ, the exposure in default).</p>"
             f"<p>Cost = 62 {X} {f(CDS4, 6)} = <b>NOK {f(kost4)}</b><br>"
             f"Bond plus contracts = 96.80 + {f(kost4)} = <b>NOK {f(sikret4)}</b></p>"
             "<p><b>Check.</b> The hedged bond pays 107 without default and 45 + 62 = 107 with default, so it "
             f"is a risk-free claim on 107, worth 107/1.04 = {f(rfverdi4)} as in (a) ✓. The contracts cost "
             f"exactly the gap of {f(gap4)} from (a): the protection is worth what the default risk takes off "
             "the bond's price. The check fails with the survival probability from the trap in (c) (the "
             f"hedged bond would cost {f(sikret4_felle)}) and with 55 contracts (face value minus recovery), "
             f"which leaves 7 unhedged in default: 96.80 + 55 {X} {f(CDS4, 6)} = {f(sikret4_55)}.</p>"),
         "criteria": [
             "Hedges the loss in default against the promised payment: 107 − 45 = 62 contracts, not 100 − 45 = 55, because the coupon is lost too.",
             f"Cost 62 {X} {f(CDS4, 6)} = {f(kost4)}.",
             f"Bond plus contracts = 96.80 + {f(kost4)} = {f(sikret4)}, equal to the risk-free value in (a) because the hedged bond pays 107 in both states.",
             "Comments that the cost of the protection equals the gap between the risk-free value and the bond price.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>How does the default probability from (c) compare with the analysts' 6%? Explain the "
             "difference. Which of the two prices the CDS?</p>"),
         "solution": (
             f"<p>The risk-neutral probability, {pc(rho4)}, is about {f(rho4 / pD4, 1)} times the analysts' "
             "6%. Gimsøy is most likely to default in a shipping slump, which tends to come with a weak "
             "economy, when a krone is worth more to investors. They therefore demand a risk premium for "
             "holding the bond. Risk-neutral valuation keeps the risk-free rate in the denominator and moves "
             "that premium into the probabilities instead, which puts more weight on the default state.</p>"
             "<p>The CDS is a traded claim on the same default event, priced in the same market as the bond, "
             f"so it is priced with ρ = {pc(rho4)} and the risk-free rate. With 6% the CDS would cost "
             f"{f(CDS4_sann)} and the hedged bond 96.80 + 62 {X} {f(CDS4_sann, 6)} = {f(sikret4_sann)}, less "
             f"than a risk-free claim on 107 ({f(rfverdi4)}): an arbitrage.</p>"),
         "criteria": [
             f"States that rho ({pc(rho4)}) is higher than the real 6%.",
             "Explains why: default happens in bad times, so investors demand a risk premium, which risk-neutral valuation puts into the probability rather than the discount rate.",
             "Says that the CDS is priced with rho and the risk-free rate, never with the real probability and the risk-free rate.",
             "Bonus: with 6% the hedged bond would cost less than a risk-free claim on 107, an arbitrage.",
         ]},
    ]}

# ---------------------------------------------------------------- hint3-3 n1
ex_33_1 = {
    "n": 1, "title": "Real Options", "points": 10,
    "topic": "Real options", "chapters": [25, 23],
    "merke": "Forelesning 14 (Options III), 9:19: «imagine that this is an exam question»",
    "body": (
        "<p>Kaja Brenden has built an app that matches farmers with seasonal workers. She can launch it "
        "nationwide now or wait one year and decide then. At today's numbers, launching now has a positive "
        "NPV. Her co-founder says: «Options are contracts traded on the stock exchange. They have nothing to "
        "do with our launch.»</p>"
        "<p>(i) Give three examples of an option to wait from three different areas, for example business, "
        "natural resources and personal life. For each, say in 1-2 sentences what the holder can do but is "
        "not forced to do. (3 points)<br>"
        "(ii) What does it cost Kaja to wait a year? Name two different costs. (2 points)<br>"
        "(iii) Comparable listed app companies have a return volatility of either about 15% or about 60%. "
        "How does each case affect the choice between launching now and waiting? (4 points)<br>"
        "(iv) Is the co-founder right? (1 point)</p>"
        "<p>No calculations are needed. 3-5 sentences should be enough for (iii).</p>"),
    "solution": (
        "<p><b>(i) Three options to wait.</b></p>"
        "<ul><li><b>Business: a plot of land with a building permit.</b> The owner can build a warehouse when "
        "demand looks strong enough, or keep the land empty and decide later; nothing forces construction "
        "now.</li>"
        "<li><b>Natural resources: an oil field or a mining licence.</b> The licence holder can start "
        "extraction when prices are high and leave the resource in the ground while they are low.</li>"
        "<li><b>Personal life: further education.</b> After a bachelor's degree you can start a master's now, "
        "or work for a year, learn what you want and decide then.</li></ul>"
        "<p>Also accepted: a finished R&amp;D project kept on the shelf until the market is ready (Kurbatov's "
        "foldable phone example), option clauses in a football player's contract, a franchise right that can "
        "be used now or later.</p>"
        "<p><b>(ii) Costs of waiting.</b> Kaja gives up the first year's cash flows from the app. Competitors "
        "may launch a similar app in the meantime and take the market she would have had. Also accepted: the "
        "right to launch may lapse, or a later launch may cost more.</p>"
        "<p><b>(iii) Volatility.</b> Waiting has value because the uncertainty is resolved before Kaja "
        "commits: she keeps the upside and can walk away from the downside. With σ around 15% little is "
        "learned in a year (with σ = 0, nothing at all), so waiting mainly costs a year of cash flows and she "
        "should launch now. With σ around 60% the app may turn out much better or much worse than expected, "
        "so the option to wait is worth much more. It can exceed the NPV of launching now; then she should "
        "wait even though that NPV is positive.</p>"
        "<p>Also accepted in (iii): the comparable firms' volatility stands in for the uncertainty about the "
        "app's value; launching now gives up the option, so it pays only when the NPV today is high enough "
        "to outweigh the value of waiting.</p>"
        "<p><b>(iv) No.</b> Any right without an obligation is an option. The launch decision is a call on the "
        "app's value with the launch cost as the strike.</p>"),
    "criteria": [
        "(i) 3 points, 1 per example. Each must name a real decision with a right but no obligation to act now. The three must come from different areas. Two examples of the same kind (a factory and a warehouse) count once. A call or put traded on the stock exchange earns nothing: the question is about real options.",
        "(ii) 2 points, 1 per cost. Lost first-year cash flows and competitors moving in are the two Kurbatov names (Options III, 8:39); an expiring right or a higher later cost also counts. «It takes time» without a mechanism earns nothing.",
        "(iii) 2 points: low volatility favours launching now. Little uncertainty is resolved by waiting (edge case sigma = 0: waiting is worthless), so with a positive NPV the cost of waiting dominates.",
        "(iii) 2 points: high volatility can make waiting better even with a positive NPV, because waiting keeps the upside and lets Kaja walk away from the downside. The value of the option to wait rises with volatility.",
        "(iv) 1 point: the co-founder is wrong, because any right without an obligation is an option; the launch is a call on the app's value with the launch cost as the strike.",
        "No points for a Black-Scholes calculation: the question asks for intuition.",
    ]}

# ---------------------------------------------------------------- hint3-3 n2
r6 = f(rm2, 6)
ex_33_2 = {
    "n": 2, "title": "Real Options", "points": 20,
    "topic": "Real options", "chapters": [1, 25],
    "merke": "Forelesning 18 (Wrap-up), 1:08:19: «I had an exam question based on this premise»",
    "body": (
        "<p>You can open an indoor golf centre with simulators in Mo i Rana. The fit-out costs NOK 1,800,000, "
        "paid today. Rent, staff and other running costs are NOK 105,000 a month. Revenue will be either NOK "
        "130,000 a month forever (probability 40%) or NOK 85,000 a month forever (probability 60%). You will "
        "learn which right after opening. All cash flows come at the end of each month, the first one month "
        "from today. Demand for indoor golf is unrelated to the stock market, so discount at the risk-free "
        "rate of 5% per year (effective annual rate). Keep at least six decimals in the monthly rate.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": (
             "<p>What is the monthly discount rate? What is the NPV of opening if you must run the centre "
             "forever? Will you open it?</p>"),
         "solution": (
             "<p>The cash flows are monthly, so convert the annual rate: r<sub>m</sub> = "
             f"1.05<sup>1/12</sup> − 1 = <b>{r6}</b> ({pc(rm2, 4)} a month). Dividing 5% by 12 gives "
             f"{pc(rm2_nom, 4)}, which compounds to more than 5% a year.</p>"
             "<p>Net cash flow per month: 130,000 − 105,000 = +25,000 or 85,000 − 105,000 = −20,000.<br>"
             f"Expected = 0.4 {X} 25,000 + 0.6 {X} (−20,000) = <b>{kr(Ec2)}</b> a month<br>"
             f"NPV = {kr(Ec2)}/r<sub>m</sub> − 1,800,000 = {kr(PVE2)} − 1,800,000 = <b>{kr(NPV2_uten)} NOK</b></p>"
             "<p><b>Do not open.</b> Even before the fit-out, the expected monthly cash flow is negative.</p>"),
         "criteria": [
             f"Monthly rate from the effective annual rate: 1.05^(1/12) − 1 = {r6}. 5%/12 = {pc(rm2_nom, 4)} is wrong.",
             f"Nets the running costs first: +25,000 and −20,000 a month, expected {kr(Ec2)}.",
             f"NPV = {kr(Ec2)}/r_m − 1,800,000 = {kr(PVE2)} − 1,800,000 = {kr(NPV2_uten)}: do not open.",
         ]},
        {"label": "b", "points": 6,
         "body": (
             "<p>The landlord offers a lease that lets you close the centre at no cost at the end of month 18, "
             "after that month's cash flow. After that you pay nothing and receive nothing. What is the NPV of "
             "opening in each state and in expectation? Will you open?</p>"),
         "solution": (
             "<p>You still open before you know the state, so months 1 to 18 come in both states. After month "
             "18 you close only in the bad state.</p>"
             "<p><i>Good state:</i> you never close: NPV<sub>good</sub> = 25,000/r<sub>m</sub> − 1,800,000 = "
             f"{kr(PVg2)} − 1,800,000 = <b>{kr(NPV2_g)}</b></p>"
             f"<p><i>Bad state:</i> you close after month 18. A(18, {pc(rm2, 4)}) = [1 − (1 + r<sub>m</sub>)"
             f"<sup>−18</sup>]/r<sub>m</sub> = <b>{f(A18, 6)}</b><br>"
             f"NPV<sub>bad</sub> = −1,800,000 − 20,000 {X} {f(A18, 6)} = −1,800,000 − {kr(tap18)} = "
             f"<b>{kr(NPV2_b)}</b></p>"
             f"<p>Expected NPV = 0.4 {X} {kr(NPV2_g)} + 0.6 {X} ({kr(NPV2_b)}) = {f(p2 * NPV2_g, 1)} − "
             f"{f(-(1 - p2) * NPV2_b, 1)} = <b>{kr(NPV2_exit)} NOK</b>. <b>Open.</b></p>"
             "<p>Closing in the bad state is right: staying open after month 18 would cost 20,000/r<sub>m</sub> "
             f"= {kr(bli2)} in value at month 18, against 0 for closing.</p>"),
         "criteria": [
             "Takes months 1 to 18 in both states: you open before you know the state and can close only after month 18.",
             f"Good state unchanged, a perpetuity: {kr(PVg2)} − 1,800,000 = {kr(NPV2_g)}.",
             f"Bad state: A(18, {pc(rm2, 4)}) = {f(A18, 4)}, NPV = −1,800,000 − {kr(tap18)} = {kr(NPV2_b)}.",
             f"Expected NPV = 0.4({kr(NPV2_g)}) + 0.6({kr(NPV2_b)}) = {kr(NPV2_exit)}: open.",
             f"Uses the monthly rate throughout. With 5%/12 the expected NPV would be {kr(NPV2_exit_nom)}.",
         ]},
        {"label": "c", "points": 4,
         "body": ("<p>What is the lease clause worth to you, compared with your best choice without the clause? "
                  "Briefly explain.</p>"),
         "solution": (
             "<p>Without the clause you would not open (part a), so your alternative is to stay out and get "
             "0. The clause is worth</p>"
             f"<p>{kr(NPV2_exit)} − max({kr(NPV2_uten)}, 0) = {kr(NPV2_exit)} − 0 = <b>{kr(verdi2)} NOK</b></p>"
             f"<p>Comparing with the negative NPV from (a) gives {kr(NPV2_exit)} − ({kr(NPV2_uten)}) = "
             f"{kr(feil2)}. That is what the clause would be worth to someone already bound to run the centre "
             "forever: it equals the bad state's losses from month 19 on, "
             f"0.6 {X} {kr(bli2)}/1.05<sup>1.5</sup> = {kr(hale2)}. You are not bound, so you would never "
             f"accept the {kr(NPV2_uten)} in the first place. Kurbatov (wrap-up, 1:08) prices the option "
             "against the baseline case or against zero, whichever is higher.</p>"),
         "criteria": [
             f"Compares with 0, the best alternative without the clause, because the NPV in (a) is negative: value = {kr(verdi2)}.",
             f"Does not compare with the negative NPV: {kr(NPV2_exit)} − ({kr(NPV2_uten)}) = {kr(feil2)} is wrong here.",
             f"Explains that {kr(feil2)} would be the clause's value only to someone already committed to run the centre forever. A student who reports {kr(feil2)} but says clearly that it is the value compared with being bound forever earns this explanation point (not the number).",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>The landlord now asks for a termination fee, paid at the end of month 18 if you close. What is "
             "the highest fee at which you would still open? With that fee, would you still close in the bad "
             "state?</p>"),
         "solution": (
             "<p>You close only in the bad state, so the fee is paid with probability 0.6, 18 months from now. "
             "Opening stays worthwhile as long as</p>"
             f"<p>{kr(NPV2_exit)} − 0.6 {X} F/(1 + r<sub>m</sub>)<sup>18</sup> ≥ 0, where "
             f"(1 + r<sub>m</sub>)<sup>18</sup> = 1.05<sup>1.5</sup> = {f(vekst18, 6)}<br>"
             f"F ≤ {kr(NPV2_exit)} {X} {f(vekst18, 6)}/0.6 = <b>{kr(Fmax2)} NOK</b></p>"
             f"<p><b>Still close?</b> Yes. In the bad state, staying open after month 18 is worth "
             f"−20,000/r<sub>m</sub> = −{kr(bli2)} at month 18. Closing costs only the fee of {kr(Fmax2)}.</p>"
             f"<p><b>The traps.</b> Charging the fee in both states gives {kr(NPV2_exit)} {X} {f(vekst18, 6)} = "
             f"{kr(Fmax2_begge)}. Forgetting to discount gives {kr(NPV2_exit)}/0.6 = {kr(Fmax2_udisk)}.</p>"),
         "criteria": [
             "Charges the fee only in the bad state (probability 0.6), where you close.",
             f"Discounts the fee 18 months: 1.05^1.5 = {f(vekst18, 6)}.",
             f"F_max = {kr(NPV2_exit)} {X} {f(vekst18, 6)}/0.6 = {kr(Fmax2)}. The fee in both states ({kr(Fmax2_begge)}) or no discounting ({kr(Fmax2_udisk)}) is wrong.",
             f"Checks that closing is still optimal: {kr(Fmax2)} is far below the {kr(bli2)} that staying open would cost at month 18.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Your business partner says: «The clause is worthless. In the good state we never use it. In "
             "the bad state the centre is a poor business anyway.» Is your partner right? Explain briefly.</p>"),
         "solution": (
             "<p><b>No.</b> The clause is a right, not an obligation: you use it only when it helps. In the bad "
             "state it cuts a perpetual loss of 20,000 a month down to 18 months, so that state is worth "
             f"{kr(NPV2_b)} instead of −1,800,000 − {kr(bli2)} = {kr(NPV2_b_uten)}. You still lose money in "
             "that state, but far less. Because you decide before you know the state, the expected NPV is what "
             f"counts: the clause turns {kr(NPV2_uten)} into {kr(NPV2_exit)} and so decides whether the centre "
             "is opened at all. Like insurance, an option is valuable even if it is not used in every "
             "state.</p>"),
         "criteria": [
             "Says the partner is wrong: an option's value comes from the states where it is used. It is never used when that would hurt.",
             f"Explains that the clause cuts the bad state's perpetual losses to 18 months ({kr(NPV2_b)} instead of {kr(NPV2_b_uten)}).",
             "Notes that the decision is made before the state is known, so the expected NPV counts: the clause turns a negative-NPV decision into a positive one.",
         ]},
    ]}

# ---------------------------------------------------------------- hint3-3 n3
rad = lambda j: [j, str(alene[j])] + [str(med[k][j]) if j != "D" else "0" for k in kjoper]
tabell_bud = tab(["Firm", "Stand-alone", "A buys D", "B buys D", "C buys D"],
                 [rad("A"), rad("B"), rad("C"), ["D", "120", "0", "0", "0"]])
ex_33_3 = {
    "n": 3, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions", "chapters": [26, 24],
    "merke": ("Forelesning 16 (M&A), 1:26:04: «it could be easily the exam question» og 1:31:43: «It's like a "
              "hint from me, basically»"),
    "body": (
        "<p>Four grocery wholesalers, A, B, C and D, compete in Western Norway. D will be sold to one of A, "
        "B and C. The table shows each firm's value (NOK million) on its own and after each possible "
        "acquisition, before the price for D is paid.</p>"
        + tabell_bud),
    "parts": [
        {"label": "a", "points": 4,
         "body": "<p>What is the most each of A, B and C would pay for D? Explain what you compare with.</p>",
         "solution": (
             "<p>D will be sold in any case, so a bidder's alternative to winning is not its stand-alone value "
             "but its value when a rival wins. The most it will pay is the difference:</p>"
             + tab(["Bidder", "Value if it buys D", "Value if a rival buys D", "Maximum bid"],
                   [[j, str(med[j][j]), str(alt3[j][0]), f"<b>{maks3[j]}</b>"] for j in kjoper])
             + "<p>Each bidder's value when a rival wins is the same whichever rival it is, so each bidder has "
             "one alternative.</p>"
             f"<p><b>The trap.</b> Comparing with the stand-alone values gives 420 − 250 = {maks3_felle['A']}, "
             f"360 − 200 = {maks3_felle['B']} and 310 − 160 = {maks3_felle['C']}: D's value plus each "
             "bidder's synergy. That puts A first and C last, while C in fact bids the most: it ignores that C, "
             "the smallest, loses the most if a rival wins.</p>"),
         "criteria": [
             "Compares winning with losing to a rival, not with the stand-alone value, because D will be sold anyway (Kurbatov: bidding depends on alternatives).",
             f"A: 420 − 245 = {maks3['A']}.",
             f"B: 360 − 190 = {maks3['B']}.",
             f"C: 310 − 130 = {maks3['C']}.",
             f"Comparing with stand-alone values ({maks3_felle['A']}, {maks3_felle['B']}, {maks3_felle['C']}) is the classic error.",
         ]},
        {"label": "b", "points": 4,
         "body": (
             "<p>In an open ascending auction the winner pays the maximum bid of the last bidder to drop out. "
             "Who buys D? At what price? How much do D's shareholders and the winner's shareholders gain or "
             "lose against the stand-alone values? Briefly comment.</p>"),
         "solution": (
             f"<p>B drops out at {maks3['B']} and A at {maks3['A']}. <b>C buys D for {pris3}</b> (NOK million), "
             "just above A's maximum.</p>"
             f"<p>D's shareholders get {pris3} for a firm worth 120 on its own: <b>+{endr3['D']}</b>.<br>"
             f"C is worth 310 − {pris3} = {310 - pris3} after paying, against 160 on its own: "
             f"<b>{sg(endr3['C'], 0)}</b>.<br>"
             f"For completeness, A ends at 245 ({sg(endr3['A'], 0)}) and B at 190 ({sg(endr3['B'], 0)}).</p>"
             "<p><b>Comment.</b> C wins although its synergy is the smallest, because it has the most to lose: "
             f"without D it would fall to 130. C pays more than D adds to it ({maks3_felle['C']}), so its "
             "shareholders end up worse off than before D was put up for sale, but better off than if A had "
             f"won ({310 - pris3} &gt; 130). Competition among bidders who fear the alternative hands D's "
             "owners more than the whole synergy. Comparing with stand-alone values would wrongly predict "
             f"that A wins at {sorted(maks3_felle.values())[-2]}.</p>"
             f"<p><b>Check.</b> The changes sum to {endr3['D']} − {-endr3['C']} − {-endr3['A']} − "
             f"{-endr3['B']} = {sum(endr3.values())}, the value the deal adds to the four firms: "
             f"(245 + 190 + 310) − (250 + 200 + 160 + 120) = {bransje3} ✓.</p>"),
         "criteria": [
             f"C wins: B drops out at {maks3['B']} and A at {maks3['A']}, so C pays {pris3}.",
             f"D's shareholders gain {pris3} − 120 = {endr3['D']}.",
             f"C's shareholders: 310 − {pris3} = {310 - pris3} against 160 alone, a loss of {-endr3['C']}, but better than losing to A (130).",
             "Comments that C wins because its alternative is the worst, not because its synergy is the largest. It pays more than D adds to it.",
             f"Bonus: the changes sum to {bransje3}, the value the deal adds across the four firms.",
         ]},
        {"label": "c", "points": 4,
         "body": (
             "<p>Now consider two other firms. Gjesvær Sjømat ASA, a fish exporter, does well when the krone is "
             "weak; Vangen Import ASA, an electronics importer, when it is strong. In one year the krone is "
             "strong (probability 0.4) or weak (0.6). Values in one year (NOK million):</p>"
             + tab(["", "Strong krone", "Weak krone"], [["Gjesvær", "30", "140"], ["Vangen", "90", "25"]])
             + "<p>Gjesvær has zero-coupon debt with face value 65 and Vangen 40, both due in one year. Investors "
             "are risk-neutral and the risk-free rate is zero. What are the values today of each firm's debt "
             "and equity?</p>"),
         "solution": (
             "<p>State by state the creditors get min(V, F) and the shareholders max(V − F, 0):</p>"
             + tab(["", "Strong (0.4)", "Weak (0.6)", "Value today"],
                   [["Gjesvær debt", "30", "65", f"<b>{f(DG, 0)}</b>"],
                    ["Gjesvær equity", "0", "75", f"<b>{f(EG, 0)}</b>"],
                    ["Vangen debt", "40", "25", f"<b>{f(DV, 0)}</b>"],
                    ["Vangen equity", "50", "0", f"<b>{f(EV, 0)}</b>"]])
             + f"<p>For example, Gjesvær's debt: 0.4 {X} 30 + 0.6 {X} 65 = 12 + 39 = {f(DG, 0)}; equity "
             f"0.6 {X} 75 = {f(EG, 0)}. Vangen's debt: 0.4 {X} 40 + 0.6 {X} 25 = 16 + 15 = {f(DV, 0)}; "
             f"equity 0.4 {X} 50 = {f(EV, 0)}.</p>"
             "<p>Each firm defaults in its bad state, where the creditors take the whole firm and the "
             f"shareholders get 0. Debt plus equity equals firm value: {f(DG, 0)} + {f(EG, 0)} = "
             f"{f(DG + EG, 0)} = 0.4 {X} 30 + 0.6 {X} 140; {f(DV, 0)} + {f(EV, 0)} = {f(DV + EV, 0)} = "
             f"0.4 {X} 90 + 0.6 {X} 25 ✓.</p>"),
         "criteria": [
             "Payoffs state by state: the creditors get min(V, F), the shareholders max(V − F, 0).",
             f"Gjesvær: D = 0.4(30) + 0.6(65) = {f(DG, 0)}, E = 0.6(75) = {f(EG, 0)}.",
             f"Vangen: D = 0.4(40) + 0.6(25) = {f(DV, 0)}, E = 0.4(50) = {f(EV, 0)}.",
             "Bonus: notes that each firm defaults in its bad state, so its creditors bear part of the risk.",
         ]},
        {"label": "d", "points": 5,
         "body": (
             "<p>The firms merge without synergies. The merged firm takes over both debts, which rank equally. "
             "Its shares go to the old shareholders in proportion to their equity values from (c). What are "
             "the merged firm's debt and equity worth? What does each group of shareholders gain or lose? "
             "What do the creditors gain in total?</p>"),
         "solution": (
             f"<p><b>Step 1. The merged firm</b> is worth 30 + 90 = {VM[0]} with a strong krone and 140 + 25 = "
             f"{VM[1]} with a weak krone. Its debt has a total face value of 65 + 40 = {FM}, which it can pay "
             "in both states.</p>"
             f"<p>Debt = <b>{f(DM, 0)}</b> (now risk-free)<br>"
             f"Equity = 0.4 {X} ({VM[0]} − {FM}) + 0.6 {X} ({VM[1]} − {FM}) = {f(0.4 * (VM[0] - FM), 0)} + "
             f"{f(0.6 * (VM[1] - FM), 0)} = <b>{f(EM, 0)}</b></p>"
             f"<p><b>Step 2. Who gets what.</b> The old equity was {f(EG, 0)} + {f(EV, 0)} = {f(EG + EV, 0)}. "
             f"Gjesvær's shareholders get {f(EG, 0)}/{f(EG + EV, 0)} of the merged equity and Vangen's "
             f"{f(EV, 0)}/{f(EG + EV, 0)}:</p>"
             + tab(["Group", "Before", "After", "Change"],
                   [["Gjesvær shareholders", f(EG, 0), f(EG_etter), f"<b>{f(dEG)}</b>"],
                    ["Vangen shareholders", f(EV, 0), f(EV_etter), f"<b>{f(dEV)}</b>"],
                    ["Gjesvær creditors", f(DG, 0), f(FG, 0), sg(dDG, 0)],
                    ["Vangen creditors", f(DV, 0), f(FV_, 0), sg(dDV, 0)]])
             + f"<p>The creditors gain {f(dDG, 0)} + {f(dDV, 0)} = <b>{f(overf3, 0)}</b> in total. The "
             f"shareholders lose {f(-dEG)} + {f(-dEV)} = {f(-(dEG + dEV))}.</p>"
             f"<p><b>Check.</b> No synergies, so the merged firm is worth {f(DG + EG, 0)} + {f(DV + EV, 0)} = "
             f"{f(DM + EM, 0)} = {f(DM, 0)} + {f(EM, 0)}. Total value is fixed, so the creditors' gain must "
             f"equal the shareholders' loss: {f(overf3, 0)} = {f(-(dEG + dEV), 0)} ✓.</p>"),
         "criteria": [
             f"Merged firm: {VM[0]} and {VM[1]}. Debt of {FM} is paid in both states, so D = {f(DM, 0)} and E = 0.4({VM[0] - FM}) + 0.6({VM[1] - FM}) = {f(EM, 0)}.",
             f"Splits the merged equity {f(EG, 0)}:{f(EV, 0)}: Gjesvær's shareholders {f(EG_etter)} ({f(dEG)}), Vangen's {f(EV_etter)} ({f(dEV)}).",
             f"Creditors: {f(DG, 0)} to {FG} and {f(DV, 0)} to {FV_}, a total gain of {f(overf3, 0)}.",
             f"Bonus: checks that the creditors' gain equals the shareholders' loss ({f(overf3, 0)}), since total value is unchanged at {f(DM + EM, 0)}.",
             "Shows the state-by-state payoffs, not just the results.",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>How would each group of shareholders vote on the merger? Why? When would such a merger leave "
             "the creditors as a whole no better off? Briefly explain.</p>"),
         "solution": (
             "<p><b>The vote.</b> Both groups of shareholders vote against. With limited liability, equity is a "
             "call option on the firm's assets: before the merger each group could walk away from its debt in "
             "its own bad state. After the merger each firm's assets also back the other's debt "
             "(coinsurance), so the default branch disappears and the creditors are paid in full. With no "
             f"synergies nothing is created, so the creditors' gain of {f(overf3, 0)} is a wealth transfer from "
             "the shareholders. Lower risk is bad news for the holder of a call.</p>"
             "<p><b>When the creditors as a whole gain nothing.</b> The creditors gain because in some state one "
             "firm defaults while the other still has equity left. After the merger that equity covers the "
             "shortfall. So the merger leaves the creditors as a whole no better off exactly when there is no "
             "state in which one firm defaults while the other has equity left: for example when both debts "
             "were risk-free already, or when the two firms default in the same states and are both wiped out "
             "there. Kurbatov's lecture (recording 16, 1:28:43) puts it as perfect positive correlation. That "
             "is accepted, but correlation alone is not enough: two firms worth 100 or 50 in the same states, "
             "with debts of 40 and 80, give their creditors 40 + 50 = 90 in the bad state before the merger "
             "and 100 after. The words «as a whole» matter too: debts that rank equally are paid pro rata, "
             "which can move value between the two groups of creditors.</p>"
             "<p>Bonus: the merged firm could borrow more and pay the proceeds out to restore the "
             "shareholders' position. Shareholders can also diversify on their own, so diversification is no "
             "reason for them to want the merger.</p>"),
         "criteria": [
             f"Vote: both groups of shareholders vote against, because the merger lowers default risk without creating value, so the creditors' gain ({f(overf3, 0)}) is a wealth transfer from the shareholders.",
             "Explains the mechanism: equity is a call on the assets (limited liability) and loses value when risk falls; after the merger each firm's assets back the other's debt.",
             "Condition: the creditors as a whole gain nothing if there is no state in which one firm defaults while the other has equity left, for example because both debts were risk-free already or both firms default in the same states. Kurbatov's formulation, perfect positive correlation (recording 16, 1:28:43), is also accepted.",
             "Bonus: the merged firm can issue more debt and pay out the proceeds, or shareholders can diversify themselves, so diversification is no reason to merge.",
         ]},
    ]}

SETT = {
    "hint3-1": [ex_31_3, ex_31_4],
    "hint3-3": [ex_33_1, ex_33_2, ex_33_3],
}


# ======================================================================
#                              SVAR-DATA
# ======================================================================
def t(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


SVAR = {
    # hint3-1 n3
    "hint3-1:3:a": {"type": "tall", "tall": [
        t("Offer per B share", tilbud3, "NOK"),
        t("Premium over the pre-rumour price", 100 * premie3, "%", alt=[tilbud3 - PB0]),
        t("Spread", spread3, "NOK", alt=[100 * spread3 / PB1])],
        "merknad": "Spørsmålet oppgir enhetene (premie i prosent, spread i NOK). alt godtar også premien i NOK (18,00) og spreaden i prosent av dagens kurs (6,74)."},
    "hint3-1:3:b": {"type": "tall", "tall": [
        t("Value if the deal goes through", suk3, "NOK", alt=[selv_suk3]),
        t("Value if the deal fails", feil3, "NOK", alt=[selv_feil3])],
        "merknad": "alt er Kurbatovs selvfinansierte variant (kjøp B med shortinntekten, sett resten i banken), som er godtatt i kriteriene."},
    "hint3-1:3:c": {"type": "tall", "tall": [t("Probability of completion", p3, "", tol=0.004)],
                    "merknad": f"Stram toleranse (0,4 %) så helårsfaktoren 1,045 ({p3_helaar:.4f}) avvises. Enkel rente ({p3_enkel:.4f}) havner innenfor og godtas som tilnærming. 71,20 i stedet for sikkerhetsekvivalenten gir {p3_felle:.4f}."},
    "hint3-1:3:d": {"type": "blandet", "tall": [t("Probability of completion with B at 62 on failure", p3d, "", tol=0.004)],
                    "tallPoeng": 2,
                    "tekstLedd": "Why might B's price not fall all the way back? Explain the direction of the change.",
                    "merknad": f"Fellen (71,20 i stedet for sikkerhetsekvivalenten) gir {p3d_felle:.4f}."},
    "hint3-1:3:e": {"type": "tekst"},
    # hint3-1 n4
    "hint3-1:4:a": {"type": "tall", "tall": [
        t("Promised yield to maturity", 100 * y4, "%"),
        t("Value if risk-free", rfverdi4, "NOK")],
        "merknad": f"Uten kupongen blir yielden {100 * y4_felle:.2f} %; det avvises."},
    "hint3-1:4:b": {"type": "blandet", "tall": [t("Expected return", 100 * Er4, "%")], "tallPoeng": 2,
                    "tekstLedd": "Compare it with the promised yield and the risk-free rate. Explain briefly."},
    "hint3-1:4:c": {"type": "tall", "tall": [
        t("Risk-neutral default probability ρ", rho4, ""),
        t("Price of one CDS contract", CDS4, "NOK")],
        "merknad": f"Overlevelsessannsynligheten ({1 - rho4:.4f}) og CDS-prisen med den ({CDS4_felle:.4f}) er fellen og avvises. Analytikernes 6 % gir {CDS4_sann:.4f}."},
    "hint3-1:4:d": {"type": "tall", "tall": [
        t("CDS contracts per bond", nCDS4, ""),
        t("Cost of the contracts", kost4, "NOK"),
        t("Bond plus contracts", sikret4, "NOK")],
        "merknad": f"55 kontrakter (pålydende minus gjenvinning) er fellen; da blir posisjonen {sikret4_55:.4f}."},
    "hint3-1:4:e": {"type": "tekst"},
    # hint3-3
    "hint3-3:1:": {"type": "tekst"},
    "hint3-3:2:a": {"type": "blandet", "tall": [
        t("Monthly rate", 100 * rm2, "%"),
        t("NPV if committed forever", NPV2_uten, "NOK", tol=0.002)],
        "tallPoeng": 2, "tekstLedd": "Will you open it?",
        "merknad": f"Stram toleranse på NPV (0,2 %) så 5 %/12 ({NPV2_nom:.0f}) avvises; den fanges også av månedsrenten."},
    "hint3-3:2:b": {"type": "tall", "tall": [
        t("NPV, good state", NPV2_g, "NOK"),
        t("NPV, bad state", NPV2_b, "NOK"),
        t("Expected NPV with the clause", NPV2_exit, "NOK")]},
    "hint3-3:2:c": {"type": "blandet", "tall": [t("Value of the clause", verdi2, "NOK")], "tallPoeng": 2,
                    "tekstLedd": "Briefly explain.",
                    "merknad": f"Verdien er målt mot 0. {feil2:.0f} (mot den negative NPV-en) er fellen og avvises."},
    "hint3-3:2:d": {"type": "blandet", "tall": [t("Highest termination fee", Fmax2, "NOK")], "tallPoeng": 3,
                    "tekstLedd": "With that fee, would you still close in the bad state?",
                    "merknad": f"Gebyr i begge tilstander gir {Fmax2_begge:.0f}, uten diskontering {Fmax2_udisk:.0f}; begge avvises."},
    "hint3-3:2:e": {"type": "tekst"},
    "hint3-3:3:a": {"type": "tall", "tall": [
        t("Maximum bid, A", maks3["A"], "NOK m"),
        t("Maximum bid, B", maks3["B"], "NOK m"),
        t("Maximum bid, C", maks3["C"], "NOK m")],
        "merknad": "Mot frittstående verdi blir svarene 170, 160 og 150; de avvises (A: 170 mot 175 er 2,9 % unna)."},
    "hint3-3:3:b": {"type": "blandet", "tall": [
        t("Price paid for D", pris3, "NOK m"),
        t("Gain to D's shareholders", endr3["D"], "NOK m"),
        t("Gain or loss to the winner's shareholders", endr3["C"], "NOK m")],
        "tallPoeng": 3, "tekstLedd": "Who buys D? Briefly comment."},
    "hint3-3:3:c": {"type": "tall", "tall": [
        t("Gjesvær debt", DG, "NOK m"), t("Gjesvær equity", EG, "NOK m"),
        t("Vangen debt", DV, "NOK m"), t("Vangen equity", EV, "NOK m")]},
    "hint3-3:3:d": {"type": "tall", "tall": [
        t("Merged debt", DM, "NOK m"), t("Merged equity", EM, "NOK m"),
        t("Change for Gjesvær's shareholders", dEG, "NOK m"),
        t("Change for Vangen's shareholders", dEV, "NOK m"),
        t("Total gain to the creditors", overf3, "NOK m")]},
    "hint3-3:3:e": {"type": "tekst"},
}


# ======================================================================
#                              KONTROLL
# ======================================================================
feil = []


def ren(h):
    s = re.sub(r"<[^>]*>", " ", str(h)).replace("&minus;", "−").replace("&nbsp;", " ")
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


for sid, liste in SETT.items():
    for ex in liste:
        hvor = f"{sid} oppgave {ex['n']}"
        for k in ("n", "title", "points", "topic", "chapters", "body", "merke"):
            if k not in ex:
                feil.append(f"{hvor}: mangler {k}")
        if not ex["merke"].startswith("Forelesning ") or "«" not in ex["merke"]:
            feil.append(f"{hvor}: merket har ikke formen «Forelesning NN (tittel), tid: «sitat»»")
        deler = ex.get("parts", [])
        if not deler:                                  # verbal oppgave uten deler
            if ex["points"] != 10:
                feil.append(f"{hvor}: teorioppgaven skal ha 10 poeng")
            if not 3 <= len(ex["criteria"]) <= 7:
                feil.append(f"{hvor}: {len(ex['criteria'])} kriterier")
            for c in ex["criteria"]:
                if re.search(r"<[a-zA-Z/!]|&[a-z#0-9]+;", c):
                    feil.append(f"{hvor}: markup i kriterium")
            if f"{sid}:{ex['n']}:" not in SVAR:
                feil.append(f"mangler svar-data {sid}:{ex['n']}:")
            continue
        if ex["points"] != 20 or sum(p["points"] for p in deler) != 20:
            feil.append(f"{hvor}: poengene summerer ikke til 20")
        if deler[0]["points"] > 4:
            feil.append(f"{hvor}: del a er tung")
        for p in deler:
            if not 3 <= len(p["criteria"]) <= 7:
                feil.append(f"{hvor}{p['label']}: {len(p['criteria'])} kriterier")
            for c in p["criteria"]:
                if re.search(r"<[a-zA-Z/!]|&[a-z#0-9]+;", c):
                    feil.append(f"{hvor}{p['label']}: markup i kriterium")
            k = f"{sid}:{ex['n']}:{p['label']}"
            if k not in SVAR:
                feil.append(f"mangler svar-data {k}")
                continue
            d = SVAR[k]
            if d["type"] == "blandet" and not 0 < d["tallPoeng"] < p["points"]:
                feil.append(f"{k}: tallPoeng")
            if not 1 <= len(d.get("tall", [1])) <= 5:
                feil.append(f"{k}: for mange tall")
            kilde = " ".join([p["solution"], " ".join(p["criteria"])])
            nums = tall_i(kilde)
            for tt in d.get("tall", []):
                kand = [tt["verdi"]] + tt.get("alt", [])
                for v in kand:
                    ok = any(innenfor(n, v, tt) or (tt["enhet"] == "%" and innenfor(n * 100, v, tt)) for n in nums)
                    if not ok and not tt.get("regnet"):
                        feil.append(f"{k}: {tt['navn']} = {v} står ikke i løsningen")
                if abs(tt["verdi"]) < 1e-6 and "abs" not in tt:
                    feil.append(f"{k}: verdien er 0 uten abs")

# ingen overflødige svarnøkler
gyldige = {f"{sid}:{ex['n']}:{p['label']}" for sid, l in SETT.items() for ex in l for p in ex.get("parts", [])}
gyldige |= {f"{sid}:{ex['n']}:" for sid, l in SETT.items() for ex in l if not ex.get("parts")}
for k in SVAR:
    if k not in gyldige:
        feil.append(f"svar-data uten oppgave: {k}")

# lekkasje: svarene skal ikke stå i oppgaveteksten til samme oppgave
for sid, liste in SETT.items():
    for ex in liste:
        if not ex.get("parts"):
            continue
        tekst = ren(ex["body"]) + " " + " ".join(ren(p["body"]) for p in ex["parts"])
        tall_tekst = tall_i(tekst)
        for p in ex["parts"]:
            d = SVAR[f"{sid}:{ex['n']}:{p['label']}"]
            for tt in d.get("tall", []):
                v = tt["verdi"]
                if abs(v) > 1e-6 and any(abs(n - v) <= 1e-4 * abs(v) for n in tall_tekst):
                    feil.append(f"{sid}:{ex['n']}:{p['label']}: svaret {v} står i oppgaveteksten")


def alle(o):
    if isinstance(o, str):
        yield o
    elif isinstance(o, dict):
        for v in o.values():
            yield from alle(v)
    elif isinstance(o, list):
        for v in o:
            yield from alle(v)


for s in list(alle(SETT)) + list(alle(SVAR)):
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
    if s.count("<ul>") != s.count("</ul>") or s.count("<li>") != s.count("</li>"):
        feil.append(f"ubalanserte lister: {s[:60]}")
    if re.search(r"\b(nan|inf)\b", s):
        feil.append(f"nan/inf: {s[:60]}")
    if re.search(r"<[^a-z/!]", s.replace("&lt;", "")):
        feil.append(f"rå < i tekst: {s[:60]}")
# bindestrek brukt som minus foran tall i engelsk tekst
for sid, liste in SETT.items():
    for s in alle(liste):
        for m in re.finditer(r"(?:^|[\s(=])-\d", ren(s)):
            feil.append(f"{sid}: bindestrek som minus: …{ren(s)[max(0, m.start() - 30):m.end() + 10]}…")

# lengde: rundt 11 ord oppgavetekst per poeng
print("\nOrd i oppgaveteksten:")
for sid, liste in SETT.items():
    for ex in liste:
        ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex.get("parts", []))).split())
        print(f"   {sid} n{ex['n']}: {ord_} ord ({ord_ / ex['points']:.1f} per poeng)")
        grense = (80, 180) if ex["points"] == 10 else (150, 320)
        if not grense[0] <= ord_ <= grense[1]:
            feil.append(f"{sid} oppgave {ex['n']}: {ord_} ord")

if feil:
    print("\nFEIL, ingenting ble skrevet:")
    for x in feil:
        print("  ", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=1)
with open(UT_SVAR, "w", encoding="utf-8") as fh:
    json.dump(SVAR, fh, ensure_ascii=False, indent=1)
print(f"\nSkrev {UT} og {UT_SVAR}: {sum(len(v) for v in SETT.values())} oppgaver, {len(SVAR)} svar-oppføringer.")
