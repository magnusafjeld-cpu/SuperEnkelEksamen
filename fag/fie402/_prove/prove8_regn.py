"""Prøveeksamen 8 i FIE402 («kapitalbudsjett og konkurs»): alle tall regnes her og settet
bygges herfra.

Kjør:  python3 -I prove8_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove8, runde 2). To teorioppgaver (IPO:
vinnerens forbannelse, andre teorier og svak avkastning på lang sikt; governance:
aksjonærer eller interessenter), deretter konkurskostnader ved rekapitalisering (Gladstone-
typen, PS1 E5, med nye tall), kapitalbudsjett med lager som alternativkostnad, sunk cost,
kannibalisering, ΔNWC og diskontering over 1,5 år, trinnvis finansiering med reversibel
kontrakt og coinsurance ved fusjon med gjeld i begge firmaer pluss EPS-feilslutningen.

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier og sjekker
konsistenskontrollene med assert. Kontrollen som kan feile ved en typisk feil: summen av
ΔNWC = 0 (fanger glemt frigjøring). Identiteter og dekomponeringer (merket slik i
løsningene, bare regnekontroll): NPV-endringen ved mer informativt første trinn = spart
forventet trinn 2-kostnad, kreditorenes gevinst = nedgangen i forventet underdekning,
D + E + PV(konkurskostnad) = V^U, kursen etter tilbakekjøpet = V^L/N, EBITDA-veien til FCF,
beta- mot avkastningsveien til r_U, halvårsforskyvningen, dekomponeringen av verdien av
trinnvis finansiering, at de to lånene summerer til samlet gjeld og at gevinster + tap = 0.
Hjelperen ledd() sørger for at viste mellomtall summerer til viste svar (forfatterspek § 9.5).

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria) og poengene (12/12/18/18/20/20, deloppgavene summerer). Er alt rent, skrives
prove8.json og prove8_oppgave.md (bare oppgaveteksten) i samme mappe. Er noe galt, skrives
ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (diskret diskontering, også
for brøkdeler av år; reelle sannsynligheter med r_f når risikoen ikke er systematisk; ingen
BS-regning) følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove8.json")
UT_MD = os.path.join(HER, "prove8_oppgave.md")


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
    den vises med d_tot desimaler. Feiler hvis ikke."""
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


# ================================================ Oppgave 3: konkurskostnader
N3 = 12.0                               # millioner aksjer
V3 = [240.0, 190.0, 120.0, 80.0]        # eiendelsverdi neste år, NOK mill.
p3 = 0.25                               # like sannsynlige
rf3 = 0.05                              # risikoen er diversifiserbar
c3 = 0.30                               # tap ved konkurs (andel av eiendelsverdien)
F3 = 140.0                              # pålydende nullkupong
assert near(sum([p3] * 4), 1.0)

VU3 = sum(p3 * v for v in V3) / (1 + rf3)
P0_3 = VU3 / N3
assert near(VU3, 150) and near(P0_3, 12.5)

d_pay = [F3 if v >= F3 else (1 - c3) * v for v in V3]
e_pay = [max(v - F3, 0.0) for v in V3]
tap = [0.0 if v >= F3 else c3 * v for v in V3]
for v, dd, ee, tt in zip(V3, d_pay, e_pay, tap):
    assert near(dd + ee + tt, v)                 # tilstand for tilstand
assert d_pay == [140.0, 140.0, 84.0, 56.0] and e_pay == [100.0, 50.0, 0.0, 0.0]
ED3 = sum(p3 * x for x in d_pay)
D3 = ED3 / (1 + rf3)
E3 = sum(p3 * x for x in e_pay) / (1 + rf3)
VL3 = D3 + E3
PVBC3 = sum(p3 * x for x in tap) / (1 + rf3)
assert near(D3, 100) and near(E3, 250 / 7) and near(PVBC3, 100 / 7)
assert near(VL3 + PVBC3, VU3)                    # dekomponering: tapene regnet for seg
ytm3 = F3 / D3 - 1
er3 = ED3 / D3 - 1
assert near(ytm3, 0.40) and near(er3, rf3)       # forventet avkastning = r_f (identitet her)
p_def3 = 0.5
feil_D_uten_kost = sum(p3 * min(F3, v) for v in V3) / (1 + rf3)   # glemt konkurskostnaden
feil_D_udiskontert = ED3                                            # glemt diskontering
P_ann3 = VL3 / N3
n_rep3 = D3 / P_ann3
N_igjen3 = N3 - n_rep3
P_etter3 = E3 / N_igjen3
assert near(P_etter3, P_ann3)                    # identitet: to veier til kursen
assert near((P0_3 - P_ann3) * N3, PVBC3)         # kursfallet × N = PV(konkurskostnad)
fall3 = P_ann3 / P0_3 - 1
feil_n_gammel_kurs = D3 / P0_3                   # tilbakekjøp til gammel kurs
vis("Oppgave 3", VU=VU3, P0=P0_3, D=D3, E=E3, VL=VL3, PVBC=PVBC3, ytm=ytm3, er=er3,
    P_ann=P_ann3, n_rep=n_rep3, N_igjen=N_igjen3, fall=fall3, feil_D_uten_kost=feil_D_uten_kost,
    feil_n_gammel_kurs=feil_n_gammel_kurs)

# ===================================================== Oppgave 4: kapitalbudsjett
tau4 = 0.22
study4 = 1.2                                     # sunk
capex4 = 30.0                                    # betales t = 1
dep4 = capex4 / 3                                # lineært år 2–4
rev4 = {2: 40.0, 3: 50.0, 4: 45.0}
oc4 = {2: 18.0, 3: 22.0, 4: 20.0}
kann4 = 4.0                                      # tapt kontantmargin på juice, år 2–4
nwc4 = {0: 0.0, 1: 4.8, 2: 6.0, 3: 5.4, 4: 0.0}
rent4, n_lease4, r_lease4 = 2.5, 4, 0.05         # firårig leie, før skatt
own_r4 = 0.07                                    # Bergfrukts egen kapitalkostnad (feil rente)
bE_h, de_h, rf4, rm4 = 1.35, 0.25, 0.04, 0.09    # Havre ASA
mrp4 = rm4 - rf4

rad = {k: {} for k in ("rev", "oc", "kann", "ebitda", "dep", "ebit", "skatt", "nopat",
                       "capex", "dnwc", "fcf")}
for t in (1, 2, 3, 4):
    rev = rev4.get(t, 0.0)
    oc = oc4.get(t, 0.0)
    ka = kann4 if t >= 2 else 0.0
    ebitda = rev - oc - ka
    dep = dep4 if t >= 2 else 0.0
    ebit = ebitda - dep
    skatt = tau4 * ebit
    nopat = ebit - skatt
    cx = capex4 if t == 1 else 0.0
    dnwc = nwc4[t] - nwc4[t - 1]
    fcf = nopat + dep - cx - dnwc
    fcf_b = ebitda * (1 - tau4) + tau4 * dep - cx - dnwc   # Kurbatovs andre vei (identitet)
    assert near(fcf, fcf_b)
    for k, v in (("rev", rev), ("oc", oc), ("kann", ka), ("ebitda", ebitda), ("dep", dep),
                 ("ebit", ebit), ("skatt", skatt), ("nopat", nopat), ("capex", cx),
                 ("dnwc", dnwc), ("fcf", fcf)):
        rad[k][t] = v
FCF4 = rad["fcf"]
assert near(sum(rad["dnwc"].values()), 0.0)      # ekte kontroll: all NWC frigjøres
assert near(FCF4[1], -34.8) and near(FCF4[2], 15.04) and near(FCF4[3], 21.52) and near(FCF4[4], 23.98)
# feil: nivået på arbeidskapitalen i stedet for endringen (og ingen frigjøring)
FCF4_niva = {t: rad["nopat"][t] + rad["dep"][t] - rad["capex"][t] - nwc4[t] for t in (1, 2, 3, 4)}

dv_h = de_h / (1 + de_h)
ev_h = 1 - dv_h
bU4 = ev_h * bE_h + dv_h * 0.0
rU4 = rf4 + bU4 * mrp4
rE_h = rf4 + bE_h * mrp4
assert near(dv_h, 0.2) and near(bU4, 1.08) and near(rU4, 0.094)
assert near(ev_h * rE_h + dv_h * rf4, rU4)       # avkastningsveien (identitet: CAPM er lineær)
feil_rE_h = rE_h                                  # Havres r_E rett inn
bU4_feil = bE_h / (1 + (1 - tau4) * de_h)         # unlevering med (1 − τ): feil ved konstant D/E
rU4_feil = rf4 + bU4_feil * mrp4

pv4 = {t: FCF4[t] / (1 + rU4) ** t for t in FCF4}
NPVline4 = sum(pv4.values())
vist_sum(list(pv4.values()), NPVline4, 4)
rent_at4 = rent4 * (1 - tau4)
ann4 = (1 - (1 + r_lease4) ** -n_lease4) / r_lease4
PVlease4 = rent_at4 * ann4
assert near(PVlease4, sum(rent_at4 / (1 + r_lease4) ** t for t in range(1, 5)))
NPV4 = NPVline4 - PVlease4
assert NPV4 > 0
feil_uten_leie = NPVline4
feil_leie_rU = NPVline4 - rent_at4 * (1 - (1 + rU4) ** -4) / rU4
feil_leie_forskatt = NPVline4 - rent4 * ann4
feil_egen_r = sum(FCF4[t] / (1 + own_r4) ** t for t in FCF4) - PVlease4
feil_niva = sum(FCF4_niva[t] / (1 + rU4) ** t for t in FCF4_niva) - PVlease4
feil_sunk = NPV4 - study4
feil_tau_unlever = sum(FCF4[t] / (1 + rU4_feil) ** t for t in FCF4) - PVlease4
assert abs(bU4_feil - 1.1297) < 1e-4 and abs(feil_tau_unlever - 6.7711) < 1e-4

