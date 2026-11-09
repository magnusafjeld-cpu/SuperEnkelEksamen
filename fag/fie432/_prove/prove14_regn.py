"""Prøveeksamen 14 (FIE432): regner alle tall, bygger prove14.json og sjekker den.

«Rotasjonen» i prediksjonen for 12. november 2026: GS sin H2024-blokk og Næss sin
porteføljeblokk (docs/fie432-proveeksamen-spek.md, siste del).

Kjør:  python3 -I fag/fie432/_prove/prove14_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p14) sier,
3. skriver prove14.json ved siden av seg selv,
4. sjekker fila: gyldig JSON, fasitplanen, at hvert alternativ inneholder
   tallene skriptet har regnet (og ingen andre), skrivereglene (ingen
   tankestrek, ingen komma foran «og», minustegn «−»), og kalibreringen
   mot skoleeksamen (ord per ledd, andel ledd med tallsvar, lekkasje).
"""
import json
import math
import os
import re
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p14"]
assert len(PLAN) == 30


def rund(x, d=0):
    """Avrunding halvt opp (ikke bankers avrunding)."""
    q = Decimal(1).scaleb(-d)
    return Decimal(repr(round(x, 10))).quantize(q, rounding=ROUND_HALF_UP)


def kr(x, d=0):
    """Norsk tallformat: mellomrom som tusenskille, komma som desimaltegn, minus «−»."""
    v = rund(x, d)
    neg = v < 0
    s = f"{abs(v):,.{d}f}".replace(",", " ").replace(".", ",")
    return ("−" if neg else "") + s


def pst(x, d=2):
    """x er en andel (0,05 = 5 %)."""
    return kr(100 * x, d) + " %"


def lik(a, b, tol=1e-6):
    return abs(a - b) < tol


TE = 1.72 * 0.22  # effektiv eierskatt 37,84 %
assert lik(TE, 0.3784)

LEDD = []          # alle ledd i rekkefølge, med forventede tall per alternativ
_teller = [0]


def ledd(label, body, riktig, gale, solution):
    """riktig og gale er par (tekst, [tall som skal stå i teksten]).
    Riktig alternativ settes inn på plassen fasitplanen sier."""
    i = _teller[0]
    _teller[0] += 1
    plass = PLAN[i]
    alt = list(gale)
    alt.insert(plass, riktig)
    assert len(alt) == 4
    p = {"label": label, "points": 3, "body": body,
         "options": [t for t, _ in alt], "answer": plass, "solution": solution}
    LEDD.append({"nr": i + 1, "del": p, "tall": [n for _, n in alt]})
    print(f"  ledd {i + 1:2d} (plass {plass}): riktig {riktig[0][:60]!r}")
    return p


def oppgave(n, title, topic, chapters, body, parts):
    if len(parts) == 1 and parts[0]["label"] == "":
        p = parts[0]
        return {"n": n, "title": title, "points": 3, "topic": topic, "chapters": chapters,
                "body": body + p["body"], "options": p["options"], "answer": p["answer"],
                "solution": p["solution"]}
    return {"n": n, "title": title, "points": 3 * len(parts), "topic": topic,
            "chapters": chapters, "body": body, "parts": parts}


def sol(regel, steg=None, gale=None, kontroll=None, strategi=None):
    s = f"<p><b>Regelen.</b> {regel}</p>"
    if steg:
        s += "<p><b>Regnestykket.</b></p><p>" + "<br>".join(
            f"{k + 1}. {x}" for k, x in enumerate(steg)) + "</p>"
    if gale:
        s += "<p><b>Hvorfor de andre er gale.</b></p><p>" + "<br>".join(
            f"<b>{a}</b> = {b}" for a, b in gale) + "</p>"
    if kontroll:
        s += f"<p><b>Kontroll.</b> {kontroll}</p>"
    if strategi:
        s += f"<p><b>Strategi med minuspoeng.</b> {strategi}</p>"
    return s


EX = []

# ======================================================================= 1
print("\nOppgave 1: Ingerid og aksjene i Varanger Laks ASA")
K1 = 120.0
r1 = [0.05, 0.03, 0.04]
D1 = [2.0, 0.0, 15.0]
N1 = 500
s1a = K1 * r1[0]                          # 6,00
ub1a = max(0.0, s1a - D1[0])              # 4,00
grl1b = K1 + ub1a                         # 124,00
s1b = grl1b * r1[1]                       # 3,72
ub1b = max(0.0, ub1a + s1b - D1[1])       # 7,72
grl1c = K1 + ub1b                         # 127,72
s1c = grl1c * r1[2]                       # 5,1088
skpl1c = max(0.0, D1[2] - ub1b - s1c)     # 2,1712
ub1c = max(0.0, ub1b + s1c - D1[2])
eier1 = N1 * skpl1c * TE                  # 410,79
assert lik(ub1a, 4) and lik(ub1b, 7.72) and lik(skpl1c, 2.1712) and ub1c == 0
# gale a
g1a_grl = ub1a + K1 * r1[1]                              # 7,60: grunnlaget ikke oppjustert
g1a_aar2 = s1b                                           # 3,72: bare årets skjerming
g1a_utb = K1 * r1[0] + (K1 + K1 * r1[0]) * r1[1]         # 9,78: utbyttet i år 1 ikke trukket fra
# gale b
g1b_glemt = D1[2] - K1 * r1[2]                           # 10,20: framføringen glemt helt
g1b_aldri = D1[2] - (ub1a + K1 * r1[1]) - K1 * r1[2]     # 2,60: grunnlaget aldri oppjustert
g1b_ikkefra = D1[2] - s1c                                # 9,89: lagt til grunnlaget, ikke trukket fra
# gale c
g1c_uten = N1 * skpl1c * 0.22                            # oppjusteringen glemt
g1c_hele = N1 * D1[2] * TE                               # hele utbyttet skattlagt
g1c_ikkefra = N1 * g1b_ikkefra * TE                      # feilen 9,89 videreført
assert lik(g1a_grl, 7.60) and lik(g1a_utb, 9.78) and lik(g1b_aldri, 2.60)
print(f"   ub år 1 {ub1a}, ub år 2 {ub1b:.4f}, skpl år 3 {skpl1c:.4f}, eierskatt {eier1:.2f}; "
      f"gale a {g1a_grl:.2f} {g1a_aar2:.2f} {g1a_utb:.2f}; b {g1b_glemt:.2f} {g1b_aldri:.2f} {g1b_ikkefra:.4f}; "
      f"c {g1c_uten:.2f} {g1c_hele:.2f} {g1c_ikkefra:.2f}")
body1 = (f"<p>Ingerid kjøpte {N1} aksjer i Varanger Laks ASA for kr {kr(K1)} per aksje i januar år 1. Hun eier dem "
         "fortsatt ved utgangen av år 3. Skjermingsrenten er 5 % i år 1, 3 % i år 2 og 4 % i år 3. Selskapet betaler "
         f"kr {kr(D1[0])} per aksje i utbytte i år 1, ingenting i år 2 og kr {kr(D1[2])} per aksje i år 3.</p>")
pa = ledd("a", "<p>Hvor mye ubenyttet skjerming per aksje har Ingerid ved utgangen av år 2? Svar med to desimaler.</p>",
          (f"Kr {kr(ub1b, 2)}", [kr(ub1b, 2)]),
          [(f"Kr {kr(g1a_grl, 2)}", [kr(g1a_grl, 2)]),
           (f"Kr {kr(g1a_aar2, 2)}", [kr(g1a_aar2, 2)]),
           (f"Kr {kr(g1a_utb, 2)}", [kr(g1a_utb, 2)])],
          sol("Skjermingen regnes per aksje. Er utbyttet mindre enn årets skjerming, framføres resten. Den ubenyttede "
              "skjermingen legges til skjermingsgrunnlaget året etter og trekkes fra utbyttet i tillegg til årets "
              "skjerming (F4 lb 33–34, manualen 5.3).",
              [f"År 1: skjerming {kr(K1)} × 5 % = {kr(s1a, 2)}. Utbyttet {kr(D1[0], 2)} bruker en del, så "
               f"{kr(s1a, 2)} − {kr(D1[0], 2)} = {kr(ub1a, 2)} framføres.",
               f"År 2: grunnlaget er {kr(K1)} + {kr(ub1a, 2)} = {kr(grl1b, 2)}. Skjerming {kr(grl1b, 2)} × 3 % = "
               f"{kr(s1b, 2)}. Ingen utbytte, så alt framføres.",
               f"Ubenyttet ved utgangen av år 2: {kr(ub1a, 2)} + {kr(s1b, 2)} = <b>kr {kr(ub1b, 2)}</b>."],
              [(f"Kr {kr(g1a_grl, 2)}", f"skjermingen i år 2 er regnet av kostprisen: {kr(K1)} × 3 % = {kr(K1 * r1[1], 2)}. "
                f"De {kr(ub1a, 2)} fra år 1 skal også inn i grunnlaget."),
               (f"Kr {kr(g1a_aar2, 2)}", "bare skjermingen for år 2. Resten fra år 1 er glemt."),
               (f"Kr {kr(g1a_utb, 2)}", f"utbyttet i år 1 er ikke trukket fra: hele {kr(s1a, 2)} er framført og "
                f"grunnlaget i år 2 blir {kr(K1 + s1a, 2)}.")],
              f"Uten utbytte vokser grunnlaget med skjermingsrenten: {kr(grl1b, 2)} × 1,03 = {kr(grl1b * 1.03, 2)}. "
              f"Minus kostprisen {kr(K1)} gir {kr(ub1b, 2)}. ✓",
              f"{kr(g1a_aar2, 2)} er et mellomtall og {kr(g1a_grl, 2)} ligger bare 12 øre unna svaret. Regn grunnlaget "
              "for hvert år før du ser på alternativene."))
pb = ledd("b", "<p>Hva er skattepliktig utbytte per aksje i år 3? Svar med to desimaler.</p>",
          (f"Kr {kr(skpl1c, 2)}", [kr(skpl1c, 2)]),
          [(f"Kr {kr(g1b_glemt, 2)}", [kr(g1b_glemt, 2)]),
           (f"Kr {kr(g1b_aldri, 2)}", [kr(g1b_aldri, 2)]),
           (f"Kr {kr(g1b_ikkefra, 2)}", [kr(g1b_ikkefra, 2)])],
          sol("Ubenyttet skjerming virker to ganger: den løfter grunnlaget og trekkes fra utbyttet. Skattepliktig "
              "utbytte kan ikke bli negativt (F4 lb 33, manualen 5.3).",
              [f"Grunnlaget i år 3: {kr(K1)} + {kr(ub1b, 2)} = {kr(grl1c, 2)}.",
               f"Årets skjerming: {kr(grl1c, 2)} × 4 % = {kr(s1c, 4)}.",
               f"Skattepliktig: {kr(D1[2], 2)} − {kr(ub1b, 2)} − {kr(s1c, 4)} = {kr(skpl1c, 4)}, altså "
               f"<b>kr {kr(skpl1c, 2)}</b>."],
              [(f"Kr {kr(g1b_glemt, 2)}", f"framføringen er glemt helt: {kr(D1[2], 2)} − {kr(K1)} × 4 %."),
               (f"Kr {kr(g1b_aldri, 2)}", "den ubenyttede skjermingen er trukket fra, men aldri lagt til grunnlaget. "
                f"Da blir skjermingen {kr(ub1a, 2)} + {kr(K1 * r1[1], 2)} + {kr(K1 * r1[2], 2)} = "
                f"{kr(ub1a + K1 * r1[1] + K1 * r1[2], 2)}."),
               (f"Kr {kr(g1b_ikkefra, 2)}", f"de {kr(ub1b, 2)} er lagt til grunnlaget, men ikke trukket fra utbyttet.")],
              f"Samlet skjerming over tre år er {kr(s1a, 2)} + {kr(s1b, 2)} + {kr(s1c, 4)} = {kr(s1a + s1b + s1c, 4)}. "
              f"Samlet utbytte er {kr(sum(D1), 2)}. {kr(sum(D1), 2)} − {kr(s1a + s1b + s1c, 4)} = {kr(skpl1c, 4)}. "
              "Alt det skattepliktige faller i år 3. ✓"))
