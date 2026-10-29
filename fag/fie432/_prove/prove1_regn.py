"""Prøveeksamen 1 (FIE432): alle tall regnet på nytt.

Kjør:  python3 -I prove1_regn.py [sti/til/prove1.json]

Skriptet regner hvert tall i spørsmål, riktig svar og gale alternativer, og
skriver dem ut ledd for ledd. Får det stien til prove1.json, sjekker det i
tillegg at hvert alternativ i fila inneholder tallet skriptet har regnet, at
riktig svar står på plassen fasitplanen sier, og at teksten følger
skrivereglene (ingen tankestrek, ingen komma foran «og»).
"""
import json
import math
import re
import sys


def kr(x, d=0):
    """Norsk tallformat: mellomrom som tusenskille, komma som desimaltegn."""
    neg = x < 0
    s = f"{abs(x):,.{d}f}".replace(",", " ").replace(".", ",")
    return ("−" if neg else "") + s


def pst(x, d=2):
    return kr(100 * x, d) + " %"


LEDD = []  # (ledd-nr, riktig tekstbit, [gale tekstbiter])


def ledd(nr, riktig, gale, merk=""):
    LEDD.append((nr, riktig, gale))
    print(f"  ledd {nr:2d}: riktig {riktig!r:24} gale {gale}  {merk}")


# ---------------------------------------------------------------- Oppgave 1
print("\nOppgave 1: skjerming over tre år")
K = 20_000
renter = [0.02, 0.03, 0.04]
utbytte = [300, 500, 1_500]
ub = 0.0
rad = []
for r, D in zip(renter, utbytte):
    S = K + ub
    fr = S * r
    samlet = fr + ub
    skpl = max(0.0, D - samlet)
    ub_ut = max(0.0, samlet - D)
    rad.append((S, fr, samlet, D, skpl, ub_ut))
    print(f"   grunnlag {S:10.2f}  årets {fr:8.2f}  samlet {samlet:8.2f}  utbytte {D:6}  skpl {skpl:8.2f}  ubenyttet ut {ub_ut:8.2f}")
    ub = ub_ut
ub_etter_aar2 = rad[1][5]
assert abs(ub_etter_aar2 - 203) < 1e-9
# Gale i a
a_uten_grunnlag = (K * 0.02 - 300) + K * 0.03 - 500          # framført ikke lagt til grunnlaget
a_uten_fratrekk = (K + 100) * 0.03 - 500                       # lagt til grunnlaget, ikke trukket fra
a_samlet = rad[1][2]                                           # samlet fradrag år 2 (mellomtall)
a_glemt_helt = K * 0.03 - 500                                   # resten fra år 1 glemt helt
ledd(1, "Kr 203", [f"Kr {kr(a_glemt_helt)}", f"Kr {kr(a_uten_grunnlag)}", f"Kr {kr(a_uten_fratrekk)}"])
print(f"   nedre grense for resten: {100 + K*0.03 - 500}")
b_riktig = rad[2][4]
b_kostpris = 1_500 - 203 - K * 0.04                            # årets fradrag på kostpris
b_uten_fratrekk = 1_500 - rad[2][1]                            # framført ikke trukket fra
b_samlet = rad[2][2]                                           # samlet fradrag år 3 (mellomtall)
ledd(2, f"Kr {kr(b_riktig, 2)}", [f"Kr {kr(b_kostpris, 2)}", f"Kr {kr(b_samlet, 2)}", f"Kr {kr(b_uten_fratrekk, 2)}"])
# kontroll: identitet
brukt = 300 + 500 + rad[2][2]
assert abs(b_riktig + brukt - sum(utbytte)) < 1e-9
opptjent = rad[0][1] + rad[1][1] + rad[2][1]
print(f"   kontroll: skjerming opptjent {opptjent:.2f}, brukt {brukt:.2f}; vekst {K*(1.02*1.03*1.04-1):.2f}")
print(f"   skatt av 488,88 (for kontroll) = {b_riktig*0.3784:.2f}")

