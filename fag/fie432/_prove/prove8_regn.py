"""Prøveeksamen 8 (FIE432): regner alle tall, bygger prove8.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove8_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p8) sier,
3. skriver prove8.json ved siden av seg selv,
4. sjekker fila: gyldig JSON, fasitplanen, at hvert alternativ inneholder
   tallene skriptet har regnet (og ingen andre), skrivereglene (ingen
   tankestrek, ingen komma foran «og», minustegn «−»), og kalibreringen
   mot skoleeksamen (ord per ledd, andel ledd med tallsvar, lekkasje).

Prøveeksamen 8 følger planen i docs/fie432-proveeksamen-spek.md: ligner H2024
og skatteteorien i forelesning 6 til 11, med minimalt stillas (bare situasjon,
tall og satser i teksten).
"""
import json
import math
import os
import re
from decimal import Decimal, ROUND_HALF_UP

HER = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p8"]
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


def kr_(x, d=0):
    """«Kr 1 234» som alternativ, med tallet som skal kontrolleres."""
    return (f"Kr {kr(x, d)}", [kr(x, d)])


def p_(x, d=2):
    return (pst(x, d), [pst(x, d)])


def tekst(s, tall=()):
    return (s, list(tall))


BRUK26 = "Bruk skattereglene for 2026."
EX = []

# ======================================================================= 1
print("\nOppgave 1: skjerming per aksjepost, gave og salg")
nA, kursA = 2_000, 200
nB, kursB = 1_000, 250
KA, KB = nA * kursA, nB * kursB
D_aksje = 8
r1, r2 = 0.03, 0.02
kurs_gave = 270            # støy
kurs_salg = 300
assert (KA, KB) == (400_000, 250_000)
D1 = nA * D_aksje                       # bare januarposten var eid i mai
skjA1, skjB1 = KA * r1, KB * r1
assert D1 >= skjA1                      # januarposten bruker hele skjermingen
skpl1 = D1 - skjA1
uB1 = skjB1                             # oktoberposten: ingen utbytte, alt ubenyttet
assert lik(skpl1, 4_000) and lik(uB1, 7_500)
g1a_samlet = max(0.0, D1 - (skjA1 + skjB1))                  # skjerming lagt sammen
g1a_alle = (nA + nB) * D_aksje - (skjA1 + skjB1)            # utbytte også på oktoberposten
g1a_mellom = skjA1                                          # mellomresultatet
assert lik(g1a_samlet, 0) and lik(g1a_alle, 4_500)
# b: Håkons samlede skjermingsgrunnlag i år 2 (kostpris + ubenyttet skjerming fra år 1, per post)
grunnlag2 = KA + (KB + uB1)
g1b_kost = KA + KB                                           # glemt den ubenyttede skjermingen
g1b_disk = (nA + nB) * kurs_gave                             # gaven som kjøp til kurs 270 (diskontinuitet)
g1b_prorata = KA + KB + skjB1 * 3 / 12                       # skjermingen avkortet for tre måneders eiertid
assert lik(grunnlag2, 657_500) and lik(g1b_kost, 650_000) and lik(g1b_disk, 810_000) and lik(g1b_prorata, 651_875)
# c: Håkon eier ved utgangen av år 2 og får skjermingen for år 2
skjA2 = KA * r2
skjB2 = (KB + uB1) * r2
u_salg = skjA2 + uB1 + skjB2
salg = (nA + nB) * kurs_salg
gev1 = salg - (KA + KB) - u_salg
skatt1 = gev1 * TE
assert lik(u_salg, 20_650) and lik(gev1, 229_350)
gevA = nA * kurs_salg - KA - skjA2
gevB = nB * kurs_salg - KB - (uB1 + skjB2)
assert lik(gevA + gevB, gev1) and gevA > 0 and gevB > 0
g1c_grunnlag = (salg - (KA + KB) - (skjA2 + uB1 + KB * r2)) * TE    # ubenyttet ikke lagt til grunnlaget
inng_disk = (nA + nB) * kurs_gave
g1c_disk = (salg - inng_disk - inng_disk * r2) * TE                 # diskontinuitet
g1c_22 = gev1 * 0.22                                               # glemt oppjustering
print(f"   a {skpl1}; gale {g1a_samlet}, {g1a_alle}, {g1a_mellom}")
assert lik(grunnlag2 * r2, skjA2 + skjB2)
print(f"   b grunnlag {grunnlag2}; gale {g1b_kost}, {g1b_disk}, {g1b_prorata}")
print(f"   c ubenyttet {u_salg}, gevinst {gev1}, skatt {skatt1}; gale {g1c_grunnlag}, {g1c_disk}, {g1c_22}")
felles1 = (f"<p>Gudrun kjøpte {kr(nA)} aksjer i Tindefjell ASA for kr {kursA} per aksje i januar år 1 og {kr(nB)} aksjer til "
           f"for kr {kursB} per aksje i oktober år 1. Selskapet betalte kr {D_aksje} per aksje i utbytte i mai år 1 og har ikke "
           f"betalt utbytte senere. Skjermingsrenten var 3 % i år 1 og 2 % i år 2. I mars år 2 ga Gudrun alle aksjene til "
           f"sønnen Håkon, som bor i Bergen. Kursen var da kr {kurs_gave}. Håkon solgte alle aksjene i september år 3 for "
           f"kr {kurs_salg} per aksje.</p>")
pa = ledd("a", "<p>Hva er Gudruns skattepliktige utbytte for år 1?</p>",
          kr_(skpl1),
          [kr_(g1a_samlet), kr_(g1a_alle), kr_(g1a_mellom)],
          sol("Skjermingen regnes per aksje. Ubenyttet skjerming på én aksje kan ikke brukes mot utbytte på en annen. "
              "Utbyttet tilfaller den som eier aksjen når utbyttet vedtas. Skjermingsfradraget tilfaller den som eier aksjen "
              "ved utgangen av året (manualen 5.3 og 5.4).",
              [f"Utbytte: bare de {kr(nA)} aksjene fra januar var eid i mai. {kr(nA)} × {D_aksje} = kr {kr(D1)}. "
               f"Aksjene fra oktober fikk ikke utbytte.",
               f"Skjerming på januarposten: {kr(KA)} × 3 % = kr {kr(skjA1)}. Skattepliktig: {kr(D1)} − {kr(skjA1)} = "
               f"<b>kr {kr(skpl1)}</b>.",
               f"Oktoberposten får skjerming for år 1 fordi Gudrun eier den ved årsskiftet: {kr(KB)} × 3 % = kr {kr(skjB1)}. "
               f"Den står ubrukt, men kan ikke trekkes fra utbyttet på januarposten."],
              [(f"Kr {kr(g1a_samlet)}", f"skjermingen lagt sammen for begge postene: {kr(D1)} − {kr(skjA1 + skjB1)} er negativt. "
                f"Skjermingen er aksjevis."),
               (f"Kr {kr(g1a_alle)}", f"utbytte også på oktoberposten: {kr((nA + nB) * D_aksje)} − {kr(skjA1 + skjB1)}. "
                f"De aksjene var ikke kjøpt da utbyttet ble betalt."),
               (f"Kr {kr(g1a_mellom)}", "skjermingsfradraget på januarposten. Riktig mellomresultat, feil spørsmål.")],
              f"Brukt skjerming pluss skattepliktig utbytte skal være lik utbyttet: {kr(skjA1)} + {kr(skpl1)} = {kr(D1)}. ✓"))
pb = ledd("b", "<p>Hva er Håkons samlede skjermingsgrunnlag for aksjene i år 2?</p>",
          kr_(grunnlag2),
          [kr_(g1b_kost), kr_(g1b_disk), kr_(g1b_prorata)],
          sol("Gave og arv gir kontinuitet (skatteloven § 9-7): mottakeren overtar giverens inngangsverdi og øvrige "
              "skatteposisjoner, også den ubenyttede skjermingen på hver aksje (manualen 6.6). Skjermingsgrunnlaget er "
              "kostpris pluss ubenyttet skjerming fra året før (manualen 5.3). Håkon eier aksjene 31. desember år 2 og får "
              "skjermingen for år 2. Kursen ved gaven er støy.",
              [f"Januarposten: kostpris {kr(KA)}. Skjermingen for år 1 på kr {kr(skjA1)} ble brukt mot utbyttet, så "
               f"grunnlaget er {kr(KA)}.",
               f"Oktoberposten: kostpris {kr(KB)} pluss ubenyttet skjerming {kr(KB)} × 3 % = {kr(skjB1)}, altså {kr(KB + uB1)}.",
               f"Samlet grunnlag: {kr(KA)} + {kr(KB + uB1)} = <b>kr {kr(grunnlag2)}</b>."],
              [(f"Kr {kr(g1b_kost)}", "bare kostprisen. Den ubenyttede skjermingen på oktoberposten legges til grunnlaget."),
               (f"Kr {kr(g1b_disk)}", f"gaven behandlet som et kjøp til kurs {kurs_gave}: {kr(nA + nB)} × {kurs_gave}. "
                f"Diskontinuitet gjelder bare bolig, fritidsbolig og gårdsbruk giveren kunne solgt skattefritt, ikke aksjer."),
               (f"Kr {kr(g1b_prorata)}", f"skjermingen på oktoberposten avkortet til tre av tolv måneder: {kr(skjB1)} × 3/12 = "
                f"{kr(skjB1 * 3 / 12)}. Den som eier aksjen ved årsskiftet, får hele årets skjerming.")],
              f"Skjermingen for år 2 blir {kr(grunnlag2)} × 2 % = {kr(grunnlag2 * r2)}. Det er {kr(skjA2)} + {kr(skjB2)} fra "
              f"regnestykket i c. ✓",
              f"Kontinuitetsprinsippet stryker kr {kr(g1b_disk)}. Mellom de tre som står igjen, avgjør hvor mye ubenyttet "
              f"skjerming som legges til grunnlaget."))
