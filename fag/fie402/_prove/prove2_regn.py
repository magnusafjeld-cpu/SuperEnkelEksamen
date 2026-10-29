#!/usr/bin/env python3
"""Prøveeksamen 2 i FIE402 («like H2024»): regner ut hvert tall og skriver prove2.json.

Kjør:  python3 -I fag/fie402/_prove/prove2_regn.py

Alle tall i oppgavetekst, løsning og kriterier hentes fra variablene under.
Konsistenssjekkene er assert-setninger, og skriptet stopper hvis en av dem feiler.
Til slutt sjekkes skrivereglene (ingen tankestrek, ingen komma før «and»)."""

import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "prove2.json")


# ---------------------------------------------------------------- hjelpere
def f(x, d=4):
    """Tall med d desimaler, tusenskille og ekte minustegn."""
    s = f"{x:,.{d}f}"
    return s.replace("-", "−")


def pc(x, d=4):
    """Rente som prosent med d desimaler."""
    return f(100 * x, d) + "%"


def eq(a, b, tol=1e-9):
    assert abs(a - b) < tol, (a, b)


def sum_ok(deler, total, d):
    """Avrundede delsummer skal summere til avrundet total (forfatterspek 9.5)."""
    s = sum(round(x, d) for x in deler)
    assert abs(s - round(total, d)) < 10 ** -(d + 3), (deler, total, d, s)


def ok(x):
    return "✓"


CHECK = "✓"

# ======================================================================
# Exercise 3 · MM uten skatt, risikabel gjeld, gjeldsfinansiert utbytte
# ======================================================================
N0 = 25.0          # millioner aksjer
P0 = 60.0          # NOK per aksje
D_old = 300.0      # NOK mill., risikofri
rf3 = 0.04
rm3 = 0.10
bE3 = 1.15
D_new = 750.0
rD_new = 0.05

mrp3 = rm3 - rf3
rE3 = rf3 + bE3 * mrp3
E3 = N0 * P0
V3 = E3 + D_old
wE3, wD3 = E3 / V3, D_old / V3
rU3 = wE3 * rE3 + wD3 * rf3
eq(rE3, 0.109)
eq(rU3, 0.0975)
sum_ok([wE3 * rE3, wD3 * rf3], rU3, 6)
bU3 = wE3 * bE3
eq(rf3 + bU3 * mrp3, rU3)                         # betaruten gir samme r_U
eq(rU3 + (D_old / E3) * (rU3 - rf3), rE3)          # MM II baklengs

payout = D_new - D_old                             # bare dette når aksjonærene
DPS = payout / N0
E3_after = V3 - D_new
P_ex = E3_after / N0
fall = (P0 - P_ex) / P0
eq(P_ex + DPS, P0)                                 # formuen er uendret
eq(N0 * P_ex + payout, E3)                          # sjekk: total verdi til aksjonærene
eq(DPS, 18.0)
eq(P_ex, 42.0)
eq(fall, 0.30)
DPS_wrong = D_new / N0

DE3 = D_new / E3_after
rE3_new = rU3 + DE3 * (rU3 - rD_new)
bE3_new = (rE3_new - rf3) / mrp3
bD3 = (rD_new - rf3) / mrp3
wE3n, wD3n = E3_after / V3, D_new / V3
eq(wE3n * bE3_new + wD3n * bD3, bU3)               # sjekk 2 (identitet her)
eq(wE3n * rE3_new + wD3n * rD_new, rU3)            # førskatts WACC = r_U
sum_ok([wE3n * bE3_new, wD3n * bD3], bU3, 6)
sum_ok([wE3n * rE3_new, wD3n * rD_new], rU3, 6)
sum_ok([rU3, DE3 * (rU3 - rD_new)], rE3_new, 6)
rE3_oldrD = rU3 + DE3 * (rU3 - rf3)                 # feilen: gammel r_D
eq(wE3n * rE3_oldrD + wD3n * rf3, rU3)             # sjekken består likevel

n_rep = payout / P0
N1 = N0 - n_rep
P_rep = E3_after / N1
eq(P_rep, P0)
sell_frac = DPS / P0                                # hjemmelaget utbytte
eq((1 - sell_frac) / N1, 1 / N0)                    # samme eierandel
extra = DPS / P_ex                                  # reinvestering til ex-kurs
eq((1 + extra) / N0, 1 / N1)
eq(100 * (1 - sell_frac) / N1, 100 / N0)

# ======================================================================
# Exercise 4 · Risikoskifting og gjeldsoverheng
# ======================================================================
plans = {
    "S": [(1.0, 62.0)],
    "M": [(0.5, 100.0), (0.5, 20.0)],
    "R": [(0.25, 150.0), (0.75, 10.0)],
}


def V(pl):
    return sum(p * x for p, x in plans[pl])


def Eq(pl, F, extra=0.0):
    return sum(p * max(x + extra - F, 0.0) for p, x in plans[pl])


def Dt(pl, F, extra=0.0):
    return sum(p * min(x + extra, F) for p, x in plans[pl])


VS, VM, VR = V("S"), V("M"), V("R")
eq(VS, 62); eq(VM, 60); eq(VR, 45)
assert VS > VM > VR

F1 = 40.0
ES, EM, ER = Eq("S", F1), Eq("M", F1), Eq("R", F1)
DS, DM, DR = Dt("S", F1), Dt("M", F1), Dt("R", F1)
eq(ES, 22); eq(EM, 30); eq(ER, 27.5)
eq(DS, 40); eq(DM, 30); eq(DR, 17.5)
assert EM > ER > ES
for pl in "SMR":
    eq(Eq(pl, F1) + Dt(pl, F1), V(pl))
agency_b = VS - VM
eq((DM - DS) + (EM - ES), VM - VS)                  # sjekk 3

# (c) likegyldighet S~M i intervallet 20 < F <= 62: 62 - F = 50 - 0.5F
Fstar = (62.0 - 50.0) / 0.5
eq(Fstar, 24.0)
assert 20.0 < Fstar <= 62.0
eq(Eq("S", Fstar), Eq("M", Fstar))
assert Eq("R", Fstar) < Eq("S", Fstar)
# M~R: 50 - 0.5F = 37.5 - 0.25F
Fstar2 = (50.0 - 37.5) / (0.5 - 0.25)
eq(Fstar2, 50.0)
assert 20.0 < Fstar2 <= 100.0
eq(Eq("M", Fstar2), Eq("R", Fstar2))
assert Eq("S", Fstar2) < Eq("M", Fstar2)
# S~R ville krysset ved 32.67, men M tar over først
F_SR = (62.0 - 37.5) / (1 - 0.25)
assert Fstar < F_SR < Fstar2
# numerisk kontroll av valget over et rutenett
for k in range(0, 1201):
    F = k / 10
    vals = {pl: Eq(pl, F) for pl in "SMR"}
    best = max(vals, key=vals.get)
    if F < Fstar - 1e-9:
        assert best == "S", F
    elif Fstar + 1e-9 < F < Fstar2 - 1e-9:
        assert best == "M", F
    elif Fstar2 + 1e-9 < F < 150:
        assert best == "R", F
grid = [0.0, 20.0, Fstar, F1, Fstar2, 60.0]
agency_high = VS - VR

# (d) gjeldsoverheng
I4, X4 = 6.0, 10.0
NPV4 = X4 - I4
D0_4, E0_4 = Dt("M", F1), Eq("M", F1)
D1_4, E1_4 = Dt("M", F1, X4), Eq("M", F1, X4)
gain_cred = D1_4 - D0_4
gain_sh = E1_4 - E0_4 - I4
eq(gain_cred, 5); eq(gain_sh, -1)
assert gain_sh < 0 < NPV4
eq(gain_cred + gain_sh, NPV4)                       # sjekk 3
assert 20 + X4 <= F1                                # lavt utfall fortsatt mislighold

# (e) reforhandling: kreditorer D(F') >= 30, aksjonærer E(F') - 6 >= 30
Flo, Fhi = None, None
for k in range(0, 4001):
    Fp = k / 100
    c_ok = Dt("M", Fp, X4) >= D0_4 - 1e-12
    s_ok = Eq("M", Fp, X4) - I4 >= E0_4 - 1e-12
    if c_ok and s_ok:
        Flo = Fp if Flo is None else Flo
        Fhi = Fp
eq(Flo, 30.0); eq(Fhi, 38.0)
for Fp in [30.0, 34.0, 38.0]:
    eq((Dt("M", Fp, X4) - D0_4) + (Eq("M", Fp, X4) - I4 - E0_4), NPV4)
Fmid = 34.0
gc_mid = Dt("M", Fmid, X4) - D0_4
gs_mid = Eq("M", Fmid, X4) - I4 - E0_4
eq(gc_mid, 2); eq(gs_mid, 2)

# ======================================================================
# Exercise 5 · WACC og APV med tvillingfirma, risikabel gjeld og vekst
# ======================================================================
rf5, rm5 = 0.035, 0.09
mrp5 = rm5 - rf5
Ek, Dk = 1950.0, 1050.0          # Kildevann, markedsverdier
bEk, rDk = 1.30, 0.046
DE5 = 0.6                        # Fjellbekk, konstant D/E
rD5, tau5 = 0.05, 0.22
FCF1, g5 = 35.0, 0.02

Vk = Ek + Dk
wEk, wDk = Ek / Vk, Dk / Vk
eq(wEk, 0.65)
bDk = (rDk - rf5) / mrp5
eq(bDk, 0.2)
bU5 = wEk * bEk + wDk * bDk
eq(bU5, 0.915)
rU5 = rf5 + bU5 * mrp5
eq(rU5, 0.085325)
rEk = rf5 + bEk * mrp5
eq(wEk * rEk + wDk * rDk, rU5)                      # renteruten gir samme r_U
sum_ok([wEk * rEk, wDk * rDk], rU5, 6)
sum_ok([wEk * bEk, wDk * bDk], bU5, 4)
bU5_wrong = wEk * bEk
rU5_wrong = rf5 + bU5_wrong * mrp5

dV5 = DE5 / (1 + DE5)
eV5 = 1 / (1 + DE5)
rE5 = rU5 + DE5 * (rU5 - rD5)
eq(rE5, 0.10652)
eq(eV5 * rE5 + dV5 * rD5, rU5)
wacc5 = eV5 * rE5 + dV5 * rD5 * (1 - tau5)
eq(wacc5, rU5 - dV5 * tau5 * rD5)
sum_ok([eV5 * rE5, dV5 * rD5 * (1 - tau5)], wacc5, 6)

VL5 = FCF1 / (wacc5 - g5)
VU5 = FCF1 / (rU5 - g5)
D0_5 = dV5 * VL5
TS1 = tau5 * rD5 * D0_5
PVTS = TS1 / (rU5 - g5)
eq(VU5 + PVTS, VL5, 1e-9)                           # sjekk 1 (fastpunkt)
sum_ok([VU5, PVTS], VL5, 4)
# trykte mellomtall skal gi trykte resultater (forfatterspek 9.5)
eq(round(dV5 * round(VL5, 4), 4), round(D0_5, 4))
eq(round(tau5 * rD5 * round(D0_5, 4), 6), round(TS1, 6))
eq(round(round(TS1, 6) / round(rU5 - g5, 6), 4), round(PVTS, 4))
eq(round(FCF1 / round(wacc5 - g5, 6), 4), round(VL5, 4))
eq(round(FCF1 / round(rU5 - g5, 6), 4), round(VU5, 4))
E5v = VL5 - D0_5
eq(D0_5 / E5v, DE5)
PVTS_wrong = TS1 / (rD5 - g5)
VL5_wrong = VU5 + PVTS_wrong
bE5 = (rE5 - rf5) / mrp5
bD5 = (rD5 - rf5) / mrp5
eq(eV5 * bE5 + dV5 * bD5, bU5)                      # sjekk 2 (identitet)
sum_ok([eV5 * bE5, dV5 * bD5], bU5, 6)
D1_5 = D0_5 * (1 + g5)
TS2 = tau5 * rD5 * D1_5

# ======================================================================
# Exercise 6 · Realopsjon med risikonøytral prising fra et handlet tvillingselskap
# ======================================================================
I6 = 300.0
CH, CL = 48.0, 27.0
p6 = 0.5
r6, rf6 = 0.10, 0.03

EC = p6 * CH + (1 - p6) * CL
PV0 = EC / r6
NPV_now = PV0 - I6
eq(PV0, 375); eq(NPV_now, 75)
PVH1, PVL1 = CH / r6, CL / r6
NPVH1, NPVL1 = PVH1 - I6, PVL1 - I6
eq(NPVH1, 180); eq(NPVL1, -30)
eq(p6 * NPVH1 + (1 - p6) * NPVL1, NPV_now)          # sjekk ved tilstander
W_b = (p6 * max(NPVH1, 0) + (1 - p6) * max(NPVL1, 0)) / (1 + r6)
opt_b = W_b - max(NPV_now, 0)
assert opt_b > 0                                    # (b): vent
avoid = (1 - p6) * (-NPVL1)
delay = p6 * NPVH1 - p6 * NPVH1 / (1 + r6)
eq(avoid - delay, opt_b)                            # dekomponering
sum_ok([avoid, -delay], opt_b, 4)