pc = ledd("c", "<p>Hvor mye eierskatt betaler Ingerid på utbyttet i år 3 for alle de 500 aksjene? Eierskatten er 22 % "
               "og oppjusteringsfaktoren 1,72. Svar i hele kroner.</p>",
          (f"Kr {kr(eier1)}", [kr(eier1)]),
          [(f"Kr {kr(g1c_uten)}", [kr(g1c_uten)]),
           (f"Kr {kr(g1c_hele)}", [kr(g1c_hele)]),
           (f"Kr {kr(g1c_ikkefra)}", [kr(g1c_ikkefra)])],
          sol("Eierskatten er skattepliktig utbytte × 1,72 × 22 % = skattepliktig utbytte × 37,84 % (F4 lb 30, "
              "manualen 5.1).",
              [f"Skattepliktig for alle aksjene: {N1} × {kr(skpl1c, 4)} = {kr(N1 * skpl1c, 2)}.",
               f"Oppjustert: {kr(N1 * skpl1c, 2)} × 1,72 = {kr(N1 * skpl1c * 1.72, 2)}.",
               f"Eierskatt: {kr(N1 * skpl1c * 1.72, 2)} × 22 % = {kr(eier1, 2)}, altså <b>kr {kr(eier1)}</b>."],
              [(f"Kr {kr(g1c_uten)}", "oppjusteringen er glemt: bare 22 %."),
               (f"Kr {kr(g1c_hele)}", f"hele utbyttet på {N1} × {kr(D1[2])} = {kr(N1 * D1[2])} er skattlagt uten skjerming."),
               (f"Kr {kr(g1c_ikkefra)}", f"feilen {kr(g1b_ikkefra, 2)} fra b er tatt med videre.")],
              f"Begge veier: {kr(N1 * skpl1c, 2)} × 37,84 % = {kr(eier1, 2)}. Det glemte oppjusteringssvaret er "
              f"22/37,84 = 58 % av det riktige: {kr(g1c_uten)}/{kr(eier1)} = 0,58. ✓"))
EX.append(oppgave(1, "Skjerming per aksje over tre år", "Skjerming", [5], body1, [pa, pb, pc]))

# ======================================================================= 2
print("\nOppgave 2: Faktoren som gir en bestemt samlet sats")
tA2, t2, mål2 = 0.25, 0.25, 0.55
te2 = (mål2 - tA2) / (1 - tA2)            # 40 %
y2 = te2 / t2                             # 1,60
y2_nom = (mål2 - tA2) / t2                # 1,20: satsene lagt sammen nominelt
y2_utenA = mål2 / t2                      # 2,20: selskapsskatten glemt
y2_dag = 1.72                             # dagens faktor fra hukommelsen
assert lik(te2, 0.40) and lik(y2, 1.6) and lik(y2_nom, 1.2) and lik(y2_utenA, 2.2)
assert lik(tA2 + (1 - tA2) * y2 * t2, mål2)
K2, S2, U2 = 300.0, 480.0, 12.0
gev2 = S2 - K2 - U2                       # 168
a2b = gev2 * te2                          # 67,20
g2b_utenU = (S2 - K2) * te2               # 72,00
g2b_utenOpp = gev2 * t2                   # 42,00
g2b_samlet = gev2 * mål2                  # 92,40
print(f"   y {y2}, te {te2}; gale y {y2_nom}, {y2_utenA}, {y2_dag}; gevinstskatt {a2b}; gale {g2b_utenU}, "
      f"{g2b_utenOpp}, {g2b_samlet}")


def fy(y, t=t2):
    return (f"Faktor {kr(y, 2)} og eierskatt {pst(y * t, 0)}", [kr(y, 2), pst(y * t, 0)])


body2 = ("<p>Anta forenklet at satsen på alminnelig inntekt er 25 %, både for selskaper og for eierinntekt før "
         "oppjustering. Myndighetene vil at selskapsskatt og utbytteskatt til sammen skal ta 55 øre av hver krone "
         "et selskap tjener og deler ut som utbytte. Se bort fra skjerming.</p>")
pa = ledd("a", "<p>Hvilken oppjusteringsfaktor gir dette? Hva blir den effektive eierskatten?</p>",
          fy(y2),
          [fy(y2_nom), fy(y2_utenA), fy(y2_dag)],
          sol("Av en krone overskudd tar selskapsskatten tA. Det som deles ut, er 1 − tA. Eierskatten tar y × t av "
              "det. Samlet: tA + (1 − tA) × y × t. Med dagens satser er det 22 % + 78 % × 37,84 % = 51,5 % "
              "(F5 lb 27). Samme regnestykke brukes når selskapsskatten endres og samlet skatt skal holdes fast "
              "(F8 lb 77).",
              ["Selskapsskatten tar 25 øre. Igjen til utbytte: 75 øre.",
               "Eierskatten må ta 55 − 25 = 30 øre av 75 øre, altså 30/75 = 40 %.",
               "Faktoren: 40 %/25 % = <b>1,60</b>. Effektiv eierskatt <b>40 %</b>."],
              [(f"Faktor {kr(y2_nom, 2)}", "satsene er lagt sammen nominelt, 25 % + 25 % × y = 55 %, som i "
                "inntektsskiftingslikningen. Her skal eierskatten treffe det som er igjen etter selskapsskatt."),
               (f"Faktor {kr(y2_utenA, 2)}", "selskapsskatten er glemt: hele 55 % er lagt på eieren."),
               (f"Faktor {kr(y2_dag, 2)}", "dagens faktor fra hukommelsen. Satsene i oppgaven er andre.")],
              f"25 + 75 × 0,40 = 25 + 30 = 55 øre. ✓ Med faktor {kr(y2_nom, 2)} ville samlet skatt blitt 25 + 75 × 0,30 = "
              "47,5 øre.",
              "Sett inn faktoren i alternativet og regn 25 + 75 × y × 25 %. Bare ett alternativ gir 55 øre."))
pb = ledd("b", f"<p>Åsmund kjøpte en aksje for kr {kr(K2)} og selger den for kr {kr(S2)}. Aksjen har kr {kr(U2)} i "
               "ubenyttet skjerming. Bruk faktoren fra a. Hvor mye skatt betaler han på gevinsten? Svar med to "
               "desimaler.</p>",
          (f"Kr {kr(a2b, 2)}", [kr(a2b, 2)]),
          [(f"Kr {kr(g2b_utenU, 2)}", [kr(g2b_utenU, 2)]),
           (f"Kr {kr(g2b_utenOpp, 2)}", [kr(g2b_utenOpp, 2)]),
           (f"Kr {kr(g2b_samlet, 2)}", [kr(g2b_samlet, 2)])],
          sol("Gevinsten er salgspris minus kostpris minus ubenyttet skjerming. Den skattlegges med samme effektive "
              "eierskatt som utbytte, faktor × sats (F4 lb 35, manualen 5.4).",
              [f"Gevinst: {kr(S2)} − {kr(K2)} − {kr(U2)} = {kr(gev2)}.",
               f"Oppjustert: {kr(gev2)} × 1,60 = {kr(gev2 * y2, 2)}.",
               f"Skatt: {kr(gev2 * y2, 2)} × 25 % = <b>kr {kr(a2b, 2)}</b>."],
              [(f"Kr {kr(g2b_utenU, 2)}", f"den ubenyttede skjermingen er ikke trukket fra: {kr(S2 - K2)} × 40 %."),
               (f"Kr {kr(g2b_utenOpp, 2)}", f"oppjusteringen er glemt: {kr(gev2)} × 25 %."),
               (f"Kr {kr(g2b_samlet, 2)}", f"den samlede satsen på 55 % er brukt. Selskapsskatten er betalt i "
                "selskapet og skal ikke betales en gang til av Åsmund.")],
              f"{kr(gev2)} × 40 % = {kr(a2b, 2)}. Begge veier gir samme svar. ✓"))
EX.append(oppgave(2, "Oppjusteringsfaktoren som gir en bestemt samlet sats", "Aksjonærmodellen", [5], body2, [pa, pb]))

# ======================================================================= 3
print("\nOppgave 3: Borgny og den negative nettoformuen")
BV3 = {"bolig": 4_000_000, "fond": 750_000, "bank": 250_000}
V3 = {"bolig": 0.25, "fond": 0.80, "bank": 1.00}
G3 = 3_600_000
sum3 = sum(BV3.values())
gj3 = {k: G3 * BV3[k] / sum3 for k in BV3}
fv3 = {k: BV3[k] * V3[k] for k in BV3}
fg3 = {"bolig": gj3["bolig"], "fond": gj3["fond"] * V3["fond"], "bank": gj3["bank"]}
netto3 = sum(fv3.values()) - sum(fg3.values())
g3_ingen = sum(fv3.values()) - G3
g3_null = 0.0
g3_bolig = sum(fv3.values()) - (gj3["bolig"] * V3["bolig"] + fg3["fond"] + fg3["bank"])   # boliggjelden også redusert
assert lik(netto3, -1_642_000) and lik(g3_ingen, -1_750_000) and lik(g3_bolig, 518_000)
print(f"   gjeld {gj3}, formuesverdi {sum(fv3.values())}, fradrag {sum(fg3.values())}, netto {netto3}; "
      f"gale {g3_ingen}, {g3_null}, {g3_bolig}")
body3 = (f"<p>Borgny er enslig. Hun eier en primærbolig med markedsverdi kr {kr(BV3['bolig'])}, et aksjefond verdt "
         f"kr {kr(BV3['fond'])} og kr {kr(BV3['bank'])} i banken. Gjelden er kr {kr(G3)}. Primærboligen verdsettes "
         "til 25 %, aksjefondet til 80 % og bankinnskuddet til 100 %. Gjelden fordeles forholdsmessig etter "
         "markedsverdiene, med gjeldsreduksjon etter reglene for 2026.</p>")
