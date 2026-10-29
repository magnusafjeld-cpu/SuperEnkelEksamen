#!/usr/bin/env python3
"""Prøveeksamen 3 i FIE432: alle tall regnes her og skriptet bygger prove3.json.

Kjør:  python3 -I prove3_regn.py  [utfil]
Standard utfil er prove3.json i samme mappe som skriptet.
Fasitposisjonene leses fra fag/fie432/_prove/fasitplan.json (nøkkel p3).
"""
import json, math, os, re, sys

HER = os.path.dirname(os.path.abspath(__file__))
PROSJEKT = "/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/SuperEnkelEksamen"
PLAN = json.load(open(os.path.join(PROSJEKT, "fag/fie432/_prove/fasitplan.json")))["p3"]
UT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HER, "prove3.json")

# ------------------------------------------------------------------ hjelpere
MINUS = "−"


def tall(x, d=0):
    """Norsk talltekst: mellomrom som tusenskille, desimalkomma, ekte minus."""
    s = f"{abs(x):,.{d}f}".replace(",", " ").replace(".", ",")
    return (MINUS if round(x, d) < 0 else "") + s


def kr(x, d=0):
    return "kr " + tall(x, d)


def Kr(x, d=0):
    return "Kr " + tall(x, d)


def pst(f, d=1):
    return tall(f * 100, d) + " %"


def lik(a, b, tol=1e-6):
    assert abs(a - b) < tol, (a, b)


def af(r, n):
    """Annuitetsfaktor (nåverdi av 1 kr per termin i n terminer)."""
    return (1 - (1 + r) ** -n) / r


def annuitet(L, r, n):
    return L * r / (1 - (1 + r) ** -n)


def irr(pv, pmt, n):
    lo, hi = 1e-9, 1.0
    for _ in range(300):
        m = (lo + hi) / 2
        if pmt * af(m, n) > pv:
            lo = m
        else:
            hi = m
    return (lo + hi) / 2


LEDD = []  # (merke, options, answer, verdier eller None)


def ledd(merke, riktig, gale, verdier=None):
    """Plasser riktig alternativ der fasitplanen sier. gale = tre alternativer i rekkefølge."""
    i = len(LEDD)
    pos = PLAN[i]
    assert len(gale) == 3
    opts = list(gale)
    opts.insert(pos, riktig)
    assert len(set(opts)) == 4, opts
    vals = None
    if verdier is not None:
        rv, gv = verdier
        vals = list(gv)
        vals.insert(pos, rv)
        assert len(set(vals)) == 4, vals
    LEDD.append((merke, opts, pos, vals))
    return opts, pos


def losning(regel, steg, gale, kontroll, strategi=None, ekstra=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    s += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(f"{i}. {t}" for i, t in enumerate(steg, 1)) + "</p>" if isinstance(steg, list) else steg
    s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(gale) + "</p>"
    s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if ekstra:
        s += ekstra
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


def tabell(rader, hode, tallkol=True):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in hode) + "</tr>"
    b = ""
    for r in rader:
        b += "<tr>" + "".join(
            (f'<td class="n">{c}</td>' if (j > 0 and tallkol) else f"<td>{c}</td>") for j, c in enumerate(r)) + "</tr>"
    return f'<table class="data">{h}{b}</table>'


GT = "&gt;"
LT = "&lt;"
EX = []

# Satser (2026-regler)
tA = 0.22
f = 1.72
te = f * tA
lik(te, 0.3784)

# =========================================================== OPPGAVE 1
K = 1_200_000
pi1 = 300_000
rs1, rs2, rs3 = 0.035, 0.04, 0.03
D3 = 150_000
salg = 1_400_000

sel1 = pi1 * tA                      # 66 000
utb1 = pi1 - sel1                    # 234 000
skj1 = K * rs1                       # 42 000
sp1 = utb1 - skj1                    # 192 000
eier1 = sp1 * f * tA                 # 72 652,80
lik(sel1, 66000); lik(utb1, 234000); lik(skj1, 42000); lik(sp1, 192000); lik(eier1, 72652.8)
g1a_skj = utb1 * te                  # skjerming glemt
g1a_opp = sp1 * tA                   # oppjustering glemt
g1a_sel = (pi1 - skj1) * te          # selskapsskatt glemt
lik(g1a_skj, 88545.6); lik(g1a_opp, 42240); lik(g1a_sel, 97627.2)

samlet = (sel1 + eier1) / pi1        # 46,2176 %
g1b_uten = tA + (1 - tA) * te        # 51,52 %
g1b_opp = (sel1 + g1a_opp) / pi1     # 36,08 %
g1b_utb = eier1 / utb1               # 31,05 %
kontroll1b = tA + sp1 / pi1 * te
lik(samlet, kontroll1b)

skj2 = K * rs2                       # 48 000 ubenyttet
grunn3 = K + skj2                    # 1 248 000
skj3 = grunn3 * rs3                  # 37 440
fradrag3 = skj2 + skj3               # 85 440
sp3 = D3 - fradrag3                  # 64 560
lik(sp3, 64560)
g1c_kost = D3 - skj2 - K * rs3       # 66 000
g1c_glemt = D3 - K * rs3             # 114 000
g1c_grunn = D3 - skj3                # 112 560
lik(K * (1 + rs2) * (1 + rs3) - K, fradrag3)

gev = salg - K - skj2                # 152 000
skatt_gev = gev * f * tA             # 57 516,80
g1d_glemt = (salg - K) * te          # 75 680
g1d_salgsar = (gev - skj3) * te      # 43 349,50
g1d_opp = gev * tA                   # 33 440
lik(skatt_gev, 57516.8)

o1a, _ = ledd("1a", Kr(eier1), [Kr(g1a_skj), Kr(g1a_opp), Kr(g1a_sel)],
              (eier1, [g1a_skj, g1a_opp, g1a_sel]))
o1b, _ = ledd("1b", pst(samlet), [pst(g1b_utb), pst(g1b_uten), pst(g1b_opp)],
              (round(samlet, 3), [round(g1b_utb, 3), round(g1b_uten, 3), round(g1b_opp, 3)]))
o1c, _ = ledd("1c", Kr(sp3), [Kr(g1c_kost), Kr(g1c_glemt), Kr(g1c_grunn)],
              (sp3, [g1c_kost, g1c_glemt, g1c_grunn]))
o1d, _ = ledd("1d", Kr(skatt_gev), [Kr(g1d_glemt), Kr(g1d_opp), Kr(g1d_salgsar)],
              (skatt_gev, [g1d_glemt, g1d_opp, g1d_salgsar]))

EX.append({
    "n": 1, "title": "Ingrid og Bergamo AS: utbytte, skjerming, gevinst og samlet sats",
    "points": 12, "topic": "Aksjonærmodellen", "chapters": [5],
    "body": (f"<p>Ingrid kjøper alle aksjene i Bergamo AS ved utgangen av år 0 for {kr(K)}, som er kostprisen. "
             f"Hun eier aksjene ved utgangen av år 1 og år 2. Bergamo AS har et skattepliktig overskudd før skatt på {kr(pi1)} i år 1.</p>"
             f"<p>Anta at selskapsskatten er 22 %. Eierskatten beregnes ved at skattepliktig utbytte eller gevinst ganges med "
             f"oppjusteringsfaktoren 1,72 og deretter med 22 %. Skjermingsrenten er 3,5 % i år 1, 4 % i år 2 og 3 % i år 3. "
             f"Avrund til nærmeste krone.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>I år 1 deler Bergamo AS ut hele overskuddet etter selskapsskatt som utbytte til Ingrid. Hvor mye betaler hun i eierskatt på utbyttet i år 1?</p>",
         "options": o1a, "answer": PLAN[0],
         "solution": losning(
             "Eierskatt = (utbytte − skjermingsfradrag) × 1,72 × 22 %. Utbyttet er overskuddet <i>etter</i> selskapsskatt. Skjermingsfradraget er kostprisen ganget med skjermingsrenten. Skjermingen trekkes fra før oppjusteringen.".replace("−", MINUS),
             [f"Selskapsskatt = {tall(pi1)} × 22 % = {tall(sel1)}.",
              f"Utbytte = {tall(pi1)} {MINUS} {tall(sel1)} = {tall(utb1)}.",
              f"Skjermingsfradrag = {tall(K)} × 3,5 % = {tall(skj1)}.",
              f"Skattepliktig utbytte = {tall(utb1)} {MINUS} {tall(skj1)} = {tall(sp1)}.",
              f"Eierskatt = {tall(sp1)} × 1,72 × 22 % = {tall(sp1*f)} × 22 % = {tall(eier1,2)} ≈ <b>{kr(eier1)}</b>."],
             [f"<b>{Kr(g1a_skj)}</b> = {tall(utb1)} × 37,84 %: skjermingen er glemt.",
              f"<b>{Kr(g1a_opp)}</b> = {tall(sp1)} × 22 %: oppjusteringen er glemt. Et glemt oppjusteringssvar er alltid 22/37,84 = 58 % av det riktige ({tall(g1a_opp)}/{tall(eier1,2)} = {tall(g1a_opp/eier1,3)}).",
              f"<b>{Kr(g1a_sel)}</b> = ({tall(pi1)} {MINUS} {tall(skj1)}) × 37,84 %: eierskatten er regnet på overskuddet før selskapsskatt. Selskapsskatten må betales før noe kan deles ut."],
             f"Oppjuster satsen i stedet for grunnlaget: 1,72 × 22 % = 37,84 % og {tall(sp1)} × 37,84 % = {tall(sp1*te,2)}. Samme tall. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Hva er den samlede effektive skattesatsen på selskapets overskudd i år 1, når selskapsskatten og Ingrids eierskatt regnes sammen og måles mot overskuddet før skatt? Svar med én desimal.</p>",
         "options": o1b, "answer": PLAN[1],
         "solution": losning(
             "Samlet effektiv sats = (selskapsskatt + eierskatt)/overskudd før skatt. Nevneren er bruttooverskuddet, ikke utbyttet.",
             [f"Samlet skatt = {tall(sel1)} + {tall(eier1,2)} = {tall(sel1+eier1,2)}.",
              f"Overskuddet før skatt er {tall(pi1)}.",
              f"{tall(sel1+eier1,2)}/{tall(pi1)} = {tall(samlet*100,2)} % ≈ <b>{pst(samlet)}</b>."],
             [f"<b>{pst(g1b_uten)}</b> = 22 % + 78 % × 37,84 %: satsen uten skjerming. Det er 2026-tallet for en eier uten skjerming, men Ingrid har {tall(skj1)} i skjerming.",
              f"<b>{pst(g1b_opp)}</b> = ({tall(sel1)} + {tall(g1a_opp)})/{tall(pi1)}: oppjusteringen er glemt i eierskatten.",
              f"<b>{pst(g1b_utb)}</b> = {tall(eier1,2)}/{tall(utb1)}: eierskatten alene målt mot utbyttet. Det er effektiv skatt på utbyttet, ikke samlet sats for selskap og eier. Samme felle som spørsmål 4 og 5 i H2022."],
             f"Bygg satsen opp: 22 % + ({tall(sp1)}/{tall(pi1)}) × 37,84 % = 22 % + 64 % × 37,84 % = 22 % + {tall(0.64*te*100,2)} % = {tall(kontroll1b*100,2)} %. ✓ Skjermingen trekker satsen ned fra 51,52 % fordi bare 64 % av overskuddet blir skattepliktig utbytte."),
         },
        {"label": "c", "points": 3,
         "body": f"<p>Utbyttet i år 1 er som i a. I år 2 deler Bergamo AS ikke ut utbytte. I år 3 mottar Ingrid {kr(D3)} i utbytte og hun eier fortsatt aksjene ved utgangen av år 3. Hva er skattepliktig utbytte i år 3, før oppjustering?</p>",
         "options": o1c, "answer": PLAN[2],
         "solution": losning(
             "Ubenyttet skjerming framføres. Den legges til neste års skjermingsgrunnlag <i>og</i> trekkes i tillegg fra neste års utbytte. År 1 gir ingen rest, fordi utbyttet var større enn skjermingen.",
             [f"År 2: skjerming = {tall(K)} × 4 % = {tall(skj2)}. Ingen utbytte, så hele beløpet er ubenyttet og framføres.",
              f"År 3: grunnlag = {tall(K)} + {tall(skj2)} = {tall(grunn3)}.",
              f"Årets skjerming = {tall(grunn3)} × 3 % = {tall(skj3)}.",
              f"Samlet fradrag = {tall(skj2)} + {tall(skj3)} = {tall(fradrag3)}.",
              f"Skattepliktig utbytte = {tall(D3)} {MINUS} {tall(fradrag3)} = <b>{kr(sp3)}</b>."],
             [f"<b>{Kr(g1c_kost)}</b> = {tall(D3)} {MINUS} {tall(skj2)} {MINUS} {tall(K*rs3)}: årets skjerming er regnet på kostprisen ({tall(K)} × 3 %) i stedet for på grunnlaget med den framførte skjermingen. Den vanligste feilen i temaet.",
              f"<b>{Kr(g1c_glemt)}</b> = {tall(D3)} {MINUS} {tall(K*rs3)}: den framførte skjermingen er glemt helt.",
              f"<b>{Kr(g1c_grunn)}</b> = {tall(D3)} {MINUS} {tall(skj3)}: den framførte skjermingen er lagt til grunnlaget, men ikke trukket fra utbyttet."],
             f"I år uten utbytte vokser grunnlaget med skjermingsrenten: {tall(K)} × 1,04 × 1,03 = {tall(K*(1+rs2)*(1+rs3))}. Skjerming til disposisjon i år 3 er {tall(K*(1+rs2)*(1+rs3))} {MINUS} {tall(K)} = {tall(fradrag3)} og {tall(D3)} {MINUS} {tall(fradrag3)} = {tall(sp3)}. ✓"),
         },
        {"label": "d", "points": 3,
         "body": f"<p>Gå tilbake til utgangen av år 2. Anta i stedet at Bergamo AS ikke deler ut noe i år 3 og at Ingrid selger alle aksjene i juni år 3 for {kr(salg)}. Hvor mye skatt betaler hun på gevinsten?</p>",
         "options": o1d, "answer": PLAN[3],
         "solution": losning(
             f"Skattepliktig gevinst = salgssum {MINUS} inngangsverdi {MINUS} framført ubenyttet skjerming. Gevinsten oppjusteres med 1,72 og skattlegges med 22 %. Skjermingsfradraget går til den som eier aksjen ved utgangen av året, så den som selger i juni, får ingen skjerming for salgsåret.",
             [f"Framført ubenyttet skjerming fra år 2 er {tall(skj2)} (se c). År 1 ga ingen rest.",
              "Ingen skjerming for år 3: Ingrid eier ikke aksjene ved utgangen av året. Renten på 3 % for år 3 er en felle i dette leddet.",
              f"Gevinst = {tall(salg)} {MINUS} {tall(K)} {MINUS} {tall(skj2)} = {tall(gev)}.",
              f"Skatt = {tall(gev)} × 1,72 × 22 % = {tall(skatt_gev,2)} ≈ <b>{kr(skatt_gev)}</b>."],
             [f"<b>{Kr(g1d_glemt)}</b> = {tall(salg-K)} × 37,84 %: den ubenyttede skjermingen er ikke trukket fra gevinsten.",
              f"<b>{Kr(g1d_salgsar)}</b> = ({tall(gev)} {MINUS} {tall(skj3)}) × 37,84 %: skjerming også for salgsåret ({tall(grunn3)} × 3 %). Den får bare den som eier aksjen ved årsskiftet.",
              f"<b>{Kr(g1d_opp)}</b> = {tall(gev)} × 22 %: oppjusteringen er glemt."],
             f"Ingrid sitter igjen med {tall(gev)} {MINUS} {tall(skatt_gev,2)} = {tall(gev-skatt_gev,2)} av gevinsten, altså {tall((gev-skatt_gev)/gev*100,2)} %, som er nøyaktig 1 {MINUS} 37,84 %. ✓",
             strategi=f"Se etter 58 %-paret: {tall(g1d_opp)}/{tall(skatt_gev)} = {tall(g1d_opp/skatt_gev,2)}. Det lave tallet i paret har glemt oppjusteringen. Står du igjen med to alternativer, gir et svar fortsatt +1 poeng i forventning."),
         },
    ],
})

