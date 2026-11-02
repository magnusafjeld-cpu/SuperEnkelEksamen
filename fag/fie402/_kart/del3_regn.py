#!/usr/bin/env python3
"""FIE402 kartlegging del 3: regner ut hvert tall i del3.js og sjekker fila.

Kjør: python3 fag/fie402/_kart/del3_regn.py

Skriptet regner riktig svar og hvert feilsvar fra sin navngitte feil, bygger
alternativtekstene slik de skal stå i del3.js, laster del3.js gjennom node og
assert-er at alternativene, fasitindeksene og tallene i løsningene stemmer.
"""
import json
import pathlib
import re
import subprocess
from math import exp, log, sqrt
from statistics import NormalDist

HER = pathlib.Path(__file__).resolve().parent
N = NormalDist().cdf
M = "−"  # minus


def f(x, d=2):
    """Tall med d desimaler og ekte minustegn."""
    s = f"{x:.{d}f}"
    if s.startswith("-"):
        s = M + s[1:]
    if s in (M + "0." + "0" * d,):
        s = s[1:]
    return s


def pct(x, d=2):
    return f(100 * x, d) + "%"


forventet = {}   # nøkkel "1a" -> dict(options=[...] eller None, answer=i, tall=[...])


def numerisk(key, korrekt, feil, fmt, answer):
    """korrekt: verdi. feil: liste av verdier. fmt: funksjon verdi -> tekst.
    Sjekker at alternativene er stigende og at riktig svar havner på answer."""
    alle = [korrekt] + list(feil)
    alle_sortert = sorted(alle)
    tekster = [fmt(v) for v in alle_sortert]
    assert len(set(tekster)) == 4, (key, tekster)
    idx = alle_sortert.index(korrekt)
    assert idx == answer, (key, idx, answer, tekster)
    forventet[key] = dict(options=tekster, answer=answer, tall=[])
    return tekster


# ------------------------------------------------------------------ Case 1
S, rf = 240.0, 0.04
# 1a: bull spread, payoff og profit ved forfall
K1, C1, K2, C2, ST = 230, 31.20, 260, 14.60, 252
payoff = max(ST - K1, 0) - max(ST - K2, 0)
netto = C1 - C2
profit = payoff - netto
f_nomax = (ST - K1) - (ST - K2) - netto        # glemte max på skrevet call
f_begge = payoff - C1 - C2                     # trakk fra begge premiene
f_payoff = payoff                              # payoff, ikke profit
assert abs(profit - 5.40) < 1e-9
numerisk("1a", profit, [f_nomax, f_begge, f_payoff], f, 1)
forventet["1a"]["tall"] = ["22.00", "16.60", "5.40", "13.40", M + "23.80"]

# 1b: nedre grense for en call
Kb, qb = 200, 44.00
pvkb = Kb / (1 + rf)
gulv = S - pvkb
gevinst = gulv - qb
assert gevinst > 0 and qb > S - Kb
forventet["1b"] = dict(options=None, answer=2,
                       tall=[f(pvkb), f(gulv), f(gevinst), f(S - Kb)])

# 1c: put-call-paritet, to år
Kc, Cc, T = 250, 52.40, 2
pvkc = Kc / (1 + rf) ** T
Pc = Cc - S + pvkc
f_ettår = Cc - S + Kc / (1 + rf)
f_udisk = Cc - S + Kc
f_fortegn = Cc + S - pvkc
numerisk("1c", Pc, [f_ettår, f_udisk, f_fortegn], f, 0)
forventet["1c"]["tall"] = [f(pvkc, 4), f(Pc, 4)]
assert Cc >= max(S - pvkc, 0) and Pc <= pvkc   # grensene holder

# ------------------------------------------------------------------ Case 2
S0, Su, Sd, r2 = 80.0, 100.0, 68.0, 0.03
rho = ((1 + r2) * S0 - Sd) / (Su - Sd)
assert abs(rho - 0.45) < 1e-12
assert Sd < (1 + r2) * S0 < Su

# 2a: replikere en put, K = 90
Pu, Pd = max(90 - Su, 0), max(90 - Sd, 0)


def repl(delta):
    B = (Pd - Sd * delta) / (1 + r2)
    return delta, B, S0 * delta + B