p = ledd("", "<p>Hva er Borgnys nettoformue i formuesskatten?</p>",
         (f"Kr {kr(netto3)}", [kr(netto3)]),
         [(f"Kr {kr(g3_ingen)}", [kr(g3_ingen)]),
          (f"Kr {kr(g3_null)}", [kr(g3_null)]),
          (f"Kr {kr(g3_bolig)}", [kr(g3_bolig)])],
         sol("Gjelden fordeles etter markedsverdiene. Gjelden på aksjer og aksjefond reduseres med rabatten, "
             "gjelden på primærboligen ikke. Nettoformuen er summen over alle eiendelene og kan bli negativ "
             "(F8 lb 55–56, manualen 7.4).",
             [f"Andeler av {kr(sum3)}: bolig 80 %, fond 15 %, bank 5 %. Gjelden fordeles {kr(gj3['bolig'])}, "
              f"{kr(gj3['fond'])} og {kr(gj3['bank'])}.",
              f"Formuesverdier: {kr(fv3['bolig'])} + {kr(fv3['fond'])} + {kr(fv3['bank'])} = {kr(sum(fv3.values()))}.",
              f"Fradragsberettiget gjeld: {kr(fg3['bolig'])} + {kr(gj3['fond'])} × 80 % + {kr(fg3['bank'])} = "
              f"{kr(sum(fg3.values()))}.",
              f"Nettoformue: {kr(sum(fv3.values()))} − {kr(sum(fg3.values()))} = <b>kr {kr(netto3)}</b>."],
             [(f"Kr {kr(g3_ingen)}", "gjeldsreduksjonen er ikke brukt. Etter reglene for 2026 skal gjelden på "
               "aksjefondet reduseres med 20 %."),
              ("Kr 0", "nettoformuen er satt til null fordi den ble negativ. Formuesskatten blir null, men "
               "nettoformuen er negativ, som i forelesningens eksempel med Gina (F8 lb 56)."),
              (f"Kr {kr(g3_bolig)}", f"boliggjelden er også redusert med 75 %, til {kr(gj3['bolig'] * V3['bolig'])}. "
               "Gjeld på primærboligen reduseres aldri (F8 lb 55).")],
             f"Per eiendel: bolig {kr(fv3['bolig'] - fg3['bolig'])}, fond {kr(fv3['fond'] - fg3['fond'])}, bank "
             f"{kr(fv3['bank'] - fg3['bank'])}. Summen er {kr(netto3)}. ✓ Reduksjonen er {kr(gj3['fond'] * 0.2)}. "
             f"{kr(g3_ingen)} + {kr(gj3['fond'] * 0.2)} = {kr(netto3)}. ✓",
             "Gjeldsreduksjonen kan bare løfte nettoformuen med 20 % av fondsgjelden. Svaret må derfor ligge like "
             f"over {kr(g3_ingen)}."))
EX.append(oppgave(3, "Nettoformue under null med primærbolig og aksjefond", "Formuesskatt", [7], body3, [p]))

# ======================================================================= 4
print("\nOppgave 4: Hjørdis og formuesskatten på aksjene i Ofoten Kraft ASA")
MV4, V4, BF4, tf4, te4, r4 = 20_000_000, 0.80, 1_900_000, 0.01, 0.40, 0.05
fv4 = MV4 * V4
F4 = (fv4 - BF4) * tf4                    # 141 000
g4a_rab = (MV4 - BF4) * tf4               # 181 000: rabatten glemt
g4a_bf = fv4 * tf4                        # 160 000: bunnfradraget glemt
g4a_rek = (MV4 - BF4) * V4 * tf4          # 144 800: bunnfradraget trukket fra før rabatten
D4 = F4 / (1 - te4)                       # 235 000
g4b_oppå = F4 * (1 + te4)                 # 197 400
g4b_delt = F4 / te4                       # 352 500
g4b_dag = F4 / (1 - TE)                   # 226 834: dagens sats i stedet for den oppgitte
avk4 = r4 * MV4                           # 1 000 000
a4c = F4 / avk4                           # 14,10 %
g4c_formel = tf4 / r4                     # 20,00 %
g4c_bf = g4a_bf / avk4                    # 16,00 %
g4c_fv = F4 / (r4 * fv4)                  # 17,63 %
assert lik(F4, 141_000) and lik(D4, 235_000) and lik(a4c, 0.141)
assert lik(D4 - D4 * te4, F4)
print(f"   F {F4}, gale {g4a_rab}, {g4a_bf}, {g4a_rek}; D {D4}, gale {g4b_oppå}, {g4b_delt}, {g4b_dag:.1f}; "
      f"andel {a4c}, gale {g4c_formel}, {g4c_bf}, {g4c_fv:.5f}")
body4 = (f"<p>Hjørdis er enslig og eier børsnoterte aksjer i Ofoten Kraft ASA med markedsverdi kr {kr(MV4)} både ved "
         "begynnelsen og slutten av året. Hun har ingen annen formue og ingen gjeld. Aksjer verdsettes til 80 %. "
         f"Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr {kr(BF4)}.</p>")
pa = ledd("a", "<p>Hvor mye formuesskatt betaler Hjørdis?</p>",
          (f"Kr {kr(F4)}", [kr(F4)]),
          [(f"Kr {kr(g4a_rab)}", [kr(g4a_rab)]),
           (f"Kr {kr(g4a_bf)}", [kr(g4a_bf)]),
           (f"Kr {kr(g4a_rek)}", [kr(g4a_rek)])],
          sol("Formuesverdien er markedsverdien etter rabatt. Bunnfradraget trekkes fra nettoformuen, altså etter "
              "rabatten. Satsen er 1,0 % opp til 21,5 mill. (F8 lb 5, samme oppsett som F4 lb 38).",
              [f"Formuesverdi: {kr(MV4)} × 80 % = {kr(fv4)}.",
               f"Over bunnfradraget: {kr(fv4)} − {kr(BF4)} = {kr(fv4 - BF4)}.",
               f"Formuesskatt: {kr(fv4 - BF4)} × 1,0 % = <b>kr {kr(F4)}</b>."],
              [(f"Kr {kr(g4a_rab)}", "aksjerabatten er glemt."),
               (f"Kr {kr(g4a_bf)}", "bunnfradraget er glemt."),
               (f"Kr {kr(g4a_rek)}", "bunnfradraget er trukket fra markedsverdien før rabatten. Det gir et for lite "
                "bunnfradrag, bare 80 % av 1,9 mill.")],
              f"Uten bunnfradrag ville skatten vært {kr(g4a_bf)}. Bunnfradraget sparer {kr(BF4)} × 1 % = {kr(BF4 * tf4)}. "
              f"{kr(g4a_bf)} − {kr(BF4 * tf4)} = {kr(F4)}. ✓"))
pb = ledd("b", "<p>Hjørdis har ingen andre midler og må ta utbytte for å betale formuesskatten. Anta forenklet at "
               "eierskatten er 40 % og se bort fra skjerming. Hvor stort utbytte må hun ta for å dekke både "
               "formuesskatten og eierskatten på utbyttet? Rund av til nærmeste krone.</p>",
          (f"Kr {kr(D4)}", [kr(D4)]),
          [(f"Kr {kr(g4b_oppå)}", [kr(g4b_oppå)]),
           (f"Kr {kr(g4b_delt)}", [kr(g4b_delt)]),
           (f"Kr {kr(g4b_dag)}", [kr(g4b_dag)])],
          sol("Det som er igjen av utbyttet etter eierskatt, skal dekke formuesskatten: D × (1 − te) = F, altså "
              "D = F/(1 − te) (F5 lb 38, manualen 8.4).",
              [f"F = {kr(F4)} fra a og te = 40 %.",
               f"D = {kr(F4)}/0,60 = <b>kr {kr(D4)}</b>."],
              [(f"Kr {kr(g4b_oppå)}", f"skatten er lagt oppå: {kr(F4)} × 1,40. Da dekker ikke utbyttet skatten på "
                "seg selv."),
               (f"Kr {kr(g4b_delt)}", f"delt på eierskatten i stedet for på det som er igjen: {kr(F4)}/0,40."),
               (f"Kr {kr(g4b_dag)}", f"dagens eierskatt 37,84 % er brukt: {kr(F4)}/0,6216. Oppgaven sier 40 %.")],
              f"Eierskatten på {kr(D4)} er {kr(D4 * te4)}. Igjen: {kr(D4)} − {kr(D4 * te4)} = {kr(F4)}, nøyaktig "
              "formuesskatten. ✓",
              f"Med eierskatt under 50 % er eierskatten mindre enn halve utbyttet. Da er utbyttet under 2 × {kr(F4)} = "
              f"{kr(2 * F4)}. Det stryker {kr(g4b_delt)}. {kr(g4b_dag)} kan bare komme fra en annen sats enn den oppgitte."))
pc = ledd("c", "<p>Selskapet gir en avkastning etter selskapsskatt på 5 % av markedsverdien i året. Hvor stor del "
               "av avkastningen tar formuesskatten? Svar med to desimaler.</p>",
          (pst(a4c), [pst(a4c)]),
          [(pst(g4c_formel), [pst(g4c_formel)]),
           (pst(g4c_bf), [pst(g4c_bf)]),
           (pst(g4c_fv), [pst(g4c_fv)])],
          sol("Formuesskatten kan regnes om til en skatt på avkastningen: betalt formuesskatt delt på avkastningen "
              "i kroner. Uten rabatt og bunnfradrag er den τ/r (F8 lb 27–28, manualen 8.1).",
              [f"Avkastning: {kr(MV4)} × 5 % = {kr(avk4)}.",
               f"Formuesskatt fra a: {kr(F4)}.",
               f"Andel: {kr(F4)}/{kr(avk4)} = <b>{pst(a4c)}</b>."],
              [(pst(g4c_formel), "τ/r = 1 %/5 %. Det gjelder bare uten aksjerabatt og bunnfradrag."),
               (pst(g4c_bf), f"bunnfradraget er glemt: {kr(g4a_bf)}/{kr(avk4)}."),
               (pst(g4c_fv), f"avkastningen er regnet av formuesverdien {kr(fv4)} i stedet for av markedsverdien.")],
              f"Rabatten og bunnfradraget senker satsen fra 20 % til {pst(a4c)}: 20 % × "
              f"{kr(fv4 - BF4)}/{kr(MV4)} = {pst(g4c_formel * (fv4 - BF4) / MV4)}. ✓"))
EX.append(oppgave(4, "Formuesskatt på aksjer, utbyttet som trengs og skatten i prosent av avkastningen",
                  "Formuesskatt som avkastningsskatt", [7, 8], body4, [pa, pb, pc]))

# ======================================================================= 5
print("\nOppgave 5: Stykkskatt som kjøperne betaler inn")
P5, t5 = 60.0, 12.0
p5 = P5 - t5                              # perfekt elastisk etterspørsel: P uendret
g5_P = P5
g5_alt = P5 + t5
g5_halv = P5 - t5 / 2
assert lik(p5, 48)
body5 = ("<p>I et marked med frikonkurranse er etterspørselen D(P) og tilbudet S(p). P er det kjøperne betaler per "
         "enhet, skatten medregnet. p er det selgerne får. Myndighetene innfører en stykkskatt t som kjøperne "
         "betaler inn til staten, slik at P = p + t og likevekten er D(P) = S(P − t). Anta D′ &lt; 0 og S′ &gt; 0.</p>")
pa = ledd("a", "<p>Hvilket uttrykk viser hvordan P endres når skatten øker marginalt?</p>",
          ("∂P/∂t = S′/(S′ − D′)", []),
          [("∂P/∂t = D′/(S′ − D′)", []),
           ("∂P/∂t = D′/(D′ − S′)", []),
           ("∂P/∂t = S′/(D′ − S′)", [])],
          sol("Deriver likevekten med hensyn på t. Hvem som betaler inn skatten, endrer ikke svaret: likevekten er den "
              "samme ligningen som når selgerne betaler inn (F9 lb 8–10 og lb 14, manualen 11.2).",
              ["D′ × ∂P/∂t = S′ × (∂P/∂t − 1).",
               "∂P/∂t × (S′ − D′) = S′.",
               "<b>∂P/∂t = S′/(S′ − D′)</b>, som ligger mellom 0 og 1."],
              [("D′/(S′ − D′)", "∂p/∂t, endringen i prisen selgerne får. Den er negativ."),
               ("D′/(D′ − S′)", "selgernes andel av skatten, −∂p/∂t. Den er positiv og mellom 0 og 1, men gjelder "
                "selgerne."),
               ("S′/(D′ − S′)", "nevneren har feil fortegn. Uttrykket blir negativt, men P stiger når skatten øker.")],
              "∂P/∂t − ∂p/∂t = S′/(S′ − D′) − D′/(S′ − D′) = 1. Kilen mellom prisene øker med hele skatten. ✓",
              "∂P/∂t må være positiv. Det stryker to alternativer med en gang. Av de to positive er bare ett skrevet "
              "med S′ i telleren."))
