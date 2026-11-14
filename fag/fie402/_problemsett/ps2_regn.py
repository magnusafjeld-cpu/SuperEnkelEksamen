"""Problem Set 2 i FIE402 (Security issuance and valuation): alle tall i fasiten.

Kjør:  python3 -I ps2_regn.py

Skriptet regner hvert tall som står i fasiten i fag/fie402/problemsett.js (id
"ps2") på nytt, uavhengig av kursets løsning, og sjekker konsistenskontrollene
med assert (WACC = APV, vektede betaer = beta_U, FTE = APV). Til slutt
sammenlignes det med tallene i kursets løsning (Problem Set 2 solution.docx og
regnearket PS2-E8.xlsx), og avvikene skrives ut.

Konvensjoner som i FIE402-manualen: beta_U vektet uten skatt, skatteskjoldet
diskontert med r_U ved konstant D/V, D_t = d·V_t, TS_t = tau·r_D·D_{t-1}.
"""

AVVIK = []


def avvik(hvor, kurs, eget, hvorfor):
    AVVIK.append((hvor, kurs, eget, hvorfor))


def near(a, b, tol=1e-6):
    return abs(a - b) <= tol


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"  {k:<28} {v:,.6f}" if isinstance(v, float) else f"  {k:<28} {v}")


# ------------------------------------------------------------------ oppgave 1
# Rothko. Verdi av eiendeler 0 eller 100 000, 50/50. 1000 aksjer. Ingen diskontering.
n = 1000
V_snitt = 0.5 * 0 + 0.5 * 100_000
P_a = V_snitt / n
# b) Alle investerer: markedet ser ingen informasjon, eiendelene er fortsatt 50 000.
#    Prosjektet gir 0, så de 10 000 brukes opp. Nye aksjonærer må få 10 000 i verdi.
andel_b = 10_000 / V_snitt
N_b = andel_b * n / (1 - andel_b)
P_b = V_snitt / (n + N_b)
assert near(N_b, 250) and near(P_b, 40)
assert near(N_b * P_b, 10_000)
# c) Conjecture C: investering = god tilstand, verdi 100 000.
andel_c = 10_000 / 100_000
N_c = andel_c * n / (1 - andel_c)
P_c = 100_000 / (n + N_c)
assert near(P_c, 90) and near(N_c * P_c, 10_000)
# d) Okhtor (dårlig tilstand) blir priset som god under C: samme tall.
#    Sann verdi etter emisjon er 0: de nye aksjonærene taper 10 000.
P_d_sann = 0 / (n + N_c)
vis("Oppgave 1", P_a=P_a, N_b=N_b, P_b=P_b, N_c=N_c, P_c=P_c, P_d_sann=P_d_sann)

# ------------------------------------------------------------------ oppgave 2
n0, n_ny, P_ipo, spread, P_1 = 10e6, 5e6, 20.0, 0.07, 50.0
proveny = n_ny * P_ipo * (1 - spread)
MV = (n0 + n_ny) * P_1
V_uten_kontanter = MV - proveny
P_fair = V_uten_kontanter / n0
n_fair = proveny / P_fair
kost = (P_fair - P_1) * n0
spread_kost = n_ny * P_ipo * spread
underprising = n_ny * (P_1 - P_ipo)
assert near(proveny, 93e6) and near(MV, 750e6) and near(P_fair, 65.7)
assert near(MV / (n0 + n_fair), P_fair)
assert near(kost, spread_kost + underprising)
vis("Oppgave 2", proveny=proveny, MV=MV, V_uten_kontanter=V_uten_kontanter, P_fair=P_fair,
    n_fair=n_fair, kost=kost, spread_kost=spread_kost, underprising=underprising)

# ------------------------------------------------------------------ oppgave 3 og 4
rE, E, EV, rD, tau = 0.10, 10.8, 14.4, 0.061, 0.35
D = EV - E
d = D / EV
wacc = E / EV * rE + d * rD * (1 - tau)
FCF = [-100, 50, 100, 70]
VL = [0.0] * 4
for t in (2, 1, 0):
    VL[t] = (FCF[t + 1] + VL[t + 1]) / (1 + wacc)
