#!/usr/bin/env python3
"""Kontrollregning av regneeksemplene i 02-forelesninger-skatt.md.

Kjør: python3 docs/fie432-research/kontroll.py
Skriver én linje per eksempel. OK = tallet i dokumentet reproduseres,
AVVIK = lysbildets eget tall lar seg ikke reprodusere (forklaring i teksten).

Alle tall er hentet fra forelesningslysbildene i
`FIE432 Personlig Økonomi 31. aug/_tekst/`. Formler merket ⟨rekonstruert⟩ i
dokumentet var bilder i lysbildene.
"""

avvik = []


def sjekk(navn, regnet, fasit, tol=0.5, note=""):
    """Sammenlign regnet verdi med dokumentets/lysbildets tall."""
    ok = abs(regnet - fasit) <= tol
    if not ok:
        avvik.append(navn)
    print(f"{'OK   ' if ok else 'AVVIK'} {navn:<12} regnet={regnet:>14,.4f}  "
          f"oppgitt={fasit:>14,.4f} {note}")


def vis(navn, verdi, note=""):
    print(f"      {navn:<12} {verdi:>14,.4f} {note}")


nv = lambda cf, r, n: sum(cf / (1 + r) ** i for i in range(1, n + 1))

# ---------------------------------------------------------------- forelesning 1
print("\n--- Forelesning 1 ---")
sjekk("E1.1 Anine", 45e6 * 0.011, 495_000)
sjekk("E1.1 riktig", (4.5e6 * 0.80 - 1.7e6) * 0.01, 19_000)
sjekk("E1.4 rente", 100_000 * (1 - 0.22), 78_000)
sjekk("E1.4 aksje", 125_482 * (1 - 0.3784), 78_000, tol=1)
vis("E1.4 indiff.", 78_000 / (1 - 0.3784), "= 125 483")
sjekk("E1.5 dagens", 34_000 * sum(1 / 1.04 ** i for i in (1, 2, 3)), 94_353, tol=1)
sjekk("E1.5 Listhaug", 102_000 / 1.04, 98_077, tol=1)
sjekk("E1.5 diff", 102_000 / 1.04 - 34_000 * sum(1 / 1.04 ** i for i in (1, 2, 3)),
      3_724, tol=1)
vis("E1.5 alt.", 102_000 - (34_000 + 34_000 / 1.04 + 34_000 / 1.04 ** 2),
    "år 1 udiskontert = 3 873")
sjekk("F1 pkt 6", 0.25 * 3 - 0.75 * 1, 0.0, tol=1e-9, note="3/-1 gir null i forventning")

# ---------------------------------------------------------------- forelesning 2
print("\n--- Forelesning 2 ---")
sjekk("E2.1 nom", (98 - 100 + 5) / 100, 0.03, tol=1e-9)
sjekk("E2.1 real", 1.03 / 1.03 - 1, 0.0, tol=1e-9)
vis("E2.2 t=22%", 0.03 * 0.78, "nominell etter skatt 2,34 %")
vis("E2.2 real", 1.0234 / 1.03 - 1, "eksakt -0,64 %, approks -0,66 %")
vis("E2.2 t=37,84", 0.03 * 0.6216, "1,86 %")
vis("E2.2 real", 1.018648 / 1.03 - 1, "eksakt -1,10 %, approks -1,14 %")
sjekk("E2.4 evig", 1e6 / 0.04, 25e6)
vis("E2.4 v/7 %", 1e6 / 0.07, "14,3 mill.")
sjekk("Furutrær nom", (110 - 100 + 5) / 100, 0.15, tol=1e-9)
vis("Furutrær real", 1.15 / 1.03 - 1, "11,65 % ved 3 % inflasjon")
vis("Furutrær sup.", 1.15 / 1.03 - 1 - 0.02, "9,65 %")
sjekk("Milla nom", (3.9 - 4 + 0.2) / 4, 0.025, tol=1e-9)
sjekk("Milla real", 1.025 / 1.06 - 1, -0.033, tol=0.0005)

# ---------------------------------------------------------------- forelesning 3
print("\n--- Forelesning 3 ---")
m = 0.05 / 12
term = 3e6 * m / (1 - (1 + m) ** -240)
sjekk("E3.1 annuitet", term, 19_799, tol=1)
sjekk("E3.1 rente", 3e6 * 0.05 / 12, 12_500)
sjekk("E3.1 e/skatt", 3e6 * 0.05 / 12 * 0.78, 9_750)
sjekk("E3.1 stress", 3e6 * 0.08 / 12, 20_000)
sjekk("E3.1 stress e/s", 3e6 * 0.08 / 12 * 0.78, 15_600)

