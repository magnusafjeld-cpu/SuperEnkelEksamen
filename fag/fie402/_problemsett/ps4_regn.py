"""Problem Set 4 i FIE402 (M&A, fra forelesning 12): alle tall i fasiten.

Kjør:  python3 -I ps4_regn.py

Kurbatov sa i oppsummeringsforelesningen at M&A-forelesningen er «problem set
four». Oppgavene er eksemplene i lecture_12.pdf: Vodafone og Mannesmann
(lysbilde 20 til 22 og tavla), cash or stock (lysbilde 13 til 18, 24 og 25),
budgivning etter alternativer (lysbilde 26) og coinsurance (lysbilde 27 og 28).

Skriptet regner hvert tall i fasiten til ps4 i fag/fie402/problemsett.js på
nytt, sjekker kontrollene med assert og skriver ut avvikene mot lysbildene.
"""

AVVIK = []


def avvik(hvor, kurs, eget, hvorfor):
    AVVIK.append((hvor, kurs, eget, hvorfor))


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def vis(tittel, **kw):
    print(f"\n{tittel}")
    for k, v in kw.items():
        print(f"  {k:<30} {v:,.6f}" if isinstance(v, float) else f"  {k:<30} {v}")


# ------------------------------------------------------------------ oppgave 1
# Vodafone (V) og Mannesmann (M). Aksjetall i milliarder, priser i EUR.
N_M, N_V = 0.5179, 31.105
ER = 53.7
X = N_M * ER
y = X / (N_V + X)
ER2 = 58.96
X2 = N_M * ER2
y2 = X2 / (N_V + X2)
assert f"{X:.3f}" == "27.811" and f"{y:.1%}" == "47.2%" and f"{y2:.1%}" == "49.5%"
vis("Oppgave 1a", X=X, y=y, X_revidert=X2, y_revidert=y2, P_V_ved_350=350 / ER2)

PM0, PV0 = 145.35, 4.19          # 21. oktober
PM1, PV1 = 234.0, 4.96           # 17. desember
rf, T = 0.055, 0.25
tilbud = ER * PV1
vekst = (1 + rf) ** T
suksess = tilbud * vekst
gjenkjop = ER * PV0
fiasko = PM0 - gjenkjop + suksess
assert f"{tilbud:.3f}" == "266.352" and f"{suksess:.3f}" == "269.941"
vis("Oppgave 1b", tilbud=tilbud, vekstfaktor=vekst, suksess=suksess, gjenkjop=gjenkjop, fiasko=fiasko,
    netto_i_dag=-PM1)

p = (PM1 * vekst - fiasko) / (suksess - fiasko)
assert near(PM1, (p * suksess + (1 - p) * fiasko) / vekst)
# Lysbildet bruker 225.03 for gjenkjøpet. 53.7 × 4.19 er 225.003.
fiasko_lysbilde = PM0 - 225.03 + 269.941
p_lysbilde = (PM1 * vekst - fiasko_lysbilde) / (269.941 - fiasko_lysbilde)
assert f"{fiasko_lysbilde:.3f}" == "190.261" and f"{p_lysbilde:.4f}" == "0.5885"
vis("Oppgave 1c", p=p, p_med_lysbildets_225_03=p_lysbilde, M_ganger_vekst=PM1 * vekst)
avvik("PS4 1(b)-(c)", "gjenkjøp 225.03, fiasko 190.261, p = 0.5885",
      f"gjenkjøp {gjenkjop:.3f}, fiasko {fiasko:.3f}, p = {p:.4f}",
      "53.7 × 4.19 = 225.003, ikke 225.03. Svaret avrundes fortsatt til 59%. Tavla viser 225 og 190.")

# 1e: hvor store synergier må Vodafone tro på? Lysbilde 17 og 18: X ≤ N_A (T + S) / A.
A0 = N_V * PV0
T0 = N_M * PM0
S_min = X * A0 / N_V - T0             # = X × P_V − T
ER_maks_uten_S = PM0 / PV0
S_min_ER = (ER / ER_maks_uten_S - 1) * T0
assert near(S_min, S_min_ER, 1e-9)
assert near(X * PV0, S_min + T0)
# Markedet 17. desember: verdien av tilbudet mot verdien av Mannesmann alene
premie_okt = tilbud / PM0 - 1
vis("Oppgave 1e", A=A0, T=T0, ER_uten_synergier=ER_maks_uten_S, S_min=S_min, S_min_andel_av_T=S_min / T0,
    tilbud_over_okt_kurs=premie_okt)

# ------------------------------------------------------------------ oppgave 3
# Budgivning: verdier av A, B, C (og D) alene og med D (kolonnen = hvem som kjøper D).
alene = {"A": 100, "B": 80, "C": 70, "D": 60}
med_D = {  # kjøper: verdier for A, B, C
    "A": {"A": 190, "B": 70, "C": 55},
    "B": {"A": 90, "B": 170, "C": 55},
    "C": {"A": 90, "B": 70, "C": 160},
}
sum_alene = sum(alene.values())
print("\nOppgave 3")
for k, v in med_D.items():
    tot = sum(v.values())
    print(f"  {k} kjøper: total {tot}, endring {tot - sum_alene:+}, egen gevinst før pris "
          f"{v[k] - alene[k] - alene['D']:+}, eksternalitet på de andre "
          f"{sum(v[j] - alene[j] for j in v if j != k):+}")
