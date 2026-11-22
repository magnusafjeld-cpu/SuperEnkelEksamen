# Utregninger for d3-realrho (109): Real options priced with a traded twin. Kjør: python3 d3-realrho.py
def f(x, d=4): return f"{x:,.{d}f}".replace(",", " ")
def A(n, r): return (1 - (1 + r)**-n)/r

print("=== Steg 1: rho fra en omsatt tvilling ===")
S0e, Sue, Sde, rfe = 100, 125, 85, 0.04
rho_e = ((1 + rfe)*S0e - Sde)/(Sue - Sde)
print("eks rho", f(rho_e), "kontroll", f((rho_e*Sue + (1 - rho_e)*Sde)/(1 + rfe)))
S0, Su, Sd, rf, p = 2450, 3000, 2000, 0.05, 0.6
rho = ((1 + rf)*S0 - Sd)/(Su - Sd)
print("1.05*2450", (1 + rf)*S0, "rho", f(rho), "1-rho", f(1 - rho))
print("felle reell p", p, "felle ikke vokst", f((S0 - Sd)/(Su - Sd)), "felle 1-rho", f(1 - rho))
print("kontroll reprising", f((rho*Su + (1 - rho)*Sd)/(1 + rf)))
ER = (p*Su + (1 - p)*Sd)/S0 - 1
print("aluminiums forventede avkastning med p = 0.6:", f(ER*100), "%")

print("\n=== Steg 2: verdien av opsjonen med rho og r_f ===")
Vu_e, Vd_e, K_e = 60, 30, 45
print("eks C0", f(rho_e*max(Vu_e - K_e, 0)/(1 + rfe)))
Vu, Vd, K = 260, 60, 150
Cu, Cd = max(Vu - K, 0), max(Vd - K, 0)
C0 = (rho*Cu + (1 - rho)*Cd)/(1 + rf)
print("Cu", Cu, "Cd", Cd, "C0", f(C0, 2), f(C0, 6))
print("felle reell p med r_f", f(p*Cu/(1 + rf), 2))
print("felle beholdt negativ", f((rho*Cu + (1 - rho)*(Vd - K))/(1 + rf), 2))
print("felle 1-rho på opp", f((1 - rho)*Cu/(1 + rf), 2))
print("felle ikke diskontert", f(rho*Cu, 2))
# replikering
D = (Cu - Cd)/(Su - Sd); B = (Cd - Sd*D)/(1 + rf)
print("replikering Delta", f(D, 6), "B", f(B, 6), "C0", f(S0*D + B, 6))

print("\n=== Steg 3: hvorfor svarene er forskjellige ===")
Cp = p*Cu/(1 + rf)
ret_opt = p*Cu/C0 - 1
print("analytikerens svar", f(Cp, 2), "riktig", f(C0, 2), "forskjell", f(Cp - C0, 2))
print("opsjonens forventede avkastning med p", f(ret_opt*100, 2), "% ; aluminium", f(ER*100, 2), "%")
print("p*Cu diskontert med aluminiums avkastning", f(p*Cu/(1 + ER), 2))
print("giring: S0*Delta / C0", f(S0*D/C0, 4))

print("\n=== Steg 4: rentetre, opp = lav rente, patent med fast utløp ===")
# Eksempel: 5-års annuitet, yield 5 %, ettårsrente 3 %, neste år 4 % eller 7 %
Te, ye, rfe4, rue, rde = 5, 0.05, 0.03, 0.04, 0.07
S0e4 = A(Te, ye); Sue4 = 1 + A(Te - 1, rue); Sde4 = 1 + A(Te - 1, rde)
rho_e4 = ((1 + rfe4)*S0e4 - Sde4)/(Sue4 - Sde4)
print("eks S0", f(S0e4, 6), "Su", f(Sue4, 6), "Sd", f(Sde4, 6), "rho", f(rho_e4))
T, y, rf4, ru, rd = 15, 0.06, 0.04, 0.035, 0.09
S0_4 = A(T, y); Su_4 = 1 + A(T - 1, ru); Sd_4 = 1 + A(T - 1, rd)
rho4 = ((1 + rf4)*S0_4 - Sd_4)/(Su_4 - Sd_4)
print("A(15,6%)", f(A(T, y), 6), "A(14,3.5%)", f(A(T-1, ru), 6), "A(14,9%)", f(A(T-1, rd), 6))
print("S0", f(S0_4, 6), "Su", f(Su_4, 6), "Sd", f(Sd_4, 6))
print("1.04*S0", f((1 + rf4)*S0_4, 6), "teller", f((1 + rf4)*S0_4 - Sd_4, 6), "nevner", f(Su_4 - Sd_4, 6), "rho", f(rho4))
print("felle vokst med 6 %", f(((1 + y)*S0_4 - Sd_4)/(Su_4 - Sd_4)))
print("felle uten kupong", f(((1 + rf4)*S0_4 - (Sd_4 - 1))/((Su_4 - 1) - (Sd_4 - 1))))
print("felle 1-rho (høy rente)", f(1 - rho4))
print("kontroll reprising", f((rho4*Su_4 + (1 - rho4)*Sd_4)/(1 + rf4), 6))
print("ordning: Sd < 1.04 S0 < Su:", Sd_4 < (1 + rf4)*S0_4 < Su_4)
# patentet videre: betaler 2 i året i 15 år, koster 20
Cpat, Ipat = 2, 20
now_pat = Cpat*A(T, y) - Ipat
up_pat = Cpat*A(T - 1, ru) - Ipat; dn_pat = Cpat*A(T - 1, rd) - Ipat
val_pat = rho4*max(up_pat, 0)/(1 + rf4)
print("patent: nå", f(now_pat), "opp t1", f(up_pat), "ned t1", f(dn_pat), "verdi", f(val_pat))