pb = ledd("b", "<p>Anta at tilbudet er perfekt elastisk, fordi varen kan kjøpes inn i ubegrensede mengder til en gitt "
               "pris på verdensmarkedet. Hva er riktig?</p>",
          ("∂P/∂t = 1: kjøperne bærer hele skatten", ["1"]),
          [("∂P/∂t = 0: selgerne bærer hele skatten", ["0"]),
           ("∂P/∂t = 0,5: skatten deles likt", ["0,5"]),
           ("∂P/∂t &gt; 1: prisen stiger mer enn skatten, fordi tilbudet er svært prisfølsomt", ["1"])],
          sol("Perfekt elastisk tilbud betyr S′ → ∞. Del teller og nevner i S′/(S′ − D′) på S′: 1/(1 − D′/S′) → 1. "
              "Produsentprisen er fast og hele skatten veltes over på kjøperne (F9 lb 11 og 13).",
              ["S′/(S′ − D′) = 1/(1 − D′/S′).",
               "Når S′ → ∞, går D′/S′ → 0.",
               "<b>∂P/∂t = 1</b>: kjøperne bærer hele skatten."],
              [("∂P/∂t = 0", "tilfellet med perfekt uelastisk tilbud (S′ = 0) eller perfekt elastisk etterspørsel."),
               ("∂P/∂t = 0,5", "monopolisten med lineær etterspørsel (F9 lb 20). Her er det frikonkurranse."),
               ("∂P/∂t &gt; 1", "i frikonkurranse er ∂P/∂t = S′/(S′ − D′) alltid mindre enn 1 fordi −D′ &gt; 0. Den nærmer seg 1 nedenfra, "
                "men blir aldri større.")],
              "Den minst prisfølsomme siden bærer skatten. Et vannrett tilbud er uendelig prisfølsomt, så kjøperne "
              "bærer alt (F9 lb 14 og 17). ✓"))
pc = ledd("c", f"<p>Før skatten er prisen kr {kr(P5)}. Skatten er kr {kr(t5)} per enhet. Anta nå at etterspørselen er "
               f"perfekt elastisk ved kr {kr(P5)}, mens tilbudet er stigende. Hvor mye får selgerne per enhet etter at "
               "skatten er innført?</p>",
          (f"Kr {kr(p5)}", [kr(p5)]),
          [(f"Kr {kr(g5_P)}", [kr(g5_P)]),
           (f"Kr {kr(g5_alt)}", [kr(g5_alt)]),
           (f"Kr {kr(g5_halv)}", [kr(g5_halv)])],
          sol("Ved perfekt elastisk etterspørsel (D′ → −∞) er ∂P/∂t = 0. Kjøperne betaler ikke mer enn "
              f"kr {kr(P5)} til sammen, så selgerne bærer hele skatten (F9 lb 11 og 16).",
              [f"P, skatten medregnet, er fortsatt kr {kr(P5)}.",
               f"Kjøperne betaler kr {kr(t5)} av dette til staten.",
               f"Selgerne får {kr(P5)} − {kr(t5)} = <b>kr {kr(p5)}</b>."],
              [(f"Kr {kr(g5_P)}", "det kjøperne betaler til sammen, ikke det selgerne får."),
               (f"Kr {kr(g5_alt)}", "som om kjøperne bar hele skatten. Det skjer ved perfekt uelastisk etterspørsel."),
               (f"Kr {kr(g5_halv)}", "skatten er delt likt. Med vannrett etterspørsel får kjøperne ingen del.")],
              f"∂p/∂t = −1: p faller med hele skatten, fra {kr(P5)} til {kr(p5)}. ✓"))
EX.append(oppgave(5, "Stykkskatt: formelen for kjøpernes pris og to grensetilfeller", "Skatteincidens", [11], body5,
                  [pa, pb, pc]))

# ======================================================================= 6
print("\nOppgave 6: Obligasjonen som blir skattefri")
C6, P6, tm6 = 4.0, 100.0, 0.20
R6 = C6 / P6                              # 4 %
r6 = R6 * (1 - tm6)                       # 3,2 % etter skatt
kurs6 = C6 / r6                           # 125
g6_opp = P6 * (1 + tm6)                   # 120
g6_uendret = P6                           # 100
g6_snudd = C6 * (1 - tm6) / R6            # 80
T6 = (R6 - C6 / kurs6) / R6               # implisitt skatt 20 %
assert lik(kurs6, 125) and lik(T6, 0.20) and lik(g6_snudd, 80)
# investor med 15 % skatt: skattlagt gir 4 % × 0,85 = 3,4 % > 3,2 %
assert R6 * 0.85 > C6 / kurs6
print(f"   kurs {kurs6}, implisitt skatt {T6}; gale {g6_opp}, {g6_uendret}, {g6_snudd}")
body6 = (f"<p>En evigvarende obligasjon betaler kr {kr(C6)} i rente hvert år og handles til kurs kr {kr(P6)}. Rentene "
         "skattlegges. Marginalinvestoren, som bestemmer prisen, har 20 % skatt på renter. Stortinget vedtar at "
         "rentene på akkurat denne obligasjonen blir skattefrie. Andre obligasjoner med samme risiko skattlegges "
         "som før.</p>")
pa = ledd("a", "<p>Hva blir kursen på obligasjonen når fritaket er kjent og markedet har tilpasset seg?</p>",
          (f"Kr {kr(kurs6)}", [kr(kurs6)]),
          [(f"Kr {kr(g6_opp)}", [kr(g6_opp)]),
           (f"Kr {kr(g6_uendret)}", [kr(g6_uendret)]),
           (f"Kr {kr(g6_snudd)}", [kr(g6_snudd)])],
          sol("To like risikable obligasjoner må gi marginalinvestoren samme avkastning etter skatt. Et skattefritak "
              "kapitaliseres i prisen til avkastningen er bydd ned til markedets avkastning etter skatt (F10 lb 15 "
              "og 18, manualen 12.4).",
              [f"Markedets avkastning etter skatt: 4 % × (1 − 20 %) = {pst(r6, 1)}.",
               f"Den skattefrie obligasjonen må gi {pst(r6, 1)}: kurs = {kr(C6)}/0,032.",
               f"Kurs = <b>kr {kr(kurs6)}</b>."],
              [(f"Kr {kr(g6_opp)}", "kursen er økt med skattesatsen, 100 × 1,20. Den riktige kursen er "
                "100/(1 − 0,20)."),
               (f"Kr {kr(g6_uendret)}", "kursen er uendret. Da ville den skattefrie obligasjonen gitt 4 % etter "
                "skatt mot 3,2 % for andre med samme risiko. Alle ville kjøpt den."),
               (f"Kr {kr(g6_snudd)}", "renten etter skatt er diskontert med renten før skatt: 3,2/0,04.")],
              f"Ny avkastning før skatt: 4/125 = 3,2 %. Implisitt skatt: (4 − 3,2)/4 = {pst(T6, 0)}, lik "
              "marginalinvestorens sats. ✓"))
pb = ledd("b", "<p>Hvilket utsagn om fritaket er riktig?</p>",
          ("Gevinsten tilfaller dem som eide obligasjonen da fritaket ble kjent", []),
          [("Staten får den implisitte skatten, fordi obligasjonen nå gir lavere rente før skatt", []),
           ("En investor med 15 % skatt på renter bør nå bytte til den skattefrie obligasjonen", ["15"]),
           ("Nye kjøpere får 4 % avkastning etter skatt, mot 3,2 % for kjøpere før fritaket", ["4", "3,2"])],
          sol("Fritaket kapitaliseres i kursen. Den som eier obligasjonen når fritaket blir kjent, får kursgevinsten. "
              "Nye kjøpere får bare markedets avkastning etter skatt (F10 lb 18). Den implisitte skatten går til "
              "utstederen eller selgeren, ikke til staten (F10 lb 14).",
              None,
              [("Staten får den implisitte skatten", "den lavere avkastningen før skatt er ingen skatteinngang. Den "
                "går til utsteder eller selger (F10 lb 14)."),
               ("15 % skatt", "den implisitte skatten er 20 %. Med 15 % gir en skattlagt obligasjon 4 % × 0,85 = 3,4 % "
                "mot 3,2 %. Den skattlagte er best (F10 lb 17)."),
               ("Nye kjøpere får 4 %", "en ny kjøper betaler 125 og får 4/125 = 3,2 %, det samme som før.")],
              f"Gevinsten for den som eide: {kr(kurs6)} − {kr(P6)} = kr {kr(kurs6 - P6)} per obligasjon. ✓"))
EX.append(oppgave(6, "Implisitt skatt når en obligasjon blir skattefri", "Implisitt skatt", [12], body6, [pa, pb]))

# ======================================================================= 7
print("\nOppgave 7: Gjennomsnittsskatt i Skarvøy")
Y7 = 800_000
trinn7 = [(0, 100_000, 0.0), (100_000, 500_000, 0.20), (500_000, None, 0.35)]


s7 = sum(max(0.0, min(Y7, hi if hi else Y7) - lo) * t for lo, hi, t in trinn7)   # 185 000
a7 = s7 / Y7
g7_snitt = (0.0 + 0.20 + 0.35) / 3                              # uvektet snitt av satsene
g7_uten3 = 0.20 * (Y7 - 100_000) / Y7                           # toppsatsen glemt: 20 % på alt over 100 000
g7_uten2 = 0.35 * (Y7 - 500_000) / Y7                           # trinn 2 glemt
assert lik(s7, 185_000) and lik(a7, 0.23125) and max(g7_snitt, g7_uten3, g7_uten2) < a7
print(f"   skatt {s7}, snitt {a7}; gale {g7_snitt}, {g7_uten3}, {g7_uten2}")
body7 = ("<p>I landet Skarvøy er skatten 0 % på inntekt opp til kr 100 000, 20 % på inntekt mellom kr 100 000 og "
         "kr 500 000 og 35 % på inntekt over kr 500 000. Gjermund tjener kr 800 000. Se bort fra andre skatter og "
         "fradrag.</p>")
p = ledd("", "<p>Hva er gjennomsnittsskatten til Gjermund? Svar med én desimal.</p>",
         (pst(a7, 1), [pst(a7, 1)]),
         [(pst(g7_snitt, 1), [pst(g7_snitt, 1)]),
          (pst(g7_uten3, 1), [pst(g7_uten3, 1)]),
          (pst(g7_uten2, 1), [pst(g7_uten2, 1)])],
         sol("Gjennomsnittsskatten er betalt skatt delt på bruttoinntekt. I et trinnsystem gjelder hver sats bare "
             "inntekten innenfor sitt trinn (F7 lb 21–24, manualen 1.4).",
             ["Trinn 2: (500 000 − 100 000) × 20 % = 80 000.",
              "Trinn 3: (800 000 − 500 000) × 35 % = 105 000.",
              f"Skatt {kr(s7)}. Gjennomsnitt: {kr(s7)}/{kr(Y7)} = {pst(a7, 3)}, altså <b>{pst(a7, 1)}</b>."],
             [(pst(g7_snitt, 1), "snittet av de tre satsene, (0 + 20 + 35)/3. Satsene må vektes med inntekten i "
               "hvert trinn."),
              (pst(g7_uten3, 1), "toppsatsen er glemt: 20 % på alt over 100 000, altså 140 000/800 000."),
              (pst(g7_uten2, 1), "trinn 2 er glemt: bare 105 000/800 000.")],
             f"Uten toppsatsen er gjennomsnittsskatten {pst(g7_uten3, 1)}. Med toppsatsen må den ligge høyere, men "
             f"under marginalskatten på 35 %. {pst(a7, 1)} gjør det. ✓",
             f"Toppsatsen kan bare løfte gjennomsnittet over {pst(g7_uten3, 1)}. To av alternativene ligger på eller "
             "under det tallet."))
