"""Prøveeksamen 17 (FIE432): regner alle tall, bygger prove17.json og sjekker den.

Tredje trekning av prediksjonen for eksamen 12. november 2026
(docs/fie432-proveeksamen-spek.md, «Prøveeksamen 17: tredje trekning: kursgodkjenningen
og 2026-forelesningene»). Kjernerutinene kommer med andre vrier enn i prøveeksamen 10–15.

Kjør:  python3 -I fag/fie432/_prove/prove17_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p17) sier,
3. skriver prove17.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p17"]
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


def PP(a, b, d=1, mal="{} og {}"):
    """Alternativ med to prosenttall."""
    return (mal.format(pst(a, d), pst(b, d)), [pst(a, d), pst(b, d)])


# ======================================================================= 1
print("\nOppgave 1: Konrad selger aksjen i Namsos Sagbruk ASA til Irene")
KK1, KI1, D1s = 450.0, 500.0, 30.0                  # Konrads kostpris, Irenes kostpris, utbyttet i mai år 1
r1 = [0.04, 0.02, 0.05]
DI1 = [0.0, 5.0, 60.0]                              # Irenes utbytte i år 1, 2 og 3
# a: Konrad eier ikke aksjen 31.12 år 1 og får ingen skjerming for år 1
a1 = D1s                                            # 30,00
g1a_skj = D1s - KK1 * r1[0]                         # skjerming gitt likevel: 12,00
g1a_mnd = D1s - KK1 * r1[0] * 11 / 12               # skjerming for elleve måneder: 13,50
g1a_pris = D1s - KI1 * r1[0]                        # skjerming av salgsprisen: 10,00
assert lik(g1a_skj, 12) and lik(g1a_mnd, 13.5) and lik(g1a_pris, 10)
# b: Irene eier aksjen 31.12 år 1 og får hele årets skjerming
ub1 = KI1 * r1[0]                                   # 20,00
g1b_null = 0.0                                      # ingen skjerming uten utbytte eller med én måneds eiertid
g1b_mnd = KI1 * r1[0] / 12                          # én måned: 1,67
g1b_kk = KK1 * r1[0]                                # Konrads kostpris: 18,00
assert lik(ub1, 20) and kr(g1b_mnd, 2) == "1,67" and lik(g1b_kk, 18)
# c: år 2 og år 3
grl2 = KI1 + ub1                                    # 520
skj2 = grl2 * r1[1]                                 # 10,40
skpl2 = max(0.0, DI1[1] - skj2 - ub1)               # 0
ub2 = ub1 + skj2 - DI1[1]                           # 25,40
grl3 = KI1 + ub2                                    # 525,40
skj3 = grl3 * r1[2]                                 # 26,27
c1 = DI1[2] - skj3 - ub2                            # 8,33
assert lik(skj2, 10.4) and lik(ub2, 25.4) and lik(skj3, 26.27) and lik(c1, 8.33) and skpl2 == 0
ub2_k = ub1 + KI1 * r1[1] - DI1[1]                  # grunnlaget ikke økt: 25,00
g1c_grl = DI1[2] - KI1 * r1[2] - ub2_k              # 10,00
g1c_trekk = DI1[2] - skj3                           # ubenyttet lagt til grunnlaget, men ikke trukket fra: 33,73
ub2_0 = KI1 * r1[1] - DI1[1]                        # år 1 glemt: 5,00
g1c_aar1 = DI1[2] - (KI1 + ub2_0) * r1[2] - ub2_0   # 29,75
assert lik(g1c_grl, 10) and lik(g1c_trekk, 33.73) and lik(g1c_aar1, 29.75)
print(f"   a {a1}: {g1a_skj}, {g1a_mnd}, {g1a_pris}; b {ub1}: 0, {g1b_mnd:.4f}, {g1b_kk}; "
      f"c {c1:.4f}: {g1c_grl}, {g1c_trekk:.4f}, {g1c_aar1}")
body1 = ("<p>Namsos Sagbruk ASA betalte kr 30 per aksje i utbytte i mai år 1. Konrad hadde eid én aksje siden år 0, med "
         "kostpris kr 450 og uten ubenyttet skjerming. 1. desember år 1 solgte han aksjen til Irene for kr 500. Irene eier "
         "aksjen ut år 3. Skjermingsrenten er 4 % i år 1, 2 % i år 2 og 5 % i år 3.</p>")
pa = ledd("a", "<p>Hva er skattepliktig utbytte for Konrad i år 1?</p>",
          K(a1, 2),
          [K(g1a_skj, 2), K(g1a_mnd, 2), K(g1a_pris, 2)],
          sol("Skjermingsfradraget for et år går til den personlige aksjonæren som eier aksjen 31. desember det året. "
              "Det fordeles ikke etter eiertid. Den som selger i løpet av året, får ingen skjerming for salgsåret "
              "(F4 lb 34, der Olsen går glipp av skjermingen i salgsåret; kursgodkjenningen 2026 spørsmål 10; manualen "
              "5.3).",
              ["Konrad eier ikke aksjen 31. desember år 1. Skjermingen for år 1 er derfor ikke hans.",
               "Han har heller ingen ubenyttet skjerming fra før.",
               f"Skattepliktig utbytte: {kr(D1s, 2)} − 0 = <b>kr {kr(a1, 2)}</b>."],
              [(f"Kr {kr(g1a_skj, 2)}", f"Konrad har fått skjerming for år 1 likevel: {kr(D1s, 2)} − {kr(KK1)} × 4 % = "
                f"{kr(D1s, 2)} − {kr(KK1 * r1[0], 2)}."),
               (f"Kr {kr(g1a_mnd, 2)}", f"skjermingen er fordelt etter eiertid, elleve av tolv måneder: {kr(D1s, 2)} − "
                f"{kr(KK1 * r1[0] * 11 / 12, 2)}. Skjermingen deles ikke."),
               (f"Kr {kr(g1a_pris, 2)}", f"skjermingen er regnet av salgsprisen: {kr(D1s, 2)} − {kr(KI1)} × 4 %. Det er "
                "Irenes skjerming.")],
              "Skjermingen for år 1 finnes bare én gang. I neste ledd ligger den hos Irene. Da kan den ikke også ligge "
              "hos Konrad. ✓",
              "Spør først hvem som eier aksjen 31. desember. Da faller alle alternativene som gir Konrad skjerming."))
pb = ledd("b", "<p>Hvor mye ubenyttet skjerming har Irene på aksjen ved utgangen av år 1?</p>",
          K(ub1, 2),
          [K(g1b_null, 2), K(g1b_mnd, 2), K(g1b_kk, 2)],
          sol("Eieren 31. desember får skjermingen for hele året, også når aksjen er kjøpt sent på året. Grunnlaget er "
              "eierens egen kostpris. Får eieren ikke utbytte, blir hele skjermingen stående som ubenyttet "
              "(F4 lb 33–34, manualen 5.3).",
              [f"Irene eier aksjen 31. desember år 1. Kostprisen hennes er {kr(KI1)}.",
               f"Skjerming for år 1: {kr(KI1)} × 4 % = {kr(ub1, 2)}.",
               f"Hun fikk ikke utbytte i år 1. Ubenyttet skjerming er <b>kr {kr(ub1, 2)}</b>."],
              [(f"Kr {kr(g1b_null, 2)}", "som om skjermingen krever at eieren har fått utbytte, eller at den fulgte "
                "utbyttet til Konrad."),
               (f"Kr {kr(g1b_mnd, 2)}", f"én tolvdel, altså fordelt etter eiertid: {kr(ub1, 2)}/12."),
               (f"Kr {kr(g1b_kk, 2)}", f"Konrads kostpris er brukt: {kr(KK1)} × 4 %. Irenes grunnlag er det hun selv "
                "betalte.")],
              f"Konrad fikk ingen skjerming i a og Irene får {kr(ub1, 2)} her. Til sammen er skjermingen for år 1 gitt "
              "én gang. ✓"))
pc = ledd("c", f"<p>Irene får kr {kr(DI1[1])} i utbytte i år 2 og kr {kr(DI1[2])} i år 3. Hva er skattepliktig utbytte "
               "for Irene i år 3? Svar med to desimaler.</p>",
          K(c1, 2),
          [K(g1c_grl, 2), K(g1c_trekk, 2), K(g1c_aar1, 2)],
          sol("Ubenyttet skjerming framføres. Året etter legges den til skjermingsgrunnlaget og trekkes i tillegg fra "
              "utbyttet sammen med årets skjerming (F4 lb 33–34, manualen 5.3).",
              [f"År 2: grunnlag {kr(KI1)} + {kr(ub1, 2)} = {kr(grl2)}. Skjerming {kr(grl2)} × 2 % = {kr(skj2, 2)}. "
               f"Utbyttet er {kr(DI1[1])}, så ubenyttet blir {kr(ub1, 2)} + {kr(skj2, 2)} − {kr(DI1[1], 2)} = "
               f"{kr(ub2, 2)}.",
               f"År 3: grunnlag {kr(KI1)} + {kr(ub2, 2)} = {kr(grl3, 2)}. Skjerming {kr(grl3, 2)} × 5 % = "
               f"{kr(skj3, 2)}.",
               f"Skattepliktig: {kr(DI1[2], 2)} − {kr(skj3, 2)} − {kr(ub2, 2)} = <b>kr {kr(c1, 2)}</b>."],
              [(f"Kr {kr(g1c_grl, 2)}", f"grunnlaget er holdt på {kr(KI1)} i alle år. Da blir skjermingen 10,00 i år 2 "
                f"og 25,00 i år 3: {kr(DI1[2], 2)} − 25,00 − 25,00."),
               (f"Kr {kr(g1c_trekk, 2)}", f"den ubenyttede skjermingen er lagt til grunnlaget, men ikke trukket fra "
                f"utbyttet: {kr(DI1[2], 2)} − {kr(skj3, 2)}."),
               (f"Kr {kr(g1c_aar1, 2)}", f"skjermingen for år 1 er glemt, fordi Irene kjøpte i desember. Da er ubenyttet "
                f"bare {kr(ub2_0, 2)} etter år 2: {kr(DI1[2], 2)} − {kr((KI1 + ub2_0) * r1[2], 2)} − {kr(ub2_0, 2)}.")],
              f"Samlet skjerming for Irene: {kr(ub1, 2)} + {kr(skj2, 2)} + {kr(skj3, 2)} = {kr(ub1 + skj2 + skj3, 2)}. "
              f"Samlet utbytte: {kr(DI1[1] + DI1[2], 2)}. Differansen er {kr(DI1[1] + DI1[2] - ub1 - skj2 - skj3, 2)}. ✓",
              f"{kr(c1, 2)} og {kr(g1c_grl, 2)} ligger nærmest hverandre. Forskjellen er om ubenyttet skjerming løfter "
              "grunnlaget. Det gjør den."))
EX.append(oppgave(1, "Konrad, Irene og aksjen i Namsos Sagbruk ASA", "Skjerming", [5], body1, [pa, pb, pc]))

# ======================================================================= 2
print("\nOppgave 2: Mette selger 120 av 200 aksjer i Oppdal Skifer ASA")
N2, n2, K2, S2, ub2s = 200, 120, 150.0, 210.0, 6.0
gev2 = (S2 - K2 - ub2s) * n2                        # 6 480
a2 = gev2 * TE                                      # 2 452,03
g2_alle = (S2 - K2 - ub2s) * N2 * TE                # alle 200 aksjene: 4 086,72
g2_ub = (S2 - K2) * n2 * TE                         # ubenyttet skjerming glemt: 2 724,48
g2_opp = gev2 * 0.22                                # oppjustering glemt: 1 425,60
assert lik(gev2, 6480) and kr(a2, 2) == "2 452,03" and kr(g2_alle, 2) == "4 086,72"
assert kr(g2_ub, 2) == "2 724,48" and kr(g2_opp, 2) == "1 425,60"
print(f"   gevinst {gev2}, skatt {a2:.4f}; gale {g2_alle:.4f}, {g2_ub:.4f}, {g2_opp:.4f}")
p = ledd("", f"<p>Mette eier {N2} aksjer i Oppdal Skifer ASA. Kostprisen er kr {kr(K2)} per aksje og hver aksje har kr "
             f"{kr(ub2s)} i ubenyttet skjerming. I mars selger hun {n2} av aksjene for kr {kr(S2)} per aksje, før "
             "selskapet betaler utbytte. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye skatt betaler Mette "
             "på gevinsten? Svar med to desimaler.</p>",
         K(a2, 2),
         [K(g2_alle, 2), K(g2_ub, 2), K(g2_opp, 2)],
         sol("Skattepliktig gevinst er salgspris minus kostpris minus ubenyttet skjerming på aksjene som selges. "
             "Skjermingen følger den enkelte aksjen. Gevinsten oppjusteres med 1,72 og skattlegges med 22 %, altså "
             "37,84 % (F4 lb 35, manualen 5.4).",
             [f"Gevinst per aksje: {kr(S2)} − {kr(K2)} − {kr(ub2s)} = {kr(S2 - K2 - ub2s)}.",
              f"For {n2} aksjer: {kr(S2 - K2 - ub2s)} × {n2} = {kr(gev2)}.",
              f"Skatt: {kr(gev2)} × 1,72 × 22 % = <b>kr {kr(a2, 2)}</b>."],
             [(f"Kr {kr(g2_alle, 2)}", f"alle {N2} aksjene er regnet som solgt: {kr((S2 - K2 - ub2s) * N2)} × 37,84 %. "
               f"Bare {n2} er solgt."),
              (f"Kr {kr(g2_ub, 2)}", f"den ubenyttede skjermingen er glemt: {kr((S2 - K2) * n2)} × 37,84 %."),
              (f"Kr {kr(g2_opp, 2)}", f"oppjusteringen er glemt: {kr(gev2)} × 22 %.")],
             f"Salgssum {kr(S2 * n2)} minus kostpris {kr(K2 * n2)} minus skjerming {kr(ub2s * n2)} = {kr(gev2)}. ✓ De "
             f"{N2 - n2} aksjene hun beholder, har fortsatt kr {kr(ub2s)} hver i ubenyttet skjerming.",
             "Det laveste tallet mangler oppjusteringen og det høyeste gjelder hele posten. Stryk dem. Da avgjør "
             "skjermingen."))
EX.append(oppgave(2, "Salg av en del av aksjeposten", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Preben og Kragerø Båt AS (overskuddet som trengs)")
N3, ts3, te3 = 300_000, 0.20, 0.40
a3 = N3 / ((1 - ts3) * (1 - te3))                   # 625 000
g3_eier = N3 / (1 - te3)                            # bare eierskatten: 500 000
g3_sum = N3 / (1 - ts3 - te3)                       # satsene lagt sammen: 750 000
g3_paa = N3 * (1 + ts3 + te3)                       # skattene lagt oppå: 480 000
assert lik(a3, 625_000) and lik(g3_eier, 500_000) and lik(g3_sum, 750_000) and lik(g3_paa, 480_000)
utb3 = a3 * (1 - ts3)
assert lik(utb3 * (1 - te3), N3)
print(f"   overskudd {a3}; gale {g3_eier}, {g3_sum}, {g3_paa}")
p = ledd("", f"<p>Preben eier alle aksjene i Kragerø Båt AS og trenger kr {kr(N3)} privat. Selskapet betaler "
             "selskapsskatt av overskuddet og deler ut resten som utbytte. Preben betaler eierskatt av utbyttet. Anta "
             "forenklet at selskapsskatten er 20 % og den effektive eierskatten 40 %. Se bort fra skjerming. Hvor stort "
             f"overskudd før skatt må selskapet ha for at Preben skal sitte igjen med kr {kr(N3)}?</p>",
         K(a3),
         [K(g3_eier), K(g3_sum), K(g3_paa)],
         sol("Overskuddet skattlegges to ganger: først i selskapet, så hos eieren av det som er igjen. Av én krone "
             "overskudd sitter eieren igjen med (1 − selskapsskatt) × (1 − eierskatt). Beløpet han trenger, deles på "
             "denne faktoren (F4 lb 20 og 30, F5 lb 15, manualen 5.1).",
             ["Igjen av én krone overskudd: (1 − 0,20) × (1 − 0,40) = 0,80 × 0,60 = 0,48.",
              f"Overskudd: {kr(N3)}/0,48 = <b>kr {kr(a3)}</b>."],
             [(f"Kr {kr(g3_eier)}", f"bare eierskatten er tatt med: {kr(N3)}/0,60. Det er utbyttet han trenger, ikke "
               "overskuddet."),
              (f"Kr {kr(g3_sum)}", f"satsene er lagt sammen til 60 %: {kr(N3)}/0,40. Eierskatten regnes av utbyttet, "
               "ikke av hele overskuddet."),
              (f"Kr {kr(g3_paa)}", f"skattene er lagt oppå beløpet: {kr(N3)} × 1,60. Skatten skal regnes av "
               "bruttobeløpet.")],
             f"Overskudd {kr(a3)}. Selskapsskatt 20 %: {kr(a3 * ts3)}. Utbytte {kr(utb3)}. Eierskatt 40 %: "
             f"{kr(utb3 * te3)}. Igjen: {kr(utb3 * (1 - te3))}. ✓",
             f"Svaret må være over {kr(g3_eier)}, som er utbyttet alene. Det må være under {kr(g3_sum)}, fordi samlet "
             "skatt er 52 % og ikke 60 %."))
EX.append(oppgave(3, "Overskuddet som trengs for et bestemt beløp etter skatt", "Effektiv skattesats", [5, 9], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Nora og Ludvig (ektepar, gjeldsreduksjon og formuesskatt)")
B4, A4, K4, G4 = 8_000_000, 6_000_000, 6_000_000, 5_000_000
BF4 = 1_900_000
brutto4 = B4 + A4 + K4                              # 20 000 000
gB4, gA4, gK4 = (G4 * x / brutto4 for x in (B4, A4, K4))    # 3 000 000, 1 500 000, 500 000
red4 = gA4 * 0.20                                   # 300 000
a4 = G4 - red4                                      # 4 700 000
fv4 = B4 * 0.25 + A4 * 0.80 + K4                    # 9 800 000
netto4 = fv4 - a4                                   # 5 100 000
b4 = (netto4 - 2 * BF4) * 0.01                      # 13 000
g4a_ingen = G4                                      # ingen reduksjon: 5 000 000
g4a_hele = G4 * 0.80                                # 20 % på hele gjelden: 4 000 000
g4a_alle = gB4 * 0.25 + gA4 * 0.80 + gK4            # også boliggjelden redusert: 2 450 000
g4b_ett = (netto4 - BF4) * 0.01                     # bare ett bunnfradrag: 32 000
g4b_gjeld = (fv4 - G4 - 2 * BF4) * 0.01             # gjelden ikke redusert: 10 000
g4b_null = netto4 * 0.01                            # bunnfradraget glemt: 51 000
assert lik(gA4, 1_500_000) and lik(a4, 4_700_000) and lik(fv4, 12_800_000) and lik(netto4, 8_100_000)
assert lik(b4, 43_000) and lik(g4a_alle, 3_200_000) and lik(g4b_ett, 62_000) and lik(g4b_gjeld, 40_000)
assert lik(g4b_null, 81_000) and B4 < 10_000_000 and lik(2 * (netto4 / 2 - BF4) * 0.01, b4)
print(f"   a {a4}: {g4a_ingen}, {g4a_hele}, {g4a_alle}; b {b4}: {g4b_ett}, {g4b_gjeld}, {g4b_null}")
body4 = (f"<p>Ekteparet Nora og Ludvig eier alt sammen: en primærbolig med markedsverdi kr {kr(B4)}, andeler i et "
         f"aksjefond verdt kr {kr(A4)} og kr {kr(K4)} i banken. Gjelden deres er kr {kr(G4)}. Boligen verdsettes til "
         "25 %, aksjefondet til 80 % og bankinnskuddet til 100 %. Gjelden fordeles forholdsmessig etter markedsverdiene. "
         "Bare gjelden som faller på aksjefondet, reduseres med 20 %.</p>")
pa = ledd("a", "<p>Hvor mye av gjelden kommer til fradrag i formuesskatten?</p>",
          K(a4),
          [K(g4a_ingen), K(g4a_hele), K(g4a_alle)],
          sol("Gjelden fordeles på eiendelene etter markedsverdi. Gjeld som faller på en eiendel med rabatt, reduseres "
              "med samme rabatt. Unntaket er primærboligen: gjelden på den reduseres ikke (F8 lb 55–56 og lb 88, "
              "manualen 7.4).",
              [f"Aksjefondets andel av bruttoformuen: {kr(A4)}/{kr(brutto4)} = 30 %.",
               f"Gjeld på aksjefondet: 30 % × {kr(G4)} = {kr(gA4)}. Reduksjon: 20 % × {kr(gA4)} = {kr(red4)}.",
               f"Gjeld til fradrag: {kr(G4)} − {kr(red4)} = <b>kr {kr(a4)}</b>."],
              [(f"Kr {kr(g4a_ingen)}", "hele gjelden uten reduksjon. Gjelden på aksjefondet skal reduseres."),
               (f"Kr {kr(g4a_hele)}", f"hele gjelden er redusert med 20 %: {kr(G4)} × 80 %. Bare aksjefondets del skal "
                "reduseres."),
               (f"Kr {kr(g4a_alle)}", f"også gjelden på boligen er redusert, med 75 %: {kr(gB4 * 0.25)} + "
                f"{kr(gA4 * 0.80)} + {kr(gK4)}. Gjeld på primærboligen reduseres ikke.")],
              f"Gjeld per eiendel: bolig {kr(gB4)}, aksjefond {kr(gA4 * 0.80)} etter reduksjon og bank {kr(gK4)}. Sum "
              f"{kr(a4)}. ✓"))
pb = ledd("b", f"<p>Formuesskatten er 1,0 % av nettoformuen over bunnfradraget, som er kr {kr(BF4)} for hver ektefelle. "
               "Hvor mye formuesskatt betaler ekteparet til sammen?</p>",
          K(b4),
          [K(g4b_ett), K(g4b_gjeld), K(g4b_null)],
          sol("Nettoformuen er summen av formuesverdiene minus gjelden som kommer til fradrag. Hver ektefelle har sitt "
              f"bunnfradrag, så ekteparet har kr {kr(2 * BF4)} til sammen (F8 lb 5 og lb 7, manualen 7.1; satsene for "
              "2026).",
              [f"Formuesverdi: {kr(B4)} × 25 % + {kr(A4)} × 80 % + {kr(K4)} = {kr(B4 * 0.25)} + {kr(A4 * 0.8)} + "
               f"{kr(K4)} = {kr(fv4)}.",
               f"Nettoformue: {kr(fv4)} − {kr(a4)} = {kr(netto4)}.",
               f"Formuesskatt: ({kr(netto4)} − 2 × {kr(BF4)}) × 1,0 % = {kr(netto4 - 2 * BF4)} × 1,0 % = "
               f"<b>kr {kr(b4)}</b>."],
              [(f"Kr {kr(g4b_ett)}", f"bare ett bunnfradrag: ({kr(netto4)} − {kr(BF4)}) × 1,0 %. De er to skattytere."),
               (f"Kr {kr(g4b_gjeld)}", f"gjelden er trukket fra uten reduksjon: ({kr(fv4)} − {kr(G4)} − "
                f"{kr(2 * BF4)}) × 1,0 %."),
               (f"Kr {kr(g4b_null)}", f"bunnfradraget er glemt: {kr(netto4)} × 1,0 %.")],
              f"Hver ektefelle har halve nettoformuen, {kr(netto4 / 2)}. Skatt per ektefelle: ({kr(netto4 / 2)} − "
              f"{kr(BF4)}) × 1,0 % = {kr((netto4 / 2 - BF4) * 0.01)}. To ganger dette er {kr(b4)}. ✓"))
EX.append(oppgave(4, "Ektepar med primærbolig, aksjefond og gjeld", "Formuesskatt", [7], body4, [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: Olav og Molde Maritim AS (utbytte til formuesskatten, med skjerming)")
FV5, tau5, te5, SKJ5 = 6_400_000, 0.01, 0.40, 10_000
F5 = FV5 * tau5                                     # 64 000
a5 = (F5 - te5 * SKJ5) / (1 - te5)                  # 100 000
g5_uten = F5 / (1 - te5)                            # skjermingen glemt: 106 667
g5_fra_f = (F5 - SKJ5) / (1 - te5)                  # skjermingen trukket fra formuesskatten: 90 000
g5_etter = F5 / (1 - te5) - SKJ5                    # skjermingen trukket fra utbyttet til slutt: 96 667
assert lik(a5, 100_000) and lik(a5 - te5 * (a5 - SKJ5), F5) and lik(g5_fra_f, 90_000)
assert kr(g5_uten) == "106 667" and kr(g5_etter) == "96 667"
print(f"   F {F5}, utbytte {a5}; gale {g5_uten:.2f}, {g5_fra_f}, {g5_etter:.2f}")
p = ledd("", f"<p>Olav eier alle aksjene i Molde Maritim AS. Formuesverdien av aksjene er kr {kr(FV5)} etter "
             "aksjerabatten og formuesskatten er 1 %. Olav har ingen andre midler og må ta et utbytte som dekker både "
             f"formuesskatten og eierskatten på utbyttet. Skjermingsfradraget hans i år er kr {kr(SKJ5)}. Anta forenklet "
             "at eierskatten er 40 % av skattepliktig utbytte. Se bort fra bunnfradrag. Hvor stort utbytte må Olav ta? "
             "Rund av til nærmeste krone.</p>",
         K(a5),
         [K(g5_uten), K(g5_fra_f), K(g5_etter)],
         sol("Utbyttet D skal dekke formuesskatten F og eierskatten. Eierskatten regnes av utbyttet minus "
             "skjermingsfradraget S. Da er D − t(D − S) = F, som gir D = (F − tS)/(1 − t). Skjermingen sparer t kroner "
             "i skatt per krone, ikke en hel krone (manualen 8.4 og 5.3; H2025 oppgave 6).",
             [f"Formuesskatt: {kr(FV5)} × 1 % = {kr(F5)}.",
              f"Skatten skjermingen sparer: 40 % × {kr(SKJ5)} = {kr(te5 * SKJ5)}.",
              f"Utbytte: ({kr(F5)} − {kr(te5 * SKJ5)})/0,60 = <b>kr {kr(a5)}</b>."],
             [(f"Kr {kr(g5_uten)}", f"skjermingen er glemt: {kr(F5)}/0,60."),
              (f"Kr {kr(g5_fra_f)}", f"hele skjermingen er trukket fra formuesskatten: ({kr(F5)} − {kr(SKJ5)})/0,60. "
               "Skjermingen reduserer grunnlaget for eierskatten, ikke formuesskatten."),
              (f"Kr {kr(g5_etter)}", f"skjermingen er trukket fra utbyttet til slutt: {kr(g5_uten)} − {kr(SKJ5)}.")],
             f"Utbytte {kr(a5)}. Skattepliktig: {kr(a5)} − {kr(SKJ5)} = {kr(a5 - SKJ5)}. Eierskatt 40 %: "
             f"{kr(te5 * (a5 - SKJ5))}. Igjen: {kr(a5 - te5 * (a5 - SKJ5))}, som er formuesskatten. ✓",
             f"Uten skjerming er svaret {kr(g5_uten)}. Skjermingen må gi et lavere tall, men den sparer bare "
             f"{kr(te5 * SKJ5)} i skatt. Da er {kr(g5_fra_f)} for lavt."))
EX.append(oppgave(5, "Utbyttet som skal dekke formuesskatten når aksjene har skjerming",
                  "Formuesskatt som avkastningsskatt", [8, 5], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: Otto (formuesskatt ved inngangen mot utgangen av året)")
W6, r6, tau6 = 5_000_000, 0.08, 0.01
t6_inn = tau6 / r6                                  # 12,5 %
t6_ut = tau6 * (1 + r6) / r6                        # 13,5 %
g6_del = t6_inn / (1 + r6)                          # delt på 1,08 i stedet for ganget: 11,57 %
assert lik(t6_inn, 0.125) and lik(t6_ut, 0.135) and pst(g6_del, 1) == "11,6 %"
assert lik(W6 * tau6, W6 * r6 * t6_inn) and lik(W6 * (1 + r6) * tau6, W6 * r6 * t6_ut)
print(f"   inngang {t6_inn}, utgang {t6_ut}; delt {g6_del:.5f}")
MAL6 = "(i) {} og (ii) {}"
p = ledd("", f"<p>Otto har en formue på kr {kr(W6)} ved inngangen til året. Formuen gir 8 % avkastning, som realiseres "
             "ved utgangen av året. Formuesskatten er 1 %. Myndighetene vil erstatte den med en skatt t på avkastningen "
             "som gir samme proveny. Se bort fra bunnfradrag og rabatter. Hvor høy må t være når formuesskatten regnes av "
             "formuen (i) ved inngangen til året og (ii) ved utgangen av året, etter at avkastningen er lagt til?</p>",
         PP(t6_inn, t6_ut, 1, MAL6),
         [PP(t6_inn, g6_del, 1, MAL6), PP(t6_ut, t6_inn, 1, MAL6), PP(t6_inn, t6_inn, 1, MAL6)],
         sol("Sett provenyet fra de to skattene likt. Med formuesskatt τ på formuen W ved inngangen er Wτ = Wrt, så "
             "t = τ/r. Regnes formuesskatten av formuen ved utgangen, er grunnlaget W(1 + r). Da er W(1 + r)τ = Wrt, så "
             "t = τ(1 + r)/r (F8 lb 27–29, manualen 8.1).",
             [f"Avkastning: {kr(W6)} × 8 % = {kr(W6 * r6)}.",
              f"(i) Formuesskatt: {kr(W6)} × 1 % = {kr(W6 * tau6)}. t = {kr(W6 * tau6)}/{kr(W6 * r6)} = "
              f"<b>{pst(t6_inn, 1)}</b>.",
              f"(ii) Formuesskatt: {kr(W6 * (1 + r6))} × 1 % = {kr(W6 * (1 + r6) * tau6)}. t = "
              f"{kr(W6 * (1 + r6) * tau6)}/{kr(W6 * r6)} = <b>{pst(t6_ut, 1)}</b>."],
             [(MAL6.format(pst(t6_inn, 1), pst(g6_del, 1)), "i (ii) er satsen delt på 1,08 i stedet for ganget. Et større "
               "grunnlag gir mer formuesskatt, ikke mindre."),
              (MAL6.format(pst(t6_ut, 1), pst(t6_inn, 1)), "de to tilfellene er byttet om."),
              (MAL6.format(pst(t6_inn, 1), pst(t6_inn, 1)), "tidspunktet er regnet som likegyldig. Ved utgangen av året "
               "er avkastningen med i grunnlaget.")],
             "Forelesningens tall er τ = 1 % og r = 5 %: 20 % ved inngangen og 21 % ved utgangen. Mønsteret er det samme "
             "her: (ii) er (i) ganget med 1 + r. 12,5 % × 1,08 = 13,5 %. ✓",
             "Tallet i (i) er τ/r. Tallet i (ii) må være høyere. Bare ett alternativ har begge deler."))
EX.append(oppgave(6, "Formuesskatt regnet av formuen ved inngangen eller utgangen av året",
                  "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: Stykkskatt (produsentenes andel og to grensetilfeller)")
Q7, P7, t7 = 400, 50.0, 6.0
c7 = (P7 - t7) * Q7                                 # 17 600
g7_ingen = P7 * Q7                                  # konsumentene bærer skatten: 20 000
g7_opp = (P7 + t7) * Q7                             # konsumentprisen ganget med kvantum: 22 400
g7_delt = (P7 - t7 / 2) * Q7                        # delt likt: 18 800
assert lik(c7, 17_600) and lik(g7_ingen, 20_000) and lik(g7_opp, 22_400) and lik(g7_delt, 18_800)
# kontroll av formelen i a med tall: D' = −3, S' = 2
Dd, Sd = -3.0, 2.0
dp = Dd / (Sd - Dd)
dP = Sd / (Sd - Dd)
assert lik(dP - dp, 1) and lik(-dp, 0.6) and lik(-Dd / (Sd - Dd), 0.6)
print(f"   c {c7}: {g7_ingen}, {g7_opp}, {g7_delt}; kontroll a: produsentandel {-dp}, konsumentandel {dP}")
body7 = ("<p>I et marked med frikonkurranse er etterspørselen D(P) og tilbudet S(p), der P er prisen konsumentene "
         "betaler og p prisen produsentene sitter igjen med. Myndighetene innfører en stykkskatt t som produsentene "
         "betaler inn, slik at P = p + t og likevekten er D(p + t) = S(p). D′ og S′ er helningene på kurvene, med "
         "D′ &lt; 0 og S′ &gt; 0.</p>")
pa = ledd("a", "<p>Hvilket uttrykk viser hvor stor andel av en liten skatteøkning produsentene bærer? Andelen er et "
               "tall mellom 0 og 1.</p>",
          B("−D′/(S′ − D′)"),
          [B("S′/(S′ − D′)"), B("D′/(S′ − D′)"), B("−D′/(S′ + D′)")],
          sol("Deriver likevekten D(p + t) = S(p) med hensyn på t: D′(∂p/∂t + 1) = S′ ∂p/∂t. Det gir ∂p/∂t = "
              "D′/(S′ − D′), som er negativt. Produsentprisen faller altså med −D′/(S′ − D′) kroner per krone skatt. Det "
              "er produsentenes andel. Konsumentene bærer resten, ∂P/∂t = S′/(S′ − D′) (F9 lb 8–12, manualen 11.2). "
              "<b>Produsentenes andel er −D′/(S′ − D′).</b>",
              None,
              [("S′/(S′ − D′)", "konsumentenes andel, ∂P/∂t. Tilbudets helning står i telleren når det er konsumentene "
                "som bærer."),
               ("D′/(S′ − D′)", "endringen i produsentprisen, ∂p/∂t. Den er negativ og kan ikke være en andel mellom "
                "0 og 1. Fortegnet må snus."),
               ("−D′/(S′ + D′)", "fortegnsfeil i nevneren. Nevneren skal være S′ − D′, som er summen av de to "
                "helningene i tallverdi.")],
              "Sett inn D′ = −3 og S′ = 2. Produsentene bærer 3/5 = 0,6 og konsumentene 2/5 = 0,4. Summen er 1. ✓ Den "
              "minst prisfølsomme siden bærer mest (F9 lb 14).",
              "To av uttrykkene har riktig nevner og positiv verdi. Den som bærer, har den andre sidens helning i "
              "telleren: produsentenes andel har D′."))
pb = ledd("b", "<p>Anta at etterspørselen er perfekt uelastisk, slik som for insulin. Hvilket utsagn er riktig?</p>",
          B("Konsumentene bærer hele skatten. Kvantum er uendret, så det oppstår ikke noe velferdstap"),
          [B("Konsumentene bærer hele skatten. Prisen stiger, så det oppstår et velferdstap"),
           B("Produsentene bærer hele skatten. Kvantum er uendret, så det oppstår ikke noe velferdstap"),
           B("Produsentene bærer hele skatten. Prisen de får faller, så det oppstår et velferdstap")],
          sol("Med D′ = 0 er ∂P/∂t = S′/(S′ − 0) = 1 og ∂p/∂t = 0. Konsumentprisen stiger med hele skatten. Kjøperne "
              "kjøper like mye uansett pris, så kvantumet endres ikke. Velferdstapet kommer av at kvantumet faller. Uten "
              "fall i kvantum er det ikke noe velferdstap (F9 lb 11, 15 og 18, manualen 11.4 og 11.5). <b>Konsumentene bærer "
              "hele skatten og det oppstår ikke noe velferdstap.</b>",
              None,
              [("Konsumentene, velferdstap", "riktig om hvem som bærer. Men en høyere pris gir bare velferdstap når den "
                "får kvantumet til å falle. Her er kvantumet uendret."),
               ("Produsentene, kvantum uendret", "det er tilfellet med perfekt uelastisk tilbud: da bærer produsentene "
                "alt og kvantumet er også uendret."),
               ("Produsentene, velferdstap", "produsentene bærer hele skatten når etterspørselen er perfekt elastisk "
                "(F9 lb 16). Da faller prisen de får og kvantumet. Det er det motsatte grensetilfellet.")],
              None,
              "Spørsmålet har to deler. Avgjør først hvem som bærer: den som ikke kan vike unna. Avgjør så om kvantumet "
              "kan endre seg."))
pc = ledd("c", f"<p>Anta i stedet at tilbudet er perfekt uelastisk, mens etterspørselen faller med prisen. Produsentene "
               f"selger {Q7} enheter uansett pris. Før skatten "
               f"er prisen kr {kr(P7)}. Stykkskatten er kr {kr(t7)} per enhet. Hvor mye sitter produsentene igjen med "
               "til sammen etter at skatten er betalt?</p>",
          K(c7),
          [K(g7_ingen), K(g7_opp), K(g7_delt)],
          sol("Med S′ = 0 er ∂P/∂t = 0 og ∂p/∂t = −1. Tilbyderne selger et fast kvantum uansett pris, så prisen "
              "konsumentene betaler, er uendret. Produsentene bærer hele skatten (F9 lb 11, manualen 11.4).",
              [f"Konsumentprisen er fortsatt {kr(P7)}.",
               f"Produsentprisen: {kr(P7)} − {kr(t7)} = {kr(P7 - t7)}.",
               f"Til sammen: {kr(P7 - t7)} × {Q7} = <b>kr {kr(c7)}</b>."],
              [(f"Kr {kr(g7_ingen)}", f"som før skatten: {kr(P7)} × {Q7}. Da måtte konsumentene ha båret hele skatten."),
               (f"Kr {kr(g7_opp)}", f"prisen er økt med skatten og produsentene beholder alt: {kr(P7 + t7)} × {Q7}."),
               (f"Kr {kr(g7_delt)}", f"skatten er delt likt: {kr(P7 - t7 / 2)} × {Q7}. Lik deling krever like bratte "
                "kurver.")],
              f"Staten får {kr(t7)} × {Q7} = {kr(t7 * Q7)}. Konsumentene betaler {kr(g7_ingen)} som før. "
              f"{kr(g7_ingen)} − {kr(t7 * Q7)} = {kr(c7)}. ✓"))
EX.append(oppgave(7, "Stykkskatt: produsentenes andel og to grensetilfeller", "Skatteincidens", [11], body7,
                  [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: Julie, fondet og tapsfradraget")
A8, a8_0, t8a, t8b, fall8 = 1_000_000, 480_000, 0.20, 0.36, 0.25
a8_1 = a8_0 * (1 - t8a) / (1 - t8b)                 # 600 000
tap8 = a8_1 * fall8 * (1 - t8b)                     # 96 000
tap8_for = a8_0 * fall8 * (1 - t8a)                 # 96 000 før skatteøkningen
g8_brutto = a8_1 * fall8                            # tapet før skatt: 150 000
g8_ikke = a8_0 * fall8 * (1 - t8b)                  # ikke tilpasset: 76 800
g8_ingen = a8_0 * fall8                             # verken tilpasning eller skatt: 120 000
assert lik(a8_1, 600_000) and lik(tap8, 96_000) and lik(tap8_for, tap8) and a8_1 <= A8
assert lik(g8_brutto, 150_000) and lik(g8_ikke, 76_800) and lik(g8_ingen, 120_000)
print(f"   nytt beløp {a8_1}, tap etter skatt {tap8} (før økningen {tap8_for}); gale {g8_brutto}, {g8_ikke}, {g8_ingen}")
body8 = (f"<p>Julie har kr {kr(A8)}: kr {kr(a8_0)} i et aksjefond og resten på en konto med null avkastning. "
         "Avkastningen på fondet skattlegges med 20 %, med fullt fradrag for tap. Julie er optimalt tilpasset. Nå økes "
         "skatten til 36 %.</p>")
pa = ledd("a", "<p>Julie tilpasser seg den nye skatten. Deretter faller fondet 25 %. Hvor mye taper Julie selv, etter "
               "skatt?</p>",
          K(tap8),
          [K(g8_brutto), K(g8_ikke), K(g8_ingen)],
          sol("Med fullt tapsfradrag og null avkastning på den sikre plasseringen gjenskaper investoren fordelingen av "
              "sluttformuen fra før skatteøkningen. Beløpet i fondet ganges med (1 − gammel sats)/(1 − ny sats). Det "
              "hun selv taper eller tjener i hvert utfall, blir da som før (F10 lb 6–12, manualen 12.2).",
              [f"Nytt beløp i fondet: {kr(a8_0)} × 0,80/0,64 = {kr(a8_1)}.",
               f"Tap før skatt: {kr(a8_1)} × 25 % = {kr(g8_brutto)}.",
               f"Staten dekker 36 %. Julie taper {kr(g8_brutto)} × 0,64 = <b>kr {kr(tap8)}</b>."],
              [(f"Kr {kr(g8_brutto)}", "tapet før skatt. Fradraget på 36 % er glemt."),
               (f"Kr {kr(g8_ikke)}", f"hun har ikke tilpasset seg: {kr(a8_0)} × 25 % × 0,64."),
               (f"Kr {kr(g8_ingen)}", f"verken tilpasning eller skatt: {kr(a8_0)} × 25 %.")],
              f"Før skatteøkningen ville hun tapt {kr(a8_0)} × 25 % × 0,80 = {kr(tap8_for)}. Det er samme beløp. Den "
              "private risikoen er uendret, mens staten bærer mer. ✓",
              "Kjenner du resultatet, trenger du ikke det nye beløpet: tapet etter skatt er som før skatteøkningen."))
pb = ledd("b", "<p>Hvilket utsagn om tapsfradraget i denne modellen er riktig?</p>",
          B("Det gjør staten til en passiv partner som tar samme andel av tapet som av gevinsten"),
          [B("Det er uten betydning for resultatet, fordi Julie bare ser på forventet avkastning"),
           B("Det sikrer at Julie aldri kan tape penger på fondet når skatten er regnet med"),
           B("Det betyr bare noe for en risikoavers investor. En risikonøytral investor påvirkes ikke")],
          sol("Fullt tapsfradrag betyr at staten tar andelen t av gevinsten og dekker andelen t av tapet. Staten blir en "
              "passiv partner («silent partner») i både oppside og nedside. Det er en av de to forutsetningene "
              "resultatet i modellen hviler på (F10 lb 3, 7 og 12, manualen 12.1–12.2). <b>Staten tar samme andel av "
              "tapet som av gevinsten.</b>",
              None,
              [("Uten betydning", "fullt tapsfradrag er en av de to sentrale forutsetningene (F10 lb 7). Uten fradrag "
                "straffer skatten risikotaking (F10 lb 2)."),
               ("Aldri tape", f"hun bærer fortsatt 1 − t av tapet selv. I a taper hun kr {kr(tap8)}."),
               ("Bare risikoaverse", "også en risikonøytral investor påvirkes. Uten fullt fradrag faller forventet "
                "gevinst etter skatt på det risikable prosjektet (F10 lb 2; kursgodkjenningen 2026 spørsmål 7).")],
              None,
              "Tapsfradraget er en regel om hvem som bærer tapet. Let etter alternativet som beskrever delingen, ikke "
              "etter et som lover et bestemt utfall."))
EX.append(oppgave(8, "Skatteøkning, tap etter skatt og tapsfradraget", "Skatt og risiko", [12], body8, [pa, pb]))

# ======================================================================= 9
print("\nOppgave 9: Karoline og toromsleiligheten")
p = ledd("", "<p>Karoline kjøper en toromsleilighet og vil selge den om tre år. Hun vurderer to strategier. Strategi 1: "
             "Hun leier ut hele leiligheten og bor et annet sted. Strategi 2: Hun bor i det ene rommet og leier ut det "
             "andre, som har lavere utleieverdi enn delen hun bruker selv. Hvilket utsagn er riktig etter "
             "forelesningen om investeringscaser?</p>",
         B("Med strategi 2 er både leien og en gevinst ved salget skattefri"),
         [B("Med strategi 2 er leien skattefri, mens en gevinst ved salget skattlegges"),
          B("Med strategi 1 skattlegges leien, mens en gevinst ved salget er skattefri"),
          B("Med strategi 1 er både leien og en gevinst ved salget skattefri")],
         sol("Leieinntekten er skattefri når du selv bruker minst halvparten av boligen, målt etter utleieverdi. Gevinst "
             "ved salg er skattefri når du har eid boligen i minst ett år og bodd i den i minst 12 av de siste 24 "
             "månedene. Den som bor i ett rom og leier ut det andre, tjener opp botid. Leier du ut hele boligen, "
             "skattlegges leien med 22 % og gevinsten er skattepliktig (F3 lb 15, 18 og 19, manualen 4.4). <b>Med "
             "strategi 2 er både leien og gevinsten skattefri.</b>",
             None,
             [("Strategi 2, gevinsten skattlegges", "utleie av en del av boligen hindrer ikke botid. Etter tre år har "
               "hun både eiertid og botid."),
              ("Strategi 1, gevinsten skattefri", "eiertiden er oppfylt, men ikke botiden. Hun har ikke bodd i "
               "leiligheten."),
              ("Strategi 1, alt skattefritt", "leien fra en bolig hun ikke bor i, skattlegges med 22 %. Leiligheten er "
               "da en sekundærbolig.")],
             None,
             "Begge skattefritakene henger på at hun bor der selv. Da kan bare en påstand om strategi 2 være riktig."))
EX.append(oppgave(9, "Leie ut ett rom eller hele leiligheten", "Investeringscaser", [4], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Overskudd i holdingselskapene")
p = ledd("", "<p>I selskapene til de 650 rikeste personene i Norge er det ifølge Dagens Næringsliv opptjent over "
             "kr 400 milliarder i overskudd som ikke er tatt ut. Hvilken egenskap ved skattesystemet gjør det mulig å "
             "samle opp utbytter og aksjegevinster slik, uten at det utløses eierskatt?</p>",
         B("Utbytte og gevinst er skattefrie i holdingselskapet. Eierskatten kommer først ved uttak"),
         [B("Skjermingsfradraget gis også til selskaper, slik at utbytte mellom selskaper skjermes for skatt"),
          B("Holdingselskaper er fritatt for selskapsskatt på all inntekt, også på overskudd fra egen drift"),
          B("Aksjonærmodellen gir eieren utsatt skatt på utbytte så lenge pengene settes inn i nye aksjer")],
         sol("Etter fritaksmetoden er utbytte og aksjegevinster i hovedsak skattefrie når mottakeren er et "
             "aksjeselskap. Overskuddet skattlegges hos eieren først når det tas ut av selskapet som utbytte. Den som "
             "lar pengene stå i holdingselskapet, utsetter eierskatten (F4 lb 22–26, manualen 6.1–6.3). <b>Utbytte og "
             "gevinst er skattefrie i holdingselskapet og eierskatten kommer først ved uttak.</b>",
             None,
             [("Skjermingsfradrag til selskaper", "skjermingsfradraget går bare til personlige aksjonærer "
               "(kursgodkjenningen 2026 spørsmål 10). Selskaper bruker fritaksmetoden."),
              ("Fritatt for selskapsskatt", "fritaket gjelder utbytte og gevinst på aksjer. Overskudd fra egen drift "
               "skattlegges med 22 %."),
              ("Utsatt skatt i aksjonærmodellen", "aksjonærmodellen skattlegger utbytte til personer med 37,84 % når "
               "det mottas, uansett hva pengene brukes til.")],
             None,
             "Spørsmålet handler om penger som blir stående i selskaper. Da er det regelen for selskapsaksjonærer som "
             "svarer, altså fritaksmetoden."))
EX.append(oppgave(10, "Overskudd som blir stående i holdingselskapene", "Fritaksmetoden", [6], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Pia i landet Norvik (gjennomsnittsskatt og marginalskatt)")
GR11 = [200_000, 600_000]
SATS11 = [0.20, 0.40, 0.50]
Y11 = 800_000
T11 = GR11[0] * SATS11[0] + (GR11[1] - GR11[0]) * SATS11[1] + (Y11 - GR11[1]) * SATS11[2]   # 300 000
snitt11 = T11 / Y11                                 # 37,5 %
marg11 = SATS11[2]                                  # 50 %
g11_uvekt = sum(SATS11) / 3                         # uvektet snitt av satsene: 36,7 %
assert lik(T11, 300_000) and lik(snitt11, 0.375) and pst(g11_uvekt, 1) == "36,7 %"
print(f"   skatt {T11}, snitt {snitt11}, marginal {marg11}; uvektet {g11_uvekt:.4f}")
p = ledd("", "<p>I landet Norvik er skatten 20 % på inntekt opp til kr 200 000, 40 % på inntekt mellom kr 200 000 og "
             f"kr 600 000 og 50 % på inntekt over kr 600 000. Pia tjener kr {kr(Y11)}. Se bort fra andre skatter og "
             "fradrag. Hva er gjennomsnittsskatten og marginalskatten til Pia?</p>",
         PP(snitt11, marg11),
         [PP(marg11, snitt11), PP(g11_uvekt, marg11), PP(marg11, marg11)],
         sol("Gjennomsnittsskatten er betalt skatt delt på bruttoinntekten. Marginalskatten er satsen på den neste "
             "kronen du tjener. I et trinnsystem regnes skatten trinn for trinn (F7 lb 21–24, manualen 1.2 og 1.4).",
             [f"Skatt: {kr(GR11[0])} × 20 % + {kr(GR11[1] - GR11[0])} × 40 % + {kr(Y11 - GR11[1])} × 50 % = "
              f"{kr(GR11[0] * SATS11[0])} + {kr((GR11[1] - GR11[0]) * SATS11[1])} + {kr((Y11 - GR11[1]) * SATS11[2])} = "
              f"{kr(T11)}.",
              f"Gjennomsnittsskatt: {kr(T11)}/{kr(Y11)} = <b>{pst(snitt11, 1)}</b>.",
              f"Den neste kronen ligger over kr {kr(GR11[1])}. Marginalskatten er <b>{pst(marg11, 1)}</b>."],
             [("{} og {}".format(pst(marg11, 1), pst(snitt11, 1)), "de to begrepene er byttet om."),
              ("{} og {}".format(pst(g11_uvekt, 1), pst(marg11, 1)), "gjennomsnittsskatten er regnet som snittet av de "
               "tre satsene, (20 + 40 + 50)/3. Trinnene er ikke like brede."),
              ("{} og {}".format(pst(marg11, 1), pst(marg11, 1)), f"høyeste sats er brukt på hele inntekten: "
               f"{kr(Y11)} × 50 %.")],
             f"Gjennomsnittsskatten må ligge mellom laveste og høyeste sats og under marginalskatten når satsene "
             f"stiger. 20 % &lt; 37,5 % &lt; 50 %. ✓",
             "Marginalskatten leser du rett ut av trinnet inntekten ligger i. Da står to alternativer igjen. Regn "
             "skatten for å skille dem."))
EX.append(oppgave(11, "Gjennomsnittsskatt og marginalskatt i et trinnsystem", "Progressivitet", [10, 1], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Forretningsmodellen til et skatteparadis")
p = ledd("", "<p>I Ugland House, en liten bygning på Caymanøyene, er 12 748 selskaper registrert. Ingen av dem har "
             "virksomhet på øya. Hvordan tjener et skatteparadis penger på slike selskaper, ifølge forelesningen om "
             "skatteparadiser?</p>",
         B("På avgifter for registrering og banktjenester, i bytte mot sekretesse og nullskatt"),
         [B("På selskapsskatt av overskuddene som flyttes dit, med lav sats, men svært stort grunnlag"),
          B("På arbeidsplassene og realinvesteringene som selskapene skaper i lokalsamfunnet"),
          B("På kildeskatt som holdes tilbake når overskuddene betales videre til eierne")],
         sol("Forretningsmodellen er å tjene penger på avgifter: årlige avgifter for å stå i selskapsregisteret og "
             "avgifter for banktjenester, i bytte mot sekretesse og nullskattevilkår. Landene er så små at avgiftene "
             "utgjør en viktig del av BNP. Selskapene i Ugland House er postkasseselskaper uten aktivitet på Cayman "
             "(F11 lb 5 og 7, manualen 13.5). <b>Skatteparadiset lever av avgifter.</b>",
             None,
             [("Selskapsskatt", "det gunstige regimet for utlendinger har nullskattevilkår. Det er ikke overskuddene "
               "som skattlegges."),
              ("Arbeidsplasser og realinvesteringer", "selskapene har ingen aktivitet der. Regimet krever ofte at de "
               "ikke driver virksomhet lokalt (F11 lb 6)."),
              ("Kildeskatt", "nullskatt gjelder også når pengene betales videre. Kildeskatt ville gjort stedet "
               "uinteressant som gjennomstrømningsland.")],
             None,
             "Tre av alternativene lar skatteparadiset leve av skatt eller aktivitet. Poenget med stedet er at det "
             "ikke finnes noen av delene."))
EX.append(oppgave(12, "Forretningsmodellen til et skatteparadis", "Skatteparadis", [13], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: Ingolf og fritidsbåten")
W13, L13, p13, DEK13 = 2_560_000, 600_000, 0.10, 0.75
a13_1 = p13 * DEK13 * L13                           # riktig pris for 75 % dekning: 45 000
rettf13 = p13 * L13                                 # riktig pris for full dekning: 60 000
g13_1_egen = p13 * (1 - DEK13) * L13                # forventet tap han bærer selv: 15 000
g13_1_utb = DEK13 * L13                             # utbetalingen ved skade: 450 000
EU0 = (1 - p13) * math.sqrt(W13) + p13 * math.sqrt(W13 - L13)       # 1 580
CE13 = EU0 ** 2                                     # 2 496 400
maks13 = W13 - CE13                                 # 63 600
EUf = math.sqrt(W13 - rettf13)                      # 1 581,14
EW_uten = (1 - p13) * W13 + p13 * (W13 - L13)       # 2 500 000
g13_3_risiko = maks13 - rettf13                     # risikopremien: 3 600
g13_3_bat = L13 - (1 - p13) ** 2 * L13              # nytten regnet av båten alene: 114 000
assert lik(a13_1, 45_000) and lik(rettf13, 60_000) and lik(g13_1_egen, 15_000) and lik(g13_1_utb, 450_000)
assert lik(math.sqrt(W13), 1600) and lik(math.sqrt(W13 - L13), 1400)
assert lik(EU0, 1580) and lik(CE13, 2_496_400) and lik(maks13, 63_600) and lik(EW_uten, W13 - rettf13)
assert EUf > EU0 and lik(g13_3_risiko, 3_600) and lik(g13_3_bat, 114_000)
print(f"   1: {a13_1}: {rettf13}, {g13_1_egen}, {g13_1_utb}; 2: EU uten {EU0}, med {EUf:.3f}, E[W] {EW_uten}; "
      f"3: {maks13}: {rettf13}, {g13_3_risiko}, {g13_3_bat}")
body13 = (f"<p>Ingolf har en formue på kr {kr(W13)}. Av dette er kr {kr(L13)} en fritidsbåt. Med sannsynlighet 10 % blir "
          "båten totalskadd i løpet av året. Da er hele verdien tapt. Resten av formuen er trygg. Ingolf har "
          "nyttefunksjonen U(W) = √W, der W er formuen.</p>")
p1 = ledd("1", "<p>Et selskap tilbyr en forsikring som dekker 75 % av tapet hvis båten blir totalskadd. Forsikringen "
               "selges til riktig pris, altså en premie lik selskapets forventede utbetaling. Hva er premien?</p>",
          K(a13_1),
          [K(rettf13), K(g13_1_egen), K(g13_1_utb)],
          sol("Riktig pris er en premie lik forventet utbetaling fra selskapet: sannsynligheten for skade ganget med det "
              "selskapet betaler ut (manualen 17.1; H2024 oppgave 11a).",
              [f"Utbetaling ved skade: 75 % × {kr(L13)} = {kr(g13_1_utb)}.",
               f"Premie: 10 % × {kr(g13_1_utb)} = <b>kr {kr(a13_1)}</b>."],
              [(f"Kr {kr(rettf13)}", f"forventet tap ved full dekning: 10 % × {kr(L13)}. Selskapet dekker bare 75 %."),
               (f"Kr {kr(g13_1_egen)}", f"forventet tap Ingolf bærer selv: 10 % × {kr((1 - DEK13) * L13)}."),
               (f"Kr {kr(g13_1_utb)}", "utbetalingen ved skade. Sannsynligheten er glemt.")],
              f"Forventet tap i alt er {kr(rettf13)}. Selskapet tar 75 % av det: {kr(a13_1)}. Ingolf bærer 25 %: "
              f"{kr(g13_1_egen)}. {kr(a13_1)} + {kr(g13_1_egen)} = {kr(rettf13)}. ✓"))
p2 = ledd("2", "<p>Selskapet tilbyr i stedet full dekning til riktig pris, altså en premie lik selskapets forventede "
               "utbetaling. Hvilket utsagn om denne forsikringen er riktig?</p>",
          B("Forventet formue er som uten forsikring, mens forventet nytte er høyere"),
          [B("Forventet formue er lavere enn uten forsikring, mens forventet nytte er høyere"),
           B("Forventet formue er som uten forsikring, mens forventet nytte er lavere"),
           B("Forventet formue og forventet nytte er begge som uten forsikring")],
          sol("Til riktig pris betaler du akkurat forventet tap. Forventet formue er derfor lik med og uten "
              "forsikring. Forsikringen fjerner risikoen. En risikoavers person har høyere nytte av en sikker formue "
              "enn av en usikker formue med samme forventning (manualen 17.1–17.2; H2024 oppgave 11a–b). <b>Forventet "
              "formue er som før, mens forventet nytte er høyere.</b>",
              [f"Uten forsikring: forventet formue 0,9 × {kr(W13)} + 0,1 × {kr(W13 - L13)} = {kr(EW_uten)}. Forventet "
               f"nytte 0,9 × {kr(math.sqrt(W13))} + 0,1 × {kr(math.sqrt(W13 - L13))} = {kr(EU0)}.",
               f"Med full dekning til premie {kr(rettf13)}: sikker formue {kr(W13 - rettf13)}. Nytte "
               f"√{kr(W13 - rettf13)} = {kr(EUf, 1)}.",
               f"Formuen er {kr(EW_uten)} i forventning begge veier. Nytten er {kr(EUf, 1)} mot {kr(EU0)}."],
              [("Lavere formue, høyere nytte", "gjelder når premien ligger over riktig pris. Her er premien lik "
                "forventet tap."),
               ("Lik formue, lavere nytte", "snur risikoaversjonen. √W er konkav, så sikkerhet gir høyere nytte."),
               ("Begge like", "gjelder for en risikonøytral person. Ingolf er risikoavers.")],
              None,
              "«Riktig pris» avgjør formuen: den er uendret. «√W» avgjør nytten: den er høyere med forsikring."))
p3 = ledd("3", "<p>Hva er den høyeste premien Ingolf er villig til å betale for full dekning av båten?</p>",
          K(maks13),
          [K(rettf13), K(g13_3_risiko), K(g13_3_bat)],
          sol("Den høyeste premien gjør Ingolf indifferent: nytten av den sikre formuen etter premien er lik forventet "
              "nytte uten forsikring. Da er W − premien lik sikkerhetsekvivalenten (manualen 17.3; H2024 oppgave 11d).",
              [f"Forventet nytte uten forsikring: 0,9 × √{kr(W13)} + 0,1 × √{kr(W13 - L13)} = 0,9 × "
               f"{kr(math.sqrt(W13))} + 0,1 × {kr(math.sqrt(W13 - L13))} = {kr(EU0)}.",
               f"Sikkerhetsekvivalent: {kr(EU0)}² = {kr(CE13)}.",
               f"Høyeste premie: {kr(W13)} − {kr(CE13)} = <b>kr {kr(maks13)}</b>."],
              [(f"Kr {kr(rettf13)}", "premien til riktig pris, altså forventet tap. En risikoavers person betaler mer "
                "enn det."),
               (f"Kr {kr(g13_3_risiko)}", f"risikopremien alene: {kr(maks13)} − {kr(rettf13)}. Den kommer i tillegg til "
                "forventet tap."),
               (f"Kr {kr(g13_3_bat)}", f"nytten er regnet av båten alene: (0,9 × √{kr(L13)})² = 0,81 × {kr(L13)} = "
                f"{kr((1 - p13) ** 2 * L13)}. W er hele formuen.")],
              f"√({kr(W13)} − {kr(maks13)}) = √{kr(CE13)} = {kr(EU0)}. Det er forventet nytte uten forsikring. ✓",
              f"Svaret må ligge over forventet tap, {kr(rettf13)}. Da faller to alternativer før du har regnet."))
EX.append(oppgave(13, "Riktig pris, full dekning og høyeste premie", "Forsikring og forventet nytte", [17],
                  body13, [p1, p2, p3]))

# ======================================================================= 14
print("\nOppgave 14: Magnhild og niesen Kine (Merton)")
mu14, rf14, s14, gam14 = 0.09, 0.03, 0.20, 6
w14 = (mu14 - rf14) / (gam14 * s14 ** 2)            # 30 %
FM14 = 1_600_000
a14 = (1 - w14) * FM14                              # på bankkontoen: 1 400 000
g14a_aksjer = w14 * FM14                            # aksjebeløpet: 600 000
g14a_sigma = (1 - (mu14 - rf14) / (gam14 * s14)) * FM14      # σ i stedet for σ²: 1 880 000
g14a_brutto = (1 - mu14 / (gam14 * s14 ** 2)) * FM14         # hele avkastningen i telleren: 1 100 000
FK14, andel14 = 1_000_000, 0.75
aks14 = andel14 * FK14                              # 750 000
tot14 = aks14 / w14                                 # 2 500 000
b14 = tot14 - FK14                                  # 1 500 000
g14b_diff = (andel14 - w14) * FK14                  # forskjellen i andel ganget med finansformuen: 450 000
assert lik(w14, 0.25) and lik(a14, 1_200_000) and lik(g14a_sigma, 1_520_000) and lik(g14a_brutto, 1_000_000)
assert lik(g14a_aksjer, 400_000) and lik(tot14, 3_000_000)
assert lik(b14, 2_000_000) and lik(w14 * (FK14 + b14), aks14) and lik(g14b_diff, 500_000)
print(f"   w {w14}; a {a14}: {g14a_aksjer}, {g14a_sigma}, {g14a_brutto}; b {b14}: {tot14}, {aks14}, {g14b_diff}")
body14 = ("<p>Et globalt aksjefond har forventet avkastning 9 % og standardavvik 20 %. Risikofri rente er 3 %. Magnhild "
          "og niesen Kine har begge nyttefunksjonen U = c<sup>1−γ</sup>/(1 − γ) med γ = 6. De bruker Mertons formel "
          "for optimal andel av totalformuen i aksjer.</p>")
pa = ledd("a", f"<p>Magnhild er pensjonist og har bare finansiell formue, kr {kr(FM14)}. Hun fordeler den mellom "
               "aksjefondet og en risikofri bankkonto. Hvor mye bør hun ha på bankkontoen?</p>",
          K(a14),
          [K(g14a_aksjer), K(g14a_sigma), K(g14a_brutto)],
          sol("Mertons andel i aksjer er w = (E(r) − r<sub>f</sub>)/(γσ²). Telleren er meravkastningen og nevneren har "
              "variansen. En pensjonist uten humankapital bruker andelen på finansformuen. Resten står i banken "
              "(F12 lb 11–13, manualen 14.4; kursgodkjenningen 2026 spørsmål 12).",
              ["w = (0,09 − 0,03)/(6 × 0,20²) = 0,06/0,24 = 25 %.",
               f"I aksjefondet: 25 % × {kr(FM14)} = {kr(g14a_aksjer)}.",
               f"På bankkontoen: {kr(FM14)} − {kr(g14a_aksjer)} = <b>kr {kr(a14)}</b>."],
              [(f"Kr {kr(g14a_aksjer)}", "beløpet i aksjefondet. Spørsmålet gjelder bankkontoen."),
               (f"Kr {kr(g14a_sigma)}", "standardavviket er brukt i stedet for variansen: 0,06/(6 × 0,20) = 5 % i "
                "aksjer."),
               (f"Kr {kr(g14a_brutto)}", "hele avkastningen står i telleren: 0,09/0,24 = 37,5 % i aksjer.")],
              f"{kr(g14a_aksjer)}/{kr(FM14)} = 25 % og 0,25 × 6 × 0,04 = 0,06, som er meravkastningen. ✓",
              "Regn andelen først. Kontroller så at beløpet du krysser av, er det spørsmålet ber om."))
pb = ledd("b", f"<p>Kine er 32 år og har kr {kr(FK14)} i finansformue. Humankapitalen hennes er risikofri. Etter "
               "Mertons formel bør hun ha 75 % av finansformuen i aksjefondet. Hvor stor er humankapitalen hennes?</p>",
          K(b14),
          [K(tot14), K(aks14), K(g14b_diff)],
          sol("Mertons andel gjelder totalformuen, altså finansformue pluss humankapital. Risikofri humankapital virker "
              "som et bankinnskudd, så hele aksjebeløpet må ligge i finansformuen. Derfor har den unge en høyere andel "
              "av finansformuen i aksjer enn pensjonisten, selv med samme γ (F12 lb 14 og 17, manualen 14.5).",
              [f"Aksjebeløpet hennes: 75 % × {kr(FK14)} = {kr(aks14)}.",
               f"Det skal være 25 % av totalformuen: {kr(aks14)}/0,25 = {kr(tot14)}.",
               f"Humankapital: {kr(tot14)} − {kr(FK14)} = <b>kr {kr(b14)}</b>."],
              [(f"Kr {kr(tot14)}", "totalformuen. Finansformuen er ikke trukket fra."),
               (f"Kr {kr(aks14)}", "aksjebeløpet. Det er 25 % av totalformuen, ikke humankapitalen."),
               (f"Kr {kr(g14b_diff)}", f"forskjellen mellom de to andelene ganget med finansformuen: (75 % − 25 %) × "
                f"{kr(FK14)}.")],
              f"Totalformue {kr(FK14)} + {kr(b14)} = {kr(tot14)}. 25 % av den er {kr(aks14)}, som er 75 % av "
              "finansformuen. ✓ Magnhild har 25 % av finansformuen i aksjer og Kine 75 %, bare fordi Kine har "
              "humankapital igjen."))
EX.append(oppgave(14, "Merton for en pensjonist og niesen hennes", "Porteføljevalg", [14], body14, [pa, pb]))

# ======================================================================= 15
print("\nOppgave 15: Oddrun og opptjeningen i folketrygden")
Y15, TAK15, sats15, DT15 = 1_000_000, 920_000, 0.181, 20
opp15 = min(Y15, TAK15) * sats15                    # 166 520
a15 = opp15 / DT15                                  # 8 326
g15_tak = Y15 * sats15 / DT15                       # taket glemt: 9 050
g15_dt = opp15                                      # ikke delt på delingstallet: 166 520
g15_sats = TAK15 / DT15                             # 18,1 % glemt: 46 000
assert lik(opp15, 166_520) and lik(a15, 8_326) and lik(g15_tak, 9_050) and lik(g15_sats, 46_000)
print(f"   opptjening {opp15}, årlig pensjon {a15}; gale {g15_tak}, {g15_dt}, {g15_sats}")
p = ledd("", f"<p>Oddrun er født i 1980 og tjener kr {kr(Y15)} i 2026. Hvert år legges 18,1 % av inntekten opp til "
             f"7,1 G til pensjonsbeholdningen i folketrygden. Sett 7,1 G til kr {kr(TAK15)}. Oddrun regner med å ta ut "
             f"alderspensjonen med delingstall {DT15}. Hvor mye årlig alderspensjon gir opptjeningen fra 2026 alene? Se "
             "bort fra regulering.</p>",
         K(a15),
         [K(g15_tak), K(g15_dt), K(g15_sats)],
         sol("Pensjonsbeholdningen øker hvert år med 18,1 % av pensjonsgivende inntekt opp til 7,1 G. Årlig pensjon er "
             "beholdningen delt på delingstallet (F13 lb 10 og 14, manualen 15.1 og 15.3).",
             [f"Inntekten er over taket. Opptjeningsgrunnlaget er {kr(TAK15)}.",
              f"Opptjening i 2026: {kr(TAK15)} × 18,1 % = {kr(opp15)}.",
              f"Årlig pensjon: {kr(opp15)}/{DT15} = <b>kr {kr(a15)}</b>."],
             [(f"Kr {kr(g15_tak)}", f"taket er glemt: {kr(Y15)} × 18,1 %/{DT15}. Inntekt over 7,1 G gir ingen "
               "opptjening."),
              (f"Kr {kr(g15_dt)}", "årets opptjening. Den er ikke delt på delingstallet."),
              (f"Kr {kr(g15_sats)}", f"grunnlaget er delt rett på delingstallet: {kr(TAK15)}/{DT15}. Bare 18,1 % går "
               "til beholdningen.")],
             f"{kr(a15)} × {DT15} = {kr(opp15)}. {kr(opp15)}/{kr(TAK15)} = 18,1 %. ✓",
             "Ett års opptjening kan ikke gi mer årlig pensjon enn noen tusen kroner. De to største tallene faller."))
EX.append(oppgave(15, "Pensjonen fra ett års opptjening", "Pensjon", [15], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Nils og Marit (innskudd mot ytelse)")
p = ledd("", "<p>Nils har innskuddspensjon og Marit ytelsespensjon, i hver sin private bedrift. Hvem av dem bærer selv "
             "risikoen for lav avkastning på pensjonsmidlene? Hvem sin pensjon arves av de etterlatte ved dødsfall? "
             "Svar etter forelesningen om pensjon.</p>",
         B("Nils bærer avkastningsrisikoen. Det er også pensjonen til Nils som arves"),
         [B("Nils bærer avkastningsrisikoen. Det er pensjonen til Marit som arves"),
          B("Marit bærer avkastningsrisikoen. Det er også pensjonen til Marit som arves"),
          B("Marit bærer avkastningsrisikoen. Det er pensjonen til Nils som arves")],
         sol("Med innskuddspensjon sparer arbeidsgiveren en andel av lønnen. Den ansatte bestemmer plasseringen og vet "
             "ikke hvordan investeringen utvikler seg, så innskuddspensjon har mer risiko for arbeidstakeren. Med "
             "ytelsespensjon er en andel av lønnen avtalt. Innskuddspensjon arves av de etterlatte ved dødsfall "
             "(F13 lb 24, manualen 15.4). <b>Nils bærer avkastningsrisikoen og pensjonen hans arves.</b>",
             None,
             [("Nils bærer risikoen, Marits arves", "risikoen er riktig plassert, men det er innskuddspensjonen som "
               "arves. Den er oppspart kapital."),
              ("Marit bærer risikoen, Marits arves", "begge deler er byttet om. Marit har en avtalt ytelse."),
              ("Marit bærer risikoen, Nils sin arves", "arven er riktig plassert, men Marits pensjon er avtalt som en "
               "andel av lønnen. Lav avkastning rammer ikke henne.")],
             None,
             "Begge kjennetegnene følger av det samme: innskuddspensjon er en egen beholdning. Den svinger med "
             "avkastningen og kan gå i arv."))
EX.append(oppgave(16, "Innskuddspensjon og ytelsespensjon", "Pensjon", [15], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: Nikolai og kostnadene, og nordmenns fondspenger")
B17, n17, br17, ki17, ka17 = 100_000, 25, 0.06, 0.004, 0.014
FVi = B17 * (1 + br17 - ki17) ** n17                # indeksfondet
FVa = B17 * (1 + br17 - ka17) ** n17                # det aktive fondet
a17 = FVi / FVa - 1                                 # 27 %
g17_lin = (ka17 - ki17) * n17                       # uten rentes rente: 25 %
g17_tapt = 1 - FVa / FVi                            # målt mot indeksfondets sluttverdi: 21 %
g17_aktiv = ka17 * n17                              # bare det aktive fondets kostnad, uten rentes rente: 35 %
assert pst(a17, 0) == "27 %" and pst(g17_lin, 0) == "25 %" and pst(g17_tapt, 0) == "21 %" and pst(g17_aktiv, 0) == "35 %"
assert abs(a17 - 0.27) < 0.003                      # tåler avrunding av mellomtallene
print(f"   indeks {FVi:.0f}, aktivt {FVa:.0f}, forhold {a17:.5f}; gale {g17_lin:.4f}, {g17_tapt:.5f}, {g17_aktiv:.5f}")
body17 = "<p>To spørsmål om indeksfond og aktive fond.</p>"
pa = ledd("a", f"<p>Nikolai setter kr {kr(B17)} i et aksjefond og lar pengene stå i {n17} år. Indeksfondet koster 0,4 % "
               "i året og det aktive fondet 1,4 %. Begge gir 6,0 % i året før kostnader. Kostnadene trekkes fra "
               f"avkastningen hvert år. Hvor mange prosent mer har han etter {n17} år i indeksfondet enn han ville hatt i "
               "det aktive fondet? Svar i hele prosent.</p>",
          P(a17, 0),
          [P(g17_lin, 0), P(g17_tapt, 0), P(g17_aktiv, 0)],
          sol("Kostnaden trekkes fra avkastningen hvert år. Derfor virker den med rentes rente, akkurat som "
              "avkastningen. Aktive fond koster ofte 1 til 2 % i året (F12 lb 73, manualen 14.6).",
              [f"Indeksfondet: 6,0 % − 0,4 % = 5,6 % i året. {kr(B17)} × 1,056<sup>{n17}</sup> = {kr(FVi)}.",
               f"Det aktive fondet: 6,0 % − 1,4 % = 4,6 % i året. {kr(B17)} × 1,046<sup>{n17}</sup> = {kr(FVa)}.",
               f"Forholdet: {kr(FVi)}/{kr(FVa)} = {kr(FVi / FVa, 2)}. Han har <b>{pst(a17, 0)}</b> mer i indeksfondet."],
              [(pst(g17_lin, 0), f"uten rentes rente: {n17} år × 1,0 prosentpoeng."),
               (pst(g17_tapt, 0), f"forskjellen er målt mot sluttverdien i indeksfondet: 1 − {kr(FVa)}/{kr(FVi)}. Det "
                "er hvor mye han taper på det aktive fondet, ikke hvor mye mer indeksfondet gir."),
               (pst(g17_aktiv, 0), f"kostnaden i det aktive fondet alene, uten rentes rente: {n17} år × 1,4 %. "
                "Indeksfondet koster også noe.")],
              f"(1,056/1,046)<sup>{n17}</sup> = {kr((1.056 / 1.046) ** n17, 2)}. ✓ Forskjellen er {kr(FVi - FVa)} kroner "
              f"på et innskudd på {kr(B17)}.",
              "Rentes rente gjør forskjellen større enn 25 × 1,0 = 25 %. Mål mot det han ville hatt i det aktive "
              "fondet, slik spørsmålet sier."))
pb = ledd("b", "<p>Hvilket utsagn om fondssparingen til vanlige folk i Norge er i tråd med forelesningen om finansiell "
               "psykologi?</p>",
          B("Over halvparten av fondspengene står i aktive fond, som koster om lag fem ganger mer enn indeksfond"),
          [B("Over halvparten av fondspengene står i aktive fond, som koster om lag dobbelt så mye som indeksfond"),
           B("Under en firedel av fondspengene står i aktive fond, som koster om lag fem ganger mer enn indeksfond"),
           B("Under en firedel av fondspengene står i aktive fond, som koster om lag dobbelt så mye som indeksfond")],
          sol("Halvparten av nordmenn har aksjefond. Over halvparten av fondspengene til vanlige folk står i aktive "
              "fond, som koster om lag fem ganger mer enn indeksfond. Dagens Næringsliv har beregnet at norske kunder "
              "har betalt 34 milliarder kroner for mye i gebyrer (F16 lb 49, manualen 14.6). <b>Over halvparten står i "
              "aktive fond, som koster om lag fem ganger mer.</b>",
              None,
              [("Over halvparten, dobbelt så mye", "andelen er riktig, men prisforskjellen er for liten. Forelesningen "
                "sier om lag fem ganger."),
               ("Under en firedel, fem ganger", "kostnaden er riktig, men andelen er feil. Det er indeksfondene som har "
                "den lille andelen: 11 til 15 % i fondseksperimentet (F16 lb 52)."),
               ("Under en firedel, dobbelt så mye", "begge deler er feil.")],
              None,
              "Utsagnet har to ledd: andelen og prisen. Er du sikker på ett av dem, står to alternativer igjen. Da "
              "lønner det seg å svare: halv sjanse for 3 poeng mot halv sjanse for −1."))
EX.append(oppgave(17, "Kostnader over 25 år og fondspengene til nordmenn", "Indeksfond og aktiv forvaltning", [14, 18],
                  body17, [pa, pb]))

# ======================================================================= 18
print("\nOppgave 18: Lydia og aksjen i Odda Smelteverk ASA")
p = ledd("", "<p>Lydia vurderer aksjen i Odda Smelteverk ASA. Megleren åpner samtalen med at kursen var kr 400 for et år "
             "siden. Nå er den kr 180. Lydia synes derfor at aksjen er billig og kjøper, uten å se på inntjeningen "
             "eller utsiktene til selskapet. Hvilken skjevhet beskriver best det hun gjør?</p>",
         ("Ankereffekt", []),
         [("Flokkmentalitet", []), ("Mentalt regnskap", []), ("Overkonfidens", [])],
         sol("Ankereffekten er å legge for stor vekt på den første informasjonen man får. Kursen på kr 400 er ankeret. "
             "Lydia måler dagens kurs mot den, ikke mot det selskapet er verdt (F16 lb 16, manualen 18.2). "
             "<b>Ankereffekt.</b>",
             None,
             [("Flokkmentalitet", "å følge det andre gjør. Lydia ser ikke på hva andre investorer gjør."),
              ("Mentalt regnskap", "å behandle penger ulikt etter hvor de kommer fra eller hva de skal brukes til. "
               "Ingen penger er øremerket her."),
              ("Overkonfidens", "å overvurdere egen evne til å forutsi markedet. Lydia støtter seg på ett tall hun "
               "har fått, ikke på egen dyktighet.")],
             None,
             "Spør hva som styrer valget. Her er det ett tall som ble nevnt først. Det er et anker."))
EX.append(oppgave(18, "Lydia og aksjen i Odda Smelteverk ASA", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= 19
print("\nOppgave 19: Morten og aksjeandelen av hele formuen (Kvadsheim)")
BOL19, LAN19, FT19, OTP19, AKSJ19, FOND19 = 5_000_000, 3_000_000, 2_000_000, 600_000, 0.50, 400_000
netto19 = BOL19 - LAN19 + FT19 + OTP19 + FOND19     # 5 000 000
aksjer19 = OTP19 * AKSJ19 + FOND19                  # 700 000
a19 = aksjer19 / netto19                            # 14 %
g19_fin = aksjer19 / (OTP19 + FOND19)               # bare tjenestepensjon og fond i nevneren: 70 %
g19_otp = (OTP19 + FOND19) / netto19                # hele tjenestepensjonen regnet som aksjer: 20 %
g19_brutto = aksjer19 / (BOL19 + FT19 + OTP19 + FOND19)      # boligen uten fradrag for lånet: 8,75 %
assert lik(netto19, 5_000_000) and lik(a19, 0.14) and lik(g19_fin, 0.70) and lik(g19_otp, 0.20)
assert lik(g19_brutto, 0.0875) and pst(g19_brutto, 1) == "8,8 %"
print(f"   netto {netto19}, aksjer {aksjer19}, andel {a19}; gale {g19_fin}, {g19_otp}, {g19_brutto}")
p = ledd("", f"<p>Morten mener han tar høy risiko, fordi all fondssparingen hans står i aksjefond. Han har en bolig "
             f"verdt kr {kr(BOL19)} med kr {kr(LAN19)} i lån, kr {kr(FT19)} i oppspart pensjon i folketrygden, kr "
             f"{kr(OTP19)} i tjenestepensjon med 50 % aksjer og kr {kr(FOND19)} i aksjefond. Regn nettoformuen som "
             "boligen etter lån, folketrygden, tjenestepensjonen og fondene. Hvor stor andel av nettoformuen står i "
             "aksjer? Svar med én desimal.</p>",
         P(a19, 1),
         [P(g19_fin, 1), P(g19_otp, 1), P(g19_brutto, 1)],
         sol("Risikoen skal måles mot hele formuen, ikke mot fondskontoen alene. Kvadsheim setter opp formuen til en "
             "vanlig nordmann slik: bolig etter lån, oppspart pensjon i folketrygden, tjenestepensjon og fri "
             "fondssparing. Da blir aksjeandelen lav. Det var begrunnelsen hans for at mange bør ta høyere risiko "
             "(Kvadsheim lb 20, manualen 14.5).",
             [f"Nettoformue: {kr(BOL19)} − {kr(LAN19)} + {kr(FT19)} + {kr(OTP19)} + {kr(FOND19)} = {kr(netto19)}.",
              f"Aksjer: 50 % × {kr(OTP19)} + {kr(FOND19)} = {kr(aksjer19)}.",
              f"Andel: {kr(aksjer19)}/{kr(netto19)} = <b>{pst(a19, 1)}</b>."],
             [(pst(g19_fin, 1), f"aksjene er målt mot tjenestepensjon og fond alene: {kr(aksjer19)}/"
               f"{kr(OTP19 + FOND19)}. Boligen og folketrygden er også formue."),
              (pst(g19_otp, 1), f"hele tjenestepensjonen er regnet som aksjer: {kr(OTP19 + FOND19)}/{kr(netto19)}. "
               "Bare halvparten er det."),
              (pst(g19_brutto, 1), f"lånet er ikke trukket fra boligen: {kr(aksjer19)}/"
               f"{kr(BOL19 + FT19 + OTP19 + FOND19)}.")],
             f"Resten av nettoformuen, {kr(netto19 - aksjer19)}, er bolig, folketrygd og renter. Det er "
             f"{pst(1 - a19, 1)}. ✓",
             "Fondskontoen er 100 % aksjer, men den er bare en liten del av formuen. Svaret må ligge langt under "
             "halvparten."))
EX.append(oppgave(19, "Morten og aksjeandelen av hele formuen", "Sparing", [14, 16], "", [p]))

# ======================================================================= 20
print("\nOppgave 20: Investorene som ble i Norge")
p = ledd("", "<p>Norge utgjør om lag 0,2 % av verdens aksjemarked. I et eksperiment fra forelesningen fikk investorer "
             "vite at en Norge-tung portefølje gir høyere risiko. De forsto budskapet, men endret ikke porteføljene "
             "sine. Hvilke to tolkninger av dette gir forelesningen om finansiell psykologi?</p>",
         B("En skjevhet som tilgjengelighet eller preferanser som tilhørighet og hjemmekjærlighet"),
         [B("Lavere risiko i norske aksjer eller høyere forventet avkastning for den som kjenner selskapene"),
          B("Høye kostnader i globale fond eller valutarisiko som ikke lar seg sikre"),
          B("Manglende forståelse av risiko eller manglende tillit til den som ga informasjonen")],
         sol("Folk lærer at global spredning er klokt, men velger likevel å bli i Norge. Forelesningen gir to "
             "tolkninger: det kan være en bias (50/50-heuristikk, tilgjengelighet) eller preferanser (tilhørighet, "
             "hjemmekjærlighet, «jeg vil eie det jeg kjenner») (F16 lb 57–58, manualen 18.5). <b>Skjevhet eller "
             "preferanser.</b>",
             None,
             [("Lavere risiko eller høyere avkastning", "begge påstandene er gale etter forelesningen. En Norge-tung "
               "portefølje gir høyere risiko. Småsparere slår ikke markedet på kjennskap (kursgodkjenningen 2026 "
               "spørsmål 18)."),
              ("Kostnader eller valutarisiko", "ingen av delene er forelesningens forklaring. Globale indeksfond er "
               "billige."),
              ("Manglende forståelse eller tillit", "investorene forsto budskapet. De rapporterte selv at Norge er mer "
               "risikabelt.")],
             None,
             "Oppgaven sier at de forsto budskapet. Da faller alternativet om manglende forståelse. To av de andre "
             "sier at det er lurt å bli i Norge, i strid med budskapet."))
EX.append(oppgave(20, "Investorene som ble i Norge", "Finansiell psykologi", [18, 14], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove17",
    "kind": "mock",
    "label": "Prøveeksamen 17",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Tredje trekning av prediksjonen for eksamen 12. november 2026, med vekt på kursgodkjenningen og "
             "2026-forelesningene. Oppgave 1–12 er skattedelen (18 ledd) og oppgave 13–20 finansdelen (12 ledd). "
             "Kjernerutinene har nye vrier: skjerming når aksjen skifter eier i løpet av året, salg av en del av en "
             "aksjepost, overskuddet som trengs for et bestemt beløp etter skatt, ektepar i formuesskatten, utbytte til "
             "formuesskatten når aksjene har skjerming, formuesskatt ved inngangen mot utgangen av året, produsentenes "
             "andel av en stykkskatt, tap etter skatt i Domar–Musgrave, riktig pris for delvis dekning og "
             "humankapitalen som ukjent i Mertons formel."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort 6. november. Noen er forenklet. Da sier teksten fra.",
        "Laget av appen ut fra prediksjonen. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Les hele spørsmålet før du ser på alternativene: hvem det gjelder, hvilket år og hvilken "
                     "størrelse det spørres om. Skriv ned mellomtallene underveis."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove17.json")
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