S0 = 375.0                                          # Nordelvs markedsverdi
eq(S0, PV0)
SH, SL = CH + PVH1, CL + PVL1
eq(SH, 528); eq(SL, 297)
assert SL < (1 + rf6) * S0 < SH                     # ingen arbitrasje
num6 = (1 + rf6) * S0 - SL
den6 = SH - SL
rho = num6 / den6
eq(num6, 89.25); eq(den6, 231)
eq((rho * SH + (1 - rho) * SL) / (1 + rf6), S0)     # ρ priser tvillingen
eq((p6 * SH + (1 - p6) * SL) / (1 + r6), S0)        # og p med r gjør det samme
assert rho < p6
rho_wrong = ((1 + rf6) * S0 - PVL1) / (PVH1 - PVL1)  # uten år-1-utbyttet
assert 0 < rho_wrong < 1

W_d = (rho * max(NPVH1, 0) + (1 - rho) * max(NPVL1, 0)) / (1 + rf6)
opt_d = W_d - max(NPV_now, 0)
assert opt_d < 0 < opt_b                            # beslutningen snur
NPV_now_rn = (rho * SH + (1 - rho) * SL) / (1 + rf6) - I6
eq(NPV_now_rn, NPV_now)
Delta = (NPVH1 - 0) / (SH - SL)
B = (0 - SL * Delta) / (1 + rf6)
eq(S0 * Delta + B, W_d)                             # replikering
sum_ok([S0 * Delta, B], W_d, 4)
exp_ret_opt = p6 * NPVH1 / W_d - 1                   # opsjonens forventede avkastning
overval = W_b - W_d
rho_npv = ((1 + rf6) * NPV_now - NPVL1) / (NPVH1 - NPVL1)   # feilen: treet på NPV
assert abs(rho_npv - rho) > 0.05
eq(round(round(rho, 6) * NPVH1, 4), round(rho * NPVH1, 4))     # trykt ρ gir trykt verdi
eq(round(round(rho * NPVH1, 4) / (1 + rf6), 4), round(W_d, 4))
assert abs(round(rho, 4) * NPVH1 / (1 + rf6) - W_d) < 0.01      # toleransen i kriteriene

# ======================================================================
# Tekst
# ======================================================================
def tbl(header, rows):
    h = "".join(f"<th>{c}</th>" for c in header)
    body = ""
    for r in rows:
        cells = ""
        for i, c in enumerate(r):
            cls = ' class="n"' if i > 0 else ""
            cells += f"<td{cls}>{c}</td>"
        body += f"<tr>{cells}</tr>"
    return f'<table class="data"><tr>{h}</tr>{body}</table>'


rU_ = "r<sub>U</sub>"
rE_ = "r<sub>E</sub>"
rD_ = "r<sub>D</sub>"
rf_ = "r<sub>f</sub>"
bU_ = "β<sub>U</sub>"
bE_ = "β<sub>E</sub>"
bD_ = "β<sub>D</sub>"
tc_ = "τ<sub>c</sub>"
VL_ = "V<sup>L</sup>"
VU_ = "V<sup>U</sup>"
wacc_ = "r<sub>wacc</sub>"
M = "−"

# ---------------------------------------------------------------- Exercise 1
ex1 = {
    "n": 1, "title": "M&A", "points": 12, "topic": "Mergers and acquisitions", "chapters": [26],
    "body": (
        "<p>Nordhav Shipping ASA is a mature and highly profitable shipping company. It holds large cash "
        "reserves and has few profitable investment opportunities left in shipping. Its CEO has said publicly "
        "that he wants Nordhav to become «a diversified Nordic industrial group». Nordhav now announces an "
        "all-cash offer for Solgløtt Solar ASA, a listed producer of solar panels, at a premium of 40% over "
        "Solgløtt's pre-announcement share price. Solgløtt has accumulated large tax losses and has postponed "
        "two new factories because it has been unable to raise financing. The two businesses have nothing in "
        "common, so nobody expects synergies. On the announcement day Solgløtt's share price rises by 30% "
        "while Nordhav's share price falls by 5%.</p>"
        "<p>Give four reasons: two reasons why the acquisition could destroy value for Nordhav's shareholders "
        "(consistent with the fall in Nordhav's share price) and two reasons why the acquisition could "
        "nevertheless create value, that is, raise the combined value of the two firms. Reasons must be other than «synergies». «Diversification reduces risk» "
        "counts only if you explain who benefits from it. Keep explanations short, 1–2 sentences per reason "
        "(3 points per reason).</p>"
    ),
    "solution": (
        "<p>Four reasons, one to two sentences each, three points each. Synergies are banned, so every reason "
        "has to come from agency, overpayment, tax, financing constraints or a transfer of value. The text "
        "plants one fact for each of the obvious answers; tying each reason to a fact is what makes it "
        "convincing.</p>"
        "<p><b>Value-destroying for Nordhav's shareholders</b></p>"
        "<p><b>1. Empire building with free cash flow.</b> A CEO who sits on cash with no good projects gains "
        "salary, status and job security from running a larger firm, so he spends the cash on an acquisition "
        "even at a negative NPV instead of paying it out to shareholders. His stated wish to build «a "
        "diversified Nordic industrial group» and the 5% fall in Nordhav's price are what this agency explanation "
        "predicts.</p>"
        "<p><b>2. Overpayment through hubris.</b> With no synergies the 40% premium has to be earned back "
        "from whatever else the deal delivers; an overconfident CEO who overestimates that simply transfers "
        "the premium from Nordhav's shareholders to Solgløtt's. The 5% fall says the market expects the "
        "premium to exceed the value the deal creates.</p>"
        "<p><b>Value-creating despite no synergies</b></p>"
        "<p><b>3. Using the tax losses.</b> Solgløtt's accumulated losses are worth little on their own "
        "because it has no profits to offset them against, but highly profitable Nordhav can deduct them "
        "much sooner. The present value of the tax saved is a real gain, paid by the tax authority and not "
        "by anyone in the deal.</p>"
        "<p><b>4. Relieving a financing constraint.</b> Solgløtt has postponed two factories because it "
        "cannot raise financing, for example because new equity would be sold too cheaply under asymmetric "
        "information or because its existing debt creates debt overhang. If the factories have positive NPV, "
        "Nordhav's cash gets them built; their NPV is value the deal creates.</p>"
        "<p><b>Why diversification is not a free fifth reason.</b> Combining two unrelated businesses lowers "
        "total risk, but Nordhav's shareholders can diversify on their own by holding both shares without "
        "paying a 40% premium. The party that gains from the lower default risk is the creditors of the two "
        "firms (the coinsurance effect), so diversification moves value away from shareholders. Explained "
        "this way it is an accepted value-destroying reason; «it reduces risk, so it is good» earns "
        "nothing.</p>"
        "<p><b>Other accepted answers.</b> Destroying value: the bid signals that Nordhav has run out of good "
        "projects in its core business; weak governance that lets the CEO avoid paying out the cash; "
        "coinsurance, as above. Creating value: Solgløtt is undervalued and Nordhav has superior information "
        "(harder to argue for a shipping company buying a solar producer, so it needs a reason); a "
        "disciplinary takeover if Solgløtt is badly run; the more stable combined cash flow supports more "
        "debt and therefore a larger tax shield. Any well-explained reason other than synergies earns the "
        "points.</p>"
    ),
    "criteria": [
        "Exactly four reasons: two that destroy value for Nordhav's shareholders and two that create value. The exercise is graded reason by reason, 3 points each, so a missing reason costs a quarter of the exercise.",
        "Synergies in any disguise (cost savings, economies of scale, cross-selling) earn nothing. The text says the businesses have nothing in common.",
        "1–2 sentences per reason. Each reason must name the mechanism and say how it reaches value. Writing only «hubris» or «tax» is not enough.",
        "Strong answers use the facts in the text: the CEO's statement and the cash pile point to empire building, the 40% premium to overpayment, the tax losses to a tax gain, the postponed factories to a financing constraint.",
        "Diversification counts only with its beneficiary: shareholders can diversify themselves for free, while the lower default risk benefits the creditors (coinsurance). «Diversification reduces risk, so it creates value» earns nothing.",
        "Reasonable, well-explained alternatives are accepted, in line with Kurbatov's keys: a signal that the core business has no good projects, undervaluation with superior information, a disciplinary takeover, extra debt capacity and a larger tax shield.",
        "The 40% premium itself is a transfer from Nordhav's shareholders to Solgløtt's, not value creation, so «Solgløtt's shareholders get a premium» does not count as a value-creating reason. Note also that Solgløtt rising 30% against a 40% premium reflects the probability that the deal fails (k26.6), not evidence of overpayment.",
    ],
}

# ---------------------------------------------------------------- Exercise 2
ex2 = {
    "n": 2, "title": "Governance", "points": 12, "topic": "Corporate governance", "chapters": [27],
    "body": (
        "<p>Fjellvind ASA is a listed wind-power producer with dispersed ownership. Its CEO receives a high "
        "fixed salary plus a cash bonus whenever the annual accounting profit beats a target set by the "
        "board. Shareholders complain that the CEO avoids risky but valuable projects, cuts maintenance at "
        "the end of the year to reach the profit target and shows little interest in the share price. The "
        "board wants to redesign the CEO's compensation.</p>"
        "<p>Select two distinct compensation designs the board could use. For each design, explain which "
        "incentive it creates for the CEO and one way it can backfire. Limit your explanations to 3–4 "
        "sentences per design (6 points per design).</p>"
    ),
    "solution": (
        "<p>Two designs, six points each: for each, the incentive it creates and one way it can backfire, "
        "in three to four sentences. Start from the problem in the text. A fixed salary has zero sensitivity "
        "to firm value. A bonus on this year's accounting profit rewards exactly the maintenance cuts the "
        "shareholders complain about.</p>"
        "<p><b>Design 1. Restricted shares with long vesting.</b> Part of the salary and the profit bonus is "
        "replaced by shares the CEO cannot sell for, say, four years. His wealth now rises and falls with "
        "the share price, so cutting maintenance to inflate one year's profit costs him personally once the "
        "share price reflects the damage; the long vesting stretches his horizon to match the "
        "shareholders'. It can backfire because his job and reputation already ride on Fjellvind, so loading "
        "him with its shares makes him even less diversified and may make him still more reluctant to take "
        "risky positive-NPV projects. It also pays him for luck: higher electricity prices lift the share "
        "price whatever he does, which a peer benchmark would remove.</p>"
        "<p><b>Design 2. Stock options.</b> Options give the CEO the gain in the share price above the "
        "strike, while his loss is limited to the options expiring worthless. This convex payoff "
        "counteracts his reluctance to take risk, so he becomes willing to undertake the risky but valuable "
        "projects the current contract discourages. It can backfire by overshooting: a convex payoff "
        "rewards volatility itself, so he may take risks that destroy value, the same mechanism as risk "
        "shifting by levered shareholders. If the share price falls far below the strike the options lose "
        "almost all incentive effect; boards then come under pressure to reprice them, which rewards "
        "failure.</p>"
        "<p><b>Other designs that score equally.</b> Relative performance evaluation: a bonus based on the "
        "return relative to other wind-power producers removes the luck in electricity prices, but the peer "
        "group can be gamed and the CEO is paid nothing in a rising market, which hurts retention. A deferred "
        "bonus with clawback: the bonus is paid over several years and reclaimed if the profits behind it "
        "turn out to be manipulated, which deters the maintenance cuts, but enforcement is slow and legally "
        "contested. A bonus on a long-run measure such as three-year total shareholder return. A higher "
        "salary is not an incentive design: its pay-performance sensitivity is zero.</p>"
    ),
    "criteria": [
        "Exactly two designs, genuinely distinct. Restricted shares and performance shares are close to one design; shares and options, or shares and relative performance evaluation, are clearly two.",
        "For each design: the incentive it creates (what the CEO now wants to do) and one concrete way it can backfire. The question asks for both; both are graded.",
        "3–4 sentences per design, as instructed.",
        "Name the mechanism: pay-performance sensitivity, a longer horizon, the convexity of options, paying for luck, an undiversified manager.",
        "Credit for linking to the text: the fixed salary and the accounting bonus explain the risk avoidance and the maintenance cuts.",
        "Any reasonable design with a well-explained incentive and drawback is accepted: restricted stock, options, relative performance evaluation, a deferred bonus with clawback, long-run return targets. A higher salary is not an incentive design.",
    ],
}

# ---------------------------------------------------------------- Exercise 3
e3_body = (
    f"<p>Lysefjord Logistics ASA currently has {f(N0, 0)} million shares outstanding at a share price of "
    f"NOK {f(P0, 0)} per share. The company operates in perfect capital markets with no taxes and has NOK "
    f"{f(D_old, 0)} million in debt. Its debt is risk-free. The risk-free rate is {pc(rf3, 0)}, the expected "
    f"return on the market portfolio is {pc(rm3, 0)} and Lysefjord's equity beta is {f(bE3, 2)}.</p>"
)

