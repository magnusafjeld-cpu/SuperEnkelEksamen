# Utregninger for d3-exit (108): Exit, abandonment and staged financing. Kjør: python3 d3-exit.py
def f(x, d=2): return f"{x:,.{d}f}".replace(",", " ")
def A(n, r): return (1 - (1 + r)**-n)/r

print("=== Steg 1: evigrente kuttet til annuitet ===")
# Eksempel: tap 10 i året, stenge etter 2 år, r = 10 %
print("eks A(2,10%)", f(A(2, 0.10), 6), "PV tap", f(10*A(2, 0.10)), "evig", 10/0.10, "hale", f(10/0.10/1.1**2))
C, n, r = 30, 4, 0.05
a = A(n, r)
print("A(4,5%)", f(a, 6), "1.05^-4", f(1.05**-4, 6))
print("PV tap båret", f(C*a), "evig", f(C/r), "hale", f(C/r/(1+r)**n), "udiskontert", f(C*n), "forskudd", f(C*a*(1+r)))
print("kontroll evig - hale", f(C/r - C/r/(1+r)**n))

print("\n=== Steg 2: månedsrente ===")
# Eksempel: 1 000 i måneden i 12 måneder, 6 % år
rm_e = 1.06**(1/12) - 1
print("eks rm", f(rm_e*100, 4), "A(12)", f(A(12, rm_e), 6), "PV", f(1000*A(12, rm_e)), "r/12", f(1000*A(12, 0.005)))
Cm, n2, ry = 2500, 18, 0.07
rm = (1 + ry)**(1/12) - 1
print("rm", f(rm*100, 6), "% ; A(18, rm)", f(A(n2, rm), 6), "PV", f(Cm*A(n2, rm)))
print("felle r/12", f(ry/12*100, 6), f(Cm*A(n2, ry/12)))
print("felle årsrente som månedsrente", f(Cm*A(n2, ry)))
print("felle evigrente", f(Cm/rm))
print("felle udiskontert", Cm*n2)
print("kontroll (1+rm)^12", f((1+rm)**12, 6), "1.07^1.5", f(1.07**1.5, 6), "(1+rm)^18", f((1+rm)**18, 6))
print("grenser: 45 000 >", f(Cm*A(n2, rm)), "> ?")

print("\n=== Steg 3: exit-beslutning med gebyr ===")
loss, rm3, fee = 1500, 0.005, 350000
stay = -loss/rm3
print("bli", stay, "gå", -fee, "beslutning", "bli" if stay > -fee else "gå", "tapt første 24 mnd udiskontert", loss*24)
# Eksempel: tap 1 000 i måneden, rm 0,5 %, gebyr 120 000
print("eks bli", -1000/0.005, "gå", -120000)

print("\n=== Steg 4: salgsopsjon (salvage) ved t = 1 ===")
# Eksempel: 500, netto 60 eller 20, salg 300 ved t = 1, r = 10 %
I_e, ge, be, Se, re = 500, 60, 20, 300, 0.10
nwo_e = 0.5*(ge + be)/re - I_e
bad_e = -I_e + (be + Se)/(1 + re)
good_e = ge/re - I_e
nw_e = 0.5*good_e + 0.5*bad_e
print("eks uten", f(nwo_e), "fortsett dårlig", be/re, "god", good_e, "dårlig med salg", f(bad_e), "med", f(nw_e), "opsjon", f(nw_e - max(0, nwo_e)), "direkte", f(0.5*(Se - be/re)/(1 + re)))
I4, g4, b4, S4, r4 = 1000, 130, 50, 800, 0.08
nwo = 0.5*(g4 + b4)/r4 - I4
good = g4/r4 - I4
cont_b = b4/r4
bad = -I4 + (b4 + S4)/(1 + r4)
nw = 0.5*good + 0.5*bad
opt = nw - max(0, nwo)
print("uten", f(nwo), "god", f(good), "fortsett dårlig ved t1", cont_b, "salg", S4, "dårlig med salg", f(bad), "med", f(nw), "opsjon", f(opt))
print("direkte 0.5*(S - b/r)/(1+r)", f(0.5*(S4 - cont_b)/(1 + r4)))
print("god: fortsett", g4/r4, "mot salg", S4)
print("felle sammenlignet med 0", f(nw))
print("felle ikke diskontert", f(0.5*(S4 - cont_b)))
bad_nocf = -I4 + S4/(1 + r4)
print("felle glemt år-1-kontantstrøm", f(0.5*good + 0.5*bad_nocf - nwo), "dårlig", f(bad_nocf))
print("felle uten sannsynlighet", f((S4 - cont_b)/(1 + r4)))

