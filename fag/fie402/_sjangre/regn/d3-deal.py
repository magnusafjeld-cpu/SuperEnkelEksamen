# Utregninger for kort stige 112 · d3-deal · The market's implied deal probability
# Kjør: python3 fag/fie402/_sjangre/regn/d3-deal.py
# Notasjon: A er oppkjøperen, B målet. «k B for m A»: kjøp k B, short m A, sett short-provenyet i r_f.


def posisjon(k, m, PA0, PB0, PA1, PB1, rf, t=1.0):
    g = (1 + rf) ** t
    kost = k * PB1
    innskudd = m * PA1
    H = innskudd * g                       # avtalen gjennomføres
    L = innskudd * g + k * PB0 - m * PA0   # avtalen faller, kursene tilbake
    CE = kost * g
    p = (CE - L) / (H - L)
    return dict(g=g, kost=kost, innskudd=innskudd, H=H, L=L, CE=CE, p=p,
                spread0=m * PA0 - k * PB0, spread1=m * PA1 - k * PB1)


def vis(navn, d):
    print(navn, {k: round(v, 6) for k, v in d.items()})


print("=== Steg 1: posisjonen og de to utfallene (ett år) ===")
vis("eks 1 A for 2 B", posisjon(2, 1, 60, 25, 58, 28, 0.05))
d = posisjon(5, 2, 75, 26, 72, 28.20, 0.04)
vis("oppg 2 A for 5 B", d)
print("felle uten rente: H", d["innskudd"], "L", d["innskudd"] + 5 * 26 - 2 * 75)
print("felle etter-kurser i L:", d["H"] + 5 * 28.20 - 2 * 72)
# Snudd forhold: kjøp 2 B, short 5 A
inv = d["innskudd"]
H2 = 5 * 72 * 1.04
print("felle snudd: H", H2, "L", H2 + 2 * 26 - 5 * 75)
print("kontroll spread: før", d["spread0"], "H - L", d["H"] - d["L"])

print()
print("=== Steg 2: implisitt sannsynlighet (ett år) ===")
d = posisjon(2, 1, 60, 25, 58, 28, 0.05)
vis("eks", d)
print("eks spread: 1-p =", 1.05 * d["spread1"] / d["spread0"])
d = posisjon(4, 3, 48, 30, 47, 34, 0.03)
vis("oppg 3 A for 4 B", d)
print("p", round(d["p"], 4), "1-p spread", 1.03 * d["spread1"] / d["spread0"])
print("felle kost ikke rentet:", (d["kost"] - d["L"]) / (d["H"] - d["L"]), round((d["kost"] - d["L"]) / (d["H"] - d["L"]), 4))
print("felle uten r_f:", 1 - d["spread1"] / d["spread0"], round(1 - d["spread1"] / d["spread0"], 4))
# Bare B: P_B1 (1+rf) = p * ER * P_A1 + (1-p) P_B0
ER = 0.75
pB = (34 * 1.03 - 30) / (ER * 47 - 30)
print("felle bare B:", pB, round(pB, 4))
# kontroll: prise A under samme p
p = d["p"]
PAc = (47 * 1.03 - (1 - p) * 48) / p
print("A ved gjennomføring", PAc, "B ved gjennomføring", ER * PAc,
      "B nå", (p * ER * PAc + (1 - p) * 30) / 1.03)

print()
print("=== Steg 3: selvfinansiert variant ===")
# eksempel: samme som steg 2-eksempelet
k, m, PA0, PB0, PA1, PB1, rf = 2, 1, 60, 25, 58, 28, 0.05
dep = m * PA1 - k * PB1
H = dep * (1 + rf); L = H + k * PB0 - m * PA0
print("eks: innskudd", dep, "H", H, "L", L, "p", -L / (H - L))
# oppgave: 1 A for 3 B
k, m, PA0, PB0, PA1, PB1, rf = 3, 1, 90, 24, 87, 27.50, 0.05
dep = m * PA1 - k * PB1
H = dep * (1 + rf); L = H + k * PB0 - m * PA0
p = -L / (H - L)
print("oppg: innskudd", dep, "H", H, "L", L, "H-L", H - L, "p", p, round(p, 4))
print("standard:", posisjon(3, 1, 90, 24, 87, 27.50, 0.05)["p"])
# feller
Hn, Ln = dep, dep + k * PB0 - m * PA0
print("felle innskudd ikke rentet:", -Ln / (Hn - Ln))
# innskuddet behandlet som kostnad: dep = p H + (1-p) L
pk = (dep - L) / (H - L)
print("felle innskudd som kostnad:", pk, round(pk, 4))
# innskuddet utelatt i L: L' = k PB0 - m PA0
Lx = k * PB0 - m * PA0
px = -Lx / (H - Lx)
print("felle uten innskudd i L:", px, round(px, 4), "L'", Lx)
print("kontroll spread: 1-p =", 1.05 * dep / (m * PA0 - k * PB0))
std = posisjon(3, 1, 90, 24, 87, 27.50, 0.05)
print("standard H, L:", std["H"], std["L"], "minus kost*1.05:", std["H"] - std["CE"], std["L"] - std["CE"])