e3a_sol = (
    f"<p><b>Step 1. Cost of equity from the CAPM.</b></p>"
    f"<p>{rE_} = {rf_} + {bE_}(E[R<sub>Mkt</sub>] {M} {rf_}) = {f(rf3, 2)} + {f(bE3, 2)}({f(rm3, 2)} {M} {f(rf3, 2)}) "
    f"= {f(rf3, 2)} + {f(bE3 * mrp3, 3)} = <b>{f(rE3, 4)} ({pc(rE3)})</b></p>"
    f"<p><b>Step 2. Market values.</b> E = {f(N0, 0)}M × NOK {f(P0, 0)} = <b>NOK {f(E3, 0)}M</b>, D = <b>NOK "
    f"{f(D_old, 0)}M</b>, V = E + D = <b>NOK {f(V3, 0)}M</b>. Weights: E/V = {f(wE3, 6)} and D/V = {f(wD3, 6)}.</p>"
    f"<p><b>Step 3. {rU_} is the pre-tax WACC.</b> The market is perfect, so there is no (1 {M} {tc_}) term. "
    f"The debt is risk-free, so {rD_} = {rf_} = {pc(rf3, 0)}:</p>"
    f"<p>{rU_} = (E/V){rE_} + (D/V){rD_} = {f(wE3, 6)}({f(rE3, 4)}) + {f(wD3, 6)}({f(rf3, 2)}) "
    f"= {f(wE3 * rE3, 6)} + {f(wD3 * rf3, 6)} = <b>{f(rU3, 4)} ({pc(rU3)})</b></p>"
    f"<p><b>Check.</b> The beta route gives the same: {bU_} = {f(wE3, 6)}({f(bE3, 2)}) + {f(wD3, 6)}(0) = "
    f"{f(bU3, 6)} and {rU_} = {f(rf3, 2)} + {f(bU3, 6)}({f(mrp3, 2)}) = {f(rU3, 4)} {CHECK}. MM II run "
    f"backwards returns the cost of equity: {f(rU3, 4)} + ({f(D_old, 0)}/{f(E3, 0)})({f(rU3, 4)} {M} {f(rf3, 2)}) "
    f"= {f(rU3, 4)} + {f(D_old / E3, 1)}({f(rU3 - rf3, 4)}) = {f(rE3, 4)} {CHECK}. Both confirm the "
    f"arithmetic; neither would catch weights built from the wrong E, so take E from the share price.</p>"
)
e3a_crit = [
    f"Cost of equity from the CAPM: r_E = {pc(rf3, 0)} + {f(bE3, 2)}({pc(mrp3, 0)}) = {pc(rE3, 2)}. Multiplying the beta by the market return of {pc(rm3, 0)} instead of the risk premium of {pc(mrp3, 0)} is the classic slip.",
    f"E from the share price and the share count: {f(N0, 0)} × {f(P0, 0)} = NOK {f(E3, 0)}M, so V = NOK {f(V3, 0)}M with weights {f(wE3, 4)} and {f(wD3, 4)}.",
    f"Pre-tax weighting with no (1 − τ_c) term; r_D = r_f = {pc(rf3, 0)} because the debt is risk-free.",
    f"r_U = {pc(rU3)}. Show the calculation: no calculation, no points.",
]

e3b_body = (
    f"<p>The board announces that Lysefjord will issue NOK {f(D_new, 0)} million of new debt. The proceeds "
    f"will first be used to repay the existing debt; the rest will be paid out to shareholders as a special "
    f"dividend.</p><p>What happens to the share price immediately upon announcement of the transaction?</p>"
)
e3b_sol = (
    f"<p><b>Nothing happens. The share price stays at NOK {f(P0, 2)}.</b></p>"
    f"<p>Lysefjord operates in a perfect capital market. There are no taxes, so the new debt creates no "
    f"interest tax shield. There are no distress or agency costs either, so it destroys nothing. By MM "
    f"Proposition I the firm is worth what its assets produce, V = <b>NOK {f(V3, 0)}M</b>, whatever the "
    f"split between debt and equity. The announcement changes only that split, so there is no news to "
    f"price. Nothing has been paid out yet at the announcement, so E is still NOK {f(E3, 0)}M and "
    f"P = {f(E3, 0)}/{f(N0, 0)} = <b>NOK {f(P0, 2)}</b>.</p>"
    f"<p><b>Contrast.</b> With corporate taxes and permanent debt the announcement would be news: the "
    f"extra NOK {f(payout, 0)}M of debt would add {tc_} × {f(payout, 0)} to firm value, all of it to the "
    f"existing shareholders on the announcement day. Here {tc_} = 0, so the jump is zero.</p>"
)
e3b_crit = [
    f"States clearly that the share price is unchanged at NOK {f(P0, 0)}.",
    f"Gives the reason: perfect market and no taxes, so no tax shield is created and MM Proposition I keeps firm value at NOK {f(V3, 0)}M.",
    "Distinguishes the announcement from the execution: nothing has been paid out at the announcement, so the price cannot have fallen yet.",
    "Bonus for contrasting with the taxed case, where the announcement would raise the price by the present value of the new tax shield.",
]

e3c_body = (
    "<p>What is the special dividend per share? What is the share price after the dividend has been paid? "
    f"A shareholder complains that the share price has fallen by {pc(fall, 0)}, so the transaction has made "
    "the shareholders worse off. Is she right? Explain.</p>"
)
e3c_sol = (
    f"<p><b>Step 1. Trace the cash.</b> The firm raises NOK {f(D_new, 0)}M. NOK {f(D_old, 0)}M goes to repay the "
    f"old debt, so only {f(D_new, 0)} {M} {f(D_old, 0)} = <b>NOK {f(payout, 0)}M</b> reaches the shareholders:</p>"
    f"<p>Special dividend per share = {f(payout, 0)}/{f(N0, 0)} = <b>NOK {f(DPS, 2)}</b></p>"
    f"<p><b>Step 2. The ex-dividend price.</b> Firm value is unchanged at NOK {f(V3, 0)}M (MM I) and debt is now "
    f"NOK {f(D_new, 0)}M, so E = {f(V3, 0)} {M} {f(D_new, 0)} = <b>NOK {f(E3_after, 0)}M</b>. A dividend retires "
    f"no shares, so the share count is still {f(N0, 0)} million:</p>"
    f"<p>P<sub>ex</sub> = {f(E3_after, 0)}/{f(N0, 0)} = <b>NOK {f(P_ex, 2)}</b></p>"
    f"<p>The price falls by exactly the dividend: {f(P0, 2)} {M} {f(DPS, 2)} = {f(P_ex, 2)}.</p>"
    f"<p><b>Step 3. Is she right? No.</b> The price did fall by ({f(P0, 0)} {M} {f(P_ex, 0)})/{f(P0, 0)} = "
    f"{pc(fall, 0)}, but every shareholder received the difference in cash:</p>"
    + tbl(["One share held by the complaining shareholder", "Value, NOK"],
          [["Before the transaction: one share", f(P0, 2)],
           ["After: one share ex-dividend", f(P_ex, 2)],
           ["After: special dividend received", f(DPS, 2)],
           ["After: total wealth", f"<b>{f(P_ex + DPS, 2)}</b>"]])
    + f"<p>Her wealth is unchanged. The transaction moved value out of the share and into her pocket, "
    f"financed by selling a larger claim to the debt holders. In a perfect market that is pure "
    f"repackaging: MM Proposition I, plus the ordinary ex-dividend drop. A fall in price that is matched by "
    f"cash received is not a loss.</p>"
    f"<p><b>Check.</b> Total value to the original shareholders: {f(N0, 0)} × {f(P_ex, 0)} + {f(payout, 0)} = "
    f"{f(N0 * P_ex, 0)} + {f(payout, 0)} = <b>NOK {f(N0 * P_ex + payout, 0)}M</b>, the equity value before the "
    f"transaction {CHECK}. The check catches the main trap: paying out the full {f(D_new, 0)} (NOK "
    f"{f(DPS_wrong, 2)} per share) on top of a NOK {f(P_ex, 2)} share would give {f(N0, 0)} × {f(P_ex, 0)} + "
    f"{f(D_new, 0)} = {f(N0 * P_ex + D_new, 0)}, more than the {f(E3, 0)} the shareholders owned, which MM I "
    f"rules out.</p>"
)
e3c_crit = [
    f"Only the new debt minus the debt repaid reaches the shareholders: {f(D_new, 0)} − {f(D_old, 0)} = NOK {f(payout, 0)}M, so the dividend is NOK {f(DPS, 2)} per share. Dividing {f(D_new, 0)} by {f(N0, 0)} (NOK {f(DPS_wrong, 2)}) ignores the repayment and is the main trap.",
    f"E after = {f(V3, 0)} − {f(D_new, 0)} = NOK {f(E3_after, 0)}M over an UNCHANGED {f(N0, 0)} million shares: P = NOK {f(P_ex, 2)}. A dividend retires no shares.",
    f"Answers the complaint explicitly: she is wrong. NOK {f(P_ex, 0)} in shares plus NOK {f(DPS, 0)} in cash is NOK {f(P0, 0)}, the same as before.",
    "Names the mechanism: MM Proposition I and the ex-dividend price drop. A fall in price matched by cash received is not a loss.",
    f"The check {f(N0, 0)} × {f(P_ex, 0)} + {f(payout, 0)} = {f(E3, 0)} costs one line. Both halves (the new price and the welfare answer) are needed for the full 6 points.",
]

e3d_body = (
    f"<p>After the transaction the debt is no longer risk-free: its expected return is {pc(rD_new, 0)}. What is "
    "the new equity cost of capital? What is the new equity beta?</p>"
)
e3d_sol = (
    f"<p><b>Step 1. The new capital structure.</b> D = {f(D_new, 0)} and E = {f(E3_after, 0)}, so "
    f"D/E = {f(D_new, 0)}/{f(E3_after, 0)} = <b>{f(DE3, 6)}</b>.</p>"
    f"<p><b>Step 2. MM Proposition II with the new {rD_}.</b> The assets have not changed, so {rU_} stays at "
    f"{pc(rU3)}:</p>"
    f"<p>{rE_} = {rU_} + (D/E)({rU_} {M} {rD_}) = {f(rU3, 4)} + {f(DE3, 6)}({f(rU3, 4)} {M} {f(rD_new, 2)}) "
    f"= {f(rU3, 6)} + {f(DE3 * (rU3 - rD_new), 6)} = <b>{f(rE3_new, 6)} ({pc(rE3_new)})</b></p>"
    f"<p><b>Step 3. The equity beta from the CAPM.</b></p>"
    f"<p>{bE_} = ({rE_} {M} {rf_})/(E[R<sub>Mkt</sub>] {M} {rf_}) = ({f(rE3_new, 6)} {M} {f(rf3, 2)})/{f(mrp3, 2)} "
    f"= <b>{f(bE3_new, 4)}</b></p>"
    f"<p><b>Check.</b> The debt beta is {bD_} = ({f(rD_new, 2)} {M} {f(rf3, 2)})/{f(mrp3, 2)} = {f(bD3, 6)}. "
    f"The weights are E/V = {f(wE3n, 6)} and D/V = {f(wD3n, 6)}. Weighted betas: "
    f"{f(wE3n, 6)}({f(bE3_new, 6)}) + {f(wD3n, 6)}({f(bD3, 6)}) = {f(wE3n * bE3_new, 6)} + {f(wD3n * bD3, 6)} "
    f"= {f(bU3, 6)} = {bU_} from (a) {CHECK}. Pre-tax WACC: {f(wE3n, 6)}({f(rE3_new, 6)}) + "
    f"{f(wD3n, 6)}({f(rD_new, 2)}) = {f(wE3n * rE3_new, 6)} + {f(wD3n * rD_new, 6)} = {f(rU3, 4)} = {rU_} "
    f"{CHECK}. Be honest about what these show: {rE_} came from MM II, so both checks confirm the arithmetic "
    f"and that {rU_} is unchanged. Neither catches the wrong {rD_}: keeping the old {pc(rf3, 0)} gives "
    f"{rE_} = {pc(rE3_oldrD)} and both checks still pass with {bD_} = 0. Read the new {rD_} from the "
    f"question.</p>"
    f"<p><b>Mechanism.</b> Leverage raised {rE_} from {pc(rE3)} to {pc(rE3_new)}. With risk-free debt the rise "
    f"would have been larger ({pc(rE3_oldrD)}): once the debt is risky, the debt holders carry part of the "
    f"business risk, so less of it lands on the equity.</p>"
)
e3d_crit = [
    f"Uses the post-transaction structure D = {f(D_new, 0)}, E = {f(E3_after, 0)}, D/E = {f(DE3, 4)}. Using the old D/E of {f(D_old / E3, 1)} is the error to avoid.",
    f"Keeps r_U at {pc(rU3)}: a financing transaction does not change asset risk.",
    f"Applies MM II with the NEW r_D = {pc(rD_new, 0)}: r_E = {pc(rE3_new)}.",
    f"Equity beta from the CAPM: β_E = ({pc(rE3_new)} − {pc(rf3, 0)})/{pc(mrp3, 0)} = {f(bE3_new, 4)}.",
    f"Check: β_E and β_D = {f(bD3, 4)} weighted by {f(wE3n, 4)} and {f(wD3n, 4)} return β_U = {f(bU3, 4)}. Credit for noting that risky debt carries part of the business risk, so r_E rises less than with risk-free debt ({pc(rE3_oldrD)}).",
]

