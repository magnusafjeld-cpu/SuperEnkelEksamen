#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regner alle tall i den korte stigen d3-cds (CDS-prising).

Kurbatovs konvensjon fra forelesning 10: ρ er den risikonøytrale sannsynligheten for
mislighold, i den nederste grenen. Antall kontrakter λ = F × LGD (tapet i kroner ved
mislighold); hver kontrakt betaler 1 ved mislighold.

    python3 fag/fie402/_sjangre/regn/d3-cds.py
"""


def vis(navn, v, des=4):
    print(f"  {navn:<60} {v:.{des}f}")


def ulike(*x, des=4):
    r = [round(v, des) for v in x]
    assert len(set(r)) == len(r), f"to alternativer er like: {r}"


def rho_fra_pris(P, F, gjenv, rf, T=1):
    """[(1 − ρ)F + ρ·gjenv]/(1 + rf)^T = P  ⟹  ρ = (F − P(1 + rf)^T)/(F − gjenv)."""
    return (F - P * (1 + rf) ** T) / (F - gjenv)


# ---------------------------------------------------------------- steg 1
print("\nd3-cds-1 · The risky bond: price, promised yield and expected return")
P = 100 / 1.08; Ep = 0.95 * 100 + 0.05 * 70
vis("eks: pris", P); vis("eks: forventet utbetaling", Ep); vis("eks: forventet avkastning %", (Ep / P - 1) * 100)
# Oppgave: F = 100, y = 11 %, reell p = 8 %, betaler 60, r_f = 4 %
F, y, p, gj, rf = 100, 0.11, 0.08, 60, 0.04
P = F / (1 + y); Ep = (1 - p) * F + p * gj
fasit = Ep / P - 1
f_y = y                              # løftet rente som forventet avkastning
f_rf = rf                            # «prisen er rettferdig, så den gir r_f»
f_tilnaerm = y - p * (1 - gj / F)    # snarveien y − p·LGD
vis("opp: pris", P); vis("opp: forventet utbetaling", Ep); vis("FASIT r %", fasit * 100)
vis("feil: y", f_y * 100); vis("feil: r_f", f_rf * 100); vis("feil: y − p·LGD", f_tilnaerm * 100)
ulike(fasit, f_y, f_rf, f_tilnaerm)
vis("kontroll: forventet tap i kroner", p * (F - gj)); vis("kontroll: tap / pris %", p * (F - gj) / P * 100)
vis("kontroll: y − r %", (y - fasit) * 100)
vis("kontroll: 98.8889?", (F - p * (F - gj)))

# ---------------------------------------------------------------- steg 2
print("\nd3-cds-2 · Backing ρ out of the bond's price")
P = 100 / 1.08
r_eks = rho_fra_pris(P, 100, 70, 0.03)
vis("eks: P × 1.03", P * 1.03); vis("eks: ρ", r_eks); vis("eks: 1 − ρ", 1 - r_eks)
# Oppgave: samme obligasjon som i steg 1
F, y, p, gj, rf = 100, 0.11, 0.08, 60, 0.04
P = F / (1 + y)
rho = rho_fra_pris(P, F, gj, rf)
f_overlev = 1 - rho
f_reell = p
f_udisk = (F - P) / (F - gj)          # glemte å gange prisen opp med 1 + r_f
f_yield = rho_fra_pris(P, F, gj, y)   # diskonterte med løftet rente: ρ = 0
vis("opp: pris", P); vis("opp: P × 1.04", P * (1 + rf)); vis("FASIT ρ %", rho * 100)
vis("feil: 1 − ρ %", f_overlev * 100); vis("feil: reell %", f_reell * 100); vis("feil: udiskontert %", f_udisk * 100)
vis("feil: diskontert med y %", f_yield * 100)
ulike(rho, f_overlev, f_reell, f_udisk)
vis("kontroll: reprising", ((1 - rho) * F + rho * gj) / (1 + rf))
vis("kontroll: med 1 − ρ i bunnen", (rho * F + (1 - rho) * gj) / (1 + rf))

# ---------------------------------------------------------------- steg 3
print("\nd3-cds-3 · The price of a CDS that pays 1 in default")
# Eksempel: forelesning 10 (V2024 P3): r_f 5 %, y 10 %, betaler 80, reell 10 %
P2 = 100 / 1.10
r10 = rho_fra_pris(P2, 100, 80, 0.05)
vis("eks: P2", P2); vis("eks: ρ", r10); vis("eks: CDS", r10 / 1.05)
vis("eks: ρ avrundet 0.2272 → CDS", 0.2272 / 1.05)
vis("eks: overlevelse (feil)", (1 - r10) / 1.05); vis("eks: reell (feil)", 0.10 / 1.05)
# Oppgave: F 100, r_f 3 %, y 9 %, betaler 75, reell 6 %
F, y, p, gj, rf = 100, 0.09, 0.06, 75, 0.03
P = F / (1 + y)
rho = rho_fra_pris(P, F, gj, rf)
fasit = rho / (1 + rf)
f_overlev = (1 - rho) / (1 + rf)
f_reell = p / (1 + rf)
f_udisk = rho
vis("opp: pris", P); vis("opp: P × 1.03", P * (1 + rf)); vis("opp: ρ", rho); vis("FASIT CDS", fasit)
vis("feil: overlevelse", f_overlev); vis("feil: reell", f_reell); vis("feil: udiskontert", f_udisk)
ulike(fasit, f_overlev, f_reell, f_udisk)
vis("kontroll: CDS + overlevelseskrav", fasit + f_overlev); vis("kontroll: 1/1.03", 1 / 1.03)
vis("kontroll: 25 × CDS", 25 * fasit); vis("kontroll: PV(F) − P", F / (1 + rf) - P)

# ---------------------------------------------------------------- steg 4
print("\nd3-cds-4 · How many contracts: protection and the synthetic risk-free bond")
# Eksempel: obligasjonen fra steg 2-eksempelet: y 8 %, betaler 70, r_f 3 %
P = 100 / 1.08
r_eks = rho_fra_pris(P, 100, 70, 0.03)
cds = r_eks / 1.03
vis("eks: CDS", cds); vis("eks: λ", 100 * 0.30); vis("eks: kostnad", 30 * cds)
vis("eks: P + beskyttelse", P + 30 * cds); vis("eks: 100/1.03", 100 / 1.03)
# Oppgave: F 1 000, y 7 %, r_f 2.5 %, gjenvinning 55 %
F, y, rf, R = 1000, 0.07, 0.025, 0.55
P = F / (1 + y)
rho = rho_fra_pris(P, F, R * F, rf)
cds = rho / (1 + rf)
lam = F * (1 - R)
fasit = lam * cds
f_paalydende = F * cds          # kjøpte én kontrakt per krone pålydende
f_gjenvinning = R * F * cds     # kjøpte gjenvinningen i stedet for tapet
f_udisk = lam * rho             # glemte å diskontere
vis("opp: pris", P); vis("opp: P × 1.025", P * (1 + rf)); vis("opp: ρ", rho); vis("opp: CDS", cds)
vis("opp: λ", lam); vis("FASIT kostnad", fasit)
vis("feil: 1 000 kontrakter", f_paalydende); vis("feil: 550 kontrakter", f_gjenvinning); vis("feil: udiskontert", f_udisk)
ulike(fasit, f_paalydende, f_gjenvinning, f_udisk)
vis("kontroll: P + beskyttelse", P + fasit); vis("kontroll: PV(F)", F / (1 + rf))
vis("kontroll: PV(F) − P", F / (1 + rf) - P)
# Tilstand for tilstand: ikke mislighold 1 000 + 0; mislighold 550 + 450
assert R * F + lam == F

# ---------------------------------------------------------------- steg 5
print("\nd3-cds-5 · Why ρ is above the real default probability (utsagn)")
# Eksempel: forventet tap med reell p mot CDS-pris (forelesningens tall)
r10 = rho_fra_pris(100 / 1.10, 100, 80, 0.05)
vis("eks: beskyttelse 20 × CDS", 20 * r10 / 1.05); vis("eks: forventet tap PV", 0.10 * 20 / 1.05)
vis("eks: risikopremie", 20 * r10 / 1.05 - 0.10 * 20 / 1.05)
# Oppgave: ρ = 22 %, reell 9 % (ingen regning). Illustrasjon: selger beskyttelse, tjener i snitt
rho, p, rf = 0.22, 0.09, 0.04
pris = rho / (1 + rf)
vis("opp: pris per 1", pris); vis("opp: selgers forventede utbetaling (PV)", p / (1 + rf))
vis("opp: selgers tap ved mislighold (per 1, i ett år)", 1 - pris * (1 + rf))

# ---------------------------------------------------------------- steg 6
print("\nd3-cds-6 · Exam level: two bonds, ρ, the CDS and the put (V2024 P3)")
# Eksempel: obligasjon 1 r_f 2 %; obligasjon 2 y 6.5 %, reell 4 %, betaler 85
P1 = 100 / 1.02; P2 = 100 / 1.065; Ep = 0.96 * 100 + 0.04 * 85
rE = rho_fra_pris(P2, 100, 85, 0.02); cE = rE / 1.02
vis("eks: P1", P1); vis("eks: P2", P2); vis("eks: E[payoff]", Ep); vis("eks: r %", (Ep / P2 - 1) * 100)
vis("eks: ρ", rE); vis("eks: CDS", cE); vis("eks: put 15 × CDS", 15 * cE); vis("eks: P1 − P2", P1 - P2)
# Oppgave: obligasjon 1 r_f 3.5 %; obligasjon 2 y 9.5 %, reell 7 %, betaler 72
rf, y, p, gj = 0.035, 0.095, 0.07, 72
P1 = 100 / (1 + rf); P2 = 100 / (1 + y)
Ep = (1 - p) * 100 + p * gj
r = Ep / P2 - 1
rho = rho_fra_pris(P2, 100, gj, rf)
cds = rho / (1 + rf)
put = (100 - gj) * cds
vis("opp: P1", P1); vis("opp: P2", P2); vis("opp: E[payoff]", Ep); vis("FASIT r %", r * 100)
vis("FASIT ρ", rho); vis("FASIT CDS", cds); vis("FASIT put", put); vis("kontroll: P1 − P2", P1 - P2)
# Feil linje 1: løftet rente som forventet avkastning
vis("feil1: r = y %", y * 100)
# Feil linje 2: ρ i toppen (overlevelse)
rS = 1 - rho; cS = rS / (1 + rf); pS = (100 - gj) * cS
vis("feil2: ρ", rS); vis("feil2: CDS", cS); vis("feil2: put", pS)
# Feil linje 3: reell sannsynlighet
cR = p / (1 + rf); pR = (100 - gj) * cR
vis("feil3: ρ", p); vis("feil3: CDS", cR); vis("feil3: put", pR)
vis("kontroll: P2 + put", P2 + put); vis("kontroll: spread %", (y - rf) * 100)
vis("kontroll: forventet tap-del %", (y - r) * 100); vis("kontroll: risikopremie-del %", (r - rf) * 100)