d_ok = (Pu - Pd) / (Su - Sd)
_, B_ok, P_ok = repl(d_ok)
_, B_sign, P_sign = repl(-d_ok)                  # mistet fortegnet på delta
B_ud = (Pd - Sd * d_ok)                          # glemte å diskontere B
P_ud = S0 * d_ok + B_ud
d_niv = -Pd / Sd                                 # forhold mellom nivåer
_, B_niv, P_niv = repl(d_niv)
rad = {P_ok: (d_ok, B_ok), P_sign: (-d_ok, B_sign), P_ud: (d_ok, B_ud), P_niv: (d_niv, B_niv)}


def fmt2a(P):
    d, B = rad[P]
    return f"Δ = {f(d, 4)}, B = {f(B)}, P = {f(P)}"


numerisk("2a", P_ok, [P_sign, P_ud, P_niv], fmt2a, 0)
forventet["2a"]["tall"] = [f(d_ok, 4), f(B_ok, 4), f(P_ok, 4)]

# 2b: rho og en call med K = 84
Cu, Cd = max(Su - 84, 0), max(Sd - 84, 0)
p_real = 0.60
vekter = {
    rho: rho,                                    # riktig
    (S0 - Sd) / (Su - Sd): None,                 # glemte (1 + rf)
    1 - rho: None,                               # byttet om opp og ned
    p_real: None,                                # virkelig sannsynlighet
}
C2b = {w: (w * Cu + (1 - w) * Cd) / (1 + r2) for w in vekter}
pris2b = {C2b[w]: w for w in vekter}
numerisk("2b", C2b[rho], [C2b[w] for w in vekter if w != rho],
         lambda c: f"ρ = {f(pris2b[c], 4)}, C = {f(c)}", 1)
forventet["2b"]["tall"] = ["82.40", f(C2b[rho], 4)]

# 2c: to perioder, K = 82, på et ANNET hypotetisk tre (+20 % / −10 %), så 2b ikke lekker
u2c, d2c = 1.20, 0.90
rho2c = ((1 + r2) - d2c) / (u2c - d2c)
assert abs(rho2c - 0.13 / 0.30) < 1e-12 and abs(round(rho2c, 4) - 0.4333) < 1e-12
Suu, Sud, Sdd = S0 * u2c ** 2, S0 * u2c * d2c, S0 * d2c ** 2
assert abs(Suu - 115.2) < 1e-9 and abs(Sud - 86.4) < 1e-9 and abs(Sdd - 64.8) < 1e-9
K2c = 82
rho_ = rho      # rho fra 2b tas vare på
rho = rho2c
cuu, cud, cdd = max(Suu - K2c, 0), max(Sud - K2c, 0), max(Sdd - K2c, 0)
cu = (rho * cuu + (1 - rho) * cud) / (1 + r2)
cd = (rho * cud + (1 - rho) * cdd) / (1 + r2)
c0 = (rho * cu + (1 - rho) * cd) / (1 + r2)
direkte = (rho ** 2 * cuu + 2 * rho * (1 - rho) * cud + (1 - rho) ** 2 * cdd) / (1 + r2) ** 2
assert abs(c0 - direkte) < 1e-12
f_uten2 = (rho ** 2 * cuu + rho * (1 - rho) * cud) / (1 + r2) ** 2
f_endisk = (rho ** 2 * cuu + 2 * rho * (1 - rho) * cud) / (1 + r2)
f_enper = rho * max(S0 * u2c - K2c, 0) / (1 + r2)
numerisk("2c", c0, [f_uten2, f_endisk, f_enper], lambda x: f(x), 2)
forventet["2c"]["tall"] = [f(cu, 4), f(cd, 4), f(c0, 4), f(direkte, 4), f(rho ** 2, 4), f(2 * rho * (1 - rho), 4)]
d0_2c = (cu - cd) / (S0 * u2c - S0 * d2c)
du_2c = (cuu - cud) / (Suu - Sud)
dd_2c = (cud - cdd) / (Sud - Sdd)
forventet["2c"]["tall"] += [f(d0_2c, 4), f(du_2c, 4), f(dd_2c, 4)]
rho = rho_

# 2d: virkelig sannsynlighet
forventet["2d"] = dict(options=None, answer=3, tall=[])

# ------------------------------------------------------------------ Case 3


def bs(S_, K_, r_, T_, s_):
    pv = K_ / (1 + r_) ** T_
    d1 = log(S_ / pv) / (s_ * sqrt(T_)) + s_ * sqrt(T_) / 2
    d2 = d1 - s_ * sqrt(T_)
    C_ = S_ * N(d1) - pv * N(d2)
    return C_, C_ - S_ + pv, N(d1), N(d2)


