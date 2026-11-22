# Utregninger for d3-vente (107): The option to wait. Kjør: python3 d3-vente.py
def f(x, d=2): return f"{x:,.{d}f}".replace(",", " ")

print("=== Steg 1: NPV når produksjonen starter i dag ===")
# Eksempel: presse 600, 50 i året for alltid, første i dag, r = 10 %
I, C, r = 600, 50, 0.10
print("eks verdi", C + C/r, "NPV", C + C/r - I, "glemt år 0", C/r - I)
# Oppgave: linje 1 550, 150 i dag, neste år 250 eller 50 (0,5), r_f = 10 %
I, P0, Pu, Pd, r = 1550, 150, 250, 50, 0.10
EC = 0.5*Pu + 0.5*Pd
now = -I + P0 + EC/r
print("E[C]", EC, "PV", P0 + EC/r, "NPV now", f(now))
print("felle glemt år 0", f(-I + EC/r))
print("felle annuitet forskuddsvis + år 0", f(-I + P0 + EC*(1+r)/r))
print("felle diskontert evigrente ett år ekstra", f(-I + P0 + (EC/r)/(1+r)))
print("kontroll per tilstand", -I + P0 + Pu/r, -I + P0 + Pd/r, 0.5*(-I+P0+Pu/r) + 0.5*(-I+P0+Pd/r))

print("\n=== Steg 2: verdien av å vente og ventopsjonen ===")
# Eksempel: maskin 700, 60 i dag, 100 eller 20, r = 10 %
Ie, P0e, Pue, Pde = 700, 60, 100, 20
nowe = -Ie + P0e + (0.5*Pue + 0.5*Pde)/r
upe = -Ie + Pue*(1+r)/r; dne = -Ie + Pde*(1+r)/r
waite = 0.5*max(upe, 0)/(1+r)
print("eks now", f(nowe), "up", upe, "dn", dne, "wait", f(waite), "opsjon", f(waite - max(0, nowe)))
up = -I + Pu*(1+r)/r; dn = -I + Pd*(1+r)/r
wait = 0.5*max(up, 0)/(1+r)
opt = wait - max(0, now)
print("up t1", up, "dn t1", dn, "wait", f(wait), "opsjon", f(opt))
print("felle: rapporterte wait", f(wait))
print("felle: beholdt negativ ned", f((0.5*up + 0.5*dn)/(1+r) - now))
print("felle: glemt t1-kontantstrøm", f(0.5*max(-I + Pu/r, 0)/(1+r) - now))
print("felle: diskontert to ganger", f(0.5*up/(1+r)**2 - now))
# dekomponering
gain_down = 0.5*(-(-I + P0 + Pd/r))
cost_up = 0.5*((-I + P0 + Pu/r) - up/(1+r))
print("unngår ned", gain_down, "forsinkelse opp", f(cost_up, 4), "netto", f(gain_down - cost_up))
print("forsinkelse opp: -P0 + I(1-1/1.1) =", f(-P0 + I*(1 - 1/(1+r)), 4))

print("\n=== Steg 3: lav sigma ===")
# Eksempel: maskin 700, 60 i dag; (i) 100/20 fra steg 2 ; (ii) 63/57
for a, b in ((63, 57),):
    u = -Ie + a*(1+r)/r; d = -Ie + b*(1+r)/r
    print("eks", a, b, "up", f(u), "dn", f(d), "wait", 0.5*max(u,0)/(1+r) + 0.5*max(d,0)/(1+r))
for a, b in ((155, 145), (160, 140)):
    u = -I + a*(1+r)/r; d = -I + b*(1+r)/r
    w = (0.5*max(u, 0) + 0.5*max(d, 0))/(1+r)
    print(a, b, "now", now, "up", f(u), "dn", f(d), "wait", f(w), "opsjon", f(w - now))
print("sigma = 0:", f((-I + P0*(1+r)/r)/(1+r)), "= now/1.1", f(now/(1+r)))