# ---------------------------------------------------------------- Oppgave 2
print("\nOppgave 2: gevinst med ubenyttet skjerming")
kost, salg = 80_000, 95_000
ub1 = kost * 0.03
ub2 = ub1 + (kost + ub1) * 0.04
gev = salg - kost - ub2
te = 1.72 * 0.22
skatt = gev * te
print(f"   ubenyttet år1 {ub1:.2f}, akkumulert år2 {ub2:.2f}, gevinst {gev:.2f}, te {te:.4f}, skatt {skatt:.4f}")
uten_oppj = gev * 0.22
salgsaar = (gev - (kost + ub2) * 0.035) * te
ikke_grunnlag = (salg - kost - (ub1 + kost * 0.04)) * te
uten_skj = (salg - kost) * te
print(f"   glemt oppjustering {uten_oppj:.4f}; skjerming i salgsåret {salgsaar:.4f} (salgsårets skjerming {(kost+ub2)*0.035:.2f}); "
      f"grunnlag ikke økt {ikke_grunnlag:.4f}; skjerming glemt {uten_skj:.2f}")
ledd(3, f"Kr {kr(skatt, 2)}", [f"Kr {kr(uten_oppj, 2)}", f"Kr {kr(salgsaar, 2)}", f"Kr {kr(ikke_grunnlag, 2)}"])
print(f"   kontroll: 9 304 × 1,72 = {gev*1.72:.2f}, × 22 % = {gev*1.72*0.22:.4f}")

# ---------------------------------------------------------------- Oppgave 3
print("\nOppgave 3: effektiv skattesats")
O = 600_000
sel = O * 0.22
utb = O - sel
skj = 2_000_000 * 0.04
grunnl = utb - skj
eier = grunnl * te
samlet = (sel + eier) / O
print(f"   selskapsskatt {sel}, utbytte {utb}, skjerming {skj}, grunnlag {grunnl}, eierskatt {eier:.2f}, samlet {samlet*100:.4f} %")
uten_skj = (sel + utb * te) / O
eier_paa_utb = eier / utb
uten_oppj = (sel + grunnl * 0.22) / O
uten_selskap = eier / O
ledd(4, pst(samlet), [pst(uten_selskap), pst(eier_paa_utb), pst(uten_oppj)])
print(f"   (uten skjerming ville gitt {pst(uten_skj)}, øvre grense)")
print(f"   kontroll: 22 % + (388 000/600 000) × 37,84 % = {(0.22 + grunnl/O*te)*100:.4f} %")
# b
inn, avskr, maskin = 600_000, 180_000, 540_000
sk = (inn - avskr) * 0.22
eff = sk / inn
paa_skpl = sk / (inn - avskr)
redusert = 0.22 * avskr / inn
hele_maskin = (inn - maskin) * 0.22 / inn
print(f"   b: skatt {sk}, effektiv {eff*100:.3f} %, på skpl {paa_skpl*100:.2f} %, reduksjon {redusert*100:.2f} pp, hele maskinen {hele_maskin*100:.2f} %")
ledd(5, pst(eff, 1), [pst(paa_skpl, 1), pst(redusert, 1), pst(hele_maskin, 1)])
print(f"   kontroll: 22 % × (1 − 180/600) = {0.22*(1-avskr/inn)*100:.3f} %")

# ---------------------------------------------------------------- Oppgave 4
print("\nOppgave 4: formuesskatt med forholdsmessig gjeldsfordeling")
BV = {"bolig": 8_000_000, "fond": 6_000_000, "bank": 2_000_000}
rabatt = {"bolig": 0.75, "fond": 0.20, "bank": 0.0}
avkort = {"bolig": False, "fond": True, "bank": False}
G = 4_800_000
sumBV = sum(BV.values())
FV = {k: v * (1 - rabatt[k]) for k, v in BV.items()}
andel = {k: v / sumBV for k, v in BV.items()}
gjeld = {k: G * andel[k] for k in BV}
fradr = {k: gjeld[k] * ((1 - rabatt[k]) if avkort[k] else 1) for k in BV}
netto = sum(FV.values()) - sum(fradr.values())
for k in BV:
    print(f"   {k:6} BV {BV[k]:>10,}  andel {andel[k]*100:6.2f} %  FV {FV[k]:>12,.0f}  gjeld {gjeld[k]:>12,.0f}  fradr {fradr[k]:>12,.0f}  netto {FV[k]-fradr[k]:>12,.0f}")
