"""Prøveeksamen 6 i FIE402 («H2024-formen»): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove6_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove6). To teorioppgaver (M&A: hvem
vinner, og governance: stemmerådgivere), deretter to kapitalstrukturoppgaver (beta og
nedgiring med emisjon, brannsalg og risikoskifting), verdsetting med to tvillinger og
vekst (APV først, WACC baklengs) og en realopsjon (oljefelt med to metoder og ρ).

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker
konsistenskontrollene med assert: r_U fra beta = forventet EBIT/V, r_E fra beta = EPS/kurs,
kursen uendret ved emisjon i et MM-marked, WACC uendret før og etter, D + E = V tilstand for
tilstand, kreditorenes tap + eiernes gevinst = endringen i firmaverdi, r_E fra baklengs WACC =
r_E fra MM II og vektede betaer = beta_U (begge feiler hvis skatteskjoldet diskonteres med
r_D), og at replikeringsporteføljen gir samme verdi som ρ i begge tilstander.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria) og poengene (12/12/18/18/20/20, deloppgavene summerer). Er alt rent, skrives
prove6.json og prove6_oppgave.md (bare oppgaveteksten) i samme mappe. Er noe galt, skrives
ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (beta_U vektet uten skatt,
skatteskjoldet diskontert med r_U ved konstant D/E, diskret diskontering, ingen BS-regning)
følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove6.json")
UT_MD = os.path.join(HER, "prove6_oppgave.md")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    """Kortest eksakte form med høyst 3 desimaler, ellers 4 desimaler."""
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


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


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"   {k:28} {v}")


# ============================================ Oppgave 3: beta og nedgiring (MM)
N0, P0, D0 = 60.0, 50.0, 1500.0       # millioner aksjer, NOK, NOK mill.
rf3, rm3, bE0 = 0.04, 0.09, 1.8
EBIT3 = 450.0                          # forventet, evig, alt utbetalt
mrp3 = rm3 - rf3
E0 = N0 * P0
V3 = E0 + D0
e0, d0 = E0 / V3, D0 / V3
assert near(E0, 3000) and near(V3, 4500) and near(e0, 2 / 3) and near(d0, 1 / 3)
bU3 = e0 * bE0 + d0 * 0.0
rU3 = rf3 + bU3 * mrp3
rE0 = rf3 + bE0 * mrp3
assert near(bU3, 1.2) and near(rU3, 0.10) and near(rE0, 0.13)
assert near(EBIT3 / V3, rU3)                         # ekte kontroll: kontantstrøm mot beta
int0 = rf3 * D0
inc0 = EBIT3 - int0
EPS0 = inc0 / N0
assert near(inc0 / E0, rE0) and near(EPS0 / P0, rE0)  # ekte kontroll for r_E

raise3 = 1000.0
P1 = P0                                              # MM I: ingen kursreaksjon
n_new = raise3 / P1
N1 = N0 + n_new
D1 = D0 - raise3
E1 = V3 - D1
assert near(n_new, 20) and near(N1, 80) and near(D1, 500) and near(E1, 4000)
assert near(E1 / N1, P0)                             # kursen uendret etter emisjonen
DE1 = D1 / E1
bE1 = bU3 + DE1 * (bU3 - 0.0)
rE1 = rf3 + bE1 * mrp3
rE1_mm = rU3 + DE1 * (rU3 - rf3)
assert near(bE1, 1.35) and near(rE1, 0.1075) and near(rE1, rE1_mm)
int1 = rf3 * D1
inc1 = EBIT3 - int1
EPS1 = inc1 / N1
assert near(inc1, 430) and near(EPS1, 5.375)
assert near(EPS1 / P0, rE1)                          # ekte kontroll: EPS/kurs = ny r_E
assert near(inc1 - inc0, int0 - int1)                # spart rente går til eierne
wacc0 = e0 * rE0 + d0 * rf3
e1, d1 = E1 / V3, D1 / V3
wacc1 = e1 * rE1 + d1 * rf3
assert near(wacc0, rU3) and near(wacc1, rU3)
vist_sum([e0 * rE0, d0 * rf3], wacc0, 6, 4)
vist_sum([e1 * rE1, d1 * rf3], wacc1, 6, 4)
assert near(int0 + inc0, EBIT3) and near(int1 + inc1, EBIT3)
assert near(EPS0 / rE0, P0) and near(EPS1 / rE1, P0)  # evigrente: begge gir 50
feil_gammel_DE = rU3 + (D0 / E0) * (rU3 - rf3)       # glemt å bruke ny D/E
vis("Oppgave 3", bU=bU3, rU=rU3, rE0=rE0, EPS0=EPS0, n_new=n_new, N1=N1, D1=D1, E1=E1,
    DE1=DE1, bE1=bE1, rE1=rE1, EPS1=EPS1, wacc0=wacc0, wacc1=wacc1,
    feil_gammel_DE=feil_gammel_DE)

# ======================================= Oppgave 4: brannsalg og risikoskifting
F4 = 50.0                              # pålydende, forfaller t = 1
p4 = 0.60                              # sannsynlighet for god tilstand (valgt her)
G4, B4 = 120.0, 20.0                   # plan P (prototype)
N4 = 85.0                              # plan N (marinekontrakt), sikker
fs = 0.5                               # brannsalg: kreditorene får halvparten
assert B4 < F4 < G4 and N4 > F4

# a) uten nødkostnader
Da = p4 * min(F4, G4) + (1 - p4) * min(F4, B4)
Ea = p4 * max(G4 - F4, 0) + (1 - p4) * max(B4 - F4, 0)
Va = p4 * G4 + (1 - p4) * B4
assert near(Da + Ea, Va)                             # D + E = V tilstand for tilstand
assert near(Da, 38) and near(Ea, 42) and near(Va, 80)
feil_forventet = Va - F4                             # trekker 50 fra forventet verdi

# b) brannsalg i mislighold
B4_fs = fs * B4
Db = p4 * F4 + (1 - p4) * B4_fs
Eb = Ea
Vb = Db + Eb
kost_fs = (1 - p4) * (B4 - B4_fs)
assert near(Va - Vb, kost_fs) and near(Da - Db, kost_fs)   # kreditorene bærer alt nå
assert near(Db, 34) and near(Vb, 76) and near(kost_fs, 4)
ytm = F4 / Db - 1
er_D = (p4 * F4 + (1 - p4) * B4_fs) / Db - 1
assert near(er_D, 0.0)

# c) plan N mot plan P
V_N_alleq = N4
V_P_alleq = Va                                        # uten gjeld: ingen mislighold, intet brannsalg
assert V_N_alleq > V_P_alleq
D_N, E_N, V_N = F4, N4 - F4, N4
D_P, E_P, V_P = Db, Eb, Vb
assert E_P > E_N                                      # ledelsen velger P
# d) byråkostnaden og hvem som vinner og taper
byra = V_N - V_P
del_snitt = N4 - Va                                   # lavere forventet eiendelsverdi
del_fs = kost_fs
assert near(byra, del_snitt + del_fs) and near(byra, 9)
dE, dD = E_P - E_N, D_P - D_N
assert near(dE + dD, V_P - V_N)                       # gevinst + tap = endring i verdi
byra_uten_fs = N4 - Va
tap_D_uten_fs = Da - F4
# e) lavere gjeld: grensen der eierne selv velger N (bonus i løsningen)
# For B < F: E_P = p(G − F), E_N = N − F.  Likhet: F* = (N − pG)/(1 − p)
F_krit = (N4 - p4 * G4) / (1 - p4)
assert B4 < F_krit < F4 and near(F_krit, 32.5)
assert near(p4 * (G4 - F_krit), N4 - F_krit)
for Fx in (F_krit - 1, F_krit + 1):                   # riktig side av grensen
    EPx = p4 * max(G4 - Fx, 0) + (1 - p4) * max(B4 - Fx, 0)
    ENx = N4 - Fx
    assert (EPx > ENx) == (Fx > F_krit)
pris_N = F4                                           # lånet verdt 50 under N
pris_P = Db                                           # men 34 under P
# ex ante: eierne får lånebeløpet pluss egenkapitalen; forskjellen er byråkostnaden
assert near(pris_P + E_P, V_P) and near(pris_N + E_N, V_N)
assert near((pris_N + E_N) - (pris_P + E_P), byra)
vis("Oppgave 4", Da=Da, Ea=Ea, Va=Va, Db=Db, Vb=Vb, kost_fs=kost_fs, ytm=ytm,
    E_N=E_N, E_P=E_P, byra=byra, deler=(del_snitt, del_fs), dE=dE, dD=dD,
    byra_uten_fs=byra_uten_fs, tap_D_uten_fs=tap_D_uten_fs, F_krit=F_krit)

# ============================ Oppgave 5: to tvillinger, vekst, APV og WACC baklengs
rf5, rm5, tau5 = 0.04, 0.09, 0.22
mrp5 = rm5 - rf5
# tvilling 1 (Nordkabel): r_E, r_D, D/V
rE_a, rD_a, dv_a = 0.11, 0.05, 0.30
# tvilling 2 (Vestnett): r_E, r_D, D/E
rE_b, rD_b, de_b = 0.10, 0.04, 0.25
dv_b = de_b / (1 + de_b)
assert near(dv_b, 0.2)
rU_a = (1 - dv_a) * rE_a + dv_a * rD_a
rU_b = (1 - dv_b) * rE_b + dv_b * rD_b
rU5 = 0.5 * (rU_a + rU_b)
assert near(rU_a, 0.092) and near(rU_b, 0.088) and near(rU5, 0.09)
vist_sum([(1 - dv_a) * rE_a, dv_a * rD_a], rU_a, 4)
vist_sum([(1 - dv_b) * rE_b, dv_b * rD_b], rU_b, 4)
bU5 = (rU5 - rf5) / mrp5
# samme svar via betaer (CAPM er lineær)
bE_a, bD_a = (rE_a - rf5) / mrp5, (rD_a - rf5) / mrp5
bE_b, bD_b = (rE_b - rf5) / mrp5, (rD_b - rf5) / mrp5
bU_a = (1 - dv_a) * bE_a + dv_a * bD_a
bU_b = (1 - dv_b) * bE_b + dv_b * bD_b
assert near(0.5 * (bU_a + bU_b), bU5) and near(bU5, 1.0)
feil_rE_snitt = 0.5 * (rE_a + rE_b)                 # tvillingens r_E rett inn

EBIT5, g5 = 500.0, 0.025
FCF5 = EBIT5 * (1 - tau5)
VU5 = FCF5 / (rU5 - g5)
assert near(FCF5, 390) and near(VU5, 6000)
D5, rD5 = 2000.0, 0.055
int5 = rD5 * D5
TS5 = tau5 * int5
PVTS5 = TS5 / (rU5 - g5)
assert near(int5, 110) and near(TS5, 24.2)
PVTS5_feil = TS5 / (rD5 - g5)                       # diskontert med r_D: feil
VL5 = VU5 + PVTS5
E5 = VL5 - D5
dv5 = D5 / VL5
ev5 = E5 / VL5
de5 = D5 / E5
# e) baklengs WACC og r_E fra WACC-formelen
rw5 = FCF5 / VL5 + g5
assert near(FCF5 / (rw5 - g5), VL5)                 # identitet (definisjon)
rE5 = (rw5 - dv5 * rD5 * (1 - tau5)) / ev5
rE5_mm = rU5 + de5 * (rU5 - rD5)
assert near(rE5, rE5_mm)                            # ekte kontroll (feiler med r_D på skjoldet)
assert near(rw5, rU5 - dv5 * tau5 * rD5)            # r_wacc = r_U − d·τ·r_D
# f) betaer
bD5 = (rD5 - rf5) / mrp5
bE5 = (rE5 - rf5) / mrp5
assert near(bD5, 0.3)
assert near(ev5 * bE5 + dv5 * bD5, bU5)             # ekte kontroll fordi r_E kom fra baklengs WACC
vist_sum([ev5 * bE5, dv5 * bD5], bU5, 4)
# vis at kontrollene feiler hvis skjoldet diskonteres med r_D
VL5w = VU5 + PVTS5_feil
dv5w = D5 / VL5w
rw5w = FCF5 / VL5w + g5
rE5w = (rw5w - dv5w * rD5 * (1 - tau5)) / (1 - dv5w)
rE5w_mm = rU5 + D5 / (VL5w - D5) * (rU5 - rD5)
bsum_w = (1 - dv5w) * (rE5w - rf5) / mrp5 + dv5w * bD5
assert abs(rE5w - rE5w_mm) > 0.004 and abs(bsum_w - bU5) > 0.05
FCF5_feil_renter = (EBIT5 - int5) * (1 - tau5)       # renter trukket fra i FCF
vist_sum([rw5 - g5, g5], rw5, 6)
vis("Oppgave 5", rU_a=rU_a, rU_b=rU_b, rU=rU5, bU=bU5, FCF=FCF5, VU=VU5, int=int5, TS=TS5,
    PVTS=PVTS5, PVTS_feil=PVTS5_feil, VL=VL5, E=E5, dv=dv5, de=de5, rw=rw5, rE=rE5,
    bE=bE5, bD=bD5, wrong=(VL5w, rE5w, rE5w_mm, bsum_w))

# ================================================= Oppgave 6: oljefelt og ρ
S6, up6, dn6, rf6, pr6 = 70.0, 0.25, -0.20, 0.05, 0.60
Q1, c1 = 3.0, 40.0                     # rask metode: mill. fat, USD per fat
Q2, c2 = 5.0, 55.0                     # forsiktig metode
Su, Sd = S6 * (1 + up6), S6 * (1 + dn6)
assert near(Su, 87.5) and near(Sd, 56.0)
val = lambda Q, c, P: Q * (P - c)
nå1, nå2 = val(Q1, c1, S6), val(Q2, c2, S6)
nå = max(nå1, nå2, 0.0)
assert near(nå1, 90) and near(nå2, 75) and near(nå, 90)
u1, u2, d1_, d2_ = val(Q1, c1, Su), val(Q2, c2, Su), val(Q1, c1, Sd), val(Q2, c2, Sd)
Cu, Cd = max(u1, u2, 0.0), max(d1_, d2_, 0.0)
assert near(u1, 142.5) and near(u2, 162.5) and near(d1_, 48) and near(d2_, 5)
assert Cu == u2 and Cd == d1_                         # forsiktig opp, rask ned
Pstar = (Q2 * c2 - Q1 * c1) / (Q2 - Q1)
assert near(Pstar, 77.5) and Sd < Pstar < Su
assert near(val(Q1, c1, Pstar), val(Q2, c2, Pstar))
extra_cost = Q2 * c2 - Q1 * c1
rho = ((1 + rf6) * S6 - Sd) / (Su - Sd)
assert 0 < rho < 1
assert near(rho * Su + (1 - rho) * Sd, (1 + rf6) * S6)   # identitet: oljen tjener r_f under ρ
PV6 = (rho * Cu + (1 - rho) * Cd) / (1 + rf6)
Delta = (Cu - Cd) / (Su - Sd)
Bnd = (Cd - Delta * Sd) / (1 + rf6)
PV6_rep = Delta * S6 + Bnd
assert near(PV6, PV6_rep)
assert near(Delta * Su + Bnd * (1 + rf6), Cu) and near(Delta * Sd + Bnd * (1 + rf6), Cd)
vent = PV6 - nå
assert vent > 0
EP_olje = pr6 * Su + (1 - pr6) * Sd
r_olje = EP_olje / S6 - 1
assert r_olje > rf6                                   # risikoen er priset
feil_reell_rf = (pr6 * Cu + (1 - pr6) * Cd) / (1 + rf6)
feil_reell_rolje = (pr6 * Cu + (1 - pr6) * Cd) / (1 + r_olje)
r_vent = (pr6 * Cu + (1 - pr6) * Cd) / PV6 - 1
assert r_vent > r_olje                                # gearet posisjon i olje
feil_rask_begge = (rho * u1 + (1 - rho) * d1_) / (1 + rf6)   # låst til rask metode
vis("Oppgave 6", nå=(nå1, nå2), Su=Su, Sd=Sd, opp=(u1, u2), ned=(d1_, d2_), Pstar=Pstar,
    rho=rho, PV=PV6, Delta=Delta, B=Bnd, vent=vent, r_olje=r_olje,
    feil_reell_rf=feil_reell_rf, feil_reell_rolje=feil_reell_rolje, r_vent=r_vent,
    feil_rask_begge=feil_rask_begge)


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "M&A", "points": 12, "topic": "Mergers and acquisitions", "chapters": [26],
    "body": (
        "<p>On the announcement of a takeover, target shareholders earn abnormal returns of about "
        "15% on average, while acquirer shareholders earn about 1% and lose in about half of the "
        "deals.</p>"
        "<p>a) Give two reasons why the target's shareholders capture most of the gains.</p>"
        "<p>b) Give two reasons why a hostile takeover can increase the value of the target.</p>"
        "<p>Reasons must be other than «synergies». The two reasons in each part must differ. "
        "Keep explanations short, 1-2 sentences per reason (3 points each).</p>"
    ),
    "solution": (
        "<p>Four reasons, 1-2 sentences each, 3 points each.</p>"
        "<p><b>a) Why the target's shareholders capture most of the gains.</b></p>"
        "<p><b>1. Competition for the target.</b> A target can be sold only once, so rival "
        "bidders, or a board that runs an auction, push the price up towards the target's full "
        "value under a new owner. The winning bidder hands most of what the deal creates to the "
        "target's shareholders as a premium.</p>"
        "<p><b>2. Overpayment: hubris and the winner's curse.</b> The winning bidder is the one "
        "with the most optimistic estimate of the target's value; an overconfident CEO also "
        "believes he can extract more than is there. The premium then exceeds the value created, "
        "which is why acquirers lose in about half of the deals.</p>"
        "<p><b>b) Why a hostile takeover can increase the value of the target.</b></p>"
        "<p><b>3. Replacing poor or entrenched management.</b> A hostile bid goes around a board "
        "that protects the incumbents; the new owner installs managers who run the same assets "
        "better. The gain comes from using the target's own assets better, not from combining "
        "two firms.</p>"
        "<p><b>4. Stopping empire building with the free cash flow.</b> A new owner can stop the "
        "spending of surplus cash on negative-NPV projects and pay it out, often by loading the "
        "firm with debt as in an LBO. The threat of such a bid also disciplines managers who are "
        "not yet targets.</p>"
        "<p><b>Other reasons that score equally.</b> For a): the free-rider problem (dispersed "
        "shareholders will not tender below the value their shares will have after the takeover, "
        "so the bidder must pay away the gain); empire building by the acquirer's CEO, who pays "
        "more than the target is worth to his shareholders; EPS manipulation; takeover defences "
        "or a white knight that raise the price. For b): breaking up an inefficient conglomerate; "
        "cutting perks and costs; economies of scale, market power or access to larger markets, "
        "which Kurbatov's H2024 key accepted although synergies were banned, provided the "
        "mechanism is explained.</p>"
        "<p><b>Not accepted.</b> «Synergies» or «the merged firm is worth more» with no "
        "mechanism. Two labels for one mechanism (hubris and the winner's curse) count as one "
        "reason.</p>"
    ),
    "criteria": [
        "Four reasons, two in a) and two in b), each worth 3 points and graded separately. A "
        "missing reason costs 3 points however good the others are.",
        "a) Accepted: competition among bidders or an auction run by the target's board; the "
        "free-rider problem in tender offers (a separate mechanism from competition); hubris or "
        "the winner's curse; empire building by the acquirer's CEO; EPS manipulation; takeover "
        "defences or a white knight that raise the price.",
        "b) Accepted: replacing poor or entrenched managers; stopping empire building and paying "
        "out free cash flow (often with debt, as in an LBO); cutting perks and costs; breaking up "
        "the firm; the threat of a bid. As in Kurbatov's H2024 key, economies of scale, market "
        "power or access to larger markets also score when the mechanism is explained.",
        "«Synergies» or «the merged firm is worth more» with no mechanism earns nothing.",
        "The two reasons in a part must rest on different mechanisms: hubris and the winner's "
        "curse are one reason, competition among bidders and the free-rider problem are two.",
        "1-2 sentences per reason with the mechanism stated. A bare label earns at most 1 point.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "body": (
        "<p>An index fund owns 0.1-0.5% of each of 2,000 listed companies: about 30,000 ballot "
        "items a year. Its governance team of four votes on every item as a proxy advisor (such "
        "as ISS or Glass Lewis) recommends.</p>"
        "<p>a) Is this optimal for the fund's investors? Give one argument for, one against and "
        "your conclusion (6 points; 2-3 sentences per argument).</p>"
        "<p>b) Propose one alternative way for the fund to discipline managers: who acts, how it "
        "works and one weakness (6 points; 3-4 sentences).</p>"
    ),
    "solution": (
        "<p><b>a) Argument for: it is a rational way to vote.</b> A team of four cannot analyse "
        "30,000 items. With stakes of 0.1-0.5% the fund would capture only a tiny share of any "
        "value its own research created: the free-rider problem of small shareholders. A proxy "
        "advisor spreads the cost of research over thousands of clients, applies a consistent "
        "policy and is far better than not voting at all.</p>"
        "<p><b>Argument against: it is not optimal.</b> The advisor's policies are checklists that "
        "ignore each company's circumstances; the advisor also has conflicts of interest (some "
        "sell consulting to the companies whose votes they score) and makes mistakes that "
        "thousands of funds then copy. When many large holders vote mechanically, two private "
        "firms hold much of the voting power without bearing any of the consequences, while "
        "managers learn to satisfy a checklist rather than to create value.</p>"
        "<p><b>Conclusion.</b> Following the advisor is a sensible cost-saving device for routine "
        "items, but not for the few votes that matter (contested elections, large pay packages, "
        "mergers at the largest holdings), where the advice should be an input rather than an "
        "autopilot.</p>"
        "<p><b>b) Model answer: focused engagement backed by coordinated voting.</b> The "
        "governance team picks the few companies where its votes matter most (the largest "
        "positions, poor performers, contested pay) and engages their boards directly, stating "
        "what it will vote against. An index fund cannot sell a badly run company, so voice is its "
        "only tool; together with other institutions holding 10-20% of the shares it can make a "
        "vote against the chair or the pay plan credible enough that the board responds before "
        "the meeting. The weakness is cost and free-riding: the fund bears the full cost while "
        "every shareholder shares the gain; coordination is also slow and can run into rules on "
        "acting in concert.</p>"
        "<p><b>Other alternatives that score equally,</b> each with its mechanism and one "
        "weakness: an own voting policy with case-by-case votes on the important items (costly); "
        "nominating directors or supporting a proxy contest (expensive, rarely successful); "
        "shareholder proposals (usually advisory, often voted down); backing an activist hedge "
        "fund (its horizon may be short); passing the votes through to the fund's own investors "
        "(retail investors vote few of their shares).</p>"
        "<p><b>Not accepted as the alternative.</b> «Sell the shares»: an index fund must hold "
        "every company in the index, which is exactly why voice is its only channel. Saying so "
        "is a good point in itself.</p>"
    ),
    "criteria": [
        "a) One argument for and one against, about 3 points each, with the conclusion inside "
        "the 6 points: an answer that never states a view loses 1 point.",
        "For: 30,000 items cannot be analysed by four people; with stakes of 0.1-0.5% the fund "
        "captures little of the gain from its own research (free-rider problem); advisors spread "
        "research costs and voting with advice beats not voting.",
        "Against: one-size-fits-all checklists; conflicts of interest and errors at the advisor "
        "that many funds copy; voting power concentrated in a few advisors that bear no "
        "consequences; managers who learn to satisfy the checklist; a fiduciary duty that cannot "
        "be outsourced.",
        "b) One alternative with who acts, how it disciplines management and one weakness, about "
        "2 points each. Any reasonable mechanism with an explanation is accepted.",
        "Accepted alternatives: own voting policy on the important items; private engagement with "
        "boards; coordinated voting with other institutions; nominating directors or supporting a "
        "proxy contest; shareholder proposals; backing an activist; pass-through voting to the "
        "fund's own investors.",
        "Selling the shares does not score as the alternative: an index fund must hold the index. "
        "Noting that this is why voice is the fund's only channel earns credit.",
        "Keep to the sentence budget: 2-3 sentences per argument in a) and 3-4 sentences in b).",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, leverage and beta", "chapters": [3, 4, 6],
    "body": (
        f"<p>Skarvik Robotics ASA operates in a perfect capital market with no taxes. It has "
        f"{g(N0)} million shares trading at NOK {g(P0)} and NOK {g(D0)} million of risk-free debt. "
        f"Its assets generate expected EBIT of NOK {g(EBIT3)} million per year forever, all paid "
        f"out as interest and dividends. The risk-free rate is {pc(rf3)}, the expected market "
        f"return is {pc(rm3)} and Skarvik's equity beta is {g(bE0)}.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>Find Skarvik's asset beta and unlevered cost of capital.</p>",
            "solution": (
                f"<p><b>Step 1. Market values.</b> E = {g(N0)} × {g(P0)} = <b>NOK {g(E0)} million</b>, "
                f"D = {g(D0)} and V = E + D = <b>{g(V3)}</b>. Weights: E/V = 2/3 and D/V = 1/3.</p>"
                f"<p><b>Step 2. Unlever the beta.</b> The debt is risk-free, so β<sub>D</sub> = 0:<br>"
                f"β<sub>U</sub> = (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = (2/3)({g(bE0)}) + (1/3)(0) = "
                f"<b>{g(bU3)}</b></p>"
                f"<p><b>Step 3. CAPM.</b> The market risk premium is {pc(rm3)} − {pc(rf3)} = {pc(mrp3)}:<br>"
                f"r<sub>U</sub> = {pc(rf3)} + {g(bU3)} × {pc(mrp3)} = <b>{pc(rU3)}</b></p>"
                f"<p><b>Check.</b> With no taxes and all EBIT paid out, r<sub>U</sub> is also the "
                f"expected EBIT over the value of the firm: {g(EBIT3)}/{g(V3)} = {pc(EBIT3 / V3)} ✓. "
                f"The same works for equity: r<sub>E</sub> = {pc(rf3)} + {g(bE0)} × {pc(mrp3)} = "
                f"{pc(rE0)}, which matches the cash flow to equity: ({g(EBIT3)} − {pc(rf3)} × {g(D0)})/{g(E0)} = "
                f"{g(inc0)}/{g(E0)} = {pc(inc0 / E0)} ✓. This check is real: it uses the EBIT, which the "
                f"beta route never touches.</p>"
            ),
            "criteria": [
                f"Market values first: E = {g(N0)} × {g(P0)} = {g(E0)}, V = {g(V3)}, weights 2/3 and 1/3.",
                f"β_U = (2/3)({g(bE0)}) + (1/3)(0) = {g(bU3)}, with β_D = 0 because the debt is "
                "risk-free and weights without taxes.",
                f"Market risk premium = {pc(rm3)} − {pc(rf3)} = {pc(mrp3)}, not {pc(rm3)}.",
                f"r_U = {pc(rU3)}. The check {g(EBIT3)}/{g(V3)} = {pc(rU3)} is optional but worth one line.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                f"<p>Skarvik announces that it will issue new shares for NOK {g(raise3)} million and "
                "use the proceeds to repay debt; the debt stays risk-free. What happens to the share "
                "price on announcement? How many new shares are issued?</p>"
            ),
            "solution": (
                f"<p><b>Share price: unchanged at NOK {g(P0)}.</b> In a perfect market with no "
                "taxes, MM Proposition I holds: the value of the firm is set by its assets; "
                "swapping debt for equity only changes how the same EBIT is split between the two "
                f"claims. V stays at {g(V3)} and the announcement contains no news about the assets, "
                "so there is nothing for the market to price in.</p>"
                f"<p><b>New shares.</b> The shares are issued at the market price of NOK {g(P1)}:<br>"
                f"new shares = {g(raise3)}/{g(P1)} = <b>{g(n_new)} million</b>; shares outstanding "
                f"afterwards = {g(N0)} + {g(n_new)} = <b>{g(N1)} million</b>.</p>"
                f"<p><b>Check.</b> After the issue D = {g(D0)} − {g(raise3)} = {g(D1)} and "
                f"E = {g(V3)} − {g(D1)} = {g(E1)}, so P = {g(E1)}/{g(N1)} = <b>NOK {g(E1 / N1)}</b> ✓. "
                f"The old shareholders still hold {g(N0)} × {g(P0)} = {g(E0)}; the new ones paid "
                f"{g(raise3)} in cash for shares worth {g(n_new * P1)}. (An identity once the shares are "
                "issued at the market price: it catches arithmetic slips only.)</p>"
            ),
            "criteria": [
                f"Share price unchanged at NOK {g(P0)}, with the reason: perfect market, no taxes, "
                "MM I, so no value is created or destroyed.",
                f"New shares = {g(raise3)}/{g(P1)} = {g(n_new)} million, issued at the unchanged price; "
                f"{g(N1)} million shares afterwards.",
                "Issuing at an invented lower «diluted» price is the error: a fair issue at the market "
                "price transfers no value.",
                f"The check E/N = {g(E1)}/{g(N1)} = {g(P0)} takes one line.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Find the equity beta and the cost of equity after the issue. Why do they change "
                "in this direction?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. New leverage.</b> D/E = {g(D1)}/{g(E1)} = {g(DE1)} (D/V = 1/9).</p>"
                f"<p><b>Step 2. Relever.</b> β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − "
                f"β<sub>D</sub>) = {g(bU3)} + {g(DE1)} × {g(bU3)} = <b>{g(bE1)}</b><br>"
                f"r<sub>E</sub> = {pc(rf3)} + {g(bE1)} × {pc(mrp3)} = <b>{pc(rE1)}</b><br>"
                f"MM II gives the same: {pc(rU3)} + {g(DE1)} × ({pc(rU3)} − {pc(rf3)}) = {pc(rE1_mm)}.</p>"
                f"<p><b>Check.</b> Interest is now {pc(rf3)} × {g(D1)} = {g(int1)}, so the shareholders "
                f"receive {g(EBIT3)} − {g(int1)} = {g(inc1)} a year, or {g(inc1)}/{g(N1)} = NOK "
                f"{g(EPS1)} per share. On a NOK {g(P0)} share that is {g(EPS1)}/{g(P0)} = {pc(EPS1 / P0)} ✓.</p>"
                f"<p><b>Why both fall</b> (from {g(bE0)} and {pc(rE0)}). The business risk of the "
                f"assets is unchanged (β<sub>U</sub> = {g(bU3)}), but less of it is concentrated on "
                "the shareholders: with less fixed debt service ahead of them, a given swing in EBIT "
                "moves the income per share by less. Lower financial leverage means lower financial "
                "risk for equity, so the equity beta and the return shareholders require both "
                "fall.</p>"
            ),
            "criteria": [
                f"Uses the new capital structure: D = {g(D1)}, E = {g(E1)}, D/E = {g(DE1)}. Using the "
                f"old D/E of 0.5 gives r_E = {pc(feil_gammel_DE)} and is the error.",
                f"β_E = {g(bU3)} × (1 + {g(DE1)}) = {g(bE1)} and r_E = {pc(rE1)}, by CAPM or MM II.",
                "Explains the direction: business risk (β_U) is unchanged, financial risk falls "
                "because there is less debt ahead of the shareholders.",
                f"(bonus) Checks with the cash flow: {g(inc1)}/{g(N1)} = {g(EPS1)} per share; "
                f"{g(EPS1)}/{g(P0)} = {pc(rE1)}.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Find the WACC before and after the issue. Explain the result using MM.</p>"
            ),
            "solution": (
                f"<p><b>Before.</b> r<sub>wacc</sub> = (2/3)({pc(rE0)}) + (1/3)({pc(rf3)}) = "
                f"{f(100 * e0 * rE0)}% + {f(100 * d0 * rf3)}% = <b>{pc(wacc0)}</b></p>"
                f"<p><b>After.</b> E/V = {g(E1)}/{g(V3)} = 8/9 and D/V = 1/9:<br>"
                f"r<sub>wacc</sub> = (8/9)({pc(rE1)}) + (1/9)({pc(rf3)}) = "
                f"{f(100 * e1 * rE1)}% + {f(100 * d1 * rf3)}% = <b>{pc(wacc1)}</b></p>"
                "<p>There are no taxes, so there is no (1 − τ<sub>c</sub>) term and the WACC is the "
                f"pre-tax WACC, equal to r<sub>U</sub> = {pc(rU3)} both times.</p>"
                "<p><b>Explanation.</b> In a perfect market without taxes the WACC is the expected "
                "return on the firm's assets. MM says that the assets, their risk and their value "
                "do not depend on how they are financed. The transaction moves weight from cheap "
                "debt to more expensive equity, but the equity has become safer and cheaper by "
                "exactly enough to leave the average unchanged (MM I and MM II together).</p>"
                f"<p><b>Check.</b> Investors as a group expect {pc(rf3)} × {g(D0)} + {pc(rE0)} × "
                f"{g(E0)} = {g(int0)} + {g(inc0)} = {g(int0 + inc0)} before and {pc(rf3)} × {g(D1)} + "
                f"{pc(rE1)} × {g(E1)} = {g(int1)} + {g(inc1)} = {g(int1 + inc1)} after: the expected "
                "EBIT both times ✓. This is the cash-flow check from a) and c) once more, in money: it "
                "confirms the inputs rather than testing the WACC, which is an identity once "
                "r<sub>E</sub> came from MM II.</p>"
            ),
            "criteria": [
                f"Before: (2/3)({pc(rE0)}) + (1/3)({pc(rf3)}) = {pc(wacc0)}.",
                f"After: (8/9)({pc(rE1)}) + (1/9)({pc(rf3)}) = {pc(wacc1)}, with the new weights.",
                "No (1 − τ) term: there are no taxes, so the WACC is the pre-tax WACC = r_U.",
                "Explains with MM: asset risk and firm value are independent of financing, so the "
                "fall in r_E exactly offsets the larger weight on equity.",
                "Show the calculation. Stating «unchanged by MM» without the two numbers earns half.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                f"<p>A colleague objects: «Equity costs far more than the {pc(rf3)} we pay on debt, "
                "so replacing debt with equity must raise our cost of capital. Besides, the earnings "
                f"are now shared among more shares, so EPS falls from NOK {f(EPS0, 2)} and the "
                "existing shareholders are diluted.» Is the colleague right? Explain briefly "
                "(3-5 sentences).</p>"
            ),
            "solution": (
                "<p><b>Model answer (5 sentences).</b> No, on both counts. The cost of equity is "
                f"not a fixed {pc(rE0)}: with less debt the equity is safer, r<sub>E</sub> falls to "
                f"{pc(rE1)} and the WACC stays at {pc(wacc1)} (part d), because debt only looks cheap "
                "while it pushes risk onto the shareholders. EPS does fall from "
                f"{f(EPS0, 2)} to {g(EPS1)}, but so does the risk: each share now earns "
                f"{g(EPS1)}/{g(P0)} = {pc(rE1)}, exactly the new r<sub>E</sub>, so it is still worth "
                f"{g(EPS1)}/{g(rE1)} = NOK {g(EPS1 / rE1)} (before: {f(EPS0, 2)}/{g(rE0)} = "
                f"{g(EPS0 / rE0)}). The new shareholders paid NOK {g(raise3)} million in cash, the "
                "fair value of what they received, so no value moves from the old shareholders to "
                "the new ones. A lower EPS is compensation for lower risk, not a loss: this is the "
                "EPS (dilution) fallacy.</p>"
                "<p><b>Also accepted.</b> Any correct MM argument in your own words, for example "
                "homemade leverage: an old shareholder who wants the old risk back can borrow and buy "
                "more shares, so the firm's choice of leverage cannot change what the shares are "
                "worth.</p>"
            ),
            "criteria": [
                "Answers clearly: the colleague is wrong on both points.",
                f"r_E is not fixed: it falls to {pc(rE1)} as leverage falls, so the WACC stays at "
                f"{pc(wacc1)}.",
                f"EPS falls from {f(EPS0, 2)} to {g(EPS1)}, but the required return falls in step: "
                f"{g(EPS1)}/{g(rE1)} = {g(P0)} = {f(EPS0, 2)}/{g(rE0)}.",
                "The new shares are sold at the fair price, so there is no dilution of value. Naming "
                "the EPS or dilution fallacy earns credit.",
                "Anything reasonable about MM is accepted; a bare «MM says it does not matter» "
                "without the two mechanisms earns at most half.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
ex4 = {
    "n": 4, "title": "Debt and risk", "points": 18,
    "topic": "Financial distress, fire sales and risk shifting", "chapters": [8, 9],
    "body": (
        f"<p>Brattøy Verft AS, a shipyard, has a bank loan with face value NOK {g(F4)} million due "
        f"at t = 1. Management, acting for the shareholders, plans to build a prototype vessel on "
        f"speculation (Plan P): at t = 1 the yard's assets will be worth NOK {g(G4)} million if a "
        f"buyer is found (probability {pc(p4)}) and NOK {g(B4)} million if not (probability "
        f"{pc(1 - p4)}). Investors are risk neutral and the risk-free rate is 0%. If the yard "
        "cannot repay the loan, the bank takes over its assets.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": (
                "<p>Assume default is costless. Find the values of the loan, the equity and the "
                "firm today.</p>"
            ),
            "solution": (
                "<p>Value each claim state by state: the bank receives min(50, V<sub>1</sub>) and "
                "the shareholders max(V<sub>1</sub> − 50, 0).</p>"
                "<table class=\"data\"><tr><th>State</th><th>Probability</th><th>Assets</th>"
                "<th>Bank</th><th>Shareholders</th></tr>"
                f"<tr><td>Buyer found</td><td class=\"n\">{g(p4)}</td><td class=\"n\">{g(G4)}</td>"
                f"<td class=\"n\">{g(F4)}</td><td class=\"n\">{g(G4 - F4)}</td></tr>"
                f"<tr><td>No buyer</td><td class=\"n\">{g(1 - p4)}</td><td class=\"n\">{g(B4)}</td>"
                f"<td class=\"n\">{g(B4)}</td><td class=\"n\">0</td></tr></table>"
                f"<p>D = {g(p4)} × {g(F4)} + {g(1 - p4)} × {g(B4)} = {g(p4 * F4)} + {g((1 - p4) * B4)} "
                f"= <b>{g(Da)}</b><br>E = {g(p4)} × {g(G4 - F4)} + {g(1 - p4)} × 0 = <b>{g(Ea)}</b><br>"
                f"V = {g(p4)} × {g(G4)} + {g(1 - p4)} × {g(B4)} = <b>{g(Va)}</b></p>"
                f"<p><b>Check.</b> D + E = {g(Da)} + {g(Ea)} = {g(Da + Ea)} = V ✓. This is an identity: "
                "state by state the two claims split the assets, so it catches arithmetic slips "
                "only.</p>"
            ),
            "criteria": [
                "Values the claims state by state: the bank gets min(50, assets), the shareholders "
                "max(assets − 50, 0).",
                f"D = {g(Da)}, E = {g(Ea)}, V = {g(Va)}.",
                f"Subtracting 50 from the expected asset value ({g(Va)} − 50 = {g(feil_forventet)}) "
                "ignores limited liability and is the error.",
                f"The check D + E = {g(Va)} takes one line.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                "<p>In default, the assets must be sold in a fire sale for half their value. "
                "Recalculate the three values. With the loan already outstanding, who bears the cost "
                "of the fire sale? What are the loan's promised yield and expected return?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The bad state.</b> The assets worth {g(B4)} fetch only "
                f"{g(fs)} × {g(B4)} = <b>{g(B4_fs)}</b>. That is what the bank receives.</p>"
                f"<p>D = {g(p4)} × {g(F4)} + {g(1 - p4)} × {g(B4_fs)} = {g(p4 * F4)} + "
                f"{g((1 - p4) * B4_fs)} = <b>{g(Db)}</b><br>E = {g(p4)} × {g(G4 - F4)} = <b>{g(Eb)}</b> "
                f"(unchanged)<br>V = D + E = <b>{g(Vb)}</b></p>"
                f"<p><b>Step 2. Who bears it.</b> The expected cost of the fire sale is {g(1 - p4)} × "
                f"({g(B4)} − {g(B4_fs)}) = <b>{g(kost_fs)}</b> = {g(Va)} − {g(Vb)}. <b>With the loan "
                f"already outstanding, the bank bears it</b>: the loan is worth {g(Db)} instead of "
                f"{g(Da)}, while the shareholders lose nothing because they receive nothing in default "
                "whatever the assets fetch. Before the loan was made it is the other way round: a bank "
                f"that foresees the fire sale lends only {g(Db)} against the promise of {g(F4)}, so if "
                f"the loan was priced correctly the shareholders absorbed the {g(kost_fs)} up front "
                "(«the cost is absorbed by equity holders», lecture 4). Part e) applies the same "
                "logic to the whole agency cost.</p>"
                f"<p><b>Step 3. Yield and expected return.</b> The loan promises {g(F4)} and is worth "
                f"{g(Db)}: promised yield = {g(F4)}/{g(Db)} − 1 = <b>{pc(ytm)}</b>. Its expected payoff "
                f"is {g(p4 * F4 + (1 - p4) * B4_fs)}, so the expected return is "
                f"{g(p4 * F4 + (1 - p4) * B4_fs)}/{g(Db)} − 1 = <b>{pc(er_D)}</b>, the risk-free rate, "
                "as it must be for risk-neutral investors. The whole spread is expected default loss, "
                "fire sale included.</p>"
            ),
            "criteria": [
                f"Bad-state payoff to the bank = {g(fs)} × {g(B4)} = {g(B4_fs)}.",
                f"D = {g(Db)}, E = {g(Eb)}, V = {g(Vb)}; expected fire-sale cost = "
                f"{g(1 - p4)} × {g(B4 - B4_fs)} = {g(kost_fs)}.",
                f"Who bears it: the bank, now that the loan is outstanding (the loan falls from {g(Da)} "
                f"to {g(Db)}; the shareholders get nothing in default anyway). Full marks also for "
                "adding that a correctly priced loan made the shareholders bear it up front, as in "
                "Kurbatov's lecture 4 and part e).",
                f"Promised yield {pc(ytm)} against an expected return of {pc(er_D)}. Calling the "
                "yield the expected return is the classic error.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                f"<p>Instead of Plan P, the Navy offers a fixed-price contract (Plan N) that makes the "
                f"assets worth NOK {g(N4)} million at t = 1 for sure. Which plan would the yard choose "
                "without debt? Which plan does management choose with the loan, given the fire sale? "
                "Why?</p>"
            ),
            "solution": (
                f"<p><b>Without debt.</b> The shareholders own everything, so they maximise expected "
                f"asset value: Plan N gives {g(N4)} and Plan P gives {g(p4)} × {g(G4)} + {g(1 - p4)} × "
                f"{g(B4)} = {g(V_P_alleq)}. An unlevered yard never defaults, so there is no fire sale. "
                "<b>It chooses Plan N.</b></p>"
                f"<p><b>With the loan of {g(F4)}.</b></p>"
                "<table class=\"data\"><tr><th>Plan</th><th>Loan</th><th>Equity</th><th>Firm</th></tr>"
                f"<tr><td>N (Navy contract)</td><td class=\"n\">{g(D_N)}</td><td class=\"n\">"
                f"{g(N4)} − {g(F4)} = {g(E_N)}</td><td class=\"n\">{g(V_N)}</td></tr>"
                f"<tr><td>P (prototype)</td><td class=\"n\">{g(D_P)}</td><td class=\"n\">{g(E_P)}</td>"
                f"<td class=\"n\">{g(V_P)}</td></tr></table>"
                f"<p><b>Management chooses Plan P</b>, because it gives the shareholders {g(E_P)} "
                f"against {g(E_N)}, although the firm is worth {g(V_N - V_P)} less.</p>"
                "<p><b>The mechanism: risk shifting (asset substitution).</b> With limited liability "
                f"the equity is a call option on the assets with strike {g(F4)}: the shareholders keep "
                "all of the upside of the prototype, while in the bad state the bank takes the loss. "
                "The safe contract makes the loan safe and hands the shareholders only a sure "
                f"{g(E_N)}.</p>"
            ),
            "criteria": [
                f"Without debt: Plan N ({g(N4)} > {g(V_P_alleq)}); no default, so no fire sale.",
                f"With the loan: E_N = {g(E_N)}, E_P = {g(E_P)}, so management chooses P.",
                f"(bonus) Loan values: {g(D_N)} under N (safe) and {g(D_P)} under P, which d) needs anyway.",
                "Names the mechanism: risk shifting or asset substitution; equity as a call option on "
                "the assets with strike equal to the face value.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Find the agency cost of the loan and split it into the part due to Plan P's lower "
                "expected asset value and the part due to the fire sale. Who wins and who loses when "
                "P is chosen over N?</p>"
            ),
            "solution": (
                f"<p><b>Agency cost</b> = V<sub>N</sub> − V<sub>P</sub> = {g(V_N)} − {g(V_P)} = "
                f"<b>{g(byra)}</b>, the value destroyed because the loan distorts the choice of plan.</p>"
                "<table class=\"data\"><tr><th>Source</th><th>Calculation</th><th>Cost</th></tr>"
                f"<tr><td>Lower expected asset value</td><td>{g(N4)} − {g(Va)}</td>"
                f"<td class=\"n\">{g(del_snitt)}</td></tr>"
                f"<tr><td>Expected fire-sale loss</td><td>{g(1 - p4)} × ({g(B4)} − {g(B4_fs)})</td>"
                f"<td class=\"n\">{g(del_fs)}</td></tr>"
                f"<tr><td><b>Total</b></td><td></td><td class=\"n\"><b>{g(byra)}</b></td></tr></table>"
                "<p><b>Who wins and who loses</b> (P compared with N):</p>"
                "<table class=\"data\"><tr><th>Claim</th><th>Plan N</th><th>Plan P</th><th>Change</th></tr>"
                f"<tr><td>Shareholders</td><td class=\"n\">{g(E_N)}</td><td class=\"n\">{g(E_P)}</td>"
                f"<td class=\"n\">+{g(dE)}</td></tr>"
                f"<tr><td>Bank</td><td class=\"n\">{g(D_N)}</td><td class=\"n\">{g(D_P)}</td>"
                f"<td class=\"n\">{g(dD)}</td></tr>"
                f"<tr><td>Firm</td><td class=\"n\">{g(V_N)}</td><td class=\"n\">{g(V_P)}</td>"
                f"<td class=\"n\">{g(V_P - V_N)}</td></tr></table>"
                f"<p><b>Check.</b> +{g(dE)} + ({g(dD)}) = {g(dE + dD)}, the change in firm value ✓ (an "
                "identity, since the two claims always add up to the firm: it catches arithmetic "
                "slips only). "
                f"The shareholders gain {g(dE)} by taking {g(-dD)} from the bank; the other {g(byra)} "
                "simply disappears.</p>"
                f"<p>Without fire sales the agency cost would be only {g(byra_uten_fs)}: the fire "
                "sale makes risk shifting more expensive, because the risky plan creates the very "
                "default that triggers it.</p>"
            ),
            "criteria": [
                f"Agency cost = {g(V_N)} − {g(V_P)} = {g(byra)}.",
                f"Split: {g(del_snitt)} from the lower expected asset value ({g(N4)} − {g(Va)}) and "
                f"{g(del_fs)} from the expected fire-sale loss.",
                f"Shareholders +{g(dE)}, bank {g(dD)}, firm {g(V_P - V_N)}; the gains and losses sum "
                "to the change in firm value.",
                f"(bonus) Notes that without fire sales the cost would be {g(byra_uten_fs)}: distress "
                "costs amplify risk shifting.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>The bank priced the loan a year ago, knowing that management would choose the "
                "plan later. Who bears the agency cost in the end? Name one way to avoid it "
                "(2-3 sentences).</p>"
            ),
            "solution": (
                "<p><b>Model answer (3 sentences).</b> The shareholders bear it: a rational bank "
                f"foresaw Plan P and lent only what a promise of {g(F4)} is worth under P "
                f"({g(pris_P)}), so the shareholders got {g(pris_P)} + {g(E_P)} = {g(pris_P + E_P)} "
                f"for the loan and their equity together, against {g(pris_N)} + {g(E_N)} = "
                f"{g(pris_N + E_N)} if they could have committed to Plan N. The {g(byra)} of lost "
                "value is paid up front, when the loan is raised. A covenant that forbids speculative "
                "builds (or requires the bank's consent to the plan) would have avoided it: the bank "
                f"would then lend {g(pris_N)} against the promise and the shareholders would keep "
                "the value.</p>"
                "<p><b>Other remedies that score.</b> Less debt: with a face value of "
                f"{g(F_krit)} or less the shareholders would pick Plan N themselves (for F between "
                f"{g(B4)} and {g(F_krit)}, {g(p4)} × ({g(G4)} − F) ≤ {g(N4)} − F; below {g(B4)} the "
                "loan is safe under both plans). Convertible debt that gives the bank "
                "part of the upside. Renegotiating the loan before the plan is chosen.</p>"
            ),
            "criteria": [
                "The shareholders bear it: rational creditors anticipate the choice and price the "
                "loan accordingly, so the cost is paid when the loan is raised.",
                "Remedy: a covenant restricting the choice of plan (or requiring consent); less debt; "
                "convertible debt; renegotiation. Any one with a sentence of mechanism scores.",
                f"(bonus) The debt level below which management chooses N itself: F = {g(F_krit)}.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Valuation", "points": 20, "topic": "WACC and APV", "chapters": [3, 4, 17, 18, 19],
    "body": (
        f"<p>Lofotkabel AS, an unlisted fibre-network operator, expects EBIT of NOK {g(EBIT5)} "
        f"million next year. Capital expenditure equals depreciation, working capital is constant "
        f"and free cash flow grows by {pc(g5)} per year forever. The tax rate is {pc(tau5)}. "
        f"Lofotkabel's debt trades at par at NOK {g(D5)} million today; both its cost of debt and "
        f"its interest rate are {pc(rD5)}. The firm keeps its debt-to-equity ratio constant, so the "
        f"debt also grows by {pc(g5)} per year. The risk-free rate is {pc(rf5)} and the expected "
        f"market return is {pc(rm5)}.</p>"
        "<p>Two comparable listed firms keep their debt-to-value ratios constant:</p>"
        "<table class=\"data\"><tr><th>Comparable</th><th>Cost of equity</th><th>Cost of debt</th>"
        "<th>Leverage</th></tr>"
        f"<tr><td>Nordkabel ASA</td><td class=\"n\">{pc(rE_a)}</td><td class=\"n\">{pc(rD_a)}</td>"
        f"<td class=\"n\">D/V = {pc(dv_a)}</td></tr>"
        f"<tr><td>Vestnett ASA</td><td class=\"n\">{pc(rE_b)}</td><td class=\"n\">{pc(rD_b)}</td>"
        f"<td class=\"n\">D/E = {g(de_b)}</td></tr></table>"
        "<p>Use the average of their unlevered costs of capital. Recommended precision is 4 "
        "decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 4,
            "body": "<p>Find Lofotkabel's unlevered cost of capital and asset beta.</p>",
            "solution": (
                "<p><b>Step 1. Unlever each comparable.</b> Both keep D/V constant, so the pre-tax "
                "WACC with market-value weights (no taxes in the weights) is r<sub>U</sub>.</p>"
                f"<p>Nordkabel: r<sub>U</sub> = {g(1 - dv_a)} × {pc(rE_a)} + {g(dv_a)} × {pc(rD_a)} = "
                f"{pc((1 - dv_a) * rE_a)} + {pc(dv_a * rD_a)} = <b>{pc(rU_a)}</b></p>"
                f"<p>Vestnett: D/E = {g(de_b)} means D/V = {g(de_b)}/{g(1 + de_b)} = {g(dv_b)} and "
                f"E/V = {g(1 - dv_b)}:<br>r<sub>U</sub> = {g(1 - dv_b)} × {pc(rE_b)} + {g(dv_b)} × "
                f"{pc(rD_b)} = {pc((1 - dv_b) * rE_b)} + {pc(dv_b * rD_b)} = <b>{pc(rU_b)}</b></p>"
                f"<p><b>Step 2. Average.</b> r<sub>U</sub> = ({pc(rU_a)} + {pc(rU_b)})/2 = "
                f"<b>{pc(rU5)}</b></p>"
                f"<p><b>Step 3. Asset beta.</b> β<sub>U</sub> = (r<sub>U</sub> − r<sub>f</sub>)/"
                f"(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = ({pc(rU5)} − {pc(rf5)})/{pc(mrp5)} = "
                f"<b>{g(bU5)}</b></p>"
                f"<p>Through betas the answer is the same: Nordkabel β<sub>E</sub> = {g(bE_a)} and "
                f"β<sub>D</sub> = {g(bD_a)} give β<sub>U</sub> = {g(bU_a)}; Vestnett "
                f"β<sub>E</sub> = {g(bE_b)} and β<sub>D</sub> = {g(bD_b)} give {g(bU_b)}; the average "
                f"is {g(0.5 * (bU_a + bU_b))} ✓.</p>"
            ),
            "criteria": [
                f"Unlevers each comparable with the pre-tax WACC: {pc(rU_a)} and {pc(rU_b)}.",
                f"Converts Vestnett's D/E = {g(de_b)} into D/V = {g(dv_b)}. Using {g(de_b)} as the "
                "weight is the standard slip.",
                f"r_U = {pc(rU5)} and β_U = {g(bU5)}.",
                "No (1 − τ) in the unlevering: the comparables keep D/V constant (course convention). "
                f"Averaging the comparables' r_E ({pc(feil_rE_snitt)}) instead of their r_U is wrong.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": "<p>What would Lofotkabel be worth if it were all-equity financed?</p>",
            "solution": (
                f"<p><b>Step 1. Free cash flow.</b> FCF = EBIT × (1 − τ<sub>c</sub>) = {g(EBIT5)} × "
                f"{g(1 - tau5)} = <b>{g(FCF5)}</b>. Capital expenditure equals depreciation and "
                "working capital is constant, so nothing else enters. Interest is not deducted: "
                "FCF belongs to all investors.</p>"
                f"<p><b>Step 2. Growing perpetuity at r<sub>U</sub>.</b><br>V<sup>U</sup> = "
                f"{g(FCF5)}/({pc(rU5)} − {pc(g5)}) = {g(FCF5)}/{f(rU5 - g5, 3)} = <b>NOK {g(VU5)} "
                f"million</b></p>"
            ),
            "criteria": [
                f"FCF = {g(EBIT5)} × {g(1 - tau5)} = {g(FCF5)}. Deducting interest first "
                f"({g(FCF5_feil_renter)}) mixes financing into the FCF and is the error.",
                f"Growing perpetuity at r_U: V^U = {g(FCF5)}/({pc(rU5)} − {pc(g5)}) = {g(VU5)}.",
                "Uses r_U, not a WACC: this is the value of the firm without debt.",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": (
                "<p>Find next year's interest and the present value of the interest tax shields. "
                "Which rate do you discount them at and why?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Next year's shield.</b> Interest = {pc(rD5)} × {g(D5)} = <b>{g(int5)}</b>, "
                f"so TS<sub>1</sub> = {pc(tau5)} × {g(int5)} = <b>{g(TS5)}</b>. The debt grows by "
                f"{pc(g5)} a year, so the interest and the shield grow by {pc(g5)} as well.</p>"
                f"<p><b>Step 2. The rate.</b> Lofotkabel keeps D/E constant, so the amount of debt "
                "(and with it the tax shield) moves up and down with the value of the firm. The shield "
                f"therefore has the risk of the firm's assets and is discounted at <b>r<sub>U</sub> = "
                f"{pc(rU5)}</b>, not at r<sub>D</sub>. (r<sub>D</sub> would be right only for a debt "
                "level fixed in advance.)</p>"
                f"<p>PV(TS) = {g(TS5)}/({pc(rU5)} − {pc(g5)}) = <b>{f(PVTS5)}</b></p>"
            ),
            "criteria": [
                f"Interest = {pc(rD5)} × {g(D5)} = {g(int5)} on today's debt; TS_1 = {g(TS5)}.",
                f"The shield grows at {pc(g5)} with the debt and is valued as a growing perpetuity.",
                f"Discounts at r_U = {pc(rU5)} and says why: constant D/E makes the debt (and so the "
                f"shield) move with firm value. Discounting at r_D gives {f(PVTS5_feil)} and is the "
                "classic error.",
                f"PV(TS) = {f(PVTS5)}.",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": (
                "<p>Find Lofotkabel's levered value with the APV method, the value of its equity and "
                "its debt-to-value ratio.</p>"
            ),
            "solution": (
                f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {g(VU5)} + {f(PVTS5)} = <b>{f(VL5)}</b><br>"
                f"E = V<sup>L</sup> − D = {f(VL5)} − {g(D5)} = <b>{f(E5)}</b><br>"
                f"D/V = {g(D5)}/{f(VL5)} = <b>{f(dv5)}</b>, so E/V = {f(ev5)} and D/E = "
                f"{g(D5)}/{f(E5)} = {f(de5)}.</p>"
                "<p>Because the firm keeps D/E constant and everything grows at the same rate, these "
                "ratios hold in every future year.</p>"
            ),
            "criteria": [
                f"V^L = {g(VU5)} + {f(PVTS5)} = {f(VL5)}.",
                f"E = V^L − D = {f(E5)}.",
                f"D/V = {f(dv5)} (and D/E = {f(de5)}), the weights needed in e) and f).",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Find the after-tax WACC (hint: work backwards from the free cash flow and "
                "V<sup>L</sup>). Then use the WACC formula to find the cost of equity.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. WACC backwards.</b> V<sup>L</sup> = FCF/(r<sub>wacc</sub> − g), so<br>"
                f"r<sub>wacc</sub> = FCF/V<sup>L</sup> + g = {g(FCF5)}/{f(VL5)} + {f(g5, 6)} = "
                f"{f(rw5 - g5, 6)} + {f(g5, 6)} = <b>{f(rw5, 6)} ({f(100 * rw5)}%)</b></p>"
                f"<p><b>Step 2. Solve the WACC formula for r<sub>E</sub>.</b><br>"
                f"r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − τ<sub>c</sub>)<br>"
                f"{f(rw5, 6)} = {f(ev5, 6)} r<sub>E</sub> + {f(dv5, 6)} × {g(rD5)} × {g(1 - tau5)} = "
                f"{f(ev5, 6)} r<sub>E</sub> + {f(dv5 * rD5 * (1 - tau5), 6)}<br>"
                f"r<sub>E</sub> = ({f(rw5, 6)} − {f(dv5 * rD5 * (1 - tau5), 6)})/{f(ev5, 6)} = "
                f"<b>{f(rE5, 6)} ({f(100 * rE5)}%)</b></p>"
                f"<p><b>Check.</b> MM II gives r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − "
                f"r<sub>D</sub>) = {pc(rU5)} + {f(de5, 6)} × ({pc(rU5)} − {pc(rD5)}) = {f(100 * rE5_mm)}% ✓. "
                "This check is real: if the shields had been discounted at r<sub>D</sub> in c), the "
                f"WACC route would give {f(100 * rE5w)}% and MM II {f(100 * rE5w_mm)}%.</p>"
            ),
            "criteria": [
                f"r_wacc = {g(FCF5)}/{f(VL5)} + {pc(g5)} = {f(100 * rw5)}%. Forgetting to add g is the "
                "trap of the backwards route.",
                f"r_E from the WACC formula with (1 − τ) on r_D only: {f(100 * rE5)}%.",
                f"Uses the weights from d): E/V = {f(ev5)}, D/V = {f(dv5)}.",
                f"(bonus) MM II gives the same {f(100 * rE5_mm)}%, which confirms that the shields were "
                "discounted at the right rate.",
            ],
        },
        {
            "label": "f", "points": 4,
            "body": (
                "<p>Find the equity and debt betas and show that their weighted average equals the "
                "asset beta. Briefly explain why r<sub>wacc</sub> is lower than r<sub>U</sub>.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Betas from CAPM.</b><br>β<sub>D</sub> = ({pc(rD5)} − {pc(rf5)})/"
                f"{pc(mrp5)} = <b>{g(bD5)}</b> (the debt is risky: r<sub>D</sub> &gt; r<sub>f</sub>)<br>"
                f"β<sub>E</sub> = ({f(100 * rE5)}% − {pc(rf5)})/{pc(mrp5)} = <b>{f(bE5)}</b></p>"
                f"<p><b>Step 2. The weighted average.</b> (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = "
                f"{f(ev5)} × {f(bE5)} + {f(dv5)} × {g(bD5)} = {f(ev5 * bE5)} + {f(dv5 * bD5)} = "
                f"<b>{f(bU5)}</b> = β<sub>U</sub> ✓. This is the same test as the MM II check in e), "
                "in beta form: it fails in exactly the same cases (with the shields discounted at "
                f"r<sub>D</sub> the weighted betas sum to {f(bsum_w)}) and adds no new information. "
                "Setting β<sub>D</sub> = 0 would also break it.</p>"
                "<p><b>Why r<sub>wacc</sub> &lt; r<sub>U</sub>.</b> r<sub>U</sub> is the required "
                "return on the assets and ignores how they are financed. Interest is tax deductible, "
                "so every krone of interest saves τ<sub>c</sub> in tax; the WACC method builds that "
                "subsidy into the discount rate instead of adding it as a cash flow: "
                f"r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τ<sub>c</sub>r<sub>D</sub> = {pc(rU5)} − "
                f"{f(dv5)} × {g(tau5)} × {g(rD5)} = {f(100 * rw5)}% ✓.</p>"
            ),
            "criteria": [
                f"β_D = ({pc(rD5)} − {pc(rf5)})/{pc(mrp5)} = {g(bD5)}, not 0: the debt is risky.",
                f"β_E = {f(bE5)} from r_E = {f(100 * rE5)}%.",
                f"Weighted sum {f(ev5)} × {f(bE5)} + {f(dv5)} × {g(bD5)} = {f(bU5)} = β_U.",
                "Explains r_wacc < r_U: the tax deductibility of interest lowers the after-tax cost "
                "of debt, so the tax shield sits in the discount rate; r_U ignores financing.",
                f"(bonus) r_wacc = r_U − (D/V)τ r_D = {f(100 * rw5)}% as a cross-check.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
ex6 = {
    "n": 6, "title": "Real Options", "points": 20, "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 25],
    "body": (
        "<p>Your licence to a small oil field expires after next year. You can extract all the "
        f"oil now or next year. The quick method extracts {g(Q1)} million barrels at USD {g(c1)} per "
        f"barrel; the careful method extracts {g(Q2)} million barrels at USD {g(c2)} per barrel. "
        "The oil is sold at the spot price when extracted and the cost is paid at the same "
        "time.</p>"
        f"<p>Oil trades at USD {g(S6)} today and will rise by {pc(up6)} or fall by {pc(-dn6)} over "
        f"the year. Analysts put the probability of a rise at {pc(pr6)}. Oil is a traded asset "
        f"that costs nothing to hold and pays nothing. The risk-free rate is {pc(rf6)}. "
        "Recommended precision is 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": (
                "<p>If you extract now, which method do you use? What is the field worth if you "
                "extract now?</p>"
            ),
            "solution": (
                f"<p>Quick: {g(Q1)} × ({g(S6)} − {g(c1)}) = <b>{g(nå1)}</b>. Careful: {g(Q2)} × "
                f"({g(S6)} − {g(c2)}) = <b>{g(nå2)}</b> (USD million).</p>"
                f"<p><b>Use the quick method; the field is worth USD {g(nå)} million</b> if you "
                "extract now.</p>"
            ),
            "criteria": [
                f"Quick {g(nå1)}, careful {g(nå2)}.",
                f"Chooses the quick method: USD {g(nå)} million.",
                "Compares values, not volumes: the careful method extracts more barrels but is "
                "worth less at today's price.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>Set up the binomial tree for the oil price. Find the value of each method (oil "
                "minus extraction cost) at each end-point.</p>"
            ),
            "solution": (
                f"<p><b>The tree.</b> Today {g(S6)}; next year {g(S6)} × {g(1 + up6)} = <b>{g(Su)}</b> "
                f"(up) or {g(S6)} × {g(1 + dn6)} = <b>{g(Sd)}</b> (down).</p>"
                "<table class=\"data\"><tr><th>End-point</th><th>Oil price</th><th>Quick method</th>"
                "<th>Careful method</th></tr>"
                f"<tr><td>Up</td><td class=\"n\">{g(Su)}</td><td class=\"n\">{g(Q1)} × ({g(Su)} − "
                f"{g(c1)}) = {g(u1)}</td><td class=\"n\">{g(Q2)} × ({g(Su)} − {g(c2)}) = {g(u2)}</td></tr>"
                f"<tr><td>Down</td><td class=\"n\">{g(Sd)}</td><td class=\"n\">{g(Q1)} × ({g(Sd)} − "
                f"{g(c1)}) = {g(d1_)}</td><td class=\"n\">{g(Q2)} × ({g(Sd)} − {g(c2)}) = {g(d2_)}</td></tr>"
                "</table><p>The values are in USD million at t = 1.</p>"
            ),
            "criteria": [
                f"Tree: {g(S6)} today; {g(Su)} up and {g(Sd)} down (up {pc(up6)}, down {pc(-dn6)}, "
                "not symmetric in price).",
                f"Up: quick {g(u1)}, careful {g(u2)}.",
                f"Down: quick {g(d1_)}, careful {g(d2_)}.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>At which oil price are the two methods equally good? Which method is optimal at "
                "each end-point? Why does the careful method win at high prices?</p>"
            ),
            "solution": (
                f"<p><b>Switching price.</b> {g(Q1)}(P − {g(c1)}) = {g(Q2)}(P − {g(c2)}) ⇒ "
                f"{g(Q2 - Q1)}P = {g(Q2 * c2)} − {g(Q1 * c1)} = {g(extra_cost)} ⇒ "
                f"<b>P* = USD {g(Pstar)}</b></p>"
                f"<p><b>Optimal method.</b> Up: {g(Su)} &gt; {g(Pstar)}, so the <b>careful method, "
                f"{g(Cu)}</b>. Down: {g(Sd)} &lt; {g(Pstar)}, so the <b>quick method, {g(Cd)}</b>. "
                "Both are positive, so you extract in both states.</p>"
                f"<p><b>Why.</b> The careful method buys {g(Q2 - Q1)} million extra barrels for "
                f"{g(extra_cost)} million of extra extraction cost, a break-even price of "
                f"{g(extra_cost)}/{g(Q2 - Q1)} = {g(Pstar)} per extra barrel. Its value rises by "
                f"{g(Q2)} per dollar of oil price against {g(Q1)} for the quick method, so the more "
                "oil is worth, the more the extra barrels pay. The payoff you will get next year, "
                "the better of the two methods (and never below 0), is therefore a convex function "
                "of the oil price: an option.</p>"
            ),
            "criteria": [
                f"Sets the two values equal and solves: P* = ({g(Q2 * c2)} − {g(Q1 * c1)})/"
                f"{g(Q2 - Q1)} = {g(Pstar)}.",
                f"Up: careful ({g(Cu)}). Down: quick ({g(Cd)}).",
                "Explains: the careful method has more barrels (higher exposure to the price) and a "
                "higher cost per barrel, so it wins only when the price is high enough.",
                "(bonus) Noting that the best-of-two payoff is convex in the price, like an option.",
            ],
        },
        {
            "label": "d", "points": 8,
            "body": (
                "<p>What is the present value today of extracting next year? Use the risk-neutral "
                "probability implied by the oil price. Verify with a portfolio of oil and risk-free "
                "bonds that replicates the payoff.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The payoff to value.</b> From c), waiting pays C<sub>u</sub> = "
                f"<b>{g(Cu)}</b> in the up state (careful method) and C<sub>d</sub> = <b>{g(Cd)}</b> in "
                "the down state (quick method), USD million at t = 1.</p>"
                "<p><b>Step 2. The risk-neutral probability from the oil price.</b> Oil is the traded "
                "asset whose price drives the payoff, with S<sub>0</sub> = "
                f"{g(S6)}, S<sub>u</sub> = {g(Su)} and S<sub>d</sub> = {g(Sd)}:<br>"
                f"ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) "
                f"= ({g(1 + rf6)} × {g(S6)} − {g(Sd)})/({g(Su)} − {g(Sd)}) = "
                f"{g((1 + rf6) * S6 - Sd)}/{g(Su - Sd)} = <b>{f(rho)}</b>, so 1 − ρ = {f(1 - rho)}.</p>"
                f"<p><b>Step 3. Value.</b><br>PV = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + "
                f"r<sub>f</sub>) = [{f(rho)} × {g(Cu)} + {f(1 - rho)} × {g(Cd)}]/{g(1 + rf6)} = "
                f"({f(rho * Cu)} + {f((1 - rho) * Cd)})/{g(1 + rf6)} = {f(rho * Cu + (1 - rho) * Cd)}/"
                f"{g(1 + rf6)} = <b>USD {f(PV6)} million</b></p>"
                "<p><b>Step 4. Replication.</b> Hold Δ million barrels of oil and invest B in the "
                "risk-free bond so that the portfolio pays C<sub>u</sub> and C<sub>d</sub>:<br>"
                f"Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) = ({g(Cu)} − "
                f"{g(Cd)})/({g(Su)} − {g(Sd)}) = {g(Cu - Cd)}/{g(Su - Sd)} = <b>{f(Delta)}</b> million "
                f"barrels<br>B = (C<sub>d</sub> − ΔS<sub>d</sub>)/(1 + r<sub>f</sub>) = ({g(Cd)} − "
                f"{f(Delta)} × {g(Sd)})/{g(1 + rf6)} = ({g(Cd)} − {f(Delta * Sd)})/{g(1 + rf6)} = "
                f"<b>{f(Bnd)}</b> (borrow {f(-Bnd)})<br>"
                f"Cost today = ΔS<sub>0</sub> + B = {f(Delta)} × {g(S6)} − {f(-Bnd)} = "
                f"{f(Delta * S6)} − {f(-Bnd)} = <b>{f(PV6_rep)}</b> ✓</p>"
                "<p>The two routes are algebraically the same (ρ and the portfolio are built from "
                "the same three prices), so their agreement catches arithmetic slips only. The "
                "state-by-state check below confirms Δ and B.</p>"
                f"<p><b>Check.</b> Up: {f(Delta)} × {g(Su)} − {f(-Bnd)} × {g(1 + rf6)} = "
                f"{f(Delta * Su)} − {f(-Bnd * (1 + rf6))} = {f(Delta * Su + Bnd * (1 + rf6))} = "
                f"C<sub>u</sub> ✓. Down: {f(Delta * Sd)} − {f(-Bnd * (1 + rf6))} = "
                f"{f(Delta * Sd + Bnd * (1 + rf6))} = C<sub>d</sub> ✓.</p>"
            ),
            "criteria": [
                f"Uses the optimal payoff in each state: {g(Cu)} up (careful) and {g(Cd)} down "
                f"(quick). Locking in the quick method in both states gives {f(feil_rask_begge)}.",
                f"ρ = ({g(1 + rf6)} × {g(S6)} − {g(Sd)})/({g(Su)} − {g(Sd)}) = {f(rho)}, from the "
                "oil price, not from the analysts' 60%.",
                f"PV = [{f(rho)} × {g(Cu)} + {f(1 - rho)} × {g(Cd)}]/{g(1 + rf6)} = {f(PV6)}.",
                f"Replicating portfolio: Δ = {f(Delta)} million barrels and B = {f(Bnd)}, costing "
                f"{f(PV6_rep)}, the same value.",
                "This part carries 8 points: show the probability, the discounting and the "
                "portfolio. Either route alone with a full calculation earns most of the points; "
                "the verification is what completes it.",
            ],
        },
        {
            "label": "e", "points": 3,
            "body": (
                "<p>Do you extract now or wait? What is the option to wait worth? Explain why the "
                f"analysts' {pc(pr6)} was not needed in d) and what goes wrong if you use it "
                "(2-3 sentences).</p>"
            ),
            "solution": (
                f"<p><b>Wait.</b> Waiting is worth {f(PV6)} today against {g(nå)} from extracting now, "
                f"so the option to wait is worth {f(PV6)} − {g(nå)} = <b>USD {f(vent)} million</b>. "
                "Waiting lets you pick the method after you see the price; the flexibility is "
                "worth more than the cost of getting the cash a year later.</p>"
                "<p><b>Why the real probability is not needed (2 sentences).</b> The payoff can be "
                "replicated with oil and bonds, so its price follows from the oil price of "
                f"{g(S6)}, which already reflects the market's view of the up and down moves and the "
                "risk premium on oil. Using the analysts' 60% with the risk-free rate gives "
                f"({g(pr6)} × {g(Cu)} + {g(1 - pr6)} × {g(Cd)})/{g(1 + rf6)} = {f(feil_reell_rf)}, "
                f"which is too high: oil's risk is systematic (its expected return is {pc(r_olje)}, "
                f"above {pc(rf6)}), so a real expectation cannot be discounted at r<sub>f</sub>.</p>"
                f"<p><b>Bonus thought (not required).</b> Even oil's own {pc(r_olje)} gives "
                f"{f(feil_reell_rolje)}, still wrong, because the right to extract is a levered "
                f"position in oil (long {f(Delta)} million barrels, borrowing {f(-Bnd)}) with a "
                f"required return of {f(100 * r_vent)}%. No single rate can be read off in advance; "
                "only ρ gives the price directly.</p>"
            ),
            "criteria": [
                f"Decision: wait; option to wait = {f(PV6)} − {g(nå)} = {f(vent)}.",
                "Why 60% is not needed: the payoff is replicated with oil and bonds; the oil "
                "price already prices the risk, so no real probabilities or risk preferences enter.",
                f"What goes wrong: 60% with r_f gives {f(feil_reell_rf)}, too high, because oil's "
                f"risk is systematic (expected return {pc(r_olje)} > {pc(rf6)}).",
                "(bonus) No single discount rate fixes the real-probability route: the option is a "
                f"levered position in oil, with a required return of about {f(100 * r_vent, 2)}%.",
            ],
        },
    ],
}

SETT = {
    "id": "prove6",
    "kind": "mock",
    "label": "Mock exam 6",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format and closest to the autumn 2024 paper: two "
        "verbal exercises, two capital-structure exercises, a valuation and a real option. New "
        "firms and numbers throughout. Not an official exam: the course has not checked the "
        "solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations that end with a short verbal "
        "question.",
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

if feil:
    print("\nFEIL, prove6.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