# d) leie i 18 måneder, linjen et halvt år senere
short4, t_short4 = 3.0, 1.5
short_at4 = short4 * (1 - tau4)
PVshort4 = short_at4 / (1 + r_lease4) ** t_short4
NPVline_d4 = NPVline4 / (1 + rU4) ** 0.5
assert near(NPVline_d4, sum(FCF4[t] / (1 + rU4) ** (t + 0.5) for t in FCF4))   # identitet
kost_utsett4 = NPVline4 - NPVline_d4
NPV_d4 = NPVline_d4 + PVshort4 - PVlease4
assert NPV_d4 > NPV4 and near(NPV_d4 - NPV4, PVshort4 - kost_utsett4)
feil_short_rU = NPVline_d4 + short_at4 / (1 + rU4) ** 1.5 - PVlease4
feil_short_1aar = NPVline_d4 + short_at4 / (1 + r_lease4) - PVlease4
vis("Oppgave 4", FCF=FCF4, bU=bU4, rU=rU4, rE_h=rE_h, pv=pv4, NPVline=NPVline4,
    PVlease=PVlease4, ann=ann4, NPV=NPV4, PVshort=PVshort4, NPVline_d=NPVline_d4,
    kost_utsett=kost_utsett4, NPV_d=NPV_d4, feil_uten_leie=feil_uten_leie,
    feil_leie_rU=feil_leie_rU, feil_leie_forskatt=feil_leie_forskatt, feil_egen_r=feil_egen_r,
    feil_niva=feil_niva)

# ================================================ Oppgave 5: trinnvis finansiering
r5 = 0.05                                        # ikke-systematisk risiko
V5 = 260.0                                       # verdi ved t = 2 hvis begge trinn lykkes
A5 = 45.0                                        # alt på én gang, betales i dag
s1, s2 = 7.0, 44.0                               # lab i dag, felt ved t = 1
p1, p2 = 0.30, 0.60
pp5 = p1 * p2
PVpay5 = pp5 * V5 / (1 + r5) ** 2
NPV_A5 = -A5 + PVpay5
assert NPV_A5 < 0
cont1 = -s2 + p2 * V5 / (1 + r5)                 # verdi ved t = 1 av å fortsette etter vellykket lab
assert cont1 > 0
NPV_S5 = -s1 + p1 * max(cont1, 0.0) / (1 + r5)
# samme svar langs stiene (identitet, regnekontroll)
sti = (1 - p1) * (-s1) + p1 * (1 - p2) * (-s1 - s2 / (1 + r5)) + pp5 * (-s1 - s2 / (1 + r5) + V5 / (1 + r5) ** 2)
assert near(sti, NPV_S5)
feil_commit = -s1 - s2 / (1 + r5) + PVpay5       # betaler felt uansett
feil_udiskontert = -s1 + p1 * (-s2 + p2 * V5)
verdi_trinn5 = NPV_S5 - NPV_A5
spart5 = (1 - p1) * s2 / (1 + r5)
ekstra5 = s1 + s2 / (1 + r5) - A5
assert near(verdi_trinn5, spart5 - ekstra5)      # dekomponering (identitet)
Pmax5 = PVpay5 - NPV_S5
assert near(-Pmax5 + PVpay5, NPV_S5) and near(Pmax5, A5 - verdi_trinn5)
# d) mer informativt første trinn
q1, q2 = 0.20, 0.90
assert near(q1 * q2, pp5)
cont1_d = -s2 + q2 * V5 / (1 + r5)
NPV_Sd5 = -s1 + q1 * max(cont1_d, 0.0) / (1 + r5)
assert NPV_Sd5 > NPV_S5
assert near(NPV_Sd5 - NPV_S5, (p1 - q1) * s2 / (1 + r5))   # dekomponering: bare trinn 2-kostnaden endres
# e) reversibel kontrakt: kan avbryte ved t = 1 og få R tilbake
R5 = 40.0
assert p2 * V5 / (1 + r5) > R5                   # etter vellykket lab fortsetter man
NPV_R5 = -A5 + (1 - p1) * R5 / (1 + r5) + PVpay5
assert NPV_R5 > NPV_S5
Rkrit5 = (NPV_S5 - NPV_A5) * (1 + r5) / (1 - p1)
assert near(-A5 + (1 - p1) * Rkrit5 / (1 + r5) + PVpay5, NPV_S5) and Rkrit5 < R5
feil_R_alltid = -A5 + R5 / (1 + r5)              # avbryter i begge tilstander
vis("Oppgave 5", PVpay=PVpay5, NPV_A=NPV_A5, cont1=cont1, NPV_S=NPV_S5, verdi_trinn=verdi_trinn5,
    spart=spart5, ekstra=ekstra5, Pmax=Pmax5, cont1_d=cont1_d, NPV_Sd=NPV_Sd5,
    endring=NPV_Sd5 - NPV_S5, NPV_R=NPV_R5, Rkrit=Rkrit5, feil_commit=feil_commit,
    feil_udiskontert=feil_udiskontert, feil_R_alltid=feil_R_alltid)

# ===================================================== Oppgave 6: coinsurance og EPS
pr6 = [0.25, 0.50, 0.25]
VN6 = [180.0, 120.0, 40.0]                       # Nordlaks
VF6 = [60.0, 90.0, 130.0]                        # Fjellkraft
FN6, FF6 = 100.0, 75.0
rf6 = 0.0                                        # ingen diskontering
assert near(sum(pr6), 1.0)


def pv6(x):
    return sum(p * v for p, v in zip(pr6, x)) / (1 + rf6)


dN = [min(FN6, v) for v in VN6]
eN = [max(v - FN6, 0.0) for v in VN6]
dF = [min(FF6, v) for v in VF6]
eF = [max(v - FF6, 0.0) for v in VF6]
DN, EN, VN = pv6(dN), pv6(eN), pv6(VN6)
DF, EF, VF = pv6(dF), pv6(eF), pv6(VF6)
assert near(DN + EN, VN) and near(DF + EF, VF)   # identitet (ingen konkurskostnad)
VM6 = [a + b for a, b in zip(VN6, VF6)]
FM6 = FN6 + FF6
dM = [min(FM6, v) for v in VM6]
eM = [max(v - FM6, 0.0) for v in VM6]
DM, EM, VM = pv6(dM), pv6(eM), pv6(VM6)
assert near(VM, VN + VF)                         # identitet: ingen synergier i tabellen
assert dM == [175.0, 175.0, 170.0] and eM == [65.0, 35.0, 0.0]
# lånene rangerer likt: pro rata i mislighold
dN_m = [FN6 if v >= FM6 else v * FN6 / FM6 for v in VM6]
dF_m = [FF6 if v >= FM6 else v * FF6 / FM6 for v in VM6]
DN_m, DF_m = pv6(dN_m), pv6(dF_m)
assert near(DN_m + DF_m, DM)                     # identitet: de to lånene = samlet gjeld
ytmN_for, ytmN_etter = FN6 / DN - 1, FN6 / DN_m - 1
ytmF_for, ytmF_etter = FF6 / DF - 1, FF6 / DF_m - 1
gN, gF = DN_m - DN, DF_m - DF
gE = EM - (EN + EF)
assert near(gN + gF + gE, 0.0)                   # identitet: ingen verdi skapt
# kreditorenes gevinst = nedgangen i PV av forventet underdekning (putten)
under_for = pv6([max(FN6 - v, 0.0) for v in VN6]) + pv6([max(FF6 - v, 0.0) for v in VF6])
under_etter = pv6([max(FM6 - v, 0.0) for v in VM6])
assert near(gN + gF, under_for - under_etter)    # dekomponering via underdekningen
assert near(DN, 85) and near(DF, 71.25) and near(DM, 173.75) and near(EM, 33.75)
feil_risikofri = FM6 / (1 + rf6)                 # antar sammenslått gjeld risikofri
# aksjebytte til markedsverdi: fordeling mellom aksjonærgruppene (bonus)
wN = EN / (EN + EF)
gEN, gEF = wN * EM - EN, (1 - wN) * EM - EF
assert near(gEN + gEF, gE)
# d) EPS-feilslutningen
NI_T, N_T, P_T = 60.0, 20.0, 45.0                # Torvik
NI_L, N_L, P_L = 16.0, 6.0, 24.0                 # Lunde
EPS_T = NI_T / N_T
PE_T = P_T / EPS_T
PE_L = P_L / (NI_L / N_L)
V_L = N_L * P_L
n_ny = V_L / P_T
EPS_ny = (NI_T + NI_L) / (N_T + n_ny)
P_ny = (N_T * P_T + V_L) / (N_T + n_ny)
PE_ny = P_ny / EPS_ny
assert near(P_ny, P_T) and EPS_ny > EPS_T and PE_ny < PE_T
assert near(PE_ny, (N_T * P_T + V_L) / (NI_T + NI_L))
eps_vekst = EPS_ny / EPS_T - 1
feil_PE15 = PE_T * EPS_ny                        # gammel P/E på ny EPS
vis("Oppgave 6", DN=DN, EN=EN, VN=VN, DF=DF, EF=EF, VF=VF, DM=DM, EM=EM, VM=VM, DN_m=DN_m,
    DF_m=DF_m, ytmN=(ytmN_for, ytmN_etter), ytmF=(ytmF_for, ytmF_etter), gN=gN, gF=gF, gE=gE,
    under=(under_for, under_etter), gEN=gEN, gEF=gEF, wN=wN, EPS_T=EPS_T, PE_T=PE_T, PE_L=PE_L,
    n_ny=n_ny, EPS_ny=EPS_ny, P_ny=P_ny, PE_ny=PE_ny, eps_vekst=eps_vekst, feil_PE15=feil_PE15,
    feil_risikofri=feil_risikofri)