print(f"   sum FV {sum(FV.values()):,.0f}, fradragsberettiget {sum(fradr.values()):,.0f}, reduksjon {G-sum(fradr.values()):,.0f}, netto {netto:,.0f}")
uten_red = sum(FV.values()) - G
# gjeld fordelt etter formuesverdi (med avkorting av fondsdelen)
sumFV = sum(FV.values())
fradr_fv = sum(G * FV[k] / sumFV * ((1 - rabatt[k]) if avkort[k] else 1) for k in BV)
netto_fv = sumFV - fradr_fv
bolig_avkortet = sumFV - (gjeld["bolig"] * 0.25 + fradr["fond"] + fradr["bank"])
print(f"   uten reduksjon {uten_red:,.0f}; fordelt etter formuesverdi {netto_fv:,.2f}; boliggjeld avkortet {bolig_avkortet:,.0f}")
agg = G * (1 - BV["fond"] * 0.2 / sumBV)
print(f"   kontroll aggregat: {agg:,.0f}")
ledd(6, f"Kr {kr(netto)}", [f"Kr {kr(uten_red)}", f"Kr {kr(netto_fv)}", f"Kr {kr(bolig_avkortet)}"])
B, sats = 1_900_000, 0.01
fs = (netto - B) * sats
fs_uten_bunn = netto * sats
fs_uten_red = (uten_red - B) * sats
fs_uten_gjeld = (sumFV - B) * sats
print(f"   formuesskatt {fs:,.0f}; uten bunnfradrag {fs_uten_bunn:,.0f}; uten gjeldsreduksjon {fs_uten_red:,.0f}; gjeld ikke trukket fra {fs_uten_gjeld:,.0f}")
fs_markedsverdi = (sumBV - G - B) * sats
print(f"   markedsverdier uten rabatt og reduksjon {fs_markedsverdi:,.0f}")
ledd(7, f"Kr {kr(fs)}", [f"Kr {kr(fs_uten_bunn)}", f"Kr {kr(fs_markedsverdi)}", f"Kr {kr(fs_uten_gjeld)}"])