print("\n=== Steg 5: trinnvis finansiering ===")
# Eksempel: forelesningen 10 (50 %), 90 (20 %), 800, uten diskontering
print("eks", -10 + 0.5*(-90 + 0.2*800), "alt på en gang", -100 + 0.1*800)
I1, p1, I2, p2, V, r5 = 15, 0.25, 40, 0.6, 220, 0.04
C2 = -I2 + p2*V/(1 + r5)
npv = -I1 + p1*max(0, C2)/(1 + r5)
allin = -I1 - I2/(1 + r5) + p1*p2*V/(1 + r5)**2
print("C2 ved t1", f(C2, 4), "NPV trinnvis", f(npv, 4), "alt på en gang", f(allin, 4))
print("felle dobbelttelling av 15", f(-I1 + p1*max(0, C2 - I1)/(1 + r5), 4))
print("felle uten diskontering", f(-I1 + p1*(-I2 + p2*V), 4))
print("felle totalsannsynlighet i node 2", f(-I1 + p1*max(0, -I2 + p1*p2*V/(1 + r5))/(1 + r5), 4), "C2 med 0.15", f(-I2 + p1*p2*V/(1+r5), 4))
print("kontroll: spart 0.75*40/1.04", f((1 - p1)*I2/(1 + r5), 4), "differanse", f(npv - allin, 4))
print("med sunk: -15 - 40 + 126.92 =", f(-I1 - I2 + p2*V/(1+r5), 4))

print("\n=== Steg 6: eksamensnivå, måned, exitgebyr ===")
I6, cost, Rg, Rb, ry6, F = 750, 30, 44, 25, 0.08, 150
rm6 = (1 + ry6)**(1/12) - 1
g6, b6 = Rg - cost, Rb - cost
a24 = A(24, rm6)
disc24 = (1 + rm6)**24
print("rm", f(rm6*100, 6), "1/rm", f(1/rm6, 4), "A(24)", f(a24, 6), "(1+rm)^24", f(disc24, 6), "= 1.08^2", f(1.08**2, 6))
nwo6 = 0.5*(g6 + b6)/rm6 - I6
good6 = g6/rm6 - I6
stay24 = b6/rm6
bad6 = b6*a24 - I6 - F/disc24
nw6 = 0.5*good6 + 0.5*bad6
print("netto", g6, b6, "uten", f(nwo6), "god", f(good6), "bli ved mnd 24", f(stay24), "mot", -F)
print("dårlig: tap", f(b6*a24), "gebyr PV", f(F/disc24), "dårlig", f(bad6), "med", f(nw6))
print("verdi av retten", f(nw6 - max(0, nwo6)))
print("felle mot negativ NPV", f(nw6 - nwo6))
print("felle ignorert gebyr", f(0.5*good6 + 0.5*(b6*a24 - I6)))
print("felle gebyr udiskontert", f(0.5*good6 + 0.5*(b6*a24 - I6 - F)))
rmx = ry6/12
good_x = g6/rmx - I6; bad_x = b6*A(24, rmx) - I6 - F/(1 + rmx)**24
print("felle r/12", f(0.5*good_x + 0.5*bad_x), "uten r/12", f(0.5*(g6+b6)/rmx - I6))
# kontroll: kuttet hale minus gebyr
tail = 0.5*(-b6/rm6)/disc24
print("hale fjernet 0.5*(5/rm)/1.1664", f(tail), "gebyr 0.5*F/1.1664", f(0.5*F/disc24), "netto", f(tail - 0.5*F/disc24), "nwo + netto", f(nwo6 + tail - 0.5*F/disc24))

print("\n=== Tillegg: kontroller og eksempel til steg 6 ===")
print("steg 2 nedre grense 45 000/1.07^1.5", f(45000/1.07**1.5))
# Eksempel steg 6: oppstart 100, netto +3 eller -2.5 i måneden, rm = 0.5 % oppgitt, exit ved mnd 12 mot gebyr 20
rme, Ie6, ge6, be6, Fe6 = 0.005, 100, 3, -2.5, 20
a12 = A(12, rme); d12 = (1 + rme)**12
nwo_e6 = 0.5*(ge6 + be6)/rme - Ie6
good_e6 = ge6/rme - Ie6
bad_e6 = be6*a12 - Ie6 - Fe6/d12
print("eks A(12)", f(a12, 6), "1.005^12", f(d12, 6), "uten", f(nwo_e6), "god", f(good_e6), "bli ved mnd 12", be6/rme, "dårlig", f(bad_e6), "tap", f(be6*a12), "gebyr PV", f(Fe6/d12), "med", f(0.5*good_e6 + 0.5*bad_e6))
# Steg 6 avrunding: vis mellomtall med 2 desimaler som summerer
print("halve:", f(0.5*good6, 4), f(0.5*bad6, 4), "sum", f(0.5*good6 + 0.5*bad6, 4))
print("god", f(good6, 4), "PV god", f(g6/rm6, 4), "dårlig deler", f(b6*a24, 4), f(F/disc24, 4), f(bad6, 4))
print("uten: 4.5/rm", f(4.5/rm6, 4))
print("felle ignorert gebyr: dårlig", f(b6*a24 - I6, 4), "felle udiskontert gebyr: dårlig", f(b6*a24 - I6 - F, 4))
print("hale i dag", f((-b6/rm6)/disc24, 4), "netto per dårlig tilstand", f((-b6/rm6)/disc24 - F/disc24, 4))