EX.append(oppgave(7, "Gjennomsnittsskatt i et trinnsystem", "Progressivitet", [1, 10], body7, [p]))

# ======================================================================= 8
print("\nOppgave 8: Snøhetta Maskin AS: straksfradrag eller avskrivning")
K8, a8, t8, r8 = 400_000, 100_000, 0.22, 0.06
nv_straks8 = K8 * t8                                          # 88 000 nå
nv_avskr8 = sum(a8 * t8 / (1 + r8) ** k for k in range(4))    # første fradrag i år
a8_svar = nv_straks8 - nv_avskr8                              # 7 194
g8_null = 0.0                                                 # ingen diskontering
g8_neste = nv_straks8 - sum(a8 * t8 / (1 + r8) ** k for k in range(1, 5))   # første avskrivning om ett år
g8_utenskatt = K8 - sum(a8 / (1 + r8) ** k for k in range(4))               # forskjell i fradrag, ikke i skatt
assert nv_straks8 > nv_avskr8 and lik(float(rund(a8_svar)), 7194) and lik(float(rund(g8_neste)), 11768) and lik(float(rund(g8_utenskatt)), 32699)
print(f"   straks {nv_straks8}, avskrivning {nv_avskr8:.2f}, forskjell {a8_svar:.2f}; gale {g8_neste:.2f}, "
      f"{g8_utenskatt:.2f}")
body8 = (f"<p>Snøhetta Maskin AS har god inntjening hvert år og kjøper en maskin for kr {kr(K8)}. Selskapet kan "
         f"utgiftsføre hele beløpet i år eller avskrive kr {kr(a8)} i året over fire år, fra og med i år. "
         "Skattebesparelsen kommer samme år som fradraget. Selskapsskatten er 22 % i alle år. Selskapet diskonterer "
         "med 6 %.</p>")
p = ledd("", "<p>Hvor mye mer er straksfradraget verdt enn avskrivningen, målt i nåverdi i dag? Rund av til "
             "nærmeste krone.</p>",
         (f"Kr {kr(a8_svar)}", [kr(a8_svar)]),
         [(f"Kr {kr(g8_null)}", [kr(g8_null)]),
          (f"Kr {kr(g8_neste)}", [kr(g8_neste)]),
          (f"Kr {kr(g8_utenskatt)}", [kr(g8_utenskatt)])],
         sol("Samlet fradrag er det samme, men nåverdien er ikke det. Andelen av kostnaden som kommer til fradrag målt "
             "i nåverdi, β, er 1 bare ved straksfradrag. β &lt; 1 gjør fradraget mindre verdt i dag (F5 lb 18–20, "
             "manualen 2.4).",
             [f"Straksfradrag: {kr(K8)} × 22 % = {kr(nv_straks8)} spart nå.",
              f"Avskrivning: {kr(a8 * t8)} spart hvert år i fire år, første gang i år. Nåverdi {kr(a8 * t8)} × "
              f"(1 + 1/1,06 + 1/1,06² + 1/1,06³) = {kr(nv_avskr8)}.",
              f"Forskjell: {kr(nv_straks8)} − {kr(nv_avskr8)} = <b>kr {kr(a8_svar)}</b>."],
             [("Kr 0", f"ingen diskontering. Skattebesparelsen er {kr(nv_straks8)} i kroner begge veier, men ikke i "
               "nåverdi."),
              (f"Kr {kr(g8_neste)}", "den første avskrivningen er diskontert ett år. Teksten sier fra og med i år."),
              (f"Kr {kr(g8_utenskatt)}", "forskjellen i nåverdien av fradragene, ikke av skatten. Skattesatsen på "
               "22 % er glemt.")],
             f"{kr(g8_utenskatt)} × 22 % = {kr(g8_utenskatt * t8)}, det samme som svaret. β for avskrivningen er "
             f"{kr(nv_avskr8)}/{kr(nv_straks8)} = {kr(nv_avskr8 / nv_straks8, 3)} &lt; 1. ✓",
             "Svaret kan ikke være 0 når renten er positiv. Ser du et svar på over 30 000, har du glemt skattesatsen."))
EX.append(oppgave(8, "Straksfradrag mot avskrivning over fire år", "Fradragets tidsverdi", [2, 9], body8, [p]))

# ======================================================================= 9
print("\nOppgave 9: Inntektsskiftingslikningen baklengs")
tA9, a9, a9_lønn, te9 = 22.0, 12.4, 14.1, 33.0
tw9 = tA9 + te9 - a9                      # 42,6
g9_14 = tA9 + te9 - a9_lønn               # 40,9: 14,1 % brukt
g9_utenA = tA9 + te9                      # 55,0: avgiften glemt
g9_eldre = tA9 + (1 - tA9 / 100) * te9 - a9   # 35,34: eldre form med effektive satser
assert lik(tw9, 42.6) and lik(g9_14, 40.9) and lik(g9_eldre, 35.34)
print(f"   tw {tw9}; gale {g9_14}, {g9_utenA}, {g9_eldre}")
body9 = ("<p>Regjeringen vil senke den effektive eierskatten fra 37,84 % til 33 % uten å åpne for inntektsskifting. "
         "Inntektsskiftingslikningen skal holde: høyeste marginalskatt på lønn pluss "
         "arbeidsgiveravgiften som arbeidstakeren bærer, er lik selskapsskatten pluss den effektive eierskatten. "
         "Selskapsskatten er 22 %. Arbeidstakeren bærer hele arbeidsgiveravgiften, som er 14,1 % av utbetalt "
         "lønn og 12,4 % av lønnskostnaden.</p>")
p = ledd("", "<p>Hva må høyeste marginalskatt på lønn bli?</p>",
         (pst(tw9 / 100, 1), [pst(tw9 / 100, 1)]),
         [(pst(g9_14 / 100, 1), [pst(g9_14 / 100, 1)]),
          (pst(g9_utenA / 100, 1), [pst(g9_utenA / 100, 1)]),
          (pst(g9_eldre / 100, 1), [pst(g9_eldre / 100, 1)])],
         sol("Likningen legger nominelle satser sammen: tw + a = tA + y × t, der y × t er den effektive eierskatten. "
             "Arbeidsgiveravgiften måles mot lønnskostnaden, altså 12,4 % og ikke 14,1 % (F5 lb 3–4 og 9, manualen "
             "5.1).",
             ["Høyresiden: 22 % + 33 % = 55 %.",
              "Venstresiden: tw + 12,4 % = 55 %.",
              f"tw = 55 % − 12,4 % = <b>{pst(tw9 / 100, 1)}</b>."],
             [(pst(g9_14 / 100, 1), "avgiften er målt mot utbetalt lønn, 14,1 %. Likningen bruker andelen av "
               "lønnskostnaden."),
              (pst(g9_utenA / 100, 1), "arbeidsgiveravgiften er glemt."),
              (pst(g9_eldre / 100, 1), "den eldre formen fra H2017 og H2020, der eierskatten bare treffer det som er "
               "igjen etter selskapsskatt: 22 % + 78 % × 33 %. Den er ikke kursets likning i 2026.")],
             f"Dagens tall: 47,4 + 12,4 = 22 + 37,8. Eierskatten senkes med 4,8 prosentpoeng, så lønnsskatten må ned "
             f"like mye: 47,4 − 4,8 = {kr(tw9, 1)}. ✓"))
EX.append(oppgave(9, "Inntektsskiftingslikningen når eierskatten skal ned", "Aksjonærmodellen", [5], body9, [p]))

# ======================================================================= 10
print("\nOppgave 10: Tindholmen Holding AS")
O10, tA10 = 1_000_000, 0.22
utb10 = O10 * (1 - tA10)
samlet10 = (O10 * tA10 + utb10 * TE) / O10                    # 51,52 %
tre10 = utb10 * 0.03 * tA10                                    # 3 %-regelen hvis under 90 %
samlet10_tre = (O10 * tA10 + tre10 + (utb10 - tre10) * TE) / O10   # 51,84 %
assert lik(samlet10, 0.515152) and abs(samlet10_tre - 0.518352) < 1e-6
print(f"   samlet {samlet10:.6f}, med 3 %-regelen {samlet10_tre:.6f}")
body10 = (f"<p>Tor Arne eier alle aksjene i Tindholmen Holding AS. Holdingselskapet eier alle aksjene i Lyse Data AS. "
          f"Lyse Data AS tjener kr {kr(O10)} og deler ut alt etter selskapsskatt til holdingselskapet, som deler alt "
          "videre til Tor Arne. Selskapsskatten er 22 % og eierskatten 37,84 %. Skjermingen er brukt opp.</p>")
p = ledd("", "<p>Hvilket utsagn er riktig?</p>",
         (f"Samlet skatt blir {pst(samlet10)}, det samme som om Tor Arne eide Lyse Data AS direkte",
          [pst(samlet10)]),
         [("Samlet skatt blir 22 %, fordi utbyttet til Tor Arne er skattefritt etter fritaksmetoden", ["22"]),
          (f"Holdingselskapet betaler skatt på 3 % av utbyttet, slik at samlet skatt blir {pst(samlet10_tre)}",
           ["3", pst(samlet10_tre)]),
          ("Samlet skatt blir høyere enn ved direkte eie, fordi utbyttet skattlegges i to selskaper", [])],
         sol("Fritaksmetoden gjelder selskaper som eier aksjer: utbytte inn i holdingselskapet er skattefritt. Med "
             "90 % eierandel eller mer gjelder heller ikke treprosentregelen. Personen skattlegges etter "
             "aksjonærmodellen når pengene kommer ut (F4 lb 22–25 og 30, manualen 6.3).",
             [f"Selskapsskatt: {kr(O10)} × 22 % = {kr(O10 * tA10)}. Utbytte: {kr(utb10)}.",
              "Holdingselskapet eier 100 %: ingen skatt der.",
              f"Eierskatt: {kr(utb10)} × 37,84 % = {kr(utb10 * TE)}.",
              f"Samlet: ({kr(O10 * tA10)} + {kr(utb10 * TE)})/{kr(O10)} = <b>{pst(samlet10)}</b>, som ved direkte eie "
              "(F5 lb 27)."],
             [("22 %", "fritaksmetoden gjelder selskaper, ikke Tor Arne. Han betaler eierskatt når utbyttet når ham."),
              (pst(samlet10_tre), "treprosentregelen gjelder bare når eierandelen er under 90 % (F4 lb 25). "
               "Holdingselskapet eier alt."),
              ("Høyere enn ved direkte eie", "fritaksmetoden finnes nettopp for å hindre kjedebeskatning (F4 lb 22).")],
             f"Tor Arne sitter igjen med {kr(utb10 - utb10 * TE)}, det samme som om han eide Lyse Data AS selv. "
             "Holdingselskapet gir bare valget av når skatten betales (F4 lb 26). ✓"))
EX.append(oppgave(10, "Fritaksmetoden og aksjonærmodellen i en kjede", "Fritaksmetoden", [6], body10, [p]))