e3e_body = (
    "<p>Instead of a special dividend, the board considers a share repurchase: it still repays the existing "
    "debt first and uses the rest of the proceeds to repurchase shares.</p>"
    "<p>How many shares will be repurchased? What is the share price after the repurchase? Would a "
    "shareholder prefer the special dividend or the repurchase? Explain briefly.</p>"
)
e3e_sol = (
    f"<p><b>Step 1. Shares repurchased.</b> The repurchase is executed at the unchanged price of NOK {f(P0, 0)}:</p>"
    f"<p>n = {f(payout, 0)}/{f(P0, 0)} = <b>{f(n_rep, 1)} million shares</b>, leaving {f(N0, 0)} {M} {f(n_rep, 1)} = "
    f"<b>{f(N1, 1)} million</b>.</p>"
    f"<p><b>Step 2. The share price.</b> E = {f(E3_after, 0)} as before, so P = {f(E3_after, 0)}/{f(N1, 1)} = "
    f"<b>NOK {f(P_rep, 2)}</b>, unchanged. The firm pays exactly fair value for the shares it buys, so the "
    f"shareholders who stay neither gain nor lose.</p>"
    f"<p><b>Step 3. Dividend or repurchase?</b> In a perfect market the shareholder is <b>indifferent</b>. "
    f"Each route leaves NOK {f(P0, 0)} of wealth per original share. Each can also be turned into the other at "
    f"no cost. A holder who wants cash under the repurchase sells {f(DPS, 0)}/{f(P0, 0)} = {f(sell_frac, 1)} of "
    f"each share: {f(1 - sell_frac, 1)} × {f(P0, 0)} = {f((1 - sell_frac) * P0, 0)} in shares plus {f(DPS, 0)} in "
    f"cash, exactly the dividend position (a homemade dividend). Only frictions such as taxes on dividends, "
    f"transaction costs or signalling can break the tie.</p>"
    f"<p><b>Check.</b> Compare ownership fractions, not share counts. A holder of 100 shares owns "
    f"100/{f(N0, 0)} = {f(100 / N0, 1)} shares per million outstanding under the dividend. Under the repurchase "
    f"he sells {f(100 * sell_frac, 0)} shares for NOK {f(100 * DPS, 0)} and keeps {f(100 * (1 - sell_frac), 0)} "
    f"out of {f(N1, 1)} million: {f(100 * (1 - sell_frac), 0)}/{f(N1, 1)} = {f(100 * (1 - sell_frac) / N1, 1)} "
    f"per million {CHECK}. The same claim on the same equity, plus the same cash, is worth the same.</p>"
)
e3e_crit = [
    f"Repurchases with the NOK {f(payout, 0)}M left after repaying the old debt, at the unchanged price of NOK {f(P0, 0)}: {f(n_rep, 1)} million shares, leaving {f(N1, 1)} million. Using the full {f(D_new, 0)} is the trap.",
    f"Price after = {f(E3_after, 0)}/{f(N1, 1)} = NOK {f(P_rep, 0)}, unchanged, because the firm pays fair value for the shares it buys.",
    "Answers the preference question: in a perfect market the shareholder is indifferent, because both routes leave the same wealth per original share.",
    "Full marks for a reason (the homemade dividend or the equal ownership fractions) plus a note that only frictions such as taxes or signalling could break the tie.",
]

ex3 = {
    "n": 3, "title": "Capital Structure", "points": 18, "topic": "MM in perfect markets, recapitalisation",
    "chapters": [3, 4, 6, 15], "body": e3_body,
    "parts": [
        {"label": "a", "points": 3, "body": f"<p>What is the unlevered cost of capital ({rU_}) of the firm?</p>",
         "solution": e3a_sol, "criteria": e3a_crit},
        {"label": "b", "points": 3, "body": e3b_body, "solution": e3b_sol, "criteria": e3b_crit},
        {"label": "c", "points": 6, "body": e3c_body, "solution": e3c_sol, "criteria": e3c_crit},
        {"label": "d", "points": 3, "body": e3d_body, "solution": e3d_sol, "criteria": e3d_crit},
        {"label": "e", "points": 3, "body": e3e_body, "solution": e3e_sol, "criteria": e3e_crit},
    ],
}

# ---------------------------------------------------------------- Exercise 4
def pay_rows():
    rows = []
    for pl in "SMR":
        for i, (p, x) in enumerate(plans[pl]):
            rows.append((pl, i, len(plans[pl]), p, x))
    return rows


e4_tbl = '<table class="data"><tr><th></th><th>Probability</th><th>Payoff, NOK million</th></tr>'
for pl, i, k, p, x in pay_rows():
    first = f'<td rowspan="{k}">Plan {pl}</td>' if i == 0 and k > 1 else (f"<td>Plan {pl}</td>" if k == 1 else "")
    e4_tbl += f'<tr>{first}<td class="n">{f(100 * p, 0)}%</td><td class="n">{f(x, 0)}</td></tr>'
e4_tbl += "</table>"

e4_body = (
    "<p>Polarstein Mining AS must choose exactly one of three plans for developing its mine. Each plan pays "
    "off once (at t = 1) and needs no further investment. The outcomes are summarized in the following "
    "table:</p>" + e4_tbl +
    "<p>For example, plan M pays NOK 100 million with a 50% chance and NOK 20 million with a 50% chance. All "
    "investors are risk neutral and the risk-free rate is 0%, so no discounting is needed. If Polarstein has "
    "debt with face value F due at t = 1, the creditors receive min(payoff, F) and the shareholders receive "
    "max(payoff − F, 0). The manager acts in the best interests of Polarstein's shareholders.</p>"
)


def ev_line(pl, F=None, extra=0.0, kind="V"):
    parts = []
    for p, x in plans[pl]:
        x2 = x + extra
        if kind == "V":
            parts.append(f"{f(p, 2)}({f(x2, 0)})")
        elif kind == "E":
            parts.append(f"{f(p, 2)}({f(max(x2 - F, 0), 1)})")
        else:
            parts.append(f"{f(p, 2)}({f(min(x2, F), 1)})")
    return " + ".join(parts)


e4a_sol = (
    "<p>With no debt the shareholders own the whole payoff, so the manager simply maximises expected firm "
    "value:</p>"
    + tbl(["Plan", "Expected payoff", "Value"],
          [["S", ev_line("S"), f(VS, 1)], ["M", ev_line("M"), f(VM, 1)], ["R", ev_line("R"), f(VR, 1)]])
    + f"<p><b>The manager chooses plan S</b>, worth NOK {f(VS, 0)}M. It is the first-best choice and the "
    "benchmark for everything that follows. Note the ordering: S is the safest plan and the most valuable, "
    "R the riskiest and the least valuable. That ordering is what makes the next parts work.</p>"
)
e4a_crit = [
    "Recognises that with no debt equity value equals firm value, so the criterion is the highest expected payoff.",
    f"Computes all three: {f(VS, 0)}, {f(VM, 0)} and {f(VR, 0)}.",
    "Chooses S and calls it the first-best benchmark. Show the calculation.",
]

e4b_body = (
    f"<p>Assume that Polarstein has debt with a face value of NOK {f(F1, 0)} million, due at t = 1. Which plan "
    "will the manager choose? What are the values of debt and equity under that plan? What is the agency "
    "cost of debt?</p>"
)
e4b_sol = (
    f"<p><b>Step 1. Value both claims state by state.</b> Equity is the residual claim max(payoff {M} {f(F1, 0)}, 0); "
    f"debt gets min(payoff, {f(F1, 0)}):</p>"
    + tbl(["Plan", "Equity", "Equity value", "Debt value", "Firm value"],
          [["S", ev_line("S", F1, kind="E"), f(ES, 1), f(DS, 1), f(VS, 1)],
           ["M", ev_line("M", F1, kind="E"), f"<b>{f(EM, 1)}</b>", f(DM, 1), f(VM, 1)],
           ["R", ev_line("R", F1, kind="E"), f(ER, 1), f(DR, 1), f(VR, 1)]])
    + f"<p><b>Step 2. The choice.</b> <b>The manager chooses plan M</b>: {f(EM, 1)} beats {f(ER, 1)} (R) and "
    f"{f(ES, 1)} (S). Under plan M the debt is worth {ev_line('M', F1, kind='D')} = <b>NOK {f(DM, 0)}M</b> and the "
    f"equity <b>NOK {f(EM, 0)}M</b>.</p>"
    "<p><b>Name the mechanism: risk shifting, or asset substitution.</b> With risky debt the shareholders "
    f"hold a call option on the payoff with strike {f(F1, 0)}. In M's low outcome the creditors absorb the "
    f"shortfall (they get 20 instead of {f(F1, 0)}), while the shareholders keep all of the upside. Plan R is "
    f"even riskier, but its upside comes too rarely to pay at this debt level: {f(0.25, 2)} × "
    f"{f(150 - F1, 0)} = {f(ER, 1)}, below {f(EM, 1)}.</p>"
    f"<p><b>Step 3. The agency cost of debt</b> is first-best value minus chosen value: {f(VS, 0)} {M} {f(VM, 0)} "
    f"= <b>NOK {f(agency_b, 0)}M</b>. That is value destroyed, not transferred.</p>"
    f"<p><b>Check (consistency check 3).</b> Relative to plan S, the creditors' gain is {f(DM, 0)} {M} "
    f"{f(DS, 0)} = {f(DM - DS, 0)} and the shareholders' gain is {f(EM, 0)} {M} {f(ES, 0)} = +{f(EM - ES, 0)}. "
    f"Sum: {f(DM - DS, 0)} + {f(EM - ES, 0)} = {f(VM - VS, 0)}, the NPV of choosing M over S {CHECK}. The "
    f"{f(DS - DM, 0)} taken from the creditors is a transfer; only the {f(agency_b, 0)} is the agency cost.</p>"
)
e4b_crit = [
    f"Values equity state by state as E[max(payoff − {f(F1, 0)}, 0)]: S {f(ES, 1)}, M {f(EM, 1)}, R {f(ER, 1)}. Subtracting {f(F1, 0)} from the expected payoff (giving {f(VS - F1, 0)}, {f(VM - F1, 0)}, {f(VR - F1, 0)}) is the fatal error and gives the wrong ranking.",
    "Chooses M and names the mechanism: risk shifting (asset substitution); equity is a call option on the payoff with strike equal to the face value.",
    f"Debt under M = 0.5({f(F1, 0)}) + 0.5(20) = {f(DM, 0)}, equity {f(EM, 0)}, firm {f(VM, 0)}.",
    f"Agency cost = first-best value minus chosen value = {f(VS, 0)} − {f(VM, 0)} = NOK {f(agency_b, 0)}M. Reporting the transfer of {f(DS - DM, 0)} or the gain of {f(EM - ES, 0)} as the agency cost loses the point.",
    f"Check 3: {f(DM - DS, 0)} + {f(EM - ES, 0)} = {f(VM - VS, 0)}, the NPV of switching from S to M.",
]

e4c_body = (
    "<p>Find the face value of debt at which the manager is indifferent between plans S and M. For which "
    "range of face values will the manager choose plan M?</p>"
)
grid_rows = []
for F in grid:
    vals = {pl: Eq(pl, F) for pl in "SMR"}
    top = max(vals.values())
    best = [pl for pl in "SMR" if abs(vals[pl] - top) < 1e-9]
    lab = " = ".join(best)
    Fs = f(F, 0)
    grid_rows.append([Fs, f(vals["S"], 1), f(vals["M"], 1), f(vals["R"], 1), lab])