leie = 174_000 - 12_940 - 599 * 12 - 29_364 - 10_500 - 4_200
sjekk("E3.2 netto", leie, 109_808)
sjekk("E3.2 e/skatt", leie * 0.78, 85_650, tol=1)

r = 0.03
salg = 6.1e6 * 1.18
gev = salg - 6.1e6
sjekk("E3.3 salg", salg, 7_198_000)
sjekk("E3.3 gevinst", gev, 1_098_000)
sjekk("E3.3 gev.skatt", gev * 0.22, 241_560)
nv3 = -6.1e6 + nv(85_650, r, 3) + (salg - gev * 0.22) / 1.03 ** 3
sjekk("E3.3 NV", nv3, 508_399, tol=2)
sjekk("E3.3 EK-rent", nv3 / 6.1e6, 0.083, tol=0.0005)

nv4 = -6.1e6 + nv(87_000, r, 3) + salg / 1.03 ** 3
sjekk("E3.4 NV", nv4, 733_279, tol=2)
sjekk("E3.4 EK-rent", nv4 / 6.1e6, 0.120, tol=0.0005)

rent35 = 5e6 * 0.035 * 0.78
sjekk("E3.5 renter", rent35, 136_500)
nv5 = -1.1e6 + nv(87_000 - rent35, r, 3) + salg / 1.03 ** 3 - 5e6 / 1.03 ** 3
sjekk("E3.5 NV", nv5, 771_465, tol=2)
sjekk("E3.5 EK-rent", nv5 / 1.1e6, 0.701, tol=0.001)

rent6 = 5e6 * 0.06 * 0.78
sjekk("E3.6 renter", rent6, 234_000)
nv6 = -1.1e6 + nv(87_000 - rent6, r, 3) + salg / 1.03 ** 3 - 5e6 / 1.03 ** 3
sjekk("E3.6 NV", nv6, 495_675, tol=2, note="lysbildets eget tall")
sjekk("E3.6 EK-rent", nv6 / 1.1e6, 0.451, tol=0.001)

nv7 = -1.1e6 + nv(87_000 - rent35, r, 3) + 6.1e6 / 1.03 ** 3 - 5e6 / 1.03 ** 3
sjekk("E3.7 NV", nv7, -233_360, tol=2)
sjekk("E3.7 EK-rent", nv7 / 1.1e6, -0.212, tol=0.001)

nv8 = -6.1e6 + nv(87_000, r, 3) + 6.1e6 / 1.03 ** 3
sjekk("E3.8 NV", nv8, -271_547, tol=2, note="lysbildets eget tall")
sjekk("E3.8 EK-rent", nv8 / 6.1e6, -0.045, tol=0.001)

sstar = 5e6 + 1.03 ** 3 * (1.1e6 + nv(49_500, r, 3))
sjekk("E3.9 break-even", sstar, 6_355_000, tol=100)
sjekk("E3.9 prisstign.", (sstar - 6.1e6) / 6.1e6, 0.042, tol=0.0005)

nv10 = (salg / 1.03 ** 3 - 5e6 / 1.03 ** 3 - gev * 0.22 / 1.03 ** 3
        - nv(136_500 - 85_650, r, 3) - 1.1e6)
sjekk("E3.10 NV", nv10, 546_597, tol=15, note="regnearkets 46 523 skal være 46 535")
sjekk("E3.10 EK-rent", nv10 / 1.1e6, 0.497, tol=0.001)

sjekk("E3.11 m/fradr", 0.9 * 200_000 * 0.78 - 0.1 * 1e6 * 0.78, 62_400)
sjekk("E3.11 u/fradr", 0.9 * 200_000 * 0.78 - 0.1 * 1e6, 40_400)
sjekk("E3.11 forhold", 62_400 / 40_400, 1.545, tol=0.001)
sjekk("E3.12 R*", 0.2 * 1e6 / (0.8 * 0.78), 320_513, tol=1)
sjekk("E3.12 v/40 %", 0.8 * 400_000 * 0.78 - 0.2 * 1e6, 49_600)

nv13 = -6.1e6 + nv(87_000, 0.044, 3) + salg / 1.044 ** 3
sjekk("E3.13 NV", nv13, 465_337, tol=2)
sjekk("E3.13 EK-rent", nv13 / 6.1e6, 0.0763, tol=0.0005,
      note="lysbildene skriver 7,5 % og 7,6 %")

