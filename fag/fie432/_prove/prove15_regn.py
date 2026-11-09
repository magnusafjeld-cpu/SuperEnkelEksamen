"""Prøveeksamen 15 (FIE432): regner alle tall, bygger prove15.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove15_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p15) sier,
3. skriver prove15.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p15"]
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
print("\nOppgave 1: Aslaug og aksjene i Brimnes Laks ASA")
K1 = 300_000
R1 = [0.035, 0.04]
D1 = 4_500
S1 = 345_000
skj1 = K1 * R1[0]                                  # 10 500
ub1 = skj1 - D1                                    # 6 000 framført til år 2
g1a_skj2 = (K1 + ub1) * R1[1] + ub1                # skjerming for salgsåret, som om hun eide aksjene 31.12
g1a_kost = K1 * R1[1] + ub1                        # samme feil, skjerming for år 2 av kostprisen
g1a_brutto = skj1                                  # hele skjermingen i år 1 framført, utbyttet ikke trukket fra
assert lik(ub1, 6_000) and lik(g1a_skj2, 18_240) and lik(g1a_kost, 18_000)
gev1 = S1 - K1 - ub1
skatt1 = gev1 * TE
g1b_ub = (S1 - K1) * TE
g1b_skj2 = (S1 - K1 - g1a_skj2) * TE
g1b_opp = gev1 * 0.22
assert lik(skatt1, 14_757.6)
print(f"   ubenyttet {ub1}, gale {g1a_skj2}, {g1a_kost}, {g1a_brutto}; skatt {skatt1}, gale {g1b_ub}, {g1b_skj2}, {g1b_opp}")
body1 = (f"<p>Aslaug kjøpte aksjer i Brimnes Laks ASA for kr {kr(K1)} i januar år 1. Hun eide aksjene ved utgangen av "
         f"år 1 og fikk kr {kr(D1)} i utbytte det året. Skjermingsrenten for år 1 var 3,5 %. I september år 2 solgte "
         f"hun alle aksjene for kr {kr(S1)}, før selskapet betalte utbytte det året. Skjermingsrenten for år 2 ble "
         "4 %.</p>")
p1a = ledd("a", "<p>Hvor mye ubenyttet skjerming kan Aslaug trekke fra gevinsten ved salget?</p>",
           (f"Kr {kr(ub1)}", [kr(ub1)]),
           [(f"Kr {kr(g1a_skj2)}", [kr(g1a_skj2)]),
            (f"Kr {kr(g1a_kost)}", [kr(g1a_kost)]),
            (f"Kr {kr(g1a_brutto)}", [kr(g1a_brutto)])],
           sol("Skjermingsfradraget går til den som eier aksjen ved utgangen av året. Selger du før årsskiftet, får du "
               "ingen skjerming for salgsåret. Skjerming som ikke ble brukt på utbyttet, framføres og trekkes fra "
               "gevinsten (F4 lb 33–35; manualen 5.3–5.4; H2022 oppgave 1.6).",
               [f"År 1: {kr(K1)} × 3,5 % = {kr(skj1)}. Utbyttet er {kr(D1)}, så {kr(ub1)} framføres.",
                "År 2: ingen ny skjerming, fordi hun ikke eier aksjene 31.12.",
                f"Til fradrag i gevinsten: <b>kr {kr(ub1)}</b>."],
               [(f"Kr {kr(g1a_skj2)}", f"hun har fått skjerming for salgsåret som om hun eide aksjene ved årsskiftet: "
                                        f"{kr(K1 + ub1)} × 4 % + {kr(ub1)}."),
                (f"Kr {kr(g1a_kost)}", f"samme feil. I tillegg er skjermingen for år 2 regnet av kostprisen: "
                                        f"{kr(K1)} × 4 % + {kr(ub1)}."),
                (f"Kr {kr(g1a_brutto)}", "hele skjermingen for år 1. Utbyttet på kr 4 500 brukte en del av den.")],
               f"Skjermingen fra år 1 brukes på utbyttet ({kr(D1)}) og på gevinsten ({kr(ub1)}): "
               f"{kr(D1)} + {kr(ub1)} = {kr(skj1)}. ✓",
               "Står det at aksjen selges før årsskiftet, kan alle alternativer som bruker skjermingsrenten for salgsåret, "
               "strykes."))
p1b = ledd("b", "<p>Hvor mye skatt betaler hun på gevinsten? Eierskatten er 22 % og oppjusteringsfaktoren 1,72. "
                "Rund av til nærmeste krone.</p>",
           (f"Kr {kr(skatt1)}", [kr(skatt1)]),
           [(f"Kr {kr(g1b_ub)}", [kr(g1b_ub)]),
            (f"Kr {kr(g1b_skj2)}", [kr(g1b_skj2)]),
            (f"Kr {kr(g1b_opp)}", [kr(g1b_opp)])],
           sol("Gevinsten er salgspris minus kostpris minus den ubenyttede skjermingen. Den oppjusteres med 1,72 og "
               "skattlegges med 22 %, altså 37,84 % (F4 lb 30 og lb 35; manualen 5.4).",
               [f"Gevinst: {kr(S1)} − {kr(K1)} − {kr(ub1)} = {kr(gev1)}.",
                f"Oppjustert: {kr(gev1)} × 1,72 = {kr(gev1 * 1.72)}.",
                f"Skatt: {kr(gev1 * 1.72)} × 22 % = {kr(skatt1, 2)}, altså <b>kr {kr(skatt1)}</b>."],
               [(f"Kr {kr(g1b_ub)}", f"den ubenyttede skjermingen er glemt: {kr(S1 - K1)} × 37,84 %."),
                (f"Kr {kr(g1b_skj2)}", f"hun har fått skjerming for salgsåret, slik at {kr(g1a_skj2)} er trukket fra: "
                                        f"{kr(S1 - K1 - g1a_skj2)} × 37,84 %."),
                (f"Kr {kr(g1b_opp)}", f"oppjusteringen er glemt: {kr(gev1)} × 22 %.")],
               f"{kr(gev1)} × 37,84 % = {kr(skatt1, 2)}. ✓ Det glemte oppjusteringssvaret er 22/37,84 = 58 % av det "
               "riktige. Det kjenner du igjen blant alternativene."))
EX.append(oppgave(1, "Ubenyttet skjerming ved salg året etter", "Aksjonærmodellen", [5], body1, [p1a, p1b]))

# ======================================================================= 2
print("\nOppgave 2: Gudmund og Hallingskeid Rør AS")
O2, TS2, Y2, TN2 = 900_000, 0.24, 1.5, 0.24
K2, R2 = 1_200_000, 0.035
utb2 = O2 * (1 - TS2)
skj2 = K2 * R2
eier2 = (utb2 - skj2) * Y2 * TN2
g2_skj = utb2 * Y2 * TN2
g2_samlet = O2 * TS2 + eier2
g2_brutto = (O2 - skj2) * Y2 * TN2
assert lik(eier2, 231_120)
print(f"   eierskatt {eier2}; gale {g2_skj}, {g2_samlet}, {g2_brutto}")
p = ledd("", f"<p>Gudmund eier alle aksjene i Hallingskeid Rør AS, som har et skattbart overskudd på kr {kr(O2)}. Anta "
             "forenklet at selskapsskatten er 24 %, oppjusteringsfaktoren 1,5 og den nominelle eierskatten 24 %. Etter at "
             "selskapet har betalt selskapsskatten, tar Gudmund resten ut som utbytte. Aksjene hans har kostpris "
             f"kr {kr(K2)}. Skjermingsrenten er 3,5 %. Hvor mange kroner betaler Gudmund i eierskatt?</p>",
         (f"Kr {kr(eier2)}", [kr(eier2)]),
         [(f"Kr {kr(g2_skj)}", [kr(g2_skj)]),
          (f"Kr {kr(g2_samlet)}", [kr(g2_samlet)]),
          (f"Kr {kr(g2_brutto)}", [kr(g2_brutto)])],
         sol("Eierskatten regnes av utbyttet etter selskapsskatt minus skjermingsfradraget. Grunnlaget ganges med "
             "oppjusteringsfaktoren og den nominelle eierskatten (F4 lb 30–32; kursgodkjenningen 2026 spørsmål 3).",
             [f"Utbytte: {kr(O2)} × (1 − 24 %) = {kr(utb2)}.",
              f"Skjerming: {kr(K2)} × 3,5 % = {kr(skj2)}. Skattepliktig utbytte: {kr(utb2 - skj2)}.",
              f"Eierskatt: {kr(utb2 - skj2)} × 1,5 × 24 % = <b>kr {kr(eier2)}</b>."],
             [(f"Kr {kr(g2_skj)}", f"skjermingen er glemt: {kr(utb2)} × 36 %."),
              (f"Kr {kr(g2_samlet)}", f"samlet skatt, {kr(O2 * TS2)} + {kr(eier2)}. Spørsmålet gjelder bare eierskatten."),
              (f"Kr {kr(g2_brutto)}", f"eierskatten er regnet av overskuddet før selskapsskatt: "
                                       f"({kr(O2)} − {kr(skj2)}) × 36 %. Selskapsskatten må betales før noe kan deles ut.")],
             f"Den effektive eierskatten er 1,5 × 24 % = 36 %. {kr(utb2 - skj2)} × 36 % = {kr(eier2)}. ✓ "
             f"Samlet skatt blir {kr(O2 * TS2)} + {kr(eier2)} = {kr(O2 * TS2 + eier2)}.",
             "Glemt skjerming gir alltid et tall som er nøyaktig skjermingen × 36 % høyere enn det riktige. Ser du to "
             f"alternativer med differanse {kr(skj2 * 0.36)}, er det paret. Det laveste er riktig."))
EX.append(oppgave(2, "Eierskatt i Hallingskeid Rør AS", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Lavere skatt på alminnelig inntekt og i selskapene")
TW3, AGA3, NY3 = 47.4, 12.4, 20.0
tw3 = TW3 - 2.0
y3 = (tw3 + AGA3 - NY3) / NY3
e3 = y3 * NY3
y3_lonn = (TW3 + AGA3 - NY3) / NY3
y3_gml = 1.72
y3_aga = (tw3 - NY3) / NY3
assert lik(y3, 1.89) and lik(e3, 37.8)
print(f"   y {y3}, e {e3}; gale {y3_lonn}, {y3_gml}, {y3_aga}")


def alt3(y):
    return (f"y = {kr(y, 2)} og eierskatt {kr(y * NY3, 1)} %", [kr(y, 2), kr(y * NY3, 1)])


p = ledd("", "<p>Høyeste marginalskatt på lønn er 47,4 %: 22 % skatt på alminnelig inntekt, 17,8 % trinnskatt og 7,6 % "
             "trygdeavgift. Arbeidsgiveravgiften som veltes over på arbeidstakeren, utgjør 12,4 % av lønnskostnaden. "
             "Stortinget senker både skatten på alminnelig inntekt og selskapsskatten fra 22 % til 20 %. Trinnskatten "
             "og trygdeavgiften er uendret. Eierskatten blir 20 % av utbyttet ganget med oppjusteringsfaktoren y. Hva "
             "blir y og den effektive eierskatten etter inntektsskiftingslikningen?</p>",
         alt3(y3),
         [alt3(y3_lonn), alt3(y3_gml), alt3(y3_aga)],
         sol("Inntektsskiftingslikningen: høyeste marginalskatt på lønn pluss arbeidsgiveravgiften som veltes over på "
             "arbeidstakeren, skal være lik selskapsskatten pluss nominell eierskatt ganget med y (F5 lb 3–4). Lb 7 "
             "viser valget mellom å senke bare selskapsskatten og å senke den alminnelige satsen for alle. Her senkes "
             "begge, så også lønnsskatten faller. Lb 7 regner samme tilfelle med nominell eierskatt 22 %, som gir "
             "y = 1,72 og 37,84 %. Her sier teksten at den nominelle eierskatten er 20 %, så y = 37,8/20 = 1,89.",
             [f"Ny marginalskatt på lønn: 47,4 % − 2 = {kr(tw3, 1)} %.",
              f"{kr(tw3, 1)} % + 12,4 % = 20 % + 20 % × y, så y = {kr(tw3 + AGA3 - NY3, 1)}/20 = <b>{kr(y3, 2)}</b>.",
              f"Effektiv eierskatt: 20 % × {kr(y3, 2)} = <b>{kr(e3, 1)} %</b>."],
             [(f"{kr(y3_lonn, 2)} og {kr(y3_lonn * NY3, 1)} %", "lønnsskatten er ikke senket: (47,4 + 12,4 − 20)/20. "
                                                                 "Det er regningen fra kursgodkjenningen, der bare "
                                                                 "selskapsskatten ble endret."),
              (f"{kr(y3_gml, 2)} og {kr(y3_gml * NY3, 1)} %", "faktoren er holdt fast på dagens 1,72."),
              (f"{kr(y3_aga, 2)} og {kr(y3_aga * NY3, 1)} %", "arbeidsgiveravgiften er glemt: (45,4 − 20)/20.")],
             "Begge sider av likningen faller med 2 prosentpoeng. Eierskatten blir derfor den samme som i dag: "
             "59,8 − 22 = 37,8 før endringen og 57,8 − 20 = 37,8 etter. Dagens 37,84 % er 22 % × 1,72 med avrundet faktor. "
             "Bare faktoren øker, fordi den nå ganges med en lavere sats. ✓",
             "Den effektive eierskatten må være venstre side minus selskapsskatten: 57,8 − 20 = 37,8. Da kan du krysse "
             "uten å regne ut y."))
EX.append(oppgave(3, "Lavere skatt på alminnelig inntekt og i selskapene", "Aksjonærmodellen", [5, 1], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Solfrid og den dyre primærboligen")
PB4, SB4, AK4, GJ4 = 18_000_000, 2_000_000, 10_000_000, 9_000_000
GR4 = 14_000_000
fv_pb4 = 0.25 * min(PB4, GR4) + 0.70 * max(PB4 - GR4, 0)
fv4 = fv_pb4 + SB4 + 0.80 * AK4
g4a_25 = 0.25 * PB4 + SB4 + 0.80 * AK4
g4a_70 = 0.70 * PB4 + SB4 + 0.80 * AK4
g4a_sb = fv_pb4 + 0.25 * SB4 + 0.80 * AK4
mv4 = PB4 + SB4 + AK4
gj_ak4 = GJ4 * AK4 / mv4
red4 = 0.20 * gj_ak4
netto4 = fv4 - (GJ4 - red4)
BF4 = 1_900_000
skatt4 = (netto4 - BF4) * 0.01
g4b_ingen = (fv4 - GJ4 - BF4) * 0.01
g4b_fv = (fv4 - (GJ4 - 0.20 * GJ4 * 0.8 * AK4 / fv4) - BF4) * 0.01
g4b_alle = (fv4 - 0.8 * GJ4 - BF4) * 0.01
g4b_bf = netto4 * 0.01
assert lik(fv4, 16_300_000) and lik(skatt4, 60_000)
print(f"   formuesverdi {fv4}; gale {g4a_25}, {g4a_70}, {g4a_sb}; skatt {skatt4}; gale {g4b_fv}, {g4b_alle}, {g4b_bf}")
body4 = (f"<p>Solfrid er enslig. Ved utgangen av 2026 eier hun en primærbolig med markedsverdi kr {kr(PB4)}, en "
         f"utleieleilighet (sekundærbolig) med markedsverdi kr {kr(SB4)} og børsnoterte aksjer for kr {kr(AK4)}. Gjelden "
         f"hennes er kr {kr(GJ4)}. Primærboligen verdsettes til 25 % av markedsverdien opp til kr {kr(GR4)} og til 70 % "
         "av det som overstiger. Sekundærboligen verdsettes til 100 % og aksjene til 80 %. Gjelden fordeles "
         "forholdsmessig etter markedsverdiene. Bare gjelden som faller på aksjene, reduseres med 20 %.</p>")
p4a = ledd("a", "<p>Hva er Solfrids samlede formuesverdi før gjeld?</p>",
           (f"Kr {kr(fv4)}", [kr(fv4)]),
           [(f"Kr {kr(g4a_25)}", [kr(g4a_25)]),
            (f"Kr {kr(g4a_70)}", [kr(g4a_70)]),
            (f"Kr {kr(g4a_sb)}", [kr(g4a_sb)])],
           sol("Primærboligen verdsettes i to sjikt: 25 % av markedsverdien opp til terskelen og 70 % av det som "
               "overstiger. For 2026 er terskelen 14 mill. (manualen 7.3). F8 lb 44 viser de samme to sjiktene med en "
               "lavere terskel, men på eksamen gjelder terskelen som står i teksten. Sekundærbolig har ingen rabatt "
               "(lb 45). Aksjer har 20 % rabatt (lb 7).",
               [f"Primærbolig: {kr(GR4)} × 25 % + {kr(PB4 - GR4)} × 70 % = {kr(0.25 * GR4)} + {kr(0.7 * (PB4 - GR4))} "
                f"= {kr(fv_pb4)}.",
                f"Sekundærbolig {kr(SB4)} og aksjer {kr(AK4)} × 80 % = {kr(0.8 * AK4)}.",
                f"Sum: {kr(fv_pb4)} + {kr(SB4)} + {kr(0.8 * AK4)} = <b>kr {kr(fv4)}</b>."],
               [(f"Kr {kr(g4a_25)}", "hele primærboligen er verdsatt til 25 %. Satsen over 14 mill. er glemt."),
                (f"Kr {kr(g4a_70)}", "hele primærboligen er verdsatt til 70 %. De første 14 mill. har 25 %."),
                (f"Kr {kr(g4a_sb)}", "utleieleiligheten er verdsatt som en primærbolig, til 25 %.")],
               f"Primærboligen får en gjennomsnittlig formuesverdi på {kr(fv_pb4)}/{kr(PB4)} = "
               f"{kr(100 * fv_pb4 / PB4, 2)} %, som ligger mellom 25 % og 70 %. ✓"))
p4b = ledd("b", f"<p>Hva blir formuesskatten? Satsen er 1,0 % av nettoformuen over bunnfradraget på kr {kr(BF4)}.</p>",
           (f"Kr {kr(skatt4)}", [kr(skatt4)]),
           [(f"Kr {kr(g4b_fv)}", [kr(g4b_fv)]),
            (f"Kr {kr(g4b_alle)}", [kr(g4b_alle)]),
            (f"Kr {kr(g4b_bf)}", [kr(g4b_bf)])],
           sol("Gjelden fordeles etter markedsverdiene. Bare den delen som faller på aksjene, reduseres med "
               "aksjerabatten. Gjeld på primærbolig og sekundærbolig reduseres ikke (F8 lb 55–56 og lb 88; manualen 7.4).",
               [f"Aksjenes andel av markedsverdien: {kr(AK4)}/{kr(mv4)} = {pst(AK4 / mv4)}. Gjeld på aksjene: {kr(gj_ak4)}. "
                f"Reduksjon: 20 % × {kr(gj_ak4)} = {kr(red4)}.",
                f"Nettoformue: {kr(fv4)} − ({kr(GJ4)} − {kr(red4)}) = {kr(netto4)}.",
                f"Formuesskatt: ({kr(netto4)} − {kr(BF4)}) × 1,0 % = <b>kr {kr(skatt4)}</b>."],
               [(f"Kr {kr(g4b_fv)}", f"gjelden er fordelt etter formuesverdiene: aksjenes andel blir {kr(0.8 * AK4)}/{kr(fv4)} "
                                     f"i stedet for {pst(AK4 / mv4)}. Gjelden skal fordeles etter markedsverdiene."),
                (f"Kr {kr(g4b_alle)}", "hele gjelden er redusert med 20 %. Gjeld på bolig skal ikke reduseres."),
                (f"Kr {kr(g4b_bf)}", "bunnfradraget er glemt.")],
               f"Gjeldsreduksjonen på {kr(red4)} skal gi {kr(red4 * 0.01)} mer i skatt enn uten reduksjon: "
               f"{kr(skatt4)} − {kr(g4b_ingen)} = {kr(skatt4 - g4b_ingen)}. ✓"))
EX.append(oppgave(4, "Solfrid og den dyre primærboligen", "Formuesskatt", [7], body4, [p4a, p4b]))

# ======================================================================= 5
print("\nOppgave 5: Formuesskatt og skatt på avkastningen")
T5, r5 = 0.012, 0.08
t5 = T5 / r5
g5a_slutt = T5 * (1 + r5) / r5
g5a_del = T5 / (r5 * (1 + r5))
g5a_gang = (100 * T5) * (100 * r5) / 100        # 1,2 × 8 = 9,6 (ganget i stedet for delt)
W5, rB5 = 2_000_000, 0.02
fs5 = W5 * T5
av5 = W5 * rB5
a5b = fs5 / av5
g5b_slutt = W5 * (1 + rB5) * T5 / av5
assert lik(t5, 0.15) and lik(a5b, 0.60)
print(f"   t {t5}; gale {g5a_slutt}, {g5a_del}, {g5a_gang}; andel {a5b}; gale {g5b_slutt}")
body5 = ("<p>Anta at formuesskatten er 1,2 % av formuen ved begynnelsen av året. Myndighetene vurderer å erstatte den med en "
         "skatt t på avkastningen. Avkastningen realiseres ved slutten av året. Se bort fra bunnfradrag, rabatter og "
         "andre skatter.</p>")
p5a = ledd("a", "<p>En investor har avkastningen r = 8 %. Hvor høy må t være for at de to skattene skal gi staten samme "
                "proveny fra henne? Svar med to desimaler.</p>",
           (pst(t5), [pst(t5)]),
           [(pst(g5a_slutt), [pst(g5a_slutt)]),
            (pst(g5a_del), [pst(g5a_del)]),
            (pst(g5a_gang), [pst(g5a_gang)])],
           sol("Faller formuesskatten T på formuen ved begynnelsen av perioden, gir likheten W × T = W × r × t at "
               "t = T/r (F8 lb 27–28; manualen 8.1).",
               [f"t = 1,2 %/8 % = <b>{pst(t5)}</b>."],
               [(pst(g5a_slutt), "formelen for formuesskatt på formuen ved slutten av året: T(1 + r)/r (F8 lb 29)."),
                (pst(g5a_del), "delt på 1 + r i stedet for å gange: T/(r(1 + r))."),
                (pst(g5a_gang), "ganget med r i stedet for å dele: 1,2 × 8.")],
               "Med W = 100 er formuesskatten 1,20 og avkastningen 8. Skatten på avkastningen: 15 % × 8 = 1,20. ✓",
               "Regn med W = 100: skatten er 1,20 kr av 8 kr i avkastning. Alternativene som trekker inn 1 + r, hører til "
               "formuesskatt på formuen ved slutten av året."))
p5b = ledd("b", f"<p>Formuesskatten blir likevel stående. Bente har en formue på kr {kr(W5)} som bare gir 2 % "
                "avkastning. Hvor stor del av avkastningen hennes tar formuesskatten? Svar med to desimaler.</p>",
           (pst(a5b), [pst(a5b)]),
           [(pst(t5), [pst(t5)]),
            (pst(g5b_slutt), [pst(g5b_slutt)]),
            (pst(T5), [pst(T5)])],
           sol("Ekvivalensen mellom de to skattene gjelder bare når alle har samme avkastning (F8 lb 27). Formuesskatten "
               "er et fast beløp av formuen. Jo lavere avkastningen er, jo større del av den tar skatten. Det er "
               "eksempelet med brødrene Fredo og Mike (lb 32–36).",
               [f"Formuesskatt: {kr(W5)} × 1,2 % = {kr(fs5)}.",
                f"Avkastning: {kr(W5)} × 2 % = {kr(av5)}.",
                f"Andel: {kr(fs5)}/{kr(av5)} = <b>{pst(a5b)}</b>."],
               [(pst(t5), "svaret i a. Det gjelder bare for en investor med 8 % avkastning."),
                (pst(g5b_slutt), f"skatten er regnet av formuen ved slutten av året: {kr(W5 * (1 + rB5))} × 1,2 %."),
                (pst(T5), "selve satsen. Den er en andel av formuen, ikke av avkastningen.")],
               "Formelen fra a med Bentes avkastning: t = T/r = 1,2 %/2 % = 60 %. ✓ Med formuesskatten betaler "
               "Bente fire ganger så stor andel av avkastningen som investoren i a."))
EX.append(oppgave(5, "Formuesskatt og skatt på avkastningen", "Formuesskatt som avkastningsskatt", [8], body5,
                  [p5a, p5b]))

# ======================================================================= 6
print("\nOppgave 6: Torleif og formuesskatten på Stølsheia AS")
FV6, BF6, G6 = 32_000_000, 1_900_000, 21_500_000
F6 = (G6 - BF6) * 0.01 + (FV6 - G6) * 0.011
D6 = F6 / (1 - TE)
g6_flat = (FV6 - BF6) * 0.01 / (1 - TE)
g6_opp = F6 * (1 + TE)
g6_ingen = F6
assert lik(F6, 311_500)
print(f"   F {F6}, D {D6}; gale {g6_flat}, {g6_opp}, {g6_ingen}")
p = ledd("", f"<p>Torleif eier alle aksjene i Stølsheia AS. Formuesverdien av aksjene er kr {kr(FV6)} etter "
             "aksjerabatten. Han har ingen annen formue, ingen gjeld og ingen annen likviditet. Derfor må han ta utbytte "
             "for å betale formuesskatten. Formuesskatten er 1,0 % av nettoformuen mellom bunnfradraget på "
             f"kr {kr(BF6)} og kr {kr(G6)} og 1,1 % av det som overstiger. Eierskatten er 37,84 %. Se bort fra skjerming. "
             "Hvor stort utbytte må han ta? Rund av til nærmeste krone.</p>",
         (f"Kr {kr(D6)}", [kr(D6)]),
         [(f"Kr {kr(g6_flat)}", [kr(g6_flat)]),
          (f"Kr {kr(g6_opp)}", [kr(g6_opp)]),
          (f"Kr {kr(g6_ingen)}", [kr(g6_ingen)])],
         sol("Utbyttet må dekke både formuesskatten og eierskatten på seg selv: D(1 − 37,84 %) = F, altså "
             "D = F/(1 − 37,84 %) (F4 lb 37–38; H2025 oppgave 6). Formuesskatten har to trinn: 1,0 % opp til "
             "21,5 mill. og 1,1 % over (F8 lb 5).",
             [f"Formuesskatt: ({kr(G6)} − {kr(BF6)}) × 1,0 % + ({kr(FV6)} − {kr(G6)}) × 1,1 % = "
              f"{kr((G6 - BF6) * 0.01)} + {kr((FV6 - G6) * 0.011)} = {kr(F6)}.",
              f"Utbytte: {kr(F6)}/0,6216 = <b>kr {kr(D6)}</b>."],
             [(f"Kr {kr(g6_flat)}", f"1,0 % på hele formuen over bunnfradraget: {kr((FV6 - BF6) * 0.01)}/0,6216. "
                                     "Trinnet på 1,1 % er glemt."),
              (f"Kr {kr(g6_opp)}", f"eierskatten er lagt oppå formuesskatten: {kr(F6)} × 1,3784. Da er ikke skatten "
                                    "på den delen av utbyttet som betaler eierskatten, med."),
              (f"Kr {kr(g6_ingen)}", "selve formuesskatten. Da er det ingenting igjen til eierskatten på utbyttet.")],
             f"Eierskatt: {kr(D6)} × 37,84 % = {kr(D6 * TE)}. Igjen: {kr(D6)} − {kr(D6 * TE)} = {kr(D6 - D6 * TE)}, "
             "nøyaktig formuesskatten. ✓",
             "Det riktige svaret er alltid større enn formuesskatten ganget med 1,3784. Alternativet som er nøyaktig "
             "det produktet, er fellen."))
EX.append(oppgave(6, "Utbytte til formuesskatt over to satstrinn", "Formuesskatt som avkastningsskatt", [8, 7], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: Stykkskatt med prisfunksjoner")
a7, b7, c7, d7, t7 = 200, 3, 40, 1, 12
x0_7 = (a7 - c7) / (b7 + d7)
P0_7 = a7 - b7 * x0_7
x7 = (a7 - c7 - t7) / (b7 + d7)
P7 = a7 - b7 * x7
p7 = c7 + d7 * x7
andel_k7 = (P7 - P0_7) / t7
andel_p7 = (P0_7 - p7) / t7
assert lik(P0_7, 80) and lik(P7, 89) and lik(p7, 77) and lik(andel_p7, 0.25)
g7a_lik = P0_7 + t7 / 2
g7a_bytt = P0_7 + andel_p7 * t7
g7b_uendret = P0_7
g7b_lik = P0_7 - t7 / 2
g7c_lik = 0.5
g7c_forh = d7 / b7
print(f"   P {P7}, p {p7}, andel prod {andel_p7}; gale {g7a_lik}, {g7a_bytt}, {g7b_uendret}, {g7b_lik}, {g7c_forh}")
body7 = (f"<p>I et marked med frikonkurranse er etterspørselen gitt ved P = {a7} − {b7}x og tilbudet ved "
         f"p = {c7} + x. Her er P prisen konsumentene betaler, p prisen produsentene sitter igjen med og x kvantum. "
         f"Uten skatt er prisen kr {kr(P0_7)} og kvantum {kr(x0_7)}. Myndighetene innfører en stykkskatt på kr {t7} "
         f"per enhet som produsentene betaler inn, slik at P = p + {t7}.</p>")
p7a = ledd("a", "<p>Hvilken pris betaler konsumentene etter at skatten er innført?</p>",
           (f"Kr {kr(P7)}", [kr(P7)]),
           [(f"Kr {kr(g7a_lik)}", [kr(g7a_lik)]),
            (f"Kr {kr(g7a_bytt)}", [kr(g7a_bytt)]),
            (f"Kr {kr(p7)}", [kr(p7)])],
           sol("I likevekt er konsumentprisen lik produsentprisen pluss skatten. Med prisfunksjoner setter du "
               "betalingsviljen lik grensekostnaden pluss skatten. Hvem som betaler skatten inn, avgjør ikke hvem som "
               "bærer den (F9 lb 7–8 og lb 14; manualen 11.2–11.3).",
               [f"{a7} − {b7}x = {c7} + x + {t7}, så 4x = {kr(a7 - c7 - t7)} og x = {kr(x7)}.",
                f"P = {a7} − {b7} × {kr(x7)} = <b>kr {kr(P7)}</b>."],
               [(f"Kr {kr(g7a_lik)}", "skatten er antatt delt likt. Det gjelder bare når kurvene er like bratte."),
                (f"Kr {kr(g7a_bytt)}", "andelene er byttet: konsumentene har fått produsentenes andel på 25 %."),
                (f"Kr {kr(p7)}", "produsentprisen, svaret på b.")],
               f"Produsentprisen er {c7} + {kr(x7)} = {kr(p7)}. Differansen {kr(P7)} − {kr(p7)} = {t7}. ✓"))
p7b = ledd("b", "<p>Hvilken pris sitter produsentene igjen med etter skatten?</p>",
           (f"Kr {kr(p7)}", [kr(p7)]),
           [(f"Kr {kr(g7b_uendret)}", [kr(g7b_uendret)]),
            (f"Kr {kr(g7b_lik)}", [kr(g7b_lik)]),
            (f"Kr {kr(P7)}", [kr(P7)])],
           sol("Produsentprisen er konsumentprisen minus skatten, eller tilbudskurven ved det nye kvantumet "
               "(F9 lb 7).",
               [f"p = {kr(P7)} − {t7} = <b>kr {kr(p7)}</b>.",
                f"Kontroll med tilbudet: {c7} + {kr(x7)} = {kr(p7)}."],
               [(f"Kr {kr(g7b_uendret)}", "prisen før skatt. Da er hele skatten veltet over på konsumentene, som "
                                           "bare skjer med perfekt elastisk tilbud eller helt uelastisk etterspørsel."),
                (f"Kr {kr(g7b_lik)}", f"skatten er antatt delt likt: {kr(P0_7)} − {kr(t7 / 2)}."),
                (f"Kr {kr(P7)}", "konsumentprisen, svaret på a.")],
               f"Produsentene taper {kr(P0_7 - p7)} per enhet og konsumentene {kr(P7 - P0_7)}. Summen er skatten på "
               f"{t7}. ✓"))
p7c = ledd("c", "<p>Hvor stor andel av skatten bærer produsentene?</p>",
           (pst(andel_p7, 0), [pst(andel_p7, 0)]),
           [(pst(andel_k7, 0), [pst(andel_k7, 0)]),
            (pst(g7c_lik, 0), [pst(g7c_lik, 0)]),
            (pst(g7c_forh, 1), [pst(g7c_forh, 1)])],
           sol("Produsentenes andel er prisfallet de får, delt på skatten. Med prisfunksjoner bærer den siden med den "
               "bratteste kurven mest. Den minst prisfølsomme parten bærer mest (F9 lb 14 og lb 17–18).",
               [f"Prisfall for produsentene: {kr(P0_7)} − {kr(p7)} = {kr(P0_7 - p7)}.",
                f"Andel: {kr(P0_7 - p7)}/{t7} = <b>{pst(andel_p7, 0)}</b>."],
               [(pst(andel_k7, 0), "konsumentenes andel."),
                (pst(g7c_lik, 0), "skatten er antatt delt likt, som om kurvene var like bratte."),
                (pst(g7c_forh, 1), "helningene er satt mot hverandre, 1/3, i stedet for mot summen, 1/(1 + 3).")],
               "Formelen med kvantumshelninger: D′ = −1/3 og S′ = 1 gir ∂P/∂t = S′/(S′ − D′) = 1/(4/3) = 0,75. "
               "Produsentene bærer 1 − 0,75 = 25 %. ✓",
               "Etterspørselskurven er tre ganger så bratt som tilbudskurven. Da må konsumentene bære mest. Alle "
               "alternativer på 50 % eller mer for produsentene kan strykes."))
EX.append(oppgave(7, "Stykkskatt med prisfunksjoner", "Skatteincidens", [11], body7, [p7a, p7b, p7c]))

# ======================================================================= 8
print("\nOppgave 8: Tapsfradrag og Domar–Musgrave")
A8, a8, t8a, t8b = 800_000, 300_000, 0.40, 0.25
fond8 = a8 * (1 - t8a) / (1 - t8b)
konto8 = A8 - fond8
g8_uendret = A8 - a8
g8_snudd = A8 - a8 * (1 - t8b) / (1 - t8a)
g8_fond = fond8
assert lik(fond8, 240_000) and lik(konto8, 560_000)
print(f"   fond {fond8}, konto {konto8}; gale {g8_uendret}, {g8_snudd}, {g8_fond}")
body8 = ("<p>I Domar–Musgrave-modellen fordeler en investor formuen mellom et risikabelt aktivum og en sikker "
         "plassering med null avkastning. Tap gir fullt fradrag. Da kjøper investoren mer av det risikable aktivumet "
         "når skatten på avkastningen øker.</p>")
p8a = ledd("a", "<p>Hvilket utsagn om dette resultatet er riktig?</p>",
           ("Gir tap bare delvis fradrag, kan en skatteøkning gjøre at investoren tar mindre risiko", []),
           [("Resultatet gjelder bare for en investor som er risikonøytral, ikke for en risikoavers", []),
            ("Gir den sikre plasseringen positiv avkastning, kjøper investoren alltid mer av det risikable", []),
            ("Etter tilpasningen bærer investoren mindre risiko enn før, fordi staten tar mer av tapet", [])],
           "<p><b>Regelen.</b> Resultatet hviler på to forutsetninger: null avkastning på den sikre plasseringen og fullt "
           "tapsfradrag (F10 lb 7 og lb 12). Uten fullt tapsfradrag straffes risikotaking. Valget vris mot det "
           "sikre (lb 2). En risikonøytral investor tar da mindre risiko (kursgodkjenningen 2026 spørsmål 7). "
           "<b>Utsagnet om delvis tapsfradrag er riktig.</b></p>"
           "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bare risikonøytral</b> = null avkastning på det sikre gjør "
           "at vi ikke trenger å ta hensyn til nyttefunksjonens form. Resultatet gjelder alle risikoholdninger "
           "(lb 12).<br><b>Positiv avkastning gir alltid mer</b> = da avhenger svaret av risikoholdningen. Vi kan ikke "
           "si noe sikkert (lb 13).<br><b>Mindre risiko etter tilpasningen</b> = investoren øker posisjonen nettopp "
           "for å gjenskape samme sannsynlighetsfordeling for sluttformuen som før (lb 12). Risikoen hun selv bærer, "
           "er uendret.</p>"
           "<p><b>Strategi med minuspoeng.</b> Ordet «alltid» i et utsagn om et resultat som hviler på forutsetninger, "
           "er et varsel. Sjekk forutsetningene i lb 7 først.</p>")
p8b = ledd("b", f"<p>Herdis har kr {kr(A8)}: kr {kr(a8)} i et aksjefond og resten på en konto med null avkastning. "
                "Avkastningen skattlegges med 40 % med fullt fradrag for tap. Herdis er optimalt tilpasset. Skatten "
                "settes ned til 25 %. Hvor mye har hun på kontoen etter at hun har tilpasset seg?</p>",
           (f"Kr {kr(konto8)}", [kr(konto8)]),
           [(f"Kr {kr(g8_uendret)}", [kr(g8_uendret)]),
            (f"Kr {kr(g8_snudd)}", [kr(g8_snudd)]),
            (f"Kr {kr(g8_fond)}", [kr(g8_fond)])],
           sol("Med fullt tapsfradrag og null avkastning på kontoen holder investoren posisjonen etter skatt, "
               "(1 − t) × beløpet i fondet, konstant. Da får hun samme fordeling for sluttformuen som før (F10 lb 12; "
               "manualen 12.2). Lavere skatt betyr at hun trenger et mindre beløp i fondet.",
               [f"Posisjon etter skatt før endringen: {kr(a8)} × (1 − 40 %) = {kr(a8 * (1 - t8a))}.",
                f"Samme posisjon med 25 % skatt: {kr(a8 * (1 - t8a))}/(1 − 25 %) = {kr(fond8)} i fondet.",
                f"På kontoen: {kr(A8)} − {kr(fond8)} = <b>kr {kr(konto8)}</b>."],
               [(f"Kr {kr(g8_uendret)}", "uendret. Da blir både gevinst og tap etter skatt større enn før."),
                (f"Kr {kr(g8_snudd)}", f"brøken er snudd: fondet blir {kr(a8 * (1 - t8b) / (1 - t8a))}, som om "
                                        "skattekuttet skulle gi mer risiko."),
                (f"Kr {kr(g8_fond)}", "beløpet i fondet, ikke på kontoen.")],
               f"Et fall på 10 % i fondet: før {kr(0.1 * a8)} × 0,6 = {kr(0.1 * a8 * 0.6)} i tap etter skatt, etter "
               f"{kr(0.1 * fond8)} × 0,75 = {kr(0.1 * fond8 * 0.75)}. Samme tap. ✓",
               "Lavere skatt betyr at staten tar mindre av risikoen, så hun trenger mindre i fondet og mer på kontoen. "
               f"Bare ett alternativ er over {kr(g8_uendret)}."))
EX.append(oppgave(8, "Tapsfradrag og Domar–Musgrave", "Skatt og risiko", [12], body8, [p8a, p8b]))

# ======================================================================= 9
print("\nOppgave 9: Karianne og skattearbitrasjen")
L9, r9 = 2_000_000, 0.05
kost9 = L9 * r9 * (1 - 0.22)
innt9 = L9 * r9 * (1 - 0.22)
assert lik(kost9 - innt9, 0)
p = ledd("", f"<p>Karianne låner kr {kr(L9)} privat til 5 % rente og trekker rentene fra i alminnelig inntekt. Hun "
             "skyter pengene inn som egenkapital i sitt eget aksjeselskap. Selskapet setter dem i banken til 5 % rente. "
             "Dette er et forsøk på skattearbitrasje mellom person- og selskapsbeskatningen. Hvorfor gir det ingen "
             "risikofri gevinst i dagens norske skattesystem?</p>",
         ("Rentefradraget hennes og selskapets skatt på renteinntekten har samme sats, 22 %", ["22"]),
         [("Selskapet skatter 37,84 % av renteinntekten, mens rentefradraget hennes bare er verdt 22 %", ["37,84", "22"]),
          ("Selskapet betaler formuesskatt av bankinnskuddet. Den spiser opp gevinsten", []),
          ("Renter på lån som brukes til å kjøpe aksjer, gir ikke fradrag i alminnelig inntekt", [])],
         "<p><b>Regelen.</b> Låner du privat til renten r og plasserer pengene gjennom selskapet til samme rente, er "
         "gevinsten r(1 − selskapsskatt) − r(1 − personskatt). Den er positiv bare når personskatten er høyere enn "
         "selskapsskatten (F6 lb 5–6). I Norge er skatten på alminnelig inntekt og selskapsskatten begge 22 %. "
         "<b>Gevinsten er null. Utsagnet om samme sats er riktig.</b></p>"
         "<p><b>Regnestykket.</b></p><p>"
         f"1. Rentekostnad etter skatt: {kr(L9 * r9)} × (1 − 22 %) = {kr(kost9)}.<br>"
         f"2. Selskapets renteinntekt etter skatt: {kr(L9 * r9)} × (1 − 22 %) = {kr(innt9)}.<br>"
         "3. Gevinst: 0. Deles renten ut, skattlegges bare det som overstiger skjermingsfradraget (F4 lb 30).</p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Selskapet skatter 37,84 %</b> = selskapet betaler 22 % "
         "selskapsskatt. 37,84 % er eierskatten på utbytte til en personlig aksjonær. Den treffer bare det som "
         "overstiger skjermingen (F4 lb 30). Satsene er satt like nettopp for å hindre slik gevinst (F6 lb 4).<br>"
         "<b>Formuesskatt i selskapet</b> = formuesskatten er en personskatt. Bedrifter betaler ikke formuesskatt "
         "(F8 lb 6).<br><b>Ikke fradrag</b> = renter på gjeld er fradragsberettiget i alminnelig inntekt uansett hva "
         "lånet brukes til (manualen 16).</p>"
         "<p><b>Strategi med minuspoeng.</b> Arbitrasje krever at to satser er ulike. Spør hvilke to satser som "
         "møtes. Er de like, finnes ingen gevinst.</p>")
EX.append(oppgave(9, "Karianne og skattearbitrasjen", "Bedriftens tilpasning", [9], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Leidulv, leiligheten i Bergen og utflyttingen")
GEV10, BF10 = 12_000_000, 3_000_000
exit10 = (GEV10 - BF10) * TE
p = ledd("", "<p>Leidulv har bodd i Norge i 30 år. I mars 2026 flytter han til Sveits og tar fast opphold der. Han "
             "beholder en leilighet i Bergen som han kjøpte i 2015. Den har vært leid ut siden 2018. Verken han "
             "eller familien har brukt den siden. Fra 2027 er han i Norge under 30 dager i året. Han eier aksjer med en "
             f"urealisert gevinst på kr {kr(GEV10)}. Hvilket utsagn er riktig etter norsk intern rett?</p>",
         ("Leiligheten hindrer ikke utflytting, men han er tidligst utflyttet etter det tredje inntektsåret etter "
          "flyttingen", []),
         [("Så lenge han eier en bolig i Norge, er han skattemessig bosatt her, uansett hvordan boligen brukes", []),
          ("Han er utflyttet fra året etter flyttingen, fordi han har tatt fast opphold i Sveits og nesten aldri er "
           "i Norge", []),
          ("Han kan ikke bli skattemessig utflyttet før exit-skatten på aksjene hans er betalt i sin helhet", [])],
         "<p><b>Regelen.</b> Tre vilkår må være oppfylt samtidig: fast opphold i utlandet, høyst 61 dager i Norge per "
         "år og ingen bolig i Norge som du eller dine nærstående kan disponere (F7 lb 4). Unntaket: en bolig anskaffet "
         "minst fem år før utflyttingen, som verken du eller nærstående har brukt som bolig de siste fem årene, regnes "
         "ikke som disponert bolig (lb 5). Med minst ti års botid er du tidligst utflyttet etter utløpet av det tredje "
         "inntektsåret etter utflyttingen, altså fra 1. januar 2030 (lb 6). <b>Utsagnet om at leiligheten ikke hindrer "
         "utflytting, men at det tar tre år, er riktig.</b></p>"
         "<p><b>Regnestykket.</b></p><p>1. Leiligheten er kjøpt elleve år før utflyttingen og har ikke vært brukt som "
         "bolig på åtte år. Unntaket i lb 5 gjelder.<br>"
         "2. Botiden er over ti år, så inntektsårene 2027, 2028 og 2029 må passere med alle vilkårene oppfylt.<br>"
         f"3. Exit-skatten fastsettes uavhengig av dette: ({kr(GEV10)} − {kr(BF10)}) × 37,84 % = {kr(exit10)}, som kan "
         "betales i rentefrie rater over 12 år (lb 11).</p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bolig i Norge uansett bruk</b> = hovedregelen, men unntaket for "
         "en bolig som er eid lenge og ikke brukt de siste fem årene, slår inn her (lb 5).<br><b>Fra året etter</b> = "
         "det gjelder bare med under ti års botid (lb 6).<br><b>Exit-skatten må være betalt</b> = betalingen er ikke "
         "et vilkår for utflytting. Skatten kan utsettes i inntil 12 år (lb 11).</p>"
         "<p><b>Strategi med minuspoeng.</b> Gå gjennom de tre vilkårene i lb 4 og botidsregelen i lb 6 hver for seg. "
         "Alternativer som legger til et vilkår som ikke står der, kan strykes.</p>")
EX.append(oppgave(10, "Leidulv, leiligheten i Bergen og utflyttingen", "Exit-skatt", [6, 13], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Haldor og kontoen i et skatteparadis")
R11 = 200_000
skatt11 = R11 * 0.22
assert lik(skatt11, 44_000)
p = ledd("", "<p>Haldor er bosatt i Norge. Han har en bankkonto i et skatteparadis som ikke skattlegger renteinntekter "
             f"og som ikke har skatteavtale med Norge. Kontoen ga kr {kr(R11)} i renter i år. Han har ikke oppgitt "
             "kontoen til Skatteetaten. Skatten på alminnelig inntekt er 22 %. Hvilket utsagn er riktig?</p>",
         (f"Han skulle betalt kr {kr(skatt11)} i skatt på rentene til Norge, fordi han skatter av inntekt fra hele verden",
          [kr(skatt11)]),
         [("Han skal ikke skatte av rentene til Norge, fordi bare skatteparadiset kan skattlegge dem uten avtale", []),
          ("Melder han fra selv gjennom frivillig retting, slipper han både tilleggsskatten og skatten på rentene", []),
          ("Norge kan ikke få vite om kontoen, fordi CRS bare gir opplysninger til allmennheten, ikke til Skatteetaten",
           [])],
         "<p><b>Regelen.</b> Den som er bosatt i Norge, er skattepliktig til Norge for inntekt fra hele verden "
         "(manualen 13.1). Uten skatteavtale kan begge land skattlegge etter sin interne rett (H2024 oppgave 10d). "
         "Her skattlegger ikke skatteparadiset renten, så det oppstår verken dobbeltbeskatning eller noe å gi "
         f"kreditt for. <b>Skatten til Norge er {kr(R11)} × 22 % = kr {kr(skatt11)}.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bare skatteparadiset</b> = motsatt. Fravær av avtale gir "
         "begge land rett til å skattlegge.<br><b>Frivillig retting fritar for skatten</b> = den som retter selv, "
         "slipper tilleggsskatt og straffeforfølgning, men betaler ordinær skatt og renter, normalt opptil ti år "
         "tilbake (F11 lb 47).<br><b>CRS til allmennheten</b> = motsatt. CRS gir ikke innsyn for tredjepart. Bare "
         "skattemyndighetene mottar opplysningene (F11 lb 40). Norge mottok opplysninger om om lag 115 000 kontoer "
         "ved første utveksling (lb 44).</p>"
         "<p><b>Strategi med minuspoeng.</b> Spør først hvem som er skattepliktig: bosted i Norge betyr skatt på "
         "alt. Da faller utsagnet om at bare kildelandet kan skattlegge, bort.</p>")
EX.append(oppgave(11, "Haldor og kontoen i et skatteparadis", "Skatteparadis", [13], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Kjøpekraften etter 20 år")
i12, pi12, n12 = 0.09, 0.03, 20
k12 = ((1 + i12) / (1 + pi12)) ** n12
g12_appr = (1 + i12 - pi12) ** n12
g12_nom = (1 + i12) ** n12
g12_lin = 1 + n12 * (i12 - pi12)
print(f"   {k12}; gale {g12_appr}, {g12_nom}, {g12_lin}")
assert kr(k12, 2) == "3,10"


def alt12(x):
    return (f"{kr(x, 2)} ganger", [kr(x, 2)])


p = ledd("", "<p>Signy har hatt pengene sine i et globalt aksjefond i 20 år. Fondet har gitt 9 % nominell avkastning hvert "
             "år. Inflasjonen har vært 3 % hvert år. Hvor mange ganger større kjøpekraft har beløpet fått i løpet av de "
             "20 årene? Bruk den eksakte formelen for realavkastning. Se bort fra skatt og kostnader. Svar med to "
             "desimaler.</p>",
         alt12(k12),
         [alt12(g12_appr), alt12(g12_nom), alt12(g12_lin)],
         sol("Realavkastningen er 1 + r = (1 + i)/(1 + π), der i er nominell avkastning og π inflasjonen (F2 lb 41; "
             "manualen 3.2). Over flere år vokser kjøpekraften med rentes rente: (1 + r)<sup>20</sup>.",
             [f"Realavkastning: 1,09/1,03 − 1 = {pst((1 + i12) / (1 + pi12) - 1, 3)}.",
              f"Vekst over 20 år: {kr((1 + i12) / (1 + pi12), 6)}<sup>20</sup> = <b>{kr(k12, 2)} ganger</b>."],
             [(f"{kr(g12_appr, 2)} ganger", "tilnærmingen r ≈ 9 % − 3 % = 6 %: 1,06<sup>20</sup>. Den gir for høyt "
                                             "tall, fordi avviket r × π vokser over 20 år."),
              (f"{kr(g12_nom, 2)} ganger", "nominell vekst, 1,09<sup>20</sup>. Inflasjonen er glemt."),
              (f"{kr(g12_lin, 2)} ganger", "lineær regning, 1 + 20 × 6 %. Rentes rente er glemt.")],
             f"Nominell vekst delt på prisveksten: {kr(g12_nom, 4)}/{kr((1 + pi12) ** n12, 4)} = {kr(k12, 2)}. ✓",
             "Riktig svar må ligge under 1,06<sup>20</sup>, fordi den eksakte realrenten er litt under 6 %. Det "
             "stryker både tilnærmingen og den nominelle veksten."))
EX.append(oppgave(12, "Kjøpekraften etter 20 år i aksjefond", "Investeringscaser", [3], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: Brynhild og nevøen Teodor")
ER13, RF13, SD13, G13 = 0.065, 0.02, 0.15, 5
w13 = (ER13 - RF13) / (G13 * SD13 ** 2)
g13_sd = (ER13 - RF13) / (G13 * SD13)
g13_tot = ER13 / (G13 * SD13 ** 2)
g13_bank = 1 - w13
F13, H13, ALDER13 = 500_000, 4_000_000, 28
belop13 = w13 * (F13 + H13)
andel13 = belop13 / F13
assert lik(w13, 0.40) and lik(belop13, 1_800_000) and lik(andel13, 3.6)
print(f"   w {w13}; gale {g13_sd}, {g13_tot}, {g13_bank}; beløp {belop13}, andel {andel13}")
body13 = ("<p>Et globalt aksjefond har forventet avkastning 6,5 % og standardavvik 15 %. Risikofri rente er 2 %. "
          "Bruk Mertons formel for optimal andel av totalformuen i aksjer.</p>")
p13a = ledd("a", "<p>Brynhild er pensjonist og har bare finansiell formue. Nyttefunksjonen hennes er "
                 "U = c<sup>1−γ</sup>/(1 − γ) med γ = 5. Hvor stor andel av formuen bør hun ha i aksjefondet? Svar med "
                 "én desimal.</p>",
            (pst(w13, 1), [pst(w13, 1)]),
            [(pst(g13_sd, 1), [pst(g13_sd, 1)]),
             (pst(g13_tot, 1), [pst(g13_tot, 1)]),
             (pst(g13_bank, 1), [pst(g13_bank, 1)])],
            sol("Mertons andel er w = (E(r) − r<sub>f</sub>)/(γσ²). γ i nyttefunksjonen er den samme γ som i formelen "
                "(ForelesningAksjesparing2026 (6), side 11–12; kursgodkjenningen 2026 spørsmål 12). En pensjonist uten "
                "humankapital har bare finansformuen, så andelen gjelder den direkte.",
                ["Meravkastning: 6,5 % − 2 % = 4,5 %. Varians: 0,15² = 0,0225.",
                 f"w = 0,045/(5 × 0,0225) = 0,045/0,1125 = <b>{pst(w13, 1)}</b>."],
                [(pst(g13_sd, 1), "standardavviket er brukt i stedet for variansen: 0,045/(5 × 0,15)."),
                 (pst(g13_tot, 1), "hele avkastningen er brukt i telleren, ikke meravkastningen: 0,065/0,1125."),
                 (pst(g13_bank, 1), "andelen i banken.")],
                "γ = 5 og w = 40 % gir 5 × 0,0225 × 0,40 = 0,045, nøyaktig meravkastningen. ✓"))
p13b = ledd("b", f"<p>Nevøen hennes, Teodor, er {ALDER13} år og har samme γ. Han har kr {kr(F13)} i finansformue og en "
                 f"risikofri humankapital på kr {kr(H13)}. Han kan ikke låne. Hvilket utsagn er riktig?</p>",
            (f"Hele finansformuen bør stå i aksjefondet, fordi Mertons aksjebeløp er kr {kr(belop13)}",
             [kr(belop13)]),
            [(f"Han bør ha {pst(w13, 0).replace(' %', '')} % av finansformuen i fondet, som Brynhild, fordi de har "
              "samme γ", [kr(100 * w13)]),
             (f"Han bør ha {100 - ALDER13} % av finansformuen i fondet, etter tommelfingerregelen 100 − alder",
              [str(100 - ALDER13), "100"]),
             ("Han bør ikke eie aksjer, fordi humankapitalen hans allerede virker som en aksjeplassering", [])],
            "<p><b>Regelen.</b> Mertons andel gjelder totalformuen, også humankapitalen. Risikofri humankapital virker "
            "som et stort bankinnskudd, så aksjene må ligge i finansformuen. Uten mulighet til å låne er taket 100 % "
            "(ForelesningAksjesparing2026 (6), side 13–14 og 17; manualen 14.4). <b>Utsagnet om hele finansformuen er "
            "riktig.</b></p>"
            "<p><b>Regnestykket.</b></p><p>"
            f"1. Totalformue: {kr(F13)} + {kr(H13)} = {kr(F13 + H13)}.<br>"
            f"2. Aksjebeløp: {pst(w13, 0)} × {kr(F13 + H13)} = {kr(belop13)}.<br>"
            f"3. Det er {kr(100 * andel13)} % av finansformuen. Han kan ikke låne, så han setter alt i fondet.</p>"
            "<p><b>Hvorfor de andre er gale.</b></p><p><b>Som Brynhild</b> = lik γ gir lik andel av totalformuen, ikke av "
            "finansformuen. Brynhild har ingen humankapital, Teodor har mye.<br><b>100 − alder</b> = tommelfingerregelen "
            f"peker riktig vei for unge (side 17), men den er en grov regel. Mertons formel med humankapitalen gir her "
            f"{kr(100 * andel13)} %. Uten lån blir svaret 100 %.<br>"
            "<b>Ingen aksjer</b> = det gjelder humankapital "
            "som svinger med børsen, β = 1 (side 15). Teodors humankapital er risikofri.</p>"
            "<p><b>Strategi med minuspoeng.</b> Les om humankapitalen er risikofri eller aksjelik før du regner. "
            "Risikofri gir høyere aksjeandel av finansformuen, aksjelik gir lavere.</p>")
EX.append(oppgave(13, "Merton for en pensjonist og en ung nevø", "Porteføljevalg", [14], body13, [p13a, p13b]))

# ======================================================================= 14
print("\nOppgave 14: Ragnfrid velger pensjonskontrakt")
A14, Bl14, Bh14 = 620_000, 360_000, 1_000_000
Eu14 = 0.5 * math.sqrt(Bl14) + 0.5 * math.sqrt(Bh14)
CE14 = Eu14 ** 2
E14 = 0.5 * Bl14 + 0.5 * Bh14
RP14 = E14 - CE14
assert lik(CE14, 640_000) and lik(Eu14, 800) and lik(RP14, 40_000)
print(f"   CE {CE14}, E {E14}, RP {RP14}, U(A) {math.sqrt(A14)}")
body14 = (f"<p>Ragnfrid er risikoavers med nyttefunksjonen U(W) = √W. Hun skal velge mellom to pensjonskontrakter. "
          f"Kontrakt A gir en utbetaling på kr {kr(A14)} helt sikkert. Kontrakt B gir kr {kr(Bl14)} eller "
          f"kr {kr(Bh14)}, med 50 % sannsynlighet for hvert utfall.</p>")
p14a = ledd("a", "<p>Hva er sikkerhetsekvivalenten til kontrakt B?</p>",
            (f"Kr {kr(CE14)}", [kr(CE14)]),
            [(f"Kr {kr(E14)}", [kr(E14)]),
             (f"Kr {kr(RP14)}", [kr(RP14)]),
             (f"Kr {kr(Eu14)}", [kr(Eu14)])],
            sol("Sikkerhetsekvivalenten er det sikre beløpet som gir samme nytte som forventet nytte av kontrakten: "
                "CE = (E[√W])² (manualen 17.1; kursgodkjenningen 2026 spørsmål 11).",
                [f"E[√W] = 0,5 × √{kr(Bl14)} + 0,5 × √{kr(Bh14)} = 0,5 × 600 + 0,5 × 1 000 = {kr(Eu14)}.",
                 f"CE = {kr(Eu14)}² = <b>kr {kr(CE14)}</b>."],
                [(f"Kr {kr(E14)}", "forventet utbetaling. Det er sikkerhetsekvivalenten bare for en risikonøytral."),
                 (f"Kr {kr(RP14)}", f"risikopremien, {kr(E14)} − {kr(CE14)}."),
                 (f"Kr {kr(Eu14)}", "forventet nytte. Nytte er ikke kroner. Tallet må kvadreres.")],
                f"Risikopremien er positiv: {kr(E14)} − {kr(CE14)} = {kr(RP14)}. Det skal den være for en risikoavers. ✓"))
p14b = ledd("b", "<p>Hvilken kontrakt velger Ragnfrid? Hvorfor?</p>",
            (f"B, fordi sikkerhetsekvivalenten til B er over de sikre kr {kr(A14)} i A", [kr(A14)]),
            [("A, fordi en risikoavers person alltid foretrekker en sikker utbetaling framfor risiko", []),
             ("B, fordi hun velger den kontrakten som har høyest forventet utbetaling", []),
             ("Hun er indifferent, fordi forventet nytte er den samme i de to kontraktene", [])],
            "<p><b>Regelen.</b> En risikoavers person velger kontrakten med høyest forventet nytte, altså høyest "
            "sikkerhetsekvivalent (manualen 17.1). Hun krever en risikopremie for å ta risiko, men hun velger ikke "
            "alltid det sikre. <b>B er riktig, fordi sikkerhetsekvivalenten er høyere enn A.</b></p>"
            "<p><b>Regnestykket.</b></p><p>"
            f"1. Nytte av A: √{kr(A14)} = {kr(math.sqrt(A14), 1)}.<br>"
            f"2. Forventet nytte av B: {kr(Eu14)}, altså CE = {kr(CE14)} &gt; {kr(A14)}.<br>"
            "3. Hun velger B.</p>"
            "<p><b>Hvorfor de andre er gale.</b></p><p><b>Alltid sikker</b> = risikoaversjon betyr at risiko koster, "
            f"her {kr(RP14)}. Forventningen i B er {kr(E14 - A14)} høyere enn A, så B vinner likevel.<br><b>Høyest "
            "forventet utbetaling</b> = det er regelen til en risikonøytral. Var A på kr 660 000, ville hun valgt A, "
            "selv om B fortsatt har høyest forventning.<br><b>Indifferent</b> = forventet nytte er "
            f"{kr(math.sqrt(A14), 1)} mot {kr(Eu14)}, ikke lik.</p>"
            "<p><b>Strategi med minuspoeng.</b> Et riktig valg med feil begrunnelse er galt når spørsmålet spør hvorfor. "
            "Les begrunnelsen før du krysser.</p>")
EX.append(oppgave(14, "Ragnfrid velger pensjonskontrakt", "Forsikring og forventet nytte", [17, 15], body14,
                  [p14a, p14b]))

# ======================================================================= 15
print("\nOppgave 15: Kostnader over tid og et fondseksperiment")
I15, KI15, KA15, N15, B15 = 0.07, 0.002, 0.017, 30, 300_000
vi15 = B15 * (1 + I15 - KI15) ** N15
va15 = B15 * (1 + I15 - KA15) ** N15
tap15 = 1 - va15 / vi15
g15_lin = (KA15 - KI15) * N15
g15_diff = 1 - ((1 + I15 - KA15) / (1 + I15)) ** N15
g15_motsatt = vi15 / va15 - 1
print(f"   tap {tap15}; gale {g15_lin}, {g15_diff}, {g15_motsatt}; verdier {vi15}, {va15}")
body15 = "<p>To spørsmål om indeksfond og aktiv forvaltning.</p>"
p15a = ledd("a", f"<p>Marthe setter kr {kr(B15)} i et aksjefond og lar pengene stå i 30 år. Et indeksfond koster 0,2 % i "
                 "året og et aktivt fond 1,7 % i året. Begge gir 7,0 % i året før kostnader. Kostnadene trekkes fra "
                 "avkastningen hvert år. Hvor stor andel av sluttverdien i indeksfondet taper hun ved å velge det aktive "
                 "fondet? Svar med én desimal.</p>",
            (pst(tap15, 1), [pst(tap15, 1)]),
            [(pst(g15_lin, 1), [pst(g15_lin, 1)]),
             (pst(g15_diff, 1), [pst(g15_diff, 1)]),
             (pst(g15_motsatt, 1), [pst(g15_motsatt, 1)])],
            sol("Begge fondene vokser med rentes rente etter kostnader: 6,8 % og 5,3 % i året. Andelen hun taper, er "
                "1 minus forholdet mellom sluttverdiene. Aktive fond koster ofte 1–2 % i året (ForelesningAksjesparing2026 "
                "(6), side 73), om lag fem ganger så mye som indeksfond (Finansiell psykologi 2026, side 49).",
                [f"Forholdet per år: 1,053/1,068 = {kr(1.053 / 1.068, 5)}.",
                 f"Over 30 år: {kr(1.053 / 1.068, 5)}<sup>30</sup> = {kr(va15 / vi15, 4)}.",
                 f"Tap: 1 − {kr(va15 / vi15, 4)} = <b>{pst(tap15, 1)}</b>."],
                [(pst(g15_lin, 1), "lineær regning: 1,5 prosentpoeng × 30 år."),
                 (pst(g15_diff, 1), "indeksfondets kostnad er glemt: 1 − (1,053/1,070)<sup>30</sup>."),
                 (pst(g15_motsatt, 1), "forskjellen er målt mot sluttverdien i det aktive fondet, ikke i indeksfondet.")],
                f"I kroner: indeksfondet blir {kr(vi15)} og det aktive fondet {kr(va15)}. Differansen {kr(vi15 - va15)} "
                f"er {pst((vi15 - va15) / vi15, 1)} av {kr(vi15)}. ✓"))
p15b = ledd("b", "<p>Næss og medforfattere ga en tilfeldig halvpart av om lag 590 norske fondskunder informasjon om at "
                 "indeksfond hadde gjort det bedre enn aktive fond. Den andre halvparten fikk ingen informasjon. Hva "
                 "fant de?</p>",
            ("Andelen i indeksfond økte fra om lag 11 % til 15 %. Færre trodde at de selv kunne slå markedet",
             ["11", "15"]),
            [("Kundene forsto budskapet, men ingen av dem endret porteføljene sine", []),
             ("Kundene flyttet om lag halvparten av pengene sine fra aktive fond over til indeksfond", []),
             ("Effekten på porteføljene var borte to år senere, fordi kundene gikk tilbake til de aktive fondene", [])],
            "<p><b>Regelen.</b> I eksperimentet økte de som fikk informasjonen, andelen i indeksfond med om lag 4 "
            "prosentpoeng, fra 11 % til 15 %, en effekt på 30 %. Effekten var om lag like stor to år senere. Andelen som "
            "trodde de selv kunne slå markedet, falt med 12 % (Finansiell psykologi 2026, side 50–53). <b>Utsagnet om "
            "økningen fra 11 % til 15 % er riktig.</b></p>"
            "<p><b>Hvorfor de andre er gale.</b></p><p><b>Forsto, men endret ikke</b> = det var resultatet i "
            "home bias-eksperimentet om Norge-tunge porteføljer (side 57), ikke i fondseksperimentet.<br><b>Halvparten "
            "av pengene</b> = effekten var 4 prosentpoeng, ikke en stor omfordeling.<br><b>Borte etter to år</b> = "
            "motsatt. Effekten var om lag like stor to år senere (side 52).</p>"
            "<p><b>Strategi med minuspoeng.</b> Hold de to eksperimentene fra hverandre: informasjon om gebyrer og "
            "indeksfond virket, informasjon om spredning ut av Norge virket ikke (side 54–57).</p>")
EX.append(oppgave(15, "Kostnader over tid og et fondseksperiment", "Indeksfond og aktiv forvaltning", [14],
                  body15, [p15a, p15b]))

# ======================================================================= 16
print("\nOppgave 16: Ingebjørgs pensjon")
B16, g16, TAK16, L16 = 2_400_000, 0.04, 920_000, 1_100_000
opp16 = 0.181 * min(L16, TAK16)
ny16 = B16 * (1 + g16) + opp16
g16_tak = B16 * (1 + g16) + 0.181 * L16
g16_etter = (B16 + opp16) * (1 + g16)
g16_ureg = B16 + opp16
assert lik(ny16, 2_662_520)
print(f"   {ny16}; gale {g16_tak}, {g16_etter}, {g16_ureg}")
body16 = ("<p>Ingebjørg er født i 1981. Hun har opptjening i folketrygden, innskuddspensjon gjennom jobben og litt "
          "egen sparing.</p>")
p16a = ledd("a", f"<p>Ved inngangen til 2026 har hun kr {kr(B16)} i pensjonsbeholdning i folketrygden. Beholdningen "
                 "reguleres med lønnsveksten. Anta at lønnsveksten er 4 % i 2026. Hvert år legges 18,1 % av inntekten opp til 7,1 G til "
                 f"beholdningen. Sett 7,1 G til kr {kr(TAK16)}. Hun tjener kr {kr(L16)} i 2026. Hva er beholdningen ved "
                 "utgangen av 2026? Rund av til nærmeste krone.</p>",
            (f"Kr {kr(ny16)}", [kr(ny16)]),
            [(f"Kr {kr(g16_tak)}", [kr(g16_tak)]),
             (f"Kr {kr(g16_etter)}", [kr(g16_etter)]),
             (f"Kr {kr(g16_ureg)}", [kr(g16_ureg)])],
            sol("Beholdningen øker hvert år med 18,1 % av inntekten opp til 7,1 G, cirka kr 920 000 (ForelesningPensjon "
                "(7), side 10). Før uttak reguleres den med lønnsveksten (side 18). Det som står inne ved inngangen av "
                "året, reguleres. Årets opptjening legges til ved slutten (manualen 15.1).",
                [f"Regulering: {kr(B16)} × 1,04 = {kr(B16 * (1 + g16))}.",
                 f"Opptjening: inntekten er over taket, så 18,1 % × {kr(TAK16)} = {kr(opp16)}.",
                 f"Beholdning: {kr(B16 * (1 + g16))} + {kr(opp16)} = <b>kr {kr(ny16)}</b>."],
                [(f"Kr {kr(g16_tak)}", f"taket er glemt: 18,1 % × {kr(L16)} = {kr(0.181 * L16)}."),
                 (f"Kr {kr(g16_etter)}", "årets opptjening er regulert samme år: "
                                          f"({kr(B16)} + {kr(opp16)}) × 1,04."),
                 (f"Kr {kr(g16_ureg)}", "reguleringen er glemt.")],
                f"Økningen er {kr(ny16 - B16)}: {kr(B16 * g16)} i regulering og {kr(opp16)} i opptjening. ✓"))
p16b = ledd("b", "<p>Hvilket utsagn om pensjonsformuen hennes er i tråd med forelesningen om pensjon?</p>",
            ("Folketrygden betales så lenge hun lever og er derfor også en forsikring mot å leve lenge", []),
            [("Folketrygden gir henne tilbake det hun har betalt inn, uansett hvor lenge hun lever", []),
             ("Innskuddspensjonen faller bort hvis hun dør, mens en ytelsespensjon hadde gått i arv", []),
             ("Bytter hun jobb, mister hun innskuddspensjonen hun har tjent opp hos den gamle arbeidsgiveren", [])],
            "<p><b>Regelen.</b> Folketrygden kan ikke både gi tilbake det du betalte inn og betale så lenge du lever. "
            "Det er det siste som gjelder, så pensjon er også en forsikring «mot risikoen ved å leve lenge» "
            "(ForelesningPensjon (7), side 11–13). <b>Utsagnet om forsikring mot å leve lenge er riktig.</b></p>"
            "<p><b>Hvorfor de andre er gale.</b></p><p><b>Tilbake det hun betalte inn</b> = de som lever lenge, får "
            "mer enn de andre (side 20).<br><b>Innskuddspensjonen faller bort</b> = motsatt. Innskuddspensjon "
            "arves av etterlatte ved dødsfall (side 24).<br><b>Mister den ved jobbskifte</b> = hun får et "
            "pensjonskapitalbevis. Kapitalen samles normalt på egen pensjonskonto (side 29).</p>"
            "<p><b>Strategi med minuspoeng.</b> Folketrygden er både sparing og forsikring. Utsagn som beskriver den "
            "som en vanlig konto, kan strykes.</p>")
EX.append(oppgave(16, "Ingebjørgs pensjonsbeholdning og pensjonsformue", "Pensjon", [15], body16, [p16a, p16b]))

# ======================================================================= 17
print("\nOppgave 17: Didrik låner og sparer")
INN17, STU17, BIL17, EK17 = 680_000, 260_000, 140_000, 450_000
laan17 = 5 * INN17 - STU17 - BIL17
pris17 = laan17 + EK17
pris_ek17 = EK17 / 0.10
assert pris_ek17 > pris17
g17_gjeld = 5 * INN17 + EK17
g17_ek = pris_ek17
g17_laan = laan17
assert lik(pris17, 3_450_000)
print(f"   pris {pris17}; gale {g17_gjeld}, {g17_ek}, {g17_laan}; EK-andel {EK17 / pris17}")
body17 = (f"<p>Didrik er 29 år og tjener kr {kr(INN17)} i året. Han har kr {kr(EK17)} i egenkapital, kr {kr(STU17)} i "
          f"studielån og et billån på kr {kr(BIL17)}.</p>")
p17a = ledd("a", "<p>Han vil kjøpe sin første leilighet. Bankene krever at samlet gjeld er høyst fem ganger brutto "
                 "årsinntekt. De krever også minst 10 % egenkapital. Se bort fra stresstesten og dokumentavgiften. Hva er "
                 "den høyeste prisen han kan betale for leiligheten?</p>",
            (f"Kr {kr(pris17)}", [kr(pris17)]),
            [(f"Kr {kr(g17_gjeld)}", [kr(g17_gjeld)]),
             (f"Kr {kr(g17_ek)}", [kr(g17_ek)]),
             (f"Kr {kr(g17_laan)}", [kr(g17_laan)])],
            sol("Bankene sjekker sikkerhet (10 % egenkapital) og betalingsevne (maks fem ganger inntekten) (Kvadsheim "
                "lb 13). Gjeldsgraden regnes av samlet gjeld, så studielån og billån teller med (manualen 16.3). Det "
                "laveste taket binder.",
                [f"Samlet gjeld høyst 5 × {kr(INN17)} = {kr(5 * INN17)}. Nytt lån høyst {kr(5 * INN17)} − "
                 f"{kr(STU17 + BIL17)} = {kr(laan17)}.",
                 f"Pris: {kr(laan17)} + {kr(EK17)} = <b>kr {kr(pris17)}</b>.",
                 f"Egenkapitalkravet: {kr(EK17)}/{kr(pris17)} = {pst(EK17 / pris17, 1)}, over 10 %. Det binder ikke."],
                [(f"Kr {kr(g17_gjeld)}", "studielånet og billånet er glemt i gjeldsgraden."),
                 (f"Kr {kr(g17_ek)}", f"bare egenkapitalkravet: {kr(EK17)}/10 %. Gjeldsgraden binder først."),
                 (f"Kr {kr(g17_laan)}", "det største nye lånet, ikke prisen. Egenkapitalen kommer i tillegg.")],
                f"Med pris {kr(pris17)} blir samlet gjeld {kr(laan17)} + {kr(STU17 + BIL17)} = {kr(5 * INN17)}, "
                "nøyaktig fem ganger inntekten. ✓"))
p17b = ledd("b", "<p>Etter boligkjøpet vil Didrik spare i aksjefond. Han vurderer individuell pensjonssparing (IPS) og "
                 "aksjesparekonto (ASK). Hvilket utsagn er riktig?</p>",
            ("IPS gir fradrag for innskudd og fritak for formuesskatt, men pengene er bundet til pensjonsalder", []),
            [("ASK gir fritak for formuesskatt som IPS, men pengene på kontoen kan tas ut når som helst", []),
             ("På ASK skattlegges gevinsten hver gang du selger ett aksjefond og kjøper et annet inne på kontoen", []),
             ("Uttak fra IPS skattlegges med 37,84 %, akkurat som gevinst som tas ut fra en ASK", ["37,84"])],
            "<p><b>Regelen.</b> IPS gir utsatt skatt og fritak for formuesskatt, men binder pengene til pensjonsalder "
            "(ForelesningPensjon (7), side 33). Kvadsheim lister «null formuesskatt fortsatt» og bindingstiden blant "
            "hovedpunktene. Innskuddet økes til kr 25 000 i 2026 (Kvadsheim lb 51–52). <b>Utsagnet om fradrag, "
            "formuesskattefritak og binding er riktig.</b></p>"
            "<p><b>Hvorfor de andre er gale.</b></p><p><b>ASK fritatt for formuesskatt</b> = nei. Aksjer og fond på "
            "ASK har formuesverdi 80 % som ellers (manualen 14.6).<br><b>Skatt ved bytte på ASK</b> = motsatt. Kjøp "
            "og salg inne på kontoen utløser ingen skatt. Skatten kommer først når du tar ut mer enn du har satt inn "
            "(manualen 4.5 og 14.6).<br><b>37,84 % på IPS-uttak</b> = uttak fra IPS skattlegges som alminnelig inntekt "
            "med 22 %. Samme sats inn og ut gir skattesymmetri (Kvadsheim lb 51; manualen 15.5).</p>"
            "<p><b>Strategi med minuspoeng.</b> Skill de to: IPS er en pensjonskonto med fradrag og binding, ASK er en "
            "vanlig konto med utsatt eierskatt.</p>")
EX.append(oppgave(17, "Didrik låner og sparer", "Lån", [16, 14], body17, [p17a, p17b]))

# ======================================================================= 18
print("\nOppgave 18: Alfhild og hydrogenaksjen")
p = ledd("", "<p>Alfhild har kjøpt aksjer i et selskap som utvikler hydrogenferger. Hun leser grundig alle analyser som "
             "anbefaler å kjøpe aksjen, men hopper over artikler som peker på problemer i selskapet. Hvilken skjevhet "
             "beskriver best det hun gjør?</p>",
         ("Bekreftelsesbias", []),
         [("Disposisjonseffekten", []),
          ("Flokkmentalitet", []),
          ("Ankereffekt", [])],
         "<p><b>Regelen.</b> Bekreftelsesbias er «tendensen til å søke informasjon som bekrefter egne antakelser» "
         "(Finansiell psykologi 2026, side 16). Alfhild leser det som støtter kjøpet. Resten hopper hun over. "
         "<b>Bekreftelsesbias er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Disposisjonseffekten</b> = å selge aksjer med gevinst for "
         "tidlig og beholde tapende aksjer for lenge (side 27). Teksten sier ingenting om salg.<br>"
         "<b>Flokkmentalitet</b> = å følge mengden uten å ta hensyn til egen informasjon (side 16 og 36).<br>"
         "<b>Ankereffekt</b> = å legge for stor vekt på den første informasjonen man får (side 16).</p>"
         "<p><b>Strategi med minuspoeng.</b> Finn verbet i teksten: hun velger hva hun leser. Det er informasjon, ikke "
         "kjøp, salg eller pris. Da står bare bekreftelsesbias igjen.</p>")
EX.append(oppgave(18, "Alfhild og hydrogenaksjen", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= 19
print("\nOppgave 19: Hva er moralsk hasard")
p = ledd("", "<p>Forsikringsmarkedet har flere kjente problemer. Hvilket av eksemplene er moralsk hasard?</p>",
         ("Etter at Mons fikk full reiseforsikring, lar han oftere mobilen ligge igjen på kafébordet", []),
         [("Fride vet at helsen hennes er dårlig og kjøper derfor en frivillig uføreforsikring", []),
          ("Et selskap vil ikke forsikre mot arbeidsledighet, fordi den rammer mange kunder samtidig", []),
          ("Sigvald velger høy egenandel mot lavere premie, fordi han vet at han selv er forsiktig", [])],
         "<p><b>Regelen.</b> Moralsk hasard er at den som er fullt forsikret, passer dårligere på tingene sine. "
         "Selskapet kan ikke observere det. Mottiltaket er egenandel (manualen 17.6; kursgodkjenningen 2026 spørsmål "
         "15). Mons endrer atferden etter at forsikringen er kjøpt. <b>Eksempelet med Mons er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Fride</b> = ugunstig utvalg: de med høy risiko kjøper "
         "forsikringen. Det vet de før avtalen.<br><b>Arbeidsledighet</b> = manglende diversifisering: risikoen "
         "rammer alle kundene på én gang.<br><b>Sigvald</b> = egenandelen sorterer kundene. Den virker mot ugunstig "
         "utvalg, fordi forsiktige kunder velger den.</p>"
         "<p><b>Strategi med minuspoeng.</b> Spør når informasjonen oppstår. Endret atferd etter avtalen er moralsk "
         "hasard. Skjult risiko før avtalen er ugunstig utvalg.</p>")
EX.append(oppgave(19, "Moralsk hasard eller noe annet", "Forsikring", [17], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove15",
    "kind": "mock",
    "label": "Prøveeksamen 15",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Tredje del av prediksjonen for eksamen 12. november: «2026-forelesningene». Den tar det som er nytt i "
             "forelesningsplanen og kursgodkjenningen 2026, i H2025-format og med H2025-vanskelighetsgrad. Oppgave 1–12 "
             "er skattedelen (18 ledd), oppgave 13–19 finansdelen (12 ledd). Vriene er blant annet ubenyttet skjerming ved "
             "salg, primærbolig over 14 mill., formuesskatt over to satstrinn, investorer med ulik avkastning under "
             "formuesskatten, stykkskatt med prisfunksjoner, utflytting med bolig i Norge, skatteparadis uten avtale, "
             "Merton med tak på 100 %, pensjonsbeholdningen gjennom ett år og Kvadsheims lånetak."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort. Noen er forenklet som i H2025. Da sier teksten fra.",
        "Laget av appen etter mønster fra H2025, kursgodkjenningen og 2026-lysbildene. Det er ikke kontrollert av "
        "kurset.",
    ],
    "practiceNote": ("Faktaleddene her kan slås opp på et bestemt lysbilde. Les forelesning 7, 10 og 11 hos Schjelderup "
                     "og pensjons- og aksjesparingsforelesningene til Næss før du tar settet."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove15.json")
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