# ======================================================================= 11
print("\nOppgave 11: Gunnhild og hytta")
W11, L11, p11 = 2_000_000, 800_000, 0.05
fair11 = p11 * L11                                            # 40 000
EU11 = (1 - p11) * math.log(W11) + p11 * math.log(W11 - L11)
CE11 = math.exp(EU11)
maxP11 = W11 - CE11                                           # 50 436
g11a_formue = p11 * W11                                       # 100 000
g11a_rest = p11 * (W11 - L11)                                 # 60 000: 5 % av formuen etter brannen
g11a_hel = L11                                                # 800 000
g11c_risk = maxP11 - fair11                                   # risikopremien
g11c_lntap = W11 - math.exp((1 - p11) * math.log(W11) + p11 * math.log(L11))
assert lik(fair11, 40_000) and 50_000 < maxP11 < 51_000
print(f"   rettferdig {fair11}, sikkerhetsekvivalent {CE11:.1f}, høyeste premie {maxP11:.1f}; "
      f"risikopremie {g11c_risk:.1f}, ln(tap) {g11c_lntap:.1f}")
H = lambda x: kr(float(rund(x / 100, 0)) * 100, 0)   # nærmeste hundre kroner
body11 = (f"<p>Gunnhild har en formue på kr {kr(W11)}. Av dette er kr {kr(L11)} en hytte. Med sannsynlighet 5 % brenner "
          "hytta i løpet av året. Da er hele verdien tapt. Ellers skjer ingenting. Gunnhild har nyttefunksjonen "
          "U(W) = ln W, der W er formuen.</p>")
pa = ledd("a", "<p>Hva er den aktuarisk rettferdige premien for en forsikring som dekker hele hytta?</p>",
          (f"Kr {kr(fair11)}", [kr(fair11)]),
          [(f"Kr {kr(g11a_formue)}", [kr(g11a_formue)]),
           (f"Kr {kr(g11a_hel)}", [kr(g11a_hel)]),
           (f"Kr {kr(g11a_rest)}", [kr(g11a_rest)])],
          sol("Rettferdig premie er forventet utbetaling: sannsynligheten for skade ganget med tapet (manualen 17.2, "
              "H2024 oppgave 11).",
              [f"Forventet utbetaling: 5 % × {kr(L11)} = <b>kr {kr(fair11)}</b>."],
              [(f"Kr {kr(g11a_formue)}", f"5 % av hele formuen. Bare hytta kan brenne."),
               (f"Kr {kr(g11a_hel)}", "hele verdien. Sannsynligheten er glemt."),
               (f"Kr {kr(g11a_rest)}", f"5 % av formuen som er igjen etter brannen, {kr(W11 - L11)}. Forsikringen dekker hytta, "
                "ikke resten av formuen.")],
              f"Selskapet betaler {kr(L11)} i ett av tjue år. I snitt er det {kr(L11)}/20 = {kr(fair11)} i året. ✓"))
pb = ledd("b", "<p>Forsikringsselskapet lar Gunnhild velge hvor stor del av hytta hun forsikrer, til rettferdig pris. "
               "Hvilket utsagn er riktig?</p>",
          ("Hun forsikrer hele hytta, fordi hun da fjerner all risiko uten å tape noe i forventning", []),
          [("Hun er likegyldig, fordi premien er lik forventet tap uansett hvor mye hun forsikrer", []),
           ("Hun forsikrer under halve verdien, fordi premien er sikker mens brannen er usikker", []),
           ("Hun forsikrer hele hytta bare fordi nytten er ln W. Med √W ville hun valgt mindre", [])],
          sol("Til rettferdig pris er forventet formue den samme uansett dekning. En risikoavers person, med konkav "
              "nytte som ln W eller √W, foretrekker da den sikre formuen og forsikrer alt (manualen 17.2, H2024 "
              "oppgave 11b).",
              None,
              [("Likegyldig", "riktig for en risikonøytral person. Gunnhild er risikoavers fordi ln W er konkav."),
               ("Under halve verdien", "at premien er sikker, er nettopp det hun vil ha. Hun bytter usikkerhet mot "
                "sikkerhet uten å betale noe ekstra."),
               ("Bare fordi nytten er ln W", "gjelder enhver konkav nyttefunksjon, også √W.")],
              f"Med full dekning har hun {kr(W11 - fair11)} sikkert, som er lik forventet formue uten forsikring: "
              f"0,95 × {kr(W11)} + 0,05 × {kr(W11 - L11)} = {kr(W11 - fair11)}. ✓"))
pc = ledd("c", "<p>Hva er den høyeste premien Gunnhild er villig til å betale for full dekning? Rund av til nærmeste "
               "hundre kroner.</p>",
          (f"Kr {H(maxP11)}", [H(maxP11)]),
          [(f"Kr {kr(fair11)}", [kr(fair11)]),
           (f"Kr {H(g11c_risk)}", [H(g11c_risk)]),
           (f"Kr {H(g11c_lntap)}", [H(g11c_lntap)])],
          sol("Høyeste premie X gjør Gunnhild likegyldig: ln(W − X) = forventet nytte uten forsikring. W − X er "
              "sikkerhetsekvivalenten (manualen 17.3, H2019 oppgave 7a).",
              [f"Forventet nytte: 0,95 × ln {kr(W11)} + 0,05 × ln {kr(W11 - L11)} = {kr(EU11, 4)}.",
               f"Sikkerhetsekvivalent: e^{kr(EU11, 4)} = {kr(CE11)}.",
               f"X = {kr(W11)} − {kr(CE11)} = {kr(maxP11)}, altså <b>kr {H(maxP11)}</b>."],
              [(f"Kr {kr(fair11)}", "den rettferdige premien fra a. En risikoavers betaler mer."),
               (f"Kr {H(g11c_risk)}", "risikopremien alene, høyeste premie minus forventet tap."),
               (f"Kr {H(g11c_lntap)}", f"ln av tapet, ln {kr(L11)}, er brukt i den dårlige tilstanden i stedet for ln av "
                f"formuen som er igjen, ln {kr(W11 - L11)}.")],
              f"ln({kr(CE11)}) = {kr(math.log(CE11), 4)} = forventet nytte. ✓ Premien ligger over den rettferdige "
              f"{kr(fair11)}, som den skal for en risikoavers.",
              f"Høyeste premie må være høyere enn den rettferdige på {kr(fair11)}. Det stryker to alternativer uten "
              "regning. Mellom de to andre må du regne."))
EX.append(oppgave(11, "Forsikring av hytta med ln W", "Forsikring og forventet nytte", [17], body11, [pa, pb, pc]))

# ======================================================================= 12
print("\nOppgave 12: Fond, giring og to aksjer")
EK12, L12, rf12, EM12, sM12 = 800_000, 200_000, 0.04, 0.10, 0.20
w12 = (EK12 + L12) / EK12
E12 = rf12 + w12 * (EM12 - rf12)
s12 = w12 * sM12
g12_rente = (w12 * EM12, s12)                 # rentekostnaden glemt
g12_sigma = (E12, sM12)                       # standardavviket uendret
w12f = 1 + L12 / (EK12 + L12)                 # giringen regnet av det investerte beløpet
g12_w = (rf12 + w12f * (EM12 - rf12), w12f * sM12)
assert lik(E12, 0.115) and lik(s12, 0.25) and lik(w12f, 1.2)
# kontroll: kapitalmarkedslinjen
assert lik(E12, rf12 + (EM12 - rf12) / sM12 * s12)
# aksjene i c: rho = −1 gir sigma 0 ved w1 = s2/(s1 + s2)
mu1, s1, mu2, s2 = 0.08, 0.10, 0.04, 0.20
w0 = s2 / (s1 + s2)
assert lik(abs(w0 * s1 - (1 - w0) * s2), 0)
halv = abs(0.5 * s1 - 0.5 * s2)               # 5 % ved rho = −1
print(f"   giring {w12}, E {E12}, sigma {s12}; gale {g12_rente}, {g12_sigma}, {g12_w}; sigma 0 ved w1 = {w0:.4f}; "
      f"halvt om halvt {halv}")


def es(e, s):
    return (f"{pst(e, 1)} og {pst(s, 1)}", [pst(e, 1), pst(s, 1)])


body12 = "<p>Tre uavhengige spørsmål om fond og porteføljer.</p>"
pa = ledd("a", "<p>Forbrukerrådet (2018) sammenlignet norske aktivt forvaltede fond med indeks over 20 år. I hvilken "
               "kategori slo de aktive fondene indeks?</p>",
          ("Norske fond", []),
          [("Globale fond", []),
           ("Europeiske fond", []),
           ("Nordiske fond", [])],
          sol("Norske fondsforvaltere gjør det dårlig på internasjonale aksjer, men fond i norske aksjer har slått "
              "markedet de siste 20 årene. Årlig differanseavkastning: globale fond −0,89, europeiske −1,08, "
              "nordiske −3,48 og norske +0,86 prosentpoeng (F12 Aksjesparing lb 81).",
              None,
              [("Globale fond", "−0,89 prosentpoeng i året. Svakere enn indeks."),
               ("Europeiske fond", "−1,08 prosentpoeng i året. Svakere enn indeks."),
               ("Nordiske fond", "−3,48 prosentpoeng i året. Den svakeste kategorien.")],
              "Samme konklusjon som H2025 oppgave 16: aktive fond gjorde det svakere enn indeks unntatt på norske "
              "aksjer. ✓"))
pb = ledd("b", f"<p>Idun har kr {kr(EK12)}. Hun låner kr {kr(L12)} til risikofri rente 4 % og setter kr {kr(EK12 + L12)} "
               "i et globalt indeksfond, markedsporteføljen, med forventet avkastning 10 % og standardavvik 20 %. "
               f"Hva blir forventet avkastning og standardavvik på hennes egne kr {kr(EK12)}?</p>",
          es(E12, s12),
          [es(*g12_rente), es(*g12_sigma), es(*g12_w)],
          sol("Giring langs kapitalmarkedslinjen: med vekt w i markedsporteføljen er forventet avkastning rf + w × "
              "(E(rM) − rf) og standardavviket w × σM (F12 Aksjesparing lb 48–51, manualen 14.3).",
              [f"Vekt: {kr(EK12 + L12)}/{kr(EK12)} = {kr(w12, 2)}.",
               f"Forventet avkastning: 4 % + {kr(w12, 2)} × 6 % = {pst(E12, 1)}.",
               f"Standardavvik: {kr(w12, 2)} × 20 % = {pst(s12, 1)}. Svar: <b>{pst(E12, 1)} og {pst(s12, 1)}</b>."],
              [(es(*g12_rente)[0], "rentekostnaden på lånet er glemt: 1,25 × 10 %."),
               (es(*g12_sigma)[0], "standardavviket er uendret. Giring øker risikoen like mye som meravkastningen."),
               (es(*g12_w)[0], f"giringen er regnet som 1 + lån/investert beløp = {kr(w12f, 2)}.")],
              f"Kapitalmarkedslinjen: 4 % + (6 %/20 %) × {pst(s12, 1)} = {pst(E12, 1)}. Punktet ligger på linjen. ✓"))
