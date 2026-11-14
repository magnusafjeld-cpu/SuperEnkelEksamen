"""Prøveeksamen 5 i FIE402 («kjernen, trekning 2»): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove5_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (tabellen «prove5»):
  E1 utbetaling: fire måter å bruke FCF (3/3/3/3)
  E2 governance: styret (4/4/4)
  E3 MM uten skatt: EPS-feilslutningen og utbytte finansiert med nye aksjer (3/4/4/4/3)
  E4 verdsetting med konstant rentedekning, FTE før WACC (3/3/2/4/3/3)
  E5 realopsjon: vente og trinnvis finansiering (3/5/4/8)
  E6 M&A: aksjebytte, kontanter, feilprising og coinsurance (4/3/6/4/3)
Rytmen avviker fra planen etter blindkontrollen (14.11.2026): poengene følger
arbeidet, og konstruksjonsdelen på 8 poeng er trinnvis finansiering (5d).

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og
sjekker konsistenskontrollene med assert: kursen uendret i en rekapitalisering
og ved et utbytte finansiert med emisjon (MM), EPS/r_E = kurs, WACC = APV,
FTE gir E = V^L − D, vektede betaer = beta_U, nedbrytningen av venteverdien,
verdien av trinnvis finansiering = (1 − q1)·PV(I2), NPV-ene summerer til
synergien, kursendringsidentiteten i M&A og forskjellen mellom aksjer og
kontanter ved feilprising.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and»,
ingen markup i criteria) og poengene (12/12/18/18/20/20, deloppgavene summerer).
Er alt rent, skrives prove5.json og prove5_oppgave.md (bare oppgaveteksten,
slik studenten ser den) i samme mappe. Er noe galt, skrives ingenting.

Konvensjoner (docs/fie402-forelesninger-2026.md, forfatterspek § 4):
beta_U vektet uten skatt; konstant rentedekning gir PV(TS) = tau·k·V^U
(lecture_8 s. 17, PS2 E5); FTE: FCFE = FCF − (1 − tau)·renter + netto opplåning
(lecture_14 s. 18); reelle sannsynligheter diskontert med r_f bare når risikoen
ikke er systematisk (lecture_11 s. 5, PS3 E8); diskret diskontering.
"""
import html
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove5.json")
UT_MD = os.path.join(HER, "prove5_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def pc(x, d=4):
    """Rente som prosent, f.eks. 0.086285 -> 8.6285%."""
    return f(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vist_sum(deler, total, d, d_tot=None):
    """Avrundede mellomtall som vises med d desimaler, må summere til summen slik
    den vises med d_tot desimaler (forfatterspek § 9.5). Feiler hvis ikke."""
    d_tot = d if d_tot is None else d_tot
    s = sum(round(p, d) for p in deler)
    assert f"{s:.{d_tot}f}" == f"{total:.{d_tot}f}", (deler, total, s)


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:28} {v}")


def tab(hode, rader):
    """HTML-tabell i appens stil. Tallkolonner markeres med en ledende '#'."""
    h = "".join(f"<th>{c}</th>" for c in hode)
    r = ""
    for rad in rader:
        r += "<tr>" + "".join(
            f'<td class="n">{c[1:]}</td>' if isinstance(c, str) and c.startswith("#") else f"<td>{c}</td>"
            for c in rad) + "</tr>"
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


# ================================================ Oppgave 3: MM, EPS og emisjon
rf3, rm3, b3 = 0.04, 0.09, 1.4
EBIT3, N3 = 66.0, 20.0                       # NOK millioner, millioner aksjer
mrp3 = rm3 - rf3
rE3 = rf3 + b3 * mrp3
V3 = EBIT3 / rE3
P3 = V3 / N3
EPS3 = EBIT3 / N3
PE3 = P3 / EPS3
assert near(rE3, 0.11) and near(V3, 600.0) and near(P3, 30.0) and near(EPS3, 3.30)
assert near(PE3, 1 / rE3)                    # null vekst, alt utbetalt: P/E = 1/r_E

# (b) rekapitalisering med risikofri gjeld
D3 = 180.0
n_rep3 = D3 / P3                             # kursen uendret (MM I)
N3b = N3 - n_rep3
E3b = V3 - D3
assert near(E3b / N3b, P3)                   # identitet: P = E/N etter tilbakekjøpet
DE3 = D3 / E3b
bE3 = b3 * (1 + DE3)                         # beta_D = 0
rE3b = rf3 + bE3 * mrp3
assert near(rE3b, rE3 + DE3 * (rE3 - rf3))   # MM II gir det samme
assert near(bE3, 2.0) and near(rE3b, 0.14) and near(n_rep3, 6.0)
assert near((E3b / V3) * bE3 + (D3 / V3) * 0.0, b3)   # kontroll 2 (identitet her)
feil_dv3 = b3 * (1 + D3 / V3)                 # feilen: D/V i stedet for D/E
assert near(D3 / V3, 0.3)

# (c) EPS og P/E etter
int3 = rf3 * D3
EPS3b = (EBIT3 - int3) / N3b
PE3b = P3 / EPS3b
assert near(EPS3b, 4.20)
assert near(EPS3b / rE3b, P3)                # ekte kontroll: feiler ved 20 aksjer eller ikke-relevert r_E
assert not near((EBIT3 - int3) / N3 / rE3b, P3)   # med 20 mill. aksjer feiler den
eps_vekst3 = EPS3b / EPS3 - 1
EBIT_be3 = rf3 * V3                          # break-even EBIT = r_D·V
assert near(EBIT_be3 / N3, (EBIT_be3 - int3) / N3b)
assert near(EBIT_be3, 24.0)

# (d) ekstra utbytte finansiert med nye aksjer ved slutten av år 1
DPS3_ny = 5.10
ekstra3 = (DPS3_ny - EPS3) * N3              # 36
V3_1 = EBIT3 / rE3                           # verdien etter utbytte og emisjon
P3_1 = (V3_1 - ekstra3) / N3                 # n·P1 = ekstra, (N + n)·P1 = V1
n_ny3 = ekstra3 / P3_1
andel_ny3 = ekstra3 / V3_1
assert near(ekstra3, 36.0) and near(P3_1, 28.20)
assert near((N3 + n_ny3) * P3_1, V3_1)
assert near(n_ny3 / (N3 + n_ny3), andel_ny3)

# (e) de opprinnelige eierne står likt
P3_0 = (DPS3_ny + P3_1) / (1 + rE3)
assert near(P3_0, P3)                        # ekte kontroll: kursen i dag er uendret
EPS3_2 = EBIT3 / (N3 + n_ny3)
tap3 = EPS3 - EPS3_2
assert near(tap3 / rE3, DPS3_ny - EPS3)      # ekstrautbyttet = nåverdien av det lavere utbyttet
assert near(EPS3_2, EPS3 * (1 - andel_ny3))
PE3_ny = P3_1 / EPS3_2
assert near(PE3_ny, PE3)                     # risikoen er uendret, P/E også
P3_0_alt = DPS3_ny / (1 + rE3) + (EPS3_2 / rE3) / (1 + rE3)
assert near(P3_0_alt, P3)
a3e, b3e = DPS3_ny / (1 + rE3), (EPS3_2 / rE3) / (1 + rE3)
vist_sum([a3e, b3e], P3_0_alt, 4)

vis("Oppgave 3", rE=rE3, V=V3, P=P3, EPS=EPS3, PE=PE3, n_rep=n_rep3, N1=N3b, DE=DE3,
    bE=bE3, rE1=rE3b, EPS1=EPS3b, PE1=PE3b, vekst=eps_vekst3, EBIT_be=EBIT_be3,
    ekstra=ekstra3, P1=P3_1, n_ny=n_ny3, andel=andel_ny3, P0=P3_0, EPS2=EPS3_2,
    tap=tap3, PE_ny=PE3_ny, deler=(a3e, b3e))

# ===================================== Oppgave 4: konstant rentedekning og FTE
EBIT4, tau4, dNWC4, g4 = 50.0, 0.22, 3.0, 0.03
rf4, rm4, bU4, rD4, k4 = 0.03, 0.09, 1.0, 0.045, 0.30
mrp4 = rm4 - rf4
NOPAT4 = EBIT4 * (1 - tau4)
FCF4 = NOPAT4 - dNWC4
rU4 = rf4 + bU4 * mrp4
VU4 = FCF4 / (rU4 - g4)
assert near(FCF4, 36.0) and near(rU4, 0.09) and near(VU4, 600.0)
feil_nwc4 = NOPAT4 / (rU4 - g4)              # glemt ΔNWC
# (b) PV(TS) og V^L
Int4 = k4 * FCF4
TS4 = tau4 * Int4
PVTS4 = TS4 / (rU4 - g4)
assert near(PVTS4, tau4 * k4 * VU4)
VL4 = VU4 + PVTS4
assert near(VL4, (1 + tau4 * k4) * VU4)
assert near(VL4, 639.6)
# Miles-Ezzell (godtas også): renten for år t er kjent ved t − 1, så siste år diskonteres med r_D
PVTS4_ME = PVTS4 * (1 + rU4) / (1 + rD4)
assert near(PVTS4_ME, TS4 / (1 + rD4) * (1 + rU4) / (rU4 - g4))
assert f"{PVTS4_ME:.2f}" == "41.31"
# (c) gjeld, D/V og E
D4 = Int4 / rD4
d4 = D4 / VL4
E4 = VL4 - D4
assert near(D4, 240.0) and near(E4, 399.6)
# D/V er konstant: D_t = k·FCF_{t+1}/r_D og V_t vokser begge med g
assert near(d4, k4 * (rU4 - g4) / (rD4 * (1 + tau4 * k4)))
# (d) WACC
rE4 = rU4 + (D4 / E4) * (rU4 - rD4)          # MM II (formelarket)
rw4 = rU4 - d4 * tau4 * rD4
rw4_ark = (E4 / VL4) * rE4 + d4 * rD4 * (1 - tau4)
assert near(rw4, rw4_ark)
VL4_w = FCF4 / (rw4 - g4)
assert near(VL4_w, VL4)                      # konsistenskontroll 1 (fastpunkt)
assert near(rw4 - g4, (rU4 - g4) / (1 + tau4 * k4))
feil_rw4 = FCF4 / (round(rw4, 4) - g4)       # avrundet til 0.0863
assert abs(feil_rw4 - VL4) > 0.05            # derfor fire desimaler i prosent
vist_sum([(E4 / VL4) * rE4, d4 * rD4 * (1 - tau4)], rw4, 6)
# (e) FTE
dD4 = g4 * D4                                # netto opplåning år 1
FCFE4 = FCF4 - (1 - tau4) * Int4 + dD4
E4_fte = FCFE4 / (rE4 - g4)
assert near(E4_fte, E4)                      # FTE = V^L − D (fastpunkt, men fanger glemt opplåning)
feil_fte4 = (FCF4 - (1 - tau4) * Int4) / (rE4 - g4)
assert abs(feil_fte4 - E4) > 1               # uten netto opplåning feiler kontrollen
vist_sum([FCF4, -(1 - tau4) * Int4, dD4], FCFE4, 3)
bD4 = (rD4 - rf4) / mrp4
bE4 = (rE4 - rf4) / mrp4
assert near((E4 / VL4) * bE4 + d4 * bD4, bU4)   # kontroll 2 (identitet når r_E kom fra MM II)
vist_sum([(E4 / VL4) * bE4, d4 * bD4], bU4, 6)
gap4 = rU4 - rw4
assert near(gap4, d4 * tau4 * rD4)
vis("Oppgave 4", FCF=FCF4, rU=rU4, VU=VU4, feil_nwc=feil_nwc4, Int=Int4, TS=TS4, PVTS=PVTS4,
    VL=VL4, D=D4, d=d4, E=E4, rE=rE4, rwacc=rw4, VL_w=VL4_w, feil_rw=feil_rw4, dD=dD4,
    FCFE=FCFE4, E_fte=E4_fte, feil_fte=feil_fte4, bD=bD4, bE=bE4, gap=gap4)

# ================================== Oppgave 5: vente og trinnvis finansiering
I5, r5 = 48.0, 0.08                           # NOK millioner
q5 = 0.1                                      # millioner kg per år
p0_5, pu5, pd5, c5 = 60.0, 90.0, 30.0, 20.0   # NOK per kg
cf0 = q5 * (p0_5 - c5)
cfu, cfd = q5 * (pu5 - c5), q5 * (pd5 - c5)
assert near(0.5 * (pu5 + pd5), p0_5)
cfE = 0.5 * (cfu + cfd)
assert near(cfE, cf0) and near(cf0, 4.0) and near(cfu, 7.0) and near(cfd, 1.0)
fakt5 = (1 + r5) / r5                         # evigrente med første beløp i dag
perp5 = 1 / r5
NPV5 = -I5 + cf0 * fakt5
assert near(NPV5, -I5 + cf0 + cfE * perp5)
assert near(NPV5, 6.0) and NPV5 > 0
feil_t0_5 = -I5 + cf0 / r5                    # glemt kontantstrømmen i dag
assert near(feil_t0_5, 2.0)
# (b) vente ett år
Nu5 = -I5 + cfu * fakt5                       # verdi ved t = 1
Nd5 = -I5 + cfd * fakt5
assert Nu5 > 0 and Nd5 < 0
W5 = 0.5 * max(Nu5, 0) / (1 + r5) + 0.5 * max(Nd5, 0) / (1 + r5)
opsj5 = W5 - max(NPV5, 0)
assert W5 > NPV5                              # vent
# uavhengig vei: hva du gir opp og hva du vinner, tilstand for tilstand
naa_u = -I5 + cf0 + cfu * perp5               # bygg i dag, god tilstand
naa_d = -I5 + cf0 + cfd * perp5
assert near(0.5 * naa_u + 0.5 * naa_d, NPV5)
kost_u = naa_u - Nu5 / (1 + r5)               # kostnaden ved å vente i god tilstand
assert near(kost_u, cf0 - (I5 - I5 / (1 + r5)))
gevinst_d = 0 - naa_d
assert near(opsj5, 0.5 * gevinst_d - 0.5 * kost_u)   # ekte kontroll
vist_sum([0.5 * gevinst_d, -0.5 * kost_u], opsj5, 4)
spar5 = I5 - I5 / (1 + r5)
vist_sum([cf0, -spar5], kost_u, 4)
assert near(Nu5 / (1 + r5), round(Nu5 / (1 + r5), 4), 1e-4)
# (c) større spredning, samme forventning (bonus i løsningen)
pu5c, pd5c = 105.0, 15.0
assert near(0.5 * (pu5c + pd5c), p0_5)
cfu_c, cfd_c = q5 * (pu5c - c5), q5 * (pd5c - c5)
assert cfd_c < 0                              # dårlig tilstand gir tap: må produsere for alltid
NPV5c = -I5 + cf0 + 0.5 * (cfu_c + cfd_c) * perp5
assert near(NPV5c, NPV5)                      # bygg i dag: uendret
Nu5c = -I5 + cfu_c * fakt5
Nd5c = -I5 + cfd_c * fakt5
assert Nu5c > Nu5 and Nd5c < 0
W5c = 0.5 * Nu5c / (1 + r5)
opsj5c = W5c - NPV5
assert W5c > W5 and opsj5c > opsj5
# (d) trinnvis finansiering
c1_5, q1_5, I2_5, q2_5, V2_5 = 5.0, 0.4, 30.0, 0.5, 120.0
qtot5 = q1_5 * q2_5
assert near(qtot5, 0.2)
v1_ok = -I2_5 + q2_5 * V2_5 / (1 + r5)        # verdi ved t = 1 hvis trinn 1 lykkes
assert v1_ok > 0                              # du fortsetter
alle5 = -c1_5 + (-I2_5 + qtot5 * V2_5 / (1 + r5)) / (1 + r5)
alle5_alt = -c1_5 - I2_5 / (1 + r5) + qtot5 * V2_5 / (1 + r5) ** 2
assert near(alle5, alle5_alt) and alle5 < 0
trinn5 = -c1_5 + q1_5 * v1_ok / (1 + r5)
assert trinn5 > 0
verdi_trinn5 = trinn5 - alle5
alle5_u = -c1_5 - I2_5 + qtot5 * V2_5            # uten diskontering, som på lysbildet
trinn5_u = -c1_5 + q1_5 * (-I2_5 + q2_5 * V2_5)
assert near(alle5_u, -11.0) and near(trinn5_u, 7.0)
assert near(verdi_trinn5, (1 - q1_5) * I2_5 / (1 + r5))   # ekte kontroll: du sparer I2 når trinn 1 feiler
inner5 = -I2_5 + qtot5 * V2_5 / (1 + r5)
vist_sum([-I2_5, qtot5 * V2_5 / (1 + r5)], inner5, 4)
vist_sum([-c1_5, inner5 / (1 + r5)], alle5, 4)
assert f"{-5 - round(-inner5 / (1 + r5), 4):.4f}" == f"{alle5:.4f}"
vist_sum([-I2_5, q2_5 * V2_5 / (1 + r5)], v1_ok, 4)
vist_sum([-c1_5, q1_5 * v1_ok / (1 + r5)], trinn5, 4)
vis("Oppgave 5", cf=(cf0, cfu, cfd), NPV=NPV5, Nu=Nu5, Nd=Nd5, W=W5, opsj=opsj5,
    naa=(naa_u, naa_d), kost_u=kost_u, gevinst_d=gevinst_d, spar=spar5,
    c=(Nu5c, Nd5c, W5c, opsj5c), v1_ok=v1_ok, alle=alle5, trinn=trinn5, verdi_trinn=verdi_trinn5)

# =============================================================== Oppgave 6: M&A
NA6, PA6, NT6, PT6, S6, ER6 = 50.0, 80.0, 20.0, 45.0, 300.0, 0.70
A6, T6 = NA6 * PA6, NT6 * PT6
x6 = ER6 * NT6
Ntot6 = NA6 + x6
V6 = A6 + T6 + S6
Pn6 = V6 / Ntot6
y6 = x6 / Ntot6
NPVA6 = (1 - y6) * V6 - A6
NPVT6 = y6 * V6 - T6
assert near(NPVA6 + NPVT6, S6)                # identitet
assert near(NPVA6, NA6 * (Pn6 - PA6))         # ekte kontroll: bruker ikke y
assert near(NPVT6, NT6 * (ER6 * Pn6 - PT6))
assert near(A6, 4000) and near(T6, 900) and near(Pn6, 81.25) and near(y6, 0.21875)
# (b) maks bytteforhold, premie, fordeling
ERmax6 = (T6 + S6) / A6 * NA6 / NT6
assert near(ERmax6, (PT6 / PA6) * (1 + S6 / T6))
xmax6 = NA6 * (T6 + S6) / A6
assert near(xmax6 / NT6, ERmax6) and near(ERmax6, 0.75)
assert near(V6 / (NA6 + xmax6), PA6)          # ved ERmax er A-kursen uendret
pr_off6 = ER6 * PA6 / PT6 - 1
pr_act6 = ER6 * Pn6 / PT6 - 1
assert near(T6 * pr_act6, NPVT6)              # uavhengig vei til NPV_T
andA6, andT6 = NPVA6 / S6, NPVT6 / S6
# (c) kontantbud og synergirisiko
P6c = ER6 * PA6 * NT6                         # 56 per aksje
pr6c = P6c - T6
NPVA6c = S6 - pr6c
NPVT6c = pr6c
assert near(P6c, 1120) and near(NPVA6c + NPVT6c, S6)
S6lav = 100.0
NPVA6c_lav, NPVT6c_lav = S6lav - pr6c, pr6c
V6lav = A6 + T6 + S6lav
NPVA6s_lav, NPVT6s_lav = (1 - y6) * V6lav - A6, y6 * V6lav - T6
assert near(NPVA6s_lav + NPVT6s_lav, S6lav)
assert near(NPVT6 - NPVT6s_lav, y6 * (S6 - S6lav))   # B bærer y av synergisvikten
assert near(NPVA6c - NPVA6c_lav, S6 - S6lav)          # med kontanter bærer A alt
Pn6lav = V6lav / Ntot6
assert near(NPVA6s_lav, NA6 * (Pn6lav - PA6))
# (d) A mener egen aksje er overpriset
PA6_sann = 72.0
A6_sann = NA6 * PA6_sann
V6_sann = A6_sann + T6 + S6
NPVA6s_sann = (1 - y6) * V6_sann - A6_sann
NPVT6s_sann = y6 * V6_sann - T6
NPVA6c_sann = S6 - pr6c                       # kontantkostnaden avhenger ikke av A
assert near(NPVA6s_sann + NPVT6s_sann, S6)
fordel6 = NPVA6s_sann - NPVA6c_sann
assert fordel6 > 0                            # aksjer er bedre for A når A er overpriset
overf6 = y6 * (A6 - A6_sann)
assert near(NPVA6s_sann, NPVA6 + overf6)      # ekte kontroll
assert near(fordel6, overf6 - (NPVT6 - NPVT6c))
vis("Oppgave 6", A=A6, T=T6, x=x6, Ntot=Ntot6, V=V6, Pn=Pn6, y=y6, NPVA=NPVA6, NPVT=NPVT6,
    ERmax=ERmax6, xmax=xmax6, pr_off=pr_off6, pr_act=pr_act6, andeler=(andA6, andT6),
    kontant=(P6c, pr6c, NPVA6c, NPVT6c), lav_kontant=(NPVA6c_lav, NPVT6c_lav),
    lav_aksje=(NPVA6s_lav, NPVT6s_lav, Pn6lav), sann=(A6_sann, V6_sann, NPVA6s_sann, NPVT6s_sann),
    fordel=fordel6, overf=overf6)


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "Payout policy", "points": 12, "topic": "Payout policy", "chapters": [15, 16],
    "body": (
        "<p>Skarvøy Telecom ASA, a mature listed telecom operator with few investment needs, expects "
        "about NOK 1.2 billion of free cash flow a year. The board considers four ways to use "
        "this year's cash: (1) raise the regular dividend, (2) buy back shares, (3) keep the cash, "
        "(4) invest in data centres, a new business area proposed by the CEO. Most shareholders pay "
        "more tax on dividends than on capital gains, managers know more than investors and may "
        "pursue their own interests.</p>"
        "<p>Give one advantage and one risk of each alternative. (1-2 sentences per alternative. Each "
        "alternative is worth 3 points: 1.5 for the advantage and 1.5 for the risk. An argument "
        "already used for another alternative earns no points the second time.)</p>"
    ),
    "solution": (
        "<p>One advantage and one risk per alternative, with every argument used once.</p>"
        "<p><b>(1) Raise the dividend.</b> <i>Advantage:</i> firms are known to avoid cutting "
        "dividends, so a higher regular dividend credibly signals that management expects the higher "
        "cash flow to last. <i>Risk:</i> most of these shareholders pay more tax on dividends than on "
        "capital gains, so a dividend costs them tax that a buyback would partly avoid.</p>"
        "<p><b>(2) Buy back shares.</b> <i>Advantage:</i> a buyback is flexible: it commits the firm "
        "to nothing next year and can be scaled down without the price drop a dividend cut "
        "triggers. <i>Risk:</i> it moves wealth between the shareholders who sell and those who stay, "
        "so if management buys above the true value the remaining shareholders lose.</p>"
        "<p><b>(3) Keep the cash.</b> <i>Advantage:</i> financial slack lets the firm fund future "
        "projects without issue costs or the discount investors demand when they know less than "
        "managers (pecking order) and gives a buffer against distress. <i>Risk:</i> interest earned "
        "on cash is taxed at the corporate level, so cash is negative debt with a tax cost.</p>"
        "<p><b>(4) Invest in data centres.</b> <i>Advantage:</i> if the project has a positive NPV, "
        "it creates value that a payout would forgo. <i>Risk:</i> the CEO of a mature firm with spare "
        "cash may grow the firm for his own sake (empire building, the free cash flow problem) and "
        "invest outside Skarvøy's expertise at a negative NPV.</p>"
        "<p><b>How arguments are counted.</b> The personal tax difference is one argument, whether it "
        "appears as the dividend's risk or as the buyback's advantage. The free cash flow problem is "
        "one argument in any form: cash taken out of management's hands (an advantage of (1) or (2)), "
        "overinvestment from cash on hand (a risk of (3)) or empire building (a risk of (4)). The "
        "dividend's lost flexibility and the buyback's flexibility are one argument. The dividend "
        "signal (lasting cash flow) and the buyback signal (undervalued shares) are two.</p>"
        "<p><b>Also accepted.</b> A buyback signals that management believes the shares are cheap; a "
        "CEO paid on EPS targets may time buybacks to hit them; clienteles (corporate investors "
        "prefer dividends); a cash pile invites a hostile bid. A well-argued point beyond these earns "
        "credit, as in the H2025 key.</p>"
    ),
    "criteria": [
        "Four alternatives, 1-2 sentences each, 3 points each: 1.5 for the advantage and 1.5 for the "
        "risk. Each needs its mechanism: 'signal' alone earns little, 'a higher dividend signals "
        "lasting cash flow because cuts are punished' earns the 1.5.",
        "(1) Dividend. Advantage: signal of lasting cash flow (dividends are sticky). Risk: the "
        "personal tax on dividends, or lost flexibility (a later cut is punished, as for GM).",
        "(2) Buyback. Advantage: flexibility, lower and deferred personal tax, or a signal that the "
        "shares are undervalued. Risk: wealth transfer between sellers and remaining holders if the "
        "price is wrong, or buybacks timed to hit EPS targets.",
        "(3) Cash. Advantage: financial slack (no issue costs, no adverse-selection discount, a "
        "buffer against distress). Risk: corporate tax on interest earned (cash is negative debt) or "
        "the free cash flow problem.",
        "(4) Invest. Advantage: a positive-NPV project creates value. Risk: empire building, a "
        "project outside the firm's expertise.",
        "Counting rule: 'dividends are taxed more' and 'buybacks are taxed less' are one argument; "
        "the free cash flow problem in any form (cash out of management's hands, overinvestment, "
        "empire building) is one argument; the dividend's lost flexibility and the buyback's "
        "flexibility are one argument. Each scores once. The two signals are two arguments.",
        "Saying only that the choice is irrelevant under MM earns nothing: the question assumes "
        "frictions.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "body": (
        "<p>Ashgrove Medical Devices Inc. is a US-listed company with dispersed ownership. Its 13 "
        "directors are:</p>"
        "<ul><li>the CEO, who also chairs the board;</li>"
        "<li>three other executives;</li>"
        "<li>two directors with business ties: the former CFO and a partner in a law firm paid USD 4 "
        "million a year by Ashgrove;</li>"
        "<li>seven independent directors, four of whom sit on four or more other boards.</li></ul>"
        "<p>The board is staggered (one third elected each year) and nominates its own candidates. "
        "The stock has lagged its peers by 40% over five years, yet the CEO keeps his job and pay.</p>"
        "<p>Select three weaknesses of this board. For each, explain why it weakens the monitoring of "
        "the CEO and name one remedy for the shareholders. (2-3 sentences each, 4 points: 2 for the "
        "why, 2 for the remedy. The executives and the two directors with business ties count as one "
        "weakness.)</p>"
    ),
    "solution": (
        "<p>Three weaknesses, each disabling the board's monitoring in a different way.</p>"
        "<p><b>1. Lack of independence.</b> Six of the 13 directors are not independent: the CEO, "
        "three executives who report to him, the former CFO and a law-firm partner whose USD 4 "
        "million in fees depend on good relations with management, so they rarely vote to replace "
        "the CEO or cut his pay. Shareholders can withhold their votes from the non-independent "
        "directors and file a proposal for a clear independent majority with independent "
        "compensation, audit and nominating committees.</p>"
        "<p><b>2. The CEO chairs the board.</b> The chairman sets the agenda, controls what the board "
        "sees and runs the meetings, so the CEO chairs the body that should evaluate and, if "
        "necessary, replace him. Shareholders can propose separating the roles, with an independent "
        "chairman or at least a lead independent director who meets the other independents without "
        "the CEO.</p>"
        "<p><b>3. Staggered board.</b> With one third of the seats up each year, an activist or a "
        "bidder needs two annual meetings to win a majority, which blunts the threat of a proxy "
        "fight or a takeover. Shareholders can propose to declassify the board so that all "
        "directors stand for election every year.</p>"
        "<p><b>Other weaknesses that score.</b> <i>Self-nomination:</i> the board picks its own "
        "successors, so the CEO's allies stay (a captive board); remedy: proxy access or a proxy "
        "contest. <i>Busy directors:</i> four independents on four or more other boards have little "
        "time to monitor; remedy: vote against overboarded directors (ISS recommends this) or cap "
        "outside seats. <i>A large board:</i> 13 members free-ride on each other; remedy: propose a "
        "smaller board.</p>"
        "<p><b>On proxy access.</b> Dodd-Frank allowed the SEC to let large shareholders nominate "
        "directors in the company's proxy, but the SEC's rule 14a-11 was struck down in 2011 "
        "(Business Roundtable v. SEC). Today proxy access comes through company bylaws, often adopted "
        "after a shareholder proposal. An answer that cites lecture 13 ('large shareholders can "
        "nominate board members') also earns the point.</p>"
        "<p><b>Other remedies that score.</b> Backing an activist, voting against the pay package "
        "(say on pay), supporting a takeover and, as a bonus for creativity in the H2025 key, selling "
        "the shares.</p>"
    ),
    "criteria": [
        "Three weaknesses, 2-3 sentences each, 4 points each: 2 for why it weakens monitoring (the "
        "mechanism) and 2 for a remedy the shareholders can actually use.",
        "Accepted weaknesses (lecture 13): lack of independence (six of 13 are non-independent: the "
        "CEO, three executives, two directors with business ties), the CEO as chairman, the staggered "
        "board, self-nomination (captive board), busy directors, a large board.",
        "Counting: the executives and the directors with business ties are one weakness. The "
        "staggered board and self-nomination are two weaknesses when each gets its own mechanism: "
        "the first protects incumbents from removal, the second lets the board choose its "
        "successors.",
        "Accepted remedies: withhold votes or vote against directors; shareholder proposals "
        "(independent majority and committees, separate chairman or lead independent director, "
        "declassification, a cap on outside seats, a smaller board); proxy access or a proxy "
        "contest; backing an activist or a takeover; say on pay. Bonus: exit by selling.",
        "Proxy access: the SEC's rule 14a-11 was struck down in 2011, so today it comes through "
        "bylaws, often after a shareholder proposal. Citing lecture 13 (Dodd-Frank lets large "
        "shareholders nominate board members) still earns the point.",
        "A remedy must be something shareholders do. 'The board should be more independent' without "
        "saying how they bring it about earns at most half of the remedy points.",
    ],
}

ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, EPS and payout", "chapters": [3, 6, 15],
    "body": (
        "<p>Ravnfjell Elektro ASA operates in a perfect capital market with no taxes. It is "
        "all-equity financed with 20 million shares, expects EBIT of NOK 66 million every year "
        "forever (no growth) and pays out all earnings as dividends at the end of each year. Its "
        "equity beta is 1.4, the risk-free rate is 4% and the expected market return is 9%.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>What are the share price and the forward P/E ratio (price divided by next year's "
                "expected EPS)?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. CAPM.</b> r<sub>E</sub> = 0.04 + 1.4 × (0.09 − 0.04) = 0.04 + 0.07 = "
                f"<b>{f(rE3, 2)}</b>, which is also r<sub>U</sub> since there is no debt.</p>"
                f"<p><b>Step 2. Price.</b> E = 66 / 0.11 = {f(V3, 0)}, so P = {f(V3, 0)} / 20 = "
                f"<b>NOK {f(P3, 2)}</b>.</p>"
                f"<p><b>Step 3. P/E.</b> EPS = 66 / 20 = {f(EPS3, 2)}, so P/E = {f(P3, 2)} / "
                f"{f(EPS3, 2)} = <b>{f(PE3)}</b>.</p>"
                f"<p><b>Note (an identity, not a check).</b> With no growth and full payout P/E = "
                f"1/r<sub>E</sub> = {f(1 / rE3)} by construction.</p>"
            ),
            "criteria": [
                "r_E = 0.04 + 1.4 × 0.05 = 11%. Using 9% as the market risk premium is the classic slip.",
                f"Share price 66/0.11/20 = {f(P3, 2)}.",
                f"EPS = {f(EPS3, 2)} and forward P/E = {f(P3, 2)}/{f(EPS3, 2)} = {f(PE3)}.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                "<p>Ravnfjell borrows NOK 180 million of permanent risk-free debt to buy back shares. "
                "What happens to the share price on the announcement? How many shares are bought "
                "back? What is the new cost of equity?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Price.</b> With no taxes the recapitalisation only re-slices the same "
                f"cash flow (MM I): the price <b>stays at NOK {f(P3, 2)}</b> on the announcement.</p>"
                f"<p><b>Step 2. Buyback.</b> 180 / {f(P3, 2)} = <b>{f(n_rep3, 0)} million shares</b>, "
                f"leaving {f(N3b, 0)} million.</p>"
                f"<p><b>Step 3. Cost of equity.</b> E = 600 − 180 = 420 and D/E = 180/420 = "
                f"{f(DE3, 6)}. With risk-free debt β<sub>E</sub> = 1.4 × (1 + {f(DE3, 6)}) = "
                f"{f(bE3, 2)}, so r<sub>E</sub> = 0.04 + {f(bE3, 1)} × 0.05 = <b>{pc(rE3b, 2)}</b>.</p>"
                f"<p>MM II gives the same: 0.11 + {f(DE3, 6)} × (0.11 − 0.04) = {f(rE3b, 2)}. That is an "
                "identity with the beta route, not an independent check.</p>"
            ),
            "criteria": [
                f"Price unchanged at {f(P3, 2)}, with the reason: no taxes, MM I.",
                f"Shares bought back 180/30 = {f(n_rep3, 0)} million at the unchanged price.",
                f"r_E = {pc(rE3b, 0)}, via β_E = {f(bE3, 1)} or directly from MM II.",
                f"Relevering with D/V = {f(D3 / V3, 1)} instead of D/E = {f(DE3)} (β_E = "
                f"{f(feil_dv3, 2)}) is the classic error.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>What is next year's expected EPS after the transaction? The CFO says the higher "
                "EPS shows that the shareholders gain. Do you agree? Explain briefly.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. EPS.</b> Interest is 0.04 × 180 = {f(int3, 1)}, so EPS = "
                f"(66 − {f(int3, 1)}) / {f(N3b, 0)} = {f(EBIT3 - int3, 1)} / {f(N3b, 0)} = "
                f"<b>NOK {f(EPS3b, 2)}</b> (up {pc(eps_vekst3, 2)}).</p>"
                f"<p><b>Step 2. No.</b> The price is unchanged at {f(P3, 2)}: the higher expected EPS "
                "only compensates the shareholders for the higher risk they now bear, which is why "
                f"r<sub>E</sub> rose to 14% and the P/E fell to {f(PE3b)}.</p>"
                f"<p><b>Check (can fail).</b> {f(EPS3b, 2)} / {f(rE3b, 2)} = {f(EPS3b / rE3b, 2)} = the "
                "unchanged price ✓. Dividing by 20 million shares or keeping r<sub>E</sub> at 11% "
                "breaks it.</p>"
                f"<p><b>Bonus.</b> Levered and unlevered EPS are equal at EBIT = r<sub>D</sub> × V = "
                f"{f(EBIT_be3, 0)}; below that, leverage lowers EPS.</p>"
            ),
            "criteria": [
                f"EPS = (66 − {f(int3, 1)})/{f(N3b, 0)} = {f(EPS3b, 2)}. Dividing by the old 20 million "
                "shares is the classic error.",
                "Does not agree: the price is unchanged, so no value is created; the higher EPS is "
                "compensation for higher risk (r_E from 11% to 14%). This is the EPS fallacy of "
                "lecture 2.",
                f"Credit for the check {f(EPS3b, 2)}/0.14 = 30, the lower P/E of {f(PE3b)} or the "
                f"break-even EBIT of {f(EBIT_be3, 0)}.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>For the rest of the exercise there is no recapitalisation. Instead, Ravnfjell pays "
                "NOK 5.10 per share at the end of Year 1 and raises the part not covered by earnings "
                "by issuing new shares right after the payment (the new shares do not receive it). "
                "Later, all earnings are again paid out. At what price are the new shares issued? "
                "How many are needed?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Cash to raise.</b> Earnings cover {f(EPS3, 2)} per share, so the issue "
                f"must raise (5.10 − 3.30) × 20 = <b>NOK {f(ekstra3, 0)} million</b>.</p>"
                "<p><b>Step 2. Value after the issue.</b> The new money goes straight out as dividend, "
                f"so the firm still owns the same assets: V<sub>1</sub> = 66 / 0.11 = {f(V3_1, 0)}.</p>"
                "<p><b>Step 3. Price and number.</b> All shares trade at the same ex-dividend price "
                "P<sub>1</sub>:</p>"
                f"<p>(20 + n) × P<sub>1</sub> = {f(V3_1, 0)} and n × P<sub>1</sub> = 36 &rArr; "
                f"20 × P<sub>1</sub> = {f(V3_1 - ekstra3, 0)} &rArr; <b>P<sub>1</sub> = NOK "
                f"{f(P3_1, 2)}</b><br>"
                f"n = 36 / {f(P3_1, 2)} = <b>{f(n_ny3, 6)} million shares</b>, so the new "
                f"shareholders own 36/{f(V3_1, 0)} = {pc(andel_ny3, 0)} of the firm.</p>"
                f"<p><b>Note (an identity).</b> {f(N3 + n_ny3, 6)} × {f(P3_1, 2)} = "
                f"{f((N3 + n_ny3) * P3_1, 0)} holds by construction; the real check comes in (e).</p>"
            ),
            "criteria": [
                f"Cash to raise (5.10 − 3.30) × 20 = {f(ekstra3, 0)} million.",
                f"Firm value after dividend and issue is still {f(V3_1, 0)}: the new money is paid "
                "straight out.",
                f"P1 = ({f(V3_1, 0)} − 36)/20 = {f(P3_1, 2)} and n = 36/{f(P3_1, 2)} = "
                f"{f(n_ny3, 4)} million.",
                "Issuing at 30 or giving the new shares the Year-1 dividend is the classic error: "
                "they are sold ex-dividend.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Are the original shareholders better or worse off? What is the share price "
                "today, after the announcement? Explain briefly.</p>"
            ),
            "solution": (
                f"<p>One share pays 5.10 at the end of Year 1 and is then worth {f(P3_1, 2)}:</p>"
                f"<p>P<sub>0</sub> = (5.10 + {f(P3_1, 2)}) / 1.11 = {f(DPS3_ny + P3_1, 2)} / 1.11 = "
                f"<b>NOK {f(P3_0, 2)}</b></p>"
                "<p><b>Neither better nor worse off.</b> They receive 1.80 more per share in Year 1 but "
                f"keep only {pc(1 - andel_ny3, 0)} of all later dividends; the new shareholders pay "
                "a fair price for the rest: the dividend change only moves cash in time (payout "
                "irrelevance under MM).</p>"
                f"<p><b>Check (can fail).</b> The price comes back to the {f(P3, 2)} of (a) only if "
                "P<sub>1</sub> in (d) is right: issuing at 30, for example, would give "
                f"(5.10 + 30)/1.11 = {f((DPS3_ny + P3) / (1 + rE3), 2)}.</p>"
            ),
            "criteria": [
                f"P0 = (5.10 + {f(P3_1, 2)})/1.11 = {f(P3_0, 2)}, unchanged from (a).",
                "Neither better nor worse off: more cash now and a smaller share of later dividends, "
                "bought by new shareholders at a fair price. Payout policy is irrelevant under MM.",
                "Credit for valuing the later dividends directly: 3.102 per share from Year 2 "
                f"(= 3.30 × 0.94), worth {f(EPS3_2 / rE3, 2)} at Year 1.",
            ],
        },
    ],
}

