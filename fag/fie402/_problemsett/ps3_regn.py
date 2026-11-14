"""Problem Set 3 i FIE402 (Options): alle tall i fasiten.

Kjør:  python3 -I ps3_regn.py

Skriptet regner hvert tall som står i fasiten i fag/fie402/problemsett.js (id
"ps3") på nytt, uavhengig av kursets løsning, og sjekker kontrollene med assert
(replikering gir samme payoff i begge tilstander, put-call-paritet, risikonøytral
prising = replikering = CAPM-diskontering). Til slutt skrives avvikene mot
kursets løsning (Problem Set 3 solution.docx) ut.

Black-Scholes som i kurset (Berk-DeMarzo): PV(K) = K / (1 + r_f)^T, altså diskret
rente. Det er dette som gir kursets tall i oppgave 1, 3 og 5.
"""
from math import erf, exp, log, sqrt

AVVIK = []


def avvik(hvor, kurs, eget, hvorfor):
    AVVIK.append((hvor, kurs, eget, hvorfor))


def near(a, b, tol=1e-6):
    return abs(a - b) <= tol


def N(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def bs_call(S, K, sigma, r, T):
    pvk = K / (1 + r) ** T
    d1 = log(S / pvk) / (sigma * sqrt(T)) + sigma * sqrt(T) / 2
    d2 = d1 - sigma * sqrt(T)
    return S * N(d1) - pvk * N(d2), d1, d2, pvk


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"  {k:<26} {v:,.6f}" if isinstance(v, float) else f"  {k:<26} {v}")


# ------------------------------------------------------------------ oppgave 1
S0, u, dn, rf, K = 60.0, 1.25, 0.80, 0.10, 66.0
Su, Sd = S0 * u, S0 * dn
Pu, Pd = max(K - Su, 0), max(K - Sd, 0)
Delta = (Pu - Pd) / (Su - Sd)
B = (Pu - Delta * Su) / (1 + rf)
P1 = Delta * S0 + B
assert near(Delta * Sd + B * (1 + rf), Pd) and near(Delta * Su + B * (1 + rf), Pu)
# kontroll med risikonøytral sannsynlighet
rho = ((1 + rf) * S0 - Sd) / (Su - Sd)
assert near(P1, (rho * Pu + (1 - rho) * Pd) / (1 + rf))
C_bs, d1, d2, pvk = bs_call(S0, K, 0.22, rf, 1)
P_bs = C_bs - S0 + pvk          # put-call-paritet
vis("Oppgave 1", Su=Su, Sd=Sd, Pu=Pu, Pd=Pd, Delta=Delta, B=B, P_binomisk=P1, rho=rho,
    PVK=pvk, d1=d1, d2=d2, N_d1=N(d1), N_d2=N(d2), C_bs=C_bs, P_bs=P_bs)

# ------------------------------------------------------------------ oppgave 2
rf2, rm2, beta2, K2 = 0.105, 0.165, 0.75, 212.0
r_s = rf2 + beta2 * (rm2 - rf2)
S2 = (0.5 * 290 + 0.5 * 170) / (1 + r_s)
Cu, Cd = max(290 - K2, 0), max(170 - K2, 0)
D2 = (Cu - Cd) / (290 - 170)
B2 = (Cd - D2 * 170) / (1 + rf2)
C2 = D2 * S2 + B2
beta_c = D2 * S2 / C2 * beta2 + B2 / C2 * 0
r_c = rf2 + beta_c * (rm2 - rf2)
C2_capm = (0.5 * Cu + 0.5 * Cd) / (1 + r_c)
assert near(S2, 200) and near(D2, 0.65) and near(B2, -100) and near(C2, 30)
assert near(C2_capm, C2)
vis("Oppgave 2", r_s=r_s, S0=S2, Cu=Cu, Delta=D2, B=B2, C=C2, beta_c=beta_c, r_c=r_c, C_capm=C2_capm)