c30, p30, nd1_30, nd2_30 = bs(120, 120, 0.03, 1, 0.30)
c22, p22, nd1_22, nd2_22 = bs(120, 120, 0.03, 1, 0.22)
assert abs((c30 - c22) - (p30 - p22)) < 1e-9   # paritet: samme overprising
forventet["3a"] = dict(options=None, answer=0, tall=[])
forventet["3b"] = dict(options=None, answer=3, tall=[f(nd1_30, 4), f(nd2_30, 4)])
forventet["3c"] = dict(options=None, answer=1, tall=[f(c30), f(c22), f(c30 - c22), f(p30), f(p22)])

# ------------------------------------------------------------------ Case 4
V0, Vu, Vd, K4, r4 = 200.0, 260.0, 150.0, 180.0, 0.05
rho4 = ((1 + r4) * V0 - Vd) / (Vu - Vd)
q4 = 1 - rho4
E4 = rho4 * max(Vu - K4, 0) / (1 + r4)
D4 = (rho4 * min(Vu, K4) + q4 * min(Vd, K4)) / (1 + r4)
assert abs(E4 + D4 - V0) < 1e-9
put4 = q4 * max(K4 - Vd, 0) / (1 + r4)
pvk4 = K4 / (1 + r4)
assert abs(pvk4 - put4 - D4) < 1e-9
p_hoy = 0.70
# 4a
f_putud = pvk4 - q4 * max(K4 - Vd, 0)                  # glemte å diskontere put
f_real4 = (p_hoy * K4 + (1 - p_hoy) * Vd) / (1 + r4)  # virkelig p med rf
f_rf4 = pvk4                                          # risikofri gjeld
numerisk("4a", D4, [f_putud, f_real4, f_rf4], f, 1)
forventet["4a"]["tall"] = [f(rho4, 4), f(put4, 4), f(pvk4, 4), f(E4, 4)]
# 4b: hypotetisk kurs 161.00 (ikke 4a-svaret), så 4a ikke lekker
D4g = 161.00
y4 = K4 / D4g - 1
spread = y4 - r4
L4 = (K4 - Vd) / K4
f_forv = (p_hoy * K4 + (1 - p_hoy) * Vd) / D4g - 1 - r4   # forventet avkastning
f_pal = (K4 - D4g) / K4 - r4                              # rabatt på pålydende
f_pvk = pvk4 / D4g - 1                                     # prisavstand til risikofri obligasjon
numerisk("4b", spread, [f_forv, f_pal, f_pvk], pct, 3)
forventet["4b"]["tall"] = [pct(y4, 4)]
# 4c: Merton, egenkapitalbeta
Vm, Km, rm, Tm, sm, bU = 200.0, 160.0, 0.05, 3, 0.35, 0.90
d1m = (log(Vm / Km) + (rm + sm ** 2 / 2) * Tm) / (sm * sqrt(Tm))
d2m = d1m - sm * sqrt(Tm)
Em = Vm * N(d1m) - Km * exp(-rm * Tm) * N(d2m)
Em_g, nd1_g, nd2_g = round(Em, 2), round(N(d1m), 4), round(N(d2m), 4)
assert (Em_g, nd1_g, nd2_g) == (78.43, 0.8209, 0.6226), (Em_g, nd1_g, nd2_g)
bE = nd1_g * (Vm / Em_g) * bU
f_utenN = (Vm / Em_g) * bU
f_nd2 = nd2_g * (Vm / Em_g) * bU
f_utenVE = nd1_g * bU
numerisk("4c", bE, [f_utenN, f_nd2, f_utenVE], f, 2)
Dm = Vm - Em_g
bD = (1 - nd1_g) * (Vm / Dm) * bU
sjekk = (Em_g / Vm) * bE + (Dm / Vm) * bD
assert abs(sjekk - bU) < 1e-12
forventet["4c"]["tall"] = [f(Vm / Em_g, 4), f(bE, 4), f(Dm), f(bD, 4)]
# 4d: CDS
s_cds = q4 * L4
f_realp = 0.30 * L4                        # virkelig misligholdssannsynlighet
f_upfront = put4 / K4                      # upfront som andel av nominelt
f_bond = K4 / D4 - 1 - r4                  # obligasjonens kredittspread
numerisk("4d", s_cds, [f_realp, f_upfront, f_bond], pct, 2)
bond_formel = s_cds * (1 + r4) / (1 - s_cds)
assert abs(bond_formel - f_bond) < 1e-12
forventet["4d"]["tall"] = [f(q4, 4), f(L4, 4), f(put4, 4)]