ex4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18,
    "topic": "Constant interest coverage, FTE and WACC", "chapters": [2, 17, 18, 19],
    "body": (
        "<p>Frostheim Logistics ASA expects EBIT of NOK 50 million in Year 1. Capital expenditure "
        "equals depreciation and net working capital rises by NOK 3 million in Year 1; all items then "
        "grow at 3% a year forever. The tax rate is 22%, the risk-free rate 3%, the expected market "
        "return 9% and the asset beta 1.0.</p>"
        "<p>Frostheim keeps a constant interest coverage ratio: each year's interest is 30% of that "
        "year's free cash flow, paid at r<sub>D</sub> = 4.5% on the debt outstanding at the start of "
        "the year. Use 4 decimal places (rates in percent: 8.1234%).</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>What is Frostheim's unlevered value V<sup>U</sup>?</p>"
            ),
            "solution": (
                f"<p>FCF<sub>1</sub> = 50 × (1 − 0.22) − 3 = {f(NOPAT4, 0)} − 3 = <b>NOK {f(FCF4, 0)} "
                "million</b> (capital expenditure and depreciation cancel; interest is not "
                "subtracted).<br>"
                f"r<sub>U</sub> = 0.03 + 1.0 × 0.06 = <b>{pc(rU4, 2)}</b><br>"
                f"V<sup>U</sup> = {f(FCF4, 0)} / (0.09 − 0.03) = <b>NOK {f(VU4, 0)} million</b></p>"
                f"<p>Leaving out the increase in working capital gives 39 and V<sup>U</sup> = "
                f"{f(feil_nwc4, 0)}.</p>"
            ),
            "criteria": [
                f"FCF1 = 50 × 0.78 − 3 = {f(FCF4, 0)}. Leaving out the increase in NWC (39) or "
                "subtracting interest loses the point.",
                f"r_U = 0.03 + 1.0 × 0.06 = {pc(rU4, 0)}.",
                f"V^U = {f(FCF4, 0)}/(0.09 − 0.03) = {f(VU4, 0)}, a growing perpetuity.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>What is Frostheim's levered value V<sup>L</sup>?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The shield.</b> Interest<sub>1</sub> = 0.30 × {f(FCF4, 0)} = "
                f"{f(Int4, 1)} and TS<sub>1</sub> = 0.22 × {f(Int4, 1)} = {f(TS4, 3)}. The shield is a "
                "fixed fraction of FCF, so it grows at 3% and has the risk of the FCF: discount at "
                "r<sub>U</sub>.</p>"
                f"<p>PV(TS) = {f(TS4, 3)} / (0.09 − 0.03) = <b>NOK {f(PVTS4, 1)} million</b>, which "
                f"is τkV<sup>U</sup> = 0.22 × 0.30 × {f(VU4, 0)} (the same formula, lecture 8 slide 17)."
                "</p>"
                f"<p>V<sup>L</sup> = {f(VU4, 0)} + {f(PVTS4, 1)} = <b>NOK {f(VL4, 1)} million</b> "
                f"= (1 + τk)V<sup>U</sup></p>"
                "<p><b>Also accepted.</b> The interest for a year is fixed at its start, so each "
                "shield is known one year ahead. Discounting the last year at r<sub>D</sub> and the "
                "rest at r<sub>U</sub> (Miles-Ezzell) gives "
                f"{f(PVTS4, 1)} × 1.09/1.045 = {f(PVTS4_ME, 2)} and V<sup>L</sup> = "
                f"{f(VU4 + PVTS4_ME, 2)}. The key follows lecture 8, which discounts the whole shield "
                "at r<sub>U</sub>; later parts are then marked on follow-through.</p>"
            ),
            "criteria": [
                f"PV(TS) = τ·k·V^U = 0.22 × 0.30 × {f(VU4, 0)} = {f(PVTS4, 1)}, or the shield "
                f"{f(TS4, 3)} as a growing perpetuity at r_U.",
                f"V^L = (1 + τk)V^U = {f(VL4, 1)}.",
                f"Also accepted with the argument that each shield is known a year ahead: "
                f"{f(PVTS4_ME, 2)} (Miles-Ezzell), with follow-through in later parts.",
                "Discounting the shield at r_D throughout, or using τD as for permanent debt, is "
                "the error.",
            ],
        },
        {
            "label": "c", "points": 2,
            "body": "<p>How much debt does Frostheim have today? What is its equity worth?</p>",
            "solution": (
                f"<p>The Year-1 interest of {f(Int4, 1)} is paid on today's debt: D<sub>0</sub> = "
                f"{f(Int4, 1)} / 0.045 = <b>NOK {f(D4, 0)} million</b>. "
                f"E = {f(VL4, 1)} − {f(D4, 0)} = <b>NOK {f(E4, 1)} million</b>. "
                f"(D/V<sup>L</sup> = {f(d4)}, constant over time because debt and value both grow "
                "with the FCF.)</p>"
            ),
            "criteria": [
                f"D0 = interest/r_D = {f(Int4, 1)}/0.045 = {f(D4, 0)}.",
                f"E = V^L − D = {f(E4, 1)}.",
                "Computing interest on next year's debt instead of today's is the error.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>What is Frostheim's cost of equity? Value its equity with the flow-to-equity "
                "(FTE) method.</p>"
            ),
            "solution": (
                "<p><b>Step 1. r<sub>E</sub> (MM II, formula sheet).</b> The shield is discounted at "
                "r<sub>U</sub>, so the no-tax form applies:</p>"
                f"<p>r<sub>E</sub> = 0.09 + ({f(D4, 0)}/{f(E4, 1)}) × (0.09 − 0.045) = 0.09 + "
                f"{f((D4 / E4) * (rU4 - rD4), 6)} = <b>{pc(rE4)}</b></p>"
                f"<p><b>Step 2. FCFE.</b> Debt grows with the FCF, so net borrowing in Year 1 is "
                f"0.03 × {f(D4, 0)} = {f(dD4, 1)}:</p>"
                f"<p>FCFE<sub>1</sub> = {f(FCF4, 0)} − 0.78 × {f(Int4, 1)} + {f(dD4, 1)} = "
                f"{f(FCF4, 0)} − {f((1 - tau4) * Int4, 3)} + {f(dD4, 1)} = <b>{f(FCFE4, 3)}</b></p>"
                f"<p><b>Step 3. FTE.</b> E = {f(FCFE4, 3)} / ({f(rE4, 6)} − 0.03) = "
                f"<b>NOK {f(E4_fte, 1)} million</b></p>"
                f"<p><b>Check.</b> {f(E4_fte, 1)} = E from (c) ✓. It is a fixed point of the same debt "
                "policy, but it fails if you leave out the net borrowing: "
                f"{f(FCF4 - (1 - tau4) * Int4, 3)}/{f(rE4 - g4, 6)} = {f(feil_fte4, 1)}.</p>"
            ),
            "criteria": [
                f"r_E = 0.09 + ({f(D4, 0)}/{f(E4, 1)})(0.09 − 0.045) = {pc(rE4)} from MM II.",
                f"FCFE1 = 36 − 0.78 × {f(Int4, 1)} + {f(dD4, 1)} = {f(FCFE4, 3)}: after-tax interest "
                "subtracted, net borrowing added.",
                f"E = {f(FCFE4, 3)}/({pc(rE4)} − 3%) = {f(E4_fte, 1)}, equal to (c).",
                f"Forgetting net borrowing gives {f(feil_fte4, 1)}; pre-tax interest or discounting "
                "at r_U are the other errors.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": "<p>Value the firm with the WACC method.</p>",
            "solution": (
                f"<p><b>Step 1. r<sub>wacc</sub> (formula sheet, r<sub>E</sub> from (d)).</b> "
                f"({f(E4, 1)}/{f(VL4, 1)}) × {f(rE4, 6)} + ({f(D4, 0)}/{f(VL4, 1)}) × 0.045 × 0.78 = "
                f"{f((E4 / VL4) * rE4, 6)} + {f(d4 * rD4 * (1 - tau4), 6)} = <b>{pc(rw4)}</b></p>"
                f"<p><b>Step 2. Value.</b> V<sup>L</sup> = {f(FCF4, 0)} / ({f(rw4, 6)} − 0.03) = "
                f"<b>NOK {f(VL4_w, 1)} million</b></p>"
                f"<p><b>Check (WACC = APV).</b> {f(VL4_w, 1)} = V<sup>L</sup> from (b) ✓. This is a "
                "fixed point, not an independent estimate, but it catches arithmetic slips and a "
                "wrong rate on the shield. Rounding r<sub>wacc</sub> to 8.63% gives "
                f"{f(feil_rw4, 2)}, more than the 0.05 the H2025 key calls too much.</p>"
                "<p><b>Also accepted.</b> r<sub>wacc</sub> = r<sub>U</sub> − d·τ·r<sub>D</sub> = "
                f"0.09 − {f(d4, 6)} × 0.22 × 0.045 = {f(rw4, 6)}. On this route the agreement with (b) "
                "holds by construction.</p>"
            ),
            "criteria": [
                f"r_wacc = {pc(rw4)} from the formula sheet with r_E from (d), or from r_U − dτr_D. "
                "On the second route the agreement with (b) is a fixed point, not a test.",
                f"V^L = 36/(r_wacc − 0.03) = {f(VL4_w, 1)}, the same as (b).",
                f"Carry 4 decimals in percent: 8.63% gives about {f(feil_rw4, 1)}.",
            ],
        },
        {
            "label": "f", "points": 3,
            "body": "<p>Explain briefly why r<sub>wacc</sub> is lower than r<sub>U</sub>. (1-2 sentences)</p>",
            "solution": (
                "<p><b>Model answer.</b> r<sub>U</sub> is the return required on the firm's assets "
                "whatever the financing, while r<sub>wacc</sub> also counts the interest tax shield: "
                "interest is deductible, so the after-tax cost of debt is r<sub>D</sub>(1 − τ). "
                f"Without taxes the two would be equal; here the gap is d·τ·r<sub>D</sub> = "
                f"{f(gap4 * 100, 4)} percentage points.</p>"
                "<p><b>Also accepted.</b> Debt is not cheaper in itself, because by MM II "
                "r<sub>E</sub> rises with leverage; the whole gap is the tax subsidy.</p>"
            ),
            "criteria": [
                "The gap is the interest tax shield: interest is deductible, so the after-tax cost of "
                "debt is r_D(1 − τ).",
                "Without taxes r_wacc = r_U (MM).",
                "'Debt is cheaper than equity' without the tax argument earns nothing: MM II offsets "
                "it through a higher r_E.",
            ],
        },
    ],
}