print()
print("=== Steg 4: avgjøres om noen måneder ===")
d = posisjon(1, 2, 20, 30, 19.50, 36, 0.06, 0.5)
vis("eks 2 A per B, 6 mnd", d)
print("eks spread 1-p", d["g"] * d["spread1"] / d["spread0"])
d = posisjon(2, 5, 16, 34, 15.60, 37.20, 0.045, 4 / 12)
vis("oppg 5 A for 2 B, 4 mnd", d)
print("p", round(d["p"], 4), "spread 1-p", d["g"] * d["spread1"] / d["spread0"], "per B: spread0", 2.5 * 16 - 34, "spread1", 2.5 * 15.60 - 37.20)
d1 = posisjon(2, 5, 16, 34, 15.60, 37.20, 0.045, 1)
print("felle helt år:", d1["p"], round(d1["p"], 4))
print("felle kost ikke rentet:", (d["kost"] - d["L"]) / (d["H"] - d["L"]), round((d["kost"] - d["L"]) / (d["H"] - d["L"]), 4))
print("felle uten r_f:", 1 - d["spread1"] / d["spread0"])
# Kontantbud-merknad: med kontanter gir B alene p
print("kontroll: B ved gjennomføring er verdt 2.5 * P_A; prise A med samme p:")
p = d["p"]; g = d["g"]
PAc = (15.60 * g - (1 - p) * 16) / p
print("A ved gjennomføring", PAc, "B", 2.5 * PAc, "B nå", (p * 2.5 * PAc + (1 - p) * 34) / g)

print()
print("=== Steg 5: antakelser (retningen) ===")
d = posisjon(2, 1, 60, 25, 58, 28, 0.05)
for PBfail in (25, 26, 27):
    L = d["innskudd"] * d["g"] + 2 * PBfail - 60
    print("B ved brudd", PBfail, "L", L, "p", (d["CE"] - L) / (d["H"] - L))
# Risikopremie på avtalerisikoen: posisjonen må tjene mer enn r_f -> virkelig p høyere
for prem in (0.0, 0.02):
    CE = d["kost"] * (1 + 0.05 + prem)
    print("forventet avkastning", 0.05 + prem, "p", (CE - d["L"]) / (d["H"] - d["L"]))
# Oppgavens p: bruk et eget sett tall (B 0.8 A-aksjer per B, ett år)
q = posisjon(5, 4, 50, 34, 49, 37.60, 0.04)
vis("oppg steg 5", q)
for PBfail in (34, 35):
    L = q["innskudd"] * q["g"] + 5 * PBfail - 4 * 50
    print("B ved brudd", PBfail, "p", (q["CE"] - L) / (q["H"] - L))

print()
print("=== Steg 6: eksamensnivå, synergiene markedet priser ===")
# Eksempel: 4 A per B, 6 mnd, rf 4%; NA 200 mill, NB 30 mill
NA, NB, ER = 200, 30, 4
PA0, PB0, PA1, PB1, rf, t = 25, 80, 26, 96, 0.04, 0.5
d = posisjon(1, ER, PA0, PB0, PA1, PB1, rf, t)
vis("eks", d)
p, g = d["p"], d["g"]
V1 = NA * PA1 + NB * PB1; V0 = NA * PA0 + NB * PB0
S = (V1 * g - V0) / p
PAc = (PA1 * g - (1 - p) * PA0) / p
print("eks V0", V0, "V1", V1, "V1*g", V1 * g, "S", S, "PAc", PAc, "S via PAc", (NA + ER * NB) * PAc - V0)
# Oppgave: 12.5 A per B, 3 mnd, rf 5 %
NA, NB, ER = 600, 40, 12.5
PA0, PB0, PA1, PB1, rf, t = 8.00, 85, 8.40, 98, 0.05, 0.25
d = posisjon(1, ER, PA0, PB0, PA1, PB1, rf, t)
vis("oppg", d)
p, g = d["p"], d["g"]
V1 = NA * PA1 + NB * PB1; V0 = NA * PA0 + NB * PB0
S = (V1 * g - V0) / p
print("V0", V0, "V1", V1, "V1*g", V1 * g, "V1*g - V0", V1 * g - V0, "p", p, "S", S, round(S, 2))
PAc = (PA1 * g - (1 - p) * PA0) / p
x = ER * NB
print("PA*g", PA1 * g, "(1-p)PA0", (1 - p) * PA0, "PAc", PAc, "x", x, "fusjonert", (NA + x) * PAc, "S via PAc", (NA + x) * PAc - V0)
print("B ved gjennomføring", ER * PAc, "B nå", (p * ER * PAc + (1 - p) * PB0) / g)
print("fordeling: A", NA * (PAc - PA0), "B", NB * (ER * PAc - PB0))
print("felle endring i markedsverdi:", V1 - V0)
print("felle glemt p:", V1 * g - V0)
d1 = posisjon(1, ER, PA0, PB0, PA1, PB1, rf, 1)
S1 = (V1 * 1.05 - V0) / d1["p"]
print("felle helt år: p", d1["p"], "S", S1, round(S1, 2))
p0 = 1 - d["spread1"] / d["spread0"]
print("felle uten r_f: p", p0, "S", (V1 - V0) / p0)
print("felle dagens A-kurs som A ved gjennomføring:", (NA + x) * PA1 - V0)
