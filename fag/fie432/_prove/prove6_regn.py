"""Prøveeksamen 6 (FIE432): regner alle tall, bygger prove6.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove6_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p6) sier,
3. skriver prove6.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p6"]
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
print("\nOppgave 1: utbytte etter eierskatt og formuesskatt over to år")
K1 = 4_000_000
D1 = [200_000, 160_000]
rs1 = [0.03, 0.02]
MV1 = [4_000_000, 5_000_000]
te1, fs1, rab1 = 0.40, 0.01, 0.80
skj1 = [K1 * r for r in rs1]
assert all(d >= s for d, s in zip(D1, skj1))           # ingen ubenyttet skjerming
skpl1 = [d - s for d, s in zip(D1, skj1)]
eier1 = [x * te1 for x in skpl1]
fsk1 = [m * rab1 * fs1 for m in MV1]
igjen1 = sum(D1) - sum(eier1) - sum(fsk1)
assert lik(igjen1, 224_000)
g1_uten_skj = sum(D1) - te1 * sum(D1) - sum(fsk1)                      # skjerming glemt
g1_uten_rab = sum(D1) - sum(eier1) - sum(m * fs1 for m in MV1)          # aksjerabatt glemt
g1_mv5_begge = sum(D1) - sum(eier1) - 2 * MV1[1] * rab1 * fs1           # 5 mill. begge år
g1_kost_begge = sum(D1) - sum(eier1) - 2 * K1 * rab1 * fs1              # (ikke brukt) kostpris begge år
print(f"   skjerming {skj1}, skattepliktig {skpl1}, eierskatt {eier1}, formuesskatt {fsk1}, igjen {igjen1}")
print(f"   gale: uten skjerming {g1_uten_skj}, uten rabatt {g1_uten_rab}, 5 mill. begge år {g1_mv5_begge}, kostpris begge år {g1_kost_begge}")
p = ledd("",
         "<p>Lise kjøpte børsnoterte aksjer for kr 4 000 000 i januar år 1 og eier dem ved utgangen av år 1 og år 2. "
         "Hun mottar kr 200 000 i utbytte i år 1 og kr 160 000 i år 2. Skjermingsrenten er 3 % i år 1 og 2 % i år 2. "
         "Markedsverdien er kr 4 000 000 ved utgangen av år 1 og kr 5 000 000 ved utgangen av år 2. Formuesskatten er "
         "1 % av formuesverdien ved utgangen av hvert år. Aksjer verdsettes til 80 %. Eierskatten er 40 % av skattepliktig "
         "utbytte. Se bort fra bunnfradrag. Hvor mye sitter Lise igjen med av utbyttene etter eierskatt og formuesskatt?</p>",
         (f"Kr {kr(igjen1)}", [kr(igjen1)]),
         [(f"Kr {kr(g1_mv5_begge)}", [kr(g1_mv5_begge)]),
          (f"Kr {kr(g1_uten_skj)}", [kr(g1_uten_skj)]),
          (f"Kr {kr(g1_uten_rab)}", [kr(g1_uten_rab)])],
         sol("Eierskatten og formuesskatten har hvert sitt grunnlag. Eierskatten treffer utbytte minus skjermingsfradrag. "
             "Skjermingen regnes av kostprisen. Formuesskatten treffer formuesverdien, altså 80 % av markedsverdien "
             "det året skatten gjelder.",
             [f"Eierskatt år 1: skjerming {kr(K1)} × 3 % = {kr(skj1[0])}. Skattepliktig {kr(D1[0])} − {kr(skj1[0])} = {kr(skpl1[0])}. "
              f"Skatt {kr(skpl1[0])} × 40 % = {kr(eier1[0])}. Utbyttet er større enn skjermingen, så ingenting framføres.",
              f"Eierskatt år 2: skjerming {kr(K1)} × 2 % = {kr(skj1[1])}. Skattepliktig {kr(D1[1])} − {kr(skj1[1])} = {kr(skpl1[1])}. "
              f"Skatt {kr(eier1[1])}. Samlet eierskatt {kr(sum(eier1))}.",
              f"Formuesskatt: {kr(MV1[0])} × 80 % × 1 % = {kr(fsk1[0])} i år 1 og {kr(MV1[1])} × 80 % × 1 % = {kr(fsk1[1])} i år 2, "
              f"til sammen {kr(sum(fsk1))}. Igjen: {kr(sum(D1))} − {kr(sum(eier1))} − {kr(sum(fsk1))} = <b>kr {kr(igjen1)}</b>."],
             [(f"Kr {kr(g1_mv5_begge)}", f"formuesskatten regnet av {kr(MV1[1])} begge år, til sammen {kr(2 * MV1[1] * rab1 * fs1)}. "
               f"I år 1 er markedsverdien {kr(MV1[0])}."),
              (f"Kr {kr(g1_uten_skj)}", f"skjermingen glemt: 40 % av hele utbyttet på {kr(sum(D1))} gir {kr(te1 * sum(D1))} i eierskatt."),
              (f"Kr {kr(g1_uten_rab)}", f"aksjerabatten glemt: formuesskatt {kr(MV1[0] * fs1)} + {kr(MV1[1] * fs1)} = "
               f"{kr(sum(m * fs1 for m in MV1))}.")],
             f"Samlet skatt er {kr(sum(eier1))} + {kr(sum(fsk1))} = {kr(sum(eier1) + sum(fsk1))}, altså "
             f"{pst((sum(eier1) + sum(fsk1)) / sum(D1), 1)} av utbyttene. {kr(sum(D1))} − {kr(sum(eier1) + sum(fsk1))} = {kr(igjen1)}. ✓",
             "Regn de to skattene hver for seg før du ser på alternativene. Tre av alternativene er korrekte regnestykker "
             "med nøyaktig ett ledd feil, så et halvferdig svar treffer nesten alltid et galt alternativ."))
EX.append(oppgave(1, "Utbytte etter eierskatt og formuesskatt over to år", "Aksjonærmodellen", [5, 7], "", [p]))

# ======================================================================= 2
print("\nOppgave 2: nettoformue med gjeld fordelt på bolig og aksjefond")
bolig2, fond2, gjeld2 = 9_000_000, 3_000_000, 3_000_000
fv2 = bolig2 * 0.25 + fond2 * 0.80
andel_b2 = bolig2 / (bolig2 + fond2)
gj_b2 = gjeld2 * andel_b2
gj_f2 = gjeld2 - gj_b2
fradr2 = gj_b2 + gj_f2 * 0.80
netto2 = fv2 - fradr2
assert lik(netto2, 1_800_000)
# kontroll med formelen i skatteloven § 4-19
assert lik(gjeld2 * (1 - fond2 * 0.20 / (bolig2 + fond2)), fradr2)
g2_uten_red = fv2 - gjeld2
g2_alt_red = fv2 - gjeld2 * 0.80
g2_bolig_red = fv2 - (gj_b2 * 0.25 + gj_f2 * 0.80)
print(f"   formuesverdi {fv2}, gjeld bolig {gj_b2} fond {gj_f2}, fradrag {fradr2}, netto {netto2}")
print(f"   gale: uten reduksjon {g2_uten_red}, all gjeld redusert {g2_alt_red}, boliggjeld redusert 75 % {g2_bolig_red}")
p = ledd("",
         "<p>Tor er enslig og eier en primærbolig med markedsverdi kr 9 000 000 og et aksjefond med markedsverdi kr 3 000 000. "
         "Gjelden hans er kr 3 000 000. Boligen verdsettes til 25 % og fondet til 80 %. Gjelden fordeles forholdsmessig etter "
         "markedsverdiene. Gjeld som faller på fondet, reduseres med 20 %. Gjeld som faller på boligen, reduseres ikke. "
         "Se bort fra bunnfradrag. Hva er Tors skattepliktige nettoformue?</p>",
         (f"Kr {kr(netto2)}", [kr(netto2)]),
         [(f"Kr {kr(g2_uten_red)}", [kr(g2_uten_red)]),
          (f"Kr {kr(g2_bolig_red)}", [kr(g2_bolig_red)]),
          (f"Kr {kr(g2_alt_red)}", [kr(g2_alt_red)])],
         sol("Gjelden fordeles etter markedsverdi. Bare gjelden som faller på aksjefondet, reduseres med rabatten. "
             "Primærboligens rabatt gjelder verdien, ikke gjelden.",
             [f"Formuesverdi: {kr(bolig2)} × 25 % + {kr(fond2)} × 80 % = {kr(bolig2 * 0.25)} + {kr(fond2 * 0.8)} = {kr(fv2)}.",
              f"Gjeld: boligen har {pst(andel_b2, 0)} av markedsverdien og får {kr(gj_b2)}. Fondet får {kr(gj_f2)}, redusert til "
              f"{kr(gj_f2)} × 80 % = {kr(gj_f2 * 0.8)}. Fradragsberettiget gjeld {kr(fradr2)}.",
              f"Nettoformue: {kr(fv2)} − {kr(fradr2)} = <b>kr {kr(netto2)}</b>."],
             [(f"Kr {kr(g2_uten_red)}", f"gjelden trukket fra uten reduksjon: {kr(fv2)} − {kr(gjeld2)}."),
              (f"Kr {kr(g2_bolig_red)}", f"boliggjelden redusert med boligens rabatt på 75 %: bare {kr(gj_b2 * 0.25)} + "
               f"{kr(gj_f2 * 0.8)} i gjeldsfradrag."),
              (f"Kr {kr(g2_alt_red)}", f"hele gjelden redusert med 20 %, også boligdelen: {kr(fv2)} − {kr(gjeld2 * 0.8)}.")],
             f"Reduksjonen er {kr(gj_f2)} × 20 % = {kr(gj_f2 * 0.2)}, så nettoformuen skal ligge {kr(gj_f2 * 0.2)} over "
             f"svaret uten reduksjon: {kr(g2_uten_red)} + {kr(gj_f2 * 0.2)} = {kr(netto2)}. ✓",
             f"Reduksjonen gjelder bare fondsdelen av gjelden ({kr(gj_f2)}). Den kan derfor ikke løfte nettoformuen mer enn "
             f"{kr(gj_f2 * 0.2)} over {kr(g2_uten_red)}. Det stryker de to høyeste alternativene."))
EX.append(oppgave(2, "Nettoformue med gjeld fordelt på bolig og aksjefond", "Formuesskatt", [7], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: formuesskatt på en utleieleilighet som avkastningsskatt")
W3, CF3, tw3 = 5_000_000, 150_000, 0.01
fs3 = W3 * tw3
r_for3 = CF3 / W3
r_etter3 = (CF3 - fs3) / W3
assert lik(r_etter3, 0.02)
g3a_for = r_for3
g3a_rab = (CF3 - W3 * 0.8 * tw3) / W3
g3a_to = (CF3 - 2 * fs3) / W3
t3 = fs3 / CF3
assert lik(t3, tw3 / r_for3)
g3b_slutt = W3 * (1 + r_for3) * tw3 / CF3
g3b_etter = fs3 / (CF3 - fs3)
g3b_rab = W3 * 0.8 * tw3 / CF3
CF3c = 75_000
t3c = fs3 / CF3c
g3c_snudd = t3 / 2
print(f"   fs {fs3}, r før {r_for3}, r etter {r_etter3}, t {t3}, gale a {g3a_rab}, {g3a_to}; gale b slutt {g3b_slutt}, "
      f"etter {g3b_etter}, rab {g3b_rab}; c: t {t3c}, snudd {g3c_snudd}")
felles3 = ("<p>Anders kjøper en utleieleilighet, som er en sekundærbolig, for kr 5 000 000 ved periodens begynnelse. "
           "Leiligheten gir kr 150 000 i netto leieinntekt ved periodens slutt. Da selges den for kr 5 000 000. "
           "Sekundærboliger verdsettes til 100 % av markedsverdien. Formuesskatten er 1 % og faller på formuesverdien "
           "ved periodens begynnelse. Se bort fra skatt på leieinntekten og bunnfradrag.</p>")
pa = ledd("a", "<p>Hva er avkastningen på investeringen etter formuesskatt?</p>",
          (pst(r_etter3), [pst(r_etter3)]),
          [(pst(g3a_for), [pst(g3a_for)]), (pst(g3a_rab), [pst(g3a_rab)]), (pst(g3a_to), [pst(g3a_to)])],
          sol("Formuesskatten trekkes fra kontantstrømmen: avkastning etter formuesskatt = (CF − τW)/W = r − τ. "
              "En sekundærbolig har ingen verdsettingsrabatt.",
              [f"Formuesskatt: {kr(W3)} × 100 % × 1 % = {kr(fs3)}.",
               f"Kontantstrøm etter formuesskatt: {kr(CF3)} − {kr(fs3)} = {kr(CF3 - fs3)}.",
               f"Avkastning: {kr(CF3 - fs3)}/{kr(W3)} = <b>{pst(r_etter3)}</b>."],
              [(pst(g3a_for), "avkastningen før formuesskatt, {}/{}.".format(kr(CF3), kr(W3))),
               (pst(g3a_rab), f"aksjerabatten på 20 % brukt på en bolig: formuesskatt {kr(W3 * 0.8 * tw3)} i stedet for {kr(fs3)}."),
               (pst(g3a_to), "formuesskatten trukket fra to ganger.")],
              f"r − τ = {pst(r_for3)} − 1,00 % = {pst(r_etter3)}. ✓"))
pb = ledd("b", "<p>Hvor høy måtte en skatt t på leieinntekten vært for å gi staten samme proveny som formuesskatten? "
               "Svar med to desimaler.</p>",
          (pst(t3), [pst(t3)]),
          [(pst(g3b_slutt), [pst(g3b_slutt)]), (pst(g3b_etter), [pst(g3b_etter)]), (pst(g3b_rab), [pst(g3b_rab)])],
          sol("Sett provenyene like: τ × W = t × CF, altså t = τW/CF = τ/r når skatten faller på formuen ved periodens begynnelse.",
              [f"Formuesskattens proveny: {kr(fs3)}.",
               f"Skatt på leieinntekten: {kr(CF3)} × t.",
               f"t = {kr(fs3)}/{kr(CF3)} = <b>{pst(t3)}</b>, det samme som 1 %/3 %."],
              [(pst(g3b_slutt), f"formuesskatten lagt på formuen ved periodens slutt: {kr(W3 + CF3)} × 1 % = {kr((W3 + CF3) * tw3)} "
                f"delt på {kr(CF3)}. Teksten sier periodens begynnelse."),
               (pst(g3b_etter), f"delt på leieinntekten etter formuesskatt: {kr(fs3)}/{kr(CF3 - fs3)}."),
               (pst(g3b_rab), f"aksjerabatten brukt: {kr(W3 * 0.8 * tw3)}/{kr(CF3)}.")],
              f"{kr(CF3)} × {pst(t3)} = {kr(CF3 * t3)}, som er formuesskatten. ✓ Samme tall som i a: avkastningen falt fra 3 % "
              f"til 2 %, altså med en tredel."))
pc = ledd("c", "<p>Anta i stedet at netto leieinntekt bare er kr 75 000, mens leiligheten fortsatt er verdt kr 5 000 000. "
               "Hvilket utsagn er riktig?</p>",
          (f"Formuesskatten er fortsatt kr {kr(fs3)} og tilsvarer nå en avkastningsskatt på {pst(t3c)}", [kr(fs3), pst(t3c)]),
          [(f"Formuesskatten halveres til kr {kr(fs3 / 2)}, fordi leieinntekten er halvert", [kr(fs3 / 2)]),
           (f"Formuesskatten er fortsatt kr {kr(fs3)} og tilsvarer fortsatt en avkastningsskatt på {pst(t3)}", [kr(fs3), pst(t3)]),
           (f"Formuesskatten er fortsatt kr {kr(fs3)} og tilsvarer nå en avkastningsskatt på {pst(g3c_snudd)}", [kr(fs3), pst(g3c_snudd)])],
          sol("Formuesskatten avhenger av formuen, ikke av avkastningen. Den ekvivalente avkastningsskatten t = τ/r stiger "
              "derfor når avkastningen faller.",
              [f"Formuesskatt: {kr(W3)} × 1 % = {kr(fs3)}, som før.",
               f"Avkastning før skatt: {kr(CF3c)}/{kr(W3)} = {pst(CF3c / W3)}.",
               f"t = {kr(fs3)}/{kr(CF3c)} = 1 %/1,5 % = <b>{pst(t3c)}</b>."],
              [(f"Halveres til kr {kr(fs3 / 2)}", "behandler formuesskatten som en skatt på avkastningen. Den er en skatt på formuen."),
               (f"Fortsatt {pst(t3)}", "glemmer at den samme skatten nå tas av en halvert avkastning."),
               (pst(g3c_snudd), "snur sammenhengen. Halvert avkastning dobler den ekvivalente satsen.")],
              f"{kr(CF3c)} × {pst(t3c)} = {kr(CF3c * t3c)}. ✓ Det er dette forelesningen mener med at formuesskatten "
              "ikke spør om det er noe å skatte av."))
EX.append(oppgave(3, "Formuesskatt på en utleieleilighet som avkastningsskatt", "Formuesskatt som avkastningsskatt",
                  [8, 4], felles3, [pa, pb, pc]))

# ======================================================================= 4
print("\nOppgave 4: ubenyttet skjerming fra et år uten utbytte")
K4, D4 = 60_000, 5_000
r4 = [0.03, 0.04]
ub4 = K4 * r4[0]
grl4 = K4 + ub4
aar4 = grl4 * r4[1]
samlet4 = aar4 + ub4
skpl4 = D4 - samlet4
assert lik(skpl4, 728)
g4_ikke_trukket = D4 - aar4
g4_ikke_grunnlag = D4 - K4 * r4[1] - ub4
g4_glemt = D4 - K4 * r4[1]
print(f"   ubenyttet {ub4}, grunnlag {grl4}, årets {aar4}, samlet {samlet4}, skattepliktig {skpl4}")
print(f"   gale: ikke trukket fra {g4_ikke_trukket}, ikke lagt til grunnlag {g4_ikke_grunnlag}, glemt {g4_glemt}")
p = ledd("",
         "<p>Hanne kjøpte én aksje i Kystnett ASA for kr 60 000 den 20. november år 1. Hun eier aksjen ved utgangen av år 1 "
         "og år 2. Selskapet betaler ikke utbytte i år 1. I år 2 mottar hun kr 5 000 i utbytte. Skjermingsrenten er 3 % i år 1 "
         "og 4 % i år 2. Hva er skattepliktig utbytte i år 2, før oppjustering?</p>",
         (f"Kr {kr(skpl4)}", [kr(skpl4)]),
         [(f"Kr {kr(g4_ikke_trukket)}", [kr(g4_ikke_trukket)]),
          (f"Kr {kr(g4_ikke_grunnlag)}", [kr(g4_ikke_grunnlag)]),
          (f"Kr {kr(g4_glemt)}", [kr(g4_glemt)])],
         sol("Skjermingen tilfaller den som eier aksjen 31. desember, uansett når i året den ble kjøpt. Ubenyttet skjerming "
             "legges til neste års grunnlag og trekkes i tillegg fra neste års utbytte.",
             [f"År 1: {kr(K4)} × 3 % = {kr(ub4)}. Ingen utbytte, så alt framføres.",
              f"År 2: grunnlag {kr(K4)} + {kr(ub4)} = {kr(grl4)}, årets fradrag {kr(grl4)} × 4 % = {kr(aar4)}. "
              f"Samlet fradrag {kr(aar4)} + {kr(ub4)} = {kr(samlet4)}.",
              f"Skattepliktig utbytte: {kr(D4)} − {kr(samlet4)} = <b>kr {kr(skpl4)}</b>."],
             [(f"Kr {kr(g4_ikke_trukket)}", f"den ubenyttede skjermingen er lagt til grunnlaget, men ikke trukket fra: {kr(D4)} − {kr(aar4)}."),
              (f"Kr {kr(g4_ikke_grunnlag)}", f"den er trukket fra, men ikke lagt til grunnlaget: {kr(D4)} − {kr(K4 * r4[1])} − {kr(ub4)}."),
              (f"Kr {kr(g4_glemt)}", f"ingen skjerming i år 1 fordi aksjen ble kjøpt i november, eller framføringen glemt: "
               f"{kr(D4)} − {kr(K4 * r4[1])}.")],
             f"La grunnlaget vokse: {kr(K4)} × 1,03 × 1,04 = {kr(K4 * 1.03 * 1.04)}. Skjerming til disposisjon i år 2 er "
             f"{kr(K4 * 1.03 * 1.04 - K4)}, som er {kr(ub4)} + {kr(aar4)}. ✓"))
EX.append(oppgave(4, "Ubenyttet skjerming fra et år uten utbytte", "Skjerming", [5], "", [p]))

# ======================================================================= 5
print("\nOppgave 5: effektiv skattesats med avskrivning")
inn5, kost5, maskin5, ta5 = 800_000, 300_000, 600_000, 0.22
avskr5 = maskin5 / 3
for_avskr5 = inn5 - kost5
skatt5 = (for_avskr5 - avskr5) * ta5
eff5 = skatt5 / for_avskr5
assert lik(eff5, 0.132)
g5_skpl = skatt5 / (for_avskr5 - avskr5)
g5_inn = skatt5 / inn5
g5_reduksjon = ta5 * avskr5 / for_avskr5        # hvor mye avskrivningen senker satsen, ikke satsen
print(f"   før avskrivning {for_avskr5}, skatt {skatt5}, effektiv {eff5}; gale {g5_skpl}, {g5_inn}, {g5_reduksjon}")
p = ledd("",
         "<p>Vestland Verksted AS har i år 1 driftsinntekter på kr 800 000 og lønns- og driftskostnader på kr 300 000. "
         "Selskapet kjøper en maskin for kr 600 000 som avskrives med kr 200 000 per år i tre år. Selskapsskatten er 22 %. "
         "Effektiv skattesats er betalt skatt delt på overskuddet før avskrivning. Hva er den effektive skattesatsen i år 1? "
         "Svar med én desimal.</p>",
         (pst(eff5, 1), [pst(eff5, 1)]),
         [(pst(g5_skpl, 1), [pst(g5_skpl, 1)]), (pst(g5_inn, 1), [pst(g5_inn, 1)]), (pst(g5_reduksjon, 1), [pst(g5_reduksjon, 1)])],
         sol("Effektiv skattesats er betalt skatt delt på et bruttomål, her overskuddet før avskrivning. Avskrivningen er "
             "ingen utbetaling i året og trekker den effektive satsen under 22 %.",
             [f"Overskudd før avskrivning: {kr(inn5)} − {kr(kost5)} = {kr(for_avskr5)}.",
              f"Skattepliktig overskudd {kr(for_avskr5)} − {kr(avskr5)} = {kr(for_avskr5 - avskr5)}, skatt {kr(skatt5)}.",
              f"Effektiv sats: {kr(skatt5)}/{kr(for_avskr5)} = <b>{pst(eff5, 1)}</b>."],
             [(pst(g5_skpl, 1), "skatten delt på skattepliktig overskudd. Det gir alltid den nominelle satsen tilbake."),
              (pst(g5_inn, 1), f"delt på driftsinntektene: {kr(skatt5)}/{kr(inn5)}. Oppgaven definerer nevneren som overskuddet før avskrivning."),
              (pst(g5_reduksjon, 1), f"skattebesparelsen fra avskrivningen delt på nevneren: {kr(avskr5 * ta5)}/{kr(for_avskr5)}. "
               "Det er hvor mange prosentpoeng avskrivningen senker satsen med, ikke selve satsen.")],
             f"22 % × (1 − {kr(avskr5)}/{kr(for_avskr5)}) = 22 % × 0,6 = {pst(0.22 * 0.6, 1)}. ✓",
             "Bare 22 % kan strykes uten regning. Resten skilles av nevneren. Bruk den oppgaven definerer. Sjekk også at "
             "du har regnet satsen og ikke reduksjonen."))
EX.append(oppgave(5, "Effektiv skattesats når en maskin avskrives", "Effektiv skattesats", [1], "", [p]))

# ======================================================================= 6
print("\nOppgave 6: utbytte til formuesskatten når skjermingen hjelper")
FV6, rab6, tw6, te6, K6, rs6 = 3_750_000, 0.80, 0.01, 0.40, 500_000, 0.03
F6 = FV6 * rab6 * tw6
S6 = K6 * rs6
D6 = (F6 - S6 * te6) / (1 - te6)
assert lik(D6, 40_000)
assert lik(D6 - (D6 - S6) * te6, F6)
g6_uten_skj = F6 / (1 - te6)
g6_oppaa = F6 * (1 + te6)
g6_uten_rab = (FV6 * tw6 - S6 * te6) / (1 - te6)
print(f"   F {F6}, S {S6}, D {D6}; gale uten skjerming {g6_uten_skj}, oppå {g6_oppaa}, uten rabatt {g6_uten_rab}")
p = ledd("",
         "<p>Siri eier alle aksjene i Fjellstue AS. Aksjene har formuesverdi kr 3 750 000 før rabatt og verdsettes til 80 %. "
         "Formuesskatten er 1 %. Se bort fra bunnfradrag. Siri har ingen kontanter og må ta et utbytte som dekker både "
         "formuesskatten og eierskatten på utbyttet. Eierskatten er 40 % av skattepliktig utbytte. Kostprisen er kr 500 000 "
         "og skjermingsrenten 3 %. Hun har ingen ubenyttet skjerming og eier aksjene ved årets utgang. Hvor stort utbytte må hun ta?</p>",
         (f"Kr {kr(D6)}", [kr(D6)]),
         [(f"Kr {kr(g6_uten_skj)}", [kr(g6_uten_skj)]),
          (f"Kr {kr(g6_oppaa)}", [kr(g6_oppaa)]),
          (f"Kr {kr(g6_uten_rab)}", [kr(g6_uten_rab)])],
         sol("Utbyttet D må etter eierskatt dekke formuesskatten F. Skjermingen S tar en del av utbyttet ut av grunnlaget: "
             "D − (D − S) × t<sub>e</sub> = F, altså D = (F − S × t<sub>e</sub>)/(1 − t<sub>e</sub>).",
             [f"Formuesskatt: {kr(FV6)} × 80 % × 1 % = {kr(F6)}.",
              f"Skjerming: {kr(K6)} × 3 % = {kr(S6)}. Den sparer {kr(S6)} × 40 % = {kr(S6 * te6)} i eierskatt.",
              f"D = ({kr(F6)} − {kr(S6 * te6)})/0,6 = <b>kr {kr(D6)}</b>."],
             [(f"Kr {kr(g6_uten_skj)}", f"skjermingen glemt: {kr(F6)}/0,6."),
              (f"Kr {kr(g6_oppaa)}", f"skatten lagt oppå: {kr(F6)} × 1,4. Kontroller: etter eierskatt gir det "
               f"{kr(g6_oppaa - (g6_oppaa - S6) * te6)}, ikke {kr(F6)}."),
              (f"Kr {kr(g6_uten_rab)}", f"aksjerabatten glemt: formuesskatt {kr(FV6 * tw6)} i stedet for {kr(F6)}.")],
             f"Eierskatt ({kr(D6)} − {kr(S6)}) × 40 % = {kr((D6 - S6) * te6)}. Igjen {kr(D6)} − {kr((D6 - S6) * te6)} = "
             f"{kr(D6 - (D6 - S6) * te6)}, nøyaktig formuesskatten. ✓"))
EX.append(oppgave(6, "Utbytte til formuesskatten når skjermingen hjelper", "Formuesskatt som avkastningsskatt", [8, 5], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: gjeld, egenkapital og rentebegrensning")
r7, t7 = 0.06, 0.25
FE7 = r7 / (1 - t7)
assert lik(FE7, 0.08)
g7_etter = r7 * (1 - t7)
g7_oppaa = r7 * (1 + t7)
A7 = 0.5
FG7_A = r7 * (1 - A7 * t7) / (1 - t7)
assert r7 < FG7_A < FE7
print(f"   F'E {FE7}, gale {r7}, {g7_etter}, {g7_oppaa}; kontroll F'G med A = 0,5: {FG7_A}")
felles7 = ("<p>En bedrift har inntekten F(K), der F′(K) &gt; 0 og F″(K) &lt; 0. Kapitalen K = G + E finansieres med "
           "gjeld G og egenkapital E. Lånerenten og eiernes alternativkostnad er begge r = 6 %. Gjeldsrentene er "
           "fradragsberettiget, men eiernes alternativkostnad gir ikke fradrag. Skattesatsen på overskuddet er t = 25 %.</p>")
pa = ledd("a", "<p>Hvilket marginalprodukt F′<sub>E</sub> krever bedriften av kapital finansiert med egenkapital?</p>",
          (pst(FE7), [pst(FE7)]),
          [(pst(r7), [pst(r7)]), (pst(g7_etter), [pst(g7_etter)]), (pst(g7_oppaa), [pst(g7_oppaa)])],
          sol("For egenkapital beskattes inntekten uten at alternativkostnaden gir fradrag: ∂V/∂E = F′<sub>E</sub> − r − tF′<sub>E</sub> = 0, "
              "altså F′<sub>E</sub> = r/(1 − t). For gjeld stryker skatten seg: F′<sub>G</sub> = r.",
              [f"F′<sub>E</sub>(1 − t) = r.",
               f"F′<sub>E</sub> = 6 %/0,75 = <b>{pst(FE7)}</b>."],
              [(pst(r7), "kravet til gjeldsfinansiert kapital, F′<sub>G</sub> = r."),
               (pst(g7_etter), "r(1 − t), en kostnad etter skatt sammenlignet med et marginalprodukt før skatt."),
               (pst(g7_oppaa), "r(1 + t), skatten lagt oppå i stedet for å dele på (1 − t).")],
              f"{pst(FE7)} før skatt gir {pst(FE7)} × 0,75 = {pst(FE7 * 0.75)} etter skatt, nøyaktig alternativkostnaden. ✓ "
              "Siden F′<sub>E</sub> &gt; F′<sub>G</sub> og F er konkav, blir E* &lt; G*."))
pb = ledd("b", "<p>Myndighetene innfører en rentebegrensning: bare andelen A av gjeldsrentene kan trekkes fra, der 0 &lt; A &lt; 1. "
               "Hvilke førsteordensbetingelser gjelder nå?</p>",
          ("F′<sub>G</sub> = r(1 − At)/(1 − t) og F′<sub>E</sub> = r/(1 − t)", ["1", "1", "1"]),
          [("F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)", ["1"]),
           ("F′<sub>G</sub> = rA/(1 − t) og F′<sub>E</sub> = r(1 − At)/(1 − t)", ["1", "1", "1"]),
           ("F′<sub>G</sub> = r(1 − At)/(1 − t) og F′<sub>E</sub> = r(1 − At)/(1 − t)", ["1", "1", "1", "1"])],
          sol("Skriv verdien med begrensningen: V = F(G + E) − r(G + E) − t[F(G + E) − A·rG]. Bare gjeldsleddet endres.",
              ["∂V/∂G = F′ − r − t(F′ − Ar) = 0 gir F′(1 − t) = r(1 − At), altså F′<sub>G</sub> = r(1 − At)/(1 − t).",
               "∂V/∂E = F′ − r − tF′ = 0 gir som før F′<sub>E</sub> = r/(1 − t).",
               f"Med A = 0,5 blir F′<sub>G</sub> = 6 % × 0,875/0,75 = {pst(FG7_A)}, mellom 6 % og 8 %."],
              [("F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)", "rentebegrensningen er oversett. Gjelder bare når A = 1."),
               ("F′<sub>G</sub> = rA/(1 − t) og F′<sub>E</sub> = r(1 − At)/(1 − t)", "uttrykkene for gjeld og egenkapital byttet om, "
                "med teller og nevner snudd for gjelden. F′<sub>G</sub> = rA/(1 − t) gir null krav når A = 0, der kravet skal være "
                "r/(1 − t). Egenkapitalen har ingen renter, så A kan ikke stå i F′<sub>E</sub>."),
               ("Samme uttrykk for begge", "A brukt også på egenkapitalen, men egenkapitalen har ingen renter å begrense.")],
              "Grensetesten: med A = 1 skal F′<sub>G</sub> bli r. Med A = 0 skal gjeld bli like dyr som egenkapital, "
              "r/(1 − t). Bare det riktige alternativet består begge. ✓",
              "Grensetesten stryker to alternativer på sekunder. Da lønner det seg å svare."))
EX.append(oppgave(7, "Gjeld, egenkapital og rentebegrensning", "Bedriftens tilpasning", [9], felles7, [pa, pb]))

# ======================================================================= 8
print("\nOppgave 8: stykkskatt med grensetilfeller og lineære kurver")
P0, t8 = 40, 6
# a) perfekt uelastisk tilbud: produsentene bærer alt
p8a = P0 - t8
# b) perfekt elastisk tilbud ved 40: konsumentene bærer alt
P8b = P0 + t8
# c) x = 1000 − 10P, x = 20p − 200, P = p + t
a_d, b_d, a_s, b_s = 1000, 10, -200, 20
assert lik(a_d - b_d * P0, a_s + b_s * P0)                       # likevekt før skatt i 40
p8c = (a_d - b_d * t8 - a_s) / (b_d + b_s)
P8c = p8c + t8
x8c = a_d - b_d * P8c
assert lik(x8c, a_s + b_s * p8c) and lik(P8c, 44)
dPdt = b_s / (b_s + b_d)
assert lik(P0 + dPdt * t8, P8c)
g8c_byttet = P0 + (b_d / (b_s + b_d)) * t8
print(f"   a: p = {p8a}; b: P = {P8b}; c: p = {p8c}, P = {P8c}, x = {x8c}, konsumentandel {dPdt}, byttet {g8c_byttet}")
felles8 = ("<p>I et marked med frikonkurranse er likevektsprisen kr 40 per enhet. Myndighetene innfører en stykkskatt på "
           "kr 6 per enhet som kreves inn fra produsentene. La P være prisen konsumentene betaler og p prisen produsentene "
           "sitter igjen med, slik at P = p + 6.</p>")
pa = ledd("a", "<p>Anta at tilbudet er perfekt uelastisk (loddrett tilbudskurve), mens etterspørselen er fallende. "
               "Hvilken pris p sitter produsentene igjen med etter skatten?</p>",
          (f"kr {kr(p8a)}", [kr(p8a)]),
          [(f"kr {kr(P0)}", [kr(P0)]), (f"kr {kr(P0 + t8)}", [kr(P0 + t8)]), (f"kr {kr(P0 - t8 / 2)}", [kr(P0 - t8 / 2)])],
          sol("Den minst elastiske siden bærer skatten. Med loddrett tilbud er kvantum gitt. Konsumentprisen kan ikke stige, "
              "for da ville konsumentene kjøpe mindre enn det som tilbys. Med S′ = 0 er ∂p/∂t = −1.",
              [f"Konsumentprisen blir stående på kr {kr(P0)}.",
               f"p = P − t = {kr(P0)} − {kr(t8)} = <b>kr {kr(p8a)}</b>."],
              [(f"kr {kr(P0)}", "konsumentprisen, ikke produsentprisen."),
               (f"kr {kr(P0 + t8)}", "konsumentprisen hvis konsumentene bar alt. Det gjelder uelastisk etterspørsel eller vannrett tilbud."),
               (f"kr {kr(P0 - t8 / 2)}", "skatten delt likt. Det krever like bratte kurver.")],
              f"∂P/∂t − ∂p/∂t = 0 − (−1) = 1. Prisgapet er {kr(P0)} − {kr(p8a)} = {kr(t8)}. ✓"))
pb = ledd("b", "<p>Anta i stedet at tilbudet er perfekt elastisk (vannrett ved kr 40), mens etterspørselen er fallende. "
               "Hvilken pris P betaler konsumentene etter skatten?</p>",
          (f"kr {kr(P8b)}", [kr(P8b)]),
          [(f"kr {kr(P0)}", [kr(P0)]), (f"kr {kr(P0 - t8)}", [kr(P0 - t8)]), (f"kr {kr(P0 + t8 / 2)}", [kr(P0 + t8 / 2)])],
          sol("Med vannrett tilbud selger ingen produsent for mindre enn kr 40. Produsentprisen ligger fast. Hele skatten "
              "veltes over på konsumentene: ∂P/∂t = 1.",
              [f"p = kr {kr(P0)}.",
               f"P = p + t = {kr(P0)} + {kr(t8)} = <b>kr {kr(P8b)}</b>."],
              [(f"kr {kr(P0)}", "produsentprisen, eller prisen før skatt."),
               (f"kr {kr(P0 - t8)}", "byttet om: det er produsentprisen når tilbudet er loddrett, som i a."),
               (f"kr {kr(P0 + t8 / 2)}", "skatten delt likt.")],
              "Kvantum faller langs etterspørselskurven, men prisen produsentene får er uendret. Den elastiske siden slipper unna. ✓"))
pc = ledd("c", "<p>Anta nå at etterspørselen er x = 1 000 − 10P og tilbudet x = 20p − 200, der x er kvantum. "
               "Hvilken pris P betaler konsumentene etter skatten?</p>",
          (f"kr {kr(P8c)}", [kr(P8c)]),
          [(f"kr {kr(p8c)}", [kr(p8c)]), (f"kr {kr(g8c_byttet - t8)}", [kr(g8c_byttet - t8)]), (f"kr {kr(g8c_byttet)}", [kr(g8c_byttet)])],
          sol("Sett inn P = p + 6 og løs likevekten. Andelen konsumentene bærer, er ∂P/∂t = S′/(S′ − D′).",
              [f"1 000 − 10(p + 6) = 20p − 200 gir 1 140 = 30p, altså p = {kr(p8c)}.",
               f"P = {kr(p8c)} + {kr(t8)} = <b>kr {kr(P8c)}</b>.",
               f"Kvantum: 1 000 − 10 × {kr(P8c)} = {kr(x8c)} = 20 × {kr(p8c)} − 200."],
              [(f"kr {kr(p8c)}", "produsentprisen."),
               (f"kr {kr(g8c_byttet - t8)}", f"produsentprisen som hører til feilen under: {kr(g8c_byttet)} − {kr(t8)}."),
               (f"kr {kr(g8c_byttet)}", f"helningene byttet om: konsumentandelen satt til 10/30 i stedet for 20/30.")],
              f"S′/(S′ − D′) = 20/(20 + 10) = 2/3. Konsumentprisen stiger med 2/3 × {kr(t8)} = {kr(dPdt * t8)}, "
              f"fra {kr(P0)} til {kr(P8c)}. ✓"))
EX.append(oppgave(8, "Stykkskatt: grensetilfeller og lineære kurver", "Skatteincidens", [11], felles8, [pa, pb, pc]))

# ======================================================================= 9
print("\nOppgave 9: aksjesalg med framført skjerming")
K9, ub9, salg9, rs9 = 250_000, 12_000, 310_000, 0.04
gev9 = salg9 - K9 - ub9
skatt9 = gev9 * TE
assert lik(skatt9, 18_163.2)
g9_salgsaar = (gev9 - (K9 + ub9) * rs9) * TE
g9_uten_oppj = gev9 * 0.22
g9_salgsaar_uten_oppj = (gev9 - (K9 + ub9) * rs9) * 0.22   # salgsårsfella og glemt oppjustering
g9_glemt = (salg9 - K9) * TE                           # nevnes i løsningen
print(f"   gevinst {gev9}, skatt {skatt9}; gale salgsår {g9_salgsaar}, uten oppj {g9_uten_oppj}, salgsår uten oppj {g9_salgsaar_uten_oppj}, glemt {g9_glemt}")
p = ledd("",
         "<p>Petter kjøpte aksjer for kr 250 000 og har kr 12 000 i ubenyttet skjerming framført fra tidligere år. "
         "I oktober år 3 selger han alle aksjene for kr 310 000. Skjermingsrenten for år 3 er 4 %. Eierskatten er "
         "gevinsten ganget med oppjusteringsfaktoren 1,72 og deretter med 22 %. Hvor mye skatt betaler Petter på gevinsten? "
         "Svar med to desimaler.</p>",
         (f"Kr {kr(skatt9, 2)}", [kr(skatt9, 2)]),
         [(f"Kr {kr(g9_salgsaar, 2)}", [kr(g9_salgsaar, 2)]),
          (f"Kr {kr(g9_uten_oppj, 2)}", [kr(g9_uten_oppj, 2)]),
          (f"Kr {kr(g9_salgsaar_uten_oppj, 2)}", [kr(g9_salgsaar_uten_oppj, 2)])],
         sol("Skattepliktig gevinst = salgspris − inngangsverdi − framført ubenyttet skjerming. I salgsåret gis ingen ny "
             "skjerming når aksjen er solgt før 31. desember. Gevinsten oppjusteres én gang.",
             [f"Gevinst: {kr(salg9)} − {kr(K9)} − {kr(ub9)} = {kr(gev9)}.",
              f"Oppjustert: {kr(gev9)} × 1,72 = {kr(gev9 * 1.72)}.",
              f"Skatt: {kr(gev9 * 1.72)} × 22 % = <b>kr {kr(skatt9, 2)}</b>."],
             [(f"Kr {kr(g9_salgsaar, 2)}", f"skjerming også for salgsåret: ({kr(K9)} + {kr(ub9)}) × 4 % = {kr((K9 + ub9) * rs9)} "
               "trukket fra. Petter eier ikke aksjene 31. desember i år 3."),
              (f"Kr {kr(g9_uten_oppj, 2)}", f"oppjusteringen glemt: {kr(gev9)} × 22 %."),
              (f"Kr {kr(g9_salgsaar_uten_oppj, 2)}", f"begge feilene samtidig: skjerming for salgsåret og glemt oppjustering, "
               f"{kr(gev9 - (K9 + ub9) * rs9)} × 22 %.")],
             f"Regn med satsen i stedet: 1,72 × 22 % = 37,84 %. {kr(gev9)} × 37,84 % = {kr(skatt9, 2)}. ✓ "
             f"Glemmer du den ubenyttede skjermingen helt, får du {kr(g9_glemt, 2)}. Det tallet står ikke blant alternativene.",
             "Alternativene er to par der det ene tallet er 58 % av det andre (med og uten oppjustering). Oppjusteringen "
             "stryker de to laveste. Mellom de to som står igjen, avgjør bare salgsårsregelen: ingen ny skjerming når aksjen "
             "er solgt før 31. desember."))
EX.append(oppgave(9, "Aksjesalg med framført skjerming", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: fem begrepsledd")
leie10 = 9_000 * 12
assert leie10 > 20_000
felles10 = "<p>Fem uavhengige spørsmål. Hvert spørsmål står for seg.</p>"
pa = ledd("a", "<p>Jonas eier og bor i en leilighet. Han får jobb i Tromsø fra januar til desember og leier ut hele leiligheten på en "
               "vanlig langtidskontrakt for kr 9 000 i måneden. Han har eid leiligheten i fem år. Hva er riktig om leieinntekten?</p>",
          ("Hele leien er skattepliktig fordi han leier ut over halvparten for mer enn kr 20 000 i året", ["20 000"]),
          [("Den er skattefri fordi han har eid og bodd i leiligheten i mer enn ett år", ["ett"]),
           ("Bare den delen av leien som overstiger kr 20 000 i året, er skattepliktig", ["20 000"]),
           ("Den er skattefri fordi han bare er midlertidig borte fra boligen sin på grunn av jobben i Tromsø", [])],
          f"<p><b>Regelen.</b> Leie av egen bolig er skattefri når eieren selv bruker minst halvparten, målt etter utleieverdi. "
          f"Leier du ut mer enn halvparten, er leien skattefri bare om den er inntil kr 20 000 i året. Over grensen er hele "
          f"beløpet skattepliktig fra første krone (manualen 4.4).</p><p>Jonas leier ut hele boligen for 9 000 × 12 = "
          f"kr {kr(leie10)} i året. Det er over grensen, så <b>hele leien er skattepliktig</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Eid og bodd i mer enn ett år</b> = vilkåret for skattefri gevinst ved salg, "
          "ikke for utleie.<br><b>Bare det som overstiger kr 20 000</b> = grensen er en terskel, ikke et bunnfradrag.<br>"
          "<b>Midlertidig borte på grunn av jobb</b> = brukshindring teller som botid ved salg, men gir ikke skattefri utleie.</p>")
pb = ledd("b", "<p>Eierskatten på utbytte regnes ved at skattepliktig utbytte ganges med oppjusteringsfaktoren 1,72 og "
               "deretter med 22 %. Hvilket utsagn om oppjusteringsfaktoren er riktig?</p>",
          ("Den skal hindre at eiere som jobber i eget selskap, sparer skatt ved å ta ut lønnen sin som utbytte", []),
          [("Den skal kompensere eieren for at selskapet allerede har betalt selskapsskatt av overskuddet", []),
           ("Øker selskapsskatten mens skatten på lønn er uendret, må faktoren opp for at likningen skal holde", []),
           ("Faktoren 1,72 bygger på at bedriften bærer hele arbeidsgiveravgiften, ikke arbeidstakeren", ["1,72"])],
          "<p><b>Regelen.</b> Faktoren løses ut av inntektsskiftingslikningen: marginalskatt på lønn pluss arbeidsgiveravgift = "
          "selskapsskatt + eierskatt × faktor (47,4 % + 12,4 % = 22 % + 22 % × 1,72). Formålet er at det ikke skal lønne seg å "
          "gjøre lønn om til utbytte. <b>Utsagnet om å hindre inntektsskifting er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Kompensere for selskapsskatten</b> = motsatt. Faktoren øker eierskatten. "
          "Den kompenserer ingenting.<br><b>Faktoren må opp</b> = feil retning. Selskapsskatten står på samme side som eierskatten, "
          "så når den øker, må faktoren ned (24 % gir om lag 1,63).<br><b>Bedriften bærer avgiften</b> = 1,72 bygger på full "
          "overvelting, altså at arbeidstakeren bærer hele avgiften. Bærer bedriften alt, blir faktoren om lag 0,59.</p>")
pc = ledd("c", "<p>To investorer vurderer det samme risikable prosjektet. A er et etablert selskap med store overskudd fra annen "
               "virksomhet. B er en nystartet bedrift uten annen inntekt, som bare kan framføre et tap mot usikker framtidig "
               "inntekt. Skattesatsen er den samme for begge. Hvilket utsagn er riktig?</p>",
          ("A er favorisert fordi staten i praksis bærer en større del av tapet for A", []),
          [("Skatten virker likt for begge fordi skattesatsen er den samme", []),
           ("B er favorisert fordi B slipper skatt i årene med underskudd", []),
           ("B tar mer risiko enn A fordi staten tar en mindre del av gevinsten fra prosjektet til B", [])],
          "<p><b>Regelen.</b> Med fullt tapsfradrag er staten en stille partner som tar andelen t av både gevinst og tap. A kan "
          "føre tapet mot annen inntekt med en gang og får fullt fradrag. For B er fradraget bare en framføring mot usikker inntekt, "
          "så det er verdt mindre enn t per krone tapt. Staten tar like mye av oppsiden for begge, men bærer mindre av nedsiden "
          "for B. Skattesystemet favoriserer derfor de etablerte i risikable prosjekter (manualen 12.3). <b>A er favorisert.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Virker likt</b> = ser bare på satsen. Det er tapsfradraget som skiller.<br>"
          "<b>B slipper skatt i underskuddsår</b> = det gjør A også. Forskjellen er at A får tapet refundert gjennom lavere skatt "
          "på annen inntekt.<br><b>B tar mer risiko</b> = begrunnelsen er feil: staten tar samme andel av gevinsten fra begge. "
          "Det som skiller A og B, er tapsfradraget.</p>")
pd = ledd("d", "<p>Martin har bodd i Norge hele livet. I 2026 flytter han til Portugal. Hvilket av forholdene under er alene nok "
               "til at bostedet hans i Norge ikke opphører etter norsk intern rett?</p>",
          ("Kona hans blir boende i familiens leilighet i Bergen", []),
          [("Han beholder norsk statsborgerskap og stemmerett i Norge", []),
           ("Han oppholder seg 50 dager i Norge hvert år for å besøke venner", ["50"]),
           ("Han har fortsatt aksjer i norske selskaper og en norsk bankkonto", [])],
          "<p><b>Regelen.</b> Bosted i Norge opphører først når du kan godtgjøre at du ikke har vært i Norge mer enn 61 dager i "
          "året og at verken du eller nærstående (ektefelle, samboer og mindreårige barn) har disponert bolig her. Med minst ti års "
          "botid må det gjelde i hvert av de tre årene etter utflyttingsåret (skatteloven § 2-1, manualen 13.1). Kona i familiens "
          "leilighet er nærstående som disponerer bolig. <b>Det alene hindrer at bostedet opphører.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Statsborgerskap og stemmerett</b> = inngår ikke i bostedsregelen.<br>"
          "<b>50 dager i året</b> = under grensen på 61 dager.<br><b>Aksjer og bankkonto</b> = formue i Norge gjør deg ikke bosatt. "
          "Aksjene utløser exit-skatt ved utflytting, men det er en annen regel.</p>")
pe = ledd("e", "<p>Et konsern lar datterselskapet i Norge finansieres med store lån fra et søsterselskap på Caymanøyene. Renten "
               "er på markedsnivå. Rentene trekkes fra i Norge og skattlegges nesten ikke der de mottas. Hvilken mekanisme er "
               "dette? Hvilket tiltak retter seg mest direkte mot den?</p>",
          ("Tynn kapitalisering. Rentebegrensningsregler som kutter fradraget for konserninterne renter i Norge", []),
          [("Internprising. Armlengdeprinsippet, som krever markedspris på handel mellom konsernselskaper", []),
           ("Tynn kapitalisering. Automatisk informasjonsutveksling mellom skattemyndighetene (CRS)", []),
           ("Stråmenn. Offentlige registre over hvem som reelt eier og styrer selskapene", [])],
          "<p><b>Regelen.</b> Tynn kapitalisering: datterselskapet i høyskattelandet finansieres med konsernintern gjeld, rentene gir "
          "fradrag der satsen er høy og skattlegges lavt der de mottas. Ingen krone forlater konsernet, bare skattegrunnlaget flytter. "
          "Motmiddelet er rentebegrensningsregler (manualen 13.5). <b>Tynn kapitalisering med rentebegrensning er riktig.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Internprising</b> = flytter overskudd gjennom feil priser. Her er renten "
          "på markedsnivå, så armlengdeprinsippet er oppfylt. Problemet er gjeldsmengden.<br><b>CRS</b> = riktig mekanisme, feil "
          "tiltak. Informasjonsutveksling avslører skjulte kontoer, men lånet er åpent og lovlig.<br><b>Stråmenn</b> = skjuler hvem "
          "som eier. Det er ikke det som skjer her.</p>")
EX.append(oppgave(10, "Fem korte spørsmål om skattereglene", "Skattebegreper og aksjonærmodellen", [4, 5, 12, 13],
                  felles10, [pa, pb, pc, pd, pe]))

# ======================================================================= 11
print("\nOppgave 11: Merton og humankapital")
ER11, sd11, rf11, w11 = 0.07, 0.25, 0.02, 0.40
prem11 = ER11 - rf11
gam11 = prem11 / (w11 * sd11 ** 2)
assert lik(gam11, 2.0)
g11_sigma = prem11 / (w11 * sd11)
g11_ER = ER11 / (w11 * sd11 ** 2)
g11_utenw = prem11 / sd11 ** 2
F11, H11 = 1_000_000, 800_000
aksjer11 = w11 * (F11 + H11)
alfa11 = aksjer11 / F11
assert lik(alfa11, 0.72)
g11b_F = w11
g11b_snudd = w11 * F11 / (F11 + H11)
g11b_beta = max(0.0, aksjer11 - H11) / F11
print(f"   gamma {gam11}; gale {g11_sigma}, {g11_ER}, {g11_utenw}; alfa {alfa11}; gale {g11b_F}, {g11b_snudd}, {g11b_beta}")


def gam(x):
    return f"γ = {kr(x, 1)}"


felles11 = ("<p>Aksjemarkedet, representert ved et globalt indeksfond, gir forventet avkastning 7 % med standardavvik 25 %. "
            "Bankrenten er risikofri og lik 2 %. Ifølge Merton er optimal andel av totalformuen i aksjer "
            "w = (E(R) − R<sub>f</sub>)/(γσ<sup>2</sup>).</p>")
pa = ledd("a", "<p>Berit er pensjonist og har bare finansiell formue. Hun har 40 % av formuen i indeksfondet. Det er den optimale "
               "andelen hennes etter Merton. Hva er risikoaversjonen γ hennes?</p>",
          (gam(gam11), [kr(gam11, 1)]),
          [(gam(g11_sigma), [kr(g11_sigma, 1)]), (gam(g11_ER), [kr(g11_ER, 1)]), (gam(g11_utenw), [kr(g11_utenw, 1)])],
          sol("Løs Mertons formel baklengs: γ = (E(R) − R<sub>f</sub>)/(wσ<sup>2</sup>). Formelen bruker risikopremien og variansen.",
              [f"Risikopremie: 7 % − 2 % = {pst(prem11, 0)}. Varians: 0,25<sup>2</sup> = {kr(sd11 ** 2, 4)}.",
               f"wσ<sup>2</sup> = 0,40 × {kr(sd11 ** 2, 4)} = {kr(w11 * sd11 ** 2, 3)}.",
               f"γ = 0,05/{kr(w11 * sd11 ** 2, 3)} = <b>{kr(gam11, 1)}</b>."],
              [(gam(g11_sigma), "standardavviket brukt i stedet for variansen: 0,05/(0,40 × 0,25)."),
               (gam(g11_ER), "forventet avkastning brukt i stedet for risikopremien: 0,07/0,025."),
               (gam(g11_utenw), "aksjeandelen glemt: 0,05/0,0625.")],
              f"Sett inn: 0,05/({kr(gam11, 0)} × 0,0625) = {kr(prem11 / (gam11 * sd11 ** 2), 2)}, altså 40 %. ✓"))
pb = ledd("b", "<p>Emil har samme γ som Berit, en finansiell formue på kr 1 000 000 og en risikofri humankapital på "
               "kr 800 000. Han låner ikke for å kjøpe aksjer. Hvor stor andel av finansformuen bør han ha i indeksfondet?</p>",
          (pst(alfa11, 1), [pst(alfa11, 1)]),
          [(pst(g11b_F, 1), [pst(g11b_F, 1)]), (pst(g11b_snudd, 1), [pst(g11b_snudd, 1)]), (pst(g11b_beta, 1), [pst(g11b_beta, 1)])],
          sol("Merton gir andelen av totalformuen. Risikofri humankapital virker som et bankinnskudd som ikke kan selges, så hele "
              "aksjebeløpet må tas fra den finansielle formuen.",
              [f"Totalformue: {kr(F11)} + {kr(H11)} = {kr(F11 + H11)}.",
               f"Aksjebeløp: 40 % × {kr(F11 + H11)} = {kr(aksjer11)}.",
               f"Andel av finansformuen: {kr(aksjer11)}/{kr(F11)} = <b>{pst(alfa11, 1)}</b>."],
              [(pst(g11b_F, 1), "w brukt på finansformuen alene. Humankapitalen er oversett."),
               (pst(g11b_snudd, 1), f"brøken snudd: 40 % × {kr(F11)}/{kr(F11 + H11)}."),
               (pst(g11b_beta, 1), f"humankapitalen behandlet som aksjer (β = 1): {kr(aksjer11)} − {kr(H11)} er negativt, så null.")],
              f"Hele balansen: {kr(aksjer11)} i aksjer av {kr(F11 + H11)} er 40 %, nøyaktig w. ✓"))
pc = ledd("c", "<p>Kari og Kristin er like gamle og har lik finansformue, lik forventet lønn og lik γ. Kari er lærer med "
               "sikker lønn. Kristin er aksjemegler med lønn og bonus som følger børsen. Hvem bør ha høyest aksjeandel i "
               "finansformuen?</p>",
          ("Kari, fordi humankapitalen hennes virker som et risikofritt bankinnskudd", []),
          [("Kristin, fordi hun kjenner aksjemarkedet best gjennom jobben sin", []),
           ("De bør ha lik aksjeandel, fordi de har samme formue, lønn og risikoaversjon", []),
           ("Kristin, fordi humankapitalen hennes har høyere forventet avkastning", [])],
          "<p><b>Regelen.</b> Aksjebeløpet i finansformuen er w(F + H) − β<sub>H</sub>H. Karis humankapital har β<sub>H</sub> ≈ 0 "
          "og er et implisitt bankinnskudd, så hun må hente all aksjerisiko i finansformuen. Kristin eier allerede mye aksjerisiko "
          "gjennom lønnen og skal ha en tryggere finansformue. <b>Kari bør ha høyest aksjeandel.</b></p>"
          "<p><b>Hvorfor de andre er gale.</b></p><p><b>Kristin kjenner markedet</b> = kunnskap gir ikke meravkastning i et "
          "effektivt marked. Hun dobler dessuten eksponeringen.<br><b>Lik andel</b> = ser bort fra hvordan humankapitalen samvarierer "
          "med børsen.<br><b>Høyere forventet avkastning</b> = forventet lønn er lik. Det er risikoen i humankapitalen som skiller.</p>")
EX.append(oppgave(11, "Mertons aksjeandel og humankapitalen", "Porteføljevalg", [14], felles11, [pa, pb, pc]))

# ======================================================================= 12
print("\nOppgave 12: lovpålagt forsikring")
p = ledd("",
         "<p>Mari har nettopp kjøpt sin første bil og en leilighet. Leiligheten er finansiert med boliglån. Hvilken forsikring er "
         "hun pålagt ved lov å ha?</p>",
         ("Ansvarsforsikring for bilen, fordi skader kan ramme andre enn henne", []),
         [("Boligforsikring, fordi banken krever den som vilkår for å gi henne boliglånet", []),
          ("Uføreforsikring, fordi folketrygden ikke dekker uførhet", []),
          ("Både boligforsikring og ansvarsforsikring for bilen", [])],
         "<p><b>Regelen.</b> Ansvarsforsikring på bil er den eneste av de vanlige privatforsikringene som er lovpålagt. Skaden "
         "rammer tredjepart, som ellers kunne stått uten dekning (manualen 17.6). <b>Ansvarsforsikringen er riktig svar.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Boligforsikring</b> = avtalepålagt, ikke lovpålagt. Banken krever den "
         "som vilkår for lånet.<br><b>Uføreforsikring</b> = frivillig. Grunndekningen ligger i folketrygdens uføretrygd.<br>"
         "<b>Både bolig og bil</b> = faller fordi boligforsikringen ikke er lovpålagt.</p>"
         "<p><b>Strategi med minuspoeng.</b> Se etter skaden som rammer andre. Uføreforsikringen kan strykes med en gang, "
         "for begrunnelsen er feil.</p>")
EX.append(oppgave(12, "Hvilken forsikring er lovpålagt", "Forsikring", [17], "", [p]))

# ======================================================================= 13
print("\nOppgave 13: kaskoforsikring med √W")
bank13, L13, pr13, P13 = 640_000, 360_000, 0.06, 22_000
W13 = bank13 + L13
EU_uten = (1 - pr13) * math.sqrt(W13) + pr13 * math.sqrt(W13 - L13)
EU_med = math.sqrt(W13 - P13)
assert lik(EU_uten, 988) and EU_med > EU_uten
forv_tap = pr13 * L13
assert P13 > forv_tap                      # premien er over forventet erstatning
maks13 = W13 - EU_uten ** 2
pstar = (math.sqrt(W13) - EU_med) / (math.sqrt(W13) - math.sqrt(W13 - L13))
assert pstar < pr13
g13_akt = P13 / L13
g13_bil = (math.sqrt(L13) - math.sqrt(L13 - P13)) / math.sqrt(L13)
g13_nevner = (math.sqrt(W13) - EU_med) / math.sqrt(W13)
print(f"   EU uten {EU_uten}, med {EU_med:.4f}, maks premie {maks13}, p* {pstar:.6f}; gale {g13_akt:.6f}, {g13_bil:.6f}, {g13_nevner:.6f}")


def ca(x):
    return f"ca. {pst(x)}"


felles13 = ("<p>Ella har kr 640 000 i banken og en bil verdt kr 360 000. Med sannsynlighet 6 % blir bilen totalskadd i løpet "
            "av året. Da er den verdiløs. Nyttefunksjonen hennes er U(W) = √W, der W er formuen ved årets slutt. Et "
            "forsikringsselskap tilbyr full kaskodekning for en premie på kr 22 000.</p>")
pa = ledd("a", "<p>Bør Ella kjøpe forsikringen?</p>",
          ("Ja, fordi forventet nytte blir høyere med forsikringen", []),
          [("Nei, fordi premien er høyere enn forventet erstatning", []),
           ("Nei, fordi forventet nytte blir lavere med forsikringen", []),
           ("Hun er indifferent, fordi forventet nytte er lik med og uten forsikring", [])],
          sol("Sammenlign forventet nytte, ikke forventet formue. Full dekning gir et sikkert utfall.",
              [f"Formue: {kr(bank13)} + {kr(L13)} = {kr(W13)}. Uten forsikring: 0,94 × √1 000 000 + 0,06 × √640 000 = "
               f"0,94 × 1 000 + 0,06 × 800 = {kr(EU_uten)}.",
               f"Med forsikring: √(1 000 000 − 22 000) = √978 000 = {kr(EU_med, 2)}.",
               f"{kr(EU_med, 2)} &gt; {kr(EU_uten)}, så <b>ja, hun bør kjøpe</b>."],
              [("Nei, premien over forventet erstatning", f"forventet erstatning er 6 % × {kr(L13)} = {kr(forv_tap)}. Premien er "
                "høyere, men en risikoavers betaler gjerne mer enn forventet tap. Det er forventet nytte som avgjør."),
               ("Nei, lavere nytte", "regnefeil. Nytten med forsikring er høyest."),
               ("Indifferent", "gjelder bare ved den høyeste premien hun er villig til å betale.")],
              f"Høyeste premie: 1 000 000 − {kr(EU_uten)}<sup>2</sup> = {kr(maks13)}, som er over {kr(P13)}. ✓"))
pb = ledd("b", "<p>Hva er den laveste sannsynligheten for totalskade som gjør at Ella vil kjøpe forsikringen til denne premien?</p>",
          (ca(pstar), [pst(pstar)]),
          [(ca(g13_akt), [pst(g13_akt)]), (ca(g13_bil), [pst(g13_bil)]), (ca(g13_nevner), [pst(g13_nevner)])],
          sol("Finn p der forventet nytte uten forsikring er lik nytten med forsikring: (1 − p) × √W + p × √(W − L) = √(W − premie).",
              ["Venstre side: 1 000 − p × (1 000 − 800) = 1 000 − 200p.",
               f"Høyre side: √978 000 = {kr(EU_med, 2)}.",
               f"p = (1 000 − {kr(EU_med, 2)})/200 = <b>{pst(pstar)}</b>."],
              [(ca(g13_akt), f"aktuarisk regning: {kr(P13)}/{kr(L13)}. Den gjelder en risikonøytral."),
               (ca(g13_bil), "bilen behandlet som hele formuen: (√360 000 − √338 000)/√360 000."),
               (ca(g13_nevner), "delt på √W = 1 000 i stedet for 1 000 − 800 = 200.")],
              f"Med p = {pst(pstar)}: 1 000 − 200 × {kr(pstar, 5)} = {kr(1000 - 200 * pstar, 2)}. ✓",
              "I a kjøpte Ella ved 6 %. Terskelen må da ligge under 6 %, så alternativet over 6 % kan strykes uten regning."))
EX.append(oppgave(13, "Kaskoforsikring på bilen med √W", "Forsikring og forventet nytte", [17], felles13, [pa, pb]))

# ======================================================================= 14
print("\nOppgave 14: delingstall og utsatt uttak")
B14, d67, d70 = 4_080_000, 17.0, 15.0
a67, a70 = B14 / d67, B14 / d70
assert lik(a67, 240_000) and lik(a70, 272_000)
okn14 = a70 / a67 - 1
assert lik(a67 * d67, a70 * d70)
print(f"   67: {a67}, 70: {a70}, økning {okn14}")
p = ledd("",
         "<p>Ivar er født i 1970 og har en pensjonsbeholdning i folketrygden på kr 4 080 000. Anta at delingstallet hans er 17,0 "
         "ved uttak som 67-åring og 15,0 ved uttak som 70-åring. Se bort fra regulering og ny opptjening etter 67 år. Hva er "
         "riktig om å vente med uttaket til han er 70 år?</p>",
         (f"Årlig pensjon stiger fra kr {kr(a67)} til kr {kr(a70)}. Forventet sum over livet er omtrent uendret",
          [kr(a67), kr(a70)]),
         [(f"Årlig pensjon stiger fra kr {kr(a67)} til kr {kr(a70)}. Forventet sum over livet stiger med {pst(okn14, 1)}",
           [kr(a67), kr(a70), pst(okn14, 1)]),
          (f"Årlig pensjon synker fra kr {kr(a70)} til kr {kr(a67)} fordi delingstallet stiger når uttaket utsettes",
           [kr(a70), kr(a67)]),
          (f"Årlig pensjon er uendret kr {kr(a67)} fordi pensjonsbeholdningen er den samme", [kr(a67)])],
         sol("Årlig pensjon = beholdning/delingstall. Delingstallet er om lag forventet gjenstående levetid og synker når uttaket "
             "utsettes. Ordningen er nøytral: forventet samlet utbetaling er omtrent den samme uansett uttaksalder.",
             [f"Ved 67: {kr(B14)}/17,0 = {kr(a67)}.",
              f"Ved 70: {kr(B14)}/15,0 = {kr(a70)}, altså {pst(okn14, 1)} høyere i året.",
              f"Forventet samlet utbetaling: {kr(a67)} × 17,0 = {kr(a67 * d67)} og {kr(a70)} × 15,0 = {kr(a70 * d70)}. "
              "<b>Høyere årlig pensjon, omtrent samme forventede sum.</b>"],
             [(f"Stiger med {pst(okn14, 1)} over livet", "blander den årlige økningen med summen over livet. Den som venter, får "
               "høyere beløp over færre år."),
              ("Synker fordi delingstallet stiger", "feil retning. Delingstallet synker med uttaksalderen. Det stiger fra kull til kull."),
              ("Uendret", "motsier hele poenget med fleksibelt uttak.")],
             f"Årsbeløp ganget med delingstall gir beholdningen tilbake i begge tilfeller: {kr(B14)}. ✓",
             "Med fast teller kan ikke nevneren og resultatet stige samtidig. Det stryker ett alternativ med en gang."))
EX.append(oppgave(14, "Uttak av alderspensjon ved 67 eller 70 år", "Pensjon", [15], "", [p]))

# ======================================================================= 15
print("\nOppgave 15: giring eller risikable småselskaper")
rf15, EM15, sM15, laan15 = 0.03, 0.08, 0.16, 0.40
v15 = 1 + laan15
E_I = rf15 + v15 * (EM15 - rf15)
s_I = v15 * sM15
assert lik(E_I, 0.10) and lik(s_I, 0.224)
E_II, s_II = 0.10, 0.30
g15_feil = v15 * EM15
sharpe_I = (E_I - rf15) / s_I
sharpe_II = (E_II - rf15) / s_II
print(f"   I: E {E_I}, sd {s_I}, Sharpe {sharpe_I}; II: Sharpe {sharpe_II}; uten lånekostnad {g15_feil}")
p = ledd("",
         "<p>Risikofri rente er 3 %. Markedsporteføljen har forventet avkastning 8 % og standardavvik 16 %. Line vil ha 10 % "
         "forventet avkastning. Hun kan (I) låne 40 % av egenkapitalen til risikofri rente og ha 140 % i markedsporteføljen, "
         "eller (II) plassere alt i et småselskapsfond med forventet avkastning 10 % og standardavvik 30 %. Hva bør hun velge "
         "ifølge teorien om optimale porteføljer?</p>",
         (f"I, fordi den gir {pst(E_I, 0)} med standardavvik {pst(s_I, 1)} mot {pst(s_II, 0)} i II", [pst(E_I, 0), pst(s_I, 1), pst(s_II, 0)]),
         [(f"II, fordi fondet gir {pst(E_II, 0)} uten at hun må ta opp lån for å investere", [pst(E_II, 0)]),
          (f"De er like gode, fordi begge gir {pst(E_II, 0)} forventet avkastning", [pst(E_II, 0)]),
          (f"I, fordi den gir {pst(g15_feil, 1)} forventet avkastning mot {pst(E_II, 0)} i II", [pst(g15_feil, 1), pst(E_II, 0)])],
         sol("Alle kombinasjoner av markedsporteføljen og risikofritt lån ligger på kapitalmarkedslinjen, den bratteste linjen som "
             "finnes. Mer forventet avkastning hentes ved å gire markedsporteføljen, ikke ved å velge mer risikable aksjer.",
             [f"I: forventet avkastning 3 % + 1,4 × (8 % − 3 %) = {pst(E_I, 0)}.",
              f"I: standardavvik 1,4 × 16 % = {pst(s_I, 1)}.",
              f"Samme forventning som II, men lavere risiko ({pst(s_I, 1)} mot {pst(s_II, 0)}). <b>Velg I.</b>"],
             [("II uten lån", "å unngå lån er ikke et kriterium. II har mer risiko for samme forventning. Den ekstra risikoen er "
               "usystematisk og ubetalt."),
              ("Like gode", "ser bare på forventningen og glemmer risikoen."),
              (f"I med {pst(g15_feil, 1)}", f"lånekostnaden glemt: 1,4 × 8 %. Lånet på 40 % koster 0,4 × 3 % = 1,2 prosentpoeng.")],
             f"Sharpe-forholdet for I er (10 % − 3 %)/{pst(s_I, 1)} = {kr(sharpe_I, 4)}, det samme som markedets 5/16. "
             f"For II er det 7/30 = {kr(sharpe_II, 3)}. ✓"))
EX.append(oppgave(15, "Giring eller risikable småselskaper", "Porteføljevalg", [14], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: aktive fond, indeksfond og Forbrukerrådet")
p = ledd("",
         "<p>Forbrukerrådet sammenlignet aktive fond og indeksfond fra norske forvaltere over tjue år fram til 2018. Hvilket utsagn "
         "er i tråd med pensum?</p>",
         ("Forbrukerrådet fant at aktive fond gjorde det bedre enn indeks for norske aksjer, men svakere for globale", []),
         [("Forbrukerrådet fant at aktive fond gjorde det svakere enn indeks i alle kategorier, også for norske aksjer", []),
          ("Fordi de dårligste fondene legges ned, får de aktive fondene som overlever et for dårlig rykte i statistikken", []),
          ("Et indeksfond kan gi høyere avkastning enn et vektet snitt av aksjene i indeksen, fordi gebyret er lavt", [])],
         "<p><b>Regelen.</b> Forbrukerrådet fant at aktive fond gjorde det svakere enn indeks for globale, europeiske og nordiske "
         "aksjer, men bedre for norske (manualen 14.6). Utsagnet om norske og globale fond er derfor <b>riktig</b>.</p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Svakere i alle kategorier</b> = nærmest sannheten og derfor den dyreste "
         "fella. Norske aksjer var unntaket.<br><b>For dårlig rykte</b> = motsatt. Når de dårligste fondene forsvinner ut av snittet, "
         "ser de aktive fondene bedre ut enn de er (survivorship bias).<br><b>Indeksfond over snittet</b> = umulig. Et indeksfond "
         "leverer per definisjon det verdivektede snittet minus gebyret.</p>")
EX.append(oppgave(16, "Aktive fond, indeksfond og Forbrukerrådet", "Indeksfond og aktiv forvaltning", [14], "", [p]))

# ======================================================================= 17
print("\nOppgave 17: innskuddspensjon i privat sektor")
p = ledd("",
         "<p>Hege jobber i en privat bedrift med innskuddspensjon. Hvilket utsagn om ordningen hennes er riktig?</p>",
         ("Beholdningen arves av etterlatte. Den utbetales normalt over minst ti år", ["ti"]),
         [("Dør hun før pensjonsalder, tilfaller beholdningen arbeidsgiveren", []),
          ("Pensjonen utbetales livsvarig som i folketrygden, slik at hun er forsikret mot å leve lenge", []),
          ("Arbeidsgiveren dekker underskuddet hvis avkastningen blir lav", [])],
         "<p><b>Regelen.</b> I innskuddspensjon er innskuddet avtalt, ikke ytelsen. Beholdningen er den ansattes egen og arves av "
         "etterlatte. Den utbetales normalt over minst ti år. I privat sektor er ti år det vanlige (manualen 15.4). "
         "<b>Utsagnet om arv og ti år er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Tilfaller arbeidsgiveren</b> = motsatt. Beholdningen arves av etterlatte.<br>"
         "<b>Livsvarig</b> = det gjelder folketrygden og offentlig tjenestepensjon. En utbetaling over et fast antall år forsikrer ikke mot å leve lenge.<br>"
         "<b>Arbeidsgiveren dekker underskudd</b> = beskriver ytelsespensjon. I innskuddspensjon bærer den ansatte avkastningsrisikoen.</p>")
EX.append(oppgave(17, "Innskuddspensjon i privat sektor", "Pensjon", [15], "", [p]))

# ======================================================================= 18
print("\nOppgave 18: hjemmebias")
p = ledd("",
         "<p>Ola er ingeniør i et oljeserviceselskap i Stavanger. Nesten hele aksjeporteføljen hans består av norske "
         "oljeserviceaksjer, fordi han «kjenner bransjen». Hvilket avvik viser Ola? Hva er hovedproblemet med porteføljen hans?</p>",
         ("Hjemmebias. Porteføljen faller gjerne samtidig som jobben hans er truet", []),
         [("Overkonfidens. Han handler for ofte og betaler for mye i kurtasje", []),
          ("Flokkatferd. Han følger kollegene i stedet for å gjøre egen analyse", []),
          ("Hjemmebias. Norske aksjer har høyere standardavvik enn utenlandske aksjer", [])],
         "<p><b>Regelen.</b> Hjemmebias er å foretrekke det man kjenner. Humankapitalen til Ola er allerede en stor posisjon i norsk "
         "olje. Aksjene legger mer av samme risiko oppå: går det dårlig i bransjen, faller porteføljen samtidig som jobben er truet. "
         "Døskeland og Hvide finner at nordmenn i snitt har om lag 32 % av porteføljen i egen bransje og får om lag 3 prosentpoeng "
         "lavere avkastning der (manualen 18.2). <b>Hjemmebias med samvariasjon som problem er riktig.</b></p>"
         "<p><b>Hvorfor de andre er gale.</b></p><p><b>Overkonfidens</b> = teksten sier ingenting om hvor ofte han handler.<br>"
         "<b>Flokkatferd</b> = han følger ikke andre, han velger det kjente.<br><b>Høyere standardavvik</b> = riktig navn, feil "
         "problem. Det er samvariasjonen med lønnen som teller, ikke aksjenes eget standardavvik.</p>")
EX.append(oppgave(18, "Oljeaksjer for en oljeingeniør", "Finansiell psykologi", [18, 14], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove6",
    "kind": "mock",
    "label": "Prøveeksamen 6",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner H2025 og kursgodkjenningen 2026. Regneleddene er korte og alle satser står i teksten. Oppgave 10 er en "
             "blokk med fem begrepsledd i stilen fra kursgodkjenningen. Vekten ligger på formuesskatt (utbytte over to år, "
             "gjeldsfordeling, avkastningsskatt og utbytte til skatten), stykkskatt med grensetilfeller, bedriftens tilpasning, "
             "Merton med humankapital og forsikring med √W."),
    "facts": [
        "Fire timer, kalkulator tillatt. 30 flervalgsledd med fire alternativer og nøyaktig ett riktig.",
        "3 poeng for rett svar, −1 for feil svar og 0 for ubesvart. Totalt 90 poeng.",
        "Oppgave 1–10 er skattedelen (19 ledd). Oppgave 11–18 er finansdelen (11 ledd).",
        "Laget for trening etter mønster fra H2025, kursgodkjenningen 2026 og manualen. Det er ikke en ekte eksamen. "
        "Kurset har ikke kontrollert løsningene.",
    ],
    "practiceNote": ("Regn ferdig før du ser på alternativene. Hvert galt alternativ er en bestemt feil: glemt skjerming, glemt "
                     "rabatt, feil tidspunkt for formuesskatten, feil nevner eller svaret på nabospørsmålet. I begrepsleddene "
                     "avgjør ett ord, så les «alene», «riktig» og «i tråd med pensum» presist. Kan du stryke ett alternativ, "
                     "lønner det seg å svare."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove6.json")
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
