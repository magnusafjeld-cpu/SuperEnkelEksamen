# Utregninger for kort stige 111 · d3-aksjebytte · Stock swaps, cash offers and bidding
# Kjør: python3 fag/fie402/_sjangre/regn/d3-aksjebytte.py

def r(x, d=2):
    return round(x + 0.0, d)

print("=== Steg 1: ER, nye aksjer og kurs etter fusjonen ===")
# Eksempel: 9 mill à 50, 6 mill à 20, «1 for hver 2» (ER 0.5), S 54
NA, PA, NT, PT, ER, S = 9, 50, 6, 20, 0.5, 54
A, T = NA*PA, NT*PT
x = ER*NT
print("eks: A", A, "T", T, "x", x, "Pnew", (A+T+S)/(NA+x), "tilbudt", ER*PA, "premie", ER*PA/PT-1)
# Oppgave: Granheim 30 mill à 84, 3 Granheim for 8 Tveit, Tveit 24 mill à 28, S = 150
NA, PA, NT, PT, S = 30, 84, 24, 28, 150
ER = 3/8
A, T = NA*PA, NT*PT
x = ER*NT
V = A+T+S
Pnew = V/(NA+x)
print("A", A, "T", T, "A+T+S", V, "x", x, "N etter", NA+x)
print("Pnew", Pnew, r(Pnew))
print("felle uten S:", (A+T)/(NA+x), r((A+T)/(NA+x)))
xinv = (8/3)*NT
print("felle snudd ER: x", xinv, "Pnew", V/(NA+xinv), r(V/(NA+xinv)))
print("felle NA+NT:", V/(NA+NT), r(V/(NA+NT)))
print("felle bare NA:", V/NA)
# kontroll: Tveits eiere får x*Pnew, Tveit bringer T+S
print("kontroll: x*Pnew", x*Pnew, "T+S", T+S, "Granheim gevinst", T+S-x*Pnew, "per aksje", (T+S-x*Pnew)/NA, "84+", PA+(T+S-x*Pnew)/NA)

print()
print("=== Steg 2: NPV for hver side, aksjer og kontanter ===")
# Eksempel: samme som steg 1-eksempelet, og kontant 25 per aksje (samme tilbudte verdi)
NA, PA, NT, PT, ER, S = 9, 50, 6, 20, 0.5, 54
A, T = NA*PA, NT*PT; x = ER*NT; y = x/(NA+x); V = A+T+S
print("eks: y", y, "NPV_A", (1-y)*V-A, "NPV_T", y*V-T)
P = 25*NT
print("eks kontant 25: P", P, "NPV_T", P-T, "NPV_A", S-(P-T))
# Oppgave: Askvik 25 mill à 120, Breivik 15 mill à 50, ER 0.5, S 225
NA, PA, NT, PT, ER, S = 25, 120, 15, 50, 0.5, 225
A, T = NA*PA, NT*PT; x = ER*NT; y = x/(NA+x); V = A+T+S
NPV_T = y*V - T; NPV_A = (1-y)*V - A
print("A", A, "T", T, "x", x, "y", y, "V", V)
print("y*V", y*V, "NPV_T", NPV_T, r(NPV_T), "NPV_A", NPV_A, r(NPV_A), "sum", NPV_A+NPV_T)
print("felle gammel kurs:", x*PA - T)
print("felle uten S:", y*(A+T) - T, r(y*(A+T)-T))
yv = T/(A+T)
print("felle y=T/(A+T):", yv, yv*V - T)
Pnew = V/(NA+x)
print("kontroll Pnew", Pnew, "per Breivik-aksje", ER*Pnew, "NPV_T", NT*(ER*Pnew - PT))
print("NPV_A via kurs", NA*(Pnew-PA))
print("kontant 60 per aksje: NPV_T", 60*NT - T)

print()
print("=== Steg 3: hvem bærer et synergibortfall (eksempel) ===")
NA, PA, NT, PT, ER = 9, 50, 6, 20, 0.5
A, T = NA*PA, NT*PT; x = ER*NT; y = x/(NA+x)
for S in (54, 6):
    V = A+T+S
    print("S", S, "Pnew", V/(NA+x), "aksjer: NPV_A", (1-y)*V-A, "NPV_T", y*V-T, "| kontant 25: NPV_A", S-(25*NT-T), "NPV_T", 25*NT-T)
print("bortfall 48: aksjer A bærer", (1-y)*48, "T bærer", y*48)