nv14 = -6.1e6 + nv(85_650 - 87_000, r, 3) + (salg - gev * 0.22) / 1.03 ** 3
sjekk("E3.14 NV", nv14, 262_309, tol=3)
sjekk("E3.15 dok.avg", 6.1e6 * 0.025, 152_500)
sjekk("E3.15 formue", 6.1e6 * 0.01, 61_000)

sjekk("Anita spm1", 240_000 * 0.78 / (0.08 * 0.78), 3_000_000,
      note="lysbildets fasit 2 925 000 lar seg IKKE reprodusere")
vis("Anita 2 925k", 187_200 / 0.064, "krever 6,4 % = 8 % x 0,80, ikke x 0,78")
sjekk("Anita spm3", 240_000 * 0.78 / (0.04 * 0.78), 6_000_000)

# -------------------------------------------------------------- forelesning 4-5
print("\n--- Forelesning 4-5 ---")
sjekk("E4.1 deling", 100 - 1000 * 0.06, 40)
sjekk("E4.2 skjerm.", (4.1 + 0.5) * 0.78, 3.59, tol=0.01)


def skjerming(kostpris, rader):
    """rader = [(rente, utbytte), ...]. Returnerer liste med (grunnlag, fradrag,
    skattepliktig, ubenyttet ved årsslutt)."""
    ub, ut = 0.0, []
    for rente, utbytte in rader:
        grunnlag = kostpris + ub
        fradrag = grunnlag * rente
        skattepl = max(0.0, utbytte - fradrag - ub)
        ny_ub = max(0.0, ub + fradrag - utbytte)
        ut.append((grunnlag, fradrag, skattepl, ny_ub))
        ub = ny_ub
    return ut


olsen = skjerming(1000, [(0.02, 25), (0.03, 0), (0.02, 10), (0.04, 90), (0.03, 0)])
fasit_olsen = [(1000, 20, 5, 0), (1000, 30, 0, 30), (1030, 20.6, 0, 40.6),
               (1040.6, 41.624, 7.776, 0), (1000, 30, 0, 30)]
for i, (rad, f) in enumerate(zip(olsen, fasit_olsen), start=2014):
    sjekk(f"E4.3 {i}", rad[2], f[2], tol=0.01,
          note=f"grunnlag {rad[0]:.1f} fradrag {rad[1]:.3f} ubenyttet {rad[3]:.1f}")
sjekk("E4.3 gevinst", 1100 - 1000 - 30, 70)
sjekk("E4.3 skatt", 70 * 1.72 * 0.22, 26.488, tol=0.01)
sjekk("E4.4 3 %-regel", 100 * 0.03 * 0.22, 0.66, tol=1e-9)

fskatt = (10e6 * 0.80 - 1.7e6) * 0.01
sjekk("E4.5 formue", fskatt, 63_000)
sjekk("E4.5 skjerm.", 10e6 * 0.036, 360_000)
ubytteskatt = (600_000 - 360_000) * 0.3784
sjekk("E4.5 utb.skatt", ubytteskatt, 90_816, tol=1)
sjekk("E4.5 igjen", 600_000 - fskatt - ubytteskatt, 446_184, tol=1)
sjekk("E4.5 eff.sats", (fskatt + ubytteskatt) / 600_000, 0.256, tol=0.0005,
      note="lysbildet skriver 25,5 % med talltransposisjonen 90 186")

for a, y_f in ((0.124, 2.20), (0.062, 1.84), (0.0, 1.48)):
    y = (0.474 + a - 0.22) / (0.78 * 0.22)
    sjekk(f"E4.7 a={a:.3f}", y, y_f, tol=0.01, note=f"eierskatt {y * 0.22:.3%}")
sjekk("E4.7 y=1,72", 0.22 + 0.78 * 0.3784, 0.515, tol=0.001)
vis("E4.7 implisitt a", 0.22 + 0.78 * 0.3784 - 0.474, "≈ 4,1 pp overveltet")
sjekk("E4.8 nominelt", 0.22 + 0.78 * 0.3784, 0.5152, tol=0.001)
sjekk("E4.8 AERT 14 %", 0.14 + 0.86 * 0.3784, 0.4654, tol=0.001)
sjekk("E4.9 full avskr", (300_000 - 100_000) * 0.22 / 300_000, 0.1467, tol=0.001,
      note="lysbildet skriver 14,6 % og 15,4 %")