pc = ledd("c", f"<p>Hvor mye skatt betaler Håkon på gevinsten? {BRUK26} Svar med to desimaler.</p>",
          kr_(skatt1, 2),
          [kr_(g1c_grunnlag, 2), kr_(g1c_disk, 2), kr_(g1c_22, 2)],
          sol(f"Håkon overtar inngangsverdien kr {kr(KA + KB)} og den ubenyttede skjermingen (kontinuitet, § 9-7). Han eier "
              f"aksjene ved utgangen av år 2 og får skjermingen for år 2 av grunnlaget kostpris pluss ubenyttet skjerming. "
              f"Selger han før årsskiftet i år 3, får han ingen skjerming for år 3. Gevinsten skattlegges med 22 % × 1,72 = "
              f"37,84 % (satsene for 2026, manualen 20.2). Kursen ved gaven er støy.",
              [f"Skjerming år 2: januarposten {kr(KA)} × 2 % = {kr(skjA2)}. Oktoberposten ({kr(KB)} + {kr(uB1)}) × 2 % = "
               f"{kr(skjB2)}. Ubenyttet ved salget: {kr(skjA2)} + {kr(uB1)} + {kr(skjB2)} = kr {kr(u_salg)}.",
               f"Gevinst: {kr(nA + nB)} × {kurs_salg} − {kr(KA + KB)} − {kr(u_salg)} = {kr(salg)} − {kr(KA + KB)} − "
               f"{kr(u_salg)} = kr {kr(gev1)}.",
               f"Skatt: {kr(gev1)} × 37,84 % = <b>kr {kr(skatt1, 2)}</b>."],
              [(f"Kr {kr(g1c_grunnlag, 2)}", f"glemt at den ubenyttede skjermingen på kr {kr(uB1)} legges til grunnlaget i år 2: "
                f"{kr(KB)} × 2 % = {kr(KB * r2)} i stedet for {kr(skjB2)}."),
               (f"Kr {kr(g1c_disk, 2)}", f"gaven behandlet som et kjøp til kurs {kurs_gave}: inngangsverdi {kr(inng_disk)} og ny "
                f"skjerming {kr(inng_disk)} × 2 % = {kr(inng_disk * r2)}. Det er diskontinuitet, som ikke gjelder aksjer."),
               (f"Kr {kr(g1c_22, 2)}", f"glemt oppjusteringen: {kr(gev1)} × 22 %.")],
              f"Regn per post. Januarposten: {kr(nA * kurs_salg)} − {kr(KA)} − {kr(skjA2)} = {kr(gevA)}. Oktoberposten: "
              f"{kr(nB * kurs_salg)} − {kr(KB)} − {kr(uB1 + skjB2)} = {kr(gevB)}. Sum {kr(gevA + gevB)}. ✓",
              f"Kontinuitet stryker kr {kr(g1c_disk, 2)}. Oppjusteringsparet (22 % mot 37,84 %) stryker kr {kr(g1c_22, 2)}. "
              f"Mellom de to som står igjen, avgjør om du la den ubenyttede skjermingen til grunnlaget."))
EX.append(oppgave(1, "Gudrun, Håkon og aksjene i Tindefjell ASA", "Aksjonærmodellen", [5, 6], felles1, [pa, pb, pc]))

# ======================================================================= 2
print("\nOppgave 2: kapitalkostnaden når bare en andel kan trekkes fra")
r2_, t2, b2 = 0.06, 0.22, 0.70
kile2 = (1 - t2 * b2) / (1 - t2)
kk2 = r2_ * kile2
assert lik(kk2, 0.06 * 0.846 / 0.78)
g2_utendel = r2_ * (1 - t2 * b2)          # glemt å dele på 1 − t
g2_snudd = r2_ * (1 - t2) / (1 - t2 * b2)  # brøken snudd
g2_noytral = r2_                           # antatt nøytral
kk2_b0 = r2_ / (1 - t2)
kontroll2 = r2_ + (1 - b2) * (kk2_b0 - r2_)
assert lik(kontroll2, kk2)
t2_lav = 0.11
kile2_lav = (1 - t2_lav * b2) / (1 - t2_lav)
print(f"   kile {kile2:.6f}, kapitalkostnad {kk2:.6f}; gale {g2_utendel:.6f}, {g2_snudd:.6f}, {g2_noytral}; kile ved 11 % {kile2_lav:.4f}")
felles2 = ("<p>Kystmøbler AS vurderer å utvide produksjonen. Avkastningskravet uten skatt er 6 %. Selskapsskatten er 22 %. "
           "Målt i nåverdi kommer 70 % av investeringskostnaden til fradrag gjennom avskrivningene.</p>")
pa = ledd("a", "<p>Hva er kapitalkostnaden før skatt, altså avkastningen før skatt den siste investerte kronen må gi? "
               "Svar med to desimaler.</p>",
          p_(kk2),
          [p_(g2_utendel), p_(g2_snudd), p_(g2_noytral)],
          sol("Bedriften maksimerer overskudd etter skatt, der skattegrunnlaget bare trekker fra andelen β av kostnaden. "
              "Førsteordensbetingelsen gir p = c′(x) × (1 − tβ)/(1 − t) (forelesning 5, lysbilde 19). Med kapital er c′ "
              "avkastningskravet r. Det er samme uttrykk som i manualen 9.4, med β i stedet for A.",
              [f"Telleren: 1 − 0,22 × 0,70 = 1 − 0,154 = 0,846.",
               f"Nevneren: 1 − 0,22 = 0,78. Kilen er 0,846/0,78 = {kr(kile2, 4)}.",
               f"Kapitalkostnaden før skatt: 6 % × {kr(kile2, 4)} = <b>{pst(kk2)}</b>."],
              [(pst(g2_utendel), "glemt å dele på 1 − t: 6 % × 0,846."),
               (pst(g2_snudd), "brøken snudd: 6 % × 0,78/0,846. Kravet kan ikke bli lavere enn uten skatt når fradraget er for lite."),
               (pst(g2_noytral), "antatt at skatten er nøytral. Det krever β = 1.")],
              f"Grensene: β = 1 gir 6,00 %, β = 0 gir 6 %/0,78 = {pst(kk2_b0)}. Uttrykket er lineært i β, så β = 0,7 ligger 30 % "
              f"av veien fra 6,00 % mot {pst(kk2_b0)}: 6,00 + 0,3 × {kr(100 * (kk2_b0 - r2_), 2)} = {kr(100 * kontroll2, 2)} %. ✓",
              f"Med β under 1 ligger svaret mellom r og r/(1 − t), altså mellom 6,00 % og {pst(kk2_b0)}. Det stryker "
              f"{pst(g2_utendel)} og {pst(g2_snudd)} uten regning."))
pb = ledd("b", "<p>Regjeringen vurderer å endre avskrivningsreglene eller skattesatsen. Hvilket utsagn er riktig?</p>",
          tekst("Skatten er nøytral bare hvis nåverdien av fradragene er lik hele kostnaden, uansett sats"),
          [tekst("En lavere selskapsskatt fjerner kilen, selv om bare 70 % kommer til fradrag", ["70"]),
           tekst("Når bare 70 % kommer til fradrag, investerer bedriften mer enn den ville gjort uten skatt", ["70"]),
           tekst("Er nåverdien av fradragene større enn kostnaden, blir skatten nøytral")],
          "<p><b>Regelen.</b> β er nåverdien av fradragene som andel av kostnaden (forelesning 5, lysbilde 18). Kilen "
          "(1 − tβ)/(1 − t) er lik 1 bare når β = 1, altså når nåverdien av fradragene er lik hele kostnaden. Da er "
          "skattepliktig og virkelig overskudd like i nåverdi. Skatten treffer bare den rene profitten, uansett sats. "
          "Utgiftsføring straks er den enkleste måten å få β = 1 på (lysbilde 20). <b>Utsagnet om nåverdien av fradragene er "
          "riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Lavere selskapsskatt</b> = kilen blir mindre, men ikke 1. Med 11 % "
          f"blir den (1 − 0,11 × 0,7)/0,89 = {kr(kile2_lav, 3)}.<br><b>Investerer mer</b> = feil retning. Kilen over 1 gir "
          "høyere krav og for lite investering.<br><b>Nåverdi større enn kostnaden</b> = β over 1 gir en kile under 1. "
          "Bedriften investerer da for mye, så skatten er heller ikke nøytral (lysbilde 19).</p>")
EX.append(oppgave(2, "Kystmøbler AS utvider produksjonen", "Bedriftens tilpasning", [9], felles2, [pa, pb]))