# =========================================================== OPPGAVE 2
tw, aL, tA2, tE2 = 0.48, 0.12, 0.24, 0.24
y = (tw + aL - tA2) / tE2
lik(y, 1.5)
eff_eier = y * tE2
y_aga = (tw - tA2) / tE2                         # avgiften glemt
y_gml = (tw + aL - tA2) / ((1 - tA2) * tE2)       # eldre effektiv form med avgift
y_bed = (tw - tA2 - aL) / tE2                     # avgiften plassert hos bedriften
samlet2 = tA2 + (1 - tA2) * eff_eier


def yopt(yv, ev):
    # eierskattesatsen vises uten desimaler, så faktor (to desimaler) × 24 % gir samme heltall
    assert round(round(yv, 2) * tE2 * 100) == round(ev * 100)
    return f"Oppjusteringsfaktor {tall(yv,2)} og eierskattesats {tall(ev*100,0)} %"


o2, _ = ledd("2", yopt(y, eff_eier), [yopt(y_gml, y_gml*tE2), yopt(y_bed, y_bed*tE2), yopt(y_aga, y_aga*tE2)],
             (y, [y_gml, y_bed, y_aga]))
EX.append({
    "n": 2, "title": "Inntektsskiftingslikningen med nye satser",
    "points": 3, "topic": "Aksjonærmodellen", "chapters": [5],
    "body": ("<p>Regjeringen vil at det ikke skal lønne seg å ta ut lønn som utbytte. "
             "Anta at høyeste marginalskatt på lønn er 48 %, at arbeidsgiveravgiften arbeidstakeren bærer utgjør 12 % (målt mot lønnskostnaden), at selskapsskatten er 24 % "
             "og at eierskatten beregnes ved at utbyttet ganges med en oppjusteringsfaktor og deretter med 24 %. "
             "Bruk inntektsskiftingslikningen slik den forelestes i 2026.</p><p>Hva blir oppjusteringsfaktoren og eierskattesatsen (faktoren ganget med 24 %)?</p>"),
    "options": o2, "answer": PLAN[4],
    "solution": losning(
        "Inntektsskiftingslikningen fra forelesning 5 i 2026 legger nominelle satser sammen: t<sub>w</sub> + a = t<sub>A</sub> + y × t. Her er t<sub>w</sub> høyeste marginalskatt på lønn, a avgiften arbeidstakeren bærer, t<sub>A</sub> selskapsskatten og t satsen eierskatten regnes med før oppjustering. Med dagens satser gir den 47,4 % + 12,4 % = 22 % + 22 % × y og y ≈ 1,72.",
        [f"Venstre side: 48 % + 12 % = 60 %.",
         f"Høyre side: 24 % + 24 % × y.",
         f"y = (60 % {MINUS} 24 %)/24 % = 36/24 = <b>{tall(y,2)}</b>.",
         f"Eierskattesats = 24 % × {tall(y,2)} = <b>{tall(eff_eier*100,0)} %</b>."],
        [f"<b>{tall(y_gml,2)} og {tall(y_gml*tE2*100,0)} %</b>: den eldre likningen fra H2017 og H2020 med effektive satser, der eierskatten bare treffer det som er igjen etter selskapsskatten: 48 % + 12 % = 24 % + 76 % × 24 % × y. Det gir y = 36/18,24 = {tall(y_gml,4)} og eierskattesats {tall(y_gml*tE2*100,2)} %. Den formen gjelder ikke i 2026.",
         f"<b>{tall(y_aga,2)} og {tall(y_aga*tE2*100,0)} %</b>: arbeidsgiveravgiften er glemt, 48 % = 24 % + 24 % × y.",
         f"<b>{tall(y_bed,2)} og {tall(y_bed*tE2*100,0)} %</b>: avgiften er flyttet til høyre side, 48 % = 24 % + 12 % + 24 % × y, som om bedriften bærer den. Teksten sier at arbeidstakeren bærer avgiften."],
        f"Sett tilbake: 24 % + {tall(eff_eier*100,0)} % = 60 % = 48 % + 12 %. ✓ Bare ett alternativ gir 60 % på høyre side.",
        ekstra=f"<p><b>Merk.</b> Summen av nominelle satser er ikke den effektive skatten. Den effektive skatten på utdelt overskudd blir 24 % + 76 % × {tall(eff_eier*100,0)} % = {tall(samlet2*100,2)} %.</p>"),
})

# =========================================================== OPPGAVE 3
villa = 160 * 100_000
leil = 50 * 90_000
fond = 2_500_000
bank = 1_000_000
G = 12_000_000
T14 = 14_000_000
fv_villa = 0.25 * min(villa, T14) + 0.70 * max(0, villa - T14)
fv_leil = leil
fv_fond = 0.8 * fond
fv_bank = bank
FV = fv_villa + fv_leil + fv_fond + fv_bank
lik(fv_villa, 4_900_000); lik(FV, 12_400_000)
g3a_ingen = 0.25 * villa + fv_leil + fv_fond + fv_bank           # 11 500 000
g3a_10 = 0.25 * 10_000_000 + 0.70 * (villa - 10_000_000) + fv_leil + fv_fond + fv_bank   # 14 200 000
g3a_70 = 0.70 * villa + fv_leil + fv_fond + fv_bank               # 18 700 000
MV = villa + leil + fond + bank
andel = {k: v / MV for k, v in dict(villa=villa, leil=leil, fond=fond, bank=bank).items()}
gj = {k: G * a for k, a in andel.items()}
frad = dict(gj); frad["fond"] = gj["fond"] * 0.8
FRAD = sum(frad.values())
netto = FV - FRAD
lik(FRAD, 11_750_000); lik(netto, 650_000)
lik(G * (1 - fond * 0.2 / MV), FRAD)
g3b_ingen = FV - G                                               # 400 000
fv_and_fond = fv_fond / FV
g3b_fv = FV - (G - G * fv_and_fond * 0.2)                         # 787 097
g3b_prim = FV - (gj["villa"] * 0.25 + gj["leil"] + frad["fond"] + gj["bank"])  # 6 650 000
nett_rad = [fv_villa - frad["villa"], fv_leil - frad["leil"], fv_fond - frad["fond"], fv_bank - frad["bank"]]
lik(sum(nett_rad), netto)

o3a, _ = ledd("3a", Kr(FV), [Kr(g3a_10), Kr(g3a_70), Kr(g3a_ingen)], (FV, [g3a_10, g3a_70, g3a_ingen]))
o3b, _ = ledd("3b", Kr(netto), [Kr(g3b_fv), Kr(g3b_prim), Kr(g3b_ingen)], (netto, [g3b_fv, g3b_prim, g3b_ingen]))

tab3 = tabell([
    ["Bruttoverdi", tall(villa), tall(leil), tall(fond), tall(bank), tall(MV)],
    ["Andel av bruttoformuen", tall(andel['villa']*100,2)+" %", tall(andel['leil']*100,2)+" %", tall(andel['fond']*100,2)+" %", tall(andel['bank']*100,2)+" %", "100 %"],
    ["Formuesverdi", tall(fv_villa), tall(fv_leil), tall(fv_fond), tall(fv_bank), tall(FV)],
    ["Andel av gjelden", tall(gj['villa']), tall(gj['leil']), tall(gj['fond']), tall(gj['bank']), tall(G)],
    ["Fradragsberettiget gjeld", tall(frad['villa']), tall(frad['leil']), tall(frad['fond']), tall(frad['bank']), tall(FRAD)],
    ["Netto", tall(nett_rad[0]), tall(nett_rad[1]), tall(nett_rad[2]), tall(nett_rad[3]), tall(netto)],
], ["Rad", "Villa", "Leilighet", "Aksjefond", "Bank", "Sum"])