ex5 = {
    "n": 5, "title": "Real Options", "points": 20,
    "topic": "Real options: waiting and staged financing", "chapters": [1, 25],
    "body": (
        "<p>Vestvik Proteins AS can build a production unit for NOK 48 million. It produces 100,000 "
        "kg of protein a year forever at a cost of NOK 20 per kg and cannot be shut down. The first "
        "output is sold the moment the unit is built and then once a year. Today's price is NOK 60 "
        "per kg; at the end of Year 1 it moves to NOK 90 or NOK 30 with equal probability and stays "
        "there. The risk is not systematic: discount at r<sub>f</sub> = 8%. No taxes.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is the NPV of building the unit today?</p>",
            "solution": (
                f"<p>Cash flow today: 100,000 × (60 − 20) = NOK {f(cf0, 1)} million. The expected "
                f"price from Year 1 is still 60, so the expected cash flow stays {f(cf0, 1)} million. "
                "The first one arrives today, so the factor is 1.08/0.08 = 13.5:</p>"
                f"<p>NPV = −48 + {f(cf0, 1)} × 13.5 = −48 + {f(cf0 * fakt5, 1)} = "
                f"<b>NOK {f(NPV5, 1)} million</b></p>"
            ),
            "criteria": [
                f"Cash flow {f(cf0, 1)} million a year, the same in expectation from Year 1.",
                f"NPV = −48 + {f(cf0, 1)} × 1.08/0.08 = {f(NPV5, 1)}. Leaving out today's cash flow "
                f"gives {f(feil_t0_5, 1)}.",
                "Discounts at r_f, as allowed: the price risk is not systematic.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                "<p>Vestvik can instead wait a year, observe the price and then decide (same cost; "
                "output again starts at once). What is the value of the option to wait? Do you build "
                "today or wait?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Year-1 decision, state by state</b> (same factor 13.5, since output "
                "starts at once):</p>"
                + tab(["Price", "Cash flow", "NPV at Year 1 if built", "Decision"], [
                    ["NOK 90", f"#{f(cfu, 1)}", f"#−48 + {f(cfu, 1)} × 13.5 = {f(Nu5, 1)}", "build"],
                    ["NOK 30", f"#{f(cfd, 1)}", f"#−48 + {f(cfd, 1)} × 13.5 = {f(Nd5, 1)}", "do not build: 0"],
                ])
                + f"<p><b>Step 2. Today.</b> NPV<sub>wait</sub> = 0.5 × {f(Nu5, 1)} / 1.08 = "
                f"<b>{f(W5)}</b></p>"
                f"<p><b>Step 3. Option value.</b> {f(W5)} − {f(NPV5, 1)} = <b>NOK {f(opsj5)} "
                "million</b>, measured against building today. <b>Wait</b>: a positive NPV today is "
                "not enough when waiting is worth more.</p>"
                "<p><b>Check (a decomposition of the same numbers, not an independent test).</b> "
                f"Waiting avoids a loss of {f(gevinst_d, 1)} in the low state and costs "
                f"{f(cf0, 0)} − (48 − 48/1.08) = {f(kost_u)} in the high state (today's cash flow lost, "
                f"investment paid later): 0.5 × {f(gevinst_d, 1)} − 0.5 × {f(kost_u)} = {f(opsj5)} ✓.</p>"
            ),
            "criteria": [
                f"High price: −48 + {f(cfu, 1)} × 13.5 = {f(Nu5, 1)}, build. Low price: "
                f"{f(Nd5, 1)}, do not build, payoff 0.",
                f"NPV of waiting 0.5 × {f(Nu5, 1)}/1.08 = {f(W5)}.",
                f"Option to wait {f(W5)} − {f(NPV5, 1)} = {f(opsj5)}; decision: wait.",
                "Using 1/0.08 instead of 1.08/0.08 at Year 1 ignores that output starts at once.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Suppose the Year-1 price is instead NOK 105 or NOK 15. Without calculations: what "
                "happens to the NPV of building today and to the value of waiting? (2-3 sentences)</p>"
            ),
            "solution": (
                "<p><b>Model answer.</b> The NPV of building today is unchanged: a unit that "
                "produces in both states forever is worth the expected cash flow; the expected "
                "price is still 60. The value of waiting rises, because you build only in the high "
                "state: a better high state adds value while a worse low state costs nothing. Like "
                "any option, the option to wait gains from a wider spread of outcomes.</p>"
                f"<p><b>Numbers (bonus).</b> Waiting: 0.5 × (−48 + {f(cfu_c, 1)} × 13.5)/1.08 = "
                f"{f(W5c)}, so the option is worth {f(opsj5c)} against {f(opsj5)}.</p>"
                "<p><b>Also accepted.</b> With a price of 15 below the cost of 20, building today "
                "risks losses every year forever, which makes committing today less attractive "
                "relative to waiting.</p>"
            ),
            "criteria": [
                "NPV of building today unchanged: committed, you get the expected cash flow; the "
                "expected price is still 60.",
                "Value of waiting rises: the high state improves, the low state stays at zero "
                "because you do not build (one-sided payoff).",
                f"No calculation required; numbers are a bonus ({f(opsj5c)} against {f(opsj5)}).",
            ],
        },
        {
            "label": "d", "points": 8,
            "body": (
                "<p>For the rest of the exercise, consider a new project. A pilot costs NOK 5 million "
                "today and shows after one year whether the process works (probability 40%); if it "
                "does not, a full-scale unit is worthless. If it works, the full-scale unit costs NOK "
                "30 million at the end of Year 1 and succeeds with probability 50%: it is then worth "
                "NOK 120 million at the end of Year 2, otherwise nothing. Same 8% rate.</p>"
                "<p>Compare the NPV of committing to both stages today (the NOK 30 million is paid "
                "whatever the pilot shows) with staged financing (paid only if the process works). "
                "Explain the difference briefly.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. All at once.</b> Success needs both stages: 0.4 × 0.5 = {f(qtot5, 1)}. "
                f"At Year 1: −30 + {f(qtot5, 1)} × 120/1.08 = −30 + {f(qtot5 * V2_5 / (1 + r5))} = "
                f"{f(inner5)}, so</p>"
                f"<p>NPV<sub>all</sub> = −5 + ({f(inner5)})/1.08 = −5 − {f(-inner5 / (1 + r5))} = "
                f"<b>NOK {f(alle5)} million</b></p>"
                "<p><b>Step 2. Staged.</b> If the process works, going on is worth "
                f"−30 + 0.5 × 120/1.08 = −30 + {f(q2_5 * V2_5 / (1 + r5))} = {f(v1_ok)} &gt; 0 at "
                "Year 1, so you continue; otherwise you stop.</p>"
                f"<p>NPV<sub>staged</sub> = −5 + 0.4 × {f(v1_ok)}/1.08 = −5 + "
                f"{f(q1_5 * v1_ok / (1 + r5))} = <b>NOK {f(trinn5)} million</b></p>"
                "<p><b>Step 3. Why.</b> Total cost and overall success probability are the same, but "
                "staging is an option to stop after the pilot: with probability 0.6 you save the NOK "
                "30 million. The more the first stage reveals, the more staging is worth.</p>"
                "<p><b>Check (a decomposition, not an independent test).</b> "
                f"{f(trinn5, 6)} − ({f(alle5, 6)}) = {f(verdi_trinn5, 6)} = 0.6 × 30/1.08 ✓.</p>"
            ),
            "criteria": [
                f"All at once (3 points): NPV = −5 − 30/1.08 + 0.2 × 120/1.08² = {f(alle5)}.",
                f"Staged (3 points): continue if the process works, since −30 + 0.5 × 120/1.08 = "
                f"{f(v1_ok)} > 0; NPV = −5 + 0.4 × {f(v1_ok)}/1.08 = {f(trinn5)}.",
                "Explanation (2 points): the option to stop saves the second-stage cost with "
                f"probability 0.6, worth 0.6 × 30/1.08 = {f(verdi_trinn5)}.",
                f"Ignoring discounting (as the lecture example does) gives {f(alle5_u, 0)} and "
                f"{f(trinn5_u, 0)}: the reasoning scores, with a small deduction.",
            ],
        },
    ],
}

