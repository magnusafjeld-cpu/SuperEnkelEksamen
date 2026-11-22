"""Prøveeksamen 10 i FIE402 («bredden», runde 3): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove10_regn.py

Planen står i docs/fie402-prediksjon.md, del 5 (prove10). To teorioppgaver (M&A: kontanter
eller aksjer, og governance: ESG-mål i CEO-kontrakten), deretter IPO regnet (proveny med
5,3 % + 1,7 %, rettferdig pris og kostnaden for gamle eiere, vinnerens forbannelse), tre
gjeldspolitikker for samme firma (konstant D/V, permanent gjeld, rentedekning), obligasjoner
og CDS over to år (forventet avkastning mot yield, risikonøytral misligholdssannsynlighet,
arbitrasje, egenkapital som call og paritet som MM) og et kontantbud med utfall om 6 måneder
(NPV, markedets sannsynlighet, synergiene i kjøperens kurs, fusjonsarbitrasje som forsikring).

Kildene gir typen, tallene og vriene er nye: PS2 E2 (IPO, 10 mill. aksjer, $20, 7 %, $50),
L6 s24–27 (120/80, 10×/2×), L8 s16–18, L14 s17, PS2 E5 og E9, L10 s8–11 (95.24/90.91,
22.7 %), L12 s15, s21–22 og PS4 E1 (Mannesmann) er ikke gjentatt. Ingen BS-regning.

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og sjekker
konsistenskontrollene med assert: kostnaden for gamle eiere på to veier, nullgevinst for
uinformerte ved likevektsprisen, APV = WACC for konstant D/V og rentedekning (feiler med
feil diskonteringsrente), kursen ved kunngjøring av permanent gjeld og tilbakekjøpet til den
nye kursen (selgere og de som blir, får samme kurs; feiler med gammel kurs), sikringen obligasjon + CDS = 1 000 i begge tilstander,
paritet for egenkapitalen og synergiene fra kjøperens kurs = fra samlet markedsverdi.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and», ingen markup i
criteria), poengene (12/12/18/18/20/20, deloppgavene summerer) og lengden (1 000–1 250 ord
oppgavetekst). Er alt rent, skrives prove10.json og prove10_oppgave.md (bare
oppgaveteksten) i samme mappe. Er noe galt, skrives ingenting.

Endret 22.11.2026: del 4e (WACC-metoden og r_E med (1 − τ) ved permanent gjeld) er byttet ut med
kursen ved kunngjøring og tilbakekjøpet. Kurbatov: på eksamen brukes bare formlene på formelarket,
og WACC-spørsmål forutsetter konstant D/E (opptak 10, 41:08 og 1:26:49).

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (diskret diskontering også
for brøkdel av år, PV(TS) med r_D for permanent gjeld og r_U ellers, V^L = (1 + τk)V^U,
dealsannsynlighet med (1 + r_f)^T og priser som går tilbake ved fiasko, ingen BS-regning)
følger docs/fie402-forelesninger-2026.md.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove10.json")
UT_MD = os.path.join(HER, "prove10_oppgave.md")


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


# ================================================= Oppgave 3: IPO regnet
N_old, N_new, P_off = 24.0, 8.0, 45.0       # millioner aksjer, NOK
fee, other = 0.053, 0.017                   # av brutto proveny (L6 s13)
P_day1 = 54.0
gross = N_new * P_off
cost_fee = fee * gross
cost_oth = other * gross
cost_dir = cost_fee + cost_oth
net = gross - cost_dir
assert near(gross, 360) and near(cost_fee, 19.08) and near(cost_oth, 6.12)
assert near(cost_dir, 25.2) and near(net, 334.8)
assert near(net, gross * (1 - fee - other))
feil_bare_fee = gross * (1 - fee)            # glemmer andre kostnader
N_post = N_old + N_new
V_post = N_post * P_day1
on_table = (P_day1 - P_off) * N_new
assert near(V_post, 1728) and near(on_table, 72)
# c) rettferdig pris (PS2 E2-logikken med nye tall)
V_pre = V_post - net
P_fair = V_pre / N_old
assert near(V_pre, 1393.2) and near(P_fair, 58.05)
n_fair = net / P_fair
assert near((V_pre + net) / (N_old + n_fair), P_fair)            # identitet
cost_old = (P_fair - P_day1) * N_old
cost_old2 = N_new * P_day1 - net
assert near(cost_old, 97.2) and near(cost_old, cost_old2)          # to veier
assert near(cost_old, on_table + cost_dir)                        # dekomponering
feil_brutto = (V_post - gross) / N_old                              # brutto i stedet for netto
feil_brutto_kost = (feil_brutto - P_day1) * N_old
assert near(feil_brutto, 57) and near(feil_brutto_kost, 72)
# d) vinnerens forbannelse (L6 s24–27 med nye tall)
H, L = 54.0, 36.0
order = 1000.0
over_H = 4.0
a_H, a_L = order / over_H, order                                  # 250 og 1 000 aksjer
avg_fd = 0.5 * (H / P_off - 1) + 0.5 * (L / P_off - 1)
inv_unin = (a_H + a_L) * P_off
pay_unin = a_H * H + a_L * L
r_unin = pay_unin / inv_unin - 1
assert near(avg_fd, 0) and near(a_H, 250) and near(inv_unin, 56250) and near(pay_unin, 49500)
assert near(r_unin, -0.12)
andel_daarlig = a_L / (a_H + a_L)
assert near(andel_daarlig, 0.8)
# e) likegyldighetsprisen og underprisingen den krever
P_star = pay_unin / (a_H + a_L)
assert near(P_star, 39.6)
assert near(a_H * (H - P_star) + a_L * (L - P_star), 0)          # nullgevinst
avg_fd_star = 0.5 * (H / P_star - 1) + 0.5 * (L / P_star - 1)
rH_star, rL_star = H / P_star - 1, L / P_star - 1
gap_star = (0.5 * H + 0.5 * L) - P_star                           # under snittverdien 45
assert near(gap_star, 5.4) and near(gap_star / 45, 0.12)
feil_snitt = 0.5 * H + 0.5 * L                                    # «betaler snittet» = 45
vis("Oppgave 3", gross=gross, cost_dir=cost_dir, net=net, V_post=V_post, on_table=on_table,
    V_pre=V_pre, P_fair=P_fair, n_fair=n_fair, cost_old=cost_old, r_unin=r_unin,
    P_star=P_star, avg_fd_star=avg_fd_star, rH=rH_star, rL=rL_star, feil_brutto=feil_brutto)

# ================================== Oppgave 4: tre gjeldspolitikker for samme firma
FCF4 = 90.0                    # evig, ingen vekst
bU4, rf4, rm4, tau4, rD4 = 1.2, 0.03, 0.08, 0.22, 0.05
mrp4 = rm4 - rf4
rU4 = rf4 + bU4 * mrp4
VU4 = FCF4 / rU4
assert near(rU4, 0.09) and near(VU4, 1000)
# Politikk 1: konstant D/V = 30 %
d1 = 0.30
rE1 = rU4 + d1 / (1 - d1) * (rU4 - rD4)
rw1 = (1 - d1) * rE1 + d1 * rD4 * (1 - tau4)
assert near(rw1, rU4 - d1 * tau4 * rD4) and near(rw1, 0.0867)
vist_sum([(1 - d1) * rE1, d1 * rD4 * (1 - tau4)], rw1, 6, 4)
VL1 = FCF4 / rw1
D1 = d1 * VL1
int1 = rD4 * D1
TS1 = tau4 * int1
PVTS1 = TS1 / rU4
assert near(VU4 + PVTS1, VL1)                         # ekte kontroll: APV = WACC
PVTS1_feil = TS1 / rD4                                # diskontert med r_D: feil her
assert abs(VU4 + PVTS1_feil - VL1) > 10
feil_rw1_uten_skatt = (1 - d1) * rE1 + d1 * rD4       # glemt (1 − τ): r_U, V = V^U
assert near(feil_rw1_uten_skatt, rU4)
# Politikk 2: permanent gjeld 300
D2 = 300.0
int2 = rD4 * D2
TS2 = tau4 * int2
PVTS2 = TS2 / rD4
assert near(PVTS2, tau4 * D2) and near(PVTS2, 66)
VL2 = VU4 + PVTS2
E2 = VL2 - D2
PVTS2_feil = TS2 / rU4                                # diskontert med r_U: feil her
VL2_feil = VU4 + PVTS2_feil
# e) politikk 2 kunngjort av et firma uten gjeld: kurs ved kunngjøring og tilbakekjøp
N4 = 40.0                                             # millioner aksjer i dag
P0_4 = VU4 / N4
P_kunn4 = VL2 / N4                                    # τD prises med en gang
n_tk4 = D2 / P_kunn4                                  # tilbakekjøp til ny kurs
N_igjen4 = N4 - n_tk4
P_etter4 = E2 / N_igjen4
assert near(P0_4, 25) and near(P_kunn4, 26.65) and near(P_etter4, P_kunn4)   # selgere = de som blir
assert near(P_kunn4 - P0_4, PVTS2 / N4)
n_feil4 = D2 / P0_4                                   # gammel kurs: den største feilen
P_feil4 = E2 / (N4 - n_feil4)
assert near(n_feil4, 12) and abs(P_feil4 - P0_4) > 2  # kontrollen feiler
# Politikk 3: rentedekning k = 20 %
k3 = 0.20
VL3 = (1 + tau4 * k3) * VU4
PVTS3 = VL3 - VU4
int3 = k3 * FCF4
D3 = int3 / rD4
assert near(VL3, 1044) and near(int3, 18) and near(D3, 360)
dv3 = D3 / VL3
rw3 = rU4 - dv3 * tau4 * rD4
assert near(FCF4 / rw3, VL3)                          # ekte kontroll (PS2 E5)
assert near(PVTS3, tau4 * int3 / rU4)                 # skjoldet følger FCF: r_U
# f) rangering og verdi per krone gjeld
per1, per2, per3 = PVTS1 / D1, PVTS2 / D2, PVTS3 / D3
assert near(per2, tau4) and near(per1, tau4 * rD4 / rU4) and near(per3, tau4 * rD4 / rU4)
assert VL2 > VL3 > VL1 and D3 > D1 > D2                # mest gjeld gir ikke høyest verdi
vis("Oppgave 4", rU=rU4, VU=VU4, rE1=rE1, rw1=rw1, VL1=VL1, D1=D1, TS1=TS1, PVTS1=PVTS1,
    PVTS1_feil=PVTS1_feil, VL2=VL2, VL2_feil=VL2_feil, E2=E2, P_kunn=P_kunn4, n_tk=n_tk4,
    N_igjen=N_igjen4, P_etter=P_etter4, P_feil=P_feil4,
    VL3=VL3, D3=D3, dv3=dv3, rw3=rw3, per=(per1, per2, per3))

# ================================== Oppgave 5: obligasjoner, CDS og paritet
K5, T5 = 1000.0, 2.0           # NOK mill., år
rf5, y5 = 0.03, 0.08
pd5, rec5 = 0.09, 0.45
V5, cds_q = 1250.0, 70.0       # eiendeler i dag, meglerens CDS-pris
LGD = (1 - rec5) * K5
assert near(LGD, 550)
PVK = K5 / (1 + rf5) ** T5
D5 = K5 / (1 + y5) ** T5
EP5 = (1 - pd5) * K5 + pd5 * rec5 * K5
ER2 = EP5 / D5
er5 = ER2 ** (1 / T5) - 1
assert near(EP5, 950.5) and rf5 < er5 < y5
feil_er_uten_rot = ER2 - 1                                # 2-årsavkastning som årlig
CE5 = D5 * (1 + rf5) ** T5
q5 = (K5 - CE5) / LGD
assert pd5 < q5 < 1
assert near(((1 - q5) * K5 + q5 * rec5 * K5) / (1 + rf5) ** T5, D5)   # identitet
feil_q_ett_aar = (K5 - D5 * (1 + rf5)) / LGD             # bare ett års rente
CDS5 = q5 * LGD / (1 + rf5) ** T5
assert near(CDS5, PVK - D5)                               # identitet: D + P = PV(K)
vist_sum([D5, CDS5], PVK, 4)
# sikringen tilstand for tilstand (ekte kontroll av at CDS-en er riktig spesifisert)
for utbetaling in (K5 + 0.0, rec5 * K5 + LGD):
    assert near(utbetaling, K5)
arb = PVK - (D5 + cds_q)
assert arb > 0
feil_cds_reell = pd5 * LGD / (1 + rf5) ** T5              # reell sannsynlighet med r_f
# e) egenkapital som call og paritet
E5 = V5 - D5
C5 = V5 - PVK + CDS5                                      # C(K) = V − PV(K) + P(K)
assert near(E5, C5)                                       # identitet
# risikonøytral forventet V_T gitt ikke mislighold (bare for kontroll av at V er mulig)
VT_nd = (V5 * (1 + rf5) ** T5 - q5 * rec5 * K5) / (1 - q5)
assert VT_nd > K5
vis("Oppgave 5", PVK=PVK, D=D5, EP=EP5, ER2=ER2, er=er5, feil_er=feil_er_uten_rot, CE=CE5,
    q=q5, feil_q=feil_q_ett_aar, CDS=CDS5, arb=arb, feil_cds_reell=feil_cds_reell, E=E5,
    VT_nd=VT_nd)

# ================================== Oppgave 6: kontantbud med utfall om 6 måneder
NA, PA0, NB, PB0 = 80.0, 120.0, 30.0, 64.0
cash6, S_mgmt = 80.0, 780.0
T6, rf6 = 0.5, 0.03
PA1, PB1 = 117.0, 76.5
A6, Tv6, P6 = NA * PA0, NB * PB0, NB * cash6
assert near(A6, 9600) and near(Tv6, 1920) and near(P6, 2400)
NPV_B = P6 - Tv6
NPV_A = S_mgmt - (P6 - Tv6)
assert near(NPV_B, 480) and near(NPV_A, 300) and near(NPV_A + NPV_B, S_mgmt)
P_max = (Tv6 + S_mgmt) / NB
assert near(P_max, 90)
# b) arbitrasjøren og markedets sannsynlighet
r_succ = cash6 / PB1 - 1
r_succ_ann = (cash6 / PB1) ** (1 / T6) - 1
r_fail = PB0 / PB1 - 1
gf = (1 + rf6) ** T6
CE6 = PB1 * gf
p6 = (CE6 - PB0) / (cash6 - PB0)
assert 0 < p6 < 1
assert near(p6 * cash6 + (1 - p6) * PB0, CE6)            # identitet
spread = cash6 - PB1
feil_p_uten_rente = (PB1 - PB0) / (cash6 - PB0)          # «plugger» 86
feil_p_helt_aar = (PB1 * (1 + rf6) - PB0) / (cash6 - PB0)
# c) synergiene i kjøperens kurs
CEA = PA1 * gf
PA_succ = (CEA - (1 - p6) * PA0) / p6
S_mkt = NA * PA_succ - (A6 + Tv6 - P6)
NPV_A_mkt = S_mkt - (P6 - Tv6)
assert NPV_A_mkt < 0 < S_mkt < P6 - Tv6
S_mkt2 = ((NA * PA1 + NB * PB1) * gf - (A6 + Tv6)) / p6  # samlet markedsverdi (identitet)
assert near(S_mkt, S_mkt2)
PA_null = PA0 / gf                                        # kurs med NPV_A = 0
assert PA1 < PA_null < PA0
S_gevinst = NA * (PA1 - PA0) * gf / p6 + (P6 - Tv6)       # alternativ lesning (kurven endring)
assert S_gevinst < S_mkt                                  # samme fortegn på NPV_A
# toleranse (Kurbatovs nøkler: «reasonable approximations are ok»): enkel halvårsrente
gf_enkel = 1 + rf6 * T6
p6_enkel = (PB1 * gf_enkel - PB0) / (cash6 - PB0)
PA_succ_enkel = (PA1 * gf_enkel - (1 - p6_enkel) * PA0) / p6_enkel
S_enkel = NA * PA_succ_enkel - (A6 + Tv6 - P6)
assert abs(p6_enkel - p6) < 0.001 and abs(S_enkel - S_mkt) < 2
# d) forsikringen
stake = 0.08
vis("Oppgave 6", NPV_A=NPV_A, NPV_B=NPV_B, P_max=P_max, r_succ=r_succ, r_succ_ann=r_succ_ann,
    r_fail=r_fail, gf=gf, CE=CE6, p=p6, feil_p=(feil_p_uten_rente, feil_p_helt_aar),
    CEA=CEA, PA_succ=PA_succ, S_mkt=S_mkt, NPV_A_mkt=NPV_A_mkt, PA_null=PA_null,
    S_gevinst=S_gevinst)


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "M&A", "points": 12, "topic": "Mergers and acquisitions: method of payment",
    "chapters": [26],
    "body": (
        "<p>Brekkestø Software ASA, a listed company, has agreed to buy Mørkved Analyse AS, a "
        "private data-analytics firm owned by its two founders, for about NOK 2 billion. The board "
        "must still decide whether to pay in cash or in newly issued Brekkestø shares.</p>"
        "<p>For each of the four facts below, say whether it points towards paying in cash, in "
        "shares or both and explain why. Keep explanations short, 1-2 sentences per fact "
        "(3 points each).</p>"
        "<ol>"
        "<li>Brekkestø holds NOK 200 million in cash and its loan covenants allow little new "
        "debt.</li>"
        "<li>Brekkestø's managers are convinced that the market undervalues Brekkestø's "
        "shares.</li>"
        "<li>Mørkved's value rests on two large clients. Nobody knows whether the promised "
        "synergies will materialise.</li>"
        "<li>Both founders want to retire. A cash payment is taxed as a capital gain at once; with "
        "shares the tax is deferred until they sell.</li>"
        "</ol>"
    ),
    "solution": (
        "<p>Four facts, 1-2 sentences each, 3 points each. The facts follow Kurbatov's list for "
        "cash or stock (lecture 12): the acquirer's liquidity and debt capacity, information "
        "asymmetry, uncertainty about synergies and stand-alone values, the sellers' exit and "
        "taxes.</p>"
        "<p><b>1. Shares.</b> Paying NOK 2 billion in cash would take ten times the cash Brekkestø "
        "holds plus new debt that its covenants do not allow, so a cash deal would drain its "
        "liquidity or force a costly equity issue first. Paying in shares saves both cash and "
        "debt capacity.</p>"
        "<p><b>2. Cash.</b> If Brekkestø's shares are worth more than their price, every new "
        "share handed to the founders gives away more than the agreed price, so paying in shares "
        "transfers value from Brekkestø's shareholders to the sellers. A share offer would also "
        "signal that management thinks its shares are overvalued and push the price down; paying "
        "cash avoids both.</p>"
        "<p><b>3. Shares.</b> With shares the founders become owners of the combined firm and "
        "bear part of the loss if the clients leave or the synergies fail, so Brekkestø's cost "
        "falls with a bad outcome; with cash Brekkestø bears it all. The founders also know their "
        "clients best; their willingness to take shares is a credible signal that Mørkved is "
        "worth the price.</p>"
        "<p><b>4. Both.</b> The wish to retire points to cash, since shares keep the founders' "
        "wealth tied to Brekkestø, while the tax deferral points to shares; a mix of cash and "
        "shares meets both wishes.</p>"
        "<p><b>Also accepted.</b> For 1: Brekkestø could borrow or issue shares first, but that "
        "is the same as paying in shares or moving towards distress. For 2: under-valued shares "
        "make the true cost of a share offer higher than its market value (the formula sheet's "
        "y(A + T + S) − T measured at the true price). For 4: a final choice of cash or shares "
        "earns full marks if both sides are named and the choice is justified, for example shares "
        "that the founders may sell gradually.</p>"
        "<p><b>Not accepted.</b> A direction with no mechanism («cash is simpler»). For 3, «cash "
        "because the synergies are uncertain» gets the direction wrong: with cash the acquirer "
        "carries all of the synergy risk.</p>"
    ),
    "criteria": [
        "Four facts, each worth 3 points and graded separately: the direction (cash or shares) "
        "and the mechanism behind it.",
        "1: shares. Cash is scarce and the covenants block new debt, so a cash deal would drain "
        "liquidity or need an equity issue first.",
        "2: cash. Paying with undervalued shares gives the sellers more than the agreed price, "
        "while a share offer signals that management thinks its shares are overvalued.",
        "3: shares. The sellers then share the risk that the clients leave or the synergies "
        "fail; with cash the acquirer bears it all. The sellers' private information is a "
        "second, accepted mechanism.",
        "4: both, with both sides named (exit points to cash, the tax deferral to shares), for "
        "example a mix. The question offers «both», so one side only earns at most 2 points.",
        "A direction without a mechanism earns at most 1 point per fact. 1-2 sentences per fact.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance",
    "chapters": [27],
    "body": (
        "<p>The board of Skjoldvik Offshore, a listed oil-services company with dispersed "
        "ownership, proposes a new bonus plan for its CEO. 60% of the bonus will depend on the "
        "three-year total shareholder return and 40% on three targets set by the board: cut "
        "carbon emissions per unit of output by 30% within three years, raise the "
        "employee-satisfaction score from 62 to 70 and have no serious accidents.</p>"
        "<p>a) Give two distinct arguments why these targets can benefit the shareholders "
        "(6 points).</p>"
        "<p>b) Give two distinct ways in which they can harm the shareholders (6 points).</p>"
        "<p>Keep explanations short, 2-3 sentences per argument (3 points each).</p>"
    ),
    "solution": (
        "<p>Four arguments, 2-3 sentences each, 3 points each. The setting is the "
        "shareholder-or-stakeholder question from lectures 1 and 13 applied to the CEO's "
        "contract.</p>"
        "<p><b>a) Why the targets can benefit the shareholders.</b></p>"
        "<p><b>1. They counter short-termism.</b> Carbon costs (taxes, quotas, clients' "
        "demands), accidents and staff turnover hit the cash flows years after a three-year "
        "bonus is paid, so a CEO paid on returns alone can cut corners on safety and emissions to "
        "lift short-run results. Targets on these measures tie pay to risks that matter for the "
        "firm's long-run value.</p>"
        "<p><b>2. They separate effort from luck.</b> The three-year shareholder return of an "
        "oil-services firm swings with the oil price, which the CEO does not control, so a bonus "
        "tied to it alone rewards luck as much as effort. Emissions, safety and staff morale are "
        "outcomes the CEO does steer, so targets on them measure the CEO's effort more precisely and "
        "make the contract a better incentive (lecture 13: which performance metrics to set).</p>"
        "<p><b>b) How the targets can harm the shareholders.</b></p>"
        "<p><b>3. Too many missions weaken accountability.</b> With goals that can conflict with "
        "profit, the CEO can explain away poor returns by pointing to the targets met: 40% "
        "of the bonus can be earned while value falls. This is the classic objection to the "
        "stakeholder view: «too many missions, conflicting interests» (Friedman: social goals "
        "are spent with the owners' money).</p>"
        "<p><b>4. The CEO games the measure.</b> Like an EPS target, a KPI makes the manager "
        "manage the number rather than the goal: selling the most polluting vessels to another "
        "owner cuts emissions per unit without cutting emissions, contracting risky work out "
        "keeps accidents off the books and staff can be pressed before the survey. The bonus is "
        "paid, the value is not created.</p>"
        "<p><b>Other arguments that score equally.</b> For a): lower costs and risk (safe "
        "operations and satisfied staff mean fewer stoppages, fines, lawsuits and hires); "
        "investor, lender and client demand (access to ESG mandates, a lower cost of capital). "
        "For b): soft targets set by a captive board are a disguised pay rise; "
        "money spent beyond what creates value moves wealth from shareholders to other "
        "stakeholders, while shareholders can pursue social goals themselves.</p>"
    ),
    "criteria": [
        "Four arguments, two in a) and two in b), each worth 3 points and graded separately.",
        "a) Accepted: the targets counter short-termism because these risks hit cash flows after "
        "the bonus period; they separate effort from luck, since the return swings with the oil "
        "price while the targets measure what the CEO steers (lecture 13); safety and staff "
        "satisfaction lower costs, stoppages and lawsuits; access to ESG-minded investors, "
        "lenders and clients (lower cost of capital).",
        "b) Accepted: too many missions weaken accountability and let the CEO excuse poor returns "
        "(Friedman, «too many missions, conflicting interests»); gaming the measure (selling "
        "dirty assets, outsourcing risky work, managing the survey); soft targets from a friendly "
        "board as a disguised pay rise; value moved from shareholders to other stakeholders.",
        "The two arguments within a part must rest on different mechanisms. In a), «counters "
        "short-termism» and «rewards long-run value» are one argument, while short-termism and "
        "effort versus luck are two. In b), «gaming» and «selling dirty assets» are one.",
        "Each argument must say why it matters for the shareholders. «It is good for the "
        "climate» earns at most 1 point in a).",
        "2-3 sentences per argument. A bare label (stakeholder theory, KPI) earns at most "
        "1 point.",
    ],
}

# ---------------------------------------------------------------- Oppgave 3
ex3 = {
    "n": 3, "title": "Security issues", "points": 18,
    "topic": "IPO costs and underpricing", "chapters": [14],
    "body": (
        f"<p>Tarevik Bioteknologi AS, a seaweed-biotech firm owned by its founders and a venture "
        f"fund, goes public. It has {g(N_old)} million shares and sells {g(N_new)} million new "
        f"shares in an IPO at NOK {g(P_off)} per share. The underwriters charge a fee of "
        f"{pc(fee)} of the gross proceeds and other expenses are {pc(other)} of the gross "
        f"proceeds. On the first day of trading the share closes at NOK {g(P_day1)}.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>How much does Tarevik raise, net of all costs?</p>",
            "solution": (
                f"<p><b>Gross proceeds.</b> {g(N_new)} million × NOK {g(P_off)} = NOK {g(gross)} "
                f"million.</p>"
                f"<p><b>Costs.</b> Fee {pc(fee)} × {g(gross)} = {f(cost_fee, 2)}; other expenses "
                f"{pc(other)} × {g(gross)} = {f(cost_oth, 2)}; together {pc(fee + other)} = "
                f"{f(cost_dir, 1)}.</p>"
                f"<p><b>Net proceeds</b> = {g(gross)} − {f(cost_dir, 1)} = <b>NOK {f(net, 1)} "
                f"million</b>, or {g(gross)} × (1 − {pc(fee + other)}) = {f(net, 1)} ✓.</p>"
            ),
            "criteria": [
                f"Gross proceeds = {g(N_new)} × {g(P_off)} = {g(gross)} million: only the new "
                "shares raise money.",
                f"Both cost items are taken on the gross proceeds: {f(cost_fee, 2)} + "
                f"{f(cost_oth, 2)} = {f(cost_dir, 1)}.",
                f"Net proceeds = NOK {f(net, 1)} million.",
                f"Deducting only the {pc(fee)} fee gives {f(feil_bare_fee, 2)} and is the error.",
            ],
        },
        {
            "label": "b", "points": 2,
            "body": "<p>What is Tarevik's market value at the end of the first day?</p>",
            "solution": (
                f"<p><b>Market value.</b> After the IPO there are {g(N_old)} + {g(N_new)} = "
                f"{g(N_post)} million shares: V = {g(N_post)} × {g(P_day1)} = <b>NOK {g(V_post)} "
                f"million</b>.</p>"
                f"<p>The IPO investors paid {g(gross)} for shares worth {g(N_new * P_day1)} at the "
                f"close: ({g(P_day1)} − {g(P_off)}) × {g(N_new)} = {g(on_table)} was left on the "
                "table. It returns in c).</p>"
            ),
            "criteria": [
                f"Counts all {g(N_post)} million shares: V = {g(N_post)} × {g(P_day1)} = "
                f"{g(V_post)} million. Using {g(N_old)} million gives {g(N_old * P_day1)} and is "
                "the error.",
                f"Uses the closing price {g(P_day1)}, not the offer price {g(P_off)}: "
                f"{g(N_post)} × {g(P_off)} = {g(N_post * P_off)} is the error.",
                "One line of calculation is enough for 2 points.",
            ],
        },
        {
            "label": "c", "points": 5,
            "body": (
                "<p>Assume that the first-day closing price is the fair value. If Tarevik could "
                "have sold new shares directly to investors at a fair price, with no fees and no "
                "underpricing, raising the same net amount as in a), what would the price per "
                "share have been? What did the IPO cost Tarevik's original owners in total?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Value of the firm without the new cash.</b> The first-day value "
                f"includes the net cash raised: {g(V_post)} − {f(net, 1)} = NOK {f(V_pre, 1)} "
                f"million. This belongs to the original owners.</p>"
                f"<p><b>Step 2. Fair price.</b> Selling at a fair price transfers no value, so the "
                f"price is the original owners' value per share: {f(V_pre, 1)}/{g(N_old)} = "
                f"<b>NOK {f(P_fair, 2)}</b>.</p>"
                f"<p>(An identity: raising {f(net, 1)} at {f(P_fair, 2)} takes "
                f"{f(n_fair)} million new shares; {g(V_post)}/({g(N_old)} + {f(n_fair)}) = "
                f"{f(P_fair, 2)} ✓.)</p>"
                f"<p><b>Step 3. Cost to the original owners.</b> Their {g(N_old)} million shares "
                f"are worth {g(P_day1)} instead of {f(P_fair, 2)}: ({f(P_fair, 2)} − {g(P_day1)}) × "
                f"{g(N_old)} = <b>NOK {f(cost_old, 1)} million</b>.</p>"
                f"<p><b>Check (a decomposition, so an identity).</b> The new shares were worth "
                f"{g(N_new)} × {g(P_day1)} = {g(N_new * P_day1)} at the close but brought in only "
                f"{f(net, 1)}: {g(N_new * P_day1)} − {f(net, 1)} = {f(cost_old2, 1)} = underpricing "
                f"{g(on_table)} + direct costs {f(cost_dir, 1)} ✓. Underpricing is the larger "
                "cost.</p>"
            ),
            "criteria": [
                f"Subtracts the net proceeds (not the gross) from the first-day value: {g(V_post)} − "
                f"{f(net, 1)} = {f(V_pre, 1)}.",
                f"Fair price = {f(V_pre, 1)}/{g(N_old)} = NOK {f(P_fair, 2)}, divided by the "
                "original shares only.",
                f"Total cost = ({f(P_fair, 2)} − {g(P_day1)}) × {g(N_old)} = NOK {f(cost_old, 1)} "
                f"million. The direct route, {g(N_new)} × {g(P_day1)} − {f(net, 1)} or underpricing "
                f"{g(on_table)} + direct costs {f(cost_dir, 1)}, earns full marks for the cost.",
                f"Taking NOK {g(P_day1)} as the fair price is the error: without fees and "
                f"underpricing the owners would sell only {f(n_fair)} million shares, so each share "
                f"would be worth {f(P_fair, 2)}.",
                f"Using the gross proceeds gives a fair price of {g(feil_brutto)} and a cost of "
                f"{g(feil_brutto_kost)}: the direct costs disappear.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                f"<p>Many IPOs are like Tarevik's: priced at NOK {g(P_off)} and worth NOK {g(H)} or "
                f"NOK {g(L)} at the end of the first day, with equal probability. Informed "
                f"investors bid only for the good ones. An uninformed investor orders "
                f"{g(order)} shares in every IPO; she receives {g(a_H)} shares in a good IPO "
                f"({g(over_H)} times oversubscribed) and all {g(a_L)} in a bad one. What is her "
                "average return?</p>"
            ),
            "solution": (
                f"<p><b>For comparison: the average first-day return.</b> Half the IPOs rise to {g(H)} "
                f"({pc(H / P_off - 1)}) and half fall to {g(L)} ({pc(L / P_off - 1)}): average "
                f"= <b>{pc(avg_fd)}</b>. Priced at the average value, the IPOs are not "
                "underpriced on average.</p>"
                f"<p><b>The uninformed investor.</b> Per good and bad IPO she buys {g(a_H)} + "
                f"{g(a_L)} = {g(a_H + a_L)} shares for {g(a_H + a_L)} × {g(P_off)} = "
                f"{g(inv_unin)} and they are worth {g(a_H)} × {g(H)} + {g(a_L)} × {g(L)} = "
                f"{g(a_H * H)} + {g(a_L * L)} = {g(pay_unin)}. Return = {g(pay_unin)}/{g(inv_unin)} "
                f"− 1 = <b>{pc(r_unin)}</b>.</p>"
                f"<p><b>Why.</b> She is rationed in the good IPOs and filled in the bad ones, so "
                f"{pc(andel_daarlig)} of her shares are in IPOs that fall: the winner's curse. "
                "Expecting this, she would not take part at this price.</p>"
            ),
            "criteria": [
                f"Weights the uninformed investor's return by her allocations, {g(a_H)} and "
                f"{g(a_L)} shares: ({g(a_H)} × {g(H - P_off)} − {g(a_L)} × {g(P_off - L)})/"
                f"{g(inv_unin)} = {pc(r_unin)}.",
                f"Averaging the two IPO returns with equal weights for her as well ({pc(avg_fd)}) "
                "is the error the exercise is built on.",
                "(bonus) Names the mechanism: rationed in good IPOs, fully filled in bad ones "
                "(the winner's curse).",
                "Show the calculation with the allocations; the bare number earns half.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>With the same allocations, at what offer price would uninformed investors just "
                "break even? What average first-day return would the IPOs then show?</p>"
            ),
            "solution": (
                f"<p><b>Break-even price.</b> She breaks even when {g(a_H)}({g(H)} − P) + "
                f"{g(a_L)}({g(L)} − P) = 0, so P = ({g(a_H * H)} + {g(a_L * L)})/{g(a_H + a_L)} = "
                f"<b>NOK {f(P_star, 2)}</b>: the value of a share weighted by what she actually "
                "receives.</p>"
                f"<p><b>Average first-day return.</b> Good IPOs rise to {g(H)} "
                f"({pc(rH_star)}), bad ones fall to {g(L)} ({pc(rL_star)}): average = "
                f"<b>{pc(avg_fd_star)}</b>. Underpricing on average is what it takes to keep the "
                "uninformed investors in the market.</p>"
                f"<p><b>Check (an identity: it restates the break-even condition).</b> At "
                f"{f(P_star, 2)} her profit is {g(a_H)} × {f(H - P_star, 2)} − "
                f"{g(a_L)} × {f(P_star - L, 2)} = {g(a_H * (H - P_star))} − "
                f"{g(a_L * (P_star - L))} = 0 ✓.</p>"
                f"<p><b>Who bears it (not asked).</b> The pre-IPO owners of the issuing firms: they sell "
                f"shares worth {g(feil_snitt)} on average for {f(P_star, 2)}, "
                f"{pc(gap_star / feil_snitt)} below value, as Tarevik's owners did in c).</p>"
            ),
            "criteria": [
                f"Sets her profit to zero with her allocations: P = ({g(a_H * H)} + "
                f"{g(a_L * L)})/{g(a_H + a_L)} = NOK {f(P_star, 2)}.",
                f"Average first-day return at that price = 0.5 × {pc(rH_star)} + 0.5 × "
                f"({pc(rL_star)}) = {pc(avg_fd_star)}.",
                "(bonus) Underpricing on average is what keeps uninformed investors in the market; "
                "the pre-IPO owners pay for it.",
                f"Answering {g(feil_snitt)} (the average value) repeats the error from d).",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 4
ex4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18,
    "topic": "Debt policies, APV and WACC", "chapters": [7, 17, 18, 19],
    "body": (
        f"<p>Femund Fjernvarme AS, a district-heating company, expects free cash flow of NOK "
        f"{g(FCF4)} million a year forever, with no growth. Its asset beta is {g(bU4)}, the "
        f"risk-free rate is {pc(rf4)}, the expected market return is {pc(rm4)} and the tax rate "
        f"is {pc(tau4)}. Femund can borrow at {pc(rD4)} under each of the three debt policies "
        "below. Recommended precision is 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": "<p>What would Femund be worth with no debt?</p>",
            "solution": (
                f"<p><b>Step 1. Unlevered cost of capital.</b> r<sub>U</sub> = {pc(rf4)} + "
                f"{g(bU4)} × ({pc(rm4)} − {pc(rf4)}) = <b>{pc(rU4)}</b></p>"
                f"<p><b>Step 2. Perpetuity.</b> V<sup>U</sup> = {g(FCF4)}/{g(rU4)} = "
                f"<b>NOK {g(VU4)} million</b></p>"
            ),
            "criteria": [
                f"r_U = {pc(rf4)} + {g(bU4)} × {pc(mrp4)} = {pc(rU4)}, with the market risk premium "
                f"{pc(mrp4)}, not {pc(rm4)}.",
                f"V^U = {g(FCF4)}/{g(rU4)} = NOK {g(VU4)} million as a perpetuity without growth.",
                "The asset beta gives r_U directly: no unlevering is needed.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>Policy 1: Femund keeps its debt at 30% of its market value at all times. Find "
                "its levered value with the WACC method.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Cost of equity</b> (MM II, constant D/V): r<sub>E</sub> = "
                f"{pc(rU4)} + (0.3/0.7)({pc(rU4)} − {pc(rD4)}) = {pc(rE1)}</p>"
                f"<p><b>Step 2. After-tax WACC.</b> r<sub>wacc</sub> = 0.7 × {pc(rE1)} + 0.3 × "
                f"{pc(rD4)} × (1 − {g(tau4)}) = {f(100 * (1 - d1) * rE1)}% + "
                f"{f(100 * d1 * rD4 * (1 - tau4))}% = <b>{pc(rw1)}</b>, the same as r<sub>U</sub> − "
                f"(D/V)τr<sub>D</sub> = {pc(rU4)} − 0.3 × {g(tau4)} × {pc(rD4)}.</p>"
                f"<p><b>Step 3. Value.</b> V<sup>L</sup> = {g(FCF4)}/{g(rw1)} = "
                f"<b>NOK {f(VL1)} million</b>, with debt today 0.3 × {f(VL1)} = {f(D1)}.</p>"
                f"<p><b>Check (APV: a fixed point that catches a wrong rate on the tax shield).</b> "
                f"Interest {pc(rD4)} × {f(D1)} = "
                f"{f(int1)}, tax shield {g(tau4)} × {f(int1)} = {f(TS1)} a year. The debt moves "
                f"with the firm's value, so the shield carries business risk and is discounted at "
                f"r<sub>U</sub>: {f(TS1)}/{g(rU4)} = {f(PVTS1)}, so {g(VU4)} + {f(PVTS1)} = "
                f"{f(VL1)} ✓. Discounting at r<sub>D</sub> would give {f(PVTS1_feil, 2)} and break "
                "the check.</p>"
            ),
            "criteria": [
                f"r_E = {pc(rU4)} + (0.3/0.7) × {pc(rU4 - rD4)} = {pc(rE1)} (or directly r_wacc = "
                "r_U − dτr_D).",
                f"r_wacc = 0.7 × {pc(rE1)} + 0.3 × {pc(rD4)} × 0.78 = {pc(rw1)}.",
                f"V^L = {g(FCF4)}/{g(rw1)} = NOK {f(VL1)} million.",
                f"Forgetting (1 − τ) gives r_wacc = {pc(feil_rw1_uten_skatt)} and V^L = {g(VU4)}: "
                "the tax shield is lost.",
                f"(bonus) The APV check: PV(TS) = {f(TS1)}/{g(rU4)} = {f(PVTS1)}.",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": (
                "<p>Policy 2: Femund borrows NOK 300 million today and keeps exactly this debt "
                "forever. Find its levered value. Which rate do you discount the tax shields at "
                "and why?</p>"
            ),
            "solution": (
                f"<p><b>Tax shield.</b> Interest {pc(rD4)} × {g(D2)} = {g(int2)} a year; tax shield "
                f"{g(tau4)} × {g(int2)} = {g(TS2)} a year forever.</p>"
                f"<p><b>Rate: r<sub>D</sub>.</b> The debt is fixed in advance and does not move "
                f"with the firm's cash flows, so the tax shields are as risky as the interest "
                f"payments themselves: PV(TS) = {g(TS2)}/{g(rD4)} = τD = {g(tau4)} × {g(D2)} = "
                f"{g(PVTS2)}.</p>"
                f"<p><b>APV.</b> V<sup>L</sup> = {g(VU4)} + {g(PVTS2)} = <b>NOK {g(VL2)} "
                f"million</b></p>"
            ),
            "criteria": [
                f"PV(TS) = τD = {g(tau4)} × {g(D2)} = {g(PVTS2)} and V^L = {g(VL2)}.",
                "Discounts at r_D because the debt is predetermined: the shields are as risky as "
                "the debt, not as the firm.",
                f"Discounting at r_U gives {f(PVTS2_feil, 4)} and V^L = {f(VL2_feil, 4)}: the "
                "classic error for this policy.",
            ],
        },
        {
            "label": "d", "points": 3,
            "body": (
                "<p>Policy 3: Femund sets its interest payments each year equal to 20% of that "
                "year's free cash flow. Find its levered value and the debt it holds today.</p>"
            ),
            "solution": (
                f"<p><b>Value.</b> Interest = k × FCF with k = {g(k3)}, so the tax shields are "
                f"τk × FCF: as risky as the free cash flow and worth τk × V<sup>U</sup>. "
                f"V<sup>L</sup> = (1 + τk)V<sup>U</sup> = (1 + {g(tau4)} × {g(k3)}) × {g(VU4)} = "
                f"<b>NOK {g(VL3)} million</b></p>"
                f"<p><b>Debt today.</b> Next year's interest is {g(k3)} × {g(FCF4)} = {g(int3)} "
                f"= {pc(rD4)} × D, so <b>D = {g(D3)}</b>.</p>"
                f"<p><b>Check (WACC: a fixed point that catches a wrong rate on the tax shield, since "
                f"r<sub>U</sub> − (D/V)τr<sub>D</sub> assumes shields discounted at r<sub>U</sub>).</b> "
                f"D/V = {g(D3)}/{g(VL3)} = {f(dv3)}; "
                f"r<sub>wacc</sub> = {pc(rU4)} − {f(dv3)} × {g(tau4)} × {pc(rD4)} = {pc(rw3)}; "
                f"{g(FCF4)}/{f(rw3, 6)} = {g(round(FCF4 / rw3, 6))} ✓.</p>"
            ),
            "criteria": [
                f"V^L = (1 + τk)V^U = {g(1 + tau4 * k3)} × {g(VU4)} = NOK {g(VL3)} million.",
                f"D = {g(int3)}/{g(rD4)} = {g(D3)}, from next year's interest of {g(k3)} × "
                f"{g(FCF4)}.",
                "Applying k to the debt or to V^L instead of to the free cash flow is the error.",
                f"(bonus) The WACC check: d = {f(dv3)}, r_wacc = {pc(rw3)}, V^L = {g(VL3)}.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                f"<p>Suppose Femund is all equity today with {g(N4)} million shares and announces "
                f"Policy 2, using all of the NOK {g(D2)} million to buy back shares. Find the share "
                "price right after the announcement and the number of shares bought back.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Announcement.</b> The tax shield is priced as soon as the plan is "
                f"known: with permanent debt it is τD = {g(PVTS2)} at once. No debt has been issued "
                f"yet, so the equity is worth V<sup>L</sup> = {g(VL2)} and P = {g(VL2)}/{g(N4)} = "
                f"<b>NOK {f(P_kunn4, 2)}</b>, up from {g(VU4)}/{g(N4)} = {f(P0_4, 2)}.</p>"
                f"<p><b>Step 2. Buyback at the new price.</b> n = {g(D2)}/{f(P_kunn4, 2)} = "
                f"<b>{f(n_tk4)} million shares</b>, leaving {f(N_igjen4)} million.</p>"
                f"<p><b>Check (it can fail).</b> After the buyback E = {g(VL2)} − {g(D2)} = {g(E2)} "
                f"and {g(E2)}/{f(N_igjen4)} = {f(P_etter4, 2)} ✓: those who sell and those who stay "
                f"get the same price. Buying at the old {f(P0_4, 2)} would retire {g(n_feil4)} million "
                f"shares and leave the stayers with {g(E2)}/{g(N4 - n_feil4)} = {f(P_feil4)} per "
                f"share against {f(P0_4, 2)} for the sellers, the buyback mistake Kurbatov calls "
                "the biggest.</p>"
            ),
            "criteria": [
                f"P = V^L/N = {g(VL2)}/{g(N4)} = {f(P_kunn4, 2)} at the announcement: the market "
                f"prices PV(TS) = {g(PVTS2)} at once. 2 points.",
                f"n = {g(D2)}/{f(P_kunn4, 2)} = {f(n_tk4)} million at the new price, leaving "
                f"{f(N_igjen4)} million; the price stays at {f(P_etter4, 2)}. 2 points.",
                f"Dividing by the old price of {f(P0_4, 2)} ({g(n_feil4)} million shares) is the "
                f"classic error: the stayers would get {f(P_feil4)} and the sellers {f(P0_4, 2)}.",
                "No price reaction at the announcement (the no-tax MM world) or a jump that is not "
                "τD per share loses the first 2 points.",
            ],
        },
        {
            "label": "f", "points": 3,
            "body": (
                "<p>Rank the three policies by value and explain the ranking with the present value "
                "of the tax shields per NOK of debt today (2-3 sentences).</p>"
            ),
            "solution": (
                "<table class=\"data\"><tr><th>Policy</th><th>Debt today</th><th>PV(TS)</th>"
                "<th>V<sup>L</sup></th><th>PV(TS) per NOK of debt</th></tr>"
                f"<tr><td>2: fixed NOK 300 million</td><td class=\"n\">{g(D2)}</td>"
                f"<td class=\"n\">{g(PVTS2)}</td><td class=\"n\">{g(VL2)}</td>"
                f"<td class=\"n\">{f(per2)}</td></tr>"
                f"<tr><td>3: interest 20% of FCF</td><td class=\"n\">{g(D3)}</td>"
                f"<td class=\"n\">{g(PVTS3)}</td><td class=\"n\">{g(VL3)}</td>"
                f"<td class=\"n\">{f(per3)}</td></tr>"
                f"<tr><td>1: D/V = 30%</td><td class=\"n\">{f(D1)}</td>"
                f"<td class=\"n\">{f(PVTS1)}</td><td class=\"n\">{f(VL1)}</td>"
                f"<td class=\"n\">{f(per1)}</td></tr></table>"
                f"<p><b>Model answer.</b> Policy 2 gives the highest value although Policy 3 "
                f"carries the most debt: the ranking is set by the risk of the tax shields, not by "
                f"the amount borrowed. Fixed debt gives fixed shields, discounted at r<sub>D</sub>, "
                f"so each NOK of debt is worth τ = {g(tau4)}. Under Policies 1 and 3 the debt rises "
                f"and falls with the firm's value or cash flow, so the shields carry business risk "
                f"and are discounted at r<sub>U</sub>: each NOK of debt is worth "
                f"τr<sub>D</sub>/r<sub>U</sub> = {g(tau4)} × {g(rD4)}/{g(rU4)} = {f(per1)}, which "
                "is why these two rank by the debt they carry.</p>"
                "<p><b>Also accepted.</b> A remark that fixed debt does not shrink in bad times, "
                "so it raises distress risk that this model leaves out.</p>"
            ),
            "criteria": [
                f"Ranking: Policy 2 ({g(VL2)}) > Policy 3 ({g(VL3)}) > Policy 1 ({f(VL1, 2)}).",
                f"PV(TS) per NOK of debt: {f(per2)} for Policy 2 against {f(per1)} for Policies 1 "
                "and 3.",
                "Explains with risk: fixed shields are discounted at r_D, shields that follow the "
                "firm at r_U.",
                "«More debt gives more value» without the discount-rate argument earns at most "
                "1 point: Policy 3 has the most debt but not the highest value.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 5
ex5 = {
    "n": 5, "title": "Options", "points": 20,
    "topic": "Credit risk, CDS and put-call parity", "chapters": [5, 22, 24],
    "body": (
        f"<p>Glimsdal Mineraler ASA has one bond: a zero-coupon bond with face value NOK "
        f"{g(K5)} million, due in exactly {g(T5)} years. It trades at a yield of {pc(y5)} a year, "
        f"while {g(T5)}-year government zero-coupon bonds yield {pc(rf5)} a year. Rating analysts "
        f"put the probability that Glimsdal defaults at maturity at {pc(pd5)}; in default the "
        f"bondholders take over the assets and recover {pc(rec5)} of the face value. A credit "
        f"default swap (CDS) on the whole issue pays the buyer NOK {g(LGD)} million if Glimsdal "
        "defaults and nothing otherwise; it is paid for today. Use 4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": (
                "<p>What are Glimsdal's bond and a government zero-coupon bond with the same face "
                "value and maturity worth today?</p>"
            ),
            "solution": (
                f"<p><b>Glimsdal.</b> D = {g(K5)}/{g(1 + y5)}<sup>2</sup> = {g(K5)}/"
                f"{f((1 + y5) ** 2)} = <b>NOK {f(D5)} million</b></p>"
                f"<p><b>Government.</b> PV(K) = {g(K5)}/{g(1 + rf5)}<sup>2</sup> = {g(K5)}/"
                f"{f((1 + rf5) ** 2)} = <b>NOK {f(PVK)} million</b></p>"
                f"<p>The gap, {f(PVK - D5)}, is what the market charges for Glimsdal's default "
                "risk; it returns in d).</p>"
            ),
            "criteria": [
                f"D = {g(K5)}/{g(1 + y5)}^2 = {f(D5)}: the yield is the rate that discounts the "
                "promised payment.",
                f"PV(K) = {g(K5)}/{g(1 + rf5)}^2 = {f(PVK)}.",
                "Two years of discounting, compounded. Discounting one year only is the error.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>What is the expected annual return on Glimsdal's bond? Why does it differ from "
                "the yield?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Expected payoff.</b> {g(1 - pd5)} × {g(K5)} + {g(pd5)} × "
                f"{g(rec5 * K5)} = {g((1 - pd5) * K5)} + {g(pd5 * rec5 * K5)} = {g(EP5)}</p>"
                f"<p><b>Step 2. Annual expected return.</b> ({g(EP5)}/{f(D5)})<sup>1/2</sup> − 1 = "
                f"{f(ER2)}<sup>1/2</sup> − 1 = <b>{pc(er5)}</b></p>"
                f"<p><b>Against the yield ({pc(y5)}).</b> The yield is the promised return, "
                "earned only if Glimsdal pays in full; the expected return also counts the "
                "expected loss in default, so it is lower.</p>"
                f"<p><b>Against r<sub>f</sub> ({pc(rf5)}), not asked.</b> It is still higher, because "
                "default is more likely in bad times for the economy: the bond carries "
                "systematic risk (a positive debt beta) and investors want a premium for it.</p>"
            ),
            "criteria": [
                f"Expected payoff {g(EP5)} with the real probability {pc(pd5)} and the recovery "
                f"{g(rec5 * K5)}.",
                f"Annual expected return = ({g(EP5)}/{f(D5)})^(1/2) − 1 = {pc(er5)}. Reporting the "
                f"two-year return {pc(feil_er_uten_rot)} as annual is the error.",
                "Yield is promised, expected return nets out expected default losses.",
                "(bonus) Above r_f because default risk is systematic (risk premium, debt beta above zero).",
            ],
        },
        {
            "label": "c", "points": 3,
            "body": (
                f"<p>What risk-neutral probability of default do the bond prices imply? Why does it "
                f"differ from {pc(pd5)}?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Grow the price at the risk-free rate.</b> Under risk-neutral "
                f"pricing the bond earns r<sub>f</sub>: {f(D5)} × {f((1 + rf5) ** 2)} = "
                f"{f(CE5)}.</p>"
                f"<p><b>Step 2. Solve.</b> {f(CE5)} = (1 − q) × {g(K5)} + q × {g(rec5 * K5)}, so "
                f"q = ({g(K5)} − {f(CE5)})/{g(LGD)} = <b>{pc(q5)}</b></p>"
                f"<p><b>Why it exceeds {pc(pd5)}.</b> q is not a forecast. It prices the default "
                "state as if it were more likely, because the loss in default arrives in bad times "
                "when money is worth more to investors; the risk premium in b) is moved into the "
                "probability so that discounting at r<sub>f</sub> gives the market price.</p>"
                f"<p>(An identity: [(1 − q) × {g(K5)} + q × {g(rec5 * K5)}]/{f((1 + rf5) ** 2)} = "
                f"{f(D5)} ✓.)</p>"
            ),
            "criteria": [
                f"Uses two years at r_f: {f(D5)} × 1.03^2 = {f(CE5)}.",
                f"q = ({g(K5)} − {f(CE5)})/{g(LGD)} = {pc(q5)}. Growing for one year only gives "
                f"{pc(feil_q_ett_aar)}.",
                f"Explains why q > {pc(pd5)}: risk-neutral probabilities carry the risk premium "
                "(defaults happen in bad states).",
                "Calling q the real probability of default is the error.",
            ],
        },
        {
            "label": "d", "points": 8,
            "body": (
                f"<p>What is the fair price of the CDS? A dealer offers it for NOK {g(cds_q)} "
                "million: construct an arbitrage and find the profit.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Fair price.</b> The CDS pays {g(LGD)} with risk-neutral "
                f"probability q, so its price is q × {g(LGD)}/{f((1 + rf5) ** 2)}. From c), q × "
                f"{g(LGD)} = {g(K5)} − D × {f((1 + rf5) ** 2)}, so the price is {g(K5)}/"
                f"{f((1 + rf5) ** 2)} − D = {f(PVK)} − {f(D5)} = <b>NOK {f(CDS5)} million</b>.</p>"
                f"<p>Bond plus CDS pays {g(K5)} for sure, so D + CDS = PV(K): {f(D5)} + {f(CDS5)} = "
                f"{f(PVK)} (an identity, since q came from the same prices). The CDS is a put on "
                "Glimsdal's assets with strike equal to the face value: risky debt is risk-free "
                "debt minus a put.</p>"
                f"<p><b>Step 2. Arbitrage.</b> At {g(cds_q)} the CDS is too cheap, so buy it and "
                "sell the equivalent:</p>"
                "<table class=\"data\"><tr><th>Position</th><th>Today</th><th>No default</th>"
                "<th>Default</th></tr>"
                f"<tr><td>Buy Glimsdal's bond</td><td class=\"n\">−{f(D5)}</td>"
                f"<td class=\"n\">{g(K5)}</td><td class=\"n\">{g(rec5 * K5)}</td></tr>"
                f"<tr><td>Buy the CDS from the dealer</td><td class=\"n\">−{g(cds_q)}</td>"
                f"<td class=\"n\">0</td><td class=\"n\">{g(LGD)}</td></tr>"
                f"<tr><td>Short the government bond (or borrow at {pc(rf5)})</td>"
                f"<td class=\"n\">+{f(PVK)}</td><td class=\"n\">−{g(K5)}</td>"
                f"<td class=\"n\">−{g(K5)}</td></tr>"
                f"<tr><td><b>Net</b></td><td class=\"n\"><b>+{f(arb)}</b></td>"
                f"<td class=\"n\">0</td><td class=\"n\">0</td></tr></table>"
                f"<p><b>Profit: NOK {f(arb)} million today</b>, with nothing owed later.</p>"
                f"<p><b>Check, state by state (it can fail if the CDS payoff is mis-specified).</b> "
                f"No default: {g(K5)} + 0 − {g(K5)} = 0; default: {g(rec5 * K5)} + {g(LGD)} − "
                f"{g(K5)} = 0 ✓.</p>"
            ),
            "criteria": [
                f"Fair CDS price = q × {g(LGD)}/1.03^2 = {f(CDS5)}, or PV(K) − D = {f(PVK)} − "
                f"{f(D5)}.",
                f"Pricing with the real {pc(pd5)} and r_f gives {f(feil_cds_reell)}: the classic "
                "error.",
                "Arbitrage: buy the bond and the cheap CDS, short the government bond (or borrow) "
                "so the future cash flows cancel in both states.",
                f"Profit today = {f(PVK)} − {f(D5)} − {g(cds_q)} = NOK {f(arb)} million.",
                "This part carries 8 of the 20 points. Show the payoff in both states; a strategy "
                "without the state-by-state cash flows earns at most 5 of 8.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                f"<p>Glimsdal's assets are worth NOK {g(V5)} million today. What is its equity "
                "worth? Using put-call parity on the firm's assets, explain what would happen to "
                "the values of Glimsdal, its equity and its debt if it raised the face value of "
                "its debt to buy back shares in a perfect market (2-3 sentences).</p>"
            ),
            "solution": (
                f"<p><b>Equity.</b> E = V − D = {g(V5)} − {f(D5)} = <b>NOK {f(E5)} million</b>.</p>"
                f"<p>The shareholders hold a call on the assets with strike K = {g(K5)}: put-call "
                f"parity gives C(K) = V − PV(K) + P(K) = {g(V5)} − {f(PVK)} + {f(CDS5)} = "
                f"{f(C5)} ✓ (an identity), with the CDS from d) as the put.</p>"
                "<p><b>Model answer.</b> Put-call parity on the firm's assets says V = C(K) + PV(K) "
                "− P(K) for any face value K, so raising K moves value from the equity (a call with "
                "a higher strike is worth less) to the debt (PV(K) − P(K) rises) while V stays at "
                f"{g(V5)}: put-call parity is MM I. The debt becomes riskier, since the put the "
                "bondholders have written is worth more, so its yield and the CDS price rise. If the "
                "whole debt is refinanced at a fair price, the shareholders who sell in the buyback "
                "receive the borrowed cash and no one gains; if new debt of equal rank is instead "
                "added to the old bond, the old bondholders lose value and the shareholders gain "
                "exactly as much.</p>"
            ),
            "criteria": [
                f"E = {g(V5)} − {f(D5)} = NOK {f(E5)} million.",
                "Equity is a call on the assets with strike = face value; debt = PV(K) − P(K).",
                "V = C(K) + PV(K) − P(K) for every K: the firm's total value is unchanged (MM I) "
                "while equity falls and debt rises.",
                "(bonus) The debt gets riskier: the put, the yield and the CDS price rise.",
                "Who wins and who loses earns full credit: if the new debt is added alongside the "
                "old bond, the old creditors lose and the shareholders gain the same amount. "
                "«Shareholders' wealth is unchanged» is right only if the whole debt is "
                "refinanced at a fair price.",
                "2-3 sentences. «V does not change because of MM» without the parity earns at most "
                "half.",
            ],
        },
    ],
}

# ---------------------------------------------------------------- Oppgave 6
ex6 = {
    "n": 6, "title": "M&A", "points": 20,
    "topic": "Mergers and acquisitions: cash offer and deal probability", "chapters": [22, 26],
    "body": (
        f"<p>Tranøy Dagligvare ASA (A) makes a surprise cash offer for Lillesand Bakeri ASA (B): "
        f"NOK {g(cash6)} per B share, paid when the deal completes. The deal will complete or "
        f"fail in exactly 6 months; if it fails, both share prices return to their pre-bid "
        f"levels. Before the bid, A had {g(NA)} million shares at NOK {g(PA0)} and B had {g(NB)} "
        f"million shares at NOK {g(PB0)}, their stand-alone values. Just after the announcement "
        f"A trades at NOK {f(PA1, 2)} and B at NOK {f(PB1, 2)}. A's management estimates the "
        f"synergies at NOK {g(S_mgmt)} million. The risk-free rate is {pc(rf6)} a year. Use "
        "4 decimal places.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 4,
            "body": (
                "<p>If the deal completes, what is its NPV to A's and to B's shareholders by "
                "management's estimate (ignore the 6 months in this part)? What is the highest "
                "cash price per B share A should offer?</p>"
            ),
            "solution": (
                f"<p><b>Values.</b> A = {g(NA)} × {g(PA0)} = {g(A6)}, T = {g(NB)} × {g(PB0)} = "
                f"{g(Tv6)}, cash paid P = {g(NB)} × {g(cash6)} = {g(P6)} (NOK million).</p>"
                f"<p><b>B's shareholders</b> swap shares worth T for cash P: NPV<sub>B</sub> = "
                f"P − T = <b>{g(NPV_B)}</b>.</p>"
                f"<p><b>A's shareholders</b> own A + T + S and paid P: NPV<sub>A</sub> = S − (P − T) "
                f"= {g(S_mgmt)} − {g(NPV_B)} = <b>{g(NPV_A)}</b>. (The two sum to S = {g(S_mgmt)}, "
                "an identity.)</p>"
                f"<p><b>Highest price.</b> NPV<sub>A</sub> ≥ 0 requires P ≤ T + S = {g(Tv6 + S_mgmt)}, "
                f"or {g(Tv6 + S_mgmt)}/{g(NB)} = <b>NOK {g(P_max)} per B share</b>.</p>"
            ),
            "criteria": [
                f"NPV_B = P − T = {g(P6)} − {g(Tv6)} = {g(NPV_B)} million.",
                f"NPV_A = S − (P − T) = {g(S_mgmt)} − {g(NPV_B)} = {g(NPV_A)} million. The cash "
                "formulas are from lecture 12; the formula sheet's stock-swap NPVs do not apply.",
                f"Highest price: (T + S)/N_B = {g(Tv6 + S_mgmt)}/{g(NB)} = NOK {g(P_max)}.",
                f"Answering NOK {g(cash6)} or the share price after the announcement for the "
                "highest price is the error.",
            ],
        },
        {
            "label": "b", "points": 6,
            "body": (
                "<p>An arbitrageur buys B shares now and holds them until the deal is decided. What "
                "is her return over the 6 months if the deal completes and if it fails? What "
                "probability of completion does B's price imply?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Payoffs and returns.</b> She pays {f(PB1, 2)} today. If the deal "
                f"completes she receives {g(cash6)}: {g(cash6)}/{f(PB1, 2)} − 1 = <b>{pc(r_succ)}</b> "
                f"over 6 months ({pc(r_succ_ann)} a year compounded, not asked). If it fails, B returns to {g(PB0)}: {g(PB0)}/{f(PB1, 2)} − 1 = "
                f"<b>{pc(r_fail)}</b>.</p>"
                f"<p><b>Step 2. Six months at an annual rate.</b> (1 + {g(rf6)})<sup>0.5</sup> = "
                f"{f(gf, 6)}.</p>"
                f"<p><b>Step 3. The certainty equivalent.</b> The position costs {f(PB1, 2)} today, so "
                f"under risk-neutral pricing its expected payoff in 6 months is {f(PB1, 2)} × "
                f"{f(gf, 6)} = {f(CE6)}. Setting it equal to {f(PB1, 2)} is the error the H2025 key "
                "warns against.</p>"
                f"<p><b>Step 4. Solve for p.</b> {f(CE6)} = p × {g(cash6)} + (1 − p) × {g(PB0)}, so "
                f"p = ({f(CE6)} − {g(PB0)})/({g(cash6)} − {g(PB0)}) = {f(CE6 - PB0)}/"
                f"{g(cash6 - PB0)} = <b>{f(p6)}</b> ({pc(round(p6, 6))}).</p>"
                f"<p>(An identity: {f(p6, 6)} × {g(cash6)} + {f(1 - p6, 6)} × {g(PB0)} = {f(CE6)} ✓.) "
                "Because the payoffs are discounted at r<sub>f</sub>, p is a risk-neutral "
                "probability. With a cash offer no short position is needed: B's price alone "
                "reveals p.</p>"
            ),
            "criteria": [
                f"Returns: {pc(r_succ)} if the deal completes and {pc(r_fail)} if it fails, over "
                "6 months.",
                f"Six-month factor 1.03^0.5 = {f(gf, 6)} and certainty equivalent {f(PB1, 2)} × "
                f"{f(gf, 6)} = {f(CE6)}.",
                f"p = ({f(CE6)} − {g(PB0)})/{g(cash6 - PB0)} = {f(p6)}.",
                f"Plugging {f(PB1, 2)} gives p = {f(feil_p_uten_rente)}; a full year of interest "
                f"gives {f(feil_p_helt_aar)}.",
                f"Reasonable approximations are accepted, as in Kurbatov's keys: the simple factor "
                f"{f(gf_enkel, 3)} gives p = {f(p6_enkel)} and earns full marks.",
            ],
        },
        {
            "label": "c", "points": 6,
            "body": (
                "<p>Now use A's share price with the assumptions of b): in 6 months A trades at its "
                "pre-bid price if the deal fails and at its value with the deal if it completes. What "
                "synergies S does the market expect? Are A's shareholders better or worse off from "
                "the bid?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. A's certainty equivalent.</b> {f(PA1, 2)} × {f(gf, 6)} = "
                f"{f(CEA)}.</p>"
                f"<p><b>Step 2. A's price if the deal completes.</b> A's shareholders then own both "
                f"firms plus the synergies and have paid the cash: A + T + S − P, as in a). "
                f"{f(CEA)} = {f(p6, 6)} × "
                f"P<sub>A</sub> + {f(1 - p6, 6)} × {g(PA0)}, so P<sub>A</sub> = ({f(CEA, 6)} − "
                f"{f((1 - p6) * PA0, 6)})/{f(p6, 6)} = {f(PA_succ)}.</p>"
                f"<p><b>Step 3. Synergies.</b> {g(NA)} × {f(PA_succ)} = {f(NA * PA_succ, 2)} = "
                f"A + T + S − P = {g(A6)} + {g(Tv6)} + S − {g(P6)}, so <b>S = NOK {f(S_mkt, 2)} "
                f"million</b>, against management's {g(S_mgmt)}.</p>"
                f"<p><b>Worse off.</b> The market's synergies are smaller than the premium of "
                f"{g(NPV_B)}: NPV<sub>A</sub> = {f(S_mkt, 2)} − {g(NPV_B)} = "
                f"<b>{f(NPV_A_mkt, 2)}</b>. The market thinks A overpays and B's shareholders "
                "capture more than the whole gain.</p>"
                f"<p><b>Check (an identity: the same p and pricing).</b> From the combined market "
                f"value: ({g(NA)} × {f(PA1, 2)} + {g(NB)} × {f(PB1, 2)}) × {f(gf, 6)} = "
                f"{f((NA * PA1 + NB * PB1) * gf, 2)} = A + T + pS = {g(A6 + Tv6)} + {f(p6, 6)} × S, "
                f"so S = {f(S_mkt2, 2)} ✓.</p>"
                f"<p><b>Note.</b> Under these assumptions a deal with zero NPV for A would put A at "
                f"{g(PA0)}/{f(gf, 6)} = {f(PA_null, 2)} today, not {g(PA0)}. A's price of "
                f"{f(PA1, 2)} is below that benchmark, which is the market's verdict on the deal.</p>"
            ),
            "criteria": [
                f"Same convention as b): {f(PA1, 2)} × {f(gf, 6)} = {f(CEA)} = p × P_A + (1 − p) × "
                f"{g(PA0)}, giving P_A = {f(PA_succ)} if the deal completes.",
                f"S = {g(NA)} × {f(PA_succ)} − ({g(A6)} + {g(Tv6)} − {g(P6)}) = NOK {f(S_mkt, 2)} "
                "million (the combined market value gives the same).",
                f"Worse off: S < P − T = {g(NPV_B)}, so NPV_A = {f(NPV_A_mkt, 2)}; the market "
                f"believes far less than management's {g(S_mgmt)}.",
                f"The simple factor {f(gf_enkel, 3)} (p = {f(p6_enkel)}, S = {f(S_enkel, 2)}) earns "
                "full marks. Reading A's fall without p and the 6 months gives a different number "
                "and loses the S points, but «worse off» earns its point either way.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                f"<p>A pension fund sells its {pc(stake)} stake in B at NOK {f(PB1, 2)} today instead "
                f"of waiting for NOK {g(cash6)}. Is this irrational? Who is on the other side of the "
                "trade? (3-4 sentences)</p>"
            ),
            "solution": (
                f"<p><b>Model answer (four sentences).</b> No: selling locks in NOK {f(PB1, 2)} now "
                f"instead of a gamble between {g(cash6)} and {g(PB0)} in 6 months, so the spread of "
                f"NOK {f(spread, 2)} ({pc(spread / PB1)} of the price) is the premium the fund pays to "
                f"insure itself against a {pc(-r_fail)} fall if the deal fails. A fund with a large "
                "position, a limited appetite for one firm's risk or a need for cash can rationally "
                "pay that premium. The buyers are merger arbitrageurs, typically hedge funds, who "
                f"supply this insurance and liquidity and earn {pc(r_succ_ann)} a year if the deal "
                "completes. They manage the risk by holding many deals at once, so one failure is "
                "covered by the spreads on the others, although failures cluster when markets fall, "
                "which is why the spread holds a risk premium and has historically paid off "
                "(Mitchell and Pulvino).</p>"
                "<p><b>Also accepted.</b> The fund may judge completion less likely than the "
                "market does; its mandate may not allow it to hold a takeover target.</p>"
            ),
            "criteria": [
                f"Not irrational: selling locks in {f(PB1, 2)} today instead of {g(cash6)} or "
                f"{g(PB0)} in 6 months.",
                f"The spread (NOK {f(spread, 2)}, {pc(spread / PB1)}) is an insurance premium "
                "against the deal failing.",
                "The buyers are merger arbitrageurs (hedge funds) who provide liquidity and "
                "insurance.",
                "(bonus) They diversify across many deals; failures cluster in downturns, so the "
                "spread also carries a risk premium.",
                f"«Irrational, since {g(cash6)} > {f(PB1, 2)}» earns nothing: it ignores the risk of "
                "failure and the time.",
            ],
        },
    ],
}

SETT = {
    "id": "prove10",
    "kind": "mock",
    "label": "Mock exam 10",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format to test breadth: it draws on parts of the 2026 "
        "syllabus that his two papers left out, from share issues and debt policy to credit and "
        "a cash takeover bid. New firms and numbers throughout. Not an official exam: the course "
        "has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations, most of which end with a "
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
    if re.search(r"(^|[^&])\bM&A\b", t) and ".body" in sti:
        feil.append(f"rå & i HTML i {sti}")

# facts, note og topic vises før start: ingen formler eller mekanismenavn som røper svar
FORBUDT = ["winner's curse", "risk-neutral", "certainty equivalent", "τ", "put-call", "insurance",
           "r_D", "r_U", "short-termism", "too many missions", "arbitrage"]
for sti, t in alle_tekster({"note": SETT["note"], "facts": SETT["facts"],
                            "topics": [e["topic"] for e in SETT["exercises"]]}):
    for ord_ in FORBUDT:
        if ord_.lower() in t.lower() and not (ord_ == "put-call" and "topics" in sti):
            feil.append(f"«{ord_}» i {sti} vises før start")


# ------------------------------------------------- oppgaveteksten som Markdown
def til_md(h):
    """Enkel HTML til Markdown for oppgaveteksten (p, b, i, br, sub, sup, ol, tabeller)."""
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

    def liste(m):
        punkter = re.findall(r"<li>(.*?)</li>", m.group(0), re.S)
        return "\n\n" + "\n".join(f"{i}. {p.strip()}" for i, p in enumerate(punkter, 1)) + "\n\n"
    s = re.sub(r"<ol>.*?</ol>", liste, s, flags=re.S)
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


# ------------------------------------------- lengde: samme telling som for H2025 (1 149)
def strip(s):
    return re.sub(r"\s+", " ", re.sub(r"&[a-z]+;", " ", re.sub(r"<[^>]+>", " ", s))).strip()


ord_per = []
for ex in SETT["exercises"]:
    n = len(strip(ex["body"]).split())
    for d in ex.get("parts", []):
        n += len(strip(d["body"]).split())
    ord_per.append(n)
ord_tot = sum(ord_per)
print(f"\nOrd i oppgaveteksten: {ord_tot} ({'/'.join(map(str, ord_per))})")
if not 1000 <= ord_tot <= 1250:
    feil.append(f"oppgaveteksten har {ord_tot} ord, skal være 1 000–1 250")

if feil:
    print("\nFEIL, prove10.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
with open(UT_MD, "w", encoding="utf-8") as fh:
    fh.write(md_tekst)
print(f"\nAlle kontroller bestått. Skrev {UT} og {UT_MD}")
