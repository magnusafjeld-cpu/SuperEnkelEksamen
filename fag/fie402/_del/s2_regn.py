"""Skribent S2: deleksamenene del2-f3, del2-f4 og del2-f5 i FIE402 («Mest forventet»).

Kjør fra hvor som helst:  python3 -I s2_regn.py

Spesifikasjonen står i docs/fie402-deleksamen-spek.md. Hvert sett har to oppgaver:

  n 1 (18 p)  MM-rekapitalisering i perfekte markeder
              f3 og f5: H2025 E3-formen (evigrente, utbytte, rekap til en gitt D/V eller D/E,
              aksjonærer sammenlignet). f4: H2024 E3-formen (ny gjeld innfrir gammel, resten
              som utbytte, risikabel gjeld, tilbakekjøp som alternativ).
  n 2 (18 p)  H2024 E4-formen: prosjekter med utfall i tilstander, valg med og uten gjeld,
              gjeldsnivået som gir likegyldighet og en sikringsavtale.

Variasjonen mellom settene:
  f3  USD. Lagerutleie (evigrente, D/V = 0.55). Spillstudio med tre prosjekter med egne
      sannsynligheter; likegyldighet mellom det sikre og det mellomrisikable prosjektet;
      sikring bare for ett prosjekt (ren overføring, firmaverdien uendret, spørsmålet sier B).
  f4  NOK. Dagligvarekjede (H2024 E3-formen, r_D fra gjeldsbeta). Vindkraft med to strategier
      i tre felles tilstander; feil gjeldsområde gir en løsning som må forkastes; kontrakten har
      NPV lik null og avvises.
  f5  EUR. Vannverk (rekap til D/E = 1.5, hjemmelaget gjeld gjenskaper den opprinnelige
      kontantstrømmen). Kjemifirma med kontanter og tre prosjekter (ett med negativ NPV);
      likegyldighet mellom de to risikable; en NPV-nøytral kontrakt som avvises.

Skriptet regner hvert tall i oppgavetekst, løsning og kriterier og sjekker med assert:
  MM: V og kursen uendret ved kunngjøring og etter tilbakekjøp, r_wacc = r_U før og etter,
      Div/r_E = kursen, P0 = (Div1 + P1)/(1 + r_E), aksjonærenes samlede formue uendret,
      utbytte + kurs etter = kurs før, likningssystemet for tilbakekjøpet, D/E-målet nådd,
      og at hjemmelaget gjeld gjenskaper den opprinnelige kontantstrømmen.
  Risikoskifting: D + E = V tilstand for tilstand, endring i E + endring i D = endring i V,
      likegyldighetsnivået ligger i området det ble regnet i og forkastede antakelser utenfor,
      valget i hver deloppgave stemmer med et rutenett over gjeldsnivåer, sikringens NPV,
      og at kreditorene tar mer enn hele verdiøkningen når sikringen ville blitt valgt.
Til slutt sjekkes poeng, skrivereglene og at hvert tall i svar-dataene står i løsningsteksten
(samme regel som tools/sjekk-svar.js). Er noe galt, skrives ingenting.
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
UT = os.path.join(HER, "s2.json")
UT_SVAR = os.path.join(HER, "s2_svar.json")


# ------------------------------------------------------------------ hjelpere
def f(x, d=4):
    r = round(x, d)
    if r == 0:
        r = 0.0
    s = f"{abs(r):,.{d}f}"
    return ("−" if r < 0 else "") + s


def g(x):
    for d in (0, 1, 2, 3):
        if abs(round(x, d) - x) < 1e-9:
            return f(x, d)
    return f(x, 4)


def pc(x):
    return g(100 * x) + "%"


def sg(x):
    """Med fortegn: +6 eller −6."""
    return ("+" if x > 0 else "") + g(x)


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def tab(head, rows):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in head) + "</tr>"
    b = ""
    for r in rows:
        b += "<tr>" + "".join(
            (f'<td class="n">{c[1:]}</td>' if isinstance(c, str) and c.startswith("#") else f"<td>{c}</td>")
            for c in r) + "</tr>"
    return f'<table class="data">{h}{b}</table>'


def E_(p, x, F):
    return sum(pi * max(xi - F, 0) for pi, xi in zip(p, x))


def D_(p, x, F):
    return sum(pi * min(xi, F) for pi, xi in zip(p, x))


def V_(p, x):
    return sum(pi * xi for pi, xi in zip(p, x))


def valg(P, F):
    t = {k: E_(p, x, F) for k, (p, x) in P.items()}
    m = max(t.values())
    return [k for k in t if t[k] > m - 1e-9], t


def rutenett(P, lo, hi, steg=0.01):
    """Hvilket prosjekt eierne velger for hvert gjeldsnivå: liste av (fra F, valg)."""
    ut, forrige = [], None
    for i in range(int(lo / steg), int(hi / steg) + 1):
        F = i * steg
        b, _ = valg(P, F)
        if len(b) == 1 and b[0] != forrige:
            ut.append((round(F, 2), b[0]))
            forrige = b[0]
    return ut


SETT = {"del2-f3": [], "del2-f4": [], "del2-f5": []}
SVAR = {}


def T(navn, verdi, enhet, **kw):
    d = {"navn": navn, "verdi": verdi, "enhet": enhet}
    d.update(kw)
    return d


# ======================================================================
# del2-f3 · oppgave 1: Harborline Storage (H2025 E3-formen)
# ======================================================================
D0, E0, N0, rf, FCF = 120.0, 360.0, 7.5, 0.04, 28.0
dv = 0.55
V = D0 + E0
rU = FCF / V
rE0 = (rU - (D0 / V) * rf) / (E0 / V)
assert near(rE0, (FCF - rf * D0) / E0)
P0 = E0 / N0
int0 = rf * D0
div0 = FCF - int0
dps0 = div0 / N0
P1 = dps0 / rE0
assert near(P1, P0) and near(P0, (dps0 + P1) / (1 + rE0))
D1 = dv * V
newD = D1 - D0
Nb = newD / P0
N1 = N0 - Nb
E1 = V - D1
assert near(E1 / N1, P0)                         # kursen uendret etter tilbakekjøpet
int1 = rf * D1
div1 = FCF - int1
dps1 = div1 / N1
rE1 = rU + (D1 / E1) * (rU - rf)
assert near(rE1, div1 / E1)
assert near((E1 / V) * rE1 + (D1 / V) * rf, rU)  # r_wacc = r_U etter rekap
assert near(dps1 / rE1, P0)
assert near(Nb * P0 + N1 * P0, E0)               # samlet formue = opprinnelig egenkapital
assert P0 == 48 and near(Nb, 3.0) and near(newD, 144)

ex = {
    "n": 1, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [4, 6, 15],
    "merke": "Som H2025 E3: evigrente, utbytte og rekapitalisering",
    "body": (f"<p>Harborline Storage Inc., a self-storage operator, operates in a perfect capital market (MM "
             f"propositions hold, no taxes). It has ${g(D0)} million in debt and ${g(E0)} million in equity. Its "
             f"debt is risk-free and r<sub>f</sub> is {pc(rf)}. There are {g(N0)} million shares outstanding. The "
             f"company generates ${g(FCF)} million in free cash flow every year in perpetuity and pays out all "
             f"cash flows as interest and dividends at the end of each year. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the equity cost of capital of the firm? What is the share price right now?</p>",
    "solution": (
        f"<p><b>Step 1. Firm value and the WACC.</b> V = D + E = {g(D0)} + {g(E0)} = <b>${g(V)}M</b>. All "
        f"free cash flow is paid out, so V is a perpetuity of ${g(FCF)}M at the WACC:</p>"
        f"<p>r<sub>wacc</sub> = FCF / V = {g(FCF)} / {g(V)} = <b>{pc(rU)}</b></p>"
        f"<p>With no taxes this is the pre-tax WACC, which equals r<sub>U</sub>.</p>"
        f"<p><b>Step 2. Back out r<sub>E</sub>.</b> The debt is risk-free, so r<sub>D</sub> = r<sub>f</sub> = "
        f"{pc(rf)}. The weights are E/V = {g(E0)}/{g(V)} = {g(E0 / V)} and D/V = {g(D0 / V)}:</p>"
        f"<p>{f(rU, 6)} = {g(E0 / V)} r<sub>E</sub> + {g(D0 / V)} × {g(rf)}<br>"
        f"r<sub>E</sub> = ({f(rU, 6)} − {g(D0 / V * rf)}) / {g(E0 / V)} = <b>{pc(rE0)}</b></p>"
        f"<p>Cross-check from the equity cash flow: r<sub>E</sub> = (FCF − r<sub>f</sub>D)/E = ({g(FCF)} − "
        f"{g(int0)})/{g(E0)} = {g(div0)}/{g(E0)} = {pc(rE0)}. MM II gives the same: {pc(rU)} + "
        f"({g(D0)}/{g(E0)})({pc(rU)} − {pc(rf)}) = {pc(rE0)}.</p>"
        f"<p><b>Step 3. Share price.</b> P<sub>0</sub> = E / N = ${g(E0)}M / {g(N0)}M = <b>${g(P0)} per "
        f"share</b>.</p>"),
    "criteria": [
        f"V = D + E = ${g(V)}M and r_wacc = FCF/V = {g(FCF)}/{g(V)} = {pc(rU)}, which equals r_U because there are no taxes.",
        f"Uses r_D = r_f = {pc(rf)} because the debt is risk-free. Solves {pc(rU)} = {g(E0 / V)} r_E + {g(D0 / V)} × {pc(rf)} for r_E = {pc(rE0)}. MM II or (FCF − interest)/E are equally accepted.",
        f"Share price = equity value / shares = {g(E0)}/{g(N0)} = ${g(P0)}. Dividing firm value by the share count (${g(V / N0)}) is the classic error.",
        "Show the calculation. No calculation, no points.",
    ],
}
pb = {
    "label": "b", "points": 3,
    "body": ("<p>What is the dividend (per share) at the end of Year 1? What is the share price right after the "
             "dividend has been paid?</p>"),
    "solution": (
        f"<p><b>Step 1. Split the ${g(FCF)}M.</b> Interest: {pc(rf)} × ${g(D0)}M = <b>${g(int0)}M</b>. The rest "
        f"goes to the shareholders: {g(FCF)} − {g(int0)} = <b>${g(div0)}M</b>, so</p>"
        f"<p>Div<sub>1</sub> = ${g(div0)}M / {g(N0)}M = <b>${f(dps0)} per share</b></p>"
        f"<p><b>Step 2. The ex-dividend price.</b> After the payment the share is again a claim on "
        f"${f(dps0)} a year forever, discounted at r<sub>E</sub> = {pc(rE0)}:</p>"
        f"<p>P<sub>1</sub> = {f(dps0)} / {f(rE0, 6)} = <b>${g(P1)}</b></p>"
        f"<p><b>Check.</b> P<sub>0</sub> = (Div<sub>1</sub> + P<sub>1</sub>)/(1 + r<sub>E</sub>) = "
        f"({f(dps0)} + {g(P1)})/{f(1 + rE0, 6)} = {f(dps0 + P1)}/{f(1 + rE0, 6)} = ${g(P0)}. The share trades "
        f"at ${f(P0 + dps0)} just before the payment and drops by exactly the dividend to ${g(P1)}. The "
        f"price is flat over time because the firm neither grows nor retains cash.</p>"),
    "criteria": [
        f"Interest = {pc(rf)} × {g(D0)} = ${g(int0)}M; the residual ${g(div0)}M is the dividend. Paying out all ${g(FCF)}M as dividend loses the point.",
        f"Dividend per share = {g(div0)}/{g(N0)} = ${f(dps0)}.",
        f"Ex-dividend price P1 = {f(dps0)}/{pc(rE0)} = ${g(P1)}, from the perpetual dividend or from P0 = (Div1 + P1)/(1 + r_E). Both routes are accepted.",
        f"Full marks note that the price stays at ${g(P0)}. The cum-dividend price of ${f(P0 + dps0)} is a bonus, not a requirement.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": (f"<p>Instead of the projected scenario, the board of directors decides to issue debt right now and "
             f"use the proceeds to repurchase shares, so that D/V = {g(dv)}.</p><p>How much new debt will be "
             f"issued? What happens to the share price upon announcement? How many shares will be "
             f"repurchased?</p>"),
    "solution": (
        f"<p><b>Step 1. Any value effect?</b> No. Without taxes the recapitalisation is a purely financial "
        f"transaction: MM I holds, so <b>firm value stays at ${g(V)}M and the share price stays at ${g(P0)}</b> "
        f"on announcement. There is no tax shield for the market to price in.</p>"
        f"<p><b>Step 2. New debt.</b> Target debt = {g(dv)} × {g(V)} = ${g(D1)}M. The firm already owes "
        f"${g(D0)}M, so it issues <b>${g(newD)}M of new debt</b>.</p>"
        f"<p><b>Step 3. Shares.</b> The ${g(newD)}M buys back shares at the unchanged ${g(P0)}:</p>"
        f"<p>Shares repurchased = {g(newD)} / {g(P0)} = <b>{g(Nb)} million</b>, leaving {g(N0)} − {g(Nb)} = "
        f"{g(N1)} million shares.</p>"
        f"<p><b>Check.</b> E = V − D = {g(V)} − {g(D1)} = ${g(E1)}M over {g(N1)}M shares = <b>${g(E1 / N1)}</b> "
        f"per share, as MM I requires.</p>"),
    "criteria": [
        "Names the mechanism: no taxes, so the restructuring is purely financial, MM I holds and firm value and share price are unchanged.",
        f"Target debt = {g(dv)} × {g(V)} = ${g(D1)}M, so NEW debt = ${g(newD)}M. Answering ${g(D1)}M ignores the ${g(D0)}M already outstanding.",
        f"Share price on announcement: unchanged at ${g(P0)}, with the reason.",
        f"Shares repurchased = {g(newD)}/{g(P0)} = {g(Nb)} million at the unchanged price.",
        f"The closing check {g(E1)}/{g(N1)} = ${g(P0)} is not required but confirms the answer.",
    ],
}
pd = {
    "label": "d", "points": 4,
    "body": "<p>What is the dividend (per share) at the end of Year 1 now? What is the new equity cost of capital?</p>",
    "solution": (
        f"<p><b>Step 1. The new dividend.</b> Interest is now {pc(rf)} × ${g(D1)}M = <b>${g(int1)}M</b>, "
        f"leaving {g(FCF)} − {g(int1)} = <b>${g(div1)}M</b> for the shareholders, spread over only "
        f"{g(N1)}M shares:</p>"
        f"<p>Div<sub>1</sub> = {g(div1)} / {g(N1)} = <b>${f(dps1)} per share</b> (up from ${f(dps0)})</p>"
        f"<p><b>Step 2. The new cost of equity.</b> Asset risk is unchanged, so r<sub>U</sub> = {pc(rU)}. With "
        f"D/E = {g(D1)}/{g(E1)} = {f(D1 / E1)}:</p>"
        f"<p>r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) = {pc(rU)} + {f(D1 / E1)} × "
        f"({pc(rU)} − {pc(rf)}) = <b>{pc(rE1)}</b></p>"
        f"<p>The same from the equity cash flow: {g(div1)}/{g(E1)} = {pc(rE1)}. The WACC is still "
        f"{g(E1 / V)} × {pc(rE1)} + {g(dv)} × {pc(rf)} = {pc(rU)}.</p>"
        f"<p><b>Check.</b> The share is still worth {f(dps1)} / {f(rE1, 6)} = <b>${g(dps1 / rE1)}</b>. The "
        f"dividend per share rose by {pc(dps1 / dps0 - 1)}; the discount rate rose by exactly enough to "
        f"leave the price unchanged.</p>"),
    "criteria": [
        f"Interest recomputed on the new debt: {pc(rf)} × {g(D1)} = ${g(int1)}M, leaving ${g(div1)}M for equity.",
        f"Divides by the REDUCED share count of {g(N1)}M, not {g(N0)}M: dividend per share = ${f(dps1)}. Forgetting the retired shares is the most common error.",
        f"New r_E = {pc(rE1)}, from MM II with D/E = {g(D1)}/{g(E1)} or from the unchanged WACC with weights {g(E1 / V)} and {g(dv)}.",
        "States why r_U is unchanged: a financing transaction does not change asset risk. With no taxes the WACC does not move.",
        f"Optional but valued: {f(dps1)}/{pc(rE1)} = ${g(P0)}, so the price is unchanged.",
    ],
}
pe = {
    "label": "e", "points": 4,
    "body": ("<p>Compare the payoffs of the original scenario shareholder, the new scenario shareholder who sold "
             "their share and the new scenario shareholder who kept their share. Comment.</p>"),
    "solution": (
        f"<p>All three positions are worth exactly <b>${g(P0)} today</b>.</p>"
        + tab(["Position", "What they hold", "Value today"], [
            ["Original scenario (no recap)", f"One share paying ${f(dps0)} a year forever, discounted at r<sub>E</sub> = {pc(rE0)}", f"#{f(dps0)} / {f(rE0, 6)} = ${g(dps0 / rE0)}"],
            ["New scenario, sold the share", f"${g(P0)} in cash, received now in the repurchase", f"#${g(P0)}"],
            ["New scenario, kept the share", f"One share paying ${f(dps1)} a year forever, discounted at r<sub>E</sub> = {pc(rE1)}", f"#{f(dps1)} / {f(rE1, 6)} = ${g(dps1 / rE1)}"],
        ])
        + f"<p><b>Comment.</b> This is MM I in a perfect market: the recapitalisation neither creates nor "
          f"destroys value. It only changes how the same ${g(FCF)}M a year is split between debt and equity "
          f"and over how many shares. The shareholder who kept the share gets a larger dividend but also bears "
          f"more risk per share, so the required return rises from {pc(rE0)} to {pc(rE1)} by exactly enough to "
          f"keep the price at ${g(P0)}. The seller was paid the fair price, so nobody is exploited or "
          f"subsidised. An investor who wanted the old risk could undo the leverage by holding some of the "
          f"firm's debt alongside the shares (homemade leverage).</p>"
          f"<p><b>Check.</b> The original shareholders as a group hold {g(Nb)}M × ${g(P0)} in cash + {g(N1)}M × "
          f"${g(P0)} in shares = {g(Nb * P0)} + {g(N1 * P0)} = <b>${g(Nb * P0 + N1 * P0)}M</b>, the equity value "
          f"before the recapitalisation.</p>"),
    "criteria": [
        f"All three payoffs are stated and all three come to ${g(P0)}. The comparison is what is graded.",
        f"The original share is valued as {f(dps0)}/{pc(rE0)} and the kept share as {f(dps1)}/{pc(rE1)}: a bigger dividend and a higher discount rate cancel.",
        f"The seller receives ${g(P0)} in cash now, the fair price.",
        "Comment: anything reasonable about MM is accepted, for example MM I, value is re-sliced and not created, or homemade leverage.",
        f"The check {g(Nb)} × {g(P0)} + {g(N1)} × {g(P0)} = ${g(E0)}M is a bonus.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["del2-f3"].append(ex)
SVAR["del2-f3:1:a"] = {"type": "tall", "tall": [T("r<sub>E</sub>", 100 * rE0, "%"), T("P<sub>0</sub>", P0, "$ per share")]}
SVAR["del2-f3:1:b"] = {"type": "tall", "tall": [T("Div<sub>1</sub>", dps0, "$ per share"), T("P<sub>1</sub> (ex-dividend)", P1, "$ per share")]}
SVAR["del2-f3:1:c"] = {"type": "tall", "tall": [T("New debt issued", newD, "$ m"), T("Share price on announcement", P0, "$ per share"), T("Shares repurchased", Nb, "m shares")],
                       "merknad": "Alle tre spørsmålene har tallsvar. MM I ligger i at kursen er uendret."}
SVAR["del2-f3:1:d"] = {"type": "tall", "tall": [T("Div<sub>1</sub>", dps1, "$ per share"), T("New r<sub>E</sub>", 100 * rE1, "%")]}
SVAR["del2-f3:1:e"] = {"type": "blandet", "tall": [T("Original shareholder", dps0 / rE0, "$ per share"), T("Shareholder who sold", P0, "$ per share"), T("Shareholder who kept", dps1 / rE1, "$ per share")],
                       "tallPoeng": 2, "tekstLedd": "Compare the three payoffs and comment."}
F3_1 = dict(P0=P0, D0=D0, E0=E0, FCF=FCF, dps0=dps0, dps1=dps1, rE0=rE0, rE1=rE1, newD=newD)


# ======================================================================
# del2-f3 · oppgave 2: Quillmoor Games (H2024 E4-formen)
# ======================================================================
P = {"A": ([1.0], [60.0]), "B": ([0.6, 0.4], [90.0, 10.0]), "C": ([0.25, 0.75], [160.0, 4.0])}
VA, VB, VC = (V_(*P[k]) for k in "ABC")
assert VA > VB > VC
assert valg(P, 0)[0] == ["A"]
Fb = 25.0
EA, EB, EC = (E_(*P[k], Fb) for k in "ABC")
DA, DB, DC = (D_(*P[k], Fb) for k in "ABC")
for k in "ABC":
    for xi in P[k][1]:
        assert near(max(xi - Fb, 0) + min(xi, Fb), xi)          # D + E = V i hver tilstand
    assert near(E_(*P[k], Fb) + D_(*P[k], Fb), V_(*P[k]))
assert valg(P, Fb)[0] == ["B"]
dE, dD, dV = EB - EA, DB - DA, VB - VA
assert near(dE + dD, dV)
# (c) A ~ B. Område F ≤ 10: E_A − E_B = V_A − V_B > 0, ingen løsning
lowB = 10.0
assert VA - VB > 0
# område 10 < F ≤ 60: 60 − F = 0.6(90 − F)
Fs = (60.0 - 0.6 * 90.0) / (1 - 0.6)
assert lowB < Fs <= 60 and near(Fs, 15)
assert near(E_(*P["A"], Fs), E_(*P["B"], Fs))
EsA, EsB, EsC = (E_(*P[k], Fs) for k in "ABC")
assert EsC < EsA
# B ~ C høyere opp: 0.6(90 − F) = 0.25(160 − F)
Fbc = (0.6 * 90 - 0.25 * 160) / (0.6 - 0.25)
assert near(Fbc, 40)
grid = rutenett(P, 0, 100)
assert [k for _, k in grid] == ["A", "B", "C"], grid
assert near(grid[1][0], Fs + 0.01, 0.011) and near(grid[2][0], Fbc + 0.01, 0.011)
# (d) garanti bare for B: +18 i dårlig tilstand, −12 i god
gH, gL = -12.0, 18.0
npv_g = 0.6 * gH + 0.4 * gL
assert near(npv_g, 0)
Bg = ([0.6, 0.4], [90 + gH, 10 + gL])
EBg, DBg, VBg = E_(*Bg, Fb), D_(*Bg, Fb), V_(*Bg)
assert near(DBg, Fb) and near(VBg, VB) and EBg < EA < EB
assert near((EBg - EB) + (DBg - DB), 0)                        # ren overføring

tabell = tab(["", "Probability", "Payoff, $ million"], [
    ["Project A", "#100%", "#60"],
    ["Project B", "#60%", "#90"], ["", "#40%", "#10"],
    ["Project C", "#25%", "#160"], ["", "#75%", "#4"],
])
ex = {
    "n": 2, "title": "Debt and risk", "points": 18,
    "topic": "Risk shifting and hedging", "chapters": [9, 24],
    "merke": "Som H2024 E4: prosjektvalg med og uten gjeld og en garantiavtale",
    "body": (f"<p>Quillmoor Games, a video game studio, can carry out one of three projects or none at all. Each "
             f"project pays off once, at t = 1:</p>{tabell}<p>For example, project B pays $90 million with a 60% "
             f"chance and $10 million with a 40% chance. Any debt is a zero-coupon loan due at t = 1. Investors "
             f"are risk neutral and the risk-free rate is 0%. The manager acts in the best interests of "
             f"Quillmoor's shareholders.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>Assume that Quillmoor has no debt. Which project will the manager choose?</p>",
    "solution": (
        "<p>With no debt the shareholders own the whole firm, so the manager maximises the expected payoff:</p>"
        + tab(["Project", "Expected payoff", "Value"], [
            ["A", "1.00 × 60", f"#{g(VA)}"],
            ["B", "0.60 × 90 + 0.40 × 10 = 54 + 4", f"#{g(VB)}"],
            ["C", "0.25 × 160 + 0.75 × 4 = 40 + 3", f"#{g(VC)}"],
        ])
        + f"<p><b>The manager chooses project A</b>, worth ${g(VA)}M. This is the first-best choice that the "
          f"later parts are measured against. A is also the safest project.</p>"),
    "criteria": [
        "With no debt, equity value = firm value, so the criterion is the highest expected payoff.",
        f"All three expectations shown: {g(VA)}, {g(VB)} and {g(VC)}.",
        "Chooses A and calls it the first-best benchmark.",
        "Show the calculation. 'A, because it is safe' without numbers loses points.",
    ],
}
pb = {
    "label": "b", "points": 5,
    "body": (f"<p>Assume that Quillmoor has debt with a face value of ${g(Fb)} million. Which project will the "
             f"manager choose? What is the debt worth?</p>"),
    "solution": (
        f"<p>Debt is paid first and the shareholders get max(payoff − {g(Fb)}, 0) in each state (limited "
        f"liability):</p>"
        + tab(["Project", "Equity, state by state", "Equity", "Debt", "Firm"], [
            ["A", f"1.00 × (60 − 25) = 35", f"#{g(EA)}", f"#{g(DA)}", f"#{g(VA)}"],
            ["B", "0.60 × (90 − 25) + 0.40 × 0 = 0.60 × 65", f"#<b>{g(EB)}</b>", f"#{g(DB)}", f"#{g(VB)}"],
            ["C", "0.25 × (160 − 25) + 0.75 × 0 = 0.25 × 135", f"#{g(EC)}", f"#{g(DC)}", f"#{g(VC)}"],
        ])
        + f"<p><b>The manager chooses project B</b>: {g(EB)} for the shareholders against {g(EA)} for A and "
          f"{g(EC)} for C. Under B the debt is worth 0.60 × 25 + 0.40 × 10 = <b>${g(DB)}M</b>, because the "
          f"creditors get only $10M in the bad state.</p>"
          f"<p><b>Mechanism.</b> This is risk shifting (asset substitution). Equity is a call option on the "
          f"firm's assets with strike {g(Fb)}: the shareholders keep the upside and the creditors bear the "
          f"shortfall in the bad state, so the shareholders prefer more risk even at a lower expected value.</p>"
          f"<p><b>Check.</b> Relative to A, the shareholders gain {g(dE)}, the creditors lose {g(-dD)} and firm "
          f"value falls by {g(-dV)}: {sg(dE)} + ({sg(dD)}) = {sg(dV)}. The creditors' loss is a wealth transfer "
          f"to the shareholders plus the ${g(-dV)}M agency cost of debt.</p>"),
    "criteria": [
        f"Values equity as E[max(payoff − {g(Fb)}, 0)] state by state. Subtracting {g(Fb)} from the expected payoff gives the wrong ranking.",
        f"Equity values A = {g(EA)}, B = {g(EB)}, C = {g(EC)}; chooses B.",
        f"Debt under B = 0.6 × 25 + 0.4 × 10 = ${g(DB)}M, not the face value of ${g(Fb)}M.",
        "Names the mechanism: risk shifting, equity as a call option on the firm with strike equal to the face value.",
        f"Full marks for the accounting: shareholders {sg(dE)}, creditors {sg(dD)}, firm {sg(dV)}, called a wealth transfer from the creditors to the shareholders.",
    ],
}
pc_ = {
    "label": "c", "points": 5,
    "body": ("<p>Is there a level of debt for which the manager is indifferent between projects A and B? If it "
             "exists, find it and briefly explain what happens if debt increases beyond that value. If it does "
             "not exist, explain why.</p>"),
    "solution": (
        f"<p><b>Step 1. Debt up to 10.</b> The debt is safe under both projects, so E<sub>A</sub> = 60 − D and "
        f"E<sub>B</sub> = 58 − D. The difference is always {g(VA - VB)}: no solution in this region. When the "
        f"debt is safe the shareholders bear all of B's lower value.</p>"
        f"<p><b>Step 2. Debt between 10 and 60.</b> B's bad state now pays nothing to equity:</p>"
        f"<p>60 − D = 0.6(90 − D)<br>60 − D = 54 − 0.6D<br>0.4D = 6<br><b>D = ${g(Fs)}M</b></p>"
        f"<p><b>Step 3. Verify.</b> {g(Fs)} lies in (10, 60]. E<sub>A</sub> = 60 − {g(Fs)} = {g(EsA)} and "
        f"E<sub>B</sub> = 0.6 × {g(90 - Fs)} = {g(EsB)}, while E<sub>C</sub> = 0.25 × {g(160 - Fs)} = "
        f"{g(EsC)} is lower, so A and B really are the two contenders.</p>"
        f"<p><b>Step 4. Beyond {g(Fs)}.</b> The manager switches to B. Relative to A, B costs the shareholders "
        f"{g(VA - VB)} of expected value but shifts part of the bad state to the creditors, worth 0.4 × (D − 10) "
        f"to the shareholders. Above D = {g(Fs)} that gain exceeds {g(VA - VB)}; it keeps growing with the "
        f"debt. Risk shifting escalates: above D = {g(Fbc)} (0.6(90 − D) = 0.25(160 − D)) the manager moves on "
        f"to C. The agency cost of debt rises from {g(VA - VB)} to {g(VA - VC)}.</p>"
        + tab(["Debt D", "E<sub>A</sub>", "E<sub>B</sub>", "E<sub>C</sub>", "Chosen"], [
            [f"#{g(Dx)}", f"#{g(E_(*P['A'], Dx))}", f"#{g(E_(*P['B'], Dx))}", f"#{g(E_(*P['C'], Dx))}",
             "/".join(valg(P, Dx)[0])] for Dx in (10, Fs, 25, Fbc, 50)
        ]).replace(">A/B<", ">A = B<").replace(">B/C<", ">B = C<")),
    "criteria": [
        "Writes equity as a function of D with max(payoff − D, 0) state by state and checks the regions.",
        f"Shows that for D ≤ 10 there is no solution (the difference is always {g(VA - VB)}).",
        f"Solves 60 − D = 0.6(90 − D) for D = {g(Fs)} and verifies that it lies in (10, 60] with E_A = E_B = {g(EsA)}. Checking that C is lower ({g(EsC)}) closes the argument.",
        f"Explains the follow-up: above {g(Fs)} the manager chooses B, because the creditors' share of B's bad state, 0.4(D − 10), now exceeds the {g(VA - VB)} of value B destroys.",
        f"Full marks for noting that risk shifting escalates, with C chosen above D = {g(Fbc)} and an agency cost of {g(VA - VC)}.",
    ],
}
pd = {
    "label": "d", "points": 5,
    "body": (f"<p>Keep the debt of ${g(Fb)} million. A streaming platform offers Quillmoor a minimum-guarantee "
             f"deal that applies only to project B: if the game sells badly (the 40% state), the platform pays "
             f"Quillmoor ${g(gL)} million; if it sells well, Quillmoor pays the platform ${g(-gH)} million.</p>"
             f"<p>Will the management accept the deal? Who gains and who loses if Quillmoor signs the deal and "
             f"carries out project B?</p>"),
    "solution": (
        f"<p><b>Step 1. The deal creates no value.</b> 0.6 × (−{g(-gH)}) + 0.4 × {g(gL)} = −7.2 + 7.2 = {g(npv_g)}. "
        f"It only moves money from the good state to the bad state.</p>"
        f"<p><b>Step 2. B with the deal.</b> Payoffs become 90 − 12 = 78 and 10 + 18 = 28. Both are above the "
        f"face value of 25, so the debt becomes safe:</p>"
        + tab(["Claim", "B without the deal", "B with the deal", "Change"], [
            ["Shareholders", f"#{g(EB)}", f"#0.6 × 53 + 0.4 × 3 = {g(EBg)}", f"#{sg(EBg - EB)}"],
            ["Creditors", f"#{g(DB)}", f"#{g(DBg)}", f"#{sg(DBg - DB)}"],
            ["Firm", f"#{g(VB)}", f"#{g(VBg)}", f"#{g(VBg - VB)}"],
        ])
        + f"<p><b>Conclusion: the management rejects the deal.</b> It lowers equity from {g(EB)} to {g(EBg)}, "
          f"below even A's {g(EA)}, so the manager keeps doing B without the guarantee.</p>"
          f"<p><b>Who gains if Quillmoor signs and does B.</b> The guarantee removes the state in which the creditors bear the loss. The "
          f"creditors gain {g(DBg - DB)} and the shareholders lose exactly {g(EB - EBg)}: a pure wealth transfer "
          f"from the shareholders to the creditors, because the deal is zero-NPV.</p>"
          f"<p><b>Check.</b> {sg(EBg - EB)} + ({sg(DBg - DB)}) = {g(VBg - VB)} = the change in firm value. With "
          f"firm value fixed, the creditors' gain equals the shareholders' loss.</p>"
          f"<p>Hedging would be accepted if it had been agreed before the debt was issued (the creditors would "
          f"then pay for the safer claim) or if the creditors gave up part of the face value in return.</p>"),
    "criteria": [
        f"Shows that the deal is zero-NPV: 0.6 × (−12) + 0.4 × 18 = 0.",
        f"Recomputes B with the deal: payoffs 78 and 28, the debt becomes safe, equity = {g(EBg)} against {g(EB)} without the deal.",
        "Concludes that management rejects the deal (and notes that A, at 35, would beat B with the deal).",
        "Explains the mechanism: the guarantee removes the bad state in which the creditors bore the shortfall, so the risk-shifting gain goes back to the creditors. Kurbatov's key word: a wealth transfer from shareholders to debtholders.",
        f"The accounting: creditors {sg(DBg - DB)}, shareholders {sg(EBg - EB)}, firm value unchanged at {g(VB)}. Claiming that the shareholders gain from de-risking is a classic error.",
        "Bonus: hedging agreed before the debt was issued, or a cut in the face value, would make the deal acceptable.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd]
SETT["del2-f3"].append(ex)
SVAR["del2-f3:2:a"] = {"type": "blandet", "tall": [T("E[payoff] A", VA, "$ m"), T("E[payoff] B", VB, "$ m"), T("E[payoff] C", VC, "$ m")],
                       "tallPoeng": 1.5, "tekstLedd": "Which project will the manager choose?"}
SVAR["del2-f3:2:b"] = {"type": "blandet", "tall": [T("Equity value A", EA, "$ m"), T("Equity value B", EB, "$ m"), T("Equity value C", EC, "$ m"), T("Value of the debt (project B)", DB, "$ m")],
                       "tallPoeng": 3, "tekstLedd": "Which project will the manager choose?"}
SVAR["del2-f3:2:c"] = {"type": "blandet", "tall": [T("Debt level D (A ~ B)", Fs, "$ m")],
                       "tallPoeng": 3, "tekstLedd": "Briefly explain what happens if debt increases beyond that value."}
SVAR["del2-f3:2:d"] = {"type": "blandet", "tall": [T("Equity value B with the deal", EBg, "$ m"), T("Debt value B with the deal", DBg, "$ m")],
                       "tallPoeng": 2, "tekstLedd": "Will the management accept the deal? Who gains and who loses if Quillmoor signs and does B?",
                       "merknad": "Spørsmålet ber ikke direkte om tall, men svaret står på egenkapitalen med garantien (33 mot 39) og gjelden (25 mot 19)."}
F3_2 = dict(P=P, Fb=Fb, Fs=Fs, gL=gL, gH=gH)


# ======================================================================
# del2-f4 · oppgave 1: Kvernes Dagligvare (H2024 E3-formen)
# ======================================================================
N0, P0, D0, rD0, rE0 = 40.0, 125.0, 1000.0, 0.035, 0.10
E0 = N0 * P0
V = E0 + D0
rU = (E0 / V) * rE0 + (D0 / V) * rD0
assert near(rU, (E0 * rE0 + D0 * rD0) / V)
assert near(rE0, rU + (D0 / E0) * (rU - rD0))
Dn = 2200.0
div = Dn - D0
dps = div / N0
E1 = V - Dn
P1 = E1 / N0
assert near(P1 + dps, P0)                                  # kurs etter + utbytte = kurs før
assert near(N0 * P1 + div, E0)
bD, mrp = 0.2, 0.075
rD1 = rD0 + bD * mrp
rE1 = rU + (Dn / E1) * (rU - rD1)
assert near((E1 / V) * rE1 + (Dn / V) * rD1, rU)
rE1_feil = rU + (Dn / E1) * (rU - rD0)                       # glemt at gjelden ble risikabel
# (e) likningssystemet: N·P = div, (N0 − N)·P = E1  =>  N0·P = div + E1
Pr = (div + E1) / N0
Nr = div / Pr
assert near(Pr, P0) and near((N0 - Nr) * Pr, E1)
assert near(Nr, 9.6)

ex = {
    "n": 1, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [3, 4, 6, 15],
    "merke": "Som H2024 E3: ny gjeld, utbytte og tilbakekjøp",
    "body": (f"<p>Kvernes Dagligvare ASA, a grocery chain, currently has {g(N0)} million shares outstanding and "
             f"the share price is NOK {g(P0)} per share. The company operates in perfect capital markets and has "
             f"NOK {g(D0)} million in debt. Its debt is risk-free with an expected return of {pc(rD0)}, which is "
             f"also the risk-free rate. Its equity cost of capital is {pc(rE0)}. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the unlevered cost of capital (r<sub>U</sub>) of the firm?</p>",
    "solution": (
        f"<p><b>Step 1. Market values.</b> E = {g(N0)}M × NOK {g(P0)} = <b>NOK {g(E0)}M</b>, D = NOK {g(D0)}M, "
        f"V = <b>NOK {g(V)}M</b>.</p>"
        f"<p><b>Step 2. r<sub>U</sub> is the pre-tax WACC.</b> No taxes in a perfect market:</p>"
        f"<p>r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = ({g(E0)} × {g(rE0)} + {g(D0)} × "
        f"{g(rD0)}) / {g(V)} = ({g(E0 * rE0)} + {g(D0 * rD0)}) / {g(V)} = <b>{pc(rU)}</b></p>"
        f"<p>Cross-check with MM II: {pc(rU)} + ({g(D0)}/{g(E0)})({pc(rU)} − {pc(rD0)}) = {pc(rE0)}.</p>"),
    "criteria": [
        f"E = {g(N0)} × {g(P0)} = NOK {g(E0)}M from the share price; V = E + D = NOK {g(V)}M.",
        f"Weights E/V = {f(E0 / V)} and D/V = {f(D0 / V)}.",
        "Pre-tax WACC with no (1 − τ) term, because the market is perfect.",
        f"r_U = {pc(rU)}, with 4 decimals.",
    ],
}
pb = {
    "label": "b", "points": 3,
    "body": (f"<p>The management announces a new issue of NOK {g(Dn)} million of debt. The new debt will be used "
             f"to repay the existing debt and the rest is paid out as a dividend.</p><p>What happens to the "
             f"share price immediately upon announcement of the transaction?</p>"),
    "solution": (
        f"<p><b>Nothing. The share price stays at NOK {g(P0)}.</b></p>"
        f"<p>In a perfect capital market there are no taxes, so no tax shield is created. There are no "
        f"distress or agency costs either. By MM I the value of the firm is set by its assets, not by how their cash "
        f"flows are split between creditors and shareholders. The announcement changes only the split, so there "
        f"is nothing new for the market to price: V = NOK {g(V)}M, E = NOK {g(E0)}M and P = NOK {g(P0)} "
        f"before and after the announcement. Nothing has been paid out yet.</p>"),
    "criteria": [
        f"States clearly that the price does not change: NOK {g(P0)}.",
        "Gives the reason: perfect markets, no taxes, so no tax shield; MM I holds. The key: no immediate price reaction in an MM world.",
        "Distinguishes the announcement from the payout: nothing has been paid yet, so the price cannot have dropped.",
        "Bonus for the contrast with taxes, where the price would rise by the PV of the tax shield per share.",
    ],
}
pc_ = {
    "label": "c", "points": 6,
    "body": "<p>What happens to the share price after the conclusion of the transaction? Are the shareholders better off or worse off?</p>",
    "solution": (
        f"<p><b>Step 1. Trace the cash.</b> NOK {g(Dn)}M is raised, NOK {g(D0)}M repays the old debt and "
        f"<b>NOK {g(div)}M is paid out</b>: {g(div)} / {g(N0)} = <b>NOK {g(dps)} per share</b>.</p>"
        f"<p><b>Step 2. The new equity value.</b> V is unchanged at NOK {g(V)}M (MM I) and the debt is now "
        f"NOK {g(Dn)}M:</p><p>E = {g(V)} − {g(Dn)} = <b>NOK {g(E1)}M</b></p>"
        f"<p>A dividend retires no shares, so P = {g(E1)} / {g(N0)} = <b>NOK {g(P1)} per share</b>. The price "
        f"falls by exactly the dividend.</p>"
        f"<p><b>Step 3. Better or worse off? Neither.</b></p>"
        + tab(["Before", "After"], [[f"1 share worth NOK {g(P0)}", f"1 share worth NOK {g(P1)} + NOK {g(dps)} in cash = <b>NOK {g(P1 + dps)}</b>"]])
        + f"<p>The recapitalisation moves NOK {g(div)}M from the equity claim into the shareholders' pockets and "
          f"replaces it with a larger claim held by the creditors. In a perfect market that is repackaging.</p>"
          f"<p><b>Check.</b> {g(N0)}M × NOK {g(P1)} + NOK {g(div)}M = {g(N0 * P1)} + {g(div)} = <b>NOK "
          f"{g(N0 * P1 + div)}M</b>, the equity value before the transaction.</p>"),
    "criteria": [
        f"Dividend = {g(Dn)} − {g(D0)} = NOK {g(div)}M, or NOK {g(dps)} per share.",
        f"New E = {g(V)} − {g(Dn)} = NOK {g(E1)}M over an UNCHANGED {g(N0)}M shares: NOK {g(P1)}. Reducing the share count confuses a dividend with a repurchase.",
        f"The price falls by exactly the dividend, from {g(P0)} to {g(P1)}.",
        f"Answers the second question: neither better nor worse off, since {g(P1)} + {g(dps)} = {g(P0)}. A price drop is not a loss.",
        "Names the mechanism: MM I in a perfect market and the ex-dividend drop.",
        "Both halves, the new price and the welfare conclusion, are needed for the 6 points.",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": (f"<p>After the transaction the debt is risky: its beta is {g(bD)}. The risk-free rate is still "
             f"{pc(rD0)} and the market risk premium is {pc(mrp)}. What is the new equity cost of capital for the "
             f"firm?</p>"),
    "solution": (
        f"<p><b>Step 1. The new cost of debt (CAPM).</b> r<sub>D</sub> = {pc(rD0)} + {g(bD)} × {pc(mrp)} = "
        f"<b>{pc(rD1)}</b></p>"
        f"<p><b>Step 2. MM II with the new structure.</b> r<sub>U</sub> stays at {pc(rU)} (same assets). "
        f"D/E = {g(Dn)}/{g(E1)} = {f(Dn / E1)}:</p>"
        f"<p>r<sub>E</sub> = {pc(rU)} + {f(Dn / E1)} × ({pc(rU)} − {pc(rD1)}) = <b>{pc(rE1)}</b></p>"
        f"<p><b>Check.</b> ({g(E1)}/{g(V)}) × {pc(rE1)} + ({g(Dn)}/{g(V)}) × {pc(rD1)} = {pc(rU)} = r<sub>U</sub>. "
        f"This identity cannot catch a wrong r<sub>D</sub>; what matters is to use the new {pc(rD1)}. Keeping "
        f"the old {pc(rD0)} would give {pc(rE1_feil)}: the creditors now carry part of the risk, which pulls "
        f"r<sub>E</sub> down.</p>"),
    "criteria": [
        f"r_D = {pc(rD0)} + {g(bD)} × {pc(mrp)} = {pc(rD1)} from the CAPM.",
        f"Uses the POST-transaction D/E = {g(Dn)}/{g(E1)}, not the old {g(D0)}/{g(E0)}.",
        f"Keeps r_U = {pc(rU)}: a financing transaction does not change asset risk.",
        f"r_E = {pc(rE1)}. Using the old r_D of {pc(rD0)} gives {pc(rE1_feil)} and loses the point.",
    ],
}
pe = {
    "label": "e", "points": 3,
    "body": ("<p>Instead of a dividend, the management is considering a share repurchase. It will still repay the "
             "old debt and use the remaining money to repurchase shares.</p><p>What happens to the share price "
             "after the transaction? How many shares would the management repurchase?</p>"),
    "solution": (
        f"<p>Let P be the price after the transaction and N the number of shares repurchased. Equity is still "
        f"worth NOK {g(E1)}M after the payout (MM I), so</p>"
        f"<p>N × P = {g(div)} (the cash buys the shares)<br>({g(N0)} − N) × P = {g(E1)} (the remaining equity)</p>"
        f"<p>Adding the two: {g(N0)}P = {g(div + E1)}, so <b>P = NOK {g(Pr)}</b>, unchanged. Then "
        f"N = {g(div)} / {g(Pr)} = <b>{g(Nr)} million shares</b>, leaving {g(N0 - Nr)} million.</p>"
        f"<p><b>Check.</b> {g(E1)} / {g(N0 - Nr)} = NOK {g(E1 / (N0 - Nr))}. A repurchase at the market price is a "
        f"fair exchange, so the remaining shareholders neither gain nor lose. Under the dividend a shareholder "
        f"ends with NOK {g(P1)} + NOK {g(dps)}; under the repurchase a seller gets NOK {g(P0)} in cash and a "
        f"holder keeps a NOK {g(P0)} share. Payout policy is irrelevant in a perfect market.</p>"),
    "criteria": [
        f"Share price unchanged at NOK {g(P0)}, with the reason: the repurchase is a fair-value exchange of cash for shares.",
        f"Shares repurchased = {g(div)}/{g(P0)} = {g(Nr)} million, using the NOK {g(div)}M left after repaying the old debt, not the full {g(Dn)}.",
        f"The system N × P = {g(div)} and ({g(N0)} − N) × P = {g(E1)}, or the check {g(E1)}/{g(N0 - Nr)} = {g(P0)}, confirms the answer.",
        f"Bonus: the comparison with (c), dividend {g(P1)} + {g(dps)} against repurchase {g(P0)}, which is payout irrelevance.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["del2-f4"].append(ex)
SVAR["del2-f4:1:a"] = {"type": "tall", "tall": [T("r<sub>U</sub>", 100 * rU, "%")]}
SVAR["del2-f4:1:b"] = {"type": "blandet", "tall": [T("Share price on announcement", P0, "NOK per share")], "tallPoeng": 1,
                       "tekstLedd": "Explain what happens to the share price upon announcement and why.",
                       "merknad": "Blandet: grunnen (perfekt marked, MM I) er poenget med deloppgaven, som i h2024:3:b."}
SVAR["del2-f4:1:c"] = {"type": "blandet", "tall": [T("Share price after the dividend", P1, "NOK per share")], "tallPoeng": 3,
                       "tekstLedd": "Are the shareholders better off or worse off?"}
SVAR["del2-f4:1:d"] = {"type": "tall", "tall": [T("New r<sub>E</sub>", 100 * rE1, "%")]}
SVAR["del2-f4:1:e"] = {"type": "tall", "tall": [T("Share price after the repurchase", Pr, "NOK per share"), T("Shares repurchased", Nr, "m shares")]}
F4_1 = dict(N0=N0, P0=P0, D0=D0, Dn=Dn, rU=rU, rE1=rE1)


# ======================================================================
# del2-f4 · oppgave 2: Rognvik Vind (H2024 E4-formen, to strategier, tre tilstander)
# ======================================================================
pr = [0.3, 0.5, 0.2]
P = {"S": (pr, [60.0, 75.0, 90.0]), "R": (pr, [10.0, 35.0, 210.0])}
VS, VR = V_(*P["S"]), V_(*P["R"])
assert VS > VR and valg(P, 0)[0] == ["S"]
Fb = 50.0
ES, ER = E_(*P["S"], Fb), E_(*P["R"], Fb)
DS, DR = D_(*P["S"], Fb), D_(*P["R"], Fb)
for k in "SR":
    assert near(E_(*P[k], Fb) + D_(*P[k], Fb), V_(*P[k]))
assert valg(P, Fb)[0] == ["R"]
agency = VS - VR
assert near((ER - ES) + (DR - DS), VR - VS)
# (c) områder
assert VS - VR > 0                                          # F ≤ 10: ingen løsning
F_feil = (73.5 - 59.5) / (1 - 0.7)                          # 10 < F ≤ 35: forkastes
assert not (10 < F_feil <= 35)
Fs = (73.5 - 42.0) / (1 - 0.2)                              # 35 < F ≤ 60
assert 35 < Fs <= 60 and near(Fs, 39.375)
assert near(E_(*P["S"], Fs), E_(*P["R"], Fs))
EsS = E_(*P["S"], Fs)
F_hoy = (55.5 - 42.0) / (0.7 - 0.2)                         # 60 < F ≤ 75: forkastes også
assert not (60 < F_hoy <= 75)
grid = rutenett(P, 0, 150)
assert [k for _, k in grid] == ["S", "R"] and near(grid[1][0], Fs + 0.005, 0.006), grid
# hjelpetall for formlene i løsningen
assert near(0.5 * 35 + 0.2 * 210, 59.5) and near(0.3 * 60 + 0.5 * 75 + 0.2 * 90, 73.5)
# (d) smelterkontrakten
cS, cR = [10.0, 0.0, -15.0], [40.0, 0.0, -60.0]
npvS, npvR = V_(pr, cS), V_(pr, cR)
assert near(npvS, 0) and near(npvR, 0)
Sc = (pr, [a + b for a, b in zip(P["S"][1], cS)])
Rc = (pr, [a + b for a, b in zip(P["R"][1], cR)])
ESc, DSc, VSc = E_(*Sc, Fb), D_(*Sc, Fb), V_(*Sc)
ERc, DRc, VRc = E_(*Rc, Fb), D_(*Rc, Fb), V_(*Rc)
assert ESc > ERc and ESc < ER                                # avvises
assert near(DSc, Fb)
dE, dD, dVt = ESc - ER, DSc - DR, VSc - VR
assert near(dE + dD, dVt) and near(dVt, agency)
assert dD > dVt                                              # kreditorene tar mer enn hele gevinsten
Fx = 70.0
# (c) de øverste områdene: 75 < D ≤ 90 gir E_R − E_S = 24 hele veien, D > 90 gir E_S = 0 < E_R
for Dx in (76, 80, 89.9):
    assert near(E_(*P["R"], Dx) - E_(*P["S"], Dx), 24)
for Dx in (91, 150, 209):
    assert E_(*P["S"], Dx) == 0 and E_(*P["R"], Dx) > 0

stab = tab(["Strategy", "Low price (30%)", "Normal (50%)", "High price (20%)"], [
    ["S: fixed-price contracts", "#60", "#75", "#90"],
    ["R: sell at spot prices", "#10", "#35", "#210"],
])
ex = {
    "n": 2, "title": "Debt and risk", "points": 18,
    "topic": "Risk shifting and hedging", "chapters": [9, 24],
    "merke": "Som H2024 E4: valg av strategi med og uten gjeld og en kraftkontrakt",
    "body": (f"<p>Rognvik Vind AS, a wind-power developer, must choose one of two strategies for its new wind "
             f"farm. The value of the farm at t = 1 depends on the power price (NOK million):</p>{stab}"
             f"<p>Any debt is a zero-coupon loan due at t = 1. Investors are risk neutral and the risk-free rate is "
             f"0%. The manager acts in the best interests of Rognvik's shareholders.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>Assume that Rognvik has no debt. Which strategy will the manager choose?</p>",
    "solution": (
        "<p>With no debt the shareholders own the whole firm, so the manager picks the highest expected value:</p>"
        + tab(["Strategy", "Expected value", "Value"], [
            ["S", "0.3 × 60 + 0.5 × 75 + 0.2 × 90 = 18 + 37.5 + 18", f"#{g(VS)}"],
            ["R", "0.3 × 10 + 0.5 × 35 + 0.2 × 210 = 3 + 17.5 + 42", f"#{g(VR)}"],
        ])
        + f"<p><b>The manager chooses S</b>, worth NOK {g(VS)}M: the first-best choice.</p>"),
    "criteria": [
        "With no debt, equity value = firm value: maximise the expected payoff.",
        f"Both expectations shown: S = {g(VS)}, R = {g(VR)}.",
        "Chooses S, the first-best benchmark.",
        "Show the calculation.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": (f"<p>Assume that Rognvik has debt with a face value of NOK {g(Fb)} million. Which strategy will the "
             f"manager choose? What is the agency cost of debt?</p>"),
    "solution": (
        f"<p>Shareholders get max(value − {g(Fb)}, 0) in each state:</p>"
        + tab(["Strategy", "Equity, state by state", "Equity", "Debt", "Firm"], [
            ["S", "0.3 × 10 + 0.5 × 25 + 0.2 × 40 = 3 + 12.5 + 8", f"#{g(ES)}", f"#{g(DS)}", f"#{g(VS)}"],
            ["R", "0.3 × 0 + 0.5 × 0 + 0.2 × 160", f"#<b>{g(ER)}</b>", f"#{g(DR)}", f"#{g(VR)}"],
        ])
        + f"<p><b>The manager chooses R</b>, which gives the shareholders {g(ER)} against {g(ES)}. Under R the "
          f"loan is repaid in full only when the price is high; the creditors get 0.3 × 10 + 0.5 × 35 + 0.2 × 50 "
          f"= {g(DR)}.</p>"
          f"<p><b>Agency cost of debt</b> = the firm value lost because the debt distorts the choice: "
          f"{g(VS)} − {g(VR)} = <b>NOK {g(agency)}M</b>.</p>"
          f"<p><b>Check.</b> Shareholders {sg(ER - ES)}, creditors {sg(DR - DS)}, firm {sg(VR - VS)}: "
          f"{sg(ER - ES)} + ({sg(DR - DS)}) = {sg(VR - VS)}. The shareholders gain at the creditors' expense: "
          f"risk shifting with a wealth transfer from the creditors.</p>"),
    "criteria": [
        f"Values equity state by state with max(value − {g(Fb)}, 0): S = {g(ES)}, R = {g(ER)}.",
        "Chooses R.",
        f"Agency cost = {g(VS)} − {g(VR)} = NOK {g(agency)}M, the drop in firm value relative to the first best.",
        f"Full marks for the accounting: creditors {sg(DR - DS)}, shareholders {sg(ER - ES)}. Also for naming risk shifting (asset substitution) and the wealth transfer.",
    ],
}
pc_ = {
    "label": "c", "points": 6,
    "body": ("<p>Is there a level of debt for which the manager is indifferent between the two strategies? If it "
             "exists, find it and briefly explain what happens if debt increases beyond that value. If it does "
             "not exist, explain why.</p>"),
    "solution": (
        f"<p>Write equity as a function of the face value D, region by region. S is safe for D ≤ 60, so "
        f"E<sub>S</sub> = 73.5 − D there.</p>"
        f"<p><b>Region D ≤ 10.</b> Both are safe: E<sub>S</sub> − E<sub>R</sub> = {g(VS)} − {g(VR)} = {g(VS - VR)} "
        f"&gt; 0. No solution.</p>"
        f"<p><b>Region 10 &lt; D ≤ 35.</b> R defaults only in the low state: E<sub>R</sub> = 0.5(35 − D) + "
        f"0.2(210 − D) = 59.5 − 0.7D.<br>73.5 − D = 59.5 − 0.7D gives D = {f(F_feil)}, which is not in "
        f"(10, 35]. <b>Reject.</b></p>"
        f"<p><b>Region 35 &lt; D ≤ 60.</b> R pays equity only in the high state: E<sub>R</sub> = 0.2(210 − D).<br>"
        f"73.5 − D = 42 − 0.2D<br>0.8D = 31.5<br><b>D = NOK {g(Fs)}M</b>, which lies in (35, 60].</p>"
        f"<p><b>Verify.</b> E<sub>S</sub> = 73.5 − {g(Fs)} = {g(EsS)} and E<sub>R</sub> = 0.2 × {g(210 - Fs)} = "
        f"{g(E_(*P['R'], Fs))}.</p>"
        f"<p><b>No other solution.</b> For 60 &lt; D ≤ 75 the equation 55.5 − 0.7D = 42 − 0.2D gives D = "
        f"{g(F_hoy)}, outside the region. For 75 &lt; D ≤ 90, E<sub>S</sub> = 0.2(90 − D) is always 24 below "
        f"E<sub>R</sub> = 0.2(210 − D). Above 90 S leaves the shareholders nothing while R still pays them "
        f"something (until D = 210, where both are worthless).</p>"
        f"<p><b>Beyond {g(Fs)}</b> the manager chooses R. Each extra unit of debt costs the S shareholders a "
        f"full unit (they repay it in every state), but costs the R shareholders only 0.2, because they repay "
        f"only in the high state. The more debt, the more the shareholders gamble with the creditors' money. "
        f"The firm loses NOK {g(agency)}M of value. At D = {g(Fx)}, for example, E<sub>S</sub> = "
        f"{g(E_(*P['S'], Fx))} and E<sub>R</sub> = {g(E_(*P['R'], Fx))}.</p>"),
    "criteria": [
        "Sets up E(D) with max(value − D, 0) state by state and works region by region.",
        f"Shows that the region between 10 and 35 gives D = {f(F_feil)}, outside the region, so it is rejected. Stopping there with 46.67 is the classic error (H2024 E4c had the same trap).",
        f"Solves 73.5 − D = 0.2(210 − D) for D = {g(Fs)} in the region between 35 and 60.",
        f"Verifies that both equity values equal {g(EsS)}.",
        "Explains the follow-up: above that level R is chosen, because R's equity falls by only 0.2 per unit of debt against 1 for S. Risk shifting gets worse with leverage.",
        "A graph is not necessary for full marks.",
    ],
}
ctab = tab(["Strategy", "Low price (30%)", "Normal (50%)", "High price (20%)"], [
    ["S", "#+10", "#0", "#−15"],
    ["R", "#+40", "#0", "#−60"],
])
pd = {
    "label": "d", "points": 5,
    "body": (f"<p>Keep the debt of NOK {g(Fb)} million. An aluminium smelter wants to lock in its power cost and "
             f"offers Rognvik a contract with these payments to Rognvik at t = 1 (NOK million):</p>{ctab}"
             f"<p>Will the management accept the contract? Explain why or why not.</p>"),
    "solution": (
        f"<p><b>Step 1. The contract creates no value.</b> Under S: 0.3 × 10 − 0.2 × 15 = 3 − 3 = {g(npvS)}. "
        f"Under R: 0.3 × 40 − 0.2 × 60 = 12 − 12 = {g(npvR)}. It only moves money from the high-price state to "
        f"the low-price state: a pure hedge.</p>"
        f"<p><b>Step 2. Choice with the contract.</b></p>"
        + tab(["With the contract", "Values", "Equity", "Debt", "Firm"], [
            ["S", "70 / 75 / 75", f"#0.3 × 20 + 0.5 × 25 + 0.2 × 25 = {g(ESc)}", f"#{g(DSc)}", f"#{g(VSc)}"],
            ["R", "50 / 35 / 150", f"#0.2 × 100 = {g(ERc)}", f"#{g(DRc)}", f"#{g(VRc)}"],
        ])
        + f"<p>With the contract the best the shareholders can do is S, worth {g(ESc)}. Without it they choose R "
          f"and get {g(ER)}. <b>The management rejects the contract</b>, because {g(ESc)} &lt; {g(ER)}.</p>"
          f"<p><b>Why.</b> The contract fills the low state and makes the debt safe. The shareholders would then "
          f"give up the gain from risk shifting, which was paid for by the creditors. The hedge makes the firm "
          f"better off (it leads back to S) but the creditors capture all of that and more: a wealth transfer "
          f"from the shareholders to the creditors.</p>"
          f"<p><b>Check.</b> Contract with S against R without it:</p>"
          + tab(["Claim", "R, no contract", "S with contract", "Change"], [
              ["Shareholders", f"#{g(ER)}", f"#{g(ESc)}", f"#{sg(dE)}"],
              ["Creditors", f"#{g(DR)}", f"#{g(DSc)}", f"#{sg(dD)}"],
              ["Firm", f"#{g(VR)}", f"#{g(VSc)}", f"#{sg(dVt)}"],
          ])
          + f"<p>{sg(dE)} + {g(dD)} = {sg(dVt)}, exactly the agency cost from (b) that disappears when the firm "
            f"goes back to S. The creditors gain more than the whole {g(dVt)}. Renegotiating the loan, or a covenant agreed before the "
            f"debt was issued, could share the gain so that both sides accept.</p>"),
    "criteria": [
        "Shows that the contract is zero-NPV under both strategies (0.3 × 10 = 0.2 × 15 and 0.3 × 40 = 0.2 × 60), so nothing here is about expected value.",
        f"Recomputes equity with the contract and re-optimises: S = {g(ESc)}, R = {g(ERc)}. Checking only R with the contract misses that the manager can switch to S.",
        f"Compares with {g(ER)} without the contract and concludes that management REJECTS it.",
        "Explains the mechanism: the contract makes the debt safe and removes the shareholders' risk-shifting gain. Key words: a wealth transfer from the shareholders to the creditors.",
        f"The accounting: shareholders {sg(dE)}, creditors {sg(dD)}, firm {sg(dVt)}. The creditors capture more than the whole gain.",
        "Bonus: renegotiation or covenants as the fix.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd]
SETT["del2-f4"].append(ex)
SVAR["del2-f4:2:a"] = {"type": "blandet", "tall": [T("E[value] S", VS, "NOK m"), T("E[value] R", VR, "NOK m")],
                       "tallPoeng": 1.5, "tekstLedd": "Which strategy will the manager choose?"}
SVAR["del2-f4:2:b"] = {"type": "blandet", "tall": [T("Equity value S", ES, "NOK m"), T("Equity value R", ER, "NOK m"), T("Agency cost of debt", agency, "NOK m")],
                       "tallPoeng": 3, "tekstLedd": "Which strategy will the manager choose?"}
SVAR["del2-f4:2:c"] = {"type": "blandet", "tall": [T("Debt level D (S ~ R)", Fs, "NOK m")],
                       "tallPoeng": 4, "tekstLedd": "Briefly explain what happens if debt increases beyond that value."}
SVAR["del2-f4:2:d"] = {"type": "blandet", "tall": [T("Equity value S with contract", ESc, "NOK m"), T("Equity value R with contract", ERc, "NOK m")],
                       "tallPoeng": 2, "tekstLedd": "Will the management accept the contract? Explain why or why not.",
                       "merknad": "Spørsmålet ber ikke direkte om tall, men svaret står på egenkapitalen med kontrakten (23.5 og 20) mot 32 uten, som i h2024:4:d."}
F4_2 = dict(Fb=Fb, Fs=Fs)


# ======================================================================
# del2-f5 · oppgave 1: Vandeldt Water (H2025 E3-formen, D/E-mål, hjemmelaget gjeld)
# ======================================================================
N0, D0, rf, FCF, rE0 = 25.0, 250.0, 0.03, 67.5, 0.08
int0 = rf * D0
div0 = FCF - int0
E0 = div0 / rE0
P0 = E0 / N0
V = E0 + D0
rU = FCF / V
assert near(rU, (E0 / V) * rE0 + (D0 / V) * rf)
dps0 = div0 / N0
Pcum, Pex = P0 + dps0, dps0 / rE0
assert near(Pex, P0) and near(P0, (dps0 + Pex) / (1 + rE0))
de = 1.5
dv = de / (1 + de)
D1 = dv * V
newD = D1 - D0
Nb = newD / P0
N1 = N0 - Nb
E1 = V - D1
assert near(D1 / E1, de) and near(E1 / N1, P0)
D_feil = de * E0                                            # D/E-målet brukt på gammel E
int1 = rf * D1
div1 = FCF - int1
dps1 = div1 / N1
rE1 = rU + de * (rU - rf)
assert near(rE1, div1 / E1) and near(dps1 / rE1, P0)
assert near((E1 / V) * rE1 + dv * rf, rU)
# (e) tre investorer med 100 aksjer
n = 100
ana_cf, ana_v = n * dps0, n * dps0 / rE0
ben_cash = n * P0
ben_cf = ben_cash * rf
carla_cf = n * dps1
carla_v = carla_cf / rE1
assert near(ana_v, ben_cash) and near(ben_cf / rf, ben_cash) and near(carla_v, ben_cash)
andel = Nb / N0                                              # brøken firmaet kjøper tilbake
sell = n * andel
keep = n - sell
cash = sell * P0
mix_cf = cash * rf + keep * dps1
assert near(mix_cf, ana_cf)                                  # hjemmelaget gjeld gjenskaper Ana
assert near(cash + keep * P0, ana_v)
assert near(sell, 46.666666666666664)

ex = {
    "n": 1, "title": "Capital Structure", "points": 18,
    "topic": "MM in perfect markets, recapitalisation", "chapters": [4, 6, 15],
    "merke": "Som H2025 E3: evigrente, utbytte og rekapitalisering",
    "body": (f"<p>Vandeldt Water NV, a regulated water utility, operates in a perfect capital market with no "
             f"taxes. It has {g(N0)} million shares outstanding and €{g(D0)} million of risk-free debt. The "
             f"risk-free rate is {pc(rf)}. The company generates an expected free cash flow of €{g(FCF)} million "
             f"every year in perpetuity and pays out all cash flows as interest and dividends at the end of each "
             f"year. Its equity cost of capital is {pc(rE0)}. Use 4 decimal places.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>What is the share price right now? What is the unlevered cost of capital of the firm?</p>",
    "solution": (
        f"<p><b>Step 1. Equity from its own cash flow.</b> Interest is {pc(rf)} × €{g(D0)}M = €{g(int0)}M, so "
        f"the shareholders receive {g(FCF)} − {g(int0)} = €{g(div0)}M a year forever:</p>"
        f"<p>E = {g(div0)} / {g(rE0)} = <b>€{g(E0)}M</b> and P<sub>0</sub> = {g(E0)} / {g(N0)} = <b>€{g(P0)} per "
        f"share</b></p>"
        f"<p><b>Step 2. r<sub>U</sub>.</b> V = {g(E0)} + {g(D0)} = €{g(V)}M. With no taxes r<sub>U</sub> is the "
        f"pre-tax WACC: r<sub>U</sub> = FCF / V = {g(FCF)} / {g(V)} = <b>{pc(rU)}</b>.</p>"
        f"<p><b>Check.</b> ({g(E0)}/{g(V)}) × {pc(rE0)} + ({g(D0)}/{g(V)}) × {pc(rf)} = {pc(E0 / V * rE0)} + "
        f"{pc(D0 / V * rf)} = {pc(rU)}.</p>"),
    "criteria": [
        f"Subtracts the interest first: {g(FCF)} − {g(int0)} = €{g(div0)}M to equity. Discounting the whole FCF at r_E is the classic error.",
        f"E = {g(div0)}/{g(rE0)} = €{g(E0)}M and share price = €{g(P0)}.",
        f"r_U = {g(FCF)}/{g(V)} = {pc(rU)}, or the pre-tax WACC with weights {g(E0 / V)} and {g(D0 / V)}. Both routes are accepted.",
        "Show the calculation.",
    ],
}
pb = {
    "label": "b", "points": 3,
    "body": "<p>What is the dividend per share at the end of Year 1? What is the share price just before and just after it is paid?</p>",
    "solution": (
        f"<p><b>Dividend.</b> €{g(div0)}M / {g(N0)}M = <b>€{g(dps0)} per share</b>.</p>"
        f"<p><b>Just after.</b> The share is again a claim on €{g(dps0)} a year forever: {g(dps0)} / {g(rE0)} = "
        f"<b>€{g(Pex)}</b>.</p><p><b>Just before.</b> The holder is about to receive the dividend as well: "
        f"{g(Pex)} + {g(dps0)} = <b>€{g(Pcum)}</b>.</p>"
        f"<p><b>Check.</b> P<sub>0</sub> = (Div<sub>1</sub> + P<sub>1</sub>)/(1 + r<sub>E</sub>) = {g(Pcum)} / "
        f"{g(1 + rE0)} = €{g(P0)}. The price climbs from {g(P0)} to {g(Pcum)} over the year and drops back by "
        f"the dividend.</p>"),
    "criteria": [
        f"Dividend per share = {g(div0)}/{g(N0)} = €{g(dps0)}.",
        f"Ex-dividend price €{g(Pex)} = {g(dps0)}/{g(rE0)}.",
        f"Cum-dividend price €{g(Pcum)} = ex-dividend price + dividend, or P0 × (1 + r_E).",
        "Notes that the price is flat from year to year because nothing is retained.",
    ],
}
pc_ = {
    "label": "c", "points": 4,
    "body": (f"<p>Instead of the projected scenario, the board decides to issue debt right now and use the proceeds "
             f"to repurchase shares, so that the debt-to-equity ratio becomes {g(de)}.</p><p>How much new debt "
             f"will be issued? What happens to the share price upon announcement? How many shares will be "
             f"repurchased?</p>"),
    "solution": (
        f"<p><b>Step 1. No value effect.</b> No taxes, so MM I holds: V stays at €{g(V)}M and <b>the share price "
        f"stays at €{g(P0)}</b> on announcement.</p>"
        f"<p><b>Step 2. Convert the target.</b> D/E = {g(de)} means D/V = {g(de)} / (1 + {g(de)}) = <b>{g(dv)}</b>. "
        f"Target debt = {g(dv)} × {g(V)} = €{g(D1)}M, so the firm issues {g(D1)} − {g(D0)} = <b>€{g(newD)}M of "
        f"new debt</b>.</p>"
        f"<p><b>Step 3. Shares.</b> {g(newD)} / {g(P0)} = <b>{f(Nb)} million shares</b> repurchased at the "
        f"unchanged price, leaving {f(N1)} million.</p>"
        f"<p><b>Check.</b> E = {g(V)} − {g(D1)} = €{g(E1)}M, so D/E = {g(D1)}/{g(E1)} = {g(D1 / E1)} as targeted, while "
        f"{g(E1)} / {f(N1)} = €{g(E1 / N1)} per share.</p>"),
    "criteria": [
        f"Price unchanged at €{g(P0)} on announcement, because MM I holds without taxes.",
        f"Converts D/E = {g(de)} into D/V = {g(dv)}. Setting D = {g(de)} × {g(E0)} = {g(D_feil)} with the OLD equity value forgets that equity shrinks and loses the point.",
        f"New debt = {g(dv)} × {g(V)} − {g(D0)} = €{g(newD)}M.",
        f"Shares repurchased = {g(newD)}/{g(P0)} = {f(Nb)} million.",
        f"The check D/E = {g(D1)}/{g(E1)} = {g(de)} is a bonus and catches the D/E-versus-D/V slip.",
    ],
}
pd = {
    "label": "d", "points": 3,
    "body": "<p>What is the dividend per share at the end of Year 1 now? What is the new equity cost of capital?</p>",
    "solution": (
        f"<p><b>Dividend.</b> Interest = {pc(rf)} × {g(D1)} = €{g(int1)}M, so equity gets {g(FCF)} − {g(int1)} = "
        f"€{g(div1)}M over {f(N1)}M shares: <b>€{f(dps1)} per share</b>.</p>"
        f"<p><b>Cost of equity.</b> r<sub>E</sub> = {pc(rU)} + {g(de)} × ({pc(rU)} − {pc(rf)}) = "
        f"<b>{pc(rE1)}</b>. The same from the cash flow: {g(div1)} / {g(E1)} = {pc(rE1)}.</p>"
        f"<p><b>Check.</b> {f(dps1)} / {f(rE1, 5)} = €{g(dps1 / rE1)}: the price is unchanged.</p>"),
    "criteria": [
        f"Interest on the new debt is {g(int1)}. Dividend per share {g(div1)}/{f(N1)} = €{f(dps1)} on the REDUCED share count.",
        f"r_E = {pc(rE1)} from MM II with D/E = {g(de)}, or from the equity cash flow.",
        f"Optional: {f(dps1)}/{pc(rE1)} = €{g(P0)}.",
    ],
}
pe = {
    "label": "e", "points": 5,
    "body": ("<p>Three investors each own 100 shares. Ana is in the original scenario (no recapitalisation). In the "
             "new scenario Ben sells all his shares in the repurchase and lends the cash at the risk-free rate, "
             "while Carla keeps all her shares. Compare their expected yearly cash flows and the values of their "
             "positions today.</p><p>How could an investor in the new scenario get exactly Ana's yearly cash flow? "
             "Comment.</p>"),
    "solution": (
        tab(["Investor", "Expected yearly cash flow", "Risk", "Value today"], [
            ["Ana (no recap)", f"100 × €{g(dps0)} = €{g(ana_cf)}", "equity of the firm as it was", f"#{g(ana_cf)} / {g(rE0)} = €{g(ana_v)}"],
            ["Ben (sold, lends)", f"€{g(ben_cash)} × {g(rf)} = €{g(ben_cf)}", "risk-free", f"#{g(ben_cf)} / {g(rf)} = €{g(ben_cf / rf)}"],
            ["Carla (kept)", f"100 × €{f(dps1)} = €{g(carla_cf)}", "levered equity, more risk", f"#{g(carla_cf)} / {f(rE1, 5)} = €{g(carla_v)}"],
        ])
        + f"<p>All three positions are worth <b>€{g(ana_v)}</b>. The cash flows differ only because the risk "
          f"differs: Ben's is lowest and safe, Carla's is highest and riskiest.</p>"
          f"<p><b>Recreating Ana's position (homemade leverage).</b> Sell the same fraction of the shares as the "
          f"firm repurchases, {f(Nb)}/{g(N0)} = {pc(andel)}. Then lend the cash:</p>"
          f"<p>Sell {f(sell)} shares × €{g(P0)} = €{g(cash)}, lent at {pc(rf)}: €{g(cash * rf)} a year<br>"
          f"Keep {f(keep)} shares × €{f(dps1)} = €{g(keep * dps1)} a year<br>Total = <b>€{g(mix_cf)} a year</b>, "
          f"exactly Ana's.</p>"
          f"<p>The investor now owns the same fraction of the new debt and of the new equity, which together are "
          f"the old firm. That is why the cash flow matches in every state, not only in expectation.</p>"
          f"<p><b>Comment.</b> MM I: the recapitalisation creates no value, nobody is better or worse off. Any "
          f"investor can undo (or copy) the firm's leverage on their own account.</p>"
          f"<p><b>Check.</b> The investor's position is worth {g(cash)} + {f(keep)} × {g(P0)} = €{g(cash + keep * P0)}, "
          f"the same as Ana's.</p>"),
    "criteria": [
        f"Expected yearly cash flows: Ana €{g(ana_cf)}, Ben €{g(ben_cf)} (risk-free), Carla €{g(carla_cf)}.",
        f"Values: {g(ana_cf)}/{pc(rE0)}, {g(ben_cf)}/{pc(rf)} and {g(carla_cf)}/{pc(rE1)} all equal €{g(ana_v)}. Each is discounted at its own rate.",
        "Explains that the higher cash flow is compensation for higher risk, not a gain.",
        f"Recreates Ana: sell {f(sell)} shares ({pc(andel)}, the fraction the firm buys back), lend €{g(cash)} for €{g(cash * rf)} a year and keep {f(keep)} shares for €{g(keep * dps1)}, total €{g(mix_cf)}.",
        "Comment: anything reasonable about MM, for example MM I or homemade leverage.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd, pe]
SETT["del2-f5"].append(ex)
SVAR["del2-f5:1:a"] = {"type": "tall", "tall": [T("P<sub>0</sub>", P0, "€ per share"), T("r<sub>U</sub>", 100 * rU, "%")]}
SVAR["del2-f5:1:b"] = {"type": "tall", "tall": [T("Div<sub>1</sub>", dps0, "€ per share"), T("Price just before", Pcum, "€ per share"), T("Price just after", Pex, "€ per share")]}
SVAR["del2-f5:1:c"] = {"type": "tall", "tall": [T("New debt issued", newD, "€ m"), T("Share price on announcement", P0, "€ per share"), T("Shares repurchased", Nb, "m shares")]}
SVAR["del2-f5:1:d"] = {"type": "tall", "tall": [T("Div<sub>1</sub>", dps1, "€ per share"), T("New r<sub>E</sub>", 100 * rE1, "%")]}
SVAR["del2-f5:1:e"] = {"type": "blandet", "tall": [T("Ben's yearly cash flow", ben_cf, "€"), T("Carla's yearly cash flow", carla_cf, "€"),
                                                   T("Value of each position", ana_v, "€"),
                                                   T("Shares held to recreate Ana", keep, "shares"), T("Amount lent to recreate Ana", cash, "€")],
                       "tallPoeng": 3, "tekstLedd": "Comment. How can Ana's yearly cash flow be recreated?",
                       "merknad": "Anas 240 i året er målet for gjenskapingen og står i løsningen; den er utelatt for å holde fem tall. Den som oppgir at investoren selger 46.6667 aksjer, har samme svar som 53.3333 beholdt."}
F5_1 = dict(N0=N0, D0=D0, FCF=FCF, P0=P0, newD=newD, dps1=dps1, rE1=rE1)


# ======================================================================
# del2-f5 · oppgave 2: Lüdersen Spezialchemie (H2024 E4-formen med kontanter)
# ======================================================================
cash0 = 40.0
P = {"K": ([1.0], [40.0]), "A": ([1.0], [46.0]), "B": ([0.6, 0.4], [65.0, 10.0]), "C": ([0.2, 0.8], [120.0, 5.0])}
Vv = {k: V_(*P[k]) for k in P}
npv = {k: Vv[k] - cash0 for k in P}
assert npv["A"] > npv["B"] > 0 > npv["C"] and valg(P, 0)[0] == ["A"]
Fb = 30.0
Ev = {k: E_(*P[k], Fb) for k in P}
Dv = {k: D_(*P[k], Fb) for k in P}
for k in P:
    assert near(Ev[k] + Dv[k], Vv[k])
assert valg(P, Fb)[0] == ["B"]
assert near((Ev["B"] - Ev["A"]) + (Dv["B"] - Dv["A"]), Vv["B"] - Vv["A"])
# (c) B ~ C
assert Vv["B"] - Vv["C"] > 0                                 # D ≤ 5: ingen løsning
F_feil = (43.0 - 24.0) / (1 - 0.2)                           # 5 < D ≤ 10: forkastes
assert not (5 < F_feil <= 10) and near(F_feil, 23.75)
Fs = (39.0 - 24.0) / (0.6 - 0.2)                             # 10 < D ≤ 65
assert 10 < Fs <= 65 and near(Fs, 37.5)
assert near(E_(*P["B"], Fs), E_(*P["C"], Fs))
Es = {k: E_(*P[k], Fs) for k in P}
assert Es["A"] < Es["B"] and Es["K"] < Es["B"]
FAB = (46.0 - 39.0) / (1 - 0.6)                              # A ~ B
assert near(FAB, 17.5)
grid = rutenett(P, 0, 130)
assert [k for _, k in grid] == ["A", "B", "C"], grid
assert near(grid[1][0], FAB + 0.005, 0.006) and near(grid[2][0], Fs + 0.005, 0.006)
agency_hoy = Vv["A"] - Vv["C"]
# (d) kontrakten fra kunden (H2024 E4 d-formen: signere eller ikke, og hva aksjene og lånet er verdt)
hB, hC = (-14.0, 21.0), (-20.0, 5.0)
npvhB = 0.6 * hB[0] + 0.4 * hB[1]
npvhC = 0.2 * hC[0] + 0.8 * hC[1]
assert near(npvhB, 0) and near(npvhC, 0)
Ph = {"K": P["K"], "A": P["A"],
      "B": ([0.6, 0.4], [65.0 + hB[0], 10.0 + hB[1]]),
      "C": ([0.2, 0.8], [120.0 + hC[0], 5.0 + hC[1]])}
Eh = {k: E_(*Ph[k], Fb) for k in Ph}
Dh = {k: D_(*Ph[k], Fb) for k in Ph}
for k in Ph:
    assert near(Eh[k] + Dh[k], V_(*Ph[k]))
assert valg(Ph, Fb)[0] == ["A"] and Eh["A"] < Ev["B"]       # med kontrakten velges A, og den avvises
assert near(Dh["B"], Fb) and Dh["C"] < Fb                   # B blir trygg, C ikke
dEd, dDd, dVd = Eh["A"] - Ev["B"], Dh["A"] - Dv["B"], Vv["A"] - Vv["B"]
assert near(dEd + dDd, dVd) and dDd > dVd                   # banken tar mer enn hele gevinsten
assert (dEd, dDd, dVd) == (-5.0, 8.0, 3.0)
# fellen «glemt å optimere på nytt» (B med kontrakt) gir aksjer 13, ikke 16
assert not near(Eh["B"], Eh["A"]) and not near(Eh["C"], Eh["A"])
# (c) over 65: E_B = 0, E_C > 0 til D = 120
for Dx in (66, 100, 119):
    assert E_(*P["B"], Dx) == 0 and E_(*P["C"], Dx) > 0

ltab = tab(["", "Probability", "Payoff at t = 1, € million"], [
    ["Keep the cash", "#100%", "#40"],
    ["Project A", "#100%", "#46"],
    ["Project B", "#60%", "#65"], ["", "#40%", "#10"],
    ["Project C", "#20%", "#120"], ["", "#80%", "#5"],
])
ex = {
    "n": 2, "title": "Debt and risk", "points": 18,
    "topic": "Risk shifting and hedging", "chapters": [9, 24],
    "merke": "Som H2024 E4: prosjektvalg med og uten gjeld og en kontrakt",
    "body": (f"<p>Lüdersen Spezialchemie GmbH holds €{g(cash0)} million in cash and has no other assets. It can "
             f"keep the cash, which earns 0%, or invest all of it in one of three projects. Each project costs "
             f"€{g(cash0)} million today and pays off once, at t = 1:</p>{ltab}<p>Any debt is a zero-coupon bank "
             f"loan due at t = 1. Investors are risk neutral and the risk-free rate is 0%. The manager acts in the "
             f"best interests of Lüdersen's shareholders.</p>"),
}
pa = {
    "label": "a", "points": 3,
    "body": "<p>Assume that Lüdersen has no debt. What will the manager do?</p>",
    "solution": (
        "<p>With no debt the shareholders own everything, so the manager maximises the expected payoff (the NPV "
        "is the payoff minus the €40M invested):</p>"
        + tab(["Alternative", "Expected payoff", "Value", "NPV"], [
            ["Keep the cash", "40", f"#{g(Vv['K'])}", f"#{g(npv['K'])}"],
            ["A", "46", f"#{g(Vv['A'])}", f"#{sg(npv['A'])}"],
            ["B", "0.6 × 65 + 0.4 × 10 = 39 + 4", f"#{g(Vv['B'])}", f"#{sg(npv['B'])}"],
            ["C", "0.2 × 120 + 0.8 × 5 = 24 + 4", f"#{g(Vv['C'])}", f"#{sg(npv['C'])}"],
        ])
        + f"<p><b>The manager invests in project A</b>, the highest value ({g(Vv['A'])}). C has a negative NPV "
          f"and would never be chosen by an all-equity firm.</p>"),
    "criteria": [
        "With no debt the criterion is the highest expected payoff (or NPV).",
        f"Values shown: keep 40, A {g(Vv['A'])}, B {g(Vv['B'])}, C {g(Vv['C'])}.",
        f"Chooses A and notes that C has NPV {sg(npv['C'])}.",
        "Show the calculation.",
    ],
}
pb = {
    "label": "b", "points": 4,
    "body": f"<p>Assume that Lüdersen owes the bank €{g(Fb)} million (face value). What will the manager do?</p>",
    "solution": (
        f"<p>Shareholders get max(payoff − {g(Fb)}, 0) in each state:</p>"
        + tab(["Alternative", "Equity", "Debt", "Firm"], [
            ["Keep the cash", f"#40 − 30 = {g(Ev['K'])}", f"#{g(Dv['K'])}", f"#{g(Vv['K'])}"],
            ["A", f"#46 − 30 = {g(Ev['A'])}", f"#{g(Dv['A'])}", f"#{g(Vv['A'])}"],
            ["B", f"#0.6 × 35 = <b>{g(Ev['B'])}</b>", f"#0.6 × 30 + 0.4 × 10 = {g(Dv['B'])}", f"#{g(Vv['B'])}"],
            ["C", f"#0.2 × 90 = {g(Ev['C'])}", f"#0.2 × 30 + 0.8 × 5 = {g(Dv['C'])}", f"#{g(Vv['C'])}"],
        ])
        + f"<p><b>The manager invests in project B</b> ({g(Ev['B'])} for the shareholders against "
          f"{g(Ev['A'])} for A). The firm forgoes the extra {g(Vv['A'] - Vv['B'])} of value in A because B's "
          f"bad state is borne by the bank: risk shifting.</p>"
          f"<p><b>Check.</b> Relative to A: shareholders {sg(Ev['B'] - Ev['A'])}, bank {sg(Dv['B'] - Dv['A'])}, "
          f"firm {sg(Vv['B'] - Vv['A'])}; {sg(Ev['B'] - Ev['A'])} + ({sg(Dv['B'] - Dv['A'])}) = "
          f"{sg(Vv['B'] - Vv['A'])}. A wealth transfer from the bank to the shareholders.</p>"),
    "criteria": [
        f"Equity state by state with max(payoff − {g(Fb)}, 0): keep {g(Ev['K'])}, A {g(Ev['A'])}, B {g(Ev['B'])}, C {g(Ev['C'])}.",
        "Chooses B. Keeping the cash is included as an alternative.",
        f"Names the mechanism: risk shifting, with a wealth transfer from the bank. The firm gives up {g(Vv['A'] - Vv['B'])} of value.",
        f"Full marks for the accounting: bank {sg(Dv['B'] - Dv['A'])}, shareholders {sg(Ev['B'] - Ev['A'])}, firm {sg(Vv['B'] - Vv['A'])}.",
    ],
}
pc_ = {
    "label": "c", "points": 6,
    "body": ("<p>Is there a level of debt for which the manager is indifferent between projects B and C? If it "
             "exists, find it and briefly explain what happens if the debt is higher. If it does not exist, explain "
             "why.</p>"),
    "solution": (
        f"<p><b>Region D ≤ 5.</b> Both are safe: E<sub>B</sub> − E<sub>C</sub> = {g(Vv['B'])} − {g(Vv['C'])} = "
        f"{g(Vv['B'] - Vv['C'])}. No solution.</p>"
        f"<p><b>Region 5 &lt; D ≤ 10.</b> B is still safe, C defaults in its bad state:<br>43 − D = 0.2(120 − D) "
        f"= 24 − 0.2D gives D = {g(F_feil)}, not in (5, 10]. <b>Reject.</b></p>"
        f"<p><b>Region 10 &lt; D ≤ 65.</b> Both default in their bad states:<br>0.6(65 − D) = 0.2(120 − D)<br>"
        f"39 − 0.6D = 24 − 0.2D<br>0.4D = 15<br><b>D = €{g(Fs)}M</b>, inside the region.</p>"
        f"<p><b>Region D &gt; 65.</b> B leaves the shareholders nothing while C still pays them 0.2(120 − D), "
        f"so there is no second solution.</p>"
        f"<p><b>Verify.</b> E<sub>B</sub> = 0.6 × {g(65 - Fs)} = {g(Es['B'])} and E<sub>C</sub> = 0.2 × "
        f"{g(120 - Fs)} = {g(Es['C'])}. A gives {g(Es['A'])} and keeping the cash {g(Es['K'])}, so B and C really "
        f"are the contenders.</p>"
        f"<p><b>Higher debt.</b> Above {g(Fs)} the manager chooses C, a project with NPV {sg(npv['C'])}. C's equity "
        f"falls by only 0.2 per unit of debt against 0.6 for B. Once the debt exceeds the €40M of cash the "
        f"shareholders get nothing by keeping the cash, so they gamble with the bank's money on the one outcome "
        f"that leaves them something. Firm value falls from {g(Vv['A'])} to {g(Vv['C'])}: an agency cost of "
        f"€{g(agency_hoy)}M.</p>"),
    "criteria": [
        "Writes E(D) with max(payoff − D, 0) and checks the regions.",
        f"Rejects the region between 5 and 10, where the equation gives D = {g(F_feil)}.",
        f"Solves 0.6(65 − D) = 0.2(120 − D) for D = {g(Fs)} and verifies E_B = E_C = {g(Es['B'])}, with A ({g(Es['A'])}) and keeping the cash ({g(Es['K'])}) lower.",
        f"Explains the follow-up: above {g(Fs)} the negative-NPV project C is chosen, because its equity falls more slowly in D (0.2 against 0.6). Excessive risk-taking at the creditors' expense.",
        f"Bonus: the agency cost rises to {g(agency_hoy)}.",
    ],
}
htab = tab(["", "Good outcome", "Bad outcome"], [["Project B", "#−14", "#+21"], ["Project C", "#−20", "#+5"]])
pd = {
    "label": "d", "points": 5,
    "body": (f"<p>Keep the debt of €{g(Fb)} million. A customer whose business moves opposite to Lüdersen's offers "
             f"a contract tied to the risky projects, with these payments to Lüdersen at t = 1 (€ million). It "
             f"pays nothing under A or if the cash is kept.</p>{htab}<p>Will the management sign the contract? "
             f"Explain why or why not. If it were signed, what would the shares and the loan be worth?</p>"),
    "solution": (
        f"<p><b>Step 1. The contract is zero-NPV.</b> B: 0.6 × (−14) + 0.4 × 21 = −8.4 + 8.4 = {g(npvhB)}. C: "
        f"0.2 × (−20) + 0.8 × 5 = −4 + 4 = {g(npvhC)}. It only moves money from the good outcome to the bad "
        f"one.</p>"
        f"<p><b>Step 2. Re-optimise with the contract, still at D = {g(Fb)}.</b></p>"
        + tab(["With the contract", "Payoffs", "Equity", "Debt", "Firm"], [
            ["Keep the cash", "40", f"#{g(Eh['K'])}", f"#{g(Dh['K'])}", f"#{g(V_(*Ph['K']))}"],
            ["A", "46", f"#<b>{g(Eh['A'])}</b>", f"#{g(Dh['A'])}", f"#{g(V_(*Ph['A']))}"],
            ["B", "51 / 31", f"#43 − 30 = {g(Eh['B'])}", f"#{g(Dh['B'])}", f"#{g(V_(*Ph['B']))}"],
            ["C", "100 / 10", f"#0.2 × 70 = {g(Eh['C'])}", f"#{g(Dh['C'])}", f"#{g(V_(*Ph['C']))}"],
        ])
        + f"<p>With the contract B no longer shifts any loss to the bank, so the shareholders' best choice is A, "
          f"worth {g(Eh['A'])}. Without the contract they choose B and get {g(Ev['B'])} (part b).</p>"
          f"<p><b>Conclusion: the management does not sign</b>, because {g(Eh['A'])} &lt; {g(Ev['B'])}. If it were "
          f"signed, <b>the shares would be worth €{g(Eh['A'])}M and the loan €{g(Dh['A'])}M</b> (A repays it in "
          f"full).</p>"
          f"<p><b>Why.</b> The contract removes the bad outcomes in which the bank bears the loss. It creates value "
          f"for the firm, because it leads back to A, but the bank captures all of it and more: a wealth transfer "
          f"from the shareholders to the bank.</p>"
          f"<p><b>Check.</b> Signed (A) against not signed (B):</p>"
          + tab(["Claim", "Not signed (B)", "Signed (A)", "Change"], [
              ["Shareholders", f"#{g(Ev['B'])}", f"#{g(Eh['A'])}", f"#{sg(dEd)}"],
              ["Bank", f"#{g(Dv['B'])}", f"#{g(Dh['A'])}", f"#{sg(dDd)}"],
              ["Firm", f"#{g(Vv['B'])}", f"#{g(Vv['A'])}", f"#{sg(dVd)}"],
          ])
          + f"<p>{sg(dEd)} + {g(dDd)} = {sg(dVd)}, the value B destroyed relative to A. The bank gains more than "
            f"the whole {g(dVd)}. A contract agreed before the loan was made, or a cut in the face value, would "
            f"let the shareholders share the gain.</p>"),
    "criteria": [
        "Shows that the contract is zero-NPV for B and C, so nothing here is about expected value.",
        f"Re-optimises with the contract: keep {g(Eh['K'])}, A {g(Eh['A'])}, B {g(Eh['B'])}, C {g(Eh['C'])}. Asking only whether the contract helps B misses that the manager can switch to A.",
        f"Compares with {g(Ev['B'])} without the contract and concludes that management does NOT sign.",
        f"If signed: shares €{g(Eh['A'])}M and loan €{g(Dh['A'])}M. Using B with the contract (shares {g(Eh['B'])}) forgets the re-optimisation.",
        "Explains the mechanism: the contract makes the debt safe, so the shareholders lose their risk-shifting gain. Key word: a wealth transfer from the shareholders to the bank.",
        f"The accounting: shareholders {sg(dEd)}, bank {sg(dDd)}, firm {sg(dVd)}. The bank captures more than the whole gain.",
    ],
}
ex["parts"] = [pa, pb, pc_, pd]
SETT["del2-f5"].append(ex)
SVAR["del2-f5:2:a"] = {"type": "blandet", "tall": [T("Value, keep the cash", Vv["K"], "€ m"), T("E[payoff] A", Vv["A"], "€ m"),
                                                   T("E[payoff] B", Vv["B"], "€ m"), T("E[payoff] C", Vv["C"], "€ m")],
                       "tallPoeng": 1.5, "tekstLedd": "What will the manager do?"}
SVAR["del2-f5:2:b"] = {"type": "blandet", "tall": [T("Equity, keep the cash", Ev["K"], "€ m"), T("Equity value A", Ev["A"], "€ m"),
                                                   T("Equity value B", Ev["B"], "€ m"), T("Equity value C", Ev["C"], "€ m")],
                       "tallPoeng": 2.5, "tekstLedd": "What will the manager do?"}
SVAR["del2-f5:2:c"] = {"type": "blandet", "tall": [T("Debt level D (B ~ C)", Fs, "€ m")],
                       "tallPoeng": 4, "tekstLedd": "Briefly explain what happens if the debt is higher."}
SVAR["del2-f5:2:d"] = {"type": "blandet", "tall": [T("Shares if signed", Eh["A"], "€ m"), T("Loan if signed", Dh["A"], "€ m")],
                       "tallPoeng": 2, "tekstLedd": "Will the management sign the contract? Explain why or why not.",
                       "merknad": "Med kontrakten velges A: aksjene 16 og lånet 30. Lånet er 30 også om studenten glemmer å optimere på nytt (B med kontrakt er trygg), men da blir aksjene 13."}
F5_2 = dict(Fb=Fb, Fs=Fs)


# ======================================================================
# Kontroller: poeng, skriveregler, tall i løsningen
# ======================================================================
def tekster(ex):
    for k in ("title", "body", "solution", "merke"):
        yield ex.get(k, "")
    yield from ex.get("criteria", [])
    for p in ex.get("parts", []):
        for k in ("body", "solution"):
            yield p.get(k, "")
        yield from p.get("criteria", [])


def ren(h):
    h = re.sub(r"<[^>]*>", " ", str(h))
    return h.replace("&minus;", "−").replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">")


def tall_i(tekst):
    t = re.sub(r"&[a-z]+;", " ", ren(tekst)).replace("−", "-").replace("–", "-")
    ut = []
    for m in re.finditer(r"-?\d{1,3}(?:[, ]\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+", t):
        s = re.sub(r"[, ](?=\d{3}\b)", "", m.group(0))
        try:
            n = float(s)
        except ValueError:
            continue
        ut += [n, abs(n)]
    return ut


feil = []
ord_tot = {}
for sid, liste in SETT.items():
    assert [e["n"] for e in liste] == [1, 2], sid
    assert sum(e["points"] for e in liste) == 36, sid
    for ex in liste:
        assert ex["points"] == 18
        assert sum(p["points"] for p in ex["parts"]) == ex["points"], (sid, ex["n"])
        ordtall = len(ren(ex["body"]).split()) + sum(len(ren(p["body"]).split()) for p in ex["parts"])
        ord_tot[f"{sid}:{ex['n']}"] = ordtall
        for t in tekster(ex):
            r = ren(t)
            if "—" in r:
                feil.append(f"{sid}:{ex['n']} tankestrek: {r[:80]}")
            m = re.search(r",\s+and\b", r)
            if m:
                feil.append(f"{sid}:{ex['n']} komma før and: …{r[max(0, m.start() - 50):m.end() + 10]}…")
            if re.search(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers)\b", r):
                feil.append(f"{sid}:{ex['n']} pronomen om Kurbatov")
            if re.search(r"\d-\d|\s-\d", r):
                feil.append(f"{sid}:{ex['n']} bindestrek som minus? {r[:60]}")
        for c in [c for p in ex["parts"] for c in p["criteria"]]:
            if "<" in c:
                feil.append(f"{sid}:{ex['n']} markup i criteria: {c[:60]}")
        for p in ex["parts"]:
            k = f"{sid}:{ex['n']}:{p['label']}"
            d = SVAR.get(k)
            if d is None:
                feil.append(f"mangler svar {k}")
                continue
            if d["type"] == "blandet":
                assert 0 < d["tallPoeng"] < p["points"], k
            kilde = " ".join([p["solution"], " ".join(p["criteria"])])
            nums = tall_i(kilde)
            for t in d["tall"]:
                v = t["verdi"]
                tol = max(t.get("abs", 0), t.get("tol", 0.01) * abs(v), 1e-9)
                ok = any(abs(n - v) <= tol for n in nums)
                if not ok and t["enhet"] == "%":
                    ok = any(abs(n * 100 - v) <= tol or abs(n - v / 100) <= tol / 100 for n in nums)
                if not ok:
                    feil.append(f"{k}: {t['navn']} = {v} finnes ikke i løsningen")
                assert abs(v) > 1e-6 or "abs" in t, k
assert set(SVAR) == {f"{s}:{e['n']}:{p['label']}" for s, l in SETT.items() for e in l for p in e["parts"]}

for x in feil:
    print("FEIL", x)
if feil:
    raise SystemExit("skriver ingenting: rett feilene først")

print("Ord i oppgaveteksten (Kurbatov: rundt 11 per poeng, altså rundt 200 for 18 p):")
for k, v in ord_tot.items():
    print(f"   {k:10} {v}")
for sid, liste in SETT.items():
    for ex in liste:
        print(f"{sid}:{ex['n']}  {ex['title']} ({ex['topic']}): " + " / ".join(f"{p['label']} {p['points']}" for p in ex["parts"]))

json.dump(SETT, open(UT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(SVAR, open(UT_SVAR, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("skrev", UT, "og", UT_SVAR)