# ---------------------------------------------------------------- Oppgave 5
print("\nOppgave 5: formuesskatt som avkastningsskatt")
W, CF, tau, fv = 50.0, 3.0, 0.01, 0.80
r = CF / W
FS = W * fv * tau
r_etter = (CF - FS) / W
r_uten_rabatt = (CF - W * tau) / W
r_dobbel = (CF - 2 * FS) / W
print(f"   r {r*100:.2f} %, formuesskatt {FS:.3f} mill., r etter {r_etter*100:.2f} %, uten rabatt {r_uten_rabatt*100:.2f} %, dobbelt {r_dobbel*100:.2f} %")
ledd(8, pst(r_etter), [pst(r), pst(r_uten_rabatt), pst(r_dobbel)])
t_ekv = FS / CF
t_uten_rabatt = W * tau / CF
t_nevner_etter = FS / (CF - FS)
t_slutt = W * (1 + r) * fv * tau / CF
print(f"   t {t_ekv*100:.4f} %, uten rabatt {t_uten_rabatt*100:.4f} %, nevner etter skatt {t_nevner_etter*100:.4f} %, sluttformue {t_slutt*100:.4f} %")
print(f"   kontroll: τ(1−ρ)/r = {tau*fv/r*100:.4f} %")
ledd(9, pst(t_ekv), [pst(t_uten_rabatt), pst(t_nevner_etter), pst(t_slutt)])
CF2 = 1.2
tau_eff = tau * fv
V = CF2 / r
V_halv = (CF2 - tau_eff * V) / r                # strømmen justert, uskattet rente
V_bare_strom = CF2 / (r + tau_eff)             # alternativet ikke rammet
V_bare_rente = CF2 / (r - tau_eff)             # bare renten justert
print(f"   V {V:.4f}, halv justering {V_halv:.4f}, CF/(r+τ) {V_bare_strom:.4f}, CF/(r−τ) {V_bare_rente:.4f}")
# kontroll: løs (CF − τV)/V = r − τ  numerisk
Vk = CF2 / ((r - tau_eff) + tau_eff)
assert abs(Vk - V) < 1e-12
print(f"   kontroll: formuesskatt {tau_eff*V:.3f}, netto {CF2-tau_eff*V:.3f}, avkastning {(CF2-tau_eff*V)/V*100:.2f} %")
V_urammet_uten_rabatt = CF2 / (r + tau)       # alternativet urammet og rabatten glemt
print(f"   urammet og rabatt glemt {V_urammet_uten_rabatt:.4f}")
ledd(10, f"{kr(V, 2)} mill.", [f"{kr(V_urammet_uten_rabatt, 2)} mill.", f"{kr(V_bare_rente, 2)} mill.", f"{kr(V_bare_strom, 2)} mill."])

# ---------------------------------------------------------------- Oppgave 6
print("\nOppgave 6: utbytte som dekker formuesskatt og eierskatt")
FVpre = 20_000_000
FV6 = FVpre * 0.8
F6 = (FV6 - 1_900_000) * 0.01
D = F6 / (1 - te)
opp = F6 * (1 + te)
uten_oppj = F6 / (1 - 0.22)
uten_rab = (FVpre - 1_900_000) * 0.01 / (1 - te)
uten_bunn = FV6 * 0.01 / (1 - te)
print(f"   formuesskatt {F6:,.0f}, D {D:,.2f}, oppå {opp:,.2f}, uten oppj {uten_oppj:,.2f}, uten rabatt {uten_rab:,.2f}, uten bunnfradrag {uten_bunn:,.2f}")
print(f"   kontroll: D − D·te = {D - D*te:,.4f}")
print(f"   eierskatt hvis D = F: {F6*te:,.2f}")
ledd(11, f"Kr {kr(D)}", [f"Kr {kr(opp)}", f"Kr {kr(uten_oppj)}", f"Kr {kr(F6)}"])

# ---------------------------------------------------------------- Oppgave 7
print("\nOppgave 7: stykkskatt med lineære kurver")
a_d, b_d = 1_200, 40     # x = 1200 − 40P
c_s, d_s = -300, 60      # x = −300 + 60p
t = 5
P0 = (a_d - c_s) / (b_d + d_s)
x0 = a_d - b_d * P0
p1 = (a_d - b_d * t - c_s) / (b_d + d_s)
P1 = p1 + t
x1 = a_d - b_d * P1
dP = d_s / (d_s + b_d)
dp = -b_d / (d_s + b_d)
print(f"   uten skatt P={P0} x={x0}; med skatt p={p1} P={P1} x={x1}; dP/dt={dP} dp/dt={dp}")
assert abs(x1 - (c_s + d_s * p1)) < 1e-9
P_byttet = P0 + t * (b_d / (b_d + d_s))
ledd(12, f"kr {kr(P1)}", [f"kr {kr(p1)}", f"kr {kr(P_byttet)}", f"kr {kr(P0 + t)}"])
prod_andel = (P0 - p1) / t
kons_andel = (P1 - P0) / t
feil_DS = b_d / d_s
print(f"   produsentandel {prod_andel*100:.1f} %, konsumentandel {kons_andel*100:.1f} %, |D'|/S' {feil_DS*100:.2f} %")
ledd(13, "40 %", [f"{kr(kons_andel*100)} %", "100 %", f"{kr(feil_DS*100, 1)} %"])
proveny = t * x1
dwl = 0.5 * t * (x0 - x1)
print(f"   proveny {proveny}, dødvektstap {dwl}")
# c: vannrett tilbud ved p = 15
P_c = 15 + t
x_c = a_d - b_d * P_c
print(f"   c: P = {P_c}, x = {x_c}")
ledd(14, f"P = {kr(P_c)} og x = {kr(x_c)}", [f"P = {kr(P0)} og x = {kr(x0)}", f"P = {kr(P_c)} og x = {kr(x0)}", f"P = {kr(P1)} og x = {kr(x1)}"])