# ======================================================================= 3
print("\nOppgave 3: dobbeltbeskatning og skattearbitrasje")
samlet3 = 0.22 + 0.78 * TE
assert lik(samlet3, 0.515152)
p = ledd("", "<p>Liv eier aksjer i et norsk selskap som deler ut hele overskuddet etter skatt. Hun har også et boliglån med "
             "rentefradrag. Hvilket utsagn er i tråd med pensum?</p>",
         tekst("Skjermingsfradraget gjør at normalavkastningen på aksjene hennes bare skattlegges i selskapet"),
         [tekst("Fritaksmetoden hindrer at utbyttet hennes skattlegges både i selskapet og hos henne"),
          tekst("Låner hun med rentefradrag og plasserer pengene skattefritt til samme rente, er gevinsten betaling for risiko"),
          tekst("Klientellbasert arbitrasje gjør at skattefavoriserte aktiva havner hos investorer med lav marginalskatt")],
         f"<p><b>Regelen.</b> Utdelt overskudd skattlegges med 22 % i selskapet og 37,84 % av resten hos eieren, samlet "
         f"{pst(samlet3)}. Skjermingsrenten er risikofri rente etter skatt, så normalavkastningen slipper eierskatt. Bare "
         f"meravkastningen treffes av begge skattene (manualen 9.3). <b>Utsagnet om skjermingsfradraget er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Fritaksmetoden</b> = løser kjedebeskatning når overskuddet passerer "
         "flere selskaper. Den gjelder ikke personlige eiere.<br><b>Betaling for risiko</b> = skattearbitrasje krever verken "
         "egenkapital eller risiko. Gevinsten er bare satsdifferansen, r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>) "
         "(manualen 9.2).<br><b>Lav marginalskatt</b> = motsatt. Det skattefavoriserte aktivumet havner hos den med høyest "
         "marginalskatt, som har mest å spare.</p>")