EX.append({
    "n": 3, "title": "Hildes formue: kvadratmetersatser, verdsetting og gjeldsfordeling",
    "points": 6, "topic": "Formuesskatt", "chapters": [7],
    "body": (f"<p>Hilde eier en villa som er primærboligen hennes, en utleieleilighet som er sekundærbolig, andeler i et rent aksjefond og et bankinnskudd. "
             f"Villaen har 160 kvm og Skatteetatens boligmodell gir en kvadratmetersats på {kr(100000)} for den. Leiligheten har 50 kvm og en kvadratmetersats på {kr(90000)}. "
             f"Beregnet markedsverdi er areal ganget med kvadratmetersats. Aksjefondet er verdt {kr(fond)} og bankinnskuddet er {kr(bank)}. Hilde har {kr(G)} i gjeld.</p>"
             "<p>Bruk reglene for 2026: primærbolig verdsettes til 25 % av verdien opp til kr 14 mill. og til 70 % av verdien over, sekundærbolig til 100 %, aksjefond til 80 % og bankinnskudd til 100 %. "
             "Gjelden fordeles forholdsmessig etter markedsverdi og gjeldsreduksjonen skal brukes der loven gir den.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Hva er den samlede formuesverdien av Hildes eiendeler, før gjeld?</p>",
         "options": o3a, "answer": PLAN[5],
         "solution": losning(
             "Formuesverdi = markedsverdi × verdsettingsandel. Primærboligen har to sjikt: 25 % opp til 14 mill. og 70 % av resten. Sekundærbolig og bankinnskudd har ingen rabatt.",
             [f"Markedsverdier: villa 160 × 100 000 = {tall(villa)}, leilighet 50 × 90 000 = {tall(leil)}.",
              f"Villa: {tall(T14)} × 25 % + ({tall(villa)} {MINUS} {tall(T14)}) × 70 % = {tall(0.25*T14)} + {tall(0.7*(villa-T14))} = {tall(fv_villa)}.",
              f"Leilighet: {tall(leil)} × 100 % = {tall(fv_leil)}.",
              f"Aksjefond: {tall(fond)} × 80 % = {tall(fv_fond)}. Bank: {tall(fv_bank)}.",
              f"Sum = {tall(fv_villa)} + {tall(fv_leil)} + {tall(fv_fond)} + {tall(fv_bank)} = <b>{kr(FV)}</b>."],
             [f"<b>{Kr(g3a_ingen)}</b>: hele villaen verdsatt til 25 %. Slik var det før terskelen kom (H2016, H2019).",
              f"<b>{Kr(g3a_10)}</b>: terskelen på 10 mill. fra 2024 og 2025 brukt i stedet for 14 mill. i 2026.",
              f"<b>{Kr(g3a_70)}</b>: hele villaen verdsatt til 70 %. Sjiktet opp til 14 mill. verdsettes til 25 %, bare det som ligger over, til 70 %."],
             f"Regn rabattene i stedet. Bare villaen og fondet har rabatt: villa {tall(villa)} {MINUS} {tall(fv_villa)} = {tall(villa-fv_villa)}, fond {tall(fond*0.2)}. Markedsverdi {tall(MV)} {MINUS} {tall(villa-fv_villa+fond*0.2)} = {tall(FV)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Hva er Hildes nettoformue, før bunnfradrag?</p>",
         "options": o3b, "answer": PLAN[6],
         "solution": losning(
             "Gjelden fordeles etter markedsverdi (bruttoverdi). Gjeld som havner på et aktivum med rabatt som utløser gjeldsreduksjon, avkortes med samme rabatt. Det gjelder aksjer og aksjefond, ikke primærbolig. Sekundærbolig og bank har ingen rabatt og gir ingen avkorting. Negative kolonner motregnes.",
             "<p><b>Regnestykket.</b></p>" + tab3 +
             f"<p>1. Fordelingsnøkkelen er markedsverdiene: villa {tall(andel['villa']*100,2)} %, leilighet {tall(andel['leil']*100,2)} %, fond {tall(andel['fond']*100,2)} %, bank {tall(andel['bank']*100,2)} %.<br>"
             f"2. Gjeld til fondet: {tall(G)} × {tall(andel['fond']*100,2)} % = {tall(gj['fond'])}, avkortet med 20 % til {tall(frad['fond'])}.<br>"
             f"3. Fradragsberettiget gjeld = {tall(FRAD)}.<br>"
             f"4. Nettoformue = {tall(FV)} {MINUS} {tall(FRAD)} = <b>{kr(netto)}</b>.</p>",
             [f"<b>{Kr(g3b_ingen)}</b> = {tall(FV)} {MINUS} {tall(G)}: gjeldsreduksjonen er hoppet over.",
              f"<b>{Kr(g3b_fv)}</b>: gjelden fordelt etter formuesverdi i stedet for markedsverdi. Fondet får da {tall(fv_and_fond*100,2)} % av gjelden ({tall(G*fv_and_fond)}) og reduksjonen blir {tall(G*fv_and_fond*0.2)}.",
              f"<b>{Kr(g3b_prim)}</b>: gjelden på villaen er også avkortet med 75 %, til {tall(gj['villa']*0.25)}. Primærboliggjeld avkortes aldri."],
             f"Aggregatformelen: {tall(G)} × (1 {MINUS} {tall(fond)} × 20 %/{tall(MV)}) = {tall(G)} × {tall(1-fond*0.2/MV,6)} = {tall(FRAD)}. ✓ Kolonnene summerer også: {tall(nett_rad[0])} + {tall(nett_rad[1])} + {tall(nett_rad[2])} + {tall(nett_rad[3])} = {tall(netto)}. ✓",
             strategi=f"Reduksjonen kan bare komme fra fondet og kan ikke bli større enn 20 % × {tall(gj['fond'])} = {tall(gj['fond']*0.2)}. Nettoformuen må derfor ligge mellom {tall(g3b_ingen)} og {tall(netto)}. To alternativer faller utenfor og teksten sier at reduksjonen skal brukes."),
         },
    ],
})

# =========================================================== OPPGAVE 4
tau, r4 = 0.01, 0.025
andel4 = tau * (1 + r4) / r4                     # 41 %
g4_beg = tau / r4                                # 40 %
g4_delt = tau / (r4 * (1 + r4))                  # 39,02 %
g4_nevn = tau                                    # 1 %
lik(andel4, 0.41)
W4 = 1_000_000
lik(tau * W4 * (1 + r4) / (r4 * W4), andel4)
lik(andel4 * r4 / (1 + r4), tau)

FV4 = 30_000_000
F4 = FV4 * tau
D4 = F4 / (1 - te)
g4_opp = F4 * (1 + te)
g4_uopp = F4 / (1 - tA)
samlet26 = tA + (1 - tA) * te
g4_sam = F4 / (1 - samlet26)
lik(D4 * (1 - te), F4)

o4a, _ = ledd("4a", pst(andel4), [pst(g4_beg), pst(g4_nevn), pst(g4_delt)], (andel4, [g4_beg, g4_nevn, round(g4_delt, 4)]))
o4b, _ = ledd("4b", Kr(D4), [Kr(g4_uopp), Kr(F4), Kr(g4_opp)], (D4, [g4_uopp, F4, g4_opp]))

EX.append({
    "n": 4, "title": "Kjersti: formuesskatt som avkastningsskatt og utbytte til skatten",
    "points": 6, "topic": "Formuesskatt som avkastningsskatt", "chapters": [8],
    "body": "<p>Kjersti eier et familieselskap og aksjene er hele formuen hennes. Se bort fra verdsettingsrabatter, bunnfradrag og skjerming i hele oppgaven og bruk en flat formuesskattesats på 1 %.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Selskapet gir en avkastning på 2,5 % i året. Formuesskatten beregnes av formuen ved utgangen av året, altså etter at årets avkastning er lagt til. Hvor stor andel av årets avkastning tar formuesskatten? Svar med én desimal.</p>",
         "options": o4a, "answer": PLAN[7],
         "solution": losning(
             f"En formuesskatt er en skatt på avkastningen. Faller den på formuen ved årets slutt, gjelder τW(1 + r) = t·r·W, altså t = τ(1 + r)/r. Faller den på formuen ved årets begynnelse, er t = τ/r. Teksten avgjør hvilken.",
             [f"Formue ved årets slutt per krone investert: 1 + 2,5 % = 1,025.",
              f"Formuesskatt per krone: 1 % × 1,025 = 0,01025.",
              f"Avkastning per krone: 0,025.",
              f"Andel = 0,01025/0,025 = <b>{pst(andel4)}</b>."],
             [f"<b>{pst(g4_beg)}</b> = 1 %/2,5 %: skatten lagt på formuen ved årets begynnelse, slik H2025 oppgave 9 gjorde. Her sier teksten slutten av året.",
              f"<b>{pst(g4_delt)}</b> = 1 %/(2,5 % × 1,025): delt på (1 + r) i stedet for å gange. Formelen τ = t·r/(1 + r) fra H2021 er løst feil vei.",
              f"<b>{pst(g4_nevn)}</b>: formuesskatten delt på formuen i stedet for på avkastningen. Satsen er ikke andelen av avkastningen."],
             f"Med en formue på {kr(W4)}: avkastning {tall(W4*r4)}, formue ved årets slutt {tall(W4*(1+r4))}, formuesskatt {tall(W4*(1+r4)*tau)}. {tall(W4*(1+r4)*tau)}/{tall(W4*r4)} = {tall(andel4*100,1)} %. Baklengs: τ = 41 % × 2,5 %/1,025 = 1 %. ✓",
             strategi="De to tidspunktene gir 40,0 % og 41,0 %. Les setningen om når formuen måles før du regner og skriv den ned."),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Kjersti har ingen andre likvide midler, så formuesskatten må betales med utbytte fra selskapet. Formuesskatten for året er beregnet av en formuesverdi på {kr(FV4)}. Utbyttet skattlegges med oppjusteringsfaktor 1,72 og sats 22 %. Hvor stort utbytte må hun ta for å ha nøyaktig nok til formuesskatten etter at skatten på utbyttet er betalt?</p>",
         "options": o4b, "answer": PLAN[8],
         "solution": losning(
             "Utbyttet må brutto-regnes: D × (1 − t<sub>e</sub>) = formuesskatt, altså D = τW/(1 − t<sub>e</sub>), der t<sub>e</sub> = 1,72 × 22 % = 37,84 %.".replace("−", MINUS),
             [f"Formuesskatt = {tall(FV4)} × 1 % = {tall(F4)}.",
              f"Eierskatt t<sub>e</sub> = 1,72 × 22 % = 37,84 %.",
              f"D × (1 {MINUS} 0,3784) = {tall(F4)} ⇒ D = {tall(F4)}/0,6216 = {tall(D4,2)} ≈ <b>{kr(D4)}</b>."],
             [f"<b>{Kr(g4_opp)}</b> = {tall(F4)} × 1,3784: skatten lagt oppå i stedet for å brutto-regne. Etter skatt gir det bare {tall(g4_opp*(1-te))}.",
              f"<b>{Kr(g4_uopp)}</b> = {tall(F4)}/0,78: oppjusteringen er glemt.",
              f"<b>{Kr(F4)}</b>: bare formuesskatten selv. Utbyttet skattlegges, så et utbytte på {tall(F4)} gir bare {tall(F4*(1-te))} etter skatt."],
             f"Utbytteskatt = {tall(D4,2)} × 37,84 % = {tall(D4*te,2)} og {tall(D4,2)} {MINUS} {tall(D4*te,2)} = {tall(D4*(1-te),2)}. ✓ Belastningen er {tall(D4/FV4*100,2)} % av formuesverdien, ikke 1 %."),
         },
    ],
})

# =========================================================== OPPGAVE 5
a5, b5, c5, t5 = 20, 0.5, 6, 4
Q0 = (a5 - c5) / (2 * b5); P0 = a5 - b5 * Q0
Qt = (a5 - c5 - t5) / (2 * b5); Pt = a5 - b5 * Qt
lik(P0, 13); lik(Pt, 15); lik((a5 + c5 + t5) / 2, Pt)
g5a_full = P0 + t5
g5a_uendret = P0
g5a_fk = c5 + t5
o5a, _ = ledd("5a", Kr(Pt), [Kr(g5a_full), Kr(g5a_fk), Kr(g5a_uendret)], (Pt, [g5a_full, g5a_fk, g5a_uendret]))

P5, eD, eS, t5b = 40, -0.6, 1.4, 5
kons_andel = eS / (eS + abs(eD))
Pkons = P5 + kons_andel * t5b
pprod = Pkons - t5b
lik(kons_andel, 0.7); lik(pprod, 38.5)
g5b_kons = Pkons
g5b_bytt = P5 - kons_andel * t5b
g5b_alt = P5 - t5b
o5b, _ = ledd("5b", Kr(pprod, 2), [Kr(g5b_kons, 2), Kr(g5b_bytt, 2), Kr(g5b_alt, 2)], (pprod, [g5b_kons, g5b_bytt, g5b_alt]))

r5c = "Fordelingen blir den samme i (I) og (II). Den avgjøres av helningene på kurvene, ikke av hvem som betaler inn."
w5c = ["I (I) bærer produsentene hele avgiften og i (II) forbrukerne, fordi den som betaler avgiften inn til staten, også bærer den.",
       "Forbrukerne bærer hele avgiften i begge tilfeller, fordi produsentene alltid kan velte en avgift over i prisen.",
       "Byrden deles nøyaktig likt mellom forbrukere og produsenter i begge tilfeller, siden markedet har frikonkurranse."]
o5c, _ = ledd("5c", r5c, w5c)