# ---------------------------------------------------------------- Oppgave 8
print("\nOppgave 8: førsteordensbetingelsen")
r8, t8, A8 = 0.05, 0.22, 0.6
krav = r8 * (1 - A8 * t8) / (1 - t8)
print(f"   F'(K) = {krav*100:.4f} %, r/(1−t) {r8/(1-t8)*100:.4f} %, rA/(1−t) {r8*A8/(1-t8)*100:.4f} %, r/((1−t)A) {r8/((1-t8)*A8)*100:.4f} %")
mid = (r8 + r8 / (1 - t8))
print(f"   kontroll lineær i A: r + (1−A)·[r/(1−t) − r] = {(r8 + (1-A8)*(r8/(1-t8)-r8))*100:.4f} %")
krav_byttet = r8 * (1 - (1 - A8) * t8) / (1 - t8)   # A og 1 − A byttet om
print(f"   A og 1−A byttet: {krav_byttet*100:.4f} %, midtpunkt mellom grensene {(r8 + r8/(1-t8))/2*100:.4f} %")
ledd(15, pst(krav), [pst(r8), pst(r8 / (1 - t8)), pst(krav_byttet)])

# ---------------------------------------------------------------- Oppgave 9
print("\nOppgave 9: Domar–Musgrave")
t9 = 0.30
A9 = 60_000
gB, lB = 300_000, 150_000
EB = 0.5 * gB - 0.5 * lB
A_etter = A9 * (1 - t9)
B_full = (1 - t9) * EB
B_uten = 0.5 * (1 - t9) * gB - 0.5 * lB
print(f"   E(B) {EB}, A etter {A_etter}, B full {B_full}, B uten {B_uten}")
print(f"   kontroll: E − tG = {EB - t9*0.5*gB}; grense G* = {(EB - A_etter)/t9}")

# ---------------------------------------------------------------- Oppgave 10
print("\nOppgave 10: utleie og treprosentregelen")
leie = 12_000 * 12
print(f"   leie {leie}, 20 000 som fribeløp {leie-20_000}, korttidsregel {(leie-10_000)*0.85:.0f}")
utb10 = 2_000_000
print(f"   treprosent {utb10*0.03*0.22:.0f}, 3 % som sats {utb10*0.03:.0f}, eierskatt {utb10*te:.0f}, 22 % {utb10*0.22:.0f}")

# ---------------------------------------------------------------- Oppgave 12
print("\nOppgave 12: Merton med humankapital")
ER, rf, sig, gam = 0.07, 0.025, 0.15, 3
w = (ER - rf) / (gam * sig**2)
print(f"   w {w*100:.4f} %, σ i stedet for σ² {(ER-rf)/(gam*sig)*100:.4f} %, E(R) i stedet for premie {ER/(gam*sig**2)*100:.4f} %, γ glemt {(ER-rf)/sig**2*100:.4f} %")
snudd = gam * sig**2 / (ER - rf)
ledd(21, pst(w, 1), [pst((ER - rf) / (gam * sig), 1), pst(ER / (gam * sig**2), 1), pst(snudd, 1)])
F, H = 2_400_000, 600_000
aksjebelop = w * (F + H)
alfa = aksjebelop / F
alfa_beta1 = (aksjebelop - H) / F
print(f"   aksjebeløp {aksjebelop:,.0f}, α {alfa*100:.4f} %, α med β=1 {alfa_beta1*100:.4f} %, w på F {w*100:.4f} %")
ledd(22, pst(alfa, 1), [pst(w, 1), pst(alfa_beta1, 1), "100 %"])
ledd(23, pst(alfa_beta1, 1), ["0 %", pst(alfa, 1), pst(w, 1)])
print(f"   kontroll b: totalportefølje {aksjebelop:,.0f} aksjer av {F+H:,.0f} = {aksjebelop/(F+H)*100:.2f} %")
print(f"   kontroll c: aksjeeksponering {aksjebelop-H + H:,.0f} av {F+H:,.0f} = {(aksjebelop)/(F+H)*100:.2f} %")