# ------------------------------------------------------------------ Case 5
p5, H5, L5, I5, r5 = 0.60, 115.0, 55.0, 900.0, 0.10
npv_now = p5 * H5 / r5 + (1 - p5) * L5 / r5 - I5
npv_h, npv_l = H5 / r5 - I5, L5 / r5 - I5
assert abs(npv_now - 10) < 1e-9 and abs(npv_h - 250) < 1e-9 and abs(npv_l + 350) < 1e-9
vente = p5 * max(npv_h, 0) / (1 + r5)
opsjon = vente - max(npv_now, 0)
f_dobbel = p5 * npv_h / (1 + r5) ** 2 - npv_now
f_vente = vente
f_udisk5 = p5 * npv_h - npv_now
numerisk("5a", opsjon, [f_dobbel, f_vente, f_udisk5], f, 1)
forventet["5a"]["tall"] = [f(vente, 4), f(opsjon, 4)]
# 5b: dekomponering
unngatt = (1 - p5) * (-npv_l)
forsinkelse = p5 * npv_h - vente
assert abs(unngatt - forsinkelse - opsjon) < 1e-9
forventet["5b"] = dict(options=None, answer=0,
                       tall=[f(unngatt), f(forsinkelse), f(I5 / (1 + r5)), f(npv_now / (1 + r5))])
# 5c: indifferens i I
EV = p5 * H5 / r5 + (1 - p5) * L5 / r5
Istar = ((1 + r5) * EV - p5 * H5 / r5) / ((1 + r5) - p5)
assert L5 / r5 < Istar < H5 / r5
assert abs((EV - Istar) - p5 * (H5 / r5 - Istar) / (1 + r5)) < 1e-9
f_udisk_I = (EV - p5 * H5 / r5) / (1 - p5)          # glemte å diskontere ventegrenen
assert abs(f_udisk_I - L5 / r5) < 1e-9
f_dobbel_I = ((1 + r5) ** 2 * EV - p5 * H5 / r5) / ((1 + r5) ** 2 - p5)
f_utenmax = EV                                      # glemte max: like bare ved NPV = 0
numerisk("5c", Istar, [f_udisk_I, f_dobbel_I, f_utenmax], f, 1)
forventet["5c"]["tall"] = [f(EV - Istar), f(EV)]

# ------------------------------------------------------------------ Case 6
r6 = 0.12
st = [(0.25, 560.0), (0.45, 330.0), (0.30, 120.0)]
I6 = 300.0
npvs = [(p, pv - I6) for p, pv in st]
E_npv = sum(p * n for p, n in npvs)
E_max = sum(p * max(n, 0) for p, n in npvs)
vpi_na = E_max - max(E_npv, 0)
assert abs(vpi_na - 0.30 * 180) < 1e-9
vpi_sen = E_max / (1 + r6) - max(E_npv, 0)
f_beggedisk = (E_max - max(E_npv, 0)) / (1 + r6)
f_ignorert = vpi_na
f_utentrekk = E_max / (1 + r6)
numerisk("6a", vpi_sen, [f_beggedisk, f_ignorert, f_utentrekk], f, 0)
forventet["6a"]["tall"] = [f(E_npv), f(E_max), f(E_max / (1 + r6), 4)]
# 6b: exit med avkortet annuitet
p6, CFh, CFl, r6b, salg, I6b = 0.55, 210.0, 70.0, 0.10, 900.0, 1500.0
ann2 = (1 - (1 + r6b) ** -2) / r6b
svak_uten = CFl / r6b
svak_med = CFl * ann2 + salg / (1 + r6b) ** 2
assert salg > CFl / r6b     # salg slår videre drift i svak tilstand
assert salg < CFh / r6b     # men ikke i sterk
ops6 = (1 - p6) * (svak_med - svak_uten)
assert abs(ops6 - (1 - p6) * (salg - CFl / r6b) / (1 + r6b) ** 2) < 1e-9
npv_uten6 = p6 * CFh / r6b + (1 - p6) * svak_uten - I6b
npv_med6 = npv_uten6 + ops6
f_dato1 = (1 - p6) * ((CFl + salg) / (1 + r6b) - svak_uten)      # antok salg ved dato 1
f_udisk_salg = (1 - p6) * (CFl * ann2 + salg - svak_uten)        # glemte å diskontere salget
f_perp_salg = (1 - p6) * (svak_uten + salg / (1 + r6b) ** 2 - svak_uten)  # la salget oppå evigvarende
numerisk("6b", ops6, [f_dato1, f_udisk_salg, f_perp_salg], f, 0)
forventet["6b"]["tall"] = [f(ann2, 6), f(svak_med, 4), f(npv_uten6), f(npv_med6)]