sjekk("E4.9 saldo 30 %", (300_000 - 30_000) * 0.22 / 300_000, 0.198, tol=0.001)

V = 100 / 0.1222
sjekk("E4.10 verdi", V, 818, tol=0.5)
sjekk("E4.10 unot.f.v", V * 0.35, 286.3, tol=0.5)
fs_bors = V * 0.80 * 0.011
u_bors = fs_bors / (1 - 0.3784)
sjekk("E4.10 børs f.sk", fs_bors, 7.2, tol=0.05, note="krever 1,1 %-satsen")
sjekk("E4.10 børs utb", u_bors, 11.6, tol=0.05)
sjekk("E4.10 børs AERT", (13.1 + fs_bors + u_bors * 0.3784) / 100, 0.247, tol=0.001)
fs_un = V * 0.35 * 0.011
u_un = fs_un / (1 - 0.3784)
sjekk("E4.10 unot AERT", (13.1 + fs_un + u_un * 0.3784) / 100, 0.181, tol=0.001)
sjekk("E4.10 portef.", (24.7 + 2 * 18.1) / 3, 20.3, tol=0.05)

sindre = skjerming(100, [(0.02, 3), (0.03, 5), (0.05, 1), (0.01, 3)])
sjekk("E4.11 2018", sindre[0][2], 1, tol=0.01)
sjekk("E4.11 2019", sindre[1][2], 2, tol=0.01)
sjekk("E4.11 2020", sindre[2][2], 0, tol=0.01, note=f"ubenyttet {sindre[2][3]:.2f}")
sjekk("E4.11 2021", sindre[3][2], 0, tol=0.01, note=f"ubenyttet {sindre[3][3]:.2f}")
sjekk("E4.12 Leah", 1 / (1 - 0.378), 1.608, tol=0.001)
sjekk("E4.13 BS lån", 0.378 * (1 + 0.05 * 0.78), 0.3927, tol=0.0005)
sjekk("E4.13 BS spar", 0.378 * (1 + 0.036 * 0.78), 0.3886, tol=0.0005)

print("  oppgaver forelesning 4-5")
sjekk("F4 spm1 2023", 1250 * 0.35 * 0.011, 4.81, tol=0.01)
vis("F4 alt. m/rab", 1250 * 0.35 * 0.80 * 0.011, "3,85 hvis rabatten legges på toppen")
sjekk("F4 spm1 SU", 1250 * 0.0085, 10.63, tol=0.01)
sjekk("F4 spm2 2023", 4.8125 / (1 - 0.3784), 7.74, tol=0.01)
sjekk("F4 spm2 SU", 10.625 / (1 - 0.34), 16.10, tol=0.01)
sjekk("F4 spm3 2023", 7.742 * 0.3784, 2.93, tol=0.01)
sjekk("F4 spm3 SU", 16.098 * 0.34, 5.47, tol=0.01)
sjekk("F5 spm1", 150_000 * 0.22, 33_000)
sjekk("F5 spm2", 500_000 * 0.05, 25_000)
sjekk("F5 spm3", (117_000 - 25_000) * 1.6 * 0.25, 36_800)
sjekk("F5 spm4", 36_800 / 117_000, 0.315, tol=0.001)
sjekk("F5 spm5", (33_000 + 36_800) / 150_000, 0.465, tol=0.001)
sjekk("F5 spm6", 550_000 - 500_000 - 500_000 * 0.10, 0)

# ---------------------------------------------------------------- forelesning 9
print("\n--- Forelesning 9 (insidens) ---")
D, S = -10 / 0.6, 10 / 0.4
sjekk("E5.1 dp/dt", D / (S - D), -0.40, tol=0.005)
sjekk("E5.1 dP/dt", S / (S - D), 0.60, tol=0.005)
sjekk("E5.1 sum", S / (S - D) - D / (S - D), 1.0, tol=1e-9)
eD, eS = (-10 / 100) / (0.6 / 5), (-10 / 100) / (-0.4 / 5)
sjekk("E5.1 elast.", eS / (eS + abs(eD)), 0.60, tol=0.005,
      note=f"eD={eD:.3f} eS={eS:.3f}")
sjekk("E5.1 proveny", 90 * 1, 90)
sjekk("E5.1 dødvekt", 0.5 * 1 * 10, 5)
sjekk("E5.3 monopol", 0.5, 0.5, tol=1e-9, note="dp/dt = 1/2 ved lineære funksjoner")