e4c_sol = (
    "<p><b>Step 1. Write equity as a function of F.</b> The relevant region is 20 &lt; F ≤ 62, where plan S "
    "still repays in full and M's low outcome defaults:</p>"
    f"<p>E<sub>S</sub>(F) = 62 {M} F &nbsp;and&nbsp; E<sub>M</sub>(F) = 0.5(100 {M} F) + 0.5(0) = 50 {M} 0.5F</p>"
    "<p><b>Step 2. Set them equal.</b></p>"
    f"<p>62 {M} F = 50 {M} 0.5F &rArr; 12 = 0.5F &rArr; <b>F = {f(Fstar, 0)}</b></p>"
    f"<p><b>Step 3. Verify.</b> {f(Fstar, 0)} lies in (20, 62], so the region assumption holds. Both equity "
    f"values equal {f(Eq('S', Fstar), 0)}. For F ≤ 20 there is no crossing: then M repays in full too, "
    f"E<sub>M</sub> = 60 {M} F, always 2 below E<sub>S</sub>. At F = {f(Fstar, 0)} plan R gives "
    f"0.25(150 {M} {f(Fstar, 0)}) + 0.75(0) = {f(Eq('R', Fstar), 1)}, below {f(Eq('S', Fstar), 0)}, so R is not a "
    f"contender there.</p>"
    "<p><b>Step 4. The upper end of the range: M against R.</b> For 20 &lt; F ≤ 100 both low outcomes "
    "default, so</p>"
    f"<p>50 {M} 0.5F = 0.25(150 {M} F) = 37.5 {M} 0.25F &rArr; 12.5 = 0.25F &rArr; <b>F = {f(Fstar2, 0)}</b>, "
    f"where both equal {f(Eq('M', Fstar2), 0)}.</p>"
    f"<p><b>Answer.</b> The manager is indifferent between S and M at <b>F = {f(Fstar, 0)}</b> and chooses "
    f"<b>plan M for face values between {f(Fstar, 0)} and {f(Fstar2, 0)}</b>. Below {f(Fstar, 0)} he chooses "
    f"S; above {f(Fstar2, 0)} he switches to R.</p>"
    + tbl(["Face value F", "E<sub>S</sub>", "E<sub>M</sub>", "E<sub>R</sub>", "Chosen"], grid_rows)
    + "<p><b>The mechanism.</b> Once a plan's low outcome defaults, its equity value falls with F at a "
    "slope equal to the probability of the high outcome: 1 for S, 0.5 for M, 0.25 for R. The riskier the "
    "plan, the more of each extra krone of debt is borne by the creditors, so risk shifting escalates with "
    f"leverage. Above F = {f(Fstar2, 0)} the agency cost jumps from {f(agency_b, 0)} to {f(VS, 0)} {M} "
    f"{f(VR, 0)} = <b>{f(agency_high, 0)}</b>, which is why lenders to highly levered firms insist on "
    "covenants.</p>"
    f"<p><b>Check.</b> At F = {f(Fstar, 0)}: E<sub>S</sub> = 62 {M} {f(Fstar, 0)} = {f(Eq('S', Fstar), 0)} and "
    f"E<sub>M</sub> = 0.5(100 {M} {f(Fstar, 0)}) = {f(Eq('M', Fstar), 0)} {CHECK}. At F = {f(Fstar2, 0)}: "
    f"E<sub>M</sub> = 0.5(100 {M} {f(Fstar2, 0)}) = {f(Eq('M', Fstar2), 0)} and E<sub>R</sub> = "
    f"0.25(150 {M} {f(Fstar2, 0)}) = {f(Eq('R', Fstar2), 0)} {CHECK}.</p>"
)
e4c_crit = [
    "Writes equity as a function of F for each plan, with max(·, 0) state by state. Picks the region 20 to 62 where M's low outcome defaults and S does not.",
    f"Solves 62 − F = 50 − 0.5F: F = {f(Fstar, 0)}, where both equity values are {f(Eq('S', Fstar), 0)}.",
    f"Checks that the solution lies in the assumed region and that R is not preferred at F = {f(Fstar, 0)} ({f(Eq('R', Fstar), 1)} against {f(Eq('S', Fstar), 0)}).",
    f"Finds the upper end from 50 − 0.5F = 37.5 − 0.25F: F = {f(Fstar2, 0)}. Plan M is chosen for F between {f(Fstar, 0)} and {f(Fstar2, 0)}.",
    f"(Bonus) The mechanism: riskier plans lose equity value more slowly as F rises (slopes 1, 0.5, 0.25), so risk shifting escalates with leverage; above {f(Fstar2, 0)} the agency cost rises to {f(agency_high, 0)}.",
]

e4d_body = (
    f"<p>Keep the face value at NOK {f(F1, 0)} million and assume that Polarstein has implemented plan M and "
    f"can no longer switch. Before the outcome is known, the manager can upgrade the mine's ventilation "
    f"system. The upgrade costs NOK {f(I4, 0)} million today (paid by the shareholders) and saves a certain "
    f"NOK {f(X4, 0)} million of costs at t = 1 in both outcomes.</p>"
    "<p>Will the manager carry out the upgrade? Show the gains to the shareholders and the creditors.</p>"
)
e4d_sol = (
    f"<p><b>Step 1. The upgrade creates value.</b> NPV = {f(X4, 0)} {M} {f(I4, 0)} = <b>NOK {f(NPV4, 0)}M</b> "
    "(no discounting). An all-equity firm would do it at once.</p>"
    "<p><b>Step 2. Both claims with and without the upgrade, under plan M.</b></p>"
    + tbl(["Outcome (probability)", "Payoff without", "Debt", "Equity", "Payoff with", "Debt", "Equity"],
          [["High (0.5)", "100", f(min(100, F1), 0), f(max(100 - F1, 0), 0), f(100 + X4, 0),
            f(min(100 + X4, F1), 0), f(max(100 + X4 - F1, 0), 0)],
           ["Low (0.5)", "20", f(min(20, F1), 0), f(max(20 - F1, 0), 0), f(20 + X4, 0),
            f(min(20 + X4, F1), 0), f(max(20 + X4 - F1, 0), 0)],
           ["Expected", f(VM, 0), f(D0_4, 0), f(E0_4, 0), f(VM + X4, 0), f(D1_4, 0), f(E1_4, 0)]])
    + f"<p><b>Step 3. The gains.</b> Creditors: {f(D1_4, 0)} {M} {f(D0_4, 0)} = <b>+{f(gain_cred, 0)}</b>. "
    f"Shareholders: {f(E1_4, 0)} {M} {f(E0_4, 0)} {M} {f(I4, 0)} = <b>{f(gain_sh, 0)}</b>, because they pay the "
    f"whole {f(I4, 0)}. <b>The manager rejects the upgrade.</b></p>"
    f"<p><b>Name the mechanism: debt overhang.</b> In the low outcome the extra {f(X4, 0)} goes entirely to the "
    f"creditors (their payment rises from 20 to {f(20 + X4, 0)}, still below {f(F1, 0)}), so the shareholders "
    f"pay {f(I4, 0)} for a claim worth only 0.5 × {f(X4, 0)} = {f(0.5 * X4, 0)}. A positive-NPV project is "
    f"lost. The agency cost is its NPV of {f(NPV4, 0)}, value that is never created, not the shareholders' "
    f"{f(gain_sh, 0)}.</p>"
    f"<p><b>Check (consistency check 3).</b> Creditors' gain + shareholders' gain = {f(gain_cred, 0)} + "
    f"({f(gain_sh, 0)}) = {f(gain_cred + gain_sh, 0)} = NPV {CHECK}. The check fails if you forget to subtract "
    f"the {f(I4, 0)}.</p>"
)
e4d_crit = [
    f"NPV = {f(X4, 0)} − {f(I4, 0)} = {f(NPV4, 0)}: the upgrade creates value.",
    f"Recomputes both claims state by state with the upgrade: debt {f(D0_4, 0)} → {f(D1_4, 0)}, equity {f(E0_4, 0)} → {f(E1_4, 0)}.",
    f"Shareholders' gain = {f(E1_4, 0)} − {f(E0_4, 0)} − {f(I4, 0)} = {f(gain_sh, 0)} because they pay the investment, so the manager rejects. Forgetting the {f(I4, 0)} makes it look acceptable.",
    "Names the mechanism: debt overhang. The low-outcome part of the saving goes to creditors who paid nothing.",
    f"Check 3: {f(gain_cred, 0)} + ({f(gain_sh, 0)}) = {f(NPV4, 0)} = NPV.",
]

e4e_body = (
    f"<p>The creditors offer to reduce the face value of the debt from {f(F1, 0)} to F′ if the shareholders "
    "carry out the upgrade.</p>"
    "<p>Find the range of F′ that both the shareholders and the creditors accept. Briefly explain why such a "
    "renegotiation is hard to achieve when the debt consists of bonds held by many small investors.</p>"
)
e4e_sol = (
    f"<p><b>Step 1. The benchmarks.</b> Without the deal (part d) the debt is worth {f(D0_4, 0)} and the equity "
    f"{f(E0_4, 0)}. With the upgrade the outcomes are {f(100 + X4, 0)} and {f(20 + X4, 0)}.</p>"
    f"<p><b>Step 2. The creditors' floor.</b> For F′ ≥ {f(20 + X4, 0)} the low outcome still defaults, so "
    f"D(F′) = 0.5F′ + 0.5({f(20 + X4, 0)}) = 0.5F′ + {f(0.5 * (20 + X4), 0)}. They need D(F′) ≥ {f(D0_4, 0)}, "
    f"so <b>F′ ≥ {f(Flo, 0)}</b>. Below {f(20 + X4, 0)} the debt would be safe but worth only F′, less than "
    f"{f(D0_4, 0)}.</p>"
    f"<p><b>Step 3. The shareholders' ceiling.</b> For F′ ≥ {f(20 + X4, 0)}, E(F′) = 0.5({f(100 + X4, 0)} {M} F′) "
    f"= {f(0.5 * (100 + X4), 0)} {M} 0.5F′. They pay {f(I4, 0)} and need "
    f"{f(0.5 * (100 + X4), 0)} {M} 0.5F′ {M} {f(I4, 0)} ≥ {f(E0_4, 0)}, so <b>F′ ≤ {f(Fhi, 0)}</b>.</p>"
    f"<p><b>Answer: {f(Flo, 0)} ≤ F′ ≤ {f(Fhi, 0)}.</b> The creditors accept a lower face value because the "
    f"upgrade raises their low-outcome payment from 20 to {f(20 + X4, 0)}.</p>"
    + tbl(["F′", "Debt value", "Creditors' gain", "Equity value", "Shareholders' gain (after paying 6)", "Sum"],
          [[f(Fp, 0), f(Dt("M", Fp, X4), 0), f(Dt("M", Fp, X4) - D0_4, 0), f(Eq("M", Fp, X4), 0),
            f(Eq("M", Fp, X4) - I4 - E0_4, 0),
            f(Dt("M", Fp, X4) - D0_4 + Eq("M", Fp, X4) - I4 - E0_4, 0)] for Fp in [Flo, Fmid, Fhi]])
    + f"<p><b>Check (consistency check 3).</b> At every F′ in the range the two gains add up to {f(NPV4, 0)}, the "
    f"NPV of the upgrade {CHECK}. Renegotiation only divides the NPV; where in the range the deal lands is a "
    f"matter of bargaining power. At F′ = {f(Fmid, 0)} each side gains {f(gc_mid, 0)}.</p>"
    "<p><b>Why it is hard with many bondholders.</b> Each small bondholder prefers that the others accept "
    "the lower face value while he keeps his full claim, which the upgrade makes safer anyway: a holdout "
    "or free-rider problem. Changes to payment terms of bonds often need the consent of (nearly) all "
    "holders, so the deal fails even though everyone would gain from it. That is why loan contracts often "
    "let the firm fund such projects with new senior or secured debt, which shrinks the windfall to the old "
    "creditors.</p>"
)
e4e_crit = [
    f"Sets up the creditors' condition D(F′) ≥ {f(D0_4, 0)} and the shareholders' condition E(F′) − {f(I4, 0)} ≥ {f(E0_4, 0)}, both with the upgraded payoffs {f(100 + X4, 0)} and {f(20 + X4, 0)}.",
    f"Creditors accept F′ ≥ {f(Flo, 0)}; shareholders accept F′ ≤ {f(Fhi, 0)}. Range: {f(Flo, 0)} to {f(Fhi, 0)}.",
    f"Check 3: at any F′ in the range the two gains add up to the NPV of {f(NPV4, 0)} (for example +{f(gc_mid, 0)} and +{f(gs_mid, 0)} at F′ = {f(Fmid, 0)}).",
    "Explains the practical obstacle: with dispersed bondholders each one prefers to hold out while the others accept the cut, so the coordination renegotiation needs breaks down.",
]

ex4 = {
    "n": 4, "title": "Debt and risk", "points": 18, "topic": "Risk shifting and debt overhang",
    "chapters": [9, 10, 24], "body": e4_body,
    "parts": [
        {"label": "a", "points": 2, "body": "<p>Assume that Polarstein has no debt. Which plan will the manager choose?</p>",
         "solution": e4a_sol, "criteria": e4a_crit},
        {"label": "b", "points": 4, "body": e4b_body, "solution": e4b_sol, "criteria": e4b_crit},
        {"label": "c", "points": 4, "body": e4c_body, "solution": e4c_sol, "criteria": e4c_crit},
        {"label": "d", "points": 4, "body": e4d_body, "solution": e4d_sol, "criteria": e4d_crit},
        {"label": "e", "points": 4, "body": e4e_body, "solution": e4e_sol, "criteria": e4e_crit},
    ],
}