print("\n=== Steg 4: verdien av informasjon ===")
# Eksempel: 100, netto 15 eller -5, r = 10 %
Ii, g, b, ri = 100, 15, -5, 0.10
Eg = 0.5*(g + b)/ri - Ii; ng = g/ri - Ii; nb = b/ri - Ii
print("eks E", Eg, "good", ng, "bad", nb, "informert", 0.5*max(ng, 0) + 0.5*max(nb, 0))
# Oppgave: 1 000, drift 80, inntekt 190 eller 60, r_f = 5 %
I4, cost, Rg, Rb, r4 = 1000, 80, 190, 60, 0.05
g4, b4 = Rg - cost, Rb - cost
E4 = 0.5*(g4 + b4)/r4 - I4
ng4 = g4/r4 - I4; nb4 = b4/r4 - I4
inf4 = 0.5*max(ng4, 0) + 0.5*max(nb4, 0)
val4 = inf4 - max(0, E4)
print("netto", g4, b4, "E[NPV]", f(E4), "good", f(ng4), "bad", f(nb4), "informert", f(inf4), "verdi", f(val4))
print("felle sammenlignet med negativ NPV", f(inf4 - E4))
print("felle forsinket/diskontert", f(inf4/(1+r4)))
print("felle droppet max", f(0.5*ng4 + 0.5*nb4 - max(0, E4)))
print("felle glemt driftskost", f(0.5*max(Rg/r4 - I4, 0) + 0.5*max(Rb/r4 - I4, 0) - max(0, 0.5*(Rg+Rb)/r4 - I4)))
# forsinket studie: dekomponering
lost = g4/(1+r4); saved = I4 - I4/(1+r4)
print("forsinket", f(inf4/(1+r4)), "tapt år 1", f(lost), "spart", f(saved), "netto x0,5", f(0.5*(saved - lost)), "sum", f(val4 + 0.5*(saved - lost)))

print("\n=== Steg 5: indifferenssannsynligheten X ===")
# Eksempel: Kurbatovs maskin 1 600, 200, 300/100, r = 10 %
Ik, P0k, Puk, Pdk = 1600, 200, 300, 100
Wk = -Ik + Puk*(1+r)/r
print("eks W", Wk, "wait-koeff", f(Wk/(1+r), 4), "now(X) =", -Ik + P0k + Pdk/r, "+", (Puk-Pdk)/r, "X")
Xk = -(-Ik + P0k + Pdk/r)/((Puk-Pdk)/r - Wk/(1+r))
print("eks X", f(Xk, 4), "fast 600:", f(600*(1+r)/Wk, 4))
# Oppgave: 950, 200, 350/50, r = 10 %
I5, P05, Pu5, Pd5 = 950, 200, 350, 50
a = -I5 + P05 + Pd5/r; bb = (Pu5 - Pd5)/r
W5 = -I5 + Pu5*(1+r)/r; D5 = -I5 + Pd5*(1+r)/r
c = W5/(1+r)
X = -a/(bb - c)
print("now(X) =", a, "+", bb, "X ; up t1", W5, "dn t1", D5, "wait-koeff", f(c, 6))
print("X*", f(X, 4), "kontroll now", f(a + bb*X, 4), "wait", f(c*X, 4))
now05 = a + bb*0.5
print("felle: now holdt på X=0,5-verdien", now05, "-> X", f(now05/c, 4))
a2 = -I5 + Pd5/r; c2 = (-I5 + Pu5/r)/(1+r)
print("felle: glemt år 0 begge sider", f(-a2/(bb - c2), 4), "a2", a2, "c2", f(c2, 4))
print("felle: diskontert to ganger", f(-a/(bb - W5/(1+r)**2), 4), "koeff", f(W5/(1+r)**2, 4))
for x in (0.5, 0.8):
    print("X", x, "now", f(a + bb*x), "wait", f(c*x))
