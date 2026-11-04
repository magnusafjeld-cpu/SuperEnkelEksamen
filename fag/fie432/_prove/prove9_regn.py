"""Prøveeksamen 9 (FIE432): regner alle tall, bygger prove9.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove9_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p9) sier,
3. skriver prove9.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p9"]
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
print("\nOppgave 1: Synne og aksjene i Havørn ASA")
K1 = 500_000
r1 = [0.03, 0.02, 0.04, 0.025]
D1 = [10_000, 22_000, 0, 6_000]
MV1 = 610_000                                     # støy
grl1, skj1, tilg1, skpl1, ub1 = [], [], [], [], []
_ub = 0.0
for _r, _d in zip(r1, D1):
    _g = K1 + _ub
    _s = _g * _r
    _t = _s + _ub
    grl1.append(_g)
    skj1.append(_s)
    tilg1.append(_t)
    skpl1.append(max(0.0, _d - _t))
    _ub = max(0.0, _t - _d)
    ub1.append(_ub)
assert lik(skpl1[1], 6_900) and lik(ub1[3], 27_000) and lik(ub1[1], 0)
a1 = skpl1[1]
g1a_ikke_grl = D1[1] - (K1 * r1[1] + ub1[0])      # framført trukket fra, men ikke lagt til grunnlaget
g1a_glemt = D1[1] - K1 * r1[1]                    # framført skjerming glemt
g1a_ikke_trukket = D1[1] - grl1[1] * r1[1]        # grunnlaget økt, men framført ikke trukket fra
b1 = ub1[3]
g1b_ikke_grl = ub1[2] + K1 * r1[3] - D1[3]        # framført ikke lagt til grunnlaget i år 4
g1b_aar3 = ub1[2]                                 # beholdningen ved utgangen av år 3
g1b_bare4 = skj1[3] - D1[3]                       # bare årets rest i år 4
S1 = 460_000
tap1 = K1 - S1
c1 = tap1 * TE
g1c_lagt_til = (tap1 + ub1[3]) * TE               # ubenyttet skjerming lagt til tapet
g1c_uten_oppj = tap1 * 0.22                       # oppjusteringen glemt
assert lik(c1, 15_136) and lik(g1c_lagt_til, 25_352.8)
print(f"   grunnlag {grl1}, skjerming {skj1}, skattepliktig {skpl1}, ubenyttet {ub1}")
print(f"   a {a1}: {g1a_ikke_grl}, {g1a_glemt}, {g1a_ikke_trukket}; b {b1}: {g1b_ikke_grl}, {g1b_aar3}, {g1b_bare4}; "
      f"c {c1}: {g1c_lagt_til}, {g1c_uten_oppj}")

tab1 = ('<table class="data"><tr><th>År</th><th>Skjermingsrente</th><th>Utbytte</th></tr>' + "".join(
    f'<tr><td>{k + 1}</td><td class="n">{pst(r, 1)}</td><td class="n">{kr(d)}</td></tr>'
    for k, (r, d) in enumerate(zip(r1, D1))) + "</table>")
tabl1 = ('<table class="data"><tr><th>År</th><th>Grunnlag</th><th>Skjerming</th><th>Tilgjengelig</th>'
         '<th>Utbytte</th><th>Skattepliktig</th><th>Ubenyttet ved årsslutt</th></tr>' + "".join(
             f'<tr><td>{k + 1}</td><td class="n">{kr(grl1[k])}</td><td class="n">{kr(skj1[k])}</td>'
             f'<td class="n">{kr(tilg1[k])}</td><td class="n">{kr(D1[k])}</td><td class="n">{kr(skpl1[k])}</td>'
             f'<td class="n">{kr(ub1[k])}</td></tr>' for k in range(4)) + "</table>")
body1 = (f"<p>Synne kjøpte aksjer i Havørn ASA for kr {kr(K1)} i februar år 1 og eide dem ved utgangen av hvert av "
         f"årene 1–4. Markedsverdien var kr {kr(MV1)} ved utgangen av år 2. Skjermingsrenten og utbyttet hun mottok, var:</p>"
         + tab1)
pa = ledd("a", "<p>Hva er skattepliktig utbytte i år 2?</p>",
          (f"Kr {kr(a1)}", [kr(a1)]),
          [(f"Kr {kr(g1a_ikke_grl)}", [kr(g1a_ikke_grl)]),
           (f"Kr {kr(g1a_glemt)}", [kr(g1a_glemt)]),
           (f"Kr {kr(g1a_ikke_trukket)}", [kr(g1a_ikke_trukket)])],
          sol("Skjermingsfradraget er grunnlaget ganget med årets skjermingsrente. Grunnlaget er kostprisen pluss ubenyttet "
              "skjerming fra tidligere år. Den framførte skjermingen trekkes i tillegg fra utbyttet. Skattepliktig utbytte er "
              "utbyttet minus årets og framført skjerming, aldri under null (manualen 5.3).",
              [f"År 1: {kr(K1)} × 3,0 % = {kr(skj1[0])}. Utbyttet er {kr(D1[0])}, så ingenting er skattepliktig og "
               f"{kr(ub1[0])} framføres.",
               f"År 2: grunnlaget er {kr(K1)} + {kr(ub1[0])} = {kr(grl1[1])}. Skjermingen er {kr(grl1[1])} × 2,0 % = "
               f"{kr(skj1[1])}. Tilgjengelig: {kr(skj1[1])} + {kr(ub1[0])} = {kr(tilg1[1])}.",
               f"Skattepliktig: {kr(D1[1])} − {kr(tilg1[1])} = <b>kr {kr(a1)}</b>."],
              [(f"Kr {kr(g1a_ikke_grl)}", f"de {kr(ub1[0])} er trukket fra utbyttet, men ikke lagt til grunnlaget: "
                f"{kr(D1[1])} − {kr(K1 * r1[1])} − {kr(ub1[0])}."),
               (f"Kr {kr(g1a_glemt)}", f"den framførte skjermingen fra år 1 er glemt: {kr(D1[1])} − {kr(K1 * r1[1])}."),
               (f"Kr {kr(g1a_ikke_trukket)}", f"grunnlaget er økt til {kr(grl1[1])}, men de {kr(ub1[0])} er ikke trukket fra "
                f"utbyttet: {kr(D1[1])} − {kr(skj1[1])}.")],
              f"Tilgjengelig skjerming {kr(tilg1[1])} + skattepliktig {kr(a1)} = {kr(D1[1])}, som er utbyttet. Ingenting "
              f"framføres til år 3. Markedsverdien ved utgangen av år 2 er støy: skjermingen regnes av kostprisen, ikke av "
              f"markedsverdien. ✓"))
pb = ledd("b", "<p>Hvor stor er akkumulert ubenyttet skjerming ved utgangen av år 4?</p>",
          (f"Kr {kr(b1)}", [kr(b1)]),
          [(f"Kr {kr(g1b_ikke_grl)}", [kr(g1b_ikke_grl)]),
           (f"Kr {kr(g1b_aar3)}", [kr(g1b_aar3)]),
           (f"Kr {kr(g1b_bare4)}", [kr(g1b_bare4)])],
          sol("Ubenyttet skjerming framføres på aksjen, legges til grunnlaget året etter og kan brukes mot senere utbytte. "
              "Når den er brukt opp, er grunnlaget igjen bare kostprisen (manualen 5.3).",
              [f"År 3: ingenting er framført fra år 2, så grunnlaget er {kr(K1)}. Skjermingen {kr(K1)} × 4,0 % = {kr(skj1[2])} "
               f"blir ubenyttet, fordi det ikke kom utbytte.",
               f"År 4: grunnlaget er {kr(K1)} + {kr(ub1[2])} = {kr(grl1[3])}. Skjermingen er {kr(grl1[3])} × 2,5 % = "
               f"{kr(skj1[3])}. Tilgjengelig: {kr(skj1[3])} + {kr(ub1[2])} = {kr(tilg1[3])}.",
               f"Utbyttet på {kr(D1[3])} bruker en del: {kr(tilg1[3])} − {kr(D1[3])} = <b>kr {kr(b1)}</b>."],
              [(f"Kr {kr(g1b_ikke_grl)}", f"de {kr(ub1[2])} fra år 3 er ikke lagt til grunnlaget i år 4: "
                f"{kr(K1)} × 2,5 % = {kr(K1 * r1[3])}. Så {kr(ub1[2])} + {kr(K1 * r1[3])} − {kr(D1[3])}."),
               (f"Kr {kr(g1b_aar3)}", "beholdningen ved utgangen av år 3. År 4 er ikke regnet med."),
               (f"Kr {kr(g1b_bare4)}", f"bare årets rest i år 4, {kr(skj1[3])} − {kr(D1[3])}. Det som ble framført fra år 3, "
                "er glemt.")],
              f"Hele tabellen:</p>{tabl1}<p>Raden for år 4: {kr(ub1[2])} × 1,025 + {kr(K1)} × 2,5 % − {kr(D1[3])} = "
              f"{kr(b1)}. ✓"))
pc = ledd("c", f"<p>Synne selger alle aksjene i mars år 5 for kr {kr(S1)}. Hun har nok annen inntekt til å utnytte et "
               "fradrag. Bruk skattereglene for 2026. Hvor mye sparer hun i skatt på grunn av salget? Svar i hele kroner.</p>",
          (f"Kr {kr(c1)}", [kr(c1)]),
          [(f"Kr {kr(g1c_lagt_til)}", [kr(g1c_lagt_til)]),
           (f"Kr {kr(g1c_uten_oppj)}", [kr(g1c_uten_oppj)]),
           ("Kr 0", ["0"])],
          sol("Et realisert tap på aksjer er fradragsberettiget og oppjusteres med samme faktor som en gevinst, 1,72. Med "
              "22 % skatt på alminnelig inntekt er hver krone tap verdt 22 % × 1,72 = 37,84 % i lavere skatt. Satsene står i "
              "k20. Ubenyttet skjerming kan redusere en gevinst til null, men kan verken skape eller øke et tap. I salgsåret "
              "gis det ingen ny skjerming (manualen 5.3, 5.4 og k18).",
              [f"Tapet: {kr(S1)} − {kr(K1)} = −{kr(tap1)}.",
               f"De {kr(ub1[3])} i ubenyttet skjerming fra b går tapt. De øker ikke tapet.",
               f"Skatteverdien: {kr(tap1)} × 37,84 % = <b>kr {kr(c1)}</b>."],
              [(f"Kr {kr(g1c_lagt_til)}", f"den ubenyttede skjermingen er lagt til tapet: ({kr(tap1)} + {kr(ub1[3])}) × 37,84 % "
                f"= {kr(g1c_lagt_til, 2)}."),
               (f"Kr {kr(g1c_uten_oppj)}", f"oppjusteringen er glemt: {kr(tap1)} × 22 %."),
               ("Kr 0", "tapet er behandlet som om det ikke gir fradrag. Det gjelder selskapsaksjonærer under fritaksmetoden, "
                "ikke personer.")],
              f"Oppjuster grunnlaget i stedet: {kr(tap1)} × 1,72 = {kr(tap1 * 1.72)} i fradrag. {kr(tap1 * 1.72)} × 22 % = "
              f"{kr(c1)}. ✓",
              "Alternativet med 22 % uten oppjustering er alltid 58 % av det riktige. Ser du det paret, er det høyeste av de to "
              "som regel riktig."))
EX.append(oppgave(1, "Synne og aksjene i Havørn ASA", "Aksjonærmodellen", [5], body1, [pa, pb, pc]))

# ======================================================================= 2
print("\nOppgave 2: Kasper Holding AS")
U2v, U2f = 3_000_000, 1_500_000
a2 = U2f * 0.03 * 0.22
g2a_konsern = (U2v + U2f) * 0.03 * 0.22           # konsernunntaket glemt
g2a_sats = U2f * 0.03                             # 3 % lest som skattesats
g2a_fritak = U2f * 0.22                           # fritaksmetoden glemt for 40 %-posten
B2, r2, n2 = 2_000_000, 0.05, 10
T2 = B2 * TE
pv2 = T2 / (1 + r2) ** n2
b2 = T2 - pv2
g2b_enkel = T2 * r2 * n2                          # enkel rente i stedet for nåverdi
assert lik(a2, 9_900) and lik(T2, 756_800)
assert kr(T2 - float(rund(pv2))) == kr(b2)
print(f"   a {a2}: {g2a_konsern}, {g2a_sats}, {g2a_fritak}; b skatt {T2}, nåverdi senere {pv2:.2f}, verdi {b2:.2f}, "
      f"enkel {g2b_enkel}")
body2 = ("<p>Kasper eier alle aksjene i Kasper Holding AS. Holdingselskapet eier 100 % av aksjene i Vestbris AS og 40 % av "
         "aksjene i Fjordglass AS. Begge er norske aksjeselskaper. Bruk skattereglene for 2026.</p>")
pa = ledd("a", f"<p>I 2026 mottar Kasper Holding AS kr {kr(U2v)} i utbytte fra Vestbris og kr {kr(U2f)} fra Fjordglass. "
               "Hvor mye skatt betaler holdingselskapet på utbyttene?</p>",
          (f"Kr {kr(a2)}", [kr(a2)]),
          [(f"Kr {kr(g2a_konsern)}", [kr(g2a_konsern)]),
           (f"Kr {kr(g2a_sats)}", [kr(g2a_sats)]),
           (f"Kr {kr(g2a_fritak)}", [kr(g2a_fritak)])],
          sol("Fritaksmetoden gjør utbytte til et aksjeselskap i hovedsak skattefritt. Etter treprosentregelen skal likevel "
              "3 % av utbyttet inntektsføres og skattlegges med 22 %, altså 0,66 % av utbyttet. Regelen gjelder ikke når "
              "mottakeren eier mer enn 90 % av aksjene og stemmene (konsern). Da er utbyttet helt skattefritt (manualen 6.2).",
              [f"Vestbris er eid 100 %: konsern, så utbyttet på {kr(U2v)} er helt skattefritt.",
               f"Fjordglass er eid 40 %: {kr(U2f)} × 3 % = {kr(g2a_sats)} inntektsføres.",
               f"Skatt: {kr(g2a_sats)} × 22 % = <b>kr {kr(a2)}</b>."],
              [(f"Kr {kr(g2a_konsern)}", f"konsernunntaket er glemt: 0,66 % av begge utbyttene, {kr(U2v + U2f)}."),
               (f"Kr {kr(g2a_sats)}", "beløpet som inntektsføres, ikke skatten. 3 % er lest som skattesats."),
               (f"Kr {kr(g2a_fritak)}", f"fritaksmetoden er glemt for Fjordglass: {kr(U2f)} × 22 %.")],
              f"{kr(U2f)} × 0,66 % = {kr(a2)}. ✓"))
pb = ledd("b", f"<p>Kasper vil ta ut kr {kr(B2)} av holdingselskapet som utbytte, enten nå eller om ti år. Anta at "
               "eierskatten blir like stor i kroner uansett når han tar ut pengene. Diskonteringsrenten er 5 %. Se bort fra "
               "skjermingsfradraget. Hva er det verdt i nåverdi å utsette eierskatten i ti år?</p>",
          (f"Kr {kr(b2)}", [kr(b2)]),
          [(f"Kr {kr(T2)}", [kr(T2)]),
           (f"Kr {kr(pv2)}", [kr(pv2)]),
           (f"Kr {kr(g2b_enkel)}", [kr(g2b_enkel)])],
          sol("Holdingselskapet utsetter eierskatten, men fjerner den ikke (manualen 6.3). En utsatt skatt er et rentefritt lån "
              "fra staten (6.4): verdien er skatten i dag minus nåverdien av den samme skatten betalt senere. Eierskatten er "
              "22 % × 1,72 = 37,84 % (k20).",
              [f"Eierskatten: {kr(B2)} × 37,84 % = {kr(T2)}.",
               f"Nåverdien av å betale den om ti år: {kr(T2)} / 1,05<sup>10</sup> = {kr(pv2)}.",
               f"Verdien av utsettelsen: {kr(T2)} − {kr(pv2)} = <b>kr {kr(b2)}</b>."],
              [(f"Kr {kr(T2)}", "fordelen er satt lik selve skatten. Skatten kommer tilbake om ti år. Det er bare renten på "
                "den som er gevinsten."),
               (f"Kr {kr(pv2)}", "nåverdien av skatten som betales om ti år. Det er kostnaden ved å vente, ikke verdien."),
               (f"Kr {kr(g2b_enkel)}", f"enkel rente: {kr(T2)} × 5 % × 10. Det er verken rentes rente eller nåverdi.")],
              f"Framtidsverdien av fordelen, {kr(b2)} × 1,05<sup>10</sup> = {kr(float(rund(b2)) * 1.05 ** 10)}, er rentes rente på "
              f"skatten i ti år: {kr(T2)} × (1,05<sup>10</sup> − 1) = {kr(T2 * (1.05 ** 10 - 1))}. ✓"))
EX.append(oppgave(2, "Kasper Holding AS og to datterselskaper", "Fritaksmetoden", [6], body2, [pa, pb]))

# ======================================================================= 3
print("\nOppgave 3: Ingeborgs formue")
bolig3, fond3, bank3, G3 = 6_000_000, 2_500_000, 1_500_000, 4_000_000
ak3 = 0.60
sum3 = bolig3 + fond3 + bank3
gj_fond3 = G3 * fond3 / sum3
red3 = gj_fond3 * ak3 * 0.20
fr3 = G3 - red3
g3_hele = G3 - gj_fond3 * 0.20                    # hele fondet som aksjer
gj_bolig3 = G3 * bolig3 / sum3
g3_bolig = G3 - red3 - gj_bolig3 * 0.75           # boliggjelden også avkortet
fv3 = [bolig3 * 0.25, fond3 * (ak3 * 0.8 + (1 - ak3)), bank3]
g3_fv = G3 - G3 * fv3[1] / sum(fv3) * ak3 * 0.20  # fordelt etter formuesverdier
kontroll3 = G3 * (1 - fond3 * ak3 * 0.20 / sum3)
assert lik(fr3, 3_880_000) and lik(kontroll3, fr3) and lik(g3_bolig, 2_080_000)
print(f"   gjeld på fondet {gj_fond3}, reduksjon {red3}, fradrag {fr3}; gale {g3_hele}, {g3_bolig}, {g3_fv:.1f}")
p = ledd("",
         f"<p>Ingeborg eier en primærbolig med markedsverdi kr {kr(bolig3)}, et kombinasjonsfond verdt kr {kr(fond3)} og "
         f"kr {kr(bank3)} i bankinnskudd. Fondet har 60 % aksjer og 40 % obligasjoner. Gjelden hennes er kr {kr(G3)}. Aksjer "
         "verdsettes til 80 %, primærboligen til 25 % og bankinnskudd og obligasjoner til 100 %. Hvor stor er Ingeborgs "
         "fradragsberettigede gjeld i formuesskatten?</p>",
         (f"Kr {kr(fr3)}", [kr(fr3)]),
         [(f"Kr {kr(g3_hele)}", [kr(g3_hele)]),
          (f"Kr {kr(g3_bolig)}", [kr(g3_bolig)]),
          (f"Kr {kr(g3_fv)}", [kr(g3_fv)])],
         sol("Gjelden fordeles etter bruttoverdiene, altså markedsverdiene før rabatt. Gjelden som faller på et aktivum med "
             "rabatt som utløser reduksjon, avkortes med rabatten. I et kombinasjonsfond har bare aksjedelen rabatt, så bare "
             "den delen trekker gjelden ned. Gjeld på primærbolig og bankinnskudd avkortes ikke (manualen 7.2 og 7.4).",
             [f"Bruttoformuen er {kr(sum3)}. Fondet er {pst(fond3 / sum3, 0)} av den, så {kr(gj_fond3)} av gjelden faller "
              "på fondet.",
              f"Bare aksjedelen har rabatt: {kr(gj_fond3)} × 60 % × 20 % = {kr(red3)} i reduksjon.",
              f"Fradragsberettiget gjeld: {kr(G3)} − {kr(red3)} = <b>kr {kr(fr3)}</b>."],
             [(f"Kr {kr(g3_hele)}", f"hele fondet er behandlet som et aksjefond: {kr(gj_fond3)} × 20 % = {kr(gj_fond3 * 0.2)} "
               "i reduksjon. Obligasjonsdelen har ingen rabatt."),
              (f"Kr {kr(g3_bolig)}", f"gjelden på boligen, {kr(gj_bolig3)}, er også avkortet med 75 %. Primærbolig utløser "
               "ingen gjeldsreduksjon."),
              (f"Kr {kr(g3_fv)}", f"gjelden er fordelt etter formuesverdiene (til sammen {kr(sum(fv3))}) i stedet for "
               "bruttoverdiene.")],
             f"Samleformelen: {kr(G3)} × (1 − {kr(fond3 * ak3)} × 20 % / {kr(sum3)}) = {kr(G3)} × "
             f"{kr(1 - fond3 * ak3 * 0.2 / sum3, 2)} = {kr(kontroll3)}. ✓ Boligens verdsetting til 25 % er støy her: den "
             "endrer formuesverdien, ikke gjeldsfradraget.",
             "Reduksjonen kan ikke være større enn 20 % av gjelden på fondet, altså 200 000. Det stryker alternativet der "
             "fradraget er nesten halvert."))
EX.append(oppgave(3, "Ingeborgs bolig, fond og bankinnskudd", "Formuesskatt", [7], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: avkastning, sparing og leie")
L4, k4, t4, r4 = 150_000, 30_000, 0.22, 0.06
cf4 = L4 - k4
c4 = cf4 * (1 - t4) / (r4 * (1 - t4))
g4_etter_for = cf4 * (1 - t4) / r4                # strøm etter skatt, rente før skatt
g4_for_etter = cf4 / (r4 * (1 - t4))              # strøm før skatt, rente etter skatt
g4_brutto = L4 / r4                               # kostnadene glemt
assert lik(c4, 2_000_000) and lik(cf4 / r4, c4)
print(f"   c {c4}: {g4_etter_for}, {g4_for_etter:.2f}, {g4_brutto}")
body4 = "<p>Tre uavhengige spørsmål.</p>"
pa = ledd("a", "<p>Trym vil vite hvor stor superprofitt aksjefondet hans ga i fjor. Hvilket utsagn om superprofitt er "
               "riktig?</p>",
          ("Det er avkastningen ut over risikofri rente. Skjermingen holder normalavkastningen utenfor eierskatten, så det er "
           "i hovedsak den eierskatten treffer", []),
          [("Det er avkastningen ut over inflasjonen, altså realavkastningen. Den er grunnlaget for eierskatten, fordi "
            "skjermingen skal ta bort inflasjonen fra avkastningen", []),
           ("Det er avkastningen ut over aksjemarkedets snitt. Skjermingsrenten settes lik forventet aksjeavkastning, så bare "
            "den som slår markedet, betaler eierskatt", []),
           ("Det er avkastningen ut over bankens utlånsrente. Skjermingsrenten settes lik utlånsrenten, så bare avkastning "
            "over den treffes av eierskatten", [])],
          "<p><b>Regelen.</b> Superprofitt, på engelsk excess return, er avkastningen ut over risikofri rente, r − r<sub>f</sub>. "
          "Kurset måler den risikofrie renten med tre måneders statskasseveksel (manualen 2.3, forelesning 2). Skjermingsrenten "
          "er en risikofri rente etter skatt (5.2), så normalavkastningen slipper eierskatt og det er meravkastningen som "
          "treffes (k9). <b>Utsagnet om risikofri rente er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Ut over inflasjonen</b> = realavkastning, et annet begrep. Skjermingen "
          "bygger på statskasseveksler, ikke på inflasjonen.<br><b>Ut over aksjemarkedets snitt</b> = skjermingsrenten er "
          "statskasseveksel pluss 0,5 prosentpoeng, ganget med (1 − 22 %), ikke forventet aksjeavkastning.<br>"
          "<b>Ut over utlånsrenten</b> = risikofri rente måles med statskasseveksler, ikke med bankens utlånsrente. "
          "Skjermingsrenten ligger under lånerenten (manualen 6.4).</p>")
pb = ledd("b", "<p>Liv bruker mindre enn hun tjener i år og sparer resten til neste år. Skatten på renteinntekter øker fra "
               "22 % til 30 %. Fradraget for renteutgifter øker også til 30 %. Hvilket utsagn er riktig?</p>",
          ("Budsjettlinjen blir slakere og dreier om inntektspunktet. Substitusjonseffekten trekker mot mer konsum i år, "
           "inntektseffekten mot mindre, så virkningen på sparingen er ubestemt", []),
          [("Budsjettlinjen blir brattere, fordi skatten gjør konsum neste år dyrere målt i konsum i år. Liv vil derfor spare "
            "mer", []),
           ("Budsjettlinjen forskyves parallelt innover, fordi skatten gjør Liv fattigere i begge perioder. Hun sparer like "
            "mye som før", []),
           ("Budsjettlinjen blir slakere. Liv sparer entydig mindre, fordi substitusjonseffekten og inntektseffekten begge "
            "trekker mot mer konsum i år", [])],
          "<p><b>Regelen.</b> Budsjettlinjen er C<sub>2</sub> = Y<sub>2</sub> + (Y<sub>1</sub> − C<sub>1</sub>)(1 + r(1 − t)). "
          "Den går alltid gjennom utstyrspunktet (Y<sub>1</sub>, Y<sub>2</sub>) og har stigningstall −(1 + r(1 − t)). Høyere "
          "t gir lavere rente etter skatt. Linjen vipper om utstyrspunktet og blir slakere (manualen 2.6, forelesning 2 "
          "lysbilde 53–55). For en långiver trekker substitusjonseffekten mot mer konsum i dag, mens inntektseffekten trekker "
          "mot mindre, fordi hun får mindre renteinntekt. <b>Totalvirkningen er ubestemt.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Brattere</b> = feil fortegn. Lavere rente etter skatt gjør "
          "framtidig konsum dyrere, så linjen blir slakere.<br><b>Parallelt innover</b> = linjen vipper om utstyrspunktet, som "
          "er tilgjengelig uansett rente.<br><b>Entydig mindre</b> = det gjelder en låntaker, der begge effektene trekker samme "
          "vei. Liv er långiver.</p>")
pc = ledd("c", f"<p>Halvor eier en rekke garasjer som gir kr {kr(L4)} i leie hvert år for alltid. Kostnadene er kr {kr(k4)} "
               "i året. Leie og renter skattlegges med 22 %. Kostnadene er fradragsberettiget. En plassering med samme risiko "
               "gir 6 % rente før skatt. Se bort fra formuesskatt. Hva er garasjene verdt for Halvor?</p>",
          (f"Kr {kr(c4)}", [kr(c4)]),
          [(f"Kr {kr(g4_etter_for)}", [kr(g4_etter_for)]),
           (f"Kr {kr(g4_for_etter)}", [kr(g4_for_etter)]),
           (f"Kr {kr(g4_brutto)}", [kr(g4_brutto)])],
          sol("En evig kontantstrøm er verdt V = CF/r. Strømmen og renten må måles på samme måte: før skatt med rente før "
              "skatt, eller etter skatt med rente etter skatt (manualen 2.5, forelesning 3 appendiks).",
              [f"Netto leie: {kr(L4)} − {kr(k4)} = {kr(cf4)}, etter skatt {kr(cf4)} × 0,78 = {kr(cf4 * 0.78)}.",
               "Renten etter skatt: 6 % × 0,78 = 4,68 %.",
               f"Verdien: {kr(cf4 * 0.78)} / 0,0468 = <b>kr {kr(c4)}</b>."],
              [(f"Kr {kr(g4_etter_for)}", f"strøm etter skatt diskontert med rente før skatt: {kr(cf4 * 0.78)} / 0,06."),
               (f"Kr {kr(g4_for_etter)}", f"strøm før skatt diskontert med rente etter skatt: {kr(cf4)} / 0,0468. Det er feilen "
                "forelesningen peker på i appendikset."),
               (f"Kr {kr(g4_brutto)}", f"kostnadene er glemt: {kr(L4)} / 0,06.")],
              f"Før skatt: {kr(cf4)} / 0,06 = {kr(cf4 / r4)}. Samme verdi, fordi skatten treffer leien og den alternative "
              "plasseringen med samme sats. ✓"))
EX.append(oppgave(4, "Trym, Liv og Halvor plasserer penger", "Sparing", [2], body4, [pa, pb, pc]))

# ======================================================================= 5
print("\nOppgave 5: to skatter i et lite land")
t5, eS5, eD5 = 200, 0.2, 0.6
b5 = t5 * eS5 / (eS5 + eD5)
g5_byttet = t5 * eD5 / (eS5 + eD5)
g5_nevner = t5 * eS5 / eD5
assert lik(b5, 50) and lik(b5 + g5_byttet, t5)
print(f"   b {b5}: {g5_byttet}, {g5_nevner:.4f}, {t5}")
body5 = ("<p>Myndighetene i et lite land vurderer to skatter. Kapitalen er fullt mobil mellom land. Avkastningskravet etter "
         "skatt er gitt fra utlandet. Arbeidskraften flytter ikke.</p>")
pa = ledd("a", "<p>Selskapsskatten økes. Hvilket utsagn om hvem som bærer skatteøkningen, er riktig?</p>",
          ("Arbeidstakerne bærer det meste gjennom lavere lønn, fordi kapital flytter ut og hver arbeider får mindre kapital "
           "å jobbe med", []),
          [("Selskapene bærer skatten, fordi det er de som betaler den inn til staten. Det endres ikke av at kapitalen kan "
            "flytte", []),
           ("Kapitaleierne bærer det meste gjennom lavere avkastning etter skatt, slik kapitalen gjør i Harbergers analyse av "
            "selskapsskatten", []),
           ("Halvparten bæres alltid av lønnstakere og produktpriser, slik Congressional Budget Office har vist for alle "
            "land", [])],
          "<p><b>Regelen.</b> Den minst mobile parten bærer skatten, fordi den har færrest alternativer å rømme til: insidens "
          "er et spørsmål om mobilitet, ikke om hvem som betaler inn (manualen 11.4). Her er avkastningskravet etter skatt gitt "
          "fra utlandet. Tilbudet av kapital er da perfekt elastisk ved det kravet. Den perfekt elastiske siden bærer "
          "ingenting. Når selskapsskatten øker, flytter kapital ut til avkastningen før skatt har steget nok til at kravet "
          "etter skatt igjen er oppfylt. Mindre kapital per arbeider gir lavere lønn, så skatten havner hos arbeidskraften, "
          "som ikke kan flytte. Manualen 11.6 beskriver samme mekanisme: når kapitalen krymper, presses lønningene ned. "
          "Forelesning 9 lysbilde 3 spør nettopp hva økt selskapsskatt gjør med lønningene. "
          "<b>Utsagnet om arbeidstakerne er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Selskapene bærer den</b> = formell insidens forkledd som reell.<br>"
          "<b>Harberger</b> = Harberger (1962) ser på en lukket økonomi der kapitalen bare kan flytte mellom sektorer i "
          "landet. Der finnes det ingen avkastning utenfra å flykte til, så kapitalen bærer det meste (11.6). Her er "
          "avkastningen etter skatt låst fast av utlandet, så kapitaleierne kan ikke bære skatten.<br>"
          "<b>Halvparten alltid</b> = CBO legger til grunn at 50 % av selskapsskatten i USA overveltes på lønninger og "
          "produktpriser. Det er en antakelse for ett land, ikke en lov.</p>")
pb = ledd("b", f"<p>Myndighetene innfører også en avgift på kr {kr(t5)} per døgn på utleie av hytter. Tilbudselastisiteten "
               "er 0,2 og etterspørselselastisiteten −0,6, målt i likevekten før avgiften. Kurvene er lineære. Hvor mye stiger "
               "prisen leietakerne betaler per døgn?</p>",
          (f"Kr {kr(b5, 2)}", [kr(b5, 2)]),
          [(f"Kr {kr(g5_byttet, 2)}", [kr(g5_byttet, 2)]),
           (f"Kr {kr(g5_nevner, 2)}", [kr(g5_nevner, 2)]),
           (f"Kr {kr(t5, 2)}", [kr(t5, 2)])],
          sol("Konsumentenes andel av en stykkskatt er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|). Den minst elastiske "
              "siden bærer mest (manualen 11.4). Med lineære kurver gjelder andelen for hele avgiften.",
              [f"Konsumentenes andel: 0,2 / (0,2 + 0,6) = {pst(eS5 / (eS5 + eD5), 0)}.",
               f"Prisøkningen: {kr(t5)} × 25 % = <b>kr {kr(b5, 2)}</b>."],
              [(f"Kr {kr(g5_byttet, 2)}", "utleiernes andel. Formelen er snudd."),
               (f"Kr {kr(g5_nevner, 2)}", f"feil nevner: 0,2 / 0,6 × {kr(t5)}."),
               (f"Kr {kr(t5, 2)}", "hele avgiften på leietakerne. Det gjelder bare når etterspørselen er perfekt uelastisk eller "
                "tilbudet perfekt elastisk.")],
              f"Utleierne bærer {kr(t5)} − {kr(b5)} = {kr(g5_byttet)}. Tilbudet er minst elastisk (0,2 mot 0,6), så utleierne "
              "skal bære mest. ✓"))
EX.append(oppgave(5, "Skatter i et lite land med åpne kapitalmarkeder", "Skatteincidens", [11], body5, [pa, pb]))

# ======================================================================= 6
print("\nOppgave 6: Ulrik og lån med høy rente")
body6 = ("<p>Ulrik vurderer å låne ut penger privat i gråmarkedet til 18 % rente eller å kjøpe høyrenteobligasjoner med "
         "12 % kupong.</p>")
pa = ledd("a", "<p>Hvilket utsagn er i tråd med pensum?</p>",
          ("Gråmarkedsrenten skattlegges med 22 %, mens et tap ikke gir fradrag. Det er én grunn til at den er så høy",
           ["22 %"]),
          [("Kupongen på 12 % er et godt anslag på forventet avkastning, fordi obligasjonseiere får hovedstolen tilbake før "
            "aksjonærene", ["12 %"]),
           ("Renten på gråmarkedslånet er skattefri, fordi den ikke rapporteres inn av en bank eller en plattform", []),
           ("Et tap på gråmarkedslånet gir fradrag med oppjustering 1,72, som tap på aksjer", ["1,72"])],
          "<p><b>Regelen.</b> Pensum sier at renteinntekt på private lån skattlegges med 22 %. Skattyteren må selv rapportere "
          "den. Tap på lån til private kan ikke trekkes fra mot alminnelig inntekt, mens gevinsten skattlegges. Den asymmetrien gir høy "
          "rente, sammen med lav prioritet og at du ikke vet hvor mange andre som har samme prioritet (forelesning 3 lysbilde "
          "45–46, manualen 4.6). <b>Utsagnet om 22 % skatt uten tapsfradrag er i tråd med pensum.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Kupongen som forventet avkastning</b> = lovet rente er ikke forventet "
          "avkastning. Norske høyrenteobligasjoner ga 0,51 % i året 2005–2011. I DOF Subsea-saken ble obligasjonene gjort "
          "om til aksjer.<br><b>Skattefri</b> = renten er skattepliktig. Plikten til å rapportere ligger hos Ulrik.<br>"
          "<b>Fradrag med 1,72</b> = oppjusteringsfaktoren gjelder bare utbytte og gevinst eller tap på aksjer, aldri renter "
          "eller tap på lån. Pensum sier dessuten at tap på private lån ikke gir fradrag.</p>")
pb = ledd("b", "<p>Anta at alle gevinster på slike plasseringer skattlegges, mens tap aldri kan trekkes fra. Ulrik er "
               "risikoavers. Hvilket utsagn om virkningen på risikotakingen hans er i tråd med pensum?</p>",
          ("Staten deler oppsiden, men ikke nedsiden. Virkningen er generelt tvetydig, men ved høy nok sats tar han mindre "
           "risiko", []),
          [("Han øker den risikable posisjonen med faktoren 1/(1 − t), slik at fordelingen etter skatt blir nøyaktig som før "
            "skatten", ["1"]),
           ("Risikotakingen påvirkes ikke, fordi skatten treffer gevinstene på det risikable alternativet og renten på det "
            "sikre alternativet med samme sats", []),
           ("Han tar alltid mer risiko, fordi staten tar en del av gevinstene og dermed gjør utfallene hans mindre spredt", [])],
          "<p><b>Regelen.</b> Uten tapsfradrag er staten partner i oppturen, men ikke i nedturen. Det er oppsiden som "
          "straffes. Mossin og Stiglitz viser at virkningen generelt er tvetydig, men at etterspørselen etter det risikable "
          "aktivumet må falle når satsen blir høy nok (manualen 12.3, forelesning 3 «Tapsfradrag vs. ikke tapsfradrag»). "
          "<b>Utsagnet om at virkningen er tvetydig, er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>1/(1 − t)</b> = Domar–Musgrave. Repliseringen krever fullt "
          "tapsfradrag (12.2).<br><b>Påvirkes ikke</b> = skatten treffer gevinst og tap ulikt, så fordelingen etter skatt "
          "endres.<br><b>Alltid mer risiko</b> = motsatt av det pensum sier om høye satser.</p>")
EX.append(oppgave(6, "Ulrik vil låne ut penger", "Skatt og risiko", [4, 12], body6, [pa, pb]))

# ======================================================================= 7
print("\nOppgave 7: global minimumsskatt")
O7, S7 = [200, 300], [12, 60]
etr7 = [s / o for s, o in zip(S7, O7)]
top7 = sum(max(0.0, 0.15 - e) * o for e, o in zip(etr7, O7))
g7_snitt = max(0.0, 0.15 - sum(S7) / sum(O7)) * sum(O7)
g7_uten_betalt = 0.15 * O7[0]
g7_hele = (0.15 - etr7[0]) * sum(O7)
assert lik(top7, 18) and lik(g7_snitt, 3)
print(f"   satser {etr7}, toppskatt {top7}; gale {g7_snitt}, {g7_uten_betalt}, {g7_hele}")
p = ledd("",
         "<p>Nordvik ASA er et norsk konsern som er omfattet av reglene om global minimumsskatt. Det har ett datterselskap i "
         f"land A og ett i land B. Datterselskapet i land A har et overskudd på kr {O7[0]} mill. og betaler kr {S7[0]} mill. "
         f"i skatt. Datterselskapet i land B har et overskudd på kr {O7[1]} mill. og betaler kr {S7[1]} mill. i skatt. Bruk "
         "skattereglene for 2026. Hvor mye toppskatt utløser de to datterselskapene til sammen?</p>",
         (f"Kr {kr(top7)} mill.", [kr(top7)]),
         [(f"Kr {kr(g7_snitt)} mill.", [kr(g7_snitt)]),
          (f"Kr {kr(g7_uten_betalt)} mill.", [kr(g7_uten_betalt)]),
          (f"Kr {kr(g7_hele)} mill.", [kr(g7_hele)])],
         sol("Toppskatt = maks(0; 15 % − effektiv skattesats i jurisdiksjonen) × overskudd. Den regnes land for land, med 15 % "
             "som gulv (manualen 13.5, k20). Et land over 15 % gir ingen kreditt til et land under.",
             [f"Land A: {S7[0]} / {O7[0]} = {pst(etr7[0], 0)}. Toppskatt (15 % − 6 %) × {O7[0]} = {kr(top7)} mill.",
              f"Land B: {S7[1]} / {O7[1]} = {pst(etr7[1], 0)}, over gulvet. Ingen toppskatt.",
              f"Til sammen: <b>kr {kr(top7)} mill.</b>"],
             [(f"Kr {kr(g7_snitt)} mill.", f"snittet for begge land: {sum(S7)} / {sum(O7)} = {pst(sum(S7) / sum(O7), 1)}, så "
               f"0,6 % × {sum(O7)}. Regelen blander ikke land."),
              (f"Kr {kr(g7_uten_betalt)} mill.", f"15 % × {O7[0]}. Skatten land A allerede tar, er glemt."),
              (f"Kr {kr(g7_hele)} mill.", f"9 % × {sum(O7)}. Toppskatten er regnet av hele overskuddet, også det i land B.")],
             f"Etter toppskatten betaler land A-selskapet {S7[0]} + {kr(top7)} = {S7[0] + top7:.0f} mill., som er 15 % av "
             f"{O7[0]}. ✓"))
EX.append(oppgave(7, "Nordvik ASA og datterselskapene i land A og B", "Internasjonal skatt", [13], "", [p]))

# ======================================================================= 8
print("\nOppgave 8: Iver leier ut hovedetasjen")
m8_egen, m8_ut, a8_egen, a8_ut = 10_000, 14_000, 100, 90
verdi8 = m8_egen / (m8_egen + m8_ut)
areal8 = a8_egen / (a8_egen + a8_ut)
leie8 = m8_ut * 12
assert verdi8 < 0.5 < areal8 and leie8 > 20_000
print(f"   egen del etter verdi {verdi8:.4f}, etter areal {areal8:.4f}, leie {leie8}")
p = ledd("",
         f"<p>Iver eier en enebolig med to leiligheter. Han bor selv i underetasjen på {a8_egen} m². Hovedetasjen på "
         f"{a8_ut} m² har bedre lys, egen inngang og hage. Den leier han ut på langtidskontrakt for kr {kr(m8_ut)} i måneden, "
         f"som er markedsleien. Markedsleien for underetasjen ville vært kr {kr(m8_egen)} i måneden. Hvilket utsagn om "
         "leieinntekten er riktig?</p>",
         ("Hele leien er skattepliktig fra første krone, fordi hans egen del er under halvparten målt etter utleieverdi",
          []),
         [("Leien er skattefri, fordi Iver selv bruker mer enn halvparten av boligen målt i kvadratmeter", []),
          ("Bare den delen av leien som overstiger kr 20 000 i året, er skattepliktig", ["20 000"]),
          ("Leien skattlegges som korttidsutleie: de første kr 10 000 er skattefrie, mens 85 % av resten er skattepliktig",
           ["10 000", "85 %"])],
         "<p><b>Regelen.</b> Langtidsutleie av egen bolig er skattefri når eieren selv bruker minst halvparten av boligen, målt "
         "etter utleieverdi og ikke etter areal. Bruker han mindre, er leien skattefri bare om den samlet er inntil kr 20 000 i "
         "året. Over grensen er hele beløpet skattepliktig fra første krone (manualen 4.4, forelesning 3 lysbilde 15).</p>"
         f"<p>Egen del etter utleieverdi: {kr(m8_egen)} / ({kr(m8_egen)} + {kr(m8_ut)}) = {pst(verdi8, 1)}, under halvparten. "
         f"Leien er {kr(m8_ut)} × 12 = kr {kr(leie8)} i året, over grensen. <b>Hele leien er skattepliktig</b>. Iver får "
         "fradrag for kostnadene ved utleien.</p>"
         "<p><b>Hvorfor de andre er gale.</b></p>"
         f"<p><b>Skattefri etter kvadratmeter</b> = feil mål. Etter areal bruker han {pst(areal8, 1)}, men loven måler "
         "utleieverdi.<br><b>Bare over kr 20 000</b> = grensen er en terskel, ikke et bunnfradrag.<br><b>Korttidsutleie</b> = "
         "gjelder utleieforhold under 30 dager. Dette er en langtidskontrakt.</p>")
EX.append(oppgave(8, "Iver og eneboligen med to leiligheter", "Investeringscaser", [4], "", [p]))

# ======================================================================= 9
print("\nOppgave 9: Marens lønnsøkning")
Y0, Y1, gr4 = 940_000, 1_020_000, 980_100
m3 = 0.22 + 0.137 + 0.076
m4 = 0.22 + 0.168 + 0.076
del3, del4 = gr4 - Y0, Y1 - gr4
beh9 = del3 * (1 - m3) + del4 * (1 - m4)
g9_alt3 = (Y1 - Y0) * (1 - m3)
g9_alt4 = (Y1 - Y0) * (1 - m4)
g9_utentrygd = del3 * (1 - m3 + 0.076) + del4 * (1 - m4 + 0.076)
assert lik(beh9, 44_123.1)
print(f"   marginal {m3:.3f}/{m4:.3f}, deler {del3}/{del4}, beholder {beh9:.2f}; gale {g9_alt3}, {g9_alt4}, {g9_utentrygd:.2f}")
p = ledd("",
         f"<p>Maren får lønnsøkning fra kr {kr(Y0)} til kr {kr(Y1)} i året. Trinnskatten er 13,7 % på inntekt mellom kr 725 050 "
         f"og kr {kr(gr4)} og 16,8 % på inntekt mellom kr {kr(gr4)} og kr 1 467 200. Trygdeavgiften er 7,6 % og skatten på "
         "alminnelig inntekt 22 %. Hvor mye av lønnsøkningen beholder hun etter skatt? Svar i hele kroner.</p>",
         (f"Kr {kr(beh9)}", [kr(beh9)]),
         [(f"Kr {kr(g9_alt3)}", [kr(g9_alt3)]),
          (f"Kr {kr(g9_alt4)}", [kr(g9_alt4)]),
          (f"Kr {kr(g9_utentrygd)}", [kr(g9_utentrygd)])],
         sol("Marginalskatten på lønn er 22 % + trinnskatt + trygdeavgift. Minstefradraget og personfradraget står stille ved "
             "denne lønnen, så hver ekstra krone treffes av hele satsen (manualen 1.1 og 1.2). Økningen krysser innslagspunktet "
             "for trinn 4, så den må deles i to.",
             [f"Opp til {kr(gr4)}: {kr(del3)} kr med 22 + 13,7 + 7,6 = 43,3 %. Hun beholder {kr(del3)} × 0,567 = "
              f"{kr(del3 * (1 - m3), 2)}.",
              f"Over {kr(gr4)}: {kr(del4)} kr med 22 + 16,8 + 7,6 = 46,4 %. Hun beholder {kr(del4)} × 0,536 = "
              f"{kr(del4 * (1 - m4), 2)}.",
              f"Til sammen {kr(beh9, 2)}, altså <b>kr {kr(beh9)}</b>."],
             [(f"Kr {kr(g9_alt3)}", f"hele økningen er regnet i trinn 3: {kr(Y1 - Y0)} × 0,567."),
              (f"Kr {kr(g9_alt4)}", f"hele økningen er regnet i trinn 4: {kr(Y1 - Y0)} × 0,536."),
              (f"Kr {kr(g9_utentrygd)}", "trygdeavgiften er glemt: 35,7 % og 38,8 % i stedet for 43,3 % og 46,4 %.")],
             f"Skatten på økningen er {kr(Y1 - Y0)} − {kr(beh9)} = {kr(Y1 - Y0 - beh9)}, altså "
             f"{pst((Y1 - Y0 - beh9) / (Y1 - Y0), 1)} i snitt. Det ligger mellom de to marginalsatsene, slik det skal. ✓"))
EX.append(oppgave(9, "Marens lønnsøkning", "Progressivitet", [1], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: lønn eller utbytte i Vestria")
tw10, tc10, aga10 = 0.48, 0.22, 0.12
y10 = (tw10 + aga10 / 2 - tc10 - aga10 / 2) / tc10
y10_full = (tw10 + aga10 - tc10) / tc10
y10_glemt = (tw10 + aga10 / 2 - tc10) / tc10
y10_bedr = (tw10 - tc10 - aga10) / tc10
assert lik(tc10 * y10, 0.26) and lik(tc10 * y10_full, 0.38)


def yalt(y):
    return (f"y = {kr(y, 2)} og effektiv eierskatt {pst(tc10 * y, 0)}", [kr(y, 2), pst(tc10 * y, 0)])


print(f"   y {y10:.4f}; full {y10_full:.4f}, glemt {y10_glemt:.4f}, bedriften {y10_bedr:.4f}")
p = ledd("",
         "<p>I landet Vestria er høyeste marginalskatt på lønn 48 %. Selskapsskatten og skatten på alminnelig inntekt er 22 %. "
         "Arbeidsgiveravgiften utgjør 12 % av lønnskostnaden. Eierskatten er 22 % av utbyttet ganget med en "
         "oppjusteringsfaktor y. Myndighetene vil at det ikke skal lønne seg for eiere å ta ut lønn som utbytte. Når de "
         "fastsetter y, legger de til grunn at avgiften bæres likt av arbeidstakeren og bedriften. Hvilken faktor og hvilken "
         "effektiv eierskatt følger?</p>",
         yalt(y10),
         [yalt(y10_full), yalt(y10_glemt), yalt(y10_bedr)],
         sol("Marginalskatten på lønn pluss den delen av arbeidsgiveravgiften arbeidstakeren bærer, skal være lik "
             "selskapsskatten pluss den delen bedriften bærer pluss 22 % × y (forelesning 5 lysbilde 10, «Antakelser om "
             "overveltning»).",
             ["Myndighetene legger til grunn lik deling: 6 % på hver side.",
              "48 % + 6 % = 22 % + 6 % + 22 % × y.",
              f"22 % × y = 26 %, så y = {kr(y10, 2)} og <b>effektiv eierskatt 26 %</b>."],
             [(f"y = {kr(y10_full, 2)} og 38 %", "full overvelting: 48 % + 12 % = 22 % + 22 % × y. Det er forelesningens "
               "standardantakelse og passer for en eier-leder som bærer hele avgiften selv. Myndighetene legger her til grunn "
               "lik deling."),
              (f"y = {kr(y10_glemt, 2)} og 32 %", "bedriftens halvdel er glemt på kapitalsiden: 48 % + 6 % = 22 % + 22 % × y."),
              (f"y = {kr(y10_bedr, 2)} og 14 %", "bedriften bærer hele avgiften: 48 % = 22 % + 12 % + 22 % × y.")],
             "Når avgiften deles likt, faller den ut på begge sider: 48 % − 22 % = 26 %. Med 2026-satsene gir samme oppsett "
             "47,4 % − 22 % = 25,4 %, som forelesningen runder til y ≈ 1,15 og 25,3 %. ✓"))
EX.append(oppgave(10, "Lønn eller utbytte i Vestria", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: husholdningenes formue og Bendiks utbytte")
body11 = "<p>To uavhengige spørsmål.</p>"
pa = ledd("a", "<p>Hvilket utsagn om formuen til norske husholdninger er i tråd med pensum?</p>",
          ("Primærboligen er den største posten samlet, mens topp 1 prosent først og fremst eier aksjer, for det meste "
           "unoterte", ["1"]),
          [("Bankinnskudd er husholdningenes største formuespost samlet, mens topp 1 prosent har mesteparten av formuen i "
            "bolig", ["1"]),
           ("Aksjer og verdipapirer utgjør om lag halvparten av husholdningenes bruttoformue samlet. Bolig utgjør om lag en "
            "firedel", []),
           ("Topp 1 prosents andel av samlet formue har falt de siste tiårene, fordi boligformuen er blitt jevnere fordelt",
            ["1"])],
          "<p><b>Regelen.</b> Norske husholdninger har formuen sin i bolig: primærbolig 52 %, sekundærbolig og annen eiendom "
          "14 %, bankinnskudd 13 % og aksjer og verdipapirer 11 % av bruttoformuen i 2025. Topp 1 prosent eier først og fremst "
          "aksjer, to tredeler av dem unoterte. De eier relativt lite eiendom (manualen 3.5, forelesning 2). <b>Utsagnet om "
          "primærboligen og de unoterte aksjene er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bankinnskudd størst</b> = bankinnskudd er 13 %. Toppen eier lite "
          "bolig.<br><b>Halvparten i aksjer</b> = aksjer og verdipapirer er 11 %. Bolig er over halvparten.<br><b>Andelen har "
          "falt</b> = toppens andel steg fra 14,8 % i 1995 til 21 % i 2016, drevet av aksjekonsentrasjon.</p>")
pb = ledd("b", "<p>Bendik eier alle aksjene i Bendik Invest AS. Han vurderer å ta ut kr 1 000 000 i utbytte nå og samtidig "
               "skyte inn kr 1 000 000 som ny egenkapital, slik at selskapet er like stort. Eierskatten betaler han med et "
               "privat lån til 5,5 % rente. Skjermingsrenten er 3,6 %. Alternativet er å ta utbyttet neste år. Hvilket utsagn "
               "er riktig?</p>",
          ("Han bør vente. Gevinsten av høyere inngangsverdi vokser med skjermingsrenten, mens lånet til eierskatten vokser "
           "med lånerenten etter skatt, som er høyere", []),
          [("Han bør ta utbyttet nå. Den nye egenkapitalen øker skjermingsgrunnlaget. Den gevinsten er alltid større enn "
            "renten på lånet", []),
           ("Det er likegyldig. Skjermingen gjør aksjonærmodellen nøytral, så tidspunktet for utbyttet endrer ikke skatten "
            "i nåverdi", []),
           ("Han bør ta utbyttet nå, fordi eierskatten blir lavere når utbyttet tas ut i samme år som overskuddet er "
            "opptjent", [])],
          "<p><b>Regelen.</b> I BS-modellen (forelesning 5 appendiks, lysbilde 51–53) tar eieren utbytte nå og skyter inn like "
          "mye ny egenkapital, så risikoen i selskapet er den samme. Eierskatten finansieres med et lån som vokser med "
          "R(1 − t). Innskuddet øker inngangsverdien. Skattebesparelsen av det vokser med skjermingsrenten. Utbytte nå "
          "lønner seg bare om skjermingsrenten er minst like høy som lånerenten. Er lånerenten høyere, kommer eieren best ut "
          "ved å spare i selskapet (manualen 6.4).</p>"
          f"<p>Her er skjermingsrenten 3,6 %, mens lånerenten etter skatt er 5,5 % × 0,78 = {kr(5.5 * 0.78, 2)} %. "
          "<b>Han bør vente.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Alltid større</b> = det avhenger av skjermingsrenten mot lånerenten. "
          "Her taper han.<br><b>Likegyldig</b> = modellen er bare nøytral om eieren kan låne til skjermingsrenten. "
          "Lånerenten er høyere (6.4).<br><b>Lavere skatt samme år</b> = ingen slik regel finnes.</p>")
EX.append(oppgave(11, "Husholdningenes formue og Bendiks utbytte", "Aksjonærmodellen", [3, 6], body11, [pa, pb]))

# ======================================================================= 12
print("\nOppgave 12: Frida og aksjemarkedet")
body12 = "<p>Frida vurderer å plukke enkeltaksjer selv i stedet for å kjøpe et indeksfond.</p>"
pa = ledd("a", "<p>Anta at aksjemarkedet er effisient i halvsterk form, men ikke i sterk form. Hvilken strategi kan da gi "
               "Frida meravkastning over tid?</p>",
          ("Å handle på informasjon som ennå bare er kjent for innsidere i selskapet", []),
          [("Å kjøpe aksjer som har steget mye de siste ukene, fordi kursmønstre har en tendens til å gjenta seg", []),
           ("Å lese årsrapporter og analyser og kjøpe aksjer som ser billige ut i forhold til inntjeningen", []),
           ("Å kjøpe aksjer rett etter at selskapene har lagt fram gode kvartalstall, før kursen rekker å stige mer", [])],
          "<p><b>Regelen.</b> Svak form: prisene reflekterer all markedsdata, som tidligere priser, så teknisk analyse har "
          "ingen verdi. Halvsterk form: prisene reflekterer all offentlig informasjon, så fundamental analyse har ingen verdi. "
          "Sterk form: prisene reflekterer all informasjon som er kjent av noen, også innsideinformasjon "
          "(ForelesningAksjesparing, lysbilde 79). Halvsterk form omfatter svak form. Holder ikke sterk form, er det bare "
          "informasjon som ikke er offentlig, som kan gi meravkastning. <b>Innsideinformasjon er svaret.</b> Handel på "
          "innsideinformasjon er ulovlig. Spørsmålet gjelder hva de tre formene sier.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Kursmønstre</b> = teknisk analyse, utelukket allerede av svak form.<br>"
          "<b>Årsrapporter</b> = fundamental analyse på offentlig informasjon, utelukket av halvsterk form.<br>"
          "<b>Etter kvartalstallene</b> = tallene er offentlige i det de legges fram, så kursen har allerede tatt dem inn.</p>")
pb = ledd("b", "<p>Frida leser at verdiaksjer har gitt høyere avkastning enn andre aksjer over tid. Hvilket utsagn er i "
               "tråd med pensum?</p>",
          ("Verdiaksjer er billige i forhold til inntjening eller bokført verdi. Én tolkning er at de har risiko som "
           "CAPM-betaen ikke fanger opp", []),
          [("Verdiaksjer har høy P/E og lav book-to-market. Fama og French fant at slike aksjer har gitt høyere avkastning",
            []),
           ("Fama og French fant at store selskaper har gitt høyere avkastning enn små. Derfor la de faktoren SMB til CAPM",
            []),
           ("Meravkastningen på verdiaksjer viser at CAPM-betaen fanger opp all risiko som investorene får betalt for, også "
            "risikoen i små selskaper", [])],
          "<p><b>Regelen.</b> Verdiaksjer er lavt priset i forhold til hva de tjener (lav P/E) eller i forhold til bokførte "
          "verdier (høy book-to-market). Fama og French (1992) fant at slike aksjer og små selskaper har gitt høyere "
          "avkastning. De la til faktorene SMB (small minus big) og HML (high minus low book-to-market) i CAPM. Én tolkning er "
          "feilprising. Den andre er at aksjene er mer risikable på en måte CAPM ikke fanger opp (ForelesningAksjesparing, "
          "lysbilde 92–97). <b>Utsagnet om risiko CAPM ikke fanger opp, er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Høy P/E og lav book-to-market</b> = definisjonen er snudd. Det "
          "beskriver vekstaksjer.<br><b>Store selskaper</b> = motsatt. SMB betyr at små selskaper har gitt mer.<br><b>Fanger "
          "opp all risiko</b> = motsatt. Funnet er nettopp at betaen ikke forklarer avkastningen alene.</p>")
EX.append(oppgave(12, "Frida og aksjemarkedet", "Indeksfond og aktiv forvaltning", [14], body12, [pa, pb]))

# ======================================================================= 13
print("\nOppgave 13: Sverres to aksjer")
s13, sA13, sB13, rho13 = 0.6, 0.20, 0.30, 0.25
mA13, mB13 = 0.08, 0.11                           # støy
var13 = s13 ** 2 * sA13 ** 2 + (1 - s13) ** 2 * sB13 ** 2 + 2 * s13 * (1 - s13) * rho13 * sA13 * sB13
sd13 = math.sqrt(var13)
g13_snitt = s13 * sA13 + (1 - s13) * sB13
g13_uten_kryss = math.sqrt(s13 ** 2 * sA13 ** 2 + (1 - s13) ** 2 * sB13 ** 2)
g13_uten_2 = math.sqrt(s13 ** 2 * sA13 ** 2 + (1 - s13) ** 2 * sB13 ** 2 + s13 * (1 - s13) * rho13 * sA13 * sB13)
assert lik(var13, 0.036)
print(f"   sd {sd13:.6f}; gale {g13_snitt}, {g13_uten_kryss:.6f}, {g13_uten_2:.6f}")
p = ledd("",
         "<p>Sverre har 60 % av porteføljen i aksje A og 40 % i aksje B. Aksje A har forventet avkastning 8 % og "
         "standardavvik 20 %. Aksje B har forventet avkastning 11 % og standardavvik 30 %. Korrelasjonen mellom dem er 0,25. "
         "Hva er standardavviket til porteføljen? Svar med to desimaler.</p>",
         (pst(sd13), [pst(sd13)]),
         [(pst(g13_snitt), [pst(g13_snitt)]),
          (pst(g13_uten_kryss), [pst(g13_uten_kryss)]),
          (pst(g13_uten_2), [pst(g13_uten_2)])],
         sol("σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>A</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>B</sub><sup>2</sup> "
             "+ 2s(1 − s)ρσ<sub>A</sub>σ<sub>B</sub>. Forventningen er et vektet snitt, risikoen er det ikke (manualen 14.1).",
             ["Kvadratleddene: 0,36 × 0,04 = 0,0144 og 0,16 × 0,09 = 0,0144.",
              "Krysleddet: 2 × 0,6 × 0,4 × 0,25 × 0,20 × 0,30 = 0,0072.",
              f"Variansen er {kr(var13, 4)}. Standardavviket er √{kr(var13, 4)} = <b>{pst(sd13)}</b>."],
             [(pst(g13_snitt), "vektet snitt av standardavvikene. Det gjelder bare når korrelasjonen er 1."),
              (pst(g13_uten_kryss), "krysleddet er glemt, som om korrelasjonen var 0."),
              (pst(g13_uten_2), "faktoren 2 i krysleddet er glemt.")],
             f"Svaret ligger mellom {pst(g13_uten_kryss)} (korrelasjon 0) og {pst(g13_snitt)} (korrelasjon 1), slik det må med "
             f"korrelasjon 0,25. Forventet avkastning ({pst(s13 * mA13 + (1 - s13) * mB13, 1)}) er støy her. ✓"))
EX.append(oppgave(13, "Sverres to aksjer", "Porteføljevalg", [14], "", [p]))

# ======================================================================= 14
print("\nOppgave 14: Aurora og aksjeandelen")
mu14, sig14, gam14, t14 = 0.05, 0.20, 2.5, 0.25    # bankinnskuddet gir ingen rente: r_f = 0
w14 = mu14 / (gam14 * sig14 ** 2)
g14a_sigma = mu14 / (gam14 * sig14)               # σ i stedet for σ²
g14a_gam = mu14 / sig14 ** 2                      # γ glemt
g14a_var = mu14 / gam14                           # variansen glemt
wt14 = (1 - t14) * mu14 / (gam14 * ((1 - t14) * sig14) ** 2)
g14b_gange = w14 * (1 - t14)                      # w(1 − t)
g14b_var = mu14 / (gam14 * ((1 - t14) * sig14) ** 2)   # w/(1 − t)²
assert lik(w14, 0.5) and lik(wt14, w14 / (1 - t14)) and lik(g14b_var, w14 / (1 - t14) ** 2)
print(f"   a {w14}: {g14a_sigma}, {g14a_gam}, {g14a_var}; b {wt14:.4f}: {w14}, {g14b_gange}, {g14b_var:.4f}")
body14 = ("<p>Aurora har bare finansiell formue. Hun kan plassere den i et globalt indeksfond med forventet avkastning 5 % og "
          "standardavvik 20 %, eller i bankinnskudd som ikke gir rente. Auroras relative risikoaversjon er γ = 2,5.</p>")
pa = ledd("a", "<p>Hvor stor andel av formuen bør hun ha i indeksfondet? Rund av til én desimal.</p>",
          (pst(w14, 1), [pst(w14, 1)]),
          [(pst(g14a_sigma, 1), [pst(g14a_sigma, 1)]),
           (pst(g14a_gam, 1), [pst(g14a_gam, 1)]),
           (pst(g14a_var, 1), [pst(g14a_var, 1)])],
          sol("w* = (μ − r<sub>f</sub>) / (γσ<sup>2</sup>), der σ<sup>2</sup> er variansen (manualen 14.4). Bankinnskuddet er "
              "det risikofrie alternativet, så r<sub>f</sub> = 0.",
              ["Meravkastningen: 5 % − 0 % = 5 %.",
               "Nevneren: 2,5 × 0,20<sup>2</sup> = 2,5 × 0,04 = 0,10.",
               f"w* = 0,05 / 0,10 = <b>{pst(w14, 1)}</b>."],
              [(pst(g14a_sigma, 1), "standardavviket er ikke kvadrert: 0,05 / (2,5 × 0,20)."),
               (pst(g14a_gam, 1), "risikoaversjonen er glemt: 0,05 / 0,04."),
               (pst(g14a_var, 1), "variansen er glemt: 0,05 / 2,5.")],
              "Sett 50 % inn baklengs: γ = 0,05 / (0,5 × 0,04) = 2,5. ✓"))
pb = ledd("b", "<p>Myndighetene innfører en skatt på 25 % på all avkastning, med fullt fradrag for tap. Hvor stor andel bør "
               "Aurora nå ha i fondet? Rund av til én desimal.</p>",
          (pst(wt14, 1), [pst(wt14, 1)]),
          [(pst(w14, 1), [pst(w14, 1)]),
           (pst(g14b_gange, 1), [pst(g14b_gange, 1)]),
           (pst(g14b_var, 1), [pst(g14b_var, 1)])],
          sol("Betingelsene for Domar–Musgrave er oppfylt: skatten er proporsjonal, tapsfradraget er fullt og det sikre "
              "alternativet gir ingen avkastning (manualen 12.3 og k20). Skatten krymper da både avkastningen og "
              "standardavviket med (1 − t). Investoren skalerer opp: x<sub>1</sub>* = z*/(1 − t) (12.2). Mertons formel "
              "gir det samme: (1 − t)μ / (γ(1 − t)<sup>2</sup>σ<sup>2</sup>) = w*/(1 − t).",
              ["Forventet avkastning etter skatt: 0,75 × 5 % = 3,75 %.",
               "Varians etter skatt: (0,75 × 0,20)<sup>2</sup> = 0,0225. Ganget med γ blir det 0,05625.",
               f"w* = 0,0375 / 0,05625 = <b>{pst(wt14, 1)}</b>, som er 50 % / 0,75."],
              [(pst(w14, 1), "uendret. Repliseringen er glemt: skatten gjør det risikable mindre risikabelt også."),
               (pst(g14b_gange, 1), "50 % × 0,75. Andelen er ganget med (1 − t) i stedet for delt."),
               (pst(g14b_var, 1), "bare variansen er krympet, ikke avkastningen: 0,05 / 0,05625.")],
              f"Risikoen etter skatt: {pst(wt14, 1)} × 0,75 × 20 % = 10 %, nøyaktig som 50 % × 20 % før skatten. ✓ "
              "Hadde banken gitt rente som også ble skattlagt, ville en inntektseffekt gjort virkningen tvetydig "
              "(manualen 12.3, «Skatt, aksjer og risikotaking» lysbilde 14). Derfor gir banken ingen rente her.",
              "Med fullt tapsfradrag skal andelen opp, så de to alternativene på 50 % eller lavere kan strykes "
              "med en gang."))
EX.append(oppgave(14, "Aurora og aksjeandelen", "Porteføljevalg", [14, 12], body14, [pa, pb]))

# ======================================================================= 15
print("\nOppgave 15: Åses alderspensjon")
p = ledd("",
         "<p>Åse er 70 år og har tatt ut full alderspensjon fra folketrygden siden hun fylte 67. Hun har hatt god inntekt "
         "hele yrkeslivet og har ingen tjenestepensjon. Hvordan reguleres alderspensjonen hennes fra folketrygden hvert år?</p>",
         ("Med snittet av lønns- og prisveksten, så den vanligvis vokser litt saktere enn lønningene", []),
         [("Med lønnsveksten, akkurat som pensjonsbeholdningen hennes ble regulert fram til uttaket", []),
          ("Med prisveksten alene, slik at kjøpekraften hennes holdes nøyaktig uendret fra år til år så lenge hun lever", []),
          ("Den reguleres ikke. Beløpet ligger fast i kroner fra uttaket og resten av livet", [])],
         "<p><b>Regelen.</b> Pensjonsbeholdningen reguleres med lønnsveksten fram til uttak. Løpende pensjon reguleres med "
         "gjennomsnittet av lønns- og prisveksten: for 2026 ble alderspensjonen hevet 4,69 % mot 4,91 % for G (manualen "
         "kapittel 15). Forelesningen sier at pensjonen etter uttak vokser litt saktere enn lønnsnivået (ForelesningPensjon, "
         "lysbilde 15). <b>Snittet av lønns- og prisveksten er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Lønnsveksten</b> = det gjelder beholdningen før uttak, ikke pensjonen "
         "som utbetales.<br><b>Prisveksten alene</b> = reguleringen ligger mellom pris- og lønnsveksten.<br><b>Fast i "
         "kroner</b> = folketrygdens pensjon reguleres hvert år.</p>"
         "<p><b>Merk.</b> Den eldre regelen, lønnsveksten minus 0,75 prosentpoeng, gjaldt fra 2011 til 2021.</p>")
EX.append(oppgave(15, "Åses alderspensjon", "Pensjon", [15], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Agnes og traktoren")
W16, Ld16, Lt16 = 1_000_000, 190_000, 640_000
p16 = [0.80, 0.15, 0.05]
akt16 = p16[1] * Ld16 + p16[2] * Lt16
EU16 = p16[0] * math.sqrt(W16) + p16[1] * math.sqrt(W16 - Ld16) + p16[2] * math.sqrt(W16 - Lt16)
CE16 = EU16 ** 2
maks16 = W16 - CE16
g16a_uten_del = p16[2] * Lt16
g16a_total = (p16[1] + p16[2]) * Lt16
EU16u = (p16[0] + p16[1]) * math.sqrt(W16) + p16[2] * math.sqrt(W16 - Lt16)
g16b_uten_del = W16 - EU16u ** 2
g16b_rp = maks16 - akt16
assert lik(EU16, 965) and lik(maks16, 68_775) and lik(akt16, 60_500)
assert lik(g16b_rp, (W16 - akt16) - CE16)
print(f"   akt {akt16}, EU {EU16}, CE {CE16}, maks {maks16}; gale a {g16a_uten_del}, {g16a_total}; "
      f"b {g16b_rp}, {g16b_uten_del}")
body16 = (f"<p>Agnes har en formue på kr {kr(W16)}, der kr {kr(Lt16)} er traktoren hennes. Neste år får traktoren ingen "
          f"skade med sannsynlighet 80 %, en delskade som koster kr {kr(Ld16)} med sannsynlighet 15 % og totalskade med "
          "sannsynlighet 5 %. Nyttefunksjonen hennes er U(W) = √W, der W er formuen. Forsikringen gir full dekning.</p>")
pa = ledd("a", "<p>Hva er den aktuarisk rettferdige premien?</p>",
          (f"Kr {kr(akt16)}", [kr(akt16)]),
          [(f"Kr {kr(g16a_uten_del)}", [kr(g16a_uten_del)]),
           (f"Kr {kr(g16a_total)}", [kr(g16a_total)]),
           (f"Kr {kr(maks16)}", [kr(maks16)])],
          sol("Den aktuarisk rettferdige premien er forventet erstatning: summen av sannsynlighet ganger tap over alle utfall "
              "(manualen 17.3).",
              [f"Delskade: 15 % × {kr(Ld16)} = {kr(p16[1] * Ld16)}.",
               f"Totalskade: 5 % × {kr(Lt16)} = {kr(p16[2] * Lt16)}.",
               f"Sum: <b>kr {kr(akt16)}</b>."],
              [(f"Kr {kr(g16a_uten_del)}", "delskaden er glemt."),
               (f"Kr {kr(g16a_total)}", f"all skade er regnet som totalskade: 20 % × {kr(Lt16)}."),
               (f"Kr {kr(maks16)}", "den høyeste premien hun vil betale, altså svaret på b.")],
              f"Forventet formue uten forsikring er {kr(W16)} − {kr(akt16)} = {kr(W16 - akt16)}. ✓"))
pb = ledd("b", "<p>Hva er den høyeste premien Agnes er villig til å betale? Rund av til nærmeste krone.</p>",
          (f"Kr {kr(maks16)}", [kr(maks16)]),
          [(f"Kr {kr(g16b_rp)}", [kr(g16b_rp)]),
           (f"Kr {kr(g16b_uten_del)}", [kr(g16b_uten_del)]),
           (f"Kr {kr(akt16)}", [kr(akt16)])],
          sol("Sett nytten med forsikring lik forventet nytte uten: √(W − P) = E[√W]. Da er P<sub>maks</sub> = W − (E[√W])<sup>2</sup> "
              "(manualen 17.3).",
              [f"Forventet nytte: 0,80 × √{kr(W16)} + 0,15 × √{kr(W16 - Ld16)} + 0,05 × √{kr(W16 - Lt16)} = 800 + 135 + 30 = "
               f"{kr(EU16)}.",
               f"Sikkerhetsekvivalenten: {kr(EU16)}<sup>2</sup> = {kr(CE16)}.",
               f"P<sub>maks</sub> = {kr(W16)} − {kr(CE16)} = <b>kr {kr(maks16)}</b>."],
              [(f"Kr {kr(g16b_rp)}", f"bare risikopremien, {kr(W16 - akt16)} − {kr(CE16)}. Den aktuariske premien er glemt."),
               (f"Kr {kr(g16b_uten_del)}", f"delskaden er glemt i forventet nytte: 0,95 × 1 000 + 0,05 × 600 = {kr(EU16u)}."),
               (f"Kr {kr(akt16)}", "den aktuariske premien fra a. Den gjelder for en risikonøytral person.")],
              f"Aktuarisk premie + risikopremie: {kr(akt16)} + {kr(g16b_rp)} = {kr(maks16)}. ✓"))
EX.append(oppgave(16, "Agnes og traktoren", "Forsikring og forventet nytte", [17], body16, [pa, pb]))

# ======================================================================= 17
print("\nOppgave 17: atferd, lån og sparing")
body17 = "<p>Tre uavhengige spørsmål.</p>"
pa = ledd("a", "<p>Mikkel finansierer forbruk med kredittkort til 22 % rente i stedet for å betale ned gjelden. Hvilken "
               "forklaring gir pensum på at mange gjør som Mikkel?</p>",
          ("Present bias: all framtidig nytte vektes med en ekstra faktor β under 1, så dagens forbruk teller mer. Det er "
           "ikke rasjonelt", ["1"]),
          [("Rasjonell konsumutjevning: folk låner mest i dårlige tider, slik modellene forutsier. Dataene viser nettopp det",
            []),
           ("Eksponentiell diskontering med samme faktor δ mellom alle perioder, slik at forbruk i dag og forbruk i morgen "
            "veies helt likt", []),
           ("Tapsaversjon: Mikkel vil ikke realisere tapet han får ved å bruke sparepengene sine til å betale ned gjelden", [])],
          "<p><b>Regelen.</b> Med standard preferanser diskonteres framtidige perioder med δ, δ<sup>2</sup> og så videre. Med "
          "present bias vektes alt i framtiden i tillegg med β < 1, så det kan virke optimalt å konsumere mye i dag finansiert "
          "med kredittkort. Laibson og medforfattere viser dette. Forelesningen understreker at det ikke er rasjonelle "
          "preferanser. Folk med present bias har oftere kredittgjeld (ForelesningLån, lysbilde 13–14). <b>Present bias er "
          "svaret.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Konsumutjevning</b> = rasjonelle modeller sier at folk låner i dårlige "
          "tider, men i virkeligheten er det ofte motsatt.<br><b>Eksponentiell diskontering</b> = det er standardpreferansene "
          "som present bias avviker fra.<br><b>Tapsaversjon</b> = brukes om aksjesalg og referansepunkter, ikke om "
          "forbrukslån i pensum.</p>")
pb = ledd("b", "<p>I januar 2021 kostet en Norwegian-aksje om lag 60 kroner, mens selskapet planla å selge nye aksjer for "
               "6–10 kroner. Prisen falt likevel ikke med en gang. Hvilken forklaring er i tråd med pensum?</p>",
          ("Rasjonelle investorer shortet lite, fordi aksjene var vanskelige å låne og volatiliteten høy. Mange eiere "
           "trodde også at kursen ville stige", []),
          [("Markedet var effisient i sterk form, så kursen på 60 kroner var riktig gitt all informasjon, også "
            "innsideinformasjon", ["60"]),
           ("Eierne kjente allerede ekspertenes vurdering av aksjen. Informasjon om at den var overpriset, endret derfor ikke "
            "hva eierne faktisk gjorde", []),
           ("Norwegian var en så stor og likvid aksje at en feilprising ville blitt rettet opp straks hvis den fantes", [])],
          "<p><b>Regelen.</b> Over halvparten av eierne trodde at aksjen ville stige det neste året. Feilprisingen kunne "
          "vare fordi rasjonelle investorer shortet lite: et meglerhus droppet det på grunn av høy volatilitet. To sa at "
          "aksjer var vanskelige å låne på grunn av spredt eierskap (Finansiell psykologi, lysbilde 37–48; manualen k18). "
          "<b>Utsagnet om lite shorting er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Sterk form</b> = aksjen stupte da de nye aksjene kom. Pensum "
          "bruker caset som eksempel på feilprising.<br><b>Kjente vurderingen</b> = etter en video der en ekspert forklarte at "
          "prisen var for høy, solgte 21 % dagen etter. Mange visste altså ikke.<br><b>Stor og likvid</b> = Norwegian er en "
          "liten aksje. Lærdommen er at større markeder oftere er effisiente.</p>")
pc = ledd("c", "<p>Johannes arbeidsgiver melder alle nyansatte automatisk inn i en frivillig pensjonsspareordning. De kan "
               "melde seg ut når de vil, uten kostnad. Hvilket utsagn er i tråd med pensum?</p>",
          ("Dette er dulting: valgfriheten og insentivene er de samme, men standardvalget gjør at langt flere sparer", []),
          [("Tiltaket virker bare om arbeidsgiveren samtidig øker innskuddet, fordi folk bare reagerer på økonomiske "
            "insentiver", []),
           ("Automatisk innmelding er tvang og regnes derfor ikke som dulting, siden de ansatte ikke har valgt selv", []),
           ("Standardvalget har liten effekt, fordi de som ikke ville ha spart, melder seg ut med en gang", [])],
          "<p><b>Regelen.</b> Dulting gjør det enklere å ta gode valg uten å endre insentivene. Standardvalg er viktige for "
          "pensjonssparing (Thaler og Sunstein): de som meldes inn automatisk, har 50 prosent større sjanse for å spare, selv "
          "om de enkelt kan la være (Finansiell psykologi, lysbilde 34). Hindringen er terskelen, ikke smaken (manualen k18). "
          "<b>Utsagnet om dulting er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bare med høyere innskudd</b> = dulting virker nettopp uten nye "
          "insentiver.<br><b>Tvang</b> = de kan melde seg ut fritt, så valget er deres.<br><b>Liten effekt</b> = empirien "
          "viser det motsatte.</p>")
EX.append(oppgave(17, "Mikkel, Norwegian-eierne og Johannes pensjonssparing", "Finansiell psykologi", [16, 18], body17,
                  [pa, pb, pc]))

# ======================================================================= settet
SETT = {
    "id": "prove9",
    "kind": "mock",
    "label": "Prøveeksamen 9",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner H2023 og kursgodkjenningen 2026, med vekt på finansforelesningene. Teksten gir bare situasjon, tall og "
             "satser. Noen ledd sier bare «Bruk skattereglene for 2026». Noen få har en opplysning som ikke skal brukes. "
             "Nytt stoff: skjerming som ender i tap, holdingselskap og utsatt skatt, kombinasjonsfond i gjeldsfordelingen, "
             "superprofitt, to-periodemodellen, evig leie før og etter skatt, selskapsskatt med mobil kapital, gråmarkedslån, "
             "global minimumsskatt i to land, BS-modellen, markedseffisiens, verdiaksjer, Merton med skatt, regulering av "
             "pensjon, forsikring med tre utfall, present bias, Norwegian-aksjen og dulting."),
    "facts": [
        "Fire timer, kalkulator tillatt. 30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett svar, −1 for feil svar og 0 for ubesvart. Totalt 90 poeng.",
        "Oppgave 1–11 er skattedelen (19 ledd). Oppgave 12–17 er finansdelen (11 ledd).",
        "Laget for trening etter mønster fra H2023, kursgodkjenningen 2026, manualen og årets lysbilder. Det er ikke en ekte "
        "eksamen. Kurset har ikke kontrollert løsningene.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene. Teksten sier ikke hvilken regel som gjelder. Noen ledd har en "
                     "opplysning du ikke trenger. Hvert galt alternativ er en bestemt feil: ubenyttet skjerming lagt til et "
                     "tap, konsernunntaket glemt, hele kombinasjonsfondet behandlet som aksjer, strøm og rente målt ulikt, "
                     "snitt på tvers av land eller w(1 − t) i stedet for w/(1 − t). Kan du stryke ett alternativ, lønner det "
                     "seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove9.json")
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
print(f"   ord per ledd: {ord_per_ledd:.1f} (mål 35–48)")
print(f"   ledd med tallsvar: {tallledd} = {andel_tall * 100:.0f} % (mål 35–55 %)")
print(f"   tekstledd {tekst}: riktig er lengst i {lengst} ({lengst / tekst * 100:.0f} %, tilfeldig ≈ 25 %)")
print(f"   tallledd: riktig er størst {pos['størst']}, minst {pos['minst']}, i midten {pos['midten']}")
if not 35 <= ord_per_ledd <= 48:
    feil.append(f"ord per ledd {ord_per_ledd:.1f} utenfor 35–48")
if not 0.35 <= andel_tall <= 0.55:
    feil.append(f"andel tallsvar {andel_tall:.2f} utenfor 35–55 %")
if lengst / tekst > 0.3:
    feil.append("riktig alternativ er for ofte det lengste")

if feil:
    print("\nFEIL:")
    for x in feil:
        print("  " + x)
    raise SystemExit(1)
print("\nIngen feil.")