# ======================================================================
#                              TEKSTENE
# ======================================================================
def tr(*celler, th=False):
    tag = "th" if th else "td"
    ut = []
    for i, c in enumerate(celler):
        if th or i == 0:
            ut.append(f"<{tag}>{c}</{tag}>")
        else:
            ut.append(f"<td class=\"n\">{c}</td>")
    return "<tr>" + "".join(ut) + "</tr>"


ex1 = {
    "n": 1, "title": "Security issues", "points": 12, "topic": "Initial public offerings",
    "chapters": [14],
    "body": (
        "<p>Lysaker Robotics ASA went public last year at NOK 50 a share; the shares closed at "
        "NOK 58 on the first day. Three years later the stock has returned less than comparable "
        "firms. Both patterns are typical of IPOs.</p>"
        "<p>a) Explain the winner's curse and why it makes issuers underprice IPOs. "
        "(2-3 sentences.)</p>"
        "<p>b) Give two other explanations for IPO underpricing. (1-2 sentences each.)</p>"
        "<p>c) Why do recent IPOs tend to underperform comparable firms in the following years? "
        "(2-3 sentences.)</p>"
        "<p>Each part is worth 4 points.</p>"
    ),
    "solution": (
        "<p><b>a) The winner's curse (3 sentences).</b> Some investors know which IPOs are good: "
        "they apply only for those, so good issues are heavily oversubscribed and the shares are "
        "rationed, while in bad issues the uninformed investors get everything they asked for. An "
        "uninformed investor therefore «wins» far more of the bad shares than of the good ones and "
        "loses money on average if the price equals the expected value, so he would stay away. "
        "Issuers need his money, so they price the shares below their expected value until the "
        "uninformed just break even; the positive average first-day return is that "
        "compensation.</p>"
        "<p><i>Illustration from the lecture (not required):</i> shares worth 120 or 80 with "
        "equal probability, 10× oversubscription in good issues and 2× in bad ones. At a price "
        "of 100 an uninformed investor earns about −13.3%; at about 86.6 he breaks even and the "
        "average first-day return is about 15%.</p>"
        "<p><b>b) Two other explanations (1-2 sentences each).</b></p>"
        "<p><b>1. Conflicts of interest at the investment bank.</b> The underwriter sets a low "
        "price to hand cheap shares to its favoured clients (institutions and hedge funds) and to "
        "make sure the issue sells; the pre-IPO owners pay for it with the money left on the "
        "table.</p>"
        "<p><b>2. Control.</b> A low price creates excess demand, so the firm can choose whom to "
        "allocate shares to and spread them over many small holders, keeping out large "
        "shareholders who could interfere with the founders and managers.</p>"
        "<p><b>Also accepted:</b> behavioural (enthusiastic, «irrational» investors bid the price "
        "above value on the first day, so part of the measured underpricing is overpricing of the "
        "first close); signalling (a good firm underprices to show its quality and sells more "
        "shares later at a higher price); compensation for informed investors who reveal their "
        "demand during bookbuilding; insurance against lawsuits from investors who lose "
        "money.</p>"
        "<p><b>c) Long-run underperformance (3 sentences).</b> Right after the IPO the optimistic "
        "investors buy, while the pessimistic ones cannot yet sell short: few shares can be "
        "borrowed, insiders are locked up and little information is public. The price is "
        "therefore set by the optimists and lies above fundamental value. As information spreads "
        "and short selling begins, the price converges to fundamental value, so the shares earn "
        "less than comparable firms over the following years.</p>"
        "<p><b>Also accepted:</b> firms go public when valuations in their industry are high "
        "(windows of opportunity), insiders sell when the lock-up expires and earnings are "
        "managed up before the IPO. Neither pattern contradicts the other: underpricing is "
        "measured from the offer price, underperformance from the first-day close.</p>"
    ),
    "criteria": [
        "Three parts, 4 points each, graded separately.",
        "a) Full marks need the mechanism: informed investors avoid bad IPOs, so the uninformed "
        "are rationed in good issues and fully allocated in bad ones and lose at a fair price; "
        "underpricing is what keeps them in the market. Naming the winner's curse without the "
        "allocation mechanism earns at most 1 point.",
        "b) Two explanations other than the winner's curse, 2 points each. Accepted: "
        "investment bank conflicts, control over the shareholder base, behavioural overpricing, "
        "signalling, compensation for information in bookbuilding, insurance against lawsuits.",
        "b) The two must rest on different mechanisms. Bookbuilding compensation and the winner's "
        "curse are both asymmetric information but count as different mechanisms; «the bank "
        "wants a safe issue» and «the bank favours its clients» are one explanation "
        "(the bank conflict).",
        "c) The mechanism: optimists set the price because pessimists cannot yet short, then the "
        "price falls towards fundamental value as information spreads and short selling starts. "
        "Market timing of IPOs or lock-up expiry with a mechanism also earns full points.",
        "Keep to the sentence budget; a list of labels without mechanisms earns at most half.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "body": (
        "<p>At the annual meeting of Fjordmat ASA, a listed food producer, shareholders propose "
        "to change the board's mandate from maximising shareholder value to balancing the "
        "interests of shareholders, employees, customers, local communities and the "
        "environment.</p>"
        "<p>a) Give one argument for keeping shareholder value as the objective and one argument "
        "for the proposal. (6 points; 2-3 sentences per argument.)</p>"
        "<p>b) Suppose the proposal is adopted. Explain one problem it creates for how the board "
        "evaluates and rewards the CEO and one way the board can limit it. "
        "(6 points; 3-4 sentences.)</p>"
    ),
    "solution": (
        "<p><b>a) For shareholder value: the residual claim (Friedman).</b> Employees, suppliers, "
        "customers and creditors are paid what their contracts and the law promise them; the "
        "shareholders get what is left, so maximising the value of their claim maximises the value "
        "the firm creates after everyone else is paid. Social goals are better set by voters "
        "through law and by owners spending their own dividends: a CEO who pursues «social "
        "responsibility» spends other people's money on aims nobody gave him a mandate for.</p>"
        "<p><b>For the proposal: incomplete contracts and externalities.</b> Many stakeholder "
        "interests are not protected by any contract: employees invest in skills that are only "
        "useful to Fjordmat, local farmers build capacity for its plants and communities bear "
        "its emissions. A board that maximises shareholder value alone can capture value from "
        "these groups (or harm them where the law is silent); once they expect this they "
        "invest less in the firm, so a broader mandate can also protect long-term value.</p>"
        "<p><b>b) Evaluating and paying the CEO (4 sentences).</b> With five objectives and no "
        "weights the board can no longer tell whether a falling share price reflects poor "
        "management or a deliberate choice in favour of employees or the environment: the CEO "
        "can always point to the goal he did meet. Accountability to everyone becomes "
        "accountability to no one: the CEO is harder to fire, his pay is less tied to "
        "performance and empire building or perks can be presented as care for stakeholders. "
        "The board can limit this by writing a few measurable, externally verified stakeholder "
        "targets (for example emissions or the injury rate) with explicit and limited weights "
        "into the bonus, while keeping most of the pay in long-term shares. The weakness of the "
        "remedy is that targets can be gamed: the CEO will meet the cheapest ones, so independent "
        "directors must set and audit them.</p>"
        "<p><b>Also accepted in a).</b> For shareholder value: one clear objective that can be "
        "measured makes managers accountable («too many missions, conflicting interests»). For "
        "the proposal: many shareholders care about more than money (in the Stanford survey most "
        "respondents say stakeholders matter), or long-term value depends on reputation and "
        "motivated employees. In b): stakeholder KPIs that make the CEO short-termist, a "
        "board that becomes captive because no single metric can be used against the CEO, "
        "separate committees or an independent chair as the remedy.</p>"
    ),
    "criteria": [
        "a) One argument on each side, 3 points each: a mechanism, not a slogan. A bare «Friedman "
        "said so» or «stakeholders matter» earns at most 1 point.",
        "a) Accepted for shareholder value: the residual claim; accountability with one "
        "measurable objective; social goals belong to voters and owners. For the proposal: "
        "incomplete contracts and firm-specific investments; externalities not priced; "
        "shareholders' own non-financial preferences; long-term value depends on stakeholders.",
        "a) The two arguments must be genuinely on opposite sides: two arguments for the same "
        "side do not replace the missing one. «Treating stakeholders well raises long-term "
        "shareholder value» supports the proposal only if it says why the shareholder mandate "
        "alone would not achieve it.",
        "b) The problem (3 points): many unweighted goals make performance hard to measure, so "
        "the CEO is harder to hold accountable and to fire; pay is less tied to performance.",
        "b) The remedy (3 points): a few measurable, verified stakeholder targets with limited "
        "weights next to long-term equity pay, set and audited by independent directors. Any "
        "reasonable remedy with a mechanism scores; noting how it can be gamed is a bonus.",
        "If the accountability argument is used in a), b) earns its points only for the concrete "
        "consequence for evaluation and pay and for the remedy, not for repeating it. Two problems "
        "and no remedy earn at most 3 points.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
t3_rows = "".join(
    tr(f"{i + 1}", g(p3), g(v), "no" if v >= F3 else "yes", g(dd), g(ee), g(tt))
    for i, (v, dd, ee, tt) in enumerate(zip(V3, d_pay, e_pay, tap)))
ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18,
    "topic": "Costs of financial distress, recapitalisation", "chapters": [5, 6, 8],
    "body": (
        f"<p>Skagerak Drone ASA is all-equity financed with {g(N3)} million shares. Next year its "
        f"assets will be worth NOK {g(V3[0])}, {g(V3[1])}, {g(V3[2])} or {g(V3[3])} million with "
        f"equal probability. The risk is diversifiable; r<sub>f</sub> = {pc(rf3)}. In default, "
        f"{pc(c3)} of the asset value is lost to legal costs and a fire sale. There are no taxes. "
        "Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is Skagerak worth today and what is its share price?</p>",
            "solution": (
                f"<p>The risk is diversifiable, so the expected value is discounted at r<sub>f</sub>:"
                f"<br>V<sup>U</sup> = {g(p3)} × ({g(V3[0])} + {g(V3[1])} + {g(V3[2])} + {g(V3[3])})"
                f"/{g(1 + rf3)} = {g(p3 * sum(V3))}/{g(1 + rf3)} = <b>NOK {g(VU3)} million</b></p>"
                f"<p>P = {g(VU3)}/{g(N3)} = <b>NOK {g(P0_3)}</b></p>"
            ),
            "criteria": [
                f"Expected value {g(p3 * sum(V3))} discounted at r_f = {pc(rf3)}, because the risk "
                "is diversifiable.",
                f"V^U = {g(VU3)} and P = {g(P0_3)}.",
                "Note (no points): bankruptcy costs play no role yet, because an all-equity firm "
                "cannot default.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                f"<p>Skagerak plans to issue zero-coupon debt with face value NOK {g(F3)} million due "
                "next year and use the proceeds to repurchase shares. Shares are repurchased at the "
                "market price after the announcement. What will the debt and the equity be worth "
                "after the transaction?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. State by state.</b> Skagerak defaults when its assets are worth less "
                f"than {g(F3)}. The creditors then get {g(1 - c3)} × assets; the shareholders get "
                "nothing.</p>"
                "<table class=\"data\">"
                + tr("State", "Probability", "Assets", "Default", "Debt", "Equity", "Lost", th=True)
                + t3_rows + "</table>"
                f"<p><b>Step 2. Values today.</b><br>D = {g(p3)} × ({g(d_pay[0])} + {g(d_pay[1])} + "
                f"{g(d_pay[2])} + {g(d_pay[3])})/{g(1 + rf3)} = {g(ED3)}/{g(1 + rf3)} = "
                f"<b>NOK {f(D3)} million</b><br>E = {g(p3)} × ({g(e_pay[0])} + {g(e_pay[1])})/"
                f"{g(1 + rf3)} = <b>NOK {f(E3)} million</b><br>V<sup>L</sup> = D + E = "
                f"<b>{f(VL3)}</b></p>"
                f"<p><b>Check (decomposition).</b> The expected losses, computed on their own: "
                f"{g(p3)} × ({g(tap[2])} + {g(tap[3])})/{g(1 + rf3)} = {f(PVBC3)}; "
                f"{f(VL3)} + {f(PVBC3)} = {f(VL3 + PVBC3)} = V<sup>U</sup> ✓. The firm is worth "
                "less with debt by exactly the present value of the costs of financial distress.</p>"
            ),
            "criteria": [
                f"Defaults in the two low states; the creditors get {g(1 - c3)} × assets there: "
                f"{g(d_pay[2])} and {g(d_pay[3])}.",
                f"D = {f(D3)} and E = {f(E3)}, so V^L = {f(VL3)}. Ignoring the bankruptcy cost "
                f"gives D = {f(feil_D_uten_kost)}, which is the classic error.",
                f"(bonus) Check: V^U − V^L = {f(PVBC3)} = PV of the expected losses.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>What are the yield to maturity and the expected return on the debt? Explain "
                "briefly why they differ.</p>"
            ),
            "solution": (
                f"<p><b>Yield to maturity.</b> The promised payment over the price: "
                f"{g(F3)}/{f(D3)} − 1 = <b>{pc(ytm3)}</b></p>"
                f"<p><b>Expected return.</b> The expected payment over the price: "
                f"{g(ED3)}/{f(D3)} − 1 = <b>{pc(er3)}</b></p>"
                f"<p><b>Why they differ.</b> The yield assumes that the promised {g(F3)} is paid in "
                f"full, which happens only with probability {pc(1 - p_def3)}; in the two default "
                f"states the creditors get {g(d_pay[2])} or {g(d_pay[3])}, after the bankruptcy "
                "costs. The expected return takes these losses into account. Because the risk "
                f"is diversifiable the creditors require only the risk-free rate of {pc(rf3)}. The "
                "whole spread is compensation for expected default losses, not a risk premium.</p>"
                "<p><b>Note.</b> The expected return equals r<sub>f</sub> by construction here (the "
                "debt was priced at r<sub>f</sub>), so this is an identity, not a check.</p>"
            ),
            "criteria": [
                f"YTM = {g(F3)}/{f(D3)} − 1 = {pc(ytm3)}.",
                f"Expected return = {g(ED3)}/{f(D3)} − 1 = {pc(er3)} = r_f.",
                "Explains: the YTM is the return if the debt is paid in full; the expected return "
                "includes the default states and their losses.",
                "Explains why it equals r_f: the risk is diversifiable, so there is no risk premium; "
                "the spread is expected default loss. Calling the YTM the cost of debt is the error.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>What happens to the share price when the plan is announced? How many shares "
                "does Skagerak repurchase?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The announcement.</b> From the moment the plan is known, the firm will "
                f"be worth V<sup>L</sup> = {f(VL3)}. Before the repurchase all of it still "
                f"belongs to the {g(N3)} million shares (the debt has not been issued yet):<br>"
                f"P = {f(VL3)}/{g(N3)} = <b>NOK {f(P_ann3)}</b>, down from {g(P0_3)} "
                f"({pc(fall3)}).</p>"
                "<p>Unlike in a perfect MM market, the price reacts: the costs of financial distress "
                f"are a real loss of {f(PVBC3)}, which is {f(PVBC3)}/{g(N3)} = {f(PVBC3 / N3)} per "
                "share.</p>"
                f"<p><b>Step 2. The repurchase.</b> The debt raises {f(D3)}; shares are bought "
                f"at the new price:<br>n = {f(D3)}/{f(P_ann3)} = <b>{f(n_rep3)} million shares</b>, "
                f"leaving {g(N3)} − {f(n_rep3)} = {f(N_igjen3)} million.</p>"
                f"<p><b>Check (identity).</b> After the repurchase, E/shares = {f(E3)}/{f(N_igjen3)} = "
                f"{f(P_etter3)} = the announcement price ✓: the price does not move again when the "
                "repurchase is carried out.</p>"
            ),
            "criteria": [
                f"Price at announcement = V^L/N = {f(VL3)}/{g(N3)} = {f(P_ann3)}.",
                f"States why it falls: the distress costs ({f(PVBC3)}) are a real loss, borne at "
                "announcement; «no reaction, MM» is the error here.",
                f"Shares repurchased = {f(D3)}/{f(P_ann3)} = {f(n_rep3)} million. Repurchasing at the "
                f"old price ({g(P0_3)}) gives {f(feil_n_gammel_kurs)} and is wrong.",
                f"(bonus) Check: {f(E3)}/{f(N_igjen3)} = {f(P_etter3)}.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Who bears the expected costs of financial distress? If interest were tax "
                "deductible, how large would the present value of the tax shield have to be for the "
                "plan to benefit the shareholders? (2-3 sentences.)</p>"
            ),
            "solution": (
                "<p><b>Model answer (3 sentences).</b> The shareholders bear them: the creditors "
                "are rational and pay only the fair value of the promise, "
                f"{f(D3)} for {g(F3)}, so the expected losses in default are priced in and the share "
                f"price falls from {g(P0_3)} to {f(P_ann3)} at announcement. The plan therefore "
                "benefits the shareholders only if the debt brings a gain that is larger than these "
                f"costs: PV(tax shield) &gt; PV(distress costs) = V<sup>U</sup> − V<sup>L</sup> = "
                f"<b>NOK {f(PVBC3)} million</b>. This is the trade-off theory: V<sup>L</sup> = "
                "V<sup>U</sup> + PV(TS) − PV(costs of financial distress): the firm should "
                "borrow up to the point where the two margins are equal.</p>"
            ),
            "criteria": [
                "The shareholders bear the costs: fairly priced debt passes the expected loss back "
                "to them through the price at announcement (or through better debt terms).",
                f"PV(tax shield) must exceed V^U − V^L = {f(PVBC3)} (taking the distress costs as given).",
                "Stating PV(TS) > PV(costs of financial distress) counts as naming the trade-off; "
                "(bonus) calling it the trade-off theory and saying where it puts optimal debt.",
                "«The creditors bear them because they lose in default» is the classic error: they "
                "lose ex post but are compensated ex ante.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
yrs = (1, 2, 3, 4)


def rk(navn, key, sign=1.0, blank0=False):
    celler = []
    for t in yrs:
        v = sign * rad[key][t]
        celler.append("" if (blank0 and abs(v) < 1e-12) else f(v, 2))
    return tr(navn, *celler)


fcf_tab = (
    "<table class=\"data\">" + tr("Year", "1", "2", "3", "4", th=True)
    + rk("Revenue", "rev", 1, True) + rk("Operating costs", "oc", -1, True)
    + rk("Lost margin on juices", "kann", -1, True) + rk("EBITDA", "ebitda")
    + rk("Depreciation", "dep", -1, True) + rk("EBIT", "ebit") + rk("Tax (22%)", "skatt", -1)
    + rk("NOPAT", "nopat") + rk("+ Depreciation", "dep", 1, True)
    + rk("− Capital expenditure", "capex", -1, True) + rk("− ΔNWC", "dnwc", -1)
    + tr("<b>FCF</b>", *[f"<b>{f(FCF4[t], 2)}</b>" for t in yrs]) + "</table>"
)
nwc_rad = "".join(f"<td class=\"n\">{g(nwc4[t])}</td>" for t in yrs)
ex4 = {
    "n": 4, "title": "Valuation", "points": 18, "topic": "Capital budgeting",
    "chapters": [1, 2, 4],
    "body": (
        "<p>Bergfrukt ASA, a juice producer, considers a line of oat drinks. Figures are in NOK "
        f"million; the tax rate is {pc(tau4)}.</p><ul>"
        f"<li>Bergfrukt has already paid {g(study4)} for a market study.</li>"
        f"<li>The line costs {g(capex4)}, paid when it is delivered and installed at the end of "
        "Year 1. It produces in Years 2-4 and is depreciated straight-line to zero over those "
        "years.</li>"
        f"<li>The oat drinks will cut the cash margin on Bergfrukt's juices by {g(kann4)} a year "
        "in Years 2-4.</li>"
        "<li>The line needs an empty warehouse Bergfrukt owns, which could instead be leased out "
        f"from today for four years (no shorter lease) at {g(rent4)} a year before tax, paid at "
        f"the end of Years 1-4; discount the fixed rent at {pc(r_lease4)}. Ignore the warehouse "
        "after the line or lease ends.</li>"
        f"<li>Bergfrukt is all-equity financed (cost of capital {pc(own_r4)}) and finances the "
        "line with equity. Havre ASA, a listed pure oat-drink producer, has an equity beta of "
        f"{g(bE_h)}, a constant D/E of {g(de_h)} and risk-free debt. r<sub>f</sub> = {pc(rf4)}; "
        f"the expected market return is {pc(rm4)}.</li></ul>"
        "<table class=\"data\">" + tr("Year", "1", "2", "3", "4", th=True)
        + tr("Revenue", "", g(rev4[2]), g(rev4[3]), g(rev4[4]))
        + tr("Operating costs (cash)", "", g(oc4[2]), g(oc4[3]), g(oc4[4]))
        + "<tr><td>Net working capital, end of year</td>" + nwc_rad + "</tr></table>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": f"<p>What discount rate should Bergfrukt use for the line? Why not {pc(own_r4)}?</p>",
            "solution": (
                f"<p><b>Step 1. Unlever Havre.</b> D/E = {g(de_h)} gives D/V = {g(de_h)}/"
                f"{g(1 + de_h)} = {g(dv_h)} and E/V = {g(ev_h)}. The debt is risk-free (β<sub>D</sub> "
                f"= 0):<br>β<sub>U</sub> = {g(ev_h)} × {g(bE_h)} + {g(dv_h)} × 0 = <b>{g(bU4)}</b></p>"
                f"<p><b>Step 2. CAPM.</b> r<sub>U</sub> = {pc(rf4)} + {g(bU4)} × ({pc(rm4)} − "
                f"{pc(rf4)}) = <b>{pc(rU4)}</b>. The line is financed with equity, so r<sub>U</sub> "
                "is the rate.</p>"
                f"<p><b>Why not {pc(own_r4)}.</b> The discount rate belongs to the risk of the "
                f"project's cash flows, not to the firm that pays for it. {pc(own_r4)} reflects "
                "Bergfrukt's juice business; Havre shows the risk of oat drinks. Using "
                f"{pc(own_r4)} would make the line look better than it is.</p>"
                f"<p><b>Check (identity).</b> Through returns: r<sub>E</sub> = {pc(rf4)} + {g(bE_h)} "
                f"× {pc(mrp4)} = {pc(rE_h)}; {g(ev_h)} × {pc(rE_h)} + {g(dv_h)} × {pc(rf4)} = "
                f"{pc(ev_h * rE_h + dv_h * rf4)} ✓.</p>"
            ),
            "criteria": [
                f"β_U = {g(ev_h)} × {g(bE_h)} = {g(bU4)} with weights from D/E = {g(de_h)} "
                f"(D/V = {g(dv_h)}); r_U = {pc(rU4)}.",
                f"Using Havre's r_E ({pc(rE_h)}) without unlevering is the error: it contains Havre's "
                "financial risk.",
                "Why not 7%: the rate is set by the project's risk, not by Bergfrukt's average "
                "business.",
                f"Unlevering with (1 − τ), β_U = {g(bE_h)}/(1 + {g(1 - tau4)} × {g(de_h)}) = "
                f"{f(bU4_feil)}, is the classic error here: Havre keeps a constant D/E, so the tax "
                f"shield has the asset risk and the weights carry no (1 − τ). It gives r_U = "
                f"{pc(rU4_feil)} and later an NPV of {f(feil_tau_unlever)}.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": "<p>Find the free cash flow of the line in Years 1 to 4, leaving out the warehouse.</p>",
            "solution": (
                "<p>FCF = EBIT(1 − τ) + Depreciation − CapEx − ΔNWC, with depreciation "
                f"{g(capex4)}/3 = {g(dep4)} per year in Years 2-4.</p>" + fcf_tab +
                "<p><b>What is left out and why.</b> The market study is sunk: it is paid whatever "
                f"Bergfrukt decides, so the {g(study4)} is not a cash flow of the project. The lost "
                "margin on juices is included: it is an incremental effect of the project "
                "(cannibalisation). Interest is not deducted: the FCF belongs to all investors.</p>"
                f"<p><b>Check (can fail).</b> The changes in NWC sum to zero: "
                f"{ledd([rad['dnwc'][t] for t in yrs])} = 0, so all "
                "the working capital comes back at the end. The other route, EBITDA(1 − τ) + τ × "
                f"Depreciation, gives the same FCF (in Year 2: {g(rad['ebitda'][2])} × {g(1 - tau4)} + "
                f"{g(tau4)} × {g(dep4)} − {g(rad['dnwc'][2])} = {f(FCF4[2], 2)}); that is an identity "
                "and only checks the arithmetic.</p>"
            ),
            "criteria": [
                f"FCF = {f(FCF4[1], 2)}, {f(FCF4[2], 2)}, {f(FCF4[3], 2)}, {f(FCF4[4], 2)}.",
                f"Uses the change in NWC, with {g(nwc4[3])} released in Year 4. Subtracting the "
                "level of NWC each year instead of the change («forgetting the delta») is the "
                "biggest error here.",
                f"Includes the lost juice margin of {g(kann4)} a year (cannibalisation) before tax.",
                f"Leaves out the sunk market study ({g(study4)}) and adds back depreciation.",
                "Show the table. Any correct route (EBIT or EBITDA) earns full points.",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": "<p>What is the NPV of the project today?</p>",
            "solution": (
                f"<p><b>Step 1. The line at r<sub>U</sub> = {pc(rU4)}.</b><br>"
                + " + ".join(f"{f(FCF4[t], 2)}/{g(1 + rU4)}<sup>{t}</sup>" for t in yrs)
                + "<br>= " + " + ".join(f(pv4[t]) for t in yrs).replace("+ −", "− ")
                + f" = <b>{f(NPVline4)}</b></p>"
                "<p><b>Step 2. The warehouse is not free.</b> Taking the project means giving up the "
                f"lease. After tax the rent is {g(rent4)} × {g(1 - tau4)} = {g(rent_at4)} a year, "
                f"discounted at {pc(r_lease4)}:<br>PV = {g(rent_at4)} × [1 − {g(1 + r_lease4)}"
                f"<sup>−4</sup>]/{g(r_lease4)} = {g(rent_at4)} × {fd(ann4, 5)} = <b>{f(PVlease4)}</b></p>"
                f"<p><b>NPV = {f(NPVline4)} − {f(PVlease4)} = {f(NPV4)}</b> &gt; 0: Bergfrukt should "
                "go ahead.</p>"
            ),
            "criteria": [
                f"Discounts the FCF at {pc(rU4)}: {f(NPVline4)}.",
                f"Subtracts the opportunity cost of the warehouse: after-tax rent {g(rent_at4)} at "
                f"{pc(r_lease4)}, PV {f(PVlease4)}. Treating the warehouse as free gives "
                f"{f(feil_uten_leie)} and is the error.",
                f"NPV = {f(NPV4)}. Using pre-tax rent ({f(feil_leie_forskatt)}) or {pc(rU4)} on the "
                f"rent ({f(feil_leie_rU)}) loses a point.",
                f"Follow-on errors are not penalised again: with NWC levels instead of changes the "
                f"NPV would be {f(feil_niva)}; with 7% it would be {f(feil_egen_r)}.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>For the rest of the exercise, another tenant offers an 18-month lease that pays "
                f"NOK {g(short4)} million before tax at t = 1.5. The line would then be delivered "
                "half a year later: every cash flow in b) comes six months later. What is the NPV of "
                "this plan today, measured as in c)? Is it better than the plan in c) and by how "
                "much?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The line, half a year later.</b> Every cash flow moves from t to "
                "t + 0.5, so its value today is the value from c) discounted for another half "
                f"year:<br>{f(NPVline4)}/{g(1 + rU4)}<sup>0.5</sup> = {f(NPVline4)}/"
                f"{fd((1 + rU4) ** 0.5, 6)} = <b>{f(NPVline_d4)}</b></p>"
                f"<p><b>Step 2. The short lease.</b> After tax {g(short4)} × {g(1 - tau4)} = "
                f"{g(short_at4)}, received in 18 months:<br>{g(short_at4)}/{g(1 + r_lease4)}"
                f"<sup>1.5</sup> = {g(short_at4)}/{fd((1 + r_lease4) ** 1.5, 6)} = <b>{f(PVshort4)}</b></p>"
                f"<p><b>Step 3. Against the four-year lease</b> (still the alternative):<br>"
                f"NPV = {ledd([NPVline_d4, PVshort4, -PVlease4])} = <b>{f(NPV_d4)}</b></p>"
                f"<p><b>Decision.</b> {f(NPV_d4)} &gt; {f(NPV4)}: Bergfrukt should prefer the new "
                f"plan, by {f(NPV_d4 - NPV4)}. The delay costs the line {f(NPVline4)} − "
                f"{f(NPVline_d4)} = {f(kost_utsett4)}, while the short lease brings in {f(PVshort4)}: "
                f"{ledd([PVshort4, -kost_utsett4])} = {f(NPV_d4 - NPV4)}.</p>"
                "<p><b>Check (identity).</b> Discounting each FCF at t + 0.5 gives the same "
                f"{f(NPVline_d4)}.</p>"
            ),
            "criteria": [
                f"Delayed line: {f(NPVline4)}/{g(1 + rU4)}^0.5 = {f(NPVline_d4)}.",
                f"Short lease: {g(short_at4)}/{g(1 + r_lease4)}^1.5 = {f(PVshort4)}, after tax and at "
                f"{pc(r_lease4)}. Discounting one year instead of 1.5 gives {f(feil_short_1aar)}.",
                f"NPV = {f(NPV_d4)}, measured against the four-year lease as in c). A student whose "
                f"c) left out the lease gets {f(NPVline_d4 + PVshort4)} here: comparing it with "
                f"{f(NPVline4)} gives {f(NPVline_d4 + PVshort4 - NPVline4)} and full marks, while "
                f"comparing it with {f(NPV4)} ({f(NPVline_d4 + PVshort4 - NPV4)}) mixes the two bases "
                "and is wrong.",
                f"Decision: prefer the new plan, better by {f(NPV_d4 - NPV4)}: the short rent is "
                "worth more than the half year of delay costs the line.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>The CEO tells the board: «The line's cash inflows are worth more than it costs, "
                "so Bergfrukt, now worth NOK 900 million, will be worth more with it. And the oat "
                f"drinks bring NOK {g(sum(rev4.values()))} million of new revenue.» What is wrong "
                "with this reasoning and what should the board decide on? (3-4 sentences.)</p>"
            ),
            "solution": (
                "<p><b>Model answer (4 sentences).</b> The CEO's comparison of the inflows with the "
                f"cost of the line is the NPV of the line alone ({f(NPVline4)}): it leaves out the "
                f"lease Bergfrukt gives up by using the warehouse, worth {f(PVlease4)}. The board "
                "should decide on the NPV of the incremental cash flows including that opportunity "
                f"cost: {f(NPV4)} for the plan in c) and {f(NPV_d4)} for the 18-month plan. The "
                "CEO's conclusion to go ahead therefore holds for the wrong reason; the board should "
                f"choose the plan with the highest NPV, the 18-month plan ({f(NPV_d4 - NPV4)} better). "
                f"The {g(sum(rev4.values()))} is neither new nor cash: part of it is taken from "
                f"Bergfrukt's own juices ({g(kann4)} of margin a year) and revenue is not free cash "
                "flow before costs, taxes, investment and working capital.</p>"
                "<p><b>Also accepted (a minor point).</b> The firm's value of 900 adds nothing to the "
                "decision: the project changes it by its NPV.</p>"
            ),
            "criteria": [
                f"1 point: the CEO's figure is the NPV of the line alone ({f(NPVline4)}); it leaves "
                "out the opportunity cost of the warehouse, so the conclusion holds for the wrong "
                "reason.",
                "1 point: the decision rule is the NPV of the incremental cash flows including the "
                f"warehouse; the board should choose the plan with the highest NPV (the 18-month "
                f"plan, {f(NPV_d4 - NPV4)} better).",
                "1 point: revenue is not all new (cannibalised juice margin) and is not cash flow.",
                "Saying that the firm's value of 900 is irrelevant is correct but minor; it does "
                "not replace one of the three points.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Real Options", "points": 20, "topic": "Real options: staged financing",
    "chapters": [1, 25],
    "body": (
        "<p>Lysne Vaksine AS can develop a cod vaccine in two stages. Lab trials cost NOK "
        f"{g(s1)} million today and succeed with probability {pc(p1)}, known at t = 1. Field "
        f"trials then cost NOK {g(s2)} million at t = 1 and succeed with probability {pc(p2)}, "
        f"known at t = 2. If both succeed, the vaccine is worth NOK {g(V5)} million at t = 2; "
        "otherwise nothing. The risks are not related to the market; "
        f"r<sub>f</sub> = {pc(r5)}.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                f"<p>A developer offers to run both stages for a fixed price of NOK {g(A5)} million "
                "paid today. What is the NPV of this all-at-once contract?</p>"
            ),
            "solution": (
                f"<p>Both stages succeed with probability {g(p1)} × {g(p2)} = {g(pp5)}. The risk is "
                f"not systematic, so the expected value is discounted at {pc(r5)}:<br>"
                f"NPV = −{g(A5)} + {g(pp5)} × {g(V5)}/{g(1 + r5)}<sup>2</sup> = −{g(A5)} + "
                f"{g(pp5 * V5)}/{g((1 + r5) ** 2)} = −{g(A5)} + {f(PVpay5)} = <b>{f(NPV_A5)}</b></p>"
                "<p>Negative: committing to both stages today destroys value.</p>"
            ),
            "criteria": [
                f"Overall probability {g(pp5)} and two years of discounting at {pc(r5)}.",
                f"NPV = {f(NPV_A5)}.",
                "Discounting at r_f is right because the risk is not related to the market.",
            ],
        },
        {
            "label": "b", "points": 5,
            "body": (
                "<p>Instead, Lysne can pay for each stage itself and decide at t = 1 whether to run "
                "the field trials. What is the NPV of staged financing?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The decision at t = 1.</b> If the lab trials fail, the vaccine is "
                f"worthless: Lysne stops and pays nothing more. If they succeed, the value at t = 1 of "
                f"continuing is<br>−{g(s2)} + {g(p2)} × {g(V5)}/{g(1 + r5)} = −{g(s2)} + "
                f"{f(p2 * V5 / (1 + r5))} = <b>{f(cont1)}</b> &gt; 0, so Lysne continues.</p>"
                f"<p><b>Step 2. Today.</b><br>NPV = −{g(s1)} + {g(p1)} × {f(cont1)}/{g(1 + r5)} = "
                f"−{g(s1)} + {f(p1 * cont1 / (1 + r5))} = <b>{f(NPV_S5)}</b></p>"
            ),
            "criteria": [
                f"The field trials are paid only after a successful lab trial ({g(p1)}), at t = 1.",
                f"Value at t = 1 after success: {f(cont1)} > 0, so continue; after failure: stop.",
                f"NPV = {f(NPV_S5)}. Paying {g(s2)} in both states gives {f(feil_commit)} and "
                "misses the point of staging.",
                f"Discounts the t = 1 value one year and the payoff two years. Ignoring discounting "
                f"gives {f(feil_udiskontert)}.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>How much more is staged financing worth than the contract in a)? What is the "
                "highest price of the all-at-once contract at which Lysne would choose it?</p>"
            ),
            "solution": (
                f"<p><b>Value of staging against the contract</b> = {f(NPV_S5)} − ({f(NPV_A5)}) = "
                f"<b>{f(verdi_trinn5)}</b>"
                "</p>"
                "<p><b>Where it comes from (decomposition, an identity).</b> Staging saves the "
                f"field-trial money when the lab trials fail: {g(1 - p1)} × {g(s2)}/{g(1 + r5)} = "
                f"{f(spart5)}. Against that, buying the stages separately costs more: "
                f"{g(s1)} + {g(s2)}/{g(1 + r5)} − {g(A5)} = {f(ekstra5)}. "
                f"{ledd([spart5, -ekstra5])} = {f(verdi_trinn5)} ✓. Staging is an option to "
                "abandon: Lysne buys the right to stop after the lab trials.</p>"
                "<p><b>Highest price.</b> The contract must give at least the NPV of staging:<br>"
                f"−P + {f(PVpay5)} ≥ {f(NPV_S5)} ⇒ P ≤ {f(PVpay5)} − {f(NPV_S5)} = "
                f"<b>NOK {f(Pmax5)} million</b></p>"
                f"<p>Equivalently {g(A5)} − {f(verdi_trinn5)} = {f(Pmax5)}. Note the comparison is "
                "with staging, not with zero: at any price above it the contract has a lower NPV "
                "than the alternative Lysne actually has.</p>"
            ),
            "criteria": [
                f"Value of staging against the contract = {f(NPV_S5)} − ({f(NPV_A5)}) = "
                f"{f(verdi_trinn5)}. Also accepted: {f(spart5)} against committing to both stages at "
                "their own prices, if the answer says that this is the comparison.",
                f"Highest price = {f(PVpay5)} − {f(NPV_S5)} = {f(Pmax5)}. Comparing with NPV = 0 "
                f"(price {f(PVpay5)}) is the error: the benchmark is staging.",
                f"Explains the source: the expected field-trial cost avoided ({f(spart5)}) less the "
                f"extra cost of buying separately ({f(ekstra5)}). Naming it an abandonment option "
                "earns credit.",
                "Show the calculation.",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": (
                f"<p>Suppose instead the lab trials succeed with probability {pc(q1)} and the field "
                f"trials then with {pc(q2)} (same costs, same overall chance). What is the NPV of "
                "staged financing now? Explain the change (1-2 sentences).</p>"
            ),
            "solution": (
                f"<p>After a successful lab trial: −{g(s2)} + {g(q2)} × {g(V5)}/{g(1 + r5)} = "
                f"{f(cont1_d)} &gt; 0, so Lysne continues.<br>NPV = −{g(s1)} + {g(q1)} × "
                f"{f(cont1_d)}/{g(1 + r5)} = <b>{f(NPV_Sd5)}</b>, up by {ledd([NPV_Sd5, -NPV_S5])} = "
                f"{f(NPV_Sd5 - NPV_S5)}.</p>"
                "<p><b>Why.</b> The first stage is now more informative: it weeds out more of the "
                f"failures before the expensive field trials, which are paid with probability "
                f"{pc(q1)} instead of {pc(p1)}. The value of staging rises when the early stages "
                "resolve more of the uncertainty.</p>"
                "<p><b>Check (decomposition; it only catches arithmetic slips).</b> The chance of "
                "the payoff is unchanged, so the whole change must be the expected field-trial cost "
                f"saved: ({g(p1)} − {g(q1)}) × "
                f"{g(s2)}/{g(1 + r5)} = {f((p1 - q1) * s2 / (1 + r5))} ✓.</p>"
            ),
            "criteria": [
                f"NPV = {f(NPV_Sd5)}.",
                "Explains: a more informative first stage stops more failures before the "
                "expensive stage, so the expected stage-2 spending falls.",
                f"(bonus) The rise of {f(NPV_Sd5 - NPV_S5)} equals ({g(p1)} − {g(q1)}) × {g(s2)}/"
                f"{g(1 + r5)}.",
            ],
        },
        {
            "label": "e", "points": 5,
            "body": (
                f"<p>Return to the original probabilities. The developer adds a clause: Lysne may "
                f"cancel the all-at-once contract at t = 1 and get NOK {g(R5)} million back. Which "
                "financing should Lysne choose? How does the clause change the value of committing "
                "early? (2-3 sentences.)</p>"
            ),
            "solution": (
                f"<p><b>Step 1. When to cancel.</b> After a failed lab trial, cancel ({g(R5)} &gt; 0). "
                f"After a successful one, continuing is worth {f(p2 * V5 / (1 + r5))} at t = 1, more "
                f"than {g(R5)}: keep going.</p>"
                f"<p><b>Step 2. NPV.</b><br>−{g(A5)} + {g(1 - p1)} × {g(R5)}/{g(1 + r5)} + "
                f"{f(PVpay5)} = {ledd([-A5, (1 - p1) * R5 / (1 + r5), PVpay5])} = "
                f"<b>{f(NPV_R5)}</b> &gt; {f(NPV_S5)}: <b>choose the contract with the clause.</b></p>"
                "<p><b>Explanation (2 sentences).</b> The clause makes the commitment reversible: "
                f"if the lab trials fail Lysne gets most of the field-trial money back, which is "
                "the same flexibility staging gives, at a lower price. When an investment "
                "can be reversed, the value of waiting or staging falls and committing early "
                f"becomes attractive (the clause beats staging for any refund above {f(Rkrit5)}).</p>"
            ),
            "criteria": [
                f"Cancels only after a failed lab trial ({f(p2 * V5 / (1 + r5))} &gt; {g(R5)} after "
                f"success). Cancelling in both states gives {f(feil_R_alltid)}.".replace("&gt;", ">"),
                f"NPV = {f(NPV_R5)}, compared with staging ({f(NPV_S5)}): choose the clause.",
                "Explains: reversibility gives the abandonment value without staging, so the value "
                "of waiting or staging falls and early commitment becomes optimal.",
                f"(bonus) The break-even refund is {f(Rkrit5)}.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
st_rows = "".join(
    tr(f"{i + 1}", pc(pr6[i]), g(VN6[i]), g(VF6[i])) for i in range(3))


def kravtab(navn_v, v, F, d, e):
    return "".join(tr(f"{i + 1}", g(v[i]), g(d[i]), g(e[i])) for i in range(3))


ex6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions",
    "chapters": [6, 24, 26],
    "body": (
        "<p>Nordlaks ASA and Fjellkraft ASA have these asset values next year (NOK "
        "million):</p><table class=\"data\">"
        + tr("State", "Probability", "Nordlaks", "Fjellkraft", th=True) + st_rows + "</table>"
        f"<p>Nordlaks has zero-coupon debt with face value NOK {g(FN6)} million due next "
        f"year, Fjellkraft NOK {g(FF6)} million. Investors are risk neutral and the risk-free "
        "rate is 0%, so no discounting is needed. There are no taxes or default costs. The firms "
        "plan to merge without synergies; the merged firm takes over both loans, which rank "
        "equally.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What are the debt and the equity of each firm worth before the merger?</p>",
            "solution": (
                "<p>Debt gets min(V, F) and equity max(V − F, 0) in each state; with risk-neutral "
                "investors and a zero rate, each claim is worth its expected payoff.</p>"
                "<table class=\"data\">" + tr("State", "Nordlaks", "Debt", "Equity", th=True)
                + kravtab("N", VN6, FN6, dN, eN) + "</table>"
                f"<p>D<sub>N</sub> = {g(pr6[0])} × {g(dN[0])} + {g(pr6[1])} × {g(dN[1])} + "
                f"{g(pr6[2])} × {g(dN[2])} = <b>{f(DN)}</b>; "
                f"E<sub>N</sub> = {g(pr6[0])} × {g(eN[0])} + {g(pr6[1])} × {g(eN[1])} = "
                f"<b>{f(EN)}</b></p>"
                "<table class=\"data\">" + tr("State", "Fjellkraft", "Debt", "Equity", th=True)
                + kravtab("F", VF6, FF6, dF, eF) + "</table>"
                f"<p>D<sub>F</sub> = {g(pr6[0])} × {g(dF[0])} + {g(pr6[1])} × {g(dF[1])} + "
                f"{g(pr6[2])} × {g(dF[2])} = <b>{f(DF)}</b>; "
                f"E<sub>F</sub> = {g(pr6[1])} × {g(eF[1])} + {g(pr6[2])} × {g(eF[2])} = "
                f"<b>{f(EF)}</b></p>"
                f"<p>Nordlaks defaults in state 3, Fjellkraft in state 1. (D + E = V for each firm: "
                f"{f(VN)} and {f(VF)}; an identity without default costs.)</p>"
            ),
            "criteria": [
                "State-by-state payoffs: min(V, F) to debt, max(V − F, 0) to equity.",
                f"Nordlaks: D = {f(DN)}, E = {f(EN)}. Fjellkraft: D = {f(DF)}, E = {f(EF)}.",
                f"Setting the debt at face value ({g(FN6)} and {g(FF6)}) ignores the default state "
                "and is the error.",
            ],
        },
        {
            "label": "b", "points": 8,
            "body": (
                "<p>What are the merged firm's debt and equity worth? What is each loan worth after "
                "the merger? What is the yield to maturity on Nordlaks' loan before and after?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The merged firm.</b> Assets are added state by state and the face "
                f"value is {g(FN6)} + {g(FF6)} = {g(FM6)}.</p>"
                "<table class=\"data\">" + tr("State", "Assets", "Debt", "Equity", th=True)
                + kravtab("M", VM6, FM6, dM, eM) + "</table>"
                f"<p>D = {g(pr6[0])} × {g(dM[0])} + {g(pr6[1])} × {g(dM[1])} + {g(pr6[2])} × "
                f"{g(dM[2])} = <b>{f(DM)}</b><br>E = {g(pr6[0])} × {g(eM[0])} + "
                f"{g(pr6[1])} × {g(eM[1])} = <b>{f(EM)}</b></p>"
                f"<p>The merged firm defaults only in state 3 and then by just {g(FM6 - VM6[2])}: "
                "each firm's good state now covers the other's bad state.</p>"
                "<p><b>Step 2. Each loan.</b> The loans rank equally, so in state 3 the "
                f"{g(VM6[2])} is shared in proportion to face value: Nordlaks gets {g(FN6)}/{g(FM6)} "
                f"× {g(VM6[2])} = {f(dN_m[2])} and Fjellkraft {g(FF6)}/{g(FM6)} × {g(VM6[2])} = "
                f"{f(dF_m[2])}.<br>D<sub>N</sub> = {g(pr6[0])} × {g(FN6)} + {g(pr6[1])} × {g(FN6)} + "
                f"{g(pr6[2])} × {f(dN_m[2])} = <b>{f(DN_m)}</b><br>D<sub>F</sub> = "
                f"{g(pr6[0])} × {g(FF6)} + {g(pr6[1])} × {g(FF6)} + {g(pr6[2])} × {f(dF_m[2])} = "
                f"<b>{f(DF_m)}</b></p>"
                f"<p><b>Step 3. Nordlaks' yield.</b> Before: {g(FN6)}/{f(DN)} − 1 = "
                f"<b>{pc(ytmN_for)}</b>. After: {g(FN6)}/{f(DN_m)} − 1 = <b>{pc(ytmN_etter)}</b>. "
                "The loan is now backed by both firms' assets.</p>"
                f"<p><b>Checks (identities).</b> {f(DN_m)} + {f(DF_m)} = {f(DN_m + DF_m)} = D ✓. "
                f"V = {f(DM)} + {f(EM)} = {f(VM)} = {f(VN)} + {f(VF)} ✓: no value is created.</p>"
            ),
            "criteria": [
                f"Merged payoffs: face {g(FM6)}; debt {g(dM[0])}, {g(dM[1])}, {g(dM[2])}; equity "
                f"{g(eM[0])}, {g(eM[1])}, 0.",
                f"D = {f(DM)} and E = {f(EM)}. Treating the merged debt as risk-free "
                f"({f(feil_risikofri)}) is the error: state 3 still falls short.",
                f"Each loan: pro rata in state 3 ({f(dN_m[2])} and {f(dF_m[2])}), so D_N = "
                f"{f(DN_m)} and D_F = {f(DF_m)}; they sum to D.",
                f"Nordlaks' YTM: {pc(ytmN_for)} before and {pc(ytmN_etter)} after.",
                "This is the construction part: show the state table for the merged firm and the "
                "split in state 3.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": (
                "<p>Who wins and who loses from the merger and by how much? Is diversification a "
                "good motive for the merger from the shareholders' point of view? "
                "(2-3 sentences.)</p>"
            ),
            "solution": (
                "<table class=\"data\">" + tr("Group", "Before", "After", "Change", th=True)
                + tr("Nordlaks' creditors", f(DN), f(DN_m), "+" + f(gN))
                + tr("Fjellkraft's creditors", f(DF), f(DF_m), "+" + f(gF))
                + tr("Shareholders (both firms)", f(EN + EF), f(EM), f(gE))
                + tr("<b>Total</b>", f(VN + VF), f(VM), f(gN + gF + gE)) + "</table>"
                f"<p><b>Checks.</b> {f(gN)} + {f(gF)} − {f(-gE)} = 0: the merger only moves value (an "
                "identity once V is unchanged). A second route, a decomposition that only catches "
                "arithmetic slips: the creditors' gain is the fall in the expected shortfall on the "
                "debt "
                "(what the creditors are promised but do not get): "
                f"{g(pr6[2])} × {g(FN6 - VN6[2])} + {g(pr6[0])} × {g(FF6 - VF6[0])} = {f(under_for)} "
                f"before and {g(pr6[2])} × {g(FM6 - VM6[2])} = {f(under_etter)} after, a fall of "
                f"{f(under_for - under_etter)} ✓.</p>"
                "<p><b>Model answer (3 sentences).</b> The creditors win and the shareholders lose "
                f"{f(-gE)}: the combined firm defaults less often because each firm's assets now back "
                "the other's debt (coinsurance), so value moves from equity to debt although nothing "
                "is created. Diversification is not a good motive for the shareholders: they can "
                "diversify themselves by holding both shares at almost no cost, while the merger hands "
                "part of their equity to the creditors. It can only help if lower risk of default "
                "saves real costs of financial distress or lets the firm borrow more for tax "
                "shields, or if the shareholders take the value back by raising new debt after the "
                "merger.</p>"
                f"<p><b>Bonus (not required).</b> In a share swap at pre-merger values, Nordlaks' "
                f"shareholders would get {f(wN)} of the merged equity and lose {f(-gEN)}; "
                f"Fjellkraft's would lose {f(-gEF)}.</p>"
            ),
            "criteria": [
                f"Creditors win: Nordlaks' +{f(gN)}, Fjellkraft's +{f(gF)}; shareholders lose {f(-gE)}.",
                "Gains and losses sum to zero: no synergies, so the merger only transfers value.",
                "Names the mechanism: coinsurance; equity is a call on the assets and is worth less "
                "when the combined assets are less risky.",
                "Diversification is not a valid motive for shareholders: they can diversify "
                "themselves. Exceptions with a mechanism (lower distress costs, more debt capacity, "
                "re-levering after the merger) earn credit.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                f"<p>For the rest of the exercise: Torvik ASA (net income NOK {g(NI_T)} million, "
                f"{g(N_T)} million shares, price NOK {g(P_T)}) buys Lunde ASA (net income NOK "
                f"{g(NI_L)} million, {g(N_L)} million shares, price NOK {g(P_L)}) in a share swap at "
                "Lunde's market price, without synergies. What happens to Torvik's EPS? Is value "
                "created for Torvik's shareholders? Explain briefly.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Shares issued.</b> Lunde is worth {g(N_L)} × {g(P_L)} = {g(V_L)}; at "
                f"NOK {g(P_T)} per Torvik share that is {g(V_L)}/{g(P_T)} = {g(n_ny)} million new "
                "shares.</p>"
                f"<p><b>Step 2. EPS.</b> Before: {g(NI_T)}/{g(N_T)} = {g(EPS_T)}. After: "
                f"({g(NI_T)} + {g(NI_L)})/({g(N_T)} + {g(n_ny)}) = {g(NI_T + NI_L)}/{g(N_T + n_ny)} = "
                f"<b>{f(EPS_ny)}</b>, up {pc(eps_vekst)}.</p>"
                f"<p><b>Step 3. Value.</b> With no synergies the merged firm is worth "
                f"{g(N_T * P_T)} + {g(V_L)} = {g(N_T * P_T + V_L)}, so the share price is "
                f"{g(N_T * P_T + V_L)}/{g(N_T + n_ny)} = <b>NOK {g(P_ny)}</b>, unchanged. "
                "<b>No value is created.</b></p>"
                f"<p><b>Why EPS rises anyway.</b> Torvik (P/E {g(PE_T)}) buys earnings with a low "
                f"P/E ({g(PE_L)}). The combined firm's P/E falls to {f(PE_ny)}: its earnings are a mix "
                "of Torvik's and Lunde's and are valued accordingly. Higher EPS from buying low-P/E "
                f"earnings is an accounting effect, not value (the EPS fallacy); a market that put "
                f"Torvik's old P/E on the new EPS would pay {f(feil_PE15)}, which is the illusion.</p>"
            ),
            "criteria": [
                f"New shares {g(V_L)}/{g(P_T)} = {g(n_ny)} million; EPS rises from {g(EPS_T)} to "
                f"{f(EPS_ny)}.",
                f"Share price unchanged at {g(P_ny)}: no synergies, so no value created.",
                f"Explains: earnings bought at a low P/E raise EPS, but the combined P/E falls to "
                f"{f(PE_ny)}; naming the EPS fallacy or bootstrapping earns credit.",
            ],
        },
    ],
}

SETT = {
    "id": "prove8",
    "kind": "mock",
    "label": "Mock exam 8",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Mock exam 8, «capital budgeting and bankruptcy». Written for this app in Kurbatov's "
        "format (H2024, H2025); it is not an official exam and no official solution key exists. "
        "It follows the second round of the 2026 prediction: IPO pricing and the firm's objective "
        "as the two verbal exercises, then a recapitalisation when default is costly, a new "
        "product line that needs a warehouse the firm already owns, a development project that "
        "can be financed in stages and a merger of two firms that both have debt. New firms and "
        "numbers throughout."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations that end with a short verbal "
        "question.",
        "The formula sheet is handed out. Show every calculation and carry 4 decimals. An error "
        "carried forward is not penalised again in later parts.",
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
RYTME = {3: [3, 3, 4, 4, 4], 4: [3, 5, 3, 4, 3], 5: [3, 5, 4, 3, 5], 6: [3, 8, 5, 4]}
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
    for m in re.finditer(r"(?<![\d.<>^])(?<!× )(?<!\+ )(?<!− )(\d+\.\d+)/(\d+\.\d+) = (?:<b>)?(\d+\.\d+)", t):
        a_, b_, c_ = (float(x) for x in m.groups())
        des = len(m.group(3).split(".")[1])
        if abs(a_ / b_ - c_) > 0.6 * 10 ** -des:
            feil.append(f"vist divisjon stemmer ikke i {sti}: {m.group(0)} (gir {a_ / b_:.6f})")
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
    if t.count("<table") != t.count("</table>") or t.count("<ul>") != t.count("</ul>"):
        feil.append(f"ubalansert tabell/liste i {sti}")
# facts og note vises før start: ingen formler eller mekanismenavn som røper svar
for sti, t in alle_tekster({"note": SETT["note"], "facts": SETT["facts"]}):
    for ord_ in ("coinsurance", "opportunity", "sunk", "cannibal", "winner", "abandon",
                 "PV(TS)", "=", "fallacy", "reversib"):
        if ord_.lower() in t.lower():
            feil.append(f"røpende ord «{ord_}» i {sti}")


# ------------------------------------------------- oppgaveteksten som Markdown
def til_md(h):
    """Enkel HTML til Markdown for oppgaveteksten (p, b, i, br, sub, sup, ul, tabeller)."""
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
    s = s.replace("<ul>", "\n\n").replace("</ul>", "\n\n").replace("<li>", "- ").replace("</li>", "\n")
    s = s.replace("<br>", "  \n").replace("<p>", "").replace("</p>", "\n\n")
    s = s.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")
    assert not re.search(r"<[a-zA-Z/]", s), s
    return re.sub(r"\n{3,}", "\n\n", s).strip()


md = [f"# FIE402 Corporate Finance · {SETT['label']}", "",
      "180 minutes · 100 points · calculator and one bilingual dictionary · formula sheet "
      "handed out.", ""]
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
print(f"\nOrd i oppgaveteksten: {ord_sett} (md med overskrifter: {len(md_tekst.split())})")
if not 1000 <= ord_sett <= 1250:
    feil.append(f"oppgaveteksten er {ord_sett} ord (mål 1 000–1 250)")

if feil:
    print("\nFEIL, prove8.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