pc = ledd("c", "<p>Aksje 1 har forventet avkastning 8 % og standardavvik 10 %. Aksje 2 har forventet avkastning 4 % og "
               "standardavvik 20 %. Korrelasjonen mellom dem er −1. Hvilket utsagn er riktig?</p>",
          ("Det finnes en portefølje med standardavvik 0, men den er ikke nødvendigvis optimal", ["0"]),
          [("Det kan aldri lønne seg å eie aksje 2, fordi aksje 1 har høyere forventning og lavere risiko", ["2", "1"]),
           ("Lavest mulig standardavvik får man ved å ha alt i aksje 1, som har lavest risiko", ["1"]),
           ("En portefølje med halvparten i hver aksje har standardavvik 15 %", ["15"])],
          sol("Med korrelasjon −1 kan risikoen fjernes helt: σp = |w × σ1 − (1 − w) × σ2|. Porteføljen med "
              "σ = 0 er likevel ikke nødvendigvis optimal, fordi mer i aksje 1 gir høyere forventet avkastning "
              "(F12 Aksjesparing lb 31–33, manualen 14.2).",
              [f"σ = 0 når w × 10 % = (1 − w) × 20 %, altså w = 20/30 = {pst(w0, 1)} i aksje 1.",
               f"Forventet avkastning der: {pst(w0, 1)} × 8 % + {pst(1 - w0, 1)} × 4 % = "
               f"{pst(w0 * mu1 + (1 - w0) * mu2, 2)}."],
              [("Aldri lønne seg å eie aksje 2", "diversifisering kan lønne seg selv når den ene aksjen er bedre på "
                "begge mål (F12 Aksjesparing lb 24–28). For en risikoavers kan litt av aksje 2 være optimalt."),
               ("Alt i aksje 1", "gjelder ved korrelasjon 1. Ved −1 er laveste standardavvik 0."),
               ("15 %", f"standardavvikene er vektet lineært, som ved korrelasjon 1. Ved −1 blir det "
                f"|5 % − 10 %| = {pst(halv, 0)}.")],
              "Ved korrelasjon −1 er minimum alltid 0. Vekten er σ2/(σ1 + σ2), ikke 50/50. ✓"))
EX.append(oppgave(12, "Indeksfond, giring og to aksjer med korrelasjon −1", "Porteføljevalg", [14], body12,
                  [pa, pb, pc]))

# ======================================================================= 13
print("\nOppgave 13: Oddveig velger mellom bank og aksjefond")
W13, r13, n13 = 300_000, 0.03, 15
Wg13, Wd13, k13 = 900_000, 250_000, 0.97
bank13 = W13 * (1 + r13) ** n13
Ub13 = math.log(bank13)
Uf13 = 0.5 * math.log(Wg13) + 0.5 * math.log(Wd13)
U_fv13 = math.log(0.5 * Wg13 + 0.5 * Wd13)
U_enkel13 = math.log(W13 * (1 + r13 * n13))
Uf_tap13 = 0.5 * math.log(Wg13) + 0.5 * k13 * math.log(Wd13)
Ub_tap13 = k13 * Ub13
Uf_begge13 = k13 * Uf13
assert Uf13 > Ub13 and Uf_tap13 < Ub13 and bank13 > W13 and Wd13 < W13 < Wg13
print(f"   bank {bank13:.0f}, U bank {Ub13:.5f}, U fond {Uf13:.5f}, ln E {U_fv13:.5f}, enkel {U_enkel13:.5f}; "
      f"tap: fond {Uf_tap13:.5f}, bank×0,97 {Ub_tap13:.5f}, begge {Uf_begge13:.5f}")
u3 = lambda x: kr(x, 3)


def bf(b, f, valg):
    return (f"Nytte bank {u3(b)} mot nytte aksjefond {u3(f)}: velger {valg}", [u3(b), u3(f)])


body13 = (f"<p>Oddveig skal spare kr {kr(W13)} i {n13} år og velger mellom bank og et aksjefond. Banken gir 3 % rente i "
          f"året. I aksjefondet har hun kr {kr(Wg13)} etter {n13} år med sannsynlighet 50 % og kr {kr(Wd13)} med "
          "sannsynlighet 50 %. Hun har nyttefunksjonen U(W) = ln W, der W er sluttverdien. Se bort fra skatt.</p>")
pa = ledd("a", "<p>Hva er forventet nytte i de to alternativene? Hva velger hun?</p>",
          bf(Ub13, Uf13, "aksjefondet"),
          [bf(Ub13, Uf_tap13, "banken"), bf(Ub13, U_fv13, "aksjefondet"), bf(U_enkel13, Uf13, "aksjefondet")],
          sol("Sammenlign forventet nytte, ikke forventet sluttverdi. Banken gir en sikker sluttverdi med rentes "
              "rente (manualen 17.2 og 18.2, H2022 oppgave 5).",
              [f"Bank: {kr(W13)} × 1,03^{n13} = {kr(bank13)}. ln {kr(bank13)} = {u3(Ub13)}.",
               f"Fond: 0,5 × ln {kr(Wg13)} + 0,5 × ln {kr(Wd13)} = 0,5 × {u3(math.log(Wg13))} + 0,5 × "
               f"{u3(math.log(Wd13))} = {u3(Uf13)}.",
               f"{u3(Uf13)} &gt; {u3(Ub13)}: <b>hun velger aksjefondet</b>."],
              [(bf(Ub13, Uf_tap13, "banken")[0], "svaret i b, med tapsaversjon. Her er det ingen tapsaversjon."),
               (bf(Ub13, U_fv13, "aksjefondet")[0], f"nytten av forventet sluttverdi, ln {kr(0.5 * Wg13 + 0.5 * Wd13)}. "
                "Det er ikke forventet nytte."),
               (bf(U_enkel13, Uf13, "aksjefondet")[0], f"banken med enkel rente: {kr(W13)} × (1 + 15 × 3 %) = "
                f"{kr(W13 * (1 + r13 * n13))}.")],
              f"Forventet sluttverdi i fondet er {kr(0.5 * Wg13 + 0.5 * Wd13)} mot {kr(bank13)} i banken. Fondet vinner "
              "også på nytte, men med liten margin. ✓"))
pb = ledd("b", f"<p>Anta nå at Oddveig har tapsaversjon med referansepunkt kr {kr(W13)}, det hun sparer. Nytten av utfall "
               "under referansepunktet ganges med 0,97. Hva er forventet nytte i de to alternativene? Hva velger "
               "hun nå?</p>",
          bf(Ub13, Uf_tap13, "banken"),
          [bf(Ub13, Uf13, "aksjefondet"), bf(Ub_tap13, Uf_tap13, "aksjefondet"), bf(Ub13, Uf_begge13, "banken")],
          sol("Tapsaversjon: utfall under referansepunktet vektes tyngre. Her ganges ln W med 0,97 bare for utfall "
              f"under kr {kr(W13)} (F16 Finansiell psykologi lb 28, manualen 18.2).",
              [f"Bare fondets dårlige utfall, {kr(Wd13)}, er under referansepunktet. Banken gir {kr(bank13)}.",
               f"Fond: 0,5 × {u3(math.log(Wg13))} + 0,5 × 0,97 × {u3(math.log(Wd13))} = {u3(Uf_tap13)}.",
               f"Bank: uendret {u3(Ub13)}. {u3(Ub13)} &gt; {u3(Uf_tap13)}: <b>hun velger banken</b>."],
              [(bf(Ub13, Uf13, "aksjefondet")[0], "svaret i a. Tapsaversjonen er ikke brukt."),
               (bf(Ub_tap13, Uf_tap13, "aksjefondet")[0], "faktoren er også brukt på banken, men banken gir aldri tap."),
               (bf(Ub13, Uf_begge13, "banken")[0], "faktoren er brukt på begge fondsutfallene. Det gode utfallet er "
                "en gevinst.")],
              "Valget snur: tapsaversjonen gjør det dårlige utfallet så mye verre at banken vinner. ✓"))
EX.append(oppgave(13, "Sparing med ln-nytte og tapsaversjon", "Sparing", [14, 18], body13, [pa, pb]))

# ======================================================================= 14
print("\nOppgave 14: Tjenestepensjon og delingstall")
pa = ledd("a", "<p>Elida kan velge mellom to jobber i privat sektor. Den ene har innskuddspensjon, den andre "
              "ytelsespensjon. Hvilket utsagn om de to ordningene er riktig?</p>",
          ("Dør hun før uttak, arves innskuddspensjonen av de etterlatte", []),
          [("Med ytelsespensjon bærer hun selv risikoen for lav avkastning på pensjonsmidlene", []),
           ("Slutter hun i jobben med innskuddspensjon, får hun en fripolise for det hun har tjent opp", []),
           ("Innskuddspensjon er en ferdig pakke der hun ikke kan påvirke hvordan pengene plasseres", [])],
          sol("Ved innskuddspensjon er innskuddet avtalt. Den ansatte velger plassering og bærer risikoen. "
              "Innskuddspensjonen arves av etterlatte ved dødsfall (F13 Pensjon lb 24, manualen 15.4).",
              None,
              [("Ytelsespensjon og risiko", "omvendt. Ved ytelsespensjon er utbetalingen avtalt og arbeidsgiveren bærer "
                "risikoen (F13 Pensjon lb 24)."),
               ("Fripolise", "fripolise får man fra privat ytelsespensjon. Fra innskuddspensjon får man et "
                "pensjonskapitalbevis (F13 Pensjon lb 29)."),
               ("Ferdig pakke", "ved innskuddspensjon bestemmer hun selv hvordan pengene investeres. «Ferdig pakke» "
                "beskriver offentlig tjenestepensjon (F13 Pensjon lb 24 og 27).")],
              "Spør hvem som har fått noe avtalt. Den som ikke har det, bærer risikoen. ✓"))
pb = ledd("b", "<p>Birgit er født i 1990 og har tjent opp en pensjonsbeholdning i folketrygden. Hun vurderer å ta ut "
              "alderspensjon som 63-åring i stedet for som 67-åring. Hva er riktig?</p>",
          ("Delingstallet er høyere ved 63 år, så hun får lavere årlig pensjon", ["63"]),
          [("Delingstallet er lavere ved 63 år, så hun får høyere årlig pensjon", ["63"]),
           ("Delingstallet er det samme, fordi det bare avhenger av forventet levealder for årskullet", []),
           ("Delingstallet er høyere ved 63 år, men hun får likevel høyere årlig pensjon", ["63"])],
          sol("Årlig pensjon er beholdningen delt på delingstallet. Tidlig uttak gir et høyere delingstall, fordi "
              "pensjonen skal vare flere år. Man får mer hvis man går senere av (F13 Pensjon lb 14 og 19).",
              None,
              [("Lavere ved 63 år", "omvendt. Forelesningens eksempel: 21,15 ved 62 år mot 17,08 ved 67 år "
                "(F13 Pensjon lb 19)."),
               ("Det samme", "delingstallet avhenger både av årskullet (levealdersjusteringen, F13 Pensjon lb 15) og av "
                "uttaksalderen."),
               ("Høyere og høyere pensjon", "pensjonen er beholdningen delt på delingstallet. Et høyere delingstall "
                "gir lavere pensjon.")],
              "Med forelesningens tall: 4 670 000/21,15 = 221 000 i året ved 62 år mot 4 670 000/17,08 = 273 000 ved "
              "67 år. ✓"))
EX.append(oppgave(14, "Innskudd mot ytelse og delingstallet", "Pensjon", [15],
                  "<p>To uavhengige spørsmål om pensjon.</p>", [pa, pb]))

# ======================================================================= 15
print("\nOppgave 15: Kristian og kredittkortgjelden")
L15, r15, m15 = 40_000, 0.015, 36
eff15 = (1 + r15) ** 12 - 1                   # effektiv årsrente 19,56 %
g15_nom = 12 * r15                            # nominell årsrente 18 %, eksponentiell vekst-bias
g15_tre = (1 + r15) ** m15 - 1                # veksten over tre år, ikke per år
g15_delt = g15_tre / 3                        # treårsveksten delt på tre
assert lik(float(rund(eff15 * 100, 2)), 19.56) and lik(g15_nom, 0.18)
print(f"   effektiv {eff15:.6f}; gale {g15_nom}, {g15_tre:.6f}, {g15_delt:.6f}")
body15 = (f"<p>Kristian har kr {kr(L15)} i kredittkortgjeld med 1,5 % rente per måned. Han betaler ingenting på tre "
          "år. Renten legges til gjelden hver måned.</p>")