# ---------------------------------------------------------------- Oppgave 13
print("\nOppgave 13: forsikring med √W")
W13, L13, p13 = 4_000_000, 1_500_000, 0.02
EU_uten = (1 - p13) * math.sqrt(W13) + p13 * math.sqrt(W13 - L13)
EU_med = math.sqrt(W13 - 40_000)
CE = EU_uten**2
Pmax = W13 - CE
akt = p13 * L13
EW = W13 - akt
print(f"   E[U] uten {EU_uten:.4f}, med (40 000) {EU_med:.4f}, CE {CE:,.2f}, maks premie {Pmax:,.2f}, aktuarisk {akt:,.0f}, risikopremie {EW-CE:,.2f}")
print(f"   tap = hele formuen: E[U] {0.98*math.sqrt(W13):.4f}, maks premie {W13-(0.98*math.sqrt(W13))**2:,.0f}")
ledd(25, f"Kr {kr(Pmax)}", [f"Kr {kr(akt)}", f"Kr {kr(EW-CE)}", f"Kr {kr(W13-(0.98*math.sqrt(W13))**2)}"])
# c: halv dekning, premie 16 000
P_h = 16_000
god = math.sqrt(W13 - P_h)
skade = math.sqrt(W13 - L13 + 0.5 * L13 - P_h)
EU_halv = (1 - p13) * god + p13 * skade
EU_halv_glemt_premie = (1 - p13) * god + p13 * math.sqrt(W13 - L13 + 0.5 * L13)
EU_halv_glemt_erst = (1 - p13) * god + p13 * math.sqrt(W13 - L13 - P_h)
EW_halv = W13 - akt + p13 * 0.5 * L13 - P_h
CE_halv = EU_halv**2
print(f"   halv: god {god:.4f} skade {skade:.4f} E[U] {EU_halv:.4f} (uten {EU_uten:.4f}); CE {CE_halv:,.2f} mot {CE:,.2f}, gevinst {CE_halv-CE:,.2f}")
print(f"   halv, glemt premie i skade: {EU_halv_glemt_premie:.4f}; glemt erstatning: {EU_halv_glemt_erst:.4f}")
print(f"   forventet formue uten {EW:,.0f}, halv {EW_halv:,.0f}; aktuarisk halv {p13*0.5*L13:,.0f}")
# maks premie for halv dekning: løs (1−p)√(W−P) + p√(W−L/2−P) = EU_uten
lo, hi = 0.0, 100_000.0
for _ in range(200):
    mid = (lo + hi) / 2
    v = (1 - p13) * math.sqrt(W13 - mid) + p13 * math.sqrt(W13 - L13 + 0.5 * L13 - mid)
    lo, hi = (mid, hi) if v > EU_uten else (lo, mid)
print(f"   maks premie for halv dekning {lo:,.2f}")

# ---------------------------------------------------------------- Oppgave 14
print("\nOppgave 14: utsatt uttak")
Bh = 5_100_000
d67, d70 = 17.0, 14.6
p67, p70 = Bh / d67, Bh / d70
print(f"   67: {p67:,.2f}  70: {p70:,.2f}  økning {(p70/p67-1)*100:.4f} %  (17−14,6)/17 {(d67-d70)/d67*100:.4f} %  byttet {(d70/d67-1)*100:.4f} %")
print(f"   kontroll: d67/d70 − 1 = {(d67/d70-1)*100:.4f} %")