EX.append({
    "n": 5, "title": "Stykkskatt: monopol, elastisiteter og hvem som betaler inn",
    "points": 9, "topic": "Skatteincidens", "chapters": [11],
    "body": "<p>Tre spørsmål om hvem som bærer en stykkskatt. Hvert spørsmål står for seg.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>En monopolist står overfor etterspørselen P = 20 − 0,5Q og har konstant grensekostnad 6. Myndighetene innfører en stykkskatt på kr 4 per enhet, betalt av monopolisten. Hva blir monopolprisen etter at skatten er innført?</p>".replace("−", MINUS),
         "options": o5a, "answer": PLAN[9],
         "solution": losning(
             "Monopolisten produserer der grenseinntekt er lik grensekostnad og stykkskatten legges til grensekostnaden: MR = MC + t. Med lineær etterspørsel P = a − bQ er MR = a − 2bQ. Prisen blir P = (a + c + t)/2. Prisen stiger med halve skatten.".replace("−", MINUS),
             [f"Grenseinntekt: MR = 20 {MINUS} Q.",
              f"Uten skatt: 20 {MINUS} Q = 6 ⇒ Q = {tall(Q0)} og P = 20 {MINUS} 0,5 × {tall(Q0)} = {tall(P0)}.",
              f"Med skatt: 20 {MINUS} Q = 6 + 4 = 10 ⇒ Q = {tall(Qt)} og P = 20 {MINUS} 0,5 × {tall(Qt)} = <b>{tall(Pt)}</b>.",
              f"Konsumentprisen stiger med {tall(Pt-P0)} og monopolisten sitter igjen med {tall(Pt)} {MINUS} 4 = {tall(Pt-t5)}, altså {tall(P0-(Pt-t5))} mindre enn før. Skatten deles på midten."],
             [f"<b>{Kr(g5a_full)}</b> = 13 + 4: hele skatten veltet over. Det er feilen administrerende direktør gjør i H2021 oppgave 2. Markedsmakten er allerede brukt før skatten kommer.",
              f"<b>{Kr(g5a_fk)}</b> = grensekostnad + skatt: prisen satt som under frikonkurranse, eller MR satt lik etterspørselskurven.",
              f"<b>{Kr(g5a_uendret)}</b>: prisen uendret, som om monopolisten bærer hele skatten."],
             f"Formelen P = (a + c + t)/2 = (20 + 6 + 4)/2 = {tall(Pt)}. ✓ Endringen 15 {MINUS} 13 = 2 er nøyaktig halve skatten, som den alltid er med lineær etterspørsel og konstant grensekostnad."),
         },
        {"label": "b", "points": 3,
         "body": "<p>I et marked med frikonkurranse er likevektsprisen kr 40. Etterspørselselastisiteten er −0,6 og tilbudselastisiteten 1,4, begge målt i likevekten. Anta at kurvene er lineære. Myndighetene innfører en stykkskatt på kr 5 per enhet, betalt av produsentene. Hvilken pris sitter produsentene igjen med per enhet etter skatt?</p>".replace("−", MINUS),
         "options": o5b, "answer": PLAN[10],
         "solution": losning(
             "Konsumentens andel av skatten er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) og produsentens |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|). Den minst elastiske siden bærer mest.",
             [f"Konsumentens andel = 1,4/(1,4 + 0,6) = {tall(kons_andel*100,0)} %.",
              f"Produsentens andel = 0,6/2,0 = {tall((1-kons_andel)*100,0)} %.",
              f"Konsumentprisen: P = 40 + 0,70 × 5 = {tall(Pkons,2)}.",
              f"Produsentprisen: p = P {MINUS} t = {tall(Pkons,2)} {MINUS} 5 = <b>{kr(pprod,2)}</b>."],
             [f"<b>{Kr(g5b_kons,2)}</b>: konsumentprisen P. Spørsmålet ber om produsentprisen p. Skriv ned hvilken pris det spørres om før du regner.",
              f"<b>{Kr(g5b_bytt,2)}</b> = 40 {MINUS} 0,70 × 5: andelene byttet om. Etterspørselen er minst elastisk og bærer mest, ikke tilbudet.",
              f"<b>{Kr(g5b_alt,2)}</b> = 40 {MINUS} 5: produsentene bærer hele skatten fordi de betaler den inn. Formell og reell insidens er ikke det samme."],
             f"Kilen går opp: {tall(Pkons,2)} {MINUS} {tall(pprod,2)} = 5,00 = t. ✓ Andelene summerer: 0,70 + 0,30 = 1. ✓ Produsentprisen faller med 1,50, mindre enn skatten, som den må."),
         },
        {"label": "c", "points": 3,
         "body": "<p>Regjeringen innfører en avgift på kr 2 per liter på en vare og vurderer to måter å kreve den inn på: (I) produsentene betaler avgiften inn til staten, eller (II) forbrukerne betaler den inn ved kassen. Markedet har frikonkurranse, stigende tilbudskurve og fallende etterspørselskurve. Hvilket utsagn er riktig?</p>",
         "options": o5c, "answer": PLAN[11],
         "solution": ("<p><b>Regelen.</b> Likevekten med avgiften er D(p + t) = S(p) uansett hvem som fyller ut skjemaet. Konsumentprisen P og produsentprisen p blir de samme i (I) og (II). Fordelingen avgjøres av helningene: ∂P/∂t = S′/(S′ " + MINUS + " D′) og ∂p/∂t = D′/(S′ " + MINUS + " D′). Hvem som krever inn skatten, betyr ingenting for hvem som reelt sett betaler den.</p>"
                      "<p><b>Hvorfor de andre er gale.</b></p><p>"
                      "<b>(I) produsentene, (II) forbrukerne</b>: formell insidens forvekslet med reell. Det er den vanligste feilslutningen i temaet, kjent fra påstanden «selskapsskatten betales av selskapene».<br>"
                      "<b>Forbrukerne bærer alt</b>: gjelder bare i grensetilfellene med perfekt uelastisk etterspørsel eller perfekt elastisk tilbud. Med to skrå kurver deles byrden.<br>"
                      "<b>Delt nøyaktig likt</b>: lik deling krever like helninger i tallverdi. Frikonkurranse sier ingenting om det.</p>"
                      "<p><b>Kontroll.</b> Sett tall: D′ = " + MINUS + "2 og S′ = 3. Da er ∂P/∂t = 3/5 = 0,6 og ∂p/∂t = " + MINUS + "2/5 = " + MINUS + "0,4 i begge innkrevingsformene. Forbrukerne bærer 60 % og produsentene 40 %. Kontrollen 0,6 " + MINUS + " (" + MINUS + "0,4) = 1 går opp. ✓</p>"),
         },
    ],
})

# =========================================================== OPPGAVE 6
L6, r6, tl = 2_000_000, 0.045, 0.474
rente6 = L6 * r6
gev6 = rente6 * (tA - 0)
kost6 = rente6 * (1 - tA)
lik(gev6, 19800); lik(rente6 - kost6, gev6)
g6_lonn = rente6 * tl
lik_r6 = r6 * (1 - tA)
o6, _ = ledd("6", Kr(gev6), [Kr(g6_lonn), Kr(rente6), Kr(kost6)], (gev6, [g6_lonn, rente6, kost6]))
EX.append({
    "n": 6, "title": "Tore låner med fradrag og plasserer skattefritt",
    "points": 3, "topic": "Skattearbitrasje", "chapters": [9, 12],
    "body": (f"<p>Tore låner {kr(L6)} til 4,5 % rente. Rentene er fradragsberettiget i alminnelig inntekt med 22 %. Tores høyeste marginalskatt på lønn er 47,4 %. "
             "Han plasserer hele lånebeløpet i et verdipapir med samme risiko som lånet. Papiret gir 4,5 % i året og avkastningen er skattefri.</p>"
             "<p>Hvor stor er Tores årlige gevinst etter skatt av denne posisjonen, så lenge papiret gir 4,5 %?</p>"),
    "options": o6, "answer": PLAN[12],
    "solution": losning(
        f"Skattearbitrasje: du låner der rentene gir fradrag og plasserer der avkastningen ikke beskattes. Årlig gevinst = r × L × (t<sub>fradrag</sub> {MINUS} t<sub>avkastning</sub>). Posisjonen krever ingen egenkapital og har ingen risiko.",
        [f"Skattefri renteinntekt: {tall(L6)} × 4,5 % = {tall(rente6)}.",
         f"Rentekostnad {tall(rente6)}, fradrag {tall(rente6)} × 22 % = {tall(rente6*tA)}, kostnad etter skatt {tall(kost6)}.",
         f"Gevinst = {tall(rente6)} {MINUS} {tall(kost6)} = <b>{kr(gev6)}</b>."],
        [f"<b>{Kr(g6_lonn)}</b> = {tall(rente6)} × 47,4 %: marginalskatten på lønn brukt som verdien av rentefradraget. I Norge er et rentefradrag verdt 22 øre per krone uansett hvor høy lønnsskatten er.",
         f"<b>{Kr(rente6)}</b>: renteinntekten alene, som om lånet var gratis.",
         f"<b>{Kr(kost6)}</b>: rentekostnaden etter skatt, et mellomresultat."],
        f"Formelen: {tall(rente6)} × (22 % {MINUS} 0 %) = {tall(gev6)}. ✓",
        ekstra=f"<p><b>Hvorfor arbitrasjen ikke varer.</b> I et velfungerende marked vil alle ha papiret, prisen bys opp og avkastningen faller til 4,5 % × 0,78 = {tall(lik_r6*100,2)} %. Da gir posisjonen {tall(L6*lik_r6)} mot en kostnad på {tall(kost6)}, altså null. Fallet fra 4,5 % til {tall(lik_r6*100,2)} % er den implisitte skatten på 22 %. Symmetrisk beskatning, der rente og fradrag ligger i samme grunnlag med samme sats, stenger også arbitrasjen.</p>"),
})

# =========================================================== OPPGAVE 7
o7a, _ = ledd("7a", "2030", ["2027", "2029", "2026"], (2030, [2027, 2029, 2026]))
mv7, iv7 = 480_000, 300_000
gev7 = mv7 - iv7
skatt7 = gev7 * f * tA
g7_terskel = (gev7 - 100_000) * te
g7_mv = mv7 * te
lik(skatt7, 68112)
o7b, _ = ledd("7b", Kr(skatt7), [Kr(g7_terskel), Kr(g7_mv), Kr(0)], (skatt7, [g7_terskel, g7_mv, 0]))
EX.append({
    "n": 7, "title": "Sigrid flytter til Spania",
    "points": 6, "topic": "Exit-skatt", "chapters": [13, 6],
    "body": ("<p>Sigrid er født og oppvokst i Norge og har bodd her hele livet. I februar 2026 flytter hun til Spania og melder flytting til Folkeregisteret. "
             "Fra og med 2027 oppholder hun seg aldri mer enn 30 dager i året i Norge. Verken hun eller noen nærstående disponerer bolig her. Bruk reglene som gjelder i 2026.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Fra og med hvilket inntektsår er Sigrid ikke lenger skattemessig bosatt i Norge etter norsk intern rett?</p>",
         "options": o7a, "answer": PLAN[13],
         "solution": ("<p><b>Regelen.</b> Skatteloven § 2-1 tredje ledd: har du vært bosatt i Norge i minst ti år før utflyttingsåret, opphører bostedet først etter tre hele inntektsår etter utflyttingsåret. I hvert av de tre årene må du ha vært i Norge høyst 61 dager og verken du eller nærstående kan ha disponert bolig her.</p>"
                      "<p><b>Regnestykket.</b></p>" + tabell([["2026", "Utflyttingsåret, teller ikke", "Bosatt"], ["2027", "Første år etter", "Bosatt"], ["2028", "Andre år etter", "Bosatt"], ["2029", "Tredje år etter", "Bosatt"], ["<b>2030</b>", "Bostedet har opphørt", "<b>Utflyttet</b>"]], ["År", "Rolle", "Status"], tallkol=False) +
                      "<p>Svaret er <b>2030</b>.</p>"
                      "<p><b>Hvorfor de andre er gale.</b></p><p>"
                      "<b>2026</b>: flyttemeldingen avgjør ingenting. Den er en opplysningsplikt, ikke en skattemessig handling.<br>"
                      "<b>2027</b>: regelen for dem som har bodd i Norge kortere enn ti år, der bostedet opphører det første året vilkårene er oppfylt.<br>"
                      "<b>2029</b>: utflyttingsåret er talt med som ett av de tre årene, eller svaret er det siste året hun fortsatt er bosatt.</p>"
                      "<p><b>Kontroll.</b> Samme mønster som H2022 oppgave 4 og kursgodkjenningen 2026: flytting i 2022 gir utflyttet fra 2026. Flytteåret pluss fire.</p>"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Sigrids far Odd bor i Norge. I 2026 gir han Sigrid, som nå bor i Spania, aksjer med markedsverdi {kr(mv7)} og inngangsverdi {kr(iv7)}. Etter skatteavtalen mellom Norge og Spania anses Sigrid som bosatt i Spania fra 2026. Odd gir ingen andre gaver det året. Eierskatten er 22 % ganget med oppjusteringsfaktoren 1,72. Se bort fra skjerming. Hvor mye exit-skatt utløser gaven for Odd?</p>",
         "options": o7b, "answer": PLAN[14],
         "solution": losning(
             "Gave av aksjer til en person som ikke har skatteplikt etter § 2-1, eller som etter skatteavtale er bosatt i en annen stat, utløser exit-skatt for giveren når netto gevinst på det som gis bort, overstiger kr 100 000 i året (skatteloven § 10-70). Grensen er en terskel, ikke et fradrag: går gevinsten over, skattlegges hele gevinsten. Bunnfradraget på 3 mill. kr gjelder bare når skattyteren selv flytter.",
             [f"Mottakeren: Sigrid er fortsatt bosatt i Norge etter intern rett (se a), men etter skatteavtalen er hun bosatt i Spania. Vilkåret for mottakeren er derfor oppfylt.",
              f"Gevinst = {tall(mv7)} {MINUS} {tall(iv7)} = {tall(gev7)}.",
              f"{tall(gev7)} er over terskelen på 100 000, så hele gevinsten skattlegges.",
              f"Skatt = {tall(gev7)} × 1,72 × 22 % = <b>{kr(skatt7)}</b>."],
             [f"<b>{Kr(g7_terskel)}</b> = ({tall(gev7)} {MINUS} 100 000) × 37,84 %: terskelen brukt som fradrag.",
              f"<b>{Kr(0)}</b>: bunnfradraget på 3 mill. kr brukt, eller Sigrid behandlet som norsk fordi hun er bosatt her etter intern rett til og med 2029. Bunnfradraget gjelder bare når Odd selv flytter. Etter skatteavtalen er Sigrid bosatt i Spania.",
              f"<b>{Kr(g7_mv)}</b> = {tall(mv7)} × 37,84 %: markedsverdien brukt som grunnlag i stedet for gevinsten."],
             f"{tall(gev7)} × 37,84 % = {tall(gev7*te)}. ✓ Hadde mottakeren også etter skatteavtalen vært bosatt i Norge, ville gaven ikke utløst exit-skatt: etter kontinuitetsprinsippet overtar hun farens inngangsverdi og skatten kommer først når hun selger."),
         },
    ],
})