# ---------------------------------------------------------------- Exercise 5
e5_body = (
    "<p>You work for a private-equity fund that considers buying Fjellbekk Bryggeri AS, an unlisted "
    f"family-owned brewery. Fjellbekk is expected to generate a free cash flow of NOK {f(FCF1, 0)} million "
    f"next year. Its free cash flow is expected to grow by {pc(g5, 0)} per year forever. After the "
    f"purchase the fund will keep Fjellbekk's debt-to-equity ratio constant at {f(DE5, 1)}. Fjellbekk can "
    f"borrow at a cost of debt of {pc(rD5, 0)}.</p>"
    f"<p>Kildevann ASA is a listed brewery with business risk comparable to Fjellbekk's. Its market "
    f"capitalisation is NOK {f(Ek, 0)} million and the market value of its debt is NOK {f(Dk, 0)} million. "
    f"Kildevann's equity beta is {f(bEk, 2)} and the expected return on its debt is {pc(rDk, 1)}. "
    f"Kildevann also keeps its debt-to-value ratio constant. The risk-free rate is {pc(rf5, 1)}, the expected return on the market portfolio is {pc(rm5, 0)} and the "
    f"corporate tax rate is {pc(tau5, 0)}.</p>"
    "<p>Recommended precision is 4 decimal places.</p>"
)
e5a_sol = (
    f"<p>This is the twin-firm routine. Kildevann's <b>unlevered</b> beta transfers to Fjellbekk because the "
    f"two breweries have comparable business risk; their equity betas differ because their leverage "
    f"differs.</p>"
    f"<p><b>Step 1. Kildevann's weights.</b> V = {f(Ek, 0)} + {f(Dk, 0)} = {f(Vk, 0)}, so E/V = "
    f"{f(Ek, 0)}/{f(Vk, 0)} = <b>{f(wEk, 2)}</b> and D/V = {f(Dk, 0)}/{f(Vk, 0)} = <b>{f(wDk, 2)}</b>.</p>"
    f"<p><b>Step 2. Kildevann's debt beta.</b> The debt is not risk-free: its expected return is above "
    f"{rf_}. The market risk premium is {pc(rm5, 1)} {M} {pc(rf5, 1)} = {pc(mrp5, 1)}, so</p>"
    f"<p>{bD_} = ({rD_} {M} {rf_})/(E[R<sub>Mkt</sub>] {M} {rf_}) = ({f(rDk, 3)} {M} {f(rf5, 3)})/{f(mrp5, 3)} "
    f"= {f(rDk - rf5, 3)}/{f(mrp5, 3)} = <b>{f(bDk, 4)}</b></p>"
    f"<p><b>Step 3. Unlever, weighting without taxes (course convention).</b></p>"
    f"<p>{bU_} = (E/V){bE_} + (D/V){bD_} = {f(wEk, 2)}({f(bEk, 2)}) + {f(wDk, 2)}({f(bDk, 2)}) = "
    f"{f(wEk * bEk, 4)} + {f(wDk * bDk, 4)} = <b>{f(bU5, 4)}</b></p>"
    f"<p><b>Step 4. The CAPM on the asset beta.</b></p>"
    f"<p>{rU_} = {rf_} + {bU_}(E[R<sub>Mkt</sub>] {M} {rf_}) = {f(rf5, 3)} + {f(bU5, 3)}({f(mrp5, 3)}) = "
    f"{f(rf5, 6)} + {f(bU5 * mrp5, 6)} = <b>{f(rU5, 6)} ({pc(rU5)})</b></p>"
    f"<p><b>Step 5. Transfer.</b> Fjellbekk has the same business risk, so its unlevered cost of capital is "
    f"also <b>{pc(rU5)}</b>. Fjellbekk's own leverage and cost of debt enter only from part (b).</p>"
    f"<p><b>Check.</b> The rate route gives the same number. Kildevann's {rE_} = {f(rf5, 3)} + "
    f"{f(bEk, 2)}({f(mrp5, 3)}) = {f(rEk, 4)}. Its pre-tax WACC is {f(wEk, 2)}({f(rEk, 4)}) + "
    f"{f(wDk, 2)}({f(rDk, 3)}) = {f(wEk * rEk, 6)} + {f(wDk * rDk, 6)} = {f(rU5, 6)} = {rU_} {CHECK}. The "
    f"error to avoid runs in a known direction: setting {bD_} = 0 gives {bU_} = {f(bU5_wrong, 4)} and "
    f"{rU_} = {pc(rU5_wrong)}, which understates the cost of capital and overvalues the firm.</p>"
)
e5a_crit = [
    f"Weights from market values: V = {f(Ek, 0)} + {f(Dk, 0)} = {f(Vk, 0)}, so E/V = {f(wEk, 2)} and D/V = {f(wDk, 2)}.",
    f"Debt beta from the CAPM: β_D = ({pc(rDk, 1)} − {pc(rf5, 1)})/{pc(mrp5, 1)} = {f(bDk, 2)}. Setting β_D = 0 understates β_U ({f(bU5_wrong, 3)} instead of {f(bU5, 3)}) and r_U ({pc(rU5_wrong)} instead of {pc(rU5)}).",
    f"Unlevers without taxes: β_U = {f(wEk, 2)}({f(bEk, 2)}) + {f(wDk, 2)}({f(bDk, 2)}) = {f(bU5, 4)}. The (1 − τ_c) version is not the course convention.",
    f"r_U = {pc(rf5, 1)} + {f(bU5, 3)}({pc(mrp5, 1)}) = {pc(rU5)}, transferred to Fjellbekk because the business risk is comparable.",
    "Fjellbekk's own leverage and cost of debt play no part here. This part carries 6 points because the twin-firm routine is the most examined skill in the course.",
]

e5b_sol = (
    f"<p><b>Relever with MM Proposition II</b>, using Fjellbekk's own D/E = {f(DE5, 1)} and its own cost of debt "
    f"of {pc(rD5, 0)}:</p>"
    f"<p>{rE_} = {rU_} + (D/E)({rU_} {M} {rD_}) = {f(rU5, 6)} + {f(DE5, 1)}({f(rU5, 6)} {M} {f(rD5, 2)}) = "
    f"{f(rU5, 6)} + {f(DE5 * (rU5 - rD5), 6)} = <b>{f(rE5, 6)} ({pc(rE5)})</b></p>"
    f"<p><b>Check.</b> With D/E = {f(DE5, 1)} the weights are E/V = 1/1.6 = {f(eV5, 3)} and D/V = 0.6/1.6 = {f(dV5, 3)}. The pre-tax WACC must "
    f"return {rU_}: {f(eV5, 3)}({f(rE5, 6)}) + {f(dV5, 3)}({f(rD5, 2)}) = {f(eV5 * rE5, 6)} + {f(dV5 * rD5, 6)} = "
    f"{f(rU5, 6)} {CHECK}. This is an identity once {rE_} comes from MM II, so it confirms the arithmetic and "
    f"nothing more.</p>"
)
e5b_crit = [
    f"Uses D/E = {f(DE5, 1)} directly in MM II. Plugging in D/V = {f(dV5, 3)} instead is the trap.",
    f"Uses Fjellbekk's own cost of debt, {pc(rD5, 0)}, not Kildevann's {pc(rDk, 1)}.",
    f"r_E = {pc(rU5)} + {f(DE5, 1)}({pc(rU5 - rD5)}) = {pc(rE5)}.",
    f"The pre-tax WACC check ({f(eV5, 3)} r_E + {f(dV5, 3)} r_D = r_U) takes one line.",
]

e5c_sol = (
    f"<p>{wacc_} = (E/V){rE_} + (D/V){rD_}(1 {M} {tc_}) = {f(eV5, 3)}({f(rE5, 6)}) + {f(dV5, 3)}({f(rD5, 2)})(1 {M} "
    f"{f(tau5, 2)}) = {f(eV5 * rE5, 6)} + {f(dV5 * rD5 * (1 - tau5), 6)} = <b>{f(wacc5, 6)} ({pc(wacc5)})</b></p>"
    f"<p><b>Check with the shortcut.</b> {wacc_} = {rU_} {M} (D/V)·{tc_}·{rD_} = {f(rU5, 6)} {M} "
    f"{f(dV5, 3)}({f(tau5, 2)})({f(rD5, 2)}) = {f(rU5, 6)} {M} {f(dV5 * tau5 * rD5, 6)} = {f(wacc5, 6)} {CHECK}. The "
    f"tax shield lowers the cost of capital by {f(10000 * dV5 * tau5 * rD5, 2)} basis points: that is "
    f"how the WACC method counts it.</p>"
)
e5c_crit = [
    f"Weights E/V = {f(eV5, 3)} and D/V = {f(dV5, 3)}, converted from D/E = {f(DE5, 1)}.",
    "The (1 − τ_c) factor goes on the cost of debt only.",
    f"r_wacc = {pc(wacc5)}.",
    f"Cross-check with r_U − (D/V)τ_c r_D = {pc(rU5)} − {pc(dV5 * tau5 * rD5)} = {pc(wacc5)}.",
]

e5d_sol = (
    f"<p>The free cash flow is a growing perpetuity whose first payment, NOK {f(FCF1, 0)}M, arrives next year. "
    f"Discount it at the after-tax WACC:</p>"
    f"<p>{VL_} = FCF<sub>1</sub>/({wacc_} {M} g) = {f(FCF1, 0)}/({f(wacc5, 6)} {M} {f(g5, 2)}) = "
    f"{f(FCF1, 0)}/{f(wacc5 - g5, 6)} = <b>NOK {f(VL5, 4)}M</b></p>"
    f"<p>The tax shield is already inside the {pc(wacc5)} discount rate, so it must not be added on top. The "
    f"{f(FCF1, 0)} is next year's flow, so it is not grown again.</p>"
)
e5d_crit = [
    f"Growing-perpetuity formula with the AFTER-tax WACC: V^L = {f(FCF1, 0)}/({pc(wacc5)} − {pc(g5, 0)}).",
    f"V^L = NOK {f(VL5, 4)}M.",
    f"Uses FCF_1 = {f(FCF1, 0)} as given; multiplying by 1.02 again double counts a year of growth.",
    "No separate tax shield: that would double count it.",
]

e5e_body = (
    "<p>Using the debt values from the WACC method, find the levered value of Fjellbekk using the APV "
    "approach. Briefly explain which rate you use to discount the tax shields and why.</p>"
)
e5e_sol = (
    f"<p><b>Step 1. The unlevered value.</b> Discount the same free cash flows at {rU_}:</p>"
    f"<p>{VU_} = {f(FCF1, 0)}/({f(rU5, 6)} {M} {f(g5, 2)}) = {f(FCF1, 0)}/{f(rU5 - g5, 6)} = <b>NOK {f(VU5, 4)}M</b></p>"
    f"<p><b>Step 2. The debt, from the WACC answer.</b> D/E = {f(DE5, 1)} means D/V = {f(dV5, 3)}, so</p>"
    f"<p>D<sub>0</sub> = {f(dV5, 3)}({f(VL5, 4)}) = <b>NOK {f(D0_5, 4)}M</b></p>"
    f"<p>The firm keeps D/V constant while its value grows at {pc(g5, 0)}, so the debt grows at {pc(g5, 0)} "
    f"too: D<sub>1</sub> = {f(D0_5, 4)} × 1.02 = {f(D1_5, 4)} and so on.</p>"
    f"<p><b>Step 3. The tax shield.</b> The interest on D<sub>0</sub> is paid and deducted in year 1:</p>"
    f"<p>TS<sub>1</sub> = {tc_} × {rD_} × D<sub>0</sub> = {f(tau5, 2)} × {f(rD5, 2)} × {f(D0_5, 4)} = "
    f"<b>{f(TS1, 6)}</b>, growing at {pc(g5, 0)} (TS<sub>2</sub> = {f(TS2, 6)})</p>"
    f"<p><b>Step 4. Which rate and why.</b> Fjellbekk keeps a <i>constant debt-to-equity ratio</i>, so the "
    f"amount of debt rises and falls with firm value. The tax shields therefore carry the same risk as the "
    f"firm's assets and are discounted at <b>{rU_} = {pc(rU5)}</b>, not at {rD_}. ({rD_} would apply only to "
    f"a fixed debt schedule.)</p>"
    f"<p>PV(TS) = TS<sub>1</sub>/({rU_} {M} g) = {f(TS1, 6)}/{f(rU5 - g5, 6)} = <b>NOK {f(PVTS, 4)}M</b></p>"
    f"<p><b>Step 5. APV.</b></p>"
    f"<p>{VL_} = {VU_} + PV(TS) = {f(VU5, 4)} + {f(PVTS, 4)} = <b>NOK {f(VU5 + PVTS, 4)}M</b></p>"
    f"<p><b>Check (consistency check 1).</b> The APV value equals the WACC value from part (d), "
    f"{f(VL5, 4)} {CHECK}. Describe it honestly: the APV route took its debt from the WACC answer, so this "
    f"is a fixed-point check. It still earns its line, because it catches the two errors that actually "
    f"happen. Discounting the shield at {rD_} gives PV(TS) = {f(TS1, 6)}/({f(rD5, 2)} {M} {f(g5, 2)}) = "
    f"{f(PVTS_wrong, 4)} and {VL_} = {f(VL5_wrong, 4)}, which no longer matches. A second check: Fjellbekk's "
    f"{bE_} = ({f(rE5, 6)} {M} {f(rf5, 3)})/{f(mrp5, 3)} = {f(bE5, 6)} and {bD_} = ({f(rD5, 2)} {M} "
    f"{f(rf5, 3)})/{f(mrp5, 3)} = {f(bD5, 6)} weight back to {f(eV5, 3)}({f(bE5, 6)}) + {f(dV5, 3)}({f(bD5, 6)}) = "
    f"{f(eV5 * bE5, 6)} + {f(dV5 * bD5, 6)} = {f(bU5, 6)} = {bU_} {CHECK} (an identity, since {rE_} came "
    f"from MM II).</p>"
)
e5e_crit = [
    f"V^U = {f(FCF1, 0)}/({pc(rU5)} − {pc(g5, 0)}) = {f(VU5, 4)}: the same cash flows at r_U, with g in the denominator.",
    f"Takes the debt from the WACC answer as instructed: D_0 = {f(dV5, 3)}({f(VL5, 4)}) = {f(D0_5, 4)}, growing at {pc(g5, 0)} with firm value.",
    f"TS_1 = {f(tau5, 2)} × {f(rD5, 2)} × {f(D0_5, 4)} = {f(TS1, 6)}, a growing perpetuity.",
    f"Discounts the shield at r_U AND says why: constant D/E means the debt moves with firm value, so the shield carries asset risk. Using r_D gives {f(VL5_wrong, 2)}, a classic error.",
    f"PV(TS) = {f(PVTS, 4)} and V^L = {f(VU5, 4)} + {f(PVTS, 4)} = {f(VL5, 4)}.",
    "Ends with check 1: the APV value equals the WACC value from part (d). A gap above about 0.001 points to rounding drift or a wrong rate.",
]