# ---------------------------------------------------------------- Oppgave 15
print("\nOppgave 15: kapitalmarkedslinjen")
rf15, EM, sM, sp = 0.02, 0.07, 0.16, 0.20
vekt = sp / sM
lan = vekt - 1
Ep = rf15 + vekt * (EM - rf15)
glemt_rente = vekt * EM
feil_nevner = (sp - sM) / sp
Ep_feil = rf15 + (1 + feil_nevner) * (EM - rf15)
print(f"   vekt {vekt}, lån {lan*100:.1f} %, E {Ep*100:.4f} %, glemt rentekostnad {glemt_rente*100:.4f} %, feil nevner lån {feil_nevner*100:.1f} % gir {Ep_feil*100:.4f} %")
print(f"   kontroll: rf + Sharpe·σp = {(rf15 + (EM-rf15)/sM*sp)*100:.4f} %; 1,25·7 % − 0,25·2 % = {(vekt*EM - lan*rf15)*100:.4f} %")

# ---------------------------------------------------------------- Oppgave 16
print("\nOppgave 16: disposisjonseffekten")
gevA, tapB = 100_000 - 75_000, 125_000 - 100_000
sA = gevA * te
fB = tapB * te
print(f"   skatt A {sA:,.2f}, fradrag B {fB:,.2f}, forskjell {sA+fB:,.2f}; kontroll {(gevA+tapB)*te:,.2f}; uten oppjustering {(gevA+tapB)*0.22:,.2f}")
print(f"   igjen: selg A {100_000-sA:,.0f}, selg B {100_000+fB:,.0f}")

# ---------------------------------------------------------------- Oppgave 17
print("\nOppgave 17: annuitetslån")
L17, r17, T17 = 2_400_000, 0.048, 20
A17 = L17 * r17 / (1 - (1 + r17) ** -T17)
rentesum = T17 * A17 - L17
serie = r17 * L17 * (T17 + 1) / 2
enkel = L17 * r17 * T17
print(f"   annuitet {A17:,.2f}, sum betalt {T17*A17:,.2f}, rentesum {rentesum:,.2f}, serielån {serie:,.0f}, avdragsfritt {enkel:,.0f}")
af = (1 - (1 + r17) ** -T17) / r17
print(f"   kontroll: annuitetsfaktor {af:.6f}, A × faktor {A17*af:,.2f}")
# restgjeld-kontroll
rg = L17
for _ in range(T17):
    rg = rg * (1 + r17) - A17
print(f"   restgjeld etter {T17} år: {rg:.6f}")
ledd(30, f"Kr {kr(rentesum)}", [f"Kr {kr(T17*A17)}", f"Kr {kr(serie)}", f"Kr {kr(enkel)}"])