# ------------------------------------------------------------------ oppgave 3
grunn = dict(S=60.0, K=60.0, sigma=0.30, r=0.05, T=1.0)
endringer = {
    "a) utgangspunkt": {},
    "b) S = 61": dict(S=61.0),
    "c) sigma = 31%": dict(sigma=0.31),
    "d) r = 6%": dict(r=0.06),
    "e) én måned går": dict(T=11 / 12),
    "f) utbytte $1 nå": dict(S=59.0),
}
print("\nOppgave 3")
C3 = {}
for navn, e in endringer.items():
    p = dict(grunn, **e)
    c, a1, a2, pk = bs_call(p["S"], p["K"], p["sigma"], p["r"], p["T"])
    C3[navn] = c
    print(f"  {navn:<20} C = {c:.4f}  (d1 = {a1:.4f}, d2 = {a2:.4f}, N(d1) = {N(a1):.4f}, "
          f"N(d2) = {N(a2):.4f}, PV(K) = {pk:.4f})  endring = {c - C3['a) utgangspunkt']:+.4f}")
for navn, kurs in zip(endringer, (8.50, 9.14, 8.73, 8.78, 8.09, 7.89)):
    assert f"{C3[navn]:.2f}" == f"{kurs:.2f}", (navn, C3[navn], kurs)

# ------------------------------------------------------------------ oppgave 4
S4, up, ned, rf4, K4 = 20.0, 30.0, 18.0, 0.05, 25.0
ER = (0.5 * up + 0.5 * ned) / S4 - 1
rho4 = ((1 + rf4) * S4 - ned) / (up - ned)
C4 = (rho4 * max(up - K4, 0) + (1 - rho4) * max(ned - K4, 0)) / (1 + rf4)
ERc = (0.5 * max(up - K4, 0) + 0.5 * max(ned - K4, 0)) / C4 - 1
P4 = (rho4 * max(K4 - up, 0) + (1 - rho4) * max(K4 - ned, 0)) / (1 + rf4)
ERp = (0.5 * max(K4 - up, 0) + 0.5 * max(K4 - ned, 0)) / P4 - 1
assert near(C4 - P4, S4 - K4 / (1 + rf4))  # put-call-paritet
vis("Oppgave 4", ER=ER, rho=rho4, C=C4, ER_call=ERc, P=P4, ER_put=ERp)

# ------------------------------------------------------------------ oppgave 5
C5, a1, a2, pk5 = bs_call(120.0, 100.0, 0.40, 0.0638, 90 / 365)
P5 = C5 + pk5 - 120.0
vis("Oppgave 5", T=90 / 365, PVK=pk5, d1=a1, d2=a2, N_d1=N(a1), N_d2=N(a2), C=C5, P=P5)
C5_kurs = 120 * 0.863 - pk5 * 0.815
C5_4 = 120 * round(N(a1), 4) - round(pk5, 3) * round(N(a2), 4)
avvik("PS3 5(a)-(b)", "C = 23.29, P = 1.78",
      f"C = {C5:.2f} ({C5:.4f}), P = {P5:.2f}",
      f"Kurset runder N(d1) og N(d2) til 0.863 og 0.815 og får {C5_kurs:.2f}. Med fire desimaler i N "
      f"blir det {C5_4:.2f}. Fasiten bruker seks desimaler og viser {C5:.2f}.")

# ------------------------------------------------------------------ oppgave 6
n6, V6, rf6, T6 = 0.320, 135.1, 0.01, 1.5        # mrd. aksjer, mrd. $, 13. juli 2009 til jan. 2011
bid_ask = {300: (148.20, 150.10), 400: (85.10, 87.00)}
mid = {k: (b + a) / 2 for k, (b, a) in bid_ask.items()}
# a) 128 mrd. = 400 per aksje
E6 = mid[400] * n6
D6 = V6 - E6
y6 = (128 / D6) ** (1 / T6) - 1
# b) senior 96 mrd. = 300 per aksje, junior 32 mrd.
Dsen = V6 - mid[300] * n6
ysen = (96 / Dsen) ** (1 / T6) - 1
Djun = V6 - Dsen - E6
assert near(Djun, (mid[300] - mid[400]) * n6)
yjun = (32 / Djun) ** (1 / T6) - 1
# samlet gjeld må ha samme verdi som i (a)
assert near(Dsen + Djun, D6)
vis("Oppgave 6", C400=mid[400], C300=mid[300], E=E6, D=D6, y=y6, spread=y6 - rf6,
    D_senior=Dsen, y_senior=ysen, D_junior=Djun, y_junior=yjun)