p = ledd("", "<p>Hva er den effektive årlige renten på kredittkortgjelden? Svar med to desimaler.</p>",
         (pst(eff15), [pst(eff15)]),
         [(pst(g15_nom), [pst(g15_nom)]),
          (pst(g15_tre), [pst(g15_tre)]),
          (pst(g15_delt), [pst(g15_delt)])],
         sol("Legges renten til hver måned, får du rente på renten. Effektiv årsrente er (1 + månedsrenten)^12 − 1. "
             "Folk undervurderer denne veksten, eksponentiell vekst-bias (F15 Lån lb 21, manualen 16.3 og 18.4).",
             [f"Rentefaktor for ett år: 1,015^12 = {kr((1 + r15) ** 12, 4)}.",
              f"Effektiv årsrente: {kr((1 + r15) ** 12, 4)} − 1 = <b>{pst(eff15)}</b>."],
             [(pst(g15_nom), "nominell årsrente, 12 × 1,5 %. Renten på renten er glemt. Det er selve vekst-biasen."),
              (pst(g15_tre), "veksten over tre år, 1,015^36 − 1. Spørsmålet gjelder ett år."),
              (pst(g15_delt), "treårsveksten delt på tre. Rentes rente kan ikke deles likt på årene.")],
             f"Tre år med den effektive renten: 1,1956³ = {kr(((1 + r15) ** 12) ** 3, 4)} = 1,015^36. Gjelden blir "
             f"{kr(L15)} × {kr((1 + r15) ** m15, 4)} = {kr(L15 * (1 + r15) ** m15)}. ✓",
             "Den effektive renten må være høyere enn den nominelle på 18 %, men langt under veksten over tre år. "
             "Det stryker to alternativer. Regn 1,015^12 før du velger mellom de to som er igjen."))
EX.append(oppgave(15, "Effektiv rente på kredittkortgjeld", "Lån", [16, 18], body15, [p]))

# ======================================================================= 16
print("\nOppgave 16: Viljar og faren Halldor")
# Merton med humankapital: w = 50 % av totalformuen. Viljar har aksjelik humankapital (beta = 1),
# Halldor lite og risikofri. Andel av finansformuen: Viljar w − (1 − w)H/F < w ≤ Halldor w(F + H)/F.
wM, F16, HV, HA = 0.5, 1.0, 3.0, 0.2
andel_V = max(0.0, wM * (F16 + HV) - HV) / F16
andel_A = min(1.0, wM * (F16 + HA) / F16)
assert andel_A > andel_V
print(f"   eksempel: Viljar {andel_V}, Halldor {andel_A}")
body16 = ("<p>Viljar er 28 år og eiendomsmegler. Inntekten hans svinger i takt med aksjemarkedet (β = 1). Faren "
          "Halldor er 63 år og lektor med sikker lønn, men har bare noen få arbeidsår igjen. De har like stor "
          "finansformue og samme risikoaversjon. Mertons optimale andel av totalformuen i aksjer er 50 % for "
          "begge.</p>")
p = ledd("", "<p>Hvem bør ha høyest andel av finansformuen i aksjer?</p>",
         ("Halldor, fordi Viljars humankapital allerede virker som en stor aksjepost", []),
         [("Viljar, fordi unge har mest humankapital og derfor alltid bør ha høyest aksjeandel", []),
          ("Viljar, fordi aksjer blir mindre risikable jo lengre tidshorisonten er", []),
          ("De bør ha lik aksjeandel, fordi de har samme finansformue og samme risikoaversjon", [])],
         sol("Humankapitalen er en del av totalformuen. Varierer den med aksjemarkedet, er den allerede «aksjer». "
             "Da bør mer av finansformuen være risikofri. Er den sikker, virker den som et bankinnskudd (F12 "
             "Aksjesparing lb 14–15 og 92).",
             ["Viljar: aksjeandel av finansformuen = 50 % − 50 % × H/F. Med stor humankapital blir den lav, ofte 0.",
              "Halldor: liten og sikker humankapital gir 50 % × (F + H)/F, litt over 50 %.",
              "<b>Halldor bør ha høyest andel.</b>"],
             [("Unge alltid høyest", "tommelfingerregelen gjelder sikker humankapital. Forelesningen sier: «Eldre, "
               "eller hvis jobben korrelerer med markedet → lavere aksjeandel» (F12 Aksjesparing lb 92)."),
              ("Lang horisont", "selvhjelpsbøkenes begrunnelse. Økonomer er ikke enige i at risikoen faller med "
               "horisonten (F12 Aksjesparing lb 19)."),
              ("Lik andel", "Merton uten humankapital. Med humankapital avhenger andelen av hvor stor og hvor "
               "risikabel den er.")],
             f"Eksempel med F = 1: Viljar med H = 3 får {pst(andel_V, 0)}, Halldor med H = 0,2 får {pst(andel_A, 0)}. ✓",
             "To alternativer peker på Viljar. Les hva teksten sier om risikoen i inntekten hans før du velger."))
EX.append(oppgave(16, "Humankapital: ung med risikabel inntekt mot eldre med sikker", "Porteføljevalg", [14],
                  body16, [p]))

# ======================================================================= settet
SETT = {
    "id": "prove14",
    "kind": "mock",
    "label": "Prøveeksamen 14",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Rotasjonen i prediksjonen for 12. november: GS sin H2024-blokk og Næss sin porteføljeblokk, på "
             "H2025-nivå. Oppgave 1–10 er skattedelen (18 ledd): skjerming per aksje over tre år, faktoren som gir en "
             "bestemt samlet sats, negativ nettoformue, formuesskatt på aksjer med bunnfradrag, ∂P/∂t og to "
             "grensetilfeller, implisitt skatt, trinnskatt, straksfradrag, inntektsskifting baklengs og "
             "fritaksmetoden i en kjede. Oppgave 11–16 er finansdelen (12 ledd): forsikring med ln W, giring og "
             "korrelasjon −1, sparing med tapsaversjon, pensjon, kredittkortgjeld og humankapital."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort. Noen er forenklet som i H2025 og teksten sier fra.",
        "Laget av appen som en av tre prediksjoner for eksamen 2026. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Skriv ned mellomtallene i skjermings- og formuesskattekjedene før du ser på alternativene. De "
                     "gale alternativene er nettopp mellomtallene."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove14.json")
with open(ut, "w", encoding="utf8") as f:
    json.dump(SETT, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"\nSkrev {ut}")

# ======================================================================= kontroll
print("\nKontroll")
S = json.load(open(ut, encoding="utf8"))
raw = open(ut, encoding="utf8").read()
feil = []

# 1. fasitplan, struktur og poeng
alle = []
for e in S["exercises"]:
    L = e["parts"] if e.get("parts") else [e]
    assert e["points"] == 3 * len(L), e["n"]
    for p_ in L:
        alle.append((e, p_))
svar = [p_["answer"] for _, p_ in alle]
if len(alle) != 30:
    feil.append(f"{len(alle)} ledd, ikke 30")
if svar != PLAN:
    feil.append(f"avvik fra fasitplanen: {[i + 1 for i, (a, b) in enumerate(zip(svar, PLAN)) if a != b]}")
if sum(3 for _ in alle) != S["points"]:
    feil.append("poengsummen går ikke opp")
for e, p_ in alle:
    o = p_["options"]
    if len(o) != 4 or len(set(o)) != 4:
        feil.append(f"oppgave {e['n']}{p_.get('label', '')}: ikke fire ulike alternativer")

# 2. skriveregler
if "—" in raw:
    feil.append("tankestrek (—) i fila")
if re.search(r",\s*og\b", raw):
    feil.append("komma foran «og»: " + str(re.findall(r".{30},\s*og\b.{10}", raw)[:3]))
tekster = []


def samle(x):
    if isinstance(x, str):
        tekster.append(x)
    elif isinstance(x, list):
        for y in x:
            samle(y)
    elif isinstance(x, dict):
        for y in x.values():
            samle(y)


samle(S)
if any(re.search(r"(?<![\w(])-\d", re.sub(r"<[^>]+>", " ", x)) for x in tekster):
    feil.append("bindestrek brukt som minustegn")

# 3. tallene i alternativene er de skriptet regnet, og ingen andre
TALL = re.compile(r"−?\d{1,3}(?:[  ]\d{3})*(?:,\d+)?")


def tall_i(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return TALL.findall(s)


for rad in LEDD:
    p_ = rad["del"]
    for i, (o, forv) in enumerate(zip(p_["options"], rad["tall"])):
        for t in forv:
            t = t.replace(" %", "")
            if not re.search(r"\d", t):
                if t not in o:
                    feil.append(f"ledd {rad['nr']} alt {i}: mangler «{t}»")
                continue
            if t not in tall_i(o):
                feil.append(f"ledd {rad['nr']} alt {i}: tallet {t} står ikke i «{o}»")
        ekstra = [t for t in tall_i(o) if t not in [x.replace(" %", "") for x in forv]]
        if ekstra:
            feil.append(f"ledd {rad['nr']} alt {i}: tall som ikke er regnet: {ekstra} i «{o}»")

# 4. kalibrering (samme mål som tools/sjekk-prove.js)


def strip(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = re.sub(r"&[a-z]+;", " ", s)
    return re.sub(r"\s+", " ", s).strip()


ordsum, tallledd, lengst, tekst = 0.0, 0, 0, 0
pos = {"størst": 0, "minst": 0, "midten": 0}


for e in S["exercises"]:
    L = e["parts"] if e.get("parts") else [e]
    felles = len(strip(e.get("body", "")).split(" "))
    for p_ in L:
        ordsum += felles if p_ is e else felles / len(L) + len(strip(p_["body"]).split(" "))
        o = p_["options"]
        if all(re.search(r"\d", strip(x)) and len(strip(x)) < 40 for x in o):
            tallledd += 1
            v = [float(re.search(r"-?\d+(?:,\d+)?", re.sub(r"\s(?=\d{3}\b)", "", strip(x)).replace("−", "-")).group(0)
                       .replace(",", ".")) for x in o]
            s_ = sorted(v)
            if v[p_["answer"]] == s_[3]:
                pos["størst"] += 1
            elif v[p_["answer"]] == s_[0]:
                pos["minst"] += 1
            else:
                pos["midten"] += 1
        else:
            tekst += 1
            ln = [len(strip(x)) for x in o]
            if ln[p_["answer"]] == max(ln) and ln.count(max(ln)) == 1:
                lengst += 1
                print(f"   NB: riktig er lengst i {e['n']}{p_.get('label', '')}")
ord_per_ledd = ordsum / len(alle)
andel_tall = tallledd / len(alle)
print(f"   {len(S['exercises'])} oppgaver, {len(alle)} ledd, {S['points']} poeng")
print(f"   fasit A–D: {'/'.join(str(svar.count(k)) for k in range(4))}")
print(f"   ord per ledd: {ord_per_ledd:.1f} (mål 38–50)")
print(f"   ledd med tallsvar: {tallledd} = {andel_tall * 100:.0f} % (mål 55–65 %)")
print(f"   tekstledd {tekst}: riktig er lengst i {lengst} ({lengst / tekst * 100:.0f} %, tilfeldig ≈ 25 %)")
print(f"   tallledd: riktig er størst {pos['størst']}, minst {pos['minst']}, i midten {pos['midten']}")
if not 38 <= ord_per_ledd <= 50:
    feil.append(f"ord per ledd {ord_per_ledd:.1f} utenfor 38–50")
if not 0.55 <= andel_tall <= 0.65:
    feil.append(f"andel tallsvar {andel_tall:.2f} utenfor 55–65 %")
if lengst / tekst > 0.3:
    feil.append("riktig alternativ er for ofte det lengste")

if feil:
    print("\nFEIL:")
    for x in feil:
        print("  " + x)
    raise SystemExit(1)
print("\nIngen feil.")