ex5 = {
    "n": 5, "title": "Valuation", "points": 20, "topic": "WACC and APV", "chapters": [3, 4, 17, 18],
    "body": e5_body,
    "parts": [
        {"label": "a", "points": 6, "body": "<p>What is the unlevered cost of capital for Fjellbekk?</p>",
         "solution": e5a_sol, "criteria": e5a_crit},
        {"label": "b", "points": 3, "body": "<p>What is Fjellbekk's equity cost of capital?</p>",
         "solution": e5b_sol, "criteria": e5b_crit},
        {"label": "c", "points": 3, "body": "<p>What is Fjellbekk's after-tax WACC?</p>",
         "solution": e5c_sol, "criteria": e5c_crit},
        {"label": "d", "points": 2, "body": "<p>What is the levered value of Fjellbekk using the WACC approach?</p>",
         "solution": e5d_sol, "criteria": e5d_crit},
        {"label": "e", "points": 6, "body": e5e_body, "solution": e5e_sol, "criteria": e5e_crit},
    ],
}

# ---------------------------------------------------------------- Exercise 6
e6_body = (
    f"<p>Fossekall Kraft AS can build a small hydropower plant for NOK {f(I6, 0)} million, paid when the plant "
    "is built. Once built, the plant generates a cash flow at the end of every year forever, starting one year "
    "after it is built. The cash flows depend on the long-run electricity price regime, which is revealed at "
    f"t = 1 and then never changes: an expected cash flow of NOK {f(CH, 0)} million per year in the high-price "
    f"regime and NOK {f(CL, 0)} million per year in the low-price regime. If the plant is built today, its "
    "first cash flow, at t = 1, equals the expected cash flow of the regime and reveals it. After that the "
    "annual cash flows stay risky around this expected level (water flow and prices vary from year to "
    f"year), so the plant's cost of capital is {pc(r6, 0)} both before and after the regime is revealed. "
    "Management believes that the two regimes are equally likely. "
    f"The risk-free rate is {pc(rf6, 0)}. Recommended precision is 4 decimal places.</p>"
)
e6a_sol = (
    f"<p><b>Step 1. Expected cash flow.</b> 0.5({f(CH, 0)}) + 0.5({f(CL, 0)}) = <b>{f(EC, 1)}</b> per year, from "
    "t = 1 forever.</p>"
    f"<p><b>Step 2. Value and NPV.</b> PV = {f(EC, 1)}/{f(r6, 2)} = <b>{f(PV0, 0)}</b>, so</p>"
    f"<p>NPV<sub>now</sub> = {f(PV0, 0)} {M} {f(I6, 0)} = <b>NOK {f(NPV_now, 0)}M</b></p>"
    f"<p>The cash flows are risky, so they are discounted at the plant's {pc(r6, 0)}, not at the "
    f"{pc(rf6, 0)} risk-free rate. The NPV is positive, so the plain NPV rule says build now. Hold on to the "
    "375: it is the value of the plant's cash flows and reappears in part (c).</p>"
    f"<p><b>Check.</b> State by state, building today is worth {f(CH, 0)}/{f(r6, 2)} {M} {f(I6, 0)} = "
    f"{f(NPVH1, 0)} in the high regime and {f(CL, 0)}/{f(r6, 2)} {M} {f(I6, 0)} = {f(NPVL1, 0)} in the low "
    f"regime; 0.5({f(NPVH1, 0)}) + 0.5({f(NPVL1, 0)}) = {f(NPV_now, 0)} {CHECK}.</p>"
)
e6a_crit = [
    f"Expected annual cash flow 0.5({f(CH, 0)}) + 0.5({f(CL, 0)}) = {f(EC, 1)}, valued as a perpetuity at {pc(r6, 0)}: {f(PV0, 0)}.",
    f"NPV = {f(PV0, 0)} − {f(I6, 0)} = NOK {f(NPV_now, 0)}M, positive, so the naive rule says build now.",
    f"A perpetuity at the plant's {pc(r6, 0)}, not at the {pc(rf6, 0)} risk-free rate: the cash flows are risky around their expected level.",
]

e6b_body = (
    f"<p>Instead of building now, Fossekall can wait one year, learn the regime and then decide whether to "
    f"build. The construction cost is still NOK {f(I6, 0)} million, paid at t = 1. The first cash flow "
    "then arrives at t = 2.</p>"
    f"<p>Using management's probabilities and the {pc(r6, 0)} cost of capital for all discounting, find the "
    "value today of waiting and the value of the option to wait. Do you build now or wait?</p>"
)
e6b_sol = (
    f"<p><b>Step 1. The decision at t = 1, state by state.</b> If you build at t = 1, the plant is worth "
    f"C/{f(r6, 2)} at that date:</p>"
    + tbl(["Regime at t = 1", "Probability", "PV at t = 1", "NPV at t = 1", "Decision", "Value at t = 1"],
          [["High", "0.5", f"{f(CH, 0)}/{f(r6, 2)} = {f(PVH1, 0)}", f(NPVH1, 0), "build", f(max(NPVH1, 0), 0)],
           ["Low", "0.5", f"{f(CL, 0)}/{f(r6, 2)} = {f(PVL1, 0)}", f(NPVL1, 0), "do not build", f(max(NPVL1, 0), 0)]])
    + f"<p><b>Step 2. The value of waiting.</b> Take the maximum inside the expectation, then discount once:</p>"
    f"<p>[0.5({f(NPVH1, 0)}) + 0.5(0)]/{f(1 + r6, 2)} = {f(p6 * NPVH1, 0)}/{f(1 + r6, 2)} = <b>{f(W_b, 4)}</b></p>"
    f"<p><b>Step 3. The option to wait.</b> {f(W_b, 4)} {M} max(0, {f(NPV_now, 0)}) = <b>{f(opt_b, 4)}</b>. "
    f"Positive, so on these assumptions <b>you wait</b>, even though building now has an NPV of "
    f"{f(NPV_now, 0)}.</p>"
    f"<p><b>Check (decompose the {f(opt_b, 4)}).</b> Waiting avoids the low branch, worth 0.5 × "
    f"{f(-NPVL1, 0)} = {f(avoid, 4)}. It also delays the high branch by a year, costing 0.5({f(NPVH1, 0)}) {M} "
    f"0.5({f(NPVH1, 0)})/{f(1 + r6, 2)} = {f(p6 * NPVH1, 4)} {M} {f(W_b, 4)} = {f(delay, 4)}. Net: "
    f"{f(avoid, 4)} {M} {f(delay, 4)} = {f(opt_b, 4)} {CHECK}.</p>"
)
e6b_crit = [
    f"NPVs at t = 1: {f(CH, 0)}/{f(r6, 2)} − {f(I6, 0)} = {f(NPVH1, 0)} in the high regime and {f(CL, 0)}/{f(r6, 2)} − {f(I6, 0)} = {f(NPVL1, 0)} in the low regime, where you do not build (value 0).",
    f"Discounts the expected value of the decision ONCE at {pc(r6, 0)}: 0.5({f(NPVH1, 0)})/{f(1 + r6, 2)} = {f(W_b, 4)}. Discounting twice, or not at all, is the classic slip.",
    f"Value of the option to wait = {f(W_b, 4)} − max(0, {f(NPV_now, 0)}) = {f(opt_b, 4)}. Decision: wait.",
    "The max(0, ·) sits inside the expectation; averaging first erases the option.",
    f"Bonus for the decomposition: avoiding the low branch (+{f(avoid, 4)}) against delaying the high branch ({M}{f(delay, 4)}).",
]

e6c_body = (
    f"<p>Your CFO objects. The 50% is only management's guess. Besides, {pc(r6, 0)} is the cost of capital of the "
    "plant, not of the option to wait, which is riskier. She wants a valuation that uses market prices and "
    "needs no probability estimate. Nordelv ASA is a listed firm without debt whose only asset is a "
    "hydropower plant identical to Fossekall's. It was built last year, so its first cash flow arrives at "
    f"t = 1. Nordelv pays out its entire cash flow as dividends. Its market value today is NOK {f(S0, 0)} "
    "million.</p>"
    "<p>What is the risk-neutral probability of the high-price regime? (Hint: a Nordelv shareholder receives "
    "the Year-1 dividend in addition to the value of the shares at t = 1.) Explain briefly why ρ differs "
    "from management's 50% and why you do not need the true probability.</p>"
)
e6c_sol = (
    "<p><b>Step 1. Identify the traded asset and its payoffs.</b> Nordelv is a claim to exactly the cash "
    "flows Fossekall would get by building today. Its price today is S<sub>0</sub> = <b>375</b>. At t = 1 a "
    "Nordelv shareholder receives the Year-1 dividend plus the shares, which are then worth the remaining "
    f"expected perpetuity at {pc(r6, 0)}:</p>"
    + tbl(["", "Dividend at t = 1", "Share value at t = 1", "Total payoff"],
          [["High regime, S<sub>u</sub>", f(CH, 0), f"{f(CH, 0)}/{f(r6, 2)} = {f(PVH1, 0)}", f"<b>{f(SH, 0)}</b>"],
           ["Low regime, S<sub>d</sub>", f(CL, 0), f"{f(CL, 0)}/{f(r6, 2)} = {f(PVL1, 0)}", f"<b>{f(SL, 0)}</b>"]])
    + f"<p>The tree is free of arbitrage: {f(SL, 0)} &lt; {f(1 + rf6, 2)} × {f(S0, 0)} = {f((1 + rf6) * S0, 2)} "
    f"&lt; {f(SH, 0)}.</p>"
    "<p><b>Step 2. Apply the formula-sheet expression.</b></p>"
    f"<p>ρ = [(1 + {rf_})S<sub>0</sub> {M} S<sub>d</sub>]/(S<sub>u</sub> {M} S<sub>d</sub>) = "
    f"[{f(1 + rf6, 2)}({f(S0, 0)}) {M} {f(SL, 0)}]/({f(SH, 0)} {M} {f(SL, 0)}) = "
    f"({f((1 + rf6) * S0, 2)} {M} {f(SL, 0)})/{f(den6, 0)} = {f(num6, 2)}/{f(den6, 0)} = <b>{f(rho, 6)}</b></p>"
    f"<p>and 1 {M} ρ = <b>{f(1 - rho, 6)}</b>. Carry six decimals: with ρ rounded to 0.3864 the value of "
    f"waiting in (d) comes out at {f(round(rho, 4) * NPVH1 / (1 + rf6), 4)} instead of {f(W_d, 4)}.</p>"
    f"<p><b>Check.</b> ρ must price Nordelv at the risk-free rate: [ρ({f(SH, 0)}) + (1 {M} ρ)({f(SL, 0)})]/"
    f"{f(1 + rf6, 2)} = ({f(rho * SH, 4)} + {f((1 - rho) * SL, 4)})/{f(1 + rf6, 2)} = "
    f"{f(rho * SH + (1 - rho) * SL, 4)}/{f(1 + rf6, 2)} = {f(S0, 2)} {CHECK} (with ρ = {f(num6, 2)}/{f(den6, 0)} "
    f"exactly). A second, independent check: management's 50% with the {pc(r6, 0)} rate prices Nordelv too, "
    f"[0.5({f(SH, 0)}) + 0.5({f(SL, 0)})]/{f(1 + r6, 2)} = {f(p6 * SH + (1 - p6) * SL, 2)}/{f(1 + r6, 2)} = "
    f"{f(S0, 0)} {CHECK}. Nordelv trades at exactly the value found in (a), so the market agrees with "
    "management about the plant itself.</p>"
    f"<p><b>Why ρ is below 0.5 and why the true probability is not needed.</b> Nordelv's expected return is "
    f"{pc(r6, 0)}, above the {pc(rf6, 0)} risk-free rate, so investors demand a risk premium for the regime "
    "risk. Risk-neutral weights put that premium into the probabilities: they shift weight towards the "
    "low-payoff state and then discount at the risk-free rate. ρ is a pricing weight, not a forecast. Any "
    "payoff that depends only on the regime can be replicated with Nordelv shares and the risk-free bond. "
    "Two things with identical payoffs in every state have the same price, whatever anyone believes about "
    "the probabilities. The market's beliefs and risk aversion are already inside the price of 375.</p>"
)
e6c_crit = [
    f"Identifies Nordelv as the traded twin and its payoffs at t = 1 as dividend plus share value: {f(CH, 0)} + {f(PVH1, 0)} = {f(SH, 0)} and {f(CL, 0)} + {f(PVL1, 0)} = {f(SL, 0)}. Leaving out the Year-1 dividend (using {f(PVH1, 0)} and {f(PVL1, 0)}) gives ρ = {f(rho_wrong, 4)}, which is wrong: today's price and the t = 1 values must belong to the same asset.",
    f"S_0 = {f(S0, 0)}, the market value today (equal to the value found in a).",
    f"Applies ρ = [(1 + r_f)S_0 − S_d]/(S_u − S_d) with r_f = {pc(rf6, 0)}: ρ = {f(num6, 2)}/{f(den6, 0)} = {f(rho, 6)}.",
    f"Verifies that ρ prices Nordelv: [{f(rho, 6)}({f(SH, 0)}) + {f(1 - rho, 6)}({f(SL, 0)})]/{f(1 + rf6, 2)} = {f(S0, 0)} (up to rounding).",
    f"The most common error: building the tree on Fossekall's NPV (75, 180, −30) instead of on the twin's prices. That gives ρ = {f(rho_npv, 4)}, but an NPV is not a traded asset: 375, 528 and 297 are the prices that must be matched.",
    "Explains why ρ is below 0.5 and why the true probability is not needed: the risk premium sits in the price of 375; any regime-dependent payoff can be replicated with Nordelv shares and the risk-free bond.",
    "This part carries 8 points and the question asks for the explanation: the reasoning about the twin is worth as much as the arithmetic.",
]