# --------------------------------------------------------------- forelesning 10
print("\n--- Forelesning 10 (skatt og risiko) ---")
sjekk("E6.2 A e/skatt", 0.60 * 20_000, 12_000)
sjekk("E6.3 B m/fradr", 0.60 * 25_000, 15_000)
vis("E6.2 grense G", (25_000 - 12_000) / 0.40, "A velges når G > 32 500")
sjekk("E6.2 50/50", 0.6 * 0.5 * 100_000 - 0.5 * 50_000, 5_000)
for t in (0.0, 0.20, 0.40, 0.50):
    vis(f"E6.4 t={t:.2f}", 60_000 / (1 - t), f"faktor {1 / (1 - t):.4f}")
Y, rr, n, t = 100_000, 0.05, 10, 0.22
V1 = Y * (1 + rr * (1 - t)) ** n
V2 = Y * ((1 - t) * (1 + rr) ** n + t)
V3 = Y * (1 + rr) ** n
sjekk("E6.5 V1", V1, 146_607, tol=1)
sjekk("E6.5 V2", V2, 149_054, tol=1)
sjekk("E6.5 V3", V3, 162_889, tol=1)
assert V1 < V2 < V3
for nn in (1, 5, 20, 30):
    a = Y * (1 + rr * (1 - t)) ** nn
    b = Y * ((1 - t) * (1 + rr) ** nn + t)
    c = Y * (1 + rr) ** nn
    assert a <= b < c, nn
vis("E6.5 V3 40->22", Y / 0.60 * 1.05 ** 10 * 0.78, "211 756")
vis("E6.5 V3 22->40", Y / 0.78 * 1.05 ** 10 * 0.60, "125 300")
sjekk("E6.6 T", (0.08 - 0.06) / 0.08, 0.25, tol=1e-9)
sjekk("E6.6 t=30 %", 0.08 * 0.70, 0.056, tol=1e-9)
sjekk("E6.6 t=20 %", 0.08 * 0.80, 0.064, tol=1e-9)
rf, Er, sd, beta = 0.04, 0.10, 0.20, 1.2
sjekk("E6.7 Sharpe", (Er - rf) / sd, 0.30, tol=1e-9)
sjekk("E6.7 CE A=3", Er - 0.5 * 3 * sd ** 2, 0.04, tol=1e-9)
sjekk("E6.7 CE A=1", Er - 0.5 * 1 * sd ** 2, 0.08, tol=1e-9)
sjekk("E6.7 CAPM", rf + beta * 0.06, 0.112, tol=1e-9)
vis("E6.7 A*", 2 * (Er - rf) / sd ** 2, "vippepunkt før skatt")
rf_e, Er_e, sd_e = rf * 0.78, Er * 0.6216, sd * 0.6216
sjekk("E6.8 oblig.", rf_e, 0.0312, tol=1e-9)
sjekk("E6.8 aksje", Er_e, 0.06216, tol=1e-9)
sjekk("E6.8 Sharpe", (Er_e - rf_e) / sd_e, 0.249, tol=0.001)
vis("E6.8 CE A=3", Er_e - 0.5 * 3 * sd_e ** 2, "3,90 % > 3,12 % -> aksjen")
vis("E6.8 A*", 2 * (Er_e - rf_e) / sd_e ** 2, "vippepunkt etter skatt")
sjekk("Benedicte 1", 0.10 * 0.78, 0.078, tol=1e-9)
sjekk("Benedicte 2", (0.10 - 0.078) / 0.10, 0.22, tol=1e-9)
sjekk("Benedicte 3", 0.10 * (1 - 0.45), 0.055, tol=1e-9,
      note="fasiten skriver 6,5 % - skal være 5,5 %")

# --------------------------------------------------------------- forelesning 11
print("\n--- Forelesning 11 (skatteparadis) ---")
sjekk("E7.1 sels./innb", 900_000 / 31_000, 29.0, tol=0.1)
sjekk("E7.1 avg./BNP", 30_000 / 48_200, 0.622, tol=0.001)
sjekk("E7.2 møter/dag", 4_000 / 365, 11.0, tol=0.05)
sjekk("E7.3 gebyrsum", 4 + 8 + 4 + 6 + 17 + 8, 47)
sjekk("E7.3 importpris", 13 + 47, 60)

print("\n" + "=" * 72)
print(f"Avvik som IKKE går opp: {avvik if avvik else 'ingen'}")