NPV = FCF[0] + VL[0]
Dcap = [d * v for v in VL]
vis("Oppgave 3", D=D, d=d, wacc=wacc, VL0=VL[0], VL1=VL[1], VL2=VL[2], NPV=NPV,
    D0=Dcap[0], D1=Dcap[1], D2=Dcap[2])

rU = E / EV * rE + d * rD
VU = sum(FCF[t] / (1 + rU) ** t for t in (1, 2, 3))
renter = [None] + [rD * Dcap[t - 1] for t in (1, 2, 3)]
TS = [None] + [tau * renter[t] for t in (1, 2, 3)]
PVTS = sum(TS[t] / (1 + rU) ** t for t in (1, 2, 3))
APV = VU + PVTS
assert near(APV, VL[0], 1e-9), (APV, VL[0])  # WACC = APV
# pre-tax WACC = r_U-kontroll
assert near(wacc, rU - d * tau * rD)
PVTS_kurs = sum(round(TS[t], 2) / (1 + rU) ** t for t in (1, 2, 3))
assert f"{PVTS_kurs:.2f}" == "1.85"
avvik("PS2 4(c)-(d)", "PV(TS) = 1.85, APV = 184.01 + 1.85 = 185.86",
      f"PV(TS) = {PVTS:.3f}, APV = {VU:.3f} + {PVTS:.3f} = {APV:.3f}",
      f"Kurset diskonterer skatteskjoldene avrundet til 0.99, 0.81 og 0.34 og får {PVTS_kurs:.3f}. "
      "Forskjellen er bare avrunding, og APV = WACC holder i begge.")
vis("Oppgave 4", rU=rU, VU=VU, rente1=renter[1], rente2=renter[2], rente3=renter[3],
    TS1=TS[1], TS2=TS[2], TS3=TS[3], PVTS=PVTS, APV=APV)

# ------------------------------------------------------------------ oppgave 5
FCF1, g, tau5, rU5, k, rD5 = 2.5, 0.04, 0.40, 0.10, 0.20, 0.05
VU5 = FCF1 / (rU5 - g)
VL5 = (1 + tau5 * k) * VU5
# kontroll: TS = tau·k·FCF, samme risiko som FCF -> PV(TS) = tau·k·VU
PVTS5 = tau5 * k * FCF1 / (rU5 - g)
assert near(VL5, VU5 + PVTS5)
renter5 = k * FCF1
D5 = renter5 / rD5
d5 = D5 / VL5
wacc5 = rU5 - d5 * tau5 * rD5
VL5w = FCF1 / (wacc5 - g)
assert near(VL5w, VL5, 1e-9)
vis("Oppgave 5", VU=VU5, VL=VL5, renter=renter5, D=D5, d=d5, wacc=wacc5, VL_wacc=VL5w)

# ------------------------------------------------------------------ oppgave 6
EBIT, g6, tau6, D6, rf, rm, bA = 2000.0, 0.03, 0.40, 5000.0, 0.05, 0.11, 1.11
FCF6 = EBIT * (1 - tau6)
rU6 = rf + bA * (rm - rf)
VU6 = FCF6 / (rU6 - g6)
renter6 = rf * D6
TS6 = tau6 * renter6
PVTS6 = TS6 / (rU6 - g6)
VL6 = VU6 + PVTS6
E6 = VL6 - D6
wacc6 = FCF6 / VL6 + g6
rE6 = (wacc6 - D6 / VL6 * rf * (1 - tau6)) * VL6 / E6
# kontroll mot MM II (skatteskjoldet har eiendelsrisiko): r_E = r_U + D/E (r_U − r_D)
assert near(rE6, rU6 + D6 / E6 * (rU6 - rf), 1e-12)
bE6 = (rE6 - rf) / (rm - rf)
assert near(E6 / VL6 * bE6 + D6 / VL6 * 0, bA, 1e-12)  # vektede betaer = beta_U
FCFE6 = (EBIT - renter6) * (1 - tau6) + g6 * D6
E6_fte = FCFE6 / (rE6 - g6)
assert near(E6_fte, E6, 1e-9)  # FTE = APV
vis("Oppgave 6", FCF=FCF6, rU=rU6, VU=VU6, renter=renter6, TS=TS6, PVTS=PVTS6, VL=VL6, E=E6,
    wacc=wacc6, rE=rE6, bE=bE6, sjekk_beta=E6 / VL6 * bE6, FCFE=FCFE6, E_fte=E6_fte)
