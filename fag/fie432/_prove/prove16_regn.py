"""Prøveeksamen 16 (FIE432): regner alle tall, bygger prove16.json og sjekker den.

Andre trekning av prediksjonen for eksamen 12. november 2026 (docs/fie432-proveeksamen-spek.md,
«Prøveeksamen 16: andre trekning: H2025-formen»). Kjernerutinene fra H2025 med andre vrier enn
prøveeksamen 10-15.

Kjør:  python3 -I fag/fie432/_prove/prove16_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p16) sier,
3. skriver prove16.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p16"]
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


def M(x):
    """Alternativ i millioner med én desimal."""
    return (f"{kr(x, 1)} mill.", [kr(x, 1)])


# ======================================================================= 1
print("\nOppgave 1: Agnete og aksjene i Averøy Sjø ASA (et år med lavt utbytte og året etter)")
K1 = 80_000
r1a, r1b = 0.03, 0.05
D1a, D1b = 1_000, 7_470
skj1 = K1 * r1a                                     # 2 400
ub1 = skj1 - D1a                                    # 1 400 framføres
grl2 = K1 + ub1                                     # 81 400
skj2 = grl2 * r1b                                   # 4 070
fri2 = skj2 + ub1                                   # 5 470: høyeste skattefrie utbytte i år 2
g1a_grl = K1 * r1b + ub1                            # grunnlaget ikke økt: 5 400
g1a_aar = skj2                                      # bare årets skjerming: 4 070
g1a_glemt = K1 * r1b                                # ubenyttet skjerming glemt helt: 4 000
skpl2 = D1b - fri2                                  # 2 000
skatt1 = skpl2 * TE                                 # 756,80
g1b_opp = skpl2 * 0.22                              # oppjustering glemt: 440,00
g1b_grl = (D1b - g1a_grl) * TE                      # følgefeil fra a: 783,29
g1b_trekk = (D1b - skj2) * TE                       # framført skjerming ikke trukket fra: 1 286,56
assert lik(ub1, 1400) and lik(skj2, 4070) and lik(fri2, 5470) and lik(skpl2, 2000) and lik(skatt1, 756.8)
assert kr(g1b_grl, 2) == "783,29" and lik(g1b_trekk, 1286.56) and lik(g1b_opp, 440)
print(f"   a {fri2}: {g1a_grl}, {g1a_aar}, {g1a_glemt}; b {skatt1:.4f}: {g1b_opp}, {g1b_grl:.4f}, {g1b_trekk:.4f}")
body1 = (f"<p>Agnete kjøpte aksjer i Averøy Sjø ASA for kr {kr(K1)} i januar år 1, som er kostprisen. Hun eier aksjene "
         f"personlig og har dem ved utgangen av begge årene. I år 1 mottar hun kr {kr(D1a)} i utbytte og skjermingsrenten "
         "er 3 %. I år 2 er skjermingsrenten 5 %.</p>")
pa = ledd("a", "<p>Hvor stort utbytte kan Agnete høyst motta i år 2 uten at noe av det blir skattepliktig?</p>",
          K(fri2),
          [K(g1a_grl), K(g1a_aar), K(g1a_glemt)],
          sol("Skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente. Er utbyttet lavere enn "
              "skjermingen, framføres resten. Den ubenyttede skjermingen gjør to ting året etter: den legges til "
              "grunnlaget og den kan trekkes fra utbyttet sammen med årets fradrag (F4 lb 33 og 34, manualen 5.3).",
              [f"År 1: skjerming {kr(K1)} × 3 % = {kr(skj1)}. Utbyttet er {kr(D1a)}, så {kr(ub1)} framføres.",
               f"År 2: grunnlaget er {kr(K1)} + {kr(ub1)} = {kr(grl2)}. Årets skjerming er {kr(grl2)} × 5 % = {kr(skj2)}.",
               f"Skattefritt utbytte i år 2: {kr(skj2)} + {kr(ub1)} = <b>kr {kr(fri2)}</b>."],
              [(f"Kr {kr(g1a_grl)}", f"de {kr(ub1)} er lagt til fradraget, men ikke til grunnlaget: årets skjerming er "
                f"regnet som {kr(K1)} × 5 % = {kr(K1 * r1b)}."),
               (f"Kr {kr(g1a_aar)}", f"bare årets skjerming. De {kr(ub1)} som er framført, kan også brukes."),
               (f"Kr {kr(g1a_glemt)}", f"den ubenyttede skjermingen er glemt helt: {kr(K1)} × 5 %.")],
              f"Samlet skjerming i år 1 og 2 er {kr(skj1)} + {kr(skj2)} = {kr(skj1 + skj2)}. I år 1 ble {kr(D1a)} brukt. "
              f"Da gjenstår {kr(skj1 + skj2 - D1a)} til år 2. ✓",
              f"{kr(fri2)} og {kr(g1a_grl)} ligger tett. Forskjellen er {kr(ub1)} × 5 % = {kr(ub1 * r1b)}: skjermingen av "
              "den framførte skjermingen."))
pb = ledd("b", f"<p>Agnete mottar kr {kr(D1b)} i utbytte i år 2. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor "
               "mye eierskatt betaler hun på utbyttet? Svar med to desimaler.</p>",
          K(skatt1, 2),
          [K(g1b_opp, 2), K(g1b_grl, 2), K(g1b_trekk, 2)],
          sol("Skattepliktig utbytte er utbyttet minus årets skjerming og framført skjerming. Det oppjusteres med 1,72 og "
              "skattlegges med 22 %, altså 37,84 % (F4 lb 30, manualen 5.1).",
              [f"Skattepliktig utbytte: {kr(D1b)} − {kr(fri2)} = {kr(skpl2)}.",
               f"Oppjustert: {kr(skpl2)} × 1,72 = {kr(skpl2 * 1.72)}.",
               f"Eierskatt: {kr(skpl2 * 1.72)} × 22 % = <b>kr {kr(skatt1, 2)}</b>."],
              [(f"Kr {kr(g1b_opp, 2)}", f"oppjusteringen er glemt: {kr(skpl2)} × 22 %."),
               (f"Kr {kr(g1b_grl, 2)}", f"følgefeilen fra a: ({kr(D1b)} − {kr(g1a_grl)}) × 37,84 %."),
               (f"Kr {kr(g1b_trekk, 2)}", f"den framførte skjermingen er ikke trukket fra: ({kr(D1b)} − {kr(skj2)}) × "
                "37,84 %.")],
              f"Med den effektive satsen: {kr(skpl2)} × 37,84 % = {kr(skatt1, 2)}. ✓",
              f"{kr(g1b_opp, 2)} er 58 % av {kr(skatt1, 2)}. Det er paret med og uten oppjustering. Det høyeste av de to "
              "er som regel riktig."))
EX.append(oppgave(1, "Skjerming og utbytte over to år", "Skjerming", [5], body1, [pa, pb]))

# ======================================================================= 2
print("\nOppgave 2: Birk selger aksjen i Brevik Verft ASA med tap")
K2, S2, UB2 = 900.0, 790.0, 50.0
tap2 = K2 - S2                                      # 110
a2 = tap2 * TE                                      # 41,62
g2_oke = (tap2 + UB2) * TE                          # skjermingen øker tapet: 60,54
g2_opp = tap2 * 0.22                                # oppjustering glemt: 24,20
g2_minus = (tap2 - UB2) * TE                        # skjermingen trukket fra tapet: 22,70
assert lik(tap2, 110) and kr(a2, 2) == "41,62" and kr(g2_oke, 2) == "60,54" and lik(g2_opp, 24.2)
assert kr(g2_minus, 2) == "22,70"
print(f"   tap {tap2}, skatteverdi {a2:.4f}; gale {g2_oke:.4f}, {g2_opp:.4f}, {g2_minus:.4f}")
p = ledd("", f"<p>Birk kjøpte en aksje i Brevik Verft ASA for kr {kr(K2)} i år 1 og selger den i år 3 for kr {kr(S2)}. "
             f"Aksjen har kr {kr(UB2)} i ubenyttet skjerming fra år 1 og 2. Eierskatten er 22 % og oppjusteringsfaktoren "
             "1,72, også for tap. Birk har annen inntekt som et tap kan trekkes fra i. Hvor mye lavere blir skatten hans "
             "på grunn av salget? Svar med to desimaler.</p>",
         K(a2, 2),
         [K(g2_oke, 2), K(g2_opp, 2), K(g2_minus, 2)],
         sol("Tap ved salg av aksjer er fradragsberettiget for en personlig aksjonær (F4 lb 30). Ubenyttet skjerming kan "
             "redusere en gevinst til null, men den kan verken skape eller øke et fradragsberettiget tap. Den regelen "
             "kommer fra skatteloven og manualen 5.3. Den står ikke på 2026-lysbildene. "
             "Selges aksjen med tap, faller skjermingen bort. Tapet oppjusteres med 1,72 på samme måte som en gevinst.",
             [f"Tap: {kr(S2)} − {kr(K2)} = −{kr(tap2)}. Skjermingen på {kr(UB2)} kan ikke legges til.",
              f"Oppjustert tap: {kr(tap2)} × 1,72 = {kr(tap2 * 1.72, 2)}.",
              f"Spart skatt: {kr(tap2 * 1.72, 2)} × 22 % = <b>kr {kr(a2, 2)}</b>."],
             [(f"Kr {kr(g2_oke, 2)}", f"skjermingen er lagt til tapet: ({kr(tap2)} + {kr(UB2)}) × 37,84 %. Det er "
               "nettopp dette regelen stenger for."),
              (f"Kr {kr(g2_opp, 2)}", f"oppjusteringen er glemt: {kr(tap2)} × 22 %."),
              (f"Kr {kr(g2_minus, 2)}", f"skjermingen er trukket fra tapet: ({kr(tap2)} − {kr(UB2)}) × 37,84 %. "
               "Skjermingen reduserer bare en gevinst.")],
             f"Med den effektive satsen: {kr(tap2)} × 37,84 % = {kr(a2, 2)}. ✓ Hadde salgsprisen vært mellom {kr(K2)} og "
             f"{kr(K2 + UB2)}, ville gevinsten blitt null og skatten null, ikke et tap.",
             "Staten tar del i oppsiden med skjerming, men ikke i nedsiden. Les om det er gevinst eller tap før du "
             "bruker skjermingen."))
EX.append(oppgave(2, "Salg med tap og ubenyttet skjerming", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Eidsdal Mekaniske AS (effektiv skattesats i år 2 med saldoavskrivning)")
Y3, MASK3, saldo3, ts3 = 200_000, 100_000, 0.30, 0.22
avs1 = MASK3 * saldo3                               # 30 000
rest3 = MASK3 - avs1                                # 70 000
avs2 = rest3 * saldo3                               # 21 000
skatt3 = (Y3 - avs2) * ts3                          # 39 380
a3 = skatt3 / Y3                                    # 19,69 %
g3_aar1 = (Y3 - avs1) * ts3 / Y3                    # samme avskrivning som i år 1: 18,70 %
g3_nom = skatt3 / (Y3 - avs2)                       # delt på skattepliktig inntekt: 22,00 %
g3_rest = (Y3 - rest3) * ts3 / Y3                   # hele restverdien trukket fra: 14,30 %
assert lik(avs2, 21_000) and lik(skatt3, 39_380) and lik(a3, 0.1969) and lik(g3_aar1, 0.187)
assert lik(g3_nom, 0.22) and lik(g3_rest, 0.143)
print(f"   avskrivning år 2 {avs2}, skatt {skatt3}, sats {a3}; gale {g3_aar1}, {g3_nom}, {g3_rest}")
p = ledd("", f"<p>Eidsdal Mekaniske AS har driftsinntekter på kr {kr(Y3)} i år 1 og kr {kr(Y3)} i år 2. I år 1 kjøpte "
             f"selskapet en maskin for kr {kr(MASK3)}. Maskinen avskrives med 30 % av gjenstående verdi hvert år "
             "(saldoavskrivning). Selskapet har ingen andre kostnader. Selskapsskatten er 22 %. Hva er den effektive "
             "skattesatsen til selskapet i år 2, målt som betalt skatt i prosent av driftsinntektene? Svar med to "
             "desimaler.</p>",
         P(a3),
         [P(g3_aar1), P(g3_nom), P(g3_rest)],
         sol("Den effektive gjennomsnittsskatten (AERT) er betalt skatt i prosent av brutto inntekt før fradrag (F5 lb 15 "
             "til 17, manualen 1.5). Med saldoavskrivning er fradraget 30 % av det som står igjen av maskinen. Fradraget "
             "blir derfor mindre for hvert år.",
             [f"Avskrivning i år 1: {kr(MASK3)} × 30 % = {kr(avs1)}. Gjenstående verdi: {kr(rest3)}.",
              f"Avskrivning i år 2: {kr(rest3)} × 30 % = {kr(avs2)}. Skattepliktig inntekt: {kr(Y3)} − {kr(avs2)} = "
              f"{kr(Y3 - avs2)}.",
              f"Skatt: {kr(Y3 - avs2)} × 22 % = {kr(skatt3)}. Effektiv sats: {kr(skatt3)}/{kr(Y3)} = <b>{pst(a3)}</b>."],
             [(pst(g3_aar1), f"avskrivningen i år 2 er satt til {kr(avs1)}, som i år 1. Det er satsen for år 1."),
              (pst(g3_nom), f"skatten er delt på skattepliktig inntekt, {kr(skatt3)}/{kr(Y3 - avs2)}. Det gir alltid den "
               "nominelle satsen tilbake."),
              (pst(g3_rest), f"hele restverdien på {kr(rest3)} er trukket fra i år 2: {kr(Y3 - rest3)} × 22 %/"
               f"{kr(Y3)}.")],
             f"Formelen 22 % × (1 − avskrivning/inntekt) = 22 % × (1 − {kr(avs2)}/{kr(Y3)}) = 22 % × "
             f"{kr(1 - avs2 / Y3, 3)} = {pst(a3)}. ✓ Satsen stiger fra {pst(g3_aar1)} i år 1 fordi fradraget krymper.",
             "Svaret må ligge mellom satsen i år 1 og 22 %, fordi avskrivningen er mindre enn i år 1, men større enn "
             "null. Det stryker to alternativer før du regner ferdig."))
EX.append(oppgave(3, "Effektiv skattesats i år 2", "Effektiv skattesats", [1], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Dagny flytter penger fra banken til et aksjefond")
BOL4, BANK4, GJ4, FLYTT4 = 6_000_000, 4_000_000, 5_000_000, 2_000_000
MV4 = BOL4 + BANK4                                  # 10 000 000, uendret av flyttingen
netto_for = 0.25 * BOL4 + BANK4 - GJ4               # 500 000
rabatt4 = 0.20 * FLYTT4                             # formuesverdien faller med 400 000
gj_fond4 = GJ4 * FLYTT4 / MV4                       # 1 000 000
red4 = 0.20 * gj_fond4                              # 200 000
netto_etter = 0.25 * BOL4 + 0.80 * FLYTT4 + (BANK4 - FLYTT4) - (GJ4 - red4)   # 300 000
a4 = netto_for - netto_etter                        # 200 000
g4_red = rabatt4                                    # gjeldsreduksjonen glemt: 400 000
g4_fortegn = rabatt4 + red4                         # reduksjonen lagt til med feil fortegn: 600 000
g4_alt = rabatt4 - 0.20 * FLYTT4                    # hele fondet regnet som lånefinansiert: 0
assert lik(netto_for, 500_000) and lik(netto_etter, 300_000) and lik(a4, 200_000) and lik(a4, rabatt4 - red4)
assert lik(g4_alt, 0) and lik(g4_fortegn, 600_000)
print(f"   før {netto_for}, etter {netto_etter}, endring {a4}; gale {g4_red}, {g4_fortegn}, {g4_alt}")
p = ledd("", f"<p>Dagny er enslig. Hun eier en primærbolig med markedsverdi kr {kr(BOL4)} og har kr {kr(BANK4)} i banken. "
             f"Gjelden er kr {kr(GJ4)}. Hun vurderer å flytte kr {kr(FLYTT4)} fra banken til et aksjefond. Primærboligen "
             "verdsettes til 25 %, aksjefond til 80 % og bankinnskudd til 100 %. Gjelden fordeles forholdsmessig etter "
             "markedsverdiene. Gjeld som faller på aksjefondet, reduseres med 20 %. Hvor mye lavere blir Dagnys "
             "skattepliktige nettoformue hvis hun flytter pengene? Du kan se bort fra bunnfradrag.</p>",
         K(a4),
         [K(g4_red), K(g4_fortegn), K(g4_alt)],
         sol("Aksjefond får 20 % verdsettingsrabatt. Til gjengjeld reduseres gjelden som faller på fondet, med samme "
             "sats. Gjelden fordeles etter markedsverdiene før rabatt. Gjeld på primærbolig og bankinnskudd reduseres "
             "ikke (F8 lb 55, 56 og 88, manualen 7.4).",
             [f"Formuesverdien faller med rabatten på fondet: {kr(FLYTT4)} × 20 % = {kr(rabatt4)}.",
              f"Fondet er {kr(FLYTT4)}/{kr(MV4)} = 20 % av markedsverdiene. Gjeld på fondet: {kr(GJ4)} × 20 % = "
              f"{kr(gj_fond4)}. Den reduseres med 20 %, altså {kr(red4)}.",
              f"Nettoformuen faller med {kr(rabatt4)} − {kr(red4)} = <b>kr {kr(a4)}</b>."],
             [(f"Kr {kr(g4_red)}", "gjeldsreduksjonen er glemt. Bare rabatten på fondet er regnet med."),
              (f"Kr {kr(g4_fortegn)}", f"gjeldsreduksjonen er lagt til rabatten: {kr(rabatt4)} + {kr(red4)}. Mindre "
               "fradrag for gjeld gir høyere nettoformue, ikke lavere."),
              (f"Kr {kr(g4_alt)}", f"hele fondet er regnet som lånefinansiert, slik at gjelden reduseres med 20 % × "
               f"{kr(FLYTT4)} = {kr(rabatt4)}. Bare {kr(gj_fond4)} av gjelden faller på fondet.")],
             f"Før flyttingen: {kr(0.25 * BOL4)} + {kr(BANK4)} − {kr(GJ4)} = {kr(netto_for)}. Etter: {kr(0.25 * BOL4)} + "
             f"{kr(0.80 * FLYTT4)} + {kr(BANK4 - FLYTT4)} − {kr(GJ4 - red4)} = {kr(netto_etter)}. Differansen er "
             f"{kr(a4)}. ✓",
             "Gjeldsreduksjonen spiser en del av rabatten. Andelen er gjeldsgraden. Dagny har gjeld lik halve "
             f"markedsverdien. Da er halve rabatten borte. Svaret må ligge mellom 0 og {kr(rabatt4)}."))
EX.append(oppgave(4, "Fra bankinnskudd til aksjefond", "Formuesskatt", [7], "", [p]))

# ======================================================================= 5
print("\nOppgave 5: Ditlev og utbyttet fra Hemne Rør AS")
FV5, tau5, te5, S5 = 7_000_000, 0.01, 0.40, 25_000
F5 = FV5 * tau5                                     # 70 000
a5 = (F5 - te5 * S5) / (1 - te5)                    # 100 000
g5_skj = F5 / (1 - te5)                             # skjermingen glemt: 116 667
g5_fortegn = (F5 + te5 * S5) / (1 - te5)            # skjermingen øker skatten: 133 333
g5_sats = (F5 - S5) / (1 - te5)                     # hele skjermingsfradraget trukket fra formuesskatten: 75 000
assert lik(a5, 100_000) and lik(a5 - te5 * (a5 - S5), F5) and kr(g5_skj) == "116 667" and kr(g5_fortegn) == "133 333"
assert lik(g5_sats, 75_000)
print(f"   formuesskatt {F5}, utbytte {a5}; gale {g5_skj:.2f}, {g5_fortegn:.2f}, {g5_sats}")
p = ledd("", f"<p>Ditlev eier alle aksjene i Hemne Rør AS. Aksjene har en formuesverdi på kr {kr(FV5)} etter "
             "verdsettingsrabatten. Formuesskatten er 1 %. Ditlev har ingen annen likviditet og må ta et utbytte som "
             "dekker både formuesskatten og eierskatten på utbyttet. Skjermingsfradraget på aksjene er kr "
             f"{kr(S5)} dette året. Anta forenklet at eierskatten er 40 % av skattepliktig utbytte. Du kan se bort fra "
             "bunnfradrag. Hvor stort utbytte må Ditlev ta? Rund av til nærmeste krone.</p>",
         K(a5),
         [K(g5_skj), K(g5_fortegn), K(g5_sats)],
         sol("Utbyttet U skal dekke formuesskatten F og eierskatten. Eierskatten treffer bare utbyttet over "
             "skjermingsfradraget S. Da er U − 40 % × (U − S) = F (F4 lb 37 og 38, manualen 8.4).",
             [f"Formuesskatt: {kr(FV5)} × 1 % = {kr(F5)}.",
              f"U − 0,40 × (U − {kr(S5)}) = {kr(F5)}, så 0,60 × U = {kr(F5)} − {kr(te5 * S5)} = {kr(F5 - te5 * S5)}.",
              f"U = {kr(F5 - te5 * S5)}/0,60 = <b>kr {kr(a5)}</b>."],
             [(f"Kr {kr(g5_skj)}", f"skjermingen er glemt: {kr(F5)}/0,60. Det er svaret når hele utbyttet skattlegges, "
               "som i H2025 oppgave 6."),
              (f"Kr {kr(g5_fortegn)}", f"skjermingen er lagt til i stedet for trukket fra: ({kr(F5)} + {kr(te5 * S5)})/"
               "0,60."),
              (f"Kr {kr(g5_sats)}", f"hele skjermingsfradraget er trukket fra formuesskatten: ({kr(F5)} − {kr(S5)})/0,60. "
               f"Skjermingen sparer bare skatten på {kr(S5)}, altså {kr(te5 * S5)}.")],
             f"Utbytte {kr(a5)}. Skattepliktig {kr(a5 - S5)}. Eierskatt {kr(te5 * (a5 - S5))}. Igjen {kr(a5)} − "
             f"{kr(te5 * (a5 - S5))} = {kr(a5 - te5 * (a5 - S5))}, som er formuesskatten. ✓",
             f"Skjermingen gjør utbyttet mindre enn uten skjerming, {kr(g5_skj)}. Det stryker to alternativer. Skjermingen "
             f"er verdt 40 % av {kr(S5)}, ikke hele beløpet."))
EX.append(oppgave(5, "Utbyttet som skal dekke formuesskatten", "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: Gyda, formuesskatten og en evig kontantstrøm")
V6, UTB6, SLUTT6, tau6, FA6 = 100.0, 3.0, 102.0, 0.01, 0.80
avk6 = UTB6 + (SLUTT6 - V6)                         # 5 mill.
r6 = avk6 / V6                                      # 5 %
fs6 = V6 * FA6 * tau6                               # 0,8 mill.
a6a = fs6 / avk6                                    # 16,00 %
g6a_utb = fs6 / UTB6                                # bare utbyttet: 26,67 %
g6a_rab = V6 * tau6 / avk6                          # rabatten glemt: 20,00 %
g6a_etter = fs6 / (avk6 - fs6)                      # delt på avkastningen etter formuesskatt: 19,05 %
ralt6 = r6 - FA6 * tau6                             # Gydas alternativavkastning etter formuesskatt: 4,2 %
CF6 = 2.6
a6b = CF6 / r6                                      # 52,0
g6b_alt = CF6 / ralt6                               # diskontert med 4,2 %: 61,9
g6b_fire = CF6 / (r6 - tau6)                        # diskontert med 4 %: 65,0
g6b_utb = CF6 / (UTB6 / V6)                         # diskontert med utbytteavkastningen 3 %: 86,7
a6c = CF6 / (ralt6 + tau6)                          # 50,0
g6c_noytral = a6b                                   # 52,0
g6c_glemt = g6b_alt                                 # 61,9
g6c_halv = (CF6 - tau6 * a6b) / r6                  # skatten trukket fra, men diskontert med 5 %: 41,6
assert lik(a6a, 0.16) and lik(g6a_rab, 0.20) and lik(ralt6, 0.042) and lik(a6b, 52) and lik(a6c, 50)
assert lik((CF6 - tau6 * a6c) / a6c, ralt6) and lik(g6b_fire, 65) and lik(g6c_halv, 41.6)
print(f"   a {a6a}: {g6a_utb:.4f}, {g6a_rab}, {g6a_etter:.4f}; b {a6b}: {g6b_alt:.3f}, {g6b_fire}, {g6b_utb:.3f}; "
      f"c {a6c}: {g6c_noytral}, {g6c_glemt:.3f}, {g6c_halv}")
body6 = ("<p>Anta at kapitalmarkedet er effisient, slik at investeringer i samme risikoklasse gir samme avkastning før "
         f"skatt. Ved inngangen til året kjøper Gyda aksjer i et børsnotert selskap for kr {kr(V6)} mill. I løpet av "
         f"året får hun kr {kr(UTB6)} mill. i utbytte. Ved utgangen av året er aksjene verdt kr {kr(SLUTT6)} mill. Hun "
         "betaler 1 % formuesskatt av formuesverdien ved inngangen til året. Aksjer verdsettes til 80 % av "
         "markedsverdien. Satsen er forenklet. Se bort fra bunnfradrag og skatt på kapitalinntekt.</p>")
pa = ledd("a", "<p>Hvor stor del av avkastningen på aksjene dette året tar formuesskatten? Svar med to desimaler.</p>",
          P(a6a),
          [P(g6a_utb), P(g6a_rab), P(g6a_etter)],
          sol("Avkastningen er utbyttet pluss verdistigningen. Formuesskatten regnes av formuesverdien ved inngangen "
              "til året, altså 80 % av markedsverdien (F8 lb 13, 14 og 27, manualen 8.1 og 8.2).",
              [f"Avkastning: {kr(UTB6)} + ({kr(SLUTT6)} − {kr(V6)}) = {kr(avk6)} mill., altså {pst(r6, 0)}.",
               f"Formuesskatt: {kr(V6)} × 80 % × 1 % = {kr(fs6, 1)} mill.",
               f"Andel: {kr(fs6, 1)}/{kr(avk6)} = <b>{pst(a6a)}</b>."],
              [(pst(g6a_utb), f"bare utbyttet er regnet som avkastning: {kr(fs6, 1)}/{kr(UTB6)}. Verdistigningen på "
                f"{kr(SLUTT6 - V6)} mill. er også avkastning."),
               (pst(g6a_rab), f"aksjerabatten er glemt: {kr(V6 * tau6)}/{kr(avk6)}."),
               (pst(g6a_etter), f"skatten er delt på avkastningen etter formuesskatt: {kr(fs6, 1)}/{kr(avk6 - fs6, 1)}.")],
              f"Formelen τ × 80 %/r = 0,8 %/5 % = {pst(a6a, 0)}. ✓ Gyda sitter igjen med 5 % − 0,8 % = {pst(ralt6, 1)}."))
pb = ledd("b", f"<p>Gyda vurderer også en investering med samme risiko som gir kr {kr(CF6, 1)} mill. i året til evig "
               "tid. Hva er den verdt for en investor som ikke betaler formuesskatt? Svar i millioner med én "
               "desimal.</p>",
          M(a6b),
          [M(g6b_alt), M(g6b_fire), M(g6b_utb)],
          sol("En evig kontantstrøm er verdt kontantstrømmen delt på avkastningskravet. Kravet er markedsavkastningen i "
              "risikoklassen, som er avkastningen på aksjene i innledningen (F8 lb 17 og 19, manualen 8.3).",
              [f"Markedsavkastningen er {pst(r6, 0)} (delspørsmål a).",
               f"Verdi: {kr(CF6, 1)}/0,05 = <b>{kr(a6b, 1)} mill.</b>"],
              [(f"{kr(g6b_alt, 1)} mill.", f"diskontert med {pst(ralt6, 1)}, Gydas avkastning etter formuesskatt. "
                "Spørsmålet gjelder en investor uten formuesskatt."),
               (f"{kr(g6b_fire, 1)} mill.", "diskontert med 4 %: 1 % formuesskatt er trukket fra kravet til en investor "
                "som ikke betaler den."),
               (f"{kr(g6b_utb, 1)} mill.", f"diskontert med utbytteavkastningen på 3 %. Kravet er hele avkastningen, "
                "også verdistigningen.")],
              f"{kr(a6b, 1)} × 5 % = {kr(a6b * r6, 1)} mill. i året. ✓"))
pc = ledd("c", "<p>Investeringen i b får ingen verdsettingsrabatt: formuesverdien er 100 % av det Gyda betaler for "
               "den. Alternativet hennes er aksjene i innledningen. Hva er investeringen høyst verdt for Gyda? Svar i "
               "millioner med én desimal.</p>",
          M(a6c),
          [M(g6c_noytral), M(g6c_glemt), M(g6c_halv)],
          sol("Gyda betaler høyst den prisen V som gir henne samme avkastning etter formuesskatt som alternativet. "
              f"Aksjene gir henne 5 % − 0,8 % = {pst(ralt6, 1)}. Investeringen gir kontantstrømmen minus 1 % av V (F8 lb "
              "18, 20, 21 og 24, manualen 8.3).",
              [f"Krav: ({kr(CF6, 1)} − 0,01 × V)/V = 0,042.",
               f"{kr(CF6, 1)}/V = 0,042 + 0,01 = 0,052.",
               f"V = {kr(CF6, 1)}/0,052 = <b>{kr(a6c, 1)} mill.</b>"],
              [(f"{kr(g6c_noytral, 1)} mill.", "verdien uten formuesskatt. Formuesskatten er nøytral bare når "
                "investeringen og alternativet verdsettes likt (F8 lb 21). Her har alternativet rabatt og investeringen "
                "ikke."),
               (f"{kr(g6c_glemt, 1)} mill.", f"formuesskatten på investeringen er glemt: {kr(CF6, 1)}/0,042."),
               (f"{kr(g6c_halv, 1)} mill.", f"skatten er trukket fra kontantstrømmen, men kravet er holdt på 5 %: "
                f"({kr(CF6, 1)} − {kr(tau6 * a6b, 2)})/0,05.")],
              f"Med V = {kr(a6c, 1)}: formuesskatt {kr(tau6 * a6c, 1)}, netto {kr(CF6 - tau6 * a6c, 1)} og "
              f"{kr(CF6 - tau6 * a6c, 1)}/{kr(a6c, 1)} = {pst(ralt6, 1)}. ✓",
              f"Speilbildet av unoterte aksjer i F8 lb 24: der har investeringen størst rabatt og er verdt mer enn i "
              f"markedet. Her har den minst rabatt. Da må svaret ligge under {kr(a6b, 1)} mill."))
EX.append(oppgave(6, "Formuesskatt som avkastningsskatt og en evig kontantstrøm", "Formuesskatt som avkastningsskatt",
                  [8], body6, [pa, pb, pc]))

# ======================================================================= 7
print("\nOppgave 7: Stykkskatt med helningene oppgitt")
P0_7, dD7, dS7, t7 = 40.0, 20.0, 30.0, 5.0
andel7 = dS7 / (dS7 + dD7)                          # 0,6
a7a = P0_7 + andel7 * t7                            # 43
p7 = a7a - t7                                       # 38
g7a_byttet = P0_7 + (1 - andel7) * t7               # 42
g7a_alt = P0_7 + t7                                 # 45
g7a_likt = P0_7 + t7 / 2                            # 42,50
dx7 = (a7a - P0_7) * dD7                            # 60
assert lik(a7a, 43) and lik(p7, 38) and lik(dx7, (P0_7 - p7) * dS7) and lik(g7a_byttet, 42)
print(f"   P {a7a}, p {p7}, andel {andel7}, kvantum faller {dx7}; gale {g7a_byttet}, {g7a_alt}, {g7a_likt}")
body7 = (f"<p>I et marked med frikonkurranse er prisen kr {kr(P0_7)} uten skatt. Tilbud og etterspørsel er lineære. "
         f"Stiger prisen konsumentene betaler med én krone, faller etterspurt kvantum med {kr(dD7)} enheter. Stiger "
         f"prisen produsentene får med én krone, øker tilbudt kvantum med {kr(dS7)} enheter. Myndighetene innfører en "
         f"stykkskatt på kr {kr(t7)} per enhet som produsentene betaler inn.</p>")
pa = ledd("a", "<p>Hvilken pris betaler konsumentene etter at skatten er innført?</p>",
          K(a7a),
          [K(g7a_byttet), K(g7a_alt), K(g7a_likt, 2)],
          sol("Konsumentprisen stiger med andelen S′/(S′ − D′) av skatten, der S′ er helningen på tilbudet og D′ "
              "helningen på etterspørselen (F9 lb 7 til 10, manualen 11.2). Med lineære kurver gjelder formelen eksakt.",
              [f"S′ = {kr(dS7)} og D′ = −{kr(dD7)}. Andel: {kr(dS7)}/({kr(dS7)} + {kr(dD7)}) = {kr(andel7, 1)}.",
               f"Prisøkning: {kr(andel7, 1)} × {kr(t7)} = {kr(andel7 * t7)}.",
               f"Konsumentpris: {kr(P0_7)} + {kr(andel7 * t7)} = <b>kr {kr(a7a)}</b>."],
              [(f"Kr {kr(g7a_byttet)}", f"helningene er byttet om: {kr(dD7)}/{kr(dS7 + dD7)} = 0,4. Det er produsentenes "
                "andel."),
               (f"Kr {kr(g7a_alt)}", "hele skatten er lagt på prisen. Det skjer bare når etterspørselen er helt "
                "uelastisk eller tilbudet perfekt elastisk."),
               (f"Kr {kr(g7a_likt, 2)}", "skatten er delt likt. Det gjelder bare når helningene er like store.")],
              f"Med konsumentpris {kr(a7a)} faller etterspørselen med {kr(a7a - P0_7)} × {kr(dD7)} = {kr(dx7)}. "
              f"Produsentene får {kr(a7a)} − {kr(t7)} = {kr(p7)}, så tilbudet faller med {kr(P0_7 - p7)} × {kr(dS7)} = "
              f"{kr(dx7)}. Markedet klarerer. ✓"))
pb = ledd("b", "<p>Hvor stor andel av skatten bærer konsumentene?</p>",
          P(andel7, 0),
          [P(1 - andel7, 0), P(0.5, 0), P(1.0, 0)],
          sol("Konsumentenes andel er prisøkningen de møter, delt på skatten. Den minst prisfølsomme siden bærer mest "
              "(F9 lb 14, manualen 11.4).",
              [f"Konsumentprisen stiger fra {kr(P0_7)} til {kr(a7a)}, altså {kr(a7a - P0_7)} kroner.",
               f"Andel: {kr(a7a - P0_7)}/{kr(t7)} = <b>{pst(andel7, 0)}</b>."],
              [(pst(1 - andel7, 0), f"produsentenes andel: prisen de får, faller fra {kr(P0_7)} til {kr(p7)}."),
               (pst(0.5, 0), "lik deling. Det krever like helninger."),
               (pst(1.0, 0), f"hele skatten er regnet som veltet over, som om prisen steg til kr {kr(g7a_alt)}. Det krever "
                "helt uelastisk etterspørsel eller perfekt elastisk tilbud (F9 lb 11).")],
              f"Etterspørselen reagerer minst ({kr(dD7)} mot {kr(dS7)} enheter per krone). Da bærer konsumentene mest. "
              f"{pst(andel7, 0)} + {pst(1 - andel7, 0)} = 100 %. ✓"))
pc = ledd("c", "<p>Anta i stedet at etterspurt kvantum ikke reagerer på prisen i det hele tatt. Tilbudet og skatten er "
               "som før. Hvilket utsagn er riktig?</p>",
          B(f"Konsumentprisen stiger med kr {kr(t7)} og omsatt kvantum er uendret"),
          [B(f"Produsentprisen faller med kr {kr(t7)} og omsatt kvantum er uendret"),
           B(f"Konsumentprisen stiger med kr {kr(t7)} og omsatt kvantum faller med {kr(t7 * dS7)} enheter"),
           B(f"Konsumentprisen stiger med kr {kr(andel7 * t7)} og omsatt kvantum faller med {kr(dx7)} enheter")],
          sol("Er etterspørselen helt uelastisk, er D′ = 0 og ∂P/∂t = S′/(S′ − 0) = 1. Konsumentene bærer hele skatten. "
              "Produsentprisen er uendret, så tilbudt kvantum er også uendret (F9 lb 11 og 15, manualen 11.4). "
              f"Forelesningens eksempel er insulin. <b>Konsumentprisen stiger med kr {kr(t7)} og kvantum er "
              "uendret.</b>",
              None,
              [("Produsentprisen faller", "det er tilfellet med helt uelastisk tilbud eller perfekt elastisk "
                "etterspørsel. Da bærer produsentene skatten."),
               (f"Kvantum faller med {kr(t7 * dS7)}", f"regner {kr(t7)} × {kr(dS7)}, som om produsentprisen falt med hele "
                "skatten. Produsentprisen er uendret. Kjøperne kjøper dessuten like mye uansett pris."),
               (f"Kr {kr(andel7 * t7)} og {kr(dx7)} enheter", "svaret fra a og b. Det gjelder den opprinnelige "
                "etterspørselen.")],
              None,
              "Kvantum kan ikke falle når kjøperne ikke reagerer på prisen. Det stryker to alternativer. Den som ikke "
              "kan vike unna, bærer skatten."))
EX.append(oppgave(7, "Stykkskatt i et marked med lineære kurver", "Skatteincidens", [11], body7, [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: Eieren, bedriften og banken")
t8 = 0.22
gjeld8 = (1 - 2 * t8) / (1 - t8)                    # kravet med gjeld som andel av r: 0,718
assert 0 < gjeld8 < 1 and lik((1 - 0 * t8 - t8) / (1 - t8), 1.0)
# kontroll av formelen: siste krone i bedriften etter skatt = banken etter skatt
for _a, _tk, _ta, _r in [(0.0, 0.22, 0.22, 0.05), (1.0, 0.22, 0.22, 0.05), (0.4, 0.25, 0.15, 0.04), (1.0, 0.3, 0.0, 0.06)]:
    _F = _r * (1 - _a * _tk - _ta) / (1 - _tk)
    assert lik(_F - _tk * (_F - _a * _r), _r * (1 - _ta))
    # samme som forelesningens form r[1 + tk(1 − α)/(1 − tk) − ta/(1 − tk)]
    assert lik(_F, _r * (1 + _tk * (1 - _a) / (1 - _tk) - _ta / (1 - _tk)))
# strategitesten: tk = 0 og α = 0 skal gi r(1 − ta). Bare det riktige uttrykket gjør det.
_tk, _ta, _al, _r = 0.0, 0.3, 0.0, 1.0
_alt8 = [_r * (1 - _al * _tk - _ta) / (1 - _tk), _r * (1 - _al * _tk) / (1 - _tk),
         _r * (1 - _al * _tk + _ta) / (1 - _tk), _r * (1 - _al * _ta - _tk) / (1 - _tk)]
assert lik(_alt8[0], _r * (1 - _ta)) and not any(lik(x, _r * (1 - _ta)) for x in _alt8[1:])
print(f"   med t = 22 %: egenkapital r, gjeld {gjeld8:.4f} r")
body8 = ("<p>En eier kan investere beløpet K i sin egen bedrift eller sette pengene i banken til renten r. Bedriften gir "
         "inntekten F(K), med F′(K) &gt; 0 og F″(K) &lt; 0. Bedriften betaler skatten tᵏ av F(K) − αrK, der α er andelen "
         "av kapitalkostnaden rK som kan trekkes fra. Renteinntekten i banken skattlegges med tᵃ hos eieren. Se bort "
         "fra kapitalslit og skatt på utbytte.</p>")
pa = ledd("a", "<p>Hvilken betingelse bestemmer den optimale investeringen K i bedriften?</p>",
          B("F′(K) = r(1 − αtᵏ − tᵃ)/(1 − tᵏ)"),
          [B("F′(K) = r(1 − αtᵏ)/(1 − tᵏ)"),
           B("F′(K) = r(1 − αtᵏ + tᵃ)/(1 − tᵏ)"),
           B("F′(K) = r(1 − αtᵃ − tᵏ)/(1 − tᵏ)")],
          sol("Eieren investerer til den siste kronen i bedriften gir det samme etter skatt som banken. Banken gir "
              "r(1 − tᵃ). Den siste kronen i bedriften gir F′(K) minus skatten tᵏ[F′(K) − αr] (F6 lb 7 til 13).",
              ["F′(K) − tᵏ[F′(K) − αr] = r(1 − tᵃ).",
               "F′(K)(1 − tᵏ) = r(1 − tᵃ) − αtᵏr = r(1 − αtᵏ − tᵃ).",
               "<b>F′(K) = r(1 − αtᵏ − tᵃ)/(1 − tᵏ)</b>."],
              [("r(1 − αtᵏ)/(1 − tᵏ)", "skatten på eierens alternativ er glemt. Det er formen fra H2025 oppgave 7, der "
                "bedriften ses isolert."),
               ("r(1 − αtᵏ + tᵃ)/(1 − tᵏ)", "feil fortegn foran tᵃ. Skatt på bankrenten gjør alternativet dårligere og "
                "senker kravet til bedriften (F6 lb 13)."),
               ("r(1 − αtᵃ − tᵏ)/(1 − tᵏ)", "satsene er byttet om i telleren. Fradragsandelen α hører til "
                "bedriftsskatten tᵏ.")],
              "Med tᵃ = 0 og α = 1 gir formelen F′(K) = r, som uten skatt (F6 lb 14). Med tᵃ = 0 gir den "
              "r(1 − αtᵏ)/(1 − tᵏ), som i H2025. Forelesningen skriver det samme som r[1 + tᵏ(1 − α)/(1 − tᵏ) − "
              "tᵃ/(1 − tᵏ)]. ✓",
              "Sett inn tᵏ = 0 og α = 0. Da betaler bedriften ingen skatt. Kravet må da være bankrenten etter skatt, "
              "r(1 − tᵃ). Bare ett av uttrykkene gir det."))
pb = ledd("b", "<p>Med ren egenkapital er α = 0. Med ren gjeld er α = 1. Anta at tᵏ = tᵃ, slik som i Norge, der "
               "selskapsoverskudd og renteinntekter skattlegges med samme sats. Hva er riktig om kravet til F′(K) i "
               "betingelsen fra a?</p>",
          B("Egenkapital: kravet er r. Gjeld: kravet er lavere enn r"),
          [B("Egenkapital: kravet er høyere enn r. Gjeld: kravet er r"),
           B("Egenkapital: kravet er r. Gjeld: kravet er også r"),
           B("Egenkapital: kravet er lavere enn r. Gjeld: kravet er r")],
          sol("Sett tᵏ = tᵃ = t i betingelsen fra a. Med α = 0 blir kravet r(1 − t)/(1 − t) = r. Med α = 1 blir det "
              "r(1 − 2t)/(1 − t), som er lavere enn r. Med t = 22 % er det "
              f"{kr(gjeld8, 3)} × r (F6 lb 14 og 15). <b>Egenkapital gir kravet r. Gjeld gir et lavere krav.</b>",
              None,
              [("Egenkapital høyere enn r, gjeld r", "bedriften sett isolert, som i H2025 oppgave 7: r/(1 − t) og r. Da "
                "er skatten på eierens alternativ glemt."),
               ("Begge r", "nøytralitet krever tᵏ(1 − α) = tᵃ (F6 lb 15). Med like satser holder det bare for α = 0."),
               ("Egenkapital lavere enn r, gjeld r", "byttet om. Det er gjelden som får fradrag for kapitalkostnaden i "
                "tillegg til at alternativet skattlegges.")],
              None,
              "Konklusjonen er den samme som i H2025: gjeld har lavest krav og favoriseres. Det nye er nivået. Når "
              "eierens alternativ også skattlegges, er egenkapitalen nøytralt behandlet og gjelden subsidiert."))
EX.append(oppgave(8, "Eieren, bedriften og banken", "Bedriftens tilpasning", [9], body8, [pa, pb]))

# ======================================================================= 9
print("\nOppgave 9: Hallgeir og somrene i Norge")
DAG9 = 92                                           # juni 30 + juli 31 + august 31
assert DAG9 == 30 + 31 + 31
etter27 = 2 * DAG9                                  # 184 ved utgangen av august 2027
mangler9 = 271 - etter27                            # dag nummer 87 i 2028 gir 271 dager
assert etter27 == 184 and 3 * DAG9 > 270 and mangler9 == 87 and DAG9 < 183
print(f"   {etter27} dager etter to somre, passerer 270 på dag {mangler9} i 2028 (i august), snitt {DAG9} per år")
p = ledd("", "<p>Hallgeir ble skattemessig emigrert fra Norge i 2020 og bor i Spania. Fra 2026 er han i Norge i juni, "
             f"juli og august hvert år ({DAG9} dager). Resten av året er han ikke i Norge. Hvilket utsagn er riktig "
             "etter forelesningen om utflytting?</p>",
         B("Bosatt i Norge fra 1. januar 2028, året han passerer 270 dager på 36 måneder"),
         [B("Ikke bosatt i Norge, fordi han aldri er her mer enn 183 dager på tolv måneder"),
          B("Bosatt i Norge fra 1. januar 2027, året han passerer 183 dager til sammen"),
          B("Bosatt i Norge fra dagen i august 2028 da han passerer 270 dager på 36 måneder")],
         sol("En som er emigrert, blir skattemessig bosatt igjen ved opphold over 183 dager i en tolvmånedersperiode "
             "eller over 270 dager i en 36-månedersperiode. Passeres 270 dager, er han bosatt fra 1. januar i året "
             f"terskelen passeres (F7 lb 10). Etter somrene i 2026 og 2027 har Hallgeir {etter27} dager. I august 2028 "
             f"passerer han 270. <b>Han er bosatt i Norge fra 1. januar 2028.</b>",
             None,
             [("Ikke bosatt", f"ser bare på grensen på 183 dager. Den holder han, men {DAG9} dager i året er mer enn "
               "snittet på 90 dager som 270-regelen tillater (F7 lb 10)."),
              ("Fra 2027", f"de 183 dagene må falle innenfor en tolvmånedersperiode. Hallgeir har {etter27} dager til "
               f"sammen i august 2027, men aldri mer enn {DAG9} dager på tolv måneder."),
              ("Fra dagen i august", "bostedet gjelder fra 1. januar i året terskelen passeres, ikke fra dagen.")],
             None,
             "To regler løper samtidig. Sjekk begge: flest dager i tolv måneder og flest dager i 36 måneder. Tre somre "
             f"på {DAG9} dager er {3 * DAG9} dager."))
EX.append(oppgave(9, "Hallgeir og somrene i Norge", "Internasjonal skatt", [13], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Dina og den skattefrie obligasjonen")
R10, rr10, t10, B10 = 0.06, 0.045, 0.40, 200_000
a10 = B10 * (R10 - rr10)                            # 3 000
impl10 = (R10 - rr10) / R10                         # 25 %
g10_ekspl = B10 * R10 * t10                         # eksplisitt skatt på A: 4 800
g10_tjener = B10 * rr10 - B10 * R10 * (1 - t10)     # det hun tjener på B: 1 800
g10_egen = B10 * rr10 * t10                         # 40 % av renten på B: 3 600
assert lik(a10, 3000) and lik(impl10, 0.25) and lik(g10_ekspl, 4800) and lik(g10_tjener, 1800) and lik(g10_egen, 3600)
assert lik(a10, B10 * R10 * impl10) and lik(g10_ekspl, a10 + g10_tjener) and t10 > impl10
print(f"   implisitt skatt {a10} (sats {impl10}); gale {g10_ekspl}, {g10_tjener}, {g10_egen}")
p = ledd("", "<p>To obligasjoner har samme risiko og løpetid. Obligasjon A gir 6 % rente, som skattlegges. Obligasjon B "
             "gir 4,5 % rente og er skattefri. Kapitalmarkedet er velfungerende. Dina har 40 % skatt på renteinntekter "
             f"og har kr {kr(B10)} i obligasjon B. Hvor mye implisitt skatt betaler Dina per år?</p>",
         K(a10),
         [K(g10_ekspl), K(g10_tjener), K(g10_egen)],
         sol("Den implisitte skatten er den lavere avkastningen før skatt på et skattefavorisert aktivum. Den betales "
             "som lavere rente og går til utstederen, ikke til staten. Satsen er (R − r)/R (F10 lb 14 til 16, manualen "
             "12.4).",
             ["Rentetap ved å eie B i stedet for A: 6 % − 4,5 % = 1,5 prosentpoeng.",
              f"Implisitt skatt: {kr(B10)} × 1,5 % = <b>kr {kr(a10)}</b>.",
              f"Som sats: (6 % − 4,5 %)/6 % = {pst(impl10, 0)} av renten på A."],
             [(f"Kr {kr(g10_ekspl)}", f"den eksplisitte skatten hun ville betalt på A: {kr(B10 * R10)} × 40 %. Hennes "
               "egen sats bestemmer ikke den implisitte skatten. Den bestemmes i markedet."),
              (f"Kr {kr(g10_tjener)}", f"det hun tjener på å velge B: {kr(B10 * rr10)} mot {kr(B10 * R10 * (1 - t10))} "
               "etter skatt på A."),
              (f"Kr {kr(g10_egen)}", f"40 % av renten på B: {kr(B10 * rr10)} × 40 %. Renten på B er skattefri.")],
             f"Staten taper {kr(g10_ekspl)} når Dina velger B. Utstederen sparer {kr(a10)} i rente og Dina tjener "
             f"{kr(g10_tjener)}: {kr(a10)} + {kr(g10_tjener)} = {kr(g10_ekspl)} (F10 lb 19). ✓",
             f"Den implisitte satsen er {pst(impl10, 0)}. Dina har 40 %, så B er riktig valg for henne (F10 lb 17). Det "
             "hun betaler implisitt, må være mindre enn det hun ville betalt eksplisitt."))
EX.append(oppgave(10, "Dina og den skattefrie obligasjonen", "Implisitt skatt", [12], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Negativ inntektsskatt")
m11, BL11 = 0.40, 60_000
Y11 = [100_000, 200_000, 600_000]
T11 = [m11 * y - BL11 for y in Y11]                 # −20 000, 20 000, 180 000
t11 = [T / y for T, y in zip(T11, Y11)]             # −20 %, 10 %, 30 %
null11 = BL11 / m11                                 # 150 000: der netto skatt er null
assert lik(T11[0], -20_000) and lik(t11[1], 0.10) and lik(t11[2], 0.30) and lik(null11, 150_000)
assert t11[0] < t11[1] < t11[2]
print(f"   netto skatt {T11}, gjennomsnittsskatt {t11}, null ved {null11}")
p = ledd("", "<p>Et land innfører negativ inntektsskatt. All inntekt skattlegges med 40 %. Hver innbygger får i tillegg "
             f"kr {kr(BL11)} i skattefri borgerlønn fra staten. Skatten regnes netto, altså skatt minus borgerlønn. "
             "Hvilket utsagn om systemet er riktig?</p>",
         B("Det er progressivt, fordi gjennomsnittsskatten stiger med inntekten"),
         [B("Det er proporsjonalt, fordi alle betaler 40 % av inntekten i skatt"),
          B("Det er regressivt, fordi borgerlønnen er like stor for rik og fattig"),
          B(f"Det er progressivt bare over kr {kr(null11)}, der netto skatt blir positiv")],
         sol("Et skattesystem er progressivt når gjennomsnittsskatten stiger med bruttoinntekten (F7 lb 22). Med negativ "
             f"inntektsskatt er netto skatt 40 % av inntekten minus {kr(BL11)}. Gjennomsnittsskatten er 40 % − "
             f"{kr(BL11)}/Y, som stiger med Y. Ved inntekt {kr(Y11[0])} er den {pst(t11[0], 0)}, ved {kr(Y11[1])} er den "
             f"{pst(t11[1], 0)} og ved {kr(Y11[2])} er den {pst(t11[2], 0)} (F7 lb 40 og 41). <b>Systemet er "
             "progressivt.</b>",
             None,
             [("Proporsjonalt", "krever at betalt skatt er samme andel av inntekten for alle (F7 lb 20). Det holder bare "
               "uten fradrag og overføringer. Marginalskatten er 40 % for alle, men ikke gjennomsnittsskatten."),
              ("Regressivt", "snudd. Et likt kronebeløp betyr mest for dem med lavest inntekt. Det er nettopp det som "
               "gjør systemet progressivt."),
              (f"Bare over kr {kr(null11)}", f"gjennomsnittsskatten stiger for alle inntekter, også under "
               f"{kr(null11)}, der den går fra negativ mot null.")],
             None,
             "Regn gjennomsnittsskatten for to inntekter. Stiger den, er systemet progressivt. Forelesningen viser at "
             "borgerlønn gir mest progressivitet av de tre flate skattene (F7 lb 41)."))
EX.append(oppgave(11, "Flat skatt med borgerlønn", "Progressivitet", [10], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Inntektsskiftingslikningen når en firedel av avgiften veltes over")
tl12, aga12, del12, ts12, te12 = 0.47, 0.12, 0.25, 0.20, 0.20
# F5 lb 10 (2026): delen arbeidstakeren bærer står på lønnssiden, delen bedriften bærer
# legges til selskapsskatten på høyre side. 50/50: 47,4 + 6,2 = 22 + 6,2 + 22y.
arb12 = aga12 * del12                               # 3 %
bed12 = aga12 * (1 - del12)                         # 9 %
eier12 = tl12 + arb12 - ts12 - bed12                # 21 %
y12 = eier12 / te12                                 # 1,05
e_hele = tl12 + aga12 - ts12                        # alt på arbeidstakeren: 39 %
e_ingen = tl12 - ts12                               # avgiften utelatt helt: 27 %
e_glemt = tl12 + arb12 - ts12                       # bedriftens del glemt på høyre side: 30 %
assert lik(eier12, 0.21) and lik(y12, 1.05) and lik(e_hele / te12, 1.95)
assert lik(e_ingen / te12, 1.35) and lik(e_glemt / te12, 1.50)
print(f"   eierskatt {eier12}, faktor {y12}; gale {e_hele}, {e_ingen}, {e_glemt}")


def FE(e):
    return (f"Faktor {kr(e / te12, 2)} og eierskatt {pst(e, 0)}", [kr(e / te12, 2), pst(e, 0)])


p = ledd("", "<p>Myndighetene vil at det ikke skal lønne seg å ta ut lønn som utbytte. De bruker "
             "inntektsskiftingslikningen. Høyeste marginalskatt på lønn er 47 %. Arbeidsgiveravgiften utgjør 12 % av "
             "lønnskostnaden. Myndighetene legger til grunn at en firedel av avgiften veltes over på arbeidstakeren og "
             "at bedriften bærer resten. Anta forenklet at selskapsskatten og den nominelle eierskatten begge er 20 %. "
             "Hva blir oppjusteringsfaktoren og den effektive eierskatten?</p>",
         FE(eier12),
         [FE(e_hele), FE(e_ingen), FE(e_glemt)],
         sol("Inntektsskiftingslikningen legger sammen nominelle satser (F5 lb 3 og 4). Delen av "
             "arbeidsgiveravgiften som arbeidstakeren bærer, står på lønnssiden. Delen bedriften bærer, legges til "
             "selskapsskatten på kapitalsiden (F5 lb 10: ved 50/50 er det 47,4 % + 6,2 % = 22 % + 6,2 % + 22 % × y).",
             [f"Arbeidstakeren bærer 12 % × ¼ = 3 %, bedriften 12 % × ¾ = 9 %.",
              f"47 % + 3 % = 20 % + 9 % + 20 % × y, så 20 % × y = {pst(eier12, 0)}.",
              f"Oppjusteringsfaktor: {pst(eier12, 0)}/20 % = {kr(y12, 2)}. <b>Faktor {kr(y12, 2)} og eierskatt "
              f"{pst(eier12, 0)}</b>."],
             [(f"Faktor {kr(e_hele / te12, 2)} og {pst(e_hele, 0)}", "hele avgiften er lagt på lønnssiden, som om alt "
               "veltes over på arbeidstakeren. Det er forutsetningen i dagens likning, ikke i oppgaven."),
              (f"Faktor {kr(e_ingen / te12, 2)} og {pst(e_ingen, 0)}", "avgiften er utelatt helt, på begge sider."),
              (f"Faktor {kr(e_glemt / te12, 2)} og {pst(e_glemt, 0)}", "arbeidstakerens firedel er riktig lagt til, men "
               "bedriftens tre firedeler er glemt på høyre side.")],
             f"Høyre side: 20 % + 9 % + 20 % × {kr(y12, 2)} = {pst(ts12 + bed12 + te12 * y12, 0)} = venstre side 50 %. ✓",
             "Jo mindre av avgiften arbeidstakeren bærer, jo lavere eierskatt. Hele avgiften på lønnssiden gir "
             f"{pst(e_hele, 0)} og hele hos bedriften gir {pst(tl12 - ts12 - aga12, 0)}. En firedel gir et svar nær det "
             "laveste."))
EX.append(oppgave(12, "Inntektsskiftingslikningen og arbeidsgiveravgiften", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: Helga, Merton og humankapitalen")
mer13, var13, gam13 = 0.06, 0.04, 2.0
w13 = mer13 / (gam13 * var13)                       # 75 %
g13a_sd = mer13 / (gam13 * math.sqrt(var13))        # standardavviket i nevneren: 15 %
g13a_gam = mer13 / var13                            # γ glemt: 150 %
g13a_var = mer13 / gam13                            # variansen glemt: 3 %
F13, H13 = 2_400_000, 600_000
tot13 = F13 + H13                                   # 3 000 000
aks13 = w13 * tot13                                 # 2 250 000
fri13 = tot13 - aks13                               # 750 000 risikofritt i alt
bank13 = fri13 - H13                                # 150 000
g13b_fin = (1 - w13) * F13                          # 25 % av finansformuen: 600 000
g13b_tot = fri13                                    # hele den risikofrie delen i banken: 750 000
g13b_pluss = fri13 + H13                            # humankapitalen lagt til: 1 350 000
F13c, H13c = 2_800_000, 200_000                     # eksempel ti år senere, samme totalformue
assert lik(w13, 0.75) and lik(g13a_sd, 0.15) and lik(g13a_gam, 1.5) and lik(g13a_var, 0.03)
assert lik(aks13, 2_250_000) and lik(bank13, 150_000) and lik(aks13 + bank13, F13) and lik(g13b_fin, 600_000)
assert F13c + H13c == tot13 and aks13 <= F13c
print(f"   w {w13}: {g13a_sd}, {g13a_gam}, {g13a_var}; bank {bank13}: {g13b_fin}, {g13b_tot}, {g13b_pluss}; "
      f"andel nå {aks13 / F13:.4f}, senere {aks13 / F13c:.4f}")
body13 = ("<p>Aksjemarkedets meravkastning over risikofri rente er 0,06 og variansen er 0,04. Helga har risikoaversjon "
          "γ = 2 og bruker Mertons formel for optimal andel av totalformuen i aksjer.</p>")
p1 = ledd("1", "<p>Helga har bare finansiell formue. Hvor stor andel av formuen bør hun ha i aksjer?</p>",
          P(w13, 0),
          [P(g13a_sd, 0), P(g13a_gam, 0), P(g13a_var, 0)],
          sol("Mertons andel er w = (E(r) − r<sub>f</sub>)/(γσ²). Telleren er meravkastningen. Nevneren er "
              "risikoaversjonen ganget med variansen (F12 Aksjesparing lb 11 og 12, manualen 14.4).",
              ["γσ² = 2 × 0,04 = 0,08. Variansen er oppgitt direkte, så den skal ikke kvadreres eller tas roten av.",
               f"w = 0,06/0,08 = <b>{pst(w13, 0)}</b>."],
              [(pst(g13a_sd, 0), "standardavviket er brukt i nevneren: √0,04 = 0,2 og 0,06/(2 × 0,2)."),
               (pst(g13a_gam, 0), "risikoaversjonen er glemt: 0,06/0,04."),
               (pst(g13a_var, 0), "variansen er glemt: 0,06/2.")],
              f"Snu formelen: γ = 0,06/({kr(w13, 2)} × 0,04) = {kr(mer13 / (w13 * var13))}. ✓",
              "Les om oppgaven oppgir varians eller standardavvik. H2025 oppga variansen, forelesningen oppgir "
              "standardavviket."))
p2 = ledd("2", f"<p>Anta i stedet at Helga har en finansformue på kr {kr(F13)} og en humankapital (nåverdien av framtidig "
               f"lønn) på kr {kr(H13)}. Humankapitalen er risikofri. Hvor mye av finansformuen bør stå i banken?</p>",
          K(bank13),
          [K(g13b_fin), K(g13b_tot), K(g13b_pluss)],
          sol("Andelen w gjelder totalformuen, altså finansformue pluss humankapital. Risikofri humankapital virker som "
              "et bankinnskudd. Den dekker derfor en del av det som skal være risikofritt (F12 lb 14, manualen 14.5).",
              [f"Totalformue: {kr(F13)} + {kr(H13)} = {kr(tot13)}. Aksjer: {pst(w13, 0)} × {kr(tot13)} = {kr(aks13)}.",
               f"Risikofritt i alt: {kr(tot13)} − {kr(aks13)} = {kr(fri13)}. Humankapitalen dekker {kr(H13)} av det.",
               f"I banken: {kr(fri13)} − {kr(H13)} = <b>kr {kr(bank13)}</b>."],
              [(f"Kr {kr(g13b_fin)}", f"25 % av finansformuen alene. Humankapitalen er glemt."),
               (f"Kr {kr(g13b_tot)}", "hele den risikofrie delen er satt i banken. Humankapitalen er allerede risikofri "
                "og skal trekkes fra."),
               (f"Kr {kr(g13b_pluss)}", f"humankapitalen er lagt til i stedet for trukket fra: {kr(fri13)} + {kr(H13)}.")],
              f"Aksjer {kr(aks13)} + bank {kr(bank13)} = {kr(F13)}, hele finansformuen. Aksjene er "
              f"{pst(aks13 / F13, 2)} av finansformuen og {pst(w13, 0)} av totalformuen. ✓"))
p3 = ledd("3", "<p>Ti år senere er finansformuen større og humankapitalen mindre, men totalformuen er den samme. "
               "Humankapitalen er fortsatt risikofri og γ er uendret. Hva er riktig?</p>",
          ("Aksjebeløpet i kroner er uendret. Andelen av finansformuen i aksjer faller", []),
          [("Aksjebeløpet i kroner øker. Andelen av finansformuen i aksjer er uendret", []),
           ("Aksjebeløpet i kroner faller. Andelen av finansformuen i aksjer faller også", []),
           ("Aksjebeløpet i kroner er uendret. Andelen av finansformuen i aksjer øker", [])],
          sol("Mertons formel gir aksjebeløpet som w ganget med totalformuen. Totalformuen og w er uendret, så "
              f"aksjebeløpet er fortsatt {kr(aks13)}. Finansformuen har vokst, så det samme beløpet er en mindre andel av "
              f"den. Er finansformuen for eksempel {kr(F13c)} og humankapitalen {kr(H13c)}, faller andelen fra "
              f"{pst(aks13 / F13, 2)} til {pst(aks13 / F13c, 2)}. Derfor har unge høyere aksjeandel enn eldre (F12 lb 17, "
              "manualen 14.5). <b>Beløpet er uendret og andelen faller.</b>",
              None,
              [("Beløpet øker, andelen uendret", "holder andelen av finansformuen fast. Det er totalformuen formelen "
                "gjelder, ikke finansformuen."),
               ("Beløpet faller, andelen faller", "tror at eldre skal selge aksjer. Andelen faller fordi nevneren "
                "vokser, ikke fordi aksjebeløpet krymper."),
               ("Beløpet uendret, andelen øker", "feil vei. Mer finansformue med samme aksjebeløp gir lavere andel.")],
              None,
              "Skill mellom kroner og andel. Kronebeløpet følger totalformuen. Andelen måles mot finansformuen, som "
              "vokser når humankapitalen gjøres om til sparing."))
EX.append(oppgave(13, "Mertons aksjeandel og humankapitalen", "Porteføljevalg", [14], body13, [p1, p2, p3]))

# ======================================================================= 14
print("\nOppgave 14: Fanny og drivhusene")
W14, L14, p14, PR14 = 6_250_000, 2_250_000, 0.04, 120_000
EU0 = (1 - p14) * math.sqrt(W14) + p14 * math.sqrt(W14 - L14)        # 2 480
EUf = math.sqrt(W14 - PR14)                                         # 2 475,88
forv14 = p14 * L14                                                  # 90 000
maks14 = W14 - EU0 ** 2                                             # 99 600
g14b_rp = maks14 - forv14                                           # risikopremien: 9 600
g14b_rot = W14 - ((math.sqrt(W14) + math.sqrt(W14 - L14)) / 2) ** 2    # uvektet snitt av nyttene: 1 187 500
PRh, DEKh = PR14 / 2, L14 / 2                                       # 60 000 og 1 125 000
Wh_ok, Wh_brann = W14 - PRh, W14 - L14 + DEKh - PRh                 # 6 190 000 og 5 065 000
EUh = (1 - p14) * math.sqrt(Wh_ok) + p14 * math.sqrt(Wh_brann)      # 2 478,47
EUh_feil = (1 - p14) * math.sqrt(W14) + p14 * math.sqrt(W14 - L14 + DEKh)   # premien glemt: 2 490,55
assert lik(EU0, 2480) and lik(maks14, 99_600) and lik(forv14, 90_000) and lik(g14b_rot, 1_187_500)
assert EU0 > EUh > EUf and EUh_feil > EU0 and PR14 > maks14
assert kr(EUf, 2) == "2 475,88" and kr(EUh, 2) == "2 478,47"
assert EU0 - EUh > 1 and EUh - EUf > 2              # rangeringen avgjøres ikke av avrunding
print(f"   EU uten {EU0}, full {EUf:.3f}, halv {EUh:.3f} (premien glemt {EUh_feil:.3f}); maks {maks14}, forv. tap {forv14}")
body14 = (f"<p>Fanny driver et gartneri og har en formue på kr {kr(W14)}. Av dette er kr {kr(L14)} drivhusene. Med "
          "sannsynlighet 4 % blir drivhusene totalskadd av storm i løpet av året. Resten av formuen er trygg. Fanny "
          "har nyttefunksjonen U(W) = √W, der W er formuen ved årets slutt.</p>")
p1 = ledd("1", f"<p>Et forsikringsselskap tilbyr full dekning for en premie på kr {kr(PR14)}. Bør Fanny kjøpe "
               "forsikringen?</p>",
          ("Nei, fordi forventet nytte blir lavere med forsikringen", []),
          [("Ja, fordi forventet nytte blir høyere med forsikringen", []),
           ("Ja, fordi forsikringen fjerner all risiko for en risikoavers person", []),
           ("Hun er indifferent, fordi forventet nytte er lik med og uten", [])],
          sol("Sammenlign forventet nytte, ikke forventet formue. Med full dekning er formuen sikker (manualen 17.2).",
              [f"Uten forsikring: 0,96 × √{kr(W14)} + 0,04 × √{kr(W14 - L14)} = 0,96 × {kr(math.sqrt(W14))} + 0,04 × "
               f"{kr(math.sqrt(W14 - L14))} = {kr(EU0, 2)}.",
               f"Med forsikring: √({kr(W14)} − {kr(PR14)}) = √{kr(W14 - PR14)} = {kr(EUf, 2)}.",
               f"{kr(EUf, 2)} &lt; {kr(EU0, 2)}. <b>Hun bør ikke kjøpe.</b>"],
              [("Ja, høyere forventet nytte", f"feil regning. {kr(EUf, 2)} er lavere enn {kr(EU0, 2)}."),
               ("Ja, fjerner all risiko", "det er sant at risikoen blir borte, men prisen avgjør. Full dekning er sikkert "
                f"best bare til aktuarisk rettferdig premie (H2024 oppgave 11). Her er premien {kr(PR14)} mot forventet "
                f"erstatning {kr(forv14)}."),
               ("Indifferent", f"nyttene er ikke like. Hun er indifferent først ved premien {kr(maks14)} "
                "(delspørsmål 2).")],
              f"Høyeste premie er {kr(maks14)}. Tilbudet på {kr(PR14)} ligger over. ✓",
              "Ingen av alternativene kan strykes uten regning. Regn de to nyttene. Det tar to linjer."))
p2 = ledd("2", "<p>Hva er den høyeste premien Fanny er villig til å betale for full dekning? Svar i hele kroner.</p>",
          K(maks14),
          [K(forv14), K(g14b_rp), K(g14b_rot)],
          sol("Den høyeste premien X gjør henne indifferent: nytten av den sikre formuen W − X er lik forventet nytte "
              "uten forsikring (manualen 17.3).",
              [f"Forventet nytte uten forsikring: {kr(EU0)}.",
               f"√({kr(W14)} − X) = {kr(EU0)}, så {kr(W14)} − X = {kr(EU0)}² = {kr(EU0 ** 2)}.",
               f"X = {kr(W14)} − {kr(EU0 ** 2)} = <b>kr {kr(maks14)}</b>."],
              [(f"Kr {kr(forv14)}", f"forventet tap, 4 % × {kr(L14)}. Det er den aktuarisk rettferdige premien, ikke den "
                "høyeste."),
               (f"Kr {kr(g14b_rp)}", f"risikopremien: {kr(maks14)} − {kr(forv14)}. Det er påslaget hun tåler over "
                "forventet tap."),
               (f"Kr {kr(g14b_rot)}", f"nyttene er vektet likt, uten sannsynlighetene: ({kr(math.sqrt(W14))} + "
                f"{kr(math.sqrt(W14 - L14))})/2 = {kr((math.sqrt(W14) + math.sqrt(W14 - L14)) / 2)} og {kr(W14)} − "
                f"{kr((math.sqrt(W14) + math.sqrt(W14 - L14)) / 2)}².")],
              f"√({kr(W14)} − {kr(maks14)}) = √{kr(W14 - maks14)} = {kr(math.sqrt(W14 - maks14))}, lik forventet nytte "
              "uten forsikring. ✓",
              f"Svaret må ligge over forventet tap, {kr(forv14)}, fordi hun er risikoavers. Det må ligge under "
              f"{kr(PR14)}, fordi hun sa nei i delspørsmål 1."))
p3 = ledd("3", f"<p>Selskapet tilbyr i stedet å dekke halve tapet for halve premien, kr {kr(PRh)}. Hvordan rangerer "
               "Fanny de tre valgene etter forventet nytte?</p>",
          ("Ingen forsikring er best, deretter halv dekning og til slutt full dekning", []),
          [("Halv dekning er best, deretter ingen forsikring og til slutt full dekning", []),
           ("Ingen forsikring er best, deretter full dekning og til slutt halv dekning", []),
           ("Halv dekning er best, deretter full dekning og til slutt ingen forsikring", [])],
          sol("Med halv dekning er formuen fortsatt usikker. Premien betales i begge utfall. Ved storm får hun halve "
              "tapet dekket (manualen 17.4).",
              [f"Ingen storm: {kr(W14)} − {kr(PRh)} = {kr(Wh_ok)}, nytte {kr(math.sqrt(Wh_ok), 2)}.",
               f"Storm: {kr(W14 - L14)} + {kr(DEKh)} − {kr(PRh)} = {kr(Wh_brann)}, nytte "
               f"{kr(math.sqrt(Wh_brann), 2)}.",
               f"Forventet nytte: 0,96 × {kr(math.sqrt(Wh_ok), 2)} + 0,04 × {kr(math.sqrt(Wh_brann), 2)} = "
               f"{kr(EUh, 2)}. Ingen forsikring gir {kr(EU0, 2)} og full dekning {kr(EUf, 2)}. <b>Ingen forsikring, så "
               "halv dekning, så full dekning.</b>"],
              [("Halv, ingen, full", f"premien er glemt. Uten den blir forventet nytte med halv dekning "
                f"{kr(EUh_feil, 2)}, over {kr(EU0, 2)}."),
               ("Ingen, full, halv", "bygger på H2025 oppgave 13, der halv dekning kostet like mye som full. Her er "
                "premien også halvert."),
               ("Halv, full, ingen", "bygger på at forsikring alltid er bedre enn ingen forsikring for en risikoavers "
                "person. Det gjelder bare når premien er lav nok.")],
              f"Premien er {kr(PR14 / forv14, 2)} ganger forventet erstatning i begge tilbudene. Med et slikt påslag er "
              "full dekning ikke lenger best (manualen 17.2). Her er påslaget så høyt at også halv dekning taper mot "
              "ingen forsikring. ✓",
              "Full dekning ble avvist i delspørsmål 1, så den kan ikke stå foran ingen forsikring. Det stryker ett "
              "alternativ. Resten avgjøres av ett regnestykke."))
EX.append(oppgave(14, "Forventet nytte, full dekning og halv dekning", "Forsikring og forventet nytte", [17], body14,
                  [p1, p2, p3]))

# ======================================================================= 15
print("\nOppgave 15: Frivillig eller obligatorisk pensjon")
p = ledd("", "<p>Folketrygdens alderspensjon utbetales så lenge man lever. Alle må være med. Forelesningen om pensjon "
             "sier at denne forsikringen mot å leve lenge ikke ville fungert like godt som en frivillig ordning. Hvilket "
             "forsikringsproblem oppstår når ordningen er frivillig?</p>",
         ("Ugunstig utvalg: de som venter å leve lenge, blir med, mens de andre lar være", []),
         [("Moralsk hasard: de som blir med, tar større risiko fordi pensjonen er sikret", []),
          ("Systematisk risiko: levealderen til medlemmene kan ikke spres i en frivillig ordning", []),
          ("Overforsikring: de som blir med, får utbetalt mer enn de har betalt inn", [])],
         sol("Folketrygden er en forsikring mot å leve lenge: de som lever lenge, får utbetalt mer og de andre mindre "
             "(F13 Pensjon lb 20). Forelesningen spør om forsikringen ville fungert like bra som frivillig og svarer "
             "nei (F13 lb 21 og 22). Grunnen er ugunstig utvalg: den som vet at han har høy risiko, kjøper "
             "forsikringen. Her er «risikoen» å leve lenge. Da må premien settes etter dem. De andre faller fra. "
             "Løsningen er obligatorisk medlemskap (manualen 17.6). <b>Ugunstig utvalg.</b>",
             None,
             [("Moralsk hasard", "handler om at den forsikrede endrer atferd etter at avtalen er inngått. Problemet her "
               "oppstår før, når folk velger om de vil være med."),
              ("Systematisk risiko", "hvor lenge den enkelte lever, er i hovedsak uavhengig fra person til person og kan "
               "spres. Det gjelder også i en frivillig ordning."),
              ("Overforsikring", "at noen får mer enn de betalte inn, er selve forsikringen. Andre får mindre.")],
             None,
             "Spør når problemet oppstår. Før avtalen, ved valget om å være med: ugunstig utvalg. Etter avtalen, i "
             "atferden: moralsk hasard."))
EX.append(oppgave(15, "Frivillig eller obligatorisk pensjon", "Forsikring", [17, 15], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Eilif og uttaksalderen")
BEH16, DT62, DT67 = 3_675_000, 21.0, 17.5
pen62 = BEH16 / DT62                                # 175 000
pen67 = BEH16 / DT67                                # 210 000
a16 = pen67 - pen62                                 # 35 000
g16_spart = 5 * pen62 / DT67                        # fem års pensjon fordelt på delingstallet: 50 000
assert lik(pen62, 175_000) and lik(pen67, 210_000) and lik(a16, 35_000) and lik(g16_spart, 50_000)
print(f"   62 år {pen62}, 67 år {pen67}, forskjell {a16}; gale {g16_spart}, {pen62}, {pen67}")
p = ledd("", f"<p>Eilif har en pensjonsbeholdning i folketrygden på kr {kr(BEH16)}. Anta at delingstallet er "
             f"{kr(DT62, 1)} ved uttak fra 62 år og {kr(DT67, 1)} ved uttak fra 67 år. Anta også at beholdningen "
             "er den samme ved begge tidspunktene. Hvor mye høyere blir den årlige alderspensjonen hvis Eilif venter "
             "med uttaket til han er 67 år?</p>",
         K(a16),
         [K(g16_spart), K(pen62), K(pen67)],
         sol("Årlig alderspensjon er pensjonsbeholdningen delt på delingstallet. Delingstallet er lavere jo senere du "
             "tar ut pensjonen, så årlig pensjon blir høyere (F13 Pensjon lb 14 og 19, manualen 15.3).",
             [f"Uttak fra 62 år: {kr(BEH16)}/{kr(DT62, 1)} = {kr(pen62)}.",
              f"Uttak fra 67 år: {kr(BEH16)}/{kr(DT67, 1)} = {kr(pen67)}.",
              f"Forskjell: {kr(pen67)} − {kr(pen62)} = <b>kr {kr(a16)}</b>."],
             [(f"Kr {kr(g16_spart)}", f"fem års pensjon som ikke tas ut, 5 × {kr(pen62)}, er fordelt på delingstallet "
               f"{kr(DT67, 1)}. Pensjonen regnes av beholdningen, ikke av det han lot være å ta ut."),
              (f"Kr {kr(pen62)}", "pensjonen ved uttak fra 62 år, ikke forskjellen."),
              (f"Kr {kr(pen67)}", "pensjonen ved uttak fra 67 år, ikke forskjellen.")],
             f"Forholdet mellom delingstallene er {kr(DT62, 1)}/{kr(DT67, 1)} = {kr(DT62 / DT67, 2)}. Pensjonen blir "
             f"20 % høyere: {kr(pen62)} × {kr(DT62 / DT67, 2)} = {kr(pen67)}. ✓ I forelesningens eksempel er "
             "for 1970-kullet er delingstallene 21,15 og 17,08. Yngre kull har høyere tall. Tallene her er forenklet.",
             "Spørsmålet gjelder forskjellen. To av alternativene er selve pensjonene. De er mellomtall."))
EX.append(oppgave(16, "Eilif og uttaksalderen", "Pensjon", [15], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: Dorthe bytter jobb")
p = ledd("", "<p>Dorthe har jobbet åtte år i en privat bedrift med ytelsespensjon. Nå begynner hun i en bedrift med "
             "innskuddspensjon. Hva skjer med pensjonen hun har tjent opp hos den gamle arbeidsgiveren, ifølge "
             "forelesningen om pensjon?</p>",
         B("Hun får en fripolise som sikrer rettighetene. Den inngår ikke på egen pensjonskonto"),
         [B("Hun får et pensjonskapitalbevis, som samles på egen pensjonskonto i den nye jobben"),
          B("Hun mister opptjeningen, fordi ytelsespensjon krever at hun står i jobben til 67 år"),
          B("Hun får verdien utbetalt som lønn når hun slutter. Den skattlegges samme år")],
         sol("Slutter du i en bedrift med privat ytelsespensjon, får du normalt en fripolise som sikrer de opptjente "
             "rettighetene, forutsatt minst 12 måneders medlemskap. Fripoliser inngår ikke på egen pensjonskonto (F13 "
             "Pensjon lb 24, 29 og 30, manualen 15.4). <b>Dorthe får en fripolise, som holdes utenfor egen "
             "pensjonskonto.</b>",
             None,
             [("Pensjonskapitalbevis", "det gjelder innskuddspensjon. Kapitalen fra en innskuddsordning samles normalt "
               "på egen pensjonskonto hos ny arbeidsgiver (F13 lb 29)."),
              ("Mister opptjeningen", "opptjente rettigheter sikres når medlemskapet har vart minst 12 måneder. Dorthe "
               "har åtte år."),
              ("Utbetalt som lønn", "pensjonsrettighetene kan ikke tas ut ved jobbskifte. De står til pensjonsalder.")],
             None,
             "Hold de to parene fra hverandre: ytelsespensjon gir fripolise, innskuddspensjon gir pensjonskapitalbevis. "
             "Bare pensjonskapitalbeviset samles på egen pensjonskonto."))
EX.append(oppgave(17, "Dorthe bytter jobb", "Pensjon", [15], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: Carsten og fondene som har overlevd")
p = ledd("", "<p>Carsten leser at de fleste aktive aksjefondene som har eksistert i 20 år, har slått indeksen sin. "
             "Malkiel (1995) pekte på «survivorship bias» i slike tall. Hva betyr det ifølge forelesningen om "
             "aksjesparing?</p>",
         ("Dårlige fond legges ned og faller ut av tallene, så aktive fond ser bedre ut enn de var", []),
         [("Gode fond stenges for nye kunder og faller ut av tallene, så aktive fond ser dårligere ut", []),
          ("Fond som har overlevd lenge, har vist at forvalteren er dyktig og vil slå indeksen videre", []),
          ("Indeksfond legges oftere ned enn aktive fond, så indeksen ser bedre ut enn den var", [])],
         sol("Malkiel (1995) fant at aktive forvaltere ikke slår markedet. «Survivorship bias» oppstår fordi dårlige "
             "fond blir lagt ned. De forsvinner ut av statistikken. Det gjør situasjonen enda verre enn tallene viser "
             "(F12 Aksjesparing lb 74). Carsten ser bare vinnerne. <b>Dårlige fond legges ned, så aktive fond ser bedre "
             "ut enn de var.</b>",
             None,
             [("Gode fond faller ut", "snudd. Det er de dårlige fondene som blir borte. Skjevheten pynter på "
               "tallene."),
              ("Overlevelse viser dyktighet", "gode resultater varer sjelden. De 20 beste investorene på 70-tallet ble "
               "slått av markedet på 80-tallet (F12 lb 74)."),
              ("Indeksfond legges ned", "skjevheten gjelder aktive fond som legges ned etter svake resultater. Et "
               "indeksfond følger indeksen uansett.")],
             None,
             "Spør hvem som mangler i tallene. Det er taperne. Et utvalg uten tapere ser alltid for godt ut."))
EX.append(oppgave(18, "Fondene som har overlevd", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 19
print("\nOppgave 19: Herborg og serielånet")
L19, r19, n19, AAR19 = 2_000_000, 0.06, 20, 3
avdr19 = L19 / n19                                  # 100 000
rest19 = L19 - (AAR19 - 1) * avdr19                 # 1 800 000 ved inngangen til år 3
a19 = avdr19 + rest19 * r19                         # 208 000
g19_aar1 = avdr19 + L19 * r19                       # år 1: 220 000
g19_aar2 = avdr19 + (L19 - avdr19) * r19            # år 2: 214 000
g19_aar4 = avdr19 + (L19 - AAR19 * avdr19) * r19    # ett avdrag for mye trukket fra: 202 000
ann19 = L19 * r19 / (1 - (1 + r19) ** -n19)         # annuiteten til sammenligning: 174 369
assert lik(a19, 208_000) and lik(g19_aar1, 220_000) and lik(g19_aar2, 214_000) and lik(g19_aar4, 202_000)
assert kr(ann19) == "174 369"
print(f"   avdrag {avdr19}, restgjeld {rest19}, termin år 3 {a19}; gale {g19_aar1}, {g19_aar2}, {g19_aar4}; "
      f"annuitet {ann19:.2f}")
p = ledd("", f"<p>Herborg låner kr {kr(L19)} til bolig. Lånet er et serielån med {n19} årlige terminer og 6 % rente. "
             f"Første termin forfaller om ett år. Hva er terminbeløpet i år {AAR19}?</p>",
         K(a19),
         [K(g19_aar1), K(g19_aar2), K(g19_aar4)],
         sol("Et serielån har fast avdrag, lånet delt på antall terminer. Terminbeløpet er avdraget pluss renten på "
             "restgjelden ved inngangen til terminen. Det faller derfor med et fast beløp hver termin (manualen 16.2).",
             [f"Avdrag: {kr(L19)}/{n19} = {kr(avdr19)} hvert år.",
              f"Restgjeld ved inngangen til år {AAR19}: {kr(L19)} − 2 × {kr(avdr19)} = {kr(rest19)}. Rente: {kr(rest19)} "
              f"× 6 % = {kr(rest19 * r19)}.",
              f"Terminbeløp: {kr(avdr19)} + {kr(rest19 * r19)} = <b>kr {kr(a19)}</b>."],
             [(f"Kr {kr(g19_aar1)}", f"terminbeløpet i år 1: renten er regnet av hele lånet."),
              (f"Kr {kr(g19_aar2)}", "terminbeløpet i år 2: bare ett avdrag er trukket fra restgjelden."),
              (f"Kr {kr(g19_aar4)}", "terminbeløpet i år 4: tre avdrag er trukket fra. Ved inngangen til år 3 er to "
               "avdrag betalt.")],
             f"Terminbeløpet faller med {kr(avdr19)} × 6 % = {kr(avdr19 * r19)} per år: {kr(g19_aar1)}, {kr(g19_aar2)}, "
             f"{kr(a19)}. ✓ Et annuitetslån ville hatt samme beløp hvert år, {kr(ann19)}.",
             "Alle fire tallene er terminbeløp på samme lån, ett år fra hverandre. Tell avdragene som er betalt før "
             "terminen: i år 3 er det to."))
EX.append(oppgave(19, "Terminbeløpet på et serielån", "Lån", [16], "", [p]))

# ======================================================================= 20
print("\nOppgave 20: Gard, bransjefondet og markedsporteføljen")
rf20, Em20, sm20, sd20 = 0.03, 0.08, 0.20, 0.30
Eb20 = 0.09
vekt20 = sd20 / sm20                                # 1,5
laan20 = vekt20 - 1                                 # 0,5
E20 = vekt20 * Em20 - laan20 * rf20                 # 10,5 %
Ecml = rf20 + (Em20 - rf20) / sm20 * sd20           # kapitalmarkedslinjen
Egb20 = vekt20 * Eb20 - laan20 * rf20               # giret bransjefond: 12 %
sgb20 = vekt20 * sd20                               # med standardavvik 45 %
assert lik(E20, 0.105) and lik(E20, Ecml) and lik(Egb20, 0.12) and lik(sgb20, 0.45) and E20 > Eb20
print(f"   vekt {vekt20}, forventet {E20}, bransjefond {Eb20}; giret bransjefond {Egb20} med standardavvik {sgb20}")
p = ledd("", "<p>Markedsporteføljen har forventet avkastning 8 % og standardavvik 20 %. Risikofri rente er 3 %, både for "
             "innskudd og lån. Gard vil ha høyest mulig forventet avkastning, men standardavviket skal ikke være over "
             "30 %. Han vurderer et bransjefond med forventet avkastning 9 % og standardavvik 30 %. Hva bør han gjøre "
             "ifølge teorien om optimale porteføljer?</p>",
         B(f"Låne 50 % av egenkapitalen og sette alt i markedsporteføljen. Det gir {pst(E20, 1)}"),
         [B("Velge bransjefondet, fordi bare mer risikable aksjer gir høyere forventet avkastning"),
          B("Sette alt i markedsporteføljen uten lån, fordi ingen portefølje gir mer"),
          B(f"Låne 50 % av egenkapitalen og sette alt i bransjefondet. Det gir {pst(Egb20, 1)}")],
         sol("Alle bør kombinere markedsporteføljen med innskudd eller lån til risikofri rente, uansett risikovilje "
             "(separasjonsteoremet). Kapitalmarkedslinjen gir høyest forventet avkastning for hvert nivå av "
             "standardavvik: E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r) − r<sub>f</sub>)/σ<sub>m</sub>] × σ<sub>p</sub>. Den "
             "som vil ha mer risiko enn markedet, bør lånefinansiere (F12 Aksjesparing lb 47 til 51 og 58, manualen 14.3).",
             [f"Standardavvik 30 % krever 30/20 = {kr(vekt20, 1)} ganger egenkapitalen i markedsporteføljen. Han låner "
              "50 %.",
              f"Forventet avkastning: {kr(vekt20, 1)} × 8 % − 0,5 × 3 % = <b>{pst(E20, 1)}</b>.",
              f"Bransjefondet gir 9 % med samme standardavvik. Det ligger under kapitalmarkedslinjen."],
             [("Velge bransjefondet", "markedet betaler ikke for risiko som kan diversifiseres bort (F12 lb 59). "
               f"Bransjefondet gir 9 % der linjen gir {pst(E20, 1)}."),
              ("Markedsporteføljen uten lån", "gir 8 % med standardavvik 20 %. Gard tåler 30 % og kan få mer ved å "
               "gire."),
              ("Gire bransjefondet", f"gir {pst(Egb20, 1)}, men standardavviket blir {kr(vekt20, 1)} × 30 % = "
               f"{pst(sgb20, 0)}. Det er over grensen hans.")],
             f"Kapitalmarkedslinjen: 3 % + (5 %/20 %) × 30 % = {pst(Ecml, 1)}. ✓",
             "Sjekk standardavviket i hvert alternativ før du ser på avkastningen. Bare to alternativer treffer 30 %. Av "
             "dem gir linjen mest."))
EX.append(oppgave(20, "Gard og bransjefondet", "Porteføljevalg", [14], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove16",
    "kind": "mock",
    "label": "Prøveeksamen 16",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Andre trekning av prediksjonen for eksamen 12. november 2026, i H2025-formen: de samme rutinene i samme "
             "rekkefølge, med andre vrier enn prøveeksamen 10 til 15. Oppgave 1 til 12 er skattedelen (18 ledd) og oppgave "
             "13 til 20 finansdelen (12 ledd). Vriene er blant annet det høyeste skattefrie utbyttet etter et år med "
             "ubenyttet skjerming, salg med tap, effektiv skattesats i år 2 med saldoavskrivning, formuesskatten når "
             "penger flyttes fra bank til aksjefond, utbytte til formuesskatt med skjerming, en investering uten "
             "verdsettingsrabatt, helningene oppgitt i ord, skatt på eierens alternativ i F′(K) og halv dekning til "
             "halv premie."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort 6. november. Noen er forenklet. Da sier teksten fra.",
        "Laget av appen ut fra prediksjonen. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Les hva som er ukjent før du regner. Flere ledd spør etter noe annet enn det rutinen vanligvis "
                     "ender i: et kronebeløp i banken, en endring eller en rangering. Nesten hvert galt alternativ er et "
                     "mellomtall eller regnestykket med ett ledd utelatt."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove16.json")
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