e6d_body = (
    "<p>What is the value of waiting under risk-neutral valuation? Do you build now or wait? Briefly explain "
    "why your answer differs from (b).</p>"
)
e6d_sol = (
    f"<p><b>Step 1. The value of waiting.</b> The payoffs at t = 1 are the same as in (b): {f(NPVH1, 0)} in the "
    f"high regime and 0 in the low regime. Weight them with ρ and discount at {rf_}:</p>"
    f"<p>[{f(rho, 6)}({f(NPVH1, 0)}) + {f(1 - rho, 6)}(0)]/{f(1 + rf6, 2)} = {f(rho * NPVH1, 4)}/{f(1 + rf6, 2)} "
    f"= <b>{f(W_d, 4)}</b></p>"
    f"<p><b>Step 2. Compare with building now.</b> Building now is still worth {f(S0, 0)} {M} {f(I6, 0)} = "
    f"<b>{f(NPV_now, 0)}</b>, because the plant's cash flows trade at 375 (Nordelv). Measured as in (b), the "
    f"option to wait is worth {f(W_d, 4)} {M} {f(NPV_now, 0)} = <b>{f(opt_d, 4)}</b>: waiting is worth less "
    f"than building now, so <b>build now</b>. The right to wait is worth nothing to you, because you will not "
    f"use it. The decision flips relative to (b).</p>"
    + tbl(["Method", "Probability of high regime", "Discount rate", "Value of waiting", "NPV now", "Decision"],
          [["(b) management's estimate", "0.5000", pc(r6, 0), f(W_b, 4), f(NPV_now, 0), "wait"],
           ["(d) risk-neutral", f(rho, 6), pc(rf6, 0), f(W_d, 4), f(NPV_now, 0), "build now"]])
    + f"<p><b>Step 3. Why the answers differ.</b> The single-rate tree in (b) is the standard course method and "
    f"the right answer to (b) given the data there. Its known weakness is that the option to wait is a "
    f"levered claim on the plant: it is "
    f"replicated by holding {f(Delta, 4)} of a Nordelv and borrowing {f(-B, 4)}, so it is much riskier than "
    f"the plant. Its expected payoff should therefore be discounted at far more than the plant's "
    f"{pc(r6, 0)}: under the 50% probabilities its expected return is 0.5({f(NPVH1, 0)})/{f(W_d, 4)} {M} 1 = "
    f"{pc(exp_ret_opt, 2)}. Discounting at {pc(r6, 0)} overvalued waiting by {f(W_b, 4)} {M} {f(W_d, 4)} = "
    f"{f(overval, 4)} and reversed the decision. Risk-neutral valuation needs neither the true probability "
    "nor the option's own discount rate, because both are already priced into Nordelv.</p>"
    "<p><b>Exam rule: use the method the data points to.</b> If the exercise gives only probabilities and a "
    "cost of capital, use the decision tree with that rate, as in (b), in H2025 Exercise 5 and in k25; it "
    "earns full marks. If it gives a traded twin with prices in each state, use risk-neutral valuation, as "
    "here and in H2024 Exercise 6. Never mix the two: ρ goes with r<sub>f</sub>, real probabilities go with "
    "a risk-adjusted rate.</p>"
    f"<p><b>Check (replication).</b> {chr(916)} = ({f(NPVH1, 0)} {M} 0)/({f(SH, 0)} {M} {f(SL, 0)}) = "
    f"{f(Delta, 6)} and B = (0 {M} {f(SL, 0)} × {f(Delta, 6)})/{f(1 + rf6, 2)} = {f(-SL * Delta, 4)}/"
    f"{f(1 + rf6, 2)} = {f(B, 4)}. Value = {f(S0, 0)}({f(Delta, 6)}) + ({f(B, 4)}) = {f(S0 * Delta, 4)} {M} "
    f"{f(-B, 4)} = {f(W_d, 4)} {CHECK}, the same as the risk-neutral route.</p>"
)
e6d_crit = [
    f"Uses the payoffs from (b), {f(NPVH1, 0)} and 0, weighted by ρ = {f(rho, 6)} and discounted at r_f = {pc(rf6, 0)}: {f(W_d, 4)}. Accept {f(W_d, 2)} ± 0.01 (ρ rounded to 0.3864 gives {f(round(rho, 4) * NPVH1 / (1 + rf6), 4)}). Pairing ρ with {pc(r6, 0)}, or the 50% with r_f, is the error to avoid.",
    f"NPV now is still {f(NPV_now, 0)} (Nordelv trades at {f(S0, 0)}), so waiting is worth {f(-opt_d, 4)} less than building now: build now.",
    f"States that the decision flips relative to (b) and why: the option to wait is a levered, riskier claim on the plant, so discounting its expected payoff at the plant's {pc(r6, 0)} overvalues it (its expected return under the 50% is {pc(exp_ret_opt, 2)}). This does not make (b) wrong: with only probabilities and a cost of capital the tree is the expected method; with a traded twin, risk-neutral valuation is.",
    f"Bonus: the replication check with Δ = {f(Delta, 4)} and B = {f(B, 4)} gives the same {f(W_d, 4)}.",
]

ex6 = {
    "n": 6, "title": "Risk-neutral valuation", "points": 20, "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 25], "body": e6_body,
    "parts": [
        {"label": "a", "points": 3, "body": "<p>What is the NPV of building the plant right now?</p>",
         "solution": e6a_sol, "criteria": e6a_crit},
        {"label": "b", "points": 6, "body": e6b_body, "solution": e6b_sol, "criteria": e6b_crit},
        {"label": "c", "points": 8, "body": e6c_body, "solution": e6c_sol, "criteria": e6c_crit},
        {"label": "d", "points": 3, "body": e6d_body, "solution": e6d_sol, "criteria": e6d_crit},
    ],
}

# ======================================================================
# Settet
# ======================================================================
exam = {
    "id": "prove2",
    "kind": "mock",
    "label": "Mock exam 2",
    "minutes": 180,
    "points": 100,
    "format": "6 exercises · no multiple choice · calculator permitted",
    "note": (
        "Written for this app in Kurbatov's format; not an official NHH exam. It follows autumn 2024 "
        "exercise by exercise: M&amp;A and governance in words · a debt-financed payout in a perfect market · "
        "risk shifting with debt overhang · a twin-firm valuation by WACC and APV · a real option valued with "
        "risk-neutral probabilities. All numbers and scenarios are new; every figure is computed and "
        "checked by script."
    ),
    "facts": [
        "Mock exam in Kurbatov's format (H2024, H2025): six exercises, 100 points, no multiple choice. This one follows the order of autumn 2024.",
        "Pen and paper. Calculator and one bilingual dictionary are permitted; nothing else.",
        "The formula sheet is handed out. V<sup>L</sup> = V<sup>U</sup> + PV(TS), the rate that discounts the tax shield and everything about real options must be memorised.",
        "Answer in English and show every calculation: no calculation, no points. Give rates to 4 decimal places.",
    ],
    "exercises": [ex1, ex2, ex3, ex4, ex5, ex6],
}

# ---------------------------------------------------------------- kontroller
assert [e["points"] for e in exam["exercises"]] == [12, 12, 18, 18, 20, 20]
assert sum(e["points"] for e in exam["exercises"]) == exam["points"] == 100
for e in exam["exercises"]:
    if "parts" in e:
        assert sum(p["points"] for p in e["parts"]) == e["points"], e["n"]
        assert 3 <= len(e["parts"]) <= 9
        for p in e["parts"]:
            assert 2 <= p["points"] <= 8, (e["n"], p["label"])
            assert 3 <= len(p["criteria"]) <= 7, (e["n"], p["label"], len(p["criteria"]))
    else:
        assert 3 <= len(e["criteria"]) <= 7
assert [p["points"] for p in ex3["parts"]] == [3, 3, 6, 3, 3]
assert [p["points"] for p in ex5["parts"]] == [6, 3, 3, 2, 6]
assert [p["points"] for p in ex6["parts"]] == [3, 6, 8, 3]

tekst = json.dumps(exam, ensure_ascii=False)
assert "—" not in tekst, "tankestrek funnet"
ren = re.sub(r"<[^>]+>", " ", tekst)
ren = re.sub(r"\s+", " ", ren)
assert not re.search(r",\s*and\b", ren), re.findall(r".{40},\s*and\b.{20}", ren)
assert not re.search(r",\s*and\b", tekst)
for e in exam["exercises"]:
    krit = list(e.get("criteria", [])) + [c for p in e.get("parts", []) for c in p["criteria"]]
    for c in krit:
        assert not re.search(r"<[a-zA-Z/!]", c), c
# ingen rå «<» i HTML-tekst utenom tagger
for felt in re.findall(r'"(?:body|solution)": "((?:[^"\\]|\\.)*)"', tekst):
    uten = re.sub(r"</?[a-zA-Z][^>]*>", "", felt)
    assert "<" not in uten and ">" not in uten.replace("&gt;", ""), uten[:200]

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(exam, fh, ensure_ascii=False, indent=2)
    fh.write("\n")

print("Skrev", UT)
print(f"E3: r_E={rE3:.4f} r_U={rU3:.4f} DPS={DPS:.2f} P_ex={P_ex:.2f} r_E,new={rE3_new:.6f} beta_E={bE3_new:.4f} n={n_rep}")
print(f"E4: E(S,M,R)@40={ES},{EM},{ER} D={DS},{DM},{DR} F*={Fstar} F**={Fstar2} overhang: cred {gain_cred} sh {gain_sh} range [{Flo},{Fhi}]")
print(f"E5: beta_D={bDk:.4f} beta_U={bU5:.4f} r_U={rU5:.6f} r_E={rE5:.7f} wacc={wacc5:.6f} VL={VL5:.4f} VU={VU5:.4f} D0={D0_5:.4f} TS1={TS1:.4f} PVTS={PVTS:.4f}")
print(f"E6: NPV={NPV_now} Wb={W_b:.4f} opt_b={opt_b:.4f} rho={rho:.6f} Wd={W_d:.4f} opt_d={opt_d:.4f} Delta={Delta:.6f} B={B:.4f} exp_ret={exp_ret_opt:.4f}")