# Kursets løsning runder V_L = 15 012 til 15 000 før (e) og får 11%, 15%, 1.66 og 10 000.
wacc6_kurs = FCF6 / 15000 + g6
rE6_kurs = (wacc6_kurs - 5000 / 15000 * rf * (1 - tau6)) * 15000 / 10000
assert near(wacc6_kurs, 0.11) and near(rE6_kurs, 0.15)
avvik("PS2 6(e)-(h)", "r_wacc = 11%, r_E = 15%, beta_E = 1.66, E(FTE) = 10 000",
      f"r_wacc = {wacc6:.4%}, r_E = {rE6:.4%}, beta_E = {bE6:.4f}, E(FTE) = {E6_fte:,.0f}",
      "Kurset runder V_L = 15 012 til 15 000 i (e) (beta_E = 10/6 = 1.67, skrevet 1.66). Da stemmer ikke FTE i (h) med (d) (10 000 mot 10 012), "
      "selv om løsningen sier at de er like. Uavrundet er de nøyaktig like.")

# ------------------------------------------------------------------ oppgave 7
tau7, rf7, mrp = 0.50, 0.04, 0.06
E_hm, D_hm, C_hm = 100 * 12, 400.0, 150.0 - 50.0
bE_hm, bD_hm = 1.25, 0.0
bA = E_hm / (E_hm + D_hm - C_hm) * bE_hm + (D_hm - C_hm) / (E_hm + D_hm - C_hm) * bD_hm
rA = rf7 + bA * mrp
assert near(bA, 1.0) and near(rA, 0.10)
g7 = 0.05
rev = [None, 110.0, 110 * 1.05, 110 * 1.05 ** 2]
opex = [None, 60.0, 60 * 1.05, 60 * 1.05 ** 2]
dep = [None, 10.0, 10 * 1.05, 10 * 1.05 ** 2]
capex = [None, 15.0, 15 * 1.05, 15 * 1.05 ** 2]
nwc = [50.0, 40.0, 40 * 1.05, 40 * 1.05 ** 2]
fcf7 = [None]
for t in (1, 2, 3):
    ebit = rev[t] - opex[t] - dep[t]
    fcf7.append(ebit * (1 - tau7) + dep[t] - capex[t] - (nwc[t] - nwc[t - 1]))
assert near(fcf7[3], fcf7[2] * 1.05)  # vekst på 5% fra år 2
TV2 = fcf7[2] * (1 + g7) / (rA - g7)
VU7 = fcf7[1] / (1 + rA) + (fcf7[2] + TV2) / (1 + rA) ** 2
PVTS_konst = tau7 * 250
PVTS_vekst = tau7 * 20 / (rA - g7)
VL_vekst = VU7 + PVTS_vekst
VL_konst = VU7 + PVTS_konst
E7 = VL_vekst - 150
E7_konst = VL_konst - 150
vis("Oppgave 7", bA=bA, rA=rA, FCF1=fcf7[1], FCF2=fcf7[2], FCF3=fcf7[3], TV2=TV2, VU=VU7,
    PVTS_konst=PVTS_konst, PVTS_vekst=PVTS_vekst, VL_vekst=VL_vekst, E=E7, VL_konst=VL_konst,
    E_konst=E7_konst)
