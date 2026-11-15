# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: Modigliani-Miller og rekapitaliseringer (tema «mm»).

   Skribent 2 (kapitalstruktur). Spesifikasjonen er docs/fie402-trening-spek.md.
   Kildene er H2024 E3, H2025 E3, PS1 E1–E4, forelesning 2 (gründereksemplet,
   EPS-feilslutningen, utvanningsfeilslutningen, kapitalkrav i bank, gjeld som
   forsterker avkastningen) og kjernepensum kj2.

   Familier (tallsvar):
     mm-rec1  r_E etter en rekapitalisering uten skatt (flyttet uendret fra eksempel.py)
     mm-ru1   r_U fra førskatt-WACC (H2024 E3a)
     mm-px1   antall aksjer kjøpt tilbake mot et mål for D/V (H2025 E3c)
     mm-div1  kurs ex utbytte når nytt lån refinansierer det gamle (H2024 E3c, PS1 E3)
     mm-rdr1  r_E etter refinansiering med risikabel gjeld (H2024 E3d, PS1 E3c)
     mm-beta1 β_E etter et gjeldsfinansiert tilbakekjøp (PS1 E1a)
     mm-dps1  nytt utbytte per aksje etter rekapitaliseringen (H2025 E3d)
     mm-arb1  arbitrasjegevinsten bak MM I (PS1 E2)
     mm-eps1  EPS etter et gjeldsfinansiert tilbakekjøp (forelesning 2 s. 24, PS1 E1c)
     mm-bep1  break-even EBIT (forelesning 2 s. 24)
   Statiske: mm-s01 … mm-s13.