# ------------------------------------------------------------------ Case 7
NA, PA, NT, PT, S7, ER = 60.0, 90.0, 25.0, 36.0, 300.0, 0.48
A7, T7 = NA * PA, NT * PT
x7 = ER * NT
Pnew = (A7 + T7 + S7) / (NA + x7)
y7 = x7 / (NA + x7)
npvA = (1 - y7) * (A7 + T7 + S7) - A7
npvT = y7 * (A7 + T7 + S7) - T7
assert abs(npvA + npvT - S7) < 1e-9 and abs(npvA - NA * (Pnew - PA)) < 1e-9
f_yNA = (1 - x7 / NA) * (A7 + T7 + S7) - A7                 # y = x/N_A
f_utenS = NA * ((A7 + T7) / (NA + x7) - PA)                 # glemte synergien
off_prem = ER * PA / PT - 1
f_tilbudt = S7 - off_prem * T7                              # brukte tilbudt premie
numerisk("7a", npvA, [f_yNA, f_utenS, f_tilbudt], f, 2)
forventet["7a"]["tall"] = [f(x7), f(Pnew, 4), f(y7, 4), f(npvT)]
ER_max = (PT + S7 / NT) / PA
ER_min = T7 / (A7 + S7) * NA / NT
f_null = PT / PA
f_NA = (PT + S7 / NA) / PA
numerisk("7b", ER_max, [ER_min, f_null, f_NA], lambda v: f(v, 4), 3)
forventet["7b"]["tall"] = []
akt_prem = ER * Pnew / PT - 1
assert abs((1 + akt_prem) - (1 + off_prem) * Pnew / PA) < 1e-12
assert abs(npvT - T7 * akt_prem) < 1e-9
f_kjoper = Pnew / PA - 1
f_utenS_prem = ER * (A7 + T7) / (NA + x7) / PT - 1
numerisk("7c", akt_prem, [f_kjoper, f_utenS_prem, off_prem], pct, 3)
forventet["7c"]["tall"] = [f(ER * Pnew, 4)]

# ------------------------------------------------------------------ Case 8
ER8, PA0, PT0, PA1, PT1, r8 = 0.75, 64.0, 40.0, 60.80, 44.0, 0.04
kost = 4 * PT1                 # kjøp 4 T
innskudd = 3 * PA1 * (1 + r8)  # shortsalg av 3 A plassert risikofritt
fullf = innskudd
mislyk = innskudd + 4 * PT0 - 3 * PA0
p8 = (kost * (1 + r8) - mislyk) / (fullf - mislyk)
spread_ok = 1 - (1 + r8) * (PA1 - PT1 / ER8) / (PA0 - PT0 / ER8)
assert abs(p8 - spread_ok) < 1e-12
f_utenrf = (kost - mislyk) / (fullf - mislyk)                    # kostnad ikke vokst med rf
f_ingenrente = 1 - (PA1 - PT1 / ER8) / (PA0 - PT0 / ER8)          # ignorerte renten helt
ERb = 1 / ER8
f_snudd = 1 - (1 + r8) * (PA1 - PT1 / ERb) / (PA0 - PT0 / ERb)   # snudd bytteforhold
numerisk("8a", p8, [f_utenrf, f_ingenrente, f_snudd], pct, 2)
forventet["8a"]["tall"] = [f(kost), f(fullf, 3), f(mislyk, 3), f(kost * (1 + r8))]
# 8b: EPS
NA8, NT8, epsA, epsT = 50.0, 20.0, 4.00, 3.20
eps_ny = (NA8 * epsA + NT8 * epsT) / (NA8 + ER8 * NT8)
pe_betalt = ER8 * PA0 / epsT
assert pe_betalt < PA0 / epsA
forventet["8b"] = dict(options=None, answer=3,
                       tall=[f(eps_ny), pct(eps_ny / epsA - 1), f(pe_betalt, 1), f(PA0 / epsA, 1)])

