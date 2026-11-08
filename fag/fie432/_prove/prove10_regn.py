"""Prøveeksamen 10 (FIE432): regner alle tall, bygger prove10.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove10_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p10) sier,
3. skriver prove10.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p10"]
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
print("\nOppgave 1: Ragnvald og aksjene i Saltfjell Energi ASA")
K1 = 5_000_000
r1 = [0.04, 0.02]
D1 = [150_000, 400_000]
MV1 = [5_000_000, 6_000_000]
TE1, TF1, RAB1 = 0.40, 0.01, 0.80
skj1a = K1 * r1[0]
ub1 = max(0.0, skj1a - D1[0])
skpl1a = max(0.0, D1[0] - skj1a)
grl1b = K1 + ub1
skj1b = grl1b * r1[1]
tilg1b = skj1b + ub1
skpl1b = max(0.0, D1[1] - tilg1b)
eier1 = (skpl1a + skpl1b) * TE1
form1 = sum(MV1) * RAB1 * TF1
a1 = sum(D1) - eier1 - form1
g1_ub = sum(D1) - (D1[1] - K1 * r1[1]) * TE1 - form1          # ubenyttet skjerming glemt
g1_kost = sum(D1) - eier1 - 2 * MV1[1] * RAB1 * TF1            # formuesskatt av verdien ved utgangen av år 2 begge år
g1_rab = sum(D1) - eier1 - sum(MV1) * TF1                      # aksjerabatten glemt
assert lik(a1, 362_400) and lik(ub1, 50_000) and lik(skpl1b, 249_000) and lik(form1, 88_000)
print(f"   ub {ub1}, skpl år 2 {skpl1b}, eierskatt {eier1}, formuesskatt {form1}, netto {a1}; "
      f"gale {g1_ub}, {g1_kost}, {g1_rab}")
body1 = (f"<p>Ragnvald kjøpte børsnoterte aksjer i Saltfjell Energi ASA i januar år 1 for kr {kr(K1)}, som er kostprisen. "
         f"Han eier aksjene ved utgangen av år 1 og år 2. Han mottar kr {kr(D1[0])} i utbytte i år 1 og kr {kr(D1[1])} i "
         f"år 2. Skjermingsrenten er 4 % i år 1 og 2 % i år 2. Markedsverdien er kr {kr(MV1[0])} ved utgangen av år 1 og "
         f"kr {kr(MV1[1])} ved utgangen av år 2. Anta at eierskatten er 40 % av skattepliktig utbytte, at formuesskatten "
         "er 1 % og at aksjer verdsettes til 80 % av markedsverdien. Satsene er forenklet. Du kan se bort fra "
         "bunnfradrag.</p>")
p = ledd("", "<p>Hvor mye sitter Ragnvald igjen med av de to utbyttene etter at han har betalt eierskatt og "
             "formuesskatt for begge årene?</p>",
         (f"Kr {kr(a1)}", [kr(a1)]),
         [(f"Kr {kr(g1_ub)}", [kr(g1_ub)]),
          (f"Kr {kr(g1_kost)}", [kr(g1_kost)]),
          (f"Kr {kr(g1_rab)}", [kr(g1_rab)])],
         sol("To skatter treffer samme aksjepost med hvert sitt grunnlag. Eierskatten treffer utbyttet minus "
             "skjermingsfradraget. Er utbyttet mindre enn skjermingen, framføres resten og legges til grunnlaget året "
             "etter (manualen 5.3). Formuesskatten treffer formuesverdien ved utgangen av hvert år, altså markedsverdien "
             "etter rabatt (manualen 5.5 og 7.2).",
             [f"År 1: skjerming {kr(K1)} × 4 % = {kr(skj1a)}. Utbyttet er {kr(D1[0])}, så ingenting er skattepliktig og "
              f"{kr(ub1)} framføres.",
              f"År 2: grunnlaget er {kr(K1)} + {kr(ub1)} = {kr(grl1b)}. Skjerming {kr(grl1b)} × 2 % = {kr(skj1b)}, pluss "
              f"framført {kr(ub1)} = {kr(tilg1b)}. Skattepliktig {kr(D1[1])} − {kr(tilg1b)} = {kr(skpl1b)}. Eierskatt "
              f"{kr(skpl1b)} × 40 % = {kr(eier1)}.",
              f"Formuesskatt: ({kr(MV1[0])} + {kr(MV1[1])}) × 80 % × 1 % = {kr(form1)}.",
              f"Netto: {kr(sum(D1))} − {kr(eier1)} − {kr(form1)} = <b>kr {kr(a1)}</b>."],
             [(f"Kr {kr(g1_ub)}", f"den ubenyttede skjermingen fra år 1 er glemt: eierskatt ({kr(D1[1])} − "
               f"{kr(K1 * r1[1])}) × 40 % = {kr((D1[1] - K1 * r1[1]) * TE1)}."),
              (f"Kr {kr(g1_kost)}", f"formuesskatten er regnet av verdien ved utgangen av år 2 begge år: {kr(MV1[1])} × "
               f"80 % × 1 % × 2 = {kr(2 * MV1[1] * RAB1 * TF1)}. Formuen måles ved utgangen av hvert år og i år 1 var den "
               f"{kr(MV1[0])}."),
              (f"Kr {kr(g1_rab)}", f"aksjerabatten er glemt: ({kr(MV1[0])} + {kr(MV1[1])}) × 1 % = "
               f"{kr(sum(MV1) * TF1)}.")],
             f"Skattene utgjør {kr(eier1 + form1)} av {kr(sum(D1))}. Eierskatten alene uten skjerming ville vært "
             f"{kr(sum(D1) * TE1)}. Skjermingen på til sammen {kr(skj1a + skj1b)} sparer {kr(sum(D1) * TE1 - eier1)} "
             f"= {kr(skj1a + skj1b)} × 40 %, fordi all skjerming er brukt innen år 2. ✓",
             "Begge formuesskattefeilene gir tall som ligger tett. Regn formuesskatten først. Den er lik for to av "
             "alternativene og da står bare spørsmålet om skjermingen igjen."))
EX.append(oppgave(1, "Utbytte, skjerming og formuesskatt over to år", "Aksjonærmodellen", [5, 7], body1, [p]))

# ======================================================================= 2
print("\nOppgave 2: Henrikkes formue")
PB2, SB2, AK2, G2 = 6_000_000, 3_000_000, 3_000_000, 6_000_000
v2 = {"pb": 0.25, "sb": 1.0, "ak": 0.80}
mv2 = {"pb": PB2, "sb": SB2, "ak": AK2}
sum2 = sum(mv2.values())
fv2 = {k: mv2[k] * v2[k] for k in mv2}
gj2 = {k: G2 * mv2[k] / sum2 for k in mv2}
fr2 = {"pb": gj2["pb"], "sb": gj2["sb"], "ak": gj2["ak"] * v2["ak"]}
a2 = sum(fv2.values()) - sum(fr2.values())
g2_ingen = sum(fv2.values()) - G2                                   # ingen gjeldsreduksjon
g2_bolig = sum(fv2.values()) - (gj2["pb"] * v2["pb"] + gj2["sb"] + gj2["ak"] * v2["ak"])  # boliggjeld også redusert
g2_hele = sum(fv2.values()) - G2 * v2["ak"]                        # hele gjelden redusert med aksjerabatten
assert lik(a2, 1_200_000) and lik(g2_ingen, 900_000) and lik(g2_bolig, 3_450_000) and lik(g2_hele, 2_100_000)
print(f"   formuesverdi {sum(fv2.values())}, gjeld {gj2}, fradrag {fr2}, netto {a2}; gale {g2_ingen}, {g2_bolig}, {g2_hele}")
body2 = (f"<p>Henrikke er enslig og eier en primærbolig med markedsverdi kr {kr(PB2)}, en utleieleilighet som er "
         f"sekundærbolig med markedsverdi kr {kr(SB2)} og børsnoterte aksjer med markedsverdi kr {kr(AK2)}. Gjelden hennes "
         f"er kr {kr(G2)}. Formuesverdien er 25 % av markedsverdien for primærboligen, 100 % for sekundærboligen og 80 % "
         "for aksjene. Gjelden fordeles forholdsmessig og gjeldsreduksjonen etter reglene for 2026 skal brukes.</p>")
p = ledd("", "<p>Hva er Henrikkes skattepliktige nettoformue? Du kan se bort fra bunnfradrag.</p>",
         (f"Kr {kr(a2)}", [kr(a2)]),
         [(f"Kr {kr(g2_ingen)}", [kr(g2_ingen)]),
          (f"Kr {kr(g2_bolig)}", [kr(g2_bolig)]),
          (f"Kr {kr(g2_hele)}", [kr(g2_hele)])],
         sol("Gjelden fordeles etter markedsverdiene før rabatt. Gjeld som faller på eiendeler med verdsettingsrabatt, "
             "reduseres med samme rabatt. Unntaket er primærboligen: gjelden som faller på den, teller fullt. "
             "Sekundærboligen har ingen rabatt, så gjelden der teller også fullt (manualen 7.4).",
             [f"Andeler av {kr(sum2)}: primærbolig 50 %, sekundærbolig 25 %, aksjer 25 %. Gjelden fordeles "
              f"{kr(gj2['pb'])}, {kr(gj2['sb'])} og {kr(gj2['ak'])}.",
              f"Formuesverdier: {kr(fv2['pb'])} + {kr(fv2['sb'])} + {kr(fv2['ak'])} = {kr(sum(fv2.values()))}.",
              f"Fradragsberettiget gjeld: {kr(gj2['pb'])} + {kr(gj2['sb'])} + {kr(gj2['ak'])} × 80 % = "
              f"{kr(sum(fr2.values()))}.",
              f"Nettoformue: {kr(sum(fv2.values()))} − {kr(sum(fr2.values()))} = <b>kr {kr(a2)}</b>."],
             [(f"Kr {kr(g2_ingen)}", "gjeldsreduksjonen er ikke brukt. Teksten sier at den skal brukes."),
              (f"Kr {kr(g2_bolig)}", f"gjelden på primærboligen er også redusert med 75 %, til {kr(gj2['pb'] * 0.25)}. "
               "Primærbolig gir aldri gjeldsreduksjon."),
              (f"Kr {kr(g2_hele)}", f"hele gjelden er redusert med aksjerabatten: {kr(G2)} × 80 % = {kr(G2 * 0.8)}.")],
             f"Bare aksjedelen av gjelden endres: den faller fra {kr(gj2['ak'])} til {kr(fr2['ak'])}. Uten "
             f"gjeldsreduksjon blir nettoformuen {kr(g2_ingen)} og {kr(g2_ingen)} + {kr(gj2['ak'] - fr2['ak'])} = "
             f"{kr(a2)}. ✓",
             "Gjeldsreduksjonen kan bare løfte nettoformuen med 20 % av aksjegjelden. Et svar som ligger millioner over "
             "tallet uten reduksjon, har redusert for mye."))
EX.append(oppgave(2, "Nettoformue med bolig, utleieleilighet og aksjer", "Formuesskatt", [7], body2, [p]))

# ======================================================================= 3
print("\nOppgave 3: Oddny og formuesskatten som avkastningsskatt")
I3, CF3, TW3, TS3 = 50.0, 4.0, 0.01, 0.22
F3 = I3 * TW3
r3 = CF3 / I3
a3 = F3 / CF3
g3a_slutt = TW3 * (1 + r3) / r3
g3a_b = F3 / (CF3 * (1 - TS3))
g3a_etter = F3 / (CF3 - F3)
b3 = F3 / (CF3 * (1 - TS3))
g3b_a = a3
g3b_samlet = (CF3 * TS3 + F3) / CF3
g3b_gang = F3 * (1 - TS3) / CF3
CF3c = 2.0
c3 = CF3c / r3
g3c_anker = I3
g3c_etter = CF3c / (r3 - TW3)
g3c_trekk = (CF3c - TW3 * c3) / r3
RAB3 = 0.5
F3d = TW3 * RAB3 * c3                               # formuesskatt på markedsverdien fra c, med 50 % formuesverdi
d3 = (CF3c - F3d) / (r3 - TW3)                      # F8 lb 24: diskontert med alternativavkastningen etter formuesskatt
g3d_lik = c3                                        # rabatten glemt
g3d_marked = (CF3c - F3d) / r3                      # diskontert med markedets 8 %
g3d_egen = CF3c / (r3 - TW3)                        # egen formuesskatt glemt
assert lik(a3, 0.125) and lik(c3, 25) and lik(F3d, 0.125) and abs(d3 - 26.7857) < 1e-3
print(f"   a {a3}: {g3a_slutt}, {g3a_b}, {g3a_etter}; b {b3}: {g3b_a}, {g3b_samlet}, {g3b_gang}; "
      f"c {c3}: {g3c_anker}, {g3c_etter}, {g3c_trekk}; d {d3:.4f}: {g3d_lik}, {g3d_marked:.4f}, {g3d_egen:.4f}")
body3 = ("<p>Anta at kapitalmarkedet er effisient, slik at alle investeringer i samme risikoklasse gir samme avkastning. "
         f"Oddny kjøper børsnoterte aksjer for kr {kr(I3)} mill. ved begynnelsen av året. Aksjene gir en kontantstrøm på "
         f"kr {kr(CF3)} mill. ved slutten av året og da selges de for kr {kr(I3)} mill. Formuesskatten er 1 % av "
         "markedsverdien ved begynnelsen av året. Satsen er forenklet. Du kan se bort fra aksjerabatten, bunnfradrag og "
         "skatt på kapitalinntekt.</p>")
pa = ledd("a", "<p>Hvor stor del av avkastningen tar formuesskatten?</p>",
          (pst(a3), [pst(a3)]),
          [(pst(g3a_slutt), [pst(g3a_slutt)]),
           (pst(g3a_b), [pst(g3a_b)]),
           (pst(g3a_etter), [pst(g3a_etter)])],
          sol("Formuesskatten betales av formuen ved begynnelsen av perioden, men regnet som andel av avkastningen er den "
              "τ<sub>w</sub>/r: satsen delt på avkastningen før skatt (manualen 8.1 og 8.2).",
              [f"Avkastningen: {kr(CF3)} mill. (kjøp og salg til samme pris), altså {pst(r3)}.",
               f"Formuesskatten: {kr(I3)} mill. × 1 % = {kr(F3, 1)} mill.",
               f"Andel: {kr(F3, 1)}/{kr(CF3)} = <b>{pst(a3)}</b>."],
              [(pst(g3a_slutt), f"formuesskatten er regnet av formuen ved slutten av året, {kr(I3 + CF3)} mill. Teksten "
                "sier begynnelsen."),
               (pst(g3a_b), "avkastningen er regnet etter 22 % selskapsskatt. Det er svaret på b, men her skal du se bort "
                "fra annen skatt."),
               (pst(g3a_etter), f"nevneren er avkastningen etter formuesskatt: {kr(F3, 1)}/{kr(CF3 - F3, 1)}.")],
              f"1 %/{pst(r3, 0)} = {pst(a3)}. ✓"))
pb = ledd("b", f"<p>Anta i stedet (bare i denne deloppgaven) at kontantstrømmen på kr {kr(CF3)} mill. er selskapets overskudd "
               "før selskapsskatt på 22 % og at resten deles ut til Oddny. Hvor stor del av avkastningen etter "
               "selskapsskatt tar formuesskatten?</p>",
          (pst(b3), [pst(b3)]),
          [(pst(g3b_a), [pst(g3b_a)]),
           (pst(g3b_samlet), [pst(g3b_samlet)]),
           (pst(g3b_gang), [pst(g3b_gang)])],
          sol("Formuesskatten er den samme i kroner, fordi den regnes av formuen. Avkastningen den sammenlignes med, er "
              "mindre når selskapsskatten er trukket først. Da tar formuesskatten en større del (manualen 8.2).",
              [f"Avkastning etter selskapsskatt: {kr(CF3)} × 78 % = {kr(CF3 * (1 - TS3), 2)} mill.",
               f"Formuesskatten er fortsatt {kr(F3, 1)} mill.",
               f"Andel: {kr(F3, 1)}/{kr(CF3 * (1 - TS3), 2)} = <b>{pst(b3)}</b>."],
              [(pst(g3b_a), "svaret fra a. Selskapsskatten er glemt."),
               (pst(g3b_samlet), f"selskapsskatt og formuesskatt samlet i prosent av avkastningen før skatt: "
                f"({kr(CF3 * TS3, 2)} + {kr(F3, 1)})/{kr(CF3)}. Spørsmålet gjelder bare formuesskatten."),
               (pst(g3b_gang), "formuesskatten er ganget med 78 % i stedet for at avkastningen er det.")],
              f"{pst(a3)}/0,78 = {pst(b3)}. ✓"))
pc = ledd("c", f"<p>Oddny finner en annen børsnotert investering i samme risikoklasse som gir kr {kr(CF3c)} mill. i året til "
               "evig tid. Hva er investeringen verdt for en investor som ikke betaler formuesskatt? Svar i millioner med "
               "én desimal.</p>",
          (f"{kr(c3, 1)} mill.", [kr(c3, 1)]),
          [(f"{kr(g3c_anker, 1)} mill.", [kr(g3c_anker, 1)]),
           (f"{kr(g3c_etter, 1)} mill.", [kr(g3c_etter, 1)]),
           (f"{kr(g3c_trekk, 1)} mill.", [kr(g3c_trekk, 1)])],
          sol("En evig kontantstrøm er verdt CF/r. I et effisient marked er r avkastningen på andre investeringer i "
              "samme risikoklasse, her den første investeringen (manualen 2.5 og 8.3).",
              [f"Avkastningskravet: {kr(CF3)}/{kr(I3)} = {pst(r3)}.",
               f"Verdi: {kr(CF3c)}/0,08 = <b>{kr(c3, 1)} mill.</b>"],
              [(f"{kr(g3c_anker, 1)} mill.", "prisen på den første investeringen. Den gir dobbelt så mye i året."),
               (f"{kr(g3c_etter, 1)} mill.", "diskontert med 7 %, avkastningen etter formuesskatt. Denne investoren "
                "betaler ikke formuesskatt."),
               (f"{kr(g3c_trekk, 1)} mill.", "formuesskatten er trukket fra kontantstrømmen, men diskontert med 8 %. "
                "Investoren betaler ikke formuesskatt.")],
              f"{kr(c3, 1)} mill. × 8 % = {kr(CF3c)} mill. i året. ✓"))
pd = ledd("d", "<p>Investeringen i c er i stedet unotert og formuesverdien er bare 50 % av markedsverdien. Markedsverdien er "
               "verdien du fant i c. Alternativet til Oddny er fortsatt børsnoterte aksjer som i innledningen og hun "
               "betaler 1 % formuesskatt. Hva er investeringen verdt for Oddny? Svar i millioner med én desimal.</p>",
          (f"{kr(d3, 1)} mill.", [kr(d3, 1)]),
          [(f"{kr(g3d_lik, 1)} mill.", [kr(g3d_lik, 1)]),
           (f"{kr(g3d_marked, 1)} mill.", [kr(g3d_marked, 1)]),
           (f"{kr(g3d_egen, 1)} mill.", [kr(g3d_egen, 1)])],
          sol("For en investor som betaler formuesskatt, er alternativavkastningen avkastningen etter formuesskatt. "
              "Formuesskatten på den nye investeringen regnes av formuesverdien, som her er halve markedsverdien. Den "
              "lave formuesverdien skaper en merverdi for den norske investoren (manualen 8.3, forelesning 8 lysbilde 24).",
              [f"Alternativavkastning: 8 % − 1 % = 7 %.",
               f"Formuesskatt: {kr(c3, 1)} mill. × 50 % × 1 % = {kr(F3d, 3)} mill. Netto kontantstrøm: "
               f"{kr(CF3c)} − {kr(F3d, 3)} = {kr(CF3c - F3d, 3)} mill.",
               f"Verdi: {kr(CF3c - F3d, 3)}/0,07 = <b>{kr(d3, 1)} mill.</b>"],
              [(f"{kr(g3d_lik, 1)} mill.", "rabatten i formuesverdien er glemt. Med full formuesverdi faller strømmen og "
                "kravet like mye. Da blir verdien som i c."),
               (f"{kr(g3d_marked, 1)} mill.", f"{kr(CF3c - F3d, 3)}/0,08: formuesskatten er trukket fra, men kravet er "
                "markedets 8 % i stedet for 7 % etter formuesskatt."),
               (f"{kr(g3d_egen, 1)} mill.", f"{kr(CF3c)}/0,07: alternativavkastningen er riktig, men formuesskatten på den "
                "nye investeringen er glemt.")],
              f"Verdien ligger over markedsverdien på {kr(c3, 1)} mill., fordi Oddny betaler mindre formuesskatt på denne "
              f"investeringen enn på alternativet. Merverdien er {kr(d3 - c3, 2)} mill. ✓",
              "Alternativet som er lik svaret i c, er fellen fra H2025, der verdien var uendret. Spør om de to "
              "investeringene har samme formuesverdi før du velger det."))
EX.append(oppgave(3, "Formuesskatt som avkastningsskatt og verdsetting av en evig kontantstrøm",
                  "Formuesskatt som avkastningsskatt", [2, 8], body3, [pa, pb, pc, pd]))

# ======================================================================= 4
print("\nOppgave 4: Vebjørn og aksjen i Kvaløy Sjømat ASA")
K4, r4, D4 = 150.0, [0.03, 0.04], [1.50, 12.0]
skj4a = K4 * r4[0]
ub4 = skj4a - D4[0]
grl4 = K4 + ub4
skj4b = grl4 * r4[1]
a4 = D4[1] - ub4 - skj4b
g4_grl = D4[1] - ub4 - K4 * r4[1]
g4_trekk = D4[1] - skj4b
g4_hele = D4[1] - K4 * r4[1]
assert lik(a4, 2.88) and lik(g4_grl, 3.0) and lik(g4_trekk, 5.88) and lik(g4_hele, 6.0)
print(f"   ub {ub4}, grunnlag {grl4}, skj {skj4b}, svar {a4}; gale {g4_grl}, {g4_trekk}, {g4_hele}")
p = ledd("", f"<p>Vebjørn kjøpte én aksje i Kvaløy Sjømat ASA for kr {kr(K4)} i mars år 1 og eier den ved utgangen av år 1 "
             f"og år 2. Han fikk kr {kr(D4[0], 2)} i utbytte i år 1 og kr {kr(D4[1])} i år 2. Skjermingsrenten var 3 % i "
             "år 1 og 4 % i år 2.</p><p>Hva er skattepliktig utbytte for Vebjørn i år 2? Svar med to desimaler.</p>",
         (f"Kr {kr(a4, 2)}", [kr(a4, 2)]),
         [(f"Kr {kr(g4_grl, 2)}", [kr(g4_grl, 2)]),
          (f"Kr {kr(g4_trekk, 2)}", [kr(g4_trekk, 2)]),
          (f"Kr {kr(g4_hele, 2)}", [kr(g4_hele, 2)])],
         sol("Ubenyttet skjerming er den delen av årets skjerming som utbyttet ikke dekket. Den gjør to ting året etter: "
             "den trekkes fra utbyttet og den legges til skjermingsgrunnlaget (manualen 5.3).",
             [f"År 1: skjerming {kr(K4)} × 3 % = {kr(skj4a, 2)}. Utbyttet {kr(D4[0], 2)} bruker en del, så "
              f"{kr(skj4a, 2)} − {kr(D4[0], 2)} = {kr(ub4, 2)} framføres.",
              f"År 2: grunnlaget er {kr(K4)} + {kr(ub4, 2)} = {kr(grl4, 2)}. Skjerming {kr(grl4, 2)} × 4 % = "
              f"{kr(skj4b, 2)}.",
              f"Skattepliktig: {kr(D4[1], 2)} − {kr(ub4, 2)} − {kr(skj4b, 2)} = <b>kr {kr(a4, 2)}</b>."],
             [(f"Kr {kr(g4_grl, 2)}", f"de {kr(ub4, 2)} er trukket fra, men ikke lagt til grunnlaget: årets skjerming "
               f"er regnet som {kr(K4)} × 4 % = {kr(K4 * r4[1], 2)}."),
              (f"Kr {kr(g4_trekk, 2)}", f"grunnlaget er økt til {kr(grl4, 2)}, men de {kr(ub4, 2)} er ikke trukket fra "
               "utbyttet."),
              (f"Kr {kr(g4_hele, 2)}", f"den ubenyttede skjermingen er glemt helt: {kr(D4[1], 2)} − {kr(K4)} × 4 %.")],
             f"Samlet skjerming over to år er {kr(skj4a, 2)} + {kr(skj4b, 2)} = {kr(skj4a + skj4b, 2)}. Samlet utbytte er "
             f"{kr(sum(D4), 2)} og {kr(sum(D4), 2)} − {kr(skj4a + skj4b, 2)} = {kr(a4, 2)}, alt i år 2. ✓"))
EX.append(oppgave(4, "Ubenyttet skjerming etter et lite utbytte", "Skjerming", [5], "", [p]))

# ======================================================================= 5
print("\nOppgave 5: Brekke Mekaniske AS")
I5, C5, A5, T5 = 500_000, 100_000, 0.5, 0.22
skatt5 = (I5 - A5 * C5) * T5
a5 = skatt5 / I5                                                  # manualen 1.5: brutto inntekt i nevneren
g5_grunnlag = skatt5 / (I5 - A5 * C5)                             # delt på skattepliktig inntekt
g5_fullt = (I5 - C5) * T5 / I5                                    # fullt fradrag
g5_tillegg = T5 * (1 + A5 * C5 / I5)                              # 22 % × 1,1
assert lik(a5, 0.198) and lik(g5_grunnlag, 0.22) and lik(g5_fullt, 0.176) and lik(g5_tillegg, 0.242)
print(f"   skatt {skatt5}, svar {a5}; gale {g5_grunnlag}, {g5_fullt}, {g5_tillegg}")
p = ledd("", f"<p>Brekke Mekaniske AS har driftsinntekter på kr {kr(I5)} og kostnader på kr {kr(C5)} i år 1. Skattereglene "
             "gir bare fradrag for halvparten av kostnadene. Selskapsskatten er 22 %.</p>"
             "<p>Hva er den effektive skattesatsen til selskapet i år 1? Svar med to desimaler.</p>",
         (pst(a5), [pst(a5)]),
         [(pst(g5_grunnlag), [pst(g5_grunnlag)]),
          (pst(g5_fullt), [pst(g5_fullt)]),
          (pst(g5_tillegg), [pst(g5_tillegg)])],
         sol("Effektiv skattesats er betalt skatt delt på brutto inntekt, ikke på skattepliktig inntekt (manualen 1.5, "
             "H2025 oppgave 5). Kostnader som ikke gir fradrag, øker betalt skatt og dermed den effektive satsen.",
             [f"Skattegrunnlag: {kr(I5)} − 50 % × {kr(C5)} = {kr(I5 - A5 * C5)}.",
              f"Betalt skatt: {kr(I5 - A5 * C5)} × 22 % = {kr(skatt5)}.",
              f"Effektiv sats: {kr(skatt5)}/{kr(I5)} = <b>{pst(a5)}</b>."],
             [(pst(g5_grunnlag), f"skatten delt på skattepliktig inntekt, {kr(skatt5)}/{kr(I5 - A5 * C5)}. Det gir alltid "
               "den nominelle satsen tilbake."),
              (pst(g5_fullt), f"som om hele kostnaden ga fradrag: {kr((I5 - C5) * T5)}/{kr(I5)}."),
              (pst(g5_tillegg), "22 % × 1,1: den ikke-fradragsberettigede delen er lagt på satsen i stedet for på "
               "grunnlaget før det ganges med 22 %.")],
             f"Formelen 22 % × grunnlag/brutto = 22 % × {kr(I5 - A5 * C5)}/{kr(I5)} = 22 % × 0,9 = {pst(a5)}. Med fullt "
             f"fradrag ville satsen vært {pst(g5_fullt)}. Det halve fradraget løfter den med "
             f"{kr(100 * (a5 - g5_fullt), 2)} prosentpoeng. ✓",
             f"Nevneren er brutto inntekt. Da kan svaret ikke være 22 %. {pst(g5_tillegg)} ligger over den nominelle "
             "satsen. Det stryker to alternativer."))
EX.append(oppgave(5, "Effektiv skattesats når bare halve kostnaden gir fradrag", "Effektiv skattesats", [1], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: Kristoffer og Lyngen Bygg AS")
FV6, RAB6, TF6 = 2_500_000, 0.80, 0.01
F6 = FV6 * RAB6 * TF6
a6 = F6 / (1 - TE)
g6_opp = F6 * (1 + TE)
g6_rab = FV6 * TF6 / (1 - TE)
g6_oppj = F6 / (1 - 0.22)
assert lik(F6, 20_000)
print(f"   F {F6}, svar {a6:.2f}; gale {g6_opp:.2f}, {g6_rab:.2f}, {g6_oppj:.2f}")
p = ledd("", f"<p>Kristoffer eier alle aksjene i Lyngen Bygg AS. Aksjenes formuesverdi før rabatt er kr {kr(FV6)} og aksjer "
             "verdsettes til 80 %. Formuesskatten er 1,0 % og du kan se bort fra bunnfradrag. Kristoffer har ingen "
             "andre midler og må ta et utbytte som dekker både formuesskatten og eierskatten på utbyttet. Eierskatten er "
             "22 % med oppjusteringsfaktor 1,72. Se bort fra skjermingsfradraget.</p>"
             "<p>Hvor stort utbytte må Kristoffer ta? Rund av til nærmeste krone.</p>",
         (f"Kr {kr(a6)}", [kr(a6)]),
         [(f"Kr {kr(g6_opp)}", [kr(g6_opp)]),
          (f"Kr {kr(g6_rab)}", [kr(g6_rab)]),
          (f"Kr {kr(g6_oppj)}", [kr(g6_oppj)])],
         sol("Utbyttet D må være så stort at det som er igjen etter eierskatt, dekker formuesskatten: D × (1 − t<sub>e</sub>) "
             "= F. Den effektive eierskatten er 22 % × 1,72 = 37,84 % (manualen 5.1 og 8.4).",
             [f"Formuesskatt: {kr(FV6)} × 80 % × 1 % = {kr(F6)}.",
              "Netto per krone utbytte: 1 − 0,3784 = 0,6216.",
              f"D = {kr(F6)}/0,6216 = <b>kr {kr(a6)}</b>."],
             [(f"Kr {kr(g6_opp)}", f"skatten er lagt oppå: {kr(F6)} × 1,3784. Da mangler det {kr(F6 - g6_opp * (1 - TE))} "
               "etter eierskatt."),
              (f"Kr {kr(g6_rab)}", f"aksjerabatten er glemt: formuesskatten blir {kr(FV6 * TF6)}."),
              (f"Kr {kr(g6_oppj)}", f"oppjusteringen er glemt: {kr(F6)}/0,78.")],
             f"Eierskatt {kr(a6)} × 37,84 % = {kr(a6 * TE)}. Igjen: {kr(a6)} − {kr(a6 * TE)} = {kr(a6 - float(rund(a6 * TE)))}, "
             "som er formuesskatten. ✓"))
EX.append(oppgave(6, "Utbyttet som skal dekke formuesskatten", "Formuesskatt som avkastningsskatt", [8, 5], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: Rentebegrensning og eierens alternativ")
r7, t7, A7 = 0.05, 0.22, 0.60
a7 = r7 * (1 - A7 * t7) / (1 - t7)
g7a_r = r7
g7a_utenA = r7 / (1 - t7)
g7a_rA = r7 * A7 / (1 - t7)
assert abs(a7 - 0.0556410) < 1e-6
# kontroll av a ved å regne verdien etter skatt numerisk: V = F − rK − t(F − A r K), marginalt
_dF = a7
assert lik(_dF - r7 - t7 * (_dF - A7 * r7), 0)
# b) eieren: (1 − tk)F(K) fra bedriften mot r(1 − ta)K i banken  →  F′ = r(1 − ta)/(1 − tk)
_ta, _tk = 0.22, 0.22
fb7 = r7 * (1 - _ta) / (1 - _tk)
assert lik(fb7, r7)
# c) gjeld med andel A fradrag, egenkapital uten fradrag
fG7 = r7 * (1 - A7 * t7) / (1 - t7)
fE7 = r7 / (1 - t7)
assert fE7 > fG7 > r7
print(f"   a {a7:.6f}: {g7a_r}, {g7a_utenA:.6f}, {g7a_rA:.6f}; b med 22/22: {fb7}; c F′G {fG7:.4f} < F′E {fE7:.4f}")
body7 = ("<p>En bedrift har inntekten F(K), der K er kapitalinnsatsen og F′(K) &gt; 0 og F″(K) &lt; 0. Profitten før "
         "skatt er F(K) − rK, der r er renten på kapitalen. Bedriftsskatten er t.</p>")
pa = ledd("a", "<p>Kapitalen er lånefinansiert, men myndighetene tillater bare at 60 % av rentekostnadene trekkes fra. "
               "Renten er r = 5 % og t = 22 %. Hvilket marginalprodukt F′(K) må den siste kapitalkronen gi? Svar med to "
               "desimaler.</p>",
          (pst(a7), [pst(a7)]),
          [(pst(g7a_r), [pst(g7a_r)]),
           (pst(g7a_utenA), [pst(g7a_utenA)]),
           (pst(g7a_rA), [pst(g7a_rA)])],
          sol("Verdien etter skatt er V = F(K) − rK − t[F(K) − ArK], der A er andelen av rentene som kan trekkes fra. "
              "Førsteordensbetingelsen er F′(K) = r(1 − At)/(1 − t) (manualen 9.4, H2025 oppgave 7).",
              ["Derivert: F′(K) − r − t[F′(K) − Ar] = 0, altså F′(K)(1 − t) = r(1 − At).",
               "Sett inn: 1 − 0,6 × 0,22 = 0,868 og 1 − 0,22 = 0,78.",
               f"F′(K) = 0,05 × 0,868/0,78 = <b>{pst(a7)}</b>."],
              [(pst(g7a_r), "kravet uten skatt, eller med fullt rentefradrag (A = 1)."),
               (pst(g7a_utenA), "r/(1 − t): som om ingen renter kunne trekkes fra (A = 0)."),
               (pst(g7a_rA), "rA/(1 − t): A er satt i telleren i stedet for i uttrykket 1 − At. Det gir et krav under r, "
                "som om skatten subsidierte investeringen.")],
              f"Svaret må ligge mellom r = {pst(g7a_r)} (A = 1) og r/(1 − t) = {pst(g7a_utenA)} (A = 0). {pst(a7)} gjør "
              "det. ✓",
              f"Kravet kan aldri være under r. Det stryker {pst(g7a_rA)}. Med A under 1 er kravet også over r, så "
              f"{pst(g7a_r)} faller."))
pb = ledd("b", "<p>Anta nå at bedriften er finansiert med egenkapital og at kapitalkostnaden ikke kan trekkes fra. Eieren "
               "kan i stedet sette pengene i banken til renten r og betaler da skatt tᵃ på renteinntekten. "
               "Bedriftsskatten er tᵏ. Se bort fra skatt på utbytte og kapitalslit. Hvilken betingelse gir optimal "
               "K?</p>",
          ("F′(K) = r(1 − tᵃ)/(1 − tᵏ)", ["1"]),
          [("F′(K) = r/(1 − tᵏ)", ["1"]),
           ("F′(K) = r/[(1 − tᵏ)(1 − tᵃ)]", ["1"]),
           ("F′(K) = r(1 − tᵏ)/(1 − tᵃ)", ["1"])],
          sol("Investeringen i bedriften diskonteres med avkastningen eieren kunne fått etter skatt i finansmarkedet. "
              "Skatten på renteinntekten senker alternativkostnaden. Det motvirker bedriftsskatten (forelesning 6, "
              "lysbilde 8–14).",
              ["Bedriften gir eieren (1 − tᵏ)F(K) etter bedriftsskatt. Banken gir r(1 − tᵃ)K etter skatt.",
               "Marginalt: (1 − tᵏ)F′(K) = r(1 − tᵃ).",
               "<b>F′(K) = r(1 − tᵃ)/(1 − tᵏ)</b>."],
              [("F′(K) = r/(1 − tᵏ)", "skatten på renteinntekten er glemt. Det er kravet når eieren ikke skattlegges."),
               ("F′(K) = r/[(1 − tᵏ)(1 − tᵃ)]", "skatten på renteinntekten øker kravet her. Den senker alternativ"
                "avkastningen, så den skal stå i telleren."),
               ("F′(K) = r(1 − tᵏ)/(1 − tᵃ)", "de to satsene er byttet om.")],
              f"Med tᵏ = tᵃ = 22 %, som i Norge, blir kravet r(0,78)/0,78 = r. Skattene påvirker da ikke investeringen "
              f"(forelesning 6, lysbilde 14). Med r = 5 % er kravet {pst(fb7)}. ✓"))
pc = ledd("c", "<p>Bedriften bruker både gjeld G og egenkapital E, slik at K = G + E. Gjeldsrenten og egenkapitalens "
               "alternativkostnad er begge r. Bare andelen A av gjeldsrentene kan trekkes fra. Egenkapitalkostnaden kan "
               "ikke trekkes fra. Se bort fra skatt hos eieren. Hvilke førsteordensbetingelser gjelder?</p>",
          ("F′G = r(1 − At)/(1 − t) og F′E = r/(1 − t)", ["1"]),
          [("F′G = r og F′E = r/(1 − t)", ["1"]),
           ("F′G = F′E = r/(1 − t)", ["1"]),
           ("F′G = F′E = r(1 − At)/(1 − t)", ["1"])],
          sol("Hver finansieringskilde får sin egen betingelse: gjelden har fradrag for andelen A av renten, egenkapitalen "
              "har ingen fradrag (manualen 9.5).",
              ["V = F(G + E) − r(G + E) − t[F(G + E) − ArG].",
               "∂V/∂G = F′ − r − t(F′ − Ar) = 0 gir F′G = r(1 − At)/(1 − t).",
               "∂V/∂E = F′ − r − tF′ = 0 gir <b>F′E = r/(1 − t)</b>."],
              [("F′G = r og F′E = r/(1 − t)", "svaret i H2025, der gjeldsrentene var fullt fradragsberettiget. Her er "
                "fradraget avgrenset til A."),
               ("F′G = F′E = r/(1 − t)", "som om gjelden heller ikke ga fradrag (A = 0)."),
               ("F′G = F′E = r(1 − At)/(1 − t)", "som om egenkapitalen også fikk fradrag for andelen A.")],
              f"Med tallene fra a: F′G = {pst(fG7)} og F′E = {pst(fE7)}. Egenkapitalen er fortsatt dyrest, men gjelden er "
              "ikke lenger nøytral. ✓"))
EX.append(oppgave(7, "Bedriftens tilpasning med avgrenset rentefradrag", "Bedriftens tilpasning", [9], body7,
                  [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: Avgift innkrevd fra kjøperne")
a8d, b8d, c8s, d8s, t8 = 900, 30, -180, 60, 3.0
P0 = (a8d - c8s) / (b8d + d8s)
x0 = a8d - b8d * P0
# avgiften kreves inn fra kjøperne: kjøperne betaler p + t, selgerne får p
p8 = (a8d - b8d * t8 - c8s) / (b8d + d8s)
P8 = p8 + t8
assert lik(P0, 12) and lik(x0, 540) and lik(p8, 11) and lik(P8, 14)
g8a_full = P0 + t8
g8a_bytt = P0 + t8 * b8d / (b8d + d8s)
g8a_selger = p8
# b) loddrett tilbud ved x0
b8 = P0
g8b_full = P0 + t8
g8b_selger = P8
g8b_halv = P0 + t8 / 2
c8 = P0 - t8
g8c_kjoper = P0
g8c_full = P0 + t8
g8c_halv = P0 - t8 / 2
print(f"   P0 {P0}, x0 {x0}; a {P8}: {g8a_full}, {g8a_bytt}, {g8a_selger}; b {b8}: {g8b_full}, {g8b_selger}, {g8b_halv}; "
      f"c {c8}: {g8c_kjoper}, {g8c_full}, {g8c_halv}")


def kp(x):
    return kr(x, 0) if lik(x, round(x)) else kr(x, 2)


body8 = (f"<p>I et marked med frikonkurranse er etterspørselen x = {a8d} − {b8d}P og tilbudet x = {d8s}p − {-c8s}, der P er "
         "prisen kjøperne betaler, p prisen selgerne får og x kvantum. Uten avgift er prisen kr 12 og kvantum 540. "
         "Myndighetene innfører en avgift på kr 3 per enhet som kjøperne betaler inn til staten, slik at P = p + 3.</p>")
pa = ledd("a", "<p>Hva betaler kjøperne til sammen per enhet, avgiften medregnet?</p>",
          (f"kr {kp(P8)}", [kp(P8)]),
          [(f"kr {kp(g8a_full)}", [kp(g8a_full)]),
           (f"kr {kp(g8a_bytt)}", [kp(g8a_bytt)]),
           (f"kr {kp(g8a_selger)}", [kp(g8a_selger)])],
          sol("Hvem som betaler avgiften inn, avgjør ikke hvem som bærer den. Likevekten er D(p + t) = S(p) og "
              "fordelingen bestemmes av helningene: kjøperne bærer S′/(S′ − D′) av avgiften (manualen 11.1 og 11.2).",
              [f"Sett inn P = p + 3: {a8d} − {b8d}(p + 3) = {d8s}p − {-c8s}.",
               f"{a8d - b8d * t8:g} + {-c8s} = {b8d + d8s}p, så p = {kp(p8)}.",
               f"Kjøperne betaler {kp(p8)} + 3 = <b>kr {kp(P8)}</b>."],
              [(f"kr {kp(g8a_full)}", "hele avgiften lagt på kjøperne fordi de betaler den inn."),
               (f"kr {kp(g8a_bytt)}", f"andelene byttet om: kjøperne bærer bare {b8d}/{b8d + d8s} av avgiften."),
               (f"kr {kp(g8a_selger)}", "prisen selgerne får, ikke det kjøperne betaler.")],
              f"Formelen: kjøperne bærer {d8s}/({d8s} + {b8d}) = 2/3 av kr 3 = kr 2, så P = 12 + 2 = {kp(P8)}. Kvantum: "
              f"{a8d} − {b8d} × {kp(P8)} = {a8d - b8d * P8:g} = {d8s} × {kp(p8)} − {-c8s}. ✓"))
pb = ledd("b", f"<p>Anta i stedet at tilbudet er perfekt uelastisk (loddrett) ved x = {x0:g}. Etterspørselen og avgiften er som "
               "før. Hva betaler kjøperne til sammen per enhet, avgiften medregnet?</p>",
          (f"kr {kp(b8)}", [kp(b8)]),
          [(f"kr {kp(g8b_full)}", [kp(g8b_full)]),
           (f"kr {kp(g8b_selger)}", [kp(g8b_selger)]),
           (f"kr {kp(g8b_halv)}", [kp(g8b_halv)])],
          sol("Med loddrett tilbud er S′ = 0. Da er ∂P/∂t = S′/(S′ − D′) = 0 og ∂p/∂t = −1: selgerne bærer hele "
              "avgiften, også når kjøperne betaler den inn (manualen 11.4).",
              [f"Kvantum er låst på {x0:g}. Kjøperne vil betale P som gir {x0:g} = {a8d} − {b8d}P, altså P = 12.",
               "Prisen inkludert avgift endres ikke.",
               f"Kjøperne betaler <b>kr {kp(b8)}</b> og selgerne får 12 − 3 = 9."],
              [(f"kr {kp(g8b_full)}", "hele avgiften lagt på kjøperne. Det gjelder uelastisk etterspørsel, ikke "
                "uelastisk tilbud."),
               (f"kr {kp(g8b_selger)}", "svaret fra a. Med loddrett tilbud gjelder ikke helningene derfra."),
               (f"kr {kp(g8b_halv)}", "avgiften delt likt. Fordelingen avhenger av helningene, ikke av hvem som betaler inn.")],
              f"Kvantum er uendret, så kjøperne må fortsatt være villige til å kjøpe {x0:g}. Det gjør de bare til P = 12. ✓"))
pc = ledd("c", "<p>Bruk tilfellet i b. Hvilken pris får selgerne per enhet?</p>",
          (f"kr {kp(c8)}", [kp(c8)]),
          [(f"kr {kp(g8c_kjoper)}", [kp(g8c_kjoper)]),
           (f"kr {kp(g8c_full)}", [kp(g8c_full)]),
           (f"kr {kp(g8c_halv)}", [kp(g8c_halv)])],
          sol("Kilen er P = p + t, altså p = P − t (manualen 11.2).",
              [f"Fra b er P = {kp(b8)}.",
               f"p = {kp(b8)} − 3 = <b>kr {kp(c8)}</b>."],
              [(f"kr {kp(g8c_kjoper)}", "prisen kjøperne betaler, som er svaret på b."),
               (f"kr {kp(g8c_full)}", "høyere enn prisen før avgiften. En avgift kan aldri øke prisen selgerne får."),
               (f"kr {kp(g8c_halv)}", "avgiften delt likt mellom partene.")],
              f"Staten får 3, selgerne {kp(c8)}, til sammen {kp(b8)}, som kjøperne betaler. ✓",
              "Svarene på b og c står i hverandres alternativlister. Skriv ned hvilken pris spørsmålet gjelder før du regner."))
EX.append(oppgave(8, "Avgift som kjøperne betaler inn", "Skatteincidens", [11], body8, [pa, pb, pc]))

# ======================================================================= 9
print("\nOppgave 9: Formuesskatt på utgående formue")
W9, r9, tau9 = 500, 0.04, 0.01
a9 = tau9 * (1 + r9) / r9
g9_inn = tau9 / r9
g9_dele = tau9 / (r9 * (1 + r9))
g9_r = tau9 * (1 + r9) / (r9 - tau9)
assert lik(W9 * (1 + r9) * tau9, W9 * r9 * a9) and lik(a9, 0.26)
print(f"   t {a9}; gale {g9_inn}, {g9_dele:.6f}, {g9_r}")
p = ledd("", f"<p>La W = {W9} være formuen ved begynnelsen av året og la r = 4 % være avkastningen, som realiseres ved slutten "
             "av året. Formuesskatten er τ = 1 % og faller på formuen ved slutten av året, etter at avkastningen er lagt "
             "til.</p><p>Hvor høy må en skatt t på avkastningen være for at de to skattene skal gi samme proveny? Svar "
             "med to desimaler.</p>",
         (pst(a9), [pst(a9)]),
         [(pst(g9_inn), [pst(g9_inn)]),
          (pst(g9_dele), [pst(g9_dele)]),
          (pst(g9_r), [pst(g9_r)])],
         sol("Sett provenyene like. Faller formuesskatten på formuen ved slutten av året, er grunnlaget W(1 + r), ikke W "
             "(manualen 8.1, forelesning 8 lysbilde 29).",
             [f"Formuesskatt: W(1 + r)τ = {W9} × 1,04 × 1 % = {kr(W9 * (1 + r9) * tau9, 2)}.",
              f"Skatt på avkastningen: Wrt = {W9} × 4 % × t = {kr(W9 * r9)}t.",
              f"t = τ(1 + r)/r = 1,04 %/4 % = <b>{pst(a9)}</b>."],
             [(pst(g9_inn), "τ/r, som gjelder når formuesskatten faller på formuen ved begynnelsen av året."),
              (pst(g9_dele), "delt på (1 + r) i stedet for å gange med den."),
              (pst(g9_r), "τ(1 + r)/(r − τ): avkastningen etter formuesskatt står i nevneren. Skatten på avkastningen "
               "skal regnes av hele avkastningen.")],
             f"Med t = {pst(a9)}: {W9} × 4 % × {pst(a9)} = {kr(W9 * r9 * a9, 2)}, likt formuesskatten. Svaret er "
             f"høyere enn {pst(g9_inn)} fordi grunnlaget har vokst. ✓",
             f"Svaret må være over τ/r = {pst(g9_inn)}, fordi grunnlaget har vokst. Det stryker to alternativer. Da "
             f"står {pst(a9)} og {pst(g9_r)} igjen. Nevneren avgjør."))
EX.append(oppgave(9, "Formuesskatt på formuen ved årets slutt omregnet til avkastningsskatt",
                  "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Håvard selger aksjen i Storvik Tre ASA")
K10, r10a, r10b, S10 = 400.0, 0.025, 0.03, 470.0
ub10 = K10 * r10a
gev10 = S10 - K10 - ub10
a10 = gev10 * TE
g10_ub = (S10 - K10) * TE
g10_aar2 = (gev10 - (K10 + ub10) * r10b) * TE
g10_oppj = gev10 * 0.22
assert lik(ub10, 10) and lik(gev10, 60)
print(f"   ub {ub10}, gevinst {gev10}, skatt {a10:.4f}; gale {g10_ub:.4f}, {g10_aar2:.4f}, {g10_oppj:.4f}")
p = ledd("", f"<p>Håvard kjøpte én aksje i Storvik Tre ASA for kr {kr(K10)} i februar år 1. Selskapet betalte ikke utbytte i år "
             f"1 og skjermingsrenten var 2,5 %. I oktober år 2 selger han aksjen for kr {kr(S10)}. Skjermingsrenten for "
             "år 2 er 3 %. Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p>"
             "<p>Hvor mye skatt betaler Håvard på gevinsten? Svar med to desimaler.</p>",
         (f"Kr {kr(a10, 2)}", [kr(a10, 2)]),
         [(f"Kr {kr(g10_ub, 2)}", [kr(g10_ub, 2)]),
          (f"Kr {kr(g10_aar2, 2)}", [kr(g10_aar2, 2)]),
          (f"Kr {kr(g10_oppj, 2)}", [kr(g10_oppj, 2)])],
         sol("Skattepliktig gevinst er salgspris minus kostpris minus ubenyttet skjerming fra tidligere år. I salgsåret "
             "gis ingen ny skjerming, fordi skjermingen går til den som eier aksjen ved årets slutt. Gevinsten "
             "oppjusteres med 1,72 og skattlegges med 22 % (manualen 5.4).",
             [f"Ubenyttet skjerming fra år 1: {kr(K10)} × 2,5 % = {kr(ub10)}.",
              f"Gevinst: {kr(S10)} − {kr(K10)} − {kr(ub10)} = {kr(gev10)}.",
              f"Skatt: {kr(gev10)} × 1,72 × 22 % = {kr(gev10)} × 37,84 % = <b>kr {kr(a10, 2)}</b>."],
             [(f"Kr {kr(g10_ub, 2)}", f"den ubenyttede skjermingen er glemt: {kr(S10 - K10)} × 37,84 %."),
              (f"Kr {kr(g10_aar2, 2)}", f"også skjerming for år 2 er trukket fra: {kr((K10 + ub10) * r10b, 2)}. Han eier "
               "ikke aksjen ved utgangen av år 2."),
              (f"Kr {kr(g10_oppj, 2)}", f"oppjusteringen er glemt: {kr(gev10)} × 22 %.")],
             f"Oppjuster grunnlaget først: {kr(gev10)} × 1,72 = {kr(gev10 * 1.72, 2)} og {kr(gev10 * 1.72, 2)} × 22 % = "
             f"{kr(a10, 2)}. ✓",
             "Skjermingsrenten for år 2 er en opplysning du ikke skal bruke. Alternativet som bruker den, er det "
             "lavest beskattede av de oppjusterte."))
EX.append(oppgave(10, "Salg av aksje i år 2 med ubenyttet skjerming fra år 1", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Eirin og Eirin Invest AS")
p = ledd("", "<p>Eirin eier 2 000 aksjer i Vikna Data ASA personlig. Selskapet hennes, Eirin Invest AS, eier like mange. "
             "Begge postene selges i 2026 med et tap på kr 300 000 hver. Hvilket utsagn er riktig?</p>",
         ("Eirin får fradrag for tapet sitt. Eirin Invest AS får ikke fradrag for sitt tap", []),
         [("Begge får fradrag, fordi tap på aksjer gir fradrag for alle aksjonærer", []),
          ("Ingen av dem får fradrag, fordi tap på børsnoterte aksjer aldri gir fradrag", []),
          ("Eirin Invest AS får fradrag for 3 % av tapet etter treprosentregelen", ["3"])],
         "<p><b>Regelen.</b> En personlig aksjonær skattlegges symmetrisk etter aksjonærmodellen: gevinst er "
         "skattepliktig og tap gir fradrag. Et aksjeselskap er under fritaksmetoden (skatteloven § 2-38): gevinst er "
         "skattefri og tap gir ikke fradrag (manualen 6.1). <b>Eirin får fradrag, selskapet ikke.</b> Fradraget hennes "
         "er verdt 300 000 × 37,84 % = kr " + kr(300_000 * TE) + ".</p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Begge får fradrag</b> = fritaksmetoden tar både oppsiden og "
         "nedsiden ut av selskapets skatteregnskap.<br><b>Ingen får fradrag</b> = personlige aksjonærer får fradrag for "
         "tap, oppjustert med 1,72.<br><b>Treprosentregelen</b> = den gjelder bare mottatt utbytte, ikke gevinst og "
         "ikke tap.</p>"
         "<p><b>Strategi med minuspoeng.</b> Fritaksmetoden er en fordel ved gevinst og en ulempe ved tap. Husker du "
         "symmetrien, faller tre alternativer.</p>")
EX.append(oppgave(11, "Tap på aksjer eid personlig og gjennom selskap", "Fritaksmetoden", [6, 5], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Henny, Merton og humankapitalen")
mu12, rf12, s12, g12 = 0.084, 0.03, 0.15, 3
w12 = (mu12 - rf12) / (g12 * s12 ** 2)
g12a_sigma = (mu12 - rf12) / (g12 * s12)
g12a_brutto = mu12 / (g12 * s12 ** 2)
g12a_kvadrat = (mu12 - rf12) / (g12 * s12) ** 2
F12, H12 = 1_500_000, 300_000
b12 = w12 * (F12 + H12) / F12
g12b_w = w12
g12b_tot = w12 * F12 / (F12 + H12)
c12 = (w12 * (F12 + H12) - H12) / F12
g12c_null = 0.0
g12c_bare_f = (w12 * F12 - H12) / F12
assert lik(w12, 0.8) and lik(b12, 0.96) and lik(c12, 0.76) and lik(g12c_bare_f, 0.6)
print(f"   w {w12}: {g12a_sigma}, {g12a_brutto:.4f}, {g12a_kvadrat:.4f}; b {b12}: {g12b_tot:.4f}; c {c12}: {g12c_bare_f}")
body12 = ("<p>Et globalt indeksfond har forventet avkastning 8,4 % og standardavvik 15 %. Risikofri rente er 3 %. Henny har "
          "risikoaversjon γ = 3. Bruk Mertons formel for optimal andel av totalformuen i aksjer.</p>")
p1 = ledd("1", "<p>Henny har bare finansiell formue. Hvor stor andel av formuen bør hun ha i indeksfondet? Rund av til én "
               "desimal.</p>",
          (pst(w12, 1), [pst(w12, 1)]),
          [(pst(g12a_sigma, 1), [pst(g12a_sigma, 1)]),
           (pst(g12a_brutto, 1), [pst(g12a_brutto, 1)]),
           ("Umulig å avgjøre uten å kjenne formuen hennes", [])],
          sol("Mertons andel er w = (E(R) − R<sub>f</sub>)/(γσ²). Telleren er meravkastningen og nevneren har variansen, "
              "altså standardavviket i andre (manualen 14.4).",
              ["Meravkastning: 8,4 % − 3 % = 5,4 %.",
               "Varians: 0,15² = 0,0225. γσ² = 3 × 0,0225 = 0,0675.",
               f"w = 0,054/0,0675 = <b>{pst(w12, 1)}</b>."],
              [(pst(g12a_sigma, 1), "standardavviket brukt i stedet for variansen: 0,054/(3 × 0,15)."),
               (pst(g12a_brutto, 1), "hele avkastningen i telleren, 0,084/0,0675. Formelen bruker meravkastningen."),
               ("Umulig å avgjøre", "Mertons andel avhenger ikke av hvor stor formuen er. Formuen trengs først når "
                "andelen skal gjøres om til kroner.")],
              f"{pst(w12, 1)} × 3 × 0,0225 = 0,054, som er meravkastningen. ✓"))
p2 = ledd("2", f"<p>Anta i stedet at Henny har finansformue kr {kr(F12)} og en risikofri humankapital på kr {kr(H12)}. Hvor "
               "stor andel av finansformuen bør hun ha i indeksfondet? Rund av til én desimal.</p>",
          (pst(b12, 1), [pst(b12, 1)]),
          [(pst(g12b_w, 1), [pst(g12b_w, 1)]),
           (pst(g12b_tot, 1), [pst(g12b_tot, 1)]),
           (pst(c12, 1), [pst(c12, 1)])],
          sol("Mertons andel gjelder totalformuen, finansformue pluss humankapital. Risikofri humankapital virker som et "
              "bankinnskudd, så hele aksjebeløpet må plasseres i finansformuen (manualen 14.5).",
              [f"Totalformue: {kr(F12)} + {kr(H12)} = {kr(F12 + H12)}.",
               f"Aksjebeløp: {pst(w12, 0)} × {kr(F12 + H12)} = {kr(w12 * (F12 + H12))}.",
               f"Andel av finansformuen: {kr(w12 * (F12 + H12))}/{kr(F12)} = <b>{pst(b12, 1)}</b>."],
              [(pst(g12b_w, 1), "Mertons andel brukt på finansformuen alene. Humankapitalen er glemt."),
               (pst(g12b_tot, 1), f"brøken er snudd: {pst(w12, 0)} × {kr(F12)}/{kr(F12 + H12)} i stedet for "
                f"{pst(w12, 0)} × {kr(F12 + H12)}/{kr(F12)}."),
               (pst(c12, 1), "humankapitalen er behandlet som aksjer (β = 1). Det er svaret på neste delspørsmål.")],
              f"Balansen: {kr(w12 * (F12 + H12))} i aksjer og {kr(F12 - w12 * (F12 + H12))} + {kr(H12)} = "
              f"{kr(F12 - w12 * (F12 + H12) + H12)} risikofritt. {kr(w12 * (F12 + H12))}/{kr(F12 + H12)} = "
              f"{pst(w12, 0)}. ✓"))
p3 = ledd("3", "<p>Anta nå (bare i denne deloppgaven) at humankapitalen på kr 300 000 svinger i takt med aksjemarkedet "
               "(β = 1). Hvor stor andel av finansformuen bør hun nå ha i indeksfondet? Rund av til én desimal.</p>",
          (pst(c12, 1), [pst(c12, 1)]),
          [(pst(g12c_null, 1), [pst(g12c_null, 1)]),
           (pst(b12, 1), [pst(b12, 1)]),
           (pst(g12c_bare_f, 1), [pst(g12c_bare_f, 1)])],
          sol("Med β = 1 eier hun allerede aksjeeksponering for hele humankapitalen. Aksjebeløpet i finansformuen er "
              "w(F + H) − βH (manualen 14.5).",
              [f"Ønsket aksjeeksponering: {pst(w12, 0)} × {kr(F12 + H12)} = {kr(w12 * (F12 + H12))}.",
               f"Humankapitalen dekker {kr(H12)}. Igjen til finansformuen: {kr(w12 * (F12 + H12) - H12)}.",
               f"Andel: {kr(w12 * (F12 + H12) - H12)}/{kr(F12)} = <b>{pst(c12, 1)}</b>."],
              [(pst(g12c_null, 1), "svaret i H2025, der humankapitalen var like stor som det ønskede aksjebeløpet. Her "
                "er den mye mindre."),
               (pst(b12, 1), "svaret på deloppgave 2. Humankapitalen er behandlet som risikofri."),
               (pst(g12c_bare_f, 1), f"Mertons andel brukt på finansformuen alene og humankapitalen trukket fra: "
                f"({kr(w12 * F12)} − {kr(H12)})/{kr(F12)}.")],
              f"Samlet aksjeeksponering: {kr(c12 * F12)} + {kr(H12)} = {kr(c12 * F12 + H12)} av {kr(F12 + H12)}, altså "
              f"{pst(w12, 0)}. ✓"))
p4 = ledd("4", "<p>Henny har den risikofrie humankapitalen fra deloppgave 2. Fram mot pensjon krymper den mot null, mens "
               "finansformuen og γ er uendret. Hva skjer med optimal andel av finansformuen i aksjer?</p>",
          ("Den faller mot 80 %, fordi humankapitalen virket som et bankinnskudd", ["80"]),
          [("Den faller, fordi aksjerisikoen forsvinner over lang tid, men ikke over kort tid", []),
           ("Den er uendret, fordi Mertons andel av totalformuen er uendret", []),
           ("Den faller mot 0 %, fordi en pensjonist ikke bør eie aksjer", ["0"])],
          "<p><b>Regelen.</b> Andelen av finansformuen er w(F + H)/F når humankapitalen er risikofri. Når H krymper, "
          f"forsvinner det implisitte bankinnskuddet og andelen faller mot w = {pst(w12, 0)} (manualen 14.5). Grunnen er "
          "humankapitalen, ikke alderen i seg selv. <b>Den faller mot 80 %.</b></p>"
          "<p><b>Regnestykket.</b></p><p>1. I deloppgave 2: " + pst(b12, 1) + ".<br>2. Med H = 0: "
          f"{pst(w12, 0)} × {kr(F12)}/{kr(F12)} = {pst(w12, 1)}.<br>3. Andelen går fra {pst(b12, 1)} til "
          f"<b>{pst(w12, 1)}</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Faller fordi risikoen forsvinner over tid</b> = riktig retning, "
          "galt argument. Dette er tidsdiversifisering, som kurset avviser: Mertons formel har ingen horisont.<br>"
          "<b>Uendret</b> = andelen av totalformuen er uendret, men spørsmålet gjelder finansformuen.<br><b>Mot 0 %</b> = "
          "uten humankapital er andelen w, ikke null. γ og markedet er de samme.</p>"
          "<p><b>Strategi med minuspoeng.</b> To alternativer sier «faller». Les begrunnelsen: bare humankapitalen gir "
          "riktig grunn.</p>")
EX.append(oppgave(12, "Mertons aksjeandel og humankapitalen", "Porteføljevalg", [14], body12, [p1, p2, p3, p4]))

# ======================================================================= 13
print("\nOppgave 13: Mathias og bilforsikringen")
p = ledd("", "<p>Mathias kjøper en brukt bil og betaler kontant. Ansvarsforsikring er lovpålagt, mens kaskoforsikring er "
             "frivillig. Hva er begrunnelsen for forskjellen?</p>",
         ("Ansvarsforsikringen dekker skade han påfører andre, som ellers kan stå uten dekning", []),
         [("Kasko er frivillig fordi en lovpålagt kasko ville gitt moralsk hasard", []),
          ("Ansvarsforsikring er lovpålagt fordi banken krever den når bilen er finansiert med lån", []),
          ("Kaskoskader er så små at ingen risikoavers person vil forsikre dem", [])],
         "<p><b>Regelen.</b> Forsikring mot skade du påfører andre, er ofte lovpålagt, fordi den skadelidte ellers kan stå "
         "uten dekning. Forsikring mot skade på dine egne ting er frivillig (manualen 17.6). <b>Tredjepartsskaden er "
         "begrunnelsen.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Moralsk hasard</b> = moralsk hasard finnes i all forsikring og "
         "dempes med egenandel. Det er ikke grunnen til at én forsikring er lovpålagt.<br><b>Banken krever den</b> = et "
         "krav fra banken er en kontrakt, ikke en lov. Mathias har dessuten betalt kontant.<br><b>Små skader</b> = en "
         "bil kan være mye verdt og en risikoavers person forsikrer store tap.</p>"
         "<p><b>Strategi med minuspoeng.</b> Spør hvem som rammes av skaden. Er det andre enn eieren, er det typisk "
         "lovpålagt.</p>")
EX.append(oppgave(13, "Hvorfor ansvarsforsikringen er lovpålagt", "Forsikring", [17], "", [p]))

# ======================================================================= 14
print("\nOppgave 14: Bjarne og verkstedet")
B14, V14, p14, P14 = 1_600_000, 2_000_000, 0.02, 45_000
W14 = B14 + V14
EU0 = (1 - p14) * math.sqrt(W14) + p14 * math.sqrt(W14 - V14)
EUf = math.sqrt(W14 - P14)
assert EUf > EU0
CE0 = EU0 ** 2
maxprem = W14 - CE0
pk = (math.sqrt(W14) - EUf) / (math.sqrt(W14) - math.sqrt(W14 - V14))
g14b_aktuar = P14 / V14
g14b_hele = 1 - EUf / math.sqrt(W14)
g14b_formue = P14 / W14
E14, P14e = 400_000, 33_000
EUe = (1 - p14) * math.sqrt(W14 - P14e) + p14 * math.sqrt(W14 - P14e - E14)
assert EUe > EUf > EU0
print(f"   EU0 {EU0:.3f}, EUfull {EUf:.3f}, EUegen {EUe:.3f}, maxpremie {maxprem:.0f}, pk {pk:.5f}; "
      f"gale {g14b_aktuar}, {g14b_hele:.5f}, {g14b_formue}")
body14 = (f"<p>Bjarne har kr {kr(B14)} i banken og et verksted verdt kr {kr(V14)}. Med sannsynlighet 2 % brenner verkstedet i "
          "løpet av året og mister hele verdien. Pengene i banken er trygge. Nyttefunksjonen hans er U(W) = √W, der W er "
          f"formuen ved årets slutt. Et forsikringsselskap tilbyr full dekning for en premie på kr {kr(P14)}.</p>")
pa = ledd("1", "<p>Bør Bjarne kjøpe forsikringen?</p>",
          ("Ja, fordi forventet nytte blir høyere med forsikringen", []),
          [("Nei, fordi premien er høyere enn forventet erstatning", []),
           ("Nei, fordi forventet nytte blir lavere med forsikringen", []),
           ("Han er indifferent, fordi forventet nytte er lik med og uten", [])],
          sol("Sammenlign forventet nytte, ikke forventet formue. Full dekning gir samme formue i begge tilstander "
              "(manualen 17.2).",
              [f"Med forsikring: √({kr(W14)} − {kr(P14)}) = √{kr(W14 - P14)} = {kr(EUf, 2)}.",
               f"Uten: 0,98 × √{kr(W14)} + 0,02 × √{kr(W14 - V14)} = 0,98 × {kr(math.sqrt(W14), 2)} + 0,02 × "
               f"{kr(math.sqrt(W14 - V14), 2)} = {kr(EU0, 2)}.",
               f"{kr(EUf, 2)} &gt; {kr(EU0, 2)}: <b>ja, kjøp</b>."],
              [("Premien over forventet erstatning", f"forventet erstatning er 2 % × {kr(V14)} = {kr(p14 * V14)} og "
                "premien er høyere. Men en risikoavers person betaler mer enn forventet tap for å slippe risikoen."),
               ("Lavere nytte", "regnefeil. Med forsikring er nytten høyest."),
               ("Indifferent", "nyttene er ikke like.")],
              f"Sikkerhetsekvivalenten uten forsikring er {kr(EU0, 2)}² = {kr(CE0)}. Høyeste premie er da {kr(W14)} − "
              f"{kr(CE0)} = {kr(maxprem)}, over {kr(P14)}. ✓"))
pb = ledd("2", f"<p>Hva er den laveste brannsannsynligheten som gjør at Bjarne vil kjøpe forsikringen til kr {kr(P14)}?</p>",
          (f"ca. {pst(pk)}", [pst(pk)]),
          [(f"ca. {pst(g14b_aktuar)}", [pst(g14b_aktuar)]),
           (f"ca. {pst(g14b_hele)}", [pst(g14b_hele)]),
           (f"ca. {pst(g14b_formue)}", [pst(g14b_formue)])],
          sol("Den kritiske sannsynligheten gjør forventet nytte lik med og uten forsikring: (1 − p)√W + p√(W − L) = "
              "√(W − P) (manualen 17.4). Pengene i banken er der også om verkstedet brenner.",
              [f"√{kr(W14)} = {kr(math.sqrt(W14), 3)}, √{kr(W14 - V14)} = {kr(math.sqrt(W14 - V14), 3)} og "
               f"√{kr(W14 - P14)} = {kr(EUf, 3)}.",
               f"p = ({kr(math.sqrt(W14), 3)} − {kr(EUf, 3)})/({kr(math.sqrt(W14), 3)} − {kr(math.sqrt(W14 - V14), 3)}).",
               f"p = {kr(math.sqrt(W14) - EUf, 3)}/{kr(math.sqrt(W14) - math.sqrt(W14 - V14), 3)} = <b>{pst(pk)}</b>."],
              [(f"ca. {pst(g14b_aktuar)}", f"premie delt på tap, {kr(P14)}/{kr(V14)}. Det er grensen for en "
                "risikonøytral person."),
               (f"ca. {pst(g14b_hele)}", "som om brannen tok hele formuen: (1 − p)√W = √(W − P). Det var oppsettet i "
                "H2025, men her har Bjarne penger i banken."),
               (f"ca. {pst(g14b_formue)}", "premien delt på hele formuen.")],
              "Ved p = 2 % kjøper han, så grensen må ligge under 2 %. Den må også ligge under premie/tap, fordi han er "
              f"risikoavers. {pst(pk)} oppfyller begge. ✓",
              f"{pst(g14b_aktuar)} kan strykes uten regning, fordi han kjøper allerede ved 2 %."))
pc = ledd("3", f"<p>Selskapet tilbyr i stedet en forsikring med egenandel kr {kr(E14)}: den betaler kr {kr(V14 - E14)} ved "
               f"brann og premien er kr {kr(P14e)}. Hvilket valg gir Bjarne høyest forventet nytte?</p>",
          ("Forsikringen med egenandel, som gir høyest forventet nytte av de tre", []),
          [("Full dekning, fordi en risikoavers person alltid bør forsikre fullt", []),
           ("Ingen forsikring, fordi begge premiene er høyere enn forventet erstatning", []),
           ("Full dekning, fordi den gir samme formue uansett om verkstedet brenner", [])],
          sol("Med egenandel er formuen fortsatt usikker, så begge tilstandene må regnes med sannsynligheter. "
              "Premien trekkes i begge tilstandene (manualen 17.4 og 17.6).",
              [f"Egenandel: 0,98 × √{kr(W14 - P14e)} + 0,02 × √{kr(W14 - P14e - E14)} = {kr(EUe, 2)}.",
               f"Full dekning: {kr(EUf, 2)}. Ingen forsikring: {kr(EU0, 2)}.",
               f"{kr(EUe, 2)} er høyest: <b>forsikringen med egenandel</b>."],
              [("Alltid forsikre fullt", "gjelder bare til aktuarisk pris. Her har full dekning et påslag på "
                f"{kr(P14 - p14 * V14)} over forventet erstatning, mot {kr(P14e - p14 * (V14 - E14))} for egenandelen."),
               ("Ingen forsikring", "begge forsikringene gir høyere forventet nytte enn ingen, selv med påslag."),
               ("Samme formue uansett", "riktig om full dekning, men å fjerne all risiko er ikke verdt det ekstra "
                "påslaget her.")],
              f"Sikkerhetsekvivalenter: egenandel {kr(EUe ** 2)}, full {kr(EUf ** 2)}, ingen {kr(CE0)}. Egenandelen er "
              f"verdt {kr(EUe ** 2 - EUf ** 2)} mer enn full dekning. ✓"))
EX.append(oppgave(14, "Forventet nytte, full dekning og egenandel", "Forsikring og forventet nytte", [17], body14,
                  [pa, pb, pc]))

# ======================================================================= 15
print("\nOppgave 15: Gudveig og Vemund tar ut alderspensjon")
p = ledd("", "<p>Gudveig er født i 1965 og sønnen Vemund i 1995. Anta at de har like stor pensjonsbeholdning i folketrygden "
             "når de tar ut alderspensjon som 67-åringer og at forventet levealder fortsetter å øke. Hva er riktig?</p>",
         ("Vemund får lavere årlig pensjon, fordi delingstallet er høyere for yngre årskull", []),
         [("Vemund får høyere årlig pensjon, fordi delingstallet er lavere for yngre årskull", []),
          ("De får like stor årlig pensjon, fordi delingstallet bare avhenger av uttaksalderen", []),
          ("Vemund får lavere årlig pensjon, fordi delingstallet er lavere for yngre årskull", [])],
         "<p><b>Regelen.</b> Årlig pensjon er beholdningen delt på delingstallet. Delingstallet synker med uttaksalderen "
         "innenfor ett årskull, men stiger fra årskull til årskull når levealderen øker. Det er levealdersjusteringen fra "
         "pensjonsreformen i 2011: «Jo høyere levealder, jo høyere delingstall og jo lavere pensjon» (ForelesningPensjon, "
         "lysbilde 15, manualen 15.3). <b>Vemund får lavere årlig pensjon.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Høyere, lavere delingstall</b> = retningen er snudd. Delingstallet "
         "følger forventet gjenstående levetid, som øker.<br><b>Like stor</b> = delingstallet avhenger både av "
         "uttaksalder og årskull.<br><b>Lavere, lavere delingstall</b> = med fast beholdning gir et lavere delingstall "
         "høyere pensjon, ikke lavere. Brøken henger ikke sammen.</p>"
         "<p><b>Strategi med minuspoeng.</b> Med fast teller kan ikke nevneren og pensjonen gå samme vei. Det stryker to "
         "alternativer. Da står retningen fra kull til kull igjen.</p>")
EX.append(oppgave(15, "Delingstallet for to årskull", "Pensjon", [15], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Linnea og forbrukslånet")
mu16, rf16, rl16, gir16 = 0.08, 0.03, 0.12, 0.25
ER16 = (1 + gir16) * mu16 - gir16 * rl16
assert ER16 < mu16
print(f"   forventet avkastning med 25 % lån til 12 %: {ER16}")
p = ledd("", "<p>Linnea vil ha høyere forventet avkastning enn markedsporteføljen, et globalt indeksfond med forventet "
             "avkastning 8 %. Risikofri rente er 3 %, men banken vil bare låne henne penger som forbrukslån til 12 % "
             "rente. Hva er riktig?</p>",
         ("Hun bør ikke låne. Med 12 % rente gir giringen lavere forventet avkastning", ["12"]),
         [("Hun bør låne, fordi giring langs kapitalmarkedslinjen alltid gir høyere forventet avkastning", []),
          ("Hun bør låne og investere alt i én oppstartsbedrift med forventet avkastning over 12 %", ["12"]),
          ("Hun bør ikke låne, fordi ingen bør ha mer risiko enn markedsporteføljen", [])],
         sol("Kapitalmarkedslinjen forutsetter at du kan låne til risikofri rente. Da gir giring høyere forventet "
             "avkastning og høyere risiko. Er lånerenten høyere enn forventet avkastning på markedsporteføljen, taper du "
             "på hver lånte krone (ForelesningAksjesparing, «Gjett hvem som anbefaler denne strategien?», manualen 14.3).",
             ["Lån 25 % av egenkapitalen og ha 125 % i indeksfondet.",
              f"Forventet avkastning: 1,25 × 8 % − 0,25 × 12 % = {pst(ER16, 0)}.",
              f"{pst(ER16, 0)} &lt; 8 %, med mer risiko: <b>hun bør ikke låne</b>."],
             [("Alltid høyere avkastning", "gjelder bare når lånerenten er lavere enn forventet avkastning på "
               "markedsporteføljen."),
              ("Én oppstartsbedrift", "gir mye usystematisk risiko som markedet ikke betaler for."),
              ("Ingen bør ha mer risiko", "teorien rangerer ikke punktene på linjen. Med billig lån er giring riktig "
               "for den som vil ha mer risiko.")],
             "Med lån til 3 % hadde giringen gitt 1,25 × 8 % − 0,25 × 3 % = 9,25 %. Det er lånerenten som snur svaret. ✓"))
EX.append(oppgave(16, "Giring med forbrukslån", "Porteføljevalg", [14, 16], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: Kjetil og det aktive fondet")
p = ledd("", "<p>Kjetil vurderer et aktivt forvaltet aksjefond i stedet for et indeksfond. Hvilket utsagn er i tråd med "
             "forelesningen?</p>",
         ("Aktive fond slår gjerne indeks før gebyrer, men kundene taper likevel etter gebyrene", []),
         [("Forvaltere som har slått markedet ett tiår, slår det som regel også det neste tiåret", []),
          ("At dårlige fond legges ned, gjør at statistikken gir aktive fond et for dårlig rykte", []),
          ("Forbrukerrådet fant at norske aktive fond gjorde det svakest på norske aksjer", [])],
         "<p><b>Regelen.</b> Berk og DeMarzo viser at aktive fond klarer å slå indeks før gebyrer, men at kundene likevel "
         "taper penger på grunn av gebyrene (ForelesningAksjesparing, «Nyere tall», manualen 14.6). <b>Utsagnet om "
         "gebyrene er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Slår markedet igjen</b> = de 20 beste investorene på 70-tallet "
         "ble slått av markedet på 80-tallet. Gode resultater varer sjelden.<br><b>For dårlig rykte</b> = "
         "survivorship bias virker motsatt: de dårlige fondene forsvinner ut av snittet, så statistikken ser bedre ut "
         "enn virkeligheten.<br><b>Svakest på norske aksjer</b> = norske aksjer var det eneste området der aktive fond "
         "slo indeks, med 0,86 prosentpoeng i året.</p>")
EX.append(oppgave(17, "Aktive fond, gebyrer og statistikken", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: Eli og Bjørnar")
p = ledd("", "<p>Eli har innskuddspensjon og kollegaen Bjørnar har ytelsespensjon. Avkastningen på pensjonsmidlene blir "
             "mye lavere enn ventet i mange år. Hva er riktig?</p>",
         ("Eli får lavere pensjon. Bjørnars arbeidsgiver må betale mer for å holde ytelsen", []),
         [("Begge får lavere pensjon, fordi all tjenestepensjon følger avkastningen", []),
          ("Bjørnar får lavere pensjon. Elis arbeidsgiver må øke innskuddet for å holde nivået", []),
          ("Ingen av dem får lavere pensjon, fordi folketrygden dekker underskuddet", [])],
         "<p><b>Regelen.</b> Ved innskuddspensjon er innskuddet avtalt og den ansatte bærer avkastningsrisikoen. Ved "
         "ytelsespensjon er ytelsen avtalt og arbeidsgiveren bærer risikoen (manualen 15.4, ForelesningPensjon, "
         "«Tjenestepensjon»). <b>Eli taper, Bjørnars arbeidsgiver betaler.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Begge lavere</b> = ytelsespensjonen er lovet uavhengig av "
         "avkastningen.<br><b>Byttet om</b> = beskriver hver ordning med den andres egenskaper.<br><b>Folketrygden</b> = "
         "folketrygden er en egen ordning og dekker ikke tap i tjenestepensjonen.</p>"
         "<p><b>Strategi med minuspoeng.</b> Spør hva som er avtalt. Den parten som ikke har fått noe avtalt, bærer "
         "risikoen.</p>")
EX.append(oppgave(18, "Lav avkastning i to pensjonsordninger", "Pensjon", [15], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove10",
    "kind": "mock",
    "label": "Prøveeksamen 10",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Tvillingen til H2025: samme rekkefølge, samme regnerutiner og samme lengde, oppgave for oppgave, med nye tall "
             "og nye vrier. Oppgave 1–11 er skattedelen (18 ledd), oppgave 12–18 finansdelen (12 ledd). Vriene er blant "
             "annet ubenyttet skjerming i kontantstrømmen til eieren, formuesskatt på en unotert investering, avgrenset rentefradrag, eierens skatt "
             "på renteinntekten, avgift som kjøperne betaler inn, formuesskatt på utgående formue, Merton med "
             "aksjelignende humankapital som bare dekker en del av aksjebeløpet, egenandel mot full dekning og delingstall på tvers av årskull."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort. Noen er forenklet som i H2025 og teksten sier fra.",
        "Laget av appen etter mønster fra H2025. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene og sjekk om et alternativ er svaret på nabospørsmålet eller "
                     "på H2025-versjonen av oppgaven. Det er fellen i nesten hver oppgave her."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove10.json")
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