# ---------------------------------------------------------------- Tall i de andre leddene
print("\nTallene i begreps- og valgleddene")
ledd(17, "B med fullt tapsfradrag, men A uten", ["B uten tapsfradrag", "A med fullt tapsfradrag og A uten", "A med fullt tapsfradrag, men B uten"])   # ledd 17: tallene står i løsningen
ledd(18, "Kr 0", [f"Kr {kr(leie)}", f"Kr {kr(leie - 20_000)}", f"Kr {kr((leie - 10_000) * 0.85)}"])
ledd(19, f"Kr {kr(utb10 * 0.03 * 0.22)}", ["Kr 0", f"Kr {kr(utb10 * 0.03)}", f"Kr {kr(utb10 * te)}"])
ledd(24, "Nei, fordi forventet nytte", ["Ja, fordi forventet nytte", "aldri bør kjøpe forsikring når premien er høyere enn forventet erstatning", "indifferent"])
ledd(26, "Ja, fordi forventet nytte", ["Nei, fordi forventet nytte", "forventet formue", "takket nei til full dekning"])
ledd(27, f"{kr((p70 / p67 - 1) * 100, 1)} % høyere", [f"{kr((d67 - d70) / d67 * 100, 1)} % høyere", f"{kr((d67 - d70) / d67 * 100, 1)} % lavere", "Uendret"])
ledd(28, f"125 % i markedsporteføljen. Forventet avkastning blir {kr(Ep * 100, 2)} %", [f"125 % i markedsporteføljen. Forventet avkastning blir {kr(glemt_rente * 100, 2)} %", f"enkeltaksjer med samlet standardavvik 20 %. Forventet avkastning blir {kr(glemt_rente * 100, 2)} %", f"{kr(Ep_feil * 100, 2)} %"])
ledd(29, f"Disposisjonseffekten. Salget av A gir kr {kr(sA + fB)}", [f"Overkonfidens. Salget av A gir kr {kr(sA)}", f"Disposisjonseffekten. Salget av A gir kr {kr(sA)}", f"Flokkatferd. Salget av A gir kr {kr(sA + fB)}"])

# ---------------------------------------------------------------- Kontroll mot JSON
PLAN = None
if len(sys.argv) > 1:
    sti = sys.argv[1]
    data = json.load(open(sti, encoding="utf-8"))
    import os
    plan_sti = os.path.join(os.path.dirname(sti), "fasitplan.json")
    PLAN = json.load(open(plan_sti, encoding="utf-8"))["p1"]
    alle = []
    for ex in data["exercises"]:
        if "parts" in ex:
            alle.extend(ex["parts"])
        else:
            alle.append(ex)
    print(f"\nKontroll mot {sti}: {len(alle)} ledd")
    feil = 0
    assert len(alle) == 30, len(alle)
    for i, p in enumerate(alle, 1):
        if p["answer"] != PLAN[i - 1]:
            print(f"  FEIL ledd {i}: answer {p['answer']} mot plan {PLAN[i-1]}"); feil += 1
        if len(p["options"]) != 4:
            print(f"  FEIL ledd {i}: {len(p['options'])} alternativer"); feil += 1
    def ren(s):
        return re.sub(r"<[^>]+>", "", s).replace("&nbsp;", " ")
    for nr, riktig, gale in LEDD:
        p = alle[nr - 1]
        opts = [ren(o) for o in p["options"]]
        if riktig not in opts[p["answer"]]:
            print(f"  FEIL ledd {nr}: riktig {riktig!r} finnes ikke i {opts[p['answer']]!r}"); feil += 1
        andre = [o for j, o in enumerate(opts) if j != p["answer"]]
        for g in gale:
            if not any(g in o for o in andre):
                print(f"  FEIL ledd {nr}: galt alternativ {g!r} mangler i {andre}"); feil += 1
    # lekkasje: hvor ofte er riktig alternativ det lengste?
    def strikt_lengst(p):
        L = [len(ren(o)) for o in p["options"]]
        return L[p["answer"]] == max(L) and L.count(max(L)) == 1
    lengst = sum(1 for p in alle if strikt_lengst(p))
    print(f"  riktig alternativ er strengt lengst i {lengst} av 30 ledd")
    fordeling = [sum(1 for p in alle if p["answer"] == k) for k in range(4)]
    print(f"  riktig svar per posisjon 0-3: {fordeling}")
    tekst = json.dumps(data, ensure_ascii=False)
    for m in ["—", ", og ", ", and "]:
        n = tekst.count(m)
        if n:
            print(f"  FEIL: {m!r} forekommer {n} ganger"); feil += 1
    for m in re.finditer(r".{30}–.{30}", tekst):
        print(f"  merk: tankestrek/intervall «{m.group(0)}»")
    poeng = sum(e["points"] for e in data["exercises"])
    print(f"  poeng {poeng}, oppgaver {len(data['exercises'])}")
    print("  OK" if feil == 0 else f"  {feil} feil")