ex6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [13, 26],
    "body": (
        "<p>Fjordbit ASA (A) offers to acquire Lyngtopp Data ASA (B), paying 0.70 A shares for each "
        "B share. A has 50 million shares at NOK 80 and B has 20 million shares at NOK 45 (stand-alone "
        "values). A's management estimates the synergies at S = NOK 300 million.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 4,
            "body": (
                "<p>What is the NPV of the deal to A's and to B's shareholders?</p>"
            ),
            "solution": (
                f"<p>A = 50 × 80 = {f(A6, 0)}, T = 20 × 45 = {f(T6, 0)}, new shares x = 0.70 × 20 = "
                f"{f(x6, 0)} million, so {f(Ntot6, 0)} million shares share {f(A6, 0)} + {f(T6, 0)} + "
                f"300 = {f(V6, 0)}:</p>"
                f"<p>P<sub>new</sub> = {f(V6, 0)} / {f(Ntot6, 0)} = <b>NOK {f(Pn6, 2)}</b>; "
                f"y = {f(x6, 0)}/{f(Ntot6, 0)} = {f(y6, 5)}</p>"
                f"<p>NPV<sub>A</sub> = (1 − {f(y6, 5)}) × {f(V6, 0)} − {f(A6, 0)} = "
                f"<b>{f(NPVA6, 1)}</b><br>"
                f"NPV<sub>B</sub> = {f(y6, 5)} × {f(V6, 0)} − {f(T6, 0)} = <b>{f(NPVT6, 1)}</b></p>"
                "<p><b>Check (a second route through the same numbers).</b> A's NPV is its old shares' "
                f"price change: 50 × ({f(Pn6, 2)} − 80) = {f(NA6 * (Pn6 - PA6), 1)} ✓. That "
                f"{f(NPVA6, 1)} + {f(NPVT6, 1)} = 300 = S is an identity.</p>"
            ),
            "criteria": [
                f"P_new = {f(V6, 0)}/{f(Ntot6, 0)} = {f(Pn6, 2)} (a step, not required).",
                f"NPV_A = {f(NPVA6, 1)} and NPV_B = {f(NPVT6, 1)} with the formula-sheet expressions "
                f"(y = {f(y6, 5)}).",
                "Using post-announcement prices as stand-alone values double counts the synergies.",
                "Bonus: NPV_A = 50 × (P_new − 80), or NPV_A + NPV_B = S.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": "<p>What is the highest exchange ratio A's shareholders should accept?</p>",
            "solution": (
                f"<p>ER<sub>max</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = "
                f"[({f(T6, 0)} + 300)/{f(A6, 0)}] × (50/20) = {f((T6 + S6) / A6, 1)} × 2.5 = "
                f"<b>{f(ERmax6, 2)}</b> (formula sheet). The offer of 0.70 is below it, so A gains.</p>"
                f"<p><b>Note (an identity).</b> At 0.75, A issues {f(xmax6, 0)} million shares and "
                f"P<sub>new</sub> = {f(V6, 0)}/{f(NA6 + xmax6, 0)} = {f(V6 / (NA6 + xmax6), 2)} = "
                "P<sub>A</sub>: that is how ER<sub>max</sub> is defined.</p>"
            ),
            "criteria": [
                f"ER_max = [(T + S)/A](N_A/N_T) = {f(ERmax6, 2)} from the formula sheet, or "
                "(P_T/P_A)(1 + S/T).",
                "States that 0.70 lies below it, so A's shareholders gain.",
                f"Leaving S out (ER = 45/80 = {f(PT6 / PA6)}) gives the ratio at which B gets no premium, not "
                "A's maximum.",
            ],
        },
        {
            "label": "c", "points": 6,
            "body": (
                "<p>A could instead pay NOK 56 in cash per B share. What is A's NPV? If the synergies "
                "turn out to be only NOK 100 million, what is A's NPV with cash and with shares? Who "
                "bears the synergy risk under each method?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Cash, S = 300.</b> A pays 56 × 20 = {f(P6c, 0)} for a target worth "
                f"{f(T6, 0)}: NPV<sub>A</sub> = S − (P − T) = 300 − {f(pr6c, 0)} = <b>{f(NPVA6c, 0)}</b>"
                f" (B gets {f(NPVT6c, 0)}).</p>"
                "<p><b>Step 2. S = 100.</b></p>"
                + tab(["", "Cash", "Shares"], [
                    ["NPV to A", f"#100 − {f(pr6c, 0)} = {f(NPVA6c_lav, 0)}",
                     f"#{f(1 - y6, 5)} × {f(V6lav, 0)} − {f(A6, 0)} = {f(NPVA6s_lav, 2)}"],
                    ["NPV to B", f"#{f(NPVT6c_lav, 0)}",
                     f"#{f(y6, 5)} × {f(V6lav, 0)} − {f(T6, 0)} = {f(NPVT6s_lav, 2)}"],
                ])
                + "<p><b>Step 3. Who bears the risk.</b> With cash B's premium of "
                f"{f(pr6c, 0)} is fixed, so <b>A's shareholders bear the whole shortfall</b> of 200. "
                f"With shares <b>B's shareholders share it</b> in proportion to their {pc(y6, 3)} "
                f"stake: their NPV falls by {f(NPVT6 - NPVT6s_lav, 2)}.</p>"
                f"<p><b>Note (an identity).</b> {f(NPVT6 - NPVT6s_lav, 2)} = {f(y6, 5)} × 200 holds "
                "for any numbers; it shows the mechanism rather than testing the answer.</p>"
            ),
            "criteria": [
                f"Cash: NPV_A = S − (P − T) = 300 − {f(pr6c, 0)} = {f(NPVA6c, 0)}.",
                f"S = 100: cash gives NPV_A = {f(NPVA6c_lav, 0)}; shares give "
                f"{f(1 - y6, 5)} × {f(V6lav, 0)} − {f(A6, 0)} = {f(NPVA6s_lav, 2)}.",
                "With cash the acquirer bears all the synergy risk; with shares the target's "
                f"shareholders bear the fraction y = {f(y6, 5)} of it.",
                f"Bonus: B's side ({f(NPVT6c_lav, 0)} with cash, {f(NPVT6s_lav, 2)} with shares).",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Back to S = NOK 300 million. A's management believes A's shares are worth NOK 72, "
                "not 80. By that valuation, which offer is better for A's shareholders, shares or "
                "NOK 56 in cash? By how much? What does the market infer from the choice?</p>"
            ),
            "solution": (
                f"<p>True values: A = 50 × 72 = {f(A6_sann, 0)}, merged firm {f(A6_sann, 0)} + "
                f"{f(T6, 0)} + 300 = {f(V6_sann, 0)}.</p>"
                f"<p>Shares: NPV<sub>A</sub> = {f(1 - y6, 5)} × {f(V6_sann, 0)} − {f(A6_sann, 0)} = "
                f"<b>{f(NPVA6s_sann, 0)}</b>. Cash: 300 − {f(pr6c, 0)} = <b>{f(NPVA6c_sann, 0)}</b>, "
                "whatever A is worth.</p>"
                f"<p><b>Shares are better by NOK {f(fordel6, 0)} million</b>: B's holders accept A "
                "shares at 80 that management thinks are worth 72.</p>"
                "<p><b>Check (a decomposition, not an independent test).</b> The overvaluation "
                f"passed to B is {f(y6, 5)} × {f(A6 - A6_sann, 0)} = {f(overf6, 1)}; at market prices "
                f"shares cost A {f(NPVT6 - NPVT6c, 1)} more than cash; {f(overf6, 1)} − "
                f"{f(NPVT6 - NPVT6c, 1)} = {f(fordel6, 0)} ✓.</p>"
                "<p><b>What the market infers.</b> A manager who thinks his shares are cheap pays "
                "cash and one who thinks they are expensive pays with shares, so a share offer signals "
                "that A is overvalued (the Myers-Majluf logic). A's price falls on the announcement; "
                "B's holders may ask for a higher ratio or for cash.</p>"
            ),
            "criteria": [
                f"Shares: NPV_A = {f(1 - y6, 5)} × {f(V6_sann, 0)} − {f(A6_sann, 0)} = "
                f"{f(NPVA6s_sann, 0)} at A's true value.",
                f"Cash: NPV_A = {f(NPVA6c_sann, 0)}, independent of A's value; shares better by "
                f"{f(fordel6, 0)}.",
                "The market reads a share offer as a sign that the acquirer thinks its shares are "
                "overvalued (adverse selection), so A's price falls.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>B also has NOK 400 million of risky debt, which the merged firm takes over; A's "
                "cash flows are not perfectly correlated with B's. Without synergies, what happens to "
                "the value of B's debt? Who gains and who loses? (2-3 sentences)</p>"
            ),
            "solution": (
                "<p><b>Model answer.</b> B's debt is now backed by A's cash flows as well; since the "
                "two are not perfectly correlated, default becomes less likely (coinsurance) and "
                "<b>the value of B's debt rises</b>. With no synergies total firm value is unchanged, "
                "so B's creditors gain exactly what the shareholders of the merged firm lose.</p>"
                "<p><b>Also accepted (bonus).</b> The shareholders' NPVs in (a) are therefore "
                "overstated: together they get S minus the gain to B's creditors. Shareholders can "
                "undo the transfer by borrowing more; diversification is no motive for them, since "
                "they can diversify themselves.</p>"
            ),
            "criteria": [
                "Names the coinsurance effect: default becomes less likely, so B's debt is worth "
                "more.",
                "B's creditors gain, the merged firm's shareholders lose the same amount (total value "
                "unchanged without synergies).",
                "Bonus: the NPVs in (a) are overstated; re-levering undoes the transfer.",
            ],
        },
    ],
}