"""
from trening_lib import *  # noqa: F401,F403


def _p(x, d=2):
    """En rente som brøk vist i prosent med d desimaler: 0.13325 → «13.33%»."""
    return pst(x, d)


NAVN = ["Brattli Media", "Holmestad Tools", "Ervik Pharma", "Solbakk Textiles", "Rindal Games", "Vågen Hotels",
        "Kvitfjell Cargo", "Lindås Marine", "Sørli Software", "Tornes Foods", "Heggem Steel", "Fjellvik Telecom"]


def _hel(x):
    return abs(x - round(x)) < 1e-9


def _dx(x, maks=4):
    """Desimalene et mellomtall trenger: 0 for heltall, ellers mellom 2 og maks (uten haleskjøt av nuller)."""
    if _hel(rund(x, maks)):
        return 0
    t = f"{rund(x, maks):.{maks}f}".rstrip("0")
    return max(2, len(t.split(".")[1]))


def _a(x, maks=4):
    """Et beløp uten valuta: 1 600, 187.50, 9.375, 2.3333."""
    return tall(x, _dx(x, maks))


def _m(x, val, d=None):
    """Et beløp i millioner med valuta: «NOK 400 million», «$187.50 million». d tvinger antall desimaler."""
    return penger(x, _dx(x) if d is None else d, val) + NBSP + "million"


def _ps(x, val):
    """En pris per aksje: to desimaler når beløpet er helt i øre, ellers fire."""
    d = 2 if abs(x * 100 - round(x * 100)) < 1e-7 else 4
    return penger(x, d, val)


def _w(x):
    """En vekt eller et forhold med høyst seks desimaler og minst to: 0.6 → «0.60», 0.84375 → «0.84375»."""
    t = f"{rund(x, 6):.6f}".rstrip("0")
    hel, des = t.split(".")
    return tall(x, max(2, len(des)))


def _des(*verdier):
    """Felles antall desimaler for prisene i ett spørsmål: 2 når alle er hele i øre, ellers 4.
       Da avslører ikke et «pent» tall hvilket alternativ som er riktig."""
    return 2 if all(abs(v * 100 - round(v * 100)) < 1e-7 for v in verdier) else 4


def _mn(x):
    """Et antall aksjer i millioner med fire desimaler: «0.2500 million»."""
    return tall(x, 4) + NBSP + "million"


# ---------------------------------------------------------------------------
# mm-rec1 · r_E etter en rekapitalisering uten skatt (MM II)
# Flyttet uendret fra eksempel.py (samme id).
# ---------------------------------------------------------------------------
@familie("mm-rec1", tema="mm", antall=8, tittel="Cost of equity after a recapitalisation without taxes",
         hjelp=hjelp3(
             "This is MM II in a perfect market. The firm swaps equity for debt. You need the new cost of "
             "equity.",
             "MM I: V<sup>L</sup> = V<sup>U</sup>, so the firm value is unchanged. MM II: r<sub>E</sub> = "
             "r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>), with D and E after the recapitalisation.",
             "<p><b>Step 1: the firm value.</b> Shares times price before the announcement. Without taxes it does "
             "not change.</p>"
             "<p><b>Step 2: the new split.</b> D is the debt raised. E is the firm value minus D, because the cash "
             "goes straight back to the shareholders in the buyback.</p>"
             "<p><b>Step 3: MM II.</b> Add D/E times the gap between r<sub>U</sub> and r<sub>D</sub>.</p>"
             "<p><b>Watch out:</b> the ratio is D/E, not D/V. And r<sub>E</sub> does change, even though the firm "
             "value does not.</p>",
         ))
def _(r):
    navn = r.choice(["Brattli Media", "Holmestad Tools", "Ervik Pharma", "Solbakk Textiles", "Rindal Games", "Vågen Hotels"])
    N = r.choice([10, 20, 25, 40, 50])                    # millioner aksjer
    P = r.choice([20, 25, 30, 40, 50])
    V = N * P
    andel = r.choice([0.20, 0.25, 0.30, 0.40, 0.50])       # D/V etter rekapitaliseringen
    D = round(V * andel)
    E = V - D
    rU = r.choice([0.09, 0.10, 0.11, 0.12])
    rD = r.choice([0.04, 0.045, 0.05, 0.055, 0.06])
    rE = rU + D / E * (rU - rD)
    tV, tD, tE = tall(V), tall(D), tall(E)                 # tusenskille: «1 000»

    f_dv = rU + D / V * (rU - rD)                          # D/V i stedet for D/E
    f_ru = rU                                              # trodde r_E er uendret
    f_uten_rd = rU + D / E * rU                            # glemte å trekke fra r_D
    ulike(rE, f_dv, f_ru, f_uten_rd, rel=0.02)

    q = (f"<p>{navn} is an all-equity firm with {N} million shares trading at NOK {P}. Its cost of capital is "
         f"{_p(rU, 1)}. The firm announces that it will borrow NOK {tD} million of risk-free debt at {_p(rD, 1)} and use "
         f"all of it to "
         f"buy back shares at the market price. Assume perfect capital markets: no taxes, no distress costs and no "
         f"information effects.</p>"
         f"<p>What is {gen(navn)} cost of equity after the recapitalisation?</p>")

    alternativer = [
        R(_p(rE), rE),
        F(_p(f_dv),
          f"D/V used instead of D/E: {_p(rU, 1)} + ({tD}/{tV}) × ({_p(rU, 1)} − {_p(rD, 1)}). MM II scales the "
          f"spread by debt per unit of equity, not per unit of firm value.", f_dv),
        F(_p(f_ru),
          "The cost of equity left unchanged. MM I keeps the firm value fixed, but the shareholders now carry the "
          "same business risk on a smaller equity base, so they require more.", f_ru),
        F(_p(f_uten_rd),
          f"r<sub>D</sub> left out of MM II: {_p(rU, 1)} + ({tD}/{tE}) × {_p(rU, 1)}. The premium is D/E times "
          f"the gap r<sub>U</sub> − r<sub>D</sub>, because the debt holders take part of the return.", f_uten_rd),
    ]

    kort = (f"<p><b>{_p(rE)}.</b> V = {N} × {P} = {tV}, so after the buyback E = {tV} − {tD} = {tE}. "
            f"r<sub>E</sub> = {_p(rU, 1)} + ({tD}/{tE}) × ({_p(rU, 1)} − {_p(rD, 1)}) = {_p(rE)}.</p>")

    full = (
        f"<p><b>What MM says.</b> In a perfect market the value of the firm depends on its assets, not on how they "
        f"are financed (MM I). Debt is cheaper than equity, but borrowing makes the equity riskier. The two "
        f"effects cancel. MM II gives the cost of equity that makes this work: it rises in a straight line with "
        f"D/E.</p>"
        f"<p><b>Step 1: the firm value.</b> {N} million shares × NOK {P} = NOK {tV} million. Without taxes the "
        f"recapitalisation does not change it, so the share price stays at NOK {P}.</p>"
        f"<p><b>Step 2: debt and equity after the buyback.</b> D = {tD}. The cash goes to the selling shareholders, "
        f"so E = {tV} − {tD} = {tE}. D/E = {tD}/{tE} = {tall(D / E, 4)}.</p>"
        f"<p><b>Step 3: MM II.</b> r<sub>E</sub> = {_p(rU, 1)} + {tall(D / E, 4)} × ({_p(rU, 1)} − "
        f"{_p(rD, 1)}) = <b>{_p(rE)}</b>.</p>"
        f"<p><b>Check.</b> The pre-tax WACC must equal r<sub>U</sub>: ({tE}/{tV}) × {_p(rE)} + ({tD}/{tV}) × "
        f"{_p(rD, 1)} = {_p(E / V * rE + D / V * rD)}. Since r<sub>E</sub> came from MM II, this is an identity: "
        f"it catches arithmetic slips only.</p>"
        f"<p><b>Remember:</b> the firm value is fixed, the cost of equity is not. r<sub>E</sub> = r<sub>U</sub> + "
        f"(D/E)(r<sub>U</sub> − r<sub>D</sub>).</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# mm-ru1 · r_U fra førskatt-WACC (H2024 E3a)
# ---------------------------------------------------------------------------
@familie("mm-ru1", tema="mm", antall=5, tittel="The unlevered cost of capital from the pre-tax WACC",
         hjelp=hjelp3(
             "This is MM in a perfect market, read backwards. You know what the shareholders and the lenders "
             "require. You need the return on the firm's assets, r<sub>U</sub>.",
             "Without taxes the pre-tax WACC equals r<sub>U</sub>: r<sub>U</sub> = (E/V)r<sub>E</sub> + "
             "(D/V)r<sub>D</sub>, with E, D and V = E + D at market value.",
             "<p><b>Step 1: market values.</b> E is the number of shares times the price. Add the debt to get V.</p>"
             "<p><b>Step 2: the weights.</b> E/V and D/V. They sum to one.</p>"
             "<p><b>Step 3: weight the two returns.</b> There are no taxes, so there is no (1 − τ<sub>c</sub>) "
             "term.</p>"
             "<p><b>Watch out:</b> r<sub>E</sub> is not r<sub>U</sub>. The shareholders' return carries the "
             "financial risk of the debt on top of the business risk.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N = r.choice([10, 12, 15, 20, 24, 25, 30])
    P = r.choice([40, 45, 50, 60, 75, 80, 90])
    E = N * P
    D = r.choice([150, 200, 250, 300, 400, 450, 500, 600])
    V = E + D
    if not 0.10 <= D / V <= 0.40:
        raise Avvis("gjeldsandelen utenfor det vanlige")
    if len(f"{D / V:.10f}".rstrip("0")) > 8:                # D/V med høyst seks desimaler
        raise Avvis("stygge vekter")
    rE = r.choice([0.08, 0.085, 0.09, 0.095, 0.10, 0.11, 0.12])
    rD = r.choice([0.03, 0.035, 0.04, 0.045, 0.05])
    wE, wD = E / V, D / V
    rU = wE * rE + wD * rD

    f_re = rE                                              # r_E tatt som r_U
    f_byttet = wD * rE + wE * rD                           # vektene byttet om
    f_de = rE - D / E * (rE - rD)                          # MM II snudd med D/E
    ulike(rU, f_re, f_byttet, f_de, rel=0.02)

    q = (f"<p>{navn} has {N} million shares outstanding at {penger(P, 0, val)} per share and {_m(D, val)} of "
         f"risk-free debt with an expected return of {_p(rD, 1)}. Its equity cost of capital is {_p(rE, 1)}. The "
         f"firm operates in a perfect capital market: no taxes, no distress costs and no information effects.</p>"
         f"<p>What is {gen(navn)} unlevered cost of capital, r<sub>U</sub>?</p>")

    alternativer = [
        R(_p(rU), rU),
        F(_p(f_re),
          f"The equity cost of capital taken as r<sub>U</sub>. {navn} has debt, so its shareholders carry "
          f"financial risk on top of the business risk and r<sub>E</sub> lies above r<sub>U</sub>.", f_re),
        F(_p(f_byttet),
          f"The weights swapped: ({_a(D)}/{_a(V)}) × {_p(rE, 1)} + ({_a(E)}/{_a(V)}) × {_p(rD, 1)}. Each return "
          f"is weighted by the share of firm value that the claim represents.", f_byttet),
        F(_p(f_de),
          f"MM II rearranged with D/E where D/V belongs: {_p(rE, 1)} − ({_a(D)}/{_a(E)}) × ({_p(rE, 1)} − "
          f"{_p(rD, 1)}). Solved correctly, the spread is scaled by D/V.", f_de),
    ]

    kort = (f"<p><b>{_p(rU)}.</b> E = {N} × {P} = {_a(E)}, V = {_a(E)} + {_a(D)} = {_a(V)}. r<sub>U</sub> = "
            f"({_a(E)}/{_a(V)}) × {_p(rE, 1)} + ({_a(D)}/{_a(V)}) × {_p(rD, 1)} = {_p(rU, 4)}.</p>")

    full = (
        f"<p><b>What r<sub>U</sub> is.</b> r<sub>U</sub> is the return investors require on the firm's assets, "
        f"the business risk alone. The firm's two claims together own those assets, so the return on the assets "
        f"is the value-weighted average of the returns on the claims. Without taxes that average, the pre-tax "
        f"WACC, is r<sub>U</sub> whatever the leverage (MM II read backwards).</p>"
        f"<p><b>Step 1: market values.</b> E = {N} million × {penger(P, 0, val)} = {_m(E, val)}. D = "
        f"{_m(D, val)}. V = {_a(E)} + {_a(D)} = {_m(V, val)}.</p>"
        f"<p><b>Step 2: the weights.</b> E/V = {_a(E)}/{_a(V)} = {_w(wE)} and D/V = {_a(D)}/{_a(V)} = "
        f"{_w(wD)}.</p>"
        f"<p><b>Step 3: the pre-tax WACC.</b> r<sub>U</sub> = {_w(wE)} × {_p(rE, 1)} + {_w(wD)} × "
        f"{_p(rD, 1)} = {_p(wE * rE, 4)} + {_p(wD * rD, 4)} = <b>{_p(rU, 4)}</b>.</p>"
        f"<p><b>First check.</b> Run MM II forwards: {_p(rU, 4)} + ({_a(D)}/{_a(E)}) × ({_p(rU, 4)} − "
        f"{_p(rD, 1)}) = {_p(rU + D / E * (rU - rD), 4)}, which is r<sub>E</sub> again. MM II is the same equation "
        f"rearranged, so this check is an identity: it catches arithmetic slips only.</p>"
        f"<p><b>Remember:</b> without taxes, r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> at market "
        f"values. It always lies between r<sub>D</sub> and r<sub>E</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# mm-px1 · Antall aksjer kjøpt tilbake mot et mål for D/V (H2025 E3c)
# ---------------------------------------------------------------------------
@familie("mm-px1", tema="mm", antall=5, tittel="Shares bought back to reach a target D/V",
         hjelp=hjelp3(
             "This is a leveraged recapitalisation in a perfect market. The firm borrows up to a target leverage "
             "and buys back shares with the new money. You need the number of shares it buys.",
             "MM I: V is unchanged, so the price does not move at the announcement. Target debt = (D/V) × V. "
             "New debt = target debt − existing debt. Shares bought = new debt / P.",
             "<p><b>Step 1: the firm value.</b> V = E + D at market value before the announcement.</p>"
             "<p><b>Step 2: the new money.</b> Multiply V by the target D/V. Only the part above the debt the firm "
             "already has is new money.</p>"
             "<p><b>Step 3: the price.</b> No taxes and no costs: the plan creates nothing, so the price stays "
             "where it was.</p>"
             "<p><b>Step 4: shares bought.</b> Divide the new money by that price.</p>"
             "<p><b>Watch out:</b> the existing debt counts towards the target. And a target for D/V is not a "
             "target for D/E.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    V = r.choice([300, 400, 500, 600, 800, 1000, 1200])
    dv0 = r.choice([0.10, 0.20, 0.25])
    d = r.choice([0.40, 0.50, 0.60])
    D0 = V * dv0
    E0 = V - D0
    P = r.choice([20, 25, 40, 50, 60, 75, 80, 100, 120, 150, 200])
    N0 = E0 / P
    if N0 < 1 or not _hel(N0 * 4):
        raise Avvis("stygt antall aksjer")
    Dt = d * V
    ny = Dt - D0
    n = ny / P

    f_alt = Dt / P                                         # hele målgjelden brukt til tilbakekjøp
    f_de = (d / (1 + d) * V - D0) / P                      # målet lest som D/E
    Pd = (V - Dt) / N0
    f_pris = ny / Pd                                       # kjøpt til en «utbyttekurs»
    if f_de <= 0:
        raise Avvis("D/E-fella gir negativt tilbakekjøp")
    ulike(n, f_alt, f_de, f_pris, rel=0.02)

    q = (f"<p>{navn} operates in a perfect capital market with no taxes. It has {_m(D0, val)} of risk-free debt "
         f"and {_a(N0)} million shares trading at {penger(P, 0, val)}. The board announces that it will issue new "
         f"debt and use all of the proceeds to buy back shares at the market price, so that its debt-to-value "
         f"ratio becomes {_w(d)}.</p>"
         f"<p>How many shares does {navn} buy back, in millions?</p>")

    alternativer = [
        R(_mn(n), n),
        F(_mn(f_alt),
          f"The whole target debt used for the buyback: {_a(Dt)}/{P}. {navn} already owes {_a(D0)}, which counts "
          f"towards the target, so only the debt above it is new money.", f_alt),
        F(_mn(f_de),
          f"The target read as D/E = {_w(d)}: D = ({_w(d)}/{_w(1 + d)}) × {_a(V)}. The board targets debt as a "
          f"share of firm value, not as a share of equity.", f_de),
        F(_mn(f_pris),
          f"Shares bought at {_ps(Pd, val)}, the price you would get if the new debt were paid out as a dividend. "
          f"In a buyback the firm pays a fair price for each share, so the price does not fall.", f_pris),
    ]

    kort = (f"<p><b>{_mn(n)} shares.</b> V = {_a(E0)} + {_a(D0)} = {_a(V)}. Target D = {_w(d)} × {_a(V)} = "
            f"{_a(Dt)}, so new debt = {_a(Dt)} − {_a(D0)} = {_a(ny)}. The price stays at {penger(P, 0, val)} "
            f"(MM I): {_a(ny)}/{P} = {tall(n, 4)} million.</p>")

    E1 = V - Dt
    N1 = N0 - n
    full = (
        f"<p><b>What happens.</b> A leveraged recapitalisation swaps equity for debt. In a perfect market the "
        f"swap is at fair prices and creates nothing, so the firm value and the share price are the same before "
        f"the announcement, after it and after the buyback (MM I). The new money buys shares at that price.</p>"
        f"<p><b>Step 1: the firm value.</b> E = {_a(N0)} million × {penger(P, 0, val)} = {_m(E0, val)}. V = "
        f"{_a(E0)} + {_a(D0)} = {_m(V, val)}.</p>"
        f"<p><b>Step 2: the new money.</b> Target debt = {_w(d)} × {_a(V)} = {_a(Dt)}. The firm already owes "
        f"{_a(D0)}, so it issues {_a(Dt)} − {_a(D0)} = {_m(ny, val)} of new debt.</p>"
        f"<p><b>Step 3: the price.</b> No taxes, no distress costs, no information: the price stays at "
        f"{penger(P, 0, val)}.</p>"
        f"<p><b>Step 4: shares bought.</b> {_a(ny)}/{P} = <b>{tall(n, 4)} million shares</b>, leaving "
        f"{tall(N1, 4)} million.</p>"
        f"<p><b>First check.</b> After the buyback E = {_a(V)} − {_a(Dt)} = {_a(E1)}. {_a(E1)}/{tall(N1, 4)} = "
        f"{_ps(E1 / N1, val)} per share, the old price. Once the price is held fixed this is an identity: it "
        f"catches arithmetic slips only.</p>"
        f"<p><b>Remember:</b> only new money buys shares. It buys them at the unchanged price.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet="million shares"))


# ---------------------------------------------------------------------------
# mm-div1 · Kurs ex utbytte når nytt lån refinansierer det gamle (H2024 E3c, PS1 E3)
# ---------------------------------------------------------------------------
@familie("mm-div1", tema="mm", antall=5, tittel="The ex-dividend price after a debt-financed dividend",
         hjelp=hjelp3(
             "This is a leveraged recapitalisation paid out as a special dividend. Part of the new loan repays "
             "the old debt. You need the share price once the dividend has been paid.",
             "MM I: V is unchanged. After the deal E = V − D<sub>new</sub>. The share count does not change, "
             "so P<sub>ex</sub> = E / N. The dividend is D<sub>new</sub> − D<sub>old</sub>.",
             "<p><b>Step 1: the firm value.</b> Shares times price plus the existing debt.</p>"
             "<p><b>Step 2: the claims after the deal.</b> The lenders now hold the new loan, all of it. Equity is "
             "what is left of V.</p>"
             "<p><b>Step 3: the price.</b> A dividend retires no shares. Divide the equity by the old share "
             "count.</p>"
             "<p><b>Watch out:</b> only the part of the loan that does not repay old debt reaches the "
             "shareholders. And the announcement price is not the price after the payment.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N = r.choice([10, 12, 15, 20, 25])
    P = r.choice([60, 75, 80, 90, 100, 120])
    Dg = r.choice([100, 150, 200, 250, 300])
    dps = r.choice([5, 6, 8, 10, 12, 15])
    Dn = Dg + N * dps
    V = N * P + Dg
    if Dn / V > 0.6:
        raise Avvis("for mye gjeld")
    E1 = V - Dn
    Pex = E1 / N

    f_alt = P - Dn / N                                     # hele lånet som utbytte
    f_lik = P                                              # kursen ved kunngjøringen
    f_netto = (V - (Dn - Dg)) / N                          # bare økningen i gjeld trukket fra V
    if f_alt <= 0:
        raise Avvis("negativ kurs i fella")
    ulike(Pex, f_alt, f_lik, f_netto, rel=0.02)

    q = (f"<p>{navn} has {N} million shares trading at {penger(P, 0, val)} and {_m(Dg, val)} of risk-free debt. "
         f"It operates in a perfect capital market with no taxes. The firm issues {_m(Dn, val)} of new debt, uses "
         f"part of it to repay the existing debt and pays the rest out at once as a special dividend.</p>"
         f"<p>What is the share price right after the dividend has been paid?</p>")

    dd = _des(Pex, f_alt, f_lik, f_netto)
    alternativer = [
        R(penger(Pex, dd, val), Pex),
        F(penger(f_alt, dd, val),
          f"The whole new loan treated as the dividend: {P} − {_a(Dn)}/{N}. Part of the loan repays the old debt, "
          f"so that part never reaches the shareholders.", f_alt),
        F(penger(f_lik, dd, val),
          "This is the price at the announcement and up to the payment. When the cash leaves the firm the share "
          "goes ex-dividend and its price falls.", f_lik),
        F(penger(f_netto, dd, val),
          f"Only the increase in debt subtracted from V: ({_a(V)} − ({_a(Dn)} − {_a(Dg)}))/{N}. That leaves the "
          f"old debt counted as equity. After the deal the lenders hold the whole new loan. All of it comes "
          f"out of V.", f_netto),
    ]

    kort = (f"<p><b>{penger(Pex, dd, val)}.</b> V = {N} × {P} + {_a(Dg)} = {_a(V)}. After the deal D = {_a(Dn)}, so E = "
            f"{_a(V)} − {_a(Dn)} = {_a(E1)} and P = {_a(E1)}/{N} = {penger(Pex, dd, val)}.</p>")

    utb = Dn - Dg
    full = (
        f"<p><b>What happens.</b> The firm borrows, repays the old lenders and hands the rest to the "
        f"shareholders. In a perfect market this reslices the same assets: V does not move (MM I). The "
        f"shareholders' claim shrinks by exactly the cash they receive, so the price falls by the dividend per "
        f"share and nobody is richer or poorer.</p>"
        f"<p><b>Step 1: the firm value.</b> E = {N} million × {penger(P, 0, val)} = {_a(N * P)}. V = {_a(N * P)} + "
        f"{_a(Dg)} = {_m(V, val)}.</p>"
        f"<p><b>Step 2: the claims after the deal.</b> The old debt is repaid and the lenders hold the new loan of "
        f"{_a(Dn)}. E = {_a(V)} − {_a(Dn)} = {_m(E1, val)}.</p>"
        f"<p><b>Step 3: the price.</b> The dividend retires no shares: {_a(E1)}/{N} = <b>{penger(Pex, dd, val)}</b>.</p>"
        f"<p><b>First check.</b> The dividend is {_a(Dn)} − {_a(Dg)} = {_a(utb)}, or {_ps(utb / N, val)} per "
        f"share. A shareholder now holds {_ps(Pex, val)} + {_ps(utb / N, val)} = {_ps(Pex + utb / N, val)}, what "
        f"one share was worth before. This is the same balance sheet read another way, so it catches arithmetic "
        f"slips only.</p>"
        f"<p><b>Remember:</b> E = V − D with all the debt outstanding after the deal. A dividend lowers the "
        f"price, a fair buyback does not.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} per share"))


# ---------------------------------------------------------------------------
# mm-rdr1 · r_E etter refinansiering med risikabel gjeld (H2024 E3d, PS1 E3c)
# ---------------------------------------------------------------------------
@familie("mm-rdr1", tema="mm", antall=5, tittel="Cost of equity when the new debt is risky",
         hjelp=hjelp3(
             "This is MM II after a recapitalisation in which the new debt is risky. Lenders demand more than "
             "before. You need the new cost of equity.",
             "r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> before the deal. Then r<sub>E</sub> = "
             "r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) with D, E and r<sub>D</sub> after the deal.",
             "<p><b>Step 1: r<sub>U</sub>.</b> Weight the old r<sub>E</sub> and the old r<sub>D</sub> by the old "
             "market values. The assets do not change, so r<sub>U</sub> does not either.</p>"
             "<p><b>Step 2: the new split.</b> V is unchanged. D is all the debt after the deal, E = V − D.</p>"
             "<p><b>Step 3: MM II.</b> Use the return lenders expect on the new debt.</p>"
             "<p><b>Watch out:</b> keeping the old r<sub>D</sub>, or counting only the new money as debt.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    V = r.choice([800, 1000, 1200, 1500, 1600, 2000])
    dv0 = r.choice([0.10, 0.125, 0.15, 0.20, 0.25])
    Dg = V * dv0
    if not _hel(Dg):
        raise Avvis("stygg gjeld")
    E0 = V - Dg
    P = r.choice([20, 25, 40, 50, 60, 75, 80, 90, 100])
    N0 = E0 / P
    if N0 < 2 or not _hel(N0):
        raise Avvis("stygt antall aksjer")
    d1 = r.choice([0.25, 0.30, 0.40, 0.50])
    if d1 < dv0 + 0.10:
        raise Avvis("for liten økning i gjelden")
    Dn = d1 * V
    rE0 = r.choice([0.08, 0.085, 0.09, 0.095, 0.10, 0.11])
    rD0 = r.choice([0.03, 0.035, 0.04])
    rD1 = rD0 + r.choice([0.005, 0.01, 0.015])
    rU = (E0 * rE0 + Dg * rD0) / V
    E1 = V - Dn
    rE1 = rU + Dn / E1 * (rU - rD1)
    rute = r.choice(["pays the rest out as a special dividend", "uses the rest to buy back shares at the market price"])

    f_gml = rU + Dn / E1 * (rU - rD0)                      # gammel r_D
    f_netto = rU + (Dn - Dg) / E1 * (rU - rD1)             # bare ny gjeld i D/E
    f_base = rE0 + Dn / E1 * (rE0 - rD1)                   # gammel r_E som basis
    ulike(rE1, f_gml, f_netto, f_base, rel=0.02)

    q = (f"<p>{navn} has {_a(N0)} million shares at {penger(P, 0, val)} and {_m(Dg, val)} of risk-free debt with "
         f"an expected return of {_p(rD0, 1)}. Its equity cost of capital is {_p(rE0, 1)}. Markets are perfect "
         f"and there are no taxes. The firm issues {_m(Dn, val)} of new debt, repays the existing debt and "
         f"{rute}. The new debt is risky: lenders expect a return of {_p(rD1, 1)} on it.</p>"
         f"<p>What is {gen(navn)} equity cost of capital after the transaction?</p>")

    alternativer = [
        R(_p(rE1), rE1),
        F(_p(f_gml),
          f"The old r<sub>D</sub> of {_p(rD0, 1)} kept in MM II. The debt outstanding after the deal is riskier "
          f"and lenders expect {_p(rD1, 1)} on it. MM II uses the return on the debt that is actually there.", f_gml),
        F(_p(f_netto),
          f"Only the new money counted as debt: D/E = ({_a(Dn)} − {_a(Dg)})/{_a(E1)}. The old loan is repaid, but "
          f"the firm now owes the whole new loan.", f_netto),
        F(_p(f_base),
          f"The old r<sub>E</sub> of {_p(rE0, 1)} used as the base of MM II. The base is the return on the assets, "
          f"r<sub>U</sub>, which the transaction does not change.", f_base),
    ]

    kort = (f"<p><b>{_p(rE1)}.</b> r<sub>U</sub> = ({_a(E0)}/{_a(V)}) × {_p(rE0, 1)} + ({_a(Dg)}/{_a(V)}) × "
            f"{_p(rD0, 1)} = {_p(rU, 4)}. After the deal D = {_a(Dn)}, E = {_a(E1)}. r<sub>E</sub> = "
            f"{_p(rU, 4)} + ({_a(Dn)}/{_a(E1)}) × ({_p(rU, 4)} − {_p(rD1, 1)}) = {_p(rE1)}.</p>")

    full = (
        f"<p><b>What changes and what does not.</b> The assets are the same, so V and r<sub>U</sub> are the same "
        f"(MM I). More debt pushes risk onto the equity, so r<sub>E</sub> rises (MM II). Here the new debt is "
        f"also risky: the lenders now carry part of the business risk and demand more. That takes some risk off "
        f"the shareholders, so r<sub>E</sub> rises less than it would with safe debt.</p>"
        f"<p><b>Step 1: r<sub>U</sub>.</b> E = {_a(N0)} × {P} = {_a(E0)}, V = {_a(E0)} + {_a(Dg)} = {_a(V)}. "
        f"r<sub>U</sub> = ({_a(E0)}/{_a(V)}) × {_p(rE0, 1)} + ({_a(Dg)}/{_a(V)}) × {_p(rD0, 1)} = "
        f"{_p(rU, 4)}.</p>"
        f"<p><b>Step 2: the new split.</b> D = {_a(Dn)} (all of the new loan). E = {_a(V)} − {_a(Dn)} = "
        f"{_a(E1)}. D/E = {tall(Dn / E1, 4)}. The route for the cash, dividend or buyback, does not change D/E.</p>"
        f"<p><b>Step 3: MM II with the new r<sub>D</sub>.</b> r<sub>E</sub> = {_p(rU, 4)} + {tall(Dn / E1, 4)} × "
        f"({_p(rU, 4)} − {_p(rD1, 1)}) = <b>{_p(rE1)}</b>.</p>"
        f"<p><b>First check.</b> The pre-tax WACC after the deal: ({_a(E1)}/{_a(V)}) × {_p(rE1, 4)} + "
        f"({_a(Dn)}/{_a(V)}) × {_p(rD1, 1)} = {_p(E1 / V * rE1 + Dn / V * rD1, 4)} = r<sub>U</sub>. Since "
        f"r<sub>E</sub> came from MM II, this is an identity: it catches arithmetic slips, not a wrong "
        f"r<sub>D</sub>.</p>"
        f"<p><b>Remember:</b> r<sub>U</sub> from the old weights, then MM II with the new D/E and the new "
        f"r<sub>D</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# mm-beta1 · β_E etter et gjeldsfinansiert tilbakekjøp (PS1 E1a)
# ---------------------------------------------------------------------------
@familie("mm-beta1", tema="mm", antall=5, tittel="The equity beta after a debt-financed buyback",
         hjelp=hjelp3(
             "This is relevering after a recapitalisation. An all-equity firm buys back part of its stock with "
             "debt. You need the beta of the shares that remain.",
             "All-equity: β<sub>E</sub> = β<sub>U</sub>. Buying back a fraction of the shares at a fair price "
             "with debt makes D/V equal to that fraction. β<sub>E</sub> = β<sub>U</sub> + "
             "(D/E)(β<sub>U</sub> − β<sub>D</sub>).",
             "<p><b>Step 1: the asset beta.</b> Before the deal the firm has no debt, so the stock's beta is the "
             "asset beta. The deal does not change the assets.</p>"
             "<p><b>Step 2: the leverage.</b> The price does not move, so the debt equals the value of the shares "
             "bought back. Turn D/V into D/E.</p>"
             "<p><b>Step 3: relever.</b> Use the debt beta the question gives, zero if the debt is risk-free.</p>"
             "<p><b>Watch out:</b> D/V where D/E belongs.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    bU = r.choice([0.80, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.50])
    f = r.choice([0.20, 0.25, 0.30, 0.40, 0.50])
    risikabel = r.random() < 0.6
    bD = r.choice([0.10, 0.15, 0.20, 0.25]) if risikabel else 0.0
    de = f / (1 - f)
    bE = bU + de * (bU - bD)

    f_dv = bU + f * (bU - bD)                              # D/V i stedet for D/E
    f_lik = bU                                             # uendret
    if risikabel:
        f_3 = bU * (1 + de)                                # gjeldsbetaen droppet
        t3 = (f"The debt beta dropped: {tall(bU, 2)} × (1 + D/E). The new debt has a beta of {tall(bD, 2)}, so the "
              f"lenders carry some of the risk and less of it lands on the equity.")
    else:
        f_3 = bU * (1 - f)                                 # avlevering i stedet for relevering
        t3 = (f"The formula run backwards: {tall(bU, 2)} × (1 − {_w(f)}). Multiplying by E/V is how you unlever a "
              f"beta. Leverage raises the equity beta, it does not lower it.")
    ulike(bE, f_dv, f_lik, f_3, rel=0.02)

    gjeld = "The new debt is risk-free." if not risikabel else f"The new debt is risky, with a beta of {tall(bD, 2)}."
    q = (f"<p>{navn} is financed entirely with equity. Its stock has a beta of {tall(bU, 2)}. It issues debt "
         f"and uses all of the proceeds to repurchase {_p(f, 0)} of its shares at the market price. {gjeld} Assume "
         f"perfect capital markets.</p>"
         f"<p>What is the beta of {gen(navn)} stock after the transaction?</p>")

    alternativer = [
        R(tall(bE, 4), bE),
        F(tall(f_dv, 4),
          f"D/V used where D/E belongs: {tall(bU, 2)} + {_w(f)} × ({tall(bU, 2)} − {tall(bD, 2)}). Buying back "
          f"{_p(f, 0)} of the shares makes D/V = {_w(f)}, but relevering scales by debt per unit of equity.", f_dv),
        F(tall(f_lik, 4),
          "The beta left unchanged. The asset beta is unchanged, but the shareholders now carry all of the "
          "business risk on a smaller equity base.", f_lik),
        F(tall(f_3, 4), t3, f_3),
    ]

    kort = (f"<p><b>{tall(bE, 4)}.</b> Buying back {_p(f, 0)} with debt gives D/V = {_w(f)}, so D/E = "
            f"{_w(f)}/{_w(1 - f)}. β<sub>E</sub> = {tall(bU, 2)} + ({_w(f)}/{_w(1 - f)}) × ({tall(bU, 2)} − "
            f"{tall(bD, 2)}) = {tall(bE, 4)}.</p>")

    kontroll = (1 - f) * bE + f * bD
    full = (
        f"<p><b>Why the beta rises.</b> The firm's assets and so their beta β<sub>U</sub> are the same before "
        f"and after the deal. What changes is how the risk is split. The lenders take a fixed claim with little "
        f"or no risk, so the swings in asset value land on a smaller equity base. Per krone invested, the shares "
        f"become riskier.</p>"
        f"<p><b>Step 1: the asset beta.</b> All-equity, so β<sub>U</sub> = {tall(bU, 2)}.</p>"
        f"<p><b>Step 2: the leverage.</b> The shares are bought back at the unchanged price, so the debt equals "
        f"the value of the shares retired: D/V = {_w(f)} and E/V = {_w(1 - f)}. D/E = {_w(f)}/{_w(1 - f)} = "
        f"{tall(de, 4)}.</p>"
        f"<p><b>Step 3: relever.</b> β<sub>E</sub> = {tall(bU, 2)} + ({_w(f)}/{_w(1 - f)}) × ({tall(bU, 2)} − "
        f"{tall(bD, 2)}) = <b>{tall(bE, 4)}</b>.</p>"
        f"<p><b>Check 2.</b> {_w(1 - f)} × {tall(bE, 4)} + {_w(f)} × {tall(bD, 2)} = {tall(kontroll, 4)} = "
        f"β<sub>U</sub>. β<sub>E</sub> was built from β<sub>U</sub>, so this is an identity: it catches a slip in "
        f"the relevering, not a wrong D/E.</p>"
        f"<p><b>Remember:</b> a buyback of a fraction f with debt gives D/V = f. Relever with D/E = f/(1 − f).</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# mm-dps1 · Nytt utbytte per aksje etter rekapitaliseringen (H2025 E3d)
# ---------------------------------------------------------------------------
@familie("mm-dps1", tema="mm", antall=5, tittel="The dividend per share after a recapitalisation",
         hjelp=hjelp3(
             "This is the payout side of a recapitalisation. The firm pays all its free cash flow to its "
             "lenders and shareholders. You need the dividend per share once leverage has changed.",
             "Dividend per share = (FCF − r<sub>D</sub> × D) / N, with D and N after the recapitalisation. "
             "Shares bought back = new debt / P. P does not move without taxes (MM I).",
             "<p><b>Step 1: the new debt.</b> V = D + E. Multiply by the target D/V. The new money is the target "
             "minus the debt the firm already has.</p>"
             "<p><b>Step 2: the shares left.</b> The new money buys shares at the unchanged price.</p>"
             "<p><b>Step 3: the dividend.</b> Interest on all the debt comes first. The rest is shared by the "
             "shares that remain.</p>"
             "<p><b>Watch out:</b> both the interest bill and the share count change.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    V = r.choice([300, 400, 500, 600, 800, 1000])
    rU = r.choice([0.06, 0.07, 0.08, 0.09, 0.10])
    FCF = rU * V
    if not _hel(FCF * 2):
        raise Avvis("stygg kontantstrøm")
    dv0 = r.choice([0.20, 0.25, 0.30])
    D0 = V * dv0
    if not _hel(D0):
        raise Avvis("stygg gjeld")
    E0 = V - D0
    d = r.choice([0.40, 0.50, 0.60])
    if d < dv0 + 0.15:
        raise Avvis("for liten endring")
    rf = r.choice([0.03, 0.04, 0.05])
    if rf > rU - 0.015:
        raise Avvis("r_f for nær r_U")
    N0 = r.choice([1, 2, 4, 5, 10])
    P = E0 / N0
    if not _hel(P * 4):
        raise Avvis("stygg kurs")
    D1 = d * V
    n = (D1 - D0) / P
    N1 = N0 - n
    dps = (FCF - rf * D1) / N1

    f_gmlN = (FCF - rf * D1) / N0                          # delt på det gamle antallet aksjer
    f_gmlR = (FCF - rf * D0) / N1                          # renter bare på den gamle gjelden
    f_gml = (FCF - rf * D0) / N0                           # det gamle utbyttet
    ulike(dps, f_gmlN, f_gmlR, f_gml, rel=0.02)
    dd = _des(dps, f_gmlN, f_gmlR, f_gml)

    q = (f"<p>{navn} operates in a perfect capital market with no taxes. It has {_m(D0, val)} of risk-free debt at "
         f"r<sub>f</sub> = {_p(rf, 1)} and equity worth {_m(E0, val)}, on {N0} million shares. It generates free "
         f"cash flow of {_m(FCF, val)} every year in perpetuity and pays all of it out each year as interest and "
         f"dividends.</p>"
         f"<p>The board now recapitalises: it issues new risk-free debt so that D/V = {_w(d)} and uses the proceeds "
         f"to buy back shares at the market price today. What is the dividend per share at the end of year 1?</p>")

    alternativer = [
        R(penger(dps, dd, val), dps),
        F(penger(f_gmlN, dd, val),
          f"Divided by the old number of shares, {N0} million. The buyback retired some of them, so the dividend "
          f"is shared by fewer shares.", f_gmlN),
        F(penger(f_gmlR, dd, val),
          f"Interest charged on the old debt only, {_p(rf, 1)} × {_a(D0)}. After the recapitalisation the firm "
          f"pays interest on all of its debt.", f_gmlR),
        F(penger(f_gml, dd, val),
          f"The dividend before the recapitalisation, ({_a(FCF)} − {_p(rf, 1)} × {_a(D0)})/{N0}. The deal "
          f"changes both the interest bill and the number of shares.", f_gml),
    ]

    kort = (f"<p><b>{penger(dps, dd, val)}.</b> V = {_a(D0)} + {_a(E0)} = {_a(V)}, D = {_w(d)} × {_a(V)} = {_a(D1)}. "
            f"Buyback ({_a(D1)} − {_a(D0)})/{_a(P)} = {tall(n, 4)} million, leaving {tall(N1, 4)}. Dividend = "
            f"({_a(FCF)} − {_p(rf, 1)} × {_a(D1)})/{tall(N1, 4)} = {penger(dps, dd, val)}.</p>")

    E1 = V - D1
    rE1 = rU + D1 / E1 * (rU - rf)
    full = (
        f"<p><b>What happens to the dividend.</b> The free cash flow does not change: it comes from the assets. "
        f"The lenders take more of it as interest, but it is split over fewer shares. In this case the dividend "
        f"per share changes. The cost of equity changes by exactly enough to keep the price fixed.</p>"
        f"<p><b>Step 1: the new debt.</b> V = {_a(D0)} + {_a(E0)} = {_m(V, val)}. Target D = {_w(d)} × {_a(V)} = "
        f"{_a(D1)}, so the firm borrows {_a(D1)} − {_a(D0)} = {_a(D1 - D0)} more.</p>"
        f"<p><b>Step 2: the shares left.</b> P = {_a(E0)}/{N0} = {penger(P, 2, val)}, unchanged at the "
        f"announcement (MM I). Shares bought = {_a(D1 - D0)}/{_a(P)} = {tall(n, 4)} million, leaving "
        f"{tall(N1, 4)} million.</p>"
        f"<p><b>Step 3: the dividend.</b> Interest = {_p(rf, 1)} × {_a(D1)} = {_a(rf * D1)}. To equity: "
        f"{_a(FCF)} − {_a(rf * D1)} = {_a(FCF - rf * D1)}. Per share: {_a(FCF - rf * D1)}/{tall(N1, 4)} = "
        f"<b>{penger(dps, dd, val)}</b>.</p>"
        f"<p><b>First check.</b> r<sub>U</sub> = {_a(FCF)}/{_a(V)} = {_p(rU, 4)}. MM II with D/E = "
        f"{_a(D1)}/{_a(E1)}: r<sub>E</sub> = {_p(rU, 4)} + ({_a(D1)}/{_a(E1)}) × ({_p(rU, 4)} − {_p(rf, 1)}) = "
        f"{_p(rE1, 4)}. The share is a perpetuity: {penger(dps, 4, val)}/{_p(rE1, 4)} = "
        f"{penger(dps / rE1, 2, val)}, the unchanged price. This check can fail: a wrong dividend would not "
        f"return the price.</p>"
        f"<p><b>Remember:</b> after a recap, recompute both the interest and the share count, then value the new "
        f"dividend at the new r<sub>E</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} per share"))


# ---------------------------------------------------------------------------
# mm-arb1 · Arbitrasjegevinsten bak MM I (PS1 E2)
# ---------------------------------------------------------------------------
PAR_MM = [("Ulvund Power", "Lerkvik Power"), ("Oddane Fisheries", "Bremnes Fisheries"),
          ("Stokke Mining", "Rossland Mining"), ("Hamre Grain", "Nesbø Grain"), ("Tveter Shipping", "Aune Shipping")]


@familie("mm-arb1", tema="mm", antall=5, tittel="The arbitrage behind MM I",
         hjelp=hjelp3(
             "This is the arbitrage proof of MM I. Two firms have the same cash flow but different financing. "
             "The levered equity is mispriced. You need the riskless payoff of the trade.",
             "Law of one price: two portfolios with the same payoff in every state must cost the same. Levered "
             "equity pays X − K(1 + r). Unlevered equity plus personal borrowing of K pays the same.",
             "<p><b>Step 1: today.</b> Add up the cash from the short sale, the cost of the levered equity and the "
             "amount lent.</p>"
             "<p><b>Step 2: at t = 1.</b> The levered equity pays the cash flow minus principal and interest. The "
             "loan you made comes back with interest. Closing the short costs the whole cash flow.</p>"
             "<p><b>Step 3: add up.</b> The risky parts cancel, so what is left is certain.</p>"
             "<p><b>Watch out:</b> the lenders are paid interest. So is your own loan.</p>",
         ))
def _(r):
    U, L = r.choice(PAR_MM)
    val = r.choice(["NOK", "$"])
    V = r.choice([100, 200, 250, 400, 500])
    rr = r.choice([0.05, 0.08, 0.10])
    X = V * (1 + rr)
    K = r.choice([0.30, 0.40, 0.50]) * V
    gap = r.choice([4, 5, 6, 8, 10]) * V / 100
    EBf = V - K
    EBm = EBf - gap
    svar = gap * (1 + rr)

    f_t0 = gap                                             # målt i dag
    f_hst = svar + K * rr                                  # gjelden tilbakebetalt uten renter
    f_utl = gap - K * rr                                   # utlånet uten renter
    if f_utl <= 0:
        raise Avvis("fella uten renter blir ikke positiv")
    ulike(svar, f_t0, f_hst, f_utl, rel=0.02)
    dd = _des(svar, f_t0, f_hst, f_utl)

    q = (f"<p>Two firms, {U} and {L}, will each produce a single cash flow of {_m(X, val)} at t = 1 and then close. "
         f"They are identical except for financing. {U} is all-equity and its equity trades at {_m(V, val)}. {L} has "
         f"borrowed {_m(K, val)} risk-free at {_p(rr, 0)}, due with interest at t = 1. Its equity trades at "
         f"{_m(EBm, val)}. Investors and firms can borrow and lend at {_p(rr, 0)}. Markets are otherwise "
         f"perfect.</p>"
         f"<p>An investor sells all of {gen(U)} equity short, buys all of {gen(L)} equity and lends what is left "
         f"over at {_p(rr, 0)}. What is her payoff at t = 1, in millions? It is the same in every state.</p>")

    alternativer = [
        R(penger(svar, dd, val), svar),
        F(penger(f_t0, dd, val),
          f"The price gap measured today, {_a(EBf)} − {_a(EBm)}. The question asks for the payoff at t = 1, after "
          f"the loan has been repaid and the short position closed.", f_t0),
        F(penger(f_hst, dd, val),
          f"{gen(L)} shareholders credited with {_a(X)} − {_a(K)}, as if the debt were repaid without interest. "
          f"The lenders get principal plus interest, so the levered equity receives less.", f_hst),
        F(penger(f_utl, dd, val),
          f"The cash lent out earns no interest in this sum. It is lent at {_p(rr, 0)}, so it has grown by "
          f"t = 1.", f_utl),
    ]

    laan = V - EBm
    tilL = X - K * (1 + rr)
    kort = (f"<p><b>{penger(svar, dd, val)} million.</b> Today: +{_a(V)} − {_a(EBm)} = {_a(laan)} lent. At t = 1: "
            f"{_a(tilL)} from {gen(L)} equity + {_a(laan * (1 + rr))} from the loan − {_a(X)} to close the short = "
            f"{_a(svar)}.</p>")

    full = (
        f"<p><b>Why this is MM I.</b> {gen(L)} equity pays the cash flow minus what the lenders are owed. You can "
        f"build the same payoff yourself by holding {gen(U)} equity and borrowing {_a(K)} on your own account: "
        f"homemade leverage. Two routes to one payoff must cost the same, so E<sub>{L}</sub> = V − D. When the "
        f"price is lower, buying it and selling the copy pays off for certain.</p>"
        f"<p><b>Step 1: today.</b> The short sale brings in {_a(V)}. {gen(L)} equity costs {_a(EBm)}. The rest, "
        f"{_a(V)} − {_a(EBm)} = {_a(laan)}, is lent at {_p(rr, 0)}. Net outlay: zero.</p>"
        f"<p><b>Step 2: at t = 1.</b> {gen(L)} equity pays {_a(X)} − {_a(K)} × {tall(1 + rr, 2)} = {_a(tilL)}. "
        f"The loan pays {_a(laan)} × {tall(1 + rr, 2)} = {_a(laan * (1 + rr))}. Closing the short costs "
        f"{_a(X)}.</p>"
        f"<p><b>Step 3: add up.</b> {_a(tilL)} + {_a(laan * (1 + rr))} − {_a(X)} = <b>{penger(svar, dd, val)} "
        f"million</b>, with no money down and no risk.</p>"
        f"<p><b>First check.</b> At the fair price E<sub>{L}</sub> = {_a(V)} − {_a(K)} = {_a(EBf)}, the same trade "
        f"lends {_a(K)} and pays {_a(tilL)} + {_a(K * (1 + rr))} − {_a(X)} = 0. This check can fail: any error in "
        f"the legs would leave a payoff at the fair price.</p>"
        f"<p><b>Remember:</b> investors can make leverage themselves, so they will not pay extra for a firm's "
        f"leverage, nor accept a discount on it. V<sup>L</sup> = V<sup>U</sup>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ---------------------------------------------------------------------------
# mm-eps1 · EPS etter et gjeldsfinansiert tilbakekjøp (forelesning 2 s. 24, PS1 E1c)
# ---------------------------------------------------------------------------
@familie("mm-eps1", tema="mm", antall=5, tittel="EPS after a debt-financed buyback",
         hjelp=hjelp3(
             "This is the EPS fallacy. A firm borrows to buy back shares. You need the expected earnings per "
             "share afterwards. Then see why a higher EPS does not mean a higher price.",
             "Without taxes, earnings = EBIT − r<sub>D</sub> × D. Shares bought = D / P, with P unchanged (MM I). "
             "EPS = earnings / shares left.",
             "<p><b>Step 1: the shares.</b> The loan buys shares at the market price.</p>"
             "<p><b>Step 2: the earnings.</b> Subtract the interest on the new loan from EBIT.</p>"
             "<p><b>Step 3: divide.</b> Use the shares that are left.</p>"
             "<p><b>Watch out:</b> both the interest and the share count change. The price does not.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N = r.choice([10, 20, 25, 40, 50])
    P = r.choice([10, 12, 15, 20, 25, 30, 40])
    eps0 = r.choice([1.00, 1.20, 1.50, 2.00, 2.40, 2.50])
    if not 8 <= P / eps0 <= 20:
        raise Avvis("urimelig P/E")
    EBIT = eps0 * N
    f = r.choice([0.20, 0.25, 0.30, 0.40])
    D = f * N * P
    n = f * N
    rD = r.choice([0.04, 0.05, 0.06, 0.08])
    eps1 = (EBIT - rD * D) / (N - n)

    f_rente = EBIT / (N - n)                               # renten glemt
    f_gmlN = (EBIT - rD * D) / N                           # gamle antall aksjer
    f_lik = eps0                                           # uendret
    ulike(eps1, f_rente, f_gmlN, f_lik, rel=0.02)
    dd = _des(eps1, f_rente, f_gmlN, f_lik)

    q = (f"<p>{navn} is financed entirely with equity: {N} million shares at {penger(P, 0, val)}. It expects EBIT "
         f"of {_m(EBIT, val)} next year and pays no taxes, so its earnings are EBIT minus interest. It borrows "
         f"{_m(D, val)} at {_p(rD, 1)} and uses all of it to buy back shares at the market price. Markets are "
         f"perfect.</p>"
         f"<p>What is {gen(navn)} expected earnings per share next year after the buyback?</p>")

    alternativer = [
        R(penger(eps1, dd, val), eps1),
        F(penger(f_rente, dd, val),
          f"The interest left out: {_a(EBIT)}/({N} − {_a(n)}). The loan costs {_p(rD, 1)} a year. That comes "
          f"out of the shareholders' earnings.", f_rente),
        F(penger(f_gmlN, dd, val),
          f"Divided by the old {N} million shares. The loan bought back {_a(n)} million of them.", f_gmlN),
        F(penger(f_lik, dd, val),
          "EPS left at its old level. A leveraged buyback changes both the earnings and the number of shares, so "
          "EPS changes even though the value does not.", f_lik),
    ]

    kort = (f"<p><b>{penger(eps1, dd, val)}.</b> Shares bought: {_a(D)}/{P} = {_a(n)} million. Earnings: "
            f"{_a(EBIT)} − {_p(rD, 1)} × {_a(D)} = {_a(EBIT - rD * D)}. EPS = {_a(EBIT - rD * D)}/{_a(N - n)} = "
            f"{penger(eps1, dd, val)}.</p>")

    bep = rD * N * P
    retning = "rises" if eps1 > eps0 else "falls"
    grunn = "above" if EBIT > bep else "below"
    full = (
        f"<p><b>The fallacy.</b> A leveraged buyback usually lifts EPS. It is tempting to conclude the shares "
        f"are worth more. They are not. In a perfect market the price is unchanged (MM I), so the higher EPS "
        f"comes with a higher r<sub>E</sub>: the earnings are now riskier. The P/E ratio falls to match.</p>"
        f"<p><b>Step 1: the shares.</b> The price stays at {penger(P, 0, val)}, so {_a(D)}/{P} = {_a(n)} million "
        f"shares are bought, leaving {_a(N - n)} million.</p>"
        f"<p><b>Step 2: the earnings.</b> Interest = {_p(rD, 1)} × {_a(D)} = {_a(rD * D)}. Earnings = {_a(EBIT)} − "
        f"{_a(rD * D)} = {_a(EBIT - rD * D)}.</p>"
        f"<p><b>Step 3: EPS.</b> {_a(EBIT - rD * D)}/{_a(N - n)} = <b>{penger(eps1, dd, val)}</b>, against "
        f"{penger(eps0, 2, val)} before. EPS {retning} because EBIT is {grunn} the break-even level "
        f"{_p(rD, 1)} × {N} × {P} = {_a(bep)}, where the return on the assets equals the interest rate.</p>"
        f"<p><b>First check.</b> EPS × shares + interest = {penger(eps1, 4, val)} × {_a(N - n)} + {_a(rD * D)} = "
        f"{_a(eps1 * (N - n) + rD * D)} = EBIT. This is the same sum read backwards, so it catches arithmetic "
        f"slips only.</p>"
        f"<p><b>Remember:</b> EPS can rise while the price stays put. The extra EPS is pay for extra risk, so "
        f"P/E falls.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} per share"))


# ---------------------------------------------------------------------------
# mm-bep1 · Break-even EBIT (forelesning 2 s. 24)
# ---------------------------------------------------------------------------
@familie("mm-bep1", tema="mm", antall=5, tittel="Break-even EBIT for a leveraged buyback",
         hjelp=hjelp3(
             "This is the second half of the EPS fallacy. You need the level of EBIT at which EPS is the same "
             "with and without the leveraged buyback.",
             "Set EPS equal: EBIT / N<sub>U</sub> = (EBIT − r<sub>D</sub> × D) / N<sub>L</sub>, with N<sub>L</sub> "
             "= N<sub>U</sub> − D/P. Solve for EBIT.",
             "<p><b>Step 1: the shares after.</b> The loan buys shares at the unchanged price.</p>"
             "<p><b>Step 2: the interest.</b> The rate times the loan.</p>"
             "<p><b>Step 3: solve.</b> Cross-multiply the two EPS expressions and collect the EBIT terms.</p>"
             "<p><b>Watch out:</b> the answer is a level of EBIT for the whole firm, not EPS per share and not "
             "the earnings left for the shareholders.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    N = r.choice([10, 20, 25, 40, 50])
    P = r.choice([7.5, 10, 12, 15, 20, 25, 30])
    f = r.choice([0.20, 0.25, 0.30, 0.40])
    D = f * N * P
    n = f * N
    if not _hel(n * 4) or not _hel(D * 4):
        raise Avvis("stygge tall")
    rD = r.choice([0.04, 0.05, 0.06, 0.08])
    bep = rD * D * N / n                                   # = r_D × N × P
    EBIT = rund(bep * r.choice([0.7, 0.8, 1.25, 1.4, 1.6]), 0)
    if EBIT <= 0 or nær(EBIT, bep, 0.05):
        raise Avvis("EBIT for nær break-even")

    f_rente = rD * D                                       # bare renten
    f_eps = rD * P                                         # break-even EPS
    f_ek = bep - rD * D                                    # resultatet til eierne ved break-even
    ulike(bep, f_rente, f_eps, f_ek, rel=0.02)

    q = (f"<p>{navn} is financed entirely with equity: {N} million shares at {penger(P, 2, val)}. It expects EBIT "
         f"of {_m(EBIT, val)} next year and pays no taxes. It plans to borrow {_m(D, val)} at {_p(rD, 1)} and buy "
         f"back {_a(n)} million shares at the market price. Markets are perfect.</p>"
         f"<p>At what level of EBIT would EPS be the same with and without the buyback? Answer in millions.</p>")

    dm = 0 if all(_hel(x) for x in (bep, f_rente, f_eps, f_ek)) else 2
    alternativer = [
        R(_m(bep, val, dm), bep),
        F(_m(f_rente, val, dm),
          f"This is the interest bill, {_p(rD, 1)} × {_a(D)}. At that EBIT the levered firm earns nothing for its "
          f"shareholders, while the unlevered firm still does.", f_rente),
        F(_m(f_eps, val, dm),
          f"This is EPS at the break-even point, {_p(rD, 1)} × {penger(P, 2, val)}, a figure per share. Read as "
          f"millions it is far too small to be the firm's EBIT.", f_eps),
        F(_m(f_ek, val, dm),
          "These are the earnings left for the shareholders after interest at the break-even point, not EBIT.",
          f_ek),
    ]

    NL = N - n
    kort = (f"<p><b>{_m(bep, val, dm)}.</b> EBIT/{N} = (EBIT − {_a(rD * D)})/{_a(NL)} gives EBIT × {_a(n)} = "
            f"{_a(rD * D)} × {N}, so EBIT = {_a(bep)}.</p>")

    full = (
        f"<p><b>What the break-even says.</b> Leverage lifts EPS only if the assets earn more than the debt "
        f"costs. Below the break-even EBIT the interest eats more than the shares saved. EPS then falls. Either "
        f"way the price stays where it was (MM I): EPS has become more sensitive to EBIT, that is riskier.</p>"
        f"<p><b>Step 1: the shares after.</b> {_a(D)}/{penger(P, 2, val)} = {_a(n)} million bought, leaving "
        f"{_a(NL)} million.</p>"
        f"<p><b>Step 2: the interest.</b> {_p(rD, 1)} × {_a(D)} = {_a(rD * D)}.</p>"
        f"<p><b>Step 3: solve.</b> EBIT/{N} = (EBIT − {_a(rD * D)})/{_a(NL)}. Cross-multiply: {_a(NL)} × EBIT = "
        f"{N} × EBIT − {N} × {_a(rD * D)}, so {_a(n)} × EBIT = {_a(N * rD * D)} and EBIT = <b>{_a(bep)}</b>.</p>"
        f"<p><b>First check.</b> At EBIT = {_a(bep)}: without the buyback EPS = {_a(bep)}/{N} = "
        f"{penger(bep / N, 4, val)}; with it ({_a(bep)} − {_a(rD * D)})/{_a(NL)} = {penger((bep - rD * D) / NL, 4, val)}. "
        f"Equal. A short cut gives the same: EBIT = r<sub>D</sub> × N × P = {_p(rD, 1)} × {_a(N * P)} = "
        f"{_a(rD * N * P)}, the EBIT at which the assets earn exactly r<sub>D</sub>. The expected EBIT of "
        f"{_a(EBIT)} is {'above' if EBIT > bep else 'below'} it, so the buyback would "
        f"{'raise' if EBIT > bep else 'lower'} EPS.</p>"
        f"<p><b>Remember:</b> EPS rises with leverage only when EBIT/V exceeds r<sub>D</sub>. Even then the "
        f"price does not move.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ===========================================================================
# Statiske spørsmål: mekanismen, feilslutningene og de verbale delene
# ===========================================================================

# mm-s01 · Kunngjøringen i et perfekt marked (H2024 E3b, H2025 E3c)
statisk(
    "mm-s01", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is about what moves a share price when a recapitalisation is announced in a perfect market.",
        "A share is worth the present value of the cash flows it will receive. Ask what the plan changes: "
        "the cash flows the assets produce, or only how they are split between lenders and shareholders.",
        "<p><b>Step 1: ask what the plan changes.</b> The assets? The cash flows they produce? Or only who gets "
        "them?</p>"
        "<p><b>Step 2: ask what the buyback price is.</b> At a fair price the sellers and the holders end up "
        "equally rich.</p>"
        "<p><b>Step 3: look for a friction.</b> Without taxes, distress costs or new information there is nothing "
        "for the price to react to.</p>",
    ),
    q="<p>A firm in a perfect capital market with no taxes announces that next month it will borrow and use the "
      "money to buy back shares at the market price. Its assets and investment plans do not change.</p>"
      "<p>What happens to the share price when the plan is announced?</p>",
    alternativer=[
        R("Nothing: the plan reslices the same cash flows, so there is no new value to price in"),
        F("It rises, because the buyback adds demand for the shares and pushes the price up",
          "In a perfect market the price is the present value of the cash flows behind each share, not the result "
          "of buying pressure. The firm pays a fair price, so the buyback itself moves nothing."),
        F("It falls, because the shares become riskier and shareholders require a higher return",
          "r<sub>E</sub> does rise, but so does the expected payout per share. The two cancel exactly (MM II), so "
          "a higher required return is not a lower price."),
        F("It rises by the value of the interest saved, because debt is cheaper than equity",
          "Cheap debt makes the equity riskier and dearer, so the WACC does not fall. Without taxes there is no tax "
          "shield either, so there is no gain to capitalise."),
    ],
    kort="<p><b>Nothing happens.</b> Without taxes or other frictions a recapitalisation only changes who gets the "
         "firm's cash flows (MM I). V is unchanged and the buyback is at a fair price, so the share price does not "
         "move.</p>",
    full="<p><b>What sets the price.</b> A share is worth the present value of what it will pay. In a perfect "
         "market that value comes from the firm's assets. Financing decides how the assets' cash flow is split "
         "between lenders and shareholders, not how large it is.</p>"
         "<p><b>Step 1: the plan.</b> Borrowing to buy back shares changes the split. The lenders get more. The "
         "remaining shareholders get a riskier claim spread over fewer shares. The assets are unchanged and so is "
         "V (MM I).</p>"
         "<p><b>Step 2: the buyback price.</b> The firm buys at the market price. A seller gets exactly what the "
         "share is worth. A holder keeps a share worth the same, because the extra risk is matched by a higher "
         "expected payout (MM II).</p>"
         "<p><b>Step 3: the frictions.</b> With corporate taxes the plan would create a tax shield and the price "
         "would jump at the announcement. With distress costs it could fall. Here there are none, so the price is "
         "the same before the announcement, after it and after the buyback (H2024 Exercise 3, H2025 Exercise 3).</p>"
         "<p><b>Remember:</b> only a change in value moves the price. In a perfect market financing alone changes "
         "no value.</p>",
)

# mm-s02 · Hva MM I trenger og ikke trenger (forelesning 2 s. 13, forelesning 4 s. 6)
statisk(
    "mm-s02", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is about the assumptions behind MM I: which conditions make financing irrelevant and which are not "
        "needed.",
        "MM I rests on the law of one price: investors can copy the firm's financing on their own terms. For "
        "each statement, ask whether financing could change the firm's cash flows or their price without it.",
        "<p><b>Step 1: list the conditions.</b> Prices, frictions, cash flows and information.</p>"
        "<p><b>Step 2: test each statement.</b> Would MM I fail without it?</p>"
        "<p><b>Step 3: think about default.</b> Does default by itself destroy value, or does it only move the "
        "firm from the shareholders to the lenders?</p>",
    ),
    q="<p>MM I says that in a perfect capital market the value of a firm does not depend on its capital structure. "
      "Which of the following is <i>not</i> needed for MM I to hold?</p>",
    alternativer=[
        R("The firm's debt must be risk-free, with no chance of default"),
        F("There are no taxes, transaction costs or issuance costs",
          "This one is needed. A tax shield or costly issues would make the financing choice change the value of "
          "the firm."),
        F("Financing choices do not change the cash flows from investment",
          "This one is needed. If debt changed what the assets produce, through distress costs or agency problems, "
          "value would depend on financing."),
        F("Investors and firms trade the same securities at competitive prices",
          "This one is needed. Homemade leverage, the arbitrage behind MM I, works only if investors can borrow "
          "and trade on the same terms as firms."),
    ],
    kort="<p><b>Risk-free debt is not needed.</b> Default by itself only hands the firm to the lenders. As long as "
         "default costs nothing, V is unchanged (lecture 4). The other three are the conditions of a perfect "
         "market.</p>",
    full="<p><b>What MM I rests on.</b> Kurbatov's perfect capital market (lecture 2) has three parts: securities "
         "trade at competitive prices equal to the present value of their cash flows; there are no taxes, "
         "transaction costs or issuance costs; financing does not change the cash flows from investment and does "
         "not reveal new information.</p>"
         "<p><b>Step 1: the three conditions.</b> Each one blocks a channel through which financing could move "
         "value. Taxes create a shield. Issue costs destroy value. Cash flows that depend on financing bring in "
         "distress and agency costs. Unequal trading terms break the arbitrage.</p>"
         "<p><b>Step 2: risky debt.</b> MM I holds with risky debt too. When the firm defaults the lenders take "
         "over the assets. If that transfer is costless the cash flow is the same and so is V (lecture 4, "
         "slide 6). MM II also holds, with the higher r<sub>D</sub> of the risky debt (H2024 Exercise 3d).</p>"
         "<p><b>Step 3: where default does matter.</b> Once bankruptcy has costs (legal fees, fire sales, lost "
         "customers), the market no longer is perfect. That is the trade-off theory, not MM.</p>"
         "<p><b>Remember:</b> MM needs no frictions, not safe debt. Default is a transfer, its costs are the "
         "friction.</p>",
)

# mm-s03 · Hjemmelaget giring baklengs: å oppheve firmaets giring (PS1 E2, forelesning 2)
statisk(
    "mm-s03", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is homemade leverage run in reverse. An investor wants to undo the leverage a firm has taken on.",
        "Levered equity pays the firm's cash flow minus what the lenders get. Homemade leverage: an investor "
        "can borrow or lend on the same terms as the firm, including by holding its bonds.",
        "<p><b>Step 1: what the investor wants.</b> The payoff of the firm before it borrowed: a slice of the "
        "whole cash flow.</p>"
        "<p><b>Step 2: what the levered equity pays.</b> The cash flow minus what the lenders get.</p>"
        "<p><b>Step 3: add the missing piece.</b> Which claim pays what the lenders get? Hold it in the same "
        "proportion as the firm's own capital structure.</p>",
    ),
    q="<p>A firm in a perfect capital market has just borrowed and bought back shares. It went from no debt to a "
      "debt-to-value ratio of 0.40. Its debt is risk-free. You have NOK 100 000 to invest and you want exactly "
      "the risk of the old, unlevered shares.</p>"
      "<p>What should you do?</p>",
    alternativer=[
        R("Put 60% of the money in the firm's shares and 40% in its bonds"),
        F("Borrow on your own so that 40% of your position is financed with debt",
          "That adds your own leverage on top of the firm's, so the position is riskier still. To undo leverage "
          "you lend rather than borrow."),
        F("Avoid the shares altogether: the levered equity is riskier and so worth less",
          "The levered shares are riskier, but they are fairly priced. Avoiding them does not give you the old "
          "payoff."),
        F("Wait for the firm to repay: only the firm can undo its own leverage",
          "Homemade leverage runs both ways. An investor can add leverage by borrowing or remove it by lending, on "
          "the same terms as the firm."),
    ],
    kort="<p><b>Hold the firm's shares and bonds in its own proportions, 60/40.</b> The same fraction of both "
         "claims pays the same fraction of the firm's whole cash flow, exactly what the unlevered shares paid. "
         "That is why investors pay nothing extra for a firm's leverage (MM I).</p>",
    full="<p><b>The idea.</b> MM I says investors will not pay for leverage they can create or undo on their own. "
         "Undoing it means holding the firm's debt alongside its equity. Lending to the firm through its bonds "
         "cancels the leverage the firm has taken on.</p>"
         "<p><b>Step 1: the payoff you want.</b> Before the recapitalisation, NOK 100 000 of shares was a fraction "
         "100 000/V of the firm and paid that fraction of its whole cash flow.</p>"
         "<p><b>Step 2: what the shares pay now.</b> The equity is 60% of V and pays the cash flow minus the "
         "interest and principal owed to the lenders. NOK 60 000 of it is the fraction 100 000/V of the equity.</p>"
         "<p><b>Step 3: add the bonds.</b> NOK 40 000 of the bonds is the fraction 100 000/V of the debt. It pays "
         "that fraction of what the lenders get. Together you hold 100 000/V of the debt and of the equity, which "
         "is 100 000/V of the whole cash flow: the old payoff, state by state.</p>"
         "<p><b>First check.</b> The risk: your return is 0.60 × r<sub>E</sub> + 0.40 × r<sub>D</sub>, the pre-tax "
         "WACC, which is r<sub>U</sub> (MM II).</p>"
         "<p><b>Remember:</b> borrowing on your own adds leverage, lending (buying the firm's debt) removes it.</p>",
)

# mm-s04 · Hvorfor r_E stiger mens WACC står stille (MM II)
statisk(
    "mm-s04", tema="mm", type="tolkning",
    hjelp=hjelp3(
        "This is about MM II: what happens to the cost of equity and to the firm's overall cost of capital when "
        "leverage rises without taxes.",
        "MM II: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). Pre-tax WACC = "
        "(E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>. Firm value = cash flow discounted at the WACC.",
        "<p><b>Step 1: what changed.</b> The firm now has debt. Which return rose and which weight rose?</p>"
        "<p><b>Step 2: the average.</b> Put the two returns together with their new weights.</p>"
        "<p><b>Step 3: the value.</b> Does the firm's value depend on r<sub>E</sub> alone or on the average?</p>",
    ),
    q="<p>A firm with no debt borrows at a risk-free rate and buys back shares. There are no taxes and markets are "
      "perfect. Its cost of equity rises from 10% to 12%.</p>"
      "<p>Which statement is correct?</p>",
    alternativer=[
        R("The pre-tax WACC is unchanged: more weight on cheap debt offsets the dearer equity"),
        F("The firm's cost of capital has risen, so its value has fallen",
          "Only the cost of equity rose. The WACC also puts more weight on the cheaper debt. The two effects "
          "cancel, so V is unchanged."),
        F("The shareholders are worse off, since they now require more for the same shares",
          "They require more because each share now carries more risk. They also expect a higher payout to match. "
          "The price is unchanged, so they are as well off as before."),
        F("r<sub>E</sub> rose because default risk appeared. With safe debt it would not move",
          "The debt is risk-free here. r<sub>E</sub> rises because the same business risk now sits on a smaller "
          "equity base, default or not."),
    ],
    kort="<p><b>The pre-tax WACC stays at r<sub>U</sub>.</b> r<sub>E</sub> rises with D/E (MM II), but the weight "
         "on the cheaper debt rises too. The average is fixed, so V and the price are unchanged.</p>",
    full="<p><b>The mechanism.</b> Debt is paid first and absorbs none of the swings in the firm's cash flow when "
         "it is risk-free. The swings all land on the equity, which is now smaller. Each krone of equity is "
         "riskier, so r<sub>E</sub> rises. But the firm now raises part of its capital at the cheap r<sub>D</sub>. "
         "The two effects cancel exactly.</p>"
         "<p><b>Step 1: an example.</b> Before: r<sub>U</sub> = r<sub>E</sub> = 10%. Say r<sub>D</sub> = 4%. MM II "
         "gives 12% = 10% + (D/E)(10% − 4%), so D/E = 1/3 and D/V = 0.25.</p>"
         "<p><b>Step 2: the average.</b> 0.75 × 12% + 0.25 × 4% = 9% + 1% = 10%, which is r<sub>U</sub>. The WACC "
         "has not moved. Since r<sub>E</sub> came from MM II, this is an identity, but it shows why the higher "
         "r<sub>E</sub> is not a higher cost of capital.</p>"
         "<p><b>Step 3: the value.</b> The firm's value is its cash flow discounted at the WACC. Neither changed, "
         "so V is the same and so is the share price (MM I).</p>"
         "<p><b>Remember:</b> a higher r<sub>E</sub> is pay for higher risk, not a loss. Without taxes the WACC "
         "is r<sub>U</sub> at any leverage.</p>",
)

# mm-s05 · EPS og P/E etter et gjeldsfinansiert tilbakekjøp (forelesning 2 s. 24)
statisk(
    "mm-s05", tema="mm", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is the EPS fallacy. A leveraged buyback raises EPS. Decide what that does to the share price and to "
        "the P/E ratio.",
        "P/E = price / EPS. The price is the present value of the cash flows per share at r<sub>E</sub>. In "
        "turn r<sub>E</sub> depends on D/E (MM II).",
        "<p><b>Step 1: the price.</b> Does a change in financing alone move the price in a perfect market?</p>"
        "<p><b>Step 2: the ratio.</b> If the price stays and EPS rises, what must happen to price over EPS?</p>"
        "<p><b>Step 3: judge each statement</b> on its own, then pick the combination.</p>",
    ),
    q="<p>A firm in a perfect capital market with no taxes borrows to buy back shares. Its expected EPS rises from "
      "NOK 2.00 to NOK 2.40.</p>"
      "<p>I. The share price rises by 20%, in line with EPS.<br>II. The P/E ratio falls.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I",
          "Statement I is the EPS fallacy: in a perfect market a leveraged buyback leaves the price unchanged. The "
          "higher EPS is riskier, not more valuable."),
        R("Only II"),
        F("Both I and II",
          "Statement I is the EPS fallacy: the price does not move in a perfect market. The extra EPS is pay for "
          "extra risk."),
        F("Neither I nor II",
          "Statement II holds: with the price fixed and EPS higher, price over earnings has to fall."),
    ],
    kort="<p><b>Only II.</b> The price is unchanged (MM I). EPS rises by 20%, so P/E falls by the same factor. "
         "The higher EPS is compensation for higher risk.</p>",
    full="<p><b>The fallacy.</b> More debt and fewer shares usually mean higher EPS. It is tempting to apply the "
         "old P/E to the new EPS and conclude that the price rises. It does not. The earnings per share are now "
         "riskier, so investors capitalise them at a higher r<sub>E</sub>, that is at a lower P/E.</p>"
         "<p><b>Step 1: the price.</b> In a perfect market the recapitalisation creates no value (MM I). Say the "
         "price is NOK 30 before and after.</p>"
         "<p><b>Step 2: the P/E.</b> Before: 30/2.00 = 15. After: 30/2.40 = 12.5. The ratio falls by exactly the "
         "factor by which EPS rose.</p>"
         "<p><b>Step 3: why investors accept a lower P/E.</b> EPS is now more sensitive to EBIT. A bad year hits "
         "the levered shares harder, because the interest is fixed. Riskier earnings are worth less per krone. "
         "The rise in EPS is exactly enough to pay for that.</p>"
         "<p><b>Remember:</b> EPS up, price unchanged, P/E down. That is lecture 2's EPS fallacy and the "
         "P/E part of PS1 Exercise 1.</p>",
)

# mm-s06 · Utvanningsfeilslutningen (forelesning 2 s. 26)
statisk(
    "mm-s06", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is the dilution fallacy. A firm sells new shares at a fair price to fund a project. You need the "
        "number of shares it must sell.",
        "The market prices the NPV in at the announcement: P = (old equity value + NPV) / old shares. New shares = "
        "amount raised / P.",
        "<p><b>Step 1: the price after the announcement.</b> Add the project's NPV to the old equity value and "
        "divide by the old share count.</p>"
        "<p><b>Step 2: the shares sold.</b> Divide the money needed by that price.</p>"
        "<p><b>Watch out:</b> the cash raised is not part of the value before it has been raised. New shares "
        "sold at a fair price do not lower the price.</p>",
    ),
    q="<p>A firm has 400 million shares trading at $20. It announces a new plant that costs $1 billion and has an "
      "NPV of $200 million. It will pay for the plant by selling new shares at a fair price after the "
      "announcement. Markets are perfect.</p>"
      "<p>How many new shares must it sell, in millions?</p>",
    alternativer=[
        R("48.7805 million", 1000 / 20.5),
        F("50.0000 million",
          "Shares sold at the old $20. The market prices the project's NPV in as soon as it is announced, so the "
          "new shares fetch more.", 50.0),
        F("43.4783 million",
          "Shares sold at (8 000 + 200 + 1 000)/400 = $23. The $1 billion is not in the firm until the new "
          "shareholders pay it, so it cannot be part of the price they pay.", 1000 / 23),
        F("51.2821 million",
          "Shares sold at $20 − 200/400 = $19.50, as if the new shares diluted the old ones. Shares sold at a fair "
          "price take nothing from the old shareholders.", 1000 / 19.5),
    ],
    kort="<p><b>48.7805 million.</b> The NPV is priced in at the announcement: P = 20 + 200/400 = $20.50. New "
         "shares = 1 000/20.50 = 48.7805 million.</p>",
    full="<p><b>The fallacy.</b> «New shares split the cash flows among more people, so the price must fall.» It "
         "does not, because the new shareholders pay for what they get. The cash they bring in buys assets worth "
         "at least as much. Any gain or loss for the old shareholders comes from the project's NPV, not from the "
         "issue (lecture 2, slide 26).</p>"
         "<p><b>Step 1: the announcement.</b> The old equity is worth 400 × $20 = $8 000 million. The plant adds "
         "an NPV of $200 million, which the old shareholders get at once: P = (8 000 + 200)/400 = $20.50.</p>"
         "<p><b>Step 2: the issue.</b> The firm needs $1 000 million at $20.50 a share: 1 000/20.50 = "
         "<b>48.7805 million</b> new shares.</p>"
         "<p><b>First check.</b> After the issue the equity is worth 8 000 + 200 + 1 000 = $9 200 million on "
         "448.7805 million shares: 9 200/448.7805 = $20.50. The price holds. This check can fail: with 50 million "
         "new shares you would get 9 200/450 = $20.44.</p>"
         "<p><b>Remember:</b> a fair-price issue is a zero-NPV deal for both sides. The old shareholders gain the "
         "project's NPV, nothing more and nothing less.</p>",
    tall=tallsvar(enhet="million shares"),
)

# mm-s07 · Gjeld forsterker avkastningen (forelesning 2 s. 21)
statisk(
    "mm-s07", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is about how borrowing magnifies the return on equity. You need the expected return to the "
        "shareholders of a project that is partly financed with safe debt.",
        "Equity payoff in each state = project payoff − (1 + r<sub>f</sub>) × D. Expected return = expected "
        "equity payoff / equity invested − 1. MM II gives the same: r<sub>U</sub> + (D/E)(r<sub>U</sub> − "
        "r<sub>D</sub>).",
        "<p><b>Step 1: the project's return.</b> Expected payoff over cost.</p>"
        "<p><b>Step 2: the equity's payoff.</b> In each state, subtract what the lenders are owed.</p>"
        "<p><b>Step 3: the equity's return.</b> Divide by the equity put in, not by the whole cost.</p>"
        "<p><b>Watch out:</b> the lenders are owed interest as well as principal.</p>",
    ),
    q="<p>A project costs NOK 200 million today. In one year it pays NOK 280 million or NOK 160 million with equal "
      "probability, then closes. It is financed with NOK 100 million of risk-free debt at 5% and NOK 100 million "
      "of equity. Markets are perfect.</p>"
      "<p>What is the expected return on the equity?</p>",
    alternativer=[
        R("15.00%", 0.15),
        F("10.00%",
          "This is the return on the project as a whole, (0.5 × 280 + 0.5 × 160)/200 − 1. The shareholders pay "
          "the lenders a fixed 5% and keep the rest, so their return differs.", 0.10),
        F("20.00%",
          "D/E times the project's return added without subtracting the cost of debt: 10% + 1.00 × 10%. The "
          "premium is D/E times the gap between the project's return and r<sub>D</sub>.", 0.20),
        F("7.50%",
          "The shareholders' expected profit divided by the whole project cost of 200. They put in only the "
          "equity, so divide by that.", 0.075),
    ],
    kort="<p><b>15.00%.</b> Equity gets 280 − 105 = 175 or 160 − 105 = 55, on average 115, for 100 invested: "
         "115/100 − 1 = 15%. MM II: 10% + (100/100)(10% − 5%) = 15%.</p>",
    full="<p><b>Why borrowing magnifies returns.</b> The lenders take a fixed payment. Every swing in the project's "
         "payoff lands on the shareholders, who have put in only part of the cost. Their return is higher on "
         "average and swings more (lecture 2, slide 21).</p>"
         "<p><b>Step 1: the project.</b> Expected payoff 0.5 × 280 + 0.5 × 160 = 220, so the project returns "
         "220/200 − 1 = 10%: +40% or −20%.</p>"
         "<p><b>Step 2: the equity's payoff.</b> The lenders are owed 100 × 1.05 = 105 in both states. The debt is "
         "safe, since 160 > 105. Equity gets 175 in the good state and 55 in the bad one, 115 on average.</p>"
         "<p><b>Step 3: the equity's return.</b> 115/100 − 1 = <b>15%</b>: +75% or −45%. The average rose and so "
         "did the swing.</p>"
         "<p><b>First check.</b> MM II by another route: r<sub>E</sub> = 10% + (100/100)(10% − 5%) = 15%. The "
         "state-by-state sum and the formula agree.</p>"
         "<p><b>Remember:</b> leverage raises the expected return on equity only by paying for more risk. The "
         "project is worth the same and so is the firm.</p>",
    tall=tallsvar(skala=100, enhet="%"),
)

# mm-s08 · Kapitalkrav i bank (forelesning 2 s. 25)
statisk(
    "mm-s08", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is MM II applied to a bank. A regulator forces more equity. You need the shareholders' required "
        "return afterwards.",
        "r<sub>U</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> before the change. After: r<sub>E</sub> = "
        "r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>) with the new D/E.",
        "<p><b>Step 1: r<sub>U</sub>.</b> The bank's funding cost today, weighted by the current shares of equity "
        "and debt.</p>"
        "<p><b>Step 2: the new D/E.</b> From the new equity requirement.</p>"
        "<p><b>Step 3: MM II.</b> The assets are the same, so r<sub>U</sub> is the same.</p>"
        "<p><b>Watch out:</b> the bankers' argument keeps r<sub>E</sub> fixed while leverage falls.</p>",
    ),
    q="<p>A bank funds its assets with 5% equity and 95% debt. Its shareholders require 18% and its debt costs 4%. "
      "The regulator raises the equity requirement to 10% of assets. The bank's assets do not change and its debt "
      "still costs 4%. Assume MM holds.</p>"
      "<p>What return will the bank's shareholders require after the change?</p>",
    alternativer=[
        R("11.00%", 0.11),
        F("18.00%",
          "The required return kept as it was. With half the leverage the shareholders carry less risk, so they "
          "ask for less.", 0.18),
        F("5.40%",
          "This is the bankers' claim for the new funding cost, 0.10 × 18% + 0.90 × 4%, with the old r<sub>E</sub>. "
          "It is not r<sub>E</sub>. It also overstates the funding cost.", 0.054),
        F("9.00%",
          "r<sub>E</sub> halved because the leverage halved. MM II is linear in D/E, not proportional to it: only "
          "the premium over r<sub>U</sub> shrinks.", 0.09),
    ],
    kort="<p><b>11.00%.</b> r<sub>U</sub> = 0.05 × 18% + 0.95 × 4% = 4.70%. New D/E = 90/10 = 9. r<sub>E</sub> = "
         "4.70% + 9 × (4.70% − 4%) = 11.00%.</p>",
    full="<p><b>The bankers' argument.</b> «Equity costs 18% and debt 4%. More equity means more of the dear "
         "funding, so our cost of capital rises.» That keeps r<sub>E</sub> fixed while the leverage falls. Under "
         "MM the shareholders of a safer bank require less (lecture 2, slide 25).</p>"
         "<p><b>Step 1: r<sub>U</sub>.</b> 0.05 × 18% + 0.95 × 4% = 0.90% + 3.80% = 4.70%. This is the return on "
         "the bank's assets, which the regulation does not change.</p>"
         "<p><b>Step 2: the new leverage.</b> E/V = 0.10, D/V = 0.90, so D/E = 9 (it was 19).</p>"
         "<p><b>Step 3: MM II.</b> r<sub>E</sub> = 4.70% + 9 × (4.70% − 4.00%) = 4.70% + 6.30% = <b>11.00%</b>.</p>"
         "<p><b>First check.</b> The new funding cost: 0.10 × 11% + 0.90 × 4% = 1.10% + 3.60% = 4.70%, the same "
         "as before. Since r<sub>E</sub> came from MM II this is an identity, but it is the point: higher capital "
         "requirements do not raise the funding cost.</p>"
         "<p><b>Remember:</b> less leverage, lower r<sub>E</sub>, same WACC. A return on equity target set "
         "without regard to leverage is not a cost of capital.</p>",
    tall=tallsvar(skala=100, enhet="%"),
)

# mm-s09 · Selgeren, eieren og den som ikke var med (H2025 E3e)
statisk(
    "mm-s09", tema="mm", type="tolkning",
    hjelp=hjelp3(
        "This is the comparison that closes a recapitalisation exercise: who ends up richer after a "
        "debt-financed buyback in a perfect market.",
        "Wealth = cash received + value of the shares kept. The buyback is at the market price. A share is worth "
        "its dividend discounted at its own r<sub>E</sub>.",
        "<p><b>Step 1: the seller.</b> What does she receive for her share?</p>"
        "<p><b>Step 2: the holder.</b> Her dividend changes and so does the rate it is discounted at. What is the "
        "share worth?</p>"
        "<p><b>Step 3: the world without the deal.</b> What would the share be worth there?</p>",
    ),
    q="<p>A firm in a perfect capital market with no taxes borrows and buys back shares at the market price. "
      "Compare three shareholders: one who sells her share in the buyback, one who keeps her share and one in an "
      "otherwise identical world where the firm never borrowed.</p>"
      "<p>Who is best off?</p>",
    alternativer=[
        R("None of them: each one's wealth equals the price before the deal"),
        F("The one who keeps her share, because her dividend per share rises",
          "The higher dividend is riskier and is discounted at a higher r<sub>E</sub>. Its present value is what "
          "the share was worth before."),
        F("The one who sells, because she escapes the riskier levered shares",
          "She escapes the risk, but she is paid only the fair price. The holder is paid for the extra risk "
          "through a higher expected dividend."),
        F("The one in the unlevered world, because no cash goes to the lenders",
          "The lenders paid for their claim when they lent. Taking part of the cash flow is what they bought, not "
          "a loss to the shareholders."),
    ],
    kort="<p><b>They are equally rich.</b> The seller gets the market price in cash. The holder's higher dividend "
         "is discounted at a higher r<sub>E</sub> and is worth the same price. Without the deal the share is "
         "worth that price too. That is MM I.</p>",
    full="<p><b>Why nobody gains.</b> In a perfect market the recapitalisation creates no value. It swaps equity "
         "for debt at fair prices. So every route leaves a shareholder with what one share was worth before the "
         "deal (H2025 Exercise 3e).</p>"
         "<p><b>Step 1: the seller.</b> She is paid the market price, which did not move at the announcement. Her "
         "wealth is that price, in cash.</p>"
         "<p><b>Step 2: the holder.</b> Interest now takes more of the cash flow, but it is spread over fewer "
         "shares, so her dividend per share rises. MM II raises r<sub>E</sub> by exactly enough that the new "
         "dividend discounted at the new r<sub>E</sub> gives the same price. In H2025: $16.6667/8.3333% = $200 "
         "against $15/7.5% = $200.</p>"
         "<p><b>Step 3: the unlevered world.</b> The old dividend at the old r<sub>E</sub> gives the same price "
         "again.</p>"
         "<p><b>First check.</b> Total wealth of the original shareholders: cash paid to the sellers plus the value "
         "of the shares kept equals the equity before the deal.</p>"
         "<p><b>Remember:</b> seller, holder and non-participant are equally rich. A holder who wants the old "
         "risk back can buy the firm's bonds (homemade leverage).</p>",
)

# mm-s10 · Kursen før, ved og etter rekapitaliseringen (H2024 E3b–c)
statisk(
    "mm-s10", tema="mm", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the share price at each stage of a recapitalisation without taxes: before, at the "
        "announcement and after the cash has been paid out.",
        "Price per share = equity value / shares outstanding. Follow both through each stage. Which of them "
        "changes when cash leaves as a buyback? Which when it leaves as a dividend?",
        "<p><b>Step 1: the announcement.</b> Is there any value for the market to price in?</p>"
        "<p><b>Step 2: the payment.</b> A buyback swaps cash for shares at a fair price. A dividend sends cash out "
        "and retires no shares.</p>"
        "<p><b>Step 3: judge each statement</b> on its own.</p>",
    ),
    q="<p>Consider a recapitalisation in a perfect capital market with no taxes.</p>"
      "<p>I. If the firm borrows to buy back shares at the market price, the share price is the same before the "
      "announcement, right after it and after the buyback.<br>"
      "II. If the firm borrows to pay a special dividend, the share price is the same before the announcement and "
      "after the dividend has been paid.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II misses the ex-dividend drop: once the dividend is paid each share holds less of the firm. "
          "Statement I holds: a fair buyback moves nothing."),
        F("Both I and II",
          "Statement II misses the ex-dividend drop. The shareholders are as rich as before, but part of their "
          "wealth is now cash, not share price."),
        F("Neither I nor II",
          "Statement I holds. Without taxes nothing is created at the announcement. The buyback swaps cash for "
          "shares at a fair price."),
    ],
    kort="<p><b>Only I.</b> Without taxes the price does not move at the announcement. A buyback at the market "
         "price leaves it unchanged. A dividend lowers the price by the dividend per share, with wealth "
         "unchanged.</p>",
    full="<p><b>Three dates.</b> A recapitalisation has an announcement and an execution. Only the announcement "
         "can bring news. In a perfect market without taxes there is none: V stays the same (MM I).</p>"
         "<p><b>Statement I.</b> True. At the announcement nothing changes. At the buyback the firm pays the "
         "market price for each share, so the remaining shares are worth what they were. H2024 Exercise 3e: the "
         "price stays at $90.</p>"
         "<p><b>Statement II.</b> False. Nothing happens at the announcement, but when the dividend is paid the "
         "cash leaves the firm and each share is a claim on less. The price falls by the dividend per share. "
         "H2024 Exercise 3c: $90 before, $80 after a $10 dividend.</p>"
         "<p><b>First check.</b> Wealth under the dividend: $80 share + $10 cash = $90, the same as under the "
         "buyback. Payout form does not change wealth, only its mix.</p>"
         "<p><b>Remember:</b> a fair buyback leaves the price unchanged. A dividend lowers it by the dividend. "
         "Neither changes wealth.</p>",
)

# mm-s11 · Risikabel gjeld demper økningen i r_E (H2024 E3d)
statisk(
    "mm-s11", tema="mm", type="tolkning",
    hjelp=hjelp3(
        "This is about MM II when the new debt is risky. Compare the cost of equity after two recapitalisations "
        "that reach the same D/E.",
        "MM II: r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). r<sub>U</sub> is fixed by the "
        "assets.",
        "<p><b>Step 1: what is the same.</b> The assets (so r<sub>U</sub>) and the leverage D/E.</p>"
        "<p><b>Step 2: what differs.</b> r<sub>D</sub>. What does a higher r<sub>D</sub> do to the spread in MM "
        "II?</p>"
        "<p><b>Step 3: the intuition.</b> Who carries the business risk when the debt is risky?</p>",
    ),
    q="<p>Two otherwise identical firms in a perfect market recapitalise to the same D/E. In the first the new debt "
      "is risk-free at 3%. In the second the new debt is risky and lenders expect 4.5% on it.</p>"
      "<p>How does r<sub>E</sub> after the second recapitalisation compare with r<sub>E</sub> after the first?</p>",
    alternativer=[
        R("Lower: the lenders now carry part of the business risk"),
        F("Higher: riskier debt makes the whole firm riskier, so the equity too",
          "The assets are identical, so r<sub>U</sub> is the same. Risky debt takes part of that fixed risk off "
          "the shareholders."),
        F("The same: MM II depends only on D/E, not on what the debt costs",
          "MM II is r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>). A higher r<sub>D</sub> "
          "narrows the spread that D/E multiplies."),
        F("Lower: the firm is worth more because its lenders are paid more",
          "Paying lenders more does not raise V. In a perfect market V is fixed by the assets whatever the lenders "
          "earn."),
    ],
    kort="<p><b>Lower.</b> With the same r<sub>U</sub> and D/E, a higher r<sub>D</sub> narrows r<sub>U</sub> − "
         "r<sub>D</sub>. The lenders take part of the business risk, so less of it lands on the equity.</p>",
    full="<p><b>The mechanism.</b> The firm's total risk is fixed by its assets. When the debt is safe, all of it "
         "lands on the equity. When the debt is risky the lenders share it, which is why they ask more than "
         "r<sub>f</sub>. What the lenders take, the shareholders do not carry.</p>"
         "<p><b>Step 1: an example.</b> Say r<sub>U</sub> = 8% and D/E = 0.5 in both firms.</p>"
         "<p><b>Step 2: safe debt.</b> r<sub>E</sub> = 8% + 0.5 × (8% − 3%) = 10.5%.</p>"
         "<p><b>Step 3: risky debt.</b> r<sub>E</sub> = 8% + 0.5 × (8% − 4.5%) = 9.75%. Lower.</p>"
         "<p><b>First check.</b> Both WACCs equal r<sub>U</sub>: (2/3) × 10.5% + (1/3) × 3% = 8% and (2/3) × "
         "9.75% + (1/3) × 4.5% = 8%. Identities, since both came from MM II, but they show the risk is only "
         "redistributed.</p>"
         "<p><b>Exam link.</b> H2024 Exercise 3d: leverage rose but r<sub>D</sub> rose from 3% to 4.5%, so "
         "r<sub>E</sub> went only from 9% to 9.25%. Always use the r<sub>D</sub> lenders quote after the deal.</p>"
         "<p><b>Remember:</b> risky debt shares the business risk, so r<sub>E</sub> rises less.</p>",
)

# mm-s12 · P/E etter rekapitaliseringen (PS1 E1c–d)
statisk(
    "mm-s12", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is the EPS fallacy in numbers. A leveraged buyback raises EPS and leaves the price alone. You need "
        "the new forward P/E ratio.",
        "Price unchanged (MM I). Per original share: borrowing = fraction bought back × P, interest = r<sub>D</sub> "
        "× borrowing. EPS = (old EPS − interest) / (1 − fraction bought back). P/E = P / EPS.",
        "<p><b>Step 1: the price.</b> From the old EPS and the old P/E.</p>"
        "<p><b>Step 2: the interest.</b> Work per original share: the loan and its interest.</p>"
        "<p><b>Step 3: the new EPS.</b> Earnings after interest, spread over the shares that remain.</p>"
        "<p><b>Step 4: P/E.</b> The unchanged price over the new EPS.</p>",
    ),
    q="<p>An all-equity firm expects EPS of NOK 2.00 next year and trades at a forward P/E ratio of 15. It borrows "
      "at a risk-free 4% and repurchases 30% of its shares at the market price. There are no taxes and markets "
      "are perfect.</p>"
      "<p>What is its forward P/E ratio after the transaction?</p>",
    alternativer=[
        R("12.8049", 30 / (1.64 / 0.7)),
        F("15.0000",
          "The P/E left unchanged. The price is unchanged, but EPS is not, so their ratio moves.", 15.0),
        F("10.5000",
          "The interest left out: EPS = 2.00/0.70. The loan costs 4% a year, which comes out of the earnings.",
          30 / (2 / 0.7)),
        F("18.2927",
          "The interest subtracted but the earnings not spread over fewer shares: 30/1.64. The buyback retired "
          "30% of the shares.", 30 / 1.64),
    ],
    kort="<p><b>12.8049.</b> P = 15 × 2.00 = 30. Per original share the firm borrows 0.30 × 30 = 9.00 and pays "
         "0.36 in interest. EPS = (2.00 − 0.36)/0.70 = 2.3429. P/E = 30/2.3429 = 12.8049.</p>",
    full="<p><b>What happens.</b> The buyback is at a fair price, so the share price does not move (MM I). EPS "
         "rises because fewer shares share the earnings, but the earnings are now after interest and riskier. "
         "The P/E ratio falls so that the higher, riskier EPS gives the same price (PS1 Exercise 1).</p>"
         "<p><b>Step 1: the price.</b> P = 15 × 2.00 = NOK 30.</p>"
         "<p><b>Step 2: the interest.</b> Work per original share. Buying back 30% costs 0.30 × 30 = 9.00, "
         "borrowed at 4%: interest 0.04 × 9.00 = 0.36.</p>"
         "<p><b>Step 3: the new EPS.</b> Earnings per original share 2.00 − 0.36 = 1.64, now spread over 0.70 "
         "shares: 1.64/0.70 = 2.3429.</p>"
         "<p><b>Step 4: P/E.</b> 30/2.3429 = <b>12.8049</b>, down from 15.</p>"
         "<p><b>First check.</b> MM II gives the same story: with D/V = 0.30, r<sub>E</sub> rises above "
         "r<sub>U</sub>, so investors capitalise each krone of earnings at a lower multiple. The P/E falls because "
         "of risk, not because of default.</p>"
         "<p><b>Remember:</b> EPS up, price unchanged, P/E down.</p>",
    tall=tallsvar(),
)

# mm-s13 · MM gjelder alle finansieringsvalg (forelesning 2 s. 16, forelesning 14 s. 8)
statisk(
    "mm-s13", tema="mm", type="begrep",
    hjelp=hjelp3(
        "This is about how far MM reaches: which decisions can change a firm's value in a perfect market and "
        "which only reslice it.",
        "Firm value = present value of the cash flows the assets produce. For each decision, ask whether it "
        "changes those cash flows or only who receives them and in what form.",
        "<p><b>Step 1: sort the choices.</b> Which ones change what the assets produce? Which ones only change who "
        "gets it or how it is packaged?</p>"
        "<p><b>Step 2: ask about fair prices.</b> A deal at a fair price is zero-NPV for both sides.</p>"
        "<p><b>Step 3: ask what investors can do themselves.</b> If they can copy it, they will not pay for it.</p>",
    ),
    q="<p>In a perfect capital market, which of these decisions changes the value of a firm?</p>",
    alternativer=[
        R("Taking on a project whose NPV is positive"),
        F("Swapping its long-term debt for short-term debt",
          "The maturity of the debt is a financing choice. In a perfect market it only changes how the same cash "
          "flows are split."),
        F("Hedging its currency risk with fairly priced forwards",
          "A fairly priced hedge has an NPV of zero. Investors could also hedge on their own, so risk management "
          "is irrelevant under MM."),
        F("Buying an unrelated firm at its market price to diversify",
          "Paying the market price is a zero-NPV deal. Shareholders can diversify on their own, so they pay "
          "nothing extra for it."),
    ],
    kort="<p><b>The positive-NPV project.</b> In a perfect market only investment decisions change value. Debt "
         "maturity, hedging and diversifying acquisitions are zero-NPV transactions (lecture 2, slide 16).</p>",
    full="<p><b>The general MM result.</b> Kurbatov lists the applications in lecture 2: capital structure, debt "
         "maturity, dividend policy, buybacks, risk management and diversifying acquisitions are all irrelevant "
         "in a perfect market. In the wrap-up (lecture 14) he puts it as «MM applies to all financing "
         "decisions». The reason is always the same: a trade at a fair price is zero-NPV. Investors can also copy "
         "it themselves.</p>"
         "<p><b>Step 1: the project.</b> A positive-NPV project adds cash flow worth more than it costs. That "
         "changes the size of the pie, so V rises.</p>"
         "<p><b>Step 2: debt maturity.</b> Long or short debt splits the same cash flow differently. No value is "
         "created.</p>"
         "<p><b>Step 3: hedging.</b> A fairly priced forward is worth zero at inception. Without distress costs "
         "or taxes, lowering risk adds nothing that investors could not do on their own.</p>"
         "<p><b>Step 4: diversification.</b> Buying a firm at its market price pays exactly what it is worth. "
         "Shareholders can diversify by buying both shares.</p>"
         "<p><b>Remember:</b> in a perfect market, investment creates value and financing only slices it. Look for "
         "a friction before you claim anything else matters.</p>",
)