# =========================================================== OPPGAVE 8
ov8, eff8, min8 = 250_000_000, 0.03, 0.15
top8 = max(0, min8 - eff8) * ov8
g8_hele = min8 * ov8
g8_lok = eff8 * ov8
g8_norskhele = 0.22 * ov8
g8_norsk = (0.22 - eff8) * ov8
lik(top8, 30_000_000)
o8, _ = ledd("8", Kr(top8), [Kr(g8_hele), Kr(g8_norskhele), Kr(g8_norsk)], (top8, [g8_hele, g8_norskhele, g8_norsk]))
EX.append({
    "n": 8, "title": "Global minimumsskatt på et datterselskap i et lavskatteland",
    "points": 3, "topic": "Skatteparadis", "chapters": [13],
    "body": (f"<p>Et konsern med morselskap i Norge, der selskapsskatten er 22 %, har et datterselskap i en jurisdiksjon der den effektive skattesatsen på datterselskapets overskudd er 3 %. "
             f"Datterselskapets overskudd er {kr(ov8)}. Konsernet er omfattet av den globale minimumsskatten på 15 % (OECDs andre pilar). Se bort fra substansunntaket.</p>"
             "<p>Hvor mye toppskatt må konsernet betale for dette datterselskapet?</p>"),
    "options": o8, "answer": PLAN[15],
    "solution": losning(
        f"Toppskatt = maks(0; 15 % {MINUS} effektiv sats) × overskudd. Minimumsskatten løfter gulvet til 15 %. Den henter bare inn differansen mellom 15 % og det som alt er betalt.",
        [f"Differansen: 15 % {MINUS} 3 % = 12 %.",
         f"Toppskatt = 12 % × {tall(ov8)} = <b>{kr(top8)}</b>."],
        [f"<b>{Kr(g8_hele)}</b> = 15 % av hele overskuddet: skatten som alt er betalt lokalt ({tall(g8_lok)}), er ikke trukket fra.",
         f"<b>{Kr(g8_norskhele)}</b> = 22 % × {tall(ov8)}: norsk selskapsskatt på hele overskuddet, som om datterselskapet var norsk. Minimumsskatten er et gulv på 15 %, ikke en innhenting til norsk nivå.",
         f"<b>{Kr(g8_norsk)}</b> = (22 % {MINUS} 3 %) × {tall(ov8)}: norsk selskapsskatt brukt som gulv. Minimumssatsen er 15 %."],
        f"Lokal skatt {tall(g8_lok)} + toppskatt {tall(top8)} = {tall(g8_lok+top8)}, som er nøyaktig 15 % av {tall(ov8)}. ✓",
        ekstra="<p><b>Merk.</b> Gevinsten ved å flytte overskudd er proporsjonal med satsforskjellen. Minimumsskatten krymper forskjellen, men rører ikke hemmeligholdet, som Schjelderup mener er selve produktet i en sekretessestat.</p>"),
})

# =========================================================== OPPGAVE 9
x0, t9 = 700_000, 0.30
x9 = x0 / (1 - t9)
lik(x9, 1_000_000)
g9_gang = x0 * (1 - t9)
g9_var = x0 * (1 + t9)
o9, _ = ledd("9", Kr(x9), [Kr(x0), Kr(g9_var), Kr(g9_gang)], (x9, [x0, g9_var, g9_gang]))
EX.append({
    "n": 9, "title": "Lene og skatt med fullt tapsfradrag",
    "points": 3, "topic": "Skatt og risiko", "chapters": [12],
    "body": (f"<p>Lene har en finansformue på {kr(2_000_000)}. Hun fordeler den mellom et risikabelt aksjefond og et sikkert aktivum med null avkastning. "
             f"Uten skatt plasserer hun {kr(x0)} i aksjefondet. Så innføres en proporsjonal skatt på 30 % på avkastningen, med fullt fradrag for tap.</p>"
             "<p>Bruk porteføljemodellen i pensum (Mossin og Stiglitz, som Sandmo bygger på). Hvor mye vil Lene plassere i aksjefondet etter at skatten er innført?</p>"),
    "options": o9, "answer": PLAN[16],
    "solution": losning(
        "Domar og Musgrave viste at staten med proporsjonal skatt og fullt tapsfradrag blir en stille partner: hvert utfall, gevinst som tap, krymper med (1 − t). I porteføljemodellen til Mossin og Stiglitz, som Sandmo bygger på, gjenoppretter investoren hele sannsynlighetsfordelingen for sluttformuen ved å skalere opp: x* = x<sub>0</sub>/(1 − t). Svaret avhenger ikke av nyttefunksjonen.".replace("−", MINUS),
        [f"x* = {tall(x0)}/(1 {MINUS} 0,30) = {tall(x0)}/0,70 = <b>{kr(x9)}</b>."],
        [f"<b>{Kr(x0)}</b>: hun står stille. Da krymper både forventning og risiko med 30 %. Fordelingen er da ikke lenger den hun valgte.",
         f"<b>{Kr(g9_gang)}</b> = {tall(x0)} × 0,70: ganget med (1 {MINUS} t) i stedet for å dele. Folkemeningen om at skatt demper risikotaking.",
         f"<b>{Kr(g9_var)}</b> = {tall(x0)} × 1,30: ganget med (1 + t). Det ser ut som en oppskalering, men etter skatt blir utfallene 0,70 × 1,30 = 91 % av de opprinnelige. Riktig faktor er 1/(1 {MINUS} t) = 1,4286."],
        f"Anta at fondet gir +20 % eller {MINUS}10 %. Før skatt: +{tall(x0*0.2)} eller {MINUS}{tall(x0*0.1)}. Etter skatt med {tall(x9)}: 0,70 × {tall(x9*0.2)} = {tall(0.7*x9*0.2)} og 0,70 × ({MINUS}{tall(x9*0.1)}) = {MINUS}{tall(0.7*x9*0.1)}. Samme utfall. ✓",
        ekstra="<p><b>Betingelsene.</b> Resultatet krever proporsjonal skatt, fullt tapsfradrag og null avkastning på det sikre aktivumet (eller at bare meravkastningen skattlegges). Uten tapsfradrag snur konklusjonen: staten tar del i oppsiden, men ikke i nedsiden. Da faller risikotakingen.</p>"),
})

# =========================================================== OPPGAVE 10
utb10 = 1_000_000
skatt10a = utb10 * 0.03 * tA
lik(skatt10a, 6600)
o10a, _ = ledd("10a", Kr(skatt10a), [Kr(utb10 * tA), Kr(0), Kr(utb10 * 0.03)], (skatt10a, [utb10 * tA, 0, utb10 * 0.03]))
v10, iv10 = 8_000_000, 3_000_000
gev10 = v10 - iv10
diff10 = gev10 * te
g10_opp = gev10 * tA
g10_salg = v10 * te
lik(diff10, 1_892_000)
o10b, _ = ledd("10b", Kr(diff10), [Kr(0), Kr(g10_opp), Kr(g10_salg)], (diff10, [0, g10_opp, g10_salg]))
EX.append({
    "n": 10, "title": "Fritaksmetoden: treprosentregelen og holdingselskapet",
    "points": 6, "topic": "Fritaksmetoden", "chapters": [6],
    "body": "<p>Selskapsskatten er 22 % og eierskatten for personlige aksjonærer er 22 % ganget med oppjusteringsfaktoren 1,72. Se bort fra skjerming.</p>",
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>Holding AS eier 70 % av aksjene og stemmene i Drift AS. Drift AS deler ut {kr(utb10)} i utbytte til Holding AS. Hvor mye skatt betaler Holding AS på utbyttet?</p>",
         "options": o10a, "answer": PLAN[17],
         "solution": losning(
             "Fritaksmetoden (skatteloven § 2-38) gjør utbytte mellom selskaper skattefritt, men 3 % av mottatt utbytte inntektsføres likevel som alminnelig inntekt. Unntaket er når mottakeren eier mer enn 90 % av aksjene og stemmene. Regelen gjelder bare utbytte, ikke gevinst.",
             [f"Eierandelen er 70 %, under 90 %, så treprosentregelen gjelder.",
              f"Inntektsført: {tall(utb10)} × 3 % = {tall(utb10*0.03)}.",
              f"Skatt: {tall(utb10*0.03)} × 22 % = <b>{kr(skatt10a)}</b>."],
             [f"<b>{Kr(0)}</b>: konsernunntaket over 90 % brukt, eller fritaket lest som fullt.",
              f"<b>{Kr(utb10*0.03)}</b>: «3 %» lest som skattesats. Det er grunnlaget som er 3 %.",
              f"<b>{Kr(utb10*tA)}</b>: utbyttet skattlagt som vanlig inntekt i holdingselskapet. Uten fritaksmetoden ville samme krone blitt skattlagt i hvert ledd av kjeden."],
             f"Effektiv sats på konsernutbytte er 3 % × 22 % = 0,66 % og {tall(utb10)} × 0,66 % = {tall(utb10*0.0066)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Kari eier aksjer i et børsnotert selskap. Aksjene er verdt {kr(v10)} og har inngangsverdi {kr(iv10)}. Hun vil selge dem og kjøpe aksjer i et annet selskap for hele beløpet hun har igjen etter skatt. Hvor mye mer kan hun reinvestere nå dersom aksjene eies gjennom hennes heleide holdingselskap, enn dersom hun eier dem personlig?</p>",
         "options": o10b, "answer": PLAN[18],
         "solution": losning(
             "Gevinst på aksjer eid av et aksjeselskap er skattefri etter fritaksmetoden. Treprosentregelen gjelder ikke gevinster. Eier Kari personlig, skattlegges gevinsten med 37,84 %. Holdingselskapet utsetter skatten til pengene tas ut. Det fjerner den ikke.",
             [f"Gevinst = {tall(v10)} {MINUS} {tall(iv10)} = {tall(gev10)}.",
              f"Personlig: skatt {tall(gev10)} × 37,84 % = {tall(diff10)} og hun reinvesterer {tall(v10-diff10)}.",
              f"Holding: ingen skatt ved salget og holdingselskapet reinvesterer {tall(v10)}.",
              f"Forskjell = {tall(v10)} {MINUS} {tall(v10-diff10)} = <b>{kr(diff10)}</b>."],
             [f"<b>{Kr(0)}</b>: «holding er bare en utsettelse» lest som «ingen forskjell». Skatten kommer når pengene tas ut, men i mellomtiden arbeider hele beløpet.",
              f"<b>{Kr(g10_opp)}</b> = {tall(gev10)} × 22 %: oppjusteringen er glemt.",
              f"<b>{Kr(g10_salg)}</b> = {tall(v10)} × 37,84 %: skatten regnet av hele salgssummen i stedet for gevinsten."],
             f"Forskjellen er nøyaktig den personlige skatten på gevinsten: {tall(gev10)} × 1,72 × 22 % = {tall(gev10*f*tA)}. ✓",
             ekstra="<p><b>Merk.</b> Tas pengene senere ut av holdingselskapet til Kari, betaler hun 37,84 % som ved direkte eie. Fordelen er avkastningen på den utsatte skatten, et rentefritt lån fra staten. Det er det Bjerksund og Schjelderup kaller et to-hodet troll.</p>"),
         },
    ],
})