avvik("PS2 7", "E = 472.5 − 150 = 322.7", f"E = {VL_vekst:.1f} − 150 = {E7:.1f}",
      "Skrivefeil i kursets løsning: V_L er 472.7, ikke 472.5. Svaret 322.7 er riktig.")

# ------------------------------------------------------------------ oppgave 8
# Gorgon kjøper Zola. Proforma 2009 fra oppgaven. Kursets regneark: PS2-E8.xlsx.
tau8, rf8, mrp8, ry_A, g8 = 0.40, 0.05, 0.06, 0.065, 0.03
rev09, cogs09, dep09 = 412.0, 309.0, 20.6
ppe08, ppe09 = 200.0, 206.0
# Operativ arbeidskapital: driftskontanter + varelager + kundefordringer − leverandørgjeld.
nwc08 = 50 + 60 + 40 - 40
nwc09 = 51.5 + 61.8 + 41.2 - 41.2
ebit09 = rev09 - cogs09 - dep09          # amortisering: ikke kontant og ikke fradragsberettiget
capex09 = ppe09 - ppe08 + dep09
dnwc = nwc09 - nwc08
FCF8 = ebit09 * (1 - tau8) + dep09 - capex09 - dnwc
# Betaer: begge er osteprodusenter. Kurset tar snittet av eiendelsbetaene.
bD_zola = (ry_A - rf8) / mrp8
E_z, D_z = 30 * 10, 15 + 135
bA_z = E_z / (E_z + D_z) * 1.65 + D_z / (E_z + D_z) * bD_zola
E_g, D_g, C_g = 32 * 30, 0.0, 425.0
bA_g = E_g / (E_g + D_g - C_g) * 1.2      # overskuddskassen har beta 0
bA8 = (bA_z + bA_g) / 2
rA8 = rf8 + bA8 * mrp8
VU8 = FCF8 / (rA8 - g8)
renter09 = 9.75 * (1 + g8)
TS8 = tau8 * renter09
PVTS8 = TS8 / (rA8 - g8)
VL8 = VU8 + PVTS8
E8 = VL8 - D_z
syn = [3.0, 4.8, 6.0]
TVsyn = syn[2] * (1 + g8) / (rA8 - g8)
PVsyn = syn[0] / (1 + rA8) + syn[1] / (1 + rA8) ** 2 + (syn[2] + TVsyn) / (1 + rA8) ** 3
pris = (E8 + PVsyn) / 10
vis("Oppgave 8", nwc08=nwc08, nwc09=nwc09, dnwc=dnwc, ebit=ebit09, capex=capex09, FCF=FCF8,
    bD_zola=bD_zola, bA_zola=bA_z, bA_gorgon=bA_g, bA_snitt=bA8, rA=rA8, VU=VU8, renter09=renter09,
    TS=TS8, PVTS=PVTS8, VL=VL8, E=E8, E_per_aksje=E8 / 10, TVsyn=TVsyn, PVsyn=PVsyn,
    syn_per_aksje=PVsyn / 10, maks_pris=pris)

# Kursets regneark, gjenskapt: rf = 5.2% og kortsiktig rentebærende gjeld trukket fra i NWC.
rf_x = 0.052
nwc08_x, nwc09_x = nwc08 - 15, nwc09 - 15 * 1.03
FCF_x = ebit09 * (1 - tau8) + dep09 - capex09 - (nwc09_x - nwc08_x)
rA_x = rf_x + bA8 * mrp8
VU_x = FCF_x / (rA_x - g8)
PVTS_x = TS8 / (rA_x - g8)
E_x = VU_x + PVTS_x - 150
TV_x = syn[2] * (1 + g8) / (rA_x - g8)
PVsyn_x = syn[0] / (1 + rA_x) + syn[1] / (1 + rA_x) ** 2 + (syn[2] + TV_x) / (1 + rA_x) ** 3
pris_x = (E_x + PVsyn_x) / 10
assert near(FCF_x, 40.59, 1e-9) and near(rA_x, 0.15209813084112148, 1e-12)
assert near(pris_x, 25.85798060151352, 1e-9)  # samme som PS2-E8.xlsx, celle B75
vis("Oppgave 8, kursets regneark gjenskapt", FCF=FCF_x, rA=rA_x, VU=VU_x, PVTS=PVTS_x, E=E_x,
    PVsyn=PVsyn_x, maks_pris=pris_x)

