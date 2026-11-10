"""Prøveeksamen 18 (FIE432): regner alle tall, bygger prove18.json og sjekker den.

Fjerde trekning av prediksjonen for eksamen 12. november 2026
(docs/fie432-proveeksamen-spek.md, «Prøveeksamen 18: fjerde trekning: H2024-formen
med nye vrier»). Samme kjernerutiner som prøveeksamen 10–15, men med andre ukjente,
andre feller og temaene som 13–15 ikke rakk (monopol, kontantstrømskatt, AERT).

Kjør:  python3 -I fag/fie432/_prove/prove18_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p18) sier,
3. skriver prove18.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p18"]
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



def mill(x):
    """Millionbeløp: heltall uten desimal, ellers én desimal."""
    v = round(x, 1)
    return kr(v) if lik(v, round(v)) else kr(v, 1)


def MM(a, b):
    """Alternativ med to millionbeløp."""
    return (f"{mill(a)} mill. og {mill(b)} mill.", [mill(a), mill(b)])


def G(x):
    """Alternativ for risikoaversjonen γ."""
    v = round(x, 6)
    t = kr(v) if v == int(v) else kr(v, 1)
    return (f"γ = {t}", [t])


EX = []

# ======================================================================= 1
print("\nOppgave 1: Sigrun og aksjene i Røst Rederi ASA (utbytte i to år, så salg)")
N1, K1 = 1_000, 50.0
r1 = [0.04, 0.05, 0.03]
D1 = [3.00, 1.00]
skj1a = K1 * r1[0]                                  # 2,00 per aksje
skpl1a = max(0.0, D1[0] - skj1a)                    # 1,00 skattepliktig i år 1
ub1a = max(0.0, skj1a - D1[0])                      # 0
grl1b = K1 + ub1a                                   # 50
skj1b = grl1b * r1[1]                               # 2,50
skpl1b = max(0.0, D1[1] - skj1b - ub1a)             # 0
ub1b = max(0.0, ub1a + skj1b - D1[1])               # 1,50 framføres til år 3
assert lik(skj1a, 2.0) and lik(skpl1a, 1.0) and lik(ub1a, 0) and lik(skj1b, 2.5) and lik(skpl1b, 0)
assert lik(ub1b, 1.5)
a1a = N1 * (skpl1a + skpl1b) * TE                   # 378,40
g1a_netto = N1 * max(0.0, sum(D1) - skj1a - skj1b) * TE      # skjermingen i år 2 ført tilbake mot år 1: 0
g1a_opp = N1 * (skpl1a + skpl1b) * 0.22             # oppjustering glemt: 220,00
g1a_aar2 = N1 * (skpl1a + D1[1]) * TE               # skjermingen i år 2 glemt: 756,80
assert lik(a1a, 378.40) and lik(g1a_netto, 0) and lik(g1a_opp, 220) and lik(g1a_aar2, 756.80)
S1 = 62.0
gev1 = N1 * (S1 - K1 - ub1b)                        # 10 500
a1b = gev1 * TE                                     # 3 973,20
uten1 = N1 * (S1 - K1) * TE                         # ubenyttet skjerming glemt: 4 540,80
ub_netto1 = skj1a + skj1b - sum(D1)                 # 0,50: skjerming og utbytte slått sammen over to år
g1b_netto = N1 * (S1 - K1 - ub_netto1) * TE         # 4 351,60
skj1c = (K1 + ub1b) * r1[2]                         # 1,545: skjerming for salgsåret (gis ikke)
g1b_aar3 = N1 * (S1 - K1 - ub1b - skj1c) * TE       # 3 388,57
assert lik(gev1, 10_500) and lik(a1b, 3_973.20) and lik(uten1, 4_540.80) and lik(g1b_netto, 4_351.60)
assert kr(g1b_aar3, 2) == "3 388,57" and lik(ub_netto1, 0.5)
print(f"   a {a1a:.2f}: {g1a_netto:.2f}, {g1a_opp:.2f}, {g1a_aar2:.2f}; ub {ub1b:.2f}")
print(f"   b {a1b:.4f}: {uten1:.4f}, {g1b_netto:.4f}, {g1b_aar3:.4f}")
body1 = (f"<p>Sigrun kjøpte {kr(N1)} aksjer i Røst Rederi ASA for kr {kr(K1)} per aksje i januar år 1. Utbyttet per "
         f"aksje er kr {kr(D1[0], 2)} i år 1 og kr {kr(D1[1], 2)} i år 2. Skjermingsrenten er 4 % i år 1, 5 % i år 2 og "
         "3 % i år 3. Eierskatten er 22 % og oppjusteringsfaktoren 1,72.</p>")
pa = ledd("a", "<p>Hvor mye eierskatt betaler Sigrun til sammen på utbyttene i år 1 og år 2? Svar med to desimaler.</p>",
          K(a1a, 2),
          [K(g1a_netto, 2), K(g1a_opp, 2), K(g1a_aar2, 2)],
          sol("Skjermingen regnes år for år: skjermingsgrunnlaget ganget med årets skjermingsrente. Utbytte over "
              "skjermingen skattlegges det året. Skjerming som ikke brukes, framføres til senere år. Den kan ikke føres "
              "tilbake mot utbytte som allerede er skattlagt (F4 lb 33–34, manualen 5.3).",
              [f"År 1: skjerming {kr(K1)} × 4 % = {kr(skj1a, 2)}. Skattepliktig {kr(D1[0], 2)} − {kr(skj1a, 2)} = "
               f"{kr(skpl1a, 2)} per aksje. Ingenting framføres.",
               f"År 2: skjerming {kr(K1)} × 5 % = {kr(skj1b, 2)}. Utbyttet er {kr(D1[1], 2)}, så ingenting er "
               f"skattepliktig og {kr(ub1b, 2)} framføres.",
               f"Eierskatt: {kr(N1)} × {kr(skpl1a, 2)} × 37,84 % = <b>kr {kr(a1a, 2)}</b>."],
              [(f"Kr {kr(g1a_netto, 2)}", f"de to årene er slått sammen: skjerming {kr(skj1a + skj1b, 2)} mot utbytte "
                f"{kr(sum(D1), 2)}. Skjermingen fra år 2 kan ikke brukes mot utbyttet i år 1."),
               (f"Kr {kr(g1a_opp, 2)}", f"oppjusteringen er glemt: {kr(N1 * skpl1a)} × 22 %."),
               (f"Kr {kr(g1a_aar2, 2)}", f"utbyttet i år 2 er skattlagt uten skjerming: {kr(N1)} × ({kr(skpl1a, 2)} + "
                f"{kr(D1[1], 2)}) × 37,84 %.")],
              f"Skattepliktig utbytte er {kr(N1 * skpl1a)} i år 1 og 0 i år 2. {kr(N1 * skpl1a)} × 1,72 × 22 % = "
              f"{kr(a1a, 2)}. ✓",
              "Regn ett år om gangen. Rekkefølgen på utbyttene betyr noe, fordi skjerming bare kan flyttes framover."))
pb = ledd("b", f"<p>I mars år 3, før årets utbytte, selger Sigrun alle aksjene for kr {kr(S1)} per aksje. Hvor mye skatt "
               "betaler hun på gevinsten? Svar med to desimaler.</p>",
          K(a1b, 2),
          [K(uten1, 2), K(g1b_netto, 2), K(g1b_aar3, 2)],
          sol("Ubenyttet skjerming trekkes fra gevinsten ved salg. Salgsåret gir ingen ny skjerming, fordi skjermingen "
              "går til den som eier aksjen ved årets slutt. Gevinsten oppjusteres med 1,72 og skattlegges med 22 %, "
              "altså 37,84 % (F4 lb 34–35, manualen 5.3 og 5.4).",
              [f"Ubenyttet skjerming ved utgangen av år 2 er {kr(ub1b, 2)} per aksje (fra a).",
               f"Gevinst per aksje: {kr(S1)} − {kr(K1)} − {kr(ub1b, 2)} = {kr(S1 - K1 - ub1b, 2)}. For {kr(N1)} aksjer: "
               f"{kr(gev1)}.",
               f"Skatt: {kr(gev1)} × 37,84 % = <b>kr {kr(a1b, 2)}</b>."],
              [(f"Kr {kr(uten1, 2)}", f"den ubenyttede skjermingen er glemt: {kr(N1 * (S1 - K1))} × 37,84 %."),
               (f"Kr {kr(g1b_netto, 2)}", f"følgefeilen fra a: skjerming og utbytte er slått sammen over to år, så bare "
                f"{kr(ub_netto1, 2)} per aksje står igjen."),
               (f"Kr {kr(g1b_aar3, 2)}", f"det er regnet skjerming for år 3 også: {kr(K1 + ub1b, 2)} × 3 % = "
                f"{kr(skj1c, 2)} per aksje. Hun eier ikke aksjene ved utgangen av år 3.")],
              f"Uten skjerming er skatten {kr(uten1, 2)}. Skjermingen på {kr(N1 * ub1b)} sparer {kr(N1 * ub1b)} × "
              f"37,84 % = {kr(N1 * ub1b * TE, 2)}. {kr(uten1, 2)} − {kr(N1 * ub1b * TE, 2)} = {kr(a1b, 2)}. ✓",
              "Skjermingsrenten for år 3 står i teksten, men brukes ikke. Den som selger før årets slutt, får ingen "
              "skjerming for salgsåret."))
EX.append(oppgave(1, "Utbytte i to år og salg i år 3", "Aksjonærmodellen", [5], body1, [pa, pb]))

# ======================================================================= 2
print("\nOppgave 2: Yngvar, renteinntekt eller aksjegevinst")
R2 = 300_000
etter2 = R2 * (1 - 0.22)                            # 234 000
a2 = etter2 / (1 - TE)                              # 376 447,88
g2_fak = R2 * 1.72                                  # ganget med oppjusteringsfaktoren: 516 000
g2_diff = R2 * (1 + TE - 0.22)                      # satsforskjellen lagt på: 347 520
g2_lik = R2                                         # oppjusteringen glemt: 300 000
assert lik(etter2, 234_000) and kr(a2) == "376 448" and lik(g2_fak, 516_000) and lik(g2_diff, 347_520)
assert lik(100_000 * 0.78 / (1 - TE), 125_482.6, 0.1)   # forelesningens tall (F1 lb 40–41)
print(f"   gevinst {a2:.2f}; gale {g2_fak}, {g2_diff}, {g2_lik}")
p = ledd("", f"<p>Yngvar kan få kr {kr(R2)} i renteinntekt eller en aksjegevinst. Renteinntekten skattlegges med 22 %. "
             "Aksjegevinsten oppjusteres med faktoren 1,72 og skattlegges så med 22 %. Se bort fra skjerming og risiko. "
             "Hvor stor må aksjegevinsten være før skatt for at Yngvar skal sitte igjen med like mye etter skatt? Rund "
             "av til nærmeste krone.</p>",
         K(a2),
         [K(g2_fak), K(g2_diff), K(g2_lik)],
         sol("Renteinntekt skattlegges med 22 %. En aksjegevinst ganges med 1,72 før den skattlegges med 22 %, så den "
             "effektive satsen er 37,84 %. Sett beløpene etter skatt lik hverandre (F1 lb 40–41, manualen 5.1).",
             [f"Renten etter skatt: {kr(R2)} × (1 − 0,22) = {kr(etter2)}.",
              "Gevinsten G etter skatt: G × (1 − 0,3784) = 0,6216G.",
              f"G = {kr(etter2)}/0,6216 = <b>kr {kr(a2)}</b>."],
             [(f"Kr {kr(g2_fak)}", "renteinntekten er ganget med oppjusteringsfaktoren 1,72. Faktoren gjelder grunnlaget "
               "for skatten, ikke beløpet han må tjene."),
              (f"Kr {kr(g2_diff)}", f"forskjellen i sats, 15,84 prosentpoeng, er lagt på renteinntekten: {kr(R2)} × "
               "1,1584. Skatten på tillegget er da glemt."),
              (f"Kr {kr(g2_lik)}", "oppjusteringen er glemt, som om begge inntektene hadde 22 % skatt.")],
             f"{kr(a2)} × 37,84 % = {kr(a2 * TE)} i skatt. {kr(a2)} − {kr(a2 * TE)} = {kr(a2 - a2 * TE)}. ✓ Forelesningen "
             "viser det samme med kr 100 000 i rente mot kr 125 482 i gevinst.",
             f"Gevinsten må være større enn renteinntekten, fordi satsen er høyere. Det stryker kr {kr(g2_lik)}."))
EX.append(oppgave(2, "Renteinntekt eller aksjegevinst", "Aksjonærmodellen", [1, 5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Vibeke og Valdres Bygg AS (AERT for en eier)")
al3, PI3, PT3, SI3, ST3 = 0.10, 400_000, 120_000, 6_000_000, 1_200_000
teller3 = PT3 + al3 * ST3                           # 240 000
nevner3 = PI3 + al3 * SI3                           # 1 000 000
a3 = teller3 / nevner3                              # 24,0 %
g3_pers = PT3 / PI3                                 # bare personnivået: 30,0 %
g3_hele = (PT3 + ST3) / (PI3 + SI3)                 # eierandelen glemt: 20,6 %
g3_teller = teller3 / PI3                           # selskapsinntekten mangler i nevneren: 60,0 %
assert lik(a3, 0.24) and lik(g3_pers, 0.30) and pst(g3_hele, 1) == "20,6 %" and lik(g3_teller, 0.60)
assert lik(PI3 / nevner3 * g3_pers + al3 * SI3 / nevner3 * ST3 / SI3, a3)
print(f"   AERT {a3}; gale {g3_pers}, {g3_hele:.4f}, {g3_teller}")
p = ledd("", f"<p>Vibeke eier 10 % av Valdres Bygg AS. Hun har kr {kr(PI3)} i brutto personinntekt og betaler kr "
             f"{kr(PT3)} i personskatt. Selskapet har kr {kr(SI3)} i skattepliktig inntekt, betaler kr {kr(ST3)} i "
             "selskapsskatt (forenklet sats 20 %) og deler ikke ut utbytte. Hva er Vibekes effektive gjennomsnittlige skattesats (AERT) når "
             "hennes andel av selskapet regnes med?</p>",
         P(a3, 1),
         [P(g3_pers, 1), P(g3_hele, 1), P(g3_teller, 1)],
         sol("For en eier er AERT betalt personskatt pluss eierandelen av selskapets betalte skatt, delt på brutto "
             "personinntekt pluss eierandelen av selskapets inntekt. Eierandelen α står både i telleren og i nevneren "
             "(F5 lb 22–25, manualen 1.6).",
             [f"Teller: {kr(PT3)} + 10 % × {kr(ST3)} = {kr(teller3)}.",
              f"Nevner: {kr(PI3)} + 10 % × {kr(SI3)} = {kr(nevner3)}.",
              f"AERT = {kr(teller3)}/{kr(nevner3)} = <b>{pst(a3, 1)}</b>."],
             [(pst(g3_pers, 1), f"bare personnivået: {kr(PT3)}/{kr(PI3)}. Hennes andel av overskuddet som står igjen i "
               "selskapet, er da usynlig."),
              (pst(g3_hele, 1), f"hele selskapet er regnet med, ikke bare hennes 10 %: {kr(PT3 + ST3)}/{kr(PI3 + SI3)}."),
              (pst(g3_teller, 1), "andelen av selskapsskatten er lagt til i telleren, mens andelen av selskapsinntekten "
               f"mangler i nevneren: {kr(teller3)}/{kr(PI3)}.")],
             f"AERT er et veid snitt av {pst(g3_pers, 0)} på personinntekten og {pst(ST3 / SI3, 0)} i selskapet. Vektene er "
             f"{kr(PI3)} og {kr(al3 * SI3)}: 0,4 × 30 % + 0,6 × 20 % = 24 %. ✓",
             f"Svaret må ligge mellom selskapets {pst(ST3 / SI3, 0)} og personnivåets {pst(g3_pers, 0)}. Det stryker to "
             "alternativer."))
EX.append(oppgave(3, "Effektiv skattesats for en eier", "Effektiv skattesats", [1, 8], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: Åshild med utleieleilighet, aksjer og bankinnskudd")
SEK4, AKS4, BANK4, GJ4 = 4_000_000, 5_000_000, 1_000_000, 4_000_000
mv4 = SEK4 + AKS4 + BANK4                           # 10 000 000
fv4 = SEK4 + 0.80 * AKS4 + BANK4                    # 9 000 000
gj_aks4 = GJ4 * AKS4 / mv4                          # 2 000 000
red4 = gj_aks4 * 0.20                               # 400 000
a4 = fv4 - (GJ4 - red4)                             # 5 400 000
g4_red = fv4 - GJ4                                  # gjeldsreduksjonen glemt: 5 000 000
g4_alt = fv4 - GJ4 * 0.80                           # hele gjelden redusert med 20 %: 5 800 000
g4_prim = 0.25 * SEK4 + 0.80 * AKS4 + BANK4 - (GJ4 - red4)   # leiligheten verdsatt som primærbolig: 2 400 000
assert lik(a4, 5_400_000) and lik(g4_red, 5_000_000) and lik(g4_alt, 5_800_000) and lik(g4_prim, 2_400_000)
print(f"   formuesverdi {fv4}, reduksjon {red4}, netto {a4}; gale {g4_red}, {g4_alt}, {g4_prim}")
p = ledd("", f"<p>Åshild leier boligen hun bor i. Hun eier en utleieleilighet (sekundærbolig) verdt kr {kr(SEK4)}, "
             f"børsnoterte aksjer for kr {kr(AKS4)} og har kr {kr(BANK4)} i banken. Gjelden er kr {kr(GJ4)}. "
             "Sekundærbolig og bankinnskudd verdsettes til 100 % og aksjer til 80 %. Gjelden fordeles forholdsmessig "
             "etter markedsverdiene. Gjeld på aksjene reduseres med 20 %. Hva er Åshilds skattepliktige nettoformue? Se "
             "bort fra bunnfradrag.</p>",
         K(a4),
         [K(g4_red), K(g4_alt), K(g4_prim)],
         sol("Hver eiendel får sin formuesverdi. En sekundærbolig har ingen rabatt. Gjelden fordeles etter "
             "markedsverdiene før rabatt. Gjeld som faller på en eiendel med rabatt, reduseres med samme rabatt. Her "
             "gjelder det bare aksjene (F8 lb 7, 45 og 55–56, manualen 7.2 og 7.4).",
             [f"Formuesverdier: leilighet {kr(SEK4)}, aksjer {kr(AKS4)} × 80 % = {kr(0.80 * AKS4)} og bank {kr(BANK4)}. "
              f"Sum {kr(fv4)}.",
              f"Aksjene er {kr(AKS4)}/{kr(mv4)} = 50 % av markedsverdien. Gjeld på aksjene: {kr(gj_aks4)}. Reduksjon "
              f"20 %: {kr(red4)}. Gjeld til fradrag: {kr(GJ4 - red4)}.",
              f"Nettoformue: {kr(fv4)} − {kr(GJ4 - red4)} = <b>kr {kr(a4)}</b>."],
             [(f"Kr {kr(g4_red)}", f"gjeldsreduksjonen er glemt: {kr(fv4)} − {kr(GJ4)}."),
              (f"Kr {kr(g4_alt)}", f"hele gjelden er redusert med 20 %, ikke bare halvparten som faller på aksjene: "
               f"{kr(fv4)} − {kr(GJ4 * 0.80)}."),
              (f"Kr {kr(g4_prim)}", f"utleieleiligheten er verdsatt til 25 % som en primærbolig. Da blir formuesverdien "
               f"{kr(0.25 * SEK4 + 0.80 * AKS4 + BANK4)}. Rabatten på 75 % gjelder bare boligen du selv bor i.")],
             f"Uten gjeldsreduksjon er nettoformuen {kr(g4_red)}. Reduksjonen løfter den med 20 % av aksjegjelden, "
             f"{kr(red4)}, til {kr(a4)}. ✓",
             "Regn først uten gjeldsreduksjon. Reduksjonen kan bare øke nettoformuen. Økningen er 20 % av gjelden som "
             "faller på aksjene."))
EX.append(oppgave(4, "Nettoformue med utleieleilighet, aksjer og bankinnskudd", "Formuesskatt", [7], "", [p]))

# ======================================================================= 5
print("\nOppgave 5: Svanhild og Tysnes Rør AS (formuesskatt med gjeld, utbyttet som trengs og andel av overskuddet)")
V5, GJ5, BF5 = 15_000_000, 5_000_000, 1_900_000
fv5 = 0.80 * V5                                     # 12 000 000
gjf5 = 0.80 * GJ5                                   # 4 000 000 til fradrag
netto5 = fv5 - gjf5                                 # 8 000 000
fs5 = (netto5 - BF5) * 0.01                         # 61 000
g5a_red = (fv5 - GJ5 - BF5) * 0.01                  # gjeldsreduksjonen glemt: 51 000
g5a_rab = (V5 - GJ5 - BF5) * 0.01                   # ingen rabatter: 81 000
g5a_bf = netto5 * 0.01                              # bunnfradraget glemt: 80 000
assert lik(fs5, 61_000) and lik(g5a_red, 51_000) and lik(g5a_rab, 81_000) and lik(g5a_bf, 80_000)
utb5 = fs5 / (1 - TE)                               # 98 133,85
eier5 = utb5 * TE                                   # 37 133,85
g5b_paa = fs5 * (1 + TE)                            # eierskatten lagt på formuesskatten: 84 082
g5b_opp = fs5 / (1 - 0.22)                          # oppjustering glemt: 78 205
g5b_sats = fs5 / TE                                 # delt på skattesatsen: 161 205
assert kr(utb5) == "98 134" and lik(utb5 - eier5, fs5) and kr(g5b_paa) == "84 082" and kr(g5b_opp) == "78 205"
assert kr(g5b_sats) == "161 205"
OV5 = 600_000
a5c = utb5 / OV5                                    # 16,36 %
g5c_fs = fs5 / OV5                                  # bare formuesskatten: 10,17 %
g5c_eier = eier5 / OV5                              # bare eierskatten: 6,19 %
g5c_verdi = utb5 / V5                               # delt på verdien av aksjene: 0,65 %
assert pst(a5c) == "16,36 %" and pst(g5c_fs) == "10,17 %" and pst(g5c_eier) == "6,19 %" and pst(g5c_verdi) == "0,65 %"
print(f"   a {fs5}: {g5a_red}, {g5a_rab}, {g5a_bf}; b {utb5:.2f}: {g5b_paa:.2f}, {g5b_opp:.2f}, {g5b_sats:.2f}; "
      f"c {a5c:.6f}: {g5c_fs:.6f}, {g5c_eier:.6f}, {g5c_verdi:.6f}")
body5 = (f"<p>Svanhild eier alle aksjene i Tysnes Rør AS. De er verdt kr {kr(V5)} før verdsettingsrabatt. Hun har ingen "
         f"annen formue og kr {kr(GJ5)} i gjeld. Aksjer verdsettes til 80 %. Gjeld på aksjer reduseres med 20 %. "
         f"Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr {kr(BF5)}.</p>")
pa = ledd("a", "<p>Hvor mye formuesskatt betaler Svanhild?</p>",
          K(fs5),
          [K(g5a_red), K(g5a_rab), K(g5a_bf)],
          sol("Aksjene verdsettes til 80 %. Aksjene er eneste eiendel, så hele gjelden faller på dem og reduseres med "
              "20 %. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget (F8 lb 5, 7 og 55–56, manualen 7.1 og "
              "7.4).",
              [f"Formuesverdi: {kr(V5)} × 80 % = {kr(fv5)}.",
               f"Gjeld til fradrag: {kr(GJ5)} × 80 % = {kr(gjf5)}. Nettoformue: {kr(netto5)}.",
               f"({kr(netto5)} − {kr(BF5)}) × 1,0 % = <b>kr {kr(fs5)}</b>."],
              [(f"Kr {kr(g5a_red)}", f"gjelden er trukket fra fullt ut: {kr(fv5)} − {kr(GJ5)} = {kr(fv5 - GJ5)}. "
                "Gjeldsreduksjonen er glemt."),
               (f"Kr {kr(g5a_rab)}", f"ingen rabatter: {kr(V5)} − {kr(GJ5)} = {kr(V5 - GJ5)} før bunnfradraget."),
               (f"Kr {kr(g5a_bf)}", f"bunnfradraget er glemt: {kr(netto5)} × 1,0 %.")],
              f"Rabatten treffer nettoverdien når alt er aksjer: ({kr(V5)} − {kr(GJ5)}) × 80 % = {kr(netto5)}. ✓"))
pb = ledd("b", "<p>Svanhild må ta utbytte for å betale formuesskatten. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. "
               "Se bort fra skjerming. Hvor stort utbytte må hun ta for å dekke både formuesskatten og eierskatten på "
               "utbyttet? Rund av til nærmeste krone.</p>",
          K(utb5),
          [K(g5b_paa), K(g5b_opp), K(g5b_sats)],
          sol("Utbyttet D må dekke formuesskatten og eierskatten på hele utbyttet: D × (1 − 0,3784) = formuesskatt. "
              "Derfor deles formuesskatten på 1 minus eierskatten (F5 lb 50, manualen 8.4).",
              ["Effektiv eierskatt: 22 % × 1,72 = 37,84 %.",
               f"D = {kr(fs5)}/(1 − 0,3784) = {kr(fs5)}/0,6216 = <b>kr {kr(utb5)}</b>."],
              [(f"Kr {kr(g5b_paa)}", f"eierskatten er lagt på formuesskatten: {kr(fs5)} × 1,3784. Da er skatten på selve "
                "skattebeløpet glemt."),
               (f"Kr {kr(g5b_opp)}", f"oppjusteringen er glemt: {kr(fs5)}/(1 − 0,22)."),
               (f"Kr {kr(g5b_sats)}", f"delt på skattesatsen i stedet for på 1 minus satsen: {kr(fs5)}/0,3784.")],
              f"Eierskatt: {kr(utb5)} × 37,84 % = {kr(eier5)}. Igjen: {kr(utb5)} − {kr(eier5)} = {kr(utb5 - eier5)}. ✓",
              f"Utbyttet må være større enn formuesskatten pluss 37,84 % av den, kr {kr(g5b_paa)}. Bare to alternativer "
              "er det."))
pc = ledd("c", f"<p>Selskapet tjener kr {kr(OV5)} etter selskapsskatt i år. Hvor stor del av dette overskuddet går med til "
               "formuesskatten og eierskatten på utbyttet til sammen? Svar med to desimaler.</p>",
          P(a5c),
          [P(g5c_fs), P(g5c_eier), P(g5c_verdi)],
          sol("Formuesskatten kan måles mot avkastningen. Må den betales med utbytte, kommer eierskatten på utbyttet i "
              "tillegg. Samlet kostnad er hele utbyttet (F4 lb 37–38, manualen 8.1 og 8.4).",
              [f"Utbyttet fra b er {kr(utb5)}: formuesskatt {kr(fs5)} og eierskatt {kr(eier5)}.",
               f"{kr(utb5)}/{kr(OV5)} = <b>{pst(a5c)}</b>."],
              [(pst(g5c_fs), f"bare formuesskatten: {kr(fs5)}/{kr(OV5)}."),
               (pst(g5c_eier), f"bare eierskatten: {kr(eier5)}/{kr(OV5)}."),
               (pst(g5c_verdi), f"delt på verdien av aksjene, kr {kr(V5)}, i stedet for på overskuddet.")],
              f"Formuesskatten alene tar {pst(g5c_fs)}. Delt på 0,6216 blir det {pst(g5c_fs / (1 - TE))}. ✓"))
EX.append(oppgave(5, "Formuesskatt på aksjer, utbyttet som trengs og andelen av overskuddet",
                  "Formuesskatt som avkastningsskatt", [7, 8], body5, [pa, pb, pc]))

# ======================================================================= 6
print("\nOppgave 6: Reidar verdsetter et børsnotert og et unotert selskap")
C6, r6, tau6, rab6 = 3.0, 0.06, 0.01, 0.50
mv6 = C6 / r6                                       # 50 mill.
alt6 = r6 - tau6                                    # 5 %: Reidars alternativavkastning
bors6 = (C6 - tau6 * mv6) / alt6                    # 50 mill.
unot6 = (C6 - tau6 * (1 - rab6) * mv6) / alt6       # 55 mill.
g6_disk = ((C6 - tau6 * mv6) / r6, (C6 - tau6 * (1 - rab6) * mv6) / r6)   # diskontert med 6 %: 41,7 og 45,8
g6_teller = (C6 / alt6, C6 / alt6)                  # skatten ikke trukket fra kontantstrømmen: 60 og 60
assert lik(mv6, 50) and lik(bors6, 50) and lik(unot6, 55) and lik(C6 / alt6, 60)
assert mill(g6_disk[0]) == "41,7" and mill(g6_disk[1]) == "45,8"
assert lik(unot6 - mv6, tau6 * rab6 * mv6 / alt6)
print(f"   børsnotert {bors6}, unotert {unot6}; gale {g6_disk}, {g6_teller}")
p = ledd("", "<p>Kapitalmarkedet er effisient og prisene bestemmes av skattefrie utenlandske investorer, som får 6 % "
             "avkastning i en bestemt risikoklasse. Reidar betaler 1 % formuesskatt. Anta forenklet at børsnoterte "
             "aksjer verdsettes til 100 % av markedsverdien og unoterte til 50 %. Alternativet hans er børsnoterte "
             "aksjer. Et børsnotert og et unotert selskap i risikoklassen gir hver kr 3 mill. i året til evig tid. Hva "
             "er de verdt for Reidar, i samme rekkefølge?</p>",
         MM(bors6, unot6),
         [MM(mv6, mv6), MM(*g6_disk), MM(*g6_teller)],
         sol("Markedet verdsetter en evig kontantstrøm til kontantstrømmen delt på avkastningen. Reidars alternativ er "
             "børsnoterte aksjer, som gir ham 6 % − 1 % = 5 % etter formuesskatt. Han diskonterer kontantstrømmen etter "
             "formuesskatt med 5 %. For den børsnoterte aksjen faller teller og nevner like mye. For den unoterte faller "
             "telleren mindre, fordi formuesverdien er lav (F8 lb 17–21 og 24, manualen 8.3).",
             [f"Markedsverdi: 3/0,06 = {mill(mv6)} mill. for begge.",
              f"Børsnotert: formuesskatt 1 % × {mill(mv6)} = 0,5. Verdi (3 − 0,5)/0,05 = {mill(bors6)} mill.",
              f"Unotert: formuesskatt 1 % × 50 % × {mill(mv6)} = 0,25. Verdi (3 − 0,25)/0,05 = <b>{mill(unot6)} "
              "mill.</b>"],
             [(MM(mv6, mv6)[0], "rabatten på den unoterte aksjen er oversett. Den halverer formuesskatten og gir Reidar "
               "en merverdi."),
              (MM(*g6_disk)[0], "kontantstrømmen etter formuesskatt er diskontert med markedets 6 %. Reidars alternativ "
               "gir bare 5 %."),
              (MM(*g6_teller)[0], "kravet er senket til 5 %, men formuesskatten er ikke trukket fra kontantstrømmen: "
               "3/0,05.")],
             f"Merverdien er spart formuesskatt, 0,25 mill. i året, diskontert med 5 %: 0,25/0,05 = "
             f"{mill(unot6 - mv6)} mill. {mill(mv6)} + {mill(unot6 - mv6)} = {mill(unot6)}. ✓",
             "Den børsnoterte aksjen er verdt det samme for Reidar som for markedet. Det stryker to alternativer. Den "
             "unoterte må være verdt mer for ham."))
EX.append(oppgave(6, "Verdien av et børsnotert og et unotert selskap", "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: Stykkskatt med tall, produsentenes del i kroner og monopol")
Da7, Db7, Sc7, t7 = 500, 10, 40, 5
P7_0 = Da7 / (Db7 + Sc7)                            # 10
x7_0 = Sc7 * P7_0                                   # 400
p7 = (Da7 - Db7 * t7) / (Db7 + Sc7)                 # 9
P7 = p7 + t7                                        # 14
x7 = Sc7 * p7                                       # 360
assert lik(P7_0, 10) and lik(x7_0, 400) and lik(p7, 9) and lik(P7, 14) and lik(x7, 360)
assert lik(Da7 - Db7 * P7, x7)
g7a_alt = P7_0 - t7                                 # hele skatten trukket fra: 5
g7a_P = P7                                          # konsumentprisen: 14
g7a_bytt = P7_0 - Sc7 / (Db7 + Sc7) * t7            # andelene byttet: 6
assert lik(g7a_alt, 5) and lik(g7a_bytt, 6)
prov7 = t7 * x7                                     # 1 800
a7b = (P7_0 - p7) * x7                              # 360
g7b_kons = (P7 - P7_0) * x7                         # konsumentenes del: 1 440
g7b_alt = prov7                                     # hele skatteinntekten: 1 800
g7b_x0 = (P7_0 - p7) * x7_0                         # gammelt kvantum: 400
assert lik(a7b, 360) and lik(g7b_kons, 1440) and lik(a7b + g7b_kons, prov7) and lik(g7b_x0, 400)
# monopol med samme etterspørsel P = 50 − x/10 og grensekostnad 10 (bare til kontrollen)
am7, cm7 = Da7 / Db7, 10.0
Pm0 = (am7 + cm7) / 2                               # 30
Pm1 = (am7 + cm7 + t7) / 2                          # 32,50
assert lik(am7, 50) and lik(Pm0, 30) and lik(Pm1 - Pm0, t7 / 2)
print(f"   a p {p7} (P {P7}, x {x7}): {g7a_alt}, {g7a_P}, {g7a_bytt}; b {a7b}: {g7b_kons}, {g7b_alt}, {g7b_x0}; "
      f"monopol {Pm0} til {Pm1}")
body7 = (f"<p>I et marked med frikonkurranse er etterspørselen x = {Da7} − {Db7}P og tilbudet x = {Sc7}p. P er prisen "
         "konsumentene betaler, p prisen produsentene sitter igjen med og x kvantum. Uten skatt er prisen kr "
         f"{kr(P7_0)}. Myndighetene innfører en stykkskatt på kr {kr(t7)} per enhet som produsentene betaler inn, slik at "
         f"P = p + {kr(t7)}.</p>")
pa = ledd("a", "<p>Hvilken pris sitter produsentene igjen med per enhet etter at skatten er innført?</p>",
          K(p7),
          [K(g7a_alt), K(g7a_P), K(g7a_bytt)],
          sol("Sett P = p + t inn i etterspørselen og løs likevekten for produsentprisen (F9 lb 7–10, manualen 11.1 og "
              "11.2).",
              [f"{Da7} − {Db7}(p + {kr(t7)}) = {Sc7}p.",
               f"{kr(Da7 - Db7 * t7)} = {Db7 + Sc7}p.",
               f"p = <b>kr {kr(p7)}</b>. Konsumentene betaler kr {kr(P7)} og kvantum er {kr(x7)}."],
              [(f"Kr {kr(g7a_alt)}", "hele skatten er trukket fra prisen uten skatt, som om tilbudet var helt "
                "uelastisk."),
               (f"Kr {kr(g7a_P)}", "prisen konsumentene betaler, ikke den produsentene sitter igjen med."),
               (f"Kr {kr(g7a_bytt)}", f"andelene er byttet: produsentene bærer {Db7}/{Db7 + Sc7} av skatten, ikke "
                f"{Sc7}/{Db7 + Sc7}.")],
              f"∂p/∂t = D′/(S′ − D′) = −{Db7}/({Sc7} + {Db7}) = −0,2. {kr(P7_0)} − 0,2 × {kr(t7)} = {kr(p7)}. Kvantum: "
              f"{Da7} − {Db7} × {kr(P7)} = {kr(x7)} = {Sc7} × {kr(p7)}. ✓",
              f"Produsentprisen må ligge mellom kr {kr(g7a_alt)} og kr {kr(P7_0)}. Det stryker kr {kr(g7a_P)}."))
pb = ledd("b", "<p>Hvor mange kroner av statens skatteinntekt er det produsentene som bærer?</p>",
          K(a7b),
          [K(g7b_kons), K(g7b_alt), K(g7b_x0)],
          sol("Staten får skatten ganger kvantumet som omsettes etter at skatten er innført. Produsentene bærer den "
              "delen som svarer til fallet i produsentprisen. Konsumentene bærer resten (F9 lb 7, manualen 11.1).",
              [f"Kvantum etter skatt: {Sc7} × {kr(p7)} = {kr(x7)}. Skatteinntekt: {kr(t7)} × {kr(x7)} = {kr(prov7)}.",
               f"Produsentprisen faller fra {kr(P7_0)} til {kr(p7)}, altså kr {kr(P7_0 - p7)} per enhet.",
               f"{kr(P7_0 - p7)} × {kr(x7)} = <b>kr {kr(a7b)}</b>, som er {pst(a7b / prov7, 0)} av skatteinntekten."],
              [(f"Kr {kr(g7b_kons)}", f"konsumentenes del: prisen deres stiger med kr {kr(P7 - P7_0)} og "
                f"{kr(P7 - P7_0)} × {kr(x7)} = {kr(g7b_kons)}."),
               (f"Kr {kr(g7b_alt)}", "hele skatteinntekten. Produsentene betaler den inn, men bærer bare en del av den."),
               (f"Kr {kr(g7b_x0)}", f"kvantumet før skatten, {kr(x7_0)}, er brukt: {kr(P7_0 - p7)} × {kr(x7_0)}.")],
              f"{kr(a7b)} + {kr(g7b_kons)} = {kr(prov7)}. Den minst prisfølsomme siden bærer mest: etterspørselen har "
              f"helning {Db7} og tilbudet {Sc7}, så konsumentene bærer {pst(g7b_kons / prov7, 0)}. ✓"))
pc = ledd("c", "<p>Anta i stedet at varen selges av en monopolist med konstant grensekostnad. Etterspørselen er lineær. "
               f"Hva skjer med prisen konsumentene betaler når stykkskatten på kr {kr(t7)} innføres?</p>",
          B(f"Den øker med kr {kr(t7 / 2, 2)}, fordi det ikke lønner seg å velte over hele skatten"),
          [B(f"Den øker med kr {kr(t7)}, fordi en monopolist kan velte hele skatten over på kundene"),
           B(f"Den øker med mer enn kr {kr(t7)}, fordi monopolisten legger påslaget sitt på skatten også"),
           B("Den er uendret, fordi monopolisten allerede tar den høyeste prisen markedet tåler")],
          sol("En monopolist setter grenseinntekt lik grensekostnad. Stykkskatten øker grensekostnaden. Med lineær "
              "etterspørsel P = a − bx og konstant grensekostnad c er monopolprisen (a + c + t)/2. Prisen stiger derfor "
              f"med halve skatten (F9 lb 19–21, manualen 11.6). <b>Prisen øker med kr {kr(t7 / 2, 2)}.</b>",
              None,
              [(f"Kr {kr(t7)}", "full overvelting gjelder perfekt elastisk tilbud eller helt uelastisk etterspørsel "
                "under frikonkurranse. Monopolisten mister for mange kunder om hele skatten veltes over (F9 lb 21)."),
               (f"Mer enn kr {kr(t7)}", "ikke med lineær etterspørsel. Da er overveltingen nøyaktig halve skatten."),
               ("Uendret", "skatten øker grensekostnaden. Tilpasningen der grenseinntekt er lik grensekostnad, flytter "
                "seg til lavere kvantum og høyere pris.")],
              f"Etterspørselen her er P = {kr(am7)} − x/{Db7}. Med grensekostnad kr {kr(cm7)} er monopolprisen "
              f"({kr(am7)} + {kr(cm7)})/2 = {kr(Pm0)} uten skatt og ({kr(am7)} + {kr(cm7)} + {kr(t7)})/2 = "
              f"{kr(Pm1, 2)} med skatt. ✓",
              "Forelesningens setning er at monopolisten aldri velter hele skatten over på kundene. Det stryker to "
              "alternativer."))
EX.append(oppgave(7, "Stykkskatt: produsentpris, produsentenes del og monopol", "Skatteincidens", [11], body7,
                  [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: Halvert rentefradrag og kontantstrømskatt")
r8, t8, A8 = 0.05, 0.22, 0.5
kg8 = r8 * (1 - A8 * t8) / (1 - t8)                 # 5,71 %
ke8 = r8 / (1 - t8)                                 # 6,41 %
assert r8 < kg8 < ke8 and pst(kg8) == "5,71 %" and pst(ke8) == "6,41 %"
# kontantstrømskatt: nåverdi −(1 − t)K + (1 − t)[F(K) + (1 − δ)K]/(1 + r) med F(K) = 2√K, r = 5 %, δ = 15 %
d8 = 0.15


def nv8(K_, t_):
    return -(1 - t_) * K_ + (1 - t_) * (2 * math.sqrt(K_) + (1 - d8) * K_) / (1 + r8)


Kopt8 = (1 / (r8 + d8)) ** 2                        # F′(K) = 1/√K = r + δ gir K = 25
assert lik(Kopt8, 25)
for t_ in (0.0, 0.22, 0.5):                         # optimum er det samme for alle satser
    assert nv8(Kopt8, t_) > nv8(Kopt8 * 1.01, t_) and nv8(Kopt8, t_) > nv8(Kopt8 * 0.99, t_)
print(f"   a: gjeld {r8} til {kg8:.5f}, egenkapital {ke8:.5f}; b: K* = {Kopt8} uansett sats")
body8 = ("<p>Et aksjeselskap har inntekten F(K), der K er kapitalinnsatsen, F′(K) &gt; 0 og F″(K) &lt; 0. "
         "Selskapsskatten er t.</p>")
pa = ledd("a", "<p>Kapitalen består av gjeld og egenkapital. Gjeldsrenten og egenkapitalens alternativkostnad er begge r. "
               "Gjeldsrentene kan trekkes fra, men egenkapitalkostnaden kan ikke. Myndighetene bestemmer nå at bare "
               "halvparten av gjeldsrentene kan trekkes fra. Hva skjer med avkastningskravet til gjeldsfinansiert "
               "kapital, målt mot kravet til egenkapital?</p>",
          B("Kravet til gjeld øker, men er fortsatt lavere enn kravet til egenkapital"),
          [B("Kravet til gjeld er uendret lik r og fortsatt lavere enn kravet til egenkapital"),
           B("Kravet til gjeld øker til r/(1 − t) og blir likt kravet til egenkapital"),
           B("Kravet til gjeld øker og blir høyere enn kravet til egenkapital")],
          sol("Gjeldsfinansiert kapital koster r, men bare andelen A av renten gir fradrag. Betingelsen er "
              "F′<sub>G</sub> = r(1 − At)/(1 − t). Egenkapitalkostnaden gir ikke fradrag, så F′<sub>E</sub> = r/(1 − t) "
              "(F6 lb 20–22, H2025 oppgave 7, manualen 9.4 og 9.5). Med fullt fradrag (A = 1) er kravet til gjeld r. Med "
              "A = 0,5 er det r(1 − 0,5t)/(1 − t), som er høyere enn r og lavere enn r/(1 − t). <b>Kravet til gjeld "
              "øker, men er fortsatt lavere enn kravet til egenkapital.</b>",
              None,
              [("Uendret lik r", "gjelder bare med fullt rentefradrag. Når halve renten ikke gir fradrag, blir gjelden "
                "dyrere etter skatt."),
               ("Øker til r/(1 − t)", "gjelder når ingen renter kan trekkes fra (A = 0). Her gir halve renten fortsatt "
                "fradrag."),
               ("Høyere enn egenkapital", "kravet til egenkapital er r/(1 − t) både før og etter. Gjelden nærmer seg, "
                "men kommer ikke forbi så lenge A er over null.")],
              f"Med r = 5 % og t = 22 %: kravet til gjeld går fra 5,00 % til 0,05 × 0,89/0,78 = {pst(kg8)}. Kravet til "
              f"egenkapital er {pst(ke8)}. ✓",
              "Sett A = 1 og A = 0 inn i r(1 − At)/(1 − t). Svaret for A = 0,5 ligger mellom de to."))
pb = ledd("b", "<p>Anta i stedet en kontantstrømskatt med sats t. Selskapet trekker fra hele investeringen K når den "
               "betales i år 1. I år 2 skattlegges inntekten F(K) og salget av restverdien (1 − δ)K, der δ er "
               "kapitalslitet. Renter inngår ikke i skattegrunnlaget. Selskapet diskonterer med renten r. Hvilken "
               "betingelse bestemmer optimal K?</p>",
          ("F′(K) = r + δ", []),
          [("F′(K) = (r + δ)/(1 − t)", ["1"]),
           ("F′(K) = r", []),
           ("F′(K) = (r + δ)(1 − t)", ["1"])],
          sol("Under en kontantstrømskatt utgiftsføres investeringen med en gang, mens renter holdes utenfor grunnlaget. "
              "Staten dekker andelen t av investeringen og tar andelen t av inntektene. Skatten forkortes bort i "
              "førsteordensbetingelsen (F6 lb 40–41).",
              ["Nåverdi: −(1 − t)K + (1 − t)[F(K) + (1 − δ)K]/(1 + r).",
               "Derivert lik null: (1 − t)[F′(K) + 1 − δ] = (1 − t)(1 + r).",
               "<b>F′(K) = r + δ</b>. Skatten påvirker ikke investeringen."],
              [("(r + δ)/(1 − t)", "som om investeringen ikke kunne trekkes fra og restverdien var skattefri. Da hever "
                "skatten kravet."),
               ("r", "kapitalslitet er glemt. Kapitalen må også tjene inn verdifallet δ."),
               ("(r + δ)(1 − t)", "som om investeringen ga fradrag mens inntekten F(K) var skattefri. Da ville skatten "
                "subsidiert investeringen.")],
              "Uten skatt (t = 0) er betingelsen også F′(K) = r + δ. En nøytral skatt gir samme betingelse som ingen "
              "skatt. ✓",
              "Kontantstrømskatten er nøytral. Riktig uttrykk kan derfor ikke inneholde t. Da står valget mellom r og "
              "r + δ."))
EX.append(oppgave(8, "Halvert rentefradrag og kontantstrømskatt", "Bedriftens tilpasning", [9], body8, [pa, pb]))

# ======================================================================= 9
print("\nOppgave 9: Wenche og den utsatte utflyttingsskatten")
krav9 = 10_000_000 * TE                             # forelesningens eksempel (F7 lb 12–13)
assert lik(krav9, 3_784_000) and lik(krav9 - 0.70 * 1_000_000, 3_084_000)
p = ledd("", "<p>Wenche eier alle aksjene i Vinje Invest AS. I 2026 flytter hun fra Norge til Frankrike og blir "
             "bosatt der etter skatteavtalen. Den latente gevinsten på aksjene er kr 15 mill. "
             "Utflyttingsskatten (exit-skatten) er fastsatt og betalingen er utsatt. Hvilken hendelse gjør at en del av "
             "den utsatte skatten forfaller til betaling?</p>",
         B("Selskapet deler ut utbytte til henne. Da forfaller et avdrag på 70 % av utdelingen"),
         [B("Aksjene stiger i verdi etter flyttingen. Da fastsettes skatten på nytt ut fra den nye verdien"),
          B("Hun er i Norge i 70 dager ett år. Da forfaller hele skatten det samme året"),
          B("Hun blir skattemessig emigrert etter tre år. Da forfaller hele den utsatte skatten")],
         sol("Exit-skatten fastsettes ved utflyttingen når den latente gevinsten er over kr 3 mill. Den kan betales "
             "straks, i rentefrie rater over 12 år eller etter 12 år med renter. Deler selskapet ut utbytte etter "
             "utflyttingen, forfaller et avdrag på 70 % av utdelingen. Skatten kan altså forfalle selv om hun ikke "
             "selger aksjene (F7 lb 11–13, manualen 6.6). <b>Utbytte utløser et avdrag på 70 % av utdelingen.</b>",
             None,
             [("Aksjene stiger i verdi", "skatten fastsettes på gevinsten ved utflyttingen. Senere kursendringer endrer "
               "ikke kravet."),
              ("70 dager i Norge", "grensen på 61 dager gjelder vilkårene for å bli skattemessig emigrert (F7 lb 4). Den "
               "styrer ikke når exit-skatten forfaller."),
              ("Emigrert etter tre år", "treårsregelen avgjør når den alminnelige skatteplikten til Norge opphører (F7 "
               "lb 6). Exit-skatten følger sin egen frist på 12 år.")],
             f"I forelesningens eksempel deler selskapet ut kr 1 000 000. Avdraget er kr 700 000 og kravet faller fra "
             f"{kr(krav9)} til {kr(krav9 - 700_000)} (F7 lb 13). ✓",
             "To av alternativene blander inn reglene for skattemessig bosted. De handler om en annen frist enn "
             "exit-skattens 12 år."))
EX.append(oppgave(9, "Utsatt utflyttingsskatt", "Exit-skatt", [6], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Sondre og realavkastningen etter skatt")
K10, S10, D10, t10, pi10 = 200.0, 212.0, 10.0, 0.40, 0.04
nom10 = (S10 - K10 + D10) / K10                     # 11 %
etter10 = nom10 * (1 - t10)                         # 6,6 %
a10 = (1 + etter10) / (1 + pi10) - 1                # 2,50 %
g10_approx = etter10 - pi10                         # tilnærmingen: 2,60 %
g10_real = ((1 + nom10) / (1 + pi10) - 1) * (1 - t10)   # skatt på realavkastningen: 4,04 %
g10_skatt = (1 + nom10) / (1 + pi10) - 1            # skatten glemt: 6,73 %
assert lik(nom10, 0.11) and lik(etter10, 0.066) and lik(a10, 0.025) and lik(g10_approx, 0.026)
assert pst(g10_real) == "4,04 %" and pst(g10_skatt) == "6,73 %"
slutt10 = K10 + (S10 - K10 + D10) * (1 - t10)       # 213,20
assert lik(slutt10, 213.2) and lik(slutt10 / (1 + pi10), 205.0)
print(f"   nominell {nom10}, etter skatt {etter10}, real {a10:.6f}; gale {g10_approx:.4f}, {g10_real:.6f}, "
      f"{g10_skatt:.6f}")
p = ledd("", f"<p>Sondre kjøper en aksje for kr {kr(K10)} 1. januar, får kr {kr(D10)} i utbytte og selger den for kr "
             f"{kr(S10)} ved årets slutt. Anta forenklet at utbytte og gevinst skattlegges med 40 %, uten skjerming. "
             "Inflasjonen er 4 %. Hva er realavkastningen etter skatt? Bruk den eksakte formelen og svar med to "
             "desimaler.</p>",
         P(a10),
         [P(g10_approx), P(g10_real), P(g10_skatt)],
         sol("Nominell avkastning er utbytte pluss kursgevinst delt på kjøpsprisen. Skatten regnes av den nominelle "
             "avkastningen. Realavkastningen er (1 + nominell avkastning etter skatt)/(1 + inflasjon) − 1 (F2 lb 39–43, "
             "manualen 2.2).",
             [f"Nominell avkastning: ({kr(D10)} + {kr(S10 - K10)})/{kr(K10)} = {pst(nom10, 0)}.",
              f"Etter skatt: {pst(nom10, 0)} × (1 − 0,40) = {pst(etter10, 1)}.",
              f"Realavkastning: 1,066/1,04 − 1 = <b>{pst(a10)}</b>."],
             [(pst(g10_approx), f"tilnærmingen {pst(etter10, 1)} − 4 %. Oppgaven ber om den eksakte formelen."),
              (pst(g10_real), "skatten er lagt på realavkastningen: (1,11/1,04 − 1) × 0,60. Skatten regnes av den "
               "nominelle avkastningen."),
              (pst(g10_skatt), "skatten er glemt: 1,11/1,04 − 1.")],
             f"Kr {kr(K10)} blir til {kr(K10)} + {kr(S10 - K10 + D10)} − {kr((S10 - K10 + D10) * t10, 2)} = "
             f"{kr(slutt10, 2)} etter skatt. Målt i kjøpekraft: {kr(slutt10, 2)}/1,04 = {kr(slutt10 / (1 + pi10), 2)}. "
             f"{kr(slutt10 / (1 + pi10))}/{kr(K10)} − 1 = {pst(a10)}. ✓",
             "Rekkefølgen er nominelt, så skatt, så inflasjon. Tilnærmingen gir litt for høyt tall når inflasjonen er "
             "positiv."))
EX.append(oppgave(10, "Realavkastning etter skatt på en aksje", "Investeringscaser", [2], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Tynset Mek AS, straksfradrag mot fradrag over tre år")
I11, n11, ts11, rho11 = 363_000, 3, 0.22, 0.10
aar11 = I11 / n11                                   # 121 000
besp11 = I11 * ts11                                 # 79 860
besp_aar11 = aar11 * ts11                           # 26 620
nv_straks11 = besp11 / (1 + rho11)                  # 72 600
nv_ledd11 = [besp_aar11 / (1 + rho11) ** k for k in (1, 2, 3)]   # 24 200, 22 000, 20 000
nv_avskr11 = sum(nv_ledd11)                         # 66 200
a11 = nv_straks11 - nv_avskr11                      # 6 400
g11_aar1 = besp11 - (besp_aar11 + nv_ledd11[0] + nv_ledd11[1])   # år 1 ikke diskontert: 7 040
g11_straks = besp11 - nv_avskr11                    # bare straksfradraget udiskontert: 13 660
g11_fradrag = a11 / ts11                            # fradragene, ikke skattebesparelsen: 29 091
assert lik(nv_straks11, 72_600) and all(lik(x, y) for x, y in zip(nv_ledd11, (24_200, 22_000, 20_000)))
assert lik(a11, 6_400) and lik(g11_aar1, 7_040) and lik(g11_straks, 13_660) and kr(g11_fradrag) == "29 091"
flytt11 = [besp_aar11 * (1 / (1 + rho11) - 1 / (1 + rho11) ** k) for k in (2, 3)]   # 2 200 og 4 200
assert lik(flytt11[0], 2_200) and lik(flytt11[1], 4_200)
print(f"   straks {nv_straks11}, over tre år {nv_avskr11}, differanse {a11}; gale {g11_aar1}, {g11_straks}, "
      f"{g11_fradrag:.2f}")
p = ledd("", f"<p>Tynset Mek AS har god inntjening og kjøper en maskin for kr {kr(I11)}. Selskapet kan trekke fra alt "
             f"i år 1, eller kr {kr(aar11)} i hvert av årene 1, 2 og 3. Skattebesparelsen kommer ved utgangen av året "
             "fradraget føres. Selskapsskatten er 22 % og diskonteringsrenten 10 %. Hvor mye mer er det verdt i nåverdi "
             "i dag å trekke fra alt i år 1?</p>",
         K(a11),
         [K(g11_aar1), K(g11_straks), K(g11_fradrag)],
         sol("Et fradrag er verdt skattesatsen ganger fradraget. Kommer besparelsen senere, er den verdt mindre i dag. "
             "Derfor lønner det seg å ta fradraget så tidlig som mulig (F1 lb 42–44, manualen 2.4).",
             [f"Alt i år 1: {kr(I11)} × 22 % = {kr(besp11)} ved utgangen av år 1. Nåverdi {kr(besp11)}/1,10 = "
              f"{kr(nv_straks11)}.",
              f"Over tre år: {kr(aar11)} × 22 % = {kr(besp_aar11)} per år. Nåverdi {kr(besp_aar11)}/1,10 + "
              f"{kr(besp_aar11)}/1,10² + {kr(besp_aar11)}/1,10³ = {kr(nv_ledd11[0])} + {kr(nv_ledd11[1])} + "
              f"{kr(nv_ledd11[2])} = {kr(nv_avskr11)}.",
              f"{kr(nv_straks11)} − {kr(nv_avskr11)} = <b>kr {kr(a11)}</b>."],
             [(f"Kr {kr(g11_aar1)}", f"besparelsene i år 1 er ikke diskontert: {kr(besp11)} − ({kr(besp_aar11)} + "
               f"{kr(nv_ledd11[0])} + {kr(nv_ledd11[1])}). De kommer ved utgangen av året."),
              (f"Kr {kr(g11_straks)}", f"straksfradraget er ikke diskontert, mens fradragene over tre år er det: "
               f"{kr(besp11)} − {kr(nv_avskr11)}."),
              (f"Kr {kr(g11_fradrag)}", f"nåverdien av fradragene, ikke av skattebesparelsen: {kr(a11)}/0,22.")],
             f"Forskjellen er to besparelser på {kr(besp_aar11)} som flyttes fra år 1 til år 2 og år 3: "
             f"{kr(besp_aar11)} × (1/1,10 − 1/1,21) + {kr(besp_aar11)} × (1/1,10 − 1/1,331) = {kr(flytt11[0])} + "
             f"{kr(flytt11[1])} = {kr(a11)}. ✓",
             f"Udiskontert er besparelsen kr {kr(besp11)} i begge tilfeller. Gevinsten er ren tidsverdi og må være liten "
             "i forhold til det beløpet."))
EX.append(oppgave(11, "Straksfradrag mot fradrag over tre år", "Fradragets tidsverdi", [2], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: Flat skatt med bunnfradrag i Vestøy")
Y12 = [200_000, 300_000, 700_000]
sats12, PROV12 = 0.25, 240_000
skattbar12 = PROV12 / sats12                        # 960 000
samlet_fr12 = sum(Y12) - skattbar12                 # 240 000
a12 = samlet_fr12 / len(Y12)                        # 80 000
T12 = [(y - a12) * sats12 for y in Y12]             # 30 000, 55 000, 155 000
g12_samlet = samlet_fr12                            # ikke delt på tre: 240 000
g12_skattbar = skattbar12 / len(Y12)                # skattbar inntekt per person: 320 000
g12_lette = (sum(Y12) * sats12 - PROV12) / len(Y12)   # skattelettelsen per person: 20 000
assert lik(a12, 80_000) and lik(sum(T12), PROV12) and min(Y12) > a12
assert lik(g12_samlet, 240_000) and lik(g12_skattbar, 320_000) and lik(g12_lette, 20_000)
snitt12 = [t_ / y for t_, y in zip(T12, Y12)]
assert snitt12[0] < snitt12[1] < snitt12[2]
print(f"   bunnfradrag {a12}, skatt {T12}, snitt {[round(s, 4) for s in snitt12]}; gale {g12_samlet}, {g12_skattbar}, "
      f"{g12_lette}")
p = ledd("", f"<p>Landet Vestøy vil hente inn kr {kr(PROV12)} i skatt fra tre personer med en flat skatt på 25 % av "
             f"inntekten over et bunnfradrag som er likt for alle. Person A tjener kr {kr(Y12[0])}, person B kr "
             f"{kr(Y12[1])} og person C kr {kr(Y12[2])}. Hvor stort må bunnfradraget være?</p>",
         K(a12),
         [K(g12_samlet), K(g12_skattbar), K(g12_lette)],
         sol("Med flat sats og bunnfradrag er skatten satsen ganger inntekten over fradraget. Samlet skatt er satsen "
             "ganger samlet inntekt minus tre bunnfradrag (F7 lb 36–39, manualen 10.3).",
             [f"Skattbar inntekt som trengs: {kr(PROV12)}/0,25 = {kr(skattbar12)}.",
              f"Samlet inntekt er {kr(sum(Y12))}. Samlet fradrag: {kr(sum(Y12))} − {kr(skattbar12)} = {kr(samlet_fr12)}.",
              f"Per person: {kr(samlet_fr12)}/3 = <b>kr {kr(a12)}</b>."],
             [(f"Kr {kr(g12_samlet)}", "samlet fradrag for de tre. Det skal deles på tre personer."),
              (f"Kr {kr(g12_skattbar)}", f"skattbar inntekt per person, {kr(skattbar12)}/3. Person A tjener bare kr "
               f"{kr(Y12[0])}."),
              (f"Kr {kr(g12_lette)}", f"skattelettelsen per person: uten fradrag gir 25 % kr {kr(sum(Y12) * sats12)}, "
               f"altså {kr(sum(Y12) * sats12 - PROV12)} for mye. {kr(sum(Y12) * sats12 - PROV12)}/3 = {kr(g12_lette)} er "
               "kroner i skatt, ikke i fradrag.")],
             f"A betaler 25 % × {kr(Y12[0] - a12)} = {kr(T12[0])}, B 25 % × {kr(Y12[1] - a12)} = {kr(T12[1])} og C "
             f"25 % × {kr(Y12[2] - a12)} = {kr(T12[2])}. Sum {kr(sum(T12))}. ✓ Gjennomsnittsskatten er "
             f"{pst(snitt12[0], 1)}, {pst(snitt12[1], 1)} og {pst(snitt12[2], 1)}, så systemet er progressivt.",
             "Sett svaret inn og regn skatten for de tre. Det tar tre linjer og avgjør saken."))
EX.append(oppgave(12, "Flat skatt med bunnfradrag i Vestøy", "Progressivitet", [10], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: Unni og Tora, Merton og humankapitalen")
mu13, rf13, s13 = 0.078, 0.03, 0.20
mer13, var13 = mu13 - rf13, s13 ** 2                # 4,5 % og 0,0225
AKS13, BANK13 = 450_000, 1_050_000
w13 = AKS13 / (AKS13 + BANK13)                      # 40 %
gam13 = mer13 / (w13 * var13)                       # 4
g13a_bank = mer13 / (AKS13 / BANK13 * var13)        # andelen regnet mot bankinnskuddet: 3
g13a_sigma = mer13 / (w13 * s13)                    # σ i stedet for σ²: 0,75
assert lik(mer13, 0.048) and lik(var13, 0.04) and lik(w13, 0.30) and lik(gam13, 4) and lik(g13a_bank, 2.8)
assert lik(g13a_sigma, 0.8)
gamT13 = 2
wT13 = mer13 / (gamT13 * var13)                     # 80 %
g13b_unni = w13                                     # samme andel som Unni: 40 %
g13b_halv = w13 / 2                                 # retningen snudd: 20 %
g13b_sigma = mer13 / (gamT13 * s13)                 # σ i stedet for σ²: 12 %
assert lik(wT13, 0.60) and lik(g13b_halv, 0.15) and lik(g13b_sigma, 0.12) and lik(gam13 * w13, gamT13 * wT13)
F13 = 1_200_000
H13 = F13 / wT13 - F13                              # 300 000
g13c_andel = wT13 * F13                             # 80 % av finansformuen: 960 000
g13c_total = F13 / wT13                             # totalformuen: 1 500 000
g13c_bank = (1 - wT13) * F13                        # 20 % av finansformuen: 240 000
assert lik(H13, 800_000) and lik(wT13 * (F13 + H13), F13) and lik(g13c_total, 2_000_000) and lik(g13c_bank, 480_000)
HB13 = 300_000
tot13 = F13 + HB13                                  # 1 700 000
aksB13 = wT13 * tot13 - HB13                        # 860 000 i fondet
bankB13 = F13 - aksB13                              # 340 000 i banken
g13d_fri = min(F13, wT13 * tot13)                   # behandlet som risikofri: 900 000
g13d_uten = wT13 * F13                              # humankapitalen oversett: 960 000
g13d_halv = wT13 * F13 - HB13                       # trukket fra, men ikke lagt til totalformuen: 460 000
assert lik(aksB13, 600_000) and lik(bankB13, 600_000) and lik(g13d_fri, 900_000) and lik(g13d_halv, 420_000)
print(f"   1 γ {gam13}: {g13a_bank}, {g13a_sigma}; 2 {wT13}: {g13b_unni}, {g13b_halv}, {g13b_sigma}; "
      f"3 {H13}: {g13c_andel}, {g13c_total}, {g13c_bank}; 4 {aksB13}/{bankB13}: {g13d_fri}, {g13d_uten}, {g13d_halv}")
body13 = ("<p>Et globalt indeksfond har forventet avkastning 7,8 % og standardavvik 20 %. Risikofri rente er 3 %. Bruk "
          "Mertons formel for optimal andel av totalformuen i aksjer.</p>")


def FB(fond, bank):
    """Alternativ: plassering av finansformuen i fond og bank."""
    if lik(bank, 0):
        return B(f"Kr {kr(fond)} i fondet og ingenting i banken")
    return B(f"Kr {kr(fond)} i fondet og kr {kr(bank)} i banken")


p1 = ledd("1", f"<p>Unni er pensjonist og har bare finansiell formue: kr {kr(AKS13)} i indeksfondet og kr {kr(BANK13)} i "
               "banken. Anta at fordelingen er optimal for henne. Hva er risikoaversjonen hennes, γ?</p>",
          G(gam13),
          [G(g13a_bank), G(g13a_sigma), ("Umulig å avgjøre uten mer informasjon", [])],
          sol("Mertons andel er w = (E(r) − r<sub>f</sub>)/(γσ²). Løst for γ: γ = (E(r) − r<sub>f</sub>)/(wσ²). Andelen "
              "w er aksjebeløpet delt på hele formuen (F12 lb 11–13, manualen 14.4).",
              [f"w = {kr(AKS13)}/{kr(AKS13 + BANK13)} = {pst(w13, 0)}.",
               "Meravkastning: 7,8 % − 3 % = 4,8 %. wσ² = 0,30 × 0,20² = 0,30 × 0,04 = 0,012.",
               f"γ = 0,048/0,012 = <b>{kr(gam13)}</b>."],
              [(G(g13a_bank)[0], f"andelen er regnet mot bankinnskuddet: {kr(AKS13)}/{kr(BANK13)} = "
                f"{pst(AKS13 / BANK13, 1)}. Andelen skal regnes av hele formuen."),
               (G(g13a_sigma)[0], "standardavviket står i nevneren i stedet for variansen: 0,048/(0,30 × 0,20)."),
               ("Umulig å avgjøre", "formelen har fire størrelser. Tre er kjent når porteføljen er optimal, så den "
                "fjerde følger.")],
              f"0,048/({kr(gam13)} × 0,04) = 0,30. {pst(w13, 0)} av {kr(AKS13 + BANK13)} er {kr(AKS13)}. ✓"))
p2 = ledd("2", "<p>Tora er 30 år og har risikoaversjon γ = 2. Foreløpig har hun bare finansiell formue. Hvor stor "
               "andel av formuen bør hun ha i indeksfondet? Svar med én desimal.</p>",
          P(wT13, 1),
          [P(g13b_unni, 1), P(g13b_halv, 1), P(g13b_sigma, 1)],
          sol("Mertons andel er meravkastningen delt på γ ganger variansen. Variansen er standardavviket i andre "
              "(F12 lb 11–13, manualen 14.4).",
              ["σ² = 0,20² = 0,04.",
               f"w = 0,048/(2 × 0,04) = <b>{pst(wT13, 1)}</b>."],
              [(pst(g13b_unni, 1), "samme andel som Unni. Tora har halvparten så høy risikoaversjon og skal ha dobbelt "
                "så høy andel."),
               (pst(g13b_halv, 1), "retningen er snudd: Unnis andel er halvert i stedet for doblet. Lavere "
                "risikoaversjon gir høyere andel."),
               (pst(g13b_sigma, 1), "standardavviket står i nevneren i stedet for variansen: 0,048/(2 × 0,20).")],
              f"γ ganger w er lik for alle som møter samme marked: {kr(gam13)} × {pst(w13, 0)} = 2 × "
              f"{pst(wT13, 0)} = 1,2 = 0,048/0,04. ✓"))
p3 = ledd("3", f"<p>Tora får fast jobb i staten. Finansformuen hennes er kr {kr(F13)} og humankapitalen er risikofri. Hun "
               "kan ikke låne. Hvor stor må humankapitalen minst være for at hele finansformuen bør stå i "
               "indeksfondet?</p>",
          K(H13),
          [K(g13c_andel), K(g13c_total), K(g13c_bank)],
          sol("Mertons andel gjelder totalformuen: finansformue pluss humankapital. Risikofri humankapital teller som "
              "et bankinnskudd. Aksjebeløpet w × (F + H) tas derfor fra finansformuen (F12 lb 14, manualen 14.5).",
              [f"Hele finansformuen i fondet betyr {pst(wT13, 0)} × ({kr(F13)} + H) = {kr(F13)}.",
               f"{kr(F13)} + H = {kr(F13)}/0,60 = {kr(g13c_total)}.",
               f"H = <b>kr {kr(H13)}</b>."],
              [(f"Kr {kr(g13c_andel)}", f"{pst(wT13, 0)} av finansformuen. Det er aksjebeløpet uten humankapital, ikke "
                "humankapitalen."),
               (f"Kr {kr(g13c_total)}", "totalformuen, ikke humankapitalen."),
               (f"Kr {kr(g13c_bank)}", f"{pst(1 - wT13, 0)} av finansformuen. Den risikofrie andelen gjelder "
                f"totalformuen: {pst(1 - wT13, 0)} × {kr(g13c_total)} = {kr(H13)}.")],
              f"Totalformue {kr(g13c_total)}: {pst(wT13, 0)} i aksjer er {kr(F13)} og {pst(1 - wT13, 0)} risikofritt er "
              f"{kr(H13)}, som er humankapitalen. ✓",
              "Sett svaret inn: Mertons andel av finansformue pluss humankapital skal bli nøyaktig lik finansformuen."))
p4 = ledd("4", f"<p>Anta i stedet at Tora har en humankapital på kr {kr(HB13)} som svinger i takt med aksjemarkedet "
               f"(β = 1). Finansformuen er fortsatt kr {kr(F13)}. Hvordan bør hun plassere finansformuen?</p>",
          FB(aksB13, bankB13),
          [FB(g13d_fri, F13 - g13d_fri), FB(g13d_uten, F13 - g13d_uten), FB(g13d_halv, F13 - g13d_halv)],
          sol("Humankapital som svinger i takt med aksjemarkedet, teller som aksjer hun allerede eier. Beløpet i fondet "
              "er Mertons aksjebeløp minus humankapitalen (F12 lb 15, manualen 14.5, H2025 oppgave 11).",
              [f"Totalformue: {kr(F13)} + {kr(HB13)} = {kr(tot13)}.",
               f"Mertons aksjebeløp: {pst(wT13, 0)} × {kr(tot13)} = {kr(wT13 * tot13)}. Av dette er {kr(HB13)} "
               "humankapital.",
               f"I fondet: {kr(wT13 * tot13)} − {kr(HB13)} = <b>kr {kr(aksB13)}</b>. I banken: {kr(bankB13)}."],
              [(f"Kr {kr(g13d_fri)} i fondet", f"humankapitalen er behandlet som risikofri. Da settes hele Mertons "
                f"aksjebeløp på {kr(wT13 * tot13)} i fondet."),
               (f"Kr {kr(g13d_uten)} i fondet", f"humankapitalen er oversett: {pst(wT13, 0)} × {kr(F13)}."),
               (f"Kr {kr(g13d_halv)} i fondet", "humankapitalen er trukket fra, men ikke regnet med i totalformuen: "
                f"{pst(wT13, 0)} × {kr(F13)} − {kr(HB13)}.")],
              f"Aksjeeksponering: {kr(aksB13)} + {kr(HB13)} = {kr(aksB13 + HB13)}, som er {pst(wT13, 0)} av "
              f"{kr(tot13)}. ✓"))
EX.append(oppgave(13, "Mertons aksjeandel for Unni og Tora", "Porteføljevalg", [14], body13, [p1, p2, p3, p4]))

# ======================================================================= 14
print("\nOppgave 14: Stine og sjarken (kritisk sannsynlighet og høyeste egenandel)")
W14, L14, PR14 = 4_000_000, 1_440_000, 79_600
u_hel = math.sqrt(W14)                              # 2 000
u_skade = math.sqrt(W14 - L14)                      # 1 600
u_fors = math.sqrt(W14 - PR14)                      # 1 980
pk14 = (u_hel - u_fors) / (u_hel - u_skade)         # 5 %
g14a_fair = PR14 / L14                              # premie delt på tap: 5,53 %
g14a_hel = (u_hel - u_fors) / u_hel                 # delt på nytten uten skade: 1 %
g14a_skade = (u_hel - u_fors) / u_skade             # delt på nytten etter skade: 1,25 %
assert lik(u_hel, 2000) and lik(u_skade, 1600) and lik(u_fors, 1980) and lik(pk14, 0.05)
assert pst(g14a_fair) == "5,53 %" and lik(g14a_hel, 0.01) and lik(g14a_skade, 0.0125)
p14, PR14b = 0.05, 39_900
eu_uten = (1 - p14) * u_hel + p14 * u_skade         # 1 980
u_b = math.sqrt(W14 - PR14b)                        # 1 990
u_min = (eu_uten - (1 - p14) * u_b) / p14           # 1 790
E14 = (W14 - PR14b) - u_min ** 2                    # 756 000
g14b_utb = L14 - E14                                # utbetalingen: 684 000
g14b_fair = L14 - PR14b / p14                       # aktuarisk egenandel: 642 000
g14b_sum = E14 + PR14b                              # premien lagt til: 795 900
assert lik(eu_uten, 1980) and lik(u_b, 1990) and lik(u_min, 1790) and lik(E14, 756_000, 1e-3)
assert lik((1 - p14) * u_b + p14 * math.sqrt(W14 - PR14b - E14), eu_uten)
assert lik(g14b_utb, 684_000, 1e-3) and lik(g14b_fair, 642_000, 1e-3) and lik(g14b_sum, 795_900, 1e-3) and E14 < L14
print(f"   1 p* {pk14}: {g14a_fair:.5f}, {g14a_hel}, {g14a_skade}; 2 E {E14}: {g14b_utb}, {g14b_fair}, {g14b_sum}")
body14 = (f"<p>Stine er fisker og har en formue på kr {kr(W14)}. Av dette er kr {kr(L14)} en sjark, som kan forlise i "
          "løpet av året. Resten av formuen er trygg. Nyttefunksjonen hennes er U(W) = √W, der W er formuen ved årets "
          "slutt.</p>")
p1 = ledd("1", f"<p>Et forsikringsselskap tilbyr full dekning for en premie på kr {kr(PR14)}. Hva er den laveste "
               "sannsynligheten for forlis som gjør at Stine vil kjøpe forsikringen? Svar med to desimaler.</p>",
          P(pk14),
          [P(g14a_fair), P(g14a_hel), P(g14a_skade)],
          sol("Hun kjøper når nytten av den sikre formuen med forsikring er minst like høy som forventet nytte uten. "
              "Sett dem lik hverandre og løs for sannsynligheten p (manualen 17.4, H2025 oppgave 13).",
              [f"Med forsikring: √({kr(W14)} − {kr(PR14)}) = √{kr(W14 - PR14)} = {kr(u_fors)}.",
               f"Uten: (1 − p) × √{kr(W14)} + p × √{kr(W14 - L14)} = {kr(u_hel)} − {kr(u_hel - u_skade)}p.",
               f"{kr(u_hel)} − {kr(u_hel - u_skade)}p = {kr(u_fors)} gir p = <b>{pst(pk14)}</b>."],
              [(pst(g14a_fair), f"premien delt på tapet: {kr(PR14)}/{kr(L14)}. Det er grensen for en risikonøytral "
                "person. Stine er risikoavers og kjøper allerede ved lavere sannsynlighet."),
               (pst(g14a_hel), f"nyttetapet ved å betale premien, {kr(u_hel - u_fors)}, er delt på nytten uten skade, "
                f"{kr(u_hel)}, i stedet for på nyttetapet ved forlis, {kr(u_hel - u_skade)}."),
               (pst(g14a_skade), f"nyttetapet {kr(u_hel - u_fors)} er delt på nytten etter forlis, {kr(u_skade)}.")],
              f"Med p = {pst(pk14, 0)} er forventet nytte uten forsikring 0,95 × {kr(u_hel)} + 0,05 × {kr(u_skade)} = "
              f"{kr(eu_uten)}, lik nytten med forsikring. ✓ Forventet tap er da kr {kr(pk14 * L14)}, så hun godtar en "
              f"premie som er {pst(PR14 / (pk14 * L14) - 1, 1)} høyere.",
              "En risikoavers person kjøper også når premien er litt over forventet tap. Svaret må derfor ligge under "
              f"{kr(PR14)}/{kr(L14)} = {pst(g14a_fair)}."))
p2 = ledd("2", f"<p>Anta at sannsynligheten for forlis er {pst(p14, 0)}. Selskapet tilbyr i stedet en forsikring med "
               f"egenandel til premie kr {kr(PR14b)}. Hva er den høyeste egenandelen Stine kan godta hvis forsikringen "
               "skal være minst like god for henne som å stå uten?</p>",
          K(E14),
          [K(g14b_utb), K(g14b_fair), K(g14b_sum)],
          sol("Med egenandel er formuen ikke helt sikker. Uten skade har hun formuen minus premien. Ved skade har hun "
              "formuen minus premien og egenandelen. Den høyeste egenandelen gjør forventet nytte med forsikringen lik "
              "forventet nytte uten (manualen 17.4 og 17.6).",
              [f"Uten forsikring: 0,95 × {kr(u_hel)} + 0,05 × {kr(u_skade)} = {kr(eu_uten)}.",
               f"Med: 0,95 × √{kr(W14 - PR14b)} + 0,05 × √({kr(W14 - PR14b)} − E) = {kr((1 - p14) * u_b, 1)} + 0,05 × "
               f"√({kr(W14 - PR14b)} − E) = {kr(eu_uten)}. Da er √({kr(W14 - PR14b)} − E) = {kr(u_min)}.",
               f"{kr(W14 - PR14b)} − E = {kr(u_min ** 2)}, så E = <b>kr {kr(E14)}</b>."],
              [(f"Kr {kr(g14b_utb)}", f"utbetalingen ved forlis, {kr(L14)} − {kr(E14)}, ikke egenandelen."),
               (f"Kr {kr(g14b_fair)}", f"egenandelen som gjør premien lik forventet erstatning: {pst(p14, 0)} × "
                f"({kr(L14)} − E) = {kr(PR14b)}. Stine er risikoavers og godtar en høyere egenandel enn det."),
               (f"Kr {kr(g14b_sum)}", f"premien er lagt til egenandelen: {kr(E14)} + {kr(PR14b)}. Det er det samlede "
                "fallet i formuen ved forlis.")],
              f"0,95 × {kr(u_b)} + 0,05 × {kr(u_min)} = {kr((1 - p14) * u_b, 1)} + {kr(p14 * u_min, 1)} = "
              f"{kr(eu_uten)}. ✓",
              "Regn først forventet nytte uten forsikring. Den er målet de andre regnestykkene skal treffe."))
EX.append(oppgave(14, "Forsikring av sjarken", "Forsikring og forventet nytte", [17], body14, [p1, p2]))

# ======================================================================= 15
print("\nOppgave 15: Hvem velger egenandelen")
p = ledd("", "<p>Et forsikringsselskap kan ikke se hvor forsiktige kundene er. Det tilbyr full dekning til høy premie "
             "og en avtale med høy egenandel til klart lavere premie. Begge premiene er over forventet erstatning. "
             "Hvilket utsagn om hvem som velger egenandelen, er riktig?</p>",
         B("Særlig forsiktige kunder, fordi de sjelden venter å måtte betale egenandelen"),
         [B("Særlig kunder med høy risiko, fordi de oftest får bruk for forsikringen"),
          B("Ingen risikoaverse kunder, fordi full dekning alltid gir høyest forventet nytte"),
          B("Alle kunder, fordi premien er lavere mens forventet erstatning er den samme")],
         sol("En egenandel gir et gunstigere utvalg: kunder med forsiktig atferd foretrekker egenandel mot lavere "
             "premie, mens kunder med høy risiko vil ha full dekning. Slik skiller tilbudet kundene fra hverandre, selv "
             "om selskapet ikke kan se hvem som er forsiktig (kursgodkjenningen 2026 spørsmål 15, manualen 17.6). "
             "<b>Særlig forsiktige kunder velger egenandelen.</b>",
             None,
             [("Kunder med høy risiko", "de venter oftere skade og må da betale egenandelen ofte. For dem er full "
               "dekning mest verdt."),
              ("Ingen risikoaverse kunder", "full dekning er best bare når premien er aktuarisk rettferdig (H2024 "
               "oppgave 11). Her er premiene over forventet erstatning."),
              ("Alle kunder", "egenandelen senker også forventet erstatning, fordi kunden bærer en del av hvert tap "
               "selv.")],
             None,
             "Spør hvem som taper minst på å bære en del av tapet selv. Det er de som sjelden har skader."))
EX.append(oppgave(15, "Hvem velger egenandelen", "Forsikring", [17], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Delingstallet og pensjonsformuen")
assert lik(round(4_670_000 / 21.15, -3), 221_000) and lik(round(4_670_000 / 17.08, -3), 273_000)   # F13 lb 19
pa = ledd("a", "<p>Rolf og Ulla er født samme år og har like stor pensjonsbeholdning i folketrygden. Begge tar ut "
               "alderspensjon som 67-åringer. Rolf dør 75 år gammel og Ulla 95 år gammel. Hvilket utsagn er riktig?</p>",
          B("De fikk lik årlig pensjon, men Ulla fikk mest i alt fordi pensjonen varer livet ut"),
          [B("Ulla fikk lavere årlig pensjon, fordi delingstallet er høyere for dem som lever lenge"),
           B("De fikk like mye til sammen, fordi begge får tilbake det som står i beholdningen"),
           B("Rolfs arvinger fikk utbetalt resten av pensjonsbeholdningen hans da han døde")],
          sol("Årlig pensjon er pensjonsbeholdningen delt på delingstallet. Delingstallet avhenger av årskullet og "
              "uttaksalderen, ikke av hvor lenge den enkelte faktisk lever. Pensjonen betales så lenge man lever. "
              "Folketrygden er derfor en forsikring mot å leve lenge: de som lever lenge, får mer enn de andre (F13 lb "
              "10–15 og 20, manualen 15.3). <b>Lik årlig pensjon, men Ulla fikk mest i alt.</b>",
              None,
              [("Lavere årlig pensjon for Ulla", "delingstallet er felles for årskullet. Ingen vet på forhånd hvem som "
                "lever lengst."),
               ("Like mye til sammen", "forelesningens to påstander kan ikke begge være sanne. Det er «pensjon så lenge "
                "man lever» som gjelder, ikke «tilbake det man betalte inn» (F13 lb 11–13)."),
               ("Arvingene", "pensjonsbeholdningen i folketrygden arves ikke. Det er innskuddspensjonen som arves av de "
                "etterlatte (F13 lb 24).")],
              "Med samme årlige pensjon får Rolf utbetaling i 8 år og Ulla i 28 år. ✓",
              "Tre av alternativene behandler folketrygden som en sparekonto. Den er en forsikring."))
pb = ledd("b", "<p>Åsne er 40 år. Pensjonsformuen hennes består av pensjonsbeholdningen i folketrygden og en "
               "innskuddspensjon som er plassert i aksjefond og rentefond. Aksjemarkedet faller 30 % på ett år. "
               "Hvilket utsagn er riktig?</p>",
          B("Bare innskuddspensjonen faller i verdi, fordi folketrygden reguleres med lønnsveksten"),
          [B("Begge deler faller i verdi, fordi folketrygden er plassert i Statens pensjonsfond utland"),
           B("Ingen av delene faller, fordi arbeidsgiveren må dekke tapet i innskuddspensjonen"),
           B("Ingen av delene faller, fordi et tap først blir reelt den dagen hun tar ut pensjon")],
          sol("Beholdningen i folketrygden er et beregnet krav som reguleres med lønnsveksten. Den er ikke plassert i "
              "verdipapirer. Innskuddspensjonen er penger arbeidsgiveren har spart for henne. Hun bestemmer selv "
              "plasseringen og bærer avkastningsrisikoen (F13 lb 7, 10, 18 og 24, kursgodkjenningen 2026 spørsmål 20). "
              "<b>Bare innskuddspensjonen faller i verdi.</b>",
              None,
              [("Statens pensjonsfond utland", "folketrygden er ikke fondert. Dagens pensjoner betales med bidrag fra "
                "dem som arbeider nå (F13 lb 7). Beholdningen følger lønnsveksten (F13 lb 18)."),
               ("Arbeidsgiveren dekker tapet", "det gjelder ytelsespensjon, der arbeidsgiveren har lovet en bestemt "
                "pensjon. I en innskuddsordning har den ansatte risikoen (F13 lb 24)."),
               ("Først ved uttak", "verdien av fondsandelene faller når kursene faller. Kursene kan stige igjen før "
                "uttak, men formuen er lavere i dag.")],
              None,
              "Spør hvem som bærer avkastningsrisikoen i hver del: staten, arbeidsgiveren eller hun selv."))
EX.append(oppgave(16, "Delingstallet og pensjonsformuen", "Pensjon", [15],
                  "<p>To uavhengige spørsmål om pensjon.</p>", [pa, pb]))

# ======================================================================= 17
print("\nOppgave 17: Truls vil plukke et aktivt fond")
p = ledd("", "<p>Truls sier: «Noen aktive forvaltere slår markedet. Jeg velger bare et fond som har gjort det de siste ti "
             "årene.» Hvilket utsagn er i tråd med forelesningen om aksjesparing?</p>",
         B("Fond som slo markedet ett tiår, gjør det sjelden det neste, fordi fortiden sier lite"),
         [B("Høyt gebyr er et godt tegn, fordi de dyktigste forvalterne tar best betalt"),
          B("Fond som har overlevd lenge, er trygge valg fordi de dårlige fondene er lagt ned"),
          B("Nordiske fond er det beste valget, fordi Forbrukerrådet fant at de slo indeks klarest")],
         sol("Det er liten sammenheng mellom hvem som slår markedet i én periode og hvem som gjør det i den neste. De 20 "
             "beste forvalterne på 70-tallet gjorde det dobbelt så bra som indeks, men ble slått av markedet på "
             "80-tallet. De beste på 80-tallet var under middels på 90-tallet (F12 lb 74–75). <b>Fond som slo markedet "
             "ett tiår, gjør det sjelden det neste.</b>",
             None,
             [("Høyt gebyr", "aktive fond kan slå indeks før gebyrer, men kundene taper etter gebyrene (F12 lb 76). "
               "Gebyret er kostnaden, ikke et kvalitetstegn."),
              ("Fond som har overlevd", "at dårlige fond legges ned, gjør historikken til de overlevende for pen "
               "(survivorship bias, F12 lb 74). Det sier ikke noe om framtiden."),
              ("Nordiske fond", "Forbrukerrådet (2018) fant at nordiske aktive fond gjorde det svakest, 3,48 "
               "prosentpoeng bak indeks i året. Bare fond i norske aksjer slo indeks (F12 lb 81).")],
             None,
             "Tre av alternativene lover at fortiden viser hvem som vinner framover. Forelesningens poeng er at den "
             "ikke gjør det."))
EX.append(oppgave(17, "Truls vil plukke et aktivt fond", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: Tale og avdragsfriheten")
L18, r18, AVD18, ts18 = 2_400_000, 0.05, 120_000, 0.22
gjeld_uten18 = L18 - AVD18                          # 2 280 000 i år 2 uten avdragsfrihet
ekstra18 = (L18 - gjeld_uten18) * r18               # 6 000
a18 = ekstra18 * (1 - ts18)                         # 4 680
g18_brutto = ekstra18                               # rentefradraget glemt: 6 000
g18_hele = L18 * r18 * (1 - ts18)                   # hele rentekostnaden etter skatt i år 2: 93 600
g18_avdrag = AVD18                                  # det utsatte avdraget: 120 000
assert lik(a18, 4_680) and lik(g18_hele, 93_600) and lik(g18_hele - gjeld_uten18 * r18 * (1 - ts18), a18)
print(f"   ekstra rente {ekstra18}, etter skatt {a18}; gale {g18_brutto}, {g18_hele}, {g18_avdrag}")
p = ledd("", f"<p>Tale har et serielån på kr {kr(L18)} med 5 % rente. Hun betaler renter og kr {kr(AVD18)} i avdrag ved "
             "utgangen av hvert år. Banken gir henne avdragsfrihet i år 1. Renteutgifter gir 22 % fradrag i skatten. Hvor "
             "mye høyere blir rentekostnaden etter skatt i år 2 enn uten avdragsfriheten?</p>",
         K(a18),
         [K(g18_brutto), K(g18_hele), K(g18_avdrag)],
         sol("Avdragsfrihet betyr at gjelden ikke blir mindre. Renten løper da på et høyere beløp året etter. "
             "Renteutgifter trekkes fra i alminnelig inntekt, så rentekostnaden etter skatt er renten ganger (1 − 0,22) "
             "(manualen 16.2, 16.4 og 16.6, H2024 oppgave 14).",
             [f"Uten avdragsfrihet er gjelden {kr(gjeld_uten18)} i år 2. Med avdragsfrihet er den {kr(L18)}, altså "
              f"{kr(AVD18)} høyere.",
              f"Ekstra rente: {kr(AVD18)} × 5 % = {kr(ekstra18)}.",
              f"Etter skatt: {kr(ekstra18)} × (1 − 0,22) = <b>kr {kr(a18)}</b>."],
             [(f"Kr {kr(g18_brutto)}", "rentefradraget er glemt."),
              (f"Kr {kr(g18_hele)}", f"hele rentekostnaden etter skatt i år 2: {kr(L18)} × 5 % × 0,78. Spørsmålet gjelder "
               "økningen."),
              (f"Kr {kr(g18_avdrag)}", "avdraget som er utsatt. Det er ikke en kostnad. Hun skylder fortsatt beløpet.")],
             f"Rente etter skatt i år 2: med avdragsfrihet {kr(g18_hele)}, uten {kr(gjeld_uten18)} × 5 % × 0,78 = "
             f"{kr(gjeld_uten18 * r18 * (1 - ts18))}. Forskjellen er {kr(a18)}. ✓",
             "Avdragsfrihet er verken et rentefritt lån eller et tap på hele avdraget. Kostnaden er renten på beløpet "
             "som er utsatt."))
EX.append(oppgave(18, "Avdragsfrihet i ett år", "Lån", [16], "", [p]))

# ======================================================================= 19
print("\nOppgave 19: Viktor og myntkastet")
p = ledd("", "<p>Viktor har god råd. Han får tilbud om et veddemål med ett myntkast: kron gir ham kr 1 500 og mynt "
             "koster ham kr 1 000. Han vet at veddemålet lønner seg i snitt, men takker likevel nei. Hvilken "
             "skjevhet beskriver best valget hans?</p>",
         ("Tapsaversjon", []),
         [("Overkonfidens", []), ("Flokkmentalitet", []), ("Tilgjengelighetsbias", [])],
         sol("Tapsaversjon er at folk føler tap sterkere enn de gleder seg over like store gevinster. Tap og gevinst "
             "måles mot formuen ved start, ikke mot nivået på formuen (F16 lb 16 og 28, manualen 18.2). Veddemålet har "
             "forventet gevinst 0,5 × 1 500 − 0,5 × 1 000 = kr 250 og betyr lite for en som har god råd. <b>"
             "Tapsaversjon.</b>",
             None,
             [("Overkonfidens", "å overvurdere egne evner til å forutsi utfallet. Viktor tror ikke at han kan forutsi "
               "myntkastet."),
              ("Flokkmentalitet", "å følge mengden. Ingen andre er med i historien."),
              ("Tilgjengelighetsbias", "å overvurdere sannsynligheten for noe fordi man husker levende eksempler. "
               "Viktor kjenner sannsynligheten: den er 50 %.")],
             None,
             "Se etter hva som styrer valget: synet på egne evner, flokken, levende eksempler eller frykten for tapet."))
EX.append(oppgave(19, "Viktor og myntkastet", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove18",
    "kind": "mock",
    "label": "Prøveeksamen 18",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Fjerde trekning av prediksjonen for eksamen 12. november 2026: H2024-formen med nye vrier. Oppgave 1–12 er "
             "skattedelen (18 ledd) og oppgave 13–19 finansdelen (12 ledd). Vriene er blant annet salg med "
             "ubenyttet skjerming, aksjegevinsten som tilsvarer en renteinntekt, AERT for en eier, utbytte "
             "til formuesskatt med gjeldsreduksjon, børsnotert mot unotert verdi, monopol, kontantstrømskatt, "
             "bunnfradraget som gir et bestemt proveny, humankapitalen som fyller hele finansformuen og høyeste "
             "egenandel."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd, fire alternativer og ett riktig. 3 poeng for rett, −1 for feil.",
        "Alle satser står i teksten, slik kunngjort 6. november. Noen er forenklet. Da sier teksten fra.",
        "Laget av appen ut fra prediksjonen. Det er ikke kontrollert av kurset.",
    ],
    "practiceNote": ("Flere ledd spør etter en annen ukjent enn du er vant til. Skriv opp den vanlige likningen først og "
                     "løs den for det oppgaven spør om. Gale alternativer er ofte et mellomtall eller svaret på "
                     "nabospørsmålet."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove18.json")
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
