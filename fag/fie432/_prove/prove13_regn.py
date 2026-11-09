"""Prøveeksamen 13 (FIE432): regner alle tall, bygger prove13.json og sjekker den.

Hovedprediksjonen for eksamen 12. november 2026 (docs/fie432-proveeksamen-spek.md,
«Prøveeksamen 13: hovedprediksjonen»): det mest sannsynlige settet, oppgave for oppgave.

Kjør:  python3 -I fag/fie432/_prove/prove13_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p13) sier,
3. skriver prove13.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p13"]
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

TALL = re.compile(r"−?\d{1,3}(?:[  ]\d{3})*(?:,\d+)?")


def tall_i(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return TALL.findall(s)


def B(tekst):
    """Tekstalternativ: tallene i teksten er de som skal stå der (fakta fra lysbildene)."""
    return (tekst, tall_i(tekst))


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


def K(x, d=0):
    """Alternativ i kroner: tekst og tallet som skal stå der."""
    return (f"Kr {kr(x, d)}", [kr(x, d)])


def P(x, d=2):
    """Alternativ i prosent."""
    return (pst(x, d), [pst(x, d)])


EX = []

# ======================================================================= 1
print("\nOppgave 1: Reidun og aksjene i Hamarøy Laks ASA (skjermingskjeden over tre år)")
K1 = 60_000
r1 = [0.03, 0.04, 0.025]
D1 = [1_200, 4_000, 3_200]
skj1 = K1 * r1[0]                                   # 1 800
ub1 = max(0.0, skj1 - D1[0])                        # 600 framføres
skpl1 = max(0.0, D1[0] - skj1)                      # 0
grl2 = K1 + ub1                                     # 60 600
skj2 = grl2 * r1[1]                                 # 2 424
skpl2 = max(0.0, D1[1] - skj2 - ub1)                # 976
ub2 = max(0.0, ub1 + skj2 - D1[1])                  # 0: alt er brukt
grl3 = K1 + ub2                                     # 60 000: tilbake til kostprisen
skj3 = grl3 * r1[2]                                 # 1 500
skpl3 = max(0.0, D1[2] - skj3 - ub2)                # 1 700
skatt1 = (skpl1 + skpl2 + skpl3) * TE               # 1 012,60
assert lik(ub1, 600) and lik(skpl2, 976) and lik(ub2, 0) and lik(skpl3, 1700)
# gale, a
g1a_grl = D1[1] - K1 * r1[1] - ub1                  # grunnlaget ikke økt: 1 000
g1a_trekk = D1[1] - skj2                            # ub lagt til grunnlaget, men ikke trukket fra: 1 576
g1a_glemt = D1[1] - K1 * r1[1]                      # ub glemt helt: 1 600
# gale, b
g1b_grl = D1[2] - grl2 * r1[2]                      # grunnlaget holdt på 60 600: 1 685
g1b_igjen = D1[2] - skj3 - ub1                      # de 600 trukket fra en gang til: 1 100
g1b_rente = D1[2] - K1 * r1[1]                      # fjorårets rente: 800
# gale, c
g1c_aar3 = skpl3 * TE                               # bare år 3: 643,28
g1c_opp = (skpl2 + skpl3) * 0.22                    # oppjustering glemt: 588,72
g1c_b = (skpl2 + g1b_grl) * TE                      # følgefeil fra b: 1 006,92
assert lik(g1a_grl, 1000) and lik(g1a_trekk, 1576) and lik(g1b_grl, 1685) and lik(g1b_igjen, 1100)
print(f"   a {skpl2}: {g1a_grl}, {g1a_trekk}, {g1a_glemt}; b {skpl3}: {g1b_grl}, {g1b_igjen}, {g1b_rente}; "
      f"c {skatt1:.4f}: {g1c_aar3:.4f}, {g1c_opp:.4f}, {g1c_b:.4f}")
body1 = (f"<p>Reidun kjøpte 400 aksjer i Hamarøy Laks ASA i januar år 1 for til sammen kr {kr(K1)}, som er kostprisen. "
         "Hun eier aksjene personlig og har dem ved utgangen av hvert år. I år 1 mottar hun kr "
         f"{kr(D1[0])} i utbytte og skjermingsrenten er 3 %.</p>")
pa = ledd("a", f"<p>I år 2 er skjermingsrenten 4 % og Reidun mottar kr {kr(D1[1])} i utbytte. Hva er skattepliktig "
               "utbytte i år 2?</p>",
          K(skpl2),
          [K(g1a_grl), K(g1a_trekk), K(g1a_glemt)],
          sol("Skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente. Er utbyttet mindre enn "
              "skjermingen, framføres resten. Den ubenyttede skjermingen gjør to ting året etter: den legges til "
              "grunnlaget og den trekkes fra utbyttet i tillegg til årets fradrag (manualen 5.3).",
              [f"År 1: skjerming {kr(K1)} × 3 % = {kr(skj1)}. Utbyttet er {kr(D1[0])}, så {kr(ub1)} framføres.",
               f"År 2: grunnlaget er {kr(K1)} + {kr(ub1)} = {kr(grl2)}. Skjerming {kr(grl2)} × 4 % = {kr(skj2)}.",
               f"Skattepliktig: {kr(D1[1])} − {kr(skj2)} − {kr(ub1)} = <b>kr {kr(skpl2)}</b>."],
              [(f"Kr {kr(g1a_grl)}", f"de {kr(ub1)} er trukket fra, men ikke lagt til grunnlaget: årets skjerming er "
                f"regnet som {kr(K1)} × 4 % = {kr(K1 * r1[1])}."),
               (f"Kr {kr(g1a_trekk)}", f"grunnlaget er økt til {kr(grl2)}, men de {kr(ub1)} er ikke trukket fra "
                "utbyttet."),
               (f"Kr {kr(g1a_glemt)}", f"den ubenyttede skjermingen er glemt helt: {kr(D1[1])} − {kr(K1 * r1[1])}.")],
              f"Samlet skjerming i år 1 og 2 er {kr(skj1)} + {kr(skj2)} = {kr(skj1 + skj2)}. Samlet utbytte er "
              f"{kr(D1[0] + D1[1])}. Differansen {kr(D1[0] + D1[1] - skj1 - skj2)} kommer i år 2, fordi all skjerming "
              "er brukt da. ✓"))
pb = ledd("b", f"<p>I år 3 er skjermingsrenten 2,5 % og Reidun mottar kr {kr(D1[2])} i utbytte. Hva er skattepliktig "
               "utbytte i år 3?</p>",
          K(skpl3),
          [K(g1b_grl), K(g1b_igjen), K(g1b_rente)],
          sol("Grunnlaget er kostprisen pluss ubenyttet skjerming fra året før. Skjerming som er brukt, er ikke lenger "
              "ubenyttet. Da faller grunnlaget tilbake til kostprisen (manualen 5.3).",
              [f"I år 2 dekket utbyttet både årets skjerming og de {kr(ub1)} som var framført. Ubenyttet skjerming ved "
               "utgangen av år 2 er 0.",
               f"År 3: grunnlaget er {kr(grl3)}. Skjerming {kr(grl3)} × 2,5 % = {kr(skj3)}.",
               f"Skattepliktig: {kr(D1[2])} − {kr(skj3)} = <b>kr {kr(skpl3)}</b>."],
              [(f"Kr {kr(g1b_grl)}", f"grunnlaget er holdt på {kr(grl2)} fra år 2: {kr(D1[2])} − {kr(grl2)} × 2,5 %. "
                "Den framførte skjermingen ble brukt opp i år 2."),
               (f"Kr {kr(g1b_igjen)}", f"de {kr(ub1)} fra år 1 er trukket fra en gang til. De ble brukt i år 2."),
               (f"Kr {kr(g1b_rente)}", f"skjermingsrenten fra år 2 er brukt: {kr(D1[2])} − {kr(K1)} × 4 %.")],
              f"Over tre år er samlet skjerming {kr(skj1)} + {kr(skj2)} + {kr(skj3)} = {kr(skj1 + skj2 + skj3)} og samlet "
              f"utbytte {kr(sum(D1))}. Differansen er {kr(sum(D1) - skj1 - skj2 - skj3)} = {kr(skpl2)} + {kr(skpl3)}. ✓",
              f"{kr(skpl3)} og {kr(g1b_grl)} ligger tett. Spør om det fantes ubenyttet skjerming ved inngangen til år 3. "
              "Fantes det ikke, er grunnlaget kostprisen."))
pc = ledd("c", "<p>Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye eierskatt betaler Reidun til sammen på "
               "utbyttene i de tre årene? Svar med to desimaler.</p>",
          K(skatt1, 2),
          [K(g1c_aar3, 2), K(g1c_opp, 2), K(g1c_b, 2)],
          sol("Eierskatten er skattepliktig utbytte ganget med 1,72 og deretter med 22 %, altså 37,84 % av grunnlaget "
              "(manualen 5.1).",
              [f"Skattepliktig utbytte: år 1 kr 0, år 2 kr {kr(skpl2)} og år 3 kr {kr(skpl3)}. Til sammen "
               f"{kr(skpl2 + skpl3)}.",
               f"Oppjustert: {kr(skpl2 + skpl3)} × 1,72 = {kr((skpl2 + skpl3) * 1.72, 2)}.",
               f"Eierskatt: {kr((skpl2 + skpl3) * 1.72, 2)} × 22 % = <b>kr {kr(skatt1, 2)}</b>."],
              [(f"Kr {kr(g1c_aar3, 2)}", f"bare år 3: {kr(skpl3)} × 37,84 %. Utbyttet i år 2 er også skattepliktig."),
               (f"Kr {kr(g1c_opp, 2)}", f"oppjusteringen er glemt: {kr(skpl2 + skpl3)} × 22 %."),
               (f"Kr {kr(g1c_b, 2)}", f"følgefeilen fra b: ({kr(skpl2)} + {kr(g1b_grl)}) × 37,84 %.")],
              f"Regn med den effektive satsen: {kr(skpl2 + skpl3)} × 37,84 % = {kr(skatt1, 2)}. ✓"))
EX.append(oppgave(1, "Skjermingsfradrag over tre år", "Skjerming", [5], body1, [pa, pb, pc]))

# ======================================================================= 2
print("\nOppgave 2: Arnfinn selger aksjen i Sortland Mekaniske ASA")
K2, S2 = 250.0, 330.0
r2 = [0.03, 0.04]
ub2a = K2 * r2[0]                                   # 7,50
ub2b = (K2 + ub2a) * r2[1]                          # 10,30
ub2_sum = ub2a + ub2b                               # 17,80
gev2 = S2 - K2 - ub2_sum                            # 62,20
a2 = gev2 * TE                                      # 23,54
g2_grl = (S2 - K2 - (ub2a + K2 * r2[1])) * TE       # år 2-skjermingen regnet av kostprisen: 23,65
g2_glemt = (S2 - K2) * TE                           # ubenyttet skjerming glemt: 30,27
g2_opp = gev2 * 0.22                                # oppjustering glemt: 13,68
assert lik(ub2_sum, 17.8) and lik(gev2, 62.2) and kr(a2, 2) == "23,54"
print(f"   ub {ub2_sum}, gevinst {gev2}, skatt {a2:.4f}; gale {g2_grl:.4f}, {g2_glemt:.4f}, {g2_opp:.4f}")
p = ledd("", f"<p>Arnfinn kjøpte én aksje i Sortland Mekaniske ASA for kr {kr(K2)} i januar år 1. Selskapet betalte ikke "
             "utbytte i år 1 eller år 2. Skjermingsrenten var 3 % i år 1 og 4 % i år 2. I mars år 3 selger Arnfinn "
             f"aksjen for kr {kr(S2)}. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye skatt betaler han på "
             "gevinsten? Svar med to desimaler.</p>",
         K(a2, 2),
         [K(g2_grl, 2), K(g2_glemt, 2), K(g2_opp, 2)],
         sol("Skattepliktig gevinst er salgspris minus kostpris minus ubenyttet skjerming. Skjermingen fra år 1 legges til "
             "grunnlaget i år 2, så den ubenyttede skjermingen vokser med renten. I salgsåret gis ingen ny skjerming, "
             "fordi skjermingen går til den som eier aksjen ved årets slutt. Gevinsten oppjusteres med 1,72 og "
             "skattlegges med 22 % (manualen 5.3 og 5.4).",
             [f"År 1: {kr(K2)} × 3 % = {kr(ub2a, 2)} i ubenyttet skjerming.",
              f"År 2: ({kr(K2)} + {kr(ub2a, 2)}) × 4 % = {kr(ub2b, 2)}. Samlet ubenyttet skjerming er {kr(ub2_sum, 2)}.",
              f"Gevinst: {kr(S2)} − {kr(K2)} − {kr(ub2_sum, 2)} = {kr(gev2, 2)}. Skatt: {kr(gev2, 2)} × 37,84 % = "
              f"<b>kr {kr(a2, 2)}</b>."],
             [(f"Kr {kr(g2_grl, 2)}", f"skjermingen i år 2 er regnet av kostprisen: {kr(K2)} × 4 % = 10,00. Gevinsten "
               f"blir {kr(S2 - K2 - ub2a - K2 * r2[1], 2)}."),
              (f"Kr {kr(g2_glemt, 2)}", f"den ubenyttede skjermingen er glemt: {kr(S2 - K2)} × 37,84 %."),
              (f"Kr {kr(g2_opp, 2)}", f"oppjusteringen er glemt: {kr(gev2, 2)} × 22 %.")],
             f"La grunnlaget vokse med skjermingsrentene: {kr(K2)} × 1,03 × 1,04 = {kr(K2 * 1.03 * 1.04, 2)}. Det er "
             f"kostprisen pluss {kr(ub2_sum, 2)} i skjerming. {kr(S2)} − {kr(K2 * 1.03 * 1.04, 2)} = {kr(gev2, 2)}. ✓",
             f"Glemt oppjustering gir det laveste tallet og glemt skjerming det høyeste. Stryk dem. Da avgjør grunnlaget i "
             f"år 2 mellom {kr(a2, 2)} og {kr(g2_grl, 2)}."))
EX.append(oppgave(2, "Gevinst etter to år uten utbytte", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Vigdis og Fjordkant AS (selskapsskatt og eierskatt)")
X3, KP3, rs3 = 500_000, 2_500_000, 0.03
sel3 = X3 * 0.22                                    # 110 000
utb3 = X3 - sel3                                    # 390 000
skj3_ = KP3 * rs3                                   # 75 000
eier3 = (utb3 - skj3_) * TE                         # 119 196
a3 = sel3 + eier3                                   # 229 196
g3_skj = sel3 + utb3 * TE                           # skjerming glemt: 257 576
g3_opp = sel3 + (utb3 - skj3_) * 0.22               # oppjustering glemt: 179 300
g3_eier = eier3                                     # bare eierskatten
assert lik(a3, 229_196) and lik(g3_skj, 257_576) and lik(g3_opp, 179_300)
print(f"   selskapsskatt {sel3}, eierskatt {eier3}, samlet {a3}; gale {g3_skj}, {g3_opp}, {g3_eier}")
p = ledd("", f"<p>Vigdis eier alle aksjene i Fjordkant AS personlig. Aksjene kostet kr {kr(KP3)}. Selskapet har et "
             f"skattbart overskudd på kr {kr(X3)}. Selskapsskatten er 22 %, oppjusteringsfaktoren 1,72 og den nominelle "
             "eierskatten 22 %. Skjermingsrenten er 3 %. Etter at selskapsskatten er betalt, tar Vigdis resten ut som "
             "utbytte. Hvor mye betales i selskapsskatt og eierskatt til sammen?</p>",
         K(a3),
         [K(g3_skj), K(g3_opp), K(g3_eier)],
         sol("Overskuddet skattlegges to ganger. Først betaler selskapet 22 %. Det som er igjen, deles ut. Eierskatten "
             "treffer utbyttet minus skjermingsfradraget, oppjustert med 1,72 (manualen 5.1 og 9.3).",
             [f"Selskapsskatt: {kr(X3)} × 22 % = {kr(sel3)}. Utbytte: {kr(utb3)}.",
              f"Skjerming: {kr(KP3)} × 3 % = {kr(skj3_)}. Skattepliktig utbytte: {kr(utb3 - skj3_)}.",
              f"Eierskatt: {kr(utb3 - skj3_)} × 37,84 % = {kr(eier3)}. Til sammen: {kr(sel3)} + {kr(eier3)} = "
              f"<b>kr {kr(a3)}</b>."],
             [(f"Kr {kr(g3_skj)}", f"skjermingen er glemt: {kr(utb3)} × 37,84 % = {kr(utb3 * TE)} i eierskatt. Det er "
               "51,52 % av overskuddet, satsen uten skjerming."),
              (f"Kr {kr(g3_opp)}", f"oppjusteringen er glemt: {kr(utb3 - skj3_)} × 22 % = {kr((utb3 - skj3_) * 0.22)}."),
              (f"Kr {kr(g3_eier)}", "bare eierskatten. Spørsmålet gjelder begge skattene.")],
             f"Satsformelen fra manualen 9.3: 22 % + ({kr(utb3 - skj3_)}/{kr(X3)}) × 37,84 % = {pst(a3 / X3)}. "
             f"{pst(a3 / X3)} × {kr(X3)} = {kr(a3)}. ✓",
             f"Uten skjerming blir samlet skatt {kr(g3_skj)}, 51,52 % av overskuddet. Med skjerming må svaret ligge under det, "
             f"men over selskapsskatten alene, {kr(sel3)}. Det stryker {kr(g3_skj)} og {kr(g3_eier)}."))
EX.append(oppgave(3, "Selskapsskatt og eierskatt på samme overskudd", "Effektiv skattesats", [5, 9], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Margit og formuen med en dyr primærbolig")
BOL4, AKS4, BANK4, GJ4 = 18_000_000, 6_000_000, 1_000_000, 10_000_000
TAK4 = 14_000_000
fv_bol4 = 0.25 * TAK4 + 0.70 * (BOL4 - TAK4)        # 6 300 000
fv_aks4 = 0.80 * AKS4                               # 4 800 000
brutto4 = fv_bol4 + fv_aks4 + BANK4                 # 12 100 000
mv4 = BOL4 + AKS4 + BANK4                           # 25 000 000
gj_aks4 = GJ4 * AKS4 / mv4                          # 2 400 000
red4 = gj_aks4 * 0.20                               # 480 000
netto4 = brutto4 - (GJ4 - red4)                     # 2 580 000
g4a_25 = 0.25 * BOL4 + fv_aks4 + BANK4 - (GJ4 - red4)          # 25 % på hele boligen: 780 000
g4a_full = 0.25 * TAK4 + (BOL4 - TAK4) + fv_aks4 + BANK4 - (GJ4 - red4)   # delen over 14 mill. fullt: 3 780 000
g4a_red = brutto4 - GJ4                             # gjeldsreduksjonen glemt: 2 100 000
BF4 = 1_900_000
fs4 = max(0.0, netto4 - BF4) * 0.01                 # 6 800
g4b_bf = netto4 * 0.01                              # bunnfradraget glemt: 25 800
g4b_red = max(0.0, g4a_red - BF4) * 0.01            # følgefeil uten gjeldsreduksjon: 2 000
g4b_25 = max(0.0, g4a_25 - BF4) * 0.01              # følgefeil 25 % på hele boligen: 0
assert lik(fv_bol4, 6_300_000) and lik(netto4, 2_580_000) and lik(fs4, 6_800) and lik(g4b_25, 0)
assert lik(g4a_25, 780_000) and lik(g4a_full, 3_780_000) and lik(g4a_red, 2_100_000)
print(f"   bolig {fv_bol4}, brutto {brutto4}, reduksjon {red4}, netto {netto4}; gale {g4a_25}, {g4a_full}, {g4a_red}")
print(f"   formuesskatt {fs4}; gale {g4b_bf}, {g4b_red}, {g4b_25}")
body4 = (f"<p>Margit er enslig. Ved utgangen av 2026 eier hun en primærbolig med markedsverdi kr {kr(BOL4)}, børsnoterte "
         f"aksjer for kr {kr(AKS4)} og kr {kr(BANK4)} i banken. Gjelden er kr {kr(GJ4)}. Primærboligen verdsettes til 25 % "
         f"av verdien opp til kr {kr(TAK4)} og 70 % av verdien over. Aksjene verdsettes til 80 % og bankinnskuddet til "
         "100 %. Gjelden fordeles forholdsmessig etter markedsverdiene. Gjeld som faller på aksjene, reduseres med "
         "aksjerabatten. Gjeld som faller på boligen og banken, reduseres ikke.</p>")
pa = ledd("a", "<p>Hva er Margits skattepliktige nettoformue?</p>",
          K(netto4),
          [K(g4a_25), K(g4a_full), K(g4a_red)],
          sol("Hver eiendel får sin formuesverdi. Primærboligen har to satser: 25 % opp til 14 mill. og 70 % av resten. "
              "Gjelden fordeles etter markedsverdiene før rabatt. Bare gjelden som faller på aksjene, reduseres. "
              "Den reduseres med aksjerabatten på 20 % (manualen 7.2 og 7.4).",
              [f"Formuesverdier: bolig {kr(TAK4)} × 25 % + {kr(BOL4 - TAK4)} × 70 % = {kr(fv_bol4)}. Aksjer "
               f"{kr(fv_aks4)}. Bank {kr(BANK4)}. Sum {kr(brutto4)}.",
               f"Aksjenes andel av markedsverdien er {kr(AKS4)}/{kr(mv4)} = 24 %. Gjeld på aksjene {kr(gj_aks4)}, "
               f"redusert med 20 % = {kr(red4)}. Fradragsberettiget gjeld {kr(GJ4 - red4)}.",
               f"Nettoformue: {kr(brutto4)} − {kr(GJ4 - red4)} = <b>kr {kr(netto4)}</b>."],
              [(f"Kr {kr(g4a_25)}", f"boligen er verdsatt til 25 % av hele markedsverdien, {kr(0.25 * BOL4)}. Delen over "
                "14 mill. teller med 70 %."),
               (f"Kr {kr(g4a_full)}", f"delen over 14 mill. er tatt med fullt, {kr(BOL4 - TAK4)}, i stedet for 70 %."),
               (f"Kr {kr(g4a_red)}", "gjeldsreduksjonen er glemt. Teksten sier at gjelden på aksjene skal reduseres.")],
              f"Uten gjeldsreduksjon er nettoformuen {kr(g4a_red)}. Reduksjonen løfter den med {kr(red4)} til "
              f"{kr(netto4)}. ✓",
              "Gjeldsreduksjonen kan bare løfte nettoformuen med 20 % av aksjegjelden. Regn den for seg, så ser du om "
              "et alternativ har brukt den."))
pb = ledd("b", f"<p>Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr {kr(BF4)} og 1,1 % over kr 21 500 000. "
               "Hvor mye formuesskatt betaler Margit?</p>",
          K(fs4),
          [K(g4b_bf), K(g4b_red), K(g4b_25)],
          sol("Formuesskatten treffer nettoformuen over bunnfradraget. Satsen på 1,1 % gjelder bare den delen som er over "
              "21,5 mill., så den brukes ikke her (manualen 7.1).",
              [f"Nettoformue fra a: {kr(netto4)}.",
               f"Over bunnfradraget: {kr(netto4)} − {kr(BF4)} = {kr(netto4 - BF4)}.",
               f"Formuesskatt: {kr(netto4 - BF4)} × 1,0 % = <b>kr {kr(fs4)}</b>."],
              [(f"Kr {kr(g4b_bf)}", f"bunnfradraget er glemt: {kr(netto4)} × 1,0 %."),
               (f"Kr {kr(g4b_red)}", f"følgefeil uten gjeldsreduksjon: ({kr(g4a_red)} − {kr(BF4)}) × 1,0 %."),
               ("Kr 0", f"følgefeil med boligen til 25 % av hele verdien: nettoformuen blir {kr(g4a_25)}, under "
                "bunnfradraget.")],
              f"{kr(fs4)}/{kr(netto4 - BF4)} = 1,0 %. ✓"))
EX.append(oppgave(4, "Nettoformue og formuesskatt med en dyr primærbolig", "Formuesskatt", [7], body4, [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: Steinar og Nesodden Verft AS (utbytte til formuesskatten)")
FV5, BF5 = 9_600_000, 1_900_000                     # formuesverdien er oppgitt etter rabatten
F5 = (FV5 - BF5) * 0.01                             # 77 000
a5 = F5 / (1 - TE)                                  # 123 874
g5_opp = F5 * (1 + TE)                              # skatten lagt oppå: 106 137
g5_bf = FV5 * 0.01 / (1 - TE)                       # bunnfradraget glemt: 154 440
g5_oppj = F5 / (1 - 0.22)                           # oppjusteringen glemt: 98 718
assert lik(F5, 77_000) and kr(a5) == "123 874"
print(f"   formuesskatt {F5}, utbytte {a5:.2f}; gale {g5_opp:.2f}, {g5_bf:.2f}, {g5_oppj:.2f}")
p = ledd("", f"<p>Steinar eier alle aksjene i Nesodden Verft AS. Aksjene har en formuesverdi på kr {kr(FV5)} etter "
             f"verdsettingsrabatten. Han har ingen annen formue og ingen gjeld. Formuesskatten er 1,0 % av nettoformuen over "
             f"bunnfradraget på kr {kr(BF5)}. Steinar har ingen annen likviditet og må ta et utbytte som dekker både "
             "formuesskatten og eierskatten på utbyttet. Eierskatten er 22 % med oppjusteringsfaktor 1,72. Se bort fra "
             "skjerming. Hvor stort utbytte må han ta? Svar i hele kroner.</p>",
         K(a5),
         [K(g5_opp), K(g5_bf), K(g5_oppj)],
         sol("Utbyttet D må være så stort at det som er igjen etter eierskatt, dekker formuesskatten F: "
             "D × (1 − 0,3784) = F. Formuesskatten regnes av formuesverdien over bunnfradraget (manualen 5.1 og 8.4).",
             [f"Formuesskatt: ({kr(FV5)} − {kr(BF5)}) × 1,0 % = {kr(F5)}.",
              "Netto per krone utbytte: 1 − 0,3784 = 0,6216.",
              f"D = {kr(F5)}/0,6216 = <b>kr {kr(a5)}</b>."],
             [(f"Kr {kr(g5_opp)}", f"skatten er lagt oppå: {kr(F5)} × 1,3784. Da mangler det "
               f"{kr(F5 - g5_opp * (1 - TE))} etter eierskatt."),
              (f"Kr {kr(g5_bf)}", f"bunnfradraget er glemt: formuesskatten blir {kr(FV5 * 0.01)}."),
              (f"Kr {kr(g5_oppj)}", f"oppjusteringen er glemt: {kr(F5)}/0,78.")],
             f"Eierskatt {kr(a5)} × 37,84 % = {kr(float(rund(a5)) * TE)}. Igjen: {kr(a5)} − "
             f"{kr(float(rund(a5)) * TE)} = {kr(float(rund(a5)) - float(rund(float(rund(a5)) * TE)))}, som er "
             "formuesskatten. ✓",
             f"Utbyttet må være større enn formuesskatten ganget med 1,3784, fordi skatten også treffer den delen som går "
             f"til eierskatt. Det stryker {kr(g5_opp)}."))
EX.append(oppgave(5, "Utbyttet som skal dekke formuesskatten", "Formuesskatt som avkastningsskatt", [8, 5], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: Halvard og formuesskatten som avkastningsskatt")
I6, CF6, T6, RAB6 = 80.0, 6.0, 0.01, 0.80
r6 = CF6 / I6                                       # 7,5 %
F6 = I6 * RAB6 * T6                                 # 0,64 mill.
a6 = F6 / CF6                                       # 10,67 %
g6a_rab = I6 * T6 / CF6                             # rabatten glemt: 13,33 %
g6a_etter = F6 / (CF6 - F6)                         # nevneren etter formuesskatt: 11,94 %
g6a_slutt = (I6 + CF6) * RAB6 * T6 / CF6            # formuen ved slutten av året: 11,47 %
CF6b = 3.0
mv6 = CF6b / r6                                     # 40,0 mill.
ralt6 = r6 - RAB6 * T6                              # 6,7 %
skatt6 = mv6 * RAB6 * T6                            # 0,32 mill.
b6 = (CF6b - skatt6) / ralt6                        # 40,0 mill.
g6b_marked = (CF6b - skatt6) / r6                   # skatten trukket fra, men diskontert med 7,5 %: 35,7
g6b_egen = CF6b / ralt6                             # alternativet etter skatt, men egen formuesskatt glemt: 44,8
g6b_full = (CF6b - mv6 * T6) / ralt6                # rabatten glemt på den nye investeringen: 38,8
assert lik(r6, 0.075) and lik(mv6, 40) and lik(b6, 40)
print(f"   a {a6:.4f}: {g6a_rab:.4f}, {g6a_etter:.4f}, {g6a_slutt:.4f}; b {b6}: {g6b_marked:.3f}, {g6b_egen:.3f}, "
      f"{g6b_full:.3f}")
body6 = ("<p>Anta at kapitalmarkedet er effisient, slik at alle investeringer i samme risikoklasse gir samme avkastning. "
         f"Halvard kjøper børsnoterte aksjer for kr {kr(I6)} mill. ved begynnelsen av året. Aksjene gir kr {kr(CF6)} mill. "
         f"i kontantstrøm ved slutten av året. Da selges de for kr {kr(I6)} mill. Formuesskatten er 1 % av formuesverdien "
         "ved begynnelsen av året. Aksjer verdsettes til 80 % av markedsverdien. Satsen er forenklet. Se bort fra "
         "bunnfradrag og skatt på kapitalinntekt.</p>")
pa = ledd("a", "<p>Hvor stor del av avkastningen tar formuesskatten? Svar med to desimaler.</p>",
          P(a6),
          [P(g6a_rab), P(g6a_etter), P(g6a_slutt)],
          sol("Formuesskatten betales av formuesverdien ved begynnelsen av perioden. Som andel av avkastningen er den "
              "effektiv formuesskattesats delt på avkastningen før skatt (F8 lb 13 og 14, manualen 8.1 og 8.2).",
              [f"Avkastning: {kr(CF6)}/{kr(I6)} = {pst(r6)}.",
               f"Formuesskatt: {kr(I6)} mill. × 80 % × 1 % = {kr(F6, 2)} mill.",
               f"Andel: {kr(F6, 2)}/{kr(CF6)} = <b>{pst(a6)}</b>."],
              [(pst(g6a_rab), f"aksjerabatten er glemt: {kr(I6 * T6, 2)}/{kr(CF6)}."),
               (pst(g6a_etter), f"nevneren er avkastningen etter formuesskatt: {kr(F6, 2)}/{kr(CF6 - F6, 2)}."),
               (pst(g6a_slutt), f"formuesskatten er regnet av formuen ved slutten av året, {kr(I6 + CF6)} mill. Teksten "
                "sier begynnelsen.")],
              f"0,8 %/{pst(r6, 1)} = {pst(a6)}. ✓"))
pb = ledd("b", f"<p>Halvard finner en annen børsnotert investering i samme risikoklasse som gir kr {kr(CF6b)} mill. i året til "
               "evig tid. Formuesverdien er 80 % av markedsverdien. Markedsverdien er det investeringen er verdt for en "
               "investor som ikke betaler formuesskatt. Hva er investeringen verdt for Halvard, som betaler "
               "formuesskatt? Svar i millioner med én desimal.</p>",
          (f"{kr(b6, 1)} mill.", [kr(b6, 1)]),
          [(f"{kr(g6b_marked, 1)} mill.", [kr(g6b_marked, 1)]),
           (f"{kr(g6b_egen, 1)} mill.", [kr(g6b_egen, 1)]),
           (f"{kr(g6b_full, 1)} mill.", [kr(g6b_full, 1)])],
          sol("For en investor som betaler formuesskatt, er alternativavkastningen avkastningen etter formuesskatt. "
              "Formuesskatten på den nye investeringen trekkes fra kontantstrømmen (F8 lb 17–21, manualen 8.3).",
              [f"Markedsverdi: {kr(CF6b)}/{pst(r6, 1)} = {kr(mv6, 1)} mill.",
               f"Alternativavkastning etter formuesskatt: {pst(r6, 1)} − 0,8 % = {pst(ralt6, 1)}. Formuesskatt på den "
               f"nye investeringen: {kr(mv6, 1)} × 80 % × 1 % = {kr(skatt6, 2)} mill.",
               f"Verdi: ({kr(CF6b)} − {kr(skatt6, 2)})/{pst(ralt6, 1)} = {kr(CF6b - skatt6, 2)}/0,067 = "
               f"<b>{kr(b6, 1)} mill.</b>"],
              [(f"{kr(g6b_marked, 1)} mill.", f"formuesskatten er trukket fra, men kravet er markedets {pst(r6, 1)}. "
                "Halvards alternativ gir bare 6,7 % etter formuesskatt."),
               (f"{kr(g6b_egen, 1)} mill.", f"{kr(CF6b)}/0,067: alternativavkastningen er riktig, men formuesskatten på "
                "den nye investeringen er glemt."),
               (f"{kr(g6b_full, 1)} mill.", f"den nye investeringen er skattlagt med 1 % av hele markedsverdien, "
                f"({kr(CF6b)} − 0,40)/0,067. Teksten sier 80 %.")],
              "Formuesskatten tar 0,8 % av markedsverdien både på alternativet og på den nye investeringen. Da faller "
              "kontantstrømmen og kravet like mye. Verdien er den samme som uten formuesskatt, slik som i H2025 "
              "oppgave 3 og lærdom 2 i F8 lb 21. ✓",
              "Har alternativet og den nye investeringen samme formuesverdi i prosent av markedsverdien, er verdien "
              "uendret. Da står bare ett alternativ igjen."))
EX.append(oppgave(6, "Formuesskatt som avkastningsskatt og en evig kontantstrøm", "Formuesskatt som avkastningsskatt",
                  [8, 2], body6, [pa, pb]))

# ======================================================================= 7
print("\nOppgave 7: Stykkskatt (formel, grensetilfelle og tall)")
body7 = ("<p>I et marked med frikonkurranse er etterspørselen D(P) og tilbudet S(p), der P er prisen konsumentene betaler "
         "og p prisen produsentene får. Myndighetene innfører en stykkskatt t som produsentene betaler inn, slik at "
         "P = p + t. Likevekten er D(p + t) = S(p), med D′ &lt; 0 og S′ &gt; 0.</p>")
D7a, D7b, S7c, S7d, t7 = 2_000, 40, 60, 400, 5.0
P7_0 = (D7a + S7d) / (D7b + S7c)                    # 24
p7 = (D7a - D7b * t7 + S7d) / (D7b + S7c)           # 22
P7 = p7 + t7                                        # 27
x7 = D7a - D7b * P7                                 # 920
g7c_alt = P7_0 - t7                                 # hele skatten på produsentene: 19
g7c_P = P7                                          # konsumentprisen: 27
g7c_bytt = P7_0 - S7c / (S7c + D7b) * t7            # andelene byttet: 21
assert lik(P7_0, 24) and lik(p7, 22) and lik(P7, 27) and lik(x7, S7c * p7 - S7d)
print(f"   P0 {P7_0}, p {p7}, P {P7}, x {x7}; gale {g7c_alt}, {g7c_P}, {g7c_bytt}")
S7k, D7k = 60.0, -40.0                              # helningene i c, brukt i kontrollen
dP7, dp7 = S7k / (S7k - D7k), D7k / (S7k - D7k)     # 0,6 og −0,4
assert lik(dP7, 0.6) and lik(dp7, -0.4) and lik(dP7 - dp7, 1)
print(f"   ∂P/∂t {dP7}, ∂p/∂t {dp7}, forhold {S7k / D7k}, snudd {(S7k - D7k) / S7k:.4f}")
pa = ledd("a", "<p>Hvilket uttrykk viser hvordan prisen konsumentene betaler, endres når stykkskatten øker "
               "marginalt?</p>",
          ("∂P/∂t = S′(p)/(S′(p) − D′(P))", []),
          [("∂P/∂t = D′(P)/(S′(p) − D′(P))", []),
           ("∂P/∂t = S′(p)/D′(P)", []),
           ("∂P/∂t = (S′(p) − D′(P))/S′(p)", [])],
          sol("Deriver likevekten D(p + t) = S(p) med hensyn på t. Konsumentprisen følger av kilen P = p + t, så "
              "∂P/∂t = ∂p/∂t + 1 (manualen 11.2).",
              ["D′(P)(∂p/∂t + 1) = S′(p)∂p/∂t, altså ∂p/∂t = D′/(S′ − D′).",
               "∂P/∂t = D′/(S′ − D′) + (S′ − D′)/(S′ − D′).",
               "<b>∂P/∂t = S′(p)/(S′(p) − D′(P))</b>. Den ligger mellom 0 og 1."],
              [("D′(P)/(S′(p) − D′(P))", "∂p/∂t, endringen i produsentprisen. Den er negativ."),
               ("S′(p)/D′(P)", "forholdet (∂P/∂t)/(∂p/∂t), der nevneren S′ − D′ er forkortet bort. Det er negativt."),
               ("(S′(p) − D′(P))/S′(p)", "brøken er snudd. Den er større enn 1, men konsumentprisen kan ikke stige "
                "med mer enn skatten.")],
              f"Med kurvene i c er S′ = 60 og D′ = −40. Da er ∂P/∂t = 60/100 = {kr(dP7, 1)}. I c stiger konsumentprisen "
              f"fra {kr(P7_0)} til {kr(P7)} når skatten er {kr(t7)}: {kr(P7 - P7_0)}/{kr(t7)} = {kr(dP7, 1)}. ✓",
              "∂P/∂t ligger mellom 0 og 1. To av de gale uttrykkene er negative og det tredje er større enn 1."))
pb = ledd("b", "<p>Anta at tilbudet er perfekt elastisk (S′ → ∞). Hva skjer når stykkskatten øker med én "
               "krone?</p>",
          ("Konsumentene betaler én krone mer per enhet mens produsentprisen er uendret", []),
          [("Produsentprisen faller med én krone mens konsumentprisen er uendret", []),
           ("Begge prisene endres med en halv krone, slik som ved monopol med lineære kurver", []),
           ("Ingen av prisene endres, fordi produsentene tilpasser seg med lavere kvantum", [])],
          sol("Skriv ∂P/∂t = S′/(S′ − D′) = 1/(1 − D′/S′). Når S′ → ∞, går D′/S′ mot 0 og ∂P/∂t mot 1. Da er "
              "∂p/∂t = ∂P/∂t − 1 = 0. Ved perfekt elastisk tilbud er produsentprisen fast. Hele skatten veltes over "
              "på konsumentene (F9 lb 13, manualen 11.4). <b>Konsumentprisen stiger med hele skatten.</b>",
              None,
              [("Produsentprisen faller med én krone", "gjelder perfekt uelastisk tilbud (S′ = 0) eller perfekt elastisk "
                "etterspørsel."),
               ("En halv krone hver", "gjelder monopol med lineær etterspørsel (F9 lb 20). Her er det frikonkurranse."),
               ("Ingen av prisene endres", "kilen P − p = t må øke med én krone. Minst én av prisene må flytte seg.")],
              None,
              "Husk at ∂P/∂t − ∂p/∂t = 1. Det stryker «ingen endres». Spør så hvem som ikke har noe alternativ. Her er "
              "det konsumentene."))
pc = ledd("c", f"<p>Anta nå at etterspørselen er x = {kr(D7a)} − {D7b}P og tilbudet x = {S7c}p − {S7d}, der x er kvantum. "
               f"Uten skatt er prisen kr {kr(P7_0)}. Myndighetene innfører en stykkskatt på kr {kr(t7)} per enhet som "
               "produsentene betaler inn. Hvilken pris får produsentene per enhet etter skatten?</p>",
          K(p7),
          [K(g7c_alt), K(g7c_P), K(g7c_bytt)],
          sol("Sett P = p + t inn i etterspørselen og løs likevekten for produsentprisen (manualen 11.1 og 11.2).",
              [f"{kr(D7a)} − {D7b}(p + {kr(t7)}) = {S7c}p − {S7d}.",
               f"{kr(D7a - D7b * t7)} + {S7d} = {D7b + S7c}p.",
               f"p = {kr(D7a - D7b * t7 + S7d)}/{D7b + S7c} = <b>kr {kr(p7)}</b>. Konsumentene betaler {kr(P7)}."],
              [(f"Kr {kr(g7c_alt)}", "hele skatten er trukket fra produsentprisen, som om tilbudet var helt uelastisk."),
               (f"Kr {kr(g7c_P)}", "prisen konsumentene betaler, ikke den produsentene får."),
               (f"Kr {kr(g7c_bytt)}", f"andelene er byttet: produsentene bærer {S7c}/{D7b + S7c} av skatten, altså "
                f"{kr(S7c / (S7c + D7b) * t7)} kroner.")],
              f"Produsentene bærer |D′|/(S′ − D′) = {D7b}/{D7b + S7c} = 40 % av kr {kr(t7)}, altså kr 2. "
              f"{kr(P7_0)} − 2 = {kr(p7)}. Kvantum: {kr(D7a)} − {D7b} × {kr(P7)} = {kr(x7)} = {S7c} × {kr(p7)} − {S7d}. ✓",
              "Produsentprisen må ligge under prisen uten skatt og over prisen uten skatt minus hele skatten. Det stryker "
              f"kr {kr(g7c_P)} og kr {kr(g7c_alt)}."))
EX.append(oppgave(7, "Stykkskatt: formel, grensetilfelle og tall", "Skatteincidens", [11], body7, [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: Bedriftens tilpasning, avgrenset rentefradrag og nøytral skatt")
body8 = ("<p>Et aksjeselskap har inntekten F(K), der K er kapitalinnsatsen, F′(K) &gt; 0 og F″(K) &lt; 0. Kapitalen "
         "koster renten r, så profitten før skatt er F(K) − rK. Selskapsskatten er t.</p>")
# talleksempel til kontrollen: r = 5 %, t = 22 %, A = 0,5
r8, t8, A8 = 0.05, 0.22, 0.5
k8 = r8 * (1 - A8 * t8) / (1 - t8)
assert lik(r8 * (1 - 1 * t8) / (1 - t8), r8) and lik(r8 * (1 - 0 * t8) / (1 - t8), r8 / (1 - t8))
print(f"   kontroll: A = 0,5 gir {k8:.5f}, mellom {r8} og {r8 / (1 - t8):.5f}")
pa = ledd("a", "<p>Bare en andel A av rentene kan trekkes fra, 0 &lt; A &lt; 1. Hvilken betingelse bestemmer optimal "
               "kapitalinnsats K?</p>",
          ("F′(K) = r(1 − At)/(1 − t)", ["1", "1"]),
          [("F′(K) = r(1 − t)/(1 − At)", ["1", "1"]),
           ("F′(K) = rA/(1 − t)", ["1"]),
           ("F′(K) = r/(1 − t)", ["1"])],
          sol("Hele rentekostnaden rK er en reell kostnad, men bare ArK gir fradrag. Verdien etter skatt er "
              "V = F(K) − rK − t[F(K) − ArK] (manualen 9.4, H2025 oppgave 7a).",
              ["dV/dK = F′(K) − r − t[F′(K) − Ar] = 0.",
               "F′(K)(1 − t) = r − trA = r(1 − At).",
               "<b>F′(K) = r(1 − At)/(1 − t)</b>."],
              [("r(1 − t)/(1 − At)", "teller og nevner er byttet. Med A under 1 gir uttrykket et krav under r, som om "
                "skatten subsidierte kapitalen."),
               ("rA/(1 − t)", "A er satt i telleren i stedet for i uttrykket 1 − At. Med fullt fradrag (A = 1) gir det "
                "r/(1 − t), der kravet skal være r."),
               ("r/(1 − t)", "som om ingen renter kunne trekkes fra (A = 0).")],
              f"Sett A = 1: r(1 − t)/(1 − t) = r, som uten skatt. Sett A = 0: r/(1 − t). Med r = 5 %, t = 22 % og "
              f"A = 0,5 er kravet {pst(k8)}, mellom 5,00 % og {pst(r8 / (1 - t8))}. ✓",
              "Sett A = 1 og A = 0 i hvert alternativ. Bare ett gir r og r/(1 − t)."))
pb = ledd("b", "<p>Anta nå at selskapet bruker både gjeld og egenkapital. Gjeldsrentene kan trekkes fra fullt ut, mens "
               "egenkapitalens alternativkostnad r ikke kan trekkes fra. Myndighetene vil ha en selskapsskatt som er "
               "nøytral både for valget mellom gjeld og egenkapital og for hvor mye selskapet investerer. Hvilken "
               "omlegging oppnår det i modellen over?</p>",
          ("En kontantstrømskatt, der renter holdes utenfor grunnlaget og investeringer utgiftsføres med en gang", []),
          [B("Rentefradraget beholdes, samtidig som investeringene i tillegg utgiftsføres med en gang"),
           B("Selskapsskatten senkes fra 22 % til 15 %, slik at kilen mellom r og r/(1 − t) blir mindre"),
           B("Selskapet får fradrag for halvparten av egenkapitalens alternativkostnad i tillegg til gjeldsrentene")],
          sol("En kontantstrømskatt holder renteutgifter og renteinntekter utenfor grunnlaget. Det fjerner "
              "favoriseringen av gjeld. Investeringene utgiftsføres når de betales, så skatten forkortes bort i "
              "førsteordensbetingelsen og selskapet investerer til grenseavkastningen er lik kapitalkostnaden (F6 lb 40 "
              "og 41). <b>Kontantstrømskatten er nøytral på begge punktene.</b>",
              None,
              [("Rentefradraget beholdes", "dobbelt fradrag. Utgiftsføringen dekker allerede kapitalkostnaden. Beholdes "
                "rentefradraget i tillegg, trekkes kapitalkostnaden fra to ganger for gjeld, men bare én gang for "
                "egenkapital. Gjeld blir subsidiert og er fortsatt billigst."),
               ("Lavere sats", "kilen blir mindre, men forsvinner ikke: med 15 % krever egenkapitalen r/0,85, som er "
                "17,6 % over r, mens gjelden krever r."),
               ("Halvt fradrag for egenkapitalen", "egenkapitalen krever da r(1 − 0,5t)/(1 − t), fortsatt over r. Gjeld "
                "er fortsatt billigst.")],
              None,
              "Spør om forslaget gir samme krav for gjeld og egenkapital og om kravet er r. Bare et forslag der skatten "
              "forkortes bort helt, gjør begge deler."))
EX.append(oppgave(8, "Avgrenset rentefradrag og nøytral selskapsskatt", "Bedriftens tilpasning", [9], body8, [pa, pb]))

# ======================================================================= 9
print("\nOppgave 9: Sylvi og skatteøkningen")
t9a, t9b = 0.22, 0.30
fak9 = (1 - t9a) / (1 - t9b)
print(f"   beløpet i fondet ganges med {fak9:.4f}")
p = ledd("", "<p>Sylvi har formuen sin i et aksjefond og på en konto med null avkastning. Avkastningen på fondet "
             "skattlegges. Tap gir fullt fradrag. Hun har tilpasset seg optimalt. Nå økes skatten på avkastningen fra "
             "22 % til 30 %. Hva gjør Sylvi ifølge forelesningen om skatt og risikotaking?</p>",
         ("Hun øker beløpet i fondet, slik at sluttformuen får samme sannsynlighetsfordeling som før", []),
         [("Hun selger seg ned i fondet, fordi forventet avkastning etter skatt blir lavere", []),
          ("Hun beholder samme beløp i fondet, fordi staten tar like stor andel av både gevinst og tap", []),
          ("Det avhenger av risikoaversjonen hennes. Er hun svært risikoavers, selger hun seg ned", [])],
         sol("Med fullt tapsfradrag tar staten en andel t av både gevinst og tap. Når den sikre plasseringen gir null "
             "avkastning, kan investoren gjenskape fordelingen av sluttformuen før skatteøkningen ved å øke beløpet i det "
             "risikable aktivumet. Det gjør hun, uansett formen på nyttefunksjonen (F10 lb 6–12, manualen 12.2). Beløpet "
             f"ganges med (1 − 0,22)/(1 − 0,30) = {kr(fak9, 3)}. <b>Hun øker beløpet i fondet.</b>",
             None,
             [("Selger seg ned", "intuisjonen forelesningen spør om (F10 lb 5). Staten tar også en større del av tapet, "
               "så risikoen hun selv bærer, faller. Hun kjøper seg opp for å få den tilbake."),
              ("Samme beløp", "forveksler porteføljemodellen med prosjektvalget i F10 lb 3, der valget mellom to "
               "prosjekter ikke endres. Her endres beløpet."),
              ("Avhenger av risikoaversjonen", "gjelder når den sikre plasseringen har positiv avkastning (F10 lb 13). "
               "Her er avkastningen null.")],
             None,
             "Les forutsetningene: null avkastning på kontoen og fullt tapsfradrag. Da er svaret entydig. Bare "
             "alternativet som øker beløpet, passer."))
EX.append(oppgave(9, "Skatteøkning med fullt tapsfradrag", "Skatt og risiko", [12], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Tormod flytter til Italia")
p = ledd("", "<p>Tormod har bodd i Norge hele livet og eier alle aksjene i Tormod Holding AS. Den latente gevinsten på "
             "aksjene er kr 20 mill. I august 2026 flytter han til Italia og blir bosatt der etter skatteavtalen. Etter "
             "norsk intern rett er han likevel bosatt i Norge til og med 2029. Hvilket utsagn om utflyttingsskatten "
             "(exit-skatten) er riktig etter forelesningen?</p>",
         B("Den fastsettes allerede ved utflyttingen. Han kan betale den i rentefrie rater over 12 år"),
         [B("Den fastsettes først fra 2030, når Tormod er skattemessig emigrert etter treårsregelen"),
          B("Den forfaller bare hvis Tormod selger aksjene mens han er bosatt i Italia"),
          B("Den kan utsettes rentefritt så lenge han eier aksjene, uten noen tidsgrense for betalingen")],
         sol("Exit-skatten utløses ved utflytting når den latente gevinsten på aksjene er over 3 mill. Den fastsettes selv "
             "om du ikke er skattemessig emigrert, så lenge du er bosatt i et annet land etter skatteavtalen. Den kan "
             "betales med en gang, i rentefrie rater over 12 år eller etter 12 år med renter (F7 lb 11). <b>Den "
             "fastsettes ved utflyttingen og kan betales i rentefrie rater over 12 år.</b>",
             None,
             [("Først fra 2030", "2030 er det første året han kan være skattemessig emigrert etter treårsregelen (F7 lb "
               "6). Exit-skatten venter ikke på det."),
              ("Bare ved salg", "skatten kan forfalle uten salg. Deler selskapet ut utbytte, forfaller et avdrag på 70 % "
               "av utdelingen (F7 lb 11 og 13)."),
              ("Uten tidsgrense", "betalingen kan utsettes i høyst 12 år (F7 lb 11).")],
             None,
             "Tre av alternativene sier at skatten kan vente lenge. Forelesningens poeng er at den kommer tidlig og at "
             "den har en sluttdato."))
EX.append(oppgave(10, "Utflyttingsskatt ved flytting til Italia", "Exit-skatt", [13], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Postkortskatt med bunnfradrag")
Y11 = [200_000, 400_000, 800_000]
BF11, PROV11 = 100_000, 330_000
skattbar11 = sum(y - BF11 for y in Y11)             # 1 100 000
sats11 = PROV11 / skattbar11                        # 30 %
T11 = [(y - BF11) * sats11 for y in Y11]            # 30 000, 90 000, 210 000
a11 = T11[2] / Y11[2]                               # 26,25 %
g11_marg = sats11                                   # marginalskatten: 30,00 %
g11_prop = PROV11 / sum(Y11)                        # satsen uten bunnfradrag: 23,57 %
g11_B = T11[1] / Y11[1]                             # gjennomsnittsskatten til B: 22,50 %
assert lik(sats11, 0.30) and lik(a11, 0.2625) and lik(sum(T11), PROV11)
print(f"   sats {sats11}, C {a11}; gale {g11_marg}, {g11_prop:.4f}, {g11_B}")
p = ledd("", f"<p>Et land vil hente inn kr {kr(PROV11)} i skatt fra tre personer med en postkortskatt: en flat sats på "
             f"inntekt over et bunnfradrag på kr {kr(BF11)}. Person A tjener kr {kr(Y11[0])}, person B kr {kr(Y11[1])} og "
             f"person C kr {kr(Y11[2])}. Se bort fra alle andre skatter. Hvilken gjennomsnittsskatt får person C? Svar med "
             "to desimaler.</p>",
         P(a11),
         [P(g11_marg), P(g11_prop), P(g11_B)],
         sol("Gjennomsnittsskatten er betalt skatt delt på brutto inntekt. Med flat sats og bunnfradrag stiger den med "
             "inntekten, så systemet er progressivt (F7 lb 25 og 39, manualen 10.2).",
             [f"Skattbar inntekt: {kr(Y11[0] - BF11)} + {kr(Y11[1] - BF11)} + {kr(Y11[2] - BF11)} = {kr(skattbar11)}.",
              f"Sats: {kr(PROV11)}/{kr(skattbar11)} = {pst(sats11, 0)}.",
              f"C betaler {kr(Y11[2] - BF11)} × {pst(sats11, 0)} = {kr(T11[2])}. Gjennomsnittsskatt: "
              f"{kr(T11[2])}/{kr(Y11[2])} = <b>{pst(a11)}</b>."],
             [(pst(g11_marg), "marginalskatten. Bunnfradraget gjør at gjennomsnittsskatten ligger under den."),
              (pst(g11_prop), f"satsen uten bunnfradrag: {kr(PROV11)}/{kr(sum(Y11))}. Det er den proporsjonale skatten, "
               "som gir alle samme gjennomsnittsskatt."),
              (pst(g11_B), f"gjennomsnittsskatten til B: {kr(T11[1])}/{kr(Y11[1])}.")],
             f"A betaler {kr(T11[0])} ({pst(T11[0] / Y11[0])}), B {kr(T11[1])} ({pst(g11_B)}) og C {kr(T11[2])}. Sum "
             f"{kr(sum(T11))}. ✓ Gjennomsnittsskatten stiger med inntekten.",
             "Gjennomsnittsskatten må ligge under marginalskatten når det finnes et bunnfradrag. Regn satsen først, så "
             "faller 30,00 %."))
EX.append(oppgave(11, "Postkortskatt med bunnfradrag", "Progressivitet", [10], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Ellinor, Merton og humankapitalen")
mu12, rf12, s12, w12 = 0.08, 0.02, 0.20, 0.50
gam12 = (mu12 - rf12) / (w12 * s12 ** 2)            # 3
g12a_brutto = mu12 / (w12 * s12 ** 2)               # 4: hele avkastningen i telleren
g12a_sigma = (mu12 - rf12) / (w12 * s12)            # 0,6: σ i stedet for σ²
g12a_w = (mu12 - rf12) / s12 ** 2                   # 1,5: w glemt
F12, H12 = 1_200_000, 600_000
aks12 = w12 * (F12 + H12)                           # 900 000
b12 = aks12 / F12                                   # 75 %
c12 = (aks12 - H12) / F12                           # 25 %
assert lik(gam12, 3) and lik(b12, 0.75) and lik(c12, 0.25) and lik(g12a_brutto, 4) and lik(g12a_sigma, 0.6)
print(f"   γ {gam12}: {g12a_brutto}, {g12a_sigma}, {g12a_w}; b {b12}; c {c12}")
body12 = ("<p>Et globalt indeksfond har forventet avkastning 8 % og standardavvik 20 %. Risikofri rente er 2 %. Ellinor "
          "bruker Mertons formel for optimal andel av totalformuen i aksjer.</p>")


def G(x):
    v = round(x, 6)
    t = kr(v) if v == int(v) else kr(v, 1)
    return (f"γ = {t}", [t])


p1 = ledd("1", "<p>Ifølge Mertons formel bør Ellinor ha 50 % av totalformuen i indeksfondet. Hva er risikoaversjonen "
               "hennes, γ?</p>",
          G(gam12),
          [G(g12a_brutto), G(g12a_sigma), G(g12a_w)],
          sol("Mertons andel er w = (E(R) − R<sub>f</sub>)/(γσ²). Løst for γ: γ = (E(R) − R<sub>f</sub>)/(wσ²). Telleren "
              "er meravkastningen og nevneren har variansen (F12 lb 11, manualen 14.4).",
              ["Meravkastning: 8 % − 2 % = 6 %.",
               "wσ² = 0,5 × 0,20² = 0,5 × 0,04 = 0,02.",
               "γ = 0,06/0,02 = <b>3</b>."],
              [("γ = 4", "hele avkastningen i telleren: 0,08/0,02."),
               ("γ = 0,6", "standardavviket i stedet for variansen: 0,06/(0,5 × 0,20)."),
               ("γ = 1,5", "andelen w er glemt: 0,06/0,04. Det er γ for en investor med 100 % i aksjer.")],
              "0,06/(3 × 0,04) = 0,5, altså 50 %. ✓"))
p2 = ledd("2", f"<p>Ellinor har en finansformue på kr {kr(F12)} og en humankapital på kr {kr(H12)}. Humankapitalen er "
               "risikofri. Hvor stor andel av finansformuen bør hun ha i indeksfondet?</p>",
          P(b12, 0),
          [P(w12, 0), P(1.0, 0), P(c12, 0)],
          sol("Andelen w gjelder totalformuen, altså finansformue pluss humankapital. Risikofri humankapital virker som et "
              "bankinnskudd, så hele aksjebeløpet må ligge i finansformuen (F12 lb 14, manualen 14.5).",
              [f"Totalformue: {kr(F12)} + {kr(H12)} = {kr(F12 + H12)}.",
               f"Aksjebeløp: 50 % × {kr(F12 + H12)} = {kr(aks12)}.",
               f"Andel av finansformuen: {kr(aks12)}/{kr(F12)} = <b>{pst(b12, 0)}</b>."],
              [(pst(w12, 0), "w brukt på finansformuen alene. Humankapitalen er glemt."),
               (pst(1.0, 0), f"alt i aksjer. Det gjelder når humankapitalen er minst like stor som finansformuen, som i "
                f"H2025. Her er aksjebeløpet bare {kr(aks12)}."),
               (pst(c12, 0), "humankapitalen er trukket fra aksjebeløpet, som om den var aksjer. Det er svaret på neste "
                "delspørsmål.")],
              f"{kr(0.75 * F12)} i fondet og {kr(0.25 * F12)} i banken. Med humankapitalen som et bankinnskudd er totalt "
              f"{kr(aks12)} i aksjer og {kr(0.25 * F12 + H12)} risikofritt, altså 50/50 av totalformuen. ✓"))
p3 = ledd("3", f"<p>Anta i stedet (bare i dette delspørsmålet) at humankapitalen på kr {kr(H12)} svinger i takt med "
               "aksjemarkedet (β = 1). Hvor stor andel av finansformuen bør Ellinor nå ha i indeksfondet?</p>",
          P(c12, 0),
          [P(0.0, 0), P(b12, 0), P(w12, 0)],
          sol("Med β = 1 er humankapitalen allerede «aksjer». Den teller med i aksjebeløpet. Bare resten skal "
              "investeres i fondet (F12 lb 15, manualen 14.5).",
              [f"Ønsket aksjebeløp er fortsatt 50 % × {kr(F12 + H12)} = {kr(aks12)}.",
               f"Humankapitalen dekker {kr(H12)} av dette.",
               f"Resten i fondet: {kr(aks12 - H12)}/{kr(F12)} = <b>{pst(c12, 0)}</b>."],
              [("0 %", f"som i H2025, der humankapitalen dekket hele aksjebeløpet. Her er den bare {kr(H12)} av "
                f"{kr(aks12)}."),
               (pst(b12, 0), "svaret fra delspørsmål 2. Humankapitalen er behandlet som risikofri."),
               (pst(w12, 0), "w brukt på finansformuen alene.")],
              f"Aksjer i alt: {kr(aks12 - H12)} + {kr(H12)} = {kr(aks12)}, som er 50 % av totalformuen. ✓",
              "Aksjeandelen må falle fra delspørsmål 2 når humankapitalen blir risikabel, men ikke til null så lenge den "
              "er mindre enn aksjebeløpet."))
EX.append(oppgave(12, "Mertons aksjeandel og humankapitalen", "Porteføljevalg", [14], body12, [p1, p2, p3]))

# ======================================================================= 13
print("\nOppgave 13: Kjellaug og hytta")
W13, L13, p13 = 1_690_000, 1_440_000, 0.05
EU0 = (1 - p13) * math.sqrt(W13) + p13 * math.sqrt(W13 - L13)        # 1 260
PR13 = 96_000
EUf = math.sqrt(W13 - PR13)                                         # 1 262,54
maks13 = W13 - EU0 ** 2                                             # 102 400
forv13 = p13 * L13                                                  # 72 000
g13b_brann = W13 - ((1 - p13) * math.sqrt(W13)) ** 2                # brannutfallet glemt: 164 775
EGA13, PRe13 = 250_000, 75_000
forv13e = p13 * (L13 - EGA13)                                       # forventet erstatning med egenandel: 59 500
EUe = (1 - p13) * math.sqrt(W13 - PRe13) + p13 * math.sqrt(W13 - PRe13 - EGA13)   # 1 265,7
g13c_begge = math.sqrt(W13 - PRe13 - EGA13)                         # egenandelen trukket fra i begge utfall
assert lik(EU0, 1260) and lik(maks13, 102_400) and EUf > EU0 and EUe > EUf and PRe13 > forv13e
assert kr(EUe, 1) != kr(EUf, 1) and g13c_begge < EUf
print(f"   EU uten {EU0}, med {EUf:.3f}; maks {maks13}; forv. tap {forv13}; brann glemt {g13b_brann}")
print(f"   egenandel {EUe:.3f} mot full {EUf:.3f}; forventet erstatning {forv13e}; begge {g13c_begge:.3f}")
body13 = (f"<p>Kjellaug har en formue på kr {kr(W13)}. Av dette er kr {kr(L13)} en hytte. Med sannsynlighet 5 % brenner "
          "hytta i løpet av året og mister hele verdien. Resten av formuen er trygg. Kjellaug har nyttefunksjonen "
          "U(W) = √W, der W er formuen ved årets slutt.</p>")
p1 = ledd("1", f"<p>Et forsikringsselskap tilbyr full dekning for en premie på kr {kr(PR13)}. Bør Kjellaug kjøpe "
               "forsikringen?</p>",
          ("Ja, fordi forventet nytte blir høyere med forsikringen", []),
          [("Nei, fordi premien er høyere enn forventet erstatning", []),
           ("Nei, fordi forventet nytte blir lavere med forsikringen", []),
           ("Hun er indifferent, fordi forventet nytte er lik med og uten", [])],
          sol("Sammenlign forventet nytte, ikke forventet formue. Med full dekning er formuen sikker (manualen 17.2 og "
              "17.3).",
              [f"Med forsikring: √({kr(W13)} − {kr(PR13)}) = √{kr(W13 - PR13)} = {kr(EUf, 1)}.",
               f"Uten forsikring: 0,95 × √{kr(W13)} + 0,05 × √{kr(W13 - L13)} = 0,95 × {kr(math.sqrt(W13))} + 0,05 × "
               f"{kr(math.sqrt(W13 - L13))} = {kr(EU0, 1)}.",
               f"{kr(EUf, 1)} &gt; {kr(EU0, 1)}. <b>Hun bør kjøpe.</b>"],
              [("Nei, premien er høyere enn forventet erstatning", f"sant at {kr(PR13)} &gt; {kr(forv13)}, men det er "
                "forventet formue. En risikoavers person kan betale mer enn forventet tap."),
               ("Nei, forventet nytte blir lavere", f"feil regning. {kr(EUf, 1)} er høyere enn {kr(EU0, 1)}."),
               ("Indifferent", "nyttene er ikke like.")],
              f"Høyeste premie (delspørsmål 2) er {kr(maks13)}. Premien {kr(PR13)} ligger under den. ✓"))
p2 = ledd("2", "<p>Hva er den høyeste premien Kjellaug er villig til å betale for full dekning? Svar i hele kroner.</p>",
          K(maks13),
          [K(forv13), K(g13b_brann), K(PR13)],
          sol("Den høyeste premien X gjør henne indifferent: nytten av den sikre formuen W − X er lik forventet nytte uten "
              "forsikring (manualen 17.3).",
              [f"Forventet nytte uten forsikring: {kr(EU0, 1)}.",
               f"√({kr(W13)} − X) = {kr(EU0)}, så {kr(W13)} − X = {kr(EU0)}² = {kr(EU0 ** 2)}.",
               f"X = {kr(W13)} − {kr(EU0 ** 2)} = <b>kr {kr(maks13)}</b>."],
              [(f"Kr {kr(forv13)}", f"forventet tap, 5 % × {kr(L13)}. Det er den aktuarisk rettferdige premien, ikke den "
                "høyeste."),
               (f"Kr {kr(g13b_brann)}", f"utfallet med brann er glemt i forventet nytte: {kr(W13)} − "
                f"({kr((1 - p13) * math.sqrt(W13))})²."),
               (f"Kr {kr(PR13)}", "premien fra delspørsmål 1.")],
              f"Risikopremien er {kr(maks13)} − {kr(forv13)} = {kr(maks13 - forv13)} &gt; 0, som den må være for en "
              "risikoavers person. ✓",
              f"Hun kjøpte i delspørsmål 1, så svaret må ligge over {kr(PR13)}. Det stryker {kr(forv13)} og {kr(PR13)}."))
p3 = ledd("3", f"<p>Selskapet tilbyr i stedet en forsikring med egenandel kr {kr(EGA13)} til en premie på kr {kr(PRe13)}. "
               f"Bør Kjellaug velge denne forsikringen framfor full dekning til kr {kr(PR13)}?</p>",
          ("Ja, fordi forventet nytte blir høyere enn med full dekning", []),
          [("Nei, fordi forventet nytte blir lavere enn med full dekning", []),
           ("Hun er indifferent, fordi forventet nytte er lik med begge", []),
           ("Nei, fordi en risikoavers person alltid bør velge full dekning", [])],
          sol("Med egenandel er formuen fortsatt usikker. Begge utfallene må regnes med sannsynlighetene. Premien "
              "betales i begge. Sammenlign med den sikre nytten ved full dekning fra delspørsmål 1 (manualen 17.3).",
              [f"Ingen brann: {kr(W13)} − {kr(PRe13)} = {kr(W13 - PRe13)}, nytte {kr(math.sqrt(W13 - PRe13), 2)}.",
               f"Brann: hun bærer egenandelen. {kr(W13)} − {kr(PRe13)} − {kr(EGA13)} = {kr(W13 - PRe13 - EGA13)}, nytte "
               f"{kr(math.sqrt(W13 - PRe13 - EGA13), 2)}.",
               f"Forventet nytte: 0,95 × {kr(math.sqrt(W13 - PRe13), 2)} + 0,05 × "
               f"{kr(math.sqrt(W13 - PRe13 - EGA13), 2)} = {kr(EUe, 1)}. Det er mer enn {kr(EUf, 1)} med full dekning. "
               "<b>Ja, hun bør velge egenandelen.</b>"],
              [("Nei, lavere forventet nytte", f"feil regning. Trekker du for eksempel egenandelen fra også uten brann, "
                f"får du √{kr(W13 - PRe13 - EGA13)} = {kr(g13c_begge, 1)}, under full dekning."),
               ("Indifferent", f"nyttene er ikke like: {kr(EUe, 1)} mot {kr(EUf, 1)}."),
               ("Alltid full dekning", f"full dekning er best bare når premien er aktuarisk rettferdig (H2024 oppgave "
                f"11b). Her er påslaget {kr(PR13 - forv13)} for full dekning, men bare {kr(PRe13 - forv13e)} for "
                f"egenandelen, som har forventet erstatning {kr(forv13e)}.")],
              f"Rangeringen er egenandel {kr(EUe, 1)}, full dekning {kr(EUf, 1)} og ingen forsikring {kr(EU0, 1)}. ✓",
              "«Alltid full dekning» kan strykes uten regning. Det gjelder bare til rettferdig pris. Her er begge "
              "premiene over den."))
EX.append(oppgave(13, "Forventet nytte, full dekning og egenandel", "Forsikring og forventet nytte", [17], body13,
                  [p1, p2, p3]))

# ======================================================================= 14
print("\nOppgave 14: Brann og tørke på gårdene")
p = ledd("", "<p>Et forsikringsselskap tilbyr brannforsikring til gårdsbruk over hele landet til en premie litt over "
             "forventet erstatning. Selskapet vil ikke tilby forsikring mot tørke, selv om en tørkesommer kan gi bøndene "
             "like store tap som en brann. Hva er den beste forklaringen?</p>",
         ("Brann rammer én gård om gangen, mens tørke rammer mange gårder samme sommer og kan ikke spres", []),
         [("Tørke skjer oftere enn brann. Da blir forventet erstatning for høy til at selskapet kan tjene penger", []),
          ("Tørkeforsikring gir moralsk hasard, fordi bøndene vil bry seg mindre om været når de er forsikret", []),
          ("Bøndene er mindre risikoaverse overfor tørke enn overfor brann, så de vil ikke betale for den", [])],
         sol("Forsikring virker fordi selskapet kan spre uavhengige risikoer over mange kunder. Risiko som rammer alle "
             "samtidig, kan ikke diversifiseres bort (F12 lb 59, manualen 17.6, H2023 oppgave 12). En brann på én gård "
             "henger ikke sammen med brann på en annen. En tørkesommer gir krav fra mange gårder på én gang. <b>Tørke "
             "er systematisk risiko.</b>",
             None,
             [("Tørke skjer oftere", "høy sannsynlighet kan prises inn i premien. Det er ikke grunnen til at "
               "forsikringen mangler."),
              ("Moralsk hasard", "krever at den forsikrede kan påvirke skaden. Ingen bonde kan påvirke været."),
              ("Mindre risikoaverse overfor tørke", "risikoaversjon gjelder tapet, ikke årsaken. Et tap er like vondt "
               "uansett hva som forårsaket det.")],
             None,
             "Spør om skadene kommer hver for seg eller samtidig. Det er det eneste som skiller brann fra tørke i "
             "teksten."))
EX.append(oppgave(14, "Brann og tørke på gården", "Forsikring og forventet nytte", [17], "", [p]))

# ======================================================================= 15
print("\nOppgave 15: Eldbjørg og alderspensjonen")
p = ledd("", "<p>Eldbjørg er født i 1985 og har jobbet siden hun var 25 år. Hvilket utsagn om alderspensjonen hennes fra "
             "folketrygden er riktig?</p>",
         B("Beholdningen øker med 18,1 % av inntekten opp til 7,1 G og reguleres årlig med lønnsveksten"),
         [B("Beholdningen øker hvert år med 18,1 % av hele inntekten hennes, uansett hvor høy den er"),
          B("Tar hun ut pensjonen tidlig, blir delingstallet lavere og den årlige pensjonen høyere"),
          B("Hun får tilbake nøyaktig det hun har betalt inn, uansett hvor lenge hun lever etter uttaket")],
         sol("For årskull fra 1963 legges 18,1 % av pensjonsgivende inntekt opp til 7,1 G til beholdningen hvert år (F13 "
             "Pensjon lb 13). Før uttak reguleres beholdningen med lønnsveksten. Etter uttak reguleres pensjonen med "
             "gjennomsnittet av lønns- og prisveksten (F13 lb 18). Årlig pensjon er beholdningen delt på delingstallet. "
             "Delingstallet er høyere jo tidligere du tar ut (F13 lb 14 og 19: 21,15 ved 62 år mot 17,08 ved 67 år). "
             "<b>Utsagnet om 18,1 % opp til 7,1 G og lønnsregulering er riktig.</b>",
             None,
             [("18,1 % av hele inntekten", "taket på 7,1 G er glemt. Inntekt over taket gir ingen opptjening."),
              ("Tidlig uttak gir lavere delingstall", "motsatt. Tidlig uttak gir høyere delingstall og lavere årlig "
               "pensjon, fordi beholdningen skal vare lenger."),
              ("Tilbake det hun har betalt inn", "pensjonen utbetales så lenge hun lever. Den som lever lenge, får mer enn "
               "den som dør tidlig. Pensjonen er en forsikring mot å leve lenge (F13 lb 13 og 22).")],
             None,
             "Husk at delingstallet er forventet gjenstående levetid. Tidlig uttak betyr flere år å fordele på, altså "
             "høyere delingstall. Det stryker ett alternativ med en gang."))
EX.append(oppgave(15, "Alderspensjonen i folketrygden", "Pensjon", [15], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Kolbjørn og innskuddspensjonen")
p = ledd("", "<p>Kolbjørn begynner i en privat bedrift som har innskuddspensjon på lovens minstenivå. Hvilket utsagn om "
             "tjenestepensjonen hans er riktig ifølge forelesningen om pensjon?</p>",
         B("Arbeidsgiveren sparer minst 2 % av lønnen opp til 12 G. Han velger selv hvordan pengene plasseres"),
         [B("Arbeidsgiveren lover ham en bestemt andel av sluttlønnen og bærer selv avkastningsrisikoen"),
          B("Små bedrifter kan velge bort tjenestepensjon så lenge de ansatte er med i folketrygden"),
          B("Arbeidsgiveren sparer minst 7 % av hele lønnen hans. Han velger selv hvordan pengene plasseres")],
         sol("Alle bedrifter er pålagt å ha en pensjonsordning for de ansatte, på minimum 2 % av lønn opp til 12 G. I en "
             "innskuddsordning sparer arbeidsgiveren en andel av lønnen. Den ansatte bestemmer hvordan pengene skal "
             "investeres. Den ansatte bærer da avkastningsrisikoen (F13 Pensjon lb 24). <b>Minst 2 % opp til 12 G. "
             "Kolbjørn velger plasseringen.</b>",
             None,
             [("Bestemt andel av sluttlønnen", "beskriver ytelsespensjon. I innskuddspensjon er det innskuddet som er "
               "avtalt, ikke pensjonen."),
              ("Små bedrifter kan velge bort", "alle bedrifter er pålagt å ha tjenestepensjon (F13 lb 24)."),
              ("Minst 7 %", "7 % er det noen bedrifter setter av (F13 lb 25). Lovens minimum er 2 %.")],
             None,
             "Innskudd betyr at innskuddet er avtalt og at den ansatte styrer og bærer resten. Det stryker alternativet "
             "om sluttlønn. Deretter står valget mellom 2 % og 7 %."))
EX.append(oppgave(16, "Innskuddspensjon på minstenivå", "Pensjon", [15], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: Agnar og stjerneforvalteren")
p = ledd("", "<p>Agnar vil velge et aktivt forvaltet aksjefond med en forvalter som har slått markedet de siste årene. "
             "Hvilket utsagn er i tråd med forelesningen om aksjesparing?</p>",
         ("Forvaltere som har gjort det godt og får en bedre jobb, gjør det som regel ikke like godt etterpå", []),
         [B("Aktive fond tar som regel om lag 0,1–0,2 % i årlige gebyrer, omtrent det samme som indeksfond"),
          ("Survivorship bias gjør at aktive fond ser dårligere ut i statistikken enn de egentlig er", []),
          ("Forbrukerrådet fant at aktive fond i nordiske aksjer slo indeks, men tapte på globale aksjer", [])],
         sol("Flinke fondsforvaltere får gjerne forfremmelse eller en ny og bedre forvalterjobb, men etter at de er "
             "ansatt, har de ikke like høy avkastning som før (F12 Aksjesparing lb 78). Gode resultater varer sjelden: "
             "de 20 beste på 70-tallet ble slått av markedet på 80-tallet (lb 74). <b>Utsagnet om forvalterne som får ny "
             "jobb, er riktig.</b>",
             None,
             [("0,1–0,2 % i gebyrer", "aktive fond tar ofte 1–2 % i året (F12 lb 73), om lag fem ganger så mye som "
               "indeksfond (F16 lb 49)."),
              ("Survivorship bias", "virker motsatt. De dårlige fondene legges ned og forsvinner ut av statistikken, så "
               "situasjonen er enda verre enn tallene viser (F12 lb 74)."),
              ("Nordiske fond slo indeks", "nordiske fond gjorde det svakest, −3,48 prosentpoeng i året. Norske aksjer "
               "var det eneste området der aktive fond slo indeks (F12 lb 81).")],
             None,
             "Forelesningens budskap er at aktive fond taper etter gebyrer og at gode resultater ikke varer. Et "
             "alternativ som får aktive fond til å se bedre ut, er trolig galt."))
EX.append(oppgave(17, "Stjerneforvaltere og aktive fond", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: Lisbeth og annuitetslånet")
L18, r18, n18 = 2_400_000, 0.04, 20
A18 = L18 * r18 / (1 - (1 + r18) ** -n18)           # 176 596
rente18 = L18 * r18                                 # 96 000
avdr18 = A18 - rente18                              # 80 596
g18_serie = L18 / n18                               # serielånets avdrag: 120 000
assert kr(A18) == "176 596" and kr(avdr18) == "80 596"
assert lik(avdr18, L18 * r18 / ((1 + r18) ** n18 - 1))
print(f"   annuitet {A18:.2f}, rente {rente18}, avdrag {avdr18:.2f}; gale {g18_serie}, {rente18}, {A18:.2f}")
p = ledd("", f"<p>Lisbeth tar opp et boliglån på kr {kr(L18)} som annuitetslån over {n18} år. Renten er 4 % og hun betaler "
             "én gang i året, etterskuddsvis. Hvor mye av det første terminbeløpet er avdrag? Svar i hele kroner.</p>",
         K(avdr18),
         [K(g18_serie), K(rente18), K(A18)],
         sol("Et annuitetslån har fast terminbeløp A = L × r/(1 − (1 + r)<sup>−n</sup>). Hver termin dekker først renten "
             "på restgjelden. Resten er avdrag (manualen 16.1).",
             [f"Terminbeløp: {kr(L18)} × 0,04/(1 − 1,04<sup>−20</sup>) = {kr(A18)}.",
              f"Rente i første termin: {kr(L18)} × 4 % = {kr(rente18)}.",
              f"Avdrag: {kr(A18)} − {kr(rente18)} = <b>kr {kr(avdr18)}</b>."],
             [(f"Kr {kr(g18_serie)}", f"lånet delt på antall år, {kr(L18)}/{n18}. Det er avdraget på et serielån."),
              (f"Kr {kr(rente18)}", "renten i første termin, ikke avdraget."),
              (f"Kr {kr(A18)}", "hele terminbeløpet. Spørsmålet gjelder bare avdraget.")],
             f"Det første avdraget på et annuitetslån er L × r/((1 + r)<sup>n</sup> − 1) = {kr(rente18)}/"
             f"{kr((1 + r18) ** n18 - 1, 6)} = {kr(avdr18)}. ✓ Avdraget er lavest i starten og stiger hvert år.",
             f"På et annuitetslån er det første avdraget alltid mindre enn lånet delt på antall år. Det stryker "
             f"{kr(g18_serie)}."))
EX.append(oppgave(18, "Avdrag i første termin på et annuitetslån", "Lån", [16], "", [p]))

# ======================================================================= 19
print("\nOppgave 19: Torgeir og bilpengene")
SP19, KK19, rs19, rk19 = 60_000, 25_000, 0.03, 0.22
kost19 = KK19 * (rk19 - rs19)
assert lik(kost19, 4_750)
print(f"   koster {kost19} i året")
p = ledd("", f"<p>Torgeir har kr {kr(SP19)} på en sparekonto med 3 % rente. Pengene er satt av til en ny bil om to år. "
             f"Samtidig har han kr {kr(KK19)} i kredittkortgjeld til 22 % rente. Han lar sparepengene stå, fordi de «er "
             "bilpenger». Hvilken skjevhet beskriver best det han gjør?</p>",
         ("Mentalt regnskap", []),
         [("Disposisjonseffekten", []),
          ("Ankereffekt", []),
          ("Flokkmentalitet", [])],
         sol("Mentalt regnskap er å behandle penger ulikt etter hvor de kommer fra eller hva de skal brukes til, i stedet "
             "for å se dem som en helhet (F16 Finansiell psykologi lb 16). Forelesningen om lån bruker nettopp dette "
             "som forklaring på at folk har dyr kreditt- og forbruksgjeld samtidig som de sparer (F15 Lån lb 19). Den "
             "rasjonelle regelen er å betale ned lånet med høyest rente først (F15 lb 13). Å la sparepengene stå koster "
             f"Torgeir om lag {kr(KK19)} × (22 % − 3 %) = kr {kr(kost19)} i året. <b>Mentalt regnskap.</b>",
             None,
             [("Disposisjonseffekten", "å selge aksjer med gevinst for tidlig og beholde tapende aksjer for lenge (F16 "
               "lb 27). Torgeir selger ingen aksjer."),
              ("Ankereffekt", "å legge for stor vekt på den første informasjonen man får (F16 lb 16). Ingen første "
               "opplysning styrer valget hans."),
              ("Flokkmentalitet", "å følge det andre gjør (F16 lb 36). Torgeir ser ikke på andre.")],
             None,
             "Spør hva som styrer valget. Her er det merkelappen på pengene. Det er mentalt regnskap."))
EX.append(oppgave(19, "Torgeir og bilpengene", "Finansiell psykologi", [18, 16], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove13",
    "kind": "mock",
    "label": "Prøveeksamen 13",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Hovedprediksjonen: det mest sannsynlige settet for eksamen 12. november 2026, bygd på H2025, H2024 og "
             "kursgodkjenningen. Den har alle temaene med høy sannsynlighet i forventet størrelse, i H2025-rekkefølgen. "
             "Oppgave 1–11 er skattedelen (18 ledd) og oppgave 12–19 finansdelen (12 ledd). Vriene er blant annet "
             "skjerming som går tilbake til kostprisen når den framførte er brukt opp, primærbolig over 14 mill., "
             "formuesskatt med bunnfradrag i utbyttet som skal dekke den, kontantstrømskatt som nøytral selskapsskatt, "
             "perfekt elastisk tilbud, exit-skatt før emigrasjonen og egenandel mot full dekning."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort 6. november. Noen er forenklet. Da sier teksten fra.",
        "Laget av appen ut fra prediksjonen. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Skriv ned mellomtallene før du ser på alternativene. Nesten hvert galt alternativ er et mellomtall, "
                     "svaret på nabospørsmålet eller regnestykket med ett ledd utelatt."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove13.json")
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
if any(re.search(r"\s–\s", re.sub(r"<[^>]+>", " ", x)) for x in tekster):
    feil.append("tankestrek (–) brukt som skilletegn")

# 3. tallene i alternativene er de skriptet regnet, og ingen andre
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