# Følsomhet: bare Zolas egen eiendelsbeta
rA_z = rf8 + bA_z * mrp8
VL_z = FCF8 / (rA_z - g8) + TS8 / (rA_z - g8)
TV_z = syn[2] * (1 + g8) / (rA_z - g8)
PVsyn_z = syn[0] / (1 + rA_z) + syn[1] / (1 + rA_z) ** 2 + (syn[2] + TV_z) / (1 + rA_z) ** 3
pris_z = (VL_z - 150 + PVsyn_z) / 10
vis("Oppgave 8, følsomhet: bare Zolas beta", rA=rA_z, VL=VL_z, E_per_aksje=(VL_z - 150) / 10,
    syn_per_aksje=PVsyn_z / 10, maks_pris=pris_z)

# Dekomponering av avviket: én feil om gangen.


def makspris(rf, fcf):
    r = rf + bA8 * mrp8
    tv = syn[2] * (1 + g8) / (r - g8)
    pv_syn = syn[0] / (1 + r) + syn[1] / (1 + r) ** 2 + (syn[2] + tv) / (1 + r) ** 3
    return (fcf / (r - g8) + TS8 / (r - g8) - D_z + pv_syn) / 10


bare_rf, bare_nwc, begge = makspris(rf_x, FCF8), makspris(rf8, FCF_x), makspris(rf_x, FCF_x)
assert near(begge, pris_x) and near(makspris(rf8, FCF8), pris)
# Oppgavens proformatabell: overskuddskasse 2009E = 34.1 = FCF − renter × (1 − tau).
kasse_eget, kasse_ark = FCF8 - (1 - tau8) * renter09, FCF_x - (1 - tau8) * renter09
assert f"{kasse_eget:.1f}" == "34.1" and f"{kasse_ark:.1f}" != "34.1"
vis("Oppgave 8, avviket dekomponert", bare_rf_5_2=bare_rf, bare_kortsiktig_gjeld_i_NWC=bare_nwc,
    begge=begge, overskuddskasse_eget=kasse_eget, overskuddskasse_ark=kasse_ark)
avvik("PS2 8", f"FCF 2009 = 40.59, r_A = 15.21%, maks pris = ${pris_x:.2f}",
      f"FCF 2009 = {FCF8:.2f}, r_A = {rA8:.2%}, maks pris = ${pris:.2f}",
      "Regnearket bruker 30-årsrenten 5.2% (oppgaven sier 5%, og gjeldsbetaen 0.25 forutsetter 5%) "
      "og trekker kortsiktig rentebærende gjeld fra i arbeidskapitalen (gjeld er finansiering, "
      "og de 150 trekkes fra igjen som gjeld). "
      f"Bare r_f: ${bare_rf:.2f}. Bare NWC: ${bare_nwc:.2f}. Begge: ${begge:.2f}. "
      f"Oppgavens tabell har overskuddskasse 2009E = 34.1 = {FCF8:.2f} − 0.6 × {renter09:.4f}, "
      "altså bygd på FCF 40.14.")

# ------------------------------------------------------------------ oppgave 9
FCF9, rU9, D9, tau9 = 2.0, 0.11, 12.0, 0.25
VU9 = FCF9 / rU9
PVTS9 = tau9 * D9
VL9 = VU9 + PVTS9
d9 = D9 / VL9
wacc9 = rU9 * (1 - d9 * tau9)          # permanent gjeld: r_wacc = r_U − d·tau·r_U
VL9w = FCF9 / wacc9
assert near(VL9w, VL9, 1e-9)
vis("Oppgave 9", VU=VU9, PVTS=PVTS9, VL=VL9, d=d9, wacc=wacc9, VL_wacc=VL9w)