print()
print("=== Steg 4: høyeste bytteforhold ===")
NA, PA, NT, PT, S = 20, 40, 10, 30, 100
A, T = NA*PA, NT*PT
print("eks: ERmax", (T+S)/A*NA/NT, "form 2", (PT+S/NT)/PA, "x_max", NA*(T+S)/A, "kontantpris maks", T+S, (T+S)/NT)
# Oppgave: Haugland 60 mill à 55 (nå 54), Sætre 18 mill à 36 (nå 44), S 270
NA, PA, NT, PT, S = 60, 55, 18, 36, 270
PA1, PT1 = 54, 44
A, T = NA*PA, NT*PT
ERmax = (T+S)/A*NA/NT
print("A", A, "T", T, "(T+S)/A", (T+S)/A, "NA/NT", NA/NT, "ERmax", ERmax, round(ERmax, 4))
print("form 2", (PT+S/NT)/PA, "S/NT", S/NT, "form 3", PT/PA*(1+S/T), "1+S/T", 1+S/T, "PT/PA", PT/PA)
xmax = NA*(T+S)/A
print("x_max", xmax, "/NT", xmax/NT)
print("felle uten S", PT/PA, round(PT/PA, 4))
ERmin = T/(A+S)*NA/NT
print("felle ERmin", ERmin, round(ERmin, 4), "T/(A+S)", T/(A+S))
print("felle etter-kurser", (PT1+S/NT)/PA1, round((PT1+S/NT)/PA1, 4))
print("felle bare Sætre etter-kurs", (PT1+S/NT)/PA, round((PT1+S/NT)/PA, 4))
print("felle snudd", (T+S)/A*NT/NA, round((T+S)/A*NT/NA, 4))
# kontroll
x = ERmax*NT
print("kontroll: x", x, "Pnew", (A+T+S)/(NA+x))
# minste synergi for ER = 1.00
print("min S for ER 1.0:", 1.0*NT*PA - T, "for ERmax:", ERmax*NT*PA - T)

print()
print("=== Steg 5: kontanter mot aksjer når synergiene skuffer ===")
# Eksempel
NA, PA, NT, PT = 10, 50, 8, 25
A, T = NA*PA, NT*PT
cash = 30; P = cash*NT
ER = 0.6; x = ER*NT; y = x/(NA+x)
for S in (100, 20):
    V = A+T+S
    print("eks S", S, "kontant NPV_A", S-(P-T), "NPV_T", P-T, "| aksjer y", y, "NPV_A", (1-y)*V-A, "NPV_T", y*V-T)
# Oppgave: Rødberg 40 mill à 90, Solvang 16 mill à 45, S forventet 240, faktisk 60
NA, PA, NT, PT = 40, 90, 16, 45
A, T = NA*PA, NT*PT
cash = 57; P = cash*NT
ER = 0.62; x = ER*NT; y = x/(NA+x)
print("A", A, "T", T, "P", P, "premie", P-T, "x", x, "N", NA+x, "y", y, "1-y", 1-y)
for S in (240, 60):
    V = A+T+S
    print("S", S, "V", V, "kontant NPV_A", S-(P-T), "| aksjer NPV_A", (1-y)*V-A, r((1-y)*V-A), "(1-y)V", (1-y)*V, "NPV_T", y*V-T, r(y*V-T), "yV", y*V, "Pnew", V/(NA+x))
print("felle aksjer verdsatt til gammel kurs:", 60 - (x*PA - T), "x*PA", x*PA)
print("bortfall 180: aksjer bærer A", (1-y)*180, "T", y*180)
V = A+T+60
Pn = V/(NA+x)
print("kontroll NPV_A via kurs:", NA*(Pn-PA), "Pnew", Pn)
print("forventet: aksjetilbud verdt per Solvang", ER*(A+T+240)/(NA+x), "ved gammel kurs", ER*PA)

print()
print("=== Steg 6: budkrig ===")
# Eksempel (andre tall enn forelesningen): mål X verdt 40 alene; budgivere P, Q
# P: alene 100, vinner 170, rival vinner 88 ; Q: alene 80, vinner 150, rival vinner 72
ex = {"P": (100, 170, 88), "Q": (80, 150, 72)}
for k, (alone, win, lose) in ex.items():
    print("eks", k, "gevinst mot alene", win-alone, "reservasjonspris", win-lose, "synergi", win-alone-40)
# Oppgave: Elvebank verdt 50 alene
# Nordbank alene 120, vinner 200, rival vinner 110
# Vestbank alene 100, vinner 180, rival vinner 85
# Sørbank alene 90, vinner 170, rival vinner 72
bud = {"Nordbank": (120, 200, 110), "Vestbank": (100, 180, 85), "Sørbank": (90, 170, 72)}
for k, (alone, win, lose) in bud.items():
    print(k, "mot alene", win-alone, "reservasjon", win-lose, "synergi", win-alone-50, "tap hvis rival vinner", alone-lose)
pris = 95
print("Sørbank vinner til", pris, ": ender på", 170-pris, "mot alene 90 og taper-verdi 72")
tot_for = 120+100+90+50
tot_etter = 200-50  # ikke brukt
print("totalverdi før", tot_for, "etter Sørbank vinner (verdier før pris)", 110+85+170, "Elvebank-eiere får", pris)
print("endringer: Elvebank", pris-50, "Sørbank", 170-pris-90, "Nordbank", 110-120, "Vestbank", 85-100, "sum", (pris-50)+(170-pris-90)+(110-120)+(85-100))
print("verdiskaping: (110+85+170) - (120+100+90+50) + 50 ... =", (110+85+170+0) - (120+100+90+50) + 50 - 50)
print("sjekk sum endringer = verdier etter + kontant - før:", (110+85+170) + 0 - (120+100+90) - 50 + 50)
