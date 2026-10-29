"""Prøveeksamen 1 (FIE432): alle tall regnet på nytt, og settet bygd herfra.

Kjør:  python3 -I prove1_regn.py

Skriptet regner hvert tall i spørsmål, riktig svar og gale alternativer og
skriver dem ut ledd for ledd. Deretter sjekker det settet (SETT nederst) mot
tallene: hvert alternativ skal inneholde tallet skriptet har regnet, riktig
svar skal stå der fasitplanen sier, og teksten skal følge skrivereglene (ingen
tankestrek, ingen komma foran «og»). Er alt rent, skrives prove1.json i samme
mappe. Er noe galt, skrives ingenting.
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
print("\nOppgave 2: gevinst med ubenyttet skjerming (kalibrert: ett år framført)")
kost, salg = 80_000, 85_000
ub1 = kost * 0.03                      # år 1, ikke utbytte
gev = salg - kost - ub1                # år 2 solgt i oktober: ingen ny skjerming
te = 1.72 * 0.22
skatt = gev * te
uten_oppj = gev * 0.22
salgsaar_skj = (kost + ub1) * 0.04     # fella: skjerming også for salgsåret
salgsaar = max(0.0, gev - salgsaar_skj) * te
uten_skj = (salg - kost) * te
print(f"   ubenyttet {ub1:.2f}, gevinst {gev:.2f}, skatt {skatt:.4f}; glemt oppjustering {uten_oppj:.2f}; "
      f"skjerming i salgsåret {salgsaar_skj:.2f} gir gevinst {gev - salgsaar_skj:.2f} og skatt {salgsaar:.2f}; skjerming glemt {uten_skj:.2f}")
ledd(3, f"Kr {kr(skatt, 2)}", [f"Kr {kr(uten_oppj, 2)}", f"Kr {kr(salgsaar, 2)}", f"Kr {kr(uten_skj, 2)}"])
print(f"   kontroll: 2 600 × 1,72 = {gev*1.72:.2f}, × 22 % = {gev*1.72*0.22:.4f}")

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
# Ledd 10 er et begrepsledd etter kalibreringen. Tallene over står i løsningen.
ledd(10, "Den samme som uten formuesskatt", ["trekkes fra kontantstrømmen mens kravet står fast", "kravet faller mens kontantstrømmen står fast", "kreve en avkastning som også dekker skatten"])

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
# Ledd 13 er et begrepsledd etter kalibreringen: konsumentandel 60 %, produsentandel 40 %.
assert abs(kons_andel - 0.6) < 1e-12 and abs(prod_andel - 0.4) < 1e-12
ledd(13, "Konsumentene bærer mest", ["Produsentene bærer hele skatten", "Produsentene bærer mest", "Konsumentene bærer hele skatten"])
proveny = t * x1
dwl = 0.5 * t * (x0 - x1)
print(f"   proveny {proveny}, dødvektstap {dwl}")
# c: vannrett tilbud ved p = 15
P_c = 15 + t
x_c = a_d - b_d * P_c
print(f"   c: P = {P_c}, x = {x_c}")
# Fjerde alternativ: riktig kvantum, men produsentprisen p oppgitt som P.
ledd(14, f"P = {kr(P_c)} og x = {kr(x_c)}", [f"P = {kr(P0)} og x = {kr(x0)}", f"P = {kr(P_c)} og x = {kr(x0)}", f"P = {kr(P_c - t)} og x = {kr(x_c)}"])

# ---------------------------------------------------------------- Oppgave 8
print("\nOppgave 8: førsteordensbetingelsen")
r8, t8, A8 = 0.05, 0.22, 0.6
krav = r8 * (1 - A8 * t8) / (1 - t8)
print(f"   F'(K) = {krav*100:.4f} %, r/(1−t) {r8/(1-t8)*100:.4f} %, rA/(1−t) {r8*A8/(1-t8)*100:.4f} %, r/((1−t)A) {r8/((1-t8)*A8)*100:.4f} %")
mid = (r8 + r8 / (1 - t8))
print(f"   kontroll lineær i A: r + (1−A)·[r/(1−t) − r] = {(r8 + (1-A8)*(r8/(1-t8)-r8))*100:.4f} %")
krav_byttet = r8 * (1 - (1 - A8) * t8) / (1 - t8)   # A og 1 − A byttet om
print(f"   A og 1−A byttet: {krav_byttet*100:.4f} %, midtpunkt mellom grensene {(r8 + r8/(1-t8))/2*100:.4f} %")
# Ledd 15 er et begrepsledd etter kalibreringen. Tallene over står i løsningen.
assert r8 < krav < r8 / (1 - t8)
ledd(15, "mellom r og r/(1 − t). Bedriften investerer mindre", ["er r. Bedriften investerer like mye", "lavere enn r. Bedriften investerer mer", "lik r/(1 − t). Bedriften investerer mindre"])

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
# Ledd 23 er et begrepsledd etter kalibreringen: 58,3 % mot 83,3 % i ledd 22.
assert alfa_beta1 < alfa and alfa_beta1 > 0
ledd(23, "Lavere andel enn i b", ["0 %, fordi lønnen dekker hele", "Høyere andel enn i b", "Samme andel som i b"])
assert H < aksjebelop  # lønnen dekker ikke hele ønsket aksjeeksponering, så «0 %» er galt
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
print(f"   egen bruk etter utleieverdi {180_000/(180_000+leie)*100:.1f} %")
ledd(18, "Leien er skattefri", ["målt i areal", "kr 20 000", "85 %"])
ledd(19, f"Kr {kr(utb10 * 0.03 * 0.22)}", ["Kr 0", f"Kr {kr(utb10 * 0.03)}", f"Kr {kr(utb10 * te)}"])
ledd(24, "Nei, fordi forventet nytte", ["Ja, fordi forventet nytte", "aldri bør kjøpe forsikring når premien er høyere enn forventet erstatning", "indifferent"])
ledd(26, "Ja, fordi forventet nytte", ["Nei, fordi forventet nytte", "forventet formue", "takket nei til full dekning"])
ledd(27, f"{kr((p70 / p67 - 1) * 100, 1)} % høyere", [f"{kr((d67 - d70) / d67 * 100, 1)} % høyere", f"{kr((d67 - d70) / d67 * 100, 1)} % lavere", "Uendret"])
ledd(28, f"125 % i markedsporteføljen. Forventet avkastning blir {kr(Ep * 100, 2)} %", [f"125 % i markedsporteføljen. Forventet avkastning blir {kr(glemt_rente * 100, 2)} %", f"enkeltaksjer med samlet standardavvik 20 %. Forventet avkastning blir {kr(glemt_rente * 100, 2)} %", f"{kr(Ep_feil * 100, 2)} %"])
ledd(29, f"Disposisjonseffekten. Salget av A gir kr {kr(sA + fB)}", [f"Overkonfidens. Salget av A gir kr {kr(sA)}", f"Disposisjonseffekten. Salget av A gir kr {kr(sA)}", f"Flokkatferd. Salget av A gir kr {kr(sA + fB)}"])

# ---------------------------------------------------------------- Settet
# Teksten i settet. Tallene i alternativene sjekkes mot utregningene over.
SETT = json.loads(r"""{
 "id": "prove1",
 "kind": "mock",
 "label": "Prøveeksamen 1",
 "minutes": 240,
 "points": 90,
 "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
 "note": "Ligner H2025 mest: korte oppgaver med felles innledning, to tredeler skatt og en tredel finans. Vekten ligger på kjeden skjerming, oppjustering og effektiv sats, formuesskatt både som gjeldsfordeling og som avkastningsskatt, stykkskatt med tall, Merton med humankapital og forsikring med √W. Alle satser står i oppgaveteksten.",
 "facts": [
  "Fire timer, kalkulator tillatt. 30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
  "3 poeng for rett svar, −1 for feil svar og 0 for ubesvart. Totalt 90 poeng.",
  "Oppgave 1–11 er skattedelen (20 ledd). Oppgave 12–17 er finansdelen (10 ledd).",
  "Laget for trening etter mønster fra eksamenene 2022–2025 og manualen. Det er ikke en ekte eksamen. Kurset har ikke kontrollert løsningene."
 ],
 "practiceNote": "Regn ferdig før du ser på alternativene. Hvert galt alternativ er en bestemt feil: glemt skjerming, glemt oppjustering, feil nevner, feil tidspunkt eller svaret på nabospørsmålet. Kan du stryke ett alternativ, lønner det seg å svare.",
 "mc": {
  "wrongFactor": -0.3333333333333333
 },
 "exercises": [
  {
   "n": 1,
   "title": "Skjerming over tre år med ubenyttet skjerming",
   "points": 6,
   "topic": "Skjerming",
   "chapters": [
    5
   ],
   "body": "<p>Lise kjøpte 10. januar år 1 én aksje i Fjordlaks ASA for kr 20 000. Hun eier aksjen ved utgangen av alle de tre årene. Utbyttet og skjermingsrenten er oppgitt per år:</p><table class=\"data\"><tr><th>År</th><th>Utbytte</th><th>Skjermingsrente</th></tr><tr><td>1</td><td class=\"n\">kr 300</td><td class=\"n\">2 %</td></tr><tr><td>2</td><td class=\"n\">kr 500</td><td class=\"n\">3 %</td></tr><tr><td>3</td><td class=\"n\">kr 1 500</td><td class=\"n\">4 %</td></tr></table><p>Med skattepliktig utbytte menes beløpet før oppjustering.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Hvor stor ubenyttet skjerming tar Lise med seg fra år 2 til år 3?</p>",
     "options": [
      "Kr 200",
      "Kr 103",
      "Kr 100",
      "Kr 203"
     ],
     "answer": 3,
     "solution": "<p><b>Regelen.</b> Skjermingsgrunnlaget er kostpris pluss ubenyttet skjerming fra året før. Årets fradrag er grunnlaget ganget med årets skjermingsrente. Ubenyttet skjerming fra i fjor brukes to ganger: den løfter grunnlaget og trekkes fra utbyttet i tillegg til årets fradrag. Det som ikke blir brukt, framføres til neste år.</p><p><b>Regnestykket.</b></p><p>1. År 1: grunnlag 20 000, fradrag 20 000 × 2 % = 400. Utbyttet er 300, så skattepliktig utbytte er 0 og 400 − 300 = 100 framføres.<br>2. År 2: grunnlag 20 000 + 100 = 20 100. Årets fradrag 20 100 × 3 % = 603.<br>3. Samlet fradrag i år 2: 603 + 100 = 703. Utbyttet er 500, så skattepliktig utbytte er 0.<br>4. Ubenyttet skjerming ut av år 2: 703 − 500 = <b>kr 203</b>.</p><table class=\"data\"><tr><th>År</th><th>Grunnlag</th><th>Årets fradrag</th><th>Framført inn</th><th>Samlet fradrag</th><th>Utbytte</th><th>Framført ut</th></tr><tr><td>1</td><td class=\"n\">20 000</td><td class=\"n\">400</td><td class=\"n\">0</td><td class=\"n\">400</td><td class=\"n\">300</td><td class=\"n\">100</td></tr><tr><td>2</td><td class=\"n\">20 100</td><td class=\"n\">603</td><td class=\"n\">100</td><td class=\"n\">703</td><td class=\"n\">500</td><td class=\"n\"><b>203</b></td></tr></table><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 200</b> = 20 000 × 3 % + 100 − 500. Den framførte skjermingen er trukket fra, men ikke lagt til grunnlaget. Rentetillegget 100 × 3 % = 3 mangler.<br><b>Kr 103</b> = 603 − 500. Den framførte skjermingen er lagt til grunnlaget, men ikke tatt med i samlet fradrag.<br><b>Kr 100</b> = 20 000 × 3 % − 500. Resten fra år 1 er glemt helt: den er verken lagt til grunnlaget eller trukket fra.</p><p><b>Kontroll.</b> Framført skjerming forrenter seg: 100 × 1,03 = 103. Kostprisen gir 20 000 × 3 % = 600. Til sammen 703, minus utbyttet 500 gir 203. ✓</p><p><b>Strategi med minuspoeng.</b> Resten må være minst 200. Resten på 100 fra år 1 forsvinner ikke. I tillegg er årets fradrag på kostprisen alene (600) 100 mer enn utbyttet. Kr 100 og kr 103 kan derfor strykes. Med to igjen gir det +1 i forventning å svare.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Hva er skattepliktig utbytte for Lise i år 3? Svar med to desimaler.</p>",
     "options": [
      "Kr 497,00",
      "Kr 1 011,12",
      "Kr 488,88",
      "Kr 691,88"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> Skattepliktig utbytte = utbytte − årets skjermingsfradrag − ubenyttet skjerming fra i fjor, aldri under null. Årets fradrag regnes av grunnlaget, som er kostpris pluss den framførte skjermingen.</p><p><b>Regnestykket.</b></p><p>1. Framført fra år 2: 203 (forrige ledd).<br>2. Grunnlag i år 3: 20 000 + 203 = 20 203.<br>3. Årets fradrag: 20 203 × 4 % = 808,12.<br>4. Samlet fradrag: 808,12 + 203 = 1 011,12.<br>5. Skattepliktig utbytte: 1 500 − 1 011,12 = <b>kr 488,88</b>.</p><table class=\"data\"><tr><th>År</th><th>Grunnlag</th><th>Årets fradrag</th><th>Framført inn</th><th>Samlet fradrag</th><th>Utbytte</th><th>Skattepliktig</th><th>Framført ut</th></tr><tr><td>1</td><td class=\"n\">20 000</td><td class=\"n\">400</td><td class=\"n\">0</td><td class=\"n\">400</td><td class=\"n\">300</td><td class=\"n\">0</td><td class=\"n\">100</td></tr><tr><td>2</td><td class=\"n\">20 100</td><td class=\"n\">603</td><td class=\"n\">100</td><td class=\"n\">703</td><td class=\"n\">500</td><td class=\"n\">0</td><td class=\"n\">203</td></tr><tr><td>3</td><td class=\"n\">20 203</td><td class=\"n\">808,12</td><td class=\"n\">203</td><td class=\"n\">1 011,12</td><td class=\"n\">1 500</td><td class=\"n\"><b>488,88</b></td><td class=\"n\">0</td></tr></table><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 497,00</b> = 1 500 − 203 − 20 000 × 4 %. Årets fradrag er regnet av kostprisen i stedet for av grunnlaget 20 203. Det er den vanligste feilen i temaet (samme felle som i H2025 oppgave 4).<br><b>Kr 1 011,12</b> = samlet skjermingsfradrag i år 3. Et mellomtall, ikke svaret.<br><b>Kr 691,88</b> = 1 500 − 808,12. Den framførte skjermingen er lagt til grunnlaget, men ikke trukket fra utbyttet.</p><p><b>Kontroll.</b> Utbyttene er 300 + 500 + 1 500 = 2 300. Brukt skjerming er 300 + 500 + 1 011,12 = 1 811,12. Dermed er 2 300 − 1 811,12 = 488,88. ✓ All opptjent skjerming, 400 + 603 + 808,12 = 1 811,12, er brukt opp.</p><p><b>Merk.</b> Skatten ville vært 488,88 × 37,84 % = 184,99. Spørsmålet ber om grunnlaget, ikke skatten.</p>"
    }
   ]
  },
  {
   "n": 2,
   "title": "Aksjesalg med ubenyttet skjerming",
   "points": 3,
   "topic": "Aksjonærmodellen",
   "chapters": [
    5
   ],
   "body": "<p>Jonas kjøpte i mars år 1 en aksje i Nordkapp Data ASA for kr 80 000. Aksjen ga ikke utbytte i år 1. Skjermingsrenten for år 1 var 3 %. I oktober år 2 selger han aksjen for kr 85 000. Skjermingsrenten for år 2 blir 4 %. Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p><p>Hva er skatten på gevinsten? Svar med to desimaler.</p>",
   "options": [
    "Kr 983,84",
    "Kr 572,00",
    "Kr 0,00",
    "Kr 1 892,00"
   ],
   "answer": 0,
   "solution": "<p><b>Regelen.</b> Skattepliktig gevinst = salgspris − kostpris − ubenyttet skjerming. Skjermingen tilordnes den som eier aksjen 31. desember. Selges aksjen før årsskiftet, gis det derfor ikke noe nytt fradrag i salgsåret. Gevinsten oppjusteres én gang: skatt = gevinst × 1,72 × 22 % = gevinst × 37,84 %.</p><p><b>Regnestykket.</b></p><p>1. Ubenyttet skjerming fra år 1: 80 000 × 3 % = 2 400.<br>2. Gevinst: 85 000 − 80 000 − 2 400 = 2 600. Ingen skjerming for år 2, siden aksjen er solgt i oktober.<br>3. Skatt: 2 600 × 1,72 × 22 % = <b>kr 983,84</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 572,00</b> = 2 600 × 22 %. Oppjusteringen er glemt. Tallet er 58 % av det riktige. Paret står nesten alltid blant alternativene.<br><b>Kr 0,00</b>: skjerming også for salgsåret, (80 000 + 2 400) × 4 % = 3 296, er trukket fra. Da forsvinner hele gevinsten. Renten for år 2 står i teksten for å friste, men Jonas eier ikke aksjen ved årsskiftet (samme felle som i H2022 oppgave 1, spørsmål 6).<br><b>Kr 1 892,00</b> = 5 000 × 37,84 %. Den ubenyttede skjermingen er glemt.</p><p><b>Kontroll.</b> Regn med effektiv sats: 1,72 × 22 % = 37,84 %. Da er 2 600 × 37,84 % = 983,84. ✓</p><p><b>Strategi med minuspoeng.</b> Se etter oppjusteringsparet: 572,00 er 22/37,84 av 983,84. Det laveste tallet i paret er «glemt oppjustering» og kan strykes. Da står tre igjen. Det lønner seg å svare.</p>"
  },
  {
   "n": 3,
   "title": "Effektiv skattesats på selskap og eier",
   "points": 6,
   "topic": "Effektiv skattesats",
   "chapters": [
    1,
    5
   ],
   "body": "<p>Hanne eier alle aksjene i Vestkyst Verktøy AS hele tiden. Kostprisen er kr 2 000 000. Hun har ingen ubenyttet skjerming fra før. Selskapsskatten er 22 %, eierskatten 22 % og oppjusteringsfaktoren 1,72.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>År 1 har selskapet driftsinntekter på kr 600 000 og ingen kostnader. Alt som er igjen etter selskapsskatt, deles ut. Skjermingsrenten er 4 %. Hva er samlet effektiv skattesats, altså selskapsskatt pluss eierskatt delt på driftsinntektene? Svar med to desimaler.</p>",
     "options": [
      "46,47 %",
      "24,47 %",
      "31,37 %",
      "36,23 %"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Overskuddet beskattes to ganger: med 22 % i selskapet og deretter med eierskatt på utbyttet minus skjermingsfradraget, oppjustert med 1,72. Samlet effektiv sats er summen av de to skattene delt på driftsinntektene, som i år 1 er lik overskuddet før skatt.</p><p><b>Regnestykket.</b></p><p>1. Selskapsskatt: 600 000 × 22 % = 132 000.<br>2. Utbytte: 600 000 − 132 000 = 468 000.<br>3. Skjermingsfradrag: 2 000 000 × 4 % = 80 000.<br>4. Skattepliktig utbytte: 468 000 − 80 000 = 388 000.<br>5. Eierskatt: 388 000 × 1,72 × 22 % = 146 819,20.<br>6. Samlet sats: (132 000 + 146 819,20)/600 000 = <b>46,47 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>24,47 %</b> = 146 819,20/600 000. Bare eierskatten er tatt med. Selskapsskatten på 132 000 mangler i telleren.<br><b>31,37 %</b> = 146 819,20/468 000. Bare eierskatten, delt på utbyttet. Det er effektiv skatt på utbyttet (som H2022 oppgave 1, spørsmål 4), ikke samlet sats på driftsinntektene.<br><b>36,23 %</b> = (132 000 + 388 000 × 22 %)/600 000. Oppjusteringen er glemt.</p><p><b>Kontroll.</b> Med satsformelen: 22 % + (388 000/600 000) × 37,84 % = 22 % + 24,47 % = 46,47 %. ✓ Svaret må ligge mellom 22 % (skjermingen dekker hele utbyttet) og 51,52 % (ingen skjerming).</p><p><b>Strategi med minuspoeng.</b> Svaret ligger mellom 22 % og 51,52 %. Det ligger nær toppen når skjermingen er liten i forhold til utbyttet (her 80 000 av 468 000). Det peker mot 46,47 % før du har regnet ferdig.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>År 2 er driftsinntektene igjen kr 600 000. Eneste kostnad er avskrivning på en maskin til kr 540 000: kr 180 000 per år i tre år. Hva er selskapets effektive skattesats i år 2 med samme nevner som i a? Svar med én desimal.</p>",
     "options": [
      "15,4 %",
      "22,0 %",
      "6,6 %",
      "2,2 %"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Effektiv skattesats = betalt skatt/driftsinntekter (bruttoinntekt), samme nevner som i a. Nevneren er brutto, ikke overskuddet etter avskrivning. Et fradrag som avskrivning trekker da den effektive satsen under den nominelle.</p><p><b>Regnestykket.</b></p><p>1. Skattepliktig overskudd: 600 000 − 180 000 = 420 000.<br>2. Betalt skatt: 420 000 × 22 % = 92 400.<br>3. Effektiv sats: 92 400/600 000 = <b>15,4 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>22,0 %</b> = 92 400/420 000. Skatten er delt på overskuddet etter avskrivning (skattepliktig inntekt) i stedet for på driftsinntektene som i a. Da får du alltid den nominelle satsen tilbake. Målet sier da ingenting.<br><b>6,6 %</b> = 22 % × 180 000/600 000. Det er hvor mye avskrivningen senker satsen, ikke selve satsen: 22 % − 6,6 % = 15,4 %.<br><b>2,2 %</b> = (600 000 − 540 000) × 22 %/600 000. Hele maskinen er ført til fradrag i år 2, men avskrivningen er 180 000 per år.</p><p><b>Kontroll.</b> Som formel: 22 % × (1 − 180 000/600 000) = 22 % × 0,7 = 15,4 %. ✓ Avskrivningen tar 30 % av grunnlaget og dermed 30 % av satsen.</p>"
    }
   ]
  },
  {
   "n": 4,
   "title": "Nettoformue og formuesskatt med forholdsmessig gjeldsfordeling",
   "points": 6,
   "topic": "Formuesskatt",
   "chapters": [
    7
   ],
   "body": "<p>Ingrid er enslig og har denne formuen per 1. januar:</p><table class=\"data\"><tr><th>Eiendel</th><th>Markedsverdi</th><th>Verdsettes til</th></tr><tr><td>Primærbolig</td><td class=\"n\">8 000 000</td><td class=\"n\">25 %</td></tr><tr><td>Aksjefond (100 % aksjer)</td><td class=\"n\">6 000 000</td><td class=\"n\">80 %</td></tr><tr><td>Bankinnskudd</td><td class=\"n\">2 000 000</td><td class=\"n\">100 %</td></tr></table><p>Gjelden på kr 4 800 000 fordeles etter markedsverdi. Bare gjelden som henføres til aksjefondet, reduseres med fondets rabatt på 20 %.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Hva er Ingrids skattepliktige nettoformue?</p>",
     "options": [
      "Kr 4 000 000",
      "Kr 4 360 000",
      "Kr 4 523 636",
      "Kr 6 160 000"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> Gjelden fordeles etter eiendelenes markedsverdi (bruttoverdi), ikke etter formuesverdien. Den delen som havner på et aktivum med rabatt som utløser reduksjon (her aksjefondet), avkortes med samme rabatt. Primærbolig er unntatt. Negative kolonner motregnes mot positive.</p><p><b>Regnestykket.</b></p><table class=\"data\"><tr><th></th><th>Primærbolig</th><th>Aksjefond</th><th>Bank</th><th>Sum</th></tr><tr><td>Markedsverdi</td><td class=\"n\">8 000 000</td><td class=\"n\">6 000 000</td><td class=\"n\">2 000 000</td><td class=\"n\">16 000 000</td></tr><tr><td>Andel</td><td class=\"n\">50 %</td><td class=\"n\">37,5 %</td><td class=\"n\">12,5 %</td><td class=\"n\">100 %</td></tr><tr><td>Formuesverdi</td><td class=\"n\">2 000 000</td><td class=\"n\">4 800 000</td><td class=\"n\">2 000 000</td><td class=\"n\">8 800 000</td></tr><tr><td>Gjeld henført</td><td class=\"n\">2 400 000</td><td class=\"n\">1 800 000</td><td class=\"n\">600 000</td><td class=\"n\">4 800 000</td></tr><tr><td>Fradragsberettiget gjeld</td><td class=\"n\">2 400 000</td><td class=\"n\">1 440 000</td><td class=\"n\">600 000</td><td class=\"n\">4 440 000</td></tr><tr><td>Netto</td><td class=\"n\">−400 000</td><td class=\"n\">3 360 000</td><td class=\"n\">1 400 000</td><td class=\"n\"><b>4 360 000</b></td></tr></table><p>1. Andelene: 8/16 = 50 %, 6/16 = 37,5 %, 2/16 = 12,5 %.<br>2. Gjeld på fondet: 4 800 000 × 37,5 % = 1 800 000, avkortet med 20 % til 1 440 000. Reduksjonen er 360 000.<br>3. Formuesverdier: 2 000 000 + 4 800 000 + 2 000 000 = 8 800 000.<br>4. Nettoformue: 8 800 000 − 4 440 000 = <b>kr 4 360 000</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 4 000 000</b> = 8 800 000 − 4 800 000. Gjeldsreduksjonen er hoppet over. Oppgaven sier uttrykkelig at den skal brukes (i H2025 oppgave 2 sa den det ikke, så der ble begge svar godtatt).<br><b>Kr 4 523 636</b>: gjelden er fordelt etter formuesverdiene i stedet for markedsverdiene. Da havner 4,8/8,8 = 54,5 % av gjelden på fondet. Reduksjonen blir 523 636.<br><b>Kr 6 160 000</b>: også boliggjelden er avkortet, med 75 %. Fradraget for boliggjelden blir 600 000 i stedet for 2 400 000.</p><p><b>Kontroll.</b> Aggregatformelen: 4 800 000 × (1 − 6 000 000 × 20 %/16 000 000) = 4 800 000 × 0,925 = 4 440 000. ✓ Kolonnene summerer: −400 000 + 3 360 000 + 1 400 000 = 4 360 000. ✓</p><p><b>Strategi med minuspoeng.</b> Bare fondsgjelden på 1 800 000 kan avkortes, så reduksjonen er høyst 20 % × 1 800 000 = 360 000. Nettoformuen må derfor ligge mellom 4 000 000 og 4 360 000. 4 523 636 og 6 160 000 ligger utenfor og kan strykes før du har regnet ferdig.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Hva blir formuesskatten med bunnfradrag kr 1 900 000 og sats 1,0 %?</p>",
     "options": [
      "Kr 43 600",
      "Kr 24 600",
      "Kr 93 000",
      "Kr 69 000"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> Formuesskatt = sats × (nettoformue − bunnfradrag). Bunnfradraget trekkes fra nettoformuen etter at gjelden er fordelt og avkortet.</p><p><b>Regnestykket.</b></p><p>1. Nettoformue fra a: 4 360 000.<br>2. Over bunnfradraget: 4 360 000 − 1 900 000 = 2 460 000.<br>3. Formuesskatt: 2 460 000 × 1,0 % = <b>kr 24 600</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 43 600</b> = 4 360 000 × 1 %. Bunnfradraget er glemt.<br><b>Kr 93 000</b> = (16 000 000 − 4 800 000 − 1 900 000) × 1 %. Regnet med markedsverdier: ingen verdsettingsrabatter og dermed heller ingen gjeldsreduksjon.<br><b>Kr 69 000</b> = (8 800 000 − 1 900 000) × 1 %. Gjelden er ikke trukket fra i det hele tatt.</p><p><b>Kontroll.</b> Uten gjeldsreduksjon ville skatten vært (4 000 000 − 1 900 000) × 1 % = 21 000. Reduksjonen på 360 000 koster 3 600 i skatt: 21 000 + 3 600 = 24 600. ✓</p>"
    }
   ]
  },
  {
   "n": 5,
   "title": "Formuesskatt som avkastningsskatt og verdsetting",
   "points": 9,
   "topic": "Formuesskatt som avkastningsskatt",
   "chapters": [
    8
   ],
   "body": "<p>Kapitalmarkedet er effisient: investeringer i samme risikoklasse gir samme avkastning. Mona kjøper aksjer for kr 50 mill. ved periodens begynnelse, får en kontantstrøm på kr 3 mill. ved slutten og selger da for kr 50 mill. Formuesskatten er 1,0 % av formuesverdien ved periodens begynnelse. Aksjer verdsettes til 80 %. Se bort fra bunnfradrag og annen skatt.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Hva er avkastningen på investeringen etter formuesskatt? Svar med to desimaler.</p>",
     "options": [
      "6,00 %",
      "5,00 %",
      "5,20 %",
      "4,40 %"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> Avkastning etter formuesskatt = (kontantstrøm − formuesskatt)/investert beløp. Formuesskatten regnes av formuesverdien, altså markedsverdien etter rabatt.</p><p><b>Regnestykket.</b></p><p>1. Avkastning før skatt: 3/50 = 6 %. Kjøps- og salgspris er like, så det er ingen kursgevinst.<br>2. Formuesverdi: 50 × 80 % = 40 mill. Formuesskatt: 40 × 1 % = 0,4 mill.<br>3. Etter formuesskatt: (3 − 0,4)/50 = <b>5,20 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>6,00 %</b> = avkastningen før formuesskatt.<br><b>5,00 %</b> = (3 − 0,5)/50. Rabatten er glemt. Formuesskatten er regnet av full markedsverdi.<br><b>4,40 %</b> = (3 − 0,8)/50. Formuesskatten er trukket fra to ganger.</p><p><b>Kontroll.</b> Med formel: r − τ(1 − ρ) = 6 % − 1 % × 0,8 = 5,2 %. ✓ Med aksjerabatt trekker formuesskatten 0,8 prosentpoeng fra avkastningen, ikke 1,0.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Hvor høy måtte en skatt t på avkastningen (kr 3 mill.) vært for å gi staten samme proveny som formuesskatten? Svar med to desimaler.</p>",
     "options": [
      "16,67 %",
      "15,38 %",
      "13,33 %",
      "14,13 %"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> Sett provenyene like. Formuesskatten faller på formuesverdien ved periodens begynnelse, så den er et fast beløp: τ × (1 − ρ) × W. En skatt på avkastningen gir t × r × W. Da blir t = τ(1 − ρ)/r.</p><p><b>Regnestykket.</b></p><p>1. Formuesskatten: 0,4 mill. (fra a).<br>2. Skatt på avkastningen: t × 3 mill.<br>3. t × 3 = 0,4 gir t = <b>13,33 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>16,67 %</b> = 1 %/6 %. Rabatten er glemt. H2025 oppgave 9 hadde ingen rabatt. Der var svaret τ/r.<br><b>15,38 %</b> = 0,4/2,6. Delt på avkastningen etter formuesskatt. Avkastningsskatten skal erstatte formuesskatten, så grunnlaget er avkastningen før skatt.<br><b>14,13 %</b> = 50 × 1,06 × 0,8 × 1 %/3. Formuesskatten er regnet av formuen ved periodens slutt, W(1 + r). Teksten sier at den faller ved periodens begynnelse.</p><p><b>Kontroll.</b> 3 × 13,33 % = 0,4 mill. ✓ Med formel: 0,8 %/6 % = 13,33 %. ✓</p>"
    },
    {
     "label": "c",
     "points": 3,
     "body": "<p>Mona vurderer en annen investering i samme risikoklasse, med en evigvarende årlig kontantstrøm. Både den og alternativet hennes rammes av den samme formuesskatten. Hvordan verdsetter Mona investeringen, sammenlignet med en investor uten formuesskatt?</p>",
     "options": [
      "Lavere enn uten formuesskatt, fordi skatten trekkes fra kontantstrømmen mens kravet står fast",
      "Høyere enn uten formuesskatt, fordi kravet faller mens kontantstrømmen står fast",
      "Den samme som uten formuesskatt, fordi strømmen og kravet faller like mye",
      "Lavere enn uten formuesskatt, fordi hun må kreve en avkastning som også dekker skatten"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> Formuesskatten er en skatt på personen, ikke på aktivumet. Rammes både investeringen og alternativet, senker skatten kontantstrømmen og avkastningskravet like mye. Verdien blir derfor den samme som uten formuesskatt: (CF − τV)/V = r − τ gir V = CF/r (manualen 8.3, H2025 oppgave 3d).</p><p><b>Med tall.</b> En strøm på kr 1,2 mill. i året med krav 6 % er verdt 1,2/0,06 = 20 mill. Med formuesskatt er kravet 6 % − 0,8 % = 5,2 % (ledd a). Skatten er 0,008 × 20 = 0,16 mill. Da er (1,2 − 0,16)/20 = 5,2 %, nøyaktig kravet. Verdien er fortsatt <b>den samme</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Lavere, fordi kravet står fast</b>: den halve justeringen. Kravet faller også. Diskonteres 1,2 − 0,008V med 6 %, blir verdien 17,65 mill.<br><b>Høyere, fordi kontantstrømmen står fast</b>: bare nevneren er justert. Kontantstrømmen faller også. Gir 1,2/0,052 = 23,08 mill.<br><b>Lavere, fordi hun må kreve en avkastning som dekker skatten</b>: den store misforståelsen manualen skriver mot. Alternativet hennes rammes av samme skatt, så kravet faller i stedet for å stige.</p><p><b>Strategi med minuspoeng.</b> Tell justeringene. Skatten treffer både telleren og nevneren. Da oppveier de hverandre.</p>"
    }
   ]
  },
  {
   "n": 6,
   "title": "Utbyttet som skal dekke formuesskatten",
   "points": 3,
   "topic": "Formuesskatt som avkastningsskatt",
   "chapters": [
    8,
    5
   ],
   "body": "<p>Erik eier alle aksjene i Fjellbygg AS. Formuesverdien før rabatt er kr 20 000 000. Aksjer verdsettes til 80 %. Erik har ingen annen formue, ingen gjeld og ingen kontanter. Formuesskatten er 1,0 % over bunnfradraget på kr 1 900 000. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Se bort fra skjerming.</p><p>Hvor stort utbytte må Erik ta ut for å dekke både formuesskatten og eierskatten på utbyttet? Rund av til nærmeste krone.</p>",
   "options": [
    "Kr 226 834",
    "Kr 194 354",
    "Kr 180 769",
    "Kr 141 000"
   ],
   "answer": 0,
   "solution": "<p><b>Regelen.</b> Utbyttet D skal etter eierskatt være nøyaktig formuesskatten F: D × (1 − t<sub>e</sub>) = F, altså D = F/(1 − t<sub>e</sub>). Effektiv eierskatt er t<sub>e</sub> = 1,72 × 22 % = 37,84 %.</p><p><b>Regnestykket.</b></p><p>1. Formuesverdi: 20 000 000 × 80 % = 16 000 000.<br>2. Formuesskatt: (16 000 000 − 1 900 000) × 1 % = 141 000.<br>3. Utbytte: 141 000/(1 − 0,3784) = 141 000/0,6216 = <b>kr 226 834</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 194 354</b> = 141 000 × 1,3784. Skatten er lagt oppå i stedet for å brutto-regne. Etter eierskatt gir det bare 194 354 × 62,16 % = 120 811. Da mangler 20 189.<br><b>Kr 180 769</b> = 141 000/0,78. Oppjusteringen er glemt. Eierskatten er satt til 22 %.<br><b>Kr 141 000</b> = formuesskatten alene. Eierskatten på utbyttet er glemt. Tar Erik ut 141 000, går 53 354 til eierskatt. Da mangler han like mye til formuesskatten.</p><p><b>Kontroll.</b> Eierskatt 226 834 × 37,84 % = 85 834. Igjen: 226 834 − 85 834 = 141 000, nøyaktig formuesskatten. ✓</p><p><b>Strategi med minuspoeng.</b> Å dele på (1 − t) gir alltid mer enn å gange med (1 + t). Svaret må altså ligge over 194 354. Da kan 194 354, 180 769 og 141 000 strykes uten mer regning.</p>"
  },
  {
   "n": 7,
   "title": "Stykkskatt med lineære kurver",
   "points": 9,
   "topic": "Skatteincidens",
   "chapters": [
    11
   ],
   "body": "<p>Etterspørselen er x = 1 200 − 40P og tilbudet x = −300 + 60p, der P er prisen konsumentene betaler, p prisen produsentene får og x kvantum. Uten skatt er P = p = kr 15 og x = 600. Myndighetene innfører en stykkskatt t = kr 5 per enhet som kreves inn fra produsentene: P = p + t.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Hva blir konsumentprisen P etter at skatten er innført?</p>",
     "options": [
      "kr 13",
      "kr 18",
      "kr 17",
      "kr 20"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> Med skatt er likevekten D(p + t) = S(p). Konsumentprisen endrer seg med ∂P/∂t = S′/(S′ − D′), der S′ og D′ er helningene til tilbud og etterspørsel målt som endring i kvantum per krone.</p><p><b>Regnestykket.</b></p><p>1. Sett inn: 1 200 − 40(p + 5) = −300 + 60p.<br>2. 1 000 + 300 = 100p, altså p = 13.<br>3. P = p + t = 13 + 5 = <b>kr 18</b>. Kvantum: 1 200 − 40 × 18 = 480.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 13</b> = produsentprisen. Spørsmålet gjelder prisen konsumentene betaler.<br><b>Kr 20</b> = 15 + 5. Hele skatten veltet over på konsumentene. Det skjer bare når etterspørselen er perfekt uelastisk eller tilbudet perfekt elastisk.<br><b>Kr 17</b> = 15 + 5 × 40/100. Andelene er byttet om: |D′|/(S′ − D′) er brukt for konsumentprisen, men den formelen gir produsentenes andel.</p><p><b>Kontroll.</b> Formelen: S′ = 60 og D′ = −40 gir ∂P/∂t = 60/(60 + 40) = 0,6. Da er P = 15 + 0,6 × 5 = 18. ✓ Begge kurvene gir 480: 1 200 − 40 × 18 = 480 og −300 + 60 × 13 = 480. ✓</p><p><b>Strategi med minuspoeng.</b> Konsumentprisen kan verken falle eller stige med mer enn skatten, så P ligger mellom 15 og 20. Kr 13 ligger under og kan strykes straks.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Hvilket utsagn om hvem som bærer skatten, er riktig?</p>",
     "options": [
      "Produsentene bærer hele skatten, fordi det er de som betaler den inn til staten",
      "Produsentene bærer mest, fordi tilbudet reagerer sterkest på prisen",
      "Konsumentene bærer hele skatten, fordi prisen de betaler stiger",
      "Konsumentene bærer mest, fordi etterspørselen reagerer minst på prisen"
     ],
     "answer": 3,
     "solution": "<p><b>Regelen.</b> Hvem som betaler skatten inn, avgjør ikke hvem som bærer den. Konsumentenes andel er S′/(S′ − D′), produsentenes |D′|/(S′ − D′). Den siden som reagerer minst på prisen, bærer mest.</p><p><b>Med tall.</b> S′ = 60 og |D′| = 40. Konsumentene bærer 60/100 = 60 %, produsentene 40 %. Det ser du også av a: P stiger fra 15 til 18, altså 3 av 5 kroner. <b>Konsumentene bærer mest.</b></p><p><b>Hvorfor de andre er gale.</b></p><p><b>Produsentene bærer hele</b>: formell insidens. De betaler skatten inn, men har veltet 3 kroner over på kundene.<br><b>Produsentene bærer mest, fordi tilbudet reagerer sterkest</b>: elastisitetsregelen er snudd. Siden som reagerer sterkest, bærer minst.<br><b>Konsumentene bærer hele</b>: det skjer bare når etterspørselen er perfekt uelastisk eller tilbudet perfekt elastisk (ledd c). Her stiger P med 3, ikke 5.</p><p><b>Kontroll.</b> Andelene summerer til én: 60 % + 40 % = 100 %. ✓</p>"
    },
    {
     "label": "c",
     "points": 3,
     "body": "<p>Anta i stedet at tilbudet er vannrett ved p = kr 15 (perfekt elastisk). Hva blir konsumentprisen og kvantum med samme skatt?</p>",
     "options": [
      "P = 20 og x = 400",
      "P = 15 og x = 600",
      "P = 20 og x = 600",
      "P = 15 og x = 400"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Når S′ → ∞, går ∂P/∂t = S′/(S′ − D′) mot 1 og ∂p/∂t mot 0. Produsentene får 15 uansett, så konsumentene bærer hele skatten. Kvantum leses av etterspørselskurven ved den nye prisen.</p><p><b>Regnestykket.</b></p><p>1. Produsentprisen står fast: p = 15.<br>2. P = 15 + 5 = 20.<br>3. x = 1 200 − 40 × 20 = 400. Svaret er <b>P = 20 og x = 400</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>P = 15 og x = 600</b>: grensetilfellene er byttet om. Konsumentprisen står stille når <i>etterspørselen</i> er perfekt elastisk, ikke tilbudet.<br><b>P = 20 og x = 600</b>: prisen er riktig, men kvantum er antatt uendret. Kvantum står bare stille når etterspørselen er perfekt uelastisk.<br><b>P = 15 og x = 400</b>: kvantum er riktig, men prisen er produsentprisen p, ikke konsumentprisen P.</p><p><b>Kontroll.</b> Kronene går opp: konsumentene betaler 20, staten tar 5 og produsentene beholder 15. ✓ Konsumentenes andel er 5/5 = 100 %.</p>"
    }
   ]
  },
  {
   "n": 8,
   "title": "Kapitalkostnaden med delvis rentefradrag og egenkapitalfradrag",
   "points": 6,
   "topic": "Bedriftens tilpasning",
   "chapters": [
    9
   ],
   "body": "<p>En bedrift har inntekten F(K) med F′(K) &gt; 0 og F″(K) &lt; 0 og betaler renten r på all kapital K. Overskuddsskatten er t. Bare andelen A av rentene kan trekkes fra:</p><p>V = F(K) − rK − t[F(K) − A·rK]</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Anta at 0 &lt; A &lt; 1. Hvilket utsagn om bedriftens kapitalbruk er riktig?</p>",
     "options": [
      "Kravet til F′(K) er r. Bedriften investerer like mye som uten skatt",
      "Kravet til F′(K) er lavere enn r. Bedriften investerer mer enn uten skatt",
      "Kravet til F′(K) er mellom r og r/(1 − t). Bedriften investerer mindre enn uten skatt",
      "Kravet til F′(K) er høyere enn r og lik r/(1 − t). Bedriften investerer mindre enn uten skatt"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> Førsteordensbetingelsen er F′(K) = r(1 − At)/(1 − t). A = 1 gir r (nøytral skatt), A = 0 gir r/(1 − t). For 0 &lt; A &lt; 1 ligger kravet imellom. Siden F″ &lt; 0, gir et høyere krav mindre kapital.</p><p><b>Med tall.</b> r = 5 %, t = 22 % og A = 0,6 gir 5 % × (1 − 0,132)/0,78 = 5,56 %, mellom 5,00 % og 6,41 %. <b>Kravet ligger mellom r og r/(1 − t)</b>. Bedriften bruker mindre kapital enn uten skatt.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>r, like mye</b>: gjelder bare A = 1, når hele kapitalkostnaden kan trekkes fra. Da er skatten nøytral.<br><b>Lavere enn r, mer</b>: feil retning. Ufullstendig fradrag kan aldri gi et krav til F′(K) under r.<br><b>Lik r/(1 − t), mindre</b>: retningen er riktig, men kravet r/(1 − t) gjelder bare A = 0.</p><p><b>Strategi med minuspoeng.</b> Sett inn A = 1 og A = 0. Bare et utsagn som ligger mellom de to grensene, kan stemme for 0 &lt; A &lt; 1.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Anta nå at K = G + E (gjeld og egenkapital). Gjeldsrentene er fullt fradragsberettiget. I tillegg får bedriften fradrag for en beregnet avkastning r på egenkapitalen. Hvilke førsteordensbetingelser gjelder?</p>",
     "options": [
      "F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)",
      "F′<sub>G</sub> = r(1 − t) og F′<sub>E</sub> = r(1 − t)",
      "F′<sub>G</sub> = r/(1 − t) og F′<sub>E</sub> = r",
      "F′<sub>G</sub> = r og F′<sub>E</sub> = r"
     ],
     "answer": 3,
     "solution": "<p><b>Regelen.</b> En overskuddsskatt er nøytral når alle kapitalkostnader kan trekkes fra. Egenkapitalfradraget gjør egenkapitalens alternativkostnad fradragsberettiget på samme måte som gjeldsrentene.</p><p><b>Regnestykket.</b></p><p>1. V = F(G + E) − r(G + E) − t[F(G + E) − rG − rE] = (1 − t)[F(G + E) − r(G + E)].<br>2. ∂V/∂G = (1 − t)(F′<sub>G</sub> − r) = 0 gir F′<sub>G</sub> = r.<br>3. ∂V/∂E = (1 − t)(F′<sub>E</sub> − r) = 0 gir F′<sub>E</sub> = r.<br>Svaret er <b>F′<sub>G</sub> = r og F′<sub>E</sub> = r</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)</b>: systemet uten egenkapitalfradrag, som i H2025 oppgave 7b. Det er nettopp den kilen fradraget fjerner.<br><b>F′<sub>G</sub> = r(1 − t) og F′<sub>E</sub> = r(1 − t)</b>: kostnaden etter skatt er satt inn der kravet før skatt skal stå. Inntekten beskattes også, så sammenligningen skal være før skatt mot før skatt.<br><b>F′<sub>G</sub> = r/(1 − t) og F′<sub>E</sub> = r</b>: gjeld og egenkapital er byttet om.</p><p><b>Kontroll.</b> Sett A = 1 i formelen fra a: r(1 − t)/(1 − t) = r. Egenkapitalfradraget gir egenkapitalen «A = 1» også. Da forsvinner skattefordelen ved gjeld. Finansieringsvalget blir nøytralt (manualen 9.6).</p>"
    }
   ]
  },
  {
   "n": 9,
   "title": "Risikotaking med og uten tapsfradrag",
   "points": 3,
   "topic": "Skatt og risiko",
   "chapters": [
    12
   ],
   "body": "<p>Sigrid er risikonøytral og skal velge ett av to prosjekter. Prosjekt A gir sikkert kr 60 000. Prosjekt B gir +300 000 eller −150 000 med 50 % sannsynlighet hver. Skattesatsen er 30 %. Med fullt tapsfradrag føres et tap mot annen inntekt hun har.</p><p>Hvilket prosjekt velger hun med fullt tapsfradrag og hvilket uten tapsfradrag?</p>",
   "options": [
    "B med fullt tapsfradrag og B uten tapsfradrag",
    "B med fullt tapsfradrag, men A uten tapsfradrag",
    "A med fullt tapsfradrag og A uten tapsfradrag",
    "A med fullt tapsfradrag, men B uten tapsfradrag"
   ],
   "answer": 1,
   "solution": "<p><b>Regelen (Domar og Musgrave).</b> Med fullt tapsfradrag tar staten andelen t av både gevinst og tap. Forventet gevinst etter skatt blir (1 − t) × E for alle prosjekter, så rangeringen kan ikke snu. Uten tapsfradrag blir den E − t × G, der G er forventet gevinst i de gode utfallene. Da straffes det risikable prosjektet.</p><p><b>Regnestykket.</b></p><p>1. Før skatt: E(A) = 60 000 og E(B) = 0,5 × 300 000 − 0,5 × 150 000 = 75 000.<br>2. A etter skatt: 60 000 × 0,7 = 42 000. A beskattes også.<br>3. B med fullt fradrag: 0,7 × 75 000 = 52 500 &gt; 42 000, altså B.<br>4. B uten fradrag: 0,5 × 0,7 × 300 000 − 0,5 × 150 000 = 105 000 − 75 000 = 30 000 &lt; 42 000, altså A.<br>Svaret er <b>B med fullt tapsfradrag, men A uten tapsfradrag</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>B og B</b>: asymmetrien uten tapsfradrag er glemt. Staten tar 30 % av gevinsten, men bærer ingenting av tapet.<br><b>A og A</b>: B etter skatt er sammenlignet med A før skatt (52 500 mot 60 000). A gir også bare 42 000 etter skatt.<br><b>A, men B</b>: de to regnemåtene er byttet om.</p><p><b>Kontroll.</b> Med formelen E − t × G: G = 0,5 × 300 000 = 150 000. Da er 75 000 − 0,3 × 150 000 = 30 000. ✓ B taper uten fradrag når G &gt; (75 000 − 42 000)/0,3 = 110 000. Her er G = 150 000.</p><p><b>Strategi med minuspoeng.</b> Med fullt tapsfradrag kan rangeringen fra før skatt ikke snu. B var best før skatt. De to alternativene som sier A med fullt fradrag, kan strykes. To står igjen. Da gir det +1 i forventning å svare.</p>"
  },
  {
   "n": 10,
   "title": "Utleie av egen bolig og utbytte til holdingselskap",
   "points": 6,
   "topic": "Investeringscaser",
   "chapters": [
    4,
    6
   ],
   "body": "<p>To uavhengige spørsmål om hvordan innpakningen avgjør skatten.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Ola bor i hovedetasjen (80 m²) i eneboligen sin. Underetasjen (90 m²) leier han ut på langtidskontrakt for kr 12 000 i måneden, som er markedsleien for den. Markedsleien for hovedetasjen er kr 15 000 i måneden. Hvilket utsagn om leieinntekten er riktig?</p>",
     "options": [
      "Leien er skattepliktig, fordi Ola leier ut den største delen av boligen målt i areal",
      "Bare de første kr 20 000 i året er skattefrie. Resten er skattepliktig",
      "85 % av leien over kr 10 000 er skattepliktig, slik regelen er for korttidsutleie av egen bolig",
      "Leien er skattefri, fordi Ola bruker mest av boligen målt etter utleieverdi"
     ],
     "answer": 3,
     "solution": "<p><b>Regelen.</b> Ved langtidsutleie av egen bolig er leien skattefri når eieren selv bruker minst halvparten av boligen, målt etter utleieverdi og ikke etter areal (skatteloven § 7-2).</p><p><b>Med tall.</b> Olas del har utleieverdi 15 000 × 12 = 180 000 i året, underetasjen 144 000. Ola bruker 180 000/324 000 = 55,6 % målt etter utleieverdi. <b>Leien er skattefri.</b></p><p><b>Hvorfor de andre er gale.</b></p><p><b>Areal</b>: feil målestokk. Underetasjen er størst, men loven måler utleieverdi.<br><b>De første kr 20 000</b>: grensen gjelder bare når eieren leier ut mer enn halvparten. Den er ikke et fribeløp: over grensen er hele beløpet skattepliktig.<br><b>85 % over kr 10 000</b>: regelen for korttidsutleie under 30 dager, som ikke gjelder her.</p><p><b>Kontroll.</b> Samme mekanisme som i H2021 oppgave 1d: to like store etasjer, men eierens del var mest verdt. Fasiten var kr 0 i skattepliktig leie.</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Kari Holding AS eier 60 % av aksjene i Kystfrakt AS. Kystfrakt AS deler ut kr 2 000 000 i utbytte til Kari Holding AS. Selskapsskatten er 22 %. Hvor mye skatt betaler Kari Holding AS på utbyttet?</p>",
     "options": [
      "Kr 13 200",
      "Kr 0",
      "Kr 60 000",
      "Kr 756 800"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Fritaksmetoden (skatteloven § 2-38): utbytte til et aksjeselskap er i hovedsak skattefritt. Når mottakeren ikke eier mer enn 90 %, skal likevel 3 % av utbyttet inntektsføres og skattlegges med 22 %. Effektiv skatt er 3 % × 22 % = 0,66 %.</p><p><b>Regnestykket.</b></p><p>1. Inntektsført: 2 000 000 × 3 % = 60 000.<br>2. Skatt: 60 000 × 22 % = <b>kr 13 200</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 0</b>: fullt fritak gjelder bare når holdingselskapet eier mer enn 90 % av aksjene og stemmene. Her eier det 60 %.<br><b>Kr 60 000</b>: 3 % er lest som skattesats. Det er andelen som inntektsføres.<br><b>Kr 756 800</b> = 2 000 000 × 37,84 %. Aksjonærmodellen for personer er brukt på et selskap.</p><p><b>Kontroll.</b> 2 000 000 × 0,66 % = 13 200. ✓</p>"
    }
   ]
  },
  {
   "n": 11,
   "title": "Hva som kjennetegner et skatteparadis",
   "points": 3,
   "topic": "Skatteparadis",
   "chapters": [
    13
   ],
   "body": "<p>Hvilket utsagn om skatteparadiser er i tråd med pensum (Schjelderup)?</p>",
   "options": [
    "Et skatteparadis kjennetegnes først og fremst ved null skatt på selskapsoverskudd. Et land med 15 % sats kan derfor ikke være et skatteparadis.",
    "At de gunstige reglene er forbeholdt utlendinger, tyder på at landet vil tiltrekke seg realinvesteringer som skaper arbeidsplasser lokalt.",
    "Gjennom CRS får offentligheten innsyn i hvem som eier selskapene. Hemmeligholdet er derfor i praksis borte i landene som deltar.",
    "At de gunstige reglene er forbeholdt utlendinger, tyder på at de skal hente inntekter fra andre land, ikke skape verdier lokalt."
   ],
   "answer": 3,
   "solution": "<p><b>Regelen.</b> Schjelderup flytter vekten fra skattesatsen til hemmeligholdet (secrecy jurisdiction). Kjennetegnene er inngjerdet regelverk, sikret skattemessig hjemsted og privat informasjon. Argumentet om avslørte preferanser: var den inngjerdede lovgivningen vekstfremmende, ville landet brukt den på sin egen økonomi også. At den er forbeholdt utlendinger, viser at den skal hente inntekter fra andre land.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Null skatt</b>: satsen er et virkemiddel, hemmeligholdet er varen. Mauritius har 15 % nominell sats for utenlandskeide selskaper, men 3 % effektivt.<br><b>Realinvesteringer og arbeidsplasser</b>: samme premiss, motsatt slutning. Utenlandske selskaper med de gunstige reglene får som regel ikke drive virksomhet i landet. Var reglene vekstfremmende, ville landet brukt dem på egen økonomi.<br><b>CRS</b>: utvekslingen gir bare skattemyndighetene informasjon. Ingen tredjepart får innsyn. USA deltar ikke.</p><p><b>Strategi med minuspoeng.</b> CRS-påstanden kan strykes først: utvekslingen gir bare skattemyndighetene informasjon. Null skatt kan også strykes, fordi pensum flytter vekten fra satsen til hemmeligholdet. Mellom de to som starter med samme premiss, avgjør avslørte preferanser. Med to igjen gir det +1 i forventning å svare.</p>"
  },
  {
   "n": 12,
   "title": "Mertons aksjeandel og humankapitalen",
   "points": 9,
   "topic": "Porteføljevalg",
   "chapters": [
    14
   ],
   "body": "<p>Et globalt aksjefond har forventet avkastning 7 % og standardavvik 15 %. Risikofri rente er 2,5 %. Mertons formel for optimal andel av totalformuen i aksjer er w = (E(R) − R<sub>f</sub>)/(γσ<sup>2</sup>). Risikoaversjonen er γ = 3 i alle leddene.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Thea er pensjonist og har bare finansiell formue. Hvor stor andel av formuen bør hun ha i aksjefondet? Rund av til én desimal.</p>",
     "options": [
      "10,0 %",
      "66,7 %",
      "103,7 %",
      "150,0 %"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> w = (E(R) − R<sub>f</sub>)/(γσ<sup>2</sup>). Telleren er meravkastningen. Nevneren bruker variansen. Uten humankapital er totalformuen lik finansformuen.</p><p><b>Regnestykket.</b></p><p>1. Meravkastning: 7 % − 2,5 % = 4,5 %.<br>2. Varians: 0,15<sup>2</sup> = 0,0225.<br>3. w = 0,045/(3 × 0,0225) = 0,045/0,0675 = <b>66,7 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>10,0 %</b> = 0,045/(3 × 0,15). Standardavviket er brukt i stedet for variansen.<br><b>103,7 %</b> = 0,07/0,0675. Forventet avkastning er brukt i stedet for meravkastningen.<br><b>150,0 %</b> = (3 × 0,0225)/0,045. Brøken er snudd.</p><p><b>Kontroll.</b> Snu formelen: 0,667 × 3 × 0,0225 = 0,045, som er premien. ✓</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Siv har finansformue kr 2 400 000 og risikofri humankapital kr 600 000. Hvor stor andel av finansformuen bør hun ha i aksjefondet? Rund av til én desimal.</p>",
     "options": [
      "66,7 %",
      "58,3 %",
      "83,3 %",
      "100 %"
     ],
     "answer": 2,
     "solution": "<p><b>Regelen.</b> w gjelder totalformuen F + H. Risikofri humankapital virker som et bankinnskudd som ikke kan selges, så hele aksjebeløpet må ligge i finansformuen: α = w(F + H)/F.</p><p><b>Regnestykket.</b></p><p>1. Totalformue: 2 400 000 + 600 000 = 3 000 000.<br>2. Ønsket aksjebeløp: 66,7 % × 3 000 000 = 2 000 000.<br>3. Andel av finansformuen: 2 000 000/2 400 000 = <b>83,3 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>66,7 %</b>: w er brukt på finansformuen alene. Det gir 1 600 000 i aksjer, bare 53,3 % av totalformuen.<br><b>58,3 %</b>: humankapitalen er behandlet som aksjer (β = 1). Det er tilfellet i neste ledd.<br><b>100 %</b>: refleksen fra H2022 og H2025, der tallene ga nøyaktig 100 %. Her er humankapitalen mye mindre enn finansformuen.</p><p><b>Kontroll.</b> Samlet balanse: 2 000 000 i aksjer, 400 000 i bank og 600 000 i risikofri humankapital. Aksjer utgjør 2 000 000/3 000 000 = 66,7 % av alt. ✓</p>"
    },
    {
     "label": "c",
     "points": 3,
     "body": "<p>Anta i stedet at Sivs lønn samvarierer fullt med aksjemarkedet (β = 1). Hvor stor andel av finansformuen bør hun nå ha i aksjefondet?</p>",
     "options": [
      "Lavere andel enn i b, fordi hun alt har aksjerisiko gjennom lønnen",
      "0 %, fordi lønnen dekker hele den ønskede aksjeeksponeringen",
      "Høyere andel enn i b, fordi risikabel lønn må veies opp med mer avkastning",
      "Samme andel som i b, fordi Mertons andel av totalformuen er uendret"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Aksjebeløpet i finansformuen = w(F + H) − β × H. Med β = 1 er humankapitalen allerede en aksjeposisjon, så finansformuen skal bare dekke resten.</p><p><b>Med tall.</b> Ønsket aksjeeksponering er 2 000 000 (fra b). Humankapitalen dekker 600 000, så 1 400 000 skal stå i finansformuen: 1 400 000/2 400 000 = 58,3 %, mot 83,3 % i b. <b>Lavere andel, men ikke null.</b></p><p><b>Hvorfor de andre er gale.</b></p><p><b>0 %</b>: refleksen fra H2025 oppgave 11, delspørsmål 3, der humankapitalen var like stor som hele ønsket aksjebeløp. Her dekker lønnen bare 600 000 av de ønskede 2 000 000.<br><b>Høyere andel</b>: feil retning. Risikoen i lønnen kommer i stedet for aksjerisiko i finansformuen, ikke i tillegg.<br><b>Samme andel</b>: w av totalformuen er uendret (66,7 %), men andelen av finansformuen faller fordi lønnen allerede bærer aksjerisiko.</p><p><b>Kontroll.</b> Samlet aksjeeksponering: 1 400 000 + 600 000 = 2 000 000, som er 66,7 % av 3 000 000. ✓</p>"
    }
   ]
  },
  {
   "n": 13,
   "title": "Forsikring av hytta med √W",
   "points": 9,
   "topic": "Forsikring og forventet nytte",
   "chapters": [
    17
   ],
   "body": "<p>Du har en samlet formue på kr 4 000 000. Av den er kr 1 500 000 en hytte. Med sannsynlighet 2 % brenner hytta i løpet av året og mister hele verdien. Resten av formuen er trygg. Nyttefunksjonen din er U(W) = √W, der W er formuen ved årets slutt.</p>",
   "parts": [
    {
     "label": "a",
     "points": 3,
     "body": "<p>Et forsikringsselskap tilbyr full dekning (kr 1 500 000 ved brann) for en premie på kr 40 000. Bør du kjøpe forsikringen?</p>",
     "options": [
      "Ja, fordi forventet nytte blir høyere med forsikringen",
      "Nei, fordi forventet nytte blir lavere med forsikringen",
      "Nei, fordi man aldri bør kjøpe forsikring når premien er høyere enn forventet erstatning",
      "Du er indifferent, fordi forventet nytte er lik med og uten forsikring"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> Sammenlign forventet nytte, ikke forventet formue. Uten forsikring: (1 − p) × U(W) + p × U(W − L). Med full dekning er formuen W − premie i begge tilstander.</p><p><b>Regnestykket.</b></p><p>1. Uten forsikring: 0,98 × √4 000 000 + 0,02 × √2 500 000 = 0,98 × 2 000 + 0,02 × 1 581,14 = 1 960 + 31,62 = 1 991,62.<br>2. Med forsikring: √(4 000 000 − 40 000) = √3 960 000 = 1 989,97.<br>3. 1 989,97 &lt; 1 991,62: <b>nei, forventet nytte blir lavere med forsikringen</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Ja</b>: kommer typisk av å sette formuen i skadetilstanden til 0, som om hele formuen brant. Da blir nytten uten forsikring 0,98 × 2 000 = 1 960. Det er lavere enn 1 989,97 med forsikring, så forsikringen ser lønnsom ut. Hytta er bare 1,5 av 4 millioner.<br><b>Nei, fordi man aldri bør kjøpe forsikring når premien er høyere enn forventet erstatning</b>: riktig konklusjon, men gal regel. En risikoavers person betaler gjerne mer enn forventet erstatning (30 000). Med premie 32 000 er √3 968 000 = 1 991,98 &gt; 1 991,62. Da lønner forsikringen seg selv om premien er over 30 000. Samme felle som i H2024 oppgave 11c.<br><b>Indifferent</b>: krever at de to nyttene er like. Det er de ikke.</p><p><b>Kontroll.</b> I kroner: sikkerhetsekvivalenten uten forsikring er 1 991,62<sup>2</sup> = 3 966 561. Med forsikring sitter du sikkert igjen med 3 960 000, som er mindre. ✓</p>"
    },
    {
     "label": "b",
     "points": 3,
     "body": "<p>Hva er den høyeste premien du er villig til å betale for full dekning? Rund av til nærmeste krone.</p>",
     "options": [
      "Kr 30 000",
      "Kr 33 439",
      "Kr 3 439",
      "Kr 158 400"
     ],
     "answer": 1,
     "solution": "<p><b>Regelen.</b> Maksimal premie P løser U(W − P) = E[U uten forsikring]. Med √W: P = W − (E[U])<sup>2</sup>, altså formuen minus sikkerhetsekvivalenten.</p><p><b>Regnestykket.</b></p><p>1. E[U uten] = 1 991,6228 (fra a).<br>2. Sikkerhetsekvivalent: 1 991,6228<sup>2</sup> = 3 966 561.<br>3. P = 4 000 000 − 3 966 561 = <b>kr 33 439</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 30 000</b> = 2 % × 1 500 000, den aktuariske premien. Det er det en risikonøytral person ville betalt.<br><b>Kr 3 439</b>: bare risikopremien, forventet formue minus sikkerhetsekvivalent (3 970 000 − 3 966 561).<br><b>Kr 158 400</b>: tapet er satt lik hele formuen. Da blir E[U] = 1 960 og sikkerhetsekvivalenten 3 841 600.</p><p><b>Kontroll.</b> Maksimal premie = aktuarisk premie + risikopremie = 30 000 + 3 439 = 33 439. ✓</p><p><b>Strategi med minuspoeng.</b> Den må ligge over den aktuariske premien på 30 000 (du er risikoavers) og under 40 000 (den premien avslo du i a). Bare kr 33 439 ligger i det båndet.</p>"
    },
    {
     "label": "c",
     "points": 3,
     "body": "<p>Selskapet tilbyr i stedet 50 % dekning (kr 750 000 ved brann) for en premie på kr 16 000. Bør du kjøpe denne forsikringen?</p>",
     "options": [
      "Ja, fordi forventet nytte blir høyere med forsikringen",
      "Nei, fordi forventet nytte blir lavere med forsikringen",
      "Nei, fordi forventet formue blir lavere med forsikringen",
      "Nei, fordi du takket nei til full dekning, så halv dekning kan ikke være bedre"
     ],
     "answer": 0,
     "solution": "<p><b>Regelen.</b> Ved delvis dekning er risikoen ikke borte, så begge tilstander må regnes. Premien betales i begge: (1 − p) × U(W − premie) + p × U(W − L + erstatning − premie).</p><p><b>Regnestykket.</b></p><p>1. Ingen brann: 4 000 000 − 16 000 = 3 984 000, √ = 1 995,9960.<br>2. Brann: 4 000 000 − 1 500 000 + 750 000 − 16 000 = 3 234 000, √ = 1 798,3326.<br>3. E[U] = 0,98 × 1 995,9960 + 0,02 × 1 798,3326 = 1 956,0761 + 35,9667 = 1 992,0427.<br>4. 1 992,0427 &gt; 1 991,6228: <b>ja, forventet nytte blir høyere</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Nei, nytten blir lavere</b>: kommer av å glemme erstatningen i branntilstanden. Da blir formuen 2 484 000 og E[U] = 1 987,60.<br><b>Nei, forventet formue blir lavere</b>: forventet formue faller fra 3 970 000 til 3 969 000, fordi premien 16 000 er litt over den aktuariske 15 000. Men det er nytten som avgjør, ikke formuen.<br><b>Nei, fordi du takket nei til full dekning</b>: påslaget er ulikt. Full dekning kostet 40 000/30 000 = 1,33 ganger aktuarisk pris, halv dekning bare 16 000/15 000 = 1,07 ganger.</p><p><b>Kontroll.</b> Sikkerhetsekvivalenten med halv dekning er 1 992,0427<sup>2</sup> = 3 968 234, mot 3 966 561 uten forsikring. Du er 1 673 kroner bedre stilt i sikre kroner. ✓</p>"
    }
   ]
  },
  {
   "n": 14,
   "title": "Utsatt uttak av alderspensjon",
   "points": 3,
   "topic": "Pensjon",
   "chapters": [
    15
   ],
   "body": "<p>Hans er født i 1966 og har en pensjonsbeholdning på kr 5 100 000. Anta at delingstallet er 17,0 ved uttak som 67-åring og 14,6 ved uttak som 70-åring. Se bort fra regulering og ny opptjening.</p><p>Hvordan endres den årlige pensjonen hvis han venter til han er 70 år?</p>",
   "options": [
    "Uendret, fordi ordningen er nøytral",
    "Om lag 16,4 % høyere",
    "Om lag 14,1 % høyere",
    "Om lag 14,1 % lavere"
   ],
   "answer": 1,
   "solution": "<p><b>Regelen.</b> Årlig pensjon = pensjonsbeholdning/delingstall. Delingstallet synker når uttaket utsettes, fordi det er færre forventede leveår å fordele beholdningen på. Da stiger årsbeløpet.</p><p><b>Regnestykket.</b></p><p>1. Ved 67 år: 5 100 000/17,0 = 300 000.<br>2. Ved 70 år: 5 100 000/14,6 = 349 315.<br>3. Økning: 49 315/300 000 = <b>16,4 % høyere</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Uendret</b>: nøytraliteten gjelder forventet samlet utbetaling over livet, ikke årsbeløpet.<br><b>14,1 % høyere</b> = (17,0 − 14,6)/17,0. Den relative endringen i delingstallet, ikke i pensjonen.<br><b>14,1 % lavere</b> = 14,6/17,0 − 1. Delingstallene er byttet om.</p><p><b>Kontroll.</b> Beholdningen faller ut: 17,0/14,6 − 1 = 16,4 %. ✓</p><p><b>Strategi med minuspoeng.</b> Med fast teller og lavere nevner må pensjonen stige. «Uendret» og «lavere» kan strykes uten regning. Med to igjen gir det +1 i forventning å svare.</p>"
  },
  {
   "n": 15,
   "title": "Mer risiko enn markedsporteføljen",
   "points": 3,
   "topic": "Porteføljevalg",
   "chapters": [
    14
   ],
   "body": "<p>Risikofri rente er 2 %. Markedsporteføljen, et bredt globalt indeksfond, har forventet avkastning 7 % og standardavvik 16 %. Anne vil ha en portefølje med standardavvik 20 %. Hun kan låne og plassere til risikofri rente. Hva bør hun gjøre ifølge teorien om optimale porteføljer? Hvilken forventet avkastning får hun da?</p>",
   "options": [
    "Låne 25 % av egenkapitalen og ha 125 % i markedsporteføljen. Forventet avkastning blir 8,75 %.",
    "Velge mer risikable enkeltaksjer med samlet standardavvik 20 %. Forventet avkastning blir 8,75 %.",
    "Låne 25 % av egenkapitalen og ha 125 % i markedsporteføljen. Forventet avkastning blir 8,25 %.",
    "Låne 20 % av egenkapitalen og ha 120 % i markedsporteføljen. Forventet avkastning blir 8,00 %."
   ],
   "answer": 2,
   "solution": "<p><b>Regelen.</b> Separasjonsteoremet: alle holder den samme risikable porteføljen, markedsporteføljen. Risikoviljen avgjør bare hvor mye bank eller lån som blandes inn. Vekten i markedsporteføljen er σ<sub>p</sub>/σ<sub>M</sub>. Lånt andel er σ<sub>p</sub>/σ<sub>M</sub> − 1.</p><p><b>Regnestykket.</b></p><p>1. Vekt i markedsporteføljen: 20 %/16 % = 1,25, altså 25 % lånt.<br>2. Forventet avkastning: 2 % + 1,25 × (7 % − 2 %) = <b>8,25 %</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>8,75 %</b> = 1,25 × 7 %. Rentekostnaden på lånet (0,25 × 2 % = 0,5 prosentpoeng) er glemt.<br><b>Enkeltaksjer</b>: markedet betaler bare for systematisk risiko. En portefølje av risikable enkeltaksjer med standardavvik 20 % ligger under kapitalmarkedslinjen og gir lavere forventning enn 8,25 %, ikke høyere.<br><b>Låne 20 %</b> = (20 − 16)/20. Feil nevner: lånet skal måles mot σ<sub>M</sub>, ikke σ<sub>p</sub>.</p><p><b>Kontroll.</b> Kapitalmarkedslinjen: 2 % + (5 %/16 %) × 20 % = 8,25 %. ✓ Kontantstrømmen: 1,25 × 7 % − 0,25 × 2 % = 8,25 %. ✓</p>"
  },
  {
   "n": 16,
   "title": "Selge vinneren eller taperen",
   "points": 3,
   "topic": "Finansiell psykologi",
   "chapters": [
    18,
    5
   ],
   "body": "<p>Mari må selge én av to aksjeposter, som begge er verdt kr 100 000 i dag. Post A er kjøpt for kr 75 000, post B for kr 125 000. Ingen av dem har ubenyttet skjerming. Hun selger A «for å sikre gevinsten» og beholder B «til den tar seg opp igjen». Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Tap gir fradrag mot annen inntekt hun har.</p><p>Hvilket avvik viser Mari? Hvor mye mer skatt gir salget av A i år enn et salg av B?</p>",
   "options": [
    "Overkonfidens. Salget av A gir kr 9 460 mer i skatt.",
    "Disposisjonseffekten. Salget av A gir kr 9 460 mer i skatt.",
    "Flokkatferd. Salget av A gir kr 18 920 mer i skatt.",
    "Disposisjonseffekten. Salget av A gir kr 18 920 mer i skatt."
   ],
   "answer": 3,
   "solution": "<p><b>Regelen.</b> Disposisjonseffekten er å selge vinnerne og beholde taperne, fordi kjøpskursen blir referansepunkt og et realisert tap gjør vondt. Med norsk skatt koster det: en realisert gevinst skattes med 37,84 %, mens et realisert tap gir fradrag med samme sats.</p><p><b>Regnestykket.</b></p><p>1. Salg av A: gevinst 25 000, skatt 25 000 × 1,72 × 22 % = 9 460.<br>2. Salg av B: tap 25 000, redusert skatt 25 000 × 37,84 % = 9 460.<br>3. Forskjell: 9 460 + 9 460 = <b>kr 18 920</b>. Avviket er <b>disposisjonseffekten</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Overkonfidens, kr 9 460</b>: feil avvik og feil tall. Overkonfidens forklarer at folk handler for ofte, ikke hvilken post de selger. Kr 9 460 er bare skatten på gevinsten.<br><b>Disposisjonseffekten, kr 9 460</b>: riktig avvik, men bare skatten på gevinsten er talt. Fradraget ved å selge B er glemt.<br><b>Flokkatferd, kr 18 920</b>: riktig tall, men feil avvik. Flokkatferd er å følge mengden. Ingenting i casen handler om hva andre gjør.</p><p><b>Kontroll.</b> Forskjellen i realisert resultat er 25 000 − (−25 000) = 50 000. Ganget med 37,84 % gir det 18 920. ✓ Etter skatt sitter Mari igjen med 90 540 ved salg av A, mot 109 460 ved salg av B.</p>"
  },
  {
   "n": 17,
   "title": "Rentesummen på et annuitetslån",
   "points": 3,
   "topic": "Lån",
   "chapters": [
    16
   ],
   "body": "<p>Siri tar opp et annuitetslån på kr 2 400 000 med nominell rente 4,8 % og løpetid 20 år. Lånet betales med én etterskuddsvis termin per år. Se bort fra gebyrer og skatt.</p><p>Hvor mye betaler Siri i renter til sammen over lånets løpetid? Rund av til nærmeste krone.</p>",
   "options": [
    "Kr 3 786 599",
    "Kr 1 209 600",
    "Kr 2 304 000",
    "Kr 1 386 599"
   ],
   "answer": 3,
   "solution": "<p><b>Regelen.</b> Terminbeløpet er A = L × r/(1 − (1 + r)<sup>−T</sup>). Rentesummen er alt som betales minus lånebeløpet: T × A − L.</p><p><b>Regnestykket.</b></p><p>1. 1,048<sup>−20</sup> = 0,391538, så nevneren er 1 − 0,391538 = 0,608462.<br>2. A = 2 400 000 × 0,048/0,608462 = 115 200/0,608462 = 189 329,94.<br>3. Sum betalt: 20 × 189 329,94 = 3 786 598,78.<br>4. Rentesum: 3 786 598,78 − 2 400 000 = <b>kr 1 386 599</b>.</p><p><b>Hvorfor de andre er gale.</b></p><p><b>Kr 3 786 599</b>: summen av alle terminbeløpene, uten at lånet er trukket fra. Samme felle som 472 912 i H2022 oppgave 6.<br><b>Kr 1 209 600</b> = 4,8 % × 2 400 000 × 21/2. Rentesummen på et serielån med samme rente og løpetid.<br><b>Kr 2 304 000</b> = 2 400 000 × 4,8 % × 20. Renter som om hele lånet sto ute i 20 år, altså et avdragsfritt lån.</p><p><b>Kontroll.</b> Annuitetsfaktoren er 0,608462/0,048 = 12,6763. Da er 189 329,94 × 12,6763 = 2 400 000. ✓ Restgjelden treffer null etter 20 terminer.</p><p><b>Strategi med minuspoeng.</b> Et annuitetslån betaler ned saktere enn et serielån i starten, men raskere enn et avdragsfritt lån. Rentesummen må derfor ligge mellom 1 209 600 og 2 304 000. Sum betalt (3 786 599) er ikke en rentesum. Bare ett alternativ ligger i båndet.</p>"
  }
 ]
}""")


# ---------------------------------------------------------------- Kontroll og skriving
import os
MAPPE = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(MAPPE, "prove1.json")
if True:
    sti = UT
    data = SETT
    PLAN = json.load(open(os.path.join(MAPPE, "fasitplan.json"), encoding="utf-8"))["p1"]
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
    if feil:
        sys.exit(f"{feil} feil: prove1.json er ikke skrevet")
    with open(UT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
    print(f"  skrevet {UT}")
