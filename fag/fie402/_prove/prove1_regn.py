"""Prøveeksamen 1 i FIE402 («som H2025»): alle tall regnes her, og settet bygges herfra.

Kjør:  python3 -I prove1_regn.py

Skriptet regner hvert tall som står i oppgavetekst, løsning og kriterier, og
sjekker konsistenskontrollene med assert: kursen uendret i en rekapitalisering
i perfekte markeder, utbytte/r_E = kurs, hjemmelaget gjeld gir samme kontantstrøm
i hver tilstand, WACC = APV, vektede betaer = beta_U, NPV-ene summerer til
synergien, kursendringsidentiteten i M&A, og at indifferenspunktet i
realopsjonen ligger i riktig intervall.

Deretter sjekkes skrivereglene (ingen tankestrek, ingen komma foran «and»,
ingen markup i criteria) og poengene (12/12/18/18/20/20, deloppgavene summerer).
Er alt rent, skrives prove1.json i samme mappe. Er noe galt, skrives ingenting.

Formatet følger docs/fie402-proveeksamen-spek.md. Konvensjonene (beta_U vektet
uten skatt, skatteskjoldet diskontert med r_U ved konstant D/V, D_t = d·V_t,
TS_t = tau·r_D·D_{t−1}) følger FIE402_Manual.html, kapittel k4, k17–k19.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove1.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def pc(x, d=4):
    """Rente som prosent, f.eks. 0.131667 -> 13.1667%."""
    return f(100 * x, d) + "%"


def kr(x):
    """Hele kroner."""
    return f(x, 0)


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


# ======================================================== Oppgave 3: MM-rekap
rf3, rm3, bU3 = 0.04, 0.09, 1.1
N0 = 16.0                    # millioner aksjer
F_lo, F_hi = 30.0, 46.0      # MNOK, lik sannsynlighet
F3 = 0.5 * (F_lo + F_hi)     # 38
assert near(F3, 38.0)
rE0 = rf3 + bU3 * (rm3 - rf3)
V3 = F3 / rE0
P0 = V3 / N0
DPS0 = F3 / N0
assert near(rE0, 0.095) and near(V3, 400.0) and near(P0, 25.0)
assert near(DPS0 / rE0, P0)

dv3 = 0.40
D3 = dv3 * V3
n_rep = D3 / P0
N1 = N0 - n_rep
E3 = V3 - D3
assert near(E3 / N1, P0)                      # identitet (P = E1/N1)
int3 = rf3 * D3
assert int3 < F_lo                            # gjelden er virkelig risikofri
DPS1 = (F3 - int3) / N1
DE3 = D3 / E3
bE1 = bU3 + DE3 * (bU3 - 0.0)
rE1 = rf3 + bE1 * (rm3 - rf3)
rE1_mm = rE0 + DE3 * (rE0 - rf3)
assert near(rE1, rE1_mm)
assert near(DPS1 / rE1, P0)                   # ekte kontroll: kan feile
assert near((E3 / V3) * bE1 + (D3 / V3) * 0.0, bU3)   # kontroll 2 (identitet her)
feil_ikke_relevert = DPS1 / rE0               # glemt å relevere
dps_lo, dps_hi = (F_lo - int3) / N1, (F_hi - int3) / N1

# Ingrid: hjemmelaget avgiring
h = 4800
andel = h / (N0 * 1e6)
selg_h = dv3 * h
behold_h = h - selg_h
kontant_h = selg_h * P0
rente_h = rf3 * kontant_h
assert near(behold_h, andel * N1 * 1e6) and near(kontant_h, andel * D3 * 1e6)
for F in (F_lo, F_hi):
    for_rekap = h * F / N0
    hjemme = behold_h * (F - int3) / N1 + rente_h
    assert near(for_rekap, hjemme)            # samme kontantstrøm i hver tilstand
for_lo, for_hi = h * F_lo / N0, h * F_hi / N0
ing_lo, ing_hi = behold_h * dps_lo, behold_h * dps_hi
assert near(behold_h * P0 + kontant_h, h * P0)

# de to andre aksjonærene
selger = h * P0 * rf3                          # 4 800 per år, risikofritt
beh_lo, beh_hi = h * dps_lo, h * dps_hi
beh_E = 0.5 * (beh_lo + beh_hi)
for_E = 0.5 * (for_lo + for_hi)
assert near(beh_E / rE1, h * P0) and near(for_E / rE0, h * P0) and near(selger / rf3, h * P0)
spenn_ratio = (beh_hi - beh_lo) / (for_hi - for_lo)
assert near(spenn_ratio, bE1 / bU3)            # ekte kontroll: tilstand for tilstand mot MM II

vis("Oppgave 3", rE0=rE0, V=V3, P0=P0, DPS0=DPS0, D=D3, n_rep=n_rep, N1=N1,
    DPS1=DPS1, bE1=bE1, rE1=rE1, feil_ikke_relevert=feil_ikke_relevert,
    dps_lo=dps_lo, dps_hi=dps_hi, ing=(ing_lo, ing_hi, rente_h),
    beholder=(beh_lo, beh_hi, beh_E), spenn_ratio=spenn_ratio)

# ======================================================= Oppgave 4: WACC/APV
rf4, rm4, rD4, bE4, tau4, DE4 = 0.04, 0.10, 0.055, 1.7, 0.22, 0.60
F41, F42 = 6.0, 186.0
d4 = DE4 / (1 + DE4)
e4 = 1 - d4
assert near(d4, 0.375) and near(e4, 0.625)
mrp4 = rm4 - rf4
bD4 = (rD4 - rf4) / mrp4
rE4 = rf4 + bE4 * mrp4
bU4 = e4 * bE4 + d4 * bD4
rU4 = e4 * rE4 + d4 * rD4
assert near(rU4, rf4 + bU4 * mrp4)            # identitet (begge fra CAPM)
rw4 = e4 * rE4 + d4 * rD4 * (1 - tau4)
assert near(rw4, rU4 - d4 * rD4 * tau4)
V41 = F42 / (1 + rw4)
V40 = (F41 + V41) / (1 + rw4)
a4, b4 = F41 / (1 + rw4), F42 / (1 + rw4) ** 2
assert near(V40, a4 + b4)
vist_sum([a4, b4], V40, 4)
D40, D41 = d4 * V40, d4 * V41
dD4 = D41 - D40
assert dD4 > 0                                 # vrien: selskapet låner mer
assert near(dD4, d4 * (V41 - V40))
VU4a, VU4b = F41 / (1 + rU4), F42 / (1 + rU4) ** 2
VU4 = VU4a + VU4b
vist_sum([VU4a, VU4b], VU4, 4)
TS41, TS42 = tau4 * rD4 * D40, tau4 * rD4 * D41
pv1, pv2 = TS41 / (1 + rU4), TS42 / (1 + rU4) ** 2
PVTS4 = pv1 + pv2
vist_sum([pv1, pv2], PVTS4, 6, 4)
APV4 = VU4 + PVTS4
assert near(APV4, V40)                         # konsistenskontroll 1
vist_sum([VU4, PVTS4], APV4, 4)
# tredje vei, FTE (k19): FCFE diskontert med r_E skal gi V0 − D0
assert near(rE4, rU4 + DE4 * (rU4 - rD4))
FCFE1 = F41 - (1 - tau4) * rD4 * D40 + dD4
FCFE2 = F42 - (1 - tau4) * rD4 * D41 - D41
assert near(FCFE1 / (1 + rE4) + FCFE2 / (1 + rE4) ** 2, V40 - D40)
feil_rD = VU4 + TS41 / (1 + rD4) + TS42 / (1 + rD4) ** 2
assert abs(feil_rD - V40) > 0.05               # kontrollen fanger feil rente
vist_sum([e4 * rE4, d4 * rD4], rU4, 6)
vist_sum([e4 * rE4, d4 * rD4 * (1 - tau4)], rw4, 7)

vis("Oppgave 4", bD=bD4, rE=rE4, bU=bU4, rU=rU4, rwacc=rw4, V1=V41, V0=V40,
    deler=(a4, b4), D0=D40, D1=D41, dD=dD4, VU=VU4, VU_deler=(VU4a, VU4b),
    TS=(TS41, TS42), pv=(pv1, pv2), PVTS=PVTS4, APV=APV4, feil_rD=feil_rD,
    avvik=feil_rD - V40)

# ===================================================== Oppgave 5: realopsjon
I5, r5, kost5 = 2_200_000.0, 0.08, 340_000.0
inn_lo, inn_hi = 400_000.0, 600_000.0
S5 = 1_300_000.0
c_hi, c_lo = inn_hi - kost5, inn_lo - kost5
cE = 0.5 * (c_hi + c_lo)
PV5 = cE / r5
NPV5 = PV5 - I5
assert NPV5 < 0
PV_hi, PV_lo = c_hi / r5, c_lo / r5
N_hi, N_lo = PV_hi - I5, PV_lo - I5
assert N_hi > 0 and N_lo < 0
VOI = 0.5 * max(0, N_hi) + 0.5 * max(0, N_lo) - max(0, NPV5)
assert near(VOI, 0.5 * N_hi)
N_hi_del = N_hi / (1 + r5)
VOI1 = 0.5 * N_hi_del - max(0, NPV5)
tap_aar1 = c_hi / (1 + r5)
spar_inv = I5 - I5 / (1 + r5)
assert near(VOI - VOI1, 0.5 * (tap_aar1 - spar_inv))
vist_sum([-tap_aar1, spar_inv], -(tap_aar1 - spar_inv), 0)
vist_sum([VOI, -(VOI - VOI1)], VOI1, 0)
# (d) salgsopsjon ved utgangen av år 1
fort_hi, fort_lo = c_hi / r5, c_lo / r5
assert fort_hi > S5 and fort_lo < S5         # fortsett i god, selg i dårlig
N_lo_d = -I5 + (c_lo + S5) / (1 + r5)
NPV5d = 0.5 * N_hi + 0.5 * N_lo_d
assert NPV5d > 0
vist_sum([0.5 * N_hi, 0.5 * N_lo_d], NPV5d, 0)
opsj5 = NPV5d - NPV5
assert near(opsj5, 0.5 * (S5 - fort_lo) / (1 + r5))   # uavhengig vei
kontrakt5 = max(0, NPV5d) - max(0, NPV5)       # kontrakten verdt for deg (du kan la være å åpne)
assert near(kontrakt5, NPV5d)
# (e) indifferens i X
m5 = 500_000.0 - kost5
# 0 = −I + 0.5[(m + X)/r] + 0.5[(m − X + S)/(1 + r)]
koef = 1 / r5 - 1 / (1 + r5)
rhs = 2 * I5 - m5 / r5 - (m5 + S5) / (1 + r5)
X5 = rhs / koef
assert near(X5, 90_560.0, 1e-6)
grense = m5 - r5 * S5                        # X > grense => salg i dårlig tilstand
assert X5 > grense and (m5 + X5) / r5 > S5
gx, bx = m5 + X5, m5 - X5
Ng_x = -I5 + gx / r5
Nb_x = -I5 + (bx + S5) / (1 + r5)
assert near(0.5 * Ng_x + 0.5 * Nb_x, 0.0, 1e-6)
assert 100_000.0 > X5                         # originalt X ligger over, i tråd med (d)


def npv_tre(X):
    """Hele beslutningstreet med max() i hver node, uavhengig av algebraen over."""
    g, b = m5 + X, m5 - X
    return -I5 + 0.5 * (g + max(g / r5, S5) + b + max(b / r5, S5)) / (1 + r5)


assert near(npv_tre(X5), 0.0, 1e-6) and near(npv_tre(100_000.0), NPV5d, 1e-6)
assert near(npv_tre(0.0), NPV5, 1e-6) and npv_tre(grense) < 0 < npv_tre(X5 + 1)
# vist utregning i (e)
vist_m = round(m5 / r5)                       # 2 000 000
vist_s = round((m5 + S5) / (1 + r5))          # 1 351 852
vist_rhs = round(2 * I5) - vist_m - vist_s
inv108 = 1 / (1 + r5)

vis("Oppgave 5", c=(c_hi, c_lo, cE), PV=PV5, NPV=NPV5, N_hi=N_hi, N_lo=N_lo, VOI=VOI,
    N_hi_del=N_hi_del, VOI1=VOI1, forskjell=VOI - VOI1, tap=tap_aar1, spar=spar_inv,
    N_lo_d=N_lo_d, NPVd=NPV5d, opsjon=opsj5, X=X5, grense=grense,
    Ng_x=Ng_x, Nb_x=Nb_x, rhs=(rhs, vist_rhs), koef=koef)

# =========================================================== Oppgave 6: M&A
NA, PA, NT, PT, S6, ER = 40.0, 75.0, 15.0, 32.0, 180.0, 0.52
A6, T6 = NA * PA, NT * PT
x6 = ER * NT
Ntot = NA + x6
V6 = A6 + T6 + S6
Pn = V6 / Ntot
y6 = x6 / Ntot
NPVA = (1 - y6) * V6 - A6
NPVT = y6 * V6 - T6
assert near(NPVA + NPVT, S6)                  # identitet
assert near(NPVA, NA * (Pn - PA))             # ekte kontroll
pr_off = ER * PA / PT - 1
pr_act = ER * Pn / PT - 1
assert near(NPVT, T6 * pr_act)                # uavhengig vei til NPV_T
ERmax = (T6 + S6) / A6 * NA / NT
assert near(ERmax, (PT + S6 / NT) / PA)
ERmin = T6 / (A6 + S6) * NA / NT
assert near(ERmin, PT / ((A6 + S6) / NA))
assert ERmin < ER < ERmax
ERmin_naiv = PT / PA                           # delpoeng: gulvet uten S i nevneren
assert ERmin < ERmin_naiv < ER
xmax = ERmax * NT
assert near(V6 / (NA + xmax), PA)            # ved ERmax er A-kursen uendret
xmin = ERmin * NT
Pmin = V6 / (NA + xmin)
assert near(ERmin * Pmin, PT)                 # ved ERmin får B akkurat 32
andA, andT = NPVA / S6, NPVT / S6
# (c) markedets reaksjon
PA1 = 74.00
PT1 = round(ER * PA1, 2)
assert near(PT1, ER * PA1)
S_imp = NA * PA1 + NT * PT1 - (A6 + T6)
S_imp2 = PA1 * Ntot - (A6 + T6)
assert near(S_imp, S_imp2)
NPVA_m, NPVT_m = NA * (PA1 - PA), NT * (PT1 - PT)
assert near(NPVA_m + NPVT_m, S_imp)
y_chk = y6 * (A6 + T6 + S_imp) - T6
assert near(y_chk, NPVT_m)
ERmax_m = (PT + S_imp / NT) / PA
assert ERmax_m < ER
pr_act_m = ER * PA1 / PT - 1

vis("Oppgave 6", A=A6, T=T6, x=x6, Ntot=Ntot, V=V6, Pn=Pn, y=y6, NPVA=NPVA, NPVT=NPVT,
    pr_off=pr_off, pr_act=pr_act, ERmax=ERmax, ERmin=ERmin, Pmin=Pmin, andeler=(andA, andT),
    S_imp=S_imp, NPV_m=(NPVA_m, NPVT_m), ERmax_m=ERmax_m, pr_act_m=pr_act_m)


# ======================================================================
#                              TEKSTENE
# ======================================================================
ex1 = {
    "n": 1, "title": "Options", "points": 12, "topic": "Options", "chapters": [21, 23],
    "body": (
        "<p>You own one European call option and one European put option on the shares of "
        "Kystlink ASA, a ferry operator. Both options have a strike price of K = NOK 120 and expire "
        "in one year. The share currently trades at NOK 115 and the company has not announced any "
        "dividends. During one week, three pieces of news arrive. Treat each piece of news "
        "separately and assume that everything else stays the same, including today's share price "
        "of NOK 115.</p>"
        "<p><b>(i)</b> Kystlink signs a ten-year fixed-price contract with the state, which makes its future "
        "cash flows much more predictable. Analysts now expect the volatility of Kystlink's share to "
        "fall from 34% to 22%.</p>"
        "<p><b>(ii)</b> The central bank raises its policy rate: the one-year risk-free rate rises from 3.5% "
        "to 4.5%.</p>"
        "<p><b>(iii)</b> The board announces a special cash dividend of NOK 10 per share, to be paid in six "
        "months, before the options expire.</p>"
        "<p>For each piece of news, what happens to the value of your call and to the value of your "
        "put: does it rise, fall or stay the same? Explain why. (You do not need any calculations to "
        "answer this question. 2-3 sentences per piece of news, each piece of news is worth 4 "
        "points. An answer that gives only the direction without the reason earns no points.)</p>"
    ),
    "solution": (
        "<p>Three pieces of news, three comparative statics. Each model answer keeps to the "
        "2-3 sentence budget: the direction, the mechanism and a check with put-call parity.</p>"
        "<p><b>(i) Volatility falls from 34% to 22%: the call falls and the put falls.</b> "
        "An option's payoff is one-sided: the call pays max(S<sub>T</sub> − K, 0) and the put pays "
        "max(K − S<sub>T</sub>, 0), so a wider spread of the share price at expiry adds payoff in "
        "one tail and costs nothing in the other, where the payoff is already zero. Lower volatility "
        "removes exactly that one-sided benefit for both contracts; since σ does not appear in "
        "put-call parity, C − P = S − PV(K), the call and the put must lose the same amount.</p>"
        "<p><b>(ii) The risk-free rate rises from 3.5% to 4.5%: the call rises and the put falls.</b> "
        "The strike is paid (call) or received (put) only at expiry, so what matters today is "
        "PV(K) = K/(1 + r<sub>f</sub>), which falls when r<sub>f</sub> rises: paying a fixed amount "
        "later becomes cheaper for the call holder, while receiving it later becomes worth less to "
        "the put holder. Parity confirms the direction, because with S unchanged "
        "C − P = S − PV(K) must rise.</p>"
        "<p><b>(iii) A special dividend of NOK 10 before expiry: the call falls and the put rises.</b> "
        "On the ex-dividend date the share price drops by about the NOK 10 paid out while the option "
        "holders receive none of that cash, so the share the options are written on will be worth "
        "less at expiry. With a dividend, parity becomes C − P = S − PV(Div) − PV(K), so the gap "
        "C − P narrows by the present value of the dividend even though the shareholders themselves "
        "are no worse off (they lose NOK 10 on the share and receive NOK 10 in cash).</p>"
        "<p><b>What else earns full marks.</b> Any correct mechanism in your own words. In (i), "
        "«vega is positive for calls and puts» is fine if you also say why: the payoff is truncated "
        "at zero. In (ii), it is enough to say that the present value of the strike falls. In (iii), "
        "it is enough to say that the share price drops on the ex-dividend date and the option holder "
        "does not receive the dividend.</p>"
        "<p><b>Bonus thoughts (not required).</b> In (i), if option prices fall to reflect 22% but an "
        "investor believes Kystlink is still as volatile as before (34%), she should buy the options, "
        "which then look cheap: the mirror image "
        "of H2025 Exercise 1, where the right move was to sell. In (ii), a rate rise in practice "
        "also tends to push share prices down, which would work against the call; the question rules "
        "that out by holding S fixed. In (iii), the dividend moves value between option holders and "
        "option writers while leaving shareholders indifferent (payout irrelevance); the holder "
        "of an American call might exercise just before the ex-dividend date to capture it.</p>"
    ),
    "criteria": [
        "(i) Both the call and the put fall. The reason must be the one-sided payoff: extra "
        "dispersion adds upside without adding downside, so less dispersion takes value from both. "
        "Saying only 'less risk, lower value' is too thin.",
        "(ii) The call rises and the put falls, because PV(K) = K/(1 + r_f) falls: the call holder "
        "pays K later, the put holder receives K later.",
        "(iii) The call falls and the put rises, because the share price drops on the ex-dividend "
        "date before expiry and the option holder does not receive the dividend.",
        "Put-call parity used as a check earns credit: sigma is not in C − P = S − PV(K), so both "
        "fall together in (i); C − P rises in (ii); with a dividend C − P = S − PV(Div) − PV(K) "
        "falls in (iii).",
        "Each piece of news is graded separately at 4 points: 1 point for the correct direction of "
        "the call, 1 for the correct direction of the put and 2 for the mechanism. The direction "
        "points are given only together with a mechanism; arrows alone earn nothing, as the "
        "exercise states.",
        "Keep to 2-3 sentences per piece of news. No calculation is needed; computing "
        "Black-Scholes values is wasted time.",
        "(bonus) Shareholders are indifferent to the dividend while option holders are not, or an "
        "investor who believes the true volatility is still 34% should buy options priced at 22%.",
    ],
}

ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [11, 27],
    "body": (
        "<p>Nordhav Seafood is a mature listed company. Its markets grow slowly, it has few "
        "profitable investment opportunities left and it generates around NOK 1.5 billion of free "
        "cash flow per year. The CEO has run the company for 15 years. In the last three years he "
        "has used the cash to buy a hotel chain and a football club. He has just announced a bid for "
        "a shipping company; the share price fell 7% on the announcement. Ownership is "
        "dispersed: no shareholder owns more than 3% of the shares.</p>"
        "<p>Name the agency problem in one sentence. Then select two distinct governance mechanisms "
        "that could stop this behaviour and describe them: who performs the mechanism, how it "
        "disciplines the CEO and one weakness or limitation. (Naming the problem is worth 2 points "
        "and each mechanism is worth 5 points. Limit your explanations to 3-4 sentences per "
        "mechanism. Two versions of the same tool, such as two kinds of shareholder vote, count as "
        "one mechanism.)</p>"
    ),
    "solution": (
        "<p><b>The problem.</b> This is the <b>free cash flow problem</b>: the CEO of a mature firm "
        "with more cash than positive-NPV projects spends it on <b>empire building</b>, acquisitions "
        "that enlarge the firm he runs instead of paying the cash out (the 7% fall is the market's "
        "verdict on the shipping bid).</p>"
        "<p><b>Mechanism 1. A debt-financed payout (leveraged recapitalisation).</b> The board, "
        "pushed by shareholders at the general meeting, has the company borrow and pay the proceeds "
        "and the cash pile out as a special dividend or a share buyback, so that future free cash "
        "flow is committed to interest and principal. Unlike a dividend, debt service cannot be cut "
        "at the CEO's discretion and missing it hands control to the creditors, which would probably "
        "end his career; with the cash gone, any new acquisition must be financed by outside investors "
        "who will price it. The creditors then "
        "monitor through covenants that restrict acquisitions and asset sales. The weakness is that "
        "leverage brings expected distress costs and debt overhang if good projects do appear; besides, "
        "the board that has to adopt it is the same board that has let the CEO spend the cash for "
        "years.</p>"
        "<p><b>Mechanism 2. The market for corporate control (a hostile takeover).</b> The monitor "
        "is an outside bidder, typically a rival or a private-equity buyer, which can buy the "
        "company at a share price depressed by the CEO's acquisitions and capture the difference by "
        "stopping them. A successful bid replaces the CEO and the board and puts the company under "
        "an owner large enough to find monitoring worth its cost, so the dispersed ownership that let "
        "the CEO drift disappears together with him. The threat of a bid alone disciplines a CEO "
        "who wants to keep his job. The weakness is that takeovers are slow and expensive and that "
        "dispersed target shareholders free-ride by holding out for most of the improvement, so the "
        "bidder's profit can be too thin to justify a bid.</p>"
        "<p><b>Why this scores.</b> The two mechanisms are different in kind: one is internal and "
        "removes the cash, the other is external and removes the manager. Each names who acts, how it "
        "reaches the CEO and where it fails, all within four sentences. Using the setting is a bonus, "
        "not a requirement: with dispersed ownership no single shareholder will bear the cost of "
        "monitoring, which is why a mechanism that does not depend on a large holder fits this "
        "case.</p>"
        "<p><b>Other mechanisms that score equally.</b> An independent board: independent directors "
        "and a separate chair who must approve large acquisitions and can replace the CEO, weak "
        "because a CEO in office for 15 years has usually shaped the board and controls its "
        "information. Pay tied to share-price performance instead of firm size, set by the "
        "remuneration committee, weak because size still brings status and private benefits and "
        "option-heavy pay invites excessive risk. An activist fund that builds a stake and runs a "
        "proxy fight for board seats, weak because it bears the full cost of the campaign while other "
        "holders free-ride. Coordinated voting by institutional investors against the board, weak "
        "because index funds have small engagement budgets. Lender covenants, weak because lenders "
        "monitor risk rather than value.</p>"
    ),
    "criteria": [
        "Names the problem: free cash flow and empire building (Jensen). One sentence is enough; "
        "the 7% price fall is the market's verdict that the bid destroys value. Worth 2 points.",
        "Two genuinely distinct mechanisms. A leveraged recap and a dividend commitment both 'take "
        "the cash away' and may be read as one; pairing an internal and an external mechanism is "
        "the safe choice.",
        "Each mechanism is worth 5 points: 1 for who performs it, 2 for how it reaches the CEO and "
        "2 for one weakness or limitation. A mechanism without a weakness loses those 2 points.",
        "Free riding by dispersed shareholders is an accepted weakness (for example for a "
        "takeover, an activist campaign or coordinated voting).",
        "(bonus) Uses the setting: ownership is dispersed (no holder above 3%), so 'I vote my "
        "block' is not available and mechanisms that do not need a large holder fit best.",
        "Accepted mechanisms include: debt or a committed payout, a hostile takeover or LBO, an "
        "independent board that vetoes acquisitions or replaces the CEO, pay tied to share price "
        "rather than size, an activist who builds a stake and runs a proxy fight, coordinated "
        "voting by institutions, lender covenants.",
        "3-4 sentences per mechanism. A general definition of corporate governance earns nothing.",
    ],
}

# ------------------------------------------------------------------ Oppgave 3
ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [4, 6, 15],
    "body": (
        "<p>Lysefjord Data ASA operates in a perfect capital market with no taxes (MM propositions "
        "hold, no taxes). It is an all-equity company with 16 million shares outstanding. Its free "
        "cash flow is risky: every year it is either NOK 30 million or NOK 46 million with equal "
        "probability, so NOK 38 million in expectation, forever. The company pays out all free cash "
        "flow as dividends at the end of each year. The equity beta of the company is 1.1, the "
        "risk-free rate is 4% and the expected return on the market portfolio is 9%. The company can "
        "borrow at the risk-free rate.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 3,
            "body": "<p>What is the equity cost of capital of the company? What is the share price right now?</p>",
            "solution": (
                "<p><b>Step 1. Cost of equity from the CAPM.</b> The market risk premium is "
                f"0.09 − 0.04 = 0.05:</p><p>r<sub>E</sub> = 0.04 + 1.1 × 0.05 = 0.04 + 0.055 = "
                f"<b>{f(rE0)} ({pc(rE0)})</b></p><p>The company has no debt, so this is also its "
                "unlevered cost of capital: r<sub>U</sub> = r<sub>E</sub> and β<sub>U</sub> = 1.1.</p>"
                "<p><b>Step 2. Value and share price.</b> All free cash flow goes to the shareholders, so "
                "the company is worth the expected free cash flow as a perpetuity at r<sub>E</sub>:</p>"
                f"<p>V = E = 38 / {f(rE0)} = <b>NOK {f(V3, 2)} million</b><br>"
                f"P<sub>0</sub> = {f(V3, 0)} / 16 = <b>NOK {f(P0, 2)} per share</b></p>"
                f"<p><b>Check.</b> Per share: the expected dividend is 38 / 16 = {f(DPS0)} and "
                f"{f(DPS0)} / {f(rE0)} = {f(DPS0 / rE0, 2)} ✓ (the same calculation per share, so "
                "it checks the arithmetic only).</p>"
            ),
            "criteria": [
                "CAPM with the market risk premium 9% − 4% = 5%: r_E = 4% + 1.1 × 5% = 9.50%. Using 9% "
                "as the premium is the trap.",
                "(bonus) Recognises that an all-equity firm has r_E = r_U and beta_E = beta_U.",
                f"Values the expected free cash flow of 38 as a perpetuity: V = E = 38/0.095 = "
                f"{f(V3, 0)} million, so P = {f(V3, 0)}/16 = NOK {f(P0, 2)}.",
                "Show the calculation. No calculation, no points.",
            ],
        },
        {
            "label": "b", "points": 3,
            "body": (
                "<p>The board announces that the company will issue perpetual risk-free debt so that "
                "D/V = 0.40 and use all of the proceeds to repurchase shares immediately.</p>"
                "<p>How much debt will be issued? What happens to the share price upon announcement? "
                "How many shares will be repurchased?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Is there any value effect?</b> No. There are no taxes and no other "
                "frictions, so the recapitalisation is purely financial and MM Proposition I applies: "
                f"the same free cash flow is only split differently. <b>Firm value stays at NOK "
                f"{f(V3, 0)} million and the share price stays at NOK {f(P0, 2)} on announcement.</b></p>"
                f"<p><b>Step 2. Debt.</b> D = 0.40 × {f(V3, 0)} = <b>NOK {f(D3, 0)} million</b>, all of "
                "it new, since the company had no debt.</p>"
                "<p><b>Step 3. Shares.</b> The proceeds buy shares at the unchanged price:</p>"
                f"<p>Shares repurchased = {f(D3, 0)} / {f(P0, 0)} = <b>{f(n_rep, 1)} million</b>, "
                f"leaving 16 − {f(n_rep, 1)} = <b>{f(N1, 1)} million</b> shares.</p>"
                f"<p><b>Check.</b> E = {f(V3, 0)} − {f(D3, 0)} = {f(E3, 0)} over {f(N1, 1)} million "
                f"shares gives {f(E3 / N1, 2)} ✓. This one cannot fail, because the share count was "
                f"computed at 25; the real test comes in (c). Note also that interest of "
                f"0.04 × {f(D3, 0)} = {f(int3, 1)} million is covered even in the bad state "
                f"({f(F_lo, 0)} million), so the debt really is risk-free.</p>"
            ),
            "criteria": [
                "Names the mechanism: no taxes, so the recapitalisation is purely financial and MM I "
                f"holds. Firm value stays at {f(V3, 0)} and the price stays at NOK {f(P0, 2)}.",
                f"Debt issued = 0.40 × {f(V3, 0)} = NOK {f(D3, 0)} million; all of it is new.",
                f"Shares repurchased = {f(D3, 0)}/{f(P0, 0)} = {f(n_rep, 1)} million at the unchanged "
                f"price, leaving {f(N1, 1)} million.",
                "Repurchasing at any price other than 25 implies value was created or destroyed, which "
                "contradicts MM I.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>What is the expected dividend per share at the end of Year 1 after the transaction? "
                "Compare it with the expected dividend per share without the transaction. What are the "
                "new equity beta and the new equity cost of capital?</p>"
            ),
            "solution": (
                f"<p><b>Step 1. The new dividend.</b> Interest comes first: 0.04 × {f(D3, 0)} = "
                f"<b>{f(int3, 1)} million</b>. Expected dividends are 38 − {f(int3, 1)} = "
                f"{f(F3 - int3, 1)} million, now over {f(N1, 1)} million shares:</p>"
                f"<p>E[DPS<sub>1</sub>] = {f(F3 - int3, 1)} / {f(N1, 1)} = <b>NOK {f(DPS1)}</b>, up from "
                f"38 / 16 = {f(DPS0)} without the transaction.</p>"
                f"<p><b>Step 2. The new beta and cost of equity.</b> D/E = {f(D3, 0)}/{f(E3, 0)} = "
                f"{f(DE3)} and the debt is risk-free (β<sub>D</sub> = 0):</p>"
                f"<p>β<sub>E</sub> = β<sub>U</sub> + (D/E)(β<sub>U</sub> − β<sub>D</sub>) = 1.1 + "
                f"{f(DE3)}(1.1 − 0) = <b>{f(bE1)}</b><br>"
                f"r<sub>E</sub> = 0.04 + {f(bE1)} × 0.05 = <b>{f(rE1, 6)} ({pc(rE1)})</b></p>"
                f"<p>MM II gives the same: r<sub>E</sub> = {f(rE0)} + {f(DE3)}({f(rE0)} − 0.04) = "
                f"{f(rE0, 6)} + {f(DE3 * (rE0 - rf3), 6)} = {f(rE1, 6)} ✓</p>"
                f"<p><b>Check (this one can fail).</b> Discount the new expected dividend at the new "
                f"r<sub>E</sub>: {f(DPS1, 6)} / {f(rE1, 6)} = <b>{f(DPS1 / rE1, 2)}</b> ✓, the price "
                f"from (b). Forget to relever and you get {f(DPS1, 6)} / {f(rE0)} = "
                f"{f(feil_ikke_relevert, 2)}, which clashes with 25.00 and exposes the error. "
                f"Consistency check 2 also holds, ({f(E3, 0)}/{f(V3, 0)})({f(bE1)}) + "
                f"({f(D3, 0)}/{f(V3, 0)})(0) = {f(bU3)} = β<sub>U</sub> ✓, but it is an identity "
                "here, since β<sub>E</sub> was built from β<sub>U</sub>.</p>"
            ),
            "criteria": [
                f"Interest on the new debt, 4% × {f(D3, 0)} = {f(int3, 1)}, is paid first, so expected "
                f"dividends are 38 − {f(int3, 1)} = {f(F3 - int3, 1)} million.",
                f"Divides by the reduced share count of {f(N1, 1)} million, not 16 million: "
                f"E[DPS] = {f(DPS1)}, up from {f(DPS0)}.",
                f"New beta_E = 1.1 + ({f(D3, 0)}/{f(E3, 0)})(1.1 − 0) = {f(bE1)} and r_E = "
                f"{pc(rE1)}, by CAPM or by MM II. Using D/V = 0.40 in place of D/E = {f(DE3)} is the "
                "classic slip.",
                f"The check {f(DPS1, 6)}/{f(rE1, 6)} = {f(DPS1 / rE1, 2)} confirms that the price is unchanged and "
                "costs one line.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>Ingrid owned 4,800 shares before the announcement and liked the company as it was. "
                "She can sell shares in the repurchase at the market price and can buy the company's "
                "debt at face value.</p>"
                "<p>Show how she can trade so that her Year-1 cash flow is exactly what it would have "
                "been without the recapitalisation, in both states (free cash flow of NOK 30 million "
                "and of NOK 46 million).</p>"
            ),
            "solution": (
                f"<p><b>Step 1. What she had.</b> 4,800 / 16 million = <b>{f(100 * andel, 2)}%</b> of an "
                f"all-equity company, worth 4,800 × {f(P0, 2)} = NOK {kr(h * P0)}. Her cash flow was "
                f"{f(100 * andel, 2)}% of free cash flow: {kr(for_lo)} in the bad state and "
                f"{kr(for_hi)} in the good state.</p>"
                "<p><b>Step 2. Undo the leverage at home.</b> After the recapitalisation the company "
                "consists of equity and debt. To own the same slice of the whole company she must hold "
                f"{f(100 * andel, 2)}% of each:</p>"
                f"<p>Equity: 0.0003 × {f(N1, 1)} million = <b>{kr(behold_h)} shares</b>, so she sells "
                f"<b>{kr(selg_h)} shares</b> (40% of her holding, the same as D/V) for "
                f"{kr(selg_h)} × {f(P0, 2)} = NOK {kr(kontant_h)}<br>"
                f"Debt: 0.0003 × NOK {f(D3, 0)} million = <b>NOK {kr(kontant_h)} of the company's "
                "debt</b>, bought with exactly those proceeds</p>"
                "<p><b>Step 3. Her Year-1 cash flow.</b></p>"
                "<table class=\"data\"><tr><th>State</th><th>Dividend per share after the recap</th>"
                f"<th>{kr(behold_h)} shares</th><th>Interest 4% × {kr(kontant_h)}</th><th>Total</th>"
                "<th>Without the recap</th></tr>"
                f"<tr><td>FCF = 30</td><td class=\"n\">(30 − {f(int3, 1)})/{f(N1, 1)} = {f(dps_lo)}</td>"
                f"<td class=\"n\">{kr(ing_lo)}</td><td class=\"n\">{kr(rente_h)}</td>"
                f"<td class=\"n\"><b>{kr(ing_lo + rente_h)}</b></td><td class=\"n\">{kr(for_lo)}</td></tr>"
                f"<tr><td>FCF = 46</td><td class=\"n\">(46 − {f(int3, 1)})/{f(N1, 1)} = {f(dps_hi)}</td>"
                f"<td class=\"n\">{kr(ing_hi)}</td><td class=\"n\">{kr(rente_h)}</td>"
                f"<td class=\"n\"><b>{kr(ing_hi + rente_h)}</b></td><td class=\"n\">{kr(for_hi)}</td></tr>"
                "</table>"
                "<p><b>Check (this one can fail).</b> For any free cash flow F (in NOK million): "
                f"{kr(behold_h)} × (F − {f(int3, 1)})/{f(N1, 1)} + {kr(rente_h)} = 300F − {kr(rente_h)} + "
                f"{kr(rente_h)} = 300F, exactly her old {f(100 * andel, 2)}% of F. Her cash flow is the "
                "same in every state, so she has the same risk as well as the same expected payoff. "
                f"Her position is still worth {kr(behold_h)} × {f(P0, 2)} + {kr(kontant_h)} = "
                f"{kr(behold_h * P0)} + {kr(kontant_h)} = {kr(h * P0)} ✓. This is homemade leverage "
                "run in reverse: whatever the company does to its capital structure, she can undo it "
                "on her own account at the same prices.</p>"
            ),
            "criteria": [
                "Recognises the homemade-leverage logic: to undo the firm's leverage she must hold the "
                "same fraction (0.03%) of the debt as of the equity.",
                f"Sells 40% of her shares ({kr(selg_h)}, matching D/V = 0.40) for NOK {kr(kontant_h)} "
                f"and buys NOK {kr(kontant_h)} of the company's debt; keeps {kr(behold_h)} shares.",
                f"Year-1 cash flow {kr(ing_lo)} + {kr(rente_h)} = {kr(for_lo)} in the bad state and "
                f"{kr(ing_hi)} + {kr(rente_h)} = {kr(for_hi)} in the good state, equal to the "
                "original cash flows.",
                "Showing it state by state (or for a general F) is what proves the risk is the same, "
                "not just the expected payoff.",
                "Selling all her shares or keeping all of them does not recreate the original position: "
                "the fractions of debt and equity must match.",
            ],
        },
        {
            "label": "e", "points": 4,
            "body": (
                "<p>Two other shareholders also owned 4,800 shares each. One sold all of them in the "
                "repurchase and invested the proceeds in the company's debt. The other kept all of them. "
                "What are their Year-1 cash flows in both states? What is each position worth today? Is "
                "anyone better or worse off because of the recapitalisation? Explain briefly.</p>"
            ),
            "solution": (
                "<table class=\"data\"><tr><th>Position (4,800 shares before)</th><th>FCF = 30</th>"
                "<th>FCF = 46</th><th>Expected</th><th>Value today</th></tr>"
                f"<tr><td>No recapitalisation</td><td class=\"n\">{kr(for_lo)}</td>"
                f"<td class=\"n\">{kr(for_hi)}</td><td class=\"n\">{kr(for_E)}</td>"
                f"<td class=\"n\">{kr(for_E)} / {f(rE0)} = {kr(for_E / rE0)}</td></tr>"
                f"<tr><td>Sold all, holds NOK {kr(h * P0)} of debt</td><td class=\"n\">{kr(selger)}</td>"
                f"<td class=\"n\">{kr(selger)}</td><td class=\"n\">{kr(selger)}</td>"
                f"<td class=\"n\">{kr(selger)} / 0.04 = {kr(selger / rf3)}</td></tr>"
                f"<tr><td>Kept all 4,800 shares</td><td class=\"n\">4,800 × {f(dps_lo)} = {kr(beh_lo)}</td>"
                f"<td class=\"n\">4,800 × {f(dps_hi)} = {kr(beh_hi)}</td><td class=\"n\">{kr(beh_E)}</td>"
                f"<td class=\"n\">{kr(beh_E)} / {f(rE1, 6)} = {kr(beh_E / rE1)}</td></tr></table>"
                f"<p><b>Comment.</b> Nobody is better or worse off: every position is worth NOK "
                f"{kr(h * P0)}, the value of 4,800 shares before the announcement. The shareholder who "
                f"kept her shares expects more ({kr(beh_E)} instead of {kr(for_E)}), but her cash flow "
                f"now swings by {kr(beh_hi - beh_lo)} between the states instead of "
                f"{kr(for_hi - for_lo)}; the higher r<sub>E</sub> of {pc(rE1)} prices exactly that "
                "extra risk. The seller swapped a risky claim for a safe one at a fair price. This is "
                "MM Proposition I: the recapitalisation only re-slices the same free cash flow. "
                "Since any investor can undo or rebuild leverage at home, as Ingrid did in (d), the "
                "company's choice of leverage cannot be worth anything to its shareholders.</p>"
                f"<p><b>Check (this one can fail).</b> The swing grows by a factor {kr(beh_hi - beh_lo)} / "
                f"{kr(for_hi - for_lo)} = {f(spenn_ratio)} and β<sub>E</sub> by {f(bE1)} / "
                f"{f(bU3)} = {f(bE1 / bU3)} ✓. The first ratio is computed state by state, the second "
                "from MM II, so their agreement is an independent confirmation.</p>"
            ),
            "criteria": [
                f"Seller: NOK {kr(h * P0)} of risk-free debt pays {kr(selger)} in both states and is "
                f"worth {kr(h * P0)}.",
                f"Keeper: {kr(beh_lo)} or {kr(beh_hi)}, expected {kr(beh_E)}, worth "
                f"{kr(beh_E)}/{f(rE1, 6)} = {kr(beh_E / rE1)}.",
                "Concludes that nobody is better or worse off: both are worth the same as the original "
                "holding. The key to H2025 Exercise 3 accepted 'anything reasonable about MM' as the "
                "comment.",
                "Explains why the keeper's higher expected cash flow is not a gain: the payoff is "
                "riskier and the higher r_E prices it.",
                "Credit for the homemade-leverage argument: investors can undo or recreate leverage "
                "themselves, so the firm cannot create value by choosing it.",
            ],
        },
    ],
}

# ------------------------------------------------------------------ Oppgave 4
ex4 = {
    "n": 4, "title": "Valuation with leverage", "points": 18, "topic": "WACC and APV",
    "chapters": [3, 4, 17, 18, 19],
    "body": (
        "<p>Your task is to value company B, which owns a single office building. The company "
        "maintains a debt-to-equity ratio of 60%. The company will exist for 2 years: right now we "
        "are in Year 0. It generates free cash flows of $6M at the end of Year 1 (the building is "
        "partly closed for refurbishment) and $186M at the end of Year 2. The Year-2 figure "
        "includes the after-tax proceeds from selling the building, after which the company is "
        "dissolved. The yearly risk-free rate is 4% and will stay the same. Cost of debt is 5.5%. The "
        "tax rate is 22%. The market portfolio has an expected return of 10%. The equity beta of the "
        "company is 1.7.</p>"
        "<p>Each question is worth 2 points. Recommended precision is 4 decimal places (as in, "
        "1.2345 instead of 1.23).</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2, "body": "<p>Find the debt beta of the company.</p>",
            "solution": (
                "<p>The debt is risky (r<sub>D</sub> = 5.5% &gt; r<sub>f</sub> = 4%), so it has a "
                "positive beta. Invert the CAPM for debt, with a market risk premium of "
                "0.10 − 0.04 = 0.06:</p>"
                f"<p>β<sub>D</sub> = (0.055 − 0.04) / 0.06 = 0.015 / 0.06 = <b>{f(bD4)}</b></p>"
            ),
            "criteria": [
                "CAPM in reverse on the debt: beta_D = (r_D − r_f)/(E[R_Mkt] − r_f).",
                "Market risk premium 10% − 4% = 6%, not 10%.",
                f"beta_D = {f(bD4)}. Setting it to zero contradicts r_D = 5.5%.",
            ],
        },
        {
            "label": "b", "points": 2, "body": "<p>Find the cost of equity of the company.</p>",
            "solution": (
                f"<p>r<sub>E</sub> = 0.04 + 1.7 × 0.06 = 0.04 + 0.102 = <b>{f(rE4)} ({pc(rE4)})</b></p>"
            ),
            "criteria": [
                "Plugs beta_E = 1.7 into the CAPM with the 6% premium.",
                f"r_E = {pc(rE4, 2)}. Using 10% as the premium (giving 21%) is the trap.",
            ],
        },
        {
            "label": "c", "points": 2, "body": "<p>Find the unlevered cost of capital of the company.</p>",
            "solution": (
                f"<p><b>Step 1. Weights.</b> D/E = 0.60, so D/V = 0.60/1.60 = <b>{f(d4)}</b> and "
                f"E/V = <b>{f(e4)}</b>.</p>"
                "<p><b>Step 2. Unlever.</b> <i>Directly</i> (pre-tax WACC = r<sub>U</sub> under the "
                "course's rebalancing convention):</p>"
                f"<p>r<sub>U</sub> = {f(e4)}(0.142) + {f(d4)}(0.055) = {f(e4 * rE4, 6)} + "
                f"{f(d4 * rD4, 6)} = <b>{f(rU4, 6)} ({pc(rU4)})</b></p>"
                f"<p><i>Through betas:</i> β<sub>U</sub> = {f(e4)}(1.7) + {f(d4)}({f(bD4, 2)}) = "
                f"{f(e4 * bE4, 5)} + {f(d4 * bD4, 5)} = {f(bU4, 5)}, so r<sub>U</sub> = 0.04 + "
                f"{f(bU4, 5)} × 0.06 = {f(rU4, 6)} ✓. Both routes rest on the same CAPM inputs, so "
                "their agreement checks arithmetic only.</p>"
                "<p>r<sub>U</sub> does not involve the tax rate: it is the return on the firm's assets "
                "as if it were all-equity financed.</p>"
            ),
            "criteria": [
                f"Converts D/E = 0.60 into D/V = {f(d4)} and E/V = {f(e4)}. Using 0.60 and 0.40 as "
                "weights is the expensive error.",
                f"r_U = {pc(rU4)}, by weighting the returns or by weighting the betas "
                f"(beta_U = {f(bU4, 5)}).",
                "No (1 − tau) anywhere in r_U; beta_U is weighted without taxes, as the course "
                "requires.",
            ],
        },
        {
            "label": "d", "points": 2, "body": "<p>Find the after-tax WACC of the company.</p>",
            "solution": (
                f"<p>r<sub>wacc</sub> = {f(e4)}(0.142) + {f(d4)}(0.055)(1 − 0.22) = "
                f"{f(e4 * rE4, 7)} + {f(d4 * rD4 * (1 - tau4), 7)} = <b>{f(rw4, 7)} ({pc(rw4)})</b></p>"
                f"<p>Cross-check with r<sub>wacc</sub> = r<sub>U</sub> − d·τ<sub>c</sub>·r<sub>D</sub>: "
                f"{f(rU4, 7)} − {f(d4)}(0.22)(0.055) = {f(rU4, 7)} − {f(d4 * tau4 * rD4, 7)} = "
                f"{f(rw4, 7)} ✓</p>"
            ),
            "criteria": [
                "Applies (1 − tau) to r_D only, never to r_E.",
                f"r_wacc = {pc(rw4)} (0.1048375). Keep the full precision for the next steps.",
                f"Weights are still E/V = {f(e4)} and D/V = {f(d4)}.",
            ],
        },
        {
            "label": "e", "points": 2,
            "body": "<p>Find the levered firm value of the company using the WACC approach.</p>",
            "solution": (
                "<p>Discount the free cash flows at the after-tax WACC; the tax shield is already in "
                "the rate:</p>"
                f"<p>V<sup>L</sup><sub>0</sub> = 6 / {f(1 + rw4, 7)} + 186 / {f(1 + rw4, 7)}<sup>2</sup> "
                f"= {f(a4)} + {f(b4)} = <b>${f(V40)}M</b></p>"
                f"<p>Intermediate value: {f(1 + rw4, 7)}<sup>2</sup> = {f((1 + rw4) ** 2, 6)}.</p>"
            ),
            "criteria": [
                "Discounts both cash flows at r_wacc, the Year-2 flow over two periods.",
                f"V^L_0 = {f(V40)}.",
                "No separate tax shield on top: that would count it twice.",
            ],
        },
        {
            "label": "f", "points": 2,
            "body": "<p>Find the debt adjustment at the end of Year 1. Does the company borrow or repay?</p>",
            "solution": (
                f"<p>The firm holds D/V = {f(d4)} at every date, so D<sub>t</sub> = "
                f"{f(d4)} × V<sup>L</sup><sub>t</sub>.</p>"
                f"<p><b>Year 0:</b> D<sub>0</sub> = {f(d4)} × {f(V40)} = <b>${f(D40)}M</b></p>"
                "<p><b>Year 1:</b> after the $6M has been paid out, only the Year-2 flow is left:</p>"
                f"<p>V<sup>L</sup><sub>1</sub> = 186 / {f(1 + rw4, 7)} = <b>${f(V41)}M</b> &rArr; "
                f"D<sub>1</sub> = {f(d4)} × {f(V41)} = <b>${f(D41)}M</b></p>"
                f"<p><b>Debt adjustment:</b> D<sub>1</sub> − D<sub>0</sub> = {f(D41, 6)} − {f(D40, 6)} "
                f"= <b>+${f(dD4)}M: the company borrows more</b>. Equivalently, "
                f"d(V<sup>L</sup><sub>1</sub> − V<sup>L</sup><sub>0</sub>) = {f(d4)} × "
                f"{f(V41 - V40)} = {f(dD4)}. Subtracting the rounded figures, 63.1315 − 59.1774, gives "
                f"{f(round(D41, 4) - round(D40, 4))}; a difference of about 0.001 is rounding, the "
                "tolerance the H2025 key allows.</p>"
                "<p>The sign follows the change in levered value. Here V<sup>L</sup> rises from "
                f"{f(V40)} to {f(V41)}, because the large final payment comes one year closer while "
                "only $6M is paid out, so the firm must borrow to keep its ratio. In H2025 Exercise 4 "
                "the value fell and the firm repaid; memorising «the firm repays» instead of the rule "
                "is the trap.</p>"
            ),
            "criteria": [
                f"Applies D_t = d × V^L_t with d = {f(d4)} at both dates.",
                f"V^L_1 = 186/{f(1 + rw4, 7)} = {f(V41)}, the value after the Year-1 flow has been "
                "paid out.",
                f"D_0 = {f(D40)}, D_1 = {f(D41)}, adjustment +{f(dD4)} (+{f(round(D41, 4) - round(D40, 4))} "
                "from the rounded figures is fine; the tolerance is about 0.001).",
                "Says in words that the company BORROWS more, because V^L rises. Answering 'repays' by "
                "analogy with H2025 loses the point.",
            ],
        },
        {
            "label": "g", "points": 2,
            "body": "<p>Find the unlevered value of the company using the APV approach.</p>",
            "solution": (
                f"<p>Discount the same free cash flows at r<sub>U</sub> = {pc(rU4)}:</p>"
                f"<p>V<sup>U</sup><sub>0</sub> = 6 / {f(1 + rU4, 6)} + 186 / {f(1 + rU4, 6)}<sup>2</sup> "
                f"= {f(VU4a)} + {f(VU4b)} = <b>${f(VU4)}M</b></p>"
                f"<p>V<sup>U</sup> = {f(VU4)} &lt; V<sup>L</sup> = {f(V40)}; the gap is the value of "
                "the tax shield, found in (h).</p>"
            ),
            "criteria": [
                "Discounts the same free cash flows at r_U, not at the WACC and not at r_D.",
                f"V^U = {f(VU4)}.",
            ],
        },
        {
            "label": "h", "points": 2,
            "body": "<p>Find the tax shield in each year and calculate PV(TS).</p>",
            "solution": (
                "<p><b>Step 1. The shields.</b> TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × "
                "D<sub>t−1</sub>, on the debt outstanding at the start of the year:</p>"
                f"<p>TS<sub>1</sub> = 0.22 × 0.055 × {f(D40)} = <b>${f(TS41)}M</b><br>"
                f"TS<sub>2</sub> = 0.22 × 0.055 × {f(D41)} = <b>${f(TS42)}M</b></p>"
                "<p>The second shield is larger than the first because the company borrowed more at "
                "the end of Year 1.</p>"
                "<p><b>Step 2. The rate.</b> The company keeps a constant D/E, so future debt moves with "
                "firm value and the shield carries the risk of the assets: discount it at "
                f"<b>r<sub>U</sub> = {pc(rU4)}</b>, not at r<sub>D</sub>.</p>"
                f"<p>PV(TS) = {f(TS41, 6)} / {f(1 + rU4, 6)} + {f(TS42, 6)} / {f(1 + rU4, 6)}<sup>2</sup> "
                f"= {f(pv1, 6)} + {f(pv2, 6)} = <b>${f(PVTS4)}M</b></p>"
            ),
            "criteria": [
                f"TS_t = tau × r_D × D_(t−1), using D_0 = {f(D40)} and D_1 = {f(D41)}.",
                f"TS_1 = {f(TS41)} and TS_2 = {f(TS42)}.",
                "Discounts at r_U, not at r_D or r_f.",
                "(bonus) Says why: constant D/E means the debt level moves with firm "
                "value, so the shield has asset risk.",
                f"PV(TS) = {f(PVTS4)}. Carry the decimals: the H2025 key accepts a drift of about 0.001, "
                "not 0.05.",
            ],
        },
        {
            "label": "i", "points": 2,
            "body": (
                "<p>Find the levered firm value using the APV approach. Does it agree with your answer "
                "in (e)? Explain briefly why.</p>"
            ),
            "solution": (
                f"<p>V<sup>L</sup> = V<sup>U</sup> + PV(TS) = {f(VU4)} + {f(PVTS4)} = <b>${f(APV4)}M</b></p>"
                f"<p><b>Check (consistency check 1).</b> The WACC method gave {f(V40)} and the APV method "
                f"gives {f(APV4)} ✓. They must agree because they value the same free cash flows plus "
                "the same tax shields under the same debt policy: the WACC method puts the shield into "
                "the discount rate (r<sub>wacc</sub> = r<sub>U</sub> − d·τ<sub>c</sub>·r<sub>D</sub>), "
                "while APV values it as a separate cash flow at r<sub>U</sub>.</p>"
                "<p>Be honest about what the check shows. APV took its debt levels from the WACC values, "
                "so the agreement is a fixed point rather than two independent valuations. It still "
                "catches the errors that actually happen: discount the shields at r<sub>D</sub> = 5.5% "
                f"instead of r<sub>U</sub> and you get {f(feil_rD)}, off by {f(feil_rD - V40)}, far beyond "
                "the rounding tolerance of about 0.001.</p>"
            ),
            "criteria": [
                f"V^L = V^U + PV(TS) = {f(VU4)} + {f(PVTS4)} = {f(APV4)}.",
                "States explicitly that this equals the WACC value from (e).",
                "Explains why: both methods value the same cash flows and the same shields; WACC "
                "puts the shield in the rate, APV adds it separately at r_U. One sentence is enough.",
                f"A gap well above 0.001 signals a real error; the usual one is the wrong rate on the "
                f"shield (r_D gives {f(feil_rD)}).",
            ],
        },
    ],
}

# ------------------------------------------------------------------ Oppgave 5
ex5 = {
    "n": 5, "title": "Real Options", "points": 20, "topic": "Real options", "chapters": [1, 25],
    "body": (
        "<p>You are considering opening a padel hall in Bergen. It costs 2,200,000 NOK to open. The "
        "discount rate is 8%. Running the hall will cost 340,000 NOK per year (rent, staff and "
        "energy). It will generate revenue of either 400,000 NOK or 600,000 NOK per year forever, with "
        "equal probability. You don't know the state of the world at the moment, but if you open the "
        "hall you will learn it during Year 1.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 2,
            "body": "<p>What is the NPV of opening the hall right now? Will you open it?</p>",
            "solution": (
                "<p><b>Step 1. Net cash flow per state.</b></p>"
                "<table class=\"data\"><tr><th>State</th><th>Probability</th><th>Revenue</th>"
                "<th>Cost</th><th>Net cash flow per year</th></tr>"
                f"<tr><td>Good</td><td class=\"n\">0.5</td><td class=\"n\">600,000</td>"
                f"<td class=\"n\">340,000</td><td class=\"n\">+{kr(c_hi)}</td></tr>"
                f"<tr><td>Bad</td><td class=\"n\">0.5</td><td class=\"n\">400,000</td>"
                f"<td class=\"n\">340,000</td><td class=\"n\">+{kr(c_lo)}</td></tr></table>"
                f"<p>Expected net cash flow = 0.5({kr(c_hi)}) + 0.5({kr(c_lo)}) = "
                f"<b>{kr(cE)} NOK per year</b>, forever.</p>"
                "<p><b>Step 2. Value and NPV.</b> Opening now commits you before you know the state:</p>"
                f"<p>PV = {kr(cE)} / 0.08 = {kr(PV5)}<br>NPV = {kr(PV5)} − 2,200,000 = "
                f"<b>{kr(NPV5)} NOK</b></p><p><b>Do not open the hall.</b></p>"
            ),
            "criteria": [
                f"Nets the 340,000 running cost against revenue: +{kr(c_hi)} and +{kr(c_lo)} per year.",
                f"Expected flow {kr(cE)} as a perpetuity at 8%: PV = {kr(PV5)}.",
                f"NPV = {kr(NPV5)}; the answer to the question is no.",
            ],
        },
        {
            "label": "b", "points": 4,
            "body": (
                "<p>How much would you be willing to pay for a market study? The study has already "
                "been conducted, so if you pay C<sub>0</sub> now, you immediately learn the state of "
                "the market.</p>"
            ),
            "solution": (
                "<p>This is the <b>value of perfect information</b>: E[max(0, NPV<sub>i</sub>)] − "
                "max(0, E[NPV]).</p>"
                "<p><b>Step 1. NPV per state, if you know it.</b></p>"
                f"<p><i>Good:</i> {kr(c_hi)} / 0.08 − 2,200,000 = {kr(PV_hi)} − 2,200,000 = "
                f"<b>+{kr(N_hi)}</b>. Open.<br>"
                f"<i>Bad:</i> {kr(c_lo)} / 0.08 − 2,200,000 = {kr(PV_lo)} − 2,200,000 = {kr(N_lo)}. "
                "<b>Do not open</b>, so the payoff is 0. The hall makes money in this state, but not "
                "enough to cover the investment.</p>"
                f"<p><b>Step 2. Informed value.</b> 0.5({kr(N_hi)}) + 0.5(0) = <b>{kr(0.5 * N_hi)}</b></p>"
                "<p><b>Step 3. Subtract the uninformed value.</b> Without the study you do not open "
                f"(part a), which is worth max(0, {kr(NPV5)}) = 0.</p>"
                f"<p>Value of the study = {kr(0.5 * N_hi)} − 0 = <b>{kr(VOI)} NOK</b>. "
                f"<b>You would pay up to C<sub>0</sub> = {kr(VOI)} NOK.</b></p>"
                "<p>The value comes from the decision the study lets you change: you open in the good "
                "state and avoid the bad one.</p>"
            ),
            "criteria": [
                f"Values each state separately: good +{kr(N_hi)} (open), bad {kr(N_lo)} (do not open, "
                "payoff 0).",
                f"Informed value 0.5({kr(N_hi)}) + 0.5(0) = {kr(0.5 * N_hi)}.",
                "Subtracts the uninformed value max(0, NPV) = 0 from part (a).",
                f"States it as a maximum willingness to pay: up to {kr(VOI)}.",
                "Keeping the bad-state NPV negative instead of truncating it at zero is the classic "
                "error.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>How would your answer change if the study took one year to complete? In other "
                "words, you pay C<sub>1</sub> now, wait a year, learn the state and then decide whether "
                "to open the hall or not. Compare your result with (b) and comment.</p>"
            ),
            "solution": (
                "<p><b>Step 1.</b> Opening immediately is still not attractive (NPV "
                f"{kr(NPV5)}), so you wait for the study.</p>"
                "<p><b>Step 2.</b> In a year you face the same project on the same terms, only one year "
                f"later. The good-state NPV measured at date 1 is the same {kr(N_hi)}, so from today:</p>"
                f"<p>{kr(N_hi)} / 1.08 = <b>{kr(N_hi_del)}</b></p>"
                f"<p><b>Step 3.</b> C<sub>1</sub> = 0.5({kr(N_hi_del)}) + 0.5(0) = <b>{kr(VOI1)} NOK</b></p>"
                f"<p><b>Comparison.</b> {kr(VOI1)} &lt; {kr(VOI)}: the delayed study is worth "
                f"<b>{kr(VOI - VOI1)} NOK less</b>. Waiting a year costs you the Year-1 cash flow in "
                "the good state, partly offset by paying the investment a year later:</p>"
                "<table class=\"data\"><tr><th>Effect of waiting one year (good state)</th><th>Value</th></tr>"
                f"<tr><td>Year-1 cash flow lost: {kr(c_hi)} / 1.08</td><td class=\"n\">{kr(-tap_aar1)}</td></tr>"
                f"<tr><td>Investment paid later: 2,200,000 − 2,200,000/1.08</td>"
                f"<td class=\"n\">+{kr(spar_inv)}</td></tr>"
                f"<tr><td>Net</td><td class=\"n\">{kr(spar_inv - tap_aar1)}</td></tr>"
                f"<tr><td>× probability 0.5</td><td class=\"n\">{kr(0.5 * (spar_inv - tap_aar1))}</td></tr>"
                "</table>"
                f"<p><b>Check.</b> {kr(VOI)} − {kr(VOI - VOI1)} = {kr(VOI1)} ✓. Mentioning the lost "
                "Year-1 cash flow is enough for full marks; the decomposition is a bonus.</p>"
            ),
            "criteria": [
                "Notes that you would not open immediately, so waiting for the study costs nothing in "
                "the base case.",
                f"Discounts the good-state NPV one year: {kr(N_hi)}/1.08 = {kr(N_hi_del)}; "
                "redoing it from scratch is equally fine.",
                f"C_1 = 0.5 × {kr(N_hi_del)} = {kr(VOI1)}.",
                f"States that it is lower than in (b), by {kr(VOI - VOI1)}.",
                "Explains why: the Year-1 cash flow is lost (the minimal accepted reason, as in the "
                "H2025 key), partly offset by investing later.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>For the rest of the exercise, the study is not available.</p>"
                "<p>A competitor offers you a contract: at the end of Year 1, after you have received "
                "the Year-1 cash flow, you may sell the hall to the competitor for 1,300,000 NOK and "
                "leave the market. The offer is valid only at that date. What is the NPV of opening the "
                "hall now? Will you open it? By how much does the competitor's offer raise the NPV of "
                "opening the hall compared with (a)?</p>"
            ),
            "solution": (
                "<p>You must open before you know the state, so you receive the Year-1 cash flow in "
                "both states. At the end of Year 1 you know the state and compare continuing with "
                "selling.</p>"
                "<table class=\"data\"><tr><th>State at date 1</th><th>Continue: value of the remaining "
                "perpetuity</th><th>Sell</th><th>Decision</th></tr>"
                f"<tr><td>Good</td><td class=\"n\">{kr(c_hi)} / 0.08 = {kr(fort_hi)}</td>"
                f"<td class=\"n\">1,300,000</td><td>continue</td></tr>"
                f"<tr><td>Bad</td><td class=\"n\">{kr(c_lo)} / 0.08 = {kr(fort_lo)}</td>"
                f"<td class=\"n\">1,300,000</td><td>sell</td></tr></table>"
                f"<p><b>Good state.</b> You never sell, so the NPV is unchanged: <b>+{kr(N_hi)}</b>.</p>"
                "<p><b>Bad state.</b> You collect the Year-1 cash flow and sell:</p>"
                f"<p>NPV<sup>bad</sup> = −2,200,000 + ({kr(c_lo)} + 1,300,000) / 1.08 = −2,200,000 + "
                f"{kr((c_lo + S5) / (1 + r5))} = <b>{kr(N_lo_d)}</b></p>"
                f"<p><b>Expected NPV.</b> 0.5({kr(N_hi)}) + 0.5({kr(N_lo_d)}) = {kr(0.5 * N_hi)} − "
                f"{kr(-0.5 * N_lo_d)} = <b>+{kr(NPV5d)} NOK</b>. <b>Yes, open the hall now.</b></p>"
                f"<p><b>How much the offer raises the NPV of opening.</b> {kr(NPV5d)} − ({kr(NPV5)}) = "
                f"<b>{kr(opsj5)} NOK</b>.</p>"
                "<p><b>Check (independent route).</b> The option changes only the bad branch, where it "
                f"replaces a continuation value of {kr(fort_lo)} with 1,300,000 at date 1: "
                f"0.5 × (1,300,000 − {kr(fort_lo)}) / 1.08 = 0.5 × {kr((S5 - fort_lo) / (1 + r5))} = "
                f"{kr(opsj5)} ✓. It is a put on the hall, struck at the sale price.</p>"
                "<p><b>What the contract is worth to you.</b> Without the offer you would not open the "
                f"hall at all (part a), which is worth max(0, {kr(NPV5)}) = 0. With it you open and get "
                f"+{kr(NPV5d)}, so the contract is worth <b>{kr(kontrakt5)} NOK</b> to you: the most you "
                f"would pay for it. The {kr(opsj5)} measures how much the offer raises the NPV of "
                f"opening; the {kr(kontrakt5)} measures how much it raises the value of the opportunity "
                f"once you are free to say no. An answer of {kr(kontrakt5)} with this reasoning also "
                "earns full marks.</p>"
            ),
            "criteria": [
                "Gets the timing right: you commit before learning the state, so Year 1 is received "
                "in both states and the sale happens at date 1 only.",
                f"Compares continuing with selling at date 1: continue in the good state "
                f"({kr(fort_hi)} > 1,300,000), sell in the bad state ({kr(fort_lo)} < 1,300,000).",
                f"Bad-state NPV = −2,200,000 + ({kr(c_lo)} + 1,300,000)/1.08 = {kr(N_lo_d)}.",
                f"Expected NPV = +{kr(NPV5d)}; yes, open.",
                f"The offer raises the NPV of opening by {kr(opsj5)} = {kr(NPV5d)} − ({kr(NPV5)}), "
                f"confirmed by 0.5 × (1,300,000 − {kr(fort_lo)})/1.08.",
                f"Also full marks: {kr(kontrakt5)}, if argued that without the offer you would not open "
                f"(worth max(0, {kr(NPV5)}) = 0), so the contract is worth {kr(kontrakt5)} to you, the "
                "most you would pay for it.",
            ],
        },
        {
            "label": "e", "points": 6,
            "body": (
                "<p>Your partner tells you that the revenue figures are uncertain. Revenue is still "
                "500,000 NOK per year in expectation, so you can write the two states as 500,000 − X "
                "NOK and 500,000 + X NOK. Find the X for which you are indifferent about opening the "
                "hall (the option to sell at the end of Year 1 is still there). Explain briefly why, once "
                "X is large enough that you would sell in the bad state, a larger X makes the hall more "
                "attractive.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Net cash flows as functions of X.</b> {kr(m5)} + X in the good state "
                f"and {kr(m5)} − X in the bad state. Assume you sell in the bad state and continue in "
                "the good one (verified in Step 4).</p>"
                f"<p>NPV<sup>good</sup>(X) = −2,200,000 + ({kr(m5)} + X) / 0.08<br>"
                f"NPV<sup>bad</sup>(X) = −2,200,000 + ({kr(m5)} − X + 1,300,000) / 1.08</p>"
                "<p><b>Step 2. Set the expected NPV to zero</b> and multiply by 2:</p>"
                f"<p>4,400,000 = 12.5({kr(m5)} + X) + ({kr(m5 + S5)} − X) / 1.08<br>"
                f"4,400,000 = {kr(vist_m)} + 12.5X + {kr(vist_s)} − {f(inv108, 6)}X<br>"
                f"4,400,000 − {kr(vist_m)} − {kr(vist_s)} = (12.5 − {f(inv108, 6)})X<br>"
                f"{kr(vist_rhs)} = {f(koef, 6)}X</p>"
                f"<p><b>X = {kr(vist_rhs)} / {f(koef, 6)} = {kr(X5)} NOK</b></p>"
                "<p><b>Step 3. Verify.</b></p>"
                "<table class=\"data\"><tr><th>State</th><th>Calculation</th><th>NPV</th></tr>"
                f"<tr><td>Good</td><td>−2,200,000 + {kr(gx)} / 0.08 = −2,200,000 + {kr(gx / r5)}</td>"
                f"<td class=\"n\">+{kr(Ng_x)}</td></tr>"
                f"<tr><td>Bad</td><td>−2,200,000 + ({kr(bx)} + 1,300,000) / 1.08 = −2,200,000 + "
                f"{kr((bx + S5) / (1 + r5))}</td><td class=\"n\">{kr(Nb_x)}</td></tr>"
                f"<tr><td>Expected</td><td>0.5({kr(Ng_x)}) + 0.5({kr(Nb_x)})</td><td class=\"n\">0</td></tr>"
                "</table>"
                f"<p><b>Step 4. Check that the assumed decisions hold.</b> In the bad state continuing is "
                f"worth {kr(bx)} / 0.08 = {kr(bx / r5)} &lt; 1,300,000, so selling is right; in the good "
                f"state {kr(gx / r5)} &gt; 1,300,000, so continuing is right ✓. Selling is optimal in the "
                f"bad state whenever X &gt; {kr(grense)}; for smaller X the option is never used, the NPV "
                f"stays at {kr(NPV5)} and there is no second solution. The original X = 100,000 lies "
                f"above {kr(X5)}, which is consistent with the positive NPV in (d) ✓.</p>"
                f"<p><b>Why a larger X helps (for X &gt; {kr(grense)}).</b> Below {kr(grense)} you would "
                f"never sell, the NPV is {kr(NPV5)} whatever X is and the spread does not matter. Above "
                "it, a wider spread raises the good branch through a "
                "perpetuity (+X/0.08 = 12.5X) but lowers the bad branch only through the Year-1 cash "
                "flow (−X/1.08), because after Year 1 the hall is sold for a fixed 1,300,000. The sale "
                "option truncates the downside, so more dispersion with the same expectation adds "
                "value, the same logic that makes an option worth more when volatility rises.</p>"
            ),
            "criteria": [
                f"Writes the net cash flows as {kr(m5)} ± X, not 500,000 ± X.",
                "Keeps the asymmetry: perpetuity in the good state, one year of cash flow plus "
                "1,300,000 at date 1 in the bad state; 2,200,000 is paid in both.",
                f"Sets the expected NPV to zero and solves: X = {kr(X5)}. Show the equation.",
                f"Checks that selling is really optimal in the bad state at that X (it requires X above "
                f"{kr(grense)}) and continuing in the good state.",
                f"(bonus) Notes that the original X = 100,000 lies above {kr(X5)}, consistent with (d).",
                f"Explains the mechanism: for X above {kr(grense)}, where you sell in the bad state, the "
                "option to sell caps the downside, so the project's value rises with the spread even "
                "though expected revenue is unchanged.",
            ],
        },
    ],
}

# ------------------------------------------------------------------ Oppgave 6
ex6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions", "chapters": [13, 26],
    "body": (
        "<p>Company A has announced an offer to acquire company B in a stock swap: B's shareholders "
        "will receive 0.52 shares of A for each share of B. Before the announcement, A had 40 million "
        "shares trading at $75 and B had 15 million shares trading at $32. These prices reflected the "
        "stand-alone values of the two companies. The management of A estimates the present value of "
        "the synergies at S = $180 million.</p>"
    ),
    "parts": [
        {
            "label": "a", "points": 6,
            "body": (
                "<p>Using management's estimate of the synergies, find the share price of the merged "
                "company and the NPV of the deal to A's shareholders and to B's shareholders.</p>"
            ),
            "solution": (
                f"<p><b>Step 1. Stand-alone values.</b> A = 40 × 75 = <b>{f(A6, 0)}</b> and "
                f"T = 15 × 32 = <b>{f(T6, 0)}</b> ($ million).</p>"
                f"<p><b>Step 2. New shares and merged price.</b> x = 0.52 × 15 = <b>{f(x6, 1)} million</b> "
                f"new A shares, so the merged company has 40 + {f(x6, 1)} = {f(Ntot, 1)} million shares "
                f"and is worth A + T + S = {f(A6, 0)} + {f(T6, 0)} + 180 = {f(V6, 0)}:</p>"
                f"<p>P<sub>new</sub> = {f(V6, 0)} / {f(Ntot, 1)} = <b>${f(Pn)}</b></p>"
                f"<p><b>Step 3. The two NPVs (formula sheet).</b> y = {f(x6, 1)} / {f(Ntot, 1)} = "
                f"{f(y6, 8)}</p>"
                f"<p>NPV<sub>A</sub> = (1 − {f(y6, 8)})({f(V6, 0)}) − {f(A6, 0)} = "
                f"{f((1 - y6) * V6)} − {f(A6, 0)} = <b>+${f(NPVA)}M</b><br>"
                f"NPV<sub>T</sub> = {f(y6, 8)}({f(V6, 0)}) − {f(T6, 0)} = {f(y6 * V6)} − {f(T6, 0)} = "
                f"<b>+${f(NPVT)}M</b></p>"
                f"<p><b>First check (can fail).</b> The acquirer's NPV is its old shares' price change: "
                f"40 × ({f(Pn)} − 75) = 40 × {f(Pn - PA, 6)} = {f(NPVA)} ✓. This route does not use y.</p>"
                f"<p><b>Second check (an identity).</b> {f(NPVA)} + {f(NPVT)} = {f(NPVA + NPVT)} = S ✓. "
                "It holds for any exchange ratio, so it only catches an arithmetic slip.</p>"
                f"<p><b>Bonus.</b> B's holders were offered 0.52 × 75 = {f(ER * PA, 2)}, a premium of "
                f"{pc(pr_off, 3)}, but receive 0.52 × {f(Pn)} = {f(ER * Pn)}, an actual premium of "
                f"{pc(pr_act)}. Check: {f(T6, 0)} × {f(pr_act, 6)} = {f(T6 * pr_act)} = NPV<sub>T</sub> ✓.</p>"
            ),
            "criteria": [
                f"Stand-alone values A = {f(A6, 0)} and T = {f(T6, 0)}; new shares x = 0.52 × 15 = "
                f"{f(x6, 1)} million.",
                f"P_new = (A + T + S)/(N_A + x) = {f(V6, 0)}/{f(Ntot, 1)} = {f(Pn)}.",
                f"y = {f(x6, 1)}/{f(Ntot, 1)} = {f(y6, 6)}, NPV_A = +{f(NPVA)} and NPV_T = "
                f"+{f(NPVT)}, with the formula-sheet expressions shown.",
                f"Checks NPV_A = N_A(P_new − P_A) = 40 × {f(Pn - PA)} or NPV_A + NPV_T = 180.",
                "Using post-announcement prices as stand-alone values double counts the synergy.",
            ],
        },
        {
            "label": "b", "points": 6,
            "body": (
                "<p>Using management's estimate of the synergies, what is the maximum exchange ratio "
                "that A's shareholders should accept? What is the minimum exchange ratio that B's "
                "shareholders should accept? Where does the offer of "
                "0.52 lie in this range? What share of the synergies does each side capture?</p>"
            ),
            "solution": (
                "<p><b>Step 1. The maximum (formula sheet).</b> A's NPV must not turn negative:</p>"
                f"<p>ER<sub>max</sub> = [(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>) = "
                f"[({f(T6, 0)} + 180)/{f(A6, 0)}] × (40/15) = {f((T6 + S6) / A6)} × {f(NA / NT, 6)} = "
                f"<b>{f(ERmax)}</b></p>"
                f"<p>Equivalently (P<sub>T</sub> + S/N<sub>T</sub>)/P<sub>A</sub> = (32 + 12)/75 = "
                f"{f(ERmax)}: B's price plus all of the synergy per B share, paid in A shares.</p>"
                "<p><b>Step 2. The minimum.</b> B's NPV must not turn negative, so S moves to the "
                "denominator:</p>"
                f"<p>ER<sub>min</sub> = [T/(A + S)] × (N<sub>A</sub>/N<sub>T</sub>) = "
                f"[{f(T6, 0)}/{f(A6 + S6, 0)}] × (40/15) = {f(T6 / (A6 + S6), 6)} × {f(NA / NT, 6)} = "
                f"<b>{f(ERmin)}</b></p>"
                f"<p>The shortcut 32/75 = {f(ERmin_naiv)} sets B's new shares equal to 32 at A's old "
                "price, but the merged shares are worth more than 75 because they include S, so B's "
                f"holders already break even at {f(ERmin)}. The shortcut earns partial credit.</p>"
                f"<p><b>Step 3. Where the offer lies.</b> {f(ERmin)} &lt; 0.52 &lt; {f(ERmax)}: inside "
                f"the range, so both sides gain. A captures {f(NPVA)}/180 = <b>{pc(andA, 2)}</b> of the "
                f"synergies and B captures {f(NPVT)}/180 = <b>{pc(andT, 2)}</b>.</p>"
                f"<p><b>Check.</b> At ER<sub>max</sub>, x = {f(xmax, 1)} and P<sub>new</sub> = "
                f"{f(V6, 0)}/{f(NA + xmax, 1)} = {f(V6 / (NA + xmax), 2)} = P<sub>A</sub> ✓: the acquirer "
                f"breaks even exactly when its price is unmoved. At ER<sub>min</sub>, P<sub>new</sub> = "
                f"{f(V6, 0)}/{f(NA + xmin, 6)} = {f(Pmin, 2)} and B receives {f(ERmin, 6)} × "
                f"{f(Pmin, 2)} = {f(ERmin * Pmin, 2)} = P<sub>T</sub> ✓.</p>"
            ),
            "criteria": [
                f"ER_max = [(T + S)/A](N_A/N_T) = {f(ERmax)}, from the formula sheet.",
                f"ER_min = [T/(A + S)](N_A/N_T) = {f(ERmin)}: the same derivation with S in the "
                "denominator. Not on the sheet, so it must be derived or remembered. Partial credit for "
                f"ER_min = 32/75 = {f(ERmin_naiv)}, which ignores that B's holders also share in S.",
                f"The offer lies inside [{f(ERmin)}, {f(ERmax)}], so both NPVs are positive.",
                f"Split of the synergies: A {pc(andA, 2)}, B {pc(andT, 2)}.",
                "Show the calculation; a range without the formulas earns little.",
            ],
        },
        {
            "label": "c", "points": 4,
            "body": (
                "<p>Immediately after the announcement, A's share price falls to $74.00 and B's share "
                "price rises to $38.48, which is exactly 0.52 × $74.00: the market regards completion "
                "of the deal as certain. What value of the synergies does the market's reaction imply? "
                "What is the NPV of the deal to each set of shareholders at the market's estimate?</p>"
            ),
            "solution": (
                "<p><b>Step 1. Implied synergies.</b> Together the two sets of shareholders own the "
                "whole merged company, so the change in their combined market value is the market's "
                "estimate of S:</p>"
                f"<p>After: 40 × 74.00 + 15 × 38.48 = {f(NA * PA1, 1)} + {f(NT * PT1, 1)} = "
                f"{f(NA * PA1 + NT * PT1, 1)}<br>Before: {f(A6, 0)} + {f(T6, 0)} = {f(A6 + T6, 0)}<br>"
                f"<b>S<sub>implied</sub> = {f(S_imp, 1)} million</b>, against management's 180.</p>"
                f"<p>Same answer from the merged price: 74.00 = ({f(A6 + T6, 0)} + S)/{f(Ntot, 1)} "
                f"&rArr; S = {f(PA1 * Ntot, 1)} − {f(A6 + T6, 0)} = {f(S_imp2, 1)} ✓</p>"
                "<p><b>Step 2. NPVs at the market's estimate.</b></p>"
                f"<p>NPV<sub>A</sub> = 40 × (74.00 − 75.00) = <b>{f(NPVA_m, 1)} million</b><br>"
                f"NPV<sub>T</sub> = 15 × (38.48 − 32.00) = <b>+{f(NPVT_m, 1)} million</b><br>"
                f"Sum: {f(NPVA_m, 1)} + {f(NPVT_m, 1)} = {f(NPVA_m + NPVT_m, 1)} = S<sub>implied</sub> ✓</p>"
                f"<p><b>What it implies.</b> The market believes the synergies are about {f(S_imp, 1)} "
                "million, not 180, so at 0.52 A pays B more than the deal creates: A's shareholders "
                f"lose {f(-NPVA_m, 0)} million and B's gain {f(NPVT_m, 1)} million. At the market's "
                f"estimate the highest ratio A could accept is (32 + {f(S_imp, 1)}/15)/75 = "
                f"{f(ERmax_m)}, below the 0.52 offered.</p>"
                f"<p><b>Check.</b> With S = {f(S_imp, 1)} the formula sheet gives NPV<sub>T</sub> = "
                f"{f(y6, 8)}({f(A6 + T6 + S_imp, 1)}) − {f(T6, 0)} = {f(y_chk, 1)} ✓, the same as from "
                "B's price change.</p>"
            ),
            "criteria": [
                f"Implied synergies = change in combined market value: (2,960 + 577.2) − 3,480 = "
                f"{f(S_imp, 1)}, or from P_new = 74.00.",
                f"NPV_A = 40 × (74 − 75) = {f(NPVA_m, 0)} and NPV_T = 15 × (38.48 − 32) = "
                f"{f(NPVT_m, 1)}; they sum to {f(S_imp, 1)}.",
                "(bonus) Interprets the result: the market thinks A overpays, so the deal destroys "
                "value for A's shareholders and transfers it to B's.",
                f"(bonus) At the market's estimate ER_max = {f(ERmax_m)}, below 0.52.",
            ],
        },
        {
            "label": "d", "points": 4,
            "body": (
                "<p>The calculation in (c) assumes that the announcement told the market nothing new "
                "about the stand-alone value of A or B. Give one reason, other than lower synergies, why "
                "A's share price could fall when A announces a bid paid in its own shares. Explain in "
                "2-3 sentences what that reason implies for the synergy estimate in (c).</p>"
            ),
            "solution": (
                "<p><b>Model answer (signalling through the method of payment).</b> A manager who "
                "believes his shares are undervalued prefers to pay cash, while one who believes they "
                "are overvalued prefers to pay with them, so by the Myers-Majluf logic the market reads "
                "a stock offer as a sign that A is overvalued and marks down A's stand-alone value. "
                "Part of A's $1 fall is then a revaluation of A itself, not a verdict on the deal. The "
                f"estimate in (c) therefore understates the synergies the market expects: if A's "
                f"stand-alone value was revised down by Δ, the market's synergy estimate is "
                f"{f(S_imp, 1)} + Δ.</p>"
                "<p><b>Other reasons that score equally, with the same direction.</b> The bid reveals "
                "that A's managers are empire builders or overconfident and will overpay again, so the "
                "market lowers A's value for future deals too (an agency problem, not a synergy "
                "problem). Or the bid signals that A's own business is weaker than thought, since it "
                "has to buy growth. In each case A's stand-alone value falls and "
                f"S<sub>implied</sub> = {f(S_imp, 1)} is too low.</p>"
                "<p><b>Not accepted.</b> «The synergies are smaller» (excluded by the question) and «the "
                "deal may fail» (excluded by B trading at exactly 0.52 × 74.00).</p>"
            ),
            "criteria": [
                "Gives one reason other than synergies: stock payment as a signal of overvaluation "
                "(Myers-Majluf), empire building or hubris revealed by the bid, or bad news about A's "
                "own business.",
                "Explains the mechanism in 2-3 sentences; naming the reason without the mechanism is "
                "worth little.",
                "States the consequence for (c): part of A's fall is a revaluation of A, so 57.2 "
                "understates the synergies the market expects.",
                "'The deal may fail' is not a valid answer here: B's price equals 0.52 × A's price.",
            ],
        },
    ],
}

SETT = {
    "id": "prove1",
    "kind": "mock",
    "label": "Mock exam 1",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format and closest to the autumn 2025 paper: options "
        "intuition and governance as the two verbal exercises, then an MM recapitalisation, a "
        "two-period WACC and APV valuation, real options and a stock-swap merger. New firms and "
        "numbers throughout, with twists the real papers did not use: an all-equity start with "
        "homemade leverage, a debt schedule that rises instead of falling, an option to sell with a "
        "salvage value and a price reaction that disagrees with management. Not an official exam: "
        "the course has not checked the solutions."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): 180 minutes, 100 points, six exercises, no "
        "multiple choice. Pen and paper, calculator and one bilingual dictionary.",
        "Points per exercise: 12 · 12 · 18 · 18 · 20 · 20. Exercises 1 and 2 are verbal with a "
        "sentence budget; exercises 3 to 6 are chains of calculations that end with a short verbal "
        "question.",
        "The formula sheet is handed out. Not on it, so memorise: V<sup>L</sup> = V<sup>U</sup> + "
        "PV(TS), which rate discounts the tax shield, D<sub>t</sub> = d·V<sub>t</sub>, put-call parity "
        "and the logic of real options.",
        "Show every calculation and carry 4 decimals on rates. Answer in English.",
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
            if not 2 <= len(d["criteria"]) <= 7:
                feil.append(f"oppgave {ex['n']}{d['label']}: {len(d['criteria'])} kriterier")
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

if feil:
    print("\nFEIL, prove1.json ble ikke skrevet:")
    for x in feil:
        print("  ✗", x)
    sys.exit(1)

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(SETT, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print(f"\nAlle kontroller bestått. Skrev {UT}")