ysen_kurs = (96 / 87.4) ** (1 / T6) - 1
yjun_kurs = (32 / 20.16) ** (1 / T6) - 1
avvik("PS3 6(a)", "kredittspread = 12.3% − 1% = 11.1%", f"{y6:.2%} − 1% = {y6 - rf6:.1%}",
      "Regnefeil i kursets løsning (12.3 − 1 = 11.3). Spreaden er ikke spurt om.")
avvik("PS3 6(b)", f"D_senior = 87.4, y_senior = 6.46%, D_junior = 20.16, y_junior = 36.1%",
      f"D_senior = {Dsen:.3f}, y_senior = {ysen:.2%}, D_junior = {Djun:.3f}, y_junior = {yjun:.1%}",
      f"Kurset runder seniorgjelden til 87.4 før den trekkes fra (gir {ysen_kurs:.2%} og "
      f"{yjun_kurs:.1%}). Uavrundet er junior = 320 mill. × (149.15 − 86.05) = {Djun:.3f} mrd. "
      "Tavlenotatene fra gjennomgangen (s3.pdf, s. 2) viser 87.37, 20.19 og 35.9%, som fasiten.")

# ------------------------------------------------------------------ oppgave 7
E7 = 25 * 20
D7 = 0.5 * E7
A7 = E7 + D7
F7 = D7 * 1.10 ** 5
vis("Oppgave 7", E=E7, D=D7, A=A7, F=F7)
avvik("PS3 7(a)", "strike = 250 × (1.1) × 5 = 402.6", f"strike = 250 × 1.1^5 = {F7:.1f}",
      "Skrivefeil i formelen (skal være opphøyd i 5). Tallet 402.6 er riktig.")
avvik("PS3 7(c)", "put med «$250 million face value»", f"pålydende og strike {F7:.1f} mill.",
      "250 er markedsverdien av gjelden i dag. Den risikofrie obligasjonen og putten må ha "
      "pålydende/strike lik gjeldens pålydende, 402.6.")

# ------------------------------------------------------------------ oppgave 8
NPV8 = -10 + (0.5 * 22 + 0.5 * 6) / 1.1
hoy, lav = -10 + 22 / 1.1, -10 + 6 / 1.1
NPV8b = -1.5 + (0.5 * max(hoy, 0) + 0.5 * max(lav, 0)) / 1.1
vis("Oppgave 8", NPV=NPV8, verdi_hoy_aar1=hoy, verdi_lav_aar1=lav, NPV_studie=NPV8b,
    maks_pris_studie=(0.5 * max(hoy, 0) + 0.5 * max(lav, 0)) / 1.1 - NPV8)

# ------------------------------------------------------------------ oppgave 9
r9, I9 = 0.10, 250.0


def camp(p):
    EV = 100 * p / 2 + 50 * (1 - p)
    nå = -I9 + EV / r9
    vent = (p / 2 * (-I9 + 100 / r9) + (1 - p) * (-I9 + 50 / r9)) / (1 + r9)
    return EV, nå, vent


EVa, NPVa, NPVb = camp(0.1)
EVc, NPVc0, NPVc = camp(0.3)
NPVd = -I9 + 0.15 * 100 / r9 + 0.7 * 50 / r9 + 0.15 * I9 / (1 + r9)
assert near(EVa, 50) and near(EVc, 50) and near(NPVa, 250) and near(NPVc0, 250)
vis("Oppgave 9", EV_cf=EVa, NPV_naa=NPVa, NPV_vent_p01=NPVb, NPV_vent_p03=NPVc,
    NPV_reversibel_naa=NPVd, verdi_reversering=0.15 * I9 / (1 + r9))