mot_alene = {k: med_D[k][k] - alene[k] for k in med_D}
mot_rival = {k: med_D[k][k] - max(med_D[r][k] for r in med_D if r != k) for k in med_D}
assert mot_alene == {"A": 90, "B": 90, "C": 90}
assert mot_rival == {"A": 100, "B": 100, "C": 105}
vinner = max(mot_rival, key=mot_rival.get)
pris = sorted(mot_rival.values())[-2]        # stigende auksjon: nest høyeste betalingsvilje
endring = {"D": pris - alene["D"]}
for k in ("A", "B", "C"):
    endring[k] = (med_D[vinner][k] - (pris if k == vinner else 0)) - alene[k]
assert sum(endring.values()) == sum(med_D[vinner].values()) - sum_alene
vis("Oppgave 3, resultat", mot_alene=str(mot_alene), mot_rival=str(mot_rival), vinner=vinner, pris=pris,
    endringer=str(endring), sum_endringer=sum(endring.values()))

# ------------------------------------------------------------------ oppgave 4
# Coinsurance. Sannsynlighet 0.5 per tilstand, ingen diskontering (som i tabellen).
pr = (0.5, 0.5)
VA, VB = (80, 20), (10, 40)
FA, FB = 30, 15
VAB = tuple(a + b for a, b in zip(VA, VB))
assert VAB == (90, 60)


def gjeld(V, F):
    return sum(q * min(v, F) for q, v in zip(pr, V))


def ek(V, F):
    return sum(q * max(v - F, 0) for q, v in zip(pr, V))


DA, EA, DB, EB = gjeld(VA, FA), ek(VA, FA), gjeld(VB, FB), ek(VB, FB)
DAB, EAB = gjeld(VAB, FA + FB), ek(VAB, FA + FB)
assert near(DA + EA, 50) and near(DB + EB, 25) and near(DAB + EAB, 75)
assert near((DAB - DA - DB) + (EAB - EA - EB), 0)       # ingen synergier: overføring
mislighold_for = sum(q for q, a, b in zip(pr, VA, VB) if a < FA or b < FB)
mislighold_etter = sum(q for q, v in zip(pr, VAB) if v < FA + FB)
vis("Oppgave 4", D_A=DA, E_A=EA, D_B=DB, E_B=EB, D_for=DA + DB, E_for=EA + EB, D_AB=DAB, E_AB=EAB,
    endring_gjeld=DAB - DA - DB, endring_ek=EAB - EA - EB, P_mislighold_for=mislighold_for,
    P_mislighold_etter=mislighold_etter)
# Kan aksjonærene ta tilbake overføringen? Ny gjeld F med samme samlede gjeldsverdi 37.5:
# min(90, F)/2 + min(60, F)/2 = 37.5 gir F = 37.5 (risikofri), så de kan låne mer og dele ut.
F_ny = 37.5
assert near(gjeld(VAB, F_ny), 37.5)

# ------------------------------------------------------------------ tallene i fasiten
VIST = [
    ("1a X", X, 3, "27.811"), ("1a y %", 100 * y, 1, "47.2"), ("1a y2 %", 100 * y2, 1, "49.5"),
    ("1b vekst", vekst, 4, "1.0135"), ("1b suksess", suksess, 3, "269.941"), ("1b gjenkjøp", gjenkjop, 3, "225.003"),
    ("1b fiasko", fiasko, 3, "190.288"), ("1c M×vekst", PM1 * vekst, 3, "237.153"), ("1c p", p, 4, "0.5884"),
    ("1e A", A0, 2, "130.33"), ("1e T", T0, 2, "75.28"), ("1e X×PV", X * PV0, 2, "116.53"), ("1e S", S_min, 2, "41.25"),
    ("1e ER", ER_maks_uten_S, 2, "34.69"), ("1e S/T %", 100 * S_min / T0, 0, "55"),
    ("4 D_A", DA, 1, "25.0"), ("4 D_B", DB, 1, "12.5"), ("4 E_AB", EAB, 1, "30.0"),
]
for navn, x, d, vist_ in VIST:
    assert f"{x:.{d}f}" == vist_, (navn, x, vist_)
print(f"\n{len(VIST)} tall i fasiten stemmer med utregningen.")

# ------------------------------------------------------------------ avvik
print("\n\nAVVIK MOT LYSBILDENE")
for hvor, kurs, eget, hvorfor in AVVIK:
    print(f"\n{hvor}\n  lysbildet: {kurs}\n  eget:      {eget}\n  hvorfor:   {hvorfor}")