EX.append(oppgave(3, "Liv, utbyttet og boliglånet", "Aksjonærmodellen", [9, 5], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: formuesskatt over innslagspunktet for trinn 2")
aksjer4, leil4, bank4, gjeld4 = 25_000_000, 6_000_000, 2_000_000, 6_600_000
brutto4 = aksjer4 + leil4 + bank4
fv4 = aksjer4 * 0.8 + leil4 + bank4
red4 = gjeld4 * aksjer4 * 0.2 / brutto4
fgjeld4 = gjeld4 - red4
netto4 = fv4 - fgjeld4
assert lik(red4, 1_000_000) and lik(netto4, 22_400_000)
BF, K2 = 1_900_000, 21_500_000
fs4 = 0.01 * (min(netto4, K2) - BF) + 0.011 * max(0.0, netto4 - K2)
assert lik(fs4, 205_900)
g4a_ured = fv4 - gjeld4                                        # ingen gjeldsreduksjon
fv4_naer = aksjer4 * 0.8 + leil4 * 0.8 + bank4
red4_naer = gjeld4 * (aksjer4 * 0.2 + leil4 * 0.2) / brutto4
g4a_naer = fv4_naer - (gjeld4 - red4_naer)                     # utleieleiligheten som næringseiendom
g4a_prim = aksjer4 * 0.8 + leil4 * 0.25 + bank4 - fgjeld4       # leiligheten som primærbolig
g4b_trinn1 = 0.01 * (netto4 - BF)
g4b_folge = 0.01 * (min(g4a_ured, K2) - BF) + 0.011 * max(0.0, g4a_ured - K2)
g4b_alt11 = 0.011 * (netto4 - BF)
print(f"   formuesverdi {fv4}, reduksjon {red4}, netto {netto4}, skatt {fs4}")
print(f"   gale a {g4a_ured}, {g4a_naer}, {g4a_prim}; gale b {g4b_trinn1}, {g4b_folge}, {g4b_alt11}")
felles4 = (f"<p>Sigve er enslig. Ved utgangen av 2026 eier han børsnoterte aksjer med markedsverdi kr {kr(aksjer4)}, "
           f"kr {kr(bank4)} i bankinnskudd og en leilighet i Trondheim som han leier ut. Leiligheten har markedsverdi "
           f"kr {kr(leil4)}. Selv bor han til leie. Gjelden hans er kr {kr(gjeld4)}. {BRUK26}</p>")
pa = ledd("a", "<p>Hva er Sigves nettoformue?</p>",
          kr_(netto4),
          [kr_(g4a_ured), kr_(g4a_naer), kr_(g4a_prim)],
          sol("Aksjer verdsettes til 80 %. Sekundærbolig og bankinnskudd verdsettes til 100 % (manualen 7.2). Gjelden fordeles "
              "etter bruttoverdiene. Den delen som faller på aksjene, reduseres med aksjerabatten på 20 % (skatteloven "
              "§ 4-19, manualen 7.4). En leilighet Sigve leier ut og ikke bor i, er sekundærbolig.",
              [f"Formuesverdi: {kr(aksjer4)} × 80 % + {kr(leil4)} + {kr(bank4)} = {kr(aksjer4 * 0.8)} + {kr(leil4 + bank4)} = "
               f"kr {kr(fv4)}.",
               f"Gjeldsreduksjon: {kr(gjeld4)} × {kr(aksjer4)}/{kr(brutto4)} × 20 % = {kr(gjeld4 * aksjer4 / brutto4)} × 20 % "
               f"= kr {kr(red4)}. Fradragsberettiget gjeld: {kr(gjeld4)} − {kr(red4)} = kr {kr(fgjeld4)}.",
               f"Nettoformue: {kr(fv4)} − {kr(fgjeld4)} = <b>kr {kr(netto4)}</b>."],
              [(f"Kr {kr(g4a_ured)}", "hele gjelden trukket fra uten reduksjon."),
               (f"Kr {kr(g4a_naer)}", "utleieleiligheten behandlet som næringseiendom med 80 % og gjeldsreduksjon. En utleid "
                "boligleilighet er sekundærbolig."),
               (f"Kr {kr(g4a_prim)}", "leiligheten verdsatt til 25 % som primærbolig. Sigve bor ikke der.")],
              f"Gjeldsreduksjonen er gjelden ganget med rabatten i kroner delt på bruttoformuen: {kr(gjeld4)} × "
              f"{kr(aksjer4 * 0.2)}/{kr(brutto4)} = {kr(red4)}. ✓"))
pb = ledd("b", "<p>Hvor mye formuesskatt betaler han?</p>",
          kr_(fs4),
          [kr_(g4b_trinn1), kr_(g4b_folge), kr_(g4b_alt11)],
          sol(f"Formuesskatten for 2026 er 1,0 % av nettoformuen mellom bunnfradraget på kr {kr(BF)} og kr {kr(K2)}. Det "
              f"som overstiger kr {kr(K2)}, skattlegges med 1,1 % (enslig, manualen 7.1).",
              [f"Trinn 1: ({kr(K2)} − {kr(BF)}) × 1,0 % = kr {kr(0.01 * (K2 - BF))}.",
               f"Trinn 2: ({kr(netto4)} − {kr(K2)}) × 1,1 % = kr {kr(0.011 * (netto4 - K2))}.",
               f"Sum: {kr(0.01 * (K2 - BF))} + {kr(0.011 * (netto4 - K2))} = <b>kr {kr(fs4)}</b>."],
              [(f"Kr {kr(g4b_trinn1)}", "1,0 % av hele grunnlaget. Trinn 2 er glemt."),
               (f"Kr {kr(g4b_folge)}", f"følgefeil fra nettoformuen kr {kr(g4a_ured)} uten gjeldsreduksjon. Da ligger formuen "
                f"under kr {kr(K2)}."),
               (f"Kr {kr(g4b_alt11)}", "1,1 % av hele grunnlaget over bunnfradraget.")],
              f"1,0 % av ({kr(netto4)} − {kr(BF)}) = {kr(g4b_trinn1)}, pluss 0,1 % × {kr(netto4 - K2)} = "
              f"{kr(0.001 * (netto4 - K2))}. Sum {kr(g4b_trinn1 + 0.001 * (netto4 - K2))}. ✓"))
EX.append(oppgave(4, "Sigve og formuen i 2026", "Formuesskatt", [7], felles4, [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: argumentene for og mot formuesskatt")
p = ledd("", "<p>Stortinget diskuterer om den årlige formuesskatten skal beholdes. Hvilket utsagn er i tråd med pensum?</p>",
         tekst("Den treffer normalavkastningen hardt og meravkastningen ikke, motsatt av det teorien anbefaler"),
         [tekst("Registerstudier av tett eide selskaper viser at den reduserer sysselsettingen i selskapene"),
          tekst("En uventet engangsskatt på formue vrir like mye som en årlig skatt med samme proveny"),
          tekst("Jo kortere tid du sparer, desto høyere blir den effektive skatten på konsumet du utsetter til senere")],
         "<p><b>Regelen.</b> Adam og Miller: en årlig formuesskatt tar det samme kronebeløpet uansett avkastning. Med formue "
         "100 og 1 % skatt tar den 1 av en normalavkastning på 5, men fortsatt bare 1 av en avkastning på 20. Teorien sier "
         "at det er meravkastningen som bør beskattes (manualen 8.5). <b>Utsagnet om normalavkastningen er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Sysselsettingen</b> = Bjerksund og Schjelderup viser til "
         "registerstudier som ikke finner støtte for det, snarere en positiv sammenheng.<br><b>Engangsskatt</b> = en uventet "
         "og troverdig engangsskatt vrir ingenting, fordi ingen kan tilpasse seg. Problemet er troverdigheten.<br><b>Kortere "
         "sparing</b> = motsatt. Kumulasjonen gjør skatten høyere jo lenger konsumet utsettes.</p>")
EX.append(oppgave(5, "Stortinget og formuesskatten", "Formuesskatt", [8], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: eiendomsskatt som kapitaliseres i hytteprisen")
pris6 = 3_200_000              # støy
grunnlag6, sats6, r6 = 2_000_000, 0.003, 0.04
skatt6 = grunnlag6 * sats6
nv6 = skatt6 / r6
assert lik(skatt6, 6_000) and lik(nv6, 150_000)
g6_ingen, g6_ett, g6_halv = 0.0, skatt6, nv6 / 2
print(f"   skatt {skatt6}, nåverdi {nv6}; gale {g6_ingen}, {g6_ett}, {g6_halv}")
p = ledd("", f"<p>To like hytter ligger i hver sin kommune. Fjellvik kommune har ingen eiendomsskatt. Hytta der er nettopp "
             f"solgt for kr {kr(pris6)}. Dalbygd kommune har eiendomsskatt på 3 promille av et grunnlag på kr {kr(grunnlag6)}. "
             f"Skatten betales i slutten av hvert år. Kjøperne regner med at begge ordningene varer evig og bruker 4 % "
             f"diskonteringsrente. Ellers verdsetter de hyttene likt. Hvor mye lavere blir prisen på hytta i Dalbygd?</p>",
         kr_(nv6),
         [kr_(g6_ingen), kr_(g6_ett), kr_(g6_halv)],
         sol("En skatt som følger eiendommen, kapitaliseres i prisen: kjøperen betaler bare det hytta er verdt etter skatt. "
             "Prisforskjellen er nåverdien av alle framtidige skattebeløp (manualen 11.6 og forelesning 9, siste lysbilde). "
             "En evig strøm har nåverdi lik beløpet delt på renten. Prisen i Fjellvik er støy.",
             [f"Årlig eiendomsskatt: {kr(grunnlag6)} × 3 ‰ = kr {kr(skatt6)}.",
              f"Nåverdi av evig strøm: {kr(skatt6)}/0,04 = kr {kr(nv6)}.",
              f"Hytta i Dalbygd koster derfor <b>kr {kr(nv6)}</b> mindre."],
             [(f"Kr {kr(g6_ingen)}", "tror kjøperen bare betaler skatten år for år uten at prisen påvirkes. Med lik pris ville "
               "ingen kjøpt i Dalbygd, så prisen må ned til kjøperne er likegyldige."),
              (f"Kr {kr(g6_ett)}", "bare ett års skatt. Skatten betales hvert år for alltid."),
              (f"Kr {kr(g6_halv)}", "halvparten av nåverdien. Funnet om at nesten halvparten bæres av utleieren, gjelder "
               "leiemarkedet (Carroll og Yinger), ikke kjøpere som verdsetter hyttene likt.")],
             f"4 % av {kr(nv6)} er {kr(nv6 * r6)}. Rabatten i prisen gir akkurat nok renter til å dekke skatten hvert år. ✓"))
EX.append(oppgave(6, "To like hytter i to kommuner", "Skatteincidens", [7, 11], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: formuesskattesatsen som gir samme proveny som en avkastningsskatt")
t7, r7 = 0.30, 0.05
tau7 = t7 * r7 / (1 + r7)
g7_inng = t7 * r7
g7_gang = t7 * r7 * (1 + r7)
g7_1t = t7 * r7 / (1 + t7)
assert lik(100 * tau7 * (1 + r7), 100 * t7 * r7)
print(f"   tau {tau7:.6f}; gale {g7_inng}, {g7_gang:.6f}, {g7_1t:.6f}")
p = ledd("", "<p>Regjeringen vurderer å erstatte en skatt på 30 % av avkastningen med en formuesskatt som gir samme proveny. "
             "Formuen gir 5 % avkastning i året. Formuesskatten skal regnes av formuen ved utgangen av året, etter at "
             "avkastningen er lagt til. Hvilken formuesskattesats gir samme proveny? Svar med to desimaler.</p>",
         p_(tau7),
         [p_(g7_inng), p_(g7_gang), p_(g7_1t)],
         sol("Sett provenyene like. Avkastningsskatten tar t × r × W. Formuesskatten tar τ av formuen ved årets slutt, "
             "W(1 + r). Da er τ = t × r/(1 + r) (manualen 8.1).",
             ["Avkastningsskatt per krone formue ved inngangen: 30 % × 5 % = 0,015.",
              "Grunnlaget for formuesskatten er 1,05 per krone ved inngangen.",
              f"τ = 0,015/1,05 = <b>{pst(tau7)}</b>."],
             [(pst(g7_inng), "formuesskatten regnet av formuen ved inngangen: τ = t × r."),
              (pst(g7_gang), "ganget med 1 + r i stedet for å dele: 0,015 × 1,05."),
              (pst(g7_1t), "delt på 1 + t i stedet for 1 + r: 0,015/1,30.")],
             f"Formue 100: avkastningen 5 gir 1,50 i avkastningsskatt. Formuesskatten {kr(100 * tau7, 4)} % av 105 gir "
             f"{kr(105 * tau7, 2)}. ✓",
             f"Teksten sier at skatten regnes etter at avkastningen er lagt til. Da må svaret ligge litt under t × r = "
             f"{pst(g7_inng)}."))
EX.append(oppgave(7, "Regjeringen og to skatter på formuen", "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 8
print("\nOppgave 8: avgift innkrevd fra kjøperne, dødvektstap og plattform")
a8, b8, c8, d8, t8 = 900, 30, 100, 20, 5        # x = a − bP, x = dp − c


def likevekt8(t):
    p_s = (a8 - b8 * t + c8) / (b8 + d8)
    return p_s, p_s + t, d8 * p_s - c8


p0, P0, x0 = likevekt8(0)
ps8, Pk8, x8 = likevekt8(t8)
assert lik(P0, 20) and lik(ps8, 17) and lik(Pk8, 22) and lik(x8, 240) and lik(x0, 300)
andel8 = d8 / (d8 + b8)
assert lik(P0 + andel8 * t8, Pk8)
g8_selger, g8_full, g8_byttet = ps8, P0 + t8, P0 + (1 - andel8) * t8
ps8b, Pk8b, x8b = likevekt8(2 * t8)
dvt_1 = 0.5 * t8 * (x0 - x8)
dvt_2 = 0.5 * 2 * t8 * (x0 - x8b)
prov_1, prov_2 = t8 * x8, 2 * t8 * x8b
assert lik(dvt_2 / dvt_1, 4) and not lik(prov_2, 2 * prov_1)
assert lik((Pk8b - P0) / (2 * t8), andel8)
print(f"   P0 {P0}, p {ps8}, P {Pk8}, x {x8}; gale {g8_selger}, {g8_full}, {g8_byttet}")
print(f"   dvt {dvt_1} -> {dvt_2}, proveny {prov_1} -> {prov_2}, x ved 10: {x8b}")
felles8 = ("<p>Etterspørselen etter en vare er x = 900 − 30P, der P er prisen kjøperne betaler. Tilbudet er x = 20p − 100, "
           "der p er prisen selgerne får. Myndighetene innfører en avgift på kr 5 per enhet. Den skal betales inn av "
           "kjøperne.</p>")
pa = ledd("a", "<p>Hvor mye betaler kjøperne til sammen per enhet, avgiften medregnet?</p>",
          kr_(Pk8),
          [kr_(g8_selger), kr_(g8_full), kr_(g8_byttet)],
          sol("Det spiller ingen rolle hvem som betaler avgiften inn (forelesning 9, lysbilde 14, manualen 11.1). Likevekten er D(p + t) = S(p): kjøperne "
              "betaler p + t, selgerne får p.",
              [f"900 − 30(p + 5) = 20p − 100 gir 850 = 50p, så p = {kr(ps8)}.",
               f"Kjøperne betaler {kr(ps8)} + 5 = <b>kr {kr(Pk8)}</b> til sammen.",
               f"Uten avgift er prisen {kr(P0)} (900 − 30P = 20P − 100). Kjøperne bærer {kr(Pk8 - P0)} kroner, selgerne "
               f"{kr(P0 - ps8)}."],
              [(f"Kr {kr(g8_selger)}", "prisen selgerne får. Kjøperne betaler avgiften i tillegg."),
               (f"Kr {kr(g8_full)}", "hele avgiften lagt på den gamle prisen. Det krever perfekt elastisk tilbud eller perfekt "
                "uelastisk etterspørsel."),
               (f"Kr {kr(g8_byttet)}", "andelene byttet om: kjøperne bærer 60 % i stedet for 40 %.")],
              f"Kjøpernes andel er S′/(S′ − D′) = 20/(20 + 30) = 40 %. 40 % × 5 = 2. Da er {kr(P0)} + 2 = {kr(Pk8)}. ✓"))
pb = ledd("b", "<p>Myndighetene vurderer senere å doble avgiften til kr 10. Hvilket utsagn er riktig?</p>",
          tekst("Dødvektstapet blir fire ganger så stort"),
          [tekst("Dødvektstapet dobles, fordi det øker i takt med avgiften"),
           tekst("Provenyet til staten dobles, fordi avgiften per enhet dobles"),
           tekst("Kjøperne bærer en større andel av avgiften enn før")],
          sol("Dødvektstapet er trekanten ½ × t × (x<sub>0</sub> − x<sub>t</sub>). Med lineære kurver faller kvantumet "
              "proporsjonalt med avgiften, så tapet vokser med kvadratet av avgiften (manualen 11.5).",
              [f"Uten avgift: x<sub>0</sub> = 900 − 30 × {kr(P0)} = {kr(x0)}. Med kr 5: x = 20 × {kr(ps8)} − 100 = {kr(x8)}. "
               f"Tap ½ × 5 × {kr(x0 - x8)} = {kr(dvt_1)}.",
               f"Med kr 10: 900 − 30(p + 10) = 20p − 100 gir p = {kr(ps8b)} og x = {kr(x8b)}. Tap ½ × 10 × {kr(x0 - x8b)} = "
               f"{kr(dvt_2)}.",
               f"{kr(dvt_2)}/{kr(dvt_1)} = 4. <b>Dødvektstapet blir fire ganger så stort.</b>"],
              [("Dobles", "glemmer at både høyden og grunnlinjen i trekanten dobles."),
               ("Provenyet dobles", f"provenyet er t × x: 5 × {kr(x8)} = {kr(prov_1)} mot 10 × {kr(x8b)} = {kr(prov_2)}. "
                f"Kvantumet faller."),
               ("Kjøperne bærer mer", "med lineære kurver er andelen konstant, 40 % av hver krone avgift.")]))
pc = ledd("c", "<p>En avis selger abonnementer til lesere og annonseplass til annonsører. Staten innfører merverdiavgift på "
               "abonnementene. Hvilket utsagn er i tråd med pensum?</p>",
          tekst("Avisen kan senke abonnementsprisen for å holde på leserne og annonseinntektene"),
          [tekst("Avisen må øke abonnementsprisen med hele avgiften, fordi det er avisen som betaler den inn"),
           tekst("En avgift på abonnementet kan aldri gi lavere pris for leserne"),
           tekst("Abonnementsprisen kan bare falle hvis etterspørselen etter avisen er helt uelastisk")],
          "<p><b>Regelen.</b> En avis er en plattform med to gjensidig avhengige kundegrupper: flere lesere gjør annonseplassen "
          "mer verdt. Da gjelder ikke pris lik grensekostnad. En avgift på den ene siden kan få plattformen til å senke prisen "
          "der (forelesning 9, lysbilde 24 og 25, manualen 11.6). <b>Avisen kan senke prisen.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Må øke med hele avgiften</b> = blander formell og reell insidens. Den "
          "som betaler inn, er ikke nødvendigvis den som bærer avgiften.<br><b>Aldri lavere pris</b> = det er nettopp det "
          "overraskende resultatet: en vare som skattlegges, kan falle i pris (lysbilde 7).<br><b>Helt uelastisk "
          "etterspørsel</b> = da bærer leserne hele avgiften. Prisen stiger med hele avgiften (forelesning 9, lysbilde 15). "
          "Prisfallet kommer av at de to sidene henger sammen, ikke av elastisiteten.</p>")
EX.append(oppgave(8, "Avgift på en vare og moms på en avis", "Skatteincidens", [11], felles8, [pa, pb, pc]))

# ======================================================================= 9
print("\nOppgave 9: evneprinsippet, kilen og optimal skatt")
felles9 = "<p>Tre spørsmål om skattesystemet. Hvert spørsmål står for seg.</p>"
pa = ledd("a", "<p>Synne og Oskar har hver en inntekt på kr 1 000 000 i 2026. Synne har bare lønn. Oskar har bare "
               "renteinntekter. Synne betaler mest skatt. Hvilket utsagn er riktig?</p>",
          tekst("Forskjellen bryter horisontal likhet, fordi like tilfeller ikke behandles likt"),
          [tekst("Forskjellen bryter vertikal likhet, fordi Synne betaler mer enn Oskar"),
           tekst("Forskjellen følger av evneprinsippet, fordi lønn gir større skatteevne enn renter"),
           tekst("Forskjellen viser at systemet er progressivt, fordi lønn skattlegges i flere trinn")],
          "<p><b>Regelen.</b> Horisontal likhet: like tilfeller skal behandles likt. Vertikal likhet: den med større evne skal "
          "betale mer. Begge hviler på evneprinsippet. Det duale systemet skattlegger lønn med opptil 47,4 % og kapitalinntekt "
          "med 22 %, så to med samme inntekt kan møte ulik skatt. Bruddet begrunnes med at kapitalen er mer bevegelig "
          "(manualen 10.1). <b>Horisontal likhet er brutt.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Vertikal likhet</b> = gjelder personer med ulik evne. Synne og Oskar "
          "har samme inntekt.<br><b>Følger av evneprinsippet</b> = skatteevnen måles ved inntekten, ikke ved hvor den kommer "
          "fra. Forskjellen er et brudd, ikke en anvendelse.<br><b>Progressivt</b> = progressivitet handler om at "
          "gjennomsnittsskatten stiger med inntekten. Her er inntekten lik.</p>")
pb = ledd("b", "<p>Etter en skattereform har Brage høyere marginalskatt, men lavere gjennomsnittsskatt enn før. Fritid er et "
               "normalt gode for ham. Hva skjer med arbeidstilbudet hans?</p>",
          tekst("Han jobber mindre, fordi begge virkningene trekker samme vei"),
          [tekst("Virkningen er ubestemt, fordi inntekts- og substitusjonsvirkningen trekker hver sin vei"),
           tekst("Han jobber mer, fordi lavere gjennomsnittsskatt gjør ham rikere"),
           tekst("Han jobber mer, fordi han må jobbe mer for å holde inntekten etter skatt")],
          "<p><b>Regelen.</b> Marginalskatten styrer substitusjonsvirkningen: høyere marginalskatt gjør en time arbeid mindre "
          "verdt, så han jobber mindre. Gjennomsnittsskatten styrer inntektsvirkningen: lavere gjennomsnittsskatt gjør ham "
          "rikere. Når fritid er et normalt gode, kjøper han da mer fritid (manualen 10.2). <b>Begge trekker mot mindre "
          "arbeid.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Ubestemt</b> = gjelder når virkningene trekker hver sin vei, for "
          "eksempel når både marginal- og gjennomsnittsskatten stiger. Her trekker begge samme vei.<br><b>Jobber mer fordi "
          "rikere</b> = feil retning. Rikere betyr mer fritid når fritid er et normalt gode.<br><b>Holde inntekten</b> = "
          "inntektsvirkningen av en høyere gjennomsnittsskatt. Her faller gjennomsnittsskatten.</p>")
pc = ledd("c", "<p>Land A og land B har samme spredning i produktivitet og like sterk ulikhetsaversjon. I land A er den "
               "kompenserte arbeidstilbudselastisiteten lav. I land B er den høy. Hva sier teorien om optimal "
               "inntektsskatt?</p>",
          tekst("Land A bør ha høyest marginalskatt, fordi skatten der gir minst vridning"),
          [tekst("Land B bør ha høyest marginalskatt, fordi skattegrunnlaget der reagerer mest"),
           tekst("Begge bør ha like høy marginalskatt, fordi bare ulikhetsaversjonen avgjør nivået"),
           tekst("Begge bør ha sterkt stigende marginalskatt, slik at omfordelingen kommer fra satsene")],
          "<p><b>Regelen.</b> Mirrlees: optimal marginalskatt er høyere jo lavere den kompenserte elastisiteten er, jo større "
          "spredningen i produktivitet er og jo sterkere ulikhetsaversjonen er. Løsningen er nesten lineær. Omfordelingen "
          "kommer fra bunnfradraget (manualen 10.5). <b>Land A bør ha høyest marginalskatt.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Land B</b> = fortegnet på elastisiteten snudd, den vanligste "
          "feilversjonen. Et grunnlag som reagerer mye, gjør skatten dyr.<br><b>Bare ulikhetsaversjonen</b> = den er én av tre "
          "faktorer. Elastisiteten skiller landene her.<br><b>Sterkt stigende</b> = Mirrlees fant en nesten lineær skatt med "
          "konstant eller svakt fallende marginalskatt.</p>")
EX.append(oppgave(9, "Tre spørsmål om rettferdighet og arbeid", "Progressivitet", [10], felles9, [pa, pb, pc]))

# ======================================================================= 10
print("\nOppgave 10: fast driftssted, internpriser og tiltak")
n10, ip10, al10, tN, tI = 20_000, 900, 600, 0.22, 0.125
flytt10 = (ip10 - al10) * n10
spar10 = flytt10 * (tN - tI)
assert lik(flytt10, 6_000_000) and lik(spar10, 570_000)
g10_norsk = flytt10 * tN
g10_irsk = flytt10 * tI
g10_hele = ip10 * n10 * (tN - tI)
assert lik(g10_norsk - g10_irsk, spar10)
print(f"   flyttet {flytt10}, spart {spar10}; gale {g10_norsk}, {g10_irsk}, {g10_hele}")
felles10 = ("<p>Fjordtek AS i Bergen lager måleutstyr og selger til kunder i Tyskland. Konsernet har også et søsterselskap "
            "i Irland.</p>")
pa = ledd("a", "<p>Hvilket av forholdene gir Fjordtek fast driftssted i Tyskland etter OECDs mønsteravtale?</p>",
          tekst("En ansatt selger i München som jevnlig inngår bindende avtaler for Fjordtek"),
          [tekst("En byggeplass i Tyskland der Fjordtek monterer utstyr i seks måneder"),
           tekst("Salg til tyske kunder gjennom nettbutikken, med levering fra Bergen"),
           tekst("Et innkjøpskontor i Berlin som kjøper inn komponenter til fabrikken i Bergen")],
          "<p><b>Regelen.</b> Fast driftssted krever et fast forretningssted som virksomheten helt eller delvis drives gjennom. "
          "Agentregelen gir fast driftssted også uten lokaler: en representant som ikke er uavhengig og jevnlig inngår bindende "
          "kontrakter for selskapet. En byggeplass gir fast driftssted først når arbeidet varer ut over tolv måneder. "
          "Forberedende virksomhet og hjelpevirksomhet, som et innkjøpskontor, gir ikke fast driftssted (manualen 13.2). "
          "<b>Den ansatte selgeren i München gir fast driftssted.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Byggeplass i seks måneder</b> = under terskelen på tolv måneder i "
          "mønsteravtalen.<br><b>Nettbutikk fra Bergen</b> = ingen forretningssted i Tyskland. Det er dette hullet BEPS skal "
          "tette.<br><b>Innkjøpskontor</b> = hjelpevirksomhet for fabrikken i Bergen. Verdien skapes ikke der.</p>")
pb = ledd("b", f"<p>Fjordtek kjøper {kr(n10)} komponenter i året fra søsterselskapet i Irland. Internprisen er kr {ip10} per "
               f"stykk. Uavhengige parter ville handlet til kr {al10}. Selskapsskatten er 22 % i Norge og 12,5 % i Irland. "
               f"Anta at internprisen blir godtatt. Hvor mye sparer konsernet i skatt per år?</p>",
          kr_(spar10),
          [kr_(g10_norsk), kr_(g10_irsk), kr_(g10_hele)],
          sol("Den høye internprisen flytter overskudd fra Norge til Irland. Flyttet overskudd = (internpris − armlengdepris) × "
              "volum. Konsernet sparer satsforskjellen på det flyttede beløpet (manualen 13.5).",
              [f"Flyttet overskudd: ({ip10} − {al10}) × {kr(n10)} = kr {kr(flytt10)}.",
               "Satsforskjell: 22 % − 12,5 % = 9,5 prosentpoeng.",
               f"Besparelse: {kr(flytt10)} × 9,5 % = <b>kr {kr(spar10)}</b>."],
              [(f"Kr {kr(g10_norsk)}", f"bare den norske skatten på {kr(flytt10)}. Glemmer at Irland skattlegger beløpet med 12,5 %."),
               (f"Kr {kr(g10_irsk)}", "den irske skatten på beløpet, ikke besparelsen."),
               (f"Kr {kr(g10_hele)}", f"satsforskjellen ganget med hele internprisen: {ip10} × {kr(n10)} × 9,5 %. Bare overprisen "
                f"flytter overskudd.")],
              f"Norge taper {kr(flytt10)} × 22 % = {kr(g10_norsk)}. Irland får {kr(flytt10)} × 12,5 % = {kr(g10_irsk)}. "
              f"Konsernet sparer {kr(g10_norsk)} − {kr(g10_irsk)} = {kr(spar10)}. ✓"))
pc = ledd("c", "<p>Skattemyndighetene vil vite mer om hvordan slike konsern flytter overskudd. Hvilket utsagn om tiltakene "
               "mot skatteparadiser er i tråd med pensum?</p>",
          tekst("CRS gir informasjon bare til skattemyndighetene. Ingen tredjepart får innsyn"),
          [tekst("BEPS har gjort de fleste oppleggene for å flytte overskudd til lavskatteland ulovlige"),
           tekst("Den globale minimumsskatten fjerner hemmeligholdet i skatteparadisene"),
           tekst("USA deltar i CRS og ligger derfor lavt på listene over hemmelighold")],
          "<p><b>Regelen.</b> CRS er automatisk informasjonsutveksling mellom skattemyndighetene i om lag 160 land. Avtalene "
          "gir ikke mer åpenhet for tredjepart. Bare skattemyndighetene får informasjonen (forelesning 11, lysbilde 51, "
          "manualen 13.6). <b>Utsagnet om CRS er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>BEPS</b> = de fleste av oppleggene er ikke ulovlige. BEPS er OECDs "
          "arbeid mot uthuling av skattegrunnlag og overskuddsflytting.<br><b>Minimumsskatten</b> = angriper satsen, ikke "
          "hemmeligholdet.<br><b>USA</b> = deltar ikke i CRS. På Financial Secrecy Index ligger USA høyt, bak "
          "Caymanøyene.</p>")
EX.append(oppgave(10, "Fjordtek AS, Tyskland og Irland", "Internasjonal skatt", [13], felles10, [pa, pb, pc]))

# ======================================================================= 11
print("\nOppgave 11: utbytte fra Sveits med kildeskatt")
K11, rs11, D11, ks11 = 1_200_000, 0.035, 60_000, 0.15
skj11 = K11 * rs11
norsk_for11 = (D11 - skj11) * TE
kilde11 = D11 * ks11
kredit11 = min(kilde11, norsk_for11)
norsk11 = norsk_for11 - kredit11
assert lik(skj11, 42_000) and lik(norsk_for11, 6_811.2) and lik(norsk11, 0)
g11_fradrag = (D11 - kilde11 - skj11) * TE
g11_ingen = norsk_for11
g11_full = norsk_for11 - kilde11
print(f"   norsk før kredit {norsk_for11}, kildeskatt {kilde11}, norsk etter {norsk11}; gale {g11_fradrag}, {g11_ingen}, {g11_full}")
p = ledd("", f"<p>Ingunn bor i Norge og eier aksjer i det sveitsiske selskapet Alpenwerk AG hele året. Kostprisen er "
             f"kr {kr(K11)}. Skjermingsrenten for året er 3,5 %. Hun får kr {kr(D11)} i utbytte. Sveits trekker 15 % "
             f"kildeskatt. Skatteavtalen bruker kreditmetoden. Eierskatten er 22 % og oppjusteringsfaktoren 1,72. Hvor mye "
             f"skatt betaler Ingunn til Norge på utbyttet? Svar med to desimaler.</p>",
         kr_(norsk11, 2),
         [kr_(g11_fradrag, 2), kr_(g11_ingen, 2), kr_(g11_full, 2)],
         sol("Skjermingen gjelder også aksjer i utenlandske selskaper (manualen 5.3). Kreditfradraget er det laveste av "
             "kildeskatten og den norske skatten på samme inntekt. Restskatten til Norge kan ikke bli negativ. Ukreditert "
             "kildeskatt går som hovedregel tapt (manualen 13.3).",
             [f"Norsk skatt før kredit: ({kr(D11)} − {kr(K11)} × 3,5 %) × 1,72 × 22 % = ({kr(D11)} − {kr(skj11)}) × 37,84 % = "
              f"kr {kr(norsk_for11, 2)}.",
              f"Kildeskatt: {kr(D11)} × 15 % = kr {kr(kilde11)}. Kreditfradrag: det laveste av {kr(kilde11)} og "
              f"{kr(norsk_for11, 2)}, altså {kr(kredit11, 2)}.",
              f"Norsk skatt: {kr(norsk_for11, 2)} − {kr(kredit11, 2)} = <b>kr {kr(norsk11, 2)}</b>. Kr "
              f"{kr(kilde11 - kredit11, 2)} av kildeskatten får ingen kredit."],
             [(f"Kr {kr(g11_fradrag, 2)}", f"kildeskatten trukket fra grunnlaget som et fradrag: ({kr(D11)} − {kr(kilde11)} − "
               f"{kr(skj11)}) × 37,84 %."),
              (f"Kr {kr(g11_ingen, 2)}", "ingen kredit for kildeskatten."),
              (f"Kr {kr(g11_full, 2)}", "kredit for hele kildeskatten, slik at Norge betaler tilbake. Kreditten har et tak.")],
             f"Samlet skatt er {kr(kilde11)}, altså 15 % av utbyttet. Under kreditmetoden ender du på den høyeste av de to "
             f"skattene: {kr(kilde11)} mot {kr(norsk_for11, 2)}. ✓",
             "Restskatten kan ikke bli negativ. Det stryker det negative tallet med en gang."))
EX.append(oppgave(11, "Ingunn og utbyttet fra Sveits", "Internasjonal skatt", [13, 5], "", [p]))

# ======================================================================= 12
print("\nOppgave 12: forsikring av et maleri med √W")
W12, L12, q12 = 1_000_000, 510_000, 0.10
EU12 = (1 - q12) * math.sqrt(W12) + q12 * math.sqrt(W12 - L12)
CE12 = EU12 ** 2
Pmax12 = W12 - CE12
EW12 = W12 - q12 * L12
RP12 = EW12 - CE12
assert lik(EU12, 970) and lik(CE12, 940_900) and lik(Pmax12, 59_100) and lik(RP12, 8_100)
akt12 = q12 * L12
EU12_bare = (1 - q12) * math.sqrt(L12)
P12_bare = L12 - EU12_bare ** 2
g12a_nytte = (math.sqrt(W12) - EU12) * 1_000
g12b_bare = P12_bare - akt12
assert lik(P12_bare, 96_900) and lik(g12a_nytte, 30_000)
print(f"   EU {EU12}, CE {CE12}, Pmax {Pmax12}, RP {RP12}; gale a {akt12}, {P12_bare}, {g12a_nytte}; gale b {g12b_bare}")
felles12 = (f"<p>Marens samlede formue er kr {kr(W12)}. Av dette er kr {kr(L12)} et maleri. Sannsynligheten for at maleriet "
            f"blir stjålet i løpet av året, er 10 %. Da mister hun hele verdien av det. Nyttefunksjonen hennes er "
            f"U(W) = √W.</p>")
pa = ledd("a", "<p>Hva er den høyeste premien Maren er villig til å betale for en forsikring med full dekning? Rund av til "
               "nærmeste krone.</p>",
          kr_(Pmax12),
          [kr_(akt12), kr_(P12_bare), kr_(g12a_nytte)],
          sol("Den høyeste premien gjør henne likegyldig: √(W − P) = E[U] uten forsikring, så P = W − CE, der CE = (E[U])² "
              "(manualen 17.3). Tyveriet tar bare maleriet, ikke hele formuen.",
              [f"E[U] = 0,9 × √{kr(W12)} + 0,1 × √{kr(W12 - L12)} = 0,9 × {kr(math.sqrt(W12))} + 0,1 × "
               f"{kr(math.sqrt(W12 - L12))} = {kr(EU12)}.",
               f"Sikkerhetsekvivalent: {kr(EU12)}² = kr {kr(CE12)}.",
               f"Høyeste premie: {kr(W12)} − {kr(CE12)} = <b>kr {kr(Pmax12)}</b>."],
              [(f"Kr {kr(akt12)}", f"forventet tap, 10 % × {kr(L12)}. En risikoavers betaler mer enn det."),
               (f"Kr {kr(P12_bare)}", f"regnet som om maleriet var hele formuen: 0,9 × √{kr(L12)} gir CE {kr(EU12_bare ** 2)}. "
                f"Premien blir {kr(L12)} − {kr(EU12_bare ** 2)} = {kr(P12_bare)}."),
               (f"Kr {kr(g12a_nytte)}", f"nyttetapet {kr(math.sqrt(W12))} − {kr(EU12)} = {kr(math.sqrt(W12) - EU12)} ganget med "
                f"1 000 i stedet for å gå via sikkerhetsekvivalenten.")],
              f"Premien skal ligge mellom forventet tap ({kr(akt12)}) og hele tapet ({kr(L12)}). Og √({kr(W12)} − {kr(Pmax12)}) "
              f"= √{kr(CE12)} = {kr(EU12)}. ✓",
              f"Kr {kr(g12a_nytte)} ligger under forventet tap og kan strykes uten regning."))
pb = ledd("b", "<p>Hvor stor er risikopremien hennes?</p>",
          kr_(RP12),
          [kr_(Pmax12), kr_(akt12), kr_(g12b_bare)],
          sol("Risikopremien er forventet formue minus sikkerhetsekvivalenten (manualen 17.1). Den er også den høyeste premien "
              "minus forventet tap.",
              [f"Forventet formue: {kr(W12)} − 0,1 × {kr(L12)} = kr {kr(EW12)}.",
               f"Sikkerhetsekvivalent fra a: kr {kr(CE12)}.",
               f"Risikopremie: {kr(EW12)} − {kr(CE12)} = <b>kr {kr(RP12)}</b>."],
              [(f"Kr {kr(Pmax12)}", "den høyeste premien, som også inneholder forventet tap."),
               (f"Kr {kr(akt12)}", "forventet tap, altså den aktuarisk rettferdige premien."),
               (f"Kr {kr(g12b_bare)}", f"følgefeil: {kr(P12_bare)} − {kr(akt12)}, med maleriet som hele formuen.")],
              f"Høyeste premie = forventet tap + risikopremie: {kr(akt12)} + {kr(RP12)} = {kr(akt12 + RP12)}. ✓"))
EX.append(oppgave(12, "Maren og maleriet", "Forsikring og forventet nytte", [17], felles12, [pa, pb]))

# ======================================================================= 13
print("\nOppgave 13: Merton når volatiliteten øker")
w13, s13a, s13b = 0.48, 0.15, 0.20
w13ny = w13 * (s13a / s13b) ** 2
assert lik(w13ny, 0.27)
g13_sigma = w13 * s13a / s13b
g13_uendret = w13
g13_snudd = w13 * s13b / s13a
prem13 = 0.05
gam13 = prem13 / (w13 * s13a ** 2)
assert lik(prem13 / (gam13 * s13b ** 2), w13ny)
print(f"   ny andel {w13ny}; gale {g13_sigma}, {g13_uendret}, {g13_snudd}; gamma ved 5 % premie {gam13:.4f}")
p = ledd("", "<p>Torvald er pensjonist og har bare finansiell formue. Han har 48 % av formuen i et globalt aksjefond og resten "
             "i banken. Andelen er optimal for ham. Så stiger standardavviket til aksjefondet fra 15 % til 20 %. Forventet "
             "avkastning, bankrenten og risikoaversjonen hans er uendret. Hva er den nye optimale andelen i aksjefondet? "
             "Svar med én desimal.</p>",
         p_(w13ny, 1),
         [p_(g13_sigma, 1), p_(g13_uendret, 1), p_(g13_snudd, 1)],
         sol("Mertons andel er w* = (E[r] − r<sub>f</sub>)/(γσ²). Med uendret premie og γ er andelen omvendt proporsjonal "
             "med variansen (manualen 14.4).",
             ["w* = premie/(γσ²). Premien og γ står fast, så bare σ² endres.",
              f"Variansen går fra 0,15² = 0,0225 til 0,20² = 0,04, altså {kr(s13b ** 2 / s13a ** 2, 4)} ganger så høy.",
              f"Ny andel: 48 %/{kr(s13b ** 2 / s13a ** 2, 4)} = <b>{pst(w13ny, 1)}</b>."],
             [(pst(g13_sigma, 1), "andelen justert med σ i stedet for σ²: 48 % × 15/20."),
              (pst(g13_uendret, 1), "uendret. Andelen avhenger av risikoen."),
              (pst(g13_snudd, 1), "forholdet snudd: 48 % × 20/15. Mer risiko gir lavere andel, ikke høyere.")],
             f"Sett premien til 5 %: γ = 0,05/(0,48 × 0,0225) = {kr(gam13, 2)}. Da er 0,05/({kr(gam13, 2)} × 0,04) = "
             f"{pst(prem13 / (gam13 * s13b ** 2), 1)}. Svaret avhenger ikke av premien. ✓",
             "Mer risiko og samme premie gir lavere andel. Det stryker de to høyeste alternativene."))
EX.append(oppgave(13, "Torvald og et mer urolig aksjemarked", "Porteføljevalg", [14], "", [p]))

# ======================================================================= 14
print("\nOppgave 14: CAPM og usystematisk risiko")
b14, sX, rm14, sm14, rf14 = 1.4, 0.45, 0.08, 0.18, 0.03
r14 = rf14 + b14 * (rm14 - rf14)
assert lik(r14, 0.10)
g14_brm = b14 * rm14
g14_sigma = rf14 + sX / sm14 * (rm14 - rf14)
g14_marked = rm14
print(f"   CAPM {r14}; gale {g14_brm}, {g14_sigma}, {g14_marked}")
p = ledd("", "<p>Aksjen i Polarnett ASA har beta 1,4 og standardavvik 45 %. Markedsporteføljen har forventet avkastning 8 % "
             "og standardavvik 18 %. Risikofri rente er 3 %. Sølvi vurderer å kjøpe aksjen. Hvilken avkastning bør hun "
             "forvente av aksjen hvis CAPM holder?</p>",
         p_(r14, 1),
         [p_(g14_brm, 1), p_(g14_sigma, 1), p_(g14_marked, 1)],
         sol("CAPM: r = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>). Markedet betaler bare for risiko som ikke kan "
             "diversifiseres bort, altså samvariasjonen med markedet målt ved beta (ForelesningAksjesparing, lysbilde 70 og "
             "71). Standardavvikene er støy.",
             ["Markedets risikopremie: 8 % − 3 % = 5 %.",
              "Aksjens risikopremie: 1,4 × 5 % = 7 %.",
              f"Forventet avkastning: 3 % + 7 % = <b>{pst(r14, 1)}</b>."],
             [(pst(g14_brm, 1), "beta ganget med markedets avkastning, 1,4 × 8 %, uten å trekke fra den risikofrie renten."),
              (pst(g14_sigma, 1), "totalrisikoen priset: 45/18 = 2,5 ganger markedets premie. Den usystematiske delen kan "
               "diversifiseres bort og gir ingen premie."),
              (pst(g14_marked, 1), "markedets avkastning. Beta over 1 betyr at aksjen samvarierer mer med markedet og skal gi "
               "mer.")],
             "Beta 1 gir 8 %, beta 0 gir 3 %. Beta 1,4 skal ligge 0,4 markedspremier over 8 %: 8 + 0,4 × 5 = 10. ✓"))
EX.append(oppgave(14, "Sølvi og aksjen i Polarnett ASA", "Porteføljevalg", [14], "", [p]))

# ======================================================================= 15
print("\nOppgave 15: serielån med rentefradrag")
lonn15 = 2_000_000          # støy
L15, r15, n15 = 1_800_000, 0.045, 15
avdr15 = L15 / n15
rente15 = L15 * r15
termin15 = avdr15 + rente15
netto15 = termin15 - 0.22 * rente15
assert lik(netto15, 183_180)
g15_brutto = termin15
g15_avdrag = termin15 - 0.22 * avdr15
g15_474 = termin15 - 0.474 * rente15
print(f"   avdrag {avdr15}, rente {rente15}, termin {termin15}, netto {netto15}; gale {g15_brutto}, {g15_avdrag}, {g15_474}")
p = ledd("", f"<p>Agnes tjener kr {kr(lonn15)} i året. Hun tar opp et serielån på kr {kr(L15)} med 4,5 % rente og 15 års "
             f"løpetid. Lånet betales med én termin i slutten av hvert år. {BRUK26} Hva koster første termin henne etter "
             f"rentefradraget?</p>",
         kr_(netto15),
         [kr_(g15_brutto), kr_(g15_avdrag), kr_(g15_474)],
         sol("Serielån: fast avdrag L/n pluss renter på restgjelden. Bare renten gir fradrag. Fradraget er 22 % i "
             "alminnelig inntekt uansett hvor høy marginalskatten på lønn er (manualen 16.2 og 16.4). Lønnen er støy.",
             [f"Avdrag: {kr(L15)}/15 = kr {kr(avdr15)}. Renter år 1: {kr(L15)} × 4,5 % = kr {kr(rente15)}. Termin: "
              f"kr {kr(termin15)}.",
              f"Rentefradrag: {kr(rente15)} × 22 % = kr {kr(0.22 * rente15)}.",
              f"Kostnad etter skatt: {kr(termin15)} − {kr(0.22 * rente15)} = <b>kr {kr(netto15)}</b>."],
             [(f"Kr {kr(g15_brutto)}", "terminen før fradraget."),
              (f"Kr {kr(g15_avdrag)}", f"fradrag for avdraget i stedet for renten: {kr(termin15)} − {kr(avdr15)} × 22 %. "
               f"Avdrag er ingen kostnad."),
              (f"Kr {kr(g15_474)}", f"fradraget regnet med 47,4 %, den høyeste marginalskatten på lønn: {kr(termin15)} − "
               f"{kr(rente15)} × 47,4 %.")],
             f"Avdrag pluss rente etter skatt: {kr(avdr15)} + {kr(rente15)} × 0,78 = {kr(avdr15)} + {kr(0.78 * rente15)} = "
             f"{kr(netto15)}. ✓"))
EX.append(oppgave(15, "Agnes og serielånet", "Lån", [16], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: offentlig mot privat tjenestepensjon")
p = ledd("", "<p>Åse er sykepleier i en kommune. Eskil er ingeniør i et privat selskap med innskuddspensjon. Hvilket utsagn "
             "om tjenestepensjonene deres er i tråd med pensum?</p>",
         tekst("Åses ordning er en ferdig pakke, mens Eskils avhenger av hva arbeidsgiveren hans har valgt"),
         [tekst("Eskils arbeidsgiver kan la være å ha tjenestepensjon, fordi bare offentlige arbeidsgivere er pålagt det"),
          tekst("Begge pensjonene utbetales livet ut, slik som alderspensjonen fra folketrygden"),
          tekst("Ytelsespensjon er vanligst i privat sektor, mens offentlig sektor bare bruker innskuddspensjon")],
         "<p><b>Regelen.</b> Offentlig tjenestepensjon er en ferdig pakke og utbetales livet ut. I privat sektor varierer "
         "ordningen fra bedrift til bedrift. Ni av ti har innskuddspensjon. Den utbetales som regel bare i ti år. Hybrid er "
         "vanligst i offentlig sektor (ForelesningPensjon, lysbilde 37, manualen 15.4). <b>Utsagnet om den ferdige pakken er "
         "riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bare offentlige er pålagt</b> = alle bedrifter er pålagt å ha "
         "tjenestepensjon, minst 2 % av lønn opp til 12 G.<br><b>Begge livet ut</b> = privat tjenestepensjon utbetales som "
         "regel bare i ti år.<br><b>Ytelse vanligst i privat sektor</b> = motsatt. Ni av ti i privat sektor har "
         "innskuddspensjon. I offentlig sektor er hybrid vanligst.</p>")
EX.append(oppgave(16, "Åse, Eskil og tjenestepensjonen", "Pensjon", [15], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: flokkatferd og manglende deltakelse")
felles17 = "<p>To spørsmål om investeringsatferd. Hvert spørsmål står for seg.</p>"
pa = ledd("a", "<p>I januar 2021 handlet Norwegian-aksjen rundt kr 60, mens selskapet hadde varslet en emisjon til kr 6 til "
               "10 per aksje. Kursen falt likevel ikke på flere dager. Over halvparten av eierne trodde på oppgang det neste "
               "året. Hvilket utsagn er i tråd med pensum?</p>",
          tekst("Mange fulgte flokken. Feilprisingen varte fordi aksjen var vanskelig å shorte"),
          [tekst("Kursen holdt seg fordi markedet priset all offentlig informasjon riktig"),
           tekst("Det rasjonelle for eierne var å kjøpe flere aksjer før emisjonen"),
           tekst("Eierne var tapsaverse og solgte raskt for å unngå videre tap")],
          "<p><b>Regelen.</b> Flokkatferd er å følge mengden i stedet for egen analyse. Den kan bidra til bobler og krakk "
          "(Finansiell psykologi, lysbilde 41). I Norwegian-caset var det rasjonelle å selge og eventuelt kjøpe tilbake billig "
          "i emisjonen. Feilprisingen varte fordi tre meglerhus nektet å låne ut aksjer, så aksjen var vanskelig å shorte "
          "(manualen 18.2). <b>Utsagnet om flokken og shortingen er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Markedet priset riktig</b> = en kurs på 60 mot en emisjon til 6 til 10 "
          "er det motsatte. Små markeder som er vanskelige å shorte, er mindre effisiente.<br><b>Kjøpe flere</b> = emisjonen "
          "gjorde det billigere å kjøpe senere. Det rasjonelle var å selge.<br><b>Solgte raskt</b> = de solgte ikke. Først da "
          "en ekspertvideo kom, solgte 21 % dagen etter.</p>")
pb = ledd("b", "<p>Vetle har kr 300 000 på sparekonto og eier verken aksjer eller aksjefond. Han sier at han er for "
               "risikoavers til å eie aksjer. Hvilket utsagn er i tråd med pensum?</p>",
          tekst("Risikoaversjon alene forklarer det ikke. Hindringen er heller faste kostnader og treghet"),
          [tekst("En risikoavers person bør ikke eie aksjer så lenge de er risikable"),
           tekst("Tapsaversjon trekker mot høyere aksjeandel, så forklaringen må ligge et helt annet sted"),
           tekst("Det er rasjonelt, fordi forventet avkastning på aksjer er lavere enn renten i banken")],
          "<p><b>Regelen.</b> For små beløp er nesten enhver nyttefunksjon tilnærmet lineær. Den første tusenlappen i aksjer gir "
          "en positiv forventet premie nesten uten nyttekostnad, så også en risikoavers person burde kjøpe litt. At mange ikke "
          "gjør det, peker på faste kostnader ved å komme i gang, manglende kunnskap og treghet (manualen 18.2). <b>Utsagnet om "
          "at risikoaversjon alene ikke forklarer det, er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Bør ikke eie aksjer</b> = med positiv risikopremie gir Mertons formel "
          "en positiv aksjeandel for enhver endelig risikoaversjon.<br><b>Tapsaversjon</b> = trekker mot lavere aksjeandel, "
          "ikke høyere (manualen 18.2).<br><b>Lavere enn banken</b> = aksjer har positiv forventet risikopremie i pensum.</p>")
EX.append(oppgave(17, "Norwegian-aksjen og Vetles sparekonto", "Finansiell psykologi", [18], felles17, [pa, pb]))

# ======================================================================= 18
print("\nOppgave 18: aktive fond over tid")
p = ledd("", "<p>Hallvard vil kjøpe aksjefondet som har gjort det best av alle norske fond de siste ti årene. Hvilket utsagn "
             "er i tråd med pensum?</p>",
         tekst("De 20 beste investorene på 70-tallet ble slått av markedet på 80-tallet",
               ["20", "70", "80"]),
         [tekst("Aktive fond slår i snitt indeksen etter gebyrer, men ikke før"),
          tekst("I Buffetts veddemål slo hedgefondene indeksen, fordi de kunne investere friere"),
          tekst("Survivorship bias får aktive fond til å se dårligere ut i statistikken enn de egentlig er")],
         "<p><b>Regelen.</b> Det finnes lite persistens. De 20 beste investorene på 70-tallet gjorde det dobbelt så bra som "
         "indeksen, men ble slått av markedet på 80-tallet. De beste på 80-tallet var under middels på 90-tallet "
         "(ForelesningAksjesparing, lysbilde 89 og 90). <b>Utsagnet om toppresultatene er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Etter gebyrer, men ikke før</b> = snudd. Berk og DeMarzo viser at aktive "
         "fond slår indeksen før gebyrer, men at kundene taper på grunn av gebyrene.<br><b>Buffetts veddemål</b> = indeksen "
         "steg 85 % på ti år, hedgefondene i snitt 22 %.<br><b>Survivorship bias</b> = dårlige fond legges ned, så statistikken "
         "ser bedre ut enn virkeligheten. Malkiel fant at det gjør situasjonen enda verre.</p>")
EX.append(oppgave(18, "Hallvard og vinnerfondet", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove8",
    "kind": "mock",
    "label": "Prøveeksamen 8",
    "badge": "Vanskeligere",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Vanskeligere enn prøveeksamen 1–6. Ligner H2024 og skatteteorien i forelesning 6 til 11. Teksten gir bare situasjon, tall og satser, aldri formel "
             "eller framgangsmåte. I flere regneledd står bare «Bruk skattereglene for 2026». Nytt pensum: skjerming per "
             "aksjepost ved gave, nøytralitet når bare en andel kan trekkes fra, eiendomsskatt som kapitaliseres, "
             "evneprinsippet, kilen og Mirrlees, fast driftssted og internpriser, kreditfradrag med kildeskatt, CAPM, "
             "serielån og offentlig mot privat tjenestepensjon."),
    "facts": [
        "Fire timer, kalkulator tillatt. 30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett svar, −1 for feil svar og 0 for ubesvart. Totalt 90 poeng.",
        "Oppgave 1 til 11 er skattedelen (21 ledd). Oppgave 12 til 18 er finansdelen (9 ledd).",
        "Laget for trening etter mønster fra H2024, forelesning 6 til 11 og manualen. Det er ikke en ekte eksamen. "
        "Kurset har ikke kontrollert løsningene.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene. Står det bare «Bruk skattereglene for 2026», må du kunne "
                     "satsen selv. Noen ledd har en opplysning som ikke skal brukes. I begrepsleddene avgjør ett ord, så les "
                     "«bare», «alltid» og «kan» presist. Kan du stryke ett alternativ, lønner det seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove8.json")
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