# ------------------------------------------------------------------ Case 9 og 10 (verbale)
forventet["9a"] = dict(options=None, answer=2, tall=[])
forventet["9b"] = dict(options=None, answer=1, tall=[])
forventet["10a"] = dict(options=None, answer=3, tall=[])
forventet["10b"] = dict(options=None, answer=0, tall=[])

# ================================================================== sjekk del3.js
js = HER / "del3.js"
kode = ("global.window={};require(process.argv[1]);"
        "process.stdout.write(JSON.stringify(window.EDU_KART.del3))")
data = json.loads(subprocess.check_output(["node", "-e", kode, str(js)]))

temaer = (HER / "temaer.js").read_text()
gyldige = set(re.findall(r'id: "(\w+)", del: 3', temaer))
assert data["del"] == 3 and data["kind"] == "kartlegging" and data["id"] == "kart3"

telling, pos, sett = {}, [0, 0, 0, 0], set()
total = 0
for ex in data["exercises"]:
    assert ex["points"] == len(ex["parts"]), ex["n"]
    assert 2 <= len(ex["parts"]) <= 5
    for p in ex["parts"]:
        key = f'{ex["n"]}{p["label"]}'
        sett.add(key)
        total += p["points"]
        assert p["points"] == 1
        assert p["tema"] in gyldige, (key, p["tema"])
        telling[p["tema"]] = telling.get(p["tema"], 0) + 1
        assert len(p["options"]) == 4 and len(p["diag"]) == 4, key
        assert p["diag"][p["answer"]] is None, key
        for i, d in enumerate(p["diag"]):
            if i != p["answer"]:
                assert d and len(d.split()) < 20, (key, d)
                assert "—" not in d and "–" not in d, (key, d)
                assert ", og " not in d, (key, d)
                assert "<" not in d, (key, d)   # diag er ren tekst
        tekst = json.dumps(p, ensure_ascii=False)
        pos[p["answer"]] += 1
        e = forventet[key]
        assert p["answer"] == e["answer"], (key, p["answer"], e["answer"])
        if e["options"] is not None:
            assert p["options"] == e["options"], (key, p["options"], e["options"])
        for t in e["tall"]:
            assert t in tekst, (key, t)
assert sett == set(forventet), sett ^ set(forventet)
assert total == data["points"] == 28
assert telling == {"opsjon": 3, "binomial": 4, "bs": 3, "kreditt": 4,
                   "realopsjon": 5, "ma": 5, "governance": 4}, telling
assert all(6 <= k <= 8 for k in pos), pos

# Verbale ledd: riktig svar skal ikke kunne gjettes på lengden.
ren = lambda h: re.sub(r"&[a-z]+;", "x", re.sub(r"<[^>]+>", "", h)).strip()
verbale = [(ex["n"], p) for ex in data["exercises"] for p in ex["parts"]
           if forventet[f'{ex["n"]}{p["label"]}']["options"] is None]
lengst = sum(1 for _, p in verbale
             if len(ren(p["options"][p["answer"]])) == max(len(ren(o)) for o in p["options"]))
kortest = sum(1 for _, p in verbale
              if len(ren(p["options"][p["answer"]])) == min(len(ren(o)) for o in p["options"]))
print(f"Verbale ledd: {len(verbale)}, riktig lengst i {lengst}, riktig kortest i {kortest}")
assert lengst <= len(verbale) // 2, "riktig svar er for ofte det lengste"
assert kortest >= len(verbale) // 4, "riktig svar er for sjelden det korteste"

# ingen rå < eller > i tekst: alle < må starte en tag
alt = json.dumps(data, ensure_ascii=False)
for m in re.finditer(r"<", alt):
    assert re.match(r"</?(p|b|i|sub|sup|ul|li|ol|table|tr|td|th|br|em|strong)\b", alt[m.start():]), alt[m.start():m.start() + 30]
assert ">" not in re.sub(r"<[^<>]*>", "", alt), "rå > i tekst"
assert "—" not in alt, "tankestrek"

print("Alle tall og fasitindekser stemmer.")
print("Ledd per tema:", telling)
print("Riktig posisjon A/B/C/D:", pos)
for k in sorted(forventet, key=lambda s: (int(s[:-1]), s[-1])):
    if forventet[k]["options"]:
        print(k, forventet[k]["options"], "svar", "ABCD"[forventet[k]["answer"]])