# =========================================================== OPPGAVE 11
W0, T11, rb = 800_000, 12, 0.03
Gd, Bd, p11 = 2_000_000, 470_000, 0.45
lam = 1 / 1.04
bank11 = W0 * (1 + rb) ** T11
lb, lg, ll = math.log(bank11), math.log(Gd), math.log(Bd)
EU = p11 * lg + (1 - p11) * ll
EW = p11 * Gd + (1 - p11) * Bd
lEW = math.log(EW)
assert EW > bank11 and EU < lb < lEW
pstar = (lb - ll) / (lg - ll)
p_rn = (bank11 - Bd) / (Gd - Bd)
bank_enkel = W0 * (1 + rb * T11)
p_enkel = (math.log(bank_enkel) - ll) / (lg - ll)
EUla = p11 * lg + (1 - p11) * lam * ll
EUla_god = p11 * lam * lg + (1 - p11) * ll
bank_la = lam * lb
assert Bd < W0 < bank11 < Gd
assert bank_la < EUla  # feilen snur valget
kontroll_p = pstar * lg + (1 - pstar) * ll
lik(kontroll_p, lb)


def n3(x):
    return tall(x, 3)


r11a = f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EU)} ⇒ velger banken"
w11a = [f"Nytte aksjefond {n3(lEW)} {GT} nytte bank {n3(lb)} ⇒ velger aksjefondet",
        f"Forventet sluttverdi aksjefond {tall(EW)} {GT} bank {tall(bank11)} ⇒ velger aksjefondet",
        f"Nytte bank {n3(EU)} {LT} nytte aksjefond {n3(lb)} ⇒ velger aksjefondet"]
o11a, _ = ledd("11a", r11a, w11a)
o11b, _ = ledd("11b", pst(pstar), [pst(p_rn), pst(p_enkel), pst(1 - pstar)],
               (round(pstar, 3), [round(p_rn, 3), round(p_enkel, 3), round(1 - pstar, 3)]))
r11c = f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EUla)} ⇒ velger banken"
w11c = [f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EU)} ⇒ velger banken",
        f"Nytte bank {n3(bank_la)} {LT} nytte aksjefond {n3(EU)} ⇒ velger aksjefondet",
        f"Nytte bank {n3(lb)} {GT} nytte aksjefond {n3(EUla_god)} ⇒ velger banken"]
o11c, _ = ledd("11c", r11c, w11c)

EX.append({
    "n": 11, "title": "Even velger mellom bank og aksjefond",
    "points": 9, "topic": "Sparing", "chapters": [18, 17],
    "body": (f"<p>Even har {kr(W0)} og sparer i 12 år. Han må velge ett av to alternativer. Banken gir 3 % rente i året med rentes rente, sikkert. "
             f"Et aksjefond gir enten {kr(Gd)} om 12 år (gode tider) eller {kr(Bd)} (dårlige tider). Den objektive sannsynligheten for gode tider er 45 %.</p>"
             "<p>Even har nyttefunksjonen U(W) = ln(W), der W er sluttverdien. Han velger alternativet med høyest forventet nytte. Se bort fra skatt. Nyttetallene er oppgitt med tre desimaler.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Hvilket alternativ velger Even med de objektive sannsynlighetene?</p>",
         "options": o11a, "answer": PLAN[19],
         "solution": losning(
             "Et sikkert alternativ gir nytten ln(W) direkte. Et usikkert alternativ gir forventet nytte Σ p<sub>i</sub> ln(W<sub>i</sub>): ta logaritmen av hvert utfall først og vei dem etterpå.",
             [f"Bank: {tall(W0)} × 1,03<sup>12</sup> = {tall(bank11)} og ln({tall(bank11)}) = {tall(lb,4)}.",
              f"Aksjefond: ln({tall(Gd)}) = {tall(lg,4)} og ln({tall(Bd)}) = {tall(ll,4)}.",
              f"E[U] = 0,45 × {tall(lg,4)} + 0,55 × {tall(ll,4)} = {tall(0.45*lg,4)} + {tall(0.55*ll,4)} = {tall(EU,4)}.",
              f"{n3(lb)} {GT} {n3(EU)}, så Even velger <b>banken</b>."],
             [f"<b>Aksjefond {n3(lEW)}</b>: ln av forventet sluttverdi, ln({tall(EW)}). Logaritmen er tatt etter forventningen. For en konkav nyttefunksjon er E[ln W] {LT} ln E[W] og forskjellen er prisen på risikoen.",
              f"<b>Forventet sluttverdi {tall(EW)}</b>: sammenligner forventet formue, som en risikonøytral investor. Fondet har høyere forventet sluttverdi, men lavere forventet nytte.",
              f"<b>Bank {n3(EU)} {LT} aksjefond {n3(lb)}</b>: de to riktige tallene på feil plass. Les hvilket tall som står ved hvilket alternativ."],
             f"Sikkerhetsekvivalenten til fondet er e<sup>{tall(EU,4)}</sup> = {tall(math.exp(EU))} kroner, langt under bankens {tall(bank11)}. Med ln-nytte er den det geometriske snittet {tall(Gd)}<sup>0,45</sup> × {tall(Bd)}<sup>0,55</sup> = {tall(Gd**0.45*Bd**0.55)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Even er usikker på sannsynligheten for gode tider. Hvor høy må hans subjektive sannsynlighet for gode tider minst være for at han skal velge aksjefondet? Svar med én desimal.</p>",
         "options": o11b, "answer": PLAN[20],
         "solution": losning(
             "Subjektive sannsynligheter endrer vektene i forventet nytte, aldri sluttverdiene. Even er likegyldig når p × ln(G) + (1 − p) × ln(B) = ln(bank), altså p* = (ln bank − ln B)/(ln G − ln B).".replace("−", MINUS),
             [f"ln(bank) = {tall(lb,4)}, ln(G) = {tall(lg,4)}, ln(B) = {tall(ll,4)}.",
              f"Teller: {tall(lb,4)} {MINUS} {tall(ll,4)} = {tall(lb-ll,4)}.",
              f"Nevner: {tall(lg,4)} {MINUS} {tall(ll,4)} = {tall(lg-ll,4)}.",
              f"p* = {tall(lb-ll,4)}/{tall(lg-ll,4)} = {tall(pstar,4)} ≈ <b>{pst(pstar)}</b>."],
             [f"<b>{pst(p_rn)}</b> = ({tall(bank11)} {MINUS} {tall(Bd)})/({tall(Gd)} {MINUS} {tall(Bd)}): grensen for en risikonøytral investor som sammenligner forventet sluttverdi. Med ln-nytte kreves en høyere sannsynlighet.",
              f"<b>{pst(p_enkel)}</b>: banken regnet med enkel rente, {tall(W0)} × (1 + 0,03 × 12) = {tall(bank_enkel)}, i stedet for rentes rente.",
              f"<b>{pst(1-pstar)}</b> = 1 {MINUS} p*: sannsynligheten for dårlige tider i grensetilfellet, ikke for gode tider."],
             f"Sett p* tilbake: {tall(pstar,4)} × {tall(lg,4)} + {tall(1-pstar,4)} × {tall(ll,4)} = {tall(kontroll_p,4)}, som er ln(bank). ✓",
             strategi=f"Med 45 % velger Even banken (a), så grensen må ligge over 45 %. To alternativer kan strykes uten regning. Et svar mellom de to som er igjen, gir +1 poeng i forventning."),
         },
        {"label": "c", "points": 3,
         "body": "<p>Anta nå at Even er tapsavers. Han ganger nytten av utfall som ligger under referansepunktet med 1/1,04 = 0,961538. Referansepunktet er det han setter inn, kr 800 000. Han bruker de objektive sannsynlighetene. Hva blir resultatet?</p>",
         "options": o11c, "answer": PLAN[21],
         "solution": losning(
             "Tapsaversjon vekter bare utfall under referansepunktet. Avgjør derfor først hvilke utfall som er tap.",
             [f"Bank: {tall(bank11)} {GT} 800 000, gevinst, ingen vekt. Nytten er fortsatt {n3(lb)}.",
              f"Aksjefond, gode tider: {tall(Gd)} {GT} 800 000, ingen vekt.",
              f"Aksjefond, dårlige tider: {tall(Bd)} {LT} 800 000, tap. Nytten blir 0,961538 × {tall(ll,4)} = {tall(lam*ll,4)}.",
              f"E[U] = 0,45 × {tall(lg,4)} + 0,55 × {tall(lam*ll,4)} = {tall(0.45*lg,4)} + {tall(0.55*lam*ll,4)} = {tall(EUla,4)}.",
              f"{n3(lb)} {GT} {n3(EUla)}, så Even velger <b>banken</b>, nå med større margin."],
             [f"<b>Aksjefond {n3(EU)}</b>: tapsaversjonen er ikke brukt. Det er svaret på a.",
              f"<b>Bank {n3(bank_la)} mot aksjefond {n3(EU)}</b>: vekten er lagt på banken i stedet for på det dårlige utfallet i fondet ({tall(lb,4)} × 0,961538 = {tall(bank_la,4)}). Banken gir gevinst og skal ikke vektes. Feilen snur valget.",
              f"<b>Aksjefond {n3(EUla_god)}</b>: vekten er lagt på det gode utfallet i stedet for det dårlige."],
             f"Straffen er 0,55 × {tall(ll,4)} × (1 {MINUS} 0,961538) = {tall(0.55*ll*(1-lam),4)} og {tall(EU,4)} {MINUS} {tall(0.55*ll*(1-lam),4)} = {tall(EU-0.55*ll*(1-lam),4)}. ✓",
             strategi="Tre av alternativene sier «banken». Konklusjonen skiller ikke, så les hvilke to tall som sammenlignes."),
         },
    ],
})

# =========================================================== OPPGAVE 12
L12, r12, n12, etab, tgeb = 350_000, 0.069, 6, 4_500, 600
A12 = annuitet(L12, r12, n12)
AF12 = af(r12, n12)
lik(A12 * AF12, L12)
serie1 = L12 / n12 + L12 * r12
avdrag = L12 / n12
irr_full = irr(L12 - etab, A12 + tgeb, n12)
irr_etab = irr(L12 - etab, A12, n12)
naiv = r12 + (etab + n12 * tgeb) / L12
lik(irr_full, 0.07587, 1e-5)
o12a, _ = ledd("12a", Kr(A12), [Kr(A12 + tgeb), Kr(serie1), Kr(avdrag)], (A12, [A12 + tgeb, serie1, avdrag]))
o12b, _ = ledd("12b", pst(irr_full, 2), [pst(irr_etab, 2), pst(r12, 2), pst(naiv, 2)],
               (round(irr_full, 4), [round(irr_etab, 4), r12, round(naiv, 4)]))
# nedbetalingsplan for kontroll
rest = L12
plan_rader = []
renter_sum = 0
for t in range(1, n12 + 1):
    renter = rest * r12
    avd = A12 - renter
    rest -= avd
    renter_sum += renter
    plan_rader.append([str(t), tall(A12), tall(renter), tall(avd), tall(abs(rest) if abs(rest) < 0.5 else rest)])
assert abs(rest) < 1e-6
AF_irr = af(irr_full, n12)

