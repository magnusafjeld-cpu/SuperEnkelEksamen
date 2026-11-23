"""Skribent S3: regneoppgave 3 og 4 i del3-f4, del3-f5 og del3-f6 (FIE402, «Mest forventet»).

Kjør fra hvor som helst:  python3 -I fag/fie402/_del/s3_regn.py

Oppdraget står i docs/fie402-deleksamen-spek.md. Seks oppgaver à 20 poeng, hver i samme form som
en oppgave Kurbatov ga, med nye tall, nye firmaer og ny historie:

- del3-f4 n3: som H2024 E6. Bygge nå eller vente når renten er usikker. Kontrakten er fast, så
  renten er eneste risiko. ρ hentes fra et notert statlig annuitetslån (9 år) som gir den samme
  strømmen som stasjonen bygd ved t = 1 (år 2 til 9) pluss en sikker betaling ved t = 1.
  Statisk NPV er positiv, men det lønner seg likevel å vente.
- del3-f4 n4: som V2024 P3 og CDS-eksemplet i Options II (forelesning 10 s. 9-10). ρ er
  sannsynligheten for mislighold og står i den nederste grenen. Fellen er ρ mot 1 − ρ.
- del3-f5 n3: som H2025 E5. Studie nå og om ett år, exit etter 3 år, og sannsynligheten som gir
  likegyldighet (med og uten exit). Exit sammenlignes med 0, aldri med den negative NPV-en.
- del3-f5 n4: som H2025 E6. Mannesmann-strategien med aksjebytte (3 A for 4 B) og T = 1. Begge
  kursene stiger, og avstemningen er blant aksjonærene i B.
- del3-f6 n3: som H2024 E6, men med usikker kontantstrøm (fraktmarkedet) og et notert rederi som
  tvilling. S0, Su og Sd gjelder samme papir, og Su og Sd tar med utbyttet ved t = 1. Verftet tar
  10 % mer ved t = 1, og her lønner det seg å bestille nå.
- del3-f6 n4: som H2025 E6 med T = 0,5 og (1 + r_f)^T, og en rådgivende avstemning etter 3 måneder
  som gir en ny sannsynlighet med T = 0,25.

Skriptet regner hvert tall, asserter sjekkene og skriver s3.json og s3_svar.json i samme mappe.
Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som lekker i oppgaveteksten),
skrives ingenting.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "s3.json")
UT_SVAR = os.path.join(HER, "s3_svar.json")


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


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def A(n, r):
    """Annuitetsfaktor: n betalinger, den første om ett år."""
    return (1 - (1 + r) ** -n) / r


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:26} {v}")


# ======================================================================
#  del3-f4 n3: Straumstein Energi, bygge nå eller vente (renten usikker)
# ======================================================================
I3, C3, N3 = 16.0, 2.4, 8                 # NOK mill.
r0, ru, rd = 0.04, 0.025, 0.06             # i dag, ned (oppside for prosjektet), opp
BOND_C, BOND_N = 100.0, 9                  # annuitetslån: 100 per år i år 1-9
S0_eksakt = BOND_C * A(BOND_N, r0)
S0_3 = round(S0_eksakt, 2)                 # oppgitt kurs, 743.53
assert near(S0_3, 743.53)

# a) NPV nå (flat 4 %)
A8_0 = A(N3, r0)
PV3_naa = C3 * A8_0
NPV3_naa = PV3_naa - I3
assert NPV3_naa > 0                        # statisk NPV er positiv
# b) vente: verdi ved t = 1 i hver tilstand, deretter tilbake til t = 0 med 4 %
A8_u, A8_d = A(N3, ru), A(N3, rd)
PV3_u, PV3_d = C3 * A8_u, C3 * A8_d
NPV3_u1, NPV3_d1 = PV3_u - I3, PV3_d - I3
NPV3_u0, NPV3_d0 = NPV3_u1 / (1 + r0), NPV3_d1 / (1 + r0)
assert NPV3_u1 > 0 > NPV3_d1               # bygger bare i oppsiden
# c) ρ fra annuitetslånet: Su og Sd tar med betalingen ved t = 1
Su3 = BOND_C + BOND_C * A8_u
Sd3 = BOND_C + BOND_C * A8_d
FV3 = (1 + r0) * S0_3
rho3 = (FV3 - Sd3) / (Su3 - Sd3)
rho3_eksakt = ((1 + r0) * S0_eksakt - Sd3) / (Su3 - Sd3)
assert 0 < rho3 < 1 and abs(rho3 - rho3_eksakt) < 1e-4
# sjekken som kan feile: stasjonen bygd ved t = 1 (år 2-9) som tvilling gir samme ρ
S0_tv = PV3_naa / (1 + r0)
rho3_tv = ((1 + r0) * S0_tv - PV3_d) / (PV3_u - PV3_d)
assert near(rho3_tv, rho3_eksakt, 1e-12)
# fellen: S0 for stasjonen bygd nå (år 1-8) mot Su, Sd for stasjonen bygd ved t = 1 (år 2-9)
rho3_felle = ((1 + r0) * PV3_naa - PV3_d) / (PV3_u - PV3_d)
assert 0 < rho3_felle < 1 and abs(rho3_felle - rho3) > 0.2      # ligger i (0, 1), bare regelen fanger den
# felle 2: glemt betalingen ved t = 1 i Su og Sd
rho3_utenbet = (FV3 - BOND_C * A8_d) / (BOND_C * A8_u - BOND_C * A8_d)
assert rho3_utenbet > 1                    # fanges av sjekken 0 < ρ < 1
# ρ prissetter lånet (identitet)
assert near((rho3 * Su3 + (1 - rho3) * Sd3) / (1 + r0), S0_3, 1e-9)
# d) verdien av å vente
Cu3, Cd3 = max(NPV3_u1, 0), max(NPV3_d1, 0)
W3 = (rho3 * Cu3 + (1 - rho3) * Cd3) / (1 + r0)
assert near(W3, rho3 * NPV3_u0)
OPT3 = W3 - max(NPV3_naa, 0)
assert W3 > NPV3_naa and OPT3 > 0          # vent, selv om NPV nå er positiv
# replikering med lånet (deler ρ, fanger bare regnefeil)
Delta3 = (Cu3 - Cd3) / (Su3 - Sd3)
B3 = (Cd3 - Delta3 * Sd3) / (1 + r0)
C03 = Delta3 * S0_3 + B3
assert near(C03, W3, 1e-9)
W3_felle = rho3_felle * NPV3_u0
vis("f4 n3", NPV_naa=NPV3_naa, PV_u=PV3_u, PV_d=PV3_d, NPV_u0=NPV3_u0, NPV_d0=NPV3_d0, Su=Su3, Sd=Sd3,
    rho=rho3, rho_tv=rho3_tv, rho_felle=rho3_felle, rho_utenbet=rho3_utenbet, W=W3, OPT=OPT3,
    Delta=Delta3, B=B3)

# ======================================================================
#  del3-f4 n4: Brakstad Eiendom, CDS
# ======================================================================
F4, y4, rf4, pD4, R4 = 1000.0, 0.08, 0.035, 0.05, 600.0
Pg4 = F4 / (1 + rf4)
Pb4 = F4 / (1 + y4)
Epay4 = (1 - pD4) * F4 + pD4 * R4
Er4 = Epay4 / Pb4 - 1
assert near(Er4, 0.0584) and rf4 < Er4 < y4
# c) ρ = risikonøytral sannsynlighet for mislighold (nederste gren)
FV4 = (1 + rf4) * Pb4
rho4 = (F4 - FV4) / (F4 - R4)
assert near((rho4 * R4 + (1 - rho4) * F4) / (1 + rf4), Pb4, 1e-9)
assert near(rho4, 5 / 48) and rho4 > pD4
CDS4 = rho4 / (1 + rf4)
CDS4_felle = (1 - rho4) / (1 + rf4)       # ρ og 1 − ρ forvekslet
CDS4_sann = pD4 / (1 + rf4)               # reell sannsynlighet med r_f
# d) sikring: 50 mill. pålydende = 50 000 obligasjoner, tap 400 per obligasjon
Ftot4 = 50.0                               # NOK mill.
nbond4 = Ftot4 * 1e6 / F4
tap4 = F4 - R4
nCDS4 = nbond4 * tap4                      # kontrakter
kost4 = nCDS4 * CDS4 / 1e6                 # NOK mill.
verdi_obl4 = nbond4 * Pb4 / 1e6
pos4 = verdi_obl4 + kost4
assert near(nbond4, 50_000) and near(nCDS4, 20_000_000)
assert near(pos4, Ftot4 / (1 + rf4), 1e-9)            # sikret = statsobligasjon
put4 = Pg4 - Pb4
assert near(put4, tap4 * CDS4, 1e-9)                   # putten to veier
pos4_felle = verdi_obl4 + nCDS4 * CDS4_felle / 1e6
assert abs(pos4_felle - Ftot4 / (1 + rf4)) > 10       # sjekken fanger ρ/1 − ρ-feilen
vis("f4 n4", Pg=Pg4, Pb=Pb4, Epay=Epay4, Er=Er4, rho=rho4, CDS=CDS4, CDS_felle=CDS4_felle,
    CDS_sann=CDS4_sann, nCDS=nCDS4, kost=kost4, obl=verdi_obl4, pos=pos4, put=put4, pos_felle=pos4_felle)

# ======================================================================
#  del3-f5 n3: bilvask i Harstad, studie, exit og likegyldig sannsynlighet
# ======================================================================
I5, K5, Rg5, Rb5, p5, r5, T5 = 2_400_000.0, 900_000.0, 1_250_000.0, 720_000.0, 0.55, 0.05, 3
cg5, cb5 = Rg5 - K5, Rb5 - K5
assert cg5 == 350_000 and cb5 == -180_000
Ec5 = p5 * cg5 + (1 - p5) * cb5
PV5 = Ec5 / r5
NPV5 = PV5 - I5
assert NPV5 < 0                            # åpner ikke
# b) studie nå
NPVg5 = cg5 / r5 - I5
NPVb5 = cb5 / r5 - I5
C0_5 = p5 * max(NPVg5, 0) + (1 - p5) * max(NPVb5, 0) - max(NPV5, 0)
assert NPVg5 > 0 > NPVb5 and near(C0_5, p5 * NPVg5)
# c) studie om ett år
C1_5 = p5 * NPVg5 / (1 + r5)
tapt5 = cg5 / (1 + r5)
spart5 = I5 - I5 / (1 + r5)
diff5 = C0_5 - C1_5
assert near(diff5, p5 * (tapt5 - spart5), 1e-6) and C1_5 < C0_5
# d) exit etter 3 år
AF5 = A(T5, r5)
NPVb5_exit = -I5 + cb5 * AF5
NPV5_exit = p5 * NPVg5 + (1 - p5) * NPVb5_exit
assert NPV5_exit > 0                        # åpner nå
verdi_exit5 = NPV5_exit - max(NPV5, 0)      # mot 0, fordi du ellers ikke åpner
feil_exit5 = NPV5_exit - NPV5               # fellen: mot den negative NPV-en
klausul5 = (1 - p5) * (-cb5 / r5) / (1 + r5) ** T5
assert near(feil_exit5, klausul5, 1e-6)     # verdien av klausulen for en som er bundet
assert abs(verdi_exit5 - feil_exit5) > 100_000
# e) likegyldig sannsynlighet, med og uten exit
pstar5 = -NPVb5_exit / (NPVg5 - NPVb5_exit)
pstar5_uten = (r5 * I5 - cb5) / (cg5 - cb5)
assert near(pstar5 * NPVg5 + (1 - pstar5) * NPVb5_exit, 0, 1e-6)
assert near(pstar5_uten * cg5 + (1 - pstar5_uten) * cb5, r5 * I5, 1e-6)
assert pstar5 < p5 < pstar5_uten            # programmet snur beslutningen ved 55 %
vis("f5 n3", Ec=Ec5, PV=PV5, NPV=NPV5, NPVg=NPVg5, NPVb=NPVb5, C0=C0_5, C1=C1_5, diff=diff5,
    tapt=tapt5, spart=spart5, AF=AF5, NPVb_exit=NPVb5_exit, NPV_exit=NPV5_exit, verdi_exit=verdi_exit5,
    feil_exit=feil_exit5, pstar=pstar5, pstar_uten=pstar5_uten)

# ======================================================================
#  del3-f5 n4: Nordvarde Telecom og Lofotnett, Mannesmann med T = 1
# ======================================================================
nA6, nB6 = 3, 4                             # 4 B-aksjer blir 3 A-aksjer
PA0_6, PB0_6, PA1_6, PB1_6, rf6 = 84.0, 52.0, 86.0, 60.0, 0.04
lang6 = nB6 * PB1_6                         # kjøp 4 B
kort6 = nA6 * PA1_6                         # selg 3 A short
inv6 = kort6 * (1 + rf6)
suk6 = inv6
feil6 = inv6 - nA6 * PA0_6 + nB6 * PB0_6
SE6 = lang6 * (1 + rf6)
p6 = (SE6 - feil6) / (suk6 - feil6)
assert 0 < p6 < 1 and near(p6 * suk6 + (1 - p6) * feil6, SE6, 1e-9)
p6_felle = (lang6 - feil6) / (suk6 - feil6)  # satt inn 240 i stedet for 249.60
assert abs(p6 - p6_felle) > 0.15
assert nA6 / nB6 * PA1_6 > PB1_6 > PB0_6     # B under bytteverdien, over egen verdi
endrA6, endrB6 = PA1_6 / PA0_6 - 1, PB1_6 / PB0_6 - 1
assert endrA6 > 0 and endrB6 > 0             # begge stiger
vis("f5 n4", lang=lang6, kort=kort6, inv=inv6, suk=suk6, feil=feil6, SE=SE6, p=p6, p_felle=p6_felle,
    endrA=endrA6, endrB=endrB6, bytteverdi=nA6 / nB6 * PA1_6)

# ======================================================================
#  del3-f6 n3: Sildvik Feeder, bestille nå eller vente (fraktmarkedet usikkert)
# ======================================================================
I7, I7_1, cu7, cd7, N7, r7, preal7 = 240.0, 264.0, 32.0, 24.0, 12, 0.04, 0.65
S0_7, nfart7 = 533.0, 2
assert near(I7_1, 1.1 * I7)
# a) skip levert i dag, verdsatt med Mjøsunds markedsverdi
V7_naa = S0_7 / nfart7
NPV7_naa = V7_naa - I7
# b) bestille ved t = 1: leie i år 2 til 13, verft 264
A12 = A(N7, r7)
PV7_u1, PV7_d1 = cu7 * A12, cd7 * A12
NPV7_u1, NPV7_d1 = PV7_u1 - I7_1, PV7_d1 - I7_1
NPV7_u0, NPV7_d0 = NPV7_u1 / (1 + r7), NPV7_d1 / (1 + r7)
assert NPV7_u1 > 0 > NPV7_d1
# c) ρ fra Mjøsund: Su og Sd med utbyttet ved t = 1 (to skip, leie i år 1 til 12)
A11 = A(N7 - 1, r7)
div7_u, div7_d = nfart7 * cu7, nfart7 * cd7
Su7 = div7_u + div7_u * A11
Sd7 = div7_d + div7_d * A11
FV7 = (1 + r7) * S0_7
rho7 = (FV7 - Sd7) / (Su7 - Sd7)
assert 0 < rho7 < preal7                    # sterkt marked er den gode tilstanden: ρ under 65 %
assert near((rho7 * Su7 + (1 - rho7) * Sd7) / (1 + r7), S0_7, 1e-9)     # identitet
rho7_felle = (FV7 - div7_d * A11) / (div7_u * A11 - div7_d * A11)        # uten utbyttet
assert 0 < rho7_felle < 1 and rho7_felle > preal7                          # sjekken mot 65 % fanger den
# ρ prissetter skipet levert i dag (identitet, halvparten av Mjøsund)
V7_u1, V7_d1 = cu7 * (1 + A11), cd7 * (1 + A11)
assert near((rho7 * V7_u1 + (1 - rho7) * V7_d1) / (1 + r7), V7_naa, 1e-9)
V7_sann = (preal7 * V7_u1 + (1 - preal7) * V7_d1) / (1 + r7)              # feil: reell sannsynlighet med r_f
assert V7_sann > V7_naa + 5
# d) verdien av å vente
W7 = rho7 * max(NPV7_u1, 0) / (1 + r7)
assert near(W7, rho7 * NPV7_u0) and W7 < NPV7_naa                         # bestill nå
OPT7 = W7 - max(NPV7_naa, 0)
assert OPT7 < 0
Delta7 = (max(NPV7_u1, 0) - max(NPV7_d1, 0)) / (Su7 - Sd7)
B7 = (max(NPV7_d1, 0) - Delta7 * Sd7) / (1 + r7)
assert near(Delta7 * S0_7 + B7, W7, 1e-9)
W7_240 = rho7 * max(cu7 * A12 - I7, 0) / (1 + r7)                        # uten prisøkning
assert W7_240 > NPV7_naa                                                   # da ville du ventet
W7_felle = rho7_felle * NPV7_u0
vis("f6 n3", V_naa=V7_naa, NPV_naa=NPV7_naa, PV_u1=PV7_u1, PV_d1=PV7_d1, NPV_u1=NPV7_u1, NPV_d1=NPV7_d1,
    NPV_u0=NPV7_u0, NPV_d0=NPV7_d0, Su=Su7, Sd=Sd7, rho=rho7, rho_felle=rho7_felle, V_sann=V7_sann,
    W=W7, OPT=OPT7, Delta=Delta7, B=B7, W_240=W7_240, W_felle=W7_felle)

# ======================================================================
#  del3-f6 n4: Hestvik Kraft og Tussen Energi, T = 0.5 og så 0.25
# ======================================================================
ER8 = 2                                      # 1 B-aksje blir 2 A-aksjer
PA0_8, PB0_8, PA1_8, PB1_8, rf8, T8 = 35.0, 58.0, 33.0, 61.0, 0.05, 0.5
F8 = (1 + rf8) ** T8
kort8 = ER8 * PA1_8
inv8 = kort8 * F8
suk8 = inv8
feil8 = inv8 - ER8 * PA0_8 + PB0_8
SE8 = PB1_8 * F8
p8 = (SE8 - feil8) / (suk8 - feil8)
assert 0 < p8 < 1 and near(p8 * suk8 + (1 - p8) * feil8, SE8, 1e-9)
p8_helaar = ((PB1_8 - kort8) * (1 + rf8) + ER8 * PA0_8 - PB0_8) / (ER8 * PA0_8 - PB0_8)
p8_enkel = ((PB1_8 - kort8) * (1 + rf8 * T8) + ER8 * PA0_8 - PB0_8) / (ER8 * PA0_8 - PB0_8)
p8_felle = (PB1_8 - feil8) / (suk8 - feil8)  # satt inn 61 i stedet for sikkerhetsekvivalenten
assert abs(p8_helaar / p8 - 1) > 0.01        # helt års rente faller utenfor toleransen
assert abs(p8_enkel / p8 - 1) < 0.005        # enkel rente er en godtatt tilnærming
assert abs(p8 - p8_felle) > 0.1
assert ER8 * PA1_8 > PB1_8 > PB0_8
endrA8, endrB8 = PA1_8 / PA0_8 - 1, PB1_8 / PB0_8 - 1
assert endrA8 < 0 < endrB8
# c) etter avstemningen, 3 måneder igjen
PA2_8, PB2_8, T8c = 34.40, 58.80, 0.25
F8c = (1 + rf8) ** T8c
kort8c = ER8 * PA2_8
inv8c = kort8c * F8c
suk8c = inv8c
feil8c = inv8c - ER8 * PA0_8 + PB0_8
SE8c = PB2_8 * F8c
p8c = (SE8c - feil8c) / (suk8c - feil8c)
assert 0 < p8c < p8 and near(p8c * suk8c + (1 - p8c) * feil8c, SE8c, 1e-9)
p8c_halv = ((PB2_8 - kort8c) * F8 + ER8 * PA0_8 - PB0_8) / (ER8 * PA0_8 - PB0_8)   # glemt at 3 mnd er gått
p8c_helaar = ((PB2_8 - kort8c) * (1 + rf8) + ER8 * PA0_8 - PB0_8) / (ER8 * PA0_8 - PB0_8)
assert abs(p8c_halv / p8c - 1) > 0.02 and abs(p8c_helaar / p8c - 1) > 0.1
vis("f6 n4", F=F8, kort=kort8, inv=inv8, feil=feil8, SE=SE8, p=p8, p_helaar=p8_helaar, p_enkel=p8_enkel,
    p_felle=p8_felle, endrA=endrA8, endrB=endrB8, Fc=F8c, invc=inv8c, feilc=feil8c, SEc=SE8c, pc=p8c,
    pc_halv=p8c_halv, pc_helaar=p8c_helaar)


# ======================================================================
#                              TEKSTENE
# ======================================================================
def tab(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = "".join("<tr>" + "".join(f'<td class="n">{c}</td>' if i else f"<td>{c}</td>" for i, c in enumerate(rad))
                + "</tr>" for rad in rader)
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


# ---------------------------------------------------------------- f4 n3
ex_f4_3 = {
    "n": 3, "title": "Risk-neutral valuation", "points": 20,
    "topic": "Real options, risk-neutral valuation", "chapters": [22, 25],
    "merke": "Som H2024 E6: investere nå eller vente når renten er usikker",
    "body": (
        "<p>Straumstein Energi AS can build a shore-power station for ferries at a quay in Molde. "
        "Building it costs NOK 16 million, paid when the station is built. The municipality has signed "
        "a fixed contract: it pays NOK 2.4 million at the end of each year for 8 years, the first "
        "payment one year after the station is built. The municipality is as safe as the government, "
        "so the payments are risk-free; the only uncertainty is the interest rate. The station has no "
        "value after the eighth payment. Today the risk-free rate is 4% for all maturities. Use 4 "
        "decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What is the project's NPV if you build right now?</p>",
         "solution": (
             "<p>The payments are an 8-year annuity of NOK 2.4 million, the first at the end of Year 1, "
             "discounted at 4%.</p>"
             f"<p>A(8, 4%) = [1 − 1.04<sup>−8</sup>]/0.04 = <b>{f(A8_0)}</b><br>"
             f"PV = 2.4 × {f(A8_0)} = <b>{f(PV3_naa)}</b><br>"
             f"NPV = {f(PV3_naa)} − 16 = <b>{sg(NPV3_naa)} million NOK</b></p>"
             "<p>The static NPV is positive, so on a naive analysis you would build today. Keep the "
             f"{f(PV3_naa)}: divided by 1.04 it is today's value of the station built a year later, "
             "which gives a second twin in (c).</p>"),
         "criteria": [
             "Recognises an 8-year annuity, not a perpetuity: the station has no value after the eighth payment.",
             f"A(8, 4%) = {f(A8_0)} and PV = {f(PV3_naa)}.",
             f"NPV = {f(PV3_naa)} − 16 = {sg(NPV3_naa)} million NOK.",
             "Shows the annuity factor and the PV, not just the result.",
         ]},
        {"label": "b", "points": 5,
         "body": (
             "<p>Instead, Straumstein can wait one year and decide then. By that time the uncertainty is "
             "resolved: from Year 1 on, the risk-free rate will be either 2.5% or 6% for all maturities "
             "(the rate from Year 0 to Year 1 stays at 4%). The cost and the contract are the same if "
             "you build at t = 1, so the payments then fall in Years 2 to 9.</p>"
             "<p>What is the project's NPV from today's perspective (t = 0) in each case?</p>"),
         "solution": (
             "<p>If you wait, you get the same project one year later. Value it at t = 1 with the rate "
             "that then applies, then discount one year at the 4% that applies from Year 0 to Year 1.</p>"
             + tab(["State at t = 1", "A(8, r)", "PV<sub>1</sub>", "NPV at t = 1", "NPV at t = 0"],
                   [["r<sub>f</sub> = 2.5%", f(A8_u), f(PV3_u), sg(NPV3_u1), f"<b>{sg(NPV3_u0)}</b>"],
                    ["r<sub>f</sub> = 6%", f(A8_d), f(PV3_d), f(NPV3_d1), f"<b>{f(NPV3_d0)}</b>"]])
             + f"<p>For example, 2.4 × {f(A8_u)} − 16 = {sg(NPV3_u1)} and {sg(NPV3_u1)}/1.04 = "
             f"{sg(NPV3_u0)} million NOK; 2.4 × {f(A8_d)} − 16 = {f(NPV3_d1)} and {f(NPV3_d1)}/1.04 = "
             f"{f(NPV3_d0)} million NOK.</p>"
             "<p>The upside for the project is the <i>low</i> rate: a fixed stream of payments is worth "
             "more when it is discounted at 2.5%.</p>"),
         "criteria": [
             "Values each branch at t = 1 with that branch's rate, using 8 payments in Years 2 to 9.",
             f"Annuity factors {f(A8_u)} at 2.5% and {f(A8_d)} at 6%; PV at t = 1 = {f(PV3_u)} and {f(PV3_d)}.",
             f"NPV at t = 1: {sg(NPV3_u1)} and {f(NPV3_d1)}.",
             f"Discounts both to t = 0 at 4%, the rate from Year 0 to Year 1: {sg(NPV3_u0)} and {f(NPV3_d0)}. Using 2.5% or 6% for the first year is the trap.",
             "Bonus: identifies the 2.5% branch as the upside for the project.",
         ]},
        {"label": "c", "points": 6,
         "body": (
             "<p>You do not know the probabilities of the two rates. A government annuity bond that pays "
             "NOK 100 at the end of each of the next 9 years (Years 1 to 9) trades today at NOK 743.53.</p>"
             "<p>What is the risk-neutral probability of the 2.5% rate? Briefly explain why you do not "
             "need the true probabilities.</p>"),
         "solution": (
             "<p><b>Step 1. The bond's values at t = 1.</b> At t = 1 the holder receives the first NOK "
             "100 and keeps the remaining 8 payments, valued at the new rate. The payment at t = 1 "
             "belongs in the t = 1 value, as a dividend does for a share.</p>"
             + tab(["", "Calculation", "Value"],
                   [["S<sub>0</sub>, today", "market price", f(S0_3, 2)],
                    ["S<sub>u</sub>, t = 1 if r<sub>f</sub> = 2.5%", f"100 + 100 × {f(A8_u)}", f(Su3)],
                    ["S<sub>d</sub>, t = 1 if r<sub>f</sub> = 6%", f"100 + 100 × {f(A8_d)}", f(Sd3)]])
             + "<p>The bond is a valid twin because it pays exactly the stream the option delivers, the "
             "station built at t = 1 with payments in Years 2 to 9, plus a sure payment at t = 1 that "
             "is the same in both states. (Its price is the flat 4% value: 100 × A(9, 4%) = "
             f"{f(S0_eksakt)}.)</p>"
             "<p><b>Step 2. The formula-sheet expression</b> with the rate from Year 0 to Year 1:</p>"
             f"<p>ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) "
             f"= [1.04 × {f(S0_3, 2)} − {f(Sd3)}]/({f(Su3)} − {f(Sd3)}) = {f(FV3 - Sd3)}/{f(Su3 - Sd3)} "
             f"= <b>{f(rho3)}</b></p><p>and 1 − ρ = {f(1 - rho3)}.</p>"
             "<p><b>Step 3. Check with a second twin for the same stream.</b> The station built at t = 1 "
             f"is worth {f(PV3_u)} or {f(PV3_d)} at t = 1 and, at today's flat 4%, "
             f"{f(PV3_naa)}/1.04 = {f(S0_tv)} today:</p>"
             f"<p>ρ = [1.04 × {f(S0_tv)} − {f(PV3_d)}]/({f(PV3_u)} − {f(PV3_d)}) = <b>{f(rho3_tv)}</b> "
             "✓ (the small gap to Step 2 is the rounding of the bond price to two decimals).</p>"
             "<p><b>The traps.</b> Pairing S<sub>0</sub> = "
             f"{f(PV3_naa)} (the station built <i>now</i>, Years 1 to 8) with the t = 1 values of the "
             f"station built <i>at t = 1</i> (Years 2 to 9) gives {f(rho3_felle)}. It lies between 0 "
             "and 1, so only the rule catches it: S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must "
             "price the same cash flows. Leaving the NOK 100 paid at t = 1 out of S<sub>u</sub> and "
             f"S<sub>d</sub> gives {f(rho3_utenbet)}, which is above 1 and so caught at once.</p>"
             "<p><b>Why the true probabilities are not needed.</b> The option's payoff at t = 1 can be "
             "replicated with the bond and the risk-free asset. Its price must therefore equal the cost "
             "of that portfolio, which depends only on today's prices and not on anyone's probabilities "
             "or risk aversion. ρ is the probability that makes the bond earn the risk-free rate; it is "
             "not a forecast.</p>"),
         "criteria": [
             f"Uses the bond as the twin with S_0 = 743.53, S_u = 100 + 100 × A(8, 2.5%) = {f(Su3)} and S_d = 100 + 100 × A(8, 6%) = {f(Sd3)}.",
             f"Includes the NOK 100 paid at t = 1 in S_u and S_d. Leaving it out gives {f(rho3_utenbet)}, above 1.",
             f"Applies rho = [(1 + r_f)S_0 − S_d]/(S_u − S_d) with r_f = 4%: rho = {f(rho3)}.",
                          f"Avoids the trap of pairing S_0 = {f(PV3_naa)} (Years 1 to 8) with the t = 1 values for Years 2 to 9, which gives {f(rho3_felle)}. Any twin for the stream the option delivers gives the same answer, for example the station built at t = 1 with S_0 = {f(S0_tv)}: rho = {f(rho3_tv)}.",
             "Explains that the payoff can be replicated with the bond and the risk-free asset, so no probabilities or risk preferences enter: rho is not a forecast.",
         ]},
        {"label": "d", "points": 6,
         "body": (
             "<p>What is the value today of waiting and deciding at t = 1? You are not forced to build at "
             "t = 1. Do you build now or wait? How much more is the better choice worth? Briefly "
             "comment.</p>"),
         "solution": (
             "<p><b>Step 1. Payoffs at t = 1.</b> Waiting is a call on the station built at t = 1, "
             "struck at 16:</p>"
             f"<p>C<sub>u</sub> = max({f(PV3_u)} − 16, 0) = <b>{f(Cu3)}</b>; C<sub>d</sub> = "
             f"max({f(PV3_d)} − 16, 0) = <b>0</b> (you do not build).</p>"
             "<p><b>Step 2. Value with ρ from (c).</b></p>"
             f"<p>C<sub>0</sub> = [{f(rho3)} × {f(Cu3)} + {f(1 - rho3)} × 0]/1.04 = {f(rho3)} × "
             f"{f(NPV3_u0)} = <b>{f(W3)} million NOK</b></p>"
             f"<p>Replication gives the same: Δ = {f(Cu3)}/{f(Su3 - Sd3)} = {f(Delta3, 6)} bonds and "
             f"B = −{f(Sd3)} × {f(Delta3, 6)}/1.04 = {f(B3)}, so C<sub>0</sub> = 743.53 × "
             f"{f(Delta3, 6)} + ({f(B3)}) = {f(C03)}. It shares ρ, so it catches arithmetic slips only.</p>"
             "<p><b>Step 3. Decision.</b> Waiting is worth "
             f"{f(W3)}, building now {f(NPV3_naa)}. <b>Wait.</b> The option to wait is worth "
             f"{f(W3)} − max({f(NPV3_naa)}, 0) = <b>{f(OPT3)} million NOK</b> more than building now.</p>"
             "<p><b>Comment.</b> A positive NPV is not enough: building now kills the option. Waiting "
             "costs only the time value of the project (payments and outlay both move a year), while it "
             "lets you walk away from the 6% branch, where the station would lose "
             f"{f(-NPV3_d1)} million at t = 1. With the mismatched ρ = {f(rho3_felle)} from (c) the "
             f"same steps would give {f(W3_felle)}, which is wrong.</p>"),
         "criteria": [
             f"Applies the payoff max(PV_1 − 16, 0): {f(Cu3)} with 2.5% and 0 with 6%, because building is not forced.",
             f"Values it with rho from (c): {f(rho3)} × {f(NPV3_u0)} = {f(W3)} million NOK, or equivalently {f(rho3)} × {f(Cu3)}/1.04.",
             f"Compares with building now ({f(NPV3_naa)}), not with 0: the static NPV is positive, yet waiting is worth more, so the decision is to wait.",
             f"The option to wait is worth {f(W3)} − max({f(NPV3_naa)}, 0) = {f(OPT3)} more than building now. Reporting {f(W3)} as the gain from waiting ignores the positive NPV of building now.",
             "Comments briefly: a positive static NPV does not mean build now, because building now gives up the right to skip the 6% branch, while waiting costs only the time value of the project.",
             "Optional: replication with the bond gives the same value; it shares rho, so it catches arithmetic slips only.",
         ]},
    ]}

# ---------------------------------------------------------------- f4 n4
ex_f4_4 = {
    "n": 4, "title": "Credit risk", "points": 20,
    "topic": "Risky debt and credit default swaps", "chapters": [5, 22, 24],
    "merke": "Som V2024 P3 og CDS-eksemplet i Options II",
    "body": (
        "<p>Brakstad Eiendom ASA has issued one-year zero-coupon bonds with a face value of NOK 1,000 "
        "each. They trade at a promised yield to maturity of 8%. Rating analysts estimate that Brakstad "
        "defaults with probability 5%; if it does, each bond pays NOK 600 at maturity instead of NOK "
        "1,000. A one-year government zero-coupon bond with face value NOK 1,000 yields 3.5%, the "
        "risk-free rate.</p>"
        "<p>A credit default swap (CDS) contract on Brakstad pays NOK 1 at the end of the year if Brakstad "
        "defaults and nothing otherwise. It is paid for today. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What are the prices today of the government bond and of one Brakstad bond?</p>",
         "solution": (
             "<p>A bond's price is its promised payment discounted at its yield to maturity.</p>"
             f"<p>Government bond = 1,000/1.035 = <b>NOK {f(Pg4)}</b><br>"
             f"Brakstad bond = 1,000/1.08 = <b>NOK {f(Pb4)}</b></p>"),
         "criteria": [
             f"Government bond: 1,000/1.035 = {f(Pg4)}.",
             f"Brakstad bond: the promised 1,000 discounted at the promised yield, 1,000/1.08 = {f(Pb4)}.",
             "Does not discount the expected payment at the yield: the yield is defined on the promised payment.",
         ]},
        {"label": "b", "points": 4,
         "body": "<p>What is the expected return on a Brakstad bond? Why does it differ from its yield to maturity?</p>",
         "solution": (
             "<p>The expected return uses the payment the bond is expected to make, not the promised one:</p>"
             f"<p>E[payoff] = 0.95 × 1,000 + 0.05 × 600 = <b>{f(Epay4, 0)}</b><br>"
             f"Expected return = {f(Epay4, 0)}/{f(Pb4)} − 1 = <b>{pc(Er4)}</b></p>"
             f"<p>The yield of 8% is what Brakstad promises; it is earned only if Brakstad does not "
             f"default. The expected return of {pc(Er4)} is lower because the 5% chance of losing NOK 400 "
             f"is priced in. The spread of 8% − 3.5% = 4.5 points splits into "
             f"8% − {pc(Er4)} = {f(100 * (y4 - Er4), 2)} points of expected default loss and "
             f"{pc(Er4)} − 3.5% = {f(100 * (Er4 - rf4), 2)} points of risk premium: default tends to "
             "happen in bad times, so investors want more than the risk-free rate.</p>"),
         "criteria": [
             f"Expected payoff = 0.95(1,000) + 0.05(600) = {f(Epay4, 0)}, not 1,000.",
             f"Expected return = {f(Epay4, 0)}/{f(Pb4)} − 1 = {pc(Er4)}.",
             "Explains that the yield is the promised return, earned only without default, so the expected return is lower.",
             f"Better: the expected return still exceeds the risk-free 3.5% because default risk is systematic (a risk premium of {f(100 * (Er4 - rf4), 2)} points).",
         ]},
        {"label": "c", "points": 6,
         "body": (
             "<p>What is the risk-neutral probability that Brakstad defaults, as implied by the bond "
             "prices? What is the price of one CDS contract?</p>"),
         "solution": (
             "<p><b>Step 1. The tree.</b> Let ρ be the risk-neutral probability of <b>default</b> and put "
             "it in the bottom branch. The bond pays 1,000 with probability 1 − ρ and 600 with "
             "probability ρ; the CDS pays 0 and 1 in the same two branches.</p>"
             "<p><b>Step 2. Price the bond risk-neutrally.</b> Under ρ the expected payoff, discounted at "
             "the risk-free rate, must equal the market price from (a):</p>"
             f"<p>[(1 − ρ) × 1,000 + ρ × 600]/1.035 = {f(Pb4)}<br>"
             f"1,000 − 400ρ = 1.035 × {f(Pb4)} = {f(FV4)}<br>"
             f"ρ = {f(F4 - FV4)}/400 = <b>{f(rho4)}</b> ({pc(rho4)})</p>"
             "<p><b>Step 3. Price the CDS</b> with the same ρ and the risk-free rate. It pays 1 only in "
             "the default branch:</p>"
             f"<p>CDS = [(1 − ρ) × 0 + ρ × 1]/1.035 = {f(rho4)}/1.035 = <b>NOK {f(CDS4)}</b> per contract</p>"
             "<p><b>The trap.</b> Writing ρ × 1,000 + (1 − ρ) × 600 makes ρ the probability of "
             f"survival ({f(1 - rho4)}). Carrying that number into the CDS as if it were the default "
             f"probability gives {f(CDS4_felle)}, eight times too much. Either convention works if it is "
             "kept to the end. Using the analysts' 5% with the risk-free rate gives "
             f"{f(CDS4_sann)}, which underprices the protection.</p>"),
         "criteria": [
             "States the pricing condition: expected payoff under risk-neutral probabilities, discounted at the risk-free rate, equals the market price.",
             f"Sets up [(1 − rho)(1,000) + rho(600)]/1.035 = {f(Pb4)} and solves rho = {f(rho4)} as the probability of default.",
             "Discounts at the risk-free 3.5%, not at the 8% yield.",
             f"CDS = rho/1.035 = {f(CDS4)} per NOK 1 of protection.",
             f"Avoids confusing rho and 1 − rho: the CDS pays in default, so it uses the default probability. The survival probability {f(1 - rho4)} gives {f(CDS4_felle)}, which is wrong. Kurbatov (Options II recording) says more than half of a class lost points on exactly this.",
             f"Uses the risk-neutral probability, not the analysts' 5% (which would give {f(CDS4_sann)}).",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>A pension fund holds Brakstad bonds with a total face value of NOK 50 million. How many "
             "CDS contracts must it buy to remove all default risk? What do they cost? What is the "
             "hedged position worth today?</p>"),
         "solution": (
             f"<p>NOK 50 million of face value is {f(nbond4, 0)} bonds. Each loses 1,000 − 600 = 400 in "
             "default, so the fund needs 400 contracts per bond:</p>"
             f"<p>Contracts = {f(nbond4, 0)} × 400 = <b>{f(nCDS4, 0)}</b> (20 million)<br>"
             f"Cost = 20 million × {f(CDS4)} = <b>NOK {f(kost4)} million</b></p>"
             f"<p>The bonds are worth {f(nbond4, 0)} × {f(Pb4)} = NOK {f(verdi_obl4)} million, so the "
             f"hedged position is worth {f(verdi_obl4)} + {f(kost4)} = <b>NOK {f(pos4)} million</b>.</p>"
             "<p><b>Check.</b> The hedged position pays NOK 50 million for sure: 50 million without default, "
             "30 million plus 20 million from the CDS with default. It must cost what a government bond "
             f"with the same face value costs: 50/1.035 = {f(Ftot4 / (1 + rf4))} ✓. Equivalently, the put "
             f"in one bond is worth 400 × {f(CDS4)} = {f(put4)} = {f(Pg4)} − {f(Pb4)}. With the survival "
             f"probability in the CDS price the check fails badly (the position would cost "
             f"{f(pos4_felle)} million).</p>"),
         "criteria": [
             "Hedges the loss, not the face value: 400 per bond (Kurbatov's lambda, the exposure in default).",
             f"{f(nbond4, 0)} bonds × 400 = 20,000,000 contracts, costing 20 million × {f(CDS4)} = {f(kost4)} million.",
             f"Hedged position = {f(verdi_obl4)} + {f(kost4)} = {f(pos4)} million.",
             f"Bonus (not required): checks that this equals the price of a risk-free claim on 50 million, 50/1.035 = {f(Ftot4 / (1 + rf4))}. The check fails if rho and 1 − rho were mixed in (c).",
         ]},
        {"label": "e", "points": 3,
         "body": (
             "<p>Compare the default probability you found in (c) with the analysts' 5%. Explain the "
             "difference briefly and say which of the two prices the CDS.</p>"),
         "solution": (
             f"<p>The risk-neutral default probability is {pc(rho4)}, about twice the analysts' 5%. "
             "Default tends to happen in bad states of the economy, when a krone is worth more to "
             "investors, so they require a risk premium for holding Brakstad's debt. Risk-neutral "
             "valuation keeps the risk-free discount rate and puts that premium into the probability "
             "instead, which inflates the weight on the default state. The CDS is a traded claim on the "
             f"same default event, so it is priced with the risk-neutral {pc(rho4)}, not with the "
             "analysts' 5%.</p>"),
         "criteria": [
             f"States that the risk-neutral probability ({pc(rho4)}) is higher than the real 5%.",
             "Explains why: default happens in bad times, so investors demand a risk premium, which risk-neutral valuation puts into the probability rather than the discount rate.",
             "Says that the CDS is priced with the risk-neutral probability and the risk-free rate, never with the real probability and the risk-free rate.",
         ]},
    ]}

# ---------------------------------------------------------------- f5 n3
def kr(x):
    return f(x, 0)


ex_f5_3 = {
    "n": 3, "title": "Real Options", "points": 20,
    "topic": "Real options", "chapters": [1, 25],
    "merke": "Som H2025 E5: markedsstudie, exit og likegyldighet",
    "body": (
        "<p>You are considering opening a self-service car wash in Harstad. It costs NOK 2,400,000 to "
        "open. Running it costs NOK 900,000 per year. It will bring in revenue of either NOK 1,250,000 "
        "or NOK 720,000 per year forever; the high revenue has probability 55%. You don't know the state "
        "of the world at the moment, but if you open the car wash you will learn it during Year 1. "
        "Demand for car washes is unrelated to the stock market, so discount all cash flows at the "
        "risk-free rate of 5%.</p>"),
    "parts": [
        {"label": "a", "points": 2,
         "body": "<p>What is the NPV of opening the car wash right now? Will you open it?</p>",
         "solution": (
             "<p>Net cash flow: 1,250,000 − 900,000 = +350,000 in the good state and 720,000 − 900,000 "
             "= −180,000 in the bad state.</p>"
             f"<p>Expected = 0.55 × 350,000 + 0.45 × (−180,000) = <b>{kr(Ec5)} NOK per year</b><br>"
             f"PV = {kr(Ec5)}/0.05 = {kr(PV5)}<br>NPV = {kr(PV5)} − 2,400,000 = <b>{kr(NPV5)} NOK</b></p>"
             "<p><b>Do not open.</b> Opening now commits you to run the car wash forever in both "
             "states.</p>"),
         "criteria": [
             "Nets the running cost against revenue first: +350,000 and −180,000.",
             f"Expected cash flow {kr(Ec5)} per year with the 55/45 weights, valued as a perpetuity at 5%: {kr(PV5)}.",
             f"NPV = {kr(NPV5)}: do not open.",
         ]},
        {"label": "b", "points": 4,
         "body": (
             "<p>How much would you be willing to pay for a market study? The study has already been "
             "conducted, so if you pay C<sub>0</sub> now, you immediately know the state of the market.</p>"),
         "solution": (
             f"<p><i>Good state:</i> NPV = 350,000/0.05 − 2,400,000 = {kr(cg5 / r5)} − 2,400,000 = "
             f"<b>{kr(NPVg5)}</b>, so you open.<br>"
             f"<i>Bad state:</i> NPV = −180,000/0.05 − 2,400,000 = {kr(NPVb5)}, so you do not open and "
             "get 0.</p>"
             f"<p>Value with the study = 0.55 × {kr(NPVg5)} + 0.45 × 0 = {kr(C0_5)}. Without it you do "
             "not open, which is worth max(NPV, 0) = 0.</p>"
             f"<p><b>You would pay up to C<sub>0</sub> = {kr(C0_5)} NOK.</b> The value comes from being "
             "able to stay out in the bad state.</p>"),
         "criteria": [
             f"Values each state: good {kr(NPVg5)} (open), bad {kr(NPVb5)} (stay out, 0).",
             f"Takes the expectation of max(0, NPV): 0.55 × {kr(NPVg5)} = {kr(C0_5)}.",
             "Compares with the base case max(NPV, 0) = 0, not with the negative NPV.",
             "States it as a maximum willingness to pay.",
         ]},
        {"label": "c", "points": 4,
         "body": (
             "<p>How would your answer change if the study took one year to complete? In other words, you "
             "pay C<sub>1</sub> now, wait a year, learn the state and then decide whether to open. Compare "
             "with (b) and comment.</p>"),
         "solution": (
             "<p>You would not open immediately anyway (the NPV is negative), so you wait for the "
             "result. The good-state project is the same one year later:</p>"
             f"<p>C<sub>1</sub> = 0.55 × {kr(NPVg5)}/1.05 = 0.55 × {kr(NPVg5 / (1 + r5))} = "
             f"<b>{kr(C1_5)} NOK</b></p>"
             f"<p>This is {kr(diff5)} less than in (b). Waiting a year means you <b>lose the Year-1 cash "
             f"flow</b> in the good state, worth 350,000/1.05 = {kr(tapt5)}, while the outlay costs "
             f"{kr(spart5)} less in today's money: 0.55 × ({kr(tapt5)} − {kr(spart5)}) = {kr(diff5)} ✓.</p>"),
         "criteria": [
             "Notes that you would not open now anyway, so you wait for the result.",
             f"Discounts the good-state NPV one year: {kr(NPVg5)}/1.05 = {kr(NPVg5 / (1 + r5))}; C_1 = {kr(C1_5)}.",
             "Says it is lower than in (b).",
             "Explains why: you lose the Year-1 cash flow. As in Kurbatov's H2025 key, mentioning this is enough; the full split against the cheaper outlay is not required.",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>For the rest of the exercise, the study is not available.</p><p>The municipality offers "
             "new businesses a programme: after 3 years you may close the car wash and leave the market. "
             "You recover nothing, so if you exit you get 0 forever from Year 4. What is the NPV of opening "
             "now? Will you open it? What is the programme worth to you?</p>"),
         "solution": (
             "<p>You still open before you know the state, so the cash flows of Years 1 to 3 come in both "
             "states. After Year 3 you exit only in the bad state.</p>"
             f"<p><i>Good state:</i> you never exit: NPV = <b>{kr(NPVg5)}</b>.<br>"
             f"<i>Bad state:</i> NPV = −2,400,000 − 180,000 × A(3, 5%) = −2,400,000 − 180,000 × "
             f"{f(AF5)} = <b>{kr(NPVb5_exit)}</b></p>"
             f"<p>NPV = 0.55 × {kr(NPVg5)} + 0.45 × ({kr(NPVb5_exit)}) = <b>{kr(NPV5_exit)} NOK</b>. "
             "<b>Open now.</b></p>"
             "<p><b>The programme's value.</b> Without it you would not open, so the alternative is 0. "
             f"The programme is worth <b>{kr(verdi_exit5)} NOK</b> to you. Measuring it against the "
             f"negative NPV gives {kr(NPV5_exit)} − ({kr(NPV5)}) = {kr(feil_exit5)}: that is what the "
             "clause would be worth to someone already bound to run the car wash, which you are not. "
             "(Check: 0.45 × (180,000/0.05)/1.05<sup>3</sup> = "
             f"{kr(klausul5)}.)</p>"),
         "criteria": [
             "Takes Years 1 to 3 in both states: the exit comes only after the state is known and three years have passed.",
             f"Good state unchanged at {kr(NPVg5)}; bad state −2,400,000 − 180,000 × {f(AF5)} = {kr(NPVb5_exit)}.",
             f"Expected NPV = {kr(NPV5_exit)}: open now.",
             f"Values the programme against 0, the best alternative: {kr(verdi_exit5)}. Using the negative NPV as the baseline ({kr(feil_exit5)}) is wrong. Kurbatov (wrap-up): price the option against the baseline or zero, whichever is higher.",
         ]},
        {"label": "e", "points": 6,
         "body": (
             "<p>Keep the exit programme from (d). For which probability of the high revenue are you "
             "indifferent about opening the car wash? How high would that probability have to be without "
             "the programme? Comment briefly.</p>"),
         "solution": (
             "<p><b>Step 1. With the programme.</b> Let p be the probability of the high revenue. The two "
             "state NPVs from (d) do not depend on p:</p>"
             f"<p>0 = p × {kr(NPVg5)} + (1 − p) × ({kr(NPVb5_exit)})<br>"
             f"p = {kr(-NPVb5_exit)}/({kr(NPVg5)} + {kr(-NPVb5_exit)}) = {kr(-NPVb5_exit)}/"
             f"{kr(NPVg5 - NPVb5_exit)} = <b>{f(pstar5)}</b></p>"
             "<p><b>Step 2. Without the programme.</b> You open if the expected perpetuity covers the "
             "outlay:</p>"
             f"<p>[p × 350,000 + (1 − p) × (−180,000)]/0.05 = 2,400,000<br>"
             f"530,000p − 180,000 = 120,000<br>p = 300,000/530,000 = <b>{f(pstar5_uten)}</b></p>"
             f"<p><b>Check.</b> At 55% you are between the two: {f(pstar5)} &lt; 0.55 &lt; "
             f"{f(pstar5_uten)}, which is why (a) said no and (d) said yes.</p>"
             "<p><b>Comment.</b> The programme lowers the required probability from "
             f"{pc(pstar5_uten)} to {pc(pstar5)}. It cuts the bad-state perpetuity of −180,000 down to "
             "three years, while the good state keeps its perpetuity, so the downside matters much less "
             "for the decision.</p>"),
         "criteria": [
             f"With the programme: sets p × {kr(NPVg5)} + (1 − p) × ({kr(NPVb5_exit)}) = 0 and finds p = {f(pstar5)}.",
             "Keeps the asymmetry: the good state is a perpetuity and the bad state three years of losses plus the outlay.",
             f"Without the programme: p × 350,000 − (1 − p) × 180,000 = 0.05 × 2,400,000, so p = {f(pstar5_uten)}.",
             "Shows the equations, not just the results.",
             "Comments: the programme widens the range of probabilities for which you open, because it truncates only the downside.",
             "Bonus: noting that 55% lies between the two thresholds, consistent with (a) and (d).",
         ]},
    ]}

# ---------------------------------------------------------------- f5 n4
ex_f5_4 = {
    "n": 4, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Som H2025 E6: oppkjøp med aksjebytte, kursreaksjon og avstemning",
    "body": (
        "<p>Nordvarde Telecom ASA (A) recently announced its intention to acquire Lofotnett ASA (B). The "
        "news came suddenly and there was no anticipation effect. The deal is expected to be completed or "
        "to fail in exactly one year from now. If the deal goes through, every 4 shares of B will be "
        "exchanged for 3 shares of A. If the deal fails, prices will return to their original levels.</p>"
        "<p>Share prices before the announcement were P<sub>A,0</sub> = NOK 84 and P<sub>B,0</sub> = "
        "NOK 52. Immediately after the announcement P<sub>A,1</sub> = NOK 86 and P<sub>B,1</sub> = NOK "
        "60. The one-year risk-free rate is r<sub>f</sub> = 4%.</p>"),
    "parts": [
        {"label": "a", "points": 12,
         "body": (
             "<p>Based on the market prices, calculate the probability of the deal being completed as "
             "perceived by the market. (Hint: use a long-short strategy and invest the proceeds from the "
             "short sale at the risk-free rate.)</p>"),
         "solution": (
             "<p>Build a position whose two payoffs are known, price it against its cost and solve for "
             "the probability the market uses (the Mannesmann example).</p>"
             "<p><b>Step 1. The position, at post-announcement prices.</b></p>"
             + tab(["Leg", "Action", "Cash flow today"],
                   [["Long target", "Buy 4 shares of B at 60", f(-lang6, 0)],
                    ["Short acquirer", "Short-sell 3 shares of A at 86", "+" + f(kort6, 0)],
                    ["Risk-free", f"Invest the {f(kort6, 0)} at 4%", f(-kort6, 0)],
                    ["<b>Net outlay</b>", "", f"<b>{f(-lang6, 0)}</b>"]])
             + "<p><b>Step 2. Success.</b> The 4 B shares become exactly the 3 A shares needed to close "
             f"the short, so you keep the bond: {f(kort6, 0)} × 1.04 = <b>{f(suk6, 2)}</b>.</p>"
             "<p><b>Step 3. Failure.</b> Prices return to 84 and 52. You buy back 3 A shares and sell "
             f"the 4 B shares: {f(inv6, 2)} − 3 × 84 + 4 × 52 = {f(inv6, 2)} − 252 + 208 = "
             f"<b>{f(feil6, 2)}</b>.</p>"
             f"<p><b>Step 4. Certainty equivalent.</b> The position cost {f(lang6, 0)} today, so its "
             f"expected payoff in a year must be {f(lang6, 0)} × 1.04 = <b>{f(SE6, 2)}</b>. Do not plug "
             f"in {f(lang6, 0)}: that gives {f(p6_felle)}.</p>"
             f"<p><b>Step 5. Solve.</b> {f(SE6, 2)} = p × {f(suk6, 2)} + (1 − p) × {f(feil6, 2)}<br>"
             f"p = ({f(SE6, 2)} − {f(feil6, 2)})/({f(suk6, 2)} − {f(feil6, 2)}) = {f(SE6 - feil6, 2)}/"
             f"{f(suk6 - feil6, 0)} = <b>{f(p6)} ({pc(p6)})</b></p>"
             f"<p><b>Check.</b> {f(p6)} × {f(suk6, 2)} + {f(1 - p6)} × {f(feil6, 2)} = {f(SE6, 2)} ✓. "
             f"B trades at 60, between its stand-alone 52 and the 0.75 × 86 = {f(0.75 * PA1_6, 2)} it "
             "would be worth on completion, as it must.</p>"),
         "criteria": [
             "Builds a long-short position in the exchange ratio: long 4 B for every 3 A shorted. Many constructions are valid; only internal consistency matters.",
             f"Invests the short proceeds at the risk-free rate: 258 × 1.04 = {f(suk6, 2)}.",
             f"Success payoff {f(suk6, 2)}: the B shares convert into the A shares needed to close the short.",
             f"Failure payoff {f(inv6, 2)} − 252 + 208 = {f(feil6, 2)}, using the pre-announcement prices.",
             f"Certainty equivalent of the 240 outlay: 240 × 1.04 = {f(SE6, 2)}. Plugging in 240 gives {f(p6_felle)}.",
             f"Solves {f(SE6, 2)} = p({f(suk6, 2)}) + (1 − p)({f(feil6, 2)}): p = {f(p6)}. The certainty equivalent (or, with a zero-cost position, setting the expected payoff to 0) is the step that must not be skipped; reasonable approximations are fine.",
             "Shows the whole construction: position, both payoffs, certainty equivalent and the equation.",
         ]},
        {"label": "b", "points": 4,
         "body": (
             "<p>Based on the market's reaction to the announcement, what could be the reason for this "
             "deal? Choose one reason (not synergies!) and explain it briefly in 2-3 sentences.</p>"),
         "solution": (
             f"<p><b>Read the reaction first.</b> A rose from 84 to 86 ({sg(100 * endrA6, 2)}%) and B from "
             f"52 to 60 ({sg(100 * endrB6, 2)}%). The market believes the deal creates value for both "
             "sets of shareholders, even though A pays in shares, which often makes the acquirer's price "
             "fall.</p>"
             "<p><b>Model answer (replacing poor management).</b> Lofotnett's managers may run the "
             "company badly, for example by keeping costs high or sitting on unused network capacity. "
             "Nordvarde can replace them and run the same assets better, so B's shareholders gain from "
             "the premium and A's from the improvement it keeps. This is a governance motive, not a "
             "synergy: the value comes from fixing B, not from combining the two firms.</p>"
             "<p><b>Also accepted if argued from the reaction:</b> A's managers know that B is "
             "undervalued; B gains access to resources it could not finance alone (for example it lacks "
             "capital for investments); increased market power or reduced competition in the regional "
             "telecom market, which lets the merged firm charge more.</p>"),
         "criteria": [
             "Uses the price reaction as evidence: both A and B rise, so the market sees value created for both.",
             "Gives one reason in 2-3 sentences; it is not synergies.",
             "Accepted: replacing inefficient target management, an undervalued target, the target gaining access to financing or resources it lacks, increased market power or reduced competition. The reason must fit A rising.",
             "Not accepted: value creation or a good deal without the mechanism behind it; tax losses as a motive.",
             "Bonus: noting that A rises although it pays in shares, so the market does not read the offer as a sign that A is overvalued.",
         ]},
        {"label": "c", "points": 4,
         "body": (
             "<p>You own shares in B. B's board recommends the offer and lets B's shareholders vote on it. "
             "Based on the reason you chose in (b), how would you vote? How will the market react to the "
             "result if most other shareholders vote like you? Briefly explain.</p>"),
         "solution": (
             f"<p><b>Minimal answer.</b> As a shareholder of B I vote <b>in favour</b>: the offer is "
             f"worth 0.75 × 86 = {f(0.75 * PA1_6, 2)} per B share against a stand-alone value of 52. Under my reason in (b) the deal is good for both firms. If most shareholders vote yes, "
             "completion becomes more likely, so <b>B's price moves up towards 0.75 × P<sub>A</sub></b> "
             "and A stays at or above 86. The gap between B's price and the exchange value shrinks as "
             "the probability approaches 1.</p>"
             "<p><b>Bonus thought.</b> Because A's price also rose, A keeps part of the gain. B's "
             "shareholders could vote no to push for a better ratio, since the target has the bargaining "
             "power to say no. The risk is that A walks away and prices fall back to 84 and 52.</p>"
             "<p>What is graded is consistency with (b): a vote against is also defensible if (b) argued "
             "that B is worth more than the offer.</p>"),
         "criteria": [
             "Votes in favour (or gives a consistent reason to vote against) and explains it from the reason in (b).",
             "States the market reaction: with a yes, the completion probability rises, B moves towards 0.75 × P_A and A holds its gain.",
             "The vote and the reaction are consistent with the reason in (b); an inconsistent pair loses points.",
             "Bonus: the target's bargaining power (vote no to get a better ratio) and the risk that prices revert to 84 and 52 if A walks away.",
         ]},
    ]}

# ---------------------------------------------------------------- f6 n3
ex_f6_3 = {
    "n": 3, "title": "Risk-neutral valuation", "points": 20,
    "topic": "Real options, risk-neutral valuation", "chapters": [22, 25],
    "merke": "Som H2024 E6: investere nå eller vente når markedet er usikkert",
    "body": (
        "<p>Sildvik Feeder AS can order a container feeder vessel for NOK 240 million, paid on delivery, "
        "which is immediate. A vessel earns a charter hire at the end of each year for 12 years, the "
        "first one year after delivery. It has no value after that. The hire depends on the charter "
        "market, which is revealed at t = 1 and never changes: NOK 32 million a year if the market is "
        "strong and NOK 24 million if it is weak. Once the market is known, the hire is fixed by "
        "contract and risk-free. The risk-free rate is 4%. Analysts put the probability of a strong "
        "market at 65%.</p>"
        "<p>Mjøsund Shipping ASA is listed and has no debt. Its only assets are two vessels identical to "
        "Sildvik's, delivered today. It pays out each hire as a dividend when received. Its market "
        "value today is NOK 533 million. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>What is the NPV of ordering the vessel now? Value the vessel with Mjøsund's market value.</p>",
         "solution": (
             "<p>Mjøsund owns exactly two vessels like the one Sildvik would get today, so one vessel is "
             "worth half of Mjøsund:</p>"
             f"<p>V = 533/2 = {f(V7_naa)}<br>NPV = {f(V7_naa)} − 240 = <b>{sg(NPV7_naa)} million NOK</b></p>"
             "<p>Valuing the vessel with the analysts' 65% and the risk-free rate would give "
             f"{f(V7_sann)}: the charter market is risky, so its real probabilities cannot be discounted "
             "at r<sub>f</sub>. The market value already prices that risk.</p>"),
         "criteria": [
             f"One vessel is half of Mjøsund: 533/2 = {f(V7_naa)}.",
             f"NPV = {f(V7_naa)} − 240 = {sg(NPV7_naa)} million NOK.",
             "Does not value the vessel with the 65% and the risk-free rate: the market risk is priced.",
         ]},
        {"label": "b", "points": 6,
         "body": (
             "<p>Instead, Sildvik can wait one year, learn the market and decide then. The yard will then "
             "charge NOK 264 million, paid at t = 1; the hire then falls in Years 2 to 13. What is the "
             "NPV of ordering at t = 1 in each market, measured at t = 1 and from today's perspective?</p>"),
         "solution": (
             "<p>Once the market is known, the hire is risk-free, so it is discounted at 4%:</p>"
             f"<p>A(12, 4%) = [1 − 1.04<sup>−12</sup>]/0.04 = <b>{f(A12)}</b></p>"
             + tab(["Market", "PV<sub>1</sub> of the hire", "NPV at t = 1", "NPV at t = 0"],
                   [["Strong", f"32 × {f(A12)} = {f(PV7_u1)}", sg(NPV7_u1), f"<b>{sg(NPV7_u0)}</b>"],
                    ["Weak", f"24 × {f(A12)} = {f(PV7_d1)}", f(NPV7_d1), f"<b>{f(NPV7_d0)}</b>"]])
             + f"<p>NPV at t = 1 = PV<sub>1</sub> − 264; NPV at t = 0 = NPV at t = 1 divided by 1.04, "
             f"for example {sg(NPV7_u1)}/1.04 = {sg(NPV7_u0)}. You would order at t = 1 only in a "
             "strong market.</p>"),
         "criteria": [
             f"Uses 12 hires in Years 2 to 13 and the higher price of 264: A(12, 4%) = {f(A12)}.",
             f"NPV at t = 1: 32 × {f(A12)} − 264 = {sg(NPV7_u1)} and 24 × {f(A12)} − 264 = {f(NPV7_d1)}.",
             f"From today's perspective, divided by 1.04: {sg(NPV7_u0)} and {f(NPV7_d0)}.",
             "Discounts at the risk-free rate: once the market is known the hire is fixed by contract.",
             "Bonus: notes that you would order only in a strong market.",
         ]},
        {"label": "c", "points": 7,
         "body": (
             "<p>What is the risk-neutral probability of a strong market? Compare it with the analysts' "
             "65% and explain the difference briefly.</p>"),
         "solution": (
             "<p><b>Step 1. Mjøsund's values at t = 1.</b> At t = 1 Mjøsund pays the first hire on both "
             "vessels as a dividend and keeps 11 more years of hire, now risk-free. The dividend belongs "
             "in the t = 1 value, because the owner today receives it:</p>"
             f"<p>A(11, 4%) = {f(A11)}</p>"
             + tab(["", "Calculation", "Value"],
                   [["S<sub>0</sub>", "market value", "533"],
                    ["S<sub>u</sub>, strong", f"64 + 64 × {f(A11)}", f(Su7)],
                    ["S<sub>d</sub>, weak", f"48 + 48 × {f(A11)}", f(Sd7)]])
             + "<p><b>Step 2. The formula-sheet expression.</b></p>"
             f"<p>ρ = [1.04 × 533 − {f(Sd7)}]/({f(Su7)} − {f(Sd7)}) = {f(FV7 - Sd7)}/{f(Su7 - Sd7)} = "
             f"<b>{f(rho7)}</b></p>"
             "<p>S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> all price the same security. Mjøsund is a "
             "valid twin because in each market its value is a fixed multiple of the vessel Sildvik "
             "would order, so the option's payoff can be replicated with Mjøsund shares and the "
             "risk-free asset.</p>"
             "<p><b>Comparison with 65%.</b> ρ is lower than the analysts' 65%. A strong charter market "
             "comes with a strong economy, when money is worth less to investors, so they pay less for "
             "payoffs in that state. Risk-neutral valuation keeps r<sub>f</sub> and moves the risk "
             "premium into the probabilities: less weight on the good state, more on the bad.</p>"
             "<p><b>Check that can fail.</b> Leaving the t = 1 dividend out of S<sub>u</sub> and "
             f"S<sub>d</sub> gives ({f(FV7)} − 48 × {f(A11)})/(16 × {f(A11)}) = {f(rho7_felle)}. It lies "
             "between 0 and 1, but it is above the real 65%, which makes no sense for a payoff that is "
             "high in good times. That comparison catches the error.</p>"),
         "criteria": [
             f"Uses Mjøsund as the twin with S_0 = 533, S_u = 64 + 64 × A(11, 4%) = {f(Su7)} and S_d = 48 + 48 × A(11, 4%) = {f(Sd7)}.",
             f"Includes the dividend paid at t = 1 in S_u and S_d. Leaving it out gives {f(rho7_felle)}.",
             f"rho = [1.04 × 533 − {f(Sd7)}]/({f(Su7)} − {f(Sd7)}) = {f(rho7)}.",
             "Uses the same security for S_0, S_u and S_d; mixing Mjøsund's price with the values of the vessel ordered at t = 1 is wrong.",
             "Explains that rho is below 65% because the strong market is a good state of the economy, so the risk premium lowers its risk-neutral weight.",
         ]},
        {"label": "d", "points": 4,
         "body": (
             "<p>What is the value today of waiting and deciding at t = 1? Do you order now or wait? "
             "Briefly comment.</p>"),
         "solution": (
             "<p><b>Step 1. Value of waiting.</b> At t = 1 you order only in a strong market:</p>"
             f"<p>C<sub>0</sub> = [{f(rho7)} × {f(NPV7_u1)} + {f(1 - rho7)} × 0]/1.04 = {f(rho7)} × "
             f"{f(NPV7_u0)} = <b>{f(W7)} million NOK</b></p>"
             f"<p>Replication gives the same: Δ = {f(NPV7_u1)}/{f(Su7 - Sd7)} = {f(Delta7, 6)} of Mjøsund "
             f"and B = −{f(Sd7)} × {f(Delta7, 6)}/1.04 = {f(B7)}, so 533 × {f(Delta7, 6)} + ({f(B7)}) = "
             f"{f(W7)}. It shares ρ, so it catches arithmetic slips only.</p>"
             f"<p><b>Step 2. Decision.</b> Ordering now is worth {sg(NPV7_naa)}, waiting {f(W7)}. "
             f"<b>Order now</b>: waiting is worth {f(-OPT7)} million less.</p>"
             "<p><b>Comment.</b> Waiting lets you skip the weak market, but it costs a year of hire and "
             "a 10% higher price at the yard. The strong market is also the more likely state. Here the "
             "cost of waiting is larger than the value of the information. Had the price stayed at 240, "
             f"waiting would be worth {f(W7_240)} and you would wait: the higher price decides it.</p>"),
         "criteria": [
             f"Payoff max(NPV at t = 1, 0): {f(NPV7_u1)} in a strong market, 0 in a weak one.",
             f"Value of waiting = {f(rho7)} × {f(NPV7_u0)} = {f(W7)} million NOK, using rho from (c).",
             f"Compares with ordering now ({sg(NPV7_naa)}) and decides to order now.",
             "Comments: waiting costs a year of hire and a higher price, which outweighs the value of avoiding the weak market.",
             f"Bonus: without the price increase waiting would be worth {f(W7_240)} and the decision would flip.",
         ]},
    ]}

# ---------------------------------------------------------------- f6 n4
ex_f6_4 = {
    "n": 4, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions", "chapters": [22, 26],
    "merke": "Som H2025 E6: oppkjøp med aksjebytte over et halvt år",
    "body": (
        "<p>Hestvik Kraft ASA (A) has announced an offer to acquire Tussen Energi ASA (B). The offer came "
        "as a surprise. A pays in shares: if the deal goes through, each share of B will be exchanged for "
        "2 shares of A. The deal will be completed or fail in exactly 6 months. If it fails, both prices "
        "return to their pre-announcement levels.</p>"
        "<p>Before the announcement P<sub>A,0</sub> = NOK 35.00 and P<sub>B,0</sub> = NOK 58.00. "
        "Immediately after, P<sub>A,1</sub> = NOK 33.00 and P<sub>B,1</sub> = NOK 61.00. The risk-free "
        "rate is 5% a year. Use 4 decimal places.</p>"),
    "parts": [
        {"label": "a", "points": 10,
         "body": (
             "<p>Based on the market prices, what is the probability of the deal being completed as "
             "perceived by the market?</p>"),
         "solution": (
             "<p><b>Step 1. The six-month rate.</b> Discrete compounding over half a year: "
             f"(1.05)<sup>0.5</sup> = <b>{f(F8, 6)}</b>.</p>"
             "<p><b>Step 2. The position, at post-announcement prices.</b></p>"
             + tab(["Leg", "Action", "Cash flow today"],
                   [["Long target", "Buy 1 share of B at 61", "−61.0000"],
                    ["Short acquirer", "Short-sell 2 shares of A at 33", "+66.0000"],
                    ["Risk-free", "Invest the 66 for 6 months", "−66.0000"],
                    ["<b>Net outlay</b>", "", "<b>−61.0000</b>"]])
             + f"<p><b>Step 3. Success.</b> The B share becomes 2 A shares and closes the short: 66 × "
             f"{f(F8, 6)} = <b>{f(suk8)}</b>.</p>"
             f"<p><b>Step 4. Failure.</b> Buy back 2 A at 35 and sell B at 58: {f(inv8)} − 70 + 58 = "
             f"<b>{f(feil8)}</b>.</p>"
             f"<p><b>Step 5. Certainty equivalent.</b> 61 × {f(F8, 6)} = <b>{f(SE8)}</b>.</p>"
             f"<p><b>Step 6. Solve.</b> p = ({f(SE8)} − {f(feil8)})/({f(suk8)} − {f(feil8)}) = "
             f"{f(SE8 - feil8)}/12 = <b>{f(p8)} ({pc(p8)})</b></p>"
             f"<p><b>Check.</b> {f(p8)} × {f(suk8)} + {f(1 - p8)} × {f(feil8)} = {f(SE8)} ✓. B at 61 "
             "lies between 58 and the 2 × 33 = 66 it would be worth on completion.</p>"
             "<p><b>The traps.</b> Using the full-year factor 1.05 gives "
             f"{f(p8_helaar)}; plugging in 61 instead of the certainty equivalent gives {f(p8_felle)}. "
             f"Simple interest, 1 + 0.05 × 0.5, gives {f(p8_enkel)}: close enough, but the course uses "
             "(1 + r<sub>f</sub>)<sup>T</sup>.</p>"),
         "criteria": [
             f"Converts the rate to six months with discrete compounding: 1.05^0.5 = {f(F8, 6)}, not 1.05.",
             "Long 1 B and short 2 A (the exchange ratio), short proceeds invested at the risk-free rate. Other consistent constructions are accepted.",
             f"Success payoff 66 × {f(F8, 6)} = {f(suk8)}; failure payoff {f(inv8)} − 70 + 58 = {f(feil8)}.",
             f"Certainty equivalent 61 × {f(F8, 6)} = {f(SE8)}, not 61 (which gives {f(p8_felle)}).",
             f"p = {f(p8)}. The full-year factor gives {f(p8_helaar)}, which is wrong.",
         ]},
        {"label": "b", "points": 4,
         "body": (
             "<p>Based on the market's reaction, give one possible reason for the deal other than "
             "synergies, in 2-3 sentences. Then explain briefly what A's choice to pay in shares rather "
             "than cash may tell the market.</p>"),
         "solution": (
             f"<p><b>Read the reaction.</b> A fell from 35 to 33 ({f(100 * endrA8, 2)}%), B rose from 58 "
             f"to 61 ({sg(100 * endrB8, 2)}%). The market thinks A overpays and that value moves from A's "
             "shareholders to B's.</p>"
             "<p><b>Model reason (empire building).</b> Hestvik's CEO may want to run a larger company "
             "and buy growth in a new segment, paying more for Tussen than it is worth to Hestvik. B's "
             "shareholders collect the premium; A's shareholders pay for it. Managerial hubris, the "
             "winner's curse or diversification that shareholders could do themselves are also "
             "accepted.</p>"
             "<p><b>Paying in shares.</b> Managers who believe their own shares are overvalued prefer to "
             "pay with them, as with an equity issue. Investors know this, so a share offer can signal "
             "that A is overpriced, which adds to A's fall. B's shareholders also share the risk of A's "
             "price after the deal, so A's managers may pay in shares because they are less sure of the "
             "deal's value.</p>"),
         "criteria": [
             "Reads the reaction: A down, B up, so the market sees A overpaying and value moving to B's shareholders.",
             "One reason other than synergies in 2-3 sentences that fits A falling (empire building, hubris, the winner's curse, unnecessary diversification).",
             "Explains what a share offer may tell the market: managers pay with shares when they think the shares are overvalued, so A's price falls further. Also accepted: risk sharing, since paying in shares lets B's shareholders carry part of the risk when A is uncertain about the deal's value.",
             "Not accepted: synergies, value creation without a mechanism, or tax losses.",
         ]},
        {"label": "c", "points": 6,
         "body": (
             "<p>A's board lets its shareholders vote on the deal. The vote is advisory: the board is not "
             "bound by it. The result is announced 3 months after the announcement of the offer. Right "
             "after it P<sub>A</sub> = NOK 34.40 and P<sub>B</sub> = NOK 58.80. The deal will still be "
             "completed or fail at the original date.</p><p>What completion probability do these prices "
             "imply? As a shareholder of A, how would you have voted given your reason in (b)? Is the "
             "market reaction consistent with that? Briefly explain.</p>"),
         "solution": (
             "<p><b>Step 1. Three months remain.</b> (1.05)<sup>0.25</sup> = "
             f"<b>{f(F8c, 6)}</b>.</p>"
             "<p><b>Step 2. The same construction at the new prices.</b> Buy 1 B at 58.80, short 2 A at "
             "34.40 and invest 68.80:</p>"
             f"<p>Success: 68.80 × {f(F8c, 6)} = {f(suk8c)}<br>Failure: {f(inv8c)} − 70 + 58 = "
             f"{f(feil8c)}<br>Certainty equivalent: 58.80 × {f(F8c, 6)} = {f(SE8c)}</p>"
             f"<p>p = ({f(SE8c)} − {f(feil8c)})/12 = {f(SE8c - feil8c)}/12 = <b>{f(p8c)} ({pc(p8c)})</b></p>"
             "<p><b>The vote.</b> With the reason in (b) the deal destroys value for A's shareholders, so "
             "I vote against. The prices say most shareholders did the same: the probability fell from "
             f"{pc(p8)} to {pc(p8c)}. Both prices moved most of the way back to 35 and 58.</p>"
             "<p><b>Why not all the way.</b> The vote is advisory, so an entrenched board may still go "
             "ahead: a probability of about 16% survives. B may also stay a little above 58 if the bid "
             "revealed that B was worth more than the market thought; then the reversion assumption "
             "overstates p.</p>"
             f"<p>Using 6 months instead of the 3 that remain gives {f(p8c_halv)}; the full-year factor "
             f"gives {f(p8c_helaar)}.</p>"),
         "criteria": [
             f"Uses the remaining 3 months: 1.05^0.25 = {f(F8c, 6)}.",
             f"Success {f(suk8c)}, failure {f(feil8c)}, certainty equivalent {f(SE8c)}; p = {f(p8c)}.",
             "Votes consistently with the reason in (b): against if the deal destroys value for A.",
             "Reads the reaction: the probability fell and prices moved towards 35 and 58, which fits a vote against.",
             "For full marks (beyond the minimal answer): explains why some probability survives, because the vote is advisory and the board may proceed. Bonus: the bid may have revealed information about B, so B need not fall all the way back.",
         ]},
    ]}

SETT = {
    "del3-f4": [ex_f4_3, ex_f4_4],
    "del3-f5": [ex_f5_3, ex_f5_4],
    "del3-f6": [ex_f6_3, ex_f6_4],
}

# ======================================================================
#                              SVAR-DATA
# ======================================================================
def t(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


SVAR = {
    # f4 n3
    "del3-f4:3:a": {"type": "tall", "tall": [t("NPV now", NPV3_naa, "NOK m", abs=0.005)],
                    "merknad": "Nær null i forhold til investeringen på 16, derfor abs-toleranse (0,005)."},
    "del3-f4:3:b": {"type": "tall", "tall": [
        t("NPV<sub>0</sub>, r<sub>f</sub> = 2.5%", NPV3_u0, "NOK m", abs=0.005),
        t("NPV<sub>0</sub>, r<sub>f</sub> = 6%", NPV3_d0, "NOK m", abs=0.005)],
        "merknad": "Spørsmålet ber om dagens perspektiv. Verdiene ved t = 1 (1,2083 og −1,0965) godtas ikke."},
    "del3-f4:3:c": {"type": "blandet", "tall": [t("ρ (risk-neutral probability of the 2.5% rate)", rho3, "")],
                    "tallPoeng": 4, "tekstLedd": "Briefly explain why you do not need the true probabilities.",
                    "merknad": f"Eksakt pris 743,5332 gir {rho3_eksakt:.6f}, innenfor toleransen. Fellen (S0 = 16,1585 for år 1 til 8) gir {rho3_felle:.4f} og avvises; uten betalingen ved t = 1 blir ρ {rho3_utenbet:.4f}."},
    "del3-f4:3:d": {"type": "blandet", "tall": [
        t("Value today of waiting", W3, "NOK m", abs=0.005),
        t("Value of waiting minus building now", OPT3, "NOK m", abs=0.005)],
        "tallPoeng": 3, "tekstLedd": "Do you build now or wait? Briefly comment.",
        "merknad": f"Den feilparrede ρ gir {W3_felle:.4f} og avvises."},
    # f4 n4
    "del3-f4:4:a": {"type": "tall", "tall": [t("Government bond", Pg4, "NOK"), t("Brakstad bond", Pb4, "NOK")]},
    "del3-f4:4:b": {"type": "blandet", "tall": [t("Expected return", 100 * Er4, "%")], "tallPoeng": 2,
                    "tekstLedd": "Why does it differ from its yield to maturity?"},
    "del3-f4:4:c": {"type": "tall", "tall": [
        t("Risk-neutral default probability ρ", rho4, ""), t("Price of one CDS contract", CDS4, "NOK")],
        "merknad": f"Overlevelsessannsynligheten ({1 - rho4:.4f}) og CDS-prisen med den ({CDS4_felle:.4f}) er fellen og avvises."},
    "del3-f4:4:d": {"type": "tall", "tall": [
        t("CDS contracts", nCDS4 / 1e6, "m contracts", alt=[nCDS4]),
        t("Cost of the contracts", kost4, "NOK m", alt=[kost4 * 1e6]),
        t("Hedged position", pos4, "NOK m", alt=[pos4 * 1e6])],
        "merknad": "alt er de samme svarene i hele kontrakter og hele kroner, siden retteren ikke skalerer enheter."},
    "del3-f4:4:e": {"type": "tekst"},
    # f5 n3
    "del3-f5:3:a": {"type": "blandet", "tall": [t("NPV", NPV5, "NOK")], "tallPoeng": 1.5, "tekstLedd": "Will you open it?"},
    "del3-f5:3:b": {"type": "tall", "tall": [t("Maximum price for the study (C<sub>0</sub>)", C0_5, "NOK")]},
    "del3-f5:3:c": {"type": "blandet", "tall": [t("C<sub>1</sub>", C1_5, "NOK")], "tallPoeng": 2,
                    "tekstLedd": "Compare with (b) and comment."},
    "del3-f5:3:d": {"type": "blandet", "tall": [
        t("NPV with the exit programme", NPV5_exit, "NOK"), t("Value of the programme", verdi_exit5, "NOK")],
        "tallPoeng": 3, "tekstLedd": "Will you open it?",
        "merknad": f"Verdien av programmet er målt mot 0. {feil_exit5:.0f} (mot den negative NPV-en) er fellen og avvises."},
    "del3-f5:3:e": {"type": "blandet", "tall": [
        t("Indifference probability with the programme", pstar5, ""),
        t("Indifference probability without the programme", pstar5_uten, "")],
        "tallPoeng": 4, "tekstLedd": "Comment briefly."},
    # f5 n4
    "del3-f5:4:a": {"type": "tall", "tall": [t("Probability of completion", p6, "")],
                    "merknad": f"Fellen (240 i stedet for 249,60) gir {p6_felle:.4f} og avvises."},
    "del3-f5:4:b": {"type": "tekst"},
    "del3-f5:4:c": {"type": "tekst"},
    # f6 n3
    "del3-f6:3:a": {"type": "tall", "tall": [t("NPV of ordering now", NPV7_naa, "NOK m")],
                    "merknad": f"Med 65 % og r_f blir verdien {V7_sann:.4f} og NPV {V7_sann - I7:.4f}; det avvises."},
    "del3-f6:3:b": {"type": "tall", "tall": [
        t("NPV at t = 1, strong", NPV7_u1, "NOK m"), t("NPV at t = 1, weak", NPV7_d1, "NOK m"),
        t("NPV at t = 0, strong", NPV7_u0, "NOK m"), t("NPV at t = 0, weak", NPV7_d0, "NOK m")]},
    "del3-f6:3:c": {"type": "blandet", "tall": [t("ρ (risk-neutral probability of a strong market)", rho7, "")],
                    "tallPoeng": 5, "tekstLedd": "Compare it with the analysts' 65% and explain the difference briefly.",
                    "merknad": f"Uten utbyttet ved t = 1 blir ρ {rho7_felle:.4f}; det avvises."},
    "del3-f6:3:d": {"type": "blandet", "tall": [t("Value today of waiting", W7, "NOK m")], "tallPoeng": 2,
                    "tekstLedd": "Do you order now or wait? Briefly comment."},
    # f6 n4
    "del3-f6:4:a": {"type": "tall", "tall": [t("Probability of completion", p8, "", tol=0.005)],
                    "merknad": f"Stram toleranse (0,5 %) så helårsfaktoren 1,05 ({p8_helaar:.4f}) avvises. Enkel rente ({p8_enkel:.4f}) havner innenfor og godtas som tilnærming."},
    "del3-f6:4:b": {"type": "tekst"},
    "del3-f6:4:c": {"type": "blandet", "tall": [t("Probability of completion after the vote", p8c, "")],
                    "tallPoeng": 3, "tekstLedd": "How would you have voted? Is the market reaction consistent with that? Briefly explain.",
                    "merknad": f"Med 6 måneder i stedet for 3 blir p {p8c_halv:.4f}, med helt år {p8c_helaar:.4f}; begge avvises."},
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
        if ex["points"] != 20 or sum(p["points"] for p in ex["parts"]) != 20:
            feil.append(f"{hvor}: poengene summerer ikke til 20")
        if ex["parts"][0]["points"] > 4 and ex["title"] != "M&A":
            feil.append(f"{hvor}: del a er tung")
        for p in ex["parts"]:
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
            kilde = " ".join([p["solution"], " ".join(p["criteria"])])
            nums = tall_i(kilde)
            for tt in d.get("tall", []):
                kand = [tt["verdi"]] + tt.get("alt", [])
                ok = any(innenfor(n, v, tt) or (tt["enhet"] == "%" and innenfor(n * 100, v, tt))
                         for v in kand for n in nums)
                if not ok and not tt.get("regnet"):
                    feil.append(f"{k}: {tt['navn']} = {tt['verdi']} står ikke i løsningen")
                if abs(tt["verdi"]) < 1e-6 and "abs" not in tt:
                    feil.append(f"{k}: verdien er 0 uten abs")

# lekkasje: svarene skal ikke stå i oppgaveteksten til samme oppgave
for sid, liste in SETT.items():
    for ex in liste:
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
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"pronomen om Kurbatov: {r[:60]}")
    if re.search(r"(?<![\w(])-\d", ren(s)) and "−" not in s and "1.04<sup>−" not in s:
        pass
    if s.count("<p>") != s.count("</p>") or s.count("<b>") != s.count("</b>") or s.count("<tr>") != s.count("</tr>"):
        feil.append(f"ubalanserte tagger: {s[:60]}")
    if re.search(r"\d,\d{1,2}(?!\d)", ren(s)) and not re.search(r"[A-ZÆØÅa-zæøå]", s[:1]) is None:
        pass
    if re.search(r"\b(nan|inf)\b", s):
        feil.append(f"nan/inf: {s[:60]}")
# bindestrek brukt som minus foran tall i engelsk tekst
for sid, liste in SETT.items():
    for s in alle(liste):
        for m in re.finditer(r"(?:^|[\s(=])-\d", ren(s)):
            feil.append(f"{sid}: bindestrek som minus: …{ren(s)[max(0, m.start() - 30):m.end() + 10]}…")

# lengde: rundt 11 ord oppgavetekst per poeng
print("\nOrd i oppgaveteksten:")
for sid, liste in SETT.items():
    for ex in liste:
        ord_ = len(ren(ex["body"] + " ".join(p["body"] for p in ex["parts"])).split())
        print(f"   {sid} n{ex['n']}: {ord_} ord ({ord_ / ex['points']:.1f} per poeng)")
        if not 150 <= ord_ <= 320:
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
