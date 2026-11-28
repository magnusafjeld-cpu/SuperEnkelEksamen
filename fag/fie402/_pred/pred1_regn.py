"""Prediksjon 1 for FIE402: den mest sannsynlige eksamenen 7. desember 2026.

Kjør fra hvor som helst:  python3 -I fag/fie402/_pred/pred1_regn.py

Oppdraget står i docs/fie402-prediksjon-spek.md (tabellen «Pred1: den mest sannsynlige
eksamenen»). Seks oppgaver, 10 · 10 · 20 · 20 · 20 · 20 poeng, 180 minutter:

- E1 (10) Governance: eierens verktøykasse (opptak 17, 1:18:44). Et dansk pensjonsfond med 9 %
  i et spredt eid selskap og en ny CEO. Tre tiltak à 3 poeng og én setning om hva som slår feil.
- E2 (10) MM mot virkeligheten (opptak 03, 11:33). Tre forutsetninger som ikke holder, hva det
  betyr for gjeldsnivået, og en konklusjon.
- E3 (20) Norsk rederi/logistikk: MM-rekapitalisering til D/E = 0,8 i perfekt marked, så skatt
  22 % og ny permanent gjeld: PV(TS) = τD, kurshopp ved kunngjøring, tilbakekjøp til ny kurs.
- E4 (20) Svensk produksjonslinje: FCF med ΔNWC, tvilling med gjeldsbeta fra CAPM, r_U,
  r_E, r_wacc, NPV (ikke PV), gjeldskapasitet, APV med PV(TS) diskontert med r_U.
  Voksende evigrente, så APV har lukket form.
- E5 (20) Finsk sagbruk: bygge nå eller vente ett år. Kontantstrømmen starter den dagen linjen
  bygges. ρ fra en notert aksje i samme marked (S_u og S_d tar med utbyttet ved t = 1).
  NPV nå er positiv, men å vente er bedre. X = kontantstrømmen i den lave tilstanden som gir
  likegyldighet. Hale: hva om σ er svært lav?
- E6 (20) Dansk aksjebud med T = 0,25 år: long-short med innskudd av shortprovenyet,
  sikkerhetsekvivalent (1 + r_f)^T, implisitt p, hvem som betaler for mye, motiv.

Skriptet regner hvert tall, asserter sjekkene og skriver pred1.json og pred1_svar.json i samme
mappe. Er noe galt (skriveregler, poeng, tall som mangler i løsningen, svar som lekker i
oppgaveteksten), skrives ingenting.
"""
import json
import os
import re
import sys

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "pred1.json")
UT_SVAR = os.path.join(HER, "pred1_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    """Engelsk tallformat: tusenskille med komma, desimalpunktum, ekte minustegn."""
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def sg(x, d=4):
    """Med fortegn: +1.2345 eller −1.2345."""
    return ("+" if round(x, d) > 0 else "") + f(x, d)


def pc(x, d=4):
    """Andel som prosent: 0.078067 -> 7.8067%."""
    return f(100 * x, d) + "%"


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def P(*avsnitt):
    return "".join(f"<p>{a}</p>" for a in avsnitt)


def tabell(hode, rader):
    h = "".join(f"<th>{x}</th>" for x in hode)
    r = ""
    for rad in rader:
        celler = []
        for i, x in enumerate(rad):
            celler.append(f'<td class="n">{x}</td>' if i > 0 else f"<td>{x}</td>")
        r += "<tr>" + "".join(celler) + "</tr>"
    return f'<table class="data"><tr>{h}</tr>{r}</table>'


def tall(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


SVAR = {}


def svar(n, label, d):
    SVAR[f"pred1:{n}:{label}"] = d


# ================================================================== E3: rekapitalisering
N0 = 40.0            # millioner aksjer
P0 = 85.0            # NOK per aksje
D0 = 1100.0          # NOK mill., risikofri
RD3 = 0.035          # = r_f
RE0 = 0.092
E0 = N0 * P0
V3 = E0 + D0
RU3 = (E0 * RE0 + D0 * RD3) / V3
assert near(E0, 3400) and near(V3, 4500)

DE_MAL = 0.8
D_MAL = V3 * DE_MAL / (1 + DE_MAL)
NY_D = D_MAL - D0
P_KUNNG = V3 * 0 + P0                          # MM I: uendret
N_KJOP = NY_D / P_KUNNG
N_IGJEN = N0 - N_KJOP
E_ETTER = V3 - D_MAL
assert near(D_MAL, 2000) and near(NY_D, 900)
assert near(E_ETTER / N_IGJEN, P0, 1e-9)          # kursen uendret etter tilbakekjøpet
# to likninger (opptak 05, 1:09:02): N*P = 900 og (40 - N)*P = 2500  ->  40P = 3400
assert near((NY_D + E_ETTER) / N0, P0)

RE1 = RU3 + DE_MAL * (RU3 - RD3)
assert near((E_ETTER * RE1 + D_MAL * RD3) / V3, RU3)   # identitet, fanger bare regnefeil
RE1_FELLE_DV = RU3 + (D_MAL / V3) * (RU3 - RD3)        # D/V i stedet for D/E
RE1_RUND = 0.0781 + DE_MAL * (0.0781 - RD3)           # r_U rundet til 4 desimaler

FCF3 = RU3 * V3
EPS0 = (FCF3 - RD3 * D0) / N0
EPS1 = (FCF3 - RD3 * D_MAL) / N_IGJEN
assert near(EPS0 / RE0, P0, 1e-9) and near(EPS1 / RE1, P0, 1e-9)
assert EPS1 > EPS0

TAU3 = 0.22
D_NY_SKATT = 1200.0
TS_AAR = TAU3 * RD3 * D_NY_SKATT
PVTS3 = TS_AAR / RD3
assert near(PVTS3, TAU3 * D_NY_SKATT)
P_SKATT = (E0 + PVTS3) / N0
HOPP = P_SKATT - P0
N_KJOP_S = D_NY_SKATT / P_SKATT
N_IGJEN_S = N0 - N_KJOP_S
VL_S = V3 + PVTS3
E_S = VL_S - (D0 + D_NY_SKATT)
assert near(E_S / N_IGJEN_S, P_SKATT, 1e-9)
N_KJOP_FELLE = D_NY_SKATT / P0                         # gammel kurs i tilbakekjøpet
assert abs(N_KJOP_FELLE - N_KJOP_S) / N_KJOP_S > 0.05

# ================================================================== E4: prosjekt, WACC og APV
RF4, RM4 = 0.03, 0.08
MRP4 = RM4 - RF4
BE_T, DE_T, RD_T = 1.30, 0.5, 0.045
BD_T = (RD_T - RF4) / MRP4
WD_T = DE_T / (1 + DE_T)
WE_T = 1 - WD_T
BU = WE_T * BE_T + WD_T * BD_T
RU4 = RF4 + BU * MRP4
RE_T = RF4 + BE_T * MRP4
assert near(WE_T * RE_T + WD_T * RD_T, RU4)          # samme r_U direkte

REV1, KOST, AVS_ANDEL, TAU4, G4 = 60.0, 0.62, 0.08, 0.206, 0.02
KAPEX0, NWC0 = 225.0, 9.0
KOST1 = KOST * REV1
AVS1 = AVS_ANDEL * REV1
CAPEX1 = AVS1
EBIT1 = REV1 - KOST1 - AVS1
NOPAT1 = EBIT1 * (1 - TAU4)
DNWC1 = NWC0 * (1 + G4) - NWC0
FCF1 = NOPAT1 + AVS1 - CAPEX1 - DNWC1
UTLEGG = KAPEX0 + NWC0
assert near(EBIT1, 18.0) and near(FCF1, 14.112, 1e-9) and near(UTLEGG, 234)
FCF1_FELLE_NIVAA = NOPAT1 - NWC0 * (1 + G4)           # nivået i stedet for deltaen

DV4, RD4 = 0.40, 0.05
TOL4C = 0.003


def kjede(ru):
    re_ = ru + DV4 / (1 - DV4) * (ru - RD4)
    rw = (1 - DV4) * re_ + DV4 * RD4 * (1 - TAU4)
    assert near(rw, ru - DV4 * TAU4 * RD4)
    vl0 = FCF1 / (rw - G4)
    npv = vl0 - UTLEGG
    d0 = DV4 * vl0
    d1 = d0 * (1 + G4)
    vu = FCF1 / (ru - G4)
    ts1 = TAU4 * RD4 * d0
    pvts = ts1 / (ru - G4)
    npv_apv = vu + pvts - UTLEGG
    return dict(re=re_, rw=rw, vl0=vl0, npv=npv, d0=d0, d1=d1, vu=vu, ts1=ts1, pvts=pvts,
                npv_apv=npv_apv)


K = kjede(RU4)
RE4, RW4, VL4, NPV4, DK0, DK1 = K["re"], K["rw"], K["vl0"], K["npv"], K["d0"], K["d1"]
VU4, TS4, PVTS4, NPV4_APV = K["vu"], K["ts1"], K["pvts"], K["npv_apv"]
assert near(VU4 + PVTS4, VL4, 1e-9) and near(NPV4_APV, NPV4, 1e-9)   # WACC = APV
GAP4 = RU4 - RW4
assert near(GAP4, DV4 * TAU4 * RD4)
PVTS4_FELLE = TS4 / (RD4 - G4)                         # skjoldet diskontert med r_D
NPV_RU = VU4 - UTLEGG                                   # kollegaens forslag i (g)
VL1 = VL4 * (1 + G4)
assert near(VL1, FCF1 * (1 + G4) / (RW4 - G4))

# feller i (c): Klarälvens D/E i stedet for linjens, og Klarälvens r_D i stedet for linjens
RE4_FELLE_DE = RU4 + DE_T * (RU4 - RD4)
RW4_FELLE_DE = WE_T * RE4_FELLE_DE + WD_T * RD4 * (1 - TAU4)
RE4_FELLE_RD = RU4 + DV4 / (1 - DV4) * (RU4 - RD_T)
RW4_FELLE_RD = (1 - DV4) * RE4_FELLE_RD + DV4 * RD_T * (1 - TAU4)
# feller i (e): skjoldet med r_D, skjoldet uten vekst, gjelden som 40 % av NPV
NPV4_FELLE_RD = VU4 + PVTS4_FELLE - UTLEGG
PVTS4_FELLE_KONST = TS4 / RU4
D0_FELLE_NPV = DV4 * NPV4
# riktige svar med r_U rundet til 4 desimaler
K_RUND = kjede(0.0783)

# ================================================================== E5: vente med ρ fra en notert aksje
I5, C0, CU, CD, RF5 = 180.0, 9.0, 13.0, 6.0, 0.05
TOL5E = 0.002
S0, DU, DD = 62.0, 4.0, 2.4
FAKT = 1 + 1 / RF5                      # verdien ved t = 1 av 1 per år fra og med t = 1
VU1 = CU * FAKT
VD1 = CD * FAKT
NPVU1 = VU1 - I5
NPVD1 = VD1 - I5
assert near(VU1, 273) and near(VD1, 126)
SU = DU * FAKT
SD = DD * FAKT
RHO = ((1 + RF5) * S0 - SD) / (SU - SD)
assert 0 < RHO < 1
assert near((RHO * SU + (1 - RHO) * SD) / (1 + RF5), S0)   # identitet
RHO_FELLE = ((1 + RF5) * S0 - DD / RF5) / (DU / RF5 - DD / RF5)   # utbyttet ved t = 1 glemt
assert 0 < RHO_FELLE < 1 and abs(RHO_FELLE - RHO) > 0.05


def vente(rho, cd=CD):
    vd1 = cd * FAKT
    pv_usikker = (rho * VU1 + (1 - rho) * vd1) / (1 + RF5)
    npv_naa = -I5 + C0 + pv_usikker
    npv_vent = (rho * max(VU1 - I5, 0) + (1 - rho) * max(vd1 - I5, 0)) / (1 + RF5)
    return pv_usikker, npv_naa, npv_vent


PV5, NPV_NAA, NPV_VENT = vente(RHO)
assert NPV_NAA > 0 and NPV_VENT > NPV_NAA            # positiv NPV nå, men vent
OPSJON = NPV_VENT - NPV_NAA
KOST_VENT = C0 - I5 * RF5 / (1 + RF5)                # tapt kontantstrøm minus spart rente
RENTE_SPART = I5 - I5 / (1 + RF5)
VERN = (1 - RHO) * (I5 - VD1) / (1 + RF5)            # verdien av å slippe den lave tilstanden
assert near(VERN - KOST_VENT, OPSJON)
NPV_NAA_FELLE_C0 = NPV_NAA - C0
NPV_NAA_FELLE_HALV = -I5 + C0 + (0.5 * VU1 + 0.5 * VD1) / (1 + RF5)


def x_likegyldig(rho):
    # NPV_naa(X) = -I + C0 + [rho*VU1 + (1-rho)*FAKT*X]/(1+rf) = NPV_vent (lav tilstand avvist)
    _, _, npv_vent = vente(rho)
    a = -I5 + C0 + rho * VU1 / (1 + RF5)
    b = (1 - rho) * FAKT / (1 + RF5)
    x = (npv_vent - a) / b
    assert x * FAKT < I5                                 # den lave tilstanden avvises fortsatt
    _, n_naa, n_vent = vente(rho, x)
    assert near(n_naa, n_vent, 1e-9)
    return x, a, b


X5, A5, B5 = x_likegyldig(RHO)
assert near(X5, 8.533333333333333, 1e-9)
X_BRAKK = I5 / FAKT                                     # lav tilstand går i null
assert X5 < X_BRAKK
X5_RUND = x_likegyldig(0.44)[0]                         # ρ rundet til 0,44
X5_FELLE_C0 = (NPV_VENT - (A5 - C0)) / B5               # dagens kontantstrøm glemt
NPV_VENT_FELLE_NEG = (RHO * NPVU1 + (1 - RHO) * NPVD1) / (1 + RF5)   # lav tilstand mot −54
SIGMA_LAV = 9 * FAKT
assert SIGMA_LAV > I5 and C0 * 1 - I5 + 9 / RF5 > 0

# ================================================================== E6: aksjebud, T = 0,25
PA0, PB0, PA1, PB1 = 280.0, 115.0, 268.0, 124.00
ER = 0.5                                # 1 Thyholm-aksje for 2 Mors-aksjer
NA, NB = 60.0, 50.0
RF6, T6 = 0.03, 0.25
F6 = (1 + RF6) ** T6
TILBUD = ER * PA1
PREMIE = TILBUD / PB0 - 1
SPREAD = TILBUD - PB1
LONG = 2 * PB1
SHORT = 1 * PA1
UTLEGG6 = LONG
INNSKUDD_T = SHORT * F6
SUKSESS = INNSKUDD_T
FIASKO = INNSKUDD_T - PA0 + 2 * PB0
SE = UTLEGG6 * F6
PDEAL = (SE - FIASKO) / (SUKSESS - FIASKO)
assert 0 < PDEAL < 1
assert near(PDEAL * SUKSESS + (1 - PDEAL) * FIASKO, SE)
assert near(PDEAL, 1 - F6 * SPREAD / (ER * PA0 - PB0))     # samme p på kortformen
# selvfinansiert variant (opptak 16, 1:14:18): bare overskuddet settes inn
REST = SHORT - LONG
S_SELV = REST * F6
F_SELV = REST * F6 + 2 * PB0 - PA0
P_SELV = (0 - F_SELV) / (S_SELV - F_SELV)
assert near(P_SELV, PDEAL)
# feller
P_FELLE_100 = (UTLEGG6 - FIASKO) / (SUKSESS - FIASKO)                      # «plug 100»
F_HELT = 1 + RF6
P_FELLE_HELT = (UTLEGG6 * F_HELT - (SHORT * F_HELT - PA0 + 2 * PB0)) / (PA0 - 2 * PB0)
P_FELLE_INGEN = (UTLEGG6 - (SHORT - PA0 + 2 * PB0)) / (PA0 - 2 * PB0)
TOL6 = 0.003
for felle in (P_FELLE_100, P_FELLE_HELT, P_FELLE_INGEN):
    assert abs(felle - PDEAL) / PDEAL > TOL6, felle
assert abs(SHORT - SUKSESS) / SUKSESS > TOL6           # ingen rente på innskuddet
# faktoren rundet til 4 desimaler, og enkel rente (1 + r_f T)
F6_RUND = round(F6, 4)
P_RUND = (UTLEGG6 * F6_RUND - (SHORT * F6_RUND - PA0 + 2 * PB0)) / (PA0 - 2 * PB0)
F6_ENKEL = 1 + RF6 * T6
P_ENKEL = (UTLEGG6 * F6_ENKEL - (SHORT * F6_ENKEL - PA0 + 2 * PB0)) / (PA0 - 2 * PB0)
DVA = NA * (PA1 - PA0)
DVB = NB * (PB1 - PB0)
DV_SUM = DVA + DVB
assert DVA < 0 < DVB and DV_SUM < 0

# ================================================================== tekstene
# ---------------------------------------------------------------- E1
e1 = {
    "n": 1,
    "title": "Governance",
    "points": 10,
    "topic": "Corporate governance",
    "chapters": [27],
    "merke": "Som H2025 E2, i formen fra forelesning 17 · governance som teori 90 %",
    "body": P(
        "You manage Gudenå Pension, a Danish pension fund that has just become the largest "
        "shareholder, with 9% of the votes, in Kallmar Robotics Inc., a widely held company "
        "listed in New York. Its board has just hired a new CEO from outside.",
        "As the largest owner, you want the new CEO to act in the shareholders' interest without "
        "scaring the CEO into avoiding every risk. Select three measures you would push for and "
        "explain each in 2–3 sentences: how it works and why it fits Kallmar (3 points each). "
        "Then add one sentence on how one of your measures could backfire if pushed too far "
        "(1 point).",
    ),
    "solution": P(
        "<b>1. Pay the new CEO in long-term shares.</b> A large part of the pay comes as "
        "restricted shares that vest over four to five years, with a clawback if results are "
        "later restated. The new CEO arrives with no stake in Kallmar, so this makes the CEO gain "
        "and lose with the long-run share price, just like the fund. Shares reward sensible "
        "long-term risks without paying for pure gambles as many options would; a solid fixed "
        "salary means one bad year does not ruin the CEO, so the CEO is not scared away from all "
        "risk.",
        "<b>2. Make the board independent.</b> With 9% of the votes the fund can nominate one or "
        "two independent directors to a board of about 7 to 11 and push for a chair who is not the "
        "CEO, with independent pay, audit and nomination committees. Such a board can question "
        "the new CEO's plans, set the pay and replace the CEO without personal ties getting in "
        "the way; the lecture calls an independent board «one of the first check marks» "
        "(recording 17, 1:19:39).",
        "<b>3. Transparency and a reason for the other owners to vote.</b> Kallmar reports clear "
        "targets every quarter and holds an annual investor meeting where the largest holders "
        "question the CEO, while proxy access in the bylaws lets large owners nominate directors. "
        "Thousands of small investors cannot be made to vote, but the institutions can be drawn "
        "in by meetings and direct contact (recording 17, 1:21:03 to 1:21:51), so the CEO knows "
        "that the owners are watching.",
        "<b>Backfire (1 point).</b> If the fund monitors too tightly, for example by asking the "
        "board to approve every investment, the CEO will do only the safest minimum and new "
        "robotics projects will not be started (recording 17, 1:17:10).",
        "<b>Why the setting matters.</b> The fund captures 9% of any value it creates, so "
        "monitoring pays for it, while the small holders free-ride. That is why the fund, not "
        "the dispersed owners, has to drive all three measures.",
        "<b>Also accepted.</b> Options with their drawback (they reward risk); a bonus on targets "
        "that cannot be gamed (an EPS target met through a buyback does not count); a golden "
        "parachute if Kallmar needs the CEO to take R&amp;D risk; limits on perks; a shareholder "
        "proposal; an activist campaign if the CEO underperforms. As in Kurbatov's H2025 key, any "
        "reasonable measure with an explanation earns the points.",
    ),
    "criteria": [
        "Three distinct measures, 2–3 sentences each, 3 points each: 1 for the measure, 1 for how "
        "it makes the CEO act in the shareholders' interest and 1 for why it fits Kallmar "
        "(dispersed owners, a 9% holder, a new CEO from outside).",
        "Any reasonable measure with an explanation is accepted (as in the H2025 key). Typical: "
        "long-term equity pay or clawbacks, an independent board and committees, a chair who is "
        "not the CEO, transparency and regular reporting, investor meetings, proxy access in the "
        "bylaws, a shareholder proposal.",
        "«Make the shareholders vote» earns full points only with a concrete how (meetings for the "
        "institutions, communication, proxy access); small owners cannot be forced to vote "
        "(recording 17, 1:20:22 to 1:21:51).",
        "Two versions of the same tool with the same argument count once.",
        "1 point for the backfire sentence: monitoring that is too tight makes the CEO passive, "
        "options reward excessive risk, a large owner may push its own aims or similar.",
        "Board size: an argument for about 7 to 11 directors is accepted; «a smaller board works "
        "better» alone is not.",
    ],
}
svar(1, "", {"type": "tekst"})

# ---------------------------------------------------------------- E2
e2 = {
    "n": 2,
    "title": "Capital Structure",
    "points": 10,
    "topic": "Capital structure",
    "chapters": [6, 7, 8, 9, 10, 11],
    "merke": "Teorispørsmålet varslet i forelesning 3 · kapitalstruktur verbalt 25 %",
    "body": P(
        "Modigliani and Miller show that in a perfect capital market the value of a firm does "
        "not depend on how it is financed. Real firms clearly care about their capital "
        "structure: most of them borrow, but few borrow as much as they could.",
        "Choose three assumptions behind the MM result that fail in practice. For each, name the "
        "assumption and explain in 1–2 sentences what its failure implies for how much debt a "
        "firm should use (3 points each). Finish with one sentence that combines your three "
        "points into a conclusion about the amount of debt (1 point).",
    ),
    "solution": P(
        "<b>1. No taxes.</b> Interest is deducted before corporate tax, so debt creates a tax "
        "shield (τ<sub>c</sub>D for permanent debt) that the government pays for. On its own "
        "this pushes towards more debt, all the way to 100%.",
        "<b>2. No costs of financial distress.</b> A firm that cannot pay its creditors loses "
        "value through legal costs and, more importantly, through indirect costs: assets sold in "
        "a fire sale at a heavy discount (land worth 10 million sold for 7 million in the "
        "lecture's example, recording 04, 8:16) and lost customers and suppliers. These expected "
        "costs rise with leverage, so they push towards less debt, most of all for firms with "
        "illiquid or intangible assets.",
        "<b>3. No agency costs (investment does not depend on financing).</b> With risky debt, "
        "shareholders gain from risky projects at the creditors' expense (risk shifting, a wealth "
        "transfer) and may forgo positive-NPV projects whose gains would go to the creditors "
        "(debt overhang); creditors foresee this and charge for it. This pushes towards less "
        "debt, although some debt also disciplines managers who would otherwise waste free cash "
        "flow.",
        "<b>Conclusion (1 point).</b> The best amount of debt trades the tax shield (and the "
        "discipline) against the expected costs of distress and the agency costs, so it lies "
        "between zero and 100% and is higher for stable, profitable firms with tangible assets.",
        "<b>Also accepted.</b> Asymmetric information (an equity issue signals overvaluation, so "
        "firms prefer internal funds, then debt, then equity); transaction and issue costs; "
        "markets that are not efficient or investors who are not rational; personal taxes on "
        "interest. Each earns full points only if it says what it implies for the amount of "
        "debt.",
    ),
    "criteria": [
        "Three distinct assumptions, 3 points each: 1 for naming the assumption and 2 for what its "
        "failure implies for the amount of debt, with the mechanism. A name alone («taxes») earns "
        "at most 1.",
        "Taxes: the interest tax shield favours debt. Distress: direct and indirect costs (fire "
        "sales, lost customers and suppliers) rise with leverage and favour less debt. Agency: "
        "risk shifting and debt overhang favour less debt; the discipline that debt puts on free "
        "cash flow is a benefit.",
        "Also accepted with a consequence for debt: asymmetric information (pecking order), "
        "transaction or issue costs, inefficient markets or irrational investors, personal taxes. "
        "When the question was asked in class, transaction costs, search costs and insider "
        "knowledge were all accepted (recording 03, 10:04 to 11:45).",
        "Direct and indirect costs of distress count as one assumption; risk shifting and debt "
        "overhang count as one (agency costs).",
        "1 point for the conclusion: an optimum between no debt and all debt, where the benefits "
        "are traded against the costs. The name «trade-off theory» is not required. «Debt is "
        "good» or «debt is bad» alone earns nothing.",
        "«Uncertainty» alone is not a failed assumption: uncertainty exists in the MM world too "
        "(recording 03, 11:15).",
    ],
}
svar(2, "", {"type": "tekst"})

# ---------------------------------------------------------------- E3
e3_body = P(
    f"Sørvær Logistikk ASA has {f(N0, 0)} million shares outstanding at NOK {f(P0, 0)} per share "
    f"and NOK {f(D0, 0)} million of debt. The debt is risk-free with an expected return equal to "
    f"the risk-free rate of {pc(RD3, 1)}. The equity cost of capital is {pc(RE0, 1)}. Unless "
    "stated otherwise, the firm operates in a perfect capital market with no taxes (the MM "
    "propositions hold)."
)
e3a = {
    "label": "a", "points": 3,
    "body": P("What is the unlevered cost of capital (r<sub>U</sub>) of the firm?"),
    "solution": P(
        f"<b>Step 1. Market values.</b> E = {f(N0, 0)} × {f(P0, 0)} = NOK {f(E0, 0)} million, so "
        f"V = E + D = {f(E0, 0)} + {f(D0, 0)} = NOK {f(V3, 0)} million.",
        f"<b>Step 2. Weight the two returns.</b> With no taxes r<sub>U</sub> is the pre-tax WACC:<br>"
        f"r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = ({f(E0, 0)}/{f(V3, 0)}) × "
        f"{pc(RE0, 1)} + ({f(D0, 0)}/{f(V3, 0)}) × {pc(RD3, 1)}<br>"
        f"= {f(E0 / V3 * RE0, 6)} + {f(D0 / V3 * RD3, 6)} = <b>{f(RU3, 6)} ({pc(RU3)})</b>",
    ),
    "criteria": [
        f"Market values: E = 40 × 85 = {f(E0, 0)} and V = {f(V3, 0)}.",
        "Weights E/V and D/V from market values, r_D = r_f = 3.5% because the debt is risk-free.",
        f"r_U = {pc(RU3)}.",
        "Show the calculation.",
    ],
}
svar(3, "a", {"type": "tall", "tall": [tall("r<sub>U</sub>", 100 * RU3, "%")]})

e3b = {
    "label": "b", "points": 4,
    "body": P(
        "The board announces that the firm will borrow more and use all the new debt, which is "
        "also risk-free, to repurchase shares so that its debt-to-equity ratio becomes 0.8.",
        "How much new debt will the firm issue? What happens to the share price at the "
        "announcement? How many shares will be repurchased?",
    ),
    "solution": P(
        f"<b>Step 1. Value and price.</b> There are no taxes or other frictions, so MM I holds: "
        f"the recapitalisation only re-slices the same cash flows. V stays at NOK {f(V3, 0)} "
        f"million and <b>the share price stays at NOK {f(P0, 2)}</b> on the announcement.",
        f"<b>Step 2. New debt.</b> D/E = 0.8 means D/V = 0.8/1.8 = {f(D_MAL / V3)}, so the target "
        f"is D = {f(D_MAL / V3)} × {f(V3, 0)} = NOK {f(D_MAL, 0)} million. The firm already has "
        f"{f(D0, 0)}, so it issues <b>NOK {f(NY_D, 0)} million</b> of new debt.",
        f"<b>Step 3. Shares repurchased.</b> At the unchanged price: {f(NY_D, 0)}/{f(P0, 0)} = "
        f"<b>{f(N_KJOP)} million shares</b>, leaving {f(N0, 0)} − {f(N_KJOP)} = {f(N_IGJEN)} "
        "million.",
        f"<b>Check.</b> E = {f(V3, 0)} − {f(D_MAL, 0)} = {f(E_ETTER, 0)} over {f(N_IGJEN)} million "
        f"shares = NOK {f(E_ETTER / N_IGJEN, 2)} ✓. The two-equation route gives the same: "
        f"N × P = {f(NY_D, 0)} and ({f(N0, 0)} − N) × P = {f(E_ETTER, 0)}, so {f(N0, 0)}P = "
        f"{f(E0, 0)} and P = {f(P0, 2)} (recording 05, 1:09:02).",
    ),
    "criteria": [
        "Converts D/E = 0.8 into D/V = 0.4444 (or solves D = 0.8E with D + E = 4,500): target D = "
        f"{f(D_MAL, 0)}, new debt {f(NY_D, 0)}. Using 0.8 as D/V (D = 3,600) is the trap.",
        "Share price unchanged at NOK 85 on the announcement, with the reason: MM I, no tax "
        "shield or other value is created.",
        f"Shares repurchased = 900/85 = {f(N_KJOP)} million.",
        "New debt, not total debt: answering 2,000 ignores the 1,100 already outstanding.",
    ],
}
svar(3, "b", {"type": "tall", "tall": [
    tall("New debt issued", NY_D, "NOK m"),
    tall("Share price after the announcement", P0, "NOK per share"),
    tall("Shares repurchased", N_KJOP, "m shares"),
]})

e3c = {
    "label": "c", "points": 3,
    "body": P("What is the equity cost of capital after the recapitalisation?"),
    "solution": P(
        "MM II with the new D/E of 0.8 (D = 2,000, E = 2,500) and r<sub>D</sub> = r<sub>f</sub>:",
        f"r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = {pc(RU3)} + "
        f"0.8 × ({pc(RU3)} − {pc(RD3)}) = {pc(RU3)} + {pc(DE_MAL * (RU3 - RD3))} = "
        f"<b>{pc(RE1)}</b>",
        f"<b>Check.</b> (2,500/4,500) × {pc(RE1)} + (2,000/4,500) × {pc(RD3)} = "
        f"{pc(E_ETTER / V3 * RE1)} + {pc(D_MAL / V3 * RD3)} = {pc(RU3)} = r<sub>U</sub> ✓. This "
        "identity holds once r<sub>E</sub> came from MM II, so it only catches arithmetic slips.",
    ),
    "criteria": [
        "MM II with D/E = 0.8, not D/V. Using D/V = 0.4444 gives "
        f"{pc(RE1_FELLE_DV, 2)} and is the D/E-versus-D/V trap.",
        "r_D = 3.5% because the debt stays risk-free.",
        f"r_E = {pc(RE1)}.",
    ],
}
svar(3, "c", {"type": "tall", "tall": [
    tall("New r<sub>E</sub>", 100 * RE1, "%"),
]})

e3d = {
    "label": "d", "points": 3,
    "body": P("The CFO notes that earnings per share will rise after the buyback. Are the "
              "shareholders who keep their shares better off than before? Are they better or "
              "worse off than those who sold? Explain briefly."),
    "solution": P(
        f"<b>Nobody is better or worse off.</b> In a perfect market the recapitalisation only "
        f"re-slices the same cash flows (MM I). The price stays at NOK {f(P0, 0)}, so a seller "
        f"gets NOK {f(P0, 0)} in cash and a holder keeps a share worth NOK {f(P0, 0)}.",
        f"<b>Why the higher EPS does not help.</b> EPS rises because each remaining share now "
        f"carries more debt, but so does its risk: r<sub>E</sub> rises from {pc(RE0, 1)} to "
        f"{pc(RE1)}, exactly enough to leave the price unchanged. A holder who wanted the old risk "
        "could undo the extra leverage by buying some of the firm's debt (homemade leverage).",
        f"<b>The numbers behind it (not required).</b> If the assets earn a constant FCF forever, "
        f"FCF = r<sub>U</sub> × V = {f(RU3, 6)} × {f(V3, 0)} = NOK {f(FCF3, 2)} million a year. "
        f"EPS before = ({f(FCF3, 2)} − {f(RD3 * D0, 2)})/{f(N0, 0)} = NOK {f(EPS0, 4)}; EPS after "
        f"= ({f(FCF3, 2)} − {f(RD3 * D_MAL, 2)})/{f(N_IGJEN)} = NOK {f(EPS1)}. Price = EPS/r<sub>E</sub>: "
        f"{f(EPS0, 2)}/{f(RE0, 3)} = {f(EPS0 / RE0, 2)} and {f(EPS1)}/{f(RE1, 6)} = "
        f"{f(EPS1 / RE1, 2)}.",
    ),
    "criteria": [
        "Holders are not better off than before: the price is unchanged at 85 (MM I).",
        "Holders and sellers are equally well off: 85 in cash or a share worth 85.",
        "Explains why the higher EPS does not raise the price: the equity is riskier, so r_E "
        "rises (MM II) and the higher EPS is discounted at a higher rate.",
        "Homemade leverage or the EPS numbers are a bonus, not a requirement.",
    ],
}
svar(3, "d", {"type": "tekst"})

e3e = {
    "label": "e", "points": 4,
    "body": P(
        f"Now assume instead that Sørvær pays {pc(TAU3, 0)} corporate tax and announces, as a "
        f"surprise, NOK {f(D_NY_SKATT, 0)} million of new permanent debt, all used to repurchase "
        f"shares. All debt stays risk-free; the price of NOK {f(P0, 0)} already reflects the tax "
        "shield on the existing debt.",
        "What is the present value of the tax shield on the new debt? What is the share price "
        "right after the announcement?",
    ),
    "solution": P(
        f"<b>Step 1. PV of the tax shield.</b> The new debt is permanent and risk-free, so it "
        f"saves τ<sub>c</sub> × r<sub>D</sub> × D = {f(TAU3, 2)} × {f(RD3, 3)} × "
        f"{f(D_NY_SKATT, 0)} = NOK {f(TS_AAR, 2)} million of tax every year forever. Discounted at "
        f"r<sub>D</sub>: PV(TS) = {f(TS_AAR, 2)}/{f(RD3, 3)} = τ<sub>c</sub>D = {f(TAU3, 2)} × "
        f"{f(D_NY_SKATT, 0)} = <b>NOK {f(PVTS3, 0)} million</b>.",
        f"<b>Step 2. Price at the announcement.</b> The market prices the shield as soon as the "
        f"plan is known, before a single share is bought back. The gain goes to the current "
        f"{f(N0, 0)} million shares: E = {f(E0, 0)} + {f(PVTS3, 0)} = {f(E0 + PVTS3, 0)}, so "
        f"P = {f(E0 + PVTS3, 0)}/{f(N0, 0)} = <b>NOK {f(P_SKATT, 2)}</b>, a jump of "
        f"{f(PVTS3, 0)}/{f(N0, 0)} = NOK {f(HOPP, 2)}.",
        "Compare (b): without taxes the price did not move because nothing of value was created. "
        "Here the price jumps on the announcement, not on the buyback.",
    ),
    "criteria": [
        f"PV(TS) = τD = 0.22 × 1,200 = {f(PVTS3, 0)}, because the debt is permanent (the yearly "
        f"shield of {f(TS_AAR, 2)} discounted at r_D). Reporting only the yearly shield is the "
        "trap.",
        f"Price after the announcement = (3,400 + 264)/40 = {f(P_SKATT, 2)}: the whole gain goes to "
        "the shares outstanding at the announcement.",
        "States that the price jumps at the announcement, before the buyback (efficient market).",
        "Show the calculation.",
    ],
}
svar(3, "e", {"type": "tall", "tall": [
    tall("PV of the tax shield on the new debt", PVTS3, "NOK m"),
    tall("Share price after the announcement", P_SKATT, "NOK per share"),
]})

e3f = {
    "label": "f", "points": 3,
    "body": P("How many shares will be repurchased? Who captures the value of the tax shield? "
              "Explain briefly."),
    "solution": P(
        f"<b>Shares repurchased.</b> The buyback happens at the new price: {f(D_NY_SKATT, 0)}/"
        f"{f(P_SKATT, 2)} = <b>{f(N_KJOP_S)} million shares</b>, leaving {f(N0, 0)} − "
        f"{f(N_KJOP_S)} = {f(N_IGJEN_S)} million.",
        f"<b>Check.</b> After the buyback V<sup>L</sup> = {f(V3, 0)} + {f(PVTS3, 0)} = "
        f"{f(VL_S, 0)} and D = {f(D0, 0)} + {f(D_NY_SKATT, 0)} = {f(D0 + D_NY_SKATT, 0)}, so "
        f"E = {f(E_S, 0)} and {f(E_S, 0)}/{f(N_IGJEN_S)} = NOK {f(E_S / N_IGJEN_S, 2)} ✓.",
        f"<b>Who captures the gain.</b> All the shareholders at the announcement, in proportion "
        f"to their shares: NOK {f(HOPP, 2)} per share, whether they sell (at {f(P_SKATT, 2)}) or "
        f"keep a share worth {f(P_SKATT, 2)}. The value comes from the government, which collects "
        f"less tax. Dividing by the old price ({f(D_NY_SKATT, 0)}/{f(P0, 0)} = "
        f"{f(N_KJOP_FELLE)} million) is the classic error: once the plan is known, nobody sells "
        "for less than the new price (recording 03, 1:00:49 to 1:01:38).",
    ),
    "criteria": [
        f"Shares repurchased at the new price: 1,200/91.60 = {f(N_KJOP_S)} million. Dividing by "
        "85 is the classic error.",
        "The existing shareholders capture the whole gain at the announcement, sellers and "
        "holders alike (NOK 6.60 per share).",
        "Bonus, not required: the value comes from lower taxes paid to the government.",
    ],
}
svar(3, "f", {"type": "blandet", "tall": [
    tall("Shares repurchased", N_KJOP_S, "m shares"),
], "tallPoeng": 1.5, "tekstLedd": "Who captures the value of the tax shield? Explain briefly.",
    "merknad": f"Fellen 1200/85 = {N_KJOP_FELLE:.4f} (gammel kurs) ligger 7,8 % unna og avvises."})

e3 = {
    "n": 3, "title": "Recapitalisation", "points": 20, "topic": "Recapitalisation",
    "chapters": [6, 7, 15],
    "merke": "Som H2024 E3 og H2025 E3, med en vri til slutt · MM-rekapitalisering 70 %",
    "body": e3_body, "parts": [e3a, e3b, e3c, e3d, e3e, e3f],
}

# ---------------------------------------------------------------- E4
e4_body = P(
    "Norrfjäll Verkstad AB (existing free cash flow SEK 85 million a year, unaffected) is "
    "evaluating a new production line for wind-turbine gearboxes.",
    f"The line costs SEK {f(KAPEX0, 0)} million paid today (t = 0) and needs net working "
    f"capital of SEK {f(NWC0, 0)} million from today. In Year 1 it has revenue of SEK "
    f"{f(REV1, 0)} million, operating costs (excluding depreciation) of {pc(KOST, 0)} of revenue "
    f"and depreciation equal to maintenance capital expenditure, {pc(AVS_ANDEL, 0)} of revenue. "
    "All of these grow by 2% a year forever, as does net working capital (9 × 1.02 at t = 1). "
    f"The tax rate is {pc(TAU4, 1)}.",
    f"The line keeps a constant debt-to-value ratio of {pc(DV4, 0)} at a cost of debt of "
    f"{pc(RD4, 0)}. Klarälven Precision AB, a listed firm with the same business risk, has an "
    f"equity beta of {f(BE_T, 2)}, a debt-to-equity ratio of {f(DE_T, 1)} and a cost of debt of "
    f"{pc(RD_T, 1)}. The risk-free rate is {pc(RF4, 0)} and the expected market return is "
    f"{pc(RM4, 0)}.",
)
e4a = {
    "label": "a", "points": 3,
    "body": P("What is the line's free cash flow in Year 1? What is the total cash outlay at t = 0?"),
    "solution": P(
        "<b>Step 1. EBIT and taxes.</b> " + tabell(
            ["Year 1", "SEK million"],
            [["Revenue", f(REV1, 3)],
             ["Operating costs (62%)", f(-KOST1, 3)],
             ["Depreciation (8%)", f(-AVS1, 3)],
             ["EBIT", f(EBIT1, 3)],
             [f"EBIT × (1 − {f(TAU4, 3)})", f(NOPAT1, 3)],
             ["+ Depreciation", f(AVS1, 3)],
             ["− Capital expenditure", f(-CAPEX1, 3)],
             [f"− ΔNWC = 9 × 1.02 − 9", f(-DNWC1, 3)],
             ["<b>FCF<sub>1</sub></b>", f"<b>{f(FCF1, 3)}</b>"]]),
        f"FCF<sub>1</sub> = {f(EBIT1, 1)} × {f(1 - TAU4, 3)} + {f(AVS1, 1)} − {f(CAPEX1, 1)} − "
        f"{f(DNWC1, 2)} = <b>SEK {f(FCF1, 3)} million</b>. Only the change in working capital "
        "enters, not its level: «one of the biggest fallacies would be forgetting the delta» "
        "(recording 18, 12:44).",
        f"<b>Step 2. Outlay at t = 0.</b> The machine and the first working capital: "
        f"{f(KAPEX0, 0)} + {f(NWC0, 0)} = <b>SEK {f(UTLEGG, 0)} million</b>.",
        "Norrfjäll's existing FCF of 85 is not part of the line and plays no role (recording 18, "
        "6:41).",
    ),
    "criteria": [
        "FCF = EBIT(1 − τ) + Dep − CapEx − ΔNWC, with depreciation added back and the 20.6% tax "
        "on EBIT.",
        f"ΔNWC in Year 1 = 9 × 1.02 − 9 = 0.18, not the level 9.18 (which gives "
        f"{f(FCF1_FELLE_NIVAA, 3)}).",
        f"FCF_1 = {f(FCF1, 3)} and outlay at t = 0 = 225 + 9 = {f(UTLEGG, 0)}.",
        "Uses only the line's cash flows: the existing FCF of 85 is irrelevant.",
    ],
}
svar(4, "a", {"type": "tall", "tall": [
    tall("FCF<sub>1</sub>", FCF1, "SEK m"),
    tall("Cash outlay at t = 0", UTLEGG, "SEK m", alt=[-UTLEGG]),
], "merknad": "alt: utlegget skrevet som negativ kontantstrøm (−234) godtas."})

e4b = {
    "label": "b", "points": 3,
    "body": P("Find the debt beta of Klarälven and the unlevered cost of capital (r<sub>U</sub>) "
              "of the line."),
    "solution": P(
        f"<b>Step 1. Debt beta from the CAPM.</b> β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/"
        f"(E[R<sub>Mkt</sub>] − r<sub>f</sub>) = ({pc(RD_T, 1)} − {pc(RF4, 0)})/({pc(RM4, 0)} − "
        f"{pc(RF4, 0)}) = <b>{f(BD_T)}</b>.",
        f"<b>Step 2. Unlever.</b> D/E = 0.5 gives D/V = 0.5/1.5 = {f(WD_T)} and E/V = {f(WE_T)}:<br>"
        f"β<sub>U</sub> = {f(WE_T)} × {f(BE_T, 2)} + {f(WD_T)} × {f(BD_T, 2)} = {f(WE_T * BE_T)} + "
        f"{f(WD_T * BD_T)} = {f(BU)}<br>"
        f"r<sub>U</sub> = {pc(RF4, 0)} + {f(BU)} × {pc(MRP4, 0)} = <b>{pc(RU4)}</b>",
        f"<b>Same answer through returns.</b> r<sub>E</sub> of Klarälven = 3% + 1.30 × 5% = "
        f"{pc(RE_T, 1)}, so r<sub>U</sub> = {f(WE_T)} × {pc(RE_T, 1)} + {f(WD_T)} × "
        f"{pc(RD_T, 1)} = {pc(RU4)} ✓. The line has the same business risk, so it has the same "
        "r<sub>U</sub>. No tax enters r<sub>U</sub>.",
    ),
    "criteria": [
        f"β_D = (4.5% − 3%)/5% = {f(BD_T, 2)}; the market risk premium is 5%, not 8%.",
        "D/E = 0.5 converted to D/V = 1/3 before weighting.",
        f"r_U = {pc(RU4)} through betas or returns; no (1 − τ) in r_U.",
        "Setting β_D = 0 although r_D > r_f understates r_U.",
    ],
}
svar(4, "b", {"type": "tall", "tall": [
    tall("β<sub>D</sub> of Klarälven", BD_T, ""),
    tall("r<sub>U</sub>", 100 * RU4, "%"),
]})

e4c = {
    "label": "c", "points": 3,
    "body": P("Find the line's equity cost of capital and its after-tax WACC (r<sub>wacc</sub>)."),
    "solution": P(
        f"<b>Step 1. r<sub>E</sub> with the line's own leverage.</b> D/V = 0.40 gives D/E = "
        f"0.40/0.60 = {f(DV4 / (1 - DV4))}; the line borrows at its own r<sub>D</sub> of 5%:<br>"
        f"r<sub>E</sub> = {pc(RU4)} + {f(DV4 / (1 - DV4))} × ({pc(RU4)} − {pc(RD4, 0)}) = "
        f"{pc(RU4)} + {pc(DV4 / (1 - DV4) * (RU4 - RD4))} = <b>{pc(RE4)}</b>",
        f"<b>Step 2. After-tax WACC.</b> r<sub>wacc</sub> = 0.60 × {pc(RE4)} + 0.40 × "
        f"{pc(RD4, 0)} × (1 − {f(TAU4, 3)}) = {pc(0.6 * RE4)} + {pc(DV4 * RD4 * (1 - TAU4))} = "
        f"<b>{pc(RW4)}</b>",
        f"<b>Quick check.</b> r<sub>U</sub> − d·τ<sub>c</sub>·r<sub>D</sub> = {pc(RU4)} − 0.40 × "
        f"{f(TAU4, 3)} × {pc(RD4, 0)} = {pc(RU4)} − {pc(GAP4)} = {pc(RW4)} ✓ (an identity that "
        "catches arithmetic slips).",
        f"<b>The traps.</b> Klarälven's D/E of 0.5 gives r<sub>E</sub> = {pc(RE4_FELLE_DE, 2)} and "
        f"r<sub>wacc</sub> = {pc(RW4_FELLE_DE, 2)}; Klarälven's r<sub>D</sub> of 4.5% gives "
        f"r<sub>wacc</sub> = {pc(RW4_FELLE_RD, 2)}. Both describe Klarälven's financing, not the line's.",
    ),
    "criteria": [
        "Uses the line's own D/V of 40% (D/E = 0.6667) and its own r_D of 5%, not Klarälven's "
        "0.5 and 4.5%.",
        f"r_E = {pc(RE4)} from MM II.",
        f"r_wacc = {pc(RW4)}, with (1 − τ) on r_D only.",
        "Weights 0.6 and 0.4; using D/E = 0.6667 as a weight is the trap.",
    ],
}
svar(4, "c", {"type": "tall", "tall": [
    tall("r<sub>E</sub> of the line", 100 * RE4, "%", tol=TOL4C),
    tall("r<sub>wacc</sub>", 100 * RW4, "%", tol=TOL4C),
], "merknad": f"tol 0,3 %: Klarälvens D/E gir {100 * RE4_FELLE_DE:.4f} og {100 * RW4_FELLE_DE:.4f}, Klarälvens r_D gir {100 * RW4_FELLE_RD:.4f}; alle avvises. r_U rundet til 0,0783 gir {100 * K_RUND['re']:.4f} og {100 * K_RUND['rw']:.4f} og godtas."})

e4d = {
    "label": "d", "points": 3,
    "body": P("What is the NPV of the line using the WACC method?"),
    "solution": P(
        f"<b>Step 1. Value of the future cash flows.</b> FCF grows at 2% forever, so "
        f"V<sup>L</sup><sub>0</sub> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g) = {f(FCF1, 3)}/"
        f"({f(RW4, 6)} − 0.02) = {f(FCF1, 3)}/{f(RW4 - G4, 6)} = SEK {f(VL4)} million.",
        f"<b>Step 2. NPV.</b> NPV = V<sup>L</sup><sub>0</sub> − outlay = {f(VL4)} − {f(UTLEGG, 0)} "
        f"= <b>SEK {f(NPV4)} million</b>. The line is worth doing.",
        "The question asks for the project's NPV: V<sup>L</sup> alone (the PV) or a value for "
        "Norrfjäll as a whole does not answer it («if it says evaluate the project, I want the NPV "
        "of the project», recording 18, 7:13).",
    ),
    "criteria": [
        "Growing perpetuity at r_wacc − g with FCF_1 (not FCF_0).",
        f"V^L = {f(VL4)} and NPV = {f(NPV4)} after subtracting the outlay of 234, including the "
        "working capital.",
        "Reporting the PV (260.31) or adding the existing business loses the points for NPV.",
    ],
}
svar(4, "d", {"type": "tall", "tall": [
    tall("NPV (WACC method)", NPV4, "SEK m"),
]})

e4e = {
    "label": "e", "points": 5,
    "body": P("What is the line's debt capacity today? Using this debt, find the NPV of the line "
              "with the APV method."),
    "solution": P(
        f"<b>Step 1. Debt capacity.</b> Debt is 40% of the value of the line's future cash flows: "
        f"D<sub>0</sub> = 0.40 × V<sup>L</sup><sub>0</sub> = 0.40 × {f(VL4)} = <b>SEK {f(DK0)} "
        "million</b>. It is a share of the PV, not of the NPV and not of Norrfjäll as a whole. As "
        f"the line's value grows at 2%, so does the debt (D<sub>1</sub> = {f(DK1)}).",
        f"<b>Step 2. Unlevered value.</b> V<sup>U</sup> = {f(FCF1, 3)}/({f(RU4, 6)} − 0.02) = "
        f"{f(FCF1, 3)}/{f(RU4 - G4, 6)} = SEK {f(VU4)} million.",
        f"<b>Step 3. Tax shields.</b> TS<sub>1</sub> = τ<sub>c</sub> × r<sub>D</sub> × "
        f"D<sub>0</sub> = {f(TAU4, 3)} × {f(RD4, 2)} × {f(DK0)} = {f(TS4)}. The shield grows "
        "at 2% with the debt. The debt is rebalanced to 40% of value, so the shield is as risky "
        "as the line's assets and is discounted at r<sub>U</sub>:<br>"
        f"PV(TS) = {f(TS4)}/({f(RU4, 6)} − 0.02) = <b>SEK {f(PVTS4)} million</b>",
        f"<b>Step 4. NPV.</b> V<sup>L</sup> = {f(VU4)} + {f(PVTS4)} = {f(VU4 + PVTS4)}, so "
        f"NPV = {f(VU4 + PVTS4)} − {f(UTLEGG, 0)} = <b>SEK {f(NPV4_APV)} million</b>, the same as "
        "with the WACC method ✓.",
        f"<b>What the check can catch.</b> D<sub>0</sub> came from the WACC value, so the match is a "
        "fixed point rather than an independent valuation. It still catches the two errors that "
        f"happen: the wrong rate on the shield (at r<sub>D</sub>: {f(TS4)}/(0.05 − 0.02) = "
        f"{f(PVTS4_FELLE, 2)} and NPV {f(NPV4_FELLE_RD, 2)}) and arithmetic slips.",
    ),
    "criteria": [
        f"Debt capacity D_0 = 0.40 × V^L_0 = {f(DK0)}: 40% of the PV, not of the NPV "
        f"({f(D0_FELLE_NPV, 2)}).",
        f"V^U = FCF_1/(r_U − g) = {f(VU4)}.",
        f"PV(TS) = τ r_D D_0/(r_U − g) = {f(PVTS4)}, discounted at r_U because D/V is constant. "
        "Discounting at r_D is the trap; a shield without growth understates PV(TS).",
        f"NPV = V^U + PV(TS) − 234 = {f(NPV4_APV)}, equal to (d).",
    ],
}
svar(4, "e", {"type": "tall", "tall": [
    tall("Debt capacity at t = 0", DK0, "SEK m"),
    tall("PV(TS)", PVTS4, "SEK m"),
    tall("NPV (APV method)", NPV4_APV, "SEK m"),
], "merknad": f"Feller som avvises: gjeld som 40 % av NPV ({D0_FELLE_NPV:.4f}), skjoldet med r_D ({PVTS4_FELLE:.4f}, NPV {NPV4_FELLE_RD:.4f}), skjoldet uten vekst ({PVTS4_FELLE_KONST:.4f}). r_U rundet til 0,0783 gir NPV {K_RUND['npv_apv']:.4f} og godtas."})

e4f = {
    "label": "f", "points": 3,
    "body": P("A colleague says the line's free cash flows should simply be discounted at "
              "r<sub>U</sub>, since r<sub>U</sub> reflects the risk of the line's assets. Is the "
              "colleague right? What does the gap between r<sub>wacc</sub> and r<sub>U</sub> "
              "capture?"),
    "solution": P(
        f"<b>No.</b> r<sub>U</sub> prices the risk of the line's assets but ignores the interest "
        f"tax shield. Discounting the FCF at r<sub>U</sub> gives only V<sup>U</sup> = {f(VU4, 2)} "
        f"and an NPV of {f(NPV_RU, 2)}, which leaves out the PV(TS) of {f(PVTS4)} that the 40% "
        "debt brings.",
        f"<b>What the gap captures.</b> r<sub>wacc</sub> = r<sub>U</sub> − d·τ<sub>c</sub>·"
        f"r<sub>D</sub> = {pc(RU4)} − {pc(GAP4)} = {pc(RW4)}. The {f(100 * GAP4)} percentage "
        "points are the tax shield written as a lower discount rate: the only difference between "
        "the two is the (1 − τ<sub>c</sub>) on the cost of debt (recording 08, 1:24:02). APV makes "
        "the same correction by adding PV(TS) separately. The colleague would be right only for a "
        "line financed with equity alone, or without corporate tax.",
    ),
    "criteria": [
        "No: r_U ignores the tax benefit of debt, so discounting at r_U gives V^U and understates "
        "the line's value and NPV.",
        "The gap r_U − r_wacc = d·τ·r_D (0.412 percentage points) is the tax shield built into the "
        "discount rate; the only difference is (1 − τ) on r_D.",
        "Bonus: r_U is right for an all-equity line or for discounting the tax shield in APV.",
    ],
}
svar(4, "f", {"type": "tekst"})

e4 = {
    "n": 4, "title": "Valuation", "points": 20, "topic": "WACC and APV",
    "chapters": [2, 3, 4, 17, 18],
    "merke": "Som H2024 E5 og H2025 E4, men for et prosjekt · WACC og APV 80 %",
    "body": e4_body, "parts": [e4a, e4b, e4c, e4d, e4e, e4f],
}

# ---------------------------------------------------------------- E5
e5_body = P(
    f"Kuusijärvi Sahat Oy can build a new sawmill line for EUR {f(I5, 0)} million, paid when it "
    "is built. The line then produces a cash flow every year forever, starting on the day it is "
    "built (built today: first cash flow at t = 0; built in one year: first cash flow at t = 1).",
    f"At today's lumber price the line would earn EUR {f(C0, 0)} million at t = 0. At t = 1 the "
    "market settles in one of two states for good: from t = 1 on, the line earns EUR "
    f"{f(CU, 0)} million a year in the high state and EUR {f(CD, 0)} million a year in the low "
    "state. Once the state is known, all cash flows are certain. The risk-free rate is "
    f"{pc(RF5, 0)} a year and does not change.",
    f"Nobody knows the probabilities of the states. Shares in Pohjan Puu Oyj, a listed sawmill "
    f"company in the same market, trade at EUR {f(S0, 2)} today, just after this year's dividend was paid. "
    "Pohjan Puu pays out all its cash flow: from t = 1 on, its dividend is EUR "
    f"{f(DU, 2)} per share a year forever in the high state and EUR {f(DD, 2)} in the low state.",
)
e5a = {
    "label": "a", "points": 3,
    "body": P("Suppose you wait and build the line at t = 1. What is the NPV of the line at t = 1 "
              "in each state?"),
    "solution": P(
        "Built at t = 1, the line pays its first cash flow at once (at t = 1) and then every year "
        "forever. Its value at t = 1 is that cash flow plus a perpetuity from t = 2:",
        tabell(["State at t = 1", "Value at t = 1", "NPV at t = 1"],
               [["High", f"{f(CU, 0)} + {f(CU, 0)}/0.05 = {f(VU1, 2)}", f"<b>{sg(NPVU1, 2)}</b>"],
                ["Low", f"{f(CD, 0)} + {f(CD, 0)}/0.05 = {f(VD1, 2)}", f"<b>{sg(NPVD1, 2)}</b>"]]),
        "The cash flow on the build date is the trap the lecture flags for a project that starts "
        "at once: many students «would forget about year zero» (recording 14, 19:47). Without it "
        f"you get {f(CU / RF5 - I5, 0)} and {f(CD / RF5 - I5, 0)}.",
    ),
    "criteria": [
        "Includes the cash flow on the build date: value at t = 1 = C + C/0.05 = 21C.",
        f"High state: 273 − 180 = {sg(NPVU1, 0)}. Low state: 126 − 180 = {f(NPVD1, 0)}.",
        "Leaving out the t = 1 cash flow (80 and −60) is the trap.",
    ],
}
svar(5, "a", {"type": "tall", "tall": [
    tall("NPV at t = 1, high state", NPVU1, "EUR m"),
    tall("NPV at t = 1, low state", NPVD1, "EUR m"),
]})

e5b = {
    "label": "b", "points": 5,
    "body": P("What is the risk-neutral probability of the high state?"),
    "solution": P(
        "<b>Step 1. One traded claim, three values.</b> Risk-neutral valuation needs a traded "
        "asset with a price today and a value at t = 1 in each state, all for the same claim. The "
        f"Pohjan Puu share is that asset. Its price today, S<sub>0</sub> = {f(S0, 2)}, is "
        "ex-dividend: it buys the dividends from t = 1 on. At t = 1 the holder receives that "
        "year's dividend and still owns a share worth the remaining dividends:",
        f"S<sub>u</sub> = {f(DU, 2)} + {f(DU, 2)}/0.05 = {f(DU, 2)} + {f(DU / RF5, 2)} = "
        f"<b>{f(SU, 2)}</b><br>"
        f"S<sub>d</sub> = {f(DD, 2)} + {f(DD, 2)}/0.05 = {f(DD, 2)} + {f(DD / RF5, 2)} = "
        f"<b>{f(SD, 2)}</b>",
        f"<b>Step 2. The formula sheet.</b> ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/"
        f"(S<sub>u</sub> − S<sub>d</sub>) = (1.05 × {f(S0, 2)} − {f(SD, 2)})/({f(SU, 2)} − "
        f"{f(SD, 2)}) = ({f(1.05 * S0, 2)} − {f(SD, 2)})/{f(SU - SD, 2)} = "
        f"{f(1.05 * S0 - SD, 2)}/{f(SU - SD, 2)} = <b>{f(RHO)}</b>, so 1 − ρ = {f(1 - RHO)}.",
        f"<b>Check.</b> ρ lies between 0 and 1. Also [{f(RHO)} × {f(SU, 2)} + {f(1 - RHO)} × "
        f"{f(SD, 2)}]/1.05 = ({f(RHO * SU, 2)} + {f((1 - RHO) * SD, 2)})/1.05 = "
        f"{f(RHO * SU + (1 - RHO) * SD, 2)}/1.05 = {f(S0, 2)} returns today's price. This check "
        "cannot fail once ρ came from the same share, so it only catches slips. The real "
        "safeguard is step 1.",
        f"<b>An equivalent route at t = 0.</b> Value each dividend stream today: {f(S0, 0)} = "
        f"ρ × {f(DU, 2)}/0.05 + (1 − ρ) × {f(DD, 2)}/0.05 = {f(DU / RF5, 0)}ρ + "
        f"{f(DD / RF5, 0)}(1 − ρ), so ρ = ({f(S0, 0)} − {f(DD / RF5, 0)})/{f((DU - DD) / RF5, 0)} = "
        f"{f(RHO)}, the same answer, because C/0.05 today equals (C + C/0.05)/1.05.",
        f"<b>The trap.</b> Mixing the two routes, (1 + r<sub>f</sub>)S<sub>0</sub> with the "
        f"ex-dividend values {f(DU / RF5, 0)} and {f(DD / RF5, 0)}, gives ρ = "
        f"({f(1.05 * S0, 2)} − {f(DD / RF5, 0)})/{f((DU - DD) / RF5, 0)} = {f(RHO_FELLE)}. That also "
        "lies between 0 and 1, so only the rule catches it: values at t = 1 include the payment "
        "made then, as with the lecture's traded annuity (recording 14, 1:10:26). The share does "
        "not have to be a copy of the line: any traded claim on the same two states gives the "
        "same ρ.",
    ),
    "criteria": [
        f"S_u and S_d are values at t = 1 including the dividend paid then: {f(SU, 2)} and "
        f"{f(SD, 2)}. S_0 = 62.00 is the price of the same claim (dividends from t = 1).",
        f"ρ = (1.05 × 62 − 50.40)/(84 − 50.40) = {f(RHO)}.",
        f"The t = 0 route 62 = 80ρ + 48(1 − ρ) gives the same {f(RHO)} and is equally accepted. "
        f"{f(RHO_FELLE)} comes only from combining (1 + r_f)S_0 with the ex-dividend values 80 and "
        "48: wrong, although it lies between 0 and 1.",
        "Uses (1 + r_f)S_0, the certainty equivalent, not S_0. Replication with Δ shares and a "
        "bond is equally accepted.",
        "This part is the construction step: show the three values of the traded share and the "
        "formula.",
    ],
}
svar(5, "b", {"type": "tall", "tall": [
    tall("ρ (high state)", 100 * RHO, "%"),
], "merknad": f"Fellene (1 + r_f)S_0 mot 80/48 ({RHO_FELLE:.4f}) og 1 − ρ ({1 - RHO:.4f}) avvises."})

e5c = {
    "label": "c", "points": 3,
    "body": P("What is the NPV of building the line today?"),
    "solution": P(
        f"<b>Step 1. What building today gives.</b> You pay {f(I5, 0)} and receive {f(C0, 0)} at "
        f"once. From t = 1 the line pays {f(CU, 0)} or {f(CD, 0)} a year forever; at t = 1 that "
        f"stream is worth {f(VU1, 0)} or {f(VD1, 0)}, the values from (a) before the cost.",
        "<b>Step 2. Value the uncertain part with ρ.</b> Any claim on the two states is worth its "
        "risk-neutral expectation discounted at r<sub>f</sub>:<br>"
        f"[{f(RHO)} × {f(VU1, 0)} + {f(1 - RHO)} × {f(VD1, 0)}]/1.05 = ({f(RHO * VU1)} + "
        f"{f((1 - RHO) * VD1)})/1.05 = {f(RHO * VU1 + (1 - RHO) * VD1)}/1.05 = {f(PV5)}",
        f"<b>Step 3. NPV.</b> NPV<sub>0</sub> = −{f(I5, 0)} + {f(C0, 0)} + {f(PV5)} = "
        f"<b>{sg(NPV_NAA)}</b> (EUR million). Building today has a positive NPV.",
        f"Shortcut: a perpetuity of C from t = 1 is worth C/0.05 today, so {f(RHO)} × "
        f"{f(CU, 0)}/0.05 + {f(1 - RHO)} × {f(CD, 0)}/0.05 = {f(RHO * CU / RF5, 2)} + "
        f"{f((1 - RHO) * CD / RF5, 2)} = {f(PV5, 2)}. Forgetting the {f(C0, 0)} at t = 0 gives "
        f"{f(NPV_NAA_FELLE_C0, 2)}. Using 50/50 gives {f(NPV_NAA_FELLE_HALV, 2)} and has no basis: "
        "the probabilities are unknown; ρ is what the market prices with.",
    ),
    "criteria": [
        f"Includes today's cash flow of {f(C0, 0)} (the line starts at once).",
        "Values the cash flows from t = 1 with ρ and discounts at r_f (no real probabilities "
        "are available).",
        f"NPV = −180 + 9 + {f(PV5, 2)} = {sg(NPV_NAA)}.",
    ],
}
svar(5, "c", {"type": "tall", "tall": [
    tall("NPV of building today", NPV_NAA, "EUR m"),
]})

e5d = {
    "label": "d", "points": 3,
    "body": P("What is the NPV today of waiting one year and deciding then? Do you build today or "
              "wait? Briefly comment."),
    "solution": P(
        f"<b>Step 1. The decision at t = 1.</b> High state: build, {sg(NPVU1, 0)}. Low state: do "
        f"not build, since the line would lose {f(-NPVD1, 0)}; the payoff is <b>0</b>, not "
        f"{f(NPVD1, 0)}.",
        f"<b>Step 2. Value today.</b> NPV<sub>wait</sub> = [{f(RHO)} × {f(NPVU1, 0)} + "
        f"{f(1 - RHO)} × 0]/1.05 = {f(RHO * NPVU1)}/1.05 = <b>{f(NPV_VENT)}</b>.",
        f"<b>Decision: wait.</b> {f(NPV_VENT, 2)} &gt; {f(NPV_NAA, 2)}, so waiting is worth "
        f"{f(NPV_VENT, 2)} − {f(NPV_NAA, 2)} = {f(OPSJON, 2)} more than building today, even "
        f"though building today has a positive NPV. Waiting costs today's {f(C0, 0)} but saves "
        f"the interest on paying {f(I5, 0)} a year later ({f(I5, 0)} − {f(I5, 0)}/1.05 = "
        f"{f(RENTE_SPART)}), a net cost of only {f(KOST_VENT)}. In return you avoid building in "
        f"the low state, which is worth {f(1 - RHO)} × {f(-NPVD1, 0)}/1.05 = {f(VERN)} today: "
        f"{f(VERN)} − {f(KOST_VENT)} = {f(OPSJON, 2)} ✓.",
    ),
    "criteria": [
        "Compares the low state with 0 (you do not build), never with −54.",
        f"NPV_wait = ρ × 93/1.05 = {f(NPV_VENT)}.",
        "Decision: wait, because 38.75 > 10.25, although building today has a positive NPV.",
        "Comment: waiting gives up today's cash flow (net of the interest saved) but avoids "
        "committing to the low state. Naming the lost cash flow and the avoided downside is "
        "enough.",
    ],
}
svar(5, "d", {"type": "blandet", "tall": [
    tall("NPV today of waiting", NPV_VENT, "EUR m"),
], "tallPoeng": 2, "tekstLedd": "Do you build today or wait? Briefly comment.",
    "merknad": f"Fellen med −54 i den lave tilstanden gir {NPV_VENT_FELLE_NEG:.4f} og avvises."})

e5e = {
    "label": "e", "points": 3,
    "body": P("Let X be the line's yearly cash flow in the low state, all else unchanged. For "
              "which X are you indifferent between building today and waiting?"),
    "solution": P(
        "<b>Step 1. Both NPVs as functions of X.</b> A low-state stream of X from t = 1 is worth "
        "X + X/0.05 = 21X at t = 1. Building today:<br>"
        f"−180 + 9 + [{f(RHO)} × 273 + {f(1 - RHO)} × 21X]/1.05 = −171 + {f(RHO * VU1 / 1.05, 2)} "
        f"+ {f(B5, 2)}X = {f(A5, 2)} + {f(B5, 2)}X<br>"
        f"Waiting: you still skip the low state as long as 21X &lt; 180, so the value stays "
        f"{f(NPV_VENT, 2)}.",
        f"<b>Step 2. Set them equal.</b> {f(A5, 2)} + {f(B5, 2)}X = {f(NPV_VENT, 2)} ⇒ X = "
        f"{f(NPV_VENT - A5, 2)}/{f(B5, 2)} = <b>{f(X5)}</b> (EUR million a year).",
        f"<b>Check.</b> 21 × {f(X5)} = {f(FAKT * X5, 2)} &lt; 180, so at this X the low state is "
        "still rejected when you wait, as step 1 assumed. Quick route: waiting costs "
        f"{f(KOST_VENT)} (from (d)) and saves {f(1 - RHO)} × (180 − 21X)/1.05. Setting them equal "
        f"gives 180 − 21X = {f(KOST_VENT * 1.05 / (1 - RHO), 2)} and X = {f(X5)}.",
        f"<b>Reading it.</b> Building today beats waiting only if the low state is almost "
        f"break-even ({f(X5, 2)} against the {f(X_BRAKK, 2)} that covers the cost). With a real "
        "downside, the option to wait is worth more than the small cost of waiting. The static "
        f"break-even {f(X_BRAKK)} is not the answer: it ignores the net cost of waiting.",
    ),
    "criteria": [
        "Writes the NPV of building today as a function of X (low-state value 21X at t = 1, "
        "weighted by 1 − ρ) and keeps the waiting value at 38.75.",
        f"Solves {f(A5, 2)} + {f(B5, 2)}X = {f(NPV_VENT, 2)}: X = {f(X5)}. The static break-even "
        "180/21 = 8.5714 is not accepted.",
        "Checks that 21X < 180, so the low state is still rejected when waiting.",
    ],
}
svar(5, "e", {"type": "tall", "tall": [
    tall("X", X5, "EUR m", tol=TOL5E),
], "merknad": f"tol 0,2 %: den statiske nullpunktverdien 180/21 = {X_BRAKK:.4f} og fellen uten dagens kontantstrøm ({X5_FELLE_C0:.4f}) avvises; ρ rundet til 0,44 gir {X5_RUND:.4f} og godtas."})

e5f = {
    "label": "f", "points": 3,
    "body": P(f"What if the uncertainty about the future lumber price were very low, so that both "
              f"states gave cash flows close to today's EUR {f(C0, 0)} million? Would you build "
              "today or wait? Explain briefly."),
    "solution": P(
        f"<b>Build today.</b> With very low volatility both states give cash flows close to "
        f"{f(C0, 0)}, so at t = 1 the line is worth about {f(C0, 0)} + {f(C0, 0)}/0.05 = "
        f"{f(SIGMA_LAV, 0)} &gt; {f(I5, 0)} whatever happens. There is no bad state to avoid, so the "
        "option to wait is worth almost nothing, while waiting still costs today's cash flow net "
        "of the interest saved. The decision then follows today's NPV, which is positive.",
        "The value of waiting comes from the downside you can walk away from: the higher the "
        "volatility, the more it is worth. It disappears as volatility goes to zero. The "
        "lecture makes the same point: with a very low σ the price stays close to today's level "
        "and the decision is the one you would take today, while a high σ makes waiting prudent "
        "(recording 14, 46:59 to 47:21).",
    ),
    "criteria": [
        "Low σ: both states stay profitable, so there is no downside to avoid and the option to "
        "wait is worth (almost) nothing.",
        "Decision: build today, since waiting loses today's cash flow and today's NPV is positive.",
        "General point: the value of waiting rises with volatility. Linking to (e) is a bonus.",
    ],
}
svar(5, "f", {"type": "tekst"})

e5 = {
    "n": 5, "title": "Real Options", "points": 20, "topic": "Real options, risk-neutral valuation",
    "chapters": [22, 25],
    "merke": "Som H2024 E6, men med usikker kontantstrøm · realopsjon 50 %",
    "body": e5_body, "parts": [e5a, e5b, e5c, e5d, e5e, e5f],
}

# ---------------------------------------------------------------- E6
e6_body = P(
    "Thyholm Industri A/S has announced a share offer for Mors Elektronik A/S: if the deal goes "
    "through, Mors shareholders receive 1 Thyholm share for every 2 Mors shares. The deal will "
    "either be completed or fail in exactly three months (T = 0.25 years). If it fails, both share "
    "prices return to their levels before the first rumours of the deal."
) + tabell(["", "Thyholm", "Mors"],
           [["Share price before the rumours (DKK)", f(PA0, 2), f(PB0, 2)],
            ["Share price today (DKK)", f(PA1, 2), f(PB1, 2)],
            ["Shares outstanding (million)", f(NA, 0), f(NB, 0)]]) + P(
    f"The risk-free rate is {pc(RF6, 0)} a year (annual compounding). Neither firm pays a dividend "
    "before T and short selling is allowed."
)
e6a = {
    "label": "a", "points": 3,
    "body": P("What is the offer worth per Mors share at today's prices? What premium does it "
              "offer over Mors's price before the rumours?"),
    "solution": P(
        f"One Mors share receives half a Thyholm share: {f(PA1, 2)}/2 = <b>DKK {f(TILBUD, 2)}</b>.",
        f"Premium over the price before the rumours: {f(TILBUD, 2)}/{f(PB0, 2)} − 1 = "
        f"<b>{pc(PREMIE)}</b>.",
        f"Mors trades at {f(PB1, 2)}, DKK {f(SPREAD, 2)} below the offer: the market is not sure "
        "the deal goes through. That gap is what (b) and (c) turn into a probability.",
    ),
    "criteria": [
        f"Offer value at today's Thyholm price: 268/2 = {f(TILBUD, 2)}.",
        f"Premium = 134/115 − 1 = {pc(PREMIE, 2)} over the price before the rumours.",
        "Using Thyholm's old price (280/2 = 140) is not the offer's value today.",
    ],
}
svar(6, "a", {"type": "tall", "tall": [
    tall("Offer value per Mors share", TILBUD, "DKK"),
    tall("Premium over the price before the rumours", 100 * PREMIE, "%"),
]})

e6b = {
    "label": "b", "points": 6,
    "body": P("Build a long-short position that buys 2 Mors shares today, is hedged with Thyholm "
              "shares and deposits the short-sale proceeds at the risk-free rate. What is your "
              "net outlay today? What is the position worth at T if the deal goes through? What "
              "is it worth if the deal fails?"),
    "solution": P(
        "<b>Step 1. The position.</b> Two Mors shares become one Thyholm share if the deal goes "
        "through, so the hedge is to short one Thyholm share.",
        tabell(["Leg", "Action", "Cash flow today"],
               [["Long Mors", f"Buy 2 shares at {f(PB1, 2)}", f(-LONG, 2)],
                ["Short Thyholm", f"Short-sell 1 share at {f(PA1, 2)}", sg(SHORT, 2)],
                ["Deposit", f"Deposit the {f(SHORT, 2)} at the risk-free rate", f(-SHORT, 2)],
                ["<b>Net outlay</b>", "", f"<b>{f(-UTLEGG6, 2)}</b>"]]),
        f"The net outlay is <b>DKK {f(UTLEGG6, 2)}</b>.",
        f"<b>Step 2. Three months of interest.</b> ({f(1 + RF6, 2)})<sup>0.25</sup> = {f(F6, 6)}, so the "
        f"deposit grows to {f(SHORT, 2)} × {f(F6, 6)} = {f(INNSKUDD_T)}.",
        f"<b>Step 3. Deal goes through.</b> The 2 Mors shares are converted into the 1 Thyholm "
        f"share you owe, so the share legs cancel and you keep the deposit: <b>DKK "
        f"{f(SUKSESS)}</b>.",
        f"<b>Step 4. Deal fails.</b> Prices return to their levels before the rumours. You buy "
        f"back 1 Thyholm share at {f(PA0, 0)} and sell the 2 Mors shares at {f(PB0, 0)}: "
        f"{f(INNSKUDD_T)} − {f(PA0, 0)} + 2 × {f(PB0, 0)} = <b>DKK {f(FIASKO)}</b>.",
        f"<b>Other constructions.</b> The lecture also shows a self-financing version: short 1 "
        f"Thyholm, buy 2 Mors and deposit only the rest, {f(SHORT, 2)} − {f(LONG, 2)} = "
        f"{f(REST, 2)} (recording 16, 1:14:18). It costs 0 today and is worth {f(S_SELV)} or "
        f"{f(F_SELV)} at T. It gives the same probability in (c).",
    ),
    "criteria": [
        "Long 2 Mors and short 1 Thyholm (the exchange ratio), with the 268 deposited at r_f.",
        f"Net outlay = {f(UTLEGG6, 2)}.",
        f"Interest for three months: {f(1 + RF6, 2)}^0.25 = {f(F6, 6)}, so success = {f(SUKSESS)}. A "
        f"whole year ({f(1 + RF6, 2)}) is wrong.",
        f"Failure: {f(INNSKUDD_T)} − 280 + 230 = {f(FIASKO)}, using the prices before the "
        "rumours.",
        "This is the construction step of the exercise: show the legs, both payoffs and the "
        "interest factor.",
    ],
}
svar(6, "b", {"type": "tall", "tall": [
    tall("Net outlay today", UTLEGG6, "DKK", alt=[-UTLEGG6]),
    tall("Value at T if the deal goes through", SUKSESS, "DKK", tol=TOL6),
    tall("Value at T if the deal fails", FIASKO, "DKK", tol=TOL6),
], "merknad": f"tol 0,3 %: uten rente ({SHORT:.0f} og {SHORT - PA0 + 2 * PB0:.0f}) avvises, helt år ({1 + RF6:.2f}) avvises, enkel rente godtas."})

e6c = {
    "label": "c", "points": 5,
    "body": P("What is the certainty equivalent of your outlay at T? What probability of "
              "completion does the market imply?"),
    "solution": P(
        f"<b>Step 1. Certainty equivalent.</b> The position cost {f(UTLEGG6, 2)} today. A fair "
        f"price means its expected value at T must equal that outlay grown at the risk-free rate "
        f"for three months: {f(UTLEGG6, 2)} × {f(F6, 6)} = <b>DKK {f(SE)}</b>. Setting the "
        f"expected payoff equal to {f(UTLEGG6, 2)} is the error the H2025 key warns against.",
        f"<b>Step 2. Solve for p.</b><br>{f(SE)} = p × {f(SUKSESS)} + (1 − p) × {f(FIASKO)}<br>"
        f"{f(SE)} − {f(FIASKO)} = p × ({f(SUKSESS)} − {f(FIASKO)})<br>"
        f"{f(SE - FIASKO)} = p × {f(SUKSESS - FIASKO, 2)}<br>"
        f"<b>p = {f(PDEAL)} ({pc(PDEAL, 2)})</b>",
        f"<b>Check.</b> {f(PDEAL, 6)} × {f(SUKSESS)} + {f(1 - PDEAL, 6)} × {f(FIASKO)} = "
        f"{f(PDEAL * SUKSESS + (1 - PDEAL) * FIASKO)} ✓. The self-financing version gives the "
        f"same: 0 = p × {f(S_SELV)} + (1 − p) × ({f(F_SELV)}), so p = {f(P_SELV)}.",
        f"<b>The traps.</b> Plugging in {f(UTLEGG6, 2)} instead of the certainty equivalent gives "
        f"{pc(P_FELLE_100, 2)}; a whole year of interest gives {pc(P_FELLE_HELT, 2)}; no interest "
        f"anywhere gives {pc(P_FELLE_INGEN, 2)}.",
    ),
    "criteria": [
        f"Certainty equivalent = {f(UTLEGG6, 2)} × {f(1 + RF6, 2)}^0.25 = {f(SE)}, not {f(UTLEGG6, 2)} («very important to not "
        "just plug 100», H2025 key).",
        f"Solves CE = p × success + (1 − p) × failure: p = {pc(PDEAL, 2)}.",
        f"Uses the three-month factor {f(1 + RF6, 2)}^0.25 throughout.",
        "Any consistent construction (for example the self-financing one) is accepted if it gives "
        "the same p.",
    ],
}
svar(6, "c", {"type": "tall", "tall": [
    tall("Certainty equivalent of the outlay", SE, "DKK", tol=TOL6),
    tall("Implied probability of completion", 100 * PDEAL, "%", tol=TOL6),
], "merknad": f"tol 0,3 %: «plug {UTLEGG6:.2f}» gir {100 * P_FELLE_100:.2f} %, helt år {100 * P_FELLE_HELT:.2f} %, ingen rente {100 * P_FELLE_INGEN:.2f} %; alle avvises. Enkel rente (1 + 0,03 × 0,25) skiller seg med under 0,01 % og godtas."})

e6d = {
    "label": "d", "points": 3,
    "body": P("Use the change in each firm's market value since before the rumours to say whether "
              "the market expects the deal to create or destroy value. Who pays too much? Explain "
              "briefly."),
    "solution": P(
        f"Thyholm: {f(NA, 0)} × ({f(PA1, 0)} − {f(PA0, 0)}) = <b>DKK {f(DVA, 0)} million</b>. "
        f"Mors: {f(NB, 0)} × ({f(PB1, 2)} − {f(PB0, 0)}) = <b>DKK {sg(DVB, 0)} million</b>. "
        f"Together: {f(DV_SUM, 0)} million.",
        "<b>Destroy.</b> The combined value has fallen, so the market expects the deal to destroy "
        "value. <b>Thyholm's shareholders pay too much:</b> they lose more than Mors's shareholders "
        "gain, so the premium they pay exceeds anything the merger creates for them. Mors's "
        "shareholders capture the premium.",
        "The changes are expectations: today's prices still include the chance that the deal "
        f"fails ({pc(1 - PDEAL, 0)}), so the effect if the deal goes through is larger.",
    ),
    "criteria": [
        f"Changes in market value: Thyholm {f(DVA, 0)}, Mors {sg(DVB, 0)}, combined {f(DV_SUM, 0)}.",
        "Conclusion: value is expected to be destroyed and Thyholm's shareholders overpay; Mors's "
        "shareholders gain.",
        "An answer from the price changes alone (Thyholm down, Mors up) earns the conclusion "
        "points but not the number points.",
    ],
}
svar(6, "d", {"type": "blandet", "tall": [
    tall("Change in Thyholm's market value", DVA, "DKK m"),
    tall("Change in Mors's market value", DVB, "DKK m"),
], "tallPoeng": 1.5, "tekstLedd": "Create or destroy value? Who pays too much? Explain briefly."})

e6e = {
    "label": "e", "points": 3,
    "body": P("Give one possible motive for the deal, other than synergies, that fits these price "
              "reactions. Explain in 2–3 sentences."),
    "solution": P(
        "<b>Empire building.</b> Thyholm's managers may want to run a larger company, since their "
        "pay, status and power grow with size. They are willing to pay a premium that Mors is not "
        "worth to Thyholm's shareholders. The market sees the overpayment, so Thyholm's price "
        "falls while Mors's shareholders, who receive the premium, gain.",
        "<b>Also accepted.</b> Managerial hubris or overconfidence about running Mors better; "
        "diversification that Thyholm's shareholders could get more cheaply on their own; managers "
        "reducing the risk to their own jobs. Each must fit Thyholm down and Mors up. Tax savings "
        f"from Mors's losses would be a value-creating motive and cannot explain a combined fall of "
        f"{f(-DV_SUM, 0)} million (nor are they the answer the course expects); neither can "
        "«value creation» without a mechanism.",
    ),
    "criteria": [
        "One motive other than synergies, explained in 2–3 sentences with its mechanism.",
        "Consistent with the prices: the acquirer falls and the target rises, so the motive must "
        "make Thyholm's shareholders lose (empire building, hubris, diversification, managers' "
        "own interests).",
        "Synergies or «value creation» alone earn nothing; a value-creating motive such as tax "
        "savings does not fit the combined fall in value.",
    ],
}
svar(6, "e", {"type": "tekst"})

e6 = {
    "n": 6, "title": "M&A", "points": 20, "topic": "Mergers and acquisitions",
    "chapters": [26],
    "merke": "Som H2025 E6, med tre måneder · M&A med regning 65 %",
    "body": e6_body, "parts": [e6a, e6b, e6c, e6d, e6e],
}

SETT = {
    "id": "pred1",
    "kind": "mock",
    "fane": "pred",
    "nr": 1,
    "label": "Prediksjon 1",
    "minutes": 180,
    "points": 100,
    "format": "6 oppgaver · 100 poeng · ingen flervalg",
    "note": ("Den mest sannsynlige eksamenen etter prediksjonen: to teorioppgaver og fire "
             "regneoppgaver med kapitalstruktur, verdsetting, realopsjon og oppkjøp. Ta den på tid "
             "med penn og papir."),
    "facts": [
        "Prediction exam in Kurbatov's format: 6 exercises, 100 points, 180 minutes, no multiple "
        "choice, calculator and one bilingual dictionary permitted.",
        "Points per exercise: 10 · 10 · 20 · 20 · 20 · 20. Two verbal exercises with sentence "
        "budgets, then four computational exercises.",
        "The formula sheet is handed out.",
        "Recommended precision: 4 decimal places. An error carried forward is not penalised again "
        "in later parts.",
        "Written for this app from the prediction of the 2026 exam. Every number in the solutions "
        "is computed in a script.",
    ],
    "exercises": [e1, e2, e3, e4, e5, e6],
}

# ================================================================== kontroller
feil = []


def ren(t):
    return re.sub(r"</?(sub|sup|b|i|em|strong)>", "", str(t))


def regler(hvor, t):
    r = ren(t)
    if "—" in r:
        feil.append(f"{hvor}: tankestrek")
    if re.search(r",\s+and\b", r):
        m = re.search(r",\s+and\b", r)
        feil.append(f"{hvor}: komma før and: …{r[max(0, m.start() - 50):m.end() + 10]}…")
    if re.search(r",\s+og\b", r):
        feil.append(f"{hvor}: komma før og")
    if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
        feil.append(f"{hvor}: pronomen om Kurbatov")
    if re.search(r"\d\s-\s\d|\(-\d|=\s-\d", re.sub(r"<[^>]+>", " ", r)):
        feil.append(f"{hvor}: bindestrek brukt som minus")


for t in [SETT["note"], SETT["label"], *SETT["facts"]]:
    regler("sett", t)
assert sum(e["points"] for e in SETT["exercises"]) == 100
assert [e["points"] for e in SETT["exercises"]] == [10, 10, 20, 20, 20, 20]
for e in SETT["exercises"]:
    hvor = f"E{e['n']}"
    for k in ("title", "body", "solution", "merke"):
        if k in e:
            regler(hvor, e[k])
    for c in e.get("criteria", []):
        regler(hvor, c)
    if re.search(r"<[a-zA-Z/]", e["merke"]):
        feil.append(f"{hvor}: markup i merke")
    if e.get("parts"):
        assert sum(p["points"] for p in e["parts"]) == e["points"], hvor
        for p in e["parts"]:
            for k in ("body", "solution"):
                regler(f"{hvor}{p['label']}", p[k])
            for c in p["criteria"]:
                regler(f"{hvor}{p['label']}", c)

# tallene i svar-dataene skal stå i løsningsteksten (samme logikk som tools/sjekk-svar.js)


def tall_i(tekst):
    t = re.sub(r"<[^>]*>", " ", str(tekst)).replace("&minus;", "−").replace("&nbsp;", " ")
    t = re.sub(r"&[a-z]+;", " ", t).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", m.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


def innenfor(n, v, t):
    return abs(n - v) <= max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)


for e in SETT["exercises"]:
    deler = e.get("parts") or [dict(e, label="")]
    for p in deler:
        k = f"pred1:{e['n']}:{p['label']}"
        if k not in SVAR:
            feil.append(f"{k}: mangler svar-data")
            continue
        d = SVAR[k]
        if d["type"] == "blandet":
            assert 0 < d["tallPoeng"] < p["points"], k
        if d["type"] in ("tall", "blandet"):
            kilde = " ".join([p.get("solution", ""), " ".join(p.get("criteria", []))])
            nums = tall_i(kilde)
            for t in d["tall"]:
                kand = [t["verdi"], *t.get("alt", [])]
                ok = any(innenfor(n, v, t) or (t["enhet"] == "%" and innenfor(n * 100, v, t))
                         for v in kand for n in nums)
                if not ok:
                    feil.append(f"{k} {t['navn']}: {t['verdi']} står ikke i løsningen")
                # hovedverdien selv (ikke bare alt) skal stå i løsningen
                if not any(innenfor(n, t["verdi"], t) or (t["enhet"] == "%" and innenfor(n * 100, t["verdi"], t)) for n in nums):
                    feil.append(f"{k} {t['navn']}: hovedverdien {t['verdi']} står ikke i løsningen")

# feller og avrunding mot den effektive toleransen max(abs, tol × |v|) (prediksjon-spek, «Toleranser»)


def godtas(nokkel, navn, v):
    t = next(x for x in SVAR[nokkel]["tall"] if x["navn"] == navn)
    return any(abs(v - c) <= max(t.get("abs", 0), t.get("tol", 0.01) * abs(c))
               for c in [t["verdi"], *t.get("alt", [])])


FELLER = [  # (nøkkel, felt, galt svar)
    ("pred1:3:c", "New r<sub>E</sub>", 100 * RE1_FELLE_DV),
    ("pred1:3:f", "Shares repurchased", N_KJOP_FELLE),
    ("pred1:4:a", "FCF<sub>1</sub>", FCF1_FELLE_NIVAA),
    ("pred1:4:a", "FCF<sub>1</sub>", NOPAT1),                      # ΔNWC glemt
    ("pred1:4:a", "Cash outlay at t = 0", KAPEX0),                 # arbeidskapitalen glemt
    ("pred1:4:b", "r<sub>U</sub>", 100 * (RF4 + WE_T * BE_T * MRP4)),   # β_D = 0
    ("pred1:4:c", "r<sub>E</sub> of the line", 100 * RE4_FELLE_DE),
    ("pred1:4:c", "r<sub>wacc</sub>", 100 * RW4_FELLE_DE),
    ("pred1:4:c", "r<sub>wacc</sub>", 100 * RW4_FELLE_RD),
    ("pred1:4:d", "NPV (WACC method)", VL4),                        # PV i stedet for NPV
    ("pred1:4:e", "Debt capacity at t = 0", D0_FELLE_NPV),
    ("pred1:4:e", "PV(TS)", PVTS4_FELLE),
    ("pred1:4:e", "PV(TS)", PVTS4_FELLE_KONST),
    ("pred1:4:e", "NPV (APV method)", NPV4_FELLE_RD),
    ("pred1:5:a", "NPV at t = 1, high state", CU / RF5 - I5),
    ("pred1:5:a", "NPV at t = 1, low state", CD / RF5 - I5),
    ("pred1:5:b", "ρ (high state)", 100 * RHO_FELLE),
    ("pred1:5:b", "ρ (high state)", 100 * (1 - RHO)),               # ρ mot 1 − ρ
    ("pred1:5:c", "NPV of building today", NPV_NAA_FELLE_C0),
    ("pred1:5:c", "NPV of building today", NPV_NAA_FELLE_HALV),
    ("pred1:5:d", "NPV today of waiting", NPV_VENT_FELLE_NEG),
    ("pred1:5:e", "X", X_BRAKK),
    ("pred1:5:e", "X", X5_FELLE_C0),
    ("pred1:6:a", "Premium over the price before the rumours", 100 * (ER * PA0 / PB0 - 1)),
    ("pred1:6:b", "Value at T if the deal goes through", SHORT),            # glemt rente
    ("pred1:6:b", "Value at T if the deal goes through", SHORT * F_HELT),   # helt år
    ("pred1:6:b", "Value at T if the deal fails", SHORT - PA0 + 2 * PB0),
    ("pred1:6:c", "Certainty equivalent of the outlay", UTLEGG6),           # «plug 100»
    ("pred1:6:c", "Implied probability of completion", 100 * P_FELLE_100),
    ("pred1:6:c", "Implied probability of completion", 100 * P_FELLE_HELT),
    ("pred1:6:c", "Implied probability of completion", 100 * P_FELLE_INGEN),
]
RIKTIGE = [  # (nøkkel, felt, riktig svar med avrundede mellomtall)
    ("pred1:3:c", "New r<sub>E</sub>", 100 * RE1_RUND),
    ("pred1:4:a", "Cash outlay at t = 0", -UTLEGG),
    ("pred1:4:c", "r<sub>E</sub> of the line", 100 * K_RUND["re"]),
    ("pred1:4:c", "r<sub>wacc</sub>", 100 * K_RUND["rw"]),
    ("pred1:4:c", "r<sub>E</sub> of the line", 9.72),
    ("pred1:4:c", "r<sub>wacc</sub>", 7.42),
    ("pred1:4:d", "NPV (WACC method)", FCF1 / (0.0742 - G4) - UTLEGG),
    ("pred1:4:d", "NPV (WACC method)", K_RUND["npv"]),
    ("pred1:4:e", "Debt capacity at t = 0", K_RUND["d0"]),
    ("pred1:4:e", "PV(TS)", K_RUND["pvts"]),
    ("pred1:4:e", "NPV (APV method)", K_RUND["npv_apv"]),
    ("pred1:5:d", "NPV today of waiting", 0.44 * NPVU1 / (1 + RF5)),
    ("pred1:5:e", "X", X5_RUND),
    ("pred1:6:b", "Net outlay today", -UTLEGG6),
    ("pred1:6:b", "Value at T if the deal goes through", SHORT * F6_RUND),
    ("pred1:6:b", "Value at T if the deal fails", SHORT * F6_RUND - PA0 + 2 * PB0),
    ("pred1:6:c", "Certainty equivalent of the outlay", UTLEGG6 * F6_RUND),
    ("pred1:6:c", "Implied probability of completion", 100 * P_RUND),
    # enkel rente for tre måneder kan ikke skilles fra rentes rente (forskjell under 0,01 %)
    ("pred1:6:c", "Implied probability of completion", 100 * P_ENKEL),
]
for k, navn, v in FELLER:
    if godtas(k, navn, v):
        feil.append(f"{k} {navn}: fellen {v:.4f} godtas")
for k, navn, v in RIKTIGE:
    if not godtas(k, navn, v):
        feil.append(f"{k} {navn}: riktig svar {v:.4f} avvises")

# ingen reserveverdier (prediksjon-spek, «Ingen reserveverdier»)
for e in SETT["exercises"]:
    for p in [e, *e.get("parts", [])]:
        for felt in ("body", "solution"):
            if re.search(r"could not solve|reserve", str(p.get(felt, "")), re.I):
                feil.append(f"E{e['n']}{p.get('label', '')}: reserveverdi i {felt}")
        if any(re.search(r"reserve", c, re.I) for c in p.get("criteria", [])):
            feil.append(f"E{e['n']}{p.get('label', '')}: reserveverdi i kriteriene")
for k, d in SVAR.items():
    if "reserve" in d.get("merknad", ""):
        feil.append(f"{k}: reserve i merknad")

# svar som lekker: hovedverdien skal ikke stå i oppgaveteksten eller i en tidligere del
LOV = {("pred1:3:b", "Share price after the announcement")}
for e in SETT["exercises"]:
    tekst_for = re.sub(r"<[^>]+>", " ", e["body"])
    for p in e.get("parts", []):
        tekst_for += " " + re.sub(r"<[^>]+>", " ", p["body"])
        d = SVAR[f"pred1:{e['n']}:{p['label']}"]
        for t in d.get("tall", []):
            if (f"pred1:{e['n']}:{p['label']}", t["navn"]) in LOV:
                continue
            v = t["verdi"]
            if abs(v) < 10 and abs(v - round(v)) < 1e-9:
                continue
            for s in {f"{abs(v):.2f}", f"{abs(v):.4f}", f"{abs(v):,.2f}"} | ({f"{abs(v):.0f}", f"{abs(v):,.0f}"} if abs(v - round(v)) < 1e-9 else set()):
                if re.search(r"(?<![\d.,])" + re.escape(s) + r"(?![\d])", tekst_for):
                    feil.append(f"pred1:{e['n']}:{p['label']} {t['navn']}: {s} står i oppgaveteksten")

if feil:
    for x in feil:
        print("FEIL", x)
    sys.exit("skriver ingenting")

# ord i oppgaveteksten og antall leveranser
ord_ = 0
lev = 0
for e in SETT["exercises"]:
    ord_ += len(re.sub(r"<[^>]+>", " ", e["body"]).split())
    for p in e.get("parts", []):
        ord_ += len(re.sub(r"<[^>]+>", " ", p["body"]).split())
for k, d in SVAR.items():
    lev += len(d.get("tall", [])) + (1 if d["type"] in ("tekst", "blandet") else 0)

json.dump(SETT, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

print(f"Skrev {UT} og {UT_SVAR}")
print(f"Ord i oppgaveteksten: {ord_}, leveranser: {lev}, svar-oppføringer: {len(SVAR)}")
print(f"E3: r_U {RU3:.6f}, ny gjeld {NY_D:.0f}, kjøpt {N_KJOP:.4f}, r_E {RE1:.6f}, PV(TS) {PVTS3:.0f}, P {P_SKATT:.2f}, kjøpt {N_KJOP_S:.4f}")
print(f"E4: FCF1 {FCF1:.4f}, β_D {BD_T:.4f}, r_U {RU4:.6f}, r_E {RE4:.6f}, r_wacc {RW4:.6f}, V^L {VL4:.4f}, NPV {NPV4:.4f}, D0 {DK0:.4f}, D1 {DK1:.4f}, V^U {VU4:.4f}, PV(TS) {PVTS4:.4f}")
print(f"E5: NPV1 {NPVU1:.2f}/{NPVD1:.2f}, ρ {RHO:.4f} (felle {RHO_FELLE:.4f}), NPV nå {NPV_NAA:.4f}, vent {NPV_VENT:.4f}, X {X5:.4f}")
print(f"E6: tilbud {TILBUD:.2f}, premie {PREMIE:.6f}, F {F6:.6f}, suksess {SUKSESS:.4f}, fiasko {FIASKO:.4f}, SE {SE:.4f}, p {PDEAL:.6f}, ΔV {DVA:.0f}/{DVB:.0f}")