EX.append({
    "n": 12, "title": "Lars og billånet: annuitet og effektiv rente",
    "points": 6, "topic": "Lån", "chapters": [16],
    "body": (f"<p>Lars kjøper bil og tar opp et annuitetslån på {kr(L12)}. Nominell rente er 6,9 % per år, løpetiden er 6 år og lånet betales med én termin i året, etterskuddsvis. "
             f"Banken tar et etableringsgebyr på {kr(etab)} som trekkes fra når lånet utbetales. I tillegg kommer et termingebyr på {kr(tgeb)} som betales sammen med hver termin. Se bort fra skatt.</p>"
             "<p>Annuiteten er A = L · r/(1 " + MINUS + " (1 + r)<sup>" + MINUS + "T</sup>), der r er renten og T antall år.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": "<p>Hva er det årlige terminbeløpet, altså renter og avdrag uten gebyrer?</p>",
         "options": o12a, "answer": PLAN[22],
         "solution": losning(
             "A = L · r/(1 − (1 + r)<sup>−T</sup>) med årlige terminer: r er årsrenten og T antall år.".replace("−", MINUS),
             [f"1,069<sup>{MINUS}6</sup> = {tall(1.069**-6,6)}, så nevneren er 1 {MINUS} {tall(1.069**-6,6)} = {tall(1-1.069**-6,6)}.",
              f"Telleren: {tall(L12)} × 0,069 = {tall(L12*r12)}.",
              f"A = {tall(L12*r12)}/{tall(1-1.069**-6,6)} = {tall(A12,2)} ≈ <b>{kr(A12)}</b>."],
             [f"<b>{Kr(A12+tgeb)}</b>: termingebyret er lagt til. Spørsmålet ber om terminbeløpet uten gebyrer.",
              f"<b>{Kr(serie1)}</b> = {tall(L12)}/6 + {tall(L12)} × 6,9 %: første termin på et serielån, eller rente på hele lånet i alle år.",
              f"<b>{Kr(avdrag)}</b> = {tall(L12)}/6: bare avdrag, rentene er glemt. Det er en nedre grense: alt under kan strykes."],
             f"Nedbetalingsplanen må treffe null i siste termin:</p>" + tabell(plan_rader, ["År", "Termin", "Renter", "Avdrag", "Restgjeld"]) + f"<p>Rentesummen er {tall(renter_sum)} = 6 × {tall(A12,2)} {MINUS} {tall(L12)}. ✓"),
         },
        {"label": "b", "points": 3,
         "body": "<p>Hva er den effektive renten på lånet når begge gebyrene tas med? Svar med to desimaler.</p>",
         "options": o12b, "answer": PLAN[23],
         "solution": losning(
             "Effektiv rente er internrenten i den faktiske kontantstrømmen. Etableringsgebyret trekkes fra beløpet Lars får utbetalt i år 0 og termingebyret legges til hver innbetaling.",
             [f"Utbetalt i år 0: {tall(L12)} {MINUS} {tall(etab)} = {tall(L12-etab)}.",
              f"Innbetaling år 1 til 6: {tall(A12)} + {tall(tgeb)} = {tall(A12+tgeb)}.",
              f"Finn r slik at {tall(L12-etab)} = {tall(A12+tgeb)} × (1 {MINUS} (1 + r)<sup>{MINUS}6</sup>)/r.",
              f"Det gir r = {tall(irr_full*100,3)} % ≈ <b>{pst(irr_full,2)}</b>."],
             [f"<b>{pst(r12,2)}</b>: den nominelle renten. Gebyrene er glemt.",
              f"<b>{pst(irr_etab,2)}</b>: bare etableringsgebyret er tatt med, termingebyret er glemt.",
              f"<b>{pst(naiv,2)}</b> = 6,9 % + ({tall(etab)} + 6 × {tall(tgeb)})/{tall(L12)}: gebyrene i prosent av lånet lagt rett på renten. Gebyrer er kroner på bestemte tidspunkter, ikke prosentpoeng per år."],
             f"Sett 7,59 % inn baklengs: annuitetsfaktoren for 6 år er {tall(af(0.0759,6),4)}. Da er {tall(L12-etab)}/{tall(af(0.0759,6),4)} = {tall((L12-etab)/af(0.0759,6))}. Det er den årlige innbetalingen på {tall(A12+tgeb)}, med et avvik på {tall(abs((L12-etab)/af(0.0759,6)-(A12+tgeb)))} kroner fra avrundingen av renten. ✓",
             strategi="Effektiv rente med gebyrer må ligge over 6,90 %. Sett hvert alternativ inn i annuitetsformelen baklengs i stedet for å iterere."),
         },
    ],
})

# =========================================================== OPPGAVE 13
aar_lav, aar_hoy, G_lav, G_hoy, dt13 = 12, 30, 6, 9, 18.5
beh = 0.181 * (aar_lav * G_lav + aar_hoy * min(G_hoy, 7.1))
pens = beh / dt13
komp = pens / G_hoy
g13_tak = 0.181 * (aar_lav * G_lav + aar_hoy * G_hoy) / dt13 / G_hoy
g13_alle = 0.181 * 7.1 * (aar_lav + aar_hoy) / (dt13 * G_hoy)
g13_snar = 0.181 * (aar_lav + aar_hoy) / dt13
G26 = 136_549
lik((beh * G26 / dt13) / (G_hoy * G26), komp)
o13, _ = ledd("13", pst(komp), [pst(g13_alle), pst(g13_snar), pst(g13_tak)],
              (round(komp, 3), [round(g13_alle, 3), round(g13_snar, 3), round(g13_tak, 3)]))
EX.append({
    "n": 13, "title": "Tones alderspensjon: opptjening med tak",
    "points": 3, "topic": "Pensjon", "chapters": [15],
    "body": ("<p>Tone er født i 1990 og følger folketrygdens nye opptjeningsmodell: hvert år legges 18,1 % av pensjonsgivende inntekt opp til 7,1 G til pensjonsbeholdningen og beholdningen reguleres med lønnsveksten. "
             "Tone jobber i 42 år. De første 12 årene tjener hun 6 G i året, de siste 30 årene 9 G i året. Lønnen følger G, så du kan regne alt i G. Når hun slutter, tar hun ut pensjon med delingstall 18,5.</p>"
             "<p>Hvor stor blir alderspensjonen fra folketrygden i prosent av sluttlønnen? Svar med én desimal.</p>"),
    "options": o13, "answer": PLAN[24],
    "solution": losning(
        "Opptjening = 18,1 % × min(inntekt; 7,1 G). Årlig pensjon = beholdning/delingstall og kompensasjonsgraden er pensjonen delt på sluttlønnen. Når lønnen følger G, kan alt regnes i G.",
        [f"De 12 første årene: 0,181 × 6 G × 12 = {tall(0.181*6*12,3)} G (under taket).",
         f"De 30 siste årene: lønnen er 9 G, men taket binder: 0,181 × 7,1 G × 30 = {tall(0.181*7.1*30,3)} G.",
         f"Beholdning = {tall(beh,3)} G. Pensjon = {tall(beh,3)}/18,5 = {tall(pens,4)} G.",
         f"Kompensasjonsgrad = {tall(pens,4)}/9 = {tall(komp*100,2)} % ≈ <b>{pst(komp)}</b>."],
        [f"<b>{pst(g13_tak)}</b>: taket på 7,1 G er glemt for de siste 30 årene.",
         f"<b>{pst(g13_alle)}</b> = 0,181 × 7,1 × 42/(18,5 × 9): taket på 7,1 G er brukt på alle 42 år, også de 12 årene med 6 G. De årene gir bare 0,181 × 6 G i opptjening.",
         f"<b>{pst(g13_snar)}</b> = 0,181 × 42/18,5: snarveien brukt selv om lønnen ligger over taket og har endret seg. Snarveien gjelder bare under taket med lik lønn i G hele tiden."],
        f"Regn i kroner med G for 2026, {kr(G26)}: beholdning {tall(beh,3)} × {tall(G26)} = {tall(beh*G26)}, pensjon {tall(beh*G26/dt13)} i året, sluttlønn 9 × {tall(G26)} = {tall(9*G26)}. {tall(beh*G26/dt13)}/{tall(9*G26)} = {tall(komp*100,2)} %. ✓ G faller ut, som den skal."),
})

# =========================================================== OPPGAVE 14
prem, sig, gam = 0.05, 0.25, 2
w = prem / (gam * sig ** 2)
lik(w, 0.4)
F1, H1 = 1_500_000, 1_500_000
alf1 = w * (F1 + H1) / F1
F2, H2 = 4_500_000, 500_000
alf2 = w * (F2 + H2) / F2
lik(alf1, 0.8)
w_sig = prem / (gam * sig)
g14a_sig = w_sig * (F1 + H1) / F1
g14a_beta = max(0, (w * (F1 + H1) - H1) / F1)
o14a, _ = ledd("14a", pst(alf1, 0), [pst(w, 0), pst(g14a_sig, 0), pst(g14a_beta, 0)], (alf1, [w, round(g14a_sig, 6), g14a_beta]))
o14b, _ = ledd("14b", pst(alf2), [pst(alf1), pst(1 - alf2), pst(w)], (round(alf2, 4), [alf1, round(1 - alf2, 4), w]))
EX.append({
    "n": 14, "title": "Jonas, Merton og humankapitalen over livet",
    "points": 6, "topic": "Porteføljevalg", "chapters": [14],
    "body": ("<p>Jonas bruker Mertons formel w = (E(R) " + MINUS + " R<sub>f</sub>)/(γσ<sup>2</sup>) for å bestemme aksjeandelen av totalformuen. Aksjepremien er 5 %, volatiliteten (standardavviket) til aksjefondet er 25 % og γ = 2. "
             "Humankapitalen hans er risikofri og han låner ikke for å kjøpe aksjer. Markedssyn og risikoaversjon er de samme gjennom hele oppgaven.</p>"),
    "parts": [
        {"label": "a", "points": 3,
         "body": f"<p>I dag har Jonas {kr(F1)} i finansformue og en humankapital på {kr(H1)}. Hvor stor andel av finansformuen skal han ha i aksjer?</p>",
         "options": o14a, "answer": PLAN[25],
         "solution": losning(
             "w gjelder totalformuen, humankapitalen medregnet. Er humankapitalen risikofri, virker den som et bankinnskudd. Da må hele aksjebeløpet plasseres i finansformuen: α = w(F + H)/F.",
             [f"w = 0,05/(2 × 0,25²) = 0,05/0,125 = {pst(w,0)}.",
              f"Totalformue = {tall(F1)} + {tall(H1)} = {tall(F1+H1)}.",
              f"Aksjer = 40 % × {tall(F1+H1)} = {tall(w*(F1+H1))}.",
              f"α = {tall(w*(F1+H1))}/{tall(F1)} = <b>{pst(alf1,0)}</b>."],
             [f"<b>{pst(w,0)}</b>: w brukt på finansformuen alene. Humankapitalen er glemt.",
              f"<b>{pst(g14a_sig,0)}</b>: standardavviket brukt i stedet for variansen. Da blir w = 0,05/(2 × 0,25) = 10 % og α = 10 % × 2 = 20 %.",
              f"<b>{pst(g14a_beta,0)}</b>: humankapitalen behandlet som aksjer (β = 1). Teksten sier at den er risikofri."],
             f"α = w × (1 + H/F) = 0,40 × (1 + 1) = 0,80. ✓ Totalbalansen: 1 200 000 i aksjer av 3 000 000 er 40 % = w. ✓"),
         },
        {"label": "b", "points": 3,
         "body": f"<p>Tjue år senere er humankapitalen redusert til {kr(H2)}, mens finansformuen har vokst til {kr(F2)}. Hvor stor andel av finansformuen skal Jonas nå ha i aksjer? Svar med én desimal.</p>",
         "options": o14b, "answer": PLAN[26],
         "solution": losning(
             "Samme regel: aksjebeløpet er w × (F + H) og α = w(F + H)/F. Når humankapitalen omdannes til finansformue, faller α.",
             [f"Totalformue = {tall(F2)} + {tall(H2)} = {tall(F2+H2)}.",
              f"Aksjer = 40 % × {tall(F2+H2)} = {tall(w*(F2+H2))}.",
              f"α = {tall(w*(F2+H2))}/{tall(F2)} = <b>{pst(alf2)}</b>."],
             [f"<b>{pst(alf1)}</b>: andelen fra a. H/F-forholdet er ikke oppdatert.",
              f"<b>{pst(w)}</b>: w, andelen av totalformuen, ikke av finansformuen.",
              f"<b>{pst(1-alf2)}</b>: bankandelen 1 {MINUS} α, svaret på det motsatte spørsmålet."],
             f"α = 0,40 × (1 + {tall(H2)}/{tall(F2)}) = 0,40 × {tall(1+H2/F2,4)} = {tall(alf2,4)}. ✓ Livsløpsmønsteret: α faller fra 80 % til 44,4 % uten at markedssynet er endret. Grunnen er humankapitalen, ikke at aksjer blir mer risikable med alderen."),
         },
    ],
})

# =========================================================== OPPGAVE 15
r15 = "Moralsk hasard. En egenandel gjør at kunden bærer en del av tapet selv og får grunn til å låse sykkelen."
w15 = ["Ugunstig utvalg. Forsikringen bør gjøres obligatorisk, slik at også de forsiktigste kundene blir med i ordningen.",
       "Manglende risikospredning. Tyverier rammer mange kunder på én gang, så selskapet bør kjøpe reforsikring.",
       "Moralsk hasard. Selskapet bør heve premien for alle kunder til den dekker den høyere forventede erstatningen."]
o15, _ = ledd("15", r15, w15)
EX.append({
    "n": 15, "title": "Sykkelforsikring uten egenandel",
    "points": 3, "topic": "Forsikring og forventet nytte", "chapters": [17],
    "body": ("<p>Et forsikringsselskap selger sykkelforsikring med full dekning og ingen egenandel. Selskapet ser at kundene, etter at de har kjøpt forsikringen, oftere lar syklene stå ulåst. "
             "Selskapet kan ikke observere hvordan den enkelte kunden oppfører seg.</p><p>Hvilket fenomen er dette og hvilket tiltak retter seg mest direkte mot det?</p>"),
    "options": o15, "answer": PLAN[27],
    "solution": ("<p><b>Regelen.</b> Moralsk hasard er atferd <i>etter</i> avtalen: den som er fullt forsikret, passer dårligere på. Selskapet kan ikke observere det. Svaret er egenandelen, som gir kunden en andel av tapet og dermed en grunn til å være forsiktig. "
                 "Ugunstig utvalg handler om <i>hvem</i> som kjøper, før avtalen. Manglende risikospredning handler om risiko som rammer alle samtidig.</p>"
                 "<p><b>Hvorfor de andre er gale.</b></p><p>"
                 "<b>Ugunstig utvalg og obligatorisk forsikring</b>: feil fenomen. Kundene er de samme, det er atferden deres som endres etter kjøpet. Obligatorisk medlemskap er svaret på ugunstig utvalg, som i folketrygden.<br>"
                 "<b>Manglende risikospredning og reforsikring</b>: sykkeltyverier er i hovedsak uavhengige av hverandre og lar seg spre. Standardeksempelet på manglende spredning er arbeidsledighet.<br>"
                 "<b>Moralsk hasard og høyere premie for alle</b>: riktig fenomen, men tiltaket endrer ikke insentivene. Kunden har fortsatt ingen grunn til å låse sykkelen. De forsiktige kundene betaler for de uforsiktige.</p>"
                 "<p><b>Kontroll.</b> Spør «før eller etter avtalen?». Etter avtalen og skjult atferd betyr moralsk hasard. Da er egenandel tiltaket (H2019 oppgave 7b, kursgodkjenningen 2026 spørsmål 15).</p>"),
})

