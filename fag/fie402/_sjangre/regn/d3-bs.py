#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-bs (Black-Scholes-intuisjon og implisitt volatilitet).

Black-Scholes med diskret PV(K) = K/(1 + r_f)^T, som manualen (k23) og Kurbatov.
Hvert steg: eksempelet, oppgaven, fasiten, hvert feilsvar og kontrollen.

    python3 fag/fie402/_sjangre/regn/d3-bs.py
"""
from math import log, sqrt, erf


def N(x):
    return 0.5 * (1 + erf(x / sqrt(2)))


def bs(S, K, r, T, s):
    pvk = K / (1 + r) ** T
    if s == 0:
        return max(S - pvk, 0), max(pvk - S, 0)
    d1 = log(S / pvk) / (s * sqrt(T)) + s * sqrt(T) / 2
    d2 = d1 - s * sqrt(T)
    C = S * N(d1) - pvk * N(d2)
    P = C - S + pvk
    return C, P


def implisitt(pris, S, K, r, T, put=False):
    lo, hi = 1e-6, 3.0
    for _ in range(200):
        m = (lo + hi) / 2
        v = bs(S, K, r, T, m)[1 if put else 0]
        if v > pris:
            hi = m
        else:
            lo = m
    return (lo + hi) / 2


def vis(navn, v, des=4):
    print(f"  {navn:<60} {v:.{des}f}")


def ulike(*x, des=4):
    r = [round(v, des) for v in x]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


# ---------------------------------------------------------------- steg 1
print("\nd3-bs-1 · Why volatility raises an option's value")
# Eksempel: S_T 40/60 mot 20/80, K = 50, like sannsynlige, ingen diskontering
for lav, hoy in [(40, 60), (20, 80)]:
    c = 0.5 * max(hoy - 50, 0) + 0.5 * max(lav - 50, 0)
    p = 0.5 * max(50 - hoy, 0) + 0.5 * max(50 - lav, 0)
    vis(f"eks: S_T {lav}/{hoy}: E[call], E[put], E[S_T]", c); vis("   put", p); vis("   E[S_T]", 0.5 * (lav + hoy))
# Oppgave: S_T 85/115 mot 70/130, K = 105
c1 = 0.5 * max(115 - 105, 0)
c2 = 0.5 * max(130 - 105, 0)
fasit = c2 - c1
vis("opp: E[call] før", c1); vis("opp: E[call] etter", c2); vis("FASIT endring", fasit)
f_null = 0.0                       # snittet er uendret, så opsjonen er uendret
f_niva = c2                        # ga nytt nivå, ikke endringen
f_ingen_sanns = (130 - 105) - (115 - 105)  # glemte å vekte med 0.5
vis("feil: null", f_null); vis("feil: nytt nivå", f_niva); vis("feil: uten sannsynlighet", f_ingen_sanns)
ulike(fasit, f_null, f_niva, f_ingen_sanns, des=2)
p1 = 0.5 * max(105 - 85, 0); p2 = 0.5 * max(105 - 70, 0)
vis("kontroll: put før", p1); vis("kontroll: put etter", p2); vis("kontroll: put endring", p2 - p1)
assert abs((p2 - p1) - fasit) < 1e-12
# C − P = E[S_T] − K = 100 − 105 = −5 i begge tilfeller
assert abs((c1 - p1) - (100 - 105)) < 1e-12 and abs((c2 - p2) - (100 - 105)) < 1e-12

# ---------------------------------------------------------------- steg 2
print("\nd3-bs-2 · Which way each input moves a call and a put")
# Eksempel: S = 100, K = 100, r = 5%, T = 1, σ = 25%, utbytte 4 om et halvt år
S, K, r, T, s = 100, 100, 0.05, 1, 0.25
C0, P0 = bs(S, K, r, T, s)
vis("eks: C", C0); vis("eks: P", P0)
rader = {
    "S 100→110": bs(110, K, r, T, s),
    "K 100→110": bs(S, 110, r, T, s),
    "sigma 25→35%": bs(S, K, r, T, 0.35),
    "T 1→2": bs(S, K, r, 2, s),
    "r 5→7%": bs(S, K, 0.07, T, s),
}
for n, (c, p) in rader.items():
    vis(f"eks: {n}: C", c); vis(f"   P", p); vis("   dC", c - C0); vis("   dP", p - P0)
# Utbytte: aksjen uten utbyttet er S − PV(Div); PV(4) over et halvt år
pvdiv = 4 / 1.05 ** 0.5
cd, pd = bs(S - pvdiv, K, r, T, s)
vis("eks: PV(Div)", pvdiv); vis("eks: utbytte C", cd); vis("eks: utbytte P", pd)
vis("   dC", cd - C0); vis("   dP", pd - P0)
# Paritet med utbytte: C − P = S − PV(Div) − PV(K)
assert abs((cd - pd) - (S - pvdiv - K / 1.05)) < 1e-9
# Oppgave: r_f 5% → 3% og utbytte strøket (S = 80, K = 80, T = 1, σ = 30%, utbytte 3 om seks mnd)
S, K, T, s = 80, 80, 1, 0.30
pvd = 3 / 1.05 ** 0.5
pvd3 = 3 / 1.03 ** 0.5             # PV(Div) ved den nye renten
c_med, p_med = bs(S - pvd, K, 0.05, T, s)
c_lav, p_lav = bs(S - pvd3, K, 0.03, T, s)
vis("opp: PV(Div) 5%", pvd); vis("opp: PV(Div) 3%", pvd3)
vis("opp: C − P før", c_med - p_med); vis("opp: S − PV(Div) − PV(K) før", S - pvd - K / 1.05)
vis("opp: C − P 3%", c_lav - p_lav); vis("opp: S − PV(Div) − PV(K) 3%", S - pvd3 - K / 1.03)
vis("opp: C − P uten utbytte", bs(S, K, 0.05, T, s)[0] - bs(S, K, 0.05, T, s)[1]); vis("opp: S − PV(K)", S - K / 1.05)
c_uten, p_uten = bs(S, K, 0.05, T, s)
vis("opp: med utbytte, 5%: C", c_med); vis("   P", p_med)
vis("opp: r_f til 3%: C", c_lav); vis("   P", p_lav)
vis("opp: utbytte strøket: C", c_uten); vis("   P", p_uten)
assert c_lav < c_med and p_lav > p_med and c_uten > c_med and p_uten < p_med

# ---------------------------------------------------------------- steg 3
print("\nd3-bs-3 · The edge case σ → 0")
# Eksempel: S = 50, K = 52, r = 5%, T = 1
pvk = 52 / 1.05
vis("eks: PV(K)", pvk); vis("eks: C(σ=0)", 50 - pvk); vis("eks: S_T sikker", 50 * 1.05)
vis("eks: payoff", 50 * 1.05 - 52); vis("eks: PV payoff", (50 * 1.05 - 52) / 1.05)
for sig in (0.10, 0.20, 0.30):
    vis(f"eks: C ved σ = {sig}", bs(50, 52, 0.05, 1, sig)[0])
# Oppgave: S = 64, K = 66, r = 5%, T = 2
S, K, r, T = 64, 66, 0.05, 2
pvk = K / (1 + r) ** T
fasit = max(S - pvk, 0)
f_udisk = max(S - K, 0)                    # S − K < 0, «verdiløs»
f_ett_aar = S - K / (1 + r)                # diskonterte K ett år
f_ikke_tilbake = S * (1 + r) ** T - K      # glemte å diskontere payoffen tilbake
vis("opp: PV(K)", pvk); vis("FASIT C(σ=0)", fasit)
vis("feil: S − K", f_udisk); vis("feil: ett år", f_ett_aar); vis("feil: payoff udiskontert", f_ikke_tilbake)
ulike(fasit, f_udisk, f_ett_aar, f_ikke_tilbake)
vis("kontroll: put σ=0", max(pvk - S, 0)); vis("kontroll: S(1+r)^2", S * (1 + r) ** T)
vis("kontroll: payoff / 1.1025", (S * (1 + r) ** T - K) / (1 + r) ** T)
for sig in (0.05, 0.15, 0.30):
    vis(f"kontroll: C ved σ = {sig}", bs(S, K, r, T, sig)[0])

# ---------------------------------------------------------------- steg 4
print("\nd3-bs-4 · Implied volatility")
# Eksempel: call S = 100, K = 100, r = 4%, T = 1; tabell 20..40%
S, K, r, T = 100, 100, 0.04, 1
for sig in (0.20, 0.25, 0.30, 0.35, 0.40):
    vis(f"eks: C(σ = {sig:.2f})", bs(S, K, r, T, sig)[0])
vis("eks: implisitt σ for 13.7164", implisitt(13.7164, S, K, r, T)); vis("eks: overpriset mot 20%", 13.7164 - round(bs(S, K, r, T, 0.20)[0], 4))
# Oppgave: put S = 40, K = 42, r = 4%, T = 1; tabell 20..40%
S, K, r, T = 40, 42, 0.04, 1
tab = {}
for sig in (0.20, 0.25, 0.30, 0.35, 0.40):
    tab[sig] = bs(S, K, r, T, sig)[1]
    vis(f"opp: P(σ = {sig:.2f})", tab[sig])
marked = round(tab[0.25], 4)
egen = round(tab[0.35], 4)
fasit = egen - marked
vis("opp: markedspris (σ = 25%)", marked); vis("opp: egen σ = 35%", egen); vis("FASIT underpriset med", fasit)
vis("opp: implisitt σ", implisitt(marked, S, K, r, T, put=True))
f_30 = round(tab[0.30], 4) - marked     # leste av σ = 30% i stedet for 35%
vis("feil: 30%-raden", f_30)
ulike(fasit, f_30)
# Paritet: call ved samme σ, samme feilprising
c25, c35 = bs(S, K, r, T, 0.25)[0], bs(S, K, r, T, 0.35)[0]
vis("kontroll: call 25%", c25); vis("kontroll: call 35%", c35); vis("kontroll: call-gap", c35 - c25)
vis("kontroll: S − PV(K)", S - K / (1 + r))
vis("kontroll: C25 − P25", c25 - tab[0.25])

# ---------------------------------------------------------------- steg 5
print("\nd3-bs-5 · Real options: what if σ is very low?")
# Eksempel (restauranten fra forelesning 11, gjengitt med egne ord): kost 5, 0.6 vokser 2%, 12%, r_f 5%
pv = 0.6 / (0.12 - 0.02); npv = pv - 5; S0 = pv - 0.6 / 1.12; pvk = 5 / 1.05
vis("eks: PV", pv); vis("eks: NPV nå", npv); vis("eks: S", S0); vis("eks: PV(K)", pvk); vis("eks: vent σ=0", S0 - pvk)
# Oppgave: kost 10, 1.2 vokser 2%, 12%, r_f 5%
I, cf, g, k, rf = 10, 1.2, 0.02, 0.12, 0.05
pv = cf / (k - g); npv = pv - I
S0 = pv - cf / (1 + k); pvk = I / (1 + rf)
fasit = S0 - pvk
f_glemt_cf = pv - pvk            # glemte den tapte første kontantstrømmen
f_udisk = S0 - I                 # diskonterte ikke kostnaden
# Det tredje feilsvaret er riktig tall (1.4048) med feil beslutning: «vent», fordi
# verdien av å vente ble sammenlignet med 0 i stedet for med NPV nå = 2.
vis("opp: PV", pv); vis("opp: NPV nå", npv); vis("opp: S", S0); vis("opp: PV(K)", pvk)
vis("FASIT vent σ=0", fasit)
vis("feil: glemt CF", f_glemt_cf); vis("feil: K udiskontert", f_udisk)
ulike(fasit, f_glemt_cf, f_udisk)
assert f_glemt_cf > npv and f_udisk < npv and 0 < fasit < npv
vis("kontroll: NPV nå − vent", npv - fasit)
vis("kontroll: tapt CF PV", cf / (1 + k)); vis("kontroll: rentegevinst", I - pvk)
vis("kontroll: tapt − rente", cf / (1 + k) - (I - pvk))
assert abs((npv - fasit) - (cf / (1 + k) - (I - pvk))) < 1e-12
# Hvor stor σ trengs for at venting slår 2? (bare til kontrollen; ingen N(d) på eksamen)
lo, hi = 0.0, 2.0
for _ in range(200):
    m = (lo + hi) / 2
    if bs(S0, I, rf, 1, m)[0] > npv:
        hi = m
    else:
        lo = m
vis("kontroll: σ der venting = investere nå", (lo + hi) / 2)
for sig in (0.10, 0.20, 0.40):
    vis(f"kontroll: ventverdi ved σ = {sig}", bs(S0, I, rf, 1, sig)[0])

# ---------------------------------------------------------------- steg 6
print("\nd3-bs-6 · Exam level: true volatility below implied (put)")
# Eksempel: call S = 60, K = 62, r = 4%, T = 1, implisitt 45%, sann 30%
S, K, r, T = 60, 62, 0.04, 1
c45, p45 = bs(S, K, r, T, 0.45); c30, p30 = bs(S, K, r, T, 0.30)
vis("eks: C 45%", c45); vis("eks: C 30%", c30); vis("eks: gap", c45 - c30)
pvk = K / (1 + r) ** T
d1 = log(S / pvk) / 0.30 + 0.15
vis("eks: delta N(d1) ved 30%", N(d1))
# Oppgave: put S = 120, K = 115, r = 3%, T = 1, implisitt 36%, sann 24%
S, K, r, T = 120, 115, 0.03, 1
c36, p36 = bs(S, K, r, T, 0.36); c24, p24 = bs(S, K, r, T, 0.24)
pris = round(p36, 2)
vis("opp: P 36%", p36); vis("opp: markedspris", pris); vis("opp: implisitt σ av prisen", implisitt(pris, S, K, r, T, put=True))
vis("opp: P 24%", p24); vis("opp: P-gap", p36 - p24); vis("opp: C 36%", c36); vis("opp: C 24%", c24); vis("opp: C-gap", c36 - c24)
vis("opp: gap som andel av prisen", (p36 - p24) / p36)
# Put-delta = N(d1) − 1
pvk = K / (1 + r) ** T
d1 = log(S / pvk) / (0.24 * sqrt(T)) + 0.24 * sqrt(T) / 2
vis("opp: put-delta ved 24%", N(d1) - 1)