print("\n=== Steg 5: eksamensnivå, ventopsjonen risikonøytralt ===")
# Eksempel: S0 = 50, Su = 60, Sd = 45, rf 5 %, I = 54, NPV nå = 52.5 - 54
S0x, Sux, Sdx, rfx, Ix = 50, 60, 45, 0.05, 54
rhox = ((1 + rfx)*S0x - Sdx)/(Sux - Sdx)
C0x = rhox*max(Sux - Ix, 0)/(1 + rfx)
print("eks rho", f(rhox), "C0", f(C0x), "NPV nå", (1 + rfx)*S0x - Ix)
I5, C5, T5, r0, ru5, rd5, p5 = 40, 6, 8, 0.05, 0.03, 0.065, 0.5
pv_now = C5*A(T5, r0); npv_now = pv_now - I5
Su5 = C5*A(T5, ru5); Sd5 = C5*A(T5, rd5); S05 = pv_now/(1 + r0)
print("A(8,5%)", f(A(T5, r0), 6), "A(8,3%)", f(A(T5, ru5), 6), "A(8,6.5%)", f(A(T5, rd5), 6))
print("PV nå", f(pv_now), "NPV nå", f(npv_now), "Su", f(Su5), "Sd", f(Sd5), "S0", f(S05))
rho5 = ((1 + r0)*S05 - Sd5)/(Su5 - Sd5)
print("rho teller", f((1 + r0)*S05 - Sd5), "nevner", f(Su5 - Sd5), "rho", f(rho5), f(rho5, 6))
Cu5, Cd5 = max(Su5 - I5, 0), max(Sd5 - I5, 0)
C05 = (rho5*Cu5 + (1 - rho5)*Cd5)/(1 + r0)
opt5 = C05 - max(0, npv_now)
print("Cu", f(Cu5), "Cd", Cd5, "rho*Cu", f(rho5*Cu5, 6), "C0", f(C05, 6), "opsjon", f(opt5))
rho_bad = ((1 + r0)*pv_now - Sd5)/(Su5 - Sd5)
print("felle feil S0: rho", f(rho_bad), "C0", f(rho_bad*Cu5/(1 + r0)))
print("felle reell 0.5 med r_f", f(p5*Cu5/(1 + r0)))
print("felle mot negativ NPV nå", f(C05 - npv_now))
print("felle beholdt negativ ned", f((rho5*Cu5 + (1 - rho5)*(Sd5 - I5))/(1 + r0)))
# H2024-nøkkelens tvilling: annuitet på 1 i T+1 år
S0k = A(T5 + 1, r0); Suk = 1 + A(T5, ru5); Sdk = 1 + A(T5, rd5)
rhok = ((1 + r0)*S0k - Sdk)/(Suk - Sdk)
print("nøkkel-tvilling S0", f(S0k, 6), "Su", f(Suk, 6), "Sd", f(Sdk, 6), "teller", f((1+r0)*S0k - Sdk, 6), "nevner", f(Suk - Sdk, 6), "rho", f(rhok))
# replikering
D5 = (Cu5 - Cd5)/(Su5 - Sd5); B5 = (Cd5 - Sd5*D5)/(1 + r0)
print("Delta", f(D5, 6), "B", f(B5, 6), "S0*Delta", f(S05*D5, 6), "C0", f(S05*D5 + B5, 6))
print("NPV_0,u = Cu/1.05", f(Cu5/(1 + r0)), "rho*NPV_0,u", f(rho5*Cu5/(1 + r0)))

print("\n=== Tillegg ===")
# Steg 3 eksempel: sertifikat 100, 125/85, rf 4 %, p = 0.6, call 15/0 koster C0e
C0e = rho_e*15/(1 + rfe)
print("eks call", f(C0e), "forv. avk call", f((0.6*15/C0e - 1)*100, 2), "% ; sertifikat", f(((0.6*125 + 0.4*85)/100 - 1)*100, 2), "%")
lev = S0*D/C0
print("giring", f(lev), "r_C = rf + giring*(ER - rf) =", f((rf + lev*(ER - rf))*100, 4), "% ; direkte", f(ret_opt*100, 4), "%")
print("66/1.100435", f(p*Cu/(1 + ret_opt), 4))
print("steg 5 sjekk med avrundet: 0.4022*2.1182/1.05", f(0.4022*2.1182/1.05))
print("steg 4: 0.4194*11.920520 + 0.5806*8.786150 /1.04", f((0.4194*11.920520 + 0.5806*8.786150)/1.04))
print("steg 4 patent med avrundet rho", f(0.4194*1.8410/1.04))