# ------------------------------------------------------------------ oppgave 10
S10, rf10 = 60.0, 0.10
v1 = 1 * (S10 - 36)
v2 = 2 * (S10 - 52)
Su10, Sd10 = S10 * 1.2, S10 * 0.8
ende = {s: (1 * (s - 36), 2 * (s - 52)) for s in (Su10, Sd10)}
beste = {s: max(v) for s, v in ende.items()}
rho10 = ((1 + rf10) * S10 - Sd10) / (Su10 - Sd10)
PV10 = (rho10 * beste[Su10] + (1 - rho10) * beste[Sd10]) / (1 + rf10)
# replikering: Delta fat olje og B i lån gir samme svar
Dl = (beste[Su10] - beste[Sd10]) / (Su10 - Sd10)
Bl = (beste[Sd10] - Dl * Sd10) / (1 + rf10)
assert near(Dl * S10 + Bl, PV10)
vis("Oppgave 10", metode1_i_dag=v1, metode2_i_dag=v2, Su=Su10, Sd=Sd10,
    opp_m1=ende[Su10][0], opp_m2=ende[Su10][1], ned_m1=ende[Sd10][0], ned_m2=ende[Sd10][1],
    rho=rho10, PV_vente=PV10, Delta=Dl, B=Bl, ventevrdi=PV10 - max(v1, v2))

# ------------------------------------------------------------------ tallene i fasiten
# Hvert tall slik det står i problemsett.js, avrundet som der.
VIST = [
    ("1e B", B, 2, "45.45"), ("1f P", P1, 2, "5.45"), ("1g P", P_bs, 2, "5.26"),
    ("2a S0", S2, 0, "200"), ("2d beta", beta_c, 2, "3.25"), ("2d rC %", 100 * r_c, 0, "30"),
    ("3a", C3["a) utgangspunkt"], 2, "8.50"), ("3b", C3["b) S = 61"], 2, "9.14"), ("3c", C3["c) sigma = 31%"], 2, "8.73"),
    ("3d", C3["d) r = 6%"], 2, "8.78"), ("3e", C3["e) én måned går"], 2, "8.09"), ("3f", C3["f) utbytte $1 nå"], 2, "7.89"),
    ("4b rho", rho4, 2, "0.25"), ("4c C", C4, 2, "1.19"), ("4d ER %", 100 * ERc, 0, "110"), ("4e P", P4, 2, "5.00"),
    ("4f ER %", 100 * ERp, 0, "-30"),
    ("5a PVK", pk5, 3, "98.487"), ("5a d1", a1, 4, "1.0940"), ("5a d2", a2, 4, "0.8954"),
    ("5a C", C5, 2, "23.33"), ("5a C (N med 4 des.)", 120 * round(N(a1), 4) - round(pk5, 3) * round(N(a2), 4), 2, "23.32"),
    ("5b P", P5, 2, "1.81"), ("3b endring", C3["b) S = 61"] - C3["a) utgangspunkt"], 2, "0.63"),
    ("6a D", D6, 2, "107.56"), ("6a y %", 100 * y6, 1, "12.3"), ("6a spread %", 100 * (y6 - rf6), 1, "11.3"),
    ("6b senior", Dsen, 3, "87.372"), ("6b junior", Djun, 3, "20.192"), ("6b y_jun %", 100 * yjun, 1, "35.9"),
    ("6b y_sen %", 100 * ysen, 2, "6.48"),
    ("7a F", F7, 1, "402.6"), ("8a NPV", NPV8, 2, "2.73"), ("8b NPV", NPV8b, 2, "3.05"),
    ("9b", NPVb, 1, "238.6"), ("9c", NPVc, 1, "261.4"), ("9d", NPVd, 1, "284.1"),
    ("10d rho", rho10, 2, "0.75"), ("10d PV", PV10, 0, "30"), ("10e opsjon", PV10 - max(v1, v2), 0, "6"),
]
for navn, x, d, vist in VIST:
    assert f"{x:.{d}f}" == vist, (navn, x, vist)
print(f"\n{len(VIST)} tall i fasiten stemmer med utregningen.")

# ------------------------------------------------------------------ avvik
print("\n\nAVVIK MOT KURSETS LØSNING")
for hvor, kurs, eget, hvorfor in AVVIK:
    print(f"\n{hvor}\n  kurset: {kurs}\n  eget:   {eget}\n  hvorfor: {hvorfor}")