# ------------------------------------------------------------------ tallene i fasiten
# Hvert tall slik det står i problemsett.js, avrundet som der. Feiler hvis fasiten
# og utregningen her skiller lag.
VIST = [
    ("1b N", N_b, 0, "250"), ("1b P", P_b, 0, "40"), ("1c N", N_c, 1, "111.1"), ("1c P", P_c, 0, "90"),
    ("2a netto", proveny / 1e6, 0, "93"), ("2c P", P_fair, 2, "65.70"), ("2d kost", kost / 1e6, 0, "157"),
    ("3a wacc %", 100 * wacc, 5, "8.49125"), ("3b V0", VL[0], 2, "185.86"), ("3b NPV", NPV, 2, "85.86"),
    ("3c D0", Dcap[0], 2, "46.47"), ("3c D1", Dcap[1], 2, "37.91"), ("3c D2", Dcap[2], 2, "16.13"),
    ("4a rU %", 100 * rU, 3, "9.025"), ("4b VU", VU, 3, "184.006"), ("4c PVTS", PVTS, 3, "1.857"), ("4c renter 3", renter[3], 4, "0.9840"),
    ("4d APV", APV, 3, "185.863"),
    ("5a VU", VU5, 2, "41.67"), ("5b VL", VL5, 2, "45.00"), ("5c D", D5, 0, "10"), ("5d d", d5, 4, "0.2222"),
    ("5d wacc %", 100 * wacc5, 3, "9.556"),
    ("6a VU", VU6, 0, "13857"), ("6c PVTS", PVTS6, 0, "1155"), ("6d VL", VL6, 0, "15012"), ("6d E", E6, 0, "10012"),
    ("6e wacc %", 100 * wacc6, 3, "10.994"), ("6f rE %", 100 * rE6, 3, "14.986"), ("6g bE", bE6, 3, "1.664"),
    ("6h E", E6_fte, 0, "10012"),
    ("7 VU", VU7, 2, "272.73"), ("7 VL", VL_vekst, 2, "472.73"), ("7 E", E7, 1, "322.7"), ("7 E konst", E7_konst, 1, "247.7"),
    ("8 FCF", FCF8, 2, "40.14"), ("8 bA", bA8, 4, "1.6683"), ("8 rU %", 100 * rA8, 4, "15.0098"), ("8 VU", VU8, 2, "334.23"),
    ("8 PVTS", PVTS8, 2, "33.45"), ("8 E/aksje", E8 / 10, 2, "21.77"), ("8 syn", PVsyn, 2, "44.01"),
    ("8 syn/aksje", PVsyn / 10, 2, "4.40"), ("8 makspris", pris, 2, "26.17"), ("8 bare Zola", pris_z, 2, "39.42"),
    ("8 kursets regneark", pris_x, 2, "25.86"), ("8 bare rf", bare_rf, 2, "25.49"),
    ("8 bare NWC", bare_nwc, 2, "26.54"), ("8 kasse 2009E", kasse_eget, 1, "34.1"),
    ("9 VL", VL9, 3, "21.182"), ("9 d", d9, 4, "0.5665"), ("9 wacc %", 100 * wacc9, 3, "9.442"),
]
for navn, x, d, vist in VIST:
    assert f"{x:.{d}f}" == vist, (navn, x, vist)
print(f"\n{len(VIST)} tall i fasiten stemmer med utregningen.")

# ------------------------------------------------------------------ avvik
print("\n\nAVVIK MOT KURSETS LØSNING")
for hvor, kurs, eget, hvorfor in AVVIK:
    print(f"\n{hvor}\n  kurset: {kurs}\n  eget:   {eget}\n  hvorfor: {hvorfor}")