# =========================================================== OPPGAVE 16
gj16, r16, n16 = 40_000, 0.22, 8
faktisk = gj16 * (1 + r16) ** n16
lineaer = gj16 + n16 * gj16 * r16
feil_gang = gj16 * (1 + r16) * n16
lik(lineaer, 110_400)
r16o = f"{Kr(faktisk)}. Eksponentiell vekst-bias: hun regner som om rentene ikke forrentes."
w16 = [f"{Kr(feil_gang)}. Forankring: hun låser seg til det første tallet hun ble presentert for.",
       f"{Kr(faktisk)}. Forankring: hun låser seg til det første tallet hun ble presentert for.",
       f"{Kr(feil_gang)}. Eksponentiell vekst-bias: hun burde ganget rentefaktoren med antall år."]
o16, _ = ledd("16", r16o, w16)
EX.append({
    "n": 16, "title": "Mona og kredittkortgjelden",
    "points": 3, "topic": "Finansiell psykologi", "chapters": [18],
    "body": (f"<p>Mona har {kr(gj16)} i kredittkortgjeld til 22 % effektiv rente i året. Hun betaler ingenting og rentene legges til gjelden hvert år. "
             f"Hun regner i hodet: «22 % av 40 000 er 8 800 i året, så om åtte år skylder jeg 40 000 + 8 × 8 800 = 110 400.»</p>"
             "<p>Hva skylder hun faktisk etter åtte år og hva kalles feilen hennes i finansiell psykologi?</p>"),
    "options": o16, "answer": PLAN[28],
    "solution": losning(
        "Gjeld uten nedbetaling vokser med rentes rente: L<sub>T</sub> = L × (1 + r)<sup>T</sup>. Eksponentiell vekst-bias er tendensen til å framskrive slik vekst lineært. Den gjør at både gjeld og sparing undervurderes grovt.",
        [f"1,22<sup>8</sup> = {tall((1+r16)**n16,5)}.",
         f"Gjeld = {tall(gj16)} × {tall((1+r16)**n16,5)} = <b>{kr(faktisk)}</b>.",
         f"Monas lineære anslag er {tall(lineaer)}. Den faktiske gjelden er {tall(faktisk/lineaer,2)} ganger så stor."],
        [f"<b>{Kr(feil_gang)}, forankring</b>: feil tall og feil navn. Tallet er {tall(gj16)} × 1,22 × 8. Monas feil er heller ikke forankring.",
         f"<b>{Kr(faktisk)}, forankring</b>: riktig tall, feil navn. Forankring er at det første tallet du ser, styrer vurderingen, som en kjøpskurs eller prisantydning. Monas feil er at hun tenker lineært om vekst.",
         f"<b>{Kr(feil_gang)}</b> = {tall(gj16)} × 1,22 × 8: rentefaktoren ganget med antall år i stedet for opphøyd. Riktig navn, feil regning."],
        f"Tenk i doblinger: ved 22 % tar det {tall(math.log(2)/math.log(1+r16),2)} år å doble gjelden. På åtte år rekker den {tall(n16/(math.log(2)/math.log(1+r16)),2)} doblinger. 2<sup>{tall(n16/(math.log(2)/math.log(1+r16)),2)}</sup> = {tall(2**(n16/(math.log(2)/math.log(1+r16))),3)}, som er rentefaktoren. ✓"),
})

# =========================================================== OPPGAVE 17
Y17, andel17, SL17, r17 = 720_000, 0.62, 250_000, 0.045
disp = Y17 * (1 - andel17)
rs17 = max(r17 + 0.03, 0.07)
AF17 = af(rs17, 30)
stress = disp * AF17
gjeld17 = 5 * Y17 - SL17
maks17 = min(stress, gjeld17)
g17_gml = disp * af(r17 + 0.05, 30)
g17_25 = disp * af(rs17, 25)
lik(disp, 273_600)
assert stress < gjeld17
lik(annuitet(stress, rs17, 30), disp)
o17, _ = ledd("17", Kr(maks17), [Kr(gjeld17), Kr(g17_gml), Kr(g17_25)], (maks17, [gjeld17, g17_gml, g17_25]))
EX.append({
    "n": 17, "title": "Nina og lånetaket i utlånsforskriften",
    "points": 3, "topic": "Lån", "chapters": [16, 4],
    "body": (f"<p>Nina har en brutto årsinntekt på {kr(Y17)}. Skatt, forbruk og betjening av studielånet tar 62 % av bruttoinntekten. Resten kan brukes til å betjene et nytt boliglån. "
             f"Studielånet er på {kr(SL17)}. Dagens boliglånsrente er 4,5 %.</p>"
             "<p>Bruk utlånsforskriften slik den gjelder i 2026. Samlet gjeld kan ikke overstige fem ganger brutto årsinntekt. Nina må dessuten tåle en renteøkning på 3 prosentpoeng, men minst til 7 %, på et annuitetslån med 30 års nedbetalingstid og årlige terminer. "
             "Se bort fra egenkapitalkravet, avdragskravet og rentefradraget.</p><p>Hva er det største boliglånet Nina kan få?</p>"),
    "options": o17, "answer": PLAN[29],
    "solution": losning(
        "Regn hver skranke for seg. Den laveste binder.",
        [f"Betjeningsevne: {tall(Y17)} × (1 {MINUS} 62 %) = {tall(disp)} i året.",
         f"Gjeldsgrad: 5 × {tall(Y17)} {MINUS} {tall(SL17)} = {tall(gjeld17)}. Studielånet teller med i samlet gjeld.",
         f"Stresstest: 4,5 % + 3 = 7,5 %, som er over minstekravet på 7 %. Annuitetsfaktoren for 30 år ved 7,5 % er {tall(AF17,4)} og {tall(disp)} × {tall(AF17,4)} = {tall(stress)}.",
         f"Den laveste skranken binder: <b>{kr(maks17)}</b>."],
        [f"<b>{Kr(gjeld17)}</b>: gjeldsgradskravet, som ikke binder her. Det strengeste kravet gjelder.",
         f"<b>{Kr(g17_gml)}</b>: det gamle påslaget på 5 prosentpoeng (9,5 %) fra H2020 og H2021. I 2026 er påslaget 3 prosentpoeng.",
         f"<b>{Kr(g17_25)}</b>: 25 års nedbetalingstid i stedet for 30."],
        f"Snu stresstesten: et lån på {tall(stress)} over 30 år til 7,5 % krever {tall(annuitet(stress, rs17, 30))} i året, nøyaktig betjeningsevnen. ✓ Et lån på {tall(gjeld17)} ville krevd {tall(annuitet(gjeld17, rs17, 30))}, mer enn hun har."),
})

# ===================================================== sett-nivå og kontroller
sett = {
    "id": "prove3",
    "kind": "mock",
    "label": "Prøveeksamen 3",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, " + MINUS + "1 for feil",
    "note": ("Ligner H2022 og de åpne settene fra H2016 til H2021 gjort om til flervalg. Den åpner med en oppgave i fire ledd som H2022 oppgave 1: utbytte, samlet sats, skjerming over tre år og gevinst ved salg. "
             "Skattedelen har formuesskatt med kvadratmetersatser og gjeldsfordeling, formuesskatt som avkastningsskatt, monopol og elastisiteter i insidensoppgaven, exit-skatt etter 2026-reglene og fritaksmetoden. "
             "Finansdelen har ln-nytte med tapsaversjon, annuitetslån med gebyrer, folketrygd med tak, Merton over livsløpet og utlånsforskriften. Alle tall er nye og alle satser er 2026-regler."),
    "facts": [
        "30 flervalgsledd i 17 oppgaver. Fire alternativer per ledd og nøyaktig ett riktig.",
        "3 poeng for rett, " + MINUS + "1 for feil og 0 for ubesvart. Maks 90 poeng.",
        "Skattedelen har 19 ledd (57 poeng) og finansdelen 11 ledd (33 poeng).",
        "2026-regler: oppjusteringsfaktor 1,72 og eierskatt 37,84 %, primærboligterskel 14 mill., exit-skatt med bunnfradrag 3 mill. og uten femårsregel, stresstest på 3 prosentpoeng og minst 7 %.",
        "Treningssett laget ut fra kursmaterialet og de gamle eksamenene. Det er ikke en ekte eksamen.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene. Nesten hvert galt alternativ er ett glemt ledd: skjermingen, oppjusteringen, taket, terskelen eller gjeldsreduksjonen. "
                     "Så snart du kan stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -0.3333333333333333},
    "exercises": EX,
}

# Kontroll: antall ledd, plan, poeng
assert len(LEDD) == 30, len(LEDD)
alle = []
for ex in EX:
    if "parts" in ex:
        for p in ex["parts"]:
            alle.append(p)
        assert sum(p["points"] for p in ex["parts"]) == ex["points"]
    else:
        alle.append(ex)
assert len(alle) == 30
for i, (p, (merke, opts, pos, vals)) in enumerate(zip(alle, LEDD)):
    assert p["options"] == opts, merke
    assert p["answer"] == PLAN[i] == pos, (merke, p["answer"], PLAN[i])
    assert len(p["options"]) == 4
assert sum(ex["points"] for ex in EX) == 90
skatt_ledd = sum(len(ex.get("parts", [1])) for ex in EX if ex["n"] <= 10)
fin_ledd = sum(len(ex.get("parts", [1])) for ex in EX if ex["n"] > 10)
assert (skatt_ledd, fin_ledd) == (19, 11), (skatt_ledd, fin_ledd)

tekst = json.dumps(sett, ensure_ascii=False)
assert "—" not in tekst, "tankestrek funnet"
assert "–" not in tekst, "tankestrek (en dash) funnet"
treff = [m.start() for m in re.finditer(r",\s*og\b", tekst)]
assert not treff, [tekst[max(0, t-60):t+20] for t in treff]
assert not re.search(r"\d-\d", re.sub(r"§ \d+-\d+", "", tekst)), "bindestrek brukt som minus?"

# Lekkasjerapport
print("Ledd  pos  rang(riktig blant tall, 1=minst)  lengst?")
lengst_teller = [0, 0, 0, 0]
rang_teller = {}
for merke, opts, pos, vals in LEDD:
    lens = [len(o) for o in opts]
    lengst = lens[pos] == max(lens) and lens.count(max(lens)) == 1
    rang = None
    if vals is not None:
        rang = sorted(vals).index(vals[pos]) + 1
        rang_teller[rang] = rang_teller.get(rang, 0) + 1
    print(f"{merke:5} {pos:3}  {str(rang):>4}   {'LENGST' if lengst else ''}")
print("Rangfordeling for talls svar:", rang_teller)
print("Antall der riktig er lengst:", sum(1 for m, o, p, v in LEDD if len(o[p]) == max(len(x) for x in o)))

with open(UT, "w", encoding="utf-8") as fh:
    json.dump(sett, fh, ensure_ascii=False, indent=2)
    fh.write("\n")
print("Skrev", UT)

# Nøkkeltall til rapporten
print("\nNøkkeltall:")
for navn, v in [("1a eierskatt", eier1), ("1b samlet", samlet), ("1c skattepl", sp3), ("1d skatt gevinst", skatt_gev),
                ("2 y", y), ("3a FV", FV), ("3b netto", netto), ("4a andel", andel4), ("4b D", D4),
                ("5a P", Pt), ("5b p", pprod), ("6 gevinst", gev6), ("7b exit", skatt7), ("8 toppskatt", top8),
                ("9 x*", x9), ("10a", skatt10a), ("10b", diff10), ("11 bank", bank11), ("11 lnB", lb), ("11 EU", EU),
                ("11 lnEW", lEW), ("11 p*", pstar), ("11 EUla", EUla), ("12 A", A12), ("12 irr", irr_full),
                ("13 komp", komp), ("14a", alf1), ("14b", alf2), ("16", faktisk), ("17", maks17)]:
    print(f"  {navn:16} {v}")
