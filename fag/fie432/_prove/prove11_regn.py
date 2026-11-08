"""Prøveeksamen 11 (FIE432): regner alle tall, bygger prove11.json og sjekker den.

Kjør:  python3 -I fag/fie432/_prove/prove11_regn.py

Skriptet
1. regner hvert tall i spørsmål, riktig svar og gale alternativer,
2. bygger alternativene av de regnede tallene og plasserer riktig svar der
   fasitplanen (fasitplan.json, nøkkel p11) sier,
3. skriver prove11.json ved siden av seg selv,
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
PLAN = json.load(open(os.path.join(HER, "fasitplan.json"), encoding="utf8"))["p11"]
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

EX = []

# ======================================================================= 1
print("\nOppgave 1: Maja og aksjene i Lysfjord ASA")
K1 = 20_000
r1 = [0.03, 0.05]
D1 = [200, 2_420]
skj1_1 = K1 * r1[0]
skpl1_1 = max(0.0, D1[0] - skj1_1)
ub1_1 = max(0.0, skj1_1 - D1[0])
grl1_2 = K1 + ub1_1
skj1_2 = grl1_2 * r1[1]
tilg1_2 = skj1_2 + ub1_1
skpl1_2 = max(0.0, D1[1] - tilg1_2)
skatt1 = skpl1_2 * TE
assert lik(skj1_1, 600) and lik(ub1_1, 400) and lik(skj1_2, 1_020) and lik(skpl1_2, 1_000) and lik(skatt1, 378.4)
g1a_r2 = K1 * r1[1]                    # år 2-renten brukt i år 1
g1a_sum = K1 * (r1[0] + r1[1])          # begge årenes renter lagt sammen
g1a_oppj = skj1_1 * 1.72                # skjermingen oppjustert
g1c_glemt = D1[1] - K1 * r1[1]          # framført skjerming glemt helt
g1c_ikke_grl = D1[1] - K1 * r1[1] - ub1_1   # trukket fra, men ikke lagt til grunnlaget
g1c_ikke_trukket = D1[1] - skj1_2       # lagt til grunnlaget, men ikke trukket fra
g1d_uoppj = skpl1_2 * 0.22
g1d_uskj = D1[1] * TE
g1d_glemt = g1c_glemt * TE
print(f"   a {skj1_1}: {g1a_r2}, {g1a_sum}, {g1a_oppj}; c {skpl1_2}: {g1c_glemt}, {g1c_ikke_grl}, {g1c_ikke_trukket}; "
      f"d {skatt1}: {g1d_uoppj}, {g1d_uskj:.2f}, {g1d_glemt:.2f}")
body1 = (f"<p>Maja kjøpte aksjer i det børsnoterte selskapet Lysfjord ASA for kr {kr(K1)} i januar år 1. Hun eier dem "
         "personlig og har dem fortsatt ved utgangen av år 2. Hun har ingen andre aksjer. Skjermingsrenten er 3 % i år 1 og "
         "5 % i år 2.</p>")
pa = ledd("a", "<p>Hva er skjermingsfradraget for aksjene i år 1?</p>",
          (f"Kr {kr(skj1_1)}", [kr(skj1_1)]),
          [(f"Kr {kr(g1a_r2)}", [kr(g1a_r2)]),
           (f"Kr {kr(g1a_sum)}", [kr(g1a_sum)]),
           (f"Kr {kr(g1a_oppj)}", [kr(g1a_oppj)])],
          sol("Skjermingsfradraget er skjermingsgrunnlaget ganget med årets skjermingsrente. I år 1 er grunnlaget kostprisen "
              "(manualen 5.2 og 5.3).",
              [f"Grunnlaget i år 1: kostprisen, kr {kr(K1)}.",
               f"Skjerming: {kr(K1)} × 3 % = <b>kr {kr(skj1_1)}</b>."],
              [(f"Kr {kr(g1a_r2)}", "renten for år 2 er brukt i år 1."),
               (f"Kr {kr(g1a_sum)}", "renten for begge årene er lagt sammen. Hvert år har sin egen rente."),
               (f"Kr {kr(g1a_oppj)}", "skjermingen er ganget med oppjusteringsfaktoren 1,72. Faktoren brukes på det "
                "skattepliktige beløpet, ikke på fradraget.")],
              f"{kr(skj1_1)} / {kr(K1)} = 3 %. ✓"))
pb = ledd("b", f"<p>Maja mottar kr {kr(D1[0])} i utbytte i år 1. Hva er skattepliktig utbytte i år 1? Hvor mye skjerming "
               "framføres til år 2?</p>",
          (f"Skattepliktig kr 0 og framført kr {kr(ub1_1)}", ["0", kr(ub1_1)]),
          [(f"Skattepliktig kr {kr(D1[0])} og framført kr 0", [kr(D1[0]), "0"]),
           (f"Skattepliktig kr 0 og framført kr {kr(skj1_1)}", ["0", kr(skj1_1)]),
           (f"Skattepliktig kr −{kr(ub1_1)} og framført kr 0", ["−" + kr(ub1_1), "0"])],
          sol("Skattepliktig utbytte er utbytte minus skjerming, men aldri under null. Den delen av skjermingen som ikke brukes, "
              "framføres som ubenyttet skjerming på aksjen (manualen 5.3).",
              [f"Utbyttet {kr(D1[0])} er lavere enn skjermingen {kr(skj1_1)}, så skattepliktig utbytte er <b>kr 0</b>.",
               f"Ubenyttet skjerming: {kr(skj1_1)} − {kr(D1[0])} = <b>kr {kr(ub1_1)}</b> framføres."],
              [(f"Skattepliktig kr {kr(D1[0])}", "skjermingen er ikke trukket fra i det hele tatt."),
               (f"Framført kr {kr(skj1_1)}", "hele skjermingen er framført, som om utbyttet ikke brukte noe av den."),
               (f"Skattepliktig kr −{kr(ub1_1)}", "skattepliktig utbytte kan ikke bli negativt. Overskytende skjerming gir "
                "ikke fradrag mot annen inntekt, den framføres.")],
              f"Brukt pluss framført: {kr(D1[0])} + {kr(ub1_1)} = {kr(skj1_1)}, som er hele skjermingen. ✓"))
pc = ledd("c", f"<p>I år 2 mottar Maja kr {kr(D1[1])} i utbytte. Hun har verken kjøpt eller solgt aksjer. Hva er skattepliktig "
               "utbytte i år 2?</p>",
          (f"Kr {kr(skpl1_2)}", [kr(skpl1_2)]),
          [(f"Kr {kr(g1c_glemt)}", [kr(g1c_glemt)]),
           (f"Kr {kr(g1c_ikke_grl)}", [kr(g1c_ikke_grl)]),
           (f"Kr {kr(g1c_ikke_trukket)}", [kr(g1c_ikke_trukket)])],
          sol("Ubenyttet skjerming brukes to ganger året etter: den legges til skjermingsgrunnlaget og trekkes i tillegg "
              "fra utbyttet (manualen 5.3, rutine R1).",
              [f"Grunnlaget i år 2: {kr(K1)} + {kr(ub1_1)} = {kr(grl1_2)}.",
               f"Årets skjerming: {kr(grl1_2)} × 5 % = {kr(skj1_2)}. Tilgjengelig: {kr(skj1_2)} + {kr(ub1_1)} = "
               f"{kr(tilg1_2)}.",
               f"Skattepliktig: {kr(D1[1])} − {kr(tilg1_2)} = <b>kr {kr(skpl1_2)}</b>."],
              [(f"Kr {kr(g1c_glemt)}", f"den framførte skjermingen er glemt helt: {kr(D1[1])} − {kr(K1)} × 5 %."),
               (f"Kr {kr(g1c_ikke_grl)}", f"de {kr(ub1_1)} er trukket fra utbyttet, men ikke lagt til grunnlaget: "
                f"{kr(D1[1])} − {kr(K1 * r1[1])} − {kr(ub1_1)}."),
               (f"Kr {kr(g1c_ikke_trukket)}", f"grunnlaget er økt til {kr(grl1_2)}, men de {kr(ub1_1)} er ikke trukket fra "
                f"utbyttet: {kr(D1[1])} − {kr(skj1_2)}.")],
              f"Tilgjengelig skjerming {kr(tilg1_2)} pluss skattepliktig {kr(skpl1_2)} er {kr(D1[1])}, som er utbyttet. Ingenting "
              "framføres til år 3. ✓",
              "De tre gale tallene er nøyaktig de tre måtene å bruke den framførte skjermingen bare én gang på. Ser du "
              "fire tall som ligger tett, er det minste som regel det der den er brukt begge steder."))
pd = ledd("d", "<p>Hvor mye eierskatt betaler Maja på utbyttet hun mottar i år 2? Satsen er 22 % og oppjusteringsfaktoren 1,72. Svar med "
               "to desimaler.</p>",
          (f"Kr {kr(skatt1, 2)}", [kr(skatt1, 2)]),
          [(f"Kr {kr(g1d_uoppj, 2)}", [kr(g1d_uoppj, 2)]),
           (f"Kr {kr(g1d_uskj, 2)}", [kr(g1d_uskj, 2)]),
           (f"Kr {kr(g1d_glemt, 2)}", [kr(g1d_glemt, 2)])],
          sol("Eierskatt er skattepliktig utbytte × 1,72 × 22 % = skattepliktig utbytte × 37,84 % (manualen 5.1).",
              [f"Skattepliktig utbytte fra c: {kr(skpl1_2)}.",
               f"Eierskatt: {kr(skpl1_2)} × 1,72 × 22 % = <b>kr {kr(skatt1, 2)}</b>."],
              [(f"Kr {kr(g1d_uoppj, 2)}", f"oppjusteringen er glemt: {kr(skpl1_2)} × 22 %."),
               (f"Kr {kr(g1d_uskj, 2)}", f"skjermingen er glemt: hele utbyttet {kr(D1[1])} × 37,84 %."),
               (f"Kr {kr(g1d_glemt, 2)}", f"bygger på feilen i c der den framførte skjermingen er glemt: {kr(g1c_glemt)} × "
                "37,84 %.")],
              f"Oppjuster grunnlaget først: {kr(skpl1_2)} × 1,72 = {kr(skpl1_2 * 1.72)}. Så {kr(skpl1_2 * 1.72)} × 22 % = "
              f"{kr(skatt1, 2)}. ✓"))
EX.append(oppgave(1, "Maja og aksjene i Lysfjord ASA", "Aksjonærmodellen", [5], body1, [pa, pb, pc, pd]))

# ======================================================================= 2
print("\nOppgave 2: Torbjørn selger aksjen i Granitt ASA")
K2, S2, U2, TE2 = 200, 300, 25, 0.40
gev2 = S2 - K2 - U2
a2 = gev2 * TE2
g2_uskj = (S2 - K2) * TE2           # ubenyttet skjerming glemt
g2_dobbel = gev2 * 1.72 * TE2       # dobbel oppjustering
g2_22 = gev2 * 0.22                 # 22 % i stedet for oppgitt eierskatt
assert lik(a2, 30) and lik(g2_dobbel, 51.6)
print(f"   gevinst {gev2}, skatt {a2}: {g2_uskj}, {g2_dobbel:.2f}, {g2_22:.2f}")
p = ledd("",
         f"<p>Torbjørn kjøpte en aksje i Granitt ASA for kr {kr(K2)} i år 1. Han selger den i juni år 3 for kr {kr(S2)}. "
         f"Aksjen har kr {kr(U2)} i ubenyttet skjerming fra år 1 og 2. Anta forenklet at den effektive eierskatten er 40 %. "
         "Hvor mye skatt betaler Torbjørn på gevinsten? Svar med to desimaler.</p>",
         (f"Kr {kr(a2, 2)}", [kr(a2, 2)]),
         [(f"Kr {kr(g2_uskj, 2)}", [kr(g2_uskj, 2)]),
          (f"Kr {kr(g2_dobbel, 2)}", [kr(g2_dobbel, 2)]),
          (f"Kr {kr(g2_22, 2)}", [kr(g2_22, 2)])],
         sol("Ubenyttet skjerming trekkes fra gevinsten ved salg, men kan ikke gjøre den negativ. I salgsåret gis det ingen ny "
             "skjerming. Den effektive eierskatten har oppjusteringen regnet inn (manualen 5.4).",
             [f"Gevinst: {kr(S2)} − {kr(K2)} = {kr(S2 - K2)}.",
              f"Minus ubenyttet skjerming: {kr(S2 - K2)} − {kr(U2)} = {kr(gev2)}.",
              f"Skatt: {kr(gev2)} × 40 % = <b>kr {kr(a2, 2)}</b>."],
             [(f"Kr {kr(g2_uskj, 2)}", f"den ubenyttede skjermingen er glemt: {kr(S2 - K2)} × 40 %."),
              (f"Kr {kr(g2_dobbel, 2)}", f"dobbel oppjustering: {kr(gev2)} × 1,72 × 40 %. Den effektive satsen har allerede "
               "faktoren i seg."),
              (f"Kr {kr(g2_22, 2)}", f"22 % i stedet for den oppgitte eierskatten: {kr(gev2)} × 22 %.")],
             f"Netto etter skatt: {kr(S2)} − {kr(a2, 2)} = {kr(S2 - a2, 2)}. Skatten er 40 % av {kr(gev2)}, ikke av hele "
             f"gevinsten på {kr(S2 - K2)}. ✓"))
EX.append(oppgave(2, "Torbjørn selger aksjen i Granitt ASA", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 3
print("\nOppgave 3: Jorunn og fradraget")
F3, t3, r3 = 200_000, 0.22, 0.10
nv_straks = F3 * t3
nv_delt = F3 / 2 * t3 + F3 / 2 * t3 / (1 + r3)
a3 = nv_straks - nv_delt
g3_rente = F3 / 2 * t3 * r3                     # renten på den utsatte besparelsen, ikke diskontert
g3_fradrag = F3 / 2 - F3 / 2 / (1 + r3)         # skattesatsen glemt
assert lik(a3, 2_000) and lik(nv_delt, 42_000)
print(f"   straks {nv_straks}, delt {nv_delt}, forskjell {a3}: {g3_rente}, {g3_fradrag:.2f}")
p = ledd("",
         f"<p>Jorunn leier ut et forretningsbygg med god fortjeneste. Hun kan trekke fra en kostnad på kr {kr(F3)} i sin "
         f"helhet i år, eller kr {kr(F3 / 2)} i år og kr {kr(F3 / 2)} neste år. Skattesatsen er 22 % og skattebesparelsen kommer "
         "samme år som fradraget. Hun diskonterer med 10 %. Hvor mye mer er det verdt i nåverdi å trekke fra alt i år?</p>",
         (f"Kr {kr(a3)}", [kr(a3)]),
         [("Kr 0", ["0"]),
          (f"Kr {kr(g3_rente)}", [kr(g3_rente)]),
          (f"Kr {kr(g3_fradrag)}", [kr(g3_fradrag)])],
         sol("Et fradrag er verdt skattesatsen ganget med fradraget, i nåverdi. Samme fradrag tidligere er verdt mer så lenge "
             "renten er positiv og det finnes inntekt å trekke det fra (manualen 2.5, rutine R8).",
             [f"Alt i år: {kr(F3)} × 22 % = {kr(nv_straks)}.",
              f"Delt: {kr(F3 / 2)} × 22 % = {kr(F3 / 2 * t3)} i år og {kr(F3 / 2 * t3)} / 1,10 = {kr(F3 / 2 * t3 / 1.1)} "
              f"for neste år, til sammen {kr(nv_delt)}.",
              f"Forskjell: {kr(nv_straks)} − {kr(nv_delt)} = <b>kr {kr(a3)}</b>."],
             [("Kr 0", "tidsverdien er glemt. Summen av fradragene er lik, men besparelsen kommer et år senere."),
              (f"Kr {kr(g3_rente)}", f"renten på den utsatte besparelsen: {kr(F3 / 2 * t3)} × 10 %. Det er verdien om ett år, "
               "ikke i dag."),
              (f"Kr {kr(g3_fradrag)}", f"skattesatsen er glemt: {kr(F3 / 2)} − {kr(F3 / 2)} / 1,10. Det er nåverdien av å flytte "
               "selve fradraget, ikke skatten.")],
             f"Bare den utsatte halvdelen skiller: {kr(F3 / 2 * t3)} × (1 − 1/1,10) = {kr(F3 / 2 * t3)} / 11 = "
             f"{kr(a3)}. ✓"))
EX.append(oppgave(3, "Jorunn og fradraget for forretningsbygget", "Fradragets tidsverdi", [2], "", [p]))

# ======================================================================= 4
print("\nOppgave 4: flat skatt med bunnfradrag")
t4, B4, Bny4 = 0.30, 120_000, 200_000
Y4 = [400_000, 1_000_000]
gs4 = [t4 * (y - B4) / y for y in Y4]
gs4ny = [t4 * (y - Bny4) / y for y in Y4]
g4_brutto = [t4, t4]                              # bunnfradraget glemt
g4_verdi = [t4 * B4 / y for y in Y4]              # verdien av bunnfradraget
g4_skatt = [(t4 * y - B4) / y for y in Y4]        # bunnfradraget trukket fra skatten
assert lik(gs4[0], 0.21) and lik(gs4[1], 0.264)
assert gs4ny[1] - gs4ny[0] > gs4[1] - gs4[0] and gs4ny[0] / gs4ny[1] < gs4[0] / gs4[1]
print(f"   gjennomsnitt {gs4}, nytt {gs4ny}; gale {g4_verdi}, {g4_skatt}")


def par4(v):
    return f"{pst(v[0], 1)} og {pst(v[1], 1)}"


body4 = (f"<p>I landet Sørøy er skatten 30 % av inntekten over et bunnfradrag på kr {kr(B4)}. Malin tjener "
         f"kr {kr(Y4[0])} og Rune kr {kr(Y4[1])}.</p>")
pa = ledd("a", "<p>Hva er gjennomsnittsskatten til Malin og Rune? Se bort fra alle andre skatter og fradrag. Svar med én "
               "desimal.</p>",
          (par4(gs4), [pst(gs4[0], 1), pst(gs4[1], 1)]),
          [(par4(g4_brutto), [pst(t4, 1)]),
           (par4(g4_verdi), [pst(g4_verdi[0], 1), pst(g4_verdi[1], 1)]),
           (par4(g4_skatt), [pst(g4_skatt[0], 1), pst(g4_skatt[1], 1)])],
          sol("Gjennomsnittsskatten er betalt skatt delt på hele inntekten. Med flat sats t og bunnfradrag B er den "
              "t(Y − B)/Y (manualen 1.1 og 10.1).",
              [f"Malin: 30 % × ({kr(Y4[0])} − {kr(B4)}) = {kr(t4 * (Y4[0] - B4))}. Delt på inntekten: {kr(t4 * (Y4[0] - B4))} / {kr(Y4[0])} "
               f"= {pst(gs4[0], 1)}.",
               f"Rune: 30 % × ({kr(Y4[1])} − {kr(B4)}) = {kr(t4 * (Y4[1] - B4))}. Delt på inntekten: {kr(t4 * (Y4[1] - B4))} / "
               f"{kr(Y4[1])} = {pst(gs4[1], 1)}.",
               f"Svar: <b>{par4(gs4)}</b>."],
              [(par4(g4_brutto), "bunnfradraget er glemt, eller skatten er delt på inntekten etter fradraget. Det er "
                "marginalskatten, ikke gjennomsnittsskatten."),
               (par4(g4_verdi), "verdien av bunnfradraget i prosent av inntekten, 30 % × 120 000 / Y. Det er det skatten blir "
                "lavere med, ikke skatten."),
               (par4(g4_skatt), "bunnfradraget er trukket fra skatten i stedet for fra inntekten.")],
              f"Formelen: 30 % × (1 − {kr(B4)}/{kr(Y4[0])}) = 30 % × {kr(1 - B4 / Y4[0], 2)} = {pst(gs4[0], 1)}. ✓"))
pb = ledd("b", f"<p>Sørøy øker bunnfradraget til kr {kr(Bny4)} og beholder satsen på 30 %. Hvilket utsagn er riktig?</p>",
          ("Systemet er fortsatt progressivt. Progressiviteten blir sterkere.", []),
          [("Systemet blir mindre progressivt, fordi alle får like mange kroner i fradrag.", []),
           ("Systemet er proporsjonalt, fordi marginalskatten er 30 % for begge.", ["30 %"]),
           ("Systemet blir regressivt, fordi fradraget er størst i prosent av lave inntekter.", [])],
          "<p><b>Regelen.</b> Et skattesystem er progressivt når gjennomsnittsskatten stiger med inntekten. Flat sats med "
          "bunnfradrag er progressivt. Et større bunnfradrag gjør progressiviteten sterkere (manualen 10.1, forelesning 7, "
          "H2024 oppgave 4c).</p>"
          f"<p><b>Regnestykket.</b></p><p>1. Malin: 30 % × ({kr(Y4[0])} − {kr(Bny4)}) / {kr(Y4[0])} = {pst(gs4ny[0], 1)}.<br>"
          f"2. Rune: 30 % × ({kr(Y4[1])} − {kr(Bny4)}) / {kr(Y4[1])} = {pst(gs4ny[1], 1)}.<br>"
          f"3. Avstanden øker fra {kr(100 * (gs4[1] - gs4[0]), 1)} til {kr(100 * (gs4ny[1] - gs4ny[0]), 1)} prosentpoeng. "
          "<b>Fortsatt progressivt og sterkere</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>Mindre progressivt</b> = likt fradrag i kroner er nettopp det som gir progresjon: det er en større andel av "
          "en lav inntekt.<br><b>Proporsjonalt</b> = lik marginalskatt er ikke nok. Det avgjørende er gjennomsnittsskatten.<br>"
          "<b>Regressivt</b> = begrunnelsen er riktig, men den gir progresjon. Regressivt betyr at gjennomsnittsskatten "
          "faller med inntekten.</p>"
          "<p><b>Kontroll.</b> Gjennomsnittsskatten er 30 % × (1 − B/Y). Når B øker, faller den mest der B/Y er størst, altså "
          "for lave inntekter. ✓</p>")
EX.append(oppgave(4, "Malin, Rune og bunnfradraget i Sørøy", "Progressivitet", [1, 10], body4, [pa, pb]))

# ======================================================================= 5
print("\nOppgave 5: Leanders formue")
bol5, fond5, bank5, G5 = 7_000_000, 2_500_000, 500_000, 3_000_000
sum5 = bol5 + fond5 + bank5
gj5 = [G5 * x / sum5 for x in (bol5, fond5, bank5)]
red5 = gj5[1] * 0.20
fv5 = bol5 * 0.25 + fond5 * 0.80 + bank5
fr5 = G5 - red5
netto5 = fv5 - fr5
g5a_hele = G5 * 0.20                       # hele gjelden redusert med aksjerabatten
g5a_fond = gj5[1]                          # gjelden på fondet, ikke reduksjonen
g5a_bolig = red5 + gj5[0] * 0.75           # boliggjelden også redusert
g5b_ingen = fv5 - G5
g5b_bolig = fv5 - (G5 - g5a_bolig)
g5b_marked = sum5 - fr5
assert lik(red5, 150_000) and lik(fv5, 4_250_000) and lik(netto5, 1_400_000) and lik(g5a_bolig, 1_725_000)
print(f"   gjeld {gj5}, reduksjon {red5}, formuesverdi {fv5}, netto {netto5}; a: {g5a_hele}, {g5a_fond}, {g5a_bolig}; "
      f"b: {g5b_ingen}, {g5b_bolig}, {g5b_marked}")
body5 = (f"<p>Leander har per 1. januar en primærbolig med markedsverdi kr {kr(bol5)}, et aksjefond verdt kr {kr(fond5)} "
         f"og kr {kr(bank5)} i banken. Gjelden er kr {kr(G5)}. Primærboligen verdsettes til 25 %, aksjefondet til 80 % og "
         "bankinnskuddet til 100 %. Gjelden fordeles forholdsmessig etter markedsverdiene og reduseres med "
         "verdsettingsrabattene. Gjeld som faller på primærboligen, reduseres ikke.</p>")
pa = ledd("a", "<p>Hvor mye reduseres gjelden med i formuesskatten?</p>",
          (f"Kr {kr(red5)}", [kr(red5)]),
          [(f"Kr {kr(g5a_hele)}", [kr(g5a_hele)]),
           (f"Kr {kr(g5a_fond)}", [kr(g5a_fond)]),
           (f"Kr {kr(g5a_bolig)}", [kr(g5a_bolig)])],
          sol("Gjelden fordeles etter bruttoverdiene (markedsverdiene). Den delen som faller på aksjefondet, reduseres med "
              "rabatten på 20 %. Gjeld på primærbolig og bankinnskudd reduseres ikke (manualen 7.4, rutine R4).",
              [f"Bruttoformue: {kr(sum5)}. Aksjefondet er {pst(fond5 / sum5, 0)} av den.",
               f"Gjeld på fondet: {kr(G5)} × 25 % = {kr(gj5[1])}.",
               f"Reduksjon: {kr(gj5[1])} × 20 % = <b>kr {kr(red5)}</b>."],
              [(f"Kr {kr(g5a_hele)}", f"hele gjelden er redusert med aksjerabatten: {kr(G5)} × 20 %."),
               (f"Kr {kr(g5a_fond)}", "gjelden som faller på fondet, ikke reduksjonen av den."),
               (f"Kr {kr(g5a_bolig)}", f"gjelden på boligen er også redusert, med 75 %: {kr(gj5[0])} × 75 % + {kr(red5)}. "
                "Teksten sier at den ikke skal reduseres.")],
              f"Samleformel: {kr(G5)} × {kr(fond5)} / {kr(sum5)} × 20 % = {kr(red5)}. ✓",
              "Reduksjonen kan aldri bli større enn 20 % av hele gjelden. Det stryker alternativet over 1,7 mill. med en gang."))
pb = ledd("b", "<p>Hva er Leanders skattepliktige nettoformue per 1. januar? Se bort fra bunnfradraget.</p>",
          (f"Kr {kr(netto5)}", [kr(netto5)]),
          [(f"Kr {kr(g5b_ingen)}", [kr(g5b_ingen)]),
           (f"Kr {kr(g5b_bolig)}", [kr(g5b_bolig)]),
           (f"Kr {kr(g5b_marked)}", [kr(g5b_marked)])],
          sol("Nettoformuen er summen av formuesverdiene minus fradragsberettiget gjeld (manualen 7.1–7.4).",
              [f"Formuesverdier: {kr(bol5)} × 25 % + {kr(fond5)} × 80 % + {kr(bank5)} = {kr(bol5 * 0.25)} + "
               f"{kr(fond5 * 0.8)} + {kr(bank5)} = {kr(fv5)}.",
               f"Fradragsberettiget gjeld: {kr(G5)} − {kr(red5)} = {kr(fr5)}.",
               f"Nettoformue: {kr(fv5)} − {kr(fr5)} = <b>kr {kr(netto5)}</b>."],
              [(f"Kr {kr(g5b_ingen)}", f"gjeldsreduksjonen er glemt: {kr(fv5)} − {kr(G5)}."),
               (f"Kr {kr(g5b_bolig)}", f"boliggjelden er også redusert, som i den gale varianten i a: {kr(fv5)} − "
                f"{kr(G5 - g5a_bolig)}."),
               (f"Kr {kr(g5b_marked)}", f"markedsverdiene er brukt i stedet for formuesverdiene: {kr(sum5)} − {kr(fr5)}.")],
              f"Kolonnevis: bolig {kr(bol5 * 0.25)} − {kr(gj5[0])}, fond {kr(fond5 * 0.8)} − {kr(gj5[1] * 0.8)}, bank "
              f"{kr(bank5)} − {kr(gj5[2])}. Summen er {kr(bol5 * 0.25 - gj5[0] + fond5 * 0.8 - gj5[1] * 0.8 + bank5 - gj5[2])}. ✓"))
EX.append(oppgave(5, "Leanders bolig, aksjefond og bankinnskudd", "Formuesskatt", [7], body5, [pa, pb]))

# ======================================================================= 6
print("\nOppgave 6: Ragna og Fjellvind AS")
FV6, fs6 = 4_000_000, 0.01
F6 = FV6 * fs6
a6 = F6 / (1 - TE)
g6_oppa = F6 * (1 + TE)
g6_uoppj = F6 / 0.78
assert lik(F6, 40_000) and kr(a6) == "64 350"
print(f"   formuesskatt {F6}, utbytte {a6:.2f}: {g6_oppa}, {g6_uoppj:.2f}")
p = ledd("",
         f"<p>Ragna eier alle aksjene i Fjellvind AS. Aksjene har en formuesverdi på kr {kr(FV6)} etter verdsettingsrabatten. "
         "Formuesskatten er 1 %. Ragna har ingen annen likviditet og må ta utbytte for å betale både formuesskatten og "
         "eierskatten på 37,84 % på utbyttet. Se bort fra skjerming og bunnfradrag. Hvor stort utbytte må hun ta? Svar i hele "
         "kroner.</p>",
         (f"Kr {kr(a6)}", [kr(a6)]),
         [(f"Kr {kr(g6_oppa)}", [kr(g6_oppa)]),
          (f"Kr {kr(g6_uoppj)}", [kr(g6_uoppj)]),
          (f"Kr {kr(F6)}", [kr(F6)])],
         sol("Utbyttet D må være så stort at det som er igjen etter eierskatten, dekker formuesskatten: D × (1 − 37,84 %) = F, "
             "altså D = F / 0,6216 (manualen 8.3, rutine R5).",
             [f"Formuesskatt: {kr(FV6)} × 1 % = {kr(F6)}.",
              f"Utbytte: {kr(F6)} / (1 − 0,3784) = {kr(F6)} / 0,6216 = <b>kr {kr(a6)}</b>."],
             [(f"Kr {kr(g6_oppa)}", f"skatten er lagt oppå i stedet for at utbyttet er bruttoregnet: {kr(F6)} × 1,3784. Da "
               "betales eierskatt også av den delen som går til eierskatt."),
              (f"Kr {kr(g6_uoppj)}", f"oppjusteringen er glemt: {kr(F6)} / 0,78."),
              (f"Kr {kr(F6)}", "bare formuesskatten. Eierskatten på utbyttet er glemt.")],
             f"Eierskatt: {kr(a6)} × 37,84 % = {kr(a6 * TE)}. Igjen: {kr(a6)} − {kr(a6 * TE)} = {kr(a6 - a6 * TE)}, som er "
             "formuesskatten. ✓"))
EX.append(oppgave(6, "Ragna og formuesskatten på Fjellvind AS", "Formuesskatt som avkastningsskatt", [8], "", [p]))

# ======================================================================= 7
print("\nOppgave 7: stykkskatt med ny notasjon")
# Sjekk tegnene med lineære kurver: X(q) = 100 − 2q, Y(p) = 3p
for Xd, Yd in [(-2.0, 3.0), (-1.0, 0.5)]:
    # X(p + t) = Y(p): 100 + Xd(p + t) = Yd p  =>  p = (100 + Xd t) / (Yd − Xd)
    dp = Xd / (Yd - Xd)
    dq = Yd / (Yd - Xd)
    assert dp < 0 < dq and lik(dq - dp, 1)
assert lik(0.0 / (0.0 - (-2.0)), 0)   # Y′ = 0 gir ∂q/∂t = 0
RIKTIG_P = "∂p/∂t = X′/(Y′ − X′)"
RIKTIG_Q = "∂q/∂t = Y′/(Y′ − X′)"
body7 = ("<p>I et marked med frikonkurranse er etterspørselen X(q) og tilbudet Y(p), der q er prisen konsumentene betaler og "
         "p prisen produsentene får. Myndighetene innfører en stykkskatt t som produsentene betaler inn, slik at q = p + t. "
         "Likevekten er X(p + t) = Y(p). Anta X′ &lt; 0 og Y′ &gt; 0. Vi ser på små endringer i skatten rundt likevekten.</p>")
pa = ledd("a", "<p>Hvilket uttrykk viser hvordan produsentprisen endres når skatten øker marginalt?</p>",
          (RIKTIG_P, []),
          [("∂p/∂t = Y′/(Y′ − X′)", []),
           ("∂p/∂t = X′/(X′ − Y′)", []),
           ("∂p/∂t = X′/Y′", [])],
          "<p><b>Regelen.</b> Deriver likevekten implisitt med hensyn på t (manualen 11.2, rutine R9).</p>"
          "<p><b>Regnestykket.</b></p><p>1. X′ × (∂p/∂t + 1) = Y′ × ∂p/∂t.<br>2. ∂p/∂t × (Y′ − X′) = X′.<br>"
          f"3. <b>{RIKTIG_P}</b>, som er negativ fordi X′ &lt; 0 og Y′ − X′ &gt; 0.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>Y′/(Y′ − X′)</b> = telleren er byttet. Det er endringen i konsumentprisen, som er positiv.<br>"
          "<b>X′/(X′ − Y′)</b> = fortegnet i nevneren er snudd. Uttrykket blir positivt, men produsentprisen faller.<br>"
          "<b>X′/Y′</b> = nevneren er borte. Det er forholdet mellom helningene, ikke prisendringen.</p>"
          "<p><b>Kontroll.</b> Med X(q) = 100 − 2q og Y(p) = 3p blir p = (100 − 2t)/5, så ∂p/∂t = −0,4. Formelen gir "
          "−2/(3 + 2) = −0,4. ✓</p>"
          "<p><b>Strategi med minuspoeng.</b> Produsentprisen faller alltid. Stryk alle uttrykk som blir positive med X′ &lt; 0 og "
          "Y′ &gt; 0. Da står bare to igjen.</p>")
pb = ledd("b", "<p>Hvilket uttrykk viser hvordan prisen konsumentene betaler, endres når skatten øker marginalt?</p>",
          (RIKTIG_Q, []),
          [("∂q/∂t = X′/(Y′ − X′)", []),
           ("∂q/∂t = (Y′ − X′)/Y′", []),
           ("∂q/∂t = Y′/(X′ − Y′)", [])],
          "<p><b>Regelen.</b> Siden q = p + t, er ∂q/∂t = ∂p/∂t + 1 (manualen 11.2).</p>"
          f"<p><b>Regnestykket.</b></p><p>1. ∂q/∂t = X′/(Y′ − X′) + (Y′ − X′)/(Y′ − X′).<br>2. <b>{RIKTIG_Q}</b>, som ligger "
          "mellom 0 og 1.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>X′/(Y′ − X′)</b> = endringen i produsentprisen fra a.<br><b>(Y′ − X′)/Y′</b> = brøken er snudd. Den er større "
          "enn 1, så konsumentprisen ville steget mer enn skatten.<br><b>Y′/(X′ − Y′)</b> = fortegnet i nevneren er snudd, så "
          "uttrykket blir negativt.</p>"
          "<p><b>Kontroll.</b> Med tallene fra a: 3/(3 + 2) = 0,6. Da er 0,6 − (−0,4) = 1. ✓</p>")
pc = ledd("c", "<p>Anta at tilbudet er perfekt uelastisk, Y′ = 0. Hva blir ∂q/∂t?</p>",
          ("∂q/∂t = 0", ["0"]),
          [("∂q/∂t = 1", ["1"]),
           ("∂q/∂t = −1", ["−1"]),
           ("∂q/∂t = 0,5", ["0,5"])],
          "<p><b>Regelen.</b> Med perfekt uelastisk tilbud bærer produsentene hele skatten (manualen 11.3).</p>"
          f"<p><b>Regnestykket.</b></p><p>1. Sett Y′ = 0 i {RIKTIG_Q}.<br>2. ∂q/∂t = 0/(0 − X′) = <b>0</b>. Konsumentprisen "
          "endres ikke. Produsentprisen faller med hele skatten.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>1</b> = grensetilfellet med perfekt uelastisk etterspørsel (X′ = 0), der konsumentene bærer alt.<br>"
          "<b>−1</b> = det er ∂p/∂t i dette tilfellet, ikke ∂q/∂t.<br><b>0,5</b> = skatten er antatt delt likt. Det skjer bare "
          "når kurvene er like bratte, Y′ = −X′.</p>"
          "<p><b>Kontroll.</b> ∂q/∂t − ∂p/∂t = 0 − (−1) = 1. ✓</p>")
EX.append(oppgave(7, "Stykkskatt: hvem bærer skatten", "Skatteincidens", [11], body7, [pa, pb, pc]))

# ======================================================================= 8
print("\nOppgave 8: to obligasjoner")
R8, r8 = 0.05, 0.04
a8 = (R8 - r8) / R8
g8_r = (R8 - r8) / r8
g8_diff = R8 - r8
tL, tH = 0.30, 0.15
assert lik(a8, 0.20) and lik(g8_r, 0.25) and R8 * (1 - tL) < r8 < R8 * (1 - tH)
print(f"   implisitt {a8}: {g8_r}, {g8_diff}; Linnea S etter skatt {R8 * (1 - tL):.4f}, Håvard {R8 * (1 - tH):.4f}")
body8 = ("<p>To obligasjoner har samme risiko og løpetid. Obligasjon K er skattefri og gir 4 % rente. Obligasjon S gir 5 % "
         "rente som skattlegges fullt. Kapitalmarkedet er velfungerende, så investorene kan fritt velge mellom dem.</p>")
pa = ledd("a", "<p>Hva er den implisitte skattesatsen på obligasjon K? Svar i hele prosent.</p>",
          (pst(a8, 0), [pst(a8, 0)]),
          [(pst(g8_r, 0), [pst(g8_r, 0)]),
           (pst(g8_diff, 0), [pst(g8_diff, 0)]),
           ("22 %", ["22 %"])],
          sol("I likevekt gir to like risikable papirer samme avkastning etter skatt: r = R(1 − t*). Den implisitte satsen er "
              "t* = (R − r)/R (manualen 12.4, rutine R10).",
              ["R = 5 % (skattlagt), r = 4 % (skattefri).",
               f"t* = (5 % − 4 %) / 5 % = <b>{pst(a8, 0)}</b>."],
              [(pst(g8_r, 0), "feil nevner: (R − r)/r. Satsen måles mot avkastningen før skatt."),
               (pst(g8_diff, 0), "differansen R − r. Det er prosentpoeng, ikke en skattesats."),
               ("22 %", "den alminnelige skattesatsen. Den implisitte satsen leses av de to rentene, ikke av loven.")],
              f"5 % × (1 − {pst(a8, 0)}) = 4 %. ✓",
              "Et svar som bare krever loven og ikke de to rentene, kan strykes først."))
pb = ledd("b", f"<p>Linnea har {pst(tL, 0)} marginalskatt på renteinntekter og Håvard {pst(tH, 0)}. Hver av dem vil ha "
               "høyest avkastning etter skatt. Hvilket utsagn er riktig?</p>",
          ("Linnea bør velge K og Håvard S", []),
          [("Begge bør velge K, fordi den er skattefri", []),
           ("Begge bør velge S, fordi renten er høyest", []),
           ("Linnea bør velge S og Håvard K", [])],
          sol("Sammenlign din egen marginalskatt med den implisitte satsen. Er din sats høyere, vinner det skattefrie papiret. "
              "Er den lavere, vinner det skattlagte (manualen 12.4).",
              [f"Linnea: S gir 5 % × (1 − 30 %) = {pst(R8 * (1 - tL), 2)}, under 4 %. Hun velger K.",
               f"Håvard: S gir 5 % × (1 − 15 %) = {pst(R8 * (1 - tH), 2)}, over 4 %. Han velger S.",
               "Svar: <b>Linnea K og Håvard S</b>."],
              [("Begge K", "fordelen ved skattefritaket er priset inn. For den med lav sats er den implisitte skatten høyere "
                "enn den eksplisitte."),
               ("Begge S", "renten før skatt er ikke det som teller for den med høy sats."),
               ("Linnea S og Håvard K", "regelen er snudd.")],
              f"Regelen: Linneas 30 % &gt; {pst(a8, 0)} gir K. Håvards 15 % &lt; {pst(a8, 0)} gir S. ✓"))
EX.append(oppgave(8, "Obligasjon K og obligasjon S", "Implisitt skatt", [12], body8, [pa, pb]))

# ======================================================================= 9
print("\nOppgave 9: inntektsskiftingslikningen")
tw9, aga9, tA9, te9 = 0.46, 0.14, 0.25, 0.25
y9 = (tw9 + aga9 - tA9) / te9
g9_uaga = (tw9 - tA9) / te9
g9_trekk = (tw9 - aga9 - tA9) / te9
g9_gml = (tw9 - tA9) / ((1 - tA9) * te9)
assert lik(y9, 1.4) and lik(g9_uaga, 0.84) and lik(g9_trekk, 0.28) and lik(g9_gml, 1.12)


def alt9(y):
    d = 1 if lik(y * 10, round(y * 10)) else 2
    return (f"y = {kr(y, d)} og effektiv eierskatt {pst(y * te9, 0)}", [kr(y, d), pst(y * te9, 0)])


print(f"   y {y9}: {g9_uaga}, {g9_trekk}, {g9_gml}")
p = ledd("",
         "<p>Myndighetene vil at marginalskatten på lønn pluss arbeidsgiveravgiften skal være lik skatt på selskapet pluss "
         "eierskatten. Anta at marginalskatten på lønn er 46 %. Arbeidsgiveravgiften som arbeidstakeren bærer, utgjør 14 % "
         "av lønnskostnaden. Selskapsskatten er 25 % og eierinntekt skattlegges med den nominelle satsen 25 % ganget med "
         "oppjusteringsfaktoren y. Hva blir y og den effektive eierskatten?</p>",
         alt9(y9),
         [alt9(g9_uaga), alt9(g9_trekk), alt9(g9_gml)],
         sol("Inntektsskiftingslikningen med nominelle satser, slik forelesning 5 skriver den i 2026: marginalskatt på lønn + "
             "arbeidsgiveravgiften arbeidstakeren bærer = selskapsskatt + nominell eierskatt × y (manualen 5.1). Likningen måler "
             "avgiften mot lønnskostnaden. Her er den oppgitt slik, så 14 % settes rett inn uten omregning.",
             ["46 % + 14 % = 25 % + 25 % × y.",
              f"y = (60 % − 25 %) / 25 % = <b>{kr(y9, 1)}</b>.",
              f"Effektiv eierskatt: 25 % × {kr(y9, 1)} = <b>{pst(y9 * te9, 0)}</b>."],
             [(alt9(g9_uaga)[0], "arbeidsgiveravgiften er glemt: (46 % − 25 %) / 25 %."),
              (alt9(g9_trekk)[0], "arbeidsgiveravgiften er trukket fra i stedet for lagt til: (46 % − 14 % − 25 %) / 25 %."),
              (alt9(g9_gml)[0], "den eldre likningen fra H2020 med effektive satser og uten avgift: (46 % − 25 %) / (75 % × "
               "25 %). Den er ikke kursets likning i 2026.")],
             f"Høyresiden: 25 % + 25 % × {kr(y9, 1)} = 25 % + 35 % = 60 %, lik venstresiden. ✓"))
EX.append(oppgave(9, "Inntektsskiftingslikningen med ny selskapsskatt", "Aksjonærmodellen", [5], "", [p]))

# ======================================================================= 10
print("\nOppgave 10: Pedro bosatt i to land")
p = ledd("",
         "<p>Pedro er norsk statsborger. Han er bosatt både i Norge og i Spania etter landenes egne regler. Han har en leilighet "
         "i Oslo og et hus i Valencia. Begge står til hans disposisjon hele året. Kona og barna bor i Valencia, der han "
         "også driver firmaet sitt. Skatteavtalen følger OECDs mønsteravtale. Hvilket utsagn er riktig?</p>",
         ("Etter avtalen er han bosatt i Spania, fordi sentrum for livsinteressene hans er der.", []),
         [("Etter avtalen er han bosatt i Norge, fordi han er norsk statsborger.", []),
          ("Han er bosatt i begge land også etter avtalen, fordi han har fast bolig i begge.", []),
          ("Etter avtalen er han bosatt i Norge, fordi Norge kan kreve tre år før bostedet opphører.", [])],
         "<p><b>Regelen.</b> Er en person bosatt i to land etter landenes interne rett, peker skatteavtalens bostedsregel ut "
         "ett land. Kriteriene prøves i fast rekkefølge: fast bolig, sentrum for livsinteressene, vanlig opphold og "
         "statsborgerskap. Har du fast bolig i begge land, avgjør som regel sentrum for livsinteressene, altså hvor familie, "
         "hjem og arbeid er (manualen 13.1 og 13.4, OECDs mønsteravtale artikkel 4).</p>"
         "<p>Pedro har fast bolig i begge land, så første kriterium avgjør ikke. Familien og firmaet er i Spania. "
         "<b>Etter avtalen er han bosatt i Spania</b>.</p>"
         "<p><b>Hvorfor de andre er gale.</b></p>"
         "<p><b>Norge fordi han er statsborger</b> = statsborgerskap er det fjerde kriteriet og brukes bare når de tre første "
         "ikke avgjør.<br><b>Bosatt i begge</b> = det er nettopp dobbelt bosted avtalen skal løse. Fast bolig i begge land "
         "sender spørsmålet videre til neste kriterium.<br><b>Treårsregelen</b> = den gjelder når en person flytter ut etter "
         "norsk intern rett. Avtalens bostedsregel går foran ved dobbelt bosted.</p>"
         "<p><b>Strategi med minuspoeng.</b> Statsborgerskap er nesten aldri riktig svar i bostedsspørsmål. Stryk det først.</p>")
EX.append(oppgave(10, "Pedro med bolig i Oslo og Valencia", "Internasjonal skatt", [13], "", [p]))

# ======================================================================= 11
print("\nOppgave 11: Bjørnar og elbilen")
W11, L11, p11 = 1_440_000, 440_000, 0.10
EU11 = (1 - p11) * math.sqrt(W11) + p11 * math.sqrt(W11 - L11)
fair11 = p11 * L11
maks11 = W11 - EU11 ** 2
P11c = 50_000
med11 = math.sqrt(W11 - P11c)
g11a_ikke = (1 - p11) * L11
g11c_godtilst = (1 - p11) * math.sqrt(W11 - P11c) + p11 * math.sqrt(W11)
g11c_bytt = p11 * math.sqrt(W11) + (1 - p11) * math.sqrt(W11 - L11)
g11d_ukv = W11 * (1 - EU11 / math.sqrt(W11))
g11d_bytt = W11 - g11c_bytt ** 2
assert lik(EU11, 1_180) and lik(maks11, 47_600) and lik(fair11, 44_000) and med11 < EU11 < g11c_godtilst
assert lik(g11d_ukv, 24_000) and lik(g11d_bytt, 399_600)
print(f"   E[U] {EU11}, rettferdig {fair11}, maks {maks11}, med premie {P11c}: {med11:.3f}; gale c {g11c_godtilst:.3f}, "
      f"{g11c_bytt}; d {g11d_ukv}, {g11d_bytt}")
body11 = (f"<p>Bjørnar har en formue på kr {kr(W11)}, der kr {kr(L11)} er elbilen hans. Neste år blir bilen totalskadd med "
          "sannsynlighet 10 %. Da er hele verdien tapt. Ellers skjer ingenting. Bjørnars nyttefunksjon er U(W) = √W, der W "
          "er formuen. Han har ingen andre risikable eiendeler.</p>")
pa = ledd("a", "<p>Hva er den aktuarisk rettferdige premien for en forsikring som dekker hele tapet hvis bilen blir "
               "totalskadd?</p>",
          (f"Kr {kr(fair11)}", [kr(fair11)]),
          [(f"Kr {kr(g11a_ikke)}", [kr(g11a_ikke)]),
           (f"Kr {kr(L11)}", [kr(L11)]),
           (f"Kr {kr(maks11)}", [kr(maks11)])],
          sol("Den aktuarisk rettferdige premien er forventet erstatning: sannsynlighet × tap (manualen 17.3).",
              [f"10 % × {kr(L11)} = <b>kr {kr(fair11)}</b>."],
              [(f"Kr {kr(g11a_ikke)}", "sannsynligheten for at ingenting skjer, 90 %, er brukt."),
               (f"Kr {kr(L11)}", "hele tapet, uten sannsynligheten."),
               (f"Kr {kr(maks11)}", "den høyeste premien Bjørnar vil betale (d). Den er høyere enn den rettferdige fordi han "
                "er risikoavers.")],
              f"Forventet formue uten forsikring: {kr(W11)} − {kr(fair11)} = {kr(W11 - fair11)}, det samme som sikker formue "
              "med forsikring til rettferdig pris. ✓"))
pb = ledd("b", "<p>Selskapet lar Bjørnar forsikre så stor andel av bilens verdi han vil, til rettferdig pris. Hvor mye bør "
               "han forsikre?</p>",
          ("Hele verdien, fordi han da fjerner all risiko uten å tape noe i forventning.", []),
          [("Mindre enn halve verdien, fordi premien betales sikkert mens skaden er usikker.", []),
           ("Mellom halve og hele verdien, avhengig av hvor risikoavers han er.", []),
           ("Ingenting, fordi premien til rettferdig pris er lik forventet tap.", [])],
          "<p><b>Regelen.</b> Til rettferdig pris koster forsikringen ingenting i forventet formue. En risikoavers person "
          "foretrekker da sikker formue. Full dekning gir sikker formue (manualen 17.3, H2024 oppgave 11b).</p>"
          f"<p>Med full dekning har Bjørnar {kr(W11 - fair11)} i alle tilstander. Enhver annen andel gir samme forventning, men "
          "med risiko. Svar: <b>hele verdien</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>Mindre enn halve</b> = at premien er sikker, er nettopp poenget: den bytter usikkerhet mot sikkerhet uten "
          "kostnad i forventning.<br><b>Mellom halve og hele</b> = graden av risikoaversjon spiller ingen rolle. All "
          "risikoaversjon gir full dekning til rettferdig pris.<br><b>Ingenting</b> = lik forventning betyr at en risikonøytral "
          "er likegyldig. Den risikoaverse foretrekker forsikringen.</p>"
          "<p><b>Kontroll.</b> √W er konkav. Da er √(E[W]) &gt; E[√W], så sikker formue lik forventningen gir høyere nytte. ✓</p>")


def alt11c(med, uten, kjop, d=1):
    t = f"{kr(med, d)} mot {kr(uten, d)}: {'kjøp' if kjop else 'ikke kjøp'}"
    return (t, [kr(med, d), kr(uten, d)])


pc = ledd("c", f"<p>Selskapet tilbyr i stedet full dekning til premie kr {kr(P11c)}. Hva er forventet nytte med forsikringen mot "
               "forventet nytte uten? Hva bør Bjørnar gjøre?</p>",
          alt11c(med11, EU11, False),
          [alt11c(g11c_godtilst, EU11, True),
           alt11c(med11, g11c_bytt, True),
           alt11c(med11, EU11, True)],
          sol("Sammenlign forventet nytte, ikke forventet formue. Med full dekning er formuen sikker: U = √(W − premie). Uten "
              "forsikring: E[U] = 0,9√W + 0,1√(W − tap) (manualen 17.3, rutine R13).",
              [f"Med forsikring: √{kr(W11 - P11c)} = {kr(med11, 1)}.",
               f"Uten: 0,9 × √{kr(W11)} + 0,1 × √{kr(W11 - L11)} = 0,9 × {kr(math.sqrt(W11))} + 0,1 × {kr(math.sqrt(W11 - L11))} = {kr(EU11, 1)}.",
               f"{kr(med11, 1)} &lt; {kr(EU11, 1)}: <b>ikke kjøp</b>."],
              [(alt11c(g11c_godtilst, EU11, True)[0], "premien er trukket bare i tilstanden uten skade: 0,9 × "
                f"√{kr(W11 - P11c)} + 0,1 × √{kr(W11)}. Premien betales i begge tilstander."),
               (alt11c(med11, g11c_bytt, True)[0], "sannsynlighetene er byttet om i nytten uten forsikring."),
               (alt11c(med11, EU11, True)[0], f"nyttetallene er riktige, men konklusjonen er snudd. {kr(med11, 1)} er lavere "
                f"enn {kr(EU11, 1)}, så forsikringen gir lavere forventet nytte.")],
              f"Premien {kr(P11c)} er over den høyeste Bjørnar vil betale, {kr(maks11)} (d). Da må svaret være ikke kjøp. ✓"))
pd = ledd("d", "<p>Hva er den høyeste premien Bjørnar er villig til å betale for en forsikring med full dekning? Svar i "
               "hele kroner.</p>",
          (f"Kr {kr(maks11)}", [kr(maks11)]),
          [(f"Kr {kr(fair11)}", [kr(fair11)]),
           (f"Kr {kr(g11d_ukv)}", [kr(g11d_ukv)]),
           (f"Kr {kr(g11d_bytt)}", [kr(g11d_bytt)])],
          sol("Den høyeste premien gjør ham likegyldig: √(W − P) = E[U] uten forsikring, så P = W − (E[U])² (manualen 17.3).",
              [f"E[U] uten forsikring: {kr(EU11, 0)} (fra c).",
               f"W − P = {kr(EU11, 0)}² = {kr(EU11 ** 2)}.",
               f"P = {kr(W11)} − {kr(EU11 ** 2)} = <b>kr {kr(maks11)}</b>."],
              [(f"Kr {kr(fair11)}", "den rettferdige premien fra a. En risikoavers betaler mer enn forventet tap."),
               (f"Kr {kr(g11d_ukv)}", f"nytten er ikke kvadrert: ({kr(math.sqrt(W11))} − {kr(EU11)}) / {kr(math.sqrt(W11))} × {kr(W11)}. Nytte og kroner er "
                "ikke samme enhet."),
               (f"Kr {kr(g11d_bytt)}", f"sannsynlighetene er byttet: E[U] = 0,1 × {kr(math.sqrt(W11))} + 0,9 × {kr(math.sqrt(W11 - L11))} = "
                f"{kr(g11c_bytt, 0)}. Så "
                f"{kr(W11)} − {kr(g11c_bytt, 0)}².")],
              f"Risikopremien er {kr(maks11)} − {kr(fair11)} = {kr(maks11 - fair11)}. Den er positiv, som den skal være for "
              f"en risikoavers. √{kr(W11 - maks11)} = {kr(math.sqrt(W11 - maks11), 0)}. ✓",
              f"Den høyeste premien må ligge over den rettferdige. Alternativer under kr {kr(fair11)} kan strykes uten regning."))
EX.append(oppgave(11, "Bjørnar og forsikringen på elbilen", "Forsikring og forventet nytte", [17], body11, [pa, pb, pc, pd]))

# ======================================================================= 12
print("\nOppgave 12: aksjesparing")
wA, sA, sB = 0.70, 0.15, 0.25
a12 = wA * sA + (1 - wA) * sB
g12_rho0 = math.sqrt(wA ** 2 * sA ** 2 + (1 - wA) ** 2 * sB ** 2)
g12_varvekt = math.sqrt(wA * sA ** 2 + (1 - wA) * sB ** 2)
g12_snitt = (sA + sB) / 2
assert lik(a12, 0.18)
print(f"   σ {a12}: ρ=0 {g12_rho0:.4f}, vektet varians {g12_varvekt:.4f}, snitt {g12_snitt}")
body12 = "<p>Tre uavhengige spørsmål om fond, valuta og risiko i en aksjeportefølje.</p>"
pa = ledd("a", "<p>Eirin vurderer å flytte sparepengene sine fra et aktivt forvaltet fond til et globalt indeksfond. "
               "Hvilken påstand om aktive fond og indeksfond er <b>feil</b>?</p>",
          ("Indeksfond gir i snitt høyere avkastning enn aktive fond før gebyrer, fordi de er bedre diversifisert.", []),
          [("Et indeksfond investerer i alle selskapene på børsen i forhold til størrelsen deres.", []),
           ("Selv uten gebyrer kan ikke alle aktive forvaltere slå markedet, fordi markedet er summen av alle investorene.", []),
           ("Fond som har slått markedet i ett tiår, gjør det ofte ikke i det neste.", [])],
          "<p><b>Regelen.</b> Markedet er summen av alle investorene, så aktive fond leverer i snitt markedsavkastningen før "
          "gebyrer. Berk og DeMarzo finner at aktive fond slår indeks før gebyrer, men at kundene taper etter gebyrer "
          "(ForelesningAksjesparing2026, side 73–76, manualen 14.6).</p>"
          "<p>Påstanden om at indeksfond gir høyere avkastning <i>før</i> gebyrer, er <b>feil</b>. Diversifisering gir lavere "
          "risiko, ikke høyere forventet avkastning. Fordelen til indeksfondet er kostnadene.</p>"
          "<p><b>Hvorfor de andre er riktige påstander.</b></p>"
          "<p><b>Alle selskapene etter størrelse</b> = forelesningens definisjon av et indeksfond.<br><b>Ikke alle kan slå "
          "markedet</b> = forelesningens logiske argument: alle kan ikke slå gjennomsnittet.<br><b>Vinnerne holder ikke</b> = "
          "de 20 beste på 70-tallet ble slått av markedet på 80-tallet. De beste på 80-tallet var under middels på "
          "90-tallet.</p>"
          "<p><b>Strategi med minuspoeng.</b> Les «feil» to ganger. Tre av alternativene er forelesningens egne poenger.</p>")
pb = ledd("b", "<p>Lotte jobber i en bedrift som importerer varer. Bonusen hennes er høyere når kronen er sterk, fordi "
               "bedriften da kjøper varene billigere. Hun eier et globalt indeksfond i utenlandsk valuta og er risikoavers. "
               "Bør hun valutasikre fondet?</p>",
          ("Nei. Uten sikring er fondet mest verdt i kroner når bonusen er lav. Det demper svingningene.", []),
          [("Ja. Sikring fjerner en risiko. En risikoavers investor bør fjerne all risiko.", []),
           ("Nei. Valutasikring endrer ikke forventet avkastning, så hun er likegyldig.", []),
           ("Ja. Uten sikring er fondet mest verdt i kroner når bonusen også er høy. Da øker samlet risiko.", [])],
          "<p><b>Regelen.</b> Vurder et aktivum etter hvordan det samvarierer med resten av inntekten, humankapitalen "
          "inkludert, ikke etter dets eget standardavvik (manualen 14.6, H2024 oppgave 12c).</p>"
          "<p>Uten sikring er fondet mest verdt i kroner når kronen er svak. Da er bonusen lav. Når kronen er sterk, er "
          "bonusen høy og fondet mindre verdt i kroner. Fondet betaler mest når hun trenger det mest, så det demper "
          "svingningene i samlet inntekt. Sikring fjerner denne motvekten. <b>Nei, hun bør ikke sikre</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>Ja, fjern all risiko</b> = sikring gjør fondet tryggere alene, men samlet inntekt mer usikker. Det er "
          "samvariasjonen med resten av inntekten som teller.<br><b>Likegyldig</b> = forventningen er lik, men risikoen i samlet "
          "inntekt er det ikke. En risikoavers bryr seg om den.<br><b>Ja, fondet er mest verdt når bonusen er høy</b> = retningen "
          "er snudd. Det gjelder den som tjener mest når kronen er <i>svak</i>, for eksempel i en eksportbedrift.</p>"
          "<p><b>Kontroll.</b> Spør: betaler fondet mest når jeg trenger det mest? Her betaler det mest når bonusen er lav. Da "
          "reduserer det risikoen. ✓</p>")
pc = ledd("c", "<p>Aksje A har standardavvik 15 % og aksje B 25 %. Korrelasjonen mellom dem er 1. Hva er standardavviket til "
               "en portefølje med 70 % i A og 30 % i B? Svar med én desimal.</p>",
          (pst(a12, 1), [pst(a12, 1)]),
          [(pst(g12_rho0, 1), [pst(g12_rho0, 1)]),
           (pst(g12_snitt, 1), [pst(g12_snitt, 1)]),
           (pst(g12_varvekt, 1), [pst(g12_varvekt, 1)])],
          sol("Med korrelasjon 1 er standardavviket et vektet snitt av standardavvikene: σ<sub>p</sub> = w σ<sub>A</sub> + "
              "(1 − w) σ<sub>B</sub>. Det gir ingen diversifiseringsgevinst (manualen 14.2, rutine R20).",
              ["σ<sub>p</sub><sup>2</sup> = w<sup>2</sup>σ<sub>A</sub><sup>2</sup> + (1 − w)<sup>2</sup>σ<sub>B</sub><sup>2</sup> "
               "+ 2w(1 − w)σ<sub>A</sub>σ<sub>B</sub> = (wσ<sub>A</sub> + (1 − w)σ<sub>B</sub>)<sup>2</sup> når ρ = 1.",
               f"σ<sub>p</sub> = 0,7 × 15 % + 0,3 × 25 % = 10,5 % + 7,5 % = <b>{pst(a12, 1)}</b>."],
              [(pst(g12_rho0, 1), "korrelasjonsleddet er glemt, som om ρ = 0."),
               (pst(g12_snitt, 1), "enkelt snitt av 15 % og 25 %, uten vektene."),
               (pst(g12_varvekt, 1), "variansene er vektet uten å kvadrere vektene. Så er roten tatt.")],
              f"Varians: 0,49 × 0,0225 + 0,09 × 0,0625 + 2 × 0,21 × 0,0375 = {kr(a12 ** 2, 4)}. Roten: √{kr(a12 ** 2, 4)} = "
              f"{pst(a12, 1)}. ✓"))
EX.append(oppgave(12, "Aktive fond, valutasikring og to aksjer", "Porteføljevalg", [14], body12, [pa, pb, pc]))

# ======================================================================= 13
print("\nOppgave 13: IPS og BSU")
bsu13, tak13 = 30_000, 27_500
a13 = min(bsu13, tak13) * 0.10
g13_utak = bsu13 * 0.10
g13_over = (bsu13 - tak13) * 0.10           # 10 % av sparingen over taket
g13_null = 0.0                               # tror sparing over taket fjerner hele fradraget
assert lik(g13_over, 250)
assert lik(a13, 2_750)
print(f"   BSU-fradrag {a13}: {g13_utak}, {g13_over}, {g13_null}")
body13 = "<p>To spørsmål om skattefavorisert sparing.</p>"
pa = ledd("a", "<p>Mathias er 40 år og har god inntekt. Han vurderer å spare kr 25 000 i året i individuell "
               "pensjonssparing (IPS). Hvilket utsagn er riktig?</p>",
          ("Samme sats inn og ut. Fordelen er skattefri avkastning i praksis og fritak for formuesskatt.", []),
          [("Fordelen er at uttaket skattlegges som pensjonsinntekt med lavere sats enn fradraget han fikk.", []),
           ("Han kan ta ut pengene før fylte 62 år uten ekstra skatt hvis han kjøper sin første bolig.", ["62"]),
           ("IPS gir et fradrag i skatten på 10 % av innskuddet, slik som BSU.", ["10 %"])],
          "<p><b>Regelen.</b> Innskuddet gir fradrag i alminnelig inntekt (22 %). Uttaket skattlegges som alminnelig "
          "inntekt med samme sats. Det svarer til å skatte lønnen først og la resten vokse uten skatt. I tillegg er kontoen "
          "fritatt for formuesskatt. Pengene er bundet til minst 62 år (manualen 15.5, k20).</p>"
          "<p>Svar: <b>samme sats inn og ut, skattefri avkastning i praksis og fritak for formuesskatt</b>.</p>"
          "<p><b>Hvorfor de andre er gale.</b></p>"
          "<p><b>Lavere sats som pensjonist</b> = IPS-uttak er ikke pensjonsinntekt. Det skattlegges med 22 %, samme sats som "
          "fradraget.<br><b>Ut før 62 til bolig</b> = det gjelder ikke IPS. Pengene er bundet.<br><b>10 % slik som BSU</b> = det "
          "er BSU-regelen. IPS gir fradrag i inntekten, ikke i skatten.</p>")
pb = ledd("b", f"<p>Kasia er 26 år og eier ikke bolig. Hun sparer kr {kr(bsu13)} på BSU i 2026. BSU gir et fradrag i skatten "
               f"på 10 % av årets sparing, opp til kr {kr(tak13)} i sparing per år. Hvor mye lavere blir skatten hennes?</p>",
          (f"Kr {kr(a13)}", [kr(a13)]),
          [(f"Kr {kr(g13_utak)}", [kr(g13_utak)]),
           (f"Kr {kr(g13_over)}", [kr(g13_over)]),
           (f"Kr {kr(g13_null)}", [kr(g13_null)])],
          sol("BSU gir fradrag i skatten på 10 % av årets sparing, med tak på kr 27 500 i sparing. Fradraget gis til og med "
              "året du fyller 33 og bare til den som ikke eier bolig (manualen 15.6, k20).",
              [f"Sparingen over taket gir ikke fradrag: min({kr(bsu13)}; {kr(tak13)}) = {kr(tak13)}.",
               f"Fradrag i skatten: {kr(tak13)} × 10 % = <b>kr {kr(a13)}</b>."],
              [(f"Kr {kr(g13_utak)}", f"taket er glemt: {kr(bsu13)} × 10 %."),
               (f"Kr {kr(g13_over)}", f"10 % av sparingen over taket: ({kr(bsu13)} − {kr(tak13)}) × 10 %. Det er den delen "
                "som ikke gir fradrag, ikke fradraget."),
               (f"Kr {kr(g13_null)}", "tror at sparing over taket fjerner hele fradraget. Taket begrenser bare hvor mye av "
                "sparingen som gir fradrag.")],
              f"Fradraget pluss det som faller utenfor: {kr(a13)} + {kr(g13_over)} = {kr(a13 + g13_over)}, som er 10 % av hele "
              f"sparingen på {kr(bsu13)}. Største mulige fradrag er kr {kr(a13)} i året. ✓"))
EX.append(oppgave(13, "Mathias og IPS, Kasia og BSU", "Pensjon", [15], body13, [pa, pb]))

# ======================================================================= 14
print("\nOppgave 14: Jostein og bonusen")
p = ledd("",
         "<p>Jostein har fått kr 25 000 i bonus og vil betale ned gjeld. Han har et forbrukslån på kr 60 000 med 19 % rente, et "
         "billån på kr 25 000 med 8 % rente og et studielån på kr 300 000 med 5 % rente. Hva bør han gjøre ifølge "
         "forelesningen om lån?</p>",
         ("Betale ned forbrukslånet, fordi det har høyest rente.", []),
         [("Betale ned billånet, fordi det er minst og blir helt borte.", []),
          ("Fordele bonusen likt på de tre lånene for å redusere alle.", []),
          ("Betale ned studielånet først, fordi det er det største lånet.", [])],
         "<p><b>Regelen.</b> Lån er en måte å flytte penger over tid på. Det skal gjøres billigst mulig. Betal derfor ned "
         "lånet med høyest rente først. Rekkefølgen er kreditt- og forbrukslån, bil- og båtlån, boliglån og til sist "
         "studielånet, som også slettes ved dødsfall og har rentefritak ved sykdom (ForelesningLån2026, side 13–14, "
         "manualen 16).</p>"
         "<p>Forbrukslånet koster 19 %. Hver krone som betales ned der, sparer mer rente enn på de andre lånene. Svar: <b>betal "
         "ned forbrukslånet</b>.</p>"
         "<p><b>Hvorfor de andre er gale.</b></p>"
         "<p><b>Billånet fordi det er minst</b> = snøballmetoden til Dave Ramsey. Forelesningen bruker den som eksempel på "
         "selvhjelpsråd som ikke følger regelen om høyest rente først.<br><b>Fordele likt</b> = det mange gjør i praksis "
         "(Gathergood mfl.), men det er dyrere.<br><b>Studielånet</b> = det billigste lånet og har best vilkår. Det skal "
         "betales ned sist.</p>"
         "<p><b>Kontroll.</b> Ett år med 25 000 nedbetalt sparer 25 000 × 19 % = 4 750 i renter på forbrukslånet, mot "
         "2 000 på billånet og 1 250 på studielånet. ✓</p>")
EX.append(oppgave(14, "Jostein og bonusen", "Lån", [16], "", [p]))

# ======================================================================= 15
print("\nOppgave 15: hjemmebias")
p = ledd("",
         "<p>Norge utgjør om lag 0,2 % av verdens aksjemarked, men mange nordmenn eier mest norske aksjer. I et eksperiment "
         "fra forelesningen fikk investorer vite at en Norge-tung portefølje gir høyere risiko og dårligere spredning. Hva "
         "viste resultatet?</p>",
         ("Investorene forsto budskapet, men endret ikke porteføljene sine.", []),
         [("Investorene flyttet en stor del av porteføljen over i globale fond.", []),
          ("Investorene trodde ikke på budskapet og mente norske aksjer var tryggere.", []),
          ("Investorene solgte norske aksjer, men kjøpte aksjer i andre nordiske land.", [])],
         "<p><b>Regelen.</b> Hjemmebias er at investorer eier for mye i sitt eget land. I eksperimentet i forelesningen "
         "rapporterte investorene etterpå at Norge er mer risikabelt, men de endret ikke porteføljene. Informasjon alene endrer "
         "sjelden porteføljer. Forelesningen drøfter om det er en skjevhet eller en preferanse for å eie det man kjenner "
         "(Finansiell_psykologi2026, side 56–58, manualen 18).</p>"
         "<p>Svar: <b>de forsto budskapet, men endret ikke porteføljene</b>.</p>"
         "<p><b>Hvorfor de andre er gale.</b></p>"
         "<p><b>Flyttet til globale fond</b> = det motsatte av funnet.<br><b>Trodde ikke på budskapet</b> = de rapporterte "
         "nettopp at Norge er mer risikabelt.<br><b>Kjøpte andre nordiske aksjer</b> = ikke noe forelesningen viser. "
         "Porteføljene ble ikke endret.</p>")
EX.append(oppgave(15, "Norge-tunge porteføljer", "Finansiell psykologi", [18], "", [p]))

# ======================================================================= 16
print("\nOppgave 16: Ferdinand er pensjonist")
g16, ER16, rf16, s16 = 4, 0.08, 0.02, 0.25
a16 = (ER16 - rf16) / (g16 * s16 ** 2)
g16_sigma = (ER16 - rf16) / (g16 * s16)
g16_urf = ER16 / (g16 * s16 ** 2)
g16_ugam = (ER16 - rf16) / s16 ** 2
assert lik(a16, 0.24) and lik(g16_sigma, 0.06) and lik(g16_urf, 0.32) and lik(g16_ugam, 0.96)
print(f"   w {a16}: {g16_sigma}, {g16_urf}, {g16_ugam}")
p = ledd("",
         "<p>Ferdinand er pensjonist og har bare finansiell formue. Nyttefunksjonen hans er U = c<sup>1−γ</sup>/(1 − γ) med "
         "γ = 4. Han fordeler formuen mellom et aksjefond med forventet avkastning 8 % og standardavvik 25 % og en bankkonto "
         "med 2 % rente. Hvor stor andel bør han ha i aksjefondet?</p>",
         (pst(a16, 0), [pst(a16, 0)]),
         [(pst(g16_sigma, 0), [pst(g16_sigma, 0)]),
          (pst(g16_urf, 0), [pst(g16_urf, 0)]),
          (pst(g16_ugam, 0), [pst(g16_ugam, 0)])],
         sol("Mertons formel: w = (E(R) − R<sub>f</sub>) / (γσ<sup>2</sup>). Uten humankapital er totalformuen lik den "
             "finansielle formuen, så w er direkte andelen i aksjefondet (manualen 14.4, rutine R14).",
             ["Meravkastning: 8 % − 2 % = 6 %.",
              "γσ<sup>2</sup> = 4 × 0,25<sup>2</sup> = 4 × 0,0625 = 0,25.",
              f"w = 0,06 / 0,25 = <b>{pst(a16, 0)}</b>."],
             [(pst(g16_sigma, 0), "standardavviket er brukt i stedet for variansen: 0,06 / (4 × 0,25)."),
              (pst(g16_urf, 0), "den risikofrie renten er ikke trukket fra: 0,08 / 0,25."),
              (pst(g16_ugam, 0), "risikoaversjonen er glemt: 0,06 / 0,0625.")],
             f"{pst(a16, 0)} × 4 × 0,0625 = 6 %, som er meravkastningen. ✓"))
EX.append(oppgave(16, "Ferdinand fordeler pensjonsformuen", "Porteføljevalg", [14], "", [p]))

# ======================================================================= settet
SETT = {
    "id": "prove11",
    "kind": "mock",
    "label": "Prøveeksamen 11",
    "minutes": 240,
    "points": 90,
    "format": "30 flervalg · fire alternativer · 3 poeng for rett, −1 for feil",
    "note": ("Ligner H2024 og kursgodkjenningen 2026, på H2025-nivå: korte ledd og runde tall. Skattedelen følger H2024 med "
             "skjermingskjeden, gevinst med oppjustering, tidsverdien av et fradrag, bunnfradrag og progressivitet, "
             "gjeldsfordeling, utbytte til formuesskatt, stykkskatt som formelgjenkjenning og implisitt skatt. I tillegg kommer "
             "inntektsskiftingslikningen og bosted i to land. Finansdelen har forsikring med √W i fire ledd, indeksfond, "
             "valutasikring og korrelasjon 1, IPS og BSU, nedbetaling av lån, hjemmebias og Merton for en pensjonist."),
    "facts": [
        "Fire timer, kalkulator. 30 flervalgsledd med fire alternativer, 3 poeng for rett og −1 for feil, totalt 90 poeng.",
        "Oppgave 1–10 er skattedelen (18 ledd). Oppgave 11–16 er finansdelen (12 ledd). Alle satser står i teksten, slik "
        "kunngjøringen sier. Står det at en sats er forenklet, skal du bruke den.",
        "Laget av appen etter mønster fra H2024, H2025, kursgodkjenningen 2026 og årets forelesninger. Det er ikke en ekte "
        "eksamen. Kurset har ikke kontrollert løsningene.",
    ],
    "practiceNote": ("Skriv ned mellomtallene i skjermingskjeden og forsikringsoppgaven. De gale alternativene er nesten alltid "
                     "et mellomtall eller svaret på nabospørsmålet."),
    "mc": {"wrongFactor": -1 / 3},
    "exercises": EX,
}

ut = os.path.join(HER, "prove11.json")
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
