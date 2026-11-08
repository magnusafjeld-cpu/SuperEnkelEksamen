"""Prøveeksamen 12 (FIE432): regner alle tall, bygger prove12.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove12_regn.py

Oppskrift: docs/fie432-proveeksamen-spek.md, «Prøveeksamen 12: kursgodkjenningen og
2026-forelesningene». Ligner kursgodkjenningen 2026 (mc2026) og tester stoffet som er nytt
eller vektlagt i 2026-forelesningene: inntektsskiftingslikningen, AERT, skatt og risiko,
utflytting, skatteparadis, Næss-forelesningene og Kvadsheim. Vanskelighetsgrad som H2025.

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p12) sier,
3. skriver prove12.json ved siden av seg selv,
4. sjekker fila: gyldig JSON, fasitplanen, at hvert alternativ inneholder
   tallene skriptet har regnet (og ingen andre), skrivereglene (ingen
   tankestrek, ingen komma foran «og», minustegn «−») og kalibreringen
   for prøveeksamen 10–12 (38–50 ord per ledd, 55–65 % tallsvar, lekkasje).
"""
import json
import math
import os
import re
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p12"]
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
TALL = re.compile(r"−?\d{1,3}(?:[  ]\d{3})*(?:,\d+)?")


def tall_i(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return TALL.findall(s)


def B(tekst):
    """Tekstalternativ: tallene i teksten er de som skal stå der (fakta fra lysbildene)."""
    return (tekst, tall_i(tekst))


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
print("\nOppgave 1: Borghild og aksjen i Vardø Kraft ASA")
K1, D1a, r1a, D1b, r1b, kurs1, S1 = 200.0, 2.0, 0.03, 5.0, 0.025, 240.0, 260.0
skj1a = K1 * r1a
ub1a = max(0.0, skj1a - D1a)
grl1b = K1 + ub1a
skj1b = grl1b * r1b
tilg1b = skj1b + ub1a
ub1b = max(0.0, tilg1b - D1b)
assert lik(ub1a, 4) and lik(grl1b, 204) and lik(skj1b, 5.1) and lik(ub1b, 4.1)
a1 = ub1b
g1a_ikke_grl = ub1a + K1 * r1b - D1b          # framført ikke lagt til grunnlaget
g1a_bare2 = skj1b - D1b                       # bare årets rest i år 2
g1a_utbytte = tilg1b                          # utbyttet ikke trukket fra
gev1 = S1 - K1 - ub1b
b1 = gev1 * TE
g1b_uten_ub = (S1 - K1) * TE                  # ubenyttet skjerming glemt
g1b_uten_oppj = gev1 * 0.22                   # oppjusteringen glemt
g1b_dobbel = (S1 - grl1b - ub1b) * TE         # framført skjerming fra år 1 trukket fra to ganger
assert lik(gev1, 55.9) and kr(b1, 2) == "21,15"
print(f"   a {a1}: {g1a_ikke_grl}, {g1a_bare2}, {g1a_utbytte}; b {b1:.4f}: {g1b_uten_ub:.4f}, {g1b_uten_oppj:.4f}, "
      f"{g1b_dobbel:.4f}")
tab1 = ('<table class="data"><tr><th>År</th><th>Grunnlag</th><th>Skjerming</th><th>Tilgjengelig</th><th>Utbytte</th>'
        '<th>Skattepliktig</th><th>Ubenyttet</th></tr>'
        f'<tr><td>1</td><td class="n">{kr(K1, 2)}</td><td class="n">{kr(skj1a, 2)}</td><td class="n">{kr(skj1a, 2)}</td>'
        f'<td class="n">{kr(D1a, 2)}</td><td class="n">0,00</td><td class="n">{kr(ub1a, 2)}</td></tr>'
        f'<tr><td>2</td><td class="n">{kr(grl1b, 2)}</td><td class="n">{kr(skj1b, 2)}</td><td class="n">{kr(tilg1b, 2)}</td>'
        f'<td class="n">{kr(D1b, 2)}</td><td class="n">0,00</td><td class="n">{kr(ub1b, 2)}</td></tr></table>')
body1 = (f"<p>Borghild kjøpte én aksje i Vardø Kraft ASA for kr {kr(K1)} i desember år 0. I år 1 fikk hun kr {kr(D1a)} i "
         f"utbytte. Skjermingsrenten var 3 %. I år 2 fikk hun kr {kr(D1b)} i utbytte. Skjermingsrenten var 2,5 %. "
         f"Aksjekursen var kr {kr(kurs1)} ved utgangen av år 1.</p>")
pa = ledd("a", "<p>Hvor stor er ubenyttet skjerming på aksjen ved utgangen av år 2? Svar med to desimaler.</p>",
          (f"Kr {kr(a1, 2)}", [kr(a1, 2)]),
          [(f"Kr {kr(g1a_ikke_grl, 2)}", [kr(g1a_ikke_grl, 2)]),
           (f"Kr {kr(g1a_bare2, 2)}", [kr(g1a_bare2, 2)]),
           (f"Kr {kr(g1a_utbytte, 2)}", [kr(g1a_utbytte, 2)])],
          sol("Skjermingen er grunnlaget ganget med årets skjermingsrente. Grunnlaget er kostprisen pluss ubenyttet "
              "skjerming fra tidligere år. Ubenyttet skjerming framføres og trekkes fra senere utbytte (forelesning 5 GS "
              "2026, lysbilde 48–49; manualen 5.3). Kursen er støy: skjermingen regnes av kostprisen.",
              [f"År 1: {kr(K1)} × 3 % = {kr(skj1a, 2)}. Utbyttet er {kr(D1a, 2)}, så {kr(ub1a, 2)} er ubenyttet.",
               f"År 2: grunnlaget er {kr(K1)} + {kr(ub1a)} = {kr(grl1b)}. Skjermingen er {kr(grl1b)} × 2,5 % = "
               f"{kr(skj1b, 2)}. Tilgjengelig: {kr(skj1b, 2)} + {kr(ub1a, 2)} = {kr(tilg1b, 2)}.",
               f"Utbyttet bruker {kr(D1b, 2)}: {kr(tilg1b, 2)} − {kr(D1b, 2)} = <b>kr {kr(a1, 2)}</b>."],
              [(f"Kr {kr(g1a_ikke_grl, 2)}", f"de {kr(ub1a, 2)} fra år 1 er ikke lagt til grunnlaget: "
                f"{kr(ub1a, 2)} + {kr(K1)} × 2,5 % − {kr(D1b, 2)}."),
               (f"Kr {kr(g1a_bare2, 2)}", f"bare årets rest i år 2, {kr(skj1b, 2)} − {kr(D1b, 2)}. Det som ble framført "
                "fra år 1, er glemt."),
               (f"Kr {kr(g1a_utbytte, 2)}", "utbyttet i år 2 er ikke trukket fra den tilgjengelige skjermingen.")],
              f"Hele tabellen:</p>{tab1}<p>Rad 2: {kr(ub1a, 2)} × 1,025 + {kr(K1)} × 2,5 % − {kr(D1b, 2)} = "
              f"{kr(a1, 2)}. ✓"))
pb = ledd("b", f"<p>I år 3 selger hun aksjen for kr {kr(S1)}, før utbyttet det året. Eierskatten er 22 % ganget med 1,72. "
               "Hvor mye skatt betaler hun på gevinsten? Svar med to desimaler.</p>",
          (f"Kr {kr(b1, 2)}", [kr(b1, 2)]),
          [(f"Kr {kr(g1b_uten_ub, 2)}", [kr(g1b_uten_ub, 2)]),
           (f"Kr {kr(g1b_uten_oppj, 2)}", [kr(g1b_uten_oppj, 2)]),
           (f"Kr {kr(g1b_dobbel, 2)}", [kr(g1b_dobbel, 2)])],
          sol("Ubenyttet skjerming trekkes fra gevinsten ved salg. Inngangsverdien er kostprisen, ikke grunnlaget med "
              "framført skjerming. Selger hun før årsskiftet, får hun ingen skjerming for år 3, fordi skjermingen går til den "
              "som eier aksjen 31. desember. Gevinsten oppjusteres med 1,72 og skattlegges med 22 % (forelesning 4 GS 2026, "
              "lysbilde 35; manualen 5.4).",
              [f"Gevinst: {kr(S1)} − {kr(K1)} − {kr(ub1b, 2)} = {kr(gev1, 2)}.",
               f"Oppjustert: {kr(gev1, 2)} × 1,72 = {kr(gev1 * 1.72, 3)}.",
               f"Skatt: {kr(gev1 * 1.72, 3)} × 22 % = <b>kr {kr(b1, 2)}</b>."],
              [(f"Kr {kr(g1b_uten_ub, 2)}", f"den ubenyttede skjermingen fra a er glemt: {kr(S1 - K1)} × 37,84 %."),
               (f"Kr {kr(g1b_uten_oppj, 2)}", f"oppjusteringen er glemt: {kr(gev1, 2)} × 22 %."),
               (f"Kr {kr(g1b_dobbel, 2)}", f"inngangsverdien er satt til {kr(grl1b)}. I tillegg er {kr(ub1b, 2)} trukket "
                f"fra. Da er de {kr(ub1a)} fra år 1 brukt to ganger: ({kr(S1)} − {kr(grl1b)} − {kr(ub1b, 2)}) × 37,84 %.")],
              f"{kr(gev1, 2)} × 37,84 % = {kr(b1, 4)}, som rundes til {kr(b1, 2)}. ✓",
              "Alternativet uten oppjustering er alltid 58 % av det riktige. Ser du paret, er det høyeste av de to som regel "
              "riktig. Da har du strøket ett alternativ."))
EX.append(oppgave(1, "Borghild og aksjen i Vardø Kraft ASA", "Aksjonærmodellen", [5], body1, [pa, pb]))

# ======================================================================= 2
print("\nOppgave 2: Magne og Lyngen Bakeri AS")
O2, ts2, y2, te2 = 750_000, 0.20, 1.5, 0.20
sel2 = O2 * ts2
D2 = O2 - sel2
eier2 = D2 * y2 * te2
a2 = sel2 + eier2
g2_satser = O2 * (ts2 + y2 * te2)                 # satsene lagt sammen på hele overskuddet
g2_uten_oppj = sel2 + D2 * te2                    # oppjusteringen glemt
g2_bare_eier = eier2                              # bare eierskatten
assert lik(a2, 330_000) and lik(g2_satser, 375_000) and lik(g2_uten_oppj, 270_000)
print(f"   {a2}: {g2_satser}, {g2_uten_oppj}, {g2_bare_eier}")
p = ledd("",
         f"<p>Magne driver Lyngen Bakeri AS, som har et skattbart overskudd på kr {kr(O2)}. Anta forenklet at "
         "selskapsskatten er 20 %, oppjusteringsfaktoren 1,5 og den nominelle eierskatten 20 %. Etter at selskapet har "
         "betalt selskapsskatten, tar Magne resten ut som utbytte. Se bort fra skjerming. Hvor mange kroner betales i "
         "selskapsskatt og eierskatt til sammen?</p>",
         (f"Kr {kr(a2)}", [kr(a2)]),
         [(f"Kr {kr(g2_satser)}", [kr(g2_satser)]),
          (f"Kr {kr(g2_uten_oppj)}", [kr(g2_uten_oppj)]),
          (f"Kr {kr(g2_bare_eier)}", [kr(g2_bare_eier)])],
         sol("Eierskatten regnes av utbyttet etter selskapsskatt, ganget med oppjusteringsfaktoren og den nominelle "
             "eierskatten. De to satsene kan derfor ikke legges sammen på hele overskuddet (forelesning 5 GS 2026, "
             "lysbilde 27; kursgodkjenningen 2026 spørsmål 3).",
             [f"Selskapsskatt: {kr(O2)} × 20 % = {kr(sel2)}. Utbytte: {kr(D2)}.",
              f"Eierskatt: {kr(D2)} × 1,5 × 20 % = {kr(eier2)}.",
              f"Samlet: {kr(sel2)} + {kr(eier2)} = <b>kr {kr(a2)}</b>, altså {pst(a2 / O2, 0)} av overskuddet."],
             [(f"Kr {kr(g2_satser)}", f"satsene er lagt sammen på hele overskuddet: {kr(O2)} × (20 % + 30 %)."),
              (f"Kr {kr(g2_uten_oppj)}", f"oppjusteringen er glemt: {kr(sel2)} + {kr(D2)} × 20 %."),
              (f"Kr {kr(g2_bare_eier)}", "bare eierskatten. Spørsmålet gjelder begge skattene.")],
             f"Samme regning som i forelesningen: 20 % + (1 − 20 %) × 30 % = {pst(ts2 + (1 - ts2) * y2 * te2, 0)}. "
             f"{kr(O2)} × 44 % = {kr(a2)}. ✓"))
EX.append(oppgave(2, "Magne og Lyngen Bakeri AS", "Aksjonærmodellen", [5, 8], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: trygdeavgiften økes")
m3_for, ta3_for, ta3_ny, aga3, ts3, tp3 = 0.474, 0.076, 0.098, 0.124, 0.22, 0.22
assert kr(100 * 0.141 / 1.141, 1) == "12,4"        # lysbilde 9: 14,1 % av utbetalt lønn = 12,4 % av lønnskostnaden
m3_ny = m3_for - ta3_for + ta3_ny
y3 = (m3_ny + aga3 - ts3) / tp3
g3_utbytteside = (m3_ny - ts3 - aga3) / tp3       # avgiften lagt på utbyttesiden
g3_glemt = (m3_for + aga3 - ts3) / tp3            # økningen i trygdeavgiften glemt
g3_uten_aga = (m3_ny - ts3) / tp3                 # arbeidsgiveravgiften glemt
assert kr(y3, 2) == "1,82" and kr(100 * y3 * tp3, 1) == "40,0"
assert kr(g3_utbytteside, 2) == "0,69" and kr(100 * g3_utbytteside * tp3, 1) == "15,2"
print(f"   y {y3:.4f}: {g3_utbytteside:.4f}, {g3_glemt:.4f}, {g3_uten_aga:.4f}")


def opp3(y):
    return f"{kr(y, 2)} og {kr(100 * y * tp3, 1)} %"


def tall3(y):
    return [kr(y, 2), kr(100 * y * tp3, 1)]


p = ledd("",
         "<p>Høyeste marginalskatt på lønn er 47,4 %, der trygdeavgiften utgjør 7,6 prosentpoeng. Arbeidsgiveravgiften som "
         "veltes over på arbeidstakeren, utgjør 12,4 % av lønnskostnaden. Selskapsskatten og den nominelle eierskatten er "
         "22 %. Trygdeavgiften økes til 9,8 %. Hva blir oppjusteringsfaktoren og den effektive eierskatten som hindrer "
         "inntektsskifting?</p>",
         (opp3(y3), tall3(y3)),
         [(opp3(g3_utbytteside), tall3(g3_utbytteside)),
          (opp3(g3_glemt), tall3(g3_glemt)),
          (opp3(g3_uten_aga), tall3(g3_uten_aga))],
         sol("Inntektsskiftingslikningen: høyeste marginalskatt på lønn + arbeidsgiveravgiften som veltes over på "
             "arbeidstakeren = nominell selskapsskatt + nominell eierskatt × oppjusteringsfaktoren (forelesning 5 GS 2026, "
             "lysbilde 3–4; kursgodkjenningen 2026 spørsmål 2). Lysbilde 6 viser samme regning når trygdeavgiften øker. "
             "Lysbilde 9 forklarer hvorfor avgiften er 12,4 % og ikke 14,1 %: 14,1 % er av utbetalt lønn, 12,4 % av "
             "hele lønnskostnaden.",
             [f"Ny marginalskatt: 47,4 % − 7,6 % + 9,8 % = {pst(m3_ny, 1)}.",
              f"Likningen: {pst(m3_ny, 1)} + 12,4 % = 22 % + 22 % × y, så y = {kr(100 * (m3_ny + aga3 - ts3), 1)}/22 = "
              f"<b>{kr(y3, 2)}</b>.",
              f"Effektiv eierskatt: 22 % × {kr(y3, 3)} = <b>{kr(100 * y3 * tp3, 1)} %</b>."],
             [(opp3(g3_utbytteside), "avgiften er lagt på utbyttesiden: 49,6 % = 22 % + 22 % × y + 12,4 %. Avgiften er en "
               "skatt på lønn og hører til venstre side."),
              (opp3(g3_glemt), "dagens faktor. Økningen i trygdeavgiften er glemt."),
              (opp3(g3_uten_aga), "arbeidsgiveravgiften er utelatt fra venstre side.")],
             f"Høyre side: 22 % + {kr(100 * y3 * tp3, 1)} % = {kr(22 + 100 * y3 * tp3, 1)} %. Venstre side: {pst(m3_ny, 1)} + "
             f"12,4 % = {pst(m3_ny + aga3, 1)}. ✓",
             "Svaret må gi en eierskatt over dagens 37,8 %, fordi skatten på lønn øker. Da kan 0,69 og 1,25 strykes med en "
             "gang."))
EX.append(oppgave(3, "Stortinget øker trygdeavgiften", "Aksjonærmodellen", [6, 8], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Edvard og det unoterte selskapet")
I4, ts4, MV4, au4, ab4, tw4, te4 = 40.0, 0.15, 400.0, 0.35, 0.80, 0.01, 0.40   # mill. kr


def aert4(andel, sel=ts4, brutto=True):
    fs = MV4 * andel * tw4
    ut = fs / (1 - te4) * te4 if brutto else fs * te4
    return (I4 * sel + fs + ut) / I4


aert_u, aert_b = aert4(au4), aert4(ab4)
a4 = aert_b - aert_u
g4_uten_ut = MV4 * (ab4 - au4) * tw4 / I4                       # utbytteskatten glemt
g4_ikke_brutto = MV4 * (ab4 - au4) * tw4 * (1 + te4) / I4       # utbyttet ikke brutto opp
g4_mv = MV4 * (1 - au4) * tw4 / (1 - te4) / I4                  # børsnotert verdsatt til full markedsverdi
assert lik(a4, 0.075) and lik(aert_u, 0.2083333333) and lik(aert_b, 0.2833333333)
print(f"   AERT unotert {aert_u:.4f}, børsnotert {aert_b:.4f}, differanse {a4:.4f}: {g4_uten_ut:.4f}, "
      f"{g4_ikke_brutto:.4f}, {g4_mv:.4f}")


def pp(x):
    return f"{kr(100 * x, 2)} prosentpoeng"


body4 = ("<p>Edvard eier alle aksjene i et unotert selskap som tjener kr 40 mill. i året før skatt. Selskapet betaler i "
         "praksis 15 % i selskapsskatt. Markedsverdien av aksjene er kr 400 mill. Formuesverdien er 35 % av markedsverdien. "
         "Edvard tar bare ut utbytte for å betale formuesskatten. Anta forenklet at formuesskatten er 1 % og eierskatten "
         "40 %. Se bort fra skjerming og bunnfradrag.</p>")
pa = ledd("a", "<p>Hvor mange prosentpoeng høyere hadde Edvards effektive gjennomsnittlige skattesats (AERT) vært om "
               "selskapet var børsnotert med samme markedsverdi og formuesverdi 80 % av markedsverdien?</p>",
          (pp(a4), [kr(100 * a4, 2)]),
          [(pp(g4_uten_ut), [kr(100 * g4_uten_ut, 2)]),
           (pp(g4_ikke_brutto), [kr(100 * g4_ikke_brutto, 2)]),
           (pp(g4_mv), [kr(100 * g4_mv, 2)])],
          sol("AERT er samlet betalt skatt delt på brutto økonomisk inntekt: selskapsskatten, formuesskatten og "
              "utbytteskatten på utbyttet som betaler formuesskatten (forelesning 5 GS 2026, lysbilde 35–40). Utbyttet må "
              "dekke både formuesskatten og eierskatten på seg selv: D = formuesskatt/(1 − 40 %). Selskapsskatten er lik i "
              "begge tilfeller og faller bort i differansen. Den er støy her.",
              [f"Formuesverdien øker med (80 % − 35 %) × {kr(MV4)} mill. = {kr(MV4 * (ab4 - au4))} mill. Formuesskatten øker "
               f"med {kr(MV4 * (ab4 - au4) * tw4, 1)} mill.",
               f"Utbyttet som trengs, øker med {kr(MV4 * (ab4 - au4) * tw4, 1)}/0,6 = {kr(MV4 * (ab4 - au4) * tw4 / 0.6, 1)} "
               "mill. Det er formuesskatt pluss eierskatt.",
               f"Differansen i AERT: {kr(MV4 * (ab4 - au4) * tw4 / 0.6, 1)}/{kr(I4)} = <b>{pp(a4)}</b>."],
              [(pp(g4_uten_ut), "bare formuesskatten. Eierskatten på utbyttet som betaler den, er glemt."),
               (pp(g4_ikke_brutto), "eierskatten er regnet som 40 % av formuesskatten, ikke av utbyttet som trengs: "
                f"{kr(MV4 * (ab4 - au4) * tw4, 1)} × 1,4."),
               (pp(g4_mv), "den børsnoterte aksjen er verdsatt til full markedsverdi uten aksjerabatten på 20 %.")],
              f"Regn begge nivåene. Unotert: (6 + 1,4/0,6)/40 = {pst(aert_u, 2)}. Børsnotert: (6 + 3,2/0,6)/40 = "
              f"{pst(aert_b, 2)}. Differansen er {pp(a4)}. ✓ Forelesningen finner på samme måte 24,7 % mot 18,1 % "
              "(lysbilde 38–39)."))
pb = ledd("b", "<p>Hvilket utsagn om effektive og marginale skattesatser for eiere er i tråd med forelesningen?</p>",
          B("Den formelle marginalsatsen på 51,5 % er en øvre grense, fordi den forutsetter at alt overskudd deles ut "
            "straks"),
          [B("For en eier er AERT betalt personskatt delt på brutto personinntekt, akkurat som for en lønnstaker"),
           B("Selskapsskatt som er fastsatt, men ennå ikke betalt, skal tas med i telleren når AERT for en eier regnes ut"),
           B("AERT er normalt høyere enn den lovbestemte satsen på 22 %, fordi avskrivninger øker skattegrunnlaget")],
          "<p><b>Regelen.</b> En krone i overskudd som deles ut straks, gir 0,22 + 0,78 × 0,3784 = 51,5 % i samlet skatt. "
          "Tallet forutsetter at alt deles ut med én gang, ser bort fra skjermingen og bruker nominelle satser. Det er "
          "derfor «en øvre grense, ikke det en typisk eier faktisk betaler» (forelesning 5 GS 2026, lysbilde 27–28). "
          "<b>Utsagnet om øvre grense er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bare personskatt</b> = for en eier legges eierandelen α av "
          "selskapets betalte skatt og brutto inntekt inn i både teller og nevner (lysbilde 22–23).<br>"
          "<b>Skatt som ikke er betalt</b> = skattefordringer som ikke er betalt, skal ikke tas med (lysbilde 16).<br>"
          "<b>Høyere enn 22 %</b> = AERT er vanligvis lavere enn den lovbestemte satsen. Avskrivninger senker "
          "skattegrunnlaget: 14,6 % og 19,8 % i forelesningens printereksempel (lysbilde 16–17).</p>")
EX.append(oppgave(4, "Edvard og det unoterte selskapet", "Effektiv skattesats", [8], body4, [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: Trude og formuen")
bolig5, aksjer5, bank5, G5, B5, tw5 = 10_000_000, 6_000_000, 4_000_000, 8_000_000, 1_900_000, 0.01
fv5 = bolig5 * 0.25 + aksjer5 * 0.80 + bank5
sum5 = bolig5 + aksjer5 + bank5
gj_aksjer5 = G5 * aksjer5 / sum5
red5 = gj_aksjer5 * 0.20
fr5 = G5 - red5
net5 = fv5 - fr5
a5 = (net5 - B5) * tw5
g5_uten_red = (fv5 - G5 * 0.8 - B5) * tw5                   # hele gjelden avkortet med aksjerabatten
g5_alle = (fv5 - G5 * fv5 / sum5 - B5) * tw5                # gjelden avkortet også for boligen
g5_uten_bf = net5 * tw5                                     # bunnfradraget glemt
assert lik(fv5, 11_300_000) and lik(fr5, 7_520_000) and lik(a5, 18_800) and lik(g5_alle, 48_800)
print(f"   formuesverdi {fv5}, fradrag {fr5}, netto {net5}, skatt {a5}: {g5_uten_red}, {g5_alle}, {g5_uten_bf}")
p = ledd("",
         f"<p>Trude er enslig. Ved utgangen av 2026 eier hun en primærbolig verdt kr {kr(bolig5)}, børsnoterte aksjer for "
         f"kr {kr(aksjer5)} og kr {kr(bank5)} i banken. Gjelden er kr {kr(G5)}. Boligen verdsettes til 25 %, aksjene til "
         "80 % og banken til 100 %. Gjelden fordeles forholdsmessig med 2026-reglene for gjeldsreduksjon. Formuesskatten er 1,0 % over "
         f"bunnfradraget på kr {kr(B5)}. Hvor mye formuesskatt betaler Trude?</p>",
         (f"Kr {kr(a5)}", [kr(a5)]),
         [(f"Kr {kr(g5_uten_red)}", [kr(g5_uten_red)]),
          (f"Kr {kr(g5_alle)}", [kr(g5_alle)]),
          (f"Kr {kr(g5_uten_bf)}", [kr(g5_uten_bf)])],
         sol("Gjelden fordeles etter bruttoverdiene. Bare gjelden som faller på aksjer, avkortes med aksjerabatten på 20 %. "
             "Gjeld på primærbolig og bankinnskudd avkortes ikke (forelesning 8 GS 2026; manualen 7.4).",
             [f"Formuesverdi: {kr(bolig5)} × 25 % + {kr(aksjer5)} × 80 % + {kr(bank5)} = {kr(fv5)}.",
              f"Gjeld på aksjene: {kr(G5)} × {kr(aksjer5)}/{kr(sum5)} = {kr(gj_aksjer5)}. Reduksjon 20 %: {kr(red5)}. "
              f"Fradragsberettiget gjeld: {kr(fr5)}.",
              f"Nettoformue {kr(fv5)} − {kr(fr5)} = {kr(net5)}. Skatt: ({kr(net5)} − {kr(B5)}) × 1,0 % = "
              f"<b>kr {kr(a5)}</b>."],
             [(f"Kr {kr(g5_uten_red)}", f"hele gjelden er avkortet med aksjerabatten: fradraget blir {kr(G5 * 0.8)}. Bare gjelden "
               "som faller på aksjene, skal avkortes."),
              (f"Kr {kr(g5_alle)}", f"gjelden er avkortet for alle rabatter, også boligens: fradraget blir "
               f"{kr(G5 * fv5 / sum5)}. Primærbolig utløser ikke gjeldsreduksjon."),
              (f"Kr {kr(g5_uten_bf)}", "bunnfradraget er glemt.")],
             f"Gjeldsreduksjonen kan aldri bli større enn 20 % av gjelden på aksjene, {kr(red5)}. Med den er skatten "
             f"({kr(fv5 - G5 + red5)} − {kr(B5)}) × 1 % = {kr(a5)}. ✓"))
EX.append(oppgave(5, "Trude og formuen", "Formuesskatt", [7], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: en avgift på kr 10 per enhet")
a6d, b6d, c6s, d6s, t6 = 1200.0, 30.0, -300.0, 20.0, 10.0
P6_0 = (a6d - c6s) / (b6d + d6s)
P6 = (a6d - c6s + d6s * t6) / (b6d + d6s)
andel6 = (P6 - P6_0) / t6
assert lik(P6_0, 30) and lik(P6, 34) and lik(andel6, 0.4)
x6 = a6d - b6d * P6
assert lik(x6, c6s + d6s * (P6 - t6))
g6a_full = P6_0 + t6                               # full overvelting
g6a_bytte = P6_0 + (1 - andel6) * t6               # andelene byttet om
g6a_fortegn = P6_0 - andel6 * t6                   # fortegnsfeil
print(f"   P0 {P6_0}, P {P6}, andel {andel6}: {g6a_full}, {g6a_bytte}, {g6a_fortegn}")
body6 = ("<p>Etterspørselen etter en vare er x = 1 200 − 30P, der P er prisen konsumentene betaler. Tilbudet er "
         "x = 20p − 300, der p er prisen produsentene sitter igjen med. Myndighetene innfører en stykkskatt på kr 10 per "
         "enhet som produsentene betaler inn til staten.</p>")
pa = ledd("a", "<p>Hva blir prisen konsumentene betaler etter at skatten er innført?</p>",
          (f"Kr {kr(P6)}", [kr(P6)]),
          [(f"Kr {kr(g6a_full)}", [kr(g6a_full)]),
           (f"Kr {kr(g6a_bytte)}", [kr(g6a_bytte)]),
           (f"Kr {kr(g6a_fortegn)}", [kr(g6a_fortegn)])],
          sol("Med stykkskatt er P = p + t. Likevekten er D(P) = S(P − t). Hvem som betaler skatten inn, avgjør ikke hvem "
              "som bærer den (forelesning 9 GS 2026; manualen 11.2–11.3).",
              [f"Uten skatt: 1 200 − 30P = 20P − 300, så P = 1 500/50 = {kr(P6_0)}.",
               "Med skatt: 1 200 − 30P = 20(P − 10) − 300 = 20P − 500.",
               f"50P = 1 700, så P = <b>kr {kr(P6)}</b>. Produsentene får {kr(P6 - t6)}."],
              [(f"Kr {kr(g6a_full)}", "hele skatten er lagt på prisen, som om etterspørselen var fullstendig uelastisk."),
               (f"Kr {kr(g6a_bytte)}", "andelene er byttet: konsumentene har fått produsentenes andel på 60 %."),
               (f"Kr {kr(g6a_fortegn)}", "fortegnsfeil. Prisen konsumentene betaler, kan ikke falle når skatten øker.")],
              f"Kvantum: 1 200 − 30 × {kr(P6)} = {kr(x6)} og 20 × {kr(P6 - t6)} − 300 = {kr(x6)}. ✓"))
pb = ledd("b", "<p>Hvor stor andel av skatten bærer konsumentene?</p>",
          (pst(andel6, 0), [kr(100 * andel6)]),
          [(pst(1 - andel6, 0), [kr(100 * (1 - andel6))]),
           ("50 %", ["50"]),
           ("100 %", ["100"])],
          sol("Konsumentenes andel er prisøkningen delt på skatten, eller S′/(S′ − D′) med helningene i kvantum "
              "(manualen 11.3).",
              [f"Prisøkning: {kr(P6)} − {kr(P6_0)} = {kr(P6 - P6_0)}.",
               f"Andel: {kr(P6 - P6_0)}/{kr(t6)} = <b>{pst(andel6, 0)}</b>."],
              [("60 %", "produsentenes andel."),
               ("50 %", "skatten er antatt delt likt, som om kurvene var like bratte."),
               ("100 %", "full overvelting. Det krever fullstendig uelastisk etterspørsel.")],
              f"Formelen: 20/(20 + 30) = {pst(d6s / (d6s + b6d), 0)}. ✓ Den bratteste siden av markedet bærer mest. Her er "
              "etterspørselen mest prisfølsom, så produsentene bærer mest."))
EX.append(oppgave(6, "En avgift på kr 10 per enhet", "Skatteincidens", [11], body6, [pa, pb]))

# ======================================================================= 7
print("\nOppgave 7: Leiv, Hardanger Glass og Eivind")
A7, x7, t7_for, t7_ny = 1_500_000, 450_000, 0.20, 0.40
b7 = x7 * (1 - t7_for) / (1 - t7_ny)
g7_uendret = x7
g7_snudd = x7 * (1 - t7_ny) / (1 - t7_for)
g7_bare_ny = x7 / (1 - t7_ny)
assert lik(b7, 600_000) and lik(g7_snudd, 337_500) and lik(g7_bare_ny, 750_000)
print(f"   {b7}: {g7_uendret}, {g7_snudd}, {g7_bare_ny}")
body7 = "<p>To spørsmål om skatt og risikotaking.</p>"
pa = ledd("a", "<p>Leiv starter et nytt selskap uten andre inntekter. Et tap kan bare føres mot usikker framtidig inntekt. "
               "Hardanger Glass AS har store overskudd fra andre prosjekter. Begge vurderer det samme risikable prosjektet "
               "og møter samme skattesats. Hvilket utsagn er riktig?</p>",
          B("Skatten gjør prosjektet mindre attraktivt for Leiv enn for Hardanger Glass, fordi tapsfradraget er verdt "
            "mindre for ham"),
          [B("Skatten påvirker de to likt, fordi de møter samme skattesats på en eventuell gevinst og samme regler for tap"),
           B("Leiv tar mer risiko enn uten skatt, fordi staten tar en del av gevinsten og dermed av risikoen"),
           B("Hardanger Glass tar mindre risiko enn uten skatt, fordi tapsfradraget gjør tap dyrere for selskapet")],
          "<p><b>Regelen.</b> Skatten påvirker ikke investeringsvalget når staten er med på både opp- og nedsiden. En "
          "oppstartsbedrift har ofte ikke fradragsmuligheter for tap mot framtidig inntekt som er usikker. Eksisterende "
          "virksomheter kan føre tapet mot gevinst på andre prosjekter (forelesning 10 GS 2026, lysbilde 2–4; manualen "
          "12.3). For Leiv er tapsfradraget bare delvis. Forventet avkastning etter skatt faller mest for det risikable "
          "prosjektet. <b>Utsagnet om Leiv er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Likt</b> = samme sats, men ulik verdi av tapsfradraget.<br>"
          "<b>Leiv tar mer risiko</b> = staten deler oppsiden med ham, men ikke nedsiden. Det trekker mot mindre "
          "risiko.<br><b>Hardanger Glass tar mindre risiko</b> = med fullt tapsfradrag er staten en «silent partner». "
          "Skatten er nøytral for risikotakingen.</p>"
          "<p><b>Kontroll.</b> Forelesningens tall: 100 000 investert, skatt 40 %. Prosjekt B gir +150 000 eller −100 000. "
          "Med fullt fradrag er E(B) = 15 000 mot 12 000 for det sikre prosjektet. Uten fradrag blir E(B) = −5 000.</p>")
pb = ledd("b", f"<p>Eivind har kr {kr(A7)}: kr {kr(x7)} i et aksjefond og resten på en konto med null avkastning. "
               "Avkastningen skattlegges med 20 %, med fullt fradrag for tap. Eivind er optimalt tilpasset. Skatten økes "
               "til 40 %. Hvor mye har han i fondet etter at han har tilpasset seg?</p>",
          (f"Kr {kr(b7)}", [kr(b7)]),
          [(f"Kr {kr(g7_uendret)}", [kr(g7_uendret)]),
           (f"Kr {kr(g7_snudd)}", [kr(g7_snudd)]),
           (f"Kr {kr(g7_bare_ny)}", [kr(g7_bare_ny)])],
          sol("Domar–Musgrave: med fullt tapsfradrag og null avkastning på det sikre alternativet krymper skatten hvert "
              "utfall med (1 − t). Investoren gjenoppretter samme sannsynlighetsfordeling for sluttformuen ved å øke "
              "posisjonen, uansett nyttefunksjon. Posisjonen etter skatt, (1 − t) × beløpet, holdes konstant (forelesning "
              "10 GS 2026, lysbilde 6–12; manualen 12.2).",
              [f"Posisjonen etter skatt før endringen: {kr(x7)} × (1 − 20 %) = {kr(x7 * 0.8)}.",
               f"Samme posisjon med 40 % skatt: {kr(x7 * 0.8)}/(1 − 40 %) = <b>kr {kr(b7)}</b>."],
              [(f"Kr {kr(g7_uendret)}", "uendret. Da blir både gevinst og tap etter skatt mindre enn før. Fordelingen er "
                "endret."),
               (f"Kr {kr(g7_snudd)}", "brøken er snudd. Han tar mindre risiko, slik intuisjonen sier, men det er feil når "
                "staten deler tapet."),
               (f"Kr {kr(g7_bare_ny)}", f"{kr(x7)}/(1 − 40 %). Det overser at han allerede betalte 20 % før endringen.")],
              f"Et utfall på +10 % gir før endringen {kr(x7)} × 10 % × 0,8 = {kr(x7 * 0.08)}. Etterpå {kr(b7)} × 10 % × "
              f"0,6 = {kr(b7 * 0.06)}. Samme utfall. ✓ Han har {kr(A7 - b7)} igjen på kontoen, så posisjonen lar seg "
              "finansiere uten lån."))
EX.append(oppgave(7, "Leiv, Hardanger Glass og Eivind", "Skatt og risiko", [12], body7, [pa, pb]))

# ======================================================================= 8
print("\nOppgave 8: Gjøvik Trevare AS")
t8, beta8, c8 = 0.22, 0.6, 78.0
a8 = c8 * (1 - t8 * beta8) / (1 - t8)
g8_noytral = c8                                     # som om β = 1
g8_snudd = c8 * (1 - t8) / (1 - t8 * beta8)         # kilen snudd
g8_null = c8 * (1 - t8 * beta8)                     # nevneren (1 − t) glemt
assert lik(a8, 86.8) and lik(g8_null, 67.704)
print(f"   {a8}: {g8_noytral}, {g8_snudd:.4f}, {g8_null}")
p = ledd("",
         "<p>Gjøvik Trevare AS selger x enheter til prisen p og har kostnaden c(x). Skattegrunnlaget er px − βc(x), der β "
         "er andelen av kostnaden som kommer til fradrag, målt i nåverdi. Selskapsskatten er 22 % og β = 0,6. "
         f"Marginalkostnaden er kr {kr(c8)}. Hvilken pris må bedriften minst ha for at den siste enheten skal "
         "lønne seg? Svar med to desimaler.</p>",
         (f"Kr {kr(a8, 2)}", [kr(a8, 2)]),
         [(f"Kr {kr(g8_noytral, 2)}", [kr(g8_noytral, 2)]),
          (f"Kr {kr(g8_snudd, 2)}", [kr(g8_snudd, 2)]),
          (f"Kr {kr(g8_null, 2)}", [kr(g8_null, 2)])],
         sol("Overskudd etter skatt er π = px − c(x) − t[px − βc(x)]. Førsteordensbetingelsen gir p(1 − t) = c′(x)(1 − tβ), "
             "altså p = c′(x)(1 − tβ)/(1 − t). Skatten er nøytral bare når β = 1. Med β < 1 er kilen større enn 1. "
             "Bedriften produserer for lite (forelesning 5 GS 2026, lysbilde 18–20).",
             [f"Kilen: (1 − 0,22 × 0,6)/(1 − 0,22) = {kr(1 - t8 * beta8, 3)}/0,78 = {kr((1 - t8 * beta8) / (1 - t8), 4)}.",
              f"Prisen: {kr(c8)} × {kr((1 - t8 * beta8) / (1 - t8), 4)} = <b>kr {kr(a8, 2)}</b>."],
             [(f"Kr {kr(g8_noytral, 2)}", "prisen uten skatt. Det gjelder bare med full utgiftsføring, β = 1."),
              (f"Kr {kr(g8_snudd, 2)}", "kilen er snudd. Da ser det ut som om skatten subsidierer produksjonen."),
              (f"Kr {kr(g8_null, 2)}", "nevneren er glemt: 78 × (1 − 0,132). Skatten på inntekten må også dekkes.")],
             f"Etter skatt: {kr(a8, 2)} × 0,78 = {kr(a8 * 0.78, 3)} i inntekt og {kr(c8)} × (1 − 0,132) = "
             f"{kr(c8 * (1 - t8 * beta8), 3)} i kostnad. Like store. ✓",
             "Riktig svar må ligge mellom kr 78 (β = 1) og kr 100 (β = 0). To alternativer kan strykes med en gang."))
EX.append(oppgave(8, "Gjøvik Trevare AS", "Bedriftens tilpasning", [9], "", [p]))

# ======================================================================= 9
print("\nOppgave 9: Signe, tomannsboligen og Selje Holding AS")
body9 = ("<p>Signe eier en tomannsbolig. Hun bor selv i den største og dyreste boenheten og leier ut den andre på "
         "langtidskontrakt. Hun eier også alle aksjene i Selje Holding AS.</p>")
pa = ledd("a", "<p>Utleiedelen har lavere utleieverdi enn delen Signe bruker selv. I år har hun hatt kr 40 000 i "
               "kostnader til vedlikehold av utleiedelen. Hvilket utsagn er riktig?</p>",
          B("Leien er skattefri, men hun får heller ikke fradrag for vedlikeholdet"),
          [B("Leien er skattefri, men vedlikeholdet kan hun likevel trekke fra i alminnelig inntekt"),
           B("Leien skattlegges med 22 %, fordi hun leier ut en hel boenhet med egen inngang"),
           B("Leien er skattefri bare så lenge den er under kr 10 000 i året")],
          "<p><b>Regelen.</b> Leieinntekten er skattefri når du selv bruker minst halvparten av boligen, målt etter "
          "utleieverdi og ikke areal. «Er leieinntekten skattefri, trenger du ikke rapportere den til Skatteetaten, men du "
          "får da heller ikke fradrag for kostnader knyttet til utleien» (forelesning 3 GS 2026, lysbilde 15; manualen 4.4). "
          "<b>Utsagnet om skattefri leie uten fradrag er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Fradrag likevel</b> = skattefri inntekt gir ikke fradrag for "
          "kostnadene.<br><b>22 % for en hel boenhet</b> = egen inngang er ikke et vilkår. Målestokken er utleieverdien.<br>"
          "<b>Under kr 10 000</b> = beløpsgrensen hører til korttidsutleie av egen bolig, ikke til langtidsutleie.</p>")
pb = ledd("b", "<p>Selje Holding AS eier 60 % av aksjene i Fjordlys AS. Holdingselskapet selger aksjene med en gevinst "
               "på kr 4 mill. Begge er norske aksjeselskaper. Hvilket utsagn er riktig?</p>",
          B("Gevinsten er skattefri for Selje Holding, men et tap ville ikke gitt fradrag"),
          [B("Selje Holding betaler 22 % skatt av 3 % av gevinsten, altså 0,66 %"),
           B("Gevinsten skattlegges med 22 %, fordi fritaksmetoden bare gjelder utbytte"),
           B("Gevinsten er skattefri for selskapet, men Signe skattlegges for den med 37,84 % samme år")],
          "<p><b>Regelen.</b> Etter fritaksmetoden er aksjeinntekter, utbytte og gevinster i hovedsak skattefrie for "
          "aksjeselskaper, for å unngå kjedebeskatning. Et holdingselskap kan selge aksjer uten at det påløper gevinstskatt "
          "(forelesning 4 GS 2026, lysbilde 22–24). Motstykket er at tap ikke er fradragsberettiget. Treprosentregelen "
          "gjelder bare utbytte, ikke gevinst (manualen 6.1–6.2). <b>Utsagnet om skattefri gevinst uten tapsfradrag er "
          "riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>3 % av gevinsten</b> = treprosentregelen brukt på en gevinst. Den "
          "gjelder bare utbytte fra selskaper eid 90 % eller mindre.<br><b>22 % på gevinsten</b> = fritaksmetoden gjelder "
          "både utbytte og gevinst.<br><b>Signe skattlegges samme år</b> = eierskatten kommer først når hun tar pengene ut "
          "av holdingselskapet som utbytte.</p>")
EX.append(oppgave(9, "Signe, tomannsboligen og Selje Holding AS", "Investeringscaser", [4, 6], body9, [pa, pb]))

# ======================================================================= 10
print("\nOppgave 10: Vemund flytter til Portugal")
gev10, bf10, D10, kilde10, avdr10 = 9_000_000, 3_000_000, 800_000, 0.15, 0.70
krav10 = (gev10 - bf10) * TE
b10 = D10 * (1 - kilde10 - avdr10)
g10_uten_kilde = D10 * (1 - avdr10)               # kildeskatten glemt
g10_etter_kilde = D10 * (1 - kilde10) * (1 - avdr10)  # avdraget regnet av utbyttet etter kildeskatt
g10_uten_avdr = D10 * (1 - kilde10)               # avdraget glemt
assert lik(krav10, 2_270_400) and krav10 > D10 * avdr10 and lik(b10, 120_000) and lik(g10_etter_kilde, 204_000)
print(f"   krav {krav10}, igjen {b10}: {g10_uten_kilde}, {g10_etter_kilde}, {g10_uten_avdr}")
body10 = ("<p>Vemund har bodd i Norge hele livet. I mars 2026 flytter han til Portugal og tar fast opphold der. Han eier "
          "alle aksjene i Vemund Invest AS.</p>")
pa = ledd("a", "<p>Fra 2027 er Vemund i Norge høyst 30 dager i året. Han beholder leiligheten i Trondheim og bor i den når "
               "han er på besøk. Hva er riktig om bostedet hans etter norsk intern rett?</p>",
          B("Han er fortsatt skattemessig bosatt i Norge så lenge han disponerer leiligheten"),
          [B("Han er utflyttet fra 1. januar 2030, fordi han er under 61 dager i Norge i 2027, 2028 og 2029"),
           B("Han er utflyttet fra 1. januar 2027, fordi han har tatt fast opphold i Portugal"),
           B("Han er utflyttet fra 1. januar 2029, tre år etter utflyttingsåret")],
          "<p><b>Regelen.</b> Tre vilkår må være oppfylt samtidig: fast opphold i utlandet, høyst 61 dager i Norge per år i "
          "tre år. I tillegg kan verken du eller dine nærstående disponere bolig i Norge. «Beholder du bolig i Norge, er du ikke "
          "skattemessig emigrert.» Med minst ti års botid kan du tidligst være utflyttet etter utløpet av det tredje "
          "inntektsåret etter utflyttingen (forelesning 7 GS 2026, lysbilde 4–6). <b>Han er fortsatt bosatt.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>1. januar 2030</b> = tidspunktet stemmer for en som oppfyller alle "
          "vilkårene, men boligvilkåret er brutt.<br><b>1. januar 2027</b> = gjelder bare med kortere botid enn ti år. "
          "Også da må boligvilkåret være oppfylt.<br><b>1. januar 2029</b> = utflyttingsåret er talt med som ett av de tre "
          "årene.</p>")
pb = ledd("b", f"<p>Anta nå at Vemund har solgt leiligheten og er bosatt i Portugal etter skatteavtalen. Gevinsten på "
               f"aksjene var kr {kr(gev10)} da han flyttet. Exit-skatten er utsatt. To år senere får han kr {kr(D10)} i "
               "utbytte. Når selskapet deler ut utbytte etter utflyttingen, forfaller et avdrag på den utsatte exit-skatten "
               "lik 70 % av utdelingen. Norge trekker 15 % kildeskatt uten kreditfradrag i Portugal. Eierskatten er 37,84 % og "
               "bunnfradraget kr 3 mill. Se bort fra årlige rater. Hvor mye sitter han igjen med av utbyttet?</p>",
          (f"Kr {kr(b10)}", [kr(b10)]),
          [(f"Kr {kr(g10_uten_kilde)}", [kr(g10_uten_kilde)]),
           (f"Kr {kr(g10_etter_kilde)}", [kr(g10_etter_kilde)]),
           (f"Kr {kr(g10_uten_avdr)}", [kr(g10_uten_avdr)])],
          sol("Når selskapet deler ut utbytte etter utflyttingen, forfaller et avdrag på den utsatte exit-skatten lik 70 % "
              "av utdelingen. Kildeskatten på 15 % kommer i tillegg (forelesning 7 GS 2026, lysbilde 12–13; skatteloven "
              "§ 10-70 åttende ledd, manualen 6.6).",
              [f"Exit-skatten: ({kr(gev10)} − {kr(bf10)}) × 37,84 % = {kr(krav10)}. Den er større enn avdraget, så hele "
               "avdraget forfaller.",
               f"Kildeskatt: {kr(D10)} × 15 % = {kr(D10 * kilde10)}. Avdrag: {kr(D10)} × 70 % = {kr(D10 * avdr10)}.",
               f"Igjen: {kr(D10)} − {kr(D10 * kilde10)} − {kr(D10 * avdr10)} = <b>kr {kr(b10)}</b>."],
              [(f"Kr {kr(g10_uten_kilde)}", "kildeskatten er glemt."),
               (f"Kr {kr(g10_etter_kilde)}", f"avdraget er regnet av utbyttet etter kildeskatt: ({kr(D10)} − "
                f"{kr(D10 * kilde10)}) × 70 % = {kr(D10 * (1 - kilde10) * avdr10)}, så det blir {kr(g10_etter_kilde)} igjen. "
                "Avdraget er 70 % av hele utdelingen."),
               (f"Kr {kr(g10_uten_avdr)}", "avdraget på exit-skatten er glemt.")],
              f"Han beholder 100 % − 15 % − 70 % = 15 % av utbyttet: {kr(D10)} × 15 % = {kr(b10)}. ✓ Kravet faller fra "
              f"{kr(krav10)} til {kr(krav10 - D10 * avdr10)}. Gevinsten og bunnfradraget trengs bare for å se at kravet er "
              "større enn avdraget. Skattekommisjonen foreslår å senke avdraget til 37,84 % (lysbilde 14–15)."))
EX.append(oppgave(10, "Vemund flytter til Portugal", "Exit-skatt", [6, 13], body10, [pa, pb]))

# ======================================================================= 11
print("\nOppgave 11: skjult formue i skatteparadis")
p = ledd("",
         "<p>Alstadsæter, Johannesen og Zucman har studert skjult formue i skatteparadis med data fra Norge, Sverige og "
         "Danmark. Norge har også en ordning med frivillig retting og mottar kontoopplysninger gjennom CRS. "
         "Hvilket utsagn er i tråd med forelesningen om skatteparadiser?</p>",
         B("De 0,01 % rikeste unndrar om lag 25–30 % av skatten sin, mot om lag 3 % i snitt"),
         [B("Unndragelsen er om lag like stor i alle inntektsgrupper, rundt 3 % av skatten"),
          B("Frivillig retting fritar for både tilleggsskatt og ordinær skatt på det som meldes"),
          B("CRS gir allmennheten innsyn i hvem som eier kontoene i skatteparadisene")],
         "<p><b>Regelen.</b> Skatteparadis er for de rikeste: 25–30 % av skatten unndras av de 0,01 % rikeste, mot 3 % i "
         "gjennomsnitt for hele befolkningen. De 0,01 % rikeste eier 50 % av formuen i skatteparadis (forelesning 11 GS "
         "2026, lysbilde 49). <b>Utsagnet om de 0,01 % rikeste er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Like stor i alle grupper</b> = 3 % er snittet. Unndragelsen er "
         "sterkt konsentrert på toppen.<br><b>Fritak for ordinær skatt</b> = den som retter selv, slipper tilleggsskatt og "
         "straffeforfølgning, men betaler ordinær skatt og renter, normalt opptil ti år tilbake (lysbilde 47).<br>"
         "<b>Innsyn for allmennheten</b> = CRS gir ikke innsyn for tredjepart. Bare skattemyndighetene mottar "
         "opplysningene. De brukes til skattekontroll, ikke til offentlig innsyn (lysbilde 39–40).</p>")
EX.append(oppgave(11, "Skjult formue i Norden", "Skatteparadis", [13], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: progressivitet")
p = ledd("",
         "<p>Et parti vil gjøre skattesystemet mer rettferdig og ber om en beskrivelse av hvordan det norske systemet "
         "fordeler skatten mellom høye og lave inntekter i dag. Hvilket utsagn om progressivitet er i tråd med "
         "forelesningen?</p>",
         B("Arbeidsinntekt beskattes progressivt gjennom trinnskatten, men kapitalbeskatningen er ikke progressiv"),
         [B("Stortinget har vedtatt et rettslig bindende prinsipp om at hele skattesystemet skal være progressivt"),
          B("En flat sats med bunnfradrag er proporsjonal, fordi marginalskatten er lik for alle"),
          B("Jo større bunnfradraget er, jo svakere blir progressiviteten i et system med flat sats")],
         "<p><b>Regelen.</b> «I Norge har vi progressiv beskatning av arbeidsinntekt via trinnskatten, men vi har ikke "
         "progressivitet i kapitalbeskatningen» (forelesning 7 GS 2026, lysbilde 26). <b>Utsagnet om trinnskatten er "
         "riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Rettslig bindende prinsipp</b> = Stortinget har ikke vedtatt det. "
         "Det har sluttet seg til skatteevneprinsippet (lysbilde 26).<br><b>Proporsjonal med bunnfradrag</b> = "
         "gjennomsnittsskatten t(1 − B/Y) stiger med inntekten. Et system med bunnfradrag er alltid progressivt "
         "(lysbilde 25).<br><b>Svakere med større bunnfradrag</b> = motsatt: jo større bunnfradrag, jo sterkere "
         "progressivitet (lysbilde 25).</p>")
EX.append(oppgave(12, "Et parti og rettferdig skatt", "Progressivitet", [10], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: Jorunn velger pensjonskontrakt")
A13, l13, h13, p13 = 580_000, 160_000, 810_000, 0.30
E13 = p13 * l13 + (1 - p13) * h13
EU13 = p13 * math.sqrt(l13) + (1 - p13) * math.sqrt(h13)
CE13 = EU13 ** 2
g13_byttet = ((1 - p13) * math.sqrt(l13) + p13 * math.sqrt(h13)) ** 2   # sannsynlighetene byttet
g13_premie = E13 - CE13                                                 # risikopremien
assert lik(E13, 615_000) and lik(CE13, 562_500) and lik(g13_byttet, 302_500) and lik(g13_premie, 52_500)
print(f"   E {E13}, CE {CE13}: {g13_byttet}, premie {g13_premie}")
p = ledd("",
         f"<p>Jorunn er risikoavers med nyttefunksjonen U(W) = √W. Hun kan velge mellom to pensjonskontrakter. Kontrakt A "
         f"gir en utbetaling på kr {kr(A13)} helt sikkert. Kontrakt B gir kr {kr(l13)} med 30 % sannsynlighet og "
         f"kr {kr(h13)} med 70 % sannsynlighet. Hva er sikkerhetsekvivalenten til kontrakt B? Hvilken kontrakt "
         "velger Jorunn?</p>",
         (f"Kr {kr(CE13)}, så hun velger A", [kr(CE13)]),
         [(f"Kr {kr(E13)}, så hun velger B", [kr(E13)]),
          (f"Kr {kr(g13_byttet)}, så hun velger A", [kr(g13_byttet)]),
          (f"Kr {kr(g13_premie)}, så hun velger A", [kr(g13_premie)])],
         sol("Sikkerhetsekvivalenten er det sikre beløpet som gir samme nytte som forventet nytte av kontrakten: "
             "CE = (E[√W])². En risikoavers person velger kontrakten med høyest forventet nytte, altså høyest "
             "sikkerhetsekvivalent, ikke høyest forventning (kursgodkjenningen 2026 spørsmål 11; manualen 17.1–17.3).",
             [f"E[√W] = 0,3 × √{kr(l13)} + 0,7 × √{kr(h13)} = 0,3 × 400 + 0,7 × 900 = {kr(EU13)}.",
              f"CE = {kr(EU13)}² = <b>kr {kr(CE13)}</b>.",
              f"{kr(CE13)} &lt; {kr(A13)}, så hun velger <b>A</b>, selv om B har høyere forventning, {kr(E13)}."],
             [(f"Kr {kr(E13)}, så hun velger B", "forventet utbetaling. Det er valget til en risikonøytral person."),
              (f"Kr {kr(g13_byttet)}, så hun velger A", "sannsynlighetene er byttet: 0,7 × 400 + 0,3 × 900 = 550."),
              (f"Kr {kr(g13_premie)}, så hun velger A", f"risikopremien, {kr(E13)} − {kr(CE13)}, ikke "
               "sikkerhetsekvivalenten. Valget blir riktig av feil grunn.")],
             f"Nytte av A: √{kr(A13)} = {kr(math.sqrt(A13), 2)} &gt; {kr(EU13)}. ✓",
             "Alternativet med kr 52 500 kan strykes: en sikkerhetsekvivalent kan ikke ligge under laveste utfall, "
             "kr 160 000."))
EX.append(oppgave(13, "Jorunn velger pensjonskontrakt", "Forsikring og forventet nytte", [17, 15], "", [p]))

# ======================================================================= 14
print("\nOppgave 14: Brede og aksjeandelen")
F14, H14, prem14, sig14, gam14, risk14 = 2_000_000, 3_000_000, 0.05, 0.20, 2.5, 0.40
w14 = prem14 / (gam14 * sig14 ** 2)
mal14 = w14 * (F14 + H14)
a14 = (mal14 - risk14 * H14) / F14
g14_risikofri = (mal14 - risk14 * H14) / (F14 + H14)  # beløpet delt på totalformuen
g14_uten_hk = w14                                  # humankapitalen glemt
g14_beta1 = max(0.0, (mal14 - H14) / F14)          # hele humankapitalen som aksjer
assert lik(w14, 0.5) and lik(a14, 0.65) and lik(g14_risikofri, 0.26) and lik(g14_beta1, 0)
print(f"   w {w14}, ønsket {mal14}, andel {a14}: {g14_risikofri}, {g14_uten_hk}, {g14_beta1}")
body14 = (f"<p>Brede er 35 år og har en finansformue på kr {kr(F14)}. Nåverdien av framtidig lønn er kr {kr(H14)}. Et "
          "globalt indeksfond har forventet avkastning 5 prosentpoeng over risikofri rente og standardavvik 20 %. "
          "Risikoaversjonen hans er γ = 2,5.</p>")
pa = ledd("a", "<p>Anta at 40 % av humankapitalen svinger én til én med aksjemarkedet, mens resten er risikofri. Brede kan "
               "ikke låne. Hvor stor andel av finansformuen bør han ha i indeksfondet?</p>",
          (pst(a14, 0), [kr(100 * a14)]),
          [(pst(g14_risikofri, 0), [kr(100 * g14_risikofri)]),
           (pst(g14_uten_hk, 0), [kr(100 * g14_uten_hk)]),
           (pst(g14_beta1, 0), [kr(100 * g14_beta1)])],
          sol("Mertons andel w = (E(r) − r<sub>f</sub>)/(γσ²) gjelder hele formuen, også humankapitalen. Den delen av "
              "humankapitalen som svinger med børsen, er allerede en aksjeplassering. Det som mangler, kjøpes med "
              "finansformuen (ForelesningAksjesparing2026, side 11–15; manualen 14.4).",
              [f"w = 0,05/(2,5 × 0,20²) = {pst(w14, 0)}. Ønsket aksjeeksponering: 50 % × {kr(F14 + H14)} = {kr(mal14)}.",
               f"Humankapitalen gir allerede 40 % × {kr(H14)} = {kr(risk14 * H14)} i aksjelik eksponering.",
               f"I fondet: {kr(mal14)} − {kr(risk14 * H14)} = {kr(mal14 - risk14 * H14)}, altså <b>{pst(a14, 0)}</b> av "
               "finansformuen."],
              [(pst(g14_risikofri, 0), f"beløpet i fondet er delt på totalformuen: {kr(mal14 - risk14 * H14)}/{kr(F14 + H14)}. "
                "Spørsmålet gjelder andelen av finansformuen."),
               (pst(g14_uten_hk, 0), "humankapitalen er glemt. Mertons andel er brukt direkte på finansformuen."),
               ("0 %", "hele humankapitalen er behandlet som aksjer: ønsket eksponering er lavere enn de 3 mill. han "
                "allerede har.")],
              f"Totalt: {kr(F14 * a14)} i fondet + {kr(risk14 * H14)} gjennom lønnen = {kr(mal14)}, som er 50 % av "
              f"{kr(F14 + H14)}. ✓"))
pb = ledd("b", "<p>Bredes kollega Torbjørn er 62 år, har samme lønn og samme risikoaversjon og skal snart gå av med "
               "pensjon. Hvilket utsagn om forskjellen mellom dem er i tråd med forelesningen?</p>",
          B("Brede bør ha høyere aksjeandel fordi han har mer sikker humankapital igjen"),
          [B("Brede bør ha høyere aksjeandel fordi aksjer blir mindre risikable jo lengre tidshorisonten er"),
           B("De bør ha samme aksjeandel av finansformuen, fordi de har samme risikoaversjon"),
           B("Torbjørn bør ha høyest aksjeandel, fordi han har mest finansformue å spre risikoen på")],
          "<p><b>Regelen.</b> For en ung arbeidstaker er humankapitalen den viktigste eiendelen. Nær pensjonsalder er den "
          "mindre verdt, fordi den bare gir inntekt i få år. Det gir høyere aksjeandel når man er ung "
          "(ForelesningAksjesparing2026, side 17). Selvhjelpsbøkene gir samme råd av en annen grunn: at aksjer blir mindre "
          "risikable med lang horisont. «Økonomer er egentlig ikke enige i at risikoen blir mindre ved lang "
          "tidshorisont» (side 19). <b>Utsagnet om humankapitalen er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Mindre risiko med lang horisont</b> = selvhjelpsbøkenes "
          "begrunnelse, som økonomene ikke deler.<br><b>Samme andel</b> = lik γ gir lik andel av totalformuen, men "
          "humankapitalen utgjør ulik del av den.<br><b>Torbjørn høyest</b> = snur logikken. Mindre sikker humankapital "
          "gir lavere aksjeandel av finansformuen.</p>")
EX.append(oppgave(14, "Brede og aksjeandelen", "Porteføljevalg", [14], body14, [pa, pb]))

# ======================================================================= 15
print("\nOppgave 15: Halldis og pensjonen")
n15, lonn15, tak15, del15 = 41, 8.0, 7.1, 18.0
a15 = n15 * 0.181 * min(lonn15, tak15) / lonn15 / del15
g15_uten_tak = n15 * 0.181 / del15                 # taket glemt
g15_ett_aar = 0.181 * tak15 / lonn15               # ett års opptjening
g15_181 = 0.181                                    # ett år uten tak
FT15, OTP15, akt15, IPS15, ASK15 = 1_300_000, 700_000, 0.60, 150_000, 400_000
eksp15 = OTP15 * akt15 + IPS15
pen15 = FT15 + OTP15 + IPS15
b15 = eksp15 / pen15
g15_uten_ft = eksp15 / (OTP15 + IPS15)             # folketrygden glemt i nevneren
g15_otp_alt = (OTP15 + IPS15) / pen15              # hele tjenestepensjonen som aksjer
g15_ips60 = (OTP15 * akt15 + IPS15 * akt15) / pen15  # 60 % aksjer brukt også på IPS
assert kr(100 * a15, 1) == "36,6" and kr(100 * b15, 1) == "26,5"
print(f"   a {a15:.4f}: {g15_uten_tak:.4f}, {g15_ett_aar:.4f}, {g15_181}; b {b15:.4f}: {g15_uten_ft:.4f}, "
      f"{g15_otp_alt:.4f}, {g15_ips60:.4f}")
body15 = ("<p>Halldis er født i 1995. Hun tjener 8 G hvert år fra hun er 26 til hun går av som 67 år, altså i 41 år. "
          "Lønnen følger lønnsveksten.</p>")
pa = ledd("a", "<p>Hvert år legges 18,1 % av inntekten opp til 7,1 G til pensjonsbeholdningen i folketrygden. Beholdningen "
               "reguleres med lønnsveksten. Delingstallet ved 67 år er 18,0. Hvor stor blir alderspensjonen fra "
               "folketrygden i prosent av sluttlønnen? Svar med én desimal.</p>",
          (pst(a15, 1), [kr(100 * a15, 1)]),
          [(pst(g15_uten_tak, 1), [kr(100 * g15_uten_tak, 1)]),
           (pst(g15_ett_aar, 1), [kr(100 * g15_ett_aar, 1)]),
           (pst(g15_181, 1), [kr(100 * g15_181, 1)])],
          sol("Hvert år øker beholdningen med 18,1 % av inntekt opp til 7,1 G. Når lønnen følger lønnsveksten, er hvert "
              "opptjeningsår verdt like mye målt mot sluttlønnen. Årlig pensjon er beholdningen delt på delingstallet "
              "(ForelesningPensjon (7), side 10 og 14; manualen 15.1).",
              [f"Opptjent per år: 18,1 % × 7,1 G = {kr(0.181 * 7.1, 4)} G, altså {pst(0.181 * 7.1 / 8, 3)} av lønnen på 8 G.",
               f"Beholdning: 41 × {kr(0.181 * 7.1, 4)} G = {kr(41 * 0.181 * 7.1, 4)} G.",
               f"Pensjon: {kr(41 * 0.181 * 7.1, 4)}/18,0 = {kr(41 * 0.181 * 7.1 / 18, 4)} G, som er "
               f"<b>{pst(a15, 1)}</b> av 8 G."],
              [(pst(g15_uten_tak, 1), "taket på 7,1 G er glemt: 41 × 18,1 %/18,0."),
               (pst(g15_ett_aar, 1), "bare ett års opptjening med tak: 18,1 % × 7,1/8."),
               (pst(g15_181, 1), "ett års opptjening uten tak.")],
              f"Uten tak ville hun fått {pst(g15_uten_tak, 1)}. Taket kutter {kr(100 * (1 - 7.1 / 8), 2)} % av "
              f"opptjeningen: {pst(g15_uten_tak, 2)} × 7,1/8 = {pst(a15, 2)}. ✓"))
pb = ledd("b", f"<p>Som 45-åring har Halldis kr {kr(FT15)} i folketrygdens pensjonsbeholdning, kr {kr(OTP15)} i "
               f"innskuddspensjon med 60 % aksjer, kr {kr(IPS15)} i IPS i et globalt aksjeindeksfond og kr {kr(ASK15)} på en "
               "aksjesparekonto. Hvor stor andel av pensjonsformuen hennes, altså folketrygd, innskuddspensjon og IPS, "
               "påvirkes direkte av aksjemarkedet?</p>",
          (pst(b15, 1), [kr(100 * b15, 1)]),
          [(pst(g15_uten_ft, 1), [kr(100 * g15_uten_ft, 1)]),
           (pst(g15_otp_alt, 1), [kr(100 * g15_otp_alt, 1)]),
           (pst(g15_ips60, 1), [kr(100 * g15_ips60, 1)])],
          sol("Folketrygdens beholdning reguleres med lønnsveksten fram til uttak, ikke med avkastningen i aksjemarkedet "
              "(ForelesningPensjon (7), side 18). I innskuddspensjon bærer arbeidstakeren investeringsrisikoen, men bare "
              "aksjedelen svinger med børsen (side 24 og 26; kursgodkjenningen 2026 spørsmål 20). Aksjesparekontoen er støy: "
              "den er ikke pensjonsformue og hører ikke med.",
              [f"Eksponert: {kr(OTP15)} × 60 % + {kr(IPS15)} = {kr(eksp15)}.",
               f"Pensjonsformue: {kr(FT15)} + {kr(OTP15)} + {kr(IPS15)} = {kr(pen15)}.",
               f"Andel: {kr(eksp15)}/{kr(pen15)} = <b>{pst(b15, 1)}</b>."],
              [(pst(g15_uten_ft, 1), "folketrygden er utelatt fra nevneren. Den er en del av pensjonsformuen."),
               (pst(g15_otp_alt, 1), "hele innskuddspensjonen er regnet som aksjer, også rentedelen."),
               (pst(g15_ips60, 1), f"aksjeandelen på 60 % er brukt også på IPS: ({kr(OTP15 * akt15)} + "
                f"{kr(IPS15 * akt15)})/{kr(pen15)}. IPS-en står i et rent aksjefond.")],
              f"Ikke eksponert: {kr(FT15)} + {kr(OTP15 * 0.4)} = {kr(FT15 + OTP15 * 0.4)}, som er {pst(1 - b15, 1)}. "
              f"Sum 100 %. ✓"))
EX.append(oppgave(15, "Halldis og pensjonen", "Pensjon", [15], body15, [pa, pb]))

# ======================================================================= 16
print("\nOppgave 16: porteføljer og fond")
s1, s2 = 1.0, 2.0
w_min = s2 ** 2 / (s1 ** 2 + s2 ** 2)
sig_min = math.sqrt(w_min ** 2 * s1 ** 2 + (1 - w_min) ** 2 * s2 ** 2)
assert sig_min < s1
print(f"   minimum varians med ρ = 0: w1 {w_min}, σ {sig_min:.4f}")
body16 = "<p>To spørsmål om hvordan man bør spare i aksjer.</p>"
pa = ledd("a", "<p>Hvilken av påstandene om aksjeporteføljer kan være korrekt? Anta at man kan sette penger i banken og "
               "låne til risikofri rente.</p>",
          B("Å legge til en aksje med lavere forventet avkastning og høyere standardavvik kan gi lavere risiko"),
          [B("To investorer med ulik risikoaversjon bør holde ulik sammensetning av risikable aksjer"),
           B("Den som tåler mye risiko, får mest avkastning per risikoenhet ved å kjøpe de mest risikable enkeltaksjene"),
           B("Ifølge CAPM gir høyere selskapsspesifikk risiko høyere forventet avkastning, gitt samme beta")],
          "<p><b>Regelen.</b> Ordet «kan» betyr at ett tilfelle er nok. Næss' eksempel: aksje 1 har forventning 2 og "
          "standardavvik 1, aksje 2 har forventning 1 og standardavvik 2. Korrelasjonen er 0. Aksje 2 er dårligere på "
          f"begge mål, men porteføljen med {pst(w_min, 0)} i aksje 1 har standardavvik {kr(sig_min, 3)}, lavere enn 1 "
          "(ForelesningAksjesparing2026, side 24–28). <b>Påstanden om den dårligere aksjen kan være korrekt.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Ulik sammensetning</b> = separasjonsteoremet: alle holder "
          "markedsporteføljen og banken. Risikoaversjonen avgjør bare hvor mye (side 51).<br><b>De mest risikable "
          "aksjene</b> = kapitalmarkedslinjen gir høyest avkastning per risiko. Den som vil ha mer risiko, bør låne og "
          "kjøpe mer av markedsporteføljen (side 51 og 58).<br><b>Selskapsspesifikk risiko</b> = markedet betaler ikke for "
          "risiko du kan diversifisere bort. Bare β gir risikotillegg (side 59–60).</p>")
pb = ledd("b", "<p>Hvilket utsagn om aktive fond og indeksfond er i tråd med forelesningen?</p>",
          B("Aktive fond kan slå indeks før gebyrer, men kundene taper likevel på grunn av gebyrene"),
          [B("Survivorship bias gjør at aktive fond ser dårligere ut i statistikken enn de egentlig er"),
           B("De 20 beste forvalterne på 70-tallet slo også markedet på 80-tallet, så dyktighet varer"),
           B("Indeksfond koster om lag dobbelt så mye som aktive fond, fordi de eier alle aksjene")],
          "<p><b>Regelen.</b> «Berk og DeMarzo viser at aktive fond klarer å slå indeks før gebyrer, men at kundene likevel "
          "taper penger på grunn av gebyrer» (ForelesningAksjesparing2026, side 76). <b>Utsagnet om gebyrene er "
          "riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Survivorship bias</b> = dårlige fond legges ned og forsvinner fra "
          "statistikken. Det gjør at fondene ser bedre ut enn de er. Malkiel (1995) finner at situasjonen er enda verre "
          "(side 74).<br><b>De 20 beste</b> = de gjorde det dobbelt så bra som indeks på 70-tallet, men ble slått av "
          "markedet på 80-tallet (side 74).<br><b>Dyrere indeksfond</b> = motsatt: aktive fond koster om lag fem ganger "
          "så mye, ofte 1–2 % i året (side 73; Finansiell psykologi, side 49).</p>")
EX.append(oppgave(16, "Porteføljer og fond", "Indeksfond og aktiv forvaltning", [14], body16, [pa, pb]))

# ======================================================================= 17
print("\nOppgave 17: Ottar og seilbåten")
W17, L17, p17 = 2_250_000, 1_440_000, 0.04
EU17 = (1 - p17) * math.sqrt(W17) + p17 * math.sqrt(W17 - L17)
CE17 = EU17 ** 2
b17 = W17 - CE17
g17_akt = p17 * L17                                    # aktuarisk premie
g17_rp = b17 - g17_akt                                 # risikopremien
g17_glemt = (1 - EU17 / math.sqrt(W17)) * W17          # nyttetapet i prosent ganget med formuen
assert lik(EU17, 1476) and lik(b17, 71_424) and lik(g17_akt, 57_600) and lik(g17_glemt, 36_000)
print(f"   EU {EU17}, CE {CE17}, maks {b17}: {g17_akt}, {g17_rp}, {g17_glemt}")
body17 = (f"<p>Ottar har en formue på kr {kr(W17)}. Av dette er kr {kr(L17)} en seilbåt. Med sannsynlighet 4 % blir båten "
          "totalskadd i løpet av året. Ottar har nyttefunksjonen U(W) = √W, der W er formuen hans.</p>")
pa = ledd("a", "<p>Selskapet tilbyr enten full dekning eller en avtale med kr 50 000 i egenandel til lavere premie. "
               "Begge premiene ligger over den aktuariske prisen. Hvilket utsagn er riktig?</p>",
          B("Egenandelen demper moralsk hasard, fordi Ottar selv bærer en del av en skade"),
          [B("Egenandelen fjerner ugunstig utvalg, fordi alle kundene da betaler samme premie"),
           B("Fordi Ottar er risikoavers, gir full dekning alltid høyere forventet nytte enn egenandel"),
           B("Egenandelen gir selskapet flere små skademeldinger å behandle, ikke færre")],
          "<p><b>Regelen.</b> Med egenandel bærer kunden selv en del av skaden og har grunn til å være forsiktig. Det "
          "demper moralsk hasard. Egenandelen hjelper også mot ugunstig utvalg ved at forsiktige kunder velger den mot "
          "lavere premie. Den gir dessuten færre små krav (manualen 17.6; kursgodkjenningen 2026 spørsmål 15). <b>Utsagnet om "
          "moralsk hasard er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Samme premie</b> = egenandelen virker mot ugunstig utvalg nettopp "
          "fordi kundene sorterer seg på ulike avtaler og premier.<br><b>Alltid full dekning</b> = full dekning er optimal "
          "bare til aktuarisk pris. Når premien ligger over, kan en egenandel gi høyere forventet nytte (Mossins resultat, manualen "
          "k17).<br><b>Flere små skademeldinger</b> = små skader under egenandelen meldes ikke.</p>")
pb = ledd("b", "<p>Hva er den høyeste premien Ottar er villig til å betale for full dekning av båten? Rund av til nærmeste "
               "krone.</p>",
          (f"Kr {kr(b17)}", [kr(b17)]),
          [(f"Kr {kr(g17_akt)}", [kr(g17_akt)]),
           (f"Kr {kr(g17_rp)}", [kr(g17_rp)]),
           (f"Kr {kr(g17_glemt)}", [kr(g17_glemt)])],
          sol("Den høyeste premien gjør Ottar likegyldig: √(W − P) = forventet nytte uten forsikring. Den er forventet tap "
              "pluss risikopremien (manualen 17.1–17.2).",
              [f"Uten forsikring: 0,96 × √{kr(W17)} + 0,04 × √{kr(W17 - L17)} = 0,96 × 1 500 + 0,04 × 900 = {kr(EU17)}.",
               f"Sikkerhetsekvivalent: {kr(EU17)}² = {kr(CE17)}.",
               f"Høyeste premie: {kr(W17)} − {kr(CE17)} = <b>kr {kr(b17)}</b>."],
              [(f"Kr {kr(g17_akt)}", "den aktuariske premien, 4 % × 1 440 000. Det er forventet tap, ikke betalingsviljen."),
               (f"Kr {kr(g17_rp)}", "bare risikopremien. Forventet tap er glemt."),
               (f"Kr {kr(g17_glemt)}", f"nyttetapet i prosent, (1 500 − {kr(EU17)})/1 500 = 1,6 %, er ganget med formuen. "
                "Nytte er ikke kroner."),
               ],
              f"√({kr(W17)} − {kr(b17)}) = √{kr(CE17)} = {kr(math.sqrt(CE17))}, som er lik forventet nytte. ✓"))
EX.append(oppgave(17, "Ottar og seilbåten", "Forsikring og forventet nytte", [17], body17, [pa, pb]))

# ======================================================================= 18
print("\nOppgave 18: Aslak og arven")
n18, ri18, rs18, K18 = 25, 0.09, 0.065, 100_000
b18 = K18 * ((1 + ri18) ** n18 - (1 + rs18) ** n18)
g18_lin = K18 * (ri18 - rs18) * n18                      # lineær regning
g18_diff = K18 * ((1 + ri18 - rs18) ** n18 - 1)          # differansen forrentet
g18_indeks = K18 * ((1 + ri18) ** n18 - 1)               # bare indeksens gevinst
print(f"   {b18:.0f}: {g18_lin:.0f}, {g18_diff:.0f}, {g18_indeks:.0f}")


def r1000(x):
    return kr(float(rund(x / 1000)) * 1000)


body18 = "<p>Aslak er 30 år og har fått kr 80 000 i arv.</p>"
pa = ledd("a", "<p>Aslak har kredittkortgjeld til 24 % rente, et billån til 7 %, et boliglån til 5 % og et studielån til "
               "5 %. Han vil bruke arven til å betale ned gjeld. Hvilken prioritering er i tråd med forelesningen om "
               "lån?</p>",
          B("Kredittkort, så billån, så boliglån og studielånet til slutt"),
          [B("Den minste gjelden først, uansett rente, for å få raske seire"),
           B("En like stor andel av hvert lån, slik at alle krymper i samme takt"),
           B("Kredittkort, så billån, så studielån og boliglånet til slutt")],
          "<p><b>Regelen.</b> Betal ned lånet med høyest rente først. Rekkefølgen er kreditt- og forbrukslån, bil- og "
          "båtlån, boliglån og studielån. Studielånet kommer sist også ved lik rente, fordi det har fordeler: det slettes "
          "ved dødsfall og gir rentefritak ved sykdom (ForelesningLån2026, side 13–14). <b>Kredittkort, billån, "
          "boliglån, studielån er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Minste gjeld først</b> = snøballmetoden til Dave Ramsey, som "
          "forelesningen bruker som eksempel på at selvhjelpsbøkene avviker fra økonomene (side 15–16).<br><b>Lik andel</b> "
          "= det mange gjør i praksis ifølge Gathergood mfl. (2017), men det er ikke optimalt (side 23).<br><b>Studielån "
          "før boliglån</b> = samme rente, men studielånet har fordelene som boliglånet mangler.</p>")
pb = ledd("b", f"<p>En fondsindeks ga 9,0 % i året i {n18} år. Fondssparerne fikk i snitt bare 6,5 %, fordi de kjøpte etter "
               "oppgang og solgte etter fall. Hvor mye mer ville kr 100 000 ha vokst til med indeksens avkastning enn med "
               "sparernes? Rund av til nærmeste kr 1 000.</p>",
          (f"Kr {r1000(b18)}", [r1000(b18)]),
          [(f"Kr {r1000(g18_lin)}", [r1000(g18_lin)]),
           (f"Kr {r1000(g18_diff)}", [r1000(g18_diff)]),
           (f"Kr {r1000(g18_indeks)}", [r1000(g18_indeks)])],
          sol("Hver strategi vokser med rentes rente. Forskjellen er differansen mellom de to sluttverdiene. Kvadsheim "
              "viser samme poeng: fra 1994 til 2018 ga den norske fondsindeksen 8,93 % i året, mens sparerne i norske "
              "aksjefond bare fikk 6,6 % (Kvadsheim, lysbilde 34). Næss: du klarer uansett ikke å «time» markedet "
              "(ForelesningAksjesparing2026, side 91–92).",
              [f"Indeksen: {kr(K18)} × 1,09<sup>{n18}</sup> = {kr(K18 * (1 + ri18) ** n18)}.",
               f"Sparerne: {kr(K18)} × 1,065<sup>{n18}</sup> = {kr(K18 * (1 + rs18) ** n18)}.",
               f"Forskjell: {kr(b18)}, som rundes til <b>kr {r1000(b18)}</b>."],
              [(f"Kr {r1000(g18_lin)}", f"lineær regning: 2,5 % × {n18} år × {kr(K18)} = {kr(g18_lin)}."),
               (f"Kr {r1000(g18_diff)}", f"differansen i rente forrentet: {kr(K18)} × (1,025<sup>{n18}</sup> − 1). "
                "Renteforskjeller kan ikke trekkes fra før man forrenter."),
               (f"Kr {r1000(g18_indeks)}", "gevinsten med indeksen alene. Sparernes sluttverdi er ikke trukket fra.")],
              f"Sparerne ender med {pst((1 + rs18) ** n18 / (1 + ri18) ** n18, 0)} av det indeksen gir. Det er samme mønster "
              "som Kvadsheims 780 mot under 470 kroner per hundrelapp. ✓"))
EX.append(oppgave(18, "Aslak og arven", "Lån", [16, 14], body18, [pa, pb]))

# ======================================================================= 19
print("\nOppgave 19: Sunniva selger fondet")
p = ledd("",
         "<p>Sunniva har et globalt indeksfond. I en uke viser TV og aviser bilder av folk som har tapt sparepengene sine i "
         "et krakk i et annet land. Sunniva anslår nå at sannsynligheten for at fondet hennes halveres neste år, er 40 %. "
         "Hun selger alt. Hvilken skjevhet beskriver best det hun gjør?</p>",
         B("Tilgjengelighetsbias"),
         [B("Ankereffekt"),
          B("Bekreftelsesbias"),
          B("Disposisjonseffekten")],
         "<p><b>Regelen.</b> Tilgjengelighetsbias er å overvurdere sannsynligheten for hendelser basert på nylige, levende "
         "eller lett tilgjengelige eksempler (Finansiell psykologi 2026, side 16). Bildene fra krakket gjør et fall levende. "
         "Sunniva overvurderer derfor sannsynligheten. <b>Tilgjengelighetsbias er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Ankereffekt</b> = for stor vekt på den første informasjonen, for "
         "eksempel kjøpskursen.<br><b>Bekreftelsesbias</b> = å søke informasjon som bekrefter det man allerede tror. Hun "
         "skifter tvert om syn.<br><b>Disposisjonseffekten</b> = å selge vinnere for tidlig og beholde tapere for lenge. Hun "
         "selger på grunn av en oppblåst sannsynlighet, ikke på grunn av gevinst eller tap.</p>")
EX.append(oppgave(19, "Sunniva selger fondet", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove12",
    "kind": "mock",
    "label": "Prøveeksamen 12",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner kursgodkjenningen 2026, som er laget av årets forelesere, i H2025-format og med H2025-vanskelighetsgrad. "
             "Vekten ligger på det som er nytt eller vektlagt i 2026-forelesningene: inntektsskiftingslikningen med "
             "arbeidsgiveravgiften, AERT for børsnotert og unotert eier, skatt og risiko, utflytting og exit-skatt, "
             "skatteparadiser, Næss om humankapital, pensjon, fond og lån samt Kvadsheim om sparing."),
    "facts": [
        "30 flervalgsledd på fire timer: 18 i skattedelen (oppgave 1–12) og 12 i finansdelen (oppgave 13–19). 3 poeng "
        "for rett, −1 for feil.",
        "Satsene står i teksten, slik kunngjøringen 6. november sier. Når en sats er forenklet, sier teksten det.",
        "Laget av appen for trening. Kurset har ikke kontrollert oppgavene eller løsningene.",
    ],
    "practiceNote": ("Lysbildefaktaene teller her: boligvilkåret ved utflytting, hva AERT tar med og hvem som får "
                     "CRS-opplysningene. Les forelesning 5, 7 og 11 før du tar settet."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove12.json")
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
if not 15 <= len(S["exercises"]) <= 19:
    feil.append(f"{len(S['exercises'])} oppgaver, ikke 15–19")
skatt = sum(len(e["parts"]) if e.get("parts") else 1 for e in S["exercises"] if e["n"] <= 12)
if skatt != 18:
    feil.append(f"{skatt} skatteledd, ikke 18")
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

# 3. tallene i alternativene er de skriptet regnet og ingen andre
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
per_ledd = []

for e in S["exercises"]:
    L = e["parts"] if e.get("parts") else [e]
    felles = len(strip(e.get("body", "")).split(" "))
    for p_ in L:
        n_ord = felles if p_ is e else felles / len(L) + len(strip(p_["body"]).split(" "))
        ordsum += n_ord
        per_ledd.append((f"{e['n']}{p_.get('label', '')}", round(n_ord)))
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
print(f"   {len(S['exercises'])} oppgaver, {len(alle)} ledd ({skatt} skatt), {S['points']} poeng")
print(f"   ord per ledd: {per_ledd}")
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