SETT = {
    "id": "prove5",
    "kind": "mock",
    "label": "Mock exam 5",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Mock exam 5, the core of the 2026 prediction in a second draw. Written for this app in "
        "Kurbatov's format (H2024, H2025): payout policy and the board of directors as the verbal "
        "exercises, then capital structure, valuation with leverage, real options and M&A. New firms "
        "and numbers throughout. Not an official exam: the course has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations, most of them ending with a "
        "short verbal question.",
        "The formula sheet is handed out. Not on it, so learn them: the APV method, the "
        "flow-to-equity method, the NPVs of a cash offer and the logic of real options.",
        "Show every calculation and carry 4 decimals on rates. Answer in English.",
        "Written for practice in this app, not an official exam. The course has not checked the "
        "solutions.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}


# ======================================================================
#                    OPPGAVEVERSJONEN (UTEN LØSNINGER)
# ======================================================================
def html_til_md(h):
    """Enkel omforming av oppgaveteksten til markdown, slik studenten ser den."""
    def tabell(m):
        rader = re.findall(r"<tr>(.*?)</tr>", m.group(0), re.S)
        ut = []
        for i, r in enumerate(rader):
            celler = [re.sub(r"<[^>]+>", "", c).strip() for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S)]
            ut.append("| " + " | ".join(celler) + " |")
            if i == 0:
                ut.append("|" + "---|" * len(celler))
        return "\n\n" + "\n".join(ut) + "\n\n"

    s = re.sub(r'<table class="data">.*?</table>', tabell, h, flags=re.S)
    s = re.sub(r"<sub>(.*?)</sub>", lambda m: "_" + (m.group(1) if m.group(1).isalnum() else "{" + m.group(1) + "}"), s)
    s = re.sub(r"<sup>(.*?)</sup>", lambda m: "^" + (m.group(1) if m.group(1).isalnum() else "(" + m.group(1) + ")"), s)
    s = re.sub(r"</?b>", "**", s)
    s = re.sub(r"</?i>", "*", s)
    s = re.sub(r"<li>", "\n- ", s)
    s = re.sub(r"</li>|<ul>|<ol>", "", s)
    s = re.sub(r"</ul>|</ol>", "\n\n", s)
    s = re.sub(r"<br\s*/?>", "  \n", s)
    s = re.sub(r"<p>", "", s)
    s = re.sub(r"</p>", "\n\n", s)
    s = html.unescape(s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def oppgave_md(sett):
    ut = [
        "# FIE402 Corporate Finance · Mock exam 5",
        "",
        "180 minutes · 100 points · 6 exercises · no multiple choice · calculator and one bilingual "
        "dictionary permitted · the course formula sheet is handed out.",
        "",
        "Answer in English. Show every calculation.",
        "",
    ]
    for ex in sett["exercises"]:
        ut += [f"## Exercise {ex['n']}: {ex['title']} ({ex['points']} points)", "", html_til_md(ex["body"]), ""]
        for d in ex.get("parts", []):
            ut += [f"**{d['label']})** ({d['points']} points) " + html_til_md(d["body"]), ""]
    return "\n".join(ut).rstrip() + "\n"


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
RYTME = {3: [3, 4, 4, 4, 3], 4: [3, 3, 2, 4, 3, 3], 5: [3, 5, 4, 8], 6: [4, 3, 6, 4, 3]}
assert sum(POENG) == SETT["points"]
for ex, p in zip(SETT["exercises"], POENG):
    if ex["points"] != p:
        feil.append(f"oppgave {ex['n']}: {ex['points']} poeng, skal være {p}")
    if "parts" in ex:
        s = sum(d["points"] for d in ex["parts"])
        if s != ex["points"]:
            feil.append(f"oppgave {ex['n']}: deloppgavene summerer til {s}")
        if [d["points"] for d in ex["parts"]] != RYTME[ex["n"]]:
            feil.append(f"oppgave {ex['n']}: rytmen følger ikke planen")
        if not 3 <= len(ex["parts"]) <= 9:
            feil.append(f"oppgave {ex['n']}: {len(ex['parts'])} deloppgaver")
        for d in ex["parts"]:
            if not 2 <= d["points"] <= 12:
                feil.append(f"oppgave {ex['n']}{d['label']}: {d['points']} poeng")
            if not 3 <= len(d["criteria"]) <= 7:
                feil.append(f"oppgave {ex['n']}{d['label']}: {len(d['criteria'])} kriterier")
        if not any("Check" in d["solution"] for d in ex["parts"]):
            feil.append(f"oppgave {ex['n']}: ingen konsistenssjekk i løsningen")
    else:
        if not 3 <= len(ex["criteria"]) <= 7:
            feil.append(f"oppgave {ex['n']}: {len(ex['criteria'])} kriterier")

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

MD = oppgave_md(SETT)
if "—" in MD or re.search(r",\s+and\b", MD):
    feil.append("tankestrek eller komma foran «and» i oppgaveversjonen")
if re.search(r"<[a-zA-Z/]", MD):
    feil.append("HTML igjen i oppgaveversjonen")

if feil:
    print("\nFEIL, prove5.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(MD)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
